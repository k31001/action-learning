import { useState } from 'react'
import IndicatorCard from './IndicatorCard'
import UpdateModal from './UpdateModal'

const CATEGORY_LABELS = {
  monthly: { label: '월간 모니터링', color: 'text-blue-400', dot: 'bg-blue-400' },
  quarterly: { label: '분기별 모니터링', color: 'text-purple-400', dot: 'bg-purple-400' },
  annual: { label: '연간 검토', color: 'text-orange-400', dot: 'bg-orange-400' },
}

export default function IndicatorGrid({ indicators, onUpdate }) {
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('all')

  const categories = ['monthly', 'quarterly', 'annual']
  const filtered = filter === 'all' ? indicators : indicators.filter(i => i.category === filter)

  const grouped = categories.reduce((acc, cat) => {
    const items = filtered.filter(i => i.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200'
          }`}
        >
          전체 ({indicators.length})
        </button>
        {categories.map(cat => {
          const c = CATEGORY_LABELS[cat]
          const count = indicators.filter(i => i.category === cat).length
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === cat
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {c.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Grouped grids */}
      {Object.entries(grouped).map(([cat, items]) => {
        const c = CATEGORY_LABELS[cat]
        return (
          <div key={cat} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`w-2 h-2 rounded-full ${c.dot}`} />
              <h3 className={`text-xs font-semibold uppercase tracking-wider ${c.color}`}>
                {c.label}
              </h3>
              <div className="h-px flex-1 bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3">
              {items.map(ind => (
                <IndicatorCard
                  key={ind.id}
                  indicator={ind}
                  onEdit={setEditing}
                />
              ))}
            </div>
          </div>
        )
      })}

      {/* Modal */}
      {editing && (
        <UpdateModal
          indicator={editing}
          onSave={onUpdate}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
