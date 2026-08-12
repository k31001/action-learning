---
type: concept
last_reviewed: 2026-08-12
sources: [sources/articles/memory-product-mix-history-2026-08.md, sources/articles/fab-toolset-commonality-conversion-2026-08.md]
---

# 제품 믹스 비동기성 — 사이클은 제품마다 따로 온다

메모리 사업의 제품 포트폴리오(HBM·범용 DRAM·NAND)가 **같은 시점에 서로 다른 방향으로 움직인다**는 관측과, 그 결과 매출 믹스가 몇 년 만에 뒤집힌다는 사실을 정리한다. 「전환할 수 있는 몸」 제안([mfg-fungibility-proposal](../../outputs/storyline/mfg-fungibility-proposal.md))의 당위성 근거이자, 공통 개요편이 지목한 네 번째 게임 룰 중 "단일 → 비동기 사이클"의 실측 뒷받침이다.

## 1. 비동기성의 직접 실측

단일 사이클 시대라면 모든 제품군이 같은 방향으로 움직여야 한다. 최근 데이터는 그렇지 않다 ([memory-product-mix-history-2026-08.md](../../sources/articles/memory-product-mix-history-2026-08.md)).

| 시점 | DRAM | NAND | 판정 |
|---|---|---|---|
| **2025년 (연간)** | **+73%** ($907억 → $1,657억) | **+3.4%** ($674억 → $697억) | 같은 해, 한쪽은 거의 두 배 다른 쪽은 정체 |
| **2024년 4분기 (분기)** | **+9.9% QoQ** | **−6.2% QoQ** (이듬해 1분기 추가 −20% 전망) | 같은 분기, **반대 방향** |
| 2023년 | 모듈 매출 −28%, 하반기부터 반등 | 소비자 재고 소진이 2024년 말까지 지속 | 하강 지속기간이 다름 |
| 2027년 (전망) | AI 서버 풀인이 공급 갭 확대 | 소비자 약세 + 비트 산출 증가로 가격 하방 | 수급이 갈라질 것으로 전망 |

2024년 4분기가 가장 선명하다. 한 분기 안에서 DRAM은 오르고 NAND는 내렸다. 사이클이 하나였다면 불가능한 관측이다.

## 2. 믹스는 3년 만에 뒤집혔다

전체 메모리 매출(DRAM + NAND)을 100으로 두고 제품군 비중을 계산하면 다음과 같다. HBM은 DRAM 매출 내 HBM 비중(2023년 8% → 2024년 20% → 2026년 41%)을 적용해 분리했다 ([memory-product-mix-history-2026-08.md](../../sources/articles/memory-product-mix-history-2026-08.md), [hbm-market.md](hbm-market.md)).

| 연도 | HBM | 범용 DRAM | NAND | 합계 (매출) |
|---|---|---|---|---|
| 2023 | $41억 · **4.6%** | $477억 · 53.1% | $381억 · **42.4%** | $899억 |
| 2024 | $181억 · 11.5% | $726억 · 45.9% | $674억 · 42.6% | $1,581억 |
| 2025 | $340억 · 14.4% | $1,317억 · 55.9% | $697억 · 29.6% | $2,354억 |
| 2026E | $1,658억 · **30.1%** | $2,385억 · 43.2% | $1,473억 · **26.7%** | $5,516억 |

3년 사이 **HBM 비중은 4.6% → 30.1%로 6.5배, NAND 비중은 42.4% → 26.7%로 거의 반토막**이 됐다. 범용 DRAM 비중조차 53% → 46% → 56% → 43%로 오르내린다. 어떤 제품군도 안정된 지분을 갖지 못한다.

*주 — 2023년 DRAM·NAND 절대액은 이듬해 매출과 YoY에서 역산한 값이고, 2026E는 TrendForce 2026-01 전망치다. 비중은 매출 기준이며 비트 기준과 다르다 — 2024년 HBM은 매출의 20%였으나 비트로는 5%였다.*

## 3. 다음 다운턴의 세 시나리오 — 믹스는 서로 반대로 갈라진다

다음 다운턴(2028~29 창)의 원인 경로는 셋이고, 각각이 만들어 내는 믹스는 서로 다른 방향이다. 원인 분류는 [storyline-cmo.md](../storyline/storyline-cmo.md) §CMO-4의 3경로를, 시나리오 확률은 [scenario-matrix.md](../scenarios/scenario-matrix.md)를 따른다.

| 2029년 시나리오 | 원인 | HBM | 범용 DRAM | NAND | 차세대 | 위키 시나리오 대응 |
|---|---|---|---|---|---|---|
| **① 수요발** | AI 투자수익률(CAPEX/ROI) 재평가 | 15% | 50% | 35% | — | C·D (합산 약 29%) |
| **② 공급발** | 2028~29 신규 캐파 동시 도래 + CXMT | 38% | 34% | 28% | — | A·B 내 사이클 조정 |
| **③ 전환발** | 3D DRAM·CXL·zHBM 채택 개시 | 20% | 33% | 27% | 20% | E (5~10%) |

**이 표의 수치는 방향성 대비를 위한 예시 가정이며 예측이 아니다.** 확정된 것은 하나뿐이다 — 세 경로가 만드는 믹스가 서로 반대라는 것. ①이 오면 HBM 캐파가 남고, ②가 오면 범용 캐파가 남고, ③이 오면 둘 다 남으면서 차세대 캐파가 모자란다.

## 4. 전략적 함의

방향을 미리 고를 수 없다는 것이 핵심이다. 셋 중 하나를 골라 캐파를 배분하면 나머지 둘에서 틀린다. 그리고 전환에는 시간이 든다 — 제품 믹스 전환 실행에 약 6개월, 신호 감지와 의사결정을 앞에 붙이면 9~12개월이다 ([fab-toolset-commonality-conversion-2026-08.md](../../sources/articles/fab-toolset-commonality-conversion-2026-08.md)). 그사이 다운사이클 판가는 분기마다 15%씩 빠진다.

그래서 답은 방향의 선택이 아니라 **전환 속도의 확보**다. 어느 시나리오가 오더라도 6개월이 아니라 3개월에 믹스를 옮길 수 있는 몸을 미리 설계해 두는 것 — 「전환할 수 있는 몸」 제안의 세 축(세대 연장성·제품 간 동일성·N-1 설계)이 그 방법이다 ([mfg-fungibility-proposal.md](../../outputs/storyline/mfg-fungibility-proposal.md)).

낸드에 특히 급한 이유도 여기서 나온다. DRAM에는 HBM이 캐파의 30~40%를 깔고 앉아 완충재 역할을 하지만 낸드에는 그런 것이 없고, 5강 분산 구조라 공급 규율도 약하다 ([common-overview.md](../../outputs/storyline/common-overview.md)). 완충재가 없으면 설비 공통성이 인공 완충재가 되어야 한다.

## 관련 페이지

- [hbm-market.md](hbm-market.md) — HBM 시장 규모·DRAM 대비 비중 전망
- [price-trends.md](price-trends.md) — 제품 카테고리별 분기 계약가 변동
- [memory-market-overview.md](memory-market-overview.md) — DRAM/NAND 세그먼트 매출
- [semiconductor-cycle.md](semiconductor-cycle.md) — 사이클 구조와 2028 공급과잉 리스크
- [nand-process-transition.md](nand-process-transition.md) — 낸드 공정 전환·하이브리드 본딩
- [storyline-cmo.md](../storyline/storyline-cmo.md) — CMO-4 다음 다운턴 3경로
