// 메모리 수요 변곡 조기경보 — 인과 사슬 신호 모델.
//
// 논리: 메모리 수요의 하락 변곡은 인과 사슬을 따라 →로 전파된다.
//   ①수요 청산가(GPU임대가) → ②돈(capex·파이낸싱) → ③발주 미시 → ④DC 착공(현재 지표)
//   → ⑤메모리 내부(재고·가격)  // ⑥공급 과잉(구조)·⑦SCM 공급망(횡단)은 별도 축
// ⑦ SCM 축: 발주−셀스루 괴리로 "실체 없는 수요"(채찍효과 누적)를 측정 — 언와인드 급락의 최선행 신호.
// 착공보다 "왼쪽(선행)" 신호가 먼저 꺾이는데 "오른쪽(끈적)" 착공·메모리가 아직 강하면
//   = 그 괴리(divergence)가 곧 행동 윈도우(=하락 전 대응 시간).
//
// ※ 신호 레벨은 wiki 사실에 기반한 정성 판단값(EWI와 동일 운용) — 2026-06 시점.
//   실시간 데이터 피드 연동은 다음 단계. 절대값보다 "어느 링크가 먼저 켜지는가"로 해석.
// 단일 소스: wiki/concepts/demand-inflection-ewi.md

export const EWI_ASOF = '2026-06-02'

// 신호 레벨 → 하락 위험 점수(0 안전 ~ 100 위험)
export const SIGNAL_LEVELS = {
  expansion:   { key: 'expansion',   label: '확장', color: '#10b981', risk: 5 },
  neutral:     { key: 'neutral',     label: '중립', color: '#9ca3af', risk: 35 },
  caution:     { key: 'caution',     label: '주의', color: '#f59e0b', risk: 68 },
  contraction: { key: 'contraction', label: '수축', color: '#ef4444', risk: 100 },
}

// trend: 신호가 하락 방향으로 악화 중인지
export const TREND = {
  worsening: { label: '악화', arrow: '▼', color: '#ef4444' },
  stable:    { label: '안정', arrow: '▶', color: '#9ca3af' },
  improving: { label: '개선', arrow: '▲', color: '#10b981' },
}

// 인과 사슬 단계 — side: leading(선행) / sticky(끈적·후행) / supply(공급축)
export const CHAIN_TIERS = [
  { id: 'tier0',        n: '①', label: '수요 청산가격',      sub: '실시간·최선행',      lead: '9~18개월', side: 'leading' },
  { id: 'tier1',        n: '②', label: '돈 (capex·파이낸싱)', sub: '착공 1~3분기 선행',  lead: '6~12개월', side: 'leading' },
  { id: 'tier2',        n: '③', label: '발주 미시구조',       sub: '출하 선행',          lead: '3~9개월',  side: 'leading' },
  { id: 'construction', n: '④', label: 'DC 착공 (현재 지표)', sub: '중간·끈적',          lead: '3~12개월', side: 'sticky', isCurrent: true },
  { id: 'tier3',        n: '⑤', label: '메모리 내부',         sub: '재고·가격',          lead: '0~3개월',  side: 'sticky' },
  { id: 'supply',       n: '⑥', label: '공급 과잉',           sub: '구조적',             lead: '12~18개월', side: 'supply' },
  { id: 'scm',          n: '⑦', label: 'SCM 공급망 축',       sub: '채찍·재고위치·할당',  lead: '1~18개월', side: 'scm' },
]

export const TIER_BY_ID = Object.fromEntries(CHAIN_TIERS.map(t => [t.id, t]))

