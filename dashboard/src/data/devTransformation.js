// 개발실 체질 전환 (Dev-org Transformation) — wiki/strategies/dev-org-transformation.md 미러
// 원천: wiki/concepts/lta-to-sca-transition.md + sources/articles/micron-anthropic-sca-2026-06-22.md

export const DT_SUMMARY = {
  oneLine:
    'LTA→SCA 전환으로 고객이 사는 것이 "정확한 납품"에서 "공동 기술 드라이브"로 바뀌었다. 개발실을 요구사항 수령·구현 조직에서 요구사항 공동 정의·선제 제안 조직으로 전환하지 않으면 SCA 시대의 계약 테이블에 앉지 못한다.',
  keyNumbers: [
    { label: 'Micron SCA 체결', value: '16건', subtitle: 'Q3 FY26 공시 (2026-06-24)', accent: 'blue' },
    { label: 'SCA 최소 계약매출', value: '~$100B', subtitle: '최소 약정 물량 × 최소 가격 (RPO)', accent: 'green' },
    { label: '예치금+금융약정', value: '$22B', subtitle: '선급금 체제화 (역사적 <5% → 10~30%)', accent: 'amber' },
    { label: '커스텀 HBM 시장', value: '$130B', subtitle: '2033년 전망 — 범용 대체 진행', accent: 'red' },
  ],
}

// 체질 전환을 요구하는 사건의 누적 (시간순)
export const DT_EVENTS = [
  {
    date: '2025-06',
    title: 'SK hynix 커스텀 HBM 3사 수주 인증',
    desc: 'NVIDIA·Microsoft·Broadcom으로부터 bespoke HBM 수주 인증 — 제품 정의가 고객별 공동설계로 이동',
    source: 'sources/articles/lta-to-sca-industry-context-2026-06.md',
    hot: false,
  },
  {
    date: '2025-10',
    title: 'OpenAI Stargate ↔ Samsung·SK LOI',
    desc: '월 90만 장 DRAM 웨이퍼(글로벌 ~40%) 의향서. 미절단 웨이퍼 납품 — 수요처의 기술 관여 심화',
    source: 'sources/articles/lta-to-sca-industry-context-2026-06.md',
    hot: false,
  },
  {
    date: '2025~26',
    title: 'LTA 선급금 체제화',
    desc: '선급금 계약가의 10~30%(일부 30~40%) — 역사적 <5% 대비 체제 변화. 2027년까지 DDR 비트 20~30% 고정가 락인 전망',
    source: 'sources/articles/lta-to-sca-industry-context-2026-06.md',
    hot: false,
  },
  {
    date: '2026-05',
    title: 'Anthropic Series H — 메모리 3사 동시 참여',
    desc: '$65B 조달, post-money $965B. Micron·Samsung·SK hynix 모두 strategic infrastructure partners로 참여',
    source: 'sources/articles/micron-anthropic-sca-2026-06-22.md',
    hot: false,
  },
  {
    date: '2026-06-22',
    title: 'Micron ↔ Anthropic 전략적 계약 (SCA)',
    desc: '다년 공급 + Claude 워크로드 공동 최적화 + Micron 전사 Claude 도입 + Series H 투자 — 4대 요소 완비된 첫 SCA',
    source: 'sources/articles/micron-anthropic-sca-2026-06-22.md',
    hot: true,
  },
  {
    date: '2026-06-24',
    title: 'Micron, SCA를 IR 공식 카테고리로 공시',
    desc: 'SCA 16건 · 최소 계약매출 ~$100B · 예치금+금융약정 $22B — 개별 딜이 아니라 계약 카테고리로 제도화',
    source: 'sources/filings/micron-q3-fy26.md',
    hot: true,
  },
]

// 계약 구조 3단 진화
export const DT_CONTRACT_STAGES = [
  {
    stage: '1단계 · Spot/분기 계약',
    nature: '범용품 산업 — 가격이 유일한 변수',
    capability: '원가·수율·납기',
    color: '#71717a',
  },
  {
    stage: '2단계 · LTA + 선급금',
    nature: '수주 산업화 — 물량·가격 3~5년 락인, 선급금 10~30%',
    capability: '캐파 계획·공급 신뢰성',
    color: '#1428a0',
  },
  {
    stage: '3단계 · SCA (전략적 고객 계약)',
    nature: 'LTA 위에 공동설계·운영통합·자본연계 적층',
    capability: '워크로드 이해·공동 아키텍처 설계·선제 제안',
    color: '#d97706',
  },
]

