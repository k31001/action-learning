# 2026년 9월 시장 업데이트 — ERCOT 접속 전면 중단·TSMC 선단 램프 가속·삼성 HBM4 골든수율 80%

- **수집일**: 2026-09-01
- **이전 스냅샷**: 2026-07-04 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 탐색 + TrendForce·Holland & Knight·Utility Dive·PowerMag·TechPowerUp 등 보강)
- **목적**: 2026-09-01 병목 모델 정기 점검(§6) — 08-25·08-28 자체 재평가(assessment 로그)가 이미 다룬 SP-1/SP-2 시나리오·EWI 신호와는 중복 없이, **4대 병목 자원(전력·CAPEX/ROI·파운드리·패키징)** 축만 갱신
- **수집 방법**: 병렬 웹서치(전력망/파운드리·패키징/HBM 수율 3개 축). counterpointresearch.com·techinsights.com·newsletter.semianalysis.com 원문 직접 접근은 이번에도 제한적 — 검색 스니펫·2차 보도 경유(원문 대조 권고 플래그 유지). CAPEX/ROI 축은 이미 위키에 반영된 `hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md`·`hyperscaler-q2-2026-capex-2026-07-28.md`(빅4 합산 ~$745~750B, +82% YoY, 삭감 0건)를 그대로 이월 인용 — 신규 소스 없음.

---

## 1. 전력망 — ERCOT 대형부하 접속 전면 중단 (신규, 최대 악화 신호)

| 지표 | 최신 수치 | 이전(07-04) | 비고 |
|---|---|---|---|
| ERCOT 신규 데이터센터 접속 절차 | **2026-08-03부로 전면 일시중단** (Abbott 주지사 지시, PUC·ERCOT 대상 "포괄적 검증·감사" 명령) | 큐 410GW+ 폭증(신청 단계, 절차는 진행 중) | 신청 잔량 급증 단계에서 **절차 자체의 정지**로 성격이 바뀜 |
| ERCOT 총 접속 신청 규모 | **474GW** (ERCOT 기록 최대수요의 5배 이상), 이 중 **~90%가 데이터센터** | 410GW+(1년 만에 4배) | Abbott 발표 수치, 07-04 수치보다 추가 확대 |
| ERCOT Batch Zero 접속연구 일정 | 2026-08-07 마감 미달성 → PUC에 "정당사유(good-cause)" 예외 신청 | — | 최초 개편 절차의 첫 마일스톤부터 지연 |
| 감사 완료 시한 | PUC 보고 마감 **2026-12-10** | — | 그 사이 신규 프로젝트 진행 사실상 정지 |
| 감사 범위 | 세제 혜택·공적 재정지원·전력수요·자가발전·냉각기술·지역사회 영향·소유구조까지 전수 심사 | — | 접속 심사를 넘어 사업 전반 재검증 — 프로젝트 지연 리스크 확대 |
| BNEF 추정 영향 | 최대 **49.8GW** 데이터센터 부하 지연 가능, 프로젝트 비용 최대 **$150억** 추가 | — | 신규 정량 추정 |

