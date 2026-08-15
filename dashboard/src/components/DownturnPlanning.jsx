import { useState, useMemo } from 'react'
import {
  ScatterChart, Scatter, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ZAxis,
} from 'recharts'
import {
  Target, Layers, Compass, Map as MapIcon, Shield, Search,
  AlertOctagon, Info, MapPin, ChevronDown, ChevronUp, ArrowRight,
  Clock, Ban, Check, X, TrendingDown, Zap, Star, Sparkles,
} from 'lucide-react'
import {
  DT_FOCAL, DT_STEEP_DATA, DT_DRIVERS, DT_SCENARIOS,
  DT_PREPARATION, DT_RESPONSE, DT_INDICATORS,
} from '../data/downturnPlanning'
import SourceLink from './SourceLink'

// ── 공통 ────────────────────────────────────────────────────────────────────
function Card({ title, source, children, className = '', accent }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-zinc-800" style={accent ? { color: accent } : undefined}>{title}</h3>
          <SourceLink source={source} />
        </div>
      )}
      {children}
    </div>
  )
}

const AXIS = { tick: { fill: '#71717a', fontSize: 11 }, axisLine: { stroke: '#e4e4e7' }, tickLine: { stroke: '#e4e4e7' } }
const GRID = { stroke: '#e4e4e7', strokeDasharray: '3 3' }

// 시나리오 가치 배지 (◎ / ◎◎ / △ / ✕ / —)
function ValueBadge({ v }) {
  const map = {
    '◎◎': 'bg-emerald-600 text-white ring-emerald-700',
    '◎':  'bg-emerald-100 text-emerald-700 ring-emerald-300',
    '△':  'bg-amber-100 text-amber-700 ring-amber-300',
    '✕':  'bg-red-100 text-red-700 ring-red-300',
    '—':  'bg-zinc-100 text-zinc-400 ring-zinc-200',
  }
  return (
    <span className={`inline-flex items-center justify-center min-w-[26px] px-1.5 py-0.5 rounded text-[11px] font-bold ring-1 ${map[v] ?? map['—']}`}>
      {v}
    </span>
  )
}

const SCENARIO_IDS = ['DT-A', 'DT-B', 'DT-C', 'DT-D', 'DT-E']
const SCENARIO_SHORT = { 'DT-A': '급제동', 'DT-B': '긴 하산', 'DT-C': '동시 방류', 'DT-D': '저가 잠식', 'DT-E': '판 갈이' }

