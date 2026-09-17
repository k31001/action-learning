# KV Cache → QLC SSD 오프로드 계층의 기술 스택 지도 · 벤더별 공개 역량 · Phase 1·2·3 역량 근거 — 웹 리서치 (2026-09-17)

**수집일**: 2026-09-17
**유형**: 웹 검색 + 1차 페이지(GitHub 저장소·공식 문서) 기반 기술 스택·벤더 역량 벤치마크
**용도**: QLC eSSD 전략 보고서 4장(Phase 1·2·3 역량)·5장(기술 스택·협업 기업) 데이터 기반. 기존 수집 [kv-cache-ssd-offload-ecosystem-2026-08.md](kv-cache-ssd-offload-ecosystem-2026-08.md)(오케스트레이션 지형)·[fdp-open-source-ecosystem-2026-08.md](fdp-open-source-ecosystem-2026-08.md)(커널·도구 계층)·[fdp-partner-landscape-2026-09.md](fdp-partner-landscape-2026-09.md)(협업 대상)·[qlc-essd-timeline-fdp-ruh-2026-09.md](qlc-essd-timeline-fdp-ruh-2026-09.md)(RUH 갭·ScaleFlux)를 **계층별 접점·벤더별 역량 비교로 확장**한다. 중복 내용은 요약만 하고 해당 파일을 참조.
**핵심**:
1. KV cache 오프로드 스택은 5계층(추론 엔진 → KV 캐시 관리자 → 전송/I/O 라이브러리 → 커널·플랫폼(CMX) → 디바이스)으로 굳어졌고, **SSD 벤더가 코드로 들어갈 수 있는 접점은 ③ I/O 라이브러리(NIXL 플러그인·GDS·xNVMe)와 ④ 커널 write streams·NVMe FDP·DOCA Memos뿐**이다. ①②는 NVIDIA·중국 3사·OSS가 선점했고 어느 것도 FDP·write hint를 아직 쓰지 않는다(✅ GitHub README 4종 확인).
2. 벤더 공개 역량은 3그룹 — (a) NVIDIA CMX 인증 디바이스만 있는 그룹(삼성 PM1753/1763·Kioxia CM10·Solidigm PS1010), (b) 디바이스+워크로드 분석·펌웨어 정책까지 공개한 그룹(ScaleFlux 200+ RUH·7~10 DWPD, Pliops, Phison), (c) 고객 co-design 계약을 공개한 그룹(Micron↔Anthropic, SK hynix↔NVIDIA AI-N P). **삼성은 (a)에 있고, 오픈소스 FDP 툴체인(xNVMe·CacheLib FDP·XFS write streams)은 Phase 2·3 자산으로 쓸 수 있으나 KV cache에 연결된 공개물은 없다.**
3. 가장 강한 공개 수치: CacheLib FDP 문서 **WAF 3.22→1.03 (100% 사용률, 1.88TB FDP SSD)** ✅; XFS write streams 패치 **RocksDB YCSB WAF −35%** 🟡; ScaleFlux **유효 7~10+ DWPD(5년)** 🟡. 반면 최신 QLC eSSD 정격은 **0.075~0.6 DWPD**(Micron 6600 ION 0.075 RDWPD, 삼성 BM1743 0.26, Kioxia LC9 0.3, Solidigm P5336 0.58~0.6) 🟡 — KV cache 티어(1~3 DWPD TLC)와 **10~40배 갭**. 이것이 "QLC+FDP로 KV cache를 받는다"는 명제의 정량적 부담이다.
4. 오늘 KV cache는 TLC 위에서 서비스된다: NVIDIA CMX 발표 후 **TLC 현물가 반등**(TrendForce 2026-08-18) 🟡, CMX 타깃 SSD 전부 TLC(CM10 1/3 DWPD·PM1753/1763 V9 TLC·PS1010/1030 1/3 DWPD) 🟡. QLC를 이 티어에 넣은 공개 사례는 Sandisk FMS 2026 "고내구 KV cache 구성(BiCS10 QLC)" 발표 1건뿐이며 DWPD 미공개 🟡.

표기: ✅확인(1차 페이지 직접 확인) / 🟡보도 인용(검색 요약·2차 보도) / ⚠️추정·미확인

---

## §1. 스택 맵 — KV cache 오프로드 5계층과 SSD 벤더 접점 (2025~2026)

