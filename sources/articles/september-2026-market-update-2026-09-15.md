# 2026년 9월 시장 업데이트 — 텍사스 그리드 접속 일시중단·PJM 대형부하 규정·TSMC 8월 매출 사상최고·HBM 하이브리드본딩 HBM5 이연·삼성 HBM 점유율 회복

- **수집일**: 2026-09-15
- **이전 스냅샷**: 2026-07-04 (병목 모델 정기 점검, `july-2026-market-update-2026-07-04.md`). 08-05~09-08 사이 다수의 위키 갱신이 있었으나 4대 병목 제약지수 자체는 07-04 이후 미갱신 — 본 문서가 **약 10주 만의 병목 모델 갱신 근거**.
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 탐색 + TSMC IR·TrendForce·PJM/ERCOT 1차 공시·Fortune·CNBC·Tom's Hardware 보강)
- **목적**: 2026-09-15 병목 모델 정기 점검 + Bottleneck Model 대시보드 탭 갱신
- **수집 방법**: WebSearch 다회 질의(전력망/CAPEX/파운드리/패키징/HBM 시장 5개 축). semianalysis.com·counterpointresearch.com·techinsights.com 원문은 검색 스니펫·2차 인용 경유(직접 fetch 다수 차단) — 원문 대조 권고 플래그 유지.

---

## 1. 전력망 — 텍사스 그리드 접속 "일시중단"이 최대 신규 악재

| 지표 | 최신 수치 | 이전(07-04) | 비고 |
|---|---|---|---|
| **텍사스 ERCOT 신규 데이터센터 접속** | **전면 일시중단**(2026-08-03 Abbott 주지사 지시, 08-13 공식화) — 약 1,800개 프로젝트·474GW 신청분 감사 완료까지 승인 보류 | 접속 큐 410GW+ (신청 잔량, 진행형) | **질적 전환** — "지연"에서 "정부발 접속 동결"로 악화. ERCOT: 감사에 "수개월" 소요 예상, 미준수 시 접속 거부 |
| ERCOT 대형부하 총 신청 | **474GW**(사상 최대, 피크 수요의 5배+) — 약 90%가 데이터센터 | 410GW+ | 1년 만에 4배 폭증 후 추가 증가, 이번엔 승인 절차 자체가 멈춤 |
| ERCOT Batch Zero 심사 | 애초 2027-04-09 목표 → **지연 확정**(대체 일정 미정), PUCT 감사 보고서 시한 2026-12-10 | 2026-06 프레임워크 신설 | 감사·Batch Zero 이중 지연 |
| **PJM 신규 대형부하 규정**(2026-08-13 FERC 제출) | 2027-06-01 이후 신규 50MW+ 부하는 **자체 신규 발전 확보 또는 Interim Resource Adequacy Service 비용 부담** — FERC 발효 희망일 2026-10-12 | 개편 큐 Cycle1(811건·220GW), 2030년까지 15GW 구조적 부족 전망 | 업계 최고 수준으로 엄격한 규정, 대형 AI 캠퍼스 배치 비용 구조를 근본적으로 바꿈 |
| PJM 버지니아 북부 AI 캠퍼스 접속 대기 | **최대 약 7년** | — | 신규 수치 |
| PJM 2027~28 구조적 부족 | 6.6GW 부족 (07-04와 동일 전망 유지) | 6.6GW | 불변 — 완화 신호 없음 |

