# 2026년 10월 시장 업데이트 — PJM 2028/29 용량경매 6.8GW 부족·ERCOT 큐 430~470GW·빅테크 2Q 가이던스 상향·CoWoS 공급갭 축소·HBM 점유율 Counterpoint 2Q26

- **수집일**: 2026-10-06
- **이전 스냅샷**: 2026-07-04 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 시도 + PJM·ERCOT·FERC·GE Vernova·TrendForce·Gartner·SEC·각사 IR 등 보강)
- **수집 방법**: 4개 병렬 리서치 에이전트(전력 / CAPEX·ROI / 파운드리·패키징 / HBM·DRAM 시장). **모든 수치는 웹 검색 스니펫 수준**이며 1차 원문(PDF·IR) 미개봉. semianalysis.com·techinsights.com 본문은 접근되지 않았고(검색 스니펫만), counterpointresearch.com은 일부 스니펫 확보. 아래 ⚠️ 표시는 출처 간 충돌·단일 출처·미검증 항목 — 원문 대조 권고.
- **미확인(수집 실패)**: 삼성·SK하이닉스 2026 Q3 잠정실적(10월 초 발표 예정, 미수집), B200 시간당 임대가·H100 임대가 추세, Dell'Oro·JPMorgan 갱신치, PJM Cycle 2 큐, FERC 최종 규칙, NVIDIA CoWoS 배정·Rubin 비중 갱신, 월별 TSMC 7월·9월 매출

---

## 1. 전력망

