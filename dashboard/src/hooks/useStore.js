import { useState, useCallback, useMemo } from 'react'
import { INITIAL_INDICATORS, INITIAL_TRIGGERS, SCENARIOS, INITIAL_QUADRANT_POSITIONS } from '../data/indicators'

const STORAGE_KEY = 'ewi_dashboard_v3'

function computeStatus(indicator, value) {
  if (indicator.alertCondition === 'manual' || indicator.alertCondition === 'select') return indicator.status
  if (value === null || value === undefined) return 'unknown'
  const v = Number(value)
  if (isNaN(v)) return 'unknown'
  if (indicator.alertCondition === 'lte') {
    if (v <= indicator.alertThreshold) return 'critical'
    if (indicator.warningThreshold !== null && v <= indicator.warningThreshold) return 'warning'
    return 'normal'
  }
  if (indicator.alertCondition === 'gte') {
    if (v >= indicator.alertThreshold) return 'critical'
    if (indicator.warningThreshold !== null && v >= indicator.warningThreshold) return 'warning'
    return 'normal'
  }
  return 'normal'
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function mergeWithDefaults(stored) {
  if (!stored) return null
  const storedById = Object.fromEntries((stored.indicators || []).map(i => [i.id, i]))
  const indicators = INITIAL_INDICATORS.map(def =>
    storedById[def.id] ? { ...def, ...storedById[def.id] } : def
  )
  const storedTriggerById = Object.fromEntries((stored.triggers || []).map(t => [t.id, t]))
  const triggers = INITIAL_TRIGGERS.map(def =>
    storedTriggerById[def.id] ? { ...def, ...storedTriggerById[def.id] } : def
  )
  // Merge quadrant positions by key: use initial df1/df2 as base, preserve user note/date
  const storedQpByKey = Object.fromEntries((stored.quadrantPositions || []).map(p => [p.key, p]))
  const quadrantPositions = INITIAL_QUADRANT_POSITIONS.map(def => {
    const s = storedQpByKey[def.key]
    if (!s) return def
    return { ...def, note: s.note ?? def.note, date: s.date ?? def.date }
  })

  return {
    indicators,
    triggers,
    scenarios: stored.scenarios || SCENARIOS,
    quadrantPositions,
    triggerHistory: Array.isArray(stored.triggerHistory) ? stored.triggerHistory : [],
  }
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

export function useStore() {
  const stored = loadFromStorage()
  const merged = mergeWithDefaults(stored)

  const [indicators, setIndicators] = useState(merged?.indicators || INITIAL_INDICATORS)
  const [triggers, setTriggers] = useState(merged?.triggers || INITIAL_TRIGGERS)
  const [scenarios, setScenarios] = useState(merged?.scenarios || SCENARIOS)
  const [quadrantPositions, setQuadrantPositions] = useState(
    merged?.quadrantPositions || INITIAL_QUADRANT_POSITIONS
  )
  const [triggerHistory, setTriggerHistory] = useState(merged?.triggerHistory || [])

  const persist = useCallback((nextI, nextT, nextS, nextQ, nextH) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      indicators: nextI,
      triggers: nextT,
      scenarios: nextS,
      quadrantPositions: nextQ,
      triggerHistory: nextH,
      savedAt: new Date().toISOString(),
    }))
  }, [])

  const updateIndicator = useCallback((id, value, note, manualStatus) => {
    setIndicators(prev => {
      const next = prev.map(ind => {
        if (ind.id !== id) return ind
        const today = new Date().toISOString().slice(0, 10)
        const newStatus = manualStatus || computeStatus(ind, value)
        return {
          ...ind,
          currentValue: value,
          status: newStatus,
          lastUpdated: today,
          history: [...(ind.history || []), { date: today, value, note: note || '', status: newStatus }],
          note: note !== undefined ? note : ind.note,
        }
      })
      persist(next, triggers, scenarios, quadrantPositions, triggerHistory)
      return next
    })
  }, [triggers, scenarios, quadrantPositions, triggerHistory, persist])

  // 트리거 클릭 이력: 클릭마다 시점·위치를 누적 기록.
  // 다음 트리거는 항상 "직전 저장된 위치" + (이번 트리거의 df1Delta/df2Delta) 로 이동한다.
  // 좌표는 의미 좌표(DF1/DF2, -10..+10)로 저장 — SVG 캔버스가 viewBox 기반 반응형이라 픽셀 절댓값보다 안전.
  const updateTrigger = useCallback((id, activated, note) => {
    const trigger = triggers.find(t => t.id === id)
    if (!trigger) return

    const today = new Date().toISOString().slice(0, 10)
    const nextTriggers = triggers.map(t => t.id !== id ? t : {
      ...t,
      activated,
      activatedDate: activated ? today : null,
      note: note !== undefined ? note : t.note,
    })

    // 직전 저장 위치 (= 이력의 마지막 위치). 이력이 비어 있으면 base.current 가 기준점.
    const base = quadrantPositions.find(p => p.key === 'current') ?? { df1: 0, df2: 0 }
    const lastPos = triggerHistory.length > 0
      ? triggerHistory[triggerHistory.length - 1].position
      : { df1: base.df1, df2: base.df2 }

    // 활성화는 +delta, 해제는 -delta (이전 활성화의 누적 효과를 되돌리는 의미).
    const sign = activated ? 1 : -1
    const intendedDelta = {
      df1: sign * (trigger.df1Delta ?? 0),
      df2: sign * (trigger.df2Delta ?? 0),
    }
    const nextPos = {
      df1: clamp(lastPos.df1 + intendedDelta.df1, -10, 10),
      df2: clamp(lastPos.df2 + intendedDelta.df2, -10, 10),
    }
    // 클램프 이후 실제 적용된 델타 (경계 부근에서는 의도값과 다를 수 있음).
    const actualDelta = {
      df1: +(nextPos.df1 - lastPos.df1).toFixed(3),
      df2: +(nextPos.df2 - lastPos.df2).toFixed(3),
    }
    const event = {
      triggerId: id,
      triggerName: trigger.name,
      action: activated ? 'activate' : 'deactivate',
      timestamp: new Date().toISOString(),
      position: nextPos,                                          // 누적 절대 위치
      deltaFromPrev: triggerHistory.length === 0 ? null : actualDelta,  // 첫 이벤트는 null
    }
    const nextHistory = [...triggerHistory, event]

    setTriggers(nextTriggers)
    setTriggerHistory(nextHistory)
    persist(indicators, nextTriggers, scenarios, quadrantPositions, nextHistory)
  }, [triggers, indicators, scenarios, quadrantPositions, triggerHistory, persist])

  const clearTriggerHistory = useCallback(() => {
    setTriggerHistory([])
    persist(indicators, triggers, scenarios, quadrantPositions, [])
  }, [indicators, triggers, scenarios, quadrantPositions, persist])

  const updateScenarioProbability = useCallback((id, probability) => {
    setScenarios(prev => {
      const next = prev.map(s => s.id !== id ? s : { ...s, probability })
      persist(indicators, triggers, next, quadrantPositions, triggerHistory)
      return next
    })
  }, [indicators, triggers, quadrantPositions, triggerHistory, persist])

  const addQuadrantSnapshot = useCallback((snapshot) => {
    setQuadrantPositions(prev => {
      // Push current → oneMonth, oneMonth → threeMonth, etc.
      const shift = {
        current: 'oneMonth',
        oneMonth: 'threeMonth',
        threeMonth: 'sixMonth',
        sixMonth: 'oneYear',
        oneYear: 'twoYear',
      }
      const nextMap = {}
      prev.forEach(p => {
        const newKey = shift[p.key]
        if (newKey) nextMap[newKey] = { ...p, key: newKey }
      })
      const newPositions = [
        { ...snapshot, key: 'current' },
        ...Object.values(nextMap),
      ]
      persist(indicators, triggers, scenarios, newPositions, triggerHistory)
      return newPositions
    })
  }, [indicators, triggers, scenarios, triggerHistory, persist])

  const exportData = useCallback(() => {
    const data = {
      indicators, triggers, scenarios, quadrantPositions, triggerHistory,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ewi-dashboard-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [indicators, triggers, scenarios, quadrantPositions, triggerHistory])

  const importData = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.indicators) setIndicators(data.indicators)
        if (data.triggers) setTriggers(data.triggers)
        if (data.scenarios) setScenarios(data.scenarios)
        if (data.quadrantPositions) setQuadrantPositions(data.quadrantPositions)
        if (Array.isArray(data.triggerHistory)) setTriggerHistory(data.triggerHistory)
        persist(
          data.indicators ?? indicators,
          data.triggers ?? triggers,
          data.scenarios ?? scenarios,
          data.quadrantPositions ?? quadrantPositions,
          Array.isArray(data.triggerHistory) ? data.triggerHistory : triggerHistory,
        )
      } catch { alert('유효하지 않은 JSON 파일입니다.') }
    }
    reader.readAsText(file)
  }, [indicators, triggers, scenarios, quadrantPositions, triggerHistory, persist])

  const resetToDefaults = useCallback(() => {
    setIndicators(INITIAL_INDICATORS)
    setTriggers(INITIAL_TRIGGERS)
    setScenarios(SCENARIOS)
    setQuadrantPositions(INITIAL_QUADRANT_POSITIONS)
    setTriggerHistory([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const activeTriggers = triggers.filter(t => t.activated)

  // ── 트리거 → 시나리오 확률 자동 조정 ─────────────────────────────────────
  const adjustedScenarios = useMemo(() => {
    // 활성 트리거의 probabilityDelta를 합산
    const deltas = {}
    activeTriggers.forEach(t => {
      Object.entries(t.probabilityDelta ?? {}).forEach(([id, d]) => {
        deltas[id] = (deltas[id] ?? 0) + d
      })
    })

    // 베이스 확률에 델타 적용 후 0 이하 클램프
    const raw = scenarios.map(s => ({
      ...s,
      probability: Math.max(0, s.probability + (deltas[s.id] ?? 0)),
      delta: deltas[s.id] ?? 0,
    }))

    // 합계가 100이 되도록 정규화
    const total = raw.reduce((s, sc) => s + sc.probability, 0) || 100
    return raw.map(s => ({
      ...s,
      probability: Math.round((s.probability / total) * 100),
    }))
  }, [scenarios, activeTriggers])

  // ── 트리거 이력 기반 쿼드런트 포지션 ────────────────────────────────────
  // 표시 위치 = 이력의 마지막 이벤트 위치. 이력이 비면 base.current.
  // (이전 구현은 활성 트리거 델타의 단순 합산이었으나, 이제는 클릭 순서를 따라 누적된 경로를 따라간다.)
  const adjustedQuadrantPosition = useMemo(() => {
    const base = quadrantPositions.find(p => p.key === 'current') ?? { df1: 0, df2: 0 }
    if (triggerHistory.length === 0) {
      return {
        df1: base.df1, df2: base.df2,
        baseDf1: base.df1, baseDf2: base.df2,
        df1Delta: 0, df2Delta: 0,
        isAdjusted: false,
        activeTriggerNames: [],
      }
    }
    const latest = triggerHistory[triggerHistory.length - 1]
    return {
      df1: latest.position.df1,
      df2: latest.position.df2,
      baseDf1: base.df1,
      baseDf2: base.df2,
      df1Delta: +(latest.position.df1 - base.df1).toFixed(3),
      df2Delta: +(latest.position.df2 - base.df2).toFixed(3),
      isAdjusted: true,
      activeTriggerNames: activeTriggers.map(t => t.name),
    }
  }, [quadrantPositions, triggerHistory, activeTriggers])

  return {
    indicators,
    triggers,
    scenarios,
    quadrantPositions,
    triggerHistory,
    adjustedScenarios,
    adjustedQuadrantPosition,
    updateIndicator,
    updateTrigger,
    clearTriggerHistory,
    updateScenarioProbability,
    addQuadrantSnapshot,
    exportData,
    importData,
    resetToDefaults,
    criticalCount: indicators.filter(i => i.status === 'critical').length,
    warningCount: indicators.filter(i => i.status === 'warning').length,
    activeTriggers,
  }
}
