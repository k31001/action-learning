// CMO 통합 매트릭스 — 1~3차 다운턴(관측) + 4차(예측)를 하나의 데이터셋으로
// 단일 소스: wiki/storyline/cmo-matrix.md. 수치·판정 변경은 위키 먼저.
//
// 축 정의
//   downturn : d1(2007~09) · d2(2010~13) · d19(2018 Q4~2019) · d3(2022~23) · d4(2028~29 예측)
//              — 1·2·3차 번호 체계는 리포지토리 전반의 확립 표기라 유지. 2019는 번호 없이 연도로 표기
//   phase    : prep(대비 — 다운턴 오기 전) · response(대응 — 다운턴 기간 중)
//              d4는 recommend(추천 전략) · mistake(예상되는 흔한 실수)
//   product  : DRAM · NAND · SSD·UFS · 공통
//   context  : 제조 · 투자 · 개발 · 제품 · 운영   (C — 5관점 공통 컨텍스트)
//   verdict  : clear(◎ 효과 분명) · partial(△ 조건부·부분) · adverse(✕ 역효과·불발)
//              d4는 causes{demand,supply,shift}로 원인별 판정을 분리한다.

export const CMO_DOWNTURNS = [
  { id: 'd1', short: '1차', label: '1차 치킨게임 (2007~09)', prepWindow: '대비기 2005~2007 H1', color: '#FF3B30' },
  { id: 'd2', short: '2차', label: '2차 치킨게임 (2010~13)', prepWindow: '대비기 2009 H2~2010', color: '#FF9500' },
  { id: 'd19', short: '2019', label: '2019 다운사이클 (2018 Q4~2019)', prepWindow: '대비기 2017~2018', color: '#30B0C7' },
  { id: 'd3', short: '3차', label: '다운사이클 (2022~23)', prepWindow: '대비기 2020~2022 H1', color: '#AF52DE' },
  { id: 'd4', short: '4차', label: '다음 다운사이클 (2028~29 예측)', prepWindow: '대비 창 = 지금(2026~27)', color: '#007AFF', forecast: true },
]

export const CMO_PHASES = [
  { id: 'prep', label: '대비', desc: '다운턴이 오기 전(호황 말기)에 수행한 액션' },
  { id: 'response', label: '대응', desc: '다운턴 기간 중에 수행한 액션' },
  { id: 'recommend', label: '추천', desc: '다음 다운턴에 권고되는 액션 (예측)' },
  { id: 'mistake', label: '실수', desc: '반복될 가능성이 높은 오류 패턴 (예측)' },
]

export const CMO_PRODUCTS = ['DRAM', 'NAND', 'SSD·UFS', '공통']

export const CMO_CONTEXTS = [
  { id: '제조', desc: '팹·라인·공정 전환·캐파 가동률·감산' },
  { id: '투자', desc: 'CapEx 규모·신규 팹·M&A·지분투자' },
  { id: '개발', desc: 'R&D 지출·차세대 기술·신공정·표준화' },
  { id: '제품', desc: '제품 믹스·신제품·포트폴리오·고부가 전환' },
  { id: '운영', desc: '조직·인력·재고·계약/영업 구조·가격 정책' },
]

export const CMO_VERDICTS = [
  { id: 'clear', mark: '◎', label: '효과 분명', tone: 'bg-emerald-600 text-white' },
  { id: 'partial', mark: '△', label: '조건부·부분', tone: 'bg-amber-100 text-amber-900' },
  { id: 'adverse', mark: '✕', label: '역효과·불발', tone: 'bg-red-100 text-red-800' },
]

// 대비 액션의 성격 — 다운턴을 겨냥한 것인가, 호황 성장이 대비기에 걸친 것인가
//   intent : 다운턴 대비 (의도 자체가 다가올 하강 국면에 대한 포지셔닝)
//   effect : 결과적 대비 (의도는 경쟁력·수요 추종이나, 다운턴에서 생존 메커니즘으로 발화)
//   growth : 호황 성장 (다운턴 대비 아님 — 대비기에 실행됐을 뿐)
export const CMO_PREP_TYPES = [
  { id: 'intent', label: '다운턴 대비', desc: '의도 자체가 다가올 하강 국면에 대한 포지셔닝 — 절제·바닥·버퍼·규율', tone: 'bg-blue-600 text-white' },
  { id: 'effect', label: '결과적 대비', desc: '의도는 경쟁력·수요 추종이었으나 다운턴에서 생존 메커니즘으로 발화한 것', tone: 'bg-sky-100 text-sky-800' },
  { id: 'growth', label: '호황 성장', desc: '다운턴 대비가 아님 — 호황 수요 대응·사업 확장이 대비기에 실행된 것', tone: 'bg-zinc-200 text-zinc-600' },
]

// 4차 다운사이클의 원인 3종 — 예측 엔트리의 O는 원인별로 갈린다
export const CMO_CAUSES = [
  { id: 'demand', mark: '①', label: '수요발', desc: 'AI 투자수익률(CAPEX/ROI) 재평가 — 병목 모델 하방 민감도 -31.5%, "꼭짓점은 FCF"', trigger: '빅테크 FCF 반전 · CapEx 25%+ 삭감 · GPU 임대가 6개월 -35%', scenario: 'C·D (~29%)' },
  { id: 'supply', mark: '②', label: '공급발', desc: '2028~29 신규 캐파 동시 도래(마이크론 Idaho·SK 용인·한국 팹 2+2) + CXMT 캐파 15% 접근 — 수요 유지에도 과잉', trigger: '경쟁사 증설 공시 · 재고일수 · DRAM 계약가 감속 지속', scenario: 'A·B 내 조정' },
  { id: 'shift', mark: '③', label: '전환발', desc: '3D DRAM·CXL·zHBM 채택 개시로 HBM 스택 수요 이동 — 부분적·비동기 다운턴', trigger: '3D DRAM 전력 50% 개선 입증 · 빅테크 커스텀 칩 CXL/3D 채택', scenario: 'E (5~10%)' },
]

