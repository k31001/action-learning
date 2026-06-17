# 2026년 6월 시장 업데이트 — 병목 모델 정기 점검 2026-06-17

- **수집일**: 2026-06-17
- **이전 스냅샷**: 2026-06-14
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights·TrendForce·FERC·ERCOT·PJM·TSMC·SK hynix IR·Micron IR·digitimes)
- **목적**: 2026-06-17 병목 모델 정기 점검 데이터 소스

---

## 1. 전력 그리드 — 추가 악화 신호 (2026-06-17)

### ERCOT 대규모 부하 큐 급증
| 지표 | 이전 수치 (06-14) | 최신 수치 (06-17) | 변화 |
|---|---|---|---|
| ERCOT 대규모 부하 신청 큐 전체 | ~200GW | **410 GW** | 전체 큐 급증 |
| 그 중 데이터센터 비중 | ~70% | **87%** | DC 집중 심화 |
| 2026 Q1 신규 대규모 부하 신청 | 미수집 | **198 GW** (1분기만) | 신규 |
| ERCOT 목표: 신규 배치 프로세스 전환일 | 미수집 | **2026-08-01** | ERCOT 이사회 승인 후 |

- ERCOT은 대규모 부하 접속 신청을 개별 심사에서 집단 클러스터 심사(FERC Order 2023 유사 방식)로 전환, 2026-08-01 목표
- 출처: [EnkiAI – AI DC Energy 2026, 2,600 GW Queue & PJM Plan](https://enkiai.com/data-center/ai-data-center-energy-2026-2600-gw-queue-pjm-plan/), [Davis Graham – Texas & ERCOT Structural Advantage](https://davisgraham.com/news-events/texas-and-ercot-the-structural-advantage-for-data-center-power/)

### PJM 공급 부족·용량 가격 급등
| 지표 | 수치 | 비고 |
|---|---|---|
| PJM 2027-2028 용량 경매 낙찰량 | 145,777 MW | 신뢰성 요건 대비 **6.6 GW 미달** |
| PJM 2027 용량 가격 | **$333.44/MW-day** (기록) | 전년 대비 대폭 상승 |
| PJM 2030 용량 부족 전망 | 최대 **15 GW** | 신규 부하 증가 속도 > 발전 증설 |

- 출처: [Introl – PJM Grid 6GW Shortfall 2027](https://introl.com/blog/pjm-grid-crisis-6gw-shortfall-data-center-power-2027), [Ascend Analytics – Large Load Interconnection Queues](https://www.ascendanalytics.com/blog/large-load-interconnection-queues-data-center-grid-access)

### 변압기 리드타임 4년으로 확대
- 미국 대형 변압기 납기: 기존 50주 → 현재 **최장 3~4년(127~208주)**
- 2026년 5월 기준, 대형 변압기 가격 2020년 대비 **60~80% 상승** ($2~5M/기, 특수품 최대 $10M)
- 미국 변압기 수요의 약 80%가 수입 의존 — 국내 공급 확대 한계
- 출처: [pv-magazine-usa – Transformer lead times extend to four years](https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market-faces-severe-supply-constraints-as-lead-times-extend-to-four-years/)

### FERC 대규모 부하 접속 개혁 — 6월 액션 예정
- FERC, 2026-04-16 **6월 말**까지 대규모 부하 접속 도켓(RM26-4-000)에 조치 공약
- DOE 에너지장관이 FERC에 20MW 이상 대형 부하(데이터센터 등) 접속 규정 개혁 검토 지시
- Southwest Power Pool: High Impact Large Load(HILL) 이니셔티브 2026-01 승인 — 대규모 부하·발전 접속 가속화 프로토콜
- 출처: [FERC – RM26-4-000 대규모 부하 접속](https://www.ferc.gov/rm26-4), [Holland & Knight – FERC to Act on Large-Load June](https://www.hklaw.com/en/insights/publications/2026/04/ferc-to-act-on-large-load-interconnection-docket-in-june)

---

## 2. 하이퍼스케일러 CapEx — 추가 확인 (Q1 2026 실적 기준)

### Big4 Q1 2026 분기 실적 (상세 최신화)
| 기업 | Q1 2026 분기 CapEx | YoY | 클라우드/AI 매출 성장 |
|---|---|---|---|
| **Amazon (AWS)** | **$44.2B** | +76% | AWS +28% YoY |
| **Alphabet (Google)** | **$35.67B** | +110% | Google Cloud 백로그 $460B+ |
| **Microsoft** | **$30.88B** | +84% | AI 매출 연간 $37B 런레이트 |
| **Meta** | **~$20B** | +54% | 광고 AI ROI 실현 |

- Big4 합산 전년 대비 CapEx 증가율: +77%
- Big4 **2026 풀이어 가이던스** 합산: 약 $700B (Meta $125~145B · Google ~$185B · Amazon $200B · Microsoft ~$190B)
- 전체 하이퍼스케일러(소형 CSP 포함) 컨센서스: **$782B** (Dell'Oro Group)
- 출처: [om.co – What I Learned about Hyperscalers' AI Spend](https://om.co/2026/04/30/what-i-learned-about-hyperscalers-ai-spend/), [Yahoo Finance – Hyperscalers Hit $700B in 2026 AI Spending](https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html)

### SK하이닉스 Q1 2026 — 역대 최고 실적
| 지표 | 수치 | YoY |
|---|---|---|
| 분기 매출 | **KRW 52.6조** | +198% |
| QoQ 성장 | +60% | |
| 영업이익률 | **72%** | 역대 최고 |
| HBM 매출 비중 | 2026년 **DRAM 매출의 50%+** 전망 | |

- 출처: [CNBC – SK hynix Q1 2026 record profit](https://www.cnbc.com/2026/04/23/sk-hynix-earnings-ai-memory-shortage-hbm-demand.html), [SK hynix – 2026 Market Outlook](https://news.skhynix.com/2026-market-outlook-focus-on-the-hbm-led-memory-supercycle/)

---

## 3. NVIDIA Rubin + HBM4 공급 체인 최신화

### HBM4 전 공급사 인증 완료 (2026-06-05)
- Jensen Huang, 2026-06-05 GTC 타이페이에서 **Samsung·SK하이닉스·Micron** 모두 HBM4 Vera Rubin 공급 인증 완료 공식 확인
- Samsung HBM4: 11.7 Gb/s 핀속도(NVIDIA 요건 10 Gb/s 초과), 재설계 없이 자격 통과
- NVIDIA Vera Rubin 2026 Q3 출하 예정, 풀 프로덕션 진입
- HBM4 공급 추정(분석가): SK하이닉스 60~70% · 삼성전자 25~30% · Micron 나머지

- 출처: [TechTimes – Nvidia Vera Rubin Enters Full Production](https://www.techtimes.com/articles/317539/20260602/nvidia-vera-rubin-enters-full-production-samsung-sk-hynix-micron-named-hbm4-suppliers.htm), [TechTimes – Jensen Huang Confirms All Three Suppliers](https://www.techtimes.com/articles/317855/20260605/nvidia-vera-rubin-hbm4-jensen-huang-confirms-all-three-suppliers-production-q3-ship.htm)

### Samsung HBM4·HBM4E 진행 상황
- Samsung HBM4: 2026년 2월 업계 최초 양산 출하, NVIDIA Rubin 납품 개시
- Samsung HBM4E: 2026-05-29 업계 최초 샘플 출하(3.6 TB/s, 최대 14→16 Gb/s), HBM4 대비 20%+ 성능
- Samsung 2026년 HBM 캐파: 월 약 170K 웨이퍼 → 2026년 말까지 **250K 웨이퍼(+47%)** 목표
- HBM4 납품 후 2026년 전체 HBM 물량 완판(하이퍼스케일러 선예약)

- 출처: [TrendForce – Samsung HBM4E samples](https://www.trendforce.com/news/2026/05/29/news-samsung-starts-shipping-industry-first-hbm4e-samples-three-months-after-hbm4-mass-production-performance-up-over-20/), [SamMobile – Samsung HBM4 passes NVIDIA tests](https://www.sammobile.com/news/samsungs-hbm4-chips-have-reportedly-passed-nvidias-tests-with-flying-colors/)

---

## 4. TSMC 파운드리·첨단 패키징 최신화

### N2 (2nm) 캐파 확대
| 항목 | 수치 | 출처 |
|---|---|---|
| N2 현재(2026 상반기) WPM | **~50,000+** | TSMC |
| N2 2026년 말 목표 WPM | **~140,000** | TSMC (2025 Q4 발표, 180% YTD 증가) |
| TSMC 2026 CapEx | $52~56B | TSMC 가이던스 |
| TSMC Q1 2026 매출 | **$35.9B** | 분기 최고 |

- N2 GAA(Gate-All-Around) 트랜지스터 도입, ISO-power 대비 최대 15% 성능 향상
- Fab 20·Fab 22 N2 생산 거점, 2026년 내 N2P·A16 파생 노드 준비

- 출처: [TechSpot – TSMC N2 volume production](https://www.techspot.com/news/110755-tsmc-2nm-n2-process-officially-enters-volume-production.html), [StreetStocker – TSMC 2nm 50K to 140K 2026](https://streetstocker.com/tsmc-2nm-capacity-constraints-2026/)

### CoWoS + OSAT 외주화 병행 확대
| 항목 | 수치 | 비고 |
|---|---|---|
| TSMC CoWoS 2026말 목표 | **130,000 WPM** | 이전 127K~130K 상단 확정 |
| OSAT 외주 연간 물량 | **240,000~270,000 웨이퍼/년** | 신규 — 2026년부터 |
| 그중 Amkor 비중 | 180,000~190,000 웨이퍼/년 | |
| 그중 SPIL 비중 | 60,000~80,000 웨이퍼/년 | |
| NVIDIA CoWoS 점유 | TSMC CoWoS의 **60%+** | 2026~2027 |

- TSMC CEO CC Wei "CoWoS는 2026년 전체 sold out 상태" 재확인(2026-05-14 TSMC 실적 발표)
- TSMC: 2026년에 CoWoS·SoIC 등 18개 새 팹 및 첨단 패키징 시설 건설 중
- 선진 패키징 매출 비중: 2025년 8% → 2026년 **10% 돌파** 예상

- 출처: [GlobalSemiResearch – TSMC CoWoS scaling](https://globalsemiresearch.substack.com/p/tsmcs-cowos-capacity-scaling-up-outsourcing), [Digitimes – TSMC expands CoWoS and SoIC](https://www.digitimes.com/news/a20260514PD237/tsmc-cowos-soic-capacity-packaging.html), [CNBC – Nvidia snaps up AI chip packaging](https://www.cnbc.com/2026/04/08/tsmc-nvidia-advanced-packaging-intel.html)

---

## 5. HBM 시장 수급 최신화

### 공급 현황
| 공급사 | 2026 HBM 시장 점유 추정 | 비고 |
|---|---|---|
| SK하이닉스 | **50~55%** | Rubin HBM4 60~70% 공급 |
| 삼성전자 | **35~40%** | HBM4 양산(2월)·HBM4E 샘플(5월) |
| Micron | **5~10%** | HBM4 Rubin 나머지 |

- **2026년 HBM 전량 sold out**: 3사 모두 2026년 HBM 생산분 하이퍼스케일러 장기계약으로 완판
- **2027~2028년 선예약 시작**: 고객들이 이미 2027년 이후 HBM 공급 예약 진행 중
- HBM3E 가격: ~$300/스택 (HBM3 ~$200/스택, HBM4 ~$500/스택 예상)
- HBM3E 2026년 가격 인상: 약 20% (Samsung·SK하이닉스 협의 결과)

- 출처: [Tom's Hardware – Samsung SK Hynix shortage until 2027](https://www.tomshardware.com/tech-industry/artificial-intelligence/samsung-and-sk-hynix-warn-ai-driven-memory-shortages-could-last-until-2027-and-beyond-as-hbm-demand-explodes-customers-already-reserving-supply-years-ahead-while-the-wider-dram-market-begins-to-tighten), [TradingKey – SK Hynix HBM Shortage Until 2028](https://www.tradingkey.com/analysis/stocks/more/261879241-sk-hynix-hbm-shortage-samsung-tracker-valuation-tradingkey), [TrendForce – HBM prices 20% hike](https://www.trendforce.com/news/2025/12/24/news-samsung-sk-hynix-reportedly-plan-20-hbm3e-price-hike-for-2026-as-nvidia-h200-asic-demand-rises/)

---

## 6. 병목 모델 제약지수 변동 요약 (2026-06-14 → 2026-06-17)

| 병목 | 이전(06-14) | 현재(06-17) | Δ | 주요 근거 |
|---|---:|---:|---:|---|
| **전력** | 70 | **72** | **▲ +2** | ERCOT 410GW 큐(87% DC)·Q1 198GW 신규·PJM 6.6GW 미달·용량가격 $333.44/MW-day 기록·변압기 리드타임 4년 확대 |
| **CAPEX/ROI** | 42 | **40** | **▼ −2** | SK하이닉스 Q1 KRW 52.6조(+198% YoY)·빅4 Q1 CapEx 확정(Amazon $44.2B 등)·구글클라우드 +110%·전체 하이퍼스케일러 $782B 확인·HBM 수급 완판 |
| **파운드리** | 52 | **50** | **▼ −2** | NVIDIA Rubin 풀 프로덕션 진입(Q3 출하)·3사 HBM4 인증 완료(2026-06-05)·N2 140K WPM 순항·TSMC 18개 신규 팹 건설 |
| **패키징** | 68 | **66** | **▼ −2** | TSMC OSAT 외주 연간 240K~270K 웨이퍼(Amkor+SPIL) 추가·CoPoS 완공·선진 패키징 >10% 매출·전체 CoWoS 생산량(내부+외주) 급확대 |
