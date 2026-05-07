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
  const triggers = INITIAL_TRIGGERS.map((def, idx) => {
    const s = storedTriggerById[def.id]
    if (!s) return def
    const merged = { ...def, ...s }
    // 마이그레이션: 활성 상태인데 activatedAt 가 없는 옛 저장본은 activatedDate + idx 기반으로 보정
    if (merged.activated && !merged.activatedAt) {
      const date = merged.activatedDate || '2026-01-01'
      merged.activatedAt = `${date}T00:00:${String(idx).padStart(2, '0')}.000Z`
    }
    if (!merged.activated) merged.activatedAt = null
    return merged
  })
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

  // 포지션 맵 좌표 = base.current + (활성 중인 트리거들의 df1/df2 델타를 활성화 시간순으로 누적).
  // 해제하면 그 트리거 기여분은 체인에서 빠지므로 맵에서도 즉시 사라진다.
  // triggerHistory 는 클릭 감사 로그(매 클릭 누적, 절대 덮어쓰지 않음)로 별도 보존.
  const updateTrigger = useCallback((id, activated, note) => {
    const trigger = triggers.find(t => t.id === id)
    if (!trigger) return

    const now = new Date().toISOString()
    const today = now.slice(0, 10)
    const nextTriggers = triggers.map(t => t.id !== id ? t : {
      ...t,
      activated,
      activatedDate: activated ? today : null,
      activatedAt: activated ? now : null,   // 체인 정렬 키
      note: note !== undefined ? note : t.note,
    })

    // 갱신 후 활성 트리거 체인을 재계산해 이번 클릭 시점의 위치를 산출.
    const base = quadrantPositions.find(p => p.key === 'current') ?? { df1: 0, df2: 0 }
    const activeChain = nextTriggers
      .filter(t => t.activated)
      .sort((a, b) => (a.activatedAt ?? '').localeCompare(b.activatedAt ?? ''))
    let pos = { df1: base.df1, df2: base.df2 }
    for (const t of activeChain) {
      pos = {
        df1: clamp(pos.df1 + (t.df1Delta ?? 0), -10, 10),
        df2: clamp(pos.df2 + (t.df2Delta ?? 0), -10, 10),
      }
    }

    // 감사 로그: 클릭마다 한 줄씩 추가 (포지션·deltaFromPrev 는 이번 재계산 결과 기준).
    const lastEventPos = triggerHistory.length > 0
      ? triggerHistory[triggerHistory.length - 1].position
      : null
    const event = {
      triggerId: id,
      triggerName: trigger.name,
      action: activated ? 'activate' : 'deactivate',
      timestamp: now,
      position: { df1: +pos.df1.toFixed(3), df2: +pos.df2.toFixed(3) },
      deltaFromPrev: lastEventPos
        ? {
            df1: +(pos.df1 - lastEventPos.df1).toFixed(3),
            df2: +(pos.df2 - lastEventPos.df2).toFixed(3),
          }
        : null,
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

  // ── 활성 트리거 체인 기반 쿼드런트 포지션 ────────────────────────────────
  // base.current → (활성 트리거를 activatedAt 순서로) 누적 적용 → 마지막이 표시 위치.
  // 트리거 해제 시 해당 트리거가 체인에서 빠져 맵 좌표가 그만큼 즉시 되돌아간다.
  const adjustedQuadrantPosition = useMemo(() => {
    const base = quadrantPositions.find(p => p.key === 'current') ?? { df1: 0, df2: 0 }
    const activeChain = triggers
      .filter(t => t.activated)
      .sort((a, b) => (a.activatedAt ?? '').localeCompare(b.activatedAt ?? ''))

    const chain = [{ df1: base.df1, df2: base.df2, label: '기준점', kind: 'base' }]
    let pos = { df1: base.df1, df2: base.df2 }
    for (const t of activeChain) {
      pos = {
        df1: clamp(pos.df1 + (t.df1Delta ?? 0), -10, 10),
        df2: clamp(pos.df2 + (t.df2Delta ?? 0), -10, 10),
      }
      chain.push({
        df1: pos.df1, df2: pos.df2,
        label: t.name,
        kind: 'trigger',
        triggerId: t.id,
        activatedAt: t.activatedAt,
      })
    }

    return {
      df1: pos.df1,
      df2: pos.df2,
      baseDf1: base.df1,
      baseDf2: base.df2,
      df1Delta: +(pos.df1 - base.df1).toFixed(3),
      df2Delta: +(pos.df2 - base.df2).toFixed(3),
      isAdjusted: activeChain.length > 0,
      activeTriggerNames: activeChain.map(t => t.name),
      chain,
    }
  }, [quadrantPositions, triggers])

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
