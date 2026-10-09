# eSSD 수요처별 2030 전망 원장: 범용 클라우드 · AI 학습 · AI 추론 · 에이전트 + 빠진 수요(HDD 대체)

**수집일**: 2026-10-09
**유형**: 웹 전망 원장 (Research Agent 2개: AI-xx = AI 워크로드, NA-xx = 비AI · 숨은 수요). 해석 없음.
**용도**: 고객 협력 전략 덱 1장의 수요처(범용 클라우드 · AI 학습 · AI 추론 · 에이전트)별 2030년 수요 변화. 사용자 질문(2026-10-09): "슬라이드 1에서 언급된 eSSD 미래 수요처에 대해서 2030년까지 예상 수요가 어떻게 변화하는지 조사해 줘. 혹시 eSSD에서 빠진 거대한 수요가 있다면 포함해 주고."
**접근 한계**: 프록시가 1차 도메인(sec.gov, sandisk, kioxia, mckinsey, trendforce, counterpoint, gartner, nvidia investor, blocksandfiles 등)을 모두 막았다. **✅ 없음.** 🟡 = 검색 스니펫 · 2차 보도, ⚠️ = 파생 계산 또는 출처 충돌.

## 1. AI 학습

| ID | 전망 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| AI-01 | 학습용 eSSD "grow 62 percent per year, from seven EB in 2024 to 127 EB in 2030" | 7 → 127EB (2024 → 2030) | McKinsey, 2024-12-03 | https://www.mckinsey.com/industries/semiconductors/our-insights/generative-ai-spurs-new-demand-for-enterprise-ssds | 🟡 |
| AI-02 | 학습 서버당 SSD 30TB → 100TB(2030), 다른 스니펫은 90TB | 서버당 TB | McKinsey | 위 | ⚠️ 문서 안 충돌 |
| AI-03 | 학습 서버 · 스토리지 출하 0.2M(2024) → 0.4M(2030) | 대수 | McKinsey | 위 | 🟡 |
| AI-04 | Kioxia 수요 분해: 학습(또는 "Traditional") CAGR 16%, 추론 86%, DC 46% (CY25~28, 출처 TechInsights NAND Q2 2026) | CAGR | Kioxia Investor Day, 2026-06-02 | https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Kioxia-Investor-Day-2026-en.pdf | ⚠️ 16% · 8% 표기 충돌 |
| AI-05 | AI 서버 부착 eSSD 비트 연 약 20%, 일반 서버 약 12%, 서버 부착 전체 약 15%(2024~30) | CAGR | Yole, FMS 2025 | https://files.futurememorystorage.com/proceedings/2025/20250807_AIML-302-1_T.Grossi.pdf | 🟡 |
| AI-06 | 체크포인트: 파라미터당 8~12B(70B 약 700GB), 비동기 드레인 50~200GB/s, 학습 서버당 NVMe 4~8개 | 크기 · 대역폭 | CUDO · VAST, 2025~26 | https://www.vastdata.com/blog/optimizing-checkpoint-bandwidth-for-llm-training | 🟡 |

## 2. AI 추론 · KV 캐시

