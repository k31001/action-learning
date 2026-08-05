// 스토리라인 — 환경 변화에서 전략적 선택까지
// 단일 소스: wiki/storyline/storyline.md (이 파일은 대시보드 미러 — 수치·서사 변경은 위키 먼저)
// 각 블록의 refs는 SourceLink가 GitHub 링크로 토큰화하는 경로 문자열.

export const STORYLINE_META = {
  asof: '2026-08-05',
  title: '스토리라인 — 환경 변화에서 전략적 선택까지',
  thesis:
    '사상 최대 호황의 정점에서 내려야 할 결정은 "더 크게 베팅하라"가 아니라, 가장 큰 미래(시나리오 B, 39%)에 베팅하되 어떤 미래가 와도 지지 않는 구조(RS-1~9)를 먼저 깔고, 전환 시점은 데이터(EWI)가 알려주게 하는 것이다.',
  wikiSource: 'wiki/storyline/storyline.md',
}

// 스토리 플로우 — 선형 체인 (순서가 곧 엣지). chapterId 클릭 시 해당 장으로 스크롤.
export const STORYLINE_FLOW = [
  { id: 'env',       label: '환경 변화',   sub: 'STEEP 50요인',            color: '#32ADE6', chapterId: 'ch1', summary: 'AI CapEx $725B(+77%) · AI DC 55.9GW — 게임의 규칙이 바뀌었다' },
  { id: 'diagnosis', label: '진단',        sub: '호황 속 구조적 패배',      color: '#FF9500', chapterId: 'ch2', summary: '매출 사상 최대 vs DRAM 33년 만의 역전 · Rubin 후순위' },
  { id: 'drivers',   label: '핵심 동인',   sub: 'DF1 · DF2 (+DF3)',        color: '#FF2D55', chapterId: 'ch3', summary: 'AI 수요 지속성(8.5 정점) × 미중 디커플링(0.5 공존 기움)' },
  { id: 'scenarios', label: '다섯 개의 미래', sub: 'B "AI 르네상스" 39% ⭐', color: '#AF52DE', chapterId: 'ch4', summary: 'A26 · B39 · C8 · D21 · E6 — 2035 시장 $1,800억~$5,200억' },
  { id: 'strategy',  label: '선택',        sub: 'MB-1~5 + Side Bet',       color: '#007AFF', chapterId: 'ch5', summary: '가장 큰 미래에 베팅하되 자동 실현을 믿지 않는다' },
  { id: 'robust',    label: 'Robust 구조', sub: 'RS-1~9 · D1~D17',         color: '#34C759', chapterId: 'ch6', summary: '9전략 × 5시나리오 = 45셀 전부 긍정 가치 + 17개 결정 묶음' },
  { id: 'why',       label: '왜 이 선택인가', sub: '대안 3개 비교 논증',    color: '#5856D6', chapterId: 'ch7', summary: '올인·관망·수축 대비 확률가중 베팅+헤지+트리거의 우위' },
  { id: 'ewi',       label: '감시와 전환', sub: 'EWI · 트리거',            color: '#8E8E93', chapterId: 'ch8', summary: '이야기는 데이터가 계속 쓴다 — 자기 갱신하는 전략 서사' },
]

// 연대기 — 2023 AI 붐 → 2035 시나리오 지평
export const STORYLINE_TIMELINE = [
  { date: '2023',     label: 'AI 붐 개화',           detail: '생성형 AI가 DC 설계도를 다시 그림 · 삼성 HBM 점유 40%', chapterId: 'ch1' },
  { date: '2025 Q1',  label: 'SK하이닉스 DRAM 역전', detail: '33년 만의 순위 교체 · 삼성 HBM 17% 추락',              chapterId: 'ch2' },
  { date: '2026',     label: '슈퍼사이클 정점',       detail: '메모리 매출 $50.4B(+292%) · Rubin 배정 SK 60~70% · HBM4E 최초 샘플', chapterId: 'ch2' },
  { date: '2027~28',  label: 'AI 수익화 분기점',      detail: '신규 팹 공급 도래 창 · shortage→oversupply 반전 리스크', chapterId: 'ch8' },
  { date: '2030',     label: '4대 병목',              detail: '전력 72 최대 병목 · CAPEX/ROI 하방 민감도 -31.5%',      chapterId: 'ch8' },
  { date: '2035',     label: '시나리오 지평',         detail: '시장 $1,800억~$5,200억 — 어느 미래인가가 갈린다',       chapterId: 'ch4' },
]

