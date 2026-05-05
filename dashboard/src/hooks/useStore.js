import { useState, useEffect, useCallback } from 'react'
import { INITIAL_INDICATORS, INITIAL_TRIGGERS, SCENARIOS } from '../data/indicators'

const STORAGE_KEY = 'ewi_dashboard_v1'

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
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function mergeWithDefaults(stored) {
  if (!stored) return null
  // Merge stored indicators with any new ones added to initial data
  const storedById = Object.fromEntries((stored.indicators || []).map(i => [i.id, i]))
  const indicators = INITIAL_INDICATORS.map(def => storedById[def.id] ? { ...def, ...storedById[def.id] } : def)
  const storedTriggerById = Object.fromEntries((stored.triggers || []).map(t => [t.id, t]))
  const triggers = INITIAL_TRIGGERS.map(def => storedTriggerById[def.id] ? { ...def, ...storedTriggerById[def.id] } : def)
  const scenarios = stored.scenarios || SCENARIOS
  return { indicators, triggers, scenarios }
}

export function useStore() {
  const stored = loadFromStorage()
  const merged = mergeWithDefaults(stored)

  const [indicators, setIndicators] = useState(merged?.indicators || INITIAL_INDICATORS)
  const [triggers, setTriggers] = useState(merged?.triggers || INITIAL_TRIGGERS)
  const [scenarios, setScenarios] = useState(merged?.scenarios || SCENARIOS)

  const persist = useCallback((nextIndicators, nextTriggers, nextScenarios) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      indicators: nextIndicators,
      triggers: nextTriggers,
      scenarios: nextScenarios,
      savedAt: new Date().toISOString(),
    }))
  }, [])

  const updateIndicator = useCallback((id, value, note, manualStatus) => {
    setIndicators(prev => {
      const next = prev.map(ind => {
        if (ind.id !== id) return ind
        const today = new Date().toISOString().slice(0, 10)
        const newStatus = manualStatus || computeStatus(ind, value)
        const historyEntry = {
          date: today,
          value: value,
          note: note || '',
          status: newStatus,
        }
        return {
          ...ind,
          currentValue: value,
          status: newStatus,
          lastUpdated: today,
          history: [...(ind.history || []), historyEntry],
          note: note !== undefined ? note : ind.note,
        }
      })
      persist(next, triggers, scenarios)
      return next
    })
  }, [triggers, scenarios, persist])

  const updateTrigger = useCallback((id, activated, note) => {
    setTriggers(prev => {
      const today = new Date().toISOString().slice(0, 10)
      const next = prev.map(t => t.id !== id ? t : {
        ...t,
        activated,
        activatedDate: activated ? today : null,
        note: note !== undefined ? note : t.note,
      })
      persist(indicators, next, scenarios)
      return next
    })
  }, [indicators, scenarios, persist])

  const updateScenarioProbability = useCallback((id, probability) => {
    setScenarios(prev => {
      const next = prev.map(s => s.id !== id ? s : { ...s, probability })
      // Normalize so total = 100
      persist(indicators, triggers, next)
      return next
    })
  }, [indicators, triggers, persist])

  const exportData = useCallback(() => {
    const data = { indicators, triggers, scenarios, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ewi-dashboard-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }, [indicators, triggers, scenarios])

  const importData = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.indicators) setIndicators(data.indicators)
        if (data.triggers) setTriggers(data.triggers)
        if (data.scenarios) setScenarios(data.scenarios)
        persist(data.indicators || indicators, data.triggers || triggers, data.scenarios || scenarios)
      } catch {
        alert('유효하지 않은 JSON 파일입니다.')
      }
    }
    reader.readAsText(file)
  }, [indicators, triggers, scenarios, persist])

  const resetToDefaults = useCallback(() => {
    setIndicators(INITIAL_INDICATORS)
    setTriggers(INITIAL_TRIGGERS)
    setScenarios(SCENARIOS)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const criticalCount = indicators.filter(i => i.status === 'critical').length
  const warningCount = indicators.filter(i => i.status === 'warning').length
  const activeTriggers = triggers.filter(t => t.activated)

  return {
    indicators,
    triggers,
    scenarios,
    updateIndicator,
    updateTrigger,
    updateScenarioProbability,
    exportData,
    importData,
    resetToDefaults,
    criticalCount,
    warningCount,
    activeTriggers,
  }
}
