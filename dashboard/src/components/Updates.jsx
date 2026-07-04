import { useState, useMemo } from 'react'
import {
  History, ChevronDown, ChevronRight, Tag, ExternalLink,
  Sparkles, BookOpen, Activity, Search, Crosshair,
} from 'lucide-react'
import { UPDATES } from '../data/updates'
import { VERSION } from '../version'

// ── type → 시각 속성 ─────────────────────────────────────────────────────────
const TYPE_META = {
  ingest:     { label: 'Ingest',        color: 'bg-blue-50 text-blue-700 border-blue-200',           icon: BookOpen },
  build:      { label: 'Build',         color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Sparkles },
  query:      { label: 'Query',         color: 'bg-violet-50 text-violet-700 border-violet-200',    icon: Search },
  lint:       { label: 'Lint',          color: 'bg-amber-50 text-amber-700 border-amber-200',       icon: Activity },
  migration:  { label: 'Migration',     color: 'bg-zinc-100 text-zinc-700 border-zinc-300',         icon: History },
  // 시나리오 포지션 맵·확률 추정 재평가 — 별도 필터로 한눈에
  assessment: { label: '포지션·확률',    color: 'bg-rose-50 text-rose-700 border-rose-200',          icon: Crosshair },
}

// 한 entry 카드
function UpdateCard({ entry, expanded, onToggle }) {
  const meta = TYPE_META[entry.type] ?? TYPE_META.ingest
  const TypeIcon = meta.icon

  return (
    <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 overflow-hidden">
      {/* 헤더 — 항상 표시 */}
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 hover:bg-zinc-50 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* 좌측: 날짜 + 타입 칩 */}
          <div className="flex flex-col items-start gap-1.5 min-w-[110px]">
            <span className="text-xs font-mono font-medium text-zinc-500">{entry.date}</span>
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium border rounded-full ${meta.color}`}>
              <TypeIcon className="w-3 h-3" />
              {meta.label}
            </span>
            {entry.version && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full">
                {entry.version}
              </span>
            )}
          </div>

          {/* 본문 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-zinc-900 mb-1 leading-snug">{entry.title}</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">{entry.summary}</p>
            {entry.tags?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {entry.tags.map(t => (
                  <span key={t} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 bg-zinc-100 rounded">
                    <Tag className="w-2.5 h-2.5" /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 펼침 화살표 */}
          <div className="flex-shrink-0 mt-1">
            {expanded
              ? <ChevronDown className="w-4 h-4 text-zinc-400" />
              : <ChevronRight className="w-4 h-4 text-zinc-400" />}
          </div>
        </div>
      </button>

      {/* 본문 — expanded 시 표시 */}
      {expanded && (
        <div className="px-5 pb-5 pt-1 border-t border-zinc-100 bg-zinc-50/50">
          {entry.items?.length > 0 && (
            <ul className="space-y-2 mt-3">
              {entry.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <span className="flex-shrink-0 mt-1 w-1 h-1 rounded-full bg-zinc-400" />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-zinc-800">{item.label}</span>
                    {item.detail && (
                      <span className="text-zinc-600"> — {item.detail}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {entry.links?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-zinc-200">
              {entry.links.map((l, i) => (
                <a
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function Updates() {
  const [filterType, setFilterType] = useState('all')
  const [filterTag, setFilterTag] = useState(null)
  const [expandedIds, setExpandedIds] = useState(() => new Set([0])) // 첫 entry 기본 펼침

  // 전체 tag 목록 (사용 빈도 순)
  const allTags = useMemo(() => {
    const counts = {}
    UPDATES.forEach(u => u.tags?.forEach(t => { counts[t] = (counts[t] ?? 0) + 1 }))
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([t]) => t)
  }, [])

  // 필터링
  const filtered = useMemo(() => {
    return UPDATES.filter(u => {
      if (filterType !== 'all' && u.type !== filterType) return false
      if (filterTag && !u.tags?.includes(filterTag)) return false
      return true
    })
  }, [filterType, filterTag])

  // 통계
  const stats = useMemo(() => {
    const total = UPDATES.length
    const builds = UPDATES.filter(u => u.type === 'build').length
    const ingests = UPDATES.filter(u => u.type === 'ingest').length
    const latestDate = UPDATES[0]?.date ?? '—'
    return { total, builds, ingests, latestDate }
  }, [])

  function toggle(idx) {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  function expandAll() {
    setExpandedIds(new Set(filtered.map((_, i) => i)))
  }

  function collapseAll() {
    setExpandedIds(new Set())
  }

  const TYPE_CHIPS = [
    { id: 'all',        label: '전체',      count: UPDATES.length },
    { id: 'assessment', label: '포지션·확률', count: UPDATES.filter(u => u.type === 'assessment').length },
    { id: 'ingest',     label: 'Ingest',    count: UPDATES.filter(u => u.type === 'ingest').length },
    { id: 'build',      label: 'Build',     count: UPDATES.filter(u => u.type === 'build').length },
    { id: 'query',      label: 'Query',     count: UPDATES.filter(u => u.type === 'query').length },
  ]

  return (
    <div className="space-y-6">
      {/* ── 헤더 — 현재 버전 + 통계 ──────────────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <History className="w-5 h-5 text-zinc-700" />
              <h2 className="text-lg font-semibold text-zinc-900">업데이트 내역</h2>
            </div>
            <p className="text-sm text-zinc-600">
              위키 ingest·dashboard build·query 분석 등 모든 작업 사이클의 변경 사항을 시간순으로 정리합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-hig-md">
            <span className="text-xs font-medium text-emerald-700">현재 dashboard 버전</span>
            <span className="text-sm font-mono font-bold text-emerald-900">{VERSION}</span>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
          <StatBox label="총 업데이트" value={stats.total} />
          <StatBox label="ingest" value={stats.ingests} />
          <StatBox label="build" value={stats.builds} />
          <StatBox label="최신 업데이트" value={stats.latestDate} mono />
        </div>
      </div>

      {/* ── 필터 ──────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-4">
        <div className="flex items-start gap-4 flex-wrap">
          {/* 타입 필터 */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">유형</span>
            <div className="flex flex-wrap gap-1.5">
              {TYPE_CHIPS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setFilterType(c.id)}
                  className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                    filterType === c.id
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  {c.label} <span className="opacity-60">({c.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 태그 필터 */}
          {allTags.length > 0 && (
            <div className="flex flex-col gap-2 flex-1 min-w-[280px]">
              <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">태그</span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilterTag(null)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                    !filterTag
                      ? 'bg-zinc-900 text-white border-zinc-900'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  모두
                </button>
                {allTags.map(t => (
                  <button
                    key={t}
                    onClick={() => setFilterTag(filterTag === t ? null : t)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md border transition-colors ${
                      filterTag === t
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 펼침/접기 */}
          <div className="flex flex-col gap-2 ml-auto">
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">상세</span>
            <div className="flex gap-1.5">
              <button
                onClick={expandAll}
                className="px-2.5 py-1 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-md hover:bg-zinc-50"
              >
                모두 펼치기
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-md hover:bg-zinc-50"
              >
                모두 접기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 타임라인 ──────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-zinc-50 border border-zinc-200 rounded-hig-md p-8 text-center text-sm text-zinc-500">
            조건에 맞는 업데이트가 없습니다.
          </div>
        ) : (
          filtered.map((entry, i) => {
            // expandedIds는 원본 인덱스 기준이 아니라 filtered 인덱스 기준
            // 단순화: filtered key를 entry 자체로 안정화
            const originalIdx = UPDATES.indexOf(entry)
            return (
              <UpdateCard
                key={`${entry.date}-${entry.title}-${i}`}
                entry={entry}
                expanded={expandedIds.has(originalIdx)}
                onToggle={() => toggle(originalIdx)}
              />
            )
          })
        )}
      </div>

      {/* 푸터 안내 */}
      <div className="text-xs text-zinc-500 text-center py-3">
        전체 변경 이력은 <a href="https://github.com/k31001/action-learning/blob/main/log.md" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">log.md</a>를 참조하세요.
      </div>
    </div>
  )
}

function StatBox({ label, value, mono }) {
  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-hig-md px-4 py-3">
      <div className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-1">{label}</div>
      <div className={`text-lg font-bold text-zinc-900 ${mono ? 'font-mono' : ''}`}>{value}</div>
    </div>
  )
}
