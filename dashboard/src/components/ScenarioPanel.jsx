import { useState } from 'react'
import { Star, Zap, Info } from 'lucide-react'

const SCENARIO_COLORS = {
  A: { bar: 'bg-sky-500', text: 'text-sky-700', border: 'border-sky-300', bg: 'bg-sky-100/30' },
  B: { bar: 'bg-emerald-500', text: 'text-emerald-700', border: 'border-emerald-300', bg: 'bg-emerald-100/30' },
  C: { bar: 'bg-red-500', text: 'text-red-700', border: 'border-red-300', bg: 'bg-red-100/30' },
  D: { bar: 'bg-orange-500', text: 'text-orange-700', border: 'border-orange-500/40', bg: 'bg-orange-100/30' },
  E: { bar: 'bg-purple-500', text: 'text-purple-700', border: 'border-purple-300', bg: 'bg-purple-100/30' },
}

export default function ScenarioPanel({ scenarios, adjustedScenarios, onUpdate }) {
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState('')

  const hasAdjustment = adjustedScenarios.some(s => s.delta !== 0)
  const total = scenarios.reduce((s, sc) => s + (sc.probability || 0), 0)

  function startEdit(sc) {
    setEditing(sc.id)
    setDraft(String(sc.probability))
  }

  function commitEdit(id) {
    const v = Math.max(0, Math.min(100, parseInt(draft, 10) || 0))
    onUpdate(id, v)
    setEditing(null)
  }

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-slate-800">시나리오 확률 추정</h2>
        <span className={`text-xs px-2 py-0.5 rounded font-mono ${total === 100 ? 'text-emerald-600' : 'text-yellow-600'}`}>
          기준 합계 {total}%
        </span>
      </div>

      {/* Auto-adjustment notice */}
      {hasAdjustment && (
        <div className="flex items-start gap-2 bg-yellow-50 border border-amber-200 rounded-lg px-3 py-2 mb-3 text-xs text-yellow-700">
          <Zap size={12} className="mt-0.5 shrink-0 text-yellow-600" />
          <span>활성 트리거에 의해 확률이 자동 조정됐습니다. 막대의 투명한 부분이 기준값, 진한 부분이 조정값입니다.</span>
        </div>
      )}

      <div className="space-y-2">
        {adjustedScenarios.map(sc => {
          const base = scenarios.find(s => s.id === sc.id)
          const c = SCENARIO_COLORS[sc.id]
          const delta = sc.delta ?? 0
          const adjusted = sc.probability
          const baseProb = base?.probability ?? adjusted

          return (
            <div key={sc.id} className={`rounded-lg border ${c.border} ${c.bg} p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold ${c.text}`}>{sc.id}</span>
                <span className="text-xs text-slate-800 font-medium">{sc.name}</span>
                {sc.mainBet && <Star size={11} className="text-yellow-600 fill-yellow-400" />}
                <span className="text-xs text-slate-500 ml-auto">{sc.description}</span>
              </div>

              {/* Bar: base (dim) + adjusted (bright) */}
              <div className="flex items-center gap-3">
                <div className="flex-1 relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  {/* Base bar (dimmed, shown when adjusted) */}
                  {delta !== 0 && (
                    <div
                      className={`absolute inset-y-0 left-0 ${c.bar} opacity-25 rounded-full transition-all duration-500`}
                      style={{ width: `${baseProb}%` }}
                    />
                  )}
                  {/* Adjusted bar */}
                  <div
                    className={`absolute inset-y-0 left-0 ${c.bar} rounded-full transition-all duration-500`}
                    style={{ width: `${adjusted}%` }}
                  />
                </div>

                <div className="flex items-baseline gap-1 min-w-[80px] justify-end">
                  {/* Adjusted probability */}
                  {editing === sc.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number" min="0" max="100"
                        value={draft}
                        onChange={e => setDraft(e.target.value)}
                        onBlur={() => commitEdit(sc.id)}
                        onKeyDown={e => e.key === 'Enter' && commitEdit(sc.id)}
                        className="w-12 bg-slate-100 border border-slate-300 rounded px-1.5 py-0.5 text-xs text-slate-900 text-center focus:outline-none focus:border-slate-400"
                        autoFocus
                      />
                      <span className="text-xs text-slate-500">%</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEdit(sc)}
                      className={`text-sm font-bold font-mono ${c.text} hover:underline`}
                      title="기준 확률 직접 수정"
                    >
                      {adjusted}%
                    </button>
                  )}

                  {/* Delta badge */}
                  {delta !== 0 && (
                    <span className={`text-xs font-mono font-bold ${delta > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {delta > 0 ? `+${delta}` : delta}
                    </span>
                  )}
                </div>
              </div>

              {/* Base label */}
              {delta !== 0 && (
                <div className="mt-1 text-xs text-slate-400 text-right">
                  기준 {baseProb}% → 조정 {adjusted}%
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="mt-2 text-xs text-slate-400">
        확률값 클릭 → 기준값 수정 | 트리거 발동 시 자동 조정 (정규화 후 합계 100%)
      </p>
    </section>
  )
}
