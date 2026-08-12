import { useState, useMemo, useCallback } from 'react'
import { useHashSegment } from '../hooks/useHashRoute'
import {
  NotebookPen, Quote, Users, Calendar, Tag, Search, Clock,
  ChevronRight, FileText, ExternalLink, List, CheckCircle2, CircleDot, HelpCircle,
} from 'lucide-react'
import { MEETINGS } from '../data/meetings'
import { Block, KeyQuote } from './ContentBlocks'
import SourceLink from './SourceLink'

// ── 회의 선택 카드 (좌측 목록) ──────────────────────────────────────────────
function MeetingListItem({ mtg, active, onClick }) {
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
        <span className="text-[10px] font-mono font-medium text-zinc-400">{mtg.date}</span>
        {active && <ChevronRight className="w-3.5 h-3.5 text-hig-blue ml-auto" />}
      </div>
      <h3 className={`text-sm font-semibold leading-snug mb-1 ${active ? 'text-zinc-900' : 'text-zinc-700'}`}>
        {mtg.title}
      </h3>
      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
        <Users className="w-3 h-3" />
        <span>참석 {mtg.attendees.count}명</span>
        {mtg.decisions?.length > 0 && (
          <>
            <span className="text-zinc-300">·</span>
            <span>결정 {mtg.decisions.length}건</span>
          </>
        )}
      </div>
    </button>
  )
}

