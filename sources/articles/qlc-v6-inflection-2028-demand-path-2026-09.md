# 차기 전환점 2028 근거·추론 캐시 수요 연도별 경로 팩트 원장

**수집일**: 2026-09-22
**유형**: 웹 검색 기반 2차 자료 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v6.0 개정 — 위키 반영 근거

---

type: research-ledger
agent: R5 Research Agent (facts only, no strategy judgment)
collected: 2026-09-22
scope: (A) 차기 메모리 산업 변곡점 시점 = 2028년 논거 / (B) AI 추론 KV-cache·스토리지 계층 수요 연도별 궤적(EB)
---

# R5 — 2028 변곡점 & 추론 캐시 수요 경로 팩트 레저

## 0. 수집 조건과 한계 (반드시 함께 읽을 것)

| 항목 | 내용 |
|---|---|
| 수집 채널 | **WebSearch만 사용 가능.** 이 세션의 egress proxy가 외부 호스트 직접 fetch를 전면 차단(trendforce.com, blocksandfiles.com, tomshardware.com, digitimes.com, semiwiki.com, sec.gov, counterpointresearch.com, en.wikipedia.org, download.semiconductor.samsung.com 등 시도 12+건 전부 403). |
| 결과 | 모든 사실은 **검색엔진이 해당 페이지에서 추출한 요약**을 근거로 한다. 원문 페이지를 직접 검증하지 못했다. |
| 등급 정책 | 이 제약 때문에, 회사 공식 발표·공식 forecast라 하더라도 **원문 미검증이면 최고 등급을 ✅(출처가 1차 발표자)로 표기하되 "원문 미열람" 주석**을 단다. 언론이 전한 forecast는 🟡. 내가 계산·외삽한 것은 ⚠️. |
| 미완 | WebSearch 예산 소진(200/200)으로 **미수집**: Yole·Gartner·IDC의 2028 명시 수치, SemiAnalysis "Memory Mania" 원문 수치, CXMT/YMTC 2028 capacity 상세, PCIe Gen6 SSD 전환 연도, NVIDIA Dynamo/KVBM·Solidigm·WEKA·VAST의 EB 사이징, TheElec/한경 추가 기사. |

---

# TASK A — 차기 변곡점 시점 (2027 vs 2028)

