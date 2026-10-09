---
type: strategy
last_reviewed: 2026-10-09
sources:
  - sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md
  - sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md
  - sources/articles/qlc-essd-market-size-forecast-data-2026-09.md
  - sources/articles/essd-outlook-research-firms-2026-10.md
---

# 검토: "WAF 최적화 QLC로 TLC 일부 대체" 전략으로 전환할 것인가 (2026-10-09 질의)

> 사용자 질의(2026-10-09): 외부에서 받은 제안서 "메모리 반도체 기업의 수익성 개선을 위한 최적 전략"(결론: 기존 TLC eSSD 시장 일부를 WAF 최적화 QLC로 대체하고, 고객 TCO 절감을 근거로 QLC의 가격과 수익성을 높인다)으로 방향을 전환하는 것을 어떻게 보는가. 제안서 본문은 사용자가 붙여 넣은 텍스트이며 `sources/`에 보관하지 않았다.

**판단(⚠️ 과제팀 해석, §4.5에서 수정)**: 전면 전환보다 **현 전략(고객 협력 · FDP 공동 설계)의 첫 실행 과제로 흡수**하는 것이 맞다. 제안의 수익성 프레임과 KPI("NAND 생산자원당 공헌이익")는 채택할 가치가 있지만, 몇 가지 기술 · 경제 전제는 고쳐야 한다.

## 1. 맞는 점

