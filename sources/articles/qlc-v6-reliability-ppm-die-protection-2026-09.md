# 엔터프라이즈 SSD 신뢰성 ppm·다이 보호 구조 팩트 원장

**수집일**: 2026-09-22
**유형**: 웹 검색 기반 2차 자료 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v6.0 개정 — 위키 반영 근거

---


> 수집: 2026-09-22 · Research Agent (사실 수집 전용, 전략 판단 없음)
>
> **수집 환경 제약 (중요, 그대로 보고)**
> - 이 세션의 아웃바운드 HTTPS는 정책 프록시로 차단됨 — `opencompute.org`, `jedec.org`, `usenix.org`, `micron.com`, `kioxia.com`, `solidigm.com`, `storagereview.com`, `servethehome.com`, `mdpi.com`, `dl.acm.org`, `arxiv.org`, `patents.google.com` **전부 403**. 1차 PDF 원문을 직접 열람하지 못했다.
> - WebSearch는 세션 예산(200회) 소진으로 중단됨.
> - 따라서 **✅ 등급은 "1차 문서 원문을 이 세션에서 직접 읽은 것"이 아니라 "검색 인덱스가 1차 문서 본문을 인용한 것"** 이다. 그 구분을 각 행 비고에 명시했다.
> - 원문 재검증이 필요한 항목은 §8 갭 리스트에 URL과 함께 정리했다.

---

