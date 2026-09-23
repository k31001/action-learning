# HBM3 디자인인 인과 원장 — 삼성 HBM2E 최초(2019-03)에서 SK하이닉스 H100 단독 공급(2022~2023)까지, 2019~2023 창(窓)만으로 재구성

**수집일**: 2026-09-23
**수집자**: Research Agent (R9) — 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 기반 팩트 원장
**용도**: QLC eSSD 전략 덱 — "2022년 왜 SK하이닉스였나" 1장 교훈의 근거. [qlc-v7-hbm-codesign-lesson-2026-09.md](qlc-v7-hbm-codesign-lesson-2026-09.md)의 HBM4 시대 서사를 2019~2023 사실로 교체하기 위한 원장.

**등급**: ✅ 1차(기업 공식 PR·표준 문서·IR·공시) / 🟡 신뢰할 만한 2차(업계 매체·리서치펌) / ⚠️ 미검증·단일출처·추론 / **파생** = 본 원장이 날짜·수치 대조로 직접 도출한 것

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 시간 창(窓) 제약.** 본 원장은 **2019-01 ~ 2023-12** 안에 일자가 박히는 사실만 인과 추론에 사용한다. 발주자 지시에 따라 **HBM4 시대 증거(JEDEC JESD270-4 2025-04-16, NVIDIA의 10~13 Gbps 요구, 2025~2026 점유율 역전)는 2022년 결과의 원인 설명에 쓰지 않는다.** 불가피하게 인용하는 사후(2024~2026) 자료는 전부 `[창 밖]` 표시를 달고, §3·§6·§7에서 "사후 해석"으로만 취급한다.

**0-2. 세 가지를 절대 섞지 않는다.** 본 원장은 **발표(announcement) / 샘플(sample) / 양산(mass production)** 을 열을 분리해 기록한다. 이 주제에서 가장 흔한 오류가 이 셋의 혼동이다. 예: 삼성 Flashbolt "2019-03"은 **발표**이고 **양산이 아니다**. SK하이닉스 "2021-10"은 **개발 완료 발표**이고 **양산이 아니다**.

**0-3. 도구 제약 (확보 실패의 원인 일부).** 이번 세션에서 **WebFetch가 네트워크 egress 프록시에 의해 광범위하게 차단**되었다(차단 확인 도메인: `news.skhynix.com`, `news.samsung.com`, `www.prnewswire.com`, `www.businesswire.com`, `www.eetimes.com`, `www.tomshardware.com`, `en.wikipedia.org`, `www.trendforce.com`, `newsletter.semianalysis.com`, `www.hankyung.com`, `siliconanalysts.com`, `medias.yolegroup.com`, `www.wing.vc`, `www.globalsmt.net`). 따라서 **원문 전문 대조를 못 하고 WebSearch 요약 경유로 확인한 항목이 다수**다. 해당 항목은 등급을 한 단계 낮추고 `[검색 요약 경유]`를 달았다. 원문 확인이 필요한 항목은 §7에 모았다.

**0-4. 하우스 룰.** 삼성 내부 조직·인력·재편에 관한 주장은 **수집하지 않는다.** 기존 원장의 CNBC(2024-11-08) 계열 "2019년 HBM팀 축소" 보도는 본 원장 범위 밖이며, 필요 시 [qlc-v7-hbm-codesign-lesson-2026-09.md](qlc-v7-hbm-codesign-lesson-2026-09.md) B-10·B-17(검증 한계 포함)을 참조하라. 본 원장은 **출하된 제품·공표된 규격·일자가 박힌 공개 발언**만 다룬다.

---

## §1. 제품 타임라인 대조 — 발표 / 샘플 / 양산 분리

### 1-A. HBM2E (2019~2020)

| ID | 벤더 | 발표(개발완료·공개) | 샘플 | 양산(MP) | 속도 | 스택 용량 | 적층 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|---|---|
| T-01 | **Samsung** "Flashbolt" | **2019-03** (NVIDIA GTC 2019, 새너제이) — 업계 최초 HBM2E **발표** | **공개 기록 확보하지 못했다** (§7-1) | **2020-02-03/04 "market launch" 발표, 양산은 "2020년 상반기 예정"** — 실제 개시일 공표 없음 | 3.2 Gbps/pin (테스트 최대 4.2 Gbps) | 16 GB | **8-hi** (16Gb 다이 8단) | SoylentNews 2019-03-21 요약 https://soylentnews.org/article.pl?sid=19%2F03%2F21%2F2122231 ; Businesswire 2020-02-04 https://www.businesswire.com/news/home/20200204005561/en/ ; Samsung Newsroom https://news.samsung.com/global/samsung-to-advance-high-performance-computing-systems-with-launch-of-industrys-first-3rd-generation-16gb-hbm2e | 🟡 `[검색 요약 경유]` |
| T-02 | **SK hynix** HBM2E | **2019-08-12 개발 완료 발표** (업계 최고 대역폭 주장) | 명시 없음 | **2020-07-02 양산 개시 공식 발표** | 3.6 Gbps/pin | 16 GB | **8-hi** (16Gb 다이 8단) | TechPowerUp 2019-08 https://www.techpowerup.com/258194/ ; PRNewswire 2020-07-02 https://www.prnewswire.com/news-releases/sk-hynix-starts-mass-production-of-high-speed-dram-hbm2e-301087356.html | ✅ (PR 일자) / 🟡 `[검색 요약 경유]` |

**T-03 ⚠️ 충돌 기록 (양산 시점).** 삼성 Flashbolt 양산 시점에 대해 **두 계열이 충돌**한다. ① 삼성 공식 PR·Tom's Hardware: "**2020년 상반기(1H20)**". ② HEXUS(2020-02): "**2020년 하반기(2H20)** 볼륨 생산 예상". 본 원장은 **어느 쪽도 채택하지 않고 충돌로 남긴다.** 삼성이 "Flashbolt 양산을 개시했다"는 **독립적인 개시 공표는 확보하지 못했다**(검색어: `"Flashbolt" mass production began 2020 confirmation`, `Samsung HBM2E 양산 개시 발표 2020`). 출처: Tom's Hardware https://www.tomshardware.com/news/samsung-flashbolt-hbm2e-mass-production-dram ; HEXUS https://hexus.net/tech/news/graphics/139463-samsung-flashbolt-3rd-gen-hbm2e-nears-volume-production/ | ⚠️

**T-04 파생 (⚠️ 파생).** T-01·T-02 대조 → **발표는 삼성이 약 5개월 앞섰으나(2019-03 vs 2019-08), 공표된 양산 개시는 SK하이닉스가 유일하게 일자로 확정된다(2020-07-02).** "업계 최초 발표"와 "먼저 양산 공표"는 서로 다른 벤더였다. **이것이 본 원장의 첫 번째 핵심 대조다.**

