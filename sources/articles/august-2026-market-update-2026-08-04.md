# 2026-08-04 정기 점검 시장 데이터 — 빅4 하이퍼스케일러 Q2 CapEx 전원 상향(메모리 원가 명시) + 전력 병목 심화 + SK하이닉스 Q2 컨센서스 소폭 미스

수집일: 2026-08-04
유형: 정기 시장 점검 (5개 병렬 리서치: 하이퍼스케일러 실적·SemiAnalysis·Counterpoint/TechInsights·삼성 HBM4/가격·전력망+파운드리+패키징)
출처: CNBC·Seeking Alpha·MLQ News·TrendForce·SemiAnalysis(뉴스레터, 2차 인용)·Counterpoint/TechInsights(2차 인용, 원문 403 차단)·Digitimes·Winbuzzer·Yahoo Finance·Utility Dive·기타 (웹 리서치, 2026-08 접근)

---

## 1. 빅4 하이퍼스케일러 Q2 2026 CapEx — 전원 상향/재확인, 메모리 원가 명시 인용

직전 재평가(2026-07-28)에서 "다음 주 발표 예정, DF1 방향의 핵심 확인 이벤트"로 대기 중이던 MSFT·Meta(07-29)·Amazon(07-30) 실적이 모두 발표됨. **4사(Alphabet·MSFT·Meta·Amazon) 전원 CY2026 CapEx 가이던스 상향 또는 유지 확인 — 둔화 신호 0건.**

- **Alphabet** (07-22, 기수집): CY2026 $180~190B → **$195~205B** 상향. Cloud 매출 +82% YoY($24.8B), 백로그 QoQ +$50B→$514B.
- **Microsoft** (07-29, FY26 Q4): Q4 CapEx $41B(사상 최대). CY2026 가이던스 표면상 ~$175B로 하향 표기되었으나 **CFO Amy Hood가 순수 회계 처리 변경**(데이터센터·오피스 내용연수 15→25년 연장 + 향후 리스 금융리스→운용리스 재분류로 capex 계상 제외)이라고 명시적으로 밝힘 — "이 내용연수 영향을 제외하면 CY2026 capex 투자 기대치는 불변". **FY2027 capex는 YoY 성장 가이드**, FY27 Q1 capex+금융리스만으로 $50B+ 전망(일부 프리뷰는 FY27 전체 $255~260B, +35% 추정 — 실적 후 확정치 아님, 검증 필요 플래그). Azure Q4 +43%, FY26 매출 최초 $100B 돌파(+41%). 직전 분기(2026-04-29)엔 CFO가 CapEx 상향분 중 $25B을 메모리 원가에 귀속 — 이번 분기는 별도 재귀속 수치 미확인.
- **Meta** (07-29, Q2): CapEx $31.1B(분기). **CY2026 가이던스 $130~145B로 재상향**(연초 대비 두 번째 상향, 매번 원가 요인으로 설명). FCF $784M로 급감(capex가 영업현금흐름 거의 전액 소진), EPS 미스(법적 충당금 $2.4B 등)로 주가 -9.6%. CFO Susan Li: "수요 제약적"(capacity만 있으면 ROI-positive한 곳 많음), 2028년까지 공급망 제약 불확실성 언급.
- **Amazon** (07-30, Q2): 매출 $200.6B(+20%), AWS $42.2B(+37% YoY, 18분기 만 최고 성장). **CY2026 가이던스 ~$200B → ~$220B 상향, +$20B을 CNBC·TechTimes가 "메모리 가격 상승" 요인으로 명시 인용** — Bottleneck Model 관점에서 메모리 원가가 CapEx를 끌어올리는 되먹임 구조의 가장 명시적 확인 사례. CEO Jassy: "이렇게 써도 2026년 수요를 다 못 채운다", 2027년까지 지속 전망. 클라우드 계약 백로그 $364B→$496B(분기 내 급증). 주가 +12%(메모리발 증액을 수요확인 신호로 해석).
- **Oracle**: 이번 창 내 신규 발표 없음(회계연도 5월 말 마감, 다음 실적 9월 중순 예상). 기존 FY26 capex $55.7B·FY27 가이드 $70B(순 프로젝트 지출)·$90~95B(총 capex) 유지.

