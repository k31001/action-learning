import { useEffect, useRef } from 'react'
import { useHashSegment, getHashSegments } from '../hooks/useHashRoute'
import { BookOpen, GitBranch, CalendarClock, Telescope } from 'lucide-react'
import {
  STORYLINE_META, STORYLINE_FLOW, STORYLINE_TIMELINE, STORYLINE_CHAPTERS,
} from '../data/storyline'
import { STORYLINE_LENSES } from '../data/storylineLenses'
import SourceLink from './SourceLink'
import { GLOSSARY, tokenizeKeys } from '../data/glossary'

// ── 키 코드 렌더러 — RS-1·D6·MB-4 같은 코드에 마우스오버 툴팁 + 딥링크 ──────
function Keyed({ text }) {
  const toks = tokenizeKeys(text)
  if (!toks) return text ?? null
  return toks.map((t, i) => {
    if (!t.key) return t.v
    const g = GLOSSARY[t.v]
    return g.hash ? (
      <a
        key={i}
        href={g.hash}
        title={g.label}
        className="underline decoration-dotted decoration-current/50 underline-offset-2 cursor-help text-inherit hover:opacity-70"
      >
        {t.v}
      </a>
    ) : (
      <span key={i} title={g.label} className="underline decoration-dotted decoration-current/40 underline-offset-2 cursor-help">
        {t.v}
      </span>
    )
  })
}

