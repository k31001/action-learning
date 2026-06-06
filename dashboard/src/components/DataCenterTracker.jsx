import { useState, useMemo } from 'react'
import {
  BarChart, Bar, LineChart, ComposedChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList,
} from 'recharts'
import { Server, Zap, Globe, Cpu, Layers, AlertTriangle, MapPin, Building2, Scale } from 'lucide-react'
import SourceLink from './SourceLink'
import WorldMap from './WorldMap'
import {
  DATA_CENTERS, DC_STAGES, DC_BOTTLENECK_STAGES, DC_CONVERSION, DC_ANCHORS,
  REGION_ORDER, REGION_LABEL, REGION_COLOR,
  aggByStage, aggByCountry, aggByRegion, forecastByYear, pipelineSummary, capacityByOperatorYear,
} from '../data/dataCenters'

const AXIS = { tick: { fill: '#71717a', fontSize: 11 }, axisLine: { stroke: '#e4e4e7' }, tickLine: { stroke: '#e4e4e7' } }
const GRID = { stroke: '#e4e4e7', strokeDasharray: '3 3' }
const WIKI_SRC = 'wiki/concepts/ai-datacenter-buildout.md'
const COLOR_AMBER = '#f59e0b'

// 신뢰도 마커
const CONF = {
  confirmed: { dot: '●', cls: 'text-emerald-500', label: '확인' },
  estimate:  { dot: '◐', cls: 'text-amber-500',   label: '추정' },
  disputed:  { dot: '○', cls: 'text-red-400',     label: '논란' },
}

