# 2026년 7월 시장 업데이트 — 전력망 신규 데이터·CapEx 추가 상향·SK하이닉스 나스닥 상장·반독점 소송·HBM4 공급 재편

- **수집일**: 2026-07-04
- **이전 스냅샷**: 2026-06-14 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 + PJM·ERCOT·TrendForce·Dell'Oro·JPMorgan·Fortune·Gizmochina 등 보강)
- **목적**: 2026-07-04 병목 모델 정기 점검 + 위키 전반 갱신 데이터 소스
- **수집 방법**: 5개 병렬 리서치 에이전트(전력/CAPEX/파운드리·패키징/HBM시장/AI DC·SemiAnalysis 전담). counterpointresearch.com·techinsights.com·newsletter.semianalysis.com 일부는 직접 fetch 403 차단 — 검색 스니펫·2차 인용 경유(원문 대조 권고 플래그).

---

## 1. 전력망 — 신규 데이터 (PJM 개편 큐·ERCOT 4배 급증·설비 리드타임)

| 지표 | 최신 수치 | 이전(06-14) | 비고 |
|---|---|---|---|
| PJM 개편 큐 Cycle 1 (2026-04-29 발표) | 811개 프로젝트·220GW nameplate (가스 105.8GW·저장 66.5GW·원자력 17.9GW) | 미수집 | 최초 "first-ready, first-served" 사이클, 퓨전에너지 1건 포함 |
| PJM 구조적 공급 부족 | 2027~28년 6.6GW 부족 · 2030년까지 최대 15GW 부족 (신규 공급 연 2~3GW vs 신규 DC 부하 연 5~7GW) | 미수집 | 신규 |
| ERCOT 대형부하 접속 큐 | **410GW+** (1년 만에 거의 4배) — 87%가 DC·크립토 | 145GW(2031 전망치) | 큐 총량 기준, 성격 다름(전망 아닌 신청 잔량) — 2024~25 신규 발전 ~23GW+2026 9GW 추가뿐, 45:1 신청:증설 배율 |
| 텍사스 PUCT 대형부하 정책 표결 | 2026-07-09 예정 | — | 신규 |
| 변압기·개폐장치 리드타임 | 최대 **5년** — 이제 가스터빈보다 더 강한 병목 | — | 신규, GE Vernova 터빈 리드타임 ~3년·2028년까지 예약 마감과 대비 |
| GE Vernova 터빈 백로그 | 2026년 말까지 110GW 누적(예약 포함) | — | 신규 |
| Siemens Energy 백로그 | €136B (사상 최고) | — | 신규 |
| 원자력·SMR DC향 커밋 총량 | **9.8GW+** (전 주요 빅테크 참여) | 미수집 | Meta 2026-01-09 오클로/비스트라/테라파워 최대 6.6GW 등 |
| IEA 글로벌 DC 전력 2030 | 945TWh (2024년 415TWh 대비 2배) | 동일(불변) | 미국 2026 DC 수요 260TWh 추정 신규 |

