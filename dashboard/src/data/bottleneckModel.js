// 2030 병목 정량 모델 — 전력·CAPEX/ROI·선단 파운드리·첨단 패키징 4대 병목.
//
// 핵심 수식 (딥리서치 정량 모델):
//   S₂₀₃₀ = min(U, S_power, S_capex, S_foundry, S_packaging)   — 실현 서버 출하
//   Sᵢ    = S_base × (Bᵢ/B_base)^εᵢ                            — 병목별 출하 상한
//   HBM_EB = S × A × M / 10⁹ (A: 가속기/서버, M: GB/가속기)
//   DRAM_EB = S × D / 10⁶   (D: TB/서버)
//   가격 균형: D₀(p/100)^εd = S₀(p/100)^εs → p* = 100·(D₀/S₀)^(1/(εs−εd))
//
// ※ 모든 수치는 공식 전망이 아니라 IEA·Goldman·TSMC·ASML·Micron·SK hynix·삼성
//   공개 자료를 결합한 "운영 모형"값. 제약지수(currentIndex)는 EWI와 동일하게
//   wiki 사실 기반 정성 판단값(2026-06-10) — 실시간 피드 연동은 다음 단계.
// 단일 소스: wiki/concepts/bottleneck-model-2030.md
//   (전거: sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md,
//          sources/papers/deep-research-bottleneck-monitoring-dashboard-design-2026-06.md)

export const MODEL_ASOF = '2026-06-14'

// 이전 점검 기준일 + 제약지수 — 대시보드의 변동폭(Δ) 표시에 사용
export const PREV_MODEL_ASOF = '2026-06-13'
export const PREV_INDICES = { power: 68, capex: 44, foundry: 54, packaging: 70 }

// 기준 시나리오: HBM-GPU 서버 125.0만 대 → HBM 2.88EB · AI 서버 DRAM 2.50EB
export const BASE_SERVERS = 125.0 // 만 대

// 잠재 수요 U (병목이 없을 때의 HBM-GPU 서버 수요, 만 대)
//   = AI-optimized server 총출하(330/410/520만 대) × HBM 탑재 비중(30/40/50%)
export const POTENTIAL_DEMAND = {
  low:  { value: 99.0,  label: '낮음',  totalServers: 330, hbmShare: 30 },
  base: { value: 164.0, label: '기준',  totalServers: 410, hbmShare: 40 },
  high: { value: 260.0, label: '높음',  totalServers: 520, hbmShare: 50 },
}

