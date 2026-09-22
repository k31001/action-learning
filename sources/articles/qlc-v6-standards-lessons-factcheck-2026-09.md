# 다운턴 교훈 팩트체크(규격 참여·선행 신호)와 2026년 참여 대상 규격 팩트 원장

**수집일**: 2026-09-22
**유형**: 웹 검색 기반 2차 자료 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v6.0 개정 — 위키 반영 근거

---

type: research-ledger
agent: Research Agent (R6)
collected: 2026-09-22
scope: 덱의 "규격 정의 참여자가 선점했다" 주장 팩트체크 (CLAIM 1/2/3) + TASK D 표준 참여 리스트
method: WebSearch 결과 요약 + GitHub 커밋/PR 1차 확인. WebFetch는 프록시 정책으로 github.com 외 대부분 차단됨(아래 "수집 한계" 참조)
---

# R6 — 표준·규격 "선점" 주장 팩트 원장

> 등급: ✅ 1차(규격 문서·기업 공식 발표·git 커밋) / 🟡 신뢰할 만한 2차(업계 매체·애널리스트) / ⚠️ 미검증·추론

## 수집 한계 (반드시 읽을 것)
- 이 세션의 egress 프록시가 `nvmexpress.org`, `opencompute.org`, `jedec.org`, `blocksandfiles.com`, `storagereview.com`, `servethehome.com`, `tomshardware.com`, `en.wikipedia.org`, `arxiv.org`, `usenix.org`, `semiconductor.samsung.com` 등 **거의 모든 도메인의 직접 fetch를 차단**. 유일하게 `github.com`만 접근 가능.
- 따라서 **규격 PDF의 Contributors/Authors 명단을 원문에서 직접 눈으로 확인하지 못함**. 해당 항목은 검색 결과가 인용한 내용에 근거하므로 🟡로 강등했다. 원문 확인이 필요한 항목은 아래 `[원문확인필요]`로 표시.
- WebSearch 호출 예산(200회)이 소진되어 TASK D 일부 항목(SNIA CS API·SDXI, MLPerf Storage, UALink/UEC, PCIe Gen6/7, GPUDirect Storage/DOCA 버전)은 **이번 세션에서 날짜를 확정하지 못함** → ⚠️로 표시하고 후속 수집 대상으로 남긴다.

---

## CLAIM 1 — "Solidigm이 규격 정의에 참여해서 61TB QLC를 삼성보다 12개월 먼저 출시했다"

### 1-A. 제품 출시 타임라인 (날짜 부분)

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C1-01 | Solidigm D5-P5336 발표 — "세계 최고 용량 PCIe SSD", 최대 61.44TB QLC | 7.68~61.44TB, U.2 / E1.L, PCIe 4.0 x4, 최대 7,000MB/s 읽기 | 2023-07 (2023년 7월 말 발표) | https://news.solidigm.com/en-WW/228286-solidigm-introduces-the-world-s-highest-capacity-pcie-ssd-for-massive-data-storage-from-core-to-edge/ , https://www.storagereview.com/news/solidigm-p5336-61-44tb-ssds-announced | 🟡 |
| C1-02 | **발표≠출하**: 초기 출하는 30.72TB E1.L. Solidigm 제품 브리프에 "All other capacities and form factors will ship later in 2023" 명시 → 61.44TB는 2023년 하반기 순차 출하 | 30.72TB E1.L 선출하, 61.44TB U.2/E1.L 후속 | 2023-H2 | https://www.solidigm.com/products/data-center/product-briefs/d5-p5336-product-brief.html | 🟡 |
| C1-03 | Samsung BM1743 61.44TB QLC eSSD — 조용히 출시(quiet launch) | 61.44TB, U.2, QLC V-NAND, 데이터센터 read-intensive | 2024-07 (2024-07-02 보도) | https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/ , https://www.tomshardware.com/pc-components/ssds/samsung-quietly-launches-6144tb-ssd-talks-about-12288tb-model | 🟡 |
| C1-04 | Samsung 122.88TB급 BM1743을 FMS 2024에서 전시 | 122.88TB 시연 | 2024-08 (FMS 2024) | https://www.anandtech.com/show/21526/samsungs-128-tbclass-bm1743-enterprise-ssd-displayed-at-fms-2024 | 🟡 |
| C1-05 | Solidigm D5-P5336 122.88TB 발표. U.2 15mm 샘플링, 가용 Q1'25 / E1.L 가용 Q2'25 | 122.88TB, 192층 QLC | 2024-11-12~13 | https://www.servethehome.com/solidigm-d5-p5336-122-88tb-nvme-ssd-launched-shipping-in-q1-2025/ , https://www.techpowerup.com/328772/solidigm-launches-d5-p5336-pcie-data-center-ssds-with-122-tb-capacity | 🟡 |
| C1-06 | Micron 6550 ION — 업계 최초 E3.S·PCIe Gen5 60TB(61.44TB)급, **고객 퀄 착수** 발표 | 61.44TB, E3.S, Gen5, 경쟁 대비 전력 20%↓ 주장 | 2024-11-12 | https://www.globenewswire.com/news-release/2024/11/12/2978942/14450/en/Micron-Introduces-World-s-Fastest-Most-Energy-Efficient-60TB-SSD.html | ✅ |
| C1-07 | Micron 6500 ION은 60TB 옵션 없음(6550이 첫 60TB) | — | — | https://blog.edgeelectronics.com/micron-6500-ion-eol-transition-guide | 🟡 |
| C1-08 | Micron 6600 ION — 최대 122TB(E3.S)/245TB(E3.L), 샘플링 단계, 유통 미전개 | 122TB/245TB | 2026 현재 샘플링 | https://blog.edgeelectronics.com/micron-6500-ion-eol-transition-guide | 🟡 |
| C1-09 | Kioxia LC9 245.76TB — 업계 최초 245.76TB NVMe SSD 발표, **선별 고객 샘플링**(양산 아님) | 245.76TB, 32-die stack, BiCS 8th gen | 2025-07-21 | https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html | ✅ |
| C1-10 | Kioxia LC9 'Best of Show' (FMS 2025) / CES 2026 전시 — 여전히 전시·샘플 단계 | — | 2025-08-05, 2026-01 | https://americas.kioxia.com/en-us/business/news/2025/ssd-20250805-1.html , https://fudzilla.com/kioxia-showcases-245-76tb-lc9-enterprise-ssds-based-on-8th-generation-bics-3d-flash-memory-at-ces-2026/ | 🟡 |
| C1-11 | **Solidigm D5-P5436 / D5-P5636**: 이번 수집에서 공개 발표 근거를 찾지 못함 | — | — | (검색 결과 없음) | ⚠️ 미확인 |

