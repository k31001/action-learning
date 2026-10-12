import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Clapperboard, FileDown, FileText, MonitorPlay, Play, Presentation, X } from 'lucide-react'
import { PRESENTATIONS, VIDEOS } from '../data/presentations'
import { PREVIEW_SLIDES } from '../data/presentationPreviews'
import { getHashSegments, useHashSegment } from '../hooks/useHashRoute'

// 발표자료 탭 — 최근 만든 주요 덱: 웹에서 보기(슬라이드 이미지) + PPTX 내려받기
// 영상: 웹에서 재생(장 이동) + MP4 내려받기 — 사본 public/videos/ (sync-presentations.mjs)
// 원본 outputs/presentation/ → 배포 사본 public/presentations/ (sync-presentations.mjs)
// 웹 보기 이미지 public/presentations/<id>/slide-NN.jpg (render-presentation-previews.py)
// 딥링크: #/presentations/<덱 id>/<장 번호> · #/presentations/<영상 id>/<장 번호>

const slideSrc = (id, n) => `/presentations/${id}/slide-${String(n).padStart(2, '0')}.jpg`
const fmtT = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

function VideoPlayer({ video, onClose }) {
  const ref = useRef(null)
  const chapters = video.chapters
  const initial = Math.min(Math.max(parseInt(getHashSegments()[2], 10) || 1, 1), chapters.length)
  const [ch, setCh] = useState(initial)
  const pending = useRef(initial > 1 ? initial : 0) // 딥링크 첫 이동이 끝나기 전엔 재생 위치로 장을 덮어쓰지 않는다

  // 딥링크 장으로 첫 이동 — 메타데이터가 이미 로드됐으면 바로, 아니면 로드 직후
  useEffect(() => {
    const v = ref.current
    if (!v || !pending.current) return
    const go = () => { v.currentTime = chapters[pending.current - 1][1] }
    if (v.readyState >= 1) go()
    else { v.addEventListener('loadedmetadata', go, { once: true }); return () => v.removeEventListener('loadedmetadata', go) }
  }, [chapters])

  const seek = useCallback(i => {
    const v = ref.current
    if (!v) return
    v.currentTime = chapters[i - 1][1]
    v.play().catch(() => {})
  }, [chapters])

  // 재생 위치 → 현재 장 (URL에 반영, 히스토리는 쌓지 않음)
  const onTime = () => {
    const t = ref.current?.currentTime ?? 0
    if (pending.current) { if (t >= chapters[pending.current - 1][1] - 0.5) pending.current = 0; else return }
    let i = 1
    chapters.forEach(([, s], k) => { if (t >= s - 0.05) i = k + 1 })
    if (i !== ch) setCh(i)
  }
  useEffect(() => {
    window.history.replaceState(null, '', `#/presentations/${encodeURIComponent(video.id)}/${ch}`)
  }, [video.id, ch])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950" role="dialog" aria-modal="true" aria-label={video.title}>
      <div className="flex items-center gap-3 px-5 py-3 text-white">
        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: video.accent }} />
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{video.title}</p>
          <p className="text-[11px] text-zinc-400">{ch} / {chapters.length} · {chapters[ch - 1][0]}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href={`/videos/${video.file}`} download
             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold bg-white/10 hover:bg-white/20">
            <FileDown size={14} /> MP4
          </a>
          <button onClick={onClose} aria-label="닫기" className="p-2 rounded-hig-md hover:bg-white/10">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16">
        <video
          ref={ref}
          src={`/videos/${video.file}`}
          poster={`/videos/${video.poster}`}
          controls
          autoPlay
          playsInline
          preload="metadata"
          onTimeUpdate={onTime}
          className="max-h-full max-w-full rounded shadow-2xl bg-black"
        />
      </div>
      <div className="overflow-x-auto px-5 py-3">
        <div className="flex gap-1.5 w-max mx-auto">
          {chapters.map(([name, t], k) => (
            <button
              key={k}
              onClick={() => seek(k + 1)}
              className={`shrink-0 px-2.5 py-1 rounded text-[11px] transition ${k + 1 === ch ? 'bg-white text-zinc-900 font-semibold' : 'bg-white/10 text-zinc-300 hover:bg-white/20'}`}
            >
              <span className="font-mono opacity-70 mr-1">{fmtT(t)}</span>{name}
            </button>
          ))}
        </div>
      </div>
      <p className="pb-2 text-center text-[10px] text-zinc-500">장 버튼으로 구간 이동 · <span className="hidden sm:inline">Esc 닫기 · </span>소리가 있습니다(내레이션 · 배경음악)</p>
    </div>,
    document.body,
  )
}