// 본문 8장 — 완결 문장 서사. 블록 타입: p | h | ul | ol | quote (Interviews.jsx Block 계열)
export const STORYLINE_CHAPTERS = [
  {
    id: 'ch1',
    num: 1,
    kicker: '환경 변화',
    title: '2023년, 게임의 규칙이 바뀌었다',
    blocks: [
      {
        type: 'p',
        text: '이야기는 2023년에 시작된다. 생성형 AI가 데이터센터의 설계도를 다시 그리면서, 30년간 PC와 스마트폰의 사이클을 따라 움직이던 메모리 산업에 완전히 새로운 수요 엔진이 장착됐다. 빅테크 4사의 AI 설비투자는 2024년 $200B에서 2026년 $725B로 2년 만에 3배 이상 불어났고, 2026년 성장률만 +77%에 달한다. 전 세계 17개국에서 55.9GW 규모의 AI 데이터센터가 착공 파이프라인에 올라 있으며, 마이크로소프트는 2026년 CapEx $190B 중 $25B가 메모리·반도체 가격 상승분이라고 직접 인정했다.',
        refs: 'sources/articles/samsung-hbm4-volume-order-pending-2026-07-17.md · sources/raw-notes/ai-datacenter-buildout-2026-06.md · wiki/concepts/2026-q1-current-state.md',
      },
      {
        type: 'p',
        text: '이 수요 폭발은 메모리 시장 전체를 들어올렸다. 2026년 글로벌 메모리 시장은 $551.6B(+134% YoY)로 전망되고, HBM은 전 물량이 Sold Out이다. 그러나 환경 변화는 수요만이 아니다. STEEP 50요인 분석이 보여주듯, 반도체는 국가 안보 자산이 됐고, 데이터센터 전력망은 새로운 병목으로 떠올랐으며 — 2026년 7월 기준 4대 병목 제약지수에서 전력이 72로 최대 병목이다 — AI 투자의 ROI 논쟁은 사회적 회의론으로 번지고 있다. 게임의 규칙이 바뀌었다는 것은, 기회와 위험의 규칙이 동시에 바뀌었다는 뜻이다.',
        refs: 'wiki/concepts/memory-market-overview.md · wiki/steep/*.md · sources/articles/july-2026-market-update-2026-07-04.md',
      },
    ],
    sources: 'wiki/steep/*.md · wiki/concepts/ai-capex.md · wiki/concepts/ai-datacenter-buildout.md',
  },
  {
    id: 'ch2',
    num: 2,
    kicker: '진단',
    title: '호황 속의 구조적 패배',
    blocks: [
      {
        type: 'p',
        text: '숫자만 보면 삼성전자 메모리사업부는 승자다. 2026년 1분기 메모리 매출은 사상 최대 74.8조 원($50.4B, +292% YoY)을 기록했고, HBM4를 업계 최초로 양산했다. 경쟁사 실적은 슈퍼사이클의 강도를 실증한다 — 마이크론의 FY26 3분기 매출은 $41.46B(+346% YoY), 매출총이익률은 사상 최고 84.9%였다.',
        refs: 'wiki/concepts/2026-q1-current-state.md · sources/filings/micron-q3-fy26.md',
      },
      {
        type: 'p',
        text: '그러나 이 호황의 안쪽에서 삼성은 구조적으로 지고 있다. 2025년 1분기, SK하이닉스가 33년 만에 처음으로 DRAM 점유율에서 삼성을 추월했다. 원인은 HBM이다. 2023년 40%였던 삼성의 HBM 점유율은 HBM3E 품질 이슈를 거치며 2025년 상반기 17%까지 추락했고, AI 시대의 본선인 NVIDIA Vera Rubin 플랫폼 HBM4 배정에서 SK하이닉스 60~70%, 삼성 25~30%로 후순위가 확정됐다. 2026년 7월 HBM4 인증을 통과하고도 볼륨 발주는 아직 전환되지 않았다.',
        refs: 'wiki/concepts/dram-market-share.md · sources/articles/july-2026-market-update-2026-07-04.md · sources/articles/samsung-hbm4-volume-order-pending-2026-07-17.md',
      },
      {
        type: 'p',
        text: '이것이 위험한 이유는 메모리가 사이클 산업이기 때문이다. 지난 30년간 다섯 번의 다운턴마다 매출의 38%, 이익의 84%가 사라졌다. 호황 속의 점유율 패배는 다운턴의 손실을 키운다. 희망적 신호가 없는 것은 아니다 — 삼성은 HBM4E 샘플을 업계 최초로 출하하며(3.6TB/s, 경쟁사 대비 6개월 선행) 다음 세대 역전의 창을 열었다. 문제는 이 창이 열려 있는 동안 어떤 미래가 오는가다.',
        refs: 'wiki/concepts/semiconductor-cycle.md · sources/articles/june-2026-market-update-2026-06-14.md',
      },
    ],
    sources: 'wiki/entities/samsung.md · wiki/concepts/dram-market-share.md · wiki/concepts/hbm-market.md',
  },
  {
    id: 'ch3',
    num: 3,
    kicker: '핵심 동인',
    title: '답할 수 없는 두 개의 질문',
    blocks: [
      {
        type: 'p',
        text: '미래를 결정하는 것은 삼성이 통제할 수 없는 두 개의 질문이다. 50개 STEEP 요인을 Impact × Uncertainty로 평가한 결과, 최상위 불확실성은 두 축으로 수렴했다.',
        refs: 'wiki/driving-forces/impact-uncertainty-matrix.md · wiki/driving-forces/key-drivers.md',
      },
      {
        type: 'p',
        text: '첫 번째 질문(DF1): AI 수요는 구조적으로 지속되는가? 빅테크 CapEx가 2027년 $1조를 돌파하는 슈퍼사이클(Pole A)과, ROI 실망으로 2027~2028년 투자가 급삭감되는 버블 붕괴(Pole B)가 양 극단이다. 현재 위치는 8.5 — 정점이다. 마이크론의 사상 최고 마진(84.9%)과 SCA 16건 $100B의 계약 락인, take-or-pay 멀티이어 계약과 NTB 가격 하한으로 바닥까지 경직화된 수급이 상방을 지지하지만, 바로 그 사상 최고 마진과 범용 DRAM 계약가의 첫 감속(Q3 +13~18%, Q2 +58~63% 대비)이 후기순환의 전형적 신호이기도 하다.',
        refs: 'sources/filings/micron-q3-fy26.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · sources/articles/july-2026-market-update-2026-07-04.md',
      },
      {
        type: 'p',
        text: '두 번째 질문(DF2): 미중 디커플링은 어디까지 가는가? 삼성은 시안 팹(글로벌 NAND의 40%)과 대중 수출, 대미 관세에 동시에 노출된 \'이중 노출\' 구조로 이 축에 가장 취약하다. 현재 위치는 0.5로 관리된 공존 쪽에 소폭 기울어 있다 — 애플이 중국 내수용 CXMT DRAM 테스트에 착수하고 미 행정부에 승인을 로비 중인 사건이 최신 리트머스다. 두 질문은 서로 독립적이다 — 하나는 기술·경제 내적 논리로, 다른 하나는 외교·안보 논리로 움직인다. 그래서 하나의 예측이 아니라 조합의 시나리오가 필요하다. 보조 축(DF3)으로는 HBM 패러다임이 3D DRAM·PIM·CXL로 대체될 가능성을 별도로 감시한다.',
        refs: 'wiki/driving-forces/key-drivers.md · sources/articles/apple-cxmt-china-dram-2026-07-08.md',
      },
    ],
    sources: 'wiki/driving-forces/key-drivers.md · wiki/driving-forces/impact-uncertainty-matrix.md',
  },
  {
    id: 'ch4',
    num: 4,
    kicker: '갈림길',
    title: '다섯 개의 미래',
    blocks: [
      {
        type: 'p',
        text: '두 축을 교차하면 네 개의 사분면, 그리고 하나의 와일드카드가 나온다. 2026년 8월 4일 정기 재평가 기준 확률은 다음과 같다.',
        refs: 'wiki/scenarios/scenario-matrix.md',
      },
      {
        type: 'ul',
        items: [
          'A "황금 요새" (26%) — AI 지속 + 디커플링. 시안 팹을 잃지만 서방 HBM 듀오폴리의 고마진 공급자가 된다. 2035년 시장 $4,500억.',
          'B "AI 르네상스" (39%) ⭐ Main Bet — AI 지속 + 관리된 공존. 2035년 시장 $5,200억으로 최대이며, 동서 양쪽 시장을 모두 공략할 수 있는 유일한 미래.',
          'C "기술 냉전" (8%) — AI 붕괴 + 디커플링. 이중 충격으로 사상 최대 손실 가능성. 2035년 시장 $2,600억.',
          'D "조용한 재편" (21%) — AI 붕괴 + 공존. 2022~2023년형 다운사이클의 재현이자 체질 개선의 기회. 2035년 시장 $3,200억.',
          'E "패러다임 전환" (6%) — 와일드카드. HBM이 3D DRAM·CXL로 대체되며 HBM 집중 투자가 매몰 비용화된다.',
        ],
      },
      {
        type: 'p',
        text: '확률은 고정된 숫자가 아니라 매주 소스가 들어올 때마다 재평가되는 살아있는 값이다 — 마이크론 실적으로 B가 35→37로, LTA→SCA 계약 체제 확립으로 37→38로, 애플–CXMT 건으로 38→39로 움직여 온 이력 전체가 시나리오 매트릭스에 기록돼 있다. 2035년 시장 규모가 시나리오에 따라 $1,800억~$5,200억까지 갈리는 만큼, 어느 하나만 가정한 단선적 계획은 위험하다.',
        refs: 'wiki/scenarios/scenario-matrix.md · sources/filings/micron-q3-fy26.md · sources/articles/apple-cxmt-china-dram-2026-07-08.md',
      },
    ],
    sources: 'wiki/scenarios/scenario-matrix.md · wiki/scenarios/scenario-A.md ~ scenario-E.md',
  },
  {
    id: 'ch5',
    num: 5,
    kicker: '선택',
    title: '가장 큰 미래에 베팅하되, 자동 실현을 믿지 않는다',
    blocks: [
      {
        type: 'p',
        text: '삼성의 선택은 Main Bet 시나리오 B다. 확률이 가장 높고(39%), 시장이 가장 크고($5,200억), 삼성의 동서 균형 포지션 — 평택·시안·텍사스를 모두 가진 유일한 플레이어 — 이 최대 가치를 발휘하는 미래이기 때문이다. 그러나 시나리오 B는 저절로 실현되지 않는다. B가 와도 SK하이닉스의 선점이 유지되는 미래와, 삼성이 1번 자리를 되찾는 미래가 갈린다. 그래서 Main Bet은 5개의 실행 이니셔티브로 구체화된다.',
        refs: 'wiki/scenarios/strategy.md',
      },
      {
        type: 'ol',
        items: [
          'MB-1 HBM4E·HBM5 기술 1위 탈환 — NVIDIA 듀얼소싱 1번 공급사 지위 확보',
          'MB-2 동서 균형 공급망 — 시안 유지 + 텍사스 + 인도, 유일한 글로벌 플레이어 포지션',
          'MB-3 1c nm 공정 조기 전환 — 원가 우위 복원',
          'MB-4 커스텀 AI 메모리 솔루션 — HBM+CXL+PIM+CMX 복합, 핵심전략 평가 임팩트·창의성·모방난이도 만점',
          'MB-5 텍사스 테일러 2기 — 미국 현지 HBM 생산',
        ],
      },
      {
        type: 'p',
        text: '동시에, 나머지 미래를 버리지 않는다. 시나리오 A·C·D·E 각각에 Side Bet을 배치한다 — 시안 팹 축소 Plan B와 일본 R&D 허브(A), 비중국 소재 공급선과 순현금 버퍼(C), HBM 조직 독립 P&L과 산업용 AI 메모리(D), 3D DRAM + IMEC 협약 + CXL 표준 주도권(E). 특히 E 헤지는 "2030년대 후반 게임 체인저는 3D DRAM과 CXL"이라는 외부 전문가 진단과 정합한다.',
        refs: 'wiki/scenarios/strategy.md · wiki/scenarios/core-strategy-selection.md · sources/articles/youtube-kwon-seokjun-2026-04-11.md',
      },
    ],
    sources: 'wiki/scenarios/strategy.md · wiki/strategies/core/*.md',
  },
  {
    id: 'ch6',
    num: 6,
    kicker: 'Robust 구조',
    title: '어떤 미래에도 지지 않는 구조',
    blocks: [
      {
        type: 'p',
        text: '베팅과 헤지 아래에는 더 근본적인 층이 있다. 시나리오와 무관하게 — 다섯 개 미래 전부에서 — 가치를 만드는 9개 불변전략(RS-1~9)이다. 9개 전략 × 5개 시나리오 = 45셀 모두에서 긍정 가치가 확인됐다. 구조는 네 축이다.',
        refs: 'wiki/strategies/invariant/README.md',
      },
      {
        type: 'ul',
        items: [
          '공급 거버넌스 — RS-1 옵션형 캐파("켜고 끌 수 있는 능력") + RS-5 재무 규율(다운사이클 capex 하한 4조 원/년, Nucor·ExxonMobil 벤치마크) + 발동 시점을 알려주는 RS-9 수요 변곡 센싱',
          '포트폴리오 — RS-2 바벨(HBM ↔ 범용 1c nm) + RS-6 공정 리더십(1c nm + NAND 주기 연장 + Hybrid Bonding 자체 IP). 2026 Q1 일반 DRAM 마진 > HBM 마진 사건이 바벨의 가치를 실시간 증명',
          '고객 관계 — RS-3 전환비용 극대화(NVIDIA CMX·SCADA·FDP 통합) + RS-4 고객 분산(LTA·Take-or-Pay·단일 고객 ≤25%)',
          '신규 도구 — RS-7 AI 엔지니어링 자동화 + RS-8 구조화 매출 헷지(매출 변동성 ±25%→±12%)',
        ],
      },
      {
        type: 'p',
        text: '이 구조는 결정으로 실행된다. 2026년 4분기까지 묶음으로 처리해야 할 17개 결정(D1~D17)이 마감 클러스터 D-150·D-240·D-330으로 배열되어 있다 — 가장 임박한 묶음에는 HBM4 점유율 회복(D1), 이사회 정책화(D6), 수요 변곡 조기경보 운영(D15), 호황 정점 공급 규율 즉시 발동(D16, critical)이 들어 있다. 17개를 낱개로 흩으면 효과가 사라진다 — 묶음이 곧 전략이다.',
        refs: 'wiki/scenarios/strategy.md · wiki/benchmark/cyclical-strategy-benchmark.md · wiki/concepts/2026-q1-current-state.md',
      },
    ],
    sources: 'wiki/strategies/invariant/README.md · wiki/scenarios/strategy.md',
  },
  {
    id: 'ch7',
    num: 7,
    kicker: '대안 비교 논증',
    title: '왜 이 선택인가 — 세 개의 대안과 비교하면',
    blocks: [
      {
        type: 'p',
        text: '이 제안의 우수성은 대안과 나란히 놓을 때 분명해진다.',
      },
      {
        type: 'p',
        text: '대안 1: 단일 시나리오 올인 — "B가 가장 유력하니 HBM에 전부 건다." 가장 흔한 선택이고, 39%의 확률로 최대 수익을 준다. 그러나 61%의 확률로 틀린다. HBM이 꺼지는 순간 전용 캐파는 좌초자산이 되고 HBM↔DDR 상쇄로 shortage가 oversupply로 반전된다는 것이 삼성 상품기획 수장의 자체 진단이다. 30년간 다섯 번의 다운턴이 증명하듯, 사이클 산업에서 올인은 전략이 아니라 도박이다.',
        refs: 'sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md · wiki/concepts/semiconductor-cycle.md',
      },
      {
        type: 'p',
        text: '대안 2: 현상 유지·관망 — "호황이니 지금 구조로 이익을 극대화한다." 정점의 이익은 지켜주지만, 이미 진행 중인 구조적 패배를 방치한다. HBM4 배정에서 밀린 채 관망하면 HBM4E·HBM5 세대에서도 후순위가 고착되고, 다운턴이 오면 점유율 열위 상태로 맞는다. 영업 수장조차 "충분히 올랐다, 파티할 때가 아니다"라며 2차 방어선을 요구하는 국면이다.',
        refs: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
      },
      {
        type: 'p',
        text: '대안 3: 전면 방어·수축 — "버블이 무섭니 투자를 줄이고 현금을 쌓는다." C·D 시나리오(합산 29%)에서는 옳지만, 71%의 확률로 성장 미래를 통째로 내준다. 다운사이클에 R&D를 삭감한 기업이 회복기에 경쟁력을 잃는다는 것이 사이클 산업 7개 벤치마크의 공통 교훈이다.',
        refs: 'wiki/benchmark/cyclical-strategy-benchmark.md',
      },
      {
        type: 'quote',
        text: '본 제안 — 확률가중 베팅 + Robust 헤지 + 데이터 트리거 — 는 세 대안의 강점만 취한다. 가장 큰 미래를 공략하고(대안 1의 상방), 어떤 미래에서도 흑자 구조를 유지하며(대안 3의 하방 방어), 전환 시점 판단을 사람의 낙관이 아니라 EWI 데이터에 위임한다(대안 2가 놓치는 규율).',
        context: '24개 후보 전략의 임팩트×창의성×모방난이도 점수화 + 45셀 가치 매트릭스 재검증으로 입증',
      },
      {
        type: 'p',
        text: '반론도 수용한다 — "Robust는 공짜가 아니다"라는 비판은 옳다. 옵션형 캐파와 헤지에는 기회비용이 있다. 그러나 메모리 가격 변동성(σ 60~120%)이 원유(30%)의 2~4배인 산업에서, 변동성 관리의 기대가치는 그 비용을 압도한다.',
        refs: 'wiki/scenarios/core-strategy-selection.md · wiki/scenarios/robust-reverification.md · wiki/benchmark/agri-hedging-to-memory-semi.md',
      },
      {
        type: 'h',
        text: '렌즈 교차 검증 — 네 개의 다른 프레임워크가 같은 곳을 가리킨다',
      },
      {
        type: 'p',
        text: '이 논증의 마지막 방어선은 프레임워크 자체를 바꿔보는 것이다. 같은 위키 지식을 파이브 포스·게임이론·실물옵션·파괴적 혁신으로 독립적으로 다시 풀어 각 렌즈의 최적 전략을 도출한 결과(상단 하위 메뉴), 서로 다른 목적함수에서 같은 전략들이 반복 선택됐다.',
      },
      {
        type: 'table',
        headers: ['전략', '파이브 포스', '게임이론', '실물옵션', '파괴적 혁신', '시나리오 플래닝'],
        rows: [
          ['RS-3·RS-8·RS-4 (락인·계약 구조)', '1순위', '2순위', '1순위(풋)', '—', 'Robust'],
          ['RS-5·D16 (정점 규율)', '—', '1순위', '1순위(풋)', '—', 'Robust·critical'],
          ['RS-1 (옵션형 캐파)', '—', '3순위(억지력)', '2순위', '—', 'Robust'],
          ['SE-1·SE-2 (3D DRAM·CXL)', '2순위(대체재 흡수)', '—', '3순위(전환옵션)', '1순위(별동대)', 'Side Bet E'],
          ['RS-6·RS-2 (원가·바벨)', '4순위', '4순위(게임 분리)', '2순위(전환권)', '3순위(로엔드 잔류)', 'Robust'],
        ],
      },
      {
        type: 'p',
        text: '수렴의 의미는 두 겹이다. 첫째, 네 렌즈 전부가 지지하는 전략(계약 구조·정점 규율·옵션 캐파·차세대 별동대·바벨)은 프레임워크 불변(framework-invariant) — 어떤 이론으로 세상을 봐도 해야 하는 일이며, Robust 개념의 메타 검증이다. 둘째, 렌즈들이 갈라지는 지점은 경고로 읽는다 — 파이브 포스와 파괴적 혁신은 MB-1(1위 탈환)의 한계를, 게임이론은 MB 실행이 캐파 경쟁으로 흐를 위험을, 실물옵션은 확정 집중의 형태 리스크를 지적한다. 결론: Main Bet은 유지하되 실행은 인증·기술 순위전으로 한정하고, 확정 최소·옵션 최대 구조로 집행하며, 구조 전략(락인·표준)과 차세대 별동대에 최우선 자원을 배분한다.',
        refs: 'wiki/storyline/storyline-five-forces.md · wiki/storyline/storyline-game-theory.md · wiki/storyline/storyline-real-options.md · wiki/storyline/storyline-disruption.md',
      },
    ],
    sources: 'wiki/scenarios/core-strategy-selection.md · wiki/scenarios/robust-reverification.md · wiki/benchmark/cyclical-strategy-benchmark.md · wiki/storyline/storyline-five-forces.md',
  },
  {
    id: 'ch8',
    num: 8,
    kicker: '감시와 전환',
    title: '이야기는 데이터가 계속 쓴다',
    blocks: [
      {
        type: 'p',
        text: '이 스토리의 마지막 장은 열려 있다. 어느 시나리오가 실현될지는 예측이 아니라 감시의 대상이기 때문이다. 그래서 전략의 마지막 조각은 조기경보 체계(EWI)다. GPU 현물 임대가·신용 스프레드·스팟-계약 괴리·재고일수·발주-셀스루 갭을 주간 감시하는 수요 변곡 EWI 앙상블과, 2030년 수요의 실현 가능성을 제약하는 4대 병목(전력·CAPEX/ROI·파운드리·패키징) 정량 모델이 두 레이어를 이룬다. 병목 모델의 하방 민감도 분석은 버블 붕괴의 가장 유력한 진입 경로가 기술이 아니라 투자수익률 재평가(CAPEX/ROI -31.5%)임을 보여준다.',
        refs: 'sources/raw-notes/demand-inflection-ewi-2026-06.md · sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md',
      },
      {
        type: 'quote',
        text: '꼭짓점은 FCF다 — CapEx가 늘어나는데 FCF가 흑자에서 마이너스로 반전되는 순간이 진짜 하락 신호.',
        context: '이창수 부사장(메모리 영업팀장) 인터뷰 렌즈 — EWI에 이식',
      },
      {
        type: 'p',
        text: '경보는 행동과 배선되어 있다. 빅테크 CapEx 25%+ 삭감, GPU 임대가 6개월 -35%, MATCH 법안 통과 같은 트리거가 발동하면 RS-1 캐파 동결·RS-5 규율 전면 발동·시안 Plan B 같은 사전 정의된 행동이 30일 내 집행된다. 요컨대 이 스토리라인은 완결된 예언이 아니라 자기 갱신하는 전략 서사다. 새 소스가 들어오면 확률이 움직이고, 확률이 움직이면 전략 배분이 조정되고, 트리거가 발동하면 장이 다시 쓰인다. 호황의 정점이 다운턴 준비의 마지막 기회라는 것 — 그것이 이 이야기가 지금 여기서 멈추지 않는 이유다.',
        refs: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · wiki/scenarios/strategy.md',
      },
    ],
    sources: 'wiki/concepts/demand-inflection-ewi.md · wiki/concepts/bottleneck-model-2030.md · wiki/strategies/invariant/rs9-demand-inflection-sensing.md',
  },
]
