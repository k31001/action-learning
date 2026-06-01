// 전 세계 AI 데이터센터 착공 트래커 — 메모리 수요의 선행 지표.
//
// 논리: AI 데이터센터 건설 = 메모리(HBM/DRAM) 수요의 6~24개월 선행 신호.
//   부지 확보 → 인허가 → 골조 → 전력 → IT 장비 설치(GPU+HBM 투입) → 가동.
//   "지금 어느 단계에 얼마만큼의 용량이 쌓여 있는가"를 보면 향후 메모리 수요를 가늠할 수 있다.
//
// 모든 수치는 wiki/concepts/ai-datacenter-buildout.md 에 출처와 함께 정리됨 (위키가 단일 소스).
// 단위: mw = MW(계획/완공 기준 용량), acres = 부지(에이커), capex = 십억 USD($B),
//       gpuK = 공시된 가속기 수(천 단위, 선택), online = 1차 주요 가동 연도.
//
// ※ 본 트래커는 >200MW 또는 >$1B 급 대형 프로젝트의 표본이며 전수 조사가 아니다.
//   따라서 도출되는 메모리 수요는 "추적 파이프라인이 함의하는 방향성 지표"로 해석한다.

// ─────────────────────────────────────────────────────────────────────────────
// 1. 데이터센터 라이프사이클 9단계 모델
//    출처: Global Data Center Hub(7-phase 언더라이팅), Epoch AI, JLL/CBRE, Mastt
// ─────────────────────────────────────────────────────────────────────────────
export const DC_STAGES = [
  { id: 1, key: 'land',        label: '부지 확보',     short: '부지',   color: '#94a3b8', desc: '토지 매입·옵션·지상권 확보, 부지 선정 (전력 가용성·계통 인접·광·용수 심사)' },
  { id: 2, key: 'permit',      label: '인허가·전력계약', short: '인허가', color: '#a78bfa', desc: '인허가(존), 계통 접속(interconnection)·PPA 체결 — 최대 long-pole (美 중앙값 ~5년)', bottleneck: true },
  { id: 3, key: 'siteprep',    label: '부지 조성',     short: '조성',   color: '#c084fc', desc: '정지(grading)·기초 타설·유틸리티 트렌칭' },
  { id: 4, key: 'shell',       label: '골조·외피',     short: '골조',   color: '#60a5fa', desc: '구조 골조·건물 외피·보안 외피 (powered shell)' },
  { id: 5, key: 'power',       label: '전력 인프라',   short: '전력',   color: '#38bdf8', desc: '변전소·스위치기어·변압기·발전 설비 — 변압기 리드타임 ~3~4년 (long-pole)', bottleneck: true },
  { id: 6, key: 'fitout',      label: '기계·전기',     short: 'M&E',    color: '#22d3ee', desc: 'PDU·UPS·냉각(액침/직접칩) — GB200/GB300급은 액체냉각 필수' },
  { id: 7, key: 'itinstall',   label: 'IT 장비 설치',  short: 'IT설치', color: '#2dd4bf', desc: 'GPU 서버·랙·네트워크 설치 — GPU+HBM 실제 투입 시점 (HBM 공급이 binding)', bottleneck: true },
  { id: 8, key: 'commission',  label: '시운전',       short: '시운전', color: '#34d399', desc: '통합 시스템 시험(L1~L5)·부하 테스트' },
  { id: 9, key: 'operational', label: '가동·램프업',   short: '가동',   color: '#10b981', desc: '운영 개시·설계 부하까지 램프업 (메모리 수요 실현)' },
]

// 병목(long-pole) 단계 — 발표 용량이 실제 가동(메모리 소비)으로 전환되는 속도를 좌우
export const DC_BOTTLENECK_STAGES = [2, 5, 7]

// ─────────────────────────────────────────────────────────────────────────────
// 2. 용량 → 메모리 수요 환산 모델
//    GB200 NVL72 기준 (132kW/랙·72 GPU, PUE 1.1). 출처: NVIDIA·HPE 스펙 + TrendForce/MS 추정
// ─────────────────────────────────────────────────────────────────────────────
export const DC_CONVERSION = {
  pue: 1.1,                    // 시설 전력 → IT 부하 (Google 평균 1.09)
  rackKw: 132,                 // GB200 NVL72 실부하 (HPE: 115kW 액체 + 17kW 공랭)
  gpuPerRack: 72,              // NVL72
  gpuPerMw: 468,               // = (1000kW/132kW)×72×(1/1.1) ≈ IT MW당 GPU 수
  gpuPerGw: 468000,            // 1GW(시설) ≈ 910MW IT ≈ 468k GPU
  hbmGbPerGpuBlackwell: 192,   // B200/GB200 (HBM3E 8-hi)
  hbmGbPerGpuUltra: 288,       // GB300/B300 (HBM3E 12-hi) · Rubin R100 (HBM4)
  sysDramGbPerGpu: 250,        // x86 HGX 8-GPU 노드 = 최대 2TB DDR5 → GPU당 ~250GB
  hbmUsdPerGb: 15,             // HBM3E BOM 단가 (범위 $8~17/GB)
}

