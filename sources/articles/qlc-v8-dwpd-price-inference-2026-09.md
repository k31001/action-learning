# QLC DWPD 정격 · QLC/TLC 가격차 · 추론 대 학습 수요 — 팩트 원장 (v8)

**수집일**: 2026-09-23
**수집자**: Research Agent (R8) — 사실 수집 전용. 전략 판단·권고 없음.
**용도**: QLC eSSD 전략 덱 v8.0 — 임원 슬라이드에 올라갈 3개 수치의 방어 가능성 검증
**방법**: WebSearch (검색엔진의 1차 문서 인용문 추출) + 레포 내 `sources/`·`wiki/` 교차 확인
**등급**: ✅ 1차(벤더 데이터시트·제품브리프·IR·SEC 공시·표준문서) / 🟡 신뢰할 만한 2차(StorageReview·ServeTheHome·Tom's Hardware·Blocks&Files·TrendForce·Gartner 인용 매체) / ⚠️ 미검증·단일출처·본 에이전트 파생계산

> ⚠️ **수집 환경 한계 (먼저 읽을 것)**: 본 세션의 egress proxy가 벤더·주요 매체 도메인 직접 fetch를 **전면 차단**했다. 차단 확인 도메인: `micron.com`, `assets.micron.com`, `americas.kioxia.com`, `kioxia-holdings.com`, `solidigm.com`, `servethehome.com`, `storagereview.com`, `blocksandfiles.com`, `businesswire.com`, `thememoryguy.com`, `sec.gov`, `newspim.com`, `handsoff.substack.com`, `servomarket.ru`. 따라서 **모든 수치는 검색엔진이 해당 1차 문서에서 추출한 인용문 기반**이며, 원 PDF의 표·각주를 직접 대조하지 못했다. 이 한계는 v6 원장(`qlc-v6-purchase-criteria-dwpd-history-2026-09.md`)과 동일하다.

> ⚠️ **본 원장의 핵심 결론 3줄**
> 1. 덱의 "QLC 0.6 DWPD"는 **틀린 숫자는 아니지만 단일 값으로 쓸 수 없다** — 같은 드라이브에서 워크로드 기준에 따라 최대 13.3배 벌어진다.
> 2. 덱의 "QLC 20~30% 저렴"의 **상단 30%는 다이 레벨 이론 상한(25%)을 초과**한다 → 물리적으로 지지 불가.
> 3. 레포가 인용해 온 Kioxia "86%"는 **CAGR이 맞다**. "증분 수요의 86%"로 기록한 레포 항목 2건은 **오독이며 정정 대상**이다. 그리고 추론 대 학습에는 **더 깨끗한 대체 수치가 있다(Gartner 55%)**.

---

## §1. QLC DWPD 제품 표 + 정격 범위 판정

### 1-A. 왜 "하나의 DWPD"가 성립하지 않는가 — 동일 드라이브 내부의 분산

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| E-01 | **DWPD는 워크로드가 정의되어야만 의미를 갖는다.** JEDEC이 내구성 등급용 워크로드를 별도 표준(JESD219/JESD219A)으로 분리한 이유가 이것 — "SSD가 받는 워크로드는 기입 가능량에 지대한 영향을 준다" | — | JESD219 2010-09 발행, JESD219A 개정 | JEDEC https://www.jedec.org/standards-documents/docs/jesd219a ; SNIA SSSI 백서(Jonmichael Hands) https://snia.org/sites/default/files/SSSI/NVMe_SAS_SATA_Endurance_White_Paper.pdf | ✅ |
| E-02 | 동일 드라이브의 TBW는 **순수 순차(128K) 기준이 JESD219A 엔터프라이즈 랜덤 기준보다 훨씬 높게** 나온다. 작은 블록 랜덤 쓰기가 WAF를 끌어올려 P/E 사이클을 빠르게 소모하기 때문 | — | 2026 | Servnet UK https://www.servnetuk.com/learn/ssd-endurance-dwpd-tbw-explained ; ATP https://www.atpinc.com/blog/ssd-tbw-dwpd-endurance | 🟡 |
| E-03 | **Micron 특허 문헌의 직접 사례**: 8TB QLC 메모리 서브시스템이 **순차 워크로드에서 0.8 fills/day**를 지원하나, **4KB 랜덤 기입으로 제시되면 0.05 fills/day**만 지원 | 0.8 vs 0.05 = **16배** | USPTO 등록 특허 12561065 | https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12561065 | ✅ (특허 명세서 기재) |

→ ⚠️ **파생**: 0.8 ÷ 0.05 = **16.0배**. 사용자가 제시한 "최대 13배"와 같은 현상이며, 실제 제품(6600 ION)에서는 13.3배로 관측된다(아래 P-06).

### 1-B. 제품별 정격 표 — 출하 중이거나 발표된 고용량 QLC eSSD 전수

**표기 규칙**: SDWPD = sequential DWPD, RDWPD = random DWPD. "기준 미공개"는 벤더가 DWPD를 발표하면서 **그 DWPD가 어떤 워크로드에서 측정된 것인지 공개 자료에서 확인하지 못했다**는 뜻이다.

| ID | 벤더 | 모델 | 용량 | NAND 세대 | **정격 DWPD (워크로드 기준)** | 보증 | TBW/PBW | 출처 | 등급 |
|---|---|---|---|---|---|---|---|---|---|
| P-01 | Solidigm | **D5-P5336** | 7.68 / 15.36 / 30.72 / **61.44 TB** | 192L QLC (3D5, 4세대 QLC), PCIe 4.0 | **0.58 DWPD @ 16KB-aligned random write** | 5년 | **65.2 PBW** (61.44TB) | StorageReview https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency ; CompSource 스펙 리스팅(0.58 DWPD 명기) https://www.compsource.com/pn/SBFPF2BV614T001/Solidigm-6455/ ; Solidigm 제품브리프 https://www.solidigm.com/products/data-center/product-briefs/d5-p5336-product-brief.html | 🟡 |
| P-02 | Solidigm | **D5-P5336** | **122.88 TB** | 상동 | **0.6 DWPD @ 32KB random write** ← 덱의 "0.6"과 일치하는 후보 ① | 5년 | **134.3 PBW** | StorageReview(상동) ; ServeTheHome https://www.servethehome.com/solidigm-d5-p5336-122-88tb-nvme-ssd-review/ ; Tom's Hardware https://www.tomshardware.com/pc-components/ssds/solidigm-reveals-122tb-ssd-the-worlds-highest-capacity-drive-for-ai-workloads-d5-p5336-offers-unlimited-write-durability | 🟡 |
| P-03 | Solidigm | D5-P5336 **4K 랜덤 기준** | 122.88 TB | 상동 | **미공개** — Solidigm은 4K 기준 DWPD를 발표하지 않는다. 대신 "32KB 랜덤이면 5년 후 내구성 5% 잔존 / 4K 랜덤이면 12% 잔존"이라는 **다른 지표**만 제시 | — | — | StorageReview(상동) | ⚠️ (지표가 달라 DWPD로 환산 불가) |
| P-04 | Kioxia | **LC9 Series** | 30.72 ~ **245.76 TB** (2.5" 및 E3.L) | BiCS8 2Tb QLC + CBA, 32-die stack, PCIe 5.0 / NVMe 2.0 | **0.3 DWPD (기준 미공개)** | 5년 | 122.88TB = **~67,000 TBW** | Kioxia PR 2025-03-13(122TB) https://americas.kioxia.com/en-us/business/news/2025/ssd-20250313-1.html ; Kioxia PR 2025-07-21(245TB) https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html ; Kioxia 제품개요 PDF https://americas.kioxia.com/content/dam/kioxia/en-us/business/ssd/enterprise-ssd/asset/KIOXIA_LC9_Product_Overview.pdf | ✅ (DWPD 값) / ⚠️ (기준) |
| P-05 | Micron | **6550 ION** | **61.44 TB** (E3.S / U.2) | G8 232L QLC, PCIe 5.0 | **8개 기준 전부 공개 — 아래 1-C 참조.** 요약: **1.00 SDWPD(128K seq) ↔ 0.25 RDWPD(4K rnd), JESD219A 0.30** | 5년 | — | Micron 기술제품사양 PDF https://assets.micron.com/adobe/assets/urn:aaid:aem:823ddb16-1baa-4439-b06c-da66b36274d5/renditions/original/as/6550-ion-nvme-ssd-tech-prod-spec.pdf ; 제품브리프 https://assets.micron.com/adobe/assets/urn:aaid:aem:9d38136b-0ec8-48e7-a248-4d584b29d519/original/as/6550-ion-nvme-ssd-product-brief.pdf | ✅ |
| P-06 | Micron | **6600 ION** | 30.72 / 122.88 / **245.76 TB** (U.2, E3.S, E3.L) | G9 QLC 6-plane, PCIe 5.0 | 245.76TB: **1.0 SDWPD (128KB seq) / 0.3 RDWPD (16K rnd) / 0.075 RDWPD (4K rnd)**. IU = 16K (30.72TB 모델은 4K IU) | 5년 | 245.76TB 0.3 기준 **≈134,554 TBW** ⚠️파생 | StorageReview https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay ; Micron 제품브리프 https://www.micron.com/content/dam/micron/global/public/products/storage/ssds/data-center/6600/6600-ion-nvme-ssd-product-brief.pdf ; ServeTheHome https://www.servethehome.com/micron-6600-ion-245tb-ssd-announced/ | 🟡 |
| P-07 | Samsung | **BM1743** | **61.44 TB** (U.2, E3.S) | 7세대(V7) QLC V-NAND, PCIe 5.0 | **0.26 DWPD (기준 미공개)**. 선대 BM1733 = 0.18 DWPD | 5년(추정) | **29,153 TBW** | Samsung 테크블로그 https://semiconductor.samsung.com/news-events/tech-blog/next-generation-qlc-v-nand-increases-data-center-profitability/ ; Blocks&Files https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/ ; ServeTheHome https://www.servethehome.com/the-samsung-bm1743-is-a-61-44tb-today-with-a-122-88tb-drive-possible/ | ✅ (DWPD·TBW) / ⚠️ (기준) |
| P-08 | Samsung | **BM1773** | **245.76 TB** (E3.S) | **9세대 2Tb QLC V-NAND**, PCIe 5.0 16채널 | **0.6 DWPD (기준 미공개)** ← 덱의 "0.6"과 일치하는 후보 ②. seq write 4.5 GB/s, random write 50K IOPS, Die Failure Recovery 탑재 | 5년 | **>260 PBW** (보도), ⚠️파생 269 PBW | Electronics Journal https://electronics-journal.com/news/114908-samsung-launches-245-76tb-bm1773-ssd-for-high-density-ai-data-centers ; 뉴스핌 2026-09-18 https://www.newspim.com/news/view/20260918000704 ; Samsung FMS 2026 뉴스룸 https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure | 🟡 |
| P-09 | SanDisk | **UltraQLC 256TB** / **SN670 128TB** | 128 / **256 TB** (U.2, 1H2026) | BiCS8 2Tb QLC, **Direct Write QLC** (pSLC 버퍼 없이 QLC 직접 기입) | **DWPD 미공개** — 2025-08-05 발표 시점에 "컨트롤러·드라이브가 최종 시험 준비 전이라 성능·내구성 데이터 없음"으로 명시 | — | — | Sandisk IR https://investor.sandisk.com/news-releases/news-release-details/sandisk-showcases-ultraqlctm-technology-platform-milestone ; StorageReview https://www.storagereview.com/news/sandisk-unveils-256tb-ultraqlc-ssd-for-data-intensive-workloads ; Tom's Hardware https://www.tomshardware.com/pc-components/ssds/sandisk-unveils-colossal-new-256tb-ssd-with-new-ultraqlc-flash-memory-enterprise-grade-ssds-for-high-density-storage-also-come-in-128tb | ✅ (미공개 사실 자체) |
| P-10 | SK hynix | **PS1012 U.2** | **61.44 TB** (2024-12 발표), 122TB(3Q25 계획), 244TB(321L, 계획) | 238L QLC, PCIe 5.0, OCP 2.0 | **DWPD 미공개** — seq read 13 GB/s만 공개 | — | — | SK hynix 뉴스룸 https://news.skhynix.com/sk-hynix-develops-ps1012-ssd-for-ai-data-centers/ ; PRNewswire https://www.prnewswire.com/news-releases/sk-hynix-develops-ps1012-u2-high-capacity-ssd-for-ai-data-centers-302334355.html ; Blocks&Files https://blocksandfiles.com/2024/12/18/sk-hynix-joins-high-capacity-ssd-club-and-aims-to-lead-from-the-front/ | ⚠️ (부재의 증거) |
| P-11 | ScaleFlux | **CSD5000** | 4 ~ **128 TB** physical NAND (U.2 / E3.S / E1.S / E1.L) | TLC·QLC 혼용 플랫폼, NVMe 2.0b, FDP·ZNS 지원 | 리뷰 대상 모델은 **1 DWPD 설계**, 압축으로 "통상 1DWPD SSD의 최대 6배 내구성" 주장. **128TB QLC 구성의 정격 DWPD는 미공개** | — | — | TechPowerUp https://www.techpowerup.com/325101/scaleflux-reveals-the-revolutionary-csd5000-for-the-ai-era ; ScaleFlux 데이터시트 https://scaleflux.com/library/csd5000-data-sheet/ ; TweakTown https://www.tweaktown.com/reviews/11169/ | ⚠️ |
| P-12 | ScaleFlux | **KV cache / CMX 플랫폼** | 최대 **256 TB** | SLC / TLC / QLC | **7~10+ effective DWPD** — 단, "effective"는 압축·FDP(드라이브당 200+ write stream) 적용 후의 **KV cache 워크로드 기준 실효값**이며 **NAND 정격 DWPD가 아니다** | 5년 | — | PRNewswire 2026-07-30 https://www.prnewswire.com/news-releases/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload-302838473.html ; StorageReview https://www.storagereview.com/news/scaleflux-kv-cache-ssd-platform-claims-7-10-dwpd-and-200-fdp-streams | ✅ (발표 사실) / ⚠️ (정격과 혼동 금지) |

### 1-C. 핵심 증거 — Micron 6550 ION의 워크로드별 정격 전체 표 (같은 드라이브, 같은 용량)

| 워크로드 기준 | 정격 |
|---|---|
| 100% 128KB **순차** 기입 | **1.00 SDWPD** |
| 100% 16KB 랜덤 기입 | **1.00 RDWPD** |
| 90% 16KB / 10% 4KB 랜덤 | 0.90 RDWPD |
| 70% 16KB / 30% 4KB 랜덤 | 0.75 RDWPD |
| 50% 16KB / 50% 4KB 랜덤 | 0.60 RDWPD |
| 100% 8KB 랜덤 | 0.50 RDWPD |
| 100% 4KB 랜덤 | **0.25 RDWPD** |
| **JESD219A 워크로드 믹스** | **0.30 DWPD** |

출처: Micron 6550 ION SSD Series Technical Product Specification (✅). ⚠️ **파생**: 1.00 ÷ 0.25 = **4.0배** (동일 드라이브·동일 용량·동일 보증기간에서의 분산).

**Micron 6600 ION 245.76TB의 동일 분산**: ⚠️ **파생**: 1.0(128K seq) ÷ 0.075(4K rnd) = **13.33배**. 사용자가 제시한 "최대 13배"가 여기서 나온다.

> ⚠️ **확보하지 못했다**: 6600 ION의 **JESD219A 기준 DWPD**. 검색어 — "Micron 6600 ION JESD219A", "6600 ION technical product specification endurance SDWPD RDWPD". 6550 ION에 대해서만 JESD219A 값을 확보했다. 6600 ION 제품브리프 PDF는 `micron.com` 도메인 차단으로 직접 대조 불가.

### 1-D. 수치 검산 (⚠️ 전부 본 에이전트 파생 — 산술 명시)

DWPD → TBW 환산식: `TBW = DWPD × 용량(TB) × 365 × 보증연수(5)`

| 제품 | 계산 | 결과 | 벤더 공표값 | 일치 여부 |
|---|---|---|---|---|
| Samsung BM1743 61.44TB | 29,153 ÷ (61.44 × 365 × 5) = 29,153 ÷ 112,128 | **0.260** | 0.26 DWPD | ✅ 일치 |
| Solidigm D5-P5336 61.44TB | 0.58 × 61.44 × 365 × 5 | **65,038 TB = 65.0 PBW** | 65.2 PBW | ✅ 일치 (반올림차) |
| Solidigm D5-P5336 122.88TB | 0.6 × 122.88 × 365 × 5 | **134,554 TB = 134.6 PBW** | 134.3 PBW | ✅ 일치 (반올림차) |
| Kioxia LC9 122.88TB | 0.3 × 122.88 × 365 × 5 | **67,277 TB ≈ 67,000 TBW** | ~67,000 TBW | ✅ 일치 |
| Kioxia LC9 245.76TB | 0.3 × 245.76 × 365 × 5 | **134,554 TB ≈ 134,000 TBW** | (미공표) | — |
| Samsung BM1773 245.76TB | 0.6 × 245.76 × 365 × 5 | **269,107 TB = 269 PBW** | ">260 PBW" 보도 | ✅ 일치 |

> ⚠️ **출처 간 충돌 기록 #1 — 2차 매체의 용량 혼동**: 일부 2차 자료가 "LC9의 0.3 DWPD는 **245TB 모델** 기준 5년간 약 67,000TB 기입"이라고 서술한다. 위 검산에 따르면 **67,000 TBW는 122.88TB 모델의 값**이고, 245.76TB 모델은 **약 134,000 TBW**다. 2차 매체가 두 용량을 뒤섞었다. **덱에 "LC9 245TB = 67,000 TBW"를 쓰면 정확히 절반의 오류가 된다.**

> ⚠️ **출처 간 충돌 기록 #2 — Solidigm D5-P5316(선대) 내구성**: 레포 v6 원장 A13이 이미 기록 — 30.72TB의 22,930 TBW를 환산하면 **0.41 DWPD**인데 별도 유통 스펙에는 **0.58 DWPD** 표기가 존재한다. 이번 수집에서도 해소하지 못했다.

> ⚠️ **출처 간 충돌 기록 #3 — Solidigm D5-P5336 122TB PBW**: 레포 v6 원장 A19이 "134.3 PBW (일부 표기 137,523 TBW)"로 두 값을 기록했다. 이번 수집의 주류 표기는 **134.3 PBW**다.

### 1-E. 부정 확인 (요청 목록 중 존재하지 않거나 공개되지 않은 것)

| ID | 대상 | 결과 |
|---|---|---|
| N-01 | **Solidigm D5-P5810** | **존재하지 않는다.** Solidigm의 P5810은 **D7-P5810이며 QLC가 아니라 SLC**다. 정격 **50 DWPD(랜덤) / 65 DWPD(순차)**, 73 PBW, 800GB급. 용도는 QLC(D5-P5336)의 **영구 쓰기 버퍼**. 검색어: "Solidigm D5-P5810 QLC". 출처: TechPowerUp https://www.techpowerup.com/314097/ ; Solidigm 제품브리프 https://www.solidigm.com/products/data-center/product-briefs/d7-p5810-product-brief.html ; Mouser 미러 https://www.mouser.com/datasheet/2/1471/SK_hynix_Solidigm_D7_P5810_ProductBrief-3314967.pdf |
| N-02 | **Kioxia LC8** | **공개 제품으로 확인하지 못했다.** 검색어: "Kioxia LC8", "Kioxia LC8 SSD QLC enterprise capacity endurance", "Kioxia LC8 series QLC SSD announcement DWPD". 모든 검색이 **LC9만** 반환. Kioxia의 고용량 QLC 엔터프라이즈 라인은 현재 LC9 단일 계열로 보인다. |
| N-03 | **SanDisk/WD QLC DC 파트의 DWPD** | **어느 시점에도 공개된 적이 없다.** 256TB UltraQLC·SN670 128TB 모두 2025-08 발표 시점에 내구성 데이터 부재를 명시했고, 2026-09 현재까지 추가 공개를 확보하지 못했다. |
| N-04 | **SK hynix QLC 파트의 DWPD** | **확보하지 못했다.** PS1012(61.44TB) 발표자료·보도 어디에도 DWPD가 없다. 검색어: "PS1012 DWPD", "SK hynix PS1012 endurance rating QLC 238-layer". |
| N-05 | **Samsung BM1773·BM1743, Kioxia LC9의 DWPD 근거 워크로드** | **세 제품 모두 확보하지 못했다.** Kioxia는 "랜덤 쓰기 성능은 모델별 정의된 IU 크기의 랜덤 쓰기 워크로드 기준"이라고 **성능**에 대해서만 밝히고, **DWPD의 근거 워크로드**는 밝히지 않는다. Samsung은 양 제품 모두 근거 미공개. |
| N-06 | **JESD219/JESD219A 기준 DWPD를 공개한 벤더** | 이번 수집에서 확보한 것은 **Micron 6550 ION(0.30 DWPD) 단 하나**다. Solidigm·Kioxia·Samsung·SanDisk·SK hynix·ScaleFlux 중 JESD219 기준값을 공개한 곳을 찾지 못했다. |

### 1-F. 정격 범위 판정 ⭐

**(1) "고용량 QLC eSSD 정격 DWPD"의 방어 가능한 범위**

| 구분 | 범위 | 근거 |
|---|---|---|
| **워크로드 기준을 섞은 전체 범위** (공개 정격만) | **0.075 ~ 1.0 DWPD** | 하한 = Micron 6600 ION 245TB @4K 랜덤(0.075), 상한 = Micron 6550/6600 ION @128K 순차(1.00) |
| **각 벤더 헤드라인 값만 모은 범위** | **0.26 ~ 0.6 DWPD** | 하한 Samsung BM1743(0.26), 상한 Solidigm D5-P5336 122TB(0.6) 및 Samsung BM1773(0.6) |
| **랜덤 쓰기 기준으로 비교 가능한 값만** | **0.075(4K) ~ 1.00(16K)** | Micron 두 모델이 유일하게 전 기준 공개. Solidigm 0.58(16K)·0.6(32K) |
| **JESD219A 기준** | **0.30 단 1점** | Micron 6550 ION. **범위를 구성할 수 없다** |

**(2) 245TB급 한정 범위**

| 제품 | 헤드라인 DWPD | 기준 공개? | 전 기준 분산 |
|---|---|---|---|
| Kioxia LC9 245.76TB | **0.3** | ❌ 미공개 | — |
| Micron 6600 ION 245.76TB | **0.3** (16K 랜덤) | ✅ 3개 기준 공개 | **0.075 ~ 1.0** |
| Samsung BM1773 245.76TB | **0.6** | ❌ 미공개 | — |
| SanDisk UltraQLC 256TB | 미공개 | — | — |
| SK hynix 244TB(계획) | 미공개 | — | — |

→ **245TB급 헤드라인 범위 = 0.3 ~ 0.6 DWPD (2배 차이)**, **기준 포함 전체 범위 = 0.075 ~ 1.0 DWPD (13.3배 차이)**.

**(3) 덱의 "QLC 0.6 DWPD"에 대한 판정**

- **날조된 숫자가 아니다.** Solidigm D5-P5336 122.88TB(32K 랜덤 기준) 또는 Samsung BM1773(기준 미공개) 둘 중 하나와 정확히 일치한다.
- 그러나 **범위 상단의 헤드라인 하나를 전체 범주의 대표값으로 쓴 것**이며, 같은 245TB급의 Kioxia LC9(0.3)·Micron 6600 ION(0.3 @16K)의 **2배**, Micron 6600 ION의 4K 기준(0.075)의 **8배**다.
- **가장 심각한 문제는 0.6이라는 값 자체가 아니라, 0.6·0.3·0.3 세 값 중 두 개(Samsung·Kioxia)의 근거 워크로드가 공개되지 않아 애초에 나란히 비교할 수 없다는 점**이다.

---

## §2. QLC/TLC 가격차 판정 — 슬라이드에 %를 쓸 수 있는가

### 2-A. 레포의 기존 근거: VDURA Flash Volatility Index (유일한 공개 $/TB 인덱스)

| 시점 | 30TB TLC 드라이브가 | TLC $/TB | 30TB QLC 드라이브가 | QLC $/TB | **QLC/TLC 가격비** | QLC 할인폭 |
|---|---|---|---|---|---|---|
| 2Q25 | $3,062 | $102 | — | — | — | — |
| 3Q25 | $3,460 | $115 | $2,768 | $92 | **0.8000** | **−20.0%** |
| 1Q26 (2026-04 릴리스) | $17,500 (+472%) | $583 | $15,121 | $504 | **0.8641** | **−13.6%** |
| 3Q26 (2026-08-11 릴리스) | **$22,600** | **$753** | **$18,080** | **$603** | **0.8000** | **−20.0%** |

출처: VDURA 2026-08-11 https://www.vdura.com/2026/08/11/ssd-prices-settle-into-a-costly-new-normal-at-6-5x-year-ago-levels-reshaping-the-economics-of-ai-factories-vdura-flash-volatility-index-shows/ · VDURA 2026-04-08 https://www.vdura.com/2026/04/08/vdura-says-30-tb-qlc-ssd-capacity-now-costs-22-6x-more-than-hdd/ · StorageReview https://www.storagereview.com/news/enterprise-ssd-prices-run-at-6-5x-last-year-vdura-pegs-a-30tb-tlc-drive-at-22600 · Tom's Hardware https://www.tomshardware.com/pc-components/ssds/vdura-sharply-revises-its-enterprise-ssd-pricing-figures · Blocks&Files https://www.blocksandfiles.com/flash/2026/08/11/ssd-prices-still-rocketing-up-faster-than-disk/5286189 · 레포 미러 `sources/articles/qlc-essd-market-size-forecast-data-2026-09.md` §3.3 — 등급 🟡

> ⚠️ **파생 + 방법론 경고 (중요)**: 가격비 산술 — 2,768 ÷ 3,460 = **0.8000**; 15,121 ÷ 17,500 = **0.8641**; 18,080 ÷ 22,600 = **0.8000**.
> 3개 시점 중 **2개가 소수점 넷째 자리까지 정확히 0.8000**이다. 이는 VDURA가 QLC를 TLC의 0.8배로 **모델링(가정)**했을 가능성을 강하게 시사한다 — 즉 **독립적으로 관측된 QLC 거래가가 아닐 수 있다**. VDURA는 인덱스의 QLC 가격 산출 방법론을 공개하지 않았고(검색어: "VDURA Flash Volatility Index methodology QLC"), 본 에이전트는 이를 확인하지 못했다. **따라서 VDURA의 −13~−20%를 "관측된 시장 가격차"로 인용하면 안 된다.**

### 2-B. TrendForce·기타 가격 기관 — 부정 확인

| ID | 사실 | 등급 |
|---|---|---|
| C-01 | **TrendForce는 공개 보도자료에서 QLC와 TLC의 $/TB를 분리해 발표하지 않는다.** 공개된 것은 eSSD 계약가 **상승률**(1Q26 +53~58% 전망 → 실적 약 +80%, 2Q26 NAND +70~75%)과 **벤더별 매출**(1Q26 상위 5사 $18.46B, 2Q26 $37.59B)뿐이다. QLC 관련 서술도 "Samsung의 176단 QLC 대량 출하", "Solidigm의 초고용량 QLC 강세" 같은 **물량 서술**이며 가격차가 아니다. 검색어: "TrendForce QLC TLC price per TB", "enterprise SSD contract price QLC TLC 2026", "TrendForce QLC premium percentage". 출처: TrendForce https://www.trendforce.com/presscenter/news/20260611-13092.html · https://www.trendforce.com/presscenter/news/20260901-13210.html · https://www.trendforce.com/presscenter/news/20260921-13246.html | ⚠️ (부재의 증거) |
| C-02 | **DRAMeXchange·Forward Insights의 QLC/TLC $/TB 분리 시계열도 확보하지 못했다.** 유료 리포트 뒤에 있거나 공개되지 않는다. | ⚠️ |
| C-03 | **유통 실거래가로는 산출이 불가능하다.** 동일 제품 Solidigm D5-P5336 61.44TB가 2026-09 시점 CompSource **$25,527.86 ($415.7/TB)** vs ShopBLT **$16,245.78 ($264.7/TB)**. ⚠️파생: 25,527.86 ÷ 16,245.78 = **1.571배**. 같은 SKU의 유통가 분산(57%)이 QLC/TLC 프리미엄(13~20%)보다 **3배 이상 크다**. 출처: CompSource https://www.compsource.com/pn/SBFPF2BV614T001/Solidigm-6455/ ; ShopBLT https://www.shopblt.com/item/solidigm-d5-p5336-61.44tb-2.5in-pcie/750y_sbfpf2bv614t001.html ; Tom's Hardware https://www.tomshardware.com/pc-components/ssds/worlds-highest-capacity-ssd-sees-retail-price-hikes-solidigm-61-44tb-ssd-pricing-nearly-doubles | ⚠️ |

### 2-C. 다이 레벨 이론 상한 — 이번 수집의 결정적 근거 ⭐

| ID | 사실 | 수치 | 출처 | 등급 |
|---|---|---|---|---|
| C-10 | TLC(3 bit/cell) → QLC(4 bit/cell)는 **같은 셀에서 비트 수를 +33% 늘린다**(4/3 = 1.333) | +33% 비트 | 업계 공통 산술 | ✅ |
| C-11 | 그러나 **비트당 원가 절감은 +33%가 아니라 −25%다**. ⚠️**파생 산술**: 원가가 셀(면적)에 비례한다고 볼 때 비트당 원가비 = **3/4 = 0.75** → 절감률 **1 − 0.75 = 25%**. (+33%와 −25%는 같은 사실의 두 표현이며, **가격 할인율로 쓸 수 있는 것은 25% 쪽**이다) | **−25%** | 본 에이전트 파생 (아래 C-12가 독립 확인) | ⚠️ 파생 |
| C-12 | **Jim Handy(Objective Analysis / The Memory Guy)**가 같은 결론을 독립적으로 제시: "**QLC is only 25% better capacity than TLC** ... definitely diminishing returns". 단계별 절감: **SLC→MLC 50% / MLC→TLC 33% / TLC→QLC 25% / QLC→PLC 20%**. 또한 "**TLC→QLC의 원가 이점은 SLC→MLC 이점의 절반에 불과하다**" | **25%** | The Memory Guy https://thememoryguy.com/slc-to-mlc-to-tlc-to-qlc-to-plc-diminishing-returns/ ; StorageNewsletter 재인용 https://www.storagenewsletter.com/2019/10/04/history-of-slc-mlc-tlc-and-what-to-expect-from-qlc/ | 🟡 (전문 애널리스트 단일 출처, 다만 산술이 C-11과 독립 일치) |
| C-13 | Handy는 25%조차 **일부 상쇄된다**고 지적: QLC는 전압 임계가 좁아 **ECC 오버헤드가 증가**하고(BCH→LDPC), **더 정교한 컨트롤러**를 요구한다. 그는 PLC 사례에서 "20% 절감은 더 정교한 컨트롤러·오류정정 요구로 부분 상쇄된다"고 명시 | — | 상동 ; The Register https://www.theregister.com/2020/11/30/how_ibm_soups_up_qlc/ | 🟡 |
| C-14 | ⚠️ **파생 함의**: 드라이브 레벨 $/TB 절감은 다이 레벨 25%보다 **반드시 작다**. 컨트롤러·DRAM 버퍼·PCB·전원부·펌웨어·패키징·보증 비용은 TLC와 QLC가 **공통으로 부담**하므로, NAND 원가 절감분이 드라이브 BOM 전체에 희석되기 때문이다. (Micron 6600 ION 245TB의 16GB DRAM 탑재가 이 공통원가의 예) | — | 본 에이전트 추론 | ⚠️ |

### 2-D. 벤더 주장 (반드시 "벤더 주장"으로 라벨링할 것)

| ID | 주체 | 주장 | 비고 | 등급 |
|---|---|---|---|---|
| C-20 | **Solidigm** (Signal65 Lab 백서) | QLC SSD는 TLC SSD 대비 **전력효율 19.5% 우위**, TLC+HDD 하이브리드 대비 **79.5% 우위** | **$/TB가 아니라 전력효율**이다. 가격차 근거로 전용 금지 | 🟡 (벤더 의뢰 백서) |
| C-21 | **Solidigm** | D5-P5536 계열이 TLC 대비 **CAPEX 절감 + OPEX 절감**을 "성능 손실 거의 없이" 달성 | **퍼센트 미제시**. Solidigm은 TCO 추정기 툴로 안내할 뿐 공개 %를 내지 않는다. 검색어: "Solidigm QLC TCO $/TB versus TLC cost savings percentage" → 확보 실패 | 🟡 (정성 주장) |
| C-22 | **Micron** (FY26 실적발표) | "세계 QLC 리더", 분기 **QLC 비트 믹스 사상 최고** | **비트당 원가 우위를 퍼센트로 제시한 적 없다.** Q1~Q3 FY2026 실적발표 전문 검색 결과 수치 부재 | ⚠️ (부재의 증거) |
| C-23 | **Kioxia** | 고용량 QLC(LC9)를 생성형 AI용 밀도 해법으로 포지셔닝 | **QLC/TLC 가격차 공개 발언 확보 실패** | ⚠️ |

### 2-E. ⚠️ 사용 금지 — 신뢰할 수 없는 수치

| ID | 주장 | 왜 쓰면 안 되는가 |
|---|---|---|
| C-30 | "2026년 QLC 드라이브 원가 목표 **$0.03~0.04/GB, TLC의 약 1/3**" (datastoragereport, oretonstorage 등) | **TLC 대비 −67%**를 함의한다. 다이 레벨 이론 상한 −25%와 **정면 모순**. 1차 출처 없음. SEO 콘텐츠 팜. 출처: https://datastoragereport.com/qlc-nand-explained-high-capacity-at-lower-cost-in-2026/ · https://oretonstorage.com/blog/nand-flash-tlc-qlc-plc-2026 |
| C-31 | "QLC는 TLC 대비 GB당 **15~25% 저렴**" (datastoragereport, "Q4 2025 기준, 2026-04 검증") | 범위 자체는 이론 상한 안에 들어오나 **1차 출처가 없고**, 같은 문서가 C-30의 모순된 주장도 함께 싣는다. VDURA 재인용 가능성. |
| C-32 | 레포 v6 원장 E03이 기록한 "QLC가 TLC 대비 **TB당 20~30% 저렴**" (servnetuk 2026 구매가이드) | **덱 문장의 실제 출처가 이것으로 보인다.** 원 출처는 영국 리셀러의 구매 가이드 블로그이며 1차 가격 데이터가 아니다. v6 원장에서도 이미 ⚠️ 등급이었다. 출처: https://www.servnetuk.com/insights/qlc-flash-enterprise-when-right-call-2026 |

### 2-F. 판정 ⭐ — **슬라이드에 특정 %를 쓸 수 없다**

**결론: 방향만 쓰라(direction only). 단일 퍼센트는 방어 불가.**

근거 요약:
1. **덱의 "20~30%"는 상단이 물리적으로 불가능하다.** TLC→QLC의 비트당 원가 절감 **이론 상한은 25%**(C-11·C-12)이고, 드라이브 레벨은 공통 BOM 희석으로 그보다 **작아야 한다**(C-14). **30%는 다이 레벨 상한조차 넘는다.**
2. **관측 데이터가 하나뿐이고, 그 하나도 독립 관측이 아닐 수 있다.** 공개된 eSSD $/TB 인덱스는 VDURA 단 하나이며, 3개 시점 중 2개의 QLC/TLC 비율이 **정확히 0.8000**이라 모델 가정일 가능성이 크다(2-A 경고).
3. **TrendForce를 포함한 어떤 가격 기관도 QLC/TLC $/TB를 분리 공개하지 않는다**(C-01·C-02). "TrendForce에 따르면 QLC가 X% 싸다"는 문장은 **성립하지 않는다.**
4. **유통 실거래가는 동일 SKU 내 분산(1.57배)이 구하려는 차이(13~20%)보다 3배 이상 크다**(C-03).
5. **벤더 누구도 QLC/TLC $/TB 퍼센트를 공개하지 않는다**(C-20~C-23).

**만약 임원이 굳이 숫자를 요구한다면**, 쓸 수 있는 유일한 형태는 다음 두 개를 **함께** 제시하는 것이다:
- **다이 레벨 이론 상한: 비트당 −25%** (셀당 비트 3→4의 산술, Objective Analysis 확인) — 이것이 **천장**이다
- **2026년 유일 공개 지수(VDURA 30TB): −13~−20%** — 단, "방법론 미공개, 벤더 아닌 스토리지 시스템 업체의 모델값" 주석 필수

---

## §3. 추론 대 학습 수요

### 3-A. Kioxia가 실제로 말한 것 — 확정

| ID | 사실 | 수치 | 출처 | 등급 |
|---|---|---|---|---|
| I-01 | **Kioxia Investor Day 2026 (2026-06-02), 슬라이드 15.** 스크립트 원문: "**Within this segment, inference AI applications will serve as a primary growth catalyst, and are likely to achieve an estimated CAGR of 86%.**" | **86% = CAGR** | Kioxia Holdings IR 스크립트 https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Kioxia_Investor_Day_2026_en_script.pdf ; 발표자료 https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Kioxia-Investor-Day-2026-en.pdf ; PR https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html ; 요약 https://handsoff.substack.com/p/kioxia-investor-day-flash-memory | ✅ (IR 1차 / PDF 직접 열람은 차단, 검색엔진 추출 인용) |
| I-02 | **기간과 대상**: 데이터센터(DC) 세그먼트 **내부**에서, 추론 관련 수요(Agentic AI·Physical AI·RAG·KV-cache)가 **CY25–CY28E CAGR 86%**, **학습은 CAGR 16%** | 86% vs 16% | 상동 | ✅ |
| I-03 | **데이터센터 NAND 수요: 295 EB (CY25) → 909 EB (CY28), CAGR 46%** | 295 → **909 EB** | 상동 | ✅ |
| I-04 | **전체 flash 수요: ~997 EB (CY25) → 1,807 EB (CY28), CAGR 22%** (종전 전망 20%에서 상향) | 997 → **1,807 EB** | 상동 | ✅ |
| I-05 | **CY28에 DC가 전체 수요의 약 50% 차지** | ~50% | 상동 | ✅ |
| I-06 | 자본배분: 향후 3년간 연평균 CapEx **¥4,700억**, R&D **¥2,300억** | — | 상동 ; TrendForce https://www.trendforce.com/news/2026/06/03/news-kioxia-targets-%C2%A5470b-yearly-capex-in-fy26-28-up-66-from-fy25-reportedly-weighing-third-kitakami-fab-and-ma/ | ✅ |

**⚠️ 내부 정합성 검산 (본 에이전트 파생)** — 네 수치가 서로 모순 없이 맞물린다:
- DC CAGR: 909 ÷ 295 = 3.081 → 3.081^(1/3) = 1.4553 → **+45.5% ≈ 46%** ✅
- 전체 CAGR: 1,807 ÷ 997 = 1.8125 → 1.8125^(1/3) = 1.2194 → **+21.9% ≈ 22%** ✅
- CY28 DC 비중: 909 ÷ 1,807 = **50.3% ≈ ~50%** ✅

→ **판정 (a): Kioxia의 86%는 CAGR이다. "증분 데이터센터 수요의 86%"가 아니다.**

### 3-B. ⚠️ 레포 내부 모순 — 정정 필요 항목 2건

| 위치 | 현재 기록 | 문제 | 정정안 |
|---|---|---|---|
| `sources/articles/qlc-v7-hbm-to-storage-shift-2026-09.md` **V-21** | "데이터센터 NAND 수요: **295 EB(2025) → 1,807 EB(2028)**; **AI 추론이 증분 DC 수요의 86%**" | **오류 2건.** ① 86%는 **CAGR**이지 증분 점유율이 아니다. ② **1,807 EB는 전체 flash** CY28 수치이고 **데이터센터는 909 EB**다 | "데이터센터 NAND 수요 **295 EB(CY25) → 909 EB(CY28), CAGR 46%**. 그 안에서 **추론 관련 수요 CAGR 86%, 학습 16%**. 전체 flash는 997 → 1,807 EB, CAGR 22%" |
| `sources/articles/qlc-v7-hbm-to-storage-shift-2026-09.md` **§결론 4번 문장** | "...데이터센터 NAND 수요가 2025년 295 EB에서 2028년 1,807 EB로 커지며 **그 증분의 86%가 AI 추론**이라고 전망했다" | 위와 동일한 2건 | 상동 |
| `wiki/concepts/hbm-to-storage-spillover.md` **5행** | "Kioxia는 DC NAND 2025 295EB → 2028 1,807EB, **증분의 86%가 AI 추론**" | 위와 동일한 2건 | 상동 |

**올바르게 기록된 항목**(참고): `qlc-v6-purchase-criteria-dwpd-history-2026-09.md` D08, `qlc-essd-market-size-forecast-data-2026-09.md` §2·§4, `wiki/concepts/essd-purchase-criteria-shift.md`, `memory-capex-outlook-2027-2028-2026-08-26.md` — 모두 **CAGR**로 정확히 기록.

> ⚠️ 이 원장은 `index.md`·`log.md`를 수정하지 않는다(부모 세션 담당). 위 3개 파일의 정정도 부모 세션이 판단할 사항이며, 본 원장은 **불일치 사실만 기록**한다.

### 3-C. 독립 교차검증 — 추론으로의 이동 ⭐

| ID | 출처 | 수치 | 일자 | 분모(중요) | 등급 |
|---|---|---|---|---|---|
| I-10 ⭐ | **Gartner** — "AI-Optimized IaaS Spending to Grow 96% in 2026" | **2026년 AI 최적화 IaaS 지출의 55%가 추론**, **2027년 59%**로 상승. **2026년 추론 지출 $23.3B가 학습 $19.0B를 사상 최초로 추월.** 전체 AI 최적화 IaaS $42B (+96% YoY) | **2026-08-10** | **AI 최적화 IaaS 지출액** | ✅ (Gartner 공식 보도자료) |
| I-11 | 상동 검산 ⚠️파생 | 23.3 + 19.0 = **42.3 ≈ $42B** ✅ ; 23.3 ÷ 42.3 = **55.1% ≈ 55%** ✅ → 내부 정합 | — | — | ⚠️ 파생 |
| I-12 | **NVIDIA** — Form 10-K FY2024 및 Q4 FY2024 실적발표 | "**In the past year, approximately 40% of Data Center revenue was for AI inference.**" | **2024-02** (FY2024 종료 2024-01-28) | **NVIDIA 데이터센터 매출** | ✅ (SEC 공시) |
| I-13 | **NVIDIA — 이후 미공시 (부재의 증거)** | FY2026 10-K(FY 종료 2026-01-25, DC 매출 **$193.7B**, 전체 $215.9B)에 **추론/학습 분할 수치가 없다.** 경영진 코멘트도 "training과 inference가 각각 지수적으로 성장"이라는 정성 서술뿐 | 2026-02 | — | ⚠️ (부재의 증거) |
| I-14 | **NVIDIA 경영진 발언** (FY2026~FY2027 실적발표) | "AI 추론 토큰 생성이 **1년 만에 10배** 증가". Jensen Huang: "**we are growing share in inference, and we're growing share in inference very, very quickly**". 경영진이 반복적으로 "**inference equals revenues**"로 프레이밍 | 2026 | **토큰 수 / 정성 서술** | 🟡 (수치 분할 아님) |
| I-15 | **TrendForce** — "Agentic AI Drives Structural Expansion in Memory Demand" | "AI 컴퓨팅의 초점이 학습에서 추론으로 이동 중이며, **2029년에는 AI 추론이 AI 서버 수요의 주 동인이 될 것**" | **2026-05-29** | **AI 서버 수요** | 🟡 (방향성, 수치 분할 없음) |
| I-16 | **IDC** | AI 인프라 지출 2026년 **$497B** (+56% YoY), 2029년 $758B. **추론/학습 분할은 공개 자료에서 확보하지 못했다** | 2026 | — | 🟡 / ⚠️(분할 부재) |
| I-17 | **Gartner (별건)** | 에이전틱 워크플로 **건당 추론 비용이 2028년까지 5배 이상 증가**할 것 | **2026-08-17** | 워크플로 단가 | 🟡 |

> ⚠️ **출처 간 충돌 기록 #4 — 전환 시점이 기관마다 다르다**: Gartner는 **2026년에 이미 추론 지출이 학습을 추월**한다고 본다(I-10). TrendForce는 **2029년**을 추론이 AI 서버 수요의 주 동인이 되는 시점으로 본다(I-15). **두 수치의 분모가 다르다** — Gartner는 *AI 최적화 IaaS 지출액*, TrendForce는 *AI 서버 수요*. **섞어 쓰면 안 된다.**

> ⚠️ **출처 간 충돌 기록 #5 — 반대 방향 데이터 (전력 용량 기준)**: 2차 집계에 "**AI 학습 워크로드가 5 GW, AI 추론이 2 GW**의 데이터센터 용량을 사용했다"는 기술이 있다. 전력 용량 기준으로는 **아직 학습이 2.5배**라는 뜻이다. ⚠️ **원 출처와 기준 연도를 확보하지 못했다** — 검색어: "AI training 5 GW AI inference 2 GW data center capacity split", "IEA SemiAnalysis training inference GW". programs.com 데이터센터 통계 집계 경유 https://programs.com/resources/data-center-statistics/ . **만약 이 수치가 사실이라면 지출 기준(Gartner 55%)과 전력 기준이 반대 방향이다.** 덱에서 "추론이 이미 더 크다"고 쓸 때 **반드시 분모를 명시**해야 한다.

> ⚠️ **출처 간 충돌 기록 #6 — 국내 매체 단위 오역**: e4ds뉴스가 같은 Gartner 릴리스를 "**약 59조 달러**"로 보도했다 (https://www.e4ds.com/sub_view.asp?idx=23382&lang=en). Gartner 원 릴리스는 **$42 billion**이다. 국내 매체 재인용 금지.

### 3-D. 확보하지 못한 것 (부정 확인)

| ID | 대상 | 검색어 | 결과 |
|---|---|---|---|
| I-20 | **하이퍼스케일러 개별 기업의 "추론이 우리 AI capex의 X%" 공식 발언** (Microsoft·Google·Amazon·Meta) | "hyperscaler inference share of AI capex percentage", "Satya Nadella inference share compute capacity" | **확보하지 못했다.** 공개된 것은 2026년 capex 총액(빅4 합계 $600~690B, Amazon $200B, Google $175~185B)뿐이며 추론/학습 분할 공식 수치는 없다 |
| I-21 | **Omdia의 추론/학습 분할** | "Omdia AI infrastructure inference versus training share" | **확보하지 못했다** |
| I-22 | **IDC의 추론/학습 분할** | "IDC inference vs training spending split 2026" | **확보하지 못했다** (총액만 공개) |
| I-23 | **MLPerf / 서빙 플릿 공개 데이터 기반 추론 비중** | "MLPerf serving fleet inference share disclosure" | **확보하지 못했다** |
| I-24 | **Kioxia IR PDF 원문 직접 열람** | — | `kioxia-holdings.com` 도메인 egress 차단. 슬라이드 15의 원 그래픽·각주를 직접 대조하지 못했다. 스크립트 문장은 검색엔진 추출 인용으로 확보 |

### 3-E. 판정 ⭐

**(a) Kioxia가 말한 것**: **86%는 CY25–CY28E의 CAGR이다**(데이터센터 세그먼트 내 추론 관련 NAND 수요). "증분 수요의 86%"가 **아니다**. 학습은 16% CAGR. 슬라이드 15, 2026-06-02. 레포 3개 위치의 "증분의 86%" 표기는 오독이다.

**(b) 깨끗한 인용 가능 수치**: **존재한다 — 단, Kioxia 86%가 아니라 Gartner 55%다.**
- **Gartner 2026-08-10: "2026년 AI 최적화 IaaS 지출의 55%가 추론에 쓰이며, 추론 지출 $23.3B가 학습 $19.0B를 사상 최초로 추월한다. 2027년에는 59%."**
- 이것이 이번 수집에서 확보한 유일하게 (i) 1차 출처(Gartner 공식 릴리스), (ii) 분모가 명확, (iii) 내부 산술이 정합, (iv) 날짜가 최신(2026-08)인 수치다.
- Kioxia 86%는 **자사 NAND 수요 전망**이며 CAGR이라 "추론이 학습보다 크다"를 **직접 말해주지 않는다**(성장률이 높다는 것과 규모가 크다는 것은 다르다). Gartner 55%는 **규모의 역전**을 직접 말한다 — 덱이 필요로 하는 것은 후자다.

---

## §4. 공개 자료의 공백 — 덱에 쓰면 안 되는 것 (부정 확인 명시)

| # | 쓰면 안 되는 것 | 이유 | 근거 |
|---|---|---|---|
| 1 | **"QLC는 0.6 DWPD"** (단일 값) | 워크로드 기준 없이는 무의미. 245TB급 헤드라인만 0.3/0.3/0.6으로 2배, 기준 포함 시 0.075~1.0으로 **13.3배** | §1-C, §1-F |
| 2 | **"QLC는 TB당 20~30% 저렴"** | 상단 30%가 **다이 레벨 이론 상한 25%를 초과**. 드라이브 레벨은 그보다 더 작아야 한다 | §2-C |
| 3 | **Samsung BM1773 0.6 vs Kioxia LC9 0.3 나란히 비교** | **두 값 모두 근거 워크로드가 공개되지 않았다.** 같은 기준인지 확인 불가 | N-05 |
| 4 | **"TrendForce에 따르면 QLC가 X% 싸다"** | TrendForce는 QLC/TLC $/TB를 **분리 공개하지 않는다** | C-01 |
| 5 | **"Kioxia: AI 추론이 증분 DC 수요의 86%"** | **오독.** 86%는 CY25–28 CAGR | §3-A, §3-B |
| 6 | **"Kioxia: DC NAND 295 EB → 1,807 EB"** | **혼동.** 1,807 EB는 **전체 flash**. DC는 **909 EB** | I-03, I-04 |
| 7 | **"Kioxia LC9 245TB = 67,000 TBW"** | 2차 매체의 용량 혼동. 67,000 TBW는 **122.88TB 모델** 값. 245.76TB는 약 **134,000 TBW** | §1-D 충돌 #1 |
| 8 | **"NVIDIA 매출의 40%가 추론"** (현재형) | FY2024 공시값이며 **이후 NVIDIA는 이 분할을 공시하지 않는다**. 2026년 값으로 쓰면 허위 | I-12, I-13 |
| 9 | **SanDisk 256TB·SK hynix PS1012·ScaleFlux QLC의 DWPD** | **어느 벤더도 공개한 적이 없다.** 표에는 반드시 "미공개"로 표기 | N-03, N-04, P-11 |
| 10 | **"Kioxia LC8"** | **제품 존재를 확인하지 못했다.** Kioxia 고용량 QLC는 LC9 단일 계열 | N-02 |
| 11 | **"Solidigm D5-P5810 (QLC)"** | **존재하지 않는다.** D7-P5810이며 **SLC**(50/65 DWPD) | N-01 |
| 12 | **유통 실거래가 기반 QLC/TLC 프리미엄** | 동일 SKU 유통가가 **1.57배** 벌어져 있어 13~20% 차이를 분해할 수 없다 | C-03 |
| 13 | **"QLC는 TLC의 1/3 가격"** | 콘텐츠 팜 수치. 이론 상한과 정면 모순 | C-30 |
| 14 | **ScaleFlux "7~10+ DWPD"를 QLC 정격으로 인용** | **effective DWPD**(압축·FDP 적용 후 KV cache 실효값)이며 NAND 정격이 아니다 | P-12 |
| 15 | **"추론이 이미 학습보다 크다"를 분모 없이 서술** | 지출 기준(Gartner, 2026년 역전)과 AI 서버 수요 기준(TrendForce, 2029년)과 전력 용량 기준(학습 5GW vs 추론 2GW)이 **서로 다른 답을 준다** | 충돌 #4, #5 |
| 16 | **Gartner 수치를 국내 매체 인용으로 쓰기** | e4ds가 $42B를 "59조 달러"로 오역 | 충돌 #6 |

**추가 공백 (후속 과제)**
- Micron 6600 ION의 **JESD219A 기준 DWPD** — 6550 ION만 확보
- Solidigm·Kioxia·Samsung의 **JESD219 기준 DWPD** — 전 벤더 미공개
- **122TB·245TB급 $/TB 공개 인덱스** — 존재하지 않는다(VDURA는 30TB만)
- **VDURA 인덱스의 QLC 가격 산출 방법론**
- Kioxia IR PDF 슬라이드 15 **원본 그래픽·각주** (도메인 차단)

---

## §5. 덱에 쓸 수 있는 문장 (그대로 복사해 쓸 수 있게)

> 각 문장 끝의 등급·출처는 **발표 노트나 각주로 옮기되 삭제하지 말 것**. 등급이 ⚠️인 문장은 수치 대신 방향만 담았다.

### §5-1. DWPD 관련

**S-01** ✅
> "고용량 QLC eSSD의 정격 DWPD는 하나의 숫자가 아니다. Micron 6550 ION 61.44TB는 **같은 드라이브에서** 128KB 순차 기준 1.00, 16KB 랜덤 기준 1.00, 4KB 랜덤 기준 0.25, JESD219A 믹스 기준 0.30으로 **8개 기준을 각각 공표**한다."
> — 출처: Micron 6550 ION Technical Product Specification. 등급 ✅

**S-02** 🟡
> "245TB급에서 그 분산은 더 벌어진다. Micron 6600 ION 245.76TB는 128KB 순차 **1.0**, 16K 랜덤 **0.3**, 4K 랜덤 **0.075** — **같은 드라이브에서 13.3배**다."
> — 출처: StorageReview 리뷰(2026-05) / Micron 6600 ION 제품브리프. 13.3배는 ⚠️파생(1.0÷0.075). 등급 🟡

**S-03** 🟡
> "245TB급 3사 헤드라인은 Kioxia LC9 **0.3**, Micron 6600 ION **0.3**(16K 랜덤), Samsung BM1773 **0.6**이다. 그러나 **Kioxia와 Samsung은 그 DWPD의 근거 워크로드를 공개하지 않았다** — 세 숫자를 나란히 비교할 근거가 아직 없다."
> — 출처: Kioxia PR 2025-07-21 / Micron 제품브리프 / Samsung BM1773 발표(2026-09). 등급 🟡

**S-04** 🟡
> "따라서 덱에서 QLC 내구성을 말할 때 쓸 수 있는 범위는 **헤드라인 기준 0.26~0.6 DWPD**, **워크로드 기준을 포함하면 0.075~1.0 DWPD**다. 단일 값 인용은 어느 쪽이든 오도한다."
> — 출처: 본 원장 §1-F. 등급 🟡

**S-05** ✅
> "DWPD 미공개 벤더도 있다. **SanDisk(UltraQLC 256TB), SK hynix(PS1012 61.44TB)는 내구성 등급을 공표한 적이 없다.** SanDisk는 2025년 8월 발표 시점에 '컨트롤러·드라이브가 최종 시험 준비 전이라 성능·내구성 데이터가 없다'고 명시했다."
> — 출처: Sandisk IR 2025-08-05 / SK hynix 뉴스룸 2024-12. 등급 ✅

**S-06** ⚠️ (역설 — 이미 v6 원장에 있는 논지의 갱신판)
> "DWPD 수치가 낮아진다고 내구성 요구가 낮아진 것이 아니다. **DWPD는 용량으로 정규화된 지표**이므로, Kioxia LC9 245.76TB의 0.3 DWPD는 하루 약 **73.7 TB 기입**을 뜻한다 — 2018년 PM1643(30.72TB, 1 DWPD)의 30.7 TB/day보다 2.4배 많다."
> — ⚠️파생: 0.3 × 245.76 = 73.7 ; 1 × 30.72 = 30.7 ; 73.7 ÷ 30.7 = 2.40. 원 데이터는 레포 v6 원장 §6 F-2. 등급 ⚠️(계산값)

### §5-2. 가격 관련

**S-10** 🟡 ⭐ **(현재 덱 문장의 교체용)**
> "QLC의 TB당 원가 우위는 **방향은 확실하지만 퍼센트를 확정할 공개 근거가 없다.** 다이 레벨 이론 상한은 **비트당 −25%**이고(셀당 비트 3→4), 2026년 유일하게 공개된 엔터프라이즈 SSD $/TB 지수(VDURA 30TB)에서 관측되는 할인폭은 **−13~−20%**다."
> — 출처: Objective Analysis / The Memory Guy(이론 상한), VDURA Flash Volatility Index 2026-08-11 및 2026-04-08. −25%는 ⚠️파생(1 − 3/4). 등급 🟡

**S-11** 🟡
> "**'20~30% 저렴'은 쓸 수 없다.** TLC(3비트/셀)에서 QLC(4비트/셀)로 가면 비트는 33% 늘지만 **비트당 원가 절감의 산술적 천장은 25%**다. 컨트롤러·DRAM·PCB·패키징이 TLC와 공통 원가이므로 **드라이브 $/TB 절감은 25%보다 작을 수밖에 없다**."
> — 출처: Objective Analysis(Jim Handy), "SLC to MLC to TLC to QLC to PLC: Diminishing Returns". 단계별 절감 50/33/25/20%. 등급 🟡

**S-12** ⚠️
> "가격 지수 자체를 조심해야 한다. VDURA 인덱스의 QLC/TLC 가격비는 3개 시점 중 **2개가 정확히 0.800**이다 — 관측이 아니라 모델 가정일 가능성이 있고, VDURA는 방법론을 공개하지 않았다."
> — ⚠️파생: 2,768÷3,460=0.8000 ; 18,080÷22,600=0.8000 ; 15,121÷17,500=0.8641. 등급 ⚠️

**S-13** ⚠️ (부정 확인을 그대로 쓰는 문장)
> "**TrendForce를 포함해 어떤 가격 기관도 QLC와 TLC의 $/TB를 분리해 공개하지 않는다.** 공개되는 것은 eSSD 계약가 상승률과 벤더 매출뿐이다."
> — 출처: TrendForce 2026-06-11 / 2026-09-01 / 2026-09-21 보도자료 검토 결과(부재의 증거). 등급 ⚠️

**S-14** 🟡 (벤더 주장임을 명시해야 쓸 수 있는 문장)
> "벤더가 공개하는 QLC 우위는 가격이 아니라 **전력효율**이다. Solidigm이 의뢰한 Signal65 Lab 측정에서 QLC SSD는 TLC SSD 대비 **19.5%**, TLC+HDD 하이브리드 대비 **79.5%** 전력효율 우위를 보였다. **(벤더 의뢰 자료)**"
> — 출처: Solidigm / Signal65 Lab 백서. 등급 🟡

### §5-3. 추론 대 학습

**S-20** ✅ ⭐ **(가장 강한 문장 — 이것을 메인으로)**
> "**Gartner는 2026년을 추론 지출이 학습 지출을 처음으로 추월하는 해로 본다. AI 최적화 IaaS 지출의 55%가 추론에 쓰이며(추론 $23.3B vs 학습 $19.0B), 2027년에는 59%로 올라간다.**"
> — 출처: Gartner 보도자료, "Gartner Forecasts Worldwide AI-Optimized IaaS Spending to Grow 96% in 2026", **2026-08-10**. https://www.gartner.com/en/newsroom/press-releases/2026-08-10-gartner-forecasts-worldwide-artificial-intelligence-optimized-iaas-spending-to-grow-96-percent-in-2026 등급 ✅

**S-21** ✅ (NAND 쪽 근거 — Gartner와 짝지어 쓸 것)
> "메모리 쪽에서도 같은 방향이 나온다. **Kioxia는 Investor Day 2026에서 데이터센터 NAND 수요가 CY25 295 EB에서 CY28 909 EB로(CAGR 46%) 늘어나며, 그 안에서 추론 관련 수요는 CAGR 86%, 학습은 CAGR 16%로 성장한다고 전망했다.**"
> — 출처: Kioxia Holdings Investor Day 2026, 슬라이드 15, **2026-06-02**. 스크립트 원문: "inference AI applications will serve as a primary growth catalyst, and are likely to achieve an estimated CAGR of 86%." 등급 ✅

**S-22** ⚠️ (반드시 함께 써야 할 경계 문장)
> "단, **86%는 성장률이지 점유율이 아니다.** 규모의 역전을 말하는 것은 Gartner의 55%이고, Kioxia의 86%는 그 역전이 NAND 수요에서 어떤 속도로 일어나는지를 말한다."
> — 출처: 본 원장 §3-E. 등급 ⚠️(해석이지만 두 1차 출처의 정의 대조에 근거)

**S-23** ✅ (NVIDIA — 반드시 과거형으로)
> "NVIDIA는 **FY2024 연차보고서에서 '지난 1년간 데이터센터 매출의 약 40%가 AI 추론용이었다'고 공시했고, 이후 이 분할을 공시하지 않는다.**"
> — 출처: NVIDIA Form 10-K FY2024 (FY 종료 2024-01-28) / Q4 FY2024 실적발표. FY2026 10-K에는 분할 없음. 등급 ✅

**S-24** 🟡
> "NVIDIA 경영진은 2026년 실적발표에서 **추론 토큰 생성이 1년 만에 10배 증가**했다고 밝혔고, Jensen Huang은 '우리는 추론에서 점유율을 매우 빠르게 늘리고 있다'고 말했다. 다만 **수치 분할은 제시하지 않았다.**"
> — 출처: NVIDIA FY2026~FY2027 실적발표 / Computer Weekly 2026. 등급 🟡

**S-25** ⚠️ (반대 증거를 덱에 남기려면)
> "분모를 바꾸면 그림이 달라진다. **전력 용량 기준으로는 아직 학습이 우세하다는 집계도 있다(학습 5 GW vs 추론 2 GW).** 이 수치의 원 출처와 기준 연도는 확인하지 못했다. '추론이 이미 더 크다'는 **지출 기준의 주장**임을 명시해야 한다."
> — 출처: programs.com 데이터센터 통계 집계(원 출처 미확인). 등급 ⚠️

---

## §6. 요약 판정표 (한 장)

| 질문 | 덱의 현재 문장 | 판정 | 대체 문장 |
|---|---|---|---|
| **Q1. QLC DWPD** | "QLC 0.6 DWPD" | ⚠️ **단일 값 사용 불가.** 값 자체는 실재(Solidigm 122TB @32K, Samsung BM1773)하나 범위 상단의 한 헤드라인 | 헤드라인 **0.26~0.6**, 기준 포함 **0.075~1.0**. 245TB급은 **0.3~0.6(헤드라인)**. 반드시 워크로드 기준 병기 → S-01~S-04 |
| **Q2. QLC/TLC 가격차** | "TB당 20~30% 저렴" | ❌ **상단 30%는 이론 상한(25%) 초과 — 사용 금지.** 특정 % 자체가 방어 불가 | **방향만** 쓰거나, 쓴다면 "다이 레벨 상한 −25% / 공개 지수(VDURA) −13~−20%, 방법론 미공개" 병기 → S-10~S-13 |
| **Q3. 추론 대 학습** | "추론 CAGR 86% vs 학습 16% (Kioxia)" | ✅ **CAGR로 쓰면 정확하다.** "증분 수요의 86%"는 오독 — 레포 3곳 정정 필요. 단 **더 나은 수치가 있다** | 메인은 **Gartner 2026-08-10: 추론이 AI 최적화 IaaS 지출의 55%, 추론 $23.3B > 학습 $19.0B (2026년 최초 역전), 2027년 59%**. Kioxia 86%는 NAND 쪽 보조 근거로 → S-20~S-22 |
