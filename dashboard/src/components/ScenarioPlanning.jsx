import { useState, useMemo } from 'react'
import {
  ScatterChart, Scatter, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ZAxis,
} from 'recharts'
import { Layers, Compass, Map as MapIcon, BookOpen, Star, AlertOctagon, Target, ChevronDown, ChevronUp, Info, Sparkles, MapPin } from 'lucide-react'
import {
  STEEP_DATA, DRIVING_FORCES_DATA, SCENARIOS_DATA, BENCHMARK_DATA,
} from '../data/scenarioPlanning'
import SourceLink from './SourceLink'

const SUB_TABS = [
  { id: 'steep',     label: 'STEEP',           icon: Layers },
  { id: 'drivers',   label: 'Driving Forces',  icon: Compass },
  { id: 'scenarios', label: 'Scenarios',       icon: MapIcon },
  { id: 'benchmark', label: 'Benchmark',       icon: BookOpen },
]

// ── 공통 ────────────────────────────────────────────────────────────────────
function Card({ title, source, children, className = '' }) {
  return (
    <div className={`bg-white border border-stone-200 rounded-xl p-4 ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
          <SourceLink source={source} />
        </div>
      )}
      {children}
    </div>
  )
}

const AXIS = { tick: { fill: '#78716c', fontSize: 11 }, axisLine: { stroke: '#e7e5e4' }, tickLine: { stroke: '#e7e5e4' } }
const GRID = { stroke: '#e7e5e4', strokeDasharray: '3 3' }

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
              contentStyle={{ background: '#ffffff', border: '1px solid #374151', borderRadius: 8, fontSize: 11 }}
              labelStyle={{ color: '#1c1917' }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#78716c' }} />
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
            <div key={cat.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenCat(isOpen ? null : cat.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-stone-100 transition-colors text-left"
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0 text-sm"

                  style={{ backgroundColor: cat.color }}
                >
                  {cat.id}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-stone-800">{cat.label} ({cat.name})</span>
                    <span className="text-xs text-stone-500">— {cat.factors.length}개 요인</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">{cat.summary}</p>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-stone-500" /> : <ChevronDown size={16} className="text-stone-500" />}
              </button>
              {isOpen && (
                <div className="border-t border-stone-200 px-4 py-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {cat.factors.map(f => {
                    const iu = f.impact * f.uncertainty
                    const tier = iu >= 16 ? 'critical' : iu >= 9 ? 'medium' : 'low'
                    const tierCls = {
                      critical: 'border-red-300 bg-red-50/70',
                      medium:   'border-amber-200 bg-amber-50',
                      low:      'border-stone-300 bg-stone-50',
                    }[tier]
                    return (
                      <div key={f.id} className={`flex items-center gap-2 py-1.5 px-2.5 rounded-lg border ${tierCls}`}>
                        <span className="text-[10px] font-mono text-stone-500 shrink-0 w-7">{f.id}</span>
                        <span className="text-xs text-stone-700 flex-1 truncate">{f.name}</span>
                        <span className="text-[10px] font-mono text-stone-500 shrink-0">I {f.impact}/U {f.uncertainty}</span>
                        <span className={`text-[10px] font-mono font-bold shrink-0 ${
                          tier === 'critical' ? 'text-red-600' : tier === 'medium' ? 'text-amber-600' : 'text-stone-500'
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
        <p className="text-xs text-stone-500 mb-2">
          우상단 (Impact ≥ 4 + Uncertainty ≥ 4) = 핵심 불확실성 = Driving Force 후보. 점 크기는 같은 좌표에 있는 요인 수.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis
              type="number" dataKey="impact"
              domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]}
              {...AXIS}
              label={{ value: 'Impact (1~5)', position: 'insideBottom', offset: -5, fill: '#78716c', fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="uncertainty"
              domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]}
              {...AXIS}
              label={{ value: 'Uncertainty (1~5)', angle: -90, position: 'insideLeft', fill: '#78716c', fontSize: 11 }}
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
                  <div className="bg-stone-100 border border-stone-300 rounded-lg p-2.5 text-xs shadow-xl max-w-xs">
                    <div className="text-stone-500 mb-1">I={p.impact} / U={p.uncertainty} (I×U={p.iu})</div>
                    <div className="text-stone-800">{p.names}</div>
                  </div>
                )
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#78716c' }} />
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
              <div key={item.id} className="flex items-center gap-3 py-1.5 px-2.5 rounded bg-stone-50 border border-stone-200">
                <span className="text-sm font-bold text-stone-500 w-6 shrink-0">#{item.rank}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded font-mono shrink-0"
                  style={{ backgroundColor: `${cat.color}30`, color: cat.color }}
                >
                  {item.id}
                </span>
                <span className="text-xs text-stone-800 flex-1">{item.name}</span>
                <span className="text-xs font-mono font-bold text-amber-600 shrink-0">I×U = {item.iu}</span>
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
                isMain ? 'border-sky-300 bg-sky-50' : 'border-purple-300 bg-purple-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${isMain ? 'bg-sky-100 text-sky-700' : 'bg-purple-100 text-purple-700'}`}>
                  {d.id}
                </span>
                <span className="text-xs text-stone-500">{d.role}</span>
              </div>
              <h4 className="text-sm font-semibold text-stone-900 mb-3">{d.title}</h4>

              <div className="space-y-2 mb-3">
                <div className="border-l-2 border-emerald-500 pl-2.5">
                  <div className="text-[10px] uppercase tracking-wide text-emerald-600 font-bold">Pole A · {d.poleA.label}</div>
                  <div className="text-xs text-stone-700 mt-0.5">{d.poleA.narrative}</div>
                </div>
                <div className="border-l-2 border-red-500 pl-2.5">
                  <div className="text-[10px] uppercase tracking-wide text-red-600 font-bold">Pole B · {d.poleB.label}</div>
                  <div className="text-xs text-stone-700 mt-0.5">{d.poleB.narrative}</div>
                </div>
              </div>

              <div className="text-[11px] text-amber-700 bg-amber-500/10 border border-amber-200 rounded px-2 py-1.5 flex items-start gap-1.5">
                <MapPin size={11} className="mt-0.5 shrink-0" />
                <span><span className="font-semibold">현재: </span>{d.currentPosition}</span>
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
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] text-stone-500 whitespace-nowrap">
              DF2: 디커플링 ↑ / 공존 ↓
            </div>
            {/* X-axis label */}
            <div className="text-center text-[10px] text-stone-500 mb-1">
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
                      <div className="flex items-center gap-2">
                        <span
                          className="w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold text-white"

                          style={{ backgroundColor: s.color }}
                        >
                          {s.id}
                        </span>
                        <span className="text-sm font-semibold text-stone-900 tracking-tight">{s.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.probability}%</div>
                        {s.mainBet && <div className="text-[9px] font-bold text-amber-600 flex items-center gap-0.5 justify-end mt-0.5"><Star size={9} /> Main Bet</div>}
                      </div>
                    </div>
                    <p className="text-[11px] text-stone-700 leading-snug mt-1">{s.summary}</p>
                  </div>
                )
              })}
            </div>
            {wildcard && (
              <div
                className="mt-3 ml-6 rounded-xl p-3 border border-dashed flex items-center gap-3"
                style={{ borderColor: `${wildcard.color}80`, backgroundColor: `${wildcard.color}10` }}
              >
                <span
                  className="w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold text-white shrink-0"

                  style={{ backgroundColor: wildcard.color }}
                >
                  E
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-stone-900 tracking-tight">
                    {wildcard.name}
                    <span className="text-[10px] font-normal text-purple-700 ml-2">와일드카드 (DF3)</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">{wildcard.summary}</p>
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
                labelLine={{ stroke: '#a8a29e' }}
              >
                {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #374151', borderRadius: 8, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10, color: '#78716c' }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {SCENARIOS_DATA.matrix.map(s => (
          <div
            key={s.id}
            className="rounded-xl p-4 border bg-white"
            style={{ borderColor: `${s.color}60` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-sm font-bold text-white shrink-0"

                style={{ backgroundColor: s.color }}
              >
                {s.id}
              </span>
              <h4 className="text-sm font-semibold text-stone-900 tracking-tight">{s.name}</h4>
              {s.mainBet && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 ring-1 ring-amber-500/30 font-semibold flex items-center gap-0.5">
                  <Star size={10} /> Main Bet
                </span>
              )}
              {s.wildcard && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-700 ring-1 ring-purple-500/30 font-semibold">와일드카드</span>
              )}
            </div>
            <div className="text-[11px] text-stone-500 mb-2">
              {s.df1} × {s.df2} · 확률 <span className="font-mono font-semibold" style={{ color: s.color }}>{s.probability}%</span>
            </div>
            <div className="text-xs text-amber-700 bg-amber-500/10 border border-amber-200 rounded px-2 py-1.5 mb-2 flex items-start gap-1.5">
              <Info size={11} className="mt-0.5 shrink-0" />
              <span>{s.keyAssumption}</span>
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div>
                <div className="text-red-600 font-semibold mb-0.5 flex items-center gap-1.5"><AlertOctagon size={11} />위협</div>
                <ul className="text-stone-500 space-y-0.5">
                  {s.threats.map((t, i) => <li key={i} className="pl-2">· {t}</li>)}
                </ul>
              </div>
              <div>
                <div className="text-emerald-600 font-semibold mb-0.5 flex items-center gap-1.5"><Sparkles size={11} />기회</div>
                <ul className="text-stone-500 space-y-0.5">
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
              <tr className="text-stone-500 border-b border-stone-200">
                <th className="text-left font-medium pb-2 pr-3">분기 요인</th>
                <th className="text-left font-medium pb-2 pr-3">결정 시점</th>
                <th className="text-left font-medium pb-2">모니터링 지표</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS_DATA.branchingPoints.map((bp, i) => (
                <tr key={i} className="border-b border-stone-200/50 last:border-0">
                  <td className="py-2 pr-3 text-stone-800">{bp.factor}</td>
                  <td className="py-2 pr-3 font-mono text-amber-700">{bp.decisionDate}</td>
                  <td className="py-2 text-stone-500">{bp.monitor}</td>
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
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-stone-900"
                  style={{ backgroundColor: p.color }}
                >
                  {p.id}
                </span>
                <h4 className="text-sm font-bold text-stone-900">{p.name}</h4>
              </div>
              <p className="text-[11px] text-stone-700 leading-snug mb-2">{p.mechanism}</p>
              <div className="flex flex-wrap gap-1">
                {p.cases.map((c, i) => (
                  <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-300">{c}</span>
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
              <tr className="text-stone-500 border-b border-stone-200">
                <th className="text-left font-medium pb-2 pr-3">기업</th>
                <th className="text-left font-medium pb-2 pr-3">산업</th>
                <th className="text-left font-medium pb-2 pr-3">핵심 패턴</th>
                <th className="text-left font-medium pb-2">대표 지표</th>
              </tr>
            </thead>
            <tbody>
              {BENCHMARK_DATA.industries.map((c, i) => (
                <tr key={i} className="border-b border-stone-200/50 last:border-0">
                  <td className="py-2 pr-3 text-stone-900 font-semibold">{c.name}</td>
                  <td className="py-2 pr-3 text-stone-500">{c.industry}</td>
                  <td className="py-2 pr-3 text-stone-700">{c.pattern}</td>
                  <td className="py-2 text-stone-500 text-[11px]">{c.keyMetric}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="농수산업 헤징 메커니즘 → 메모리 적용" source="analysis/benchmark/agri-hedging-to-memory-semi.md">
        <div className="space-y-2">
          {BENCHMARK_DATA.agriHedging.map(h => (
            <div key={h.id} className="border border-stone-200 rounded-lg p-3 bg-stone-50">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {h.id}
                </span>
                <h4 className="text-sm font-semibold text-stone-900">{h.name}</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] ml-7">
                <div>
                  <span className="text-stone-500">원리: </span>
                  <span className="text-stone-700">{h.원리}</span>
                </div>
                <div>
                  <span className="text-sky-600">메모리 적용: </span>
                  <span className="text-sky-800">{h.memoryApplication}</span>
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
              <tr className="text-stone-500 border-b border-stone-200">
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
                const rowCls = isRecommended ? 'bg-emerald-50/70' : isForbidden ? 'bg-red-50/70' : ''
                return (
                  <tr key={s.id} className={`border-b border-stone-200/50 last:border-0 ${rowCls}`}>
                    <td className="py-2 pr-2 text-stone-900 font-semibold">{s.name}</td>
                    <td className="py-2 pr-2 text-center text-stone-500">{s.complexity}</td>
                    <td className="py-2 pr-2 text-center text-stone-700 font-mono">{s.floor}</td>
                    <td className="py-2 pr-2 text-center text-stone-700 font-mono">{s.upside}</td>
                    <td className="py-2 pr-2 text-center text-stone-500 font-mono">{s.premium}</td>
                    <td className="py-2 text-stone-700">{s.note}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-stone-400 mt-2 flex items-start gap-1.5">
          <AlertOctagon size={11} className="text-red-600 mt-0.5 shrink-0" />
          Three-way Collar 는 sub-put 매도로 가격 폭락 시 손실 가속 — Pioneer/Whiting 사례. 이사회 정책상 금지 권고.
        </p>
      </Card>

      <Card title="메모리 사업부 적용 권고">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5"><Target size={14} className="text-emerald-600" /><span className="font-bold text-emerald-700">단기 (6~12개월)</span></div>
            <p className="text-stone-700 leading-snug">Forward + Tiered Pricing 도입. 핵심 고객 대상 다년 공급계약으로 가격 가시성 확보.</p>
          </div>
          <div className="border border-sky-200 bg-sky-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5"><Target size={14} className="text-sky-600" /><span className="font-bold text-sky-700">중기 (1~2년)</span></div>
            <p className="text-stone-700 leading-snug">Participating Forward 도입 (HBM 매출 30~40%). HTA 슬롯 예약 + 가격 분리.</p>
          </div>
          <div className="border border-purple-200 bg-purple-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1.5"><Target size={14} className="text-purple-600" /><span className="font-bold text-purple-700">장기 (2년+)</span></div>
            <p className="text-stone-700 leading-snug">Memory Trading Desk + DRAMeXchange OTC 스왑 직접 운영. Black River 모델.</p>
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
      <div className="flex items-center gap-1 mb-4 border-b border-stone-200">
        {SUB_TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-sky-500 text-stone-900 bg-white/80'
                  : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50/60'
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
