---
type: strategy
last_reviewed: 2026-10-09
sources:
  - sources/articles/tlc-to-qlc-addressable-market-2026-10.md
  - sources/articles/qlc-waf-qos-op-factcheck-2026-10.md
  - sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md
  - sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md
  - sources/articles/essd-rated-dwpd-products-2008-2026-2026-10.md
---

# QLC로 TLC 시장에 들어가는 고객 협력 전략 (2026-10-09)

> 사용자 지시(2026-10-09): HBM 실기의 교훈(고객 수요를 읽어야 한다)과 신문섭 파트너의 조언(고객과 함께 수요를 만드는 기업)에서 출발해, 고객은 더 많은 데이터를 더 낮은 TCO로 저장하길 원하지만 정격 DWPD는 계속 내려왔고, WAF는 고객 시스템과 협력해야 낮아진다. 현재 eSSD는 범용 TLC와 1 DWPD 수준의 AI 스토리지가 대부분이므로, 고객 협업으로 QLC의 WAF를 1에 가깝게 낮추고 GC를 줄여 꼬리 지연을 낮추면 TLC 수요의 상당 부분에 QLC로 들어갈 수 있다(원가 절감 → 수익성). 같은 기술은 TLC의 OP를 줄이고 초고DWPD 진입의 기반이 된다. 고객 협력 실행 전략은 기존과 같다. 새 덱 아웃라인: [qlc-tlc-market-entry-outline.md](../../outputs/presentation/qlc-tlc-market-entry-outline.md).

**한 줄 요약**: eSSD의 75~91%(대수, 재인용)가 1 DWPD 이하이고, 범용 플릿 실사용은 0.07~0.36 DWPD다. QLC는 WAF 1이면 약 0.59~0.70 DWPD까지 닿아 내구 요건은 대부분 넘는다. 남은 문은 성능 · 꼬리 지연과 원가이며, 이 문을 고객과 함께 여는 것이 전략의 핵심이다. 전환 가능 시장은 2030년 약 120~800EB(⚠️ 산술, 전환율 가정에 민감)다.

⚠️ **등급**: 두 새 원장은 원문 도메인이 프록시로 막혀 대부분 🟡(검색 · 2차)이며, SSD-iq 저자 데이터와 CacheLib 문서만 ✅이다.

## 1. 출발점: 교훈과 고객 니즈

| 주장 | 근거 | 출처 |
|---|---|---|
| 하나의 수요를 늦게 읽으면 첫 호황을 놓친다 | HBM 점유율 삼성 40 → 17%, SK hynix 50 → 62%(2022 → 2Q25) · 2019년 HBM을 니치로 보고 팀 축소 | [hbm-market.md](../concepts/hbm-market.md), [qlc-tlc-substitution-review.md](qlc-tlc-substitution-review.md) §4.5 |
| 고객과 함께 수요를 설계하는 기업이 승부를 가져간다 | 신문섭 파트너 원문: "앞으로의 승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져갈 것이다" | [인터뷰](../../sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md) §16 |
| 다운턴 생존과의 연결(⚠️ 원문에 "다운턴" 표현 없음, 사례로 받침) | 2023 다운턴에 낙폭이 가장 깊었던 Solidigm이 61TB QLC를 삼성보다 12개월 먼저 내 2024 eSSD 급증의 최대 수혜로 흑자 전환 | [fdp-host-ssd-platform.md](fdp-host-ssd-platform.md) §2.5 |
| 고객은 더 많이, 더 낮은 TCO로 | PCIe eSSD 509EB(2026) → 1,933EB(2030, SK hynix TQ-01), McKinsey 181 → 1,078EB, Azure 스토리지가 범용 클라우드 운영 배출의 33% | [원장](../../sources/articles/tlc-to-qlc-addressable-market-2026-10.md) TQ-01, [essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md), Azure [원장](../../sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md) A17 |

## 2. 문제: DWPD는 내려왔고 WAF는 SSD 혼자 낮추지 못했다

