import { useState } from 'react'
import { Plus, Info } from 'lucide-react'

// DF1 (X) : AI 수요  -10(버블붕괴) → +10(슈퍼사이클)
// DF2 (Y) : 디커플링 -10(공존)    → +10(전면디커플링)
// SVG y-axis is flipped: high decoupling = top of chart = low SVG-y

const W = 480
const H = 440
const PAD = 48

const QUADRANTS = [
  { id: 'A', name: '황금 요새', x: W / 2 + PAD / 2, y: PAD / 2, color: '#1d4ed8', bg: 'rgba(29,78,216,0.12)', textColor: '#93c5fd', mainBet: false },
  { id: 'B', name: 'AI 르네상스', x: W / 2 + PAD / 2, y: H / 2 + PAD / 2, color: '#059669', bg: 'rgba(5,150,105,0.15)', textColor: '#6ee7b7', mainBet: true },
  { id: 'C', name: '기술 냉전', x: PAD / 2, y: PAD / 2, color: '#dc2626', bg: 'rgba(220,38,38,0.12)', textColor: '#fca5a5', mainBet: false },
  { id: 'D', name: '조용한 재편', x: PAD / 2, y: H / 2 + PAD / 2, color: '#d97706', bg: 'rgba(217,119,6,0.12)', textColor: '#fcd34d', mainBet: false },
]

function toSvg(dfX, dfY) {
  const cx = PAD + ((dfX + 10) / 20) * (W - 2 * PAD)
  const cy = PAD + ((10 - dfY) / 20) * (H - 2 * PAD)
  return { cx, cy }
}

const TIME_LABELS = ['2y', '1y', '6m', '3m', '1m', '현재']
const POINT_RADII = [4, 5, 5, 6, 7, 11]
const POINT_OPACITY = [0.35, 0.45, 0.55, 0.65, 0.8, 1]

