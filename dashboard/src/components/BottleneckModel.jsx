import { useMemo, useState } from 'react'
import {
  BarChart, Bar, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceDot,
} from 'recharts'
import {
  Zap, Banknote, Cpu, Layers, SlidersHorizontal, Radar, AlertTriangle,
  TrendingDown, Grid3x3, RotateCcw, Activity,
} from 'lucide-react'
import {
  MODEL_ASOF, BASE_SERVERS, POTENTIAL_DEMAND, BOTTLENECKS, INTENSITY, SUPPLY,
  SUPPLIERS, PRICE_ELASTICITY, ALERT_BANDS, alertBand, realizedShipments,
  memoryDemand, equilibrium, curvePoints, sensitivity, baseIntensity, PRESETS,
  SHOCK_SCENARIOS, MONITORING_NOTES,
} from '../data/bottleneckModel'
import SourceLink from './SourceLink'

const ICONS = { zap: Zap, banknote: Banknote, cpu: Cpu, layers: Layers }
const AXIS = { tick: { fill: '#71717a', fontSize: 11 }, axisLine: { stroke: '#e4e4e7' }, tickLine: { stroke: '#e4e4e7' } }
const GRID = { stroke: '#e4e4e7', strokeDasharray: '3 3' }

const fmt = (v, d = 2) => v.toLocaleString('ko-KR', { minimumFractionDigits: d, maximumFractionDigits: d })
const fmtSigned = (v, d = 2) => `${v >= 0 ? '+' : ''}${fmt(v, d)}`