**빅4 합산**: 실적 후 확정 가이던스 기준 대략 **$730~760B**(Alphabet $195~205B + MSFT 회계상 ~$175B(실질 의도 불변, FY27 상향)+ Meta $130~145B + Amazon ~$220B) — 직전 분석가 추정 $700~725B(+77% YoY) 대비 소폭 추가 상향. **메모리 원가가 CapEx 상승의 명시적 귀속 요인으로 지목된 것은 Amazon(이번 분기 $20B)·Microsoft(직전 분기 $25B) 2개 분기 연속** — 메모리=AI 지출의 상당 축이라는 Bain 프레임([ai-compute-economics-gap.md](../../wiki/concepts/ai-compute-economics-gap.md))을 하이퍼스케일러 1차 자료로 재확인.

**주가 반응 괴리**: MSFT·AMZN는 증액을 수요확인으로 해석해 상승, META·GOOGL은 FCF·ROI 우려로 하락 — 시장의 해석이 갈리는 지점이나, **CapEx 가이던스 자체는 4사 전원 상향/재확인**이라는 사실은 불변.

## 2. SemiAnalysis — 전력망 구조 부족 전환점, 메모리가 하이퍼스케일러 CapEx의 ~30% 도달

- **"US Grid Constraints" (~2026-06)**: PJM 2027/28 용량경매가 134,478MW를 14.4% 예비율로 확보 — 목표 20% 대비 미달, **그리드 여력이 2027년경 마이너스 전환 가능** 전망. Behind-the-meter(전력망 우회) DC 용량이 2028년까지 40GW+ 도달 전망, BTM 장비 TAM 2029년 연 50GW+ 돌파.
- **"Memory Mania" / "China's CXMT..." (2025-11~2026-06)**: DRAM 시장을 "40년 만의 최고 타이트"로 규정. 삼성·SK하이닉스 2025 Q4 매출총이익률 60%+. **메모리가 CY26 하이퍼스케일러 capex의 ~30% 도달**(CY23~24 ~8%에서 급등) — Bain 추정과 정합. DRAM 가격 CY26 중 2배+ 전망. CXMT 2026 회계연도 매출 $50B+ 전망, STAR Market IPO 첫날 +465%(중국 메모리 자본시장 검증 신호, 신규).
- **CoWoS/패키징**: TSMC CoWoS 캐파 80K→120~130K WPM(2026년말), OSAT 포함 산업 전체 ~200K WPM. 수요 ~100만 장(2026) vs 67만 장(2025) — 수급 갭 20%→10%로 축소 전망(완화 방향, 기존 병목 모델과 정합).
- **파운드리**: TSMC 2026 CapEx 가이던스 $52~56B → **$60~64B 상향**(07-16 Q2 실적), 70~80% 첨단 노드 배정.
- **주의**: 뉴스레터 원문(newsletter.semianalysis.com)은 구독 장벽으로 직접 접근 차단(403) — 2차 인용/검색 스니펫 기반, 원문 대조 권고.

## 3. Counterpoint / TechInsights — DRAM/NAND 가격 전망 정합, HBM 점유율 데이터 상충(미반영 플래그)

- Counterpoint "Global Memory Price Tracker" (2026-07): DRAM Q3 2026 **+10~20% QoQ** — TrendForce 기존 +13~18% 전망과 대체로 정합, 신규 업데이트 불필요.
- **HBM 점유율 상충 발견 — wiki 미반영, 원자료 대조 전까지 보류**: 검색 스니펫상 두 세트가 상충 — (A) SK하이닉스 62%·Micron 21%·삼성 17% (2026 Q2, Astute Group/2차 인용) vs (B) SK하이닉스 50~55%·삼성 35~40%·Micron 5~10%(기존 wiki 4월 기준선과 정합). Counterpoint·TechInsights 원문 모두 403 차단으로 1차 확인 불가 — **본 위키 갱신에서는 기존 수치(B, 4월 기준선)를 유지**하고 상충 사실만 각주로 남긴다. Rubin 세대별 HBM4 배정(SK 60~70%)과 전체 HBM 매출 점유율은 별개 계열임에 유의.
- Counterpoint: 2026 스마트폰 출하 -2.1% 하향, 메모리발 BOM 비용 저가폰 +20~30%·프리미엄 +10~15%, 평균 ASP +6.9% YoY 상향(기존 +3.6% 대비). "2027년 하반기까지 의미있는 가격 조정 시나리오 없음" 논평.
- TechInsights: DRAM 스케일링 로드맵(0a/0b/0c, 3D DRAM/X-DRAM/IGZO), 300층+ NAND 하이브리드 본딩 관련 공개 블로그 스니펫 외 원문 접근 불가.