export default function QuadrantMap({ positions, onAddSnapshot }) {
  const [hovered, setHovered] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [draft, setDraft] = useState({ df1: 7, df2: 4, note: '' })

  const current = positions[positions.length - 1]

  const keys = ['twoYear', 'oneYear', 'sixMonth', 'threeMonth', 'oneMonth', 'current']
  const pts = keys.map(k => positions.find(p => p.key === k)).filter(Boolean)

  function handleAdd() {
    onAddSnapshot({ ...draft, key: 'current', date: new Date().toISOString().slice(0, 10) })
    setShowAdd(false)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-200">시나리오 포지션 맵</h2>
          <p className="text-xs text-gray-500 mt-0.5">DF1 (AI 수요) × DF2 (디커플링 강도) — 현재 위치 및 추이</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          <Plus size={12} /> 스냅샷 추가
        </button>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        style={{ maxHeight: 420 }}
      >
        {/* Quadrant backgrounds */}
        {QUADRANTS.map(q => {
          const qx = q.id === 'C' || q.id === 'D' ? PAD : W / 2
          const qy = q.id === 'A' || q.id === 'C' ? PAD : H / 2
          const qw = (W - 2 * PAD) / 2
          const qh = (H - 2 * PAD) / 2
          return (
            <g key={q.id}>
              <rect x={qx} y={qy} width={qw} height={qh} fill={q.bg} />
              {/* Scenario label */}
              <text
                x={q.x}
                y={q.y + 18}
                textAnchor={q.id === 'A' || q.id === 'B' ? 'start' : 'start'}
                className="select-none"
                style={{ fontSize: 13, fill: q.color, fontWeight: 700 }}
              >
                {q.id}
              </text>
              <text
                x={q.x}
                y={q.y + 33}
                textAnchor="start"
                className="select-none"
                style={{ fontSize: 11, fill: q.textColor, opacity: 0.85 }}
              >
                {q.name}
              </text>
              {q.mainBet && (
                <text x={q.x} y={q.y + 48} textAnchor="start" style={{ fontSize: 10, fill: '#fbbf24' }}>
                  ⭐ Main Bet
                </text>
              )}
            </g>
          )
        })}

        {/* Grid lines (axes) */}
        {/* X axis */}
        <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#374151" strokeWidth={1.5} strokeDasharray="4 3" />
        {/* Y axis */}
        <line x1={W / 2} y1={PAD} x2={W / 2} y2={H - PAD} stroke="#374151" strokeWidth={1.5} strokeDasharray="4 3" />

        {/* Axis labels */}
        <text x={PAD + 2} y={H / 2 - 6} style={{ fontSize: 9, fill: '#6b7280' }}>← AI 거품 붕괴</text>
        <text x={W - PAD - 2} y={H / 2 - 6} textAnchor="end" style={{ fontSize: 9, fill: '#6b7280' }}>AI 수요 지속 →</text>
        <text x={W / 2 + 5} y={PAD + 10} style={{ fontSize: 9, fill: '#6b7280' }}>↑ 디커플링 심화</text>
        <text x={W / 2 + 5} y={H - PAD - 5} style={{ fontSize: 9, fill: '#6b7280' }}>↓ 관리된 공존</text>

        {/* Trail line */}
        {pts.length >= 2 && (
          <polyline
            points={pts.map(p => {
              const { cx, cy } = toSvg(p.df1, p.df2)
              return `${cx},${cy}`
            }).join(' ')}
            fill="none"
            stroke="#4b5563"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
        )}

        {/* Historical points */}
        {pts.map((p, i) => {
          const { cx, cy } = toSvg(p.df1, p.df2)
          const label = TIME_LABELS[keys.indexOf(p.key)]
          const r = POINT_RADII[i]
          const op = POINT_OPACITY[i]
          const isLast = i === pts.length - 1
          const isCurrent = p.key === 'current'

          return (
            <g key={p.key}
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {isCurrent && (
                <circle cx={cx} cy={cy} r={r + 8} fill="rgba(16,185,129,0.15)" />
              )}
              <circle
                cx={cx} cy={cy} r={r}
                fill={isCurrent ? '#10b981' : '#6b7280'}
                opacity={op}
                stroke={isCurrent ? '#34d399' : '#9ca3af'}
                strokeWidth={isCurrent ? 2 : 1}
              />
              {/* Label */}
              <text
                x={cx + r + 4}
                y={cy + 4}
                style={{ fontSize: 10, fill: isCurrent ? '#34d399' : '#9ca3af', opacity: op }}
                className="select-none"
              >
                {label}
              </text>
              {p.date && isCurrent && (
                <text x={cx + r + 4} y={cy + 16} style={{ fontSize: 9, fill: '#6b7280' }}>
                  {p.date}
                </text>
              )}
            </g>
          )
        })}

        {/* Tooltip */}
        {hovered && (() => {
          const { cx, cy } = toSvg(hovered.df1, hovered.df2)
          const tx = cx > W / 2 ? cx - 110 : cx + 14
          const ty = cy > H / 2 ? cy - 54 : cy + 10
          return (
            <g>
              <rect x={tx} y={ty} width={105} height={46} rx={5} fill="#1f2937" stroke="#374151" strokeWidth={1} />
              <text x={tx + 8} y={ty + 15} style={{ fontSize: 10, fill: '#e5e7eb', fontWeight: 600 }}>
                {TIME_LABELS[keys.indexOf(hovered.key)]}
                {hovered.date ? ` (${hovered.date})` : ''}
              </text>
              <text x={tx + 8} y={ty + 29} style={{ fontSize: 10, fill: '#9ca3af' }}>
                AI수요: {hovered.df1}  디커플링: {hovered.df2}
              </text>
              {hovered.note && (
                <text x={tx + 8} y={ty + 42} style={{ fontSize: 9, fill: '#6b7280' }}>
                  {hovered.note.slice(0, 18)}
                </text>
              )}
            </g>
          )
        })()}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 opacity-100" /> 현재</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-500 opacity-80" /> 1개월 전</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-500 opacity-65" /> 3·6개월 전</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-500 opacity-45" /> 1·2년 전</span>
        <span className="ml-auto text-gray-600">값을 클릭하면 상세 표시</span>
      </div>

      {/* Snapshot add modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-white mb-4">포지션 스냅샷 추가</h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">
                  DF1: AI 수요 강도 ({draft.df1}) — -10(버블붕괴) ~ +10(슈퍼사이클)
                </label>
                <input
                  type="range" min="-10" max="10" step="0.5"
                  value={draft.df1}
                  onChange={e => setDraft(d => ({ ...d, df1: +e.target.value }))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                  <span>-10</span><span>0</span><span>+10</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1.5">
                  DF2: 디커플링 강도 ({draft.df2}) — -10(완전공존) ~ +10(전면디커플링)
                </label>
                <input
                  type="range" min="-10" max="10" step="0.5"
                  value={draft.df2}
                  onChange={e => setDraft(d => ({ ...d, df2: +e.target.value }))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                  <span>-10</span><span>0</span><span>+10</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 block mb-1.5">메모</label>
                <input
                  type="text"
                  value={draft.note}
                  onChange={e => setDraft(d => ({ ...d, note: e.target.value }))}
                  placeholder="예: MATCH법안 위원회 통과 직후..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none"
                />
              </div>

              {/* Preview dot */}
              <div className="bg-gray-800/60 rounded-lg p-3 text-xs text-gray-400">
                현재 위치 예상:&nbsp;
                {draft.df1 > 0 && draft.df2 < 0 ? '🟢 B — AI 르네상스'
                  : draft.df1 > 0 && draft.df2 > 0 ? '🔵 A — 황금 요새'
                  : draft.df1 < 0 && draft.df2 > 0 ? '🔴 C — 기술 냉전'
                  : '🟡 D — 조용한 재편'}
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowAdd(false)}
                className="flex-1 py-2 text-sm rounded-lg border border-gray-700 text-gray-400 hover:text-white transition-colors">
                취소
              </button>
              <button onClick={handleAdd}
                className="flex-1 py-2 text-sm rounded-lg bg-samsung-blue hover:bg-blue-700 text-white font-medium transition-colors">
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
