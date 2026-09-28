# 저용량·초고DWPD SSD와 구성 가능성 팩트 원장 (v1) — KV 캐시 active working set 티어(설계점 ≈2TB·≈30 DWPD) 및 고정 SKU → 출하 시 구성 → 런타임 조정 → 워크로드 적응 경로의 공개 근거

**수집일**: 2026-09-28
**수집자**: Research Agent (WC-SSD v1) — 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + GitHub 원문(1차 코드·문서) 기반 팩트 원장
**용도**: 신규 SSD 제품군(저용량·초고DWPD, KV 캐시 active working set 티어) 전략 초안의 사실 근거. 질문 Q1~Q6에 1:1 대응.

**등급**: ✅ 1차 원문 직접 열람(표준 구현 코드·헤더·공식 저장소 문서) / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 **WebFetch와 curl이 벤더·표준 도메인 전반에서 egress 프록시에 차단**되었다. 차단 확인: `nvmexpress.org`, `files.futurememorystorage.com`, `solidigm.com`, `americas.kioxia.com`, `micron.com`, `phison.com`, `opencompute.org`, `semiconductor.samsung.com`, `news.skhynix.com`, `snia.org`, `usenix.org`, `arxiv.org`, `docs.nvidia.com`, `techpowerup.com`, `storagereview.com`, `blocksandfiles.com`, `servethehome.com`, `tomshardware.com`, `kernel.org`. **직접 열람이 가능했던 것은 `raw.githubusercontent.com`과 GitHub 코드 검색뿐**이다. 따라서:
- **✅는 GitHub에서 원문을 직접 읽은 항목에만 붙였다**: xNVMe FDP 튜토리얼, QEMU NVMe 컨트롤러(`hw/nvme/ctrl.c`), libnvme `types.h`, nvme-cli 문서, SEF API 헤더(`SEFAPI.h` v1.14i), NVIDIA Dynamo(README·`policy.rs`), Phison aiDAPTIV README.
- 벤더 보도자료·데이터시트 수치는 **1차 출처이지만 검색 요약 경유**이므로 🟡로 낮췄다.
- NVMe Base 규격 PDF·OCP Datacenter NVMe SSD 규격 PDF 원문은 **읽지 못했다**. 규격 조항은 이를 구현한 코드(QEMU·libnvme·nvme-cli)로 역확인했다.

**0-2. DWPD는 워크로드 기준과 함께만 의미가 있다.** 같은 드라이브에서 순차/랜덤에 따라 수 배 벌어진다(레포 [qlc-v8-dwpd-price-inference-2026-09.md](qlc-v8-dwpd-price-inference-2026-09.md) E-01~E-03, 1-C). 본 원장은 **정격 DWPD(벤더 보증)**, **effective DWPD(압축·배치 적용 후 벤더 주장)**, **실측 DWPD(측정된 쓰기량 환산)** 를 열을 분리해 적는다. 셋을 섞지 말 것.

**0-3. 가격 데이터는 2026년 NAND 가격 급등기 한가운데다.** VDURA 지수상 엔터프라이즈 SSD 가격이 1년 새 약 6.5배가 되었다(§3 C-06). 따라서 **시점이 다른 가격끼리의 배수는 무의미**하고, 같은 시점에도 소매 리스팅과 지수는 채널이 다르다.

**0-4. DWPD→TBW 환산식**: `TBW = DWPD × 용량(TB) × 365 × 보증연수`. 레포 기확립 식 `DWPD = P/E × (1+OP) ÷ (EOL일수 × WAF)` ([component-to-system-solution-ladder-facts-2026-09.md](component-to-system-solution-ladder-facts-2026-09.md) F29, ✅).

---

## §1. 고내구(≥10 DWPD) 데이터센터 SSD 제품 지형

### 1-A. 출하·발표 제품 표

| ID | 벤더 | 모델 | NAND 유형 | 용량 | 정격 DWPD **(워크로드 기준)** | 보증 | 발표·출시 | 가격 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|---|---|---|
| H-01 | Solidigm (SK hynix 자회사) | **D7-P5810** | **SLC — 유형 충돌(H-20)**: "144단 SLC 3D NAND"(Solidigm) vs "144단 QLC(N38A) 다이를 pSLC로 운용"(분해·매체) | **800GB** (1.6TB는 "2024 상반기" 예정 → 이후 리스팅 존재) | **50 DWPD @ 4K 랜덤 / 65 DWPD @ 순차**, 800GB = **73 PBW** | 5년 | **2023-09** (Solidigm 뉴스룸·Blocks&Files 2023-09-21) | §3 C-01 참조 | Solidigm 뉴스룸 https://news.solidigm.com/en-WW/230095-introducing-the-solidigm-d7-p5810-an-ultra-fast-slc-ssd-for-write-intensive-workloads/ ; 제품브리프 https://www.solidigm.com/products/data-center/product-briefs/d7-p5810-product-brief.html ; TechPowerUp https://www.techpowerup.com/314097/ ; Blocks&Files https://blocksandfiles.com/2023/09/21/solidigm-d7-p5810/ ; overclocking.com https://en.overclocking.com/d7-p5810-enterprise-ssd-with-3d-slc-chips/ ; TechInsights 분해 https://www.techinsights.com/blog/solidigm-d7-p5810-ssdpf2sq800gz01-deep-dive-teardown (본문 미열람) | 🟡 `[검색 요약 경유]` |
| H-02 | Micron | **XTR** | **176단 NAND를 "순수 SLC 모드로 프로그램"** (Micron PR 서술). 일부 소매 리스팅은 "TLC"로 표기 → H-21 | **960GB / 1.92TB** (3.84TB는 확인 못함) | **35 RDWPD(랜덤) / 60 SDWPD(순차)** — 블록 크기 미확인 | 미확인 | **2023-05-16** | §3 C-03 | Micron IR https://investors.micron.com/news-releases/news-release-details/micron-scales-storage-new-heights-launch-two-data-center-drives ; ServeTheHome https://www.servethehome.com/micron-6500-ion-and-xtr-enterprise-ssds-announced/ ; Tom's Hardware https://www.tomshardware.com/news/micron-launches-ultra-high-capacity-30tb-6500-ion-ssd-and-high-endurance-xtr | 🟡 `[검색 요약 경유]` |
| H-03 | Kioxia | **FL6** | **XL-FLASH (BiCS4 96단 기반 SLC)** | **800GB / 1.6TB / 3.2TB** | **60 DWPD** — 워크로드 기준 **확보하지 못했다** | 5년 | **2021-09-13** 발표 | 확보 못함(일부 리테일러 "단종" 표기) | Businesswire 2021-09-13 https://www.businesswire.com/news/home/20210913005906/en ; Blocks&Files 2021-09-14 https://www.blocksandfiles.com/flash/2021/09/14/kioxia-announces-optane-class-ssd/1612069 ; Kioxia 제품페이지 https://americas.kioxia.com/en-us/business/ssd/enterprise-ssd/fl6.html | 🟡 |
| H-04 | Kioxia | **GP Series / GP1** | **XL-FLASH 2세대 (SLC)** + 신규 자체 컨트롤러 | **미공개** | **최대 50 DWPD** — 기준 미공개 | 미공개 | GP Series 발표 **2026-03-16**(GTC, NVIDIA "Storage-Next"용) → GP1 **2026-08-04**(FMS). PCIe 6.0, 512B 랜덤 읽기 10M IOPS, E3.S/E1.S. **평가 샘플 2026년 말** | — | Kioxia PR 2026-03-16 https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-1.html ; Kioxia PR 2026-08-04 https://www.kioxia.com/en-jp/business/news/2026/20260804-1.html ; TechRadar https://www.techradar.com/pro/kioxia-showcases-the-worlds-fastest-ssd-with-mind-blowing-10m-iops-and-a-staggering-50-dwpd-endurance | 🟡 (발표·샘플 단계) |
| H-05 | Kioxia–NVIDIA | **100M IOPS SSD** | **XL-FLASH 3세대 (SLC)**, PCIe 7.0 | 미공개 | 미공개 | — | 2025-09 "2027 상용화" 목표 발표 → **2026-09 보도: 2028로 1년 순연**(PCIe 7.0 생태계 인증 일정) | — | Tom's Hardware 2025-09 https://www.tomshardware.com/tech-industry/nvidia-and-kioxia-target-100-million-iops-ssd-in-2027-33-times-more-than-existing-drives-for-exclusive-use-in-ai-servers ; TechTimes 2026-09-08 https://www.techtimes.com/articles/326958/20260908/kioxia-slips-100m-iops-flash-drive-2028-pcie-70-ecosystem-sets-2028-clock.htm ; ComputerBase https://www.computerbase.de/news/storage/xl-flash-gen-3-und-pcie-7-0-kioxias-100-millionen-iops-ssd-kommt-2028.99297/ | 🟡 (계획) |
| H-06 | Phison | **Pascari X200Z** | **NAND 유형 충돌(H-22)**: "SK hynix V7 176단 SLC NAND"(리뷰) vs "full-time pSLC 모드(TLC를 SLC처럼)"(Phison 블로그·브로셔 요약) | **800GB / 1.6TB / 3.2TB**, 최신 브로셔 **최대 6.4TB** | **60 DWPD** — 기준 미확인. 3.2TB = "5년 350 PB" | 5년 | **최초 발표 시점 충돌(H-23)**: Pascari 브랜드·X200 계열 2024-05-15 vs X200Z는 COMPUTEX 2025(2025-05-19) PR에 등장 | 확보 못함 | Phison 블로그 https://phisonblog.com/breaking-the-endurance-barrier-how-the-pascari-x200z-redefines-enterprise-ssd-performance/ ; 브로셔 https://www.phisonenterprise.com/wp-content/uploads/2025/11/110125-PascariProductBrochure_X200Z_102325.pdf ; TweakTown https://www.tweaktown.com/reviews/11053/ ; Businesswire 2025-05-19 https://www.businesswire.com/news/home/20250519249098/en/ | 🟡 |
| H-07 | Phison | **Pascari X202Z** | 미확인 | 미확인 | **최대 60 DWPD**, U.2·E1.L, 순차쓰기 10 GB/s | 미확인 | **COMPUTEX 2026 (2026-06-01/02)** | — | Businesswire 2026-06-01 https://www.businesswire.com/news/home/20260601070396/en/ ; Phison 블로그 https://phisonblog.com/phison-unveils-a-new-era-of-pascari-enterprise-storage-at-computex-2026/ | 🟡 |
| H-08 | Phison | **aiDAPTIVCache AI100E** (AI200E = PCIe 5.0 후속) | **TLC를 펌웨어로 순수 pSLC 운용** — "TLC 모드 ~5,000 P/E 대신 ~60,000 P/E" | **320GB / 1TB / 2TB** (M.2·U.2, PCIe 4.0). **320GB는 원시 TLC 2TB 사용** | **100 DWPD** — 기준 미공개 | 5년(검색 요약) | 출시 일자 원문 미확인(aiDAPTIV+ 계열, 2026-01 보도 시점 판매 중). 워크스테이션·서버용, **시스템 통합사를 통해서만 판매** | Newegg 리스팅 존재(가격 미수집) | aiDAPTIV GitHub README(✅ 용량·모델) https://github.com/aiDAPTIV-Phison/aiDAPTIV ; Tom's Hardware 2026-01-14 https://www.tomshardware.com/tech-industry/artificial-intelligence/phison-demos-10x-faster-ai-inference-on-consumer-pcs-with-software-and-hardware-combo-that-enables-3x-larger-ai-models-nvidia-amd-msi-and-acer-systems-demoed-with-aidaptiv ; Phison https://www.phison.com/aidaptiv-plus-ai-data-storage-solution/ | ✅(용량·모델명) / 🟡(DWPD·P/E·원시용량) |
| H-09 | Samsung | **Z-SSD SZ985** | **Z-NAND (SLC 계열)** | **240GB / 800GB** | **30 DWPD / 5년**, 800GB = **42 PB** | 5년 | 800GB **2018-01-29** | — | Samsung Newsroom https://news.samsung.com/global/samsung-electronics-launches-800-gigabyte-z-ssd-for-hpc-systems-and-ai-applications ; 브로슈어 https://download.semiconductor.samsung.com/resources/brochure/Brochure_Samsung_S-ZZD_SZ985_1804.pdf ; 레포 v6 A07 | 🟡 |
| H-10 | Samsung | **SZ983 M.2 / 983 ZET** | Z-NAND | SZ983 240/480GB; 983 ZET 480/960GB | SZ983 **30 DWPD**; 983 ZET **10 DWPD(960GB) / 8.5 DWPD(기타)** | 5년 | 2018 | — | PC Perspective https://pcper.com/news/Storage/Samsung-Shows-M2-Form-Factor-Z-NAND-Z-SSD-OCP-Summit ; TweakTown https://www.tweaktown.com/reviews/8911/samsung-983-zet-nand-ssd-review/index.html | 🟡 |
| H-11 | Samsung | **Z-NAND 부활(7세대 Z-NAND + GIDS)** / **zNAND-O** | Z-NAND | 미공개 | 미공개 | — | FMS 2025(2025-08): "7세대 Z-NAND, GIDS 결합 memory-class storage **2026 예정**", "기존 NAND 대비 최대 15배 성능·80% 전력 절감" 목표. FMS 2026(2026-08): **zNAND-O는 컨셉**(로직 위 4/8단 적층, 양산 일정 없음) | — | TechPowerUp https://www.techpowerup.com/339857/ ; Tom's Hardware https://www.tomshardware.com/pc-components/storage/samsungs-revived-z-nand-targets-15x-performance-increase-over-traditional-nand-once-a-competitor-to-intels-optane-z-nand-makes-a-play-for-ai-datacenters ; Samsung Newsroom FMS 2026 https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure | 🟡 (계획·컨셉) |
| H-12 | SK hynix | **AI-N P** (NVIDIA 명칭 "Storage Next") | **SLC NAND** | 미공개 | **미공개** | — | 2025-10~12 보도: **1세대 샘플 2026년 말(PCIe Gen6, 25M IOPS)**, **2세대 100M IOPS 2027년 말 양산 목표**. NVIDIA와 PoC | — | TrendForce 2025-12-11 https://www.trendforce.com/news/2025/12/11/news-sk-hynix-reportedly-aims-100-million-iops-with-ai-nand-by-2027-in-collaboration-with-nvidia/ ; Blocks&Files 2025-10-28 https://blocksandfiles.com/2025/10/28/sk-hynix-aims-for-ai-flash-glory-with-ain-trifecta/ | 🟡 (계획) |
| H-13 | DapuStor | **Xlenstor2 X2900P / X2900** | **Kioxia XL-FLASH (SLC)** | **400 / 800 / 1,600GB** | X2900P **100 DWPD**, X2900 **60 DWPD** | 5년 | 리뷰 2023-08-04 | — | ServeTheHome https://www.servethehome.com/dapustor-xlenstor2-x2900p-800gb-review-the-100-dwpd-next-gen-slc-optane-alternative-kioxia-intel-optane/ ; StorageReview https://www.storagereview.com/review/dapustor-x2900p-scm-ssd-review | 🟡 |
| H-14 | DapuStor | **X5 SCM (Xlenstor5)** | SCM(SLC 계열로 추정, 미확인) | 미확인 | **최대 120 DWPD**, 지연 20/5µs — **"KV 캐시 오프로딩·TTFT 단축"으로 포지셔닝** | 미확인 | WAIC 2026 (**2026-07-28**) | — | StorageNewsletter 2026-07-28 https://www.storagenewsletter.com/2026/07/28/waic-2026-dapustor-showcased-ai-storage-portfolio-with-weka-and-gigabyte/ ; 제품 https://en.dapustor.com/product/23.html | 🟡 |
| H-15 | Intel (단종) | **Optane P5800X** | 3D XPoint (NAND 아님) | 400GB / 800GB / 1.6TB / 3.2TB | **100 DWPD** | — | Q4'20 출시, **Optane 사업 2022 종료** | — | Intel ARK https://www.intel.com/content/www/us/en/products/sku/201861/intel-optane-ssd-dc-p5800x-series-400gb-2-5in-pcie-x4-3d-xpoint/specifications.html | 🟡 (역사적 기준점) |

