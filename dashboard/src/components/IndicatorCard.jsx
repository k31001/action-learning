import { useState } from 'react'
import { Pencil, TrendingDown, TrendingUp, Minus, RefreshCw } from 'lucide-react'

const STATUS_CONFIG = {
  normal: {
    badge: 'badge-normal',
    card: 'status-normal',
    dot: 'bg-green-400',
    label: '정상',
    icon: '✓',
  },
  warning: {
    badge: 'badge-warning',
    card: 'status-warning',
    dot: 'bg-yellow-400',
    label: '주의',
    icon: '⚠',
  },
  critical: {
    badge: 'badge-critical',
    card: 'status-critical',
    dot: 'bg-red-400 pulse-critical',
    label: '경보',
    icon: '!',
  },
  unknown: {
    badge: 'badge-unknown',
    card: 'status-unknown',
    dot: 'bg-stone-400',
    label: '미입력',
    icon: '?',
  },
}

const SCENARIO_TAG_CLASS = {
  A: 'scenario-A',
  B: 'scenario-B',
  C: 'scenario-C',
  D: 'scenario-D',
  E: 'scenario-E',
}

function MiniSparkline({ history, unit }) {
  if (!history || history.length < 2) return null
  const numeric = history.filter(h => h.value !== null && !isNaN(Number(h.value)))
  if (numeric.length < 2) return null

  const values = numeric.map(h => Number(h.value))
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const w = 80
  const h = 28
  const points = values.map((v, i) => ({
    x: (i / (values.length - 1)) * w,
    y: h - ((v - min) / range) * h,
  }))

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const last = values[values.length - 1]
  const prev = values[values.length - 2]
  const trend = last > prev ? 'up' : last < prev ? 'down' : 'flat'

  return (
    <div className="flex items-center gap-1.5 mt-1">
      <svg width={w} height={h} className="overflow-visible">
        <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-500" />
        <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="2.5" className="fill-gray-300" />
      </svg>
      {trend === 'up' && <TrendingUp size={12} className="text-emerald-600" />}
      {trend === 'down' && <TrendingDown size={12} className="text-red-600" />}
      {trend === 'flat' && <Minus size={12} className="text-stone-500" />}
    </div>
  )
}

function formatValue(indicator) {
  const v = indicator.currentValue
  if (v === null || v === undefined || v === '') return '—'
  if (indicator.inputType === 'select') {
    const opt = indicator.selectOptions?.find(o => o.value === v)
    return opt ? opt.label : v
  }
  return `${Number(v).toLocaleString('ko-KR', { maximumFractionDigits: 1 })} ${indicator.unit !== 'status' ? indicator.unit : ''}`
}

export default function IndicatorCard({ indicator, onEdit, onAutoUpdate }) {
  const cfg = STATUS_CONFIG[indicator.status] || STATUS_CONFIG.unknown
  const [updating, setUpdating] = useState(false)
  const [updateError, setUpdateError] = useState(null)

  async function handleAutoUpdate() {
    if (!onAutoUpdate || updating) return
    setUpdating(true)
    setUpdateError(null)
    try {
      await onAutoUpdate(indicator.autoUpdateId)
    } catch (e) {
      setUpdateError(e.message)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div
      className={`relative rounded-xl border-2 p-4 transition-all duration-200 ${cfg.card}`}
    >
      {/* Status badge + category */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${cfg.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
          {indicator.isCritical && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 ring-1 ring-red-300 font-medium">
              핵심
            </span>
          )}
          {indicator.autoUpdateIsProxy && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 ring-1 ring-amber-500/30 font-medium" title="직접 데이터 대신 프록시 지표 사용">
              프록시
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {indicator.autoUpdateId && (
            <button
              onClick={handleAutoUpdate}
              disabled={updating}
              className="p-1.5 rounded-lg hover:bg-stone-200/60 text-stone-500 hover:text-sky-600 transition-colors disabled:opacity-40"
              title="자동 업데이트"
            >
              <RefreshCw size={13} className={updating ? 'animate-spin' : ''} />
            </button>
          )}
          <button
            onClick={() => onEdit(indicator)}
            className="p-1.5 rounded-lg hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
            title="수동 입력"
          >
            <Pencil size={13} />
          </button>
        </div>
      </div>

      {/* Name */}
      <h3 className="text-sm font-semibold text-stone-900 leading-snug mb-1">
        {indicator.name}
      </h3>
      <p className="text-xs text-stone-500 mb-3">{indicator.source}</p>

      {/* Current value */}
      <div className="mb-3">
        <div className="text-2xl font-mono font-bold text-stone-900">
          {formatValue(indicator)}
        </div>
        <MiniSparkline history={indicator.history} unit={indicator.unit} />
      </div>

      {/* Alert threshold */}
      <div className="text-xs text-stone-500 mb-3 leading-relaxed">
        {indicator.alertDescription}
      </div>

      {/* Scenario signals */}
      {indicator.scenarioSignals?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {indicator.scenarioSignals.map(s => (
            <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${SCENARIO_TAG_CLASS[s]}`}>
              {s}
            </span>
          ))}
          <span className="text-xs text-stone-500 self-center">{indicator.scenarioText}</span>
        </div>
      )}

      {/* Auto-update source label */}
      {indicator.autoUpdateSource && (
        <div className="text-xs text-stone-400 mb-1">
          <span className="text-stone-300">자동출처:</span> {indicator.autoUpdateSource}
        </div>
      )}

      {/* Auto-update error */}
      {updateError && (
        <div className="text-xs text-red-600 bg-red-50 rounded px-2 py-1 mb-2">
          업데이트 실패: {updateError}
        </div>
      )}

      {/* Last updated */}
      {indicator.lastUpdated && (
        <div className="text-xs text-stone-400 border-t border-stone-200/60 pt-2 mt-2">
          업데이트: {indicator.lastUpdated}
          {indicator.note && <span className="ml-2 text-stone-400 italic truncate">— {indicator.note}</span>}
        </div>
      )}
    </div>
  )
}
