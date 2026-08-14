import { useMemo, useState } from 'react'
import { LayoutGrid, List, X, AlertTriangle, Lightbulb } from 'lucide-react'
import SourceLink from './SourceLink'
import {
  CMO_DOWNTURNS, CMO_PHASES, CMO_PRODUCTS, CMO_CONTEXTS,
  CMO_VERDICTS, CMO_CAUSES, CMO_ENTRIES, CMO_PREP_TYPES,
} from '../data/cmoMatrix'

const VERDICT = Object.fromEntries(CMO_VERDICTS.map(v => [v.id, v]))
const DOWNTURN = Object.fromEntries(CMO_DOWNTURNS.map(d => [d.id, d]))
const PHASE = Object.fromEntries(CMO_PHASES.map(p => [p.id, p]))
const PREP_TYPE = Object.fromEntries(CMO_PREP_TYPES.map(p => [p.id, p]))

// 대비/대응은 과거 관측, 추천/실수는 예측 — 국면 배지 색으로 구분
const PHASE_TONE = {
  prep: 'bg-sky-100 text-sky-800',
  response: 'bg-violet-100 text-violet-800',
  recommend: 'bg-emerald-100 text-emerald-800',
  mistake: 'bg-red-100 text-red-700',
}

function Chip({ active, onClick, children, tone = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1 rounded-full text-[12px] font-medium border transition-colors ${
        active
          ? `border-transparent ${tone || 'bg-zinc-900 text-white'}`
          : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
      }`}
    >
      {children}
    </button>
  )
}

function FilterRow({ label, children }) {
  return (
    <div className="flex items-start gap-3 py-1.5">
      <span className="w-[3.5rem] flex-shrink-0 pt-1 text-[11px] font-semibold text-zinc-400">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

// 엔트리 판정 표기 — 과거는 단일 판정, 4차 예측은 원인별 판정
function VerdictBadge({ entry, compact = false }) {
  if (entry.phase === 'mistake') {
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700`}>
        <AlertTriangle size={11} /> {compact ? '실수' : '예상 실수'}
      </span>
    )
  }
  if (entry.causes) {
    return (
      <span className="inline-flex items-center gap-0.5">
        {CMO_CAUSES.map(c => {
          const v = entry.causes[c.id]
          const t = VERDICT[v.verdict]
          return (
            <span
              key={c.id}
              title={`${c.mark} ${c.label} — ${t.mark} ${t.label}`}
              className={`inline-flex items-center px-1 py-0.5 rounded text-[11px] font-bold ${t.tone}`}
            >
              {c.mark}{t.mark}
            </span>
          )
        })}
      </span>
    )
  }
  const t = VERDICT[entry.verdict]
  if (!t) return null
  return (
    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${t.tone}`}>
      {t.mark} {compact ? '' : t.label}
    </span>
  )
}

function EntryDetail({ entry, onClose }) {
  const d = DOWNTURN[entry.downturn]
  const p = PHASE[entry.phase]
  return (
    <div className="rounded-hig-lg border-2 border-zinc-900 bg-white p-4 my-3">
      <div className="flex items-start gap-2 mb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold text-white" style={{ background: d.color }}>
            {d.label}
          </span>
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${PHASE_TONE[entry.phase]}`}>{p.label}</span>
          {entry.prepType && (
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${PREP_TYPE[entry.prepType].tone}`} title={PREP_TYPE[entry.prepType].desc}>
              {PREP_TYPE[entry.prepType].label}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600">{entry.product}</span>
          <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 text-zinc-600">{entry.context}</span>
          <VerdictBadge entry={entry} />
        </div>
        <button onClick={onClose} className="ml-auto text-zinc-400 hover:text-zinc-700 flex-shrink-0">
          <X size={16} />
        </button>
      </div>

      <h4 className="text-[15px] font-bold text-zinc-900 leading-snug mb-1">{entry.action}</h4>
      <p className="text-[12px] text-zinc-500 mb-2.5">메커니즘 — {entry.mechanism}</p>

      <p className="text-[14px] leading-relaxed text-zinc-700">
        <span className="font-semibold text-zinc-500">{entry.phase === 'mistake' ? '왜 반복되나 (O 예측) — ' : '결과 (O) — '}</span>
        {entry.outcome}
      </p>

      {entry.causes && (
        <div className="mt-3 space-y-1.5">
          <p className="text-[11px] font-semibold text-zinc-400">다운사이클 원인별 결과 분기</p>
          {CMO_CAUSES.map(c => {
            const v = entry.causes[c.id]
            const t = VERDICT[v.verdict]
            return (
              <div key={c.id} className="flex items-start gap-2">
                <span className={`flex-shrink-0 px-1.5 py-0.5 rounded text-[11px] font-bold ${t.tone}`}>
                  {c.mark} {c.label} {t.mark}
                </span>
                <p className="text-[13px] leading-snug text-zinc-700 pt-0.5">{v.text}</p>
              </div>
            )
          })}
        </div>
      )}

      {entry.signal && (
        <p className="mt-3 text-[13px] leading-relaxed text-red-800 bg-red-50 rounded-hig-md px-3 py-2">
          <span className="font-semibold">조기 신호 — </span>{entry.signal}
        </p>
      )}
      {entry.counter && (
        <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-900 bg-emerald-50 rounded-hig-md px-3 py-2">
          <span className="font-semibold">차단 장치 — </span>{entry.counter}
        </p>
      )}

      {entry.refs && <SourceLink source={entry.refs} className="mt-3 text-[11px] text-zinc-400" />}
    </div>
  )
}

export default function CMOMatrix() {
  const [view, setView] = useState('matrix')
  const [downturns, setDownturns] = useState(() => new Set(CMO_DOWNTURNS.map(d => d.id)))
  const [phases, setPhases] = useState(() => new Set(CMO_PHASES.map(p => p.id)))
  const [products, setProducts] = useState(() => new Set(CMO_PRODUCTS))
  const [contexts, setContexts] = useState(() => new Set(CMO_CONTEXTS.map(c => c.id)))
  const [verdicts, setVerdicts] = useState(() => new Set(['clear', 'partial', 'adverse', 'mistake']))
  const [prepTypes, setPrepTypes] = useState(() => new Set(CMO_PREP_TYPES.map(p => p.id)))
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState(null)

  const toggle = (set, fn) => v => {
    const next = new Set(set)
    next.has(v) ? next.delete(v) : next.add(v)
    fn(next)
  }
  const resetAll = () => {
    setDownturns(new Set(CMO_DOWNTURNS.map(d => d.id)))
    setPhases(new Set(CMO_PHASES.map(p => p.id)))
    setProducts(new Set(CMO_PRODUCTS))
    setContexts(new Set(CMO_CONTEXTS.map(c => c.id)))
    setVerdicts(new Set(['clear', 'partial', 'adverse', 'mistake']))
    setPrepTypes(new Set(CMO_PREP_TYPES.map(p => p.id)))
    setQ('')
  }
  // 프리셋 — 자주 쓰는 조합 한 번에
  const preset = key => {
    resetAll()
    if (key === 'worked') {
      setDownturns(new Set(['d1', 'd2', 'd3']))
      setVerdicts(new Set(['clear']))
    } else if (key === 'failed') {
      setDownturns(new Set(['d1', 'd2', 'd3']))
      setVerdicts(new Set(['adverse']))
    } else if (key === 'prep') {
      setPhases(new Set(['prep', 'recommend']))
    } else if (key === 'prepIntent') {
      setPhases(new Set(['prep', 'recommend']))
      setPrepTypes(new Set(['intent']))
    } else if (key === 'next') {
      setDownturns(new Set(['d4']))
    }
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return CMO_ENTRIES.filter(e => {
      if (!downturns.has(e.downturn)) return false
      if (!phases.has(e.phase)) return false
      if (!products.has(e.product)) return false
      if (!contexts.has(e.context)) return false
      if (e.prepType && !prepTypes.has(e.prepType)) return false
      if (!e.prepType && prepTypes.size < CMO_PREP_TYPES.length && (e.phase === 'prep' || e.phase === 'recommend')) return false
      const vKey = e.phase === 'mistake' ? 'mistake' : e.causes ? 'clear' : e.verdict
      if (!verdicts.has(vKey) && !(e.causes && [...verdicts].some(v => Object.values(e.causes).some(c => c.verdict === v)))) return false
      if (needle) {
        const hay = `${e.action} ${e.mechanism} ${e.outcome} ${e.signal || ''} ${e.counter || ''}`.toLowerCase()
        if (!hay.includes(needle)) return false
      }
      return true
    })
  }, [downturns, phases, products, contexts, verdicts, prepTypes, q])

  const counts = useMemo(() => {
    const by = { clear: 0, partial: 0, adverse: 0, mistake: 0, forecast: 0 }
    for (const e of filtered) {
      if (e.phase === 'mistake') by.mistake++
      else if (e.causes) by.forecast++
      else by[e.verdict]++
    }
    return by
  }, [filtered])

  const selectedEntry = selected ? CMO_ENTRIES.find(e => e.id === selected) : null

  return (
    <div className="space-y-4">
      {/* ── 헤더 ── */}
      <div className="rounded-hig-lg border border-zinc-200 bg-white p-5">
        <h1 className="text-xl font-bold text-zinc-900 tracking-tight">CMO 통합 매트릭스 — 네 번의 다운턴</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-zinc-700">
          1·2·3차 다운턴(관측)과 다음 다운사이클(예측)을 하나의 데이터셋으로 합쳤다. 각 항목은 <b>액션(M)</b>이
          <b> 맥락(C)</b> 아래에서 만든 <b>결과(O)</b>이며, 두 축으로 분류된다 — <b>제품</b>(DRAM·NAND·SSD·UFS·공통)과
          <b> 관점</b>(제조·투자·개발·제품·운영). 국면은 <b>대비</b>(다운턴이 오기 전에 한 것)와
          <b> 대응</b>(다운턴 기간 중에 한 것)으로 나누고, 4차는 <b>추천 전략</b>과 <b>예상되는 흔한 실수</b>로 나눈다.
        </p>
        <SourceLink source="단일 소스: wiki/storyline/cmo-matrix.md · 근거: sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md" prefix="" className="text-xs text-zinc-400 mt-2" />
      </div>

      {/* ── 필터 ── */}
      <div className="rounded-hig-lg border border-zinc-200 bg-white p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="text-[11px] font-semibold text-zinc-400">프리셋</span>
          <Chip onClick={() => preset('worked')} tone="bg-emerald-600 text-white">효과 있었던 것만 (◎)</Chip>
          <Chip onClick={() => preset('failed')} tone="bg-red-600 text-white">실패·역효과 (✕)</Chip>
          <Chip onClick={() => preset('prepIntent')} tone="bg-blue-600 text-white">⭑ 다운턴 대비 전략만</Chip>
          <Chip onClick={() => preset('prep')} tone="bg-sky-600 text-white">대비 국면 전체</Chip>
          <Chip onClick={() => preset('next')} tone="bg-blue-600 text-white">다음 다운턴</Chip>
          <button onClick={resetAll} className="text-[11px] text-zinc-400 hover:text-zinc-700 underline underline-offset-2">
            전체 해제
          </button>
          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => setView('matrix')}
              className={`p-1.5 rounded ${view === 'matrix' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-700'}`}
              title="매트릭스 보기 (제품 × 관점)"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded ${view === 'list' ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-zinc-700'}`}
              title="리스트 보기"
            >
              <List size={15} />
            </button>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-1">
          <FilterRow label="다운턴">
            {CMO_DOWNTURNS.map(d => (
              <Chip key={d.id} active={downturns.has(d.id)} onClick={() => toggle(downturns, setDownturns)(d.id)} tone="text-white" >
                <span style={downturns.has(d.id) ? { color: '#fff' } : undefined}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ background: d.color }} />
                  {d.label}
                </span>
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label="국면">
            {CMO_PHASES.map(p => (
              <Chip key={p.id} active={phases.has(p.id)} onClick={() => toggle(phases, setPhases)(p.id)} tone={PHASE_TONE[p.id]}>
                <span title={p.desc}>{p.label}</span>
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label="제품">
            {CMO_PRODUCTS.map(p => (
              <Chip key={p} active={products.has(p)} onClick={() => toggle(products, setProducts)(p)}>{p}</Chip>
            ))}
          </FilterRow>
          <FilterRow label="관점">
            {CMO_CONTEXTS.map(c => (
              <Chip key={c.id} active={contexts.has(c.id)} onClick={() => toggle(contexts, setContexts)(c.id)}>
                <span title={c.desc}>{c.id}</span>
              </Chip>
            ))}
          </FilterRow>
          <FilterRow label="대비 성격">
            {CMO_PREP_TYPES.map(t => (
              <Chip key={t.id} active={prepTypes.has(t.id)} onClick={() => toggle(prepTypes, setPrepTypes)(t.id)} tone={t.tone}>
                <span title={t.desc}>{t.label}</span>
              </Chip>
            ))}
            <span className="text-[11px] text-zinc-400 self-center ml-1">대비·추천 항목에만 적용</span>
          </FilterRow>
          <FilterRow label="판정">
            {CMO_VERDICTS.map(v => (
              <Chip key={v.id} active={verdicts.has(v.id)} onClick={() => toggle(verdicts, setVerdicts)(v.id)} tone={v.tone}>
                {v.mark} {v.label}
              </Chip>
            ))}
            <Chip active={verdicts.has('mistake')} onClick={() => toggle(verdicts, setVerdicts)('mistake')} tone="bg-red-100 text-red-700">
              ⚠ 예상 실수
            </Chip>
          </FilterRow>
          <FilterRow label="검색">
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="액션·메커니즘·결과 본문 검색 (예: 감산, HBM, 계약)"
              className="w-72 px-2.5 py-1 rounded-hig-md border border-zinc-200 text-[12px] focus:outline-none focus:border-zinc-400"
            />
          </FilterRow>
        </div>

        <div className="mt-2 pt-2 border-t border-zinc-100 text-[11px] text-zinc-500">
          {filtered.length}건 표시 · ◎ {counts.clear} · △ {counts.partial} · ✕ {counts.adverse}
          {counts.forecast > 0 && <> · 예측(원인별) {counts.forecast}</>}
          {counts.mistake > 0 && <> · ⚠ 예상 실수 {counts.mistake}</>}
        </div>
      </div>

      {selectedEntry && <EntryDetail entry={selectedEntry} onClose={() => setSelected(null)} />}

      {/* ── 매트릭스 뷰 (제품 × 관점) ── */}
      {view === 'matrix' && (
        <div className="rounded-hig-lg border border-zinc-200 bg-white overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-zinc-50">
                <th className="text-left px-3 py-2 font-semibold text-zinc-500 border-b border-zinc-200 w-[5.5rem]">제품 \ 관점</th>
                {CMO_CONTEXTS.map(c => (
                  <th key={c.id} className="text-left px-3 py-2 font-semibold text-zinc-700 border-b border-l border-zinc-200 min-w-[12rem]" title={c.desc}>
                    {c.id}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CMO_PRODUCTS.filter(p => products.has(p)).map(prod => (
                <tr key={prod}>
                  <td className="px-3 py-2 align-top font-bold text-zinc-900 border-b border-zinc-100 bg-zinc-50/50">{prod}</td>
                  {CMO_CONTEXTS.map(c => {
                    const cell = filtered.filter(e => e.product === prod && e.context === c.id)
                    return (
                      <td key={c.id} className="px-2 py-2 align-top border-b border-l border-zinc-100">
                        {cell.length === 0 ? (
                          <span className="text-zinc-300">—</span>
                        ) : (
                          <div className="space-y-1">
                            {cell.map(e => {
                              const d = DOWNTURN[e.downturn]
                              return (
                                <button
                                  key={e.id}
                                  onClick={() => setSelected(selected === e.id ? null : e.id)}
                                  className={`w-full text-left rounded-hig-md border px-2 py-1.5 transition-colors ${
                                    selected === e.id ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'
                                  }`}
                                >
                                  <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                                    <span className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                                    <span className="text-[10px] font-bold text-zinc-400">{d.short}</span>
                                    <span className={`px-1 rounded text-[10px] font-bold ${PHASE_TONE[e.phase]}`}>{PHASE[e.phase].label}</span>
                                    {e.prepType && (
                                      <span className={`px-1 rounded text-[10px] font-bold ${PREP_TYPE[e.prepType].tone}`} title={PREP_TYPE[e.prepType].desc}>
                                        {PREP_TYPE[e.prepType].label}
                                      </span>
                                    )}
                                    <VerdictBadge entry={e} compact />
                                  </div>
                                  <span className="text-[12px] leading-snug text-zinc-700 line-clamp-3">{e.action}</span>
                                </button>
                              )
                            })}
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── 리스트 뷰 ── */}
      {view === 'list' && (
        <div className="rounded-hig-lg border border-zinc-200 bg-white overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="bg-zinc-50">
                {['다운턴', '국면', '제품', '관점', '액션 (M)', '메커니즘', '결과 (O)', '판정'].map(h => (
                  <th key={h} className="text-left px-3 py-2 font-semibold text-zinc-700 border-b border-zinc-200 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => {
                const d = DOWNTURN[e.downturn]
                return (
                  <tr
                    key={e.id}
                    onClick={() => setSelected(selected === e.id ? null : e.id)}
                    className={`cursor-pointer ${selected === e.id ? 'bg-zinc-50' : 'hover:bg-zinc-50/60'}`}
                  >
                    <td className="px-3 py-2 align-top border-b border-zinc-100 whitespace-nowrap">
                      <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5" style={{ background: d.color }} />
                      <span className="font-semibold text-zinc-700">{d.short}</span>
                    </td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100">
                      <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${PHASE_TONE[e.phase]}`}>{PHASE[e.phase].label}</span>
                      {e.prepType && (
                        <span className={`ml-1 px-1.5 py-0.5 rounded text-[11px] font-bold ${PREP_TYPE[e.prepType].tone}`} title={PREP_TYPE[e.prepType].desc}>
                          {PREP_TYPE[e.prepType].label}
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100 text-zinc-600 whitespace-nowrap">{e.product}</td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100 text-zinc-600 whitespace-nowrap">{e.context}</td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100 font-medium text-zinc-900 min-w-[15rem]">{e.action}</td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100 text-zinc-500 min-w-[10rem]">{e.mechanism}</td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100 text-zinc-700 min-w-[20rem]">
                      <span className="line-clamp-2">{e.outcome}</span>
                    </td>
                    <td className="px-3 py-2 align-top border-b border-zinc-100 whitespace-nowrap"><VerdictBadge entry={e} compact /></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="px-3 py-6 text-center text-[13px] text-zinc-400">조건에 맞는 항목이 없습니다 — 필터를 넓혀보세요.</p>
          )}
        </div>
      )}

      {/* ── 4차 원인 범례 ── */}
      <div className="rounded-hig-lg border border-zinc-200 bg-white p-4">
        <h3 className="text-[13px] font-bold text-zinc-900 mb-2 flex items-center gap-1.5">
          <Lightbulb size={14} /> 다음 다운사이클의 원인 3종 — 4차 항목의 O는 원인에 따라 갈린다
        </h3>
        <div className="grid gap-2 md:grid-cols-3">
          {CMO_CAUSES.map(c => (
            <div key={c.id} className="rounded-hig-md border border-zinc-200 p-2.5">
              <p className="text-[12px] font-bold text-zinc-900">{c.mark} {c.label}</p>
              <p className="mt-1 text-[12px] leading-snug text-zinc-600">{c.desc}</p>
              <p className="mt-1.5 text-[11px] text-zinc-500"><b>확인 트리거</b> · {c.trigger}</p>
              <p className="mt-0.5 text-[11px] text-zinc-400">시나리오 {c.scenario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
