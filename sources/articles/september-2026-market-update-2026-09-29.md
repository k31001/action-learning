# 2026년 9월 시장 업데이트 — 병목 모델 정기 점검 (전력 큐 재확대·CAPEX 추가 상향·TSMC 호조·Rubin 램프 지연 보도·삼성 HBM 점유율 33%)

- **수집일**: 2026-09-29
- **이전 스냅샷**: 2026-07-04 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (4개 병렬 리서치 에이전트: 전력·DC / CAPEX·신용 / 파운드리·패키징 / HBM·DRAM·NAND)
- **수집 방법·한계 (중요)**: 전 항목이 **WebSearch 스니펫 경유**다. ercot.com·delloro.com·trendforce.com은 egress 차단으로 본문 fetch 실패, **semianalysis.com·counterpointresearch.com(영문)·techinsights.com은 검색에 노출되지 않아 직접 확인 못 함**(Counterpoint 한국어판 HBM 점유율 페이지만 스니펫 확인). 2차 매체·집계 사이트가 섞여 있어 신뢰도는 중간. 스니펫 간 수치가 충돌하는 곳은 병기하고 "미확인" 표시. 1차 출처(TSMC IR·SEC 6-K·ASML IR) 재확인 권고. 확인 못 한 수치는 모델 입력에서 제외하거나 정성 판단에만 사용.

---

## 1. 전력망·DC 착공