**부가(10 DWPD 미만이지만 KV 캐시 티어로 직접 포지셔닝된 제품, 비교용)**

| ID | 제품 | DWPD | 비고 | 출처 | 등급 |
|---|---|---|---|---|---|
| H-16 | Kioxia **CM10** (PCIe 6.0, BiCS10 332단 TLC) | **1 DWPD(RI) / 3 DWPD(MU)**, 1.6~61.44TB | "KV 캐싱용"으로 보도, **FDP 지원**, OCP DC NVMe SSD 2.7 준수 | Blocks&Files 2026-07-30 https://www.blocksandfiles.com/flash/2026/07/30/kioxia-launches-kv-caching-ssd-and-ai-focussed-fingernail-drive/5280989 ; Kioxia PR https://www.kioxia.com/en-jp/business/news/2026/20260730-1.html | 🟡 |
| H-17 | Solidigm **D7-PS1030** | **3 DWPD** (12.8TB 등) | StorageReview가 KV 캐시 티어에서 실측(§4 D-03) | StorageReview 2026-08-31 https://www.storagereview.com/review/solidigm-d7-ps1030-review-3-dwpd-gen5-that-earned-its-keep-in-the-kv-cache-tier | 🟡 |
| H-18 | ScaleFlux **KV cache / CMX 플랫폼** | **7~10+ "effective" DWPD @5년** (압축·FDP·구성 의존, **정격 아님**) | 200+ FDP write stream, **Q4 2026 샘플** | PRNewswire 2026-07-30 https://www.prnewswire.com/news-releases/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload-302838473.html | 🟡 |
| H-19 | Huawei **OceanStor M900** (시스템, SSD 단품 아님) | **최대 24 DWPD**("KV-aware adaptive storage"로 SSD 내구성 **16배** 연장, **3년** 안정성) | 2026-09-17 HUAWEI CONNECT | Huawei https://www.huawei.com/en/news/2026/9/hc-context-memory-storage ; PRNewswire https://www.prnewswire.com/news-releases/huawei-introduces-oceanstor-m900-context-memory-storage-to-accelerate-ai-inference-in-hyperscale-data-centers-302882127.html | 🟡 (시스템 수준 주장) |

### 1-B. 충돌 기록

- **H-20 ⚠️ D7-P5810 NAND 유형 충돌.** Solidigm 공식 서술은 "144단 **SLC** 3D NAND", 매체(overclocking.com 등)·분해 계열은 "**QLC N38A 1Tb 다이를 pSLC로 256Gb처럼 운용**". TechInsights 분해 원문은 **열람하지 못했다**. → **"네이티브 SLC"와 "pSLC"를 단정하지 말 것.** 두 서술이 양립하려면 "SLC 전용 모드로만 운용되는 QLC 설계 다이"여야 한다(⚠️ 추론).
- **H-21 ⚠️ Micron XTR NAND 유형 표기 충돌.** Micron PR은 "176단 플래시를 **순수 SLC 모드로 프로그램**", 일부 소매 리스팅(disctech)은 "TLC". PR 서술은 **TLC 다이의 SLC 모드 운용(=pSLC)** 과 양립한다. → 덱에는 "SLC 모드로 운용"으로 쓰는 것이 두 출처 모두와 모순되지 않는다.
- **H-22 ⚠️ X200Z NAND 유형 충돌.** 리뷰: "SK hynix V7 176단 **SLC** NAND" / Phison 블로그·브로셔 요약: "full-time **pSLC** 모드". 레포 v6 A16은 "SLC, SK hynix V7 176L"로 기록.
- **H-23 ⚠️ X200Z 발표 시점 충돌.** 레포 v6 A16: 2024-05-15(Pascari 브랜드 런칭 PR). 이번 검색: X200Z는 2025-05-19 COMPUTEX PR에서 소개. 2024-05-15 PR은 "X200"(비 Z) 계열일 가능성.

### 1-C. TBW 검산 (⚠️ 파생, 산식 `DWPD × TB × 365 × 5`)

| 제품 | 계산 | 결과 | 벤더/리스팅 값 | 판정 |
|---|---|---|---|---|
| D7-P5810 800GB | 50 × 0.8 × 1,825 | **73,000 TB** | 73 PBW(벤더). 리스팅 74,752 TBW = 73 × 1,024 | ✅ 일치(리스팅은 이진 단위) |
| D7-P5810 1.6TB | 50 × 1.6 × 1,825 | **146,000 TB** | 리스팅 149,504 TBW = 146 × 1,024 | ✅ 일치 |
| FL6 3.2TB | 60 × 3.2 × 1,825 | **350,400 TB** | (미공표) | — |
| X200Z 3.2TB | 60 × 3.2 × 1,825 | **350,400 TB** | "5년 350 PB"(TweakTown) | ✅ 일치 |
| XTR 960GB / 1.92TB (랜덤 기준) | 35 × 0.96 / 1.92 × 1,825 | **61,320 / 122,640 TB** | (미확인) | — |
| SZ985 800GB | 30 × 0.8 × 1,825 | **43,800 TB** | 42 PB(삼성) | ⚠️ 약 4% 차이(43,800÷1,024 = 42.8 → 단위·반올림 차로 추정) |

### 1-D. ⭐ 판정 — ≥30 DWPD 제품의 전형적 용량 범위

- **정격 ≥30 DWPD로 출하된(또는 출하됐던) 제품의 용량은 0.24TB ~ 3.2TB에 몰려 있다.** 하한 Samsung SZ985 240GB(H-09), 상한 Kioxia FL6·Phison X200Z·Intel P5800X 3.2TB(H-03·H-06·H-15). **최빈 용량점은 800GB·1.6TB.**
- **예외**: Phison X200Z 최신 브로셔(2025-11)가 **최대 6.4TB**를 표기(H-06). 이것이 확인된 ≥30 DWPD 최대 용량이다.
- **2TB 인근의 ≥30 DWPD 점**: Micron XTR **1.92TB(35 RDWPD)**(H-02), Phison AI100E **2TB(100 DWPD, pSLC, PCIe 4.0, 시스템 통합사 채널 한정)**(H-08). 설계점 "≈2TB·≈30 DWPD"는 **기존 제품 용량 범위 안에 있다**(⚠️ 파생: 0.24 ≤ 2 ≤ 3.2(6.4)).
- **2026년 발표된 AI용 SLC 계열 신제품(GP1·AI-N P·X5)은 용량을 공개하지 않았다**(H-04·H-12·H-14).