// ── 본문 블록 렌더러 (Interviews.jsx Block 계열 + refs 각주) ─────────────────
function Block({ block }) {
  const body = (() => {
    switch (block.type) {
      case 'h':
        return (
          <h4 className="text-sm font-semibold text-zinc-900 mt-5 mb-2 tracking-tight">
            <Keyed text={block.text} />
          </h4>
        )
      case 'p':
        return <p className="text-[15px] leading-relaxed text-zinc-700"><Keyed text={block.text} /></p>
      case 'ul':
        return (
          <ul className="space-y-1.5 ml-1">
            {block.items.map((it, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-zinc-700">
                <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-hig-blue/60" />
                <span><Keyed text={it} /></span>
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
                <span><Keyed text={it} /></span>
              </li>
            ))}
          </ol>
        )
      case 'quote':
        return (
          <blockquote className="pl-5 pr-4 py-3 border-l-4 border-hig-blue bg-sky-50/70 rounded-r-hig-md">
            <p className="text-[15px] leading-relaxed text-zinc-800 font-medium italic"><Keyed text={block.text} /></p>
            {block.context && (
              <p className="mt-1.5 text-xs text-zinc-500">— <Keyed text={block.context} /></p>
            )}
          </blockquote>
        )
      case 'strategy':
        // 렌즈별 최적 전략 카드 — rank·name + 무엇을/왜 + 내부 탭 링크 + 출처
        return (
          <div className="space-y-3 my-4">
            {block.items.map(item => (
              <div key={item.rank} className="rounded-hig-lg border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3 mb-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-[12px] font-bold">
                    {item.rank}
                  </span>
                  <h5 className="text-[14px] font-bold text-zinc-900 leading-snug pt-1"><Keyed text={item.name} /></h5>
                </div>
                <p className="text-[14px] leading-relaxed text-zinc-700 mb-2">
                  <span className="font-semibold text-zinc-500">무엇을 하자는 것인가 — </span>
                  <Keyed text={item.what} />
                </p>
                <p className="text-[14px] leading-relaxed text-zinc-700">
                  <span className="font-semibold text-zinc-500">왜 이 순위인가 — </span>
                  <Keyed text={item.why} />
                </p>
                {(item.links?.length || item.refs) && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-100 space-y-1.5">
                    {item.links?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.links.map((l, i) => (
                          <a
                            key={i}
                            href={l.hash}
                            className="inline-flex items-center px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-medium hover:bg-sky-100 transition-colors"
                          >
                            {l.label} →
                          </a>
                        ))}
                      </div>
                    )}
                    {item.refs && (
                      <SourceLink source={item.refs} className="text-[11px] text-zinc-400" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      case 'matrix':
        // M×C→O 매트릭스 — 행=메커니즘(M), 열=맥락(C), 셀=결과(O). tone으로 효과 색 구분 (CMO 렌즈 §5)
        return (
          <div className="my-4">
            <div className="overflow-x-auto rounded-hig-md border border-zinc-200">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr className="bg-zinc-50">
                    {block.headers.map((h, i) => (
                      <th key={i} className="text-left px-3 py-2 font-semibold text-zinc-700 border-b border-zinc-200 min-w-[9rem]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri}>
                      <td className="px-3 py-2 align-top font-semibold text-zinc-900 border-b border-zinc-100 bg-white min-w-[11rem]">
                        <Keyed text={row.label} />
                      </td>
                      {row.cells.map((cell, ci) => {
                        const tone = {
                          clear: 'bg-emerald-600 text-white font-medium',
                          clearSoft: 'bg-emerald-50 text-emerald-900',
                          partial: 'bg-amber-50 text-amber-900',
                          adverse: 'bg-white text-red-800 border-l-4 !border-l-red-500',
                          none: 'bg-zinc-50 text-zinc-300',
                        }[cell.tone] || 'bg-white text-zinc-700'
                        return (
                          <td key={ci} className={`px-3 py-2 align-top border-b border-zinc-100 border-l border-l-zinc-100 leading-snug ${cell.parts ? 'bg-white text-zinc-700' : tone}`}>
                            {cell.parts ? (
                              // 원인 조건부 O — 셀 내부를 원인별 변이로 분해 (예측 매트릭스 CMO-4)
                              <div className="space-y-1">
                                {cell.text && <p className="text-[11px] font-bold text-zinc-500">{cell.text}</p>}
                                {cell.parts.map((pt, pi) => {
                                  const pTone = {
                                    clear: 'bg-emerald-600 text-white',
                                    clearSoft: 'bg-emerald-50 text-emerald-900',
                                    partial: 'bg-amber-50 text-amber-900',
                                    adverse: 'bg-red-50 text-red-800',
                                  }[pt.tone] || 'bg-zinc-50 text-zinc-600'
                                  return (
                                    <div key={pi} className={`rounded px-1.5 py-1 text-[12px] leading-snug ${pTone}`}>
                                      <span className="font-bold mr-1">{pt.tag}</span>
                                      <Keyed text={pt.text} />
                                    </div>
                                  )
                                })}
                              </div>
                            ) : (cell.text ? <Keyed text={cell.text} /> : '—')}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {block.legend && (
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] text-zinc-500">
                <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-600" /> 효과 분명 ◎ (primary)</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-50 border border-emerald-300" /> ◎ 참조 셀 (중복 계상 방지)</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-50 border border-amber-300" /> 조건부·부분 △</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-white border-l-4 border-l-red-500 border border-zinc-200" /> 역효과 ✕</span>
                <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-zinc-50 border border-zinc-200" /> 상호작용 없음 —</span>
              </div>
            )}
            {block.footnotes?.length > 0 && (
              <div className="mt-2 space-y-1">
                {block.footnotes.map((f, i) => (
                  <p key={i} className="text-[11px] text-zinc-500 leading-snug">※ {f}</p>
                ))}
              </div>
            )}
          </div>
        )
      case 'trace':
        // 액션 추적 카드 — 과거 액션 → 효과 판정 → 2026 전략 번역 (CMO 렌즈 §5)
        return (
          <div className="space-y-2.5 my-4">
            {block.items.map((item, i) => {
              const verdict = {
                clear: { label: '◎ 효과 분명', cls: 'bg-emerald-100 text-emerald-800' },
                partial: { label: '△ 조건부', cls: 'bg-amber-100 text-amber-800' },
                adverse: { label: '✕ 역효과', cls: 'bg-red-100 text-red-700' },
              }[item.verdict] || { label: item.verdict, cls: 'bg-zinc-100 text-zinc-600' }
              return (
                <div key={i} className="rounded-hig-lg border border-zinc-200 bg-white p-3.5">
                  <div className="flex flex-col md:flex-row md:items-stretch gap-2.5">
                    <div className="md:w-[27%] flex-shrink-0">
                      <p className="text-[11px] font-semibold text-zinc-400 mb-0.5">과거 액션 · {item.period}</p>
                      <p className="text-[13.5px] font-semibold text-zinc-900 leading-snug"><Keyed text={item.action} /></p>
                    </div>
                    <div className="hidden md:flex items-center text-zinc-300 flex-shrink-0">→</div>
                    <div className="md:flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <p className="text-[11px] font-semibold text-zinc-400">효과</p>
                        <span className={`px-1.5 py-px rounded-full text-[10.5px] font-bold ${verdict.cls}`}>
                          {verdict.label}
                        </span>
                      </div>
                      <p className="text-[13px] text-zinc-700 leading-snug"><Keyed text={item.outcome} /></p>
                      {item.reason && (
                        <p className="mt-1 text-[12px] text-zinc-500 leading-snug">
                          <span className="font-semibold">맥락 감사 — </span>
                          <Keyed text={item.reason} />
                        </p>
                      )}
                    </div>
                    <div className="hidden md:flex items-center text-zinc-300 flex-shrink-0">→</div>
                    <div className="md:w-[24%] flex-shrink-0 md:border-l md:border-zinc-100 md:pl-3">
                      <p className="text-[11px] font-semibold text-zinc-400 mb-0.5">2026 전략 번역</p>
                      <p className="text-[13px] font-medium text-sky-800 leading-snug"><Keyed text={item.strategy} /></p>
                    </div>
                  </div>
                  {item.refs && (
                    <div className="mt-2 pt-2 border-t border-zinc-100">
                      <SourceLink source={item.refs} className="text-[11px] text-zinc-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      case 'table':
        return (
          <div className="my-4 overflow-x-auto rounded-hig-md border border-zinc-200">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50">
                  {block.headers.map((h, i) => (
                    <th key={i} className="text-left px-3 py-2 font-semibold text-zinc-700 border-b border-zinc-200 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="even:bg-zinc-50/40">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-3 py-2 align-top text-zinc-700 border-b border-zinc-100 ${ci === 0 ? 'font-medium text-zinc-900' : ''}`}>
                        <Keyed text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
          <Keyed text={lens.thesis} />
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
          <Keyed text={STORYLINE_META.thesis} />
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
