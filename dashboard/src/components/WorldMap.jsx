import { useEffect, useMemo, useRef, useState } from 'react'
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo'
import { feature } from 'topojson-client'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'
import worldTopo from '../data/world-110m.json'
import { REGION_COLOR, REGION_LABEL, REGION_ORDER, DC_STAGES, DC_BOTTLENECK_STAGES } from '../data/dataCenters'

// ── 투영·지오메트리는 정적 → 모듈 1회 계산 ────────────────────────────────────
const W = 980, H = 500
const PROJECTION = geoEqualEarth().fitExtent([[8, 8], [W - 8, H - 8]], { type: 'Sphere' })
const PATH = geoPath(PROJECTION)
const COUNTRY_PATHS = feature(worldTopo, worldTopo.objects.countries).features.map(f => PATH(f))
const GRATICULE_PATH = PATH(geoGraticule10())
const SPHERE_PATH = PATH({ type: 'Sphere' })

const CONF_DOT = { confirmed: '#10b981', estimate: '#f59e0b', disputed: '#f87171' }
const CONF_LABEL = { confirmed: '확인', estimate: '추정', disputed: '논란' }

const radius = (mw) => Math.max(3, Math.sqrt(mw || 0) * 0.34)
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const clampT = (t) => ({ k: t.k, x: clamp(t.x, W * (1 - t.k), 0), y: clamp(t.y, H * (1 - t.k), 0) })

