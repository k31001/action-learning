// 스토리라인 — 대안 프레임워크 렌즈 5종 미러
// 단일 소스: wiki/storyline/storyline-{five-forces,game-theory,real-options,disruption,cmo}.md
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
        title: '이 렌즈가 도출하는 최적 전략 — 구조를 바꾸는 순서대로',
        blocks: [
          {
            type: 'p',
            text: '파이브 포스가 묻는 질문은 하나다: "이 산업이 벌어들이는 이익 전체 중, 삼성 몫을 구조적으로 키우려면 어떤 힘부터 꺾어야 하는가?" 힘이 셀수록, 그리고 지금 개선할 여지가 클수록 우선순위가 높다.',
          },
          {
            type: 'strategy',
            items: [
              {
                rank: 1,
                name: '구매자가 떠날 수 없게 만들어라 (RS-3 고객 락인 + RS-4·RS-8 계약 구조)',
                what: '두 가지다. 첫째, 삼성의 SSD·메모리를 NVIDIA의 소프트웨어 생태계(CMX 캐시 플랫폼·SCADA 스토리지 표준·FDP 데이터 배치 기술) 깊숙이 통합해서, 고객이 삼성을 떠나려면 자기 시스템을 뜯어고쳐야 하게 만드는 것(RS-3). 둘째, "사겠다고 약속한 물량은 안 사가도 돈을 내는" take-or-pay 계약과 "이 가격 밑으로는 안 판다"는 가격 하한(NTB)을 다년 계약에 못박는 것(RS-4·RS-8).',
                why: '이 산업에서 돈이 새는 가장 큰 구멍이 구매자이기 때문이다. NVIDIA는 AI 데이터센터에서 60%대 영업이익률을 가져가는데 메모리 3사는 정점에도 그 절반 이하다. 구매자가 강한 근본 이유는 "언제든 갈아탈 수 있어서"인데, 2026년 공급 부족 국면에서 고객들이 제 발로 다년 계약·선수금 예치에 들어오고 있다 — 힘의 원천(이탈 자유)을 잠글 드문 창이 지금 열려 있다. 실행 결정은 D12·D17.',
                links: [
                  { label: 'Strategy 탭 → Robust (RS-3·4·8)', hash: '#/strategy/robust' },
                  { label: 'Strategy 탭 → Decisions (D12·D17)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/strategies/invariant/rs3-customer-switching-cost.md · wiki/strategies/invariant/rs8-structured-revenue-hedging.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · sources/filings/micron-q3-fy26.md',
              },
              {
                rank: 2,
                name: '대체 기술을 남의 손에 두지 마라 (SE-1 3D DRAM · SE-2 CXL)',
                what: 'HBM을 언젠가 대체할 수 있는 차세대 기술(3D DRAM, CXL 메모리 연결 표준)을 삼성이 직접 개발·표준화해서, 대체재 위협을 외부의 적이 아니라 내 포트폴리오의 일부로 만드는 것. SE-1은 3D DRAM 전담 조직 + IMEC 공동연구, SE-2는 CXL 표준화 기구(SIG) 주도권 확보다.',
                why: '대체재는 아직 시장이 아니라 연구 로드맵 위에 있다(DF3). 위협이 잠복해 있는 지금이 흡수 비용이 가장 싼 시점이고, 대체가 실제로 시작된 뒤에는 아무리 협상력이 좋아도 소용없다.',
                links: [{ label: 'Strategy 탭 → Core (SE-1·SE-2)', hash: '#/strategy/core' }],
                refs: 'wiki/driving-forces/key-drivers.md · wiki/scenarios/strategy.md',
              },
              {
                rank: 3,
                name: '공급자 종속을 끊어라 (Hybrid Bonding 자체 IP + 나노임프린트)',
                what: '삼성이 남에게 의존하는 세 개의 목줄 — TSMC의 첨단 패키징(CoWoS, NVIDIA 물량 60% 배정권), ASML의 노광 장비 독점, YMTC가 쥔 차세대 접합(Hybrid Bonding) 특허 — 을 자체 기술로 대체하는 것. 접합 IP 자체 개발은 RS-6의 한 축이고, ASML 우회용 나노임프린트(NIL)는 일본 R&D 허브 전략(SA-2)이다.',
                why: '공급자 힘은 세지만 국지적이다 — 병목 몇 곳에만 존재하므로 그 병목만 내재화하면 되고, 구매자·대체재 문제보다 범위가 좁아 3순위다.',
                links: [{ label: 'Strategy 탭 → Core (SA-2)', hash: '#/strategy/core' }],
                refs: 'sources/articles/july-2026-market-update-2026-07-04.md · wiki/strategies/core/current-state-sa2-japan-rd-hub-nil.md',
              },
              {
                rank: 4,
                name: '아래층 방어선을 지켜라 (RS-6 1c nm 원가 우위)',
                what: '범용 DRAM에서 최신 공정(1c 나노미터)으로 전환해 원가를 낮추고, 중국 CXMT가 저가로 치고 올라오는 속도를 늦추는 것.',
                why: 'CXMT의 위협은 실재하지만 아직 로엔드에 머물러 있다. 원가 격차가 유지되는 동안은 방어선이 버틴다 — 단, 이 방어선이 뚫리면 1~3순위 전략의 시간을 벌 수 없으므로 버려도 되는 전략은 아니다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-6)', hash: '#/strategy/robust' }],
                refs: 'wiki/strategies/invariant/rs6-process-leadership.md · wiki/entities/cxmt.md',
              },
            ],
          },
          {
            type: 'quote',
            text: '시나리오 렌즈와 어떻게 다른가 — MB-1(HBM 기술 1위 탈환)은 필요하지만 그것만으로는 부족하다. 경쟁 순위전에서 1번 공급사가 되어도, 누구를 얼마나 쓸지 정하는 권력이 구매자(NVIDIA)에게 있는 구조 자체는 바뀌지 않는다. 구조를 바꾸는 전략(락인·계약·표준)에 먼저 투자하고, 순위를 바꾸는 전략(기술 1위)은 그 위에 얹어라.',
            context: '파이브 포스 렌즈의 고유 결론',
          },
        ],
      },
      {
        num: 6,
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
        title: '이 렌즈가 도출하는 최적 전략 — 균형을 지키는 수의 순서',
        blocks: [
          {
            type: 'p',
            text: '게임이론이 묻는 질문은 하나다: "지금의 \'3사 모두 증설을 자제하는 균형\'은 모두에게 이익인데, 이 균형을 어떻게 오래 유지하고, 깨졌을 때 어떻게 살아남는가?" 균형에 기여하는 크기 순으로 전략을 배열한다.',
          },
          {
            type: 'strategy',
            items: [
              {
                rank: 1,
                name: '절제를 공개적으로 약속하라 (D16 호황 정점 규율 + D6 이사회 정책화)',
                what: '"우리는 호황이라고 무리하게 증설하지 않는다"는 원칙 — 재고일수 상한, 장기계약 없는 신규 증설 금지, 다운사이클에도 R&D 예산 하한 유지 — 를 이사회 공식 정책으로 결의하고 밖에서 보이게 만드는 것. 내용은 RS-5 재무 규율이고, 실행 결정은 D6(정책화)·D16(정점 규율 즉시 발동)이다.',
                why: '반복게임의 역설 — 가장 강한 수는 내 선택지를 스스로 줄여서 상대가 나를 믿게 만드는 것이다. 상대가 "삼성은 증설로 배신하지 않는다"고 믿어야 상대도 절제하고, 그래야 3사 모두 이익을 지킨다. 마이크론 CEO가 실적 발표에서 "with discipline(절제하며)"을 4번 반복하고 HBM 생산을 DRAM 점유율에 묶겠다고 공시한 것이 정확히 이런 신호다. 상대는 이미 신호를 보냈고, 삼성이 응답할 차례다.',
                links: [
                  { label: 'Strategy 탭 → Robust (RS-5)', hash: '#/strategy/robust' },
                  { label: 'Strategy 탭 → Decisions (D6·D16)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/strategies/invariant/rs5-financial-discipline-reinvestment.md · sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md · sources/filings/micron-q3-fy26.md',
              },
              {
                rank: 2,
                name: '고객과의 약속을 계약서에 못박아라 (take-or-pay·NTB + RS-8 표준화)',
                what: '사이클 붕괴의 뇌관은 "불황이 오면 고객이 주문을 취소하고, 그 공포 때문에 호황에 다들 과잉 증설하는" 악순환이다. 이를 끊는 방법이 계약이다 — 안 사가도 돈을 내는 take-or-pay, 가격이 이 밑으로 못 내려가는 하한(NTB), 하한을 보장받는 대신 상승분의 절반을 나누는 Participating Forward. 이 계약 템플릿의 표준화가 RS-8, 실행 결정이 D12다.',
                why: '계약으로 묶인 물량이 캐파의 과반을 훨씬 넘으면(실제 영업 현장의 목표), 다운턴이 와도 매출 바닥이 계약으로 보장되므로 치킨게임을 다시 시작할 유인 자체가 사라진다. 1순위(내 절제)가 균형의 한쪽 축이라면, 이것은 게임의 판돈 구조를 바꾸는 축이다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-8)', hash: '#/strategy/robust' }],
                refs: 'wiki/strategies/invariant/rs8-structured-revenue-hedging.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
              },
              {
                rank: 3,
                name: '보복 능력은 버리지 마라 (RS-1 옵션형 캐파)',
                what: '팹 건물(Fab Shell)은 미리 지어두되 고가 장비는 수요가 확인될 때만 단계적으로 반입하는 증설 방식. 평소에는 증설하지 않지만, 마음먹으면 경쟁사보다 빨리 증설할 수 있는 상태를 싸게 유지한다.',
                why: '협조 균형은 선의로 유지되는 게 아니라 "배신하면 응징당한다"는 믿음으로 유지된다. 상대가 균형을 깨고 공격적 증설에 나설 때 삼성이 신속 대응할 수 있다는 사실 자체가, 상대가 애초에 배신하지 않게 만드는 억지력이다. 절제(1순위)와 모순되지 않는다 — 총을 쏘지 않는 것과 총을 버리는 것은 다르다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-1)', hash: '#/strategy/robust' }],
                refs: 'wiki/strategies/invariant/rs1-options-based-capacity.md',
              },
              {
                rank: 4,
                name: '국가보조 경기자와는 판을 갈아라 (RS-6 + RS-2 + MB-4)',
                what: '중국 CXMT는 이윤이 아니라 국가 목표(반도체 자립)를 위해 움직이므로, 손실을 국가가 메워주는 상대와 가격 전쟁을 하는 것은 이길 수 없는 게임이다. 대신 ① 최신 공정 원가 우위(RS-6)로 로엔드에서 버티는 한계선을 관리하고, ② 고부가·저원가 양 끝을 다 잡는 바벨 포트폴리오(RS-2)를 유지하며, ③ 국가 보조금이 닿지 않는 커스텀 솔루션 층(MB-4)으로 게임판을 옮긴다.',
                why: '시급하지만, 1~3순위(3강 균형·계약 구조)가 무너지면 이 전략도 함께 무너지므로 균형 유지가 선행 조건이다. 중국 시장이 미주 AI 사이클과 따로 움직인다는 관찰은 판 분리가 실제로 가능함을 시사한다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-2·6) / Core (MB-4)', hash: '#/strategy/robust' }],
                refs: 'wiki/entities/cxmt.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
              },
            ],
          },
          {
            type: 'quote',
            text: '시나리오 렌즈와 어떻게 다른가 — 이 렌즈의 고유한 기여는 경고다. 시나리오 B 공략(점유율 회복)을 증설 경쟁으로 수행하면 그것이 바로 치킨게임 재점화의 방아쇠가 된다. MB-1은 캐파를 늘리는 방식이 아니라 수율·인증·HBM4E 세대 선행 같은 기술 순위전으로만 수행해야 하며, 경쟁사의 공격적 증설(균형 이탈 신호)은 EWI로 감시해 D16 대응과 연동한다.',
            context: '게임이론 렌즈의 고유 결론',
          },
        ],
      },
      {
        num: 6,
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
      {
        num: 6,
        title: '이 렌즈가 도출하는 최적 전략 — 옵션 데스크의 집행 순서',
        blocks: [
          {
            type: 'p',
            text: '실물옵션이 묻는 질문은 하나다: "앞날을 모를 때, 어떤 결정을 지금 확정하고 어떤 결정을 되돌릴 수 있는 형태로 남겨둘 것인가?" 가격이 극단적으로 출렁이는 지금(변동성 σ 60~120%, 수요 축 정점) 기준으로 집행 순서를 매긴다.',
          },
          {
            type: 'strategy',
            items: [
              {
                rank: 1,
                name: '보험부터 들어라 (D12 Participating Forward 시범 + D16 정점 규율)',
                what: '금융의 풋옵션(가격이 폭락해도 최저 매도가를 보장받는 권리)에 해당하는 것을 실물 계약으로 만드는 것. 구체적으로는 "최저 가격(Floor, 변동비+5~10%)을 보장받는 대신 가격 상승분의 50%를 고객과 나누는" Participating Forward 계약을 주요 고객 1~2사와 시범 체결한다 — RS-8 구조화 매출 헷지의 핵심이고 실행 결정은 D12다.',
                why: '보험은 불나기 전에 드는 것이고, 지금이 바로 그 시점이다. 사상 최고 마진, 범용 가격 상승 감속, 일반 DRAM 마진이 HBM을 앞서는 역전 — 호황의 끝물에 나타나는 신호들이 겹쳐 있다. 게다가 고객들이 스스로 다년 계약과 가격 하한(NTB)에 들어오는 지금은 Floor를 유리하게 협상할 수 있는 드문 창이다.',
                links: [
                  { label: 'Strategy 탭 → Robust (RS-8)', hash: '#/strategy/robust' },
                  { label: 'Strategy 탭 → Decisions (D12·D16)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/strategies/invariant/rs8-structured-revenue-hedging.md · wiki/driving-forces/key-drivers.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md',
              },
              {
                rank: 2,
                name: '큰 투자는 전부 "되돌릴 수 있는 형태"로 바꿔라 (RS-1 옵션형 캐파)',
                what: '신규 증설을 한 번에 확정하지 말고, 건물(Fab Shell)만 미리 짓고 수조 원짜리 장비는 수요가 실제로 확인될 때 단계적으로 들이는 방식(RS-1)을 모든 신규 캐파의 기본 형태로 강제하는 것. 텍사스 2기(MB-5)도 같은 단계화 구조를 유지한다.',
                why: '옵션 이론의 기본 — 불확실성이 클수록 "기다릴 수 있는 권리"의 가치가 커진다. 지금처럼 변동성이 극단적일 때 수십조 원을 한 번에 확정하는 것은 그 권리를 공짜로 버리는 셈이다. 예외는 이미 승산이 확인된 자산뿐 — 업계 최초 샘플로 경쟁사 대비 6개월 앞선 HBM4E 세대 같은 경우만 확정 투자를 허용한다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-1)', hash: '#/strategy/robust' }],
                refs: 'wiki/strategies/invariant/rs1-options-based-capacity.md · sources/articles/june-2026-market-update-2026-06-14.md',
              },
              {
                rank: 3,
                name: '갈아탈 권리의 보험료를 아끼지 마라 (D13 3D DRAM · D14 CXL)',
                what: 'HBM이 언젠가 다른 기술(3D DRAM·CXL)로 대체될 경우를 대비해, 지금 R&D 예산의 일부(전체 대비 소액)를 차세대 기술에 계속 투입하는 것 — SE-1(3D DRAM 조직·IMEC 협약 확대, D13)과 SE-2(CXL 표준 주도권, D14).',
                why: '이 지출은 "패러다임이 바뀌면 갈아탈 수 있는 권리"의 보험료다. 보험료가 아깝다고 끊는 순간 대체가 시작됐을 때 무방비가 된다. 셰일 업계가 보험료를 아끼려다(sub-put 매도) 폭락 때 손실이 가속된 사례가 반면교사다.',
                links: [{ label: 'Strategy 탭 → Core (SE-1·SE-2)', hash: '#/strategy/core' }],
                refs: 'wiki/benchmark/upside-participation-hedging.md · wiki/scenarios/strategy.md',
              },
              {
                rank: 4,
                name: '행사는 사람 말고 규칙이 하게 하라 (D15 EWI 운영)',
                what: '위 옵션들을 "언제 행사할지"를 사람의 그때그때 판단이 아니라 사전에 정한 규칙에 맡기는 것. GPU 임대가 6개월 -35% → 증설 동결, 기업가치 폭락(EV/EBITDA 5배 이하 6개월) → M&A 펀드 집행, 3D DRAM 전력 50% 개선 입증 → 차세대 투자 확대 — 이런 트리거-행동 배선을 완성하는 것이 D15다.',
                why: '옵션 가치의 절반은 규율 있는 행사에서 나온다. 정점에서는 낙관이, 바닥에서는 공포가 판단을 왜곡한다 — 규칙만이 그 왜곡을 피한다.',
                links: [
                  { label: 'EWI 탭 (지표·트리거)', hash: '#/ewi/triggers' },
                  { label: 'Bottleneck Model 탭', hash: '#/bottleneck' },
                ],
                refs: 'sources/raw-notes/demand-inflection-ewi-2026-06.md · wiki/scenarios/strategy.md',
              },
            ],
          },
          {
            type: 'quote',
            text: '시나리오 렌즈와 어떻게 다른가 — 시나리오 렌즈는 "가장 큰 미래(B)에 베팅하라"고 말한다. 이 렌즈는 그 베팅의 형태를 교정한다: 같은 B 공략이라도 수십조 원을 한 번에 확정하는 방식이 아니라, 확정은 최소로·옵션은 최대로 하는 구조로 수행하라. 최적 전략은 "무엇에 베팅하나"만큼 "얼마나 되돌릴 수 있게 베팅하나"로 결정된다.',
            context: '실물옵션 렌즈의 고유 결론',
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
        title: '이 렌즈가 도출하는 최적 전략 — 다음 궤적을 선점하는 순서',
        blocks: [
          {
            type: 'p',
            text: '파괴적 혁신이 묻는 질문은 하나다: "다음 파괴의 궤적이 지금 어디서 그려지고 있고, 그 궤적이 주류와 교차하기 전에 삼성이 그 위에 서려면 무엇부터 해야 하는가?" 파괴가 임박한 정도 × 지금 대응하면 아직 잡을 수 있는 창의 크기 순으로 배열한다.',
          },
          {
            type: 'strategy',
            items: [
              {
                rank: 1,
                name: '파괴 기술을 키울 별동대를 완성하라 (D13 3D DRAM 조직 확대 + SD-1 HBM 독립 P&L)',
                what: '차세대 기술(3D DRAM)을 개발하는 조직을 주력 사업부에서 떼어내 인력 300~500명 규모의 독립 조직으로 키우고(D13), HBM 사업도 손익을 따로 계산하는 독립 조직(P&L 센터)으로 분리하는 것(SD-1).',
                why: '크리스텐슨 이론에서 유일하게 검증된 해법이다. 대기업이 파괴 기술을 놓치는 이유는 무능해서가 아니라, 주력 사업의 자원배분 논리 — "지금 마진이 나는 곳에 사람과 돈을 몰아준다" — 가 합리적으로 작동하기 때문이다. 초기의 파괴 기술은 시장이 작고 마진이 낮아 이 논리에서 항상 밀린다. 조직을 분리해 그 논리에서 면제해 주지 않으면 어떤 대응도 예산 심사에서 잡아먹힌다. 삼성 자신이 HBM 초기에 이 논리로 니치를 무시했다가 40%→17% 추락을 겪었다.',
                links: [
                  { label: 'Strategy 탭 → Core (SE-1·SD-1)', hash: '#/strategy/core' },
                  { label: 'Strategy 탭 → Decisions (D13)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/scenarios/strategy.md · wiki/scenarios/core-strategy-selection.md · wiki/concepts/dram-market-share.md',
              },
              {
                rank: 2,
                name: 'AI SSD 니치에 지금 진입하라 (2026년 내 SCADA 대응 전략 확정 + FDP)',
                what: 'NVIDIA가 만들고 있는 GPU 직결 스토리지 표준(SCADA)에 맞는 AI 전용 SSD 전략을 2026년 안에 확정하고, 고객 시스템과 소프트웨어 수준에서 통합되는 FDP 플랫폼으로 전환비용을 쌓는 것.',
                why: '파괴의 시계가 가장 빨리 도는 전선이다. SK하이닉스·Kioxia가 이미 NVIDIA와 공동 개발로 레퍼런스(기준 채택) 지위를 선점하고 있다 — 레퍼런스가 고착된 뒤에 진입하는 비용은 니치 단계 진입의 몇 배가 된다는 것을 HBM이 증명했다. 지금이 임계 시한이다.',
                links: [{ label: 'Strategy 탭 → 개발실 전환 (FDP)', hash: '#/strategy/transformation' }],
                refs: 'wiki/entities/nvidia-cmx-scada.md · wiki/strategies/fdp-host-ssd-platform.md',
              },
              {
                rank: 3,
                name: '로엔드(범용 제품)를 버리지 마라 (RS-2 바벨 + RS-6 원가)',
                what: '고부가(HBM·커스텀)로 옮겨가더라도 저가 범용 DRAM 시장을 포기하지 않고, 고부가와 저원가 양 끝을 모두 잡는 바벨 포트폴리오(RS-2)를 유지하며 최신 공정 원가 우위(RS-6)로 방어하는 것.',
                why: '파괴 이론이 경고하는 고전적 함정이 "상위 이동(up-market retreat)"이다 — 로엔드를 침입자에게 내주고 고부가로 도망가는 선택은 당장은 마진을 지켜주지만, 침입자가 궤적을 타고 따라 올라오면 결국 도망갈 곳이 없어진다. CXMT가 그 침입자다. 범용에 남아 원가로 맞서는 것은 후퇴 속도를 늦추는 방파제다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-2·RS-6)', hash: '#/strategy/robust' }],
                refs: 'wiki/strategies/invariant/rs2-barbell-portfolio.md · wiki/entities/cxmt.md',
              },
              {
                rank: 4,
                name: '궤적의 교차점을 계기판에 올려라 (D15 EWI의 파괴 트리거)',
                what: '파괴가 "임박했는지"를 알려주는 구체적 신호 — 3D DRAM이 HBM 대비 전력 50% 개선을 입증하는 순간, 빅테크 커스텀 칩에서 CXL/3D DRAM 인터페이스 특허가 확인되는 순간, zHBM(GPU 위 수직 적층) 채택이 확산되는 순간 — 를 조기경보 지표(EWI)로 정의해 상시 감시하는 것(D15).',
                why: '파괴는 어느 날 갑자기 오는 사건이 아니라 서서히 그려지는 궤적이고, 궤적은 계측할 수 있다. 감시가 있어야 1~3순위의 투자 규모를 "언제 늘릴지"를 데이터가 결정한다.',
                links: [{ label: 'EWI 탭 → 시나리오 트리거', hash: '#/ewi/triggers' }],
                refs: 'wiki/scenarios/strategy.md · sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md',
              },
            ],
          },
          {
            type: 'quote',
            text: '시나리오 렌즈와 어떻게 다른가 — MB-1(HBM 1위 탈환)은 지난 전쟁의 훈장이다. 지금 있는 시장에서 순위를 다투는 존속적 경쟁의 승리는 다음 파괴를 막지 못한다 — 범용 DRAM 1위를 지키고 있던 삼성이 HBM이라는 다른 궤적에 당한 것이 그 증거다. 점유율 회복에 쓸 에너지의 상당분을, 다음 궤적(zHBM·3D DRAM·CXL·AI SSD)을 선점하는 데로 옮겨라.',
            context: '파괴적 혁신 렌즈의 고유 결론',
          },
        ],
      },
      {
        num: 6,
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

  // ── CMO (Context-Mechanism-Outcome) ───────────────────────────────────────
  {
    id: 'cmo',
    label: 'CMO',
    short: '다운턴의 발화 조건',
    color: '#34C759',
    title: '같은 전략은 같은 결과를 재생하지 않는다',
    thesis:
      '리얼리스트 평가(Pawson & Tilley)의 Context-Mechanism-Outcome으로 과거 다운턴을 분해하면, 승리의 원인은 "전략 목록"이 아니라 특정 맥락(C)이 특정 메커니즘(M)을 발화시켜 만든 결과(O)의 구성이었다. 2026년의 맥락은 과거와 여덟 지점에서 구조적으로 다르므로, 다음 다운턴 전략은 과거 성공 공식의 복제가 아니라 맥락 감사를 통과한 메커니즘만으로 재조립해야 한다.',
    wikiSource: 'wiki/storyline/storyline-cmo.md',
    visual: {
      kind: 'chain',
      stages: [
        { label: '1차 치킨게임', sub: '2007~09 · 소모전 + 역사이클 증설 · Qimonda 퇴출', color: '#FF3B30' },
        { label: '2차 치킨게임', sub: '2010~13 · 기술 전환 심판대 · Elpida 퇴출 · 6강→3강', color: '#FF9500' },
        { label: '2022~23 다운사이클', sub: '공식 재복제 — 범용 승리 · HBM 니치 상실', color: '#AF52DE' },
        { label: '2026~28 맥락 전환', sub: '절제 균형 · 계약 바닥·만기 구조 · 인증 게임 · CXMT · 감가 정점', color: '#007AFF' },
        { label: '다음 다운턴', sub: '감사 통과 메커니즘만 재조립 → SP-2가 원인×속도로 분해', color: '#34C759' },
      ],
    },
    sections: [
      {
        num: 1,
        title: '방법론 — 왜 Context-Mechanism-Outcome인가',
        blocks: [
          {
            type: 'p',
            text: '사이클 산업의 전략 논의는 대개 "무엇이 통했나"의 목록(역사이클 투자·재무 요새·불황기 M&A)으로 귀결된다. CMO 방법론은 한 단계를 더 요구한다: 결과(O)는 전략이 만드는 것이 아니라, 특정 맥락(C)에서만 발화하는 메커니즘(M)이 만든다. 맥락이 바뀌면 메커니즘이 발화하지 않고, 발화하지 않는 메커니즘은 결과를 재생하지 못한다. 이 렌즈가 삼성에 특히 필요한 이유는 역설적이게도 삼성이 과거 다운턴의 승자이기 때문이다 — 승자는 자기 성공 공식을 복제하려는 유인이 가장 강하고, 맥락이 바뀐 것을 모른 채 낡은 메커니즘을 재발화시키는 함정에 가장 깊이 노출된다.',
            refs: 'wiki/benchmark/cyclical-strategy-benchmark.md',
          },
        ],
      },
      {
        num: 2,
        title: '사례 분해 — 세 번의 다운턴, 세 개의 CMO 구성',
        blocks: [
          {
            type: 'p',
            text: 'CMO-1 (1차 치킨게임 2007~09): 맥락은 6강 대칭·비차별 범용재·현물가·금융위기. 소모전 메커니즘(가격 -85%·-58% 붕괴에도 전원 버티기 → 체력 열위 기업 퇴출)과 역사이클 증설이 완전 발화해, 키몬다 퇴출 직후 현물가 급등·삼성 2009 매출 100조·2010 투자 5.5조→9조 상향으로 회복기 점유율을 흡수했다. CMO-2 (2차 치킨게임 2010~13): 태국 홍수·엔고에 PC→모바일 전환기가 겹친 맥락에서, 퇴출 순서를 정한 것은 현금 체력만이 아니라 다운턴 중 기술 전환의 성패였다 — 엘피다 파산 요인에 "PC→모바일 대응 실패"가 명시된다. 6강→3강 압축과 "3사는 6사가 할 수 없는 공급 규율"이라는 구조적 유산을 남겼다.',
            refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md',
          },
          {
            type: 'p',
            text: 'CMO-3 (2022~23 다운사이클) — 이 렌즈의 핵심 관측: 삼성은 1차 치킨게임의 승리 공식을 그대로 재발화시켰다("인위적 감산 없다" 선언·2022년 CapEx 47.7조·Taylor 팹 다운사이클 착공). 결과는 둘로 갈라졌다 — 복제된 메커니즘이 겨냥한 낡은 게임(범용 캐파)에서는 승리했으나(2025~26 사상 최대 실적), 같은 기간 진행되던 새 게임(HBM 인증 니치)은 놓쳤다: HBM 40%→17% 추락, 33년 만의 DRAM 역전. CMO 언어로 이것은 결과 이질성(outcome heterogeneity)이다 — 메커니즘은 발화했으나, 맥락이 이동한 곳에서는 결과를 만들지 못했다.',
            refs: 'wiki/benchmark/cyclical-strategy-benchmark.md · wiki/concepts/dram-market-share.md',
          },
          {
            type: 'table',
            headers: ['구성', 'Context (맥락)', 'Mechanism (메커니즘)', 'Outcome (결과)', '다음 다운턴에의 교훈'],
            rows: [
              ['CMO-1 · 1차 치킨게임 (2007~09)', '6강 대칭 과점 · 비차별 범용재 · 현물가 거래 · 금융위기 수요 충격 · 삼성 재무 체력 우위', '소모전(가격 -85%·-58%에도 전원 버티기 → 체력 열위 퇴출) + 역사이클 증설', 'Qimonda 파산 → 현물가 급등 · 삼성 2009 매출 100조·2010 투자 5.5조→9조 → 회복기 점유율 흡수', '소모전·역사이클 완전 발화 — 발화 조건은 "대칭적 이윤 극대화 경기자 + 캐파=점유율"'],
              ['CMO-2 · 2차 치킨게임 (2010~13)', '태국 홍수·엔고 외생 충격 + PC→모바일 수요 구조 전환기', '소모전 + 다운턴 중 기술 전환 성패가 퇴출 순서 결정', 'Elpida 파산·대만 퇴장 → 6강→3강 · "3사만 가능한 공급 규율" 유산', '다운턴은 다음 세대 기술 전환의 심판대 — 전환 실패는 체력과 무관하게 치명'],
              ['CMO-3 · 다운사이클 (2022~23)', '3강 과점 · 코로나 수요 절벽 · 삼성 현금 ~$63B', '1차 승리 공식 재복제 — "인위적 감산 없다"(2022-10) · CapEx 47.7조 · Taylor 착공, 단 2023-04-07 감산 공식화로 소모전 자진 철회', '결과 이질성 — 범용 게임 승리(사상 최대 실적) / HBM 인증 게임 상실(40%→17% · 33년 만의 역전)', '메커니즘은 발화해도, 맥락이 이동한 곳에서는 결과를 재생하지 못한다'],
              ['CMO-4 (설계) · 다음 다운턴 (2028~29 창)', '§3의 8대 변화 — 절제 균형+CXMT · 계약 바닥 · 인증 게임 · 비동기 사이클 · CAPEX/ROI 경로 · 추격자 위치 · 계약 만기 구조 · 감가 정점', '§5 액션 판정·§6 경쟁사 벤치마킹·§7의 감사 통과 메커니즘만 재조립 — 계약 바닥 선점(+만기 사다리화) · 역사이클 대상 교정 · 치킨게임 봉인 · 맥락 EWI', '(목표) 매출 바닥이 계약으로 보장된 다운턴 · 다음 세대 인증 선점 · 절제 균형 유지', '과거 공식의 복제가 아니라, 맥락 감사를 통과한 재조립'],
              ['CMO-4의 형태 분해 · SP-2 다운턴 트랙', '원인 축(수요발↔공급발) × 속도 축(급락형↔침식형)', '대비 DP-1~7 → 감별 DX-1~8 → 대응 DR-1~6', 'DT-A 급제동 20% · DT-B 긴 하산 24% · DT-C 동시 방류 22% · DT-D 저가 잠식 26% · DT-E 판 갈이 8% (조건부 확률 — 도착 전제)', '원인만으로는 처방이 갈리지 않는다 — "언제 결정할지"는 속도가 정한다'],
            ],
          },
        ],
      },
      {
        num: 3,
        title: '맥락 감사 — 2026~28의 C는 과거와 어디가 다른가',
        blocks: [
          {
            type: 'p',
            text: '여섯 개의 구조 변화: ① 경기자 — 6강 대칭 소모전에서 3강 절제 균형("with discipline" 공개 신호) + 국가 목표로 움직이는 이단 경기자 CXMT로. ② 계약 — 현물가·이탈 자유에서 take-or-pay·NTB 하한·선수금·SCA $100B로: 매출 바닥이 계약으로 존재한다. ③ 제품 — 비차별 범용재에서 인증 슬롯이 배분을 결정하는 준커스텀재(Vera Rubin 배정 SK 60~70% vs 삼성 25~30%는 캐파가 아니라 인증 순위의 결과)로. ④ 사이클 — 단일 DRAM 사이클에서 HBM·범용·GDDR·LPDDR·플래시 종류별 비동기 사이클로: 다운턴도 부분적·비동기적으로 온다. ⑤ 진입 경로 — PC·스마트폰 소비 사이클에서 AI 투자수익률 재평가(CAPEX/ROI -31.5%)·2028~29 공급 도래 창으로: "꼭짓점은 FCF". ⑥ 출발 위치 — 명백한 리더의 다운턴이 아니라 HBM 후순위·DRAM 역전 상태의 추격자 다운턴이 될 위험. ⑦ 계약 만기 구조(SP-2 추가) — 커버리지는 하강을 막는 것이 아니라 미룬다: 만기가 2028~29에 몰리면 그 시점에 시장가로 한꺼번에 재가격되어, 계약이 급락 방지 장치가 아니라 급락 발사 장치가 된다. 총량이 아니라 만기 집중도가 형태를 결정한다(DP-1·DX-7). ⑧ 원가 하한/감가 위치(SP-2 추가) — 기계장치 내용연수 5년·상각률 77.1%, 감가상각비의 85~93%가 기계장치라 2028~29에 감가 완료 설비 풀이 최대가 되면 원가 하한이 내려간다: 방어 자산이면서 동시에 과잉의 연료다.',
            refs: 'sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · sources/articles/july-2026-market-update-2026-07-04.md · sources/articles/youtube-kwon-cycle-formula-2026-05-21.md · sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md · sources/articles/semiconductor-depreciation-cost-structure-2026-08.md · wiki/downturn/key-drivers.md',
          },
        ],
      },
      {
        num: 4,
        title: '메커니즘 감사 — 아직 발화하는 것, 부러진 것, 새로 생긴 것',
        blocks: [
          {
            type: 'table',
            headers: ['메커니즘', '과거 발화 사례', '2026~28 판정', '판정 근거 (§3 맥락 변수)', '전략 배선 (SP-1)', '다운턴 배선 (SP-2)'],
            rows: [
              ['재무 요새', 'CMO-1·3 (호황·불황 관통)', '유지', '맥락에 거의 의존하지 않는 준불변 메커니즘', 'RS-5', '전 DP·DR의 공통 전제'],
              ['다운턴 저가 매수', 'Disney-Marvel·ExxonMobil-Pioneer형 벤치마크', '유지', '자산 가격 폭락 시 매수자 우위는 불변', 'D9 M&A 펀드 (EV/EBITDA 5배 트리거)', 'DR-4 역사이클 자산 취득 — 창은 급락형(DT-A)에서 최대, DT-D에서는 매물이 나오지 않는다'],
              ['다운턴 중 기술 전환 투자', 'CMO-2 (Elpida 반면교사)', '강화', '인증이 배분을 결정하는 맥락(#3)에서 배당 증가', 'D6 R&D 하한 · HBM4E·zHBM·3D DRAM·CXL', 'DP-5 별동대 + R&D 하한 🔵 무후회 (DT-E에서는 유일한 응수)'],
              ['소모전 (치킨게임)', 'CMO-1·2 (퇴출 → 가격 급등)', '부러짐', '3강 절제 균형에선 자해(#1) · CXMT는 "이윤 극대화 경기자" 전제 불충족', '봉인 — RS-6·RS-2·MB-4로 대체', 'DR-2b 소모전 봉인 = 명시적 금지 옵션 (치킨게임 4대 전제가 CXMT 상대로 전부 붕괴)'],
              ['무차별 역사이클 캐파 증설', 'CMO-1·3', '약화', '인증 없는 캐파는 점유율로 전환 불가(#3) · 치킨게임 재점화 방아쇠', 'RS-1 옵션형(Fab Shell)으로만 허용', 'DP-2 옵션형 캐파 강제 🔵 무후회 · DR-2 공급 규율은 공급발에서만 발동'],
              ['계약적 매출 바닥', '부분 선례 — 2005-11 Apple 선급 LTA(개별 계약)', '신규 = 정책화', '메커니즘 자체는 사내 선례가 있고, 신규인 것은 전사 커버리지 정책화다. 발화 조건(공급 부족 호황 + 고객 물량 불안)이 지금만 성립(#2)', 'RS-8·RS-4·D12', 'DP-1 만기 사다리화 — 총량에 만기 분산 KPI를 더한다(#7) · DR-3 계약 방어'],
              ['SW 전환비용 락인', '없음 (신규)', '신규', 'CMX·SCADA·FDP 소프트웨어 층의 등장', 'RS-3', 'DP-5 감축 예외(컨트롤러·펌웨어·시스템 SW 인력)'],
              ['데이터 트리거 규율', '없음 (신규)', '신규', 'EWI 인프라·트리거-행동 배선 가용(#4·#5 감시)', 'RS-9·D15·D16', 'DP-4 감별 EWI 배선 🔵 무후회 · DX-1~8 · DR-1 30일 감별 프로토콜'],
            ],
          },
          {
            type: 'p',
            text: '그대로 발화: ① 재무 요새(맥락 준불변), ② 다운턴 저가 매수(D9 M&A 펀드가 행사 장치), ③ 다운턴 중 기술 전환 투자 — 엘피다의 반면교사대로 다운턴은 다음 세대의 심판대이며, 인증이 배분을 결정하는 새 맥락에서 이 메커니즘은 오히려 강화됐다. 부러졌거나 약화: ① 소모전(치킨게임) — 3강 절제 균형에서는 자해이고, 손실을 국가가 흡수하는 CXMT에게는 퇴출 메커니즘 자체가 작동하지 않는다. ② 무차별 역사이클 캐파 증설 — 인증 없는 캐파는 점유율로 전환되지 않고, 시도 자체가 치킨게임 재점화의 방아쇠다. 새로 생김: ① 계약적 매출 바닥(take-or-pay·NTB·Participating Forward) — 단 "과거 어디에도 없었다"는 정리는 교정이 필요하다: 2005-11 Apple NAND 장기공급계약(선급 총 $1.25B·5개사)에서 삼성은 이미 선급 LTA의 공급자 당사자였다. 신규인 것은 메커니즘이 아니라 그 전사 정책화이며, 이는 난이도의 성격을 바꾼다. ② 소프트웨어 전환비용 락인(CMX·SCADA·FDP), ③ 데이터 트리거 규율(EWI-행동 배선).',
            refs: 'wiki/entities/cxmt.md · wiki/strategies/invariant/rs8-structured-revenue-hedging.md · wiki/strategies/invariant/rs3-customer-switching-cost.md · wiki/strategies/invariant/rs9-demand-inflection-sensing.md',
          },
        ],
      },
      {
        num: 5,
        title: '액션 추적 — 무엇을 했고, 무엇이 통했고, 무엇으로 이어지는가',
        blocks: [
          {
            type: 'p',
            text: '§2가 다운턴을 "사례" 단위로 분해했다면, 이 절은 같은 역사를 삼성이 실제로 한 액션 단위로 다시 분해한다. 사고의 과정은 네 단계다: ① §2 사례에서 삼성의 실제 액션을 추출하고, ② 결과 증거로 효과를 판정하고(◎ 분명 / △ 조건부 / ✕ 역효과), ③ §3 맥락 감사·§4 메커니즘 감사로 "그 액션이 통한 조건이 지금도 성립하는가"를 심사한 뒤, ④ 판정 ◎이면서 감사를 통과한 액션만 §7의 전략으로 번역한다. 조건이 소멸한 액션(△)은 폐기·대체하고, 역효과 액션(✕)은 반면교사로 역이용한다.',
          },
          {
            type: 'p',
            text: '액션은 두 국면으로 나뉜다. 다운턴 기간 중의 액션(대응)과 다운턴이 오기 전 호황 말기의 액션(대비)은 성격이 다르다 — 대응의 선택지 자체가 대비 국면에 이미 정해져 있기 때문이다. 2019년 HBM팀 축소(그 시점의 M)는 2022~23 다운턴에서는 바꿀 수 없는 출발 위치(C)였다. 한 시기의 M이 다음 시기의 C가 된다는 이 순환이 두 국면을 나누는 이유다.',
            refs: 'wiki/storyline/cmo-matrix.md',
          },
          { type: 'h', text: '5.1 대비 국면 — 도착 전에 한 것 (P1~P7, 의도적 대비만)' },
          {
            type: 'p',
            text: '대비기 액션 25건 중 의도 자체가 다가올 하강 국면에 대한 포지셔닝이었던 것만 추리면 7건이다(나머지는 결과적 대비 7건·호황 성장 11건). 이것이 삼성이 실제로 보유한 다운턴 대비 레퍼토리의 전부다.',
            refs: 'sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md · wiki/storyline/cmo-matrix.md',
          },
          {
            type: 'table',
            headers: ['#', '대비기', '대비 액션 (M)', '결과 (O)', '판정', '전략 번역 (2026)'],
            rows: [
              ['P1', '1차 (2005~07)', 'CapEx 선제 삭감 (2007-01 반도체 -18%·메모리 -17%)', '세 대비기 중 유일한 호황 말기 브레이크. 단 직전까지 확대가 이어져 늦었다', '△', 'DP-2 옵션형 캐파 — 삭감/확대 이분법을 단계 구조로 대체'],
              ['P2', '1차 (2005~07)', '양산 투입 이연 (50nm 개발 완료·양산은 2008로)', '60nm 우위를 쥔 채 진입 → 2008 Q4 반도체 OPM -14%(경쟁사 -40% 이하)', '◎', 'DP-2·RS-1 — "개발은 선행, 투입은 지연"의 제도화'],
              ['P3', '1차 (2005~07)', 'Apple 선급 장기공급계약 참여 (2005-11, 선급 총 $1.25B/5개사)', '삼성이 이미 선급 LTA의 공급자 당사자였던 사내 최초 선례. 단 고객 주도 개별 계약', '◎', 'DP-1 만기 사다리화·RS-8·RS-4·D12 — 개별 계약을 전사 정책으로'],
              ['P4', '2차 (2009~10)', '사이클 외부 다각화 (5대 신수종 23.3조/10년)', '상관 낮은 축 개설 시도. 다운턴 손익을 상쇄할 규모는 미확인', '△', '이 렌즈의 처방에서 제외 — 상쇄는 계약(DP-1)·전환(DP-6)이 담당'],
              ['P5', '3차 (2020~22)', '판매 측 규율 (2022 Q2 "disciplined sales")', '대비기 말 유일한 절제 신호이나 판매 축에 국한 — 캐파는 늘리고 판매만 조인 비대칭', '△', 'DP-2(생산 측) + DP-1(판매 측)의 동시 배선'],
              ['P6', '3차 (2020~22)', '[미실행] HBM 니치 조직 유지 (2019 해체 → 2024-04 재구성)', '대비의 부재가 3차의 출발 위치(C)를 만듦 → HBM 40%→17%·33년 만의 DRAM 역전', '✕', 'DP-5 별동대 + R&D 하한 🔵 무후회 · D13·SD-1'],
              ['P7', '3차 (2020~22)', '[미실행] 재고 조정 (DS 16.5조 → 29.1조 +76.6% 방치)', '진입 6~12개월 전 정량 경보가 행동으로 연결되지 않음 → 2022-10 무감산·2023-04 뒤늦은 선회', '✕', 'DP-4 감별 EWI + 트리거 배선 🔵 무후회 · D15·D16'],
            ],
          },
          {
            type: 'p',
            text: '이 7건이 말하는 것 — ① 레퍼토리가 얇다: 20년·세 대비기에 의도적 대비가 7건뿐이고 명확한 성공은 P2·P3 둘이다. ② 성공한 둘은 "속도를 늦추거나 바닥을 깐" 형태였다 — 무엇을 더 한 것이 아니다. ③ 실패한 둘은 하지 않은 것(P6·P7)이다 — 대비 국면에서는 무행동이 행동의 실패보다 비싸다. ④ 무게중심이 어긋나 있었다: 7건 중 4건이 운영 축(계약·재고·판매·조직)인데 자원은 내내 투자 축(캐파)으로 쏠렸다. ⑤ 따라서 DP-1~7은 과거 성공 공식의 재현이 아니라 없던 수단을 처음 갖추는 목록이다.',
            refs: 'wiki/downturn/preparation.md · wiki/storyline/cmo-matrix.md',
          },
          { type: 'h', text: '5.2 대응 국면 — 도착 후에 한 것 (A1~A6)' },
          {
            type: 'trace',
            items: [
              {
                action: '위기 국면 구조 대응 — 사업부 통합',
                period: '2008~09',
                outcome: '2009년 매출 100조·영업이익 10조 달성. 불황을 버티는 시간이 아니라 조직 재편의 창으로 사용.',
                verdict: 'clear',
                reason: '성립 — 맥락에 거의 무관',
                strategy: 'D16 정점 규율 + 다운턴 조직 대응 매뉴얼 사전 정의',
                refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md',
              },
              {
                action: '경쟁사 퇴출 직후 역사이클 증설 — 메모리 투자 5.5조→9조 상향',
                period: '2010',
                outcome: '회복기 점유율 흡수. 발화 조건은 타이밍 — 퇴출 "확인 직후" 저가 국면 투입 + 캐파=점유율 맥락.',
                verdict: 'clear',
                reason: '절반 성립 — "바닥에서 산다" 원칙은 유효하나 캐파=점유율 등식은 소멸(§3 #3 인증 게임)',
                strategy: 'D9 다운사이클 M&A 펀드(EV/EBITDA 5배 트리거) — 사는 대상을 캐파에서 기술 자산·인재로 교체',
                refs: 'sources/articles/dram-chicken-game-history-2026-08-05.md',
              },
              {
                action: '재무 요새 유지 — 현금 ~$63B·저부채',
                period: '전 기간',
                outcome: '단독 성과가 아니라 모든 ◎ 액션의 전제 조건 — 어떤 다운턴이든 버틸 체력이 조직 재편·저가 매수·착공 지속의 밑돌.',
                verdict: 'clear',
                reason: '성립 — 맥락 준불변',
                strategy: 'RS-5 재무 규율 + D6 이사회 정책화(R&D 하한 포함)',
                refs: 'wiki/benchmark/cyclical-strategy-benchmark.md',
              },
              {
                action: '다운사이클 한복판 팹 착공 — Taylor',
                period: '2022',
                outcome: '업사이클 시작 시점에 가동되어 공급 부족기를 흡수. 건설 리드타임(수년)을 불황 기간에 소화한 것이 발화 조건.',
                verdict: 'clear',
                reason: '성립 — 단 장비 확정은 분리해야',
                strategy: 'RS-1 옵션형 캐파 — Fab Shell 선행 유지, 장비 반입은 수요 확인 후 단계화',
                refs: 'wiki/benchmark/cyclical-strategy-benchmark.md',
              },
              {
                action: '"인위적 감산 없다" 선언 → 2023-04-07 감산 공식화 선회 (+ CapEx 47.7조)',
                period: '2022~23',
                outcome: '범용 점유는 방어(2025~26 회복기 배당)했으나 소모전 자체는 불발 — Q1 2023 영업이익 0.6조(-96%)·DS -4.58조 사상 최대 적자 끝에 2023-04-07 자진 철회. 6강형 퇴출 유도 공식의 3강 맥락 불발이 실증됐다.',
                verdict: 'adverse',
                reason: '불성립 — 3강 절제 균형에선 자해(§3 #1), CXMT는 가격으로 퇴출 불가(§4)',
                strategy: '폐기·대체 — 절제 공개 신호(D16) + 게임 분리(RS-6·RS-2·MB-4)',
                refs: 'wiki/benchmark/cyclical-strategy-benchmark.md · sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
              },
              {
                action: '다운턴 중 자원배분 — 범용 캐파 우선·HBM 니치 후순위',
                period: '2022~23',
                outcome: 'HBM 40%→17% 추락·33년 만의 DRAM 역전. 주력 사업의 자원배분 논리가 니치를 합리적으로 배제한 결과.',
                verdict: 'adverse',
                reason: '재발 위험 — 다음 니치는 zHBM·3D DRAM·CXL·AI SSD',
                strategy: '반면교사 — D6 R&D 하한 + D13 차세대 별동대 + SD-1 독립 P&L',
                refs: 'wiki/concepts/dram-market-share.md · sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md',
              },
            ],
          },
          {
            type: 'quote',
            text: '도출 원리 — 판정 ◎ 액션(구조 대응·역사이클 매수·재무 요새·다운턴 착공)의 공통 분모는 "다운턴을 버티는 시간이 아니라 사용하는 시간으로 썼다"는 것이다. §7 전략 2순위(역사이클 대상 교정)는 이 액션들의 직계 후손이고, A5(✕ 불발·2023-04 자진 철회)는 폐기·대체(3순위), A6(✕ 실기)은 반면교사(R&D 하한·별동대)로 역이용된다. 1순위(계약 바닥)만이 위 대응 액션 목록에 없다 — A1~A6은 전부 "다운턴 도착 후"의 대응이지만, 계약 바닥은 도착 전에만 만들 수 있고 그 창이 지금 열려 있다. 다만 "사내에 전례가 없다"는 뜻은 아니다 — 대비 국면까지 넓히면 2005-11 Apple 선급 LTA라는 선례가 있고, 없는 것은 그 개별 계약을 전사 정책으로 제도화한 경험이다.',
            context: '액션 추적 → 전략 번역의 연결 논리',
          },
          { type: 'h', text: '다운턴별 M×C→O 매트릭스 — 삼성 관점' },
          {
            type: 'p',
            text: '행 = 삼성의 액션(M, 메커니즘명 병기), 열 = 다운턴 진입 시점에 선택할 수 없었던 맥락(C, 값 명시), 셀 = 그 맥락에서 그 액션이 만든 결과(O)다. 모든 셀은 "C가 [값]이었으므로 M은 [발화/부분 발화/불발] → [관측 결과]" 템플릿을 따른다. 판정 4등급 — ◎ 효과 분명(수치 관측+시간 선행+C 경로), △ 부분·조건부, ✕ 역효과·불발, — 상호작용 무의미 — 에 증거 첨자 ¹(1차 수치) ²(2차 서술) ³(추정, ◎³ 금지)를 붙인다. 같은 O는 primary 셀 1곳에만 완전 서술하고 나머지는 ↖ 참조로 표시한다. 무행동도 배분 결정이므로 [배분] 태그로 행에 포함한다.',
            refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md · sources/articles/dram-chicken-game-history-2026-08-05.md',
          },
          { type: 'h', text: 'CMO-1 · 1차 치킨게임 (2007~09)' },
          {
            type: 'p',
            text: 'M/C 판별: 2007년 진입 시점의 소여(6강 구조·범용재 배분 규칙·현물가/금융위기·리더 위치) = C, 기간 중 선택·배분(버티기·공정 전환·조직 통합·M&A 시도·역사이클 증설) = M.',
          },
          {
            type: 'matrix',
            headers: [
              'M (액션 · 메커니즘)',
              'C1-a 경기자 구조 = 6강 대칭·전원 이윤극대화',
              'C1-b 배분 규칙 = 캐파·원가가 점유율 결정',
              'C1-c 수요·거래 = 현물가·금융위기 수요 급감 (-85%·-58%)',
              'C1-d 출발 위치 = 재무·원가 리더',
            ],
            rows: [
              {
                label: '무감산 버티기 + CapEx 유지 — 메커니즘: 소모전(체력 열위 퇴출)',
                cells: [
                  { text: '◎¹ C가 6강 대칭·전원 이윤극대화였으므로 소모전 완전 발화 → 키몬다 누적손실 $30억·2009-01 파산, 퇴출 직후 현물가 급등 — 과점 구조 실증', tone: 'clear' },
                  { text: '—', tone: 'none' },
                  { text: '△¹ C가 현물가·수요 절벽이었으므로 버티기 비용도 즉시 노출 — 부분 발화 → 2008 Q4 전사 첫 분기 적자 -0.94조·반도체 -0.56조(-14%) vs 경쟁사 -40% 이하 — 체력 격차가 손실률 격차로', tone: 'partial' },
                  { text: '◎¹ ↖(무감산×C1-a 참조) — 재무·원가 리더 위치가 버티기의 전제', tone: 'clearSoft' },
                ],
              },
              {
                label: '40nm 공정 선행 (2009-07 세계 최초 40nm급 DDR3 양산) — 메커니즘: 원가 격차 확대',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '◎¹ C가 원가=점유율 범용재였으므로 공정 선행 발화 → 50nm급 대비 생산성 +60%·전력 -30% — 가격 붕괴기 원가 격차가 퇴출 압력 가속 (업계 최초 — 경쟁사 미도달)', tone: 'clear' },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: 'A1 · 조직 통합 (2009-01 DS/DMC 2부문·임원 연봉 -20%) — 메커니즘: 위기를 구조 재편의 창으로 사용',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '◎¹ C가 금융위기 수요 충격(첫 분기 적자)이었으므로 구조 재편 발화 → 2부문 통합·임원 연봉 -20%, 이듬해 2009 연결 매출 136.3조·영업이익 10.9조', tone: 'clear' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: '[배분] SanDisk 인수 시도→철회 ($5.85B 제안 2008-09 → 철회 2008-10-22) — 메커니즘: 다운턴 저가 매수 + 가격 규율',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '△¹ C가 금융위기 자산가격 붕괴로 저가 매수 창 개방 — 부분 발화 후 자진 철회(SanDisk Q3 -$250M·손실 확대 전망 명시) → 인수 불발, 가격 규율은 관측', tone: 'partial' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: 'A2 · 퇴출 확인 직후 역사이클 증설 (2010 메모리 5.5조→9조) — 메커니즘: 회복기 점유율 흡수',
                cells: [
                  { text: '◎¹ ↖(역사이클 증설×C1-b 참조) — 키몬다 퇴출 확인(2009-01)이 투입 타이밍 트리거', tone: 'clearSoft' },
                  { text: '◎¹ C가 캐파=점유율이었으므로 발화 → 2010 시설투자 21.6조(반도체 12.7조·메모리 5.5→9조 상향) → 회복기 점유율 흡수 (경쟁사는 투자 삭감으로 캐파 부재)', tone: 'clear' },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                ],
              },
            ],
            legend: true,
            footnotes: [
              '반사실 한계: "감산/인수를 택했다면"의 대조군 부재 — 동시대 경쟁사 대조(§6)로 보완하되 인과 확정 아닌 정합성 판단.',
              'C 교호작용: C1-a(6강)×C1-c(금융위기)가 결합해야 소모전 발화 — 단독 열 귀속은 서술 편의. C1-d는 모든 M의 공통 전제(enabler).',
              '◎ 대조(생존자 편향 완화): 동일 C에서 하이닉스·엘피다·마이크론·대만은 감산·정부지원 의존, 키몬다는 퇴출 — 무감산·역사이클·40nm 선행은 삼성 단독.',
              '채움률: 8/20 = 40% ("—"는 M×C 상호작용이 무의미한 칸).',
            ],
          },
          { type: 'h', text: 'CMO-2 · 2차 치킨게임 (2010~13)' },
          {
            type: 'p',
            text: 'M/C 판별: 2010~11년 진입 시점의 소여(태국 홍수·엔고, PC→모바일 전환, 6강 잔존, 1차전 승자 위치) = C, 기간 중 선택(Line-16·세대 선행·포트폴리오 재배분·HDD 매각·엘피다 불참) = M.',
          },
          {
            type: 'matrix',
            headers: [
              'M (액션 · 메커니즘)',
              'C2-a 경기자 구조 = 6강 잔존·엘피다 체력 열위',
              'C2-b 배분 규칙 = 캐파·원가 + 전환 성패가 퇴출 결정',
              'C2-c 수요·거래 = PC→모바일 전환·외생 충격',
              'C2-d 출발 위치 = 1차전 승자·현금 우위',
            ],
            rows: [
              {
                label: 'Line-16 역사이클 착공·가동 (2010-05→2011-09·12조·세계 최대 메모리 팹) — 메커니즘: 역사이클 캐파 선점',
                cells: [
                  { text: '◎¹ ↖(Line-16×C2-b 참조) — 체력 열위 경기자 잔존 국면에서 12조 투입 자체가 소모전 압박 병행', tone: 'clearSoft' },
                  { text: '◎¹ C가 캐파·원가 게임이었으므로 발화 → 가동과 동시에 20nm급 DDR3 양산(생산성 30nm 대비 2배 이상), 3강 압축 후 1위 유지의 캐파 기반 (엘피다는 투자 여력 없이 부채 4,480억 엔 파산)', tone: 'clear' },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: '공정·모바일 세대 선행 (30nm 2010-07·20nm급 2011-09 세계 최초 / LPDDR3 2012-08 세계 최초) — 메커니즘: 기술 전환 심판대 선점',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '◎¹ C가 "전환 성패 = 퇴출 순서"였으므로 발화 → 30nm→20nm급 세계 최초 연속 + 모바일 세대 선행으로 심판대 통과 — 같은 심판대에서 엘피다는 "PC→모바일 전환 실패" 명시로 탈락', tone: 'clear' },
                  { text: '◎¹ ↖(세대 선행×C2-b 참조) — 모바일 세대 선행이 수요 전환 방향과 정렬', tone: 'clearSoft' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: '포트폴리오 재배분 (Austin 메모리→로직 $4B 2012-08 · 시안 NAND 착공 2012-09) — 메커니즘: 수요 전환 추종 재배분',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '△² C가 PC→모바일 전환이었으므로 재배분 발화 → Austin 플래시 종료·28nm AP 전환($4B), 시안 NAND $7B(2014-05 양산). 믹스 이동의 점유율 정량 효과 미확인 — 부분 발화', tone: 'partial' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: 'HDD 사업 매각 (2011-04 Seagate $1.375B) — 메커니즘: 비핵심 경량화·NAND 집중',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '△¹ C가 모바일 전환(HDD 사양화)이었으므로 경량화 발화 → $1.375B 회수 + Seagate 지분·NAND 공급 파트너십 — 메모리 점유율 효과는 간접', tone: 'partial' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: '[배분] 엘피다 입찰 불참 (2012 — 참여 기록 부재) — 메커니즘: 다운턴 저가 매수 불행사',
                cells: [
                  { text: '△² C가 엘피다 체력 열위로 저가 매수 창 개방 — 불발(참여 기록 부재) → 마이크론이 인수해 모바일 DRAM 스케일+중앙 운영 체계 확보. 병기: (+) 3강 압축·공급 규율 유산 공유 / (−) 경쟁자 스케일 점프 허용 — 등급은 낮은 쪽', tone: 'partial' },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '△² ↖(엘피다 불참×C2-a 참조) — 현금 우위로 여력은 있었으나 배분은 불행사', tone: 'partial' },
                ],
              },
            ],
            footnotes: [
              '반사실 한계: 엘피다 입찰 참여의 반사실 검증 불가 — "불참"도 공식 확인이 아니라 참여 기록 부재로만 확인.',
              'C 교호작용: C2-c(수요 전환)는 C2-b의 "전환 성패=퇴출 규칙"을 만든 상류 변수 — 두 열은 독립이 아니라 인과 사슬.',
              '채움률: 8/20 = 40%.',
            ],
          },
          { type: 'h', text: 'CMO-3 · 다운사이클 (2022~23)' },
          {
            type: 'p',
            text: 'M/C 판별: 2022년 진입 시점의 소여(3강 과점·캐파→인증 이원화 진행·수요 절벽·현금 ~$63B와 2019 HBM팀 축소라는 출발 위치) = C, 기간 중 선택(무감산→감산 선회·CapEx/R&D 배분·Taylor·HBM 후순위·조직 무대응) = M. 주의: 2019 HBM팀 축소는 그 시점의 M이지만 2022년에는 C(출발 위치)로 전환 — 한 다운턴의 M이 다음 다운턴의 C가 된다.',
          },
          {
            type: 'matrix',
            headers: [
              'M (액션 · 메커니즘)',
              'C3-a 경기자 구조 = 3강 과점·퇴출 후보 부재',
              'C3-b 배분 규칙 = 범용 캐파 vs HBM 인증 이원화',
              'C3-c 수요·거래 = 코로나 수요 절벽·AI 전야',
              'C3-d 출발 위치 = 현금 $63B·HBM 후순위',
            ],
            rows: [
              {
                label: 'A5 · 무감산 선언→감산 선회 전 궤적 (2022-10-27 선언 → 2023-01-31 재확인 → 2023-04-07 감산 공식화 → 연말 연장) — 메커니즘: 소모전(퇴출 유도)',
                cells: [
                  { text: '✕¹ C가 3강 과점(전원 이윤극대화·퇴출 후보 부재)이었으므로 소모전 불발 → 퇴출자 0, Q1 2023 영업이익 0.6조(-96%·2009년 이후 최악)·DS -4.58조 사상 최대 적자, 2023-04-07 스스로 감산 공식화로 철회. 병기: (+) 범용 점유 방어→2025~26 사상 최대 실적 / (−) 메커니즘 불발·자진 철회 — 등급은 낮은 쪽', tone: 'adverse' },
                  { text: '—', tone: 'none' },
                  { text: '✕¹ ↖(무감산 궤적×C3-a 참조) — 수요 절벽이 버티기 비용을 증폭 (Q4 2022 DS 0.27조·8년 최저)', tone: 'adverse' },
                  { text: '△¹ C가 현금 ~$63B 요새였으므로 18개월 버티기는 가능, 철회 후에도 재무 훼손 없이 회복기 진입 — 가능 조건 성립, 퇴출 결과 불발', tone: 'partial' },
                ],
              },
              {
                label: '감산과 분리된 투자·R&D 역사이클 (2023 CapEx 53.1조·DS 48.4조 / R&D 28.34조 — 모두 사상 최대, 용처 HBM·DDR5 선단) — 메커니즘: 재무 요새 기반 역사이클 투자',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '△¹ C가 배분 규칙 이원화 중이었으므로 부분 발화 → 범용·선단(DDR5) 캐파는 회복기 실적으로 전환, HBM 인증 게임에서는 캐파·금액이 점유율로 전환 안 됨(A6 행 참조)', tone: 'partial' },
                  { text: '—', tone: 'none' },
                  { text: '◎¹ C가 현금 요새였으므로 발화 → 사상 최대 부문 적자 연도에 CapEx 53.1조·R&D 28.34조(매출 대비 10.9%) 동시 사상 최대 — 생산 감산과 투자·R&D 분리 집행 (SK는 적자 -7.7조에 CapEx ~10조로 절감 — 3강 중 삼성 단독)', tone: 'clear' },
                ],
              },
              {
                label: 'A4 · Taylor 다운사이클 착공 (2021-11 $17B 발표 → 2022 H1 착공) — 메커니즘: 리드타임 소화',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '△¹ C가 다운사이클이었으므로 부분 발화 → 착공은 성사됐으나 4nm→2nm 상향·수율·고객 확보로 가동 2026~27 순연, 투자 $17B→$37B+ — "업사이클 시점 가동" 배당 미실현', tone: 'partial' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: 'A6 · [배분] HBM 니치 후순위 (2019 팀 축소의 연장 — 다운턴 중 범용 우선 배분) — 메커니즘: 주력 우선 자원배분',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '✕¹ C가 HBM 인증 슬롯이 배분을 결정하는 게임으로 이동 중이었으므로 역효과 → HBM 40%(2023)→17%(2025 H1)·33년 만의 DRAM 역전. 수습(2023-09 HBM3 공급·2024-04 전담팀·2024-05 부문장 교체)은 전부 다운턴 종료 후 (같은 C에서 SK는 HBM 방향 유지 → 57%·DRAM 1위·OP 47.2조)', tone: 'adverse' },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: '[배분] 조직 구조 무대응 (통합·구조조정 기록 부재 — 리더십 교체는 2024-05 사후) — 메커니즘: 1차전형 조직 재편 불행사',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '△² C가 사상 최대 부문 적자 국면인데 1차전형 조직 재편은 불발(부재 자체가 기록된 사실) → 조직 배선 전환은 2024-05로 지연 — 2009 A1(◎)과의 대칭 실패', tone: 'partial' },
                  { text: '—', tone: 'none' },
                ],
              },
            ],
            footnotes: [
              '반사실 한계: "무감산 유지 / HBM 선행"의 대조군 없음 — SK·마이크론 대조(§6)로 보완하되 기업 간 포트폴리오·고객 구성 이질성은 통제 불가.',
              'C 교호작용: C3-d의 "HBM 후순위 출발"은 2019년 M(팀 축소)의 산물 — 한 다운턴의 M이 다음 다운턴의 C로 전환되는 순환이 핵심 교호작용. C3-b 이원화는 C3-c의 AI 전야와 동일 현상의 양면.',
              '채움률: 8/20 = 40%.',
            ],
          },
          { type: 'h', text: 'CMO-4 (예측) · 다음 다운사이클 (2028~29 창) — C는 예측, M은 제안, O는 원인 조건부 가설' },
          {
            type: 'p',
            text: '앞의 세 표와 결정적으로 다른 점: 과거 표의 O는 관측이지만 이 표의 O는 가설이다. 증거 첨자(¹²³) 대신 예측 표기 ᶠ(forecast)를 쓰고, 색 규칙도 바뀐다 — 세 원인 모두에서 ◎ᶠ가 기대되는 primary 셀(cause-robust)만 딥 그린이다. 다운사이클은 하나의 얼굴로 오지 않으므로, O가 원인에 따라 갈리는 셀은 ①②③ 변이로 분해한다. C는 §3 맥락 감사의 2026~28 값을 2028~29 창으로 연장한 예측, M은 §7 전략·§6 벤치마킹에서 제안된 선택지 — 아직 실행 전인 제안이다.',
          },
          {
            type: 'table',
            headers: ['원인', '경로', '조기 확인 트리거 (M6)', '시나리오 연결'],
            rows: [
              ['① 수요발', 'AI 투자수익률(CAPEX/ROI) 재평가 — 병목 모델 하방 민감도 최대(-31.5%), "꼭짓점은 FCF"', '빅테크 FCF 반전 · CapEx 25%+ 삭감 · GPU 임대가 6개월 -35%', 'C·D (합산 ~29%)'],
              ['② 공급발', '2027 말 부분 정상화 → 2028~29 신규 캐파 동시 도래(마이크론 Idaho·SK 용인 + 한국 신규 팹 2+2) + CXMT 캐파 15% 접근 — 수요 유지에도 과잉', '경쟁사 증설 공시(절제 균형 이탈) · 재고일수 · DRAM 계약가 감속 지속', 'A·B 내 사이클 조정'],
              ['③ 전환발', '3D DRAM·CXL·zHBM 채택 개시로 HBM 스택 수요 이동 — 부분적·비동기 다운턴', '3D DRAM 전력 50% 개선 입증 · 빅테크 커스텀 칩의 CXL/3D 채택', 'E (5~10%)'],
            ],
          },
          {
            type: 'matrix',
            headers: [
              'M (제안 액션 · 메커니즘)',
              'C4-a 경기자 = 3강 절제 + CXMT',
              'C4-b 배분 규칙 = 인증 지배·이원화 고착',
              'C4-c 수요·거래 = 계약 바닥·비동기 사이클',
              'C4-d 출발 위치 = HBM 회복 중·재무 요새·4단계 격차',
            ],
            rows: [
              {
                label: 'M1 · 계약 바닥 선점 (RS-8·RS-4·D12 — 다운턴 도착 전 커버리지) — 메커니즘: 계약적 매출 바닥',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  {
                    text: '원인 의존 [primary]',
                    parts: [
                      { tag: '① 수요발 ◎ᶠ', text: '현물가 붕괴에도 take-or-pay·NTB 커버리지만큼 매출 바닥 유지 — 붕괴가 매출에 미도달. 잔여 리스크는 고객 신용·재협상 압박', tone: 'clearSoft' },
                      { tag: '② 공급발 ◎ᶠ', text: '과잉은 비계약 물량에만 노출 — 커버리지가 하한 방어, 3사 커버리지 확산은 치킨게임 재점화 유인 자체를 제거', tone: 'clearSoft' },
                      { tag: '③ 전환발 △ᶠ', text: '계약은 기존 제품 기준 — 수요가 대체 기술로 이동하면 갱신 시점에 커버리지 공동화 (계약은 사이클은 막아도 전환은 못 막는다)', tone: 'partial' },
                    ],
                  },
                  { text: '△ᶠ (원인 공통) 발화 창은 다운턴 도착 전뿐 — 영업 4단계 격차(SK·마이크론 선행)만큼 바닥의 격차 ↖(M1×C4-c)', tone: 'partial' },
                ],
              },
              {
                label: 'M2 · 다운사이클 M&A + PMI 각본 (D9 EV/EBITDA 5배 트리거, B3 이식) — 메커니즘: 다운턴 저가 매수(기술 자산·인재)',
                cells: [
                  {
                    text: '원인 의존 [primary]',
                    parts: [
                      { tag: '① 수요발 ◎ᶠ', text: '밸류에이션 전반 폭락 → 트리거 발동 확률·매수 창 최대 (2012 엘피다 불참 △²의 교정 실행 기회)', tone: 'clearSoft' },
                      { tag: '② 공급발 △ᶠ', text: '3사 계약 바닥이 헐값 매물 출현을 억제 — 매물은 장비·소재·설계 인접군 중심', tone: 'partial' },
                      { tag: '③ 전환발 ◎ᶠ', text: '구세대 자산 급락 + 신기술 IP·팀 매수 창 — 단 매수 대상 선별은 원인 판별(M6)에 종속', tone: 'clearSoft' },
                    ],
                  },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '◎ᶠ ↖(M4×C4-d 참조) — 현금 요새가 발화 전제 (2023 분리 집행 선례)', tone: 'clearSoft' },
                ],
              },
              {
                label: 'M3 · R&D 하한 + 차세대 별동대 (D6·D13 — zHBM·3D DRAM·CXL·AI SSD, B1 이식) — 메커니즘: 다운턴 중 기술 전환 선행',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '◎ᶠ cause-robust — ①수요발: 다운턴 중 인증·차세대 선행이 회복기 배분 결정(2022~23 SK 실증의 반복) / ②공급발: 과잉기 범용 마진 붕괴 시 인증·커스텀 층만 방어 — 선행 가치 최대 / ③전환발: 전환 자체가 심판대 — 별동대가 유일한 응수(시나리오 E 보험). 세 원인 모두 ◎ᶠ = 어떤 얼굴의 다운턴이 와도 발화', tone: 'clear' },
                  { text: '—', tone: 'none' },
                  { text: '◎ᶠ ↖(M3×C4-b 참조) — HBM4E 선행 유지가 "후순위 출발 위치"를 반전시키는 마지막 창', tone: 'clearSoft' },
                ],
              },
              {
                label: 'M4 · 옵션형 캐파 + 재무 요새 (RS-1 Shell 선행·장비 단계 + RS-5) — 메커니즘: 교정형 역사이클 투자',
                cells: [
                  { text: '◎ᶠ ↖(M4×C4-c 참조) — ②공급발 국면에서 신속 증설 능력의 보유 자체가 절제 균형의 억지력 (게임이론 렌즈)', tone: 'clearSoft' },
                  { text: '—', tone: 'none' },
                  { text: '◎ᶠ cause-robust — ①수요발: 장비 미반입 동결로 확정 캐파 대비 손실 최소 / ②공급발: 증설 중단 옵션 행사가 곧 절제 신호 겸용 / ③전환발: Shell·인프라는 신기술 라인 전용 가능 — 전환 유연성. 옵션 가치는 원인과 무관하게 변동성 자체에 비례 (실물옵션 렌즈)', tone: 'clear' },
                  { text: '◎ᶠ (원인 공통) 재무 요새는 전 M의 공통 전제 — 2023년 감산·투자 분리 집행이 사내 선례', tone: 'clearSoft' },
                ],
              },
              {
                label: 'M5 · 게임 분리 (RS-6 1c 원가 + RS-2 바벨 + MB-4 커스텀 — 치킨게임 봉인) — 메커니즘: 소모전 불행사 + 고부가 판 옮기기',
                cells: [
                  {
                    text: '원인 의존 [primary]',
                    parts: [
                      { tag: '① 수요발 △ᶠ', text: '수요 붕괴 시 국가보조 CXMT의 상대 체력 우위 — 로엔드 방어선 후퇴 압박, 바벨 하단은 원가 사수가 마지노선', tone: 'partial' },
                      { tag: '② 공급발 ◎ᶠ', text: 'CXMT 캐파가 과잉의 일부일 때 소모전 재사용 대신 고부가 층 이동만 작동 (A5 ✕의 직접 교훈)', tone: 'clearSoft' },
                      { tag: '③ 전환발 △ᶠ', text: '전환기엔 고부가 층의 정의 자체가 이동 — MB-4 커스텀도 재정의 필요', tone: 'partial' },
                    ],
                  },
                  { text: '◎ᶠ ↖(M5×C4-a 참조) — 커스텀·솔루션 층은 인증 게임의 상단 확장', tone: 'clearSoft' },
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                ],
              },
              {
                label: 'M6 · 맥락 EWI + 조직 대응 매뉴얼 (RS-9·D15·D16 — 트리거 30일 내 집행) — 메커니즘: 데이터 트리거 규율 + 조직 재편 사전 배선',
                cells: [
                  { text: '—', tone: 'none' },
                  { text: '—', tone: 'none' },
                  { text: '◎ᶠ cause-robust — 이 M의 산출물이 곧 원인 판별이다: ①은 FCF 반전·CapEx -25%·GPU 임대가 -35%로, ②는 증설 공시·재고일수·CXMT 캐파로, ③은 전력 50% 개선·커스텀 칩 CXL 채택으로 조기 식별 → M1~M5의 행사 스위치를 켠다. 원인 구분이 무의미한 유일한 셀 — 판별기 그 자체', tone: 'clear' },
                  { text: '△ᶠ (원인 공통) 다운턴 조직 대응 매뉴얼 사전 정의 — 2022~23 조직 무대응(△²)의 반면교사', tone: 'partial' },
                ],
              },
            ],
            footnotes: [
              '가설 한계: 모든 등급은 예측(ᶠ) — §3 맥락 연장과 과거 3표·경쟁사 자연 실험(§6)에서 유추한 기대값. 다운턴 도착 시 관측으로 대체·재감사한다.',
              '원인 판별 위임: 원인 의존 셀(M1·M2·M5)의 행사 여부·강도는 M6이 판별한 원인에 종속 — 실행 순서는 "M6 상시 → M1 즉시(창 마감 전) → 나머지는 트리거 발동 시".',
              '채움률: 13/24 = 54%.',
            ],
          },
          {
            type: 'p',
            text: '매트릭스가 §7에 주는 추가 통찰: ① 치킨게임 봉인(3순위)은 반사실이 아니라 기실현 관측 — 2023-04-07 감산 선회가 소모전 불발을 삼성 스스로 실증했고, §5의 A5 판정은 이를 반영해 ✕(불발·자진 철회)로 강등했다. ② A5 폐기 ≠ 역사이클 폐기 — 같은 2023년의 감산+CapEx·R&D 사상 최대 분리 집행은 §7 2순위와 D6 R&D 하한이 신설 규범이 아니라 2023년 행동의 제도화임을 보여준다. ③ 무행동도 배분이다 — 엘피다 불참 vs 마이크론 인수 대조는 D9 M&A 펀드의 트리거·PMI 각본을, 2008 SanDisk 철회는 그 가격 규율의 사내 선례를 정당화한다. ④ 2009 조직 통합(◎) vs 2022~23 무대응(△)의 대칭 실패는 D16에 다운턴 조직 대응 매뉴얼 사전 정의가 필요한 이유다. ⑤ 예측 표(CMO-4)의 cause-robust 셀은 M3(별동대)·M4(옵션 캐파·재무 요새)·M6(EWI) 셋뿐 — §7 순위·다섯 렌즈 교차 검증의 프레임워크 불변 전략과 정확히 겹치며, 원인 의존 셀(M1·M2·M5)은 행사를 M6의 원인 판별에 위임한다.',
            refs: 'sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md',
          },
        ],
      },
      {
        num: 6,
        title: '경쟁사 CMO 비교 — 같은 맥락, 다른 선택, 갈라진 결과 (DRAM·NAND)',
        blocks: [
          {
            type: 'p',
            text: '같은 다운턴 맥락(C)을 공유한 경기자들이 서로 다른 메커니즘(M)을 발화시켰다면, 그것은 자연 실험(natural experiment)이다 — 결과(O)의 차이가 곧 선택의 차이를 증명한다. §5의 삼성 액션(A1~A6)과 경쟁사의 같은 시기 액션을 나란히 놓고 DRAM·NAND로 나눠 비교한 뒤, 경쟁사가 잘한 것을 벤치마킹 항목(B1~B5)으로 추출해 §7 전략에 이식한다.',
          },
          {
            type: 'h',
            text: 'DRAM — 갈린 것은 지출의 양이 아니라 배분의 방향이었다',
          },
          {
            type: 'table',
            headers: ['경기자', '다운턴 액션 (M)', '삼성(A5·A6)과 달랐던 점', '결과 (O)', '판정'],
            rows: [
              ['SK하이닉스', '2023년 영업적자 -7.7조 속에서 CapEx를 ~10조로 절감(삼성과 같은 "절감")하되, HBM 니치와 NVIDIA 공동설계의 방향은 유지 — HBM4 아키텍처 공동 정의, TSV·MR-MUF 품질 기반 HBM3E 사실상 단독 공급, 패키징 내재화(청주 19조)', '삼성이 범용 캐파를 방어(A5)하며 니치를 후순위(A6)에 둘 때, SK는 돈의 양이 아니라 방향을 바꿨다 — 축소 국면에서도 "다음 게임의 인증 슬롯"에 자원 집중', '33년 만의 DRAM 1위(2025 Q1 36% vs 34%), HBM 57%(vs 삼성 22%), Rubin 2/3+ 락인, FY2025 OP 47.2조로 삼성 전사(43.6조) 추월 — 메모리부문의 1.9배, Q1 2026 OPM 72%', '◎◎ 최우수 — 니치 선행 + 공동설계 락인'],
              ['마이크론', '2022~23은 전통적 수축(CapEx 10%+ 삭감, FY2023 매출 -49%). 예외적 액션 둘: ① (2차 치킨게임) 파산한 엘피다 인수 — 모바일 DRAM 스케일 + 다사이트 중앙 운영 체계(central coordination·고객 요구 중앙 DB) ② 회복기 "수요 선점 → 팹 건설" 역순 — HBM 전량 사전 완판 후 캐파 확대, CHIPS 보조금 $64.4억, SCA 16건 $100B·예치금 $22B, "with discipline" 공개 신호 + Shell 단계화', '삼성이 캐파를 먼저 확정하고 고객을 찾을 때, 마이크론은 수요 확약을 먼저 잠그고 CapEx를 나중에 집행 — 투자 리스크의 순서를 뒤집었다', 'FY2023 $15.5B(-49%) 저점에서 FY26 Q3 $41.46B(+346%)·GM 84.9% — 단 HBM 기술 순위전에서는 후발(Rubin 배정 "잔여" 최소)', '△→◎ — 수축 자체는 교훈 아님, 다운턴 M&A·계약 구조 혁신은 1급'],
              ['CXMT', '(참고) 다운턴과 무관한 국가 자금 진입 — 보수함수가 달라 비교 불가(§4 참조)', '—', '—', '벤치마킹 대상 아님'],
            ],
          },
          {
            type: 'h',
            text: 'NAND — 체력 열위자와 제재 대상자의 생존 공식',
          },
          {
            type: 'table',
            headers: ['경기자', '다운턴·제약 하의 액션 (M)', '삼성과 달랐던 점', '결과 (O)', '판정'],
            rows: [
              ['Kioxia (/SanDisk)', '재무 체력 열위의 수세 국면 — 삼성 무감산 압박(A5)의 표적 — 에서 캐파 경쟁 대신 아키텍처 세대를 선행: 2023년 업계 최초 CBA(hybrid bonding) 양산, 2026 CapEx +41% 전환 가속, SanDisk 팹 공동투자 JV로 고정비 분담', '체력으로 못 이기는 게임을 세대 전환의 순서로 바꿨다 — 삼성·SK보다 2~3년 먼저 hybrid bonding 양산 리스크를 소화', 'BiCS10 332단·밀도 37.6 Gb/mm²(QLC)로 SK V9 대비 +30% — 적층 경쟁 선두 진입. SCADA SLC AI SSD 전략 파트너 선점(SK와 함께)', '◎ — 체력 열위자의 생존 공식 = 아키텍처 선행'],
              ['YMTC', '2022년 12월 엔티티 리스트 등재라는 강제된 다운턴 하에서, 원가 경쟁 대신 Xtacking 자체 아키텍처 IP + hybrid bonding 핵심 특허 지배 + 국산 장비 라인(50%+ 목표)으로 제약을 우회', '제약(장비 차단)을 받아들이는 대신 의존의 방향을 역전 — 이제 삼성·SK가 V10 세대에서 YMTC 라이선스에 의존하는 정황', '점유 ~5%(2023) → 13%(Q3 2025), 294단 글로벌 동세대 복귀, 3공장 DRAM/HBM 확장 시도', '◎ (경계 겸 벤치마킹) — 제약의 아키텍처 우회'],
            ],
          },
          {
            type: 'p',
            text: '삼성의 NAND 위치 (자기 대조): 무감산 압박(A5)은 범용 점유 방어에 기여했으나, hybrid bonding IP는 YMTC 의존 정황이 있고 SCADA AI SSD 니치는 SK·Kioxia에 선점당한 후발이다 — DRAM의 A6 패턴(니치 후순위 → 레퍼런스 고착)이 NAND에서 반복될 위험이 §7 전략의 긴급성을 높인다.',
            refs: 'wiki/concepts/nand-process-transition.md · wiki/entities/nvidia-cmx-scada.md · wiki/entities/ymtc.md',
          },
          {
            type: 'h',
            text: '벤치마킹 종합 — 경쟁사가 잘한 것 → 삼성 이식처',
          },
          {
            type: 'table',
            headers: ['#', '경쟁사가 잘한 것', 'CMO 해석 (왜 통했나)', '삼성 이식처'],
            rows: [
              ['B1', 'SK: 다운턴 중 "다음 게임" 선행 — 적자 속 CapEx 절감에도 HBM 방향 유지', '다운턴 대응의 변수는 지출의 양이 아니라 배분의 방향 — 축소 국면이야말로 니치 전환의 최적기(§5 A6의 정확한 반례)', 'D13 차세대 별동대 + D6 R&D 하한 — 다음 다운턴에 zHBM·3D DRAM·CXL·AI SSD 방향 유지'],
              ['B2', 'SK: 고객 공동설계 락인 — HBM4 아키텍처를 NVIDIA와 공동 정의, 패키징 내재화', '인증 게임(§3 #3)에서 공동설계는 인증 슬롯의 선점권 — 영업 4단계(선급금·Strategic Partner)까지 SK 선행', 'MB-4 커스텀 공동설계 + RS-3 전환비용 + SCA 4단계 격차 해소'],
              ['B3', '마이크론: 다운턴 M&A + PMI 역량 — 파산 엘피다 인수로 스케일 점프, 다사이트 중앙 운영 체계화', '§4 "다운턴 저가 매수" 메커니즘의 최대 실증 — 인수 자체가 아니라 인수 후 통합(중앙 DB·표준화)이 배당을 결정', 'D9 M&A 펀드에 트리거뿐 아니라 PMI 실행 각본 추가 + 공정·수율·고객요구 중앙 DB'],
              ['B4', '마이크론: 수요 선점 → 팹 건설 역순 + 계약·보조금 레버리지 — 사전 완판 후 CapEx, SCA $100B 공시, 보조금 $64.4억', '투자 리스크의 순서 역전 — 수요 확약이 CapEx를 정당화하는 구조는 다운턴이 와도 무너지지 않는다', 'RS-8·D12 가속(삼성은 후발 — 속도가 벤치마킹 포인트) + 정부 보조금 레버리지 극대화'],
              ['B5', 'Kioxia·YMTC: 제약 국면의 아키텍처 선행 — CBA 최초 양산, Xtacking 자체 IP', '체력·장비로 못 이기는 게임은 세대·IP의 순서로 바꾼다 — 다운턴에도 아키텍처 전환 R&D를 멈추지 않은 쪽이 다음 세대의 갑이 된다', 'SA-2 NIL(EUV 우회) + BV NAND·hybrid bonding 자체 IP(RS-6·RS-7 — YMTC 의존 해소)'],
            ],
          },
          {
            type: 'quote',
            text: '비교의 결론 — SK가 증명한 것은 "다운턴에 돈을 더 쓰라"가 아니라 "방향을 바꾸라"는 것이다. 2023년 SK도 삼성처럼 CapEx를 줄였지만, HBM·공동설계의 방향을 지킨 쪽과 범용 캐파를 지킨 쪽의 결과는 3년 뒤 DRAM 왕좌의 주인을 갈랐다. 갈린 것은 지출의 양이 아니라 배분의 방향이었다.',
            context: 'DRAM·NAND 비교가 §7 전략에 주는 단일 교훈',
          },
        ],
      },
      {
        num: 7,
        title: '이 렌즈가 도출하는 최적 전략 — 다음 다운턴의 CMO를 설계하는 순서',
        blocks: [
          {
            type: 'p',
            text: 'CMO가 묻는 질문은 하나다: "다음 다운턴에서 원하는 결과(O)에서 출발해, 2026~28의 맥락(C)에서 실제로 발화하는 메커니즘(M)만으로 대응을 재조립하면 무엇부터 해야 하는가?" 발화의 창이 닫히는 순서 — 지금 하지 않으면 영영 못 하는 것부터 — 로 배열한다. 각 순위의 근거에는 §5 액션 판정(A1~A6)·§6 경쟁사 벤치마킹(B1~B5)과의 연결을 명시했다.',
          },
          {
            type: 'strategy',
            items: [
              {
                rank: 1,
                name: '다운턴이 오기 전에 매출 바닥을 계약으로 만들어라 (RS-8·RS-4 계약 구조, D12)',
                what: '"안 사가도 돈을 내는" take-or-pay 다년 계약, "이 가격 밑으로는 안 판다"는 가격 하한(NTB), 하한을 보장받는 대신 상승분의 절반을 나누는 Participating Forward를 계약 커버리지의 표준으로 만드는 것 — RS-8 구조화 매출 헷지와 RS-4 장기계약이고, 실행 결정은 D12다. 여기에 DP-1이 한 차원을 더한다 — 커버리지 총량만이 아니라 만기 분산을 KPI로 삼는 것이다. 계약은 급락을 막는 것이 아니라 미루므로, 만기가 2028~29 한 시점에 몰리면 그때 시장가로 한꺼번에 재가격되어 커버리지가 두꺼울수록 낙차가 커진다. 만기 집중도(HHI) 산출 체계는 아직 미측정이며(DX-7) 2026 Q4까지 세우는 것이 첫 실행 항목이다.',
                why: '§5 대응 액션 목록의 유일한 공백이자 §6 B4(마이크론 계약·수요 선점 역순)가 이미 실증한 구조이며, 발화 조건(공급 부족 호황 + 고객의 물량 불안)이 지금만 성립하기 때문이다 — 고객이 스스로 선수금을 예치하고 다년 계약에 서명하는 국면은 다운턴이 시작되는 순간 끝난다. 과거 공식이 "폭락을 체력으로 버틴다"였다면, 새 공식은 "폭락이 매출에 도달하지 못하게 한다"다.',
                links: [
                  { label: 'Strategy 탭 → Robust (RS-8·RS-4)', hash: '#/strategy/robust' },
                  { label: 'Strategy 탭 → Decisions (D12)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/strategies/invariant/rs8-structured-revenue-hedging.md · sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md · sources/filings/micron-q3-fy26.md',
              },
              {
                rank: 2,
                name: '역사이클 투자는 유지하되, 사는 것을 캐파에서 인증·기술·자산으로 바꿔라 (RS-5 + D9 + D6, RS-1 옵션형만)',
                what: '"남들이 멈출 때 산다"는 역사이클 메커니즘은 유지하되 대상을 바꾸는 것: ① 다운턴에 싸지는 기술 자산·인재를 D9 M&A 펀드(EV/EBITDA 5배 트리거)로 매수, ② 다운사이클에도 R&D 예산 하한을 이사회 정책으로 못박아(D6) HBM4E 6개월 선행 같은 다음 세대 인증 준비를 지속, ③ 캐파형 역사이클은 RS-1 옵션형(Fab Shell + 단계 반입)으로만.',
                why: '§5 판정 ◎ 액션 A2(역사이클 매수)·A3(재무 요새)·A4(다운턴 착공)의 직계이자 A6(✕ HBM 실기)의 반면교사이며, §6 B1(SK 니치 방향 유지)·B3(마이크론 엘피다 PMI)·B5(아키텍처 선행)가 경쟁사 실증 사례다. 여전히 발화하는 메커니즘 중 배당이 가장 크지만 발화 대상을 교정해야 한다. 인증이 배분을 결정하는 맥락에서 인증 없는 캐파는 점유율로 전환되지 않는다. 엘피다는 다운턴 중 기술 전환 실패로 죽었고, 2022~23의 삼성은 범용 캐파를 지키느라 HBM 전환을 놓쳤다 — 두 사례가 같은 경고를 두 번 반복한다.',
                links: [
                  { label: 'Strategy 탭 → Robust (RS-1·RS-5)', hash: '#/strategy/robust' },
                  { label: 'Strategy 탭 → Decisions (D6·D9)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/strategies/invariant/rs5-financial-discipline-reinvestment.md · wiki/strategies/invariant/rs1-options-based-capacity.md · sources/articles/june-2026-market-update-2026-06-14.md',
              },
              {
                rank: 3,
                name: '치킨게임 메커니즘을 CXMT에 재사용하지 마라 (RS-6 원가 방어 + RS-2 바벨 + MB-4 판 옮기기)',
                what: '다운턴이 오면 "저가 공세로 열위 경쟁자를 털어낸다"는 과거 승리 공식을 CXMT에 적용하려는 유혹을 명시적으로 금지하고, RS-6 1c nm 원가 우위로 로엔드 손실 한계를 관리하며, RS-2 바벨과 MB-4 커스텀 솔루션으로 국가 보조가 닿지 않는 고부가 층에서 승부하는 것.',
                why: '§5·M×C 매트릭스에서 ✕(불발·자진 철회) 판정을 받은 A5("인위적 감산 없다" → 2023-04-07 감산 공식화)의 폐기·대체다 — 3강 맥락 불발은 이미 치른 수업료다. 소모전 메커니즘의 발화 조건은 "상대가 이윤 극대화 경기자"인데 CXMT는 이 조건을 충족하지 않는다 — 손실을 국가가 메우는 상대는 가격으로 퇴출되지 않는다. 부러진 메커니즘의 재발화 시도는 결과를 만들지 못할 뿐 아니라 3강 절제 균형까지 파괴하는 이중 비용을 치른다.',
                links: [{ label: 'Strategy 탭 → Robust (RS-2·RS-6) / Core (MB-4)', hash: '#/strategy/robust' }],
                refs: 'wiki/entities/cxmt.md · sources/articles/apple-cxmt-china-dram-2026-07-08.md',
              },
              {
                rank: 4,
                name: 'EWI에 결과 지표만이 아니라 맥락 지표를 올려라 (RS-9·D15·D16)',
                what: '조기경보의 감시 대상을 "다운턴의 도착"(가격·수요·FCF 같은 결과 변수)에서 "맥락의 변화"(어떤 메커니즘이 유효한지를 결정하는 조건 변수)로 확장하는 것: 계약 커버리지 비율(1순위 메커니즘 유효성), 경쟁사 증설 공시(절제 균형 유지 여부·D16 발동 신호), CXMT 하이엔드 진입(게임 분리 유효성), 메모리 종류별 사이클 위치(비동기 다운턴 감시).',
                why: 'CMO의 고유한 기여다 — 어떤 메커니즘을 발화시킬지는 맥락이 결정하므로, 전략의 마지막 조각은 맥락 자체를 계기판에 올리는 것이다. 과거 다운턴의 승자가 다음 다운턴에서 지는 경로는 신호를 못 봐서가 아니라, 낡은 지도를 들고 신호를 읽어서다.',
                links: [
                  { label: 'EWI 탭 (지표·트리거)', hash: '#/ewi/triggers' },
                  { label: 'Strategy 탭 → Decisions (D15·D16)', hash: '#/strategy/decisions' },
                ],
                refs: 'wiki/strategies/invariant/rs9-demand-inflection-sensing.md · sources/raw-notes/demand-inflection-ewi-2026-06.md',
              },
            ],
          },
          {
            type: 'p',
            text: 'SP-2가 이 순위에 더하는 것 — 속도 축과 몸의 문제. 이 네 순위는 전부 원인을 다룬다. SP-2가 추가한 속도 축은 두 가지를 얹는다. ① 감별을 대응보다 앞에 놓는다 — 4순위(맥락 EWI)는 이 렌즈에서 마지막이지만 다운턴이 실제로 도착하면 첫 번째 액션이 된다: 도착 판정 후 30일간은 비대칭 액션을 금지하고 원인·속도를 확정한 뒤 처방을 분기시키는 것이 DR-1 감별 프로토콜이다. 이 렌즈의 언어로는 — 어떤 M을 발화시킬지 정하기 전에 C가 무엇인지부터 확정하라. ② 몸을 바꿀 수 있는지가 새 변수다 — 감산이 무효인 수요발·침식형에서 남는 액션은 캐파의 목적지 변경이다. DRAM↔CIS 설비 공용률 80%(전환 시 캐파 -50%)·전환 리드타임 9~12개월이라는 실물 제약 때문에 도착 후에 시작할 수 없고, 평시에 최소 1회 실증해두는 것이 DP-6이다. 오스틴 메모리→로직 전환($3.6B, 2010-06 착수 → 2012-08 완료)이 그 선례이며, 대비기에 착수했기에 다운턴 중에 완료할 수 있었다.',
            refs: 'wiki/downturn/response-playbook.md · wiki/downturn/preparation.md · sources/articles/fab-toolset-commonality-conversion-2026-08.md',
          },
          {
            type: 'quote',
            text: '시나리오 렌즈와 어떻게 다른가 — 시나리오 플래닝이 "어떤 미래가 오는가"를 묻는다면, CMO는 "과거의 어떤 교훈이 그 미래로 이전 가능한가"를 심사한다. 다섯 렌즈 중 유일하게 시간을 거꾸로 보며, 그래서 이 렌즈의 고유 경고는 미래가 아니라 기억을 향한다: 승자의 성공 공식이야말로 가장 위험한 자산이다.',
            context: 'CMO 렌즈의 고유 결론',
          },
        ],
      },
      {
        num: 8,
        title: '이 렌즈의 결론',
        blocks: [
          {
            type: 'quote',
            text: '지난 전쟁의 교범을 다음 전쟁에 그대로 들고 가지 마라 — 지금만 열려 있는 새 메커니즘(계약 바닥)부터 잠그고, 여전히 발화하는 메커니즘(역사이클)은 대상을 교정해서 쓰고, 부러진 메커니즘(치킨게임)은 봉인하고, 맥락의 변화 자체를 계기판에 올려라.',
            context: '2022~23이 증거다 — 복제된 공식이 낡은 게임(범용 캐파)을 이기는 동안 새 게임(HBM 인증)을 놓쳤고, 그 대가가 40%→17%와 33년 만의 역전이었다',
          },
        ],
      },
    ],
  },
]