| ID | 전망 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| AI-07 | NVIDIA BlueField-4 ICMS(CMX) "up to 16TB for each GPU" | GPU당 최대 16TB | NVIDIA, 2026-01 | https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/ | 🟡 |
| AI-08 | BlueField-4 1개당 150TB, SuperPOD 9,600TB → GPU당 약 8.3TB(산술) | | Blocks & Files, 2026-01-12 | https://blocksandfiles.com/2026/01/12/nvidias-basic-context-memory-extension-infrastructure/4090541 | ⚠️ AI-07과 2배 차 |
| AI-09 | Citi: Vera Rubin 시스템당 약 1,152TB 추가, 34.6EB(2026) · 115.2EB(2027), NAND 수요의 2.8% · 9.3% | 34.6 → 115.2EB | Citi, 2026-01 (2차) | https://wccftech.com/nvidia-next-generation-of-ai-systems-could-gobble-up-millions-of-terabytes-of-nand-ssd/amp/ | 🟡 |
| AI-10 | 업계 추정: CMX NAND 3,500만TB(2026) → 1억TB+(2027) | 35 → 100EB+ | 서울경제 경유 | https://www.bitget.com/amp/news/detail/12560605523093 | 🟡 출처 미상 |
| AI-11 | SanDisk: "KV cache alone could drive 75 to 100 exabytes of additional NAND demand by 2027", 2028년 약 2배 | 75~100EB(2027) | SanDisk FMS 2026 | https://cryptobriefing.com/sandisk-kv-cache-nand-ai-data-centers/ | 🟡 단일 2차 |
| AI-12 | SanDisk: 영속 KV 저장소 설치 기반 2030년 1ZB 초과 | 설치 기반 | SanDisk Investor Day, 2026-08-13 | https://counterpointresearch.com/en/insights/sandisk-investor-day-caching-out-the-nand-cycle-with-contracts | 🟡 |
| AI-13 | KV 캐시 = AI DC NAND의 35%(SanDisk 2030 또는 Goldman 2032 1.2ZB AI DC TAM) | 35% | 2차 2건 충돌 | 위 · stockhub.kr | ⚠️ |
| AI-14 | Goldman: KV 캐시로 eSSD 2027E · 2028E 상향, NAND 수급 갭 -4.4% · -4.6% · -3.0%(2026~28) | % | Goldman, 2026-05 | https://borecraft.com/2026/05/31/goldman-nearly-doubles-kioxias-target-sees-nand-tight-through-2028/ | 🟡 |
| AI-15 | McKinsey: 추론용 eSSD 6EB(2024) → **447EB(2030)**, CAGR 105%, 총의 약 41%("inference AI servers and RAG databases"). 별도 문장: 추론 서버당 5 → 35TB, "46 EB" | 447EB vs 46EB | McKinsey, 2024-12 | 위 · https://finance.biggo.com/news/gktQxpsBE5UokKawO5Bm | ⚠️ 범위 차이(서버 내장 대 RAG · 스토리지 포함) 추정 |
| AI-16 | Kioxia: 추론 주도 NAND CAGR 86%(CY25~28) | 86% | Kioxia, 2026-06 | https://www.trendforce.com/news/2026/06/03/ | 🟡 |
| AI-17 | Solidigm: "for every gigawatt it's about 25 exabytes of new flash"(25~35EB/GW), 그중 컨텍스트 메모리 6.4EB · DAS 6.1EB(Vera Rubin) | 25EB/GW | Solidigm, 2025-11 · 2026 | https://techfieldday.com/video/driving-storage-efficiency-and-the-impacts-of-ai-in-2026-with-solidigm/ | 🟡 |
| AI-18 | Citi: eSSD 수요 +52.9%(2027) · +41%(2028), NAND 수요 +29% · +33%, 메모리 부족 2031년까지 | % | Citi, 2026-09-14 | https://www.kucoin.com/blog/citi-ai-continual-learning-memory-shortage-20 | 🟡 |
| AI-19 | Micron: 하이퍼스케일러가 KV 캐시 관리 시스템 배포 · 개발 중, 업계 NAND 비트 low-20s%(2026) · mid-20s%(2027~28), DC SSD 분기 약 $10B | % | Micron FQ4 FY26, 2026-09 | https://beancount.io/de/blog/2026/10/02/micron-fy2026-q4-earnings-analysis | 🟡 |
| AI-20 | 삼성: "server SSDs is increasing rapidly across AI servers, general-purpose servers and dedicated storage servers for key-value cache as agentic AI continues to expand" | 정성 | Korea Herald · 2Q26 IR | https://m.koreaherald.com/article/10860463 | 🟡 |
| AI-21 | SK hynix: KV 오프로드로 eSSD가 "an active participant in the memory subsystem", 2026 eSSD가 NAND 매출의 60% 초과 | 정성 · 비중 | SK hynix F-1 · 2Q26 | https://www.marketbeat.com/instant-alerts/sk-hynix-q2-earnings-call-highlights-2026-07-28/ | 🟡 |

