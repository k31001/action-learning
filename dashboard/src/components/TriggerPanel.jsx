import { useState } from 'react'
import { Zap, CheckCircle, Circle, ChevronDown, ChevronUp, Calendar } from 'lucide-react'

const SCENARIO_TAG_CLASS = {
  A: 'scenario-A',
  B: 'scenario-B',
  C: 'scenario-C',
  D: 'scenario-D',
  E: 'scenario-E',
}

function TriggerItem({ trigger, onToggle }) {
  const [open, setOpen] = useState(false)
  const [note, setNote] = useState(trigger.note || '')

  return (
    <div
      className={`border rounded-xl transition-all duration-200 ${
        trigger.activated
          ? trigger.isPositive
            ? 'border-emerald-300 bg-emerald-50'
            : 'border-red-300 bg-red-50 pulse-critical'
          : 'border-slate-300 bg-slate-50 hover:border-slate-300'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={() => onToggle(trigger.id, !trigger.activated, note)}
          className="mt-0.5 shrink-0"
        >
          {trigger.activated ? (
            <CheckCircle
              size={18}
              className={trigger.isPositive ? 'text-emerald-600' : 'text-red-600'}
            />
          ) : (
            <Circle size={18} className="text-slate-400 hover:text-slate-500 transition-colors" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className={`text-sm font-medium ${trigger.activated ? (trigger.isPositive ? 'text-emerald-700' : 'text-red-700') : 'text-slate-800'}`}>
                {trigger.name}
              </p>
              {trigger.deadline && (
                <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-600">
                  <Calendar size={11} />
                  데드라인: {trigger.deadline}
                </div>
              )}
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="text-slate-400 hover:text-slate-500 shrink-0"
            >
              {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>

          {/* Scenario tags */}
          {trigger.targetScenarios?.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {trigger.targetScenarios.map(s => (
                <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${SCENARIO_TAG_CLASS[s]}`}>
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Expanded */}
          {open && (
            <div className="mt-3 space-y-2">
              <div className="text-xs text-slate-500">
                <span className="text-slate-700 font-medium">조건: </span>
                {trigger.condition}
              </div>
              <div className="text-xs text-slate-500">
                <span className="text-slate-700 font-medium">즉각 행동: </span>
                {trigger.immediateAction}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="메모 (출처, 날짜, 담당자 등)..."
                  className="flex-1 bg-slate-100 border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
                />
                <button
                  onClick={() => onToggle(trigger.id, !trigger.activated, note)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                    trigger.activated
                      ? 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                      : trigger.isPositive
                      ? 'bg-emerald-100 hover:bg-emerald-800 text-emerald-700'
                      : 'bg-red-100 hover:bg-red-800 text-red-700'
                  }`}
                >
                  {trigger.activated ? '해제' : '발동'}
                </button>
              </div>
              {trigger.activatedDate && (
                <div className="text-xs text-slate-400">발동일: {trigger.activatedDate}</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TriggerPanel({ triggers, onToggle }) {
  const activeCount = triggers.filter(t => t.activated).length
  const positiveCount = triggers.filter(t => t.activated && t.isPositive).length
  const criticalCount = triggers.filter(t => t.activated && !t.isPositive).length

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={15} className={activeCount > 0 ? 'text-yellow-600' : 'text-slate-500'} />
        <h2 className="text-sm font-semibold text-slate-800 flex-1">시나리오 전환 트리거</h2>
        <div className="flex gap-2 text-xs">
          {criticalCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700">
              경보 {criticalCount}건
            </span>
          )}
          {positiveCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
              긍정 {positiveCount}건
            </span>
          )}
          {activeCount === 0 && (
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
              미발동
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {triggers.map(t => (
          <TriggerItem key={t.id} trigger={t} onToggle={onToggle} />
        ))}
      </div>

      <p className="mt-3 text-xs text-slate-400">
        트리거 발동 시 해당 즉각 행동 계획을 30일 내 실행 — 이사회 정식 안건 승인 필요
      </p>
    </section>
  )
}
