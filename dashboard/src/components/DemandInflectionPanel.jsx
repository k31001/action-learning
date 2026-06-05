import { useMemo, useState } from 'react'
import { Gauge, AlertTriangle, ArrowRight, TrendingDown, Layers, SlidersHorizontal, RotateCcw } from 'lucide-react'
import SourceLink from './SourceLink'
import {
  SIGNAL_LEVELS, TREND, CHAIN_TIERS, DEMAND_SIGNALS, TIER_BY_ID,
  tierSignals, inflectionSummary, riskBand, EWI_ASOF,
} from '../data/demandSignals'

const WIKI_SRC = 'wiki/concepts/demand-inflection-ewi.md'

const SIDE_STYLE = {
  leading: { head: 'bg-sky-600',  ring: 'border-sky-200',  tag: '선행' },
  sticky:  { head: 'bg-zinc-500', ring: 'border-zinc-200', tag: '끈적' },
  supply:  { head: 'bg-amber-600',ring: 'border-amber-200',tag: '공급축' },
}

function Card({ title, source, children, className = '', right = null }) {
  return (
    <div className={`bg-white border border-zinc-200 rounded-hig-lg shadow-hig-2 p-4 ${className}`}>
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
          {source && <SourceLink source={source} />}
        </div>
        {right}
      </div>
      {children}
    </div>
  )
}

// 0~100 위험 미터 (4구간 그라데이션 + 마커)
function RiskMeter({ score, height = 10 }) {
  return (
    <div className="relative w-full" style={{ height }}>
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: 'linear-gradient(90deg,#10b981 0%,#10b981 25%,#f59e0b 50%,#f97316 75%,#ef4444 100%)' }}
      />
      <div
        className="absolute -top-1 -bottom-1 w-1 bg-zinc-900 rounded-full shadow ring-2 ring-white"
        style={{ left: `calc(${Math.max(0, Math.min(100, score))}% - 2px)` }}
        title={`위험 ${score}`}
      />
    </div>
  )
}

function SignalChip({ s, editable = false, edited = false, onClick }) {
  const lvl = SIGNAL_LEVELS[s.signal]
  const tr = TREND[s.trend]
  return (
    <div
      onClick={editable ? onClick : undefined}
      className={`flex items-center gap-1.5 rounded bg-white border px-1.5 py-1 ${editable ? 'cursor-pointer hover:border-amber-400 hover:bg-amber-50' : 'border-zinc-200'} ${edited ? 'border-amber-400 ring-1 ring-amber-300' : editable ? 'border-zinc-200' : ''}`}
      title={editable ? `클릭하여 레벨 변경 (what-if)\n${s.name} · 현재 ${lvl.label}` : `${s.name} · ${lvl.label} · ${tr.label}\n${s.note || ''}`}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ background: lvl.color }} />
      <span className="text-[10px] text-zinc-700 leading-tight truncate flex-1">{s.name}</span>
      {edited && <span className="text-[8px] text-amber-600 shrink-0">✎</span>}
      <span className="text-[9px] shrink-0" style={{ color: tr.color }}>{tr.arrow}</span>
    </div>
  )
}

const LEVEL_ORDER = ['expansion', 'neutral', 'caution', 'contraction']

