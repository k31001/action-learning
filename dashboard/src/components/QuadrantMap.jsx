import { useState } from 'react'
import { Plus, Zap } from 'lucide-react'

// X = DF1: AI 수요  -10(버블붕괴) → +10(슈퍼사이클)
// Y = DF2: 디커플링 -10(공존)    → +10(전면디커플링)
// SVG: y 축 반전 (디커플링 심화 = SVG 상단)

const W = 480
const H = 440
const PAD = 48

const QUADRANTS = [
  { id: 'A', name: '황금 요새',   col: 'right', row: 'top',    color: '#1d4ed8', bg: 'rgba(29,78,216,0.10)',   text: '#93c5fd', mainBet: false },
  { id: 'B', name: 'AI 르네상스', col: 'right', row: 'bottom', color: '#059669', bg: 'rgba(5,150,105,0.14)',   text: '#6ee7b7', mainBet: true  },
  { id: 'C', name: '기술 냉전',   col: 'left',  row: 'top',    color: '#dc2626', bg: 'rgba(220,38,38,0.10)',   text: '#fca5a5', mainBet: false },
  { id: 'D', name: '조용한 재편', col: 'left',  row: 'bottom', color: '#d97706', bg: 'rgba(217,119,6,0.10)',   text: '#fcd34d', mainBet: false },
]

function toSvg(df1, df2) {
  return {
    cx: PAD + ((df1 + 10) / 20) * (W - 2 * PAD),
    cy: PAD + ((10 - df2) / 20) * (H - 2 * PAD),
  }
}

const TIME_KEYS   = ['twoYear', 'oneYear', 'sixMonth', 'threeMonth', 'oneMonth', 'current']
const TIME_LABELS = ['2년 전',  '1년 전',  '6개월 전', '3개월 전',   '1개월 전', '현재']
const RADII       = [4, 4.5, 5, 5.5, 7, 11]
const OPACITIES   = [0.30, 0.40, 0.50, 0.62, 0.80, 1]

function quadrantOf(df1, df2) {
  if (df1 >= 0 && df2 >= 0) return 'A'
  if (df1 >= 0 && df2 <  0) return 'B'
  if (df1 <  0 && df2 >= 0) return 'C'
  return 'D'
}

