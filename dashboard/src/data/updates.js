// 대시보드·위키 업데이트 내역 (시간 역순, 최신이 위)
//
// 출처: log.md + version.js bump 이력. 사람이 손수 큐레이팅.
// 새로운 ingest·build 사이클이 끝나면 여기에 한 entry 추가하는 것이 컨벤션.
//
// entry 스키마:
//   - date:    'YYYY-MM-DD'                — 작업 종료 시점
//   - type:    'ingest' | 'build' | 'query' | 'lint' | 'migration'
//   - title:   짧은 제목 (1줄)
//   - summary: 1~2 문장 요약
//   - version: 'v2.7.8' 또는 null (dashboard 변경 있을 때만)
//   - tags:    ['HBM', 'Counterpoint', ...]   — 필터 칩
//   - items:   [{ label, detail? }]            — 구체 변경 (확장 시 표시)
//   - links:   [{ label, href }]               — 외부/내부 출처

export const UPDATES = [
  // ── 2026-08-07 (iii) ─────────────────────────────────────────────────────────
  {
    date: '2026-08-07',
    type: 'build',
    version: 'v2.37.2',
    title: 'CMO 렌즈 액션 추적 신설 — 다운턴 액션 효과 판정 → 전략 도출 과정 시각화',
    summary:
      '피드백("다운턴에서 어떤 액션을 했고 어떤 액션이 효과가 있었는지 파악해, 효과가 분명했던 액션을 참고해 전략을 도출하고 그 사고 과정을 시각적으로")에 따라 CMO 렌즈에 §5 "액션 추적" 신설. 삼성의 다운턴 실제 액션 6건(A1 사업부 통합 · A2 퇴출 직후 역사이클 증설 · A3 재무 요새 · A4 Taylor 다운턴 착공 · A5 감산 거부 · A6 HBM 니치 후순위)을 효과 판정(◎ 분명 4건 / △ 조건부 1건 / ✕ 역효과 1건) → 맥락 감사(지금도 성립?) → 2026 전략 번역의 4단계 파이프라인으로 추적. 대시보드에 신규 trace 블록 렌더러(과거 액션 → 효과·판정 배지 → 전략 번역 3단 카드) 추가, §6 전략 카드에 A1~A6 연결 명시. 기존 §5·6은 §6·7로 재번호. 패치 v2.37.2.',
    tags: ['스토리라인', 'CMO', '액션 추적', '효과 판정', '다운턴', 'dashboard'],
    items: [
      { label: '§5 액션 추적 신설', detail: '사고 흐름 4단계(액션 추출 → 효과 판정 ◎/△/✕ → 맥락 감사 → 전략 번역) mermaid + 액션 유효성 판정 표 7열 (위키) / trace 카드 6장 (대시보드)' },
      { label: '판정 결과', detail: '◎ 분명: A1 구조 대응·A2 역사이클 매수·A3 재무 요새·A4 다운턴 착공("다운턴을 사용하는 시간으로") / △ A5 감산 거부(6강형 공식 — 조건 소멸로 폐기·대체) / ✕ A6 HBM 실기(반면교사)' },
      { label: '전략 연결 명시', detail: '§6 전략 2순위=A2·A3·A4 직계+A6 반면교사, 3순위=A5 폐기·대체, 1순위(계약 바닥)=과거 액션 목록의 유일한 공백(신규 메커니즘) — 각 전략 카드 why에 A번호 배선' },
      { label: 'Storyline.jsx', detail: '신규 trace 블록 렌더러 — 과거 액션(시기) → 효과+판정 배지(emerald/amber/red) → 2026 전략 번역 3단 카드, 반응형·SourceLink 출처' },
    ],
    links: [
      { label: 'storyline-cmo.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline-cmo.md' },
    ],
  },
  // ── 2026-08-07 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-08-07',
    type: 'build',
    version: 'v2.37.1',
    title: 'CMO 렌즈 표 정리 — 사례 분해·메커니즘 감사 요약 표 2종 추가',
    summary:
      '피드백("CMO를 표로 정리")에 따라 CMO 렌즈에 요약 표 2종 추가: §2 사례 분해 표(CMO-1~3 + 다음 다운턴 설계 CMO-4를 Context·Mechanism·Outcome·교훈 5열로 대조), §4 메커니즘 감사 표(메커니즘 8종의 과거 발화·2026~28 판정[유지/강화/부러짐/약화/신규]·판정 근거·전략 배선). 기존 서사 본문은 유지, 표는 요약 진입점. wiki storyline-cmo.md ↔ dashboard storylineLenses.js 동기. 패치 v2.37.1.',
    tags: ['스토리라인', 'CMO', '표', 'dashboard'],
    items: [
      { label: '§2 사례 분해 표', detail: '구성(CMO-1·2·3·4설계) × Context·Mechanism·Outcome·다음 다운턴에의 교훈 — 2022~23 결과 이질성을 한 행으로 대조' },
      { label: '§4 메커니즘 감사 표', detail: '재무 요새·저가 매수·기술 전환(유지·강화) / 소모전·무차별 캐파(부러짐·약화) / 계약 바닥·SW 락인·EWI 규율(신규) — 각각 판정 근거(§3 맥락 변수 번호)와 RS/D 전략 배선 명시' },
    ],
    links: [
      { label: 'storyline-cmo.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline-cmo.md' },
    ],
  },
  // ── 2026-08-07 ───────────────────────────────────────────────────────────────
  {
    date: '2026-08-07',
    type: 'build',
    version: 'v2.37.0',
    title: '스토리라인 렌즈 5호 — CMO(Context-Mechanism-Outcome) 다운턴 분석 렌즈 추가',
    summary:
      '리얼리스트 평가(Pawson & Tilley)의 CMO 방법론으로 삼성 메모리의 과거 다운턴 3건(1차 치킨게임 2007~09, 2차 치킨게임 2010~13, 다운사이클 2022~23)을 맥락(C)-메커니즘(M)-결과(O) 구성으로 분해하고, 2026~28 맥락 감사(6대 구조 변화)와 메커니즘 감사(발화·부러짐·신규)를 거쳐 차기 다운턴 대비 전략 4순위를 도출하는 다섯 번째 렌즈 신설. 핵심 관측: 2022~23의 결과 이질성 — 복제된 역사이클 공식이 범용 게임을 이기는 동안 HBM 인증 게임을 놓침(40%→17%·33년 만의 역전). 위키 storyline-cmo.md ↔ dashboard storylineLenses.js 동기, 마스터 스토리라인 교차 검증 표를 5렌즈 6열로 확장. 마이너 v2.37.0(Storyline 하위 메뉴 추가).',
    tags: ['스토리라인', 'CMO', '다운턴', '치킨게임', '역사이클', 'take-or-pay', 'CXMT', 'dashboard'],
    items: [
      { label: '사례 분해 (§2)', detail: 'CMO-1 소모전 완전 발화(Qimonda 퇴출·2010 투자 5.5조→9조), CMO-2 기술 전환 심판대(Elpida PC→모바일 실패), CMO-3 결과 이질성(범용 승리·HBM 니치 상실)' },
      { label: '맥락 감사 (§3)', detail: '6대 변화 — 3강 절제 균형+CXMT 이단 경기자·계약 바닥(take-or-pay/NTB/SCA)·인증 슬롯 게임·종류별 비동기 사이클·CAPEX/ROI 재평가 경로·추격자 출발 위치' },
      { label: '메커니즘 감사 (§4)', detail: '발화 유지: 재무 요새·저가 매수·기술 전환 투자 / 부러짐: 소모전(CXMT 퇴출 불가)·무차별 캐파 증설 / 신규: 계약 바닥·SW 락인·EWI 규율' },
      { label: '전략 4순위 (§5)', detail: '① 계약 바닥 선점(RS-8·RS-4·D12, 지금만 열린 창) ② 역사이클 대상 교정 — 캐파→인증·기술·자산(RS-5·D9·D6·RS-1 옵션형만) ③ 치킨게임 CXMT 재사용 금지(RS-6·RS-2·MB-4) ④ EWI에 맥락 지표 추가(RS-9·D15·D16)' },
      { label: '교차 검증 표 확장', detail: 'storyline.md·storyline.js ch7 표에 CMO 열 추가(5렌즈+시나리오 플래닝) — 프레임워크 불변 전략 결론 유지, CMO 고유 경고(과거 공식 무맥락 복제) 추가' },
    ],
    links: [
      { label: 'storyline-cmo.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline-cmo.md' },
      { label: 'dram-chicken-game-history-2026-08-05.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/dram-chicken-game-history-2026-08-05.md' },
    ],
  },
  // ── 2026-08-06 (iii) ─────────────────────────────────────────────────────────
  {
    date: '2026-08-06',
    type: 'build',
    version: 'v2.36.5',
    title: '스토리라인 반영 — Sachin Katti 증언을 1장(환경 변화)·3장(DF1)에 통합',
    summary:
      'Sachin Katti(OpenAI 컴퓨트 총괄) 인터뷰(v2.36.4 ingest)를 마스터 스토리라인에 반영. 1장 환경 변화에 사슬 최상류의 1차 증언 문단 신설 — 업계 ~$700B/OpenAI ~$50B 확인·"수요가 공급을 압도, 즉시 소비"·"전자를 토큰으로 바꾸는 공장"(칩이 뜨거울수록 메모리 대역폭↑)·가스터빈/변압기/인력 병목이 전력 72 지수를 수요자 시점에서 확인. 3장 DF1 상방 근거에 "컴퓨트 3배=매출 3배·최대 리스크는 과소 건설" 증언과 AI 재귀(연구 컴퓨트 폭발) 메커니즘 추가 — 후기순환 신호(마진 정점·Q3 감속)와의 긴장 구도는 유지. 렌즈 4종은 미갱신(사유: 인터뷰는 DF1 수요 증거의 보강이며 각 렌즈의 전략 도출 논리·순위를 바꾸지 않음). wiki storyline.md(frontmatter last_reviewed 08-06) ↔ dashboard storyline.js(META asof·ch1 블록 신설·ch3 블록 확장·refs) 동기. 패치 v2.36.5.',
    tags: ['스토리라인', 'Sachin Katti', 'OpenAI', 'DF1', '환경 변화', 'AI 재귀', 'dashboard'],
    items: [
      { label: '1장 환경 변화', detail: '최상류 1차 증언 문단 신설 — $700B/$50B·즉시 소진·전자→토큰 공장·냉각↔메모리 대역폭·기자재/인력 병목의 수요자 시점 확인' },
      { label: '3장 DF1', detail: '상방 근거에 Katti 증언(3배=3배·과소 건설 리스크)·AI 재귀 추가. 하방 신호(사상 최고 마진·Q3 감속=후기순환)와의 긴장 구도 유지 — DF1 위치(8.5)·확률 무변경' },
      { label: '렌즈 4종 미갱신', detail: '파이브 포스·게임이론·실물옵션·파괴적 혁신 렌즈는 전략 도출 논리 무영향으로 건너뜀(사유 명시)' },
      { label: '동기화', detail: 'wiki/storyline/storyline.md ↔ dashboard/src/data/storyline.js (META asof·FLOW 무변경·ch1/ch3 블록·refs)' },
    ],
    links: [
      { label: 'storyline.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline.md' },
      { label: 'mad-podcast-sachin-katti-openai-compute-2026-07.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/mad-podcast-sachin-katti-openai-compute-2026-07.md' },
    ],
  },
  // ── 2026-08-06 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-08-06',
    type: 'ingest',
    version: 'v2.36.4',
    title: '외부 전문가 수집 — Sachin Katti(OpenAI 컴퓨트 총괄) MAD Podcast: "We Can\'t Build Fast Enough"',
    summary:
      '사용자 제공 트랜스크립트 전문(1차 자료)으로 MAD Podcast × Sachin Katti(OpenAI Head of Industrial Compute, 전 Intel CTO, 2026-07 발행) 수집 — 원문을 소스 부록에 불변 보존. 핵심: ① 수요≫공급("온라인되는 즉시 소진")·컴퓨트 3배=매출 3배·최대 리스크는 과소 건설, ② OpenAI 올해 ~$50B·업계 ~$700B 1차 확인, ③ AI 재귀(AI가 AI 연구·칩 설계 → 연구 컴퓨트 폭발)·학습/추론 구분 소멸, ④ "전자→토큰 공장"·전면 액체냉각·"칩이 뜨거울수록 메모리 대역폭↑", ⑤ 그리드 투자 원칙·가스터빈·원자력·기자재/인력 병목("병목은 어디에나"), ⑥ Jalapeño(와트당 토큰·Broadcom·9개월 테이프아웃)·Stargate 우산 전략·오프테이커 재무·보장 토큰·오비탈 보완재. wiki 6개 페이지 갱신, 인터뷰 메뉴 5번째 항목. DF1·DF2 변경 없음(다음 재평가 유력 입력 표기). 패치 v2.36.4.',
    tags: ['Sachin Katti', 'OpenAI', 'MAD Podcast', '수요≫공급', 'AI 재귀', '전력', '원자력', 'Jalapeño', 'Broadcom', 'Stargate', '보장 토큰', 'dashboard'],
    items: [
      { label: '신규 소스 (1차 자료)', detail: 'sources/articles/mad-podcast-sachin-katti-openai-compute-2026-07.md — 한국어 구조화 요약 10개 절 + 위키 함의 6개 + 영어 원문 트랜스크립트 전문 부록 보존' },
      { label: '인터뷰 메뉴 구조화', detail: 'data/interviews.js 최상단 추가(외부 전문가, 전체 5번째). 6개 섹션, keyQuotes 4개(즉시 소진·3배=3배·AI 재귀·물리 세계 한계), 병목 지도 표' },
      { label: 'wiki 6개 페이지 갱신', detail: 'ai-capex($50B/$700B 교차 확인·오프테이커)·ai-demand-sustainability(수요≫공급·AI 재귀, 포지션 톡·중복 수요 유의 명시)·energy-constraints(그리드 원칙·원자력·기자재/인력 병목)·ai-datacenter-buildout(공장 정의·사이트 4요소·파이프라인)·lta-to-sca-transition(토큰 층위 보장 계약)·space-semiconductor(오비탈 보완재)' },
      { label: '거시 축 판단', detail: 'DF1·DF2 위치 변경 없음 — 단 DF1 상방(수요≫공급·과소 건설 리스크·AI 재귀)의 최대 구매 당사자 1차 확인으로 다음 정기 재평가 유력 입력 표기' },
      { label: '인덱스·로그', detail: 'index.md articles 섹션·log.md 갱신, 지식그래프 재생성' },
    ],
    links: [
      { label: 'mad-podcast-sachin-katti-openai-compute-2026-07.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/mad-podcast-sachin-katti-openai-compute-2026-07.md' },
      { label: 'YouTube — OpenAI\'s Compute Chief: We Can\'t Build Fast Enough', href: 'https://www.youtube.com/watch?v=wEZBlmvxx4o' },
    ],
  },
  // ── 2026-08-06 ───────────────────────────────────────────────────────────────
  {
    date: '2026-08-06',
    type: 'migration',
    version: 'v2.36.3',
    title: '수집 철회 — Dylan Patel MAD Podcast 인터뷰 전면 제거',
    summary:
      '사용자 판단(근거 부족 — 원문 미접근·2차 보도 의존)에 따라 Dylan Patel MAD Podcast 수집(v2.33.1 ingest·v2.34.2 보강)을 전면 철회. 소스 파일 삭제, wiki 3개 페이지(price-trends·ai-demand-sustainability·ai-datacenter-buildout)의 [Update 2026-08-05] 섹션 제거, 인터뷰 메뉴 항목 삭제(5개→4개), index.md 등록 해제, 업데이트 피드의 해당 ingest 항목 2건 제거. log.md는 append-only 원칙에 따라 기존 항목 유지 + 철회 항목으로 정정. 크리스 밀러 수집은 유지. 지식그래프 재생성·빌드 검증. 패치 v2.36.3 (main 병합 시 재버전).',
    tags: ['철회', 'Dylan Patel', 'MAD Podcast', '인터뷰', 'dashboard'],
    items: [
      { label: '삭제 범위', detail: 'sources/articles/mad-podcast-dylan-patel-memory-2026-07.md 삭제, wiki 3개 페이지 Patel 섹션 제거, interviews.js 항목 삭제, index.md 항목 제거, updates.js ingest 항목 2건(v2.33.1·v2.34.2) 제거' },
      { label: '철회 사유', detail: '원문(오디오·유튜브) 직접 검증 불가 상태에서 2차 보도 의존도가 높아 소스 품질 기준 미달 — 사용자 판단. 원문 트랜스크립트 확보 시 재수집 가능' },
      { label: '유지 항목', detail: '크리스 밀러(Chip War) 수집 전체 유지. sources/README.md의 SemiAnalysis 뉴스레터 설명(기존 semianalysis-* 기사 3건 관련)도 무관하므로 유지' },
    ],
    links: [],
  },
  // ── 2026-08-05 (v) ───────────────────────────────────────────────────────────
  {
    date: '2026-08-05',
    type: 'update',
    version: 'v2.36.2',
    title: '렌즈별 최적 전략 친절화 — 쉬운 설명·용어 풀이·탐색 링크 보강',
    summary:
      '"도출된 전략이 너무 요약·함축적이라 이해가 어렵다"는 피드백 반영. 4개 렌즈의 최적 전략 절을 순위별 "무엇을 하자는 것인가(용어를 풀어 쓴 설명) → 왜 이 순위인가(렌즈 논리) → 어디서 자세히 보나(링크)" 3단 구조의 완전한 문장으로 전면 재서술 — take-or-pay·NTB·Fab Shell·풋옵션·별동대·상위 이동 등 전문 용어를 본문 안에서 풀이. 위키에는 RS/SE/SA 전략 상세 페이지로 가는 직접 링크와 대시보드 탭 안내를, 대시보드에는 전용 strategy 카드 블록(순위 배지 + 무엇을/왜 + Strategy·EWI·Bottleneck 탭으로 점프하는 내부 링크 칩 + 출처)을 추가. 마스터 7장 교차 검증 표에 "표 읽는 법" 안내 추가. 패치 v2.36.2.',
    tags: ['Storyline', '최적 전략', '가독성', '용어 풀이', '내부 링크', 'dashboard'],
    items: [
      { label: '위키 4렌즈 재서술', detail: 'storyline-{five-forces,game-theory,real-options,disruption}.md 최적 전략 절 — 순위별 3단 구조(무엇을/왜/실행 결정), RS·SE·SA 상세 페이지 상대링크, 하단에 대시보드 탭 안내 블록' },
      { label: '대시보드 strategy 블록', detail: 'storylineLenses.js 4렌즈의 ol 요약을 strategy 카드 배열(rank·name·what·why·links·refs)로 전환, Storyline.jsx에 카드 렌더러 + 내부 해시 링크 칩(#/strategy/robust 등) 추가' },
      { label: '교차 검증 표 안내', detail: 'storyline.md·storyline.js ch7에 표 읽는 법(순위 의미, —는 미포함이지 반대 아님) 명시' },
      { label: '지식그래프', detail: '렌즈→전략 상세 페이지 링크 증가로 재생성 — 엣지 378→390' },
    ],
    links: [
      { label: 'wiki/storyline/storyline-five-forces.md §5', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline-five-forces.md' },
    ],
  },
  // ── 2026-08-05 (iv) ──────────────────────────────────────────────────────────
  {
    date: '2026-08-05',
    type: 'update',
    version: 'v2.36.1',
    title: 'Storyline 렌즈별 최적 전략 도출 + 렌즈 교차 검증',
    summary:
      '4개 대안 렌즈 각각에 "이 렌즈가 도출하는 최적 전략" 절 신설 — 각 프레임워크의 목적함수로 우선순위화한 전략 패키지와 시나리오 플래닝과의 차이(경고)를 명시. 파이브 포스: 구조 변경 순(구매자 권력 역전 RS-3+RS-4·8 → 대체재 흡수 → 공급자 내재화 → 로엔드 방어), MB-1은 "순위를 바꿔도 구조는 불변" 지적. 게임이론: 균형 유지 순(절제 공개 신호 D16·D6 → 계약 커버리지 → RS-1 억지력 → CXMT 게임 분리), "MB 실행이 캐파 경쟁으로 흐르면 치킨게임 재점화" 경고. 실물옵션: 집행 순(풋 먼저 D12·D16 → 확정 투자 옵션화 → 전환옵션 프리미엄 → 행사 자동화), "확정 최소·옵션 최대" 형태 교정. 파괴적 혁신: 궤적 선점 순(별동대 D13·SD-1 → AI SSD 니치 진입 → 로엔드 잔류 → 궤적 계측), "MB-1은 지난 전쟁의 훈장". 마스터 서사 7장에 렌즈 교차 검증 표 추가 — 네 렌즈 공통 지지 전략(계약 구조·정점 규율·옵션 캐파·차세대 별동대·바벨) = 프레임워크 불변, Robust 개념의 메타 검증. 패치 v2.36.1.',
    tags: ['Storyline', '최적 전략', '렌즈 교차 검증', 'framework-invariant', '파이브 포스', '게임이론', '실물옵션', '파괴적 혁신', 'dashboard'],
    items: [
      { label: '위키 렌즈 4종에 최적 전략 절', detail: 'storyline-{five-forces,game-theory,real-options,disruption}.md 각각에 우선순위 4단 전략 패키지 + 시나리오 렌즈와의 차이. 전 항목 D·RS·MB·SE 결정 체계와 인용으로 연결' },
      { label: '마스터 7장 렌즈 교차 검증', detail: 'storyline.md 7장에 5전략군 × 5렌즈 수렴 표 + 이중 해석(공통 지지 = framework-invariant / 렌즈 간 이견 = 실행 경고: 인증·기술 순위전 한정, 확정 최소·옵션 최대, 구조 전략·별동대 우선 배분)' },
      { label: '대시보드 미러', detail: 'storylineLenses.js 각 렌즈에 최적 전략 절 추가, storyline.js ch7에 교차 검증 표, Storyline.jsx Block에 table 렌더 지원. 지식그래프 재생성(엣지 378)' },
    ],
    links: [
      { label: 'wiki/storyline/storyline.md §7 렌즈 교차 검증', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline.md' },
    ],
  },
  // ── 2026-08-05 (iii) ─────────────────────────────────────────────────────────
  {
    date: '2026-08-05',
    type: 'build',
    version: 'v2.36.0',
    title: 'Storyline 대안 렌즈 4종 — 파이브 포스·게임이론·실물옵션·파괴적 혁신 서브탭',
    summary:
      '같은 위키 지식·지식그래프를 시나리오 플래닝이 아닌 4개 전략 프레임워크로 재서사화한 자매 스토리라인을 Storyline 탭 하위 메뉴로 추가. 파이브 포스(협상력의 지도 — 다섯 힘의 화살표를 자기 쪽으로 꺾는 싸움), 게임이론(치킨게임 → 3강 절제 균형 → take-or-pay 약속 게임 → CXMT 비대칭 게임), 실물옵션(콜·풋·전환·포기 옵션 포트폴리오 + EWI 행사 신호), 파괴적 혁신(HBM 파괴 피해 사례 → 로엔드·차세대·인접 3방향 파괴 대응). 게임이론 렌즈의 역사적 근거로 DRAM 치킨게임(2007~13, Qimonda·Elpida 파산, 6강→3강, 삼성 역사이클 투자) 웹 리서치 신규 소스 등재. 각 렌즈는 위키 페이지(단일 소스)+대시보드 미러 구조, 전 수치 sources/ 인용. 렌즈별 시각화(파이브 포스 십자 SVG·게임 진화 체인·옵션 2×2 그리드) 포함. 마이너 v2.36.0.',
    tags: ['Storyline', '파이브 포스', '게임이론', '실물옵션', '파괴적 혁신', '치킨게임', '렌즈', 'dashboard'],
    items: [
      { label: '위키 렌즈 4종 신설', detail: 'wiki/storyline/storyline-{five-forces,game-theory,real-options,disruption}.md — 각각 Mermaid 시각화 + 4~6절 산문 서사 + sources/ 인용 + 갱신 규칙. 마스터 storyline.md에 자매 렌즈 내비게이션 추가' },
      { label: '신규 소스 (웹 리서치)', detail: 'sources/articles/dram-chicken-game-history-2026-08-05.md — 1차(2007~09 Qimonda)·2차(2010~13 Elpida·대만) 치킨게임, 가격 -85%/-58%, 6강→3강 압축, 삼성 2010 메모리 capex 5.5조→9조 역사이클 상향 (Computerworld·IEEE Spectrum·Forbes·Taipei Times·Nippon.com 등 교차)' },
      { label: '대시보드 서브탭', detail: 'Storyline 탭에 하위 메뉴 5개(시나리오 플래닝 기본 + 렌즈 4). data/storylineLenses.js(STORYLINE_LENSES) + Storyline.jsx 개편 — ForcesDiagram·LensChain·LensGrid 시각화 3종. 딥링크 #/storyline/<렌즈>, 기존 #/storyline/chN은 #/storyline/scenario/chN으로 자동 리다이렉트' },
      { label: '정합성 체인', detail: 'CLAUDE.md §1 storyline 카테고리에 렌즈 명시, §5·§6에 storyline-*.md ↔ storylineLenses.js 매핑 행 추가. index.md 렌즈 4종+신규 소스 등록. 지식그래프 재생성 — 노드 86(+4)·엣지 376' },
    ],
    links: [
      { label: 'wiki/storyline/storyline-game-theory.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/storyline/storyline-game-theory.md' },
      { label: 'dram-chicken-game-history-2026-08-05.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/dram-chicken-game-history-2026-08-05.md' },
    ],
  },
  // ── 2026-08-05 (ii) ──────────────────────────────────────────────────────────
  // ── 2026-08-04 ───────────────────────────────────────────────────────────────
  {
    date: '2026-08-04',
    type: 'assessment',
    version: 'v2.32.10',
    title: '시나리오 포지션 맵·확률 정기 재평가 — 유지 (DF1 8.5·DF2 0.5, A26·B39·C8·D21·E6) + 내부 인터뷰 2건(최장석·이창수) 반영·EWI 갱신',
    summary:
      '직전 포지션 맵 갱신(2026-07-28) 이후 git log 변경분은 내부 임원·전문가 인터뷰 2건뿐 — 최장석 상무(상품기획팀장, 07-29)·이창수 부사장(영업팀장, 08-03). 둘 다 sources 층 녹취록 + 인터뷰 메뉴 구조화이며, 거시 축(DF1·DF2)을 움직이는 것은 "실현된 외부 사실"이라는 일관 방법론에 따라 이들은 내부 전문가 프레이밍(해석·전망)으로 분류된다. 내용은 양면적: (상방·바닥 경직화) 이창수 1차 방어선 — take-or-pay 멀티이어 계약 다수 사인(선수금 수백억 달러 규모 통장 예치)·NTB(Not-To-Below) 가격 하한·NTE 상한으로 컬랩스 와도 상당 이익률 바닥 계약 고정 = 기존 LTA→SCA 락인 논지를 삼성 1차 자료로 재확인·강화, 핸드투마우스(재고 없음)로 근단기 수급 견조 확인. (하방 유보) 최장석 HBM 편중 다운사이드 — HBM 꺼지면 캐파 stranded·HBM↔DDR 캐파 상쇄로 shortage→oversupply 반전 리스크, 디맨드/서플라이 60~70%. 이창수 중복 수요(duplicated demand) 비즈니스 리스크·NAND 조정 우려(YMTC 에코 확대, 내년 어느 시점)·원가 비교열위. 영업 수장 본인도 "충분히 오를 만큼 올랐다"·"파티할 때 아니다"·"2차 방어선 필요"로 정점+경계 톤. 순효과: 바닥 경직화(상방)와 HBM편중·중복수요·NAND(하방)가 상쇄 → 정점 재확인, 거시 축 무이동. 커스텀 HBM 퇴조론(이창수) vs zHBM 커스텀 시대(최장석) 논쟁은 DF3/제품믹스 축이지 DF1·DF2 아님. DF2: 신규 미중 실현 사실 부재 — 이창수 "중국 비동조화"·미주 집중+중국 페이즈2 멀티이어는 관리된 공존(0.5) 정합 전망. 결론: DF1 8.5·DF2 0.5·확률 A26·B39·C8·D21·E6 전부 유지. EWI 4종 note/history 정성 갱신(bigtech_capex_growth에 CAPEX-vs-FCF 꼭짓점 프레임·custom_hbm_revenue_share에 커스텀 HBM 퇴조 vs zHBM 대비·samsung_codesign_contracts에 take-or-pay/NTB 1차 자료 확인·competitor_sca_disclosures 스톡 note)·트리거 3종 note 갱신(demand_inflection_divergence에 3축 프레임·bigtech_capex_cut25/2027_sustained에 FCF 렌즈). 발동 트리거 0건. 신규 소스 0건(인터뷰 2건은 기 ingest). 패치 v2.32.10.',
    tags: ['시나리오', '포지션 맵', '확률', '유지', 'DF1', 'DF2', '인터뷰', '최장석', '이창수', 'take-or-pay', 'NTB', 'FCF', '커스텀 HBM', 'zHBM', 'EWI', 'dashboard'],
    items: [
      { label: '포지션 맵 유지 — DF1 8.5·DF2 0.5', detail: '07-28 이후 git log 변경분은 내부 인터뷰 2건(최장석 07-29·이창수 08-03)뿐 — 내부 전문가 프레이밍으로 거시 축을 움직이는 실현된 외부 사실 아님. 내용도 양면적: take-or-pay/NTB 바닥 경직화(상방 재확인) vs HBM 편중·중복수요·NAND 조정(하방 유보) 상쇄 → 정점 재확인. DF2: 신규 미중 실현 사실 부재(이창수 중국 비동조화·미주 집중은 관리된 공존 정합 전망). 두 축 위치·방향 유지' },
      { label: '확률 유지 — A26·B39·C8·D21·E6 (합 100)', detail: '거시 축이 움직이지 않았으므로 시나리오 간 재배분 없음. 이창수 take-or-pay/NTB 1차 확인은 이미 C 8·D 21에 반영된 LTA→SCA 락인 논지의 재확인(신규 증분 아님)이고, 최장석 HBM 편중 다운사이드는 "AI가 꺼질 확률"이 아니라 "꺼졌을 때 삼성 캐파 리스크"(조건부 심도)라 상대 확률 무변화' },
      { label: '상방 재확인 — 이창수 1차 방어선(take-or-pay·NTB·NTE)', detail: '멀티이어 계약 다수 사인(열 곳 동시 진행·페이즈2 대기)·선수금 수백억 달러 규모 통장 예치·구매 의무 저버리면 개수×판가로 캐시에서 차감(take-or-pay, "사우디 오일 계약처럼")·NTB(이 밑으로 가격 안 들어감)·NTE 상한. 캐파 과반 훨씬 넘는 수준을 이 컨셉으로 바인딩 목표. 젠틀맨십 LTA→법적 구속 계약으로 진화 = 메모리 바닥의 계약적 경직화 1차 자료 확인. 핸드투마우스(고객·자사 재고 없음)로 근단기 수급 견조' },
      { label: '하방 유보 — 최장석 HBM 편중·이창수 중복수요/NAND', detail: '최장석: "HBM 꺼지면 대책 없어"·HBM 하나=DDR 4~5개 희생이라 HBM 시장 축소 시 bit 쏟아져 캐파 stranded·디맨드/서플라이 60~70%가 shortage→oversupply로 급반전 리스크. 이창수: 중복 수요(앤트로픽 5년치가 AWS·MS·구글에 다 던져짐)·NAND 조정 우려(YMTC 에코 확대, 내년 어느 시점)·원가 경쟁사 대비 비교열위("AI가 준 선물이지 실력 아니다"). 정점+경계 톤으로 하방 감시 정당화(RS-5·RS-9)' },
      { label: '커스텀 HBM 퇴조 vs zHBM — DF3/제품믹스 축', detail: '이창수: 커스텀 HBM4 거의 다 캔슬(커머디티가 해마다 3/3E/4/4E로 앞서가는데 커스텀은 2~3년 걸려 뒤늦음) → 기술 몰빵·커머디티 원가 결과론. 최장석: zHBM(GPU 위 3D 수직 적층 커스텀 메모리) 전 고객 요구·표준 아니어도 채택 늘어남·업체별 인터레이어 달라 커스텀. 상충이 아니라 층위 차이(현세대 커스텀 HBM 퇴조 vs 차세대 zHBM 커스텀 부상) — DF3 패러다임/제품믹스 신호로 EWI custom_hbm_revenue_share에 병기, DF1·DF2 무영향' },
      { label: 'EWI 4종 정성 갱신 (2026-08-04)', detail: 'bigtech_capex_growth: 이창수 "꼭짓점은 FCF"(CAPEX↑인데 FCF 흑자→마이너스 = 미래 리스크 매수, 메타 주가 흔들림)·3축 프레임(CSP FCF·AI 최종수요·GPU 생태계) history 추가. custom_hbm_revenue_share: 커스텀 HBM 퇴조(이창수) vs zHBM 부상(최장석) note 병기. samsung_codesign_contracts: 공시 0건 유지하되 take-or-pay/NTB 멀티이어 다수 사인 1차 확인 note(공시≠내부계약). competitor_sca_disclosures: 스톡 note에 산업 take-or-pay 표준화 정성 확인. 민감 수치 제외로 currentValue는 전부 무변화(정성 note/history만)' },
      { label: '시나리오 트리거 검토 — 신규 발동 없음 (0건)', detail: 'demand_inflection_divergence note에 이창수 3축 프레임(CSP FCF·AI 최종수요·GPU 생태계)·핸드투마우스 재고 없음(현재 미발동 확인) 반영. bigtech_capex_cut25·bigtech_capex_2027_sustained note에 "FCF가 진짜 꼭짓점" 렌즈 보강. samsung_hbm4_nvidia_confirmed 무변화(인터뷰 미언급). 임계 크로싱 없어 발동 0건' },
      { label: '보고서·위키 동기화', detail: 'wiki/driving-forces/key-drivers.md DF1·DF2 [2026-08-04] 현재 위치 추가·wiki/scenarios/scenario-matrix.md 확률표 [2026-08-04 유지] note. dashboard scenarioPlanning(DF·SCENARIOS)·indicators(QUADRANT·EWI·트리거) 미러. 신규 소스 0건(인터뷰 2건은 기 ingest)' },
    ],
    links: [
      { label: 'lee-changsoo-memory-sales-interview-2026-08-03.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md' },
      { label: 'choi-jangseok-product-planning-interview-2026-07-29.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md' },
      { label: 'scenario-matrix.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/scenarios/scenario-matrix.md' },
      { label: 'key-drivers.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/driving-forces/key-drivers.md' },
    ],
  },
  // ── 2026-08-03 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-08-03',
    type: 'ingest',
    version: 'v2.32.11',
    title: '외부 전문가 수집 — 크리스 밀러(Chip War 저자) 인터뷰·기고 10건 종합',
    summary:
      'Chip War 저자 크리스 밀러의 2025-12~2026-07 공개 발언 10건(상원 외교위 증언·WaPo H200 비판·ChinaTalk·AEI·CMU 강연·중앙일보 "반도체 구루의 고언" 시리즈·경향신문 단독·인사이트코리아 2부작 등)을 웹 조사로 수집·종합해 sources 신규 파일로 보존하고, wiki 6개 페이지에 [Update 2026-08-03] 반영, 인터뷰 메뉴에 외부 전문가 항목(4번째)으로 구조화. 핵심: ① 초크포인트 위계 — HBM·제조장비가 GPU보다 깊은 초크포인트(HBM 3사 전원 비중국), ② 중국 이중 평가 — AI 칩 구조적 제약(Ascend 5~8배 열위·SMIC 규모 한계·"4년째 AI 과소투자") vs 전력·피지컬 AI·범용 침투(애플–CXMT 공개 경계), ③ 한국 처방 — R&D·설비 동시 투자 + "HBM이 유일한 솔루션 아니다"(추론 최적화 메모리 아키텍처 선점). DF1·DF2 위치 변경 없음(외부 교차 검증·해석 보강). 패치 v2.32.11 (v2.32.10은 08-04 정기 재평가가 선점, main 병합 시 재버전).',
    tags: ['크리스 밀러', 'Chip War', '외부 전문가', '초크포인트', 'HBM', '추론 메모리', '수출통제', 'H200', 'CXMT', '피지컬 AI', 'dashboard'],
    items: [
      { label: '신규 소스', detail: 'sources/articles/chris-miller-interviews-2025-12-to-2026-07.md — 발언 10건 항목별 원문 URL·핵심 주장 보존 (원문 접근 차단 항목은 검색 요약·2차 인용 명시)' },
      { label: '인터뷰 메뉴 구조화', detail: 'data/interviews.js에 외부 전문가 항목 추가(내부 3건과 층위 구분: 지정학·정책). 6개 섹션, keyQuotes 4개(추론 메모리 프런티어·HBM>GPU 초크포인트·3대 투입·무게추 이동), 중국 이중 평가 표' },
      { label: 'wiki 6개 페이지 갱신', detail: 'samsung(체질 전환·동시 투자·추론 메모리·800조 환영)·cxmt(애플–CXMT 위협 해석 무게)·china-competitors(중국 이중 평가)·hbm-roadmap(추론 아키텍처 축)·us-export-controls(초크포인트 위계·완화 vs 통제 정치 구도)·steep/political(요인 1·4·6 교차 검증)' },
      { label: '거시 축 판단', detail: 'DF1·DF2 위치·확률 변경 없음 — 신규 실현 사실이 아닌 외부 교차 검증. "통제 무게중심 GPU→HBM·장비 이동" 관찰은 다음 정기 재평가 참고 입력으로 표기' },
      { label: '인덱스·로그', detail: 'index.md articles 섹션·log.md 갱신, 지식그래프 재생성' },
    ],
    links: [
      { label: 'chris-miller-interviews-2025-12-to-2026-07.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/chris-miller-interviews-2025-12-to-2026-07.md' },
      { label: 'The Shifting Politics of AI Chip Export Controls (Substack)', href: 'https://chrismillersnewsletter.substack.com/p/the-shifting-politics-of-ai-chip' },
      { label: '경향신문 단독 인터뷰 (2026-07-09)', href: 'https://v.daum.net/v/20260709100107724' },
    ],
  },
  // ── 2026-08-03 ───────────────────────────────────────────────────────────────
  {
    date: '2026-08-03',
    type: 'ingest',
    version: 'v2.32.9',
    title: '인터뷰 3번째 추가 — 이창수 부사장(메모리 영업팀장)',
    summary:
      '2026-08-03 진행된 이창수 부사장(영업팀장, 녹취록 참석자 3) 내부 인터뷰(약 89분)를 앞선 두 인터뷰와 동일 형식(16개 섹션·핵심 인용문 4개·수요 사슬 3형태 표)으로 구조화해 추가. 핵심: 수요는 예측이 아니라 만드는 것(가격 탄력도), AI 프론티어가 만든 시가(時價) 시장과 중복 수요 리스크, CAPEX vs FCF 재무 시그널, take-or-pay 멀티이어·NTE/NTB 가격 밴드(1차 방어선), 과제=2차 방어선(사업 경쟁력 Back to Basic·WPSI·상시 비가동), 커스텀 HBM 퇴조론(최장석 zHBM 관점과 대비), 브로드컴·ASIC·소버린 생태계 재편, 중국 비동조화. 민감 상업 수치(계약 금액·판가·이익률·캐파 비중·내부 코드명)는 사용자 요청에 따라 제외 또는 대략적 표현으로 조정. 패치 v2.32.9.',
    tags: ['인터뷰', '이창수', '영업팀', 'take-or-pay', '멀티이어', 'NTE·NTB', '2차 방어선', 'WPSI', 'FCF', '커스텀 HBM', '브로드컴', 'dashboard'],
    items: [
      { label: '녹취록 정리본 보존', detail: 'sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md 신설 — 참석자 구성·과제 맥락 헤더 + 주요 발언 정리(민감 수치 범위 표현으로 대체, 정정 정책 헤더 명시)' },
      { label: '인터뷰 메뉴 구조화', detail: 'data/interviews.js INTERVIEWS 최상단에 추가(최신순). 16개 섹션, keyQuotes 4개(수요는 만드는 것·종이 다른 고객·take-or-pay 1차/2차 방어선·AI가 준 선물), 수요 사슬 3형태 표' },
      { label: '핵심 논지', detail: '3자 공통 축 확정 — AI 수익화·현금흐름이 마스터 변수(신문섭·최장석·이창수 일치). 층위: 매크로(신문섭)→제품·캐파(최장석)→계약·오퍼레이션(이창수). 대비점: 커스텀 HBM 퇴조 vs zHBM 커스텀 시대, 미주 집중 vs 전방위 헤지' },
      { label: '민감 정보 처리', detail: '개별 계약 금액·구체 판가·이익률·캐파 바인딩 비중·내부 프로젝트 코드명·고객별 일정을 제외하거나 "수백억 달러 규모"·"몇 배 수준"·"과반을 훨씬 넘는 비중" 등 범위 표현으로 조정' },
      { label: '인덱스·로그', detail: 'index.md raw-notes 섹션·log.md 갱신' },
    ],
    links: [
      { label: 'lee-changsoo-memory-sales-interview-2026-08-03.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md' },
    ],
  },
  // ── 2026-07-29 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-07-29',
    type: 'ingest',
    version: 'v2.32.8',
    title: '용어 정정 — GHBM → zHBM (최장석 인터뷰)',
    summary:
      '최장석 상무 인터뷰의 3D 적층 커스텀 메모리 용어를 GHBM에서 zHBM으로 통일 정정. 음성 자동 전사가 "GHBM"·"지앤드"·"z HBM"으로 흩어 표기한 것을 정확한 용어 zHBM으로 일괄 변경(소스 녹취록·인터뷰 메뉴 데이터·인덱스·로그 전반, 38곳). 패치 v2.32.8.',
    tags: ['인터뷰', '최장석', 'zHBM', '용어정정', 'dashboard'],
    items: [
      { label: '일괄 치환', detail: 'GHBM → zHBM (interviews.js 19곳·source 녹취록 12곳·updates/index/log). 소스 헤더에 ASR 표기 변이(GHBM·지앤드·z HBM) 정정 이력 명시' },
    ],
    links: [
      { label: 'choi-jangseok-product-planning-interview-2026-07-29.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md' },
    ],
  },
  // ── 2026-07-29 (i) ───────────────────────────────────────────────────────────
  {
    date: '2026-07-29',
    type: 'ingest',
    version: 'v2.32.7',
    title: '인터뷰 2번째 추가 — 최장석 상무(메모리 상품기획팀장)',
    summary:
      '2026-07-29 진행된 최장석 상무(상품기획팀장, 녹취록 참석자 4) 내부 인터뷰를 sources 층에 녹취록 원본으로 보존하고, 대시보드 "인터뷰" 메뉴에 신문섭 파트너 인터뷰와 동일 형식(15개 섹션·핵심 인용문 4개·블록/표)으로 구조화해 추가. 핵심: "수요 감소"를 가속기→HBM→DDR 제품 단위 인과로 정의, HBM↔DDR 캐파 상쇄 리스크, zHBM(3D 적층 커스텀 메모리)·가속기 전력/써멀 병목, 미주 우선 선택과 집중, 커스텀 제품 소싱·컨트랙·SCM 체질, 하이-로 포트폴리오. 패치 v2.32.7.',
    tags: ['인터뷰', '최장석', '상품기획팀', 'HBM 다운사이드', 'zHBM', '가속기', '미주 vs 중화', '커스텀 HBM', 'dashboard'],
    items: [
      { label: '녹취록 원본 보존', detail: 'sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md 신설 — 참석자 구성·과제 맥락 헤더 + 자동 전사 녹취록 전문(원본·불변)' },
      { label: '인터뷰 메뉴 구조화', detail: 'data/interviews.js INTERVIEWS 최상단에 추가(최신순). Executive Summary 포함 15개 섹션, keyQuotes 4개(HBM↔DDR 캐파 상쇄·수요 감소 정의·모든 고객 zHBM·하이-로), HBM vs zHBM 비교표' },
      { label: '핵심 논지', detail: '베인 신문섭 파트너의 "AI가 돈을 버는가/수요 검증 사이클"을 내부 제품·캐파·계약 관점에서 재확인. HBM 편중 다운사이드 대비가 과제의 실질 기여점' },
      { label: '인덱스·로그', detail: 'index.md raw-notes 섹션·log.md 갱신' },
    ],
    links: [
      { label: 'choi-jangseok-product-planning-interview-2026-07-29.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md' },
    ],
  },
  // ── 2026-07-28 ───────────────────────────────────────────────────────────────
  {
    date: '2026-07-28',
    type: 'assessment',
    version: 'v2.32.6',
    title: '시나리오 포지션 맵·확률 정기 재평가 — 유지 (DF1 8.5·DF2 0.5, A26·B39·C8·D21·E6) + Alphabet CapEx 상향·SK하이닉스 사상 최대·EWI 갱신',
    summary:
      '직전 포지션 맵 갱신(2026-07-21) 이후 git log 변경분(개발실 전환 요약 PPT·FDE/전략적 고객 계약 용어 정비·임금 선순환·수주산업화 8개 전략 옵션 질의)은 전부 실행/조직 계층으로 거시 축(DF1·DF2)을 움직일 신규 소스가 없다. 07-21→07-28 구간을 웹 리서치로 점검한 결과 in-window 신호는 전부 정점 재확인 방향 — 포지션 맵과 확률을 유지한다. 이번 주 물질적 발전 2건: (1) Alphabet Q2(2026-07-22)가 2026 연간 CapEx 가이던스를 $180~190B→$195~205B로 상향하고 Google Cloud 백로그가 QoQ +$50B→$514B로 급증(CNBC·Seeking Alpha) — AI 데이터센터 수요 강도의 in-window 상방 확인. (2) SK하이닉스 Q2(~07-28) 영업이익 ~KRW 64T(~$43.7B)·OPM ~76% 사상 최대(Korea Times·TrendForce) — DF1 정점 확인. 이미 DF1이 정점(8.5)이므로 Alphabet 상향은 신규 상방 레그가 아닌 재확인 → DF1 8.5 유지. 절제 근거: 가장 큰 3개 tell(Microsoft·Meta 07-29·Amazon 07-30)이 재평가 창 직후 발표 예정 — DF1 방향의 핵심 확인 이벤트가 다음 주 대기. DF2: 창 내 미중 실현 사실 부재(MATCH 법안 위원회 단계 유지·본회의 표결 movement 없음·CXMT HBM 대규모 양산 미확정·애플–CXMT 테스트 단계·신규 수출통제 없음) → 방향·위치 유지. 삼성 HBM4 볼륨 발주 미전환도 무변화(창 내 반전 보도 없음). 결론: DF1 8.5·DF2 0.5·확률 A26·B39·C8·D21·E6 전부 유지. EWI 5종 실측 갱신(bigtech_capex_growth Alphabet 상향·gpu_rental H100 ~$3.46·H200 ~$4.11·samsung_hbm4_rubin_share 무변화·cxmt_hbm3_production 무변화)·트리거 3종 note 갱신(bigtech_capex_2027_sustained 선행 상방·bigtech_capex_cut25 미발동·match_act_passed 위원회 단계·samsung_hbm4_nvidia_confirmed 미충족). 발동 트리거 0건. 신규 소스 1건. 패치 v2.32.6.',
    tags: ['시나리오', '포지션 맵', '확률', '유지', 'DF1', 'DF2', 'Alphabet', 'CapEx', 'SK하이닉스', 'GPU임대가', 'EWI', 'dashboard'],
    items: [
      { label: '포지션 맵 유지 — DF1 8.5·DF2 0.5', detail: '07-21→07-28 git log 변경분은 전부 실행/조직 계층(개발실 전환·수주산업화 질의)으로 거시 축 무영향. DF1: Alphabet CapEx 상향·SK하이닉스 사상 최대·GPU 임대가 firming으로 정점 재확인. DF2: 미중 신규 실현 사실 부재(MATCH 위원회 단계·CXMT HBM 미확정). 두 축 모두 위치·방향 유지' },
      { label: '확률 유지 — A26·B39·C8·D21·E6 (합 100)', detail: '거시 축이 움직이지 않았으므로 시나리오 확률 재배분 없음. in-window 신호(Alphabet CapEx 상향·SK하이닉스 사상 최대)는 이미 A+B 행에 반영된 DF1 8.5의 정점 재확인이지 시나리오 간 상대 확률을 바꾸는 요인이 아님' },
      { label: '이번 주 물질적 발전 (1) — Alphabet 2026 CapEx 상향 (07-22)', detail: 'Alphabet Q2 2026: 2026 연간 CapEx 가이던스 $180~190B→$195~205B 상향. Google Cloud 매출 +82% YoY(~$24.8B)·백로그 QoQ +$50B→$514B. 다년 수요 락인 확대 = AI 데이터센터 수요 강도(DF1) 상방 확인. 주가는 AI ROI 입증 요구로 하락했으나 가이던스 상향은 수요 견인형 신호' },
      { label: '이번 주 물질적 발전 (2) — SK하이닉스 사상 최대 Q2 (~07-28)', detail: '컨센서스 영업이익 ~KRW 64T(~$43.7B)·OPM ~76% 사상 최대(HBM+AI DC SSD 견인). 컨센서스 부합(서프라이즈 아님)이나 DF1 정점 확인. Micron FY26 Q3($41.46B)와 함께 슈퍼사이클 정점 지속 신호' },
      { label: '핵심 절제 — 하이퍼스케일러 3사 발표가 창 직후 대기', detail: 'Microsoft·Meta(07-29)·Amazon(07-30) Q2 CapEx 가이던스는 재평가 창(07-28) 직후 발표 예정 — 4사 합산 2026 CapEx(+77% 기준선) 재계산과 DF1 방향의 핵심 확인은 다음 주. Alphabet 1개사 상향만으로 정점을 넘어 이동하지 않고 재확인에 그침' },
      { label: 'EWI 5종 갱신', detail: 'bigtech_capex_growth(Alphabet 상향 07-28 이력·note에 3사 발표일 표기)·gpu_rental_price_trend/gpu_rental_h100_usd(07-28 스냅샷 H100 ~$3.46·H200 ~$4.11, 붕괴 없음)·samsung_hbm4_rubin_share(창 내 볼륨 발주 반전 부재, 무변화)·cxmt_hbm3_production(HBM 대규모 양산 미확정, 무변화). 실측·live-auto 지표는 Vast.ai·Yahoo API 자동 갱신 지속' },
      { label: '시나리오 트리거 검토 — 신규 발동 없음 (0건)', detail: 'bigtech_capex_2027_sustained(선행 신호 상방 — Alphabet 상향)·bigtech_capex_cut25(미발동, 정반대 방향)·match_act_passed(위원회 단계 유지·본회의 표결 movement 없음)·samsung_hbm4_nvidia_confirmed(볼륨 계약 미충족 유지) 4종 note 갱신. apple_cxmt_approved·us_china_semiconductor_deal 등 DF2 트리거 임계 미충족' },
      { label: '보고서·위키 동기화', detail: 'outputs/report §5.1 확률표에 [2026-07-28 재평가] 유지 note 추가. wiki/driving-forces/key-drivers.md DF1·DF2 현재 위치·wiki/scenarios/scenario-matrix.md 확률표 갱신. dashboard scenarioPlanning·indicators 미러. 신규 소스 hyperscaler-q2-2026-capex-2026-07-28.md' },
    ],
    links: [
      { label: 'hyperscaler-q2-2026-capex-2026-07-28.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/hyperscaler-q2-2026-capex-2026-07-28.md' },
      { label: 'scenario-matrix.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/scenarios/scenario-matrix.md' },
      { label: 'key-drivers.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/driving-forces/key-drivers.md' },
    ],
  },
  // ── 2026-07-21 ───────────────────────────────────────────────────────────────
  {
    date: '2026-07-21',
    type: 'assessment',
    version: 'v2.31.6',
    title: '시나리오 포지션 맵·확률 정기 재평가 — 유지 (DF1 8.5·DF2 0.5, A26·B39·C8·D21·E6) + 삼성 HBM4 볼륨 발주 지연·EWI 갱신',
    summary:
      '직전 포지션 맵 갱신(2026-07-14) 이후 git log상 신규 커밋·소스 없음. 07-14→07-21 구간을 웹 리서치(TrendForce·Bloomberg·Tom\'s Hardware·getdeploying 등)로 점검한 결과 거시 축(DF1·DF2)을 움직일 신규 실현 신호는 없어 포지션 맵과 확률을 유지한다. 이번 주 물질적 발전은 개별 실행 신호 하나 — 삼성 HBM4는 NVIDIA 인증(06-05 Vera Rubin 3사 인증)을 통과했으나 07-17 현재 볼륨(양산) 발주로 전환되지 못했고 매출은 여전히 유상 평가용 샘플 수준(Winbuzzer 07-17), SK하이닉스가 Rubin 2/3+ 락인 유지. 이는 "어떤 거시 세계가 실현되는가"(시나리오 확률)가 아니라 그 안에서 삼성 점유를 좌우하는 경쟁·실행 신호이므로 EWI·트리거·시나리오 B 실행 리스크로만 반영. 확증(무변화) 신호: 빅테크 4사 2026 CapEx ~$725B(+77% YoY)로 DF1 정점 재확인·GPU 현물 임대가 firming(H200 온디맨드 +8% YoY, 붕괴 아님)으로 수요 변곡 조기경보 미발동·DRAM Q3 계약가 +13~18% 감속은 소비자 지불한계·기저효과에 따른 정제(서버 견조). 미중 축: MATCH 법안 위원회 통과 후 본회의 표결 전 단계 유지·CXMT 2026 HBM 양산 도달 불투명(지연) → DF2 방향 무변화. 결론: DF1 8.5·DF2 0.5·확률 A26·B39·C8·D21·E6 전부 유지. EWI 5종 갱신(bigtech_capex_growth 40→77·samsung_hbm4_rubin_share 볼륨 발주 대기·gpu_rental firming·cxmt_hbm3_production 지연)·트리거 1종 note 보강(samsung_hbm4_nvidia_confirmed = 인증 아닌 볼륨 계약 기준). 신규 소스 1건. 패치 v2.31.6.',
    tags: ['시나리오', '포지션 맵', '확률', '유지', 'DF1', 'DF2', '삼성', 'HBM4', 'NVIDIA', 'CapEx', 'GPU임대가', 'EWI', 'dashboard'],
    items: [
      { label: '포지션 맵 유지 — DF1 8.5·DF2 0.5', detail: '07-14→07-21 신규 거시 축 신호 부재. DF1: 빅테크 CapEx +77%·GPU 임대가 firming·DRAM 감속(정제)으로 정점 재확인. DF2: 신규 미중 실현 사실 없음, MATCH 위원회 단계·CXMT HBM 지연으로 방향 무변화. 두 축 모두 위치·방향 유지' },
      { label: '확률 유지 — A26·B39·C8·D21·E6 (합 100)', detail: '거시 축이 움직이지 않았으므로 시나리오 확률 재배분 없음. 이번 주 발전(삼성 HBM4 볼륨 발주 지연)은 시나리오 B 내부의 삼성 점유·실행 리스크이지 B vs 여타 시나리오의 상대 확률을 바꾸는 요인이 아님' },
      { label: '이번 주 물질적 발전 — 삼성 HBM4 볼륨 발주 지연 (Winbuzzer 07-17)', detail: '삼성은 06-05 NVIDIA Vera Rubin HBM4 인증을 3사 동시 통과했으나, 07-17 현재 볼륨(양산) 발주 미전환·NVIDIA향 매출은 유상 평가용 샘플 수준. SK하이닉스 Rubin 2/3+ 락인 유지. "인증 ≠ 공급 계약" 구간 장기화 = Main Bet(B) 1위 탈환 가정의 시간 리스크' },
      { label: '확증(무변화) 신호 — DF1 정점 재확인', detail: '빅테크 4사 2026 CapEx ~$725B(Amazon $200B·MS $190B·Alphabet $175~185B·Meta $115~135B) = 2025 $410B 대비 +77%(Tom\'s Hardware·Statista). "AI 경제 건강, 매출 성장이 자본지출 정당화"(Jefferies). GPU 현물 임대가 firming(H200 온디맨드 중앙값 $3.82, +8% YoY) → Tier0 최선행 정상' },
      { label: 'EWI 5종 갱신', detail: 'bigtech_capex_growth 40→77%(2026 실측)·samsung_hbm4_rubin_share 28% 유지+볼륨 발주 대기 이력·gpu_rental_h100_usd/gpu_rental_price_trend firming 이력(H200 +8% YoY)·cxmt_hbm3_production "2026 HBM 양산 지연" 이력. 실측·live-auto 지표는 Vast.ai·Yahoo API 자동 갱신 지속' },
      { label: '시나리오 트리거 검토 — 신규 발동 없음', detail: 'samsung_hbm4_nvidia_confirmed(공식 볼륨 계약 기준)는 인증만으로 미충족 — note 보강(인증 ≠ 공급 계약). samsung_hbm4_no_nvidia(deadline 2026-12-31) 미도래. apple_cxmt_approved·us_china_semiconductor_deal 등 DF2 트리거 임계 미충족. 발동 트리거 0건' },
      { label: '보고서·위키 동기화', detail: 'outputs/report §5.1 확률표에 [2026-07-21 재평가] 유지 note 추가. wiki/driving-forces/key-drivers.md DF1·DF2 현재 위치·wiki/scenarios/scenario-matrix.md 확률표·wiki/entities/samsung.md HBM4 볼륨 발주 이슈 갱신. dashboard scenarioPlanning·indicators 미러' },
    ],
    links: [
      { label: 'samsung-hbm4-volume-order-pending-2026-07-17.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/samsung-hbm4-volume-order-pending-2026-07-17.md' },
      { label: 'scenario-matrix.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/scenarios/scenario-matrix.md' },
      { label: 'key-drivers.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/driving-forces/key-drivers.md' },
      { label: 'samsung.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/entities/samsung.md' },
    ],
  },
  // ── 2026-07-14 ───────────────────────────────────────────────────────────────
  {
    date: '2026-07-14',
    type: 'assessment',
    version: 'v2.31.5',
    title: '시나리오 포지션 맵·확률 재평가 — 애플–CXMT 건 반영 (DF2 1.0→0.5·A 27→26·B 38→39)',
    summary:
      '직전 포지션 맵 갱신(2026-07-07) 이후 git log로 파악한 변경분을 근거로 시나리오 포지션 맵과 확률을 재평가. 물질적 신규 소스는 하나 — 애플–CXMT 건(FT 2026-07-08, 07-11 ingest): 애플이 중국 내수용 기기에 中 CXMT DRAM 기술 검증(qualification)에 착수하고 미 행정부에 사용 승인을 로비 중이며, 로이터(2026-06)는 트럼프 행정부가 대베이징 긴장 회피 차원에서 CXMT 추가 블랙리스트 등재를 보류했다고 보도. 이 두 실현된 사실이 DF2(미중 지정학) 축의 "관리된 공존" 쪽 약한 신호로 작동 → DF2 1.0→0.5 소폭 이동, DF1은 수요 구조 무변화로 8.5 정점 유지(범용 DRAM +55~60% 급등은 기존 슈퍼사이클과 정합). 확률은 순수 DF2 재배분 — AI-지속 행(A+B, DF1 불변) 내부에서 디커플링(A)→공존(B)으로 A 27→26·B 38→39, C·D·E 불변(합 100). 이동폭을 소폭에 한정한 이유: 아직 "테스트" 단계이고 CXMT 1260H 리스트 등재·의회 반대·YMTC 2022 무산 전철 리스크로 승인/차단 리트머스가 미해결. EWI cxmt_apple_qualification(테스트 단계) 유지·cxmt_dram_share에 FT 2028E 캐파 15% 병기, 신규 트리거 apple_cxmt_approved(승인·채택 시 B·D 공존 확정) 추가. 패치 v2.31.5.',
    tags: ['시나리오', '포지션 맵', '확률', 'DF2', '애플', 'CXMT', '관리된 공존', '1260H', 'EWI', '트리거', 'dashboard'],
    items: [
      { label: '포지션 맵 DF2 1.0→0.5 (DF1 8.5 유지)', detail: '애플–CXMT 건의 실현된 사실 2건(애플의 中 CXMT DRAM 테스트 착수·행정부 승인 로비 + 로이터의 CXMT 추가 블랙리스트 보류)이 관리된 공존 쪽 약한 신호 → DF2 소폭 하향. DF1은 애플–CXMT가 DF2 축 신호일 뿐 수요 강도 구조 변화 아님 → 8.5 정점 유지' },
      { label: '확률 재추정: A26·B39·C8·D21·E6 (합 100)', detail: '직전 A27·B38·C8·D21·E6. DF2가 공존 쪽으로 이동한 만큼 AI-지속 행(A+B, 합 65 유지) 내부에서 디커플링(A)→공존(B) 재배분 = A 27→26·B 38→39. C·D·E 불변(DF1 무변화·C·D 이미 낮음·E는 DF3 근거 아님)' },
      { label: '근거 — 애플–CXMT 건 (FT 2026-07-08)', detail: '애플이 중국 내수용 기기 DRAM에 CXMT 기술 검증 착수 + 미 행정부에 사용 승인 로비. CXMT는 국방부 1260H 리스트(PLA 연계 의심) 등재. 로이터(2026-06): 행정부가 대베이징 긴장 회피로 CXMT·DeepSeek 추가 블랙리스트 보류. 프리미엄 고객이 중국 공급사를 조달 후보로 세우는 것 자체가 공존 정합 발전' },
      { label: '이동폭을 소폭에 한정한 이유', detail: '아직 "테스트" 단계(양산 채택·승인 미확정)·1260H 등재·의회 반대·YMTC 2022 무산 전철 리스크 상존 → 승인/차단 리트머스가 미해결. 승인 시 Pole B(관리된 공존), 차단 시 Pole A(디커플링)로 양방향 열려 있어 선제 이동폭 최소화' },
      { label: 'EWI 갱신', detail: 'cxmt_apple_qualification(07-11 신설, "테스트 단계"·warning) 유지 — 상태 변화 없음. cxmt_dram_share에 FT 2028E 글로벌 캐파 점유 15%(2025 11%) 병기(캐파 계열, 매출 점유와 구분) + 애플 인증 파이프라인 진입 note 연동' },
      { label: '시나리오 트리거 신설 — apple_cxmt_approved', detail: '미 행정부가 애플 CXMT 조달을 승인하고 애플이 양산 채택 확정 시 발동 → 관리된 공존 확정 신호(targetScenarios B·D, df2Δ −1.5, A−3·B+3·C−1·D+1). us_china_semiconductor_deal(df2Δ −3.5)보다 좁은·약한 공존 신호. 반대로 차단·무산 시 A·C 디커플링 신호(EWI blocked 상태로 추적)' },
      { label: '보고서·위키 동기화', detail: 'outputs/report §5.1 확률표 A26·B39 + Exec Summary Main Bet 확률 갱신. wiki/driving-forces/key-drivers.md DF1·DF2 현재 위치·wiki/scenarios/scenario-matrix.md 확률 추정표 갱신. dashboard scenarioPlanning.js·indicators.js 미러' },
    ],
    links: [
      { label: 'apple-cxmt-china-dram-2026-07-08.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/apple-cxmt-china-dram-2026-07-08.md' },
      { label: 'scenario-matrix.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/scenarios/scenario-matrix.md' },
      { label: 'key-drivers.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/driving-forces/key-drivers.md' },
      { label: 'us-export-controls.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/us-export-controls.md' },
    ],
  },
  // ── 2026-07-08 ───────────────────────────────────────────────────────────────
  {
    date: '2026-07-08',
    type: 'build',
    version: 'v2.31.3',
    title: '인터뷰 목차 앵커 버그 수정 — 하단 섹션이 엉뚱한 위치로 스크롤되던 문제',
    summary:
      '인터뷰 목차에서 하단 섹션(§15 수정사항·§16 결론 등)을 클릭하면 문서 끝이라 뷰포트 최상단까지 스크롤되지 못하고 화면 중간(§16의 경우 466px 아래)에 멈추던 문제 수정. 본문 하단에 스크롤 여유(spacer)를 두고, 목차 클릭을 부드러운 스크롤 + 도착 섹션 강조로 개선. Chromium 실측으로 16개 섹션 전부 최상단(16px) 정렬 확인. 상위 탭 메뉴명 영문 통일(인터뷰→Interviews·업데이트 내역→Updates). 패치 v2.31.3.',
    tags: ['인터뷰', '버그수정', '목차', 'UX', '메뉴명', 'dashboard'],
    items: [
      { label: '원인', detail: '문서 하단 짧은 섹션은 아래 스크롤 공간이 부족해 네이티브 #앵커가 최상단 정렬 불가 (§16 결론이 뷰포트 466px 지점에 멈춤)' },
      { label: '수정', detail: '본문 말미 trailing spacer(h-70vh)로 스크롤 여유 확보 → 모든 섹션 최상단 정렬. 목차 클릭을 scrollIntoView(smooth)+도착 섹션 링 강조로 전환, #해시 잔류 제거(해시 라우팅과 충돌 방지)' },
      { label: '메뉴명 영문 통일', detail: '상위 탭에서 한글이던 "인터뷰"·"업데이트 내역"을 Interviews·Updates로 변경해 나머지 영문 탭과 통일' },
      { label: '검증', detail: 'Chromium 헤드리스 실측 — exec-summary·who-makes-money·recommendations·revisions·conclusion 모두 headingTop=16px 확인' },
    ],
    links: [
      { label: 'Interviews.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/Interviews.jsx' },
    ],
  },
  // ── 2026-07-07 ───────────────────────────────────────────────────────────────
  {
    date: '2026-07-07',
    type: 'assessment',
    version: 'v2.31.2',
    title: '시나리오 포지션 맵·확률 재평가 — LTA→SCA 계약 체제 확립 반영 (B 37→38·C 9→8, DF1 8.5 유지)',
    summary:
      '직전 포지션 맵 갱신(2026-07-04, 정점 확증 DF1 8.0→8.5) 이후 수집분(LTA→SCA 전환·Micron–Anthropic SCA·Stargate LOI·CAPEX 추가 상향)을 반영해 시나리오 포지션 맵과 확률을 재평가. 핵심 변화는 개별 실적이 아니라 계약 구조 — 산업이 스팟→LTA→SCA(공동설계+다년공급+운영통합+자본연계)로 이동하며 다년 계약 락인이 근단기 순환 붕괴 확률을 추가 축소(UBS: "LTA가 메모리 cyclicality를 근본적으로 제거"). Micron–Anthropic SCA(06-22)·SCA 16건 $100B 공시 제도화·Stargate LOI(월 90만 웨이퍼=글로벌 DRAM 40%)가 근거. 상쇄 하방으로 범용 DRAM Q3 계약가 감속(+13~18% vs Q2 +58~63%)이 처음 등장했으나 감속은 비(非)AI-락인 범용 축에 집중·서버/HBM/SCA 락인 축은 견조 → 구조 반전 아닌 정제. 결론: DF1 8.5 정점·DF2 1.0 유지(지지 성격 실적 모멘텀→계약 구조 락인으로 전환), 확률 B 37→38·C 9→8(A27·D21·E6 불변, 합 100). 시나리오 트리거는 임계 미충족으로 신규 발동 없음. 보고서 §5.1 확률표 동기화(2026-06 잔존값 정정). 패치 v2.31.2.',
    tags: ['시나리오', '포지션 맵', '확률', 'DF1', 'LTA', 'SCA', 'Micron', 'Anthropic', 'Stargate', 'EWI', 'dashboard'],
    items: [
      { label: '포지션 맵 DF1 8.5·DF2 1.0 유지 (지지 성격 전환)', detail: '07-04 정점 확증(8.0→8.5) 이후 LTA→SCA 계약 체제 확립이 지지 근거를 실적 모멘텀→계약 구조 락인으로 전환. 구조 락인(상방)과 범용 DRAM 감속·중기 공급 씨앗(한국 800조·CXMT 30k)(하방)이 상쇄 → 정점 위치 8.5 유지' },
      { label: '확률 재추정: A27·B38·C8·D21·E6 (합 100)', detail: '직전 A27·B37·C9·D21·E6. B(Main Bet) 37→38(다년 계약 락인 바닥 경직화)·C 9→8(근단기 이중충격 확률 추가 축소). A·D·E 불변. DF2 신규 신호 없어 불변' },
      { label: '근거 — LTA→SCA 계약 3단 진화', detail: '스팟→LTA(선급금 10~30%, 역사적 5%↓ 대비)→SCA(공동설계·운영통합·자본연계 적층). Micron–Anthropic SCA(06-22) 완전체 4요소·SCA 16건 $100B 공시 제도화·Stargate LOI 글로벌 DRAM 40%. 메모리 3사 모두 Anthropic Series H 자본테이블 등재' },
      { label: '상쇄 하방 — 범용 DRAM 가격 첫 감속', detail: 'TrendForce(07-03) Q3 2026 범용 DRAM 계약가 +13~18% QoQ 전망 — Q2(+58~63%) 대비 대폭 감속. 단 감속은 비AI-락인 범용 축 집중, 서버/RDIMM·HBM은 에이전틱 AI로 견조 → 구조 반전 아닌 정제로 판단' },
      { label: 'EWI 갱신 — 삼성 HBM 점유율 교차 병기', detail: 'Counterpoint Q1 2026 확정치 삼성 ~32%·SK ~58% — 4월 잠정 35~40%보다 낮음(시점·집계 기준 차이). 시계열은 hbm-share.json(37%) 기준 통일, note에 교차 병기. Counterpoint도 삼성 2026 연간 30%+ 전망' },
      { label: '시나리오 트리거 검토', detail: 'LTA→SCA는 산업 방증(방향 근거)이며 특정 트리거 임계 크로싱 아님 — samsung_hbm_capacity_sold_out_2027(2027 사전확정 미충족)·bigtech_ai_revenue_500b 등 신규 발동 조건 미충족. SCA 전환 EWI 3종(competitor_sca_disclosures·samsung_codesign_contracts·custom_hbm_revenue_share)은 07-04 기준선 유지(신규 분기 데이터 없음)' },
      { label: '보고서 동기화', detail: 'outputs/report §5.1 확률표가 2026-06 잔존값(A26·B35·C10·D23)에 머물러 있어 07-04·07-07 갱신을 반영해 A27·B38·C8·D21·E6로 정정. Exec Summary Main Bet 확률 표기 갱신' },
      { label: '위키 동기화', detail: 'wiki/driving-forces/key-drivers.md DF1 현재 위치·wiki/scenarios/scenario-matrix.md 확률 추정표 갱신. dashboard scenarioPlanning.js·indicators.js 미러' },
    ],
    links: [
      { label: 'micron-anthropic-sca-2026-06-22.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/micron-anthropic-sca-2026-06-22.md' },
      { label: 'lta-to-sca-industry-context-2026-06.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/lta-to-sca-industry-context-2026-06.md' },
      { label: 'scenario-matrix.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/scenarios/scenario-matrix.md' },
      { label: 'key-drivers.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/driving-forces/key-drivers.md' },
    ],
  },
  // ── 2026-07-04 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-07-04',
    type: 'ingest',
    version: 'v2.26.1',
    title: '7월 정기 점검 — 병목 모델 갱신(전력 72·CAPEX 40·파운드리 50·패키징 67) + SK하이닉스 나스닥·반독점 소송',
    summary:
      'SemiAnalysis·Counterpoint·TechInsights 우선 수집(5개 병렬 리서치 에이전트) + PJM·ERCOT·TrendForce·Dell\'Oro·JPMorgan 등 보강. 4대 병목 제약지수 갱신(이전 06-14 대비): 전력 70→72(▲, ERCOT 큐 1년만에 4배·PJM 2030 15GW 부족·변압기 리드타임 5년), CAPEX 42→40(▼, 빅5 추가상향·Dell\'Oro $1조·JPMorgan $5.5조), 파운드리 52→50(▼, ASML High-NA 2029 연기), 패키징 68→67(▼, CoPoS 2028~29 재확인·HBM4 마이크로범프 결정). SK하이닉스 나스닥 이중상장(SKHY, 07-10 거래개시)·삼성·SK·Micron 대상 반독점 집단소송(신규 리스크)·DRAM Q3 가격 감속 조짐(+13~18% QoQ) 반영. 위키 18개 페이지 갱신 + 신규 페이지(dram-antitrust-litigation.md) + 지식그래프 재생성(78노드·285엣지). 패치 v2.26.1.',
    tags: ['병목모델', 'SemiAnalysis', 'Counterpoint', 'CAPEX', '전력', 'SK하이닉스', '나스닥', '반독점', 'HBM4', 'dashboard'],
    items: [
      { label: '병목 제약지수 갱신 (07-04, 이전 06-14 대비)', detail: '전력 70→72(▲+2)·CAPEX 42→40(▼-2)·파운드리 52→50(▼-2)·패키징 68→67(▼-1). 전력 2개 분기 연속 재상승 — ERCOT 큐 410GW+(1년 4배)·변압기 리드타임 5년(신규 최대 병목)' },
      { label: 'CAPEX 추가 상향', detail: 'MS $190B(+61%, $25B 메모리원가 귀속)·Alphabet $180~190B·Amazon $200B. Dell\'Oro 글로벌 DC CAPEX $1조 돌파·JPMorgan 2030 누적 $5.1조→$5.5조' },
      { label: 'HBM4 Vera Rubin 배정 세분화', detail: 'SK하이닉스 60~70%·삼성 25~30%·Micron 잔여. Micron 초기 빌드 일시배제 후 06-01 GTC 재확인 에피소드 반영' },
      { label: 'SK하이닉스 나스닥 이중상장', detail: 'Form F-1 수정 06-30·티커 SKHY·목표조달액 ~$294억·거래개시 07-10 — 역대 최대 ADR 상장 전망' },
      { label: 'DRAM 반독점 집단소송 (신규 페이지)', detail: '06-25 N.D.Cal. 제소, 삼성·SK하이닉스·Micron 공동피고. wiki/concepts/dram-antitrust-litigation.md 신설·삼성 규제·평판 리스크로 추적' },
      { label: 'DRAM 가격 감속 조짐', detail: 'TrendForce(07-03) Q3 2026 범용 DRAM +13~18% QoQ 전망 — Q2(+58~63%) 대비 대폭 감속. demandSignals.js에 dram_price_decel 신호 신설' },
      { label: '위키 18개 페이지 갱신 + 지식그래프 재생성', detail: 'entities 5·concepts 12·strategies 1 + 신규 개념페이지 1. node scripts/build-knowledge-graph.mjs 재실행 — 노드 77→78·엣지 275→285·고립 0·고아 0' },
    ],
    links: [
      { label: 'july-2026-market-update-2026-07-04.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/july-2026-market-update-2026-07-04.md' },
      { label: 'bottleneck-model-2030.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/bottleneck-model-2030.md' },
      { label: 'dram-antitrust-litigation.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/dram-antitrust-litigation.md' },
    ],
  },
  // ── 2026-07-04 ───────────────────────────────────────────────────────────────
  {
    date: '2026-07-04',
    type: 'assessment',
    version: 'v2.26.0',
    title: '시나리오 포지션 맵·확률 재평가 — Micron Q3 슈퍼사이클 확증 반영 (DF1 8.0→8.5)',
    summary:
      '직전 포지션 맵 갱신(2026-06-06) 이후 수집분(Micron FY26 Q3 실적·병목 정기 점검)을 반영해 시나리오 포지션 맵과 확률을 재평가. Micron Q3 $41.46B 사상 최대·Q4 가이던스 $50B·SCA 16건 $100B take-or-pay 백로그·2026 HBM 전량 Sold Out·수급 타이트 2027+ 로 근단기 수요 가시성이 계약 백로그로 고정 → 슈퍼사이클 정점 확증. DF1 8.0→8.5 상향(DF2 1.0 불변), 확률 B 35→37·A 26→27·D 23→21·C 10→9(E 6 불변). 단 사상 최고 마진(84.9%)·DRAM>HBM OPM 역전은 후기순환 신호로 유효 → 하락 변곡 EWI 감시 지속. 업데이트 내역 메뉴에 "포지션·확률" 필터 신설. 마이너 v2.26.0.',
    tags: ['시나리오', '포지션 맵', '확률', 'DF1', 'Micron', '슈퍼사이클', 'EWI', 'dashboard'],
    items: [
      { label: '포지션 맵 DF1 8.0→8.5 (DF2 1.0 불변)', detail: '슈퍼사이클 정점 "확인"→"확증". Micron Q3 사상 최대 + $100B take-or-pay 백로그 + 2026 HBM Sold Out으로 근단기 수요 가시성이 계약으로 고정 → 하락 변곡의 근단기 실현 확률 축소. DF2는 디커플링 신규 신호 없어 불변' },
      { label: '확률 재추정: A27·B37·C9·D21·E6 (합 100)', detail: '직전 A26·B35·C10·D23·E6. B(Main Bet) 35→37·A 26→27(AI-지속 강화), D 23→21·C 10→9(근단기 하락 조정 확률 축소). E 불변(DF3 패러다임 신규 근거 없음)' },
      { label: 'EWI 갱신 — DRAM>HBM OPM 역전 재확인', detail: 'Micron Q3 GAAP 매출총이익률 84.9% 사상 최고·DRAM ASP +low-60s% QoQ 반영. 역전(정점) 신호 히스토리 2026-06-24 추가 — critical 유지' },
      { label: 'EWI 갱신 — 삼성 HBM 점유율 35→37%', detail: '2026Q1 확정 37%(hbm-share.json)·병목 점검(06-14) 4월 35~40% 급회복 반영. 이전 25~30% 추정 초과' },
      { label: '시나리오 트리거 검토', detail: '수집분으로 신규 발동(activated) 조건 충족 트리거 없음 — Samsung 2027 캐파 사전확정·빅테크 2027 CapEx $500B 등은 미확정. Micron 백로그는 산업 방증(방향 근거)으로만 반영, 트리거 상태 불변' },
      { label: '위키 동기화', detail: 'wiki/driving-forces/key-drivers.md DF1 현재 위치·wiki/scenarios/scenario-matrix.md 확률 추정표 갱신. dashboard scenarioPlanning.js·indicators.js 미러' },
      { label: '업데이트 내역 메뉴', detail: '"포지션·확률"(assessment) 타입·필터 칩 신설 — 포지션 맵·확률 재평가 이력을 ingest/build와 분리해 한눈에 조회' },
    ],
    links: [
      { label: 'micron-q3-fy26.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/filings/micron-q3-fy26.md' },
      { label: 'scenario-matrix.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/scenarios/scenario-matrix.md' },
      { label: 'key-drivers.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/driving-forces/key-drivers.md' },
    ],
  },
  // ── 2026-06-25 ───────────────────────────────────────────────────────────────
  {
    date: '2026-06-25',
    type: 'ingest',
    version: 'v2.24.2',
    title: 'Micron FY26 Q3 실적 (2026-06-24) — $41.46B 사상 최대',
    summary:
      'Micron 회계 Q3 FY26(5/28 종료) 실적 반영. 매출 $41.46B(+74% QoQ·+346% YoY), 매출총이익률 84.9% 사상 최고, EPS $25.11로 가이던스 $33.5B 전면 상회. DRAM ASP +low-60s% QoQ(가격 동인), SCA 16건 $100B·예치금 $22B, Q4 가이던스 $50B. 슈퍼사이클 정점 확증. 패치 v2.24.2.',
    tags: ['Micron', '실적', 'HBM4', 'SCA', 'DRAM', '슈퍼사이클', 'dashboard'],
    items: [
      { label: '매출 $41.46B', detail: '+74% QoQ·+346% YoY. 컨센서스 ~$8B 상회, 시간외 +13.7%(~$1,192)' },
      { label: 'DRAM $31.3B(76%)·NAND $9.9B', detail: 'DRAM ASP +low-60s% QoQ — 출하(low-single-digit%) 압도, 가격이 성장 동인' },
      { label: 'SCA 16건 $100B', detail: '최소 계약 매출(RPO) ~$100B + 현금 예치금·금융 약정 $22B — take-or-pay LTA 산업 표준화(RS-8)' },
      { label: 'HBM4 누적 $1B', detail: 'HBM4 12-high 램프 HBM3E 대비 ~2배. 2026 HBM 캐파 완판. 데이터센터 연환산 $100B 초과' },
      { label: 'Q4 가이던스 $50B', detail: '매출 $50.0B±$1.0B, 매출총이익률 ~86%, EPS $30.73. 수급 타이트 calendar 2027 이후 지속' },
    ],
    links: [
      { label: 'micron-q3-fy26.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/filings/micron-q3-fy26.md' },
      { label: 'SEC 8-K Q3 FY26 Press Release', href: 'https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000013/a2026q3ex991-pressrelease.htm' },
    ],
  },
  // ── 2026-06-18 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-06-18',
    type: 'ingest',
    version: 'v2.24.1',
    title: '인터뷰 대상자 식별 — 베인앤컴퍼니 신문섭 파트너',
    summary:
      '인터뷰 대상자를 "산업 전문가(미공개)"에서 베인앤컴퍼니 신문섭(Moonsup Shin) 파트너로 갱신. APAC 하드웨어·반도체·데이터센터 총괄 / 한국 TMT 대표. 원본 소스·인터뷰 메뉴 메타·인덱스 동기화. 패치 v2.24.1.',
    tags: ['인터뷰', '베인앤컴퍼니', '신문섭', 'dashboard'],
    items: [
      { label: '대상자 갱신', detail: 'interviewee → 신문섭 (Bain & Company 파트너). 인터뷰 카드 헤더·목록·검색 태그(베인앤컴퍼니·신문섭) 반영' },
      { label: '소스·인덱스', detail: 'sources/raw-notes/expert-interview-...md 헤더 인터뷰 대상 갱신. index.md 설명 갱신' },
    ],
    links: [
      { label: 'expert-interview-ai-infra-supercycle-2026-06-18.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md' },
    ],
  },
  // ── 2026-06-18 (i) ───────────────────────────────────────────────────────────
  {
    date: '2026-06-18',
    type: 'ingest',
    version: 'v2.24.0',
    title: '"인터뷰" 메뉴 신설 — 산업 전문가 인터뷰 보고서 아카이브',
    summary:
      '사용자 제공 산업 전문가 인터뷰("AI 인프라 슈퍼사이클과 메모리 사업의 전략 전환", 16개 섹션)를 sources 층에 원본 보존하고, 대시보드 최상단에 별도 "인터뷰" 탭을 신설. 향후 다수 인터뷰 누적을 전제로 한 확장형 구조(좌측 목록·검색·핵심 인용문 대형 강조·목차·블록 기반 본문). 마이너 버전 v2.24.0.',
    tags: ['인터뷰', 'AI 인프라', '수요 검증 사이클', 'Customization', '임베디드 SW', 'Sensing Model', 'dashboard'],
    items: [
      { label: '인터뷰 탭 신설', detail: 'TOP_TABS에 "인터뷰"(MessageSquareQuote) 추가. 좌측 인터뷰 목록·검색 + 우측 본문(메타 헤더·핵심 인용문 대형 카드·목차·블록 렌더러). 인터뷰 추가 대비 확장형 스키마' },
      { label: '핵심 인용문 강조', detail: '인터뷰별 keyQuotes를 다크 카드 대형 블록쿼트로 상단에 표시 — 중요 문구 빠른 재참조용' },
      { label: '데이터 스키마', detail: 'data/interviews.js — INTERVIEWS 배열, 블록 타입 p/h/ul/ol/quote/table. sources/raw-notes 미러' },
      { label: '소스·인덱스·로그', detail: 'sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md 신규(16개 섹션 전문). index.md·log.md 갱신' },
    ],
    links: [
      { label: 'expert-interview-ai-infra-supercycle-2026-06-18.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md' },
    ],
  },
  // ── 2026-06-14 ───────────────────────────────────────────────────────────────
  {
    date: '2026-06-14',
    type: 'ingest',
    version: 'v2.23.1',
    title: '병목 모델 정기 점검 — 제약지수 4개 갱신 (전력 70·CAPEX 42·파운드리 52·패키징 68)',
    summary:
      '최신 데이터(PJM 8년 대기 확정·DOE 100GW·ERCOT 145GW·Meta $125~145B·Micron Q3 FY26 $33.5B 역대최고·TSMC CoWoS 130K WPM·DRAM Q1 실제 +90~95% QoQ·삼성 HBM 35~40% 급회복) 반영. 제약지수 갱신: 전력 68→70(▲+2 — 그리드 악화 지속), CAPEX 44→42(▼-2 — ROI 실현 강화), 파운드리 54→52(▼-2 — Rubin 출하 하향으로 단기 여유), 패키징 70→68(▼-2 — 130K WPM 확정·CoPoS 완공). 드라이버 notes 4개 갱신. HBM 점유 삼성 35~40% 급회복(이전 추정 25~30% 초과) 위키 반영.',
    tags: ['병목 모델', '제약지수', '변동폭', '전력', 'CAPEX', 'HBM', 'DRAM가격', 'CoWoS', 'TSMC', 'Micron', 'samsung', 'dashboard'],
    items: [
      { label: '제약지수 변경', detail: '전력 68→70(▲+2)·CAPEX 44→42(▼-2)·파운드리 54→52(▼-2)·패키징 70→68(▼-2). 전력: PJM 8년 확정·DOE 100GW·ERCOT 145GW. CAPEX: Meta $125~145B·Micron $33.5B. 파운드리: Rubin 29%→22%. 패키징: 130K WPM 확정' },
      { label: 'DRAM 가격 상향', detail: 'Q1 2026 실제 +90~95% QoQ (이전 추정 +55~60% 대폭 초과, 역대 최대 분기 상승폭). Q2 예상: DRAM +58~63%·NAND +70~75% QoQ' },
      { label: 'HBM 점유율 삼성 급회복', detail: '4월 2026: 삼성 35~40%(이전 추정 25~30%), SK하이닉스 50~55%, Micron 5~10%. 삼성 Q3 2025 22%에서 불과 4개월 만에 +13~18%pt 급회복' },
      { label: '드라이버 노트 갱신', detail: 'interconnect(전력 d1): PJM 8년·DOE 100GW·ERCOT 145GW·백악관 서약. capex_guide(CAPEX d1): Big4 $700~725B·전체 $782B. ai_revenue(CAPEX d2): Micron $33.5B·HBM3E 완판. cowos_util(패키징 d1): 130K WPM 확정·CoPoS 완공' },
      { label: '소스·위키', detail: 'sources/articles/june-2026-market-update-2026-06-14.md 신규. wiki: bottleneck-model-2030·hbm-market·price-trends·energy-constraints 갱신' },
    ],
    links: [
      { label: 'june-2026-market-update-2026-06-14.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/june-2026-market-update-2026-06-14.md' },
      { label: 'bottleneck-model-2030.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/bottleneck-model-2030.md' },
    ],
  },
  // ── 2026-06-13 ───────────────────────────────────────────────────────────────
  {
    date: '2026-06-13',
    type: 'ingest',
    version: 'v2.23.0',
    title: '병목 모델 정기 점검 — 제약지수 업데이트 + 변동폭(Δ) 표시',
    summary:
      '최신 데이터(TSMC 5월 매출·CoWoS 수율·Rubin 목표 하향·미국 DC 전력·Big4 CapEx 상단 수렴) 반영해 4대 병목 제약지수 갱신: 전력 64→68(▲+4, 그리드 대기 2,600GW·5~12년), CAPEX 46→44(▼-2, ROI 실현), 파운드리 56→54(▼-2, N2 순항), 패키징 72→70(▼-2, CoWoS +76%·Rubin 하향). 대시보드 병목 카드에 이전 대비 변동폭(▲/▼) 실시간 표시 추가(v2.23.0). 삼성 HBM4E 업계 최초 샘플(2026-05-29)·NVIDIA Vera Rubin HBM4 3사 인증(2026-06-05) 위키 반영.',
    tags: ['병목 모델', '제약지수', '변동폭', '전력', 'HBM', 'Rubin', 'CoWoS', 'TSMC', 'dashboard'],
    items: [
      { label: '제약지수 변경', detail: '전력 64→68(▲+4)·CAPEX 46→44(▼-2)·파운드리 56→54(▼-2)·패키징 72→70(▼-2). 전력 계통 접속 드라이버(d1) 긴장→임계 상향(대기 2,600GW·5~12년)' },
      { label: '변동폭 표시', detail: '병목 카드 우상단에 이전 기준일(2026-06-10) 대비 Δ 표시(▲+N=악화 빨강 / ▼-N=개선 초록 / ─0=유지 회색). 헤더 스트립에도 4개 변동 요약' },
      { label: 'HBM4E 삼성 선점', detail: '2026-05-29 삼성 HBM4E(3.6TB/s) 업계 최초 샘플 출하 — SK하이닉스 6개월 선행. HBM5 목업 Computex 2026 공개(양산 2028년)' },
      { label: 'NVIDIA Vera Rubin', detail: '2026-06-01 풀프로덕션 발표. 2026-06-05 HBM4 3사(Samsung·SK·Micron) 공식 인증. Rubin 생산 목표 200→150만 대(−25%) 하향(KeyBanc)' },
      { label: 'TSMC N2·CoWoS', detail: '5월 매출 NT$417B YoY+30.1% 사상최고. N2 50K→140K WPM 2026말 목표 순항. CoWoS 연간 65만 장(+76%), 수율 98%+, ASML 60+기 EUV 2026년 출하' },
      { label: '소스·위키·보고서', detail: 'sources/articles/june-2026-market-update-2026-06-13.md 신규. wiki: bottleneck-model-2030·hbm-market·price-trends·energy-constraints 갱신. report §1 핵심 수치 갱신' },
    ],
    links: [
      { label: 'june-2026-market-update-2026-06-13.md', href: 'https://github.com/k31001/action-learning/blob/main/sources/articles/june-2026-market-update-2026-06-13.md' },
      { label: 'bottleneck-model-2030.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/bottleneck-model-2030.md' },
    ],
  },
  // ── 2026-06-11 (iii) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-11',
    type: 'build',
    version: 'v2.22.0',
    title: '모델 구조 도식 내장 + 모델 프레임에서 수요 EWI 분리',
    summary:
      '병목 모델 화면 상단에 모델 구조 도식(상류 d2 → 중류 d1 → 4대 병목 → min() 게이트 → 실현 출하 → 수요 변환 → 수급·가격) SVG 카드를 추가 — 수치(B·ε·지수·U·실현·수급차·p*·조기경보 발동)는 데이터 모듈에서 실시간 파생. 수요 변곡 EWI는 프레임(수요 방향 vs 제약 압력) 혼합이 자료 일관성을 해친다는 판단에 따라 모델 화면에서 분리 — EWI 요약 스트립·EWI 연계 칩 제거, 별도 서브탭으로만 운영.',
    tags: ['병목 모델', '모델 구조 도식', '프레임 분리', '수요 EWI', 'dashboard'],
    items: [
      { label: '모델 구조 도식', detail: '3단 컨테이너(상류 d2 / 중류 d1 / 4대 병목) × 4레인 + 수렴 컬렉터 → min(U·전력·CAPEX·파운드리·패키징) → 실현 125만 대 → HBM 2.88·DRAM 2.50EB → 수급차 +0.07/+0.80·p* 97.5/80.8 + 조기경보 규칙 패널. 수치 전부 bottleneckModel.js 파생(데이터 변경 시 자동 갱신)' },
      { label: '수요 EWI 프레임 분리', detail: '병목 모델 화면의 EWI 요약 스트립 제거, 드라이버 트리의 "EWI 연계" 칩 제거. 수요 변곡 EWI 서브탭은 유지(접근 가능) — 신호 대응 관계는 위키 교차참조로만' },
      { label: 'wiki·report', detail: 'bottleneck-model-2030.md 미러 노트·§5 "EWI와의 관계(분리 운영)" 정정, demand-inflection-ewi.md 상보 축 bullet, report §7.2' },
      { label: 'version v2.21.0 → v2.22.0 (마이너)', detail: '새 시각화 카드(구조 도식) + 모델 프레임 정리' },
    ],
    links: [
      { label: 'bottleneck-model-2030.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/bottleneck-model-2030.md' },
    ],
  },
  // ── 2026-06-11 (ii) ──────────────────────────────────────────────────────────
  {
    date: '2026-06-11',
    type: 'build',
    version: 'v2.21.0',
    title: '병목 모델 depth 확장 — 상류 드라이버 트리 + 수요 EWI 통합 (수요 EWI 탭 이동)',
    summary:
      '4대 병목 각각에 영향을 주는 상류 요소를 depth 1(중류)·depth 2(상류)로 분해한 22개 드라이버 트리를 모델에 반영 — 예: CAPEX ← 하이퍼스케일러 이익·FCF(d1) ← AI 기업 매출·이익(OpenAI·Anthropic·xAI·Google, d2·12~18개월 선행). 상류·중류·현재 지수의 괴리로 조기경보(악화/완화 예고·상류-중류 괴리)를 산출해 더 이른 시점에 수요 변화를 인지. 수요 EWI는 Data Viz에서 Bottleneck Model 탭의 서브탭으로 통합(겹침 해소).',
    tags: ['병목 모델', '드라이버 트리', 'depth 2', 'AI 기업 매출', '수요 EWI 통합', '조기경보', 'dashboard'],
    items: [
      { label: '상류 드라이버 트리 (22개)', detail: 'CAPEX 7(AI 기업 매출·단위 경제성·GPU 임대가·금리 등)·전력 6(접속 큐·COD·변압기·BTM 발전·전력 정치)·파운드리 5(램프·배정·ASML·수율·지정학)·패키징 5(CoWoS·사이트·기판·적층 수율·세대 믹스). 압력 4단계(완화15·중립40·긴장65·임계90) 가중 롤업' },
      { label: '조기경보 규칙', detail: '악화 예고(상류≥현재+10)·완화 예고(상류≤현재−15)·상류-중류 괴리(d2−d1≥10). 현재 발동: CAPEX 괴리 +11(임대가·자금조달 선행 악화)·파운드리 괴리 +33(지정학·수율 미지수)·패키징 완화 예고(상류 57 < 현재 72, 경계 발동 — 45는 v2.22.0에서 정정된 산술 오류)' },
      { label: '수요 EWI 통합', detail: 'Data Viz > 수요 EWI 서브탭 제거 → Bottleneck Model 탭 내 [병목 모델 | 수요 변곡 EWI] 서브탭. 병목 모델 화면에 EWI 요약 스트립(복합 위험·선행/끈적 괴리·SCM·악화 신호) + 드라이버의 EWI 연계 표기(같은 사실의 양면)' },
      { label: '병목 카드 확장', detail: '카드마다 선행 압력(상류 d2/중류 d1) + 조기경보 플래그 표시 — 현재 지수(정성)와 교차 검증' },
      { label: 'wiki', detail: 'bottleneck-model-2030.md §5 상류 드라이버 트리 신설(트리 표·롤업 수식·조기경보 규칙·종합 판독), demand-inflection-ewi·rs9·README 위치 갱신' },
      { label: 'version v2.20.0 → v2.21.0 (마이너)', detail: '탭 구조 변경(수요 EWI 이동·서브탭) + 새 데이터 카테고리(드라이버 트리)' },
    ],
    links: [
      { label: 'bottleneck-model-2030.md §5', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/bottleneck-model-2030.md' },
    ],
  },
  // ── 2026-06-11 ─────────────────────────────────────────────────────────────
  {
    date: '2026-06-11',
    type: 'ingest',
    version: null,
    title: '시니어 파트너 인터뷰 딥리서치 보고서 — 4대 메시지 + 사용자 1차 자료',
    summary:
      '사용자가 직접 인터뷰한 시니어 파트너 발언과 공개 자료(WSTS·IDC·IEA·Anthropic·NASA·NDRC) 교차 팩트체크. "SaaS Calypso 이후 하드웨어의 시간이 돌아왔다" 명제 + 솔루션 포트폴리오 전환 + 임베디드 SW 수익화 + 우주·중고 인접시장 권고. wiki 4개 신규 concept + 6개 갱신.',
    tags: ['시니어 파트너 인터뷰', '딥리서치', 'Anthropic', '솔루션화', '임베디드 SW', '우주', '중고 반도체', 'MB-4', 'RS-2', 'SD-2'],
    items: [
      { label: '신규 source', detail: 'sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md (사용자 1차 자료 + 자체 팩트체크 종합)' },
      { label: '신규 concept #1', detail: 'wiki/concepts/customer-co-design-anthropic.md — Anthropic Series F strategic infrastructure partners(Micron·Samsung·SK) 모델, 영업 4단계 진화' },
      { label: '신규 concept #2', detail: 'wiki/concepts/used-semiconductor-market.md — 중고 반도체 인증 시장 보수적 시나리오 $2.4B~$14.6B, 본질은 거래소가 아닌 검사·등급화·보증' },
      { label: '신규 concept #3', detail: 'wiki/concepts/space-semiconductor.md — Smallsat 2,800기/97% COTS 전환, 중간지대(선별 COTS·fault firmware·long-lifecycle·shield-aware)' },
      { label: '신규 concept #4', detail: 'wiki/concepts/embedded-software-monetization.md — SmartSSD/CXL SMDK 자산 수익화, BSP/SDK 별도 P&L 분리 권고' },
      { label: 'samsung.md', detail: 'HBM4·SOCAMM2 양산·PCIe Gen6 SSD·항공우주 포트폴리오 확대 + Anthropic strategic infra partner + 임베디드 SW 미수익화 격차' },
      { label: 'sk-hynix.md', detail: '미국 AI Company $10B 신설, 영업 4단계 모델에서 Samsung과의 격차 분석' },
      { label: 'micron.md', detail: 'FY26 Q2 $23.86B·영업현금 $11.9B·FY26 capex $25B+, Elpida PMI 시사점은 운영원리 해석으로만' },
      { label: 'MB-4 갱신', detail: 'Anthropic 모델 + 임베디드 SW 통합 패키지화, 6개월 KPI 명시 (PoC 2건·디자인인 1건)' },
      { label: 'SD-2 갱신', detail: '우주·항공우주·국방 신규 영역 확장, Micron Manassas 직접 경쟁 구도' },
      { label: 'RS-2 갱신', detail: 'long-lifecycle 끝단을 우주·국방·중고 인증으로 확장, 인접시장 4종 매핑' },
    ],
    links: [
      { label: '원본 보고서 (사용자 로컬)', href: 'file:///Users/euihyeokkwon/Downloads/deep-research-report-3.md' },
    ],
  },

  // ── 2026-06-10 ─────────────────────────────────────────────────────────────
  {
    date: '2026-06-10',
    type: 'ingest',
    version: 'v2.20.0',
    title: '병목 기반 정량 모델 도입 — Bottleneck Model 탭 신설 (4대 병목 min() 제약)',
    summary:
      '딥리서치 2건(2030 병목 정량 모델 + 모니터링·대시보드 설계)을 수집·환원하고 대시보드를 모델 기반으로 업그레이드. 전력·CAPEX/ROI·선단 파운드리·첨단 패키징 4대 병목의 min() 제약 모델로 2030 HBM(기준 2.88EB)·AI 서버 DRAM(2.50EB) 수급을 정량화 — what-if 시뮬레이터·수급 곡선·균형 가격지수·민감도·충격 대응 매뉴얼·KPI 모니터링 설계.',
    tags: ['병목 모델', 'Bottleneck Model', 'HBM 2030', '딥리서치', '정량 모델', 'dashboard'],
    items: [
      { label: 'Bottleneck Model 탭 신설', detail: 'S₂₀₃₀=min(U, 전력, CAPEX, 파운드리, 패키징), Sᵢ=S_base×(Bᵢ/B_base)^εᵢ. 탄력도 priors 전력 1.00·CAPEX 0.90·파운드리 0.85·패키징 0.95. 제약지수 4축(패키징 72 Orange 최고)' },
      { label: 'What-if 시뮬레이터', detail: '병목 자원 4슬라이더 + 잠재수요 U(99/164/260만 대)·공급 시나리오·메모리 강도(가속기 4/6/8·HBM 288/384/512GB·DRAM 1.5/2/3TB) → 실현 출하·binding 축·수급차·가격지수 즉시 재계산' },
      { label: '수급 분석', detail: '상수탄력도 수급 곡선·균형점(기준 HBM p* 97.5·Q* 2.91EB), 3×3 수급차 매트릭스(기준-기준 +0.07EB 균형 / stress -1.12EB·p* 149.7), 공급사별 유효 캐파(SK 1.24·삼성 0.94·Micron 0.71EB)' },
      { label: '민감도·대응 매뉴얼', detail: '하방 CAPEX(-0.91EB·-31.5%) > 전력(-0.61) ≈ 패키징(-0.59) > 파운드리(-0.43) · 상방 최종 병목 = 파운드리(152.8만 대). 충격 5종(전력·CAPEX·CoWoS·TSMC·복합) 트리거·즉시/중기/사전 대응' },
      { label: 'KPI 모니터링 설계', detail: '병목별 P1/P2/P3 지표 20종 + 경보 5단계(Green<40 ~ Critical>85) + 혼합주기 운영원칙(전력 실시간 API·공시 이벤트·3-of-6 rule·단일 공식 원문 Red 승격)' },
      { label: '위키·소스', detail: 'wiki/concepts/bottleneck-model-2030.md 신설 + 7개 페이지 보강(energy-constraints·ai-capex·hbm-market·ai-server-demand·tsmc·demand-inflection-ewi·rs9). sources/papers/ 딥리서치 2건 수집' },
      { label: 'version v2.19.1 → v2.20.0 (마이너)', detail: '새 페이지(탭) + 새 데이터 카테고리(bottleneckModel.js)' },
    ],
    links: [
      { label: 'bottleneck-model-2030.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/bottleneck-model-2030.md' },
      { label: 'deep-research-2030-bottleneck-quant-model', href: 'https://github.com/k31001/action-learning/blob/main/sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md' },
    ],
  },
  // ── 2026-06-06 (iii) — 소급 기록 (2026-06-10에 추가) ────────────────────────
  {
    date: '2026-06-06',
    type: 'ingest',
    version: 'v2.19.0',
    title: 'Bain(신문섭) AI 컴퓨트·반도체 시리즈 — 컴퓨트 경제학 갭·163GW',
    summary:
      '베인 신문섭 파트너 도메인 3개 시리즈 취합: AI 컴퓨트 경제학 갭($2조 매출·$500B capex·$800B 자금 갭), 메모리=하이퍼스케일러 AI 지출 ~30%, DC 163GW(2030)·전력 게이트키퍼. AI DC 탭에 Bain 벤치마크 카드 신설. (v2.19.1: working-style/ 제거 + 죽은 참조 정리 패치)',
    tags: ['Bain', '신문섭', 'AI capex', '컴퓨트 경제학', 'dashboard'],
    items: [
      { label: 'wiki 신설', detail: 'concepts/ai-compute-economics-gap.md + 6개 페이지 보강' },
      { label: 'AI DC 탭', detail: 'DC_ANCHORS Bain 7개 앵커 + 외부 전망 벤치마크 카드(163GW·200GW·$500B·$2조·$800B·30%)' },
    ],
    links: [
      { label: 'ai-compute-economics-gap.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/ai-compute-economics-gap.md' },
    ],
  },
  // ── 2026-06-06 (ii) — 소급 기록 (2026-06-10에 추가) ─────────────────────────
  {
    date: '2026-06-06',
    type: 'build',
    version: 'v2.18.0',
    title: 'SCM 공급망 축 EWI 편입 — 채찍효과·재고위치·할당',
    summary:
      'SCM 관점 7대 불황 선행지표를 수요 변곡 EWI의 ⑦ SCM 공급망 축으로 정식 편입 — 가짜수요 갭(발주−셀스루)·더블오더링·재고 에셜론·할당 커버리지·업스트림 공급증분·주문 처닝·CCC/고객 신용. 복합점수 36→43(주의), SCM side 56(경계 근접).',
    tags: ['SCM', '채찍효과', '수요 EWI', 'dashboard'],
    items: [
      { label: '⑦ SCM 축 신설', detail: 'CHAIN_TIERS·DEMAND_SIGNALS +7종, inflectionSummary.scm, Panel SCM 막대·방법론' },
      { label: '즉시 운용 3종', detail: '가짜수요 갭·할당 커버리지·업스트림 공급증분' },
    ],
    links: [
      { label: 'demand-inflection-ewi.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/demand-inflection-ewi.md' },
    ],
  },
  // ── 2026-06-06 ─────────────────────────────────────────────────────────────
  {
    date: '2026-06-06',
    type: 'build',
    version: 'v2.17.0',
    title: '전략 리팩토링 — 최신 데이터(DC 착공 + 수요 변곡) 반영',
    summary:
      'AI DC 착공 트래커(55.9GW)와 수요 변곡 EWI를 시나리오·전략에 반영. Robust 전략 RS-9(데이터 기반 수요 변곡 센싱) 신설, SD-1(HBM 독립 P&L) → RS-5 흡수, 시나리오 확률 재튜닝(B·D 상향), 신규 의사결정 D15~D17·전환 트리거 3종 추가, DecisionTracker 단일 소스 통합.',
    tags: ['전략 리팩토링', 'RS-9', '시나리오', '수요 변곡', 'DC 착공', 'dashboard'],
    items: [
      { label: 'RS-9 신설', detail: '데이터 기반 수요 변곡 센싱 — DC 착공 트래커 + 수요 변곡 EWI 앙상블로 하락 변곡 선제 포착. 공급 거버넌스 축(RS-1·RS-5·RS-9). 9개 Robust·45셀 매트릭스' },
      { label: 'SD-1 demote', detail: 'HBM 독립 P&L → 시나리오 베팅에서 제외, RS-5 재무 규율 가시성으로 흡수. 메인벳 6→5개' },
      { label: '시나리오 확률', detail: 'A26·B35·C10·D23·E6 (합 100). B 34→35(슈퍼사이클)·D 22→23(공급 과잉·정점 신호) 상향, A·C 소폭 하향. indicators.js + scenarioPlanning.js 동시 갱신' },
      { label: '의사결정 +3', detail: 'D15(수요 변곡 조기경보 운영)·D16(호황 정점 공급 규율, critical)·D17(소버린 다변화) → 17개. DecisionTracker 로컬 중복 제거 후 strategies.js 단일 소스 통합(deadline 정규화 NaN 버그 수정)' },
      { label: '전환 트리거 +3', detail: 'gpu_rental_collapse·dc_construction_cancellations·demand_inflection_divergence → 21개. 모두 시나리오 D·C 방향' },
      { label: '위키·보고서 동기화', detail: 'rs9 위키 신설, scenario-matrix·key-drivers DF1·core/invariant README 갱신, 보고서 §5/7.1/7.3/4.2/8.1 반영(구 RS 택소노미 불일치는 알려진 이슈로 명시)' },
      { label: 'version v2.16.0 → v2.17.0 (마이너)', detail: '전략 리팩토링·RS-9·신규 결정/트리거·시나리오 갱신·DecisionTracker 통합' },
    ],
    links: [
      { label: 'rs9-demand-inflection-sensing.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/strategies/invariant/rs9-demand-inflection-sensing.md' },
    ],
  },
  // ── 2026-06-02 (i) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.16.0',
    title: '수요 EWI 고도화 — GPU 바스켓·선행 시장 추이·현물 공급',
    summary:
      '① GPU 임대가를 H100·H200 바스켓으로 전환(유동성 보강), ② 선행 시장 신호 12개월 실측 추이 차트(NVDA·MU·HYG, 로그축), ③ Vast.ai 현물 공급(가용 오퍼 수) 신호 신설. 모두 Vast.ai/Yahoo 실측.',
    tags: ['수요 EWI', 'GPU 임대가', 'Vast.ai', '실시간 데이터', 'dashboard'],
    items: [
      { label: '① GPU 바스켓', detail: 'gpu_rental_h100_usd → H100 SXM·H200 0.5:0.5 바스켓 중앙값(유동성 안정화). vast.js fetchVastBasket. 현재 ~$3.3' },
      { label: '② 선행 추이 차트', detail: 'DemandInflectionPanel — /api/stocks/history NVDA·MU·HYG 12개월 정규화·로그축 라인(동반 하락=선행 약화). HYG 심볼 추가' },
      { label: '③ 현물 공급', detail: 'gpu_supply_offers — Vast.ai 가용 on-demand 오퍼 수(H100/H200/NVL). 증가=공급 완화. 현재 ~51건' },
      { label: '검증', detail: '로컬+프로덕션 egress 확인: 바스켓 $3.277(H100 $2.65·n7/H200 $3.91·n42), 공급 51건, HYG 262주. MU 12개월 7.6배(슈퍼사이클) 실측' },
      { label: 'version v2.15.0 → v2.16.0 (마이너)', detail: '바스켓·실측 추이 차트·공급 신호' },
    ],
    links: [
      { label: 'vast.js', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/api/_lib/vast.js' },
    ],
  },
  // ── 2026-06-02 (h) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.15.0',
    title: 'GPU 현물 임대가 실측 연동 — Vast.ai 공개 API',
    summary:
      'Tier0 최선행 신호(GPU 임대가)를 Vast.ai 공개 오퍼 API로 실측 자동 갱신. H100 SXM on-demand 중앙값 $/GPU·h를 매일 누적해 추세 형성(프록시 아님). CRWV 주가 프록시는 가격이 아닌 지분가치 추종이라 거부하고 실제 마켓 현물가로 연동.',
    tags: ['수요 EWI', 'GPU 임대가', 'Vast.ai', '실시간 데이터', 'dashboard'],
    items: [
      { label: '신규 실측 EWI', detail: 'gpu_rental_h100_usd — Vast.ai H100 SXM on-demand 중앙값 $/GPU·h (현재 ~$2.5, n=7, H200 ~$3.9 병기)' },
      { label: '신규 연동', detail: 'api/_lib/vast.js + handlers.js + server/index.js — 공개 오퍼 API GET(브라우저 헤더 Origin/Referer 필요), per-GPU 중앙값, 일 1회 cron' },
      { label: '실측 vs 프록시', detail: 'isProxy:false — Vast.ai 실제 임대가. CRWV 주가 프록시 검증 후 거부(6개월 +30%인데 임대가 하락 — 신호 오인 위험)' },
      { label: '연동', detail: 'demandSignals Tier0 gpu_rental → ewiId gpu_rental_h100_usd. 패널 안내·위키 자동/수동 표 갱신' },
      { label: 'version v2.14.0 → v2.15.0 (마이너)', detail: '신규 실측 데이터 소스(Vast.ai) + 신규 EWI' },
    ],
    links: [
      { label: 'vast.js', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/api/_lib/vast.js' },
    ],
  },
  // ── 2026-06-02 (g) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.14.0',
    title: '수요 EWI — 신용 스프레드 자동 갱신 + what-if 시뮬레이터',
    summary:
      'AI-DC 신용 스프레드 EWI를 HYG 프록시(듀레이션 환산 bps)로 자동 갱신 연결. 수요 EWI 탭에 what-if 시뮬레이터 추가 — 신호 레벨을 바꿔 복합 위험·선행/끈적 괴리를 즉시 재계산해 변곡 시나리오 스트레스 테스트. GPU 임대가는 CRWV가 가격 아닌 주가 추종해 오인 위험으로 수동 유지(정직성).',
    tags: ['수요 EWI', '조기경보', '자동 갱신', 'what-if', 'dashboard'],
    items: [
      { label: '자동 갱신', detail: 'ai_dc_credit_spread ← HYG 6개월 역행·듀레이션 환산(bps). api/_lib/handlers.js + server/index.js 양쪽 핸들러 + 일 1회 cron' },
      { label: 'what-if 시뮬레이터', detail: 'DemandInflectionPanel — 사슬 보드 칩 클릭으로 레벨 변경(확장→중립→주의→수축), 복합 위험·괴리·측면 바 즉시 재계산, 현재로 초기화' },
      { label: '정직성 결정', detail: 'GPU 임대가는 자동 연동 제외 — CRWV 6개월 +30%인데 실제 임대가는 하락(주가≠가격), 핵심 선행 신호 오인 위험. 수동 유지(ClusterMAX/Vast.ai)' },
      { label: '위키', detail: 'demand-inflection-ewi.md에 자동/수동·시뮬레이터 운용 노트 추가' },
      { label: 'version v2.13.0 → v2.14.0 (마이너)', detail: '신규 실시간 데이터 연동 + 인터랙티브 시뮬레이터' },
    ],
    links: [
      { label: 'handlers.js', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/api/_lib/handlers.js' },
    ],
  },
  // ── 2026-06-02 (f) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.13.0',
    title: '신규 탭 "수요 EWI" — 메모리 수요 변곡 조기경보',
    summary:
      'DC 착공만으로 부족한 하락 변곡 조기탐지를 위해, 인과 사슬(①수요청산가→②돈→③발주미시→④착공→⑤메모리, ⑥공급축) 선행지표 체계를 신설. 복합 위험점수·선행/끈적 괴리·사슬 신호 보드. EWI 5종 신규. 착공보다 왼쪽 신호가 먼저 꺾이는 괴리 = 행동 윈도우.',
    tags: ['수요 변곡', '조기경보', 'EWI', '메모리 수요', '신규 탭', 'dashboard'],
    items: [
      { label: '신규 데이터', detail: 'demandSignals.js — 인과 사슬 6단계·15신호·복합/측면 위험·괴리 헬퍼' },
      { label: '신규 컴포넌트', detail: 'DemandInflectionPanel.jsx — 복합 위험 미터·선행/끈적/공급 바·괴리 콜아웃·사슬 보드·신호 표 (custom JSX)' },
      { label: 'EWI 5종 신설', detail: 'gpu_rental_price_trend·ai_dc_credit_spread·dc_cancellation_count·spot_contract_spread·memory_inventory_days (indicators.js)' },
      { label: '핵심 로직', detail: '선행(수요·돈·발주) − 끈적(착공·메모리) 괴리 + 공급 과잉 축. 샤프드롭 메커니즘(불휩 언와인드·효율 에어포켓) 명시' },
      { label: '위키', detail: 'wiki/concepts/demand-inflection-ewi.md (단일 소스, Mermaid 사슬·계층표) + sources/raw-notes 방법론' },
      { label: 'DataVisualization.jsx', detail: 'SUB_TABS 두 번째 "수요 EWI" 탭(Gauge)' },
      { label: 'version v2.12.0 → v2.13.0 (마이너)', detail: '신규 페이지/탭 + 새 데이터 카테고리(수요 신호) + EWI 5종' },
    ],
    links: [
      { label: 'demand-inflection-ewi.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/demand-inflection-ewi.md' },
      { label: 'DemandInflectionPanel.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/DemandInflectionPanel.jsx' },
    ],
  },
  // ── 2026-06-02 (e) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.12.0',
    title: '신규 차트 — 주요 운영사별 연도별 누적 데이터센터 용량',
    summary:
      'AI DC 탭에 운영사별 연도(가로) × 누적 보유 용량 GW(세로) 꺾은선 차트 추가. 상위 10개 운영사(OpenAI/Stargate·Meta·G42·Amazon·CoreWeave·Microsoft·Reliance·Google·xAI·HUMAIN)의 용량 성장 궤적을 비교.',
    tags: ['AI 데이터센터', '운영사', '메모리 수요', '시각화', 'dashboard'],
    items: [
      { label: '신규 데이터', detail: 'dataCenters.js — DC_OPERATOR_GROUP(id→앵커 귀속) + operatorGroup 필드 + capacityByOperatorYear() 헬퍼(연도 누적, 상위 N, 기타 제외)' },
      { label: '신규 차트', detail: 'DataCenterTracker.jsx — 운영사별 LineChart(10선), 1차 가동 연도 기준 누적 GW' },
      { label: '귀속 규칙', detail: 'Stargate 컨소시엄→OpenAI/Stargate, Nscale 앵커→Microsoft, SK·HUMAIN 조인트의 AWS 몫→Amazon, UAE 5GW→G42. 상위 10개(추적 ~76%)·지역/논란 제외' },
      { label: '위키', detail: 'ai-datacenter-buildout.md에 운영사 귀속 방법론 노트 추가' },
      { label: 'version v2.11.2 → v2.12.0 (마이너)', detail: '새 데이터 카테고리(운영사 귀속) + 신규 차트' },
    ],
    links: [
      { label: 'DataCenterTracker.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/DataCenterTracker.jsx' },
    ],
  },
  // ── 2026-06-02 (d) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.11.2',
    title: '버그 수정 — 지도 마커 호버 시 백지(white screen) 크래시',
    summary:
      '세계 지도 마커에 마우스를 올렸다 떼면 툴팁이 잠깐 보였다가 화면 전체가 하얗게 되던 크래시 수정. 원인: 원에서 마우스가 벗어날 때 leave(setHover(null))와 svg move 핸들러가 한 배치로 묶이며 d 없는 hover 객체가 만들어져 툴팁 렌더에서 예외 → 트리 붕괴.',
    tags: ['버그수정', '세계지도', 'AI 데이터센터', 'dashboard'],
    items: [
      { label: '근본 원인', detail: 'onMove 의 setHover(h => ({...h, ...pos(e)})) 가 h=null 일 때 {...null,...} → d 없는 부분 객체 → hover.d.* 접근 시 TypeError' },
      { label: '수정', detail: 'WorldMap.jsx: 업데이터를 h ? {...h, ...pos(e)} : null 로 가드 + 툴팁 렌더를 hover?.d && 로 방어' },
      { label: '안전망 추가', detail: 'ErrorBoundary.jsx 신설 — App 탭 콘텐츠를 key={topTab} 로 감싸 컴포넌트 오류 시 전체 백지 대신 격리된 폴백 표시·탭 전환 시 자동 리셋' },
      { label: '검증', detail: '동일 레이스(leave→move 한 배치) 재현 → 수정본은 앱 정상 유지·hover null 클리어·콘솔 오류 0' },
      { label: 'version v2.11.1 → v2.11.2 (패치)', detail: '크래시 버그 수정' },
    ],
    links: [
      { label: 'WorldMap.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/WorldMap.jsx' },
      { label: 'ErrorBoundary.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/ErrorBoundary.jsx' },
    ],
  },
  // ── 2026-06-02 (c) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.11.1',
    title: 'AI DC 세계 지도 — 인터랙션 3종 (줌·색상토글·클릭연동)',
    summary:
      '세계 지도 뷰에 ① 줌/팬(휠 확대·드래그 이동·버튼), ② 색상 기준 토글(권역↔단계), ③ 마커 클릭 시 하단 상세 표의 해당 행으로 스크롤·하이라이트를 추가. 줌 시 마커는 화면 크기 유지(역스케일)·국경선 굵기 유지(non-scaling-stroke).',
    tags: ['AI 데이터센터', '세계지도', '인터랙션', 'UX', 'dashboard'],
    items: [
      { label: '줌/팬', detail: '휠 확대(커서 기준)·드래그 이동·+/−/초기화 버튼. translate+scale 변환, 패닝 클램프로 빈 영역 방지' },
      { label: '색상 토글', detail: '권역별(4색) ↔ 단계별(9색) 전환 + 범례 동기 전환' },
      { label: '클릭 연동', detail: '마커 클릭 → selectedId → 상세 표 해당 행 scrollIntoView + bg 하이라이트, 선택 마커 링 표시' },
      { label: '시각 안정성', detail: '줌 시 마커 반지름 ÷k (화면 크기 일정)·vectorEffect non-scaling-stroke (국경/그래티큘 굵기 일정)' },
      { label: 'version v2.11.0 → v2.11.1 (패치)', detail: '기존 지도 카드 내 인터랙션 강화 — 페이지/데이터 구조 불변' },
    ],
    links: [
      { label: 'WorldMap.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/WorldMap.jsx' },
    ],
  },
  // ── 2026-06-02 (b) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.11.0',
    title: 'AI DC 트래커 — 세계 지도 뷰 추가',
    summary:
      '"AI DC" 탭 상단에 세계 지도(Equal Earth 투영) 배경 위에 데이터센터를 전력 규모(원 크기)·권역(색)으로 표시하는 지도 뷰를 추가. 마커 호버 시 위치·전력·단계·칩·상태 툴팁. 46개 프로젝트 좌표 병합.',
    tags: ['AI 데이터센터', '세계지도', '시각화', 'd3-geo', 'dashboard'],
    items: [
      { label: '신규 컴포넌트', detail: 'dashboard/src/components/WorldMap.jsx — d3-geo Equal Earth 투영, 정적 지오메트리 모듈 1회 계산, 전력 √스케일 버블·호버 툴팁' },
      { label: '신규 의존성', detail: 'd3-geo + topojson-client + world-110m.json(번들). 권역 색·범례·크기 안내' },
      { label: '좌표 병합', detail: 'dataCenters.js DC_COORDS — id별 [lng,lat] 46건 병합 (포트폴리오/다중사이트 CoreWeave 제외)' },
      { label: '배치', detail: 'DataCenterTracker.jsx KPI 아래·단계 보드 위 풀폭 카드로 삽입' },
      { label: 'version v2.10.0 → v2.11.0 (마이너)', detail: '큰 UX 변경(세계 지도 뷰) + 새 데이터 카테고리(좌표)' },
    ],
    links: [
      { label: 'WorldMap.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/WorldMap.jsx' },
    ],
  },
  // ── 2026-06-02 (a) ─────────────────────────────────────────────────────────
  {
    date: '2026-06-02',
    type: 'build',
    version: 'v2.10.0',
    title: '신규 탭 "AI DC" — 전 세계 AI 데이터센터 착공 트래커',
    summary:
      'Data Viz에 AI 데이터센터 착공 모니터링 페이지 신설. 부지 확보→가동 9단계로 전 세계 47건(17개국·55.9GW)의 현 단계를 한눈에 보고, 용량→GPU→HBM/DRAM 환산으로 메모리 수요를 추정. AI DC 건설은 메모리 수요의 6~24개월 선행 지표.',
    tags: ['AI 데이터센터', 'HBM', '메모리 수요', '선행지표', 'dashboard', '신규 탭'],
    items: [
      { label: '신규 데이터', detail: 'dashboard/src/data/dataCenters.js — 9단계 모델·용량→메모리 환산 모델·글로벌 프로젝트 47건·집계 헬퍼' },
      { label: '신규 컴포넌트', detail: 'dashboard/src/components/DataCenterTracker.jsx — 단계 칸반 보드(한눈에)·권역 필터·KPI·예측' },
      { label: '단계 보드', detail: '부지확보→인허가·전력→조성→골조→전력→M&E→IT설치→시운전→가동 9단계 칸반, 병목(②⑤⑦) 표기' },
      { label: '시각화', detail: '단계별 용량·권역 도넛·국가별 막대·전력 규모 상위·메모리 수요 예측(누적 GW↔HBM EB)·정렬 가능 상세 테이블' },
      { label: '메모리 환산', detail: '1GW ≈ 0.47M GPU ≈ 90~135PB HBM ≈ $1.35~2.0B HBM (Blackwell~GB300). 추적 55.9GW → ~5.0~7.5EB HBM 설치기반' },
      { label: '위키 소스', detail: 'wiki/concepts/ai-datacenter-buildout.md (단일 소스) + sources/raw-notes/ai-datacenter-buildout-2026-06.md (4-에이전트 수집)' },
      { label: 'DataVisualization.jsx 통합', detail: 'SUB_TABS 첫 번째 "AI DC" 탭(Server 아이콘)·기본 탭으로 설정' },
      { label: 'version v2.9.2 → v2.10.0 (마이너)', detail: '신규 페이지/탭·새 데이터 카테고리 추가' },
    ],
    links: [
      { label: 'ai-datacenter-buildout.md', href: 'https://github.com/k31001/action-learning/blob/main/wiki/concepts/ai-datacenter-buildout.md' },
      { label: 'DataCenterTracker.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/DataCenterTracker.jsx' },
    ],
  },
  // ── 2026-05-25 ─────────────────────────────────────────────────────────────
  {
    date: '2026-05-25',
    type: 'build',
    version: 'v2.8.0',
    title: '신규 탭 "업데이트 내역" 추가',
    summary:
      'dashboard 상단 탭에 업데이트 타임라인을 추가. 위키 ingest·build·query 사이클의 변경 사항을 날짜·타입·태그로 필터링하여 확인할 수 있습니다. 매 사이클 종료 시 dashboard/src/data/updates.js에 entry 추가가 컨벤션.',
    tags: ['dashboard', 'UX', '신규 탭'],
    items: [
      { label: '신규 컴포넌트', detail: 'dashboard/src/components/Updates.jsx (타임라인 + 필터 칩 + 펼침/접기)' },
      { label: '신규 데이터', detail: 'dashboard/src/data/updates.js — 시간 역순 큐레이션, 타입(ingest/build/query/lint/migration)·태그·버전·외부 링크' },
      { label: '필터', detail: '타입(전체/Ingest/Build/Query) + 태그 다중 필터 + 모두 펼치기·접기' },
      { label: '통계 상자', detail: '총 업데이트·ingest·build·최신 업데이트 4종' },
      { label: 'App.jsx 통합', detail: 'TOP_TABS에 History 아이콘 + "업데이트 내역" 5번째 탭으로 삽입 (Strategy 다음)' },
      { label: 'version v2.7.8 → v2.8.0 (마이너)', detail: '신규 페이지/탭 추가에 따른 마이너 버전 bump' },
    ],
    links: [
      { label: 'Updates.jsx', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/components/Updates.jsx' },
      { label: 'updates.js', href: 'https://github.com/k31001/action-learning/blob/main/dashboard/src/data/updates.js' },
    ],
  },
  {
    date: '2026-05-25',
    type: 'build',
    version: 'v2.7.8',
    title: 'Counterpoint 7건 결과를 dashboard·report에 sync',
    summary:
      'Counterpoint 인바운드 ingest 결과를 dashboard 데이터 미러·indicators·DECISIONS·SCENARIOS B와 outputs/report에 일괄 반영. 신규 EWI 2종 신설.',
    tags: ['Counterpoint', 'HBM', 'EWI', 'Main Bet', 'dashboard'],
    items: [
      { label: 'visualizations.js hbmShareTrend', detail: 'Counterpoint Q3 2025 행 추가 (SK 57 / Samsung 22 / Micron 21) — Astute와 병기' },
      { label: 'milestones 4건 추가', detail: 'Q4 2025 메모리 매출 1위 회복 · 64GB RDIMM $450→$900 · NVIDIA LPDDR 피벗 · Micron $200B' },
      { label: 'COMPETITIVE_LANDSCAPE 3사 갱신', detail: 'samsung·skhynix·micron — FY25 OP 47.2/24.9조, HBM Q3 2025 22/57, Rubin 2/3+ SK, Micron Q1 FY26 $13.6B + $200B + "with discipline"' },
      { label: 'DECISIONS D1·D6·D12 갱신', detail: 'D1 KPI 윈도우 HBM4E·HBM5 이동 검토 · D6 DRAM OPM>HBM 정점 신호 확정 · D12 단순 LTA+선급금 시급도 ↑·고도화 후순위' },
      { label: 'SCENARIOS B Main Bet KPI 사실 직시', detail: 'Q3 2025 22% (Counterpoint, 목표 28% -6%pt 미달). 확률(30~35%) 유지, 윈도우 이동' },
      { label: '신규 EWI: dram_opm_vs_hbm_opm', detail: '현재 inverted/critical — 사이클 정점 12~18개월 전 신호' },
      { label: '신규 EWI: smartphone_shipment_yoy', detail: '현재 -2.1%/warning — 메모리 부족 전이' },
      { label: 'outputs/report 3개 단락 보강', detail: '핵심 수치 표 + HBM 점유 표 + 시나리오 B Main Bet 사실 직시' },
      { label: 'version v2.7.7 → v2.7.8 (패치)', detail: '신규 EWI 2종 + 데이터 갱신, 페이지 구조 변경 없음' },
      { label: 'npm run build ✓ 3.17s', detail: '2,337 modules, 898.6kB JS' },
    ],
    links: [
      { label: 'log.md 항목', href: 'https://github.com/k31001/action-learning/blob/main/log.md' },
    ],
  },
  {
    date: '2026-05-25',
    type: 'ingest',
    version: null,
    title: 'Counterpoint Research 메모리 시리즈 7건 (2025-11 ~ 2026-04)',
    summary:
      'counterpointresearch.com 인바운드 수집 — 사이트 JS 렌더링/구독 제한으로 WebSearch 스니펫 + 3자 보도 교차 검증. 위키 14개 페이지 갱신.',
    tags: ['Counterpoint', 'HBM', 'DRAM', 'LTA', 'NVIDIA', 'Main Bet'],
    items: [
      { label: '#1 Advanced Memory Prices Likely to Double (2025-11-19)', detail: 'NVIDIA LPDDR 피벗 "seismic shift", DDR4 $2.10/Gb > DDR5 $1.50/Gb 가격 역전' },
      { label: '#2 Micron Record Performance (2025-12-18)', detail: 'Q1 FY26 매출 $13.6B (+57% YoY, +21% QoQ), 시장 $200B→$400B' },
      { label: '#3 2026 Smartphone Forecasts Revised Down (2025-12-18)', detail: '글로벌 -2.1% (역대 최대 하향), BoM +25/15/10% (저/중/고가), ASP +6.9% YoY' },
      { label: '#4 Q4 2025 Samsung Reclaims Top (2026-01-29)', detail: 'Samsung 메모리 매출 $25.9B 1위 회복, SK hynix Q4 2025 메모리 OPM 58%' },
      { label: '#5 SK Hynix Overtakes Samsung in Profit (2026-01-29)', detail: 'SK FY25 OP 47.2조 > Samsung 전사 43.6조 (Samsung 메모리만 24.9조), HBM Q3 2025 SK 57% vs Samsung 22%, Rubin 2/3+ SK' },
      { label: '#6 Memory Prices Surge Up to 90% (2026-02-05)', detail: 'Q1 2026 80~90% QoQ, 64GB RDIMM $450→$900→$1000+, DRAM OPM 60% 사상 첫 HBM 초과' },
      { label: '#7 LTA Structurally Reshaping DRAM (2026-04-06)', detail: 'UBS Arcuri "LTA가 cyclicality 제거", Microsoft·Google이 SK hynix와 3년 LTA + 선급금 협의 중' },
      { label: '위키 갱신', detail: 'concepts 5 (price-trends, memory-market-overview, dram-market-share, hbm-market, ai-server-demand) + entities 3 (samsung, sk-hynix, micron) + steep economy + scenario-B + RS 3 (1·5·8)' },
    ],
    links: [
      { label: 'Counterpoint Research', href: 'https://counterpointresearch.com/en' },
    ],
  },
  {
    date: '2026-05-25',
    type: 'ingest',
    version: null,
    title: 'Bloomberg TV: Micron CEO Mehrotra 미국 캐파·LTA·"discipline"',
    summary:
      'Manassas VA 1α DRAM 양산 개시 행사 인터뷰. $200B/10년·90K 일자리·"shortage well beyond 2026"·LTSA·"with discipline" 4회. RS-1/2/5/8 본인 언어 확인.',
    tags: ['Micron', 'Bloomberg', 'RS-1', 'RS-5', 'RS-8', 'LTA'],
    items: [
      { label: '미국 DRAM 캐파 10% → ~40% (10년)', detail: '총 $200B, 90,000 일자리. Manassas DDR4/1α 4배 확장, Boise leading-edge 2027 mid, Syracuse 4팹 메가 클러스터' },
      { label: '부족 장기화 공식 인정', detail: '"Shortage well beyond 2026", 현재 50~2/3만 충족, "Meaningful new supply doesn\'t ramp until 2028"' },
      { label: '"With discipline" 4회 반복', detail: 'Shell 선행 + 장비 단계화 본인 언어 명시 — RS-1 옵션형 캐파 산업 표준어화' },
      { label: 'LTSA 직접 인용', detail: '"Long term supply agreements" — 고객 predictability ↔ 생산자 confidence' },
      { label: '위키 갱신', detail: 'wiki/entities/micron.md + RS-1/2/5/8 [Update 2026-05-22] 섹션 추가' },
    ],
    links: [
      { label: 'YouTube 원본', href: 'https://youtu.be/Q_PSCMdINmg' },
    ],
  },

  // ── 2026-05-19 ─────────────────────────────────────────────────────────────
  {
    date: '2026-05-19',
    type: 'build',
    version: 'v2.7.7',
    title: '4개 후속 작업 일괄 (venv 정비 + EWI 2종 + DECISIONS 2종)',
    summary:
      'venv 정비(PEP 668 우회) + 신규 EWI 2종(apple_ondevice_ai_status, hbm6_mass_production_status) + DECISIONS D13·D14 신설.',
    tags: ['venv', 'EWI', 'DECISIONS', 'CXL', '3D DRAM'],
    items: [
      { label: 'venv 분리', detail: 'brew Python PEP 668 차단 우회. .venv/ 생성 후 .gitignore 등재' },
      { label: 'EWI: apple_ondevice_ai_status', detail: '애플 온디바이스 AI 메모리 채택 단계 추적' },
      { label: 'EWI: hbm6_mass_production_status', detail: 'HBM 6세대 양산 진척 — Main Bet 기술 토대 검증' },
      { label: 'D13 SE-1 3D DRAM 가속', detail: 'IMEC 협약 $300M+ 상향 + R&D 조직 확대' },
      { label: 'D14 SE-2 CXL 표준 주도권 4단계', detail: 'SIG 의장단 진입 → 차세대 표준 작성 → NVIDIA 인증 → 30% 점유' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'ingest',
    version: 'v2.7.6',
    title: '권석준 추가 영상 3건 → MB-4 / SE-1 / SE-2 / RS-2 강화',
    summary:
      'SBS 교양이를 부탁해 + 동아일보 + 추가 영상. IDM 차별점·CXL "메모리 부도심"·3D DRAM 5년 베팅 등 핵심 전략 재정렬.',
    tags: ['권석준', 'IDM', 'CXL', '3D DRAM', 'RS-2'],
    items: [
      { label: 'MB-4 커스텀 AI 메모리', detail: '5종 메모리 통합 솔루션 강화' },
      { label: 'SE-1 3D DRAM', detail: 'IMEC 협약 $200M → $300M+ 상향 명분' },
      { label: 'SE-2 CXL', detail: '"메모리 부도심·삼성 차별점" 진단 반영' },
      { label: 'RS-2 바벨', detail: 'IDM 종합반도체 = HBM4E 격전지 차별점' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'ingest',
    version: 'v2.7.5',
    title: '권석준 인터뷰 (SBS 교양이를 부탁해 2026-04-11)',
    summary:
      'TSMC N12 "인질 위기" / 메모리 가격 스트레스 테스트 / 변화 적응 능력. 위키 다수 갱신 + 권 교수 발언 일관 인용.',
    tags: ['권석준', 'TSMC', '인질', 'SBS'],
    items: [
      { label: 'SK하이닉스 TSMC N12 인질 위기', detail: 'sk-hynix.md gapAreas에 Plan B 시급도 추가' },
      { label: '메모리 단가 3~4배 폭등', detail: 'price-trends.md "갑을 역전" 섹션' },
      { label: '변화 적응 = 시나리오 플래닝 본질', detail: 'memory-market-overview.md 권 교수 권고 인용' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'build',
    version: 'v2.7.4',
    title: 'dashboard 버전 bump + 변경 정합성 체인에 version 단계 강제 추가',
    summary:
      '누락된 dashboard 버전 bump 처리 + CLAUDE.md §6 체인에 version bump 단계 강제 명문화.',
    tags: ['version', 'CLAUDE.md', '체인'],
    items: [
      { label: 'v2.7.3 → v2.7.4 (패치)', detail: '누적 3건 dashboard 변경 회수' },
      { label: 'CLAUDE.md §6 보강', detail: '변경 정합성 체인 마무리 단계에 "version.js bump" 강제 추가' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'build',
    version: null,
    title: 'dashboard sync: 4개 query 결과 미러링',
    summary:
      'SemiAnalysis ingest의 4개 query 결론을 dashboard visualizations·strategies·indicators에 일괄 반영.',
    tags: ['SemiAnalysis', 'CXMT', 'D6', 'D10', 'EWI'],
    items: [
      { label: 'dramMarketShareTrend 2027E', detail: 'cxmt 14 → 16 (Samsung 30→29, SK 32→31 분배)' },
      { label: 'D6 RS-1·4·5 호황기 절제 강화', detail: '신규 고정 캐파 동결·mix 전환권·LTA 없는 증설 금지·재고 -15%·재투자 70%+·자사주 보류' },
      { label: 'D10 NAND V11 가속', detail: 'Kioxia BiCS10 등장 → 2027 H1 → 2026 H2 가속 검토' },
      { label: '신규 EWI 2종', detail: 'cxmt_asp_gap (CXMT ASP 격차), cxmt_fab3_status (Fab 3 가동 단계)' },
    ],
  },
  {
    date: '2026-05-19',
    type: 'ingest',
    version: null,
    title: 'SemiAnalysis 3개 기사 (ISSCC 2026 / AI Silicon Shortage / Vera Rubin)',
    summary:
      'HBM ×4 캐파 잠식, DDR 마진 HBM 근접, Micron Rubin "effectively out" 평가. RS-1/4/5/6/7 강도 재조정.',
    tags: ['SemiAnalysis', 'HBM', 'Rubin', 'Micron', 'BiCS10'],
    items: [
      { label: 'HBM 캐파 잠식 3 → 4×', detail: 'hbm-market.md, rs1·rs5 강도 강화' },
      { label: 'DDR DRAM 마진 HBM 근접/초과', detail: 'price-trends.md, rs1·rs5 호황 정점 신호 1단계' },
      { label: 'Micron Rubin HBM4 "effectively out"', detail: 'micron.md, Samsung Rubin 28% 진입 여지 확대' },
      { label: 'Kioxia BiCS10 332L', detail: 'nand-process-transition.md, V11 가속 명분' },
    ],
  },
]
