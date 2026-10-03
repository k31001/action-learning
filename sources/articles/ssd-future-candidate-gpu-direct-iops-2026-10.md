# SSD 미래 후보 기술 팩트 원장: (A) GPU 직결 소블록 고IOPS SSD(SCADA·Storage-Next), 비교 후보 (B) CXL 메모리 계층 SSD, (C) 드라이브 내 투명 압축

**수집일**: 2026-10-03
**수집자**: Research Agent (Future Candidate: GPU-direct IOPS). 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(GitHub 원본 저장소·문서·커밋 이력) 기반 팩트 원장
**용도**: SSD 개발 조직이 "어떤 미래가 와도 대응하기 위해 준비할 기술"로 이미 고른 3개(① 고DWPD(KV 캐시 오프로드 쓰기) ② 혼합 매체(QLC + pSLC 영역) ③ 대용량 + 고장 허용)에 더해 검토할 **추가 후보**의 사실 근거와 반증. 주 후보는 **(A) GPU 직결 소블록 고IOPS SSD**(GPU가 직접 I/O를 시작하는 접근, NVIDIA SCADA·Storage-Next, 512B 랜덤 읽기, 1억 IOPS), 가벼운 비교 후보는 **(B) CXL 메모리 시맨틱/메모리 계층 SSD**(예: Samsung CMM-H)와 **(C) 드라이브 내 투명 압축**. 섹션 §1~§3은 요청 A1~A3, §4는 B, §5는 C, §6은 D(반증)에 1:1 대응.

**등급**: ✅ 1차 원문 직접 열람(공식 저장소 README·문서·헤더·커밋 이력) / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·근거 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch 모두, 2026-10-03 확인): `developer.nvidia.com`, `docs.nvidia.com`, `www.nvidia.com`, `nvidianews.nvidia.com`, `blogs.nvidia.com`, `www.micron.com`, `investors.micron.com`, `news.skhynix.com`, `www.kioxia.com`, `americas.kioxia.com`, `semiconductor.samsung.com`, `download.semiconductor.samsung.com`, `news.samsung.com`, `www.trendforce.com`, `blocksandfiles.com`, `www.tomshardware.com`, `www.storagereview.com`, `www.techpowerup.com`, `www.storagenewsletter.com`, `www.techtimes.com`, `www.computerbase.de`, `www.hpcwire.com`, `www.servethehome.com`, `www.businesswire.com`, `www.prnewswire.com`, `computeexpresslink.org`, `scaleflux.com`, `futurumgroup.com`, `www.h3platform.com`, `arxiv.org`, `dl.acm.org`, `ieeexplore.ieee.org`, `www.usenix.org`, `research.google`, `snia.org`, `en.wikipedia.org`, 국내 매체(`zdnet.co.kr`, `mt.co.kr`, `etnews.com`, `thelec.net`, `koreaherald.com`, `en.sedaily.com` 등). GitHub의 조직 단위 API(`api.github.com/orgs/...`)는 세션 범위 제한으로 403. **직접 열람이 가능했던 것은 `raw.githubusercontent.com`과 GitHub `git clone`/`git ls-remote`뿐**이다. 따라서:
- **✅는 GitHub에서 원문을 직접 읽은 항목에만 붙였다**: `xio-sig/.github`(NVIDIA cuFile 오픈소스 조직 프로필 README와 커밋 이력), `ZaidQureshi/bam`(BaM README·커밋), `jeongminpark417/GIDS`(README), `xnvme/aisio`(삼성 저작권 GPU 주도 I/O 연구 저장소 README·`docs/src/*`·`references.bib`·커밋 작성자), `rapidsai/cuvs`(`cpp/include/cuvs/neighbors/vamana.hpp` 주석, main 2026-10-02), `ROCm/rocm-xio`(README·커밋), `opencomputeproject/Project-Zipline`(README·커밋).
- NVIDIA·Samsung·Kioxia·SK hynix·Micron 보도자료와 백서 수치는 1차 출처라도 **검색 요약 경유이므로 🟡**로 낮췄다. 특히 **Samsung PM1763 SCADA 백서 원문(download.semiconductor.samsung.com)은 열지 못했다**.