- **SemiAnalysis 핵심 아티클**: "US Grid Constraints: Towards 40GW+ of Behind-the-Meter Datacenter by 2028?" — 그리드 신규 대형부하 여력이 2027년 조기 마이너스 전환 가능, BTM이 2028년부터 신규 미국 DC의 과반 전력 공급, BTM 장비 TAM 2029년 연 50GW 돌파.
- **SemiAnalysis**: "Stop Saying Half of 2026 US Datacenter Capacity Is Canceled" — "취소 50%" 주장은 과장이나(북미 하이퍼스케일러 자체건설 전망 최근 6개월간 1%만 하향, 코로케이션 5% 미만), 2026년 계획 캐파의 30~50%가 2027~28로 실제 이연 확인(오라클 가스터빈 허가 철회→Bloom Energy 연료전지 전환, 뉴멕시코 허가 심사 2026-07-21로 지연 등).
- 출처: [PowerMag](https://www.powermag.com/pjms-first-reformed-queue-cycle-draws-811-projects-220-gw/), [Utility Dive – PJM shortfall](https://www.utilitydive.com/news/pjm-interconnection-load-forecast-data-centers/809717/), [RTO Insider – ERCOT queue](https://www.rtoinsider.com/129421-ercot-large-load-requests-soar-again/), [Latitude Media](https://www.latitudemedia.com/news/ercots-large-load-queue-has-nearly-quadrupled-in-a-single-year/), [SemiAnalysis – Grid Constraints](https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw), [SemiAnalysis – Cancellation pushback](https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter), [Power-Eng – turbine backlog](https://www.power-eng.com/gas/turbines/data-centers-drive-record-surge-in-ge-vernova-power-equipment-orders-as-turbine-slots-tighten-through-2030/), [Utility Dive – Meta nuclear](https://www.utilitydive.com/news/meta-nuclear-deal-oklo-vistra-terrapower-ai-data-centers/809215/), [DCD – IEA 945TWh](https://www.datacenterdynamics.com/en/news/iea-data-center-energy-consumption-set-to-double-by-2030-to-945twh/)

---

## 2. CAPEX/ROI — 추가 상향 (빅5 개별 가이던스·Dell'Oro $1조 돌파·JPMorgan $5.5조)

| 빅테크 | 2026 CAPEX 가이던스 | 비고 |
|---|---|---|
| Microsoft | ~$190B (+61% YoY) | CFO Amy Hood: 증가분 중 **$25B을 메모리 칩·부품 원가 상승에 직접 귀속** |
| Alphabet | $180~190B (이전 $175~185B) | 추가 상향 |
| Amazon | ~$200B | |
| Meta | $125~145B | 불변(06-14 기준과 동일) |
| Oracle | ~$50B | 신규 포착 |

- **Dell'Oro Group**: 2026년 글로벌 데이터센터 CAPEX 전망 **$1조 돌파**로 상향(2026-06-10 발표) — 메모리·스토리지 가격 인플레이션을 CAPEX 상승의 명시적 요인으로 지목, 빅4 CAPEX 분기 +78% YoY.
- **JPMorgan**: 2030년까지 누적 AI 인프라 CAPEX 전망 **$5.5조로 상향**(이전 $5.1조), 부채 조달 규모 $4.1조로 상향. 2026년 하이퍼스케일러 CAPEX $650B·2027년 $1.1조+ 전망.
- **신용시장**: HY OAS ~285bp로 타이트(스트레스 신호 없음), IG 발행 연초 5개월 누적 $800B(테크 $144B 포함). CoreWeave DDTL $3.1B(5/18)·$8.5B(3/31, SOFR+2.25%) 체결. 오라클·메타·xAI·CoreWeave 등 SPV 경유 부외부채 누적 ~$120B — 의존도는 지속되나 스프레드 자체는 안정.
- **Q1 CY2026 클라우드 성장률(교차검증 필요 — 06-14 수치와 정의 상이 가능)**: AWS +28%($37.6B)·Azure +39~40%·Google Cloud +63%($20B, 역대 최고). 06-14 항목의 Azure+84%/GCloud+110%는 다른 지표(AI 매출 런레이트 등) 기준일 가능성 — 위키 lint에서 정의 통일 필요.
- **신규 리스크**: Samsung·SK하이닉스·Micron 대상 **반독점 집단소송**(2026-06-25, N.D. Cal., Garciaguirre v. Samsung 등) — HBM 전환을 명목으로 3사가 공모해 범용 DRAM 공급을 인위적으로 제한, 4년간 ~700% 가격 상승("RAMpocalypse")을 야기했다는 주장. §5에 상세.
- 출처: [Fortune – Big Tech capex](https://fortune.com/2026/06/29/ai-spending-boom-accelerates-big-tech-trillion-infrastructure-qualcomm-cfo/), [Tom's Hardware – $725B](https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion), [Dell'Oro PR](https://www.delloro.com/news/ai-infrastructure-buildouts-and-memory-cost-inflation-drove-data-center-capex-higher-in-1q-2026/), [Fortune – JPMorgan $5.5T](https://fortune.com/2026/06/25/what-bubble-jpmorgan-5-5-trillion-ai-capex-explosion-profitable-for-now/), [Guggenheim – credit](https://www.guggenheiminvestments.com/perspectives/sector-views/credit-standing-strong-as-ai-reshapes-the-landscape/), [Gizmochina – antitrust suit](https://www.gizmochina.com/2026/06/30/samsung-micron-and-sk-hynix-sued-over-artificial-ram-shortage-and-price-hikes/)

---

## 3. 파운드리·패키징 — TSMC/CoWoS/ASML 세부 갱신

- TSMC 6월 월매출: **미발표**(7/10 발표 예정, 수집 시점 기준 임박).
- N2: 2026년 3월부터 매출 기여 시작, 유의미한 매출 기여는 2026 Q3 예상. Kaohsiung Fab 22 + Baoshan 동시 램프.
- **CoWoS 세부**: NVIDIA가 배정량의 ~60%(~59.5만 장) 점유. TSMC는 2026년 24만~27만 장을 OSAT(Amkor·SPIL)에 외주. 첨단 패키징이 2026년 TSMC 총 CAPEX($520~560억)의 최대 20% 배정. CEO 웨이저자(C.C. Wei): "CoWoS 캐파는 매우 타이트하며 2025년~2026년까지 계속 sold out."
- **CoPoS**: 2026-06-17 TrendForce 확인 — AP7 Chiayi 파일럿(310×310mm 글래스코어 패널) 트라이얼 수율 ~90%. 단, **양산 전면 램프는 2028년 하반기~2029년**으로(DigiTimes: 2029년 목표) — 이전 위키 서술("6월 파일럿 완공")과 일치하되, 양산 지연은 재확인·강조 필요.
- **ASML**: 2026년 60기+ EUV 출하 목표(하이NA+로우NA) 유지, 백로그 €38.8B(2025년 말). **신규: TSMC가 High-NA EUV 도입을 최소 2029년까지 연기** — 비용 대비 현행 장비로 충분하다는 판단, 이전 전망(2027~28)보다 후퇴.
- **NVIDIA Rubin**: 29%→22% 출하 비중 하향 재확인. 2026년 하반기 물량 가용 확정. GTC에서 첫 Vera Rubin 랙이 Microsoft Azure에서 가동 중 공개.
- **HBM4 수율**: 삼성 하이브리드본딩 프로토타입(NVIDIA向 샘플) 수율 ~10%에 그침. 업계 전반 8Hi→12Hi 전환 시 수율 15~20%↓, 16-Hi는 더 큰 하락 예상. **HBM4는 당분간 마이크로범프 유지 — 하이브리드본딩은 업계 전반 연기 결정**. 3사 검증은 2026 Q2 중 완료 전망(이미 06-05 3사 인증 완료와 정합).
- 출처: [Silicon Analysts – Foundry allocation](https://siliconanalysts.com/analysis/foundry-allocation-status-q1-2026), [Fusion – CoWoS/HBM bottleneck](https://info.fusionww.com/blog/inside-the-ai-bottleneck-cowos-hbm-and-2-3nm-capacity-constraints-through-2027), [TrendForce – CoPoS](https://www.trendforce.com/presscenter/news/20260617-13107.html), [DigiTimes/Yahoo – CoPoS 2029](https://ca.finance.yahoo.com/news/tsmc-targets-2029-panel-level-200009934.html), [TechPowerUp – ASML 60+](https://www.techpowerup.com/348239/asml-targets-60-euv-shipments-in-2026-as-memory-demand-surges), [MSN – TSMC High-NA 지연](https://www.msn.com/en-us/news/other/tsmc-to-postpone-asmls-high-na-euv-rollout-until-2029/gm-GMLC021B00), [SemiEngineering – HBM4 microbump](https://semiengineering.com/hbm4-sticks-with-microbumps-postponing-hybrid-bonding/)

---

## 4. HBM/DRAM 시장 — 점유율·가격·공급망 재편

- **HBM 점유율 (Counterpoint, Q1 2026 확정치)**: SK하이닉스 ~58%·삼성 ~32% — 4월 데이터(35~40%)보다 낮음, **시점·집계 기준 차이로 추정**(Q1 확정 vs 4월 잠정) — wiki에 두 수치 병기, 추후 정합 필요. Counterpoint는 삼성 2026 연간 점유율 30% 돌파를 전망.
- **Vera Rubin HBM4 공급사별 배정**: SK하이닉스 60~70%·삼성 25~30%·Micron 잔여 — 이전 "3사 인증 완료"보다 세분화된 물량 분배 확인.
- **Micron Rubin 일시 배제 에피소드(신규)**: HBM4 베이스다이 검증·핀속도 이슈(Samsung/SK 대비 낮은 속도)로 NVIDIA가 초기 Rubin 빌드를 삼성·SK 2사 중심으로 계획했었다가, **2026-06-01 GTC 타이베이 기조연설에서 젠슨 황이 3사 전원 공급 확정·여름 출하 시작을 재확인** — 자격 획득 과정이 알려진 것보다 굴곡이 컸음.
- **DRAM 가격 — Q3 2026 전망 감속(TrendForce, 2026-07-03, 최신)**: 범용 DRAM 계약가 QoQ **+13~18%**로 대폭 감속 전망(Q2 +58~63% 대비) — PC/스마트폰 구매력 한계·고기저 효과. 서버/RDIMM 수요는 에이전틱 AI로 지지력 유지. **병목 모델·수요 변곡 EWI 양쪽에 중요한 조기 신호**(가격 상승 감속 = 초기 변곡 가능성, 단 서버향은 견조).
- **Jefferies 전망(교차 출처, 감속과 배치되는 수치 — 병기 필요)**: Q3 2026 메모리 가격 +40~50% QoQ·Q4 +30~40% QoQ — TrendForce의 "범용 DRAM 계약가" 특정치와 달리 스팟·HBM 포함 전반적 메모리 가격일 가능성, 범위 넓게 병기.
- **삼성 HBM4 가격·마진(Q1 CY2026 실적)**: NVIDIA向 단가 $500~560, 매출총이익률 80%+; 영업이익 YoY +756%(57.2조 원). HBM4/SOCAMM2 업계 최초 양산 판매 개시.
- **SK하이닉스 나스닥 이중상장(신규, 대형 이벤트)**: 2026-06-30 Form F-1 수정 제출, 티커 **SKHY**, 목표 조달액 **~$294억**, 거래 개시 **2026-07-10** 예정 — 역대 최대 ADR 상장 전망.
- **반독점 집단소송(신규)**: 2026-06-25 N.D. Cal. 제소(Garciaguirre v. Samsung Electronics 외 SK하이닉스·Micron) — HBM 전환 명목 하 범용 DRAM 공급 제한·가격 담합 주장, 4년간 ~700% 가격 상승 인용. 삼성이 피고로 명시 — 위키에 별도 개념 페이지로 추적.
- **한국 국가 반도체 생태계 계획(신규)**: 2026-06-29 발표, 규모 **약 800조 원($518B)** — 삼성·SK하이닉스 각각 신규 팹 2개씩 건설 계획.
- **CXMT(중국)**: HBM 웨이퍼 배정, 2026년 말까지 **월 3만 장(30k wspm)** 규모로 확대 전망(SemiAnalysis).
- **HBM4E 스펙 세부(SemiAnalysis "Scaling the Memory Wall")**: 데이터레이트 ≥12Gb/s(HBM3E 대비 2배 I/O 핀), 인터포저 레이어 최대 2배, 소비전력 HBM3E 대비 +86%.
- 출처: [Counterpoint – DRAM/HBM 점유율](https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share), [Counterpoint – SK하이닉스 1위](https://counterpointresearch.com/en/insights/post-insight-research-notes-blogs-sk-hynix-takes-top-spot-for-first-time-on-continued-hbm-demand), [Design Reuse – 삼성 30%+ 전망](https://www.design-reuse.com/news/202529413-samsung-s-share-in-hbm-market-projected-to-surpass-30-in-2026/), [TechTimes – Rubin 배정](https://www.techtimes.com/articles/317855/20260605/nvidia-vera-rubin-hbm4-jensen-huang-confirms-all-three-suppliers-production-q3-ship.htm), [TechPowerUp – Micron 일시배제](https://www.techpowerup.com/346044/nvidia-to-use-sk-hynix-and-samsung-hbm4-for-vera-rubin-without-micron), [TechTimes – 3사 재확인](https://www.techtimes.com/articles/317539/20260602/nvidia-vera-rubin-enters-full-production-samsung-sk-hynix-micron-named-hbm4-suppliers.htm), [TrendForce – Q3 DRAM 전망](https://www.trendforce.com/presscenter/news/20260703-13134.html), [Samsung Newsroom – Q1 2026](https://news.samsung.com/global/samsung-electronics-announces-first-quarter-2026-results), [CNBC – 삼성 영업익](https://www.cnbc.com/2026/04/30/samsung-q1-earnings-ai-memory-chip-demand-profit-record.html), [GuruFocus – SK하이닉스 나스닥](https://www.gurufocus.com/news/8939131/skhy-sk-hynix-files-for-294-billion-nasdaq-ipo), [Tom's Hardware – 반독점 소송](https://www.tomshardware.com/tech-industry/samsung-sk-hynix-and-micron-sued-over-alleged-dram-price-fixing-amid-record-memory-costs), [CNBC – 한국 반도체 800조](https://www.cnbc.com/2026/06/29/samsung-sk-hynix-reported-1point3-reported-trillion-spending-plans.html), [SemiAnalysis – Memory Wall](https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm), [SemiAnalysis – CXMT](https://newsletter.semianalysis.com/p/chinas-cxmt-is-set-to-challenge-dram)

---

## 5. AI 데이터센터 착공 — 글로벌 규모 재확인(SemiAnalysis + 보강)

- **글로벌**: 약 **190GW 하이퍼스케일 캐파**가 **777개 프로젝트**에 걸쳐 발표(148GW 계획·21GW 착공중·12GW 가동) — 위키 트래커(9단계·47건·55.9GW, 2026-06 수집)보다 훨씬 큰 모집단. 표본 방법론 차이로 추정(위키는 대형 랜드마크 프로젝트 선별 트래킹, 신규 수치는 전수 집계 성격) — 다음 ingest에서 방법론 조정 검토 필요.
- 미국: ~43GW 계획(84개 시설). Sightline Climate: 2026년 미국 발표 12GW(140개 프로젝트) 중 실제 착공은 5GW뿐 — "계획 vs 착공" 갭이 여전히 큼(§1의 SemiAnalysis 취소 논쟁과 같은 맥락: 계획 발표는 부풀려지나 실제 착공 캐파는 완만).
- 6대 하이퍼스케일러(Amazon·Google·Meta·Microsoft·Oracle·Stargate) 합산 CAPEX 서약 $690B+, 2026년 74개 시설 착공.
- Meta 단독 2026 상반기에만 5GW+ 클라우드·코로케이션 용량 계약(SemiAnalysis "Meta Compute: Everyone Wants To Be A Neocloud").
- **SemiAnalysis "The Great AI Silicon Shortage"**: HBM은 비트당 범용 DRAM 대비 웨이퍼 캐파를 **현재 3배** 소비, HBM4(2026)에서 **4배**로 확대, HBM4E(2027)는 더 커짐 — 병목 모델의 파운드리·패키징 병목 논리를 뒷받침하는 정량적 근거.
- **SemiAnalysis "Memory Mania"**: DRAM 셀 밀도 성장이 과거 10년당 100배에서 최근 10년당 2배로 급감 — 최근 메모리 가격 상승은 기술발전이 아닌 **캐파 증설·사이클성**이 지배적 요인이라는 구조적 해석. `semiconductor-cycle.md`에 반영 가치.
- 출처: SemiAnalysis 뉴스레터(직접 fetch 403, 검색 스니펫 경유): [Great AI Silicon Shortage](https://newsletter.semianalysis.com/p/the-great-ai-silicon-shortage), [Stop Saying Half Cancelled](https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter), [Memory Mania](https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades), [Meta Compute](https://newsletter.semianalysis.com/p/meta-compute-everyone-wants-to-be)

---

## 6. 병목 모델 제약지수 변동 요약 (2026-06-14 → 2026-07-04)

| 병목 | 이전(06-14) | 현재(07-04) | Δ | 주요 근거 |
|---|---:|---:|---:|---|
| **전력** | 70 | **72** | **▲ +2** | ERCOT 큐 1년 만에 4배(410GW+)·PJM 2030년까지 15GW 구조적 부족·변압기 리드타임 5년으로 터빈 추월(신규 최대 병목)·SemiAnalysis "2027년 그리드 여력 마이너스 전환 가능". 원자력 9.8GW+ 커밋·터빈 백로그 110GW는 공급 대응이나 리드타임 장기라 상쇄 제한적 |
| **CAPEX/ROI** | 42 | **40** | **▼ −2** | MS $190B·Alphabet $180~190B·Amazon $200B 추가 상향, Dell'Oro 2026 글로벌 DC CAPEX $1조 돌파, JPMorgan 2030 누적 $5.5조 상향, HY OAS 285bp 안정 — ROI 실현·자금조달 여건 모두 완화 방향 |
| **파운드리** | 52 | **50** | **▼ −2** | N2 램프 지속(3월 매출 기여 개시)·ASML High-NA 2029년으로 연기(근시일 리스크 축소)·Rubin 22% 하향 유지로 캐파 여유 지속 |
| **패키징** | 68 | **67** | **▼ −1** | NVIDIA 배정 60%·OSAT 외주 24~27만 장 확대(공급 대응 진행)이나, CoPoS 전면 양산 2028~29로 지연 재확인·HBM4 하이브리드본딩 수율 10%(마이크로범프 유지 결정)로 완화 속도 둔화 — 순완화 지속하나 폭 축소 |

**하방 위험 순서 불변: CAPEX/ROI > 전력 ≈ 패키징 > 파운드리. 전력은 유일하게 재상승 지속 — 큐 폭증·설비 리드타임(변압기 5년)이 터빈보다 더 강한 신규 병목으로 부상.**