**T-05.** SK하이닉스 HBM2E는 **엔비디아의 주문을 받아 2020-07 양산을 시작**했고, 이는 SK하이닉스의 **"8년 만의 엔비디아 공급망 재진입"** 으로 보도됐다. **다만 같은 보도는 "당시 제1공급사는 여전히 삼성전자였다"고 명시한다.** | 2020-07 | 한국경제 황정수 2026-02-15/16 https://www.hankyung.com/article/202602156632i (Daum 미러 https://v.daum.net/v/20260216172925922) | 🟡 `[검색 요약 경유]` / `[창 밖 회고 보도]`

### 1-B. HBM3 (2021~2023)

| ID | 벤더 | 발표(개발완료) | 샘플/고객 평가 | 양산(MP) | 속도 | 스택 용량 | 적층 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|---|---|
| T-10 | **SK hynix** HBM3 | **2021-10 개발 완료 발표** — JEDEC HBM3 표준(JESD238) 공표(**2022-01-28**)보다 **약 3개월 앞섬** | NVIDIA가 **샘플 성능 평가(qualification)를 완료**했다고 SK하이닉스 PR이 명시 | **2022-06-09 양산 개시 + NVIDIA 공급 공식 발표** | 6.4 Gbps/pin, 819 GB/s | 16 GB | **8-hi** | PRNewswire 2021-10 https://www.prnewswire.com/news-releases/sk-hynix-announces-development-of-hbm3-dram-301404077.html ; JEDEC https://www.jedec.org/news/pressreleases/jedec-publishes-hbm3-update-high-bandwidth-memory-hbm-standard ; PRNewswire 2022-06 https://www.prnewswire.com/news-releases/sk-hynix-to-supply-industrys-first-hbm3-dram-to-nvidia-301563831.html ; 서울신문 2022-06-09 https://www.seoul.co.kr/news/economy/industry/2022/06/09/20220609500068 | ✅ |
| T-11 | **SK hynix** HBM3 12단 | **2023-04-19 업계 최초 12단 HBM3(24GB) 개발 발표** | **"복수 고객에 샘플 제공, 성능 평가 진행 중"** 명시 | "2023년 상반기 중 양산 준비 완료" 계획 | 6.4 Gbps, 819 GB/s | 24 GB | **12-hi** | PRNewswire 2023-04-19 https://www.prnewswire.com/news-releases/sk-hynix-develops-industrys-first-12-layer-hbm3-provides-samples-to-customers-301801630.html ; Blocks&Files 2023-04-21 https://blocksandfiles.com/2023/04/21/a-chatgpt-speedster-sk-hynixs-12-layer-hbm-chip/ | ✅ |
| T-12 | **Samsung** HBM3 "Icebolt" | **2021-10 Samsung Tech Day 2021에서 로드맵 공개 — "HBM3 시장 출시(market availability) 2022년 2분기 예상".** 단, **속도·적층 수는 그 자리에서 확정 공개하지 않았다** | **2022년 중 샘플 제공 공표 확보하지 못했다** (§7-4) | **2022년 중 개발완료·양산 공식 PR을 확보하지 못했다.** 제품 페이지 스펙은 6.4 Gbps / 819 GB/s / 12단 24GB로 존재하나 **양산 개시 일자 공표 없음** | (제품 페이지) 6.4 Gbps, 819 GB/s | 16~24 GB | 8-hi / 12-hi | Tom's Hardware, Samsung Tech Day 2021 https://www.tomshardware.com/news/samsung-tech-day-2021-ddr6-17000-gddr6-gddr7-and-hbm3-roadmap ; Samsung 제품 페이지 https://semiconductor.samsung.com/dram/hbm/hbm3-icebolt/ | 🟡 (로드맵) / ⚠️ (양산) |
| T-13 | **Samsung** HBM3 실제 공급 진입 | — | — | **2023년 말(4Q23) NVIDIA 공급망에 1Znm HBM3로 진입 — "초기에는 소량(minor)"** 이라고 TrendForce가 명시. **AMD MI300 시리즈 인증은 1Q24** | — | — | — | TrendForce 2024-03-13 https://www.trendforce.com/presscenter/news/20240313-12075.html (Businesswire 미러 https://www.businesswire.com/news/home/20240313864555/en/) | 🟡 `[검색 요약 경유]` |

**T-14 파생 (⚠️ 파생) — HBM3 창의 크기.** T-10·T-13 대조 → **SK하이닉스 양산 개시(2022-06-09) ~ 삼성 NVIDIA 공급망 진입(4Q23) 사이는 약 17~18개월.** H100 출하(2022 Q3~)부터 세면 삼성이 비어 있던 구간은 **약 5개 분기**다.

**T-15 파생 (⚠️ 파생) — 공개된 스펙 격차는 없었다.** T-10·T-12 대조 → **두 벤더의 HBM3 공표 스펙은 6.4 Gbps/pin · 819 GB/s로 동일**하다. 즉 **2021~2022년 시점에 "삼성이 제시한 규격이 NVIDIA가 필요로 한 규격에 미달했다"는 공개 근거는 존재하지 않는다.** 차이는 규격이 아니라 **그 규격을 언제 양산 물량으로 만들었는가**에 있었다. (§4 참조)

### 1-C. 참고 — 표준 일자

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| T-20 | JEDEC **JESD238 HBM3** 공표 | **2022-01-28** | JEDEC https://www.jedec.org/news/pressreleases/jedec-publishes-hbm3-update-high-bandwidth-memory-hbm-standard ; 레포 [qlc-v6-standards-lessons-factcheck-2026-09.md](qlc-v6-standards-lessons-factcheck-2026-09.md) C2-04 | ✅ |
| T-21 | **SK하이닉스 개발 완료(2021-10)가 표준 공표(2022-01-28)보다 앞섰다** — 표준 확정 전에 실물을 끝냈다는 뜻 | 파생 | T-10 + T-20 | ✅ **파생** |

---

## §2. 가속기별 탑재 실적 — 확인 / 추정 구분