// ─────────────────────────────────────────────────────────────────────────────
// 1. FOCAL ISSUE
// ─────────────────────────────────────────────────────────────────────────────
function FocalPanel() {
  const toneCls = {
    red:    'border-red-200 bg-red-50 text-red-700',
    amber:  'border-amber-200 bg-amber-50 text-amber-700',
    green:  'border-emerald-200 bg-emerald-50 text-emerald-700',
    blue:   'border-sky-200 bg-sky-50 text-sky-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
  }
  return (
    <div className="space-y-4">
      <Card source="wiki/downturn/README.md">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 w-9 h-9 rounded-hig-md bg-hig-blue/10 text-hig-blue flex items-center justify-center shrink-0">
            <Target size={18} />
          </span>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wide text-zinc-400 font-bold mb-1">Focal Issue · SP-2</div>
            <p className="text-[15px] font-semibold text-zinc-900 leading-relaxed tracking-tight">{DT_FOCAL.question}</p>
            <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{DT_FOCAL.oneLiner}</p>
            <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-zinc-500">
              <Clock size={11} /> 시계 {DT_FOCAL.horizon}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {DT_FOCAL.premises.map(p => (
          <div key={p.id} className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-3.5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{p.id}</span>
              <h4 className="text-sm font-semibold text-zinc-900 tracking-tight">{p.title}</h4>
            </div>
            <p className="text-[11px] text-zinc-600 leading-relaxed">{p.body}</p>
            <SourceLink source={p.source} className="text-[10px] text-zinc-400 mt-1.5" />
          </div>
        ))}
      </div>

      <Card title="왜 SP-1과 분리하는가" source="wiki/downturn/README.md">
        <p className="text-xs text-zinc-700 leading-relaxed mb-3">{DT_FOCAL.separationRationale}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-3 w-28"> </th>
                <th className="text-left font-medium pb-2 pr-3">SP-1 (기존)</th>
                <th className="text-left font-medium pb-2">SP-2 (다운턴)</th>
              </tr>
            </thead>
            <tbody>
              {DT_FOCAL.contrast.map((c, i) => (
                <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                  <td className="py-2 pr-3 text-zinc-500 font-medium">{c.axis}</td>
                  <td className="py-2 pr-3 text-zinc-600">{c.sp1}</td>
                  <td className="py-2 text-zinc-900 font-medium">{c.sp2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="결론 요약" source="wiki/downturn/README.md">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
          {DT_FOCAL.conclusions.map((c, i) => (
            <div key={i} className={`border rounded-hig-md shadow-hig-1 p-3 ${toneCls[c.tone]}`}>
              <div className="text-[10px] uppercase tracking-wide font-bold opacity-70">{c.label}</div>
              <div className="text-sm font-bold mt-0.5 tracking-tight">{c.value}</div>
              <p className="text-[11px] text-zinc-600 mt-1 leading-snug">{c.note}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. STEEP + Impact × Uncertainty
// ─────────────────────────────────────────────────────────────────────────────
function SteepPanel() {
  const [openCat, setOpenCat] = useState('Ec')

  const scatterByCategory = useMemo(() => {
    const byCat = {}
    for (const cat of DT_STEEP_DATA.categories) {
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
          return { impact: i, uncertainty: u, size: arr.length, names: arr.map(x => `${x.id} ${x.name}`).join(' · '), iu: i * u }
        }),
      }
    }
    return byCat
  }, [])

  return (
    <div className="space-y-4">
      <Card title="채점 기준 — SP-1과 무엇이 다른가" source="wiki/downturn/steep-factors.md">
        <p className="text-xs text-zinc-700 leading-relaxed">{DT_STEEP_DATA.scoringNote}</p>
      </Card>

      <Card title="Impact × Uncertainty 매트릭스 (다운턴 렌즈 40개 요인)" source="wiki/downturn/steep-factors.md">
        <p className="text-xs text-zinc-500 mb-2">
          우상단(I ≥ 4 · U ≥ 4) = 핵심 불확실성 = Driving Force 후보. <span className="text-amber-700 font-medium">우하단(I ≥ 4 · U ≤ 3) = 확정 리스크</span> — 축은 될 수 없지만 다섯 시나리오 전부의 배경에 깔린다. 점 크기는 같은 좌표의 요인 수.
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis
              type="number" dataKey="impact" domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]} {...AXIS}
              label={{ value: 'Impact — 다운턴의 형태를 바꾸는 힘 (1~5)', position: 'insideBottom', offset: -5, fill: '#71717a', fontSize: 11 }}
            />
            <YAxis
              type="number" dataKey="uncertainty" domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]} {...AXIS}
              label={{ value: 'Uncertainty (1~5)', angle: -90, position: 'insideLeft', fill: '#71717a', fontSize: 11 }}
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
                  <div className="bg-white border border-zinc-300 rounded-lg p-2.5 text-xs shadow-xl max-w-xs">
                    <div className="text-zinc-500 mb-1">I={p.impact} / U={p.uncertainty} (I×U={p.iu})</div>
                    <div className="text-zinc-800">{p.names}</div>
                  </div>
                )
              }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            {Object.entries(scatterByCategory).map(([catId, info]) => (
              <Scatter key={catId} name={info.label} data={info.points} fill={info.color} fillOpacity={0.75} stroke={info.color} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
          {DT_STEEP_DATA.distribution.map(d => (
            <div key={d.id} className="rounded-hig-md border p-2.5" style={{ borderColor: `${d.color}50`, backgroundColor: `${d.color}0d` }}>
              <div className="text-lg font-bold font-mono" style={{ color: d.color }}>{d.count}</div>
              <div className="text-[11px] font-medium text-zinc-700">{d.label}</div>
              {d.note && <div className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{d.note}</div>}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-amber-800 bg-amber-500/10 border border-amber-200 rounded px-2.5 py-2 mt-2.5 flex items-start gap-1.5">
          <Info size={12} className="mt-0.5 shrink-0" />
          <span>{DT_STEEP_DATA.fixedRiskNote}</span>
        </p>
      </Card>

      <Card title="Top 12 핵심 불확실성" source="wiki/downturn/steep-factors.md">
        <p className="text-[11px] text-zinc-500 mb-2">{DT_STEEP_DATA.top12Note}</p>
        <div className="space-y-1.5">
          {DT_STEEP_DATA.top12.map(item => {
            const cat = DT_STEEP_DATA.categories.find(c => c.id === item.category)
            return (
              <div key={item.id} className="flex items-start gap-3 py-1.5 px-2.5 rounded bg-zinc-50 border border-zinc-200">
                <span className="text-sm font-bold text-zinc-500 w-6 shrink-0">#{item.rank}</span>
                <span className="text-[10px] px-2 py-0.5 rounded font-mono shrink-0 mt-0.5" style={{ backgroundColor: `${cat.color}25`, color: cat.color }}>
                  {item.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-zinc-900 font-medium">{item.name}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5">{item.power}</div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-600 shrink-0">{item.iu}</span>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="space-y-2">
        {DT_STEEP_DATA.categories.map(cat => {
          const isOpen = openCat === cat.id
          return (
            <div key={cat.id} className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 overflow-hidden">
              <button
                onClick={() => setOpenCat(isOpen ? null : cat.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 transition-colors text-left"
              >
                <span className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold shrink-0 text-xs" style={{ backgroundColor: cat.color }}>
                  {cat.id}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-zinc-800">{cat.label} ({cat.name})</span>
                    <span className="text-xs text-zinc-500">— {cat.factors.length}개 요인</span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">{cat.summary}</p>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-zinc-500" /> : <ChevronDown size={16} className="text-zinc-500" />}
              </button>
              {isOpen && (
                <div className="border-t border-zinc-200 px-4 py-3 space-y-1.5">
                  {cat.factors.map(f => {
                    const iu = f.impact * f.uncertainty
                    const tier = iu >= 20 ? 'critical' : iu >= 12 ? 'medium' : 'low'
                    const tierCls = {
                      critical: 'border-red-300 bg-red-50/70',
                      medium:   'border-amber-200 bg-amber-50',
                      low:      'border-zinc-200 bg-zinc-50',
                    }[tier]
                    return (
                      <div key={f.id} className={`flex items-start gap-2 py-1.5 px-2.5 rounded-lg border ${tierCls}`}>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0 w-8 mt-0.5">{f.id}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-zinc-800">{f.name}</div>
                          <div className="text-[10px] text-zinc-500 mt-0.5">↳ {f.link}</div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 shrink-0 mt-0.5">I{f.impact}/U{f.uncertainty}</span>
                        <span className={`text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                          tier === 'critical' ? 'text-red-600' : tier === 'medium' ? 'text-amber-600' : 'text-zinc-500'
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
// 3. DRIVING FORCES
// ─────────────────────────────────────────────────────────────────────────────
function DriversPanel() {
  return (
    <div className="space-y-4">
      <Card title="두 축이 각각 무엇을 결정하는가" source="wiki/downturn/key-drivers.md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="border border-sky-200 bg-sky-50 rounded-hig-md p-3.5">
            <div className="flex items-center gap-2 mb-1"><Compass size={15} className="text-sky-600" /><span className="text-sm font-bold text-sky-800">DF-D1 발원지 → 무엇을 조절할지</span></div>
            <p className="text-[11px] text-zinc-700 leading-relaxed">공급발 → 감산·투자 이연이 직접 작동 / 수요발 → 감산 무효, 캐파 전환·계약 방어·저가 매수로</p>
          </div>
          <div className="border border-purple-200 bg-purple-50 rounded-hig-md p-3.5">
            <div className="flex items-center gap-2 mb-1"><Clock size={15} className="text-purple-600" /><span className="text-sm font-bold text-purple-800">DF-D2 전개 속도 → 언제 결정할지</span></div>
            <p className="text-[11px] text-zinc-700 leading-relaxed">급락형 → 도착 전 배선이 전부(대비) / 침식형 → 판단 기준을 가격이 아닌 원가 곡선 백분위로 전환(인지)</p>
          </div>
        </div>
        <p className="text-xs font-semibold text-zinc-900 mt-3 text-center py-2 bg-zinc-100 rounded-hig-md">
          급락형은 <span className="text-red-600">준비</span>의 문제, 침식형은 <span className="text-amber-600">인지</span>의 문제다.
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {DT_DRIVERS.drivers.map(d => (
          <div
            key={d.id}
            className={`border rounded-hig-lg shadow-hig-1 p-4 ${d.wildcard ? 'border-purple-300 bg-purple-50' : 'border-sky-300 bg-sky-50'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`hig-pill text-xs font-bold ${d.wildcard ? 'hig-pill-purple' : 'hig-pill-blue'}`}>{d.id}</span>
              <span className="text-[11px] text-zinc-500">{d.role}</span>
            </div>
            <h4 className="text-sm font-semibold text-zinc-900 mb-1 tracking-tight">{d.title}</h4>
            <div className="text-[11px] text-zinc-600 mb-3">
              <span className="font-semibold text-zinc-800">결정하는 것: </span>{d.decides} — {d.decidesDetail}
            </div>

            <div className="space-y-2 mb-3">
              <div className="border-l-2 border-emerald-500 pl-2.5">
                <div className="text-[10px] uppercase tracking-wide text-emerald-600 font-bold">Pole A · {d.poleA.label}</div>
                <div className="text-[11px] text-zinc-700 mt-0.5 leading-relaxed">{d.poleA.narrative}</div>
              </div>
              <div className="border-l-2 border-red-500 pl-2.5">
                <div className="text-[10px] uppercase tracking-wide text-red-600 font-bold">Pole B · {d.poleB.label}</div>
                <div className="text-[11px] text-zinc-700 mt-0.5 leading-relaxed">{d.poleB.narrative}</div>
              </div>
            </div>

            {/* 현재 위치 게이지 */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-[9px] text-zinc-400 mb-1">
                <span>{d.positionScale.split('↔')[0].trim()}</span>
                <span>{d.positionScale.split('↔')[1]?.trim()}</span>
              </div>
              <div className="relative h-1.5 rounded-full bg-gradient-to-r from-emerald-300 via-zinc-200 to-red-300">
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white ring-2 ring-zinc-800 shadow"
                  style={{ left: `${((d.position + 10) / 20) * 100}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] text-amber-800 bg-amber-500/10 border border-amber-200 rounded px-2 py-1.5 flex items-start gap-1.5">
              <MapPin size={11} className="mt-0.5 shrink-0" />
              <span><span className="font-semibold">현재: </span>{d.positionLabel}</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-1.5 leading-relaxed">{d.positionNote}</p>
            <p className="text-[10px] text-zinc-600 mt-2 pt-2 border-t border-zinc-200/70 leading-relaxed">
              <span className="font-semibold">왜 핵심인가 · </span>{d.whyCore}
            </p>
          </div>
        ))}
      </div>

      <Card title="독립성 검증 — 네 사분면 모두 역사적 실례가 있는가" source="wiki/downturn/key-drivers.md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {DT_DRIVERS.independence.map((q, i) => (
            <div key={i} className="border border-zinc-200 rounded-hig-md bg-zinc-50 p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Check size={13} className="text-emerald-600 shrink-0" />
                <span className="text-xs font-bold text-zinc-900">{q.quadrant}</span>
              </div>
              <p className="text-[11px] text-zinc-700 leading-relaxed">{q.example}</p>
              <SourceLink source={q.source} className="text-[10px] text-zinc-400 mt-1" />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-emerald-800 bg-emerald-500/10 border border-emerald-200 rounded px-2.5 py-2 mt-3 leading-relaxed">
          {DT_DRIVERS.independenceVerdict}
        </p>
      </Card>

      <Card title="기각된 축 후보 — 그리고 그 이유" source="wiki/downturn/key-drivers.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-3">축 후보</th>
                <th className="text-left font-medium pb-2 pr-3">기각 이유</th>
                <th className="text-left font-medium pb-2">재배치</th>
              </tr>
            </thead>
            <tbody>
              {DT_DRIVERS.rejected.map((r, i) => (
                <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                  <td className="py-2 pr-3 text-zinc-900 font-medium align-top">{r.candidate}</td>
                  <td className="py-2 pr-3 text-zinc-600 align-top">{r.reason}</td>
                  <td className="py-2 text-sky-700 align-top whitespace-nowrap">{r.relocated}</td>
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
// 4. SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────
const EXPOSURE_CLS = {
  high:   { label: '직격',   cls: 'bg-red-100 text-red-700 ring-red-300' },
  medium: { label: '중간',   cls: 'bg-amber-100 text-amber-700 ring-amber-300' },
  low:    { label: '낮음',   cls: 'bg-zinc-100 text-zinc-600 ring-zinc-300' },
  safe:   { label: '방어',   cls: 'bg-emerald-100 text-emerald-700 ring-emerald-300' },
}

function ScenarioCard({ s, open, onToggle }) {
  return (
    <div className="rounded-hig-lg shadow-hig-1 border bg-white overflow-hidden" style={{ borderColor: `${s.color}60` }}>
      <button onClick={onToggle} className="w-full text-left p-4 hover:bg-zinc-50/70 transition-colors">
        <div className="flex items-start gap-2.5">
          <span className="w-9 h-9 rounded-md flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ backgroundColor: s.color }}>
            {s.id.replace('DT-', '')}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-zinc-900 tracking-tight">「{s.name}」</h4>
              <span className="text-[10px] text-zinc-400 font-mono">{s.en}</span>
              {s.wildcard && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-700 ring-1 ring-purple-500/30 font-semibold">와일드카드</span>}
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">
              {s.cause} × {s.speed} · {s.duration}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.probability}%</div>
            <div className="text-[9px] text-zinc-400">조건부</div>
          </div>
          {open ? <ChevronUp size={16} className="text-zinc-400 mt-1 shrink-0" /> : <ChevronDown size={16} className="text-zinc-400 mt-1 shrink-0" />}
        </div>
        <p className="text-[11px] text-zinc-700 leading-relaxed mt-2 italic">{s.tagline}</p>
      </button>

      {open && (
        <div className="border-t border-zinc-200 p-4 space-y-3 bg-zinc-50/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]">
            <div className="bg-white border border-zinc-200 rounded-hig-md p-2.5">
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-wide mb-1">1차 방아쇠</div>
              <p className="text-zinc-700 leading-relaxed">{s.trigger}</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-hig-md p-2.5">
              <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wide mb-1">메커니즘</div>
              <p className="text-zinc-700 leading-relaxed">{s.mechanism}</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-hig-md p-2.5">
              <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wide mb-1">삼성에 대한 함의</div>
              <p className="text-zinc-700 leading-relaxed">{s.implication}</p>
            </div>
          </div>

          {s.keyInsight && (
            <p className="text-[11px] text-purple-900 bg-purple-500/10 border border-purple-200 rounded px-2.5 py-2 flex items-start gap-1.5 leading-relaxed">
              <Zap size={12} className="mt-0.5 shrink-0 text-purple-600" />
              <span>{s.keyInsight}</span>
            </p>
          )}
          {s.layerNote && (
            <p className="text-[11px] text-zinc-800 bg-zinc-200/60 border border-zinc-300 rounded px-2.5 py-2 leading-relaxed">
              {s.layerNote}
            </p>
          )}

          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">제품 축 노출</div>
            <div className="space-y-1">
              {s.productExposure.map((p, i) => {
                const e = EXPOSURE_CLS[p.level]
                return (
                  <div key={i} className="flex items-start gap-2 text-[11px]">
                    <span className={`px-1.5 py-0.5 rounded ring-1 font-semibold shrink-0 w-11 text-center ${e.cls}`}>{e.label}</span>
                    <span className="font-medium text-zinc-800 shrink-0 w-28">{p.product}</span>
                    <span className="text-zinc-600 flex-1">{p.note}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px]">
            <div>
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mb-1.5">대응 우선순위</div>
              <ul className="space-y-1">
                {s.topResponses.map((r, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-zinc-700">
                    <span className="text-emerald-600 font-bold shrink-0">{i + 1}.</span>{r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[10px] font-bold text-red-600 uppercase tracking-wide mb-1.5 flex items-center gap-1"><Ban size={11} />발동하지 않는 것</div>
              <p className="text-zinc-700 leading-relaxed">{s.forbidden}</p>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">이 시나리오에서 가장 흔한 실수</div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="text-zinc-400 border-b border-zinc-200">
                    <th className="text-left font-medium pb-1 pr-2">실수</th>
                    <th className="text-left font-medium pb-1 pr-2">왜 발생하는가</th>
                    <th className="text-left font-medium pb-1">차단</th>
                  </tr>
                </thead>
                <tbody>
                  {s.mistakes.map((m, i) => (
                    <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                      <td className="py-1.5 pr-2 text-zinc-900 font-medium align-top">{m.m}</td>
                      <td className="py-1.5 pr-2 text-zinc-500 align-top">{m.why}</td>
                      <td className="py-1.5 text-emerald-700 align-top">{m.block}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-[11px] text-zinc-600 pt-2 border-t border-zinc-200">
            <span className="font-semibold text-zinc-800">확률 근거 · </span>{s.rationale}
          </div>
          <div className="text-[11px] text-sky-700">
            <span className="font-semibold">SP-1 접점 · </span>{s.sp1Link}
          </div>
        </div>
      )}
    </div>
  )
}

function ScenariosPanel() {
  const [openId, setOpenId] = useState('DT-D')
  const main4 = DT_SCENARIOS.matrix.filter(s => !s.wildcard)
  const wildcard = DT_SCENARIOS.matrix.find(s => s.wildcard)
  const pieData = DT_SCENARIOS.matrix.map(s => ({ name: `${s.id} ${s.name}`, value: s.probability, color: s.color }))
  const m = DT_SCENARIOS.marginals
  const marginalData = [
    { name: '수요발', value: m.demand, color: '#dc2626' },
    { name: '공급발', value: m.supply, color: '#2563eb' },
    { name: '급락형', value: m.cliff, color: '#ea580c' },
    { name: '침식형', value: m.grind, color: '#7c3aed' },
  ]

  // 2x2: row 0 = 급락형(위), row 1 = 침식형(아래) / col 0 = 수요발(좌), col 1 = 공급발(우)
  const cells = [
    { row: 0, col: 0 }, { row: 0, col: 1 },
    { row: 1, col: 0 }, { row: 1, col: 1 },
  ]

  return (
    <div className="space-y-4">
      <p className="text-[11px] text-amber-900 bg-amber-500/10 border border-amber-300 rounded-hig-md px-3 py-2.5 flex items-start gap-2">
        <AlertOctagon size={13} className="mt-0.5 shrink-0 text-amber-600" />
        <span><span className="font-bold">확률의 성격 · </span>{DT_SCENARIOS.probabilityNote}</span>
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-4">
        <Card title="다운턴 시나리오 매트릭스 (DF-D1 × DF-D2)" source="wiki/downturn/scenario-matrix.md">
          <div className="relative">
            {/* 폭 0 컨테이너에 중앙 정렬 — 회전 후 좌측 여백(ml-7) 안에만 놓이도록 */}
            <div className="absolute left-2 top-1/2 w-0 flex justify-center pointer-events-none">
              <span className="-rotate-90 origin-center text-[10px] text-zinc-500 whitespace-nowrap">
                DF-D2: 급락 ↑ / 침식 ↓
              </span>
            </div>
            <div className="text-center text-[10px] text-zinc-500 mb-1">DF-D1: 수요발 ← / 공급발 →</div>
            <div className="grid grid-cols-2 grid-rows-2 gap-2 ml-7">
              {cells.map(({ row, col }) => {
                const s = main4.find(x => x.quadrant.row === row && x.quadrant.col === col)
                if (!s) return <div key={`${row}-${col}`} />
                return (
                  <div
                    key={s.id}
                    className="rounded-hig-lg shadow-hig-1 p-3 border-2 min-h-[152px] flex flex-col cursor-pointer hover:shadow-hig-2 transition-shadow"
                    style={{ borderColor: s.color, backgroundColor: `${s.color}12` }}
                    onClick={() => setOpenId(s.id)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: s.color }}>
                          {s.id.replace('DT-', '')}
                        </span>
                        <span className="text-sm font-semibold text-zinc-900 tracking-tight">{s.name}</span>
                      </div>
                      <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.probability}%</div>
                    </div>
                    <p className="text-[11px] text-zinc-700 leading-snug mt-1 flex-1">{s.tagline}</p>
                    <div className="text-[10px] text-zinc-500 mt-1.5 flex items-center gap-1"><Clock size={9} />{s.duration}</div>
                  </div>
                )
              })}
            </div>
            {wildcard && (
              <div
                className="mt-3 ml-7 rounded-hig-lg shadow-hig-1 p-3 border border-dashed flex items-center gap-3 cursor-pointer"
                style={{ borderColor: `${wildcard.color}90`, backgroundColor: `${wildcard.color}10` }}
                onClick={() => setOpenId(wildcard.id)}
              >
                <span className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ backgroundColor: wildcard.color }}>E</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-zinc-900 tracking-tight">
                    {wildcard.name}
                    <span className="text-[10px] font-normal text-cyan-700 ml-2">와일드카드 · 2×2 평면 밖 (전환발)</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-0.5">{wildcard.tagline}</p>
                </div>
                <div className="text-2xl font-bold font-mono" style={{ color: wildcard.color }}>{wildcard.probability}%</div>
              </div>
            )}
          </div>
        </Card>

        <div className="space-y-4">
          <Card title="조건부 확률 분포" source="wiki/downturn/scenario-matrix.md">
            <ResponsiveContainer width="100%" height={236}>
              <PieChart margin={{ top: 12, bottom: 4, left: 4, right: 4 }}>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="46%" outerRadius={68} label={({ value }) => `${value}%`} labelLine={{ stroke: '#a1a1aa' }}>
                  {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4d4d8', borderRadius: 8, fontSize: 11 }} />
                <Legend wrapperStyle={{ fontSize: 10, color: '#71717a' }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card title="축별 한계 확률" source="wiki/downturn/scenario-matrix.md">
            <ResponsiveContainer width="100%" height={130}>
              <BarChart data={marginalData} layout="vertical" margin={{ left: 4, right: 24, top: 4, bottom: 4 }}>
                <CartesianGrid {...GRID} horizontal={false} />
                <XAxis type="number" domain={[0, 60]} {...AXIS} />
                <YAxis type="category" dataKey="name" width={52} {...AXIS} />
                <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d4d4d8', borderRadius: 8, fontSize: 11 }} formatter={v => `${v}%`} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#52525b', fontSize: 10, formatter: v => `${v}%` }}>
                  {marginalData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ul className="space-y-1.5 mt-2">
              {m.logic.map((l, i) => (
                <li key={i} className="text-[11px] text-zinc-600 leading-relaxed flex gap-1.5">
                  <span className="text-zinc-400 font-mono shrink-0">{i + 1}.</span>{l}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Card title="시나리오 간 전이 — 다운턴은 한 상자에 머물지 않는다" source="wiki/downturn/scenario-matrix.md">
        <p className="text-[11px] text-zinc-500 mb-2.5">
          SP-1의 시나리오는 서로 배타적인 세계이지만, 다운턴은 한 유형으로 시작해 다른 유형으로 넘어간다.
        </p>
        <div className="space-y-2">
          {DT_SCENARIOS.transitions.map((t, i) => {
            const from = DT_SCENARIOS.matrix.find(s => s.id === t.from)
            const to = DT_SCENARIOS.matrix.find(s => s.id === t.to)
            const riskCls = { high: 'border-red-300 bg-red-50', medium: 'border-amber-200 bg-amber-50', low: 'border-zinc-200 bg-zinc-50' }[t.risk]
            return (
              <div key={i} className={`border rounded-hig-md p-2.5 ${riskCls}`}>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: from.color }}>{from.id} {from.name}</span>
                  <ArrowRight size={13} className="text-zinc-400" />
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: to.color }}>{to.id} {to.name}</span>
                  <span className="text-[11px] text-zinc-600">— {t.condition}</span>
                </div>
                <p className="text-[11px] text-zinc-700 leading-relaxed">{t.note}</p>
              </div>
            )
          })}
        </div>
      </Card>

      <div className="space-y-2.5">
        {DT_SCENARIOS.matrix.map(s => (
          <ScenarioCard key={s.id} s={s} open={openId === s.id} onToggle={() => setOpenId(openId === s.id ? null : s.id)} />
        ))}
      </div>

      <Card title="분기점 모니터링 일정" source="wiki/downturn/scenario-matrix.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-3">분기 요인</th>
                <th className="text-left font-medium pb-2 pr-3">결정 시점</th>
                <th className="text-left font-medium pb-2 pr-3">모니터링 지표</th>
                <th className="text-left font-medium pb-2">판별 대상</th>
              </tr>
            </thead>
            <tbody>
              {DT_SCENARIOS.branchingPoints.map((bp, i) => (
                <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                  <td className="py-2 pr-3 text-zinc-800 align-top">{bp.factor}</td>
                  <td className="py-2 pr-3 font-mono text-amber-700 align-top whitespace-nowrap">{bp.decisionDate}</td>
                  <td className="py-2 pr-3 text-zinc-500 align-top">{bp.monitor}</td>
                  <td className="py-2 text-sky-700 align-top whitespace-nowrap">{bp.target}</td>
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
// 5. 대비 · 대응
// ─────────────────────────────────────────────────────────────────────────────
function StrategyPanel() {
  const [mode, setMode] = useState('prep')
  const [openId, setOpenId] = useState('DP-1')

  const items = mode === 'prep' ? DT_PREPARATION.items : DT_RESPONSE.items

  return (
    <div className="space-y-4">
      {/* 모드 전환 */}
      <div className="inline-flex items-center gap-1 p-1 rounded-hig-lg bg-zinc-100 border border-zinc-200">
        {[
          { id: 'prep', label: '대비 (DP-1~7)', sub: '도착 전 — 지금만 살 수 있는 것', icon: Shield },
          { id: 'resp', label: '대응 (DR-1~6)', sub: '도착 후 — 원인별 분기', icon: TrendingDown },
        ].map(t => {
          const Icon = t.icon
          const active = mode === t.id
          return (
            <button
              key={t.id}
              onClick={() => { setMode(t.id); setOpenId(t.id === 'prep' ? 'DP-1' : 'DR-1') }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-hig-md text-[13px] font-medium transition-all ${
                active ? 'bg-white text-zinc-900 shadow-hig-1 ring-1 ring-zinc-200' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Icon size={14} className={active ? 'text-hig-blue' : 'text-zinc-400'} />
              <span>{t.label}</span>
              <span className="text-[10px] text-zinc-400 hidden sm:inline">· {t.sub}</span>
            </button>
          )
        })}
      </div>

      {mode === 'prep' ? (
        <>
          <Card title="설계 원칙 — 왜 Main Bet이 없는가" source="wiki/downturn/preparation.md">
            <p className="text-xs text-zinc-700 leading-relaxed mb-3">{DT_PREPARATION.designNote}</p>
            <div className="border border-zinc-200 rounded-hig-md bg-zinc-50 p-3">
              <div className="text-xs font-bold text-zinc-900 mb-1.5">{DT_PREPARATION.historyLesson.title}</div>
              <p className="text-[11px] text-zinc-700 leading-relaxed mb-2">{DT_PREPARATION.historyLesson.body}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                {DT_PREPARATION.historyLesson.successes.map((s, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1.5">
                    <div className="text-[11px] font-medium text-emerald-900">{s.action}</div>
                    <div className="text-[10px] text-emerald-700 mt-0.5">→ {s.form}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-zinc-700 leading-relaxed">{DT_PREPARATION.historyLesson.conclusion}</p>
            </div>
          </Card>

          <Card title="종합 매트릭스 — 대비 × 시나리오" source="wiki/downturn/preparation.md">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-200">
                    <th className="text-left font-medium pb-2 pr-3">코드</th>
                    <th className="text-left font-medium pb-2 pr-3">대비 전략</th>
                    {SCENARIO_IDS.map(id => (
                      <th key={id} className="text-center font-medium pb-2 px-1 whitespace-nowrap">
                        <div className="text-[10px] font-mono">{id}</div>
                        <div className="text-[9px] text-zinc-400">{SCENARIO_SHORT[id]}</div>
                      </th>
                    ))}
                    <th className="text-left font-medium pb-2 pl-3">성격</th>
                  </tr>
                </thead>
                <tbody>
                  {DT_PREPARATION.items.map(it => (
                    <tr key={it.id} className="border-b border-zinc-200/50 last:border-0 hover:bg-zinc-50 cursor-pointer" onClick={() => setOpenId(it.id)}>
                      <td className="py-2 pr-3 font-mono font-bold text-zinc-900 whitespace-nowrap">{it.id}</td>
                      <td className="py-2 pr-3 text-zinc-800">
                        {it.name}
                        {it.isNew && <span className="ml-1.5 text-[9px] px-1 py-0.5 rounded bg-purple-500/15 text-purple-700 font-semibold">NEW</span>}
                      </td>
                      {SCENARIO_IDS.map(id => (
                        <td key={id} className="py-2 px-1 text-center"><ValueBadge v={it.values[id]} /></td>
                      ))}
                      <td className="py-2 pl-3 whitespace-nowrap">
                        {it.noRegret
                          ? <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-700 ring-1 ring-sky-300 font-semibold">무후회</span>
                          : <span className="text-[10px] text-zinc-400">조건부</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-emerald-800 bg-emerald-500/10 border border-emerald-200 rounded px-2.5 py-2 mt-3 leading-relaxed flex items-start gap-1.5">
              <Check size={12} className="mt-0.5 shrink-0" />
              <span>{DT_PREPARATION.crossValidation}</span>
            </p>
          </Card>
        </>
      ) : (
        <>
          <Card title="플레이북 원칙" source="wiki/downturn/response-playbook.md">
            <p className="text-xs text-zinc-700 leading-relaxed">{DT_RESPONSE.principle}</p>
          </Card>

          <Card title="종합 매트릭스 — 대응 × 시나리오" source="wiki/downturn/response-playbook.md">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-200">
                    <th className="text-left font-medium pb-2 pr-3">코드</th>
                    <th className="text-left font-medium pb-2 pr-3">대응</th>
                    {SCENARIO_IDS.map(id => (
                      <th key={id} className="text-center font-medium pb-2 px-1 whitespace-nowrap">
                        <div className="text-[10px] font-mono">{id}</div>
                        <div className="text-[9px] text-zinc-400">{SCENARIO_SHORT[id]}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {DT_RESPONSE.items.map(it => (
                    <tr key={it.id} className="border-b border-zinc-200/50 last:border-0 hover:bg-zinc-50 cursor-pointer" onClick={() => setOpenId(it.id)}>
                      <td className="py-2 pr-3 font-mono font-bold text-zinc-900 whitespace-nowrap">{it.id}</td>
                      <td className="py-2 pr-3 text-zinc-800">{it.name}</td>
                      {SCENARIO_IDS.map(id => (
                        <td key={id} className="py-2 px-1 text-center"><ValueBadge v={it.values[id]} /></td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-zinc-300 bg-zinc-50">
                    <td className="py-2 pr-3 font-bold text-zinc-900" colSpan={2}>시나리오별 1순위</td>
                    {SCENARIO_IDS.map(id => (
                      <td key={id} className="py-2 px-1 text-center text-[10px] text-emerald-700 font-semibold align-top">
                        {DT_RESPONSE.priorities[id]?.[0]?.split(' ')[0]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="금지 목록 (안티패턴)" source="wiki/downturn/response-playbook.md">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-zinc-500 border-b border-zinc-200">
                    <th className="text-left font-medium pb-2 pr-3">금지</th>
                    <th className="text-left font-medium pb-2 pr-3">조기 신호</th>
                    <th className="text-left font-medium pb-2">차단 장치</th>
                  </tr>
                </thead>
                <tbody>
                  {DT_RESPONSE.forbidden.map((f, i) => (
                    <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                      <td className="py-2 pr-3 align-top">
                        <span className="flex items-start gap-1.5 text-zinc-900 font-medium"><Ban size={12} className="text-red-500 mt-0.5 shrink-0" />{f.rule}</span>
                      </td>
                      <td className="py-2 pr-3 text-zinc-500 align-top">{f.signal}</td>
                      <td className="py-2 text-emerald-700 align-top">{f.block}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* 상세 카드 */}
      <div className="space-y-2.5">
        {items.map(it => {
          const open = openId === it.id
          return (
            <div key={it.id} className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 overflow-hidden">
              <button onClick={() => setOpenId(open ? null : it.id)} className="w-full flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors text-left">
                <span className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold shrink-0 ${
                  it.noRegret ? 'bg-sky-600 text-white' : 'bg-zinc-800 text-white'
                }`}>{it.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-zinc-900 tracking-tight">{it.name}</span>
                    <span className="text-[10px] text-zinc-400 font-mono">{it.en}</span>
                    {it.noRegret && <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-700 ring-1 ring-sky-300 font-semibold">무후회</span>}
                    {it.isNew && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-700 ring-1 ring-purple-300 font-semibold">NEW</span>}
                  </div>
                  <p className="text-[11px] text-zinc-600 mt-0.5 leading-relaxed">{it.summary}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {SCENARIO_IDS.map(id => <ValueBadge key={id} v={it.values[id]} />)}
                </div>
                {open ? <ChevronUp size={16} className="text-zinc-400 shrink-0 mt-0.5" /> : <ChevronDown size={16} className="text-zinc-400 shrink-0 mt-0.5" />}
              </button>

              {open && (
                <div className="border-t border-zinc-200 px-4 py-3 space-y-3 bg-zinc-50/50">
                  <div>
                    <div className="text-[10px] font-bold text-red-600 uppercase tracking-wide mb-1">{mode === 'prep' ? '문제' : '근거'}</div>
                    <p className="text-[11px] text-zinc-700 leading-relaxed">{it.problem ?? it.why}</p>
                  </div>

                  {it.stages && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">단계별 커밋 구조</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                        {it.stages.map((s, i) => (
                          <div key={i} className="border border-zinc-200 bg-white rounded px-2 py-1.5">
                            <div className="text-[11px] font-medium text-zinc-900">{s.stage}</div>
                            <div className="text-[10px] text-zinc-500 mt-0.5">커밋 {s.commit}</div>
                            <div className="text-[10px] text-zinc-500">중단 {s.cost}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {it.premises && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">치킨게임 4대 전제의 붕괴</div>
                      <div className="space-y-1">
                        {it.premises.map((p, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px]">
                            <span className="text-zinc-500 shrink-0 w-52">{p.premise}</span>
                            <X size={11} className="text-red-500 mt-0.5 shrink-0" />
                            <span className="text-zinc-800 flex-1">{p.reality}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {it.protocol && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">프로토콜</div>
                      <div className="space-y-1">
                        {it.protocol.map((p, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px]">
                            <span className="font-mono font-bold text-sky-700 shrink-0 w-20">{p.step}</span>
                            <span className="text-zinc-700">{p.body}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {it.symmetricActions && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <div>
                        <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mb-1">감별 전 허용 액션</div>
                        <ul className="text-[11px] text-zinc-700 space-y-0.5">{it.symmetricActions.map((a, i) => <li key={i}>· {a}</li>)}</ul>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-sky-600 uppercase tracking-wide mb-1">판정서 필수 항목</div>
                        <ul className="text-[11px] text-zinc-700 space-y-0.5">{it.verdictContents.map((a, i) => <li key={i}>· {a}</li>)}</ul>
                      </div>
                    </div>
                  )}

                  {it.table && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">응수 원칙</div>
                      <table className="w-full text-[11px]">
                        <thead><tr className="text-zinc-400 border-b border-zinc-200"><th className="text-left pb-1 pr-2">고객 요구</th><th className="text-left pb-1 pr-2">응수</th><th className="text-left pb-1">회피</th></tr></thead>
                        <tbody>
                          {it.table.map((r, i) => (
                            <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                              <td className="py-1.5 pr-2 text-zinc-800">{r.demand}</td>
                              <td className="py-1.5 pr-2 text-emerald-700 flex items-start gap-1"><Check size={11} className="mt-0.5 shrink-0" />{r.ok}</td>
                              <td className="py-1.5 text-red-600">{r.no}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {it.limit && <p className="text-[11px] text-amber-800 bg-amber-500/10 border border-amber-200 rounded px-2 py-1.5 mt-2 leading-relaxed">{it.limit}</p>}
                    </div>
                  )}

                  {it.intensities && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">강도 3단계</div>
                      <div className="space-y-1">
                        {it.intensities.map((s, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px] border border-zinc-200 bg-white rounded px-2 py-1.5">
                            <span className="w-5 h-5 rounded-full bg-zinc-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{s.level}</span>
                            <span className="text-zinc-800 flex-1">{s.action}</span>
                            <span className="text-zinc-500 shrink-0">{s.scenarios}</span>
                          </div>
                        ))}
                      </div>
                      {it.exitCriteria && (
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          <div>
                            <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wide mb-1">하단 철수 판단 기준 (DT-D)</div>
                            <ul className="text-[11px] text-zinc-700 space-y-0.5">{it.exitCriteria.map((c, i) => <li key={i}>· {c}</li>)}</ul>
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-purple-600 uppercase tracking-wide mb-1">선택지</div>
                            <ul className="text-[11px] text-zinc-700 space-y-0.5">{it.exitOptions.map((c, i) => <li key={i}>{c}</li>)}</ul>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {it.conditions && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">시나리오별 발동 조건</div>
                      <table className="w-full text-[11px]">
                        <tbody>
                          {it.conditions.map((c, i) => (
                            <tr key={i} className="border-b border-zinc-200/50 last:border-0">
                              <td className="py-1.5 pr-2 font-mono font-bold text-zinc-800 w-16">{c.scenario}</td>
                              <td className="py-1.5 pr-2 text-zinc-500 w-40">명분 {c.cause}</td>
                              <td className="py-1.5 text-zinc-800">{c.trigger}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {it.exemptions && (
                        <p className="text-[11px] text-zinc-600 mt-2">
                          <span className="font-semibold text-zinc-800">감축 예외: </span>{it.exemptions.join(' · ')}
                        </p>
                      )}
                    </div>
                  )}

                  {(it.actions || it.rules) && (
                    <div>
                      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide mb-1.5">실행</div>
                      <div className="space-y-1">
                        {(it.actions ?? it.rules).map((a, i) => (
                          <div key={i} className="flex items-start gap-2 text-[11px]">
                            <span className="font-semibold text-zinc-800 shrink-0 w-24">{a.k}</span>
                            <span className="text-zinc-600 flex-1">{a.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {it.valueNotes && (
                    <p className="text-[11px] text-zinc-600 bg-zinc-100 rounded px-2.5 py-1.5 leading-relaxed">
                      <span className="font-semibold">시나리오 값 노트 · </span>{it.valueNotes}
                    </p>
                  )}

                  {it.links && (
                    <div className="flex items-center gap-1.5 flex-wrap pt-1">
                      <span className="text-[10px] text-zinc-400">연결 전략:</span>
                      {it.links.map(l => (
                        <span key={l} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-200 text-zinc-700">{l}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {mode === 'prep' && (
        <Card title="유효기간 — 지금 결정하지 않으면 사라지는 것" source="wiki/downturn/preparation.md">
          <div className="space-y-1.5">
            {DT_PREPARATION.windows.map(w => {
              const urgent = w.closes !== '상시'
              return (
                <div key={w.id} className={`flex items-start gap-2.5 px-2.5 py-2 rounded-hig-md border ${urgent ? 'border-red-200 bg-red-50/70' : 'border-zinc-200 bg-zinc-50'}`}>
                  <span className="font-mono font-bold text-xs text-zinc-900 shrink-0 w-12">{w.id}</span>
                  <span className={`text-[11px] font-medium shrink-0 w-44 ${urgent ? 'text-red-700' : 'text-zinc-500'}`}>{w.closes}</span>
                  <span className="text-[11px] text-zinc-600 flex-1">{w.why}</span>
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. 감별 지표
// ─────────────────────────────────────────────────────────────────────────────
const DX_STATUS = {
  normal:  { label: '정상',   cls: 'bg-emerald-100 text-emerald-700 ring-emerald-300', dot: '#10b981' },
  watch:   { label: '주의',   cls: 'bg-amber-100 text-amber-700 ring-amber-300',       dot: '#f59e0b' },
  alert:   { label: '경보',   cls: 'bg-orange-100 text-orange-700 ring-orange-300',    dot: '#ea580c' },
  partial: { label: '부분측정', cls: 'bg-sky-100 text-sky-700 ring-sky-300',            dot: '#0284c7' },
  missing: { label: '미측정', cls: 'bg-red-100 text-red-700 ring-red-300',             dot: '#dc2626' },
}

const CELL = {
  ok:   { txt: '정상',  cls: 'bg-emerald-100 text-emerald-700' },
  warn: { txt: '주의',  cls: 'bg-amber-100 text-amber-700' },
  bad:  { txt: '악화',  cls: 'bg-red-100 text-red-700' },
  '—':  { txt: '—',    cls: 'bg-zinc-100 text-zinc-400' },
}

function IndicatorsPanel() {
  const causeItems = DT_INDICATORS.items.filter(i => i.axis === 'cause')
  const speedItems = DT_INDICATORS.items.filter(i => i.axis === 'speed')

  const renderItem = it => {
    const st = DX_STATUS[it.status]
    return (
      <div key={it.id} className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-3.5">
        <div className="flex items-start gap-2.5 mb-2">
          <span className="px-2 py-1 rounded-md bg-zinc-800 text-white text-[11px] font-mono font-bold shrink-0">{it.id}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-semibold text-zinc-900 tracking-tight">{it.name}</h4>
              {it.isNew && <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-700 ring-1 ring-purple-300 font-semibold">NEW</span>}
              {it.primary && <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-700 font-semibold">핵심</span>}
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">판별 대상: {it.detects} · 선행 {it.lead}</div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ring-1 shrink-0 ${st.cls}`}>{st.label}</span>
        </div>

        <div className="space-y-1 text-[11px]">
          <div className="flex items-start gap-2">
            <span className="text-zinc-400 shrink-0 w-14">레벨 임계</span>
            <span className="text-zinc-700 flex-1">{it.threshold}</span>
          </div>
          {it.trend !== '—' && (
            <div className="flex items-start gap-2">
              <span className="text-zinc-400 shrink-0 w-14">추세 조건</span>
              <span className="text-zinc-700 flex-1">{it.trend}</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <span className="text-zinc-400 shrink-0 w-14">현재</span>
            <span className="text-zinc-900 font-medium flex-1">{it.current}</span>
          </div>
        </div>

        <p className="text-[11px] text-zinc-600 mt-2 pt-2 border-t border-zinc-200/70 leading-relaxed">{it.note}</p>
        {it.ewiLink !== '—' && (
          <div className="mt-1.5 text-[10px] text-zinc-400">기존 EWI 연계: <span className="font-mono text-zinc-500">{it.ewiLink}</span></div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Card source="wiki/downturn/differential-indicators.md">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 w-9 h-9 rounded-hig-md bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Search size={17} />
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900 leading-relaxed">{DT_INDICATORS.principle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3">
              {DT_INDICATORS.designNotes.map((n, i) => (
                <div key={i} className="border border-zinc-200 bg-zinc-50 rounded-hig-md p-2.5">
                  <div className="text-xs font-bold text-zinc-900 mb-1">{n.title}</div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">{n.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <p className="text-[11px] text-zinc-800 bg-zinc-100 border border-zinc-300 rounded-hig-md px-3 py-2.5 flex items-start gap-2 leading-relaxed">
        <Info size={13} className="mt-0.5 shrink-0 text-zinc-500" />
        <span><span className="font-bold">종합 판독 (2026-08-15) · </span>{DT_INDICATORS.verdict}</span>
      </p>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Compass size={14} className="text-sky-600" />
          <h3 className="text-sm font-semibold text-zinc-800">원인 축 판별 (DX-1 ~ DX-5)</h3>
        </div>
        <div className="space-y-2.5">{causeItems.map(renderItem)}</div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock size={14} className="text-purple-600" />
          <h3 className="text-sm font-semibold text-zinc-800">속도 축 판별 (DX-6 ~ DX-8)</h3>
        </div>
        <div className="space-y-2.5">{speedItems.map(renderItem)}</div>
      </div>

      <Card title="판별 결정표" source="wiki/downturn/differential-indicators.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-zinc-500 border-b border-zinc-200">
                <th className="text-center font-medium pb-2 px-1">DX-1 FCF</th>
                <th className="text-center font-medium pb-2 px-1">DX-2 임대가</th>
                <th className="text-center font-medium pb-2 px-1">DX-4 투입갭</th>
                <th className="text-center font-medium pb-2 px-1">DX-6 스프레드</th>
                <th className="text-center font-medium pb-2 px-1">DX-8 원단위</th>
                <th className="text-left font-medium pb-2 pl-3">→ 시나리오</th>
              </tr>
            </thead>
            <tbody>
              {DT_INDICATORS.decisionTable.map(r => {
                const s = DT_SCENARIOS.matrix.find(x => x.id === r.scenario)
                return (
                  <tr key={r.scenario} className="border-b border-zinc-200/50 last:border-0">
                    {['dx1', 'dx2', 'dx4', 'dx6', 'dx8'].map(k => {
                      const c = CELL[r[k]] ?? CELL['—']
                      return <td key={k} className="py-2 px-1 text-center"><span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${c.cls}`}>{c.txt}</span></td>
                    })}
                    <td className="py-2 pl-3">
                      <span className="text-[11px] font-bold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: s.color }}>{r.scenario}</span>
                      <span className="text-[11px] text-zinc-700 ml-1.5">{r.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="오진 방지 체크" source="wiki/downturn/differential-indicators.md">
          <div className="space-y-2">
            {DT_INDICATORS.misdiagnosis.map((m, i) => (
              <div key={i} className="border border-red-200 bg-red-50/60 rounded-hig-md p-2.5">
                <div className="flex items-start gap-1.5 mb-1">
                  <AlertOctagon size={12} className="text-red-500 mt-0.5 shrink-0" />
                  <span className="text-[11px] font-semibold text-zinc-900">{m.risk}</span>
                </div>
                <p className="text-[11px] text-zinc-700 leading-relaxed pl-5">{m.key}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="구축 로드맵" source="wiki/downturn/differential-indicators.md">
          <div className="space-y-1.5">
            {DT_INDICATORS.roadmap.map(r => (
              <div key={r.rank} className="flex items-start gap-2.5 px-2.5 py-2 rounded-hig-md border border-zinc-200 bg-zinc-50">
                <span className="w-5 h-5 rounded-full bg-zinc-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{r.rank}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-zinc-900">{r.item}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{r.owner}</div>
                </div>
                <span className="text-[10px] font-mono text-amber-700 shrink-0">{r.due}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN — 서브탭은 상위 ScenarioPlanning 에서 관리, 여기서는 패널 라우팅만
// ─────────────────────────────────────────────────────────────────────────────
export const DOWNTURN_SUB_TABS = [
  { id: 'dt-focal',     label: 'Focal Issue',    icon: Target },
  { id: 'dt-steep',     label: 'STEEP',          icon: Layers },
  { id: 'dt-drivers',   label: 'Driving Forces', icon: Compass },
  { id: 'dt-scenarios', label: 'Scenarios',      icon: MapIcon },
  { id: 'dt-strategy',  label: '대비 · 대응',     icon: Shield },
  { id: 'dt-ddx',       label: '감별 지표',       icon: Search },
]

export default function DownturnPlanning({ tab }) {
  return (
    <div>
      {tab === 'dt-focal'     && <FocalPanel />}
      {tab === 'dt-steep'     && <SteepPanel />}
      {tab === 'dt-drivers'   && <DriversPanel />}
      {tab === 'dt-scenarios' && <ScenariosPanel />}
      {tab === 'dt-strategy'  && <StrategyPanel />}
      {tab === 'dt-ddx'       && <IndicatorsPanel />}
    </div>
  )
}
