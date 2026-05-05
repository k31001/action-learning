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
  }
}

export function useStore() {
  const stored = loadFromStorage()
  const merged = mergeWithDefaults(stored)

  const [indicators, setIndicators] = useState(merged?.indicators || INITIAL_INDICATORS)
  const [triggers, setTriggers] = useState(merged?.triggers || INITIAL_TRIGGERS)
  const [scenarios, setScenarios] = useState(merged?.scenarios || SCENARIOS)
  const [quadrantPositions, setQuadrantPositions] = useState(
    merged?.quadrantPositions || INITIAL_QUADRANT_POSITIONS
  )

  const persist = useCallback((nextI, nextT, nextS, nextQ) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      indicators: nextI,
      triggers: nextT,
      scenarios: nextS,
      quadrantPositions: nextQ,
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
      persist(next, triggers, scenarios, quadrantPositions)
      return next
    })
  }, [triggers, scenarios, quadrantPositions, persist])

  const updateTrigger = useCallback((id, activated, note) => {
    setTriggers(prev => {
      const today = new Date().toISOString().slice(0, 10)
      const next = prev.map(t => t.id !== id ? t : {
        ...t, activated, activatedDate: activated ? today : null,
        note: note !== undefined ? note : t.note,
      })
      persist(indicators, next, scenarios, quadrantPositions)
      return next
    })
  }, [indicators, scenarios, quadrantPositions, persist])

  const updateScenarioProbability = useCallback((id, probability) => {
    setScenarios(prev => {
      const next = prev.map(s => s.id !== id ? s : { ...s, probability })
      persist(indicators, triggers, next, quadrantPositions)
      return next
    })
  }, [indicators, triggers, quadrantPositions, persist])

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
      persist(indicators, triggers, scenarios, newPositions)
      return newPositions
    })
  }, [indicators, triggers, scenarios, persist])

  const exportData = useCallback(() => {
    const data = { indicators, triggers, scenarios, quadrantPositions, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ewi-dashboard-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [indicators, triggers, scenarios, quadrantPositions])

  const importData = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.indicators) setIndicators(data.indicators)
        if (data.triggers) setTriggers(data.triggers)
        if (data.scenarios) setScenarios(data.scenarios)
        if (data.quadrantPositions) setQuadrantPositions(data.quadrantPositions)
        persist(
          data.indicators ?? indicators,
          data.triggers ?? triggers,
          data.scenarios ?? scenarios,
          data.quadrantPositions ?? quadrantPositions
        )
      } catch { alert('유효하지 않은 JSON 파일입니다.') }
    }
    reader.readAsText(file)
  }, [indicators, triggers, scenarios, quadrantPositions, persist])

  const resetToDefaults = useCallback(() => {
    setIndicators(INITIAL_INDICATORS)
    setTriggers(INITIAL_TRIGGERS)
    setScenarios(SCENARIOS)
    setQuadrantPositions(INITIAL_QUADRANT_POSITIONS)
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

  // ── 트리거 → 쿼드런트 포지션 자동 조정 ───────────────────────────────────
  const adjustedQuadrantPosition = useMemo(() => {
    const df1Delta = activeTriggers.reduce((sum, t) => sum + (t.df1Delta ?? 0), 0)
    const df2Delta = activeTriggers.reduce((sum, t) => sum + (t.df2Delta ?? 0), 0)
    const base = quadrantPositions.find(p => p.key === 'current') ?? { df1: 0, df2: 0 }
    return {
      df1: Math.max(-10, Math.min(10, base.df1 + df1Delta)),
      df2: Math.max(-10, Math.min(10, base.df2 + df2Delta)),
      baseDf1: base.df1,
      baseDf2: base.df2,
      df1Delta,
      df2Delta,
      isAdjusted: df1Delta !== 0 || df2Delta !== 0,
      activeTriggerNames: activeTriggers
        .filter(t => (t.df1Delta ?? 0) !== 0 || (t.df2Delta ?? 0) !== 0)
        .map(t => t.name),
    }
  }, [quadrantPositions, activeTriggers])

  return {
    indicators,
    triggers,
    scenarios,
    quadrantPositions,
    adjustedScenarios,
    adjustedQuadrantPosition,
    updateIndicator,
    updateTrigger,
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