function Card({ title, source, children, className = '', right = null }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
          {source && <SourceLink source={source} />}
        </div>
        {right}
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

// 9단계 진행 바 (현 단계까지 채움)
function StageBar({ stage }) {
  return (
    <div className="flex gap-px" title={`단계 ${stage}/9`}>
      {DC_STAGES.map(s => (
        <span
          key={s.id}
          className="h-2 flex-1 rounded-sm"
          style={{ background: s.id <= stage ? s.color : '#e4e4e7' }}
        />
      ))}
    </div>
  )
}

export default function DataCenterPanel() {
  const [region, setRegion] = useState('all')
  const [sortKey, setSortKey] = useState('mw')
  const [selectedId, setSelectedId] = useState(null)

  // 지도 마커 클릭 → 상세 표의 해당 행으로 스크롤 + 하이라이트
  // (행 DOM 은 항상 존재하므로 동기 호출 — rAF 불필요)
  const handleSelectDc = (id) => {
    setSelectedId(id)
    document.getElementById(`dc-row-${id}`)?.scrollIntoView({ block: 'center' })
  }

  const dcs = useMemo(
    () => (region === 'all' ? DATA_CENTERS : DATA_CENTERS.filter(d => d.region === region)),
    [region]
  )

  const summary   = useMemo(() => pipelineSummary(dcs), [dcs])
  const stageAgg  = useMemo(() => aggByStage(dcs), [dcs])
  const regionAgg = useMemo(() => aggByRegion(DATA_CENTERS), [])  // 권역 파이는 항상 전체 기준
  const countryAgg = useMemo(() => aggByCountry(dcs), [dcs])
  const forecast  = useMemo(() => forecastByYear(dcs), [dcs])
  const operatorSeries = useMemo(() => capacityByOperatorYear(dcs), [dcs])

  const topPower = useMemo(
    () => [...dcs].sort((a, b) => b.mw - a.mw).slice(0, 15).map(d => ({ name: d.name, mw: d.mw, region: d.region })),
    [dcs]
  )

  const sortedTable = useMemo(() => {
    const arr = [...dcs]
    if (sortKey === 'mw')     arr.sort((a, b) => b.mw - a.mw)
    if (sortKey === 'stage')  arr.sort((a, b) => b.stage - a.stage || b.mw - a.mw)
    if (sortKey === 'online') arr.sort((a, b) => a.online - b.online || b.mw - a.mw)
    return arr
  }, [dcs, sortKey])

  const REGION_TABS = [{ id: 'all', label: '전체' }, ...REGION_ORDER.map(r => ({ id: r, label: REGION_LABEL[r] }))]

  const kpis = [
    { label: '추적 프로젝트', value: summary.count, suffix: '개', accent: 'blue' },
    { label: '추적 국가',     value: summary.countries, suffix: '개국', accent: 'blue' },
    { label: '총 계획 용량',  value: summary.totalGw, suffix: 'GW', accent: 'green' },
    { label: '가동중 용량',   value: summary.operationalGw, suffix: 'GW', accent: 'green' },
    { label: '함의 HBM (설치기반)', value: summary.hbmExaBase, suffix: 'EB', accent: 'amber', sub: `~${summary.hbmExaUltra} EB (GB300)` },
    { label: '함의 HBM 금액',  value: `$${summary.hbmUsdBBase}B`, suffix: '', accent: 'amber', sub: `~$${summary.hbmUsdBUltra}B (GB300)` },
  ]
  const accentCls = {
    green: 'text-emerald-700 border-emerald-300 bg-emerald-50',
    blue:  'text-sky-700 border-sky-300 bg-sky-50',
    amber: 'text-amber-700 border-amber-300 bg-amber-50',
    red:   'text-red-700 border-red-300 bg-red-50',
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ── 인트로 ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 rounded-hig-lg border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-4">
        <div className="flex items-center gap-2 mb-1">
          <Server size={16} className="text-sky-600" />
          <h2 className="text-sm font-bold text-zinc-800">AI 데이터센터 착공 트래커 — 메모리 수요 선행 지표</h2>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed">
          AI 데이터센터 건설은 메모리(HBM/DRAM) 수요의 <strong>6~24개월 선행 신호</strong>다.
          부지 확보→인허가→골조→전력→<strong>IT 장비 설치(GPU+HBM 투입)</strong>→가동의 9단계 중
          전 세계 주요 프로젝트가 지금 어느 단계에 있는지 한눈에 모니터링하고, 그 파이프라인이 함의하는 메모리 수요를 추정한다.
        </p>
        <p className="text-[10px] text-zinc-400 mt-1">
          ※ &gt;200MW·&gt;$1B급 대형 프로젝트 표본 ({DATA_CENTERS.length}건) — 전수 조사가 아닌 방향성 지표. 출처: <code>{WIKI_SRC}</code>
        </p>
      </div>

      {/* ── 권역 필터 ────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 flex items-center gap-1.5 flex-wrap">
        <span className="text-xs text-zinc-500 mr-1">권역:</span>
        {REGION_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setRegion(t.id)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              region === t.id
                ? 'bg-zinc-800 text-white border-zinc-800'
                : 'bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── KPI ─────────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {kpis.map((k, i) => (
          <div key={i} className={`border rounded-hig-lg shadow-hig-1 p-3 ${accentCls[k.accent]}`}>
            <p className="text-[10px] opacity-70 leading-tight">{k.label}</p>
            <p className="text-xl font-bold font-mono mt-1">
              {typeof k.value === 'number' ? k.value.toLocaleString('ko-KR') : k.value}
              {k.suffix && <span className="text-xs font-semibold ml-0.5">{k.suffix}</span>}
            </p>
            {k.sub && <p className="text-[9px] opacity-60 mt-0.5">{k.sub}</p>}
          </div>
        ))}
      </div>

      {/* ── 세계 지도 (HERO) ─────────────────────────────────────────────────── */}
      <Card
        title="글로벌 분포 — 세계 지도로 한눈에"
        source={`${WIKI_SRC}`}
        className="lg:col-span-2"
        right={<MapPin size={14} className="text-zinc-400" />}
      >
        <WorldMap dcs={dcs} onSelect={handleSelectDc} selectedId={selectedId} />
      </Card>

      {/* ── 단계 파이프라인 보드 (HERO) ─────────────────────────────────────── */}
      <Card
        title="라이프사이클 단계별 현황 (한눈에 보기)"
        source={`${WIKI_SRC} · Global Data Center Hub, Epoch AI`}
        className="lg:col-span-2"
        right={
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            {Object.entries(CONF).map(([k, v]) => (
              <span key={k} className="flex items-center gap-0.5"><span className={v.cls}>{v.dot}</span>{v.label}</span>
            ))}
            <span className="flex items-center gap-0.5 text-red-500"><AlertTriangle size={10} />병목</span>
          </div>
        }
      >
        <div className="flex gap-2 overflow-x-auto pb-2">
          {stageAgg.map(s => (
            <div key={s.id} className="flex-shrink-0 w-[150px]">
              <div className="rounded-t-md px-2 py-1.5 text-white" style={{ background: s.color }}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold">{s.id}. {s.label}</span>
                  {DC_BOTTLENECK_STAGES.includes(s.id) && <AlertTriangle size={11} className="opacity-90" />}
                </div>
                <div className="text-[9px] opacity-90 font-mono mt-0.5">{s.gw.toFixed(1)}GW · {s.count}건</div>
              </div>
              <div className="border border-t-0 border-zinc-200 rounded-b-md bg-zinc-50/50 p-1 space-y-1 h-[260px] overflow-y-auto">
                {[...DATA_CENTERS.filter(d => d.stage === s.id && (region === 'all' || d.region === region))]
                  .sort((a, b) => b.mw - a.mw)
                  .map(d => (
                    <div
                      key={d.id}
                      className="rounded bg-white border border-zinc-200 px-1.5 py-1 hover:shadow-sm transition-shadow"
                      style={{ borderLeft: `3px solid ${REGION_COLOR[d.region]}` }}
                      title={`${d.operator} · ${d.city}\n${d.status}${d.note ? '\n— ' + d.note : ''}`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-semibold text-zinc-700 truncate leading-tight">{d.name}</span>
                        <span className={`text-[9px] shrink-0 ${CONF[d.conf].cls}`}>{CONF[d.conf].dot}</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] text-zinc-400 font-mono mt-0.5">
                        <span>{d.country}</span>
                        <span className="font-bold text-zinc-500">{d.mw.toLocaleString()}MW</span>
                      </div>
                    </div>
                  ))}
                {s.count === 0 && (
                  <div className="text-[9px] text-zinc-300 text-center pt-4">—</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-500 mt-2 flex items-start gap-1">
          <AlertTriangle size={11} className="text-red-400 shrink-0 mt-0.5" />
          병목 단계(②인허가·전력계약, ⑤전력 인프라, ⑦IT 장비 설치)가 "발표 용량 → 실제 가동(메모리 소비)" 전환 속도를 좌우.
          변압기 리드타임 ~3~4년, 美 계통접속 중앙값 ~5년, HBM은 CY2026까지 sold-out.
        </p>
      </Card>

      {/* ── 단계별 용량 분포 (막대) ──────────────────────────────────────────── */}
      <Card title="단계별 계획 용량 분포" source={`${WIKI_SRC}`}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stageAgg} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="short" {...AXIS} interval={0} angle={-30} textAnchor="end" height={50} />
            <YAxis {...AXIS} unit="GW" />
            <Tooltip content={<VizTooltip unit="GW" />} cursor={{ fill: 'rgba(75,85,99,0.08)' }} />
            <Bar dataKey="gw" name="계획 용량" radius={[4, 4, 0, 0]}>
              {stageAgg.map((s, i) => <Cell key={i} fill={s.color} />)}
              <LabelList dataKey="count" position="top" style={{ fontSize: 9, fill: '#a1a1aa' }} formatter={(v) => v ? `${v}건` : ''} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* ── 권역별 분포 (도넛) ───────────────────────────────────────────────── */}
      <Card title="권역별 용량 분포" source={`${WIKI_SRC}`} right={<Globe size={14} className="text-zinc-400" />}>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={regionAgg} dataKey="gw" nameKey="label" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
              {regionAgg.map((r, i) => <Cell key={i} fill={r.color} />)}
            </Pie>
            <Tooltip content={<VizTooltip unit="GW" />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* ── 국가별 용량 (막대) ───────────────────────────────────────────────── */}
      <Card title="국가별 계획 용량 (상위)" source={`${WIKI_SRC}`} className="lg:col-span-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={countryAgg.slice(0, 12)} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="country" {...AXIS} interval={0} />
            <YAxis {...AXIS} unit="GW" />
            <Tooltip content={<VizTooltip unit="GW" />} cursor={{ fill: 'rgba(75,85,99,0.08)' }} />
            <Bar dataKey="gw" name="계획 용량" radius={[4, 4, 0, 0]}>
              {countryAgg.slice(0, 12).map((c, i) => <Cell key={i} fill={REGION_COLOR[c.region]} />)}
              <LabelList dataKey="count" position="top" style={{ fontSize: 9, fill: '#a1a1aa' }} formatter={(v) => `${v}건`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* ── 전력 규모 상위 프로젝트 ──────────────────────────────────────────── */}
      <Card title="전력 규모 상위 프로젝트 (MW)" source={`${WIKI_SRC}`} className="lg:col-span-2" right={<Zap size={14} className="text-zinc-400" />}>
        <ResponsiveContainer width="100%" height={Math.max(260, topPower.length * 26)}>
          <BarChart data={topPower} layout="vertical" margin={{ left: 8, right: 32, top: 4 }}>
            <CartesianGrid {...GRID} horizontal={false} />
            <XAxis type="number" {...AXIS} unit="MW" />
            <YAxis type="category" dataKey="name" {...AXIS} width={150} tick={{ fill: '#52525b', fontSize: 10 }} />
            <Tooltip content={<VizTooltip unit="MW" />} cursor={{ fill: 'rgba(75,85,99,0.08)' }} />
            <Bar dataKey="mw" name="계획 전력" radius={[0, 4, 4, 0]}>
              {topPower.map((d, i) => <Cell key={i} fill={REGION_COLOR[d.region]} />)}
              <LabelList dataKey="mw" position="right" style={{ fontSize: 9, fill: '#71717a' }} formatter={(v) => v.toLocaleString()} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* ── 운영사별 연도 누적 용량 ──────────────────────────────────────────── */}
      <Card
        title="주요 운영사별 연도별 누적 데이터센터 용량"
        source={`${WIKI_SRC}`}
        className="lg:col-span-2"
        right={<Building2 size={14} className="text-zinc-400" />}
      >
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={operatorSeries.data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis {...AXIS} unit="GW" />
            <Tooltip content={<VizTooltip unit="GW" />} cursor={{ stroke: '#e4e4e7' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            {operatorSeries.groups.map(g => (
              <Line
                key={g.key}
                dataKey={g.key}
                name={g.key}
                stroke={g.color}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
          가로축 연도 · 세로축 해당 운영사 누적 보유 용량(GW, 1차 가동 연도 기준 누적). 상위 {operatorSeries.groups.length}개 운영사 — 추적 용량의 ~{operatorSeries.coverage}%.
          <br />
          <span className="text-zinc-400">
            ※ 조인트·콜로 프로젝트는 주요 AI 앵커/소유주로 단일 귀속 (Stargate 컨소시엄→OpenAI/Stargate, Nscale 앵커→Microsoft, SK·HUMAIN 조인트의 AWS 몫→Amazon 등). 지역/소형·논란(전남 등) 프로젝트는 차트에서 제외 — 전체는 지도·표 참조.
          </span>
        </p>
      </Card>

      {/* ── 메모리 수요 예측 ─────────────────────────────────────────────────── */}
      <Card
        title="함의 메모리 수요 예측 (1차 가동 연도 기준)"
        source={`${WIKI_SRC} · NVIDIA·HPE 스펙, TrendForce·Morgan Stanley 환산`}
        className="lg:col-span-2"
        right={<Cpu size={14} className="text-zinc-400" />}
      >
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={forecast} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid {...GRID} />
            <XAxis dataKey="year" {...AXIS} />
            <YAxis yAxisId="left" {...AXIS} unit="GW" />
            <YAxis yAxisId="right" orientation="right" {...AXIS} unit="EB" />
            <Tooltip content={<VizTooltip />} cursor={{ fill: 'rgba(75,85,99,0.08)' }} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#71717a' }} />
            <Bar yAxisId="left" dataKey="cumGw" name="누적 가동 용량 (GW)" fill={REGION_COLOR['North America']} radius={[4, 4, 0, 0]} barSize={36} />
            <Line yAxisId="right" dataKey={(d) => +(d.hbmPbBase / 1000).toFixed(2)} name="누적 HBM 설치기반 (EB, Blackwell)" stroke={COLOR_AMBER} strokeWidth={2.5} dot={{ r: 4 }} />
            <Line yAxisId="right" dataKey={(d) => +(d.hbmPbUltra / 1000).toFixed(2)} name="누적 HBM (EB, GB300)" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>

        {/* 연간 증분 HBM 수요 + 앵커 비교 */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-2">
          {forecast.map((f) => (
            <div key={f.year} className="rounded-md border border-zinc-200 bg-zinc-50 p-2">
              <div className="text-[10px] text-zinc-500">{f.year} 신규 가동</div>
              <div className="text-sm font-bold font-mono text-zinc-700">{f.newGw} GW</div>
              <div className="text-[10px] text-amber-600 font-mono mt-0.5">→ 함의 HBM ${f.hbmUsdBNewBase}B</div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-zinc-500 mt-2 leading-relaxed">
          <strong>환산 모델</strong>: 1GW(시설) ÷ PUE {DC_CONVERSION.pue} → {DC_CONVERSION.gpuPerGw.toLocaleString()} GPU
          (132kW/72-GPU 랙) × {DC_CONVERSION.hbmGbPerGpuBlackwell}GB(Blackwell)~{DC_CONVERSION.hbmGbPerGpuUltra}GB(GB300) HBM
          → ≈ 90~135 PB HBM/GW · ${(DC_CONVERSION.hbmGbPerGpuBlackwell * DC_CONVERSION.gpuPerGw * DC_CONVERSION.hbmUsdPerGb / 1e9).toFixed(1)}B HBM/GW.
          <br />
          <span className="text-zinc-400">
            ※ 누적 = 설치 기반(1회성 충전). 연간 신규 GW × ~$1.35B/GW = 해당 연도 증분 HBM 수요 (상단 추정). 비교 앵커: 2026 HBM TAM ~${DC_ANCHORS.hbmTam2026B}B (Goldman), HBM bit 수요 +{DC_ANCHORS.hbmBitGrowth2026}% YoY, AI가 DRAM 웨이퍼 ~{DC_ANCHORS.aiDramWaferShare2026}% 소비 (TrendForce).
            대형 프로젝트는 다단계 확장이며 1차 주요 가동 연도에 전체 계획 용량을 귀속(보수적 상단).
          </span>
        </p>
      </Card>

      {/* ── 외부 전망 벤치마크 — Bain & Company (신문섭) ───────────────────────── */}
      <Card
        title="외부 전망 벤치마크 — Bain & Company (신문섭 파트너)"
        source="wiki/concepts/ai-compute-economics-gap.md · Bain 6th Global Tech Report · AI Ripple Effect (2026-03)"
        className="lg:col-span-2"
        right={<Scale size={14} className="text-zinc-400" />}
      >
        <p className="text-xs text-zinc-600 leading-relaxed mb-3">
          Bain APAC 하드웨어·반도체·데이터센터 총괄 <strong>신문섭</strong> 파트너 도메인의 top-down 전망 —
          위 착공 트래커(추적 표본 {summary.totalGw}GW)를 시장 전체와 비교하는 외부 앵커.
          <strong> AI 컴퓨트 경제학 갭</strong>: 2030년 수요 충족에 연 ${DC_ANCHORS.bainDcCapexB2030}B capex가 필요하나,
          이를 <em>수익성 있게</em> 회수하려면 신규 매출 ${DC_ANCHORS.bainRevenueNeedT2030}조/년이 필요 → 연 ${DC_ANCHORS.bainFundingGapB2030}B 자금 갭.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { label: '글로벌 DC 용량 (2030)', value: DC_ANCHORS.bainGlobalDcGw2030, unit: 'GW', sub: '현재 ~2배 · 북미 ~50%', tone: 'blue' },
            { label: '글로벌 컴퓨트 (2030)', value: DC_ANCHORS.bainComputeGw2030, unit: 'GW', sub: '무어의 법칙 2배 속도', tone: 'blue' },
            { label: '연간 DC capex (2030)', value: `$${DC_ANCHORS.bainDcCapexB2030}B`, unit: '', sub: '수요 충족 설비투자', tone: 'blue' },
            { label: '필요 신규 매출', value: `$${DC_ANCHORS.bainRevenueNeedT2030}조`, unit: '', sub: '수익성 충당 조건', tone: 'amber' },
            { label: '연간 자금 갭', value: `$${DC_ANCHORS.bainFundingGapB2030}B`, unit: '', sub: 'IT전액+절감20% 후 잔존', tone: 'red' },
            { label: '메모리=AI 지출', value: DC_ANCHORS.bainMemoryPctAiSpend2026, unit: '%', sub: `2026 (vs ${DC_ANCHORS.bainMemoryPctAiSpendBase}% '23~24)`, tone: 'amber' },
          ].map((t, i) => (
            <div key={i} className={`border rounded-hig-lg shadow-hig-1 p-2.5 ${accentCls[t.tone]}`}>
              <p className="text-[10px] opacity-70 leading-tight">{t.label}</p>
              <p className="text-lg font-bold font-mono mt-0.5">
                {typeof t.value === 'number' ? t.value.toLocaleString('ko-KR') : t.value}
                {t.unit && <span className="text-xs font-semibold ml-0.5">{t.unit}</span>}
              </p>
              <p className="text-[9px] opacity-60 mt-0.5">{t.sub}</p>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-zinc-500 mt-3 leading-relaxed">
          <strong>Scramble → Strategy</strong>: 하이퍼스케일러가 "원시적 확장"에서 <strong>규율 있는·전력 인식형(power-aware) 성장</strong>(자본 효율)으로 전환.
          <strong> 전력 접근성이 GPU·건설을 넘어선 1순위 게이트키퍼</strong>(behind-the-meter 가스·태양광·원전). 추론(inference)이 워크로드 무게중심.
          4대 병목: 전력(신규 발전 4년+)·건설 서비스·컴퓨트 인에이블러(GPU)·DC 장비(스위치기어·냉각).
          <br />
          <span className="text-zinc-400">
            ※ 추적 표본({summary.totalGw}GW)은 대형(&gt;200MW) 프로젝트 일부 — Bain 163GW(2030 글로벌 전수 수요)는 상한 벤치마크.
            메모리 비중 {DC_ANCHORS.bainMemoryPctAiSpendBase}%→{DC_ANCHORS.bainMemoryPctAiSpend2026}%는 HBM 슈퍼사이클의 수요 측 정당화.
            "The AI Ripple Effect"(2026-03)는 신문섭 공동저자.
          </span>
        </p>
      </Card>

      {/* ── 프로젝트 상세 테이블 ─────────────────────────────────────────────── */}
      <Card
        title={`프로젝트 상세 (${sortedTable.length}건)`}
        source={`${WIKI_SRC}`}
        className="lg:col-span-2"
        right={
          <div className="flex items-center gap-1 text-[10px]">
            <span className="text-zinc-400">정렬:</span>
            {[{ k: 'mw', l: '용량' }, { k: 'stage', l: '단계' }, { k: 'online', l: '가동연도' }].map(o => (
              <button
                key={o.k}
                onClick={() => setSortKey(o.k)}
                className={`px-2 py-0.5 rounded ${sortKey === o.k ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
              >{o.l}</button>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-zinc-200">
                <th className="py-1.5 pr-2 font-medium">프로젝트</th>
                <th className="py-1.5 px-2 font-medium">운영사</th>
                <th className="py-1.5 px-2 font-medium">국가</th>
                <th className="py-1.5 px-2 font-medium text-right">용량</th>
                <th className="py-1.5 px-2 font-medium">칩</th>
                <th className="py-1.5 px-2 font-medium w-[160px]">단계</th>
                <th className="py-1.5 px-2 font-medium text-center">가동</th>
                <th className="py-1.5 pl-2 font-medium">상태</th>
              </tr>
            </thead>
            <tbody>
              {sortedTable.map(d => (
                <tr
                  key={d.id}
                  id={`dc-row-${d.id}`}
                  onClick={() => setSelectedId(d.id)}
                  className={`border-b border-zinc-100 scroll-mt-24 transition-colors ${
                    d.id === selectedId ? 'bg-sky-100/80' : 'hover:bg-zinc-50/60'
                  }`}
                >
                  <td className="py-1.5 pr-2">
                    <span className="font-semibold text-zinc-700" style={{ borderLeft: `3px solid ${REGION_COLOR[d.region]}`, paddingLeft: 6 }}>
                      {d.name} <span className={`${CONF[d.conf].cls}`} title={CONF[d.conf].label}>{CONF[d.conf].dot}</span>
                    </span>
                  </td>
                  <td className="py-1.5 px-2 text-zinc-500">{d.operator}</td>
                  <td className="py-1.5 px-2 text-zinc-600">{d.country}</td>
                  <td className="py-1.5 px-2 text-right font-mono font-semibold text-zinc-700">{d.mw.toLocaleString()}<span className="text-[9px] text-zinc-400">MW</span></td>
                  <td className="py-1.5 px-2 text-zinc-500 font-mono text-[10px]">{d.chip}</td>
                  <td className="py-1.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono text-zinc-400 w-6">{d.stage}/9</span>
                      <div className="flex-1"><StageBar stage={d.stage} /></div>
                    </div>
                    <span className="text-[9px] text-zinc-400">{DC_STAGES[d.stage - 1].label}</span>
                  </td>
                  <td className="py-1.5 px-2 text-center font-mono text-zinc-500">{d.online}</td>
                  <td className="py-1.5 pl-2 text-zinc-500 text-[10px] max-w-[200px]">{d.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── 방법론 / 한계 ────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 rounded-hig-lg border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Layers size={14} className="text-zinc-500" />
          <h3 className="text-xs font-semibold text-zinc-700">방법론 · 데이터 한계</h3>
        </div>
        <ul className="text-[11px] text-zinc-600 space-y-1 list-disc pl-4 leading-relaxed">
          <li><strong>표본</strong>: &gt;200MW 또는 &gt;$1B급 대형 프로젝트 {DATA_CENTERS.length}건. 전수 조사가 아니므로 절대값보다 <strong>추세·구성·단계 분포</strong>를 해석.</li>
          <li><strong>용량(MW)</strong>은 완공(full buildout) 기준 계획치. 다단계 프로젝트는 1차 가동 연도에 전체 용량을 귀속(연간 곡선은 보수적 상단).</li>
          <li><strong>중국</strong> 프로젝트는 MW·capex 비공개가 많아 추정(◐)·논란(○)으로 표기. <strong>전남 3GW</strong>는 개발사 주장(○).</li>
          <li><strong>메모리 환산</strong>은 Blackwell(192GB)~GB300(288GB) HBM 기준 단일 가정. 커스텀 실리콘(Trainium·TPU)도 표준 AI 가속기 등가로 환산.</li>
          <li><strong>병목</strong>(②인허가·전력, ⑤변압기·전력 인프라, ⑦GPU/HBM 할당)이 발표 용량의 실제 가동 전환을 지연 — 메모리 수요 타이밍의 핵심 변수.</li>
        </ul>
      </div>
    </div>
  )
}