> **간격 계산**: Solidigm 61.44TB 발표 2023-07 → Samsung BM1743 61.44TB 출시 2024-07 = **약 12개월**. 덱의 "12개월" 수치 자체는 성립. ✅(날짜 부분)

### 1-B. 어떤 규격이 이 드라이브를 지배하는가 / 누가 그 규격을 썼는가

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C1-20 | OCP **Datacenter NVMe SSD Specification** 버전·일자 (문서 표제 기준) | v2.0 (2021-07-30), v2.5 (2023-09-28), v2.6 (2024-09-25), v2.7 (2025-11-17), v2.7 final 개정 (2026-01-08) → **연 1회 개정 사이클** | 2021~2026 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-0r21-pdf , .../datacenter-nvme-ssd-specification-v2-5-pdf , .../datacenter-nvme-ssd-specification-v2-6-2-pdf , .../datacenter-nvme-ssd-specification-v2-7-final-pdf , .../datacenter-nvme-ssd-specification-v2-7-final-pdf-1 | ✅ (문서 표제·일자) |
| C1-21 | OCP DC NVMe SSD Spec v2.5의 Contributor(OCP CLA 기준) / Supporter 명단 | **Meta, Microsoft, HPE, Dell(EMC), Google** — 즉 **구매자(하이퍼스케일러·OEM)** 명단이며 SSD 공급사(Solidigm·삼성·Kioxia·Micron)는 기고자로 등장하지 않음 | 2023-09-28 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf | 🟡 `[원문확인필요]` |
| C1-22 | OCP Storage Project 공동 리드 = Ross Stenfort (스펙 작성 당시 Meta 소속, 현 SanDisk) | 프로젝트 리드 | 2023~2025 | https://www.opencompute.org/about/project-leads , https://files.futurememorystorage.com/proceedings/2025/20250805_DCTR-102-1_Stenfort_.pdf | 🟡 |
| C1-23 | NVMe **TP4146 Flexible Data Placement(FDP)** 비준 | 파일명 "TP4146 Flexible Data Placement **2022.11.30 Ratified**.pdf", 2022-12 공표 | 2022-11-30 비준 / 2022-12 공표 | https://nvmexpress.org/wp-content/uploads/FMS-2023-Flexible-Data-Placement-FDP-Overview.pdf , https://in.linkedin.com/posts/nvmexpress_hyperscale-innovation-flexible-data-placement-activity-7011072767907282946-r-FT | 🟡 `[원문확인필요]` |
| C1-24 | TP4146 FDP는 **Meta + Google의 공동 작업**에서 나옴. FMS 2022 발표자: Christopher Sabol(Google), Ross Stenfort(Meta) | 두 하이퍼스케일러가 각자 WA·오버프로비저닝 문제를 풀다 합류 | 2022 | https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf , https://semiconductor.samsung.com/news-events/tech-blog/nvme-fdp-a-promising-new-ssd-data-placement-approach/ | 🟡 |
| C1-25 | NVMe **TP4053 ZNS** — 2018년 말 착수, **2020-06 비준**. NVMe 1.4a에 ratified TP로 포함. ZNS Command Set 1.1은 2021-06-02 비준 | — | 2020-06 / 2021-06-02 | https://nvmexpress.org/nvm-express-q3-webcast-qa-answering-your-questions-about-nvme-zoned-namespace-ssds-and-the-linux-zoned-storage-ecosystem/ , https://nvmexpress.org/wp-content/uploads/NVM-Express-Zoned-Namespace-Command-Set-Specification-1.1-2021.06.02-Ratified-1.pdf | 🟡 `[원문확인필요]` |
| C1-26 | **61.44TB라는 용량 자체를 정의하는 규격은 존재하지 않음.** OCP DC NVMe SSD Spec은 관리·보안·텔레메트리·전력·폼팩터 준수를 규정하지, 용량 포인트를 규정하지 않음. 61.44TB는 192층 QLC + 컨트롤러 매핑(대형 Indirection Unit) 선택의 결과 | — | — | https://www.solidigm.com/products/data-center/d5/p5336.html (192L QLC), https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf | 🟡 (부재의 증거) |
| C1-27 | **Solidigm이 규격 정의에 참여해서 61TB를 선점했다는 공개 근거를 찾지 못함.** Solidigm이 공개적으로 내세우는 차별점은 (a) 4세대 QLC(192L), (b) CSAL(Cloud Storage Acceleration Layer) 오픈소스 FTL — 규격 기고가 아님 | — | 2023~ | https://news.solidigm.com/en-WW/231383-csal-qlc-game-changer-and-open-source-solution-for-the-future/ | ⚠️ 부정적 결과 |

