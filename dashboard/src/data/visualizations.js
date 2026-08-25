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
  // 출처: Astute Group (2024~Q3 2025 매출 점유), Counterpoint Research (Q3 2025 재추정 + Rubin)
  // ※ Counterpoint Q3 2025 추정: SK 57 / Samsung 22 / Micron 21 (Astute보다 SK 우위 더 큼) — Counterpoint 행 별도 표시
  hbmShareTrend: {
    title: 'HBM 시장 점유율 변화 (제조사별)',
    source: 'Astute Group, Counterpoint Research (Q3 2025 두 기관 추정 병기)',
    unit: '%',
    data: [
      { period: '2023',                  skhynix: 50, samsung: 40, micron: 10 },
      { period: '2024',                  skhynix: 54, samsung: 39, micron: 7  },
      { period: 'Q2 2025',               skhynix: 62, samsung: 17, micron: 21 },
      { period: 'Q3 2025 (Astute)',      skhynix: 53, samsung: 35, micron: 11 },
      { period: 'Q3 2025 (Counterpoint)', skhynix: 57, samsung: 22, micron: 21 },
      { period: '2026E',                 skhynix: 50, samsung: 30, micron: 20 },
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
      { date: '2025-Q4', actor: '삼성전자',   event: '메모리 매출 1위 회복 $25.9B (Counterpoint) — 단 SK FY25 OP 47.2조 > Samsung 전사 43.6조' },
      { date: '2026-01', actor: '시장',       event: '64GB DDR5 RDIMM $450 → Q1 2026 >$900 (Counterpoint) — DRAM OPM 60% 사상 첫 HBM 초과' },
      { date: '2026',    actor: 'NVIDIA',     event: 'AI 서버용 LPDDR 피벗 — 스마트폰 OEM 1곳 규모 신규 수요 (Counterpoint "seismic shift")' },
      { date: '2026-05', actor: 'Micron',     event: '미국 DRAM 10% → 40% (10년) $200B 약정 — Manassas DDR4/1α 양산 개시 (Bloomberg)' },
    ],
  },

  // ── 신규 (2026-05-07): Micron 매출 + DC 비중 ──────────────────────────────
  // 출처: wiki/entities/micron.md (Futurum Group, Blocks and Files, Tom's Hardware)
  micronAnnual: {
    title: 'Micron 연간 매출·HBM 매출·DC 비중',
    source: 'Micron IR, Futurum Group, Blocks and Files',
    unit: '$B',
    data: [
      { year: 'FY2023', revenue: 15.5,  hbm: 0,   dcShare: null, note: '메모리 불황 (-49%)' },
      { year: 'FY2024', revenue: 25.1,  hbm: 1.5, dcShare: null, note: '회복세 (+62%)' },
      { year: 'FY2025', revenue: 37.4,  hbm: 8.0, dcShare: 56,   note: '역대 최고 (+49%, DC 56%)' },
    ],
  },

  // ── 신규: 글로벌 DRAM 점유율 (3강 + 중국) ───────────────────────────────────
  // 출처: wiki/concepts/dram-market-share.md (TrendForce 2025-11-26)
  dramMarketShare: {
    title: '글로벌 DRAM 점유율 (분기별, 33년 만의 1위 교체)',
    source: 'TrendForce (2025-11-26), Korea Herald',
    unit: '%',
    data: [
      { period: '2024',     samsung: 41,   skhynix: 34,   micron: 25,   cxmt: 0  },
      { period: 'Q1 2025',  samsung: 34,   skhynix: 36,   micron: 25,   cxmt: 5  },
      { period: 'Q2 2025',  samsung: 33,   skhynix: 35,   micron: 26,   cxmt: 6  },
      { period: 'Q3 2025',  samsung: 32.6, skhynix: 33.2, micron: 25.7, cxmt: 8  },
      { period: '2027E',    samsung: 29,   skhynix: 31,   micron: 24,   cxmt: 16 },
    ],
  },

  // ── 신규: CXMT/YMTC 점유율 성장 ─────────────────────────────────────────────
  // 출처: wiki/entities/cxmt.md, wiki/entities/ymtc.md (Morgan Stanley, Digitimes, TechInsights)
  chinaCompetitorShare: {
    title: '중국 메모리 점유율 추이 (CXMT DRAM + YMTC NAND)',
    source: 'Morgan Stanley, Digitimes, TrendForce',
    unit: '%',
    data: [
      { year: '2020',  cxmtDram: 0,   ymtcNand: 2  },
      { year: '2023',  cxmtDram: 3,   ymtcNand: 5  },
      { year: '2024',  cxmtDram: 5,   ymtcNand: 9  },
      { year: '2025',  cxmtDram: 8,   ymtcNand: 13 },
      { year: '2027E', cxmtDram: 16,  ymtcNand: 18 },
    ],
  },

  // ── 신규: 4사 CapEx + R&D 비교 ─────────────────────────────────────────────
  // 출처: wiki/concepts/dram-market-share.md
  capexComparison: {
    title: '메모리 4사 CapEx 비교 (2025 추정)',
    source: '각사 IR, Morgan Stanley, Digitimes',
    unit: '$B',
    data: [
      { vendor: 'Samsung (메모리)', capex: 19.0, rdRatio: 10, note: 'DS 부문 중 메모리 추정' },
      { vendor: 'SK하이닉스',       capex: 17.5, rdRatio: 7,  note: 'HBM 95%+ 집중' },
      { vendor: 'Micron',           capex: 14.0, rdRatio: 11, note: 'CHIPS Act 활용' },
      { vendor: 'CXMT',             capex: 4.5,  rdRatio: 4,  note: '빅펀드 III 추정' },
      { vendor: 'YMTC',             capex: 4.2,  rdRatio: 4,  note: '추정' },
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

  // ── 신규 (2026-05-07): 중국 빅펀드 I/II/III 누적 ──────────────────────────
  // 출처: wiki/entities/cxmt.md, wiki/entities/ymtc.md (Bloomberg, Reuters, Yole Group)
  chinaBigFund: {
    title: '중국 국가집성전로산업투자기금 (빅펀드) — CXMT/YMTC 자본 동력',
    source: 'Bloomberg (2024-05-24), Reuters (2024-03-27), Yole Group',
    unit: '$B',
    data: [
      { phase: '빅펀드 I (2014)',  size: 19, target: 'YMTC, SMIC, CXMT 전신 등' },
      { phase: '빅펀드 II (2019)', size: 28, target: '제조·장비·소재 확대' },
      { phase: '빅펀드 III (2024)', size: 47, target: '첨단공정·메모리 자립 — 역대 최대' },
    ],
  },

  // ── 신규: AI DC 전력 소비 폭증 ──────────────────────────────────────────────
  // 출처: wiki/concepts/energy-constraints.md (IEA)
  dcPowerConsumption: {
    title: 'AI 데이터센터 전력 소비 전망 (TWh)',
    source: 'IEA, Microsoft IR, Amazon IR',
    unit: 'TWh',
    data: [
      { year: '2024',  twh: 460,   note: '베이스라인' },
      { year: '2026',  twh: 1025,  note: 'IEA 중간 추정 (950~1,100)' },
      { year: '2030E', twh: 1700,  note: 'AI 가속 시나리오' },
    ],
  },
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
    { label: 'Enterprise SSD TAM (2025)', value: '$32B', accent: 'green' },
    { label: '북미 DC SSD CAGR', value: '27.6%', accent: 'green' },
    { label: 'UFS 4.1 + LPDDR5X 가격', value: '+85% YoY', accent: 'amber' },
    { label: 'AI SSD 단일 IOPS (현재)', value: '5.4M', accent: 'blue' },
    { label: 'AI SSD IOPS 목표 (2027)', value: '100M', accent: 'red' },
    { label: 'Micron NAND DC 비중', value: '56%', accent: 'amber' },
  ],

  // ── 신규 (2026-05-07): Enterprise SSD 시장 ────────────────────────────────
  // 출처: wiki/concepts/ssd-ufs-market.md (Mordor, Intel Market Research)
  enterpriseSsdMarket: {
    title: 'Enterprise SSD 시장 규모 (글로벌 + 북미 DC)',
    source: 'Mordor Intelligence, Intel Market Research',
    unit: '$B',
    data: [
      { year: '2025',  global: 32,   naDc: 16.7,  note: '하이퍼스케일러 60% 매출' },
      { year: '2027E', global: 50,   naDc: 28,    note: 'PCIe Gen6 본격 진입' },
      { year: '2031E', global: 105,  naDc: 69.1,  note: '북미 CAGR 27.6%' },
    ],
  },

  // ── 신규: AI SSD IOPS 경쟁 ─────────────────────────────────────────────────
  // 출처: wiki/concepts/ssd-ufs-market.md, wiki/entities/nvidia-cmx-scada.md
  aiSsdIopsRace: {
    title: 'AI SSD 단일 IOPS 경쟁 — NVIDIA Storage-Next',
    source: 'NVIDIA, Micron, SK hynix, Kioxia 발표 (2025~2027)',
    unit: 'M IOPS',
    data: [
      { period: '2025-Q4 (현재)',     micron: 5.4,  skhynix: null, kioxia: null, samsung: null },
      { period: '2026 GTC',           micron: 5.4,  skhynix: null, kioxia: null, samsung: 5.4 },
      { period: '2026~2027 (개발)',   micron: 10,   skhynix: 25,   kioxia: null, samsung: null },
      { period: '2027 (목표)',        micron: 50,   skhynix: 100,  kioxia: 100,  samsung: null },
    ],
    note: 'Samsung SLC AI SSD 로드맵 미공개 ⚠️',
  },

  // ── 신규: UFS + LPDDR5X 가격 폭등 ─────────────────────────────────────────
  // 출처: wiki/concepts/ssd-ufs-market.md (abit.ee 2026)
  mobileMemoryPrice: {
    title: 'UFS 4.1 + LPDDR5X 모바일 메모리 가격 변동률 (YoY)',
    source: 'abit.ee, Global Semi Research (2026-04)',
    unit: '%',
    data: [
      { period: '2025-H1',   ufs: 5,   lpddr: 8,   note: '베이스라인' },
      { period: '2025-H2',   ufs: 25,  lpddr: 30,  note: 'AI 부족 전이 시작' },
      { period: '2026-H1',   ufs: 85,  lpddr: 90,  note: '플래그십 16GB+1TB 표준' },
      { period: '2026-Q4E',  ufs: 30,  lpddr: 35,  note: '신규 capex 가동으로 완화' },
    ],
  },

  // ── 신규: NAND DC 매출 비중 (Micron 사례) ─────────────────────────────────
  // 출처: wiki/concepts/ssd-ufs-market.md (Futurum Group)
  nandDcShare: {
    title: 'NAND 데이터센터 매출 비중 (Micron 공개 사례)',
    source: 'Futurum Group (Micron Q4 FY2025)',
    unit: '%',
    data: [
      { vendor: 'Micron (FY2025)',     dcShare: 56, note: '역대 최고, 공개' },
      { vendor: 'Samsung (NAND)',      dcShare: null, note: '비공개 ⚠️' },
      { vendor: 'SK하이닉스 (NAND)',   dcShare: null, note: '비공개' },
      { vendor: 'YMTC',                dcShare: 30, note: '추정 (Xtacking 3D NAND)' },
    ],
  },
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
    source: '자체 평가 (wiki/concepts/*.md 종합)',
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

  // ── 신규 (2026-05-07): CHIPS Act 보조금 비교 ─────────────────────────────
  // 출처: wiki/concepts/chips-act.md (NIST, AIP.ORG)
  chipsActSubsidies: {
    title: '미국 CHIPS Act 직접 보조금 비교 — Samsung은 3위',
    source: 'NIST CHIPS Program, AIP.ORG (2024-12)',
    unit: '$B',
    data: [
      { vendor: 'Intel',          subsidy: 8.5,   investment: 100,  region: '오하이오·애리조나 등' },
      { vendor: 'TSMC',           subsidy: 6.6,   investment: 65,   region: '애리조나' },
      { vendor: 'Micron',         subsidy: 6.16,  investment: 50,   region: '아이다호·뉴욕' },
      { vendor: 'Samsung',        subsidy: 4.745, investment: 37,   region: '텍사스 테일러' },
    ],
  },

  // ── 신규: Samsung Taylor 팹 타임라인 ──────────────────────────────────────
  // 출처: wiki/concepts/chips-act.md
  taylorTimeline: {
    title: 'Samsung 텍사스 테일러 팹 — CHIPS Act 진척',
    source: 'NIST CHIPS Program, Tom\'s Hardware, Digitimes',
    items: [
      { date: '2021-11', event: '테일러 팹 건설 발표 ($170억 초기 투자)', status: 'complete' },
      { date: '2024-04', event: 'CHIPS Act 예비 지원 발표 ($6.4B)', status: 'complete' },
      { date: '2024-12', event: '연방 보조금 최종 확정 ($4.745B, $1.655B 감액)', status: 'complete' },
      { date: '2025-07', event: 'Tesla AI5/AI6 칩 $16.5B 공급 계약 — 첫 주요 고객', status: 'complete' },
      { date: '2025-09', event: 'Texas 주정부 보조금 $250M 확정', status: 'complete' },
      { date: '2026-03', event: '2nm 공정용 첫 장비 반입 시작', status: 'complete' },
      { date: '2026-Q2', event: '2nm 위험생산(Risk Production) 시작 목표', status: 'in-progress' },
      { date: '2026-Q4', event: 'D8 — HBM 전용 2단계 발표 + 추가 보조금 협상 마감', status: 'upcoming' },
      { date: '2027-H2', event: '2nm 양산(Volume Production) 목표', status: 'upcoming' },
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
    source: 'wiki/concepts/nand-process-transition.md',
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
    { tech: 'CMX',           milestone: 'NVIDIA Context Memory Storage Platform — PM1753 공식 공급 ✅', impact: 'positive' },
    { tech: 'SCADA',         milestone: 'NVIDIA Storage-Next — SK·Kioxia·Micron이 핵심 파트너 선점 ⚠️', impact: 'risk' },
    { tech: 'PCIe Gen6',     milestone: 'PM1763 28.4 GB/s 시연 — 양산 시 매출 인식', impact: 'positive' },
    { tech: 'SLC AI SSD',    milestone: 'SK AI-N P / Kioxia 1억 IOPS 목표 — Samsung 로드맵 미공개 ⚠️', impact: 'risk' },
  ],

  // ── 신규 (2026-05-07): NVIDIA AI 스토리지 계층 (G1~G4) ────────────────────
  // 출처: wiki/entities/nvidia-cmx-scada.md (NVIDIA, HPCwire)
  nvidiaStorageStack: {
    title: 'NVIDIA AI 스토리지 계층 — G3.5 CMX 신설',
    source: 'NVIDIA Technical Blog, HPCwire (2026-03)',
    items: [
      { tier: 'G1',   media: 'GPU HBM',                 latency: '나노초',         role: '활성 계산 (핫 데이터)',     samsungPosition: 'HBM4E ✅ (28% Rubin 점유)' },
      { tier: 'G2',   media: '시스템 DRAM',             latency: '수십 ns',         role: 'KV 스테이징/버퍼링',         samsungPosition: 'DDR5 RDIMM' },
      { tier: 'G3',   media: '로컬 NVMe SSD',           latency: '마이크로초',     role: '단일 노드 캐시',             samsungPosition: 'PM1753 ✅ Gen5' },
      { tier: 'G3.5', media: 'CMX (이더넷 NVMe 어레이)', latency: 'μs~수백 μs',     role: '공유 포드 KV 캐시 (NEW)',    samsungPosition: 'PM1753 CMX 공식 ✅' },
      { tier: 'G4',   media: '공유 스토리지 (HDD)',      latency: '밀리초',         role: '지속성 데이터',             samsungPosition: '—' },
    ],
  },

  // ── 신규: NVIDIA AI SSD 파트너십 매트릭스 ─────────────────────────────────
  // 출처: wiki/entities/nvidia-cmx-scada.md, wiki/concepts/ssd-ufs-market.md
  aiSsdPartners: {
    title: 'NVIDIA AI SSD (Storage-Next) 파트너십 — Samsung 후행',
    source: 'NVIDIA, TrendForce, Blocks & Files (2025~2026)',
    items: [
      { vendor: 'Micron',       partnership: '최초 레퍼런스 (9650 Gen6) ✅',   nandType: 'TLC', iops: '5.4M (현재)', timing: '양산 중',  status: 'leader' },
      { vendor: 'SK하이닉스',    partnership: '공동 개발 (AI-N P) ✅',          nandType: 'SLC', iops: '25M→100M',    timing: '2026~2027', status: 'leader' },
      { vendor: 'Kioxia',        partnership: '공동 개발 ✅',                   nandType: 'SLC', iops: '100M',         timing: '2027',      status: 'fast-follow' },
      { vendor: 'Samsung',       partnership: '생태계 참여 (PM1763 시연) ⚠️',   nandType: 'TLC', iops: '미공개',        timing: '미정',      status: 'follower' },
    ],
  },

  // ── 신규: PCIe 세대 진화 (Gen3 → Gen7) ────────────────────────────────────
  // 출처: wiki/concepts/ssd-ufs-market.md
  pcieGenEvolution: {
    title: 'PCIe 세대 진화 — Enterprise SSD 인터페이스 표준',
    source: 'PCI-SIG, NVMe Consortium, JEDEC',
    unit: 'GB/s',
    data: [
      { gen: 'Gen3',  bandwidth: 1,    year: 2010, status: '레거시' },
      { gen: 'Gen4',  bandwidth: 2,    year: 2017, status: '점진 축소' },
      { gen: 'Gen5',  bandwidth: 4,    year: 2022, status: '양산 주력' },
      { gen: 'Gen6',  bandwidth: 8,    year: 2026, status: '진입 (PAM-4)' },
      { gen: 'Gen7',  bandwidth: 16,   year: 2028, status: '1억 IOPS 목표' },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// CAPEX — 메모리 3사 투자 히스토리 (역사이클 투자 근거)
// ─────────────────────────────────────────────────────────────────────────────
// 출처: wiki/concepts/memory-capex-history.md ← sources/raw-notes/memory-capex-history-research-2026-08-08.md
//
// 단위 약속:
//   - 회사별 CAPEX: $B (삼성·SK 원화 공시치를 연평균 환율로 환산 — krw 필드에 조원 원본 병기)
//   - 삼성 재무 (dsRev·dsOp·memRev): 조원 (우측 축)
//   - 삼성 CAPEX는 DS 부문(파운드리 포함), SK·Micron은 전사. Micron은 회계연도(8월 말 종료)
//   - DRAM/NAND 회사별 분리치는 2019·2025·2026E만 공개 추정 존재 (TrendForce)

export const CAPEX_DATA = {
  title: '메모리 3사 CAPEX vs 삼성 실적 — 역사이클 투자 (2006~2026E)',
  source: 'wiki/concepts/memory-capex-history.md (각사 IR·연차보고서, SEC 10-K, TrendForce)',
  // 툴팁 배지용 다운턴 연도 + 차트 음영 구간(라벨)
  downturnYears: ['2007', '2008', '2009', '2011', '2012', '2019', '2023'],
  downturns: [
    { from: '2007', to: '2009', label: '1차 치킨게임·금융위기' },
    { from: '2011', to: '2012', label: '2차 치킨게임' },
    { from: '2019', to: '2019', label: '다운턴' },
    { from: '2023', to: '2023', label: '다운턴' },
  ],
  // 2006~2015: 삼성·SK 일부 근사치(approx, ±0.5조) — 확정치·등급은 wiki 데이터 신뢰도 절 참조
  years: [
    { year: '2006',  samsung: 6.9,  samsungKrw: 6.6,   skhynix: 4.7,  skKrw: 4.5,   micron: 1.4,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 19.9, dsOp: 5.3, memRev: null, approx: true },
    { year: '2007',  samsung: 5.8,  samsungKrw: 5.4,   skhynix: 5.3,  skKrw: 4.9,   micron: 3.6,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 20.4, dsOp: 2.4, memRev: null, approx: true },
    { year: '2008',  samsung: 5.4,  samsungKrw: 6.0,   skhynix: 2.4,  skKrw: 2.7,   micron: 2.5,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 22.4, dsOp: 0.0, memRev: null, approx: true },
    { year: '2009',  samsung: 5.1,  samsungKrw: 6.5,   skhynix: 0.8,  skKrw: 1.0,   micron: 0.5,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 26.8, dsOp: 2.6, memRev: null, approx: true },
    { year: '2010',  samsung: 11.0, samsungKrw: 12.7,  skhynix: 2.6,  skKrw: 3.05,  micron: 0.6,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 37.6, dsOp: 10.1, memRev: 25.8 },
    { year: '2011',  samsung: 11.7, samsungKrw: 13.0,  skhynix: 3.2,  skKrw: 3.5,   micron: 2.6,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 37.0, dsOp: 7.3, memRev: 22.7, approx: true },
    { year: '2012',  samsung: 12.6, samsungKrw: 14.2,  skhynix: 3.4,  skKrw: 3.85,  micron: 1.7,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 34.9, dsOp: 4.2, memRev: null, approx: true },
    { year: '2013',  samsung: 11.5, samsungKrw: 12.6,  skhynix: 3.3,  skKrw: 3.6,   micron: 1.4,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 37.4, dsOp: 6.9, memRev: 23.7, approx: true, ssdRev: 2.6, ufsRev: 4.7, storageOp: 1.9 },
    { year: '2014',  samsung: 13.6, samsungKrw: 14.3,  skhynix: 4.9,  skKrw: 5.2,   micron: 3.1,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 39.7, dsOp: 8.8, memRev: 29.3, approx: true, ssdRev: 2.8, ufsRev: 4.6, storageOp: 1.9 },
    { year: '2015',  samsung: 13.0, samsungKrw: 14.7,  skhynix: 5.9,  skKrw: 6.65,  micron: 4.0,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 47.6, dsOp: 12.8, memRev: null, approx: true, ssdRev: 3.6, ufsRev: 5.3, storageOp: 1.8 },
    { year: '2016',  samsung: 11.3, samsungKrw: 13.15, skhynix: 5.4,  skKrw: 6.3,   micron: 5.8,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 51.2, dsOp: 13.6, memRev: null, ssdRev: 5.5, ufsRev: 6.8, storageOp: 3.9 },
    { year: '2017',  samsung: 26.1, samsungKrw: 29.5,  skhynix: 9.1,  skKrw: 10.3,  micron: 4.9,
      samsungDram: null, skDram: null, micronDram: null, industryDram: 16.3, kioxiaNand: null, industryNand: null,
      dsRev: 74.3, dsOp: 35.2, memRev: null, ssdRev: 9.5, ufsRev: 8.4, storageOp: 10.7 },
    { year: '2018',  samsung: 21.5, samsungKrw: 23.7,  skhynix: 15.5, skKrw: 17.0,  micron: 8.2,
      samsungDram: null, skDram: null, micronDram: null, industryDram: 22.9, kioxiaNand: null, industryNand: null,
      dsRev: 86.3, dsOp: 44.6, memRev: null, ssdRev: 9.7, ufsRev: 8.5, storageOp: 9.2 },
    { year: '2019',  samsung: 19.4, samsungKrw: 22.6,  skhynix: 10.9, skKrw: 12.7,  micron: 9.1,
      samsungDram: 8.0, skDram: 5.5, micronDram: 3.0, industryDram: 18.0, kioxiaNand: null, industryNand: null,
      dsRev: 64.9, dsOp: 14.0, memRev: null, ssdRev: 7.2, ufsRev: 6.4, storageOp: -0.9 },
    { year: '2020',  samsung: 27.9, samsungKrw: 32.9,  skhynix: 8.5,  skKrw: 10.07, micron: 8.0,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 72.9, dsOp: 18.8, memRev: null, ssdRev: 9.2, ufsRev: 7.2, storageOp: 3.3 },
    { year: '2021',  samsung: 38.1, samsungKrw: 43.6,  skhynix: 10.9, skKrw: 12.49, micron: 10.0,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 94.2, dsOp: 29.2, memRev: null, ssdRev: 12.0, ufsRev: 8.0, storageOp: 7.5 },
    { year: '2022',  samsung: 37.1, samsungKrw: 47.9,  skhynix: 14.7, skKrw: 19.01, micron: 12.1,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 98.5, dsOp: 23.8, memRev: null, ssdRev: 11.4, ufsRev: 7.8, storageOp: 1.3 },
    { year: '2023',  samsung: 37.1, samsungKrw: 48.4,  skhynix: 6.4,  skKrw: 8.33,  micron: 7.0,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 66.6, dsOp: -14.9, memRev: 44.1, ssdRev: 6.0, ufsRev: 4.6, storageOp: -9.1 },
    { year: '2024',  samsung: 33.9, samsungKrw: 46.3,  skhynix: 11.7, skKrw: 15.95, micron: 8.1,
      samsungDram: null, skDram: null, micronDram: null, industryDram: null, kioxiaNand: null, industryNand: null,
      dsRev: 111.1, dsOp: 15.1, memRev: 84.6, ssdRev: 14.7, ufsRev: 8.7, storageOp: 3.8 },
    { year: '2025',  samsung: 30.3, samsungKrw: 41.5,  skhynix: 20.1, skKrw: 27.52, micron: 13.8,
      samsungDram: 18.0, skDram: 17.5, micronDram: 11.0, industryDram: 53.7, kioxiaNand: 3.2, industryNand: 21.1,
      dsRev: 130.1, dsOp: 24.9, memRev: 104.1, ssdRev: 16.4, ufsRev: 8.2, storageOp: 8.2 },
    { year: '2026E', samsung: 42.9, samsungKrw: 60.0,  skhynix: 32.1, skKrw: 45.0,  micron: 20.0,
      samsungDram: 20.0, skDram: 20.5, micronDram: 13.5, industryDram: 61.3, kioxiaNand: 4.5, industryNand: 22.2,
      dsRev: null, dsOp: null, memRev: null },
  ],

  // 다운턴 대응 비교 — CAPEX YoY (%)
  downturnResponse: {
    title: '다운턴 대응 비교 — CAPEX 증감률 (YoY %)',
    source: 'wiki/concepts/memory-capex-history.md',
    data: [
      { company: '삼성 (2023)',       yoy: 1.0,   note: '₩47.9→48.4조 — 적자에도 사상 최대 유지' },
      { company: 'SK하이닉스 (2023)', yoy: -56.2, note: '₩19.0→8.3조 — 반토막' },
      { company: 'Micron (FY2023)',   yoy: -42.0, note: '$12.1→7.0B' },
      { company: '삼성 (2019)',       yoy: -4.6,  note: '₩23.7→22.6조 — 규모 유지' },
      { company: 'SK하이닉스 (2019)', yoy: -25.3, note: '₩17.0→12.7조' },
      { company: '삼성 (2009)',       yoy: 8.3,   note: '~6.0→6.5조ᵉ — 금융위기에 오히려 증액 (근사)' },
      { company: '하이닉스 (2009)',   yoy: -63.0, note: '~2.7→1.0조ᵉ — 채권단 관리, 투자 동결 (근사)' },
      { company: 'Micron (FY2009)',   yoy: -80.7, note: '$2.53→0.49B — 사실상 투자 중단 (10-K)' },
    ],
  },

  // 핵심 인사이트 카드
  insights: [
    {
      title: '2007~2012 치킨게임 — 역사이클의 원형',
      detail: '2009 최저점: 삼성 ~6.5조ᵉ vs 하이닉스 ~1.0조ᵉ vs Micron $0.49B(-81%). Qimonda(2009)·Elpida(2012) 파산 → 5강→3강 과점. 삼성은 위기 직후 2010 투자 12.7조 배증 → 영업이익 10.11조 당시 사상 최대.',
      tone: 'blue',
    },
    {
      title: '2019 다운턴 — 이익 -69%에도 투자 규모 유지',
      detail: 'DS 영업이익 44.6→14.0조 급감. 그러나 CAPEX는 -5%만 축소 (22.6조). DRAM CAPEX $8.0B는 SK($5.5B)+Micron($3.0B) 합계 수준.',
      tone: 'green',
    },
    {
      title: '2023 최악 다운턴 — 14.9조 적자에도 사상 최대 CAPEX',
      detail: '삼성 48.4조 (+1%) vs SK -56% vs Micron -42%. 직후 2024~2025 회복기에 DS 영업이익 15.1→24.9조, 메모리 매출 104.1조 사상 최대 수확.',
      tone: 'amber',
    },
    {
      title: '단, 격차 수렴 — 역사이클 우위의 구조적 축소',
      detail: 'DRAM CAPEX 3사 격차: 2019년 8.0/5.5/3.0 → 2026E 20/20.5/13.5($B)로 수렴. 치킨게임 성립 조건(경쟁자 재무 취약)도 소멸 — 국가 자본(CXMT)·사상 최대 현금(SK). 총량 우위보다 배분(HBM)이 승부처.',
      tone: 'red',
    },
  ],

  footnotes: [
    '삼성 CAPEX는 반도체 부문(파운드리·시스템LSI 포함), SK하이닉스·Micron은 전사 기준. Micron은 회계연도(8월 말 종료, 역년 대비 ~4개월 선행) — 2006~2015는 10-K 현금흐름표 총액, 2016~은 실적 발표 순액.',
    '원화 공시치(삼성·SK)는 연평균 환율로 $B 환산 — 툴팁에 조원 원본 병기. 2025 삼성·2026E 전체는 추정/계획치.',
    '2006~2015 삼성·SK CAPEX 일부는 보도 종합 근사치(ᵉ, ±0.5조 범위) — 툴팁에 "일부 근사" 표기, 확정치·신뢰도 등급은 wiki/concepts/memory-capex-history.md 참조. 사이클 패턴(방향·규모 격차) 해석에는 영향 없음.',
    '삼성 회계기준: 2008년까지 K-GAAP, 2009년~ K-IFRS 연결 (시계열 단절 존재). 하이닉스는 2012년 SK 인수 전 채권단 공동관리(2001~2012) — 금융위기 국면 투자 여력 부재.',
    '스토리지(SSD·UFS) 매출·영업이익(2013~2025)은 전량 역산 추정ᵉ — NAND 산업 규모 × 삼성 점유율 × 제품 믹스 3단 추정 (방법론: sources/raw-notes/samsung-storage-solution-research-2026-08-17.md). 이익은 SSD/UFS 분리 불가로 NAND(스토리지) 사업 합산. 반도체 부문 매출·영업이익의 내부 구성을 추정 분해한 것이라 중복 포함 관계.',
    'DRAM/NAND 회사별 분리 CAPEX는 2019·2025·2026E만 공개 추정 존재 (TrendForce). 삼성·SK NAND CAPEX는 미공개 — 2025~2026 축소 기조(HBM/DRAM 재배치).',
  ],

  // ── 솔루션(SSD·UFS) 사업 연표 — 차트 하단 별도 섹션 ─────────────────────────
  // 출처: wiki/concepts/samsung-storage-solution-history.md
  solutionTimeline: {
    title: '솔루션(SSD·UFS) 사업 연표 — 메모리 사이클과 함께 변모한 20년',
    source: 'wiki/concepts/samsung-storage-solution-history.md',
    phases: [
      { period: '2005~2012', name: '태동',
        desc: 'Apple NAND 계약(2005)이 만든 대량 수요 위에서 세계 최초 SSD(2006). 치킨게임 다운턴 중 HDD 매각(2011)으로 "스토리지=SSD" 방향 확정' },
      { period: '2013~2016', name: '수직계열화',
        desc: 'V-NAND 세계 최초 양산 + 컨트롤러·펌웨어 내재화(NVELO) — 칩 판매에서 시스템 판매로 격상. UFS로 모바일 세대 교체 주도' },
      { period: '2017~2022', name: '솔루션 주도',
        desc: '서버 SSD·UFS가 NAND 수요 과반 — 믹스 개선이 사이클 완충재. 2019 다운턴을 소폭 적자ᵉ로 통과' },
      { period: '2023~', name: 'AI 스토리지 전환',
        desc: '최악 다운턴(적자 ~9조ᵉ)·사상 첫 감산 → AI eSSD/QLC 재편, NVIDIA CMX 진입. 단 SCADA/SLC AI SSD 후행 ⚠️' },
    ],
    items: [
      { date: '2005',    event: 'Apple iPod nano NAND 대량 공급 계약 — 플래시 B2C 대량 수요 시대 개막', tag: '계기',        cycle: 'neutral' },
      { date: '2006-03', event: '세계 최초 SSD 양산 (32GB 1.8" PATA) — 솔루션 사업 원점', tag: '태동',        cycle: 'neutral' },
      { date: '2011-04', event: 'HDD 사업 Seagate 매각 ($1.375B) — 스토리지 포트폴리오를 SSD로 일원화', tag: '선택과 집중', cycle: 'down' },
      { date: '2012-12', event: 'NVELO 인수(SSD 캐싱 SW) + 840 시리즈 — 소비자 소매 SSD 진출·SW 내재화', tag: '성장',      cycle: 'down' },
      { date: '2013-08', event: '세계 최초 3D V-NAND 양산 — 밀도·내구성 우위로 SSD 수직계열화 완성', tag: '전환점',       cycle: 'up' },
      { date: '2015-01', event: '세계 최초 UFS 2.0 양산 → Galaxy S6 탑재 — eMMC 대체 개시', tag: '전환점',              cycle: 'up' },
      { date: '2017',    event: '평택 1라인 가동 + NVMe 서버 SSD 본격화 — SSD 매출ᵉ이 모바일 스토리지 역전', tag: '슈퍼사이클', cycle: 'up' },
      { date: '2018',    event: 'QLC V-NAND 양산 — SSD 원가 곡선 재하향', tag: '정점',                                  cycle: 'up' },
      { date: '2019',    event: '다운턴 — 솔루션 믹스가 완충재, 스토리지 소폭 적자ᵉ에 그침', tag: '다운턴',              cycle: 'down' },
      { date: '2021',    event: 'PM9A3 (PCIe Gen4 서버 SSD) — NAND 매출 사상 최대권', tag: '호황',                      cycle: 'up' },
      { date: '2023-04', event: 'NAND 최악 다운턴 — 사상 첫 감산 공식화, 스토리지 적자 ~9조ᵉ', tag: '최악 다운턴',        cycle: 'down' },
      { date: '2024~25', event: 'AI 서버 eSSD 슈퍼사이클 — QLC 대용량 중심 회복, 엔터프라이즈 SSD 점유 ~34%', tag: '회복', cycle: 'up' },
      { date: '2026',    event: 'NVIDIA CMX 공식 공급(PM1753)·PM1763 Gen6 시연 — SCADA/SLC AI SSD 후행 ⚠️', tag: 'AI 전환', cycle: 'up' },
    ],
  },
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
  teal:    '#14b8a6',
  lime:    '#84cc16',
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
