# 2026년 7월 정기 점검 — 삼성 Q2 잠정실적 사상 최대·SK하이닉스 나스닥 가격 확정·AI 버블 경고 확산

- **수집일**: 2026-07-07
- **이전 스냅샷**: 2026-07-04 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 + FERC·ERCOT·BIS·Fortune·Korea Times 등 보강)
- **목적**: 2026-07-07 병목 모델 정기 점검 + 위키 전반 갱신 데이터 소스
- **수집 방법**: 3개 병렬 리서치 에이전트(전력/CAPEX 전담·파운드리/패키징 전담·HBM/DRAM 시장 전담). newsletter.semianalysis.com·counterpointresearch.com·techinsights.com·trendforce.com 대부분 직접 fetch 403 차단 — 검색 스니펫·2차 인용 경유(원문 대조 권고 플래그).

---

## 1. 전력망 — 절차적 완화(EIT·Batch Zero) vs 구조적 수요-공급 격차 재확인

| 지표 | 내용 | 비고 |
|---|---|---|
| FERC PJM 신속 접속 트랙(EIT) 승인 | 2026-06-09 승인, 2026-06-10~2027년 말 한시 운영 | 연 10건·최소 250MW UCAP 프로젝트를 10개월 내 접속계약·3년 내 가동 목표. PJM 2027~28년 6.6GW 부족 대응 |
| ERCOT "Batch Zero Process" 공식화 | PUCT 2026-06-18 승인, **시행 2026-07-11** | 75MW+ 대형부하 요청을 시스템 단위 일괄 심사로 전환. 서류 제출기한 7/10, ERCOT 분류통보 8/7 |
| SemiAnalysis "US Grid Constraints" (7월 초) | 미국 신규 DC 전력 수요 **21GW(2026) → 84GW(2030)** vs 그리드 신뢰용량(ELCC) 연간 증설 ~15GW | 수요-공급 격차를 정량 재확인 — 격차가 이전 서술(대기열 GW)보다 더 날카롭게 구조화됨. 2028년까지 BTM(자가발전) 40GW+ 전망 |
| SemiAnalysis "취소설 재반박" (06-18) | 북미 하이퍼스케일러 자체건설 전망 최근 6개월간 1%만 하향(코로케이션 <5%) | "2026 캐파 절반 취소" 주장에 대한 추가 반박 데이터 |
| 원자력/SMR | DOE 첨단원자로 11종 선정, 2026-07-04까지 시험로 3기 이상 임계 목표 프로그램 확인 | 총 커밋량(9.8GW+)은 불변, 프로그램 구체화는 신규 |

**해석**: EIT·Batch Zero는 접속 "프로세스"의 절차적 개선(연 10건 한도·시스템 일괄 심사)일 뿐 신규 발전 용량 자체를 늘리지 않는다. 반면 SemiAnalysis의 21GW→84GW(2030) vs 연 15GW 증설이라는 재구성은 격차가 오히려 더 명확한 숫자로 재확인됐다는 뜻 — 절차 완화가 구조적 수급 격차를 상쇄하지 못한다.

