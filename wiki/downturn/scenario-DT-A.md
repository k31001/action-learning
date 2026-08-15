---
type: scenario
last_reviewed: 2026-08-15
sources: [sources/articles/hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md, sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md, sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md, sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md]
---

# DT-A 「급제동」 — 수요발 × 급락형

**조건부 확률 20%** · [매트릭스](scenario-matrix.md) · 발원지: 수요 수축 / 전개: 급락 (2~4분기)

> 실물 수요가 줄기 전에 **자금이 먼저 끊긴다.** 메모리 다운턴이 메모리 시장 밖에서 시작되는 시나리오.

## 1. 내러티브

2028년 어느 분기, 하이퍼스케일러 한 곳이 CapEx 가이던스를 처음으로 **하향**한다. 수요가 없어서가 아니라 자금 조달 조건이 바뀌어서다. 이미 2026년에 관측된 CapEx-FCF 다이버전스 — 지출은 늘고 잉여현금은 줄어드는 구조 — 가 몇 분기 더 누적되면서, 채권시장이 AI 인프라 익스포저에 프리미엄을 붙이기 시작했다. 결정타는 네오클라우드 또는 DC 개발 SPV 한두 곳의 디폴트다. 담보 자산(GPU·부지)의 시가 평가가 흔들리자 유사 구조 전반의 조달 비용이 동시에 튀어오른다.

그다음은 빠르다. 신규 DC 발주가 동결되고, 착공 예정이던 프로젝트가 "연기"로 재분류된다. 가속기 주문이 줄고, 메모리 발주가 취소되거나 이연 요청으로 들어온다. **현물가가 먼저 무너지고**, 계약가는 버티다가 갱신 시점에 한꺼번에 반영된다. 재고를 쌓아두지 않은 핸드투마우스 상태였기 때문에 반전의 낙차가 크다.

삼성 입장에서 가장 아픈 것은 **가장 많이 투자한 곳이 가장 먼저 비는 것**이다. HBM·서버 DRAM은 수요 자체가 사라지므로 가격을 낮춰도 팔리지 않는다. 반면 모바일·PC용 범용은 상대적으로 덜 흔들린다 — 소비자 수요는 AI 자금 시장과 연결되어 있지 않기 때문이다.

## 2. 방아쇠와 전개

| 단계 | 사건 | 관측 지표 |
|---|---|---|
| T-6개월 | FCF 마이너스가 2분기 연속 지속, 조달 스프레드 확대 | [DX-1](differential-indicators.md) |
| T-3개월 | GPU 현물 임대가 6개월 -35% 돌파 | [DX-2](differential-indicators.md) |
| **T=0** | 하이퍼스케일러 CapEx 가이던스 하향 또는 신용 이벤트 | [DX-1](differential-indicators.md) |
| T+1분기 | DC 착공·가동 취소·연기 급증, 메모리 발주 이연 요청 | [DX-3](differential-indicators.md) |
| T+2분기 | 현물-계약 스프레드 급확대(현물 대폭 하회) | [DX-6](differential-indicators.md) |
| T+3~6분기 | 계약 갱신 시 시장가 반영 → 손익 급락 | — |

## 3. 근거

- **다이버전스 실측**: Meta FCF -91%(→$784M)·Amazon TTM FCF 마이너스 전환(~-$7.6B). 동시에 4사 2026 CapEx 합산 ~$745~750B(+82% YoY)·삭감 0건 ([hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md](../../sources/articles/hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md)). **지출과 현금창출의 방향이 갈라진 상태가 지속 가능한 기간에 상한이 있다.**
- **영업 관점의 동일 진단**: "진짜 꼭짓점은 CapEx가 아니라 FCF" — CapEx는 늘어나는데 FCF가 흑자에서 마이너스로 반전하는 것이 진짜 하락 tell ([lee-changsoo-memory-sales-interview-2026-08-03.md](../../sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md)).
- **HBM 편중 노출**: HBM이 꺼지면 캐파가 stranded되고, HBM↔DDR 캐파 상쇄로 shortage가 oversupply로 반전 ([choi-jangseok-product-planning-interview-2026-07-29.md](../../sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md)).
- **아직 발화 전**: GPU 현물 임대가 firming/flat(H100 ~$2.69·H200 ~$4.38) — 수요 변곡 최선행 지표는 미발동 ([hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md](../../sources/articles/hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md)).

## 4. 제품 축 노출