## 3. AI 에이전트

에이전트만 떼어 2028~2030 EB · $로 정량화한 전망은 **없다**(IDC · Gartner · Yole · TrendForce 모두). 정성 · 간접 지표만 있다.

| ID | 사실 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| AI-22 | 상위 5사 eSSD 1Q26 매출 QoQ +86.1%(>$18.46B), 원인 "rapid adoption of AI Agent services" | $ | TrendForce, 2026-06-11 | https://trendforce.com/presscenter/news/20260611-13092.html | 🟡 |
| AI-23 | 에이전틱 AI가 메모리 수요를 구조적으로 확대, 2027 메모리 시장 >$1.28T(NAND $379.4B) | $ | TrendForce, 2026-05-29 | https://www.trendforce.com/presscenter/news/20260529-13068.html | 🟡 |
| AI-24 | "a breakthrough in the adoption of Agentic AI could significantly increase demand for high-speed SSDs"(상방 요인) | 정성 | TrendForce, 2026-07-30 | https://www.trendforce.com/presscenter/news/20260730-13158.html | 🟡 |
| AI-25 | SK hynix: 에이전틱 AI 확산 → 고성능 eSSD 수요, 2026 NAND 수요 high-10% | % | 2026-07-28 | https://www.nasdaq.com/articles/sk-hynix-q2-earnings-call-highlights | 🟡 |
| AI-26 | GKE 노드당 microVM 61 · gVisor 88 에이전트, 유휴 에이전트는 Pod 스냅샷으로 영구 스토리지 | 밀도 | Google Cloud · Northflank, 2026 | https://itbrief.com.au/story/google-cloud-boosts-ai-agent-density-with-gke-sandbox | 🟡 |

## 4. 범용 클라우드 · 엔터프라이즈

| ID | 전망 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| NA-01 | 4Q25 eSSD 성장 요인: 범용 서버 업그레이드 + HDD 공급 부족에 따른 SSD 전환 | 상위 5사 $9.9B+(+51.7% QoQ) | TrendForce, 2026-03-13 | https://www.trendforce.com/presscenter/news/20260313-12967.html | 🟡 |
| NA-02 | CSP가 2019~21 범용 서버 교체 중, 범용 서버가 AI 추론 전후처리 · 스토리지 담당. 2026 서버 출하 약 +13%, AI 서버 약 +31%, 9대 CSP CapEx $886.7B(+90%) | % · $ | TrendForce, 2026-08-03 | https://www.trendforce.com/presscenter/news/20260803-13161.html | 🟡 |
| NA-03 | 외부 엔터프라이즈 스토리지 2025 $33.0B(+3.9%), 1Q26 $9.2B(+22.7%) | $ | IDC, 2026-06 | https://www.idc.com/?p=115848 | 🟡 |
| NA-05 | 서버 출하 CY26 · CY27 high-teens % | % | Micron, 2026-09-30 | https://www.marketbeat.com/instant-alerts/transcript-micron-technology-q4-earnings-call-highlights-2026-09-30/ | 🟡 |

## 5. 빠진 큰 수요: HDD 대체(니어라인 · 웜/콜드 · 오브젝트 · 데이터 레이크)