function VideoCard({ video, latest, onOpen }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 overflow-hidden flex flex-col">
      <div className="h-1.5" style={{ backgroundColor: video.accent }} />
      <button onClick={() => onOpen(1)} className="group relative block bg-zinc-100" aria-label={`${video.title} 재생`}>
        <img src={`/videos/${video.poster}`} alt="" loading="lazy" className="w-full aspect-video object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-zinc-900/10 group-hover:bg-zinc-900/35 transition-colors">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-zinc-900 shadow-hig-2 group-hover:scale-105 transition-transform">
            <Play size={24} className="ml-0.5" fill="currentColor" />
          </span>
        </span>
        <span className="absolute right-2 bottom-2 px-1.5 py-0.5 rounded bg-zinc-900/80 text-[11px] font-mono text-white">{video.duration}</span>
      </button>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span className="font-mono">{video.date}</span>
          {video.version && <span className="px-1.5 py-0.5 rounded font-mono ring-1 ring-zinc-200">{video.version}</span>}
          <span className="inline-flex items-center gap-1"><Clapperboard size={12} /> 영상</span>
          {latest && <span className="ml-auto px-2 py-0.5 rounded-full bg-hig-blue/10 text-hig-blue font-semibold">최신</span>}
        </div>
        <h3 className="text-[15px] font-semibold text-zinc-900 leading-snug">{video.title}</h3>
        <p className="text-xs text-zinc-600 leading-relaxed">{video.summary}</p>
        <ol className="flex flex-wrap gap-1">
          {video.chapters.map(([name, t], i) => (
            <li key={i}>
              <button onClick={() => onOpen(i + 1)} className="px-2 py-0.5 text-[10px] rounded bg-zinc-100 text-zinc-600 hover:bg-zinc-200">
                <span className="font-mono opacity-70">{fmtT(t)}</span> {name}
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-auto pt-2 flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpen(1)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold text-white shadow-hig-1 hover:opacity-90"
            style={{ backgroundColor: video.accent }}
          >
            <Play size={14} /> 재생
          </button>
          <a
            href={`/videos/${video.file}`}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold ring-1 hover:bg-zinc-50"
            style={{ color: video.accent, '--tw-ring-color': video.accent }}
          >
            <FileDown size={14} /> MP4
          </a>
          {video.spec && (
            <a href={video.spec} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-hig-md text-xs text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50">
              <FileText size={13} /> 설계 문서
            </a>
          )}
          {video.report && (
            <a href={video.report} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-hig-md text-xs text-zinc-600 ring-1 ring-zinc-200 hover:bg-zinc-50">
              <FileText size={13} /> 근거 문서
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function Viewer({ deck, onClose }) {
  const total = PREVIEW_SLIDES[deck.id] ?? 0
  const initial = Math.min(Math.max(parseInt(getHashSegments()[2], 10) || 1, 1), total)
  const [n, setN] = useState(initial)

  const go = useCallback(next => setN(Math.min(Math.max(next, 1), total)), [total])

  // 장 번호를 URL에 반영 (히스토리는 쌓지 않음)
  useEffect(() => {
    window.history.replaceState(null, '', `#/presentations/${encodeURIComponent(deck.id)}/${n}`)
  }, [deck.id, n])

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(n + 1) }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(n - 1) }
      else if (e.key === 'Home') go(1)
      else if (e.key === 'End') go(total)
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [n, total, go, onClose])

  // 다음 장 미리 받기
  useEffect(() => {
    if (n < total) new Image().src = slideSrc(deck.id, n + 1)
  }, [deck.id, n, total])

  // 터치 스와이프 (모바일)
  const touchX = useRef(null)
  const onTouchStart = e => { touchX.current = e.touches[0].clientX }
  const onTouchEnd = e => {
    if (touchX.current == null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (Math.abs(dx) > 40) go(dx < 0 ? n + 1 : n - 1)
    touchX.current = null
  }

  const navBtn = 'absolute top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white/90 text-zinc-800 shadow-hig-2 hover:bg-white disabled:opacity-0 transition-opacity hidden sm:flex'

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col bg-zinc-950" role="dialog" aria-modal="true" aria-label={deck.title}>
      <div className="flex items-center gap-3 px-5 py-3 text-white">
        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: deck.accent }} />
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{deck.title}</p>
          <p className="text-[11px] text-zinc-400">
            {n} / {total}{deck.chapters[n - 1] ? ` · ${deck.chapters[n - 1]}` : ''}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href={`/presentations/${deck.file}`} download
             className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold bg-white/10 hover:bg-white/20">
            <FileDown size={14} /> PPTX
          </a>
          <button onClick={onClose} aria-label="닫기" className="p-2 rounded-hig-md hover:bg-white/10">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img
          key={n}
          src={slideSrc(deck.id, n)}
          alt={`${deck.title} ${n}장`}
          className="max-h-full max-w-full object-contain rounded shadow-2xl bg-white"
        />
        <button className={`${navBtn} left-3`} onClick={() => go(n - 1)} disabled={n <= 1} aria-label="이전 장">
          <ChevronLeft size={22} />
        </button>
        <button className={`${navBtn} right-3`} onClick={() => go(n + 1)} disabled={n >= total} aria-label="다음 장">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="overflow-x-auto px-5 py-3">
        <div className="flex gap-2 w-max mx-auto">
        {Array.from({ length: total }, (_, i) => i + 1).map(i => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`shrink-0 rounded overflow-hidden ring-2 transition ${i === n ? 'ring-white' : 'ring-transparent opacity-50 hover:opacity-90'}`}
            aria-label={`${i}장`}
          >
            <img src={slideSrc(deck.id, i)} alt="" loading="lazy" className="h-14 w-auto block" />
          </button>
        ))}
        </div>
      </div>
      <p className="pb-2 text-center text-[10px] text-zinc-500"><span className="hidden sm:inline">← → 넘기기 · Esc 닫기 · </span><span className="sm:hidden">좌우로 밀어 넘기기 · </span>웹 보기는 미리보기 이미지이며 원본 서식 · 노트는 PPTX에서</p>
    </div>,
    document.body,
  )
}