function Card({ title, icon: Icon, sub, children, className = '' }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-1.5">
            {Icon && <Icon size={15} className="text-zinc-400" />}
            {title}
          </h3>
          {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

// ── 1. 병목 상태 카드 ─────────────────────────────────────────────────────────
function BottleneckCard({ b, shock }) {
  const Icon = ICONS[b.icon]
  const band = alertBand(b.currentIndex)
  return (
    <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg" style={{ backgroundColor: `${b.color}1a` }}>
            <Icon size={16} style={{ color: b.color }} />
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-800">{b.name}</div>
            <div className="text-[10px] text-zinc-400">{b.resourceLabel} · 기준 {b.base}{b.unit}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold font-mono" style={{ color: band.color }}>{b.currentIndex}</div>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: `${band.color}1a`, color: band.color }}>
            {band.label}
          </span>
        </div>
      </div>
      {/* 제약지수 게이지 — 경보 밴드 배경 + 현재 위치 마커 */}
      <div className="relative h-2 rounded-full overflow-hidden flex">
        {ALERT_BANDS.map((a, i) => {
          const prev = i === 0 ? 0 : ALERT_BANDS[i - 1].max
          const w = Math.min(a.max, 100) - prev
          return <div key={a.key} style={{ width: `${w}%`, backgroundColor: a.color, opacity: 0.25 }} />
        })}
        <div className="absolute top-0 bottom-0 w-1 rounded-full" style={{ left: `calc(${b.currentIndex}% - 2px)`, backgroundColor: band.color }} />
      </div>
      <p className="text-xs text-zinc-500 leading-relaxed">{b.desc}</p>
      <p className="text-[11px] text-zinc-400 leading-relaxed">현재 판단: {b.indexNote}</p>
      <div className="flex items-center justify-between text-[11px] mt-auto pt-1.5 border-t border-zinc-100">
        <span className="text-zinc-400">탄력도 ε <span className="font-mono text-zinc-600">{b.elasticity.toFixed(2)}</span></span>
        {shock && (
          <span className="font-mono font-semibold text-red-500">
            최악 하방 HBM {fmt(shock.impact.hbm)}EB ({shock.impact.hbmPct}%)
          </span>
        )}
      </div>
    </div>
  )
}

// ── 차트 툴팁 ────────────────────────────────────────────────────────────────
function ChartTooltip({ active, payload, label, unit, labelPrefix = '' }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-100 border border-zinc-300 rounded-lg p-2.5 text-xs shadow-xl">
      <div className="text-zinc-700 font-medium mb-1.5">{labelPrefix}{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span style={{ color: p.color || p.fill }}>●</span>
          <span className="text-zinc-500">{p.name}:</span>
          <span className="font-mono font-bold" style={{ color: p.color || p.fill }}>
            {typeof p.value === 'number' ? fmt(p.value) : p.value}{unit ? ` ${unit}` : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── 2. What-if 시뮬레이터 ────────────────────────────────────────────────────
function Simulator() {
  const [resources, setResources] = useState(PRESETS.base.resources)
  const [potentialKey, setPotentialKey] = useState('base')
  const [supplyKey, setSupplyKey] = useState('base')
  const [intensity, setIntensity] = useState(baseIntensity())
  const [curveMetric, setCurveMetric] = useState('hbm')

  const applyPreset = (k) => {
    setResources(PRESETS[k].resources)
    setPotentialKey(PRESETS[k].potential)
    setSupplyKey(PRESETS[k].supply)
  }

  const out = useMemo(() => {
    const ship = realizedShipments(resources, POTENTIAL_DEMAND[potentialKey].value)
    const dem = memoryDemand(ship.servers, intensity)
    const sup = SUPPLY[supplyKey]
    return {
      ship, dem, sup,
      hbmGap: sup.hbm - dem.hbmEB,
      dramGap: sup.dram - dem.dramEB,
      hbmEq: equilibrium(dem.hbmEB, sup.hbm, PRICE_ELASTICITY.hbm),
      dramEq: equilibrium(dem.dramEB, sup.dram, PRICE_ELASTICITY.dram),
    }
  }, [resources, potentialKey, supplyKey, intensity])

  const capData = useMemo(() => ([
    { name: '잠재 수요 U', cap: out.ship.potentialU, color: '#71717a', isBinding: out.ship.binding.some(x => x.id === 'demand') },
    ...out.ship.caps.map(c => ({ name: c.name, cap: c.cap, color: c.color, isBinding: out.ship.binding.some(x => x.id === c.id) })),
  ]), [out])

  const curve = useMemo(() => {
    const d0 = curveMetric === 'hbm' ? out.dem.hbmEB : out.dem.dramEB
    const s0 = curveMetric === 'hbm' ? out.sup.hbm : out.sup.dram
    const el = PRICE_ELASTICITY[curveMetric]
    return { pts: curvePoints(d0, s0, el), eq: equilibrium(d0, s0, el) }
  }, [out, curveMetric])

  const isBase = potentialKey === 'base' && supplyKey === 'base'
    && BOTTLENECKS.every(b => resources[b.id] === b.base)
    && intensity.accel === INTENSITY.accel.base && intensity.hbmGB === INTENSITY.hbmGB.base && intensity.dramTB === INTENSITY.dramTB.base

  const selectCls = 'bg-white border border-zinc-200 rounded-md px-2 py-1 text-xs text-zinc-700'

  return (
    <Card
      title="What-if 시뮬레이터 — S₂₀₃₀ = min(U, 전력, CAPEX, 파운드리, 패키징)"
      icon={SlidersHorizontal}
      sub="병목 자원을 움직여 2030 실현 출하 → HBM·DRAM 수급 → 가격지수를 즉시 재계산 (가정 시뮬레이션, 실측 아님)"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] gap-5">
        {/* ── 좌: 컨트롤 ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            {Object.entries(PRESETS).map(([k, p]) => (
              <button key={k} onClick={() => applyPreset(k)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                  (k === 'base' ? isBase : false) || (resources === p.resources && potentialKey === p.potential && supplyKey === p.supply)
                    ? 'bg-zinc-800 text-white border-zinc-800'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                }`}>
                {p.label}
              </button>
            ))}
            <button onClick={() => { applyPreset('base'); setIntensity(baseIntensity()) }}
              className="ml-auto p-1.5 text-zinc-400 hover:text-zinc-700 rounded-md hover:bg-zinc-100" title="기준으로 리셋">
              <RotateCcw size={14} />
            </button>
          </div>

          {BOTTLENECKS.map(b => {
            const Icon = ICONS[b.icon]
            const min = Math.round((b.low * 0.85) / b.step) * b.step
            const max = Math.round((b.high * 1.1) / b.step) * b.step
            return (
              <div key={b.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="flex items-center gap-1.5 text-zinc-600">
                    <Icon size={13} style={{ color: b.color }} />
                    {b.name} <span className="text-zinc-400">({b.resourceLabel})</span>
                  </span>
                  <span className="font-mono font-semibold text-zinc-800">
                    {fmt(resources[b.id], b.step < 1 ? 2 : 0)} {b.unit}
                  </span>
                </div>
                <input
                  type="range" min={min} max={max} step={b.step} value={resources[b.id]}
                  onChange={e => setResources(r => ({ ...r, [b.id]: Number(e.target.value) }))}
                  className="w-full h-1.5 cursor-pointer" style={{ accentColor: b.color }}
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>낮음 {b.low}</span><span>기준 {b.base}</span><span>높음 {b.high}</span>
                </div>
              </div>
            )
          })}

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
            <label className="text-xs text-zinc-500 flex flex-col gap-1">
              잠재 수요 U
              <select className={selectCls} value={potentialKey} onChange={e => setPotentialKey(e.target.value)}>
                {Object.entries(POTENTIAL_DEMAND).map(([k, p]) => (
                  <option key={k} value={k}>{p.label} — {p.value}만 대 ({p.totalServers}만×{p.hbmShare}%)</option>
                ))}
              </select>
            </label>
            <label className="text-xs text-zinc-500 flex flex-col gap-1">
              공급 시나리오
              <select className={selectCls} value={supplyKey} onChange={e => setSupplyKey(e.target.value)}>
                {Object.entries(SUPPLY).map(([k, s]) => (
                  <option key={k} value={k}>{s.label} — HBM {fmt(s.hbm)} / DRAM {fmt(s.dram)}EB</option>
                ))}
              </select>
            </label>
            {Object.entries(INTENSITY).map(([k, def]) => (
              <label key={k} className="text-xs text-zinc-500 flex flex-col gap-1">
                {def.label}
                <select className={selectCls} value={intensity[k]} onChange={e => setIntensity(s => ({ ...s, [k]: Number(e.target.value) }))}>
                  {def.options.map(o => <option key={o} value={o}>{o}{def.unit}{o === def.base ? ' (기준)' : ''}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>

        {/* ── 우: 출력 ── */}
        <div className="space-y-4">
          {/* 핵심 출력 타일 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
              <div className="text-[10px] text-zinc-400 mb-0.5">실현 HBM-GPU 서버 출하</div>
              <div className="text-lg font-bold font-mono text-zinc-800">{fmt(out.ship.servers, 1)}<span className="text-xs font-normal text-zinc-400"> 만 대</span></div>
              <div className="text-[10px] text-zinc-400">잠재 {fmt(out.ship.potentialU, 0)}만 대 중 {fmt(out.ship.servers / out.ship.potentialU * 100, 0)}% 실현</div>
            </div>
            <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
              <div className="text-[10px] text-zinc-400 mb-0.5">구속 병목 (binding)</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {out.ship.binding.map(x => (
                  <span key={x.id} className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{ backgroundColor: `${x.color}1a`, color: x.color }}>{x.name}</span>
                ))}
              </div>
              <div className="text-[10px] text-zinc-400 mt-1">{out.ship.binding.length === 4 ? '4축 동률 (기준값)' : 'min() 결정 축'}</div>
            </div>
            <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
              <div className="text-[10px] text-zinc-400 mb-0.5">HBM 수요 / 공급</div>
              <div className="text-lg font-bold font-mono text-zinc-800">{fmt(out.dem.hbmEB)}<span className="text-xs font-normal text-zinc-400"> / {fmt(out.sup.hbm)}EB</span></div>
              <div className={`text-[11px] font-mono font-semibold ${out.hbmGap < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                수급차 {fmtSigned(out.hbmGap)}EB · 가격지수 {fmt(out.hbmEq.price, 1)}
              </div>
            </div>
            <div className="rounded-lg bg-zinc-50 border border-zinc-200 p-3">
              <div className="text-[10px] text-zinc-400 mb-0.5">AI 서버 DRAM 수요 / 공급</div>
              <div className="text-lg font-bold font-mono text-zinc-800">{fmt(out.dem.dramEB)}<span className="text-xs font-normal text-zinc-400"> / {fmt(out.sup.dram)}EB</span></div>
              <div className={`text-[11px] font-mono font-semibold ${out.dramGap < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                수급차 {fmtSigned(out.dramGap)}EB · 가격지수 {fmt(out.dramEq.price, 1)}
              </div>
            </div>
          </div>

          {/* 병목별 출하 상한 바 */}
          <div>
            <div className="text-xs font-medium text-zinc-600 mb-1">병목별 출하 상한 Sᵢ (만 대) — 최솟값이 실현 출하를 결정</div>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={capData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 0 }}>
                <CartesianGrid {...GRID} horizontal={false} />
                <XAxis type="number" {...AXIS} domain={[0, 'dataMax + 20']} unit="만" />
                <YAxis type="category" dataKey="name" {...AXIS} width={88} />
                <Tooltip content={<ChartTooltip unit="만 대" />} cursor={{ fill: 'rgba(75,85,99,0.06)' }} />
                <Bar dataKey="cap" name="출하 상한" radius={[0, 4, 4, 0]} barSize={16}>
                  {capData.map((d, i) => (
                    <Cell key={i} fill={d.color} fillOpacity={d.isBinding ? 1 : 0.35}
                      stroke={d.isBinding ? d.color : 'none'} strokeWidth={d.isBinding ? 1.5 : 0} />
                  ))}
                </Bar>
                <ReferenceLine x={out.ship.servers} stroke="#18181b" strokeDasharray="4 3"
                  label={{ value: `실현 ${fmt(out.ship.servers, 1)}만`, position: 'top', fill: '#18181b', fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 수급 곡선 + 균형점 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-zinc-600">
                수급 곡선과 균형 (상수탄력도 — 정규화 가격지수, 기준=100)
              </div>
              <div className="flex gap-1">
                {['hbm', 'dram'].map(m => (
                  <button key={m} onClick={() => setCurveMetric(m)}
                    className={`px-2 py-0.5 text-[11px] font-medium rounded ${curveMetric === m ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
                    {m === 'hbm' ? 'HBM' : 'DRAM'}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={curve.pts} margin={{ left: 0, right: 16, top: 20, bottom: 0 }}>
                <CartesianGrid {...GRID} />
                <XAxis dataKey="price" {...AXIS} label={{ value: '가격지수', position: 'insideBottomRight', offset: -2, fill: '#a1a1aa', fontSize: 10 }} />
                <YAxis {...AXIS} unit="EB" domain={['auto', 'auto']} tickFormatter={v => v.toFixed(1)} />
                <Tooltip content={<ChartTooltip unit="EB" labelPrefix="가격지수 " />} cursor={{ stroke: '#e4e4e7' }} />
                <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
                <Line dataKey="demand" name="수요" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line dataKey="supply" name="공급" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <ReferenceDot x={Math.round(curve.eq.price / 5) * 5} y={curve.eq.qty} r={5} fill="#18181b" stroke="#fff" strokeWidth={1.5} />
                <ReferenceLine x={Math.round(curve.eq.price / 5) * 5} stroke="#18181b" strokeDasharray="3 3"
                  label={{ value: `균형 p*≈${fmt(curve.eq.price, 1)} · Q*≈${fmt(curve.eq.qty)}EB`, position: 'top', fill: '#18181b', fontSize: 10 }} />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-zinc-400 mt-0.5">
              탄력도: HBM 수요 −0.35·공급 +0.60 / DRAM 수요 −0.50·공급 +0.80. 시장가 예측이 아니라 수급 압박의 방향·강도 모형.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

// ── 3. 민감도 토네이도 ───────────────────────────────────────────────────────
function SensitivityTornado() {
  const data = useMemo(() => sensitivity().map(s => ({
    ...s,
    downside: Number(s.downside.toFixed(2)),
    upside: Number(s.upside.toFixed(2)),
  })), [])
  return (
    <Card title="병목별 HBM 수요 민감도 (기준 2.88EB 대비)" icon={TrendingDown}
      sub="각 병목만 낮음/높음으로 이동(나머지 기준)했을 때의 ΔEB — 하방 CAPEX > 전력 ≈ 패키징 > 파운드리">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 32, top: 4 }} stackOffset="sign">
          <CartesianGrid {...GRID} horizontal={false} />
          <XAxis type="number" {...AXIS} unit="EB" domain={[-1.1, 1.1]} tickFormatter={v => v.toFixed(1)} />
          <YAxis type="category" dataKey="name" {...AXIS} width={88} />
          <Tooltip content={<ChartTooltip unit="EB" />} cursor={{ fill: 'rgba(75,85,99,0.06)' }} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
          <ReferenceLine x={0} stroke="#a1a1aa" />
          <Bar dataKey="downside" name="하방 (자원 낮음)" fill="#ef4444" radius={[4, 0, 0, 4]} barSize={14} />
          <Bar dataKey="upside" name="상방 (자원 높음)" fill="#10b981" radius={[0, 4, 4, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">
        하방 위험은 <strong className="text-red-500">CAPEX/ROI(-0.91EB·-31.5%)</strong>가 최대 — 기술보다 ROI 재평가가 먼저 수요를 꺾는다.
        상방에서는 단일 축 개선의 효과가 잠재 수요·타 병목에 다시 막히므로 작다(기준 U=164만 대 기준).
        높음 시나리오의 최종 상한은 <strong className="text-indigo-500">파운드리(152.8만 대)</strong> — 상방 최종 병목.
      </p>
    </Card>
  )
}

// ── 4. 수급차 매트릭스 3×3 ──────────────────────────────────────────────────
function GapMatrix() {
  const [metric, setMetric] = useState('hbm')
  const rows = useMemo(() => {
    const keys = ['low', 'base', 'high']
    return keys.map(dk => {
      const ship = realizedShipments(PRESETS[dk].resources, POTENTIAL_DEMAND[dk].value)
      const dem = memoryDemand(ship.servers, baseIntensity())
      const d0 = metric === 'hbm' ? dem.hbmEB : dem.dramEB
      return {
        key: dk, label: `${PRESETS[dk].label}수요`, demand: d0,
        cells: keys.map(sk => {
          const s0 = metric === 'hbm' ? SUPPLY[sk].hbm : SUPPLY[sk].dram
          return { key: sk, gap: s0 - d0, eq: equilibrium(d0, s0, PRICE_ELASTICITY[metric]) }
        }),
      }
    })
  }, [metric])
  return (
    <Card title="수급차 매트릭스 — 수요 × 공급 시나리오" icon={Grid3x3}
      sub="셀 = 초과공급(+)/부족(−) EB · 괄호 = 균형 가격지수. stress 조합(고수요-저공급)이 핵심 감시 대상">
      <div className="flex gap-1 mb-3">
        {['hbm', 'dram'].map(m => (
          <button key={m} onClick={() => setMetric(m)}
            className={`px-2.5 py-1 text-[11px] font-medium rounded ${metric === m ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}>
            {m === 'hbm' ? 'HBM' : 'AI 서버 DRAM'}
          </button>
        ))}
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-zinc-400">
            <th className="text-left font-medium py-1.5 pr-2">수요 ↓ / 공급 →</th>
            {['low', 'base', 'high'].map(k => (
              <th key={k} className="font-medium py-1.5 text-center">
                {SUPPLY[k].label}<span className="font-mono text-[10px] block text-zinc-300">{fmt(metric === 'hbm' ? SUPPLY[k].hbm : SUPPLY[k].dram)}EB</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.key} className="border-t border-zinc-100">
              <td className="py-2 pr-2 text-zinc-600">
                {r.label}<span className="font-mono text-[10px] block text-zinc-400">{fmt(r.demand)}EB</span>
              </td>
              {r.cells.map(c => {
                const neg = c.gap < 0
                const strong = Math.abs(c.gap) > 0.8
                return (
                  <td key={c.key} className="py-1.5 px-1">
                    <div className="rounded-md py-1.5 text-center font-mono font-semibold"
                      style={{
                        backgroundColor: neg ? `rgba(239,68,68,${strong ? 0.18 : 0.10})` : `rgba(16,185,129,${strong ? 0.18 : 0.10})`,
                        color: neg ? '#dc2626' : '#059669',
                      }}>
                      {fmtSigned(c.gap)}EB
                      <span className="block text-[10px] font-normal opacity-75">p* {fmt(c.eq.price, 1)}</span>
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-zinc-500 mt-2 leading-relaxed">
        {metric === 'hbm'
          ? '기준-기준 +0.07EB = 사실상 균형(극도 타이트). 고수요-저공급에서 -1.12EB·p* 149.7 — 물량 부족보다 가격 급등이 먼저 오는 구조.'
          : '기준-기준 +0.80EB 완충 — shortage가 와도 HBM보다 늦고 완만. 고수요-저공급에서만 -0.36EB 부족.'}
      </p>
    </Card>
  )
}

// ── 5. 공급사별 유효 캐파 ────────────────────────────────────────────────────
function SupplierCapacity() {
  const data = SUPPLIERS.map(s => ({ ...s }))
  return (
    <Card title="공급사별 2030 유효 캐파 (기준 시나리오, 모형 추정)" icon={Activity}
      sub="명판용량이 아니라 AI 데이터센터용 HBM·서버 DRAM 귀속 유효 캐파 — exact stack/month·KGD yield는 비공개(미지수)">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
          <CartesianGrid {...GRID} />
          <XAxis dataKey="name" {...AXIS} />
          <YAxis {...AXIS} unit="EB" />
          <Tooltip content={<ChartTooltip unit="EB" />} cursor={{ fill: 'rgba(75,85,99,0.06)' }} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
          <Bar dataKey="hbm" name="HBM" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={22} />
          <Bar dataKey="dram" name="AI 서버 DRAM" fill="#a78bfa" radius={[4, 4, 0, 0]} barSize={22} />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-2 space-y-1">
        {SUPPLIERS.map(s => (
          <div key={s.name} className="flex items-baseline gap-2 text-[11px]">
            <span className="font-medium text-zinc-600 w-16 shrink-0">{s.name}</span>
            <span className="font-mono text-zinc-500 shrink-0">HBM {fmt(s.hbm)} · DRAM {fmt(s.dram)}EB</span>
            <span className="text-zinc-400 truncate">{s.note}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── 6. 충격 시나리오 대응 매뉴얼 ─────────────────────────────────────────────
function ShockManual() {
  const [open, setOpen] = useState('capex')
  return (
    <Card title="충격 시나리오 대응 매뉴얼 (기준선 대비 연환산)" icon={AlertTriangle}
      sub="병목이 한 분기 이상 지속될 때의 영향과 대응 — 단기 이벤트는 지속일수 비례 축소">
      <div className="space-y-2">
        {SHOCK_SCENARIOS.map(s => {
          const b = s.bottleneck ? BOTTLENECKS.find(x => x.id === s.bottleneck) : null
          const isOpen = open === s.id
          return (
            <div key={s.id} className="border border-zinc-200 rounded-lg overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : s.id)}
                className="w-full flex items-center justify-between px-3 py-2 bg-zinc-50/60 hover:bg-zinc-50 text-left">
                <span className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: b?.color ?? '#71717a' }} />
                  {s.name}
                </span>
                <span className="font-mono text-[11px] font-semibold text-red-500">
                  HBM {fmt(s.impact.hbm)}EB ({s.impact.hbmPct}%) · DRAM {fmt(s.impact.dram)}EB
                </span>
              </button>
              {isOpen && (
                <div className="px-3 py-2.5 text-[11px] space-y-1.5 bg-white">
                  <p><span className="font-semibold text-zinc-500">트리거</span> <span className="text-zinc-600">{s.trigger}</span></p>
                  <p><span className="font-semibold text-red-500">즉시</span> <span className="text-zinc-600">{s.immediate}</span></p>
                  <p><span className="font-semibold text-amber-600">중기</span> <span className="text-zinc-600">{s.mid}</span></p>
                  <p><span className="font-semibold text-emerald-600">사전 대비</span> <span className="text-zinc-600">{s.prep}</span></p>
                  {s.impact.note && <p className="text-zinc-400">※ {s.impact.note}</p>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}

// ── 7. KPI 모니터링 설계 ─────────────────────────────────────────────────────
const PR_STYLE = {
  P1: { bg: 'rgba(14,165,233,0.12)', color: '#0284c7' },
  P2: { bg: 'rgba(245,158,11,0.12)', color: '#d97706' },
  P3: { bg: 'rgba(113,113,122,0.12)', color: '#71717a' },
}

function KpiDesign() {
  return (
    <Card title="병목별 KPI 모니터링 체계 (운영 설계)" icon={Radar}
      sub="P1 = 공식 원문·API 자동수집 / P2 = 이벤트성·부분 자동화 / P3 = 상용 리서치·추정. 공식 원문이 항상 1순위">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
        {BOTTLENECKS.map(b => {
          const Icon = ICONS[b.icon]
          return (
            <div key={b.id} className="border border-zinc-100 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 mb-2">
                <Icon size={13} style={{ color: b.color }} /> {b.name}
                <span className="ml-auto font-normal text-[10px] text-zinc-400">트리거: {b.trigger}</span>
              </div>
              <div className="space-y-1">
                {b.kpis.map((k, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="px-1 py-px rounded font-mono font-semibold text-[10px]"
                      style={{ backgroundColor: PR_STYLE[k.pr].bg, color: PR_STYLE[k.pr].color }}>{k.pr}</span>
                    <span className="text-zinc-600 flex-1">{k.name}</span>
                    <span className="text-zinc-400 shrink-0">{k.freq}</span>
                    <span className="text-zinc-300 shrink-0 hidden xl:inline">{k.src}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {/* 경보 5단계 */}
      <div className="flex flex-wrap gap-2 mb-3">
        {ALERT_BANDS.map((a, i) => {
          const prev = i === 0 ? 0 : ALERT_BANDS[i - 1].max
          return (
            <div key={a.key} className="flex-1 min-w-[150px] rounded-lg px-2.5 py-2 border"
              style={{ borderColor: `${a.color}55`, backgroundColor: `${a.color}0d` }}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold" style={{ color: a.color }}>{a.label}</span>
                <span className="font-mono text-[10px] text-zinc-400">{prev}~{Math.min(a.max, 100)}</span>
              </div>
              <div className="text-[10px] text-zinc-500 mt-0.5">{a.rule}</div>
            </div>
          )
        })}
      </div>
      <ul className="text-[11px] text-zinc-500 space-y-1 list-disc pl-4">
        {MONITORING_NOTES.map((n, i) => <li key={i}>{n}</li>)}
      </ul>
    </Card>
  )
}

// ── 페이지 ───────────────────────────────────────────────────────────────────
export default function BottleneckModel() {
  const worstShockByBottleneck = Object.fromEntries(
    SHOCK_SCENARIOS.filter(s => s.bottleneck).map(s => [s.bottleneck, s])
  )
  const maxB = BOTTLENECKS.reduce((a, b) => (b.currentIndex > a.currentIndex ? b : a), BOTTLENECKS[0])
  const maxBand = alertBand(maxB.currentIndex)
  const baseDem = memoryDemand(BASE_SERVERS, baseIntensity())

  return (
    <div className="space-y-5">
      {/* 헤더 스트립 */}
      <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div>
            <h2 className="text-base font-bold text-zinc-900">2030 병목 정량 모델 — 전력 · CAPEX/ROI · 선단 파운드리 · 첨단 패키징</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              2030 메모리 수요는 기술 상한이 아니라 <strong>배치 가능한 상한</strong>(돈·전기·웨이퍼·패키지 중 먼저 막히는 것)이 결정 —
              4대 병목의 min() 제약 모델. <span className="text-zinc-400">기준일 {MODEL_ASOF} · 운영 모형(공식 전망 아님)</span>
            </p>
            <SourceLink source="wiki/concepts/bottleneck-model-2030.md (전거: sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md · sources/papers/deep-research-bottleneck-monitoring-dashboard-design-2026-06.md)" />
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2 text-[11px]">
            <span className="px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 font-mono text-zinc-600">
              기준: 서버 {fmt(BASE_SERVERS, 0)}만 대 · HBM {fmt(baseDem.hbmEB)}/2.95EB · DRAM {fmt(baseDem.dramEB)}/3.30EB
            </span>
            <span className="px-2 py-1 rounded-md border font-semibold"
              style={{ backgroundColor: `${maxBand.color}12`, borderColor: `${maxBand.color}55`, color: maxBand.color }}>
              현재 최고 제약: {maxB.name} {maxB.currentIndex} ({maxBand.label})
            </span>
          </div>
        </div>
      </div>

      {/* 4대 병목 상태 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {BOTTLENECKS.map(b => (
          <BottleneckCard key={b.id} b={b} shock={worstShockByBottleneck[b.id]} />
        ))}
      </div>

      {/* What-if 시뮬레이터 */}
      <Simulator />

      {/* 분석 2열 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <SensitivityTornado />
        <GapMatrix />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <SupplierCapacity />
        <ShockManual />
      </div>

      {/* KPI 설계 */}
      <KpiDesign />
    </div>
  )
}