| ID | 가속기 | 출시 | 메모리 | 공급사 | 확인 수준 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|
| S-01 | NVIDIA **P100** (Pascal) | 2016 | HBM2 | **Samsung + SK hynix 양사** | **보도 확인** (양사 조달 보도) | HEXUS "Nvidia will source its HBM2 from both Samsung and SK hynix" https://m.hexus.net/tech/news/graphics/86603-nvidia-will-source-hbm2-samsung-sk-hynix/ ; 레포 v7 A-04 | 🟡 |
| S-02 | NVIDIA **A100 40GB** | **2020-05-14** | HBM2 (5스택 활성) | **Samsung 40GB HBM2 공급**이라는 서술 확보 | ⚠️ **추정 수준** — 검색 요약 경유, 원 teardown 문서 미확인 | System Plus Consulting(Yole) A100 분해 리포트 샘플 https://medias.yolegroup.com/uploads/2021/02/SPR21579-IC-NVIDIA-A100-Ampere-GPU-Sample.pdf (**WebFetch 차단으로 원문 미확인**) | ⚠️ |
| S-03 | NVIDIA **A100 80GB** | **2020-11-16** (SC20) | HBM2E, 2,039 GB/s | **SK hynix가 "엔비디아 주문"으로 2020-07 HBM2E 양산 개시**(T-05) → A100 80GB 탑재로 연결되는 서술. **동시에 같은 보도가 "당시 제1공급사는 여전히 삼성"이라고 명시** | ⚠️ **부분 확인** — 벤더 확정 teardown **확보하지 못했다** | 한국경제 2026-02 (T-05) ; ITBizNews 2020-11-17 https://www.itbiznews.com/news/articleView.html?idxno=23954 | ⚠️ |
| S-04 | — | — | — | **⚠️ 파생 주의**: A100 80GB의 핀 속도는 **약 3.2 Gbps**(2,039 GB/s ÷ 5스택 ≈ 408 GB/s/스택)로, **삼성(3.2 Gbps)과 SK하이닉스(3.6 Gbps) HBM2E 모두가 충족 가능한 값**이다. **따라서 대역폭 수치로는 공급사를 식별할 수 없다.** 수치로 벤더를 역추정하려는 시도는 성립하지 않는다 | **파생** | T-01·T-02 + A100 데이터시트 https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/a100/pdf/nvidia-a100-datasheet-nvidia-us-2188504-web.pdf | ✅ **파생** |
| S-05 | NVIDIA **H100 SXM** (Hopper) | **2022 Q3 출하 개시** | **HBM3** 80GB (6스택 중 **5스택만 활성**, 1베이는 더미/마진) | **SK hynix 단독** | **공급사 확인**(SK하이닉스 PR이 NVIDIA를 명시). "단독"은 리서치펌·분석 근거 | PRNewswire 2022-06 (T-10) ; SemiAnalysis "AI Capacity Constraints – CoWoS and HBM Supply Chain"(2023) https://newsletter.semianalysis.com/p/ai-capacity-constraints-cowos-and — **"SK hynix started production of HBM3 in June 2022 and is currently the only supplier shipping HBM3 in volume, with over 95% market share, which is what most H100 SKUs are using"** | ✅ (공급) / 🟡 (단독·95%) |
| S-06 | H100 HBM3 **단독 구간의 길이** | **2022 Q3 ~ 2023 내내** | — | SK hynix | TrendForce: **"HBM3는 초기 SK hynix 독점 공급"**, NVIDIA H100 수요를 SK하이닉스가 주로 충족해 공급 부족 발생 | TrendForce 2024-03-13 (T-13) | 🟡 |
| S-07 | AMD **MI250X** (CDNA2) | 2021-11 | 128 GB HBM2E | **확보하지 못했다** | ❌ **부정 확인** — 공개된 벤더 확정 자료를 찾지 못했다 (검색어: `AMD Instinct MI250X HBM2E memory supplier Samsung SK hynix 2021`) | — | — |
| S-08 | AMD **MI300X** (CDNA3) | 2023-12 | 192 GB HBM3 | **SK hynix가 주력**이라는 서술. **Samsung HBM3의 AMD MI300 인증은 1Q24** = **2023년 안에는 삼성 HBM3의 MI300 탑재가 성립하지 않는다** | 🟡 보도·리서치펌 | TrendForce 2024-03-13 (T-13) ; TrendForce 2025-06-13 https://www.trendforce.com/news/2025/06/13/news-unpacking-amds-mi350-powered-by-tsmcs-n3p-with-samsung-micron-as-dual-hbm3e-suppliers/ `[창 밖]` | 🟡 |

**S-09 판정 (⚠️ 파생).** S-01~S-08 종합 → **2019~2023 창 안에서 "SK하이닉스 단독"이 성립하는 구간은 HBM3 세대(2022 Q3~2023)뿐이다.** HBM2/HBM2E 세대(2016~2021)는 **양사 공급 또는 삼성 우위**로 기록된다(S-01, T-05). **"삼성이 NVIDIA 공급망에서 밀려났다"가 아니라 "HBM3라는 한 세대에서 물량이 비었다"가 사실에 가깝다.**

---

## §3. 패키징 기술 — MR-MUF 대 TC-NCF (주장·근거·반증)

### 3-A. 무엇을 언제 채택했나

| ID | 사실 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| P-01 | **SK hynix가 MR-MUF(Mass Reflow Molded Underfill)를 HBM2E에서 업계 최초로 도입**. 이후 SK하이닉스 HBM 설계의 상징이 됨 | **2019** (HBM2E 세대) | SK hynix Newsroom "Rulebreakers' Revolutions: MR-MUF Unlocks HBM Heat Control" https://news.skhynix.com/rulebreaker-revolutions-mr-muf-unlocks-hbm-heat-control/ (**WebFetch 차단, 검색 요약 경유**) ; ServeTheHome 2026 https://www.servethehome.com/sk-hynix-hbm-packaging-at-hot-chips-2026/ `[창 밖]` | 🟡 |
| P-02 | **MR-MUF가 2022년 4월 시점에 이미 공개 용어로 정착**해 있었다 — 업계 용어사전 등재. 정의: 칩 간 범프를 **일괄 리플로우로 동시 접합**한 뒤 **액상 EMC를 칩 사이에 충전**. "적층 내구성과 방열을 높인다" | **2022-04-20** | Blocks & Files 용어사전 https://www.blocksandfiles.com/glossary/2022/04/20/mr-muf/1597607 | 🟡 **(창 안 일자 확보 — 중요)** |
| P-03 | MR-MUF 공정 상세 (벤더 주장): 전 층 범프를 **1회 리플로우로 동시 접합** → 진공·약 70톤 압력 하 **액상 EMC 충전** → 경화 | 2019~ | P-01 동일 | 🟡 |
| P-04 | **Samsung은 TC-NCF(Thermal Compression Non-Conductive Film)** — **층별로** NCF를 선(先)도포하고 열압착 접합 | HBM2E·HBM3 세대 전반 | Samsung Newsroom 2024-02-27 https://news.samsung.com/global/samsung-develops-industry-first-36gb-hbm3e-12h-dram `[창 밖]` ; Samsung 기술블로그 https://semiconductor.samsung.com/news-events/tech-blog/leading-memory-innovation-with-hbm3e/ `[창 밖]` | 🟡 |

### 3-B. 공개된 성능 주장 (양측)

| ID | 주장 | 주체 | 수치 | 출처 일자 | 등급 |
|---|---|---|---|---|---|
| P-10 | MR-MUF 적용으로 **HBM2E의 방열이 전 세대(HBM2) 대비 36% 개선** | SK hynix | **+36%** | SK hynix Newsroom (일자 미확정) | 🟡 ⚠️ **본 세션에서 원문 일자 확정 못함** |
| P-11 | MR-MUF의 **적층 처리량이 TC-NCF 대비 약 3배** | SK hynix | **약 3×** | SK hynix Newsroom / EE Times https://www.eetimes.com/sk-hynixs-mr-muf-innovations-tackle-heat-generation-to-secure-hbm-leadership/ `[창 밖]` | 🟡 |
| P-12 | TC-NCF는 **층별 접착 필름 도포 → 역사적으로 느리고 수율이 낮다**. 층수가 많아질수록 수율 저하 | 업계 분석 | 정성 | TrendForce 2024-03-14 https://www.trendforce.com/news/2024/03/14/news-salvaging-hbm-yield-samsung-follows-competitors-by-adopting-sk-hynixs-techniques/ `[창 밖]` ; nomadsemi "Deep Dive on HBM" https://www.nomadsemi.com/p/deep-dive-on-hbm `[창 밖]` | 🟡 |
| P-13 | **Advanced TC-NCF의 이점(삼성 주장)**: 수직 밀도 **+20%**, 열저항 **−11%**, 칩 간 **다양한 크기의 범프 사용 가능**, 적층 증가·칩 박막화 시 **warpage 최소화**, 공정 스텝 단순화·계면 in-situ 보호·플럭스 잔사 없음 | Samsung | +20% / −11% | Samsung Newsroom 2024-02-27 `[창 밖]` | 🟡 (벤더 주장) |