function DeckCard({ deck, latest, onOpen }) {
  const hasPreview = (PREVIEW_SLIDES[deck.id] ?? 0) > 0
  return (
    <div className="bg-white border border-zinc-200 rounded-hig-lg shadow-hig-1 overflow-hidden flex flex-col">
      <div className="h-1.5" style={{ backgroundColor: deck.accent }} />
      {hasPreview && (
        <button onClick={onOpen} className="group relative block bg-zinc-100" aria-label={`${deck.title} 웹에서 보기`}>
          <img src={slideSrc(deck.id, 1)} alt="" loading="lazy" className="w-full aspect-video object-cover" />
          <span className="absolute inset-0 flex items-center justify-center bg-zinc-900/0 group-hover:bg-zinc-900/35 transition-colors">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-semibold text-zinc-900 shadow-hig-2">
              <MonitorPlay size={14} /> 웹에서 보기
            </span>
          </span>
        </button>
      )}
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
          {hasPreview && (
            <button
              onClick={onOpen}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold text-white shadow-hig-1 hover:opacity-90"
              style={{ backgroundColor: deck.accent }}
            >
              <MonitorPlay size={14} /> 웹에서 보기
            </button>
          )}
          <a
            href={`/presentations/${deck.file}`}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-hig-md text-xs font-semibold ring-1 hover:bg-zinc-50"
            style={{ color: deck.accent, '--tw-ring-color': deck.accent }}
          >
            <FileDown size={14} /> PPTX
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
  const ids = [...VIDEOS.map(v => v.id), ...PRESENTATIONS.map(d => d.id)]
  const [openId, setOpenId] = useHashSegment(1, '', ids)
  const openDeck = PRESENTATIONS.find(d => d.id === openId)
  const openVideo = VIDEOS.find(v => v.id === openId)
  // 최신 표시: 덱·영상 중 날짜가 가장 늦은 항목 하나
  const newest = [...VIDEOS, ...PRESENTATIONS].reduce((a, b) => (b.date > a.date ? b : a)).id
  const openVideoAt = (id, ch) => { window.location.hash = `#/presentations/${encodeURIComponent(id)}/${ch}` }

  return (
    <div className="space-y-5">
      <div className="flex items-end gap-3">
        <Presentation size={22} className="text-hig-blue" />
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 tracking-tight">발표자료</h2>
          <p className="text-xs text-zinc-500">최근 만든 주요 덱과 영상 · 위키에서 생성한 빌드 산출물 (최신이 위) · 썸네일을 누르면 웹에서 바로 봅니다</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {VIDEOS.map(v => (
          <VideoCard key={v.id} video={v} latest={v.id === newest} onOpen={ch => openVideoAt(v.id, ch)} />
        ))}
        {PRESENTATIONS.map(d => (
          <DeckCard key={d.id} deck={d} latest={d.id === newest} onOpen={() => setOpenId(d.id)} />
        ))}
      </div>
      <p className="text-[11px] text-zinc-400">
        원본과 생성기는 저장소 outputs/presentation/ (덱) · outputs/motion/ (영상) 에 있습니다. 덱이나 영상을 다시 만들면 node scripts/sync-presentations.mjs 와 .venv/bin/python scripts/render-presentation-previews.py 로 이 탭의 파일과 웹 보기 이미지를 맞춥니다.
      </p>
      {openDeck && <Viewer key={openDeck.id} deck={openDeck} onClose={() => setOpenId('')} />}
      {openVideo && <VideoPlayer key={openVideo.id} video={openVideo} onClose={() => setOpenId('')} />}
    </div>
  )
}
