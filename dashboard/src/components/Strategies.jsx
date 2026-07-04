import { useState } from 'react'
import { useHashSegment } from '../hooks/useHashRoute'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts'
import {
  LayoutDashboard, Shield, Target, ListChecks,
  Star, AlertTriangle, CheckCircle2, Clock, Sparkles, ChevronDown, ChevronUp,
  MapPin, ArrowRightLeft,
} from 'lucide-react'
import {
  STRATEGY_OVERVIEW, ROBUST_STRATEGIES, RS_SCENARIO_MATRIX,
  CORE_STRATEGIES, DECISIONS, DECISION_CLUSTERS, COMPETITIVE_LANDSCAPE,
} from '../data/strategies'
import {
  DT_SUMMARY, DT_EVENTS, DT_CONTRACT_STAGES, DT_SCA_COMPONENTS,
  DT_ROLE_SHIFT, DT_MODELING_NOTE, DT_RISKS, DT_BENEFITS, DT_AXES,
  DT_PHASES, DT_KPIS, DT_SCENARIO_LINKS,
} from '../data/devTransformation'
import SourceLink from './SourceLink'

const SUB_TABS = [
  { id: 'overview',    label: 'Overview',            icon: LayoutDashboard },
  { id: 'competitive', label: 'Competitive Landscape', icon: Target },
  { id: 'robust',      label: 'Robust Strategy',     icon: Shield },
  { id: 'core',        label: 'Core Strategy',       icon: Target },
  { id: 'transformation', label: '개발실 전환',       icon: ArrowRightLeft, isNew: true },
  { id: 'decisions',   label: 'Decisions',           icon: ListChecks },
]

const SCENARIO_META = {
  A: { color: '#1d4ed8', name: '황금 요새' },
  B: { color: '#059669', name: 'AI 르네상스' },
  C: { color: '#dc2626', name: '기술 냉전' },
  D: { color: '#d97706', name: '조용한 재편' },
  E: { color: '#7c3aed', name: '패러다임 전환' },
}

