---
type: concept
last_reviewed: 2026-09-22
sources: [sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md, sources/articles/qlc-essd-market-size-forecast-data-2026-09.md]
---

# eSSD 구매 기준의 이동 — 성능에서 QoS로, 그리고 밀도·전력·공급으로

"성능 → QoS → 내구성"이라는 통념을 공개 자료로 검증한 결과, **앞의 두 단계는 성립하고 세 번째는 그대로는 성립하지 않는다**. 내구성은 전체 시장에서 상위 기준이 된 것이 아니라 **양극화**했고, 구속 조건이 된 곳은 추론 캐시 계층 하나다 ([qlc-v6-purchase-criteria-dwpd-history-2026-09.md](../../sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md)).

## 1. 세 국면

| 국면 | 차별화 축 | 확인된 근거 |
|---|---|---|
| **2008~2012** | 성능 · 용량당 가격 (IOPS·대역폭) | Fusion-io ioDrive의 IOPS 마케팅. 단, 내구성은 이때 이미 **자격 요건**이었다 — JEDEC JESD218·JESD219가 **2010-09** 발행 |
| **2012~2021** | **QoS · 지연 꼬리** | Intel DC S3700(2012-11)이 "4KB 랜덤 지연 99.9%에서 500µs 미만"을 스펙 전면에 배치 → NVMe IO Determinism·PLM(2019) → **OCP Datacenter NVMe SSD 사양 v2.0(2021-07)이 Latency Monitor를 의무화** → Micron 7450 "99.9999% QoS ≤ 2ms"(2022) |
| **2022~2026** | **용량 밀도 · 전력 효율 · 공급 확보** | 하이퍼스케일러(eSSD 물량 약 55% 소비)의 우선순위는 TB/슬롯·TB/W·물량 확보(LTA·allocation). OCP 사양 v2.5~v2.7은 QoS를 빼지 않고 텔레메트리·FDP·전력 측정을 더했다 |

**QoS는 밀려난 것이 아니라 기본 요건으로 굳었다.** 이것이 "축이 이동한다"는 통념의 가장 큰 오해다.

## 2. 내구성은 하나의 축에서 둘로 갈라졌다

같은 2026년에 **0.3 DWPD / 245TB QLC**(Micron 6600 ION)와 **60 DWPD / 6.4TB SLC**(Phison Pascari X202Z)가 나란히 팔린다. 주류 조달의 DWPD 정격은 오히려 **내려가는** 중이고(추론 서빙은 읽기 80% 이상), 업계 가이드의 컨센서스는 "최고 DWPD를 사지 말고 워크로드에 맞춰라"다.

## 3. 정격 DWPD가 57배 내려가는 동안 허용 기입량은 67배 올랐다

DWPD는 **용량으로 나눈 지표**다. 단독으로 읽으면 "내구성 요구가 낮아졌다"는 잘못된 결론이 나온다.

| 제품 | 연도 | 정격 DWPD | 드라이브당 허용 기입량 |
|---|---|---|---|
| X25-E 64GB | 2008 | 17.1 | 1.1 TB/day |
| DC S3700 800GB | 2012 | 10 | 8.0 TB/day |
| DC P3700 2TB | 2014 | 17 | 34 TB/day |
| PM1643 30.72TB | 2018 | 1.0 | 30.7 TB/day |
| D5-P5336 122.88TB | 2024 | 0.6 | 73.7 TB/day |
| LC9 245.76TB | 2025 | 0.3 | 73.7 TB/day |

**DWPD 57배 하락 · 절대 기입량 67배 상승.** 분자가 준 것이 아니라 분모가 커진 것이다.

## 4. 추론 캐시 계층에서만 내구성이 다시 구속 조건이다

- Kioxia는 GTC 2026(2026-03-16)에서 KV 캐시 지원 제품으로 **CM9 TLC 3 DWPD**를 지목했다. QLC가 아니다.
- Kioxia Investor Day(2026-06-02): 데이터센터 내 **추론 수요 CAGR 86%** vs 학습 16%.
- 이 계층의 요구는 **1~3 DWPD**이고 현 QLC 정격 0.6과는 **2~5배** 차이다.

## 5. SSD가 맞춰야 할 구매 기준 — 구체 지표

덱과 보고서에서 "구매 기준"을 말할 때는 아래 항목으로 쓴다. 추상어(토큰 경제성 등) 대신 조달 문서에 실제로 실리는 항목이다.

| 구분 | 지표 |
|---|---|
| 밀도 | 슬롯당 TB, 랙당 PB |
| 전력 | TB당 와트, 와트당 IOPS, 유휴 전력 |
| 지연 | 99.99 / 99.9999% 읽기 지연, Latency Monitor 준수(OCP) |
| 내구성 | DWPD·TBW, 워크로드 조건(JESD219) |
| 가격 | $/TB, 5년 TCO |
| 공급 | 물량 보장(LTA·allocation), 리드타임 |
| 기능 | 배치 힌트(FDP) 지원 개수와 공개 여부, 텔레메트리(OCP SMART C0), 보안·관리 |

## 6. 연결

- 덱: `outputs/presentation/qlc-ssd-strategy.pptx` **1장** 가운데 구획 ②(v7.0 — 세 시대 박스 + KV 캐시 카드, 이어서 ③에서 TLC는 만족하나 고객은 QLC를 원한다는 문제 제기)
- 교훈: [codesign-demand-lesson.md](codesign-demand-lesson.md) — 이 구매 기준 이동이 "다음 수요"의 내용이다
- 시장 페이지: [qlc-ssd-market.md](qlc-ssd-market.md) §3.3
- 내구성 축의 산식: [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
