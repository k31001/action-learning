import { useState, useEffect, useCallback } from 'react'
import { useStore } from './hooks/useStore'
import { triggerAutoUpdate } from './hooks/useMarketData'
import { Activity, BarChart3, Compass, Crosshair } from 'lucide-react'
import ScenarioPanel from './components/ScenarioPanel'
import TriggerPanel from './components/TriggerPanel'
import IndicatorGrid from './components/IndicatorGrid'
import StatusSummary from './components/StatusSummary'
import QuadrantMap from './components/QuadrantMap'
import MarketPanel from './components/MarketPanel'
import DecisionTracker from './components/DecisionTracker'
import DataVisualization from './components/DataVisualization'
import ScenarioPlanning from './components/ScenarioPlanning'
import Strategies from './components/Strategies'
import { VERSION } from './version'

// 최상단 페이지 탭
const TOP_TABS = [
  { id: 'ewi',           label: 'Early Warning Indicator', icon: Activity },
  { id: 'visualization', label: 'Data Visualization',      icon: BarChart3 },
  { id: 'planning',      label: 'Scenario Planning',       icon: Compass },
  { id: 'strategy',      label: 'Strategy',                icon: Crosshair },
]

const MAIN_TABS = [
  { id: 'decisions', label: '9개 결정' },
  { id: 'market', label: '시장 데이터' },
  { id: 'ewi', label: 'EWI 지표' },
  { id: 'triggers', label: '시나리오 트리거' },
]

export default function App() {
  const {
    indicators, triggers, scenarios, quadrantPositions,
    triggerHistory,
    adjustedScenarios, adjustedQuadrantPosition,
    updateIndicator, updateTrigger, clearTriggerHistory, updateScenarioProbability,
    addQuadrantSnapshot,
    criticalCount, warningCount, activeTriggers,
  } = useStore()

  const [topTab, setTopTab] = useState('ewi')
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
    <div className="min-h-screen">
      <main className="max-w-screen-2xl mx-auto px-5 py-6">
        {/* ── 최상단 페이지 탭 ── */}
        <nav
          aria-label="페이지 탭"
          className="flex items-center gap-0.5 mb-6 px-1 py-1 rounded-xl bg-white/[0.025] ring-1 ring-white/[0.06] backdrop-blur-sm"
        >
          {TOP_TABS.map(t => {
            const Icon = t.icon
            const active = topTab === t.id
            const showBadge = t.id === 'ewi' && (criticalCount + warningCount + activeTriggers.length) > 0
            return (
              <button
                key={t.id}
                onClick={() => setTopTab(t.id)}
                aria-current={active ? 'page' : undefined}
                className={`relative flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-lg transition-all ${
                  active
                    ? 'text-white bg-white/[0.06] ring-1 ring-white/[0.08] shadow-soft'
                    : 'text-gray-400 hover:text-gray-100 hover:bg-white/[0.03]'
                }`}
              >
                <Icon size={15} className={active ? 'text-blue-400' : 'text-gray-500'} />
                <span className="tracking-tight">{t.label}</span>
                {showBadge && (
                  <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 text-[10px] font-semibold ring-1 ring-red-500/30">
                    {criticalCount + warningCount + activeTriggers.length}
                  </span>
                )}
              </button>
            )
          })}
          {/* 버전 배지 — 탭 우측에 정렬, 미세하게 */}
          <span className="ml-auto mr-2 px-2 py-0.5 text-[10px] font-medium font-mono rounded text-gray-500 ring-1 ring-white/[0.06]">
            {VERSION}
          </span>
        </nav>

        {topTab === 'ewi' && (
          <>
            {/* Status summary */}
            <StatusSummary indicators={indicators} triggers={triggers} />

            {/* ── 2-column: Scenario map (left) + Tabs (right) ── */}
            <div className="grid grid-cols-1 xl:grid-cols-[480px_1fr] gap-5 mb-5">
              {/* Left: Quadrant + Scenario probability (always visible) */}
              <div className="space-y-4">
                <QuadrantMap
                  positions={quadrantPositions}
                  adjustedPosition={adjustedQuadrantPosition}
                  triggerHistory={triggerHistory}
                  onAddSnapshot={addQuadrantSnapshot}
                  onClearTriggerHistory={clearTriggerHistory}
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
          </>
        )}

        {topTab === 'visualization' && <DataVisualization />}
        {topTab === 'planning'      && <ScenarioPlanning />}
        {topTab === 'strategy'      && <Strategies />}
      </main>
    </div>
  )
}
