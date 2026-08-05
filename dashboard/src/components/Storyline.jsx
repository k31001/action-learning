import { useEffect, useRef } from 'react'
import { useHashSegment } from '../hooks/useHashRoute'
import { BookOpen, GitBranch, CalendarClock } from 'lucide-react'
import {
  STORYLINE_META, STORYLINE_FLOW, STORYLINE_TIMELINE, STORYLINE_CHAPTERS,
} from '../data/storyline'
import SourceLink from './SourceLink'

// ── 본문 블록 렌더러 (Interviews.jsx Block 계열 + refs 각주) ─────────────────
function Block({ block }) {
  const body = (() => {
    switch (block.type) {
      case 'h':
        return (
          <h4 className="text-sm font-semibold text-zinc-900 mt-5 mb-2 tracking-tight">
            {block.text}
          </h4>
        )
      case 'p':
        return <p className="text-[15px] leading-relaxed text-zinc-700">{block.text}</p>
      case 'ul':
        return (
          <ul className="space-y-1.5 ml-1">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-zinc-700">
                <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-hig-blue/60" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol className="space-y-2">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed text-zinc-700">
                <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[11px] font-semibold">
                  {i + 1}
                </span>
                <span>{it}</span>
              </li>
            ))}
          </ol>
        )
      case 'quote':
        return (
          <blockquote className="pl-5 pr-4 py-3 border-l-4 border-hig-blue bg-sky-50/70 rounded-r-hig-md">
            <p className="text-[15px] leading-relaxed text-zinc-800 font-medium italic">{block.text}</p>
            {block.context && (
              <p className="mt-1.5 text-xs text-zinc-500">— {block.context}</p>
            )}
          </blockquote>
        )
      default:
        return null
    }
  })()
  return (
    <div className="mb-3">
      {body}
      {block.refs && (
        <SourceLink source={block.refs} prefix="" className="text-[11px] text-zinc-400 mt-1" />
      )}
    </div>
  )
}

// ── 스토리 플로우 다이어그램 (손수 SVG 가로 체인) ────────────────────────────
const NODE_W = 158
const NODE_H = 96
const NODE_GAP = 30
const FLOW_W = STORYLINE_FLOW.length * NODE_W + (STORYLINE_FLOW.length - 1) * NODE_GAP
const FLOW_H = NODE_H + 44 // 하단 피드백 루프 여백