export default function WorldMap({ dcs, onSelect, selectedId }) {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const dragRef = useRef(null)        // { lx, ly } during drag
  const movedRef = useRef(false)      // 드래그 이동 여부 → 클릭 억제
  const [hover, setHover] = useState(null)
  const [colorBy, setColorBy] = useState('region')   // 'region' | 'stage'
  const [t, setT] = useState({ k: 1, x: 0, y: 0 })

  // 큰 원 먼저 그려 작은 원이 위로(hover·click 용이)
  const markers = useMemo(
    () =>
      dcs
        .filter(d => d.lat != null && d.lng != null)
        .map(d => {
          const p = PROJECTION([d.lng, d.lat])
          return p ? { d, x: p[0], y: p[1] } : null
        })
        .filter(Boolean)
        .sort((a, b) => b.d.mw - a.d.mw),
    [dcs]
  )

  const onMap = markers.length
  const totalGw = (dcs.reduce((a, d) => a + (d.mw || 0), 0) / 1000).toFixed(1)
  const fillOf = (d) => (colorBy === 'stage' ? DC_STAGES[d.stage - 1].color : REGION_COLOR[d.region])

  // 정적 국가 path 는 메모 (pan/zoom 시 재조정 비용 최소화)
  const countryEls = useMemo(
    () => COUNTRY_PATHS.map((d, i) => (
      <path key={i} d={d} fill="#e8edf2" stroke="#ffffff" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
    )),
    []
  )

  // 휠 확대(커서 기준) — page scroll 방지 위해 native non-passive 리스너
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = svg.getBoundingClientRect()
      const vbX = (e.clientX - r.left) * (W / r.width)
      const vbY = (e.clientY - r.top) * (H / r.height)
      setT(prev => {
        const k = clamp(prev.k * (e.deltaY < 0 ? 1.25 : 0.8), 1, 8)
        if (k === prev.k) return prev
        return clampT({ k, x: vbX - (vbX - prev.x) * (k / prev.k), y: vbY - (vbY - prev.y) * (k / prev.k) })
      })
    }
    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [])

  function pos(e) {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return { x: 0, y: 0, cw: W, ch: H }
    return { x: e.clientX - r.left, y: e.clientY - r.top, cw: r.width, ch: r.height }
  }

  function zoomAtCenter(factor) {
    setT(prev => {
      const k = clamp(prev.k * factor, 1, 8)
      if (k === prev.k) return prev
      const cx = W / 2, cy = H / 2
      return clampT({ k, x: cx - (cx - prev.x) * (k / prev.k), y: cy - (cy - prev.y) * (k / prev.k) })
    })
  }

  // 드래그 이동(pan) + 호버 추적
  function onDown(e) { dragRef.current = { lx: e.clientX, ly: e.clientY }; movedRef.current = false }
  function onMove(e) {
    if (dragRef.current) {
      const r = svgRef.current.getBoundingClientRect()
      const dx = (e.clientX - dragRef.current.lx) * (W / r.width)
      const dy = (e.clientY - dragRef.current.ly) * (H / r.height)
      if (Math.hypot(e.clientX - dragRef.current.lx, e.clientY - dragRef.current.ly) > 3) movedRef.current = true
      dragRef.current.lx = e.clientX; dragRef.current.ly = e.clientY
      setT(prev => clampT({ ...prev, x: prev.x + dx, y: prev.y + dy }))
      if (hover) setHover(null)
    } else if (hover) {
      // h 가 null 이면 그대로 null 반환 — leave 와 move 가 한 배치로 묶일 때
      // d 없는 부분 객체가 만들어져 툴팁 렌더에서 크래시하는 것을 방지
      setHover(h => (h ? { ...h, ...pos(e) } : null))
    }
  }
  function endDrag() { dragRef.current = null }

  const reset = () => setT({ k: 1, x: 0, y: 0 })

  return (
    <div ref={wrapRef} className="relative">
      {/* 컨트롤: 색상 기준 토글 (좌상) */}
      <div
        className="absolute z-10 top-1 left-1 flex rounded-md overflow-hidden border border-zinc-300 bg-white/90 backdrop-blur shadow-sm text-[11px]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {[{ k: 'region', l: '권역' }, { k: 'stage', l: '단계' }].map(o => (
          <button
            key={o.k}
            onClick={() => setColorBy(o.k)}
            className={`px-2.5 py-1 font-medium transition-colors ${colorBy === o.k ? 'bg-zinc-800 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
          >
            {o.l}별
          </button>
        ))}
      </div>

      {/* 컨트롤: 줌 (우상) */}
      <div
        className="absolute z-10 top-1 right-1 flex flex-col rounded-md overflow-hidden border border-zinc-300 bg-white/90 backdrop-blur shadow-sm"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button onClick={() => zoomAtCenter(1.5)} title="확대" className="p-1.5 text-zinc-600 hover:bg-zinc-100 border-b border-zinc-200"><ZoomIn size={14} /></button>
        <button onClick={() => zoomAtCenter(1 / 1.5)} title="축소" className="p-1.5 text-zinc-600 hover:bg-zinc-100 border-b border-zinc-200"><ZoomOut size={14} /></button>
        <button onClick={reset} title="초기화" className="p-1.5 text-zinc-600 hover:bg-zinc-100"><Maximize2 size={13} /></button>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none cursor-grab active:cursor-grabbing"
        style={{ maxHeight: 470, touchAction: 'none' }}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={endDrag}
        onMouseLeave={() => { endDrag(); if (hover) setHover(null) }}
      >
        <g transform={`translate(${t.x} ${t.y}) scale(${t.k})`}>
          <path d={SPHERE_PATH} fill="#f8fafc" stroke="#e4e4e7" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
          <path d={GRATICULE_PATH} fill="none" stroke="#eef2f6" strokeWidth={0.4} vectorEffect="non-scaling-stroke" />
          {countryEls}
          {markers.map(({ d, x, y }) => {
            const active = hover?.d.id === d.id
            const sel = d.id === selectedId
            return (
              <circle
                key={d.id}
                cx={x}
                cy={y}
                r={(radius(d.mw) * (active || sel ? 1.28 : 1)) / t.k}
                fill={fillOf(d)}
                fillOpacity={active || sel ? 0.95 : 0.66}
                stroke={sel ? '#0284c7' : '#fff'}
                strokeWidth={sel ? 2.4 : active ? 1.6 : 0.8}
                vectorEffect="non-scaling-stroke"
                className="cursor-pointer transition-[fill-opacity] duration-150"
                onMouseEnter={(e) => !dragRef.current && setHover({ d, ...pos(e) })}
                onMouseLeave={() => setHover(null)}
                onClick={() => { if (movedRef.current) { movedRef.current = false; return } onSelect?.(d.id) }}
              />
            )
          })}
        </g>
      </svg>

      {/* 범례 (색상 기준에 따라 전환) + 안내 */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-zinc-500">
        {colorBy === 'region'
          ? REGION_ORDER.map(r => (
              <span key={r} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: REGION_COLOR[r] }} />
                {REGION_LABEL[r]}
              </span>
            ))
          : DC_STAGES.map(s => (
              <span key={s.id} className="flex items-center gap-1" title={s.label}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                {s.id}.{s.short}{DC_BOTTLENECK_STAGES.includes(s.id) ? '⚠' : ''}
              </span>
            ))}
        <span className="ml-auto text-zinc-400">● 원 크기 ∝ 전력(MW) · 스크롤 확대·드래그 이동·클릭 시 표 이동 · {onMap}건 {totalGw}GW</span>
      </div>

      {/* 호버 툴팁 */}
      {hover?.d && (
        <div
          className="absolute z-20 pointer-events-none bg-white border border-zinc-300 rounded-lg shadow-xl p-2.5 text-xs w-56"
          style={{ left: clamp(hover.x + 14, 4, (hover.cw || W) - 232), top: clamp(hover.y + 14, 4, (hover.ch || H) - 8) }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-zinc-800 leading-tight">{hover.d.name}</span>
            <span className="shrink-0 text-[10px]" style={{ color: CONF_DOT[hover.d.conf] }} title={CONF_LABEL[hover.d.conf]}>●</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">{hover.d.operator}</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1.5 text-[10px]">
            <span className="text-zinc-400">위치</span><span className="text-zinc-700 text-right">{hover.d.country} · {hover.d.city}</span>
            <span className="text-zinc-400">전력</span><span className="text-zinc-700 text-right font-mono font-semibold">{hover.d.mw.toLocaleString()} MW</span>
            <span className="text-zinc-400">단계</span><span className="text-zinc-700 text-right">{hover.d.stage}/9 {DC_STAGES[hover.d.stage - 1].label}</span>
            <span className="text-zinc-400">칩 / 가동</span><span className="text-zinc-700 text-right font-mono">{hover.d.chip} · {hover.d.online}</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-1.5 pt-1.5 border-t border-zinc-100">{hover.d.status}</div>
          <div className="text-[9px] text-sky-600 mt-1">클릭 → 아래 표에서 보기</div>
        </div>
      )}
    </div>
  )
}