---

## §2. pSLC 및 네이티브 P/E 사이클

### 2-A. pSLC (TLC/QLC 다이를 SLC 모드로 운용) — 공개 수치

| ID | 원 다이 | pSLC P/E | 비교(원 모드 P/E) | 맥락 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|
| P-01 | 3D TLC (구세대) | **~30,000** | 3D TLC 3,000 / SLC 60,000~100,000 | 산업용 SSD 백서 | 2020-11 | Virtium WP23 https://www.virtium.com/wp-content/uploads/2020/11/WP23-1120-01-Options-for-High-SSD-Endurance.pdf ; Virtium 블로그 https://www.virtium.com/technology-updates/how-industrial-ssds-may-use-3d-tlc-nand-flash-to-create-slc-like-endurance/ | 🟡 |
| P-02 | 3D TLC | **30,000** (블록 단위) | — | TDK 산업용 카탈로그 "3D-SLC mode" | 2023-04-06 카탈로그 | Mouser https://www.mouser.com/datasheet/2/400/TDK_4_6_2023_flashstorage_catalog_en_15-3135344.pdf | 🟡 |
| P-03 | BiCS5 112단 TLC | iSLC **30,000** / **Ultra iSLC 100,000** | "기존 3D TLC 대비 최대 33배" | Innodisk 특허 펌웨어 | **2023-02-24** PR | Innodisk https://www.innodisk.com/en/news/islc-with-100k-pe-cycles ; StorageNewsletter 2023-03-10 https://www.storagenewsletter.com/2023/03/10/innodisk-patented-islc-firmware-technology-with-100000-p-e-cycles-to-seize-5g-networking-and-ai-smart-city-opportunities/ | 🟡 |
| P-04 | 112단 3D TLC | **100,000** (X-78 pSLC) | "이전 세대 30,000 → 최신 100,000" | Swissbit 산업용 SATA X-7x | **2023-06** | Electronics Weekly https://www.electronicsweekly.com/news/products/memory-products/swissbit-extends-3d-tlc-nand-storage-options-2023-06/ ; Swissbit 블로그 https://www.swissbit.com/en/news/blog/4-reasons-to-use-industrial-3d-tlc-nand-flash-as-pseudo-slc | 🟡 |
| P-05 | TLC (Phison 일반) | **"최대 100,000"** | TLC 3,000 (타 문장은 3,000~5,000) | Phison 블로그 | 2023~2026 (개별 일자 미확정) | https://phisonblog.com/versatility-across-industries-novel-uses-of-phisons-high-performance-high-endurance-e18-pslc-customizable-ssd/ | 🟡 |
| P-06 | TLC (Phison aiDAPTIV) | **~60,000** | **TLC 모드 ~5,000** | 100 DWPD 제품의 근거로 제시 | **2026-01-14** 보도 | Tom's Hardware (H-08) | 🟡 |
| P-07 | **QLC** (Micron 다이, Crucial BX500 512GB) | **60,000** (MPtools 펌웨어 설정값) | **QLC 900** | 애호가 개조: 512GB QLC → ~120GB SLC, TBW 120 → ~4,000 TB | **2024-04-30** (TechPowerUp) / 2024-05-13 원 튜토리얼 | TechPowerUp https://www.techpowerup.com/321998/ ; Tom's Hardware https://www.tomshardware.com/pc-components/storage/enthusiast-mods-a-512gb-qlc-ssd-into-a-120gb-slc-ssd-endurance-and-performance-benefits-charted ; The Overclock Page https://theoverclockingpage.com/2024/05/13/tutorial-transforming-a-qlc-ssd-into-an-slc-ssd-dramatically-increasing-the-drives-endurance/?lang=en | ⚠️ **벤더 정격 아님**(도구 파라미터·개인 시험) |
| P-08 | **QLC** (DapuStor J5060 dual-mode) | **"QLC 영역 대비 25배 이상의 P/E"** — 절대값 미공개 | — | 벤더 공식 서술, 영역별 DWPD/TBW 미공개 | **2026-09-21** | Blocks&Files https://www.blocksandfiles.com/flash/2026/09/21/a-look-at-dapustors-combined-slc-and-qlc-ssd/5297708 ; Tom's Hardware https://www.tomshardware.com/pc-components/ssds/dapustor-splits-qlc-ssd-to-create-a-fast-pslc-region-in-dual-mode-drive-trades-6-percent-to-20-percent-of-its-qlc-capacity-for-more-than-7x-faster-random-writes | 🟡 |
| P-09 | MLC/TLC/QLC 일반 | **20,000~100,000** | — | Silicon Motion Ferri 계열 서술(검색 요약) | 미상 | EE Times Asia https://www.eetasia.com/silicon-motion-ferrissd-eliminating-bit-errors-over-a-long-operating-lifetime/ | ⚠️ (요약 출처 불명확) |
| P-10 | (참고) SLC 계열 관리 기술 | **50K / 100K / 250K+** (EnduroSLC) | "pSLC 대비 최소 5배" | Greenliant 산업용 | 2019-08-28 | GlobeNewswire https://www.globenewswire.com/news-release/2019/08/28/1907791/0/en/ | 🟡 |

**P-11 ⚠️ 파생 — QLC-pSLC의 절대 P/E 범위.** P-08(“QLC의 >25배”)에 네이티브 QLC P/E(2-B: ~1,000, 벤더 주장 상한 3,000)를 곱하면 **>25,000 ~ >75,000**. P-07(개조, 60,000)은 이 범위 안. **벤더가 QLC-pSLC 절대 P/E를 공표한 사례는 확보하지 못했다**(§7 G-04).

**P-12 ⚠️ 파생 — pSLC-on-TLC 범위 요약.** 공개 수치는 **30,000(구세대·보수적) ~ 60,000(Phison 엔터프라이즈 AI 제품) ~ 100,000(112단 BiCS5 산업용, 2023)** 에 분포. **단일값으로 쓰지 말 것** — 세대·ECC·보존(retention) 조건·온도 등급이 다르고, 산업용 100K는 SATA/저용량 제품 기준이다.

### 2-B. 네이티브 P/E (비교용)

| ID | 셀 | P/E | 출처·일자 | 등급 |
|---|---|---|---|---|
| P-20 | SLC | 50,000~100,000 (일반), 60,000~100,000 (Virtium) | Kingston 블로그 https://www.kingston.com/en/blog/pc-performance/difference-between-slc-mlc-tlc-3d-nand ; P-01 ; 레포 ladder F4 | 🟡 |
| P-21 | SLC (XL-FLASH) | **공표 P/E 확보하지 못했다**. 다이 스펙: **SLC 128Gb / MLC 256Gb**(동일 계열, 2022년 MLC 지원 2세대 발표) | Kioxia XL-FLASH 페이지 https://americas.kioxia.com/en-us/business/memory/xlflash.html | 🟡 |
| P-22 | TLC | 1,000~3,000(일반), 3,000(Innodisk·Phison·특허), 3,000~5,000(Phison), ~5,000(Phison aiDAPTIV 기준), **8,000**(Micron 동적 SLC 특허 예시) | Kingston ; Phison 블로그 ; Tom's Hardware 2026-01-14 ; USPTO 11556479 https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11556479 | 🟡 |
| P-23 | QLC | 100~1,000(일반), **~1,000**(Toshiba 64단 BiCS3, 2017-07 발표 목표), **900**(Micron QLC, BX500 개조 기준), ~1,000(특허 12474847 예시) | TechPowerUp 2017 https://www.techpowerup.com/234878/ ; USPTO 12474847 https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12474847 ; P-07 | 🟡 |
| P-24 | QLC (엔터프라이즈 주장) | **"3,000 P/E"(Solidigm QLC 관련 서술)** — 검색 요약에만 등장, 원문 미확인 | Solidigm 기술 페이지(추정) https://www.solidigm.com/products/technology/read-dominant-workload-qlc-for-cloud-enterprise-storage.html | ⚠️ **미검증** |

### 2-C. 도출 보조 산식 (⚠️ 파생 — 판단 아님, 산술만)

`DWPD = P/E × (물리용량 ÷ 사용자용량) ÷ (일수 × WAF)` (레포 F29의 (1+OP)를 물리/사용자 비로 표기).

- 30 DWPD·5년(1,825일)을 내려면: `P/E × (물리/사용자) = 30 × 1,825 × WAF = 54,750 × WAF`.
- 필요 (물리/사용자) 비: P/E 30K → **1.83 × WAF**, 60K → **0.91 × WAF**, 100K → **0.55 × WAF**. (비는 1 미만이 될 수 없으므로 WAF가 낮으면 "OP 최소치"가 하한이 된다.)
- pSLC-on-TLC의 물리 SLC 용량 = 원시 TLC ÷ 3 (bits-per-cell 비. 실제 제품은 이보다 불리 — §3 C-10).

**P-30 ⚠️ 파생 — Phison AI100E 수치의 내적 정합 점검.** 320GB 사용자 용량 ← 원시 TLC 2TB(→ SLC 물리 0.667TB), P/E 60,000, 5년이라면 WAF=1에서도 `60,000 × (0.667÷0.32) ÷ 1,825 = 68.5 DWPD` < **100 DWPD**. 100 DWPD를 5년·WAF 1로 내려면 P/E ≥ **87,600**이 필요하다. → **공개된 세 수치(60K P/E·2TB 원시·100 DWPD 5년) 중 적어도 하나는 기준이 다르다**(예: 3년 기준이면 114 DWPD). 이 제품을 도출 근거로 쓰지 말 것.

---

## §3. 내구성의 비용

### 3-A. 벤더 공식 비용 서술

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| C-01 | **Micron XTR: "SCM SSD 대비 랜덤 DWPD 내구성의 최대 35%를 비용의 20%에"** — 비교 대상은 **SCM(Optane류)이지 TLC가 아니다** | 2023-05-16 | Micron IR PR (H-02) | 🟡 `[검색 요약 경유]` |
| C-02 | Kioxia FL6 출시 시 **가격 비공개**. 매체는 "Optane보다 쌀 것"이라고만 추정 | 2021-09 | Computer Weekly https://www.computerweekly.com/news/252506903/Koxia-revisits-SLC-flash-to-power-FL6-and-rival-Optane | 🟡 |

### 3-B. 시점 표기 소매·지수 가격 (채널 상이 — 배수 계산 시 주의)