// ── 결정사항 / 액션아이템 / 미결 3종 요약 패널 ──────────────────────────────
function OutcomePanel({ meeting }) {
  const { decisions = [], actionItems = [], openQuestions = [] } = meeting
  if (!decisions.length && !actionItems.length && !openQuestions.length) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 결정사항 */}
      {decisions.length > 0 && (
        <section className="lg:col-span-2 bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-hig-green" />
            <h2 className="text-sm font-semibold text-zinc-800">결정·합의 사항</h2>
            <span className="ml-auto text-xs font-mono text-zinc-400">{decisions.length}</span>
          </div>
          <ol className="space-y-3">
            {decisions.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold ring-1 ring-emerald-200">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] leading-relaxed font-medium text-zinc-900">{d.text}</p>
                  {d.detail && <p className="mt-1 text-sm leading-relaxed text-zinc-600">{d.detail}</p>}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 액션 아이템 */}
      {actionItems.length > 0 && (
        <section className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CircleDot className="w-4 h-4 text-hig-blue" />
            <h2 className="text-sm font-semibold text-zinc-800">액션 아이템</h2>
            <span className="ml-auto text-xs font-mono text-zinc-400">{actionItems.length}</span>
          </div>
          <ul className="space-y-2.5">
            {actionItems.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-hig-blue/60" />
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-zinc-700">{a.task}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-zinc-500">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 font-medium text-zinc-600">{a.owner}</span>
                    {a.when && (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {a.when}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 미결 쟁점 */}
      {openQuestions.length > 0 && (
        <section className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 p-5">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-hig-orange" />
            <h2 className="text-sm font-semibold text-zinc-800">미결·재확인 필요</h2>
            <span className="ml-auto text-xs font-mono text-zinc-400">{openQuestions.length}</span>
          </div>
          <ul className="space-y-2.5">
            {openQuestions.map((q, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed font-medium text-zinc-800">{q.text}</p>
                  {q.detail && <p className="mt-0.5 text-[13px] leading-relaxed text-zinc-600">{q.detail}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default function MeetingNotes() {
  const [selectedId, setSelectedId] = useHashSegment(1, MEETINGS[0]?.id)
  const [query, setQuery] = useState('')
  const [flashId, setFlashId] = useState(null)

  // 목차 클릭 → 부드럽게 스크롤 + 도착 섹션 잠깐 강조 (Interviews 와 동일 동작)
  const scrollToSection = useCallback((anchorId) => {
    const el = document.getElementById(anchorId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setFlashId(anchorId)
    window.setTimeout(() => setFlashId(cur => (cur === anchorId ? null : cur)), 1500)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return MEETINGS
    return MEETINGS.filter(m =>
      m.title.toLowerCase().includes(q) ||
      m.summary.toLowerCase().includes(q) ||
      m.date.includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [query])

  const selected = useMemo(
    () => MEETINGS.find(m => m.id === selectedId) ?? filtered[0] ?? MEETINGS[0],
    [selectedId, filtered]
  )

  return (
    <div className="space-y-6">
      {/* ── 헤더 ──────────────────────────────────────────────────────────── */}
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <NotebookPen className="w-5 h-5 text-zinc-700" />
              <h2 className="text-lg font-semibold text-zinc-900">회의록</h2>
            </div>
            <p className="text-sm text-zinc-600 max-w-3xl">
              액션러닝 과제 회의의 녹취를 정리한 회의록입니다. 결정·합의 사항과 액션 아이템을 상단에 모아 두고,
              논의는 주제별로 나눠 정리했습니다. 원본 녹취 전문은 <code className="px-1 py-0.5 rounded bg-zinc-100 text-[12px]">sources/raw-notes/</code>에
              불변 보존되며, 회의록에는 실명 대신 역할 라벨을 씁니다.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-hig-md">
            <span className="text-xs font-medium text-zinc-600">총 회의</span>
            <span className="text-sm font-mono font-bold text-zinc-900">{MEETINGS.length}</span>
          </div>
        </div>
      </div>

      {/* ── 2-column: 좌측 목록 + 우측 본문 ───────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-5 items-start">
        {/* 좌측: 회의 목록 (확장 대비) */}
        <aside className="space-y-3 xl:sticky xl:top-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="회의·날짜·태그 검색"
              className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-zinc-200 rounded-hig-md focus:outline-none focus:ring-2 focus:ring-hig-blue/30 focus:border-hig-blue/40"
            />
          </div>
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-xs text-zinc-500 px-2 py-4 text-center">검색 결과가 없습니다.</p>
            ) : (
              filtered.map(mtg => (
                <MeetingListItem
                  key={mtg.id}
                  mtg={mtg}
                  active={selected?.id === mtg.id}
                  onClick={() => setSelectedId(mtg.id)}
                />
              ))
            )}
          </div>
        </aside>

        {/* 우측: 선택된 회의록 본문 */}
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
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  {selected.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-400" />
                  참석 {selected.attendees.count}명
                </span>
              </div>

              {selected.summary && (
                <p className="text-[15px] leading-relaxed text-zinc-700 mb-4">{selected.summary}</p>
              )}

              {/* 개요 표 */}
              {selected.meta?.length > 0 && (
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-4 p-4 bg-zinc-50/70 border border-zinc-200 rounded-hig-md">
                  {selected.meta.map(m => (
                    <div key={m.label} className="flex items-baseline gap-2 text-[13px]">
                      <dt className="flex-shrink-0 w-12 font-medium text-zinc-500">{m.label}</dt>
                      <dd className="text-zinc-700">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {/* 참석자 */}
              {selected.attendees?.roster?.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">참석자 (역할은 발언 맥락상 추정)</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1">
                    {selected.attendees.roster.map(p => (
                      <li key={p.label} className="flex items-baseline gap-2 text-[13px]">
                        <span className="flex-shrink-0 font-mono font-medium text-zinc-500">{p.label}</span>
                        <span className="text-zinc-700">{p.role}</span>
                      </li>
                    ))}
                  </ul>
                  {selected.attendees.note && (
                    <p className="mt-2 text-xs leading-relaxed text-zinc-500">{selected.attendees.note}</p>
                  )}
                </div>
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
                  <SourceLink source={`원본 녹취: ${selected.source}`} prefix="" className="text-xs text-zinc-500" />
                </div>
              )}
            </article>

            {/* 결정·액션·미결 */}
            <OutcomePanel meeting={selected} />

            {/* 핵심 발언 — 크게 강조 */}
            {selected.keyQuotes?.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-4 h-4 text-zinc-500" />
                  <h2 className="text-sm font-semibold text-zinc-800 uppercase tracking-wider">핵심 발언</h2>
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
                  <h2 className="text-sm font-semibold text-zinc-800">논의 목차</h2>
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
              원본 녹취 전문은{' '}
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

            {/* trailing spacer — 하단 짧은 섹션도 목차 클릭 시 최상단 정렬되도록 */}
            <div aria-hidden className="h-[70vh]" />
          </div>
        )}
      </div>
    </div>
  )
}
