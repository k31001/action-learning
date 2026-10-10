# AI 추론 스토리지 하위 워크로드별 SSD 요구사항 · 삼성 데이터센터 SSD 라인업 · GC→테일 지연 메커니즘 · 초고DWPD 신호 팩트 원장 (2026-10-10)

**수집일**: 2026-10-10
**수집자**: Research Agent — 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 레포 기존 원장 재사용(원 파일 경로 인용) + 웹 검색 요약(이번 세션 신규) 기반 팩트 원장
**용도**: 발표 덱 "AI 추론은 단일 워크로드가 아니라 하위 워크로드마다 SSD 요구(읽기 대역·소블록 IOPS·테일 지연·DWPD·용량)가 다르다 → 삼성 라인업은 어디에 대응하는가"의 근거 표. 덱 빌더는 ID로 인용한다.

**등급**: ✅ 1차 원문 직접 확인(레포 원장이 ✅로 기록한 것 포함) / 🟡 검색 요약·2차 매체·벤더 주장(1차 출처라도 원문을 직접 못 연 경우 포함) / ⚠️ 본 원장의 산술 파생·가정·단일출처·충돌(산식 명기)

**ID 체계**: `IR-A..`(§A 추론 하위 워크로드), `IR-B..`(§B 삼성 라인업), `IR-C..`(§C GC→테일 지연), `IR-D..`(§D 초고DWPD·SLC 신호). 레포의 기존 `IR-01~IR-35`([ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md))와 겹치지 않도록 섹션 문자를 붙였다. 레포 기존 원장의 사실은 **원 ID + 원 파일 경로**로 재인용하고 수치만 옮겼다.

---

## ⚠️ 0. 방법론·도구 제약

- **egress 차단(이번 세션)**: `semiconductor.samsung.com`, `heise.de`, `storagereview.com`, `club386.com`, `igorslab.de`, `arxiv.org`, `usenix.org`, `glennklockwood.com`, `vastdata.com`, `nvmexpress.org`, `snia.org`, `spheron.network`, `github.com`(웹) 모두 `CONNECT 403`. WebFetch는 DNS 해석 실패. **직접 열람 가능했던 것은 `raw.githubusercontent.com`뿐**(LMCache·DiskANN README 확인). 따라서 이번 세션 신규 사실은 **거의 전부 🟡(검색 요약 경유)**다. 삼성 제품 사양도 공식 페이지를 직접 열지 못했고 검색 엔진이 인용한 공식 페이지 스니펫 기준이다.
- **레포 재사용 원장**(약칭): **DT** = [datacenter-types-storage-requirements-2026-10.md](datacenter-types-storage-requirements-2026-10.md) · **WC** = [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md) · **UD** = [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](ssd-ultra-high-dwpd-mlc-mode-2026-10.md) · **GD** = [ssd-future-candidate-gpu-direct-iops-2026-10.md](ssd-future-candidate-gpu-direct-iops-2026-10.md) · **SR** = [ssd-scada-market-technical-review-2026-10.md](ssd-scada-market-technical-review-2026-10.md) · **WQ** = [qlc-waf-qos-op-factcheck-2026-10.md](qlc-waf-qos-op-factcheck-2026-10.md) · **CU** = [ssd-customer-high-dwpd-evidence-2026-10.md](ssd-customer-high-dwpd-evidence-2026-10.md) · **SK** = [samsung-kv-cache-activities-2026-09.md](samsung-kv-cache-activities-2026-09.md) · **KQ** = [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) · **AV** = [agent-vm-and-cloud-ssd-requirements-2026-10.md](agent-vm-and-cloud-ssd-requirements-2026-10.md) · **GR(성장)** = [essd-growth-metrics-2010-2026-2026-10.md](essd-growth-metrics-2010-2026-2026-10.md) · **ER** = [essd-rated-dwpd-products-2008-2026-2026-10.md](essd-rated-dwpd-products-2008-2026-2026-10.md) · **PC(냉각)** = [ssd-future-candidate-power-cooling-2026-10.md](ssd-future-candidate-power-cooling-2026-10.md) · **V8** = [qlc-v8-dwpd-price-inference-2026-09.md](qlc-v8-dwpd-price-inference-2026-09.md) · **W(v6)** = [qlc-v6-waf-measurement-trend-2026-09.md](qlc-v6-waf-measurement-trend-2026-09.md) · **TD** = [tlc-demand-why-tlc-segmentation-2026-10.md](tlc-demand-why-tlc-segmentation-2026-10.md)
- **파생 산식 규칙**: GB = 10⁹B. 읽기 시간 = 데이터량 ÷ 대역(인터페이스·오버헤드·병렬 디바이스 수 무시한 상한 근사). KV 바이트/토큰은 DT-30 산식(BF16) 승계.

---

## §0-A. 한눈에 보는 하위 워크로드 × SSD 요구 (덱용 요약, 상세는 §A)

| 하위 워크로드 | 지배 I/O 패턴 | 핵심 지표 | 대표 수치 (ID·등급) |
|---|---|---|---|
| ① 모델 가중치 로딩·모델 스왑 | 대블록 **순차 읽기**, 버스트(기동·스왑 시) | 순차 읽기 GB/s, 용량 | 70B 기동 37초·8B 15초(IR-A03 ✅), Safetensors 8B 47.99초 → 스트리머 7.53초(IR-A01 🟡), 405B BF16 ≈ 810GB(IR-A10 ⚠️) |
| ② RAG·벡터 DB | **4KB급 소블록 랜덤 읽기**, 쿼리당 다회 왕복 | 랜덤 읽기 IOPS, 평균·테일 지연 | DiskANN 10억 점·64GB RAM·5,000+ QPS·평균 3ms 미만(IR-A20 🟡), 쿼리 지연의 70~90%가 I/O(IR-A23 🟡) |
| ③ KV 캐시 오프로드 | 대블록(128KiB~33MB) 읽기 편중 + 상시 쓰기 | 읽기 대역(재계산보다 빨라야), 테일 지연, DWPD | 손익분기 대역 23.2GB/s@1K tok → 3.5GB/s@80K tok(IR-A30 🟡), 읽기:쓰기 186:1(X-01 ✅)~1.29:1(CU-34 ⚠️), 실측 3.2 DWPD(D-03 🟡) |
| ④ 에이전트 메모리·장문맥·세션 로그 | append-only 로그, 스냅샷 쓰기 버스트, KV 재사용 | 용량, 스냅샷 쓰기 대역, 재개 지연 | 호출당 입력 67,818 tok·캐시 재사용 85.7%(DT-42 ✅/⚠️), 재개 500ms 미만·초당 500회+(DT-54 ✅) |
| ⑤ (추론 측) 체크포인트·상태 스냅샷 | 메모리 이미지 순차 쓰기 | 쓰기 대역, 재개 시간 | pause RAM 1GB당 약 4초(AV-16 🟡), GKE Pod snapshots 기동 −89%(DT-36 ✅) |
| (참고) GPU 주도 512B 경로 | **512B 랜덤 읽기** | GPU당 IOPS, **테일 지연·전력 제약** | 목표 GPU당 약 2억 IOPS(IR-A45 🟡), PM1763 드라이브당 6.92M(GD-20 🟡) |

---

## §A. AI 추론 스토리지 하위 워크로드와 SSD 요구사항

### A-1. 모델 가중치 로딩·모델 스왑(콜드 스타트·멀티모델 서빙)

