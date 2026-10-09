# TLC eSSD 수요의 "왜 TLC인가" 분할 원장: 내구성 등급 제약(A) · 성능 제약(B) · 관행·가격·인증(C), QLC 성능 격차 완화 근거 (2026 · 2030)

**수집일**: 2026-10-09
**유형**: 웹 팩트 원장 (Research Agent, 해석 없음. 산술은 8장에 ⚠️로 분리)
**용도**: 사용자 질문(2026-10-09) 검증용 수치 수집. 원문: "If QLC SSD rated DWPD is raised to near 1 (via WAF reduction with customer co-design), how big is the TLC market QLC can enter? Is there TLC demand where performance does not matter and only endurance is needed? If performance matters, how is QLC's performance gap overcome?" 즉 현재·미래 TLC eSSD 수요를 TLC가 선택되는 이유별로 (A) 정격 DWPD 규격만이 QLC를 배제하는 용량·읽기 중심 수요, (B) 지연·IOPS·랜덤 쓰기·꼬리 지연 때문에 TLC가 필요한 성능 제약 수요, (C) QLC급 가격의 대용량 TLC · 인증 관성 등 관행·가격 수요로 나누고, B에서 QLC 성능 격차를 메우는 기법의 실측 근거를 모은다.
**접근 한계**: 프록시가 이번 세션에서 solidigm.com, kioxia.com, engineering.fb.com, files.futurememorystorage.com, theregister.com, storagereview.com, openconnect.netflix.com을 모두 막았다(EGRESS_BLOCKED 확인). **✅ 없음.** 모든 값은 검색 엔진 스니펫 경유다.
**등급**: ✅ = 1차 원문 직접 열람 / 🟡 = 검색 스니펫 또는 2차 보도(1차 출처라도 원문 미열람) / ⚠️ = 출처 충돌, 단일 스니펫 미재확인, 저신뢰 출처, 또는 파생 계산

---

## 0. 기존 원장과의 관계 (중복 수집하지 않고 ID로만 참조)

| 약칭 | 원장 | 이 원장에서 참조하는 ID |
|---|---|---|
| TQ | [tlc-to-qlc-addressable-market-2026-10.md](tlc-to-qlc-addressable-market-2026-10.md) | TQ-12~TQ-16(FI 계열 ≤1 DWPD 비중 75% → 80% → 91% → 99%(2028), 대수 기준), TQ-18(하이퍼스케일 ≤1 DWPD 관행), TQ-19(Kioxia NX1 TLC 1 DWPD), TQ-20(체크포인트 3 DWPD), TQ-21(QLC 체크포인트 TLC 대비 17% 미만 차), TQ-23 · TQ-24(VAST · DDN QLC SuperPOD), TQ-28(VDURA 30TB QLC/TLC 가격비 약 0.80), TQ-32(6500 ION QLC 가격 TLC), TQ-35(Meta 3계층), TQ-42(6550 ION), TQ-45(QLC 캐파 선점), **7장 TLC eSSD 2026 약 353~435EB(중앙 417EB), 2030 약 540~1,200EB, 2030 QLC 비중 가정 38~50%** |
| WQ | [qlc-waf-qos-op-factcheck-2026-10.md](qlc-waf-qos-op-factcheck-2026-10.md) | WQ-03(QLC 정격 0.075~0.6, 6600 ION 순차 1.0), WQ-07(6550 ION 1 RDWPD@16K · 0.25@4K), WQ-17(CacheLib FDP WAF 3.22 → 1.03), WQ-18(WARP 적대 워크로드 FDP WAF 4.49 · 2.58), WQ-19(DapuStor QLC FDP WA≈1.0), WQ-21(CSAL), WQ-22(Meta QLC WAF 2.0 가정), WQ-27 · WQ-30 · WQ-31(배치로 꼬리 지연 2~6배 감소), WQ-28(Samsung FDP p99.9 −55%), WQ-34(QLC 프로그램 2~3ms · 읽기 120~200µs), WQ-36~WQ-38(TLC/QLC 데이터시트 쌍), P-8 · P-9(랜덤 쓰기 대역 · 읽기 지연 비) |
| DA | [essd-demand-by-application-2030-2026-10.md](essd-demand-by-application-2030-2026-10.md) | AI-01(학습 7 → 127EB), AI-09 · AI-10(CMX 약 35EB 2026), AI-11(KV 75~100EB 2027, 2028 약 2배), AI-15(McKinsey 추론 447EB 2030), AI-17(Solidigm 25EB/GW 중 컨텍스트 6.4 · DAS 6.1), AI-28(McKinsey 1,078EB), 8장(기타 eSSD 2030 약 504EB) |
| EO | [essd-outlook-research-firms-2026-10.md](essd-outlook-research-firms-2026-10.md) | TF-03(하이퍼스케일러가 KV 캐시용 QLC 주문 상향), TF-05(eSSD 용량 중 QLC 18%(2026E) → 38%(2027F)), OT-08(SanDisk AI DC 플래시 2030 약 1.2ZB = 학습 스테이징 40% · KV 35% · 데이터 레이크 25%) |
| CQ | [agent-vm-and-cloud-ssd-requirements-2026-10.md](agent-vm-and-cloud-ssd-requirements-2026-10.md) | CQ-01 · CQ-02(OCP 스펙 이력, QoS 표 미확보), CQ-19(Alibaba 로컬 디스크 3.84TB × 8), CQ-25(블록 스토리지 쓰기:읽기 3:1 · 2.35:1), CQ-28(Meta R+4W ≥ 32MB/s/TB = 기존 PC-51) |
| PD | [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md) | A28 · D07(Kioxia CM9 25.6TB TLC 3 DWPD KV 캐시용), D05(KV는 1~3 DWPD 다수 병렬), D12(Solidigm CMX 제시 드라이브는 TLC D7-PS1010), E02 · E03(2026 조달 DWPD 하향, RI 추론은 QLC 0.3~1.0), E08(⚠️ 북미 DC SSD 2024 3 DWPD 53%, Mordor) |
| MX | [ssd-mixed-media-hyperscaler-logic-2026-10.md](ssd-mixed-media-hyperscaler-logic-2026-10.md) | MX-01~MX-04(Kioxia Mixed Mode: pSLC 0.5~2% VoC, "random IO performance is the driving factor"), MX-10 · MX-11 · MX-16(CSAL WAF≈1), MX-15(QLC drop-in 실패 = IU + GC), MX-33(P5336 99.99% 쓰기 QD128 9,540µs), MX-34(Alibaba TLC 로컬 디스크 p99.9 >1ms), MX-35(CSAL 포화 p99.99 약 501ms) |
| CU | [ssd-customer-high-dwpd-evidence-2026-10.md](ssd-customer-high-dwpd-evidence-2026-10.md) | CU-03(CacheLib OP 50%), CU-13a(Microsoft 0.07~0.23 DWPD), CU-15(NetApp 중앙값 0.36 · 7%+ 3 DWPD 초과), CU-16(NetApp 약 95% QLC 이동 시 조기 마모 없음) |
| HB | [qlc-essd-history-2022-background-2026-09.md](qlc-essd-history-2022-background-2026-09.md) | Pure FlashArray//C(2019) e2e 지연 2~4ms |