### 1-C. 하이퍼스케일러 공동정의 / 설계 수주 증거

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C1-30 | Meta 엔지니어링 공개 포스트 "A case for QLC SSDs in the data center" — Meta가 **데이터센터 QLC 티어를 요구사항으로 공표**. 업계 표준 U.2 15mm 폼팩터가 QLC 로드맵 스케일링(최대 512TB)에 중요하다고 명시 | 10 MB/s/TB 대역 구간, 전력효율·밀도 | **2025-03-04** | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ , https://www.theregister.com/2025/03/07/meta_proposes_qlc_ssds_as/ | ✅ (Meta 1차 포스트) |
| C1-31 | Meta가 1PB급·80W SSD를 위한 **새 E2 폼팩터** 제안 (GPU 서버와 같은 스케일링 곡선으로 스토리지를 끌어올리자는 제안) | 1PB+, 80W | 2025 (OCP) | https://www.servethehome.com/a-meta-vision-for-gpu-scale-compute-with-1pb-e2-ssds/ | 🟡 |
| C1-32 | **"Meta + Solidigm이 61TB QLC 드라이브를 공동 정의했다"는 공개 진술을 찾지 못함.** Microsoft/Azure + Solidigm 고용량 QLC 공동정의·설계수주 보도도 확인 실패(확인된 것은 P5316 30.72TB의 Azure Stack HCI 파트너 솔루션 수준) | — | — | https://dataon.io/new-solidigm-p5316-qlc-nand-ssds-accelerate-high-capacity-storage-for-dataon-integrated-systems-for-azure-stack-hci/ | ⚠️ 부정적 결과 |
| C1-33 | **시간순서가 덱의 인과와 반대**: Solidigm 61.44TB 발표(2023-07) → Meta의 공개 QLC 요구사항 문서(2025-03). 즉 공개된 구매자 스펙은 제품보다 **20개월 뒤**에 나왔다 | — | 2023-07 vs 2025-03 | C1-01, C1-30 | ✅ (날짜 대조) |

---

## CLAIM 2 — "HBM4: SK하이닉스가 NVIDIA와 규격을 공동정의해 주도권을 잡았고 삼성은 늦었다"

### 2-A. JEDEC 표준 사실관계

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C2-01 | JEDEC **JESD270-4 HBM4** 공표 | 2048-bit I/O, 최대 8 Gbps/pin, 스택당 최대 2 TB/s, 4/8/12/16-high, 24Gb·32Gb die, 최대 64GB/cube, HBM3 컨트롤러 후방호환 | **2025-04-16** | https://www.jedec.org/news/pressreleases/jedec%C2%AE-and-industry-leaders-collaborate-release-jesd270-4-hbm4-standard-advancing | ✅ |
| C2-02 | **HBM4 표준 개발 참여 기업**: AMD, Cadence, Google, Meta, Micron, **NVIDIA, Samsung, SK hynix**, Synopsys — 즉 **삼성도 표준 제정 참여자였다** | 9개사 명시 | 2025-04-16 | 상동 JEDEC 보도자료 / https://www.edn.com/jedec-finalizes-hbm4-standard/ | ✅ `[원문확인필요 — 보도자료 원문]` |
| C2-03 | JEDEC 보도자료 인용문 — SK hynix(Jeff Choi, VP HBM Business Planning): "honored to **lead in the establishment** of the HBM4 standard"; Micron(Praveen Vaidyanathan): "proud to have played a **pivotal role**" | 두 회사 모두 주도 주장 | 2025-04-16 | 상동 | 🟡 |
| C2-04 | JEDEC **JESD238 HBM3** 공표 = 2022-01(1월 28일). SK hynix는 **그보다 앞선 2021-10에 HBM3 개발 완료 발표**, 2022-06 양산 | 6.4 Gbps/pin, 819 GB/s | 2021-10 / 2022-01 / 2022-06 | https://www.jedec.org/news/pressreleases/jedec-publishes-hbm3-update-high-bandwidth-memory-hbm-standard , https://www.prnewswire.com/news-releases/sk-hynix-announces-development-of-hbm3-dram-301404077.html | ✅ |

