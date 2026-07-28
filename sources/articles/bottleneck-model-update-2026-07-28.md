# 2030 병목 모델 정기 갱신 데이터 — 전력·CAPEX·파운드리·패키징 (2026-07-04~07-28 수집)

수집일: 2026-07-28
유형: 병목 모델 4대 지수 갱신용 1차 자료 (정기 점검)
출처: SemiAnalysis·Counterpoint·TechInsights 우선 참조 + Utility Dive·TechCrunch·Bloomberg·Forbes·Fortune·DigiTimes·TechTimes·siliconanalysts.com·Seoul Economic Daily 등 (웹 리서치, 2026-07 접근)

---

## 1. 전력/그리드 (직전 지수 72, 2026-07-04)

- **PJM 용량경매 상한 도달·2년 연속 예비력 미달**: PJM 2028년 인도분 용량경매가 FERC 상한($325/MW-day, 무제한 시 $555~777/MW-day 추정)에 도달, 비용 $16.4B 추가(데이터센터 귀책분 $6.3B·38%). 신뢰도 요구치를 **2년 연속** 충족 못해 **6.8GW 예비력 부족**이 확인됨(2026-07 중순 보도). PJM 이사회는 9월 백업 경매(상한 $555/MW-day)와 **2027년 6월부터 50MW+ 데이터센터 강제 감축(curtailment) 메커니즘**을 FERC에 제출 예정(2026-07-28 TechCrunch). ([Utility Dive](https://www.utilitydive.com/news/pjm-capacity-auction-price-cap-reserve-shortfall/825282/), [Utility Dive](https://www.utilitydive.com/news/pjm-board-backstop-capacity-auction-data-center-curtailment/826347/), [TechCrunch 2026-07-28](https://techcrunch.com/2026/07/28/data-centers-may-face-temporary-power-cuts-to-prevent-blackouts-on-largest-us-grid/))
- **ERCOT 큐 추가 폭증**: 대형부하 접속 신청이 410GW(2026-04)→**438GW**(2026-06-18)로 10주 만에 추가 7% 증가, 약 90%가 데이터센터. Batch Zero(전체 시스템 배치 심사) 2026-07-11 발효. ([Utility Dive](https://www.utilitydive.com/news/texas-facing-438-gw-queue-approves-initial-large-load-interconnection-pro/823367/))
- **설비 병목 심화**: GE Vernova Q2 2026(~07-22) 가스터빈 백로그 116GW·전체 백로그 $176B(+88% YoY 수주). GE Vernova·Siemens Energy·Hitachi Energy 합산 변압기 백로그 $180B+, 리드타임 48~60개월(일부 라인 2031년 납품 견적) — 직전 "최대 5년" 기준선보다 추가 악화.
- **하이퍼스케일러 그리드 이탈 가속**: Meta·Entergy Louisiana(Hyperion) 프로젝트가 가스발전 3기(2.26GW)→**10기(5.2GW, 예비 포함 7GW+)**로 확대. Meta는 2026-07-23~27경 **RE100(재생에너지 100%) 서약에서 탈퇴** — 그리드 대신 자체 가스발전 의존 심화의 상징적 신호. ([Electrek 2026-07-27](https://electrek.co/2026/07/27/meta-is-backing-10-gas-plants-and-just-quit-a-global-renewables-pledge/))
- **SemiAnalysis 경고**: 미국 그리드 여유가 **2027년 조기에 마이너스로 전환**할 수 있다고 전망, 2028년까지 40GW+ 규모의 behind-the-meter(자가발전) 데이터센터 용량이 신규 미국 DC의 절반 이상을 감당할 것으로 예상 — 접속 큐뿐 아니라 터빈·변압기 리드타임이 동등한 구속 조건으로 부상. ([SemiAnalysis](https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw))
- **완화 신호(소폭)**: National Grid Ventures가 Joulent LLC 지분 35%에 $1.75B 투자(2026-07-01, 대형부하 전력 솔루션 가속). FERC는 2026-06-18 6개 RTO/ISO 전체에 대형부하 접속 요금제 개혁을 요구하는 show-cause order 발령, 응답 시한 8월 중순.

**종합**: 프로젝션이던 PJM 부족이 **실현된 사실**(6.8GW 미달·강제 감축 규정)로 전환, ERCOT 큐 추가 급증, 변압기 리드타임 2031년까지 확대 — 완화 신호(National Grid 투자·FERC 개혁)는 아직 전망 단계. **지수 상향 근거 우세**.

## 2. CAPEX/ROI (직전 지수 40, 2026-07-04)

- **수요·실적 확인(완화 방향)**: TSMC Q2 2026(2026-07-16) 매출 $40.2B(+36% YoY), 2026 성장률 가이던스 30%대→**40%대**로 상향. Micron 2026-07-09 FQ4 가이던스 매출 ~$50B·EPS ~$31로 재상향, CEO는 타이트한 공급이 "2027년 이후"까지 지속 전망. Dell'Oro 2026 글로벌 DC CAPEX $1조 돌파 재확인(1H26 빅4 CAPEX +78% YoY), 2030년 $1.7조 장기 전망. JPMorgan 2030 누적 AI 인프라 CAPEX $5.5조 재확인 — 단 이 중 **$4.1조가 부채 조달**(평균 LTV 85%)이라는 세부 공개, 2026년 YTD AI 관련 채권 발행 $300B+. HY OAS는 269~277bp(직전 285bp 대비 오히려 축소 — 신용시장 안정). ([Bloomberg](https://www.bloomberg.com/news/articles/2026-07-16/tsmc-beats-lofty-estimates-in-latest-sign-of-sustained-ai-demand), [Motley Fool](https://www.fool.com/investing/2026/07/09/micron-raised-its-guidance-on-surging-memory-price/), [Dell'Oro](https://www.delloro.com/news/data-center-capex-surges-57-percent-in-2025-as-ai-deployments-accelerate/), [Benzinga](https://www.benzinga.com/markets/tech/26/06/53233210/the-ai-boom-is-becoming-a-4-1-trillion-debt-story-jpmorgan-says))
- **SemiAnalysis 팩트체크**: "2026년 미국 DC 캐파의 절반이 취소됐다"는 바이럴 주장을 2026-04-01 Bloomberg 기사의 AI 스크래핑 오독으로 반박 — 실제 2026년 캐파 조정폭은 약 1%에 불과(일부 개별 지연은 존재: MS 위스콘신 케노샤 ~3년 연기, 조지아 애틀랜타 IDC). ([SemiAnalysis](https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter))
- **신용 리스크 신규 신호(악화 방향)**: S&P가 Oracle 신용등급을 BBB→**BBB-**로 하향(2026-07-09) — OpenAI 집중 리스크가 $638B RPO 백로그에 내재됐다고 명시, FY2027 CAPEX $90~95B 전망에 FCF 적자 ~$42B로 확대 전망. AI CAPEX 노출과 직결된 **첫 신용등급 하향 사례**. ([Yahoo Finance](https://finance.yahoo.com/markets/stocks/articles/oracle-just-hit-fresh-52-170700819.html))
- 하이퍼스케일러 회사채 수요 약화: 주문 커버리지 비율이 ~5배(2026-02)→**2배 미만**(2026-07)으로 하락. Amazon $25B 채권 발행 시 커버리지 2.5배(3월 3.2배 대비 축소)로 프리미엄 확대해 판매. 2026년 AI 부채 발행 규모 ~$570B(전년비 ~4배) 추세. ([Forbes](https://www.forbes.com/sites/robertszczerba/2026/07/17/bond-investors-push-back-as-ai-debt-heads-toward-570-billion/), [Fortune](https://fortune.com/2026/07/17/ai-boom-debt-blitz-investor-demand-hyperscaler-bond-issuance/))
- **부외부채 규모 재평가**: 기존 위키 기준선(~$120B SPV·부외부채)보다 훨씬 큰 규모 추정 등장 — 사모신용 데이터센터 파이낸싱 ~$800B, Nikkei 기반 추정치는 리스·GPU 계약·SPV 합산 최대 **$1.65조**(Alphabet·MS·Amazon·Meta·Oracle 합산). ([TFTC](https://www.tftc.io/big-tech-off-balance-sheet-ai-debt-enron-accounting))

**종합**: 실적·가이던스 축은 지속 강세로 완화 요인 우세하나, Oracle 신용등급 하향·회사채 수요 급랭·부외부채 규모 재평가가 **잠재(canary) 리스크**로 신규 부상 — 스프레드 자체는 아직 안정적이라 소폭 상향에 그침.

## 3. 선단 파운드리 (직전 지수 50, 2026-07-04)

- TSMC Q2 2026(2026-07-16) 매출 $40.2B(+36% YoY), N2가 처음으로 매출 3% 기여, 선단 공정 비중 77%. 2026 전체 매출 성장률 가이던스 40%대로 상향. **2026 CAPEX 가이던스 $52~56B → $60~64B로 대폭 상향**. ([Tom's Hardware](https://www.tomshardware.com/tech-industry/tsmc-commits-another-100-billion-to-arizona-for-at-least-four-more-2nm-fabs))
- TSMC 애리조나에 추가 $100B 투입(2nm 이하 팹 4개+패키징) 발표하나 3nm 팹2 가동은 2027년, 2nm은 2028~29년 — 근시일 완화 효과는 제한적.
- ASML Q2 2026(2026-07-15) 매출 €9.3B(가이던스 상회), 2026 매출 가이던스 €43~45B로 상향, EUV 시스템 매출 +45%+ YoY. High-NA EUV 도입 최소 2029년 연기 재확인(TSMC 비용 논리, ~$410M/대) — 단 SK하이닉스·Intel향 첫 High-NA 로직/메모리 칩은 "수개월 내" 출하 예정이라는 별도 신호. ([ASML Q2 콜](https://www.fool.com/earnings/call-transcripts/2026/07/15/asml-asml-q2-2026-earnings-call-transcript/))
- NVIDIA Rubin 열·생산 이슈 2026-07 중순 해소, 7월부터 하이퍼스케일러향 출하 개시. TrendForce의 Rubin 2026 출하 비중 22%(기존 29%에서 하향) 전망은 그대로 유지 — 캐파 여유 지속.
- **신규 — 파운드리 지역 분산 실현**: 삼성 파운드리가 브로드컴 ~$200B 규모 수주(2026-07-27 보도), Anthropic과 2nm 설계·생산·패키징 MOU, Tesla AI6 물량 확보. 삼성 2nm 수율 55~70%대(출처별 상이)로 TSMC 대비 약 2/3 웨이퍼 단가. 대만 집중 리스크를 완화하는 **실질적 상업 신호**. ([Seoul Economic Daily](https://en.sedaily.com/finance/2026/07/27/why-broadcom-entrusted-samsung-with-200-billion-order-tsmc))
- N3(3nm) 캐파도 "2026년 말까지 완판" 보도 — 선단 수요 자체는 여전히 공급을 상회.

**종합**: 캐파 확장(CAPEX 상향·N2 순항·ASML 지연 재확인)과 대만 집중 리스크의 실질적 분산(삼성 대형 수주)이 완화 요인 우세. 수요 강세(N3도 완판)가 일부 상쇄. **소폭~중폭 완화 방향**.

## 4. 첨단 패키징 (직전 지수 67, 2026-07-04)

- CoWoS는 2026년 말까지 완판 유지, 리드타임 52~78주로 2027년까지 이어짐. TSMC CEO C.C. Wei가 2026-06 주주총회에서 "extremely tight and sold out through 2026" 재확인.
- 캐파는 실제로 4배 확장 중(2024년 말 ~3.5만 wpm → 2026년 말 목표 ~13만 wpm)이나 2026년 수요(~100만 장 추정)가 공급(~80만 장)을 상회 지속. NVIDIA 배정 ~60%(59.5만 장), Amkor(18~19만 장)·ASE/SPIL(6~8만 장) 외주 확정 — 기존 기준선과 정합.
- **HBM4 하이브리드본딩 추가 지연**: SK하이닉스가 12-hi 하이브리드본딩 검증을 완료(수율 비공개)했으나 업계 전반은 여전히 마이크로범프 의존. 2026-07 DigiTimes는 병목이 이제 열/냉각 이슈로 이동했다고 보도하며, **JEDEC이 HBM4E 세대까지 핀 피치(~900㎛) 완화를 검토 중** — 이는 하이브리드본딩 채택이 HBM4를 넘어 HBM4E까지 추가로 밀릴 가능성을 시사(직전 기준선의 "마이크로범프 유지 결정"보다 지연 폭이 더 커짐).
- **신규 — 패키징이 주 병목이라는 업계 프레이밍 확산**: TechTimes(2026-07-28, 당일) "AI Supply Crisis Moves Upstream: Advanced Packaging Becomes the Binding Constraint" — 파운드리가 아닌 패키징(TSV throughput·하이브리드본딩 라인·TC bonder 가용성·KGSD 수율)이 2026년 AI 공급의 핵심 제약이라는 분석가 프레이밍이 굳어지는 중.

**종합**: 캐파는 확장 중이나 수요가 계속 앞서고, 하이브리드본딩 지연이 한 세대 더 밀릴 조짐 + "패키징이 진짜 병목"이라는 업계 프레이밍 확산 — 직전(07-04)에 반영된 완화 속도 둔화가 이번엔 **소폭 악화로 전환**.

---

## 재평가 함의 요약 (권고 델타)

| 병목 | 07-04 지수 | 권고 델타 | 07-28 지수 |
|---|---:|---:|---:|
| 전력 | 72 | +2~3 | 74~75 |
| CAPEX/ROI | 40 | +4 | 44 |
| 파운드리 | 50 | +4 | 54 |
| 패키징 | 67 | -3 | 64 |

전력·CAPEX·파운드리 3개 지수가 동시에 소폭~중폭 상향(제약 강화 방향)되고 패키징만 완화 — 07-04 시점 "파운드리·CAPEX 완화 지속, 패키징 완화 둔화" 트렌드가 이번 창에서 **일부 반전**(파운드리는 실질 분산 신호로 완화, CAPEX·전력은 신용·설비 리스크로 악화 재확인).

## 출처 목록

- Utility Dive: PJM 용량경매/백스톱, ERCOT 438GW — https://www.utilitydive.com/news/pjm-capacity-auction-price-cap-reserve-shortfall/825282/ , https://www.utilitydive.com/news/pjm-board-backstop-capacity-auction-data-center-curtailment/826347/ , https://www.utilitydive.com/news/texas-facing-438-gw-queue-approves-initial-large-load-interconnection-pro/823367/
- TechCrunch(2026-07-28) PJM 강제감축 — https://techcrunch.com/2026/07/28/data-centers-may-face-temporary-power-cuts-to-prevent-blackouts-on-largest-us-grid/
- Electrek(2026-07-27) Meta RE100 탈퇴 — https://electrek.co/2026/07/27/meta-is-backing-10-gas-plants-and-just-quit-a-global-renewables-pledge/
- SemiAnalysis 그리드 제약 뉴스레터 — https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw
- SemiAnalysis 데이터센터 취소설 팩트체크 — https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter
- Bloomberg(2026-07-16) TSMC Q2 — https://www.bloomberg.com/news/articles/2026-07-16/tsmc-beats-lofty-estimates-in-latest-sign-of-sustained-ai-demand
- Motley Fool(2026-07-09) Micron 가이던스 — https://www.fool.com/investing/2026/07/09/micron-raised-its-guidance-on-surging-memory-price/
- Dell'Oro Group — https://www.delloro.com/news/data-center-capex-surges-57-percent-in-2025-as-ai-deployments-accelerate/
- Benzinga JPMorgan $4.1조 부채 — https://www.benzinga.com/markets/tech/26/06/53233210/the-ai-boom-is-becoming-a-4-1-trillion-debt-story-jpmorgan-says
- Yahoo Finance Oracle 신용등급 하향 — https://finance.yahoo.com/markets/stocks/articles/oracle-just-hit-fresh-52-170700819.html
- Forbes/Fortune 하이퍼스케일러 회사채 수요 — https://www.forbes.com/sites/robertszczerba/2026/07/17/bond-investors-push-back-as-ai-debt-heads-toward-570-billion/ , https://fortune.com/2026/07/17/ai-boom-debt-blitz-investor-demand-hyperscaler-bond-issuance/
- TFTC 부외부채 — https://www.tftc.io/big-tech-off-balance-sheet-ai-debt-enron-accounting
- Tom's Hardware TSMC CAPEX·애리조나 — https://www.tomshardware.com/tech-industry/tsmc-commits-another-100-billion-to-arizona-for-at-least-four-more-2nm-fabs
- ASML Q2 2026 실적콜 — https://www.fool.com/earnings/call-transcripts/2026/07/15/asml-asml-q2-2026-earnings-call-transcript/
- Seoul Economic Daily(2026-07-27) 삼성 파운드리 브로드컴 수주 — https://en.sedaily.com/finance/2026/07/27/why-broadcom-entrusted-samsung-with-200-billion-order-tsmc
- DigiTimes HBM4 냉각/하이브리드본딩 — https://www.digitimes.com/news/a20260717PD226/hbm4-hbm-cooling-shipments-nvidia.html
- TechTimes(2026-07-28) 패키징 병목 프레이밍 — https://www.techtimes.com/articles/321754/20260728/ai-supply-crisis-moves-upstream-advanced-packaging-becomes-binding-constraint.htm
