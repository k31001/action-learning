import { Download, Upload, RotateCcw, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'
import { useRef } from 'react'

export default function Header({ criticalCount, warningCount, activeTriggerCount, onExport, onImport, onReset }) {
  const fileRef = useRef()

  const overallStatus = criticalCount > 0 ? 'critical'
    : activeTriggerCount > 0 ? 'critical'
    : warningCount > 0 ? 'warning'
    : 'normal'

  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded bg-samsung-blue flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-samsung-blue/30">
            SE
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white truncate flex items-center gap-2">
              AI 메모리 시나리오 EWI 대시보드
              <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                v2.0
              </span>
            </div>
            <div className="text-xs text-gray-400 truncate">
              삼성 메모리사업부 · 9개 결정 추적 · {new Date().toISOString().slice(0,10)}
            </div>
          </div>
        </div>

        {/* Status summary */}
        <div className="flex items-center gap-2 ml-4 flex-1 min-w-0">
          {overallStatus === 'normal' && (
            <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
              <CheckCircle size={14} />
              정상 모니터링 중
            </span>
          )}
          {criticalCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-red-400 font-medium pulse-critical">
              <AlertCircle size={14} />
              긴급 경보 {criticalCount}건
            </span>
          )}
          {warningCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-yellow-400 font-medium">
              <AlertTriangle size={14} />
              주의 {warningCount}건
            </span>
          )}
          {activeTriggerCount > 0 && (
            <span className="flex items-center gap-1.5 text-xs text-red-400 font-medium pulse-critical">
              <AlertCircle size={14} />
              시나리오 트리거 {activeTriggerCount}건 발동
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <Download size={13} /> 내보내기
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <Upload size={13} /> 불러오기
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={e => { if (e.target.files[0]) onImport(e.target.files[0]) }}
          />
          <button
            onClick={() => { if (confirm('모든 데이터를 초기화하시겠습니까?')) onReset() }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded bg-gray-800 hover:bg-red-900/60 text-gray-400 hover:text-red-300 transition-colors"
          >
            <RotateCcw size={13} /> 초기화
          </button>
        </div>
      </div>
    </header>
  )
}
