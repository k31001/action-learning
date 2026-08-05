// 스토리라인 — 대안 프레임워크 렌즈 4종 미러
// 단일 소스: wiki/storyline/storyline-{five-forces,game-theory,real-options,disruption}.md
// 시나리오 플래닝 마스터 서사는 data/storyline.js. 이 파일은 "같은 위키 지식을 다른 기법으로
// 재서사화"한 자매 스토리라인들의 미러다. 수치·서사 변경은 위키 먼저.

export const STORYLINE_LENSES = [
  // ── 파이브 포스 ────────────────────────────────────────────────────────────
  {
    id: 'five-forces',
    label: '파이브 포스',
    short: '협상력의 지도',
    color: '#0EA5E9',
    title: '협상력의 지도를 다시 그리는 싸움',
    thesis:
      '시나리오로 보면 미래가 다섯 개지만, 포터의 다섯 힘으로 보면 싸움은 하나다 — AI 메모리 가치사슬에서 협상력이 어디에 쌓이는가. 삼성의 전략은 전부 "다섯 힘의 화살표를 자기 쪽으로 꺾는 작업"으로 다시 읽을 수 있다.',
    wikiSource: 'wiki/storyline/storyline-five-forces.md',
    visual: {
      kind: 'forces',
      center: { label: '산업 내 경쟁', sub: '3사 과점 — 절제 균형 (일시적)' },
      forces: [
        { pos: 'top',    label: '신규 진입 위협', sub: 'CXMT·YMTC', level: '높음·상승', color: '#FF3B30' },
        { pos: 'right',  label: '구매자 협상력', sub: 'NVIDIA·하이퍼스케일러', level: '매우 높음 ↘ 균열', color: '#FF9500' },
        { pos: 'bottom', label: '대체재 위협', sub: '3D DRAM·CXL·커스텀 ASIC', level: '잠복', color: '#AF52DE' },
        { pos: 'left',   label: '공급자 협상력', sub: 'TSMC·ASML', level: '중간·국지적 강함', color: '#34C759' },
      ],
    },
    sections: [
      {
        num: 1,
        title: '구매자 — 산업 역사상 가장 강한 고객, 그러나 균열이 시작됐다',
        blocks: [
          {
            type: 'p',
            text: '이 산업의 이익 지도를 지배하는 것은 구매자다. NVIDIA는 HBM4 공급 배정을 사실상 단독으로 결정하며 — Vera Rubin 배정에서 SK하이닉스 60~70%, 삼성 25~30%로 갈랐다 — AI 데이터센터에서 60%대 영업이익률을 가져가는 동안 메모리 3사는 슈퍼사이클 정점에도 그 절반 이하를 가져간다. 애플이 중국 내수용 DRAM에서 CXMT 카드를 꺼내 가격 지렛대를 만드는 것도 같은 구매자 권력의 행사다.',
            refs: 'sources/articles/july-2026-market-update-2026-07-04.md · sources/articles/apple-cxmt-china-dram-2026-07-08.md · wiki/scenarios/strategy.md',
          },
          {
            type: 'p',
            text: '그런데 2026년, 힘의 방향이 처음으로 흔들리고 있다. 공급 부족 국면에서 구매자들이 스스로 take-or-pay 멀티이어 계약에 서명하고 수백억 달러 선수금을 예치하기 시작했다 — NTB 가격 하한까지 계약에 박힌다. 마이크론의 SCA 16건 $100B가 이 구조의 산업 표준화를 보여준다. 구매자 권력의 원천이 "언제든 갈아탈 수 있음"이라면, 다년 락인은 그 원천을 스스로 봉인하는 행위다. RS-3(전환비용 극대화)와 RS-4(LTA·Take-or-Pay)는 이 균열을 구조로 굳히는 전략이다.',
            refs: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · sources/filings/micron-q3-fy26.md · wiki/strategies/invariant/README.md',
          },
        ],
      },
      {
        num: 2,
        title: '산업 내 경쟁 — 6강의 살육전에서 3강의 절제 균형으로',
        blocks: [
          {
            type: 'p',
            text: '현재의 경쟁 강도는 역사의 산물이다. 두 차례 치킨게임(2007~09, 2010~13)이 키몬다·엘피다·대만 진영을 퇴출시키고 6강을 3강으로 압축했으며, "3사는 6사가 할 수 없는 공급 규율 조율이 가능하다"는 구조를 남겼다. 지금의 경쟁은 가격 살육전이 아니라 NVIDIA 인증 슬롯을 둘러싼 기술 순위전이다 — 33년 만의 DRAM 역전과 HBM 17% 추락이 보여주듯, 이 순위전에서 밀리는 비용은 점유율 몇 %p가 아니라 세대 전체다.',
            refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md · wiki/concepts/dram-market-share.md',
          },
        ],
      },
      {
        num: 3,
        title: '신규 진입 — 국가가 뒤에 서 있는 진입자',
        blocks: [
          {
            type: 'p',
            text: '교과서적으로 메모리는 진입장벽이 극도로 높은 산업이지만, CXMT는 빅펀드와 IPO의 이중 자금원으로 그 장벽을 국가 재정으로 넘고 있다 — DDR5 수율 80%+, HBM3 양산 개시, 월 30만 장 캐파. 진입 억지의 고전 수단(가격 보복)은 국가 보조 진입자에게 통하지 않는다. 그래서 삼성의 대응은 다른 층으로 올라간다 — RS-6 공정 리더십(1c nm 원가 우위)으로 로엔드 방어선을 치고, MB-4 커스텀 솔루션으로 진입자가 오를 수 없는 고부가 층을 만든다.',
            refs: 'wiki/concepts/2026-q1-current-state.md · wiki/entities/cxmt.md · wiki/scenarios/strategy.md',
          },
        ],
      },
      {
        num: 4,
        title: '공급자와 대체재 — 조용하지만 결정적인 두 힘',
        blocks: [
          {
            type: 'p',
            text: '공급자 힘은 국지적으로 강하다. 첨단 패키징(CoWoS)은 TSMC가 NVIDIA 배정 60%를 쥐고 있고, 노광은 ASML 독점이다. Hybrid Bonding 자체 IP(RS-6)와 일본 R&D 허브의 NIL(EUV 우회, SA-2)은 공급자 종속을 끊는 수직 통합 수다. 대체재는 잠복 중인 최대 변수다 — HBM의 대체재(3D DRAM·PIM·CXL·커스텀 ASIC 내장 메모리)는 아직 로드맵 위에 있지만, 대체가 시작되면 HBM 집중 투자 전체가 좌초된다(시나리오 E). SE-1(3D DRAM)·SE-2(CXL 표준 주도권)는 대체재 위협을 자기 포트폴리오 안으로 흡수하는 고전적 응수다.',
            refs: 'sources/articles/july-2026-market-update-2026-07-04.md · wiki/entities/tsmc.md · wiki/driving-forces/key-drivers.md · wiki/scenarios/strategy.md',
          },
        ],
      },
      {
        num: 5,
        title: '이 렌즈의 결론',
        blocks: [
          {
            type: 'quote',
            text: '모든 힘의 화살표를 자기 쪽으로 꺾어라 — 구매자에게는 전환비용과 계약 구조로, 경쟁자에게는 기술 순위전 승리와 절제 균형으로, 진입자에게는 원가 방어선으로, 공급자에게는 내재화로, 대체재에게는 흡수로.',
            context: '시나리오 렌즈가 "어느 미래에 베팅할까"를 묻는다면, 이 렌즈는 "어느 미래가 와도 협상력 구조에서 이겨야 이익이 남는다"를 보여준다',
          },
        ],
      },
    ],
  },

  // ── 게임이론 ───────────────────────────────────────────────────────────────
  {
    id: 'game-theory',
    label: '게임이론',
    short: '치킨게임에서 약속의 게임으로',
    color: '#FF9500',
    title: '치킨게임에서 약속의 게임으로',
    thesis:
      '메모리 산업은 두 번의 치킨게임으로 경기자를 6명에서 3명으로 줄였고, 지금은 절제가 균형인 반복게임을 두고 있다 — 삼성의 전략은 이 균형을 유지하는 약속 장치(commitment device)를 쌓되, 균형을 깨는 이단 경기자(CXMT)의 등장에 별도의 게임으로 대응하는 것이다.',
    wikiSource: 'wiki/storyline/storyline-game-theory.md',
    visual: {
      kind: 'chain',
      stages: [
        { label: '1기 치킨게임', sub: '2007~09 · 6강 · Qimonda 퇴출', color: '#FF3B30' },
        { label: '2기 치킨게임', sub: '2010~13 · Elpida·대만 퇴출', color: '#FF9500' },
        { label: '3강 반복게임', sub: "절제 균형 · 'with discipline'", color: '#34C759' },
        { label: '약속의 게임', sub: '2026 · take-or-pay·SCA·NTB', color: '#007AFF' },
        { label: '새 게임?', sub: 'CXMT — 국가보조 경기자', color: '#AF52DE' },
      ],
    },
    sections: [
      {
        num: 1,
        title: '원게임 — 치킨게임은 왜 두 번이나 벌어졌나',
        blocks: [
          {
            type: 'p',
            text: '일회성 대칭 게임에서 증설은 지배전략에 가깝다 — 내가 절제해도 상대가 증설하면 점유율만 잃는다. 그래서 2007~09년 6강 전원이 증설·버티기를 선택했고, DRAM 가격은 2007년 -85%, 2008년 -58%로 붕괴했다. 키몬다가 누적 손실 $30억을 견디지 못하고 2009년 1월 퇴출됐고, 퇴출 발표 직후 현물가가 급등하며 "경기자 수가 곧 가격"임을 실증했다. 2012년에는 엘피다(부채 4,480억 엔, 전후 일본 제조업 최대 파산)와 대만 진영이 퇴장했다. 삼성은 이 게임의 승자였다 — 위기 직후인 2010년 메모리 시설투자를 5.5조에서 9조 원으로 올리는 역사이클 증설로 회복기 점유율을 흡수했다.',
            refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md',
          },
        ],
      },
      {
        num: 2,
        title: '반복게임 — 3강 체제에서 절제는 균형이 된다',
        blocks: [
          {
            type: 'p',
            text: '경기자가 3명으로 줄자 게임의 성격이 바뀌었다. 반복게임에서는 미래 보복의 그림자가 현재의 절제를 지탱한다. 2026년 이 균형은 공개 신호로 유지되고 있다: 마이크론 CEO는 "shortage well beyond 2026"을 말하며 한 발표에서 "with discipline"을 4회 반복했고, HBM 점유율을 DRAM 점유율에 묶어 웨이퍼 잠식을 회피한다고 공시했다. 경쟁사가 동시에 절제하는 환경에서는 삼성의 단독 절제가 점유율 손실로 이어질 우려도 약화된다. RS-5(재무 규율)와 RS-1(옵션형 캐파)은 삼성이 이 균형에 내는 판돈이다 — 절제를 내부 거버넌스로 명문화해 스스로 이탈 유혹을 차단한다.',
            refs: 'sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md · sources/filings/micron-q3-fy26.md · wiki/strategies/invariant/README.md',
          },
        ],
      },
      {
        num: 3,
        title: '약속 장치 — 계약이 게임의 보수 구조를 바꾼다',
        blocks: [
          {
            type: 'p',
            text: '2026년의 진짜 혁신은 공급자-구매자 게임에서 일어났다. 사이클의 근원은 수요자의 이탈 자유와 공급자의 증설 유혹이 서로를 증폭하는 데 있다. take-or-pay 멀티이어 계약·수백억 달러 선수금 예치·NTB 가격 하한은 양쪽의 이탈 옵션을 계약으로 태워버리는 약속 장치다 — "구매 의무를 저버리면 개수×판가로 캐시에서 차감"되는 구조는 배신의 비용을 명시화한다. 마이크론 SCA 16건 $100B의 공시 제도화가 이를 산업 표준으로 만들었고, UBS는 "LTA가 메모리 순환성을 근본적으로 제거한다"고까지 평가한다. 게임이론적으로 이것은 치킨게임의 핸들을 뽑아 창밖으로 던지는 고전적 수다. RS-8·RS-4는 이 약속 게임에서 삼성 몫의 계약 설계다.',
            refs: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · sources/articles/lta-to-sca-industry-context-2026-06.md · sources/filings/micron-q3-fy26.md',
          },
        ],
      },
      {
        num: 4,
        title: '이단 경기자 — CXMT는 다른 보수함수로 게임한다',
        blocks: [
          {
            type: 'p',
            text: '이 균형의 최대 위협은 3강 내부가 아니라 외부에 있다. CXMT는 이윤 극대화가 아니라 국가 목표(반도체 자립)를 보수함수로 갖는 경기자다 — 빅펀드 III와 IPO의 이중 자금원, DDR5 수율 80%+, HBM3 양산 개시. 손실을 국가가 흡수하는 경기자에게는 가격 보복이 억지력을 갖지 못한다. 따라서 대응 게임이 달라진다: 같은 코스트 게임을 받아주는 대신, RS-6(1c nm 원가 우위)으로 로엔드의 손실 한계를 관리하고, RS-2(바벨)·MB-4(커스텀 솔루션)로 국가보조가 닿지 않는 고부가 층으로 게임판을 옮긴다. 중국 시장이 미주 AI 사이클과 비동조화되어 있다는 관찰도 이 게임의 분리 가능성을 지지한다.',
            refs: 'wiki/entities/cxmt.md · wiki/concepts/2026-q1-current-state.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
          },
        ],
      },
      {
        num: 5,
        title: '이 렌즈의 결론',
        blocks: [
          {
            type: 'quote',
            text: '첫째, 절제 균형을 지켜라(RS-5·RS-1, 균형 이탈 = D16 발동 신호). 둘째, 약속 장치를 쌓아라(take-or-pay·NTB·SCA). 셋째, 이단 경기자와는 다른 판에서 싸워라(원가 방어선 위에 커스텀·솔루션 층).',
            context: '시나리오 렌즈의 "다섯 개의 미래"는 이 렌즈에서 "균형이 유지되는 미래(A·B)와 균형이 깨지는 미래(C·D·E)"로 다시 읽힌다',
          },
        ],
      },
    ],
  },

  // ── 실물옵션 ───────────────────────────────────────────────────────────────
  {
    id: 'real-options',
    label: '실물옵션',
    short: '변동성이 클수록 옵션은 비싸진다',
    color: '#007AFF',
    title: '변동성이 클수록 옵션은 비싸진다',
    thesis:
      '메모리처럼 변동성(σ 60~120%)이 극단적인 산업에서 "확정 투자"는 가장 비싼 선택이다 — 삼성의 전략 포트폴리오는 사실상 콜·풋·전환·포기 옵션의 묶음이며, EWI는 그 옵션들의 행사 신호 시스템이다.',
    wikiSource: 'wiki/storyline/storyline-real-options.md',
    visual: {
      kind: 'grid',
      note: '기초 불확실성: DF1·DF2·DF3, σ 60~120% → 모든 옵션의 행사 신호는 RS-9 수요 변곡 EWI·트리거',
      cells: [
        { label: '콜옵션 — 상방 참여', desc: 'RS-1 옵션형 캐파(Fab Shell + 단계 반입) · MB-5 텍사스 2기 · D9 다운사이클 M&A 펀드(EV/EBITDA 5배 트리거)', color: '#34C759' },
        { label: '풋옵션 — 하방 보호', desc: 'RS-8 Participating Forward Floor(변동비+5~10%) · take-or-pay·NTB 계약 바닥 · Three-way Collar 절대 금지', color: '#FF3B30' },
        { label: '전환옵션 — 갈아타기', desc: 'SE-1 3D DRAM + IMEC · SE-2 CXL 표준 · RS-2 바벨 믹스 전환권(2026 Q1 범용>HBM 마진으로 실증)', color: '#AF52DE' },
        { label: '포기옵션 — 손절 설계', desc: '시안 팹 단계적 축소 Plan B · Rubin 진입 포기 옵션 평가(KPI 윈도우 HBM4E·5 이동)', color: '#8E8E93' },
      ],
    },
    sections: [
      {
        num: 1,
        title: '왜 옵션인가 — 이 산업의 변동성은 확정 투자를 벌한다',
        blocks: [
          {
            type: 'p',
            text: '메모리 가격 변동성은 σ 60~120%로 원유(30%)·주식시장(18%)의 2~4배에 달하고, 2025년 하반기에는 16Gb DDR5가 넉 달 만에 +297% 점프했다. 옵션 가치는 변동성에 비례한다 — 이 산업에서 "결정을 나중에 내릴 권리"와 "하방을 잘라낼 권리"는 금융시장 어디보다 비싸다. 지난 30년 다섯 번의 다운턴마다 이익의 84%가 사라진 역사는, 확정 캐파·확정 가격으로 이 변동성을 정면으로 받아온 비용의 기록이다. 결론은 단순하다: 캐파·가격·기술·지역 — 네 영역 모두에서 "확정"을 "옵션"으로 바꿔라.',
            refs: 'wiki/benchmark/agri-hedging-to-memory-semi.md · wiki/concepts/semiconductor-cycle.md',
          },
        ],
      },
      {
        num: 2,
        title: '콜옵션 — 상방을 사되, 프리미엄만 내라',
        blocks: [
          {
            type: 'p',
            text: 'RS-1 옵션형 캐파는 교과서적 콜옵션 구조다: Fab Shell(건물)을 선행 투자하고 장비 반입을 단계화하면, 수요 상방이 실현될 때만 잔여 행사가격(장비 capex)을 지불한다. MB-5 텍사스 테일러 2기도 같은 구조다 — 1단계 가동과 보조금 협상으로 미국 생산의 옵션을 확보하되, 본격 행사는 수요 확인 후로 미룬다. 가장 우아한 콜은 D9 다운사이클 M&A 펀드다: EV/EBITDA 5배 이하 6개월 지속이라는 행사 조건을 사전에 정의하고 5,000억 원의 프리미엄을 미리 적립해, 자산 가격 폭락을 매수 기회로 바꾼다.',
            refs: 'wiki/strategies/invariant/rs1-options-based-capacity.md · wiki/scenarios/strategy.md',
          },
        ],
      },
      {
        num: 3,
        title: '풋옵션 — 하방을 계약으로 잘라낸다',
        blocks: [
          {
            type: 'p',
            text: 'RS-8의 Participating Forward는 명시적 풋 구조다: Floor(변동비+5~10%)를 보장받고 상방의 50%에 참여한다 — 매출 변동성을 ±25%에서 ±12%로 절반 축소한다. 금지 조항 하나가 옵션 설계의 정수를 보여준다: sub-put을 매도해 프리미엄을 아끼는 Three-way Collar는 절대 금지 — 셰일 업계가 2014·2020년 두 차례 증명했듯, 아낀 프리미엄은 폭락 구간에서 손실 가속으로 돌아온다. 2026년 현재 이 풋은 이미 현실이 되고 있다 — take-or-pay 멀티이어 계약과 NTB 가격 하한이 "컬랩스가 와도 상당한 이익률"의 바닥을 계약으로 고정한다.',
            refs: 'wiki/benchmark/upside-participation-hedging.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
          },
        ],
      },
      {
        num: 4,
        title: '전환·포기옵션 — 갈아탈 권리와 손절할 권리',
        blocks: [
          {
            type: 'p',
            text: '기술 축의 불확실성(DF3)에는 전환옵션으로 대응한다. SE-1(3D DRAM + IMEC 협약)과 SE-2(CXL 표준 주도권)는 지금 소액의 프리미엄(R&D 재배분)으로 패러다임 전환 시 갈아탈 권리를 사두는 것이고, RS-2 바벨 포트폴리오는 HBM↔범용 사이의 믹스 전환권이다 — 2026년 1분기 일반 DRAM 마진이 HBM을 앞선 순간, 이 전환권의 가치는 실증됐다. 반대편에는 포기옵션이 있다: 시안 팹 단계적 축소 Plan B와, KPI 미달 시 Rubin 세대를 건너뛰고 HBM4E·HBM5로 윈도우를 이동하는 진입 포기 옵션 평가가 그것이다.',
            refs: 'wiki/scenarios/strategy.md · wiki/concepts/2026-q1-current-state.md · wiki/driving-forces/key-drivers.md',
          },
        ],
      },
      {
        num: 5,
        title: '행사 신호 — EWI는 옵션 데스크의 시세판이다',
        blocks: [
          {
            type: 'p',
            text: '옵션 포트폴리오의 가치는 행사 타이밍이 결정한다. RS-9의 수요 변곡 EWI와 4대 병목 정량 모델은 각 옵션의 기초자산 가격을 실시간으로 읽는 시세판이다. 트리거는 행사 규칙이다 — GPU 임대가 6개월 -35%면 콜(증설) 동결·풋 점검, EV/EBITDA 5배 이하 6개월이면 M&A 콜 행사, 3D DRAM 전력 50% 개선 입증이면 전환옵션 행사. "꼭짓점은 FCF"라는 영업 현장의 렌즈는 이 시세판의 대표 지표다.',
            refs: 'sources/raw-notes/demand-inflection-ewi-2026-06.md · sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
          },
          {
            type: 'quote',
            text: '변동성이 역대 최고인 지금이야말로 옵션(유연성)의 가치가 역대 최고이며, 따라서 확정 증설·확정 가격이라는 "옵션 없는 전략"의 기회비용도 역대 최고다.',
            context: 'Main Bet = 내가격 포지션, Side Bet = 외가격 보험, Robust = 어떤 경로에서도 양(+)의 감마 — 시나리오 전략의 옵션 언어 번역',
          },
        ],
      },
    ],
  },

  // ── 파괴적 혁신 ────────────────────────────────────────────────────────────
  {
    id: 'disruption',
    label: '파괴적 혁신',
    short: '삼성은 이미 한 번 파괴당했다',
    color: '#AF52DE',
    title: '삼성은 이미 한 번 파괴당했다',
    thesis:
      '크리스텐슨의 렌즈로 보면 HBM 추락은 품질 사고가 아니라 전형적인 파괴 피해 사례다 — 주력 시장의 우등생이 주변부 니치를 과소평가하는 사이 니치가 주류가 됐다. 같은 패턴이 세 방향(로엔드 CXMT·차세대 3D DRAM/CXL·인접 AI SSD)에서 반복되려 하고 있으며, 전략의 핵심은 파괴자를 밖에 두지 않고 안에서 기르는 것이다.',
    wikiSource: 'wiki/storyline/storyline-disruption.md',
    visual: {
      kind: 'grid',
      note: '제1막(완료): HBM = 신시장 파괴 — 니치 → NVIDIA 본선 → 삼성 40%→17% 추락. 2026년 삼성은 파괴 피해자에서 대응자로.',
      cells: [
        { label: '로엔드 파괴 (진행)', desc: 'CXMT — 범용 DRAM 하단 잠식. DDR5 수율 80%+ · 애플 인증 테스트 = 임계 신호. 대응: RS-6 원가 방어 + RS-2 바벨', color: '#FF3B30' },
        { label: '차세대 파괴 (잠복)', desc: '3D DRAM·PIM·CXL — 2030년대 게임 체인저 후보. 대응: SE-1·SE-2 자기잠식 수용 별동대', color: '#AF52DE' },
        { label: '인접 파괴 (임계)', desc: 'AI SSD — SK·Kioxia SCADA 선점, HBM 패턴 반복 위험. 대응: CMX 파트너 지위 + FDP 소프트웨어 층', color: '#FF9500' },
        { label: '대응 원칙', desc: '파괴자를 안에서 기른다 — 조직 분리(SD-1) · 자기잠식 허용 · 니치 조기 진입 · 궤적 교차점 EWI 감시', color: '#34C759' },
      ],
    },
    sections: [
      {
        num: 1,
        title: '제1막 — HBM은 삼성을 어떻게 파괴했나',
        blocks: [
          {
            type: 'p',
            text: '교과서의 파괴는 이렇게 진행된다: 주변부의 열등해 보이는 기술이 니치에서 출발하고, 주력 시장의 강자는 그것을 "작은 시장·낮은 마진"으로 합리적으로 무시하며, 니치가 성능 궤적을 타고 올라와 주류의 요구 수준을 충족하는 순간 지위가 역전된다. HBM이 정확히 이 경로를 걸었다. 범용 DRAM의 절대 강자였던 삼성에게 초기 HBM은 니치였다 — HBM 하나가 DDR 4~5개 캐파를 희생시키는 구조는 주력 사업의 논리로는 매력이 없다. 그러나 AI가 니치를 본선으로 바꿨고, 결과는 40%에서 17%로의 추락과 33년 만의 DRAM 왕좌 상실이었다. 삼성을 이긴 것은 더 나은 범용 DRAM이 아니라, 범용 DRAM의 성공 공식이 무시하게 만든 다른 궤적이었다.',
            refs: 'sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md · wiki/concepts/dram-market-share.md',
          },
        ],
      },
      {
        num: 2,
        title: '제2막 (진행 중) — CXMT의 로엔드 파괴',
        blocks: [
          {
            type: 'p',
            text: 'CXMT는 "충분히 좋은(good enough)" 품질 — DDR5 수율 80%+, 글로벌 빅3 근접 — 을 낮은 가격과 국가 보조로 무장하고 시장 하단에서 진입 중이며, 애플이 중국 내수용 기기에 CXMT DRAM 테스트를 시작한 사건은 "로엔드 진입자가 메인스트림 고객의 인증 문턱에 도달"하는 파괴의 임계 신호다. 크리스텐슨의 처방은 도망(상위 이동)이 아니라 이중 대응이다: 로엔드에서 원가로 맞서 잠식 속도를 늦추고(RS-6 1c nm), 동시에 상위 층의 가치를 새로 만든다(MB-4). 상위 이동만 하는 기업은 결국 옥상까지 몰린다 — 그래서 RS-2 바벨은 로엔드(범용)를 버리지 않는 구조 그 자체다.',
            refs: 'wiki/concepts/2026-q1-current-state.md · sources/articles/apple-cxmt-china-dram-2026-07-08.md · wiki/scenarios/strategy.md',
          },
        ],
      },
      {
        num: 3,
        title: '제3막 (잠복) — 3D DRAM·CXL은 HBM의 HBM이다',
        blocks: [
          {
            type: 'p',
            text: 'HBM에게 당한 일은 HBM에게도 일어날 수 있다. 3D DRAM·PIM·CXL은 지금의 HBM에게 "열등해 보이는 대안"이지만, 궤적이 교차하는 순간 40조 원+ HBM 투자가 좌초된다 — 시나리오 E의 세계다. 외부 전문가 진단도 "2030년대 후반 게임 체인저 = 3D DRAM + CXL"을 지목한다. 크리스텐슨이 남긴 유일하게 검증된 해법은 자기잠식을 수용하는 별동대다 — 주력 조직의 자원 배분 논리에서 분리된 조직만이 파괴 기술을 진심으로 키울 수 있다. SE-1(3D DRAM 전담 + IMEC)과 SE-2(CXL 표준 주도권)는 정확히 이 구조이고, SD-1(HBM 조직 독립 P&L)은 같은 원칙의 또 다른 적용이다. 커스텀 HBM 퇴조론 vs zHBM 부상론의 사내 논쟁 자체가, 다음 궤적이 이미 형성되고 있다는 신호다.',
            refs: 'wiki/driving-forces/key-drivers.md · sources/articles/youtube-kwon-seokjun-2026-04-11.md · sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md',
          },
        ],
      },
      {
        num: 4,
        title: '제4막 (임계) — AI SSD에서 HBM 패턴이 반복되려 한다',
        blocks: [
          {
            type: 'p',
            text: 'NVIDIA SCADA(GPU 네이티브 스토리지)에서 SK하이닉스·Kioxia가 SLC 기반 초고 IOPS AI SSD로 전략 파트너를 선점하고 있다 — HBM에서 벌어진 "니치 선점 → 레퍼런스 고착 → 구조적 열위"가 SSD에서 반복될 수 있는 구도다. 이번에는 삼성이 니치를 무시하지 않는다는 것이 차이다: PM1763 시연·CMX 공식 공급 파트너 지위를 발판으로 2026년 내 SCADA 호환 전략을 확정하는 것이 MB-4의 하위 과제로 명시돼 있고, FDP 호스트 협력 플랫폼은 하드웨어가 아니라 소프트웨어 층에서 전환비용을 쌓는 대응이다.',
            refs: 'wiki/entities/nvidia-cmx-scada.md · wiki/strategies/fdp-host-ssd-platform.md · wiki/scenarios/strategy.md',
          },
        ],
      },
      {
        num: 5,
        title: '이 렌즈의 결론',
        blocks: [
          {
            type: 'quote',
            text: '다시는 궤적을 밖에서 맞지 마라 — 로엔드 파괴에는 원가 방어와 바벨로, 차세대 파괴에는 자기잠식을 허락받은 별동대로, 인접 파괴에는 니치 단계의 조기 진입으로.',
            context: '시나리오 렌즈가 파괴를 "확률 6%의 시나리오 E"로 계량한다면, 이 렌즈는 파괴가 확률이 아니라 궤적임을 상기시킨다 — 궤적은 지금 이미 그려지고 있다',
          },
        ],
      },
    ],
  },
]