### 3-C. ⚠️ 수율 수치 — 출처 간 정면 충돌 (평탄화하지 않고 그대로 기록)

| ID | 출처 계열 | 주장 수치 | 대상 세대 | 일자 | 등급 |
|---|---|---|---|---|---|
| P-20 | TrendForce / SamMobile 계열 | **삼성 HBM3 수율 10~20% vs SK하이닉스 60~70%** | **HBM3** | **2024-03-13/14** `[창 밖]` | 🟡 |
| P-21 | EE Times / SemiAnalysis 계열 (레포 v7 A-13, v6 C2-16) | **SK 75~80% vs 삼성 60~65%** | **12단(HBM3E 이후)** | 2023~2026 `[창 밖]` | 🟡 |

**P-22 충돌 판정.** P-20과 P-21은 **대상 세대·시점이 다르고(HBM3 vs 12단 HBM3E), 절대값도 양립하지 않는다**(삼성이 10~20%였다가 60~65%로 올라간 것인지, 애초에 다른 측정인지 공개 자료로 구분 불가). **두 수치 모두 2024년 이후 3자 추정이며, 벤더가 확인한 수율은 어느 쪽도 없다.** → **덱에 수율 수치를 쓰지 말 것.** 쓰려면 "복수 리서치펌이 15~50%p의 수율 격차를 추정했으나 벤더 확인은 없다"로만 써야 한다.

### 3-D. "MR-MUF → NVIDIA 소켓"의 인과를 명시한 공개 자료가 있는가

