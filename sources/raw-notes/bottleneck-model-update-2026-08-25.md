# 2030 병목 정량 모델 갱신 리서치 (2026-07-04 → 2026-08-25)

수집: Research Agent(웹 검색, 2개 서브에이전트 — 전력/CAPEX, 파운드리/패키징). SemiAnalysis 유료 본문은 페이월로 제목·요약만 확보(등급 하향). 나머지는 1차 출처(TSMC/ASML 실적발표, 공식 뉴스룸) 또는 신뢰 매체 인용. 목적: `wiki/concepts/bottleneck-model-2030.md`의 4대 병목 제약지수(전력 72·CAPEX 40·파운드리 50·패키징 67, 2026-07-04 기준) 재산정.

## 전력

- SemiAnalysis 뉴스레터 제목만 확보(본문 페이월): "US Grid Constraints: Towards 40GW+ of Behind-The-Meter Datacenter by 2028?", "Stop Saying Half of 2026 US Datacenter Capacity Is Canceled", "How AI Labs Are Solving the Power Crisis: The Onsite Gas Deep Dive" — 그리드 우회(온사이트 발전) 트렌드 시사. https://newsletter.semianalysis.com/
- ERCOT: 2026 Q1에만 신규 198GW 대형부하 접속 신청, 심사대기 86GW(ERCOT 현 피크부하와 맞먹음). 지난 12개월 실제 승인 용량은 9,062MW뿐 — 신청 대비 승인 비율 극도로 낮음. https://www.zeroemissiongrid.com/iso-rto-meeting-summaries/ercot-llwg-05-21/
- ERCOT Batch Zero 전환: LLIS 심사 승인 마감 7/10, 필수 정보 제출 마감 7/24, Batch Zero 분류 통보 8/7. https://www.zeroemissiongrid.com/insights-press-zeg-blog/pjm-large-load-interconnection-process-2026/
- PJM: 2030년까지 최대 15GW 구조적 공급 부족 전망 재확인(기존 baseline과 동일). Expedited Interconnection Track 2026년 8월 시행 예정, BYONG 메커니즘 활용 시 GIA 체결까지 약 10개월로 단축(완화 요소, 시행 전). https://www.whitecase.com/insight-alert/pjm-proposes-carve-out-new-services-co-located-data-centers
- 변압기·개폐장치 리드타임 추가 악화: 대용량 변압기 128주, 발전기 승압용 GSU 144주, 일부 특수사양 최대 4년(2020-21년 약 1년 대비). 개폐장치/고압차단기 리드타임 2026-05 기준 60주 초과(2025년말 44주 대비 상승). GOES(방향성 전기강판) 미국 내 생산업체 단 1곳. https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/ , https://terrapincg.com/news/switchgear-transformer-generator-lead-times-2026
- 미국 계획 DC의 절반 가까이 지연/취소 위험, 2026년 예정 12GW 중 실제 착공은 약 1/3. https://energynewsbeat.co/ai/more-than-half-of-the-data-centers-may-be-delayed-due-to-lack-of-transformers-and-electrical-equipment-2/
- 원자력/SMR: 하이퍼스케일러 누적 계약 9.8GW(13개 딜)이나 가동 중 용량은 1.92GW뿐. 최초 신규 용량(TMI-1, MS 835MW)은 2027년 하반기 가동 — 2030년 이전 실질 기여 제한적. https://axis-intelligence.com/nuclear-energy-for-data-centers/
- 판단: 승인률 저조·리드타임 추가 연장·원자력 실기여 지연 모두 제약 심화 방향. 완화 요소(PJM 신속트랙, ERCOT 절차정비)는 아직 시행 전이라 방향 전환보다는 속도 조절 수준.

## CAPEX/ROI