| 계층 | 주체 / 자산 | 무엇을 제어하는가 | SSD 벤더 접점(플러그인 가능?) | 근거·URL |
|---|---|---|---|---|
| ① 추론 엔진 | vLLM(KV connector API), SGLang(HiCache 3계층 GPU/CPU/스토리지), TensorRT-LLM | KV 블록 할당·prefix 재사용·오프로드 트리거 | 없음. 엔진은 connector 인터페이스만 노출 | SGLang HiCache 백엔드 = file·mooncake·hf3fs·nixl·aibrix + dynamic (🟡 lmsys 2025-09-10, sglang docs) |
| ② KV 캐시 관리자 | **NVIDIA Dynamo KVBM**(G1 GPU→G2 CPU→G3 로컬/풀 SSD→G4 원격) · **LMCache**(11.8k★, 백엔드 CPU RAM·로컬 디스크·Redis/Valkey·Mooncake·InfiniStore·S3·NIXL·GDS) · **Mooncake Store**(DRAM+SSD/NVMe 다계층, vLLM 공식 2026-05-07) · **FlexKV**(Tencent TACO, GPU/CPU/SSD/원격, vLLM v0.17.2 PR#34328·SGLang v0.5.16 PR#29701·TRT-LLM PR#48·Dynamo PR#5858) · **AIBrix**(ByteDance, v0.7.0 2026-06-16, L1 DRAM·L2 InfiniStore RDMA) · **Tair KVCache**(Alibaba, 매니저+HiSim 트레이스 시뮬레이터, 스토리지 HF3FS·Mooncake·NFS) · **DeepSeek 3FS**(MIT, KVCache 피크 읽기 40GiB/s, 노드당 14TiB NVMe×16) | 어떤 블록을 언제 SSD로 내리고 언제 지우는가(수명·재사용 정보의 원천) | **없음 — 4개 README(LMCache·Mooncake·FlexKV·3FS) 모두 FDP·write hint·io_uring 힌트·SSD 내구성 언급 0** ✅. KVBM만 "빈도≥2 블록만 디스크로" 기본 필터를 "SSD 수명 연장" 목적으로 둠 🟡 | ✅ github.com/LMCache/LMCache · kvcache-ai/Mooncake · taco-project/FlexKV · deepseek-ai/3FS · vllm-project/aibrix · alibaba/tair-kvcache; 🟡 docs.nvidia.com/dynamo kvbm |
| ③ 전송·I/O 라이브러리 | **NIXL**(NVIDIA; 블록 메모리·파일시스템·오브젝트·클라우드 스토리지 플러그인 인터페이스, GDS 옵션) · **GPUDirect Storage/cuFile**(FlexKV·LMCache GDS 백엔드) · **io_uring**(FlexKV·CacheLib) · **SPDK/xNVMe**(Samsung 유지, io_uring/io_uring_cmd/SPDK/libaio 백엔드) · LMCache L2 백엔드 목록에 **DOCA_MEMOS** 포함 | 어떤 시스템콜·큐로 SSD에 쓰는가 — **write stream/placement ID를 실을 수 있는 유일한 자리** | **가능** — NIXL 스토리지 플러그인, xNVMe FDP API, LMCache/FlexKV의 io_uring 경로에 `bi_write_stream` 부착 | 🟡 Dynamo KVBM docs(NIXL 플러그인); ✅ FlexKV README(io_uring+GDS); 🟡 docs.lmcache.ai L2 backends ["GDS","GDS_MT","POSIX","HF3FS","OBJ","AZURE_BLOB","DOCA_MEMOS"]; ✅ github.com/OpenMPDK/xNVMe |
| ④-a 커널 | **Linux 6.16 블록 write streams**(FDP를 블록 디바이스·io_uring per-IO 스트림으로 노출, 최대 255 스트림 u8) · **XFS write streams v2~v4**(2026-03~07, ioctl FS_IOC_WRITE_STREAM_GET_MAX/OPEN/SET; FDP NVMe에서 RocksDB YCSB WAF −35%, 일반 NVMe 스트림 간 동시성 +453%) · **f2fs RFC v1/v2**(2026-04, hot/warm/cold 온도를 FDP 스트림에 매핑) · write hints(RWH_WRITE_LIFE_*)는 6개 enum "온도", write streams는 "배치"로 역할 분리 · nvme-cli `fdp configs` 등 FDP 서브커맨드 | 파일시스템/블록 계층에서 스트림 ID 부여 | **가능·진행 중** — 삼성이 XFS·RocksDB·CacheLib FDP 지원을 구축했다고 공개(GOST) 🟡 | 🟡 phoronix NVMe-FDP-Block-Linux-6.16; 🟡 ratatoskr.run xfs write streams v4 2026-07; 🟡 f2fs-devel RFC 2026-04; ✅ nvme-cli Documentation |
| ④-b 플랫폼 표준 | **NVIDIA CMX**(BlueField-4 = Vera CPU + ConnectX-9; **DOCA Memos** KV 통신·스토리지 계층 — KV API, "open interfaces… 스토리지 파트너가 G3.5 컨텍스트 티어로 확장", NVMe/NVMe-oF + **NVMe KV 확장** 사용) · ICMSP 파트너: AIC·Cloudian·DDN·Dell·HPE·Hitachi Vantara·IBM·Nutanix·Pure·Supermicro·VAST·WEKA · Supermicro STX 서버는 "Micron·Samsung·Phison 등과 STX 요구사항 테스트" | KV 블록의 풀 레벨 배치·공유 — SSD가 보는 쓰기 패턴을 사실상 결정 | **부분 가능** — SSD는 NVMe/NVMe-oF·KV 확장으로 접속; DOCA Memos의 배치 힌트가 FDP로 내려오는지는 **미확인** ⚠️ | 🟡 nvidia.com/cmx, nvidianews BlueField-4 STX, Supermicro PR, Spheron ICMSP 가이드("enterprise-class SSD 필수, consumer 제외") |
| ⑤ 디바이스 | 컨트롤러: Marvell Bravera SC6(PCIe 6.0, 2026-Q4 샘플, "KV cache를 HBM→SSD로 오프로드… NAND 내구성 개선") · Silicon Motion MonTitan SM8466/SM8366(NVIDIA ICMS KV cache extension 지원, PerformaShape 지연 분포 관리) · FDP 에뮬레이션: QEMU 8.0+, WARP(FAST'26) | RUH 수·RU 크기·OP·GC 정책 | 벤더 고유 영역 | 🟡 marvell.com 2026-08(FMS), 🟡 SMI 6-K/GTC 2026; WARP는 [fdp-technical-limits-adoption-context-2026-08.md](fdp-technical-limits-adoption-context-2026-08.md) |
| 표준·커뮤니티 | SNIA SDC 2026 StorageAI 트랙("KV Cache as Distributed Storage", "Scaling Inference with KV Cache Storage Offload and RDMA", "Disaggregated KV Storage") · OCP–SNIA 제휴(AI DC 스토리지·메모리 표준) · **OCP HBF 기술 사양 1호**(Sandisk+SK hynix, 2026-08-05) · NVM Express FDP TP | 용어·인터페이스 표준 | 가능(워킹그룹 참여) | 🟡 snia.org sessions 19672·19564·19280; storagenewsletter 2026-08-05 |

### 1.1 ②계층(KV 캐시 관리자) 프로젝트별 상세 — SSD 티어 취급 방식

- **NVIDIA Dynamo KVBM** 🟡: 4단 위계 G1(GPU HBM)·G2(CPU DRAM, 노드 내/간)·G3(로컬/풀 NVMe SSD)·G4(원격 스토리지). G3 "Disk Pool"은 Host→Disk 오프로드와 Disk→Device 온보딩을 담당하고 NIXL 디스크립터가 파일 오프셋/영역을 노출해 zero-copy·옵션 GDS. **디스크 오프로드 필터 기본 활성 — "SSD 수명 연장을 위해 빈도≥2 블록만 CPU→디스크"**. vLLM·TensorRT-LLM 대상 write-through 캐시. (docs.nvidia.com/dynamo kvbm; GTC26 S82033 세션에서 KVBM·FlexKV·LMCache를 한 세션으로 다룸)
- **LMCache** ✅: "engine-independent", vLLM V1 통합, 백엔드 CPU RAM·로컬 디스크(SSD)·Redis/Valkey·Mooncake·InfiniStore·S3 호환·NIXL·GDS. Apache-2.0, 11.8k★, 2,310 커밋. 2026-05 AMD MI300X 에이전틱 벤치마크. README에 io_uring·O_DIRECT·write hint·FDP·내구성 언급 없음. 🟡 docs: L2(영속) 백엔드 목록에 GDS·GDS_MT·POSIX·HF3FS·OBJ·AZURE_BLOB·**DOCA_MEMOS**; StoreController가 L1→L2 비동기 푸시, PrefetchController가 L2→L1.
- **Mooncake** ✅: Transfer Engine(TCP·RDMA·EFA·NVMe-oF·NVLink·HIP·Barex·CXL·Ascend; 4×200G RoCE 87GB/s, 8×400G 190GB/s) · Mooncake Store(DRAM+SSD/NVMe 다계층, large-object striping·zero-copy) · P2P Store(K1.5/K2 학습에 실사용). vLLM MooncakeConnector, SGLang HiCache·PD 분리, TRT-LLM, NIXL 채택. 2026-05-07 vLLM 공식 피처, 2026-08 AgentX/Miles 통합. 🟡 로컬 NVMe 풀링 → NVMe-oF SSD 풀 RFC(#1940) 진행.
- **FlexKV(Tencent TACO)** ✅: GPU·CPU·로컬 SSD·원격(클라우드) 3단, **io_uring + GDS(SSD→GPU 직접)**. 메인라인 머지 이력: vLLM v0.17.2(PR#34328)·SGLang v0.5.16(PR#29701)·TRT-LLM(PR#48)·Dynamo(PR#5858). Apache-2.0. FDP·write hint·내구성 언급 없음. 🟡 Tencent AI 공식 X: "SGLang·vLLM·TRT-LLM·Dynamo 전부에서 동작하는 추론 엔진 아래의 KV 캐시 계층".
- **AIBrix(ByteDance)** ✅ v0.7.0(2026-06-16), Apache-2.0, 5.1k★. 🟡 docs: L1 DRAM 기본, L2 원격(InfiniStore RDMA KV 서버) 옵션 — **로컬 SSD 티어 없음**.
- **Tair KVCache(Alibaba Cloud)** ✅: Manager(prefix·sliding window·KV 매칭, 2단계 쓰기, 스토리지 HF3FS·Mooncake·NFS, Reclaimer 수위·퇴거, **Optimizer가 액세스 트레이스 재생**) + **HiSim**(GPU 없이 실 트레이스로 TTFT/TPOT/처리량 예측). 엔진 vLLM·SGLang·RTP-LLM·TRT-LLM. 🟡 Alibaba 블로그: 3FS 위 엔터프라이즈 배포를 "서버 R&D 스토리지 HW/SW 통합팀"과 공동 최적화.
- **DeepSeek 3FS** ✅ MIT: KVCache 유스케이스에서 전 클라이언트 합산 피크 읽기 40GiB/s(클라이언트당 400Gbps NIC), GC IOPS 그래프 공개; 스토리지 노드당 14TiB NVMe×16 + 200G IB×2, 180노드 6.6TiB/s; USRBIO API·FoundationDB 메타데이터. 🟡 CRAQ로 읽기 편중 KVCache 패턴 최적화.

**독해**: ②계층 소유자(NVIDIA·Tencent·Moonshot·ByteDance·Alibaba·DeepSeek·LMCache)는 모두 "SSD를 파일/블록으로 취급"한다 — 수명 정보(prefix 공유 여부·세션·빈도)는 ②에 있는데 그것을 ⑤로 내려보내는 코드가 없다. 이 공백이 [fdp-open-source-ecosystem-2026-08.md](fdp-open-source-ecosystem-2026-08.md) §4의 "FDP 인지 백엔드 부재"이며, 2026-07 XFS write streams·f2fs RFC로 ④가 열리면서 ③에 스트림 부착 코드를 넣는 것이 기술적으로 가능해졌다(✅ 커널 측·🟡 패치 상태는 미머지 추정 ⚠️).

## §2. 벤더별 공개 역량 표 (Phase 1 디바이스 / Phase 2 워크로드 최적화 / Phase 3 고객 co-design)

| 벤더 | Phase 1 — KV cache/CMX 타깃 디바이스 | Phase 2 — 워크로드 분석·펌웨어 정책·SW 공개물 | Phase 3 — 고객 시스템 SW 공동 설계 공개 근거 | 태그 |
|---|---|---|---|---|
| **Samsung** | PM1753(Gen5 TLC 14.5GB/s)을 Vera Rubin **CMX에 공급**; PM1763(Gen6, V9 TLC, 4nm 컨트롤러, 28.4/21.9GB/s, D2C 액체냉각) 2026-07 양산, "Vera Rubin 메인 스토리지"; BM1773 245.76TB E3.S V9 QLC(2Tb die) FMS 2026 전시 — **DWPD·FDP 지원 미공개** | 백서 "Scaling AI Inference with KV Cache Offloading: … using Samsung PM1753"(NAND AE Group, Sungup Moon) + "Optimizing KV Cache Offloading to CMM-D in a CXL Switch-based Memory Pool"(2026-06, vLLM+LMCache, 8×RTX PRO 6000) → **KV cache 워크로드를 자체 측정하는 역량 공개**; FDP 측: GOST(Javier González)가 커널·xNVMe·SPDK·CacheLib FDP 지원 주도, FMS에서 "CacheLib 실 DC KV 워크로드에서 WAF≈1" 시연, "RocksDB·CacheLib·XFS 지원 경험상 큰 앱 수정 없이 효익의 80% 도달 가능"; OpenMPDK 저장소는 SMDK·KVSSD·uNVMe·KVCeph·KVRocks·DSS — **FDP·KV cache 전용 저장소 없음** | Meta와 CacheLib FDP 공동(EuroSys'25 논문) — **KV cache 고객과의 co-design 공개물 없음**; FMS 2026 메시지는 "TLC=성능·QLC=용량" 이분법 | 🟡 ServeTheHome/TechPowerUp PM1763 2026-07; 🟡 semiconductor.samsung.com 백서 2종; ✅ github.com/OpenMPDK; 🟡 blocksandfiles 2023-08-14(GOST); 🟡 Samsung FMS 2026 블로그 |
| **Solidigm** | D7-PS1010(TLC 176L, **1 DWPD**, 1.92~15.36TB, 15.36TB 28PBW) · D7-PS1030(**3 DWPD**, 12.8TB 70PBW, 800K 랜덤 쓰기 IOPS) — StorageReview 리뷰 제목 "3 DWPD Gen5 That Earned Its Keep in the **KV Cache Tier**"; ICMS 페이지: "Solidigm builds the drives, NVIDIA BlueField DPU가 풀을 프론트" | QLC 61/122TB(D5-P5336 0.58~0.6 DWPD)는 KV cache 티어에 포지셔닝하지 않음; "Solidigm Storage Tool"·CSAL 등 SW의 KV cache 연계는 **미확인** ⚠️ | NVIDIA–Solidigm 공동 인터뷰(2026, "속도·규모·냉각") 공개 — co-design 계약 형태는 미확인 | 🟡 servethehome PS1010/1030; 🟡 storagereview PS1030 리뷰; 🟡 solidigm.com ICMS·CMX 페이지 |
| **Micron** | 9650(세계 최초 Gen6, 28GB/s, 양산 출하) — GTC 2026 **SCADA 데모**("production-grade PCIe Gen6"); 6600 ION 245TB(G9 QLC) **0.075 RDWPD(4K 랜덤)** → 데이터 레이크 포지셔닝, KV cache는 "HBM=hot, 고성능 SSD=persistent KV cache" 구분; FDP 지원 여부 **미확인** ⚠️ | KV cache 전용 펌웨어·SW 공개물 미확인 | **Anthropic 전략 계약(2026-06-22)**: 메모리 co-design + HBM·DRAM·SSD 다년 공급 + Series H 투자, "token economics" 최적화 목표로 "메모리·스토리지 서브시스템이 학습·추론 워크로드에서 어떻게 동작하는지 공동 분석" — **Phase 3 공개 선례의 최상위** | 🟡 micron.com SCADA 블로그 2026-03; 🟡 storagereview 6600 ION; 🟡 storagenewsletter/blocksandfiles 2026-06-23~25 |
| **Kioxia** | **CM10**(첫 Gen6, BiCS10, 1.6~61.44TB, **1 DWPD/3 DWPD**, 콜드플레이트 액체냉각, "AI 추론·KV cache용, NVIDIA CMX 지원 설계", 선별 고객 샘플링, FMS 2026 전시) · CM9 25.6TB TLC 3 DWPD · LC9 245.76TB QLC(BiCS8 2Tb 32-die) **0.3 DWPD** · 2026-03-16 "GPU-initiated 워크로드 최적화 SSD"(SLC 계열 AI SSD, NVIDIA 협업 보도) | **AiSAQ**(DiskANN 포크, MIT, DRAM-free 벡터 검색, GTC 2026 CM9 시연) — 벡터 DB용이며 KV cache 아님; Investor Day 2026-06-02 "AI 추론 시대 성장 전략" | NVIDIA와 AI SSD 개발 보도(2025-12 TrendForce: SK hynix·Kioxia SLC 기반 AI SSD) | 🟡 businesswire/techpowerup 2026-07-29~30; 🟡 storagereview LC9; ✅ github.com/kioxia-jp/aisaq-diskann; 🟡 kioxia-holdings 2026-06-02 |
| **SK hynix** | **AI-N P**(SLC, NVIDIA 공동, 100M IOPS 목표, NAND·컨트롤러 샘플 2026년 말) · **AI-N D**(QLC PB급 밀도) · **AI-N B**(HBF) — OCP 2025 발표; PS1010(TLC Gen5) · PS1101(321L QLC 245TB, 2026-08 CSP 샘플, "highly read-optimized") | **SALT-KV**(Semantic-Aware Lifecycle Tiering for KV Cache: KV를 문맥 단위로 나눠 HBM/DRAM/SSD 중 적합 티어에 배치) · CMM-Hybrid 데모(주 캐시는 SSD, DRAM에 prefetch) · CXL 풀 메모리 KV cache 관리 데모 — **수명 기반 티어링을 벤더가 직접 설계하는 Phase 2 역량 공개** (FMS 2026·AI Infra Summit 2026) | NVIDIA와 AI-N P 공동 개발("AI SSD 10배 성능") · Sandisk와 HBF OCP 사양 공동 | 🟡 koreaherald/blocksandfiles 2025-10-28; 🟡 storagereview SK hynix FMS 2026; 🟡 sedaily 2026-07-29; 🟡 tweaktown |
| **Sandisk** | FMS 2026: "**KV cache 워크로드용 고내구 구성**", BiCS10 QLC 최대 256TB Gen5 eSSD "KV cache 워크로드 최적화" — **DWPD·FDP 미공개** ⚠️; Gen6·DRAM 절감 E3.S; HBF 첫 다이 테이프아웃, 샘플 2H26, 추론 디바이스 샘플 2027 초 | "KV cache가 2030년 AI DC NAND 워크로드의 **35%**" 전망(시장 규모 논거) | SK hynix와 HBF OCP 사양(2026-08-05) — SSD 고객 co-design 공개물 없음 | 🟡 sandisk.com PR 2026-08; 🟡 storagereview HBF 테이프아웃; 🟡 e4ds |
| **ScaleFlux** | CMX 타깃 플랫폼: **200+ FDP 스트림/드라이브**, "고내구 아키텍처 + FDP + 워크로드 텔레메트리", **유효 7~10+ DWPD(5년, 워크로드·FDP 활용·구성 의존)**; NAND 종류 미공개 ⚠️ | "endurance tax"(쓰기 흡수용 여분 용량) 절감 논리 · 텔레메트리 기반 배치 — **Phase 2를 제품 스펙으로 제시한 유일 벤더** | CMX 생태계 정합 주장(NVIDIA 공식 인증 여부 미확인) | 🟡 hpcwire/prnewswire/storagereview 2026-07-30 — 상세는 [qlc-essd-timeline-fdp-ruh-2026-09.md](qlc-essd-timeline-fdp-ruh-2026-09.md) §2 |
| **Pliops** | XDP LightningAI(PCIe ASIC 카드) + FusIOnX SW: NVMe/RDMA SSD에 KV 저장, NVMe-oF 서버 구성 | Dynamo 위 vLLM **2.5배**, 공유 FS 대비 처리량 **4배**, TTFT **5배**(H100) — SSD 종류 무관 상위 KV 스토어 | NVIDIA Dynamo 통합 | 🟡 storagereview/blocksandfiles 2025-05~2026-03 |
| **Phison** | aiDAPTIV+: Phison **AI100E/AI200E 전용 SSD** 필수, aiDAPTIVLink 3에 KV cache 오프로드; CES 2026 PC/iGPU 확장(120B 모델을 DRAM 32GB로) | vLLM·llama.cpp·PyTorch 미들웨어, Apache-2.0 공개 저장소 — **SSD 벤더가 ①②계층 SW를 직접 만든 사례**(단 폐쇄 HW 결합) | — | ✅ github.com/aiDAPTIV-Phison/aiDAPTIV; 🟡 blocksandfiles 2026-01-07 |

### 2.1 벤더별 보충 노트 (표에 못 담은 맥락)

- **Samsung**: NVIDIA CMX 관련 삼성의 공식 문구는 "PM1753을 Vera Rubin에 새로 도입된 CMX 플랫폼에 공급해 추론 성능·전력 효율 개선" 🟡(Samsung Newsroom 2026-07 재인용). Supermicro STX 서버 PR은 SSD 테스트 파트너로 Micron·Samsung·Phison을 명시 🟡. Samsung Semiconductor US MSL(Memory Solutions Lab)은 "클라우드·DC용 플랫폼 아키텍처 최적화"를 공개 미션으로 표방 🟡; OCP·Linux·QEMU·xNVMe·fio 기여는 GOST 블로그로 공개 🟡. **KV cache 스택(①~③) 저장소에 삼성 기여 흔적은 README 기준 없음** ✅.
- **Solidigm**: 2026 전망 기사 "SSD Storage is the New Frontier for AI Performance" 및 "KV Cache Data Offload to SSDs as an Active Performance Layer" 페이지로 **KV cache = SSD 성능 티어** 메시지를 가장 적극적으로 발신 🟡. QLC 라인(P5336)은 "read-intensive workload QLC for cloud storage"로 별도 포지셔닝 🟡 — 즉 Solidigm 스스로도 KV cache 티어는 TLC(PS1010/1030)로 답하고 있음.
- **Micron**: 2026-06-01 COMPUTEX 보도자료에서 "HBM=hot KV cache, 고성능 DC SSD=persistent KV cache, 고용량=데이터 레이크"의 3단 역할 분담 🟡. SCADA(GTC 2026)는 "돌파 데모→배포 경로"로, 9650 + 양산 Gen6 HW 위에서 GPU 주도 스토리지 접근을 시연 🟡 — KV cache 특정 여부는 기사 요약상 불명 ⚠️.
- **Kioxia**: CM10 보도 문구 "AI 추론·KV cache 등 까다로운 워크로드용, NVIDIA CMX 컨텍스트 메모리 스토리지 솔루션 지원 설계, 전세대 대비 순차 읽기 +92%·랜덤 읽기 +85%" 🟡. 2025-12 TrendForce: SK hynix·Kioxia가 NVIDIA와 **SLC 기반 AI SSD** 가속 개발 🟡 — KV cache 티어의 상단이 SLC로 갈 가능성(QLC와 반대 방향) ⚠️.
- **SK hynix**: OCP 2025 AI-N 3종은 "대규모 추론 I/O(P)·PB급 밀도(D)·HBF 대역폭(B)"로 역할 분리 🟡; SALT-KV는 KV를 문맥 세그먼트로 나눠 HBM/DRAM/SSD에 배치 — **벤더가 ②계층 정책을 직접 설계**한 공개 사례 🟡. Solidigm 자회사 QLC 321L 양산과 병행.
- **Sandisk**: 35% 전망은 "2030년 AI DC NAND 워크로드 중 KV cache 비중" 🟡 — SSD 대수·용량이 아닌 워크로드 비중 표현. FMS 2026 "고내구 KV cache 구성"은 QLC 기반이라는 점에서 **QLC를 KV cache에 지명한 유일 공개 사례** 🟡, 단 DWPD·WAF·FDP 수치 없음 ⚠️.
- **ScaleFlux·Pliops·Phison**: 세 곳 모두 "일반 SSD + 상위 SW"가 아니라 **자사 HW에 결합된 SW/펌웨어 정책**으로 차별화 — Phase 2 역량을 제품화한 형태. Pliops는 SSD 미디어 종류를 공개하지 않음 ⚠️.

**독해**: Phase 1(CMX 타깃 디바이스)은 5대 NAND사 모두 확보. Phase 2를 **제품 스펙·SW로 공개**한 곳은 ScaleFlux(RUH 200+·DWPD)·SK hynix(SALT-KV)·Pliops·Phison·삼성(KV cache 백서 2종)이며, Phase 3(고객 co-design 계약 공개)은 Micron↔Anthropic·SK hynix/Kioxia↔NVIDIA뿐. **삼성은 Phase 2용 오픈소스 FDP 자산(GOST·xNVMe·CacheLib·XFS)이 5사 중 가장 두텁지만, KV cache 스택(①~③)과 연결한 공개물이 없다.**

## §3. 내구성·WAF 공개 근거

### 3.1 QLC vs TLC 정격 내구성 (최신 eSSD, 5년 보증 기준)
| 드라이브 | NAND | 정격 | 태그 |
|---|---|---|---|
| Micron 6600 ION 245TB | G9 QLC | **0.075 RDWPD**(4K 랜덤) | 🟡 storagereview |
| Samsung BM1743 61.44TB | V7 QLC | **0.26 DWPD** | 🟡 blocksandfiles 2024-07 |
| Kioxia LC9 245.76TB | BiCS8 QLC | **0.3 DWPD** | 🟡 storagereview |
| Solidigm D5-P5336 61.44/122.88TB | 192L QLC | **0.58 / 0.6 DWPD**(122TB 134.3PBW) | 🟡 solidigm 브리프 |
| SK hynix PS1101 245TB | 321L QLC | "highly read-optimized"(수치 미공개) | 🟡 storagereview |
| Solidigm D7-PS1010 / PS1030 | TLC | **1 / 3 DWPD** | 🟡 servethehome |
| Kioxia CM10 / CM9 | BiCS10 TLC / TLC | **1 또는 3 DWPD** / 3 DWPD | 🟡 businesswire |
| ScaleFlux CMX 플랫폼 | 미공개 | **유효 7~10+ DWPD**(FDP 활용 시) | 🟡 storagereview |

→ KV cache 티어 제품(CM10·PS1030·CM9)은 1~3 DWPD TLC로 수렴. QLC 정격과 **최대 40배(0.075 vs 3) 갭**. QLC를 KV cache에 넣으려면 WAF 절감(FDP)·쓰기 필터(KVBM 빈도≥2)·SLC 캐시 조합으로 이 갭을 메워야 한다는 정량 부담이 명확 ⚠️(분석).

### 3.2 FDP·호스트 배치의 WAF 절감 공개 수치
- **CacheLib 공식 FDP 문서** ✅: 1.88TB FDP SSD, BigHash(랜덤)·BlockCache(순차)에 RUH 1개씩 분리. **50% 사용률 WAF 1.03 vs 1.22, 100% 사용률 WAF 1.03 vs 3.22.** I/O 경로는 커널 블록 계층이 아니라 io_uring_cmd passthru(`FdpNvme`, `prepFdpUringCmdSqe`), 설정 `deviceEnableFDP`+`navyEnableIoUring`+`navyQDepth=1`. (github.com/facebook/CacheLib FDP_enabled_Cache.md)
- **EuroSys'25 / arXiv 2503.11665**(Samsung+Meta) 🟡: Meta·Twitter 프로덕션 트레이스로 "이상적 디바이스 WAF ≈1", 일부 시나리오 DLWA 1.3배 감소.
- **XFS write streams v4(2026-07)** 🟡: FDP NVMe에서 RocksDB YCSB **WAF −35%**; 일반 NVMe에서도 스트림 간 동시성 IOPS **+453%**, 스트림 내 +89%.
- **ScaleFlux** 🟡: WAF 절대치 미공개, "유효 DWPD 7~10+"로만 표현.
- **FAST'26 WARP** — RUH 오분류·noisy RUH 시 효과 붕괴 (조건부성, [fdp-technical-limits-adoption-context-2026-08.md](fdp-technical-limits-adoption-context-2026-08.md) §3).
- **KV cache 워크로드에서의 FDP WAF 실측 공개 사례: 미확인** ⚠️ — 위 수치는 모두 CacheLib/RocksDB 워크로드. Tutti(arXiv 2605.03375, 2026-05)는 SSD 기반 KV cache의 실용화(2×SSD, 읽기 29GB/s·쓰기 12GB/s)를 다루나 FDP 사용 여부 미확인.

### 3.3 "오늘 KV cache는 TLC 위에서 서비스된다"는 근거
- TrendForce 2026-08-18: "Vera Rubin의 HBM→NAND 스필오버, **CMX가 6월 저점 대비 TLC 현물가 반등을 견인**"; 같은 기사에서 Kioxia CM10(CMX 지원)·삼성 PM1763 7월 양산·SK hynix QLC 확대를 병기 🟡.
- CMX 타깃으로 벤더가 스스로 지명한 드라이브는 전부 TLC(PM1753·PM1763·CM10·PS1010/1030) 🟡; Spheron ICMSP 가이드: "KV cache 쓰기 증폭 패턴을 견디는 enterprise-class SSD 필수, consumer 드라이브 제외" 🟡.
- 스토리지 벤더(VAST·DDN·WEKA)는 ICMSP 파트너로 어레이/SW를 제공 — 이들이 내부에 QLC를 쓰는지는 미확인 ⚠️ (VAST는 QLC 기반 어레이 벤더이나 KV cache 티어 미디어 공개 없음).
- 수요 측 리스크: DeepSeek V4.1-Flash(2026-09-10)는 토큰당 KV 890B로 **HBM ¼·SSD 풋프린트 ⅛** — 모델 측 KV 압축이 SSD 수요 총량을 줄일 수 있음 🟡 (Yahoo Finance/Insider Monkey 재인용).

## §4. Phase 1·2·3별 필요 역량 — 공개 근거 매핑

| Phase | 필요 역량(보고서 정의) | 공개 근거(누가 무엇을 보여줬나) | 삼성 공개 현황 |
|---|---|---|---|
| **Phase 1** 디바이스 | Gen5/6 컨트롤러·고RUH FDP 펌웨어·QLC 미디어 관리·액체냉각·NVMe KV 확장 | ScaleFlux **200+ RUH**(현행 업계 2~8) 🟡; Marvell SC6·SMI MonTitan이 "KV cache 오프로드·ICMS 지원"을 컨트롤러 스펙에 명시 🟡; Kioxia CM10·삼성 PM1763 D2C 액체냉각 🟡; CMX는 NVMe KV 확장 사용 🟡 | PM1753 CMX 공급·PM1763 양산(✓). **RUH 수·FDP 지원 여부(PM1763/BM1773) 미공개** ⚠️ |
| **Phase 2** 워크로드 최적화 | 트레이스 수집·재현(시뮬레이터), WAF/테일 지연 측정, RUH 정책(수명·테넌트·prefix 분리), 텔레메트리 | Alibaba **Tair KVCache HiSim**(실 트레이스로 TTFT/TPOT 예측, GPU 불필요) ✅ — 고객 측 트레이스 자산의 존재 증명; Dynamo KVBM **빈도≥2 필터**(쓰기 억제 정책이 관리자 계층에 있음) 🟡; SK hynix **SALT-KV**(수명·의미 기반 티어링) 🟡; ScaleFlux 텔레메트리 🟡; CacheLib WAF 3.22→1.03(RUH 2개만으로) ✅; XFS write streams RocksDB −35% 🟡; WARP 에뮬레이터(정책 변수 재현) | KV cache 백서 2종(PM1753·CMM-D, vLLM+LMCache)으로 **워크로드 측정 역량 있음** 🟡; FDP 정책 연구는 CacheLib/RocksDB/XFS 중심 — **KV cache 트레이스 기반 RUH 정책 공개물 없음** ⚠️ |
| **Phase 3** 고객 co-design | 추론 엔진·캐시 관리자·커널 I/O 경로 이해, 고객 스택에 코드 기여, 공동 계약 | Micron↔Anthropic(SSD 공동 설계 명시, 2026-06-22) 🟡; SK hynix↔NVIDIA AI-N P 🟡; Phison이 ①②계층 SW를 직접 보유(aiDAPTIVLink) ✅; Tencent FlexKV가 NVIDIA와 공동 개발되어 vLLM·SGLang·TRT-LLM·Dynamo 메인라인에 머지(PR 번호 공개) ✅ — **메인라인 머지가 co-design의 가시적 증거**; LMCache가 DOCA_MEMOS를 백엔드로 채택 🟡 | GOST의 CacheLib(Meta) 메인라인 머지가 선례 🟡; **KV cache 관리자(LMCache·FlexKV·Mooncake·KVBM)에 삼성 기여 흔적 없음** ✅(README 기준) |
| (보조) 조직 신호 | 채용 공고 | Samsung Semiconductor(MSL, San Jose 하이브리드) "Sr. Storage Software Engineer" 공고 존재 🟡 — 직무 내용(FDP·KV cache 언급 여부) 미확인 ⚠️; Solidigm KV cache 명시 공고 미발견 ⚠️ | — |

**보고서 반영 지침(분석적 관찰)**: Phase 2→3 전환의 최단 공개 경로는 (i) ③계층(FlexKV/LMCache의 io_uring·GDS 백엔드)에 write stream 부착 PR, (ii) Tair KVCache HiSim류 트레이스로 RUH 정책 검증·WAF 공개, (iii) CMX DOCA Memos 배치 힌트↔FDP 매핑 여부 확인. 세 가지 모두 삼성이 이미 가진 자산(xNVMe·GOST·CacheLib 경험)으로 착수 가능하며, KV cache 워크로드 FDP WAF 실측 공개는 현재 **업계 공백**(§3.2)이다.

## §5. 공백·미확인 목록 (다음 수집 과제)

| # | 미확인 항목 | 왜 중요한가 | 확인 경로 |
|---|---|---|---|
| 1 | NVIDIA DOCA Memos의 배치/수명 힌트가 NVMe FDP 디렉티브로 내려오는지 | ④-b→⑤ 접점의 존재 여부가 "CMX 위에서 FDP QLC" 명제의 성립 조건 | DOCA Memos SDK 문서·NVIDIA 기술 블로그 원문(이번 수집에서 접근 차단) |
| 2 | 삼성 PM1763·BM1773의 FDP 지원·RUH 수·DWPD | Phase 1 자체 위치 파악 | 삼성 제품 페이지·데이터시트 |
| 3 | Sandisk "고내구 KV cache 구성(QLC)"의 DWPD·WAF | QLC KV cache 유일 선례의 정량 | Sandisk FMS 2026 발표 자료 |
| 4 | Micron 6600 ION·9650 FDP 지원 | 경쟁사 Phase 1 비교 | Micron 데이터시트 |
| 5 | KV cache 워크로드에서의 FDP WAF 실측(어느 벤더·논문이든) | §3.2 업계 공백 — 선점 가능 | SNIA SDC 2026 세션 자료·arXiv 후속 |
| 6 | XFS write streams·f2fs FDP 패치의 메인라인 머지 상태·목표 커널 | ④-a 성숙 시점 | lore.kernel.org / Phoronix |
| 7 | ScaleFlux 플랫폼의 NAND 종류(TLC/QLC)·WAF 절대치 | "7~10 DWPD"가 QLC 위에서인지 | ScaleFlux 스펙시트 |
| 8 | Solidigm CSAL(SPDK FTL 기반 QLC 쓰기 정형)의 KV cache 적용 여부 | QLC+SLC 캐시 경로의 공개 선례 | Solidigm 기술 페이지·SPDK 문서 |
| 9 | Samsung MSL 채용 공고의 직무 키워드(FDP·KV cache·vLLM) | Phase 2·3 조직 역량 신호 | greenhouse 공고 원문(접근 차단) |
| 10 | VAST·DDN·WEKA의 KV cache 티어 미디어(TLC/QLC) | 스토리지 벤더 채널에서 QLC 진입 여부 | 각사 CMX/ICMSP 솔루션 브리프 |

## 원본 링크

- NVIDIA CMX: https://www.nvidia.com/en-us/data-center/ai-storage/cmx/ · BlueField-4 STX: https://nvidianews.nvidia.com/news/nvidia-launches-bluefield-4-stx-storage-architecture-with-broad-industry-adoption · 기술 블로그: https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/
- Dynamo KVBM: https://docs.nvidia.com/dynamo/v1.3.0/components/kvbm · KV offloading: https://docs.nvidia.com/dynamo/v-0-9-0/user-guides/kv-cache-offloading · GTC26 S82033(KVBM·FlexKV·LMCache): https://www.nvidia.com/en-us/on-demand/session/gtc26-s82033/
- LMCache: https://github.com/LMCache/LMCache · L2 backends: https://docs.lmcache.ai/mp/l2_storage/index.html · GDS: https://docs.lmcache.ai/kv_cache/storage_backends/gds.html
- Mooncake: https://github.com/kvcache-ai/Mooncake · SSD offload 설계: https://kvcache-ai.github.io/Mooncake/design/ssd-offload.html · NVMe-oF SSD pool RFC: https://github.com/kvcache-ai/Mooncake/issues/1940
- FlexKV: https://github.com/taco-project/FlexKV · Dynamo 통합: https://docs.nvidia.com/dynamo/v1.2.1/integrations/kv-cache-integrations/flex-kv
- SGLang HiCache: https://www.lmsys.org/blog/2025-09-10-sglang-hicache/ · https://docs.sglang.io/advanced_features/hicache_design.html
- AIBrix: https://github.com/vllm-project/aibrix · https://aibrix.readthedocs.io/latest/designs/aibrix-kvcache-offloading-framework.html
- Tair KVCache: https://github.com/alibaba/tair-kvcache · 3FS: https://github.com/deepseek-ai/3FS · Alibaba Tair on 3FS: https://www.alibabacloud.com/blog/602856
- Linux 6.16 write streams: https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16 · XFS write streams v4: https://ratatoskr.run/linux-fsdevel/2026/07/17274958/t · f2fs FDP RFC: https://ratatoskr.run/linux-f2fs-devel/2026/04/3517118/t
- CacheLib FDP 문서: https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md · EuroSys'25 논문: https://arxiv.org/abs/2503.11665
- xNVMe: https://github.com/OpenMPDK/xNVMe · OpenMPDK: https://github.com/OpenMPDK · nvme-cli FDP: https://github.com/linux-nvme/nvme-cli/blob/master/Documentation/nvme-fdp-configs.txt
- Samsung GOST/FDP(2023-08-14): https://blocksandfiles.com/2023/08/14/using-ssd-data-placement-to-lessen-write-amplification/ · Samsung KV cache 백서: https://download.semiconductor.samsung.com/resources/white-paper/scaling_ai_inference_with_kv_cache_offloading.pdf · CMM-D KV cache 백서(2026-06): https://download.semiconductor.samsung.com/resources/white-paper/Optimizing_KV_Cache_Offloading_to_CMM-D_in_a_CXL_Switch-based_Memory_Pool.pdf
- Samsung PM1763 양산: https://www.servethehome.com/samsung-pm1763-pcie-gen6-enterprise-ssd-in-production/ · FMS 2026: https://semiconductor.samsung.com/news-events/tech-blog/samsung-presents-its-vision-for-next-generation-ai-infrastructure-with-3d-memory-architecture-at-fms-2026/ · BM1773: https://electronics-journal.com/news/114908-samsung-launches-245-76tb-bm1773-ssd-for-high-density-ai-data-centers
- Solidigm ICMS: https://www.solidigm.com/products/technology/icmsp-ai-inference-is-flash-storage-problem.html · PS1010/1030: https://www.servethehome.com/solidigm-d7-ps1010-and-d7-ps1030-pcie-gen5-nvme-ssds-launched/ · PS1030 KV cache 리뷰: https://www.storagereview.com/review/solidigm-d7-ps1030-review-3-dwpd-gen5-that-earned-its-keep-in-the-kv-cache-tier · NVIDIA–Solidigm 인터뷰: https://www.servethehome.com/storage-for-the-ai-factory-era-solidigm-nvidia-an-interview/
- Micron SCADA GTC 2026: https://www.micron.com/about/blog/storage/ssd/from-breakthrough-demo-to-deployment-path-scada-on-production-grade-pcie-gen6-hardware-at-nvidia-gtc-2026 · 6600 ION 리뷰: https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay · Micron↔Anthropic: https://www.storagenewsletter.com/2026/06/25/micron-and-anthropic-announce-strategic-agreement-to-scale-next-generation-ai-infrastructure/
- Kioxia CM10: https://www.businesswire.com/news/home/20260729732832/en/ · https://www.techpowerup.com/351218/ · GPU-initiated SSD(2026-03-16): https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-1.html · LC9: https://www.storagereview.com/news/245tb-kioxia-lc9-ssd-sets-new-ssd-density-record · AiSAQ: https://github.com/kioxia-jp/aisaq-diskann · Investor Day: https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html
- SK hynix OCP 2025 AI-N: https://www.koreaherald.com/article/10602184 · https://blocksandfiles.com/2025/10/28/sk-hynix-aims-for-ai-flash-glory-with-ain-trifecta/ · FMS 2026(SALT-KV·CMM-Hybrid): https://www.storagereview.com/news/sk-hynix-at-fms-2026-16-high-hbm4-wafer-bonded-375-layer-nand-and-a-tiered-memory-pitch · KV cache NAND 개발: https://en.sedaily.com/finance/2026/07/29/sk-hynix-developing-new-nand-products-for-kv-cache-demands
- Sandisk FMS 2026: https://www.sandisk.com/company/newsroom/press-releases/2026/sandisk-nand-innovation-for-era-of-ai-inference-at-fms-2026 · HBF 테이프아웃: https://www.storagereview.com/news/sandisk-tapes-out-its-first-hbf-memory-die-targets-2027-for-inference-product-samples · HBF OCP 사양: https://www.storagenewsletter.com/2026/08/05/fms-2026-sandisk-and-sk-hynix-advance-global-standardization-of-high-bandwidth-flash-with-release-of-first-ocp-technical-specification/
- ScaleFlux: https://www.hpcwire.com/off-the-wire/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload/ · Pliops: https://www.storagereview.com/review/pliops-xdp-lightningai-supercharges-kv-cache-to-optimize-llm-inference-with-nvidia-dynamo · Phison: https://github.com/aiDAPTIV-Phison/aiDAPTIV
- Marvell Bravera SC6: https://www.marvell.com/company/newsroom/marvell-ai-memory-infrastructure-agentic-ai-inference.html · Silicon Motion MonTitan/ICMS: https://siliconmotiontechnologycorporation.gcs-web.com/news-releases/news-release-details/silicon-motion-showcases-differentiated-enterprise-ssd/
- TrendForce CMX→TLC 현물가(2026-08-18): https://www.trendforce.com/news/2026/08/18/news-nvidia-vera-rubin-spillover-from-hbm-to-nand-cmx-fuels-tlc-spot-price-rebound-from-june-dip/ · Spheron ICMSP 가이드: https://www.spheron.network/blog/nvidia-icmsp-kv-cache-nvme-inference-guide/ · Supermicro STX: https://www.supermicro.com/en/pressreleases/supermicro-among-first-unveil-nvidia-bluefield-4-stx-storage-server-improve-ai
- SNIA SDC 2026: https://www.snia.org/sniadeveloper/session/19672 · https://www.snia.org/sniadeveloper/session/19564 · https://www.snia.org/sniadeveloper/storageai-2026 · OCP–SNIA: https://www.datacenterdynamics.com/en/news/ocp-and-snia-team-up-to-tackle-storage-memory-and-networking-needs-of-ai-data-centers/
- Tutti(SSD-backed KV cache, 2026-05): https://arxiv.org/html/2605.03375 · DeepSeek V4.1-Flash KV 절감: https://ca.finance.yahoo.com/news/deepseek-cut-kv-cache-hbm-011603128.html
- Samsung MSL 채용(참고): https://boards.greenhouse.io/samsungsemiconductor/jobs/4610617003
