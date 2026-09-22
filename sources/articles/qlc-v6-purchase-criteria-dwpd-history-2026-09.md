# eSSD 구매 기준·정격 DWPD 변화 추이 (2008~2026) — 웹 리서치 팩트 원장

**수집일**: 2026-09-22
**유형**: 웹 검색 기반 2차 자료 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v6.0 개정 — 위키 반영 근거

---

type: research-ledger
agent: Research Agent (R1)
topic: eSSD 구매기준 · 내구성(DWPD) 요구 변화 2008→2026
collected: 2026-09-22
scope: 사실 수집 전용 (전략 판단·권고 없음)
---

# R1 팩트 원장 — eSSD 구매기준과 DWPD 요구의 시대별 변화

## 0. 수집 방법과 한계 (먼저 읽을 것)

- 본 세션의 egress proxy가 **vendor/표준 도메인 직접 fetch를 대부분 차단**했다 (차단 확인: `solidigm.com`, `kioxia.com`, `opencompute.org`, `assets.micron.com`, `servethehome.com`, `storagereview.com`, `blocksandfiles.com`, `nvmexpress.org`, `semiconductor.samsung.com`, `files.futurememorystorage.com`, `arxiv.org`, `usenix.org`). 따라서 모든 사실은 **검색엔진이 해당 1차 문서에서 추출한 인용문** 기반이다.
- 등급 기준
  - ✅ = 벤더 데이터시트/제품브리프/표준문서/공식 보도자료가 출처이고, 수치가 2개 이상 경로에서 일치
  - 🟡 = 평판 있는 2차 매체(StorageReview, ServeTheHome, Tom's Hardware, Blocks&Files, TrendForce, StorageNewsletter, EE Times) 단독
  - ⚠️ = 본 에이전트의 계산값, 단일 비주류 출처, 또는 출처 간 불일치
- 제품명·규격명은 영문 유지.

---

## 1. 팩트 표 A — 제품별 DWPD 연표 (2008→2026)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| A01 | Intel X25-E (SLC) 엔터프라이즈 SSD 출시. 용량 32/64GB | random write 내구성 1PB(32GB) / 2PB(64GB), 35,000 read IOPS, read latency 75µs | 2008 출시 (datasheet 2009-05) | https://download.intel.com/newsroom/kits/ssd/pdfs/X25-E_DataSheet.pdf | ✅ |
| A02 | A01의 DWPD 환산 (5년 보증 기준) | 2PB ÷ (64GB×365×5) ≈ **17 DWPD**; 1PB ÷ (32GB×365×5) ≈ **17 DWPD** | 계산 | (A01 수치로부터 산출) | ⚠️ |
| A03 | Intel SSD DC S3700 발표. eMLC + High Endurance Technology(HET) | **10 DWPD** / 5년, 800GB 모델 약 3.6 PBW | 2012-11-05 | https://www.intc.com/news-events/press-releases/detail/1241/intel-announces-intel-ssd-dc-s3700-series- | ✅ |
| A04 | Intel DC P3700 / P3600 / P3500 (첫 NVMe 세대) 내구성 3계층 분화 | **17 / 3 / 0.3 DWPD** | 2014 | https://www.intel.com/content/dam/www/public/us/en/documents/product-briefs/intel-ssd-dc-family-for-pcie-brief.pdf | ✅ |
| A05 | Micron 5100 ECO / PRO / MAX (3D eTLC, 최대 8TB 2.5") 내구성 3계층 | **1 / 1~3 / 5 DWPD**, OP 각각 10~20% / 20~30% / 60~70% | 2016 | https://www.storagereview.com/review/micron-5100-max-ssd-review | 🟡 |
| A06 | Samsung PM1633a — 2.5" SAS 15.36TB (당시 최대 용량) | 15.36TB | 2016 | https://semiconductor.samsung.com/news-events/tech-blog/brochure-pm1633a-25-sas-ssd/ | 🟡 |
| A07 | Samsung Z-SSD SZ985 (SLC Z-NAND) 출시 | **30 DWPD** / 5년 = 42 PBW, 800GB, 750K read IOPS, latency 16µs | 2018-01-29 | https://download.semiconductor.samsung.com/resources/brochure/Brochure_Samsung_S-ZZD_SZ985_1804.pdf | ✅ |
| A08 | Samsung PM1643 — 2.5" SAS 30.72TB (세계 최대 밀도) | **1 DWPD** / 5년, 960GB~30.72TB | 2018 | https://semiconductor.samsung.com/us/ssd/enterprise-ssd/pm1643-pm1643a/ | ✅ |
| A09 | Samsung PM1733(RI) / PM1735 계열 Gen4 | RI **1 DWPD** 1.92~15.36TB, MU **3 DWPD** 1.6/3.2/6.4/12.8TB | 2019~2020 | https://semiconductor.samsung.com/ssd/enterprise-ssd/pm1733/ | ✅ |
| A10 | Samsung PM9A3 Gen4 TLC (V6) | **1 DWPD**, 960GB~15.36TB | 2021 | https://image.semiconductor.samsung.com/resources/data-sheet/samsung_ssd_pm9a3_data_sheet_rev1_0.pdf | 🟡 |
| A11 | Kioxia FL6 (XL-FLASH, SLC) — SCM급 write-intensive | **60 DWPD**, 800GB~3.2TB, PCIe4 dual-port, MTBF 2.5M h | 2021~2022 | https://americas.kioxia.com/en-us/business/ssd/enterprise-ssd/fl6.html | 🟡 |
| A12 | Intel(→Solidigm) D5-P5316 — 144L QLC, HDD 대체 목적 | 15.36 / 30.72TB, 30.72TB 모델 **22,930 TBW**, 800K random read IOPS | 2021 | https://www.storagereview.com/review/intel-p5316-ssd-review-30-72tb | 🟡 |
| A13 | A12의 DWPD 환산 | 22,930 ÷ (30.72×365×5) ≈ **0.41 DWPD**. 별도 유통 스펙에는 "0.58 DWPD" 표기도 존재 → **출처 간 불일치** | 계산 | https://www.solidigm.com/products/data-center/product-briefs/d5-p5316-product-brief.html | ⚠️ |
| A14 | Micron 7450 (176L TLC) — QoS를 전면에 내세운 첫 세대급 DC SSD | 400GB~15.36TB, **99.9999% QoS ≤ 2ms** | 2022-03-01 | https://www.globenewswire.com/news-release/2022/03/01/2394378/14450/en/Micron-Delivers-World-s-Most-Advanced-176-Layer-NAND-Data-Center-SSD.html | ✅ |
| A15 | Samsung PM1743 — 첫 PCIe 5.0 엔터프라이즈 SSD (CES 2022 공개) | **1 DWPD**, 1.92~15.36TB, seq read 13GB/s, random read 2.5M IOPS | 2022 | https://semiconductor.samsung.com/ssd/enterprise-ssd/pm1743/ | 🟡 |
| A16 | Phison Pascari 브랜드 런칭 + X200Z (SLC, SK hynix V7 176L) | **60 DWPD**, 800GB / 1.6TB / 3.2TB, Gen5 | 2024-05-15 | https://www.phison.com/en/category/article/press-releases/phison-introduces-pascari-brand-launches-x200-ssd-for-enterprise-market | 🟡 |
| A17 | Micron 9550 PRO / MAX (232L G8 TLC, Gen5) 내구성 2계층 | PRO **1 DWPD** 3.84~30.72TB (최대 28,032 TBW) / MAX **3 DWPD** 3.2~25.6TB (최대 70,080 TBW). OCP 2.0 준수 | 2024-07-23 | https://blocksandfiles.com/2024/07/23/micron-sets-datacenter-ssd-speed-energy-efficiency-records/ | 🟡 |
| A18 | Samsung BM1743 — 7세대 QLC V-NAND 61.44TB | **0.26 DWPD** (선대 BM1733은 **0.18 DWPD**), seq read 7.2GB/s / write 2.0GB/s, random read 1.6M IOPS | 2024-07 | https://semiconductor.samsung.com/news-events/tech-blog/next-generation-qlc-v-nand-increases-data-center-profitability/ | ✅ |
| A19 | Solidigm D5-P5336 122.88TB (192L QLC) — 당시 세계 최대 PCIe SSD | **0.6 DWPD @ 32K random write** = **134.3 PBW** (일부 표기 137,523 TBW), 930K random read IOPS / 25K write IOPS, 25W | 2024-11 (spec rev006 2024-12) | https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency | 🟡 |
| A20 | Solidigm D7-PS1010 (Gen5 TLC 176L) | **1 DWPD**, 1.92~15.36TB, 15.36TB=**28 PBW**, 3.1M random read IOPS. 1.66 DWPD로 쓰면 보증 5년→3년 | 2024 | https://www.solidigm.com/products/data-center/product-briefs/solidigm-d7-ps1010-ps1030-product-brief.html | 🟡 |
| A21 | Micron 6550 ION 61.44TB E3.S Gen5 | 61.44TB, read-focused 내구성 (ION=capacity tier) | 2024 | https://www.micron.com/products/storage/ssd/data-center-ssd/6550-ion | 🟡 |
| A22 | Kioxia CM9-R / CM9-V (BiCS FLASH gen8 TLC, PCIe5, NVMe 2.0) | CM9-R **1 DWPD**: 2.5" 최대 **61.44TB**, E3.S 최대 30.72TB / CM9-V **3 DWPD**: 최대 12.8TB | 2025-05-15 | https://americas.kioxia.com/en-us/business/news/2025/ssd-20250515-2.html | ✅ |
| A23 | Kioxia LC9 — 업계 최초 245.76TB NVMe SSD (BiCS8 QLC, CBA, 32-die stack) | **0.3 DWPD**, 30.72~245.76TB, seq read 12GB/s / write 3GB/s, 1.3M random read IOPS | 2025-07-21 (FMS Best of Show 2025-08-05) | https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html | ✅ |
| A24 | Micron 9650 — 세계 최초 PCIe Gen6 DC SSD (G9 TLC) | PRO **1 DWPD** / MAX **3 DWPD**, 6.4~30.72TB, seq read 28GB/s, 5.5M random read IOPS | 2025-07 발표 → 양산 | https://www.micron.com/products/storage/ssd/data-center-ssd/9650-ssd | 🟡 |
| A25 | Sandisk UltraQLC 256TB eSSD 공개 (BiCS8 QLC CBA, pSLC 버퍼 없이 QLC 직접 기입) | 256TB, U.2 1H2026 출하 예정. **DWPD 미공개** | 2025-08-05 (FMS 2025) | https://investor.sandisk.com/news-releases/news-release-details/sandisk-showcases-ultraqlctm-technology-platform-milestone | ✅ |
| A26 | Micron 6600 ION 245TB (G9 QLC) 출하 — 현재 시판 최고 용량 | **1.0 SDWPD (128KB seq)** / **0.3 RDWPD (16K random)**, 16K indirection unit, seq read 13.7GB/s / write 3.0GB/s, random read 1.78M IOPS / write 42K IOPS, 30W | 발표 2025 / 출하 2026-05-05 | https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay | 🟡 |
| A27 | Micron 6600 ION 122TB 사양(동 시리즈) | seq **1 DWPD**, random 4K **≤0.3 DWPD**, 일부 패턴 0.075 DWPD | 2025 | https://www.micron.com/products/storage/ssd/data-center-ssd/6600-ion | 🟡 |
| A28 | Kioxia CM9 시리즈가 **KV cache 전용 스펙**으로 재포지셔닝 — PCIe5 E3.S 25.6TB TLC **3 DWPD** | 25.6TB / **3 DWPD** | 2026-03-16 (NVIDIA GTC 2026) | https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-1.html | ✅ |
| A29 | Kioxia GP Series "Super High IOPS SSD" — GPU가 flash를 HBM 확장처럼 직접 접근 | 평가샘플 2026년 말 | 2026-03-16 | https://www.businesswire.com/news/home/20260316827516/en/Kioxia-Announces-New-SSD-Model-Optimized-for-AI-GPU-Initiated-Workloads | ✅ |
| A30 | Samsung PM1763 — PCIe 6.0 엔터프라이즈 SSD 양산 개시 (9세대 V-NAND, 4nm 컨트롤러) | 16TB 모델 seq read 28,400MB/s / write 21,900MB/s, 전력효율 1.8배↑. **용량·DWPD 출처 불일치**: Samsung 뉴스룸 "4/8/16TB", 2차 유통자료 "3.84~61.44TB, 1 DWPD, NVMe 2.1 / OCP 2.6" | 2026-07 | https://news.samsung.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure | ⚠️ |
| A31 | Phison Pascari X202Z — 고내구성 Gen5, AI 상시기입 워크로드 타깃 | **60 DWPD**, 최대 6.4TB(= 384TB writes/day), seq write 10,000MB/s, read 14,800MB/s | 2026-08 (블로그) | https://phisonblog.com/why-ssd-write-endurance-matters-in-the-age-of-ai-and-continuous-data-streams/ | 🟡 |

---

## 2. 팩트 표 B — 표준·스펙 증거 (구매기준의 제도화)

| ID | 사실 | 수치/내용 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| B01 | JEDEC **JESD218**(SSD Requirements and Endurance Test Method) 및 **JESD219**(SSD Endurance Workloads) 최초 발행 — 내구성이 산업 최초로 "검증 가능한 등급"이 됨 | JESD218 2010-09 발행 → 2011-02 개정; JESD219 2010-09 발행 → 2012-07 개정 | 2010-09 | https://www.jedec.org/standards-documents/focus/flash/solid-state-drives | ✅ |
| B02 | JESD218 최신 개정 | JESD218B.03 (2024-08) → **JESD218C (2025-05)** 발행 | 2025-05 | https://www.jedec.org/standards-documents/docs/jesd218b01 | ✅ |
| B03 | SNIA **SSS Performance Test Spec (PTS)** — IOPS/Throughput/Latency/Write Saturation을 steady-state 기준으로 규정 | PTS-E 1.0 (2011), PTS-C v1.0 rev B (2011-04), 이후 PTS 2.0.1 / **2.0.2에서 Enterprise+Client 통합** | 2011~ | https://www.snia.org/tech_activities/standards/curr_standards/pts | 🟡 |
| B04 | **OCP NVMe Cloud SSD Specification v1.0** 발행 (Microsoft + Facebook 요구 통합). v1.0a 후속 | v1.0: 2020-03-18, v1.0a: 2020-06-26 | 2020-03 | https://www.opencompute.org/documents/nvme-cloud-ssd-specification-v1-0-3-pdf | ✅ |
| B05 | 업계 최초 OCP Cloud SSD 스펙 대응 PCIe4.0 SSD 출시 (Kioxia) — 하이퍼스케일 조달 스펙이 벤더 제품 정의를 규율하기 시작 | — | 2020-11-06 | https://europe.kioxia.com/en-europe/business/news/2020/20201106-1.html | 🟡 |
| B06 | **OCP Datacenter NVMe SSD Specification v2.0** 발행 — **Latency Monitor (Log ID C3h, Feature ID C5h)** 신설. Meta가 요구 주도 | v2.0, 2021-07-30 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-0r21-pdf | ✅ |
| B07 | OCP spec의 QoS 요구는 percentile 테이블 형태 — 99.9999%(6 nines) 구간에 3,000 / 4,000 / 5,000µs 임계와 >1e6 ops 표기 | 99.9999% tile | v2.x | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf | ⚠️ |
| B08 | **OCP v2.5** — human-readable telemetry + open-source tooling(OCP NVMe CLI), 보안 강화, **FDP 추가**, 현장 이슈 반영 | v2.5, 2023-09-28 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf | ✅ |
| B09 | OCP v2.5의 로그/텔레메트리 필수 항목 | Telemetry Host-Initiated(07h), Controller-Initiated(08h), Persistent Event Log(0Dh), Device Self-test(06h), LBA Status(0Eh), Command & Feature Lockdown(14h), **Endurance Group Information(09h)** | 2023-09 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf | ✅ |
| B10 | **OCP v2.6** — 성능/내구성/보안감사/텔레메트리 요구 정의. **OCP S.A.F.E. 펌웨어 감사** 강조, **FDP Die Placement Configuration** 반영. 디바이스는 전체를 단일 Endurance Group으로 운용하고 09h 로그 지원 필수 | v2.6, 2024-09-25 | https://www.encryptionconsulting.com/what-is-ocp-2-6-and-how-pki-plays-an-important-role-in-it/ | 🟡 |
| B11 | **OCP v2.7** — **QLC 고용량 SSD 개선**, telemetry/E2 확장, device measured power 추가 | v2.7, 2025-11-17 (final 재게시 2026-01-08) | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf | 🟡 |
| B12 | **NVMe 1.4** 릴리스 — IO Determinism(NVM Sets), **Predictable Latency Mode** 도입 (TP4003 계열). "noisy neighbor"/long-tail latency 해소 목적 | NVMe 1.4, 2019-06 | https://blocksandfiles.com/2019/11/07/datacentre-ssd-noisy-neighbour-problems-and-long-tail-latencies-solved-by-nvme-v1-4/ | 🟡 |
| B13 | **ZNS (Zoned Namespace) TP4053** 비준 | TP 작업 2018 말 착수 → **2020-06 비준** (NVMe 1.4a에 반영), ZNS Command Set 1.1은 2021-06 | 2020-06 | https://nvmexpress.org/wp-content/uploads/New-NVMe%C2%AE-Command-Sets-Zoned-Namespace-ZNS-Key-Value-KV.pdf | 🟡 |
| B14 | **FDP (Flexible Data Placement) TP4146** 발행 — **Meta와 Google 공동 개발**. 목적은 write amplification 제거와 과도한 over-provisioning 회피(=TCO) | 2022-12 | https://nvmexpress.org/nvmeflexible-data-placement-fdp-blog/ | ✅ |
| B15 | FDP의 채택 동기를 벤더가 "hyperscaler가 WA 제거·OP 축소로 TCO를 개선하려 한 것"으로 명시 | — | (Samsung tech blog) | https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/ | ✅ |

---

## 3. 팩트 표 C — QoS가 1급 구매기준이 된 증거

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| C01 | Fusion-io ioDrive 등 초기 엔터프라이즈 flash는 **IOPS 절대값**을 전면 마케팅 (ioDrive 93K~145K IOPS, ioDrive Octal 800K IOPS / 6GB/s) | 800K IOPS | 2009~2010 | https://www.theregister.com/2009/11/23/fusion_iodrive_octal/ | 🟡 |
| C02 | Intel이 DC S3700 발표에서 **"스펙시트에 잘 없던 것: 성능 일관성(performance consistency)"**을 핵심 소구점으로 제시. QoS를 명시 스펙화 | 4KB random R/W latency **<500µs @ 99.9%**, seq write latency 65µs, 75K read / 36K write IOPS | 2012-11-05 | https://www.tomshardware.com/reviews/ssd-dc-s3700-enterprise-storage,3352-3.html | ✅ |
| C03 | Intel이 S3700 전용 **"Quality of Service" 기술 브리프**를 별도 발간 | 문서번호 329281-001US | 2013-07 | https://www.intel.com/content/dam/www/public/us/en/documents/technology-briefs/ssd-dc-s3700-quality-service-tech-brief.pdf | ✅ |
| C04 | Dean & Barroso, **"The Tail at Scale"** (CACM 56(2):74-80) — tail latency를 시스템 설계 1급 제약으로 정식화. 예: 단일 요청 p99 10ms이지만 전체 완료 p99는 140ms | p99 / p99.9 | 2013-02 | https://cacm.acm.org/research/the-tail-at-scale/ | ✅ |
| C05 | Intel 백서가 PCIe/NVMe 엔터프라이즈 SSD 벤치마킹에서 **99.99 percentile latency(QoS)**를 표준 지표로 사용 | 99.99%tile | 2015 | https://www.intel.com/content/dam/www/public/us/en/documents/white-papers/performance-pcie-nvme-enterprise-ssds-white-paper.pdf | 🟡 |
| C06 | Facebook이 FMS 2018에서 **NVM Sets**를 "일관된 QoS" 해법으로 발표. read latency 40~100배 개선 주장 | 40~100x | 2018-08 | https://medium.com/@saswatidas13/using-nvm-sets-to-mitigate-read-indeterminism-in-ssd-drives-4427b10bf776 | 🟡 |
| C07 | SNIA SDC EMEA 2018 세션 "Achieving Predictable Latency" — 예측가능 지연이 별도 어젠다로 성립 | — | 2018 | https://www.snia.org/sites/default/files/SDCEMEA/2018/Presentations/Achieving-Predictable-Latency-Solid-State-Storage-SSD-SNIA-SDC-EMEA-2018.pdf | ✅ |
| C08 | Micron 7450이 **99.9999% QoS ≤ 2ms**를 대표 스펙으로 전면 배치 (혼합 랜덤 워크로드 기준). OCP NVMe SSD 2.0 지원 | 99.9999% / 2ms | 2022-03-01 | https://www.micron.com/products/storage/ssd/data-center-ssd/7450-ssd | ✅ |
| C09 | 2020년대 엔터프라이즈 SSD 데이터시트에서 **99.9999% QoS 표기가 일반화** (예: ATP industrial/enterprise SSD) | 99.9999% | 2020년대 | https://www.atpinc.com/de/blog/SSD-Quality-of-Service-QoS-explained | 🟡 |
| C10 | Micron이 **FDP + Latency Monitor**를 "스토리지 복원력" 기능으로 묶어 설명 — QoS 관측이 벤더 기능 축으로 정착 | — | (Micron blog) | https://www.micron.com/about/blog/storage/ssd/enhancing-storage-resiliency-through-fdp-and-latency-monitor | ✅ |
| C11 | Latency Monitor 개념은 **Meta의 critical need**로 정식화되어 OCP Datacenter NVMe SSD Spec v2에 최초 포함 | — | 2021 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-0r21-pdf | ✅ |

---

## 4. 팩트 표 D — 내구성(DWPD)의 "회귀": AI 추론 / KV cache (2024–2026)

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| D01 | NVIDIA **ICMS → CMX (Context Memory eXtension)**: CES 2026-01 Jensen Huang이 ICMS로 발표, GTC 2026-03에 CMX로 개명. BlueField-4 STX 기반, 파트너 제공은 **2H2026** | — | 2026-01 / 2026-03 | https://www.solidigm.com/products/technology/what-is-cmx-context-memory-storage.html | 🟡 |
| D02 | **ScaleFlux**, NVIDIA CMX·KV cache offload 전용 SSD 플랫폼 발표. **KV cache 워크로드에서 5년 기준 7~10+ effective DWPD**, **드라이브당 200+ FDP write stream**. TLC/QLC/SLC, 최대 256TB | **7~10+ DWPD**, 200+ FDP streams | **2026-07-30** | https://www.prnewswire.com/news-releases/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload-302838473.html | ✅ |
| D03 | ScaleFlux가 명시한 문제 정의: AI 추론이 SSD를 **GPU HBM/호스트 메모리 너머의 공유 context tier**로 쓰면서 ① 실제 워크로드 파악 ② 수명이 다른 KV 블록 분리 ③ **용량 과투입·교체비 없이 고강도 쓰기 지속**의 3대 과제가 생김 | — | 2026-07-30 | https://www.hpcwire.com/off-the-wire/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload/ | ✅ |
| D04 | NVIDIA ICMSP/CMX는 **엔터프라이즈급 SSD를 요구하며 컨슈머 드라이브를 배제** — "지속적 추론 write amplification을 감당할 내구성 등급이 없기 때문" | — | 2026 | https://www.spheron.network/blog/nvidia-icmsp-kv-cache-nvme-inference-guide/ | 🟡 |
| D05 | KV 트래픽 성격: **연속적·write-heavy**. 현업 구성은 **1~3 DWPD 데이터센터 드라이브를 대역폭 확보 목적으로 다수 병렬 배치**. 컨슈머 SSD는 마모·스로틀로 "false economy" | 1~3 DWPD | 2026 | https://rdp.in/gpu-mart/knowledge-base/kv-cache-offloading-new-storage-tier-ai-inference/ | 🟡 |
| D06 | 무제한 로컬 캐싱 시 KV/context offload가 **하루 수백 GB~수 TB** 기입 → 컨슈머 NVMe TBW를 **1~2주**에 소진(5년 수명 요구 대비) | 수백GB~TB/day | 2026 | https://rdp.in/gpu-mart/knowledge-base/kv-cache-offloading-new-storage-tier-ai-inference/ | ⚠️ |
| D07 | Kioxia가 **KV cache 지원 제품으로 CM9 PCIe5 E3.S 25.6TB TLC 3 DWPD**를 명시. 근거로 "모델 파라미터 수조 단위, 컨텍스트 수백만 토큰 → KV cache 요구 급증" 제시 | 25.6TB / **3 DWPD** | 2026-03-16 | https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-1.html | ✅ |
| D08 | Kioxia Investor Day 2026: 데이터센터 내 **inference(Agentic AI·Physical AI·RAG·KV-cache) 수요 CAGR 86%** vs **training 16%**. 전사 flash 수요 CAGR 전망 20%→**22%** 상향. CMX 제품 2026년부터, NVIDIA Storage-Next 2027년부터 | 86% / 16% / 22% | **2026-06-02** | https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html | ✅ |
| D09 | Kioxia 포트폴리오 3분화: **CM(고대역폭) / GP(초저지연·초고 IOPS) / LC(초고용량 245TB)** — 즉 하나의 지표가 아니라 축별 제품 분화 | — | 2026-06-02 | https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Kioxia-Investor-Day-2026-en.pdf | ✅ |
| D10 | SK hynix **AIN Family** 공개 (OCP Global Summit 2025): **AIN P(성능)** 2026년 말 25M IOPS 샘플 → 2027년 말 100M IOPS 양산 목표, **AIN D(밀도)** 페타바이트급 QLC, **AIN B(대역폭)** HBF | 25M→100M IOPS | 2025-10 | https://news.skhynix.com/sk-hynix-presents-next-generation-nand-storage-product-strategy-at-ocp-2025/ | ✅ |
| D11 | Solidigm CSAL(캐시 SW 아키텍처)로 캐시 디바이스 **WAF를 1.0x 근처로 유지**한다고 주장 — 내구성 문제를 SW로 흡수하려는 접근 | WAF ≈ 1.0x | 2025~2026 | https://www.solidigm.com/products/technology/platform-optimization-for-performance-and-endurance-qlc-csal.html | 🟡 |
| D12 | Solidigm이 CMX용으로 제시한 드라이브는 **QLC가 아니라 Gen5 TLC D7-PS1010** ("지속적 실부하에서 높은 throughput과 예측가능 지연") | — | 2026 | https://www.solidigm.com/products/technology/icmsp-ai-inference-is-flash-storage-problem.html | 🟡 |
| D13 | Phison이 "AI·연속 데이터 스트림 시대의 write endurance" 주제로 **DWPD를 워크로드에 매칭해 조기 교체를 줄이라**는 프레이밍 제시. X202Z는 **60 DWPD**, 6.4TB에서 **384TB writes/day** | 60 DWPD / 384TB·day | 2026-08 | https://phisonblog.com/why-ssd-write-endurance-matters-in-the-age-of-ai-and-continuous-data-streams/ | 🟡 |
| D14 | AI 학습 측 쓰기 부담 근거: **checkpointing**이 모델 가중치·옵티마이저 상태를 주기적으로 기록 → write-intensive. 단일 스토리지 랙 50~100PB 규모 요구 사례 | 50~100PB/rack | 2025 | https://www.storagereview.com/review/scaling-ai-checkpoints-the-impact-of-high-capacity-ssds-on-model-training | 🟡 |

---

## 5. 팩트 표 E — 반대 증거 / 가설을 제약하는 사실

| ID | 사실 | 수치 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|
| E01 | Google 6년 현장 데이터(수백만 drive-days, MLC/SLC, 24~50nm) 결과: **RBER은 통념의 지수적 증가보다 훨씬 완만**, **사용량(use)보다 연식(age)이 오류율과 상관**. 결론: **마모 우려로 인한 과도한 over-provisioning 불필요**. 또한 MLC가 고가 SLC "엔터프라이즈" 드라이브만큼 신뢰성 확보 | 4년내 UE 경험 드라이브 20~63% | 2016-02 (USENIX FAST'16) | https://www.usenix.org/conference/fast16/technical-sessions/presentation/schroeder | ✅ |
| E02 | 2026년 조달 흐름의 주류는 **DWPD 하향**: AI 추론 서버는 **read 80% 이상**, 하이퍼스케일러가 capacity tier를 QLC로 이전. 엔터프라이즈 QLC가 **60~240TB+**로 출하 | read >80%, 0.3~1.0 DWPD | 2026 | https://www.oscoo.com/news/enterprise-ssd-buying-guide-2026/ | ⚠️ |
| E03 | 2026 구매 가이드 컨센서스: **"가장 높은 DWPD를 사지 말고 워크로드에 맞춰라"**. read-intensive AI 추론 서빙은 QLC **0.3~1.0 DWPD**로 충분하며 TLC 대비 TB당 20~30% 저렴. write-heavy(DB·학습)만 3 DWPD 이상 | 0.3~1.0 vs ≥3 DWPD | 2026 | https://www.servnetuk.com/insights/qlc-flash-enterprise-when-right-call-2026 | ⚠️ |
| E04 | 하이퍼스케일러(AWS·Azure·GCP)가 엔터프라이즈 SSD 물량의 **약 55%**를 소비하며, **단가보다 저장 밀도와 에너지 효율을 우선**. 벤더 소구 지표도 **IOPS/TB, IOPS/W, TB/W** | 55% 점유, TB/W | 2026 | https://en.unibetter-ic.com/solid-state-drive-market-2026-forecast/ | ⚠️ |
| E05 | 전력효율이 실제 비교 지표로 사용됨: Micron 6600 ION 245TB = **약 8.2TB/W** (30W 기준), "1W당 4.9TB" 표기도 존재 | 8.2TB/W | 2026 | https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay | 🟡 |
| E06 | TrendForce: nearline HDD 공급난으로 **고용량 QLC eSSD가 2026년 폭발적 출하 증가** 예상. CSP의 QLC cold data 도입 시 관건은 **데이터관리 알고리즘·SW스택 호환성·TCO 정밀 계산**(내구성이 아님) | — | 2025-09-15 | https://www.trendforce.com/presscenter/news/20250915-12714.html | 🟡 |
| E07 | TrendForce: **AI Agent 붐으로 eSSD 공급 부족**, 1Q26 상위 5개 브랜드 매출 **US$18.46B** 기록. AI 인프라용 eSSD는 고밀도 NAND 패키지·고급 컨트롤러·긴 qualification이 필요 → **LTA(장기계약)·allocation이 조달의 핵심 변수** | $18.46B (1Q26) | 2026-06-11 | https://www.trendforce.com/presscenter/news/20260611-13092.html | 🟡 |
| E08 | 북미 데이터센터 SSD 시장(2024): **mixed-use 3 DWPD가 53%**, write-intensive 10 DWPD가 2030까지 **CAGR 28%**로 최고 성장 — 고내구성 세그먼트가 소멸이 아니라 성장 중 | 53% / 28% CAGR | 2024~2030 | https://www.mordorintelligence.com/industry-reports/north-america-data-center-ssd-market | ⚠️ |
| E09 | QLC P/E cycle은 약 1,000회, SLC는 약 100,000회 — 물리적 제약은 변하지 않음. 다만 공정·펌웨어·데이터배치로 완화 중 | 1,000 vs 100,000 P/E | 2025 | https://www.oscoo.com/news/the-impact-of-ai-development-in-2025-on-the-ssd-storage-industry/ | ⚠️ |

---

## 6. 팩트 표 F — 플롯 가능한 시계열 (year, capacity, DWPD)

### F-1. 대표 제품 기준 (year, max capacity, DWPD, NAND)

| 연도 | 제품 | 최대 용량 | DWPD | NAND | 근거 ID |
|---|---|---|---|---|---|
| 2008 | Intel X25-E | 0.064 TB | ~17 (환산) | SLC | A01/A02 |
| 2012 | Intel DC S3700 | 0.8 TB | 10 | eMLC(HET) | A03 |
| 2014 | Intel DC P3700 / P3600 / P3500 | 2.0 TB | 17 / 3 / 0.3 | MLC(HET)/MLC | A04 |
| 2016 | Micron 5100 ECO/PRO/MAX | 8 TB | 1 / 1~3 / 5 | 3D eTLC | A05 |
| 2018 | Samsung PM1643 | 30.72 TB | 1 | TLC | A08 |
| 2018 | Samsung SZ985 (Z-SSD) | 0.8 TB | 30 | SLC(Z-NAND) | A07 |
| 2020 | Samsung PM1733 / PM1735 | 15.36 TB / 12.8 TB | 1 / 3 | TLC | A09 |
| 2021 | Intel D5-P5316 | 30.72 TB | ~0.41 (22,930 TBW) | QLC 144L | A12/A13 |
| 2022 | Samsung PM1743 | 15.36 TB | 1 | TLC(V6) | A15 |
| 2022 | Kioxia FL6 | 3.2 TB | 60 | SLC(XL-FLASH) | A11 |
| 2024 | Micron 9550 PRO / MAX | 30.72 / 25.6 TB | 1 / 3 | TLC 232L | A17 |
| 2024 | Samsung BM1743 | 61.44 TB | 0.26 | QLC(7th) | A18 |
| 2024 | Solidigm D5-P5336 | 122.88 TB | 0.6 (32K rnd) | QLC 192L | A19 |
| 2025 | Kioxia CM9-R / CM9-V | 61.44 / 12.8 TB | 1 / 3 | TLC BiCS8 | A22 |
| 2025 | Kioxia LC9 | 245.76 TB | 0.3 | QLC BiCS8 | A23 |
| 2025 | Micron 9650 PRO / MAX | 30.72 TB | 1 / 3 | TLC G9 | A24 |
| 2026 | Micron 6600 ION | 245 TB | 1.0 seq / 0.3 rnd | QLC G9 | A26 |
| 2026 | Kioxia CM9 (KV cache 포지션) | 25.6 TB | 3 | TLC | A28 |
| 2026 | ScaleFlux KV cache platform | 256 TB | **7~10+ (effective)** | SLC/TLC/QLC | D02 |
| 2026 | Phison Pascari X202Z | 6.4 TB | 60 | SLC | A31 |

### F-2. ⚠️ 파생 계산 — "DWPD는 떨어져도 절대 기입량은 오히려 증가"

DWPD × 용량 = 일일 허용 기입량(TB/day). 본 에이전트 계산(⚠️):

| 연도 | 제품 | DWPD × 용량 | TB/day |
|---|---|---|---|
| 2008 | X25-E 64GB | 17 × 0.064 | **1.1** |
| 2012 | DC S3700 800GB | 10 × 0.8 | **8.0** |
| 2014 | DC P3700 2TB | 17 × 2.0 | **34** |
| 2018 | PM1643 30.72TB | 1 × 30.72 | **30.7** |
| 2021 | PM9A3 15.36TB | 1 × 15.36 | **15.4** |
| 2024 | 9550 PRO 30.72TB | 1 × 30.72 | **30.7** |
| 2024 | D5-P5336 122.88TB | 0.6 × 122.88 | **73.7** |
| 2025 | LC9 245.76TB | 0.3 × 245.76 | **73.7** |
| 2026 | 6600 ION 245TB (rnd) | 0.3 × 245 | **73.5** |
| 2026 | Pascari X202Z 6.4TB | 60 × 6.4 | **384** |

→ **DWPD 수치는 17 → 0.3으로 약 50배 하락했지만, 드라이브 1대의 절대 일일 기입 허용량은 1.1 → 73.7 TB/day로 약 67배 증가.** DWPD는 "용량으로 정규화된 지표"이므로 DWPD 하락이 곧 내구성 요구 하락을 뜻하지 않는다. (⚠️ 계산값, 검증 필요)

---

## 7. 사용자 가설 판정

> 가설: "과거에는 성능지표(IOPS/대역폭)가 가장 중요했으나 → QoS(지연 꼬리, 99.99%tile)로 이동 → 지금은 내구성(DWPD)으로 이동."

### 판정: **부분 지지 · 중간 단계는 강하게 확인 · 3단계는 반증 또는 재정의 필요 (Qualified)**

**1단계 (IOPS 우위) — 🟡 부분 지지, 단 과장됨**
- 지지: 2009~2010 Fusion-io는 IOPS 절대값을 전면 마케팅 (C01).
- 반박: 같은 시기 엔터프라이즈 조달의 1차 관문은 이미 **내구성 등급**이었다. JEDEC JESD218/JESD219가 2010-09에 발행되어 내구성이 IOPS보다 먼저 표준화된 검증 항목이 되었고(B01), Intel X25-E(2008)는 이미 PB 단위 내구성을 스펙 전면에 내세웠다(A01). **"IOPS만 봤다"는 서술은 사실과 다르다. 정확히는 "IOPS가 차별화 축이었고 내구성은 이미 자격 요건(qualifier)이었다".**

**2단계 (QoS로 이동) — ✅ 강하게 지지**
- 2012-11 Intel DC S3700이 "스펙시트에 없던 지표 = 성능 일관성"을 소구점으로 내세우며 99.9% <500µs를 명시(C02), 2013-07 QoS 전용 기술브리프 발간(C03).
- 2013-02 "The Tail at Scale"이 tail latency를 시스템 1급 제약으로 정식화(C04).
- 2018 Facebook의 NVM Sets 발표(C06) → 2019-06 NVMe 1.4의 IOD/Predictable Latency Mode(B12) → 2020-03 OCP NVMe Cloud SSD Spec v1.0(B04) → **2021-07 OCP v2.0이 Latency Monitor(C3h/C5h)를 스펙 요구로 의무화**(B06, C11).
- 즉 QoS는 **마케팅 문구 → 데이터시트 스펙 → 하이퍼스케일 조달 표준 요구사항**으로 10년에 걸쳐 제도화되었다. 2022 Micron 7450의 "99.9999% QoS ≤2ms"(C08)가 정점.
- **단, QoS는 내구성에 "자리를 내준" 것이 아니라 baseline으로 굳어졌다.** OCP v2.5~v2.7은 QoS 요구를 빼지 않고 텔레메트리·FDP·전력측정을 추가했을 뿐이다(B08~B11).

**3단계 (지금은 내구성/DWPD) — ⚠️ 그대로는 반증됨. 재정의 필요**
- **반증 근거**: 2024~2026 주류 조달 방향은 DWPD **상향이 아니라 하향**이다. 대표 제품의 DWPD는 2018년 1 DWPD(30.72TB)에서 2025~2026년 **0.3 DWPD(245TB)**로 내려갔다(A08, A23, A26). AI 추론 서빙은 read 80%+이고(E02), 2026 구매 가이드는 "가장 높은 DWPD를 사지 말고 워크로드에 맞춰라"가 컨센서스(E03). 하이퍼스케일러 우선순위는 **저장 밀도·전력효율(TB/W)**과 **공급 확보(LTA/allocation)**라는 증거가 더 강하다(E04, E05, E07).
- **가설이 맞는 좁은 영역**: KV cache / context tier(CMX)라는 **새 계층**에서는 내구성이 실제 binding constraint가 되었다. ScaleFlux가 **7~10+ effective DWPD**를 명시적 제품 요구로 내걸었고(2026-07-30, D02), NVIDIA CMX 스택은 내구성 부족을 이유로 컨슈머 드라이브를 배제하며(D04), Kioxia는 KV cache 지원 제품으로 **25.6TB 3 DWPD**를 지목했다(2026-03-16, D07). Kioxia는 inference 수요 CAGR 86%를 제시했다(D08).
- **더 정확한 서술**: 내구성 축은 "이동(shift)"이 아니라 **양극화(bifurcation)**했다. 같은 2026년에 0.3 DWPD(245TB QLC capacity tier)와 60 DWPD(6.4TB SLC write tier, A31)가 동시에 팔린다. 축 자체가 하나에서 둘로 갈라진 것이다.
- **추가 반례(과거 방향)**: Google FAST'16 현장 연구는 **마모 우려로 인한 과잉 OP가 불필요**하며 사용량보다 연식이 오류율과 상관한다고 보고했다(E01). 즉 2010년대 중반 대규모 현장에서 내구성은 실제 제약이 아니었다 — 가설의 "과거엔 내구성이 덜 중요했다"는 암묵 전제는 오히려 이 근거로 지지되지만, 동시에 "지금 갑자기 내구성이 1순위가 되었다"는 주장에는 높은 입증 부담을 지운다.
- **가설을 구제하는 계산**: F-2. DWPD는 용량 정규화 지표이므로, DWPD 하락(17→0.3)에도 **드라이브당 절대 일일 기입 허용량은 1.1 → 73.7 TB/day로 증가**했다. "DWPD 숫자가 내려갔으니 내구성 요구가 내려갔다"는 해석은 잘못이다. 다만 이는 가설 그대로의 진술("내구성이 1순위 구매기준이 되었다")과는 다른 명제다. (⚠️ 계산값)

### 대안 서술안 (위키 반영 시 권장 문구 후보 — 사실 기반)
> eSSD 구매기준은 (1) **IOPS/대역폭 차별화 + 내구성 자격요건** 시대(2008~2012) → (2) **QoS/tail latency의 스펙화·표준화** 시대(2012~2021, OCP v2.0 Latency Monitor로 제도화) → (3) **용량밀도·전력효율(TB/W)·공급확보가 상위 기준이 되고, 내구성 요구는 계층별로 0.3 DWPD와 10~60 DWPD로 양극화**되는 시대(2022~2026)로 이동했다. "내구성으로 이동"은 KV cache/context tier에 한정해 성립한다.

---

## 8. 미해결 / 추가 검증 필요 항목

1. **A30 Samsung PM1763 용량·DWPD 불일치** — Samsung 뉴스룸(4/8/16TB) vs 유통 자료(3.84~61.44TB, 1 DWPD). 1차 데이터시트 확인 필요.
2. **A13 D5-P5316 DWPD 불일치** — TBW 환산 0.41 vs 표기 0.58. Solidigm product brief 원문 확인 필요.
3. **B07 OCP QoS percentile 임계표** — 검색 추출본만 확보. OCP v2.x PDF 원문에서 requirement ID와 정확한 임계값 확인 필요.
4. **하이퍼스케일러 공식 조달 문서**(Meta/Microsoft RFP 수준)에서 DWPD 최소 요구치를 직접 명시한 사례 미확보.
5. **KV cache tier의 필요 DWPD 정량 근거** — ScaleFlux의 7~10+ DWPD는 벤더 주장이며, 독립 측정치나 하이퍼스케일러 요구치 문서는 미확보.
6. Micron 9550/6550 ION의 정확한 DWPD 수치는 Micron tech product spec PDF(접근 차단)에서 재확인 필요.
7. SNIA PTS 2.0 / 2.0.1 / 2.0.2 각 판의 정확한 발행 연월 미확정.