- **핵심 해석**: 07-04 시점까지는 "큐가 밀리는 속도가 증설 속도를 압도"(신청:증설 배율 ~45:1)하는 **점증적 병목**이었다면, 이번 조치는 텍사스주(미국 내 데이터센터 신설 최대 허브 중 하나)에서 **신규 접속 절차 자체를 일시 정지**시킨 **레짐 전환**이다. 감사 시한(12-10)까지 최소 3개월+ 신규 프로젝트가 사실상 전진하지 못하며, 감사 범위가 세제·자가발전·냉각까지 포괄해 재개 이후에도 개별 프로젝트 단위 재심사가 뒤따를 가능성이 크다.
- PJM 쪽은 이번 기간 별도의 절차 정지 조치는 확인되지 않음 — 07-04 확인된 구조적 부족 전망(2030년까지 최대 15GW)은 불변, 신규 캡핑 이벤트는 텍사스·ERCOT에 국한.
- 출처: [Holland & Knight – Abbott 감사 지시·ERCOT 중단](https://www.hklaw.com/en/insights/publications/2026/08/texas-gov-abbott-directs-data-center-audit), [Utility Dive – ERCOT 12월 완료 목표](https://www.utilitydive.com/news/ercot-texas-puc-data-center-audit/828472/), [Utility Dive – 474GW·90% DC](https://www.utilitydive.com/news/texas-hits-pause-data-center-interconnections/827046/), [PowerMag – BNEF 49.8GW·$15B](https://www.powermag.com/texas-audit-could-delay-49-8-gw-of-data-center-load-cost-projects-up-to-15-billion-bnef-warns/), [Akin – 법무 분석](https://www.akingump.com/en/insights/alerts/texas-pauses-data-center-interconnections-pending-statewide-audit), [Troutman Pepper Locke](https://www.troutman.com/insights/texas-hits-pause-on-data-center-grid-connections-amid-growing-oversight-push/)

---

## 2. 선단 파운드리 — N2/N3 램프 가속 (완화 지속)

| 지표 | 최신 수치 | 이전(07-04) | 비고 |
|---|---|---|---|
| TSMC N3(3nm) 월 웨이퍼 투입 | **4Q26 초 18만 장** 도달 전망 — 원 예상보다 **2~3개월 앞당김** | N2 3월 매출기여 개시 언급, N3 별도 수치 없음 | NVIDIA·AMD·Broadcom 강한 주문이 견인 |
| TSMC N2(2nm) 월 웨이퍼 | 대만 5개 팹에서 합산 **2만 장/월** 도달(Fab 20 양산 중), 연말 **~10만 장/월** 목표 경로 유지 | "2026말 ~10만 장/월 경로 순항" | 목표치 자체는 불변 — 진행 재확인 |
| ASML High-NA 도입 연기 | 최소 2029년까지 연기(07-04 확인 유지) | 동일 | 변동 없음, 근시일 기술 리스크 축소 지속 |

- **해석**: 07-04에서 이미 완화 추세였던 파운드리 축이 이번 기간 **진행 가속(N3 2~3개월 조기 달성)**으로 추가 확인됨. N2는 목표선을 그대로 유지하며 순항. 대만 집중(70%)·지정학 리스크는 불변.
- 출처: [TrendForce – N3 180K 조기 달성](https://www.trendforce.com/news/2026/08/03/news-tsmc-3nm-monthly-wafer-starts-to-hit-180k-by-early-4q26-on-strong-demand-2-3-months-ahead-of-expectations), [TechPowerUp – N2 2만 장 마일스톤](https://www.techpowerup.com/351117/tsmc-hits-20-000-wafers-per-month-milestone-on-2-nm-node)

---

## 3. 첨단 패키징 — CoWoS 갭 축소·삼성 HBM4 골든수율 80% (완화 지속, 폭 확대)

| 지표 | 최신 수치 | 이전(07-04) | 비고 |
|---|---|---|---|
| TSMC CoWoS 수급 갭 | 2026년 말까지 **20% → 10%로 축소** 전망(TrendForce) | "매우 타이트·sold out" 정성 서술 | 최초의 정량적 갭 축소 수치 |
| TSMC CoWoS 캐파(2026말) | **12만~14만 장/월** + OSAT(Amkor·ASE/SPIL) 5만~6만 장 → 업계 합산 **~20만 장/월** | "24~27만 장 OSAT 외주" (연간 기준, 표기 상이) | 월간 기준으로 재확인, 규모 자체는 07-04와 정합 |
| CoWoS 수율 | 일부 라인 **98%+**, 특정 케이스 **99%** 도달 | "수율 98%+" | 상단 소폭 개선 |
| CoPoS 진척 | 자재·장비 자격인증 2026-06 완료, **파일럿 양산 2027년 중반** 목표 | "전면 양산 2028년 하반기~2029년" | **파일럿**과 **전면 양산**을 구분 — 전면 양산 지연 기조는 불변, 파일럿 단계만 조기화 |
| HBM4 하이브리드본딩 vs 마이크로범프 | 3사(삼성·SK·Micron) 모두 HBM4는 **마이크로범프 유지**, 하이브리드본딩은 **HBM4E 또는 HBM5E로 이연** 재확인 | 동일(마이크로범프 유지 결정) | 07-04 판단 변동 없음 — 구조적 지연 고착화 확인 |
| **삼성 HBM4 수율** | **80% "골든수율" 달성**(2026-08-26 전후 확인, 양산 개시 2026-02 대비 약 6개월 만에 60%대→80%, 업계 예상보다 ~4개월 조기) | 하이브리드본딩 프로토타입 시험수율 ~10%(마이크로범프 결정의 근거) | **마이크로범프 기반 정규 양산수율**이 조기에 골든수율 도달 — 07-04에 "미지수·악화" 플래그였던 stack_yield 드라이버의 완화 신호. 연말 목표치는 85%로 추가 상향(사내 목표), 3Q26 HBM4 매출 전분기 대비 3배+ 전망 |

- **해석**: 라인업·매출 배분(NVIDIA 배정 60%)·HBM4 세대 접합방식(마이크로범프 유지)은 07-04 대비 구조적으로 불변. 다만 ① CoWoS 갭이 처음으로 정량 축소 경로에 진입했고 ② 삼성이 하이브리드본딩과 별개로 **양산용 마이크로범프 HBM4 수율을 예정보다 앞당겨 골든수율(80%)에 도달**시키며 패키징·적층 축의 실행 리스크가 완화됐다. CoPoS는 파일럿 단계 조기화(2027년 중반)에도 불구, 병목 모델이 추적하는 **전면 양산 시점(2028~29)**은 그대로다.
- 출처: [TrendForce – CoWoS 갭 20%→10%](https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/), [AtlasPCB – CoWoS 14만 장·CoPoS](https://www.atlaspcb.com/news/news-tsmc-copos-cowos-advanced-packaging-capacity-2026/), [TradingKey – CoWoS 수율 98~99%](https://www.tradingkey.com/analysis/stocks/us-stocks/262101043-tsmc-cowos-yield-breakthrough-14x-reticle-roadmap-tradingkey), [SemiEngineering – HBM4 마이크로범프 유지](https://semiengineering.com/hbm4-sticks-with-microbumps-postponing-hybrid-bonding/), [TrendForce – 삼성 HBM4 수율 80%](https://www.trendforce.com/news/2026/08/10/news-samsungs-hbm4-yield-reportedly-hits-80-as-race-to-supply-vera-rubin-heats-up-sk-hynix-labor-talks-add-a-twist/), [딜사이트 – 연말 목표 85%](https://dealsite.co.kr/articles/158277), [뉴스웨이 – 물량 공세 전환](https://www.newsway.co.kr/news/view?ud=2026081011095379175)

---

## 4. CAPEX/ROI — 08-11 재평가 기 반영분 이월 (신규 소스 없음)

Q2 2026 실적 시즌(07-21~30 수집) 결과는 이미 `hyperscaler-q2-2026-capex-2026-07-28.md`·`hyperscaler-q2-2026-actuals-gpu-rental-2026-08-11.md`에 반영돼 있다: 빅4 2026 CapEx 가이던스 전원 상향(합산 ~$745~750B, +82% YoY, 삭감 0건), 단 Meta FCF -91%·Amazon TTM FCF 적자 등 CapEx-FCF 다이버전스도 실측 확인됨. 신용시장(HY OAS)은 안정적. 이번 정기 점검에서는 신규 소스를 추가하지 않고 위 두 소스를 그대로 인용해 병목지수에 반영한다.

---

## 5. 병목 모델 제약지수 변동 요약 (2026-07-04 → 2026-09-01)

| 병목 | 이전(07-04) | 현재(09-01) | Δ | 주요 근거 |
|---|---:|---:|---:|---|
| **전력** | 72 | **76** | **▲ +4** | ERCOT 신규 접속 절차 전면 중단(08-03, Abbott 지시)·474GW 신청 중 90% DC·감사 완료 12-10까지 사실상 신규 프로젝트 정지·BNEF 추정 최대 49.8GW 지연·$15억 비용 증가 — 점증적 큐 적체에서 **규제 레짐 전환(절차 정지)**으로 성격 악화 |
| **CAPEX/ROI** | 40 | **38** | **▼ −2** | Q2 실적 시즌 완료 — 빅4 전원 추가 상향(합산 ~$745~750B, +82% YoY)·삭감 0건 재확인, HY OAS 안정 유지(08-11 소스 이월) |
| **파운드리** | 50 | **48** | **▼ −2** | TSMC N3 18만 장 목표를 2~3개월 조기 달성 전망(4Q26 초)·N2 연말 10만 장 경로 순항(현재 2만 장, 5개 팹 가동)·ASML High-NA 2029 연기 유지 |
| **패키징** | 67 | **65** | **▼ −2** | CoWoS 수급 갭 20%→10% 축소 첫 정량 확인·수율 98~99%·**삼성 HBM4 마이크로범프 수율 80% 골든수율 조기 달성**(예상보다 ~4개월 빠름, 연말 목표 85%로 상향) — 단 HBM4 하이브리드본딩은 여전히 마이크로범프 유지(HBM4E/5E 이연)·CoPoS 전면 양산은 2028~29로 불변 |

**전력이 4대 병목 중 처음으로 76까지 상승하며 Orange 상단(60~75)을 넘어 Red 밴드(75~85) 진입 — 4개 병목 중 유일하게 4개 점검 연속 재상승(64→68→70→72→76)이자 최초 Red 진입. 나머지 3개(CAPEX·파운드리·패키징)는 완화 지속 — 공급망·자본 측 제약은 점진 해소, 전력만 구조적으로 악화일로.**

## 한계

- 전력망 수치는 텍사스·PJM 위주(공개 보도 밀도가 높은 시장) — ERCOT 외 지역(서유럽·동아시아 데이터센터 허브)의 동일 시점 접속 상황은 미수집.
- 삼성 HBM4 "80% 수율"은 업계 2차 보도(TrendForce 포함) 종합치로, 삼성 공식 IR 확인(공식 실적발표는 10월 예정)은 대기 중 — 잠정치로 취급.
- CoPoS "파일럿 2027년 중반" vs "전면양산 2028~29"는 서로 다른 생산 단계를 가리키는 것으로 해석했으나, 1차 출처(TSMC 공시)로 재확인 필요.
