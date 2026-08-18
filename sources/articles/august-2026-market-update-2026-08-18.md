# 2026-08-18 정기 점검 시장 데이터 — 병목 모델·가격·출하 갱신

**수집일**: 2026-08-18
**수집 방법**: 웹 검색 교차 (SemiAnalysis·TrendForce·Counterpoint·Texas Tribune·KERA News·Evertiq·TechPowerUp 등, 직전 점검 2026-08-11/07-04 대비 2026-08-11~08-18 구간 신규 신호 우선)
**수집 목적**: Bottleneck Model 2030 제약지수 정기 갱신 + 가격·출하 데이터 갱신 (schedule 자동 실행)

---

## §1. 전력/그리드 — ERCOT 사실상 접속 동결·SemiAnalysis PJM 경매 결함 지적

- **ERCOT 신규 데이터센터 접속 일시 동결(감사 대상)**: 텍사스 주지사 Abbott 2026-08-03 지시로 PUCT·ERCOT이 "Batch Zero" 데이터센터 프로젝트 전수 감사 착수 전까지 진행 보류. 2026-08-14 그리드 당국이 PUCT에 보고한 감사 범위 = **약 250~300개 프로젝트, 미래 수요 약 200GW**(ERCOT 역대 최대 피크 수요의 2배 이상). 전체 큐는 **474GW**(90%가 데이터센터). PUCT 공개회의는 2026-08-20 예정(ERCOT은 "good cause exception" 요청) ([Texas Tribune 2026-08-14](https://www.texastribune.org/2026/08/14/texas-data-center-approval-pause-ercot-power-grid/), [KERA News 2026-08-17](https://www.keranews.org/texas-news/2026-08-17/texas-will-audit-up-to-300-projects-mostly-data-centers-after-gov-greg-abbotts-order), ERCOT notice M-A080326-01).
- **SemiAnalysis: PJM 용량경매 모델링 결함 — "$120억 낭비, 재발 위험"**: 2026-08-16 발행 "$12B of US ratepayers' money wasted on a modeling mistake and PJM wants to do it again". PJM의 Reserve Requirement Study가 2025/26·2026/27 경매에서 필요 용량을 과대 추정(실제 발전설비 신뢰도가 모델보다 높음)해 청산가를 왜곡시켰다고 지적, 예정된 Reliability Backstop Auction이 동일 오류를 반복하면 요금자 부담이 재차 확대될 위험 경고 ([SemiAnalysis 2026-08-16](https://newsletter.semianalysis.com/p/12b-of-us-ratepayers-money-wasted)).
- **지멘스에너지 그리드 백로그 사상 최고 €510억**(변압기 수요, 2026-08-09) — 직전 점검(변압기 리드타임 최대 5년)과 정합, 추가 완화 신호 없음 ([mgrid.org 2026-08-09](https://mgrid.org/2026/08/09/siemens-energys-grid-order-backlog-hits-a-record-51-billion-euros-on-transformer-demand/)).
- **일반 하이일드 신용스프레드(HY OAS)**: 271bp(2026-08-12), 역사적 저점권 유지 — AI 데이터센터 채권 스프레드도 2025-12 대비 광의 HY 대비 프리미엄이 거의 0으로 축소(2026-08-06 자료) — 자금조달 여건 자체는 긴장 신호 없음 ([Convex 2026-08-12](https://convextrade.com/metrics/bamlh0a0hym2), [Penn Mutual 2026-08-06](https://www.pennmutualam.com/market-insights-news/blogs/chart-of-the-week/2026-08-06-ai-infrastructure-bonds-a-full-picture-of-spreads)).

## §2. CAPEX/ROI — 신규 가이던스 없음(7월 실적 반영분이 최신)

- 이번 구간(08-11~08-18) 신규 하이퍼스케일러 가이던스 갱신 없음 — 현재 유통되는 수치(Amazon $220B·Meta $130~145B·Alphabet $195~205B·MS $190B)는 모두 7월 말 Q2 실적 발표분으로 이미 위키에 반영됨. 08-17 Motley Fool 기사도 동일 수치 재정리(신규 없음).
- Oracle 신규 분기 업데이트 없음(직전 FY26 capex $55.7B 실적/FY27 $70B net 가이던스가 최신).

## §3. 파운드리·HBM 가격 — TSMC/ASML 신규 뉴스 없음, HBM4 가격 데이터 신규

- TSMC N2/A16·ASML 관련 08-11~08-18 구간 신규 뉴스 없음(TSMC 7월 매출 NT$467.58B, YoY+44.7%는 08-10 발표로 구간 직전).
- **HBM4 원가/가격**(TrendForce 2026-08-13): NVIDIA GPU향 HBM4 원가 **$31~32/GB**로 HBM3E($17~18/GB) 대비 약 2배. 비NVIDIA/ASIC향 HBM4는 $35~36/GB까지 가능. 삼성 Q3 HBM4 매출 QoQ 3배 초과 전망, 하반기 HBM4 비중이 전체 HBM 매출의 60% 초과 전망 ([TrendForce 2026-08-13](https://www.trendforce.com/news/2026/08/13/news-samsung-sk-hynixs-hbm4-push-puts-hbm-general-memory-pricing-in-the-spotlight-for-2h-earnings/)).
- **삼성 HBM4 수율 약 80%로 상승**(2월 양산 개시 시점 <60%에서 개선, TrendForce 2026-08-10) — NVIDIA가 Rubin Ultra향으로 원래 12-Hi HBM4E 사양과 별개로 8-Hi 대안도 병행 평가 중이라는 정황 포함 ([TrendForce 2026-08-10](https://www.trendforce.com/news/2026/08/10/news-samsungs-hbm4-yield-reportedly-hits-80-as-race-to-supply-vera-rubin-heats-up-sk-hynix-labor-talks-add-a-twist/)).

## §4. 패키징 — CoWoS/CoPoS 신규 진척 뉴스 없음

- 08-11~08-18 구간 CoWoS WPM 갱신, CoPoS 진척, Amkor/SPIL 사이트 뉴스 없음 — 07-04 최신치(NVIDIA 배정 ~60%·TSMC 24~27만 장 OSAT 외주·CoPoS 2028H2~2029) 유지.
- **HBM4 세대 전체 마이크로범프 유지 재확인**(SemiEngineering, "HBM4 Sticks With Microbumps, Postponing Hybrid Bonding") — 하이브리드본딩은 HBM5(~2029년경)에서 주류화 전망, 07-04 위키 판정과 정합.

## §5. DRAM/NAND 가격·점유율·출하 — 스마트폰 대폭 하향, NAND 서버 수요 급증

- **DRAM Q3 2026 계약가 전망 불변**: TrendForce +13~18% QoQ(07-09 발표 유지), 08-12 DRAM Market Bulletin·스팟 업데이트는 스팟시장 세부(DDR4 스팟 +0.93%, "거래 부진")만 갱신 — 계약가 분기 전망 자체의 변경 없음.
- **DRAM 매출 점유율 Q2 2026**(Counterpoint, 2026-08-04): **삼성 39% · SK하이닉스 26% · Micron 25% · CXMT 7%** — SK·Micron 격차 1%p로 축소 ([Counterpoint](https://counterpointresearch.com/en/insights/ai-demand-reshapes-dram-rankings-in-q2-2026)).
- **스마트폰 출하 Q2 2026 -11% YoY, 13년 만 최저 Q2** — 메모리 품귀로 인한 BoM 원가 상승이 원인으로 지목. 삼성 24% 점유(Apple과 함께 YoY 성장한 유이한 벤더), Xiaomi·OPPO·vivo 두 자릿수 감소. **2026 연간 전망이 기존 -2.1%에서 -14%로 대폭 하향** ([Counterpoint](https://counterpointresearch.com/en/insights/global-smartphone-shipments-q2-2026)) — 파운드리 AI 배정 여지 확대(긍정) vs 소비자 메모리 수요 위축(부정) 교차 신호.
- **NAND(Top5 합산) 매출 Q2 2026 $688.7억(+77% QoQ)**: 삼성 $230.6억(+70.7%)·SK하이닉스 $142.7억(+89.5%)·**Micron $118.5억(+99.2%, Kioxia 제치고 3위 등극)**·Kioxia $107.2억(+79.9%)·SanDisk 5위. AI 서버향 엔터프라이즈 SSD 수요·가격 인상이 주 원인으로 지목, Q3도 엔터프라이즈 SSD 주도 성장이나 PC·스마트폰 NAND 수요는 약세 ([Evertiq·TechPowerUp 2026-08-18](https://evertiq.com/news/2026-08-18-top-five-nand-flash-brands-post-77-revenue-surge-in-q2)).
- **메모리주 "베어마켓" 조정**: 삼성·SK하이닉스·Micron 모두 2026-06-25 고점 대비 2026-08-03까지 약 -30~33% 하락 후 부분 반등 — 실적·수급 펀더멘털 변화라기보다 밸류에이션 조정·주주환원 압박(삼성 액트 운동본부 임시주총·32조 원 자사주 매입 요구, SK하이닉스는 3분기 주주환원 방안 공개 예고) 국면. 병목 모델 실물 지표(전력·CAPEX·파운드리·패키징)에는 직접 반영 대상 아님.

## 원본 링크

- SemiAnalysis — $12B of US ratepayers' money wasted on a modeling mistake: https://newsletter.semianalysis.com/p/12b-of-us-ratepayers-money-wasted
- Texas Tribune — Texas data center approval pause: https://www.texastribune.org/2026/08/14/texas-data-center-approval-pause-ercot-power-grid/
- KERA News — Texas will audit up to 300 projects: https://www.keranews.org/texas-news/2026-08-17/texas-will-audit-up-to-300-projects-mostly-data-centers-after-gov-greg-abbotts-order
- mgrid.org — Siemens Energy grid backlog record €51B: https://mgrid.org/2026/08/09/siemens-energys-grid-order-backlog-hits-a-record-51-billion-euros-on-transformer-demand/
- Convex — HY OAS: https://convextrade.com/metrics/bamlh0a0hym2
- Penn Mutual — AI infrastructure bonds spread: https://www.pennmutualam.com/market-insights-news/blogs/chart-of-the-week/2026-08-06-ai-infrastructure-bonds-a-full-picture-of-spreads
- TrendForce — Samsung/SK hynix HBM4 push, pricing: https://www.trendforce.com/news/2026/08/13/news-samsung-sk-hynixs-hbm4-push-puts-hbm-general-memory-pricing-in-the-spotlight-for-2h-earnings/
- TrendForce — Samsung HBM4 yield ~80%: https://www.trendforce.com/news/2026/08/10/news-samsungs-hbm4-yield-reportedly-hits-80-as-race-to-supply-vera-rubin-heats-up-sk-hynix-labor-talks-add-a-twist/
- SemiEngineering — HBM4 Sticks With Microbumps: https://semiengineering.com/hbm4-sticks-with-microbumps-postponing-hybrid-bonding/
- Counterpoint — AI Demand Reshapes DRAM Rankings in Q2 2026: https://counterpointresearch.com/en/insights/ai-demand-reshapes-dram-rankings-in-q2-2026
- Counterpoint — Global Smartphone Shipments Q2 2026: https://counterpointresearch.com/en/insights/global-smartphone-shipments-q2-2026
- Evertiq/TechPowerUp — Top five NAND Flash brands post 77% revenue surge in Q2: https://evertiq.com/news/2026-08-18-top-five-nand-flash-brands-post-77-revenue-surge-in-q2
