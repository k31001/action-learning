import { useState } from 'react'
import { Star, ChevronDown, ChevronUp } from 'lucide-react'

const SCENARIO_COLORS = {
  A: { bar: 'bg-blue-500', text: 'text-blue-300', border: 'border-blue-500/40', bg: 'bg-blue-900/30' },
  B: { bar: 'bg-emerald-500', text: 'text-emerald-300', border: 'border-emerald-500/40', bg: 'bg-emerald-900/30' },
  C: { bar: 'bg-red-500', text: 'text-red-300', border: 'border-red-500/40', bg: 'bg-red-900/30' },
  D: { bar: 'bg-orange-500', text: 'text-orange-300', border: 'border-orange-500/40', bg: 'bg-orange-900/30' },
  E: { bar: 'bg-purple-500', text: 'text-purple-300', border: 'border-purple-500/40', bg: 'bg-purple-900/30' },
}

export default function ScenarioPanel({ scenarios, onUpdate }) {
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState('')
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
    <section className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-200">시나리오 확률 추정</h2>
        <span className={`text-xs px-2 py-0.5 rounded font-mono ${total === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
          합계 {total}%
        </span>
      </div>

      <div className="space-y-2">
        {scenarios.map(sc => {
          const c = SCENARIO_COLORS[sc.id]
          return (
            <div key={sc.id} className={`rounded-lg border ${c.border} ${c.bg} p-3`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold ${c.text}`}>{sc.id}</span>
                <span className="text-xs text-gray-200 font-medium">{sc.name}</span>
                {sc.mainBet && <Star size={11} className="text-yellow-400 fill-yellow-400" />}
                <span className="text-xs text-gray-500 ml-auto">{sc.description}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.bar} rounded-full transition-all duration-500`}
                    style={{ width: `${sc.probability}%` }}
                  />
                </div>
                {editing === sc.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={draft}
                      onChange={e => setDraft(e.target.value)}
                      onBlur={() => commitEdit(sc.id)}
                      onKeyDown={e => e.key === 'Enter' && commitEdit(sc.id)}
                      className="w-14 bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs text-white text-center focus:outline-none focus:border-gray-400"
                      autoFocus
                    />
                    <span className="text-xs text-gray-400">%</span>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(sc)}
                    className={`text-sm font-bold ${c.text} w-12 text-right hover:underline`}
                  >
                    {sc.probability}%
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-2 text-xs text-gray-600">확률값 클릭 시 직접 수정 가능 — 분기별 EWI 검토 후 업데이트 권장</p>
    </section>
  )
}
