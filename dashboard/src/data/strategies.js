// 전략 데이터셋 — report/{invariant-strategies, core-strategies, scenario-planning-report}.md 정리
// 모든 수치·텍스트는 report/ 의 표·내용에서 직접 추출.

// ─────────────────────────────────────────────────────────────────────────────
// OVERVIEW — Executive Summary 핵심 수치
// 출처: report/scenario-planning-report.md "핵심 수치 한눈에" + Executive Summary
// ─────────────────────────────────────────────────────────────────────────────

export const STRATEGY_OVERVIEW = {
  // 호황의 정점 + 다운턴 준비 핵심 수치
  keyNumbers: [
    { label: 'Samsung Q1 2026 메모리 매출', value: '$50.4B', subtitle: '+292% YoY — 호황의 정점',          accent: 'green' },
    { label: '빅테크 4사 AI CapEx 2026',     value: '$725B',  subtitle: '+77% YoY — Microsoft만 메모리 영향 $25B 인정', accent: 'green' },
    { label: 'HBM4 NVIDIA Rubin 점유율',     value: '28%',    subtitle: 'SK 70% / Micron 18% 대비 후순위 (UBS)',     accent: 'red' },
    { label: 'HBM 수요 성장 (2026/2027)',     value: '+77/+68%', subtitle: '공급 부족 2027년까지 지속',              accent: 'green' },
    { label: '텍사스 CHIPS 보조금',          value: '$4.745B', subtitle: '목표 $6~8B의 60~80% — 2단계 협상 필수',     accent: 'amber' },
    { label: 'CXMT HBM3 양산',                value: '2026~',  subtitle: '월 60K 웨이퍼 — 2028 HBM4 위협',           accent: 'red' },
    { label: '1c nm 수율 (현재)',             value: '50~70%', subtitle: '2027년 80%+ 목표 (RS-6 핵심)',             accent: 'amber' },
    { label: 'Samsung HBM4 캐파',             value: 'Sold Out', subtitle: '+50% YoY 증설 — 2027 NVIDIA 안정 공급',  accent: 'green' },
  ],

  // Robust 전략 4축 — 보고서 Executive Summary 의 묶음 구조
  roBustAxes: [
    { axis: '공급 거버넌스', members: ['RS-1', 'RS-5'], description: '호황기 절제 + 다운턴 사수 동일 거버넌스 (Nucor·ExxonMobil 모델)', color: '#3b82f6' },
    { axis: '포트폴리오',   members: ['RS-2', 'RS-6'], description: '바벨 (HBM↔범용) + 공정 리더십 (1c nm + NAND 주기 연장)',     color: '#10b981' },
    { axis: '고객 관계',     members: ['RS-3', 'RS-4'], description: '락인(CMX·SCADA·FDP) + 분산(LTA·Take-or-Pay) 협상력 양면',  color: '#f59e0b' },
    { axis: '신규 도구',     members: ['RS-7', 'RS-8'], description: 'AI 자동화(잉여 자원 전환) + 구조화 헷지 (변동성 ±25→±12%)', color: '#8b5cf6' },
  ],

  // Main Bet 강조
  mainBet: {
    scenario: 'B · AI 르네상스',
    probability: '30~35%',
    rationale: '5개 시나리오 중 시나리오 B만이 2035 시장 $5,200억 규모로 가장 크고, 동서 균형 포지션이 최대 가치를 발휘하는 유일한 미래.',
    requirements: [
      'HBM4E·HBM5 기술 1위 탈환',
      '동서 균형 공급망 (텍사스 + 인도)',
      '1c nm 원가 우위',
      '커스텀 AI 메모리 솔루션',
      '텍사스 2기 미국 현지 생산',
    ],
  },

  // Executive Summary 한 문장 요약
  oneLineSummary: '호황의 정점에서 다운턴을 준비하는 유일한 방법은 어느 미래가 와도 작동하는 8개 Robust 전략과 2026년 Q4 안에 묶음으로 처리해야 하는 12개 결정이다.',
}