### 2-B. 실제 주도권을 만든 변수 (규격 참여가 아닌 것들)

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C2-10 | **NVIDIA가 JEDEC 규격(8 Gbps)을 초과하는 속도를 요구**. 10 Gbps/pin 이상, 일부 보도는 11 Gbps·초기 13 Gbps 목표 | 8 → 10~13 Gbps | 2025~2026 | https://www.tomshardware.com/tech-industry/hbm4-mass-production-delayed-as-nvidia-pushes-memory-specs-higher , https://iconnect007.com/article/146969/nvidia-seeks-to-raise-hbm4-specs-in-response-to-amd-competition-sk-hynix-expected-to-remain-largest-supplier-in-2026/146966/smt | 🟡 |
| C2-11 | **→ 구속력 있는 "규격"은 JEDEC이 아니라 고객(NVIDIA) 사양이었다.** JEDEC 표준은 하한선, 실제 경쟁은 표준 초과 구간에서 벌어짐 | — | — | C2-01 + C2-10 대조 | 🟡 (해석은 사실 대조에 근거) |
| C2-12 | SK hynix–TSMC MoU: HBM4 **베이스 다이를 TSMC 로직 공정으로** 전환 + CoWoS 통합 최적화. (HBM3E까지는 SK하이닉스 자체 베이스 다이) | 로직 파운드리 제휴 | **2024-04-18** | https://www.prnewswire.com/news-releases/sk-hynix-partners-with-tsmc-to-strengthen-hbm-technological-leadership-302120755.html | ✅ |
| C2-13 | SK hynix HBM4 베이스 다이 노드 보도: 범용은 TSMC 12nm(12FFC+), 커스텀은 3nm로 상향(당초 N5) | 12FFC+ / N5 → 3nm | 2024-12 보도 | https://www.trendforce.com/news/2024/12/04/news-sk-hynixs-hbm4-to-use-tsmcs-3nm-base-die/ , https://www.kedglobal.com/korean-chipmakers/newsView/ked202412030008 | 🟡 |
| C2-14 | Samsung은 **자사 파운드리 4nm**로 HBM4 로직 다이 제조 + 3D 패키징까지 사내 턴키(유일하게 스택 전체를 내부 보유) | 4nm 베이스 다이 | 2024-07 보도~ | https://www.kedglobal.com/korean-chipmakers/newsView/ked202407150016 , https://finance.biggo.com/news/c435b2cc-cc26-44be-9458-1cfc27f7f153 | 🟡 |
| C2-15 | Micron은 HBM4 베이스 다이에 TSMC 제휴(커스텀 공정 추정) | — | 2025~ | https://www.eetimes.com/the-state-of-hbm4-chronicled-at-ces-2026/ | 🟡 |
| C2-16 | **SK하이닉스 HBM3 선점의 공개된 원인은 패키징·수율**: MR-MUF(12다이 1회 열사이클 일괄 본딩) vs 삼성 TC-NCF(층별 NCF). 12-hi 스택 수율 75~80%(SK, 1bnm) vs 60~65%(삼성, 1cnm), MR-MUF의 열방출 우위·thermal dummy bump 최대 4배 | 수율 차 ~15%p | 2023~2026 분석 | https://www.eetimes.com/sk-hynixs-mr-muf-innovations-tackle-heat-generation-to-secure-hbm-leadership/ , https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm , https://semihub.io/en/blog/hbm-guide-4.html | 🟡 |
| C2-17 | SK하이닉스가 NVIDIA H100용 **HBM3 단독 공급사**였고 이를 다년 계약으로 고착 | 단독 공급 | 2022~2023 | https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm | 🟡 |
| C2-18 | Samsung 8/12단 HBM3E, NVIDIA 발열·전력 기준 미달(2024-04~05), 2025-06 재차 실패, **2025-09-19경 12단 HBM3E 퀄 통과** — 개발 완료 후 약 18개월 지연, Blackwell 사이클 상실 | 18개월 | 2024-04 → 2025-09 | https://www.kedglobal.com/korean-chipmakers/newsView/ked202509190008 , https://www.trendforce.com/news/2025/06/12/news-samsung-reportedly-stumbles-again-on-nvidias-12-hi-hbm3e-validation-retest-set-for-september/ , https://siliconanalysts.com/analysis/hbm-qualification-race-2022-2026 | 🟡 |