| ID | 사실 · 전망 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| NA-06 | NL HDD 리드타임 수 주 → 52주+, CSP가 웜 데이터를 SSD로, "even beginning to consider using SSDs for cold data", 대용량 QLC "explosive growth in 2026" | QLC 전력 약 30% 절감 | TrendForce, 2025-09-15 | https://www.trendforce.com/presscenter/news/20250915-12714.html | 🟡 |
| NA-07 | QLC 용량당 비용이 HDD의 3배 이내여야 균형, 현재 4~5배 | ≤3배 목표 | TrendForce · technews.tw, 2025-09 | https://www.trendforce.com/research/download/RP250910MW | 🟡 |
| NA-08 | 미국 CSP eSSD 수요 상향, "QLC products… have become a significant growth catalyst" | 4Q26 NAND 계약가 +15~20% | TrendForce, 2026-09-21 | https://www.trendforce.com/presscenter/news/20260921-13246.html | 🟡 |
| NA-09 | Micron: NAND 수요 동인 "vector database and KV cache offload… growing share of SSDs in capacity storage tiers", 공급 제약 원인에 HDD-replacement 명시 | | Micron, 2026-03 · 09 | https://www.insidermonkey.com/blog/micron-technology-inc-nasdaqmu-q2-2026-earnings-call-transcript-1721209/ | 🟡 |
| NA-10 | Seagate FY26 출하 789EB(니어라인 695EB, 약 +40%) | EB | Seagate 10-K, 2026-08 | https://www.sec.gov/Archives/edgar/data/0001137789/000113778926000159/stx-20260703.htm | 🟡 |
| NA-11 | WD 분기 204 · 215 · ? · 231EB, FY +25% | EB | WD, 2026-08-05 | https://www.gurufocus.com/news/9009786/ | 🟡 |
| NA-12 | 2026 HDD 연 출하(파생) 약 1.8~1.9ZB, 니어라인 약 1.6ZB+ | ZB | NA-10 · 11 계산 | - | ⚠️ |
| NA-13 | 니어라인 EB 성장 가이던스: Seagate "mid-20s"(3~4년), WD "25% plus"(3~5년), LTA CY2029~2031 | % | Seagate · WD, 2026 | https://www.marketbeat.com/instant-alerts/seagate-technology-cfo-sees-nearline-demand-above-supply-sticks-with-steady-price-hikes-2026-03-01/ | 🟡 |
| NA-14 | 2030 니어라인 HDD 연 출하(파생): 1.6ZB × 1.25⁴ ≈ **3.9ZB** | ZB | 계산 | - | ⚠️ |
| NA-15 | DC EB 중 HDD 비중: 87%(IDC, Seagate 인용) · 약 80%(WD) · >85%(Coughlin) | % | 2025~26 | https://www.sec.gov/Archives/edgar/data/1137789/000113778925000157/stx-20250627.htm | 🟡 |
| NA-16 | Phison CEO: DC 스토리지 중 SSD 비중 2020 한 자릿수 → 2025 약 20%, 장기 "80-100%" | % | Club386, 2025-11 | https://www.club386.com/nand-shortages-could-last-a-decade-because-of-ai-data-centre-demand-claims-phison-ceo/ | 🟡 |
| NA-17 | 2026 저장 용량 수요 비AI 1,654EB + AI 363EB ≈ 2,017EB, AI 추가분 비중 2028 약 43% · 2030 약 58% | EB | Coughlin, 2026 | https://finance.yahoo.com/sectors/technology/articles/ai-changed-hard-disk-drive-033610614.html | 🟡 |
| NA-18 | Gartner DC 스토리지 용량 2024 약 1ZB → 2028 2.49ZB | ZB | Gartner, 2024-11 · 2026-06 | https://www.gartner.com/en/documents/5893343 | 🟡 |
| NA-19 | Monroe: 2026-03 개정판 "SSD shipments never expand beyond 8ZB/year", HDD 2031 약 4.7ZB/년 정점 | ZB | Furthur Market Research, 2026-03 | https://datastorage-na.fujifilm.com/?p=4834 | 🟡/⚠️ |
| NA-20 | Meta "A case for QLC SSDs": HDD와 TLC 사이 새 계층, QLC 랙 10PB+ | | Meta, 2025-03-04 | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ | 🟡 |
| NA-21 | Pure Storage–Meta DirectFlash FY26 1~2EB+ 가정 | EB | Pure, 2025-08 | https://blocksandfiles.com/2025/08/29/pure-knocking-it-out-of-the-park/ | 🟡 |
| NA-22 | VAST: HDD 용량 부족분 "roughly about a 200 exabyte deficit" | 약 200EB | Blocks & Files, 2026-01-13 | https://www.blocksandfiles.com/ai-ml/2026/01/13/vast-datas-flash-reclaim-attacks-competitors-installed-bases/4090394 | 🟡 |

