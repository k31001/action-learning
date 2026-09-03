// 개발실 체질 전환 (Dev-org Transformation) — wiki/strategies/dev-org-transformation.md 미러
// 원천: wiki/concepts/lta-to-sca-transition.md + sources/articles/micron-anthropic-sca-2026-06-22.md

export const DT_SUMMARY = {
  oneLine:
    'LTA→SCA 전환으로 고객이 사는 것이 "정확한 납품"에서 "공동 기술 드라이브"로 바뀌었다. 개발실을 요구사항 수령·구현 조직에서 요구사항 공동 정의·선제 제안 조직으로 전환하지 않으면 SCA 시대의 계약 테이블에 앉지 못한다.',
  northStar: {
    quote:
      '앞으로의 승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져갈 것이다.',
    attribution: '신문섭, Bain & Company (2026-06-18 인터뷰)',
    source: 'sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md',
  },
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
  { dim: '모델링 범위', asIs: '메모리 디바이스 단품 (스펙·데이터시트)', toBe: '랙·데이터센터 전체 시스템 모델 — 성능·전력 효과 정량 예측' },
]

// 모델링 범위 확장이 왜 결정적인가 (역할 표 하단 강조)
export const DT_MODELING_NOTE =
  'SCA의 공동 최적화는 "이 메모리를 쓰면 고객 워크로드의 성능·전력·TCO가 어떻게 달라지는가"를 계약 전에 정량으로 보여줄 수 있어야 성립한다. 디바이스 데이터시트로는 이 대화에 참여할 수 없다 — 워크로드→서버→랙→데이터센터로 이어지는 시스템 레벨 성능·파워 모델과, 그 모델로 고객 시스템 아키텍트와 대등하게 토론할 자체 시스템 아키텍트·모델링 전문 인력이 기술적 전제조건이다.'

// 모델링 범위 확대 — 디바이스 → 서버 → 랙 → 데이터센터 (계단형 성장, 로드맵 버전과 정합)
// level: 시각화 높이 비율(0~1). scope는 포함관계로 확대.
export const DT_MODELING_SCOPE = {
  intro: '모델링 범위가 메모리 디바이스 단품에서 서버·랙·데이터센터 전체 시스템으로 확대된다. 범위가 커질수록 고객 시스템 안에서의 성능·전력 효과를 정량화할 수 있고, 로드맵 v0.1→v2.0과 정확히 맞물린다.',
  stages: [
    { id: 'device', label: '메모리 디바이스', unit: '디바이스 단품', metric: '스펙·데이터시트', phase: '현재 · As-Is', version: '—', level: 0.4, color: '#525252' },
    { id: 'server', label: '서버', unit: '노드 레벨', metric: '디바이스+SoC 성능·전력', phase: 'Phase 1 · 90일', version: 'v0.1', level: 0.58, color: '#78a9ff' },
    { id: 'rack', label: '랙', unit: '랙 레벨', metric: '노드 집적·전력·냉각', phase: 'Phase 2 · 1년', version: 'v1.0', level: 0.78, color: '#0f62fe' },
    { id: 'dc', label: '데이터센터', unit: 'DC 레벨 · 고객 공용', metric: '워크로드 TCO·전력 총량', phase: 'Phase 3 · 3년', version: 'v2.0', level: 1.0, color: '#0043ce' },
  ],
}

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
    items: ['워크로드 랩 신설 — 고객 학습·추론 워크로드 재현·프로파일링', '시스템 레벨 성능·파워 모델 — 디바이스→서버→랙→DC로 범위 확장, 실측 캘리브레이션, 고객 공용 시뮬레이션 자산화', '커스텀 설계 플랫폼화 — 고객별 대응을 재사용 자산으로', '임베디드 SW 스택 — HW+SW 번들 제안 역량'],
  },
  {
    axis: '문화',
    color: '#d97706',
    items: ['"정답 구현" → "가설 제안" — 선제 제안을 평가·보상에 반영', '실패 허용 예산 — 제안 시도 자체를 KPI화', '고객 미팅에서 가능/불가능 답변 대신 대안·트레이드오프 토론', '스타 엔지니어를 호명하는 문화 — 개인을 조직 뒤에 숨기지 않고 이름으로 드러냄 (호명사회)'],
  },
  {
    axis: '조직',
    color: '#059669',
    items: ['고객별 Co-Design Pod (=메모리판 FDE) — 개발 엔지니어를 고객 아키텍트 옆에 상주 (Palantir Forward Deployed Engineer 모델)', '시스템 아키텍트·모델링 전문 조직 신설 — 외부 채용+내부 육성, 시스템 모델 소유, Pod에 아키텍트 공급', '기존 DE 미션 재정의 — 관리 보직 분리, 고객사 협업·기술 리드 부여 (현 DE는 관리자 역할에 묶여 기술 교류 어려움)', '실리콘밸리 현역 스타 영입 — 미국 고객·영어 커뮤니케이션 한계 보강, 현지 Co-Design 앵커', '워크로드 인텔리전스 + 기술 마케팅 승격'],
  },
  {
    axis: '일하는 방식',
    color: '#0a1b5c',
    items: ['로드맵 교차 리뷰(분기) — 스펙 확정 전 단계 개입', '선행 시제품(PoA) 사이클 — 자사 가설로 먼저 만들어 검증', 'AI 도구 내재화(RS-7) — 확보 시간을 고객 대면에 재배치'],
  },
]