### 2-C. HBM4 실제 경주 결과 (덱의 "삼성은 늦었다" 재검증)

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C2-20 | SK hynix, 업계 최초 12단 HBM4 **샘플**을 주요 고객에 공급 | 12-hi 샘플 | 2025-03 | https://news.skhynix.com/sk-hynix-showcases-unrivaled-ai-memory-leadership-at-gtc-2025/ | 🟡 |
| C2-21 | SK hynix, **세계 최초 HBM4 개발 완료·양산 준비 완료** 발표. 2,048 I/O, **10 Gbps 초과**(JEDEC 8 Gbps 상회), 전력효율 +40%, AI 서비스 성능 최대 +69% 주장 | 10Gbps+, +40% 전력효율 | **2025-09-11~12** | https://news.skhynix.com/en/sk-hynix-completes-worlds-first-hbm4-development-and-readies-mass-production/ , https://www.prnewswire.com/news-releases/sk-hynix-completes-worlds-first-hbm4-development-and-readies-mass-production-302554538.html | ✅ |
| C2-22 | **Samsung, 업계 최초 상용 HBM4 출하** 발표(양산 개시 + 고객 출하). 속도 11.7 → 13 Gbps로 상향 | 13 Gbps | **2026-02-12** | https://news.samsung.com/global/samsung-ships-industry-first-commercial-hbm4-with-ultimate-performance-for-ai-computing , https://www.businesswire.com/news/home/20260212674509/en/Samsung-Ships-Industry-First-Commercial-HBM4-With-Ultimate-Performance-for-AI-Computing , https://www.trendforce.com/news/2026/02/12/news-samsung-delivers-first-ever-commercial-hbm4-boosting-speeds-from-11-7%E2%80%AFgbps-to-13%E2%80%AFgbps/ | ✅ |
| C2-23 | Samsung, NVIDIA HBM4 퀄(10 Gb/s·11 Gb/s 2단계) 통과 보도 | 2-tier 퀄 통과 | 2026 상반기 | https://www.tweaktown.com/news/109872/samsung-should-be-first-with-hbm4-powering-nvidias-new-vera-rubin-ai-chips-passed-all-tests/index.html | 🟡 |
| C2-24 | NVIDIA Vera Rubin HBM4 공급사로 Samsung·SK hynix 채택 보도, 3월 출하 가능성 | 2사 채택 | 2026-03-09 | https://www.trendforce.com/news/2026/03/09/news-samsung-sk%E2%80%AFhynix-reportedly-tapped-as-nvidia-rubin-hbm4-suppliers-shipments-could-start-in-march/ | 🟡 |
| C2-25 | 젠슨 황, Rubin용 **3사 모두 양산 중**, Q3 출하 확인 | 3사 | 2026-06-05 | https://www.techtimes.com/articles/317855/20260605/nvidia-vera-rubin-hbm4-jensen-huang-confirms-all-three-suppliers-production-q3-ship.htm | 🟡 |
| C2-26 | SK hynix 2026년 HBM4 최대 공급사 유지 전망(일부 보도 NVIDIA HBM4 물량 70% 확보) | ~70% (보도) | 2026 | https://www.semicone.com/article-385.html , https://iconnect007.com/article/146969/... | ⚠️ 단일 출처·수치 불확실 |

---

## CLAIM 3 — "수요 신호는 주문 물량보다 약 2년 앞서 고객 사양·표준·소스코드에 나타난다"

