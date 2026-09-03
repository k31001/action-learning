# DT-C 공급발 다운턴 발현 근접도 — 신규 팹·수급·장비·재고 실측 리서치

**수집일**: 2026-08-28
**수집 방법**: 웹 검색 (WebSearch) 교차. 다수 항목은 검색 결과 요약 경유이며 원문 전문 열람은 하지 않음 — 아래 각 항목에 매체·날짜·URL 명시
**수집 목적**: DT-C 「동시 방류」(공급발 급락, [scenario-DT-C.md](../../wiki/downturn/scenario-DT-C.md)) 발현 근접도 평가 슬라이드의 실측 근거 — 위키 기존 보유분([memory-capex-outlook-2027-2028-2026-08-26.md](memory-capex-outlook-2027-2028-2026-08-26.md), [memory-capex-history.md](../../wiki/concepts/memory-capex-history.md))이 커버하지 못한 갭(신규 팹 착공·양산 일정, 2027 수급 전망, 장비 리드타임, 공급사 재고 주수) 보강
**신뢰도**: 항목별 상이 — 팹 일정·투자 승인은 High(각사 공식 발표·1차 보도), 수급 전망은 Medium-High(TrendForce 보도자료), 재고 주수는 **Medium-Low(2차 자료 — 서브스택·유통사 분석, 1차 공시 아님)**

---

## 1. 2027 수급 전망 — DRAM과 NAND의 분기 (TrendForce)

- **TrendForce (2026-07-30) 「Diverging Memory Market Outlook in 2027」**: 2027년 DRAM 공급은 타이트 지속 — HBM 생산·AI 서버 수요·서버당 메모리 탑재 증가가 공급 증가를 계속 앞선다. **DRAM sufficiency ratio는 2026년 -1~-2% 적자이며 2027년에는 적자 폭이 그보다 확대**될 전망. 2027년 계획된 신규 팹 캐파는 건설·램프업 일정상 **2028년에야 유의미한 산출 기여**. 글로벌 서버 출하는 2026년 +17% YoY, 2027년은 그보다 빠른 성장 전망.
  - URL: https://www.trendforce.com/presscenter/news/20260730-13158.html (교차: https://www.eetasia.com/trendforce-expects-dram-nand-flash-markets-to-diverge-in-2027/ , https://finance.yahoo.com/technology/articles/diverging-memory-market-outlook-2027-120000417.html )
- **TrendForce (2026-07-21) 「NAND Flash Supply Growth to Outpace Demand in 2027」**: 2026년 내내 공급 부족이었던 NAND는 **2027년 공급 증가율이 수요 증가율을 추월, 2H27부터 공급 타이트 완화**. 공정 전환에 의한 비트 산출 증가 + 소비자 가전 수요 부진이 균형 회복 요인. **중국 공급사의 글로벌 NAND 비트 산출 점유율은 ~19%까지 상승** 전망.
  - URL: https://www.trendforce.com/presscenter/news/20260721-13148.html (교차: https://iconnect007.com/article/150870/ , https://www.eetasia.com/trendforce-nand-flash-supply-growth-to-outpace-demand-in-2027/ )

## 2. 신규 팹 착공·양산 일정 — 2027H2~2028 창에 동시 도래