// 벤치마크 — Palantir FDE (Forward Deployed Engineer) 모델
// 원천: sources/articles/palantir-fde-model-2026-07.md
export const DT_FDE_BENCHMARK = {
  headline:
    '"고객의 아키텍처 안으로 들어간다"는 추상이 아니라 이미 검증된 조직 형태 — Palantir가 창안하고 Anthropic·OpenAI가 채택한 Forward Deployed Engineer(FDE, 내부코드 "Delta").',
  mapping: [
    { fde: '엔지니어가 고객사 내부에 상주', dt: 'Co-Design Pod 상주 — "영업 뒤"가 아니라 "고객 옆"' },
    { fde: '"한 고객, 많은 능력" (제품팀은 반대)', dt: '파일럿 고객 1사 집중 → 확대' },
    { fde: '말한 요구 vs 실제 요구의 간극 해소', dt: 'As-Is(스펙 수령) → To-Be(요구 공동 정의)의 실행 메커니즘' },
    { fde: 'gravel road → paved highway (거친 해법 → 표준화)', dt: '커스텀 대응 → 재사용 설계 플랫폼 축적' },
    { fde: '청구 시간 아닌 성과(outcome)로 평가', dt: '개정 KPI (공동설계 건수·로드맵 채택률)' },
  ],
  adoption:
    'Palantir 640% 주가 수익률의 동력 → Anthropic·OpenAI가 엔터프라이즈 진출(GTM) 전략으로 그대로 채택. 즉 우리 최대 고객(모델사)이 이미 FDE로 자기 고객에게 침투 중 — 같은 언어로 대화하려면 대칭적 상주 모델이 필요하다.',
  memoryVariant:
    'FDE는 SW 회사 모델(코드 즉시 배포)이지만 메모리는 제조 리드타임이 길다. ∴ 순수 상주가 아니라 FDE(고객 상주) + 시스템 아키텍트·모델링(성능·파워 정량화)의 결합이 메모리판 정답. 상주 엔지니어가 시스템 모델을 무기로 들고 들어가야 물리적 제품 사이클보다 앞서 제안할 수 있다.',
  source: 'sources/articles/palantir-fde-model-2026-07.md',
}