- 빅테크 2026 CAPEX 4사 합산 $725B(2025년 ~$410B 대비 +77%). Amazon $220B(상향), Google $195-205B(상향), Meta 하한 $130-145B로 상향. MS는 리스회계 방식 변경으로 $190B→$175B 재표시(회계상 조정, 실질 축소 아님). https://finance.yahoo.com/sectors/technology/article/meta-microsoft-amazon-and-alphabet-are-about-to-spend-a-shocking-amount-of-money-to-dominate-the-ai-era-115359575.html
- 실적발표: Alphabet 7/22 — 2004년 상장 후 첫 분기 FCF 마이너스. Meta 7/29 — 발표 다음날 주가 -10%(ROI 우려). 반면 MS 커머셜 RPO $678B로 시간외 +8%, Amazon AWS +37% 성장으로 8/3 시총 $3조 돌파 — 수요측 신뢰는 견조하나 투자자 인내심 약화 신호 등장. https://www.uncoveralpha.com/p/amazon-google-microsoft-meta-q2-earnings
- Dell'Oro: 2026년 글로벌 DC capex $1조 돌파 확정(상향), 2030년까지 $1.7조 전망(상향), 1분기 빅4 capex YoY +78%. 메모리 가격 인플레가 서버 단가를 밀어올려 capex 상향의 추가 요인으로 명시. https://www.delloro.com/news/ai-boom-drives-data-center-capex-to-1-7-trillion-by-2030/
- JPMorgan: 2030년 누적 AI capex $5.1조→$5.5조 재확인/상향, 부채조달 규모 전망 $4.1조로 상향. 2026년 하이퍼스케일러 capex $650B, 2027년 $1.1조 초과 신규 전망. https://finance.yahoo.com/technology/ai/articles/bubble-jpmorgan-says-5-5-094757864.html
- Morgan Stanley: 2028년까지 AI 지출 $1.4조 전망(상향), 60%가 수입 하드웨어로 미국 GDP 기여는 제한적(+40bp).
- 신용시장: HY OAS 275bp(2026-08-20, 장기중앙값 ~450bp 대비 역사적 최저) — 스트레스 신호 없음. 대형 회사채 발행 급증(Amazon $25B 등 $20B+ 딜 9건), Hut 8 Beacon Point $4.25B 채권 사상 최저 스프레드(T+165) 발행. JPMorgan은 DC 증권화(ABS/SPV) 발행이 2026-27년 $30-40B(전체 발행 7-10%)로 성장 전망 — 구조적 리스크 축적이나 가시적 스트레스는 아직 아님. https://www.sageadvisory.com/article/hyperscaler-debt-deluge-the-new-driver-of-ig-spread-pressure
- 판단: capex 절대액·리서치사 전망 모두 상향 지속 → 완화 방향 유지. 단 Alphabet/Meta 투자자 반응(FCF 마이너스, 주가 급락)은 "ROI 실현 지연에 대한 시장 인내심 약화"라는 신규 하위 리스크.

## 파운드리(선단 로직)

- TSMC 2026 Q2 실적(2026-07-16): 매출 $40.2B(가이던스 상단), 매출총이익률 67.7%. HPC(AI 가속기 포함) 매출 비중 66%(전분기 대비 +20%). N2가 웨이퍼 매출의 3% 기여(첫 유의미 매출), N2 램프로 3Q 총이익률 3~4%p 희석 전망. 2026 CapEx 가이던스 $60~64B로 상향, CFO는 향후 3년 CapEx가 과거 3년 대비 "significantly higher" 전망. https://finance.yahoo.com/quote/TSM/earnings/TSM-Q2-2026-earnings_call-649922.html , https://www.techtimes.com/articles/320696/20260716/tsmc-posts-record-quarter-ai-chip-demand-pushes-full-year-growth-outlook-past-40.htm
- ASML 2026 Q2 실적(2026-07-15): 매출 €9.3B, 순이익 €2.9B. 시스템 매출 로직 51% : 메모리 49%. 메모리向 매출 올해 +75% 성장 가이던스(로직 +25%). High-NA EUV는 Intel이 18A에서 최초 양산 적용(Core Ultra Series 3 일부), TSMC는 여전히 미도입(기존 2029년 연기 방침 불변). 2027 Low-NA EUV 백로그 사실상 풀부킹, +30% 저-NA EUV 캐파 증설 계획(2028년 추가 +30% 검토). FY2026 가이던스 €43~45B로 상향. https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results , https://www.fool.com/earnings/call-transcripts/2026/07/15/asml-asml-q2-2026-earnings-call-transcript/
- 판단: N2 램프·CapEx 확대 지속으로 완화 기조 유지되나, HPC 매출비중 66%로 AI 수요압력도 동반 상승 + "3개년 CapEx significantly higher" 코멘트는 수요-공급 갭이 쉽게 안 좁혀짐을 시사 — 완화 속도는 유지 또는 소폭 둔화.