- 정격 DWPD 전체 중앙값 9.6 → 2 → 1(2008~14 → 2015~18 → 2019~26), 2019년 이후 1에서 평탄([essd-decade-growth-vs-dwpd.md](../concepts/essd-decade-growth-vs-dwpd.md) §1.5, WQ-02).
- 주원인은 셀 P/E 감소(SLC 3만~10만 → QLC 약 100~1,000, WQ-01). **사용자 문구 수정**: "셀 진화로 WAF를 줄이는 데 한계"보다 "P/E는 100배 줄었는데 WAF는 그대로였고, QLC는 매핑 단위(IU) 증폭까지 더해졌다"가 정확하다. 고밀도 QLC IU는 4 → 16 · 64KB, 4KB 랜덤 정격이 16KB 정격의 1/4(6600 ION · 6550 ION · LC9 모두 4.0배, P-4). 반대 근거: Micron은 실제 앱에서 IU 추가 증폭 5% 미만(WQ-10).
- SSD 단독 WAF(4KB 랜덤 100% 채움 실측) 1.89~4.40(WQ-23, ✅ 저자 데이터). 디바이스 GC 개선은 편중 워크로드에서만 효과(5.90 → 2.06, WQ-25).

## 3. 해법: 고객 시스템과 함께 설계해야 WAF가 1에 닿는다

| 근거 | 값 | ID |
|---|---|---|
| CacheLib FDP(호스트 협력) | WAF 3.22 → 1.03, 호스트 OP 50% → 0%(캐시 용량 약 2배) | WQ-17 · WQ-46 · P-10 |
| Samsung PM9D3a FDP 최적화 분류(TLC) | WAF -30%, p99.9 테일 지연 -55% | WQ-28 |
| ZNS(TLC) | RocksDB p99.9 읽기 지연 2~4배 낮음 | WQ-27 |
| Valet 동적 배치 힌트 | 테일 지연 최대 6배 감소 | WQ-30 |
| 반대 근거 | FDP는 best-effort라 적대적 워크로드에서 4.49× 악화, GC가 테일 지연의 주원인이 아니라는 연구 | WQ-18 · WQ-33 |

판정(C2 · C3 부분 지지): WAF 약 1은 호스트 협력에서만 공개 실증됐다. 테일 지연 개선 실측은 모두 TLC이며 **QLC 실측은 없다**. 이것이 첫 공동 검증 과제다.

## 4. 기회: TLC 시장에 QLC로

| 근거 | 값 | ID |
|---|---|---|
| 1 DWPD 이하 비중(대수, Forward Insights 재인용) | 75%(2017) · 80%(2019) · SATA 82.3% · PCIe 91%(2028 99%, QLC 업체 인용) | TQ-12~15 |
| 하이퍼스케일 관행 | 1 DWPD 초과 정격 드물다, Kioxia NX1(2026)은 1 DWPD TLC | TQ-18 · TQ-19 |
| 실사용 | Microsoft 0.07~0.23 · NetApp 중앙값 0.36(7%가 3 초과) | CU-13 · CU-15 |
| QLC 내구 천장 | P/E 1,000, WAF 1: OP 7% 0.59 · OP 28% 0.70 DWPD | P-1 |
| AI 스토리지 | 읽기 서빙 0.6~1 DWPD, 잦은 체크포인트 3 DWPD. VAST · DDN은 이미 QLC 인증, WEKA · CMX 타깃은 TLC | TQ-20 · 23~26 |
| 가격 · 원가 | 30TB QLC/TLC 가격비 0.80(2Q26), 같은 세대 다이 밀도 약 1.25배 → 웨이퍼당 매출총이익 +0~16%(⚠️ 웨이퍼 원가 동일 가정) | TQ-28~30 · 파생 |
| 성능 격차(같은 세대 데이터시트) | QLC 읽기 지연 TLC의 1.7~1.8배, 랜덤 쓰기 대역 1/2.3~1/3, 프로그램 2~3ms | P-8 · P-9 · WQ-34 |
| 반대 근거 | Meta "QLC is not yet price competitive enough for a broader deployment", Micron 6500 ION TLC가 QLC 가격대, SanDisk "2030년에도 TLC 주력"(⚠️) | TQ-33 · TQ-32 · TQ-04 |