// 스타 엔지니어 — Distinguished Engineer 트랙 (조직×문화)
// 원천: sources/articles/star-engineer-context-2026-07.md
export const DT_STAR_ENGINEER = {
  headline:
    'FDE·Co-Design Pod·시스템 모델링의 중심에는 고객사와 대등하게 기술을 토론·주도할 개인이 있어야 한다. 우리 회사에는 이미 DE가 있으므로, 과제는 "1호 임명"이 아니라 ① 기존 DE의 미션을 고객 협업·기술 리드로 재정의하고 ② 부족한 역량(특히 미국 고객 커뮤니케이션)을 외부 스타 영입으로 보강하는 것이다.',
  quote: {
    text: '조직의 이름 뒤에 숨지 않고, 개인이 자기 이름으로 불리며 책임과 결과를 직접 마주하는 사회.',
    attribution: '송길영, 『시대예보: 호명사회』 — 조직 이름 → 개인 이름으로의 전환',
  },
  whyStar:
    'SCA 시대에 고객 신뢰의 단위는 "삼성이라는 회사"가 아니라 "그 시스템 아키텍트 누구"다. 대기업이라 스타가 필요 없는 게 아니라, 오히려 대기업일수록 개인을 호명해 드러내야 조직의 기술 신뢰가 대외로 전달된다.',
  twoAxes: [
    {
      tag: '축 A',
      title: '기존 DE 미션 재정의 + 관리 업무 분리',
      body: '현 DE는 조직 관리자 역할에서 벗어나지 못해 고객과 활발한 기술 교류가 어렵다. 관리 보고·인사·예산에 시간을 쓰는 한 고객 아키텍트와 대등하게 토론할 여력이 없다. → 이원 경력 경로(dual-ladder) 실효화: 관리 보직에서 분리(임원급 처우 유지)하고 "고객사 협업을 통한 기술 리드"를 공식 미션으로 부여.',
    },
    {
      tag: '축 B',
      title: '실리콘밸리 현역 스타 영입 (미국 고객·영어)',
      body: '업계에서 이미 훌륭한 업적을 낸 엔지니어의 외부 영입이 매우 중요. 결정적 이유는 언어·현지성 — 고객 대부분이 미국에 있어 대등한 기술 토론에 뛰어난 영어 커뮤니케이션이 필수인데 한국인만으로는 구조적 한계. 실리콘밸리 현역 스타를 영입하면 언어·현지 네트워크·최신 아키텍처 감각을 한 번에 확보, 미국 현지 Co-Design Pod/FDE 앵커가 된다.',
    },
  ],
  hiringEdge: {
    intro: '2026 반도체 특수로 메모리 임직원 처우가 급등(삼성 DS 특별 성과급으로 ~6억원 성과급 시대, SK하이닉스 영업이익 10% 성과급 명문화·연봉 상한 철폐). 이 국면이 실리콘밸리 스타 영입 협상에 유리한 위치를 만든다.',
    points: [
      { k: '재원', v: '메모리 사상 최대 이익 → SV 스타의 높은 처우도 감당할 여력 확보' },
      { k: '정상화', v: '업계 보상 상향 리셋 → 일반 직원도 이미 6억대이므로 해외 스타 최상위 밴드 제시의 사내 형평성 마찰이 작다' },
      { k: '명분', v: '"반도체 특수"의 핵심 인재 확보·유지는 이사회·주주가 납득하는 투자' },
      { k: '이탈 방어', v: '같은 국면이 SK하이닉스 poaching 압력도 키움 → 처우 상향은 기존 DE·스타 retention 수단' },
      { k: '선순환', v: '과거 실리콘밸리 대비 보상 열위 해소 → 다수 스타 영입 가능 → 영입 축적이 조직 전반 기술 수준을 끌어올리는 선순환 기대 (전략 판단 2026-07-24)' },
    ],
  },
  source: 'sources/articles/star-engineer-context-2026-07.md',
}

