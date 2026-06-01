import { useMemo, useRef, useState } from 'react'
import { geoEqualEarth, geoPath, geoGraticule10 } from 'd3-geo'
import { feature } from 'topojson-client'
import worldTopo from '../data/world-110m.json'
import { REGION_COLOR, REGION_LABEL, REGION_ORDER, DC_STAGES } from '../data/dataCenters'

// ── 투영·지오메트리는 정적 → 모듈 1회 계산 (렌더마다 geoPath 재실행 방지) ──
const W = 980, H = 500
const PROJECTION = geoEqualEarth().fitExtent([[8, 8], [W - 8, H - 8]], { type: 'Sphere' })
const PATH = geoPath(PROJECTION)
const COUNTRY_PATHS = feature(worldTopo, worldTopo.objects.countries).features.map(f => PATH(f))
const GRATICULE_PATH = PATH(geoGraticule10())
const SPHERE_PATH = PATH({ type: 'Sphere' })

const CONF_DOT = { confirmed: '#10b981', estimate: '#f59e0b', disputed: '#f87171' }
const CONF_LABEL = { confirmed: '확인', estimate: '추정', disputed: '논란' }

// 원 크기: 면적 ∝ 전력(MW) → 반지름 ∝ √MW
const radius = (mw) => Math.max(3, Math.sqrt(mw || 0) * 0.34)
const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

export default function WorldMap({ dcs }) {
  const wrapRef = useRef(null)
  const [hover, setHover] = useState(null)  // { d, x, y, cw, ch }

  // 큰 원을 먼저 그려 작은 원이 위로(hover 용이)
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

  function pos(e) {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return { x: 0, y: 0, cw: W, ch: H }
    return { x: e.clientX - r.left, y: e.clientY - r.top, cw: r.width, ch: r.height }
  }

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseMove={(e) => hover && setHover(h => ({ ...h, ...pos(e) }))}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" style={{ maxHeight: 470 }}>
        <path d={SPHERE_PATH} fill="#f8fafc" stroke="#e4e4e7" strokeWidth={0.6} />
        <path d={GRATICULE_PATH} fill="none" stroke="#eef2f6" strokeWidth={0.4} />
        {COUNTRY_PATHS.map((d, i) => (
          <path key={i} d={d} fill="#e8edf2" stroke="#ffffff" strokeWidth={0.5} />
        ))}
        {markers.map(({ d, x, y }) => {
          const active = hover?.d.id === d.id
          return (
            <circle
              key={d.id}
              cx={x}
              cy={y}
              r={radius(d.mw) * (active ? 1.3 : 1)}
              fill={REGION_COLOR[d.region]}
              fillOpacity={active ? 0.95 : 0.66}
              stroke="#fff"
              strokeWidth={active ? 1.6 : 0.8}
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={(e) => setHover({ d, ...pos(e) })}
              onMouseLeave={() => setHover(null)}
            />
          )
        })}
      </svg>

      {/* 권역 범례 + 크기 안내 */}
      <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1 text-[10px] text-zinc-500">
        {REGION_ORDER.map(r => (
          <span key={r} className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: REGION_COLOR[r] }} />
            {REGION_LABEL[r]}
          </span>
        ))}
        <span className="ml-auto text-zinc-400">● 원 크기 ∝ 전력(MW) · 지도 표시 {onMap}건 · 총 {totalGw}GW</span>
      </div>

      {/* 호버 툴팁 */}
      {hover && (
        <div
          className="absolute z-20 pointer-events-none bg-white border border-zinc-300 rounded-lg shadow-xl p-2.5 text-xs w-56"
          style={{ left: clamp(hover.x + 14, 4, (hover.cw || W) - 232), top: clamp(hover.y + 14, 4, (hover.ch || H) - 8) }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-zinc-800 leading-tight">{hover.d.name}</span>
            <span className="shrink-0 text-[10px]" style={{ color: CONF_DOT[hover.d.conf] }} title={CONF_LABEL[hover.d.conf]}>
              ●
            </span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-0.5">{hover.d.operator}</div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1.5 text-[10px]">
            <span className="text-zinc-400">위치</span><span className="text-zinc-700 text-right">{hover.d.country} · {hover.d.city}</span>
            <span className="text-zinc-400">전력</span><span className="text-zinc-700 text-right font-mono font-semibold">{hover.d.mw.toLocaleString()} MW</span>
            <span className="text-zinc-400">단계</span><span className="text-zinc-700 text-right">{hover.d.stage}/9 {DC_STAGES[hover.d.stage - 1].label}</span>
            <span className="text-zinc-400">칩 / 가동</span><span className="text-zinc-700 text-right font-mono">{hover.d.chip} · {hover.d.online}</span>
          </div>
          <div className="text-[10px] text-zinc-500 mt-1.5 pt-1.5 border-t border-zinc-100">{hover.d.status}</div>
        </div>
      )}
    </div>
  )
}