**전환 가능 시장(⚠️ 산술, 원장 7장)**: TLC eSSD 2026 약 353~435EB · 2030 약 540~1,200EB → 1 DWPD 이하 2026 약 265~396 · 2030 약 400~1,140EB → 성능 필터 전환율 30~70% 가정 시 **2026 약 80~280EB · 2030 약 120~800EB**. 전환율 근거가 없어 범위가 넓다.

**사용자 주장 보정**: "AI 스토리지는 TLC로 대응"은 부분만 맞다(고성능 계층 · CMX는 TLC, 대용량 AI 데이터 계층은 이미 QLC 진입). "TLC 수요의 상당 부분"은 범위(2030 약 120~800EB)로 쓰고, QLC 꼬리 지연 실측이 확보되면 좁힌다.

## 5. 추가 효과: TLC OP 축소와 초고DWPD 기반

- 같은 플랫폼 RI(1 DWPD) 대 MU(3 DWPD) 용량 약 20% 차(3.84 대 3.2TB 등, WQ-40). OP 28% → 7%면 같은 NAND로 판매 용량 +19.6~20%(P-6). WAF를 1.05로 낮추면 OP 7%로도 무배치 OP 28%보다 DWPD 약 1.97배(P-6c, ⚠️ 모델). 호스트 협력 없이 OP만 줄이면 수명 -60%(845DC, P-6b). 효과는 데이터 수명이 갈리는 워크로드에서만(CDN 무효과, WQ-17).
- 초고DWPD(30~120) 제품은 모두 SLC 계열이고 출시 동기는 IOPS · 지연(WQ-48 · 50 · 51). WAF 개선은 pSLC와 결합할 때 배수로 작동: P/E 30,000 · OP 28%에서 WAF 3 → 1이면 7 → 21 DWPD(P-3). 시장 규모는 SLC NAND $2.32B(2024, WQ-52) 정도만 확인.

## 6. 실행 · KPI

고객 협력 실행은 기존 전략과 같다(계약 MYD 위 기술 협력 · 고객 상주 Pod · 시스템 SW 역량, [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md) §4). KPI에 NAND 생산자원당 공헌이익 · QLC 전환율을 더한다([qlc-tlc-substitution-review.md](qlc-tlc-substitution-review.md) §4). 공급 부족기(~2027)는 공동 검증으로 자리를 만들고, 본격 전환은 공급이 풀리는 2028년 전후([essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md) §2.6).

## 7. 공백 (다음 조사)

1. QLC에서 FDP · ZNS 적용 전후 p99 이상 지연과 WAF 측정(Silicon Motion · Meta QLC FDP 수치 미확보)
2. eSSD TLC/QLC별 EB · 매출 절대치, 내구 등급별 비트 분할, 2028 · 2030 eSSD 내 QLC 비중
3. 하이퍼스케일러 TLC → QLC 전환 수치 공개 사례(공개 대체 사례는 대부분 HDD 대체)
4. QLC/TLC 계약가 분리 공개, 사내 원가([사내 확인])
5. 출처 충돌: Micron 6550 ION 매체 표기(QLC 대 TLC), 1 DWPD 이하 비중 대 Solidigm "85% ≥1 DWPD"(TQ-16)

## 8. 연결

- 검토 이력: [qlc-tlc-substitution-review.md](qlc-tlc-substitution-review.md)
- QLC 시장: [qlc-ssd-market.md](../concepts/qlc-ssd-market.md)
- DWPD 추이: [essd-decade-growth-vs-dwpd.md](../concepts/essd-decade-growth-vs-dwpd.md)
- 해법 사다리: [solution-ladder-component-to-system.md](../concepts/solution-ladder-component-to-system.md)
- FDP 플랫폼: [fdp-host-ssd-platform.md](fdp-host-ssd-platform.md)
- 수요 전망: [essd-demand-by-application-2030.md](../concepts/essd-demand-by-application-2030.md)
- 기존 덱: [ssd-future-ready-strategy-outline.md](../../outputs/presentation/ssd-future-ready-strategy-outline.md)