| ID | 제품 (유형) | 가격 | $/GB (⚠️ 파생) | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| C-03 | Solidigm **D7-P5810 800GB (SLC)** | $704.02 | **0.88** | 2025-10 | CompSource https://www.compsource.com/buy/SSDPF2SQ800GZ01/Solidigm-6455 | 🟡 (검색 인덱스의 가격 스냅샷) |
| C-04 | 동일 | $2,062.79 → **$2,655.68** | 2.58 → **3.32** | 2026-05 → **2026-08** | 동일 | 🟡 |
| C-05 | Solidigm **D7-P5810 1.6TB (SLC)** | **$4,485.59** | **2.80** | **2026-08-06** | CompSource https://www.compsource.com/buy/SSDPF2SQ016TZ01/Solidigm-6455 | 🟡 |
| C-06 | **VDURA Flash Volatility Index**: 30TB **TLC $22,600 / QLC $18,080** (Q3'25는 $3,460 / $2,768). "약 6.5배, 7월 +5%" | 30TB TLC **0.75** / QLC **0.60** (Q3'25: 0.115 / 0.092) | **2026-08-11** | VDURA https://www.vdura.com/2026/08/11/ssd-prices-settle-into-a-costly-new-normal-at-6-5x-year-ago-levels-reshaping-the-economics-of-ai-factories-vdura-flash-volatility-index-shows/ ; StorageReview https://www.storagereview.com/news/enterprise-ssd-prices-run-at-6-5x-last-year-vdura-pegs-a-30tb-tlc-drive-at-22600 | 🟡 |
| C-07 | Solidigm D7-P5520 1.92TB (TLC, 1 DWPD) | $497.73 (11Z) / $1,864.54 (M1 변종) | 0.26 / 0.97 | 2026-01-04 / 2026-03-27 | CompSource | ⚠️ (변종·일자 상이) |
| C-08 | Micron **XTR 960GB** | $1,150 | 1.20 | **일자 미상** | Server Supply https://www.serversupply.com/SSD/NVMe/960GB/MICRON/MTFDKCC960TFR-1BC1ZHEYY_377148.htm | ⚠️ |

**C-09 ⚠️ 파생 — 같은 달(2026-08) SLC 소매 vs TLC 지수 배수.** D7-P5810 1.6TB 2.80 ÷ 0.75 = **3.7배**, 800GB 3.32 ÷ 0.75 = **4.4배**. 2025년 10월 소매(0.88) ÷ Q3'25 지수(0.115) = **7.6배**. **채널(소매 리스팅 vs 구매자 지수)과 용량(0.8~1.6TB vs 30TB)이 달라 이 배수는 "관찰된 범위"일 뿐 원가 배수가 아니다.** 1년 새 TLC 지수는 약 6.5배 올랐고 P5810 소매는 약 3.8배($704→$2,656) 올라 **배수 자체가 급변 중**이다.

### 3-C. bits-per-cell 비(1:3:4)를 권위 있게 진술한 곳이 있는가

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| C-10 | **DapuStor J5060: 30.72TB 모델에서 "QLC 약 4TB를 pSLC 800GB로 전환"** → 실측 비 **5 : 1** (bits-per-cell 이론 4:1보다 불리). 400GB·1.2TB 옵션은 QLC 풀의 6~20% 소모 | Blocks&Files·Tom's Hardware 2026-09-21~22 (P-08) | 🟡 (벤더 공개 수치의 매체 전재) |
| C-11 | **Phison aiDAPTIV: 사용자 320GB ← 원시 TLC 2TB** → **6.25 : 1** (이론 3:1 + 대량 OP) | Tom's Hardware 2026-01-14 (H-08) | 🟡 |
| C-12 | **Kioxia XL-FLASH 다이: SLC 128Gb / MLC 256Gb** → 동일 계열 다이에서 비트/셀 2배 = 용량 2배 | Kioxia XL-FLASH 페이지 (P-21) | 🟡 |
| C-13 | 애호가 개조: QLC 512GB → SLC ~120GB → **~4.3 : 1** | P-07 | ⚠️ |
| C-14 | "SLC $/GB는 TLC·QLC의 10~15배", "pSLC는 TLC의 약 1.8배 가격/40~60% 프리미엄" 류 서술 | 저품질 블로그·구매 가이드(검색 요약) — 출처 추적 불가 | ⚠️ **덱 사용 금지** |

**C-15 판정.** **SLC급 SSD와 TLC/QLC 엔터프라이즈 SSD의 $/GB를 같은 시점·같은 채널로 비교한 깨끗한 공개 자료는 확보하지 못했다.** 벤더가 공개한 비용 비교는 **XTR vs SCM(20%)** 하나뿐이다. **"SLC는 TLC의 3배 비용"을 권위 있게 진술한 1차 출처도 찾지 못했다.** bits-per-cell 비로 폴백할 경우 **⚠️ 파생**으로 표기하고, 실제 제품의 전환 비는 **5:1(DapuStor QLC→pSLC)**, **6.25:1(Phison TLC→pSLC, OP 포함)** 로 이론치보다 불리하다는 점을 병기해야 한다.

---

## §4. AI/KV 캐시의 고DWPD 수요 근거와 반증

### 4-A. 수요 측 근거

| ID | 주장·사실 | 수치 (기준) | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|
| D-01 | ScaleFlux: NVIDIA CMX·KV 캐시 오프로드용 플랫폼. **"endurance tax"**(쓰기 흡수만을 위해 용량을 과다 배치하는 비용)를 명시적으로 문제화 | **7~10+ effective DWPD @5년** (압축·FDP·구성 의존) | 2026-07-30 | PRNewswire (H-18) ; TechTimes 2026-08-01 "KV-Cache Churn Burns Through SSDs" https://www.techtimes.com/articles/322601/20260801/kv-cache-churn-burns-through-ssds-scaleflux-built-drive-level-storage-nvidia-cmx.htm | 🟡 |
| D-02 | Huawei OceanStor M900: KV 캐시 수명 예측 기반 배치로 **최대 24 DWPD**, SSD 내구성 **16배** 연장, **3년** 안정성 | 24 DWPD (시스템 수준, 3년) | **2026-09-17** | Huawei (H-19) | 🟡 |
| D-03 | **StorageReview 실측**: Dell XE7740, D7-PS1030 12.8TB × 8(RAID10). **KV 쓰기 1.9 GB/s 상시 → 드라이브당 약 3.2 DWPD**(D7-PS1030 정격 3 DWPD 초과). "**플래시 티어의 결정적 제약은 용량·속도가 아니라 내구성**" | 실측 3.2 DWPD | 2026-07 (리뷰 2026-08-31) | StorageReview https://www.storagereview.com/review/the-token-efficient-path-for-long-context-inference-kv-cache-offload-to-flash ; H-17 | 🟡 |
| D-04 | DapuStor X5 SCM: **최대 120 DWPD**를 "KV 캐시 오프로딩·TTFT 단축"으로 포지셔닝 | 120 DWPD (정격, 기준 미상) | 2026-07-28 | H-14 | 🟡 |
| D-05 | Phison aiDAPTIV+: **100 DWPD** SLC-모드 SSD. KV 캐시 오프로드는 aiDAPTIVLink 3 범위. CES 2026 하이브리드 SSD는 **TLC 네임스페이스 + SLC 캐시 네임스페이스** 2분할 | 100 DWPD | 2026-01 | aiDAPTIV README ✅ ; Tom's Hardware 2026-01-14 ; Phison 블로그 https://phisonblog.com/phison-showcases-aidaptiv-inference-new-client-and-pascari-enterprise-ssds-at-ces-2026/ | ✅(README) / 🟡 |
| D-06 | TrendForce: **"NVIDIA가 SLC NAND를 차세대 AI 스토리지의 핵심 요소로 지목"**, SLC 전개를 위한 SW 플랫폼 **SCADA** 개발. SK hynix·Kioxia SLC 기반 AI SSD 가속 | 정성 (**DWPD 아닌 IOPS·지연 동기**) | 2025-12-29 | TrendForce https://www.trendforce.com/news/2025/12/29/news-slc-based-ai-ssds-gain-traction-as-sk-hynix-and-kioxia-accelerate-development-with-nvidia/ | 🟡 |
| D-07 | NVIDIA ICMSP(→ **CMX**로 개칭) 발표: BlueField-4 기반 pod 수준 KV 컨텍스트 티어를 NVMe SSD로 표준화 | 정성 | 2026-01-06 (CES) ; 개칭 보도 2026-03-30 | NVIDIA Newsroom https://nvidianews.nvidia.com/news/nvidia-bluefield-4-powers-new-class-of-ai-native-storage-infrastructure-for-the-next-frontier-of-ai ; Blocks&Files https://www.blocksandfiles.com/ai-ml/2026/03/30/nvidia-and-its-partners-kv-cache-extenders/5209284 | 🟡 |
| D-08 | SanDisk 경영진 추정: NVIDIA KV 캐시 아키텍처만으로 **2027년 75~100 EB 증분 NAND 수요**, 2028년 2배 가능 | 75~100 EB | 2026 | TechTimes 2026-08-01 (D-01) 재인용 | ⚠️ (2차 재인용) |

**D-09 ⚠️ 파생 — D-03 실측의 용량 환산(산술만).** 1.9 GB/s × 86,400 s = **164 TB/일**, RAID10 미러링 ×2 = 328 TB/일, ÷8 = **드라이브당 41 TB/일** → ÷12.8TB = **3.2 DWPD**(원문과 일치). 같은 드라이브당 쓰기량이 **2TB 드라이브**에 걸리면 41 ÷ 2 = **20.5 DWPD**. **2TB에서 30 DWPD**는 드라이브당 **60 TB/일 = 약 0.69 GB/s 상시 호스트 쓰기**에 해당한다. **이 환산은 "같은 쓰기 대역폭이 작은 드라이브에 집중된다"는 가정에 의존하며, 원문이 그렇게 주장한 것은 아니다.**

### 4-B. 반증 — 읽기 편중·쓰기 억제