// ─────────────────────────────────────────────────────────────────────────────
// ROBUST STRATEGY — 8개 RS
// 출처: report/invariant-strategies/rs{1..8}-*.md + README.md 시나리오 가치 매트릭스
// ─────────────────────────────────────────────────────────────────────────────

export const ROBUST_STRATEGIES = [
  {
    id: 'RS-1', title: '옵션형 캐파 체계', axis: '공급 거버넌스', color: '#3b82f6',
    summary: '"지을 능력" 이 아니라 "제때 켜고 끌 능력" — Fab Shell 선행 + 장비 단계 반입',
    mechanism: 'Fab Shell 선행 건설 + 장비 반입 단계화 + 롤링 캐파 리뷰',
    benchmark: 'Nucor (EAF 변동비) + Marriott (Asset-Light)',
    scenarios: { A: '정책 충격 흡수', B: '빠른 증설', C: '손실 회피', D: '집행 지연', E: '기술 피벗' },
  },
  {
    id: 'RS-2', title: '바벨 포트폴리오', axis: '포트폴리오', color: '#10b981',
    summary: '호황기 HBM이, 불황기 범용 DRAM·QLC SSD가 이익을 떠받친다. 가운데는 모두 진다',
    mechanism: '고마진(HBM) + 저원가(범용 DRAM/QLC) 양 끝, 가운데 제품 30% 축소',
    benchmark: 'Maersk (해운+물류 인접 통합)',
    scenarios: { A: '양 끝 모두 가치', B: 'HBM 극대화', C: '범용 현금흐름', D: 'CXMT 방어', E: '한쪽 갈아끼움' },
  },
  {
    id: 'RS-3', title: '고객특화·전환비용 극대화', axis: '고객 관계', color: '#f59e0b',
    summary: '"삼성과 경쟁사의 차이가 없다"고 느낄 때 고객은 떠난다 — NVIDIA CMX/SCADA/FDP 깊이 통합',
    mechanism: 'NVIDIA CMX·SCADA·FDP, Co-Validation, 베이스다이 커스텀 + Marriott식 SW 매출',
    benchmark: 'Marriott (브랜드·플랫폼 fee) + Tesla FSD (HW + SW 구독)',
    scenarios: { A: '점유율 방어', B: '하이퍼스케일러 락인', C: '락인 고객 이탈 방지', D: '가격 인하 흡수', E: 'SW 가치 부각' },
  },
  {
    id: 'RS-4', title: '고객 포트폴리오 의도적 분산', axis: '고객 관계', color: '#f59e0b',
    summary: '단일 고객 의존은 호황기 매출, 다운턴·관계 악화 시 협상력을 잃게 한다',
    mechanism: 'LTA + Take-or-Pay + 단일 고객 ≤25% 한도',
    benchmark: 'Southwest (단일 의존 회피)',
    scenarios: { A: '서방 편중 분산', B: '신흥시장 발굴', C: '위기 분산', D: '안정 수요', E: '다양한 기술 수요처' },
  },
  {
    id: 'RS-5', title: '재무 규율 + 초과이익 재투자', axis: '공급 거버넌스', color: '#3b82f6',
    summary: '호황기 절제(재고/FCF 기준) + 다운사이클 capex 4조원/년 하한 — 동일 거버넌스',
    mechanism: '재고일수 상한, FCF 기준, 다운사이클 capex 하한, M&A 펀드 사전 적립',
    benchmark: 'Nucor (요새형 재무) + ExxonMobil (역사이클 + Pioneer M&A)',
    scenarios: { A: '투자 절제', B: '초과이익 재투자', C: '다운턴 흑자', D: '회복 자금', E: '피벗 자금' },
  },
  {
    id: 'RS-6', title: '공정 리더십 통합', axis: '포트폴리오', color: '#10b981',
    summary: '1c nm DRAM 우위 + NAND 주기 연장 4트랙 + Hybrid bonding 자체 IP — YMTC 종속 회피',
    mechanism: '1c nm DRAM yield 80%+ + NAND multi-deck/QLC/PLC + hybrid bonding self-IP',
    benchmark: 'TSMC (Nx · Nx+ · Nx++ 패턴)',
    scenarios: { A: '마진 우위', B: 'Capex 회수', C: 'IP 자립 생존', D: '원가 우위', E: '자원 차세대 재배분' },
  },
  {
    id: 'RS-7', title: 'AI 엔지니어링 자동화', axis: '신규 도구', color: '#8b5cf6',
    summary: 'AI EDA·firmware·수율예측 도구로 잉여 인력 → RS-2/3/6 에 전환 배치 (모든 RS의 prerequisite)',
    mechanism: 'AI 코딩·EDA·firmware·수율예측 전사 도입 + 분기별 전환 배치 보고',
    benchmark: 'GitHub Copilot 생산성 + TSMC fab AI',
    scenarios: { A: '인력 보안 강화', B: 'R&D 속도', C: '인건비 절감', D: '잉여 자원 활용', E: '신기술 R&D 가속' },
  },
  {
    id: 'RS-8', title: '구조화 매출 헷지 (NEW)', axis: '신규 도구', color: '#8b5cf6',
    summary: '농수산 100년 + 외환 50년 헷지 노하우 압축 이식 — 변동성 ±25%→±12% (메모리 첫 도입)',
    mechanism: '4트랙: ① Participating Forward · ② Wafer Slot HTA · ③ Tiered Pricing · ④ Memory Trading Desk',
    benchmark: 'Cargill DDC + Black River + Participating Forward',
    scenarios: { A: '서방 매출 안정화', B: '상방 50% 회수', C: '다운턴 흑자', D: '평탄화', E: '신시장 차등 가격' },
    isNew: true,
  },
]