## 1. 산업 요구 수준 — 드라이브 레벨 AFR / FFR / UBER

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| R1 | OCP Datacenter NVMe SSD Specification이 요구하는 드라이브 신뢰성: MTBF 2,000,000시간 = **AFR ≤ 0.44%** (동작온도 0~55°C) | MTBF ≥ 2.0e6 h, AFR ≤ 0.44%/yr | 데이터센터 NVMe SSD 전반 | v2.0(2021-07) ~ v2.7(2025-11 / 2026-01 개정) | [OCP DC NVMe SSD Spec v2.7](https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf) · [v2.6](https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-6-2-pdf) · [v2.5](https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf) | 🟡 (검색 인덱스가 스펙 본문 인용 2회 독립 확인. PDF 원문 미열람 — 정확한 요구 ID·절번호 ⚠️미확인) |
| R2 | OCP 스펙에 **"Annual Failure Rate (AFR)" 전용 절**이 존재하며 v2.5 기준 p.135 부근 | — | OCP DC NVMe SSD Spec | v2.5 (2023-09-28) | [OCP v2.5](https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf) | 🟡 |
| R3 | **AFR 0.44% = 4,400 ppm/년**. MTBF 2.0e6 h를 지수분포로 환산하면 정확히 AFR = 1−exp(−8760/2e6) = **0.4370% = 4,370 ppm/yr** | 4,370~4,400 ppm/yr | 드라이브 단위 | — | 자체 계산 (R1로부터) | ⚠️ 파생(초등 신뢰도 산술, 검증 스크립트 첨부) |
| R4 | 벤더 실제 표기 MTBF는 OCP 최저선보다 높음 — **2.5M 시간** (Micron 6550 ION, Samsung BM1743) → AFR = **0.3498% = 3,498 ppm/yr** | MTBF 2.5e6 h → 3,500 ppm/yr | Micron 6550 ION 61.44TB / Samsung BM1743 61.44TB | 2024-07(BM1743), 2024-10(6550 ION) | [Micron 6550 ION Tech Prod Spec](https://assets.micron.com/adobe/assets/urn:aaid:aem:823ddb16-1baa-4439-b06c-da66b36274d5/renditions/original/as/6550-ion-nvme-ssd-tech-prod-spec.pdf) · [B&F BM1743](https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/) | 🟡 |
| R5 | Solidigm D5-P5336 122.88TB: **MTBF 2M 시간**, UBER "1억의 10억분의 1 — 10^17 비트 읽기당 1비트 미만 오류" | MTBF 2e6 h, UBER < 1e-17 | D5-P5336 122.88TB | 2024-11 발표 / 2024-12 Rev006 스펙 | [Solidigm D5-P5336 Product Brief](https://www.solidigm.com/content/dam/solidigm/en/site/products/technology/p5336-product-brief/documents/Solidigm-D5P5336-ProductBrief.pdf) · [StorageReview 122.88TB 리뷰](https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency) | 🟡 |
| R6 | **JESD218 엔터프라이즈 클래스 요구**: FFR(Functional Failure Requirement) **≤ 3%**, UBER **≤ 10^-16** | FFR ≤ 3% (=30,000 ppm, 수명 전체), UBER ≤ 1e-16 | 엔터프라이즈 SSD 클래스 | JESD218 (JC-64.8), 2010 제정 이후 | [JEDEC SSD Specs Explained, Alvin Cox (Seagate, JC-64.8 의장)](https://www.jedec.org/sites/default/files/Alvin_Cox%20[Compatibility%20Mode]_0.pdf) · [JEDEC SSD 표준 페이지](https://www.jedec.org/standards-documents/focus/flash/solid-state-drives) | 🟡 (JEDEC 자료 원문 403. 검색 인덱스가 JESD218 Table 1을 인용) |
| R7 | JESD218의 **TBW 정의**: 호스트가 쓸 수 있는 최대 TB 수로서, 그 시점까지 (a) 용량 유지 (b) 해당 클래스의 UBER 유지 (c) 해당 FFR 충족 (d) 전원차단 보존시간 충족을 **동시에** 만족해야 함 | — | JESD218 | — | 동상 | 🟡 |
| R8 | JESD218의 **UBER 분자/분모 정의**: 분자 = TBW 정격 전 구간에서 검출된 데이터 오류 총수(손상 섹터 1개 = 오류 1개, 여러 번 읽어 실패해도 1로 계수), 분모 = TBW 정격 한계에서 쓰여진 비트 수. **모집단 전체의 수명값(lifetime value)** 이다 | — | JESD218 | — | 동상 · [Seagate TP618 SSD 내구성 백서](https://www.seagate.com/files/staticfiles/docs/pdf/whitepaper/tp618-ssd-tech-paper-us.pdf) | 🟡 |
| R9 | 실제 벤더는 JESD218 최소선(1e-16)보다 한 자릿수 엄격한 **설계 타깃 1e-17** 을 쓰고, 내구성 검증 합격기준은 "신뢰수준 60%에서 <1e-16" | 설계 1e-17 / 검증 1e-16 @60% conf. | Intel DC S3700 등 엔터프라이즈 SSD | 2012-10 (S3700 스펙) | [Intel SSD DC S3700 Product Spec (328171-001US)](https://download.intel.com/newsroom/kits/ssd/pdfs/Intel_SSD_DC_S3700_Product_Specification.pdf) | 🟡 |
| R10 | JESD219(A) = SSD 내구성 워크로드 표준 (엔터프라이즈/클라이언트 트레이스). JESD218의 TBW 측정에 쓰이는 짝 표준 | — | — | JESD219A | [JEDEC JESD219A](https://www.jedec.org/standards-documents/docs/jesd219a) | 🟡 |
| R11 | **ppm 환산 정리** — AFR 0.44%/yr = 4,400 ppm/yr; 5년 누적(MTBF 2e6) = **21,662 ppm**; 5년 누적(MTBF 2.5e6) = **17,367 ppm**; JESD218 FFR 3% = 30,000 ppm(수명) | 표 참조 | — | — | 자체 계산 | ⚠️ 파생 |

**해석용 정리 (사실 아님, 산술):** 연간 ppm ↔ FIT 환산은 **1 ppm/yr = 0.1142 FIT** (FIT = 1e9 소자시간당 고장). 즉 4,400 ppm/yr ≈ **502 FIT / 드라이브**.

---

## 2. 필드 실측 AFR — 하이퍼스케일러·대규모 사업자

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| F1 | Google 6년 필드 데이터(수백만 drive-days, 10개 모델, MLC/eMLC/SLC, 24~50nm): **배치 후 첫 4년간 연 1~2%** 의 드라이브가 하드웨어 의심 사유로 교체됨. HDD보다 훨씬 낮으나 **uncorrectable error 발생률은 HDD보다 높음** | 연 1~2% 교체 (10,000~20,000 ppm/yr) | Google 프로덕션 플래시 | FAST'16 (2016-02), 데이터 2009~2015 | [Schroeder, Lagisetty, Merchant, "Flash Reliability in Production", USENIX FAST'16](https://www.usenix.org/conference/fast16/technical-sessions/presentation/schroeder) · [발표 슬라이드](https://www.usenix.org/sites/default/files/conference/protected-files/fast16_slides_schroeder.pdf) | 🟡 (원문 PDF 403, 검색 인덱스 + Google 연구 페이지 인용) |
| F2 | 동 연구: **RBER은 wearout 예측보다 느리게 증가**하며 **UBER·기타 고장과 상관관계가 없다** (= RBER은 드라이브 신뢰성의 좋은 예측변수가 아니다) | — | 동상 | 2016-02 | 동상 · [Google Research pub45563](https://research.google.com/pubs/pub45563.html) | 🟡 |
| F3 | 동 연구: **최대 80%의 드라이브가 bad block을 발생**시키고, **2~7%의 드라이브가 첫 4년 내 bad chip(불량 NAND 칩)을 발생**시킨다. bad block이 많은 드라이브는 수백 개를 추가로 잃을 확률이 훨씬 높은데 **원인은 die 또는 chip 고장으로 추정** | bad block 발생 드라이브 ≤80%, **bad chip 발생 드라이브 2~7% / 4년** | 동상 | 2016-02 | 동상 · [Computer Weekly 요약](https://www.computerweekly.com/feature/Drive-to-improve-flash-reliability) · [DCD 요약](https://www.datacenterdynamics.com/en/news/googles-ssd-experience-contradicts-flash-lab-results/) | 🟡 — **본 슬라이드에서 가장 중요한 die-level 실측 앵커** |
| F4 | 동 연구: SLC가 MLC보다 신뢰성이 높다는 증거 없음; 고장은 사용량(wear)보다 **경과 연수(age)** 와 더 상관 | — | 동상 | 2016-02 | 동상 | 🟡 |
| F5 | Alibaba 약 100만 대 SSD(11개 모델) 필드 연구: 모델별 **AFR 0.30%(D1) ~ 3.8%(C1)**, 중간 모델들은 0.38·0.53·0.56·0.59·0.64·0.65·0.67·0.68·0.78·1.0·1.1·2.0·2.8% 분포. **같은 노드/랙 내 상관 고장(correlated failure)이 흔하다** | AFR 3,000 ~ 38,000 ppm/yr (모델별) | Alibaba 프로덕션 SSD | FAST'21 (2021-02), 데이터 2018~2019 | [Han et al., "An In-Depth Study of Correlated Failures in Production SSD-Based Data Centers", USENIX FAST'21](https://www.usenix.org/conference/fast21/presentation/han) · [PDF](https://www.usenix.org/system/files/fast21-han.pdf) · [코드](https://github.com/shujiehan/ssdanalysis) | 🟡 |
| F6 | Alibaba 100만+ NVMe SSD 로그 분석: **NVMe SSD 평균 ARR 0.98%, 중앙값 0.69%** — SATA/SAS SSD 대비 각각 **2.77배 / 2.83배 높음**. NVMe는 early failure·액세스 패턴 변동에는 강해졌으나 **복잡한 상관 고장에는 더 취약** | 평균 ARR 9,800 ppm/yr, 중앙값 6,900 ppm/yr | Alibaba NVMe SSD | USENIX ATC'22 (2022-07) | [Lu et al., "NVMe SSD Failures in the Field: the Fail-Stop and the Fail-Slow", ATC'22](https://www.usenix.org/conference/atc22/presentation/lu) · [PDF](https://www.usenix.org/system/files/atc22-lu.pdf) · [슬라이드](https://www.usenix.org/sites/default/files/conference/protected-files/atc22_slides_lu.pdf) | 🟡 |
| F7 | NetApp 엔터프라이즈 스토리지 대규모 필드 연구(참조용) | 수치 ⚠️미확인 | NetApp 엔터프라이즈 SSD | ACM TOS, 2020 | [Maneas et al., "Reliability of SSDs in Enterprise Storage Systems: A Large-Scale Field Study", ACM TOS](https://dl.acm.org/doi/pdf/10.1145/3423088) | ⚠️ 미열람 (링크만 확보) |
| F8 | Backblaze 2025 Drive Stats: 전체 드라이브 **연간 AFR 1.36%** (2024년 1.55%에서 하락), Q4'25 분기 AFR 1.13%, 수명 누적 AFR 1.30%, 344,196대/30모델 — **단, 이 모집단은 대부분 HDD** (SSD는 부트 드라이브 소수) | 13,600 ppm/yr (HDD 중심) | Backblaze 클라우드 플릿 | 2026-01 발표 (2025 데이터) | [Backblaze Drive Stats 2025](https://www.backblaze.com/blog/backblaze-drive-stats-for-2025/) · [IR 보도](https://ir.backblaze.com/news/news-details/2026/Backblaze-Publishes-2025-Drive-Stats-Report-13-Years-of-Data-Show-a-Growing-Healthier-Drive-Fleet/default.aspx) | 🟡 — SSD die-level 논증에는 **부적합**(HDD 모집단). 대조군으로만 사용 권장 |
| F9 | Meta/Facebook SIGMETRICS'15 (Narayanan et al., "SSD Failures in Datacenters") | 수치 ⚠️미확인 | Facebook 플릿 | 2015 | — (이 세션에서 접근 실패) | ⚠️ 미확보 — §8 갭 |

**필드 vs 스펙 격차 (사실 병치):** 스펙 요구 4,400 ppm/yr vs 필드 실측 6,900~20,000 ppm/yr. 즉 **현실의 SSD는 이미 OCP AFR 요구를 2~5배 초과**하고 있다 (F1·F5·F6). 이는 die 보호 논증의 출발점이 아니라 배경이다.

---

## 3. NAND die 레벨 — 다이 수·패키지 구성 (용량별)

### 3-1. 확인된 1차/2차 사실

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| D1 | Kioxia LC9: **2Tb BiCS FLASH gen8 QLC 다이 ×32단 스택**, CBA(CMOS Bonded to Array) 적용, **154볼 BGA(11.5×13.5mm) 패키지 1개에 8TB** — 업계 최초 | 2Tb die, 32-die stack, 8TB/package | Kioxia LC9 245.76TB | 2025-07-22 발표, 2025-08-05 FMS Best of Show | [KIOXIA 보도자료 (FMS Best of Show)](https://americas.kioxia.com/en-us/business/news/2025/ssd-20250805-1.html) · [KIOXIA 245.76TB 발표](https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html) · [KIOXIA 블로그](https://blog-us.kioxia.com/post/2025/08/29/from-breakthrough-to-best-of-show-kioxia-lc9-series-245-tb-enterprise-ssd-with-innovative-32-die-stack-memory) | ✅ (벤더 보도자료 본문 인용 — 원문 403이나 3개 독립 채널 일치) |
| D2 | LC9 스펙: 30.72~245.76TB, PCIe 5.0(x4 또는 dual x2), NVMe 2.0/NVMe-MI 1.2c, 2.5" 및 E3.L, **0.3 DWPD**, 12GB/s 순차읽기 / 3GB/s 쓰기, 1.3M 랜덤 읽기 IOPS | — | Kioxia LC9 | 2025-07 | 동상 · [StorageNewsletter](https://www.storagenewsletter.com/2025/07/23/kioxia-unveils-lc9-series-up-to-245-76tb-pcie-5-0-nvme-2-5-inch-and-edsff-e3-l-form-factor-ssd/) · [StorageReview](https://www.storagereview.com/news/245tb-kioxia-lc9-ssd-sets-new-ssd-density-record) | 🟡 |
| D3 | Solidigm 192층 QLC 다이는 **1.33 Tb** (부품번호 29F02P2BMCQLI). 리뷰 표기로는 다이당 **171 GiB** | 1.33 Tb/die (≈171 GiB) | Solidigm D5-P5336 계열 NAND | 2023~ | [TechInsights: Solidigm 29F02P2BMCQLI 192-Layer 1.33 Tb QLC 3D NAND Floorplan](https://www.techinsights.com/blog/solidigm-29f02p2bmcqli-192-layer-133-tb-qlc-3d-nand-flash-memory-floorplan-analysis) · [TechInsights Waveform 분석](https://www.techinsights.com/blog/solidigm-133tb-192l-qlc-3d-nand-internal-waveform-analysis) · [HotHardware D5-P5336 리뷰](https://hothardware.com/reviews/solidigm-d5-p5336-review-61tb-data-center-ssd) | 🟡 (TechInsights 제목이 다이 용량을 직접 명시) |
| D4 | Solidigm은 122TB U.2를 위해 **folded PCB**를 도입해 동일 보드에 NAND 사이트 수를 극대화, "업계 최소 NAND 패키지"로 보드당 패키지 수를 늘림 | 패키지 수 **수치 미공개** | Solidigm D5-P5336 122.88TB | 2024-11 | [Solidigm "The Incredible Path to 122TB"](https://www.solidigm.com/products/technology/solidigm-path-to-122tb-ssd.html) · [StorageReview 리뷰](https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency) | 🟡 |
| D5 | **다이 수·패키지 수는 어느 벤더도 공식 공개하지 않는다** — 검색으로 Solidigm 61.44/122.88TB의 정확한 다이·패키지 수를 얻지 못했다. 유일하게 역산 가능한 공개 앵커는 D1(Kioxia 8TB/패키지, 32-die/패키지)뿐이다 | — | 전 벤더 | 2026-09 | (부재 사실) | ✅ (부재 확인) |
| D6 | 업계 용량 포인트는 **전부 2의 거듭제곱 TB의 0.96배**: 30.72=0.96×32, 61.44=0.96×64, 122.88=0.96×128, 245.76=0.96×256. 즉 **표기 raw NAND = 사용자 용량 ÷ 0.96** | — | 업계 공통 | — | 자체 산술 (D1·D2·사내 소스 `sources/articles/qlc-essd-history-2022-background-2026-09.md` 표) | ⚠️ 파생(산술 검증 완료) |
| D7 | Kioxia 교차검증: 245.76 ÷ 8TB/pkg = 30.72 → **32 패키지 = 256TB raw**, 사용자 245.76TB (= 96%). 따라서 **LC9 245.76TB = 32 패키지 × 32 다이 = 1,024개 2Tb 다이** | **1,024 die** | Kioxia LC9 245.76TB | 2025 | D1 + D6 | ⚠️ 파생 — 그러나 앵커가 벤더 1차 수치라 신뢰도 높음 |
| D8 | Samsung: **V9 2Tb QLC 개발 완료(2026-03)**, 2H26 QLC 비트 출하 1H26 대비 2배 이상, **256TB 서버 SSD 라인업** 보유. FMS 2026에 **BM1773 245.76TB E3.S (V9 QLC, 2Tb die)** 전시 | 2Tb die, 245.76/256TB | Samsung | 2026-03 / 2026-2Q 실적콜 / FMS 2026 | 사내 소스 `sources/articles/qlc-essd-market-size-forecast-data-2026-09.md`, `sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md` · [electronics-journal BM1773](https://electronics-journal.com/news/114908-samsung-launches-245-76tb-bm1773-ssd-for-high-density-ai-data-centers) | 🟡 |
| D9 | SanDisk UltraQLC: **BiCS8 2Tb QLC + CBA(218층)** 로 **256TB(2026)**, 로드맵상 **512TB(2027)** | 256TB → 512TB | SanDisk | 2025-08-05 FMS 예고 | 사내 소스 `sources/articles/qlc-essd-history-2022-background-2026-09.md` · [TechRadar 256TB/512TB 로드맵](https://www.techradar.com/pro/sandisk-plans-256tb-ssd-in-2026-and-512tb-ssd-in-2027-and-no-you-wont-be-able-to-install-it-in-your-desktop-computer) · [Blocks&Files](https://blocksandfiles.com/2025/08/05/sandisk-pre-announces-256-tb-ssd/) | 🟡 |
| D10 | 61.44TB급 주요 제품 (대조군): Solidigm D5-P5336 61.44TB(192층 QLC, 0.58 DWPD, 213 PBW) · Samsung BM1743 61.44TB(176층 V7 QLC, 0.26 DWPD, MTBF 2.5M h, 전원차단 보존 3개월) · Micron 6550 ION 61.44TB(G8 TLC, MTBF 2.5M h, 112,000 TBW) | — | — | 2023-07 / 2024-07 / 2024-10 | 사내 소스 `sources/articles/qlc-essd-history-2022-background-2026-09.md` · [B&F BM1743](https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/) · [STH Micron 6550 ION](https://www.servethehome.com/micron-6550-ion-61-44tb-pcie-gen5-nvme-ssd-launched/) | 🟡 |

### 3-2. 다이 수 산정표 (파생 ⚠️ — 가정 명시)

**산정식** `N_die = (사용자용량 TB ÷ 0.96) ÷ (다이 Tb ÷ 8)`
**단위 규약** Kioxia 1차 수치(32 × 2Tb = 8TB)를 따라 **1 Tb 다이 = 0.125 TB 표기용량**. (실제 2진/10진 슬랙 약 7.4%는 스페어 풀의 일부가 된다.)

| 드라이브 클래스 | 사용자 용량 | 표기 raw | 다이 밀도 | **다이 수 N** | 패키지 구성(추정) | 근거 |
|---|---|---|---|---|---|---|
| 현행 61TB급 | 61.44 TB | 64 TB | 1 Tb | **512** | 32pkg × 16-die (2TB/pkg) | D6 파생 |
| 〃 (2Tb 전환 시) | 61.44 TB | 64 TB | 2 Tb | **256** | 16pkg × 16-die | D6 파생 |
| 122TB급 | 122.88 TB | 128 TB | 1 Tb | **1,024** | 32pkg × 32-die | D6 파생 |
| 〃 (2Tb) | 122.88 TB | 128 TB | 2 Tb | **512** | 32pkg × 16-die | D6 파생 |
| **245TB급 (Kioxia LC9 실물)** | 245.76 TB | 256 TB | 2 Tb | **1,024** | **32pkg × 32-die (8TB/pkg)** | **D1+D7 — 벤더 1차 앵커** |
| 256TB급 (SanDisk) | 256 TB | 266.7 TB | 2 Tb | **≈1,067** | 32~34pkg × 32-die | D6+D9 파생 |
| 512TB급 (2027) | 512 TB | 533.3 TB | 2 Tb | **≈2,133** | 64pkg × 32-die 또는 32pkg × 64-die | D6+D9 파생 |
| 512TB급 (4Tb 다이 가정) | 512 TB | 533.3 TB | 4 Tb | **≈1,067** | 32pkg × 32-die | ⚠️ 4Tb 다이 미발표 |

**관측 1 (사실 병치):** 다이 수는 용량에 비례하지 **않는다**. 다이 밀도가 같이 2배가 되면 다이 수는 유지된다 — 122TB(1Tb, 1,024die)와 245TB(2Tb, 1,024die)는 **다이 수가 동일**하다. 61TB(512) → 512TB(2,133)는 용량 8.3배에 다이 수 **4.2배**.
**관측 2:** 반대로 **다이 1개의 blast radius**는 커진다 — 1Tb 다이 손실 = 0.125TB, 2Tb = 0.25TB.

---

## 4. Die 레벨 보호 스킴 — RAIN / 패리티 / 스페어 다이

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| P1 | **Micron RAIN (Redundant Array of Independent NAND)**: "SSD에 저장된 데이터를 **단일 NAND 플래시 칩 고장**으로부터 보호한다". Micron Technical Marketing Brief "NAND Flash Media Management Through R.A.I.N.", 저자 Scott Shadley (Senior Product Marketing Manager, Micron) | 단일 칩 고장 보호 | Micron RealSSD / 엔터프라이즈 SSD | 브리프 초판 2011~2013년대 | [Micron 브리프 PDF (미러)](https://storageconsortium.de/files/brief_ssd_rain%5B1%5D.pdf) · [storageconsortium 소개](https://storageconsortium.de/micron-whitepaper-nand-flash-media-management-through-rain) · [yumpu 사본](https://www.yumpu.com/en/document/view/10448234/nand-flash-media-management-through-rain-micron) | 🟡 (원문 403. 검색 인덱스가 브리프 본문 인용) |
| P2 | RAIN 보호 강도는 **메모리 내 RAIN 오버헤드 밀도(footprint)** 에 좌우되고, 보호 가능 데이터량은 **RAIN에 할당한 메모리 비중**에 좌우된다 (= 패리티 비율 ↔ 신뢰도의 직접 트레이드오프) | — | 동상 | — | 동상 | 🟡 |
| P3 | Micron은 M500에서 **패리티 비율 1:15** (= 15 데이터 + 1 패리티, 오버헤드 6.25%) 채택 | **15+1**, 오버헤드 6.25% | Micron M500 SSD | 2013 | [Tom's Hardware "RAIN: Protecting Against Small NAND Failures"](https://www.tomshardware.com/reviews/crucial-m550-ssd-review,3772-3.html) | 🟡 |
| P4 | Micron **XPERT** 기능군에 RAIN이 포함되며 "**실시간 패리티 보호**(RAID 어레이와 유사)"로 미디어 고장으로부터 데이터를 보호한다고 기술 | — | Micron SSD 전반 | — | 동상 | 🟡 |
| P5 | Micron RAIN 관련 **특허군**(2차원/혼합 패리티, 공유 패리티, 동적 RAIN 등)이 공개되어 있음 — 3D 어레이용 RAIN(US20170249211A1 / WO2017146996A1), **NAND device mixed parity management**(US10949297, US11609819), **Shared parity protection**(US10970170, US11397642), **Parity protection**(US11513889), **Multi-page parity protection with power loss handling**(US11334428), **Dynamic RAIN for zoned storage**(US20230333783) | — | Micron | 2017~2023 | [US20170249211A1](https://patents.google.com/patent/US20170249211A1/en) · [WO2017146996A1](https://patents.google.com/patent/WO2017146996A1/en) · [US11609819](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11609819) · [US11397642](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11397642) · [US11513889](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11513889) · [US20230333783](https://patents.justia.com/patent/20230333783) | 🟡 (제목·존재만 확인. 청구항 본문 미열람) |
| P6 | **학술 1차 자료**: "Building Reliable Massive Capacity SSDs through a **Flash Aware RAID-Like Protection**", Applied Sciences (MDPI) **10(24):9149**, 2020 — 대용량 SSD의 다이/플레인 레벨 RAID형 보호를 정면으로 다루는 논문 | — | — | 2020-12 | [MDPI 10/24/9149](https://www.mdpi.com/2076-3417/10/24/9149) · [ResearchGate 347818351](https://www.researchgate.net/publication/347818351_Building_Reliable_Massive_Capacity_SSDs_through_a_Flash_Aware_RAID-Like_Protection) | ⚠️ **미열람** — 제목·서지만 확보. 수식·수치는 §8 갭 |
| P7 | **RAID6형 2중 패리티(2-dimensional parity) 를 die 레벨에 적용한 벤더 공개 문서**: 이 세션에서 **확인하지 못함**. Micron 특허 제목의 "mixed parity management" / "shared parity protection"이 다차원 패리티를 시사하나 **청구항 미확인** | — | — | — | (부재) | ⚠️ **갭** |
| P8 | **스페어 다이(spare die) / die sparing** 방식의 벤더 공개 문서: 이 세션에서 **확인하지 못함**. 검색 예산 소진으로 미수행 | — | — | — | (부재) | ⚠️ **갭 — 명시적으로 "공개 근거 없음"으로 보고할 것** |
| P9 | Solidigm/Intel AIU(Array of Independent Units), Kioxia·Samsung의 die 레벨 패리티 백서, SNIA/FMS/SDC 발표: 이 세션에서 **확인하지 못함** | — | — | — | (부재) | ⚠️ **갭** |
| P10 | 보호 스킴이 드라이브 고장확률을 **몇 자릿수 낮추는지에 대한 벤더의 정량 공개 문장**: 이 세션에서 **확인하지 못함**. P1의 "단일 칩 고장 보호"가 확인된 최대치의 정성 진술 | — | — | — | (부재) | ⚠️ **갭** |

> **정직한 요약:** die 레벨 보호에 대해 **이름과 존재가 확인된 것은 Micron RAIN 하나**이고, **정량 수치로 확인된 것은 패리티 비율 15+1(6.25% 오버헤드) 하나**다. RAID6형 2중 패리티와 스페어 다이는 **공개 근거를 찾지 못했다** — 슬라이드에서는 "업계가 채택 중인 것으로 알려진 방향"이 아니라 **"Micron RAIN이 공개 선례, 2중 패리티·스페어 다이는 공개 근거 부재"** 로 표기해야 방어 가능하다.

---

## 5. 드라이브 고장확률 ↔ 다이 고장확률 — 계산 모델

> 아래 수식은 이항분포/독립고장 가정의 **표준 신뢰도 산술**이다 (특정 논문 인용이 아니라 초등 수학). 검증 스크립트: `scratchpad/research/calc.py` (정확 이항 + 근사 이중 확인 완료).

### 5-1. 수식

**기호** `p` = 다이 1개의 기간당 고장확률, `N` = 드라이브 내 다이 수, `k` = 스트라이프 내 데이터 다이 수, `m` = 패리티 다이 수, `w = k+m` = 스트라이프 폭, `S = N/w` = 스트라이프 수.

| 보호 | 정확식 | 소p 근사 | 역산 (요구 p) |
|---|---|---|---|
| **무보호** | `P_drive = 1 − (1−p)^N` | `≈ N·p` | `p ≤ P_target / N` |
| **단일 패리티 (RAID5형, k+1)** | `P_stripe = 1 − (1−p)^w − w·p·(1−p)^(w−1)` , `P_drive = 1 − (1−P_stripe)^S` | `≈ (N·k/2)·p²` | `p ≤ √(2·P_target /(N·k))` |
| **2중 패리티 (RAID6형, k+2)** | 스트라이프가 3개 이상 다이 고장 시 실패 | `≈ (N·k·(k+1)/6)·p³` | `p ≤ ∛(6·P_target /(N·k·(k+1)))` |
| **일반 m-패리티** | 〃 (m+1개 이상 고장 시 실패) | `≈ (N/w)·C(w, m+1)·p^(m+1)` | `p ≤ [P_target·w / (N·C(w,m+1))]^(1/(m+1))` |

**핵심 성질:** 무보호는 `P ∝ p`, 단일 패리티는 `P ∝ p²`, 2중 패리티는 `P ∝ p³`. 패리티 1단 추가마다 요구 p가 **제곱근 → 세제곱근**으로 완화되므로, 완화 배수는 p가 작을수록(=N이 클수록) 커진다.

### 5-2. 요구 per-die 고장률 — 드라이브 목표 4,400 ppm/yr 고정 (OCP AFR 0.44%)

정확 이항으로 역산한 값. **드라이브 AFR 예산 전부를 NAND die 고장에 배정한 상한**이다 (컨트롤러·DRAM·PMIC·펌웨어 몫을 빼면 더 엄격해진다).

| 다이 수 N | 해당 드라이브 | **무보호** | **15+1 단일 패리티** | **14+2 2중 패리티** | 완화배수(단일) | 완화배수(2중) |
|---|---|---|---|---|---|---|
| 256 | 61TB(2Tb die) | 17.2 ppm/yr (1.97 FIT) | 1,526 ppm/yr | 8,106 ppm/yr | 89× | 471× |
| **512** | **61.44TB(1Tb die)** | **8.61 ppm/yr (0.98 FIT)** | **1,077 ppm/yr** | **6,398 ppm/yr** | 125× | 743× |
| **1,024** | **122.88TB(1Tb) / 245.76TB(2Tb)** | **4.31 ppm/yr (0.49 FIT)** | **760 ppm/yr** | **5,056 ppm/yr** | 177× | 1,174× |
| 1,067 | 256TB(2Tb) | 4.13 ppm/yr (0.47 FIT) | 749 ppm/yr | 5,004 ppm/yr | 181× | 1,211× |
| **2,133** | **512TB(2Tb)** | **2.07 ppm/yr (0.24 FIT)** | **527 ppm/yr** | **3,948 ppm/yr** | 255× | 1,910× |

### 5-3. 대안 프레이밍 — "PB당 데이터 손실률 고정"

드라이브 1대 뒤의 데이터량이 커지므로, 플릿 관점에서 **"PB·년당 손실 사건" 을 일정하게** 두면 드라이브 AFR 요구 자체가 용량에 반비례해 **강화**된다. (61.44TB @4,400ppm/yr 기준)

| 드라이브 | N | 드라이브 목표 | 무보호 요구 p | 15+1 요구 p | 14+2 요구 p |
|---|---|---|---|---|---|
| 61.44TB | 512 | 4,400 ppm/yr | 8.59 ppm/yr | 1,077 ppm/yr | 6,398 ppm/yr |
| 122.88TB | 1,024 | 2,200 ppm/yr | 2.15 ppm/yr | 537 ppm/yr | 3,998 ppm/yr |
| 245.76TB | 1,024 | 1,100 ppm/yr | 1.07 ppm/yr | 379 ppm/yr | 3,164 ppm/yr |
| 256TB | 1,067 | 1,056 ppm/yr | 0.99 ppm/yr | 366 ppm/yr | 3,089 ppm/yr |
| 512TB | 2,133 | **528 ppm/yr** | **0.25 ppm/yr (0.028 FIT)** | **182 ppm/yr** | **1,933 ppm/yr** |

### 5-4. 현실 앵커 — F3(Google) 역산

F3: "2~7%의 드라이브가 4년 내 bad chip 발생". 당시 드라이브의 다이 수는 **비공개**이므로 32/64/128 감도 분석:

| 가정 다이 수 | 2% 케이스 | 7% 케이스 |
|---|---|---|
| 32 die | 156 ppm/yr (17.8 FIT) | 547 ppm/yr (62.4 FIT) |
| **64 die (중심 가정)** | **78 ppm/yr (8.9 FIT)** | **273 ppm/yr (31.2 FIT)** |
| 128 die | 39 ppm/yr (4.5 FIT) | 137 ppm/yr (15.6 FIT) |

→ **관측 대역 ≈ 40~550 ppm/yr (5~60 FIT) per die** (⚠️ 파생, 다이 수 가정 의존, 2009~2015년 MLC/SLC 세대).

**대조:** 245TB 무보호 요구 = **4.3 ppm/yr**. 관측 하한(39 ppm/yr)과도 **9배**, 중심값(78~273)과는 **18~63배** 차이. 15+1 단일 패리티 허용치(760 ppm/yr)는 관측 대역 상한(547)보다도 높다.

---

## 6. QLC 리텐션·UBER 스케일링

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| Q1 | Samsung BM1743(QLC)은 **전원차단 데이터 보존 3개월** — 전작 BM1733의 1개월에서 개선 | 3개월 (전작 1개월) | Samsung BM1743 61.44TB QLC | 2024-07 | 사내 소스 `sources/articles/qlc-essd-history-2022-background-2026-09.md` · [B&F](https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/) | 🟡 |
| Q2 | QLC eSSD 정격 내구성은 **0.075~0.6 DWPD** 대역 (Micron 6600 ION 0.075 RDWPD, Samsung BM1743 0.26, Kioxia LC9 0.3, Solidigm P5336 0.58~0.6) — TLC KV cache 티어(1~3 DWPD) 대비 10~40배 갭 | 0.075~0.6 DWPD | QLC eSSD 전반 | 2024~2026 | 사내 소스 `sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md` | 🟡 |
| Q3 | 1차 연구(F2)는 **RBER이 UBER를 예측하지 못한다**고 보고 — "QLC RBER이 TLC 대비 N배"라는 식의 논증을 드라이브 UBER로 직결시키는 것은 이 연구와 충돌 | — | — | 2016 | F2와 동일 | 🟡 — **논증 설계 시 주의점** |
| Q4 | **QLC vs TLC의 raw bit error rate 배수, LDPC 정정 능력(코드율·소프트 디코딩 이득), read-retry 단계 수의 공개 수치**: 이 세션에서 **확보 실패**(검색 예산 소진) | — | — | — | (부재) | ⚠️ **갭 — 수치 없음. 추정 금지** |

---

## 7. 슬라이드에 바로 쓸 수 있는 정리 수치

1. **요구선**: OCP AFR ≤ 0.44%/yr = **4,400 ppm/yr** (MTBF 2M h). 벤더 표기 2.5M h = **3,500 ppm/yr**. JESD218 엔터프라이즈 FFR ≤ 3% = **30,000 ppm(수명)**, UBER ≤ **1e-16**(설계 타깃 1e-17).
2. **다이 수**: 61TB=512 → 122TB=1,024 → 245/256TB=1,024~1,067 → 512TB=2,133 (2Tb 다이 기준).
3. **무보호 요구 per-die**: **8.6 → 4.3 → 4.1 → 2.1 ppm/yr** = **약 1 FIT → 0.5 FIT → 0.25 FIT**.
4. **현실**: Google 필드 실측 역산 **40~550 ppm/yr (5~60 FIT)**. → **무보호로는 1.5~2 자릿수 부족**.
5. **완화**: 15+1 단일 패리티 = **125~255배 완화** (요구 527~1,077 ppm/yr), 14+2 2중 패리티 = **740~1,910배 완화** (요구 3,948~6,398 ppm/yr), 오버헤드 각각 6.25% / 12.5%.

---

## 8. 갭 리스트 — 재검증·추가 수집 필요 (프록시 해제 또는 검색 예산 복구 후)

| 우선 | 필요한 것 | 어디서 |
|---|---|---|
| ★★★ | OCP DC NVMe SSD Spec **v2.7 본문의 AFR·UBER 요구 ID와 절번호** (현재 0.44%는 2차 인용) | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf |
| ★★★ | **스페어 다이 / die sparing** 공개 문서 (현재 근거 0건) | SNIA SDC, FMS/FutureMemoryStorage proceedings, 벤더 특허 |
| ★★★ | **RAID6형 2중 패리티의 벤더 채택 근거** (현재 근거 0건) | Micron US11609819 / US11397642 청구항, Kioxia·Samsung 백서 |
| ★★★ | QLC vs TLC **RBER 배수 · LDPC 코드율 · read-retry** 공개 수치 | JEDEC/ISSCC/IEEE IRPS 논문, 벤더 FMS 발표 |
| ★★ | MDPI Appl.Sci. 10(24):9149 **Flash Aware RAID-Like Protection** 의 수식·가정 다이 수·정량 개선폭 | https://www.mdpi.com/2076-3417/10/24/9149 |
| ★★ | Micron RAIN 브리프 **원문**의 패리티 비율 목록·오버헤드 표 | https://storageconsortium.de/files/brief_ssd_rain%5B1%5D.pdf |
| ★★ | Schroeder FAST'16 **원문**의 bad chip 정의·드라이브 다이 수 (§5-4 가정 제거용) | https://www.usenix.org/system/files/conference/fast16/fast16-papers-schroeder.pdf |
| ★★ | Meta/Facebook SIGMETRICS'15 Narayanan "SSD Failures in Datacenters" 수치 | ACM DL |
| ★ | Solidigm 61.44/122.88TB **실제 패키지·다이 수** (teardown) | TechInsights 리포트, StorageReview/STH 분해 사진 |
| ★ | Solidigm/Intel **AIU** 문서, Kioxia·Samsung die 보호 백서 | 벤더 tech brief |
| ★ | NetApp ACM TOS 2020 필드 스터디 AFR 수치 | https://dl.acm.org/doi/pdf/10.1145/3423088 |

---

## 부록 — 검증 스크립트

`scratchpad/research/calc.py` — 정확 이항분포로 §5-2·5-3 표를 재현. 소p 근사와 정확식의 오차는 전 구간 <1%.
