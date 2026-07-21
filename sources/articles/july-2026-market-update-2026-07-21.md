# 2026년 7월 21일 시장 업데이트 — 전력망 구조적 부족 확정·TSMC/ASML 실적 서프라이즈·CXMT 상장·삼성 Q2 사상 최대

- **수집일**: 2026-07-21
- **이전 스냅샷**: 2026-07-17 (삼성 HBM4 볼륨 발주 대기), 2026-07-04 (병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (SemiAnalysis·Counterpoint·TechInsights 우선 + PJM·TSMC·ASML·CXMT·Reuters·FT·Korea 언론 보강)
- **목적**: 2026-07-21 정기 점검 — Bottleneck Model 갱신 + 위키 전반 반영
- **수집 방법**: 3개 병렬 리서치 에이전트(① HBM/DRAM 가격·실적, ② 전력·CAPEX·파운드리·패키징 병목, ③ 중국·정책·반독점). counterpointresearch.com은 지속 403 차단 — 2차 인용 경유.

---

## 1. 전력망 — 구조적 부족이 예측에서 실측으로 (PJM 용량경매 3년 연속 미달)

| 지표 | 최신 수치 | 이전(07-04) | 비고 |
|---|---|---|---|
| PJM 2028/29 용량경매 (2026-07-14 발표) | 138,318MW 조달, 목표 대비 **6,831MW 부족** — 3년 연속 미달, 가격은 법정상한 $325/MW-day에서 3년 연속 청산 | 6.6GW 부족 "경고"(전망치) | 전망이 실제 경매 결과로 확정됨 — 신규 DC 수요가 예비력 목표 미달의 주된 요인 |
| PJM 폭염 비상 (2026-07-01/02) | 피크 수요 159.6~162.9GW, Max Generation Alert 발동 | — | 신규, 전망이 아닌 실제 그리드 스트레스 이벤트 |
| PJM 27/28 예비마진 | 목표 20% 대비 **14.4%**로 하락 — 2027년 마이너스 헤드룸 가능성 | — | 신규 |
| ERCOT 대형부하 큐 | **438GW+**(Batch Zero 프로세스 2026-07-11 가동) | 410GW+ | 추가 확대 |
| 변압기·개폐장치 리드타임 | 업계 전반 140~160주+, 제약구간 **최대 4년**, 개폐장치는 2028년까지 사실상 완판 | 최대 5년 | 유사 구간 재확인, 자금 리스크 정량화 추가 |
| **CAPEX 지연 리스크 (신규 정량화)** | 2026년 하이퍼스케일러 DC CAPEX($750B+)의 **30~50%가 전기설비 부족으로 지연·취소 리스크** | — | Wood Mackenzie 기반 추정, 신규 |
| SemiAnalysis 재프레이밍 | "그리드 자체는 더 이상 유일한 병목이 아니다 — **BTM(behind-the-meter) 발전력**이 새 결정 변수"(2028년까지 美 BTM DC 40GW+ 전망). 가스터빈 연 10GW 미만 추가(2027년까지) | 그리드 큐 중심 서술 | 병목 구조의 질적 전환 — 전력 문제가 "접속 지연"에서 "자가발전 확보 경쟁"으로 이동 |
| 원자력·SMR 커밋 | 9.8GW+ 유지(신규 확대 없음) | 9.8GW+ | 불변, 가동은 대부분 2028년 이후 |

- 출처: [PJM 용량경매 보도자료](https://www.pjm.com/-/media/DotCom/about-pjm/newsroom/2026-releases/20260714-pjm-capacity-auction-procures-138318-mw-of-generation-resources.pdf), [Times Leader](https://www.timesleader.com/news/1749209/pjms-2028-2029-capacity-auction-hits-price-caps-again-short-6-8-gigawatts-of-reliability-requirement), [Electric Choice — 폭염 비상](https://www.electricchoice.com/blog/pjm-emergency-order-heat-wave-2026/), [build.inc — 변압기](https://build.inc/insights/data-center-transformer-procurement-2026), [chargeduppro.com](https://chargeduppro.com/post/data-center-transformer-shortage-power-bottleneck-industrial-property-2026), [Utility Dive — ERCOT 438GW](https://www.utilitydive.com/news/texas-facing-438-gw-queue-approves-initial-large-load-interconnection-pro/823367/), [SemiAnalysis — BTM 재프레이밍](https://newsletter.semianalysis.com/p/us-grid-constraints-towards-40gw), [smrintel.com](https://smrintel.com/nuclear-data-center-deals/)

---

## 2. CAPEX/ROI — 실적 시즌 임박, 신규 가이던스는 대부분 다음 주

- **Meta**: FY26 capex 가이던스 **$125~145B**로 재확인(메모리 가격 상승 명시적 언급, 07-04 대비 불변).
- **Alphabet**: 2026년 capex ~$190B 재확인(구성 요소 중 $25B이 부품가 인플레). 단, **Q2 실적 발표는 2026-07-22**(수집 시점 익일) — 신규 가이던스 미반영.
- **주요 캘린더**: Microsoft·Meta 07-29, Amazon 07-30 실적 발표 — **이번 창구(07-05~07-21) 내 하이퍼스케일러 4사 중 실제 콜 코멘터리는 전무**, 사전 재확인 수치만 존재.
- 빅4 2026 CAPEX 합산 **~$725B(+77% YoY)** 컨센서스 유지. TSMC가 "AI 수요 둔화 신호 없음"을 실적 콜에서 재확인(파운드리 참조).
- **평가**: 07-04 대비 완화(하향) 방향의 신규 확증은 제한적 — 기존 수치 재확인 수준. 진짜 시험대는 07-22~07-30 실적 시즌 이후.

- 출처: [Yahoo Finance — 빅테크 capex 로드업](https://finance.yahoo.com/sectors/technology/articles/google-microsoft-meta-amazon-capex-131823436.html)

---

## 3. 파운드리·패키징 — TSMC·ASML 실적 서프라이즈, CoWoS 갭 축소 전망 재확인

- **TSMC 2026-06 월매출**: NT$442.68B(+67.9% YoY, 사상 최고), 상반기 누계 +35.6% YoY.
- **TSMC Q2 2026 실적 콜 (2026-07-16)**: FY26 매출 성장률 가이던스를 "40% 상회"로 상향, **CAPEX $52~56B → $60~64B로 상향**. N2가 처음으로 웨이퍼 매출의 3% 기여, HPC/AI가 웨이퍼 매출의 66% 차지. 애리조나 추가 $100B 투자 발표(누적 $265B).
- **ASML Q2 2026 (2026-07-15/18)**: 가이던스 상회, FY26 매출 전망 €43~45B로 상향, EUV 매출 성장률 ~45%. 단 **High-NA는 분기 중 1대만 출하** — 도입 지연(2029년 목표)이 실측으로 재확인. Intel은 생산 라인에서 가동 시작.
- **CoWoS 공급-수요 갭**: TrendForce 전망 2026년 말까지 **20%→10%로 축소**, TSMC 캐파 2026년 말 120K~140K장/월(2025년 말 75K 대비 확대) + OSAT 50K~60K장/월 ≈ 산업 전체 약 200K장/월. CEO 웨이저자 재확인: CoWoS는 "매우 타이트, 2026년까지 sold out" 지속, NVIDIA 배정 ~60%(~100만 장 중).
- **HBM4 하이브리드본딩**: SemiEngineering 재확인 — "HBM4 sticks with microbumps, postponing hybrid bonding". SK하이닉스 12-Hi 하이브리드본딩 검증(4월)은 수율 개선 진전이나, 16-Hi 전면 채택은 2026년 하반기~2027년으로 여전히 지연.
- **Amkor**: 2026년 CAPEX를 $2.5~3B로 상향(2.5D/HDFO, 한국·대만), 애리조나 부지 확장. TSMC-Amkor 애리조나 첨단패키징 10년 파트너십 체결(2026-06-17).

- 출처: [TSMC IR — 6월 매출](https://pr.tsmc.com/english/news/3323), [BigGo Finance — TSMC Q2 콜](https://finance.biggo.com/news/US_TSM_2026-07-16), [Motley Fool — ASML Q2 콜 트랜스크립트](https://www.fool.com/earnings/call-transcripts/2026/07/15/asml-asml-q2-2026-earnings-call-transcript/), [TrendForce — CoWoS 갭 축소](https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/), [SemiEngineering — HBM4 마이크로범프](https://semiengineering.com/hbm4-sticks-with-microbumps-postponing-hybrid-bonding/)

---

## 4. HBM/DRAM 시장 — 삼성 Q2 사상 최대·SK하이닉스 실적 임박·메모리주 밸류에이션 조정

- **DRAM/NAND 가격 — 공식 전망 vs 스팟 괴리(신규)**: TrendForce(2026-07-03) 공식 Q3 전망은 범용 DRAM +13~18%·NAND +10~15% QoQ(불변, 07-04 위키 수치와 일치). 그러나 대만 모듈업체 **ADATA**는 Q3 DRAM 스팟가가 **+20~30%**, NAND가 **+35~40%**로 더 가파르다고 보고(TrendForce 2026-07-08) — 공식 계약가 전망보다 스팟·모듈 유통단은 더 강한 상방 압력을 받고 있음을 시사. 두 계열 병기 필요.
- **삼성전자 Q2 2026 잠정실적 (2026-07-07 발표)**: 매출 **약 171조 원**, 영업이익 **약 89.4조 원**(YoY +1,181%, 상여충당금 제외 시 약 100조 원 추정) — 사상 최대 분기 실적, HBM·DRAM 가격 상승이 견인. 컨센서스(86~87.3조 원)를 상회. 그러나 발표 당일 주가는 **6~10% 하락**(밸류에이션 부담·AI CapEx 지속가능성 우려에 따른 차익실현). DS부문 세부·HBM 코멘터리를 포함한 확정 실적은 **2026-07-30 발표 예정**(수집 시점 기준 미발표).
- **SK하이닉스 Q2 2026 실적 임박**: 발표 예정일 **2026-07-29**(수집 시점 기준 미발표). 컨센서스는 영업이익 약 63.45조 원·매출 약 82.89조 원(YoY 각각 +589%/+273%). 실적 발표를 앞두고 주가 약 +14% 랠리.
- **메모리주 밸류에이션 조정(신규 신호, 해석 주의)**: Micron·삼성·SK하이닉스·SanDisk·Western Digital 등 메모리/AI 인접 종목이 2026-07-02~07-19 사이 고점 대비 20%+ 하락하며 "약세장" 진입(Yahoo Finance/247WallSt/Motley Fool). 계기는 한 증권사(KIS)의 SK하이닉스 Q2 추정치가 컨센서스 대비 8% 낮다는 노트(HBM4 출하 시점 리스크 지적) + 삼성 YTD +150% 랠리 이후 차익실현. **이는 실적·수요 펀더멘털 악화가 아니라 밸류에이션·센티먼트 신호로 해석** — DF1(구조적 AI 수요) 축과는 구분해 다룬다(§핵심 판독 참조).
- **16-Hi HBM4 — 신규 경쟁 축**: NVIDIA의 차세대 16-Hi HBM4 물량(2026 Q4 목표)을 두고 삼성·SK하이닉스·Micron 3사가 경쟁 중이라는 보도(TweakTown) — 기존 8-Hi/12-Hi 인증·배정 구도에 더해진 다음 세대 경쟁 축. 삼성의 볼륨 발주 지연(07-17 기 반영) 국면에서 16-Hi가 재진입 기회가 될 가능성.
- **HBM 점유율 — 신규 확정 데이터 없음**: Counterpoint 공식 최신 갱신 미확인(웹 차단). 웹상 순환 중인 "SK 62%·Micron 21%·Samsung 17%" 수치는 **2025-09 vintage(2025 Q2 기준)**로 위키의 2026-04 잠정치(삼성 35~40%)·Q1 2026 확정치(삼성 32%)를 대체할 근거가 아님 — 오사용 주의 플래그.

- 출처: [TrendForce — Q3 공식 전망](https://www.trendforce.com/presscenter/news/20260703-13134.html), [TrendForce — ADATA 스팟가](https://www.trendforce.com/news/2026/07/08/), [CNBC — 삼성 Q2 잠정실적](https://www.cnbc.com/2026/07/07/samsung-electronics-preliminary-second-quarter-profit-hits-fresh-high.html), [Yahoo Finance — 삼성 Q2](https://finance.yahoo.com/markets/stocks/articles/samsung-q2-2026-earnings-record-112138779.html), [Korea Times/247WallSt — SK하이닉스 컨센서스](https://www.247wallst.com), [TweakTown — 16-Hi HBM4]

---

## 5. 중국 — CXMT 상하이 IPO·BIS 등재 보류·의회 반발·한국 검찰 별도 수사

- **CXMT 상하이 STAR Market IPO (2026-07-16)**: 상장 첫날 거래 개시, **약 $4.1~4.3B 조달** — 2026년 중국 A주 최대 IPO. Q1 2026 매출 약 **$7.3B(+700% YoY)**. 텐센트와 다년 서버 DRAM 공급계약(약 200억 위안/$3B, 2026-06 보도) 체결. HBM3 양산은 2026년 말 목표로 유지하나, 경쟁력 있는 수율 확보는 **2028년 이후**가 현실적이라는 평가 유지.
- **BIS Entity List 등재 보류(신규)**: 트럼프 행정부가 CXMT의 BIS Entity List 추가를 미중 무역협상과 연계해 **보류**한 상태(The Register·FT, 2026-07-17) — 애플–CXMT 로비(07-08 반영)와 같은 방향의 디에스컬레이션 신호.
- **의회 반발 심화(신규)**: 하원 미중전략경쟁특별위원회 위원장 존 물리너(Moolenaar)·조지 화이트사이즈(Whitesides) 의원이 상무장관 러트닉에게 서한(2026-07-17 전후) — ① 애플 등 미국 기업의 CXMT/YMTC 메모리 구매 금지, ② CXMT Entity List 등재, ③ YMTC 제재 확대, ④ 중국 군 연계 공급사 조달 금지 행정명령 촉구.
- **한국 — 별도 수사 트랙(신규)**: 서울중앙지검이 2026-07-15 Montage Technology·Renesas·Rambus 등 삼성·SK하이닉스에 메모리 인터페이스 칩(MIC)을 공급하는 3개 업체 한국 사무소를 압수수색 — 가격 담합 의혹(공정거래법 위반). 이는 미국의 DRAM 가격담합 집단소송(삼성·SK·Micron 피고, 2026-06-25)과는 **별개 트랙**(상류 부품 공급사 대상)으로, [dram-antitrust-litigation.md](../../wiki/concepts/dram-antitrust-litigation.md)에 별도 기록 필요.
- **한국 정책**: 2026-06-29 발표된 "3대 메가프로젝트" 브리핑에서 삼성 용인 국가산단 완공 목표가 **2040년**(기존 대비 -7년), SK하이닉스 용인 일반산단은 **2035년**(-12년)으로 단축. SK하이닉스 1호 팹은 2027년 상반기 목표로 삼성보다 앞서 있음(그리드 인프라 구축을 10년→5년으로 압축). 삼성 부지는 행정·지리적 여건으로 상대적으로 진행이 더딤. 2026-07-13 "하반기 경제정책방향"에서 반도체·AI에 약 1,350조 원 규모 지원(800조 원 팹클러스터 + 18.1조 원+ 신규 반도체 금융지원 프로그램, 7월 출범) 발표.
- **NVIDIA/Anthropic — 삼성 파운드리 커스텀칩 논의(신규, HBM 외 영역)**: Anthropic이 삼성 2nm 파운드리 공정 기반 커스텀 AI 칩을 초기 단계로 논의 중(2026-07-02 보도) — HBM이 아닌 로직/파운드리 인접 스레드지만 삼성-Anthropic 관계 확대 신호로 기록.

- 출처: [Digitimes — CXMT IPO](https://www.digitimes.com/news/a20260716PR201/cxmt-shanghai-ipo-dram-technology.html), [The Register — BIS 보류](https://www.theregister.com/systems/2026/07/17/chinese-memory-ban-would-cut-off-rampocalypse-relief/5273993), [Seoul Economic Daily — 의회 서한](https://en.sedaily.com/international/2026/07/17/us-lawmakers-urge-ban-on-chinese-memory-chips-apple-seeks), [Financial News — 한국 MIC 수사](https://www.fnnews.com/news/202607151744156797), [Kyeongin Ilbo — 용인 클러스터](https://www.kyeongin.com/article/1766431), [Newspim — 하반기 경제정책방향](https://www.newspim.com/news/view/20260713001090), [TechTimes — Anthropic-삼성 파운드리](https://www.techtimes.com/articles/319574/20260702/anthropic-talks-samsung-build-custom-ai-chip-aiming-2nm-process.htm)

---

## 6. 병목 모델 제약지수 변동 요약 (2026-07-04 → 2026-07-21)

| 병목 | 이전(07-04) | 현재(07-21) | Δ | 주요 근거 |
|---|---:|---:|---:|---|
| **전력** | 72 | **75** | **▲ +3** | PJM 용량경매 3년 연속 미달(6.8GW 부족, 전망→실측 확정)·폭염 비상(피크 162.9GW)·예비마진 14.4%(목표 20%대비 마이너스 헤드룸 임박)·변압기 최대 4년+개폐장치 완판·CAPEX $750B의 30~50% 지연 리스크 정량화(신규)·SemiAnalysis: 그리드에서 BTM(자가발전)이 새 결정변수로 재프레이밍 |
| **CAPEX/ROI** | 40 | **40** | **— 0** | 실적 시즌(빅테크 4사 콜) 대부분 07-22~07-30 예정 — 이번 창구엔 기존 가이던스 재확인만, 신규 하향·상향 신호 부재. 삼성 Q2 사상 최대(89.4조 원)에도 주가 6~10% 하락은 밸류에이션 신호로 별도 취급(지수 미반영) |
| **파운드리** | 50 | **48** | **▼ −2** | TSMC Q2 콜(FY26 성장률 40%+ 상향·CAPEX $60~64B 상향·N2 3% 기여 개시·HPC/AI 66%)·6월 매출 사상 최고(+67.9% YoY)·ASML Q2 가이던스 상향(€43~45B)·High-NA 여전히 지연 확인(분기 1대만 출하, 리스크 축소 방향 재확인) |
| **패키징** | 67 | **65** | **▼ −2** | CoWoS 공급-갭 20%→10%로 축소 전망 재확인(TrendForce)·캐파 2026말 120~140K장/월(75K 대비 확대)+OSAT 50~60K·Amkor CAPEX 상향. 단 sold-out 상태·HBM4 마이크로범프 유지는 불변 — 완화 지속되나 폭은 07-04와 유사한 속도 |

**하방 위험 순서 불변: CAPEX/ROI > 전력 ≈ 패키징 > 파운드리. 전력은 3개 분기 연속 재상승(68→70→72→75)이자 유일하게 지수가 지속 악화 — 이번 갱신에서 처음으로 "전망"이 아닌 "실측 결과"(PJM 경매 미달)로 확정된 점이 특징. 파운드리·패키징은 완화 지속, CAPEX는 실적 시즌 대기로 보합.**

**참고 — DF1/DF2 거시 축**: 이번 창구의 신규 신호(전력 병목 악화, TSMC/ASML 실적 서프라이즈, CXMT 상장, BIS 보류-의회 반발 상쇄, 메모리주 밸류에이션 조정)는 모두 (a) Bottleneck Model 영역(물리적 실현가능성 제약) 또는 (b) 개별 기업 실행·센티먼트 신호이며, Shell 시나리오 매트릭스의 DF1(AI 수요 구조)·DF2(미중 디커플링) 거시 축을 이동시키는 신규 근거는 없다. DF1/DF2·시나리오 확률은 직전 2026-07-14/07-21 재평가(v2.31.6, [key-drivers.md](../../wiki/driving-forces/key-drivers.md))를 유지한다.