// ─────────────────────────────────────────────────────────────────────────────
// 통찰 — wiki/storyline/cmo-matrix.md §5 "이 매트릭스에서 읽히는 것" 미러
// ─────────────────────────────────────────────────────────────────────────────
export const CMO_INSIGHTS = [
  {
    id: 0,
    title: '대비기 절제는 1차에서만 있었다',
    text: '2007-01 CapEx -18% 삭감은 "삼성 = 항상 역사이클 확대"라는 통설의 반례이며, 2·3차 대비기에는 붕괴 직전까지 증액했다. 특히 3차는 수요 절벽 6개월 전에 450조 5년 계획을 공표해 이후 조정의 자유도를 스스로 좁혔다. 절제의 형태도 다르다 — 1차는 "개발은 선행하되 양산 투입은 이연"이라는 배합이었고, 3차는 "캐파는 늘리고 판매만 조이는" 비대칭이었다.',
  },
  {
    id: 1,
    title: '효과가 분명했던 액션의 관점 편중',
    text: '◎ 판정은 개발·투자에 몰려 있고(공정 세대 선행, 역사이클 증설, R&D 하한), 제조(감산·가동률) 축에서는 무감산이 1차·2019에서 ◎, 3차에서 ✕로 갈렸다 — 같은 액션의 운명이 맥락에 따라 세 번 다 달랐다. 제조 축의 교범은 맥락 의존성이 가장 크다.',
  },
  {
    id: 2,
    title: '무행동이 만든 손실이 행동의 실패보다 크다',
    text: '✕·△ 중 상당수가 무행동이다(HBM 후순위, 엘피다 불참, 조직 무대응). 다운턴 전략의 실패는 대개 "잘못한 것"이 아니라 "안 한 것"에서 온다.',
  },
  {
    id: 3,
    title: '삼성은 "다운턴 중 니치 육성"에 성공한 역사를 이미 갖고 있다',
    text: '초판의 "SSD·UFS 축은 HDD 매각 한 건뿐"은 조사 공백이었다. 재조사 결과 2차 다운턴(2010~13) 한복판에서 소비자 SSD를 풀 자체화(830)→세계 최초 TLC(840)→V-NAND 최초 양산으로 니치에서 2013 전체 SSD 1위(28.5%)까지 육성한 ◎급 선례가 있었다. 즉 3차의 HBM 니치 배제(✕)는 "삼성은 원래 니치를 못 키운다"가 아니라 같은 회사가 이미 성공했던 플레이북을 실행하지 않은 것이다 — AI SSD(SCADA) 니치 대응의 벤치마크는 SK·Kioxia가 아니라 2012년의 삼성 자신이다. 남은 진짜 공백은 SLC 초고 IOPS AI SSD 트랙 하나다.',
    refs: 'sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md',
  },
  {
    id: 4,
    title: '대비 국면이 대응의 선택지를 결정한다',
    text: '2019년 HBM팀 축소가 2022~23의 출발 위치가 됐듯, 지금(2026~27)의 계약 커버리지·옵션 캐파 비율·별동대 진척이 2028~29의 C가 된다. 4차 추천 전략에서 대비 항목이 대응 항목보다 많은 이유다.',
  },
  {
    id: 5,
    title: '계약 바닥은 삼성에게 완전히 새로운 메커니즘이 아니다',
    text: '2005-11 Apple NAND 장기공급계약(선급 총 $1.25B, 5개사)에서 삼성은 이미 선급 LTA의 공급자 당사자였다. 4차 추천 1순위(계약 바닥)는 없던 능력을 새로 만드는 일이 아니라, 20년 전 개별 계약으로 했던 것을 전사 커버리지 정책으로 제도화하는 일이다 — 실행 난이도의 성격이 달라진다.',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 6,
    title: '대비기 액션의 71%는 다운턴 대비가 아니었다',
    text: '28건 중 다운턴을 겨냥한 의도적 대비는 8건(29%)뿐이고, 13건은 호황 성장, 7건은 결과적 대비였다(2019 대비기 3건 추가 반영). 다운턴 대비를 문제로 삼는다면 참고할 사내 선례의 모수 자체가 작다는 것이 출발점이다.',
  },
  {
    id: 7,
    title: '무행동은 대비 국면에서 더 치명적이다',
    text: '대응 국면의 ✕는 3건(3차 무감산·HBM 후순위, 2019 HBM팀 축소)이지만, 대비 국면의 ✕는 3차에서만 4건(CapEx 무절제·450조 공표·HBM 조직 부재·재고 방치)에 2019의 재고·경보 무행동까지 5건이다. 그중 셋(HBM 조직 부재, 재고 방치 2회)은 무행동이다 — 다운턴이 오기 전의 무행동이 다운턴 중의 선택지를 지운다.',
  },
  {
    id: 8,
    title: '전환발(③) 다운턴의 O를 가르는 것은 "전환기 플레이북"의 실행 여부다',
    text: '시장 전환기 재조사 결과, 삼성이 PC→모바일·모바일→데이터센터 두 전환에서 반복한 승리 공식은 4요소였다: ①레거시 exit+판로 심기(2011 HDD 매각에 NAND 크로스-서플라이 조항 동반), ②자기잠식형 표준 창설(eMMC 지배자가 UFS 주도), ③수요 폭발 3~5년 전 전용 캐파 베팅(시안 V-NAND), ④인터페이스 세대 선점(XS1715 — 업계 최초 NVMe, Intel보다 1년 선행). 반례도 같은 조사에서 나왔다 — NVMe 규격을 설계한 Intel은 제품화 1년 후행 + 자기 생태계 없는 차세대 베팅(Optane, 2022 청산)으로 데이터센터 전환의 승자 자리를 내줬다. 규격·기술을 가진 쪽이 아니라 플레이북을 완주한 쪽이 이긴다 — 4차의 전환발 시나리오(3D DRAM·CXL·zHBM)에서 D6·RS-9 계열 대비책의 판정 기준으로 쓸 수 있는 관측 선례다.',
    refs: 'sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md',
  },
  {
    id: 9,
    title: '2019가 채운 표본 — 같은 액션의 세 번째 운명, 두 번 반복된 무행동',
    text: '2019 다운사이클(2018 Q4~2019)을 추가하면서 무감산은 세 개의 데이터 포인트를 갖게 됐다 — 1차 ◎(소모전: 대칭 6강에서 퇴출 유도), 2019 ◎(무임승차: Micron·SK가 감산하고 요카이치 정전이 공급을 조이는 동안 1위가 버티며 점유 흡수 — 1Q20 DRAM 44.1%), 3차 ✕(불발: 퇴출 후보 없는 3강에서 자멸). 제조 축 교범의 맥락 의존성(통찰 1)이 표본 3개로 실증된 것이다. 재고·경보 무행동도 2018(✕)과 2021(✕) 두 사이클 연속 반복됐다 — "신호는 있었으나 배선이 없었다"가 일회성 실수가 아니라 구조 패턴이라는 확인이며, EWI 트리거 사전 배선(RS-9·DP-4)의 가장 강한 근거다. 그리고 2019는 같은 해에 HBM2E Flashbolt를 발표하면서 HBM 전담 조직을 축소했다 — 제품 로드맵과 조직 배선의 불일치는 니치 상실의 초기 신호로, 4차 EWI에 "로드맵-조직 정합" 점검이 들어가야 하는 이유다.',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// 엔트리 — action(M) · mechanism(그 액션이 작동시킨 인과 경로) · outcome(O) · verdict
// ─────────────────────────────────────────────────────────────────────────────
export const CMO_ENTRIES = [
  // ══ 1차 다운턴 (2007~09) · 대응 ═════════════════════════════════════════
  {
    id: 'd1-res-01', downturn: 'd1', phase: 'response', product: '공통', context: '제조',
    action: '무감산 버티기 (감산 공식화 없음)',
    mechanism: '소모전 — 체력 열위 경기자 퇴출 유도',
    outcome: '6강 대칭·전원 이윤극대화 구조였으므로 소모전 완전 발화 → 키몬다 누적손실 $30억·2009-01 파산, 퇴출 직후 현물가 급등. 버티기 비용도 즉시 노출 — 2008 Q4 전사 첫 분기 적자 -0.94조·반도체 -0.56조(OPM -14%, 경쟁사 -40% 이하 대비 우위)',
    verdict: 'clear',
    refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd1-res-02', downturn: 'd1', phase: 'response', product: 'DRAM', context: '개발',
    action: '40nm급 공정 선행 (2009-02 업계 최초 검증 → 2009-07 세계 최초 40nm급 2Gb DDR3 양산)',
    mechanism: '원가 격차 확대 — 다운턴 중 기술 전환',
    outcome: '원가=점유율의 범용재 맥락이었으므로 발화 → 50nm급 대비 생산성 +60%·전력 -30%. 가격 붕괴 국면에서 원가 격차가 경쟁사 퇴출 압력을 가속',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd1-res-03', downturn: 'd1', phase: 'response', product: '공통', context: '운영',
    action: '조직 통합 (2009-01 DS/DMC 2부문 체제·LCD총괄 폐지·임원 연봉 -20%)',
    mechanism: '위기를 구조 재편의 창으로 사용',
    outcome: '금융위기 수요 충격(전사 첫 분기 적자)이 재편 명분을 만들었으므로 발화 → 이듬해 2009 연결 매출 136.3조·영업이익 10.9조로 위기 이듬해 사상 최대급 실적',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd1-res-04', downturn: 'd1', phase: 'response', product: 'NAND', context: '투자',
    action: 'SanDisk 인수 시도 → 철회 ($5.85B·$26/주 제안 2008-09 → 2008-10-22 철회)',
    mechanism: '다운턴 저가 매수 + 가격 규율',
    outcome: '금융위기 자산가격 붕괴로 매수 창이 열려 부분 발화했으나, SanDisk Q3 영업손실 $250M·손실 확대 전망을 사유로 자진 철회 → 인수 불발. 다운턴 M&A에서 가격 규율을 지킨 사내 선례로 남음',
    verdict: 'partial',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd1-res-05', downturn: 'd1', phase: 'response', product: 'DRAM', context: '투자',
    action: '경쟁사 퇴출 확인 직후 역사이클 증설 (2010 메모리 시설투자 5.5조→9조 상향, 반도체 12.7조·전사 21.6조)',
    mechanism: '회복기 점유율 흡수 — 역사이클 캐파',
    outcome: '캐파=점유율 맥락 + 키몬다 퇴출 확인(2009-01)이 투입 타이밍 트리거로 작동 → 회복기 점유율 흡수. 경쟁사는 2008~09 투자 삭감으로 회복기 캐파 부재',
    verdict: 'clear',
    refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },

  {
    id: 'd1-res-06', downturn: 'd1', phase: 'response', product: 'SSD·UFS', context: '제품',
    action: 'SSD 밀도 3연타 — 256GB MLC 발표(2008-05, "자체 컨트롤러로 MLC에서 SLC급 성능" 명시)·128GB 양산(2008-07)·256GB 양산(2008-11)',
    mechanism: '다운턴 중 응용처 개척 — NAND 신수요 창출 + 컨트롤러 내재화 축적',
    outcome: 'NAND 가격 폭락의 1차 치킨게임 한복판에서 SSD 최고 밀도 라인업을 계속 출시 — SLC→MLC 전환과 자체 컨트롤러 내재화가 공식 서술에 동시 등장한 기점. 시장이 초기라 당장의 손익 기여는 미미했으나, 이때 축적한 컨트롤러·펌웨어 역량이 2기(830 풀 자체화)의 토대가 됐다',
    verdict: 'partial',
    refs: 'sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md',
  },

  // ══ 2차 다운턴 (2010~13) · 대응 ═════════════════════════════════════════
  {
    id: 'd2-res-02', downturn: 'd2', phase: 'response', product: 'DRAM', context: '개발',
    action: '공정 세대 선행 (30nm급 2010-07 → 20nm급 2011-09 세계 최초)',
    mechanism: '기술 전환 심판대 선점',
    outcome: '"다운턴 중 전환 성패 = 퇴출 순서"라는 맥락이었으므로 발화 → 30nm→20nm급 세계 최초 연속(생산성 2배 이상)으로 심판대 통과',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd2-res-03', downturn: 'd2', phase: 'response', product: 'DRAM', context: '제품',
    action: '모바일 DRAM 전환 (2011 LPDDR2 양산 → 2012-08 세계 최초 2GB LPDDR3)',
    mechanism: '수요 구조 전환 추종 — 제품 믹스 이동',
    outcome: 'PC→모바일 수요 구조 전환이 배분 규칙을 바꾼 맥락에서 발화 → 모바일 세대 선행. 같은 심판대에서 엘피다는 파산 요인에 "PC→모바일 전환 대응 실패"가 명시되며 탈락 — 전환 성패의 양방향 실증',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · sources/articles/dram-chicken-game-history-2026-08-05.md',
  },
  {
    id: 'd2-res-05', downturn: 'd2', phase: 'response', product: 'NAND', context: '투자',
    action: '시안 NAND 팹 다운턴 착공 (2012 발표 $7B → 2012-09 착공 → 2014-05 V-NAND 전용 양산, 1기 누계 $10.87B 후대 집계 병기)',
    mechanism: '리드타임 소화 + 수요 폭발 3~5년 전 전용 캐파 베팅 — 다운턴에 건설, 업사이클에 가동',
    outcome: '다운턴 국면에 건설 기간을 소화해 2014년 NAND 수요 확대기에 V-NAND 전용 캐파로 양산 진입 → 데이터센터 전환의 캐파 기반(2기 $7B는 2017-08-30 슈퍼사이클 정점 직전 발표, 현재 전체 NAND 40%+). 중국 현지 생산 거점 확보로 동서 균형 공급의 토대(현재 MB-2의 자산)이자 전환기 플레이북 요소 3의 원형',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md',
  },
  {
    id: 'd2-res-06', downturn: 'd2', phase: 'response', product: 'SSD·UFS', context: '제품',
    action: 'HDD 사업 매각 (2011-04 Seagate에 $1.375B — 현금 50%+주식 50%: 지분 9.6%·이사회 1석, 같은 계약에 "삼성 NAND→Seagate SSD" 크로스-서플라이 조항 동반, 2011-12 종결)',
    mechanism: '레거시 exit + 판로 심기 — 스토리지를 NAND/SSD로 집중하며 매각 계약에 자사 NAND 판로를 내장',
    outcome: '모바일 전환으로 HDD 수요 구조가 사양화되는 맥락에서 발화 → $1.375B 회수 + Seagate 지분 + 매각과 동시에 자사 NAND의 신규 판로를 계약 구조에 심음(전환기 플레이북 요소 1의 원형). 단 메모리 점유율에의 효과는 간접',
    verdict: 'partial',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md',
  },
  {
    id: 'd2-res-09', downturn: 'd2', phase: 'response', product: 'SSD·UFS', context: '개발',
    action: 'UFS 표준 창설 주도 (JEDEC UFS 1.0 2011-02-24 → 2.0 2013-09-18, MIPI M-PHY·UniPro 협업 — 삼성 임원이 표준 발표 대표 논평자 반복)',
    mechanism: '자기잠식형 표준 창설 — eMMC 지배자가 자기 시장을 대체할 차세대 표준을 주도',
    outcome: 'eMMC 1위(2013년 35.6%, Gartner)를 쥔 상태에서 SSD(SCSI/UAS)식 command queuing을 모바일에 이식한 UFS를 다운턴 중에 주도 → 2015-01 세계 최초 UFS 2.0 양산으로 회수, PC→모바일 전환기의 모바일 스토리지 지배를 표준 계층에서 연장(전환기 플레이북 요소 2의 원형)',
    verdict: 'clear',
    refs: 'sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md',
  },
  {
    id: 'd2-res-10', downturn: 'd2', phase: 'response', product: 'SSD·UFS', context: '개발',
    action: 'XS1715 — 업계 최초 NVMe eSSD (2013-05-31 UNH-IOL NVMe 인증 1호 → 2013-07 공개, 최초 U.2(SFF-8639) 채택, 순차 3,000MB/s·740K IOPS)',
    mechanism: '인터페이스 세대 선점 — SATA→NVMe 전환의 첫 제품을 잡아 데이터센터 전환기의 주도권 확보',
    outcome: 'NVMe 규격을 설계한 Intel보다 제품화 약 1년 선행(Intel 첫 NVMe DC P3700은 2014-Q2) → 모바일→데이터센터 전환기의 인터페이스 주도권 확보, 3Q18 eSSD 매출 38.5% 1위 vs Intel 18.3%로 회수(단 1Q17 출하량 기준 Intel 1위 구간 존재 — 집계 기준별 뉘앙스). 전환기 플레이북 요소 4의 원형 — 최종 승부는 Intel의 자멸(Optane 2022 청산·NAND 매각)로 확정',
    verdict: 'clear',
    refs: 'sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md',
  },
  {
    id: 'd2-res-07', downturn: 'd2', phase: 'response', product: 'DRAM', context: '투자',
    action: '[무행동] 엘피다 입찰 불참 (2012 — 참여 기록 부재)',
    mechanism: '다운턴 저가 매수 불행사',
    outcome: '엘피다 체력 열위(퇴출 임박)로 저가 매수 창이 열렸으나 불발 → 마이크론이 인수해 모바일 DRAM 스케일 + 다사이트 중앙 운영 체계 확보. (+) 6강→3강 압축·공급 규율 유산은 삼성도 공유 / (−) 경쟁자의 스케일 점프 허용 — 등급은 낮은 쪽',
    verdict: 'partial',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · wiki/entities/micron.md',
  },

  {
    id: 'd2-res-08', downturn: 'd2', phase: 'response', product: 'SSD·UFS', context: '제품',
    action: '소비자 SSD 브랜드 구축 — 830 풀 자체화(2011: NAND·컨트롤러 MCX·DRAM·펌웨어 전 컴포넌트 자체) → 840 세계 최초 TLC(2012-10, MDX) → 840 EVO(2013-07, MEX) → V-NAND 세계 최초 양산 + 첫 V-NAND SSD(2013-08)',
    mechanism: '다운턴 중 니치→주류 전환 — 수직통합 완제품으로 부품 다운턴을 우회',
    outcome: '2차 다운턴과 정면 중첩된 4년간 소비자 SSD를 니치에서 1위 사업으로 육성 → 2013 전체 SSD 점유 28.5% 1위(Gartner), 850 PRO(2014)로 V-NAND 소비자 시장까지 선점. 다운턴 중 저원가 TLC로 가격대를 끌어내려 시장 자체를 키웠다 — 3차 다운턴의 HBM 니치 배제(✕)와 정반대의, "다운턴 중 니치 육성"이 성공한 사내 최대 선례',
    verdict: 'clear',
    refs: 'sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md',
  },

  // ══ 2019 다운사이클 (2018 Q4~2019) · 대응 ═══════════════════════════════
  {
    id: 'd19-res-01', downturn: 'd19', phase: 'response', product: '공통', context: '제조',
    action: '무감산 공식 기조 유지 — "현재 인위적인 웨이퍼 투입 감소는 검토하고 있지 않다"(2Q19 컨콜 2019-07-31) + 12라인 플래너 낸드 캐파 일부 R&D 용도 전환',
    mechanism: '무임승차형 버티기 — 후발 감산·사고 감소분 위에서 빗 점유율 방어',
    outcome: 'Micron(2019-03 DRAM·NAND 웨이퍼 각 5% 감축 → 6월 NAND 10% 확대)·SK하이닉스(2019-07 NAND 웨이퍼 15%+ 축소·4Q19 D램 캐파 축소)·요카이치 정전(2019-06, 3Q19 NAND 공급 ~17% 감소)이 공급을 조이는 맥락에서 발화 → 4Q19 출하 증가로 매출 보합 방어, 1Q20 DRAM 점유 44.1%. 무감산의 세 번째 데이터 포인트 — 1차 ◎(소모전)·2019 ◎(무임승차)·3차 ✕(불발): 같은 액션, 세 가지 운명',
    verdict: 'clear',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-res-02', downturn: 'd19', phase: 'response', product: '공통', context: '투자',
    action: 'CapEx 삭감 없이 유지 (2019 반도체 22.6조 — 반도체 영업이익 -69%(14.02조) 국면에서 전년 유사 수준)',
    mechanism: '재무 체력 기반 역사이클 유지',
    outcome: '경쟁사가 삭감하는 동안(Micron FY19 $10.5B→$9B, SK 2020 상당폭 축소 방향) 유지 → Counterpoint "지속 투자가 2020 반등기 선도 지위를 강화" 평가, 2020 COVID발 서버·클라우드 반등기를 온전한 캐파로 흡수',
    verdict: 'clear',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-res-03', downturn: 'd19', phase: 'response', product: '공통', context: '개발',
    action: '기술 세대 전환 완주 — 1z DRAM 세계 최초 개발(2019-03-21)·6세대 136단 V낸드 양산(2019-08)·HBM2E Flashbolt 발표(2019-03 GTC)·EUV D1x 준비(→2020-03 100만 모듈 출하)',
    mechanism: '다운턴 중 기술 전환 — 1·2차 ◎ 패턴의 반복',
    outcome: '이익 -69% 국면에서도 DRAM·NAND·HBM·EUV 네 축의 세대 전환을 모두 완주 → 2020~21 상승기 원가·세대 우위로 회수. 단 같은 해 HBM 전담 조직은 축소 — 제품 발표(Flashbolt)와 조직 배선의 불일치가 병존',
    verdict: 'clear',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-res-04', downturn: 'd19', phase: 'response', product: 'DRAM', context: '운영',
    action: '[무행동] HBM 전담팀 축소 (2019 — "니치에 머물 것" 판단, 자원을 범용 DRAM에 재배치)',
    mechanism: '주력 논리에 의한 니치 배제',
    outcome: '당장의 비용 절감 효과는 미미했고, 3차 다운턴의 출발 위치(C)를 만든 결정이 됐다 — HBM 40%→17%·33년 만의 DRAM 역전의 기점(CNBC 사후 지목). 같은 해 SK는 반대로 HBM 베팅을 늘림. "한 다운턴의 M이 다음 다운턴의 C가 된다"는 순환의 원형 사례',
    verdict: 'adverse',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-res-05', downturn: 'd19', phase: 'response', product: '공통', context: '투자',
    action: '반도체 비전 2030 선언 (2019-04-24 — 시스템반도체 133조: R&D 73조+인프라 60조, 전문인력 15,000명, 1Q19 실적 발표 직전 주)',
    mechanism: '다운턴 중 포트폴리오 다각화 베팅 — 사이클 외부 축 개설',
    outcome: '메모리 이익이 반토막 이하로 떨어지던 한복판에 비메모리 초장기 베팅을 공표 — 파운드리 확장으로 계승(2021-05 171조 증액). 단 메모리 사이클 대응으로서의 효과는 간접 — 2차 대비기의 5대 신수종(△)과 같은 계열',
    verdict: 'partial',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-res-06', downturn: 'd19', phase: 'response', product: '공통', context: '운영',
    action: '일본 수출규제 대응 (2019-07 불화수소·EUV 레지스트·폴리이미드 규제 → 공급처 다변화, JSR-imec 벨기에산 레지스트 우회 확보, 국산화 착수)',
    mechanism: '공급망 이원화 — 외생 충격의 구조화 대응',
    outcome: '다운턴+지정학 이중 충격에서 생산 차질 없이 통과 → 소재 국산화(솔브레인 2020-01·SK머티리얼즈 2020-06·동진쎄미켐 2021-03)로 구조화, 이후 공급망 리스크 관리의 표준이 된 계기',
    verdict: 'clear',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },

  // ══ 3차 다운턴 (2022~23) · 대응 ═════════════════════════════════════════
  {
    id: 'd3-res-01', downturn: 'd3', phase: 'response', product: '공통', context: '제조',
    action: '"인위적 감산 없다" 선언 → 감산 공식화 선회 (2022-10-27 선언 → 2023-01-31 재확인 → 2023-04-07 "의미 있는 수준" 감산 → 연말 연장)',
    mechanism: '소모전(퇴출 유도) — 6강형 공식의 3강 맥락 재사용',
    outcome: '3강 과점·퇴출 후보 부재 맥락이었으므로 소모전 불발 → 퇴출자 0, Q1 2023 전사 영업이익 0.6조(-96%, 2009년 이후 최악)·DS -4.58조 사상 최대 부문 적자 끝에 삼성 스스로 철회. (+) 범용 점유 방어는 2025~26 회복기 배당으로 / (−) 메커니즘 자체는 불발·자진 철회',
    verdict: 'adverse',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd3-res-02', downturn: 'd3', phase: 'response', product: '공통', context: '투자',
    action: '감산과 분리한 CapEx 역사이클 (2023 전사 53.1조·DS 48.4조 — 사상 최대, 용처는 평택 인프라·HBM·DDR5·EUV·Taylor)',
    mechanism: '재무 요새 기반 역사이클 투자',
    outcome: '현금 요새(~$63B) 맥락이었으므로 발화 → 사상 최대 부문 적자 연도에 CapEx 사상 최대를 동시 집행. 같은 국면에서 SK하이닉스는 적자 -7.7조에 CapEx를 ~10조로 절감 — 생산 감산과 투자를 분리 집행한 것은 3강 중 삼성 단독',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · wiki/entities/sk-hynix.md',
  },
  {
    id: 'd3-res-03', downturn: 'd3', phase: 'response', product: '공통', context: '개발',
    action: 'R&D 역사이클 증액 (2022 24.92조 → 2023 28.34조 사상 최대, 매출 대비 10.9%)',
    mechanism: '다운턴 중 기술 전환 투자 — R&D 하한 사수',
    outcome: '적자 국면에도 R&D를 삭감이 아니라 증액 → 엘피다형 "다운턴 R&D 삭감 → 다음 세대 탈락" 경로를 회피. 단 배분 방향(HBM 후순위)은 별도 항목의 문제',
    verdict: 'clear',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd3-res-04', downturn: 'd3', phase: 'response', product: '공통', context: '투자',
    action: 'Taylor 팹 다운사이클 착공 (2021-11 $17B 발표 → 2022 H1 착공)',
    mechanism: '리드타임 소화',
    outcome: '다운사이클에 착공은 성사됐으나 공정 4nm→2nm 상향·수율·고객 확보 문제로 가동이 당초 2024 H2에서 2026~27로 순연, 총투자 $17B→$37~44B 확대 → "업사이클 시점 가동"의 배당은 미실현',
    verdict: 'partial',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd3-res-05', downturn: 'd3', phase: 'response', product: 'DRAM', context: '제품',
    action: '[무행동] HBM 니치 후순위 자원배분 (2019 HBM팀 축소의 연장 — 다운턴 중 범용 우선)',
    mechanism: '주력 사업 논리에 의한 니치 배제',
    outcome: 'HBM 인증 슬롯이 배분을 결정하는 게임으로 이동 중인 맥락이었으므로 역효과 → HBM 40%(2023)→17%(2025 H1)·33년 만의 DRAM 역전. 수습 액션(2023-09 NVIDIA向 HBM3 공급·2024-04 HBM 전담팀·2024-05 DS부문장 교체)은 전부 다운턴 종료 후. 같은 맥락에서 SK는 방향을 유지해 HBM 57%·OP 47.2조',
    verdict: 'adverse',
    refs: 'wiki/concepts/dram-market-share.md · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · wiki/entities/sk-hynix.md',
  },
  {
    id: 'd3-res-06', downturn: 'd3', phase: 'response', product: 'NAND', context: '제조',
    action: 'NAND 감산 연장·확대 (2023-07-27 연장 + HBM/DDR5 재배치 → 2023-11-09 DRAM 감산 연말까지 → 2024-02 NAND 감산률 50% 유지)',
    mechanism: '공급 규율 — 뒤늦은 감산의 심화',
    outcome: '감산 선회 후에는 NAND에서 가장 깊고 길게 유지(50%) → 재고·가격 정상화에 기여했으나, 선회 자체가 6개월 지연된 뒤의 대응이라 적자 폭 축소 효과는 제한적',
    verdict: 'partial',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd3-res-07', downturn: 'd3', phase: 'response', product: '공통', context: '운영',
    action: '[무행동] 조직 구조 대응 부재 (2022~23 중 사업부 통합·구조조정 기록 없음 — 리더십 교체는 2024-05 사후)',
    mechanism: '1차전형 조직 재편 불행사',
    outcome: '사상 최대 부문 적자 국면이었는데 2009년형 조직 재편은 불발(부재 자체가 기록된 사실) → 위기 신호의 조직 배선 전환이 2024-05 리더십 교체까지 지연. 2009년 A1(◎)과의 대칭 실패',
    verdict: 'partial',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },


  {
    id: 'd3-res-08', downturn: 'd3', phase: 'response', product: 'SSD·UFS', context: '제품',
    action: '플래그십 유지 속 eSSD 매출 급락 — 990 PRO 출시(2022-10, 무감산 선언과 같은 달) / enterprise SSD 매출 1Q23 $801M(QoQ -55%)',
    mechanism: '제품 로드맵 사수 — 단 수요 붕괴에는 무방비 노출',
    outcome: '다운턴 중에도 소비자 플래그십(990 PRO)과 eSSD 로드맵은 유지했으나, 북미 서버 재고 조정으로 enterprise SSD 매출이 1Q23 -55%까지 급락(시장 전체도 2023 H1 반토막) — 계약 바닥이 없는 스토리지 완제품이 다운턴 충격을 가장 직접적으로 받는다는 실증. 회복은 4Q23(+47.6% QoQ)부터',
    verdict: 'partial',
    refs: 'sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md',
  },

  // ══ 1차 다운턴 (2007~09) · 대비 [2005~2007 H1] ══════════════════════════
  {
    id: 'd1-pre-01', downturn: 'd1', phase: 'prep', product: '공통', context: '투자', prepType: 'intent',
    action: 'CapEx 선제 삭감 계획 (2007-01 — 반도체 5.44조 -18%·메모리 4.82조 -17%, 전사 9.7조 -3%)',
    mechanism: '호황 말기 투자 절제 — 고정비 커밋 축소',
    outcome: '세 번의 대비기 중 유일하게 호황 말기에 브레이크를 밟은 사례 — "삼성은 항상 역사이클로 늘린다"는 통설의 반례. 다만 직전까지 오스틴 Fab2($3.5B)·화성 증설이 진행돼 캐파 커밋은 이미 확대된 뒤였고, 2007 Q1 반도체 영업이익은 5,400억으로 이미 반토막 — 브레이크가 늦게 밟혔다',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd1-pre-02', downturn: 'd1', phase: 'prep', product: 'NAND', context: '투자', prepType: 'growth',
    action: '오스틴 Fab2 신설 ($3.5B, 2006-04 착공 → 2007-06 준공, 月 6만 장 목표)',
    mechanism: '호황기 캐파 선제 확보',
    outcome: '가격 붕괴가 시작되는 2007년 중반에 신규 캐파가 도래 — 리드타임상 불가피했으나 결과적으로 다운턴 진입 시점에 고정비가 늘어난 상태였다. NAND 장기 성장 축의 토대라는 상방과, 정점 준공이라는 하방이 공존',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd1-pre-03', downturn: 'd1', phase: 'prep', product: 'DRAM', context: '개발', prepType: 'intent',
    action: '공정 세대 선행 + 양산 이연 (80nm 2006-08 → 60nm 2007-03 세계 최초 / 50nm은 개발 완료하되 양산은 2008로 이연)',
    mechanism: '원가 우위 축적 + 전환 타이밍 절제',
    outcome: '60nm 전환으로 생산성 +40%를 확보한 채 다운턴에 진입 → 2008 Q4 반도체 OPM -14%로, -40% 이하였던 경쟁사 대비 손실률 우위. 개발은 선행하되 양산 투입은 늦춘 배합이 대비기 절제의 실질 형태였다',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd1-pre-04', downturn: 'd1', phase: 'prep', product: 'NAND', context: '개발', prepType: 'effect',
    action: '40nm 32Gb + CTF(Charge Trap Flash) 세계 최초 (2006-09/10, Hwang\'s Law 7세대)',
    mechanism: '차세대 아키텍처 선행',
    outcome: '다운턴 진입 전에 NAND 원가·밀도 리더십을 확보 → 가격 붕괴 국면에서 버틸 원가 여력의 토대. 아키텍처 선행을 호황기에 끝내둔 것이 다음 사이클의 출발 위치를 만들었다',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd1-pre-05', downturn: 'd1', phase: 'prep', product: 'SSD·UFS', context: '제품', prepType: 'growth',
    action: '세계 최초 32GB SSD 탑재 PC (2006-05-24) · 1.8" 64GB SSD 양산 (2007-06)',
    mechanism: '신규 제품 축 개설',
    outcome: '스토리지 완제품 축을 다운턴 이전에 열어둠 — 다만 당시 시장 규모가 미미해 1차 다운턴의 손익에는 실질 기여가 없었다. UFS는 규격 자체가 2011년 제정이라 이 시기 **해당 없음(제품 부재)**',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd1-pre-06', downturn: 'd1', phase: 'prep', product: 'NAND', context: '운영', prepType: 'intent',
    action: 'Apple NAND 장기공급계약 참여 (2005-11-21, 5개사 대상 Apple 선급 총 $1.25B — 삼성 배분액 미확인)',
    mechanism: '계약적 매출 바닥 — 선급 기반 장기 공급',
    outcome: '**삼성이 2005년에 이미 선급 LTA의 공급자 당사자였다는 사내 최초 선례** — "계약 바닥은 2026년의 신규 메커니즘"이라는 정리를 부분적으로 교정한다. 다만 당시 구조는 고객 주도의 개별 계약이었고, 2026년의 take-or-pay·NTB처럼 전사 커버리지 정책으로 제도화되지는 않았다',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },

  // ══ 2차 다운턴 (2010~13) · 대비 [2009 H2~2010] ═════════════════════════
  {
    id: 'd2-pre-01', downturn: 'd2', phase: 'prep', product: 'DRAM', context: '투자', prepType: 'growth',
    action: '화성 Line-16 착공 (2010-05, 총 12조 — 세계 최대 메모리 팹, 2011-08~09 양산)',
    mechanism: '역사이클 캐파 선점 — 다운턴 전 착공, 다운턴 중 가동',
    outcome: '2차 다운턴이 시작되기 직전에 착공해 붕괴 국면에 가동이 도래 → 가동과 동시에 20nm급 DDR3 양산. 같은 국면에서 엘피다는 신규 투자 여력 없이 부채 4,480억 엔으로 파산 — 12조 투입 자체가 소모전 압박으로도 작동했다',
    verdict: 'clear',
    refs: ' · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd2-pre-02', downturn: 'd2', phase: 'prep', product: 'NAND', context: '제조', prepType: 'effect',
    action: '오스틴 팹 메모리→로직 전환 착수 ($3.6B, 2010-06)',
    mechanism: '수요 전환 추종 캐파 재배분',
    outcome: 'PC→모바일 전환기에 맞춰 메모리 캐파 일부를 로직(AP)으로 돌린 선제 재배분 — 2012-08 플래시 생산 종료와 $4B 추가 투자로 이어진다. 메모리 관점에서는 NAND 캐파의 이탈이기도 하며 정량 효과는 미확인',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd2-pre-03', downturn: 'd2', phase: 'prep', product: 'DRAM', context: '개발', prepType: 'effect',
    action: '공정 세대 선행 (40nm 2009-07 → 30nm 2010-07 세계 최초)',
    mechanism: '기술 전환 심판대 사전 통과',
    outcome: '2차 다운턴의 심판대(전환 성패가 퇴출 순서를 결정)를 대비기에 미리 통과 → 다운턴 중 20nm급 선행으로 연결. 엘피다는 같은 심판대에서 탈락',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd2-pre-04', downturn: 'd2', phase: 'prep', product: 'NAND', context: '개발', prepType: 'effect',
    action: 'NAND 미세화 선행 (20nm급 32Gb 2010-04 → 64Gb 3bit 2010-10, Toggle DDR 1.0)',
    mechanism: '원가·밀도 리더십 축적',
    outcome: '다운턴 진입 전에 NAND 세대 우위를 확보 → 가격 하락기에도 원가 여력 유지. 대비기 개발 선행이 두 제품(DRAM·NAND)에서 동시에 이뤄진 유일한 기간',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd2-pre-05', downturn: 'd2', phase: 'prep', product: '공통', context: '투자', prepType: 'growth',
    action: '2011년 투자계획 증액 (총 47.8조 +12%·반도체 15조·채용 2.6만)',
    mechanism: '호황 지속 전제의 확대 편성',
    outcome: '2차 붕괴 직전 해에 증액을 편성 — 결과적으로 다운턴 국면에 신규 캐파·고정비가 도래했다. 다만 그 캐파가 체력 열위 경기자(엘피다·대만 진영)의 퇴출을 앞당긴 소모전 압박으로도 작동해 상·하방이 공존',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd2-pre-06', downturn: 'd2', phase: 'prep', product: '공통', context: '투자', prepType: 'intent',
    action: '5대 신수종사업 발표 (23.3조/10년, 2010-05-11 — 태양광·자동차전지·LED·바이오·의료기기)',
    mechanism: '사이클 외부 다각화 — 변동성 분산',
    outcome: '메모리 사이클과 상관이 낮은 축으로 변동성을 분산하려는 시도. 개별 사업의 후속 성과는 본 조사 범위 밖이나, 다운턴 손익을 상쇄할 규모로 성장한 축은 이 시기 기준으로 확인되지 않는다',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd2-pre-07', downturn: 'd2', phase: 'prep', product: 'SSD·UFS', context: '제품', prepType: 'growth',
    action: '첫 브랜드 소비자 SSD 470 소매 출시 (2010-08, 64/128/256GB)',
    mechanism: '신규 채널·제품 축 확장',
    outcome: 'B2B 공급을 넘어 브랜드 완제품 채널을 다운턴 전에 개설 — 단 규모상 2차 다운턴 손익에 실질 기여는 확인되지 않는다. 1~3차를 통틀어 SSD·UFS 축의 대비 액션은 이 시기가 사실상 두 번째',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },

  // ══ 3차 다운턴 (2022~23) · 대비 [2020~2022 H1] ═════════════════════════
  // ══ 2019 다운사이클 · 대비 (2017~2018) ═══════════════════════════════════
  {
    id: 'd19-pre-01', downturn: 'd19', phase: 'prep', product: '공통', context: '투자', prepType: 'growth',
    action: '정점 확장 연쇄 — 2017 반도체 CapEx 27.3조 사상 최대 · 평택 P1 가동+37조 투자 발표(2017-07) · P2 착공(2018-01, 30조+) · 시안 2기 발표(2017-08)',
    mechanism: '호황 정점의 캐파 확장 — 슈퍼사이클 지속 전제',
    outcome: '확장 캐파와 2018년 말 재고 고점이 4Q18 수요 절벽(DRAM 매출 QoQ -18.3%)과 충돌해 2019 DRAM -37~38%의 낙폭을 키웠으나, 같은 캐파가 2020 반등기 흡수 자산이 되기도 했다 — 3차 대비기 CapEx 무절제(✕)의 예고편이자 양날',
    verdict: 'partial',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-pre-02', downturn: 'd19', phase: 'prep', product: '공통', context: '운영', prepType: 'growth',
    action: '주주환원 3년 고정 약정 (2017-10-31 — 2018~2020 배당 9.6조 원/년, FCF 최소 50% 환원)',
    mechanism: '정점 자본배분의 경직화 — 하방 유연성 사전 축소',
    outcome: '사이클 정점에서 3년 배당을 고정 약정 → 2019 전사 영업이익 -52% 국면에도 배당 9.6조 유지 의무. 재무 요새로 감당은 됐으나, 정점의 대외 공표가 다운턴 자유도를 좁힌 구조는 3차의 450조 공표(✕)에 앞선 선행 사례',
    verdict: 'partial',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },
  {
    id: 'd19-pre-03', downturn: 'd19', phase: 'prep', product: '공통', context: '운영', prepType: 'intent',
    action: '[무행동] 2H18 공급과잉 경보에도 재고 조정 부재 (TrendForce 2018-08-16·09-26 연속 경보 → 2018년 말 공급·수요 재고 상대 고점 도달)',
    mechanism: '조기경보 신호의 미행동 — 신호는 있었으나 배선이 없었다',
    outcome: '경보→행동 배선 부재가 4Q18 절벽의 낙폭을 키웠다. 3차 대비기의 재고 +76.6% 방치(✕)와 동일 패턴 — 같은 실패가 두 사이클 연속 반복됐다는 사실이 EWI 트리거 사전 배선(RS-9·DP-4)의 가장 강한 근거',
    verdict: 'adverse',
    refs: 'sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md',
  },

  {
    id: 'd3-pre-01', downturn: 'd3', phase: 'prep', product: '공통', context: '투자', prepType: 'growth',
    action: '반도체 CapEx 3년 연속 증액 (32.9조 2020 → 43.6조 2021 → 47.9조 2022)',
    mechanism: '호황 지속 전제의 무절제 확대',
    outcome: '수요 절벽 직전까지 브레이크 없이 증액 → 다운턴 진입 시점에 고정비·감가상각이 최대. 1차 대비기(2007-01 -18% 삭감)와 정반대의 선택이며, 2023년 사상 최대 부문 적자(-4.58조)의 구조적 배경',
    verdict: 'adverse',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-02', downturn: 'd3', phase: 'prep', product: '공통', context: '투자', prepType: 'growth',
    action: '그룹 투자계획 2연발 (240조/3년 2021-08-24 → 450조/5년·8만 명 2022-05-24)',
    mechanism: '정점 확신의 대외 공표',
    outcome: '수요 절벽이 시작되기 약 6개월 전에 사상 최대 규모의 5년 계획을 공표 → 대외 공약이 이후 감산·투자 조정의 자유도를 좁혔다. 정점 낙관 편향이 조직 밖으로 고정된 형태',
    verdict: 'adverse',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-03', downturn: 'd3', phase: 'prep', product: 'DRAM', context: '제조', prepType: 'growth',
    action: '평택 P2·P3·P4 연속 건설 (P2 EUV 라인 2020-05 착공 10조 → P3 2020 착공·2022-07 양산 → P4 2022-09 기초공사)',
    mechanism: '리드타임 소화 + 캐파 선제 확보',
    outcome: '리드타임 관점에서는 정석이나, 확정형 일괄 집행이라 다운턴에 되돌릴 여지가 없었다 — Fab Shell 선행·장비 단계 반입(RS-1)의 부재. 회복기(2025~26) 공급 기반이 된 상방과 다운턴 고정비의 하방이 공존',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-04', downturn: 'd3', phase: 'prep', product: 'NAND', context: '제조', prepType: 'growth',
    action: '시안 2공장 완공 (총 $15B — $7B + 2019-12 $8B, 2단계 2022-03 완료, 月 13만 장 = 전체 NAND 40%+)',
    mechanism: '단일 거점 집중 캐파 확대',
    outcome: '다운턴 진입 직전에 NAND 캐파의 40%+가 단일 해외 거점으로 집중 완료 → 이후 NAND 감산(2023-07~2024-02 50% 유지)의 부담이 이 거점에 집중. 동서 균형 공급(MB-2)의 자산인 동시에 지정학 리스크의 집중점',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-05', downturn: 'd3', phase: 'prep', product: '공통', context: '투자', prepType: 'growth',
    action: 'Taylor 팹 $17B 결정·발표 (2021-11-23 — 호황 정점의 확정 투자)',
    mechanism: '해외 거점 확보 — 정점 확정 커밋',
    outcome: '호황 정점에 확정한 대규모 투자가 다운턴 기간의 고정 지출로 이어졌고, 이후 4nm→2nm 상향·수율·고객 확보로 가동이 2026~27로 순연되며 총투자도 $37~44B로 확대 — 확정 커밋의 되돌릴 수 없음이 그대로 비용이 됐다',
    verdict: 'partial',
    refs: ' · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd3-pre-06', downturn: 'd3', phase: 'prep', product: 'DRAM', context: '개발', prepType: 'effect',
    action: '선단 공정·DDR5 선행 (EUV DRAM 출하 2020-03 → 512GB DDR5 HKMG 세계 최초 2021-03-25 → 14nm 1a EUV DDR5 양산 2021-10-12, EUV 5레이어·생산성 +20%)',
    mechanism: '차세대 표준 선행 — 회복기 자산 축적',
    outcome: '다운턴 전에 DDR5·EUV 전환을 끝내둔 것이 2025~26 회복기 범용 DRAM 마진 우위의 토대. 대비기 개발 축은 세 다운턴 중 가장 강했다 — 문제는 같은 시기 HBM 축에서는 정반대였다는 점',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-07', downturn: 'd3', phase: 'prep', product: 'NAND', context: '개발', prepType: 'effect',
    action: 'V-NAND 세대 전환 (V7 176단 2021-04 → V8 236단 2022-11)',
    mechanism: '적층 세대 선행',
    outcome: '다운턴 전후로 세대 전환을 이어가 원가 경쟁력을 유지. 단 같은 시기 Kioxia는 CBA(hybrid bonding)로 아키텍처 자체를 먼저 바꿨고, 삼성의 hybrid bonding 자체 IP 트랙은 이 대비기에 확보되지 않았다',
    verdict: 'clear',
    refs: ' · wiki/concepts/nand-process-transition.md',
  },
  {
    id: 'd3-pre-08', downturn: 'd3', phase: 'prep', product: 'SSD·UFS', context: '제품', prepType: 'effect',
    action: 'PM9A3 데이터센터 SSD 양산 (2021-03) · UFS 4.0 세계 최초 개발 (2022-05, 4,200MB/s·전력효율 +46%)',
    mechanism: '고부가 스토리지 제품 축 선행',
    outcome: '1~3차를 통틀어 SSD·UFS 축에서 가장 두터운 대비 — 데이터센터 SSD와 모바일 스토리지 양쪽에서 세대 선행. 이 축의 대비가 2025~26 enterprise SSD 1위(38.2%)로 이어졌다',
    verdict: 'clear',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-09', downturn: 'd3', phase: 'prep', product: 'DRAM', context: '운영', prepType: 'intent',
    action: '[무행동] HBM 전담조직 복원 부재 (2019 해체 → 대비기 전 구간 부재 → 2024-04 재구성)',
    mechanism: '니치 배제의 지속 — 조직 차원의 무행동',
    outcome: '**대비기 전 구간에 걸쳐 HBM 조직이 부재했다는 것이 3차 다운턴의 출발 위치(C)를 만들었다.** 다운턴 중의 A6(HBM 후순위)는 단발 판단이 아니라 이 대비기 무행동의 연장이었고, 결과는 HBM 40%→17%·33년 만의 DRAM 역전. 한 시기의 무행동이 다음 시기의 소여가 되는 순환의 가장 선명한 사례',
    verdict: 'adverse',
    refs: ' · wiki/concepts/dram-market-share.md',
  },
  {
    id: 'd3-pre-10', downturn: 'd3', phase: 'prep', product: '공통', context: '운영', prepType: 'intent',
    action: '[무행동] 재고 급증에 대한 조치 부재 (전사 41.4조 → 52.2조, DS 16.5조 → 29.1조 +76.6%, 2021년 말 기준)',
    mechanism: '조기경보 신호의 미행동 — 재고 축적 방치',
    outcome: '다운턴 진입 6~12개월 전에 재고가 정량적으로 경보를 보냈으나 감산·생산 조정으로 연결되지 않았다 → 2022-10 무감산 선언, 2023-04 뒤늦은 감산 선회로 이어진다. **재고일수를 EWI 트리거로 사전 배선해야 하는 이유의 직접 근거**',
    verdict: 'adverse',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-11', downturn: 'd3', phase: 'prep', product: 'DRAM', context: '운영', prepType: 'intent',
    action: '판매 측 절제 — 2022 Q2 "disciplined sales strategy" (서버 집중·ASP 유지, 매출 77.2조·영업익 14.1조)',
    mechanism: '가격 규율 — 판매 믹스 방어',
    outcome: '대비기 말에 관측되는 유일한 절제 신호이나 판매 축에 국한됐다 — **캐파는 늘리고 판매만 조인 비대칭**. 생산 측 절제가 동반되지 않아 재고 축적을 막지 못했다',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-12', downturn: 'd3', phase: 'prep', product: '공통', context: '운영', prepType: 'growth',
    action: '조직 개편 (2021-12-07 경계현 DS부문장 선임 + CE·IM 부문 → DX 통합)',
    mechanism: '리더십·조직 재편',
    outcome: '대비기 말에 조직 개편은 있었으나 다운턴 대비를 목적으로 한 재편은 아니었다 — 이후 2022~23 다운턴 기간에는 조직 대응이 부재했고, 다운턴 대응 성격의 교체는 2024-05에야 이뤄진다',
    verdict: 'partial',
    refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md',
  },
  {
    id: 'd3-pre-13', downturn: 'd3', phase: 'prep', product: 'SSD·UFS', context: '개발', prepType: 'effect',
    action: '고부가 eSSD 아키텍처 선행 3연타 — SmartSSD CSD(2020-11, Xilinx FPGA 연산 스토리지)·첫 ZNS SSD(2021-06)·PM1743 업계 최초급 PCIe Gen5(2021-12 발표, 2022 Q1 양산)',
    mechanism: '차세대 인터페이스·아키텍처 선행 — 회복기 자산 축적',
    outcome: '다운턴 진입 전에 Gen5·연산 스토리지·ZNS를 선행해 둔 것이 회복기 PM1753(NVIDIA CMX 공급)·PM1763 Gen6·1Q26 enterprise SSD 1위(38.2%)의 계보적 토대. PM9A3·UFS 4.0(별도 항목)과 함께 3차 대비기의 SSD·UFS 축은 세 대비기 중 가장 두터웠다 — 단 SLC 초고 IOPS AI SSD 트랙은 이 시기에도 열리지 않았다(현재 SK·Kioxia 선점의 원인)',
    verdict: 'clear',
    refs: 'sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md',
  },

  // ══ 4차 (2028~29 예측) · 추천 전략 ══════════════════════════════════════
  {
    id: 'd4-rec-01', downturn: 'd4', phase: 'recommend', product: '공통', context: '운영', prepType: 'intent',
    action: '[대비] 계약 바닥 선점 — take-or-pay·NTB 하한·Participating Forward를 커버리지 표준으로 + 만기 사다리화 (RS-8·RS-4·D12 · DP-1)',
    mechanism: '계약적 매출 바닥 — 과거 3회 다운턴에 없던 신규 메커니즘',
    outcome: '발화 창은 다운턴 도착 전뿐 — 고객이 스스로 선수금·다년 계약에 들어오는 지금만 성립. 영업 4단계 격차(SK·마이크론 선행)만큼 바닥의 격차가 생긴다',
    causes: {
      demand: { verdict: 'clear', text: '현물가가 붕괴해도 커버리지만큼 매출 바닥 유지 — 붕괴가 매출에 미도달. 잔여 리스크는 고객 신용·재협상 압박' },
      supply: { verdict: 'clear', text: '과잉은 비계약 물량에만 노출 — 3사 커버리지 확산은 치킨게임 재점화 유인 자체를 제거' },
      shift: { verdict: 'partial', text: '계약은 기존 제품 기준 — 수요가 대체 기술로 이동하면 갱신 시점에 커버리지 공동화 (계약은 사이클은 막아도 전환은 못 막는다)' },
    },
    refs: 'wiki/strategies/invariant/rs8-structured-revenue-hedging.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
  },
  {
    id: 'd4-rec-02', downturn: 'd4', phase: 'recommend', product: '공통', context: '투자', prepType: 'intent',
    action: '[대비] 옵션형 캐파 강제 — Fab Shell 선행 + 장비 단계 반입을 신규 캐파의 기본형으로 (RS-1·RS-5 · DP-2 🔵 무후회)',
    mechanism: '교정형 역사이클 투자 — 확정을 옵션으로',
    outcome: 'cause-robust — 옵션 가치는 원인과 무관하게 변동성 자체에 비례. 재무 요새는 모든 액션의 공통 전제이며, 2023년 감산·투자 분리 집행이 사내 선례',
    causes: {
      demand: { verdict: 'clear', text: '장비 미반입 동결로 확정 캐파 대비 손실 최소화' },
      supply: { verdict: 'clear', text: '증설 중단 옵션의 행사가 곧 절제 신호 겸용 — 3강 균형 유지에 기여' },
      shift: { verdict: 'clear', text: 'Shell·인프라는 신기술(3D DRAM·CXL) 라인으로 전용 가능 — 전환 유연성' },
    },
    refs: 'wiki/strategies/invariant/rs1-options-based-capacity.md · wiki/strategies/invariant/rs5-financial-discipline-reinvestment.md',
  },
  {
    id: 'd4-rec-03', downturn: 'd4', phase: 'recommend', product: '공통', context: '운영', prepType: 'intent',
    action: '[대비] 맥락 EWI + 다운턴 조직 대응 매뉴얼 사전 정의 (RS-9·D15·D16 · DP-4 🔵 무후회·DP-7)',
    mechanism: '데이터 트리거 규율 + 조직 재편 사전 배선',
    outcome: 'cause-robust — 이 액션의 산출물이 곧 원인 판별이며, 나머지 액션의 행사 스위치를 켠다. 실행 순서는 "EWI 상시 → 계약 바닥 즉시 → 나머지는 트리거 발동 시"',
    causes: {
      demand: { verdict: 'clear', text: 'FCF 반전·CapEx -25%·GPU 임대가 -35%로 조기 식별' },
      supply: { verdict: 'clear', text: '경쟁사 증설 공시·재고일수·CXMT 캐파로 조기 식별' },
      shift: { verdict: 'clear', text: '3D DRAM 전력 50% 개선·커스텀 칩 CXL 채택으로 조기 식별' },
    },
    refs: 'wiki/strategies/invariant/rs9-demand-inflection-sensing.md · sources/raw-notes/demand-inflection-ewi-2026-06.md',
  },
  {
    id: 'd4-rec-04', downturn: 'd4', phase: 'recommend', product: 'DRAM', context: '개발', prepType: 'intent',
    action: '[대비] 차세대 별동대 + R&D 하한 — HBM4E·zHBM·3D DRAM 선행 조직을 주력 배분 논리에서 분리 (D13·D6·SD-1 · DP-5 🔵 무후회)',
    mechanism: '다운턴 중 기술 전환 선행 — 자기잠식 허용 별동대',
    outcome: 'cause-robust — 세 원인 모두에서 발화. 2022~23 SK가 적자 속에서도 HBM 방향을 유지해 왕좌를 가져간 것의 정확한 이식이며, 2019 HBM팀 축소의 반면교사',
    causes: {
      demand: { verdict: 'clear', text: '다운턴 중 인증·차세대 선행이 회복기 배분을 결정 — SK 실증의 반복' },
      supply: { verdict: 'clear', text: '과잉기 범용 마진 붕괴 시 인증·커스텀 층만 방어 — 선행 가치 최대' },
      shift: { verdict: 'clear', text: '전환 자체가 심판대 — 별동대가 유일한 응수 (시나리오 E 보험)' },
    },
    refs: 'wiki/scenarios/strategy.md · wiki/entities/sk-hynix.md',
  },
  {
    id: 'd4-rec-05', downturn: 'd4', phase: 'recommend', product: 'NAND', context: '개발', prepType: 'intent',
    action: '[대비] hybrid bonding 자체 IP 확보 + 공정 전환 주기 연장 R&D (RS-6·RS-7·D10 · DP-5)',
    mechanism: '공급자·IP 종속 해소 — 세대 전환의 순서를 바꾸기',
    outcome: 'Kioxia(2023 업계 최초 CBA 양산)·YMTC(Xtacking·hybrid bonding 특허 지배)가 제약 국면에서 아키텍처 선행으로 판을 바꾼 것의 이식. V10(430L, BV NAND) 세대에서 YMTC 라이선스 의존은 시나리오 C/E에서 차단 리스크',
    causes: {
      demand: { verdict: 'partial', text: '수요발 다운턴에서는 NAND capex 회수 압박이 커져 IP 투자 자체가 삭감 압력을 받음' },
      supply: { verdict: 'clear', text: '과잉기엔 원가·밀도 우위가 유일한 방어선 — 자체 IP가 라이선스 비용까지 제거' },
      shift: { verdict: 'clear', text: '전환기 IP 보유자가 다음 세대의 갑 — 지금 확보가 유일한 창' },
    },
    refs: 'wiki/concepts/nand-process-transition.md · wiki/entities/ymtc.md',
  },
  {
    id: 'd4-rec-06', downturn: 'd4', phase: 'recommend', product: 'SSD·UFS', context: '제품', prepType: 'intent',
    action: '[대비] AI SSD 니치 조기 진입 — SCADA 대응 확정 + FDP 호스트 통합 플랫폼으로 소프트웨어 전환비용 축적 (MB-4·RS-3 · DP-5)',
    mechanism: '인접 파괴 선점 — 레퍼런스 고착 전 진입',
    outcome: 'SK·Kioxia가 SLC 기반 초고 IOPS AI SSD로 NVIDIA 전략 파트너를 선점 중 — HBM에서 벌어진 "니치 선점 → 레퍼런스 고착 → 구조적 열위"의 반복 위험. 레퍼런스가 굳은 뒤 진입 비용은 니치 단계의 몇 배',
    causes: {
      demand: { verdict: 'partial', text: '수요 급감 시 AI SSD 채택 자체가 지연 — 진입 창은 열려 있으나 배당 실현이 늦어짐' },
      supply: { verdict: 'clear', text: '범용 NAND 과잉 국면에서 고부가 AI SSD가 믹스 방어선' },
      shift: { verdict: 'clear', text: 'KV 캐시 오프로드·CXL 계층화로 스토리지 계층 재편 — 선점자가 표준을 쥔다' },
    },
    refs: 'wiki/strategies/fdp-host-ssd-platform.md · wiki/entities/nvidia-cmx-scada.md',
  },
  {
    id: 'd4-rec-07', downturn: 'd4', phase: 'recommend', product: '공통', context: '투자',
    action: '[대응] 다운사이클 M&A 펀드 집행 + PMI 각본 (D9 · DR-4 — EV/EBITDA 5배 6개월 트리거, 대상은 캐파가 아니라 기술 자산·인재)',
    mechanism: '다운턴 저가 매수 — 대상 교정',
    outcome: '2012 엘피다 불참(불행사)의 교정이자, 마이크론이 인수 후 중앙 운영 체계(고객 요구 중앙 DB·다사이트 표준화)로 배당을 키운 것의 이식. 인수 자체가 아니라 PMI가 배당을 결정',
    causes: {
      demand: { verdict: 'clear', text: '밸류에이션 전반 폭락 → 트리거 발동 확률·매수 창 최대' },
      supply: { verdict: 'partial', text: '3사 계약 바닥이 헐값 매물 출현을 억제 — 매물은 장비·소재·설계 인접군 중심' },
      shift: { verdict: 'clear', text: '구세대 자산 급락 + 신기술 IP·팀 매수 창 동시 개방' },
    },
    refs: 'wiki/scenarios/strategy.md · wiki/entities/micron.md',
  },
  {
    id: 'd4-rec-08', downturn: 'd4', phase: 'recommend', product: 'DRAM', context: '제조',
    action: '[대응] 게임 분리 — 소모전 불행사 + 로엔드 원가 방어 + 고부가 층 이동 (RS-6·RS-2·MB-4 · DR-2b 소모전 봉인·DR-5)',
    mechanism: '소모전 봉인 + 판 옮기기',
    outcome: 'CXMT는 국가가 손실을 흡수하므로 가격으로 퇴출되지 않는다 — 2023년에 이미 3강 맥락에서 소모전 불발을 실증. 로엔드는 원가로 속도만 늦추고 승부는 커스텀·솔루션 층에서',
    causes: {
      demand: { verdict: 'partial', text: '수요 붕괴 시 국가보조 CXMT의 상대 체력 우위 — 로엔드 방어선 후퇴 압박, 원가 사수가 마지노선' },
      supply: { verdict: 'clear', text: 'CXMT 캐파가 과잉의 일부일 때 소모전 재사용 대신 고부가 층 이동만 작동' },
      shift: { verdict: 'partial', text: '전환기엔 고부가 층의 정의 자체가 이동 — 커스텀 제품 라인업도 재정의 필요' },
    },
    refs: 'wiki/entities/cxmt.md · wiki/strategies/invariant/rs2-barbell-portfolio.md',
  },
  {
    id: 'd4-rec-09', downturn: 'd4', phase: 'recommend', product: '공통', context: '운영',
    action: '[대응] 조직 재편을 다운턴 안에서 실행 (2009년형 — 회복 후로 미루지 않기, D16 매뉴얼 발동 · DR-6)',
    mechanism: '위기를 구조 재편의 창으로 사용',
    outcome: '2009년 조직 통합(◎)과 2022~23년 무대응(△)의 대칭 실패가 근거. 다운턴은 조직 저항이 가장 낮은 유일한 창이며, 회복기에는 그 창이 닫힌다',
    causes: {
      demand: { verdict: 'clear', text: '적자 국면의 재편 명분이 최대 — 2009년 선례와 동형' },
      supply: { verdict: 'partial', text: '이익이 유지되면 재편 명분이 약해 실행 동력 부족' },
      shift: { verdict: 'clear', text: '전환기엔 제품 조직 경계 자체를 다시 그어야 함 — 재편이 필수' },
    },
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },

  // ══ 4차 (2028~29 예측) · 예상되는 흔한 실수 ═════════════════════════════
  {
    id: 'd4-mis-01', downturn: 'd4', phase: 'mistake', product: '공통', context: '제조',
    action: '무감산 소모전의 3번째 재사용 — "버티면 누군가 죽는다"는 1차전 교범을 CXMT에 적용',
    mechanism: '부러진 메커니즘의 재발화 시도',
    outcome: '2023년에 이미 실패한 경로의 반복. 3강 절제 균형에서는 자해이고, 손실을 국가가 흡수하는 CXMT에게는 애초에 퇴출 메커니즘이 성립하지 않는다 → 적자만 깊어지고 균형까지 파괴하는 이중 비용',
    signal: '경쟁사 감산 발표 후에도 가동률 유지를 공언 / "점유율 사수" 프레임의 사내 확산',
    counter: '감산 결정 규칙을 EWI 트리거에 사전 배선(D16) — 판단을 사람이 아닌 규칙이 하게',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · wiki/entities/cxmt.md',
  },
  {
    id: 'd4-mis-02', downturn: 'd4', phase: 'mistake', product: '공통', context: '제조',
    action: '감산 판단을 6개월 미루기 — 선언·재확인·번복의 궤적 반복',
    mechanism: '정점 낙관 편향 — 결정 지연',
    outcome: '2022-10 선언 → 2023-04 철회까지 6개월간 DS -4.58조가 누적됐다. 지연 자체가 비용이며, 늦은 감산은 같은 감산이라도 배당이 작다',
    signal: '재고일수 상한 초과에도 "일시적" 해석 / 분기 실적 발표마다 기존 입장 재확인',
    counter: '재고일수·FCF 반전 트리거에 30일 내 집행 의무를 붙이기(D15·D16)',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd4-mis-03', downturn: 'd4', phase: 'mistake', product: 'DRAM', context: '제품',
    action: '차세대 니치를 "작은 시장·낮은 마진"으로 다시 후순위화 — 이번 대상은 zHBM·커스텀 HBM·3D DRAM',
    mechanism: '주력 사업 논리에 의한 니치 배제 (A6의 재발)',
    outcome: 'HBM 40%→17%를 만든 바로 그 배분 논리. 다운턴에는 "지금 마진이 나는 곳"이 더 강하게 보이므로 재발 압력이 최대가 된다 — 니치가 주류가 되는 순간 회복 비용은 니치 단계의 몇 배',
    signal: '별동대 예산이 분기 심사에서 주력 라인으로 재배분 / 커스텀 제품 로드맵의 우선순위 하향',
    counter: '별동대 예산을 주력 배분 논리에서 면제(SD-1 독립 P&L)하고 R&D 하한을 이사회 정책으로(D6)',
    refs: 'wiki/concepts/dram-market-share.md · sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md',
  },
  {
    id: 'd4-mis-04', downturn: 'd4', phase: 'mistake', product: '공통', context: '개발',
    action: '다운턴 R&D를 "일시 조정"으로 삭감 — 회복하면 되돌린다는 전제',
    mechanism: '학습곡선 단절 — 엘피다형 경로',
    outcome: '엘피다는 가격 급락과 함께 "PC→모바일 전환 대응 실패"로 죽었다. 공정·세대 개발은 되돌리면 6개월~1년 지연되고, NAND 기준 양산 6개월 지연은 이익의 2/3 소실·1년 지연은 손실 전환',
    signal: 'R&D 예산의 매출 대비 비율이 하락 / 선행 개발 인력의 양산 라인 전환 배치',
    counter: '2023년 선례(적자에도 R&D 28.34조 사상 최대)를 규범으로 제도화 — 다운사이클 R&D 하한 명문화(D6)',
    refs: 'wiki/concepts/nand-process-transition.md · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd4-mis-05', downturn: 'd4', phase: 'mistake', product: '공통', context: '투자',
    action: '저가 매물 앞에서 트리거 없이 관망 — "지금은 현금을 지킬 때"라는 논리',
    mechanism: '다운턴 저가 매수 불행사 (2012 엘피다 재현)',
    outcome: '2012년 엘피다를 마이크론이 가져가 모바일 DRAM 스케일과 다사이트 운영 체계를 확보했다. 매수 창은 다운턴 바닥의 짧은 구간에만 열리고, 그때는 조직 전체가 방어 모드라 의사결정이 나오지 않는다',
    signal: '매물 검토가 "회복 후 재논의"로 반복 연기 / 인수 검토 조직이 다운턴에 축소',
    counter: 'EV/EBITDA 5배 6개월 지속 같은 사전 트리거 + 프리미엄 사전 적립 + PMI 각본 상비(D9)',
    refs: 'wiki/entities/micron.md · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd4-mis-06', downturn: 'd4', phase: 'mistake', product: '공통', context: '투자',
    action: '호황 정점에 확정형 대규모 증설을 한 번에 집행 — 옵션형 구조를 "느리다"는 이유로 우회',
    mechanism: '유연성 포기 — 확정 투자로 변동성 정면 수용',
    outcome: '변동성 σ 60~120%인 산업에서 확정 투자는 가장 비싼 선택. 2028~29 신규 캐파 동시 도래(②공급발) 국면에서 확정 캐파는 되돌릴 수 없는 고정비가 된다',
    signal: '경쟁사 증설 공시에 대응해 "맞불" 증설 검토 / Shell 단계화를 생략한 일괄 발주',
    counter: '모든 신규 캐파에 Fab Shell + 장비 단계 반입을 기본형으로 강제(RS-1), 예외는 인증 확보분만',
    refs: 'wiki/strategies/invariant/rs1-options-based-capacity.md · wiki/benchmark/agri-hedging-to-memory-semi.md',
  },
  {
    id: 'd4-mis-07', downturn: 'd4', phase: 'mistake', product: '공통', context: '운영',
    action: '호황 마진 극대화를 위해 계약 커버리지를 낮게 유지 — 스팟 노출로 상방을 다 먹으려는 선택',
    mechanism: '계약적 매출 바닥의 자발적 포기',
    outcome: '상승기엔 옳아 보이지만, 커버리지는 다운턴이 시작되면 절대 새로 못 만든다. 고객이 선수금·다년 계약에 들어오는 창은 부족 국면에만 열리며, 그 창을 마진 몇 %p와 맞바꾸는 셈',
    signal: '분기 ASP 극대화가 영업 KPI의 지배 지표 / 장기계약 협상이 "가격이 더 오를 것"을 이유로 연기',
    counter: '계약 커버리지 비율을 EWI 맥락 지표로 상시 감시하고 목표 하한을 KPI에 명시(RS-8·D12)',
    refs: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · wiki/strategies/invariant/rs8-structured-revenue-hedging.md',
  },
  {
    id: 'd4-mis-08', downturn: 'd4', phase: 'mistake', product: '공통', context: '운영',
    action: '조직 재편을 회복 이후로 미루기 — "지금은 실적 방어가 우선"',
    mechanism: '재편 창의 상실 (2022~23 무대응 재현)',
    outcome: '2009년에는 위기 중 재편(DS/DMC 통합)이 이듬해 사상 최대급 실적으로 이어졌고, 2022~23년에는 무대응 끝에 2024-05 리더십 교체로 지연됐다. 회복기에는 저항이 커져 같은 재편이 불가능해진다',
    signal: '조직 논의가 "회복 후 정상화 시점"으로 반복 연기 / 위기 대응이 비용 절감 항목에만 국한',
    counter: '다운턴 조직 대응 매뉴얼을 사전 정의하고 트리거와 함께 발동(D16)',
    refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
  },
  {
    id: 'd4-mis-09', downturn: 'd4', phase: 'mistake', product: 'NAND', context: '개발',
    action: 'hybrid bonding 자체 IP 개발을 "라이선스로 충분하다"며 후순위화',
    mechanism: '공급자·IP 종속의 고착',
    outcome: 'YMTC가 hybrid bonding 핵심 특허를 다수 보유하고 있어, V10(430L, BV NAND) 이후 세대에서 의존이 고착된다. 시나리오 C/E(디커플링 강화)에서는 라이선스 차단 자체가 생산 중단 리스크',
    signal: '자체 특허 출원 건수 정체 / 로드맵에서 자체 IP 목표 비율이 사라짐',
    counter: '자체 IP 비율 목표를 로드맵 KPI로 명시하고 다운턴에도 이 트랙만은 유지(RS-6·RS-7)',
    refs: 'wiki/concepts/nand-process-transition.md · wiki/entities/ymtc.md',
  },
  {
    id: 'd4-mis-10', downturn: 'd4', phase: 'mistake', product: 'SSD·UFS', context: '제품',
    action: 'AI SSD·FDP 플랫폼 투자를 "NAND 업황 회복 후"로 미루기',
    mechanism: '인접 파괴에서 HBM 패턴 반복',
    outcome: 'SK·Kioxia가 SCADA 레퍼런스를 선점한 뒤 진입하면 비용은 니치 단계의 몇 배가 된다 — HBM이 이미 증명한 경로. 스토리지는 하드웨어가 아니라 소프트웨어 층에서 전환비용이 쌓이므로 지연의 대가가 더 크다',
    signal: 'SCADA 대응 로드맵의 마일스톤 이월 / 컨트롤러·펌웨어 인력이 원가 절감 대상에 포함',
    counter: 'SCADA 대응 전략을 기한 있는 결정으로 못박고 FDP 소프트웨어 층 인력을 감축 예외로(MB-4·RS-3)',
    refs: 'wiki/strategies/fdp-host-ssd-platform.md · wiki/entities/nvidia-cmx-scada.md',
  },
  {
    id: 'd4-mis-11', downturn: 'd4', phase: 'mistake', product: 'DRAM', context: '제조',
    action: '인증 없는 캐파로 점유율을 방어하려는 시도 — "캐파가 곧 점유율"이라는 낡은 등식',
    mechanism: '배분 규칙 오독 (캐파 게임 ↔ 인증 게임 혼동)',
    outcome: '2022~23년에 이미 실증됐다 — 범용 캐파를 지켜 범용 게임은 이겼지만, 인증이 배분을 결정하는 HBM 게임에서는 캐파가 점유율로 전환되지 않았다. 고부가 축에서 캐파 투입은 인증 없이는 재고가 된다',
    signal: 'HBM 라인 증설이 고객 인증·물량 확약보다 선행 / "선제 캐파로 협상력 확보" 논리',
    counter: '고부가 캐파는 인증·계약 확약을 선행 조건으로(마이크론의 수요 선점→팹 역순 이식, B4)',
    refs: 'wiki/concepts/dram-market-share.md · wiki/entities/micron.md',
  },
  {
    id: 'd4-mis-12', downturn: 'd4', phase: 'mistake', product: '공통', context: '개발',
    action: '다운턴 원인을 하나로 단정하고 대응을 몰아주기 — 수요발로 보고 전부 방어하거나, 전환발을 무시하거나',
    mechanism: '원인 판별 실패 — 단일 시나리오 고착',
    outcome: '수요발·공급발·전환발은 처방이 다르다. 수요발에 옳은 전면 방어가 전환발에서는 별동대 예산 삭감이라는 최악수가 되고, 전환발을 수요발로 오독하면 계약 커버리지의 공동화도 놓친다',
    signal: '경영 논의에서 원인 가설이 하나로 수렴 / EWI 지표가 결과 변수(가격·수요)에만 편중',
    counter: 'EWI에 맥락 지표(계약 커버리지·경쟁사 증설 공시·CXMT 하이엔드 진입·종류별 사이클 위치)를 함께 올려 원인을 판별(D15)',
    refs: 'wiki/concepts/demand-inflection-ewi.md · wiki/driving-forces/key-drivers.md',
  },
]