// Micron–Anthropic 계약 4대 구성요소 (LTA 대비)
export const DT_SCA_COMPONENTS = [
  { name: '다년 공급', desc: 'HBM·DRAM·SSD 데이터센터 전 포트폴리오', inLTA: true, inSCA: true },
  { name: '공동 최적화', desc: 'Claude 학습·추론 워크로드에 맞춘 메모리·스토리지 서브시스템 공동 설계', inLTA: false, inSCA: true },
  { name: '운영 통합', desc: 'Micron 엔지니어링·제조 전반에 Claude 전사 배치 — 고객 제품을 공급자 운영에 내재화', inLTA: false, inSCA: true },
  { name: '자본 연계', desc: 'Anthropic Series H 전략적 투자 (post-money $965B)', inLTA: false, inSCA: true },
]

// 개발실 역할 재정의
export const DT_ROLE_SHIFT = [
  { dim: '요구사항', asIs: '고객이 확정한 스펙을 정확히 수령', toBe: '고객 워크로드를 먼저 해석 — 요구사항을 공동 정의' },
  { dim: '제안', asIs: 'RFQ 응답 — 요청받은 것에만 답변', toBe: '고객 로드맵 분석 기반 선제 제안' },
  { dim: '기술 방향', asIs: '고객·표준이 정한 방향을 추종', toBe: '자사가 유리한 기술 요소를 드라이브' },
  { dim: '성공 지표', asIs: '품질·납기·수율 (QCD)', toBe: 'QCD + 공동설계 건수·로드맵 채택률·전환비용' },
  { dim: '고객 접점', asIs: '영업이 소유 — 개발은 후방 지원', toBe: '개발 엔지니어가 고객 아키텍트와 직접 상시 교류' },
  { dim: '정보 흐름', asIs: '요구사항이 내려오면 착수', toBe: '고객 워크로드 상시 센싱 (End-to-End Sensing)' },
  { dim: '가치 단위', asIs: '부품 (component)', toBe: '서브시스템 최적화 + 임베디드 SW' },
]

// 리스크 (전환 실패) vs 이점 (전환 성공)
export const DT_RISKS = [
  { id: 'R1', title: 'SCA 수주 배제', desc: '다년 최소매출 락인($100B급) 계약군에서 배제 — 사이클 방어 수단 상실' },
  { id: 'R2', title: '커스텀 전환기 점유율 고착', desc: '커스텀 HBM이 범용 대체($130B, 2033) 시 범용 잔여 시장에 갇힘 — SK hynix 3사 인증 선점' },
  { id: 'R3', title: '2nd source화 — 가격 결정력 상실', desc: '기술 관계 없는 공급자는 대체 가능한 예비 공급자로 취급 — 마진 프리미엄 소멸' },
  { id: 'R4', title: '미래 기술 선점 실패', desc: '워크로드 조기 접근 없이는 차세대 제품 정의를 항상 후행 — CXL·PIM 등 신규 아키텍처 창에서 반복 지각' },
]

export const DT_BENEFITS = [
  { id: 'B1', title: '지속 가능한 매출', desc: '공동설계 락인 → 최소 약정 매출 + 선급금 → 사이클 진폭 완화 (RS-8 연계)' },
  { id: 'B2', title: '수익률 프리미엄', desc: '커스텀·공동설계 제품의 가격 결정력 — Micron 매출총이익률 84.9%의 기반은 SCA 예측가능성' },
  { id: 'B3', title: '미래 기술 선점', desc: '워크로드 조기 가시성 → 차세대 표준을 자사 유리하게 드라이브 — IDM 5종 메모리 통합 제안은 복제 불가 카드' },
  { id: 'B4', title: '자본 연계 옵션', desc: '전략적 파트너 지위 → 고객 자본 테이블 참여(Series H 모델) 등 관계 심화 옵션' },
]