---

## 1. 워크로드 · 스토리지 티어별 eSSD 수요 분할과 하이퍼스케일러 티어링 진술 (항목 1)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-01 | Meta 엔지니어링 블로그: QLC 대상은 "16~20TB HDD 수준인 약 10 MB/s/TB" 워크로드, 그리고 **"large batch workloads that do not need very high performance but still are in the 15-20 MB/s/TB range and use TLC flash today"**. 대상 워크로드는 "read-bandwidth-intensive with infrequent as well as comparatively low write bandwidth requirements". 이전 완료가 아니라 후보로 제시 | 10 · 15~20 MB/s/TB | Meta, 2025-03-04 (The Register 2025-03-07 재보도) | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ , https://www.theregister.com/2025/03/07/meta_proposes_qlc_ssds_as/ | 🟡 |
| WT-02 | Meta FMS 2025(Sumit Gupta) 슬라이드 스니펫: HDD 클러스터 공급 약 **5~7 MB/s/TB**, 워크로드 수요 **1~100+ MB/s/TB**, **TLC SSD 클러스터는 전력 제약으로 약 100 MB/s/TB**. 요구식 R + 4W ≥ 32 MB/s/usable-TB(usable = raw 90%, WAF 2.0에서 측정), QLC 랙 10PB+, 쓰기 대역을 읽기 대비 4배 가중. 열린 질문으로 "hotter workloads by HDD byte stranding vs. moving to QLC" | MB/s/TB | Meta FMS 2025-08-06 | https://files.futurememorystorage.com/proceedings/2025/20250806_QLCP-201-1_Gupta.pdf | 🟡 (R+4W 식은 기존 PC-51 · CQ-28, 이번 신규는 HDD 5~7 · TLC 100 · 수요 1~100+) |
| WT-03 | Netflix Open Connect 하드웨어 페이지: 2U **스토리지 어플라이언스**는 "reliable dense storage and cost effective throughput", 이전 판 문구 **"enough low cost NAND to reach 10GB/s of throughput (<0.3 DWPD)"**, raw 최대 360TB, 운영 처리량 약 96Gbps. 신판은 DWPD 문구 삭제, SSD 공급사 Kioxia 또는 Micron 표기 | <0.3 DWPD, 10GB/s | Netflix(페이지 날짜 미표기, 두 판 스니펫) | https://openconnect.netflix.com/hardware | 🟡 (NAND 종류 미표기, TLC/QLC 불명) |
| WT-04 | Google Colossus: L4 인덱스 서버가 블록이 SSD 캐시에 있는지 알려 주는 구조, 최대 파일시스템 읽기 50TB/s · 쓰기 25TB/s 초과. 과거 Janus(ATC'13): **데이터 1%를 플래시에 두어 읽기 28%를 플래시에서 처리**. CacheSack(ATC'22): Colossus Flash Cache 목표는 HDD 읽기 감소, 운영비 6.5% 개선 | 1% → 28% | Google Cloud 블로그 2025-03-26 · USENIX ATC'13 · ATC'22 | https://cloud.google.com/blog/products/storage-data-transfer/how-colossus-optimizes-data-placement-for-performance , https://www.usenix.net/system/files/conference/atc13/atc13-albrecht.pdf , https://www.usenix.net/system/files/atc22-yang-tzu-wei.pdf | 🟡 (Google의 플래시는 HDD 앞 캐시 계층, QLC 공식 공개 없음) |
| WT-05 | TrendForce(2026-09-21): QLC가 **벡터 DB**에서 "broader adoption", 대용량 · 비용 효율로 비정형 데이터 대량 저장에 적합. 미국 CSP eSSD 수요 상향은 "not confined to high-performance TLC products" | 정성 | TrendForce 2026-09-21 | https://www.trendforce.com/presscenter/news/20260921-13246.html | 🟡 (EO TF-04 · TQ-06과 같은 발표, 벡터 DB 문구 신규) |
| WT-06 | Micron FQ4 FY26: **7600(Gen5) · 9650(Gen6) TLC SSD를 KV 캐시 용도로 고객 출하**, 6600 ION(QLC) 물량 램프. DC SSD 분기 약 $10B | 정성 | Micron, 2026-09-30 | https://www.unite.ai/?p=477116 | 🟡 (KV 캐시 = TLC 성능 티어 사례) |
| WT-07 | 엔터프라이즈 SSD를 워크로드(DB · 가상화 · 오브젝트 · CDN · 분석)별로 나눈 출하 EB, 또는 "스토리지 서버 대 컴퓨트 서버" 부착 분할은 **이번 검색에서 찾지 못함**. TrendFocus 공개분은 인터페이스(SATA · SAS · PCIe) 분할뿐, Forward Insights SSD Insights는 cloud/enterprise 분할(유료) | 미확보 | StorageNewsletter(TrendFocus) · GII(FI) | https://www.storagenewsletter.com/2021/02/15/333-million-ssds-shipped-in-2020-corresponding-to-207eb/ , https://www.gii.co.jp/report/foin996665-ssd-insights-21.html | 🟡 (부정 확인) |

**1장 판독(사실만)**: 성능 요구를 MB/s/TB로 공개한 하이퍼스케일러는 Meta뿐이다(HDD 5~7, QLC 목표 R+4W ≥ 32, TLC 배치 워크로드 15~20, TLC 클러스터 약 100). Meta는 **TLC 위에 있는 배치 워크로드가 QLC 후보**라고 명시했다(WT-01). Netflix 스토리지 어플라이언스는 <0.3 DWPD 저가 NAND로 설계됐다(WT-03). 워크로드별 EB 분할은 공개 자료가 없다(WT-07).

