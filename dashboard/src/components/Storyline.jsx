import { useEffect, useRef } from 'react'
import { useHashSegment, getHashSegments } from '../hooks/useHashRoute'
import { BookOpen, GitBranch, CalendarClock, Telescope } from 'lucide-react'
import {
  STORYLINE_META, STORYLINE_FLOW, STORYLINE_TIMELINE, STORYLINE_CHAPTERS,
} from '../data/storyline'
import { STORYLINE_LENSES } from '../data/storylineLenses'
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

// ── 스토리 플로우 다이어그램 (시나리오 플래닝 — 손수 SVG 가로 체인) ─────────
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

// ── 장(章) 카드 (시나리오 플래닝) ────────────────────────────────────────────
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

// ── 렌즈 시각화 3종 ──────────────────────────────────────────────────────────

// 파이브 포스 십자 다이어그램 (SVG)
function ForcesDiagram({ visual }) {
  const W = 680; const H = 400
  const CW = 220; const CH = 92 // 중앙 박스
  const FW = 200; const FH = 78 // 힘 박스
  const cx = (W - CW) / 2; const cy = (H - CH) / 2
  const posOf = {
    top:    { x: (W - FW) / 2, y: 8 },
    bottom: { x: (W - FW) / 2, y: H - FH - 8 },
    left:   { x: 8, y: (H - FH) / 2 },
    right:  { x: W - FW - 8, y: (H - FH) / 2 },
  }
  const arrowOf = {
    top:    { x1: W / 2, y1: 8 + FH, x2: W / 2, y2: cy - 6 },
    bottom: { x1: W / 2, y1: H - FH - 8, x2: W / 2, y2: cy + CH + 6 },
    left:   { x1: 8 + FW, y1: H / 2, x2: cx - 6, y2: H / 2 },
    right:  { x1: W - FW - 8, y1: H / 2, x2: cx + CW + 6, y2: H / 2 },
  }
  return (
    <div className="overflow-x-auto pb-1">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ minWidth: 560 }} className="w-full h-auto select-none" aria-label="파이브 포스 다이어그램">
        <defs>
          <marker id="ff-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="#a1a1aa" />
          </marker>
        </defs>
        {visual.forces.map(f => {
          const a = arrowOf[f.pos]
          return (
            <line key={`a-${f.pos}`} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke="#a1a1aa" strokeWidth="1.6" markerEnd="url(#ff-arrow)" />
          )
        })}
        {/* 중앙 */}
        <g transform={`translate(${cx}, ${cy})`}>
          <rect width={CW} height={CH} rx="12" fill="#18181b" />
          <text x={CW / 2} y="38" textAnchor="middle" fontSize="14.5" fontWeight="700" fill="#ffffff">{visual.center.label}</text>
          <text x={CW / 2} y="60" textAnchor="middle" fontSize="10.5" fill="#a1a1aa">{visual.center.sub}</text>
        </g>
        {/* 4개 힘 */}
        {visual.forces.map(f => {
          const p = posOf[f.pos]
          return (
            <g key={f.pos} transform={`translate(${p.x}, ${p.y})`}>
              <rect width={FW} height={FH} rx="12" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.2" />
              <rect width={FW} height="5" rx="2.5" fill={f.color} />
              <text x="12" y="27" fontSize="12.5" fontWeight="700" fill="#18181b">{f.label}</text>
              <text x="12" y="44" fontSize="10" fill="#71717a">{f.sub}</text>
              <text x="12" y="62" fontSize="10.5" fontWeight="600" fill={f.color}>{f.level}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// 단계 체인 (게임이론 — 게임의 진화)
function LensChain({ visual }) {
  const n = visual.stages.length
  const w = n * NODE_W + (n - 1) * NODE_GAP
  const xOf = i => i * (NODE_W + NODE_GAP)
  const midY = NODE_H / 2
  return (
    <div className="overflow-x-auto pb-1">
      <svg viewBox={`0 0 ${w} ${NODE_H + 4}`} style={{ minWidth: w * 0.72 }} className="w-full h-auto select-none" aria-label="단계 체인">
        <defs>
          <marker id="lc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="#a1a1aa" />
          </marker>
        </defs>
        {visual.stages.slice(0, -1).map((_, i) => (
          <line key={i} x1={xOf(i) + NODE_W + 2} y1={midY} x2={xOf(i + 1) - 4} y2={midY}
            stroke="#a1a1aa" strokeWidth="1.6" markerEnd="url(#lc-arrow)"
            strokeDasharray={i === n - 2 ? '5 4' : undefined} />
        ))}
        {visual.stages.map((s, i) => (
          <g key={i} transform={`translate(${xOf(i)}, 0)`}>
            <rect width={NODE_W} height={NODE_H} rx="12" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.2" />
            <rect width={NODE_W} height="5" rx="2.5" fill={s.color} />
            <text x="12" y="30" fontSize="10" fontWeight="600" fill={s.color}>{String(i + 1).padStart(2, '0')}</text>
            <text x="12" y="52" fontSize="13" fontWeight="700" fill="#18181b">{s.label}</text>
            <text x="12" y="72" fontSize="10" fill="#71717a">{s.sub}</text>
          </g>
        ))}
      </svg>
    </div>
  )
}

// 2×2 카드 그리드 (실물옵션·파괴적 혁신)
function LensGrid({ visual }) {
  return (
    <div>
      {visual.note && (
        <p className="text-xs text-zinc-500 mb-3">{visual.note}</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visual.cells.map((c, i) => (
          <div key={i} className="rounded-hig-lg border border-zinc-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
              <h4 className="text-[13px] font-bold text-zinc-900">{c.label}</h4>
            </div>
            <p className="text-[13px] leading-relaxed text-zinc-600">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 렌즈 뷰 (파이브 포스·게임이론·실물옵션·파괴적 혁신 공통) ─────────────────
function LensView({ lens }) {
  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
        <div className="flex items-center gap-2 mb-2">
          <Telescope size={18} style={{ color: lens.color }} />
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            {lens.label} 렌즈 — {lens.title}
          </h1>
        </div>
        <p className="text-[15px] leading-relaxed text-zinc-700">
          <span className="font-semibold text-zinc-900">한 문장 논지 — </span>
          {lens.thesis}
        </p>
        <SourceLink
          source={`단일 소스: ${lens.wikiSource} (같은 위키 지식·지식그래프를 ${lens.label} 프레임워크로 재서사화)`}
          prefix="" className="text-xs text-zinc-400 mt-2"
        />
      </div>

      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-5">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch size={15} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900">{lens.short} — 한눈에</h3>
        </div>
        {lens.visual.kind === 'forces' && <ForcesDiagram visual={lens.visual} />}
        {lens.visual.kind === 'chain' && <LensChain visual={lens.visual} />}
        {lens.visual.kind === 'grid' && <LensGrid visual={lens.visual} />}
      </div>

      {lens.sections.map(sec => (
        <section key={sec.num} className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
          <div className="flex items-center gap-2.5 mb-1">
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold text-white"
              style={{ backgroundColor: lens.color }}
            >
              {lens.label}
            </span>
            <span className="text-[11px] font-mono text-zinc-400">{sec.num}절</span>
          </div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight mb-4">{sec.title}</h2>
          {sec.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </section>
      ))}
    </div>
  )
}

// ── 시나리오 플래닝 뷰 (마스터 서사) ─────────────────────────────────────────
const CHAPTER_IDS = STORYLINE_CHAPTERS.map(c => c.id)

function ScenarioView() {
  const [chapter, setChapter] = useHashSegment(2, '', CHAPTER_IDS)
  const didMount = useRef(false)

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
      // 세그먼트1(서브탭)이 비어 있어도 항상 온전한 경로가 되도록 절대 해시로 설정
      window.location.hash = `#/storyline/scenario/${id}`
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen size={18} className="text-hig-blue" />
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">{STORYLINE_META.title}</h1>
          <span className="ml-auto text-[11px] font-mono text-zinc-400">기준일 {STORYLINE_META.asof}</span>
        </div>
        <p className="text-[15px] leading-relaxed text-zinc-700">
          <span className="font-semibold text-zinc-900">한 문장 논지 — </span>
          {STORYLINE_META.thesis}
        </p>
        <SourceLink source={`단일 소스: ${STORYLINE_META.wikiSource} (위키에 새 내용이 들어오면 이 서사도 함께 갱신)`} prefix="" className="text-xs text-zinc-400 mt-2" />
      </div>

      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-5">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch size={15} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900">스토리 흐름 한눈에</h3>
          <span className="text-[11px] text-zinc-400">단계를 클릭하면 해당 장으로 이동</span>
        </div>
        <FlowDiagram activeChapter={chapter} onSelect={goTo} />
      </div>

      <div className="bg-white border border-zinc-200 rounded-hig-xl shadow-hig-2 p-5">
        <div className="flex items-center gap-2 mb-3">
          <CalendarClock size={15} className="text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900">연대기 — 2023 AI 붐에서 2035 시나리오 지평까지</h3>
        </div>
        <TimelineStrip onSelect={goTo} />
      </div>

      {STORYLINE_CHAPTERS.map(ch => (
        <ChapterCard key={ch.id} chapter={ch} />
      ))}
    </div>
  )
}

// ── 메인 — 서브탭: 시나리오 플래닝(마스터) + 대안 렌즈 4종 ───────────────────
const SUB_TABS = [
  { id: 'scenario', label: '시나리오 플래닝' },
  ...STORYLINE_LENSES.map(l => ({ id: l.id, label: l.label })),
]
const SUB_TAB_IDS = SUB_TABS.map(t => t.id)

export default function Storyline() {
  // 구(舊) 딥링크 #/storyline/chN → #/storyline/scenario/chN 리다이렉트
  useEffect(() => {
    const segs = getHashSegments()
    if (segs[0] === 'storyline' && /^ch\d+$/.test(segs[1] ?? '')) {
      window.history.replaceState(null, '', `#/storyline/scenario/${segs[1]}`)
      window.dispatchEvent(new HashChangeEvent('hashchange'))
    }
  }, [])

  const [tab, setTab] = useHashSegment(1, 'scenario', SUB_TAB_IDS)
  const lens = STORYLINE_LENSES.find(l => l.id === tab)

  return (
    <div>
      <div className="flex gap-1 mb-5 border-b border-zinc-200 overflow-x-auto">
        {SUB_TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition-colors border-b-2 whitespace-nowrap ${
              tab === t.id
                ? 'border-sky-500 text-zinc-900 bg-white/80'
                : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50/60'
            }`}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto self-center flex-shrink-0 text-[11px] text-zinc-400 pr-2 hidden md:inline">
          같은 위키 지식, 다섯 개의 렌즈
        </span>
      </div>

      {tab === 'scenario' ? <ScenarioView /> : lens ? <LensView lens={lens} /> : null}
    </div>
  )
}
