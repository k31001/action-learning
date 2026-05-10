import { useState, useEffect } from 'react'
import { X, History } from 'lucide-react'

const STATUS_LABELS = {
  normal: { label: '정상', color: 'text-emerald-600' },
  warning: { label: '주의', color: 'text-yellow-600' },
  critical: { label: '경보', color: 'text-red-600' },
  unknown: { label: '미입력', color: 'text-zinc-500' },
}

export default function UpdateModal({ indicator, onSave, onClose }) {
  const [value, setValue] = useState(
    indicator.currentValue !== null ? String(indicator.currentValue) : ''
  )
  const [note, setNote] = useState('')
  const [manualStatus, setManualStatus] = useState(null)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSave() {
    const finalValue = indicator.inputType === 'select' ? value
      : value === '' ? null
      : parseFloat(value)
    onSave(indicator.id, finalValue, note, manualStatus)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white border border-zinc-300 rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-zinc-200">
          <div>
            <h3 className="font-semibold text-zinc-900">{indicator.name}</h3>
            <p className="text-xs text-zinc-500 mt-0.5">{indicator.source}</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 transition-colors ml-4">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Alert info */}
          <div className="bg-zinc-100 rounded-lg p-3 text-xs space-y-1">
            <div className="text-zinc-500">
              <span className="text-zinc-700 font-medium">경보 기준: </span>
              {indicator.alertDescription}
            </div>
            <div className="text-zinc-500">
              <span className="text-zinc-700 font-medium">시나리오 신호: </span>
              {indicator.scenarioText}
            </div>
            {indicator.hint && (
              <div className="text-zinc-500 italic">{indicator.hint}</div>
            )}
          </div>

          {/* Value input */}
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">
              새 값 ({indicator.unitLabel})
            </label>
            {indicator.inputType === 'select' ? (
              <select
                value={value}
                onChange={e => {
                  setValue(e.target.value)
                  const opt = indicator.selectOptions?.find(o => o.value === e.target.value)
                  if (opt) setManualStatus(opt.status)
                }}
                className="w-full bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-400"
              >
                <option value="">-- 선택하세요 --</option>
                {indicator.selectOptions?.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}  ({opt.signal})
                  </option>
                ))}
              </select>
            ) : (
              <div className="flex gap-2">
                <input
                  type="number"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder={`예: ${indicator.alertThreshold ?? ''}`}
                  className="flex-1 bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
                  onKeyDown={e => e.key === 'Enter' && handleSave()}
                  autoFocus
                />
                <span className="self-center text-sm text-zinc-500 whitespace-nowrap">
                  {indicator.unit !== 'status' ? indicator.unit : ''}
                </span>
              </div>
            )}
          </div>

          {/* Manual status override (for manual condition) */}
          {indicator.alertCondition === 'manual' && !indicator.inputType === 'select' && (
            <div>
              <label className="block text-xs text-zinc-500 mb-1.5">상태 수동 지정</label>
              <div className="flex gap-2">
                {Object.entries(STATUS_LABELS).filter(([k]) => k !== 'unknown').map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => setManualStatus(manualStatus === k ? null : k)}
                    className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                      manualStatus === k
                        ? `border-current ${v.color} bg-zinc-100`
                        : 'border-zinc-300 text-zinc-500 hover:border-zinc-400'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <label className="block text-xs text-zinc-500 mb-1.5">메모 (선택)</label>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="출처, 맥락 등을 간단히 기록..."
              className="w-full bg-zinc-100 border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400"
            />
          </div>

          {/* History */}
          {indicator.history?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2">
                <History size={12} />
                최근 업데이트 이력
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {[...indicator.history].reverse().slice(0, 8).map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-zinc-400 shrink-0 font-mono">{h.date}</span>
                    <span className="text-zinc-700">
                      {h.value !== null && h.value !== undefined ? `${h.value} ${indicator.unit !== 'status' ? indicator.unit : ''}` : '—'}
                    </span>
                    {h.note && <span className="text-zinc-500 truncate">{h.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-zinc-200">
          <button
            onClick={onClose}
            className="flex-1 py-2 text-sm rounded-lg border border-zinc-300 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 text-sm rounded-lg bg-samsung-blue hover:bg-blue-700 text-zinc-900 font-medium transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  )
}
