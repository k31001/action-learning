// 데이터 시각화 페이지용 데이터셋.
// 출처는 모두 data/{category}/*.md 의 표를 정리한 것 — 각 차트마다 source 필드로 표기.
//
// 단위 약속:
//   - 매출/시장규모: 십억 USD ($B) 또는 조 KRW (₩T) — chart 별 unit 명시
//   - 성장률: %
//   - 점유율: % (0~100)

// ─────────────────────────────────────────────────────────────────────────────
// COMPETITORS
// ─────────────────────────────────────────────────────────────────────────────

export const COMPETITOR_DATA = {
  // SK하이닉스 연간 매출/영업이익 (조 KRW)
  // 출처: SK하이닉스 IR, 2026-01 발표
  skHynixAnnual: {
    title: 'SK하이닉스 연간 매출·영업이익 추이',
    source: 'SK하이닉스 FY2025 실적 발표 (2026-01)',
    unit: '조 KRW',
    data: [
      { year: '2023', revenue: 32.8, opIncome: -7.7, opMargin: -23 },
      { year: '2024', revenue: 66.2, opIncome: 23.5, opMargin: 35 },
      { year: '2025', revenue: 97.1, opIncome: 47.2, opMargin: 49 },
    ],
  },

  // SK하이닉스 분기별 매출 (2025) — 조 KRW
  skHynixQuarterly: {
    title: 'SK하이닉스 분기별 매출',
    source: 'CNBC (2026-04-23), Futurum Group',
    unit: '조 KRW',
    data: [
      { quarter: 'Q1 2025', revenue: 17.6, yoyGrowth: 42 },
      { quarter: 'Q2 2025', revenue: 22.2, yoyGrowth: 35 },
      { quarter: 'Q3 2025', revenue: 24.4, yoyGrowth: 39 },
      { quarter: 'Q4 2025', revenue: 32.9, yoyGrowth: 44 },
    ],
  },

  // HBM 시장 점유율 변화 (%) — 시간순
  hbmShareTrend: {
    title: 'HBM 시장 점유율 변화 (제조사별)',
    source: 'Astute Group, Counterpoint Research',
    unit: '%',
    data: [
      { period: '2023',     skhynix: 50, samsung: 40, micron: 10 },
      { period: '2024',     skhynix: 54, samsung: 39, micron: 7  },
      { period: 'Q2 2025',  skhynix: 62, samsung: 17, micron: 21 },
      { period: 'Q3 2025',  skhynix: 53, samsung: 35, micron: 11 },
      { period: '2026E',    skhynix: 50, samsung: 30, micron: 20 },
    ],
  },

  // 주요 마일스톤 (텍스트 카드)
  milestones: {
    title: '경쟁사 핵심 마일스톤 (2025–2026)',
    items: [
      { date: '2025-Q1', actor: 'SK하이닉스', event: 'DRAM 시장 점유율 1위 첫 달성 (36% vs 삼성 34%) — 33년 만의 역전' },
      { date: '2025-09', actor: 'SK하이닉스', event: 'HBM4 양산 준비 완료 선언 (세계 최초)' },
      { date: '2025-12', actor: 'CES 2026',   event: '16레이어 HBM4 48GB (2TB/s+) 공개' },
      { date: '2026-Q1', actor: 'SK하이닉스', event: '영업이익률 72% — HBM4 수요가 향후 3년치 생산 용량 초과' },
      { date: '2026-05', actor: 'SK하이닉스', event: 'M15X 팹 클린룸 1호 완공 — HBM3E·HBM4 혼합 생산' },
      { date: '2026',    actor: '삼성전자',   event: 'HBM3E 고객 인증 확대 + HBM4 양산으로 30%+ 점유율 회복 목표' },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// MACRO
// ─────────────────────────────────────────────────────────────────────────────

export const MACRO_DATA = {
  // 빅테크 4사 연간 Capex ($B)
  // 출처: CNBC (2026-04-30), Fortune (2026-04-29), Tom's Hardware
  bigTechCapex: {
    title: '빅테크 4사 연간 AI Capex',
    source: 'CNBC, Fortune, Tom\'s Hardware (2026-04)',
    unit: '$B',
    data: [
      { year: '2024', alphabet: 52, amazon: 60, microsoft: 55, meta: 38, total: 205 },
      { year: '2025', alphabet: 75, amazon: 100, microsoft: 80, meta: 65, total: 320 },
      { year: '2026E', alphabet: 185, amazon: 200, microsoft: 190, meta: 135, total: 710 },
      { year: '2027E', alphabet: 250, amazon: 270, microsoft: 250, meta: 180, total: 950 },
    ],
  },

  // 4사 합계 + YoY 성장률
  capexGrowth: {
    title: '4사 합계 Capex + 성장률 (YoY)',
    source: 'Tom\'s Hardware, CNBC (2026-04-30)',
    unit: '$B',
    data: [
      { year: '2024', total: 205, yoyGrowth: null },
      { year: '2025', total: 320, yoyGrowth: 56 },
      { year: '2026E', total: 710, yoyGrowth: 122 },
      { year: '2027E', total: 950, yoyGrowth: 34 },
    ],
  },

  // Q1 2026 클라우드 매출 성장률
  cloudGrowthQ1_2026: {
    title: 'Q1 2026 클라우드 매출 성장률 (YoY)',
    source: 'Uncoveralpha (2026-04)',
    unit: '%',
    data: [
      { provider: 'Google Cloud',     yoyGrowth: 63, revenue: 20.0 },
      { provider: 'Microsoft Azure',  yoyGrowth: 40, revenue: null },
      { provider: 'AWS',              yoyGrowth: 28, revenue: 37.6 },
      { provider: 'Meta (전체)',       yoyGrowth: 33, revenue: null },
    ],
  },

  // AI 인프라 비중 (2026)
  aiInfraShare: {
    title: '2026 하이퍼스케일러 Capex 구성',
    source: 'IEEE ComSoc Technology Blog (2025-12-22)',
    unit: '$B',
    data: [
      { name: 'AI 인프라 (서버·GPU·DC)', value: 450, color: '#10b981' },
      { name: '기타 IT 인프라',           value: 150, color: '#6b7280' },
    ],
  },

  // 알림 카드: 재무 영향
  warnings: [
    { title: 'Alphabet FCF 90% 급감', detail: '2025 $73.3B → 2026E $8.2B (Pivotal Research)', severity: 'critical' },
    { title: 'Amazon FCF 마이너스 전환', detail: '2026E -$17B 전망', severity: 'critical' },
    { title: 'AI Capex / 운영현금흐름', detail: '2024 76% → 2026 94% — 자기잠식 임계점 근접', severity: 'warning' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// MARKET
// ─────────────────────────────────────────────────────────────────────────────

export const MARKET_DATA = {
  // HBM 시장 규모 ($B)
  // 출처: Yole Group, Bank of America, Micron
  hbmMarketSize: {
    title: 'HBM 시장 규모 전망',
    source: 'Yole Group, Bank of America, Micron',
    unit: '$B',
    data: [
      { year: '2024',  size: 17.5,  source: 'Yole' },
      { year: '2025',  size: 34.0,  source: 'Yole' },
      { year: '2026E', size: 54.6,  source: 'BofA' },
      { year: '2028E', size: 100.0, source: 'Micron' },
      { year: '2030E', size: 98.0,  source: 'Yole (CAGR 33%)' },
    ],
  },

  // HBM 수요 성장률 (YoY)
  hbmDemandGrowth: {
    title: 'HBM 수요 성장률 (YoY)',
    source: '복수 기관',
    unit: '%',
    data: [
      { year: '2023',  growth: 150 },
      { year: '2024',  growth: 200 },
      { year: '2025',  growth: 130 },
      { year: '2026E', growth: 70 },
    ],
  },

  // HBM 세대별 비중 (2026)
  hbmGenerationMix: {
    title: '2026 HBM 세대별 시장 비중',
    source: 'NAND Research, TrendForce',
    unit: '%',
    data: [
      { name: 'HBM3E', value: 67, price: 300, color: '#3b82f6' },
      { name: 'HBM4',  value: 33, price: 500, color: '#8b5cf6' },
    ],
  },

  // DRAM 대비 HBM 비중
  hbmDramRatio: {
    title: 'HBM / 전체 DRAM 매출 비중',
    source: 'Yole Group, TrendForce',
    unit: '%',
    data: [
      { year: '2025',  hbm: 20, etc: 80 },
      { year: '2030E', hbm: 50, etc: 50 },
    ],
  },

  // AI 서버 시장 규모
  aiServerMarket: {
    title: 'AI 서버 시장 규모',
    source: '복수 기관 (CAGR 30%+)',
    unit: '$B',
    data: [
      { year: '2024',  size: 140 },
      { year: '2027E', size: 350 },
      { year: '2030E', size: 825 },
    ],
  },

  // KPI 카드용
  kpis: [
    { label: 'HBM 수요 성장 (2025)', value: '+130%', accent: 'green' },
    { label: 'AI / DRAM 웨이퍼 (2026)', value: '~20%', accent: 'blue' },
    { label: '서버 DRAM 성장 (2026E)', value: '+50%', accent: 'blue' },
    { label: 'HBM4 단가 프리미엄', value: '+67%', accent: 'amber' },
    { label: 'GPU당 HBM 탑재량', value: '×7배', accent: 'amber' },
    { label: 'HBM 공급 부족 지속', value: '~2027', accent: 'red' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// POLICY
// ─────────────────────────────────────────────────────────────────────────────

export const POLICY_DATA = {
  // 미중 수출통제 타임라인
  // 출처: BIS, CRS, PIIE, Tom's Hardware, EE Times
  exportControlTimeline: {
    title: '미중 반도체 수출 통제 타임라인',
    source: 'BIS, CRS, PIIE, Tom\'s Hardware',
    data: [
      { date: '2022-10', event: 'BIS 1차 통제 (A100/H100 차단)', impact: 'high', category: '제재' },
      { date: '2023-10', event: 'A800·H800 등 우회칩 차단',         impact: 'medium', category: '제재' },
      { date: '2024',    event: 'HBM·첨단패키징·DRAM 통제 + Entity List 140개 추가', impact: 'critical', category: '제재' },
      { date: '2025-03', event: '트럼프 행정부 42개 추가 제재',     impact: 'high', category: '제재' },
      { date: '2025-04', event: 'H20 라이선스 의무화',              impact: 'high', category: '제재' },
      { date: '2025-07', event: 'H20·H200 사안별 허용 (15% 수익공유)', impact: 'medium', category: '완화' },
      { date: '2025-08', event: 'VEU 폐지 — Samsung·SK·Intel 영향', impact: 'critical', category: '제재' },
      { date: '2025-09', event: '자회사 규칙 시행 + 23개 추가 제재', impact: 'high', category: '제재' },
      { date: '2025-12', event: 'Samsung·SK 2026년 연간 라이선스 발급', impact: 'medium', category: '연장' },
      { date: '2026-04', event: 'MATCH 법안 발의 (동맹국 공조)',    impact: 'high', category: '확대' },
    ],
  },

  // Entity List 누적 추가 기업 수
  entityListGrowth: {
    title: 'Entity List 추가 누적 (대중국 반도체 관련)',
    source: 'BIS 발표 종합',
    unit: '기업 수',
    data: [
      { period: '2022',     cumulative: 50 },
      { period: '2023',     cumulative: 100 },
      { period: '2024',     cumulative: 240 },
      { period: '2025-03',  cumulative: 282 },
      { period: '2025-09',  cumulative: 305 },
    ],
  },

  // 정책 카테고리별 영향도 — 한국 메모리 기업 관점
  policyImpactMatrix: {
    title: '정책별 한국 메모리 기업 영향도',
    source: '자체 평가 (data/policy/*.md 종합)',
    data: [
      { policy: 'HBM 對중국 수출 통제',        impactLevel: 95, urgency: 'critical' },
      { policy: 'VEU 폐지',                    impactLevel: 90, urgency: 'critical' },
      { policy: 'Entity List 자회사 규칙',     impactLevel: 75, urgency: 'high' },
      { policy: 'MATCH 법안 (EUV/TSV 통제)',   impactLevel: 85, urgency: 'high' },
      { policy: '연간 라이선스 (vs 무기한)',   impactLevel: 70, urgency: 'medium' },
      { policy: 'CHIPS Act 보조금 조건',       impactLevel: 60, urgency: 'medium' },
      { policy: '한국 K-CHIPS Act 세액공제',   impactLevel: 55, urgency: 'low' },
      { policy: '중국 희토류 수출 통제 보복', impactLevel: 50, urgency: 'medium' },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// TECHNOLOGY
// ─────────────────────────────────────────────────────────────────────────────

export const TECHNOLOGY_DATA = {
  // HBM 세대별 사양 비교
  hbmGenerationSpec: {
    title: 'HBM 세대별 핵심 사양 비교',
    source: 'TrendForce, JEDEC, SK hynix Newsroom',
    data: [
      { gen: 'HBM3',         pinSpeed: 6.4,  bandwidth: 819,  capacity: 24, busWidth: 1024 },
      { gen: 'HBM3E (8Hi)',  pinSpeed: 9.5,  bandwidth: 1200, capacity: 24, busWidth: 1024 },
      { gen: 'HBM3E (12Hi)', pinSpeed: 12.4, bandwidth: 1300, capacity: 36, busWidth: 1024 },
      { gen: 'HBM4',         pinSpeed: 12.4, bandwidth: 3300, capacity: 48, busWidth: 2048 },
    ],
  },

  // HBM 핀 속도 진화 (Gbps)
  pinSpeedEvolution: {
    title: 'HBM 핀 속도 진화 (Gbps)',
    source: 'JEDEC, 제조사 발표',
    unit: 'Gbps',
    data: [
      { gen: 'HBM2',  speed: 2.4,  year: 2018 },
      { gen: 'HBM2E', speed: 3.6,  year: 2020 },
      { gen: 'HBM3',  speed: 6.4,  year: 2022 },
      { gen: 'HBM3E', speed: 9.5,  year: 2024 },
      { gen: 'HBM4',  speed: 12.4, year: 2026 },
      { gen: 'HBM4E', speed: 16.0, year: '2027E' },
    ],
  },

  // 제조사별 HBM4 양산 일정
  hbm4Roadmap: {
    title: '제조사별 HBM4 양산 일정',
    source: 'TrendForce, 각사 IR',
    data: [
      { company: 'SK하이닉스', sample: '2025-03', massProd: '2026-Q3', status: 'first-mover' },
      { company: '삼성전자',   sample: '2025-Q3', massProd: '2026-Q4', status: 'fast-follow' },
      { company: '마이크론',   sample: '2025-Q4', massProd: '2027-Q1', status: 'follower' },
    ],
  },

  // NAND 공정 전환 비교
  nandProcessTransition: {
    title: 'NAND 공정 전환 (레이어 수)',
    source: 'data/technology/nand-process-transition.md',
    unit: 'layers',
    data: [
      { year: '2022', samsung: 176, skhynix: 176, micron: 232 },
      { year: '2023', samsung: 236, skhynix: 238, micron: 232 },
      { year: '2024', samsung: 286, skhynix: 321, micron: 276 },
      { year: '2025', samsung: 286, skhynix: 321, micron: 276 },
      { year: '2026E', samsung: 321, skhynix: 400, micron: 332 },
    ],
  },

  // 핵심 기술 마일스톤
  techMilestones: [
    { tech: 'HBM4',         milestone: '대역폭 3.3 TB/s 달성 (vs HBM3E 1.3 TB/s)', impact: 'positive' },
    { tech: 'HBM4 인터페이스', milestone: '버스폭 2배 (1024 → 2048-bit)',            impact: 'positive' },
    { tech: '16Hi 스택',     milestone: '용량 48 GB (HBM3 대비 2배)',                impact: 'positive' },
    { tech: 'PAM-4 시그널링', milestone: 'HBM4E 16 Gbps 목표',                       impact: 'positive' },
    { tech: 'CMX',           milestone: 'NVIDIA 신규 메모리 인터커넥트 표준 — 메모리 SoC 통합 가속화', impact: 'risk' },
  ],
}

// 공통 컬러 팔레트 (recharts 일관성용)
export const VIZ_COLORS = {
  primary: '#3b82f6',
  green:   '#10b981',
  amber:   '#f59e0b',
  red:     '#ef4444',
  purple:  '#8b5cf6',
  pink:    '#ec4899',
  cyan:    '#06b6d4',
  gray:    '#6b7280',
  // 회사 컬러
  samsung: '#1428a0',
  skhynix: '#e8192c',
  micron:  '#e85d26',
  alphabet:'#4285f4',
  amazon:  '#ff9900',
  microsoft:'#00a4ef',
  meta:    '#0668e1',
}