| 제안 | 위키 근거 |
|---|---|
| 1순위 공략 대상 = TLC를 쓰지만 실제 쓰기는 낮은 고객 | 범용 플릿 소비 DWPD는 Microsoft 0.07~0.23, NetApp 중앙값 0.36으로, 1 DWPD TLC를 쓰지만 QLC 정격(0.3~0.6) 안에 드는 경우가 많다([datacenter-types-storage-requirements.md](../concepts/datacenter-types-storage-requirements.md), [원장](../../sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md) CQ-28) |
| 이미 시장에서 검증 중인 방향 | 삼성 1Q26 · 2Q26 eSSD 성장은 176단 QLC 출하 확대가 이끌었고, 2H26 QLC 비트를 1H26의 2배 이상 출하할 계획이다([qlc-ssd-market.md](../concepts/qlc-ssd-market.md) §3, [원장](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §1.2). Alibaba는 QLC 로컬 디스크(CSAL)로 VM 밀도를 2배로 올렸다(CQ-28) |
| 단기에는 공급 배분 · 믹스가 기술 차별화보다 크다 | 2026 eSSD 비트 +80%+, 부족 완화는 2H27 이후([essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md) §0, §2.5) |
| KPI는 TB당이 아니라 생산자원당 공헌이익 | 공급 제약기에는 웨이퍼가 병목이므로 맞다. 현 덱 §4.6 성과 지표에 없는 관점이다 |
| WAF 수치 자체로 프리미엄을 받으려 하지 말 것 | CSP는 TB당 TCO로 산다([qlc-ssd-market.md](../concepts/qlc-ssd-market.md) "고객이 사는 것은 용량 계층의 TB당 TCO") |

## 2. 고쳐야 할 전제

1. **"3 DWPD TLC를 QLC로"는 물리적으로 불가능하다.** DWPD = P/E × (1 + OP) ÷ (일수 × WAF)([solution-ladder-component-to-system.md](../concepts/solution-ladder-component-to-system.md) F29). QLC P/E 약 1,000, 원시 8TB · 사용자 7.68TB, 5년 보증이면 WAF 2에서 약 0.29, **WAF 1까지 내려도 약 0.57 DWPD**다([high-dwpd-operating-point.md](../concepts/high-dwpd-operating-point.md) 검산, ⚠️ 과제팀 산술). 3 DWPD를 맞추려면 WAF 약 0.19가 필요해 압축 없이는 닿지 않는다. 대상은 **1 DWPD 범용(읽기 위주) TLC**로 좁혀야 한다.
2. **WAF 최적화의 역할은 내구성보다 QoS다.** 위 대상 고객은 쓰기가 0.07~0.36 DWPD라 QLC 정격으로도 수명이 대체로 닿는다. 전환을 막는 것은 꼬리 지연이다: 이웃 테넌트 쓰기로 WAF 1.28 → 약 3.0(WARP FAST'26), 로컬 디스크 p99.9 > 1ms가 GC 탓(Alibaba FAST'26)([datacenter-types-storage-requirements.md](../concepts/datacenter-types-storage-requirements.md)). Meta의 QLC 요구도 내구가 아니라 대역(R+4W ≥ 32MB/s/TB)이다. 가치 제안은 "WAF를 낮춰 GC 간섭을 줄이고, TLC 수준의 QoS를 QLC 원가로"가 된다.
3. **원가 우위는 세대가 같을 때만 확실하다.** 셀당 비트 4/3이면 같은 세대에서 비트당 NAND 원가는 이론상 약 -25%다. 제안서 가상표의 NAND 원가 -29%(1,900 → 1,350달러)는 QLC의 ECC 패리티 · OP 부담을 빼기 전에 이미 이론치를 넘는다. 세대가 다르면 단순 층 × 비트로 176단 QLC 704 대 286단 TLC 858이라 QLC가 오히려 불리할 수 있다(⚠️ 다이 면적 · 셀 피치 무시한 산술). 판단은 [사내 확인] 원가로만 해야 한다.
4. **SSD 혼자 최적화의 효과는 작다.** 제안의 2027년 1단계는 "호스트 변경 없이 WAF 20% 감소"다. 위키 근거는 SSD 단독 최적화가 WAF ≈ 3에서 멈췄고, 3.22 → 1.03은 호스트(CacheLib FDP)가 수명을 알려 줄 때 났다는 것이다([essd-decade-growth-vs-dwpd.md](../concepts/essd-decade-growth-vs-dwpd.md), [fdp-host-ssd-platform.md](fdp-host-ssd-platform.md)). 1단계부터 고객 호스트 공동 검증을 넣어야 일정이 맞는다.
5. **지금은 QLC가 싸지 않다.** 2026-08 대용량 QLC 약 $590/TB로 하이퍼스케일러 구매가 막히고, 부족기 QLC는 KV 캐시 명목 주문에 먼저 배분된다([essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md) §2.5 · §2.6). TLC → QLC 전환을 설득할 시점은 공급이 풀리는 2028년 전후다. 제안서도 이 점을 인정한다.
6. **"200EB 잠재 수요"는 근거를 다시 대야 한다.** 위키의 약 200EB는 VAST가 말한 HDD 공급 부족분이며, TLC → QLC 전환 가능 용량이 아니다([essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md) §2 NA-22).

## 3. 현 전략과의 관계

| 축 | 현 덱(불확실성 대응 고객 협력 전략) | 제안서 |
|---|---|---|
| 질문 | 어떤 수요가 오든 대응할 핵심 기술과 조직 | 어떤 제품 믹스가 이익을 키우나 |
| 수요 가정 | 하나로 정하지 않음(HBM 교훈), SLC부터 QLC까지 포트폴리오 | TLC 일부 → QLC 대체 하나에 집중 |
| 차별화 원천 | FDP 공동 설계 · 고객 상주 조직 | WAF 최적화 + 고객 검증 경험 |
| KPI | WAF · 꼬리 지연 · 토큰당 비용 · GPU 가동률 | 생산자원당 공헌이익 · 매출총이익률 · QLC 전환율 |

제안서의 해자("특정 CSP 워크로드에 맞춘 SSD · FW · Host SW 최적화와 누적된 고객 검증 경험")는 현 덱 2 · 4장이 말하는 것과 같다. 차이는 **어디에 먼저 쓰느냐**다. 현 덱은 KV 캐시(추론)를 앞에 두었고, 제안서는 범용 클라우드의 TLC 대체를 앞에 둔다. 둘 다 같은 FDP 역량을 쓴다.

## 4. 권고

1. 전면 전환이 아니라 **두 번째 공략 대상으로 병행**한다: KV 캐시(추론, 고DWPD 쪽)와 범용 TLC 대체(QLC, QoS 쪽)를 같은 FDP 공동 설계 조직이 맡는다. 시나리오상 AI 조정기(C · D)에서는 범용 TLC 대체 쪽이, AI 르네상스(B)에서는 KV 쪽이 더 크다([qlc-ssd-market.md](../concepts/qlc-ssd-market.md) 시나리오 연결).
2. 대상 정의를 "1 DWPD 범용 TLC 중 실제 0.3 DWPD 이하, 꼬리 지연이 전환을 막는 고객"으로 고친다.
3. KPI에 "NAND 생산자원당 공헌이익"을 더한다(현 덱 §4.6 보완).
4. 판단에 필요한 세 데이터는 제안서와 같다: 전환 가능 용량, 전환 후 TB당 공헌이익, 같은 팹 자원당 총이익. 모두 [사내 확인]이다.

## 4.5 사용자 판단과 수정 권고 (2026-10-09 후속)

> 사용자 의견(2026-10-09): "WAF를 줄이는 기술로 고내구성 시장을 들어간다는 로직보다는 기존 TLC 시장을 QLC로 원가 경쟁력 높게 들어가는 것이 기업 수익성 강화 차원에서 더 말이 되는 전략이라 생각해. 실제 고내구성 SSD 시장 규모도 크지 않고 AI 추론 수요 중 일부에 해당하기 때문에 니치 마켓으로 보는 시각도 있거든."

**규모 근거는 사용자 판단을 지지한다**

| 근거 | 값 | 출처 |
|---|---|---|
| 정격 10 DWPD 이상 등급 비중 | 2008~12 67% → 2022~26 **0%** | [essd-decade-growth-vs-dwpd.md](../concepts/essd-decade-growth-vs-dwpd.md) §1.5 |
| 실사용 3 DWPD 초과 드라이브 | NetApp 설치 기반 약 200만 대 중 **7% 이상**, 중앙값 0.36 | [원장](../../sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md) CU-15 |
| CMX(KV 캐시 계층) 지명 드라이브 | 전부 TLC 1 · 3 DWPD | [qlc-ssd-market.md](../concepts/qlc-ssd-market.md) §3 |
| KV 캐시 실측 | 3.2 DWPD(StorageReview) 대 읽기 92% · 쓰기 8%(LMCache-on-NVMe) | [datacenter-types-storage-requirements.md](../concepts/datacenter-types-storage-requirements.md) |
| QLC 비중 | eSSD 용량 중 18% → 38%(2027), 증분 NAND 수요의 최대 몫 | [essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md) §0 (TrendForce) |

**수정 권고(⚠️ 과제팀 해석)**
1. **주력(Main Bet)을 "TLC 시장을 QLC 원가 경쟁력으로 대체"로 둔다.** 이익 풀은 1 DWPD 범용 TLC에 있고, 고내구(3 DWPD 이상)는 AI 추론 KV 캐시의 쓰기 많은 일부다.
2. **WAF · FDP 기술은 버리지 않고 역할을 바꾼다.** 고내구 진입 수단이 아니라, QLC가 TLC 자리를 받을 때 걸리는 QoS(GC 간섭 · 꼬리 지연)와 성능을 메우는 수단이다. 원가만으로는 Solidigm · SanDisk · Kioxia · Micron과의 커머디티 경쟁이라 가격 방어가 어렵고, 고객 워크로드에 맞춘 QoS 검증이 차별화 몫이다.
3. **원가 경쟁력의 조건은 최신 세대 QLC다.** 같은 세대에서만 비트당 약 -25%가 나온다(§2-3). 고용량(122 · 245TB급) · 전력도 같은 축이다.
4. **고내구는 작은 옵션(Side Bet)으로 남긴다.** 2019년 삼성이 HBM을 니치로 판단해 팀을 축소한 사례([원장](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md))가 덱 1장의 교훈이다. 규모가 작다는 판단은 맞지만, 신호(KV 실측 DWPD, CMX 채택)를 보며 키울 수 있는 최소 역량은 유지한다.
5. **시점**: 공급 부족기(~2027)에는 QLC가 비싸 전환 설득이 어렵고, 공급이 풀리는 2028년 전후가 본격 전환 구간이다. 그 전까지는 고객 공동 검증으로 자리를 만든다.

**덱 영향**: 현 덱 3장은 "SSD 혼자서는 DWPD를 못 올린다 → 공동 설계" 즉 내구성 중심 논증이다. 주력을 바꾸면 3장 논증은 "QLC가 TLC 자리를 받으려면 QoS를 고객과 함께 맞춰야 한다"로 바뀌어야 하며, 1장 결론(SLC~QLC 포트폴리오)과 2장 FDP 위치도 함께 조정이 필요하다(미반영, 사용자 결정 대기).

## 5. 연결

- 후속 전략 · 새 덱 아웃라인(2026-10-09): [qlc-tlc-market-entry.md](qlc-tlc-market-entry.md)

- QLC 시장 · 수요 모델: [qlc-ssd-market.md](../concepts/qlc-ssd-market.md)
- QLC 실행 전략(이전 판): [qlc-execution-strategy.md](qlc-execution-strategy.md)
- FDP 플랫폼: [fdp-host-ssd-platform.md](fdp-host-ssd-platform.md)
- 범용 클라우드 요구: [datacenter-types-storage-requirements.md](../concepts/datacenter-types-storage-requirements.md)
- 고DWPD 운영점 · DWPD 산식 검산: [high-dwpd-operating-point.md](../concepts/high-dwpd-operating-point.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
