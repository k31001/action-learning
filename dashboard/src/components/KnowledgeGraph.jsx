import { useMemo, useState, useRef, useCallback } from 'react'
import { Share2, ExternalLink, AlertTriangle, CircleOff, Workflow, Search, RotateCcw } from 'lucide-react'
import { KNOWLEDGE_GRAPH as G, CATEGORIES } from '../data/knowledgeGraph'

const REPO_BASE = 'https://github.com/k31001/action-learning/blob/main/wiki'
const catColor = (c) => CATEGORIES[c]?.color || '#8E8E93'
const catLabel = (c) => CATEGORIES[c]?.label || c

// 노드 id -> 인접 노드 id 집합 (호버 하이라이트용)
function buildAdjacency(edges) {
  const adj = new Map()
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, new Set())
    if (!adj.has(e.target)) adj.set(e.target, new Set())
    adj.get(e.source).add(e.target)
    adj.get(e.target).add(e.source)
  }
  return adj
}

export default function KnowledgeGraph() {
  const { nodes, edges, stats, lint } = G
  const adj = useMemo(() => buildAdjacency(edges), [edges])
  const nodeById = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes])

  const [hover, setHover] = useState(null)     // hover 중인 node id
  const [selected, setSelected] = useState(null) // 클릭 고정된 node id
  const [hidden, setHidden] = useState(() => new Set()) // 숨긴 카테고리
  const [query, setQuery] = useState('')

  // viewBox: 데이터 bounds + 패딩
  const pad = 70
  const vb = useMemo(() => {
    const { minX, minY, maxX, maxY } = stats.bounds
    return { x: minX - pad, y: minY - pad, w: (maxX - minX) + pad * 2, h: (maxY - minY) + pad * 2 }
  }, [stats.bounds])

  // 팬/줌 상태
  const [view, setView] = useState({ x: vb.x, y: vb.y, w: vb.w, h: vb.h })
  const drag = useRef(null)
  const svgRef = useRef(null)

  const reset = useCallback(() => setView({ x: vb.x, y: vb.y, w: vb.w, h: vb.h }), [vb])

  const onWheel = useCallback((e) => {
    e.preventDefault()
    const svg = svgRef.current
    const rect = svg.getBoundingClientRect()
    const mx = (e.clientX - rect.left) / rect.width
    const my = (e.clientY - rect.top) / rect.height
    setView(v => {
      const factor = e.deltaY > 0 ? 1.12 : 0.89
      const nw = Math.max(120, Math.min(vb.w * 3, v.w * factor))
      const nh = nw * (v.h / v.w)
      return { x: v.x + (v.w - nw) * mx, y: v.y + (v.h - nh) * my, w: nw, h: nh }
    })
  }, [vb.w])

  const onPointerDown = (e) => {
    drag.current = { px: e.clientX, py: e.clientY, vx: view.x, vy: view.y }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    // ref 값을 핸들러 진입 시점에 캡처 — setView 업데이터가 지연 실행돼도
    // 그 사이 onPointerUp 이 drag.current 를 null 로 만들어 크래시하는 것을 방지.
    const d = drag.current
    const svg = svgRef.current
    if (!d || !svg) return
    const rect = svg.getBoundingClientRect()
    const dx = (e.clientX - d.px) / rect.width * view.w
    const dy = (e.clientY - d.py) / rect.height * view.h
    setView(v => ({ ...v, x: d.vx - dx, y: d.vy - dy }))
  }
  const onPointerUp = () => { drag.current = null }

  // 강조 대상: hover 우선, 없으면 selected
  const focus = hover || selected
  const focusSet = useMemo(() => {
    if (!focus) return null
    const s = new Set([focus])
    adj.get(focus)?.forEach(id => s.add(id))
    return s
  }, [focus, adj])

  const q = query.trim().toLowerCase()
  const matchSet = useMemo(() => {
    if (!q) return null
    return new Set(nodes.filter(n => n.title.toLowerCase().includes(q) || n.id.toLowerCase().includes(q)).map(n => n.id))
  }, [q, nodes])

  const isVisible = (n) => !hidden.has(n.category)
  const detail = selected ? nodeById.get(selected) : (hover ? nodeById.get(hover) : null)

  const toggleCat = (c) => setHidden(h => {
    const n = new Set(h); n.has(c) ? n.delete(c) : n.add(c); return n
  })

  // 엣지가 보이는지 (양 끝 노드 카테고리 모두 표시)
  const edgeVisible = (e) => isVisible(nodeById.get(e.source)) && isVisible(nodeById.get(e.target))

  return (
    <div className="space-y-4">
      {/* ── 헤더 ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900">
            <Share2 size={18} className="text-hig-blue" />
            위키 지식 그래프
          </h2>
          <p className="text-[13px] text-zinc-500 mt-1 max-w-2xl leading-relaxed">
            graph DB 없이 LLM이 유지하는 마크다운 링크를 노드·엣지로 추출한 그래프.
            노드 = wiki 페이지, 엣지 = 페이지 간 인용 링크. 노드 크기 = 연결 수.
            <span className="text-zinc-400"> 단일 소스: <code className="font-mono text-[11px]">wiki/**/*.md</code></span>
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex gap-3 text-[13px]">
            <Stat label="노드" value={stats.nodeCount} />
            <Stat label="엣지" value={stats.edgeCount} />
            <Stat label="상호링크" value={stats.mutualEdges} />
            <Stat label="평균연결" value={stats.avgDegree} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4">
        {/* ── 그래프 캔버스 ── */}
        <div className="relative bg-white border border-zinc-200 rounded-xl overflow-hidden">
          {/* 컨트롤 바 */}
          <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between gap-2 pointer-events-none">
            <div className="relative pointer-events-auto">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="페이지 검색…"
                className="pl-7 pr-2 py-1.5 w-44 text-[12px] bg-white/90 backdrop-blur border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-hig-blue/30"
              />
            </div>
            <button
              onClick={reset}
              className="pointer-events-auto flex items-center gap-1 px-2.5 py-1.5 text-[12px] text-zinc-600 bg-white/90 backdrop-blur border border-zinc-200 rounded-lg hover:bg-zinc-50"
            >
              <RotateCcw size={12} /> 리셋
            </button>
          </div>

          {/* 범례 (카테고리 토글) */}
          <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5 max-w-[70%]">
            {Object.keys(CATEGORIES).map(c => {
              const off = hidden.has(c)
              return (
                <button
                  key={c}
                  onClick={() => toggleCat(c)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] border transition-all ${
                    off ? 'opacity-40 bg-zinc-50 border-zinc-200' : 'bg-white border-zinc-200 shadow-hig-1'
                  }`}
                  title={off ? '표시' : '숨기기'}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: catColor(c) }} />
                  <span className="text-zinc-700">{catLabel(c)}</span>
                  <span className="text-zinc-400 tabular-nums">{stats.byCategory[c] || 0}</span>
                </button>
              )
            })}
          </div>

          <svg
            ref={svgRef}
            viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
            className="w-full h-[560px] touch-none cursor-grab active:cursor-grabbing select-none"
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* 엣지 */}
            <g>
              {edges.map((e, i) => {
                if (!edgeVisible(e)) return null
                const a = nodeById.get(e.source), b = nodeById.get(e.target)
                const dim = focusSet && !(focusSet.has(e.source) && focusSet.has(e.target))
                const lit = focusSet && focusSet.has(e.source) && focusSet.has(e.target)
                return (
                  <line
                    key={i}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={lit ? '#0a84ff' : '#9ca3af'}
                    strokeWidth={lit ? 1.4 : (e.mutual ? 0.9 : 0.5)}
                    strokeOpacity={dim ? 0.06 : (e.mutual ? 0.5 : 0.28)}
                    strokeDasharray={e.mutual ? undefined : '3 2'}
                  />
                )
              })}
            </g>
            {/* 노드 */}
            <g>
              {nodes.map(n => {
                if (!isVisible(n)) return null
                const dim = (focusSet && !focusSet.has(n.id)) || (matchSet && !matchSet.has(n.id))
                const isFocus = focus === n.id
                const isSel = selected === n.id
                const showLabel = isFocus || isSel || n.r > 13 || (matchSet && matchSet.has(n.id))
                return (
                  <g
                    key={n.id}
                    transform={`translate(${n.x} ${n.y})`}
                    onMouseEnter={() => setHover(n.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setSelected(s => s === n.id ? null : n.id)}
                    className="cursor-pointer"
                    style={{ opacity: dim ? 0.22 : 1, transition: 'opacity 120ms' }}
                  >
                    <circle
                      r={n.r}
                      fill={catColor(n.category)}
                      fillOpacity={0.88}
                      stroke={isSel ? '#0a84ff' : '#fff'}
                      strokeWidth={isSel ? 2.2 : 1.2}
                    />
                    {showLabel && (
                      <text
                        y={-n.r - 3}
                        textAnchor="middle"
                        className="pointer-events-none"
                        style={{ fontSize: Math.max(7, view.w < 500 ? 7 : 8.5), fill: '#27272a', fontWeight: isFocus ? 600 : 500, paintOrder: 'stroke', stroke: '#fff', strokeWidth: 2.4 }}
                      >
                        {n.title.length > 22 ? n.title.slice(0, 21) + '…' : n.title}
                      </text>
                    )}
                  </g>
                )
              })}
            </g>
          </svg>
          <div className="absolute bottom-3 right-3 z-10 text-[10px] text-zinc-400 bg-white/80 px-2 py-0.5 rounded">
            스크롤=줌 · 드래그=이동 · 클릭=고정
          </div>
        </div>

        {/* ── 사이드 패널 ── */}
        <div className="space-y-4">
          {/* 선택/호버 노드 상세 */}
          <div className="bg-white border border-zinc-200 rounded-xl p-4 min-h-[120px]">
            {detail ? (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: catColor(detail.category) }} />
                  <span className="text-[11px] text-zinc-500">{catLabel(detail.category)}</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 leading-snug mb-2">{detail.title}</h3>
                <div className="flex gap-3 text-[12px] text-zinc-600 mb-3">
                  <span>피인용 <b className="text-zinc-900">{detail.inDegree}</b></span>
                  <span>인용 <b className="text-zinc-900">{detail.outDegree}</b></span>
                  <span>출처 <b className="text-zinc-900">{detail.sourceCitations}</b></span>
                </div>
                <a
                  href={`${REPO_BASE}/${detail.id}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[12px] text-sky-600 hover:text-sky-700 hover:underline font-mono"
                >
                  wiki/{detail.id} <ExternalLink size={11} />
                </a>
              </div>
            ) : (
              <p className="text-[13px] text-zinc-400 leading-relaxed">
                노드에 마우스를 올리면 연결이 강조되고, 클릭하면 상세가 고정됩니다.
              </p>
            )}
          </div>

          {/* 허브 top */}
          <Panel icon={Workflow} title="최다 연결 허브">
            <ul className="space-y-1.5">
              {stats.hubs.map(h => (
                <li key={h.id}>
                  <button
                    onClick={() => setSelected(h.id)}
                    onMouseEnter={() => setHover(h.id)}
                    onMouseLeave={() => setHover(null)}
                    className="w-full flex items-center justify-between gap-2 text-left group"
                  >
                    <span className="text-[12px] text-zinc-700 group-hover:text-sky-600 truncate">{h.title}</span>
                    <span className="text-[11px] text-zinc-400 tabular-nums shrink-0">{h.degree}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>

          {/* Lint 신호 */}
          <Panel icon={AlertTriangle} title="연결성 점검 (lint)" tone="amber">
            <div className="space-y-2 text-[12px]">
              <LintRow
                icon={CircleOff}
                label="고립 페이지"
                count={lint.isolated.length}
                hint="다른 위키 페이지와 링크 없음"
              />
              <LintRow
                icon={AlertTriangle}
                label="역링크 누락"
                count={lint.asymmetricCount}
                hint="A→B 인데 B가 A를 인용 안 함"
              />
              <LintRow
                icon={CircleOff}
                label="고아 페이지"
                count={lint.orphans.length}
                hint="index.md 에 미등록"
              />
              {lint.isolated.length > 0 && (
                <details className="mt-1">
                  <summary className="text-[11px] text-zinc-500 cursor-pointer hover:text-zinc-700">고립 페이지 목록</summary>
                  <ul className="mt-1.5 space-y-1">
                    {lint.isolated.map(id => (
                      <li key={id}>
                        <a href={`${REPO_BASE}/${id}`} target="_blank" rel="noopener noreferrer"
                          className="font-mono text-[10.5px] text-sky-600 hover:underline break-all">{id}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="text-right">
      <div className="text-base font-semibold text-zinc-900 tabular-nums leading-none">{value}</div>
      <div className="text-[10px] text-zinc-400 mt-0.5">{label}</div>
    </div>
  )
}

function Panel({ icon: Icon, title, tone, children }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4">
      <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-800 mb-3">
        <Icon size={14} className={tone === 'amber' ? 'text-amber-500' : 'text-zinc-400'} />
        {title}
      </h3>
      {children}
    </div>
  )
}

function LintRow({ icon: Icon, label, count, hint }) {
  const ok = count === 0
  return (
    <div className="flex items-start gap-2">
      <Icon size={13} className={ok ? 'text-emerald-500 mt-0.5' : 'text-amber-500 mt-0.5'} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-zinc-700">{label}</span>
          <span className={`tabular-nums font-semibold ${ok ? 'text-emerald-600' : 'text-amber-600'}`}>{count}</span>
        </div>
        <p className="text-[10.5px] text-zinc-400 leading-tight">{hint}</p>
      </div>
    </div>
  )
}
