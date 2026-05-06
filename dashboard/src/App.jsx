import { useState, useEffect, useCallback } from 'react'
import { useStore } from './hooks/useStore'
import { triggerAutoUpdate } from './hooks/useMarketData'
import Header from './components/Header'
import ScenarioPanel from './components/ScenarioPanel'
import TriggerPanel from './components/TriggerPanel'
import IndicatorGrid from './components/IndicatorGrid'
import StatusSummary from './components/StatusSummary'
import QuadrantMap from './components/QuadrantMap'
import MarketPanel from './components/MarketPanel'
import DecisionTracker from './components/DecisionTracker'

const MAIN_TABS = [
  { id: 'decisions', label: '9개 결정' },
  { id: 'market', label: '시장 데이터' },
  { id: 'ewi', label: 'EWI 지표' },
  { id: 'triggers', label: '시나리오 트리거' },
]

export default function App() {
  const {
    indicators, triggers, scenarios, quadrantPositions,
    adjustedScenarios, adjustedQuadrantPosition,
    updateIndicator, updateTrigger, updateScenarioProbability,
    addQuadrantSnapshot, exportData, importData, resetToDefaults,
    criticalCount, warningCount, activeTriggers,
  } = useStore()

  const [mainTab, setMainTab] = useState('decisions')

  // On mount: apply any already-computed auto-update results from server cache
  useEffect(() => {
    fetch('/api/auto-update/all')
      .then(r => r.ok ? r.json() : {})
      .then(all => {
        Object.entries(all).forEach(([id, result]) => {
          if (result.ok && result.value != null) {
            const indicator = indicators.find(i => i.autoUpdateId === id)
            if (indicator) {
              updateIndicator(indicator.id, result.value, result.note ?? '')
            }
          }
        })
      })
      .catch(() => {})
  // Run once on mount — indicators list identity is stable from useStore
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Manual "업데이트" button handler wired to IndicatorCard
  const handleAutoUpdate = useCallback(async (autoUpdateId) => {
    const result = await triggerAutoUpdate(autoUpdateId)
    const indicator = indicators.find(i => i.autoUpdateId === autoUpdateId)
    if (indicator && result.value != null) {
      updateIndicator(indicator.id, result.value, result.note ?? '')
    }
  }, [indicators, updateIndicator])

  return (
    <div className="min-h-screen bg-gray-950">
      <Header
        criticalCount={criticalCount}
        warningCount={warningCount}
        activeTriggerCount={activeTriggers.length}
        onExport={exportData}
        onImport={importData}
        onReset={resetToDefaults}
      />

      <main className="max-w-screen-2xl mx-auto px-4 py-5">
        {/* Page title */}
        <div className="mb-4">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-lg font-bold text-white">AI 메모리 시나리오 EWI 대시보드</h1>
            <span className="px-2 py-0.5 text-[10px] font-medium rounded bg-blue-900/50 text-blue-300 border border-blue-800">
              Q1 2026 갱신 · 벤치마크 통합
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            삼성전자 메모리사업부 시나리오 플래닝 — 2030~2035 전략 모니터링 · 9개 결정 추적
          </p>
        </div>

        {/* Status summary */}
        <StatusSummary indicators={indicators} triggers={triggers} />

        {/* ── 2-column: Scenario map (left) + Tabs (right) ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[480px_1fr] gap-5 mb-5">
          {/* Left: Quadrant + Scenario probability (always visible) */}
          <div className="space-y-4">
            <QuadrantMap
              positions={quadrantPositions}
              adjustedPosition={adjustedQuadrantPosition}
              onAddSnapshot={addQuadrantSnapshot}
            />
            <ScenarioPanel
              scenarios={scenarios}
              adjustedScenarios={adjustedScenarios}
              onUpdate={updateScenarioProbability}
            />
          </div>

          {/* Right: Tabbed content */}
          <div>
            {/* Tabs */}
            <div className="flex gap-1 mb-4 border-b border-gray-800 pb-0">
              {MAIN_TABS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setMainTab(t.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t transition-colors border-b-2 ${
                    mainTab === t.id
                      ? 'border-blue-500 text-white bg-gray-900/60'
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900/30'
                  }`}
                >
                  {t.label}
                  {t.id === 'triggers' && activeTriggers.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-900 text-red-300 text-xs">
                      {activeTriggers.length}
                    </span>
                  )}
                  {t.id === 'ewi' && (criticalCount + warningCount) > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-yellow-900 text-yellow-300 text-xs">
                      {criticalCount + warningCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {mainTab === 'decisions' && <DecisionTracker indicators={indicators} />}
            {mainTab === 'market' && <MarketPanel />}
            {mainTab === 'ewi' && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <h2 className="text-sm font-semibold text-gray-200 mb-4">EWI 수동 지표</h2>
                <IndicatorGrid indicators={indicators} onUpdate={updateIndicator} onAutoUpdate={handleAutoUpdate} />
              </div>
            )}
            {mainTab === 'triggers' && (
              <TriggerPanel triggers={triggers} onToggle={updateTrigger} />
            )}
          </div>
        </div>

        <footer className="pt-4 border-t border-gray-800 text-xs text-gray-700 flex justify-between">
          <span>삼성전자 메모리사업부 EWI 대시보드 v2.0</span>
          <span>주가: Yahoo Finance 자동 수집 | 나머지: localStorage 저장 — JSON 내보내기로 팀 공유</span>
        </footer>
      </main>
    </div>
  )
}