| 지표 | 최신 | 직전(07-04) | 출처 |
|---|---|---|---|
| ERCOT 대형부하 큐 | 2026-06 기준 약 **474GW**(약 90% DC). 헤드라인 427GW(6월 말)·438GW 병존 — 정의·시점 상이. 9월 최신치 미확인. 8월 말 발전 큐: 태양광 156GW·풍력 48GW·가스 82GW(6월 이사회 이후 +23%)·배터리 164GW | 410GW+ | [ERCOT 9/7 자료](https://www.ercot.com/files/docs/2026/09/07/10-Interconnection-and-Grid-Analysis-Update.pdf), [New Project Media](https://newprojectmedia.com/?p=19583), [DC Hub](https://dchub.cloud/news/2026-07-01-ercot-queue-427-gw-39-percent-us) |
| ERCOT 신규 규칙 | 대형부하 출력변동 한도 10MW/5초 NOGRR 초안·배치 스터디 신규 접속 절차 개발 | 신규 | [LG Law](https://www.lglawfirm.com/ercot-develops-new-batch-study-process-for-large-load-interconnections/) |
| 텍사스 PUCT SB6 | 07-09 결정은 확인 안 됨. 7/17자 답변에서 **최종 결정 2026-12**로 제시(16 TAC §25.194, 75MW+ 부하) | 07-09 표결 예정 | [JD Supra](https://www.jdsupra.com/legalnews/public-utility-commission-of-texas-1861500/), [GT Law](https://www.gtlaw.com/es/insights/2026/3/texas-senate-bill-6-update-what-data-centers-large-load-customers-should-know-about-proposed-interconnection-standards) |
| PJM 2028/29 경매 | **6,831MW 부족**. 신뢰도 백스톱 조달(RBP) 09-30~10-21, 상한 $555/MW-day(최근 경매 상한 $325). 결과 12월 | 신규 | [Utility Dive](https://www.utilitydive.com/news/pjm-backstop-capacity-auction-ferc-data-centers/826792/), [Energy-Storage.news](https://www.energy-storage.news/pjm-targets-data-centre-demand-with-6gw-backstop-auction-bess-expected-to-have-competitive-edge/) |
| PJM 부하 예측 | 2027/28 피크 증가 5,250MW 중 ~5,100MW가 DC. 대형부하 2038년까지 최대 +70GW. 2030년 15GW 부족 갱신은 미확인 | 최대 15GW(2030) | [Power-Eng](https://www.power-eng.com/?p=134499) |
| 가스터빈 | GE Vernova 백로그 2Q26 **116GW**(2025년 말 83GW), 지금 주문 시 납기 ~2031. Siemens Energy 69GW(FQ3, 리드타임 3년+), MHI 35GW | GEV 110GW(예약 포함) | [GEV 2Q26 8-K](https://www.sec.gov/Archives/edgar/data/0001996810/000199681026000147/gevpressrelease2q26.htm), [Turbomachinery](https://www.turbomachinerymag.com/view/siemens-energy-posts-record-backlog-joining-ge-vernova-and-baker-hughes-in-a-record-quarter-for-gas-turbines) |
| 변압기 | 대형 전력용 평균 ~128주, 변전소용 2023 ~140주 → 2026 160주+, 최대 용량 3~5년 (2차 출처) | 최대 5년 | [TNW](https://thenextweb.com/news/us-power-companies-scramble-data-centre-equipment) |
| 원전·BTM | Constellation PA 2GW 20년 PPA, Talen-AWS 최대 1,920MW·17년·$18B(6/11, BTM→FTM 전환), Equinix Oklo 500MW+Radiant 20기 등 1GW+(8월). 합산 GW 갱신 미확인 | 9.8GW+ | [DCD](https://www.datacenterdynamics.com/en/news/aws-talen-sign-ppa-for-192gw-of-power-from-pennsylvania-nuclear-plant/), [POWER](https://www.powermag.com/talen-amazon-launch-18b-nuclear-ppa/) |
| DC 착공·이연 | 2026년 계획 미국 ~12GW 중 착공 ~5GW, 30~50% 이연·취소 위험, 전력 가용성 갭 7GW+, 접속 지연 24~72개월(Sightline 등 2차) | 이연 테마 부상 | [Latitude Media](https://www.latitudemedia.com/news/up-to-half-of-the-worlds-data-centers-may-be-delayed-this-year/), [Uptime UII](https://intelligence.uptimeinstitute.com/resource/giant-data-centers-1h26-more-proposals-power-and-uncertainties) |
| IEA | 07-04 이후 개정 미확인(2030 945TWh 유지) | 동일 | [W.Media](https://w.media/data-center-power-demand-will-double-by-2030-iea/) |

## 2. CAPEX·신용

- **4대 하이퍼스케일러 2026 CAPEX 합계**: $735B+(연초 가이던스 +14%, Platformonomics) vs $725B(상향분 ~60%가 AI칩·HBM 가격 상승 귀속) — 스니펫 충돌. [Platformonomics](https://platformonomics.com/2026/07/follow-the-capex-q2-2026-scoreboard/), [Crypto Briefing](https://cryptobriefing.com/amazon-meta-microsoft-ai-earnings-surge/)
- **사별**: Alphabet $180~190B → **$195~205B**(Q2 CAPEX $44.9B, 2배+) · Amazon **$220B**(AWS +28%+, 백로그 $364B) · Meta $125~145B / $130~145B 병존(하한 미확정) · Microsoft $175B vs $190B 충돌(미확인) · Oracle FY27 CAPEX ~$95B·부채·지분 $40B 조달(보도, 원문 미확인; 컨센서스 $67.7B). [investinglive/BofA](https://investinglive.com/stocks/if-you-think-ai-capex-is-insane-this-year-wait-until-2027-as-bofa-sees-a-nearly-50-rise/), [Outlook Business](https://www.outlookbusiness.com/corporate/oracle-forecasts-95-bn-in-capex-for-fy27-plans-to-raise-40-bn-in-debt-and-equity)
- **2027**: 4사 합산 $950B~1.2T. BofA CY26 하이퍼스케일러 CAPEX $860B+(+~80%), 2027 $1.2T 경로(+38%).
- **Dell'Oro**: 2Q26 글로벌 DC CAPEX **+92% YoY**, 메모리·스토리지 가격 상승에 따른 서버 ASP 상승이 동인, 2030년 $3T 초과 전망(CIO 기사는 $1.7T — 시점 차이 가능). [Dell'Oro](https://www.delloro.com/news/data-center-capex-grew-92-percent-in-2q-2026-driven-by-surging-ai-demand-and-memory-costs/), [ComSoc](https://techblog.comsoc.org/2026/09/16/delloro-data-center-capex-grew-92-in-2q-2026-caveats-galore/)
- **Oracle FQ1 FY27(09-10)**: 매출 $19.3B(+30%)·OCI $7.4B(+121%)·**RPO $664B**(YoY +$209B, QoQ +$26B, 선급·고객 제공 하드웨어 $75B)·분기 인도 ~1GW. [Oracle 슬라이드](https://s23.q4cdn.com/440135859/files/content_files/Q1-FY27-Oracle-Earnings-Slides.pdf)
- **신용**: HY OAS Q2 말 ~284bp → 8월 말 ~263~270bp(스니펫, 직전 ~285bp 대비 −15~20bp), IG-HY 격차 ~200bp(평균 310bp). FRED 최신값 미확인. [FRED](https://fred.stlouisfed.org/data/BAMLH0A0HYM2), [FINX](https://finx.io/blog/high-yield-oas-270-insurance-balance-sheets)
- **조달 구조**: 런던 크레딧 헤지펀드가 AI 관련 금융 $3.6T·176건·202개 주체 매핑, Oracle·CoreWeave가 공급망 최고 레버리지(CoreWeave 부채 ~$15B, $3B 전환사채 추진 보도 — 일자 미확인). [Webull](https://www.webull.com/news/15599659975181312)
- **OpenAI**: 4월 $122B 조달·포스트머니 $852B(7월 이전 사실), 7월 이후 신규 라운드 미확인. **ROI 논란**: Morgan Stanley 클라우드 CAPEX/매출 2026~28 38%·44%·45%, Deutsche Bank 2030 연 $800B 매출 갭. [MindStudio](https://www.mindstudio.ai/blog/ai-bubble-or-structural-boom-capex-forecast-comparison)

## 3. 파운드리·패키징

- **TSMC 8월 매출** NT$514.81B(+10.1% MoM, +53.3% YoY), 1~8월 누계 NT$3,386.87B(+39.3%). [SEC 6-K](https://www.sec.gov/Archives/edgar/data/0001046179/000104617926000658/tsm-revenue20260910.htm)
- **TSMC Q2**: 매출 $40.2B(+36%)·총마진 67.7%·선단 77%. **Q3 가이던스** $44.6~45.8B·GM 65~67%·연 성장률 USD 40%+ 상향. **2026 CAPEX $60~64B**(직전 $56B 보도). 배분 선단 70~80%·패키징/테스트 10~20%. [VanEck](https://www.vaneck.com/us/en/blogs/thematic-investing/tsmc-q2-earnings-call-what-it-means-for-smh/), [DCD](https://datacenterdynamics.com/en/news/tsmc-announces-2026-capex-spend-of-56bn-after-posting-eighth-consecutive-quarter-of-growth/)
- **N2**: Q3 가이던스가 가파른 램프 명시, 2026말 월 9~10만 장 추정(미확정). **CoWoS**: 07-04 이후 신규 확정 수치 없음(TSMC 12.7만/8.8만/9.5만 장 등 추정 상충, 시점 불명). CoPoS·Arizona AP: 양산 2028~29·Arizona 2공장 고volume 양산 2027 하반기로 앞당김(C.C. Wei, 발표일 미확인). [Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/analyzing-tsmcs-fab-expansion-roadmap-multi-fab-n2-ramp-cowos-soic-and-uncorking-bottlenecks)
- **ASML Q2(07-15)**: 매출 €9.3B·수주 €13.16B·백로그 €38.8B·연 가이던스 €43~45B 상향·2027 EUV/DUV 캐파 +30%. **TSMC A13 High-NA 미도입**(도입 2029 이후 재확인). [ASML IR](https://ourbrand.asml.com/asset/9078cf4d-91fd-4dd9-a5d5-d1caab6dc046/2026_07_15_Presentation-Investor-Relations-Q2-2026.pdf), [Technology Magazine](https://technologymagazine.com/news/tsmc-hits-pause-on-asmls-newest-lithography-for-a13-process)
- **NVIDIA Rubin 램프 지연 보도**: TrendForce "NVIDIA Rubin Ramp Delayed to 2027 on HBM Snag"(RP260921NC3, ~09-21) — **제목·스니펫만 확인**, SK hynix HBM4 출하 원 목표 대비 20~30% 감축. 분기 일정 미확인. [TrendForce](https://www.trendforce.com/research/download/RP260921NC3)
- **HBM4 수율**: 삼성 HBM4용 DRAM 수율 60% 미만 추정 vs 내부 60% 초과 주장, 평택 D2W 하이브리드 본더 ~50대 라인(반입 2026말~). [Igor's Lab](https://www.igorslab.de/hbm4-samsungs-zweite-chance-oder-der-finale-wake-up-call/)
- **수출통제**: 2026-01-13 BIS 규칙(H200·MI325X급 대중 케이스별 심사)·05-31 지침(중국 본사 기업 라이선스). 07-04 이후 신규 변화 미확인.

## 4. 메모리 시장

- **삼성 2Q26(07-07 잠정)**: 영업이익 **89.4조 원**(전년 ~19배, LSEG 87.3조 상회), DS 89.2조·매출 127.5조, DRAM ASP +44% QoQ·NAND +53%. [SamMobile](https://www.sammobile.com/news/samsung-q2-2026-profit-usd-58-billion/)
- **삼성 3Q26 프리뷰**: 키움(09-23) 범용 DRAM 상승률 가정 20%→12%, 매출 213→198조·영업이익 122→107조로 하향. 잠정실적 10월 초. [SBS Biz](https://biz.sbs.co.kr/amp/article/20000336427)
- **SK하이닉스 2Q26**: 매출 79.3조·영업이익 60.54조(+557% YoY), 이익 상회·매출 하회(S&P). [S&P](https://www.spglobal.com/market-intelligence/en/news-insights/research/2026/08/sk-hynix-postq-profit-beat-offsets-revenue-miss)
- **Micron**: FY26 Q3 매출 스니펫 $41.5B(EPS $25.11) — 기존 위키 일부의 $33.5B는 가이던스 수치이며 실적 $41.46B와 정합(보고서 표와 일치). Q4 실적 09-30 발표 예정(결과 미확인). [Micron 8-K](https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000013/a2026q3ex991-pressrelease.htm)
- **HBM 점유율(Counterpoint 2Q26)**: SK하이닉스 **50%**(2Q25 64%)·삼성 **33%**(QoQ +12%p, 3분기 연속 2위)·Micron 18%(합계 101% = 반올림). 2026 HBM4 점유율 전망 SK 54%·삼성 28%·Micron 18%. SK의 NVIDIA HBM4 물량 2/3~70%(업계 소식통, 공식 미확인). [Counterpoint KR](https://korea.counterpointresearch.com/global-hbm-market-share-q2-2026/), [JoongAng](https://www.koreajoongangdaily.com/business/sk-hynix-has-won-two-thirds-of-nvidias-next-gen-high-bandwidth-memory-orders-industry-sources/12030483)
- **계약가(TrendForce 3Q26)**: 범용 DRAM +13~18%·NAND +10~15%·모바일 DRAM +8~13% QoQ. 4Q는 "약한 최종 수요·높은 재고로 상승폭 추가 수렴"(정량 미확인). [TrendForce](https://www.trendforce.com/presscenter/news/20260703-13134.html)
- **SK하이닉스 나스닥 ADR**: 07-10 상장, 공모가 $149, 조달 **$265.1억**(비미국 기업 최대), 시초 $170. [Asiae](https://view.asiae.co.kr/en/article/2026071020443835203)
- **반독점 소송**: 06-25 제소 이후 절차(기각신청 등) 미확인. **CXMT**: STAR 상장(조달 ~579억 위안, 2025 DRAM 점유율 ~7.7%, 07-27 예정 — 완료 스니펫상 추정). **YMTC**: 08-21 STAR 상장 신청(목표 330억 위안, 2027 상반기). [DealStreetAsia](https://www.dealstreetasia.com/stories/china-memory-chipmaker-cxmt-targets-8-6b-in-asias-biggest-ipo-of-2026-489097/), [DigiTimes](https://apps.digitimes.com/news/a20260713VL220.html)

---

## 5. 병목 제약지수 변동 요약 (2026-09-29, 이전 2026-07-04 대비)

| 병목 | 이전 | 현재 | 변동 | 핵심 근거 |
|---|---:|---:|---:|---|
| 전력 | 72 | **75** | ▲+3 | ERCOT 큐 410→474GW·PUCT 결정 12월로 지연·GEV 백로그 116GW/납기 ~2031·변압기 160주+·이연 30~50% |
| CAPEX/ROI | 40 | **39** | ▼−1 | Alphabet·Amazon 추가 상향·Dell'Oro +92%·HY OAS ~265~285bp 타이트. 상쇄: 조달 구조 의존(Oracle 부채·RPO $664B·순환 파이낸싱) |
| 파운드리 | 50 | **48** | ▼−2 | TSMC Q3 가이던스·CAPEX $60~64B·Arizona 2공장 앞당김·ASML 상향·N2 순항 |
| 패키징 | 67 | **68** | ▲+1 | Rubin 램프 2027 지연 보도·SK HBM4 출하 20~30% 감축(스택 수율 병목 강화). CoWoS 신규 수치 없음, 삼성 HBM4 수율 개선 추정은 부분 상쇄 |

지수는 wiki 사실 기반 정성 판단값이며, 위 사실은 2차 스니펫 기반이라 ±2 오차를 감안해야 한다.