## A-1. 애널리스트·리서치 하우스의 명시적 연도 표명

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A-01 | TrendForce: 2027년 DRAM·NAND 전망 분기(divergence). 2027년 신규 capacity를 들여오는 공급사가 여럿이나 **건설 일정·장비 반입·원자재 준비 때문에 의미 있는 ramp-up은 2027년 하반기로 밀리고, 실질적 산출 기여는 2028년 전까지 나오지 않는다** | 정성 | 2026-07-30 | https://www.trendforce.com/presscenter/news/20260730-13158.html | ✅ (TrendForce 공식 보도자료, 원문 미열람) |
| A-02 | TrendForce: **"NAND Flash 공급 증가가 2027년 수요를 상회, 2027년 하반기 공급 제약 완화"** — NAND sufficiency ratio가 2027년 플러스 전환 | 정성 | 2026-07-21 | https://www.trendforce.com/presscenter/news/20260721-13148.html | ✅ (TrendForce 공식, 원문 미열람) — **2027론의 최강 근거. 반대 증거로 반드시 병기** |
| A-03 | TrendForce: 2026년 메모리 업계 capex 보수적, bit supply 증가 영향 제한. NAND 2026년 **공급 부족 4~5%**. 유의미한 신규 capacity는 **2027년 이후**에야 도착 | -4~5% (2026 NAND sufficiency) | 2025-11-13 | https://www.trendforce.com/presscenter/news/20251113-12780.html | ✅ (TrendForce 공식, 원문 미열람) |
| A-04 | **Bloomberg Intelligence**: 글로벌 메모리 부족은 **2026년 2분기에 정점**, 2026년 하반기~2027년 완화, **2028년에 공급과잉으로 전환할 수 있다**. "공급 증가가 2028년까지 수요를 따라잡는다"는 논지 | 부족 peak = 2Q26 / 공급과잉 = 2028 | 2026 (Shuli Ren 칼럼 경유) | https://www.fool.com/investing/2026/09/02/is-the-memory-supercycle-peak-near-for-micron-and/ , https://www.blocksandfiles.com/ai-ml/2026/01/21/memory-semiconductor-supercycle-set-to-run-through-2028/4090501 | 🟡 (BI forecast를 언론이 전달) |
| A-05 | Blocks & Files: **"메모리 반도체 슈퍼사이클은 2028년까지 간다"** — DRAM·NAND 모두 최소 2028년까지 공급 부족 | 정성 | 2026-01-21 | https://www.blocksandfiles.com/ai-ml/2026/01/21/memory-semiconductor-supercycle-set-to-run-through-2028/4090501 | 🟡 |
| A-06 | **Goldman Sachs**: DRAM 공급부족 **-5.0%(2026)**, **-5.9%(2027, 기존 -2.5%에서 하향 = 부족 심화)**; NAND 부족 **-4.4%(2026)**, **-4.6%(2027)**. 2027년 conventional DRAM·NAND·HBM 모두 2026년보다 타이트하고, **그 타이트함이 2028년까지 연장**. 삼성전자 목표주가 +50%, SK하이닉스 +94%, 키오시아 Buy 상향 | -5.0%/-5.9% (DRAM), -4.4%/-4.6% (NAND) | 2026-06 | https://www.benzinga.com/markets/tech/26/06/52907425/goldman-memory-shortage-2028-samsung-hynix-kioxia-sandisk-micron , https://www.techflowpost.com/en-US/article/31838 | 🟡 (GS 리포트를 언론이 전달) |
| A-07 | **Morgan Stanley**: 강한 AI 수요와 HBM cannibalization이 **2026~2027년에는 중국 신규 capacity를 흡수**하지만, **2028년 이후 수요가 둔화되는 동시에 신규 capacity가 동시 가동되면 공급과잉 리스크가 크게 상승**. 특히 NAND 중심 | 정성, "after 2028" | 2026 | https://finance.biggo.com/news/73c68a65-1a03-42dd-b312-8e64fbe03793 , https://finance.biggo.com/news/28a22979-0337-4a2e-aec3-e66ef2e7915b | 🟡 |
| A-08 | Morgan Stanley: 중국 메모리 2사(CXMT/YMTC)가 **2028년까지 글로벌 수급 구조를 재편**할 수 있고, ChangXin(CXMT) capacity가 Micron을 상회 | 정성 | 2026 | https://finance.biggo.com/news/28a22979-0337-4a2e-aec3-e66ef2e7915b | 🟡 (상세 수치 미수집) |
| A-09 | Morgan Stanley: 메모리 contract price는 **2026년 4분기 정점** 예상 ("Memory Winter" 경고 재발행). 한국 증권사들은 반박(SK하이닉스 목표가 ₩600,000) | peak = 4Q26 | 2026 | https://finance.biggo.com/news/29d1ad5a-09f4-4a2e-820a-39003cf9f046 , https://finance.biggo.com/news/4ced9a5c-8fa3-4a1b-91f6-39971e1a5a08 | 🟡 |
| A-10 | StorageSwiss: **"정상 가격·정상 가용성으로 돌아가는 건 2028~2029년에 더 가깝다"** | 정상화 = 2028~2029 | 2026-05-06 | https://storageswiss.com/2026/05/06/memory-and-flash-prices-not-coming-down/ | 🟡 |
| A-11 | Counterpoint: 2027년은 고단수 NAND로의 가속 마이그레이션 + 신규 팹의 점진 ramp로 **2026년보다 훨씬 강한 bit supply 증가**. 다만 "정상 가격·가용성 복귀"는 **2028~2029년** | 정성 | 2026 | https://counterpointresearch.com/en/insights/server-led-essds-hit-48-percent-of-nand-shipments | 🟡 |
| A-12 | Micron 실적 컨센서스: EPS가 **FY2028(2028년 8월 종료)에 $170.70로 정점** 후 FY2029 $121.77로 하락. 이익은 **2027년 하반기 정점 → 2028년에 걸쳐 가격 정상화되며 점진 하락** | $170.70 → $121.77 | 2026-09-02 | https://www.fool.com/investing/2026/09/02/is-the-memory-supercycle-peak-near-for-micron-and/ | 🟡 |
| A-13 | Analysis.org 헤드라인: **"SanDisk: 2027년의 NAND 공급 파도는 2029년에 도착한다"** (공급 파도의 실제 착지 시점이 뒤로 밀린다는 논지) | 정성 | 2026 | https://analysis.org/sandisk-sndk-the-2027-nand-supply-wave-arrives-in-2029/ | ⚠️ (헤드라인만 확인, 본문 미검증) |
| A-14 | SK하이닉스 CEO: 메모리 부족이 **2030년까지** 이어질 수 있다 (극단적 강세론 — 2028 변곡점론과 충돌하는 반대 증거로 기록) | ~2030 | 2026 | https://www.techpowerup.com/352156/sk-hynix-ceo-says-memory-shortage-will-last-through-2030 | 🟡 |
| A-15 | 국내 보도: D램·낸드가 **올해부터 2028년 말까지 공급 부족 유지** 전망 ("월가의 파격 전망") | ~2028년 말 | 2026-06-09 | https://m.joseilbo.com/news/view.htm?newsid=569715 , https://m.news.nate.com/view/20260609n28728 | 🟡 |
| A-16 | 국내 보도: HBM이 연 D램 슈퍼사이클, **2028년까지 공급난 지속** 전망 | ~2028 | 2026 | https://www.epnc.co.kr/news/articleView.html?idxno=326298 | 🟡 |

**A-1 요약**: 2028년을 지목하는 방식이 두 갈래로 갈린다. (i) **"부족이 2028년까지 간다"**(Goldman A-06, Blocks&Files A-05, 국내 A-15·A-16) → 즉 2028년이 **부족 국면의 끝 = 변곡점**. (ii) **"2028년에 공급과잉으로 전환한다"**(Bloomberg Intelligence A-04, Morgan Stanley A-07) → 2028년이 **downcycle 진입 연도**. 두 갈래 모두 **변곡점을 2028년에 놓는다**. 2027년을 지목하는 유일한 주요 근거는 TrendForce의 NAND 한정 sufficiency 전환(A-02).

---