// ── 4대 병목 ─────────────────────────────────────────────────────────────────
// low/base/high: 2030 자원량 시나리오. elasticity: 출하 전달 탄력도 ε (priors, 분기 재보정).
// currentIndex: 제약지수 0~100 (정성 판단, 2026-06-10) — alertBand()로 5단계 경보 매핑.
export const BOTTLENECKS = [
  {
    id: 'power', name: '전력', icon: 'zap', color: '#f59e0b',
    unit: 'TWh', resourceLabel: 'AI 집중형 DC 전력',
    low: 300, base: 380, high: 520, step: 5, elasticity: 1.00,
    currentIndex: 70,
    indexNote: 'PJM 계통 접속 평균 8년 확정·선진국 허브 7~10년(최장 13년). DOE 2030년 100GW 신규 필요(50%가 DC). ERCOT 텍사스 피크 85GW(2024)→145GW(2031, 32GW DC 기인). 하이퍼스케일러 5사 백악관 그리드 서약(2026-03). 요금이 아니라 접속 가능한 MW/GW의 실재적 한계',
    desc: 'IEA 2030 전 세계 DC 전력 ~945TWh·AI-focused 3배. 서버 구매보다 인입·계통접속·변전·냉각이 느림 — CAPEX가 있어도 전력이 없으면 배치 불가',
    trigger: '상위 허브 2+ reserve margin <8% · Hub LMP P90 초과 72h 지속 · 접속지연 >60일',
    kpis: [
      { name: 'ISO/RTO 예비력·수요·LMP', freq: '5분~1h', pr: 'P1', src: 'ERCOT·PJM·EIA-930' },
      { name: 'Interconnection 지연일수', freq: '주간', pr: 'P1', src: '유틸리티·RTO 공시' },
      { name: 'Grid event count', freq: '일간', pr: 'P1', src: 'ISO 공지' },
      { name: '발전 COD 달성률·DC 부하 nowcast', freq: '월간', pr: 'P2', src: 'EIA-860·유틸리티' },
      { name: '변압기·케이블 리드타임', freq: '월간', pr: 'P3', src: '조달 ERP' },
    ],
  },
  {
    id: 'capex', name: 'CAPEX·ROI', icon: 'banknote', color: '#ef4444',
    unit: '조 달러', resourceLabel: '연간 AI 인프라 CAPEX',
    low: 0.90, base: 1.37, high: 1.80, step: 0.01, elasticity: 0.90,
    currentIndex: 42,
    indexNote: "빅4 $700~725B + 전체 하이퍼스케일러 $782B(Dell'Oro). Meta 연간 $125~145B 추가 상향. Micron Q3 FY26 역대 최고 $33.5B±750M 가이던스·HBM3E 2026 완판. AWS +28%·GCloud+110%·Azure+84%·Meta+54% ROI 실현 강화. ABS·SPV 의존 잔존",
    desc: 'Goldman 경로: 2026 $0.765조 → 2031 $1.6조(누적 $7.6조). 4대 병목 중 최대 하방 민감도 — 기술보다 ROI 재평가가 먼저 수요를 꺾는다',
    trigger: 'hyperscaler aggregate capex 가이드 -15%+ 하향 · FCF/CapEx <0.8 · HY OAS 급등',
    kpis: [
      { name: 'Hyperscaler capex 가이던스 합계', freq: '분기·이벤트', pr: 'P1', src: 'SEC 10-Q/8-K' },
      { name: 'FCF/CapEx 커버리지', freq: '분기', pr: 'P1', src: 'SEC XBRL·DART' },
      { name: 'TSMC 월매출 YoY·HBM sold-out horizon', freq: '월간', pr: 'P1', src: 'TSMC·Micron IR' },
      { name: 'HY/BBB OAS·10Y 금리', freq: '일간', pr: 'P2', src: 'FRED' },
      { name: 'AI 매출/AI CapEx ratio', freq: '분기', pr: 'P2', src: 'filings' },
    ],
  },
  {
    id: 'foundry', name: '선단 파운드리', icon: 'cpu', color: '#6366f1',
    unit: '백만 장/년', resourceLabel: 'AI 배정 선단 로직 캐파',
    low: 0.62, base: 0.75, high: 0.95, step: 0.01, elasticity: 0.85,
    currentIndex: 52,
    indexNote: 'NVIDIA Rubin 출하 비중 29%→22% 하향(HBM4 지연, 단기 캐파 여유 신호). N2 램프 순항·TSMC 매출 지속 강세. N3 fully booked 유지. 대만 집중(0.525/0.75)·지정학 리스크 잔존',
    desc: 'TSMC AI 가속기 5년 mid-40% CAGR·3nm 2026말 ~18만 장/월. 하방은 최소(-14.9%)지만 상방 시나리오에서 끝까지 남는 최종 병목',
    trigger: 'N2/A16 램프 1분기+ 지연 · ASML High-NA 삽입 지연 · AI 배정량 축소',
    kpis: [
      { name: '선단 노드 램프 상태 (N2·18A·2nm)', freq: '이벤트·월간', pr: 'P1', src: '실적·보도자료' },
      { name: 'ASML EUV/High-NA 출하·백로그', freq: '분기', pr: 'P1', src: 'ASML results' },
      { name: 'TSMC 월매출·AI 모멘텀', freq: '월간', pr: 'P1', src: 'TSMC' },
      { name: 'AI-allocable capacity·수율 프록시', freq: '월간', pr: 'P2', src: '코멘터리·자체 추정' },
      { name: '선단 장비 로직·메모리 분포', freq: '분기', pr: 'P1', src: 'ASML (1Q26 49:51)' },
    ],
  },
  {
    id: 'packaging', name: '첨단 패키징', icon: 'layers', color: '#10b981',
    unit: '백만 장/년', resourceLabel: 'HBM 컴퓨트용 유효 CoWoS',
    low: 0.55, base: 0.70, high: 0.95, step: 0.01, elasticity: 0.95,
    currentIndex: 68,
    indexNote: 'TSMC CoWoS 2026말 목표 130K WPM 확정(이전 127K~130K 상단). CoPoS 파일럿 6월 완공 확인. 선진 패키징 매출 비중 >10%(2025년 8%에서). Rubin 200→150만 대 하향 수요 완화. 여전히 fully booked이나 점진 완화 추세',
    desc: 'TSMC CoWoS 2026말 11.5만~14만 장/월 → 2027 ~17만 장/월(TrendForce). 2026~27 최예리 운영 병목 — 단 라인 개통 후 완화 빠름',
    trigger: 'qualified output -15% WoW 2주 지속 · 대형 사이트 outage · 납기 연장 급증',
    kpis: [
      { name: 'CoWoS 증설 마일스톤·utilization', freq: '이벤트·분기', pr: 'P1', src: 'TSMC transcript' },
      { name: 'Qualified CoWoS output', freq: '월간', pr: 'P2', src: '공급망·TrendForce' },
      { name: '신규 후공정 사이트 진척 (AZ·인디애나·싱가포르)', freq: '월간', pr: 'P2', src: 'Amkor·SK hynix·Micron' },
      { name: 'HBM 세대 믹스·base-die readiness', freq: '분기', pr: 'P2', src: '3사 IR' },
      { name: 'TSV/KGD yield·substrate 타이트니스', freq: '월간', pr: 'P3', src: '내부·공급망' },
    ],
  },
]