function FlowDiagram({ activeChapter, onSelect }) {
  const scnIdx = STORYLINE_FLOW.findIndex(s => s.id === 'scenarios')
  const ewiIdx = STORYLINE_FLOW.length - 1
  const xOf = i => i * (NODE_W + NODE_GAP)
  const midY = NODE_H / 2
  return (
    <div className="overflow-x-auto pb-1">
      <svg
        viewBox={`0 0 ${FLOW_W} ${FLOW_H}`}
        style={{ minWidth: FLOW_W * 0.72 }}
        className="w-full h-auto select-none"
        role="list"
        aria-label="스토리 플로우"
      >
        <defs>
          <marker id="sl-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="#a1a1aa" />
          </marker>
          <marker id="sl-arrow-dash" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="#c4b5fd" />
          </marker>
        </defs>

        {/* 단계 간 화살표 */}
        {STORYLINE_FLOW.slice(0, -1).map((_, i) => (
          <line
            key={i}
            x1={xOf(i) + NODE_W + 2} y1={midY}
            x2={xOf(i + 1) - 4} y2={midY}
            stroke="#a1a1aa" strokeWidth="1.6" markerEnd="url(#sl-arrow)"
          />
        ))}

        {/* EWI → 시나리오 재평가 피드백 루프 (점선) */}
        <path
          d={`M ${xOf(ewiIdx) + NODE_W / 2} ${NODE_H + 4}
              L ${xOf(ewiIdx) + NODE_W / 2} ${NODE_H + 26}
              L ${xOf(scnIdx) + NODE_W / 2} ${NODE_H + 26}
              L ${xOf(scnIdx) + NODE_W / 2} ${NODE_H + 8}`}
          fill="none" stroke="#c4b5fd" strokeWidth="1.4" strokeDasharray="5 4"
          markerEnd="url(#sl-arrow-dash)"
        />
        <text
          x={(xOf(scnIdx) + xOf(ewiIdx) + NODE_W) / 2} y={NODE_H + 22}
          textAnchor="middle" className="fill-violet-400" fontSize="10"
        >
          신호 발생 시 확률·전략 재평가
        </text>

        {/* 단계 노드 */}
        {STORYLINE_FLOW.map((stage, i) => {
          const active = activeChapter === stage.chapterId
          return (
            <g
              key={stage.id}
              role="listitem"
              transform={`translate(${xOf(i)}, 0)`}
              onClick={() => onSelect(stage.chapterId)}
              className="cursor-pointer"
            >
              <rect
                width={NODE_W} height={NODE_H} rx="12"
                fill="#ffffff"
                stroke={active ? stage.color : '#e4e4e7'}
                strokeWidth={active ? 2 : 1.2}
              />
              <rect width={NODE_W} height="5" rx="2.5" y="0" fill={stage.color} />
              <text x="12" y="26" fontSize="10" fontWeight="600" fill={stage.color}>
                {String(i + 1).padStart(2, '0')}
              </text>
              <text x="12" y="46" fontSize="13.5" fontWeight="700" fill="#18181b">
                {stage.label}
              </text>
              <text x="12" y="64" fontSize="10.5" fill="#71717a">
                {stage.sub}
              </text>
              <text x="12" y="82" fontSize="9" fill="#a1a1aa">
                {stage.chapterId.replace('ch', '')}장으로 이동 →
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── 연대기 스트립 ────────────────────────────────────────────────────────────
function TimelineStrip({ onSelect }) {
  return (
    <div className="overflow-x-auto">
      <div className="relative flex min-w-[880px] pt-1 pb-2">
        <div className="absolute left-0 right-0 top-[13px] h-px bg-zinc-200" />
        {STORYLINE_TIMELINE.map((ev, i) => (
          <button
            key={i}
            onClick={() => onSelect(ev.chapterId)}
            className="relative flex-1 px-2 text-left group"
            title={`${ev.chapterId.replace('ch', '')}장으로 이동`}
          >
            <span className="relative z-10 block w-2.5 h-2.5 rounded-full bg-white border-2 border-hig-blue group-hover:bg-hig-blue transition-colors" />
            <div className="mt-2 text-[11px] font-mono font-semibold text-zinc-500">{ev.date}</div>
            <div className="text-[13px] font-semibold text-zinc-800 leading-tight mt-0.5 group-hover:text-hig-blue transition-colors">
              {ev.label}
            </div>
            <div className="text-[11px] text-zinc-500 leading-snug mt-0.5">{ev.detail}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── 장(章) 카드 ──────────────────────────────────────────────────────────────
function ChapterCard({ chapter }) {
  const stage = STORYLINE_FLOW.find(s => s.chapterId === chapter.id)
  return (
    <section
      id={chapter.id}
      className="scroll-mt-24 bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6"
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold text-white"
          style={{ backgroundColor: stage?.color ?? '#71717a' }}
        >
          {chapter.kicker}
        </span>
        <span className="text-[11px] font-mono text-zinc-400">{chapter.num}장</span>
      </div>
      <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-4">{chapter.title}</h2>
      {chapter.blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
      {chapter.sources && (
        <div className="mt-4 pt-3 border-t border-zinc-100">
          <SourceLink source={chapter.sources} prefix="피딩 위키: " />
        </div>
      )}
    </section>
  )
}

// ── 메인 ─────────────────────────────────────────────────────────────────────
const CHAPTER_IDS = STORYLINE_CHAPTERS.map(c => c.id)

export default function Storyline() {
  const [chapter, setChapter] = useHashSegment(1, '', CHAPTER_IDS)
  const didMount = useRef(false)

  // 딥링크(#/storyline/ch4) 진입 또는 해시 변경 시 해당 장으로 스크롤
  useEffect(() => {
    if (!chapter) return
    const el = document.getElementById(chapter)
    if (el) el.scrollIntoView({ behavior: didMount.current ? 'smooth' : 'auto', block: 'start' })
    didMount.current = true
  }, [chapter])

  const goTo = id => {
    if (id === chapter) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setChapter(id)
    }
  }

  return (
    <div className="space-y-5">
      {/* 헤더 + 논지 */}
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4.5 h-4.5 text-hig-blue" size={18} />
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">{STORYLINE_META.title}</h1>
          <span className="ml-auto text-[11px] font-mono text-zinc-400">기준일 {STORYLINE_META.asof}</span>
        </div>
        <p className="text-[15px] leading-relaxed text-zinc-700">
          <span className="font-semibold text-zinc-900">한 문장 논지 — </span>
          {STORYLINE_META.thesis}
        </p>
        <SourceLink source={`단일 소스: ${STORYLINE_META.wikiSource} (위키에 새 내용이 들어오면 이 서사도 함께 갱신)`} prefix="" className="text-xs text-zinc-400 mt-2" />
      </div>

      {/* 스토리 플로우 */}
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-5">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch size={15} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900">스토리 흐름 한눈에</h3>
          <span className="text-[11px] text-zinc-400">단계를 클릭하면 해당 장으로 이동</span>
        </div>
        <FlowDiagram activeChapter={chapter} onSelect={goTo} />
      </div>

      {/* 연대기 */}
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-5">
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock size={15} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900">연대기 — 2023 AI 붐에서 2035 시나리오 지평까지</h3>
        </div>
        <TimelineStrip onSelect={goTo} />
      </div>

      {/* 본문 8장 */}
      {STORYLINE_CHAPTERS.map(ch => (
        <ChapterCard key={ch.id} chapter={ch} />
      ))}
    </div>
  )
}