## 4. 삼성 HBM4/NVIDIA·SK하이닉스 Q2·미콘·CXMT·반독점

- **삼성 HBM4 볼륨 발주: 여전히 미전환**(변화 없음). 06-05 NVIDIA 3사 인증 이후에도 07-17 기준 유상 평가용 샘플 단계 유지, 08-04까지 이를 뒤집는 보도 없음. HBM4E(16Gbps/pin, 4.0TB/s)를 NVIDIA GTC 2026에서 공개했으나 이는 로드맵 시연이지 볼륨 발주 확정이 아님.
- **SK하이닉스 Q2 2026 (07-29 발표)**: 매출 ₩79.32조(+51% QoQ)·영업이익 ₩60.54조(영업이익률 76%)·순이익 ₩93.92조 — **사상 최대이나 컨센서스(~₩64.1조 영업이익) 소폭 미스**, 일부 매체는 HBM4 매출 인식 지연을 원인으로 지목. HBM4 양산 출하 개시, 다년 계약 ~10건 확보, 2026 CapEx 가이던스 ₩40조대 후반.
- **Micron**: HBM4(1-beta) 리드 고객向 대량 출하 중, HBM4E(1-gamma) 2027 양산 목표. **CY2026 HBM 공급 전량 완판**(가격·물량 계약 확정), HBM TAM 2028년 ~$100B 상향(기존 wiki 수치와 정합, 변경 없음).
- **CXMT**: HBM3 양산 시점 지속 지연, "2026년 내 양산 어려움" 전망 유지(변화 없음). 별도로 LPDDR6(비-HBM DRAM) 샘플링 개시, 2026 하반기 양산 목표(07-20) — HBM 축과 무관한 신규 제품 라인.
- **DRAM 반독점 집단소송**: 판결·기각 없음, 피고 측 기각신청(motion to dismiss) 예정 단계 유지. 2018년 유사 소송(Hagens Berman)이 2020년 기각·2022년 9巡회 항소법원 인용된 선례 존재 — 원고 측에 불리한 판례 환경.
- DDR4 스팟가($2.10/Gbit)가 HBM3E 계약가($1.70/Gbit)를 상회하는 역전 현상 관측(Counterpoint 인용) — 레거시 DRAM 희소성이 반독점 소송의 핵심 주장(HBM 전환에 따른 구형 DRAM 공급축소)과 맞물리는 배경으로 참고.

## 5. 전력망·파운드리·패키징 — 병목지수 갱신 근거

- **전력**: PJM 2028/29 용량경매 138,318MW 확보(목표 미달), 07-27 이사회가 백스톱 경매·DC 우선 감축안 제안 — **PJM이 신뢰성 목표를 놓친 최초 공식 신호**. ERCOT 대기열 410GW 확정 + 신규 제출 ~140GW 추가 대기(총 ~380GW 육박, 일부 추정 445.8GW/2033). 변압기 리드타임 **최대 60개월**(기존 "최대 5년"에서 추가 악화), 개폐장치 리드타임 44주→**60주+**로 확대 — 단일 공급원 GOES(방향성 전기강판) 병목이 근본 원인. 원자력/SMR 커밋 누적 ~9.8GW(13건)이나 대부분 2028년 이후 가동 — 단기 완화 효과 제한적.
- **파운드리**: TSMC Q2 2026(07-16/17) 매출 $40.2B·매출총이익률 67.7%(가이던스 상단), CY2026 매출성장률 가이던스 **40%+**로 상향, CapEx $60~64B 상향 + 애리조나 추가 $100B. N2 2026년 하반기 본격 양산 램프 진행(재고일수 76.5일로 증가·마진 3~4%p 희석 — N2 램프 비용 반영, 궤도상 정상 신호).
- **패키징**: CoWoS 130K WPM(2026년말) 궤도 재확인, Amkor/SPIL 외주 +20K WPM. **HBM4 하이브리드본딩 — 추가 지연 신호**: TrendForce(07-07) 삼성·SK하이닉스가 하이브리드본딩 타임라인을 재검토 중이며 **16-hi HBM4E가 현실적 최초 채택 시점**으로 후퇴(기존 07-04 기준 "마이크로범프 유지 선회"에서 한 단계 더 후퇴) — SK하이닉스 공식적으로 수율 미성숙 확인, 접합 공정(장시간 어닐링·다이 이송 속도) 이슈 지속.