function Card({ title, source, children, className = '' }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 ${className}`}>
      {title && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
          <SourceLink source={source} />
        </div>
      )}
      {children}
    </div>
  )
}

const ACCENT = {
  green: 'border-emerald-300 bg-emerald-50 text-emerald-700',
  amber: 'border-amber-300 bg-amber-50 text-amber-700',
  red:   'border-red-300 bg-red-50 text-red-700',
  blue:  'border-sky-300 bg-sky-50 text-sky-700',
}

// Apple HIG pills for D-priority — tinted background + matching color
const PRIORITY_TAG = {
  critical: { cls: 'hig-pill hig-pill-red',    label: '최우선' },
  high:     { cls: 'hig-pill hig-pill-orange', label: '높음' },
  medium:   { cls: 'hig-pill hig-pill-blue',   label: '중간' },
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewPanel() {
  const o = STRATEGY_OVERVIEW
  return (
    <div className="space-y-4">
      <Card title="Executive Summary — 한 문장 요약" source="outputs/report/scenario-planning-report.md">
        <p className="text-sm text-zinc-800 leading-relaxed italic">
          "{o.oneLineSummary}"
        </p>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {o.keyNumbers.map((k, i) => (
          <div key={i} className={`border rounded-hig-lg shadow-hig-1 p-3 ${ACCENT[k.accent]}`}>
            <p className="text-[10px] opacity-70 leading-tight">{k.label}</p>
            <p className="text-xl font-bold font-mono mt-1">{k.value}</p>
            <p className="text-[10px] opacity-70 mt-0.5">{k.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Main Bet — 시나리오 B" source="outputs/report/scenario-planning-report.md">
          <div className="text-center mb-3">
            <div className="text-3xl font-bold text-emerald-600">{o.mainBet.scenario}</div>
            <div className="text-sm text-emerald-700 mt-1">확률 {o.mainBet.probability}</div>
          </div>
          <p className="text-xs text-zinc-700 leading-relaxed mb-3">{o.mainBet.rationale}</p>
          <div className="text-xs text-zinc-500 font-bold mb-1.5">필수 조건 — 동시 추진</div>
          <ul className="space-y-1">
            {o.mainBet.requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                <CheckCircle2 size={12} className="text-emerald-600 mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Robust 8개 전략 — 4축 구조" source="wiki/strategies/invariant/README.md">
          <div className="space-y-2">
            {o.roBustAxes.map((axis, i) => (
              <div
                key={i}
                className="border-l-4 pl-3 py-1.5"
                style={{ borderColor: axis.color }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-zinc-900">{axis.axis}</span>
                  <div className="flex gap-1">
                    {axis.members.map(m => (
                      <span
                        key={m}
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{ backgroundColor: `${axis.color}30`, color: axis.color }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-500 leading-snug">{axis.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPETITIVE LANDSCAPE — 5사 종합 비교 (신규)
// ─────────────────────────────────────────────────────────────────────────────
function CompetitivePanel() {
  const cl = COMPETITIVE_LANDSCAPE
  const tierColor = {
    leader:  'text-emerald-700 bg-emerald-50 border-emerald-200',
    mid:     'text-sky-700 bg-sky-50 border-sky-200',
    low:     'text-amber-700 bg-amber-50 border-amber-200',
    unknown: 'text-zinc-500 bg-zinc-50 border-zinc-200',
  }
  return (
    <div className="space-y-4">
      <Card title="5사 종합 비교 — Samsung은 어디에 서 있는가" source="wiki/entities/sk-hynix.md, wiki/entities/micron.md, wiki/entities/cxmt.md, wiki/entities/ymtc.md, wiki/concepts/dram-market-share.md">
        <p className="text-xs text-zinc-500 mb-3">
          삼성 / SK하이닉스 / Micron / CXMT / YMTC — 매출·영업이익률·CapEx·HBM 점유·미국 보조금·강점·갭 비교.
          Samsung 약점이 가장 두드러지는 4축은 아래 "핵심 비교 축"에서 별도 시각화.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 sticky left-0 bg-white">기업</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 min-w-[140px]">매출 (FY2025)</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 min-w-[150px]">영업이익률</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 min-w-[130px]">CapEx (2025~2026E)</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 min-w-[140px]">HBM 점유</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 min-w-[120px]">미국 보조금</th>
              </tr>
            </thead>
            <tbody>
              {cl.vendors.map((v, i) => (
                <tr key={i} className="border-b border-zinc-200/40">
                  <td className="py-2 pr-2 sticky left-0 bg-white">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{v.flag}</span>
                      <span className="text-xs font-bold" style={{ color: v.color }}>{v.name}</span>
                    </div>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="text-zinc-800 font-semibold">{v.revenue.fy2025}</div>
                    <div className="text-[10px] text-zinc-500">{v.revenue.growth}</div>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="text-zinc-800 font-semibold">{v.opMargin.value}</div>
                    <div className="text-[10px] text-zinc-500">{v.opMargin.note}</div>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="text-zinc-800 font-semibold">{v.capex.value}</div>
                    <div className="text-[10px] text-zinc-500">{v.capex.note}</div>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="text-zinc-800 font-semibold">{v.hbmShare}</div>
                    <div className="text-[10px] text-zinc-500">포지션: {v.hbmPosition}</div>
                  </td>
                  <td className="py-2 pr-2">
                    <div className="text-zinc-800 font-semibold">{v.usSubsidy.value}</div>
                    <div className="text-[10px] text-zinc-500">{v.usSubsidy.subtitle}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="핵심 비교 축 — Samsung 갭 4가지" source="자체 종합">
        <div className="space-y-3">
          {cl.comparisonAxes.map((axis, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-zinc-900">{axis.axis}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <div className={`px-3 py-1.5 rounded border ${tierColor[axis.samsung.tier]}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold">🇰🇷 Samsung</span>
                    <span className="text-xs font-mono">{axis.samsung.value}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {axis.others.map((o, j) => (
                    <div key={j} className={`px-3 py-1 rounded border ${tierColor[o.tier]}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold">{o.vendor}</span>
                        <span className="text-xs font-mono">{o.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-zinc-700 italic bg-amber-50 border border-amber-200 rounded px-2 py-1">
                <span className="text-amber-700 font-bold">시사점: </span>{axis.insight}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="강점·갭 매트릭스" source="자체 종합">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
          {cl.vendors.map((v, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 p-3 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{v.flag}</span>
                <span className="text-sm font-bold" style={{ color: v.color }}>{v.name}</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-bold mb-1">강점</div>
              <ul className="space-y-0.5 mb-2">
                {v.strengthAreas.map((s, j) => (
                  <li key={j} className="text-[11px] text-zinc-700 leading-tight">· {s}</li>
                ))}
              </ul>
              <div className="text-[10px] text-red-700 font-bold mb-1">갭</div>
              <ul className="space-y-0.5">
                {v.gapAreas.map((g, j) => (
                  <li key={j} className="text-[11px] text-zinc-700 leading-tight">· {g}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ROBUST STRATEGY
// ─────────────────────────────────────────────────────────────────────────────
function RobustStrategyPanel() {
  return (
    <div className="space-y-4">
      <Card title="9개 Robust 전략 — 시나리오 가치 매트릭스 (9 × 5 = 45 셀)" source="wiki/strategies/invariant/README.md">
        <p className="text-xs text-zinc-500 mb-3">
          전략별로 시나리오 A/B/C/D/E 각각에서 어떤 가치를 만드는가. 각 셀은 해당 시나리오에서 그 전략의 핵심 작동 방식.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 sticky left-0 bg-white">RS</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 min-w-[200px]">전략</th>
                {Object.entries(SCENARIO_META).map(([id, m]) => (
                  <th key={id} className="text-center font-medium pb-2 pr-2 text-zinc-700">
                    <div className="text-xs font-bold" style={{ color: m.color }}>{id}</div>
                    <div className="text-[10px] text-zinc-400 font-normal">{m.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RS_SCENARIO_MATRIX.map((row, i) => {
                const rs = ROBUST_STRATEGIES.find(r => r.id === row.id)
                return (
                  <tr key={i} className="border-b border-zinc-200/40 last:border-0">
                    <td className="py-2 pr-2 sticky left-0 bg-white">
                      <span
                        className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: `${rs.color}30`, color: rs.color }}
                      >
                        {row.id}
                      </span>
                    </td>
                    <td className="py-2 pr-2 text-zinc-800 font-semibold">
                      {row.title}
                      {rs.isNew && <span className="ml-1 text-[10px] text-amber-600">NEW</span>}
                    </td>
                    {row.cells.map((cell, j) => {
                      const m = SCENARIO_META[cell.scenario]
                      return (
                        <td
                          key={j}
                          className="py-2 pr-2 text-[11px] text-zinc-700"
                          style={{ backgroundColor: `${m.color}08` }}
                        >
                          {cell.value}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {ROBUST_STRATEGIES.map(rs => (
          <div
            key={rs.id}
            className="rounded-hig-lg shadow-hig-1 p-4 border bg-white"
            style={{ borderColor: `${rs.color}50` }}
          >
            <div className="flex items-start gap-2 mb-2">
              <span
                className="text-xs font-mono font-bold px-2 py-1 rounded shrink-0"
                style={{ backgroundColor: `${rs.color}30`, color: rs.color }}
              >
                {rs.id}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-zinc-900">{rs.title}</h4>
                  {rs.isNew && (
                    <span className="hig-pill hig-pill-orange text-[10px] font-bold">NEW</span>
                  )}
                </div>
                <span className="text-[10px] text-zinc-500">축: {rs.axis}</span>
              </div>
            </div>
            <p className="text-xs text-zinc-700 leading-relaxed mb-2 italic">"{rs.summary}"</p>
            <div className="text-[11px] text-zinc-500 space-y-1">
              <div><span className="text-zinc-500 font-bold">메커니즘: </span>{rs.mechanism}</div>
              <div><span className="text-zinc-500 font-bold">벤치마크: </span><span className="text-purple-700">{rs.benchmark}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE STRATEGY
// ─────────────────────────────────────────────────────────────────────────────
function CoreStrategyPanel() {
  const [openId, setOpenId] = useState(null)

  // Score chart data
  const allCore = [...CORE_STRATEGIES.mainBets, ...CORE_STRATEGIES.sideBets].filter(s => s.score != null)
  const sortedByScore = [...allCore].sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-4">
      <Card title="11개 핵심전략 점수 비교 (3축: 임팩트 × 창의성 × 모방난이도, 각 5점 만점 → 합산 15점)" source="wiki/scenarios/core-strategy-selection.md">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedByScore} layout="vertical" margin={{ left: 24, right: 16, top: 8 }}>
            <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 15]} tick={{ fill: '#71717a', fontSize: 11 }} />
            <YAxis
              type="category" dataKey="id"
              tick={{ fill: '#71717a', fontSize: 11 }}
              width={60}
            />
            <Tooltip
              cursor={{ fill: 'rgba(75,85,99,0.1)' }}
              contentStyle={{ background: '#ffffff', border: '1px solid #374151', borderRadius: 8, fontSize: 11, color: '#18181b' }}
            />
            <Bar dataKey="score" name="점수 (15점 만점)" radius={[0, 4, 4, 0]}>
              {sortedByScore.map((s, i) => {
                const isMain = CORE_STRATEGIES.mainBets.find(m => m.id === s.id)
                return <Cell key={i} fill={isMain ? '#10b981' : '#f59e0b'} />
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-3 mt-2 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500" /> 메인벳</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500" /> 사이드벳</span>
        </div>
      </Card>

      <Card title={`메인벳 ${CORE_STRATEGIES.mainBets.length}개 — 평상시 작동, 불변전략 기반 최적`}>
        <div className="space-y-2">
          {CORE_STRATEGIES.mainBets.map(s => {
            const isOpen = openId === s.id
            return (
              <div key={s.id} className="border border-emerald-200 bg-emerald-50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-emerald-50"
                >
                  <span className="hig-pill hig-pill-green text-[10px] font-mono shrink-0">{s.id}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-zinc-900">{s.title}</span>
                      {s.score != null && (
                        <span className="text-[10px] font-mono text-amber-600">★{s.score}/15</span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{s.coreOneLine}</p>
                  </div>
                  {isOpen ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                </button>
                {isOpen && (
                  <div className="border-t border-emerald-700/30 px-3 py-3 space-y-2">
                    <div className="text-xs">
                      <div className="text-zinc-500 font-semibold mb-1 flex items-center gap-1.5"><MapPin size={11} />현재 위치</div>
                      <div className="text-zinc-800 pl-2">{s.currentState}</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-emerald-600 font-semibold mb-1 flex items-center gap-1.5"><CheckCircle2 size={11} />강점</div>
                        <ul className="space-y-0.5 text-zinc-700 pl-2">
                          {s.strengths.map((x, i) => <li key={i}>· {x}</li>)}
                        </ul>
                      </div>
                      <div>
                        <div className="text-red-600 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle size={11} />갭</div>
                        <ul className="space-y-0.5 text-zinc-700 pl-2">
                          {s.gaps.map((x, i) => <li key={i}>· {x}</li>)}
                        </ul>
                      </div>
                    </div>
                    {s.target2030 && (
                      <div className="text-xs bg-sky-50 border border-sky-200 rounded px-2 py-1.5">
                        <span className="text-sky-600 font-semibold">2030 목표 — </span>
                        <span className="text-sky-800">{s.target2030}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <Card title={`사이드벳 ${CORE_STRATEGIES.sideBets.length}개 — 보완·헤지`}>
        <div className="space-y-2">
          {CORE_STRATEGIES.sideBets.map(s => {
            const isOpen = openId === s.id
            return (
              <div key={s.id} className="border border-amber-200 bg-amber-50 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  className="w-full text-left px-3 py-2.5 flex items-center gap-3 hover:bg-amber-50"
                >
                  <span className="hig-pill hig-pill-orange text-[10px] font-mono shrink-0">{s.id}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-zinc-900">{s.title}</span>
                      {s.score != null && (
                        <span className="text-[10px] font-mono text-amber-600">★{s.score}/15</span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-0.5 truncate">{s.coreOneLine}</p>
                  </div>
                  {isOpen ? <ChevronUp size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                </button>
                {isOpen && (
                  <div className="border-t border-amber-200 px-3 py-3 space-y-2 text-xs">
                    <div>
                      <div className="text-zinc-500 font-semibold mb-1 flex items-center gap-1.5"><MapPin size={11} />현재 위치</div>
                      <div className="text-zinc-800 pl-2">{s.currentState}</div>
                    </div>
                    <div>
                      <div className="text-purple-600 font-semibold mb-1 flex items-center gap-1.5"><Shield size={11} />헤지 시나리오</div>
                      <div className="text-purple-700 pl-2">{s.hedge}</div>
                    </div>
                    <div className="bg-sky-50 border border-sky-200 rounded px-2 py-1.5">
                      <span className="text-sky-600 font-semibold">목표 — </span>
                      <span className="text-sky-800">{s.target}</span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      <Card title="외부 가시성 회복 우선순위 — 7대 정보 공백" source="wiki/strategies/core/README.md">
        <p className="text-xs text-zinc-500 mb-3">외부 공개 자료가 부족해 신뢰 회복·시장 신호 발신을 위해 우선 공개해야 할 영역.</p>
        <div className="space-y-1.5">
          {CORE_STRATEGIES.infoGaps.map((g, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 px-3 rounded bg-zinc-50 border border-zinc-200">
              <span className="hig-pill hig-pill-red text-[10px] font-mono shrink-0">{g.id}</span>
              <span className="text-xs text-zinc-800 flex-1">{g.area}</span>
              <span className="text-[10px] font-mono text-amber-600 shrink-0">{g.timing}</span>
              <span className="text-[11px] text-zinc-500 hidden md:inline shrink-0">→ {g.action}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DEV-ORG TRANSFORMATION — 개발실 체질 전환 (LTA→SCA)
// ─────────────────────────────────────────────────────────────────────────────
function TransformationPanel() {
  return (
    <div className="space-y-4">
      <Card title="개발실 체질 전환 — 수주 이행자에서 기술 파트너로" source="wiki/strategies/dev-org-transformation.md">
        <p className="text-sm text-zinc-800 leading-relaxed italic mb-3">"{DT_SUMMARY.oneLine}"</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {DT_SUMMARY.keyNumbers.map((k, i) => (
            <div key={i} className={`border rounded-hig-lg shadow-hig-1 p-3 ${ACCENT[k.accent]}`}>
              <p className="text-[10px] opacity-70 leading-tight">{k.label}</p>
              <p className="text-xl font-bold font-mono mt-1">{k.value}</p>
              <p className="text-[10px] opacity-70 mt-0.5">{k.subtitle}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="왜 지금인가 — 체질 전환을 요구하는 사건의 누적" source="wiki/concepts/lta-to-sca-transition.md">
        <div className="space-y-1.5">
          {DT_EVENTS.map((e, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 py-2 px-3 rounded border ${
                e.hot ? 'bg-amber-50 border-amber-300' : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold shrink-0 mt-0.5 ${e.hot ? 'text-amber-700' : 'text-zinc-500'}`}>
                {e.date}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-900">{e.title}</span>
                  {e.hot && <span className="hig-pill hig-pill-orange text-[9px] font-bold">결정적 사건</span>}
                </div>
                <p className="text-[11px] text-zinc-600 leading-snug mt-0.5">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="계약 구조의 3단 진화 — 요구 역량의 이동" source="wiki/concepts/lta-to-sca-transition.md">
          <div className="space-y-2">
            {DT_CONTRACT_STAGES.map((s, i) => (
              <div key={i} className="border-l-4 pl-3 py-1.5" style={{ borderColor: s.color }}>
                <div className="text-sm font-bold" style={{ color: s.color }}>{s.stage}</div>
                <p className="text-[11px] text-zinc-600 leading-snug">{s.nature}</p>
                <p className="text-[11px] text-zinc-800 mt-0.5">
                  <span className="font-bold text-zinc-500">요구 역량: </span>{s.capability}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Micron ↔ Anthropic 계약 분해 (2026-06-22)" source="sources/articles/micron-anthropic-sca-2026-06-22.md">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left font-medium pb-1.5 text-zinc-500">구성요소</th>
                <th className="text-center font-medium pb-1.5 text-zinc-500 w-12">LTA</th>
                <th className="text-center font-medium pb-1.5 text-amber-600 w-12">SCA</th>
              </tr>
            </thead>
            <tbody>
              {DT_SCA_COMPONENTS.map((c, i) => (
                <tr key={i} className="border-b border-zinc-200/40 last:border-0">
                  <td className="py-2 pr-2">
                    <div className="font-bold text-zinc-900">{c.name}</div>
                    <div className="text-[10px] text-zinc-500 leading-snug">{c.desc}</div>
                  </td>
                  <td className="text-center font-bold text-zinc-400">{c.inLTA ? '✓' : '—'}</td>
                  <td className="text-center font-bold text-amber-600">{c.inSCA ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <Card title="개발실 역할의 재정의 — As-Is vs To-Be" source="wiki/strategies/dev-org-transformation.md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500 w-24">차원</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500">As-Is · 수주 이행자</th>
                <th className="text-left font-medium pb-2 text-sky-700">To-Be · 기술 파트너</th>
              </tr>
            </thead>
            <tbody>
              {DT_ROLE_SHIFT.map((r, i) => (
                <tr key={i} className="border-b border-zinc-200/40 last:border-0">
                  <td className="py-1.5 pr-2 font-bold text-zinc-800">{r.dim}</td>
                  <td className="py-1.5 pr-2 text-zinc-500">{r.asIs}</td>
                  <td className="py-1.5 text-zinc-900 font-medium">{r.toBe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-zinc-700 italic bg-amber-50 border border-amber-200 rounded px-2.5 py-1.5 mt-3 leading-relaxed">
          <span className="text-amber-700 font-bold not-italic">모델링 범위 확장이 결정적 — </span>
          {DT_MODELING_NOTE}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="전환 실패 시 리스크 — Do Nothing의 비용">
          <div className="space-y-2">
            {DT_RISKS.map(r => (
              <div key={r.id} className="border border-red-200 bg-red-50/60 rounded-lg p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold text-red-700">{r.id}</span>
                  <span className="text-xs font-bold text-zinc-900">{r.title}</span>
                </div>
                <p className="text-[11px] text-zinc-700 leading-snug">{r.desc}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card title="전환 성공 시 이점">
          <div className="space-y-2">
            {DT_BENEFITS.map(b => (
              <div key={b.id} className="border border-sky-200 bg-sky-50/60 rounded-lg p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono font-bold text-sky-700">{b.id}</span>
                  <span className="text-xs font-bold text-zinc-900">{b.title}</span>
                </div>
                <p className="text-[11px] text-zinc-700 leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="전환 전략 — 4대 축" source="wiki/strategies/dev-org-transformation.md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {DT_AXES.map((a, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 overflow-hidden bg-white">
              <div className="px-3 py-1.5 text-xs font-bold text-white" style={{ backgroundColor: a.color }}>
                축 {i + 1} · {a.axis}
              </div>
              <ul className="p-3 space-y-1.5">
                {a.items.map((it, j) => (
                  <li key={j} className="text-[11px] text-zinc-700 leading-snug">· {it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card title="3-Phase 액션 플랜" source="outputs/report/dev-org-transformation-report.md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {DT_PHASES.map((p, i) => (
            <div key={i} className="rounded-lg border border-zinc-200 bg-white overflow-hidden">
              <div className="px-3 py-1.5 flex items-center justify-between" style={{ backgroundColor: `${p.color}15` }}>
                <span className="text-xs font-bold" style={{ color: p.color }}>{p.phase}</span>
                <span className="text-[10px] font-bold text-zinc-500">{p.theme}</span>
              </div>
              <ul className="p-3 space-y-1.5">
                {p.actions.map((a, j) => (
                  <li key={j} className={`text-[11px] leading-snug ${a.startsWith('★') ? 'text-amber-700 font-bold' : 'text-zinc-700'}`}>
                    {a.startsWith('★') ? a : `· ${a}`}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200">
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500">KPI</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500">현재</th>
                <th className="text-left font-medium pb-2 pr-2 text-zinc-500">1년</th>
                <th className="text-left font-medium pb-2 text-zinc-500">3년</th>
              </tr>
            </thead>
            <tbody>
              {DT_KPIS.map((k, i) => (
                <tr key={i} className="border-b border-zinc-200/40 last:border-0">
                  <td className="py-1.5 pr-2 font-semibold text-zinc-800">{k.label}</td>
                  <td className="py-1.5 pr-2 text-zinc-500">{k.now}</td>
                  <td className="py-1.5 pr-2 text-zinc-800 font-mono">{k.y1}</td>
                  <td className="py-1.5 font-mono font-bold text-emerald-700">{k.y3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="시나리오 연결 — Robust 성격" source="wiki/strategies/dev-org-transformation.md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {DT_SCENARIO_LINKS.map((s, i) => {
            const m = SCENARIO_META[s.scenario]
            return (
              <div key={i} className="rounded-lg border p-2.5" style={{ borderColor: `${m.color}50`, backgroundColor: `${m.color}08` }}>
                <div className="text-xs font-bold mb-1" style={{ color: m.color }}>{s.scenario} · {m.name}</div>
                <p className="text-[10px] text-zinc-700 leading-snug">{s.note}</p>
              </div>
            )
          })}
        </div>
        <p className="text-[11px] text-zinc-500 mt-3">
          연결 전략: MB-4(커스텀 AI 메모리)의 조직적 전제조건 · RS-3(전환비용) · RS-7(AI 자동화) · RS-8(구조화 매출) · RS-9(수요 센싱)의 개발실 실행 계층
        </p>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// DECISIONS
// ─────────────────────────────────────────────────────────────────────────────
function DecisionsPanel() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="text-center">
          <Sparkles size={20} className="inline text-amber-600 mr-2" />
          <span className="text-sm text-zinc-800">
            {DECISIONS.length}개 결정은 <span className="text-amber-700 font-bold">단일 결정으로 분리하면 효과가 사라진다</span>
            — 묶음으로 처리해야 한다.
          </span>
        </div>
      </Card>

      {DECISION_CLUSTERS.map(cluster => {
        const items = DECISIONS.filter(d => d.cluster === cluster.cluster)
        return (
          <div key={cluster.cluster} className={`border rounded-hig-lg shadow-hig-1 p-4 ${cluster.bgClass}`}>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} style={{ color: cluster.color }} />
              <h3 className="text-sm font-bold text-zinc-900">{cluster.label}</h3>
              <span className="text-xs text-zinc-500">— {cluster.subtitle}</span>
              <span className="ml-auto text-xs text-zinc-500">총 {items.length}개</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {items.map(d => {
                const tag = PRIORITY_TAG[d.priority]
                return (
                  <div key={d.id} className="bg-white/95 border border-zinc-200 rounded-lg p-3">
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 shrink-0">{d.id}</span>
                      <h4 className="text-sm font-semibold text-zinc-900 flex-1">{d.title}</h4>
                      {d.isNew && (
                        <span className="hig-pill hig-pill-orange text-[9px] font-bold shrink-0">NEW</span>
                      )}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded shrink-0 ${tag.cls}`}>{tag.label}</span>
                    </div>
                    <div className="text-[10px] font-mono text-amber-700 mb-2">⏰ {d.deadline}</div>
                    <p className="text-[11px] text-zinc-700 leading-relaxed mb-2">{d.summary}</p>
                    {d.contingency && d.contingency !== '—' && (
                      <div className="text-[11px] text-zinc-500 bg-red-50/70 border border-red-200 rounded px-2 py-1 mb-1.5">
                        <AlertTriangle size={10} className="inline text-red-600 mr-1" />
                        <span className="text-red-700 font-bold">비상: </span>
                        {d.contingency}
                      </div>
                    )}
                    {d.relatedRS && d.relatedRS.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {d.relatedRS.map(rs => (
                          <span key={rs} className="text-[9px] px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 font-mono">{rs}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function Strategies() {
  const [tab, setTab] = useHashSegment(1, 'overview', SUB_TABS.map(t => t.id))

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
              {t.isNew && <span className="hig-pill hig-pill-orange text-[9px] font-bold ml-1">NEW</span>}
            </button>
          )
        })}
      </div>

      {tab === 'overview'       && <OverviewPanel />}
      {tab === 'competitive'    && <CompetitivePanel />}
      {tab === 'robust'         && <RobustStrategyPanel />}
      {tab === 'core'           && <CoreStrategyPanel />}
      {tab === 'transformation' && <TransformationPanel />}
      {tab === 'decisions'      && <DecisionsPanel />}
    </div>
  )
}
