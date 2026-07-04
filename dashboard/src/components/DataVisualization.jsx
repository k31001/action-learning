import { useHashSegment } from '../hooks/useHashRoute'
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, ComposedChart,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import { Users, Globe, TrendingUp, Shield, Cpu, AlertTriangle, Server } from 'lucide-react'
import {
  COMPETITOR_DATA, MACRO_DATA, MARKET_DATA, POLICY_DATA, TECHNOLOGY_DATA, VIZ_COLORS,
} from '../data/visualizations'
import SourceLink from './SourceLink'
import DataCenterPanel from './DataCenterTracker'

// 수요 EWI 서브탭은 2026-06-11 Bottleneck Model 탭으로 이동 (병목 모델과 통합)
const SUB_TABS = [
  { id: 'datacenter', label: 'AI DC',      icon: Server },
  { id: 'competitor', label: 'Competitor', icon: Users },
  { id: 'macro',      label: 'Macro',      icon: Globe },
  { id: 'market',     label: 'Market',     icon: TrendingUp },
  { id: 'policy',     label: 'Policy',     icon: Shield },
  { id: 'technology', label: 'Technology', icon: Cpu },
]

// ── 공통 카드 + 툴팁 ────────────────────────────────────────────────────────
function ChartCard({ title, source, children, className = '' }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 ${className}`}>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
        <SourceLink source={source} />
      </div>
      {children}
    </div>
  )
}

function VizTooltip({ active, payload, label, unit }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-100 border border-zinc-300 rounded-lg p-2.5 text-xs shadow-xl">
      <div className="text-zinc-700 font-medium mb-1.5">{label}</div>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span style={{ color: p.color }}>●</span>
          <span className="text-zinc-500">{p.name}:</span>
          <span className="font-mono font-bold" style={{ color: p.color }}>
            {typeof p.value === 'number' ? p.value.toLocaleString('ko-KR', { maximumFractionDigits: 1 }) : p.value}
            {unit ? ` ${unit}` : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

const AXIS = { tick: { fill: '#71717a', fontSize: 11 }, axisLine: { stroke: '#e4e4e7' }, tickLine: { stroke: '#e4e4e7' } }
const GRID = { stroke: '#e4e4e7', strokeDasharray: '3 3' }

// ─────────────────────────────────────────────────────────────────────────────
// COMPETITOR
// ─────────────────────────────────────────────────────────────────────────────
function CompetitorPanel() {
  const c = COMPETITOR_DATA
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title={c.skHynixAnnual.title} source={c.skHynixAnnual.source}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={c.skHynixAnnual.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} unit="₩T" />
            <YAxis yAxisId="right" orientation="right" {...AXIS} unit="%" />
            <Tooltip content={<VizTooltip unit="조원" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left" dataKey="revenue" name="매출" fill={VIZ_COLORS.skhynix} radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="opIncome" name="영업이익" fill={VIZ_COLORS.amber} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" dataKey="opMargin" name="영업이익률 (%)" stroke={VIZ_COLORS.green} strokeWidth={2} dot={{ r: 4, fill: VIZ_COLORS.green }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={c.skHynixQuarterly.title} source={c.skHynixQuarterly.source}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={c.skHynixQuarterly.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="quarter" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} unit="₩T" />
            <YAxis yAxisId="right" orientation="right" {...AXIS} unit="%" />
            <Tooltip content={<VizTooltip />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left" dataKey="revenue" name="분기 매출 (조원)" fill={VIZ_COLORS.skhynix} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" dataKey="yoyGrowth" name="YoY 성장 (%)" stroke={VIZ_COLORS.amber} strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={c.hbmShareTrend.title} source={c.hbmShareTrend.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={c.hbmShareTrend.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="period" {...AXIS} />
            <YAxis {...AXIS} unit="%" domain={[0, 70]} />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ stroke: '#e4e4e7' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Line dataKey="skhynix" name="SK하이닉스" stroke={VIZ_COLORS.skhynix} strokeWidth={2.5} dot={{ r: 5 }} />
            <Line dataKey="samsung" name="삼성전자"   stroke={VIZ_COLORS.samsung} strokeWidth={2.5} dot={{ r: 5 }} />
            <Line dataKey="micron"  name="마이크론"   stroke={VIZ_COLORS.micron}  strokeWidth={2.5} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── 신규 (2026-05-07): DRAM 점유율 (3강 + CXMT) ──────────────────────── */}
      <ChartCard title={c.dramMarketShare.title} source={c.dramMarketShare.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={c.dramMarketShare.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="period" {...AXIS} />
            <YAxis {...AXIS} unit="%" domain={[0, 50]} />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ stroke: '#e4e4e7' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Line dataKey="samsung" name="삼성전자"   stroke={VIZ_COLORS.samsung} strokeWidth={2.5} dot={{ r: 5 }} />
            <Line dataKey="skhynix" name="SK하이닉스" stroke={VIZ_COLORS.skhynix} strokeWidth={2.5} dot={{ r: 5 }} />
            <Line dataKey="micron"  name="마이크론"   stroke={VIZ_COLORS.micron}  strokeWidth={2.5} dot={{ r: 5 }} />
            <Line dataKey="cxmt"    name="CXMT"       stroke={VIZ_COLORS.red}     strokeWidth={2.5} strokeDasharray="4 3" dot={{ r: 5 }} />
            <ReferenceLine x="Q1 2025" stroke="#6b7280" strokeDasharray="4 3" label={{ value: '33년 만의 1위 교체', fill: '#71717a', fontSize: 10 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── 신규: Micron 매출 + HBM + DC 비중 ──────────────────────────────── */}
      <ChartCard title={c.micronAnnual.title} source={c.micronAnnual.source}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={c.micronAnnual.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} unit="$B" />
            <YAxis yAxisId="right" orientation="right" {...AXIS} unit="%" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left" dataKey="revenue" name="총 매출" fill={VIZ_COLORS.micron} radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="hbm" name="HBM 매출" fill={VIZ_COLORS.amber} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" dataKey="dcShare" name="DC 매출 비중 (%)" stroke={VIZ_COLORS.green} strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── 신규: CXMT/YMTC 점유율 성장 ───────────────────────────────────────── */}
      <ChartCard title={c.chinaCompetitorShare.title} source={c.chinaCompetitorShare.source}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={c.chinaCompetitorShare.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="%" domain={[0, 25]} />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ stroke: '#e4e4e7' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Line dataKey="cxmtDram" name="CXMT (DRAM)" stroke={VIZ_COLORS.red}    strokeWidth={2.5} dot={{ r: 5 }} />
            <Line dataKey="ymtcNand" name="YMTC (NAND)" stroke={VIZ_COLORS.purple} strokeWidth={2.5} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── 신규: 4사 CapEx 비교 ──────────────────────────────────────────────── */}
      <ChartCard title={c.capexComparison.title} source={c.capexComparison.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={c.capexComparison.data} layout="vertical" margin={{ left: 24, right: 16, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis type="number" {...AXIS} unit="$B" />
            <YAxis type="category" dataKey="vendor" {...AXIS} width={140} />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="capex" name="CapEx 2025 ($B)" radius={[0, 4, 4, 0]}>
              {c.capexComparison.data.map((d, i) => {
                const colors = [VIZ_COLORS.samsung, VIZ_COLORS.skhynix, VIZ_COLORS.micron, VIZ_COLORS.red, VIZ_COLORS.purple]
                return <Cell key={i} fill={colors[i]} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4">
        <h3 className="text-sm font-semibold text-zinc-800 mb-3">{c.milestones.title}</h3>
        <div className="space-y-2">
          {c.milestones.items.map((m, i) => (
            <div key={i} className="flex items-start gap-3 py-2 px-3 rounded bg-zinc-50 border border-zinc-200">
              <span className="text-xs font-mono text-amber-600 shrink-0 mt-0.5">{m.date}</span>
              <span className="text-xs px-2 py-0.5 rounded shrink-0 bg-zinc-200 text-zinc-700">{m.actor}</span>
              <span className="text-xs text-zinc-700">{m.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MACRO
// ─────────────────────────────────────────────────────────────────────────────
function MacroPanel() {
  const m = MACRO_DATA
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title={m.bigTechCapex.title} source={m.bigTechCapex.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={m.bigTechCapex.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="$B" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar dataKey="alphabet"  name="Alphabet"  stackId="a" fill={VIZ_COLORS.alphabet}  />
            <Bar dataKey="amazon"    name="Amazon"    stackId="a" fill={VIZ_COLORS.amazon}    />
            <Bar dataKey="microsoft" name="Microsoft" stackId="a" fill={VIZ_COLORS.microsoft} />
            <Bar dataKey="meta"      name="Meta"      stackId="a" fill={VIZ_COLORS.meta}      radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.capexGrowth.title} source={m.capexGrowth.source}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={m.capexGrowth.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} unit="$B" />
            <YAxis yAxisId="right" orientation="right" {...AXIS} unit="%" />
            <Tooltip content={<VizTooltip />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left" dataKey="total" name="합계 ($B)" fill={VIZ_COLORS.primary} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" dataKey="yoyGrowth" name="YoY 성장 (%)" stroke={VIZ_COLORS.amber} strokeWidth={2} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.aiInfraShare.title} source={m.aiInfraShare.source}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={m.aiInfraShare.data}
              dataKey="value" nameKey="name"
              cx="50%" cy="50%" outerRadius={90}
              label={({ name, value }) => `${name}: $${value}B`}
              labelLine={{ stroke: '#a1a1aa' }}
            >
              {m.aiInfraShare.data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<VizTooltip unit="$B" />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.cloudGrowthQ1_2026.title} source={m.cloudGrowthQ1_2026.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={m.cloudGrowthQ1_2026.data} layout="vertical" margin={{ left: 24, right: 16, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis type="number" {...AXIS} unit="%" />
            <YAxis type="category" dataKey="provider" {...AXIS} width={120} />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="yoyGrowth" name="YoY 성장률" fill={VIZ_COLORS.green} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {m.warnings.map((w, i) => {
          const cls = w.severity === 'critical'
            ? 'border-red-300 bg-red-50 text-red-700'
            : 'border-amber-300 bg-yellow-50 text-yellow-700'
          return (
            <div key={i} className={`border rounded-hig-lg shadow-hig-1 p-3 ${cls}`}>
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle size={14} />
                <span className="text-sm font-semibold">{w.title}</span>
              </div>
              <p className="text-xs opacity-80">{w.detail}</p>
            </div>
          )
        })}
      </div>

      {/* ── 신규 (2026-05-07): 중국 빅펀드 누적 ──────────────────────────── */}
      <ChartCard title={m.chinaBigFund.title} source={m.chinaBigFund.source}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={m.chinaBigFund.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="phase" {...AXIS} fontSize={9} />
            <YAxis {...AXIS} unit="$B" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="size" name="펀드 규모 ($B)" fill={VIZ_COLORS.red} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-500 mt-2">
          빅펀드 III ($47B, 2024-03 설립) — 첨단공정·메모리 자립에 집중. 지방정부 직접 지원 (안후이성·후베이성) 별도.
        </p>
      </ChartCard>

      {/* ── 신규: AI DC 전력 폭증 ──────────────────────────────────────────── */}
      <ChartCard title={m.dcPowerConsumption.title} source={m.dcPowerConsumption.source}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={m.dcPowerConsumption.data} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="dcPowerArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VIZ_COLORS.amber} stopOpacity={0.5} />
                <stop offset="95%" stopColor={VIZ_COLORS.amber} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="TWh" />
            <Tooltip content={<VizTooltip unit="TWh" />} cursor={{ stroke: '#e4e4e7' }} />
            <Area dataKey="twh" name="전력 소비 (TWh)" stroke={VIZ_COLORS.amber} strokeWidth={2.5} fill="url(#dcPowerArea)" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-500 mt-2">
          빅테크 SMR 계약 (MS 2GW, Amazon 5GW) — 단기는 천연가스, 상용화는 2030년 이후.
        </p>
      </ChartCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKET
// ─────────────────────────────────────────────────────────────────────────────
function MarketPanel() {
  const m = MARKET_DATA
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {m.kpis.map((k, i) => {
          const accent = {
            green: 'text-emerald-700 border-emerald-300 bg-emerald-50',
            blue:  'text-sky-700 border-sky-300 bg-sky-50',
            amber: 'text-amber-700 border-amber-300 bg-amber-50',
            red:   'text-red-700 border-red-300 bg-red-50',
          }[k.accent]
          return (
            <div key={i} className={`border rounded-hig-lg shadow-hig-1 p-3 ${accent}`}>
              <p className="text-[10px] opacity-70 leading-tight">{k.label}</p>
              <p className="text-xl font-bold font-mono mt-1">{k.value}</p>
            </div>
          )
        })}
      </div>

      <ChartCard title={m.hbmMarketSize.title} source={m.hbmMarketSize.source}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={m.hbmMarketSize.data} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="hbmArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VIZ_COLORS.primary} stopOpacity={0.5} />
                <stop offset="95%" stopColor={VIZ_COLORS.primary} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="$B" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ stroke: '#e4e4e7' }} />
            <Area dataKey="size" name="HBM 시장규모" stroke={VIZ_COLORS.primary} strokeWidth={2.5} fill="url(#hbmArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.hbmDemandGrowth.title} source={m.hbmDemandGrowth.source}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={m.hbmDemandGrowth.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="%" />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="growth" name="YoY 성장률" fill={VIZ_COLORS.green} radius={[4, 4, 0, 0]} />
            <ReferenceLine y={100} stroke="#6b7280" strokeDasharray="4 3" label={{ value: '+100%', fill: '#71717a', fontSize: 10 }} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.hbmGenerationMix.title} source={m.hbmGenerationMix.source}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={m.hbmGenerationMix.data}
              dataKey="value" nameKey="name"
              cx="50%" cy="50%" innerRadius={50} outerRadius={90}
              label={({ name, value, price }) => `${name} ${value}% ($${price})`}
              labelLine={{ stroke: '#a1a1aa' }}
            >
              {m.hbmGenerationMix.data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<VizTooltip unit="%" />} />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.hbmDramRatio.title} source={m.hbmDramRatio.source}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={m.hbmDramRatio.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="%" domain={[0, 100]} />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar dataKey="hbm" name="HBM" stackId="a" fill={VIZ_COLORS.primary} />
            <Bar dataKey="etc" name="기타 DRAM" stackId="a" fill={VIZ_COLORS.gray} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={m.aiServerMarket.title} source={m.aiServerMarket.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={m.aiServerMarket.data} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="aiServerArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VIZ_COLORS.purple} stopOpacity={0.5} />
                <stop offset="95%" stopColor={VIZ_COLORS.purple} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="$B" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ stroke: '#e4e4e7' }} />
            <Area dataKey="size" name="AI 서버 시장" stroke={VIZ_COLORS.purple} strokeWidth={2.5} fill="url(#aiServerArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── 신규 (2026-05-07): SSD / UFS 시장 차트 4종 ────────────────────── */}
      <ChartCard title={m.enterpriseSsdMarket.title} source={m.enterpriseSsdMarket.source}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={m.enterpriseSsdMarket.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="$B" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar dataKey="global" name="글로벌 매출" fill={VIZ_COLORS.cyan}  radius={[4, 4, 0, 0]} />
            <Bar dataKey="naDc"   name="북미 DC SSD"  fill={VIZ_COLORS.green} radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-500 mt-2">
          하이퍼스케일러가 매출 60% 기여. PCIe Gen6 2026 진입, Gen7 2027~2028.
        </p>
      </ChartCard>

      <ChartCard title={m.aiSsdIopsRace.title} source={m.aiSsdIopsRace.source}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={m.aiSsdIopsRace.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="period" {...AXIS} fontSize={9} />
            <YAxis {...AXIS} unit="M IOPS" />
            <Tooltip content={<VizTooltip unit="M IOPS" />} cursor={{ stroke: '#e4e4e7' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Line dataKey="micron"  name="Micron"     stroke={VIZ_COLORS.micron}  strokeWidth={2.5} dot={{ r: 5 }} connectNulls />
            <Line dataKey="skhynix" name="SK하이닉스"   stroke={VIZ_COLORS.skhynix} strokeWidth={2.5} dot={{ r: 5 }} connectNulls />
            <Line dataKey="kioxia"  name="Kioxia"     stroke={VIZ_COLORS.purple}  strokeWidth={2.5} dot={{ r: 5 }} connectNulls />
            <Line dataKey="samsung" name="삼성전자"     stroke={VIZ_COLORS.samsung} strokeWidth={2.5} strokeDasharray="4 3" dot={{ r: 5 }} connectNulls />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-amber-600 mt-2">
          ⚠️ Samsung SLC AI SSD 로드맵 미공개 — 2027 SK·Kioxia 1억 IOPS 도달 전 RS-3 SCADA 트랙 결정 필요
        </p>
      </ChartCard>

      <ChartCard title={m.mobileMemoryPrice.title} source={m.mobileMemoryPrice.source}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={m.mobileMemoryPrice.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="period" {...AXIS} />
            <YAxis {...AXIS} unit="%" />
            <Tooltip content={<VizTooltip unit="% YoY" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar dataKey="ufs"   name="UFS 4.1 1TB"     fill={VIZ_COLORS.cyan} radius={[4, 4, 0, 0]} />
            <Bar dataKey="lpddr" name="LPDDR5X 16GB"   fill={VIZ_COLORS.amber} radius={[4, 4, 0, 0]} />
            <ReferenceLine y={50} stroke="#6b7280" strokeDasharray="4 3" label={{ value: '+50%', fill: '#71717a', fontSize: 10 }} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-500 mt-2">
          AI 메모리 부족이 모바일로 전이 → 플래그십 표준 16GB+1TB. 2026 Q4 capex 가동으로 완화 예상.
        </p>
      </ChartCard>

      <ChartCard title={m.nandDcShare.title} source={m.nandDcShare.source}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={m.nandDcShare.data} layout="vertical" margin={{ left: 24, right: 16, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis type="number" {...AXIS} unit="%" domain={[0, 70]} />
            <YAxis type="category" dataKey="vendor" {...AXIS} width={140} fontSize={9} />
            <Tooltip content={<VizTooltip unit="%" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="dcShare" name="DC 매출 비중 (%)" radius={[0, 4, 4, 0]}>
              {m.nandDcShare.data.map((d, i) => (
                <Cell key={i} fill={d.dcShare ? VIZ_COLORS.green : VIZ_COLORS.gray} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-amber-600 mt-2">
          ⚠️ Samsung NAND DC 매출 비중 비공개 — Micron 56% 대비 외부 평가 불리. SD-1 패턴 NAND 확장 검토 가치
        </p>
      </ChartCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// POLICY
// ─────────────────────────────────────────────────────────────────────────────
function PolicyPanel() {
  const p = POLICY_DATA
  const impactColor = {
    critical: '#ef4444',
    high:     '#f59e0b',
    medium:   '#3b82f6',
    low:      '#52525b',
  }
  const categoryColor = {
    제재: 'bg-red-100 text-red-700 border-red-200',
    완화: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    연장: 'bg-sky-100 text-sky-700 border-sky-200',
    확대: 'bg-purple-100 text-purple-700 border-purple-200',
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title={p.exportControlTimeline.title} source={p.exportControlTimeline.source} className="lg:col-span-2">
        <div className="relative">
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-zinc-200" />
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
            {p.exportControlTimeline.data.map((e, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xs font-mono text-zinc-500 w-20 shrink-0 text-right pt-1.5">{e.date}</span>
                <span
                  className="w-3 h-3 rounded-full shrink-0 mt-2 ring-2 ring-gray-900"
                  style={{ backgroundColor: impactColor[e.impact] }}
                />
                <div className="flex-1 py-1 px-3 rounded-lg bg-zinc-50 border border-zinc-200">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm text-zinc-800">{e.event}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${categoryColor[e.category] ?? ''}`}>
                      {e.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-3 text-xs text-zinc-500">
            {Object.entries(impactColor).map(([k, v]) => (
              <span key={k} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: v }} /> {k}
              </span>
            ))}
          </div>
        </div>
      </ChartCard>

      <ChartCard title={p.entityListGrowth.title} source={p.entityListGrowth.source}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={p.entityListGrowth.data} margin={{ left: 0, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="entityArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={VIZ_COLORS.red} stopOpacity={0.5} />
                <stop offset="95%" stopColor={VIZ_COLORS.red} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="period" {...AXIS} />
            <YAxis {...AXIS} unit="개" />
            <Tooltip content={<VizTooltip unit="기업" />} />
            <Area dataKey="cumulative" name="누적 기업 수" stroke={VIZ_COLORS.red} strokeWidth={2.5} fill="url(#entityArea)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={p.policyImpactMatrix.title} source={p.policyImpactMatrix.source}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={p.policyImpactMatrix.data} layout="vertical" margin={{ left: 24, right: 16, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis type="number" {...AXIS} domain={[0, 100]} unit="" />
            <YAxis type="category" dataKey="policy" {...AXIS} width={170} fontSize={10} />
            <Tooltip content={<VizTooltip unit="/100" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="impactLevel" name="영향도" radius={[0, 4, 4, 0]}>
              {p.policyImpactMatrix.data.map((d, i) => (
                <Cell key={i} fill={impactColor[d.urgency]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── 신규 (2026-05-07): CHIPS Act 보조금 비교 ──────────────────────── */}
      <ChartCard title={p.chipsActSubsidies.title} source={p.chipsActSubsidies.source}>
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={p.chipsActSubsidies.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="vendor" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} unit="$B" />
            <YAxis yAxisId="right" orientation="right" {...AXIS} unit="$B" />
            <Tooltip content={<VizTooltip unit="$B" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left" dataKey="subsidy" name="직접 보조금" fill={VIZ_COLORS.green} radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="investment" name="총 투자 ($B)" fill={VIZ_COLORS.gray} radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-amber-600 mt-2">
          ⚠️ Samsung 3위 — 초기 $6.4B → $4.745B로 $1.655B 감액. D8 (2단계 추가 협상) 2026 Q4 마감.
        </p>
      </ChartCard>

      {/* ── 신규: Samsung Taylor 팹 타임라인 ────────────────────────────────── */}
      <ChartCard title={p.taylorTimeline.title} source={p.taylorTimeline.source} className="lg:col-span-2">
        <div className="relative">
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-zinc-200" />
          <div className="space-y-2">
            {p.taylorTimeline.items.map((e, i) => {
              const statusColor = {
                complete:    'bg-emerald-500',
                'in-progress': 'bg-amber-500',
                upcoming:    'bg-zinc-400',
              }[e.status]
              const statusLabel = {
                complete:    { label: '완료', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
                'in-progress': { label: '진행중', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
                upcoming:    { label: '예정', cls: 'bg-zinc-100 text-zinc-700 border-zinc-200' },
              }[e.status]
              return (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xs font-mono text-zinc-500 w-20 shrink-0 text-right pt-1.5">{e.date}</span>
                  <span className={`w-3 h-3 rounded-full shrink-0 mt-2 ring-2 ring-gray-900 ${statusColor}`} />
                  <div className="flex-1 py-1 px-3 rounded-lg bg-zinc-50 border border-zinc-200">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-zinc-800">{e.event}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border shrink-0 ${statusLabel.cls}`}>
                        {statusLabel.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </ChartCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TECHNOLOGY
// ─────────────────────────────────────────────────────────────────────────────
function TechnologyPanel() {
  const t = TECHNOLOGY_DATA
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard title={t.hbmGenerationSpec.title} source={t.hbmGenerationSpec.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={t.hbmGenerationSpec.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="gen" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} />
            <YAxis yAxisId="right" orientation="right" {...AXIS} />
            <Tooltip content={<VizTooltip />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left"  dataKey="bandwidth" name="대역폭 (GB/s)" fill={VIZ_COLORS.primary} radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="capacity"  name="용량 (GB)"     fill={VIZ_COLORS.amber}   radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={t.pinSpeedEvolution.title} source={t.pinSpeedEvolution.source}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={t.pinSpeedEvolution.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="gen" {...AXIS} />
            <YAxis {...AXIS} unit="Gbps" />
            <Tooltip content={<VizTooltip unit="Gbps" />} cursor={{ stroke: '#e4e4e7' }} />
            <Line dataKey="speed" name="핀 속도" stroke={VIZ_COLORS.purple} strokeWidth={2.5} dot={{ r: 5, fill: VIZ_COLORS.purple }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={t.nandProcessTransition.title} source={t.nandProcessTransition.source}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={t.nandProcessTransition.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="L" />
            <Tooltip content={<VizTooltip unit="layers" />} cursor={{ stroke: '#e4e4e7' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Line dataKey="samsung" name="삼성"   stroke={VIZ_COLORS.samsung} strokeWidth={2} dot={{ r: 4 }} />
            <Line dataKey="skhynix" name="SK"     stroke={VIZ_COLORS.skhynix} strokeWidth={2} dot={{ r: 4 }} />
            <Line dataKey="micron"  name="마이크론" stroke={VIZ_COLORS.micron}  strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title={t.hbm4Roadmap.title} source={t.hbm4Roadmap.source} className="lg:col-span-2">
        <div className="space-y-3">
          {t.hbm4Roadmap.data.map((c, i) => {
            const statusBadge = {
              'first-mover':  { label: '선도', cls: 'bg-emerald-100 text-emerald-700' },
              'fast-follow':  { label: '추격', cls: 'bg-amber-100 text-amber-700' },
              'follower':     { label: '후발', cls: 'bg-zinc-200 text-zinc-500' },
            }[c.status]
            return (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-zinc-50 border border-zinc-200">
                <span className="text-sm font-semibold text-zinc-800 w-24 shrink-0">{c.company}</span>
                <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${statusBadge.cls}`}>{statusBadge.label}</span>
                <div className="flex-1 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500">샘플: </span>
                    <span className="font-mono text-zinc-700">{c.sample}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">양산: </span>
                    <span className="font-mono text-amber-700 font-semibold">{c.massProd}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ChartCard>

      <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4">
        <h3 className="text-sm font-semibold text-zinc-800 mb-3">핵심 기술 마일스톤</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {t.techMilestones.map((m, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 py-2 px-3 rounded-lg border ${
                m.impact === 'risk'
                  ? 'border-red-200 bg-red-50'
                  : 'border-emerald-200 bg-emerald-50'
              }`}
            >
              <span className={`text-xs font-mono px-2 py-0.5 rounded shrink-0 ${
                m.impact === 'risk' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {m.tech}
              </span>
              <span className="text-xs text-zinc-700">{m.milestone}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 신규 (2026-05-07): NVIDIA AI 스토리지 계층 G1~G4 ──────────────── */}
      <ChartCard title={t.nvidiaStorageStack.title} source={t.nvidiaStorageStack.source} className="lg:col-span-2">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-3 text-zinc-500">계층</th>
                <th className="text-left font-medium pb-2 pr-3 text-zinc-500">미디어</th>
                <th className="text-left font-medium pb-2 pr-3 text-zinc-500">지연</th>
                <th className="text-left font-medium pb-2 pr-3 text-zinc-500">역할</th>
                <th className="text-left font-medium pb-2 pr-3 text-zinc-500">Samsung 포지션</th>
              </tr>
            </thead>
            <tbody>
              {t.nvidiaStorageStack.items.map((row, i) => {
                const isNew = row.tier === 'G3.5'
                return (
                  <tr key={i} className={`border-b border-zinc-200/40 ${isNew ? 'bg-amber-50' : ''}`}>
                    <td className="py-2 pr-3">
                      <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${isNew ? 'bg-amber-200 text-amber-900' : 'bg-zinc-200 text-zinc-700'}`}>
                        {row.tier}{isNew && ' NEW'}
                      </span>
                    </td>
                    <td className="py-2 pr-3 text-zinc-800 font-semibold">{row.media}</td>
                    <td className="py-2 pr-3 text-zinc-500 font-mono">{row.latency}</td>
                    <td className="py-2 pr-3 text-zinc-700">{row.role}</td>
                    <td className="py-2 pr-3 text-zinc-700">{row.samsungPosition}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-zinc-500 mt-3">
          CMX(G3.5)는 이더넷(Spectrum-X, RDMA)으로 연결된 외부 NVMe SSD 어레이를 GPU 클러스터 전체가 공유하는 KV 캐시로 활용. PM1753 공식 공급 ✅
        </p>
      </ChartCard>

      {/* ── 신규: NVIDIA AI SSD 파트너십 매트릭스 ─────────────────────────── */}
      <ChartCard title={t.aiSsdPartners.title} source={t.aiSsdPartners.source} className="lg:col-span-2">
        <div className="space-y-2">
          {t.aiSsdPartners.items.map((row, i) => {
            const statusBadge = {
              leader:        { label: '리더', cls: 'bg-emerald-100 text-emerald-700' },
              'fast-follow': { label: '추격', cls: 'bg-amber-100 text-amber-700' },
              follower:      { label: '후행', cls: 'bg-red-100 text-red-700' },
            }[row.status]
            return (
              <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-zinc-50 border border-zinc-200">
                <span className="text-sm font-semibold text-zinc-800 w-24 shrink-0">{row.vendor}</span>
                <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${statusBadge.cls}`}>{statusBadge.label}</span>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-zinc-500">파트너십: </span>
                    <span className="text-zinc-700">{row.partnership}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">NAND: </span>
                    <span className="font-mono text-zinc-700">{row.nandType}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">IOPS: </span>
                    <span className="font-mono text-amber-700 font-semibold">{row.iops}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">시점: </span>
                    <span className="text-zinc-700">{row.timing}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ChartCard>

      {/* ── 신규: PCIe 세대 진화 ────────────────────────────────────────────── */}
      <ChartCard title={t.pcieGenEvolution.title} source={t.pcieGenEvolution.source} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={240}>
          <ComposedChart data={t.pcieGenEvolution.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="gen" {...AXIS} />
            <YAxis {...AXIS} unit="GB/s" />
            <Tooltip content={<VizTooltip unit="GB/s" />} cursor={{ fill: 'rgba(75,85,99,0.1)' }} />
            <Bar dataKey="bandwidth" name="단일 레인 대역폭 (GB/s)" fill={VIZ_COLORS.cyan} radius={[4, 4, 0, 0]} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-500 mt-2">
          Gen5 양산 주력 → Gen6 2026 진입 (PAM-4 시그널링) → Gen7 2027~2028 (1억 IOPS 목표)
        </p>
      </ChartCard>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function DataVisualization() {
  const [tab, setTab] = useHashSegment(1, 'datacenter', SUB_TABS.map(t => t.id))

  return (
    <div>
      <div className="flex items-center gap-1 mb-4 border-b border-zinc-200">
        {SUB_TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-sky-500 text-zinc-900 bg-white/80'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50/60'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'datacenter' && <DataCenterPanel />}
      {tab === 'competitor' && <CompetitorPanel />}
      {tab === 'macro'      && <MacroPanel />}
      {tab === 'market'     && <MarketPanel />}
      {tab === 'policy'     && <PolicyPanel />}
      {tab === 'technology' && <TechnologyPanel />}
    </div>
  )
}