---

## 종합 함의 (다음 섹션에서 병목지수·DF1/DF2·EWI 반영)

- **CAPEX/ROI 병목**: 4사 전원 상향/재확인 + 신용시장 안정 신호 지속(이번 라운드 신규 확인 없으나 이전 라운드 HY OAS 285bp 안정 기준 유지) → **추가 완화 방향**(지수 하향).
- **전력 병목**: PJM 경매 미달·백스톱 제안·변압기/개폐장치 리드타임 재악화 → **추가 긴장 방향**(지수 상향), 4대 병목 중 유일하게 연속 3개 분기 이상 악화.
- **파운드리**: CapEx·매출성장 가이던스 상향은 완화 신호이나 40%+ 성장은 수요가 공급 확장보다 여전히 빠름을 시사 → **소폭 완화, 방향 불변**.
- **패키징**: CoWoS 웨이퍼 캐파는 계획대로 완화 중이나 하이브리드본딩 지연이 HBM4E 로드맵에 스케줄 리스크 추가 → **소폭 긴장 방향**(순효과는 상충, 완화 속도 둔화로 판단).
- **DF1(AI 수요)**: 메모리 원가의 CapEx 견인 되먹임이 2개 분기 연속 명시 확인 — 이미 정점(8.5)이므로 신규 상방 레그는 아니나 **가장 강한 재확인 신호**. SK하이닉스 컨센서스 소폭 미스는 방향을 바꾸지 않음(HBM4 매출인식 시차 요인, 여전히 사상 최대).
- **DF2(미중)**: CXMT HBM 지연 유지·반독점 소송 답보·애플-CXMT 갱신 없음 → 무변화.

## 출처

- CNBC(2026-07-22 Alphabet·07-29 Microsoft·07-29 Meta·07-30 Amazon 실적 발표 커버리지)
- MLQ News(Alphabet·Oracle capex 요약), Seeking Alpha·TradingKey·digitalapplied.com(Meta), Fortune·TechTimes·Yahoo Finance(Amazon), Benzinga·Fool.com·businessmodelanalyst.com(Microsoft 회계처리 설명)
- Tom's Hardware(빅테크 합산 $725B +77% YoY 분석가 추정)
- SemiAnalysis 뉴스레터(2차 인용 — "US Grid Constraints"·"Memory Mania"·"China's CXMT Is Set to Challenge DRAM Incumbents" 등, 원문 403 차단)
- Counterpoint Research(2차 인용 — Memory Price Tracker 2026-07, 스마트폰 전망 하향), TechInsights(2차 인용, 원문 403 차단)
- Digitimes(2026-07-15)·Winbuzzer(2026-07-17) — 삼성 HBM4 볼륨 발주 미전환
- Investing.com·Yahoo Finance·SK하이닉스 뉴스룸(Q2 2026 실적, 2026-07-29)
- Micron IR(FQ3 2026), The Elec(HBM4 램프)
- TrendForce(2026-07-07 하이브리드본딩 재검토, 2026-07-08 반독점 소송 분석, 2026-07-31 Q3 DRAM/NAND 가격)
- Digitimes(2026-04-21 CXMT HBM3 지연), Gizmochina(2026-07-20 CXMT LPDDR6)
- Utility Dive·Network World·Data Center Knowledge(PJM 백스톱 경매·DC 우선감축)·Latitude Media·ZeroEmissionGrid(ERCOT 대기열)·IndustrialSage·TerrapinCG(변압기·개폐장치 리드타임)
- BigGo Finance·MacroMicro·Euronews·Taipei Times(TSMC Q2 2026 실적·CapEx·CoWoS)
