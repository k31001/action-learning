---
type: concept
last_reviewed: 2026-09-23
sources: [sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md, sources/articles/qlc-essd-market-size-forecast-data-2026-09.md]
---

# eSSD 구매 기준은 교체되는 것이 아니라 더해진다

> **2026-09-23 표기 규율 (중요).** 이 페이지는 처음 "성능 → QoS → 밀도·전력"이라는 **세 국면의 시대 구분**으로 썼다. 그렇게 제시하면 시장 전체의 객관적 시대 구분처럼 읽혀 **반론의 여지가 크다**. 공개 자료로 확인되는 것은 시대 구분이 아니라 **요구사항의 누적**이다. 아래 연도는 **각 요구가 조달 문서에 제도화된 시점**일 뿐, 그 시기의 유일한 기준이었다는 뜻이 아니다. 제목과 §1을 그에 맞게 고쳤다.

"성능 → QoS → 내구성"이라는 통념을 공개 자료로 검증한 결과, **요구는 교체되지 않고 누적된다**. 내구성도 전체 시장에서 상위 기준이 된 것이 아니라 **양극화**했고, 구속 조건이 된 곳은 추론 캐시 계층 하나다 ([qlc-v6-purchase-criteria-dwpd-history-2026-09.md](../../sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md)).

## 1. 요구는 누적된다

| 요구 | 제도화된 시점의 근거 | 지금 |
|---|---|---|
| 성능 · 용량당 가격 (IOPS·대역폭) | Fusion-io ioDrive의 IOPS 마케팅. 단, 내구성은 이때 이미 **자격 요건**이었다 — JEDEC JESD218·JESD219가 **2010-09** 발행 | **여전히 요구** |
| **QoS · 지연 꼬리** | Intel DC S3700(2012-11)이 "4KB 랜덤 지연 99.9%에서 500µs 미만"을 스펙 전면에 배치 → NVMe IO Determinism·PLM(2019) → **OCP Datacenter NVMe SSD 사양 v2.0(2021-07)이 Latency Monitor를 의무화** → Micron 7450 "99.9999% QoS ≤ 2ms"(2022) | **기본 요건으로 굳음** |
| **용량 밀도 · 전력 효율 · 공급 확보** | 하이퍼스케일러(eSSD 물량 약 55% 소비)의 우선순위는 TB/슬롯·TB/W·물량 확보(LTA·allocation) | **상위 요구** |
| **내구성** (추론 캐시 계층 한정) | Kioxia가 KV 캐시 지원 제품으로 CM9 TLC 3 DWPD를 지목 · NVIDIA CMX 스택이 내구성 부족을 이유로 컨슈머 드라이브 배제 | **지금 더해지는 중** |

**증거는 OCP 사양의 개정 이력 자체다**: v2.5~v2.7은 QoS 항목을 **빼지 않고** 텔레메트리·FDP·전력 측정을 **추가**했다. 요구가 교체됐다면 빠진 항목이 있어야 하는데 없다.

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

- 덱: `outputs/presentation/qlc-ssd-strategy.pptx` **1장 ②구획**(v7.3 — 「기존 요구(용량당 비용·밀도·전력) + 추가(내구성)」 도식으로 표현. 세 시대 박스는 폐기)
- 교훈: [hbm3-designin-lesson.md](hbm3-designin-lesson.md) — 이 구매 기준 이동이 "다음 수요"의 내용이다
- 그 수요가 내려온 경로: [hbm-to-storage-spillover.md](hbm-to-storage-spillover.md) — HBM → DRAM → NVMe SSD 스필오버
- 시장 페이지: [qlc-ssd-market.md](qlc-ssd-market.md) §3.3
- 내구성 축의 산식: [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