// 4대 전환 축
export const DT_AXES = [
  {
    axis: '기술',
    color: '#1428a0',
    items: ['워크로드 랩 신설 — 고객 학습·추론 워크로드 재현·프로파일링', '커스텀 설계 플랫폼화 — 고객별 대응을 재사용 자산으로', '임베디드 SW 스택 — HW+SW 번들 제안 역량'],
  },
  {
    axis: '문화',
    color: '#d97706',
    items: ['"정답 구현" → "가설 제안" — 선제 제안을 평가·보상에 반영', '실패 허용 예산 — 제안 시도 자체를 KPI화', '고객 미팅에서 가능/불가능 답변 대신 대안·트레이드오프 토론'],
  },
  {
    axis: '조직',
    color: '#059669',
    items: ['고객별 Co-Design Pod — 개발 엔지니어를 고객 아키텍트 옆에', '워크로드 인텔리전스 기능 — RS-9의 개발실 버전', '기술 마케팅 승격 — 로드맵 제안서·백서를 1급 기능으로'],
  },
  {
    axis: '일하는 방식',
    color: '#0a1b5c',
    items: ['로드맵 교차 리뷰(분기) — 스펙 확정 전 단계 개입', '선행 시제품(PoA) 사이클 — 자사 가설로 먼저 만들어 검증', 'AI 도구 내재화(RS-7) — 확보 시간을 고객 대면에 재배치'],
  },
]

// 3-Phase 액션 플랜
export const DT_PHASES = [
  {
    phase: 'Phase 1 · 90일',
    theme: '증명',
    color: '#1428a0',
    actions: ['파일럿 고객 1사 Co-Design Pod 1호 발족', '워크로드 랩 최소 구성 (기존 장비 재배치)', '선제 제안 1호 — 파일럿 고객 차세대 로드맵 대상', 'KPI 개정안 설계 (제안·공동설계 지표 추가)'],
  },
  {
    phase: 'Phase 2 · 1년',
    theme: '제도화',
    color: '#d97706',
    actions: ['Co-Design Pod 3~5개 확대 (모델사+하이퍼스케일러+ASIC)', '로드맵 교차 리뷰 정례화 (분기)', 'PoA 사이클 제도화 — 연 4회', '개정 KPI 전면 적용', '★ SCA형 계약 1건 이상 수주 (공동설계 조항 포함)'],
  },
  {
    phase: 'Phase 3 · 3년',
    theme: '표준화',
    color: '#059669',
    actions: ['커스텀 설계 플랫폼 완성 — 커스텀 대응 리드타임 50% 단축', '"전략적 인프라 파트너" IR 공시 가능 수준 도달', '임베디드 SW 별도 매출 라인 가동'],
  },
]

// KPI
export const DT_KPIS = [
  { label: '공동설계 조항 포함 계약', now: '파악 필요', y1: '1건+', y3: '분기 공시 수준' },
  { label: '선제 제안 건수 (연)', now: '~0 (RFQ 응답 중심)', y1: '12건', y3: '40건' },
  { label: '제안 → 로드맵 채택률', now: '—', y1: '20%', y3: '35%' },
  { label: '개발 엔지니어 고객 직접 교류 시간', now: '낮음', y1: '10%', y3: '25%' },
  { label: '커스텀 제품 매출 비중', now: '낮음', y1: '추적 시작', y3: '30%+' },
]

// 시나리오 연결
export const DT_SCENARIO_LINKS = [
  { scenario: 'A', note: '진영별 공급망에서 진영 내 핵심 고객과의 SCA가 더 중요 — 동일 작동' },
  { scenario: 'B', note: 'SCA 시장 최대 개화 — 본 전략의 주 작동 무대, MB-4의 조직적 전제조건' },
  { scenario: 'C', note: '수요 수축기 최소 약정 매출 락인이 방어벽 (RS-8 연계)' },
  { scenario: 'D', note: '공동설계 없이는 락인 계약 자체가 없음 — 방어 가치 동일' },
  { scenario: 'E', note: '차세대 아키텍처 전환기 워크로드 조기 가시성이 생존 조건' },
]