## A-2. 신규 팹·capacity가 실제로 가동되는 시점 (2028론의 물리적 근거)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A-20 | **삼성 평택 P5**: 가동 목표 **2028년**. P4는 그보다 훨씬 앞선 ~2026년. 공기를 1년 단축해 내년(2027) 완공 → 7월부터 장비 반입 → **이르면 2028년 클린룸 가동**. 가로 650m × 세로 195m, 3층, 클린룸 6개(= P4 대비 1.5배). 투자 **$34.5B+** | 클린룸 가동 2028 / 클린룸 6개 = P4의 1.5배 | 2025-12 ~ 2026-05 | https://dealsite.co.kr/articles/164110 , https://www.kedglobal.com/korean-chipmakers/newsView/ked202605070006 , https://kr.economy.ac/news/2025/12/202512285984 | 🟡 |
| A-21 | **삼성 P5 NAND 증설 투자 결정** (AI發 가격 상승 근거) | — | 2026-04-14 / 2026-04-21 | https://www.thebell.co.kr/front/newsview.asp?key=202604141533431160102114 , https://www.digitimes.com/news/a20260421PD213/nand-demand-samsung-expansion-nand-flash.html | 🟡 |
| A-22 | **SK하이닉스 청주 M17 (NAND)**: 투자 **₩19.1조**, 2025년 2월 착공, **클린룸 개방 목표 2028년 12월**. 연면적 20만6000평 | 클린룸 오픈 **2028-12** | 2026-08 | https://dealsite.co.kr/articles/166824 , https://www.kcenews.kr/9185 | 🟡 |
| A-23 | **SK하이닉스 용인 Y2 + 청주 M17 합계 ₩54조** 투자 확정. 용인 **Y1 클린룸 가동 2027년 2월** | ₩35.2조(Y2) + ₩19.1조(M17) | 2026-08-07 | https://m.news.nate.com/view/20260807n22211 , https://www.kcenews.kr/9185 | 🟡 |
| A-24 | 국내 보도 제목: **"SK하이닉스 신규 팹, 2028년 말 전(前) 양산 공급 제한 전망"** — 신규 팹이 2028년 말 이전에는 양산 공급에 기여하지 못함 | **~2028년 말** | 2026-08-16 | https://www.g-enews.com/article/Global-Biz/2026/08/20260816081401772fbbec65dfb_1 | 🟡 |
| A-25 | **SK하이닉스 M15X**: HBM4 양산 팹. 가동 목표가 **2028년 초 → 2027년 말로 앞당겨짐** (=DRAM/HBM은 2027년, NAND는 2028년으로 갈린다) | 2027년 말 | 2026 | https://introl.com/blog/south-korea-hbm4-stargate-memory-supercycle-2026 , https://semiwiki.com/forum/threads/samsung-and-sk-are-expanding-fast-but-why-is-memory-still-in-short-supply.24881/ | 🟡 |
| A-26 | **Micron 싱가포르 10B NAND 팹**: 착공 완료, **2028년 하반기 웨이퍼 생산 목표**, 기존 10A/X 대비 **2배 이상 capacity** | 웨이퍼 생산 **2H2028**, capacity >2× | 2026 | https://www.atlaspeakresearch.com/report/af2410 , https://m.g-enews.com/view.php?ud=202603040924561862fbbec65dfb_1 | 🟡 |
| A-27 | **Kioxia/SanDisk**: 2032년까지 요카이치+기타카미에 **¥5조($31B+)** 투자. 기타카미 **K3(Fab3)에 ¥1.8조, 생산 목표 FY2029**. 추가 ¥1조+ 신규 팹은 **2029년 이후 가동**. 종합 논평: **"$31B NAND 계획은 FY2029까지 새 비트를 만들어내지 않는다"** | 신규 비트 = **FY2029** | 2026-08-27 / 2026-08-28 | https://www.blocksandfiles.com/flash/2026/08/28/sandisk-and-kioxia-have-yen-for-new-nand-fabs/5293245 , https://www.trendforce.com/news/2026/08/27/news-kioxia-reportedly-plans-jpy-1t-nand-fab-in-japan-operations-eyed-for-2029-or-later , https://k4i.com/kioxia-and-sandisks-31-billion-nand-plan-produces-no-new-bits-until-fiscal-2029/ | 🟡 |
| A-28 | Kioxia/SanDisk **기타카미 Fab2 가동 개시 2025-09-30**; **BiCS10(332층) 생산 개시 2026-07-02** (= 현재 사이클의 공급 증분은 기존 팹 + 공정전환에서 나온다) | — | 2025-09-30 / 2026-07-02 | https://www.kioxia.com/en-jp/about/news/2025/20250930-1.html , https://www.sandisk.com/company/newsroom/press-releases/2026/2026-07-02-kioxia-sandisk-begin-production-10th-gen-3d-flash-memory-kitakami | ✅ (회사 공식 보도자료, 원문 미열람) |
| A-29 | 일반 원칙: 신규 팹의 12~18개월 리드타임 때문에 **2024~2025년 초 결정이 2026년 중반까지의 공급을 결정**. **오늘 발표되는 증설은 2027~2028년 전까지 산출 증가로 이어지지 않는다** | 리드타임 12~18개월 | 2026 | https://octopart.com/pulse/p/how-ai-broke-memory-market , https://semiwiki.com/forum/threads/samsung-and-sk-are-expanding-fast-but-why-is-memory-still-in-short-supply.24881/ | 🟡 |
| A-30 | 삼성·SK하이닉스의 계획 증설은 **2027~2028년 사이 가동**되나 ramp-up 기간이 추가로 필요. 구체적으로 **건설 완료 2027년 상반기 → 직후 장비 반입 → 양산 목표는 2028년 후반** | 양산 = **2H2028** | 2026 | https://www.buysellram.com/blog/will-samsung-and-sk-hynixs-550-billion-in-new-fabs-ease-the-memory-shortage/ , https://storageswiss.com/2026/05/06/memory-and-flash-prices-not-coming-down/ | 🟡 |
| A-31 | **SEMI**: WFE 매출 $116.9B(2025) → **$143.9B(2026, +23.1%)** → **+21.8%(2027)** → **+14.1%(2028), $200B 도달**. 300mm 팹 장비 지출은 $133B(2026, +18%) → $151B(2027, +14%) → **$155B(2028, +3%)** | 2028 300mm 장비 지출 증가율 **+3%** (2027 +14% 대비 급감) | 2026 | https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-sales-forecast-to-reach-a-record-229-billion-dollars-in-2028-semi-reports , https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027 | ✅ (SEMI 공식, 원문 미열람) |
| A-32 | **SEMI**: 300mm 메모리 capacity **4.1M wpm(2026) → 4.2M wpm(2027)**. 전체 300mm capacity는 2024년 말~2028년 CAGR 7%로 **11.1M wpm(2028) 사상 최고**. 2028년까지 advanced chipmaking capacity **+69%** | 4.1M→4.2M wpm; 11.1M wpm (2028) | 2026 | https://www.semi.org/en/semi-press-release/semi-forecasts-69-percent-growth-in-advanced-chipmaking-capacity-through-2028-due-to-ai | ✅ (SEMI 공식, 원문 미열람) |