- 출처: [Utility Dive – FERC PJM EIT](https://www.utilitydive.com/news/ferc-pjm-fast-track-expedited-interconnection-eit/822479/), [PJM Inside Lines](https://insidelines.pjm.com/ferc-oks-temporary-process-to-fast-track-large-capacity-projects/), [ERCOT Batch Zero 공식 발표](https://www.ercot.com/news/release/06182026-puct-approves-ercots), [Willkie – ERCOT Batch Zero](https://www.willkie.com/publications/2026/06/ercot-approves-implementing-new-batch-zero-process-for-large-load-interconnections), [SemiAnalysis – US Grid Constraints](https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw)(직접 fetch 403, 검색 경유), [SemiAnalysis – 취소설 반박](https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter)(동일)

---

## 2. CAPEX/ROI — AI 버블 경고 확산 vs 실적·투자 지속 강화의 분기

- **BIS(국제결제은행) 연차보고서**(2026-06-28/29 보도): AI 투자 붐을 과거 버블 붕괴 사례와 명시적으로 비교하며 "급격한 되감기(unwind abruptly)" 가능성을 경고. AI 관련 사모신용 대출 규모가 $3B(2010) → $40B(2025)로 급증했다고 지적. 중앙은행의 중앙은행 격인 BIS가 공식적으로 낸 경고라는 점에서 신뢰도 높은 신규 리스크 신호.
- **Oracle 스트레스**: 2026-07-06 기준 최근 1개월간 주가 **-40%대** — AI 버블 회의론이 은행·하이퍼스케일러까지 확산 중이라는 The Register 보도(07-06)에서 대표 사례로 인용. 단, Oracle FY2027 CAPEX 가이던스는 자체 지출 ~$70B + 고객 상환분 $20~25B(합계 ~$90~95B)로 오히려 **상향 확정** — Stargate 비-Abilene 캠퍼스 확장 지속, FY2027 $40B 부채/자본 조달 계획도 유지.
- **신용시장**: ICE BofA US HY OAS 2026-07-02 기준 **2.75%**로 07-04 스냅샷의 ~285bp 대비 소폭 타이트닝 — 스트레스 신호 없음, 여전히 안정.
- **SK하이닉스 나스닥 조달 자금 용처 공개**(IPO 로드쇼 자료, 07-05~07): 조달액 중 **₩31조(~$20.2B) 용인 반도체클러스터 Fab 1**, **₩19조(~$12.4B) 청주 P&T7 첨단 패키징 팹**, **₩12조(~$7.8B) ASML EUV 장비 구매**로 명시적 배분 확인 — 패키징 병목에 대한 구체적 신규 자본 투입.
- 빅테크(MS·Alphabet·Amazon·Meta) 2026 헤드라인 CAPEX 수치 자체의 갱신은 없음(Q2 CY2026 실적 발표 전) — 07-04 스냅샷의 $190B/$180~190B/$200B/$125~145B가 최신치로 유지.

**해석**: 실물 지표(신용 스프레드, 실제 CAPEX 가이던스, 신규 팹 자본 배분)는 완화·지속 방향이지만, BIS라는 권위 있는 기관의 버블 경고 + Oracle 주가 급락이라는 **감정·내러티브 축의 새로운 하방 리스크**가 이번 주 처음 뚜렷하게 등장했다 — 펀더멘털과 센티먼트의 괴리가 확대되는 국면.

- 출처: [Bloomberg – BIS AI bust warning (06-28)](https://www.bloomberg.com/news/articles/2026-06-28/ai-bust-risks-ripple-effects-from-growth-to-credit-bis-says), [Fortune – BIS $1조 경고 (06-29)](https://fortune.com/2026/06/29/bis-central-bank-warning-hyperscaler-data-center-1-trillion-gamble-recession/), [The Register – AI 버블 경고 확산 (07-06)](https://www.theregister.com/ai-and-ml/2026/07/06/even-banks-and-hyperscalers-are-now-sounding-the-alarm-about-the-ai-bubble/5266123), [Oracle FY27 capex – mlq.ai](https://mlq.ai/news/oracle-reports-557b-fy2026-capex-guides-to-70b-net-outlay-in-fy2027/), [Yahoo Finance – Oracle $100B 가능성](https://finance.yahoo.com/markets/stocks/articles/oracles-ai-spending-bill-keeps-233125280.html), [FRED – ICE BofA US HY OAS](https://fred.stlouisfed.org/series/BAMLH0A0HYM2)

---

## 3. 파운드리·패키징 — TSMC 6월 매출 미발표, SK하이닉스 나스닥이 유일한 재료

- **TSMC 6월 매출**: 미발표 (통상 7/10 발표, Q2 실적발표는 7/16). 신규 데이터 없음.
- **TSMC 주가**: 2026-07-06 +4.83% — Citigroup의 "7/16 실적발표에서 FY2026 매출성장 가이던스 상향 가능성" 전망에 따른 기대 반영(확정 데이터 아님, watch 항목).
- **CoWoS·Rubin·HBM4 본딩**: 이번 주 창구에서 신규 확인 사항 없음(모두 07-04 이전 baseline 유지).
- **SK하이닉스 나스닥 ADR — 조달 목표 하향 확정** (2026-07-06): KOSPI 주가 하락(6/23 255.5만 원 → 242만 원)을 반영해 조달 목표를 **45.45조 원 → 43.14조 원(~$28.1~28.2B)**으로 하향. 코너스톤 투자자로 **Baillie Gifford·Coatue Management·Situational Awareness Partners**(Leopold Aschenbrenner 펀드)가 최대 **$7B**(일부 소스 $6.5B) 공동 인수의향서 제출. 북빌딩 7/6 개시, **가격 확정 7/9, 거래 개시 7/10** 예정(신주 1,779만 주, 발행주식의 약 2.5%).

**해석**: 파운드리·패키징 축의 실물 데이터는 이번 주 정체됐고(TSMC 실적 공백 구간), 유일한 신규 재료는 SK하이닉스 ADR의 자금조달 확정 세부사항 — CAPEX/패키징 양쪽에 걸친 재료로 §2에도 반영.

- 출처: [TradingKey – TSM +4.83% (07-06)](https://www.tradingkey.com/news/market-movers/262013397-market-movers-tsm-20260706), [Korea Times – SK하이닉스 ADR 목표 하향 (07-06)](https://www.koreatimes.co.kr/business/companies/20260706/sk-hynix-lowers-nasdaq-adr-offering-to-28-bil), [BigGo Finance – 코너스톤 투자자](https://finance.biggo.com/news/cfdb0071-4216-43b1-bac8-0a9e74a6ff48), [CNBC – SK하이닉스 나스닥 상장 영상](https://www.cnbc.com/video/2026/07/06/sk-hynix-to-list-on-nasdaq-on-friday.html)

---

## 4. HBM/DRAM 시장 — 삼성 Q2 잠정실적 사상 최대(오늘, 07-07)

- **삼성전자 2026 Q2 잠정실적**(2026-07-07 발표, **오늘**): **연결 매출 약 171조 원**(컨센서스 172.18조 원 소폭 하회), **연결 영업이익 약 89.4조 원** — 사상 최대, **전년 동기 대비 약 19배**, AI 반도체·HBM 수요가 견인. 실적 발표 당일 주가는 "buy the rumor, sell the news" 패턴으로 **약 -7%** 하락. 감사보고서 포함 확정 실적·컨퍼런스콜은 **2026-07-30** 예정.
- **Micron**: Wall Street이 FY2027 EPS 컨센서스를 **$98 → $155/주**로 대폭 상향(2026-07-06 보도) — 16건의 다년 고객계약(~$22B 커밋 HBM 매출, 기존 위키의 SCA $100B/16건과 동일 계약군으로 추정, 세부 정의 교차검증 필요)에 근거. 같은 날 삼성·SK하이닉스의 합산 **$2조 규모 캐파 증설 공약**(양사 합산 DRAM 점유율 67%, Counterpoint)이 Micron 투자자에게 "공급과잉 경고"로 해석되는 보도도 병존. 07-07 삼성 실적 발표 여파로 Micron 주가도 장중 약 -7.7% 하락(회사 고유 이슈 아님, 시장 전반 조정).
- **DRAM 반독점 집단소송**: 이번 창구 내 소송 절차 진전 없음(기각/화해/기일 지정 등 확인 안 됨).
- **TrendForce Q3 2026 가격 전망**: 일부 2차 소스(KuCoin)가 TrendForce의 Q3/Q4 상향 조정(PC DRAM +8~13%→+15~20%, 서버 DRAM +13~18%)을 언급하나, 정확한 발표일이 이번 창구(07-04~07-07) 내인지 확인 불가 — **미확정 플래그**, TrendForce 원문 직접 인용 필요.
- **HBM 점유율(Counterpoint/TechInsights)**: 이번 창구 내 신규 분기 데이터 없음 — 07-04 스냅샷의 Q1 확정치(SK 58%/삼성 32%) vs 4월 잠정치(50~55%/35~40%) 병기 상태 유지.

**해석**: 삼성 Q2 잠정실적(89.4조 원, 19배 YoY)은 이 위키가 추적해온 "호황의 정점" 서사의 가장 강력한 정량적 확증이다 — 동시에 시장은 "재료 소진" 반응(주가 조정)을 보였다는 점도 함께 기록해 둔다.

- 출처: [Samsung Newsroom – 2026 Q2 잠정실적](https://news.samsung.com/global/samsung-electronics-announces-earnings-guidance-for-second-quarter-2026), [TipRanks – 삼성 Q2 가이던스](https://www.tipranks.com/news/company-announcements/samsung-electronics-signals-robust-q2-2026-earnings-in-preliminary-guidance), [Motley Fool – 삼성 실적 발표 후 주가 조정 (07-07)](https://www.fool.com/investing/2026/07/07/why-micron-stock-just-crashed/), [Motley Fool – Micron FY27 EPS 컨센서스 상향 (07-06)](https://www.fool.com/investing/2026/07/05/micron-stock-good-news-wall-street-nvidia-jensen/), [Motley Fool – 삼성·SK 캐파 증설 공약 (07-06)](https://www.fool.com/investing/2026/07/06/sk-hynix-and-samsung-have-a-2-trillion-warning-for/)

---

## 5. 병목 모델 제약지수 변동 요약 (2026-07-04 → 2026-07-07)

| 병목 | 이전(07-04) | 현재(07-07) | Δ | 주요 근거 |
|---|---:|---:|---:|---|
| **전력** | 72 | **73** | **▲ +1** | FERC EIT·ERCOT Batch Zero는 절차적 완화(신규 발전 용량 자체는 불변)에 그침. SemiAnalysis가 미국 신규 DC 수요 21GW(2026)→84GW(2030) vs 그리드 연 15GW 증설이라는 격차를 더 날카로운 숫자로 재확인 — 구조적 악화가 절차 완화를 상쇄 |
| **CAPEX/ROI** | 40 | **41** | **▲ +1** | BIS 연차보고서의 명시적 AI 버블 경고(신용기관 최초 공식 경고)·Oracle 주가 -40%대·"은행·하이퍼스케일러까지 버블 우려 확산" 보도 — 새로운 센티먼트 축 하방 리스크 등장. 단 HY OAS 소폭 타이트닝·Oracle CAPEX 가이던스 자체는 오히려 상향·SK하이닉스 $40B 신규 팹 자금배분 확정·삼성 Q2 영업이익 89.4조 원(19배 YoY) 사상 최대 등 펀더멘털은 견조 — 센티먼트-펀더멘털 괴리 확대 |
| **파운드리** | 50 | **50** | **변동 없음** | TSMC 6월 매출 미발표(7/10 예정)·7/16 실적발표 전 확인 가능한 신규 데이터 없음. TSMC 주가 +4.83%(07-06)는 가이던스 상향 기대감일 뿐 확정 데이터 아님 — watch 항목 |
| **패키징** | 67 | **66** | **▼ −1** | SK하이닉스 나스닥 조달자금 중 ₩19조(~$12.4B)를 청주 P&T7 첨단 패키징 팹에, ₩12조(~$7.8B)를 ASML EUV 장비 구매에 배분 확정 — 패키징 캐파 확장에 대한 구체적 신규 자본 투입 확인 |

**전력·CAPEX 동반 소폭 재상승(각 +1) — 절차적 완화 조치(전력)와 실적 호조(CAPEX)에도 불구하고 더 날카로워진 구조적 수급 격차(전력)와 새로 등장한 버블 경고 내러티브(CAPEX)가 이를 상쇄. 패키징만 유일하게 완화(SK하이닉스 신규 자본 배분). 파운드리는 정보 공백 구간으로 보합. 하방 위험 순서 불변: CAPEX/ROI > 전력 ≈ 패키징 > 파운드리.**