## 2. 용량·읽기 중심으로 포지셔닝된 대용량 TLC 제품 (항목 2, 세그먼트 C 근거)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-08 | Micron 6500 ION(232L **TLC**, 30.72TB) 워크로드별 정격: **128KB 순차 1.0 / 90:10 0.9 / 80:20 0.85 / 70:30 0.75 / 50:50 0.55 / 4KB 랜덤 0.3 DWPD**. 대상: AI 데이터 레이크, 오브젝트 스토어, 범용 벌크 클라우드 스토리지. "TLC performance at QLC price points", 144L Solidigm D5-P5316(QLC)과 경쟁 가격(달러 가격 미공개) | DWPD 6점 | Micron 제품 브리프 · AnandTech 18863, 2023-05 | https://www.anandtech.com/show/18863 , https://www.mouser.com/pdfDocs/Micron6500IONSSDProductBriefEN.pdf | 🟡 (TQ-32 보강: 혼합 비율별 정격 신규) |
| WT-09 | Micron 6550 ION(G8 **TLC**, 61.44TB, Gen5) 대상: AI 데이터 레이크, 학습 데이터 인제스트, 체크포인트, 분석, HPC, 파일 · 오브젝트, **퍼블릭 클라우드 용량 티어, CDN**. 61.44TB는 "previously required QLC". 유통 목록 1 DWPD, 4K 랜덤 쓰기 70K IOPS. CDW 소매가 E3.S 61.44TB $31,841.99 · U.2 $32,678.09(조회 시점 미상) | DWPD · $ | TechRadar · SHI · CDW · 리뷰 요약 | https://www.techradar.com/pro/worlds-largest-pcie-gen5-ssd-gets-tested-and-reaches-almost-13gbps-in-sequential-read-60tb-micron-6550-ion-is-super-fast-as-it-swaps-qlc-for-tlc , https://www.cdw.com/product/micron-6550-ion-ssd-enterprise-61.44-tb-pci-express-5.0-x4-nvme/8284166 | 🟡 (유통 목록 28,000TB 내구성 표기는 1 DWPD와 불일치, ⚠️) |
| WT-10 | Kioxia CD9P-R(BiCS8 **TLC**, 1.92 · 3.84TB는 BiCS5): 2.5인치 **1 DWPD, 최대 61.44TB**, 랜덤 읽기 최대 2,600K · 랜덤 쓰기 450K IOPS(용량별 상이, 30.72TB E3.S는 270K). StorageReview 적합 용도: 하이퍼스케일 · 클라우드 플릿, **OLTP 읽기 티어, CDN, 읽기 중심 가상화**. 단일 포트, 쓰기 중심은 CD9P-V(MU)로 안내. CD8P-R 7.68TB 대비 랜덤 쓰기 200K → 450K | 1 DWPD · 61.44TB | Kioxia 제품 페이지 · StorageReview, 2025 | https://www.kioxia.com/en-jp/business/ssd/data-center-ssd/cd9p-r.html , https://storagereview.com/review/kioxia-cd9p-r-review-read-intensive-gen5-up-to-61-44tb | 🟡 |
| WT-11 | Kioxia CD8P-R(BiCS5 **TLC**): 1 DWPD, 최대 30.72TB, 하이퍼스케일 대상, 용도 표기 빅데이터 · IoT · OLTP · 가상화(오브젝트 · 용량 티어 문구 없음). 랜덤 쓰기 200K IOPS | 1 DWPD · 30.72TB | Kioxia 제품 페이지 | https://www.kioxia.com/en-jp/business/ssd/data-center-ssd/cd8p-r.html | 🟡 |
| WT-12 | SK hynix PS1012(61TB)는 **QLC**(TLC 아님), PCIe Gen5 U.2, 순차 읽기 13GB/s, 122TB 확장 계획. PS1101 245TB도 QLC(E3.L). 두 제품 DWPD 미공개 | 정성 | SK hynix 뉴스룸 2024-12-18 · TechRadar | https://news.skhynix.co.kr/presscenter/ps1012-u2-development , https://www.techradar.com/pro/samsung-archrival-showcases-245tb-pcie-gen5-ssd-joining-kioxia-huawei-and-sandisk-with-solidigm-samsung-and-micron-expected-to-launch-similar-products-in-2026 | 🟡 (질문의 "PS1012 = 용량형 TLC" 전제 정정) |
| WT-13 | Solidigm D5-P5430은 **192L QLC**(TLC 아님): 3.84~30.72TB, 정격 최대 0.58 DWPD, 랜덤 쓰기 120K IOPS. 대상 "mainstream"(이메일 · 의사결정 지원 · 오브젝트 · VDI)과 "read-intensive"(CDN · 데이터 레이크 · VoD), "typically 80% reads or higher". **"read performance equivalent to the most widely-adopted TLC SSDs"**, **TLC PCIe SSD drop-in 대체**, 선도 TLC 대비 **수명 총 기록량 최대 +14%**, 오브젝트 스토리지 TCO 최대 −27%, 밀도 1.5배 | 0.58 DWPD · +14% · −27% | Solidigm 2023-05-16 (BusinessWire · Blocks & Files · Techstrong) | https://www.businesswire.com/news/home/20230516005023/en , https://blocksandfiles.com/2023/05/16/solidigm-qlc-datacenter-ssd/ , https://techstrong.it/?p=82354 | 🟡 (벤더 주장, 비교 TLC 모델 미공개) |
| WT-14 | 같은 소매상(CDW) 61.44TB 비교 스냅숏: Solidigm D5-P5336(QLC) U.2 $19,204.99 · $25,950.95 · $31,521.99(같은 품번에 세 가격), 별도 품번 $27,316.99 · $19,727.55 | $ | CDW 목록(시점 미상) | https://www.cdw.com/product/solidigm-d5-p5336-61.44-tb-solid-state-drive-2.5-internal-u.2-pci-exp/7785193 | ⚠️ (스냅숏 시점 불명, 실거래가 아님) |

**2장 판독(사실만)**: 30TB 이상 **TLC** 중 용량 · 읽기 중심(데이터 레이크 · 오브젝트 · CDN · 클라우드 용량 티어)을 명시 대상으로 둔 제품은 Micron 6500 ION(4K 랜덤 0.3 DWPD, QLC 가격점)과 6550 ION, Kioxia CD9P-R(61.44TB, 1 DWPD)이다. 6500 ION은 **TLC인데도 랜덤 정격이 QLC급(0.3)** 이다. 질문에서 예로 든 SK hynix PS1012와 Solidigm D5-P5430은 둘 다 QLC다(WT-12 · WT-13).