## 첨단 패키징

- TrendForce(2026-06-15): TSMC CoWoS 수급 갭 20%→10%로 연내(2026년 말) 축소 전망(캐파 확장 기인) — 명확한 완화 신호.
- TSMC CoWoS 캐파: 연말 120~130K wpm 목표(현재 75~80K 추정), NVIDIA 2026년 CoWoS 수요 ~60%(총 수요 ~100만 장 규모), ASE·Amkor 오버플로우 물량 ~80K wpm 추가. CoWoS 14-reticle(컴퓨트 다이 ~10개+HBM 20스택) 양산은 2028년으로 재확인(가속 없음).
- TSMC 애리조나: 1공장 가동 중, 2공장 2026년 하반기 tool move-in, 3공장 건설 중, 4공장+최초 후공정(패키징) 시설 착수 2026년 내.
- SK하이닉스 인디애나: 2026-04 파일링 착공, 정식 그라운드브레이킹 2026-08-27($3.87억, 총 $3.9B), 2028년 하반기 전면가동 목표, HBM4E/HBM5 타깃 — 근시일 영향 없음(장기 신호).
- 삼성: 레거시 DRAM/NAND 후공정을 베트남(타이응우옌, 2027-11 가동 목표)으로 이전 검토 — 천안·온양 국내 캐파를 HBM向으로 전환. 삼성 HBM 웨이퍼 캐파 17만→25만 wpm(+47%), 2026년말 목표. https://www.digitimes.com/news/a20260814VL222/samsung-hbm-dram-capacity-vietnam.html
- HBM4/HBM4E: NVIDIA가 2026-06-05 삼성·SK하이닉스·Micron 3사 모두 Rubin向 HBM4 인증 완료 발표. SK하이닉스 12-Hi 하이브리드본딩 검증 완료(2026-04-29, TrendForce, 구체 수율 미공개). 삼성 HCB 16-Hi 시제품 수율 ~10%(비공식, 기존 baseline과 동일치 — 개선 신호 없음). 업계는 여전히 HBM4는 마이크로범프 유지, 하이브리드본딩은 HBM4E/2027년 이후로 순연(정체, 악화 아님). Rubin 출하: Q3 2026 초기 출하, Q4 볼륨 램프이나 "late" — 2026년 출하량 애널리스트 모델 20~30만대(대부분 물량 2027로 이월). https://wccftech.com/nvidia-confirms-vera-rubin-launch-in-q3-volume-ramp-q4-blackwell-continues-to-see-massive-demand/
- TechInsights: HBM4 16-Hi 양산 2026년 상반기 본격화(2026-02 삼성 HBM4 양산 개시), 하이브리드본딩은 "필수화 방향"이나 시점 불확실. https://www.techinsights.com/blog/ai-supercomputers-and-hbm4-rollout
- 판단: CoWoS 갭 축소·캐파 확대(+오버플로우)·삼성 HBM 캐파 +47%·Rubin 볼륨 2027 이월(2026 압력 완화) 등 완화 신호 다수·구체적. 하이브리드본딩·CoPoS는 기존 baseline과 동일(정체) — 구조적 상한(NVIDIA 60% 집중도, 14-reticle 2028년)은 유지.

## 확인 안됨
- SemiAnalysis 유료 본문 상세 수치
- Oracle 2026 Q2(FY) 개별 capex 가이던스 최신 수치
- 8월 이후 추가 SMR 가동 마일스톤 실현 여부