### 3-A. 지지 증거 — FDP 사례 (표준 → 코드 → 커널 → 확산)

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C3-01 | NVMe TP4146 FDP **비준** | — | **2022-11-30** | (C1-23 참조) | 🟡 |
| C3-02 | Meta의 오픈소스 플래시 캐시 **CacheLib에 FDP 지원 PR #247 제출** (제출자: Arun George, **arun.george@samsung.com** — 삼성 엔지니어가 Meta 오픈소스에 기고) | PR #247 | **2023-07-20 오픈** / 2023-11-18 종료 | https://github.com/facebook/CacheLib/pull/247 | ✅ (git) |
| C3-03 | CacheLib FDP 본 지원 **머지**(PR2 #277). io_uring_cmd + NVMe char device로 FDP directive 전달, `fdpMode` 설정 추가, 고사용률 구간 WAF 대폭 감소 주장 | PR #277, D51878043 | **2024-01-25** (오픈 2023-11-15) | https://github.com/facebook/CacheLib/commit/009e89ba2b49b1fbbc48d03c3f81046de28bd6ed | ✅ (git) |
| C3-04 | CacheLib FDP 문서화 PR #308 머지 / FdpNvme 유닛테스트 PR #318 머지 | — | 2024-06-18 / 2024-07-19 | https://github.com/facebook/CacheLib/pull/308 , https://github.com/facebook/CacheLib/pull/318 | ✅ (git) |
| C3-05 | EuroSys '25 논문 "Towards Efficient Flash Caches with Emerging NVMe FDP SSDs" — Meta·Twitter 프로덕션 트레이스로 **device WAF ≈ 1** 달성, 탄소·전력 절감 | WAF≈1 | **2025-03-30~04-03** (arXiv 2503.11665, 2025-03) | https://dl.acm.org/doi/10.1145/3689031.3696091 , https://arxiv.org/abs/2503.11665 | ✅ |
| C3-06 | **Linux 6.16에 block write streams(FDP) 머지**. 핵심 커밋 "nvme: use fdp streams if write stream is provided" — 작성자 **Keith Busch(당시 kbusch@meta.com, Meta)**, 시리즈 제출자 **Kanchan Joshi(joshi.k@samsung.com, 삼성)** | 블록 계층 + io_uring per-IO write stream | 커밋 **2025-05-06**, Linus 머지 **2025-05-26** (6.16) | https://github.com/torvalds/linux/commit/38e8397dde6338c76593ddb17ccf3118fc3f5203 , https://github.com/torvalds/linux/commit/6f59de9bc0d576eb5a5edfea470527902315e924 , https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16 | ✅ (git) |
| C3-07 | 초기 NVMe FDP 드라이버 인에이블 패치 시리즈는 **2024-10~12**에 이미 리뷰 중 (PATCHv8~v11, kbusch@meta.com) | — | 2024-10 ~ 2024-12 | https://lore.gnuweeb.org/io-uring/20241206015308.3342386-10-kbusch@meta.com/ | 🟡 |
| C3-08 | **f2fs가 DATA 온도(hot/warm/cold)를 FDP 스트림에 매핑** — 파일시스템 레벨 확산 | 1/2/3+ 스트림 매핑 | 작성 **2026-04-17**, 머지 **2026-05-22** | https://github.com/torvalds/linux/commit/e6c8140bd06d7dd8ee1e3c690445d3cfcaf1d892 | ✅ (git) |
| C3-09 | NVMe FDP placement handle 상한 U8_MAX로 상향(하드닝) — **작성자 Alibaba(kanie@linux.alibaba.com)**, 중국 하이퍼스케일러 합류 신호 | — | 작성 2026-08-04, 머지 **2026-08-10** | https://github.com/torvalds/linux/commit/53cdaeab2e30e0cb849a74b94f93729ad98946b1 | ✅ (git) |
| C3-10 | FAST '26 논문 "Characterizing and Emulating FDP SSDs with WARP" — 학계·산업 연구 레이어 확산 | — | 2026 (FAST'26) | https://www.usenix.org/system/files/fast26-song.pdf | 🟡 |
| C3-11 | **FDP 리드타임 집계**: 규격 비준(2022-11) → 첫 오픈소스 코드(2023-07, **+8개월**) → 대표 오픈소스 머지(2024-01, **+14개월**) → 커널 메인라인(2025-05, **+30개월**) → 파일시스템 확산(2026-05, **+42개월**) | +8 / +14 / +30 / +42개월 | — | C3-01~C3-08 종합 | ✅ (날짜 산술) |

### 3-B. 반증 — ZNS 사례 (비준된 표준이 물량을 만들지 못함)

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C3-20 | NVMe TP4053 ZNS 비준(2020-06)과 **거의 동시에 Linux 지원 패치 제출**(2020-06, linux-nvme PATCHv4) → 코드 신호는 규격과 동시 발생 | 리드타임 0개월 | 2020-06 | http://merlin.infradead.org/pipermail/linux-nvme/2020-June/017888.html , https://lwn.net/Articles/823737/ | ✅ |
| C3-21 | ZNS는 **소프트웨어 생태계 파편화**를 유발, 코드베이스 비대화로 **메인라인 프로젝트에서 전반적으로 거부**됨 | — | 2023~ | https://www.snia.org/sites/default/files/2025-05/SNIA-SDC23-Bj%25C3%25B8rling-Towards-Large-scale-Deployments-with-Zoned-Namespace-SSDs.pdf , https://semiconductor.samsung.com/news-events/tech-blog/what-hyperscalers-need-to-know-about-flexible-data-placement-fdp/ | 🟡 |
| C3-22 | FDP가 ZNS의 대안으로 부상한 이유는 **통합 단순성**: FDP는 NVMe의 optional feature로 켜고 끄면 됨(호스트 FTL 재작성 불필요) | — | 2022-12~ | https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/ | 🟡 |
| C3-23 | **결론적 반증**: TP4053은 2020-06 비준 + 같은 달 커널 코드 + 2020~2021 제품 출시까지 3요소를 모두 충족했으나, **6년이 지난 2026년까지 하이퍼스케일 물량으로 전환되지 못했다.** 즉 "비준된 표준 = 2년 뒤 물량"은 성립하지 않는다 | 6년 경과, 물량 전환 실패 | 2020-06 → 2026 | C3-20~C3-22 종합 | ✅ (반례) |
| C3-24 | 유사 반례 후보: NVMe **KV Command Set(TP4038)** — ZNS와 동일 시기 비준되었으나 상용 물량 미미 | — | ~2020 | https://nvmexpress.org/wp-content/uploads/New-NVMe%C2%AE-Command-Sets-Zoned-Namespace-ZNS-Key-Value-KV.pdf | ⚠️ 물량 미미는 미검증 |

