import { useState, useMemo, useCallback } from 'react'
import { useHashSegment } from '../hooks/useHashRoute'
import {
  MessageSquareQuote, Quote, User, Calendar, Tag, Search,
  ChevronRight, FileText, ExternalLink, List,
} from 'lucide-react'
import { INTERVIEWS } from '../data/interviews'
import { Block, KeyQuote } from './ContentBlocks'
import SourceLink from './SourceLink'

// ── 인터뷰 선택 카드 (좌측 목록) ────────────────────────────────────────────
function InterviewListItem({ itv, active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? 'true' : undefined}
      className={`w-full text-left px-4 py-3.5 rounded-hig-md border transition-all ease-hig-standard ${
        active
          ? 'bg-white border-hig-blue/40 ring-1 ring-hig-blue/30 shadow-hig-1'
          : 'bg-white/60 border-zinc-200 hover:bg-white hover:border-zinc-300'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-mono font-medium text-zinc-400">{itv.date}</span>
        {active && <ChevronRight className="w-3.5 h-3.5 text-hig-blue ml-auto" />}
      </div>
      <h3 className={`text-sm font-semibold leading-snug mb-1 ${active ? 'text-zinc-900' : 'text-zinc-700'}`}>
        {itv.title}
      </h3>
      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
        <User className="w-3 h-3" />
        <span>{itv.interviewee.name}</span>
      </div>
    </button>
  )
}

export default function Interviews() {
  const [selectedId, setSelectedId] = useHashSegment(1, INTERVIEWS[0]?.id)
  const [query, setQuery] = useState('')
  const [flashId, setFlashId] = useState(null)

  // 목차 클릭 → 부드럽게 스크롤 + 도착 섹션 잠깐 강조.
  // 네이티브 #앵커 대신 JS 스크롤을 쓰는 이유: 문서 하단 짧은 섹션도
  // (아래 trailing spacer 덕에) 항상 뷰포트 최상단에 정렬되도록 하고,
  // URL 에 #해시가 남아 탭 전환/새로고침 시 엉뚱하게 점프하는 것을 막기 위함.
  const scrollToSection = useCallback((anchorId) => {
    const el = document.getElementById(anchorId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setFlashId(anchorId)
    window.setTimeout(() => setFlashId(cur => (cur === anchorId ? null : cur)), 1500)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INTERVIEWS
    return INTERVIEWS.filter(itv =>
      itv.title.toLowerCase().includes(q) ||
      itv.interviewee.name.toLowerCase().includes(q) ||
      itv.summary.toLowerCase().includes(q) ||
      itv.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [query])

  const selected = useMemo(
    () => INTERVIEWS.find(i => i.id === selectedId) ?? filtered[0] ?? INTERVIEWS[0],
    [selectedId, filtered]
  )

  return (
    <div className="space-y-6">
      {/* ── 헤더 ──────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquareQuote className="w-5 h-5 text-zinc-700" />
              <h2 className="text-lg font-semibold text-zinc-900">인터뷰</h2>
            </div>
            <p className="text-sm text-zinc-600 max-w-3xl">
              산업 전문가·내부 인사 인터뷰 1차 자료를 아카이브합니다. 각 인터뷰의 핵심 문구는 상단에 큰 인용문으로
              강조해, 나중에 빠르게 참고할 수 있도록 했습니다.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-hig-md">
            <span className="text-xs font-medium text-zinc-600">총 인터뷰</span>
            <span className="text-sm font-mono font-bold text-zinc-900">{INTERVIEWS.length}</span>
          </div>
        </div>
      </div>

      {/* ── 2-column: 좌측 목록 + 우측 본문 ───────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-5 items-start">
        {/* 좌측: 인터뷰 목록 (확장 대비) */}
        <aside className="space-y-3 xl:sticky xl:top-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="인터뷰·인물·태그 검색"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-zinc-200 rounded-hig-md focus:outline-none focus:ring-2 focus:ring-hig-blue/30 focus:border-hig-blue/40"
            />
          </div>
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-zinc-500 px-2 py-4 text-center">검색 결과가 없습니다.</p>
            ) : (
              filtered.map(itv => (
                <InterviewListItem
                  key={itv.id}
                  itv={itv}
                  active={selected?.id === itv.id}
                  onClick={() => setSelectedId(itv.id)}
                />
              ))
            )}
          </div>
        </aside>

        {/* 우측: 선택된 인터뷰 본문 */}
        {selected && (
          <div className="space-y-6 min-w-0">
            {/* 메타 헤더 */}
            <article className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-1 p-6">
              {selected.kicker && (
                <div className="text-xs font-semibold uppercase tracking-wider text-hig-blue mb-2">
                  {selected.kicker}
                </div>
              )}
              <h1 className="text-2xl font-bold text-zinc-900 leading-tight tracking-tight mb-3">
                {selected.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-zinc-600 mb-4">
                <span className="inline-flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  {selected.interviewee.name}
                  {selected.interviewee.role && (
                    <span className="text-zinc-400">· {selected.interviewee.role}</span>
                  )}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {selected.date}
                </span>
              </div>
              {selected.summary && (
                <p className="text-[15px] leading-relaxed text-zinc-700 mb-4">{selected.summary}</p>
              )}
              {selected.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {selected.tags.map(t => (
                    <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-zinc-600 bg-zinc-100 rounded-full">
                      <Tag className="w-2.5 h-2.5" /> {t}
                    </span>
                  ))}
                </div>
              )}
              {selected.source && (
                <div className="pt-3 border-t border-zinc-100">
                  <SourceLink source={`원본: ${selected.source}`} prefix="" className="text-xs text-zinc-500" />
                </div>
              )}
            </article>

            {/* 핵심 인용문 — 크게 강조 */}
            {selected.keyQuotes?.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-4 h-4 text-zinc-500" />
                  <h2 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider">핵심 인용문</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {selected.keyQuotes.map((q, i) => (
                    <KeyQuote key={i} quote={q} />
                  ))}
                </div>
              </section>
            )}

            {/* 목차 */}
            {selected.sections?.length > 0 && (
              <nav className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <List className="w-4 h-4 text-zinc-500" />
                  <h2 className="text-sm font-semibold text-zinc-800">목차</h2>
                </div>
                <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5">
                  {selected.sections.map(sec => (
                    <li key={sec.id}>
                      <a
                        href={`#${selected.id}-${sec.id}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(`${selected.id}-${sec.id}`) }}
                        className="flex items-baseline gap-2 text-sm text-zinc-600 hover:text-hig-blue transition-colors py-0.5"
                      >
                        <span className="font-mono text-xs text-zinc-400 w-5 flex-shrink-0">{sec.no}.</span>
                        <span className="truncate">{sec.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* 본문 섹션 */}
            <div className="space-y-4">
              {selected.sections?.map(sec => (
                <section
                  key={sec.id}
                  id={`${selected.id}-${sec.id}`}
                  className={`bg-white border rounded-hig-lg shadow-hig-1 p-6 scroll-mt-4 transition-all ease-hig-standard ${
                    flashId === `${selected.id}-${sec.id}`
                      ? 'border-hig-blue/50 ring-2 ring-hig-blue/40'
                      : 'border-zinc-200'
                  }`}
                >
                  <h3 className="flex items-baseline gap-2.5 text-lg font-semibold text-zinc-900 tracking-tight mb-4 pb-3 border-b border-zinc-100">
                    <span className="font-mono text-sm text-hig-blue">{String(sec.no).padStart(2, '0')}</span>
                    <span>{sec.title}</span>
                  </h3>
                  {sec.blocks.map((b, i) => <Block key={i} block={b} />)}
                </section>
              ))}
            </div>

            {/* 푸터 */}
            <div className="text-xs text-zinc-500 text-center py-3">
              <FileText className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
              원본 인터뷰 자료는{' '}
              <a
                href={`https://github.com/k31001/action-learning/blob/main/${selected.source}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-0.5"
              >
                {selected.source}
                <ExternalLink className="w-3 h-3" />
              </a>
              {' '}에 보관되어 있습니다.
            </div>

            {/* trailing spacer — 하단 짧은 섹션도 목차 클릭 시 최상단 정렬되도록 스크롤 여유 확보 */}
            <div aria-hidden className="h-[70vh]" />
          </div>
        )}
      </div>
    </div>
  )
}