**0-2. 용어를 섞지 말 것.**
- **GPUDirect Storage(GDS, cuFile)**: 데이터 경로만 GPU 메모리로 직접(P2P DMA), **명령(제어) 경로는 CPU**가 담당. 기존 위키 [nvidia-cmx-scada.md](../../wiki/entities/nvidia-cmx-scada.md) §2.1 표 참조.
- **GPU 주도(GPU-initiated, device-initiated) I/O**: GPU 스레드가 NVMe 명령을 직접 만들고 제출·완료 처리. 학술 계보는 libnvm → **BaM(ASPLOS'23)** → **GIDS(GNN 데이터로더)**. 산업 구현은 **NVIDIA SCADA**(독점), **AMD rocm-xio**(얼리 액세스), **Samsung AiSIO/HOMI**(연구 저장소).
- **Storage-Next**: NVIDIA가 주도하는 **업계 이니셔티브 이름**(벤더 연합). SK hynix 측에서는 AI-N P를 NVIDIA 명칭으로 "Storage Next"라 부르는 보도가 있어(레포 wcssd-v1 H-12) 혼용된다.
- **SCADA(Scaled Accelerated Data Access)**: Storage-Next의 **소프트웨어 프레임워크**. 산업제어 SCADA와 무관.

**0-3. IOPS는 블록 크기와 함께만 의미가 있다.** 데이터시트의 랜덤 읽기 IOPS는 통상 4KB 기준이고, Storage-Next 수치는 **512B 기준**이다. 4KB IOPS와 512B IOPS를 같은 축에 놓지 말 것. 또 **드라이브당 IOPS**와 **서버·시스템 합산 IOPS**(드라이브 수십 개)를 섞지 말 것.

**0-4. 기존 원장과의 관계(반복 금지, ID로만 참조).**
- 위키 [nvidia-cmx-scada.md](../../wiki/entities/nvidia-cmx-scada.md) §2(SCADA 정의, GDS 대비 표, Micron SC'25 2.3억 IOPS, 벤더 경쟁표)와 [current-state-rs3-customer-switching-cost.md](../../wiki/strategies/core/current-state-rs3-customer-switching-cost.md) §1·§3("삼성 SCADA AI SSD 공개 로드맵 없음", "2026 Samsung Tech Day가 결정적").
- [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md) **H-04**(Kioxia GP Series·GP1, 512B 10M IOPS, 50 DWPD), **H-05**(Kioxia 1억 IOPS 2028 순연), **H-11**(Samsung Z-NAND 부활·GIDS·zNAND-O), **H-12**(SK hynix AI-N P), **D-06**, **X-11**(SLC AI SSD 동기는 IOPS·지연).
- [samsung-kv-cache-activities-2026-09.md](samsung-kv-cache-activities-2026-09.md) **C-02**(xnvme/aisio 존재·커밋 수), **C-03**, **D-03**(CMM-D KV 캐시 백서), **D-07**(FMS 2026 기조연설), **D-08**(OCP 2026 예정 발표).
- [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) Kioxia·SK hynix·Micron 행(GTC 2026 SCADA 데모, CMM-Hybrid, SALT-KV).
- [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md) **D08**(Kioxia Investor Day: 추론 CAGR 86%, Storage-Next 2027부터), **D10**(SK AIN Family).
- [qlc-v8-dwpd-price-inference-2026-09.md](qlc-v8-dwpd-price-inference-2026-09.md) **P-11·P-12**, [qlc-v6-waf-measurement-trend-2026-09.md](qlc-v6-waf-measurement-trend-2026-09.md) **W37**(ScaleFlux 압축 기반 내구성 주장).
- [dt-b-demand-efficiency-signals-2026-08-28.md](dt-b-demand-efficiency-signals-2026-08-28.md) §3(CXL 실배치, Meta DDR4 재활용, Marvell 48TB 풀).
- [execution-benchmarks-sw-capability-customer-collab-2026-09.md](execution-benchmarks-sw-capability-customer-collab-2026-09.md) Kioxia 행(1억 IOPS 공동개발, AiSAQ).

본 원장의 **새 내용**은 ① 2026-08 FMS 이후의 SCADA·Storage-Next 제도화(cuFile 오픈소스 조직, cuObject GA, SCADA Server SDK) ② **Samsung PM1763 SCADA 백서 수치**와 **Samsung aisio 저장소의 실측·SCADA 평가** ③ 워크로드별 블록 크기 구분 ④ 512B 고IOPS의 링크·큐·매체 요구 산술 ⑤ B·C의 2026년 현황과 반증이다.

---

## §1. (A1) NVIDIA SCADA·Storage-Next: 정의, 목표, 타임라인, 벤더 현황

### 1-A. 정의·목표·생태계 (2026-10 기준 갱신분)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| GD-01 | SCADA는 GPU 서버의 **GPU가 스토리지 I/O를 직접 시작·제어**하는 방식. GDS가 데이터 경로를 CPU에서 떼어냈다면 SCADA는 **제어 경로까지** GPU로 옮긴다. "GPU 스레드가 load/store 시맨틱으로 스토리지에 접근하고, **NVMe 드라이버 자체가 GPU 안에서 동작**". 동기: AI 추론의 4KB 미만 소블록 I/O에서는 전송당 제어 경로 시간이 상대적으로 크다 | 2025-11-25 | Blocks & Files https://blocksandfiles.com/2025/11/25/scada-nvidia/ | 🟡 `[검색 요약 경유]` (위키 §2.1과 동일 계열, 문구 보강) |
| GD-02 | StorageReview: SCADA는 "**NVSHMEM 모델을 스토리지에 적용**"한 것. GPU 런타임이 흩어진 작은 요청을 묶고, **GPU 측 캐시**에서 응답하거나 스토리지로 넘긴다. "KV 캐시 항목·임베딩·벡터 검색 결과를 서빙하면 초당 수백만 건의 작은 랜덤 읽기가 생기고, 그 모든 건에 CPU가 끼어 있다" | 2026-08 | https://www.storagereview.com/news/nvidia-scada-puts-storage-control-on-the-gpu-as-cufile-goes-open-source | 🟡 |
| GD-03 | ⭐ **Storage-Next의 공표 목표: "전력·꼬리 지연(tail latency) 제약 아래에서 GPU당 512바이트 IOPS를 최대화"**. Storage-Next는 **GTC 2025**에서 처음 공개적으로 드러났다(StorageReview 서술) | 2025-03(첫 공개) / 2026-08(재서술) | 위 StorageReview ; NAND Research https://nand-research.com/fms-2026-ai-moving-boundaries-between-memory-storage/ | 🟡 |
| GD-04 | ⭐ **FMS 2026(2026-08-04, 산타클라라) NVIDIA 3대 발표**: ① **cuFile API와 그 아래 수직 스토리지 SW 스택 오픈소스화**(GitHub 신규 조직 **xio-sig**, Accelerated IO Special Interest Group), ② **Storage-Next 공식 출범**: 스토리지·플래시·컨트롤러·냉각·오케스트레이션 벤더와 표준 단체 **40곳 이상**, ③ **SCADA를 그 기준 프레임워크로 제품화** | 2026-08-04 | SiliconANGLE https://siliconangle.com/2026/08/04/nvidia-open-sources-cufile-api-accelerating-gpu-read-write-capability-high-speed-storage/ ; Network World https://www.networkworld.com/article/4205157/nvidia-moves-to-accelerate-storage-access-boost-industry-cooperation.html ; NVIDIA 블로그 https://blogs.nvidia.com/blog/ai-storage-fms/ (차단) | 🟡 |
| GD-05 | xio-sig **창립 메인테이너: Google, Intel, Meta, NVIDIA** | 2026-08 | StorageReview(GD-02) ; HWBusters https://hwbusters.com/news/nvidia-open-sources-cufile-no-your-ssd-is-not-becoming-vram/ | 🟡 |
| GD-06 | ⭐ **xio-sig 조직 프로필 README 원문**: "xio-sig is a **vertically-integrated storage IO stack designed to support multiple vendor targets** … the 'x' denotes vendor-specific prefixes". 저장소 계획: **cuFile 계열** `cuFileAPI`(통합 인터페이스), `cuFileConformance`("**to ensure interoperability and prevent ecosystem fragmentation**"), `libxFile`(사용자 수준 라이브러리), `xFileLinux`("**A downstream forked full kernel** contains enhancements required to support cuFile and libxFile"); **cuObject 계열** `cuObjectClientAPI`, `cuObjectWireProtocol`, `cuObjectConformance`. 통합 모델: "All layers are validated together … **CI/CD support is delegated to individual platform vendors**." 상태: "Once founders have integrated and validated the layers together and are passing conformance tests, and have set up arrangements for making commits, **code will appear in the respective repos. Watch this space!**" | 최초 2026-08-03(작성자 `saritas@nvidia.com`), 개정 2026-08-04, **2026-09-29**(CJ Newburn, cuObject 추가, `libxPUFile`→`libxFile`, `xioLinux`→`xFileLinux` 개명) | https://github.com/xio-sig/.github (`profile/README.md`, 커밋 `853d0d5`·`098123c`·`4c8172b`·`e716ecb`·`9bdf34a`) | ✅ |
| GD-07 | **⚠️ 파생 (접근 시도 결과)**: 2026-10-03 기준 README가 열거한 7개 저장소(`cuFileAPI` 등)와 구 명칭 저장소는 익명 `git ls-remote`에 **인증을 요구**(=비공개이거나 미생성). 같은 경로로 `xio-sig/.github`는 익명 클론이 됐다. 즉 **"오픈소스화" 발표 두 달 뒤에도 코드는 공개 저장소에 없다** | 2026-10-03 | GD-06 경로 | ⚠️ (접근 결과에서 추론) |
| GD-08 | ⭐ **NVIDIA 개발자 블로그(2026-09-30)**: **cuObject 클라이언트·서버 라이브러리 GA**(RDMA 가속 객체 스토리지 접근, 서버 CPU 우회), **SCADA Server SDK**: 스토리지 업체가 **SCADA 클라이언트의 GPU 발행 요청에 응답하는 서버**를 만들고 로컬·원격 스토리지에서 채워 **RDMA로 반환**. xio-sig가 cuFile에서 cuObject로 확장, **Google Cloud는 참여 검토, Microsoft는 이사회 참여 계획**, **IBM Storage은 SCADA를 IBM Storage Scale에 통합한 프로토타입 시연**. Storage-Next는 "**40곳 이상의 벤더와 고객**"이 GPU 주도 세립(fine-grained) 스토리지 접근의 개방 표준을 정의 | 2026-09-30 | https://developer.nvidia.com/blog/expanding-ai-storage-access-with-nvidia-cuobject-and-the-nvidia-scada-server-sdk (차단) ; 포럼 사본 https://forums.developer.nvidia.com/t/expanding-ai-storage-access-with-nvidia-cuobject-and-the-nvidia-scada-server-sdk/384778 | 🟡 |
| GD-09 | Storage-Next 참가자로 **이름이 확인된 곳**: DDN, Kioxia, Micron(스토리지·플래시), 시스템 공동설계: Dell, HPE, IBM, Hitachi Vantara, NetApp, VAST Data, WEKA. **전체 명단은 비공개**(검색으로 확보 못함, §7 NF-02) | 2026-08 | Futurum https://futurumgroup.com/insights/nvidia-ai-storage-goes-open-at-fms-2026-is-open-source-the-new-moat/ ; rcrtech https://rcrtech.com/semiconductor-news/nvidia-storage-next-announcement/ | 🟡 |
| GD-10 | **계보(인물)**: BaM(ASPLOS'23) 저자에 **Vikram Sharma Mailthody, Isaac Gelado, CJ Newburn, Dmitri Vainbrand, Michael Garland, William Dally** 포함(✅ BaM README 인용 블록). Mailthody는 NVIDIA Research 시니어 연구원으로 **Storage-Next 공동 리드**·Dynamo 핵심 설계자(🟡 FMS 연사 소개). xio-sig README 2026-09 개정 커밋 작성자가 **CJ Newburn**(✅). ⚠️ 파생: BaM 학술 계보의 핵심 인물이 NVIDIA의 Storage-Next·xio-sig를 주도한다 | 2023 / 2026 | https://github.com/ZaidQureshi/bam (README "Citations") ; https://www.terrapinn.com/conference/future-memory-storage/speaker-vikramsharma-MAILTHODY.stm (차단) | ✅ / 🟡 |
| GD-11 | CJ Newburn(NVIDIA) SNIA SDC 2025 "Storage Implications for the New Generation of AI Apps": "**Gen6 matches 800 Gbps, 100 GB/s and 200 MIOPs @ 512B**", GPU 주도 블록 인터페이스는 SCADA와 상호운용 | 2025-09-15~17 | https://www.snia.org/sites/default/files/2025-10/SNIA-SDC25-Newburn-Storage-Implications-New-Gen-AI-Apps.pdf (차단) | 🟡 (발췌 해석 단위 미확정, ⚠️) |
| GD-12 | **Silicon Motion CEO(Wallace Kuo)**: "NVIDIA는 지금 **1억 IOPS**를 목표로 한다". 512B 랜덤 읽기가 AI 추론에 더 적합하나 가속이 훨씬 어렵고, **기존 NAND로 적정 비용·전력에서 단일 드라이브 1억 IOPS는 극히 어렵다, 새로운 종류의 메모리가 필요할 수 있다** | **2025-06-13** | Tom's Hardware https://www.tomshardware.com/pc-components/ssds/smi-ceo-claims-nvidia-wants-ssds-with-100m-iops-up-to-33x-performance-uplift-could-eliminate-ai-gpu-bottlenecks | 🟡 |

### 1-B. 타임라인 (2023 ~ 2026-10)

| 시점 | 사건 | 근거 ID / 등급 |
|---|---|---|
| 2023 (ASPLOS'23) | BaM: GPU 자기주도(self-orchestrated) 스토리지 접근 시스템 공개 | GW-01 ✅ |
| 2023-06 (arXiv 2306.16384) | GIDS: GPU 주도 직접 스토리지 접근으로 GNN 샘플링·집계 가속 | GW-02 ✅(README) |
| 2025-03 (GTC 2025) | Storage-Next 첫 공개 언급 | GD-03 🟡 |
| 2025-06-13 | SMI CEO "NVIDIA는 1억 IOPS 목표" | GD-12 🟡 |
| 2025-08 (FMS 2025) | NVIDIA Mailthody 발표(SCADA), Samsung "7세대 Z-NAND + GIDS, 2026" 계획 | GD-10 🟡, 레포 wcssd-v1 H-11 |
| 2025-09 | Kioxia "NVIDIA 요청으로 1억 IOPS SSD, 2027", 에뮬레이터 시연 | 레포 H-05, GD-25 🟡 |
| 2025-09-17 | AMD `ROCm/rocm-xio` 첫 커밋 | GD-31 ✅ |
| 2025-10 (OCP 2025) | SK hynix AI-N P(25M→100M IOPS) 공개 | 레포 H-12·D10 |
| 2025-11 (SC'25) | Micron 9650 × 44, H100 × 3로 512B 2.3억 IOPS | 위키 §2.2, GD-22 |
| 2026-03-16 (GTC 2026) | Kioxia GP Series, Micron "양산급 Gen6 위 SCADA", Wiwynn Storage-Next GPU 주도 서버 컨셉 | 레포 H-04, GD-28 🟡 |
| 2026-04-08 | SwarmIO(100 MIOPS급 SSD 에뮬레이터) arXiv 공개 | GW-05 🟡 |
| 2026-06 (Computex 2026) | Wiwynn SCADA 서버 실물 전시 | GD-28 🟡 |
| 2026-07-07/08 | Samsung PM1763 양산 + **PM1763 SCADA 백서** 보도 | GD-20 🟡 |
| 2026-07-15 | Graid: Kioxia XD8 × 32 RAID 5에서 GPU 주도 512B **1억 IOPS** | GD-27 🟡 |
| 2026-08-04~06 (FMS 2026) | cuFile 오픈소스(xio-sig), Storage-Next 공식 출범(40+), Kioxia GP1, Smart IOPS T50(08-06) | GD-04·GD-06·GD-26 |
| 2026-09-08 | Kioxia 1억 IOPS SSD **2028로 순연**(PCIe 7.0 인증 일정) | 레포 H-05, GD-25 🟡 |
| 2026-09-16 | rocm-xio "GPU-initiated NVMe fio engine" 머지 | GD-31 ✅ |
| 2026-09-29~30 | xio-sig README에 cuObject 추가, NVIDIA cuObject GA·SCADA Server SDK | GD-06 ✅, GD-08 🟡 |

### 1-C. 벤더·생태계 현황표 (2026-10-03 기준)

| ID | 주체 | 제품·활동 | 수치(블록 크기 명기) | 상태·일자 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| GD-20 | ⭐ **Samsung** | **백서 "Evaluating GPU Driven Storage Performance with Samsung PM1763 NVMe SSD"**: PM1763(Gen6, V9 TLC, 4nm 컨트롤러)을 SCADA와 결합. 시험대 **H3 Falcon 6048 Gen6 서버, H100 1 + H200 2, PM1763 E1.S 15.36TB × 42, Broadcom PEX90144 Gen6 스위치 × 3** | **512B 랜덤 읽기, GPU 발행 기준 드라이브당 약 6.92M IOPS**(같은 시험대 PM1753 3.72M 대비 **+86%**), **GPU당 SSD 14개, 시스템 합산 2.81억 IOPS** | 백서 발행일 미확인, 2026-07 PM1763 양산 보도와 함께 인용 | 백서 https://download.semiconductor.samsung.com/resources/white-paper/Evaluating_GPU_Driven_Storage_Performance_with_Samsung_PM1763_NVMe_SSD.pdf (차단) ; StorageReview https://www.storagereview.com/news/samsung-pm1763-pcie-gen6-ssd-enters-mass-production-with-28-4-gb-s-reads | 🟡 |
| GD-21 | Samsung | 같은 백서 해설: **CPU는 스레드 풀 전체로 약 4,500만 IOPS를 in-flight로 유지**, GPU는 **약 10만 스레드**로 **GPU당 9,500만 IOPS 초과**. **충돌**: 다른 검색 요약은 "GPU당 950,000 IOPS"로 표기. ⚠️ 파생 검산: 2.81억 ÷ GPU 3 = **9,370만**, 14 × 6.92M = **9,690만** → "9,500만" 쪽이 산술과 정합 | 2026-07~ | GD-20 출처 | 🟡 / ⚠️ 충돌 |
| GD-22 | Samsung | PM1763 제품 자료의 랜덤 읽기 최대 **6.8M IOPS**(16TB급, 블록 크기 원문 미확인) | 해당 없음 | 2026-07-07 양산 | Samsung 뉴스룸 https://news.samsung.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure (차단) ; 위 StorageReview | 🟡 |
| GD-23 | ⭐ **Samsung** | **`xnvme/aisio`(Accelerator-integrated Storage I/O)**: 삼성 저작권(BSD-3). 참조 구현 **HOMI(Host Orchestrated Multipath I/O)**: OS 관리 경로·사용자공간 경로·**장치(GPU) 주도 경로**가 같은 NVMe 컨트롤러를 공유. 실험 환경: **Dell R760 + H100 PCIe + Samsung PM1753 32TB × 16(Gen5)**. 결론 원문: CPU 주도 천장 "**approximately 61.7 million IOPS across 16 NVMe devices, requiring 8 physical cores**", 장치 주도: "With **4096 total CUDA threads**, the 61.7 million IOPS roofline is reached under **512-byte device-initiated I/O**". **NVIDIA 외 AMD 스택 설치 태스크(`setup_amdstack.yaml`)도 포함** | ⚠️ 파생: 61.7M ÷ 16 = **드라이브당 약 3.86M**(512B, PM1753) → GD-20의 PM1753 3.72M과 같은 대역 | 문서 결론 확정 2026-04-28, 최신 커밋 2026-09-22. 커밋 작성자: k.torp@samsung.com 149, n.koch@samsung.com 95, os@safl.dk 73 등 | https://github.com/xnvme/aisio (`README.md`, `docs/src/abstract.md`·`conclusion.md`·`environments.md`·`introduction.md`) | ✅ |
| GD-24 | Samsung | 관련 논문: Torp·**Lund**·Tözün, "**Path to GPU-Initiated I/O for Data-Intensive Systems**", DaMoN 2025 (Simon A. F. Lund = 삼성 AiSIO 리드, 레포 C-03) ; SNIA SDC AI 2026 "AiSIO: Orchestrating Storage I/O" 발표 자료 존재 | 2025 / 2026-04 | aisio `docs/src/references.bib` ✅ ; https://www.snia.org/sites/default/files/2026-04/SNIA-SDCAI26-Lund-AiSIO-Orchestrating-Storage-IO-r14.pdf (차단) | ✅ / 🟡 |
| GD-25 | **Kioxia** | GP1(레포 H-04) 보강: "**Super High IOPS SSD**: GPU가 고속 플래시를 **HBM 확장**으로 직접 접근", **512B 접근 입도**, TLC SSD 대비 I/O당 저전력, **10M 512B IOPS를 넘기기 위한 신규 컨트롤러**. 1억 IOPS 제품(레포 H-05) 보강: **XL-FLASH 3세대**, 2세대 대비 **읽기 3배·쓰기 +150%**, **PCIe 7.0 세대 인터셉트**, 순연 사유는 "플래시 실리콘 문제가 아니라 **PCIe 7.0 생태계 인증 기간**". 원 계획은 **GPU당 2개 직결로 2억 IOPS** | GP1 10M @512B, 차기 100M @512B | 2025-09 계획 → 2026-09-08 순연 보도 | TechTimes https://www.techtimes.com/articles/326958/20260908/kioxia-slips-100m-iops-flash-drive-2028-pcie-70-ecosystem-sets-2028-clock.htm ; ComputerBase https://www.computerbase.de/news/storage/xl-flash-gen-3-und-pcie-7-0-kioxias-100-millionen-iops-ssd-kommt-2028.99297/ ; Blocks & Files 2025-09-15 https://blocksandfiles.com/2025/09/15/kioxia-100-million-iops-ssd-nvidia/ ; StorageReview GP https://www.storagereview.com/news/kioxia-gp-series-ssd-extends-gpu-memory-with-xl-flash-for-nvidia-storage-next-ai-workloads | 🟡 |
| GD-26 | **Smart IOPS + H3 Platform** | **Unobtanium T50**: PCIe Gen6 x4, NVMe 2.0, **E3.S**. **512B 랜덤 읽기 최대 50M IOPS, 랜덤 쓰기 10M IOPS**, 순차 28/24 GB/s. 4개 = 2억 IOPS(Rubin급 Gen6 x16 GPU I/O에 맞춤). H3 어플라이언스: RTX PRO 6000 × 4, ConnectX-8 × 4, E3.S 2T 슬롯 20개 → **목표 10억 IOPS**. Storage-Next·SCADA 지원 표방 | 50M @512B(설계 목표) | **2026-08-06** 발표 | StorageReview https://www.storagereview.com/news/smart-iops-unobtanium-t50-50-million-iops-per-gen6-ssd-with-a-one-billion-iops-appliance-target ; engineering.com https://www.engineering.com/?p=150167 | 🟡 (목표치) |
| GD-27 | **Graid Technology** | **Kioxia XD8 NVMe SSD × 32로 만든 RAID 5 보호 볼륨에서 GPU 주도 512B 랜덤 읽기 1억 IOPS**. WholeGraph(GNN) 학습 벤치에서 비보호 기준선과 동등 | 100M @512B(시스템), ⚠️ 파생: 드라이브당 약 3.1M | **2026-07-15** | https://graidtech.com/post/100-million-iops-for-gpu-initiated-io ; StorageNewsletter 2026-08-04 | 🟡 |
| GD-28 | **Wiwynn** | GTC 2026: "Storage-Next 기반 GPU 주도 서버 컨셉". Computex 2026: **SCADA 서버** 실물, **액체냉각 SSD 최대 96개**, Vera CPU, RTX Pro 6000 Blackwell × 4, **PCIe 6.x 스위치 × 4**, ConnectX-9 × 4. 매체 제목 "2.9PB" | 해당 없음 | 2026-03-16 / 2026-06 | Wiwynn https://www.wiwynn.com/news/recap-wiwynn-at-nvidia-gtc-2026-create-ai-beyond-limits ; Tom's Hardware https://www.tomshardware.com/pc-components/ssds/nvidias-high-speed-ai-data-center-storage-servers-break-cover-touting-2-9-petabytes-of-storage-and-extreme-pcie-6-0-performance-wiwynn-shows-off-scada-server-with-gpu-accelerated-storage | 🟡 |
| GD-29 | **Micron** | 9650(Gen6, 276단 TLC, 자체 컨트롤러) 정격 랜덤 읽기 **5.5M IOPS**. SC'25: 44개·H100 3개·PEX90000 스위치 3개·H3 Falcon 6048에서 **512B 2.3억 IOPS = 정격의 약 95%**(Blocks & Files 서술). ⚠️ 파생: 2.3억 ÷ 44 = 약 **5.2M/드라이브**. Microchip과 FMS 2026 Gen6 스토리지 공동 시연 | 2.3억 @512B(시스템) | 2025-11 / 2026-08 | 위키 §2.2 ; Tom's Hardware 9650 ; StorageNewsletter 2026-08-05 | 🟡 |
| GD-30 | **SK hynix** | AI-N P(레포 H-12): 1세대 Gen6 25M IOPS 샘플 2026년 말, 2세대 100M 2027년 말 양산 준비. **FMS 2026 발표 요약에서는 AI-N P 언급을 찾지 못했다**(HBF 표준·375단 NAND·PS1101·CXL KV 데모가 중심) | 해당 없음 | 2025-10~12 계획 | 레포 H-12 ; StorageReview FMS 2026 https://www.storagereview.com/news/sk-hynix-at-fms-2026-16-high-hbm4-wafer-bonded-375-layer-nand-and-a-tiered-memory-pitch | 🟡 / §7 NF-05 |
| GD-31 | **AMD** | `ROCm/rocm-xio`: "ROCm library for **Accelerator-Initiated IO (XIO)**. Enables **AMD GPUs to perform direct IO to NVMe SSDs**, RDMA NICs, and SDMA engines from `__device__` code without CPU intervention." 경고: "**early-access** software technology preview. Running production workloads is **not recommended**." 2026-09-16 커밋 제목: "feat(nvme-ep,docker): **GPU-initiated NVMe fio engine, 190K IOPS**" | 190K(조건 미확인) | 첫 커밋 2025-09-17, 최신 2026-09-16, 태그 v0.1.0 | https://github.com/ROCm/rocm-xio | ✅ |
| GD-32 | Silicon Motion | SM8466(Gen6, TSMC 4nm) 랜덤 읽기·쓰기 **최대 7M IOPS**(블록 크기 미확인), 첫 모델 2026년 말. **범용 Gen6 컨트롤러의 IOPS 기준선** | 7M | 2026 Computex 공개 | Guru3D https://www.guru3d.com/story/silicon-motion-sm8466-pcie-60-ssd-controller-can-handle-28-gb-s-sequential-read/ | 🟡 |

### 1-D. ⭐ 기존 위키 대비 무엇이 바뀌었나 (2026-05 → 2026-10)

1. **"삼성 SCADA 공백" 서술은 부분적으로 낡았다.** 위키·RS-3 페이지는 "삼성 SCADA AI SSD 공개 로드맵 없음"이라 적었다. 2026-10 현재 삼성은 **PM1763(TLC)으로 SCADA 512B 측정 백서**를 냈고(GD-20, 🟡), **GPU 주도 I/O 오픈소스 연구 저장소**(GD-23, ✅)를 운영한다. 그러나 **SLC/XL-FLASH급 전용 매체의 512B 초고IOPS 제품 로드맵**(Kioxia GP·SK AI-N P에 대응하는 것)은 여전히 공개 확인되지 않는다(§7 NF-03).
2. **Storage-Next가 "NVIDIA와 개별 벤더의 공동개발"에서 "40+ 벤더 연합 + 오픈소스 조직 + 적합성 시험" 체제로 바뀌었다**(GD-04·GD-06·GD-08). 다만 코드는 아직 공개 저장소에 없다(GD-07).
3. **1억 IOPS 단일 드라이브 일정은 늦어졌다**(Kioxia 2027→2028, GD-25). 반면 **시스템 단위 1억~2.8억 512B IOPS는 TLC 드라이브 수십 개로 이미 시연**됐다(GD-20·GD-27·GD-29).
4. **GPU 직결뿐 아니라 "SCADA 서버(RDMA)" 경로가 공식화**됐다(GD-08 SCADA Server SDK, cuObject).
5. **NVIDIA 외 GPU(AMD)에서도 GPU 주도 NVMe I/O가 얼리 액세스로 존재**한다(GD-31).

---

## §2. (A2) 워크로드, 블록 크기, 수요 동인

### 2-A. 워크로드별 근거

| ID | 워크로드 | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|
| GW-01 | ⭐ 그래프·데이터 분석, 추천, GNN | BaM 초록 원문: "many emerging applications, such as **graph and data analytics, recommender systems, or graph neural networks**, require **fine-grained, data-dependent access** to storage. CPU orchestration … unsuitable … due to **high CPU-GPU synchronization overheads, I/O traffic amplification, and long CPU processing latencies**." 결과: BFS·CC 그래프 분석 **1.0× / 1.49×** 종단 가속, "**reducing hardware costs by up to 21.7×**", 데이터 분석 워크로드 **5.3×**. 예시 벤치: 262,144 스레드, **NVMe I/O 크기 512B**, 큐 128개 × 깊이 1024 | ASPLOS'23 / README 최신 커밋 2025-11-23 | https://github.com/ZaidQureshi/bam | ✅ |
| GW-02 | GNN 학습 | GIDS README 원문: "accelerating **large-scale Graph Neural Network (GNN)** workloads using **GPU-initiated direct storage accesses**". BaM 위에 구축, 특징(feature) 데이터를 SSD에서 직접 읽고, **재사용 높은 노드는 "Constant CPU Buffer"**(역 PageRank 기반 목록)에 둠. IGB·OGB·MAG 데이터셋, 다중 SSD는 페이지 단위 스트라이핑 | 저장소 현행 | https://github.com/jeongminpark417/GIDS ; 논문 arXiv 2306.16384 | ✅ (README) / 🟡 (논문) |
| GW-03 | KV 캐시·임베딩·벡터 검색 | SCADA 동기로 "KV 캐시 항목, 임베딩, 벡터 검색 결과 서빙이 초당 수백만 건의 작은 랜덤 읽기"(GD-02) | 2026-08 | GD-02 | 🟡 |
| GW-04 | GNN 학습(WholeGraph) | Graid 1억 IOPS RAID 5 구성으로 **WholeGraph** 학습 성능이 기준선과 동등(GD-27) | 2026-07-15 | GD-27 | 🟡 |
| GW-05 | 벡터 검색 | **SwarmIO**(arXiv 2604.06668): GPU 주도 I/O용 SSD 에뮬레이터, 최대 **40 MIOPS** 모사(설계 목표 100 MIOPS). 벡터 검색 사례에서 **SSD IOPS 2.5 → 40 MIOPS로 종단 최대 9.7× 가속** | 2026-04-08 | https://arxiv.org/abs/2604.06668 (차단) ; emergentmind 요약 | 🟡 |
| GW-06 | DRAM↔플래시 경제성 | "**From Minutes to Seconds: Redefining the Five-Minute Rule for AI-Era Memory Hierarchies**"(ScaleFlux·NVIDIA·Stanford): GPU 중심 호스트 + **50M+ 소블록 IOPS Storage-Next SSD**에서는 DRAM↔플래시 캐싱 임계가 **분 단위에서 수 초로 붕괴**, 플래시를 능동 데이터 계층으로 재정의. MQSim-Next 시뮬레이터 동반 | 2025-11 | https://arxiv.org/abs/2511.03944 (차단) ; ScaleFlux 블로그 | 🟡 (이해관계자 공저) |
| GW-07 | RAG | Kioxia: GP Series는 **RAG 서버**에 적합(Investor Day 2026-06-02). TrendForce: 에이전트형 AI가 RAG용 대형 벡터 DB에 빈번히 접근, **고도로 랜덤한 접근이 고IOPS 엔터프라이즈 SSD 수요를 키움** | 2026-06 / 2026 | Kioxia https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html ; TrendForce 2026-05-29 https://www.trendforce.com/presscenter/news/20260529-13068.html | 🟡 |
| GW-08 | KV 캐시(대블록) | **Tutti**(arXiv 2605.03375): GPU 중심 SSD 백엔드 KV 캐시 저장소. CPU를 데이터·I/O 제어 경로에서 제거, **GPU 네이티브 객체 추상화로 "bulk KV cache transfers"**, GPU io_uring. GDS 기반 대비 **TTFT −78.3%**, 처리 요청률 **2×**. vLLM 통합 오픈소스 | 2026-05 | https://arxiv.org/pdf/2605.03375 (차단) | 🟡 |
| GW-09 | ⭐ 벡터 검색(GPU 라이브러리 현황) | NVIDIA cuVS `vamana.hpp` 주석 원문: GPU로 DiskANN(Vamana) 인덱스를 **빌드**한 뒤 "write index to file to be used by **CPU-based DiskANN search** (**cuVS does not yet support search**)" | main `7b18d89` 2026-10-02 | https://github.com/rapidsai/cuvs/blob/main/cpp/include/cuvs/neighbors/vamana.hpp | ✅ |
| GW-10 | 벡터 검색(연구) | GPU 가속 out-of-core 그래프 ANNS 연구(FlashANNS 등)가 SSD 전송과 GPU 연산 중첩으로 DiskANN·SPANN 대비 처리량 2.7~12.2× 주장 | 2025~2026 | arXiv 2507.10070 (차단) | 🟡 (검색 요약) |
| GW-11 | 경로 비교(원문 표) | aisio `architecture.md` 표: **GDS = 커널 공간·CPU 발행·장치 데이터**, **BaM·SCADA = 사용자 공간·장치(GPU) 발행**. `introduction.md`: SCADA는 "**client-server architecture with a user space NVMe driver and a proprietary GPU-oriented I/O protocol**" | 2026-04 | GD-23 저장소 | ✅ |

### 2-B. 블록 크기로 본 수요의 구분

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| GW-20 | KV 캐시 오프로드 블록 계층 트레이스는 **128KiB 요청 지배, 읽기 2.0 GiB/s vs 쓰기 11 MiB/s**(CHEOPS'25) | 레포 wcssd-v1 X-01 | ✅(레포 기확인) |
| GW-21 | LMCache-on-NVMe 프로필 **약 33MB KV 블록 파일**, 프로세스당 약 78% 순차 | 레포 wcssd-v1 X-03 | ⚠️ (레포 기록 등급 승계) |
| GW-22 | GPU 주도 KV 캐시 연구(Tutti)도 **대량(bulk) 객체 전송** 구조 | GW-08 | 🟡 |
| GW-23 | 512B 단위가 명시된 워크로드는 **임베딩·GNN 특징·벡터 검색·그래프 분석**(GW-01·GW-03·GW-04·GW-05) | 위 | ✅/🟡 |
| GW-24 | **⚠️ 파생**: 레포가 이미 채택한 ① 고DWPD 후보의 동인(KV 캐시 오프로드)은 **대블록·순차 성향**이고, (A) 후보의 동인은 **512B 랜덤 읽기**다. 두 후보는 **동인이 되는 워크로드가 다르다**. 단 GD-02는 SCADA 동기에 KV 캐시 항목도 포함시켜 서술하므로 경계가 완전히 분리된 것은 아니다 | GW-20~23, GD-02 | ⚠️ 파생 |

### 2-C. 수요 동인과 시나리오 민감도 (사실 관찰만)

| ID | 관찰 | 근거 | 등급 |
|---|---|---|---|
| GW-30 | 확인된 모든 GPU 주도 I/O 구현(BaM·GIDS·SCADA·aisio·rocm-xio)과 시연(GD-20·26·27·29)은 **GPU가 탑재된 서버**를 전제로 한다 | §1-C, GW-01·02 | ✅/🟡 |
| GW-31 | BaM은 **생성형 AI 이전부터 있던 GPU 워크로드**(그래프 분석, 데이터 분석, 추천)를 대상으로 했다(데이터 분석 5.3×) | GW-01 | ✅ |
| GW-32 | AI 추론 수요 성장 근거: Kioxia Investor Day 데이터센터 추론 수요 **CAGR 86%**(CY25~28E) vs 학습 16%, Storage-Next는 **2027년부터** 매출 기여로 제시 | 레포 qlc-v6-purchase D08 | 🟡 |
| GW-33 | GPU 설치 기반을 결정하는 하이퍼스케일러 CapEx 수치는 레포 기존 원장 참조 | [hyperscaler-q2-2026-capex-2026-07-28.md](hyperscaler-q2-2026-capex-2026-07-28.md), [memory-capex-outlook-2027-2028-2026-08-26.md](memory-capex-outlook-2027-2028-2026-08-26.md) | 레포 |
| GW-34 | **⚠️ 파생 (판단 아님, 구조 관찰)**: (A)의 수요는 **GPU 서버 설치 기반에 비례**하는 구조이고(GW-30), 그중 비생성형 GPU 워크로드(GW-31)는 AI CapEx 축소 시에도 남는 부분이다. 512B 고IOPS 전용 시장 규모(EB·매출)를 수치로 제시한 공개 출처는 찾지 못했다(§7 NF-08) | GW-30~33 | ⚠️ 파생 |

---

## §3. (A3) SSD에 요구되는 기술과 공동설계 필요성

### 3-A. 매체·지연

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| GR-01 | **Kioxia XL-FLASH**: **페이지 4KB**, 읽기 지연 **5µs 미만(3~5µs)**, **16 플레인**(2세대에서 MLC 추가, 두 세대 모두 16 플레인), 다이 SLC 128Gb / MLC 256Gb | Kioxia XL-FLASH 페이지 https://kioxia.com/en-jp/business/memory/xlflash.html (차단) ; Tom's Hardware(GR-03) ; 레포 wcssd-v1 C-12 | 🟡 |
| GR-02 | 기존 3D NAND 기반 SSD 읽기 지연 **40~100µs**, 클라이언트용 3D NAND 다이는 **3~6 플레인** | Tom's Hardware(Kioxia 10M IOPS 기사) https://www.tomshardware.com/pc-components/ssds/kioxia-works-with-nvidia-to-prep-xl-flash-ssd-thats-3x-faster-than-any-ssd-available-10-million-iops-drive-has-peer-to-peer-gpu-connectivity-for-ai-servers | 🟡 |
| GR-03 | 매체 산술(매체가 계산): Innogrit Tacoma 기반 **400GB XL-Flash SSD(다이 32개) = 3.5M IOPS** → 같은 OP 가정으로 **512B 1억 IOPS에 약 915개 다이** 필요 | Tom's Hardware(GR-02 계열) | 🟡 / ⚠️ (매체 산술) |
| GR-04 | SMI CEO: 기존 NAND로 적정 비용·전력의 1억 IOPS는 극히 어렵다(GD-12) | GD-12 | 🟡 |
| GR-05 | **TLC Gen6 드라이브의 512B GPU 발행 실측**: Samsung PM1763 약 **6.92M**(GD-20), Micron 9650 약 **5.2M**(GD-29, 파생), Gen5 PM1753 **3.72~3.86M**(GD-20·GD-23) | GD-20·23·29 | 🟡/✅ |
| GR-06 | 쓰기 측: T50은 512B **읽기 50M / 쓰기 10M**(GD-26), XL-FLASH 3세대는 쓰기 **+150%**(GD-25), Kioxia GP1 **최대 50 DWPD**(레포 H-04). ⚠️ 파생: 공개 목표치는 **읽기 편중**이다 | GD-25·26, 레포 H-04 | 🟡 |

### 3-B. 링크(PCIe)와 블록 크기 산술

| ID | 사실·산술 | 근거 | 등급 |
|---|---|---|---|
| GR-10 | aisio 실측(Gen5): "Protocol overhead accounts for a consistent **28% above payload bandwidth** across all tested I/O sizes"; 단일 CPU 스레드·NVMe 4개로 Gen5 x16을 4KiB 이상에서 약 57.8 GB/s(라인레이트 약 90%) 포화; "**at 512 bytes the constraint shifts to device IOPS rather than link capacity**" | GD-23 `conclusion.md` | ✅ |
| GR-11 | **⚠️ 파생 (링크 상한)**: Gen6 x4 드라이브 순차 읽기 정격 약 **28 GB/s**(PM1763 28.4, 9650 28) ÷ 512B = **약 5,470만 IOPS**(페이로드만). GR-10의 28% 오버헤드를 적용하면 약 **4,270만**. 역으로 **1억 × 512B = 51.2 GB/s 페이로드**(오버헤드 포함 약 65.5 GB/s)로 **Gen6 x4를 넘는다** | 레포 PM1763·9650 사양 ; GR-10 | ⚠️ 파생 (오버헤드율은 Gen5·aisio 조건 값을 그대로 쓴 근사) |
| GR-12 | GR-11과 정합하는 공개 사실: Smart IOPS는 Gen6 x4에서 **5,000만**(GD-26), Kioxia는 1억을 **PCIe 7.0 세대**에 맞춤(GD-25), Newburn은 "**Gen6 ↔ 200 MIOPs @512B**"를 같은 줄에 적음(GD-11, 단위 해석 ⚠️) | GD-11·25·26 | 🟡 |

### 3-C. 컨트롤러·큐·매핑·ECC

| ID | 사실·산술 | 근거 | 등급 |
|---|---|---|---|
| GR-20 | ⭐ **큐 구조 요구(실측)**: aisio "a **single queue per device cannot reach the device IOPS roofline regardless of queue depth**, and that **adding a second queue breaks this ceiling** … additional queues beyond **four per device** add thread count without further gain" | GD-23 `conclusion.md` | ✅ |
| GR-21 | BaM 예시 구성: **큐 128개 × 깊이 1024**, 262,144 GPU 스레드, I/O 512B | GW-01 README | ✅ |
| GR-22 | CPU 대비 GPU의 동시성: CPU는 약 4,500만 IOPS in-flight, GPU 약 10만 스레드로 GPU당 9,500만+ (Samsung 백서 해설) | GD-21 | 🟡 |
| GR-23 | Kioxia: **10M 512B IOPS를 넘기기 위한 신규 컨트롤러**를 설계 중(GD-25), Kioxia GP1은 **"새 자체 컨트롤러"**(레포 H-04). 범용 Gen6 컨트롤러는 **최대 7M**(GD-32) | GD-25·32, 레포 H-04 | 🟡 |
| GR-24 | **⚠️ 파생 (매핑 테이블)**: 4KB 매핑은 엔트리 4B 기준 **약 1GB DRAM / 1TB NAND**(레포 mixed-media MM-21: SPDK FTL L2P 4B/LBA, 검색 요약 "4kB mapping ≈ 1GB DRAM per 1TB"). 매핑 단위를 512B로 낮추면 같은 엔트리 크기에서 **8배(약 8GB/TB)**. 반대로 **4KB 매핑을 유지하고 512B 부분 읽기만 지원**하면 매핑 증가는 없지만 **512B 쓰기는 읽기-수정-쓰기**가 된다. Storage-Next가 어느 쪽을 요구하는지는 확인 못함(§7 NF-13) | 레포 MM-21 ; 검색 요약 | ⚠️ 파생 |
| GR-25 | **⚠️ 파생 (읽기 증폭)**: XL-FLASH 페이지 4KB(GR-01)에서 512B를 읽으면 매체 읽기 단위 대비 **8배**. ECC는 TLC LDPC가 **1KB당 최대 120비트** 정정 수준으로 기술된 바 있고(레포 ladder F33), 코드워드가 512B보다 크면 512B 읽기마다 코드워드 전체를 복호해야 한다. 실제 제품의 코드워드 크기는 미공개 | GR-01, 레포 [component-to-system-solution-ladder-facts-2026-09.md](component-to-system-solution-ladder-facts-2026-09.md) F6·F33 | ⚠️ 파생 |

### 3-D. 플랫폼 전제와 공동설계(co-design) 필요성

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| GR-30 | ⭐ **BaM 하드웨어·시스템 전제(원문)**: PCIe P2P 지원 x86, **Volta 이상 데이터센터급 GPU**(GPU 메모리 전체를 P2P BAR로 노출해야 함, T4는 BAR 256MB라 불가), **Above 4G Decoding 활성**, **IOMMU 비활성**, **ACS 비활성**, 고처리량에는 **PCIe 스위치로 GPU와 SSD 연결 권장**("Going over IOMMU degrades performance"), 테스트 커널 5.8.x, "**A newer kernel like 6.x may not work**" | GW-01 README | ✅ |
| GR-31 | aisio 환경 전제(원문): "Resizable BAR enabled, Above 4G Decoding enabled, **IOMMU disabled, and ACS disabled**", 장치 주도 벤치는 NVMe를 커널 드라이버에서 떼어 `uio_pci_generic`에 바인딩 | GD-23 `environments.md`·README | ✅ |
| GR-32 | 시연 토폴로지가 모두 **Gen6 PCIe 스위치 + 특정 GPU 서버**: Micron(PEX90000 × 3, H3 Falcon 6048), Samsung(PEX90144 × 3, H3 Falcon 6048), Wiwynn(PCIe 6.x 스위치 × 4) | GD-20·28·29 | 🟡 |
| GR-33 | NVIDIA 측 요청·공동개발: Kioxia 1억 IOPS는 "**NVIDIA의 요청**으로" 개발(GD-25), SK hynix는 NVIDIA와 **공동 PoC**(레포 H-12), Storage-Next는 "벤더들이 GPU 주도 스토리지가 **어떻게 동작해야 하는지 정렬**한 뒤 표준화"(GD-04) | GD-04·25, 레포 H-12 | 🟡 |
| GR-34 | 적합성 시험: xio-sig는 **적합성(conformance) 시험 스위트**로 생태계 파편화를 막고, **CI/CD는 플랫폼 벤더에 위임**한다(GD-06 원문). SCADA Server SDK는 **스토리지 업체가 서버를 구현**하는 SDK(GD-08) | GD-06 ✅, GD-08 🟡 | ✅/🟡 |
| GR-35 | **⚠️ 파생 (공동설계 여부, 사실 정리)**: (1) 소프트웨어 인터페이스(cuFile/cuObject/SCADA)는 NVIDIA가 정의하고 적합성 시험으로 관리한다(GR-34). (2) 드라이브 측 수치 목표(1억 IOPS)는 NVIDIA 요청에서 나왔다(GR-33). (3) 성능 시연은 특정 GPU·스위치·서버 조합에서 이뤄졌다(GR-32). (4) 그러나 **GPU 주도 I/O 자체는 표준 NVMe 큐 위에서 동작**하고(BaM "Any NVMe SSD will do", GR-30 README 원문), AMD·Samsung의 독립 구현도 있다(GD-23·31). 즉 **기능 동작은 표준 NVMe로 가능, 성능 목표·검증은 고객(NVIDIA)·시스템 업체와의 공동 작업** 구조다 | GR-30~34, GD-23·31 | ⚠️ 파생 |

---

## §4. (B) CXL 메모리 시맨틱 / 메모리 계층 SSD (가벼운 비교)

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| CX-01 | **Samsung CMM-H**(CXL Memory Module-Hybrid): **FMS'22에 "Memory-Semantic SSD"로 처음 소개**. DRAM 캐시 + NAND, **CXL Type 3** 인터페이스. 용도: 인메모리 DB 영속성, 분석·AI 추론용 계층 메모리, TCO | 2022 소개 / 2024-03 재소개(MemCon) | StorageNewsletter 2024-03-22 https://www.storagenewsletter.com/2024/03/22/samsung-cxl-solutions-cmm-h-or-memory-module-hybrid-device/ ; Samsung CMM-H 백서 https://download.semiconductor.samsung.com/resources/white-paper/CMM-H_Whitepaper_10149503034923.pdf (차단) | 🟡 |
| CX-02 | CMM-H **시제품 특성화 논문**(arXiv 2503.22017, IEEE 게재): **FPGA 기반 캐시 컨트롤러, CXL v1.1**, 대용량 NAND + 소용량 DRAM, **DRAM이 4KB 페이지 단위 하드웨어 캐시**, 소프트웨어에는 **CPU 없는 NUMA 노드**로 노출. 캐시 히트 **1µs 미만**, 미스 **약 70µs**. 히트 시 이점, 미스 시 한계를 함께 보고 | 2025-03 | https://arxiv.org/abs/2503.22017 (차단) ; https://ieeexplore.ieee.org/document/11095419/ | 🟡 |
| CX-03 | 후속 학술: "Revisiting Memory Hierarchies with CMM-H: Use Device-side Caching to Integrate DRAM and SSD for a Hybrid CXL Memory"(ACM, 2025) ; "Can Hardware Outsmart Software in Tiered Memory Management? CMM-H Case Study" | 2025 | https://dl.acm.org/doi/10.1145/3736548.3737828 (차단) ; StorageNewsletter | 🟡 |
| CX-04 | **CMM-H의 2026년 제품화·샘플·고객 현황: 확인 못함**(§7 NF-10). 2026년 삼성 CXL 공개 활동은 **CMM-D(DRAM)** 중심: CMM-D 3.0(CXL 3.2) **2026년 말 양산 목표, Intel·AMD 플랫폼 지연으로 2027 순연 가능** 보도, "CXL 메모리로 총 용량 최대 +50%, 대역폭 2배(DDR5만 대비)". CMM-D KV 캐시 백서는 레포 D-03 | 2026-07 | TrendForce 2026-07-21 https://www.trendforce.com/news/2026/07/21/news-samsung-reportedly-targets-2026-cxl-3-2-mass-production-sk-hynix-advances-new-ai-memory-architecture/ ; Korea Herald https://www.koreaherald.com/article/10813898 | 🟡 |
| CX-05 | ⭐ **Kioxia XL1**: **XL-FLASH를 쓴 CXL 메모리 확장 모듈**. "고속 NAND + CXL 컨트롤러로 **읽기 지연을 기존 NAND 제품의 1/10 미만**", "시스템 DRAM 일부를 CXL 모듈로 대체하면 **메모리 용량 2배, 성능 +30%**". **평가 샘플 2026-08 생태계 협력사 출하** | 2026-08-03/04 (FMS 2026) | Kioxia PR https://www.kioxia.com/en-jp/business/news/2026/20260803-1.html (차단) ; StorageNewsletter 2026-08-04 | 🟡 |
| CX-06 | **SK hynix IMTE**(Inference Memory Tiering Expansion): **CXL 하이브리드 메모리를 HBM/DDR과 SSD 사이**에 두어 추론 효율 **+35.7%**(자사 비교). FMS 2026에서 CXL KV 캐시 데모. CMM-Hybrid(주 캐시 SSD, DRAM prefetch)는 레포 kv-cache-qlc-tech-stack SK hynix 행. "주요 CSP 샘플 2026-08 개시" 서술이 있으나 **대상 제품이 불명확** | 2026-07~08 | TrendForce 2026-07-21 ; StorageReview FMS 2026(GD-30) | 🟡 / ⚠️ (샘플 대상 불명) |
| CX-07 | SK hynix 2세대 **CMM-DDR5 256GB(CXL 3.2)** 샘플을 HPE Discover 2026(6월)에서 Liqid 풀 메모리 서버로 시연, 양산 일정 미공개 | 2026-06 | Korea Herald(CX-04) | 🟡 |
| CX-08 | 채택 현황(긍정): Penguin Solutions **MemoryAI KV 캐시 서버**(2026-03-16), DDR5 3TB + **1TB CXL AIC × 최대 8 = 11TB**, "첫 양산 준비 CXL 기반 KV 캐시 서버". 단 **DRAM 기반 CXL**(NAND 아님). Meta의 DDR4 재활용 CXL 실배치는 레포 dt-b §3 | 2026-03-16 | Businesswire https://www.businesswire.com/news/home/20260316416248/en/ ; HPCwire | 🟡 |
| CX-09 | 채택 현황(부정): HPCwire "도입 6년간 **대규모 배치 보고는 제한적**", 초기 CXL 모듈이 **신품 DRAM을 묶어 원가를 올렸고 DDR4 미지원으로 재활용 이점이 사라짐**, SW 준비 부족, 꼬리 지연 우려. **대규모 배치는 2027년 시작·2028년 확대** 전망 | 2026-08-20 | https://www.hpcwire.com/2026/08/20/what-hyperscalers-should-know-about-cxl/ | 🟡 |
| CX-10 | FMS 2026 CXL 컨트롤러 3종 동시 전시(Samsung CMM-D, Marvell Structera, Montage MXC). 한 매체 평: "FMS 2026에서 발표된 것 중 **2027년 전에 대량 출하되는 것은 없다**" | 2026-08 | Forbes(Coughlin) 2026-08-25 https://www.forbes.com/sites/tomcoughlin/2026/08/25/cxl-growth-shown-at-the-2026-fms-conference/ ; technologyconference.com | 🟡 / ⚠️ (매체 의견) |
| CX-11 | **⚠️ 파생 (구분)**: (A)는 **GPU가 NVMe 블록(512B)을 직접 요청**, (B)는 **CPU(또는 가속기)가 CXL.mem load/store로 바이트 단위 접근**하고 DRAM 캐시가 NAND 지연을 가린다(CX-02). (B)의 NAND 계열 실물은 2026년에 **Kioxia XL1이 샘플 단계**, CMM-H는 제품 일정 미확인 | CX-02·04·05 | ⚠️ 파생 |

---

## §5. (C) 드라이브 내 투명 압축 (가벼운 비교)

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| TC-01 | **ScaleFlux CSD5000**(Gen5): 압축을 **하드웨어로 투명 처리**(드라이버·설정 불필요), 읽기 추가 지연 **한 자릿수 µs**, 쓰기 파이프라인화. 랜덤 읽기 3M+ / 쓰기 430K IOPS → **압축 시 랜덤 쓰기 1.2M IOPS, 순차 쓰기 13GB/s**. 1 DWPD SKU, 4~128TB 물리 NAND(레포 qlc-v8 P-11) | 2024~ | TechPowerUp https://www.techpowerup.com/325101/scaleflux-reveals-the-revolutionary-csd5000-for-the-ai-era ; 레포 P-11 | 🟡 |
| TC-02 | ScaleFlux 압축 기반 내구성 주장: **1.2:1 압축만으로 타 NVMe 대비 내구성 2배**(레포 W37), KV 캐시 플랫폼 **effective 7~10+ DWPD는 압축·FDP 적용 후 실효값**(레포 P-12) | 2026 | 레포 W37·P-12 | 🟡/⚠️ |
| TC-03 | **Alibaba + ScaleFlux, FAST'20 "POLARDB Meets Computational Storage"**: "**클라우드 네이티브 DB에 컴퓨테이셔널 스토리지 드라이브를 실배치한 첫 공개 보고**". CSD 2000 혼합 OLTP에서 일반 NVMe 대비 IOPS +40~70%(벤더 서술) | 2020-02 | https://www.usenix.org/conference/fast20/presentation/cao-wei (차단) ; Businesswire 2020-04-20 | 🟡 |
| TC-04 | **IBM FlashCore Module 4(FCM4)**: 모듈 내부 인라인 하드웨어 압축·암호화, **38.4TB → 실효 87.96TB(2.3배)**, 최대 3:1, Micron 176단 NAND. IBM FlashSystem 전용(독자 폼팩터) | 2024-07 보도 | Blocks & Files 2024-07-29 https://blocksandfiles.com/2024/07/29/proprietary-ibm-and-pure-storage-flash-drives/ | 🟡 |
| TC-05 | **DapuStor Roealsen6 R6101C**: 투명 하드웨어 압축 엔진, **최대 4:1**, 용량 3.5배, 랜덤 쓰기 4배(벤더 주장) | 2024~2025 | TweakTown 리뷰 https://www.tweaktown.com/reviews/11314/dapustor-roealsen6-r6101c-7-68tb-enterprise-ssd-the-magic-of-compression/index.html | 🟡 |
| TC-06 | Samsung **SmartSSD**(2020, Xilinx FPGA, V-NAND 4TB): 투명 압축은 FPGA 응용으로 지원. 2026년 현행 여부 미확인 | 2020 / 2022(2세대 계획) | thefpsreview 2020-11-14 ; bigdatawire 2022-06-09 | 🟡 |
| TC-07 | **Google CDPU(ISCA'23)**: 구글 전 플릿에서 (해)압축이 **CPU 사이클의 2.9%**, 핵심 서비스에서 **10~50%**. 압축 바이트의 **95%가 계산을 아끼려 덜 강력한 알고리즘**을 씀(수요가 인위적으로 억제) | 2023 | https://research.google/pubs/cdpu-co-designing-compression-and-decompression-processing-units-for-hyperscale-systems/ (차단) | 🟡 |
| TC-08 | **Microsoft Project Zipline** README 원문: XP10 압축 포맷, 전체 파이프라인 사양·**RTL**·테스트벤치, MIT. **마지막 커밋 2021-06-30** | 2019-03 공개 | https://github.com/opencomputeproject/Project-Zipline | ✅ |
| TC-09 | 압축기 위치 연구(arXiv 2509.23693): **in-storage·주변장치(QAT)·온칩** 3방식 비교, 처리량·지연이 **배치 위치와 연결에 민감**, 압축 효율은 **데이터 패턴·레이아웃과 강한 상관**, 마이크로벤치 이득과 실응용 가속 사이 괴리, 다중 테넌트 간섭 | 2025-09 | https://arxiv.org/html/2509.23693v1 (차단) | 🟡 |
| TC-10 | 메모리 쪽 압축: **Marvell Structera CXL** 컨트롤러에 압축·해제 블록 내장, 혼합 실데이터에서 DB **3.64×**, XML 2.75×, 소스코드 약 2× | 2026-06-27 | wccftech https://wccftech.com/marvell-structera-compression-makes-every-gigabyte-count-as-memory-shortages-intensify/ | 🟡 |
| TC-11 | ScaleFlux 측 "압축으로 **실효 256TB** 드라이브가 저가에 가능" 주장 | 2024~2025 | TechRadar https://www.techradar.com/pro/256tb-ssds-could-land-before-2026-with-a-surprisingly-low-price-but-will-most-likely-use-a-controversial-and-popular-trick-borrowed-from-tape-technology | 🟡 (벤더 주장 보도) |

---

## §6. (D) 반증·긴장 관계

### 6-A. (A) GPU 직결 소블록 고IOPS SSD에 대한 반증

| ID | 반증 | 근거 | 등급 |
|---|---|---|---|
| CE-01 | **단일 드라이브 1억 IOPS 일정 순연**: Kioxia 2027 → 2028(PCIe 7.0 인증) | GD-25, 레포 H-05 | 🟡 |
| CE-02 | **매체·비용·전력 장벽**: SMI CEO "기존 NAND로 적정 비용·전력의 1억 IOPS는 극히 어렵다", 매체 산술 약 915 XL-Flash 다이 | GD-12, GR-03 | 🟡 |
| CE-03 | ⭐ **성능 이득의 출처에 대한 삼성 연구팀의 평가**: aisio 원문 "SCADA interposes a user-configurable **software cache in GPU HBM** … its performance gains **derive primarily from cache hits rather than from more efficient I/O submission**"(NVIDIA FMS 2025 발표 인용). ⚠️ 해석 주의: 이는 삼성 연구 문서가 NVIDIA 발표를 요약한 것으로 NVIDIA의 직접 진술이 아니다 | GD-23 `introduction.md` | ✅(문구) / ⚠️(해석) |
| CE-04 | **"오픈소스화" 대비 공개 코드 부재**: xio-sig README 상태 "code will appear … Watch this space!"(2026-09-29 개정에서도 유지), 열거 저장소 익명 접근 불가 | GD-06·07 | ✅ / ⚠️ |
| CE-05 | **GPU 벡터 검색 라이브러리의 SSD 검색 미지원**: cuVS는 DiskANN 인덱스 빌드만, 검색은 CPU DiskANN | GW-09 | ✅ |
| CE-06 | **최대 SSD 수요 동인(KV 캐시)은 대블록**: 128KiB 지배(CHEOPS), 33MB 블록 파일, GPU 주도 KV 연구도 bulk 전송 | GW-20~22 | ✅/🟡 |
| CE-07 | **플랫폼 마찰**: BaM·aisio 모두 IOMMU·ACS 비활성 전제, BaM은 커널 6.x 미보장, AMD rocm-xio는 "프로덕션 비권장" 얼리 액세스 | GR-30·31, GD-31 | ✅ |
| CE-08 | **⚠️ 파생: 시스템 목표는 TLC로도 달성됐다.** 512B 시스템 합산 2.81억(Samsung TLC 42개), 2.3억(Micron TLC 44개), 1억(Kioxia XD8 32개, RAID 5). 전용 SLC 매체의 필요성은 **"GPU당 드라이브 수를 줄일 때"**(Kioxia 원 계획: GPU당 2개로 2억)에 생긴다. GPU당 TLC 14개 ≈ 9,700만(GD-21 파생) vs GPU당 1억 IOPS급 2개 = 2억 | GD-20·21·25·27·29 | ⚠️ 파생 |
| CE-09 | **SSD가 GPU 옆이 아니라 스토리지 서버로 나갈 수 있다**: Mailthody(FMS 2025) "컴퓨트 노드의 **낮은 드라이브:GPU 비율** 추세가 스토리지를 컴퓨트 랙 밖 인접 스토리지 서버로 밀어낸다"(검색 요약), NVIDIA는 **SCADA Server SDK**로 GPU 발행 요청을 **RDMA 너머 서버**가 처리하게 했다 | GD-08 ; FMS 2025 연사 요약 https://www.terrapinn.com/conference/future-memory-storage/speaker-vikramsharma-MAILTHODY.stm (차단) | 🟡 |
| CE-10 | **과대 해석 경계**: HWBusters "cuFile은 수년간 CUDA에 들어 있던 GDS API를 연 것이고 **SSD가 VRAM이 되는 것이 아니다**. 새로운 것은 SCADA다" | https://hwbusters.com/news/nvidia-open-sources-cufile-no-your-ssd-is-not-becoming-vram/ | 🟡 |
| CE-11 | **경쟁 1순위 후보의 진척 불명**: SK hynix AI-N P의 2026년 샘플 공개 확인 못함 | GD-30, §7 NF-05 | 🟡 |
| CE-12 | **이해관계자 출처 편중**: 512B 고IOPS의 효용 근거(GW-06 Five-second rule, GD-26 T50, GD-27 Graid)는 다수가 해당 제품 벤더 또는 NVIDIA 공저 | GW-06, GD-26·27 | ⚠️ |

### 6-B. (B) CXL 메모리 계층 SSD에 대한 반증

| ID | 반증 | 근거 | 등급 |
|---|---|---|---|
| CE-20 | CXL 대규모 배치 보고 제한, 2027~2028 확대 전망 | CX-09 | 🟡 |
| CE-21 | CMM-H는 학술 특성화(FPGA 시제품, CXL 1.1) 이후 **2026년 제품 일정 미확인**, 캐시 미스 약 70µs | CX-02·04 | 🟡 |
| CE-22 | 삼성 CXL 주력(CMM-D)도 **CPU 플랫폼 지연으로 2027 순연 가능** | CX-04 | 🟡 |
| CE-23 | 2026년 "양산 준비" CXL KV 캐시 서버는 **DRAM CXL**(Penguin)이며 NAND 기반 아님 | CX-08 | 🟡 |

### 6-C. (C) 투명 압축에 대한 반증

| ID | 반증 | 근거 | 등급 |
|---|---|---|---|
| CE-30 | 마이크로소프트의 공개 압축 하드웨어 프로젝트(Zipline)는 **2021년 이후 커밋 없음** | TC-08 | ✅ |
| CE-31 | 압축 효율은 **데이터 패턴 의존**, 위치(in-storage vs 주변장치 vs 온칩)에 따라 실응용 이득이 갈림 | TC-09 | 🟡 |
| CE-32 | "effective DWPD"·"실효 용량"은 **압축률 가정**에 의존하며 NAND 정격이 아님 | TC-02, 레포 qlc-v8 P-12 | 🟡 |
| CE-33 | 압축 SSD의 하이퍼스케일러 실배치 공개 기록은 **Alibaba(2020)** 외에 확보 못함. 하이퍼스케일러의 압축 투자는 **CPU·전용 가속기(CDPU)** 쪽 근거가 더 많다(TC-07) | TC-03·07, §7 NF-12 | 🟡 |
| CE-34 | AI 데이터(모델 가중치·KV 캐시)의 무손실 압축률 정량치는 확보 못함. 검색 요약상 "기존 텐서 레이아웃은 무손실 압축의 용량 이득을 제한" 서술만 있음 | 검색 요약(arXiv 2609.16161 계열), §7 NF-11 | ⚠️ (단일·간접) |

---

## §7. 부정 확인 (검색했으나 확보하지 못한 것)

- **NF-01. NVIDIA가 Storage-Next용 SSD에 요구하는 정량 사양서(지연·전력·꼬리 지연·내구성 수치).** 공개 문서 없음. 확보한 것은 "전력·꼬리 지연 제약 아래 GPU당 512B IOPS 최대화"라는 목표 문구(GD-03)와 "1억 IOPS"(GD-12)뿐. 검색어: `NVIDIA Storage-Next SSD requirements specification latency power`, `Storage-Next "512-byte IOPS per GPU" power tail latency goal`.
- **NF-02. Storage-Next 40+ 참가사 전체 명단, Samsung 참가 여부.** 이름이 확인된 곳은 GD-09뿐. Samsung은 명단 요약에 등장하지 않았으나 **이는 비참가의 증거가 아니다**. 검색어: `Storage-Next coalition 40 vendors Samsung SK hynix … members list`, `"Storage-Next" Samsung named partner`.
- **NF-03. Samsung의 SLC/Z-NAND/XL-FLASH급 512B 초고IOPS 전용 SSD 제품·로드맵.** FMS 2025 "7세대 Z-NAND + GIDS, 2026" 계획(레포 H-11) 이후 **제품 발표를 찾지 못함**. FMS 2026에서는 zNAND-O(V-NAND 기반, 4·8단, 컨셉)만 확인. 검색어: `Samsung Z-NAND 2026 seventh generation sample launch`, `삼성전자 SCADA SSD 1억 IOPS SLC AI SSD 개발 2026`.
- **NF-04. 2026 Samsung Memory Tech Day 일정과 SSD 발표, OCP 2026(10-13~16) 삼성 SSD 발표 내용.** 2026-10-03 시점 미개최. 레포 D-08은 OCP 2026 예정 주제를 CXL+SSD KV 확장으로 보도.
- **NF-05. SK hynix AI-N P 1세대(25M IOPS) 2026년 샘플 출하 확인.** FMS 2026 요약에서 언급 없음. 검색어: `SK hynix AI-N P sample 2026 … FMS 2026 OCP 2026`, `SK하이닉스 AI-N P 샘플 2026 하반기`.
- **NF-06. xio-sig 코드.** 2026-10-03 기준 공개 저장소 없음(GD-07).
- **NF-07. Samsung PM1763 SCADA 백서 원문·발행일.** 다운로드 도메인 차단. GPU당 수치 표기 충돌(9,500만 vs 95만, GD-21).
- **NF-08. 512B 고IOPS SSD 전용 시장 규모(EB·매출).** 없음. 레포 RS-3의 "SCADA $36B→$322B"는 AI 스토리지 전반 추정이며 512B 고IOPS 전용이 아니다.
- **NF-09. 하이퍼스케일러의 SCADA 프로덕션 배치.** 없음. 확인된 것은 IBM 프로토타입, Google Cloud 검토, Microsoft 이사회 참여 계획(GD-08)과 xio-sig 메인테이너 지위(GD-05).
- **NF-10. Samsung CMM-H의 2026년 제품화·샘플·고객.** 없음. 검색어: `"CMM-H" Samsung 2026`, `Samsung CMM-H CXL … 2026 status sampling customers`.
- **NF-11. KV 캐시·모델 가중치의 드라이브 수준 무손실 압축률 정량치.** 없음.
- **NF-12. Alibaba(2020) 외 하이퍼스케일러의 드라이브 내 투명 압축 SSD 실배치 공개 기록.** 없음.
- **NF-13. SCADA/Storage-Next가 요구하는 LBA 포맷(512B LBA 대 4KB 매핑 + 부분 읽기)과 쓰기 패턴.** 없음.
- **NF-14. SwarmIO 저자 소속.** 검색 인덱스 태그상 KAIST로 보이나 원문 미열람.
- **NF-15. AMD rocm-xio "190K IOPS"의 블록 크기·장치 조건.** 커밋 제목만 확인.

---

## §8. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. 🟡 (목표 정의)** "NVIDIA Storage-Next의 공표 목표는 '전력과 꼬리 지연 제약 아래에서 GPU당 512바이트 IOPS를 최대화'하는 것이며, 2026년 8월 FMS에서 40곳 이상의 벤더가 참여하는 업계 이니셔티브로 공식 출범했다." (GD-03, GD-04)

> **2. ✅ (제도화 상태)** "NVIDIA는 cuFile을 GitHub 조직 xio-sig로 오픈소스화한다고 발표했고 조직 README는 적합성 시험으로 생태계 파편화를 막겠다고 밝히지만, 2026년 10월 3일 현재 코드는 '창립사 통합·검증 후 공개 예정' 상태다." (GD-06, GD-07)

> **3. 🟡 (삼성 현황)** "삼성은 PCIe Gen6 TLC SSD PM1763으로 GPU가 직접 발행한 512B 랜덤 읽기에서 드라이브당 약 692만 IOPS, 42개 합산 약 2.81억 IOPS를 측정한 SCADA 백서를 공개했다." (GD-20)

> **4. ✅ (삼성 오픈소스 연구)** "삼성 저작권의 오픈소스 저장소 aisio는 PM1753 16개로 512B 장치(GPU) 주도 I/O에서 6,170만 IOPS 상한에 도달하려면 CUDA 스레드 4,096개와 장치당 2개 이상의 NVMe 큐가 필요하다고 보고한다." (GD-23, GR-20)

> **5. 🟡 (경쟁사 일정)** "Kioxia의 512B 1억 IOPS SSD(XL-FLASH 3세대, PCIe 7.0)는 2027년에서 2028년으로 순연됐고, 현행 GP1은 512B 1,000만 IOPS로 2026년 말 평가 샘플 단계다." (GD-25, 레포 H-04·H-05)

> **6. ⚠️ 파생 (링크 산술)** "512B로 1억 IOPS는 페이로드만 51.2GB/s로, 정격 순차 읽기 약 28GB/s인 PCIe Gen6 x4 드라이브 한 개의 링크를 넘는다. 공개된 Gen6 x4 설계 목표 최대치는 5,000만(Smart IOPS T50)이다." (GR-11, GR-12, GD-26)

> **7. ✅/🟡 (워크로드 구분)** "GPU 주도 512B 접근의 공개 근거 워크로드는 GNN·그래프·데이터 분석·추천·벡터 검색이며, KV 캐시 오프로드는 128KiB 이상 대블록 전송이 지배적이다." (GW-01, GW-02, GW-05, GW-20, GW-22)

> **8. ✅ (반증 병기용)** "NVIDIA cuVS는 2026년 10월 현재 DiskANN 인덱스를 GPU로 빌드만 하고 검색은 CPU DiskANN에 맡기며, 삼성 aisio 문서는 SCADA의 성능 이득이 I/O 제출 효율보다 GPU HBM 소프트웨어 캐시 히트에서 주로 나온다고 요약한다." (GW-09, CE-03)

> **9. 🟡 (B 비교)** "NAND를 CXL 메모리로 노출하는 제품은 2026년 Kioxia XL1이 평가 샘플 단계이고, 삼성 CMM-H는 2025년 FPGA 시제품 특성화(히트 1µs 미만, 미스 약 70µs) 이후 제품 일정이 공개되지 않았다." (CX-02, CX-04, CX-05)

> **10. 🟡 (C 비교)** "드라이브 내 투명 압축은 ScaleFlux·IBM FCM·DapuStor가 제품화했지만, 하이퍼스케일러 실배치 공개 기록은 2020년 Alibaba POLARDB 사례가 확인된 전부다." (TC-01, TC-03, TC-04, TC-05, NF-12)

> **❌ 쓰지 말 것**
> - "삼성은 SCADA/Storage-Next 대응이 없다" → PM1763 SCADA 백서·aisio 존재(GD-20·23). 쓸 수 있는 것은 "**SLC급 전용 매체의 512B 초고IOPS 제품 로드맵은 공개되지 않았다**"(NF-03).
> - "삼성은 Storage-Next 회원이 아니다" → 명단 비공개(NF-02).
> - "cuFile 코드가 공개됐다" → 2026-10-03 기준 미공개(GD-07).
> - "1억 IOPS SSD가 2027년에 나온다" → Kioxia 2028로 순연(GD-25), SK hynix 진척 미확인(NF-05).
> - "4KB IOPS 3M SSD 대비 33배" 같은 비교를 512B 수치와 섞기 → 블록 크기 다름(§0-3).
> - "KV 캐시 오프로드가 512B 고IOPS 수요를 만든다" → KV 캐시는 대블록 지배(GW-20~22). 단 GD-02는 KV 캐시를 소블록 예시로 들었으므로 "KV 캐시는 무관"도 단정 금지.
> - "SCADA는 SLC SSD가 있어야 동작한다" → 시스템 시연은 모두 TLC 드라이브(CE-08), BaM은 "Any NVMe SSD will do"(GR-30).
> - "CMM-H 2026 양산" → 근거 없음(NF-10).
> - "AI 데이터는 압축이 안 된다(정량)" → 정량 근거 없음(NF-11).

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| xio-sig 조직 프로필 | https://github.com/xio-sig/.github (`profile/README.md`, 커밋 2026-08-03 ~ 2026-09-29) | 수직 통합 I/O 스택, cuFile·cuObject 7개 저장소 계획, 적합성 시험, CI/CD 위임, "code will appear", 작성자 `saritas@nvidia.com`·CJ Newburn, 개명 이력 |
| xio-sig 하위 저장소 접근 시도 | `git ls-remote https://github.com/xio-sig/{cuFileAPI,cuFileConformance,libxFile,xFileLinux,cuObjectClientAPI,cuObjectWireProtocol,cuObjectConformance,libxPUFile,xioLinux}` | 모두 인증 요구(익명 접근 불가), `.github`만 익명 클론 성공 |
| BaM | https://github.com/ZaidQureshi/bam (README, HEAD `315fadf` 2025-11-23) | 초록(대상 워크로드·가속·HW 비용 21.7×), 하드웨어·시스템 전제(IOMMU·ACS 비활성, Above 4G, PCIe 스위치 권장, 커널 5.8), 512B·128큐 예시, 저자 목록 |
| GIDS | https://github.com/jeongminpark417/GIDS (README) | GNN 데이터로더, BaM 의존, Constant CPU Buffer, 다중 SSD 스트라이핑 |
| Samsung aisio | https://github.com/xnvme/aisio (README, `docs/src/{abstract,introduction,architecture,environments,conclusion}.md`, `references.bib`, HEAD `7311ed0` 2026-09-22) | HOMI, PM1753 × 16 + H100, 61.7M IOPS @512B·4096 스레드, 큐 2개 이상 필요, 프로토콜 오버헤드 28%, SCADA 평가 문구, AMD 스택 태스크, 커밋 작성자 분포 |
| NVIDIA cuVS | https://github.com/rapidsai/cuvs (`cpp/include/cuvs/neighbors/vamana.hpp`, main `7b18d89` 2026-10-02) | DiskANN 인덱스 빌드만, 검색은 CPU DiskANN |
| AMD rocm-xio | https://github.com/ROCm/rocm-xio (README, 커밋 2025-09-17 ~ 2026-09-16, 태그 v0.1.0) | Accelerator-Initiated IO, 얼리 액세스·프로덕션 비권장, GPU 주도 NVMe fio 엔진 커밋 |
| Microsoft Project Zipline | https://github.com/opencomputeproject/Project-Zipline (README, 최신 커밋 2021-06-30) | XP10, RTL·사양 공개, MIT, 2021 이후 비활성 |

## 부록 B. 기존 레포 원장·위키와의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| 위키 nvidia-cmx-scada §2.4·§2.5, RS-3 현황 §1·§3: "삼성 SCADA AI SSD 공개 로드맵 없음 ⚠️" | **PM1763 SCADA 백서**(512B 6.92M/드라이브, 2.81억/42개)와 **aisio 오픈소스 연구**(GD-20·23) 추가. "SLC급 전용 매체 로드맵 부재"로 범위를 좁혀야 정확(§1-D) |
| 위키 §2.3 "현재 ~3M IOPS → 목표 2,500만~1억" | 3M은 4KB 데이터시트 계열. 512B GPU 발행 기준 TLC Gen6 실측은 5.2M~6.92M(GR-05). 블록 크기 구분 필요(§0-3) |
| 위키 §2.4 "Kioxia 1억 IOPS 2027" | 2028 순연(레포 H-05) + XL-FLASH 3세대 읽기 3배·쓰기 +150%, 순연 사유 PCIe 7.0 인증(GD-25) |
| RS-3 마일스톤 "2026 Samsung Tech Day가 결정적" | 2026-10-03 시점 미개최(NF-04). OCP 2026 삼성 예정 주제는 CXL+SSD KV(레포 D-08) |
| 레포 samsung-kv-cache C-02(aisio 존재·커밋 수) | 실측 수치·SCADA 평가·실험 환경·AMD 지원을 원문으로 확보(GD-23, GR-10·20·31, CE-03) |
| 레포 wcssd-v1 X-11 "SLC AI SSD 동기는 IOPS·지연" | 쓰기 측 공개 목표(T50 쓰기 10M, XL-FLASH 3세대 쓰기 +150%)로 "읽기 편중" 보강(GR-06) |
| 레포 dt-b §3(CXL 실배치) | 2026 CXL 채택 부정 근거(HPCwire), CMM-D 순연 가능, Kioxia XL1 샘플, SK IMTE(CX-04~10) |
| 레포 qlc-v8 P-11·P-12, W37(ScaleFlux 압축) | IBM FCM4·DapuStor R6101C·Alibaba FAST'20·Google CDPU·Zipline 비활성으로 압축 지형 보강(§5) |
