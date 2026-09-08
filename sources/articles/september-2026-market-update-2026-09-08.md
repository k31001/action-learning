# 2026년 9월 시장 업데이트 — 전력 정치 리스크 신규(ERCOT 동결)·CAPEX 신용경색 조짐·CXMT DRAM 10%·HBM4 하이브리드본딩 지연 공식화

- **수집일**: 2026-09-08
- **이전 스냅샷**: 2026-07-04 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 + PJM·ERCOT·TrendForce·Dell'Oro·JPMorgan·Goldman Sachs·S&P Global 등 보강)
- **목적**: 2026-09-08 병목 모델 정기 점검 + 위키 전반 갱신 데이터 소스
- **수집 방법**: 5개 병렬 리서치 에이전트(전력/CAPEX/파운드리·패키징/HBM·DRAM·NAND 시장/AI 수요·중국 경쟁 전담). counterpointresearch.com·techinsights.com·newsletter.semianalysis.com 직접 fetch는 이번에도 egress 프록시에서 차단(EGRESS_BLOCKED) — 검색 스니펫·2차 인용(BigGo·Sammy Fans·TechTimes·Tom's Hardware 등, 대개 Counterpoint/TrendForce/SemiAnalysis를 교차 인용) 경유. 원문 대조 권고 플래그 유지.

---

## 1. 전력망 — 정치·행정 리스크 신규 추가 (ERCOT 접속 전면 동결)

| 지표 | 최신 수치 (2026-09) | 이전(07-04) | 비고 |
|---|---|---|---|
| **텍사스(ERCOT) 데이터센터 접속** | **2026-08-03 Abbott 주지사 지시로 신규 접속 승인 전면 일시중단**, PUCT Docket 59220, ERCOT 감사 완료 목표 2026-12-10 | 대기만 길어짐(물리적 병목) | **신규 리스크 유형** — 순수 인프라 병목 위에 정치·행정 동결 추가 |
| ERCOT 대형부하 접속 큐 | ~474GW (2026-08, ~90% DC) | 410GW+ (2026-03) | 5개월 새 추가 확대, 동결 직전까지도 신청 지속 |
| PJM Cycle 1 큐 | 811개 프로젝트·220GW (변동 없음), ~46GW는 Transition Cycle 2로 이관·2026년 말까지 스터디 완료 목표 | 811개·220GW | 절차 처리 자체는 개선(백로그 해소, 처리기간 1~2년으로 단축) |
| PJM 2028/29 인도연도 용량경매 부족분 (2026-07-14 발표) | **6,831MW 부족**, 청산가 $325/MW-day 상한 | 2027/28: 6,623MW 부족 ($333.44/MW-day) | 예측된 우상향 궤적대로 소폭 확대 지속 — 15GW(2030년) 서사와 정합 |
| PJM 피크 부하 전망 | 2024~2030 +32GW(그중 ~30GW가 DC), 2038까지 +70GW | 미수집 | 격차 해소에 신규 발전투자 ~$150억 추정 소요 |
| 변압기 리드타임 (고압/GSU급) | 100~150주 이상(약 2~3년), SemiAnalysis 기준 "5년"대 잔존 | 최대 5년 | 고압급은 여전히 정체 |
| 변압기 리드타임 (배전용 평균) | 약 30주 (2023년 피크 100주+ 대비 하락) | — | 등급별 양극화 — 저압은 완화, 고압/GSU는 정체 |
| 변압기 가격 (2019년 대비) | 배전용 +78~95%·발전용 +77%·GSU +45% | — | 2026-04-06 발효 관세 개편(철강·알루미늄·구리 계층 관세, 2027년 말까지)이 추가 압박 |
| BTM(자가발전) 가동 용량 | 약 2GW 가동 중(xAI Colossus 1,498MW 등 4개 프로젝트) | — | SemiAnalysis 2028년까지 40GW+ 전망은 유지되나 현재 실측은 초기 단계 |

**핵심 신규 이벤트**: 텍사스 주지사 Greg Abbott가 2026-08-03 데이터센터의 ERCOT 신규 접속 승인을 전면 동결시키고 주 전체 감사를 지시 — ERCOT는 2026-12-10까지 감사 완료 목표. 이는 위키가 추적해온 "물리적 접속 지연"(대기열·리드타임)과는 성격이 다른 **정치·규제 리스크**로, 텍사스 기반 AI 데이터센터·메모리 수요 프로젝트 일정에 새로운 하방 리스크를 추가한다. PJM은 반대로 절차 개혁(Cycle 1 처리)으로 신규 접속 프로세스 자체는 개선됐으나, 용량 부족분 전망치는 예측 경로를 벗어나지 않고 계속 확대 중이다.

- 출처: [Utility Dive – Texas hits pause on data center interconnections](https://www.utilitydive.com/news/texas-hits-pause-data-center-interconnections/827046/), [Utility Dive – ERCOT/Texas PUC data center audit](https://www.utilitydive.com/news/ercot-texas-puc-data-center-audit/828472/), [DLA Piper – Texas data center directive](https://www.dlapiper.com/en-mx/insights/publications/2026/08/texas-data-center-directive), [Akin Gump](https://www.akingump.com/en/insights/alerts/texas-pauses-data-center-interconnections-pending-statewide-audit), [PJM 2028/29 용량경매 보도자료](https://www.pjm.com/-/media/DotCom/about-pjm/newsroom/2026-releases/20260714-pjm-capacity-auction-procures-138318-mw-of-generation-resources.pdf), [PowerMag – PJM widens response](https://www.powermag.com/pjm-widens-response-to-data-center-load-as-capacity-shortfalls-deepen/), [CRS – Data Centers and the Electricity Grid (2026-09-01)](https://www.everycrsreport.com/files/2026-09-01_R49326_52044d1339d5734a5792df728c67e8a966d12438.html), [PowerMag – Transformers in 2026](https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/), [SemiAnalysis – US Grid Constraints (2차 인용, 직접 fetch 차단)](https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw)

---

## 2. CAPEX/ROI — 가이던스는 계속 상향, 그러나 신용시장에 첫 균열

| 지표 | 최신 수치 (2026-09) | 이전(07-04) | 비고 |
|---|---|---|---|
| Microsoft CY2026 capex | ~$175B (회계 재분류 — 내용연수 15→25년, 지출 삭감 아님) | $190B(+61%) | **FY2027 가이던스 $255~260B**로 대폭 상향 |
| Alphabet 2026 capex | $195~205B (7/22 상향) | $180~190B | **FCF 사상 최초 마이너스** (-$5.9B, Q2) |
| Amazon 2026 capex | $220B (7/30 상향, 메모리 원가 상승 명시) | ~$200B | TTM FCF 마이너스 -$7.6B (3년 만에 첫 마이너스) |
| Meta 2026 capex | $130~145B (하단 상향, 7/29) | $125~145B | FCF 근소 플러스, 현금 YoY -91% $784M |
| Oracle FY2027 capex | $90~95B (기존 전망 $60B에서 상향) | 미수집 | **S&P BBB-로 강등(투기등급 한 단계 위)**, Moody's 부정적 전망, FY26 FCF -$23.7B |
| Dell'Oro 2030 글로벌 DC capex | **$3조 초과** (2026-08-18 발표) | $1조(2026년만) | 2026년 1월 대비 2030 전망을 거의 두 배로 상향 |
| JPMorgan 2030 누적 AI capex | $5.5조 (불변) | $5.5조(06-25/29 상향분) | 2026-08 노트: "6개월 전보다 경제적으로 더 타당해짐" |
| Goldman Sachs 2026~31 누적 | $7.6조(2026~2031), 2026 $7,650억 → 2031 $1.6조 | 미수집 | 새 장기 프레임 |
| HY OAS | ~266~275bp (8월 말~9월 초) | ~285bp | 소폭 타이트닝(신용비용 하락) — CAPEX 자체는 완화 신호 |
| 클라우드 매출 성장 (Q2 2026) | AWS +37%·Azure +43%·Google Cloud +82% | Q1: AWS+28%·Azure+40%·GCloud+63% | 백로그: MSFT RPO $678B(+84%)·GOOGL $514B·AMZN $496B |
| GPU 임대가 (H100, neocloud) | Blackwell 가용에도 2026년 대부분 **상승세** | 둔화 신호(Vast.ai) | 수요 청산 신호 없음 — Nvidia·SemiAnalysis는 "공급제약"으로 프레이밍 |
| SPV/ABS 데이터센터 부채 | Meta-Blue Owl Hyperion SPV $27B+지분 $2.5B, Oracle Michigan $16.3B(**은행 이탈 후 PIMCO가 $10B 앵커**) | ~$120B 잔존 | 표외부채 확대 지속, 은행 리스크 태도 변화 감지 |
| CoreWeave 신용 리스크 | **CDS 5년물 디폴트 확률 ~50%**, 대출 스프레드 100~125bp 확대(7월말~8월초) | 미수집 | **신규 신용경색 신호** |
| Oracle CDS | 75bp, **7년 최고치** | 미수집 | 신규 신용경색 신호 |
| 하이퍼스케일러 IG 채권 발행 (AMZN·GOOGL·NVDA·META·ORCL·SpaceX) | **$182B (2026 YTD, 전년비 +1,300%)**, 미국 전체 IG 발행의 ~15% | 미수집 | 부채 조달 의존 급증 |
| 2026 미국 DC 캐파 지연 | **30~50%가 2027~28로 이연**(전력·상호접속 사유), MS ~200MW 리스 취소 | 미수집 | SemiAnalysis는 "취소 50%" 주장을 공개 반박("Lease Cancellation Misconceptions") — 이연이지 취소 급증은 아니라는 입장 |

**방향성 평가**: 순수 가이던스·수요 측(4대 빅테크+Oracle 전원 상향, 클라우드 매출 가속, HY OAS 소폭 타이트닝, Dell'Oro/Goldman/JPMorgan 장기 전망 상향)는 **완화 지속**을 시사한다. 그러나 처음으로 재무 마찰이 뚜렷해졌다 — Alphabet·Amazon FCF 마이너스 전환, Meta 현금 급감, Oracle 정크 등급 근접(+은행이 대형 부채딜에서 발 뺌), CoreWeave CDS 50% 디폴트 확률, 8월 한 세션 Nvidia 시총 -$153B 등 두 차례 대형 셀오프. **가이던스와 신용시장이 반대 방향으로 갈리기 시작** — 7월 이전의 순수 완화 추세(46→44→42→40)는 **정체**로 판단하는 것이 합리적이며, credit/CDS 스프레드를 CAPEX 상류 드라이버에 별도 반영할 필요가 있다.

- 출처: [CNBC – Alphabet Q2 2026](https://www.cnbc.com/2026/07/22/google-earnings-q2-goog-live-updates.html), [CNBC – Amazon Q2 2026](https://www.cnbc.com/2026/07/30/amazon-amzn-q2-earnings-report-2026.html), [KuCoin – Meta Q2 2026](https://www.kucoin.com/news/flash/meta-q2-2026-earnings-miss-estimates-capex-guidance-rises-to-145-billion), [S&P Global – Oracle 강등](https://www.spglobal.com/ratings/en/regulatory/article/-/view/sourceId/101695609), [TheNextWeb – Oracle Michigan 파이낸싱](https://thenextweb.com/news/oracle-data-centre-16-billion-financing-stargate), [Dell'Oro – 2030 $3T](https://www.delloro.com/news/ai-buildout-maintains-momentum-as-data-center-capex-surpasses-3-trillion-by-2030/), [Goldman Sachs – Tracking Trillions](https://www.goldmansachs.com/insights/articles/tracking-trillions-the-assumptions-shaping-scale-of-the-ai-build-out), [Yahoo Finance – Burry 숏](https://finance.yahoo.com/news/big-short-investor-michael-burry-130840772.html), [TechTimes – CoreWeave CDS 50%](https://www.techtimes.com/articles/322222/20260730/coreweave-cds-hits-50-default-odds-bond-market-calls-time-gpu-debt-spiral.htm), [Network World – DC 캐파 지연](https://www.networkworld.com/article/4201941/up-to-50-of-data-center-capacity-slated-for-2026-could-be-delayed.html)

---

## 3. 파운드리·패키징 — 파운드리 정체, 패키징은 완만한 완화 속 ABF 신규 병목

| 구분 | 지표 | 최신 (2026-09) | 이전(07-04) | 비고 |
|---|---|---|---|---|
| 파운드리 | TSMC N2 매출 기여 | Q2'26 매출의 3% (Q1 0%에서 상승), 연말 ~100K WPM 목표 유지 | "N2 순항"(정성) | 정량 확인, 궤도 유지 |
| 파운드리 | TSMC 7월 매출 | NT$467.6B, YoY+44.7%·MoM+5.6% | 미수집 | 수요 모멘텀 지속 |
| 파운드리 | ASML EUV 출하 | 2026년 60기+ 목표, 백로그 €38.8B(사상 최고) | 미수집 | 공급 측 강화 |
| 파운드리 | ASML High-NA | TSMC 2029년 이후로 재확인, 신규 변동 없음 | 2029년 이후 연기 | 근시일 리스크 축소 유지 |
| 파운드리 | NVIDIA Rubin 물량 전망 | KeyBanc 2026년 유닛 전망 **170~180만 대로 상향**(4월 하향 이후 재상승), 열 리드(thermal lid) 이슈로 일부 출하 수주 지연 | 22%로 하향(캐파 여유) | **수요 압력 재상승** — 캐파 여유 서사 일부 되돌림 |
| 파운드리 | A16 노드 | 일부 트래커가 2027년으로 양산 슬립 가능성 시사(TSMC 공식 로드맵은 2026 H2 유지) | 미언급 | 신규 주의 플래그(미확정) |
| 패키징 | CoWoS 캐파 목표 | **120~140K WPM**(2026년 말)로 상향 | ~75~80K(2025년말) 대비 목표 상향 | 캐파 상한 자체가 크게 올라감 |
| 패키징 | CoWoS 수급 갭 | 20%→**10%**로 축소(2026년 말까지, TrendForce) | 60% NVIDIA 배정으로 암묵 반영 | 완화 경로 정량 확인 |
| 패키징 | CoWoS 수율/공정 성숙도 | 5.5x 레티클 양산 진입, 수율 98~99%(TSMC, OCP APAC 서밋 8월) | 미수집 | 공정 성숙 뚜렷 |
| 패키징 | NVIDIA CoWoS 배정 | ~60%(~59.5만 장) 불변 | ~60% | 변동 없음 |
| 패키징 | CoPoS(패널 패키징) | 파일럿 라인 2026-06 가동 개시, 수율 성숙까지 ~1년, 양산은 여전히 2028H2~2029 | 2028H2~2029 | 소폭 진전, 일정 자체는 불변 |
| 패키징 | HBM4 본딩 기술 | **SK hynix가 Hot Chips(8월)에서 HBM4E까지 하이브리드본딩 배제를 공식화** — JEDEC 775㎛ 스택 한계 사유로 MR-MUF/마이크로범프 유지, HBM5부터 적용. 삼성은 하이브리드본딩 지속 추진(국내 전용 라인 구축) | 시험수율 ~10%로 업계가 마이크로범프 선회(잠정) | **업계 공식 확정** — 삼성만 하이브리드본딩 고수하는 구도로 재편, 패키징 경쟁축 변화 |
| 패키징 | ABF 기판 공급 | 가동률 **95%+**, 리드타임 12주→**26주**로 거의 2배. 2026H2 갭 ~10%, 2027년 ~20% 전망. Ibiden($3B+)·Unimicron($770M) 증설 발표 | 미수집(기존 "2.5D 부족의 연쇄 병목"으로만 언급) | **신규 정량화된 별도 병목 벡터** — CoWoS 자체 완화와 별개로 부상 |
| 패키징 | HBM4 공급사 배정 | SK hynix 60~70%·삼성 25~30%·Micron 잔여(사전 추정). Micron은 Vera Rubin용 HBM4 양산 확인 | 유사 추정 | 3사 전원 확인 유지 |

**방향성 평가**: **파운드리는 완화 추세가 정체**(56→54→52→50 트렌드 유지 어려움) — 공급 측(N2 램프·ASML)은 계속 좋아지나, Rubin 유닛 전망 재상승과 A16 슬립 플래그가 수요 측 압력을 되돌리고 있다. **패키징은 완만한 완화를 유지**(CoWoS 캐파·수율·갭 모두 개선)하되, HBM4 하이브리드본딩 지연이 업계 공식으로 굳어졌고 ABF 기판이 새로운 정량적 병목으로 부상해 완화 폭을 제한한다.

- 출처: [TweakTown – TSMC 2nm 100K WPM](https://www.tweaktown.com/news/112989/tsmc-is-ramping-up-2nm-production-100k-monthly-wafers-by-the-end-of-2026/index.html), [TSMC PR – 7월 매출](https://pr.tsmc.com/english/news/3329), [CNBC – TSMC 실적](https://www.cnbc.com/2026/08/10/tsmc-revenue-surge-ai-chip-big-tech.html), [TechPowerUp – ASML 60기 EUV](https://www.techpowerup.com/348239/asml-targets-60-euv-shipments-in-2026-as-memory-demand-surges), [NextBigFuture – HBM4·파운드리 한계](https://www.nextbigfuture.com/2026/07/hbm4-and-fab-limits-prevent-1000-vera-rubin-racks-per-day-in-2026-or-2027.html), [AtlasPCB – TSMC CoWoS/CoPoS 캐파](https://www.atlaspcb.com/news/news-tsmc-copos-cowos-advanced-packaging-capacity-2026/), [TrendForce – CoWoS 갭 축소](https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/), [Sedaily – TSMC CoPoS 라인](https://en.sedaily.com/international/2026/08/11/tsmc-completes-line-for-next-gen-copos-packaging-sees-year), [Tom's Hardware – SK hynix 하이브리드본딩 배제](https://www.tomshardware.com/tech-industry/semiconductors/sk-hynix-says-hybrid-bonding-wont-be-ready-for-hbm4e-as-ai-memory-runs-into-a-775-micron-ceiling), [BestPCBs – ABF 부족](https://www.bestpcbs.com/blog/2026/08/abf-substrate-shortage/), [Troy Technical – Ibiden·Unimicron 증설](https://troy-technical.com/2026/06/13/ibiden-and-unimicron-unveil-over-5-billion-investment-to-dramatically-expand-ai-server-abf-substrate-production/), [Micron IR – HBM4 양산](https://investors.micron.com/news-releases/news-release-details/micron-high-volume-production-hbm4-designed-nvidia-vera-rubin)

---

## 4. HBM·DRAM·NAND 시장 — CXMT DRAM 10% 돌파(4대 과점 붕괴), 삼성 HBM4 골든 수율 80%

> **주의**: counterpointresearch.com·techinsights.com·newsletter.semianalysis.com 원문은 이번에도 egress 차단으로 직접 미확인. 아래는 BigGo·Sammy Fans·TechTimes·Seoul Economic Daily 등의 2차 인용(다중 교차확인)이며, wiki 반영 시에도 2차 인용임을 명기.

| 지표 | 2026-07 기준선(wiki) | 최신(2026-09-08 기준, Q2 2026 실측) | 출처 |
|---|---|---|---|
| Samsung HBM 매출 점유율 | 35~40%(Q3'25 22%에서 회복) | **33%** (Q2 2026, 전분기 21%에서 +12%p) | BigGo(2차, Counterpoint 인용), Seoul Economic Daily(2차) |
| SK hynix HBM 매출 점유율 | 50~55% | **50%** (전분기 58%→50%, 격차 37%p→17%p로 축소) | 상동 |
| Micron HBM 매출 점유율 | 명시 없음 | **18%** (Q2 2026) | 상동 |
| DRAM 매출 점유율(전체, Q2 2026) | Q1'26: 삼성 38.5%·SK 28.8%·Micron 22.4%·CXMT 7% | **삼성 39%·SK하이닉스 26%·Micron 25%·CXMT 10%**(신규 진입, 전년 4%) | Sammy Fans(2차, Counterpoint 인용), TechTimes(2차) |
| DRAM 계약가 QoQ(서버) | Q1'26 +90~95%, Q3'26 전망 +13~18%(둔화 신호) | **Q3'26 +13~18% 확정 전망 유지**(TrendForce 2026-07-09), **모바일은 +8~13%로 추가 둔화** | TrendForce 보도자료(1차) |
| NAND 계약가 QoQ | 명시 없음 | Q3'26 **+10~15%**(둔화), Q2'26 NAND 상위5사 매출 +77% QoQ | TrendForce(1차) |
| 2026 메모리 TAM | 명시 없음 | TrendForce 대폭 상향: **$889.3B**(2026, 종전 $551.6B) → **$1.28조**(2027, 종전 $842.7B) | TrendForce 보도자료(1차) |
| DRAM/NAND 수급 시차 | "2027~28 CXMT/YMTC 오버서플라이 리스크" (구분 없음) | **분화 확인**: DRAM은 **2028 Q2까지 지속 타이트**(삼성 자체 경고+UBS), NAND는 **2027 H2**에 균형/오버서플라이로 전환 — NAND가 DRAM보다 먼저 꺾인다 | TweakTown(2차, 삼성 경고), TechTimes(2차) |
| 반독점 소송 | 2026-06-25 제소 직후 | 담당판사 확정(**Noel Wise, N.D. California**), Micron 답변서에서 혐의 부인. DRAM 4년간 ~700% 상승 주장 유지 | Tom's Hardware(2차), TrendForce(1차) |

**주요 신규 시그널**:
- **삼성 HBM4 세계 최초 양산 + "골든 수율" 80% 달성(2026-08-26)** — Q2 HBM 점유율 반등(21%→33%)의 핵심 동인.
- **NVIDIA, Rubin용 HBM4 공급사로 삼성·SK hynix·Micron 전원 인증 완료(2026-06-05 확인 유지)**, Rubin 물량 배분은 SK hynix 60~70%·삼성 25~30% 추정(컨센서스, 편차 있음).
- **삼성, 업계 최초 HBM4E 샘플 고객 출하**(Q2 2026 실적 발표) — HBM4 고객 인증 순항, Q3 매출 급증 전망.
- **SK hynix, 12-Hi HBM4E 샘플 출하(2026-06-18, 16Gbps/pin)**; Hot Chips 2026(8/23)에서 하이브리드본딩은 HBM4E가 아닌 **HBM5부터** 적용 예정이라 공식 발표(775㎛ 두께 한계).
- **CXMT, DRAM 매출 점유율 10% 돌파(Q2 2026, 전년 4%)** — 4대 과점(90%+) 최초 붕괴. SemiAnalysis는 CXMT를 "명백한 4위 DRAM 플레이어"로 지목, 연말 캐파 ~350K WSPM 전망(Micron 근접).
- **Micron NAND 매출 +99.2% QoQ(Q2'26)로 3위 등극**, SK hynix그룹(SK hynix+Solidigm) NAND +89.5%.
- **삼성 Q2 2026 사상 최대 실적**: 매출 KRW171.5조(+28% QoQ·+130% YoY), 영업이익 KRW89.5조(+56% QoQ) — 메모리(DS) 견인, 모바일(MX)은 첫 적자.
- **엔터프라이즈 SSD 상위5사 매출 $37.59B(Q2'26, +103.6% QoQ)**.

- 출처: [BigGo](https://finance.biggo.com/news/7c21d0da-37a2-4724-980d-b9ac6a8974b0), [Seoul Economic Daily](https://en.sedaily.com/finance/2026/09/03/samsung-doubles-hbm-market-share-to-33-percent-narrowing), [Sammy Fans](https://www.sammyfans.com/2026/08/04/counterpoint-research-q2-2026-dram-market-samsung-sk-hynix-micron/), [TechTimes – CXMT 10%](https://www.techtimes.com/articles/326406/20260903/cxmt-hits-10-dram-share-samsungs-hbm-pivot-handed-china-market-vacancy.htm), [TechTimes – 4강 과점 붕괴](https://www.techtimes.com/articles/326440/20260903/cxmt-hits-10-dram-market-share-oligopoly-falls-below-90-two-years-early.htm), [TrendForce – Q3 DRAM/NAND 가격](https://www.trendforce.com/presscenter/news/20260709-13140.html), [TrendForce – NAND](https://www.trendforce.com/presscenter/news/20260818-13186.html), [TrendForce – TAM 상향](https://www.trendforce.com/presscenter/news/20260529-13068.html), [TrendForce – DRAM/NAND 시차](https://www.trendforce.com/news/2026/07/30/), [Tom's Hardware – 반독점](https://www.tomshardware.com/tech-industry/samsung-sk-hynix-and-micron-sued-over-alleged-dram-price-fixing-amid-record-memory-costs), [TechPowerUp – NAND 순위](https://www.techpowerup.com/351676/combined-revenue-of-top-five-nand-flash-brands-rises-77-qoq-in-2q26-micron-moves-up-to-third-place), [Yahoo Finance – 삼성 Q2 실적](https://finance.yahoo.com/technology/articles/samsung-q2-2026-earnings-record-115328985.html)

---

## 5. AI 수요·SemiAnalysis 종합 — 물리적 공급망은 여전히 확장 국면, 신용·주가 변동성이 첫 균열 채널

| 신호 | 2026-07 기준 | 최신(2026-09) | 방향 |
|---|---|---|---|
| Bain AI 자금 갭 | $800B(2025-09 리포트) | 동일 수치가 여전히 참조점, 신규 개정 없음 | 불변 |
| OpenAI 매출 런레이트 | 미수집 | ~$40B ARR(2026-08), QTD +35%, 총마진 33%, 현금소진 2026F ~$27B→2027F ~$63B | 성장하나 소진 가속 |
| Anthropic 매출 런레이트 | 미수집 | ~$47B ARR(OpenAI 추월), Q2 첫 영업이익 ~$559M, $170B→**$965B** 밸류에이션으로 ~$5B 조달 중 | 강세 아웃라이어 |
| Nvidia 분기 실적/주가 | 미수집 | FQ2 FY27 매출 $96.2B(실적), FQ3 가이던스 ~$100B. 단 8월 한 세션 시총 -$153B | 펀더멘털 견조, 변동성 확대 |
| CoWoS 수급 갭 | 미수집 | 20%→10%로 축소(연말까지), NVDA 2026 배정 ~60% | 여전히 확장 국면, 갭은 좁아지는 방향 |
| DC 캐파 지연 | 미수집 | 2026년 미국 DC 캐파의 30~50% 2027~28로 이연(전력·상호접속 사유), MS ~200MW 리스 취소 | 신규 주의 신호이나 4사 합산 capex 가이던스는 불변 |
| CXMT DRAM 캐파 | 오버서플라이 리스크 2027~28로 플래그(구체 수치 없음) | 연말 ~350K WSPM(Micron ~375K 근접), 2026년 +85K WSPM 증설(vs 삼성 15K·SK 60K·Micron 30K), 2030년 30% 점유 목표 | 예상보다 빠른 확장 |
| CXMT HBM | 미수집 | HBM3 배정 5K(2025말)→30K(2026말)→55K WSPM(2027) 캐파 램프, 경쟁력 있는 수율의 양산은 현실적으로 2028년+ | 궤도 진행, HBM 실질 위협은 아직 2년+ |
| YMTC NAND 캐파 | 미수집 | 2026년 말 ~15% 점유·~150K WSPM 목표, 전(全) 국산 장비 시험라인 구축, IPO 추진 | 제재 하에서도 확장 지속 |
| CXMT/YMTC 美 제재 상태 | Entity List(2022~) | 국방부 Section 1260H "Restricted Companies" 리스트에서는 제외, 상무부 Entity List는 유지·H200급 케이스바이케이스 심사는 오히려 강화(2026-01 규칙) | 혼재 — 일부 완화·일부 강화 |
| 中 빅펀드 III | 미수집 | $47.5B(3,440억 위안) 중 상당 부분이 팹 건설에서 **첨단 패키징·장비·AI 칩으로 무게중심 이동**(2026-08-07 확정) — 메모리 직접 보조는 상대적으로 약화 | 메모리向 신규 직접 보조 신호는 약화 |

**신규 신용경색 신호(EWI 관점에서 신규 추가 후보)**: CoreWeave CDS 5년물 디폴트 확률 ~50%, Oracle CDS 7년 최고치, Moody's가 6대 AI capex 지출기업의 신용 질 저하를 명시적으로 경고, 하이퍼스케일러 IG 채권 발행 YoY +1,300%. Michael Burry는 Nvidia·OpenAI·Oracle의 "순환 파이낸싱"을 "구제하기엔 너무 큰 거품"이라 공개 지목, BofA Bubble Risk Indicator 반도체 부문 0.91.

**종합 판단**: 하드웨어·컴퓨트 배분 레이어는 여전히 확장 국면 — CoWoS 갭은 좁아지는 방향, Rubin/HBM4는 일정대로 출하, Nvidia 가이던스는 감속 없음. DRAM은 **2028 Q2까지 지속 타이트**로 오히려 강화된 반면, NAND는 **2027 H2**로 오버서플라이 시점이 앞당겨짐 — 위키의 기존 "2027~28 CXMT/YMTC 오버서플라이" 단일 프레임을 DRAM/NAND 분리 프레임으로 정교화할 필요가 있다. 7월 이후 진짜 새로운 약세 신호는 **물리적 공급망이 아니라 신용·주가 채널**에서 나타났다 — 다음 병목 모델 갱신 시 CAPEX 상류 드라이버에 신용스프레드/CDS를 별도 반영 권고.

- 출처: [CNBC – Moody's 경고](https://www.cnbc.com/2026/07/24/moodys-ai-spending-credit-quality-amazon-meta-alphabet.html), [TweakTown – CXMT 캐파](https://www.tweaktown.com/news/112680/chinas-cxmt-is-on-track-to-nearly-match-microns-dram-production-capacity-by-the-end-of-2026/index.html), [Tom's Hardware – YMTC](https://www.tomshardware.com/pc-components/ssds/chinas-ymtc-moves-to-break-free-of-u-s-sanctions-by-building-production-line-with-homegrown-tools-aims-to-capture-15-percent-of-nand-market-by-late-2026), [WCCFTech – Pentagon 리스트 제외](https://wccftech.com/cxmt-ymtc-removed-from-pentagon-list-opening-door-for-chinese-dram-adoption/), [TrendForce – 빅펀드 III](https://www.trendforce.com/news/2026/08/07/news-chinas-big-fund-phase-iii-pivot-from-fab-building-to-advanced-packaging-equipment-and-ai-chips/), [TweakTown – 삼성 경고](https://www.tweaktown.com/news/112966/memory-shortages-will-get-only-worse-in-2027-and-2028-warns-samsung/index.html), [TechTimes – DRAM/NAND 분화](https://www.techtimes.com/articles/322399/20260731/dram-buyers-face-two-more-years-scarcity-nand-tilts-toward-surplus.htm), [Asia Times – 미중 정상회담·수출 루프홀](https://asiatimes.com/2026/09/nvidia-chip-export-loophole-clouds-us-china-ai-summit-talks/)

---

## 6. 종합 — 4대 병목 방향성 요약 (2026-07-04 → 2026-09-08)

| 병목 | 07-04 지수 | 방향 | 근거 요약 |
|---|---:|---|---|
| 전력 | 72 | **▲ 소폭 악화** | ERCOT 정치적 접속 동결(신규 리스크 유형) + PJM 부족분 예측대로 확대. 상쇄요인(BTM·SMR·PJM 절차개혁)은 병목 우회 수단이지 해소 아님 |
| CAPEX/ROI | 40 | **→ 정체(하방 반전 조짐)** | 가이던스는 전원 상향·클라우드 매출 가속(완화 신호) vs Alphabet·Amazon FCF 마이너스 전환·Oracle 정크 근접·CoreWeave CDS 50%(긴장 신호) — 상충 |
| 파운드리 | 50 | **→ 정체** | 공급측(N2·ASML) 개선 지속 vs Rubin 유닛 전망 재상승·A16 슬립 플래그(수요측 재긴장) |
| 패키징 | 67 | **▼ 완만한 완화 지속(폭 제한)** | CoWoS 캐파·수율·갭 개선 지속 vs HBM4 하이브리드본딩 지연 공식화 + ABF 기판 신규 병목 부상 |

각 지수의 최종 갱신값은 위키 관리자(`wiki/concepts/bottleneck-model-2030.md`) 판단으로 확정한다. 본 문서는 원자료·방향성 평가만 제공한다.