| ID | 사실 | 값 | 출처(이름·일자·URL) | 등급 |
|---|---|---|---|---|
| IR-A01 | NVIDIA Run:ai Model Streamer 벤치: Llama 3 8B(15GB, Safetensors), AWS g5.12xlarge·A10G 1장, 콜드 스타트. **GP3 SSD(1,000MiB/s 상한)**: 기본 Safetensors 로더 **47.99초**, 스트리머 동시성 16에서 **14.34초**(본문 16.11초·984.4MiB/s로 표·본문 불일치). GP3 처리량 상한이 병목. **IO2 SSD(4,000MiB/s)**: 스트리머 동시성 8에서 **7.53초**(Safetensors 대비 약 6배) | 47.99s → 14.34s(GP3) / 7.53s(IO2) | NVIDIA 개발자 블로그 "Reducing Cold Start Latency for LLM Inference with NVIDIA Run:ai Model Streamer"(2025) https://developer.nvidia.com/blog/reducing-cold-start-latency-for-llm-inference-with-nvidia-runai-model-streamer ; IO2 수치는 hyper.ai 2차 정리 https://hyper.ai/en/stories/62da06ca86a30dbdb45cccbf439905fa | 🟡 (IO2 7.53초는 2차 정리만) |
| IR-A02 | **⚠️ 파생**: IR-A01에서 로딩 시간은 스토리지 대역에 비례 — 15GB ÷ 1,000MiB/s ≈ 14.3초(GP3 상한과 실측 14.34초 일치), 15GB ÷ 4,000MiB/s ≈ 3.6초(IO2 실측 7.53초는 상한의 약 48%) | 대역 제약 확인 | IR-A01 산술 | ⚠️ |
| IR-A03 | **GKE Pod snapshots**: CPU·GPU 메모리 포함 실행 상태를 저장·복원, 추론 기동 최대 **−89%**, **70B 모델 37초·8B 15초** 로딩 | 37s(70B) / 15s(8B) | DT-36 (Google Cloud 블로그 2026-09-21) https://cloud.google.com/blog/products/containers-kubernetes/gke-pod-snapshots | ✅ (레포) |
| IR-A04 | **fastsafetensors**(IBM Research, IEEE CLOUD 2025): 파라미터 묶음을 디스크에서 GPU 메모리로 직접(GDS·P2P DMA) 읽어 기본 safetensors 대비 **4.8~7.5배** 로딩 가속(Llama 7/13/70B, Falcon 40B, Bloom 176B). 패키지 페이지: Llama-70B·GPU 4장·GDS에서 **NVMe 읽기 26.4GB/s**, vLLM 기동 Llama-2-13B(L40S×4) **12.39초 → 4.74초** | 4.8~7.5× / 26.4GB/s | arXiv 2505.23072 (2025-05) https://arxiv.org/html/2505.23072v1 ; 패키지 페이지 https://simple-repository.app.cern.ch/project/fastsafetensors | 🟡 (26.4GB/s·12.39→4.74초는 논문 본문 대조 못함) |
| IR-A05 | **ServerlessLLM**(OSDI'24): 로딩 최적화 체크포인트 포맷 + 다계층 로딩으로 "GPU 서버 스토리지 계층의 대역을 최대 활용". 체크포인트 로딩 Safetensors·PyTorch 대비 **3.6~8.2배**, 종단 지연 **10~200배** 감소(KServe·Ray Serve 대비). 2차 요약: 대형 LLM 기동을 "1분 이상 → 10초 미만", NVMe RAID 대역 포화 | 3.6~8.2× | USENIX OSDI'24 https://usenix.org/conference/osdi24/presentation/fu ; arXiv 2401.14351 | 🟡 |
| IR-A06 | 선행 연구 인용 기준선: **LLaMA-2-70B 콜드 스타트 84초(GPU 8장)**. 같은 논문의 하드웨어 추정: PCIe 5.0 8-GPU 서버에서 메모리→GPU 512GB/s, **NVMe SSD→메모리 약 60GB/s** | 84s / 60GB/s(서버) | arXiv 2411.15664 (2024-11) https://arxiv.org/html/2411.15664v1 | 🟡 |
| IR-A07 | LMSYS(SGLang) 블로그: 콜드 스타트에서 **가중치 로딩이 가장 오래 걸리는 단계**, DeepSeek-R1을 로컬 디스크에서 올리는 데 통상 **수 분** | 수 분 | LMSYS 2025-12-10 https://www.lmsys.org/blog/2025-12-10-rfork | 🟡 |
| IR-A08 | **멀티모델 스왑**: Prism(2025) — 단순 재활성화는 **수십 초**로 온라인 추론 TTFT SLO를 크게 초과. vLLM Sleep Mode — 콜드 스타트 대비 **61~88% 빠름**(재로딩 회피). Snowflake Semi-Persistence — CPU 메모리 풀에 가중치 상주로 sleep/wake 주기 **5.6~19.9배** 단축, 단일 GPU 모델 1초 미만 스왑. C2CServe(2026 프리프린트) — MoE 전환 수십 초 → **약 318ms** | 수십 s → 서브초 | Prism arXiv 2505.04021 https://arxiv.org/pdf/2505.04021 ; vLLM 2025-10-26 https://vllm.ai/blog/2025-10-26-sleep-mode ; Snowflake https://www.snowflake.com/en/blog/engineering/semi-persistence-gpu-model-swapping/ ; C2CServe arXiv 2605.19481 https://arxiv.org/pdf/2605.19481 | 🟡 |
| IR-A09 | WEKA: Run:ai 스트리머 + WEKA로 Llama-3-8B **3.5초**, "로컬 NVMe보다 약 40% 빠름"(16 스레드) | 3.5s | WEKA https://www.weka.io/article/model-loading-that-is-faster-than-local-node-nvme-with-nvidia-runai | 🟡 (벤더) |
| IR-A10 | **⚠️ 파생 (가중치 크기)**: 파라미터 × 바이트 — Llama 3.1 70B BF16 ≈ **140GB**, 405B BF16 ≈ **810GB**, DeepSeek-V3 671B FP8 ≈ **671GB**(가중치만, 메타데이터 제외) | 140 / 810 / 671 GB | 파라미터 수(DT-30 sku_list·config) × 2B(BF16)/1B(FP8) | ⚠️ |
| IR-A11 | **⚠️ 파생 (단일 드라이브 순차 읽기 상한 기준 로딩 시간)**: 405B BF16 810GB ÷ PM1763 28.4GB/s ≈ **28.5초**, ÷ PM1753 14.5GB/s ≈ **55.9초**, ÷ PM9A3급 6.9GB/s ≈ **117초**. 70B 140GB ÷ 14.5GB/s ≈ 9.7초. 실제는 파일 포맷·역직렬화·PCIe 경로가 지배(IR-A01·IR-A04) | 28.5 / 55.9 / 117 s | IR-A10 ÷ IR-B 사양(IR-B10·IR-B12·IR-B03) | ⚠️ |

**A-1 소결(사실만)**: 공개 근거는 "로딩 시간 = 스토리지 순차 읽기 대역 + 로더 SW 효율"이며, 소비자 측은 SW(스트리머·GDS·sleep mode)로 먼저 대응한다. 모델 로딩 전용 SSD 요구 사양(GB/s/GPU)을 공표한 NVIDIA·하이퍼스케일러 문서는 찾지 못했다(§E G-01).

### A-2. RAG·벡터 DB (DiskANN·SPANN·Milvus·AiSAQ)

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-A20 | **DiskANN**(NeurIPS'19, Microsoft): **10억 점(SIFT1B)**을 **64GB RAM + 저가 SSD** 단일 워크스테이션에서, 16코어 기준 **5,000+ QPS·평균 지연 3ms 미만·1-recall@1 95%+**. 같은 메모리의 FAISS·IVFOADC+G+P는 recall 약 50%에서 정체. 고recall 구간에서 HNSW·NSG 대비 노드당 5~10배 더 많은 점 | 5,000 QPS / <3ms 평균 / 95% | NeurIPS 2019 https://papers.nips.cc/paper/2019/hash/09853c7fb1d3f8ee67a61b6bf4a7f8e6-Abstract.html ; Microsoft Research https://www.microsoft.com/en-us/research/publication/diskann/ | 🟡 (초록 기준) |
| IR-A21 | **SPANN**(NeurIPS'21, Microsoft): 메모리-디스크 하이브리드 역색인(중심점만 메모리, 포스팅 리스트는 디스크). **메모리 32GB로 recall@1·@10 90%를 약 1ms**, 같은 메모리에서 DiskANN 대비 **2배 빠름** | 90% @ ~1ms | arXiv 2111.08566 https://arxiv.org/abs/2111.08566 ; NeurIPS 2021 https://neurips.cc/virtual/2021/poster/28619 | 🟡 |
| IR-A22 | DiskANN 계열 빔 탐색: 매 라운드 방문 노드를 libaio로 일괄 제출하고 배치 전체 완료까지 대기(단일 쿼리 지연 격차의 주원인 서술). 빔폭 **W=4에서 성능 정점** | W=4 | arXiv 2602.22805 "Optimizing SSD-Resident Graph Indexing for High-Throughput Vector Search" https://arxiv.org/pdf/2602.22805 | 🟡 |
| IR-A23 | **쿼리 지연 중 I/O 비중**: 한 발표는 **약 70~90%**, 다른 논문은 디스크 탐색이 **총 쿼리 시간의 70% 이상** | 70~90% | FMS 2025 AIML-101 Saxena·Mishra https://files.futurememorystorage.com/proceedings/2025/20250805_AIML-101-1_Saxena_Mishra_fnl.pdf ; arXiv 2602.22805(위) | 🟡 (수치↔출처 대응은 검색 요약상 모호) |
| IR-A24 | 사이징 예(벤더 블로그): 10억 벡터·128차원 float32 → **NVMe SSD 750GB~1TB + PQ 캐시용 RAM 64~128GB**, 8~16코어면 충분(CPU 병목 아님) | 0.75~1TB SSD | Couchbase 블로그 https://www.couchbase.com/blog/diskann/ | 🟡 (벤더 해설) |
| IR-A25 | **Kioxia AiSAQ**: 압축 벡터까지 SSD로 옮겨 쿼리 중 DRAM 약 **10MB**(10억 규모), DiskANN 대비 지연 소폭 증가(밀리초 단위). 2026-03-16: **단일 서버 48억 벡터**(1024차원), 단일 쿼리 서버 Milvus 환경에서 "RAG 지연 요구 충족"(수치 미공개), cuVS로 인덱스 빌드 7.8배 가속 | 48억 벡터 / DRAM ~10MB | arXiv 2404.06004 https://arxiv.org/html/2404.06004v2 ; Kioxia PR 2026-03-16 https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-2.html ; NAND Research https://nand-research.com/research-note-kioxias-open-source-aisaq-ann-search/ | 🟡 |
| IR-A26 | GateANN 논문: **삼성 PM9A3(Gen4) vs 9100 PRO(Gen5)**에서 DiskANN이 **단일 스레드 1.53배**, **32 스레드 1.06배** 가속 — 동시성이 높으면 디바이스 세대 차이가 줄어듦 | 1.53× / 1.06× | arXiv 2603.21466 https://arxiv.org/pdf/2603.21466 | 🟡 |
| IR-A27 | Solidigm·Metrum: 100만·1,000만·1억 벡터에서 HNSW(메모리) vs DiskANN(Solidigm SSD) — 저동시성·소규모는 HNSW 우세, **동시성이 오를수록 DiskANN 우세**, DRAM 비용 절감 주장(수치 미공개) | 정성 | Tech Field Day https://techfieldday.com/video/storage-becomes-ai-memory-for-rag-and-kv-cache-with-solidigm/ ; SNIA SDC25 Stryker https://www.snia.org/sites/default/files/2025-09/SNIA-SDC25-Stryker-Data-Intensive-Inference-Done.pdf | 🟡 |
| IR-A28 | (레포) RAG·벡터 검색 = 소블록 랜덤 읽기 수요: TrendForce "에이전트형 AI가 RAG 벡터 DB에 빈번히·고도로 랜덤 접근 → 고IOPS eSSD 수요"(GW-07), Kioxia GP 시리즈 "RAG 서버 적합"(GW-07), SwarmIO 벡터 검색 SSD IOPS 2.5 → 40 MIOPS로 **최대 9.7배**(GW-05), Google Z4D 로컬 SSD **최대 84TiB**를 SQL·NoSQL·**벡터 DB**용으로 제시(DT-15 ✅), cuVS는 DiskANN **검색을 아직 CPU에 맡김**(GW-09 ✅) | — | GD 원장 GW-05·GW-07·GW-09 ; DT 원장 DT-15 | 🟡/✅ (레포) |

**A-2 소결(사실만)**: RAG 저장 계층의 공개 수치는 "평균 지연 1~3ms·수천 QPS·recall 90~95%"(IR-A20·A21)이고, 지연의 70~90%가 SSD I/O(IR-A23)다. **쿼리당 I/O 횟수와 p99 지연을 SSD 요구치로 공표한 자료는 찾지 못했다**(§E G-02).

### A-3. KV 캐시 오프로드 (Dynamo KVBM·LMCache·Mooncake·vLLM·NVIDIA ICMS/CMX·WEKA)

#### A-3-1. 읽기 대역·재계산 손익분기·TTFT

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-A30 | ⭐ **py-kvcache**(vLLM + NVMe 외부 KV 캐시 특성화): 손익분기 대역 = KV 바이트 ÷ (캐시 적중 오버헤드를 뺀 시간 예산). Llama 3.2 3B(토큰당 114,688B)에서 **1K 토큰 23.2GB/s → 8K 10.4GB/s → 80K 3.5GB/s**. **약 8K 토큰 미만에서는 측정한 어떤 스토리지도 GPU prefill보다 빨리 KV를 로드하지 못함**. 50 동시 요청 디스크 전용 경로에서 LMCache 디스크 백엔드 대비 TTFT 1.5배(프리로드 시 2.0~2.5배) | 23.2 → 3.5 GB/s | arXiv 2609.11744 (2026-09) https://arxiv.org/pdf/2609.11744 | 🟡 (소형 모델 1종·단일 노드) |
| IR-A31 | **⚠️ 파생 (70B급 장문맥 복원 대역)**: 128K 토큰 KV 42.95GB(DT-31)를 MLPerf 대화형 TTFT 예산 450ms(IR-A37) 안에 읽으려면 **약 95GB/s**, 1초면 **약 43GB/s**, 6초(405B 예산)면 약 7.2GB/s. 8-GPU 텐서병렬로 나누면 1초 기준 **GPU당 약 5.4GB/s** | 95 / 43 / 7.2 GB/s | DT-31 ÷ IR-A37 TTFT 예산 | ⚠️ (prefill 연산·네트워크 중첩 무시) |
| IR-A32 | WEKA Augmented Memory Grid: 입력 **105K 토큰**에서 TTFT prefill **23.97초 → 0.58초(41배)**(다른 WEKA 글은 41배를 128K로 표기). 제품 페이지: "최대 41배, DRAM 용량 초과 후 최대 6배", OCI 공동 시험 20배(고객 인용) | 41× | WEKA https://www.weka.io/article/unlocking-scalable-inference-with-weka-augmented-memory-grid ; https://www.weka.io/product/augmented-memory-grid/ | 🟡 (벤더) |
| IR-A33 | **NVIDIA Inference Context Memory Storage Platform**(CES 2026, 이후 CMX로 개칭): BlueField-4 기반, "전통 스토리지 대비 토큰/초 **최대 5배**, 전력 효율 **최대 5배**", KV 배치 하드웨어 가속 | 5× / 5× | NVIDIA PR 2026-01-05 https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-BlueField-4-Powers-New-Class-of-AI-Native-Storage-Infrastructure-for-the-Next-Frontier-of-AI/default.aspx | 🟡 (벤더, 기준선 모호) |
| IR-A34 | **Tutti**(GPU 중심 SSD 백엔드 KV 캐시): SSD에서 KV 복원 시 **대량의 작은 랜덤 I/O**가 생겨 GDS를 써도 저병렬 CPU가 병목. GDS 기반 LMCache 대비 **엄격한 SLO 하 TTFT −78.3%**, 처리 요청률 **2배**, 비용 −27%, "NVMe 대역 포화·GPU 정지 거의 0", DRAM 기반 LMCache와 거의 동등 | TTFT −78.3% | arXiv 2605.03375 (2026-05) https://arxiv.org/pdf/2605.03375 ; 레포 GW-08 | 🟡 |
| IR-A35 | LMCache 논문: 기본 vLLM·CPU 오프로딩·상용 2종 대비 **TTFT 1.9~8.1배 감소, 처리량 2.3~14배**(H100). vLLM KV Offloading Connector(0.12.0): Llama-3.1-8B·H100 **TTFT 최대 4배↓·처리량 최대 5배↑**, "이득의 대부분은 TTFT보다 처리량" | 1.9~8.1× / 4× | arXiv 2510.09665 https://arxiv.org/pdf/2510.09665 ; vLLM 2026-01-08 https://vllm.ai/blog/2026-01-08-kv-offloading-connector | 🟡 |
| IR-A36 | **삼성 PM1753 KV 캐시 오프로딩 검증(H100)**: 동시 사용자 **1.7배**, TPS **1.5배**, 전체 시스템 전력 **−47%** | 1.7× / 1.5× / −47% | SK 원장 D-02 (머니투데이 2026-01-15) https://www.mt.co.kr/industry/2026/01/15/2026011515201765837 ; 백서 https://download.semiconductor.samsung.com/resources/white-paper/scaling_ai_inference_with_kv_cache_offloading.pdf (원문 미열람) | 🟡 (레포) |
| IR-A37 | ⭐ **추론 지연 예산(MLPerf Inference v5.0~)**: Llama 2 70B **Interactive p99 TTFT 450ms · TPOT 40ms**(사용자당 25 tok/s), Llama 3.1 405B **p99 TTFT 6초 · TPOT 175ms** | 450ms / 6s | HPCwire/AIwire 2025-04-02 https://www.hpcwire.com/aiwire/2025/04/02/mlperf-v5-0-reflects-the-shift-toward-reasoning-in-ai-inference/ ; MarkTechPost 2025-10-01 https://www.marktechpost.com/2025/10/01/mlperf-inference-v5-1-2025-results-explained-for-gpus-cpus-and-ai-accelerators/ | 🟡 |
| IR-A38 | (레포) **KV 오프로드 읽기·쓰기 대역 실측**: CHEOPS'25 블록 트레이스 **읽기 2.0GiB/s vs 쓰기 11MiB/s(186:1)**, 128KiB 요청 지배(WC X-01 ✅); DeepSeek 3FS KVCache **피크 읽기 40GiB/s**·평균 2~4GiB/s(CU-28 ✅); StorageReview Dell XE7740 **피크 쓰기 4.1GB/s vs 피크 읽기 1.1GB/s**, fio 측정 플래시 천장 약 114GB/s(CU-43 🟡·이번 검색 보강); AWS HyperPod Curvine 노드 로컬 NVMe **쓰기 9.6GB/s**, 교차 노드 L2 읽기 지연 약 56ms, TTFT 최대 2.7배(CU-26 🟡); WD B200×8 호스트 **축출 쓰기 0.7GB/s 상시**(CU-40 🟡); BlueField-4 스토리지 대역 최대 200GB/s(v7 V-52 🟡) | 2.0GiB/s ~ 40GiB/s 읽기 | WC·CU 원장 해당 ID | ✅/🟡 (레포) |
| IR-A39 | (레포) **KV 캐시 효과(TTFT)**: Google Managed Lustre 외부 KV 캐시 TTFT **−40% 이상**·TCO −35%(CU-25 ✅), SGLang HiCache 코딩 에이전트 적중률 40→80%·TTFT **−56%**(v7 W-30 🟡), Pliops TTFT **5배**(KQ §2 🟡), GKE Inference Gateway TTFT −70%+(DT-34 ✅) | — | CU·KQ·DT 원장 | ✅/🟡 (레포) |

#### A-3-2. 테일 지연(p99)·지터 근거

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-A40 | 장수명 세션 KV 배치 연구: SLO를 각 워크로드의 **HBM 전용 기준 p99 TTFT**로 두고 SSD 계층 깊이를 늘림 → **GPU당 세션 수 10.77배**(모든 워크로드). 질문 자체가 "테일 지연이 허용 불가가 되기 전 SSD 계층을 얼마나 깊게 쓸 수 있나" | p99 TTFT SLO 하 10.77× | arXiv 2609.16215 "Where Should the KV Cache Live?" (2026-09) https://arxiv.org/pdf/2609.16215 | 🟡 |
| IR-A41 | Tutti: SSD 백엔드 KV 캐시는 **I/O 지터·큐잉 지연이 TTFT를 부풀린다**고 문제 정의(IR-A34의 동기) | 정성 | arXiv 2605.03375 | 🟡 |
| IR-A42 | Momento(2026-06 요약): Qwen3-4B·L4에서 동시성이 캐시 용량을 넘자 TTFT **약 2.6초 → 39초**로 급등, "평균으로 판단하지 말 것" | 2.6s → 39s | plushcap 요약 https://www.plushcap.com/companies/momento/blog/summaries/2026/6 | ⚠️ (2차 요약 단일) |
| IR-A43 | MinIO: 오프로드는 실패 모드를 "축출 후 재계산"에서 "유출 후 회수(spill then recall)"로 바꾸며 비용은 대역·큐잉·배치로 나타나고 **테일 지연 SLA 위반**으로 끝나는 열화 사슬 서술 | 정성 | MinIO 블로그 https://www.min.io/blog/supercharging-inference-for-ai-factories-kv-cache-offload-as-a-memory-hierarchy-problem | 🟡 (벤더 해설) |
| IR-A44 | (레포) **Anthropic Managed Agents**: 세션·하네스·샌드박스 분리 후 **p50 TTFT 약 −60%, p95 −90% 이상**(스토리지 아닌 아키텍처 분리 효과) | p95 −90% | DT-51 https://www.anthropic.com/engineering/managed-agents | ✅ (레포) |
| IR-A45 | ⭐ **NVIDIA Storage-Next 목표 = "전력·꼬리 지연(tail latency) 제약 아래 GPU당 512B IOPS 최대화"**(GD-03 🟡). Kioxia SNIA SDC AI 2026 슬라이드: **512B 세립 I/O, GPU당 약 2억 IOPS**. Micron FMS 2025: 9650 20개·H100로 **8,600만 IOPS** 예비 측정, 튜닝 후 1억+ 기대 | ~200M IOPS/GPU | GD-03 ; SNIA SDCAI26 Bolt https://www.snia.org/sites/default/files/2026-04/SNIA-SDCAI26-Bolt-AI-Impact-On-Storage_0.pdf ; FMS 2025 AIML-302 Meredith https://files.futurememorystorage.com/proceedings/2025/20250807_AIML-302-1_Meredith-2025-08-04-19.11.56.pdf | 🟡 |
| IR-A46 | **삼성 PM1763 SCADA 백서 해설(StorageReview)**: 집계 성능을 좌우한 것은 피크 IOPS가 아니라 **드라이브별 지연 균일성(latency uniformity)**. GPU당 SSD 14개로 거의 선형 확장, 42개 합산 2.81억 IOPS. **지연 수치는 미공개** | 정성 | StorageReview https://www.storagereview.com/news/samsung-pm1763-pcie-gen6-ssd-enters-mass-production-with-28-4-gb-s-reads ; GD-20·GD-21 | 🟡 |
| IR-A47 | (레포) 리틀의 법칙 산술: GPU당 2억 IOPS × TLC 100µs = **동시 미결 I/O 20,000개**; 1억 × 20µs = 2,000 | 20,000 | SR 원장 SR-73 | ⚠️ (레포 파생) |
| IR-A48 | (레포) 저지연 KV 계층 제품의 지연 표기: Huawei OceanStor M900 **접근 지연 60µs**(UD-12 🟡), DapuStor X5 SCM **20/5µs**·"KV 캐시 오프로딩·TTFT 단축"(WC H-14 🟡), Z-NAND SZ985 지속 랜덤 읽기 **12~20µs**(SR-55 🟡), XL-FLASH tR **5µs 미만** vs 3D TLC 40~100µs(GR-01·GR-02 🟡) | µs | UD·WC·SR·GD 원장 | 🟡 (레포) |

#### A-3-3. 쓰기·내구성(DWPD) 근거 (상세는 §D)

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-A50 | (레포) StorageReview 실측: KV 쓰기 1.9GB/s 상시 → 12.8TB×8(RAID10) 드라이브당 **약 3.2 DWPD**(정격 3 초과), RAID0이면 약 1.6. "플래시 티어의 결정적 제약은 용량·속도가 아니라 **내구성**" | 3.2 DWPD | WC D-03 ; CU-43 | 🟡 (레포) |
| IR-A51 | (레포) KV 쓰기 억제 장치: Dynamo KVBM 디스크 오프로드 필터 기본 활성 "**SSD 수명 보호**", 빈도 ≥2 블록만(X-04 ✅·X-05 🟡), 신규 kvbm-engine LFU 임계 기본 **8**(X-06 ✅). KVBM은 Dynamo v1.5.0에서 deprecate(X-07 ✅) | 빈도 ≥2 / LFU 8 | WC X-04~X-07 | ✅ (레포) |
| IR-A52 | (레포) 프로덕션 KV 수명: Alibaba Bailian KV 블록의 90%가 to-C 612초·to-B **0.3초** 후 재사용 없음, 적중률 54~62%(CU-24 🟡); DeepSeek 온디스크 KV 적중 56.3%, 읽기:쓰기(토큰) **1.29:1**(CU-20 ✅·CU-34 ⚠️) | 0.3s~612s | CU 원장 | 🟡/⚠️ (레포) |
| IR-A53 | (레포) 삼성 PM9D3a에서 LMCache KV 트레이스 FDP: **WAF 2.600 → 1.425(−45.2%)**, 쓰기 지연 평균 −55.6%·p90 −29.4%, 읽기 지연 평균 −35.7%·**p90 −22.0%** (사용률 89%, 960GiB의 4배 쓰기) | WAF −45.2% / 읽기 p90 −22% | SK A-20 (LMCache 블로그 2026-09-22) https://blog.lmcache.ai/en/2026/09/22/raw-block-in-lmcache-building-a-fast-recoverable-nvme-tier-for-kv-cache/ | 🟡 (원문 미열람) |

### A-4. 에이전트 메모리·장문맥·세션 로그

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-A60 | (레포) Copilot 코딩 에이전트 프로덕션 트레이스(30만 세션): LLM 호출당 입력 **67,818 토큰**(Azure 대화 1,632의 약 42배), 세션당 약 210만 토큰, **입력 중 캐시 재사용 85.7%** | 67,818 tok / 85.7% | DT-41·DT-42·DT-43 | ✅ 원데이터 + ⚠️ 파생 (레포) |
| IR-A61 | (레포) 70B급 KV 환산: 에이전트 호출 평균 → **22.2GB**, 세션 최대 컨텍스트 p99 → 90.4GB, 1M 컨텍스트 → 327.7GB(모델 구조에 따라 0.89~516GB) | 22.2GB | DT-31·DT-45 | ⚠️ (레포) |
| IR-A62 | (레포) Anthropic: 에이전트는 채팅 대비 토큰 **약 4배**, 멀티 에이전트 **약 15배**; 세션 = "append-only log", 장애 후 마지막 이벤트부터 재개 | 4× / 15× | DT-40·DT-51 | ✅ (레포) |
| IR-A63 | (레포) Micron: 에이전트 워크로드는 표준 추론 대비 **용량 10~40배**, 수 시간~수 일 지속 | 10~40× | INF B-21 (DT 원장 재인용) | ✅/🟡 (레포) |
| IR-A64 | (레포) LMCache-on-NVMe 장시간 에이전트 프로필: **읽기 약 92%/쓰기 약 8%**, 프로세스당 약 78% 순차, KV 블록 파일 약 33MB(삼성 PM1753 특성화 인용) | 92/8 | WC X-03 | ⚠️ (2차 인용, 레포) |
| IR-A65 | (레포) Kimi 툴·에이전트 트레이스: 적중 57.1%, 신규 블록 44.7%, **쓰기:읽기 0.75:1** | 0.75:1 | CU-36 | ⚠️ (레포) |
| IR-A66 | (레포) 에이전트 상태 저장: Google Agent Substrate 유휴 에이전트 상태를 로컬 디스크·Cloud Storage에 스냅샷, **500ms 미만 재개, 초당 500회+ suspend/resume, 호스트당 1,000개+**(DT-54 ✅); Muse 사용자 VM 영속 100GB·순차 쓰기 177MB/s·읽기 644MB/s(AV-02·AV-04 ✅/🟡); AgentCore 세션 스토리지 세션당 1GB·14일(AV-24 🟡) | <500ms / 100GB | DT·AV 원장 | ✅/🟡 (레포) |
| IR-A67 | (이번 수집) 삼성 OCP Global Summit 2026 예정 세션(10-13): "**Tiering the Agent's Memory: From CXL Pooling to SSD-Backed KV Cache Offloading**"(KV 캐시 확장용 SSD 오프로딩 전략) — 레포 SK D-08(머니투데이 2026-09-28 보도)과 정합 | 예정 | LinkedIn 게시(삼성 엔지니어) https://kr.linkedin.com/in/jonghoon-kang-830790197 ; SK D-08 https://www.mt.co.kr/industry/2026/09/28/2026092815580639077 | 🟡/⚠️ (SNS 단일 + 보도) |

### A-5. 체크포인트·상태 스냅샷 (추론 측만)

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-A70 | (레포) Firecracker full snapshot = **게스트 메모리 전체 기록**, diff snapshot = dirty 페이지만(developer preview) | 1회 = RAM 전체 | AV-10·AV-11 | ✅ (레포) |
| IR-A71 | (레포) E2B pause **RAM 1GB당 약 4초**, resume 약 1초, 최대 30일 보관; Fly.io suspend는 메모리 ≤2GB 권장(매회 전체 메모리 기록) | 4 s/GB | AV-13·AV-16 | 🟡 (레포) |
| IR-A72 | (레포) GKE Pod snapshots: 실행 상태를 high-throughput Cloud Storage에 영속, 기동 −89%(IR-A03과 동일 출처) | −89% | DT-36·AV-20 | ✅ (레포) |
| IR-A73 | (대조, 학습) DGX SuperPOD 스토리지 가이드 GPU당 읽기 0.16~0.49·쓰기 0.08~0.24GB/s, "체크포인트를 다 쓸 때까지 학습이 멈춤" — 추론 체크포인트와 별개 | GB/s/GPU | DT-23·DT-24 | 🟡/⚠️ (레포) |

---

## §B. 삼성 데이터센터 SSD 라인업 2019~2026 (모델별 사양)

**주의**: 공식 페이지 직접 열람 실패 → 검색 엔진이 인용한 공식 페이지 스니펫·매체·리셀러 기준(🟡). 사양 판(revision) 간 수치 차이가 있어 "공식 현행 / 발표 당시"를 병기했다. 삼성 "자체 포지셔닝"은 삼성 보도자료·기술 블로그 문구 기준.

### B-1. 모델별 사양 표

| ID | 모델 (상태·일자) | NAND | 인터페이스 | 폼팩터 | 최대 용량 | 순차 읽기/쓰기 (GB/s) | 랜덤 읽기/쓰기 (IOPS, 4K) | DWPD (5년) | 지연·전력 | 삼성 포지셔닝·추론 관련 사실 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| IR-B01 | **PM1733** (2019-08 발표, 양산) / **PM1735**(MU) | TLC (V-NAND, 세대 미확인) | PCIe 4.0 x4 (PM1735 HHHL는 x8) | U.2 (PM1735: U.2·HHHL) | 30.72TB (PM1735 12.8TB) | 7.0 / – (PM1735 8.0/3.8, 리셀러) | 1.5M / – (PM1735 1.5M/250K, 리셀러) | **1** (PM1735 **3**) | Read typical 15~20W(용량별) | Fail-in-Place: 30.72TB 512다이 중 1개 고장에도 동작. **Mooncake 공식 SSD 오프로드 벤치 장비**(PM1733 3.84TB×3 + PM983, SK B-01 ✅) | GR(성장)-09·GR-27·ER(PM1733/1735) ; HC C4 ; WQ-40 ; 리셀러 https://www.serverschmiede.com/en/3200gb-32tb-samsung-pm1735-datacenter-enterprise-24-7-pcie-nvme-8000-mb-s-15-mio-iops-new | 🟡 (레포 ✅ 일부) |
| IR-B02 | **PM9A3** (2020 OCP 공개 → 2021 양산) | TLC (V6) | PCIe 4.0 x4 | **E1.S·U.2·M.2**(StorageReview 표는 U.3·E1.L 추가) | 7.68TB(발표) → **15.36TB** | 6.5 → **6.9** / 4.1 | 0.9M → **1.1M** / 약 0.2M | **1** (1.3 표기와 충돌) | 순차 쓰기 283MB/s/W | 하이퍼스케일·OCP 지향(E1.S "ruler"). 범용 TLC read-intensive 1 DWPD 기준값으로 레포 다수 인용. GateANN 벡터 검색 시험 장비(IR-A26) | StorageReview https://www.storagereview.com/review/samsung-pm9a3-ssd-review ; https://www.storagereview.com/news/samsung-pm9a3-e1-s-ssd-announced ; ER ; PC(냉각)-53 | 🟡 |
| IR-B03 | **PM1743** (2021-12-22 발표, 2022 양산) / **PM1745**(MU) | TLC (V6) | PCIe 5.0 x4 | U.2·**E3.S** | 15.36TB | 13.0 → 14.0(2024 백서) / 6.6 | 2.5M / 250K (E3.S 15.36TB 리스팅 쓰기 360K) | **1** (PM1745 **3**) | 7.68TB 23W, 608MB/s/W(삼성, 전세대 대비 +30%) | FMS 2023: "생성형 AI 서버용 전력 효율 SSD" | BusinessWire 2021-12-22 https://www.businesswire.com/news/home/20211222005474/en/ ; TweakTown 리뷰 https://www.tweaktown.com/reviews/10954/samsung-pm1743-e3-15-36tb-enterprise-ssd-high-capacity-standard-bearer/index.html ; GR-11·GR-29 ; 삼성 FMS 2023 https://news.samsungsemiconductor.com/global/samsung-announces-innovations-to-enhance-memory-customer-experience-in-data-centric-era-at-fms-2023/ | 🟡 |
| IR-B04 | **PM9D3a** (2023 양산) | TLC (세대 미확인) | PCIe 5.0 x4 (8채널) | **U.2·E1.S·E3.S** | **30.72TB** (0.96~30.72) | **12.0 / 6.8** (구 보도 6.2) | **2.0M / 400K** (E3.S 1.92TB 1.7M; 3.84TB 쓰기 250K) | **1** (30.72TB 0.9; 3.84TB = 7,008TBW) | — | 데이터센터(하이퍼스케일) 지향, OCP 정합. **FDP 실측 장비**: RocksDB p99.9 −55%(IR-C10), LMCache KV WAF 2.600→1.425(IR-A53). FDP 통합 발표 기준선 "PM9D3에 최대 50% 호스트 OP"(WQ-46) | 삼성 공식(검색 스니펫) https://semiconductor.samsung.com/us/ssd/datacenter-ssd/pm9d3a ; 기술 블로그 https://semiconductor.samsung.com/news-events/tech-blog/samsung-pm9d3a-solid-state-drive/ ; Lenovo LP2001 https://lenovopress.lenovo.com/lp2001-thinksystem-pm9d3a-read-intensive-nvme-pcie-50-x4-ssd ; 리셀러 https://www.scan.co.uk/products/768tb-samsung-pm9d3a-nvme-ssd-u2-15mm-pcie-50-x4-12000mb-s-read-6800mb-s-write-2000k-400k-iops | 🟡 |
| IR-B05 | **BM1743** (61.44TB 2024-07 출시; 122.88TB FMS 2024 전시·이후 U.2 리스팅) | **QLC (V7, 176단)** | U.2 = PCIe 4.0 / E3.S = **PCIe 5.0** | U.2·E3.S | **122.88TB** | 61TB U.2: **7.2 / 2.0**; 122TB 시연: **7.5 / 3.0~3.5** | **1.6M** / 110K(4K) · **45K(16KB, IU 16KB는 매체 추정)** | **0.26** (전작 BM1733 0.18) | 유휴 5W(후속 2W 목표), 읽기/쓰기 23.1/24.4W; **보존 3개월**(1개월 서술과 충돌) | read-intensive 대용량. KV 캐시 티어 포지셔닝 공개 없음 | Blocks&Files 2024-07-02 https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/ ; AnandTech 21526 https://at-web1.www.anandtech.com/show/21526/samsungs-128-tbclass-bm1743-enterprise-ssd-displayed-at-fms-2024 ; PCGamesN https://www.pcgamesn.com/samsung/122tb-bm1743-ssd ; TechRadar(보존 1개월) https://www.techradar.com/pro/samsung-shows-inside-of-its-128tb-ssd-in-all-its-glory-but-with-a-weird-caveat-qlc-based-bm1743-won-t-go-on-sale-anytime-soon-and-has-a-very-short-but-strange-1-month-retention ; WQ-09 ; PC(냉각)-50 | 🟡 |
| IR-B10 | **PM1753** (FMS 2024-08 발표) / **PM1755**(MU) | TLC (**V9 16채널**은 리셀러 서술, 삼성 원문 미확인) | PCIe 5.0 x4 | **2.5"(U.2)·E1.S·E3.S** | **30.72TB** (1.92~30.72; FMS 보도 "최대 32TB") | 공식 현행 **14.5 / 10.0** (FMS 14.8) | 공식 현행 **3.3M / 650K** (FMS·SamMobile 3.4M/600K) | **1** (PM1755 **3**) | HPE OEM 15.36TB E3.S 평균 21.34W | **NVIDIA Vera Rubin CMX에 공급**("추론 성능·전력 효율 개선"); KV 캐시 오프로딩 백서(H100: 동시 사용자 1.7배·TPS 1.5배·전력 −47%, IR-A36); GTC 2026 BlueField-4 **STX 레퍼런스 아키텍처** 일부로 소개(SK E-03); aisio 시험대 PM1753 32TB×16(GD-23 ✅); 삼성 블로그 "KV 오프로딩은 주로 읽기 집약·버스티"(X-02) | 삼성 공식(검색 스니펫) https://semiconductor.samsung.com/ssd/enterprise-ssd/pm1753/ ; SamMobile https://www.sammobile.com/news/samsung-122-88tb-ssd-enterprise-announced/ ; 리셀러 https://www.serversupply.com/SSD/PCI-E5.0/3.84TB/SAMSUNG/MZWL93T8HFLT_404757.htm ; Saitech https://esaitech.com/blogs/insights/samsung-pm1753-ssd-ai-and-data-center-storage ; KQ §2.1 ; SK E-03 ; GR-13·GR-30 | 🟡 |
| IR-B12 | **PM1763** (2025-08 FMS 공개·Best of Show → GTC 2026 시연 → **2026-07-08 양산**) | **TLC (V9)** + **4nm 자체 컨트롤러** | **PCIe 6.0 x4**, NVMe 2.1, OCP 2.6 (U.2는 PCIe 5.0만) | **E1.S·E3.S**(Gen6), U.2/2.5"(Gen5) | 양산 발표 4/8/16TB급 → 제품 페이지 **3.84~61.44TB**("4~64TB") — 충돌 | **28.4 / 21.9**(양산 발표; GTC 보도·일부 페이지 21.0) | **6.8M / 950K** (6.8M은 16TB급) | **1** (5년, 제품 리스팅) | 전력 효율 PM1753 대비 **1.8배 이상**(60% 서술 충돌); **D2C 액체냉각 최적화** | "차세대 AI 인프라 최적화", "차세대 AI 플랫폼 검증 완료"(Vera Rubin 명시는 매체 해석). **SCADA 백서: GPU 발행 512B 랜덤 읽기 드라이브당 약 6.92M IOPS**(PM1753 3.72M 대비 +86%), GPU당 SSD 14개, 42개 합산 2.81억 IOPS(GD-20 🟡) | 삼성 공식(검색 스니펫) https://semiconductor.samsung.com/ssd/enterprise-ssd/pm1763/ ; 엔터프라이즈 목록 https://semiconductor.samsung.com/ssd/enterprise-ssd/ ; StorageReview https://www.storagereview.com/news/samsung-pm1763-pcie-gen6-ssd-enters-mass-production-with-28-4-gb-s-reads ; igor'sLAB https://www.igorslab.de/en/samsung-pm1763-enters-mass-production-pcie-6-0-ssd-up-to-284-gb-s-targets-ai-servers/ ; club386 https://www.club386.com/?p=149897 ; PC(냉각)-18·PC-19 ; GD-20~GD-22 | 🟡 |
| IR-B13 | **BM1773** (FMS 2026-08 전시; Electronics Journal "launches") | **QLC (V9, 2Tb 다이)** | PCIe 5.0 (16채널) | **E3.S** | **245.76TB** | 순차 쓰기 4.5 (읽기 미확보) | 랜덤 쓰기 50K (블록 크기 미확인) | **0.6** (근거 워크로드 미공개; >260PBW 보도) | — | 고밀도 AI 데이터센터; Die Failure Recovery. 삼성 "256TB 서버 SSD 라인업" 보유, V9 2Tb QLC 개발 완료(2026-03) | V8 P-08 https://electronics-journal.com/news/114908-samsung-launches-245-76tb-bm1773-ssd-for-high-density-ai-data-centers ; v6 신뢰성 D8 ; KQ §2 | 🟡 (이번 검색으로 재확인 실패 — HC N5) |
| IR-B20 | **Z-SSD SZ985** (2018-01-29 800GB 출시) | **Z-NAND (SLC 계열, 1세대 48단, tR 3µs)** | PCIe 3.0 x4 | **HHHL** | 800GB (240GB) | 미공개(3.2GB/s 설은 미확인) | **750K / 170K** | **30** (800GB = 42PB) | 쓰기 지연 **16µs**(PM963 대비 1/5); 지속 랜덤 읽기 12~20µs(AnandTech) | "HPC 시스템·AI 응용용" | Samsung US Newsroom https://news.samsung.com/us/samsung-800-gigabyte-z-ssd-for-hpc-systems-and-ai-applications ; AnandTech 12376 https://www.anandtech.com/show/12376 ; WC H-09 ; SR-55 | 🟡 |
| IR-B21 | **SZ983 M.2 / 983 ZET** (2018) | Z-NAND | NVMe (M.2 / HHHL) | M.2 / HHHL | 983 ZET 960GB | — | — | SZ983 **30**; 983 ZET **10**(960GB)/**8.5** | — | — | WC H-10 | 🟡 (레포) |
| IR-B22 | **Z-NAND 부활(7세대 Z-NAND + GIDS)** — FMS 2025(2025-08) 발표, "2026 예정" | Z-NAND (2세대 다이는 SLC 128Gb 1~3µs / MLC 256Gb 5µs, UD-37) | GPU-Initiated Direct Storage(GIDS): GPU가 CPU·DRAM 우회해 직접 접근 | 미공개 | 미공개 | 목표: 기존 NAND 대비 **성능 최대 15배·전력 최대 −80%** | 미공개 | 미공개 | — | 삼성 FMS 2025 요약: "**Memory Class Storage(Z-NAND)** — 저지연·고성능 AI 추론 지원 신규 스토리지 계층". FMS 2026: zNAND-O 컨셉(양산 일정 없음); TrendForce "핵심 차세대 전략 제품이나 **상용화 과제 남음**" | 삼성 반도체 뉴스(FMS 2025) https://news.samsungsemiconductor.com/global/?p=2925 ; Tom's Hardware(WC H-11) ; DigiTimes https://www.digitimes.com/news/a20250808VL210.html ; TrendForce https://www.trendforce.com/news/?p=62052 | 🟡 (목표치·계획) |
| IR-B23 | (DC 인접) **PM9E1** (2024-10 양산, 클라이언트) | TLC (V8) + 5nm Presto 컨트롤러 | PCIe 5.0 x4 | M.2 2280·**2242** | 4TB | (레포 미수집) | — | — | — | "AI 응용 최적 PC SSD". **NVIDIA DGX Spark 4TB 모델 탑재**(분해 확인) — 데이터센터 제품 아님 | samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md §2 | 🟡 (레포) |

### B-2. 라인업 보조 사실

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| IR-B30 | ⚠️ **파생 (세대별 4K 랜덤 읽기·순차 읽기)**: PM1733 1.5M·7.0GB/s(2019) → PM1743 2.5M·13~14(2022) → PM1753 3.3M·14.5(2024) → PM1763 6.8M·28.4(2026). 2019→2026 랜덤 읽기 4.5배, 순차 4.1배. 순차는 인터페이스 한계(Gen4 약 7, Gen5 약 14, Gen6 약 28GB/s)에 붙어 있음 | IR-B01~B12 ; GR(성장) 1번 관찰 | ⚠️ |
| IR-B31 | **정격 DWPD 궤적**: 삼성 플래그십 TLC는 PM1733·PM1743·PM1753·PM1763 모두 **1 DWPD**(MU 변형 3 DWPD), QLC는 BM1733 0.18 → BM1743 0.26 → BM1773 0.6. **삼성의 2019~2026 TLC/QLC 라인업 중 ≥10 DWPD 제품은 없고**, ≥30 DWPD는 2018 Z-SSD(30)뿐 | ER ; GR(성장)-80~85 ; WC H-09·H-10 ; UD-10("2026년 고내구 SLC 계열 출시 제품 확인 못함") | 🟡 |
| IR-B32 | **FDP·RUH 수 미공개**: PM1753·PM1763의 FDP 지원·RUH 수는 양산 보도·백서 요약에 언급 없음(SK X-11). PM9D3a는 FDP 실측 공개물 존재(IR-A53·IR-C10) | SK X-11 ; KQ §5 #2 | 🟡 |
| IR-B33 | **CXL 메모리(SSD 아님, 참고)**: CMM-D를 CXL 2.0 스위치로 묶은 1TB 풀을 vLLM+LMCache KV 백엔드로 — GPU 8장에서 DRAM 대비 약 92%(SK D-03 🟡); CMM-H 시제품 캐시 히트 1µs 미만·미스 약 70µs, 2026 제품 일정 미확인(CX-02·CX-04 🟡) | SK·GD 원장 | 🟡 |
| IR-B34 | **삼성 KV 캐시 SW 기여**: LMCache에 삼성 연결 커밋 62건·Committer 1명, NVMe raw block(io_uring·패스스루)·**FDP 배치(2026-08-05 머지)**·Device-DAX·3FS 백엔드 | SK N-01·A-01·A-16 | ✅ (레포) |
| IR-B35 | heise 기사 제목(검색 결과): "Samsung plans to sell SSDs with **512 TByte** capacity from **2027**" — 본문 미확인 | https://heise.de/-10688575 | ⚠️ (제목만) |

### B-3. 덱용 삼성 모델 요약 (폼팩터·NAND·삼성 포지셔닝)

| 모델 | 상태 | 폼팩터 | NAND | 대응 추론 하위 워크로드(삼성 문구·공개 사례 기준) |
|---|---|---|---|---|
| PM1763 | 양산(2026-07) | E1.S·E3.S(Gen6), U.2(Gen5) | V9 TLC | AI 서버 메인 스토리지·GPU 주도 512B(SCADA 백서) — ①③·512B 경로 |
| PM1753 / PM1755 | 양산 | U.2·E1.S·E3.S | TLC(V9 리셀러 서술) | NVIDIA CMX 공급·KV 캐시 백서 — ③ |
| PM9D3a | 양산 | U.2·E1.S·E3.S | TLC | 하이퍼스케일 범용·FDP 실측(RocksDB·LMCache KV) — ③(FDP) |
| PM1743 / PM1745 | 양산(구세대) | U.2·E3.S | V6 TLC | 생성형 AI 서버(FMS 2023) |
| PM9A3 | 양산(구세대) | E1.S·U.2·M.2 | V6 TLC | 범용 하이퍼스케일 |
| PM1733 / PM1735 | 구세대 | U.2·HHHL | TLC | (Mooncake 벤치 장비) |
| BM1743 | 양산 | U.2(Gen4)·E3.S(Gen5) | V7 QLC | read-intensive 대용량 — ①(가중치 저장)·②(인덱스) 후보, KV 포지셔닝 없음 |
| BM1773 | FMS 2026 전시 | E3.S | V9 QLC 2Tb | 고밀도 AI DC |
| Z-SSD SZ985 | 단종(2018) | HHHL | Z-NAND(SLC) | HPC·AI(2018) |
| Z-NAND 7세대 + GIDS | 계획(목표치만) | 미공개 | Z-NAND | "저지연 AI 추론용 Memory Class Storage" |

---

## §C. GC → 테일 지연 메커니즘 근거

### C-1. 정의와 메커니즘

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-C01 | **WAF 정의**: NAND 총 기록량 ÷ 호스트 기록량. 호스트가 1 LBA를 쓰는 과정에서 GC가 1회 추가 기록하면 WA = 2. GC는 소거 전 블록의 유효 페이지를 다른 곳에 복사하므로 추가 쓰기가 생김 | 정의 | Wikipedia "Write amplification" https://en.wikipedia.org/wiki/Write_amplification ; TechTarget https://www.techtarget.com/searchstorage/definition/write-amplification-factor-WAF ; 특허 US 9652382 | 🟡 |
| IR-C02 | **⚠️ 파생 항등식**: NAND 기록 = 호스트 기록 + GC 재배치 기록 → **WAF − 1 = 호스트 쓰기 1단위당 GC 재배치 쓰기량**. (출처는 정의만 제시, 이 형태로 쓴 원문은 미발견) | WAF−1 | IR-C01 정의에서 직접 도출 | ⚠️ |
| IR-C03 | **⚠️ 파생 (공개 FDP 실측의 GC 재배치 감소율)**: LMCache KV(PM9D3a) WAF 2.600→1.425 ⇒ GC 재배치 1.600→0.425 **−73.4%**(IR-A53); RocksDB(PM9D3a) 2.95→2.02 ⇒ 1.95→1.02 **−47.7%**(TD WT-35); CacheLib(1.88TB FDP SSD, 사용률 100%) 3.22→1.03 ⇒ 2.22→0.03 **−98.6%**(KQ §3.2 ✅) | −47.7~−98.6% | IR-C02 × 각 출처 | ⚠️ (WAF 값은 🟡/✅) |
| IR-C04 | (레포) greedy GC WAF vs 채움률(시뮬레이터): 0.5 → 1.25, 0.7 → 1.87, 0.8 → 2.69, 0.9 → **5.17**; 해석식 OP 7% → 7.82, 28% → 2.48 | WAF | WQ-44·P-5 (SSD-iq) | ✅ (레포) |
| IR-C05 | **읽기가 P/E 뒤에 대기**: 페이지 프로그램·블록 소거 명령이 칩에 발행되면 후속 읽기는 완료까지 대기 → **읽기 지연 평균 2배** 증가; 해법으로 P/E suspend 제안 | 평균 2× | Wu·He, "Reducing SSD Read Latency via NAND Flash Program and Erase Suspension", USENIX FAST'12 https://www.usenix.org/event/fast12/tech/full_papers/Wu.pdf | 🟡 |
| IR-C06 | **소거가 지배적 테일 원인**: 블록 소거(약 **10ms/블록**)가 읽기 테일의 지배 원인이 됨; 발표 슬라이드상 GC 유발 지연 약 **10~100ms**. 안전 지점 소거 일시중단으로 시험 워크로드에서 **99.999p 읽기 테일 200µs 미만**. 임의 시점 suspend는 하드웨어 비용·수명 저하·쓰기 기아 유발 | 10ms / 10~100ms / <200µs | Kim 외, "Practical Erase Suspension for Modern Low-latency SSDs", USENIX ATC'19 https://www.usenix.org/conference/atc19/presentation/kim-shine | 🟡 |
| IR-C07 | (레포) 셀 동작 시간: 프로그램 TLC 0.8~2ms·**QLC 2~3ms**, 읽기 TLC 66~170µs·QLC 120~200µs — 프로그램이 읽기의 약 10배라 읽기가 프로그램 뒤에 막힘 | ms·µs | WQ-34 | 🟡 (레포) |
| IR-C08 | (레포) 3D NAND 층수↑ → 블록당 페이지↑("big block") → 소거 지연·GC 복사 비용·WAF↑ | 정성 | WQ-14 | 🟡 (레포) |

### C-2. GC·WAF 감소 → 테일 지연 감소 실측

| ID | 사실 | 값 | 출처 | 등급 |
|---|---|---|---|---|
| IR-C10 | ⭐ **삼성 PM9D3a 7.68TB FDP(RocksDB, XFS, YCSB 2억 레코드)**: 최적화 분류 시 **WAF −30%·OPS +10%·p99.9 테일 지연 −55%**(기본 분류 WAF −8%); 절대값 WAF 2.95 → 2.71 → 2.02 | p99.9 −55% | WQ-28·TD WT-35 (삼성 기술 블로그) https://semiconductor.samsung.com/news-events/tech-blog/optimizing-rocksdb-write-amplification-on-fdp-ssds/ | 🟡 (레포) |
| IR-C11 | (레포) **LMCache KV 트레이스(PM9D3a) FDP**: 읽기 지연 평균 −35.7%·**p90 −22.0%**, 쓰기 평균 −55.6%·p90 −29.4% | p90 −22% | SK A-20 = IR-A53 | 🟡 (레포) |
| IR-C12 | (레포) **TTFlash**(FAST'17): 기존 방식은 99~99.99p에서 **GC 유발 지연 5~138배**, ttFlash는 GC 없음 대비 1.0~2.6배 | 5~138× | WQ-32 https://www.usenix.org/conference/fast17/technical-sessions/presentation/yan | 🟡 (레포) |
| IR-C13 | (레포) **ZNS**(ATC'21): 블록 인터페이스 대비 RocksDB **99.9p 랜덤 읽기 지연 2~4배↓** | 2~4× | WQ-27 https://www.usenix.org/conference/atc21/presentation/bjorling | 🟡 (레포) |
| IR-C14 | (레포) **Valet**(SoCC'25 최우수 논문): 무수정 동적 배치 힌트로 쓰기 처리량 2~4배, **테일 지연 최대 6배↓** | 6× | WQ-30 https://arxiv.org/abs/2501.00977 | 🟡 (레포) |
| IR-C15 | (레포) **WALTZ**(PVLDB'23): ZNS 위 RocksDB 테일 지연 db_bench 최대 3.02배·MixGraph 4.73배↓ | 3.02~4.73× | WQ-31 | 🟡 (레포) |
| IR-C16 | (레포) **Meta+Samsung FDP CacheLib**(EuroSys'25, arXiv 2503.11665): 프로덕션 트레이스에서 호스트 OP 0%로 DLWA ≈ 1, **고사용률에서 p99 읽기/쓰기 지연 개선**(절대값 미확보), 탄소 4배·비용 2배 절감 주장 | DLWA ≈1 | W21 https://arxiv.org/abs/2503.11665 | 🟡 (레포, p99 수치 미확보) |
| IR-C17 | (레포) **Toshiba FMS 2018**: QLC는 GC·리프레시가 테일 스파이크 원인, NVMe IO Determinism 격리로 테일 **약 50배** 개선(개념 증명) | ~50× | WQ-35 | 🟡 (레포) |
| IR-C18 | **NVMe 1.4 Predictable Latency Mode(PLM)**: NVM Set이 **결정적 창(DTWin)**과 **비결정적 창(NDWin)**을 오가며 GC 등 배경 작업을 NDWin으로 몰아냄. 호스트는 DTWin에서 쓰기·trim을 보내지 않기로 약속, 드라이브는 DTWin 잔여 시간·잔여 4KB 랜덤 읽기/쓰기 수를 추정 제공. 실사용은 여러 드라이브 간 부하 분산(지연 민감 I/O는 DTWin 드라이브로). 스펙은 DTWin 동작을 엄밀히 정의하지 않음, 쓰기 처리 지침 불명확 | 정성 | AnandTech NVMe 1.4 https://www.anandtech.com/show/14543/nvme-14-specification-published/2 ; FMS 2018 Petersen https://files.futurememorystorage.com/proceedings/2018/20180807_INVT-102A-1_Petersen.pdf ; IODA(SOSP'21) https://ucare.cs.uchicago.edu/pdf/sosp21-ioda.pdf ; Roy 외 NCA 2021 https://www.cse.iitk.ac.in/users/amitangshu/nca_2021.pdf | 🟡 |
| IR-C19 | **The Tail at Store**(FAST'16, 시카고대·NetApp): 디스크 45만+·SSD 4,000개, 87일(SSD 700만 시간). 드라이브가 RAID 동료보다 2배 이상 느린 시간 비율 디스크 0.2%·**SSD 0.6%**, 느린 드라이브가 1개 이상인 RAID 그룹("storage tail") 디스크 1.5%·**SSD 2.2%**. 학회 요약 블로그: 다수가 **불량 블록 재매핑·GC 같은 내부 동작**을 반영 | SSD 0.6% / 2.2% | USENIX FAST'16 https://www.usenix.org/conference/fast16/technical-sessions/presentation/hao ; DSHR 블로그 https://blog.dshr.org/2016/02/2016-fast-conference.html | 🟡 (GC 귀인은 2차 요약) |
| IR-C20 | **AegonKV**(FAST'25, LSM KV 스토어 — LLM KV 캐시 아님, 유비): 호스트 측 value-log GC가 전경 읽기·쓰기와 CPU·I/O를 다툼, SmartSSD로 GC 오프로드 시 **테일 지연 37~66%↓** | 37~66% | 연세대 S3 위키 요약 https://s3wiki.yonsei.ac.kr/index.php?oldid=1770 | ⚠️ (2차·유비) |
| IR-C21 | (레포) OCP 기준 QoS 예: Kioxia CD8P 99.999p 랜덤 읽기 **250µs 미만**; 데이터시트 쌍 — Solidigm PS1010(TLC) 읽기 최대 60µs vs P5336(QLC) 일반 110µs, Micron 9550 PRO(TLC) 60µs vs 6600 ION(QLC) 100µs → **QLC 읽기 지연 TLC의 약 1.7~1.8배** | 250µs / 1.7~1.8× | WQ-36·WQ-37·WQ-39 | 🟡 (레포) |

### C-3. 반대 근거·한계

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| IR-C30 | (레포) **GC가 주원인이 아니라는 결과**: 고급 SSD 1종 분해 시 테일 주원인은 **칩 간 큐 길이 불균형**(느린 쓰기 뒤에 읽기 대기), 해법은 RAID 패리티로 바쁜 칩 읽기 재구성 | WQ-33 (Elyasi 외, IEEE 2019) | 🟡 (레포) |
| IR-C31 | (레포) FDP는 best-effort — 수명 오분류·RUH 간 간섭·적대적 무효화 시 near-1 WAF 붕괴(WARP, FAST'26); 4.49배까지 악화 사례 | W27 ; WQ-18 | 🟡 (레포) |
| IR-C32 | (레포) 배치로 테일 지연이 준 측정은 **모두 TLC/MLC 드라이브**, QLC에서 FDP·ZNS 전후 p99 측정 공개물 없음 | WQ 판정 C3 | 🟡 (레포) |
| IR-C33 | **LLM KV 캐시 계층에서 SSD GC가 유발한 p99 TTFT 스파이크를 직접 측정한 2026 공개 자료는 찾지 못함**(검색 요약 확인) | 이번 검색 | ⚠️ (부정 확인) |

---

## §D. 초고DWPD·SLC 수요 신호와 TLC 고내구(3 DWPD) KV 캐시 SSD (간략)

| ID | 제품·신호 | 매체 | DWPD (기준) | 상태·일자 | 동기 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|
| IR-D01 | Solidigm **D7-P5810** | SLC(또는 QLC 다이 pSLC — 충돌) | **50 @4K 랜덤 / 65 @순차**, 800GB = 73PBW | 2023-09 | 쓰기 집약·캐싱 | WC H-01 | 🟡 (레포) |
| IR-D02 | Micron **XTR** | 176단 SLC 모드 | 35 RDWPD / 60 SDWPD | 2023-05 | 캐싱·쓰기 버퍼 | WC H-02 | 🟡 (레포) |
| IR-D03 | Kioxia **FL6** / **GP1** | XL-FLASH (SLC) | FL6 60 / **GP1 최대 50** | FL6 2021-09 / GP1 2026-08 발표, 샘플 2026년 말 | GP1: PCIe 6.0, **512B 랜덤 읽기 10M IOPS**, Storage-Next | WC H-03·H-04 ; UD-01 | 🟡 (레포) |
| IR-D04 | Kioxia–NVIDIA **1억 IOPS SSD** | XL-FLASH 3세대, PCIe 7.0 | 미공개 | 2027 → **2028 순연**(2026-09) | 512B IOPS | WC H-05 ; GD-25 | 🟡 (레포) |
| IR-D05 | SK hynix **AI-N P** | SLC | 미공개 | 1세대 Gen6 25M IOPS 샘플 2026년 말, 2세대 100M 2027년 말 | 추론 I/O 병목 | WC H-12 ; UD-03 | 🟡 (계획) |
| IR-D06 | Phison **X200Z / X202Z / AI100E** | pSLC | 60 / 60 / **100** | 2025-05 / 2026-06 / 판매 중 | 쓰기 집약 AI·GPU 메모리 확장 | WC H-06·H-07·H-08 ; UD-04·UD-05 | 🟡 (레포) |
| IR-D07 | DapuStor **X5 SCM** | 미공개 | **최대 120** | 2026-07 | "**KV 캐시 오프로딩·TTFT 단축**" | WC H-14 ; UD-07 | 🟡 (레포) |
| IR-D08 | 삼성 **Z-SSD SZ985** | Z-NAND | 30 | 2018 | HPC·AI | IR-B20 | 🟡 |
| IR-D09 | TrendForce: **NVIDIA가 SLC를 차세대 AI 스토리지 핵심 요소로 지목**, SK hynix·Kioxia SLC AI SSD 가속 — 동기는 DWPD가 아닌 **IOPS·지연** | — | 정성 | 2025-12-29 | IOPS·지연 | WC D-06·X-11 | 🟡 (레포) |
| IR-D10 | **TLC 3 DWPD KV 캐시 SSD**: Solidigm **D7-PS1030 3 DWPD**(12.8TB 70PBW, StorageReview "KV Cache Tier" 리뷰), Kioxia **CM10** PCIe 6.0 BiCS10 TLC **1(RI)/3(MU) DWPD**·FDP 지원·CMX 지원 설계(2026-07-30), Micron **7600 MAX·9650 MAX 3 DWPD**급("KV 캐시 용도로 주요 고객 출하"), FADU "3 DWPD 보증 + OP 구성" | TLC | **1~3** | 2026-07~09 | CMX·KV 캐시 | WC H-16·H-17·X-08 ; UD-08 ; SR-13 ; Kioxia PR https://americas.kioxia.com/en-us/business/news/2026/ssd-20260730-1.html | 🟡 |
| IR-D11 | ScaleFlux KV/CMX 플랫폼 **유효 7~10+ DWPD**(5년, FDP 200+ 스트림, 정격 아님); Huawei OceanStor M900 **최대 24 DWPD**(시스템, 3년, 수명 16배) | — | 7~10+ / 24 | 2026-07-30 / 2026-09-17 | KV 수명 이질성 → FDP·KV 인지 배치 | WC H-18·H-19 ; UD-12·UD-13 ; Blocks&Files 2026-09-18 https://www.blocksandfiles.com/flash/2026/09/18/huaweis-oceanstor-kv-cache-storage-for-hyper-scale-ai-data-centers/5297405 | 🟡 |
| IR-D12 | **KV 캐시 SSD 내구성 표준 미정**: Pandaily(2026-10-09) — 이 용도 SSD 내구성 사양이 **3~9 DWPD 사이에서 흔들림**, 한 경영진 "한 설계의 요구가 약 3 → 9 DWPD로 바뀌었고 내일은 12, 모레는 5일 수도" | 3~9 DWPD | 2026-10-09 | 사양 부재 | Pandaily https://pandaily.com/huawei-oceanstor-m900-kv-cache-ssd-spec-dwpd-standard-unsettled | 🟡 (검색 스니펫 1회, 후속 검색에서 재확인 실패) |
| IR-D13 | (레포 판정) **"30 DWPD"를 KV 캐시 요구치로 명시한 공개 출처 없음**; NVIDIA CMX/Storage-Next DWPD 요구치 미공표 | — | — | — | — | WC §4-C ; UD-11 | 🟡 (부정 확인) |
| IR-D14 | (레포 파생) WD B200×8 호스트 축출 쓰기 0.7GB/s 상시 = 60.5TB/일 → **2TB 드라이브 기준 30.2 DWPD**, 12.8TB 4.7, 30.72TB 2.0 | 30.2 DWPD@2TB | CU-40a | ⚠️ (레포) |

---

## §E. 공백·한계 (다음 수집 과제)

| # | 미확인 항목 | 영향 |
|---|---|---|
| G-01 | 모델 가중치 로딩용 SSD 요구치(GB/s/GPU·용량)를 공표한 NVIDIA·하이퍼스케일러 문서 없음. 로딩 수치는 SW 벤치(IR-A01~A09) 위주 | ①의 요구치는 파생(IR-A11)로만 제시 가능 |
| G-02 | DiskANN·SPANN 쿼리당 SSD I/O 횟수, RAG 저장 계층의 **p99/p99.9 지연** 공표치 미확보(원 논문 본문 차단) | ②의 IOPS 요구를 정량화하지 못함 |
| G-03 | **KV 캐시 계층에서 SSD GC가 유발한 p99 TTFT 스파이크 직접 측정 없음**(IR-C33). GC→테일 근거는 RocksDB·CacheLib·일반 워크로드(TLC) | "GC 감소 → TTFT 테일 개선"은 유비 연결(⚠️)로 표기 필요 |
| G-04 | 삼성 공식 제품 페이지·백서 원문 직접 열람 실패 — PM1753 NAND 세대(V8/V9), PM1763 용량 범위(16TB vs 61.44TB), BM1773 출하 상태, PM1753/PM1763 FDP·RUH 수, PM1763 SCADA 백서 지연 수치 | 덱 각주에 "공식 페이지 스니펫 기준" 표기 |
| G-05 | 삼성 PM1753 KV 캐시 백서의 TTFT·조건 원문 미확인(IR-A36은 국내 보도 경유) | 수치 인용 시 🟡 유지 |
| G-06 | NVIDIA Storage-Next의 정량 테일 지연(µs)·IOPS/W 요구 사양 비공개(IR-A45) | "테일 지연 제약"은 정성 인용만 |
| G-07 | Pandaily "3~9 DWPD" 원문 미열람·재검색 실패(IR-D12) | 단일 스니펫 — 덱 사용 시 ⚠️ |
| G-08 | Z-NAND 7세대·GIDS 제품 사양·일정(2026 예정 이후 갱신 없음, TrendForce "상용화 과제") | 삼성 저지연 계층의 실체 미확정 |
| G-09 | EuroSys'25 FDP 논문의 p99 지연 절대값, 삼성 FMS 2025 TorFS 지연 수치(WQ-29) | IR-C16 정량화 불가 |
| G-10 | OCP 2026(10-12~15) 삼성 발표 내용 — 수집일 기준 행사 전 | IR-A67 사후 확인 필요 |

---

## 부록. 이번 세션 신규 출처 목록 (검색 요약 경유, 🟡)

- NVIDIA Run:ai Model Streamer: https://developer.nvidia.com/blog/reducing-cold-start-latency-for-llm-inference-with-nvidia-runai-model-streamer · hyper.ai 정리: https://hyper.ai/en/stories/62da06ca86a30dbdb45cccbf439905fa · WEKA: https://www.weka.io/article/model-loading-that-is-faster-than-local-node-nvme-with-nvidia-runai
- fastsafetensors: https://arxiv.org/html/2505.23072v1 · ServerlessLLM: https://usenix.org/conference/osdi24/presentation/fu · arXiv 2411.15664 · LMSYS rfork: https://www.lmsys.org/blog/2025-12-10-rfork · Prism: https://arxiv.org/pdf/2505.04021 · vLLM Sleep Mode: https://vllm.ai/blog/2025-10-26-sleep-mode · Snowflake: https://www.snowflake.com/en/blog/engineering/semi-persistence-gpu-model-swapping/
- DiskANN: https://papers.nips.cc/paper/2019/hash/09853c7fb1d3f8ee67a61b6bf4a7f8e6-Abstract.html · SPANN: https://arxiv.org/abs/2111.08566 · arXiv 2602.22805 · FMS 2025 AIML-101 · Couchbase: https://www.couchbase.com/blog/diskann/ · AiSAQ: https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-2.html · GateANN: https://arxiv.org/pdf/2603.21466 · Solidigm/Metrum: https://techfieldday.com/video/storage-becomes-ai-memory-for-rag-and-kv-cache-with-solidigm/
- py-kvcache: https://arxiv.org/pdf/2609.11744 · WEKA AMG: https://www.weka.io/article/unlocking-scalable-inference-with-weka-augmented-memory-grid · NVIDIA ICMS PR(2026-01-05) · LMCache 논문: https://arxiv.org/pdf/2510.09665 · vLLM offloading connector: https://vllm.ai/blog/2026-01-08-kv-offloading-connector · Tutti: https://arxiv.org/pdf/2605.03375 · arXiv 2609.16215 · MinIO 블로그 · MLPerf v5.0 HPCwire
- Storage-Next: SNIA SDCAI26 Bolt PDF · FMS 2025 AIML-302 Meredith PDF · StorageReview PM1763
- GC/테일: FAST'12 Wu · ATC'19 Kim(erase suspension) · FAST'16 Tail at Store · NVMe 1.4 PLM(AnandTech·Petersen FMS 2018·IODA SOSP'21) · Wikipedia/TechTarget WAF
- 삼성 사양: semiconductor.samsung.com PM1753·PM1763·PM9D3a 페이지(스니펫) · Lenovo LP2001 · BusinessWire PM1743 · StorageReview PM9A3 · Blocks&Files BM1743 · Samsung US Newsroom SZ985 · 삼성 반도체 FMS 2025 · TrendForce Z-NAND
- §D: Kioxia CM10 PR(2026-07-30) · Blocks&Files Huawei(2026-09-18) · Pandaily(2026-10-09)
- 직접 열람(✅): LMCache README(raw.githubusercontent.com, "reduces TTFT… RAG" 기능 서술), DiskANN README(DiskANN3·디스크 프로바이더가 NeurIPS'19 성능 재현 목표)