| ID | 반증 | 수치 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|
| X-01 | **CHEOPS'25**: DeepSpeed·FlexGen KV 오프로드 블록 계층 트레이스 — **읽기 평균 2.0 GiB/s vs 쓰기 11 MiB/s**, 128KiB 요청 지배. WAF·내구성은 미보고 | 읽기:쓰기 ≈ 186:1 (⚠️ 파생: 2,048÷11) | 2025 | ACM CHEOPS'25 https://atlarge-research.com/pdfs/2025-cheops-llm.pdf ; 레포 ladder F49·v6 W32 | ✅(레포 기확인) |
| X-02 | **Samsung 기술 블로그**: "KV 캐시 오프로딩 워크로드는 **주로 읽기 집약적**이며 동시성 하에서 **버스티**" — CMX(Vera Rubin)와 PM1753 채택 서술 | 정성 | **2026-08-25** | Samsung https://semiconductor.samsung.com/news-events/tech-blog/scaling-ai-inference-with-kv-cache-offloading-why-storage-is-becoming-a-key-enabler-for-next-generation-ai-systems/ | 🟡 |
| X-03 | Samsung PM1753 특성화로 인용된 **LMCache-on-NVMe 프로필: 읽기 ~92% / 쓰기 ~8%**, 프로세스당 ~78% 순차, ~33MB KV 블록 파일 | 92/8 | 2026-07 (Medium 인용) | Medium(Chier Hu) https://chierhu.medium.com/kv-cache-architecture-and-local-i-o-assessment-for-multi-hour-agentic-workflows-f26d25346bb0 ; Samsung 백서 https://download.semiconductor.samsung.com/resources/white-paper/scaling_ai_inference_with_kv_cache_offloading.pdf (원문 미열람) | ⚠️ (2차 인용, 백서 원문 대조 못함) |
| X-04 | **NVIDIA Dynamo KVBM**: 환경변수 `DYN_KVBM_DISABLE_DISK_OFFLOAD_FILTER` — "**Disable disk offload filtering to remove SSD lifespan protection**", 기본값 `false`(= 필터 기본 활성) | — | 저장소 현행 | GitHub `lib/bindings/kvbm/README.md` https://github.com/ai-dynamo/dynamo | ✅ |
| X-05 | 동 문서: 디스크 오프로드 필터는 "**SSD 수명 연장을 위해**" 기본 활성, **빈도 ≥ 2 블록만** CPU→디스크 | 빈도 ≥ 2 | v0.9 문서 | docs.nvidia.com/dynamo https://docs.nvidia.com/dynamo/v-0-9-0/user-guides/kv-cache-offloading ; 레포 v7 W-07(PR #3532, 2025-10-10) | 🟡 |
| X-06 | 신규 `kvbm-engine`의 G2→G3(호스트→디스크) 필터 `PresenceAndLFUFilter`: **LFU 카운트 > 임계값만 오프로드, 기본 임계값 8** ("hot 블록만 오프로드") | 기본 8 | main 브랜치, 2026-09-28 열람 | GitHub `lib/kvbm-engine/src/offload/policy.rs` | ✅ |
| X-07 | **KVBM 자체는 Dynamo v1.5.0에서 deprecate(제거 목표 v1.6.0)**, 대체 경로는 "엔진 네이티브 KV 오프로딩" | — | 2026-09-18 | 레포 [qlc-v7-hbm-to-storage-shift-2026-09.md](qlc-v7-hbm-to-storage-shift-2026-09.md) W-20~W-22 | ✅(레포 기확인) |
| X-08 | **KV 캐시 전용으로 출시된 주류 제품은 1~3 DWPD**: Kioxia CM10(1/3), Solidigm D7-PS1030(3), FADU("3 DWPD 보증 + 펌웨어로 OP 구성 가능") | 1~3 DWPD | 2026-07~08 | H-16·H-17 ; FADU 블로그 https://blogs.fadu.io/cmx-ssd-for-ai-inference/ | 🟡 |
| X-09 | Solidigm·NVIDIA 서사(블로그 해설): AI 컨텍스트는 **휘발성(잃으면 재계산)** → "내구성·영속성보다 처리량·밀도에 최적화" | 정성 | 2026-08 | shashi.co https://www.shashi.co/2026/08/solidigm-and-nvidia-rebuild-storages.html | ⚠️ (개인 블로그 해설) |
| X-10 | **DeepSeek V4.1-Flash**: 이전 세대 대비 KV 캐시용 **HBM 1/4, SSD 용량 1/8**(자사 아키텍처 대비, KV 캐시 한정) | −87.5% (SSD 용량) | 2026-09-10 | Yahoo Finance/Insider Monkey https://finance.yahoo.com/technology/ai/articles/deepseek-cut-kv-cache-hbm-011603128.html | 🟡 (2차) |
| X-11 | 2025~2026 SLC AI SSD(Kioxia GP·SK hynix AI-N P·Kioxia 100M IOPS)의 **공개 동기는 IOPS·지연(512B 랜덤 읽기)** 이며 DWPD가 아니다. GP1만 50 DWPD를 병기 | — | 2025-09~2026-08 | H-04·H-05·H-12 | 🟡 |

### 4-C. ⭐ 판정 — "30 DWPD"를 KV 캐시 요구치로 명시한 공개 출처가 있는가

**없다.** 검색했으나 **KV 캐시(또는 컨텍스트 메모리·추론 오프로드)의 요구 내구성을 "30 DWPD"로 명시한 공개 출처는 확보하지 못했다.** 검색어: `KV cache SSD "30 DWPD"`, `"30 DWPD" AI inference SSD 2026`, `"30 drive writes per day" KV cache OR inference OR "context memory"`, `NVIDIA CMX context memory SSD requirements endurance DWPD`.

공개된 KV 관련 수치는 네 층으로 갈린다(서로 다른 기준):
1. **주류 KV 티어 제품 정격**: 1~3 DWPD (X-08)
2. **실측**: 3.2 DWPD/드라이브 (D-03, 12.8TB·RAID10)
3. **배치·압축 적용 "effective"/시스템 주장**: 7~10+ (ScaleFlux, 5년), **최대 24 (Huawei, 3년)** — **30에 가장 가까운 공개 수치는 Huawei 24 DWPD(시스템 수준)** (D-01·D-02)
4. **SLC/SCM 제품 정격(KV 포지셔닝 포함)**: 50(GP1)·60(X200Z/X202Z)·100(AI100E)·120(DapuStor X5) (§1)

