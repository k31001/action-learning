# QLC WAF · 테일 지연 · OP · 초고DWPD 전략 초안 팩트체크 원장 (C1~C5)

**수집일**: 2026-10-09
**유형**: 웹 팩트체크 원장 (Research Agent, 해석 없음. 판정 줄과 ⚠️ 산술만 예외)
**용도**: 사용자 신규 전략 초안의 다섯 주장 검증.
- C1. "고객은 더 많은 데이터를 더 낮은 비용·전력으로 쓰고 싶어 하지만 정격 DWPD는 계속 낮아졌다. 셀이 SLC에서 QLC로 진화하며 WAF를 줄이는 데 근본적 한계에 부딪혔기 때문이다."
- C2. "WAF는 더 좋은 SSD를 만드는 것만으로는 해결할 수 없고 고객 시스템과의 협력이 필요하다."
- C3. "고객 협력으로 QLC WAF를 1 근처로 낮추고 GC를 줄이면 테일 지연이 줄어든다."
- C4. "기존 TLC SSD도 WAF를 줄이면 더 적은 OP로 고객 요구를 만족시켜 원가를 줄일 수 있다."
- C5. "새로 떠오르는 초고DWPD 시장에서의 경쟁력도 강화된다."

**기존 원장(중복 수집하지 않고 ID로 인용)**: [qlc-v6-waf-measurement-trend-2026-09.md](qlc-v6-waf-measurement-trend-2026-09.md)(W01~W41) · [qlc-v7-placement-cases-waf-2026-09.md](qlc-v7-placement-cases-waf-2026-09.md)(A-·B-·C-·D-·E-·Q-) · [fdp-technical-limits-adoption-context-2026-08.md](fdp-technical-limits-adoption-context-2026-08.md) · [component-to-system-solution-ladder-facts-2026-09.md](component-to-system-solution-ladder-facts-2026-09.md)(F1~F54) · [essd-rated-dwpd-products-2008-2026-2026-10.md](essd-rated-dwpd-products-2008-2026-2026-10.md)(§7 집계) · [ssd-customer-high-dwpd-evidence-2026-10.md](ssd-customer-high-dwpd-evidence-2026-10.md)(CU-) · [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(H-·P-·C-·D-·X-·F-). 표에서 "(기존 X)"는 그 원장의 ID다.

**접근 한계**: 프록시가 snia.org · arxiv.org · kioxia.com · anandtech.com · storagenewsletter.com · colfax-intl.com · papers.cool 등 1차 도메인을 막았다. 열람이 된 곳은 `raw.githubusercontent.com`과 GitHub `git clone`뿐이다.
**등급**: ✅ = 1차 원문·데이터를 이번 세션에 직접 열람(GitHub의 CacheLib 공식 문서, SSD-iq 논문 저자 데이터 저장소·분석 스크립트) / 🟡 = 검색 스니펫·재보도(1차 출처라도 원문 미열람 포함) / ⚠️ = 출처 충돌·벤더 단독·조건 미공개·파생(산술).

---

## 1. C1: 정격 DWPD 하락과 QLC의 WAF

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WQ-01 | 셀 P/E 보증 범위: SLC 30,000~100,000 / MLC 3,000~10,000 / TLC 800~3,000 / QLC 약 100~1,000. QLC 엔터프라이즈 "3,000 P/E" 서술은 원문 미확인 | P/E | 기존 F4 · P-22 · P-23 · P-24 | (기존 원장) | 🟡 |
| WQ-02 | 출시 등급 정격 DWPD 중앙값(5년 환산, 특수 제품 제외): 2008~12 **10** → 2013~15 **3** → 2016~18 **1.5** → 2019~21 **1** → 2022~26 **1**. 10 DWPD 이상 비중 67% → 0% | 중앙값 | 기존 essd-rated §7 (226개 등급 집계, 판매량 비가중) | (기존 원장) | 🟡 |
| WQ-03 | 최신 QLC 정격: Solidigm D5-P5336 0.58~0.6, Kioxia LC9 0.3, Samsung BM1743 0.26, SanDisk SN670 0.35, Micron 6600 ION 0.075(4K) / 0.3(16K) / 1.0(순차) | DWPD | 기존 Q-01~Q-04 · essd-rated §6 | (기존 원장) | 🟡 |
| WQ-04 | Solidigm IU(indirection unit) 증가: D5-P5430 4KB(3.84~15.36TB), 30.72TB는 8KB → D5-P5336 **16KB**. 매체 평가: "IU 증가는 특히 랜덤 쓰기에서 백엔드 정리(clean-up) 부담을 늘려 쓰기 IOPS 열세를 설명", "컨트롤러 메모리·원가 절감 목적으로 보임" | 4 → 8 → 16KB | StorageReview P5430 리뷰(2023) · Blocks&Files 2023-07-20 | https://www.storagereview.com/review/solidigm-d5-p5430-30-72tb-review · https://blocksandfiles.com/2023/07/20/solidigm-highest-capacity-pcie-ssd/ | 🟡 |
| WQ-05 | D5-P5316(144L QLC) IU **64KB**(StorageReview) 대 **16KB**(AnandTech) 충돌. 정격 0.41 DWPD는 "100% 64KB 랜덤 쓰기" 기준(30.72TB 22,930TBW) | 64KB / 16KB | StorageReview P5430 리뷰 · AnandTech 18864 · Solidigm P5316 브리프 | https://www.storagereview.com/review/solidigm-d5-p5430-30-72tb-review · https://anandtech.com/show/18864 · https://www.rutronik.com/fileadmin/rutronik/Micropages/Solidigm/Solidigm_D5-P5316_ProductBrief_White_Cloud-Inspired.pdf | ⚠️ 충돌 |
| WQ-06 | Micron 6600 ION: 245.76TB는 **16K IU**, 30.72TB는 **4K IU**. 4K 랜덤 0.075 RDWPD, 16K 랜덤 0.3 RDWPD (기존 E-06 보강: IU 차이 명시) | 4K / 16K IU | StorageReview 6600 ION 리뷰(2026) | https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay | 🟡 |
| WQ-07 | Micron 6550 ION(30.72~61.44TB): **1 RDWPD @16KB 랜덤 / 0.25 RDWPD @4KB 랜덤 / 1 SDWPD @128K 순차**, 5년 | DWPD | StorageReview 6550 ION 리뷰(2024) | https://www.storagereview.com/review/the-micron-6550-ion-ssd-gen5-performance-energy-efficiency-and-high-capacity-in-one-drive | 🟡 |
| WQ-08 | Kioxia LC9 E3.L 245.76TB 공식 표: 지속 랜덤 쓰기 **45 KIOPS @16KiB**, DWPD **0.075 @4KiB / 0.3 @16KiB**. 2.5인치 표: 122.88TB **16KiB IU**(35 KIOPS @16KiB), 61.44TB **4KiB IU**, 30.72TB 150 KIOPS @4KiB (표 일부가 깨져 열 대응 불확실) | IOPS · DWPD · IU | Kioxia LC9 제품 페이지(검색 요약) | https://www.kioxia.com/en-jp/business/ssd/enterprise-ssd/lc9-e3l.html · https://www.kioxia.com/en-jp/business/ssd/enterprise-ssd/lc9.html | 🟡 / ⚠️ 표 대응 |
| WQ-09 | Samsung BM1743 128TB급(FMS 2024 전시): 16KB 랜덤 쓰기 **45K IOPS**, 랜덤 읽기 1.6M IOPS, 순차 7.5 / 3 GB/s. **16KB IU는 매체 추정이며 삼성 공식 표기 아님** | 45K @16KB | AnandTech 2024-08 | https://anandtech.com/show/21526 | ⚠️ 추정 |
| WQ-10 | Micron 블로그(Luca Bert): 4KB 쓰기가 16KB 매핑 단위에 들어가면 16KB를 읽고 4KB를 고쳐 16KB 전체를 다시 써야 하므로 **최악 SSD 수명 1/4**. 벤치마크·앱 트레이스의 IO 1억 건 이상을 16KB IU 정렬로 후처리한 결과 추가 증폭은 **일반적으로 5% 미만(WAF ≥ 1.05x 수준)**, 256KB 비정렬 쓰기도 약 **1.06x**. "4K 랜덤 쓰기 FIO 벤치마크 관행은 비현실적" 주장. DRAM:용량 1:1,000 비율이 대용량에서 지속 불가하다는 것이 동기 | 최악 4× / 실측 <1.05 | Micron 블로그 · StorageNewsletter 재게재 2023-10-12 | https://www.storagenewsletter.com/2023/10/12/from-micron-real-life-workloads-allow-more-efficient-data-granularity-and-enable-large-ssd-capacities/ | 🟡 (벤더) |
| WQ-11 | Solidigm CSAL 페이지: 호스트 스택이 수년간 4KiB에 맞춰져 있어 **비정렬 쓰기는 펌웨어 read-modify-write로 WAF가 오른다**. 4KiB IU에서도 있으나 **8 · 16 · 64KiB IU에서 더 두드러진다**. 큰 IU는 FTL 테이블과 DRAM을 줄여 원가·전력을 낮추기 위한 것 | 정성 | Solidigm 기술 페이지 | https://www.solidigm.com/products/technology/platform-optimization-for-performance-and-endurance-qlc-csal.html | 🟡 |
| WQ-12 | Alibaba · Solidigm CSAL 발표: "QLC SSD는 단순 대체(drop-in)가 안 된다. 근본 원인은 **IU 기반 디바이스 주소 매핑과 NAND GC가 만드는 두 단계 write amplification**". 고밀도 SSD는 원가 절감을 위해 큰 IU 사용, 멀티테넌시가 내부 FTL의 증폭을 키움 | 정성 | SNIA SDC22 Ye · Karkra, SDC23 Karkra | https://www.snia.org/sites/default/files/2025-05/SNIA-SDC22-Ye-Karka-Cloud-Storage-Acceleration-Layer.pdf | 🟡 |
| WQ-13 | 특허 서술: 용량 증가에 따라 IU가 4KiB에서 16 · 64KiB로 커질 전망, 4KiB IU에 512B 쓰기는 약 8배 증폭. 별도 특허: 큰 접근 단위는 매핑 테이블 DRAM을 줄인다 | 8× (512B on 4KiB) | USPTO 11,861,219 · 12,468,469 | https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11861219 · https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/12468469 | 🟡 |
| WQ-14 | 3D NAND 층수 증가 → 블록당 페이지 증가("big block problem") → 소거 지연·GC 복사 비용·WAF 증가. 완화 연구: 부분 소거 PEN(FAST'18, 쓰기 지연 −44.3% / −47.9%), 서브블록 우선 쓰기(GLSVLSI'24, GC 유발 쓰기 −9.6%) | 정성 · % | USENIX FAST'18 Liu · Mountain Scholar(2024) | https://usenix.org/conference/fast18/presentation/liu · https://www.mountainscholar.org/items/50ba3e8b-aa31-4559-8f06-734fa0e79550/full | 🟡 |
| WQ-15 | FDP Reclaim Unit(≈ 슈퍼블록) 크기: "현재 구현에서 통상 수 GB(예 **6GB**)". SNIA 권고: RU 크기를 슈퍼블록 크기에 맞춤. Kioxia: 슈퍼블록(RU)은 매우 클 수 있고 RUH 수는 적게 유지될 것 | 약 6GB | Samsung "Getting started with FDP v4" 백서 · SNIA SDC2024 Helmick | https://download.semiconductor.samsung.com/resources/white-paper/getting-started-with-fdp-v4.pdf · https://snia.org/sites/default/files/2025-05/SNIA-SDC2024-Helmick-Nuances-of-FDP-Implementation.pdf | 🟡 |
| WQ-16 | 고객 동기(쓰기량 · 전력): Meta "QLC 계층은 10 MB/s/TB 영역 성능에 의존하는 워크로드 대상", "NAND 전력 대부분은 쓰기에서 나오므로 QLC로 전력이 낮아질 것" | 10 MB/s/TB | Meta Engineering 블로그 2025-03-04 | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ | 🟡 |

**판정: 수정 필요.** 정격 DWPD 하락(WQ-02)의 주원인은 셀 P/E 감소(WQ-01)이고 TLC 주류 정격은 2019년 이후 1 DWPD로 평탄하다(WQ-02). 다만 고밀도 QLC는 큰 IU(WQ-04~WQ-09)와 큰 블록·RU(WQ-14·WQ-15)로 소형 쓰기의 WAF를 한 단계 더 키웠다(WQ-12, 4K 정격이 16K 정격의 1/4: WQ-06~WQ-08). 따라서 "WAF를 줄이는 데 한계"보다 "P/E가 줄었는데 WAF는 줄지 않았고, QLC는 IU 증폭이 더해졌다"가 근거에 맞다. 벤더는 실 워크로드의 IU 페널티가 5% 미만이라고 주장한다(WQ-10).

## 2. C2: SSD 단독으로는 해결 불가, 고객 시스템 협력 필요

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WQ-17 | CacheLib 공식 문서 재확인(2026-10-09): 1.88TB FDP SSD, KV 캐시 트레이스. 100% 사용 **3.22 → 1.03**, 50% 사용 **1.22 → 1.03**. 프로덕션은 WAF 억제를 위해 **SSD의 최대 50%를 호스트 OP**로 사용. CDN 워크로드(BigHash 없음)는 FDP 효과 없음 (기존 W17~W20 재확인) | WAF | Meta CacheLib 문서 | https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md | ✅ |
| WQ-18 | WARP(FAST'26) 저자 발표 요약: FDP는 "보장이 아닌 **best-effort 인터페이스**"이며 벤더 펌웨어 정책에 결과가 좌우. **적대적 3-스트림 워크로드에서 FDP 활성 WAF 4.49×(상용 드라이브 1) · 2.58×(드라이브 2)**. noisy RUH, F2FS 사용자 쓰기 99%가 WARM 단일 RUH로 몰려 붕괴 (기존 W27 · D-01~D-04의 수치 공백 보강, 드라이브 모델·QLC 여부 미공개) | 4.49× / 2.58× | SNIA 세션 요약(검색 스니펫) | https://www.snia.org/node/19669 · https://github.com/MoatLab/WARP-FAST26-AE | 🟡 |
| WQ-19 | DapuStor + Marvell(FMS 2024): Bravera SC5 컨트롤러 + DapuStor 펌웨어에 FDP 알고리즘 통합으로 **WA ≈ 1.0**, H5000 QLC 시리즈 대상. 워크로드 · 기간 · 기준선 미공개 | ≈1.0 | DapuStor PR 2024-07-30 · StorageReview | https://futurememorystorage.com/news/industry-news/download/77/PR-07-30-2024_DapuStor.pdf · https://www.storagereview.com/news/dapustor-expands-collaboration-with-marvell-to-enhance-qlc-and-tlc-ssd-performance | ⚠️ 벤더 · 조건 미공개 |
| WQ-20 | Silicon Motion(FMS 2024): 16TB 엔터프라이즈 SSD + **Micron N48R QLC**, FDP 활성(RUH 8) 대 비활성, FIO 순차 8 jobs 측정. **수치 미확보** | 미확보 | FMS 2024 FARP-101 Cheng | https://files.futurememorystorage.com/proceedings/2024/20240806_FARP-101-1_Cheng.pdf | 🟡 (수치 미확보) |
| WQ-21 | Solidigm CSAL: UBIX UbiCube 통합 시 WAF ≈ 1(벤더 주장). SDC25 RAID5F 예비 결과 WA −30% · 처리량 최대 2×. FMS 2024 CSAL-on-FDP는 **QEMU 에뮬레이션**, 표준 SSD 위 CSAL WAF 약 3.8 대 ZNS SSD 약 2.3(막대 판독) | ≈1 · −30% · 3.8 → 2.3 | Solidigm UBIX 페이지 · SNIA SDC25 Barczak · FMS 2024 Barczak | https://www.solidigm.com/products/technology/ubix-dpu-native-storage-csal-and-qlc.html · https://www.snia.org/sites/default/files/2025-10/SNIA-SDC25-Barczak-Mehta-CSAL-with-Core-Scaling-RAID5F.pdf · https://files.futurememorystorage.com/proceedings/2024/20240806_FARP-101-1_Barczak.pdf | ⚠️ 벤더 · 에뮬레이션 |
| WQ-22 | Meta(Sumit Gupta, FMS 2024 · 2025) "Improving QLC write efficiency using FDP": QLC 쓰기 성능이 크게 낮고 **고사용률 WA가 쓰기 I/O를 HDD 수준 가까이로 떨어뜨림**, "WAF 절감은 곧 앱 쓰기 대역폭". 2025 덱은 QLC 랙 목표 성능을 **WAF 2.0 가정**으로 산정. 측정 개선폭 미확보 | WAF 2.0 가정 | Terrapinn 연사 소개 · FMS 2025 QLCP-201 | https://www.terrapinn.com/conference/future-memory-storage/speaker-sumit-GUPTA.stm · https://files.futurememorystorage.com/proceedings/2025/20250806_QLCP-201-1_Gupta.pdf | 🟡 |
| WQ-23 | **SSD 단독 차이(반대 근거) · SSD-iq 저자 데이터 직접 분석**: 4KB 균일 랜덤 쓰기, 드라이브 100% 채움, 구간별 물리/호스트 쓰기 비(OCP 카운터)의 후반 10% 중앙값: Kioxia CM7-R 3.84TB **4.40**, Samsung PM9A3 960GB **4.20**, Micron 7450 PRO 960GB **3.19**, Micron 7450 MAX 800GB **1.89**. Solidigm D7-P5520 1.92TB는 카운터가 간헐적이라 비0 구간만 약 3.6. SK hynix PE8110 · WD는 카운터 0(비교 불가) | 1.89~4.40 | Haas · Lee · Bonnet · Leis, PVLDB 18(11) 2025 저자 데이터(`finalwa03c`), 장치 표 `devices.csv`, 라벨 매핑 `paper.R`(mp → 7450 MAX) | https://github.com/gabriel-haas/ssdiq-paper-assets · https://github.com/gabriel-haas/ssdiq | ✅ (데이터) · 중앙값 집계는 ⚠️ 산술 |
| WQ-24 | 동 데이터: 쓰기 편중(zones 80/20 · 90/10)은 다수 드라이브에서 WAF를 낮추지 못함(CM7-R 4.40 → 5.09, 7450 PRO 3.19 → 3.70). 논문 요지: 다수 모델이 greedy 유사 GC, 지능형 GC 모델만 편중 워크로드에서 이득 | WAF | 동 저자 데이터 · 논문 요약 | https://www.vldb.org/pvldb/vol18/p4295-haas.pdf | ✅ (데이터) / 🟡 (논문 문구) |
| WQ-25 | SSD-iq GC 시뮬레이터(저자 CSV): 균일 랜덤은 알고리즘 무관 WAF 약 4.17. 95/5 편중에서 greedy **5.90** · 2R-FIFO **2.06** · 오프라인 최적 **1.44** → 디바이스 GC 개선은 편중이 있을 때만 효과. 시뮬레이터 채움률 조건은 미확인(README 예시 0.875) | WAF | `plotzone.csv` · `plotzipf.csv` | https://github.com/gabriel-haas/ssdiq-paper-assets | ✅ (조건 일부 미확인) |
| WQ-26 | 해석 모델 대 실장치: OP 0.147에서 모델 예측 약 3.9~4.1, 실제 SSD 측정 **1.19** (워크로드 조건 원문 미확인) | 3.9~4.1 대 1.19 | Park 외, ICPE'17 "Practical implication of analytical models for SSD write amplification" | https://research.spec.org/icpe_proceedings/2017/proceedings/p257.pdf · https://pure.uos.ac.kr/en/publications/practical-implication-of-analytical-models-for-ssd-write-amplific/ | 🟡 |

**판정: 부분 지지.** OP를 늘리지 않고 WAF를 1 근처로 만든 공개 결과는 모두 호스트가 수명 정보를 준 경우다(WQ-17, 기존 W21 · W22 · C-05). 다만 SSD 단독으로도 OP(WQ-23의 7450 MAX 1.89)와 편중 대응 GC(WQ-25)로 WAF를 낮출 수 있어 "SSD만으로는 불가"는 과하다. 협력해도 FDP는 best-effort라 4.49×까지 나빠질 수 있다(WQ-18). QLC에서 호스트 협력으로 WAF ≈1을 얻은 결과는 벤더 주장(WQ-19 · WQ-21)뿐이다.

## 3. C3: WAF ≈1 · GC 감소 → 테일 지연 감소

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WQ-27 | ZNS(ATC'21): 같은 하드웨어의 블록 인터페이스 대비 RocksDB **99.9p 랜덤 읽기 지연 최소 2~4배 낮음**, 쓰기 처리량 2× (기존 W13) | 2~4× | USENIX ATC'21 Bjørling | https://www.usenix.org/conference/atc21/presentation/bjorling | 🟡 |
| WQ-28 | Samsung 기술 블로그: **PM9D3a 7.68TB**, XFS, YCSB 2억 레코드. FDP 기본 분류는 일반 SSD 대비 WAF −8%, 최적화 분류는 **WAF −30% · OPS +10% · p99.9 테일 지연 55% 개선** | p99.9 −55% | Samsung Semiconductor 기술 블로그 | https://semiconductor.samsung.com/news-events/tech-blog/optimizing-rocksdb-write-amplification-on-fdp-ssds/ | 🟡 |
| WQ-29 | FMS 2025 Samsung 발표(TorFS): RocksDB p99.9 · p99.99 지연을 비FDP 대 FDP로 비교, WAF 값 **2.7 · 2.4 · 1.89** 표기. 막대와 조건(비FDP / FDP 기본 / FDP 최적화)의 대응은 추정, 지연 수치 미확보 | 2.7 / 2.4 / 1.89 | FMS 2025 FARC-203 Javier González | https://files.futurememorystorage.com/proceedings/2025/20250806_FARC-203-1_JavierGonzalez_V2.pdf | ⚠️ 대응 추정 |
| WQ-30 | Valet(ACM SoCC'25 최우수 논문, Cloudflare 등): 앱 · FS · 커널 무수정 동적 배치 힌트, RocksDB · MongoDB · CacheLib에서 쓰기 처리량 2~4×, **테일 지연 최대 6× 감소** | 최대 6× | arXiv 2501.00977 v2 | https://arxiv.org/abs/2501.00977 · https://research.cloudflare.com/publications/Purandare2025/ | 🟡 |
| WQ-31 | WALTZ(PVLDB 16, 2023): ZNS 위 RocksDB(ZenFS)에서 테일 지연 db_bench 최대 **3.02×**, MixGraph 최대 **4.73×** 감소 | 3.02× / 4.73× | VLDB'23 Lee 외 | https://www.vldb.org/pvldb/vol16/p2884-lee.pdf | 🟡 |
| WQ-32 | TTFlash(FAST'17 · TOS'17): 기존 방식은 99~99.99p에서 **GC 유발 지연 5~138배**, ttFlash는 GC 없음 대비 1.0~2.6배 | 5~138× | Yan 외 | https://www.usenix.org/conference/fast17/technical-sessions/presentation/yan · https://people.cs.vt.edu/huaicheng/p/tos17-ttflash.pdf | 🟡 |
| WQ-33 | **반대 근거**: 고급 SSD 1종을 병목 단위로 분해한 결과 **GC는 테일 지연의 주원인이 아니고 칩 간 큐 길이 불균형(느린 쓰기 뒤에 대기하는 읽기)** 이 주원인. 해법은 RAID 패리티로 바쁜 칩 읽기 재구성 | 정성 | Elyasi 외, "Trimming the Tail for Deterministic Read Performance in SSDs"(IEEE 2019) | https://pure.psu.edu/en/publications/trimming-the-tail-for-deterministic-read-performance-in-ssds/ | 🟡 |
| WQ-34 | 셀 동작 시간(문헌 범위): 프로그램 TLC 약 0.8~2ms · **QLC 약 2~3ms**, 읽기 TLC 66~170µs · **QLC 120~200µs**. 프로그램이 읽기의 약 10배라 읽기가 프로그램 뒤에 막힘, 완화는 program suspend | ms · µs | arXiv 2507.10573 서베이(2025) · USPTO 11,138,102 | https://arxiv.org/pdf/2507.10573 · https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11138102 | 🟡 |
| WQ-35 | Toshiba FMS 2018: QLC는 본질적으로 지연이 높고 GC · 리프레시가 테일 스파이크 원인, NVMe IO Determinism 격리로 테일 약 **50배** 개선(개념 증명) (기존 F39 관련) | 약 50× | FMS 2018 ARCH-102 | https://files.futurememorystorage.com/proceedings/2018/20180807_ARCH-102-1_Schuh.pdf | 🟡 (개념 증명) |
| WQ-36 | 데이터시트 쌍 ①: Solidigm **D7-PS1010(176L TLC)** 4KB 랜덤 쓰기 최대 400K IOPS, 지연 읽기 최대 60µs · 쓰기 8µs / **D5-P5336(192L QLC)** 16K 랜덤 쓰기 최대 43K IOPS(QD256), 4K 랜덤 읽기 1.005M IOPS, 4K 읽기 지연 일반 110µs(유통 표기) | IOPS · µs | Solidigm 사양 · StorageReview · 유통 리스팅 | https://www.storagereview.com/review/solidigm-ps1010-ssd-review · https://www.storagereview.com/review/solidigm-p5336-61-44tb-ssd-review | 🟡 |
| WQ-37 | 데이터시트 쌍 ②: Micron **9550 PRO(TLC)** 4K 랜덤 쓰기 280~400K IOPS, 지연 읽기 60 · 쓰기 15µs / **6600 ION 245.76TB(G9 QLC)** 랜덤 쓰기 42K(4K · 16K), 랜덤 읽기 1.78M, 지연 읽기 **100µs** · 쓰기 20µs(QD1 typ). 세대 · 용량 차이 있음 | IOPS · µs | Micron 사양 · StorageReview 6600 ION 리뷰 | https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay | 🟡 |
| WQ-38 | 데이터시트 쌍 ③(같은 BiCS8 세대): Kioxia **CM9-R(TLC)** 4K 랜덤 쓰기 540K, 랜덤 읽기 3.4M / **LC9 245.76TB(QLC)** 16KiB 랜덤 쓰기 45K, 랜덤 읽기 1.0M(E3.L) · 1.35M(2.5인치) | IOPS | Kioxia 제품 페이지 · StorageReview CM9-R 리뷰 | https://www.storagereview.com/review/kioxia-cm9-r-15-36tb-review-bics8-flash-hits-full-speed-at-low-queue-depths · https://www.kioxia.com/en-jp/business/ssd/enterprise-ssd/lc9-e3l.html | 🟡 |
| WQ-39 | OCP 기준 QoS: Micron 7500은 OCP Datacenter NVMe SSD 2.0r21 요구를 "대부분 만족(전부는 아님)". Kioxia CD8P 브리프 99.999p **250µs 미만**(랜덤 읽기). OCP 규격의 지연 요구 표 자체는 미확보 | 250µs | Micron 블로그 · Kioxia 성능 브리프 | https://www.micron.cn/about/blog/storage/ssd/how-to-get-the-worlds-most-advanced-mainstream-ssd-for-your-data-center · https://americas.kioxia.com/en-us/business/resources/performance-brief/xd6-ocp-aligned-qos-performance-brief.html | 🟡 |

**판정: 부분 지지.** 호스트 배치 · ZNS로 WAF를 줄인 실험에서 테일 지연이 1.5~6배 줄었다(WQ-27 · WQ-28 · WQ-30 · WQ-31). 그러나 측정은 모두 TLC 드라이브이고, QLC에서 배치로 테일 지연이 준 공개 측정은 찾지 못했다. 또 GC가 주원인이 아니라는 반대 결과(WQ-33)가 있고, QLC는 프로그램 시간 자체가 길어(WQ-34) WAF ≈1이어도 읽기-프로그램 충돌은 남는다. 같은 세대 데이터시트에서 QLC 읽기 지연은 TLC의 약 1.7~1.8배다(WQ-36 · WQ-37).

## 4. C4: TLC도 WAF를 줄이면 더 적은 OP로 요구 충족, 원가 절감

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WQ-40 | 같은 플랫폼 RI · MU 용량 쌍: Solidigm **D7-P5520 1 DWPD 1.92 / 3.84 / 7.68 / 15.36TB** 대 **D7-P5620 3 DWPD 1.6 / 3.2 / 6.4 / 12.8TB**(2022-04). Samsung **PM1733 1 DWPD 0.96~30.72TB** 대 **PM1735 3 DWPD 0.8~12.8TB**(2019-09). Micron **7450 PRO 960GB 1 DWPD** 대 **7450 MAX 800GB 3 DWPD** | TB · DWPD | Blocks&Files 2022-04-26 · AnandTech 17360 · Blocks&Files 2019-09-20 · SSD-iq `devices.csv` | https://blocksandfiles.com/2022/04/26/solidigm-datacenter-ssd-upgrade/ · https://blocksandfiles.com/2019/09/20/samsung-high-capacity-smart-ssds/ · https://github.com/gabriel-haas/ssdiq-paper-assets | 🟡 / ✅(Micron 쌍) |
| WQ-41 | OP 등급 관행: Kingston 표 "1024GB → 960GB(7%, 읽기 집중) / 800GB(28%, 쓰기 집중)". DC500R 3,840GB **OP 7% · 0.5 DWPD** 대 DC500M **OP 32% · 1.3 DWPD**. Seagate: OP는 통상 7~28%. RI · MU가 같은 원시 NAND를 쓰는지는 벤더 확인 없음 | % · DWPD | Kingston OP 페이지 · Seagate 블로그 2024-08-29 | https://kingston.com/en/ssd/overprovisioning · https://www.seagate.com/kr/ko/blog/ssd-over-provisioning-and-benefits/ | 🟡 |
| WQ-42 | Samsung 845DC 응용 노트(2014), 같은 드라이브 4KB 랜덤 쓰기: **OP 0%(512GB) 7K IOPS · 수명 1 / OP 6.7%(480GB) 13K · 2.09배 / OP 28%(400GB) 27K · 5.22배**. OP는 사용자 용량 기준(112GB/400GB = 28%) | IOPS · 수명배수 | Samsung 845DC OP 노트 | https://download.semiconductor.samsung.com/resources/others/Samsung_SSD_845DC_04_Over-provisioning.pdf | 🟡 |
| WQ-43 | **실측 OP 효과(같은 7450 계열)**: 4KB 균일 랜덤, 100% 채움 WAF **7450 PRO 960GB 3.19 / 7450 MAX 800GB 1.89**. 별도 실험(`finalop02b`, 372GiB 파일)에서 PRO 3.18 · MAX 1.28, 이 실험의 TRIM · 나머지 영역 상태는 미확인 | 3.19 / 1.89 | SSD-iq 저자 데이터 | https://github.com/gabriel-haas/ssdiq-paper-assets | ✅ (데이터) / ⚠️ (op02 조건) |
| WQ-44 | **greedy GC 시뮬레이터 WAF 대 채움률(논리/물리)**: 0.5 → **1.25**, 0.6 → 1.48, 0.7 → 1.87, 0.75 → 2.20, 0.78 → **2.47**, 0.8 → 2.69, 0.85 → 3.51, 0.88 → 4.34, 0.9 → **5.17**. 스크립트상 OP = 1 − 채움률(물리 기준) | WAF | SSD-iq `simop.csv` · `plotsim.R` | https://github.com/gabriel-haas/ssdiq-paper-assets · https://raw.githubusercontent.com/gabriel-haas/ssdiq/main/paper/plotsim.R | ✅ |
| WQ-45 | 해석식 검산점: OP 계수 0.3에서 실제 2.35, 개선식 2.36, 기존식 2.17 | 2.35 | Luojie · Kurkoski, arXiv 1110.4245 | https://ar5iv.arxiv.org/html/1110.4245 | 🟡 |
| WQ-46 | FDP로 OP 축소: CacheLib는 FDP로 **호스트 OP 0%** 에서도 WAF 1.03(WQ-17), 즉 50% OP를 쓰던 구성 대비 캐시 용량 930GB → 1.88TB. Samsung FDP 통합 발표의 기준선도 "PM9D3에 최대 50% 호스트 OP". SNIA 세션: OP는 WA 관리 · 수명 · TCO의 통상 관행이나 비효율적이고 탄소를 늘림, 배치 개선이 활용률을 높임 (기존 W19 · C-08 관련) | 50% → 0% | CacheLib 문서 · FMS 2024 OPSW-302 George · SNIA SDC25 세션 18446 | https://files.futurememorystorage.com/proceedings/2024/20240808_OPSW-302-1_George.pdf · https://www.snia.org/sniadeveloper/session/18446 | ✅ / 🟡 |
| WQ-47 | OP의 다른 용도(WAF 외): Samsung DC Toolkit 기본 OP 6.7%(기존 F-41), Micron Flex Capacity는 TBW 고정 · DWPD만 변동(기존 F-32), 다이 고장 시 용량 감량 운영 4 · 8GB(기존 F45), 데이터센터 드라이브는 사용자가 못 바꾸는 최소 OP 보유(WQ-42 노트) | 정성 | 기존 원장 · Samsung 845DC 노트 | (기존 원장) | 🟡 |

**판정: 지지(조건부).** 같은 플랫폼의 1 DWPD · 3 DWPD 쌍은 약 20% 용량 차이로 나뉘고(WQ-40 · WQ-41), OP가 WAF와 수명을 좌우한다는 것은 실측(WQ-42 · WQ-43)과 모델(WQ-44 · WQ-45)이 일치한다. FDP로 호스트 OP 50% → 0%가 실증됐다(WQ-46). 단 효과는 수명이 갈리는 워크로드에서만 나오고(WQ-17 CDN 반례), OP는 WAF 외 용도도 있다(WQ-47).

## 5. C5: 초고DWPD 시장 경쟁력

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| WQ-48 | 기출시 · 발표 고내구 제품(기존 수집): Solidigm D7-P5810 50(랜덤) · 65(순차), Micron XTR 35 · 60, Kioxia FL6 60, Kioxia GP1 최대 50, Phison X200Z 60 · aiDAPTIV 100, DapuStor X2900P 100 · X5 SCM 120, Samsung SZ985 30. **모두 SLC · pSLC · Z-NAND · XL-FLASH 계열** | DWPD | 기존 H-01~H-15 · D-04 · D-05 | (기존 원장) | 🟡 |
| WQ-49 | D7-P5810 대상 워크로드: 캐싱 · HPC · 로깅 · 저널링, QLC 용량 드라이브 앞 쓰기 버퍼, Ceph WAL. 800GB 73PBW. 비용은 "비NAND SCM의 약 20% 미만"(벤더) | 정성 | Solidigm 뉴스룸 2023-09 · 제품 페이지 | https://news.solidigm.com/en-WW/230095-introducing-the-solidigm-d7-p5810-an-ultra-fast-slc-ssd-for-write-intensive-workloads/ · https://www.solidigm.com/products/data-center/d7/p5810.html | 🟡 |
| WQ-50 | Kioxia GP Series(2026-03-17): NVIDIA Storage-Next용 **GPU-initiated AI 워크로드** 최적화, XL-FLASH, 512B 단위 접근, TLC 대비 IO당 전력 감소, 평가 샘플 2026년 말. GP1 2026-08-04 (기존 H-04 보강: 동기는 IOPS · 지연) | 정성 | Kioxia PR | https://www.kioxia.com/en-jp/business/news/2026/20260317-1.html · https://www.kioxia.com/en-jp/business/news/2026/20260804-1.html | 🟡 |
| WQ-51 | TrendForce(2025-12-29): NVIDIA가 SLC NAND를 차세대 AI 스토리지 핵심으로 보고 SW 플랫폼 **SCADA** 개발, SK hynix 1세대 샘플 2026년 말 · 2세대 2027년 말, Kioxia 100M IOPS 2027 목표(이후 2028로 순연, 기존 H-05). SLC 가격 2H26 **+70~75%** 상승 여력 | % | TrendForce News | https://www.trendforce.com/news/2025/12/29/news-slc-based-ai-ssds-gain-traction-as-sk-hynix-and-kioxia-accelerate-development-with-nvidia/ | 🟡 |
| WQ-52 | Guosheng Securities: 2024 NAND 시장 약 $65.6B 중 **SLC NAND $2.32B**. NVIDIA · Amazon이 GIDS(GPU-Initiated Direct Storage)를 Vera Rubin에 적용 추진 | $ | 증권사 리포트 재보도 | https://www.itiger.com/news/1179709734 | 🟡 (재보도) |
| WQ-53 | 시장 규모 추정(저신뢰): "AI 스토리지 SSD" $32.85B(2025) → $52.85B(2027) → $65.29B(2028), 정의 · 방법 불명. Mordor 인용 집계: 3 DWPD 등급이 2024 물량 1위(53%), 10 DWPD 등급 2030년까지 CAGR 28% | $ · % | pmarketresearch · 집계 사이트 | https://pmarketresearch.com/it/ai-storage-ssd-market | ⚠️ 출처 불투명 |
| WQ-54 | Samsung PM1763(2026-07-08 양산 발표, PCIe 6.0, V9 · 4nm 컨트롤러)의 내구성은 3자 요약상 **1 DWPD**, 처리량 지향 | 1 DWPD | Samsung 뉴스룸 재게재 · 3자 사양 요약 | https://www.elevenforum.com/t/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-gen-ai-infrastructure.47990/ · https://ampinc.com/samsung-pm1763-pcie-gen6-e1s-ssd/ | ⚠️ (내구성 미검증) |
| WQ-55 | 반대 근거(필드): 중고 데이터센터 SSD 1,347개 중 정격에 근접한 것은 소비자용 Intel 750뿐, 나머지는 정격보다 훨씬 적게 사용, 5년 시점 잔여 내구성 50~70% 추정(벤더 후원 조사). 기존: NetApp 중앙값 0.36 · 7%가 3 DWPD 초과(CU-15), Microsoft 0.07~0.23(CU-13) | 정성 · % | ServeTheHome(2024) | https://www.servethehome.com/we-bought-1347-used-data-center-ssds-to-look-at-ssd-endurance-solidigm/ | 🟡 |
| WQ-56 | KV 캐시 쪽 수요 근거(기존): WD B200 8장 호스트 0.7 GB/s 상시 쓰기 → 2TB 기준 30.2 DWPD(CU-40a, 파생), StorageReview 드라이브당 3.2 DWPD(D-03), KV 캐시 전용 출시 제품은 1~3 DWPD(X-08), SLC AI SSD의 공개 동기는 IOPS · 지연이지 DWPD가 아님(X-11), SanDisk KV 캐시 2027년 75~100EB(OT-08 · D-08) | 다양 | 기존 원장 | (기존 원장) | 🟡 / ⚠️ 파생 |

**판정: 부분 지지.** 30~120 DWPD 제품과 KV 캐시 쓰기 수요 신호는 있다(WQ-48 · WQ-56). 그러나 이 제품들은 모두 SLC 계열이고 동기는 IOPS · 지연이다(WQ-50 · WQ-51). P/E 1,000의 QLC는 WAF 1이어도 1 DWPD에 못 미친다(파생 P-1). 따라서 WAF 협력이 바로 초고DWPD 경쟁력이 되지는 않고, pSLC · SLC와 결합할 때 배수 효과로만 작동한다(파생 P-3). 초고DWPD 시장의 독립 규모 추정은 없다(WQ-52 · WQ-53).

---

## 6. 파생 계산 (⚠️ 산술)

식: `DWPD = P/E × (1 + OP) ÷ (1,825일 × WAF)` (기존 F29 · E-01, 5년). OP는 사용자 용량 기준.

| ID | 항목 | 계산 | 값 |
|---|---|---|---|
| P-1 | QLC(P/E 1,000) DWPD | OP 7%: WAF 1 / 1.1 / 2 / 3 / 4 | **0.59** / 0.53 / 0.29 / **0.20** / 0.15 |
| P-1b | 같은 조건 OP 28% | WAF 1 / 1.1 / 2 / 3 | **0.70** / 0.64 / 0.35 / **0.23** |
| P-1c | QLC를 P/E 3,000으로 보면(WQ-01 미확인 주장) | OP 7%: WAF 1 / 3 · OP 28%: WAF 1 / 3 | 1.76 / 0.59 · 2.10 / 0.70 |
| P-2 | D5-P5336 정격 0.6 역산(OP 7% 가정, 실제 OP 미공개) | 0.6 × 1,825 ÷ 1.07 = P/E ÷ WAF | **약 1,023** → (P/E 1,000 · WAF ≈1) 또는 (P/E 3,000 · WAF ≈3)과 같은 값 |
| P-3 | pSLC · SLC 모드(기존 P-01~P-06의 P/E) | P/E 30,000 · OP 28%: WAF 1 / 3 · P/E 60,000: WAF 1 / 3 · P/E 100,000 · OP 7%: WAF 1 | 21.0 / 7.0 · 42.1 / 14.0 · 58.6 |
| P-4 | IU 최악 증폭과 정격 비 | 4K on 16K = 16/4 · 4K on 64K = 64/4 · 6600 ION 0.3/0.075 · 6550 ION 1/0.25 · LC9 0.3/0.075 | 4× · 16× · **4.0 · 4.0 · 4.0** |
| P-5 | 균일 랜덤 greedy GC 해석식(Lambert W, 기존 W05) | OP 7% / 11% / 14% / 20% / 28% / 50% / 100% | **7.82** / 5.22 / 4.25 / 3.19 / **2.48** / 1.72 / 1.26 (검산: WQ-44 채움 0.9 → 5.17, 0.78 → 2.47) |
| P-6 | 같은 원시 NAND에서 OP 28% → 7% | 1.28 ÷ 1.07 · 원시 4,096 기준 3,200 → 3,840 | 판매 용량 **+19.6~20%** |
| P-6b | 845DC: 400 → 480GB(OP 28% → 6.7%)의 대가 | 480/400 · 2.09/5.22 | 용량 +20%, 수명 **−60%**(호스트 협력 없음) |
| P-6c | WAF를 1.05로 낮춘 OP 7% 대 무배치 OP 28%(모델 WAF 2.48), 같은 P/E | (1.07/1.05) ÷ (1.28/2.48) | DWPD **약 1.97배** + 용량 +19.6% |
| P-7 | 7450 PRO 대 MAX 물리 비와 정격 비 | 사용자 용량 비 960/800 = 1.2 · WAF 비 3.19/1.89 = 1.69 · 곱 | 물리로 설명되는 DWPD 비 **약 2.0배** 대 정격 비 **3배** |
| P-8 | 랜덤 쓰기 대역폭 TLC 대 QLC | PS1010 400K × 4KB 대 P5336 43K × 16KB · CM9-R 540K × 4KB 대 LC9 45K × 16KB | 1.64 대 0.70 GB/s(**2.3배**) · 2.21 대 0.74 GB/s(**3.0배**) |
| P-9 | 읽기 지연 QLC/TLC | 6600 ION 100 ÷ 9550 60 · P5336 110 ÷ PS1010 60 | **1.7배 · 1.8배** (측정 조건 상이) |
| P-10 | Meta 호스트 OP 50% → 0% | 1.88TB ÷ 930GB | 캐시 용량 **약 2.0배**, WAF 1.03 유지 |

## 7. 충돌 · 한계

1. **Micron 6550 ION NAND 유형**: 기존 ladder F48은 "QLC(G8/G9)", essd-rated 원장 · StorageReview는 "232L TLC 용량형". 이번 원장은 TLC로 취급하고 QLC 비교쌍에서 제외했다.
2. **IU 크기 충돌**: P5316 64KB(StorageReview) 대 16KB(AnandTech, WQ-05), P5430 30.72TB 8KB 대 4KB(WQ-04), BM1743 16KB는 추정(WQ-09), LC9 245.76TB의 IU는 공식 미확인(WQ-08).
3. **LC9 랜덤 쓰기**: 45 KIOPS @16KiB(공식 E3.L) 대 최대 80 KIOPS(제품 개요) 대 50K(매체).
4. **IU 페널티 크기**: 벤더 실 트레이스 <5%(WQ-10) 대 최악 4× · 정격 4K/16K 비 4배(P-4). 정격은 JESD219의 4K · 8K 랜덤 편중 워크로드(기존 E-04)를 따르므로 최악에 가깝다.
5. **GC와 테일 지연**: TTFlash 5~138×(WQ-32) 대 "GC는 주원인 아님"(WQ-33). 장치 · 워크로드가 다르다.
6. **모델 대 실장치**: 해석식은 균일 랜덤 상한 성격, 실장치는 OP 0.147에서 1.19(WQ-26). SSD-iq 실측(WQ-23)은 3.19~4.40으로 모델(P-5)과 같은 자리수.
7. **정격 비와 물리 비**: 7450 MAX/PRO 정격 3배 대 물리 약 2.0배(P-7). 정격에는 WAF · OP 외 여유가 들어 있다.
8. **OP 정의**: 사용자 기준(Samsung 845DC · Kingston, P-5 · P-6) 대 물리 기준(SSD-iq `op = 1 − 채움률`). 같은 "28%"라도 기준이 다르다.
9. **SSD-iq 카운터**: SK hynix PE8110(OCP 미지원) · WD는 물리 쓰기 카운터가 0, D7-P5520은 간헐적이라 비교에서 제외 또는 ⚠️. 중앙값은 이번 세션 집계(⚠️ 산술).
10. **"계속 하락"의 범위**: 정격 중앙값은 2019년 이후 1 DWPD로 평탄(WQ-02). 하락은 장기 추세와 QLC · 용량형 계층에 해당한다.
11. **CacheLib "KV 캐시"는 LLM KV 캐시가 아니다**(기존 v6 §5 경고 재확인).
12. **TLC 측정의 QLC 일반화**: C3 · C4의 테일 지연 · OP 실측(WQ-27~WQ-31, WQ-42~WQ-43)은 전부 TLC · MLC 드라이브다.

## 8. 미확보

- QLC 드라이브에서 FDP · ZNS 적용 전후 **테일 지연(p99 · p99.9 · p99.99) 측정**: 찾지 못했다.
- Silicon Motion · Micron N48R QLC FDP 결과(WQ-20), Meta QLC FDP의 측정 WAF 개선폭(WQ-22), WARP 4.49× · 2.58× 드라이브 모델명(WQ-18).
- EuroSys'25 FDP 논문의 p99 지연 수치(기존 C-08), Samsung FMS 2025 TorFS 지연 수치(WQ-29).
- OCP Datacenter NVMe SSD 규격의 QoS · 지연 요구 표 원문.
- 같은 벤더 RI · MU 쌍이 같은 원시 NAND를 쓴다는 벤더 공식 확인(WQ-41은 표 관행 · 산술 정합만).
- QLC 슈퍼블록 · RU 크기의 제품별 값(WQ-15는 일반 예시 6GB).
- 초고DWPD(SLC AI SSD · Storage-Next) 시장의 매출 · EB 전망. 전문 기관 수치 없음(WQ-52 · WQ-53).
- Samsung BM1743 · Kioxia LC9 245.76TB의 공식 IU 크기, PM1763 공식 DWPD.