export const BOTTLENECK_BY_ID = Object.fromEntries(BOTTLENECKS.map(b => [b.id, b]))

// ── 메모리 강도 (서버당 구성) ────────────────────────────────────────────────
// 앵커: DGX B200(8GPU·1,440GB HBM3e·2TB DRAM), MI355X 288GB, Rubin 288GB(HBM4), HBM4E 48→64GB
export const INTENSITY = {
  accel:  { label: '가속기 수/서버',    unit: '개', options: [4, 6, 8],            base: 6 },
  hbmGB:  { label: 'HBM 용량/가속기',   unit: 'GB', options: [288, 384, 512],      base: 384 },
  dramTB: { label: '시스템 DRAM/서버',  unit: 'TB', options: [1.5, 2.0, 3.0],      base: 2.0 },
}

// ── 공급 (유효 캐파, EB) ─────────────────────────────────────────────────────
export const SUPPLY = {
  low:  { label: '저공급',   hbm: 2.40, dram: 2.70, hbmInvWeeks: 2,  dramInvWeeks: 4 },
  base: { label: '기준공급', hbm: 2.95, dram: 3.30, hbmInvWeeks: 4,  dramInvWeeks: 6 },
  high: { label: '고공급',   hbm: 3.80, dram: 4.10, hbmInvWeeks: 7,  dramInvWeeks: 10 },
}

// 공급사별 2030 유효 캐파 (기준 시나리오, 모형 추정 — 명판용량 아님)
export const SUPPLIERS = [
  { name: 'SK hynix',  hbm: 1.24, dram: 1.12, color: '#f97316', note: 'M15X 20조+·인디애나 패키징 2028말·HBM4 양산' },
  { name: '삼성전자',   hbm: 0.94, dram: 1.32, color: '#3b82f6', note: 'HBM 매출 2026 3배+·HBM4E 48→64GB·2nm 연계' },
  { name: 'Micron',    hbm: 0.71, dram: 0.79, color: '#8b5cf6', note: '미국 $500억(~2030)·Idaho 2027·HBM4E 2027' },
  { name: '기타·중국',  hbm: 0.06, dram: 0.07, color: '#9ca3af', note: 'export control·장비 접근성이 변수' },
]

// 가격 균형 탄력도 (상수탄력도 모형 — normalized price index, 시장가 예측 아님)
export const PRICE_ELASTICITY = {
  hbm:  { demand: -0.35, supply: 0.60 },
  dram: { demand: -0.50, supply: 0.80 },
}

// ── 경보 5단계 (모니터링 설계) ───────────────────────────────────────────────
export const ALERT_BANDS = [
  { key: 'green',    label: 'Green',    max: 40,  color: '#10b981', rule: '정상 — 대시보드만' },
  { key: 'yellow',   label: 'Yellow',   max: 60,  color: '#f59e0b', rule: '고빈도 2회 확인 → Slack/Teams' },
  { key: 'orange',   label: 'Orange',   max: 75,  color: '#f97316', rule: '3-of-6 또는 공식 원문 2개 → +이메일' },
  { key: 'red',      label: 'Red',      max: 85,  color: '#ef4444', rule: '중대 공식 이벤트 즉시 승격 → +SMS' },
  { key: 'critical', label: 'Critical', max: 101, color: '#b91c1c', rule: 'catastrophic — 지연 없이 임원 브리핑' },
]

