import { useStore } from './hooks/useStore'
import Header from './components/Header'
import ScenarioPanel from './components/ScenarioPanel'
import TriggerPanel from './components/TriggerPanel'
import IndicatorGrid from './components/IndicatorGrid'
import StatusSummary from './components/StatusSummary'

export default function App() {
  const {
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
  } = useStore()

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

      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {/* Page title */}
        <div className="mb-6">
          <h1 className="text-lg font-bold text-white">
            Early Warning Indicator 대시보드
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            삼성전자 메모리사업부 시나리오 플래닝 — 2030~2035년 전략 모니터링
          </p>
        </div>

        {/* Status summary */}
        <StatusSummary indicators={indicators} triggers={triggers} />

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left sidebar */}
          <div className="space-y-6">
            <ScenarioPanel
              scenarios={scenarios}
              onUpdate={updateScenarioProbability}
            />
            <TriggerPanel
              triggers={triggers}
              onToggle={updateTrigger}
            />
          </div>

          {/* Right: Indicator cards (2 columns) */}
          <div className="lg:col-span-2">
            <IndicatorGrid
              indicators={indicators}
              onUpdate={updateIndicator}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-4 border-t border-gray-800 text-xs text-gray-700 flex justify-between">
          <span>삼성전자 메모리사업부 — 시나리오 플래닝 EWI 대시보드 v1.0</span>
          <span>데이터는 브라우저 localStorage에 저장됩니다. 팀 공유 시 JSON 내보내기 사용.</span>
        </footer>
      </main>
    </div>
  )
}