// 3-Phase 액션 플랜
export const DT_PHASES = [
  {
    phase: 'Phase 1 · 90일',
    theme: '증명',
    color: '#1428a0',
    actions: ['파일럿 고객 1사 Co-Design Pod 1호 발족', '워크로드 랩 최소 구성 + 시스템 모델 v0.1 (디바이스→서버 레벨, 실측 오차 검증)', '선제 제안 1호 — 파일럿 고객 차세대 로드맵 대상', 'KPI 개정안 설계 (제안·공동설계 지표 추가)', '기존 DE 미션 재정의(관리 분리·고객 리드) + 실리콘밸리 영입 채널 설계'],
  },
  {
    phase: 'Phase 2 · 1년',
    theme: '제도화',
    color: '#d97706',
    actions: ['Co-Design Pod 3~5개 확대 (모델사+하이퍼스케일러+ASIC)', '시스템 아키텍트·모델링 전문 조직 신설 — 모델 v1.0 (랙 레벨)', '★ 기존 DE 관리 분리·고객 리드 배치 + 실리콘밸리 스타 영입 1명', '로드맵 교차 리뷰 정례화 (분기)', 'PoA 사이클 제도화 — 연 4회', '개정 KPI 전면 적용', '★ SCA형 계약 1건 이상 수주 (공동설계 조항 포함)'],
  },
  {
    phase: 'Phase 3 · 3년',
    theme: '표준화',
    color: '#059669',
    actions: ['커스텀 설계 플랫폼 완성 — 커스텀 대응 리드타임 50% 단축', '시스템 모델 v2.0 (데이터센터 레벨) — 고객 공용 시뮬레이션 자산으로 SCA 협상에 직접 활용', '"전략적 인프라 파트너" IR 공시 가능 수준 도달', '임베디드 SW 별도 매출 라인 가동'],
  },
]

// KPI
export const DT_KPIS = [
  { label: '공동설계 조항 포함 계약', now: '파악 필요', y1: '1건+', y3: '분기 공시 수준' },
  { label: '선제 제안 건수 (연)', now: '~0 (RFQ 응답 중심)', y1: '12건', y3: '40건' },
  { label: '제안 → 로드맵 채택률', now: '—', y1: '20%', y3: '35%' },
  { label: '개발 엔지니어 고객 직접 교류 시간', now: '낮음', y1: '10%', y3: '25%' },
  { label: '커스텀 제품 매출 비중', now: '낮음', y1: '추적 시작', y3: '30%+' },
  { label: '시스템 모델 커버리지', now: '디바이스 (데이터시트)', y1: '서버→랙 레벨 (v1.0)', y3: '데이터센터 레벨 (v2.0)·고객 공용' },
  { label: '시스템 아키텍트·모델링 인력', now: '산발 (전담 없음)', y1: '전담 조직 출범', y3: 'Pod당 아키텍트 1명+ 공급' },
  { label: '고객 기술 리드 미션 DE (관리 분리)', now: '0 (전원 관리 겸임)', y1: '3명+ 재배치', y3: '대상 DE 전원' },
  { label: '실리콘밸리 현역 스타 영입', now: '0', y1: '1명+', y3: '5명+ · 미국 고객 리드 앵커' },
]

// 시나리오 연결
export const DT_SCENARIO_LINKS = [
  { scenario: 'A', note: '진영별 공급망에서 진영 내 핵심 고객과의 SCA가 더 중요 — 동일 작동' },
  { scenario: 'B', note: 'SCA 시장 최대 개화 — 본 전략의 주 작동 무대, MB-4의 조직적 전제조건' },
  { scenario: 'C', note: '수요 수축기 최소 약정 매출 락인이 방어벽 (RS-8 연계)' },
  { scenario: 'D', note: '공동설계 없이는 락인 계약 자체가 없음 — 방어 가치 동일' },
  { scenario: 'E', note: '차세대 아키텍처 전환기 워크로드 조기 가시성이 생존 조건' },
]

