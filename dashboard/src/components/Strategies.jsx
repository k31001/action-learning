import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts'
import {
  LayoutDashboard, Shield, Target, ListChecks,
  Star, AlertTriangle, CheckCircle2, Clock, Sparkles, ChevronDown, ChevronUp,
  MapPin,
} from 'lucide-react'
import {
  STRATEGY_OVERVIEW, ROBUST_STRATEGIES, RS_SCENARIO_MATRIX,
  CORE_STRATEGIES, DECISIONS, DECISION_CLUSTERS,
} from '../data/strategies'
import SourceLink from './SourceLink'

const SUB_TABS = [
  { id: 'overview',  label: 'Overview',         icon: LayoutDashboard },
  { id: 'robust',    label: 'Robust Strategy',  icon: Shield },
  { id: 'core',      label: 'Core Strategy',    icon: Target },
  { id: 'decisions', label: 'Decisions',        icon: ListChecks },
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
    <div className={`bg-white border border-zinc-200 rounded-xl p-4 ${className}`}>
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

const PRIORITY_TAG = {
  critical: { cls: 'bg-red-100 text-red-700',     label: '최우선' },
  high:     { cls: 'bg-amber-100 text-amber-700', label: '높음' },
  medium:   { cls: 'bg-sky-100 text-sky-700',   label: '중간' },
}

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW
// ─────────────────────────────────────────────────────────────────────────────
function OverviewPanel() {
  const o = STRATEGY_OVERVIEW
  return (
    <div className="space-y-4">
      <Card title="Executive Summary — 한 문장 요약" source="report/scenario-planning-report.md">
        <p className="text-sm text-zinc-800 leading-relaxed italic">
          "{o.oneLineSummary}"
        </p>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {o.keyNumbers.map((k, i) => (
          <div key={i} className={`border rounded-xl p-3 ${ACCENT[k.accent]}`}>
            <p className="text-[10px] opacity-70 leading-tight">{k.label}</p>
            <p className="text-xl font-bold font-mono mt-1">{k.value}</p>
            <p className="text-[10px] opacity-70 mt-0.5">{k.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Main Bet — 시나리오 B" source="report/scenario-planning-report.md">
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

        <Card title="Robust 8개 전략 — 4축 구조" source="report/invariant-strategies/README.md">
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
// ROBUST STRATEGY
// ─────────────────────────────────────────────────────────────────────────────
function RobustStrategyPanel() {
  return (
    <div className="space-y-4">
      <Card title="8개 Robust 전략 — 시나리오 가치 매트릭스 (8 × 5 = 40 셀)" source="report/invariant-strategies/README.md">
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
            className="rounded-xl p-4 border bg-white"
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
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold">NEW</span>
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
      <Card title="11개 핵심전략 점수 비교 (3축: 임팩트 × 창의성 × 모방난이도, 각 5점 만점 → 합산 15점)" source="analysis/scenarios/core-strategy-selection.md">
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
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono shrink-0">{s.id}</span>
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
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-700 font-mono shrink-0">{s.id}</span>
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

      <Card title="외부 가시성 회복 우선순위 — 7대 정보 공백" source="report/core-strategies/README.md">
        <p className="text-xs text-zinc-500 mb-3">외부 공개 자료가 부족해 신뢰 회복·시장 신호 발신을 위해 우선 공개해야 할 영역.</p>
        <div className="space-y-1.5">
          {CORE_STRATEGIES.infoGaps.map((g, i) => (
            <div key={i} className="flex items-center gap-3 py-1.5 px-3 rounded bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700 font-mono shrink-0">{g.id}</span>
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
// DECISIONS
// ─────────────────────────────────────────────────────────────────────────────
function DecisionsPanel() {
  return (
    <div className="space-y-4">
      <Card>
        <div className="text-center">
          <Sparkles size={20} className="inline text-amber-600 mr-2" />
          <span className="text-sm text-zinc-800">
            12개 결정은 <span className="text-amber-700 font-bold">단일 결정으로 분리하면 효과가 사라진다</span>
            — 묶음으로 처리해야 한다.
          </span>
        </div>
      </Card>

      {DECISION_CLUSTERS.map(cluster => {
        const items = DECISIONS.filter(d => d.cluster === cluster.cluster)
        return (
          <div key={cluster.cluster} className={`border rounded-xl p-4 ${cluster.bgClass}`}>
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
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-bold shrink-0">NEW</span>
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
  const [tab, setTab] = useState('overview')

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

      {tab === 'overview'  && <OverviewPanel />}
      {tab === 'robust'    && <RobustStrategyPanel />}
      {tab === 'core'      && <CoreStrategyPanel />}
      {tab === 'decisions' && <DecisionsPanel />}
    </div>
  )
}
