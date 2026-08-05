---
type: analysis
last_reviewed: 2026-08-05
sources: [sources/articles/dram-chicken-game-history-2026-08-05.md, sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md, sources/filings/micron-q3-fy26.md, sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md, sources/articles/lta-to-sca-industry-context-2026-06.md]
---

# 스토리라인 (게임이론 렌즈) — 치킨게임에서 약속의 게임으로

> **한 문장 논지**: 메모리 산업은 두 번의 치킨게임으로 경기자를 6명에서 3명으로 줄였고, 지금은 **절제가 균형인 반복게임**을 두고 있다 — 삼성의 전략은 이 균형을 유지하는 약속 장치(commitment device)를 쌓되, 균형을 깨는 이단 경기자(CXMT)의 등장에 별도의 게임으로 대응하는 것이다.

이 페이지는 [시나리오 플래닝 스토리라인](storyline.md)과 같은 위키 지식을 게임이론의 렌즈로 다시 서사화한 것이다. 미래의 분기 대신 **경기자·보수·균형의 변화**로 이야기를 푼다.

## 게임의 진화 한눈에

```mermaid
flowchart LR
    G1["1기 치킨게임<br/>2007~09 · 6강<br/>Qimonda 퇴출"] --> G2["2기 치킨게임<br/>2010~13<br/>Elpida·대만 퇴출"]
    G2 --> G3["3강 반복게임<br/>2013~ · 절제 균형<br/>'with discipline'"]
    G3 --> G4["약속의 게임<br/>2026 · take-or-pay·SCA<br/>계약 = commitment"]
    G4 -.->|"CXMT 비대칭 진입"| G5["새 게임?<br/>국가보조 경기자"]
```

## 1. 원게임 — 치킨게임은 왜 두 번이나 벌어졌나

일회성 대칭 게임에서 증설은 지배전략에 가깝다 — 내가 절제해도 상대가 증설하면 점유율만 잃는다. 그래서 2007~09년 6강 전원이 증설·버티기를 선택했고, DRAM 가격은 2007년 -85%, 2008년 -58%로 붕괴했다. 결과는 승자의 시장 재편이었다: 키몬다가 누적 손실 $30억을 견디지 못하고 2009년 1월 퇴출됐고, 퇴출 발표 직후 현물가가 급등하며 "경기자 수가 곧 가격"임을 실증했다. 2012년에는 엘피다(부채 4,480억 엔, 전후 일본 제조업 최대 파산)와 대만 진영이 퇴장했다 ([dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)). 삼성은 이 게임의 승자였다 — 위기 직후인 2010년 메모리 시설투자를 5.5조에서 9조 원으로 올리는 역사이클 증설로 회복기 점유율을 흡수했다 (같은 소스).

## 2. 반복게임 — 3강 체제에서 절제는 균형이 된다

경기자가 3명으로 줄자 게임의 성격이 바뀌었다. 반복게임에서는 미래 보복(상대 증설 유발)의 그림자가 현재의 절제를 지탱한다 — "3사는 6사가 할 수 없는 공급 규율 조율이 가능하다" ([dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)). 2026년 이 균형은 공개 신호로 유지되고 있다: 마이크론 CEO는 "shortage well beyond 2026"을 말하며 한 발표에서 "with discipline"을 4회 반복했고 ([bloomberg-micron-ceo-virginia-2026-05-22.md](../../sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md)), HBM 점유율을 DRAM 점유율에 묶어 웨이퍼 잠식을 회피한다고 공시했다 ([micron-q3-fy26.md](../../sources/filings/micron-q3-fy26.md)). 경쟁사가 동시에 절제하는 환경에서는 삼성의 단독 절제가 점유율 손실로 이어질 우려도 약화된다 ([strategy.md](../scenarios/strategy.md) D16). **RS-5(재무 규율)와 RS-1(옵션형 캐파)은 삼성이 이 균형에 내는 판돈이다** — 절제를 내부 거버넌스로 명문화해 스스로 이탈 유혹을 차단한다 ([invariant/README.md](../strategies/invariant/README.md)).