export function alertBand(score) {
  return ALERT_BANDS.find(b => score < b.max) ?? ALERT_BANDS[ALERT_BANDS.length - 1]
}

// ── 모델 함수 ────────────────────────────────────────────────────────────────

// 병목별 출하 상한 (만 대): Sᵢ = S_base × (Bᵢ/B_base)^εᵢ
export function bottleneckCap(b, value) {
  return BASE_SERVERS * Math.pow(value / b.base, b.elasticity)
}

// 실현 출하 = min(U, 4개 병목 상한). caps와 binding(최솟값 축, 동률 모두) 반환.
export function realizedShipments(resources, potentialU = POTENTIAL_DEMAND.base.value) {
  const caps = BOTTLENECKS.map(b => ({
    id: b.id, name: b.name, color: b.color,
    cap: bottleneckCap(b, resources[b.id]),
  }))
  const servers = Math.min(potentialU, ...caps.map(c => c.cap))
  const EPS = 0.05 // 만 대 — 동률 판정 허용 오차
  const binding = servers >= potentialU - EPS && caps.every(c => c.cap >= potentialU - EPS)
    ? [{ id: 'demand', name: '잠재 수요', color: '#71717a', cap: potentialU }]
    : caps.filter(c => c.cap <= servers + EPS)
  return { servers, caps, binding, potentialU }
}

// 메모리 수요 (EB): 만 대 → HBM = S·A·M/10⁹ GB, DRAM = S·D/10⁶ TB
export function memoryDemand(servers, { accel, hbmGB, dramTB }) {
  return {
    hbmEB:  (servers * 1e4 * accel * hbmGB) / 1e9,
    dramEB: (servers * 1e4 * dramTB) / 1e6,
  }
}

// 상수탄력도 가격 균형: p* = 100·(D₀/S₀)^(1/(εs−εd)), Q* = S₀·(p*/100)^εs
export function equilibrium(d0, s0, { demand: ed, supply: es }) {
  const p = 100 * Math.pow(d0 / s0, 1 / (es - ed))
  const q = s0 * Math.pow(p / 100, es)
  return { price: p, qty: q }
}

// 수요·공급 곡선 점열 (가격지수 50~160) — 차트용
export function curvePoints(d0, s0, elast, pMin = 50, pMax = 160, step = 5) {
  const pts = []
  for (let p = pMin; p <= pMax; p += step) {
    pts.push({
      price: p,
      demand: d0 * Math.pow(p / 100, elast.demand),
      supply: s0 * Math.pow(p / 100, elast.supply),
    })
  }
  return pts
}

// 민감도: 각 병목만 low/high로 움직였을 때 (나머지 기준) HBM 수요 ΔEB
export function sensitivity(intensity = baseIntensity()) {
  const baseRes = Object.fromEntries(BOTTLENECKS.map(b => [b.id, b.base]))
  const baseHBM = memoryDemand(realizedShipments(baseRes).servers, intensity).hbmEB
  return BOTTLENECKS.map(b => {
    const lowRes  = { ...baseRes, [b.id]: b.low }
    const highRes = { ...baseRes, [b.id]: b.high }
    const lowHBM  = memoryDemand(realizedShipments(lowRes).servers, intensity).hbmEB
    const highHBM = memoryDemand(realizedShipments(highRes).servers, intensity).hbmEB
    return {
      id: b.id, name: b.name, color: b.color,
      downside: lowHBM - baseHBM,                    // 음수 (EB)
      downsidePct: (lowHBM - baseHBM) / baseHBM * 100,
      upside: highHBM - baseHBM,                     // 양수 (EB) — U에 막히면 줄어듦
    }
  }).sort((a, c) => a.downside - c.downside)
}

export function baseIntensity() {
  return { accel: INTENSITY.accel.base, hbmGB: INTENSITY.hbmGB.base, dramTB: INTENSITY.dramTB.base }
}

// 시나리오 프리셋 — 4개 병목 자원 + 잠재 수요 + 공급을 한 번에 설정
export const PRESETS = {
  low:  { label: '낮음',  resources: Object.fromEntries(BOTTLENECKS.map(b => [b.id, b.low])),  potential: 'low',  supply: 'low' },
  base: { label: '기준',  resources: Object.fromEntries(BOTTLENECKS.map(b => [b.id, b.base])), potential: 'base', supply: 'base' },
  high: { label: '높음',  resources: Object.fromEntries(BOTTLENECKS.map(b => [b.id, b.high])), potential: 'high', supply: 'high' },
}