## 6. Physical AI · 소버린 · 엣지 (정량 근거 없음)

| ID | 사실 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| NA-23 | WD: physical AI · 자율주행 · 로봇 · 휴머노이드 · 합성 데이터가 저장 수요 확대, 신규 고객 neocloud · 소버린 DC · physical AI | EB ">25%"(3~5년) | WD FQ4'26 | https://bullfincher.io/companies/western-digital-corporation/earnings-call/fy2026-q4 | 🟡 |
| NA-24 | NVIDIA Cosmos: 2,000만 시간 영상(9,000조 토큰), "petabytes of video" | PB | NVIDIA, 2025-01 | https://investor.nvidia.com/news/press-release-details/2025/NVIDIA-Launches-Cosmos-World-Foundation-Model-Platform-to-Accelerate-Physical-AI-Development/default.aspx | 🟡 |
| NA-25 | 자율주행 데이터 레이크 "hundreds of petabytes", 재학습으로 콜드 데이터가 적음 | 수백 PB/사 | Micron, 2023-11 | https://www.storagenewsletter.com/2023/11/30/micron-what-changes-in-storage-will-ai-drive/ | 🟡(구자료) |
| NA-27 | "AI-powered storage" $27.1B(2025) → $76.6B(2030) | $ | Mordor/R&M | https://www.researchandmarkets.com/reports/6260388/ai-powered-storage-market-share-analysis | 🟡 저신뢰 |
| NA-28 | 통신 MEC CAGR 22%, 5G 코어 12%(2025~30), SSD 분리 전망 없음 | % | Dell'Oro, 2026-01 | https://www.delloro.com/news/5g-mobile-core-network-market-revised-up-to-12-percent-cagr-as-5g-sa-reaches-inflection-point/ | 🟡 |

## 7. 총량