// 칩 세대 → GPU당 HBM 용량 (GB)
export function hbmGbPerGpuFor(chip = '') {
  const c = String(chip).toLowerCase()
  if (/rubin|gb300|b300|gr300/.test(c)) return DC_CONVERSION.hbmGbPerGpuUltra  // 288
  if (/h200/.test(c)) return 141
  if (/h100|hopper/.test(c)) return 80
  return DC_CONVERSION.hbmGbPerGpuBlackwell                                    // 192 (기본)
}

// 용량(MW) → 메모리 수요. hbmPerGpu 미지정 시 Blackwell 192GB 기준.
export function impliedMemory(mw, hbmPerGpu = DC_CONVERSION.hbmGbPerGpuBlackwell) {
  const gpus = mw * DC_CONVERSION.gpuPerMw
  const hbmGb = gpus * hbmPerGpu
  const sysDramGb = gpus * DC_CONVERSION.sysDramGbPerGpu
  const hbmUsd = hbmGb * DC_CONVERSION.hbmUsdPerGb
  return {
    gpus,
    hbmPb: hbmGb / 1e6,         // PB
    sysDramPb: sysDramGb / 1e6, // PB
    hbmUsdB: hbmUsd / 1e9,      // $B
  }
}

// 외부 애널리스트 앵커 — 추적 파이프라인을 시장 전체와 비교하는 기준점
export const DC_ANCHORS = {
  hbmTam2026B: 45,        // 2026 HBM TAM ~$45B (Goldman Sachs, 2025-12)
  hbmBitGrowth2026: 70,   // HBM bit 수요 +70% YoY 2026 (SK hynix/TrendForce)
  aiDramWaferShare2026: 20, // AI가 2026 글로벌 DRAM 웨이퍼의 ~20% 소비 (TrendForce)
  capexPerGwB: 60,        // 10GW ≈ $600B capex (이 중 ~$350B NVIDIA) — Morgan Stanley
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. 글로벌 AI 데이터센터 프로젝트 (mid-2026 시점)
//    region: 'North America' | 'Asia-Pacific' | 'Middle East' | 'Europe'
//    conf: 'confirmed' | 'estimate' | 'disputed'
// ─────────────────────────────────────────────────────────────────────────────
export const DATA_CENTERS = [
  // ── North America (US) ──────────────────────────────────────────────────────
  { id: 'abilene',    name: 'Stargate Abilene',          operator: 'Crusoe / Oracle / OpenAI', region: 'North America', country: '미국', city: 'Abilene, TX',         mw: 1200, acres: 875,  capex: 15,  chip: 'GB200',     gpuK: 450, stage: 9, online: 2026, conf: 'confirmed', status: '4/8동 가동, 잔여동 건설', note: 'OpenAI 600MW 증설 철회(2026-03)·MS 700MW 임차', src: 'Epoch AI, DCD, Crusoe' },
  { id: 'frontier',   name: 'Stargate Frontier',         operator: 'Vantage / OpenAI',         region: 'North America', country: '미국', city: 'Shackelford Co., TX', mw: 1400, acres: 1200, capex: 25,  chip: 'GB300',     gpuK: null, stage: 4, online: 2026, conf: 'confirmed', status: '1동 건설중, H2 2026 인도', note: '10개동 3.7M sqft, 온사이트 가스 마이크로그리드', src: 'Vantage, DCD' },
  { id: 'jupiter',    name: 'Stargate Jupiter',          operator: 'STACK / OpenAI',           region: 'North America', country: '미국', city: 'Doña Ana Co., NM',    mw: 2200, acres: null, capex: null, chip: 'GB300',    gpuK: null, stage: 3, online: 2028, conf: 'estimate',  status: '기초 공사, 인허가 진행', note: '4개동, 온사이트 가스 2기', src: 'Epoch AI' },
  { id: 'freebird',   name: 'Stargate Freebird',         operator: 'SB Energy / OpenAI',       region: 'North America', country: '미국', city: 'Milam Co., TX',       mw: 1200, acres: null, capex: null, chip: 'GB300',    gpuK: null, stage: 4, online: 2026, conf: 'estimate',  status: '철골/지붕 시공, 10월 1동', note: '신규 온사이트 발전+저장', src: 'Epoch AI, OpenAI' },
  { id: 'lighthouse', name: 'Stargate Lighthouse',       operator: 'Vantage / OpenAI',         region: 'North America', country: '미국', city: 'Port Washington, WI', mw: 1300, acres: null, capex: 15,  chip: 'GB300',     gpuK: null, stage: 3, online: 2028, conf: 'estimate',  status: '기초 공사 착수', note: '재생E ~70% 주장', src: 'Data Center Knowledge' },
  { id: 'barn',       name: 'Stargate "The Barn"',       operator: 'Related Digital / Oracle', region: 'North America', country: '미국', city: 'Saline Twp., MI',     mw: 1000, acres: 250,  capex: 7,   chip: 'GB300',     gpuK: null, stage: 4, online: 2027, conf: 'confirmed', status: '2026 초 건설 시작', note: 'DTE 그리드 100%+배터리', src: 'Bisnow, DCD' },
  { id: 'hyperion',   name: 'Meta Hyperion',             operator: 'Meta',                     region: 'North America', country: '미국', city: 'Richland Parish, LA', mw: 5000, acres: 5000, capex: 27,  chip: 'Blackwell', gpuK: 1300, stage: 5, online: 2027, conf: 'confirmed', status: '건설중, Phase1 1.5GW 27년말', note: 'Entergy 가스 10기·송전 240mi·BESS', src: 'ENR, Wikipedia, DCD' },
  { id: 'prometheus', name: 'Meta Prometheus',           operator: 'Meta',                     region: 'North America', country: '미국', city: 'New Albany, OH',      mw: 1000, acres: null, capex: 3,   chip: 'Blackwell', gpuK: null, stage: 8, online: 2026, conf: 'confirmed', status: '5동 중 3동 마무리, 26년 가동', note: '세계 첫 1GW급, Williams 가스 온사이트', src: 'NBC4, AI DC Index' },
  { id: 'elpaso',     name: 'Meta El Paso',              operator: 'Meta',                     region: 'North America', country: '미국', city: 'El Paso, TX',         mw: 1000, acres: null, capex: 10,  chip: 'Blackwell', gpuK: null, stage: 4, online: 2028, conf: 'confirmed', status: "'25-10 착공, 28년 1GW", note: '366MW 모듈 가스+폐회로 액냉', src: 'CNBC, DCD' },
  { id: 'lebanon',    name: 'Meta Lebanon',              operator: 'Meta',                     region: 'North America', country: '미국', city: 'Lebanon, IN',         mw: 1000, acres: null, capex: 10,  chip: 'Blackwell', gpuK: null, stage: 4, online: 2027, conf: 'confirmed', status: "'26-02 건설 시작", note: '13개동(DC10+지원3)', src: 'Meta, DCD' },
  { id: 'fairwater-wi', name: 'Microsoft Fairwater WI',  operator: 'Microsoft',                region: 'North America', country: '미국', city: 'Mount Pleasant, WI',  mw: 450,  acres: 315,  capex: 7.3, chip: 'GB300',     gpuK: 150,  stage: 9, online: 2026, conf: 'confirmed', status: '조기 가동(26-04), 증설 진행', note: '2층 폐회로 액냉·Atlanta와 AI WAN 연결', src: "Tom's HW, DCD" },
  { id: 'fairwater-ga', name: 'Microsoft Fairwater ATL', operator: 'Microsoft',                region: 'North America', country: '미국', city: 'Atlanta, GA',         mw: 600,  acres: null, capex: null, chip: 'GB300',    gpuK: null, stage: 9, online: 2026, conf: 'estimate',  status: '가동+Fairwater4 인접 건설', note: '첫 "AI 슈퍼팩토리" 분산형', src: 'Microsoft, DCF' },
  { id: 'colossus',   name: 'xAI Colossus 2',            operator: 'xAI',                      region: 'North America', country: '미국', city: 'Memphis, TN',         mw: 2000, acres: null, capex: 18,  chip: 'Blackwell', gpuK: 555,  stage: 9, online: 2026, conf: 'confirmed', status: '2GW 램프업, 100만 GPU 목표', note: '세계 첫 GW급, 온사이트 가스 터빈', src: 'Introl, SemiAnalysis' },
  { id: 'rainier',    name: 'AWS Project Rainier',       operator: 'Amazon AWS (Anthropic)',   region: 'North America', country: '미국', city: 'New Carlisle, IN',    mw: 2200, acres: 1200, capex: 11,  chip: 'Trainium2', gpuK: 500,  stage: 9, online: 2025, conf: 'confirmed', status: '가동중(25-10)·30동 중 7동·증설', note: '자체 실리콘 Trainium2 → 100만개+', src: 'aboutamazon, CNBC' },
  { id: 'aws-ms',     name: 'AWS Mississippi (Atlas)',   operator: 'Amazon AWS',               region: 'North America', country: '미국', city: 'Madison Co., MS',     mw: 1000, acres: 1700, capex: 25,  chip: 'Trainium2', gpuK: null, stage: 4, online: 2027, conf: 'estimate',  status: '건설중, 27년 완공', note: '2개 하이퍼스케일 단지', src: 'aboutamazon, DCD' },
  { id: 'qts-fay',    name: 'QTS Fayetteville',          operator: 'QTS (Blackstone)',         region: 'North America', country: '미국', city: 'Fayetteville, GA',    mw: 1000, acres: 615,  capex: null, chip: 'GB300',    gpuK: null, stage: 4, online: 2027, conf: 'estimate',  status: '13동 중 2동 완공·4동 건설', note: 'MS Fairwater ATL 일부 수용', src: 'DCD, The Citizen' },
  { id: 'crusoe-wy',  name: 'Crusoe Wyoming',            operator: 'Crusoe / Tallgrass',       region: 'North America', country: '미국', city: 'Cheyenne, WY',        mw: 1800, acres: null, capex: null, chip: 'GB300',    gpuK: null, stage: 2, online: 2028, conf: 'estimate',  status: '카운티 승인(26-01), 초기 개발', note: '→10GW 확장 가능·가스 우선', src: 'DCD, Inside Climate' },
  { id: 'google-tx',  name: 'Google Texas (3캠퍼스)',     operator: 'Google',                   region: 'North America', country: '미국', city: 'Armstrong/Haskell, TX', mw: 1500, acres: null, capex: 40, chip: 'TPU',       gpuK: null, stage: 2, online: 2027, conf: 'estimate',  status: '발표(25-11), 27년말 개발', note: 'TPU·솔라+배터리 병설', src: 'Google, Texas Tribune' },
  { id: 'coreweave',  name: 'CoreWeave (포트폴리오)',     operator: 'CoreWeave',                region: 'North America', country: '미국', city: '다수 캠퍼스',          mw: 3500, acres: null, capex: 28,  chip: 'Rubin',     gpuK: null, stage: 9, online: 2026, conf: 'confirmed', status: '계약 전력 3.5GW→30년 5GW', note: 'Rubin 조기 채용·포트폴리오 합산', src: 'CoreWeave 8-K Q1 FY26' },

  // ── Asia-Pacific ────────────────────────────────────────────────────────────
  { id: 'jamnagar',   name: 'Reliance Jamnagar',         operator: 'Reliance (Jio)',           region: 'Asia-Pacific',  country: '인도',  city: 'Jamnagar, Gujarat',  mw: 3000, acres: null, capex: 25,  chip: 'Blackwell', gpuK: null, stage: 4, online: 2026, conf: 'disputed',  status: '1차 >120MW H2 2026, 풀 27년+', note: '인접 10GW 그린E 전력·그룹 $110B 계획과 구분', src: 'Bloomberg, TechCrunch' },
  { id: 'vizag',      name: 'Google AI Hub Vizag',       operator: 'Google / AdaniConneX',     region: 'Asia-Pacific',  country: '인도',  city: 'Visakhapatnam, AP',  mw: 1000, acres: null, capex: 15,  chip: 'TPU',       gpuK: null, stage: 4, online: 2027, conf: 'confirmed', status: "'26-04 착공, ~30년 단계", note: '인도 첫 GW급 AI 허브·해저케이블 게이트웨이', src: 'Google Cloud, Adani' },
  { id: 'jeonnam',    name: '전남 3GW AI DC',             operator: 'Fir Hills (SFR)',          region: 'Asia-Pacific',  country: '한국',  city: '전라남도',            mw: 3000, acres: null, capex: 35,  chip: 'Blackwell', gpuK: 200,  stage: 1, online: 2028, conf: 'disputed',  status: 'MoU 체결, 전력원 미확정', note: '개발사 주장(세계 최대)·실현성 논란', src: 'DCD, Tom\'s HW' },
  { id: 'sk-aws-ulsan', name: 'SK·AWS 울산',             operator: 'SK Group / AWS',           region: 'Asia-Pacific',  country: '한국',  city: '울산 미포',           mw: 1000, acres: null, capex: 5.1, chip: 'Blackwell', gpuK: 60,   stage: 4, online: 2027, conf: 'confirmed', status: "'25-08 착공·41MW(27)→103MW(29)", note: 'SK가스 LNG 열병합·풀 1GW 확장 가능', src: 'KED Global, DCD' },
  { id: 'saemangeum', name: '현대차 새만금',              operator: 'Hyundai Motor Group',      region: 'Asia-Pacific',  country: '한국',  city: '새만금',              mw: 800,  acres: null, capex: 6.3, chip: 'Blackwell', gpuK: 50,   stage: 2, online: 2028, conf: 'estimate',  status: 'MoU(26-02)', note: '로보틱스+그린수소+GW 솔라 묶음', src: 'Introl, NVIDIA' },
  { id: 'stargate-kr', name: 'Stargate Korea',           operator: 'OpenAI / Samsung·SK',      region: 'Asia-Pacific',  country: '한국',  city: '포항·전남',           mw: 40,   acres: null, capex: null, chip: 'Blackwell', gpuK: null, stage: 3, online: 2026, conf: 'confirmed', status: '20MW×2, 26-03 착공 예정', note: 'Samsung·SK가 글로벌 Stargate에 HBM 공급', src: 'Korea Herald, Blocks&Files' },
  { id: 'sakai',      name: 'SoftBank Sakai (Stargate JP)', operator: 'SoftBank / OpenAI',     region: 'Asia-Pacific',  country: '일본',  city: 'Sakai, Osaka',       mw: 250,  acres: null, capex: 0.7, chip: 'Blackwell', gpuK: null, stage: 6, online: 2026, conf: 'confirmed', status: '구 Sharp 공장 전환, 26년 가동', note: '150MW→250MW(FY28)·일본 최대 전환', src: 'DCD, Nasdaq' },
  { id: 'oracle-jp',  name: 'Oracle Japan',              operator: 'Oracle',                   region: 'Asia-Pacific',  country: '일본',  city: 'Tokyo·Osaka',        mw: 300,  acres: null, capex: 8,   chip: 'H200',      gpuK: null, stage: 6, online: 2026, conf: 'estimate',  status: '동·서 2리전 증설중', note: 'NVIDIA H100/H200 GPU zone', src: 'Introl, DCD' },
  { id: 'bridge-my',  name: 'Bridge DC MY06/MY07',       operator: 'Bridge DC / ByteDance',    region: 'Asia-Pacific',  country: '말레이시아', city: 'Johor',          mw: 510,  acres: 58,   capex: 2.8, chip: 'Blackwell', gpuK: null, stage: 4, online: 2026, conf: 'confirmed', status: 'MY06 가동·MY07 건설·400MW TNB', note: 'ByteDance 앵커, Johor 5.3GW 파이프', src: 'Mingtiandi, MIDA' },
  { id: 'msft-my',    name: 'Microsoft Malaysia SEA3',   operator: 'Microsoft',                region: 'Asia-Pacific',  country: '말레이시아', city: 'Kulai, Johor',   mw: 300,  acres: null, capex: 2.2, chip: 'Blackwell', gpuK: null, stage: 3, online: 2027, conf: 'estimate',  status: '발표(25-11), 2~3년 가동 목표', note: '3 AZ 클라우드 리전', src: 'DCD, ASEAN Briefing' },
  { id: 'alibaba-sg', name: 'Alibaba Shaoguan',          operator: 'Alibaba / China Telecom',  region: 'Asia-Pacific',  country: '중국',  city: 'Shaoguan, 광둥',     mw: 200,  acres: null, capex: null, chip: '자국칩(Zhenwu)', gpuK: 10, stage: 9, online: 2026, conf: 'estimate',  status: '가동(26-04), 1만→10만칩 목표', note: '완전 자국 스택(NVIDIA 우회)·MW 비공개', src: 'CNBC, Capital Brief' },
  { id: 'alibaba-ul', name: 'Alibaba Ulanqab',           operator: 'Alibaba Cloud',            region: 'Asia-Pacific',  country: '중국',  city: 'Ulanqab, 내몽골',    mw: 300,  acres: null, capex: null, chip: '혼합',        gpuK: null, stage: 9, online: 2025, conf: 'estimate',  status: '가동·확장중', note: '東數西算 서부 허브·풍력/태양광', src: 'Baxtel, Goldman' },
  { id: 'dayone-batam', name: 'DayOne Batam',            operator: 'DayOne / Oracle',          region: 'Asia-Pacific',  country: '인도네시아', city: 'Nongsa, Batam',  mw: 450,  acres: null, capex: null, chip: 'Blackwell', gpuK: null, stage: 4, online: 2027, conf: 'estimate',  status: '150MW(Q3 26)→450MW(27)', note: 'Oracle 인니 North 리전', src: 'Jakarta Globe, ANTARA' },
  { id: 'foxconn-tw', name: 'Foxconn Kaohsiung',         operator: 'Foxconn / NVIDIA',         region: 'Asia-Pacific',  country: '대만',  city: 'Kaohsiung',          mw: 100,  acres: null, capex: null, chip: 'GB200',     gpuK: 5,    stage: 8, online: 2026, conf: 'confirmed', status: 'Phase1 가동·26년 풀배치', note: 'GB200 NVL72 64랙·4,608 GPU·>90 EF', src: 'NVIDIA, CNBC' },
  { id: 'au-hyper',   name: '호주 (MS/AWS/NextDC)',       operator: 'Microsoft / AWS / NextDC', region: 'Asia-Pacific',  country: '호주',  city: 'Sydney·Melbourne',   mw: 1500, acres: null, capex: 30,  chip: 'Blackwell', gpuK: null, stage: 5, online: 2027, conf: 'estimate',  status: '~30년 3.1GW로 확대', note: 'MS A$25B+AWS A$20B+OpenAI A$7B', src: 'Microsoft, CNBC' },

  // ── Middle East ───────────────────────────────────────────────────────────────
  { id: 'stargate-uae', name: 'UAE-US AI Campus / Stargate UAE', operator: 'G42 / OpenAI·Oracle', region: 'Middle East', country: 'UAE', city: 'Abu Dhabi',        mw: 5000, acres: 6400, capex: null, chip: 'GB300',    gpuK: 35,   stage: 4, online: 2026, conf: 'confirmed', status: 'Phase1 1GW 건설·첫 200MW M&E', note: '美 외 최대 캠퍼스·원자력/솔라/가스', src: 'G42, CNBC' },
  { id: 'humain',     name: 'HUMAIN (사우디)',            operator: 'HUMAIN (PIF)',             region: 'Middle East',   country: '사우디', city: 'Riyadh·Dammam',     mw: 1900, acres: null, capex: 10,  chip: 'GB300',     gpuK: 18,   stage: 4, online: 2026, conf: 'confirmed', status: '쌍둥이 100MW 착공·Q2 26 가동', note: '→30년 1.9GW·3년내 60만 시스템 목표', src: 'NVIDIA, DCD' },
  { id: 'aws-humain', name: 'AWS·HUMAIN AI Zone',        operator: 'AWS / HUMAIN',             region: 'Middle East',   country: '사우디', city: 'Riyadh',            mw: 320,  acres: null, capex: 5,   chip: 'Trainium2', gpuK: 150,  stage: 5, online: 2026, conf: 'estimate',  status: '26년 가동', note: 'GB300+AWS Trainium 15만 가속기', src: 'BusinessWire, aboutamazon' },
  { id: 'datavolt',   name: 'DataVolt NEOM Oxagon',      operator: 'DataVolt / NEOM',          region: 'Middle East',   country: '사우디', city: 'NEOM Oxagon',       mw: 1500, acres: null, capex: 5,   chip: 'Blackwell', gpuK: null, stage: 3, online: 2028, conf: 'estimate',  status: '300MW 1차 ~28년', note: '넷제로·100% 재생E 목표', src: 'NEOM, DCD' },

  // ── Europe ──────────────────────────────────────────────────────────────────
  { id: 'stargate-uk', name: 'Stargate UK',              operator: 'Nscale / OpenAI',          region: 'Europe',        country: '영국',  city: 'Cobalt Park, NE',    mw: 90,   acres: null, capex: null, chip: 'Blackwell', gpuK: 31,   stage: 7, online: 2026, conf: 'estimate',  status: '1차 GPU 26년 초 설치·8k→31k', note: 'AI Growth Zone(NE England)', src: 'Nscale, GOV.UK' },
  { id: 'loughton',   name: 'Nscale Loughton',           operator: 'Nscale / Microsoft',       region: 'Europe',        country: '영국',  city: 'Loughton, Essex',    mw: 90,   acres: null, capex: null, chip: 'GB300',     gpuK: 23,   stage: 4, online: 2027, conf: 'confirmed', status: '50→90MW·Q1 27 GPU 인도', note: '英 최대 AI 슈퍼컴 (예정)', src: 'Nscale, DCD' },
  { id: 'northumb',   name: 'Blackstone Northumberland', operator: 'Blackstone / QTS',         region: 'Europe',        country: '영국',  city: 'Cambois, NE',        mw: 400,  acres: null, capex: 12,  chip: 'GB300',     gpuK: null, stage: 3, online: 2028, conf: 'estimate',  status: 'AI Growth Zone 지정(25-09)', note: '£10B·MW 비확정', src: 'GOV.UK, DCD' },
  { id: 'stargate-no', name: 'Stargate Norway',          operator: 'Nscale·Aker / Microsoft',  region: 'Europe',        country: '노르웨이', city: 'Narvik',           mw: 520,  acres: null, capex: 1,   chip: 'Blackwell', gpuK: 100,  stage: 5, online: 2026, conf: 'confirmed', status: '230→520MW·26년말 10만 GPU', note: 'OpenAI 이탈→MS 인수(26-04)·100% 수력', src: 'Nscale, CNBC' },
  { id: 'mgx-fr',     name: 'MGX·Mistral France 캠퍼스',  operator: 'MGX / Mistral / NVIDIA',   region: 'Europe',        country: '프랑스', city: 'Paris region',      mw: 1400, acres: null, capex: 9.2, chip: 'Blackwell', gpuK: null, stage: 2, online: 2028, conf: 'confirmed', status: 'JV(25-05)·H2 26 착공·28년 가동', note: '유럽 최대 AI 캠퍼스·EDF 원자력', src: 'MGX, DCD' },
  { id: 'mistral-pa', name: 'Mistral Paris DC',          operator: 'Mistral AI',               region: 'Europe',        country: '프랑스', city: 'Bruyères-le-Châtel', mw: 44,  acres: null, capex: 0.83, chip: 'GB300',    gpuK: 14,   stage: 7, online: 2026, conf: 'confirmed', status: '13,800 GB300 설치·Q2 26 가동', note: '27년말 유럽 200MW 목표', src: 'TechCrunch, DCD' },
  { id: 'dt-munich',  name: 'DT Industrial AI Cloud',    operator: 'Deutsche Telekom / NVIDIA', region: 'Europe',       country: '독일',  city: 'Munich',             mw: 60,   acres: null, capex: 1.08, chip: 'Blackwell', gpuK: 10,  stage: 9, online: 2026, conf: 'confirmed', status: '가동(Q1 26)', note: '독일 첫 산업 AI 팩토리·기가팩토리 전초', src: 'DT, NVIDIA' },
  { id: 'nebius-fi',  name: 'Nebius Polarnode',          operator: 'Nebius (Meta 앵커)',        region: 'Europe',        country: '핀란드', city: 'Lappeenranta',      mw: 310,  acres: null, capex: 10,  chip: 'Blackwell', gpuK: null, stage: 3, online: 2027, conf: 'confirmed', status: '발표(26-03)·27년 1차 인도', note: 'Meta $27B 컴퓨트 약정 앵커', src: 'Nebius, CNBC' },
  { id: 'sines-pt',   name: 'Nscale Start Campus Sines',  operator: 'Nscale / Microsoft',      region: 'Europe',        country: '포르투갈', city: 'Sines',           mw: 1200, acres: null, capex: 10,  chip: 'Rubin',     gpuK: 66,   stage: 5, online: 2027, conf: 'confirmed', status: '1.2GW 인허가·66k Rubin', note: 'MS $10B·남유럽 최대급', src: 'Nscale, TechCrunch' },
]

// ─────────────────────────────────────────────────────────────────────────────
// 4. 집계 헬퍼 (컴포넌트에서 useMemo로 호출)
// ─────────────────────────────────────────────────────────────────────────────
export const REGION_ORDER = ['North America', 'Asia-Pacific', 'Middle East', 'Europe']
export const REGION_LABEL = {
  'North America': '북미',
  'Asia-Pacific':  '아시아·태평양',
  'Middle East':   '중동',
  'Europe':        '유럽',
}
export const REGION_COLOR = {
  'North America': '#3b82f6',
  'Asia-Pacific':  '#10b981',
  'Middle East':   '#f59e0b',
  'Europe':        '#8b5cf6',
}

// 단계별 집계 (프로젝트 수 + 용량 합)
export function aggByStage(dcs = DATA_CENTERS) {
  return DC_STAGES.map(s => {
    const inStage = dcs.filter(d => d.stage === s.id)
    return {
      ...s,
      count: inStage.length,
      mw: inStage.reduce((a, d) => a + (d.mw || 0), 0),
      gw: inStage.reduce((a, d) => a + (d.mw || 0), 0) / 1000,
    }
  })
}

// 국가별 집계 (용량 내림차순)
export function aggByCountry(dcs = DATA_CENTERS) {
  const m = {}
  for (const d of dcs) {
    if (!m[d.country]) m[d.country] = { country: d.country, region: d.region, count: 0, mw: 0 }
    m[d.country].count += 1
    m[d.country].mw += d.mw || 0
  }
  return Object.values(m).map(x => ({ ...x, gw: x.mw / 1000 })).sort((a, b) => b.mw - a.mw)
}

// 권역별 집계
export function aggByRegion(dcs = DATA_CENTERS) {
  return REGION_ORDER.map(r => {
    const inR = dcs.filter(d => d.region === r)
    const mw = inR.reduce((a, d) => a + (d.mw || 0), 0)
    return { region: r, label: REGION_LABEL[r], color: REGION_COLOR[r], count: inR.length, mw, gw: mw / 1000 }
  })
}

// 연도별 1차 가동 신규 용량 + 누적 + 함의 메모리 수요 (Blackwell·GB300 시나리오)
//   - newGw / cumGw: 연도별 신규 vs 누적 가동 용량
//   - 누적(cum*): 설치 기반(installed base) — 1회성 충전 HBM 총량
//   - 신규(new*): 그 해 증분 수요 — 연간 HBM TAM과 비교 가능한 값
export function forecastByYear(dcs = DATA_CENTERS, years = [2025, 2026, 2027, 2028]) {
  let cumMw = 0
  return years.map(y => {
    const newMw = dcs.filter(d => d.online === y).reduce((a, d) => a + (d.mw || 0), 0)
    cumMw += newMw
    const cumBase = impliedMemory(cumMw, DC_CONVERSION.hbmGbPerGpuBlackwell)
    const cumUltra = impliedMemory(cumMw, DC_CONVERSION.hbmGbPerGpuUltra)
    const newBase = impliedMemory(newMw, DC_CONVERSION.hbmGbPerGpuBlackwell)
    const newUltra = impliedMemory(newMw, DC_CONVERSION.hbmGbPerGpuUltra)
    return {
      year: String(y),
      newGw: +(newMw / 1000).toFixed(2),
      cumGw: +(cumMw / 1000).toFixed(2),
      // 누적 설치 기반
      hbmPbBase: Math.round(cumBase.hbmPb),
      hbmPbUltra: Math.round(cumUltra.hbmPb),
      sysDramPb: Math.round(cumBase.sysDramPb),
      // 연간 증분 HBM 수요 ($B) — 연간 TAM과 비교
      hbmUsdBNewBase: +newBase.hbmUsdB.toFixed(1),
      hbmUsdBNewUltra: +newUltra.hbmUsdB.toFixed(1),
    }
  })
}

// 전체 추적 파이프라인 요약
export function pipelineSummary(dcs = DATA_CENTERS) {
  const totalMw = dcs.reduce((a, d) => a + (d.mw || 0), 0)
  const operational = dcs.filter(d => d.stage === 9)
  const underConstruction = dcs.filter(d => d.stage >= 3 && d.stage <= 8)
  const earlyStage = dcs.filter(d => d.stage <= 2)
  const memBase = impliedMemory(totalMw, DC_CONVERSION.hbmGbPerGpuBlackwell)
  const memUltra = impliedMemory(totalMw, DC_CONVERSION.hbmGbPerGpuUltra)
  return {
    count: dcs.length,
    totalGw: +(totalMw / 1000).toFixed(1),
    operationalGw: +(operational.reduce((a, d) => a + d.mw, 0) / 1000).toFixed(1),
    constructionGw: +(underConstruction.reduce((a, d) => a + d.mw, 0) / 1000).toFixed(1),
    earlyGw: +(earlyStage.reduce((a, d) => a + d.mw, 0) / 1000).toFixed(1),
    countries: new Set(dcs.map(d => d.country)).size,
    totalGpuM: +(totalMw * DC_CONVERSION.gpuPerMw / 1e6).toFixed(2),
    hbmExaBase: +(memBase.hbmPb / 1000).toFixed(2),    // EB
    hbmExaUltra: +(memUltra.hbmPb / 1000).toFixed(2),  // EB
    hbmUsdBBase: Math.round(memBase.hbmUsdB),
    hbmUsdBUltra: Math.round(memUltra.hbmUsdB),
    sysDramExa: +(memBase.sysDramPb / 1000).toFixed(2),
  }
}
