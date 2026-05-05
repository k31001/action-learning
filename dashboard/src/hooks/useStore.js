import { useState, useCallback } from 'react'
import { INITIAL_INDICATORS, INITIAL_TRIGGERS, SCENARIOS, INITIAL_QUADRANT_POSITIONS } from '../data/indicators'

const STORAGE_KEY = 'ewi_dashboard_v2'

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
  return {
    indicators,
    triggers,
    scenarios: stored.scenarios || SCENARIOS,
    quadrantPositions: stored.quadrantPositions || INITIAL_QUADRANT_POSITIONS,
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

  return {
    indicators,
    triggers,
    scenarios,
    quadrantPositions,
    updateIndicator,
    updateTrigger,
    updateScenarioProbability,
    addQuadrantSnapshot,
    exportData,
    importData,
    resetToDefaults,
    criticalCount: indicators.filter(i => i.status === 'critical').length,
    warningCount: indicators.filter(i => i.status === 'warning').length,
    activeTriggers: triggers.filter(t => t.activated),
  }
}