// ── 충격 시나리오 대응 매뉴얼 (기준선 대비 연환산 영향) ──────────────────────
export const SHOCK_SCENARIOS = [
  {
    id: 'power', name: '전력 급감 지속', bottleneck: 'power',
    trigger: '상위 허브 2+에서 reserve margin <8% · Hub LMP P90 초과 72h 지속 · interconnection 지연 >60일',
    impact: { hbm: -0.61, hbmPct: -21.1, dram: -0.53, dramPct: -21.1 },
    immediate: '고전력 훈련 워크로드 순연 · 전력 가용 지역으로 배치 이동 · 고객납기 재우선순위화',
    mid: 'PPA·브리지 전력계약 확대 · 액체냉각/전력밀도 최적화',
    prep: '장기 PPA · 변압기 사전예약 · hybrid power 옵션 · 허브 분산',
  },
  {
    id: 'capex', name: 'CAPEX 급감·금융경색', bottleneck: 'capex',
    trigger: 'hyperscaler aggregate capex 가이드 -15%+ 하향 · FCF/CapEx <0.8 · HY OAS 급등',
    impact: { hbm: -0.91, hbmPct: -31.5, dram: -0.79, dramPct: -31.5 },
    immediate: '신규 투자 승인 동결 · take-or-pay 물량 재협상 · 단기 재고 축소',
    mid: '고객별 신용등급 기반 할당 · ASP·마진 중심 믹스 전환',
    prep: '선금/예약금 계약 · cancellation fee · 고객 신용 모니터링',
  },
  {
    id: 'packaging', name: 'CoWoS 중단·인증산출 급감', bottleneck: 'packaging',
    trigger: 'qualified CoWoS output -15% WoW 2주 지속 · 단일 대형 사이트 outage · 납기 연장 급증',
    impact: { hbm: -0.59, hbmPct: -20.5, dram: -0.51, dramPct: -20.5, note: '90일 지속 기준 · 30일 이벤트는 ~1/3' },
    immediate: '고마진 고객 우선 배정 · package slot 재예약 · 대체 패키징·OSAT 검토',
    mid: 'Amkor·Micron·SK hynix 후공정 슬롯 선확보 · substrate 안전재고',
    prep: 'CoWoS slot 옵션 계약 · substrate safety stock · second-source 검증',
  },
  {
    id: 'foundry', name: 'TSMC 선단 캐파 지연', bottleneck: 'foundry',
    trigger: 'N2/A16 램프 1분기+ 지연 · ASML High-NA 삽입 지연 · 선단 로직 AI 배정량 축소',
    impact: { hbm: -0.43, hbmPct: -14.9, dram: -0.37, dramPct: -14.9 },
    immediate: '출하모형 하향조정 · 고객별 node migration 옵션 점검',
    mid: '삼성·Intel 대체노드 재검토 · ASIC 우선순위 변경',
    prep: '장기 wafer reservation · multi-foundry 설계 룰 · 장비 인도 추적',
  },
  {
    id: 'combined', name: '복합 충격', bottleneck: null,
    trigger: '전력 Red + CAPEX Orange 동시 1개월 지속, 또는 파운드리·패키징 동시 Orange',
    impact: { hbm: -1.22, hbmPct: -42, dram: -1.05, dramPct: -42, note: 'HBM -1.10~-1.35EB(-38~-47%) 범위의 중앙' },
    immediate: '비상대책위원회 · 출하/계약/가격 정책 일괄 재설정',
    mid: '지역·고객·제품 포트폴리오 재편',
    prep: '복수 지역 전력·패키징·웨이퍼 옵션 확보 · 전사 재난훈련',
  },
]

// ── 상류 드라이버 트리 (depth 1~2) — 더 이른 인지 ────────────────────────────
// 병목 자원은 결과 변수. 각 병목을 움직이는 상류 요소를 depth 1(중류: 자원 직접 결정)·
// depth 2(상류: 중류를 움직이는 더 이른 원인)로 분해 — 상류가 먼저 꺾이면 선행시차만큼
// 먼저 인지. 예: CAPEX ← 하이퍼스케일러 이익·FCF(d1) ← AI 기업 매출·이익(d2, 12~18개월 선행).
// 판정(level)은 EWI와 동일하게 wiki 사실 기반 정성값(2026-06-11) — "제약을 조이는 압력" 방향.
// 단일 소스: wiki/concepts/bottleneck-model-2030.md §5

