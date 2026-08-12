// 문서형 콘텐츠 공용 렌더러 — 인터뷰(Interviews)·회의록(MeetingNotes)이 공유한다.
//
// 블록 스키마(데이터 파일 쪽 주석과 동일):
//   { type: 'p'|'h', text } | { type: 'ul'|'ol', items } |
//   { type: 'quote', text, context? } | { type: 'table', headers, rows }

import { Quote } from 'lucide-react'

// ── 섹션 본문 블록 렌더러 ───────────────────────────────────────────────────
export function Block({ block }) {
  switch (block.type) {
    case 'h':
      return (
        <h4 className="text-sm font-semibold text-zinc-900 mt-5 mb-2 tracking-tight">
          {block.text}
        </h4>
      )
    case 'p':
      return <p className="text-[15px] leading-relaxed text-zinc-700 mb-3">{block.text}</p>
    case 'ul':
      return (
        <ul className="space-y-1.5 mb-3 ml-1">
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
        <ol className="space-y-2 mb-3">
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
        <blockquote className="my-4 pl-5 pr-4 py-3 border-l-4 border-hig-blue bg-sky-50/70 rounded-r-hig-md">
          <p className="text-[15px] leading-relaxed text-zinc-800 font-medium italic">{block.text}</p>
          {block.context && (
            <p className="mt-1.5 text-xs text-zinc-500">— {block.context}</p>
          )}
        </blockquote>
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
                      {cell}
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
}

// ── 핵심 인용문 하이라이트 (크게 표시) ──────────────────────────────────────
export function KeyQuote({ quote }) {
  return (
    <figure className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-hig-xl shadow-hig-2 p-6 overflow-hidden">
      <Quote className="absolute -top-2 -left-1 w-16 h-16 text-white/10" strokeWidth={1.5} />
      <blockquote className="relative">
        <p className="text-lg md:text-xl leading-relaxed font-semibold tracking-tight">
          “{quote.text}”
        </p>
      </blockquote>
      {quote.context && (
        <figcaption className="relative mt-3 text-xs font-medium text-zinc-400 uppercase tracking-wider">
          {quote.context}
        </figcaption>
      )}
    </figure>
  )
}