// 요약 발표자료 다운로드 (outputs/presentation/scripts/generate_dev_transformation_summary.cjs로 재생성,
// public/downloads/에 빌드 복사본 — 1장 요약 × 디테일 3단계)
export const DT_DOWNLOADS = [
  {
    file: 'dev-transformation-summary-high.pptx',
    level: '상',
    label: '디테일 상 — 상세',
    desc: '사건 타임라인 · As-Is→To-Be · 4대 축 · FDE 스타 · 임금 환경 변화',
    color: '#0e6ba8',
  },
  {
    file: 'dev-transformation-summary-mid.pptx',
    level: '중',
    label: '디테일 중 — 표준',
    desc: '계약 진화(Spot→LTA→전략적 고객 계약) · 역할 전환 · FDE 스타 · 임금 선순환',
    color: '#028090',
  },
  {
    file: 'dev-transformation-summary-low.pptx',
    level: '하',
    label: '디테일 하 — 핵심',
    desc: '북극성·호명사회 인용 · 전환 한 컷 · FDE 스타 · 임금 선순환',
    color: '#02a878',
  },
  {
    file: 'dev-transformation-summary-fdp.pptx',
    level: '제품',
    label: '제품·기술 축 — FDP',
    desc: 'FDP 플랫폼: 환경 변화·Captive 차트 · 선택지 비교 · 전략·실행 · 생태계 확산 (4장)',
    color: '#4c7c94',
  },
  {
    file: 'dev-transformation-summary-fdp-eco.pptx',
    level: '실행',
    label: '생태계 확산 실행전략',
    desc: '2023 다운턴 교훈(낙폭·재배분·QLC 경쟁) · KV Cache 수요·RUH·DWPD 갭 · SCA·FDP·FDE 실행전략 (3장)',
    color: '#028090',
  },
  {
    file: 'dev-transformation-consulting.pptx',
    level: '컨설팅',
    label: '컨설팅 스타일 통합 덱',
    desc: 'Pyramid Principle·액션 타이틀·하비볼 매트릭스: 요약 → 환경 변화 → 2023 복기 → KV cache 갭 → 선택지 → 전략 구조 → 협업 3층 → Ask (8장)',
    color: '#1428a0',
  },
]

