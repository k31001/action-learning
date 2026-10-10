import { FileDown, FileText, Presentation } from 'lucide-react'
import { PRESENTATIONS } from '../data/presentations'

// 발표자료 탭 — 최근 만든 주요 덱을 내려받기 링크로 (원본은 outputs/presentation/, 배포 사본은 public/presentations/)
function DeckCard({ deck, latest }) {
  const href = `/presentations/${deck.file}`
  return (
    <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 overflow-hidden flex flex-col">
      <div className="h-1.5" style={{ backgroundColor: deck.accent }} />
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span className="font-mono">{deck.date}</span>
          {deck.version && (
            <span className="px-1.5 py-0.5 rounded font-mono ring-1 ring-zinc-200">{deck.version}</span>
          )}
          <span>{deck.slides}</span>
          {latest && (
            <span className="ml-auto px-2 py-0.5 rounded-full bg-hig-blue/10 text-hig-blue font-semibold">최신</span>
          )}
        </div>
        <h3 className="text-[15px] font-semibold text-zinc-900 leading-snug">{deck.title}</h3>
        <p className="text-xs text-zinc-600 leading-relaxed">{deck.summary}</p>
        <ol className="flex flex-wrap gap-1">
          {deck.chapters.map((c, i) => (
            <li key={i} className="px-2 py-0.5 text-[10px] rounded bg-zinc-100 text-zinc-600">
              {i + 1}. {c}
            </li>
          ))}
        </ol>
        <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
          <a
            href={href}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold text-white shadow-hig-1 hover:opacity-90"
            style={{ backgroundColor: deck.accent }}
          >
            <FileDown size={14} /> PPTX 내려받기
          </a>
          {deck.outline && (
            <a href={deck.outline} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-hig-md text-xs text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50">
              <FileText size={13} /> 아웃라인
            </a>
          )}
          {deck.report && (
            <a href={deck.report} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-hig-md text-xs text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50">
              <FileText size={13} /> 근거 문서
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Presentations() {
  return (
    <div className="space-y-5">
      <div className="flex items-end gap-3">
        <Presentation size={22} className="text-hig-blue" />
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">발표자료</h2>
          <p className="text-xs text-zinc-500">최근 만든 주요 덱 · 위키에서 생성한 빌드 산출물 (최신이 위)</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {PRESENTATIONS.map((d, i) => <DeckCard key={d.id} deck={d} latest={i === 0} />)}
      </div>
      <p className="text-[11px] text-zinc-400">
        원본과 생성기는 저장소 outputs/presentation/ 에 있습니다. 덱을 다시 만들면 node scripts/sync-presentations.mjs 로 이 탭의 파일을 맞춥니다.
      </p>
    </div>
  )
}