**A-2 요약 (물리적 논증)**: 2025~2026년에 발표·착공된 **NAND 신규 capacity의 클린룸 개방·웨이퍼 산출 시점이 거의 전부 2028년에 몰린다** — SK하이닉스 M17 클린룸 2028-12(A-22), 삼성 P5 클린룸 2028(A-20), Micron 싱가포르 10B 웨이퍼 2H2028(A-26), 업계 일반 양산 목표 2H2028(A-30). Kioxia/SanDisk만 더 늦은 FY2029(A-27). 반면 DRAM/HBM 쪽 M15X는 2027년 말로 앞당겨졌다(A-25) → **DRAM은 2027년, NAND는 2028년**이라는 비대칭이 물리 일정에 박혀 있다. SEMI의 300mm 장비 지출 증가율이 2027년 +14% → **2028년 +3%로 급락**(A-31)하는 것도 "2028년에 capacity 투입이 끝나고 산출이 나온다"는 구조와 정합적이다.

---

## A-3. AI capex 궤적 — 2027~2028 감속·소화(digestion)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A-40 | **UBS 하이퍼스케일러 capex**: 2025 **$492B** → 2026 **$1.009T** → 2027 **$1.447T** → 2028 **$1.619T**. YoY 증가율 = **+105%(26) → +43%(27) → +12%(28)** — 감속이 **2028년에 집중** | +105% / +43% / **+12%** | 2026 | https://techstock01.substack.com/p/hyperscalers-what-is-consensus-forecasting , https://alcapitaladvisory.com/research/intelligence/ai-infrastructure.html | 🟡 (UBS 추정치를 2차 매체가 전달) |
| A-41 | 컨센서스: 하이퍼스케일러 capex 2027년 **$920B**, 증가율 **84%(2026) → 22%(2027)**로 급감. 일부 컨센서스는 **2027년부터 증가율 10% 이하로 plateau** | 84% → 22% → ≤10% | 2026 | https://techstock01.substack.com/p/hyperscalers-what-is-consensus-forecasting | 🟡 |
| A-42 | 6대 하이퍼스케일러가 **2027년 capex $1.3조** 지출 전망, 그중 **FCF 플러스는 1곳뿐** | $1.3T (2027) | 2026 | https://www.aol.com/articles/6-hyperscalers-driving-ai-revolution-104200000.html | 🟡 |
| A-43 | **Goldman Sachs**: 컨센서스의 2027년 하이퍼스케일러 capex 추정치는 **너무 보수적**이라는 반대 견해 (2027 감속론에 대한 반증) | 정성 | 2026 | https://finance.yahoo.com/sectors/technology/articles/goldman-says-consensus-2027-hyperscaler-140152065.html | 🟡 |
| A-44 | **감가상각 벽(depreciation wall)**: 2028년까지의 누적 "억제된 감가상각"이 약 **$200B**, 연도별로 **$46B(2026) / $75B(2027) / $107B(2028)** — 손익 타격이 **2028년에 최대** | $46B/$75B/**$107B** | 2026 | https://footnotebrief.com/hyperscaler-depreciation-ai-capex-circularity/ , https://siliconanalysts.com/analysis/hyperscaler-ai-capex-depreciation-wall-2026 | 🟡 |
| A-45 | **S&P Global**: 하이퍼스케일러 그룹에 대해 **2028년 변곡(inflection)** 가정 — capex가 flatten되고 매출이 가속, FCF 플러스 복귀 | **inflection = 2028** | 2026 | https://alcapitaladvisory.com/research/intelligence/ai-infrastructure.html | 🟡 |
| A-46 | 하이퍼스케일러는 클라우드 매출의 **102%를 capex로** 지출 중 (자금 지속가능성 압박 근거) | 102% | 2026 | https://finance.yahoo.com/technology/ai/articles/ai-absurd-spending-boom-hyperscalers-162709082.html | 🟡 |
| A-47 | 하이퍼스케일러가 capex가 현금흐름을 초과하며 **외부 조달(external financing)에 의존** 시작 | 정성 | 2026 | https://insight.factset.com/hyperscalers-tap-external-financing-as-ai-capex-outruns-cash-flow | 🟡 |

**A-3 요약**: capex의 절대액은 2028년에도 증가하지만 **증가율이 2028년에 +12%(UBS)로 무너지고**(A-40), **감가상각 부담은 2028년 $107B로 최대**(A-44)가 되며, **S&P Global은 2028년을 명시적 inflection 연도로 가정**(A-45)한다. 즉 수요측(AI capex) 감속과 공급측(신규 NAND 팹 가동)이 **같은 해 2028년에 교차**한다.

---

## A-4. 역사적 사이클 주기

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A-50 | **2016년 이후 메모리 산업은 3개 사이클을 거쳤고, 각각 3~4년 길이** | 3~4년/사이클 | — | https://www.moomoo.com/community/feed/from-a-purely-economic-and-cyclical-perspective-the-current-high-117091782885381 , https://www.itiger.com/news/1174981598 | 🟡 |
| A-51 | 2018~2019 다운턴: 메모리 가격 **-60~80%** 폭락, 업계 전반 손실 | -60~80% | 2018–2019 | 위와 동일 | 🟡 |
| A-52 | 2022~2023 다운턴: 가격 **반토막**, 중소 업체 대거 정리 | -50% | 2022–2023 | 위와 동일 | 🟡 |
| A-53 | **외삽**: 2023년 저점 기준 3~4년 주기 → 상승국면 2024~2027, **다음 하강 진입 2027~2028**. 단 "AI 수요가 전통 주기를 이탈시켰다"는 반론 병존 (HBM capacity sold-out, 3사 과점 가격 규율) | 2027~2028 | — | https://www.uncoveralpha.com/p/every-memory-cycle-ends-the-same , https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades | ⚠️ (주기 길이는 🟡이지만 외삽은 내 계산) |
| A-54 | 반론: 이번 사이클은 구조적으로 다르며 "downturn은 더 얕고 through-cycle 수익성은 구조적으로 높다"는 견해. HSBC는 "AI 메모리 슈퍼사이클은 아직 중간 지점" | 정성 | 2026 | https://www.uncoveralpha.com/p/every-memory-cycle-ends-the-same , https://www.tradingkey.com/analysis/stocks/us-stocks/261731973-memory-ai-turboquant-dram-hbm-nand-chips-stocks-correction-cycle-tradingkey | 🟡 |

---

## A-5. 기술 로드맵 타이밍 중 2028년을 가리키는 것

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A-60 | **Hybrid bonding(W2W)이 HBM4·HBM4E를 건너뛰고 HBM5부터 주류화**. HBM5(20-Hi) 기준 **2028~2029년**. SK하이닉스는 Hot Chips 2026에서 "HBM4E에도 hybrid bonding은 준비 안 됨, MR-MUF를 NVIDIA Rubin까지 연장" 발표 | HBM5 = **2028~2029** | 2026-08 (Hot Chips 2026) | https://www.tomshardware.com/tech-industry/semiconductors/sk-hynix-says-hybrid-bonding-wont-be-ready-for-hbm4e-as-ai-memory-runs-into-a-775-micron-ceiling , https://semiengineering.com/hbm4-sticks-with-microbumps-postponing-hybrid-bonding/ | 🟡 |
| A-61 | HBM4E 양산은 **2027년** 시간대 | 2027 | 2026 | https://www.allpcb.com/allelectrohub/hybrid-bonding-to-debut-with-hbm4e | 🟡 |
| A-62 | **SK하이닉스 인디애나 advanced packaging 공장($3.87B) 생산 개시 2028년** | $3.87B, 2028 | 2026 | https://www.tomshardware.com/tech-industry/semiconductors/hybrid-bonding-roadmap-examined | 🟡 |
| A-63 | **삼성: 2030년 1,000층 NAND 목표, 400층 단계에서 wafer bonding 도입**. V10(약 420~430층)은 2025년 하반기 양산 | 400층에서 wafer bonding, 1,000층 = 2030 | 2025-02 | https://www.trendforce.com/news/2025/02/26/news-samsung-reportedly-targets-1000-layer-nand-by-2030-rolls-out-wafer-bonding-at-400-layers/ , https://www.techpowerup.com/333155/samsung-aims-for-1-000-layer-nand-by-2030-begins-wafer-bonding-at-400-layers | 🟡 |
| A-64 | **Kioxia/SanDisk, VLSI 2026에서 multi-stack CBA QLC 세계 최초 시연**: 218층 셀 어레이 웨이퍼 2장 + CMOS 웨이퍼 본딩 = **436층 상당** 소자, QLC 동작 확인. Kioxia는 **2027년까지 100 Gbit/mm², 1,000 wordline 3D NAND** 목표 | 436층 상당 / 100 Gbit/mm² by 2027 | 2026-05 | https://www.trendforce.com/news/2026/05/04/news-kioxia-sandisk-to-demonstrate-qlc-nand-using-multi-stacked-cell-architecture-targeting-1000-layers/ , https://kantenna.com/topic/kioxia-sandisk-1000-layer-3d-nand-vlsi-2026-world-first | 🟡 |
| A-65 | VLSI 발표→상용 제품 통상 간격 기준, **MSA/CBA 기반 첫 상용 칩은 2027~2028년**, 본격 1,000층급은 **2029~2030년** | 상용화 **2027~2028** | 2026 | https://kantenna.com/topic/kioxia-sandisk-1000-layer-3d-nand-vlsi-2026-world-first , https://semiengineering.com/nand-flash-targets-1000-layers/ | 🟡 |
| A-66 | Kioxia BiCS8(218층)에서 CBA 세계 최초 양산, 현재 **BiCS10(332층) ramp 중** | 218층 → 332층 | 2026 | https://convergedigest.com/sandisk-bics9-bics10-hbf-nand-technology-roadmap/ | 🟡 |
| A-67 | **합성 추론**: 비트 밀도의 계단식 점프(multi-stack CBA, 400→500층대)가 **2027~2028년에 제품화**되는데(A-64·A-65), **같은 시기 신규 팹 shell이 열린다**(A-20~A-26). 공정전환發 비트 증분과 신규 웨이퍼 증분이 **2028년에 중첩**된다 | — | — | (A-20~A-26, A-64~A-66 종합) | ⚠️ (내 합성, 단일 출처 없음) |

**미수집**: PCIe Gen6 SSD 전환 연도, 3D DRAM 양산 연도에 대한 명시적 2028 로드맵 문장 (검색 예산 소진).

---

## A-6. 시장 현황 baseline (2026년)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A-70 | Counterpoint: **NAND 수요 2026년 +20~22% YoY vs 공급 +15~17%**. NAND 매출 **+112% YoY, $147.3B(2026)** | 수요+20~22% / 공급+15~17% | 2026 | https://counterpointresearch.com/en/insights/nand-revenues-record-high-q1-2026-from-ai-demand | 🟡 |
| A-71 | Counterpoint: eSSD가 **Q1 2026 NAND 시장의 43%**, 2026년 말 **60% 돌파** 전망; **Q2 2026 출하 비트의 48%**가 eSSD. **YMTC가 글로벌 톱3 진입** | 43% → 48% → 60% | 2026 | https://counterpointresearch.com/en/insights/server-led-essds-hit-48-percent-of-nand-shipments , https://www.eetasia.com/server-led-essds-hit-48-of-nand-shipments/ | 🟡 |
| A-72 | 글로벌 NAND 시장 **Q1 2026 사상 최대 $46B** | $46B | 2026 Q1 | https://counterpointresearch.com/en/insights/nand-revenues-record-high-q1-2026-from-ai-demand | 🟡 |
| A-73 | TrendForce: DRAM 계약가 **Q2 +63%, NAND +75%** (Q1의 +95%에 이어) | +63% / +75% | 2026 | https://www.tomshardware.com/pc-components/dram/dram-and-nand-contract-prices-to-climb-again-in-q2 | 🟡 |
| A-74 | 국내 보도: **2028년 DRAM 130% 폭등 → 50만원대 PC 소멸** 시나리오 (수요측 가격 파괴 임계) | +130% | 2026-03-04 | https://m.g-enews.com/view.php?ud=202603040924561862fbbec65dfb_1 | ⚠️ (선정적 기사, 방법론 미검증) |
| A-75 | 이번 사이클 투자의 특징: **증설이 아니라 '공정 전환'에 집중**. 메이저들이 현행 노드 라인을 크게 늘리기보다 차세대 미세공정 개발에 자금 투입 | 정성 | 2026 | https://www.smarttoday.co.kr/ko-kr/articles/110990 | 🟡 |

---

# TASK B — AI 추론 KV-cache / 스토리지 계층 수요 연도별 궤적 (EB)

## B-1. 발표된 forecast 시계열 (있는 것만)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| B-01 | **McKinsey baseline**: 전체 **enterprise SSD 시장이 연 35%씩 성장, 181 EB(2024) → 1,078 EB(2030)**. 최대 성장 동인은 추론 AI 서버 + RAG 데이터베이스 배치 | **181 EB(2024) → 1,078 EB(2030), CAGR 35%** | 2025 | https://www.mckinsey.com/industries/semiconductors/our-insights/generative-ai-spurs-new-demand-for-enterprise-ssds | ✅ (McKinsey 자체 forecast, 원문 미열람) |
| B-02 | **McKinsey**: 그중 **AI 추론용 SSD = 447 EB, 전체의 41%** (2030) | **447 EB (2030), 41%** | 2025 | 동일 (2차 인용: https://gtoai.substack.com/p/the-handover-of-power-in-nand ) | ✅/🟡 |
| B-03 | **SanDisk (FMS 2026)**: **KV cache만으로 2027년에 추가 75~100 EB의 NAND 수요**, 그 수치가 **1년 뒤(2028년) 두 배** | **2027: 75~100 EB → 2028: 150~200 EB** | 2026-08 (FMS 26) | https://www.kucoin.com/news/flash/sandisk-predicts-kv-cache-to-drive-35-of-ai-data-center-nand-workloads-by-2030 , https://globalsemiresearch.substack.com/p/the-handover-of-power-in-nand | ✅ (SanDisk 자체 추정, 원문 미열람) |
| B-04 | **SanDisk**: **KV cache가 2030년 AI 데이터센터 NAND 워크로드의 35%** 차지 | **35% (2030)** | 2026 | https://www.kucoin.com/news/flash/sandisk-predicts-kv-cache-to-drive-35-of-ai-data-center-nand-workloads-by-2030 | ✅/🟡 |
| B-05 | **SanDisk Investor Day (2026-08-13)**: AI 데이터센터용 flash TAM **1.2 ZB(=1,200 EB) by 2030**; 올해 데이터센터가 비트의 **50%**; **persistent KV Store 설치기반(installed base) >1 ZB by 2030**; KV cache가 메모리 계층을 **Tier 3.5**로 재편 | **1.2 ZB (2030) / KV store IB >1 ZB (2030)** | 2026-08-13 | https://www.sandisk.com/company/newsroom/press-releases/2026/2026-08-13-sandisk-investor-day-2026 , https://counterpointresearch.com/en/insights/sandisk-investor-day-caching-out-the-nand-cycle-with-contracts , https://stockanalysis.com/stocks/sndk/transcripts/708061-investor-day-2026/ | ✅ (회사 IR, 원문 미열람) |
| B-06 | **SanDisk**: 2026년 데이터센터가 NAND 최대 시장이 되며 **60EB대 후반(high 60s EB)의 증가** | **+~68 EB (2026 증분)** | 2026 | https://globalsemiresearch.substack.com/p/the-handover-of-power-in-nand | 🟡 |
| B-07 | **Tom Coughlin / Forbes**: 2026년 HDD 출하 용량 **~2,017 EB** 중 **~363 EB(18%)가 AI 인프라 직접 기인**. AI 비중이 **2028년 43%**, **2030년 58%**로 상승 | 2026: 363 EB / 18% → **2028: 43%** → 2030: 58% | 2026-05-30 | https://www.forbes.com/sites/tomcoughlin/2026/05/30/how-has-ai-changed-hard-disk-drive-storage-demand/ | 🟡 (HDD 기준, NAND 아님) |
| B-08 | 전체 NAND: **2023년 수요 800 EB 초과**, **2030년 1,300 EB 초과** 전망 | 800 EB(2023) → 1,300 EB(2030) | — | https://www.congruencemarketinsights.com/report/nand-flash-memory-market | ⚠️ (시장조사사 2차, 방법론 불명) |
| B-09 | **상충 주의**: 다른 2차 자료는 **2024년 글로벌 NAND bit 출하가 1,500 EB 초과**, 그중 65%+가 SSD라고 기술 → B-08(2023년 800 EB)과 **정합하지 않음**. 두 수치를 함께 쓰면 안 됨 | 1,500 EB (2024) | — | https://www.marketgrowthreports.com/market-reports/nand-flash-market-101290 | ⚠️ (모순 플래그) |
| B-10 | Enterprise SSD 수요 **2026년 +41%** | +41% | 2026 | https://www.avnet.com/integrated/resources/article/2026-memory-shortage-ai-supercycle/ | 🟡 |

## B-2. 단위 경제 (bottom-up 앵커)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| B-20 | **Micron**: KV cache offloading은 장문맥 추론을 **토큰당 약 300~350 KB**의 스토리지 문제로 바꾼다 | **300~350 KB/token** | 2026 | https://www.micron.com/about/blog/memory/dram/unlocking-the-token-economy-micron-powers-ais-kv-cache | ✅ (Micron 공식 블로그, 원문 미열람) |
| B-21 | **Agentic 워크로드는 표준 추론 대비 10~40배 capacity 요구**. 멀티턴 워크플로가 수 시간~수일 지속 | **10~40×** | 2026 | 동일 / https://www.micron.com/about/blog/storage/ai/emerging-storage-requirements-for-the-evolution-of-ai-workloads | ✅/🟡 |
| B-22 | **Micron**: 2030년까지 **추론이 전체 AI 컴퓨트 수요의 70~90%** 차지 | 70~90% (2030) | 2026 | https://www.micron.com/about/blog/memory/dram/bottlenecks-to-breakthroughs-the-future-of-memory-and-storage | ✅/🟡 |
| B-23 | 평문을 embedding·KV·멀티모달 포맷으로 변환하면 **용량이 5~1,000배 팽창** | 5~1,000× | 2026 | https://globalsemiresearch.substack.com/p/the-handover-of-power-in-nand | 🟡 |
| B-24 | SanDisk: KV cache 워크로드 전용 **PCIe Gen5 엔터프라이즈 드라이브 최대 256 TB** 공개 | 256 TB/drive | 2026 | https://itbrief.asia/story/sandisk-unveils-nand-technologies-for-ai-inference | 🟡 |
| B-25 | Micron **122TB 고용량 SSD** 채택 확대, 동급 용량 HDD 구성 대비 **W당 순차읽기 처리량 16배** | 122 TB, 16× | 2026 | https://www.micron.com/about/blog/storage/ai/emerging-storage-requirements-for-the-evolution-of-ai-workloads | ✅/🟡 |
| B-26 | ScaleFlux: KV cache churn이 SSD 수명을 태움 → NVIDIA CMX용 드라이브 레벨 스토리지 개발 (내구성이 EB 수요를 추가로 증폭시키는 요인) | 정성 | 2026-08-01 | https://www.techtimes.com/articles/322601/20260801/kv-cache-churn-burns-through-ssds-scaleflux-built-drive-level-storage-nvidia-cmx.htm | 🟡 |

## B-3. 토큰 볼륨 (수요 곡선 앵커)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| B-30 | **Google 월간 처리 토큰**: **9.7조(2024-05) → 480조(2025-05) → 3.2 quadrillion(=3,200조, 2026-05)**. YoY 약 **7배** | 9.7T → 480T → 3,200T | 2024-05 / 2025-05 / 2026-05 | https://keepingupwith.ai/articles/googles-agentic-gemini-era-token-consumption-surges-to-32-quadrillion-monthly/ , https://www.techi.com/google-3-2q-tokens-inference-demand/ , https://www.theregister.com/ai-ml/2026/05/19/google-touts-tokenmaxxing-huge-capex-and-ai-agents-at-i/o/5242983 | ✅ (Google I/O 발표 수치, 언론 경유) |
| B-31 | Google 내부 Antigravity 플랫폼: 일 **0.5조 토큰(2026-03) → 3조 초과(2026-05 중순)** | 0.5T/day → 3T/day | 2026 | 동일 | 🟡 |
| B-32 | **Microsoft**: 분기 **100조 토큰 초과**(2026-04 실적발표), YoY **5배**; 3월 단월 **50조** 기록 | >100T/분기 | 2026-04 | https://io-fund.com/ai-stocks/ai-token-demand-shattering-forecasts | 🟡 |
| B-33 | **Fireworks AI**: 일 **40조 토큰**(2026-07 중순), 2026-04의 15조/일에서 3개월 만에 2배 이상, 2025-10의 10조/일 대비 4배 | 10T→15T→40T per day | 2025-10 ~ 2026-07 | 동일 | 🟡 |
| B-34 | **OpenRouter**: 주간 토큰 **5조 → 25조(6개월, 5배)**, 2026년 연간 **1 quadrillion 초과** 페이스 | 5T→25T/주 | 2026 | 동일 | 🟡 |
| B-35 | **중요 경고 (내 계산)**: B-20(325 KB/token 중간값) × B-30(Google 3.2e15 토큰/월) = **월 ~1.04 ZB의 KV 바이트가 "생성"**된다. 이는 저장 수요가 아니라 생성량 상한이며, 실제 저장 계층 크기는 **재사용 윈도우 보존정책(retention)**이 결정한다. 토큰 성장률을 그대로 EB 저장 수요 성장률로 쓰면 2~3 자릿수 과대추정 | ~1.04 ZB/월 생성 | — | (B-20 × B-30) | ⚠️ (내 산술, 해석 주의) |

## B-4. "2030년 추론 캐시 계층 350 EB" 수치의 공개 근거 추적

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| B-40 | **"350 EB"를 명시한 공개 출처를 찾지 못했다.** 정확히 그 문자열로 검색했으나 일치 없음 | — | 2026-09-22 검색 | (negative finding) | ⚠️ |
| B-41 | **가장 유력한 재구성 경로**: SanDisk의 **"KV cache = 2030년 AI DC NAND 워크로드의 35%"**(B-04) × **AI DC NAND ~1 ZB(1,000 EB) 규모**(B-05의 1.2 ZB TAM에서 AI DC 부분) = **약 350~420 EB**. 즉 350 EB는 **SanDisk 35% 진술의 산술 결과로 재구성 가능**하나, SanDisk가 직접 발표한 숫자는 아니다 | 35% × ~1,000 EB ≈ **350 EB** | — | (B-04 + B-05) | ⚠️ (재구성) |
| B-42 | **독립 근사치**: McKinsey의 2030년 **AI 추론용 SSD 447 EB**(B-02). 정의가 더 넓음(KV cache뿐 아니라 추론 서버 전체 SSD). 350 EB는 이 447 EB보다 보수적인 값으로 **defensible한 범위 안에 있다** | 447 EB (2030) | 2025 | B-02와 동일 | ✅/🟡 |
| B-43 | **반대 방향 긴장**: SanDisk 자신은 **persistent KV store 설치기반이 2030년 1 ZB(1,000 EB) 초과**라고 말한다(B-05). 이는 350 EB의 **약 3배**. 단, "설치기반(installed base, 누적 설치 용량)"과 "연간 출하 비트 수요(annual shipped demand)"는 **단위가 다르다** — 둘을 혼용하면 안 됨 | 1,000 EB (IB) vs 350 EB (annual) | 2026 | B-05 | ⚠️ (단위 혼동 경고) |

---

## B-5. 플롯 가능한 연도별 시계열 (가정 전면 명시)

### 시계열 ① — 전체 Enterprise SSD 수요 (EB), McKinsey baseline
**발표된 것은 양 끝점 + CAGR뿐이다.** 중간 연도는 내가 기하보간했다(⚠️).

| 연도 | EB | 근거 |
|---|---|---|
| 2024 | **181** | ✅ McKinsey 발표 끝점 (B-01) |
| 2025 | 244 | ⚠️ 보간 |
| 2026 | 328 | ⚠️ 보간 |
| 2027 | 442 | ⚠️ 보간 |
| 2028 | 595 | ⚠️ 보간 |
| 2029 | 801 | ⚠️ 보간 |
| 2030 | **1,078** | ✅ McKinsey 발표 끝점 (B-01) |

- 가정: 균일 기하성장. 실측 CAGR = (1078/181)^(1/6) − 1 = **34.6%** (McKinsey가 명시한 "35% annually"와 일치).
- 정의: enterprise SSD **연간 출하 비트 수요**. 컨슈머/모바일 NAND 제외.
- 이 곡선에 실제 사이클(2028년 공급과잉 → 비트 수요 계속 증가하되 ASP 붕괴)이 반영돼 있지 않음에 주의. **EB 수요는 downcycle에도 꺾이지 않는다. 꺾이는 것은 가격이다.**

### 시계열 ② — KV-cache / 추론 캐시 계층 (EB), SanDisk 앵커
**발표된 점은 2027·2028 두 개뿐이다(B-03). 2030은 재구성치다(B-41).** 나머지는 외삽(⚠️).

| 연도 | 중간값 EB | 밴드 | 근거 |
|---|---|---|---|
| 2025 | ~35 | 25–45 | ⚠️ 역외삽 (58.7% CAGR 적용) |
| 2026 | ~55 | 45–70 | ⚠️ 역외삽. 참고: SanDisk는 2026년 **DC NAND 전체** 증분을 "high 60s EB"라 함(B-06) — KV cache는 그 부분집합 |
| **2027** | **87.5** | **75–100** | ✅ **SanDisk 발표 (B-03)** |
| **2028** | **175** | **150–200** | ✅ **SanDisk 발표 ("doubling", B-03)** |
| 2029 | ~248 | 210–290 | ⚠️ 외삽 (2028→2030 사이 41.4% CAGR) |
| 2030 | **~350** | 300–450 | ⚠️ **재구성치** (B-41). 상한 참조: McKinsey AI 추론 SSD 447 EB(B-02) |

**적용 CAGR (명시)**
- 2027 → 2028: **+100%** (SanDisk가 직접 "두 배"라고 말함 — 유일하게 출처에서 나온 성장률)
- 2027 → 2030: (350/87.5)^(1/3) − 1 = **+58.7%/yr**
- 2028 → 2030: (350/175)^(1/2) − 1 = **+41.4%/yr**
- 역외삽(2026·2025)은 58.7%를 그대로 뒤로 적용한 것 — **출처 없음**

**대안 고성장 밴드 (SanDisk 설치기반 진술 기준, B-05)**: 2028년 175 EB → 2030년 1,000 EB 이면 **+139%/yr**. 단 이는 **누적 설치기반** 정의이므로 위 표(연간 수요)와 **직접 비교 불가**. 별도 축으로만 표기할 것.

### 시계열 ③ — AI 기인 스토리지 비중 (HDD, 참고용)
| 연도 | AI 기인 비중 | EB | 근거 |
|---|---|---|---|
| 2026 | **18%** | **363 EB** (총 2,017 EB 중) | 🟡 Coughlin/Forbes (B-07) |
| 2028 | **43%** | 미발표 (총량 미제시) | 🟡 Coughlin/Forbes (B-07) |
| 2030 | **58%** | 미발표 | 🟡 Coughlin/Forbes (B-07) |
- **2028년에 AI가 HDD 용량의 43%를 차지한다**는 점만 기록. 총 EB가 없어 절대값은 계산 불가. NAND가 아니라 **HDD** 기준임에 주의.

---

## B-6. 시계열 사용 시 필수 고지 (덱·대시보드에 각주로)
1. **2027·2028의 KV cache EB(75–100 / 150–200)만이 발표된 수치**다. 그 외 연도는 보간·외삽이다.
2. **350 EB(2030)는 어떤 출처도 그 숫자로 발표하지 않았다.** SanDisk의 "35% 점유"(B-04)와 "AI DC flash 1.2 ZB"(B-05)로부터 산술 재구성한 값이며, McKinsey의 447 EB(B-02)가 독립 상한 근사치를 제공한다.
3. **"연간 출하 비트 수요"와 "누적 설치기반"을 절대 섞지 말 것** (B-43).
4. 토큰 볼륨(B-30~B-34)은 **드라이버 지표**일 뿐, 곱해서 EB로 환산하면 과대추정된다 (B-35).

---

## 부록 — 미수집 항목 (검색 예산 소진, 후속 필요)
- Yole / Gartner / IDC의 2027·2028 명시 bit supply·demand 수치
- SemiAnalysis "Memory Mania" 원문의 수급 모델 수치
- CXMT·YMTC의 2028년 capacity(wpm)·글로벌 점유율 구체 수치
- PCIe Gen6 엔터프라이즈 SSD 전환 연도 로드맵
- 3D DRAM 양산 목표 연도 (삼성/SK하이닉스 공식)
- NVIDIA Dynamo / KVBM, Solidigm, WEKA, VAST, Pliops의 KV cache 계층 EB·드라이브 수 사이징
- TheElec / 한국경제의 2028 변곡점 직접 인용 기사
