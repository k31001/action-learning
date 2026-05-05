import { AlertCircle, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react'

export default function StatusSummary({ indicators, triggers }) {
  const critical = indicators.filter(i => i.status === 'critical')
  const warning = indicators.filter(i => i.status === 'warning')
  const normal = indicators.filter(i => i.status === 'normal')
  const unknown = indicators.filter(i => i.status === 'unknown')
  const activeTriggers = triggers.filter(t => t.activated && !t.isPositive)
  const positiveTriggers = triggers.filter(t => t.activated && t.isPositive)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div className={`rounded-xl border p-3 ${critical.length > 0 ? 'border-red-500/60 bg-red-950/30' : 'border-gray-800 bg-gray-900/40'}`}>
        <div className="flex items-center gap-2 mb-1">
          <AlertCircle size={14} className={critical.length > 0 ? 'text-red-400' : 'text-gray-600'} />
          <span className="text-xs text-gray-400">긴급 경보</span>
        </div>
        <div className={`text-2xl font-bold font-mono ${critical.length > 0 ? 'text-red-400' : 'text-gray-600'}`}>
          {critical.length}
        </div>
        {critical.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {critical.map(i => (
              <div key={i.id} className="text-xs text-red-400/70 truncate">{i.name}</div>
            ))}
          </div>
        )}
      </div>

      <div className={`rounded-xl border p-3 ${warning.length > 0 ? 'border-yellow-500/40 bg-yellow-950/20' : 'border-gray-800 bg-gray-900/40'}`}>
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={14} className={warning.length > 0 ? 'text-yellow-400' : 'text-gray-600'} />
          <span className="text-xs text-gray-400">주의</span>
        </div>
        <div className={`text-2xl font-bold font-mono ${warning.length > 0 ? 'text-yellow-400' : 'text-gray-600'}`}>
          {warning.length}
        </div>
        {warning.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {warning.slice(0, 2).map(i => (
              <div key={i.id} className="text-xs text-yellow-400/70 truncate">{i.name}</div>
            ))}
            {warning.length > 2 && <div className="text-xs text-gray-600">+{warning.length - 2}건</div>}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle size={14} className="text-green-500" />
          <span className="text-xs text-gray-400">정상</span>
        </div>
        <div className="text-2xl font-bold font-mono text-green-500">{normal.length}</div>
      </div>

      <div className={`rounded-xl border p-3 ${activeTriggers.length > 0 ? 'border-red-500/60 bg-red-950/30' : positiveTriggers.length > 0 ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-gray-800 bg-gray-900/40'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-400">트리거 발동</span>
        </div>
        <div className={`text-2xl font-bold font-mono ${activeTriggers.length > 0 ? 'text-red-400' : positiveTriggers.length > 0 ? 'text-emerald-400' : 'text-gray-600'}`}>
          {activeTriggers.length + positiveTriggers.length}
        </div>
        {activeTriggers.map(t => (
          <div key={t.id} className="text-xs text-red-400/70 truncate mt-0.5">{t.name}</div>
        ))}
        {positiveTriggers.map(t => (
          <div key={t.id} className="text-xs text-emerald-400/70 truncate mt-0.5">{t.name}</div>
        ))}
      </div>
    </div>
  )
}
