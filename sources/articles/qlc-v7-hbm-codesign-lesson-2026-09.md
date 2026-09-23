# HBM 공동 설계 교훈 팩트 원장 — SK하이닉스·NVIDIA 협업과 삼성의 초기 판단, 반증 포함

**수집일**: 2026-09-23
**유형**: 웹 검색 기반 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v7.0 — 1장 교훈 재편·4장 배치 힌트 신설 근거

---


**수집일**: 2026-09-23
**수집자**: Research Agent (R7) — 사실 수집 전용. 전략 판단·권고 없음.
**방법**: WebSearch (이번 세션 가용) + 레포 내 `sources/`·`wiki/` 1차 확인
**등급**: ✅ 1차(기업 공식 발표·표준 문서·git 커밋·IR) / 🟡 신뢰할 만한 2차(업계 매체·리서치펌) / ⚠️ 미검증·단일출처·추론

> ⚠️ 프레이밍 경고 (§5 필독): 아래 사실들은 "공동 설계 → 승리"라는 인과를 **부분적으로만** 지지한다. 같은 원장 안에 반증도 함께 실었다.

---

## §1. SK hynix ↔ NVIDIA 공동 설계 기록

### 1-A. HBM 기원 (AMD와의 공동 개발, NVIDIA는 그 다음)

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| A-01 | AMD와 SK hynix(당시 Hynix)가 HBM 스택 **공동 개발(joint development)** 공식 발표 | AMD가 아키텍처·시스템 요구를 정의, Hynix가 스택 제조 | **2013-12** | Semiconductor Digest, "AMD and Hynix announce joint development of HBM memory stacks" https://sst.semiconductor-digest.com/2013/12/amd-and-hynix-announce-joint-development-of-hbm-memory-stacks/ | 🟡 |
| A-02 | AMD–Hynix가 HBM을 JEDEC에 제안한 시점은 **2010년**, 표준 JESD235로 채택된 것은 **2013-10** | JESD235 (HBM1) | 제안 2010 / 표준 2013-10 | JEDEC JESD235; HandWiki/Grokipedia 요약 https://handwiki.org/wiki/High_Bandwidth_Memory | 🟡 (표준 일자는 ✅급, 경유 확인) |
| A-03 | SK hynix HBM1 양산 개시 — AMD Radeon R9 Fury X(Fiji)에 탑재 | HBM1, 1 Gbps/pin, 128 GB/s/stack | 양산 **2015 Q1~Q2**, Fury X 출시 2015-06 | wccftech / 업계 정리 https://wccftech.com/sk-hynix-begins-hbm-production-q1-2015-feature-amd-r9-390x380x-fiji-gpu/ | 🟡 |
| A-04 | **NVIDIA의 첫 HBM 세대(HBM2, Pascal P100, 2016)에서 공급사는 Samsung과 SK hynix 양사.** Samsung은 2016-01 HBM2(4GB, 256GB/s) 양산 발표 | Samsung 4GB HBM2 양산 2016-01 | **2016** | HEXUS "Nvidia will source its HBM2 from both Samsung and SK hynix" https://m.hexus.net/tech/news/graphics/86603-nvidia-will-source-hbm2-samsung-sk-hynix/ ; PC Perspective https://pcper.com/2016/01/samsung-mass-produces-hbm2-memory/ | 🟡 |
| A-05 | **SK hynix는 HBM2 세대에서 오히려 뒤처졌고, 2010년대 후반 Samsung에 밀렸다. 내부적으로 HBM 개발 중단 논의까지 있었다**(전직 임원 2인 증언) | — | 2010년대 후반 | Reuters 계열 회고/서적 리뷰 경유: Korea Herald 서평 https://www.koreaherald.com/article/10667715 ; Tom's Hardware "On the cutting edge" https://www.tomshardware.com/pc-components/dram/high-bandwidth-memory-future-of-ai-one-team-spirit-sk-hynix | ⚠️ (전직 임원 익명 증언·서적 기반) |
| A-06 | SK hynix는 중단 대신 **로드맵 재정비 + 이천 패키징 설비 등에 KRW 8,800억(~$640M) 투자**. 당시 HBM 개발 책임자 심대용은 "당시 3D 그래픽 칩 업체로만 인식되던 NVIDIA에서 수요가 올 것"을 예상했다고 언급 | KRW 8,800억 | 2010년대 후반~2020년대 초 | 상동 (Tom's Hardware / SK hynix Newsroom "Continuing to Make HBM History" https://news.skhynix.com/the-story-of-sk-hynixs-hbm-development/) | 🟡 |

### 1-B. HBM3 / H100 — 단독 공급 구간

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| A-10 | SK hynix HBM3 **개발 완료 발표** — JEDEC HBM3 표준(JESD238) 공표(2022-01-28)보다 **앞섬** | 6.4 Gbps/pin, 819 GB/s | **2021-10** | PRNewswire https://www.prnewswire.com/news-releases/sk-hynix-announces-development-of-hbm3-dram-301404077.html ; JEDEC https://www.jedec.org/news/pressreleases/jedec-publishes-hbm3-update-high-bandwidth-memory-hbm-standard | ✅ |
| A-11 | SK hynix, **업계 최초 HBM3를 NVIDIA에 공급** 공식 발표. NVIDIA가 샘플 성능 평가를 완료(qualification) 후 양산 | 양산 개시 | **2022-06** | SK hynix Newsroom / PRNewswire "SK hynix to Supply Industry's First HBM3 DRAM to NVIDIA" https://news.skhynix.com/sk-hynix-to-supply-industrys-first-hbm3-dram-to-nvidia/ | ✅ |
| A-12 | **2023년 내내 HBM3를 양산한 업체는 SK hynix가 유일** — H100향 사실상 단독 공급. TrendForce: "HBM3는 초기 SK hynix 독점 공급" | 단독 공급 ~2년 | **2022 Q4 ~ 2023** | TrendForce 2024-03-13 https://www.trendforce.com/presscenter/news/20240313-12075.html ; Businesswire https://www.businesswire.com/news/home/20240313864555/en/ | 🟡 |
| A-13 | SK hynix HBM3 선점의 **공개된 원인은 공동 설계가 아니라 패키징·수율**: MR-MUF(12다이 일괄 본딩) vs Samsung TC-NCF(층별). 12-hi 수율 SK 75~80% vs 삼성 60~65%, MR-MUF 열방출 우위·thermal dummy bump 최대 4배 | 수율 차 ~15%p | 2023~2026 분석 | EE Times https://www.eetimes.com/sk-hynixs-mr-muf-innovations-tackle-heat-generation-to-secure-hbm-leadership/ ; SemiAnalysis https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm ; 레포: `sources/articles/qlc-v6-standards-lessons-factcheck-2026-09.md` C2-16 | 🟡 |
| A-14 | Micron은 H100 HBM3에 **2차 공급사**로 약 6~9개월 뒤(2023 Q2경) 진입 | — | 2023 Q2 | siliconanalysts "HBM Qualification Race" https://siliconanalysts.com/analysis/hbm-qualification-race-2022-2026 | ⚠️ (애널리스트 집계) |

### 1-C. HBM4 — 커스텀 베이스 다이 + 표준 초과 사양

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| A-20 | **SK hynix ↔ TSMC MoU 체결** — HBM4 베이스 다이를 TSMC 로직 공정으로 전환 + CoWoS 통합 최적화. HBM3E까지는 SK하이닉스 자체 베이스 다이 | 12FFC+(N12) / N5 두 버전, 2026 양산 목표 | **2024-04-18** | PRNewswire https://www.prnewswire.com/news-releases/sk-hynix-partners-with-tsmc-to-strengthen-hbm-technological-leadership-302120755.html ; SK hynix Newsroom https://news.skhynix.com/sk-hynix-partners-with-tsmc-to-strengthen-hbm-technological-leadership/ | ✅ |
| A-21 | 보도: SK hynix HBM4 베이스 다이는 범용 TSMC 12nm, **커스텀은 3nm로 상향**(당초 N5) | 12FFC+ / 3nm | 2024-12 보도 | TrendForce https://www.trendforce.com/news/2024/12/04/news-sk-hynixs-hbm4-to-use-tsmcs-3nm-base-die/ ; KED Global https://www.kedglobal.com/korean-chipmakers/newsView/ked202412030008 | 🟡 |
| A-22 | JEDEC **JESD270-4 HBM4 표준 공표**. 표준 개발 참여사: AMD, Cadence, Google, Meta, Micron, **NVIDIA, Samsung, SK hynix**, Synopsys — **삼성도 표준 참여자였다** | 2048-bit I/O, **최대 8 Gbps/pin**, 2 TB/s/stack | **2025-04-16** | JEDEC 보도자료 https://www.jedec.org/news/pressreleases/jedec%C2%AE-and-industry-leaders-collaborate-release-jesd270-4-hbm4-standard-advancing | ✅ |
| A-23 | **NVIDIA가 JEDEC 8 Gbps를 초과하는 속도를 요구** — 10 Gbps/pin 이상, 보도에 따라 11 Gbps·초기 13 Gbps 목표. → 구속력 있는 "규격"은 JEDEC이 아니라 고객 사양이었다 | 8 → 10~13 Gbps | 2025~2026 | Tom's Hardware https://www.tomshardware.com/tech-industry/hbm4-mass-production-delayed-as-nvidia-pushes-memory-specs-higher ; I-Connect007 https://iconnect007.com/article/146969/ | 🟡 |
| A-24 | SK hynix, **세계 최초 HBM4 개발 완료·양산 준비 완료** 발표. 2,048 I/O, **10 Gbps 초과**(JEDEC 8 Gbps 상회), 전력효율 +40% | 10 Gbps+ | **2025-09-11~12** | SK hynix Newsroom https://news.skhynix.com/en/sk-hynix-completes-worlds-first-hbm4-development-and-readies-mass-production/ | ✅ |
| A-25 | **젠슨 황이 SK 최태원 회장에게 12단 HBM4 공급을 기존 일정(2026 초) 대비 6개월 앞당겨 달라고 요청**. 곽노정 사장 답변: "한번 해보겠다(We will give it a try)" | 6개월 단축 요청 | **2024-11-04경 보도** (SK AI Summit 최태원 발언) | Reuters 경유 Yahoo Finance https://finance.yahoo.com/news/nvidias-huang-asked-sk-hynix-020622944.html ; TrendForce https://www.trendforce.com/news/2024/11/04/news-nvidia-ceo-jensen-huang-reportedly-asked-sk-hynix-to-expedite-hbm4-supply-by-6-months/ | 🟡 (최태원 공개 발언 인용 — 사실상 1차) |
| A-26 | 젠슨 황 영상 인터뷰: "**SK hynix와의 협업으로 NVIDIA는 무어의 법칙을 넘어서는 진전을 이뤘고, 앞으로 더 많은 SK hynix HBM이 필요할 것**" | 인용 | 2024~2026 (복수 재인용) | TrendForce·KED Global 재인용; Seoul Economic Daily "Jensen Huang to SK hynix: Please Make More HBM" (2026-06-03) https://en.sedaily.com/finance/2026/06/03/jensen-huang-to-sk-hynix-please-make-more-hbm | ⚠️ (원 영상 미확인, 재인용) |
| A-27 | **NVIDIA ↔ SK hynix 다년 기술 파트너십 공식 발표** — Vera Rubin 슈퍼컴, Vera CPU, RTX Spark PC, Jetson Thor용 메모리 **공동 개발(codevelop)**. + CUDA-X·PhysicsNeMo로 반도체 설계·TCAD 가속. 보도자료 문구: "**years of deep co-engineering collaboration**" 위에 세워진 협약 | 다년 | **2026-06-07** | NVIDIA IR https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-and-SK-hynix-Announce-Multiyear-Technology-Partnership-to-Advance-Memory-for-AI-Factories/default.aspx ; SK hynix Newsroom https://news.skhynix.com/en/multi-year-tech-partnership-with-nvidia/ | ✅ |
| A-28 | 젠슨 황, CES 2026에서 **HBM4 초기 물량 독점 사용(initial exclusive)** 강조 + "NVIDIA가 HBM4의 첫 고객" | — | **2026-01-07** | DigiTimes https://www.digitimes.com/news/a20260107PD218/nvidia-ceo-jensen-huang-hbm4-ces.html ; TrendForce https://www.trendforce.com/news/2026/01/07/news-memory-crunch-wont-hit-nvidia-jensen-highlights-initial-exclusive-hbm4-high-h200-demand/ | 🟡 |

### 1-D. 결과 — 점유율·순위

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| A-30 | HBM 공급사 점유율 (TrendForce) | 2022: SK 50% / Samsung 40% / Micron 10%. 2023 전망: SK **53%** / Samsung 38% / Micron 9% | 2022~2023 | TrendForce 2023-04-18 https://www.trendforce.com/presscenter/news/20230418-11647.html | 🟡 |
| A-31 | HBM 점유율 (Counterpoint 등, 레포 미러) | 2024: SK 54% / Samsung 39% / Micron 7%. **Q2 2025: SK 62% / Micron 21% / Samsung 17%**(Micron이 삼성 추월). Q3 2025: SK 57% / Samsung 22% / Micron ~21% | 2024~2025 | 레포 `wiki/concepts/hbm-market.md` (Counterpoint·Astute Group 인용) | 🟡 |
| A-32 | **Q2 2026 HBM 매출 점유율: SK hynix 50% / Samsung 33% / Micron 18%.** 삼성은 직전 분기 21%에서 +12%p, SK는 58%에서 −8%p. 삼성 급등 동인은 **업계 최초 HBM4 양산(1c DRAM + 사내 파운드리)** | 50 / 33 / 18 | **2026-09-03 발표 (Q2 2026)** | Counterpoint 인용 — Korea Herald https://www.koreaherald.com/article/10862170 ; Seoul Economic Daily https://en.sedaily.com/finance/2026/09/03/samsung-doubles-hbm-market-share-to-33-percent-narrowing | 🟡 |
| A-33 | **SK hynix가 DRAM 매출 1위 최초 등극** — Q1 2025 DRAM 매출 $9.72B vs Samsung $9.1B. 1992년 삼성이 1위가 된 이후 **최초의 역전** | SK $9.72B / 삼성 $9.1B | **2025 Q1 (2025-06-03 발표)** | TrendForce https://www.trendforce.com/presscenter/news/20250603-12603.html ; Korea Herald https://www.koreaherald.com/article/10502835 | ✅ |
| A-34 | **SK hynix, 2025년 연간 영업이익에서 삼성전자 전사 추월(최초)** — SK 47.2조 원 vs 삼성 43.6조 원 | 47.2조 vs 43.6조 | **2026-01-28~29** | CNBC https://www.cnbc.com/2026/01/29/sk-hynix-beats-samsung-2025-profit-ai-memory-hbm.html ; TrendForce https://www.trendforce.com/news/2026/01/28/news-sk-hynix-smashes-records-in-2025-beats-samsung-with-krw-47-2t-operating-profit/ | 🟡 (실적은 ✅급) |
| A-35 | **그러나 DRAM 1위는 되돌아갔다**: Samsung이 **Q4 2025에 1위 탈환**, 이후 격차 확대. **Q2 2026 DRAM 점유 Samsung 39% / SK hynix 26% / Micron 24% / CXMT 10%** (SK는 전년 동기 39%에서 26%로 하락) | 39 / 26 / 24 / 10 | **Q2 2026 (2026-09-07 보도)** | Counterpoint https://counterpointresearch.com/en/insights/ai-demand-reshapes-dram-rankings-in-q2-2026 ; Korea Times https://www.koreatimes.co.kr/business/20260907/samsung-extends-lead-in-global-dram-market-with-39-share-report ; Counterpoint Q4 2025 https://counterpointresearch.com/en/insights/Q4-2025-Samsung-Reclaims-Top-Memory-Spot-With-$26-Bn-in-Revenue-Record-Operating-Profit-Margin-for-SK-hynix | 🟡 |

---

## §2. "시장 가능성을 크게 보지 않았다" 쪽의 기록

### 2-A. 초기 HBM = 니치·고비용이라는 산업 공통 인식

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| B-01 | HBM은 **HPC·플래그십 가속기 등 고대역폭이 필수인 니치 워크로드에만 사용**된다는 것이 2010년대 후반 업계 통설. 소비자 GPU는 GDDR 유지 | — | 2015~2020 | 업계 기술 비교 자료(Exxact, SabrePC, FiberMall 등) https://www.exxactcorp.com/blog/hpc/gddr6-vs-hbm-gpu-memory | ⚠️ (연도 특정 어려운 일반 통설. 날짜 박힌 벤더/애널리스트 인용은 이번 수집에서 확보 실패) |
| B-02 | **비용 근거**: HBM2E는 GB당 $25~35 추정으로 GDDR6 대비 **3~5배**. 3D 적층·TSV 공정 복잡도로 소비자 등급에는 비경제적 | 3~5배 | 저생산량 구간(2019~2021) 추정 | 업계 추정치 종합 (siliconanalysts 등) https://siliconanalysts.com/tools/hbm-analysis | ⚠️ (추정치, 원 출처 불명확) |
| B-03 | **SK hynix 본인도 같은 판단 구간을 지났다** — HBM2 세대 부진 후 개발 중단 내부 논의. 즉 "니치 판단"은 삼성 고유가 아니라 산업 공통이었다 | — | 2010년대 후반 | A-05 참조 | ⚠️ |

### 2-B. 삼성의 2019년 결정 — 보도된 것만

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| B-10 | **CNBC 심층 보도**: 삼성은 2019년 HBM 시장이 니치에 머물 것으로 판단해 **HBM 팀을 축소(downsize)**했고, 같은 시기 SK하이닉스는 HBM 베팅을 늘렸다 | — | **보도 2024-11-08**, 결정 시점 2019 | CNBC "How Samsung fell behind in the AI boom" https://www.cnbc.com/2024/11/08/how-samsung-fell-behind-in-the-ai-boom-behind-rival-sk-hynix.html | 🟡 |
| B-11 | 레포 정리(복수 매체 교차): "삼성은 **HBM 시장 성장률이 과대평가됐다고 판단**해 사내 HBM 전담 조직을 해체·축소하고 자원을 범용 DRAM으로 재배치. 이후 핵심 R&D 엔지니어 일부가 SK하이닉스로 이직" | — | 2019 | 레포 `sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md` §3-E (CNBC 2024-11-08·DigiTimes 2024-05-08·TrendForce 2024-05-29·MIT Tech Review 2026-07-28 인용) | 🟡 |
| B-12 | **같은 해(2019-03) 삼성은 GTC에서 업계 최초 HBM2E 'Flashbolt'를 발표**(3.2 Gbps/pin, 410 GB/s, 16GB). 즉 제품 로드맵은 끊기지 않았고, 끊긴 것은 **전담 조직·우선순위**였다 | HBM2E 발표 2019-03, 양산 2020 상반기 | 2019-03 / 2020-02-04 | Businesswire https://www.businesswire.com/news/home/20200204005561/en/ ; Tom's Hardware; 레포 `samsung-2019-downturn-2017-2019-actions-2026-08-16.md` L47 | 🟡 |
| B-13 | **2019년 삼성은 "인위적 감산 없음" + CapEx 유지 기조**였다(반도체 CapEx 22.6조 원, 2018년과 유사). 즉 2019년은 전사 긴축의 해가 아니었다 → HBM 축소는 **긴축이 아니라 우선순위 선택** | 반도체 CapEx 22.6조 원 | 2019 | 삼성 뉴스룸 FY2019 실적; Counterpoint 2020-02; 레포 `samsung-2019-downturn-2017-2019-actions-2026-08-16.md` L40~42 | 🟡 |
| B-14 | 같은 2019년 삼성은 **'반도체 비전 2030' 발표(2019-04-24) — 시스템반도체에 133조 원·1.5만 명** 투입 선언. 자원 배분의 축이 로직·파운드리로 이동한 시점과 겹침 | 133조 원 | **2019-04-24** | 삼성 뉴스룸 글로벌; Korea Herald 2019-04-24 | 🟡 |
| B-15 | **2020~2022년 HBM 전담 조직의 복원·대규모 인력 재투입 공개 기록 부재** — 제품 로드맵(HBM2E 2020, HBM-PIM 2021, HBM3 2022)은 이어졌으나 조직 차원 되돌림 기록 없음. **부재 자체가 기록** | — | 2020~2022 | 레포 `samsung-pre-downturn-preparation-2005-2022-2026-08-08.md` §3-E | 🟡 (부재의 증거) |
| B-16 | 조직 복원은 **2024-04 HBM 전담 신팀 구성**(수율 개선 목적), **2024-05-06 NVIDIA 수주 전담 AI 칩 TF**, 2024-05-21 DS부문장 교체(경계현→전영현) | — | 2024-04 ~ 2024-05 | TrendForce https://www.trendforce.com/news/2024/04/02/news-samsung-reportedly-establishes-new-hbm-team-looking-to-improve-ai-chip-yield/ ; KED Global https://www.kedglobal.com/korean-chipmakers/newsView/ked202405060002 | 🟡 |
| B-17 | **⚠️ 검증 한계**: "2019년 HBM팀 해체/축소"에 대한 **삼성의 공식 확인도, 공식 부인도 이번 수집에서 확보하지 못했다.** 국내외 보도는 모두 익명 소스·후행 회고에 기반하며, 원 1차 출처는 CNBC(2024-11-08) 한 갈래로 수렴하는 경향. "해체(disbanded)" vs "축소(downsize)"도 매체마다 다르게 표기 | — | — | 검색 결과 없음(부정적 결과) | ⚠️ **단일 출처 계열·기업 확인 없음** |

### 2-C. 삼성 HBM 회복 타임라인

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| B-20 | 삼성 8단·12단 HBM3E가 NVIDIA 발열·전력 기준 미달 보도 | 1차 실패 | **2024-04~05** | DigiTimes·Reuters 계열 보도; 레포 factcheck C2-18 | 🟡 |
| B-21 | 3차 검증도 실패, 9월 재시험 예정 보도 | 2차/3차 실패 | **2025-06-12** | TrendForce https://www.trendforce.com/news/2025/06/12/news-samsung-reportedly-stumbles-again-on-nvidias-12-hi-hbm3e-validation-retest-set-for-september/ | 🟡 |
| B-22 | **삼성 12단 HBM3E, NVIDIA 퀄 통과** — 개발 완료 후 약 **18개월** 지연. 초기에는 SK·Micron에 이은 **3번째 공급사**, 제한 물량 | 18개월 지연 | **2025-09-19경** (TrendForce 09-22 보도) | KED Global https://www.kedglobal.com/korean-chipmakers/newsView/ked202509190008 ; TrendForce https://www.trendforce.com/news/2025/09/22/news-samsung-12h-hbm3e-reportedly-clears-nvidia-tests-after-18-month-setback-hbm4-reaches-final-phase/ | 🟡 |
| B-23 | 삼성 HBM3E 볼륨 출하 개시, **2026년 HBM 공급 완판(sold out)** 보도 | — | **2025-10** (2025-10-30 보도) | KED Global https://www.kedglobal.com/earnings/newsView/ked202510300005 | 🟡 |
| B-24 | **삼성, 업계 최초 상용 HBM4 출하** 공식 발표 — 6세대 10nm급(1c) DRAM, "추가 재설계 없이 초기부터 안정 수율", **11.7 Gbps(표준 8 Gbps 대비 +46%)**, 이후 13 Gbps로 상향. 2026년 HBM 매출 전년 대비 3배 이상 전망 | 11.7 → 13 Gbps | **2026-02-12** | Samsung Newsroom https://news.samsung.com/global/samsung-ships-industry-first-commercial-hbm4-with-ultimate-performance-for-ai-computing ; Bloomberg https://www.bloomberg.com/news/articles/2026-02-12/samsung-says-it-starts-commercial-shipment-of-hbm4-to-customer ; Businesswire | ✅ |
| B-25 | 젠슨 황: **삼성·SK하이닉스·마이크론 3사 모두 Vera Rubin용 HBM4 인증 통과**, Q3 출하 확인 | 3사 | **2026-06-05** | Yahoo Finance/Bloomberg; TechTimes https://www.techtimes.com/articles/317855/20260605/nvidia-vera-rubin-hbm4-jensen-huang-confirms-all-three-suppliers-production-q3-ship.htm | 🟡 |
| B-26 | **인증 ≠ 발주**: 2026-07-17 기준 삼성의 NVIDIA향 HBM4 매출은 여전히 **유상 평가용 샘플(paid evaluation samples)** 수준, 볼륨 발주 미수령 보도 | — | **2026-07-17** | Winbuzzer; 레포 `sources/articles/samsung-hbm4-volume-order-pending-2026-07-17.md` | ⚠️ (단일 매체 원 보도 + 정황 교차) |
| B-27 | **2026 Q2 삼성 HBM 점유 33%**로 회복 (A-32) | 33% | 2026 Q2 | A-32 | 🟡 |

### 2-D. "조직 축소"가 아니라 "가능성을 크게 보지 않아 후순위" 프레이징에 대한 평가

| ID | 판정 | 근거 |
|---|---|---|
| B-30 | **지지** | B-10·B-11: 보도의 사유 서술 자체가 "시장 성장률 과대평가 판단"·"니치 판단"이다. 원인을 재무 긴축이 아니라 **수요 전망 오판**으로 명시한다. |
| B-31 | **지지** | B-13: 2019년 삼성은 감산도 CapEx 삭감도 하지 않았다. 따라서 HBM 후순위는 돈이 없어서가 아니라 **배분 우선순위**의 결과로 읽힌다. B-14(비전 2030, 133조 원 로직 투자)가 그 반대편 배분을 보여준다. |
| B-32 | **지지** | B-15: 2020~2022년 대비기(호황 준비 구간)에도 복원 기록이 없다. 일회성 다운턴 대응이 아니라 **지속된 우선순위 판단**이었음을 시사. |
| B-33 | **부분 반증 / 주의** | B-12: 같은 2019년에 업계 최초 HBM2E를 발표했다. "HBM을 접었다"는 서술은 과장. 제품 개발은 계속됐다. → "투자를 끊었다"가 아니라 "**전담 조직·우선순위가 후순위였다**"가 정확. 귀하의 프레이징이 사실에 더 가깝다. |
| B-34 | **주의 (검증 한계)** | B-17: 삼성의 공식 확인/부인 부재. 덱에서는 "복수 외신이 보도한 바에 따르면"으로 출처를 명시하고, **"해체"라는 단어는 피하는 것이 안전**. |
| B-35 | **부분 반증** | B-03·A-05: SK hynix도 같은 시기 HBM 중단을 내부 논의했다. "삼성만 못 봤다"는 서술은 성립하지 않는다. 차이는 **판단 시점이 아니라 그 다음의 지속 여부**. |

---

## §3. 반례와 기저율 — "공동 설계가 이겼다"를 약화시키는 증거

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| C-01 | **HMC(Hybrid Memory Cube) — 고객과 공동 설계했으나 패배한 대표 사례.** Micron 주도, Samsung·ARM·Altera(Intel)·Xilinx·HP·Microsoft 참여 컨소시엄(HMCC). HBM보다 **2년 먼저** 나왔으나 JEDEC 표준이 아닌 **단일 컨소시엄 규격**에 머물러 패배 | — | 2011 착수 → **2018-08 Micron 철수** | Wikipedia/HandWiki "Hybrid Memory Cube" https://en.wikipedia.org/wiki/Hybrid_Memory_Cube ; EE Times "HBM Flourishes, But HMC Lives" https://www.eetimes.com/hbm-flourishes-but-hmc-lives/ ; CFF https://www.cff-chips.com/news/why-did-hmc-lose-out-to-hbm | 🟡 |
| C-02 | → **함의**: 고객(Intel·Xilinx·MS)과의 공동 설계 자체는 HMC도 했다. 이긴 쪽을 가른 것은 **표준화 경로의 개방성**(JEDEC)이었다 | — | — | C-01 | 🟡 (해석은 사실 대조에 근거) |
| C-03 | **SK hynix HBM3 선점의 공개된 인과는 패키징·수율(MR-MUF)이지 공동 설계가 아니다** (A-13 재게) | 수율 75~80% vs 60~65% | 2023~ | A-13 | 🟡 |
| C-04 | **삼성의 2025~2026 회복도 공동 설계가 아니라 제조·집적 선택으로 설명된다**: 1c(6세대 10nm급) DRAM + **사내 파운드리 4nm 로직 베이스 다이 + 사내 3D 패키징 턴키**(스택 전체를 내부 보유한 유일 업체). "추가 재설계 없이 초기부터 안정 수율" | 1c DRAM, 4nm 베이스 다이 | 2024-07 보도~ / 2026-02-12 | KED Global https://www.kedglobal.com/korean-chipmakers/newsView/ked202407150016 ; Samsung Newsroom 2026-02-12 (B-24) | 🟡 |
| C-05 | **Micron은 NVIDIA와의 특별한 공동 설계 서사 없이 점유율을 얻었다** — 공개된 차별점은 전력효율·12단 빠른 퀄·미국 생산 캐파. HBM3E 마일스톤을 일정 내/선행 달성. **Q2 2025에 삼성을 추월(21% vs 17%)** | 21% vs 17% | 2025 Q2 | 레포 `wiki/concepts/hbm-market.md`; Astute Group https://www.astutegroup.com/news/general/sk-hynix-holds-62-of-hbm-micron-overtakes-samsung-2026-battle-pivots-to-hbm4/ | 🟡 |
| C-06 | **역방향 반례**: Micron은 HBM4 핀 속도 진척에서 뒤처졌고, SemiAnalysis는 Micron이 Rubin HBM4 자격 취득을 못해 "effectively out"이라고 봤다(UBS는 18% 진입 전망 — 두 분석 충돌) | SemiAnalysis vs UBS 충돌 | 2026-02 / 2026 Q1 | 레포 `wiki/concepts/hbm-market.md` [Update 2026-05-19]; `sources/articles/semianalysis-vera-rubin-2026-02-25.md` | ⚠️ (분석기관 충돌) |
| C-07 | **삼성도 HBM4 JEDEC 표준 제정 참여사였다**(A-22). 즉 "표준 테이블에 앉았는가"로는 승패가 갈리지 않았다 | 9개사 중 하나 | 2025-04-16 | A-22 | ✅ |
| C-08 | **구속력 있는 것은 표준이 아니라 고객 사양**(A-23). 삼성은 그 고객 사양(11.7~13 Gbps)을 **초과 달성**하고도 볼륨 발주는 늦게 받았다(B-26) → 사양 충족도 충분조건이 아님 | — | 2026 | A-23, B-24, B-26 | 🟡 |
| C-09 | **표준/규격 참여 ≠ 물량이라는 직접 반례(NAND 쪽)**: NVMe ZNS(TP4053)는 2020-06 비준 + 같은 달 커널 코드 + 2020~21 제품 출시까지 3요소를 모두 충족했으나 **6년이 지난 2026년까지 하이퍼스케일 물량으로 전환되지 못했다** | 6년 | 2020-06 → 2026 | 레포 `sources/articles/qlc-v6-standards-lessons-factcheck-2026-09.md` C3-20~C3-23 | ✅ (반례) |
| C-10 | **Solidigm 61TB QLC 선점은 규격 참여로 설명되지 않는다**: 공개 차별점은 4세대 QLC(192L)와 CSAL 오픈소스 FTL. 오히려 **Solidigm 제품 발표(2023-07)가 Meta의 공개 QLC 요구사항 문서(2025-03)보다 20개월 앞섰다** — 인과가 덱의 서사와 반대 | 20개월 | 2023-07 vs 2025-03 | 레포 factcheck C1-27, C1-30, C1-33 | ✅ (날짜 대조) |
| C-11 | **최종 반례 — 순위는 되돌아갔다**: SK hynix는 2025 Q1 DRAM 1위, 2025 연간 영업이익 1위를 달성했으나, **Q4 2025부터 삼성이 DRAM 1위 탈환, Q2 2026 39% vs 26%로 13%p 격차**. HBM에서도 삼성 33%로 회복 | 39 vs 26 (DRAM), 50 vs 33 (HBM) | 2026 Q2 | A-32, A-35 | 🟡 |

---

## §4. 같은 패턴이 지금 NAND/SSD에서 (날짜·기여 주체)

| ID | 사실 | 누가 무엇을 기여했나 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| D-01 | **NVMe TP4146 FDP 비준** — Meta와 Google이 각자 WAF 문제를 풀다 수렴해 **공동 주도한 구매자 발 표준**. FMS 2022 발표자: Christopher Sabol(Google), Ross Stenfort(Meta) | Meta·Google = 요구사항 정의 / Samsung = 표준 작업 참여 | **2022-11-30 비준** / 2022-12 공표 | NVM Express https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf ; 레포 factcheck C1-23, C1-24 | 🟡 |
| D-02 | **Meta CacheLib에 FDP 지원 PR #247 제출 — 제출자 Arun George, arun.george@samsung.com** (삼성 엔지니어가 고객 오픈소스에 직접 기고) | Samsung 엔지니어 → Meta 코드베이스 | **2023-07-20 오픈** | https://github.com/facebook/CacheLib/pull/247 | ✅ (git) |
| D-03 | **CacheLib FDP 본 지원 머지(PR #277)** — io_uring_cmd + NVMe char device로 FDP directive 전달, `fdpMode` 설정 | Samsung ↔ Meta | **2024-01-25** | https://github.com/facebook/CacheLib/commit/009e89ba2b49b1fbbc48d03c3f81046de28bd6ed | ✅ (git) |
| D-04 | **Linux 6.16 block write streams(FDP) 메인라인 머지** — 핵심 커밋 작성자 **Keith Busch(kbusch@meta.com, Meta)**, 시리즈 제출자 **Kanchan Joshi(joshi.k@samsung.com, Samsung)**. 고객사·벤더 엔지니어 공동 작업 | Meta + Samsung 공동 | 커밋 **2025-05-06**, Linus 머지 **2025-05-26** | https://github.com/torvalds/linux/commit/38e8397dde6338c76593ddb17ccf3118fc3f5203 ; Phoronix https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16 | ✅ (git) |
| D-05 | **f2fs가 DATA 온도(hot/warm/cold)를 FDP 스트림에 매핑** — 파일시스템 레벨 확산 | 커널 커뮤니티 | 작성 2026-04-17 / 머지 **2026-05-22** | https://github.com/torvalds/linux/commit/e6c8140bd06d7dd8ee1e3c690445d3cfcaf1d892 | ✅ (git) |
| D-06 | **Alibaba 엔지니어가 FDP placement handle 상한 확장 커밋**(kanie@linux.alibaba.com) — 중국 하이퍼스케일러 합류 | Alibaba | 머지 **2026-08-10** | https://github.com/torvalds/linux/commit/53cdaeab2e30e0cb849a74b94f93729ad98946b1 | ✅ (git) |
| D-07 | **FDP 리드타임 집계**: 규격 비준(2022-11) → 첫 OSS 코드(2023-07, +8개월) → 대표 OSS 머지(2024-01, +14개월) → 커널 메인라인(2025-05, +30개월) → 파일시스템 확산(2026-05, +42개월) | — | — | 레포 factcheck C3-11 | ✅ (날짜 산술) |
| D-08 | **Meta 엔지니어링 공개 포스트 "A case for QLC SSDs in the data center"** — Meta가 데이터센터 QLC 티어를 공개 요구사항으로 공표(10 MB/s/TB 대역 구간, U.2 15mm 폼팩터 중요성) | Meta = 구매자 사양 공표 | **2025-03-04** | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ | ✅ |
| D-09 | Meta가 **1PB급·80W SSD를 위한 새 E2 폼팩터** 제안 (OCP) | Meta | 2025 (OCP) | https://www.servethehome.com/a-meta-vision-for-gpu-scale-compute-with-1pb-e2-ssds/ | 🟡 |
| D-10 | **Meta가 구매하는 모든 SSD에 FDP가 이미 탑재되어 있으나 기본 비활성(not enabled by default)** — 지원 출하와 실제 활성화 사이 갭 존재 | Meta | 2026 | The SSD Guy https://thessdguy.com/flexible-data-placement-means-better-ssds/ ; 레포 `fdp-partner-landscape-2026-09.md` | 🟡 |
| D-11 | **Micron ↔ Anthropic 전략 계약(SCA)** — ①HBM·DRAM·**데이터센터 SSD를 Claude 학습·추론 워크로드에 맞춰 공동 설계·최적화** ②다년 공급 ③Micron 엔지니어링·제조 운영에 Claude 배치 ④Micron이 Anthropic Series H에 전략적 투자. 재무 조건 비공개 | Anthropic = 워크로드 정의 / Micron = 메모리·스토리지 설계 | **2026-06-22** | Micron IR https://investors.micron.com/news-releases/news-release-details/micron-and-anthropic-announce-strategic-agreement-scale-next ; 레포 `sources/articles/micron-anthropic-sca-2026-06-22.md` | ✅ |
| D-12 | Anthropic Series H($65B, 클로징 2026-05-28, post-money $965B)에 **Micron·Samsung·SK hynix 3사 모두 "strategic infrastructure partners"로 참여** — 메모리 3사가 프런티어 모델사 자본 테이블에 오른 첫 사례 | 메모리 3사 | 2026-05-28 | 레포 `micron-anthropic-sca-2026-06-22.md` §3 | 🟡 |
| D-13 | **NVIDIA ICMSP → CMX** — 젠슨 황이 CES 2026(2026-01)에서 추론 컨텍스트의 NVMe SSD 오프로드 플랫폼 ICMSP 발표, **GTC 2026(2026-03)에서 CMX로 개명**. BlueField-4 STX + E3.S NVMe + 액랭 JBOF | NVIDIA = 플랫폼 표준 정의 | **2026-01 / 2026-03** | NVIDIA Technical Blog https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/ ; NAND Research https://nand-research.com/nvidia-stx-cmx-infrastructure-for-agentic-ai-context-storage/ | 🟡 |
| D-14 | **CMX 파트너 구성**: 제조(JBOF) AIC·Supermicro·QCT (2026 하반기 출하), 시스템 OEM Dell·HPE·IBM·NetApp·Hitachi Vantara·Nutanix, 스토리지 SW **VAST·WEKA·DDN·MinIO·Cloudian·Everpure**. ⚠️ **공식 생태계 파트너는 스토리지 시스템 빌더이지 드라이브 벤더가 아니다** | NVIDIA + 시스템/SW 파트너 | 2026 | Blocks & Files https://www.blocksandfiles.com/ai-ml/2026/03/30/nvidia-and-its-partners-kv-cache-extenders/5209284 ; Solidigm https://www.solidigm.com/products/technology/what-is-cmx-context-memory-storage.html | 🟡 |
| D-15 | **삼성 PM1753이 NVIDIA CMX 첫 공식 공급**, PM1763 GTC 2026 시연, Vera Rubin향 AI SSD 양산. 보도: V-NAND 캐파의 **60%+를 NVIDIA CMX향에 배정** | Samsung ↔ NVIDIA | 2026 | 레포 `sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md`; Benzinga https://www.benzinga.com/markets/tech/26/07/60323075/ | ⚠️ (60% 배분은 단일 계열 재인용) |
| D-16 | **NVIDIA DGX Spark 4TB 모델 SSD = 삼성 PM9E1**(모델명 MZALC4T0HBL1-00B07, 분해 실측 확인). 펌웨어가 DGX Spark OS·CUDA에 최적화, SPDM v1.2 지원 | Samsung ↔ NVIDIA (펌웨어 수준 맞춤) | 2026 | Chargerlab 분해 https://www.chargerlab.com/teardown-of-nvidia-dgx-spark-4tb/ ; StorageReview | 🟡 |
| D-17 | **LMCache** — vLLM 생태계 사실상 표준 KV 캐시 레이어. 레포 개설 2024-05-28, vLLM 커넥터 머지 **2025-02-25**, **Weka GDS 스토리지 백엔드 머지 2025-05-28**, infinistore RDMA 백엔드 2025-02-27. vLLM·SGLang·NVIDIA Dynamo 3개 엔진 모두 지원 | Weka = 스토리지 백엔드 기여 | 2024-05 ~ 2026-09 | https://github.com/LMCache/LMCache ; https://github.com/vllm-project/vllm/pull/12953 ; 레포 factcheck D-06 | ✅ (git) |
| D-18 | **vLLM KV Connector API V1 머지**(PR #15960) — 외부 KV 저장소를 붙이는 de-facto 인터페이스. NAND 티어가 붙어야 할 지점 | vLLM 커뮤니티 | **2025-04-17** | https://github.com/vllm-project/vllm/pull/15960 | ✅ (git) |
| D-19 | **공백**: LMCache·llm-d의 SSD 백엔드는 일반 파일시스템/블록 쓰기 — **KV 캐시 블록의 수명 정보를 FDP 배치 힌트로 전달하는 FDP 인지 백엔드는 부재**. 커널 6.16 write streams가 그 전제를 이제 막 제공 | — | 2026-08 시점 | 레포 `sources/articles/fdp-open-source-ecosystem-2026-08.md` §4 | 🟡 (부재의 증거) |
| D-20 | **Google은 FDP 공동 주도자이면서 동시에 자체 설계 SSD(Titanium SSD)를 보유** — "custom-designed Local SSD", Titanium Offload Processor 연동, C4A와 GA(랜덤읽기 240만 IOPS). **표준 주도 + 캡티브 이중 트랙** | Google | 2024~2026 | Google Cloud Blog https://cloud.google.com/blog/products/compute/first-google-axion-processor-c4a-now-ga-with-titanium-ssd ; 레포 `google-captive-titanium-fdp-factcheck-2026-08.md` | 🟡 |
| D-21 | **인증 주기**: 드라이브 가용 시점부터 프로덕션 배치까지 OEM/하이퍼스케일러 qualification은 **표준 12~18개월** — 2026년에 엔지니어링 접점을 시작하면 빨라야 2027~2028 프로덕션 | — | 2026-07-30 | TechTimes https://www.techtimes.com/articles/322162/20260730/ ; 레포 `fdp-partner-landscape-2026-09.md` §2 | 🟡 |
| D-22 | **FDP 지원은 이미 범용 — 차별화 아님**: Micron(Aerospike 실워크로드 측정), Kioxia(OCP 2024 RocksDB 시연), Silicon Motion(MonTitan Gen5) 모두 지원. 머천트 컨트롤러 벤더까지 지원해 중소 메이커도 탑재 가능 | 전 벤더 | 2024~2026 | 레포 `google-captive-titanium-fdp-factcheck-2026-08.md` §3 | 🟡 |

---

## §5. "공동 설계 → 승리" 프레이밍이 지지되지 않는 지점 (덱 작성자 필독)

1. **인과의 방향이 불확실하다.** SK hynix가 NVIDIA와 깊게 일한 것은 사실이나(A-11, A-25, A-27), **HBM3 선점의 공개된 설명은 MR-MUF 패키징과 12단 적층 수율**이다(A-13, C-03). 공동 설계는 그 결과로 얻은 자리일 수도 있고 원인일 수도 있다 — 공개 자료는 이를 구분하지 못한다.
2. **삼성도 표준 테이블에 앉아 있었다.** JEDEC HBM4 표준 제정 참여 9개사에 삼성이 포함된다(A-22, C-07). "참여 vs 불참"으로는 승패가 설명되지 않는다.
3. **고객 사양을 초과 달성해도 물량이 오지 않았다.** 삼성 HBM4는 NVIDIA 요구(10 Gbps)를 11.7~13 Gbps로 초과했고 3사 퀄을 모두 통과했으나, 2026-07 시점 볼륨 발주는 유상 샘플 단계였다(A-23, B-24, B-25, B-26). **사양 충족은 필요조건이지 충분조건이 아니다.**
4. **공동 설계로도 진 사례가 있다 — HMC.** Micron이 Intel(Altera)·Xilinx·MS·HP와 함께 설계했고 HBM보다 2년 먼저 나왔으나 2018년 철수했다(C-01). 가른 변수는 **개방 표준(JEDEC) 여부**였다.
5. **공동 설계 없이 이긴 사례가 있다 — Micron.** 특별한 NVIDIA 공동 설계 서사 없이 전력효율·빠른 퀄 실행만으로 2025 Q2에 삼성을 추월했다(C-05).
6. **순위는 되돌아간다.** SK hynix의 2025 Q1 DRAM 1위·2025 연간 영업이익 1위는 실재하지만, **Q4 2025에 삼성이 DRAM 1위를 되찾았고 Q2 2026에는 39% vs 26%로 13%p 격차**, HBM도 삼성 33%로 회복했다(A-33~A-35, C-11). "공동 설계한 쪽이 이긴다"를 **영구적 결과**로 쓰면 2026년 데이터에 반박당한다.
7. **NAND 쪽 반례가 이미 원장에 있다.** ZNS는 표준·커널 코드·제품을 다 갖추고도 6년간 물량이 안 왔고(C-09), Solidigm 61TB는 구매자 공개 사양보다 20개월 먼저 나왔다(C-10).
8. **"삼성만 못 봤다"는 성립하지 않는다.** SK hynix도 2010년대 후반 HBM 중단을 내부 논의했다(A-05, B-03). 차이는 **최초 판단**이 아니라 **판단 이후 지속 여부**다.

### 안전한 재프레이밍 후보 (사실이 지지하는 범위)
- ✅ "수요를 먼저 본 쪽이 아니라, **본 것을 10년간 끊지 않은 쪽**이 이겼다" — A-05·A-06(SK의 중단 논의 후 지속) vs B-11·B-15(삼성의 후순위 지속)가 직접 지지.
- ✅ "구속력 있는 규격은 JEDEC이 아니라 **고객의 사양**이었다" — A-22 + A-23 대조가 지지.
- ⚠️ "공동 설계가 승리의 원인이다" — 지지 불충분. §5-1·4·5 참조.

---

## §6. 이번 수집에서 확보하지 못한 것 (후속 과제)

1. **2015~2020년 날짜가 박힌 "HBM은 니치다"류 벤더/애널리스트 인용** — 일반 기술 비교 자료만 확보(B-01, B-02). 당시 TrendForce/IC Insights 리포트 원문 필요.
2. **삼성의 2019년 HBM 조직 결정에 대한 공식 입장(확인이든 부인이든)** — 부재(B-17).
3. **젠슨 황 "SK hynix와 함께 무어의 법칙을 넘었다" 발언의 원 영상·일자** — 재인용만 확보(A-26).
4. **HBM3 퀄 타임라인의 1차 문서**(NVIDIA·SK hynix 공식 qualification 일자) — siliconanalysts 집계에 의존(A-14).
5. **NVIDIA CMX 드라이브 벤더 파트너 공식 명단** — 공식 생태계 파트너는 시스템/SW 빌더뿐, 드라이브 벤더 공식 리스트 부재(D-14).