export default function QuadrantMap({ positions, adjustedPosition, onAddSnapshot }) {
  const [hovered, setHovered] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [draft, setDraft] = useState({ df1: 7, df2: 4, note: '' })

  const pts = TIME_KEYS.map(k => positions.find(p => p.key === k)).filter(Boolean)
  const basePos = positions.find(p => p.key === 'current')
  const adjPos  = adjustedPosition  // { df1, df2, baseDf1, baseDf2, isAdjusted, activeTriggerNames }

  function handleAdd() {
    onAddSnapshot({ ...draft, key: 'current', date: new Date().toISOString().slice(0, 10) })
    setShowAdd(false)
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-sm font-semibold text-gray-200">시나리오 포지션 맵</h2>
          <p className="text-xs text-gray-500 mt-0.5">DF1 (AI 수요) × DF2 (디커플링 강도)</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
        >
          <Plus size={12} /> 스냅샷
        </button>
      </div>

      {/* Trigger adjustment notice */}
      {adjPos?.isAdjusted && (
        <div className="flex items-start gap-2 bg-yellow-950/40 border border-yellow-500/30 rounded-lg px-3 py-2 mb-2 text-xs text-yellow-300">
          <Zap size={12} className="mt-0.5 shrink-0" />
          <span>
            트리거 영향으로 포지션 자동 이동: DF1 {adjPos.df1Delta > 0 ? '+' : ''}{adjPos.df1Delta.toFixed(1)} / DF2 {adjPos.df2Delta > 0 ? '+' : ''}{adjPos.df2Delta.toFixed(1)}
            {adjPos.activeTriggerNames?.length > 0 && (
              <span className="text-yellow-500"> ({adjPos.activeTriggerNames.join(', ')})</span>
            )}
          </span>
        </div>
      )}

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 420 }}>
        {/* Quadrant backgrounds */}
        {QUADRANTS.map(q => {
          const qx = q.col === 'left'   ? PAD     : W / 2
          const qy = q.row === 'top'    ? PAD     : H / 2
          const qw = (W - 2 * PAD) / 2
          const qh = (H - 2 * PAD) / 2
          const lx = q.col === 'left'   ? PAD + 8 : W / 2 + 8
          const ly = q.row === 'top'    ? PAD + 8 : H / 2 + 8
          return (
            <g key={q.id}>
              <rect x={qx} y={qy} width={qw} height={qh} fill={q.bg} />
              <text x={lx} y={ly + 14} style={{ fontSize: 13, fill: q.color, fontWeight: 700 }}>
                {q.id}
              </text>
              <text x={lx} y={ly + 28} style={{ fontSize: 11, fill: q.text, opacity: 0.85 }}>
                {q.name}
              </text>
              {q.mainBet && (
                <text x={lx} y={ly + 42} style={{ fontSize: 10, fill: '#fbbf24' }}>⭐ Main Bet</text>
              )}
            </g>
          )
        })}

        {/* Axes */}
        <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="#374151" strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={W / 2} y1={PAD} x2={W / 2} y2={H - PAD} stroke="#374151" strokeWidth={1.5} strokeDasharray="4 3" />

        <text x={PAD + 2}    y={H / 2 - 6} style={{ fontSize: 9, fill: '#6b7280' }}>← AI 거품 붕괴</text>
        <text x={W - PAD - 2} y={H / 2 - 6} textAnchor="end" style={{ fontSize: 9, fill: '#6b7280' }}>AI 수요 지속 →</text>
        <text x={W / 2 + 5}  y={PAD + 10}  style={{ fontSize: 9, fill: '#6b7280' }}>↑ 디커플링 심화</text>
        <text x={W / 2 + 5}  y={H - PAD - 5} style={{ fontSize: 9, fill: '#6b7280' }}>↓ 관리된 공존</text>

        {/* Historical trail */}
        {pts.length >= 2 && (
          <polyline
            points={pts.map(p => {
              const { cx, cy } = toSvg(p.df1, p.df2)
              return `${cx},${cy}`
            }).join(' ')}
            fill="none" stroke="#4b5563" strokeWidth={1.5} strokeDasharray="4 3"
          />
        )}

        {/* Arrow from base to adjusted (when trigger-adjusted) */}
        {adjPos?.isAdjusted && basePos && (() => {
          const b = toSvg(adjPos.baseDf1, adjPos.baseDf2)
          const a = toSvg(adjPos.df1, adjPos.df2)
          const dx = a.cx - b.cx
          const dy = a.cy - b.cy
          const len = Math.sqrt(dx * dx + dy * dy)
          if (len < 4) return null
          // Arrowhead
          const angle = Math.atan2(dy, dx)
          const arrowLen = 10
          const ax1 = a.cx - arrowLen * Math.cos(angle - 0.4)
          const ay1 = a.cy - arrowLen * Math.sin(angle - 0.4)
          const ax2 = a.cx - arrowLen * Math.cos(angle + 0.4)
          const ay2 = a.cy - arrowLen * Math.sin(angle + 0.4)
          return (
            <g>
              <line
                x1={b.cx} y1={b.cy} x2={a.cx} y2={a.cy}
                stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 3"
                opacity={0.8}
              />
              <polygon
                points={`${a.cx},${a.cy} ${ax1},${ay1} ${ax2},${ay2}`}
                fill="#fbbf24" opacity={0.8}
              />
            </g>
          )
        })()}

        {/* Historical points */}
        {pts.map((p, i) => {
          const { cx, cy } = toSvg(p.df1, p.df2)
          const isCurrent = p.key === 'current'
          const r = RADII[i]
          const op = OPACITIES[i]
          return (
            <g key={p.key}
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {isCurrent && <circle cx={cx} cy={cy} r={r + 8} fill="rgba(16,185,129,0.12)" />}
              <circle
                cx={cx} cy={cy} r={r}
                fill={isCurrent ? '#10b981' : '#6b7280'}
                opacity={op}
                stroke={isCurrent ? '#34d399' : '#9ca3af'}
                strokeWidth={isCurrent ? 2 : 1}
              />
              <text
                x={cx + r + 4} y={cy + 4}
                style={{ fontSize: 10, fill: isCurrent ? '#34d399' : '#9ca3af', opacity: op, userSelect: 'none' }}
              >
                {TIME_LABELS[i]}
              </text>
              {isCurrent && p.date && (
                <text x={cx + r + 4} y={cy + 16}
                  style={{ fontSize: 9, fill: '#6b7280', userSelect: 'none' }}>
                  {p.date}
                </text>
              )}
            </g>
          )
        })}

        {/* Trigger-adjusted position (yellow star) */}
        {adjPos?.isAdjusted && (() => {
          const { cx, cy } = toSvg(adjPos.df1, adjPos.df2)
          const qId = quadrantOf(adjPos.df1, adjPos.df2)
          const q = QUADRANTS.find(q => q.id === qId)
          return (
            <g style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHovered({ ...adjPos, key: 'adjusted', label: '트리거 조정 포지션' })}
              onMouseLeave={() => setHovered(null)}
            >
              <circle cx={cx} cy={cy} r={18} fill="rgba(251,191,36,0.12)" />
              <circle cx={cx} cy={cy} r={11}
                fill="#fbbf24" opacity={0.95}
                stroke="#fde68a" strokeWidth={2.5}
              />
              <text x={cx} y={cy + 4} textAnchor="middle"
                style={{ fontSize: 11, fill: '#1c1917', fontWeight: 700, userSelect: 'none' }}>
                {qId}
              </text>
            </g>
          )
        })()}

        {/* Hover tooltip */}
        {hovered && (() => {
          const df1 = hovered.df1 ?? hovered.baseDf1
          const df2 = hovered.df2 ?? hovered.baseDf2
          if (df1 == null) return null
          const { cx, cy } = toSvg(df1, df2)
          const tx = cx > W * 0.6 ? cx - 120 : cx + 14
          const ty = cy > H * 0.6 ? cy - 60  : cy + 12
          return (
            <g>
              <rect x={tx} y={ty} width={115} height={50} rx={6} fill="#1f2937" stroke="#374151" strokeWidth={1} />
              <text x={tx + 8} y={ty + 16} style={{ fontSize: 10, fill: '#e5e7eb', fontWeight: 600 }}>
                {hovered.label ?? TIME_LABELS[TIME_KEYS.indexOf(hovered.key)] ?? ''}
                {hovered.date ? ` (${hovered.date})` : ''}
              </text>
              <text x={tx + 8} y={ty + 30} style={{ fontSize: 10, fill: '#9ca3af' }}>
                AI수요: {df1}  디커플링: {df2}
              </text>
              {hovered.note && (
                <text x={tx + 8} y={ty + 44} style={{ fontSize: 9, fill: '#6b7280' }}>
                  {String(hovered.note).slice(0, 20)}
                </text>
              )}
            </g>
          )
        })()}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> 기준 현재 위치</span>
        {adjPos?.isAdjusted && (
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400" /> 트리거 조정 위치</span>
        )}
        <span className="flex items-center gap-1.5"><span className="inline-block w-5 border-b border-dashed border-gray-500" /> 이동 경로</span>
        {adjPos?.isAdjusted && (
          <span className="flex items-center gap-1.5"><span className="inline-block w-5 border-b-2 border-dashed border-yellow-400" /> 트리거 이동 방향</span>
        )}
      </div>

      {/* Add snapshot modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="font-semibold text-white mb-4">현재 포지션 스냅샷 저장</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">
                  DF1: AI 수요 강도 <span className="text-white font-mono">{draft.df1}</span>
                  <span className="text-gray-600 ml-2">−10(버블붕괴) ~ +10(슈퍼사이클)</span>
                </label>
                <input type="range" min="-10" max="10" step="0.5" value={draft.df1}
                  onChange={e => setDraft(d => ({ ...d, df1: +e.target.value }))}
                  className="w-full accent-emerald-500" />
                <div className="flex justify-between text-xs text-gray-600"><span>−10</span><span>0</span><span>+10</span></div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">
                  DF2: 디커플링 강도 <span className="text-white font-mono">{draft.df2}</span>
                  <span className="text-gray-600 ml-2">−10(완전공존) ~ +10(전면디커플링)</span>
                </label>
                <input type="range" min="-10" max="10" step="0.5" value={draft.df2}
                  onChange={e => setDraft(d => ({ ...d, df2: +e.target.value }))}
                  className="w-full accent-blue-500" />
                <div className="flex justify-between text-xs text-gray-600"><span>−10</span><span>0</span><span>+10</span></div>
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1.5">메모</label>
                <input type="text" value={draft.note}
                  onChange={e => setDraft(d => ({ ...d, note: e.target.value }))}
                  placeholder="예: MATCH법안 위원회 통과 직후..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none" />
              </div>
              <div className="bg-gray-800/60 rounded-lg p-3 text-xs text-gray-400">
                예상 시나리오:&nbsp;
                {draft.df1 >= 0 && draft.df2 < 0 ? '🟢 B — AI 르네상스'
                  : draft.df1 >= 0 && draft.df2 >= 0 ? '🔵 A — 황금 요새'
                  : draft.df1 < 0 && draft.df2 >= 0 ? '🔴 C — 기술 냉전'
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