export const DRIVERS_ASOF = '2026-06-14'

// 제약 압력 4단계 (점수는 제약지수·경보 밴드와 동일 0~100 스케일)
export const PRESSURE_LEVELS = {
  easing:   { key: 'easing',   label: '완화', color: '#10b981', score: 15 },
  neutral:  { key: 'neutral',  label: '중립', color: '#9ca3af', score: 40 },
  tight:    { key: 'tight',    label: '긴장', color: '#f59e0b', score: 65 },
  critical: { key: 'critical', label: '임계', color: '#ef4444', score: 90 },
}

export const DRIVER_TREND = {
  worsening: { label: '악화', arrow: '▼', color: '#ef4444' },
  stable:    { label: '안정', arrow: '▶', color: '#9ca3af' },
  improving: { label: '개선', arrow: '▲', color: '#10b981' },
}

// ewiLink: 수요 변곡 EWI(demandSignals.js)의 동일 신호 id — 같은 사실의 양면(수요 방향 ↔ 병목 압력)
export const BOTTLENECK_DRIVERS = [
  // ── CAPEX/ROI 상류 ──
  { id: 'hyp_fcf',     bottleneck: 'capex', depth: 1, name: '하이퍼스케일러 이익·FCF 커버리지', lead: '2~4분기', weight: 3, level: 'neutral', trend: 'worsening',
    note: '빅4 FCF 견조하나 capex +77% 가속으로 커버리지 하락 — FCF/CapEx<0.8이 충격 트리거', src: 'SEC XBRL·ai-capex.md' },
  { id: 'capex_guide', bottleneck: 'capex', depth: 1, name: 'capex 가이던스·발주 모멘텀', lead: '1~3분기', weight: 3, level: 'easing', trend: 'stable', ewiLink: 'capex_guide',
    note: "빅4 $700~725B·전체 하이퍼스케일러 $782B(Dell'Oro). Meta $125~145B 추가 상향. Q1: Amazon $44.2B·Alphabet $35.7B·Microsoft $30.9B·Meta ~$20B(분기)", src: '빅4 분기 콜·Statista·Dell\'Oro' },
  { id: 'financing',   bottleneck: 'capex', depth: 1, name: '외부 자금조달 (HY OAS·사모신용·ABS)', lead: '0~2분기', weight: 2, level: 'tight', trend: 'worsening', ewiLink: 'credit_spread',
    note: '부채·SPV·ABS 의존 확대 — 스프레드 확대 시 급랭', src: 'FRED·Oracle/CoreWeave 사례' },
  { id: 'ai_revenue',  bottleneck: 'capex', depth: 2, parent: 'hyp_fcf', name: 'AI 기업 매출·이익 (OpenAI·Anthropic·xAI·Google)', lead: '12~18개월', weight: 3, level: 'neutral', trend: 'stable',
    note: '클라우드 AI 매출 구조 성장(GCloud +110%·Azure +84%·AWS +28%, Q1 2026). Micron Q3 FY26 $33.5B(역대최고)·HBM3E 완판 — ROI 실현 가시화 강화. MIT 95% ROI 미실현·프런티어 랩 적자는 잔존', src: 'ai-demand-sustainability.md·Micron IR' },
  { id: 'ai_unit_econ',bottleneck: 'capex', depth: 2, parent: 'hyp_fcf', name: 'AI 단위 경제성 (토큰 원가 vs ARPU·구독 전환)', lead: '12~24개월', weight: 2, level: 'neutral', trend: 'stable',
    note: '추론 효율 개선 = 수요 촉진과 단가 하락의 양날 — Bain: 수익성 충당 $2조 매출 필요·$800B 갭', src: 'ai-compute-economics-gap.md' },
  { id: 'gpu_rental',  bottleneck: 'capex', depth: 2, parent: 'capex_guide', name: 'GPU 임대가 (수요 청산가)', lead: '9~18개월', weight: 3, level: 'tight', trend: 'worsening', ewiLink: 'gpu_rental',
    note: 'H100 현물 $2~3/GPU·h 둔화(Vast.ai 실측) — neocloud 경제성 → GPU 발주의 최선행', src: 'Vast.ai 자동 갱신' },
  { id: 'rates',       bottleneck: 'capex', depth: 2, parent: 'financing', name: '금리·텀스프레드 (10Y)', lead: '0~6개월', weight: 1, level: 'neutral', trend: 'stable',
    note: '할인율·자본비용 환경', src: 'FRED 일간' },

  // ── 전력 상류 ──
  { id: 'interconnect', bottleneck: 'power', depth: 1, name: '계통 접속 큐·지연일수', lead: '12~36개월', weight: 3, level: 'critical', trend: 'worsening',
    note: 'PJM 평균 8년 확정(2025 승인 기준)·선진국 허브 7~10년(최장 13년). 대기열 2,600GW·ERCOT 410GW(87% DC). DOE 2030년 100GW 신규 필요(50% DC). ERCOT 텍사스 145GW(2031). 하이퍼스케일러 백악관 그리드 서약(2026-03)', src: '유틸리티·RTO 공시·IEA·WEF 2026' },
  { id: 'gen_cod',      bottleneck: 'power', depth: 1, name: '발전 COD 파이프라인 달성률', lead: '6~18개월', weight: 2, level: 'tight', trend: 'stable',
    note: '계획 프로젝트 ~20% 지연 위험(IEA)', src: 'EIA-860·IRP' },
  { id: 'reserve_lmp',  bottleneck: 'power', depth: 1, name: '허브 예비력·LMP', lead: '0~3개월', weight: 2, level: 'neutral', trend: 'stable',
    note: '실시간 감시 축 — 현재 국지적 타이트', src: 'EIA-930·PJM·ERCOT' },
  { id: 'transformer',  bottleneck: 'power', depth: 2, parent: 'interconnect', name: '변압기·HV 케이블 리드타임', lead: '18~36개월', weight: 2, level: 'tight', trend: 'worsening',
    note: '대기시간 최근 3년간 2배(IEA) — 접속 지연의 물리적 원인', src: 'energy-constraints.md' },
  { id: 'btm_supply',   bottleneck: 'power', depth: 2, parent: 'gen_cod', name: 'BTM 발전 공급망 (가스터빈·SMR)', lead: '24~48개월', weight: 2, level: 'tight', trend: 'worsening',
    note: 'behind-the-meter 발전이 배치 재편(Bain) — 터빈 슬롯·SMR 인허가 장주기', src: 'energy-constraints.md' },
  { id: 'power_politics', bottleneck: 'power', depth: 2, parent: 'gen_cod', name: '전력요금 정치·지역 수용성', lead: '12~24개월', weight: 1, level: 'neutral', trend: 'worsening',
    note: '요금 인상 반발·DC 신설 제한 움직임 — 접속 허가의 정치적 상류', src: '주별 규제 문서' },

  // ── 파운드리 상류 ──
  { id: 'node_ramp', bottleneck: 'foundry', depth: 1, name: 'N2/18A 선단 램프 진척', lead: '6~12개월', weight: 3, level: 'easing', trend: 'improving',
    note: 'N2 2026말 ~10만 장/월 확대 경로 순항', src: 'tsmc.md·TrendForce' },
  { id: 'ai_alloc',  bottleneck: 'foundry', depth: 1, name: 'AI 배정 비율 (전통 수요와 캐파 경쟁)', lead: '3~9개월', weight: 2, level: 'easing', trend: 'stable',
    note: '스마트폰 -2.1% 약세 = AI 배정 여지 확대 — 교차 부호: 수요 EWI엔 악재, 병목엔 완화', src: 'Counterpoint' },
  { id: 'asml',      bottleneck: 'foundry', depth: 2, parent: 'node_ramp', name: 'ASML EUV/High-NA 출하·백로그', lead: '12~24개월', weight: 2, level: 'neutral', trend: 'stable',
    note: 'High-NA 2026말 HVM 요건 → 2027~28 양산 삽입, 1Q26 장비 로직 49:메모리 51', src: 'ASML results' },
  { id: 'yield_n2',  bottleneck: 'foundry', depth: 2, parent: 'node_ramp', name: '선단 수율 프록시 (N2·18A)', lead: '6~12개월', weight: 2, level: 'neutral', trend: 'stable',
    note: '비공개 — 미지수, 범위 관리', src: '회사 발언', unknown: true },
  { id: 'geo_conc',  bottleneck: 'foundry', depth: 2, parent: 'ai_alloc', name: '대만 집중·지정학', lead: '이벤트성', weight: 2, level: 'tight', trend: 'stable',
    note: 'AI 배정 선단 캐파의 70%가 대만(0.525/0.75) — 단일 충격점, 미국 분산 2028+', src: 'bottleneck-model-2030.md' },

  // ── 패키징 상류 ──
  { id: 'cowos_util',  bottleneck: 'packaging', depth: 1, name: 'CoWoS 가동률·증설', lead: '3~9개월', weight: 3, level: 'tight', trend: 'improving', ewiLink: 'cowos',
    note: 'TSMC 2026말 130K WPM 목표 확정·CoPoS 파일럿 6월 완공·선진 패키징 매출 >10%(2025년 8%). 여전히 fully booked이나 점진 완화 추세. NVIDIA Rubin 200→150만 대 하향으로 수요 일부 완화', src: 'TSMC transcript·TrendForce 2026-06·GlobalSemiResearch' },
  { id: 'new_sites',   bottleneck: 'packaging', depth: 1, name: '신규 후공정 사이트 진척 (AZ·인디애나·싱가포르)', lead: '12~30개월', weight: 2, level: 'neutral', trend: 'improving',
    note: 'Amkor AZ 2028 초·SK 인디애나 2028 말·TSMC AZ 2029 전 — 일정 진행', src: 'Amkor·SK hynix IR' },
  { id: 'substrate',   bottleneck: 'packaging', depth: 2, parent: 'cowos_util', name: '기판·인터포저 (ABF)', lead: '6~18개월', weight: 2, level: 'tight', trend: 'stable',
    note: '2.5D 부족의 연쇄 병목(TrendForce) — 2027부터 완화 전망', src: 'TrendForce' },
  { id: 'stack_yield', bottleneck: 'packaging', depth: 2, parent: 'cowos_util', name: 'HBM 적층·테스트 수율 (TSV/KGD·16-Hi)', lead: '6~12개월', weight: 2, level: 'tight', trend: 'worsening',
    note: 'HBM4 16-Hi 전환 난도 상승(Micron 자격 이슈 등) — 미지수 플래그', src: 'SemiAnalysis·내부', unknown: true },
  { id: 'gen_mix',     bottleneck: 'packaging', depth: 2, parent: 'new_sites', name: 'HBM 세대 전환 믹스 (HBM4→4E 램프)', lead: '6~12개월', weight: 2, level: 'neutral', trend: 'stable',
    note: '세대 전환기 유효 산출 일시 감소 — 3사 IR 추적', src: '3사 IR' },
]