## 3. 조달에서 "1 DWPD"의 의미 (항목 3, 세그먼트 A 근거)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-15 | OCP Datacenter NVMe SSD 스펙 · NVMe Cloud SSD 1.0a · Hyperscale NVMe Boot SSD 1.0 모두 Endurance 장(데이터 · 보존 조건 · "Endurance Targets")을 두지만 **DWPD 요구 수치는 검색으로 확보하지 못함**(기존 CQ-02의 QoS 표 미확보와 같은 상태) | 미확보 | OCP · Teledyne LeCroy 시험 개요 · Allion | https://www.opencompute.org/documents/hyperscale-nvme-boot-ssd-specification-v1-0-pdf , https://fr.teledynelecroy.com/files/pdf/al_testing_ocp_nvme_cloud_ssd_testing.pdf | 🟡 (부정 확인) |
| WT-16 | OCP Cloud SSD 정합을 표기한 Kioxia XD6 데이터시트는 **1 DWPD**. Kioxia CD8-R 1 DWPD · CD8-V 3 DWPD 쌍 | 1 / 3 DWPD | Kioxia 데이터시트 | https://www.compuram.biz/documents/datasheet/KIOXIA-XD6.pdf | 🟡 (벤더 정격, 규격 요구치 아님) |
| WT-17 | Micron 비교(TechTarget 인용): **960GB TLC 1 DWPD와 1.92TB QLC 0.5 DWPD는 하루 기록량이 거의 같다**. DWPD는 용량 대비 값이라 같은 문턱을 용량이 다른 드라이브에 적용하면 비교가 왜곡된다는 취지 | TB/일 동일 | TechTarget | https://www.techtarget.com/it-infrastructure/tip/QLC-vs-TLC-SSDs-Which-is-best-for-your-storage-needs | 🟡 |
| WT-18 | Solidigm D5-P5336 122.88TB: **0.6 DWPD는 32KB 랜덤 쓰기 기준, 134.3 PBW**. 5년 뒤 잔여 내구성 32KB 워크로드 5% · 4K 워크로드 12%(리뷰 기술) | 0.6 DWPD · 134.3 PBW | StorageReview, 2024~25 | https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency | 🟡 (기존 WQ-03의 0.58~0.6에 측정 블록 크기 · PBW 보강) |
| WT-19 | Solidigm 페이지: 두 대규모 연구 인용, **"94% of workloads are read-intensive, with a median read-to-write ratio of approximately 78/22"**, **"99% of SSDs consume less than 15% of their usable life"**. mainstream은 약 80/20, CDN · 데이터 레이크는 90/10 이상 | 94% · 78/22 · 99% · 15% | Solidigm(연구 원문 미표기) | https://www.solidigm.com/products/technology/read-dominant-workload-qlc-for-cloud-enterprise-storage.html | 🟡 (TQ-16의 94% 출처 보강, 99%/15%는 신규. 벤더 인용) |
| WT-20 | 엔드유저 측 "QLC 배제 = 내구성 규격" 진술: TechRadar는 하이퍼스케일 QLC의 최대 쟁점을 내구성으로, DWPD를 엔터프라이즈 SSD 기준선으로 기술. 하이퍼스케일러 조달 문서가 QLC를 DWPD로 배제한다는 1차 진술은 **찾지 못함** | 정성 | TechRadar | https://www.techradar.com/news/solidigm-15tb-ssd-is-cheapest-big-drive-but-it-wont-fit-your-pc | 🟡 (1차 근거 부재) |

**3장 판독(사실만)**: "1 DWPD RI가 하이퍼스케일 기본 SKU"라는 근거는 벤더 정격(TQ-18 · TQ-19 · WT-16)과 FI 대수 비중(TQ-12~TQ-15)이며, **OCP 규격의 DWPD 요구 수치나 하이퍼스케일러가 DWPD로 QLC를 배제한다는 1차 문서는 확보하지 못했다**. 반대 방향으로, 같은 하루 기록량을 DWPD가 아닌 TB/일 · PBW로 보면 대용량 QLC가 소용량 TLC 1 DWPD를 넘는다는 진술(WT-17, WT-18, 8장 산술)이 있다.

## 4. 워크로드 성능 허용치 근거 (항목 4)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-21 | NetApp AFF **C-Series(QLC)** 지연 약 **2~4ms** 대 AFF A-Series(TLC) **1ms 미만, 통상 약 500µs**. NetApp TR: 두 제품군은 컨트롤러 · NVRAM · WAFL 쓰기 경로를 공유하므로 지연 차이는 거의 매체(QLC) 때문. 대상: sub-ms가 필요 없는 워크로드, HDD · 하이브리드 어레이 대체 | 2~4ms 대 0.5ms | NetApp 2023 출시 · TR-4969 · Architecting.it · Wikipedia | https://www.netapp.com/media/85630-tr-4969.pdf , https://www.architecting.it/?p=4734 , https://en.wikipedia.org/wiki/NetApp_FAS | 🟡 (리셀러 한 곳은 "sub-millisecond" 표기, ⚠️ 충돌) |
| WT-22 | Pure FlashArray//C(QLC) 약 2~4ms 대 //X는 마이크로초급, 451 Research: TLC 엔터프라이즈 AFA는 통상 1ms 미만. //C는 Tier 2 대상, 2세대(2020)는 온드라이브 SLC 캐시 사용 · Optane 캐시 없음 | 2~4ms | Pure · 451 Research · Blocks & Files, 2019~2020 | https://www.purestorage.com/content/dam/pdf/en/analyst-reports/ar-451-pure-storage-pitches-price-slashing-qlc-flash-storage.pdf , https://blocksandfiles.com/2020/08/25/pure-storage-gen-2-flasharrayc/ | 🟡 (HB 원장의 2~4ms 보강, 2019~20 자료) |
| WT-23 | Amazon S3 Express One Zone: "consistent single-digit millisecond first-byte read and write" 지연, S3 Standard 대비 최대 10배 빠름. Blocks & Files는 Standard를 두 자릿수 ms로 추론 | 한 자릿수 ms · 10× | AWS 문서 · Blocks & Files 2023-11-29 | https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-express-performance.html , https://blocksandfiles.com/2023/11/29/aws-s3-express-one-zone/ | 🟡 (Standard 수치는 AWS 공식 아님) |
| WT-24 | Kioxia(벡터 DB 성능 브리프): RAG 파이프라인 지연은 LLM 추론(최대 수 초)이 지배하므로 **ANNS 단계 지연 요구는 약 100ms까지 완화 가능**. CD8P-R(TLC) 위 DiskANN이 모든 데이터셋 크기에서 메모리 HNSW보다 QPS 우위(벤더 시험) | 약 100ms | Kioxia 성능 브리프 | https://americas.kioxia.com/en-ca/business/resources/performance-brief/cd8p-smc-llm-vectordb.html | 🟡 |
| WT-25 | NetApp Milvus + DiskANN(LAION 10M): QPS 10.93, recall 0.9987, p99 708.2ms, **병목은 호스트 CPU**. VU Amsterdam 연구: Milvus에서 DiskANN이 IVF 대비 처리량 최대 3.2배, 최대 대역 1.7GiB/s로 **SSD를 포화시키지 못함** | CPU 병목 · 1.7GiB/s | NetApp 문서 · VU 연구 | https://docs.netapp.com/us-en/netapp-solutions/ai/vector-database-performance-validation.html , https://research.vu.nl/en/publications/storage-based-approximate-nearest-neighbor-search-what-are-the-pe/ | 🟡 (TLC/QLC 직접 비교 없음) |
| WT-26 | AI 학습 데이터 로딩 요구: NVIDIA · DDN(DGX-2 세대) 고속 티어 집계 읽기 >32GB/s, 노드 >5GB/s, 희망 **GPU당 1GB/s 읽기**. Solidigm SuperPOD 브리프 GPU당 2GB/s(노드 16GB/s 초과), NetApp MLPerf ResNet-50 실측 DGX A100당 2~3GB/s, "다수 DGX 전까지 스토리지는 병목 아님" | GB/s | NVIDIA RA · Solidigm · NetApp | https://www.nvidia.com/content/dam/en-zz/solutions/data-center/documents/nvpod-superpod-ddn-ra09734001.pdf , https://solidigm.com/products/technology/solidigm-ssds-in-superpod-ai-storage-nvidia-vast-data.html , https://www.netapp.com/blog/nvidia-dgx-pod-racing/ | 🟡 (구세대 기준, 최신 NVIDIA 지침 미확보) |
| WT-27 | VAST: QLC 드라이브를 SCM 대비 통상 **3배 수**로 구성, SCM 버퍼로 수 GB 단위 QLC 소거 블록에 full-stripe 쓰기(GC · RMW 회피). 2024년 대형 **AI 체크포인트 쓰기는 SCM을 건너뛰고 QLC로 직접 기록(spillover)**. SCM 쓰기 RAID화로 성능 +50% | 3:1 · +50% | VAST 블로그 | https://vastdata.com/blog/weve-got-the-write-stuff-baby | 🟡 (TQ-23 보강, 지연 수치 없음) |
| WT-28 | KV 캐시 SSD 오프로드 성능 연구(py-kvcache, arXiv 2609.11744): 80k 토큰에서 디스크 로드가 LMCache 대비 2.0배 빠름, LMCache TTFT 206ms 대 Offload 128ms. **SSD 모델 · NAND 종류 미표기** | ms | arXiv, 2026-09-10 | https://arxiv.org/pdf/2609.11744 | 🟡 (QLC/TLC 비교 없음) |