- **의미**: 07-04까지는 "큐가 길어지고 있다"는 정도였으나, 이번엔 미국 최대 AI 데이터센터 신축 주(텍사스)에서 **주지사가 직접 신규 접속 승인을 멈춘** 최초의 사례. PJM도 같은 주(08-13)에 대형부하 전용 규정을 FERC에 제출해 "부하가 스스로 발전을 가져오라"는 원칙으로 전환 — 두 최대 시장에서 동시에 정책적 병목이 신설됨. 원자력·SMR 커밋(9.8GW+, 07-04 기준)·터빈 백로그는 여전히 2028년 이후 가동이라 단기 상쇄 불가.
- 출처: [Utility Dive – 텍사스 일시중단](https://www.utilitydive.com/news/texas-hits-pause-data-center-interconnections/827046/), [Texas Tribune](https://www.texastribune.org/2026/08/14/texas-data-center-approval-pause-ercot-power-grid/), [Texas 주지사실 공식 발표](https://gov.texas.gov/news/post/governor-abbott-directs-comprehensive-data-center-audit), [Gibson Dunn – Batch Zero 영향 분석](https://www.gibsondunn.com/what-governor-abbotts-data-center-audit-directive-means-for-ercot-and-the-batch-zero-study-process/), [Holland & Knight](https://www.hklaw.com/en/insights/publications/2026/08/texas-gov-abbott-directs-data-center-audit), [Ascend Analytics – PJM/ERCOT 큐 분석](https://www.ascendanalytics.com/blog/large-load-interconnection-queues-data-center-grid-access), [DC Hub – 큐 트래커](https://dchub.cloud/interconnection-queue), [Savrn – 그리드 운영자 워치리스트](https://savrn.com/data-center-grid-operator-watchlist)

---

## 2. CAPEX/ROI — 가이던스는 불변·상향 지속하나 파이낸싱 구조 스트레스 신규 포착

| 빅테크 | 2026 CAPEX 가이던스(09-15 기준) | 비고 |
|---|---|---|
| Amazon | ~$200B | 07-04와 동일 |
| Alphabet | $180~190B(신규 보도 일부 $195~205B 상향 언급) | 상향 지속 |
| Meta | $115~135B | 이전(07-04, $125~145B) 대비 표기 범위 변동 — 2차 출처 간 하한선 차이, 위키 정합 필요 |
| Microsoft | $110~120B | |
| **4사 합산** | **~$725B(+77% YoY), 삭감 0건** | 07-04 이후 변동 없음 — 컷 신호 전무 |
| 2027 전망(애널리스트) | JPMorgan ~$1T · 컨센서스 whisper $1T | 07-04의 JPMorgan 2030 누적 $5.5조와 별개로 **2027 단년 전망이 처음 $1T대 진입** |

- **NVIDIA↔OpenAI 오하이오 데이터센터 파이낸싱 축소(신규, 후기순환 조달 tell)**: 당초 NVIDIA가 검토하던 최대 **$250B** 보증 규모가 협상 과정에서 **<$120B**로, 최종 서명(2026-08-18)은 **$105B**로 확정(SEC 공시 "aggregate payment obligation" 상한). NVIDIA는 전체가 아닌 **초기 5GW 구간만** 백스톱 — 잔여 구간 파이낸싱은 별도 결정 대기. 투자자들이 NVIDIA 대차대조표의 과도한 노출을 우려해 축소를 압박한 것으로 보도됨(Fortune: "보도 대비 $145B 낮음 — 인공 수요 우려 신호").
- **해석**: 이는 CAPEX 총량 자체의 컷이 아니라 **조달 구조**(누가 리스크를 지는가)의 스트레스 — 가이던스·발주는 그대로이나 파이낸싱 리스크가 벤더(NVIDIA)에서 다시 고객·3자 신용시장으로 이전되는 신호. Oracle 주가 YTD -24%, HSBC 분석 "OpenAI는 2030년 매출 $200B를 달성해도 추가 조달 ~$207B 필요" — 병목지수 자체를 반전시킬 사실은 아니나(가이던스 불변) **모니터링 격상 요인**으로 반영.
- 출처: [CNBC – NVIDIA $105B 확정](https://www.cnbc.com/2026/08/17/nvidia-financing-open-ai-data-center-ohio.html), [Fortune – $145B 낮음](https://fortune.com/2026/08/18/openai-data-center-deal-with-nvidia-comes-in-145-billion-lower-than-reportedsignaling-concerns-of-artificial-demand-for-chips/), [Yahoo Finance – NVIDIA $120B 축소](https://finance.yahoo.com/technology/ai/articles/nvidia-cuts-openai-ohio-data-114517517.html), [Network World](https://www.networkworld.com/article/4212543/nvidia-scales-back-financing-guarantee-for-openai-data-center.html), [Yahoo Finance – 빅테크 CAPEX](https://finance.yahoo.com/sectors/technology/article/meta-microsoft-amazon-and-alphabet-are-about-to-spend-a-shocking-amount-of-money-to-dominate-the-ai-era-115359575.html)

---

## 3. 파운드리 — TSMC 8월 매출 사상 최고, N2 램프는 현재 2만 장/월(목표 10만 장/월과 격차 유지)

- **TSMC 2026년 8월 매출**: NT$514.81B(약 $16.35B), **전월 대비 +10.1%·전년 동월 대비 +53.3%** — 사상 최고치 재경신. AI 수요가 견인.
- **N2 램프 현황**: 8월 기준 약 **2만 장/월** — 연말 목표(**10만 장/월**)까지 남은 약 4개월간 5배 확대가 필요한 가파른 곡선. N2는 2026 Q2(첫 상업 출하 분기)에 매출의 3% 기여, Q3부터 유의미한 기여 전망(07-04 전망과 정합). 목표 자체는 불변이나 **현재↔목표 간 격차가 뚜렷해 실행 리스크로 모니터링 필요**.
- **ASML**: High-NA EUV 도입을 TSMC가 최소 2029년까지 연기하는 기존 결정 유지(07-04와 동일, 신규 정보 없음). 2025년 말 백로그 €38.8B 유지.
- **평가**: 매출·수요 측면은 사상 최고 경신으로 완화 방향이 유지되나, N2 물리적 캐파 확대(2만→10만 장/월)의 남은 실행 속도가 병목지수의 하방 변수로 새로 부상 — 지수를 소폭 상향(완화 폭 축소) 반영.
- 출처: [Yahoo Finance – TSMC 8월 매출 +53%](https://finance.yahoo.com/technology/ai/articles/tsmc-revenue-jumps-53-august-145500427.html), [TweakTown – TSMC 8월 $16B+](https://www.tweaktown.com/news/113488/tsmc-reports-record-breaking-dollars16-plus-billion-in-revenue-for-august-2026-as-ai-related-demand-continues/index.html), [TechPowerUp – N2 2만→10만 장/월](https://www.techpowerup.com/351326/tsmc-targets-100-000-n2-wafers-per-month-by-the-end-of-2026)

---

## 4. 패키징 — CoWoS 수급 갭 축소(20%→10%) vs HBM4 하이브리드본딩 HBM5로 이연

- **CoWoS 캐파**: 2025년 말 약 75~80K WPM → 2026년 말 목표 **120~130K WPM**(범위 유지, 07-04의 130K 확정치와 정합). TrendForce(2026-06-15): CoWoS **수급 갭이 2026년 말까지 20%→10%로 축소** 전망 — 캐파 증설이 수요를 서서히 따라잡는 방향. OSAT(Amkor·SPIL) 외주 물량 연 24~27만 장(07-04와 동일) 재확인.
- **HBM4 하이브리드본딩 — SK하이닉스, HBM4E 건너뛰고 HBM5로 이연(신규, Hot Chips 2026 발표)**: SK하이닉스 패키지 엔지니어링 부사장이 Hot Chips 2026에서 하이브리드본딩을 **HBM4E에는 적용하지 않고 HBM5(양산 목표 대략 2029~2030년)로 미룬다**고 공식화 — 07-04에 이미 확인된 "HBM4 마이크로범프 유지" 결정을 한 세대 더 확장. AI 메모리가 **775마이크론 두께 한계**에 근접했다는 새로운 기술적 제약도 함께 제기(적층수 증가의 물리적 상한).
- **삼성**: 하이브리드본딩을 더 공격적으로 추진 중이나 시험수율은 여전히 **~10%**(07-04와 동일 수준, 개선 미확인). HBM4 볼륨 오더는 07-17 시점 "샘플 평가 단계"에서 09-15까지 업데이트된 확인 보도 없음 — **미전환 상태 지속으로 추정**(§5 참조).
- **평가**: 캐파 총량(CoWoS)은 계획대로 완화가 진행 중이나, 차세대 적층 기술(하이브리드본딩)의 실용화가 한 세대 더 밀리며 "언제까지나 마이크로범프로 버텨야 하는" 구조적 제약이 재확인됨 — 순효과는 완만한 추가 완화(CoWoS 우세)로 판단하되 하이브리드본딩 이연은 별도 리스크로 추적.
- 출처: [TrendForce – CoWoS 갭 20%→10%](https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/), [Tom's Hardware – SK하이닉스 HBM5로 이연·775마이크론 한계](https://www.tomshardware.com/tech-industry/semiconductors/sk-hynix-says-hybrid-bonding-wont-be-ready-for-hbm4e-as-ai-memory-runs-into-a-775-micron-ceiling), [Silicon Analysts – HBM 수율](https://siliconanalysts.com/analysis/hbm4-capacity-bottleneck-2026-samsung-sk-hynix-qual), [Winbuzzer – 삼성 볼륨오더 대기(07-17)](https://winbuzzer.com/2026/07/17/samsung-reportedly-awaits-nvidia-hbm4-volume-order-xcxwbn/)

---

## 5. HBM/DRAM 시장 — 삼성 HBM 점유율 33~40%대 회복, DRAM 가격 초강세 지속

- **삼성 HBM 점유율 회복(09-03·09-12 보도, 04월 35~40% 데이터와 정합)**: Seoul Economic Daily(2026-09-03): 삼성 점유율 QoQ +7%p 상승해 **33%**, SK하이닉스와 격차 축소. Sammy Fans(2026-09-12): 삼성 **40%대 근접**으로 재보도 — 두 수치는 집계 시점·기준(매출 vs 출하) 차이로 추정, 07-04 위키 서술(4월 데이터 35~40%)과 큰 방향에서 정합. **주의**: 별도 경로(Astute Group 등)에서는 "SK 57%·삼성 22%·Micron 21%"로 상이한(더 낮은 삼성 비중) 수치도 유통 — 라벨링이 Q3 전망인지 구분 데이터인지 불명확, 위키에는 두 계열 모두 병기하고 원문(Counterpoint 정식 리포트) 대조 필요 플래그.
- **DRAM 가격 — 서버·엔터프라이즈 강세 지속**: Citi 리서치 — 엔터프라이즈용 64GB DDR5 RDIMM 가격이 2026 Q1 $873 → 2026 Q4 전망 **~$1,586**(3분기 누적 +80%+). DDR4 스팟 칩 가격 2026-08-31 기준 **$42.50**로 사상 최고 재경신. TrendForce Q3 2026 범용 DRAM 계약가 +13~18% QoQ 전망(07-04 확인치와 동일선상) 재확인 — 서버향 강세가 병목 모델의 "기준~높음" 가격 균형 경로(HBM 가격지수 97.5~149.7)를 계속 지지.
- **Micron**: 2026 회계연도 Q4(9월 결산, 실적 발표는 9월 하순 예정 — 09-15 시점 미발표) 가이던스 매출 **$50.0B±$1.0B**(FY2026 Q3 실적 발표 시 제시, 07-04 이후 신규 확정치 없음 — 다음 확인점은 Micron 실적 발표일). HBM TAM CAGR ~40%(2025 $35B→2028 ~$100B) 가이던스 유지.
- 출처: [Seoul Economic Daily – 삼성 33%](https://en.sedaily.com/finance/2026/09/03/samsung-doubles-hbm-market-share-to-33-percent-narrowing), [Sammy Fans – 삼성 40%대 근접](https://www.sammyfans.com/2026/09/12/samsung-is-closing-in-on-40-percent-hbm-share/), [Astute Group – SK57/삼성22/Micron21](https://www.astutegroup.com/news/general/sk-hynix-holds-62-of-hbm-micron-overtakes-samsung-2026-battle-pivots-to-hbm4/), [Tech Insider – DDR4 $42.50](https://tech-insider.org/dram-ram-price-crisis-2026/), [StockTitan – Micron Q3 $50B 가이던스](https://www.stocktitan.net/news/MU/micron-technology-inc-reports-record-results-for-the-third-quarter-6f50161e5zxh.html)

---

## 6. 병목 모델 제약지수 변동 요약 (2026-07-04 → 2026-09-15)

| 병목 | 이전(07-04) | 현재(09-15) | Δ | 주요 근거 |
|---|---:|---:|---:|---|
| **전력** | 72 | **78** | **▲ +6** | 텍사스 ERCOT 신규 접속 전면 일시중단(474GW 대상, 08-03/08-13) — "지연"에서 "정부발 접속 동결"로 질적 악화. PJM 대형부하 신규 규정(08-13 FERC 제출, "부하가 스스로 발전 확보") 동시 발생. 버지니아 접속 대기 최대 7년. 2027~28 구조부족 6.6GW 불변. **4대 병목 중 유일하게 3개 분기 연속 재상승(72→78) — 최고 지수 유지·가속화** |
| **CAPEX/ROI** | 40 | **40** | **─ 0** | 4사 합산 $725B(+77% YoY) 가이던스·삭감 0건 불변, 2027 전망 $1T대 진입(추가 상향). 단 NVIDIA-OpenAI 파이낸싱 보증 $250B→$105B 축소·Oracle YTD -24%는 조달 구조 스트레스 tell — 지수 반전 아님(모니터링 격상만 반영) |
| **파운드리** | 50 | **52** | **▲ +2** | TSMC 8월 매출 사상 최고(+53.3% YoY)로 수요·매출 측면은 완화 방향이나, N2 현재 캐파(2만 장/월)와 연말 목표(10만 장/월) 간 격차가 뚜렷해져 램프 실행 리스크가 하방 변수로 재부상. ASML High-NA 2029 연기는 불변 |
| **패키징** | 67 | **65** | **▼ −2** | CoWoS 수급 갭 20%→10%로 축소 전망(TrendForce) 재확인 + OSAT 외주 유지로 순완화 지속. 단 SK하이닉스 하이브리드본딩을 HBM4E도 건너뛰고 HBM5(~2029~30)로 이연 확정 + 775마이크론 두께 한계 신규 제기는 차세대 적층 기술의 구조적 지연 요인으로 별도 추적 |

**하방 위험 순서 변경: 전력이 CAPEX/ROI를 제치고 4대 병목 중 최고 지수(78)로 부상 — 3분기 연속 상승·가속화. 여전히 "돈"보다 "전기"가 먼저 막히는 구조로 전환 중. CAPEX/ROI는 완화 국면에서 횡보로 전환(조달 구조 스트레스 모니터링 격상). 파운드리는 소폭 재긴장(N2 램프 실행 리스크), 패키징은 소폭 추가 완화.**