| 지표 | 최신 수치 | 일자 | 이전 | 출처 |
|---|---|---|---|---|
| PJM BRA 2028/29 신뢰도 요건 대비 부족 | **6,831MW 부족**, 3년 연속 목표 미달, 예비율 14.7% | 2026-07-14 | 07-04 소스: "2030년까지 최대 15GW 구조적 부족"(전망, 다른 지표) | [PJM 발표](https://www.pjm.com/-/media/DotCom/about-pjm/newsroom/2026-releases/20260714-pjm-capacity-auction-procures-138318-mw-of-generation-resources.pdf), [OilPrice](https://oilprice.com/Energy/Energy-General/PJM-Auction-Comes-Up-68-Gigawatts-Short-As-Data-Centers-Devour-Power.amp.html) |
| PJM BRA 2028/29 청산가 | **$325/MW-day(상한 도달)**, 상한 없으면 $554.72, 3회 연속 상한 | 2026-07 | — | [Power Engineering](https://www.power-eng.com/business/policy-and-regulation/pjm-capacity-auction-easily-hits-price-cap-again/) |
| PJM 조달 용량·총비용 | 138,318MW UCAP + FRR 10,864MW = 149,182MW, 총 $16.4B (DC 귀속 약 $6.3B) | 2026-07-14 | — | PJM PDF, [IIR Energy](https://www.industrialinfo.com/iirenergy/industry-news/article/report-data-centers-create-about-us63-billion-in-electric-costs-for-pjm-customers--360334) |
| PJM 신규 대형부하 제도 | 의무 curtailable 대형부하 등록·"Interim Resource Adequacy Service"(자체 용량 없는 신규 대형부하, 2027-06-01~)·Reliability Backstop Procurement 2026-09 개시 | 2026 중반 | — | [DCK](https://datacenterknowledge.com/energy-power-supply/pjm-s-new-deal-for-data-centers-bring-power-or-face-cuts), [energy-storage.news](https://www.energy-storage.news/pjm-targets-data-centre-demand-with-6gw-backstop-auction-bess-expected-to-have-competitive-edge/) ⚠️ 백스톱 규모 6GW vs 60GW 상충 |
| ERCOT 대형부하 큐 | ⚠️ **약 427~474GW**(출처별 427·438·474, DC 89~90%) | 2026-06 | 410GW+(87%) | [ERCOT Senate 패널](https://www.ercot.com/files/docs/2026/07/29/ERCOT-Senate-July-29-Panel-1-Assessing-The-Grid.pdf), [dchub](https://dchub.cloud/news/2026-07-01-ercot-queue-427-gw-39-percent-us) |
| Texas SB6/PUCT 대형부하(>75MW) | 재정보증 $5만/MW(20% 환급)·스크리닝 $10만·원격차단 — 규칙은 2026-03 제안 단계 | 2026-03 | — | [Foley](https://www.foley.com/insights/publications/2026/03/public-utility-commission-of-texas-issues-proposed-rules-for-large-load-interconn/) |
| FERC 대형부하 | 2026-06-18 Section 206 show-cause 6건(PJM·MISO·SPP·CAISO·NYISO·ISO-NE), 응답 08-17, 최종 규칙 아님 | 2026-06-18 | — | [Orrick](https://www.orrick.com/en/Insights/2026/07/FERC-Show-Cause-Orders-Signal-Broad-Reform-to-Large-Load-Interconnection-Policies) |
| GE Vernova 가스터빈 백로그+슬롯예약 | **116GW**(백로그 53+예약 63), 연말 ≥125GW 목표, Q2 신규 20GW | 2026-07-22 | 07-04 소스 110GW(2026말 누적 전망)·1Q말 100GW | [Turbomachinery](https://www.turbomachinerymag.com/view/ge-vernova-gas-turbine-backlog-hits-116-gw-as-power-orders-more-than-double) |
| 대형 변압기 리드타임 | ⚠️ 평균 **128주(약 2.5년)**, 변전 변압기 160주+(2023 ~140주), GSU 160주+, HV 차단기 125주(2023 77주) — WoodMac 인용 | 2026-05 | 07-04 소스 "최대 5년"(범위 상단·소스 상이) | [pv magazine](https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market/), [POWER](https://powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/) |
| SemiAnalysis BTM | BTM AI 컴퓨트용 **확정 주문 75GW**(2Q26 약 20GW), 2028년 40GW+ BTM DC 전력 | 2026 중반 | 07-04: 2028 40GW+ 전망 | [SemiAnalysis](https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw) |
| BTM 사례 | Google 930MW 항공전용 터빈+1GW+ J-class, Google 900MW Bloom(와이오밍), Oracle–Bloom 1.2GW(최대 2.8GW), 식별 BTM 발전의 ~75%가 가스터빈 | 2026 | — | [DataCentres](https://www.datacentres.com/news/behind-the-meter-power-gas-turbines-and-fuel-cells-emerge-as-data-centres-escape-slot1-2026-08-19) |
| 원자력 DC향 커밋 | 13개 프로젝트 9.8GW+(2026-05 기준, 신규 없음) | 2026-05 | 9.8GW+ | [Enki](https://enkiai.com/nuclear/smr-companies-data-centers/) |
| IEA 계통 혼잡 | 계획 DC 프로젝트 ~20% 상당 지연 위험, 접속 대기 일부 지역 최대 10년 | — | 불변 | [Latitude](https://www.latitudemedia.com/news/report-global-grid-congestion-puts-20-of-data-center-projects-at-risk/) |
| EIA 미국 전력판매 2026 | 4,135 BkWh(전년 +~2%), 2026·2027 사상 최고 | 2026-07-07 STEO | — | [roic.ai](https://www.roic.ai/news/us-power-demand-set-to-hit-record-highs-in-2026-and-2027-eia-says-07-07-2026) |

## 2. CAPEX/ROI

| 지표 | 최신 수치 | 일자 | 이전 | 출처 |
|---|---|---|---|---|
| Alphabet 2026 capex | **$195~205B**(Q2 capex $44.9B, FCF −$5.9B), CFO: 2027 "significantly increase" | 2026-07-30 | $180~190B | [Motley Fool](https://fool.com/investing/2026/07/30/alphabet-will-spend-as-much-as-205-billion-this-ye) |
| Amazon 2026 capex | ⚠️ **~$220B**(정확치 검증 필요) | 2026-07 말 | ~$200B | [Webull](https://www.webull.com/news/15277915120215040) |
| Meta 2026 capex | $125~145B(상·하단 각 $10B 상향 보도, 이전 범위 미확인) | 2026-07 말 | $125~145B(07-04 소스) | [Yahoo Finance](https://finance.yahoo.com/markets/article/magnificent-7-earnings-rush-reveals-ai-spending-surge-with-hyperscaler-capex-set-to-reach-725-billion-in-2026-224901707.html) |
| Microsoft CY2026 | ~$190B(메모리 등 부품 가격 귀속 $25B) | 2026-07 말 | ~$190B | [Yahoo Finance](https://finance.yahoo.com/sectors/technology/articles/microsoft-meta-google-just-announced-011712139.html) |
| Big4 합계 | 2026 ~$725B(보도 기준), 2027 애널리스트 전망 $950B~1.2T(가이던스 아님) | 2026-07 | — | Yahoo Finance |
| Oracle FY27 capex | ⚠️ 최대 **$95B**(자체 $70B + 고객 상환 예상 $20~25B), 부채·지분 ~$40B 조달(ATM $20B), RPO $638B(+363%) | FY26 Q4(6월) | ~$50B | [Outlook Business](https://www.outlookbusiness.com/corporate/oracle-forecasts-95-bn-in-capex-for-fy27-plans-to-raise-40-bn-in-debt-and-equity) |
| NVIDIA Q2 FY27 | 매출 **$96.2B**(+106% YoY), 데이터센터 $89B, Q3 가이던스 $108B±2%·GM 74% | 2026-08-26 | — | [Invezz](https://invezz.com/ca/news/2026/08/26/nvidia-stock-slips-1percent-despite-beating-earnings-expectations-and-raising-guidance/) |
| Anthropic 런레이트 | **>$65B**(2026-07 말, Bloomberg 인용) | 2026-08-17 | $47B(2026-05) | [Sovereign](https://www.sovereignmagazine.com/article/anthropic-65-billion-run-rate-ai-bubble-case) |
| OpenAI 런레이트 | ⚠️ ~$40B(미검증) | 2026-08 | — | [SQ Magazine](https://sqmagazine.co.uk/openai-vs-anthropic-statistics.md) |
| CoreWeave 2Q | 매출 $2.58B(+112%), 백로그 $104.2B, 2026 capex $35~39B(이전 $31~35B), 부채 ~$35B, 분기 순이자 $640M(전년 $267M) | 2026-08 | — | [Channelchek](https://dashboard.channelchek.com/?p=104902) |
| US HY OAS | **263bp**(08-27, 월말 범위 263~275bp) | 2026-08-27 | ~285bp | [FRED](https://fred.stlouisfed.org/data/BAMLH0A0HYM2) |
| Goldman HY AI DC 바스켓 | 353bp, 2025~26 발행 AI채 평균 381bp, DC JV 23건 중 17건이 발행 수익률 대비 확대 | 2026 여름 | — | [CryptoBriefing](https://cryptobriefing.com/goldman-sachs-hy-ai-datacenter-spread/) |
| AI 관련 부채 발행 2026 | Goldman ~$500B(미국 IG 공급의 ~18%), JPM >$300B(하이퍼스케일러 ~$120B) | 2026 중반 | SPV·부외부채 ~$120B(07-04) | 동일 |
| H100 임대 | 중앙값 ~$3.37/GPU·h(on-demand $2~7, 스팟 <$2) — 집계 범위, 추세 아님 | 2026 | $2~3(Vast.ai) | [IntuitionLabs](https://intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison) |

## 3. 파운드리·패키징

| 지표 | 최신 수치 | 일자 | 이전 | 출처 |
|---|---|---|---|---|
| TSMC 2Q26 | 매출 $40.2B(+36% YoY)·GM 67.7%·선단 77%, N2 웨이퍼 매출 비중 3% | 2026-07 | — | [TSMC 6-K](https://www.sec.gov/Archives/edgar/data/0001046179/000104617926000451/a2q26e_withguidancexfinal.htm), [noqta](https://noqta.tn/en/news/tsmc-q2-2026-record-earnings-ai-chip-demand) |
| TSMC 3Q26 가이던스 | 매출 $44.6~45.8B, GM 65~67%(N2 램프로 H2 GM 3~4pt 희석) | 2026-07 | — | 동일 |
| TSMC 2026 capex | **$60~64B** | 2026-07 | $52~56B | noqta(2차) |
| TSMC 8월 매출 | NT$514.8B(MoM +10.1%·**YoY +53.3%** 사상 최고), 1~8월 누적 NT$3.387T(+39.3%) | 2026-09-10 | 5월 NT$417B(+30.1%) | [Focus Taiwan](https://focustaiwan.tw/business/202609100014) |
| CoWoS 2026말 | **115~140K WPM** | 2026 | 130K WPM | TrendForce(스니펫) |
| CoWoS 2027 | ~170K WPM(⚠️ 09-14 헤드라인 "2028까지 2배" 본문 미확인) | 2026-09 | 17만 | [TrendForce](https://www.trendforce.com/news/2026/09/14/news-tsmc-reportedly-targets-22-2nm-16-3nm-capacity-boost-by-mid-2027-cowos-to-double-by-2028/) |
| CoWoS 공급갭 | 현재 ~20% → 2026말 ~10% → 2027 완화 | 2026 | — | TrendForce(스니펫) |
| OSAT CoWoS 추가 | +50~60K WPM(업계 합계 ~200K WPM) | 2026 | 24~27만 장/년 외주 | 동일 |
| CoPoS 양산 | 2028~2029(변화 없음) | 2026 | 동일 | 동일 |
| ASML | 2Q26 매출 €9.3B·GM 54%·EUV €3.8B(High-NA 1대 포함), **FY26 가이던스 €43~45B**(1월 €34~39B) | 2026-07-15 | — | [Motley Fool](https://www.fool.com/earnings/call-transcripts/2026/07/15/asml-asml-q2-2026-earnings-call-transcript/), [MarketBeat](https://www.marketbeat.com/instant-alerts/asml-q2-earnings-call-highlights-2026-07-15/) |
| High-NA | ⚠️ Intel이 18A 일부(Core Ultra Series 3)에 High-NA 사용 — TSMC ≥2029 연기와 별개(Intel 한정) | 2026-07 | TSMC ≥2029 | MarketBeat(2차) |
| N2 / SF2 수율 | ⚠️ N2 ~65% vs 삼성 SF2 ~40%(단일 출처·일자 불명) | 2026 | — | [Guru3D](https://www.guru3d.com/story/tsmc-n2-hits-yield-intel-and-samsung-lag/) |
| Intel 18A | 수율 월 7~8% 개선, 2H26 외부 고객 | 2026-05 | — | [TrendForce](https://www.trendforce.com/news/2026/05/19/news-intel-18a-yields-improve-7-8-monthly-with-2h26-customers-expected-reportedly-pushes-18a-cpus-amid-tight-supply/) |
| 삼성 Taylor 2nm | ⚠️ 시험 가동 9월 말~10월 초, 초기 50K WPM, "fully booked"(Tesla AI5·Broadcom·Arm 보도, 미확인) | 2026-09 | — | [Semicone](https://www.semicone.com/article-528.html) |
| HBM4 하이브리드 본딩 | 삼성 샘플 수율 ~10%, SK하이닉스 16-Hi MR-MUF 유지(백업), 20+단에 하이브리드 개발(Hot Chips 2026) | 2026 | ~10% | [Tom's Hardware](https://tomshardware.com/tech-industry/semiconductors/hybrid-bonding-roadmap-examined) |
| ABF 기판 공급갭 | 2H26 ~10% → **2027 ~20% 확대**, 대만 ABF ASP +23%·BT +30%(2026) | 2026 | 2027부터 완화 전망 | [Counterpoint](https://counterpointresearch.com/de/reports/From-T-Glass-Crisis-Capacity-Erosion-The-Multi-Year-Substrate-Shortage) |

## 4. HBM·DRAM·NAND 시장

| 지표 | 최신 수치 | 일자 | 이전 | 출처 |
|---|---|---|---|---|
| SK하이닉스 2Q26 | 매출 ₩79.32T·영업이익 ₩60.54T(+557% YoY, 76%) — 컨센서스 소폭 미달 ⚠️(S&P 헤드라인은 "이익 beat"로 상충) | 2026-07-29 | — | [Blocks&Files](https://www.blocksandfiles.com/flash/2026/07/29/sk-hynix-announces-extraordinarily-high-revenues-but-misses-expectations/5280499), [S&P](https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/08/sk-hynix-postq-profit-beat-offsets-revenue-miss) |
| 삼성 2Q26 | 매출 ₩171.5T·영업이익 ₩89.5T, DS 매출 ₩127.5T·OP ₩89.2T(전사 OP의 99.7%), HBM4E 첫 샘플 출하 | 2026-07-30 | 컨센서스 OP ₩85.34T | [Korea Times](https://www.koreatimes.co.kr/business/companies/20260730/samsung-electronics-posts-q2-profit-of-62-bil-up-nearly-20-fold), [Digital Today](https://www.digitaltoday.co.kr/en/view/87308/samsung-electronics-chip-unit-makes-up-99-7-percent-of-company-operating-profit) |
| 삼성 H2 HBM4 | 3Q HBM4 매출 QoQ 3배+, H2 HBM 매출의 60%+가 HBM4 | 2026-08 | — | [TrendForce](https://www.trendforce.com/news/2026/08/13/news-samsung-sk-hynixs-hbm4-push-puts-hbm-general-memory-pricing-in-the-spotlight-for-2h-earnings/) |
| HBM 점유율 2Q26 (Counterpoint, 매출) | **SK하이닉스 50% · 삼성 33% · Micron 18%**(합 101%, 반올림), 삼성 QoQ +12pp·YoY +18pp(SK 1년 전 64%) | 2026-08~09 | SK 50~55%·삼성 35~40%(06-14 소스, 4월 데이터) | [Counterpoint Korea](https://korea.counterpointresearch.com/global-hbm-market-share-q2-2026/) |
| TrendForce 4Q26 계약가 | 범용 DRAM **+10~15% QoQ**, HBM 포함 DRAM +15~20%, NAND +15~20%(Enterprise SSD +23~28%) | 2026-09-24 | 3Q +13~18% | [TrendForce](https://www.trendforce.com/research/download/RP260924PL) |
| HBM 2027 가격 | ⚠️ HBM4 2027 계약가 최대 +140%(TrendForce via Herald) vs NVIDIA 서버가 +15%↑ 시 HBM +50%↑(08-25) — 범위 상이·미검증 | 2026-08 | — | [Herald](https://biz.heraldcorp.com/article/10852833), [TrendForce](https://www.trendforce.com/news/2026/08/25/news-nvidias-reported-15-server-hike-boosts-samsung-sk-hynix-with-hbm-prices-potentially-up-50-in-2027/) |
| 신규 팹 | SK 용인 1기 클린룸 2027-05→2027-02 앞당김·M15X 2027 중반 램프·삼성 P5 2028·Micron Idaho ID1 2027 이후 | 2026 | — | [TrendForce](https://www.trendforce.com/news/2026/03/05/news-sk-hynix-commits-additional-usd-15-billion-escalating-fab-expansion-race-among-memory-giants/) |
| Gartner 반도체 2026 | 매출 $1.6T(+92%), 메모리 $837B(54%), 2027 메모리 $1T+, DRAM +246.6%·NAND +371.9% | 2026-08-24 | 4월 $1.3T+ | [Gartner](https://gcomdr.pdo.aws.gartner.com/en/newsroom/press-releases/2026-08-24-gartner-forecasts-worldwide-semiconductor-revenue-to-reach-1-trillion-dollars-in-2026) |
| WSTS (2026-05) | 2026 반도체 $1.51T(+90%), 메모리 +~250%·$800B+, 2027 +27% | 2026-05 | — | [WSTS](https://www.wsts.org/esraCMS/extension/media/f/WST/7618/WSTS_FC-Release-2026-May.pdf) ⚠️ 원문 검증 필요 |
| 사이클 코멘터리 | MS 2027 정점 시사·Nomura 신규 공급 2028 초 이전 의미 없음·SK 2027 최악의 부족(2차 소스) | 혼재 | — | [KuCoin](https://www.kucoin.com/blog/2027-memory-chip-boom-sk-hynix-samsung) |

---

## 5. 병목 제약지수 변동 요약 (07-04 → 10-06)

| 병목 | 이전 | 현재 | 변동 | 핵심 근거 |
|---|---:|---:|---:|---|
| 전력 | 72 | **74** | ▲ +2 | PJM 2028/29 6.8GW 부족·가격 상한 3연속·ERCOT 큐 430~470GW·GE Vernova 116GW·변압기 160주+ (BTM 확정주문 75GW는 우회로 증가) |
| CAPEX/ROI | 40 | **40** | ─ 0 | 가이던스 추가 상향(Alphabet $195~205B·Amazon ~$220B·Oracle FY27 ≤$95B)·Anthropic 런레이트 $47B→$65B·HY OAS 263bp 타이트 ↔ Alphabet FCF −$5.9B·AI 부채 ~$500B·DC JV 스프레드 확대·CoreWeave 이자 2.4배 |
| 파운드리 | 50 | **49** | ▼ −1 | TSMC capex $52~56B→$60~64B·8월 매출 YoY +53%·ASML FY26 가이던스 상향·삼성 Taylor/Intel 18A 대안 가시화 ↔ 수요 급증으로 선단 풀 가동 |
| 패키징 | 67 | **66** | ▼ −1 | CoWoS 공급갭 20%→10%·2027 ~17만 WPM·OSAT +5~6만 WPM ↔ ABF 기판 공급갭 2027 ~20%로 확대·CoPoS 2028~29 불변 |