**4장 판독(사실만)**: 시스템 단 지연 예산이 ms 단위인 워크로드(RAG ANNS 약 100ms, 오브젝트 S3 Standard 두 자릿수 ms 추론, Tier 2 어레이 2~4ms 허용)가 공개돼 있고, 같은 컨트롤러에서 QLC 매체만 바꿀 때 어레이 지연이 약 0.5ms → 2~4ms가 된다(WT-21). 학습 데이터 로딩 요구는 GPU당 1~2GB/s 수준의 순차 읽기이며, QLC 시스템이 SuperPOD 인증을 받았다(TQ-23 · TQ-24). 반대로 KV 캐시는 현재 TLC로 출하된다(WT-06, PD D07 · D12).

## 5. QLC 성능 격차 완화 기법과 실측 (항목 5)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-29 | Solidigm CSAL 레퍼런스 플랫폼: **TLC 10개(CSAL 없음) 대 SLC 3개 + QLC 7개(CSAL)** 비교에서 **네트워크 병목으로 두 구성 성능 동일**, QLC 구성 **TCO 35% 낮음**. 별도 페이지: AI 데이터 파이프라인 10PB 기준 all-HDD 대비 TCO 40% 우위. 지연 · WAF 수치는 미공개 | 동일 성능 · −35% | Solidigm 솔루션 브리프(D5-P5336) | https://solidigm.com/products/technology/csal-based-reference-storage-platform.html | 🟡 (첫 검색 스니펫 1회, 재검색에서 구성 문구 재확인 실패, ⚠️) |
| WT-30 | SNIA SDC25(CSAL RAID5F): 9 × D5-P5336 + **쓰기 캐시 8 × D7-P5810(SLC 800GB)**, 4KiB 랜덤 쓰기 QD128 · 8 jobs 대 Linux MDRAID. 캐시 조회 약 **100ns 대 기존 약 8,000ns**, 4TiB 캐시 메타데이터 DRAM **약 84GB → 약 2.5GB**. 측정 IOPS · WAF 결과 표는 스니펫에 없음 | ns · GB | SNIA SDC25 Barczak · Mehta, 2025-10 | https://www.snia.org/sites/default/files/2025-10/SNIA-SDC25-Barczak-Mehta-CSAL-with-Core-Scaling-RAID5F.pdf | 🟡 (WQ-21의 WA −30% · 처리량 2배와 같은 발표군) |
| WT-31 | Solidigm CSAL 페이지: "CSAL maintains a WAF of very close to 1 on the QLC drives", 고성능 캐시 장치일수록 호스트 쓰기 성능 상승, **"TLC-equivalent read performance offered by Solidigm's QLC SSDs"** 를 활용 | WAF ≈1 | Solidigm · Wiwynn 백서 | https://www.solidigm.com/products/technology/cloud-storage-acceleration-layer-write-shaping-csal.html , https://www.wiwynn.com/whitepapers/white-paper-platform-optimization-for-performance-and-endurance-with-qlc-and-cloud-storage-acceleration-layer | 🟡 (MX-10과 같은 문구, 읽기 성능 동등 주장 추가) |
| WT-32 | SanDisk UltraQLC(SN670, BiCS8 2Tb CBA): **pSLC 버퍼 없이 QLC 직접 기록(Direct Write QLC)**. Tom's Hardware: 네이티브 QLC 프로그램 약 800~1,200µs 대 pSLC 약 200~300µs, 대신 긴 쓰기에서 일관. **Dynamic Frequency Scaling으로 같은 전력에서 약 +10% 성능**, 보존 관련 재기록 약 −33%(내부 시험). 공개 벤치마크 없음 | µs · +10% · −33% | SanDisk 2025-08 · Tom's Hardware | https://tomshardware.com/pc-components/ssds/sandisk-unveils-colossal-new-256tb-ssd-with-new-ultraqlc-flash-memory-enterprise-grade-ssds-for-high-density-storage-also-come-in-128tb | 🟡 (벤더 내부 시험, WQ-34의 QLC 프로그램 2~3ms와 수치 차) |
| WT-33 | 프로그램 서스펜드의 QLC 한계(특허): QLC는 한 프로그램당 서스펜드 횟수 상한이 있어 소진 후 읽기가 프로그램 완료를 기다림. 예시 모델: QLC 프로그램 약 10ms, 연속 읽기에서 서스펜드 5회 소진 후 마지막 읽기 대기 **약 9,880µs 대 처음 5개 읽기 약 280µs**. Wu & He(FAST'12): P/E가 평균 읽기 지연을 약 2배로 키움 | 9,880µs 대 280µs | USPTO 11138102 · US 10956081 · FAST'12 | https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11138102 , https://usenix.org/event/fast12/tech/full_papers/Wu.pdf | 🟡 (특허 예시 모델, 실측 아님) |
| WT-34 | Kioxia FMS 2025(Rory Bolt) "FDP: Use Cases" 스니펫: RocksDB FDP 플러그인 사용 시 **백엔드 드라이브 WAF 1.06 대 ext4 · FDP 끔 2.20**, 총 WAF **5.34 대 15.01**(KV 워크로드, 채움 67%로 표기된 스니펫, XD8 · 256GB 축소 펌웨어). Kioxia OCP 2025 발표: RAID-5(드라이브 4개) WAF −46% · 처리량 MDRAID 대비 8.22배, 미러 2개 WAF 1/3 · 1.45배 | WAF | Kioxia FMS 2025-08-06 · OCP 2025-10-09 보도자료 | https://files.futurememorystorage.com/proceedings/2025/20250806_FARC-203-1_Bolt.pdf , https://www.storagenewsletter.com/2025/10/14/ocp-global-summit-2025-kioxia-improves-flash-storage-lifespan-and-performance-in-rocksdb-with-new-open-source-software/ | ⚠️ (1.06 · 2.20 · 67%는 두 번째 검색에서 재확인 실패, **XD8은 TLC라 QLC 실측 아님**) |
| WT-35 | Samsung RocksDB FDP 블로그(PM9D3a, TLC): WAF **2.95(비FDP) → 2.71(기본 FDP) → 2.02(최적화 FDP)** | WAF | Samsung 반도체 기술 블로그 | https://semiconductor.samsung.com/news-events/tech-blog/optimizing-rocksdb-write-amplification-on-fdp-ssds | 🟡 (WQ-28의 −8% · −30%를 절대값으로 보강, TLC) |
| WT-36 | Silicon Motion · Micron(FMS 2024): N48R **QLC** 16TB에서 FDP(RUH 8) 대 비FDP 순차 FIO 측정, "FDP extends QLC NAND life by reducing WAF and GC". **측정값 미확보**. QLC에서 FDP의 2025~26 실측 WAF · 쓰기 대역 개선치는 이번에도 찾지 못함 | 미확보 | FMS 2024 Cheng | https://files.futurememorystorage.com/proceedings/2024/20240806_FARP-101-1_Cheng.pdf | 🟡 (WQ-20과 같은 자료, 부정 확인) |

**5장 판독(사실만)**: QLC 성능 격차 완화의 공개 실측은 (i) 시스템 수준 SLC/SCM 쓰기 버퍼 + 호스트 FTL(CSAL, VAST)로 WAF≈1과 "TLC 10개와 같은 성능"(네트워크 병목 조건) 주장, (ii) FDP · 배치 힌트의 WAF · 꼬리 지연 개선(대부분 **TLC 드라이브** 실측: WQ-17 · WQ-28 · WT-34 · WT-35), (iii) 드라이브 내부 기법(직접 기록, 주파수 조절, 서스펜드)의 벤더 내부 수치다. **QLC 드라이브 단독으로 TLC급 QoS(예: 99.99% 쓰기 지연)를 달성했다는 수치는 찾지 못했다**(MX-33의 P5336 QD128 쓰기 9,540µs가 유일한 QLC 쓰기 QoS 공개값).

## 6. QLC 정격 내구성 궤적 (항목 6)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-37 | Samsung BM1743 **0.26 DWPD**, 전작 BM1733 **0.18 DWPD**, 보존 1개월 → 최대 3개월 | 0.18 → 0.26 | PCGamesN · ITC, 2024 | https://www.pcgamesn.com/samsung/122tb-bm1743-ssd | 🟡 |
| WT-38 | DapuStor R6060: 5세대 **QLC 122TB, 0.6 DWPD**, 최대 245TB | 0.6 DWPD | StorageReview 2026 리더보드(불어판) | https://www.storagereview.com/fr/best/enterprise-ssds | 🟡 |
| WT-39 | Micron 5210 ION(첫 QLC, 2018): QLC NAND 약 1,000 P/E, Lenovo 사양 0.2 · 0.2 · 0.09 · 0.05 DWPD(용량 · 워크로드별) | 0.05~0.2 | AnandTech 12744 · Lenovo LP1223 | https://at-web1.www.anandtech.com/show/12744/micron-launches-first-qlc-nand-micron-5210-ion-enterprise-sata-ssd , https://lenovopress.lenovo.com/lp1223.pdf | 🟡 |
| WT-40 | **랜덤 기준 1 DWPD 이상으로 정격된 QLC 엔터프라이즈 SSD 발표는 2026년 검색에서 찾지 못함**. 순차 기준 1.0은 Micron 6600 ION(WQ-03), 6500 ION(TLC)의 순차 1.0 · 랜덤 0.3과 같은 구조 | 부정 확인 | 검색 결과 | (WQ-03 · WT-08) | 🟡 |

**6장 판독(사실만)**: 공개 QLC 정격 궤적은 0.05~0.2(2018) → 0.18(BM1733) → 0.26(BM1743) · 0.35(SN670) · 0.41(P5316) · 0.58~0.6(P5430 · P5336 · R6060)이며 모두 랜덤 기준이다. 순차 1.0(6600 ION)이 유일한 "1 DWPD" 표기다. 측정 블록 크기(4K · 16K · 32K · 64K)가 제품마다 달라 같은 숫자도 같은 의미가 아니다(TQ-42, WT-18, WQ-05).

## 7. 용량형 대 성능형 eSSD 시장 분할 수치 (항목 7)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WT-41 | eSSD(또는 TLC eSSD)를 **용량 최적화 대 성능 최적화**로 나눈 대수 · 비트 · 매출과 2028 · 2030 전망은 **찾지 못함**(TrendForce · Forward Insights · IDC · Gartner · Omdia · Yole). 30TB 이상 "high-capacity" 세그먼트 정의는 저신뢰 집계 사이트에만 있고 수치 없음 | 미확보 | 검색 결과 | https://www.gii.co.jp/report/foin996665-ssd-insights-21.html | 🟡 (부정 확인) |
| WT-42 | 가장 가까운 공개 분할: (i) TrendForce eSSD **용량** 중 QLC 18%(2026E) → 38%(2027F)(EO TF-05), (ii) SanDisk AI DC 플래시 2030 = 학습 스테이징 40% · KV 35% · 데이터 레이크 25%(EO OT-08), (iii) McKinsey 2030 eSSD 1,078EB = 학습 127 · 추론(RAG DB 포함) 447 · 기타 약 504EB(DA AI-01 · AI-15 · 8장), (iv) Solidigm 1GW당 25EB 중 컨텍스트 메모리 6.4 · DAS 6.1EB(DA AI-17), (v) FI ≤1 DWPD 대수 비중 75~91%(→ 2028 99%)(TQ-12~TQ-15), (vi) ⚠️ Mordor 북미 DC SSD 2024 물량 중 3 DWPD 53%(PD E08) | 다양 | 기존 원장 | (기존 원장) | 🟡 · ⚠️ |

---

## 8. 파생 계산 (⚠️ 산술, 2026-10-09)

모든 값은 위 사실과 기존 원장 ID의 사칙연산이며, **세그먼트 분할 비율은 공개 자료가 없어(WT-07 · WT-41) 명시적 가정**이다. 점 추정이 아니라 3개 시나리오의 범위로 쓴다.

### 8-1. 단위 환산 (세그먼트 정의의 근거)

| 항목 | 산식 | 값 |
|---|---|---|
| 1 DWPD의 지속 쓰기 대역 | 1TB/일 ÷ 86,400초 = 1,000,000MB ÷ 86,400 | **약 11.6 MB/s/TB** (0.3 DWPD ≈ 3.5, 0.6 ≈ 6.9) |
| Meta QLC 요구식의 최대 쓰기 몫 | R + 4W ≥ 32(WT-02), 전부 쓰기면 W = 8 MB/s/TB | 8 ÷ 11.6 ≈ **호스트 0.69 DWPD**(Meta는 WAF 2.0을 가정하고 성능을 측정, WT-02) |
| Meta "TLC 위 배치 워크로드" 15~20 MB/s/TB(WT-01)를 R/W 80/20(WT-19의 약 78/22 근사)로 분해 | R = 12~16, W = 3~4 → R + 4W = 24~32 | QLC 요구 32의 **75~100%**, 쓰기 W 3~4 MB/s/TB ≈ **0.26~0.35 DWPD** |
| Netflix 스토리지 어플라이언스 | 10GB/s ÷ 360TB(WT-03) | 읽기 약 **27.8 MB/s/TB**, 쓰기 <0.3 DWPD ≈ <3.5 MB/s/TB |
| 드라이브당 5년 총 기록량 | 용량 × DWPD × 1,825일 | P5336 122.88TB × 0.6 = **약 134.6PB**(WT-18 표기 134.3PB), TLC 30.72TB × 1 = **약 56.1PB**, CD9P-R 61.44TB × 1 = **약 112.1PB**, 6500 ION 30.72TB × 0.3(4K) = **약 16.8PB** |
| RAG 지연 예산 대 QLC 읽기 지연 | 약 100ms(WT-24) ÷ 100~110µs(WQ-37 · P-9) | 약 **900~1,000배** |
| 어레이 지연 QLC/TLC | 2~4ms ÷ 0.5ms(WT-21) | 약 **4~8배** |
| 61.44TB 소매가 $/TB(⚠️ 시점 불명) | 6550 ION $31,841.99 ÷ 61.44, P5336 $19,204.99~$31,521.99 ÷ 61.44 | 6550 ION 약 $518/TB, P5336 약 $313~513/TB → 비율 약 0.60~0.99 (실거래가 아님, TQ-28 VDURA 0.80과 비교만) |

### 8-2. 세그먼트 정의 (상호 배타, 주된 선택 이유 1개로 귀속)

- **B1 (성능 · KV 캐시)**: KV 캐시 · CMX 티어. 현재 TLC 1~3 DWPD 출하(WT-06, PD D05 · D07 · D12). TF-03은 일부 QLC 주문을 보고하므로 TLC 몫만 계산.
- **B2 (성능 + 내구성, MU/WI 등급)**: 3 DWPD 이상 TLC. FI 계열 ≤1 DWPD 대수 비중의 여집합(TQ-12~TQ-15)을 비트 비중 대용으로 사용.
- **B3 (성능 · RI 등급)**: 1 DWPD RI TLC 중 DB · OLTP · VM 부트/로컬 디스크 · 블록 스토리지 · 캐시처럼 지연 · 랜덤 쓰기 · QoS 때문에 TLC인 몫.
- **A (내구성 등급만)**: RI TLC 중 용량 · 읽기 중심(오브젝트, 데이터 레이크, CDN, 백업, 배치 분석, AI 학습 데이터 · 체크포인트 보관, 벡터 DB 저장) 몫에서 C를 뺀 것. QLC가 ~1 DWPD로 정격되면 넘어갈 몫.
- **C (관행 · 가격 · 인증)**: 같은 용량 · 읽기 중심 몫 중 이미 QLC급 랜덤 정격 · 가격의 대용량 TLC(6500 ION 0.3 DWPD, 6550 ION, CD9P-R 61TB)로 공급되거나 인증 관성 · QLC 공급 선점(TQ-45)으로 TLC인 몫. 정격 DWPD를 올려도 직접 효과가 없고 가격 · 공급 · 인증으로 결정.

### 8-3. 가정 (모두 출처 없음 또는 대용 지표, 범위로만 사용)

| 기호 | 의미 | QLC 불리(L) | 중앙(M) | QLC 유리(H) | 근거 |
|---|---|---|---|---|---|
| T | TLC eSSD EB | 2026 353 / 2030 540 | 2026 417 / 2030 870(범위 중점) | 2026 435 / 2030 1,200 | TQ 7-1 |
| B1 | KV 캐시 TLC EB | 2026 35 / 2030 200 | 2026 35 / 2030 200 | 2026 35 / 2030 150 | 2026: DA AI-09 · AI-10 약 35EB. 2030: DA AI-11의 2027 75~100EB × 2(2028) ≈ 150~200EB를 TLC 몫 상한으로 사용(SanDisk 2030 KV 약 420EB(OT-08)는 TLC/QLC 미구분이라 미사용, TF-03의 QLC 이동을 H에 반영). **가정** |
| m | B2 비중(나머지 R = T − B1 중) | 25% | 2026 17% / 2030 15% | 2026 9% / 2030 5% | FI ≤1 DWPD 75~91%(→ 2028 99%)의 여집합(대수 기준을 비트에 적용, TQ 8장 1번 정의 불일치 승계). Mordor 3 DWPD 53%(PD E08)는 저신뢰라 범위 밖, 9장에 기록 |
| c | RI 중 용량 · 읽기 중심 비중 | 30% | 45% | 60% | **출처 없는 가정**. 방향 근거: Solidigm 워크로드 94% RI(WT-19, 대수가 아닌 워크로드 수), SanDisk AI DC 2030 비KV 65%(OT-08), Meta "TLC 위 배치 워크로드가 QLC 후보"(WT-01), CD9P-R · 6550 ION의 CDN · 용량 티어 대상(WT-09 · WT-10) |
| s | 용량 몫 중 C 비중 | 40% | 2026 30% / 2030 25% | 2026 20% / 2030 15% | **출처 없는 가정**. 근거: QLC 가격점 대용량 TLC 제품군 존재(WT-08~WT-10), QLC 캐파 선점(TQ-45). 2030은 QLC 공급 확대로 축소 가정 |

산식: R = T − B1, B2 = R × m, RI = R − B2, Cap = RI × c, B3 = RI − Cap, C = Cap × s, A = Cap − C, B = B1 + B2 + B3. 검산 A + B + C = T.

### 8-4. 결과 (⚠️)

| 연도 · 시나리오 | T | B1 | B2 | B3 | **B 합** | **C** | **A** | A + C |
|---|---|---|---|---|---|---|---|---|
| 2026 L | 353 | 35 | 318 × 0.25 = 79.5 | 238.5 × 0.70 = 167.0 | **281.5 (80%)** | 71.6 × 0.40 = **28.6 (8%)** | **42.9 (12%)** | 71.6 |
| 2026 M | 417 | 35 | 382 × 0.17 = 64.9 | 317.1 × 0.55 = 174.4 | **274.3 (66%)** | 142.7 × 0.30 = **42.8 (10%)** | **99.9 (24%)** | 142.7 |
| 2026 H | 435 | 35 | 400 × 0.09 = 36.0 | 364 × 0.40 = 145.6 | **216.6 (50%)** | 218.4 × 0.20 = **43.7 (10%)** | **174.7 (40%)** | 218.4 |
| 2030 L | 540 | 200 | 340 × 0.25 = 85.0 | 255 × 0.70 = 178.5 | **463.5 (86%)** | 76.5 × 0.40 = **30.6 (6%)** | **45.9 (8%)** | 76.5 |
| 2030 M | 870 | 200 | 670 × 0.15 = 100.5 | 569.5 × 0.55 = 313.2 | **613.7 (71%)** | 256.3 × 0.25 = **64.1 (7%)** | **192.2 (22%)** | 256.3 |
| 2030 H | 1,200 | 150 | 1,050 × 0.05 = 52.5 | 997.5 × 0.40 = 399.0 | **601.5 (50%)** | 598.5 × 0.15 = **89.8 (7%)** | **508.7 (42%)** | 598.5 |

- **요약(⚠️)**: 2026년 TLC eSSD 약 353~435EB 중 **A(내구성 등급만) 약 43~175EB(중앙 약 100EB)**, **C(관행 · 가격 · 인증) 약 29~44EB**, **B(성능) 약 217~282EB**. 2030년 TLC 약 540~1,200EB 중 **A 약 46~509EB(중앙 약 192EB)**, **C 약 31~90EB**, **B 약 464~614EB**.
- **B 중 완화 기법으로 열릴 수 있는 몫(민감도, 가정)**: B3(RI 성능형)의 20% / 40%가 CSAL · Mixed Mode · FDP 등으로 ms 지연 허용 티어(WT-21 · WT-22의 2~4ms Tier 2)로 이동한다고 가정하면 2026 M 174.4 × 0.2~0.4 ≈ **약 35~70EB**, 2030 M 313.2 × 0.2~0.4 ≈ **약 63~125EB**. 20 · 40%는 출처 없는 민감도 값이다.
- **기존 원장 대비 정합 점검**: TQ 7-2의 2026 전환 가능 몫 약 80~277EB(등급 필터 × 전환율 30~70%)와 비교하면, 이번 A + C 2026 약 72~218EB(중앙 143EB)는 그 범위 안쪽이다. 2030 TQ 약 120~800EB 대 이번 A + C 약 77~599EB.
- **A의 크기를 가장 크게 흔드는 변수**: c(RI 중 용량형 비중, 30~60% 가정)와 T(2030 총량 2.2배 차). m(MU/WI 비중)은 FI 대수 기준이라 비트 기준이면 더 작을 수 있다(MU 제품군 최대 용량이 RI보다 작음, WQ-40: P5620 12.8TB 대 P5520 15.36TB, PM1735 12.8TB 대 PM1733 30.72TB).

## 9. 충돌·한계

1. **분할 비율 자체가 가정**: 워크로드별 · 성능 요구별 eSSD EB 분할은 공개 자료가 없다(WT-07 · WT-41). 8장의 c · s는 출처 없는 가정이며 결과 범위의 대부분이 이 두 값에서 나온다.
2. **대수 기준을 비트에 적용**: FI ≤1 DWPD 비중(TQ-12~TQ-15)은 출하 · 배치 대수 기준이고 QLC 업체(DapuStor) 재인용이 포함된다. Mordor의 "북미 DC SSD 2024 물량 중 3 DWPD 53%"(PD E08 · WQ-53)는 정반대 방향이며 저신뢰라 범위에서 제외했다. 이를 채택하면 B2가 2026 약 170~210EB로 커져 A가 크게 줄어든다.
3. **"내구성만 문제" 진술의 1차 근거 부족**: 하이퍼스케일러 조달 문서나 OCP 규격의 DWPD 요구 수치를 확보하지 못했다(WT-15 · WT-20). "성능은 충분한데 정격 DWPD 때문에 배제"를 가장 직접 보여 주는 것은 Meta의 "TLC 위 배치 워크로드가 QLC 후보"(WT-01)와 Solidigm P5430의 "TLC drop-in, 읽기 TLC 동등, 수명 기록량 +14%"(WT-13, 벤더) 정도다.
4. **완화 실측의 매체 불일치**: FDP의 WAF · 지연 개선 실측 대부분이 TLC 드라이브(WQ-17 · WQ-28 · WT-34 · WT-35)다. QLC FDP 실측(WQ-19 DapuStor WA≈1.0, WT-36 SMI)은 조건 미공개 또는 수치 미확보다.
5. **CSAL 레퍼런스 결과의 조건**: "TLC 10개와 같은 성능"(WT-29)은 **네트워크 병목** 조건이라 드라이브 성능 동등을 뜻하지 않는다. 재검색에서 구성 문구를 재확인하지 못했다(⚠️).
6. **수치 충돌**: QLC 프로그램 시간 약 800~1,200µs(WT-32, Tom's) 대 2~3ms(WQ-34) 대 특허 예시 약 10ms(WT-33). NetApp C-Series 지연 2~4ms 대 리셀러 "sub-millisecond"(WT-21). 6550 ION 유통 목록 28,000TB 내구성 대 1 DWPD(WT-09).
7. **KV 캐시 귀속**: B1을 TLC로 놓았으나 TrendForce는 하이퍼스케일러가 KV 캐시용 QLC 주문을 늘린다고 보고했다(TF-03, 중국 DeepSeek 구성은 QLC 오프로드 TQ-06). 2030 B1 150~200EB는 2027 · 2028 전망의 연장이며 SanDisk 2030 KV 약 420EB(OT-08)를 쓰면 B가 더 커진다.
8. **가격**: 소매가 스냅숏(WT-09 · WT-14)은 시점 불명이고 같은 품번에 세 가격이 있어 실거래 비교로 쓸 수 없다.
9. **질문 전제 정정**: SK hynix PS1012와 Solidigm D5-P5430은 TLC가 아니라 QLC다(WT-12 · WT-13). 용량형 TLC의 실제 예는 Micron 6500 · 6550 ION과 Kioxia CD9P-R 61.44TB다.

## 10. 미확보 (찾지 못함)

1. eSSD · TLC eSSD의 **워크로드별(DB · VM · 블록 · 오브젝트 · CDN · AI 데이터) 또는 용량형/성능형 EB · 매출 분할**과 2028 · 2030 전망.
2. **스토리지 서버 대 컴퓨트(AI · 범용) 서버 부착 SSD 비트 분할**(TrendForce · IDC 유료 범위로 추정).
3. **OCP Datacenter NVMe SSD 스펙 · 하이퍼스케일러 표준 SKU의 DWPD 요구 수치**, DWPD로 QLC를 배제한다는 조달 문서.
4. eSSD **내구성 등급별 비트 분할**(RI · MU · WI), RI TLC 중 성능 때문에 TLC인 비중.
5. QLC 드라이브 단독 **TLC급 QoS 실측**(99.99% 쓰기 · 읽기 지연), **QLC 위 FDP의 2025~26 실측 WAF · 대역**, CSAL의 측정 IOPS · 지연 표(SDC22 · SDC23 · SDC25 결과 슬라이드).
6. **랜덤 기준 ≥1 DWPD QLC** 제품 발표(없음), Kioxia LC9 · LD4 · SanDisk UltraQLC의 순차 기준 정격.
7. Google · Microsoft · AWS의 QLC 또는 용량 플래시 티어 공식 수치, Netflix 어플라이언스 NAND 종류, Meta QLC 티어 EB.
8. 6500 · 6550 ION · CD9P-R 61.44TB 등 대용량 TLC의 출하 EB와 QLC 대비 실거래 가격.
9. RAG · 벡터 DB · 오브젝트 스토리지의 **QLC 대 TLC 직접 비교** 벤치마크.