| ID | 전망 | 수치 | 발행 | URL | 등급 |
|---|---|---|---|---|---|
| AI-27 | Kioxia(TechInsights 인용): DC 플래시 **295EB(CY25) → 909EB(CY28)**, CAGR 46%, DC 비중 30% → 약 50%, 총 997 → 1,807EB | EB | Kioxia, 2026-06-02 | Kioxia Investor Day Q&A PDF | ⚠️ **2030이 아니라 2028** |
| AI-28 | McKinsey 기준 시나리오: eSSD "181 exabytes (EB) in 2024 to 1,078 EB in 2030", CAGR 35% | 181 → 1,078EB | McKinsey, 2024-12 | 위 McKinsey | 🟡 |
| AI-29 / NA-32 | SanDisk: 엔터프라이즈 DC 플래시 TAM **1.2ZB(2030)**, FY28~30 매출 mid-to-high-teens | 1.2ZB | SanDisk, 2026-08-13 | https://www.sandisk.com/company/newsroom/press-releases/2026/2026-08-13-sandisk-investor-day-2026 | ⚠️ TAM 대 AI DC 소비 정의 엇갈림 |
| AI-30 | JPM: eSSD 향후 3년(약 2028) 900EB, 비트 CAGR 49%(2025~28), 2028 NAND 비트의 53% | 약 900EB | JPM, 2026-01 | https://technews.tw/2026/01/26/jp-morgan-see-2026-global-memory-market/ | 🟡 |
| AI-31 | AI 관련 NAND 수요 2029년 글로벌의 34% | 34% | Morgan Stanley, 2025-09 | https://www.fool.com/investing/2025/09/11/why-sandisk-stock-popped-today | ⚠️ 귀속 혼선 |
| AI-32 | 2029년 NAND 수요의 거의 절반이 AI 관련 | 약 50% | Kioxia(Nikkei), 2025 | https://www.trendforce.com/news/?p=45322 | 🟡 |
| AI-33 / NA-29 | eSSD가 NAND 비트 출하의 48%(2Q26, 1년 전 26%), 연말 50% 초과 | % | Counterpoint, 2026-08-12 | https://counterpointresearch.com/de/insights/server-led-essds-hit-48-percent-of-nand-shipments | 🟡 |
| AI-34 | 서버가 NAND 생산의 44.2%(2026) → 51.1%(2027) 소비, 2H27 완화 | % | TrendForce, 2026-07 | https://www.trendforce.com/presscenter/news/20260721-13148.html | 🟡 |
| AI-35 | NAND 총 비트 CAGR 21%(2024~30), AI 유발 DC 수요 CAGR 50%+ | % | Yole, FMS 2025 | AI-05 | 🟡 |
| AI-36 | eSSD 시장 $24.1B(2025) → $154B(2026) | $ | Omdia(국내 언론), 2026-08 | https://www.sidae.com/article/2026082611162667745 | 🟡 원자료 미확인 |
| NA-31 | 2Q26 상위 5사 eSSD 매출 $37.59B(+103.6% QoQ), 삼성 $14.35B | $ | TrendForce, 2026-09-01 | https://www.trendforce.com/presscenter/news/20260901-13210.html | 🟡 |
| NA-33 | SanDisk: NAND TAM >$300B(2026) → 약 $500B(2027), DC 비중 30%(2025) → 50%(2026) | $ | SanDisk, 2026-08-05 | https://www.nasdaq.com/articles/sandisk-q4-earnings-call-highlights | 🟡 |

## 8. 파생 계산 (⚠️ 과제팀 산술, 2026-10-09)

| 항목 | 계산 | 값 |
|---|---|---|
| 범용 클라우드 · 엔터프라이즈 등 "기타" eSSD (McKinsey 기준) | 총 1,078 − 학습 127 − 추론 447 (2030), 181 − 7 − 6 (2024) | 2024 약 168EB → 2030 약 504EB (약 3배, CAGR 약 20%) |
| 니어라인 HDD 중 플래시 전환 민감도 (2030) | 3.9ZB × 10% / 20% | 약 390EB / 약 780EB |

## 9. 확인 실패 · 충돌

1. 기존 위키 [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §4 가정의 "TechInsights DC NAND 295 → 909EB"는 **CY2025 → CY2028**(Kioxia 슬라이드, TechInsights 인용)이다. 2030년 수치로 쓰면 안 된다.
2. 2030 총량은 정의가 다르다: McKinsey eSSD 1,078EB(2024-12 작성, KV 오프로드 이전) 대 SanDisk 엔터프라이즈 DC 플래시 1.2ZB(2026-08).
3. McKinsey 추론 447EB 대 46EB의 범위 차이 미확인. 학습 서버당 90 · 100TB 충돌.
4. SanDisk KV 캐시 75~100EB(2027)는 단일 2차 출처이며 "none of this demand is in current forecasts"라고 해 McKinsey 등과 이중 계산 여부 점검 필요.
5. 에이전트 · Physical AI · 소버린 · 엣지는 EB 정량 전망 없음.
6. HDD 비중 87% · 80% · >85% · SSD 20%는 측정 범위가 다름. 하이퍼스케일러별 QLC 전환율 비공개.
7. 과거 전망 이탈: Gartner(2022)의 2026 HDD 3,200EB는 실측 추정 약 1.9ZB 대비 과대, Monroe도 2026-03 하향.