## 3. 약속 장치 — 계약이 게임의 보수 구조를 바꾼다

2026년의 진짜 혁신은 공급자-구매자 게임에서 일어났다. 호황-불황 사이클의 근원은 수요자의 이탈 자유(불황 시 발주 취소)와 공급자의 증설 유혹이 서로를 증폭하는 데 있다. take-or-pay 멀티이어 계약·수백억 달러 선수금 예치·NTB 가격 하한은 **양쪽의 이탈 옵션을 계약으로 태워버리는 약속 장치**다 — "구매 의무를 저버리면 개수×판가로 캐시에서 차감"되는 구조는 사우디 오일 계약처럼 배신의 비용을 명시화한다 ([lee-changsoo-memory-sales-interview-2026-08-03.md](../../sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md)). 마이크론 SCA 16건 $100B의 공시 제도화가 이를 산업 표준으로 만들었고, UBS는 "LTA가 메모리 순환성을 근본적으로 제거한다"고까지 평가한다 ([lta-to-sca-industry-context-2026-06.md](../../sources/articles/lta-to-sca-industry-context-2026-06.md)). 게임이론적으로 이것은 치킨게임의 핸들을 뽑아 창밖으로 던지는 고전적 수 — 선택지를 없애 상대의 기대를 바꾸는 것이다. **RS-8(구조화 매출 헷지)·RS-4(Take-or-Pay LTA)는 이 약속 게임에서 삼성 몫의 계약 설계다.**

## 4. 이단 경기자 — CXMT는 다른 보수함수로 게임한다

이 균형의 최대 위협은 3강 내부가 아니라 외부에 있다. CXMT는 이윤 극대화가 아니라 **국가 목표(반도체 자립)를 보수함수로 갖는 경기자**다 — 빅펀드 III와 IPO의 이중 자금원, DDR5 수율 80%+, HBM3 양산 개시 ([cxmt.md](../entities/cxmt.md), [2026-q1-current-state.md](../concepts/2026-q1-current-state.md)). 손실을 국가가 흡수하는 경기자에게는 가격 보복(치킨게임의 위협)이 억지력을 갖지 못한다. 따라서 대응 게임이 달라진다: 같은 코스트 게임을 받아주는 대신, **RS-6(1c nm 원가 우위)으로 로엔드의 손실 한계를 관리하고, RS-2(바벨)·MB-4(커스텀 솔루션)로 국가보조가 닿지 않는 고부가 층으로 게임판을 옮긴다** ([strategy.md](../scenarios/strategy.md)). 중국 시장이 미주 AI 사이클과 비동조화되어 있다는 관찰도 이 게임의 분리 가능성을 지지한다 ([lee-changsoo-memory-sales-interview-2026-08-03.md](../../sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md)).

## 5. 이 렌즈의 결론

게임이론 렌즈에서 삼성 전략의 요체는 세 문장이다. **첫째, 절제 균형을 지켜라** — RS-5·RS-1로 자기 손을 묶고, 경쟁사의 공개 절제 신호를 EWI로 감시한다(균형 이탈 = D16 발동 신호). **둘째, 약속 장치를 쌓아라** — take-or-pay·NTB·SCA로 다운사이클의 보수 구조 자체를 바꾼다. **셋째, 이단 경기자와는 다른 판에서 싸워라** — 원가 방어선 위에 커스텀·솔루션 층을 올린다. 시나리오 렌즈의 "다섯 개의 미래"는 이 렌즈에서 "균형이 유지되는 미래(A·B)와 균형이 깨지는 미래(C·D·E)"로 다시 읽히며, 두 렌즈 모두 같은 결론에 도달한다 — 호황 정점의 규율이 다음 게임의 승패를 결정한다.

---

## 갱신 규칙

- 경쟁사 캐파·절제 신호·계약 구조(LTA/SCA)·CXMT 관련 페이지가 바뀌면 이 페이지와 `dashboard/src/data/storylineLenses.js`의 게임이론 렌즈를 동반 갱신한다 (CLAUDE.md §6).