| 제품 | 노출 | 이유 |
|---|---|---|
| **HBM** | 🔴 직격 | 수요 자체가 소멸. 가격 인하로 회복되지 않음. 고부가 캐파 stranded |
| **서버 DRAM** | 🔴 높음 | DC 발주와 직결 |
| **Enterprise SSD** | 🟠 중간 | DC 수요 연동이나 교체 수요가 일부 방어 |
| **범용 DRAM (모바일·PC)** | 🟡 낮음 | 소비자 수요는 AI 자금시장과 비연동 |
| **UFS** | 🟡 낮음 | 모바일 세트 수요 연동 |

## 5. 배경 조건 (SP-1과의 접점)

SP-1 시나리오 **C(기술 냉전)·D(조용한 재편)**에서 발생 확률이 높다. 단 A·B에서도 조달 충격만으로 발생 가능하다 — AI의 **유용성**이 아니라 **파이낸싱**이 끊기는 시나리오이기 때문이다.

## 6. 전략 대응

### 6.1 이 시나리오가 대비에 요구하는 것

**대응할 시간이 없다는 것이 이 시나리오의 정의다.** T=0부터 손익 급락까지 3~6분기이고, 그 안에 계약을 새로 만들 수도, 옵션형 캐파로 구조를 바꿀 수도, 조직 매뉴얼을 설계할 수도 없다. **결과는 도착 시점에 이미 갖춰져 있던 것으로 거의 결정된다.**

| 대비 전략 | 이 시나리오에서의 값 |
|---|---|
| [DP-1 계약 만기 사다리화](preparation.md) | **◎** 만기가 분산되어 있으면 재가격이 한꺼번에 오지 않는다 — 급락을 침식으로 변환 |
| [DP-2 옵션형 캐파](preparation.md) | **◎** 미반입 장비 동결로 손실 최소화. 확정 발주분은 그대로 비용 |
| [DP-4 감별 EWI 배선](preparation.md) | **◎** T-6개월 선행 신호가 존재하는 유일한 시나리오 — 배선만 되어 있으면 잡힌다 |
| [DP-6 전환 가능한 몸](preparation.md) | **◎** stranded된 HBM·서버 캐파를 다른 제품으로 돌리는 것이 유일한 회수 경로 |
| [DP-7 조직 매뉴얼](preparation.md) | **◎** 재편 명분이 최대인 국면 — 2009년형 재편(◎ 판정)의 조건과 동일 |
| [DP-3 원가 곡선 측정](preparation.md) | △ 원가 우위가 있어도 수요가 없으면 팔 곳이 없다 |
| [DP-5 차세대 별동대](preparation.md) | **◎** 회복기 배분을 결정. R&D 삭감 압력이 최대인 국면이라 하한 규칙이 필수 |

### 6.2 대응 우선순위 (도착 후)

1. **[DR-2 공급 규율은 발동하지 않는다](response-playbook.md)** — 수요발이므로 감산해도 가격이 돌아오지 않는다. **2023년이 이미 실증했다**: 3강 과점에서 소모전 교범은 불발했고, DS -4.58조 사상 최대 적자 끝에 자진 철회했다 ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)). 대신 **캐파 전환**([DR-5](response-playbook.md))으로 간다.
2. **[DR-3 계약 방어](response-playbook.md)** — 파기 요구에 "가격 인하"가 아니라 **"물량 이연·기간 연장"**으로 응수. 단가를 깎으면 회복기에도 그 단가로 시작한다.
3. **[DR-4 역사이클 자산 취득](response-playbook.md)** — 매수 창이 **가장 크게 열리는 시나리오**. 대상은 캐파가 아니라 기술 자산·인재·IP. 2008 SanDisk 즉흥 시도·철회, 2012 엘피다 불참의 반복을 막으려면 트리거·프리미엄·PMI 각본이 **미리** 있어야 한다.
4. **[DR-6 조직 재편](response-playbook.md)** — 명분이 최대인 지금 실행. 2009년 재편은 ◎, 2022~23 무대응은 △였다.

### 6.3 이 시나리오에서 가장 흔한 실수

| 실수 | 왜 발생하는가 | 차단 |
|---|---|---|
| **수요발을 공급발로 오독하고 감산** | 가격이 떨어지면 반사적으로 공급 문제로 해석 | [DR-1 감별 프로토콜](response-playbook.md) — 30일 내 원인 확정 전에는 대칭적 액션만 |
| **계약 단가 인하로 물량 사수** | 영업 KPI가 분기 물량이면 필연 | 물량 이연 우선 원칙을 계약 정책에 사전 명시 |
| **저가 매물 앞 관망** | "지금은 현금을 지킬 때" | EV/EBITDA 트리거 + 프리미엄 사전 적립 (D9) |
| **R&D "일시 조정"** | 적자 국면의 가장 자연스러운 절감 대상 | 2023년 선례(적자에도 R&D 28.34조 사상 최대)를 규범으로 제도화 |