| ID | 판정 | 근거 |
|---|---|---|
| P-30 | **존재한다. 단, 전부 2023년 이후 사후 해석이다.** | "SK Hynix has taken the lead by switching to MR-MUF, addressing the weaknesses of NCF and **becoming the first supplier of HBM3 chips to NVIDIA**" — 업계 분석 계열 서술(2024~). EE Times 제목 자체가 "…to Secure HBM Leadership". 국내 보도도 "**우수한 어드밴스드 패키징 기술과 데이터 전송 속도·에너지 효율**"을 선정 이유로 서술 (이데일리 "[이지혜의 뷰] 엔비디아가 SK하이닉스를 선택한 이유는?" https://edaily.co.kr/News/Read?mediaCodeNo=257&newsId=02423926638892200) | 🟡 |
| P-31 | **그러나 2021~2022년 당시에 작성된 1차 근거는 확보하지 못했다.** | SK하이닉스의 2022-06-09 HBM3 공급 PR은 **MR-MUF를 선정 이유로 언급하지 않는다**(본 세션 확인 범위 내). NVIDIA 측 언급도 없다. **즉 "MR-MUF 때문에 이겼다"는 2023년 이후 업계가 역산한 설명이다.** | ⚠️ **부재의 증거** |
| P-32 | **창 안에서 말할 수 있는 최대치**: MR-MUF는 **2022-04 시점에 이미 SK하이닉스 고유 공법으로 공개 정착**해 있었고(P-02), 그 두 달 뒤 HBM3 양산·NVIDIA 공급이 발표됐다(T-10). **선후 관계는 성립하나 인과는 공개 자료로 확정되지 않는다.** | ✅ **파생** |

### 3-E. 반증 — TC-NCF 단순 열세론을 약화시키는 것들

| ID | 반증 | 근거 | 등급 |
|---|---|---|---|
| P-40 | **TC-NCF에는 공표된 보상 이점이 있다** — warpage 억제, 다양한 범프 크기 수용, 공정 스텝 단순화, 플럭스 잔사·접착제 오버플로 없음(P-13). 즉 "느리고 나쁜 공법"이 아니라 **다른 트레이드오프**였다 | P-13 | 🟡 |
| P-41 | `[창 밖]` **삼성은 이후 MUF 계열 도입을 검토했다고 보도**됐다(2024-03). 이는 격차를 인정하는 정황이지만 **2022년 결과의 원인이 아니라 결과에 대한 대응**이다 | TrendForce 2024-03-14 (P-12) ; SamMobile https://www.sammobile.com/news/samsung-use-sk-hynixs-method-manufacture-hbm3-chips/ | 🟡 |
| P-42 | `[창 밖]` **삼성은 결국 MR-MUF로 갈아타지 않고 advanced TC-NCF를 유지한 채 HBM4 최초 상용 출하(2026-02-12)에 도달**했다. → **"TC-NCF는 구조적으로 진다"는 서사는 2026년 데이터에 반박된다.** 덱에서 공법 우열을 단정하면 반박당한다 | 레포 v7 B-24 (Samsung Newsroom 2026-02-12) | 🟡 |
| P-43 | **양사 모두 HBM3에서 공표 스펙은 동일(6.4 Gbps/819 GB/s)**했다(T-15). 공법 차이는 **스펙 달성 여부가 아니라 달성 시점·수율의 문제**로 나타났다 | T-15 | ✅ **파생** |

---

## §4. 2021~2022년 고객(NVIDIA) 요구사항 — 공개된 것과 공개되지 않은 것

### 4-A. 공개된 것 (창 안)

| ID | 공개 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| R-01 | **NVIDIA가 SK하이닉스 HBM3 샘플의 성능 평가(performance evaluation)를 완료한 뒤 공급이 시작됐다** — 즉 **퀄이 존재했다는 사실 자체**는 공개됐다 | **2022-06-09** | SK hynix PR (T-10) | ✅ |
| R-02 | SK하이닉스는 **"NVIDIA와 긴밀히 협업(close work)해 프리미엄 DRAM 시장에서 최고 수준의 경쟁력을 확보했다"**(노종원 사장 명의 코멘트) — **협업의 존재**는 공개됐다 | 2022-06 | SK hynix PR (T-10) | ✅ |
| R-03 | NVIDIA는 **HBM3를 2022 Q3 출시 예정인 H100에 결합**해 공급한다고 SK하이닉스 PR이 명시 | 2022-06-09 | 서울신문 2022-06-09 (T-10) | ✅ |
| R-04 | H100은 **6개 HBM 베이 중 5개만 활성**화해 출시됐다 — **열·수율 마진을 남긴 설계** | 2022 | SemiAnalysis 계열 (S-05) | 🟡 |

### 4-B. 공개되지 않은 것 — **부정 확인(negative finding)**

**R-10. NVIDIA의 2021~2022년 HBM3 퀄 기준 수치는 공개되지 않았다.** 열 한계(°C), 전력 예산(W/스택), 신호 무결성·신뢰성 기준, 합격선 — **어느 것도 공개 자료에서 확보하지 못했다.** 확인한 것은 "**퀄 과정이 존재하며 열·전력·SI·신뢰성을 수개월간 검증한다**"는 일반 서술뿐이다(출처: siliconanalysts "HBM Qualification Race" https://siliconanalysts.com/analysis/hbm-qualification-race-2022-2026 — **WebFetch 차단, 검색 요약 경유, 애널리스트 집계**, ⚠️).
검색어: `NVIDIA HBM3 qualification requirements 2022 thermal power criteria supplier selection public statement H100`, `NVIDIA H100 HBM3 spec requirement 2021 published criteria`.

**R-11. 2021~2022년에 "삼성이 제시한 사양과 NVIDIA가 요구한 사양 사이의 격차"를 명시한 공개 자료는 없다.** T-15대로 공표 스펙은 동일했다. → **"2022년에 스펙 갭이 있었다"는 덱 문장은 근거가 없다.**

**R-12. ⚠️ 시점 혼동 경고 (가장 흔한 오류).** "**삼성 HBM이 NVIDIA의 발열·전력 기준을 충족하지 못했다**"는 보도는 **2024-04~05, HBM3E 8단·12단**에 관한 것이다. **2022년 HBM3에 관한 것이 아니다.** 이 보도를 2022년 결과의 원인으로 인용하면 **2년 시차의 오류**다. 출처: Tom's Hardware https://www.tomshardware.com/tech-industry/samsung-hbm3e-chips-reportedly-fail-to-meet-nvidias-heat-and-power-requirements (2024) ; 레포 v6 C2-18. | ⚠️ **경고**

**R-13. 2021~2022년 NVIDIA–SK하이닉스 공동개발 계약의 존재·조건은 공개되지 않았다.** 공식 다년 기술 파트너십은 **2026-06-07**에야 발표됐고, 그 보도자료가 "years of deep co-engineering collaboration" 위에 세워졌다고 **소급 서술**할 뿐이다(레포 v7 A-27) `[창 밖]`. **2021~2022년 시점의 계약 문서·발표는 확보하지 못했다.**

**R-14. NVIDIA가 "캐파 약정이 선정 기준이었다"고 말한 공개 발언은 2019~2023 창 안에서 확보하지 못했다.** 검색어: `Jensen Huang 2023 HBM supply allocation criteria statement`, `NVIDIA memory supplier selection capacity commitment 2022`.

---

## §5. 캐파·공급 약속 요인

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| C-01 | **SK하이닉스 유형자산 취득 현금유출(CapEx)은 2019~2020년에 오히려 감소했다** — 2018년 16조 0,361억 원 → **2019년 13조 9,202억 원** → **2020년 10조 0,687억 원**. 2021년은 2020년 대비 증가 전망 | 16.0 → 13.9 → 10.1조 원 | 2018~2020 | SEC Form 6-K (SK텔레콤 제출, SK하이닉스 재무 포함) https://www.sec.gov/Archives/edgar/data/1015650/000119312521267172/d221165dex991.htm | ✅ (공시) `[검색 요약 경유]` |
| C-02 | **⚠️ 파생 — "SK하이닉스가 그 시기 돈을 더 썼다"는 서사는 성립하지 않는다.** HBM2E 개발·양산 구간(2019~2020)에 SK하이닉스의 전사 CapEx는 **2년 연속 감소**했다. 즉 HBM2E 선행은 **총량 투자 증액이 아니라 배분·실행의 결과**로 읽어야 한다 | — | 2019~2020 | C-01 | ✅ **파생** |
| C-03 | SK하이닉스는 M14(이천, 2014)·M15(청주, 2018)·M16(이천, 2021) 3개 팹에 **약 46조 원(USD 34B)** 투입. **M16은 2021년 중 양산 준비 완료** | 46조 원 | 2014~2021 | 검색 요약(SK하이닉스 공시·매체 종합) ; TrendForce 계열 | 🟡 |
| C-04 | **다운턴 중 청주 M15의 유휴 낸드 라인을 HBM 후공정(패키징) 라인으로 전환**한 결정이 이후 "신의 한 수"로 평가됨. **M15X 증설 결정은 2024년(총 20조 원 규모)** | — | 전환 시점 **확정하지 못했다** (2022~2023 추정) | 한국경제 황정수 계열 https://www.hankyung.com/article/202602156632i `[창 밖]` ; KIPOST https://www.kipost.net/news/articleView.html?idxno=311858 ; thebell 2025-07 https://www.thebell.co.kr/front/newsview.asp?key=202507211704137720103090 | ⚠️ (시점 미확정) |
| C-05 | **이천 패키징 등 KRW 8,800억(~USD 640M) 투자** — 레포 v7 A-06에 실려 있으나 **본 세션에서 일자 확정에 실패했다.** 검색어: `SK하이닉스 8800억원 이천 후공정 패키징 투자 HBM 결정 시점` → 해당 금액 미확인, 대신 **청주 P&T7 19조 원(2026)** 만 확인됨 | 8,800억 원 | **확정 실패** | 레포 v7 A-06 (Tom's Hardware / SK hynix Newsroom 경유) | ⚠️ **일자 미확정 — 덱 사용 보류 권고** |
| C-06 | **2023년 SK하이닉스 HBM3 매출은 전년 대비 5배 이상 증가**했고, 동시에 **수요를 맞출 생산 능력이 제약**됐다고 회사가 밝혔다 | **>5×** | **2023 (4Q23 실적)** | SK hynix Newsroom 2023 결산 https://news.skhynix.com/en/sk-hynix-reports-fourth-quarter-2023-financial-results/ ; Seeking Alpha Q4 2023 콜 https://seekingalpha.com/article/4664956- | 🟡 |
| C-07 | **NVIDIA–SK하이닉스 HBM3E 우선 공급(prioritized supply) 계약 체결** 보도 — 즉 **공급 우선권이 계약 형태로 나타난 첫 공개 기록은 2023년 말** | — | **2023-12-04** | TrendForce https://www.trendforce.com/news/2023/12/04/news-sk-hynix-signs-prioritized-supply-agreement-with-nvidia-for-hbm3e-2023-q4-revenue-expected-to-surpass-krw-10-trillion-again/ | 🟡 |
| C-08 | **HBM 공급사 점유율**: 2022년 SK 50% / 삼성 40% / Micron 10%. 2023년 전망 SK 53% / 삼성 38% / Micron 9% | 50/40/10 → 53/38/9 | 2022~2023 | TrendForce 2023-04-18 https://www.trendforce.com/presscenter/news/20230418-11647.html ; 레포 v7 A-30 | 🟡 |
| C-09 | **⚠️ 파생 — 점유율과 소켓은 다르다.** C-08대로 **2022년 삼성의 HBM 점유율은 40%**였다. 즉 삼성은 HBM 시장에서 밀려난 것이 아니라 **HBM3라는 신규 소켓에서 물량이 없었다.** 40%는 HBM2/HBM2E 등 기존 세대 물량이다 | — | 2022 | C-08 + S-09 | ✅ **파생** |

**C-10 판정 — 캐파가 결정 요인이었다는 공개 근거는 약하다.** ① NVIDIA·양사 어느 쪽도 "캐파 약정이 선정 기준"이라고 창 안에서 말하지 않았다(R-14). ② SK하이닉스의 전사 CapEx는 선행 구간에 오히려 감소했다(C-01·C-02). ③ 공급 우선권의 공개 계약 기록은 **결과가 난 뒤인 2023-12**에 처음 나타난다(C-07). → **캐파·약정은 2022년 선정의 원인보다 2023년 이후의 고착(lock-in) 기제로 읽는 편이 자료에 맞다.**

---

## §6. 대안 설명과 반증 — 단일 원인 서사를 복잡하게 만드는 것들

| ID | 대안 설명 | 지지 근거 | 강도 |
|---|---|---|---|
| X-01 | **① 그냥 먼저 끝냈다 (일정 선착순).** SK하이닉스는 JEDEC 표준(2022-01-28)보다 **3개월 먼저 개발을 완료**(2021-10)했고, **7개월 만에 양산**(2022-06)해 H100의 2022 Q3 출하 일정에 맞췄다. 삼성의 공개 로드맵은 "2022 Q2 시장 출시"였으나 **그 창에 양산 제품이 없었다** | T-10·T-12·T-20·T-21·R-03 | **강함 (✅ 1차 PR 일자 대조)** |
| X-02 | **② 인접성 — HBM2E로 이미 문을 열어 두었다.** SK하이닉스는 2020-07 엔비디아 주문으로 HBM2E 양산을 시작하며 **"8년 만에 공급망 재진입"** 했다. HBM3 퀄은 백지에서 시작한 것이 아니었다 | T-05·S-03 | 중간 (⚠️ 단일 계열 회고 보도) |
| X-03 | **③ 그 세대를 비운 것은 삼성만이 아니다 — Micron은 HBM3를 통째로 건너뛰었다.** Micron은 HBM2E에 참여한 뒤 **HBM3 세대를 생략하고 HBM3E로 직행**했다. 이유로 공개된 것은 "SK하이닉스가 장악한 시장에 차별화 없이 후발 진입하는 것의 실익 부족". → **HBM3 단독 공급은 "삼성의 실패"만이 아니라 3사 중 2사가 그 세대를 비운 구조의 결과이기도 하다** | The Next Platform 2024-12-20 https://www.nextplatform.com/store/2024/12/20/micron-is-fashionably-late-to-the-hbm-party-but-not-too-late/1637572 `[창 밖]` | **중간~강함 (구조 반례)** |
| X-04 | **④ A100 세대의 공급은 실제로 공유됐다.** HBM2(P100, 2016) 양사 조달, HBM2E 시기 **제1공급사는 삼성**. 단일 공급은 HBM3 세대에 국한된 현상 | S-01·T-05·S-09 | 중간 |
| X-05 | **⑤ 가격 요인.** 2022~2023년 HBM3의 가격 프리미엄, 벤더 간 가격 차가 선정에 영향을 줬다는 **공개 근거를 확보하지 못했다** (검색어: `HBM3 price premium 2023 DRAM ASP multiple`). 확보된 가격 데이터는 전부 2025~2026년 것(HBM3 ~$200/스택, HBM3E ~$300/스택, 2026-09 기준)이라 **창 밖** | siliconanalysts https://siliconanalysts.com/data/hbm-pricing `[창 밖]` ⚠️ | **근거 없음 — 덱 사용 금지** |
| X-06 | **⑥ 삼성이 다른 방향의 HBM 제품에 자원을 썼다.** 창 안의 공개 기록: **HBM-PIM(Aquabolt-XL) 2021-02 발표 → Hot Chips 33(2021-08-22) 발표**, **H-Cube 2.5D 패키징 2021-11-11 공개**(삼성전기·Amkor 공동개발, HBM 6개 집적). → **삼성이 HBM에서 손을 뗀 것이 아니라 다른 축(PIM·2.5D 집적)에 공개 자원을 배치했다**는 것은 사실로 기록 가능. 다만 **이것이 HBM3 양산 지연의 원인이라는 인과는 공개 자료로 확인되지 않는다** | Samsung Newsroom 2021-02 https://news.samsung.com/global/samsung-brings-in-memory-processing-power-to-wider-range-of-applications ; Hot Chips 33 슬라이드 https://www.hc33.hotchips.org/assets/program/conference/day1/20210813_HC33_Aquabolt-XL_PIM_Jin_Kim_slide.pdf ; Businesswire 2021-11-11 https://www.businesswire.com/news/home/20211111005553/en/ | **사실은 강함(✅), 인과는 없음(⚠️)** |
| X-07 | **⑦ 공법(MR-MUF)이 원인이라는 설명은 전부 사후 역산이다** | P-30·P-31·P-32 | 중간 (사후 해석) |
| X-08 | **⑧ "공동 설계가 이겼다"는 창 안에서 지지되지 않는다.** 2021~2022년의 NVIDIA–SK하이닉스 공동개발 계약·조건은 공개된 바 없고(R-13), 공식 다년 파트너십은 2026-06에야 체결됐다 | R-02·R-13 | **반증** |
| X-09 | **⑨ 표준 참여 여부로 갈리지 않았다.** HBM3는 JEDEC 표준(JESD238)이고 삼성도 JEDEC 회원사다. **표준 테이블 참여는 양사 공통**이었고, 승부는 표준 밖의 **양산 일정**에서 났다 | T-20·T-15 | **반증** |
| X-10 | **⑩ 12단은 2022년 승부의 변수가 아니었다.** H100이 쓴 것은 **8단 16GB HBM3**이고(T-10·S-05), 12단 24GB HBM3는 **2023-04에야 샘플**이 나왔다(T-11). **"12단 적층 수율이 2022년 소켓을 갈랐다"는 서술은 시점상 성립하지 않는다** | T-10·T-11·S-05 | **반증 (✅ 파생)** |

---

## §7. 공개 자료의 공백 — 덱에 쓰면 안 되는 것 (부정 확인)

각 항목은 **검색했으나 확보하지 못한 것**이며, 검색어를 함께 남긴다.

1. **삼성 Flashbolt의 샘플 제공 기록 및 실제 양산 개시 일자.** 발표(2019-03)와 시장 출시 선언(2020-02-04)은 있으나 **"양산을 개시했다"는 독립 공표를 확보하지 못했다.** 게다가 상반기/하반기로 **출처가 충돌**한다(T-03). 검색어: `"Flashbolt" HBM2E Samsung began mass production 2020 confirmation shipping customers`, `Samsung HBM2E 양산 개시 발표 2020`.
2. **NVIDIA의 2021~2022년 HBM3 퀄 기준 수치**(열·전력·SI·신뢰성 합격선). **전면 미공개.** 검색어: R-10 참조. → **"삼성이 NVIDIA 기준에 미달했다(2022)"는 문장은 근거가 없다.** (R-12의 2024년 보도와 혼동 금지)
3. **A100 40GB·80GB의 HBM 공급사 확정 teardown.** System Plus/Yole 리포트가 존재하나 **원문 접근이 프록시에 차단**돼 확인하지 못했다. 대역폭 수치로는 벤더 식별 불가(S-04). 검색어: `NVIDIA A100 teardown HBM vendor part number Samsung SK hynix`.
4. **삼성 HBM3의 개발완료·샘플·양산 공식 발표.** SK하이닉스에 대응하는 삼성의 HBM3 마일스톤 PR을 **2022년 안에서 확보하지 못했다.** 확보된 것은 ① 2021-10 Tech Day 로드맵("2022 Q2 출시 예상"), ② 제품 페이지 스펙, ③ 2023년 말 공급망 진입 보도뿐이다. **부재 자체가 기록이다.** 검색어: `Samsung HBM3 2022 mass production announcement Icebolt`, `삼성전자 HBM3 개발 완료 2022년 발표 양산`.
5. **AMD MI200/MI250X의 HBM2E 공급사.** 공개 확정 자료 없음(S-07).
6. **2021~2022년 시점에 MR-MUF를 NVIDIA 소켓 획득의 원인으로 지목한 1차 자료.** 모든 인과 서술이 2023년 이후다(P-31).
7. **SK하이닉스 이천 패키징 KRW 8,800억 투자의 일자.** 레포 v7 A-06에 금액은 있으나 본 세션에서 **일자 확정에 실패**(C-05). → **덱에 연도를 붙여 쓰지 말 것.**
8. **청주 M15 낸드 라인 → HBM 후공정 전환의 정확한 일자**(C-04).
9. **2022~2023년 HBM3 가격 프리미엄 데이터**(X-05). → **"가격 때문"이라는 설명은 쓸 수 없다.**
10. **NVIDIA·양사의 "캐파 약정이 선정 기준"이라는 창 안 발언**(R-14).
11. **수율 수치.** 창 안(2019~2023)에 벤더가 확인한 HBM3 수율 수치는 **존재하지 않는다.** 2024년 이후 3자 추정끼리도 충돌한다(P-20~P-22). → **덱에 수율 숫자 금지.**

---

## §8. 인과 사슬 판정 — 공개 자료가 지지하는 순서

### 1순위 — **양산 일정(time-to-volume)이 소켓을 갈랐다.** 지지 강도: **강함 (✅ 1차 PR 일자 대조만으로 성립)**

```
2021-10  SK하이닉스 HBM3 개발 완료 발표 (JEDEC 표준보다 3개월 앞섬)
2022-01  JEDEC JESD238 HBM3 공표
2022-06  SK하이닉스 HBM3 양산 + NVIDIA 공급 발표 (개발완료 후 7~8개월)
2022 Q3  H100 출하 — HBM3 8단 16GB, SK하이닉스 단독
   ↕ (삼성: 2021-10 "2022 Q2 출시" 로드맵 발표 → 그 창에 양산 제품 없음)
2023 말   삼성, 1Znm HBM3로 NVIDIA 공급망 소량 진입
```
**근거**: T-10·T-12·T-13·T-20·T-21·R-03·X-01. **이 사슬은 벤더 공식 PR 일자와 JEDEC 일자만으로 성립하며, 해석이 개입하지 않는다.** 본 원장에서 유일하게 ✅ 등급으로 말할 수 있는 인과다.

### 2순위 — **그 일정 차이를 만든 것으로 지목되는 것은 패키징·수율이다.** 지지 강도: **중간 (🟡, 전부 사후 해석 + 수치 충돌)**

MR-MUF는 2022-04 시점에 이미 SK하이닉스 고유 공법으로 공개 정착해 있었고(P-02), 업계는 2023년 이후 이를 선점의 원인으로 서술한다(P-30). **그러나** ① 2021~2022년 당시의 1차 근거가 없고(P-31), ② 수율 수치는 출처끼리 충돌하며 벤더 확인이 없고(P-20~P-22), ③ TC-NCF에는 공표된 보상 이점이 있으며(P-40), ④ 삼성은 TC-NCF를 유지한 채 2026년 HBM4 최초 상용 출하에 도달했다(P-42). → **"공법이 원인"은 그럴듯하나 공개 자료로 확정되지 않는다.**

### 3순위 — **인접성·연속성(HBM2E 공급망 재진입 → HBM3)과 공급 고착.** 지지 강도: **약함 (⚠️, 정황·단일 계열)**

SK하이닉스는 2020-07 HBM2E로 엔비디아 공급망에 재진입했고(T-05), 그 관계 위에서 HBM3 퀄을 통과했다(R-01·R-02). 고착의 공개 기록(우선 공급 계약)은 **결과가 난 뒤인 2023-12**에 처음 나타난다(C-07). → **원인이라기보다 결과를 굳힌 기제.**

### 명시적 **비지지** — 공개 자료가 지지하지 않는 설명

| 설명 | 판정 | 근거 |
|---|---|---|
| "공동 설계(co-design)가 승부를 갈랐다" | **비지지** | 2021~2022년 계약·조건 미공개, 공식 파트너십은 2026-06 (R-13·X-08) |
| "표준(JEDEC) 참여 차이" | **비지지** | HBM3는 JEDEC 표준, 양사 공통 참여 (X-09) |
| "2022년에 삼성 제품이 NVIDIA 스펙에 미달했다" | **비지지** | 공표 스펙 동일(6.4 Gbps/819 GB/s, T-15). 발열·전력 미달 보도는 **2024년 HBM3E** 건 (R-12) |
| "12단 적층 수율이 2022년 소켓을 갈랐다" | **비지지** | H100은 8단 사용, 12단 HBM3 샘플은 2023-04 (X-10) |
| "SK하이닉스가 그 시기 투자를 더 많이 했다" | **비지지** | SK하이닉스 CapEx는 2019~2020년 2년 연속 감소 (C-01·C-02) |
| "가격이 요인이었다" | **근거 없음** | 창 안 가격 데이터 확보 실패 (X-05) |
| "삼성이 HBM에서 밀려났다" | **과장** | 2022년 삼성 HBM 점유율 40%. 비어 있던 것은 **HBM3 소켓 한 세대** (C-08·C-09·S-09) |

---

## §9. 덱 1장 교훈으로 쓸 수 있는 문장 (그대로 복사 가능 / 2019~2023 사실만)

> **권장 — ✅ 등급, 1차 PR 일자만으로 성립**
>
> **"삼성은 2019년 3월 업계 최초로 HBM2E를 발표했다. 그러나 2022년 H100의 HBM3 공급사는 SK하이닉스였다. 갈린 지점은 규격이 아니라 양산 시점이었다."**
> — 근거: 삼성 Flashbolt 발표 2019-03(GTC) / SK하이닉스 HBM3 양산·NVIDIA 공급 발표 2022-06-09. 출처: [Businesswire 2020-02-04](https://www.businesswire.com/news/home/20200204005561/en/), [PRNewswire 2022-06](https://www.prnewswire.com/news-releases/sk-hynix-to-supply-industrys-first-hbm3-dram-to-nvidia-301563831.html). 등급 ✅

> **권장 — ✅ 등급, 날짜 대조**
>
> **"SK하이닉스는 JEDEC HBM3 표준(2022년 1월)보다 3개월 앞선 2021년 10월에 개발을 끝냈고, 8개월 뒤 양산했다. 구속력 있는 일정은 표준이 아니라 고객의 제품 출시 일정(H100, 2022년 3분기)이었다."**
> — 근거: SK하이닉스 개발완료 2021-10 / JEDEC JESD238 2022-01-28 / 양산 2022-06 / H100 2022 Q3. 등급 ✅

> **권장 — ✅ 파생, 반(反)직관 대비용**
>
> **"양사의 HBM3 공표 스펙은 6.4 Gbps·819 GB/s로 같았다. 스펙이 아니라 그 스펙을 언제 물량으로 만들었는가가 소켓을 갈랐다."**
> — 근거: SK하이닉스 PR(2021-10) / 삼성 HBM3 Icebolt 제품 페이지. 등급 ✅ 파생

> **권장 — ✅ 파생, 과장 방지용 (덱에 반드시 같이 넣을 것)**
>
> **"2022년 삼성의 HBM 점유율은 40%였다. 비어 있었던 것은 HBM 사업이 아니라 HBM3라는 한 세대의 신규 소켓이었고, 그 공백은 약 5개 분기 동안 이어졌다."**
> — 근거: TrendForce 2023-04-18(2022년 SK 50/삼성 40/Micron 10) / 삼성 4Q23 NVIDIA 공급망 소량 진입(TrendForce 2024-03-13). 등급 🟡+✅파생

> **권장 — 🟡 등급, 단일 원인 서사 차단용**
>
> **"같은 세대에서 마이크론은 HBM3를 아예 건너뛰고 HBM3E로 직행했다. 단독 공급은 한 벤더의 승리이자 두 벤더의 불참이 겹친 결과였다."**
> — 근거: The Next Platform(2024-12-20). 등급 🟡 `[사후 서술]`

> **조건부 사용 — 🟡 등급. 반드시 "업계는 ~로 본다" 형태로, 수율 숫자 없이**
>
> **"업계는 그 시간차의 원인으로 SK하이닉스의 MR-MUF 패키징을 지목한다. 다만 이 설명은 2023년 이후의 사후 해석이며, 2022년 당시의 1차 근거와 벤더가 확인한 수율 수치는 공개된 바 없다."**
> — 근거: Blocks&Files 용어사전 2022-04-20(공법의 공개 정착 시점) + EE Times·TrendForce 계열 사후 해석 + 본 원장 §3-D·§3-C. 등급 🟡 ⚠️

> **❌ 쓰지 말 것 (근거 없음 / 시점 오류)**
> - "삼성 HBM이 NVIDIA의 발열·전력 기준을 못 맞췄다" → **2024년 HBM3E 사안**. 2022년 설명에 쓰면 2년 시차 오류 (R-12)
> - "NVIDIA가 요구한 속도를 못 맞췄다" → HBM4 시대(2025~2026) 사실. 창 밖
> - 수율 숫자(10~20% / 60~70% / 75~80% / 60~65%) → 출처 충돌·벤더 미확인 (P-22)
> - "공동 설계 때문에 이겼다" → 창 안 근거 없음 (X-08)
> - "12단 수율이 갈랐다" → H100은 8단 (X-10)
> - "SK하이닉스가 투자를 더 했다" → CapEx는 오히려 감소 (C-02)
> - "가격 때문" → 창 안 데이터 없음 (X-05)

---

## 부록 A. 한눈에 보는 창(窓) 안 타임라인

```
2019-03   Samsung  HBM2E "Flashbolt" 발표 (GTC) ............ 발표
2019-08-12 SK hynix HBM2E 개발 완료 발표 ................... 발표
2020-02-04 Samsung  Flashbolt "market launch" (양산 1H20 예정) 발표
2020-05-14 NVIDIA   A100 40GB (HBM2) 출시
2020-07-02 SK hynix HBM2E 양산 개시 발표 (엔비디아 주문) ... 양산 ★
2020-11-16 NVIDIA   A100 80GB (HBM2E) 발표
2021-02   Samsung  HBM-PIM(Aquabolt-XL) 발표
2021-08-22 Samsung  Aquabolt-XL, Hot Chips 33 발표
2021-10   Samsung  Tech Day 2021 — HBM3 "2022 Q2 출시 예상"  로드맵
2021-10   SK hynix HBM3 개발 완료 발표 ..................... 발표 ★
2021-11-11 Samsung  H-Cube 2.5D 패키징 공개 (SEMCO·Amkor)
2022-01-28 JEDEC    JESD238 HBM3 표준 공표
2022-04-20 (업계)   MR-MUF, 공개 용어로 정착 (SK하이닉스 공법)
2022-06-09 SK hynix HBM3 양산 + NVIDIA 공급 발표 ........... 양산 ★
2022 Q3   NVIDIA   H100 출하 (HBM3 8단 16GB, 5/6 스택 활성)
2023-04-19 SK hynix 12단 HBM3 24GB 개발·샘플 제공 .......... 샘플
2023      (시장)   HBM3 양산 벤더는 SK하이닉스 단독, >95% 점유
2023-12-04 (보도)   NVIDIA–SK hynix HBM3E 우선 공급 계약
2023 4Q   Samsung  1Znm HBM3로 NVIDIA 공급망 진입(소량) .... 양산
```
★ = 본 원장이 1순위 인과로 판정한 마디

## 부록 B. 이 원장이 기존 레포 원장과 충돌·보완하는 지점

| 기존 | 본 원장의 수정·보완 |
|---|---|
| v7 A-13 / v6 C2-16: "SK하이닉스 HBM3 선점의 공개된 원인은 MR-MUF 패키징·수율" | **시점 한정 필요.** 그 설명은 2023년 이후 사후 해석이며 창 안 1차 근거가 없다(P-31). 또한 인용된 수율 수치(75~80% vs 60~65%)는 **12단·HBM3E 기준**이라 **8단 HBM3가 쓰인 2022년 H100 소켓의 설명이 될 수 없다**(X-10). |
| v7 A-11: "SK하이닉스 업계 최초 HBM3를 NVIDIA에 공급, 2022-06" | 유지. 본 원장 T-10에서 표준 일자·개발완료 일자와 함께 정밀화. |
| v7 A-06: "이천 패키징 등 KRW 8,800억 투자" | **일자 확정 실패**(C-05). 덱에 연도를 붙이지 말 것. |
| v7 §5-1: "공동 설계가 원인인지 결과인지 공개 자료는 구분 못 한다" | **강화.** 2019~2023 창 안에서는 **공동 설계 계약의 공개 기록 자체가 없다**(R-13). 창 안에서는 비지지로 단정 가능. |
| v7 A-30: 2022년 점유율 SK 50 / 삼성 40 | 유지 + **C-09 해석 추가**: 점유율 40%와 HBM3 소켓 0은 양립한다. |