**"30 DWPD" 자체는 과거 Optane/Z-SSD급 "write-intensive" 등급의 관용 구간**으로 쓰였다는 서술만 있다(mrvsan 블로그 https://www.mrvsan.com/tag/dwpd/ , ⚠️). **NVIDIA가 CMX/Storage-Next용 DWPD 요구치를 공표한 기록은 확보하지 못했다.**

---

## §5. NVMe·OCP가 이미 허용하는 구성 가능성 (출하 시 구성 단계)

### 5-A. NVMe Flexible Data Placement (TP4146)

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F-01 | **TP4146 Flexible Data Placement, 2022-11-30 비준.** Meta·Google이 각자 풀던 WAF·OP 문제에서 출발 | xNVMe FDP 튜토리얼 https://raw.githubusercontent.com/xnvme/xnvme/main/docs/tutorial/fdp/index.rst ; Samsung 기술블로그 https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/ | ✅(일자) / 🟡(배경) |
| F-02 | **구성의 노출 방식**: Get Log Page **FDP Configurations (LID 20h)** — 엔듀런스 그룹 범위(LSI 필드에 Endurance Group ID). 동반 로그: **RUH Usage (21h), FDP Statistics (22h), FDP Events (23h)** | libnvme `types.h` (`NVME_LOG_LID_FDP_CONFIGS = 0x20` 등) ; xNVMe 튜토리얼 | ✅ |
| F-03 | **한 구성(FDP Configuration Descriptor)에 고정되는 파라미터**: `fdpa`(RGIF = Reclaim Group Identifier Format, FDPVWC = FDP Volatile Write Cache, Valid) · `vss` · **`nrg`(Reclaim Group 수)** · **`nruh`(RUH 수, 16비트)** · `maxpids` · **`nnss`(지원 네임스페이스 수)** · **`runs`(Reclaim Unit Nominal Size, 바이트)** · **`erutl`(Estimated RU Time Limit)** · RUH 디스크립터 배열(**RUH별 `ruht`: 1 = Initially Isolated, 2 = Persistently Isolated**) | libnvme `struct nvme_fdp_config_desc`, `enum nvme_fdp_ruh_type` | ✅ |
| F-04 | 예시 출력(xNVMe 문서): nrg 1, nruh 8, maxpids 127, nns 256, **runs 100,663,296 B(=96 MiB)**, 8개 RUH 모두 ruht=1(Initially Isolated) | xNVMe `100_xnvme_log_fdp_config.out` | ✅ (예시 장치값, 실제 제품값 아님) |
| F-05 | **Initially vs Persistently Isolated**: Initially = 호스트 기입 시점에만 분리 보장, 이후 GC가 타 RUH 데이터와 섞을 수 있음 / Persistently = 데이터 수명 내내 분리 보장 | StorageNewsletter 2025-02-05(Samsung 블로그 전재) https://www.storagenewsletter.com/2025/02/05/nvme-fdp-a-promising-new-ssd-data-placement-approach/ | 🟡 |
| F-06 | **구성 선택·활성화**: Set Features **FID 1Dh "Flexible Data Placement"** — 엔듀런스 그룹 범위, **FDPE(활성) + FDPCIDX(구성 인덱스)**. nvme-cli `nvme fdp <dev> -e <endgid> -c <idx> | -d` | libnvme `NVME_FEAT_FID_FDP = 0x1d` ; xNVMe get-feature 출력 `{fdpe: 1, fdpci: 0}` ; nvme-cli `Documentation/nvme-fdp-feature.txt` | ✅ |
| F-07 | ⭐ **변경 시점 제약**: xNVMe 문서 — "Set Feature로 FDP를 enable/disable할 수 없다. **그 엔듀런스 그룹의 모든 네임스페이스 삭제가 필요**하기 때문". QEMU 구현 주석 — "**spec: abort with cmd seq err if there's one or more NS' in endgrp**" (Set Features FDP → Command Sequence Error). nvme-cli — "Device may refuse the change if there is a namespace." DapuStor 가이드 — "활성화 전 모든 네임스페이스 삭제 권장, 이후 생성 네임스페이스가 FDP 속성 상속" | xNVMe 튜토리얼 ✅ ; QEMU `hw/nvme/ctrl.c` ✅ ; nvme-cli 문서 ✅ ; DapuStor https://en.dapustor.com/news/142 🟡 | ✅ |
| F-08 | ⇒ **⚠️ 파생 판정: FDP 구성(RG 수·RUH 수·RU 크기·RUH 유형)의 선택·변경은 사실상 프로비저닝 시점 전용이다.** 변경 = 해당 엔듀런스 그룹의 네임스페이스 전부 삭제 = 데이터 소거 또는 사전 이관. 또한 **호스트는 벤더가 로그 페이지에 미리 나열한 구성 중에서 고를 뿐 파라미터를 직접 지정할 수 없다**(F-03 구조체에 "쓰기" 경로 없음; DapuStor: "pre-validated 구성 프로파일 선택") | F-02·F-03·F-06·F-07 | ✅ **파생** |
| F-09 | **네임스페이스 생성 시 Placement Handle 목록 지정**: nvme-cli `ns create`의 `--nphndls`, `--phndls`(placement-handle-list) → 네임스페이스 범위 PH가 엔듀런스 그룹 범위 RUH에 매핑 | nvme-cli `Documentation/nvme-create-ns.txt` ; xNVMe 튜토리얼 | ✅ |
| F-10 | OCP DC NVMe SSD 규격 **v2.6(2024-09-25)에 "FDP Die Placement Configuration" 절이 존재**(목차 수준 확인). 레포 v6 B10은 "디바이스 전체를 단일 엔듀런스 그룹으로 운용" 요구를 기록. **FDP 요구 조항 원문(예: RUH 수 16+16)은 열람하지 못했다** | OCP v2.6 https://ocpstagingweb2.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-6-2-pdf ; 레포 [qlc-v6-fdp-placement-handles-2026-09.md](qlc-v6-fdp-placement-handles-2026-09.md) V-02 | ⚠️ (원문 미열람) |

### 5-B. NVMe 2.0 Capacity Management (엔듀런스 그룹 관리)

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F-20 | **Capacity Management 관리 명령(opcode 20h)**: 동작 = 구성 선택(Select Capacity Configuration) / 엔듀런스 그룹 생성·삭제 / NVM Set 생성·삭제. 생성 시 용량(바이트, CDW11/CDW12) 지정, 성공 시 CQE DW0에 생성된 ID | libnvme `nvme_admin_capacity_mgmt = 0x20`, `struct nvme_capacity_mgmt_args` ✅ ; nvme-cli `nvme-capacity-mgmt.txt` ✅ | ✅ |
| F-21 | **관련 로그**: Media Unit Status (LID 10h), Supported Capacity Configuration List (LID 11h). 디스크립터 필드: **Capacity Adjustment Factor**, Total/Spare Endurance Group Capacity, **Endurance Estimate**, 미디어 유닛별 Available Spare·Percentage Used·채널 | libnvme `struct nvme_media_unit_stat_desc`, `nvme_end_grp_config_desc`, `nvme_capacity_config_desc` | ✅ (필드 존재) |
| F-22 | **두 방식**: Fixed Capacity Management = 벤더가 정한 완성 구성 집합에서 선택 / Variable Capacity Management = 도메인에서 용량을 끌어와 엔듀런스 그룹·NVM Set 생성. 목적 서술: "균일 공간이 필요한 고객, 성능 격리 영역이 필요한 고객, **소량의 저지연 영역 + 대량의 고지연 영역**이 필요한 고객을 **단일 SSD 타입**으로 구성" | SNIA SDC 2019 Carlson(Toshiba Memory)·Suhler(Micron) https://www.snia.org/sites/default/files/SDC/2019/presentations/NVMe/Carlson_Mark_Suhler_Paul_Managing_Capacity_in_NVM_Express_SSDs.pdf ; SNIA 교육 라이브러리 요약 | 🟡 (슬라이드 원문 미열람) |
| F-23 | NVM Set 삭제 = 그 NVM Set과 **모든 네임스페이스 삭제** | nvme-cli 매뉴얼 계열 검색 요약 | 🟡 |
| F-24 | **Capacity Adjustment Factor의 정의 원문은 확보하지 못했다.** 필드명상 미디어 유닛의 운용 모드에 따른 용량 조정을 표현하는 것으로 보이나 **SLC/TLC 모드 전환과의 관계는 미확인** | — | ⚠️ |
| F-25 | ⭐ **출하 제품의 Capacity Management 지원: 확보하지 못했다.** 벤더 데이터시트·보도자료에서 지원 표기를 찾지 못했고, 참조 에뮬레이터인 **QEMU NVMe도 미구현**(OACS에 NMS·FORMAT·DIRECTIVES·SECURITY·DBCS·VMS만, capacity mgmt 코드 없음). 검색어: `"Variable Capacity Management" NVMe SSD supports product datasheet`, `"Endurance Group Management" NVMe SSD supported product`, `NVMe 2.0 "Capacity Management" ... supported product` | QEMU `hw/nvme/ctrl.c` ✅(부재) ; 검색 | ⚠️ **부정 확인** |

### 5-C. 네임스페이스 관리 = 표준 경로의 사용자 구성 OP

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F-30 | **NVMe Namespace Management의 Select는 Create(0)·Delete(1) 두 가지뿐** — 표준에 네임스페이스 크기 변경(resize) 동작 없음 | libnvme `enum nvme_ns_mgmt_sel` | ✅ |
| F-31 | 네임스페이스에 할당되지 않은 용량은 SSD OP 풀로 간다 → **작은 네임스페이스 = 더 많은 OP = 랜덤 쓰기 성능·내구성 향상.** Kioxia: CM7-R 3.84TB(1 DWPD)를 **1.6TB 네임스페이스로 구성해 "10 DWPD 드라이브 모사"**, 70/30 랜덤에서 3배 IOPS | Kioxia 성능 브리프 https://americas.kioxia.com/en-us/business/resources/performance-brief/cm7-namespace1-performance-brief.html ; Kioxia 블로그 2025-02-03 https://blog-us.kioxia.com/post/2025/02/03/want-to-easily-get-more-performance-from-your-nvme-ssd-use-nvme-namespaces | 🟡 |
| F-32 | ⚠️ **"모사(emulating)"는 성능 표현이지 보증 변경이 아니다.** Micron Flex Capacity: "**TBW는 고정값이며 Flex Capacity 설정이 TBW를 바꾸지 않는다. 설정에 따라 DWPD가 바뀐다**" → 3.84TB→1.6TB 축소 시 TBW 고정이면 보증 DWPD는 1 × 3.84 ÷ 1.6 = **2.4 DWPD**(⚠️ 파생)이지 10이 아니다 | Micron Flex Capacity 기술 브리프 https://assets.micron.com/adobe/assets/urn:aaid:aem:700e7d8a-0d52-40f2-a739-f4fd290f3976/renditions/original/as/ssd-flex-capacity-feature-tech-brief.pdf | 🟡 (Micron) / ⚠️ 파생 |
| F-33 | 한계: 네임스페이스 크기 변경 = **삭제 후 재생성**(데이터 소실). "You can't shrink or grow a namespace" | Drew Thorstensen 블로그 https://www.drewthorst.com/posts/nvme/namespaces/readme/ ; F-30 | ✅(F-30) / 🟡 |

### 5-D. 배포 시점에 SLC 비율·OP·내구성 점을 고르게 하는 벤더 기능 (출하 vs 발표 구분)

| ID | 기능 | 무엇을 고르나 | 상태 | 출처 | 등급 |
|---|---|---|---|---|---|
| F-40 | **Micron Flex Capacity** (Storage Executive, 5100 계열부터) | 사용자 용량(→OP·DWPD). **TBW 고정** | **출하**(지원 드라이브 한정) | F-32 ; Micron Storage Executive 가이드 https://assets.micron.com/adobe/assets/urn:aaid:aem:69c6d473-cde6-400f-b740-859700365648/renditions/original/as/storageexecutive-user-guide-en.pdf | 🟡 |
| F-41 | **Samsung DC Toolkit** | OP 조정(기본 OP 6.7%) | **출하**(대상 모델 목록 한정) | Samsung DC Toolkit https://www.samsungdctoolkit.com/ ; Samsung OP 백서 https://download.semiconductor.samsung.com/resources/white-paper/S190311-SAMSUNG-Memory-Over-Provisioning-White-paper.pdf | 🟡 |
| F-42 | **WDC 벤더 전용 namespace-resize** | OP 옵션 **7% / 28% / 50%** 또는 원 구성 | **출하**(nvme-cli 플러그인, "WDC 지원 장치에서만") | nvme-cli `Documentation/nvme-wdc-namespace-resize.txt` | ✅ |
| F-43 | **DapuStor J5060 dual-mode** | **QLC 드라이브 일부를 pSLC 영역으로 — 400GB / 800GB / 1.2TB 선택**, 영역은 **별도 블록 디바이스**로 노출, "운영자가 크기 결정". 펌웨어 3요소: 다이 수준 격리, SLC 예비 할당 재설계(WA 절감), 영역 인지 I/O 스케줄링. 드라이브 전체 0.5 DWPD/5년, pSLC 영역 별도 DWPD·TBW 미공개. **배포 후 재조정 가능 여부는 미확인** | **발표(FMS 2026) / 2026-09 상세 공개** — 출하 여부 미확인 | P-08 ; Hardware Busters https://hwbusters.com/news/the-dapustor-j5060-splits-one-qlc-drive-into-two-ssds-and-4tb-of-capacity-buys-800gb-of-pslc/ | 🟡 |
| F-44 | **Phison aiDAPTIV+ 하이브리드 SSD** | 한 드라이브를 **TLC 네임스페이스 + SLC 캐시 네임스페이스**로 분할 | **데모(CES 2026, M.2 2242)** | D-05 | 🟡 |
| F-45 | **Kioxia Software-Enabled Flash (SEF)** | 호스트가 가상 디바이스별 **pSLC 슈퍼블록 수 지정**(`SEFSetNumberOfPSLCSuperBlocks`), QoS 도메인 생성 시 **pSLC 용량(required/reserved/max) 쿼터** 지정, 결함 관리 방식(Packed/Fragmented/Perfect) 선택, 호스트 지정 웨어레벨링(`SEFGetReuseList`) | **SDK·API 공개, 하드웨어는 개발자 샘플(2023-10)** — 출하 양산 제품 확보 못함. 2022 Linux Foundation 이관 | SEF API 헤더 v1.14i https://raw.githubusercontent.com/SoftwareEnabledFlash/SEF-API/main/SEFAPI.h ✅ ; Linux Foundation https://www.linuxfoundation.org/press/software-enabled-flash-support-announced-for-new-hardware-samples 🟡 | ✅(API) / 🟡(상태) |
| F-46 | **NVMe 2.3 Configurable Device Personality (CDP)** | "호스트가 NVM 서브시스템 구성을 **안전하게 변경**하는 메커니즘, 디바이스 공급자의 **재고 관리 완화**" + 퍼스낼리티 **freeze**(인증 지원 시에만 unfreeze) | **규격 공표(2025-08-05)** — 지원 제품 확보 못함, 규격 원문 미열람, libnvme·Linux `nvme.h`에 미반영(2026-09-28 기준) | NVM Express https://nvmexpress.org/nvm-express-publishes-set-of-nvme-specifications-enabling-new-capabilities-for-ai-cloud-enterprise-and-client-storage/ ; TechSpot https://www.techspot.com/news/108961-nvm-express-23-deliver-enhanced-management-security-pcie.html | 🟡 / ⚠️(세부) |
| F-47 | FADU (CMX용) | "3 DWPD 보증 + **펌웨어 최적화로 OP 구성 가능**" | 블로그 서술 | X-08 | 🟡 |

---

## §6. 런타임 조정 가능 항목과 동적 변경의 장벽

### 6-A. 런타임(데이터 보존 상태)에서 이미 조정 가능한 것

| ID | 항목 | 무엇을 바꾸나 | 출처 | 등급 |
|---|---|---|---|---|
| R-01 | **FDP 기입별 배치** | 각 Write의 Data Placement Directive DSPEC에 **PID = ⟨Reclaim Group, Placement Handle⟩** — 호스트가 매 I/O마다 선택 | xNVMe 튜토리얼 ; 레포 v6 S-06·S-08 | ✅ |
| R-02 | **RUH Update** (I/O Management Send) | 지정 PID가 **새 Reclaim Unit**을 가리키도록 갱신 | nvme-cli `nvme-fdp-update.txt` ; xNVMe | ✅ |
| R-03 | **FDP Events 설정** (Set Features FID **1Eh**, 네임스페이스·PH별) | 이벤트 종류: RU Not Fully Written, RU Time Limit Exceeded, Controller Level Reset Modified RUHs, Invalid PID(호스트 이벤트) / **Media Reallocated**, Implicitly Modified RUH(컨트롤러 이벤트) | libnvme `enum nvme_fdp_event_type` ; QEMU `nvme_set_feature_fdp_events` | ✅ |
| R-04 | **텔레메트리 — WAF 실시간 산출** | FDP Statistics: **HBMW(호스트 기입)·MBMW(미디어 기입)·MBE(미디어 소거)** → WAF = MBMW ÷ HBMW(⚠️ 파생 정의). RUH Status: **RUAMW(RU 잔여 미디어 기입량), EARUTR** | libnvme `struct nvme_fdp_stats_log`, `nvme_fdp_ruh_status_desc` | ✅ |
| R-05 | **엔듀런스 그룹 텔레메트리** | Endurance Group Information(LID 09h): Percentage Used, **Endurance Estimate**, Data Units Written, **Media Units Written**, Total/Unallocated EG Capacity. (OCP v2.5가 09h 지원 요구 — 레포 v6 B09) | libnvme `struct nvme_endurance_group_log` ✅ ; 레포 v6 B09 | ✅ |
| R-06 | **Predictable Latency Mode** (NVMe 1.4) | Set Features **13h(PLM Config)·14h(PLM Window)** — NVM Set별 결정적 창(DTWIN)/비결정적 창(NDWIN) 전환. GC·웨어레벨링 등 백그라운드 작업을 NDWIN으로 미룸. DTWIN 읽기/쓰기/시간 추정·경고 이벤트 | libnvme `NVME_FEAT_FID_PLM_CONFIG = 0x13`, `PLM_WINDOW = 0x14`, DTWIN 필드 ✅ ; PLMlight(IIT Kanpur 2021) https://www.cse.iitk.ac.in/users/amitangshu/nca_2021.pdf 🟡 | ✅ / 🟡 |
| R-07 | 호스트 측 배치 경로 | **Linux 6.16: 블록 write stream + io_uring per-I/O write stream**(NVMe FDP 매핑). 단, **파일 기반 I/O 경로는 미지원**(2026-02 LSF/MM 주제로 논의) | Phoronix https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16 ; LWN https://lwn.net/Articles/1018642/ ; lore(Samsung·Meta 패치) https://lore.gnuweeb.org/io-uring/20250506121732.8211-4-joshi.k@samsung.com/t/ | 🟡 |
| R-08 | 호스트 측 배치 정책 | CacheLib: RUH 2개만으로 **WAF 3.22 → 1.03**(FDP, KV 캐시 트레이스). 매핑은 호스트 소프트웨어 설정 | 레포 [qlc-v7-placement-cases-waf-2026-09.md](qlc-v7-placement-cases-waf-2026-09.md) A-02 ; EuroSys'25 https://arxiv.org/abs/2503.11665 | ✅(레포) |
| R-09 | KV 관리자 측 쓰기 억제 정책 | Dynamo: 디스크 오프로드 필터 on/off, 우선순위 기반 필터(`DYN_KVBM_HOST_OFFLOAD_PREFIX_MIN_PRIORITY`, PR #5563), LFU 임계값(기본 8) | X-04·X-06 ; Dynamo v1.0.0 릴리스노트(GitHub) | ✅ |
| R-10 | SEF | QoS 도메인별 pSLC 쿼터 사용량 조회·할당(`pSLCFlashQuota/Usage`), 가상 디바이스 평균·최대 P/E(`averagePEcount`, `maxPEcount`) 조회 | SEF API ✅ | ✅ |

**R-11 부정 확인 — 호스트의 GC 직접 제어.** "FDP는 GC를 SSD 컨트롤러에 남겨 두며 **호스트는 GC 과정을 제어할 수 없다**(로그를 통한 피드백만)" — EuroSys'25 논문 서술(검색 요약, 🟡). **OCP DC NVMe SSD 규격의 "idle time GC" 호스트 제어 기능은 확보하지 못했다**(§7 G-09). NVMe에서 GC 시점에 영향을 주는 표준 수단으로 확인된 것은 **PLM(R-06)** 뿐이며, **PLM 지원을 표기한 출하 제품은 확보하지 못했다**(PLM을 "선택(Optional)"으로 표기한 것은 OCP **NVMe HDD** 규격 표에 대한 검색 요약뿐이며, OCP DC NVMe **SSD** 규격의 PLM 요구 수준은 원문 미확인, ⚠️).

### 6-B. 동적(런타임) 용량·내구성 변경의 장벽 — 공개 근거

| ID | 장벽 | 근거 | 등급 |
|---|---|---|---|
| B-01 | **표준 네임스페이스 resize 부재** — Select는 Create/Delete뿐. 크기 변경 = 삭제·재생성 = 데이터 소실. 예외는 벤더 전용 명령(WDC) | F-30·F-33·F-42 | ✅ |
| B-02 | **FDP 구성 변경 = 엔듀런스 그룹 내 네임스페이스 0개 요구** — RG·RUH·RU 크기·RUH 유형은 런타임 불변 | F-07·F-08 | ✅ |
| B-03 | **pSLC 비율의 런타임 변경 불가(SEF)** — "가상 디바이스에서 슈퍼블록이 할당된 후에는 pSLC 슈퍼블록 수를 **변경하지 못할 수 있으며** 호출은 **-ENOSPC로 실패**". 또한 값은 "가상 디바이스 다이 수 ÷ 슈퍼블록당 다이 수"의 배수여야 함 | SEFAPI.h `SEFSetNumberOfPSLCSuperBlocks` 주석 | ✅ |
| B-04 | **엔듀런스 그룹 재구성 = 콘텐츠 삭제** — Capacity Management의 삭제 동작은 그룹/세트와 소속 네임스페이스를 함께 삭제. 게다가 출하 지원 제품이 확인되지 않음 | F-23·F-25 | 🟡 / ⚠️ |
| B-05 | **모드 전환의 마모 비용** — 동적 블록을 TLC 모드로 한 번이라도 쓰면 그 블록의 총 P/E 한도가 SLC 전용 블록보다 줄어든다(예시 SLC 100,000 vs TLC 8,000). SLC 캐시를 TLC로 되돌려 용량을 회수할 때 **데이터를 두 번 쓰게 되어 추가 마모** | Micron 계열 특허 USPTO 11556479 / 12182027 ; Micron US8667215B2(동적 SLC/MLC 블록 할당) https://patents.google.com/patent/US8667215B2/en ; Sabrent https://sabrent.com/blogs/storage/slc-caching | 🟡 |
| B-06 | **모드 전환의 데이터 이관·WA** — SLC 캐시를 비우려면 유휴 시 블록 회수가 필요하고, 빠르게 차면 성능 절벽, 이관 시 **상당한 WA**. IPS 논문은 SLC 페이지를 TLC로 **제자리 재프로그램**해 이관을 줄이는 방법을 제안(=이관이 기본 비용임을 전제) | arXiv 2409.14360 (NAS'24) https://arxiv.org/abs/2409.14360 | 🟡 |
| B-07 | **보증(TBW) 회계** — Micron: 용량을 바꿔도 **TBW 고정, DWPD만 변동**. NVMe의 Percentage Used는 "벤더 고유 추정치". → 모드·용량이 런타임에 바뀌면 **보증 기준(TBW)과 실제 소모(Percentage Used·Media Units Written)의 대응 규칙을 새로 정해야 함**(⚠️ 추론) | F-32 ; libnvme 엔듀런스 로그 필드(R-05) ; 레포 v8 E-01(DWPD의 워크로드 의존) | 🟡 / ⚠️ |
| B-08 | **용량 가변(capacity variance) 연구의 전제** — CVSS(FAST'24): 노화에 따라 SSD가 **노출 용량을 점진 축소**하려면 ① WA를 줄이는 CV-SSD, ② **탄력적 논리 파티션을 지원하는 CV-FS(로그 구조 FS)**, ③ **사용자 수준 CV-manager**가 함께 필요. 효과: 실 워크로드에서 최대 **2.94배** 더 많은 쓰기. HotStorage'22 "Wear Leveling in SSDs Considered Harmful" | USENIX FAST'24 https://www.usenix.org/conference/fast24/presentation/jiao ; HotStorage'22 https://dl.acm.org/doi/10.1145/3538643.3539750 | 🟡 |
| B-09 | **구성 변경의 보안·인증 게이트** — NVMe 2.3 CDP는 퍼스낼리티 freeze 후 **인증이 있어야만 unfreeze** | F-46 | 🟡 |
| B-10 | **다이 격리 없이는 모드 혼재 간섭** — DapuStor는 QLC와 pSLC를 한 드라이브에 두기 위해 **다이 수준 격리**와 영역 인지 스케줄링이 필요했다고 설명 | F-43 | 🟡 |

**B-11 ⚠️ 파생 판정.** 공개 자료가 보여 주는 구도: **배치(어디에 쓰나)는 이미 런타임 조정 가능**(R-01~R-04, R-07~R-09), **GC 시점은 PLM이라는 표준 수단이 있으나 출하 지원 미확인**(R-06·R-11), **용량·OP·SLC 비율·FDP 구조는 표준과 SEF 모두에서 "빈 상태에서만" 바꿀 수 있다**(B-01~B-04). 런타임 모드 전환에는 **이관 WA·추가 마모·보증 회계 재정의**가 따른다(B-05~B-07).

---

## §7. 공개 자료의 공백 (부정 확인)

각 항목은 **검색했으나 확보하지 못한 것**이며 검색어를 남긴다.

- **G-01. KV 캐시 요구 내구성을 "30 DWPD"로 명시한 출처.** 없음(§4-C). 검색어: `KV cache SSD "30 DWPD"`, `"30 DWPD" AI inference SSD 2026`, `"30 drive writes per day" KV cache OR inference OR "context memory"`.
- **G-02. NVIDIA의 CMX/Storage-Next용 SSD DWPD 요구치.** 없음. 검색어: `NVIDIA CMX context memory SSD requirements endurance DWPD`, `NVIDIA Inference Context Memory Storage BlueField-4 KV cache SSD requirement endurance DWPD 2026`.
- **G-03. 2026년 SLC AI SSD(GP1·AI-N P·DapuStor X5·X202Z)의 용량과 DWPD 워크로드 기준.** 미공개. 검색어: `"GP1" Kioxia XL-FLASH capacity DWPD`, `SK hynix AI-N P ... endurance DWPD`, `Phison X202Z ... capacity`.
- **G-04. QLC 다이 pSLC 모드의 벤더 정격 절대 P/E.** 없음(상대값 ">25배"만, P-08). 검색어: `QLC NAND pSLC mode P/E cycle endurance number`, `"QLC" "pSLC" endurance "P/E" cycles industrial`.
- **G-05. Kioxia XL-FLASH·FL6의 P/E와 DWPD 워크로드 기준.** 검색어: `Kioxia XL-FLASH P/E cycles endurance`, `Kioxia FL6 datasheet "60 DWPD" workload basis`.
- **G-06. 같은 시점·같은 채널의 SLC급 vs TLC/QLC $/GB, 그리고 "SLC = TLC의 n배 비용"을 진술한 권위 출처.** 검색어: `SLC SSD cost per GB vs TLC enterprise`, `"SLC" NAND cost per bit "3x" TLC`. Kioxia FL6·Phison X200Z 가격도 확보 못함.
- **G-07. NVMe Capacity Management를 지원하는 출하 제품.** 없음(F-25).
- **G-08. Capacity Adjustment Factor의 규격 정의와 SLC/TLC 모드 표현 여부.** 검색어: `NVMe "Capacity Adjustment Factor" media unit ... meaning`.
- **G-09. OCP DC NVMe SSD 규격의 GC 호스트 제어("idle time GC")·FDP 구성 요구 조항 원문.** opencompute.org 차단. 검색어: `OCP Datacenter NVMe SSD specification "garbage collection" idle OR background host control`, `OCP ... FDP requirement "Reclaim Unit Handles"`.
- **G-10. PLM(Predictable Latency Mode) 지원을 표기한 출하 SSD.** 검색어: `SSD datasheet "Predictable Latency Mode" supported enterprise NVMe product`.
- **G-11. NVMe 2.3 CDP의 세부(무엇을 바꿀 수 있나 — 용량·내구성 포함 여부).** 규격 PDF 차단, libnvme 미반영.
- **G-12. DapuStor J5060 pSLC 영역의 배포 후 재조정 가능 여부·영역별 DWPD.** 검색어: `DapuStor J5060 dual-mode pSLC region configured factory or by user ... reconfigure`.
- **G-13. Phison X200Z·AI100E의 물리 NAND 용량과 DWPD 기준(순차/랜덤).** §2 P-30의 정합 문제를 풀 자료 없음.
- **G-14. Micron XTR 보증기간.** 검색어: `Micron XTR ... warranty`.

---

## §8. 보고서에 쓸 수 있는 문장 (그대로 복사 가능)

> **권장 — 🟡(1차 출처·검색 요약 경유), 제품 지형**
>
> **"현재 정격 30 DWPD 이상으로 출하된 SSD는 240GB~3.2TB 구간에 몰려 있고(최빈 800GB·1.6TB), 최대는 Phison X200Z의 6.4TB다."**
> — 근거: Samsung SZ985 240GB/30 DWPD(2018), Kioxia FL6 3.2TB/60 DWPD(2021-09), Intel P5800X 3.2TB/100 DWPD(Q4'20), Phison X200Z 브로셔(2025-11, 최대 6.4TB·60 DWPD). §1 H-03·H-06·H-09·H-15, 1-D.

> **권장 — 🟡, 2TB 설계점의 선례**
>
> **"2TB 인근에서 30 DWPD를 넘는 공개 선례는 Micron XTR 1.92TB(랜덤 35 DWPD, 2023)와 Phison AI100E 2TB(pSLC, 100 DWPD)다."**
> — 근거: Micron IR 2023-05-16, aiDAPTIV README·Tom's Hardware 2026-01-14. §1 H-02·H-08.

> **권장 — 🟡, pSLC 내구성 (범위로만)**
>
> **"TLC 다이를 SLC 모드로 쓰면 공개 수치상 P/E가 약 3,000~5,000에서 30,000~100,000으로 오른다(세대·용도별 편차가 크다)."**
> — 근거: Virtium(2020-11, 30K), Innodisk(2023-02, 30K/100K), Swissbit(2023-06, 100K), Phison aiDAPTIV(2026-01, TLC 5K→pSLC 60K). §2 P-01~P-06.

> **조건부 — 🟡, QLC-pSLC는 상대값으로만**
>
> **"QLC 다이의 pSLC 영역은 QLC 대비 25배 이상의 P/E를 낸다고 DapuStor가 밝혔으나(2026-09), 벤더가 절대 P/E를 공표한 사례는 없다."**
> — §2 P-08·P-11, §7 G-04.

> **권장 — ✅, FDP 구성 시점**
>
> **"NVMe FDP의 구성(Reclaim Group 수·RUH 수·RU 크기·RUH 유형)은 SSD가 로그 페이지로 제시한 목록 중에서만 고를 수 있고, 바꾸려면 그 엔듀런스 그룹의 네임스페이스를 모두 지워야 한다. 사실상 프로비저닝 시점의 선택이다."**
> — 근거: libnvme FDP Configuration Descriptor, xNVMe FDP 튜토리얼, QEMU NVMe 구현("abort with cmd seq err if there's one or more NS' in endgrp"), nvme-cli 문서. §5 F-02~F-08. 등급 ✅(원문) + ✅ 파생.

> **권장 — ✅, 표준의 런타임 가능 범위**
>
> **"표준 NVMe에서 런타임에 바꿀 수 있는 것은 '어디에 쓰나'(기입별 Placement ID, RUH Update)와 텔레메트리(호스트·미디어 기입 바이트)이고, 용량·OP는 네임스페이스 삭제·재생성으로만 바뀐다. 표준에는 네임스페이스 크기 변경 명령이 없다."**
> — §5 F-30, §6 R-01~R-04, B-01.

> **권장 — ✅, SLC 비율의 런타임 변경 장벽 (Kioxia SEF API)**
>
> **"호스트가 pSLC 비율을 직접 정하는 Kioxia SEF API조차 '슈퍼블록이 할당된 뒤에는 pSLC 슈퍼블록 수를 바꾸지 못할 수 있다'고 명시한다."**
> — SEFAPI.h v1.14i. §6 B-03.

> **권장 — 🟡, NVMe Capacity Management**
>
> **"NVMe 2.0은 엔듀런스 그룹·NVM Set을 호스트가 생성·삭제하는 Capacity Management를 정의했지만, 이를 지원한다고 공표한 출하 제품은 확인되지 않는다."**
> — §5 F-20~F-25. 등급 ✅(명령 정의) + ⚠️(부정 확인).

> **권장 — 🟡, KV 캐시 내구성 수요의 실제 수치 (기준을 반드시 병기)**
>
> **"KV 캐시 티어의 공개 수치는 기준별로 갈린다: 주류 제품 정격 1~3 DWPD, 실측 약 3.2 DWPD(12.8TB·RAID10), 배치·압축 적용 effective 7~10+ DWPD(ScaleFlux), 시스템 수준 최대 24 DWPD(Huawei, 3년). '30 DWPD'를 KV 캐시 요구치로 명시한 공개 출처는 없다."**
> — §4 D-01~D-03, X-08, 4-C.

> **권장 — ✅/🟡, 반증 병기용 (덱에 반드시 같이)**
>
> **"KV 오프로드 I/O는 측정상 읽기 편중이다(CHEOPS'25: 읽기 2.0 GiB/s 대 쓰기 11 MiB/s). NVIDIA Dynamo는 SSD 수명 보호를 위해 디스크 오프로드 필터를 기본으로 켜 두었고, 새 엔진은 LFU 카운트 8 초과 블록만 디스크로 보낸다."**
> — §4 X-01·X-04·X-06.

> **조건부 — 🟡, 비용 (배수는 파생 표기로만)**
>
> **"SLC급 SSD의 공개 비용 비교는 Micron XTR의 'SCM 대비 20% 비용' 하나뿐이다. 2026년 8월 소매 리스팅(Solidigm D7-P5810, $2.8~3.3/GB)과 같은 달 VDURA TLC 지수($0.75/GB)를 나누면 약 3.7~4.4배지만, 채널과 용량이 달라 원가 배수로 쓸 수 없다."**
> — §3 C-01, C-04~C-06, C-09. 등급 🟡 + ⚠️ 파생.

> **❌ 쓰지 말 것**
> - "SLC는 TLC보다 10~15배 비싸다" → 출처 추적 불가(C-14)
> - "Kioxia CM7-R을 1.6TB로 줄이면 10 DWPD 드라이브가 된다" → 성능 '모사' 표현이며 보증 TBW는 그대로(F-32)
> - "Phison AI100E의 60K P/E·2TB 원시 TLC로 100 DWPD가 나온다" → 5년·WAF 1에서도 68.5 DWPD, 수치끼리 맞지 않음(P-30)
> - "D7-P5810은 네이티브 SLC다" / "pSLC다" 중 하나로 단정 → 출처 충돌(H-20)
> - "NVIDIA가 KV 캐시에 30 DWPD를 요구한다" → 근거 없음(G-01·G-02)
> - "FDP 구성은 런타임에 바꿀 수 있다" → 네임스페이스 전부 삭제가 전제(F-07)

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| xNVMe FDP 튜토리얼 | https://raw.githubusercontent.com/xnvme/xnvme/main/docs/tutorial/fdp/index.rst (+ `100_xnvme_log_fdp_config.out`, `010_xnvme_feature_get.out`) | TP4146 2022-11-30 비준, 로그 4종, FDP enable은 네임스페이스 전부 삭제 필요, 예시 구성값 |
| QEMU NVMe 컨트롤러 | https://raw.githubusercontent.com/qemu/qemu/master/hw/nvme/ctrl.c | Set Features FDP → `NVME_CMD_SEQ_ERROR`("spec: abort with cmd seq err if there's one or more NS' in endgrp"), Capacity Management 미구현 |
| libnvme `types.h` | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h | FDP 구성 디스크립터·RUH 유형·이벤트·통계, LID·FID 번호, Capacity Mgmt opcode 20h, Media Unit·EG 구성 디스크립터, NS Mgmt Select(Create/Delete만), 엔듀런스 그룹 로그, PLM FID 13h/14h |
| nvme-cli 문서 | https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/Documentation/ (`nvme-fdp-feature.txt`, `nvme-capacity-mgmt.txt`, `nvme-fdp-update.txt`, `nvme-create-ns.txt`, `nvme-wdc-namespace-resize.txt`) | FDP 변경은 네임스페이스 존재 시 거부 가능, capacity-mgmt 인자, RUH Update, PH 목록, WDC OP 7/28/50% |
| SEF API | https://raw.githubusercontent.com/SoftwareEnabledFlash/SEF-API/main/SEFAPI.h (v1.14i) | pSLC 슈퍼블록 수 설정·변경 제약(-ENOSPC), QoS 도메인 pSLC 쿼터, P/E 통계, 결함 관리 방식 |
| NVIDIA Dynamo | https://github.com/ai-dynamo/dynamo (`lib/bindings/kvbm/README.md`, `lib/kvbm-engine/src/offload/policy.rs`) | 디스크 오프로드 필터 = SSD 수명 보호, 기본 활성; LFU 임계값 기본 8 |
| Phison aiDAPTIV | https://raw.githubusercontent.com/aiDAPTIV-Phison/aiDAPTIV/main/README.md | AI100E(PCIe 4.0, U.2/M.2)·AI200E(PCIe 5.0), 권장 용량 320GB/1TB/2TB/4TB, KV 오프로드는 aiDAPTIVLink 3 |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| v6 A16: "Phison X200Z (SLC, SK hynix V7 176L), 2024-05-15" | **NAND 유형(SLC vs pSLC)과 발표 시점(2024-05 vs 2025-05) 모두 충돌로 재기록**(H-22·H-23). 최신 브로셔 최대 6.4TB 추가 |
| v6 A11: "Kioxia FL6 60 DWPD, 800GB~3.2TB, 2021~2022" | 발표 **2021-09-13**으로 정밀화. 후속은 GP Series(2026-03)·GP1(2026-08, 최대 50 DWPD)(H-03·H-04) |
| v8 N-01: "D7-P5810은 SLC, 50/65 DWPD, 73 PBW" | 유지 + **NAND 유형 충돌(H-20)**, 1.6TB 리스팅 TBW 149,504(=146×1,024) 검산, 2026년 가격 스냅샷 추가 |
| v8 P-12: ScaleFlux 7~10+ effective DWPD | 유지. Huawei 24 DWPD(시스템, 3년)·StorageReview 실측 3.2 DWPD를 같은 축에 추가(§4) |
| ladder F4: "SLC 30K~100K, TLC 800~3,000, QLC 100~1,000" | **pSLC-on-TLC 30K~100K를 연도·벤더별로 분리**, QLC-pSLC는 상대값(>25×)만 있음을 명시(§2) |
| v6 V-02: "OCP FDP 16+16 RUH 원문 미확인" | **여전히 미확인**(opencompute.org 차단 지속, §7 G-09) |