// 신호 목록 (signal: SIGNAL_LEVELS 키 / trend: TREND 키 / weight: 가중치 / ewiId: EWI 연동)
export const DEMAND_SIGNALS = [
  // ① 수요 청산가격
  { id: 'gpu_rental',   tier: 'tier0', name: 'GPU 임대가 추세',        signal: 'caution',    trend: 'worsening', weight: 3, source: 'Vast.ai 실측·ClusterMAX', ewiId: 'gpu_rental_h100_usd', note: 'H100 SXM 현물 $2~3/GPU·h (Vast.ai 자동 갱신·매일 누적) — 24~25 급락 후 둔화' },
  { id: 'gpu_util',     tier: 'tier0', name: 'AI 컴퓨트 가동률',       signal: 'neutral',    trend: 'stable',    weight: 2, source: 'SemiAnalysis 추정', note: '높지만 유휴율 상승 여부 관찰' },
  // ② 돈
  { id: 'capex_guide',  tier: 'tier1', name: '하이퍼스케일러 capex 가이던스', signal: 'expansion', trend: 'stable', weight: 3, source: '빅4 분기 콜', ewiId: null, note: "'26 $650~725B(+77%) 강세 — digestion 언어 관찰" },
  { id: 'credit_spread',tier: 'tier1', name: 'AI-DC 파이낸싱 신용 스프레드', signal: 'neutral', trend: 'worsening', weight: 3, source: 'Oracle·CoreWeave·SPV·사모신용', ewiId: 'ai_dc_credit_spread', note: '부채·ABS 의존 확대 — 스프레드 확대 시 급랭' },
  { id: 'cancel',       tier: 'tier1', name: '착공 취소·연기 건수',     signal: 'caution',    trend: 'worsening', weight: 2, source: 'DCD 등', ewiId: 'dc_cancellation_count', note: 'Abilene 600MW 철회·Norway OpenAI 이탈 — 발표보다 선행' },
  // ③ 발주 미시구조
  { id: 'book_to_bill', tier: 'tier2', name: '메모리 book-to-bill',    signal: 'expansion',  trend: 'stable',    weight: 2, source: 'SEMI·각사', note: '>1 강세' },
  { id: 'lead_time',    tier: 'tier2', name: '메모리 리드타임',         signal: 'caution',    trend: 'worsening', weight: 2, source: '채널', note: '정점 근처 — 단축 전환 시 부족 해소→과잉. 정점=언와인드 셋업' },
  { id: 'spot_spread',  tier: 'tier2', name: '스팟-계약가 괴리',        signal: 'expansion',  trend: 'stable',    weight: 2, source: 'DRAMeXchange', ewiId: 'spot_contract_spread', note: '스팟>계약(부족). 롤오버 시 선행 경고' },
  { id: 'cowos',        tier: 'tier2', name: 'CoWoS 가동률·발주',       signal: 'expansion',  trend: 'stable',    weight: 2, source: 'TSMC', note: 'HBM 직결·GPU 발주 선행. 타이트' },
  // ④ DC 착공 (현재 지표)
  { id: 'pipeline',     tier: 'construction', name: '신규 착공 파이프라인', signal: 'expansion', trend: 'stable', weight: 2, source: 'ai-datacenter-buildout.md', note: '55.9GW 추적·2026 신규 가동 ~23.7GW 강세(끈적)' },
  // ⑤ 메모리 내부
  { id: 'inventory',    tier: 'tier3', name: '메모리 재고일수',         signal: 'expansion',  trend: 'stable',    weight: 3, source: 'TrendForce·IR', ewiId: 'memory_inventory_days', note: '부족으로 낮음 — 상승 전환 시 최선행 경고' },
  { id: 'opm_inv',      tier: 'tier3', name: 'DRAM vs HBM 이익률 역전',  signal: 'caution',    trend: 'worsening', weight: 2, source: 'Counterpoint', ewiId: 'dram_opm_vs_hbm_opm', note: 'DRAM OPM>HBM 관측 = 사이클 정점 신호' },
  { id: 'trad_demand',  tier: 'tier3', name: '전통 수요(스마트폰 YoY)', signal: 'caution',    trend: 'worsening', weight: 1, source: 'Counterpoint', ewiId: 'smartphone_shipment_yoy', note: '-2.1% — 범용 수요 약세' },
  // ⑥ 공급 과잉
  { id: 'supply_bal',   tier: 'supply', name: 'bit 공급 vs 수요 밸런스', signal: 'caution',   trend: 'worsening', weight: 2, source: '3사 capex·웨이퍼', note: '캐파 증설 누적 — 공급발 하락 구조적 리스크' },
  { id: 'cxmt',         tier: 'supply', name: 'CXMT 범용 공급',          signal: 'caution',   trend: 'worsening', weight: 2, source: 'cxmt 위키', ewiId: 'cxmt_asp_gap', note: '범용 DRAM 램프 — 공급 과잉 가속 위험' },
  // ⑦ SCM 공급망 축 — 채찍효과·재고 위치·할당 동학. 발주와 셀스루(최종소비)의 괴리로 "실체 없는 수요"를 추적, ③발주↔⑤재고↔⑥공급 사이를 메운다
  { id: 'phantom_gap',  tier: 'scm', name: '가짜수요 갭(발주−셀스루)',     signal: 'caution', trend: 'worsening', weight: 3, source: '발주 bit vs 단말 출하·DC 가동', note: '발주 증가율 − 단말 소비 증가율. (+) 확대 = 더블오더링 축적 / (+)→(−) 전환 = 언와인드 개시. 채찍효과의 직접 측정 — 가장 본질적' },
  { id: 'double_order', tier: 'scm', name: '더블오더링(고객 재고주수)',     signal: 'caution', trend: 'worsening', weight: 2, source: 'TrendForce 채널·고객 IR', note: '고객 메모리 재고주수 ≥10주 = 추가 발주여력 소진 → 발주 급정지 임박. 메모리사 재고(⑤)보다 2~3배 선행' },
  { id: 'inv_echelon',  tier: 'scm', name: '재고 에셜론(다운스트림 DIO)',   signal: 'neutral', trend: 'stable',    weight: 2, source: '메모리사·모듈·채널·HS 분해', note: '메모리사→모듈→채널→하이퍼스케일러 4단계 DIO. 다운스트림 선축적 = 발주 단절 선행. inventory(1단계)의 횡단 확장' },
  { id: 'allocation',   tier: 'scm', name: '할당 커버리지·선급금률',       signal: 'caution', trend: 'worsening', weight: 3, source: '자사 영업·경쟁사 IR', note: '차기 2~4분기 캐파 중 LTA·선급금 잠금 비율. 할당 해제(de-allocation) 시점 = 사이클 정점. 현재 HBM sold-out·LTA 정점' },
  { id: 'upstream_wfe', tier: 'scm', name: '업스트림 공급증분(WFE·장비반입)', signal: 'caution', trend: 'worsening', weight: 2, source: 'WFE 수주·CXMT/Micron 장비반입', note: '장비사 메모리향 수주·경쟁사 WSPM 증설·소재소비(가동률 프록시). 미래 공급 증분 12~18개월 선행 — supply축 보강' },
  { id: 'order_churn',  tier: 'scm', name: '주문 처닝율(취소·푸시아웃)',    signal: 'neutral', trend: 'worsening', weight: 2, source: '채널·고객 발주', note: '분기 발주 대비 취소·연기·감량 비율. >5% 주의·>10% 경보. 가격 이전 미시신호 — dc_cancellation을 메모리 주문 레벨로 확장' },
  { id: 'ccc_credit',   tier: 'scm', name: 'CCC·고객 신용(DSO)',          signal: 'neutral', trend: 'worsening', weight: 2, source: '자사 재무·고객 신용', note: 'DIO+DSO−DPO. 신생 neocloud·AI 고객 결제지연(DSO 악화)이 언와인드의 현금 전이 경로. credit_spread의 자사 재무판' },
]