// 8 RS × 5 시나리오 = 40 셀 가치 매트릭스 (heatmap 용)
export const RS_SCENARIO_MATRIX = ROBUST_STRATEGIES.map(rs => ({
  id: rs.id,
  title: rs.title,
  cells: ['A', 'B', 'C', 'D', 'E'].map(s => ({ scenario: s, value: rs.scenarios[s] })),
}))

// ─────────────────────────────────────────────────────────────────────────────
// CORE STRATEGY — 11개 (메인벳 6 + 사이드벳 5)
// 출처: report/core-strategies/current-state-*.md + README.md
// ─────────────────────────────────────────────────────────────────────────────

export const CORE_STRATEGIES = {
  mainBets: [
    {
      id: 'MB-4', title: '커스텀 AI 메모리 솔루션', score: 15,
      coreOneLine: '메모리를 부품이 아니라 솔루션으로 — Google/Amazon/MS ASIC 통합 (HBM + CXL + PIM + CMX)',
      currentState: 'HBM 회복 단계, 베이스다이 커스텀은 미가시',
      strengths: ['광범위 제품 포트폴리오 (HBM·CXL·PIM·SSD)', '파운드리 보유 — 베이스다이 커스텀 가능'],
      gaps: ['NVIDIA Rubin 28% (vs SK 70%)', 'HBM3E 12Hi 품질 회복 중'],
      target2030: '단일 고객 매출 비중 30%+',
    },
    {
      id: 'RS-3', title: '고객특화·전환비용 (NVIDIA 통합)', score: 15,
      coreOneLine: 'NVIDIA 생태계 3대 데이터 경로(CMX·SCADA·FDP) 깊이 통합',
      currentState: 'CMX 진입 ✅ / SCADA 공개 로드맵 부재 ⚠️',
      strengths: ['CMX 양산 진입', 'FDP/SCADA 통합 영업 가능'],
      gaps: ['SCADA AI SSD 로드맵 미공개 — 2026 Tech Day 결정점'],
      target2030: '통합 매출 잠재력 $8~9B/년',
    },
    {
      id: 'RS-6', title: '공정 리더십 통합', score: 14,
      coreOneLine: '1c nm DRAM 우위 + NAND 공정 주기 연장 + Hybrid bonding 자체 IP',
      currentState: '1c yield 60% 추격, hybrid bonding IP 공백 ⚠️',
      strengths: ['1c nm 추격 가시화', 'NAND 4트랙 R&D 결의'],
      gaps: ['자체 hybrid bonding IP 진척 미공개 → YMTC 의존 리스크'],
      target2030: '1c nm yield 80%+, hybrid bonding 자체 IP 확보',
    },
    {
      id: 'MB-2', title: '동서 균형 공급망', score: 12,
      coreOneLine: '한국+미국+일본+인도 4거점 + 시안 라이선스 — "유일한 글로벌 플레이어"',
      currentState: '5거점 구축 중, 시안 라이선스 매년 리스크',
      strengths: ['5거점 글로벌 공급망 (SK·Micron 누구도 못 가진 구조)'],
      gaps: ['시안 라이선스 갱신 리스크 (매년)', '인도 ISMP 2.0 조건 미확정'],
      target2030: '비중국 신흥 시장 매출 3배+ (vs 2025)',
    },
    {
      id: 'SD-1', title: 'HBM 조직 독립 P&L', score: 12,
      coreOneLine: 'HBM 사업부를 메모리사업부 내 독립 P&L 센터로 분리, 패키징 전담 신설',
      currentState: '메모리사업부 내 통합, 분리 P&L 미공개 ⚠️',
      strengths: ['Samsung Foundry 통합 영업 가능'],
      gaps: ['외부 비공개', 'TSMC·IMEC·ASE 출신 채용 필요 (100인+)'],
      target2030: '독립 P&L 센터 + 패키징 전담 100인+',
    },
    {
      id: 'RS-5', title: '재무 규율 + 재투자', score: 10,
      coreOneLine: '호황기 절제 + 다운사이클 capex 하한 4조 원/년 (Nucor·ExxonMobil 모델)',
      currentState: '현금 $63B 강점, 이사회 정책 명문화 부재 ⚠️',
      strengths: ['현금 $63B — 다운사이클 capex 하한 자원'],
      gaps: ['다운사이클 capex 하한 정책 명문화 부재 — 이사회 결의 필요'],
      target2030: '다운사이클 capex 4조 원/년 (HBM R&D + 패키징 + 3D DRAM)',
    },
  ],
  sideBets: [
    {
      id: 'SA-2', title: '일본 R&D 허브 (EUV 우회 NIL)', score: 14,
      coreOneLine: '요코하마 R&D 허브 + JSR/신에쓰/Canon 파트너십 + Canon NIL (~1조 원)',
      currentState: 'NIL 양산 채택 사례 부재, R&D 단계 베팅',
      hedge: '시나리오 A·C (디커플링) 헤지',
      target: 'ASML EUV 의존 탈피',
    },
    {
      id: 'SD-2', title: '산업용 AI 메모리 (자동차·의료)', score: 14,
      coreOneLine: '의료 AI·자율주행·제조 로봇 특화 저전력·고신뢰성 HBM4E/5 (AEC-Q100)',
      currentState: 'Tesla 다년 계약 ✅, AEC-Q100 양산 미공개 ⚠️',
      hedge: '시나리오 D 다운사이클·E 패러다임 헤지',
      target: '사이클 안정 + 고마진 신시장 (~2,000억 원 R&D)',
    },
    {
      id: 'SE-1', title: '3D DRAM + IMEC + M&A', score: 13,
      coreOneLine: '3D DRAM 전담 R&D 300인+ + IMEC 공동 + M&A 펀드 5,000억',
      currentState: 'SK 30년 로드맵 발표, Samsung 전담 조직 미공개 ⚠️',
      hedge: '시나리오 E 패러다임 헤지',
      target: '3D DRAM 상용화 2033~2034 선점',
    },
    {
      id: 'SE-2', title: 'CXL SIG 표준 주도', score: 12,
      coreOneLine: 'CXL 4.0+ 표준 워킹그룹 인력 2배 (10→25명)',
      currentState: 'Pangea v3 2026 발표 예정 ✅, 인력 부족 ⚠️',
      hedge: '시나리오 E 패러다임 헤지',
      target: 'CXL 메모리 패브릭 시장 선도',
    },
    {
      id: 'SE-3', title: 'AI 인프라 수직 진출 (Vertical Ascent)', score: null,
      coreOneLine: '메모리 → AI 가치사슬 상류 이동 — Tier 1 (지분) / Tier 2 (Stargate Korea) / Tier 3 (자체 캠퍼스)',
      currentState: 'Stargate Korea LOI ✅, 그룹 통합 P&L 부재 ⚠️',
      hedge: '시나리오 A·B·D 강화, E 보험',
      target: '5년 누적 $20~35B (Tier 1 + 2 합산)',
    },
  ],

  // 7개 정보 공백 (외부 가시성 회복 우선순위)
  infoGaps: [
    { id: 'SD-1', area: 'HBM 사업부 P&L 분리', timing: '2026 H1', action: '분리 + 이사회 정책 명문화 → IR 발표' },
    { id: 'RS-6', area: '자체 hybrid bonding IP 진척', timing: '2026 H2', action: '특허 출원 가속 → YMTC 의존 회피 신호' },
    { id: 'RS-3', area: 'SCADA AI SSD 로드맵', timing: '2026 Tech Day', action: 'SK·Kioxia 추격 가능성 결정' },
    { id: 'SE-1', area: '3D DRAM 전담 R&D 조직', timing: '2026 H2', action: 'SK 30년 로드맵 대비 후행 신호 차단' },
    { id: 'SD-2', area: 'AEC-Q100 자동차 메모리 양산', timing: '2026~2027', action: '인증 단계 공개' },
    { id: 'SA-2', area: 'Canon NIL 협력', timing: '2026 H2', action: 'Texas Institute 첫 납품 사례 공유' },
    { id: 'RS-5', area: '다운사이클 capex 하한 정책 명문화', timing: '2026 Q3', action: '이사회 결의 + IR 발표' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// DECISIONS — 12개 즉시 결정 (D-150 / D-240 / D-330)
// 출처: report/scenario-planning-report.md "즉시 결정 필요"
// ─────────────────────────────────────────────────────────────────────────────

export const DECISIONS = [
  // D-150 (가장 임박)
  {
    id: 'D1', title: 'HBM4 NVIDIA 점유율 회복', cluster: 'D-150', deadline: '2026-09-30',
    summary: 'HBM4 로직 다이 수율 90%+ 달성, NVIDIA Rubin 점유율 28% → 40% 상향',
    contingency: '2026년 7월까지 수율 85% 미달 시 TSMC 4nm 로직 다이 외주화 착수',
    relatedRS: ['MB-4', 'RS-3'], priority: 'critical',
  },
  {
    id: 'D2', title: '소재 공급망 비중국 다각화', cluster: 'D-150', deadline: '2026-Q3',
    summary: '희토류·게르마늄·갈륨 비중국 공급선 장기 계약, 6개월 재고 비축',
    contingency: '—',
    relatedRS: ['MB-2'], priority: 'high',
  },
  {
    id: 'D6', title: 'Robust RS-1·4·5 이사회 정책화', cluster: 'D-150', deadline: '2026-Q3',
    summary: '옵션형 캐파·LTA 원칙·재무 규율 + 다운사이클 capex 하한 4조 원/년 이사회 공식 결의',
    contingency: '—',
    relatedRS: ['RS-1', 'RS-4', 'RS-5'], priority: 'high',
  },

  // D-240 (중기)
  {
    id: 'D3', title: '3D DRAM R&D 조직 신설·IMEC 협약', cluster: 'D-240', deadline: '2026-Q4',
    summary: '전담 조직 200~300인 신설, IMEC 3년 공동 연구 협약 ($200M)',
    contingency: '—',
    relatedRS: ['SE-1'], priority: 'high',
  },
  {
    id: 'D4', title: '텍사스 테일러 1단계 가동 + 2단계 발표', cluster: 'D-240', deadline: '2026-Q4',
    summary: '1단계(2nm Foundry) Risk Production 가동 + HBM 전용 2단계 투자 계획 공식 발표',
    contingency: '2단계 발표 지연 시 마이크론·인텔에 미국 HBM 표준 거점 빼앗김',
    relatedRS: ['MB-2'], priority: 'critical',
  },
  {
    id: 'D5', title: 'AI 개발 효율화 도구 전사 도입', cluster: 'D-240', deadline: '2026-Q4',
    summary: 'AI 코딩·EDA·공정 시뮬레이션·수율 예측 도구 메모리사업부 전 조직 파일럿',
    contingency: '—',
    relatedRS: ['RS-7'], priority: 'medium',
  },
  {
    id: 'D8', title: '텍사스 2단계 CHIPS Act 추가 보조금', cluster: 'D-240', deadline: '2026-Q4',
    summary: '$4.745B 확정에 추가하여 2단계 HBM 전용 보조금 별도 협상 + Tesla 외 미국계 LTA 사전 체결',
    contingency: '추가 보조금 미확보 시 합작투자(JV) 모델 검토 (샌디스크+키옥시아 모델)',
    relatedRS: ['MB-2'], priority: 'high',
  },
  {
    id: 'D9', title: '다운사이클 M&A 펀드 사전 적립', cluster: 'D-240', deadline: '2026-Q4',
    summary: '차세대 메모리 M&A 펀드 5,000억 원 적립 + 5개월 내 종결 가능한 PMI 팀 사전 구성 (Disney-Marvel 모델)',
    contingency: '—',
    relatedRS: ['RS-5'], priority: 'medium',
  },
  {
    id: 'D10', title: 'NAND 공정 전환 주기 연장 R&D 4트랙', cluster: 'D-240', deadline: '2026-Q4',
    summary: '4트랙 병행: ① Hybrid Bonding 자체 IP (1.5조/3년) · ② Multi-deck 정교화 · ③ QLC/PLC · ④ FDP/SCADA firmware',
    contingency: '트랙 1 IP 지연 시 한국 IP 컨소시엄 또는 정부 R&D 분리. YMTC 라이선스 의존도 ≤50%',
    relatedRS: ['RS-6'], priority: 'high',
  },
  {
    id: 'D11', title: 'Stargate Korea 본 계약 + Neocloud Equity-for-Supply', cluster: 'D-240', deadline: '2026-H1~H2',
    summary: '3-Tier 동시 착수: Tier 1 (지분 1~3% + HBM swap) · Tier 2 (Stargate Korea DA, $15~25B) · Tier 3 (자체 캠퍼스 옵션)',
    contingency: 'Stargate 결렬 시 Tier 1 유지 + 한국 정부 Sovereign AI 인프라 재포지셔닝',
    relatedRS: ['SE-3'], priority: 'high',
  },
  {
    id: 'D12', title: 'RS-8 구조화 매출 헷지 시범 (NEW)', cluster: 'D-240', deadline: '2026-Q4',
    summary: '4트랙: ① Participating Forward (NVIDIA HBM4E 10~20%) · ② Wafer Slot HTA · ③ Tiered Pricing · ④ Memory Trading Desk 신설 (20~30인)',
    contingency: '트랙 1 결렬 시 트랙 2·4 우선 추진 — 정보 자산화만으로도 RS-1/5 정확도 향상',
    relatedRS: ['RS-8'], priority: 'high',
    isNew: true,
  },

  // D-330 (가장 후순위)
  {
    id: 'D7', title: 'AI 잉여 인력 RS-2·3 전환 배치', cluster: 'D-330', deadline: '2027-Q1',
    summary: 'AI 도구 도입 후 분기별 "전환 배치 엔지니어 수" 사업부장 보고 의무화',
    contingency: '—',
    relatedRS: ['RS-7', 'RS-2', 'RS-3'], priority: 'medium',
  },
]

// 클러스터별 그룹핑
export const DECISION_CLUSTERS = [
  { cluster: 'D-150', label: 'D-150 (가장 임박)', subtitle: '~2026년 9월 30일',
    color: '#ef4444', bgClass: 'bg-red-950/30 border-red-700/40' },
  { cluster: 'D-240', label: 'D-240 (중기)',     subtitle: '~2026년 Q4',
    color: '#f59e0b', bgClass: 'bg-amber-950/30 border-amber-700/40' },
  { cluster: 'D-330', label: 'D-330 (후순위)',    subtitle: '~2027년 Q1',
    color: '#3b82f6', bgClass: 'bg-blue-950/30 border-blue-700/40' },
]