### SK하이닉스
- **용인 Y1**: 공사 진척 **87%**, 첫 클린룸 오픈을 **당초 2027-05에서 2027-02로 앞당김**. 전체 구성은 셸 2개동·클린룸 6개. 용인 1단계 전력·용수 인프라 99% 완료 (DIGITIMES 2026-08-13: https://www.digitimes.com/news/a20260813PD215/sk-hynix-launch-2027-fab-cleanroom.html ; 착공은 2025-02, 당초 2027 완공 목표 — DIGITIMES 2025-02-26: https://www.digitimes.com/news/a20250226PD220/sk-hynix-2027-plant-government-equipment.html )
- **Y2 + 청주 M17 총 54조 원 투자 승인 (2026-08-07 이사회)**: Y2 35.2조(착공 2027-07, 첫 클린룸 2029-06), M17(NAND) 19.1조(착공 2027-02, 첫 클린룸 2028-12). 집행 기간 ~2031-04. 용인 클러스터 마스터플랜 600조·청주 100조의 일부 (SK hynix Newsroom 2026-08-07: https://news.skhynix.com/en/fab-facility-investment-2026/ ; The Korea Herald: https://www.koreaherald.com/article/10834499 ; SBS: https://news.sbs.co.kr/amp/news.amp?news_id=N1008695361 )
- **DRAM 캐파 로드맵**: 2030년까지 DRAM 월 캐파를 **약 2배인 1,000K wpm**으로 확대 보도, 용인에서만 +360K wpm (TrendForce News 2026-06-05: https://www.trendforce.com/news/2026/06/05/news-sk-hynix-reportedly-to-double-dram-capacity-to-1m-monthly-wafers-by-2030-speeds-yongin-expansion/ ; TechTimes 2026-06-06: https://www.techtimes.com/articles/317859/20260606/ )
- **청주 M15X**: 첫 클린룸 2026-05 완공·파일럿 → **양산 2026-11경 → 2027 중반 풀가동 시 ~50K wpm** (1b DRAM·EUV, 인접 M15와 HBM 최적화) (Seoul Economic Daily 2025-12-25: https://en.sedaily.com/finance/2025/12/25/ ; 일부 매체는 2026 하반기 40K → 2027 ~80K wpm으로 상이 — Blocks & Files 2026-08-07: https://www.blocksandfiles.com/flash/2026/08/07/sk-hynix-building-new-dram-and-nand-fabs/5284568 . **캐파 수치는 매체 간 상이, 단일 확정치 없음**)

### 삼성전자
- **평택 P4**: 장비 투자 **최종 단계** — 2026-03 Ph2·Ph4 전공정 장비 발주, 두 페이즈 모두 **1c DRAM 기반 HBM 생산 용도** (DIGITIMES 2026-04-09: https://www.digitimes.com/news/a20260409PD216/samsung-equipment-dram-fab-2026.html )
- **평택 P5**: **2년 중단 후 재개, 당초 계획보다 약 6개월 조기 본공사 착수**, 2028년 가동 목표 (DIGITIMES 2026-05-08: https://www.digitimes.com/news/a20260508VL212/samsung-expansion-fab-dram-production.html ; Sammy Fans 2026-08-08: https://www.sammyfans.com/2026/08/08/ ; cleanroomtechnology.com)
- **1c DRAM**: 2026년 말까지 200K wpm 목표(총 DRAM 산출의 약 1/3), 총 DRAM 캐파 추정 650~700K wpm (TrendForce News 2025-11-19: https://www.trendforce.com/news/2025/11/19/ )

### Micron
- Boise Idaho **ID1 2027년 중반 첫 웨이퍼, ID2 2028년 말 첫 웨이퍼** — 기존 위키 보유 ([bloomberg-micron-ceo-virginia-2026-05-22.md](bloomberg-micron-ceo-virginia-2026-05-22.md)), 본 리서치에서 변경 보도 미확인

### Kioxia–SanDisk
- **기타카미 K2(Fab2)**: 2025-09-30 가동 개시, 유의미한 산출은 2026 상반기부터 단계 램프 (Kioxia 공식 2025-09-30: https://www.kioxia.com/en-jp/about/news/2025/20250930-1.html )
- **기타카미 제3팹(K3)**: 부지 조성 개시, **FY2029 가동 목표** (BiCS 3D NAND 증산) (BigGo Finance 등 보도 경유: https://finance.biggo.com/news/4b94d7fa-2bac-4748-b806-2d40a943705b )
- **Kioxia–SanDisk 일본 투자 $31B+ 계획** 보도 (TechNode Global 2026-08-28: https://technode.global/2026/08/28/kioxia-sandisk-plan-over-31b-japan-memory-investment/ )
- **요카이치 Fab7·기타카미 Fab2 가동률 약 50%** — 기존 셸 내 장비 반입 우선 (Kioxia Investor Day Q&A 2026-06-02: https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Investor-Day-2026-Eng-QA.pdf ; 기존 위키 [fab-toolset-commonality-conversion-2026-08.md](fab-toolset-commonality-conversion-2026-08.md)와 정합)

### CXMT (중국)
- 현재 12인치 DRAM 팹 3개(허페이 2·베이징 1) 합산 **약 300K wpm** → **2026년 말 ~350K wpm** → **2027년 목표 420K wpm** (상하이·베이징·허페이 프로젝트, Counterpoint 추정) (Tom's Hardware: https://www.tomshardware.com/pc-components/dram/cxmt-close-to-matching-microns-memory-capacity-in-2026-research-claims- ; kr-asia: https://kr-asia.com/chinas-cxmt-and-ymtc-to-massively-expand-memory-output-amid-global-crunch )
- **상하이 신규 팹**: 장비 반입 2026 하반기, 생산 개시 2027 (kr-asia 위 링크)
- **2030년 950K wpm·DRAM 점유율 30% 목표, 6번째 메가팹** 보도 — 단 선단 장비 접근이 병목 (Tom's Hardware: https://www.tomshardware.com/pc-components/dram/chinas-cxmt-targets-30-percent-dram-memory-market-share-by-2030-with-sixth-mega-fab- ). **베이징 2번째 12인치 팹 검토** + HP·Asus·Acer의 제한적 채택 개시 보도 (TrendForce News 2026-08-04: https://www.trendforce.com/news/2026/08/04/ )

## 3. 장비 리드타임·장비 투자

- **장비 리드타임**: 핵심 부품 부족으로 전공정·메모리 장비 리드타임 **12~24개월**로 연장, 신규 팹용 툴은 18~24개월 보도. "오늘 결정한 캐파는 2028년경에야 유효 공급이 된다" — 이번 신축 팹들의 양산 시점 다수가 **2027 하반기~2028**에 집중된다는 판단 (TrendForce News 2026-08-19: https://www.trendforce.com/news/2026/08/19/news-chip-equipment-crunch-reportedly-pushes-lead-times-to-24-months- ; 36kr 영문판: https://eu.36kr.com/en/p/3920446768852617 )
- **SEMI 300mm 팹 장비 지출 전망**: 2026 **$133B(+18%)** → 2027 **$151B(+14%)** — 2년 연속 두 자릿수 성장·사상 최대 경신 (SEMI 공식: https://www.semi.org/en/semi-press-release/semi-projects-double-digit-growth-in-global-300mm-fab-equipment-spending-for-2026-and-2027 )

## 4. 공급사 재고 주수 — 역대 최저 수준 [신뢰도 Medium-Low — 2차 자료]

- DRAM 공급사 재고: **2024년 말 13~17주 → 2025년 말 2~4주**로 급감. 2025 Q3 말 주요 공급사 재고 **~3.3주(2018 슈퍼사이클 최저 수준)**, SK하이닉스·Micron 각 ~2주 (Global Semi Research Substack: https://globalsemiresearch.substack.com/p/2026-memory-industry-insights ; Luminix: https://www.useluminix.com/reports/industry-analysis/dram-cycle-position-analysis-peak-timing-indicators )
- 2026년 현재 글로벌 DRAM 재고 **2~3주, NAND 3~4주** — 역대 최저 수준, 할당(allocation) 시장 (A2 Global: https://a2globalelectronics.com/global-sourcing/the-2026-memory-chip-shortage- ; VersaLogic: https://www.versalogic.com/blog/supply-chain-brief-memory-market-conditions-in-2026/ )
- **한계**: 위 재고 수치는 1차 공시가 아닌 유통·분석 2차 자료 종합 — 슬라이드 인용 시 "업계 추정" 병기 필요

## 5. 수집 한계

1. 대부분 검색 결과 요약 경유 — TrendForce·DIGITIMES 원문 전문은 미열람 (프록시·페이월)
2. M15X 캐파(50K vs 40K→80K wpm)처럼 매체 간 수치 상이 항목 존재 — 상이함을 본문에 병기
3. DRAM 3사의 2027·2028 CAPEX 공표 전망치는 여전히 부재 — [memory-capex-outlook-2027-2028-2026-08-26.md](memory-capex-outlook-2027-2028-2026-08-26.md)의 ᵉ 추정 유지
4. 2026년 현재 각사 팹 가동률의 1차 공시 수치는 미확인 (Kioxia Fab7·K2 ~50%만 Investor Day Q&A로 확인) — DRAM 3사는 풀가동 통설이나 공식 수치 "확인 불가"