// ── 집계 ─────────────────────────────────────────────────────────────────────
export function tierSignals(tierId, signals = DEMAND_SIGNALS) {
  return signals.filter(s => s.tier === tierId)
}

export function compositeRisk(signals = DEMAND_SIGNALS) {
  const w = signals.reduce((a, s) => a + s.weight, 0)
  if (!w) return 0
  const sum = signals.reduce((a, s) => a + SIGNAL_LEVELS[s.signal].risk * s.weight, 0)
  return Math.round(sum / w)
}

// side(leading/sticky/supply)별 위험 점수
export function sideRisk(side, signals = DEMAND_SIGNALS) {
  return compositeRisk(signals.filter(s => TIER_BY_ID[s.tier]?.side === side))
}

export function riskBand(score) {
  if (score < 25) return { key: 'safe',    label: '양호', color: '#10b981' }
  if (score < 50) return { key: 'watch',   label: '주의', color: '#f59e0b' }
  if (score < 75) return { key: 'elevated',label: '경계', color: '#f97316' }
  return { key: 'high', label: '위험', color: '#ef4444' }
}

// 조기경보 요약 — 복합 위험 + 선행/끈적 괴리 + 가장 먼저 켜진 선행 신호
export function inflectionSummary(signals = DEMAND_SIGNALS) {
  const composite = compositeRisk(signals)
  const leading = sideRisk('leading', signals)
  const sticky = sideRisk('sticky', signals)
  const supply = sideRisk('supply', signals)
  const scm = sideRisk('scm', signals)   // SCM 공급망 축 — 채찍·재고위치·할당 (구조적 급락 셋업)
  const divergence = leading - sticky   // +면 선행 신호가 끈적 신호보다 먼저 악화 = 조기경보
  // 악화 중인 선행 신호(주의/수축) 목록 — 가장 먼저 켜진 경보
  const flashing = signals
    .filter(s => TIER_BY_ID[s.tier]?.side === 'leading' && s.trend === 'worsening' && SIGNAL_LEVELS[s.signal].risk >= 50)
    .map(s => s.name)
  return { composite, leading, sticky, supply, scm, divergence, flashing, band: riskBand(composite) }
}
