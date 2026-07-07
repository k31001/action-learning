// 시나리오 플래닝 데이터셋 — wiki/{steep, driving-forces, scenarios, benchmark} 정리.
// 모든 수치는 wiki/ 의 표·텍스트에서 직접 추출.

// ─────────────────────────────────────────────────────────────────────────────
// STEEP — 5 카테고리, 카테고리당 ~10개 요인
// 출처: wiki/steep/{social, technology, environment, economy, political}.md
// ─────────────────────────────────────────────────────────────────────────────

export const STEEP_DATA = {
  categories: [
    {
      id: 'S', label: 'Social', name: '사회', color: '#ec4899',
      summary: 'AI 인재 경쟁, 인구구조, ESG, 안보화. 단기 전략보다 중장기 인재·시장 구조 변수.',
      factors: [
        { id: 'S1', name: 'AI 리터러시 격차와 인재 확보 경쟁',         impact: 3, uncertainty: 3 },
        { id: 'S2', name: '한국 이공계 인력 고령화·기피',             impact: 3, uncertainty: 2 },
        { id: 'S3', name: '온디바이스 AI 확산과 엣지 메모리 수요',     impact: 4, uncertainty: 3 },
        { id: 'S4', name: '데이터센터 전력 ESG 압력',                 impact: 3, uncertainty: 3 },
        { id: 'S5', name: 'AI 규제 강화에 따른 인프라 수요 억제',      impact: 3, uncertainty: 4 },
        { id: 'S6', name: '반도체의 국가 안보 자산화',                impact: 4, uncertainty: 2 },
        { id: 'S7', name: '중국 내 국산 반도체 선호 트렌드',          impact: 4, uncertainty: 3 },
        { id: 'S8', name: 'AI 투자 ROI 미실현과 사회적 회의론',       impact: 4, uncertainty: 4 },
        { id: 'S9', name: '반도체 공급망 재편 지역 갈등',             impact: 2, uncertainty: 3 },
        { id: 'S10', name: '선진국 스마트폰·PC 수요 구조적 둔화',     impact: 3, uncertainty: 2 },
      ],
    },
    {
      id: 'T', label: 'Technology', name: '기술', color: '#3b82f6',
      summary: 'HBM 세대 전환, 3D DRAM, PIM, CXL, 커스텀 ASIC — 현재 전략의 가장 직접적 변수군.',
      factors: [
        { id: 'T1',  name: 'HBM 세대 전환 속도 (HBM4→HBM5)',           impact: 5, uncertainty: 4 },
        { id: 'T2',  name: 'DRAM 미세공정 한계와 High-NA EUV 도입',    impact: 4, uncertainty: 3 },
        { id: 'T3',  name: '3D DRAM 상용화 시점',                       impact: 5, uncertainty: 5 },
        { id: 'T4',  name: 'PIM 기술의 AI 메모리 영향력',              impact: 4, uncertainty: 4 },
        { id: 'T5',  name: 'CXL 메모리 패브릭 확산 속도',              impact: 4, uncertainty: 4 },
        { id: 'T6',  name: '커스텀 AI 칩(ASIC) 확산과 NVIDIA 의존도', impact: 5, uncertainty: 4 },
        { id: 'T7',  name: 'NAND 고단화 경쟁 (300단 이상)',            impact: 3, uncertainty: 2 },
        { id: 'T7b', name: 'NAND 공정 전환 주기 연장 R&D 가치',         impact: 4, uncertainty: 3 },
        { id: 'T8',  name: 'DDR6 세대 전환 속도',                       impact: 3, uncertainty: 2 },
        { id: 'T9',  name: 'AI 워크로드별 메모리 아키텍처 다변화',     impact: 4, uncertainty: 4 },
        { id: 'T10', name: '어드밴스드 패키징 (Hybrid Bonding) 경쟁력', impact: 4, uncertainty: 3 },
        { id: 'T11', name: 'NVIDIA Storage-Next 표준 (CMX/SCADA + SLC AI SSD)', impact: 4, uncertainty: 4 },
        { id: 'T12', name: 'PCIe Gen6/Gen7 + 1억 IOPS 단일 SSD 가능성',         impact: 3, uncertainty: 3 },
        { id: 'T13', name: 'UFS 4.1 → UFS 5.0 모바일 메모리 세대 전환',         impact: 3, uncertainty: 2 },
      ],
    },
    {
      id: 'E', label: 'Environment', name: '환경', color: '#10b981',
      summary: '데이터센터 전력, SMR, 희토류, 용수, 탄소 규제 — 장기 비용 구조 결정.',
      factors: [
        { id: 'E1',  name: 'AI DC 전력 소비 폭증과 전력망 병목',       impact: 4, uncertainty: 3 },
        { id: 'E2',  name: '탄소 중립 의무화와 공정 에너지 규제',     impact: 3, uncertainty: 2 },
        { id: 'E3',  name: 'SMR 상용화 타이밍과 DC 전력 구조',         impact: 3, uncertainty: 4 },
        { id: 'E4',  name: '반도체 팹 용수 수급 리스크',               impact: 3, uncertainty: 3 },
        { id: 'E5',  name: '희토류·전략광물 수출 통제',                impact: 4, uncertainty: 4 },
        { id: 'E6',  name: '전력 가격 급등과 생산 원가',               impact: 3, uncertainty: 3 },
        { id: 'E7',  name: '기후 변화 자연재해 리스크',                impact: 3, uncertainty: 3 },
        { id: 'E8',  name: '반도체 부산물 환경 규제',                  impact: 2, uncertainty: 2 },
        { id: 'E9',  name: '탄소 국경세(CBAM) 확대',                   impact: 2, uncertainty: 3 },
        { id: 'E10', name: 'F-gas(불소계 가스) 규제',                   impact: 2, uncertainty: 3 },
      ],
    },
    {
      id: 'Ec', label: 'Economy', name: '경제', color: '#f59e0b',
      summary: 'AI CapEx 지속성, 메모리 사이클, 환율, AI 버블 — 매출·마진의 직접 변수.',
      factors: [
        { id: 'Ec1',  name: 'AI CapEx 지속과 HBM 슈퍼사이클',         impact: 5, uncertainty: 4 },
        { id: 'Ec2',  name: '메모리 가격 사이클 전환 위험',            impact: 5, uncertainty: 4 },
        { id: 'Ec3',  name: '반도체 관세·무역전쟁 수익성 영향',        impact: 4, uncertainty: 4 },
        { id: 'Ec4',  name: '글로벌 금리·인플레와 CapEx 조달 비용',    impact: 3, uncertainty: 3 },
        { id: 'Ec5',  name: '원-달러 환율 변동성',                    impact: 3, uncertainty: 3 },
        { id: 'Ec6',  name: 'AI 버블 붕괴 시나리오',                  impact: 5, uncertainty: 5 },
        { id: 'Ec7',  name: '한국 내수 침체와 정부 지원 지속성',       impact: 3, uncertainty: 3 },
        { id: 'Ec8',  name: '중국 내수 침체와 메모리 수요 변화',       impact: 3, uncertainty: 3 },
        { id: 'Ec9',  name: 'HBM 단가 프리미엄 유지 가능성',           impact: 4, uncertainty: 4 },
        { id: 'Ec10', name: '반도체 설비투자 사이클과 장비 병목',     impact: 3, uncertainty: 3 },
      ],
    },
    {
      id: 'P', label: 'Political', name: '정치', color: '#ef4444',
      summary: '미중 디커플링, MATCH 법안, 대만 해협, 동맹 공조 — 시나리오 축을 만드는 변수군.',
      factors: [
        { id: 'P1',  name: '美 對중국 반도체 수출 통제 강화·완화',     impact: 5, uncertainty: 5 },
        { id: 'P2',  name: 'CHIPS Act 보조금의 정치적 조건성',        impact: 4, uncertainty: 3 },
        { id: 'P3',  name: '한국 K-칩스법 및 정부 지원 지속성',        impact: 3, uncertainty: 3 },
        { id: 'P4',  name: '중국 빅펀드 III와 반도체 자립 가속',       impact: 5, uncertainty: 3 },
        { id: 'P5',  name: '동맹국 공조 수출 통제(MATCH 법안)',        impact: 5, uncertainty: 4 },
        { id: 'P6',  name: '미중 기술 디커플링 심화',                  impact: 5, uncertainty: 4 },
        { id: 'P7',  name: '美 한국산 반도체 관세 부과 가능성',        impact: 4, uncertainty: 4 },
        { id: 'P8',  name: '대만 해협 지정학 리스크',                  impact: 5, uncertainty: 5 },
        { id: 'P9',  name: '중동 지정학과 핵심 소재 수급',             impact: 4, uncertainty: 4 },
        { id: 'P10', name: '日·EU 반도체 정책 강화와 경쟁 지형',       impact: 3, uncertainty: 3 },
      ],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// DRIVING FORCES
// 출처: wiki/driving-forces/{impact-uncertainty-matrix, key-drivers}.md
// ─────────────────────────────────────────────────────────────────────────────

export const DRIVING_FORCES_DATA = {
  // STEEP_DATA 의 모든 factor 를 평탄화한 매트릭스 — 산점도 렌더용
  // (UI 에서 STEEP_DATA 에서 직접 derive 가능하지만, factors 추출 + 카테고리 색 첨부를 미리 해두면 재계산 비용 절감)
  matrix: null,  // ⬇ ScenarioPlanning.jsx 에서 동적으로 derive

  // Top 10 핵심 불확실성 (I×U 기준)
  top10: [
    { rank: 1,  id: 'T3',  name: '3D DRAM 상용화 시점',                      iu: 25, category: 'T'  },
    { rank: 2,  id: 'Ec6', name: 'AI 버블 붕괴 시나리오',                    iu: 25, category: 'Ec' },
    { rank: 3,  id: 'P1',  name: '미국의 對중국 반도체 수출 통제',           iu: 25, category: 'P'  },
    { rank: 4,  id: 'P8',  name: '대만 해협 지정학 리스크',                  iu: 25, category: 'P'  },
    { rank: 5,  id: 'T1',  name: 'HBM 세대 전환 속도와 고객 인증',           iu: 20, category: 'T'  },
    { rank: 6,  id: 'T6',  name: '커스텀 AI 칩(ASIC) 확산과 NVIDIA 의존도', iu: 20, category: 'T'  },
    { rank: 7,  id: 'Ec1', name: 'AI CapEx 지속 여부',                       iu: 20, category: 'Ec' },
    { rank: 8,  id: 'P5',  name: '동맹국 공조 수출 통제 (MATCH)',            iu: 20, category: 'P'  },
    { rank: 9,  id: 'P6',  name: '미중 기술 디커플링 심화',                  iu: 20, category: 'P'  },
    { rank: 10, id: 'Ec2', name: '메모리 반도체 가격 사이클 전환',           iu: 20, category: 'Ec' },
  ],

  // 선정된 3개 Driving Forces — 시나리오 축
  drivers: [
    {
      id: 'DF1',
      title: 'AI 수요의 구조적 지속성 vs 거품 붕괴',
      role: '주축 X — 시나리오 매트릭스의 가로축',
      currentPosition: '[2026-07-07 재평가] DF1 8.5 정점 유지 — 07-04 확증(8.0→8.5) 이후 LTA→SCA 계약 체제 확립 반영. Micron–Anthropic SCA(06-22, 공동설계+다년공급+운영통합+자본연계)·SCA 16건 $100B 공시 제도화·Stargate LOI(글로벌 DRAM 40%)로 다년 계약 락인 → 근단기 수요 바닥 경직화(UBS: "LTA가 cyclicality를 근본적으로 제거"). 상쇄 하방: 범용 DRAM Q3 계약가 +13~18% 감속(비AI-락인 축 집중, 서버/HBM 견조)·중기 공급 씨앗(한국 800조·CXMT 30k). 지지 성격이 실적 모멘텀→계약 구조 락인으로 전환. DRAM>HBM OPM 역전(84.9%)은 후기순환 신호로 유효 → DC 트래커 + 수요 변곡 EWI(공급 과잉·범용 감속) 선행 감시 지속',
      poleA: {
        label: '구조적 지속·슈퍼사이클',
        narrative: 'AI 수요 폭증 + 빅테크 CapEx 2027 $1조 돌파, HBM이 DRAM의 50% 차지 (2030)',
      },
      poleB: {
        label: 'AI 버블 붕괴·수요 재조정',
        narrative: '빅테크 CapEx 대폭 삭감 + 신규 팹 공급 과잉 → 2022~2023형 메모리 불황 재현',
      },
    },
    {
      id: 'DF2',
      title: '미중 지정학 대결의 강도 — 디커플링 vs 관리된 공존',
      role: '주축 Y — 시나리오 매트릭스의 세로축',
      currentPosition: '두 극단 사이의 긴장된 중간지점. 2026 MATCH 법안 통과가 분기점',
      poleA: {
        label: '전면 기술 디커플링',
        narrative: 'MATCH 법안 통과 → 시안 팹 매각 압박, 서방 동맹 공급망에서 지배적 위치 확보',
      },
      poleB: {
        label: '관리된 공존·협상 균형',
        narrative: '시안 팹 연간 라이선스 갱신 유지, 중국·서방 양쪽에 제한적 공급 (전략적 모호성)',
      },
    },
    {
      id: 'DF3',
      title: 'AI 메모리 기술 패러다임 — HBM 지속 vs 대안 부상',
      role: '보조축 — E 와일드카드 시나리오 트리거',
      currentPosition: '2026년 HBM 압도적 우위. 2030년 중반 이후 패러다임 전환 가능성 의미 있음',
      poleA: {
        label: 'HBM 지속 + 세대 확장',
        narrative: 'HBM5/6 세대 확장, PIM·CXL 은 보완재로 공존. 3D DRAM 은 2035 이후',
      },
      poleB: {
        label: '대안 아키텍처 부상',
        narrative: 'PIM·CXL·3D DRAM 가속 + 커스텀 ASIC 으로 NVIDIA GPU+HBM 구조 잠식',
      },
    },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIOS
// 출처: wiki/scenarios/{scenario-A..E, scenario-matrix}.md
// ─────────────────────────────────────────────────────────────────────────────

export const SCENARIOS_DATA = {
  // 시나리오 매트릭스 (DF1 × DF2)
  matrix: [
    {
      id: 'A', name: '황금 요새', color: '#1d4ed8',
      df1: 'AI 지속',     df2: '디커플링',
      probability: 27,  // 2026-07-04 — Micron Q3 사상 최대·$100B SCA 백로그로 AI-지속 Pole A 강화 → 26→27 (indicators.js 동기화)
      summary: '서방 AI 공급망 내 HBM 수요 폭발. 시안 팹 상실 + 서방 시장 프리미엄 급등',
      threats: ['시안 팹 상실', '대중 HBM 봉쇄', '공급 다각화 압박'],
      opportunities: ['서방 AI 듀오폴리', 'HBM 단가 프리미엄', '텍사스 팹 CHIPS 보조금'],
      keyAssumption: 'MATCH 법안 통과 + 삼성 HBM4 NVIDIA 인증 획득',
    },
    {
      id: 'B', name: 'AI 르네상스', color: '#059669',
      df1: 'AI 지속',     df2: '관리된 공존',
      probability: 38,  // 2026-07-07 — LTA→SCA 계약 체제 확립(Micron–Anthropic SCA·$100B·Stargate 40% DRAM)으로 근단기 수요 바닥 경직화 → 37→38
      summary: 'AI 글로벌 성장 + 중국 시장 부분 접근 유지. 최상의 성장 환경, 가장 가능성 높음. [2026-07-07] LTA→SCA 계약 체제 확립 — Micron–Anthropic SCA(06-22)·SCA 16건 $100B 공시 제도화·Stargate LOI(글로벌 DRAM 40%)로 다년 계약 락인, 근단기 수요 바닥 경직화 → Main Bet 강화(37→38). 감속 신호(범용 DRAM +13~18%)는 비AI-락인 축 집중, 서버/HBM/SCA 축 견조. KPI 윈도우 HBM4E·HBM5(2027~). 단 사상 최고 마진(84.9%)·정점 신호로 절제(RS-5) 병행.',
      threats: ['SK하이닉스 기술 격차 고착 (FY25 OP 47.2조 vs Samsung 메모리 24.9조)', 'NAND 점유율 회복 압박', 'Rubin 진입 여지 좁아짐 (SK 2/3+ 락인)', '공급 과잉 정점 후 순환 조정 리스크'],
      opportunities: ['동서 양쪽 시장 공략', 'DC 파이프라인 55.9GW·운영사별 HBM 수요 가시성', 'HBM4E·HBM5 윈도우에서 회복 베팅', '대중 일반 메모리 매출 유지', 'IDM 종합반도체 차별점 (CXL·3D DRAM·로직다이 내재화)'],
      keyAssumption: 'AI 수익화 가시화 + 미중 협상 모멘텀 지속 + DC 착공 파이프라인 실현',
      mainBet: true,
    },
    {
      id: 'C', name: '기술 냉전', color: '#dc2626',
      df1: 'AI 거품 붕괴', df2: '디커플링',
      probability: 8,  // 2026-07-07 — LTA→SCA 다년 계약 락인으로 근단기 이중 충격(AI붕괴+디커플링) 확률 추가 축소 → 9→8
      summary: 'AI 투자 급감 + 공급망 단절 동시 발생. 메모리 대규모 공급과잉 — 최악 시나리오',
      threats: ['이중 충격', '시안 팹 + 수요 급감 동시', '구조조정 불가피', '경쟁사 인수 표적'],
      opportunities: ['생존 자체가 경쟁력', 'M&A 매물 등장', '재무체력으로 기술 격차 좁히기'],
      keyAssumption: 'AI 버블 붕괴 + MATCH 법안 + 대만 해협 긴장 동시 발생',
    },
    {
      id: 'D', name: '조용한 재편', color: '#d97706',
      df1: 'AI 거품 붕괴', df2: '관리된 공존',
      probability: 21,  // 2026-07-04 — Micron $100B take-or-pay 백로그·2026 Sold Out·수급 타이트 2027+ 로 하락 변곡 근단기 실현 뒤로 밀림 → 23→21 (합계 100)
      summary: 'AI 과열 조정, 메모리 불황 재현. 지정학 안정화로 시장 질서는 유지. [2026-07] Micron SCA $100B take-or-pay 백로그·2026 HBM Sold Out·수급 타이트 2027+ 로 하락 변곡의 근단기 실현 시점이 뒤로 밀림(23→21). 단 사상 최고 마진·DRAM>HBM OPM 역전은 후기순환 신호로 유효 — 공급 과잉 EWI 경계(68)·GPU 임대가 둔화 선행 감시 지속.',
      threats: ['2022~2023형 다운사이클 재현', '더블오더링 언와인드(부족 정점→급락)', '비용 경쟁 심화', 'SK 기술 우위 고착화'],
      opportunities: ['기술 격차 좁힐 시간', '수요 변곡 EWI로 선제 규율 (RS-9·RS-5)', '내부 체질 개선', '저가 M&A 기회'],
      keyAssumption: 'AI ROI 미실현/순환 조정 + 지정학 안정화 (협상 지속)',
    },
    {
      id: 'E', name: '패러다임 전환', color: '#7c3aed',
      df1: 'AI 지속 (변형)', df2: '독립',
      probability: 6,
      summary: 'HBM 대신 3D DRAM·PIM·CXL이 AI 메모리 주류로 부상. 와일드카드',
      threats: ['HBM 투자 가치 급락', '잘못된 베팅 위기', 'R&D 포트폴리오 재편 압박'],
      opportunities: ['3D DRAM·PIM 선점 시 재도약', '아키텍처 다양화 리더십'],
      keyAssumption: 'DF3 Pole B 실현 (3D DRAM/PIM/CXL 가속)',
      wildcard: true,
    },
  ],

  // 분기점 모니터링 일정
  branchingPoints: [
    { factor: '빅테크 AI 수익화 성과',         decisionDate: '2026 Q4 ~ 2027 Q2', monitor: 'Google·MS·아마존 AI 매출, 구독 해지율' },
    { factor: 'MATCH 법안 통과 여부',          decisionDate: '2026 Q3 ~ 2027 Q1', monitor: '미 의회 투표, 동맹국 동조' },
    { factor: '삼성 HBM4 NVIDIA 인증',         decisionDate: '2026 Q3',            monitor: 'NVIDIA 공급사 발표' },
    { factor: '중국 CXMT HBM 첫 양산',         decisionDate: '2027 ~ 2028',        monitor: '중국산 HBM 샘플 성능 평가' },
    { factor: '3D DRAM 개념증명 완료',         decisionDate: '2026 ~ 2027',        monitor: '삼성·마이크론·IMEC 논문·특허' },
    { factor: 'SK·Kioxia 1억 IOPS AI SSD 양산', decisionDate: '2027',               monitor: 'NVIDIA Storage-Next 레퍼런스 발표 — Samsung SLC AI SSD 로드맵 공개 시급' },
    { factor: 'CXMT DRAM 점유 4강 진입',        decisionDate: '2026 ~ 2027',        monitor: 'TrendForce 분기 점유율 — 12%+ 도달 시 범용 가격 압박 본격화' },
    { factor: 'Stargate Korea LOI → DA',       decisionDate: '2026 H1',            monitor: 'Samsung+SK+OpenAI 본 계약 체결 + 4사 컨소시엄 운영 협약 (SE-3)' },
    { factor: 'AI DC 착공 파이프라인 가동',     decisionDate: '상시 (분기)',        monitor: 'DC 트래커 55.9GW 단계 분포·연도별 가동·취소 건수 — 메모리 수요 6~24개월 선행 (ai-datacenter-buildout.md)' },
    { factor: '수요 변곡 EWI 괴리·공급 과잉',   decisionDate: '상시 (주간)',        monitor: '복합 위험·선행−끈적 괴리·공급 과잉(현재 경계 68)·GPU 임대가 — 하락 변곡 선행 (demand-inflection-ewi.md)' },
  ],
}

// ─────────────────────────────────────────────────────────────────────────────
// BENCHMARK
// 출처: wiki/benchmark/{cyclical, agri-hedging, upside-participation}.md
// ─────────────────────────────────────────────────────────────────────────────

export const BENCHMARK_DATA = {
  // 7개 산업 경기 사이클 대응 패턴
  cyclicalPatterns: [
    { id: 1, name: '역(逆)사이클 투자', mechanism: '불황기에 경쟁사가 줄일 때 오히려 늘려서 회복기 점유율 선점', cases: ['Samsung', 'ExxonMobil', 'Disney'], color: '#ef4444' },
    { id: 2, name: '변동비 구조',       mechanism: '고정비를 변동비로 전환 → 수요 따라 생산 조절',                  cases: ['Nucor (전기로)'],                color: '#f59e0b' },
    { id: 3, name: '자산 경량화',       mechanism: '자본투자 대신 브랜드·플랫폼 fee 비즈니스로 전환',               cases: ['Marriott', 'Maersk'],            color: '#10b981' },
    { id: 4, name: '수직·수평 통합',    mechanism: '사이클이 다른 사업을 결합해 변동성 평탄화',                     cases: ['Maersk (해운+물류)'],           color: '#3b82f6' },
    { id: 5, name: '헤징·장기계약',     mechanism: '파생상품 또는 다년 계약으로 가격 변동 차단',                     cases: ['Southwest', 'Samsung Foundry'], color: '#8b5cf6' },
    { id: 6, name: '요새형 재무구조',   mechanism: '낮은 부채와 두꺼운 현금으로 불황 견디고 매물 매입',              cases: ['Nucor', 'Samsung'],              color: '#06b6d4' },
    { id: 7, name: '불황기 M&A',         mechanism: '자산 가격 하락기에 핵심 IP·기술·생산능력 매입',                cases: ['Disney-Marvel', 'ExxonMobil-Pioneer'], color: '#ec4899' },
  ],

  // 7개 산업 사례
  industries: [
    { name: 'Samsung Electronics', industry: '반도체',  pattern: '역사이클 투자 + 요새형 재무',      keyMetric: '2025 현금 $63B, 2022 capex 47.7조원' },
    { name: 'Nucor',               industry: '철강',    pattern: '변동비 구조 (EAF) + 분권화',       keyMetric: '20-23 평균 ROE 33%, 50년 연속 배당 인상' },
    { name: 'A.P. Møller-Maersk',  industry: '해운',    pattern: '자산 경량화 + 수직 통합 (물류)',   keyMetric: '컨테이너+물류 통합 매출 60%+' },
    { name: 'ExxonMobil',          industry: '석유',    pattern: '역사이클 투자 + 불황기 M&A',       keyMetric: '2023 Pioneer $59.5B 인수' },
    { name: 'Marriott',            industry: '호텔',    pattern: '자산 경량화 (브랜드 fee)',         keyMetric: '직영 비중 5% 미만, 8,000+ 호텔' },
    { name: 'Disney',              industry: '미디어',  pattern: '불황기 M&A + 역사이클 투자',        keyMetric: 'Marvel $4B (2009), Pixar $7.4B (2006)' },
    { name: 'Southwest',           industry: '항공',    pattern: '연료 헤징 + 단일 기종 운영',       keyMetric: '2008 유가 $145 헤지로 $2B 절감' },
  ],

  // 농수산업 헤징 메커니즘 → 메모리 적용
  agriHedging: [
    { id: 1, name: 'Cargill DDC 접근법',   원리: 'Diversification, Discipline, Consistency — 포트폴리오 헤징', memoryApplication: '단일 forward 가 아닌 forward + collar + tiered pricing 조합 운영' },
    { id: 2, name: 'Forward + Futures',     원리: '선도계약 + 거래소 선물 — 수확 전 가격 고정',                   memoryApplication: 'NVIDIA 다년 공급계약 + DRAMeXchange 선물형 거래' },
    { id: 3, name: 'Costless Collar',       원리: 'Put 매수 + Call 매도 — 양방향 헤지 (제로 코스트)',             memoryApplication: 'HBM 매출에 floor + ceiling 동시 락인' },
    { id: 4, name: 'Participating Forward', 원리: 'Floor + 50% 상방 참여 — 다운사이드 보호 + 업사이드 일부 잡기', memoryApplication: '핵심 헤지 수단 — 다운 보호 + 호황 50% 회수' },
    { id: 5, name: 'Tiered Pricing',        원리: '계단식 가격 — 시장가 구간별 차등 가격 (CPG·식품 표준)',         memoryApplication: 'HBM 가격 구간별 인센티브 (저가시 보너스, 고가시 가격 상한)' },
    { id: 6, name: 'Slot Reservation HTA',  원리: 'Hedge-To-Arrive — 슬롯/가격 분리해 가격만 미리 락인',          memoryApplication: 'Wafer slot 예약과 가격 결정을 분리 — 수율 시점에 가격 확정' },
    { id: 7, name: '자체 Trading Desk',     원리: 'Black River (Cargill) — 자체 트레이딩 부서로 시장 정보 우위',  memoryApplication: 'Memory Trading Desk + DRAMeXchange OTC 스왑 직접 운영' },
  ],

  // 호황 참여 헤지 구조 5종
  upsideStructures: [
    { id: 1, name: 'Costless Collar',       complexity: '낮음', floor: 'O', upside: '×',  premium: '0',     downside: 'Floor 보호',         note: '가장 표준적, 양방향 락인' },
    { id: 2, name: 'Participating Forward', complexity: '중간', floor: 'O', upside: '50%', premium: '0',     downside: 'Floor 보호',         note: '권고 — 농산물 헤지의 우아한 해법', recommended: true },
    { id: 3, name: 'Tiered Pricing',        complexity: '낮음', floor: '△', upside: '△',  premium: '0',     downside: '중간 가격대 보호',  note: 'CPG 식품 표준 구조' },
    { id: 4, name: 'Three-way Collar',      complexity: '높음', floor: 'O', upside: '제한', premium: '음수', downside: 'Sub-put 위험',      note: 'Pioneer/Whiting 손실 가속 — 금지', forbidden: true },
    { id: 5, name: 'Bull Call Spread',      complexity: '중간', floor: '×', upside: '제한', premium: '양수', downside: '없음 (구매자측)',   note: '고객측 도구 — 공급사 무관' },
  ],
}