### 3-C. 하이퍼스케일러가 사양을 얼마나 앞서 쓰는가

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C3-30 | OCP Datacenter NVMe SSD Spec이 **연 1회 개정**되며, 각 개정판이 차기 조달 세대의 요구사항을 담는다(v2.5 2023-09 → v2.6 2024-09 → v2.7 2025-11) | 연 1회 | 2021~2026 | C1-20 | ✅ |
| C3-31 | "하이퍼스케일러가 배치보다 몇 년 앞서 스토리지 스펙을 쓴다"는 **명시적 공개 진술은 이번 수집에서 확보하지 못함**. 확보한 것은 정황 증거뿐(OCP 연간 개정 사이클, Meta QLC 포스트 2025-03 → Pure CEO의 "2026년 두 자릿수 EB 프로덕션 배치" 전망 2024년 말) | 약 1~2년 정황 | — | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ , https://blocksandfiles.com/2025/07/15/zucks-super-massive-ai-data-centers-will-be-storage-gold-mines/ | ⚠️ 정황 |

---

## TASK D — 2026년 현재, KV-cache 티어를 노리는 NAND 공급사가 참여해야 할 규격

### D-1. 이번 세션에서 날짜까지 검증된 항목

| ID | 규격/활동 | 무엇인가 | 현재 상태·버전 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| D-01 | **OCP Datacenter NVMe SSD Specification** | 하이퍼스케일러(Meta·MS·Google·Dell·HPE)가 쓰는 **구매자 사양**. 데이터센터 SSD의 사실상 통관 규격 | **v2.7** (2025-11-17), 개정판 2026-01-08. 연 1회 사이클 → v2.8 2026년 말 예상 | 2025-11-17 / 2026-01-08 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf , .../datacenter-nvme-ssd-specification-v2-7-final-pdf-1 | ✅ |
| D-02 | **NVMe 본 규격 릴리스** | NVMe 2.x 계열 | 2.2 (2025-03), **2.3 (2025-08-05)**, **2.4 (2026-08-04)** | 2025~2026 | https://nvmexpress.org/specifications/ | 🟡 `[원문확인필요]` |
| D-03 | **NVMe TP4146 FDP** | 호스트가 물리 NAND 배치를 힌트하는 데이터 배치 기능. KV-cache 쓰기 스트림 분리에 직결 | 비준 완료, 커널·f2fs·CacheLib 확산 중, 2026년에도 확장 커밋 진행 | 비준 2022-11-30 / 확산 2025~2026 | C1-23, C3-06~C3-09 | 🟡+✅ |
| D-04 | **Linux block write streams / io_uring per-IO stream** | FDP를 애플리케이션이 쓰게 해주는 OS 인터페이스. **여기에 코드를 넣는 것이 사실상 규격 참여** | 6.16 머지(2025-05), f2fs 매핑(2026-05), 상한 확장(2026-08). 2026-02 시점 "write-stream for file I/O" 패치·LSF/MM/BPF 토픽 진행 중 | 2025-05 ~ 2026-08 | https://github.com/torvalds/linux/commit/38e8397dde6338c76593ddb17ccf3118fc3f5203 , https://ratatoskr.run/linux-fsdevel/2026/02/340199/t , https://ratatoskr.run/linux-fsdevel/2026/02/340727/t | ✅ |
| D-05 | **vLLM KV Connector API (V1)** | vLLM에서 외부 KV 저장소를 붙이는 **사실상의 de-facto 인터페이스**. NAND 티어가 여기에 붙어야 채택됨 | PR #15960 "[P/D][V1] KV Connector API V1" **머지 2025-04-17**. 이후 CPU transfer(2025-07), KV load failure recovery(2025-09) 등 확장 | 2025-04-17~ | https://github.com/vllm-project/vllm/pull/15960 , https://github.com/vllm-project/vllm/pull/18293 , https://github.com/vllm-project/vllm/pull/19330 | ✅ |
| D-06 | **LMCache** | 오픈소스 KV cache 레이어(vLLM 생태계). GPU→CPU→디스크/원격 티어링 | 레포 개설 2024-05-28, vLLM LMCache 커넥터 머지 **2025-02-25**, **Weka GDS 스토리지 백엔드 머지 2025-05-28**, infinistore RDMA 백엔드 2025-02-27. 2026-09 현재 v0.5.5 계열·나이틀리(CUDA/ROCm/XPU/MUSA) 활발 | 2024-05 ~ 2026-09 | https://github.com/LMCache/LMCache , https://github.com/vllm-project/vllm/pull/12953 , https://github.com/LMCache/LMCache/commit/7c61c670d45095e65004c08bfceb428f0e4db63c , https://github.com/LMCache/LMCache/commit/bf570ef1287c57ab8373ea67b36e4a081aa52020 | ✅ |
| D-07 | **Mooncake (Moonshot AI / Kimi)** | KV-cache 중심 서빙 플랫폼·Transfer Engine·MooncakeStore | 레포 개설 2024-06-25. vLLM Mooncake Transfer Engine 연동 머지 **2024-12-15**, XpYd + MooncakeStore 머지 **2025-03-29** | 2024-06 ~ 2025-03 | https://github.com/kvcache-ai/Mooncake , https://github.com/vllm-project/vllm/pull/10884 , https://github.com/vllm-project/vllm/pull/12957 | ✅ |
| D-08 | **NVIDIA NIXL (Inference Xfer Library)** | 추론용 이기종 메모리·스토리지 전송 추상화. GPU↔CPU↔NVMe↔원격을 하나의 API로 | 레포 개설 **2025-03-05**(GTC'25). 릴리스 계열 1.0.0 → 1.4.1(최근). vLLM NixlConnector CPU transfer 머지 2025-07-24 | 2025-03 ~ 2026-09 | https://github.com/ai-dynamo/nixl , https://github.com/vllm-project/vllm/pull/18293 | ✅ |
| D-09 | **NVIDIA Dynamo + KVBM (KV Block Manager)** | 데이터센터 스케일 추론 서빙 프레임워크의 KV 블록 관리·오프로드 계층 | 레포 개설 **2025-03-03**. KVBM 커밋 2025-05부터(offload/테스트/Python 바인딩), **2026-04-22 vLLM block manager를 kvbm-logical로 대체** | 2025-03 ~ 2026-04 | https://github.com/ai-dynamo/dynamo , https://github.com/ai-dynamo/dynamo/commit/5d5080bad139b2b7c777cbcdcf5f991214d38432 , https://github.com/ai-dynamo/dynamo/commit/36b4208e5e88fa4de75844039b6da06625ae5146 | ✅ |
| D-10 | **SNIA / Storage.AI (+ OCP Storage 공동)** | AI 워크로드용 스토리지 표준화 이니셔티브. SDC 2025의 주요 트랙 | 2025-09 시점 SDC에서 Storage.AI·OCP Storage 작업이 중심 의제 | 2025-09-21 | https://www.forbes.com/sites/tomcoughlin/2025/09/21/sdc-storageai-ocp-storage-work-reducing-chiplet-power-consumption/ | 🟡 (헤드라인 수준) |

### D-2. 지목되었으나 이번 세션에서 **날짜·버전 확정 실패** (후속 수집 필요)

| ID | 항목 | 미확인 사유 |
|---|---|---|
| D-20 | NVMe **Computational Storage** TP 현황 | nvmexpress.org 접근 차단 + 검색 예산 소진 ⚠️ |
| D-21 | NVMe **KV Command Set / TP4038** 현재 리비전 | 상동 ⚠️ |
| D-22 | NVMe **Subsystem Local Memory (SLM)** TP | 상동 ⚠️ |
| D-23 | **PCIe Gen6 / Gen7** 사양 확정일 및 스토리지 적용 시점 | 상동 ⚠️ |
| D-24 | **SNIA Computational Storage API / SDXI** 현재 버전·일자 | snia.org 직접 접근 실패 ⚠️ |
| D-25 | **MLCommons MLPerf Storage** 현재 버전·결과 발표일 | 검색 예산 소진 ⚠️ |
| D-26 | **UALink 1.0 / Ultra Ethernet Consortium 1.0** 스펙 일자 | 검색 예산 소진 ⚠️ |
| D-27 | **GPUDirect Storage / DOCA** 현재 버전 | 검색 예산 소진 ⚠️ |
| D-28 | **JEDEC** NAND/SSD 관련 진행 중 항목(HBM4E 포함) | 검색 예산 소진 ⚠️ (HBM4E 관련 SK hynix TSMC 3nm 검토 보도 2026-03-20만 확보: https://www.trendforce.com/news/2026/03/20/news-sk-hynix-reportedly-weighs-tsmc-3nm-for-hbm4e-logic-dies-to-gain-edge-over-samsung/) |

---

## 덱 문구에 대한 직접 판정

| 덱 문구 | 판정 | 근거 |
|---|---|---|
| "규격 정의에 참여한 공급자가 선점했다" (CLAIM 1, QLC) | **미지지(not supported)** — 날짜는 맞지만 인과가 틀림 | C1-21(규격 기고자는 구매자), C1-26(용량은 규격 사항 아님), C1-27·C1-32(공동정의 근거 부재), C1-33(구매자 스펙이 제품보다 20개월 늦음) |
| "SK하이닉스가 NVIDIA와 HBM4 규격을 공동정의해 주도, 삼성은 늦었다" (CLAIM 2) | **부분 지지(partly)** — "늦었다"는 HBM3E 기준 사실, "규격 공동정의가 원인"은 미지지 | C2-02(삼성도 JEDEC HBM4 참여사), C2-10~C2-11(구속 사양은 NVIDIA 요구), C2-16~C2-18(원인은 패키징·수율·퀄), C2-22(2026-02 삼성 상용 HBM4 최초 출하) |
| "수요 신호는 물량보다 ~2년 앞서 사양·표준·소스코드에 나타난다" (CLAIM 3) | **부분 지지(partly)** — 방향은 맞으나 "예측력"은 없음 | C3-11(FDP는 +8~+42개월 리드), C3-23(ZNS는 6년째 물량 전환 실패) |