// 병목별 선행 압력 롤업: Σ(점수×가중치)/Σ가중치, d1·d2 분리
export function driverPressure(bottleneckId) {
  const ds = BOTTLENECK_DRIVERS.filter(d => d.bottleneck === bottleneckId)
  const agg = list => {
    const w = list.reduce((a, d) => a + d.weight, 0)
    return w ? Math.round(list.reduce((a, d) => a + PRESSURE_LEVELS[d.level].score * d.weight, 0) / w) : 0
  }
  const d1 = agg(ds.filter(d => d.depth === 1))
  const d2 = agg(ds.filter(d => d.depth === 2))
  const current = BOTTLENECK_BY_ID[bottleneckId].currentIndex
  return {
    d1, d2, overall: agg(ds), current,
    worsening: ds.filter(d => d.trend === 'worsening').length, total: ds.length,
    // 조기경보 규칙 (wiki §5): 악화 예고 d2≥현재+10 / 완화 예고 d2≤현재−15 / 상류-중류 괴리 d2−d1≥10
    flags: {
      deterioration: d2 >= current + 10,
      easing: d2 <= current - 15,
      upstreamGap: d2 - d1 >= 10,
    },
  }
}

// 모니터링 운영 원칙 (혼합주기 nowcasting)
export const MONITORING_NOTES = [
  '관측 주기 — 전력: 분·시간(실시간 API 가능한 유일한 축) / CAPEX·ROI: 일·분기 / 파운드리·패키징: 사건·월·분기',
  '공식 원문 우선 — EIA-930·PJM·ERCOT·ENTSO-E, SEC EDGAR(10분 RSS)·OpenDART, TSMC 월매출·ASML·Micron IR. 상용 리서치(Gartner·IDC·GS·MS)는 범위 보정용',
  '단일 공식 원문(예: "still fully loaded"·sold-out 공지·High-NA 지연)은 통계 확인 없이 Red 승격 가능. 전력 순간 스파이크 1회는 경보 아님(3-of-6 rule)',
  '탄력도 ε·지수 가중치는 expert prior — 4~6분기 누적 후 제약회귀·Bayesian shrinkage 재보정. 비공개 값(CoWoS package-per-wafer·KGD yield 등)은 미지수로 표기',
]
