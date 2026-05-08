import { useState, useMemo } from 'react'
import {
  ScatterChart, Scatter, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ZAxis,
} from 'recharts'
import { Layers, Compass, Map, BookOpen, Star, AlertOctagon, Target, ChevronDown, ChevronUp } from 'lucide-react'
import {
  STEEP_DATA, DRIVING_FORCES_DATA, SCENARIOS_DATA, BENCHMARK_DATA,
} from '../data/scenarioPlanning'

const SUB_TABS = [
  { id: 'steep',     label: 'STEEP',           icon: Layers },
  { id: 'drivers',   label: 'Driving Forces',  icon: Compass },
  { id: 'scenarios', label: 'Scenarios',       icon: Map },
  { id: 'benchmark', label: 'Benchmark',       icon: BookOpen },
]

// ── 공통 ────────────────────────────────────────────────────────────────────
function Card({ title, source, children, className = '' }) {
  return (
    <div className={`bg-gray-900 border border-gray-800 rounded-xl p-4 ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-gray-200">{title}</h3>
          {source && <p className="text-xs text-gray-600 mt-0.5">출처: {source}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

const AXIS = { tick: { fill: '#9ca3af', fontSize: 11 }, axisLine: { stroke: '#374151' }, tickLine: { stroke: '#374151' } }
const GRID = { stroke: '#1f2937', strokeDasharray: '3 3' }

// ─────────────────────────────────────────────────────────────────────────────
// STEEP
// ─────────────────────────────────────────────────────────────────────────────
function STEEPPanel() {
  const [openCat, setOpenCat] = useState('T')
  const totals = STEEP_DATA.categories.map(c => ({ ...c, count: c.factors.length, avgIU: +(c.factors.reduce((s, f) => s + f.impact * f.uncertainty, 0) / c.factors.length).toFixed(1) }))

  return (
    <div className="space-y-4">
      <Card title="STEEP 카테고리별 요인 구성" source="analysis/steep/*.md">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={totals} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="label" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} />
            <YAxis yAxisId="right" orientation="right" {...AXIS} />
            <Tooltip
              contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8, fontSize: 11 }}
              labelStyle={{ color: '#e5e7eb' }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
            <Bar yAxisId="left" dataKey="count" name="요인 수" radius={[4, 4, 0, 0]}>
              {totals.map((c, i) => <Cell key={i} fill={c.color} />)}
            </Bar>
            <Bar yAxisId="right" dataKey="avgIU" name="평균 I×U" fill="#6b7280" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="space-y-2">
        {STEEP_DATA.categories.map(cat => {
          const isOpen = openCat === cat.id
          return (
            <div key={cat.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCat(isOpen ? null : cat.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-800/50 transition-colors text-left"
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0 text-sm"
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.id}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-200">{cat.label} ({cat.name})</span>
                    <span className="text-xs text-gray-500">— {cat.factors.length}개 요인</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{cat.summary}</p>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-gray-500" /> : <ChevronDown size={16} className="text-gray-500" />}
              </button>
              {isOpen && (
                <div className="border-t border-gray-800 px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.factors.map(f => {
                    const iu = f.impact * f.uncertainty
                    const tier = iu >= 16 ? 'critical' : iu >= 9 ? 'medium' : 'low'
                    const tierCls = {
                      critical: 'border-red-500/40 bg-red-950/20',
                      medium:   'border-amber-500/30 bg-amber-950/15',
                      low:      'border-gray-700 bg-gray-800/30',
                    }[tier]
                    return (
                      <div key={f.id} className={`flex items-center gap-2 py-1.5 px-2.5 rounded-lg border ${tierCls}`}>
                        <span className="text-[10px] font-mono text-gray-500 shrink-0 w-7">{f.id}</span>
                        <span className="text-xs text-gray-300 flex-1 truncate">{f.name}</span>
                        <span className="text-[10px] font-mono text-gray-500 shrink-0">I {f.impact}/U {f.uncertainty}</span>
                        <span className={`text-[10px] font-mono font-bold shrink-0 ${
                          tier === 'critical' ? 'text-red-400' : tier === 'medium' ? 'text-amber-400' : 'text-gray-500'
                        }`}>{iu}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVING FORCES — Impact × Uncertainty scatter + 3 selected DFs
// ─────────────────────────────────────────────────────────────────────────────
function DrivingForcesPanel() {
  // Flatten all 50 factors with category color for the scatter plot.
  // Group by exact (impact, uncertainty) cell to show count when factors overlap.
  const scatterByCategory = useMemo(() => {
    const byCat = {}
    for (const cat of STEEP_DATA.categories) {
      const cellMap = new Map()
      for (const f of cat.factors) {
        const k = `${f.impact}|${f.uncertainty}`
        const arr = cellMap.get(k) ?? []
        arr.push(f)
        cellMap.set(k, arr)
      }
      byCat[cat.id] = {
        color: cat.color,
        label: cat.label,
        points: Array.from(cellMap.entries()).map(([k, arr]) => {
          const [i, u] = k.split('|').map(Number)
          return { impact: i, uncertainty: u, size: arr.length, names: arr.map(x => x.name).join(', '), iu: i * u }
        }),
      }
    }
    return byCat
  }, [])

  return (
    <div className="space-y-4">
      <Card
        title="Impact × Uncertainty 매트릭스 (50개 요인)"
        source="analysis/driving-forces/impact-uncertainty-matrix.md"
      >
        <p className="text-xs text-gray-500 mb-2">
          우상단 (Impact ≥ 4 + Uncertainty ≥ 4) = 핵심 불확실성 = Driving Force 후보. 점 크기는 같은 좌표에 있는 요인 수.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis
              type="number" dataKey="impact"
              domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]}
              {...AXIS}
              label={{ value: 'Impact (1~5)', position: 'insideBottom', offset: -5, fill: '#9ca3af', fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="uncertainty"
              domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]}
              {...AXIS}
              label={{ value: 'Uncertainty (1~5)', angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 11 }}
            />
            <ZAxis type="number" dataKey="size" range={[60, 280]} />
            <ReferenceLine x={3.5} stroke="#4b5563" strokeDasharray="4 3" />
            <ReferenceLine y={3.5} stroke="#4b5563" strokeDasharray="4 3" />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null
                const p = payload[0].payload
                return (
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-xs shadow-xl max-w-xs">
                    <div className="text-gray-400 mb-1">I={p.impact} / U={p.uncertainty} (I×U={p.iu})</div>
                    <div className="text-gray-200">{p.names}</div>
                  </div>
                )
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
            {Object.entries(scatterByCategory).map(([catId, info]) => (
              <Scatter
                key={catId}
                name={info.label}
                data={info.points}
                fill={info.color}
                fillOpacity={0.75}
                stroke={info.color}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Top 10 핵심 불확실성 (I×U 기준)" source="analysis/driving-forces/impact-uncertainty-matrix.md">
        <div className="space-y-1.5">
          {DRIVING_FORCES_DATA.top10.map(item => {
            const cat = STEEP_DATA.categories.find(c => c.id === item.category)
            return (
              <div key={item.id} className="flex items-center gap-3 py-1.5 px-2.5 rounded bg-gray-800/40 border border-gray-800">
                <span className="text-sm font-bold text-gray-500 w-6 shrink-0">#{item.rank}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded font-mono shrink-0"
                  style={{ backgroundColor: `${cat.color}30`, color: cat.color }}
                >
                  {item.id}
                </span>
                <span className="text-xs text-gray-200 flex-1">{item.name}</span>
                <span className="text-xs font-mono font-bold text-amber-400 shrink-0">I×U = {item.iu}</span>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DRIVING_FORCES_DATA.drivers.map((d, i) => {
          const isMain = i < 2
          return (
            <div
              key={d.id}
              className={`border rounded-xl p-4 ${
                isMain ? 'border-blue-500/40 bg-blue-950/20' : 'border-purple-500/40 bg-purple-950/20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isMain ? 'bg-blue-900/60 text-blue-300' : 'bg-purple-900/60 text-purple-300'}`}>
                  {d.id}
                </span>
                <span className="text-xs text-gray-500">{d.role}</span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-3">{d.title}</h4>

              <div className="space-y-2 mb-3">
                <div className="border-l-2 border-emerald-500 pl-2.5">
                  <div className="text-[10px] uppercase tracking-wide text-emerald-400 font-bold">Pole A · {d.poleA.label}</div>
                  <div className="text-xs text-gray-300 mt-0.5">{d.poleA.narrative}</div>
                </div>
                <div className="border-l-2 border-red-500 pl-2.5">
                  <div className="text-[10px] uppercase tracking-wide text-red-400 font-bold">Pole B · {d.poleB.label}</div>
                  <div className="text-xs text-gray-300 mt-0.5">{d.poleB.narrative}</div>
                </div>
              </div>

              <div className="text-[11px] text-amber-300 bg-amber-950/30 border border-amber-700/30 rounded px-2 py-1.5">
                📍 현재: {d.currentPosition}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIOS — 2x2 matrix + probability + cards + branching points
// ─────────────────────────────────────────────────────────────────────────────
function ScenariosPanel() {
  const main4 = SCENARIOS_DATA.matrix.filter(s => !s.wildcard)
  const wildcard = SCENARIOS_DATA.matrix.find(s => s.wildcard)
  const pieData = SCENARIOS_DATA.matrix.map(s => ({ name: `${s.emoji} ${s.id} ${s.name}`, value: s.probability, color: s.color }))

  // 2x2 grid mapping (DF1 X-axis: Right=AI 지속 / Left=거품, DF2 Y-axis: Top=디커플링 / Bottom=공존)
  const quadrants = [
    { row: 0, col: 0, scenarioId: 'C' }, // 디커플링 + 거품
    { row: 0, col: 1, scenarioId: 'A' }, // 디커플링 + 지속
    { row: 1, col: 0, scenarioId: 'D' }, // 공존 + 거품
    { row: 1, col: 1, scenarioId: 'B' }, // 공존 + 지속
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
        <Card title="시나리오 매트릭스 (DF1 × DF2)" source="analysis/scenarios/scenario-matrix.md">
          <div className="relative">
            {/* Y-axis label */}
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] text-gray-500 whitespace-nowrap">
              DF2: 디커플링 ↑ / 공존 ↓
            </div>
            {/* X-axis label */}
            <div className="text-center text-[10px] text-gray-500 mb-1">
              DF1: AI 거품 ← / AI 지속 →
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 ml-6">
              {quadrants.map(({ scenarioId }) => {
                const s = main4.find(x => x.id === scenarioId)
                return (
                  <div
                    key={scenarioId}
                    className="rounded-xl p-3 border-2 min-h-[140px] flex flex-col"
                    style={{ borderColor: s.color, backgroundColor: `${s.color}15` }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <span className="text-2xl">{s.emoji}</span>
                        <span className="ml-1.5 text-sm font-bold text-white">{s.id}</span>
                        <span className="ml-1 text-xs text-gray-300">{s.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.probability}%</div>
                        {s.mainBet && <div className="text-[9px] font-bold text-amber-400 flex items-center gap-0.5"><Star size={9} /> Main Bet</div>}
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-snug mt-1">{s.summary}</p>
                  </div>
                )
              })}
            </div>
            {wildcard && (
              <div
                className="mt-3 ml-6 rounded-xl p-3 border-2 border-dashed flex items-center gap-3"
                style={{ borderColor: wildcard.color, backgroundColor: `${wildcard.color}12` }}
              >
                <span className="text-2xl">{wildcard.emoji}</span>
                <div className="flex-1">
                  <div className="text-sm font-bold text-white">
                    E · {wildcard.name} <span className="text-[10px] font-normal text-purple-300 ml-1">와일드카드 (DF3)</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-0.5">{wildcard.summary}</p>
                </div>
                <div className="text-2xl font-bold font-mono" style={{ color: wildcard.color }}>{wildcard.probability}%</div>
              </div>
            )}
          </div>
        </Card>

        <Card title="시나리오 확률 분포" source="평가 시점: 2026-05">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value" nameKey="name"
                cx="50%" cy="50%" outerRadius={100}
                label={({ value }) => `${value}%`}
                labelLine={{ stroke: '#4b5563' }}
              >
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10, color: '#9ca3af' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {SCENARIOS_DATA.matrix.map(s => (
          <div
            key={s.id}
            className="rounded-xl p-4 border bg-gray-900"
            style={{ borderColor: `${s.color}60` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{s.emoji}</span>
              <h4 className="text-sm font-bold text-white">{s.id} · {s.name}</h4>
              {s.mainBet && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 font-bold flex items-center gap-0.5">
                  <Star size={10} /> Main Bet
                </span>
              )}
              {s.wildcard && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 font-bold">와일드카드</span>
              )}
            </div>
            <div className="text-[11px] text-gray-500 mb-2">
              {s.df1} × {s.df2} · 확률 <span className="font-mono font-bold" style={{ color: s.color }}>{s.probability}%</span>
            </div>
            <div className="text-xs text-amber-300 bg-amber-950/30 border border-amber-700/30 rounded px-2 py-1.5 mb-2">
              💡 {s.keyAssumption}
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div>
                <div className="text-red-400 font-bold mb-0.5">⚠️ 위협</div>
                <ul className="text-gray-400 space-y-0.5">
                  {s.threats.map((t, i) => <li key={i} className="pl-2">· {t}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-emerald-400 font-bold mb-0.5">✨ 기회</div>
                <ul className="text-gray-400 space-y-0.5">
                  {s.opportunities.map((o, i) => <li key={i} className="pl-2">· {o}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card title="분기점 모니터링 일정" source="analysis/scenarios/scenario-matrix.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left font-medium pb-2 pr-3">분기 요인</th>
                <th className="text-left font-medium pb-2 pr-3">결정 시점</th>
                <th className="text-left font-medium pb-2">모니터링 지표</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS_DATA.branchingPoints.map((bp, i) => (
                <tr key={i} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-2 pr-3 text-gray-200">{bp.factor}</td>
                  <td className="py-2 pr-3 font-mono text-amber-300">{bp.decisionDate}</td>
                  <td className="py-2 text-gray-400">{bp.monitor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BENCHMARK
// ─────────────────────────────────────────────────────────────────────────────
function BenchmarkPanel() {
  return (
    <div className="space-y-4">
      <Card title="경기 사이클 대응 7대 패턴" source="analysis/benchmark/cyclical-strategy-benchmark.md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {BENCHMARK_DATA.cyclicalPatterns.map(p => (
            <div
              key={p.id}
              className="border rounded-lg p-3"
              style={{ borderColor: `${p.color}60`, backgroundColor: `${p.color}10` }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.id}
                </span>
                <h4 className="text-sm font-bold text-white">{p.name}</h4>
              </div>
              <p className="text-[11px] text-gray-300 leading-snug mb-2">{p.mechanism}</p>
              <div className="flex flex-wrap gap-1">
                {p.cases.map((c, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="산업별 사례 — 7개" source="analysis/benchmark/cyclical-strategy-benchmark.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left font-medium pb-2 pr-3">기업</th>
                <th className="text-left font-medium pb-2 pr-3">산업</th>
                <th className="text-left font-medium pb-2 pr-3">핵심 패턴</th>
                <th className="text-left font-medium pb-2">대표 지표</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARK_DATA.industries.map((c, i) => (
                <tr key={i} className="border-b border-gray-800/50 last:border-0">
                  <td className="py-2 pr-3 text-white font-semibold">{c.name}</td>
                  <td className="py-2 pr-3 text-gray-400">{c.industry}</td>
                  <td className="py-2 pr-3 text-gray-300">{c.pattern}</td>
                  <td className="py-2 text-gray-500 text-[11px]">{c.keyMetric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="농수산업 헤징 메커니즘 → 메모리 적용" source="analysis/benchmark/agri-hedging-to-memory-semi.md">
        <div className="space-y-2">
          {BENCHMARK_DATA.agriHedging.map(h => (
            <div key={h.id} className="border border-gray-800 rounded-lg p-3 bg-gray-800/30">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {h.id}
                </span>
                <h4 className="text-sm font-semibold text-white">{h.name}</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] ml-7">
                <div>
                  <span className="text-gray-500">원리: </span>
                  <span className="text-gray-300">{h.원리}</span>
                </div>
                <div>
                  <span className="text-blue-400">메모리 적용: </span>
                  <span className="text-blue-200">{h.memoryApplication}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="호황 참여 헤지 구조 5종" source="analysis/benchmark/upside-participation-hedging.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-gray-800">
                <th className="text-left font-medium pb-2 pr-2">구조</th>
                <th className="text-center font-medium pb-2 pr-2">복잡도</th>
                <th className="text-center font-medium pb-2 pr-2">Floor</th>
                <th className="text-center font-medium pb-2 pr-2">상방참여</th>
                <th className="text-center font-medium pb-2 pr-2">프리미엄</th>
                <th className="text-left font-medium pb-2">코멘트</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARK_DATA.upsideStructures.map(s => {
                const isRecommended = s.note.includes('추천')
                const isForbidden = s.note.includes('금지')
                const rowCls = isRecommended ? 'bg-emerald-950/20' : isForbidden ? 'bg-red-950/20' : ''
                return (
                  <tr key={s.id} className={`border-b border-gray-800/50 last:border-0 ${rowCls}`}>
                    <td className="py-2 pr-2 text-white font-semibold">{s.name}</td>
                    <td className="py-2 pr-2 text-center text-gray-400">{s.complexity}</td>
                    <td className="py-2 pr-2 text-center text-gray-300 font-mono">{s.floor}</td>
                    <td className="py-2 pr-2 text-center text-gray-300 font-mono">{s.upside}</td>
                    <td className="py-2 pr-2 text-center text-gray-400 font-mono">{s.premium}</td>
                    <td className="py-2 text-gray-300">{s.note}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-gray-600 mt-2 flex items-start gap-1.5">
          <AlertOctagon size={11} className="text-red-400 mt-0.5 shrink-0" />
          Three-way Collar 는 sub-put 매도로 가격 폭락 시 손실 가속 — Pioneer/Whiting 사례. 이사회 정책상 금지 권고.
        </p>
      </Card>

      <Card title="🎯 메모리 사업부 적용 권고">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="border border-emerald-700/40 bg-emerald-950/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5"><Target size={14} className="text-emerald-400" /><span className="font-bold text-emerald-300">단기 (6~12개월)</span></div>
            <p className="text-gray-300 leading-snug">Forward + Tiered Pricing 도입. 핵심 고객 대상 다년 공급계약으로 가격 가시성 확보.</p>
          </div>
          <div className="border border-blue-700/40 bg-blue-950/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5"><Target size={14} className="text-blue-400" /><span className="font-bold text-blue-300">중기 (1~2년)</span></div>
            <p className="text-gray-300 leading-snug">Participating Forward 도입 (HBM 매출 30~40%). HTA 슬롯 예약 + 가격 분리.</p>
          </div>
          <div className="border border-purple-700/40 bg-purple-950/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5"><Target size={14} className="text-purple-400" /><span className="font-bold text-purple-300">장기 (2년+)</span></div>
            <p className="text-gray-300 leading-snug">Memory Trading Desk + DRAMeXchange OTC 스왑 직접 운영. Black River 모델.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function ScenarioPlanning() {
  const [tab, setTab] = useState('steep')

  return (
    <div>
      <div className="flex items-center gap-1 mb-4 border-b border-gray-800">
        {SUB_TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-blue-500 text-white bg-gray-900/60'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-900/30'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'steep'     && <STEEPPanel />}
      {tab === 'drivers'   && <DrivingForcesPanel />}
      {tab === 'scenarios' && <ScenariosPanel />}
      {tab === 'benchmark' && <BenchmarkPanel />}
    </div>
  )
}