// 제품·기술 축 — FDP Host–SSD 통합 플랫폼 (wiki/strategies/fdp-host-ssd-platform.md 미러)
// 서사: 환경 변화 → Captive 위상 변화(데이터) → 전략 선택지 → 선택 논리 → 실행
export const DT_FDP = {
  declaration: 'FDP SSD 공급자 → FDP 기반 Host–SSD 통합 솔루션 제공자',
  messageKo: 'Binding으로 수요를 확보하고, FDP로 제품을 표준화하며, 시스템 소프트웨어로 고객 워크로드를 연결한다',
  messageEn: 'Binding secures demand. FDP standardizes the device. System software creates customer value.',
  relation: '인재 축(FDE 스타, 위 섹션)이 "누가 들어가는가"라면, 제품·기술 축은 "무엇을 들고 들어가는가"에 답한다 — FDE가 이 플랫폼을 들고 고객 아키텍처 안으로 들어간다.',
  // ① 환경 변화 — 세 갈래 흐름
  envFlows: [
    { title: '수주산업화 — Binding 계약', desc: '5년 take-or-pay·선수금 수백억 달러 — "메모리가 처음으로 그 개념을 바인딩해" (이창수 부사장, 메모리 영업팀장). 물량은 잠기지만 완제품 부가가치는 보장하지 않는다', source: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md' },
    { title: '하이퍼스케일러의 수요 지배', desc: '하이퍼스케일 클라우드가 글로벌 enterprise SSD 물량의 ~55% 소비 — 소수 고객의 조달 결정이 NAND 공급망 규칙을 정한다', source: 'sources/articles/captive-ssd-fdp-context-2026-08.md' },
    { title: '고객 통제권의 상승', desc: 'TCO 통제를 위해 스토리지 스택을 계층별로 내재화 — 완제품 → 펌웨어 → 자체 컨트롤러(Captive) → 표준·웨이퍼. 이 흐름은 불가역', source: 'sources/articles/captive-ssd-fdp-context-2026-08.md' },
  ],
  // ② Captive SSD 위상 변화 — 계단 차트 데이터 (level = 고객이 통제하는 계층 깊이)
  captiveSteps: [
    { period: '~2016', level: 1, stage: '완제품 구매', evidence: '벤더 표준품 조달 — 통제권 없음' },
    { period: '2017~20', level: 2, stage: '커스텀 스펙·펌웨어', evidence: 'OCP 스토리지 스펙 · 고객별 펌웨어 브랜치 관행' },
    { period: '2021~', level: 3, stage: '자체 컨트롤러 (Captive)', evidence: 'AWS Nitro SSD(2021-12) — 자체 컨트롤러 자작 SSD. "crown jewels는 만들고 staples는 산다"' },
    { period: '2022~26', level: 4, stage: '표준 주도 + 웨이퍼 직구매', evidence: 'FDP(TP4146) 비준(2023) — Meta·Google 주도, 삼성 공동 · Meta CacheLib FDP 공식 지원 · NAND 웨이퍼 다년 계약' },
  ],
  captiveStats: [
    { value: '~55%', label: '하이퍼스케일러의 enterprise SSD 수요 비중' },
    { value: '+246%', label: 'NAND 웨이퍼 가격 (vs Q1\'25) — 웨이퍼 직구매 경쟁' },
    { value: '6개월', label: 'FDP 표준 비준 소요 — 고객(Meta·Google) 주도 속도' },
  ],
  captiveTakeaway: 'FDP 표준 자체가 고객이 설계한 것 — "데이터 배치 통제권을 표준으로 달라"는 요구의 산물. 단, 삼성은 FDP 표준의 공동 주도자(백서·기술 블로그 발행)다 — 흐름의 피해자가 아니라 설계 참여자 위치에 있다.',
  // ③ 전략 선택지 4개 — 평가 기준: 부가가치 방어·펌웨어 공통화·통제권 정합·차별화 지속성
  options: [
    { id: 'A', name: '컴포넌트 후퇴', desc: 'NAND·웨이퍼 공급에 집중, 완제품은 고객에 위임', verdict: false, reason: '물량은 지키나 완제품 부가가치 영구 상실 — 커머디티 공급자 고착, Binding이 있어도 마진 열위' },
    { id: 'B', name: '풀커스텀 대응', desc: '고객별 커스텀 SSD·펌웨어 전면 개발', verdict: false, reason: '제품·펌웨어 파편화 — "커스텀 소싱·컨트랙은 파운드리 모델과 비슷한데 그걸 우리가 안 해본 것, 보상 계약 없이 코스트를 다 먹었다" (최장석 상무)' },
    { id: 'C', name: 'FDP 표준 SSD만 공급 (HW-only)', desc: '표준 지원 하드웨어만 제공, 통합은 고객 몫', verdict: false, reason: '통제권 흐름과는 정합하나 "FDP 지원 여러 공급사 중 하나" — 시스템 SW 없이는 도입 장벽도 못 낮추고 차별화도 없어 가격 경쟁 회귀' },
    { id: 'D', name: 'FDP 표준 + 시스템 SW 통합 플랫폼', desc: '공통 펌웨어 + Host SDK·Profiler·E2E 검증 제공', verdict: true, reason: '유일하게 4개 기준 동시 충족 — 공통 펌웨어로 파편화 방지 + 고객 통제권을 표준으로 수용 + SW·검증 계층 차별화 + 표준 공동 주도자 지위 활용' },
  ],
  selectionLogic: '통제권 상승이 불가역이라면, 부가가치는 고객이 가져간 계층 아래(웨이퍼)가 아니라 아직 풀지 못한 계층 위 — 워크로드 ↔ FDP 정책 변환 — 에서 만든다. RS-3(전환비용)·임베디드 SW 수익화의 NAND/SSD 구체화.',
  // ④ 선택된 전략 — 구조·실행
  elements: [
    { name: 'Binding 계약', role: '장기 물량·공급능력 확보' },
    { name: 'FDP 표준 SSD', role: '고객 요구를 공통 인터페이스로 수용' },
    { name: '시스템 소프트웨어', role: '워크로드 요구를 FDP 정책으로 변환' },
    { name: 'End-to-End 검증', role: '실제 WAF·QoS·수명 개선 보장' },
    { name: '고객 공동개발', role: '고객 시스템 최적화·장기 관계' },
    { name: '현장 텔레메트리', role: '제품·SW 지속 개선 루프' },
  ],
  strategies: [
    { no: 1, title: 'Samsung FDP Enablement Platform', desc: 'FDP SDK·공통 라이브러리(Linux·io_uring·SPDK) + 워크로드 플러그인(RocksDB·CacheLib·Ceph·Vector DB·K8s) + Workload Profiler(trace→추천 RUH·예상 WAF) + Emulator/Digital Twin' },
    { no: 2, title: '표준 워크로드 프로파일 7종', desc: 'Cache·KV·Database·Multi-tenant·Vector·Checkpoint·QLC — 새 펌웨어가 아니라 Host 설정+검증된 사용법 → 펌웨어 공통화와 고객별 최적화 양립' },
    { no: 3, title: 'End-to-End 공동검증', desc: 'App→Host→SSD→NAND→텔레메트리 · 시스템 성과 지표(WAF·p999/p9999·격리·전력·qualification 기간) · 고객 trace의 pre/post-silicon 재사용' },
    { no: 4, title: '고객 공동개발 조직', desc: 'Host SW·Workload Integration·Solution Engineering·E2E Validation 4기능 — 제품 기획·개발 참여. Co-Design Pod·FDE의 NAND/SSD 구체화' },
    { no: 5, title: 'Binding 계약에 기술협력 포함', desc: '물량·trace 제공·공동 로드맵 ↔ 공급능력·SDK·개선 목표 — 물량 계약을 공동 플랫폼 계약으로 격상 (take-or-pay 체제의 다음 단계)' },
    { no: 6, title: '오픈소스·차별화 경계', desc: '공개(기본 라이브러리·연동·적합성) / 차별화(NAND·FTL 모델·정책 추천·예측 모델) — lock-in 우려 없이 삼성 SSD 선택 시 더 높은 TCO 효과' },
  ],
  roadmap: [
    { phase: '1단계', title: '제품·기본 도구', desc: '공통 FDP 펌웨어 · SDK · 테스트 도구 · Emulator · 기본 프로파일' },
    { phase: '2단계', title: '전략 고객 공동검증', desc: '핵심 CSP 2~3개 pilot · trace 기반 RUH 정책 · 공통 요구 제품 반영' },
    { phase: '3단계', title: '상용 플랫폼화', desc: '전 라인업 확대 · qualification 자동화 · Binding에 SW 지원 포함' },
    { phase: '4단계', title: 'Host Control 확장', desc: 'QoS·전력/thermal·telemetry·attestation·multi-tenant control' },
  ],
  kpiCore: '고객 시스템에서 FDP가 실제 활성화된 SSD 용량 — 지원 출하량만 세면 미사용 기능이 된다',
  kpis: ['FDP 지원/활성화 비중', 'FDP 적용 Binding 물량', '펌웨어 브랜치 감소율', 'qualification 기간', 'WAF·NAND write 감소율', 'usable capacity 증가율', 'p999/p9999 개선율', 'Captive→삼성 완제품 전환 물량'],
}