export default function DemandInflectionPanel() {
  const [sim, setSim] = useState(false)
  const [overrides, setOverrides] = useState({})  // { signalId: levelKey }

  // 시뮬레이션 모드면 override 적용한 신호로 전체 재계산
  const signals = useMemo(
    () => (sim ? DEMAND_SIGNALS.map(s => (overrides[s.id] ? { ...s, signal: overrides[s.id] } : s)) : DEMAND_SIGNALS),
    [sim, overrides]
  )
  const sum = useMemo(() => inflectionSummary(signals), [signals])
  const leadingBand = riskBand(sum.leading)
  const stickyBand = riskBand(sum.sticky)
  const supplyBand = riskBand(sum.supply)
  const editedCount = Object.keys(overrides).length

  const cycle = (id, curLevel) =>
    setOverrides(o => ({ ...o, [id]: LEVEL_ORDER[(LEVEL_ORDER.indexOf(o[id] || curLevel) + 1) % LEVEL_ORDER.length] }))
  const resetSim = () => setOverrides({})

  const sideBar = (label, score, band) => (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-0.5">
        <span className="text-zinc-500">{label}</span>
        <span className="font-mono font-bold" style={{ color: band.color }}>{score} · {band.label}</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: band.color }} />
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* ── 인트로 ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 rounded-hig-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4">
        <div className="flex items-center gap-2 mb-1">
          <Gauge size={16} className="text-amber-600" />
          <h2 className="text-sm font-bold text-zinc-800">메모리 수요 변곡 조기경보 — 인과 사슬 신호</h2>
        </div>
        <p className="text-xs text-zinc-600 leading-relaxed">
          하락 변곡은 <strong>①수요 청산가(GPU임대가) → ②돈(capex·파이낸싱) → ③발주 미시 → ④DC 착공 → ⑤메모리(재고·가격)</strong> 사슬을 따라 전파된다.
          착공(현재 지표)보다 <strong>왼쪽(선행) 신호가 먼저 꺾이는데 오른쪽(끈적) 착공·메모리가 아직 강하면</strong>, 그 <strong>괴리</strong>가 곧 하락 전 대응 윈도우다.
          착공 추적을 "대체"하는 게 아니라 사슬의 제자리에 놓고 선행·공급 신호로 둘러싸 변곡을 먼저 잡는다.
        </p>
        <p className="text-[10px] text-zinc-400 mt-1">
          ※ 신호 레벨은 wiki 사실 기반 정성 판단값({EWI_ASOF} 시점, EWI와 동일 운용). GPU 임대가(Vast.ai 실측)·AI-DC 신용(HYG 프록시)은 자동 갱신, 나머지는 수동·EWI 탭 연동. 출처: <code>{WIKI_SRC}</code>
        </p>
      </div>

      {/* ── what-if 시뮬레이션 컨트롤 ─────────────────────────────────────────── */}
      <div className="lg:col-span-2 flex items-center flex-wrap gap-2">
        <button
          onClick={() => setSim(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${sim ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-50'}`}
        >
          <SlidersHorizontal size={13} /> what-if 시뮬레이션 {sim ? 'ON' : 'OFF'}
        </button>
        {sim && (
          <>
            <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
              ↓ 사슬 보드의 신호 칩을 클릭해 레벨 변경(확장→중립→주의→수축) → 복합 위험·괴리 즉시 재계산 (가정 시뮬레이션, 실측 아님)
            </span>
            {editedCount > 0 && (
              <button onClick={resetSim} className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-zinc-600 border border-zinc-300 hover:bg-zinc-50">
                <RotateCcw size={11} /> 현재로 초기화 ({editedCount})
              </button>
            )}
          </>
        )}
      </div>

      {/* ── 복합 위험 + 선행/끈적 괴리 ───────────────────────────────────────── */}
      <Card title="복합 수요 변곡 위험" source={`${WIKI_SRC}`} className="lg:col-span-2">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-5">
          {/* 복합 점수 */}
          <div className="flex flex-col items-center justify-center rounded-hig-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-[11px] text-zinc-500">복합 위험 점수</div>
            <div className="text-5xl font-bold font-mono leading-none mt-1" style={{ color: sum.band.color }}>{sum.composite}</div>
            <div className="mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: sum.band.color }}>{sum.band.label}</div>
            <div className="w-full mt-3"><RiskMeter score={sum.composite} /></div>
            <div className="flex justify-between w-full text-[9px] text-zinc-400 mt-1"><span>0 안전</span><span>100 위험</span></div>
          </div>

          {/* 선행/끈적/공급 + 괴리 */}
          <div className="space-y-3">
            <div className="space-y-2">
              {sideBar('① 선행 신호 (수요·돈·발주)', sum.leading, leadingBand)}
              {sideBar('② 끈적 신호 (착공·메모리)', sum.sticky, stickyBand)}
              {sideBar('③ 공급 과잉 (구조적)', sum.supply, supplyBand)}
            </div>
            <div className="rounded-md border border-zinc-200 bg-white p-2.5">
              <div className="flex items-center gap-2 text-xs">
                <TrendingDown size={14} className="text-amber-600" />
                <span className="text-zinc-600">선행−끈적 <strong>괴리</strong>:</span>
                <span className="font-mono font-bold" style={{ color: sum.divergence > 10 ? '#ef4444' : sum.divergence > 0 ? '#f59e0b' : '#10b981' }}>
                  {sum.divergence > 0 ? '+' : ''}{sum.divergence}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                {sum.divergence > 10
                  ? '선행 신호가 끈적 신호보다 뚜렷이 먼저 악화 — 행동 윈도우 열림(하락 임박 경고).'
                  : sum.divergence > 0
                  ? '선행 신호가 소폭 먼저 악화 — 초기 균열. 본격 변곡 전 관찰 강화 구간.'
                  : '선행·끈적 신호 균형 — 변곡 신호 미약.'}
              </p>
              {sum.flashing.length > 0 && (
                <p className="text-[10px] text-red-500 mt-1.5">
                  <AlertTriangle size={10} className="inline mb-0.5" /> 먼저 켜진 선행 경보: {sum.flashing.join(' · ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* ── 인과 사슬 보드 (HERO) ────────────────────────────────────────────── */}
      <Card
        title="인과 사슬 신호 보드 (왼쪽이 먼저 꺾이면 = 조기경보)"
        source={`${WIKI_SRC}`}
        className="lg:col-span-2"
        right={
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            {Object.values(SIGNAL_LEVELS).map(l => (
              <span key={l.key} className="flex items-center gap-0.5"><span className="w-2 h-2 rounded-full" style={{ background: l.color }} />{l.label}</span>
            ))}
          </div>
        }
      >
        <div className="flex items-stretch gap-1.5 overflow-x-auto pb-2">
          {CHAIN_TIERS.map((t, i) => {
            const style = SIDE_STYLE[t.side]
            const sigs = tierSignals(t.id, signals)
            const tierRisk = sigs.length ? Math.round(sigs.reduce((a, s) => a + SIGNAL_LEVELS[s.signal].risk * s.weight, 0) / sigs.reduce((a, s) => a + s.weight, 0)) : 0
            return (
              <div key={t.id} className="flex items-stretch gap-1.5">
                <div className={`flex-shrink-0 w-[168px] rounded-md border ${t.isCurrent ? 'border-sky-400 ring-2 ring-sky-200' : style.ring} bg-zinc-50/40 overflow-hidden flex flex-col`}>
                  <div className={`px-2 py-1.5 text-white ${style.head}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold leading-tight">{t.n} {t.label}</span>
                      <span className="text-[8px] px-1 py-0.5 rounded bg-white/20">{style.tag}</span>
                    </div>
                    <div className="text-[8px] opacity-90 mt-0.5">{t.sub} · 선행 {t.lead} · 위험 {tierRisk}</div>
                  </div>
                  <div className="p-1 space-y-1 flex-1">
                    {sigs.map(s => <SignalChip key={s.id} s={s} editable={sim} edited={!!overrides[s.id]} onClick={() => cycle(s.id, s.signal)} />)}
                  </div>
                </div>
                {/* 사슬 화살표 (공급축 앞에는 생략) */}
                {i < CHAIN_TIERS.length - 1 && CHAIN_TIERS[i + 1].side !== 'supply' && (
                  <div className="flex items-center text-zinc-300"><ArrowRight size={14} /></div>
                )}
                {CHAIN_TIERS[i + 1]?.side === 'supply' && (
                  <div className="flex items-center"><span className="text-zinc-200 text-lg font-light px-0.5">|</span></div>
                )}
              </div>
            )
          })}
        </div>
        <p className="text-[10px] text-zinc-500 mt-2 flex items-start gap-1">
          <ArrowRight size={11} className="text-zinc-400 shrink-0 mt-0.5" />
          하락 신호는 →로 전파. <strong className="mx-1">④ DC 착공</strong>은 사슬 중간의 끈적한 지표 — 이보다 왼쪽(①②③)이 먼저 악화하면 하락 전 대응 시간 확보. ⑥ 공급 과잉은 별도 구조 축(공급발 하락).
        </p>
      </Card>

      {/* ── 신호 상세 표 ─────────────────────────────────────────────────────── */}
      <Card title={`신호 상세 (${DEMAND_SIGNALS.length}개)`} source={`${WIKI_SRC}`} className="lg:col-span-2">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-zinc-400 border-b border-zinc-200">
                <th className="py-1.5 pr-2 font-medium">단계</th>
                <th className="py-1.5 px-2 font-medium">신호</th>
                <th className="py-1.5 px-2 font-medium text-center">상태</th>
                <th className="py-1.5 px-2 font-medium text-center">추세</th>
                <th className="py-1.5 px-2 font-medium">선행</th>
                <th className="py-1.5 pl-2 font-medium">메모 / 출처</th>
              </tr>
            </thead>
            <tbody>
              {CHAIN_TIERS.flatMap(t =>
                tierSignals(t.id, signals).map((s, idx) => {
                  const lvl = SIGNAL_LEVELS[s.signal]
                  const tr = TREND[s.trend]
                  return (
                    <tr key={s.id} className="border-b border-zinc-100 hover:bg-zinc-50/60">
                      <td className="py-1.5 pr-2 whitespace-nowrap">
                        {idx === 0 && <span className="text-[10px] text-zinc-500">{t.n} {t.label}</span>}
                      </td>
                      <td className="py-1.5 px-2 font-medium text-zinc-700">{s.name}</td>
                      <td className="py-1.5 px-2 text-center">
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold text-white" style={{ background: lvl.color }}>{lvl.label}</span>
                      </td>
                      <td className="py-1.5 px-2 text-center" style={{ color: tr.color }}>{tr.arrow} {tr.label}</td>
                      <td className="py-1.5 px-2 text-zinc-500 whitespace-nowrap">{TIER_BY_ID[s.tier].lead}</td>
                      <td className="py-1.5 pl-2 text-zinc-500 text-[10px]">
                        {s.note}
                        {s.ewiId && <span className="ml-1 text-[9px] text-sky-600 font-mono">· EWI:{s.ewiId}</span>}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── 방법론 / 한계 ────────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 rounded-hig-lg border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Layers size={14} className="text-zinc-500" />
          <h3 className="text-xs font-semibold text-zinc-700">방법론 · 한계</h3>
        </div>
        <ul className="text-[11px] text-zinc-600 space-y-1 list-disc pl-4 leading-relaxed">
          <li><strong>샤프 드롭 메커니즘</strong>: 부족기 과잉발주(LTA·선급금) → 정상화 시 백로그 일시 증발(불휩 언와인드), 효율 혁신 에어포켓, 파이낸싱 프리즈, capex digestion. <strong>"부족 신호의 정점"(리드타임·할당 정점)이 역설적으로 급락 셋업</strong>.</li>
          <li><strong>괴리 로직</strong>: 단일 지표가 아니라 선행(수요·돈) − 끈적(착공·메모리) 괴리를 본다. 선행이 먼저 꺾이는 구간 = 행동 윈도우.</li>
          <li><strong>공급 축</strong>: 메모리 하락은 수요만큼 공급에서 터진다 — bit 공급 증가율 &gt; 수요 증가율이면 ~12~18개월 뒤 가격 붕괴. CXMT 범용 공급 포함.</li>
          <li><strong>한계</strong>: 가동률·고객 재고는 불투명, GPU 임대가는 노이즈 큼, 효율 혁신은 예측 불가. 확실성이 아니라 <strong>리드타임 최대화 + 앙상블 + 괴리</strong>가 목표. 신호 레벨은 정성 판단값(실시간 피드 연동은 다음 단계).</li>
          <li><strong>연동</strong>: EWI 탭(GPU 임대가·신용 스프레드·착공 취소·재고·스팟괴리 신규) + 시나리오 DF1(AI 수요)·시나리오 D(조용한 재편) 트리거.</li>
        </ul>
      </div>
    </div>
  )
}
