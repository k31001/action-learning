import { useState } from 'react'
import { AlertCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { DECISIONS } from '../data/strategies'

// 결정 → 연계 EWI 지표 (UI 링크). 신규 결정은 strategies.js 의 keyKpi 사용.
const DECISION_KPI = {
  D1: 'samsung_hbm4_yield', D3: '3d_dram_progress', D4: 'taylor_phase2_announced',
  D5: 'ai_dev_efficiency_adoption', D6: 'downcycle_capex_floor', D9: 'mna_target_undervalued',
  D10: 'nand_layer_cycle_months',
}

const PRIORITY = {
  critical: { label: '긴급', cls: 'text-red-700 bg-red-100 border-red-300' },
  high:     { label: '높음', cls: 'text-amber-700 bg-amber-100 border-amber-300' },
  medium:   { label: '중간', cls: 'text-zinc-600 bg-zinc-100 border-zinc-300' },
}

// 마감 문자열(2026-09-30 / 2026-Q3 / 2026-H1 / 2026-Q4) → Date
function deadlineToDate(deadline) {
  if (!deadline) return null
  const s = String(deadline)
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`)
  m = s.match(/(\d{4})[-\s]*Q([1-4])/)
  if (m) return new Date(`${m[1]}-${['03-31', '06-30', '09-30', '12-31'][+m[2] - 1]}T00:00:00`)
  m = s.match(/(\d{4})[-\s]*H([12])/)
  if (m) return new Date(`${m[1]}-${m[2] === '1' ? '06-30' : '12-31'}T00:00:00`)
  const d = new Date(s)
  return isNaN(d.getTime()) ? null : d
}

function daysUntil(deadline) {
  const dt = deadlineToDate(deadline)
  if (!dt) return null
  return Math.ceil((dt.getTime() - Date.now()) / 86400000)
}

function statusColor(days) {
  if (days == null) return 'text-zinc-600 bg-zinc-50 border-zinc-300'
  if (days < 0) return 'text-red-600 bg-red-100/30 border-red-800'
  if (days < 60) return 'text-orange-600 bg-orange-100/30 border-orange-800'
  if (days < 180) return 'text-amber-700 bg-amber-100/30 border-amber-800'
  return 'text-emerald-600 bg-emerald-100/30 border-green-800'
}

export default function DecisionTracker({ indicators }) {
  const [expanded, setExpanded] = useState(null)
  const indicatorMap = Object.fromEntries(indicators.map(i => [i.id, i]))
  const minDays = Math.min(...DECISIONS.map(d => daysUntil(d.deadline)).filter(d => d != null))

  return (
    <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">{DECISIONS.length}개 즉시 결정 — 묶음 의결</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            대부분 2026 Q3~Q4 마감. 단일 결정으로 분리 불가. (strategies.js 단일 소스)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-orange-600">
            <Clock size={12} /> D-{minDays}
            <span className="text-zinc-500">최단 마감</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {DECISIONS.map(d => {
          const days = daysUntil(d.deadline)
          const colorClasses = statusColor(days)
          const isExpanded = expanded === d.id
          const kpiId = d.keyKpi ?? DECISION_KPI[d.id]
          const linkedIndicator = kpiId ? indicatorMap[kpiId] : null
          const prio = PRIORITY[d.priority] ?? PRIORITY.medium

          return (
            <div
              key={d.id}
              className={`border rounded-hig-md shadow-hig-1 p-3 transition-all ease-hig-standard ${colorClasses} ${isExpanded ? 'ring-2 ring-hig-blue/40' : ''}`}
            >
              <div className="flex items-start justify-between mb-2 gap-2">
                <span className="flex items-center gap-1 flex-wrap">
                  <span className="text-[10px] font-bold tracking-wider opacity-70">{d.id}</span>
                  <span className={`text-[9px] px-1 py-0.5 rounded border ${prio.cls}`}>{prio.label}</span>
                  {d.isNew && <span className="text-[9px] px-1 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-300">NEW</span>}
                </span>
                <button
                  onClick={() => setExpanded(isExpanded ? null : d.id)}
                  className="text-zinc-500 hover:text-zinc-900 shrink-0"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <h3 className="text-sm font-semibold text-zinc-900 mb-1.5 leading-snug">
                {d.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-zinc-500">마감</span>
                <span className="text-xs font-mono text-zinc-900">{d.deadline}</span>
                {days != null && (
                  <span className={`text-xs font-bold ${days < 60 ? 'text-orange-600' : 'text-zinc-700'}`}>
                    D-{days}
                  </span>
                )}
              </div>

              {linkedIndicator && (
                <div className="flex items-center gap-2 mb-2 px-2 py-1 rounded bg-black/5 text-[10px]">
                  <span className="text-zinc-500">연계 KPI:</span>
                  <span className="text-zinc-900 truncate">{linkedIndicator.name}</span>
                  {linkedIndicator.currentValue != null && (
                    <span className="font-mono text-amber-700 ml-auto shrink-0">
                      {linkedIndicator.currentValue}{linkedIndicator.unit === '%' ? '%' : ` ${linkedIndicator.unit ?? ''}`}
                    </span>
                  )}
                </div>
              )}

              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-zinc-300/50 space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-500">근거: </span>
                    <span className="text-zinc-800">{d.summary}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">비상 계획: </span>
                    <span className="text-zinc-700">{d.contingency}</span>
                  </div>
                  {d.relatedRS?.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-zinc-500">연계 전략:</span>
                      {d.relatedRS.map(rs => (
                        <span key={rs} className="text-[10px] px-1.5 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-mono">{rs}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 rounded-hig-md shadow-hig-1 border border-hig-orange/40 bg-hig-orange/5">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-amber-700">묶음 패키지로 의결 필요 — </span>
            <span className="text-zinc-700">
              D1(HBM4 점유율) ↔ D5(AI 도구) ↔ D7(잉여 인력 전환)은 직렬 의존. D4(텍사스 1·2단계) ↔ D8(추가 보조금) 동시 처리. D6(이사회 정책화)이 D9(M&A 펀드)의 거버넌스 기반. <strong>D15(수요 변곡 조기경보) → D16(정점 공급 규율)</strong>은 RS-9 센싱 → RS-5 발동 직렬. D17(소버린 다변화)은 RS-4 운영사 집중 완화.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
