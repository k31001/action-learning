# "AI 메모리 수요가 HBM에서 스토리지(NAND/SSD)로 이동하는가" 팩트 원장 — KV 캐시 오프로드, 반증 포함

**수집일**: 2026-09-23
**유형**: 웹 검색 + GitHub 1차 확인 기반 종합 (Research Agent 수집, 전략 판단·권고 없음)
**용도**: QLC eSSD 전략 덱 v7.0 — "HBM → 스토리지" 서사의 근거·반증 동시 확보
**수집자**: Research Agent (R8) — 사실 수집 전용
**방법**: WebSearch(다수) + GitHub MCP(PR 검색·코드 검색) + 레포 내 기존 `sources/` 대조
**등급**: ✅ 1차 출처를 직접 읽음(git 커밋·PR·저장소 문서·README) / 🟡 2차·검색 인덱스 인용·업계 매체·벤더 마케팅 주장 / ⚠️ 파생·단일출처·미검증

> **⚠️ 수집 환경 제약 (등급 해석에 직결)**: 이번 세션의 egress 정책이 `sandisk.com`·`investor.sandisk.com`·`kioxia-holdings.com`·`news.skhynix.com`·`semiconductor.samsung.com`·`counterpointresearch.com`·`trendforce.com`·`arxiv.org`·`docs.nvidia.com`·`nvidianews.nvidia.com`·`blocksandfiles.com`·`lmsys.org`·`venturebeat.com`·`businesswire.com` 등 **대부분의 벤더 IR·트레이드 프레스 도메인을 차단**했다. 따라서 §2·§4의 벤더 IR 수치는 **PDF 원문을 직접 읽지 못하고 검색 인덱스 요약에 의존**했으며 전부 🟡다. 직접 읽어 ✅를 줄 수 있었던 것은 **GitHub(github.com·GitHub API)** 경로뿐이다(§3).

> **⚠️ 프레이밍 경고 (§5·§6 필독)**: 아래 §1~§4는 "HBM → 스토리지 이동"을 **부분적으로만** 지지한다. §5에 같은 밀도의 반증을 실었다. 공개 자료를 종합하면 **"이동(shift)"보다 "증설(additive tier)"이 더 잘 지지된다.**

> **⚠️ 용어 혼동 금지**: 이 문서의 "KV 캐시"는 **LLM 추론의 Key-Value 어텐션 캐시**다. 레포의 FDP 관련 수집물에 등장하는 **Meta CacheLib의 "KV"는 소셜 그래프 키-값 캐시**이며 전혀 다른 것이다. 특히 레포 기존 수치 **CacheLib FDP WAF 3.22→1.03**은 CacheLib(소셜 그래프) 워크로드이지 **LLM KV 캐시 워크로드가 아니다.** 덱에서 이 둘을 붙이면 안 된다.

---

## §1. KV 캐시가 HBM을 벗어나는 기술적 동인 — 용량 산술

### 1-A. 가속기당 HBM 용량 (세대별)

| ID | 가속기 | HBM 용량 / 대역폭 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| S-01 | NVIDIA H100 | **80 GB** HBM3 | 2022 | 복수 GPU 스펙 집계 https://intuitionlabs.ai/articles/nvidia-data-center-gpu-specs | 🟡 |
| S-02 | NVIDIA H200 | **141 GB** HBM3E | 2023~2024 | 상동 / https://www.spheron.network/blog/amd-mi300x-vs-nvidia-h200/ | 🟡 |
| S-03 | NVIDIA B200 | **180 GB** HBM3E (자료에 따라 192 GB 표기 혼재) | 2024~2025 | https://www.civo.com/blog/comparing-nvidia-b200-and-h100 ; https://acecloud.ai/blog/nvidia-b200-vs-h200-h100-a100/ | ⚠️ **출처 간 불일치 — 덱에 단일 수치로 쓰지 말 것** |
| S-04 | NVIDIA B300 | **288 GB** | 2025 | 상동 집계 | 🟡 |
| S-05 | NVIDIA Rubin (Vera Rubin NVL144, R200) | **288 GB HBM4**, 8 스택, **~22 TB/s** | 2026 H2 | https://vrlatech.com/nvidia-vera-rubin-architecture-explained/ ; https://blog.barrack.ai/nvidia-rubin-specs-architecture-2026/ | 🟡 |
| S-06 | NVIDIA Rubin Ultra | **384 GB/GPU** 전망 | 2027 | TrendForce 인용 요약 https://www.trendforce.com/research/download/RP260206EZ | 🟡 |
| S-07 | AMD MI300X / MI325X / MI355X | **192 GB HBM3 (5.3 TB/s)** / **256 GB HBM3E (6 TB/s)** / **288 GB HBM3E (8 TB/s)** | 2023 / 2024 / 2025 | https://www.amd.com/en/products/accelerators/instinct/mi350.html ; https://videocardz.com/newz/amd-instinct-mi325x-to-feature-256gb-hbm3e-memory-cdna4-based-mi355x-with-288gb | 🟡 |
| S-08 | **AI 칩당 HBM 용량 추세** (TrendForce): 96GB/192GB → **216GB/288GB**로 상향 | 2026 수요 성장의 주동인 | 2026 | TrendForce 2026 HBM 전망 요약 https://www.trendforce.com/research/download/RP260206EZ | 🟡 |

### 1-B. KV 캐시 크기 — HBM을 초과하는 지점

| ID | 사실 | 수치 | 출처 | 등급 |
|---|---|---|---|---|
| S-10 | **NVIDIA 기술 블로그 공식 서술**: "A KV-cache representing a **128k token context window for a single user consumes about 40 GB** of memory with Llama 3 70B, and this **scales linearly with the number of users**" | 단일 사용자 128K = **~40 GB** (H100 80GB의 절반) | NVIDIA Developer Blog "Accelerate Large-Scale LLM Inference and KV Cache Offload with CPU-GPU Memory Sharing" https://developer.nvidia.com/blog/accelerate-large-scale-llm-inference-and-kv-cache-offload-with-cpu-gpu-memory-sharing | 🟡 (원 블로그 페이지 직접 접근 불가, 검색 인덱스 인용) |
| S-11 | Llama 3.1 70B FP16 KV 캐시 = **39.06 GB @ 128K** / GQA 기준 **~0.31 MB/token** | 39.06 GB | https://intuitionlabs.ai/articles/kv-cache-memory-long-context-inference-cost | 🟡 |
| S-12 | Llama 3.1 405B, **단일 사용자 128K = 66 GB** FP16 | 66 GB | https://medium.com/@mahernaija/llm-how-to-calculate-kv-cache-e29f095ac2ed | ⚠️ (블로그 단일 출처) |
| S-13 | **70B 모델, 동시 10명 × 128K ≈ 400 GB KV 캐시** — 어떤 단일 가속기 용량도 초과 | ~400 GB | https://intuitionlabs.ai/articles/kv-cache-memory-long-context-inference-cost | 🟡 |
| S-14 | **NVIDIA: Llama 3 70B / H100에서 KV 캐시 오프로드가 TTFT를 최대 14배 가속** | 14× | 상동 NVIDIA 기술 블로그 요약 | 🟡 |

**⚠️ 파생 산술 (덱에 쓰려면 반드시 파생 표기)**: S-10(단일 사용자 128K = 40 GB, 사용자 수에 선형)과 S-05(Rubin 288 GB)를 결합하면 **Rubin GPU 1장의 HBM 전체를 KV 캐시로만 써도 128K 동시 사용자 약 7명**(288 ÷ 40 = 7.2)이다. 모델 가중치·활성화가 같은 HBM을 쓰므로 실제 수치는 더 작다. → **⚠️ 파생, 두 공개 수치의 나눗셈. 모델·정밀도·GQA 구성에 따라 크게 달라짐.**

### 1-C. 컨텍스트 윈도우 성장

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| S-20 | 2023년 초 대부분 모델이 **4K~8K** → GPT-4 Turbo **128K** → Claude 3 **200K** → Gemini 1.5 Pro **1M** → Llama 4 Scout **10M** | 8K → 10M | 2023~2026 | https://hidekazu-konishi.com/entry/llm_context_window_growth_timeline.html ; https://www.elvex.com/blog/context-length-comparison-ai-models-2026 | 🟡 |
| S-21 | **2024년 이후 헤드라인 수치는 폐쇄형 모델 기준 100만 토큰 근방에서 사실상 정체**, 오픈웨이트만 10M로 벌어짐 | — | 2024~2026 | 상동 | 🟡 — **"컨텍스트가 계속 폭증한다"는 서사의 반증. §5 참조** |
| S-22 | 2026 현재 대표값: DeepSeek V3 128K, GPT-5.2 400K, Claude Opus 4.6 200K(1M 베타), Gemini 2.5 Pro 1M | — | 2026 | 상동 | 🟡 |

### 1-D. "memory wall"이라는 용어가 실제로 쓰인 공개 문서

| ID | 문헌 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| S-30 | VentureBeat "**AI hit the memory wall — now it needs a new context tier**" — GPU 메모리와 벌크 스토리지 사이에 KV 캐시 전용 고성능·고밀도 플래시 계층이 등장 | **2026-06-22** | https://venturebeat.com/orchestration/ai-hit-the-memory-wall-now-it-needs-a-new-context-tier | 🟡 |
| S-31 | HPCwire "**What Is High Bandwidth Flash (HBF) and Can It Overcome the AI Memory Wall?**" — "HBM has hit a capacity and cost ceiling, and AI inference workloads are outgrowing it faster than the memory industry can scale it" | **2026-08-04** | https://www.hpcwire.com/2026/08/04/what-is-high-bandwidth-flash-hbf-and-can-it-overcome-the-ai-memory-wall/ | 🟡 |
| S-32 | SemiAnalysis "Scaling the Memory Wall: The Rise and Roadmap of HBM" — memory wall 담론의 HBM 측 기준 문헌 | (레포 기존 인용) | https://newsletter.semianalysis.com/p/scaling-the-memory-wall-the-rise-and-roadmap-of-hbm | 🟡 |
| S-33 | Solidigm 제품 페이지 "**Inference Context Memory Storage (ICMS): Why AI inference is a flash storage problem**" — 벤더가 직접 "추론은 플래시 스토리지 문제"로 명명 | 2026 | https://www.solidigm.com/products/technology/icmsp-ai-inference-is-flash-storage-problem.html | 🟡 (벤더 마케팅) |

---

## §2. 메모리·스토리지 벤더의 공개 발언 — "AI 수요가 NAND/SSD로 확장된다"

### 2-A. 가장 강한 벤더 발언: SK hynix (HBM 1위 업체 본인의 입)

| ID | 사실 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| V-01 | **SK hynix가 2026 2분기 실적 컨퍼런스콜에서 "KV 캐시 오프로딩" 때문에 "near-GPU storage" 등 신규 NAND 제품군을 개발 중이라고 발표.** 보도된 논리: "**AI 데이터가 급증하면서 KV 캐시를 저장할 HBM 용량이 한계에 도달하고 있다(the HBM capacity for storing KV cache is reaching its limits)**" → GPU 인근에 고용량 NAND를 탑재해 **추가 KV 캐시 저장소**로 쓰겠다 | **2026-07-29** | Seoul Economic Daily "SK hynix Developing New NAND Products for KV Cache Demands" https://en.sedaily.com/finance/2026/07/29/sk-hynix-developing-new-nand-products-for-kv-cache-demands | 🟡 (실적 콜 발언의 2차 보도 — 사실상 1차급이나 원문 미확인) |
| V-02 | **결정적 표현 주의**: 보도 문구는 "**additional** KV cache repository"다. **대체(replacement)가 아니라 추가(additional)**로 서술되어 있다 | 2026-07-29 | 상동 | 🟡 — **§5·§6의 핵심 근거** |
| V-03 | SK hynix "full-stack AI memory creator" 포지셔닝 — HBM → AI-DRAM → **AI-NAND**로 확장, 고객과 커스텀 공동 설계 | 2026 | https://www.ersaelectronics.com/blog/SK-Hynix-AI-Memory ; SK hynix FMS 2026 https://news.skhynix.com/en/fms-2026/ | 🟡 |
| V-04 | **자본 배분 증거**: 2026-08-07 SK hynix 이사회, **54조 원($38.1B) 2개 신규 팹 승인**. 이 중 **NAND(청주 M17) 19.1조 원(~$13.5B)**, DRAM/HBM(용인) 35.2조 원(~$24.9B). 청주 착공 2027-02, 첫 클린룸 2028-12 | **2026-08-07** | CNBC https://www.cnbc.com/2026/08/07/sk-hynix-memory-chips-ai-prices.html ; SiliconANGLE https://siliconangle.com/2026/08/07/sk-hynix-approves-38b-investment-two-new-memory-fabs/ | 🟡 |
| V-05 | ⚠️ **V-04의 해석 주의**: 같은 발표에서 **DRAM/HBM 투자가 NAND 투자의 약 1.84배**다(35.2 ÷ 19.1). "HBM에서 NAND로 이동"이라면 자본 배분이 반대로 읽힌다 | — | V-04 나눗셈 | ⚠️ **파생 산술** |

### 2-B. SanDisk — 수요 총량 주장의 원천

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| V-10 | **Investor Day 2026**: "KV cache is **reshaping the memory hierarchy to Tier 3.5**"; **엔터프라이즈 데이터센터 플래시 TAM이 2030년 1.2 제타바이트(ZB)**로 성장 | 1.2 ZB @2030 | **2026-08-13** | Sandisk PR https://www.sandisk.com/company/newsroom/press-releases/2026/2026-08-13-sandisk-investor-day-2026 ; Counterpoint 요약 https://counterpointresearch.com/en/insights/sandisk-investor-day-caching-out-the-nand-cycle-with-contracts | 🟡 (원문 접근 차단, 검색 인덱스 인용) |
| V-11 | **FMS 2026**: **KV 캐시 단독으로 2027년까지 NAND 추가 수요 75~100 EB**, **2028년 그 2배**; **2030년 AI 데이터센터 NAND 워크로드의 35%가 KV 캐시** | 75~100 EB → 2× | **2026-08** | https://www.kucoin.com/news/flash/sandisk-predicts-kv-cache-to-drive-35-of-ai-data-center-nand-workloads-by-2030 ; 레포 [kv-cache-ssd-demand-2026.md](kv-cache-ssd-demand-2026.md) §2 | 🟡 |
| V-12 | FMS 2026: **BiCS10 QLC 기반 PCIe Gen5 eSSD 최대 256 TB를 "KV 캐시 워크로드 최적화"로 전시** — QLC를 KV 캐시 티어에 지명한 **유일한 공개 사례**. DWPD·WAF·FDP 수치는 미공개 | 256 TB | 2026-08 | https://www.sandisk.com/company/newsroom/press-releases/2026/sandisk-nand-innovation-for-era-of-ai-inference-at-fms-2026 ; 레포 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2 | 🟡 |
| V-13 | SanDisk 메시지의 근거 논리(2차 요약): "**Keeping every piece of active information in scarce and expensive HBM is not economically realistic**, which creates room for a deeper memory hierarchy in which NAND flash provides far more capacity at lower cost" | — | 2026-08 | V-10 출처 | 🟡 — **"deeper hierarchy"이지 "HBM 대체"가 아님에 유의** |

### 2-C. Kioxia — 가장 구체적인 비트 수요 전망

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| V-20 | **Investor Day 2026 "AI 추론 시대 성장 전략"**: 데이터센터 내에서 **추론(Agentic AI·Physical AI·RAG·KV-cache)은 CAGR 86%**, **학습은 CAGR 16%** | 86% vs 16% | **2026-06-02** | Kioxia Holdings PR https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html ; 요약 https://handsoff.substack.com/p/kioxia-investor-day-flash-memory | 🟡 (IR PDF 직접 접근 차단) |
| V-21 | **데이터센터 NAND 수요: 295 EB(2025) → 1,807 EB(2028)**; **AI 추론이 증분 DC 수요의 86%** | 295 → 1,807 EB | 2026-06-02 | 상동 | 🟡 |
| V-22 | **"As KV Cache grows with the increasing complexity of inference workloads, DRAM alone can no longer keep pace"** → 이에 대응해 **CM 시리즈 고대역폭 TLC** 개발 | — | 2026-06-02 | 상동 | 🟡 — **대체 대상으로 지목된 것은 HBM이 아니라 DRAM이다** |
| V-23 | 포트폴리오 분업: **CM(고대역폭) / GP(초저지연·고 IOPS) / LC(초고용량 최대 245 TB)** | — | 2026 | 상동 | 🟡 |
| V-24 | **⚠️ 파생 산술**: 295 EB → 1,807 EB = **6.13배 / 3년 CAGR 82.9%** ((1807/295)^(1/3)−1) | 6.13× / 82.9% | — | V-21 산술 | ⚠️ **파생 — 원 발표에 CAGR 수치가 있는지 미확인** |

### 2-D. Micron·Samsung·Solidigm — 계층 정의는 HBM을 빼지 않는다

| ID | 사실 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| V-30 | **Micron COMPUTEX 2026 보도자료 문구**: "**High-bandwidth memory (HBM) powers high-speed model execution and hot key-value (KV) cache**, while LPDDR and DDR deliver system memory for orchestration and long-context expansion. **Data center SSDs round out the stack, offering high-performance drives to address persistent KV cache needs** and high-capacity drives for massive data lakes" | **2026-06-01** | Micron IR https://investors.micron.com/news-releases/news-release-details/micron-powers-ai-everywhere-computex-2026 | 🟡 — **HBM=hot KV / SSD=persistent KV의 3단 분업. 대체 서사가 아님** |
| V-31 | Micron: **HBM4 36GB 12H가 LLM 추론 처리량(tokens/s)을 대역폭 2배당 2.6배 증가**시킴 | 2026-06-01 | 상동 | 🟡 |
| V-32 | **Samsung 백서 "Scaling AI Inference with KV Cache Offloading: Why Storage Is Becoming a Key Enabler"** (저자 Sungup Moon, NAND AE Group) — PM1753(8세대 V-NAND TLC, **14.5 GB/s 순차, 3.3M 랜덤 읽기 IOPS**)로 시스템 레벨 평가 | 2026 | https://download.semiconductor.samsung.com/resources/white-paper/scaling_ai_inference_with_kv_cache_offloading.pdf ; 블로그 https://semiconductor.samsung.com/news-events/tech-blog/scaling-ai-inference-with-kv-cache-offloading-why-storage-is-becoming-a-key-enabler-for-next-generation-ai-systems/ | 🟡 — **백서 내 TTFT 실측치는 §7-6 참조(확보 실패)** |
| V-33 | Samsung PM1753이 **Vera Rubin의 NVIDIA CMX 플랫폼에 채택** | 2026 | 상동 블로그 요약; 레포 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2 | 🟡 |
| V-34 | **Solidigm** Jeff Harthorn(AI applied research lead): "**the bottleneck has migrated from compute to context**", 컨텍스트 관리가 "2026년의 질문" | 2026-06~08 | VentureBeat 2026-06-22 (S-30); Solidigm ICMS 페이지 (S-33) | 🟡 |
| V-35 | Solidigm이 **KV 캐시 티어에 지명한 제품은 TLC**(D7-PS1010 1 DWPD / PS1030 3 DWPD)이고 QLC(D5-P5336 0.58~0.6 DWPD)는 "read-intensive cloud storage"로 별도 포지셔닝 | 2026 | 레포 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2 | 🟡 |

### 2-E. HBF (High Bandwidth Flash) — "HBM과 NAND 사이의 새 계층"

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| V-40 | **SanDisk ↔ SK hynix, OCP를 통해 업계 최초 HBF 기술 규격 공표.** 컨소시엄 착수(**2026-02**)로부터 **6개월** | 시스템 인터페이스·전기 규격·xPU-HBF 호스트 인터페이스·신뢰성·패키징·SW 사용 가이드 | **2026-08-03~04** | Businesswire https://www.businesswire.com/news/home/20260803297696/en/ ; SK hynix Newsroom https://news.skhynix.com/en/hbf-at-fms-2026/ ; HPCwire https://www.hpcwire.com/off-the-wire/sk-hynix-unveils-1st-hbf-standard-specifications-with-sandisk-at-fms-2026/ | 🟡 |
| V-41 | **HBF 규격 수치**: 패키지 **최대 512 GB**(8-high·16-high 스택), 대역폭 3등급 **약 0.4 TB/s ~ 3.0 TB/s**, 프로세서 연결은 **UCIe** 오픈 칩렛 인터커넥트. 1세대 타깃은 512 GB/스택 @ **1.6 TB/s** | 512 GB / 0.4~3.0 TB/s | 2026-08 | 상동 + https://tbreak.com/sandisk-sk-hynix-high-bandwidth-flash-spec/ | 🟡 |
| V-42 | **Google·Tenstorrent가 컨소시엄 멤버로 합류** — 기술 검증·표준 수립에 기여 | — | 2026-08 | 상동 | 🟡 |
| V-43 | HBF 포지셔닝(2차 요약): "**HBM과 통상 메모리 사이에 놓이는 완전히 새로운 메모리 계층의 공식 탄생**"; 주장되는 이점은 **HBM 대비 8~16배 용량** | 8~16× 용량 | 2026-08 | https://www.ersaelectronics.com/blog/SK-Hynix-AI-Memory ; TheValueist(SanDisk Investor Day 인용) https://x.com/TheValueist/status/2087968891309891615 | ⚠️ (8~16배는 벤더 주장의 재인용, 조건 미명시) |
| V-44 | **HBF 일정 — 반증 포함**: 2025-08 시점 SanDisk 계획은 "**첫 샘플 2H26, AI 추론 디바이스 2027 초**"였으나, **2026-08-13 Investor Day 기준 첫 다이 테이프아웃 완료 / 추론 제품 샘플 2027 / 양산 2028**로 제시 | 샘플 2027 / 양산 2028 | 2025-08 → 2026-08 | StorageReview https://www.storagereview.com/news/sandisk-tapes-out-its-first-hbf-memory-die-targets-2027-for-inference-product-samples ; TrendForce https://www.trendforce.com/news/2026/08/14/news-sandisk-reportedly-tapes-out-first-hbf-product-targets-2027-samples-and-2028-production/ | 🟡 — **일정이 1년 이상 뒤로 밀렸다. §5-13 참조** |

### 2-F. NVIDIA CMX — 플랫폼 레벨의 계층 신설

| ID | 사실 | 수치/내용 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| V-50 | **ICMSP(CES 2026-01) → CMX(GTC 2026-03) 개명.** BlueField-4 STX가 CMX를 랙 스케일로 통합한 첫 아키텍처. **로컬 노드 스토리지(G3)와 공유 엔터프라이즈 스토리지(G4) 사이의 "G3.5" 티어**를 신설 | G3.5 | **2026-01 / 2026-03** | NAND Research https://nand-research.com/nvidia-stx-cmx-infrastructure-for-agentic-ai-context-storage/ ; NVIDIA CMX 제품 페이지 https://www.nvidia.com/en-us/data-center/ai-storage/cmx/ ; 레포 [kv-cache-ssd-offload-ecosystem-2026-08.md](kv-cache-ssd-offload-ecosystem-2026-08.md) | 🟡 |
| V-51 | **용량**: GPU당 **16 TB** NVMe, 랙당(Rubin GPU 72장) **1,152 TB**. CMX는 GPU 팟당 **페타바이트급 공유 용량** 제공 — HBM·DRAM에서 축출된 후에도 히스토리 유지 | 16 TB/GPU, 1,152 TB/rack | 2026-03 | 상동 | 🟡 |
| V-52 | **성능 주장**: 토큰 처리량 최대 **5배**, 에너지 효율 **4배**, 데이터 수집 **2배**; BlueField-4 스토리지 대역폭 최대 **200 GB/s** | 5× / 4× / 2× | 2026-03 | Tom's Hardware https://www.tomshardware.com/tech-industry/nvidia-launches-bluefield-4-stx-storage-architecture-for-agentic-ai ; NVIDIA Newsroom | 🟡 (벤더 주장) |
| V-53 | **⚠️ 파생 대비**: GPU당 CMX NVMe **16 TB** vs GPU당 HBM **288 GB** → **약 55.6배**. 즉 CMX는 HBM을 대체하는 게 아니라 **HBM 용량의 50배 이상 규모의 별도 계층**을 붙인 것 | 55.6× | — | V-51 ÷ S-05 | ⚠️ **파생 산술** |
| V-54 | 공식 생태계 파트너는 JBOF 제조(AIC·Supermicro·QCT), OEM(Dell·HPE·IBM·NetApp 등), 스토리지 SW(VAST·WEKA·DDN·MinIO 등) — **드라이브 벤더 공식 명단은 없다** | — | 2026 | 레포 [qlc-v7-hbm-codesign-lesson-2026-09.md](qlc-v7-hbm-codesign-lesson-2026-09.md) D-14 | 🟡 |

---

## §3. 소프트웨어 스택 — 오프로드가 프로덕션에서 실재하는가 (✅ GitHub 1차)

이 절의 날짜는 **GitHub API로 직접 조회한 머지 PR**이다. 등급 ✅.

### 3-A. SSD/디스크 계층이 메인라인에 들어간 시점

| ID | 프로젝트 | PR | 내용 | 머지일 | 등급 |
|---|---|---|---|---|---|
| W-01 | **LMCache** | [#52](https://github.com/LMCache/LMCache/pull/52) | add disk cache & safetensor serialization — **디스크 계층 최초 도입** | **2024-08-13** | ✅ |
| W-02 | LMCache | [#506](https://github.com/LMCache/LMCache/pull/506) | Add a filesystem remote connector | **2025-05-13** | ✅ |
| W-03 | LMCache | [#699](https://github.com/LMCache/LMCache/pull/699) | **Introduce Weka Storage Backend** — 스토리지 벤더가 직접 백엔드 기여 | **2025-05-28** | ✅ |
| W-04 | LMCache | [#773](https://github.com/LMCache/LMCache/pull/773) | **Add a generic GDS backend** (GPUDirect Storage / cuFile) | **2025-06-05** | ✅ |
| W-05 | **SGLang** | [#7211](https://github.com/sgl-project/sglang/pull/7211) | Support l3 cache (mooncake store) for hiradix cache | **2025-07-31** | ✅ |
| W-06 | SGLang | [#7280](https://github.com/sgl-project/sglang/pull/7280) | **Add hf3fs support for hicache storage** (DeepSeek 3FS = NVMe 기반) | **2025-07-31** | ✅ |
| W-07 | **NVIDIA Dynamo** | [#3532](https://github.com/ai-dynamo/dynamo/pull/3532) | **add disk offloading filtering in KVBM** — 쓰기 억제 필터(SSD 수명 보호) | **2025-10-10** | ✅ |
| W-08 | NVIDIA Dynamo | [#3510](https://github.com/ai-dynamo/dynamo/pull/3510) | **enable KVBM GPU offload to Disk bypassing CPU** — GPU→디스크 직결 | **2025-10-21** | ✅ |
| W-09 | NVIDIA Dynamo | [#8806](https://github.com/ai-dynamo/dynamo/pull/8806) | auto-enable **NIXL** backends for KVBM v2 host/disk tiers | **2026-04-28** | ✅ |
| W-10 | NVIDIA Dynamo | [#10649](https://github.com/ai-dynamo/dynamo/pull/10649) | docs(kvbm): **GDS/cuFile disk-to-device onboarding** 트러블슈팅 | **2026-06-25** | ✅ |
| W-11 | **vLLM** | [#40020](https://github.com/vllm-project/vllm/pull/40020) | **[kv_offload] Add multi-tier KV cache offloading framework** | **2026-05-13** | ✅ |
| W-12 | vLLM | [#42689](https://github.com/vllm-project/vllm/pull/42689) | Support **disk offloading** in MooncakeStoreConnector | **2026-05-16** | ✅ |
| W-13 | vLLM | [#41735](https://github.com/vllm-project/vllm/pull/41735) | **File system secondary tier** implemented in python | **2026-05-24** | ✅ |
| W-14 | vLLM | [#47923](https://github.com/vllm-project/vllm/pull/47923) | Emit tier-owned BlockStored events from **FS/OBJ secondary tiers** | **2026-07-10** | ✅ |
| W-15 | vLLM | [#49644](https://github.com/vllm-project/vllm/pull/49644) | **Add disk offloading support to SimpleCPUOffloadConnector** | **2026-08-07** | ✅ |
| W-16 | vLLM (참고) | [#15960](https://github.com/vllm-project/vllm/pull/15960) | KV Connector API V1 — 외부 KV 저장소 연결 de-facto 인터페이스 | 2025-04-17 | ✅ (레포 기존 확인) |

**리드타임 (✅ 날짜 산술)**: 최초 디스크 계층(LMCache 2024-08) → GDS 백엔드(2025-06, +10개월) → NVIDIA Dynamo GPU↔디스크 직결(2025-10, +14개월) → vLLM 다계층 프레임워크 메인라인(2026-05, +21개월) → vLLM 다수 디스크 커넥터 정착(2026-08, +24개월).

### 3-B. ⚠️ 중요한 반전 — NVIDIA가 KVBM을 deprecate했다

| ID | 사실 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| W-20 | **Dynamo v1.5.0 릴리스 노트 원문**: "Dynamo v1.5.0 is the 18th feature release … spanning **658 merged PRs from 123 contributors**. It opens Dynamo Router worker selection to custom scoring and picking policies and **extends KV indexing to Mooncake and disk tiers. KVBM is deprecated, with removal targeted for v1.6.0.**" | **2026-09-18** | `docs/fern/pages/reference/general/releases/dynamo-v1-5-0.mdx` (GitHub 코드 검색으로 직접 확인) | ✅ |
| W-21 | **Deprecations 원장 원문**: "**KVBM (KV Block Manager) is deprecated in v1.5.0 and removal is targeted for v1.6.0**; the `kvbm` wheel and the vLLM KVBM launch and deploy examples ship unchanged for this release." → **Migrate: "Use the engine's native KV offloading for host and disk tiering. Cross-node KV cache sharing is the scope of the separate, early-stage KV Cache Runner (KVCR) project, which does not replace KVBM."** | **2026-09-18** | `docs/fern/pages/reference/general/releases/deprecations.mdx` (직접 확인) | ✅ |
| W-22 | Known Issues 원문: "Deploying `examples/backends/vllm/deploy/agg_kvbm.yaml` does not come up … **KVBM is deprecated in this release, so this is not being fixed as a runtime defect**" | 2026-09-18 | `docs/fern/pages/reference/general/releases/known-issues.mdx` (직접 확인) | ✅ |
| W-23 | **해석(사실 대조)**: 디스크 티어 자체는 사라지지 않았다 — 같은 릴리스에서 "extends KV indexing to **Mooncake and disk tiers**"라고 명시한다. 사라진 것은 **NVIDIA가 별도로 만든 전용 KV 블록 매니저**이며, 오프로드 기능은 **추론 엔진(vLLM·SGLang) 네이티브로 흡수**되었다 | 2026-09-18 | W-20·W-21 대조 | ✅ (문서 대조) |

### 3-C. 공개된 성능·히트율 수치

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| W-30 | **SGLang HiCache** 3계층(GPU HBM / 호스트 DRAM / 외부 스토리지): 최대 **6배 처리량**, **TTFT 최대 −80%**. 코딩 에이전트(Qwen3-Coder-480B) **캐시 히트율 40% → 80%**, 평균 TTFT **−56%**, 처리량 2배 | 6× / −80% | **2025-09-10** | LMSYS https://www.lmsys.org/blog/2025-09-10-sglang-hicache/ | 🟡 |
| W-31 | **LMCache 에이전틱 벤치마크**: 평균 TTFT **3.0배 감소**, 처리 요청 **2.3배**; 프로덕션 규모에서 **중앙값 TTFT 18.5s → 8.0s**, 처리량 **0.37 → 0.73 req/s**(캐시 워밍 후) | 3.0× / 2.3× | **2026-05** | LMCache 공개 벤치마크 요약 (검색 인덱스 인용) | 🟡 |
| W-32 | **Mooncake (Moonshot AI Kimi)** — GPU 클러스터의 유휴 CPU·DRAM·**SSD**·NIC를 묶은 분리형 KVCache. 실 트레이스에서 **유효 요청 수용량 +59%~498%**(SLO 준수), 일부 시뮬레이션 **+525%**. 현재 **수천 노드에서 일 1,000억 토큰 이상** 처리 | +59~498% | FAST'25 Best Paper / ACM ToS | https://arxiv.org/abs/2407.00079 ; https://dl.acm.org/doi/10.1145/3773772 ; https://www.usenix.org/conference/fast25/presentation/qin | 🟡 (논문 PDF 직접 접근 차단) |
| W-33 | **"Where Should the KV Cache Live?"** (arXiv 2609.16215, 2026-09): GPU HBM / CPU DRAM / SSD 이산사건 시뮬레이터. **티어링이 GPU당 동시 세션 73.02배, 세션당 비용 62.04배 절감**. 결정적 단서 — "**these gains coming from tier capacities of 1 plus 8 plus 64, not placement policy**" | 73.02× / 62.04×, 용량비 **1:8:64** | **2026-09** | https://arxiv.org/abs/2609.16215 | 🟡 — **이득의 출처가 정책이 아니라 용량비라는 점이 §5·§6의 핵심** |
| W-34 | 레포 기존 확인: **Dynamo KVBM의 디스크 오프로드 필터는 기본 활성** — "SSD 수명 연장을 위해 **빈도 ≥2 블록만** CPU→디스크" | 빈도 ≥2 | 2026 | 레포 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §1 | 🟡 |
| W-35 | 레포 기존 확인: **DeepSeek 3FS**의 KVCache 유스케이스에서 전 클라이언트 합산 **피크 읽기 40 GiB/s** | 40 GiB/s | 2025~2026 | 상동 §1 | ✅ (GitHub 저장소 문서) |

---

## §4. 정량적 이동 — HBM 쪽 수치 vs NAND-for-AI 쪽 수치

| ID | 지표 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| Q-01 | **HBM TAM (Micron 가이던스)**: **약 $35B(2025) → 약 $100B(2028)**, CAGR **~40%**. $100B 도달 시점을 직전 전망 대비 **2년 앞당김** | $35B → $100B | 2025~2028 | Micron 실적 발표 요약 https://www.nextplatform.com/2025/12/19/hbm-supply-curve-gets-steeper-but-still-cant-meet-demand/ | 🟡 |
| Q-02 | **HBM 비트가 전체 DRAM 비트 공급에서 차지하는 비중**: **8%(2025) → 9%(2026) → 13%(2027)** | 8 → 9 → 13% | 2025~2027 | TrendForce 요약 | 🟡 |
| Q-03 | **HBM 수요 성장률**: **+130% YoY(2025) → +70% YoY(2026)**. 2026년 HBM 수요의 **55%+가 AI/ML 학습·추론** | +130% → +70% | 2025~2026 | TrendForce 요약 | 🟡 — **절대 규모는 확대, 성장률은 둔화** |
| Q-04 | **NAND 매출**: TrendForce 기준 **2026년 $174.1B, +138.5% YoY**, AI 인프라(학습 데이터셋·체크포인트·고성능 추론 환경)가 주동인 | $174.1B, +138.5% | 2026 | TrendForce 요약 | 🟡 |
| Q-05 | **⚠️ 충돌하는 NAND 전망**: 다른 집계는 **$68B(2025) → $126B(2027), CAGR 36.2%** — **Q-04의 2026년 수치($174.1B)가 이 집계의 2027년 수치($126B)보다 크다** | 충돌 | 2025~2027 | Q-04 vs https://www.ampheo.com/blog/memory-chip-market-forecast-2026-dram-nand-hbm-and-nor-flash | ⚠️ **두 수치를 덱에 병기 금지. 집계 범위·가격 기준 미확인** |
| Q-06 | **엔터프라이즈 SSD가 전 세계 NAND 비트 출하의 48%**(Q2 2026), **1년 전 26%**에서 거의 2배. 연말까지 **50% 초과** 전망 | 26% → 48% | **Q2 2026 (2026-09 발표)** | Counterpoint https://counterpointresearch.com/en/insights/server-led-essds-hit-48-percent-of-nand-shipments ; EE Times Asia https://www.eetasia.com/server-led-essds-hit-48-of-nand-shipments/ | 🟡 |
| Q-07 | **Citi**: 엔터프라이즈 SSD 수요 **+52.9% YoY(2027)**, **+41%(2028)** — 동인으로 AI 추론·지속 학습·**NVIDIA KV 캐시 오프로딩**을 명시 | +52.9% / +41% | 2027~2028 | https://www.kucoin.com/news/flash/citi-forecasts-53-surge-in-enterprise-ssd-demand-by-2027-driven-by-ai | 🟡 |
| Q-08 | **TrendForce 2Q26 엔터프라이즈 SSD 상위 5사 매출 합계 약 $37.59B** (전분기 대비 증가, 가격·출하 동반 상승) | $37.59B | 2Q26 (2026-09-01) | https://www.trendforce.com/presscenter/news/20260901-13210.html | 🟡 |
| Q-09 | **⚠️ 파생 — 두 성장률의 직접 비교**: HBM TAM 2025→2028 = **2.86배(CAGR 40%, 금액)**; Kioxia DC NAND 비트 2025→2028 = **6.13배(CAGR 82.9%, 비트)**. **하나는 금액, 하나는 비트이므로 동일 축 비교가 아니다.** 덱에 나란히 놓으면 오독된다 | 2.86× vs 6.13× | — | Q-01 + V-21 | ⚠️ **파생·단위 불일치. "NAND가 HBM보다 빨리 큰다"의 근거로 쓰면 안 됨** |

---

## §5. 반증 — "HBM → 스토리지 이동"이 틀렸거나 과장일 수 있는 근거

### 5-A. HBM 수요는 여전히 가속 중이다

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| C-01 | **Samsung·SK hynix·Micron 3사 모두 2027년 DRAM·HBM 생산 캐파를 이미 완판**. 고객은 요청량의 **60~70%만 할당** | 완판 | **2026-09 보도** | TweakTown https://www.tweaktown.com/news/113004/ ; Seeking Alpha https://seekingalpha.com/news/4625688-samsung-sk-hynix-micron-sell-out-2027-memory-chip-supply-report | 🟡 |
| C-02 | **SK hynix CEO 곽노정(로이터)**: 2027년은 "**the worst year in the industry's history from the supply perspective**"이며, 고객 수요가 공급 능력을 "**even beyond 2030**"까지 초과할 것 | — | 2026 | Reuters 인용 (C-01 출처 경유) | 🟡 (원 인터뷰 원문 미확인) |
| C-03 | **$950B 규모 HBM 장기 공급 계약**(2026-07): SK hynix $750B + Samsung $200B, 미국 빅테크 대상. **공개된 다년 HBM 락인 중 최대**. 5년 롤링·선급금 포함, Samsung 목표는 계획 캐파의 **60~70%를 장기계약화** | $950B | **2026-07** | https://siliconanalysts.com/market/nvidia-sk-hynix-samsung-broadcom-lock-in-950b-hbm-supply-agreements-securing-nex-2026-07-25 | ⚠️ (애널리스트 집계, 개별 계약 공시 미대조) |
| C-04 | **GPU당 HBM 용량은 계속 증가한다**: 96/192 GB → **216/288 GB(2026)** → **384 GB(Rubin Ultra, 2027)**. 2026년 HBM 수요 성장의 주동인이 바로 **AI 칩당 HBM 탑재량 상승** | 96 → 384 GB | 2025~2027 | S-06·S-08 | 🟡 — **"HBM에서 나간다"면 GPU당 HBM이 왜 4배가 되는가** |
| C-05 | SK hynix 2026-08-07 신규 투자에서 **DRAM/HBM 35.2조 원 vs NAND 19.1조 원 — HBM 쪽이 1.84배** | 1.84× | 2026-08-07 | V-04·V-05 | ⚠️ 파생 |

### 5-B. 결정적 반례 — NVIDIA는 컨텍스트 처리를 값싼 메모리로 옮겼다가 **되돌렸다**

| ID | 사실 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| C-10 | **Rubin CPX 최초 설계(발표 2025-09)**: 롱컨텍스트 **프리필은 대역폭 바운드가 아니라 컴퓨트 바운드**라는 근거로 HBM 대신 **128 GB GDDR7**(HBM 대비 GB당 절반 이하 비용) 탑재. 30 PFLOPS NVFP4, 백만 토큰 컨텍스트용 어텐션 가속 | **2025-09** | NVIDIA Newsroom https://nvidianews.nvidia.com/news/nvidia-unveils-rubin-cpx-a-new-class-of-gpu-designed-for-massive-context-inference ; SemiAnalysis https://newsletter.semianalysis.com/p/another-giant-leap-the-rubin-cpx-specialized-accelerator-rack | 🟡 |
| C-11 | **반전**: 보도(애널리스트 Ming-Chi Kuo)에 따르면 NVIDIA는 **GDDR7을 폐기하고 168 GB HBM4로 CPX를 재설계**, **1Q27 양산**. CoWoS-S/CoWoS-L 재패키징 필요. "**the case for CPX now rests on prefill efficiency rather than cheaper memory**" | **2026-09-02경 보도** | Hardware Busters https://hwbusters.com/news/nvidia-revives-rubin-cpx-with-hbm4-ditching-the-cheap-gddr7-that-justified-it/ ; Profesional Review https://www.profesionalreview.com/2026/09/02/nvidia-rubin-cpx-hbm4-gddr7/ | ⚠️ **애널리스트 보도. NVIDIA 공식 확인 미확보 (§7-5)** |
| C-12 | **함의**: 컨텍스트(프리필) 전용 가속기조차 **값싼 메모리 → HBM으로 회귀**했다. "컨텍스트 처리가 HBM을 떠난다"는 명제의 가장 직접적인 반례 | 2026-09 | C-10·C-11 대조 | ⚠️ (해석, 단 날짜 대조에 근거) |

### 5-C. 스토리지는 HBM의 **대체재가 아니라 보완재/추가 계층**이다

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| C-20 | **벤더 본인의 표현이 "추가(additional)"다**: SK hynix — NAND를 GPU 인근에 두어 "**an additional KV cache repository**"로 쓴다 | V-01·V-02 | 🟡 |
| C-21 | **Micron의 계층 정의는 HBM을 빼지 않는다**: HBM = **hot KV cache**, DC SSD = **persistent KV cache**, 고용량 = 데이터 레이크 | V-30 | 🟡 |
| C-22 | **Kioxia가 "더 이상 못 따라간다"고 지목한 것은 HBM이 아니라 DRAM이다**: "As KV Cache grows …, **DRAM alone can no longer keep pace**" | V-22 | 🟡 |
| C-23 | 애널리스트 정리: "**HBM and DDR/SSD offload do not compete with each other directly, just like how DRAM is not cannibalistic to L1/L2/L3 cache demand for CPU**" | 404K Research 요약 https://404kresearch.substack.com/p/the-ai-memory-demand-landscape-the | 🟡 |
| C-24 | 애널리스트 정리: "**CXL, Storage Next, CMX, HBF, and HBC are not simple substitutes; they address different bottlenecks and occupy different positions in the architecture**." 잘 최적화된 시스템은 "**currently used KVs in HBM, infrequently used KV in DDR, and very rarely used KV in NVMe**" | 상동 | 🟡 |
| C-25 | **수요 이중계상 경고**: "**moving the same data block across tiers cannot be double-counted as incremental demand at every layer. When compression, sharing, and reuse boost utilization, the required capacity per workload can actually decline**" | 상동 | 🟡 — **덱에서 EB 전망을 인용할 때 반드시 함께 읽어야 함** |
| C-26 | **시뮬레이션 결과도 "용량"의 승리다**: 73배 세션 확대·62배 비용 절감의 출처가 **티어 용량비 1:8:64**이지 배치 정책이 아니다 | W-33 | 🟡 |
| C-27 | **CMX는 HBM 용량의 55배 규모 별도 계층**(GPU당 16 TB vs HBM 288 GB) — 대체가 아니라 신설 | V-53 | ⚠️ 파생 |

### 5-D. 대역폭·지연 갭 — 오프로드가 언제 도움이 되고 언제 해가 되는가

| ID | 사실 | 수치 | 출처 | 등급 |
|---|---|---|---|---|
| C-30 | **Tutti 논문(arXiv 2605.03375, 2026-05)**: "existing SSD-backed KV cache solutions suffer from poor I/O performance and significant **GPU stalls (70–80% GPU bubble time)**" | **GPU 버블 70~80%** | https://arxiv.org/abs/2605.03375 ; 리뷰 https://www.themoonlight.io/en/review/tutti-making-ssd-backed-kv-cache-practical-for-long-context-llm-serving | 🟡 |
| C-31 | Tutti 개선치: SOTA **GDS-enabled SSD 기반 솔루션 대비 TTFT −78.3%**(엄격한 SLO 하), 요청률 **2배**, 서빙 비용 **약 −27%** | −78.3% | 상동 | 🟡 — **역으로 읽으면, 개선 전 SSD 경로는 그만큼 나빴다** |
| C-32 | 대역폭 대비: 64K 시퀀스·히트율 75% 조건에서 **DRAM–HBM 50 GB/s** vs **SSD 2대 피크 읽기 29 GB/s / 쓰기 12 GB/s** | 50 vs 29/12 GB/s | py-kvcache 특성화 https://pith.science/paper/2609.11744 | ⚠️ (단일 연구, 구성 의존) |
| C-33 | "**SSD tier is inefficient even with GDS** … restoring KV cache becomes highly inefficient even with aggregated KV transfer and asynchronous I/O" | — | 상동 | ⚠️ |
| C-34 | **LMCache: HBM 압박이 작을 때는 3~5% 오버헤드만 발생하고 이득이 없다** — 오프로드는 KV 풋프린트가 GPU 메모리를 초과할 때만 유효 | 3~5% 오버헤드 | 상동 계열 요약 | ⚠️ |
| C-35 | **오늘 KV 캐시 티어의 미디어는 TLC이지 QLC가 아니다**: CMX 타깃으로 벤더가 지명한 드라이브가 전부 TLC(PM1753·PM1763·Kioxia CM10·Solidigm PS1010/1030). CMX 발표 후 **TLC 현물가 반등** | — | TrendForce 2026-08-18 https://www.trendforce.com/news/2026/08/18/news-nvidia-vera-rubin-spillover-from-hbm-to-nand-cmx-fuels-tlc-spot-price-rebound-from-june-dip/ ; 레포 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.3 | 🟡 |
| C-36 | **내구성 갭**: KV 캐시 타깃 제품은 1~3 DWPD TLC로 수렴하고 ScaleFlux는 유효 7~10+ DWPD를 요구 스펙으로 제시. 반면 최신 QLC eSSD 정격은 **0.075~0.6 DWPD** → **10~40배 갭** | 10~40× | 레포 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.1 | 🟡 |

### 5-E. 모델·알고리즘 측 효율 개선이 KV 풋프린트 자체를 줄인다

| ID | 사실 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| C-40 | **DeepSeek-V4.1-Flash**: 글로벌 KV 캐시가 **토큰당 3,514 bytes → 890 bytes**. V4-Flash 대비 **KV 캐시 HBM 요구 −75%, 영속 SSD 요구 −87.5%**. 552B 백본 MoE, **1M 컨텍스트**, FP4 KV 캐시, cross-layer attention reuse | −75% HBM / **−87.5% SSD** | **2026-09-10** | arXiv 2609.19969 https://arxiv.org/abs/2609.19969 ; MarkTechPost https://www.marktechpost.com/2026/09/10/deepseek-ai-released-deepseek-v4-1-flash-with-1m-context-fp4-kv-cache-and-cross-layer-attention-reuse/ ; Yahoo Finance https://finance.yahoo.com/technology/ai/articles/deepseek-cut-kv-cache-hbm-011603128.html | 🟡 — **SSD 절감(−87.5%)이 HBM 절감(−75%)보다 크다. 스토리지 쪽이 더 크게 깎였다** |
| C-41 | **Google TurboQuant** (Google Research, ICLR 2026): KV 캐시를 element당 **3~4 bit**로 압축, **6배 압축·정확도 손실 사실상 없음·재훈련/보정 불필요** | 6× | **2026-03-24** | https://www.infoq.com/news/2026/04/turboquant-compression-kv-cache/ ; TrendForce https://www.trendforce.com/news/2026/03/26/news-decoding-googles-turboquant-6x-kv-cache-cut-headwind-for-memory-players/ | 🟡 |
| C-42 | **NVIDIA KVTC** (KV Cache Transform Coding, ICLR 2026): **최대 20배 압축**, 정확도 손실 **1%p 미만**(1.5B~70B 모델), 보정 데이터 필요, **Dynamo에 통합·vLLM 호환** | 20× | 2026 | 상동 InfoQ | 🟡 |
| C-43 | **시장 반응**: TurboQuant 발표 후 **삼성·SK하이닉스·마이크론 주가 하락**. TrendForce 기사 제목 자체가 "**Headwind for Memory Players?**" | — | 2026-03-26 | C-41 출처 | 🟡 |
| C-44 | **컨텍스트 윈도우 헤드라인 수치는 2024년 이후 폐쇄형 모델 기준 1M 근방에서 정체** — "컨텍스트가 계속 폭증하므로 KV 캐시도 계속 폭증한다"는 전제가 2026년 데이터에 완전히 부합하지는 않는다 | — | 2024~2026 | S-21 | 🟡 |

### 5-F. HBM 쪽 자체의 둔화 신호 (반증의 반증 — 양쪽 다 기록)

| ID | 사실 | 시점 | 출처 | 등급 |
|---|---|---|---|---|
| C-50 | **HBM 수요 성장률은 둔화 중**: +130% YoY(2025) → **+70% YoY(2026)** | 2025~2026 | Q-03 | 🟡 |
| C-51 | **SK hynix가 HBM4 램프를 늦췄다**: 당초 2Q26 → **3Q26**으로 연기. 사유는 (a) HBM3E 수요 지속으로 기존 라인 연장 가동, (b) **NVIDIA의 Rubin 양산 지연으로 HBM4 수요 시점이 밀림** | **2025-12-08 보도** | TechPowerUp https://www.techpowerup.com/343802/sk-hynix-slows-down-hbm4-ramp-prepares-300-layer-nand-flash | 🟡 |
| C-52 | Samsung·SK hynix의 HBM4 전략 분화 보도: Samsung HBM4 매출 $1B 돌파 vs SK hynix 램프 속도 조절 | 2026-06-23 | TrendForce https://www.trendforce.com/news/2026/06/23/news-memory-giants-split-on-hbm4-strategy-samsung-hbm4-sales-reportedly-tops-1b-sk-hynix-slows-ramp/ | 🟡 |
| C-53 | 베어 케이스 논점: "**HBM 수요 성장이 Micron의 캐파 램프보다 빨리 둔화되면 HBM이 부족에서 과잉으로 전환되어 마진을 무너뜨린다**" | 2026-09-07 | https://invezz.com/news/2026/09/07/micron-stock-could-doubling-hbm-capacity-create-an-oversupply-headwind/ | 🟡 |
| C-54 | **HBF는 아직 제품이 아니다**: 규격만 공표(2026-08-03), 첫 다이 테이프아웃(2026-08-13 발표), **샘플 2027 / 양산 2028**. 당초 2025-08 계획(샘플 2H26)에서 **1년 이상 지연** | 2025-08 → 2026-08 | V-44 | 🟡 |
| C-55 | **NVIDIA가 자사 KV 블록 매니저(KVBM)를 deprecate**(2026-09-18, v1.5.0, 제거 목표 v1.6.0). 대체 경로는 "엔진 네이티브 KV 오프로딩" | 2026-09-18 | W-20·W-21 | ✅ |

---

## §6. "HBM → 스토리지 이동" 프레이밍이 지지되는 지점과 지지되지 않는 지점 (덱 작성자 필독)

**지지되는 것 (사실이 뒷받침함)**

1. **KV 캐시가 HBM 용량을 초과한다는 진단은 HBM 1위 벤더 본인이 공개적으로 말했다.** SK hynix가 2026 2분기 실적 콜에서 "KV 캐시를 저장할 HBM 용량이 한계에 도달"이라고 밝히고 near-GPU storage 개발을 공표했다(V-01). 이것이 이번 수집에서 확보한 가장 강한 단일 근거다.
2. **소프트웨어 스택의 SSD 계층은 실재하고, 메인라인이며, 2년치 커밋 이력이 있다.** LMCache 디스크 캐시 2024-08 → GDS 2025-06 → Dynamo GPU↔디스크 직결 2025-10 → vLLM 다계층 프레임워크 2026-05 → vLLM 디스크 커넥터 다수 2026-08 (§3-A, 전부 ✅).
3. **플랫폼 레벨 계층이 신설됐다.** NVIDIA가 G3(로컬 NVMe)와 G4(공유 스토리지) 사이에 **G3.5(CMX)**를 정의하고 GPU당 16 TB를 붙였다(V-50·V-51).
4. **비트 수요의 무게중심이 엔터프라이즈 SSD로 이동했다.** 전 세계 NAND 비트 출하 중 eSSD 비중이 **1년 만에 26% → 48%**(Q2 2026, Counterpoint, Q-06).

**지지되지 않는 것 (덱에서 주의)**

5. **"이동(shift)"이 아니라 "증설(additive)"이다.** 벤더 본인의 단어가 "additional KV cache repository"(SK hynix, V-02)이고, Micron의 계층 정의는 **HBM을 hot KV cache로 유지한 채** SSD를 persistent KV로 추가한다(V-30). Kioxia가 "못 따라간다"고 지목한 대상은 HBM이 아니라 **DRAM**이다(V-22).
6. **GPU당 HBM 용량이 같은 기간에 4배가 된다.** 96/192 GB → 216/288 GB(2026) → 384 GB(2027)(C-04). "HBM에서 빠져나간다"는 서사와 정면으로 어긋난다.
7. **컨텍스트 전용 가속기조차 값싼 메모리에서 HBM으로 되돌아왔다.** Rubin CPX는 128 GB GDDR7로 발표됐다가 **168 GB HBM4로 재설계**되었다(C-10·C-11·C-12). 단 이는 애널리스트 보도이며 NVIDIA 공식 확인이 없다.
8. **이득의 출처가 "계층 지능"이 아니라 "값싼 용량"이다.** 73배 세션 확대·62배 비용 절감은 **티어 용량비 1:8:64**에서 나왔고 배치 정책에서 나오지 않았다(W-33). 즉 SSD의 기여는 대체가 아니라 **용량 증설**로 설명된다.
9. **오프로드 경로는 아직 비싸다.** 기존 SSD 기반 KV 캐시 솔루션의 **GPU 버블이 70~80%**(C-30)이고, HBM 압박이 작으면 오프로드가 3~5% 오버헤드만 남기고 이득이 없다(C-34).
10. **모델 측 효율이 수요 총량을 깎는다 — 그것도 SSD를 더 크게 깎는다.** DeepSeek V4.1-Flash는 KV 캐시 HBM 요구를 −75%, **영속 SSD 요구를 −87.5%** 줄였다(C-40). TurboQuant 6배·KVTC 20배 압축도 같은 방향이다(C-41·C-42).
11. **"KV 캐시 = QLC"는 아직 성립하지 않는다.** 오늘 이 티어는 TLC로 서비스되고 있고(C-35), QLC 정격과 KV 캐시 요구 내구성 사이에 **10~40배 갭**이 있다(C-36).
12. **NVIDIA가 자기 KV 블록 매니저를 deprecate했다**(2026-09-18, ✅). 디스크 티어가 사라진 것은 아니지만, "NVIDIA가 KV 캐시 전용 계층 소프트웨어를 소유한다"는 서사는 수정해야 한다(W-20~W-23).

**사실이 지지하는 안전한 재프레이밍 후보**

- ✅ "**KV 캐시가 HBM 용량을 초과한다는 것은 HBM 1위 업체 본인의 공개 진단이다**" — V-01 직접 지지.
- ✅ "**스토리지는 HBM을 대체하지 않고, HBM 위에 50배 규모의 새 계층을 붙인다**" — V-30·V-51·V-53·C-23·C-24 지지.
- ⚠️ "**AI 메모리 수요가 HBM에서 스토리지로 이동한다**" — 지지 불충분. §6-5~12 참조. 특히 C-04(GPU당 HBM 4배)·C-11(CPX의 HBM4 회귀)에 반박당한다.

---

## §7. 공개 자료의 공백 (덱에 쓰면 안 되는 것)

이번 수집에서 **확보하지 못한** 것들이다. 부정적 확인도 기록 가치가 있으므로 검색어와 함께 남긴다.

1. **"KV 캐시 오프로드가 HBM 수요를 몇 % 줄인다/늘린다"는 정량 추정치 — 확보하지 못했다.**
   검색어: `"KV cache" offload reduce HBM demand percent`, `KV cache offload cannibalize HBM TAM`, `"does not reduce HBM demand" KV cache`.
   결과: **어떤 벤더·애널리스트도 오프로드에 따른 HBM 수요 증감을 수치로 공개하지 않았다.** 정성적 진술(C-23·C-24·C-25)만 존재한다. → 덱에서 "오프로드로 HBM 수요가 X% 줄어든다/늘어난다"는 **어떤 숫자도 쓸 수 없다.**

2. **"AI NAND"가 전체 NAND 비트의 몇 %인지에 대한 일관된 공개 수치 — 확보하지 못했다.**
   확보한 것은 분모가 서로 다른 세 수치다: 엔터프라이즈 SSD 48%(Counterpoint, Q2 2026 — AI 전용이 아님), SanDisk "2030년 AI DC NAND 워크로드 중 KV 캐시 35%"(분모가 AI DC NAND 워크로드), Kioxia "증분 DC 수요의 86%가 AI 추론"(분모가 증분 DC 수요). **세 수치를 섞어 쓰면 안 된다.**

3. **NAND 매출 전망의 출처 간 충돌 — 해소하지 못했다.** TrendForce 2026 $174.1B(+138.5%) vs 다른 집계 2027 $126B(Q-05). 2026 수치가 2027 수치보다 크다. 집계 범위·가격 기준(계약가/현물가)·환산 방식 미확인 → **덱에 병기 금지.**

4. **B200의 HBM 용량 — 단일 확정치를 확보하지 못했다.** 180 GB와 192 GB가 출처마다 혼재(S-03). NVIDIA 공식 데이터시트 직접 확인 필요(이번 세션 nvidianews·docs.nvidia.com 접근 차단).

5. **Rubin CPX의 GDDR7 → HBM4 전환에 대한 NVIDIA 공식 확인 — 확보하지 못했다.** 확보한 것은 애널리스트(Ming-Chi Kuo) 발 보도 경유뿐(C-11). §6-7의 논거로 쓰되 "보도에 따르면"을 반드시 붙일 것.

6. **Samsung KV 캐시 백서의 TTFT·처리량 실측치 — 확보하지 못했다.** `download.semiconductor.samsung.com` PDF가 egress 정책으로 차단됐다. 확보한 것은 PM1753 스펙(14.5 GB/s, 3.3M IOPS)과 백서 존재·저자뿐(V-32).

7. **프로덕션에서 KV 캐시가 HBM/DRAM/SSD에 각각 몇 %씩 안착하는지 — 공개 실측치를 확보하지 못했다.**
   확보한 것은 (a) 시뮬레이터 결과의 **티어 용량비 1:8:64**(W-33), (b) 벤치마크 캐시 히트율(HiCache 40%→80%, W-30), (c) Dynamo의 **빈도 ≥2 블록만 디스크로 내리는 필터**(W-34)뿐이다. **"KV 캐시의 X%가 SSD에 있다"는 문장은 쓸 수 없다.**

8. **SanDisk·Kioxia·Counterpoint·TrendForce의 IR/리서치 원문 PDF — 직접 읽지 못했다.** §2·§4의 해당 수치는 전부 검색 인덱스 요약 경유(🟡)다. 덱에 쓸 경우 **원문 재확인 후 등급 상향**이 필요하다.

9. **HBF의 실측 지연(latency)·쓰기 내구성·전력 수치 — 확보하지 못했다.** OCP 규격 공표 보도에서 확보한 것은 용량(512 GB)·대역폭 등급(0.4~3.0 TB/s)·인터페이스(UCIe)뿐이다(V-41). "HBM 대비 8~16배 용량"(V-43)은 조건이 명시되지 않은 벤더 주장이다.

10. **SanDisk "고내구 KV cache 구성(BiCS10 QLC)"의 DWPD·WAF — 여전히 미공개**(레포 기존 수집과 동일, V-12). QLC를 KV 캐시 티어에 넣는다는 유일한 공개 사례인데 정량이 없다.

---

## §8. 덱 1장에 쓸 수 있는 문장

아래 문장은 **쓰인 그대로 방어 가능**하도록 다듬었다. 각 문장에 등급과 출처를 붙였다.

1. **"KV 캐시를 담을 HBM 용량이 한계에 도달하고 있다 — 이것은 외부 관측이 아니라 HBM 1위 업체 SK hynix가 2026년 2분기 실적 발표에서 직접 밝힌 진단이며, 같은 자리에서 GPU 인근 NAND(near-GPU storage) 개발을 공표했다."**
   🟡 — Seoul Economic Daily, 2026-07-29 ([링크](https://en.sedaily.com/finance/2026/07/29/sk-hynix-developing-new-nand-products-for-kv-cache-demands))

2. **"단일 사용자의 128K 컨텍스트 KV 캐시가 Llama 3 70B 기준 약 40 GB이고 사용자 수에 선형 비례한다 — H100 80 GB의 절반, Rubin 288 GB의 7분의 1이 사용자 한 명에 소모된다."**
   🟡 — NVIDIA Developer Blog ([링크](https://developer.nvidia.com/blog/accelerate-large-scale-llm-inference-and-kv-cache-offload-with-cpu-gpu-memory-sharing)); GPU 용량은 S-01·S-05. *(사용자 수 환산은 ⚠️ 파생 산술이므로 "7분의 1" 부분은 각주 처리 권장)*

3. **"오프로드는 슬라이드 위의 개념이 아니라 메인라인 코드다 — LMCache 디스크 캐시 2024-08, GPUDirect Storage 백엔드 2025-06, NVIDIA Dynamo의 GPU↔디스크 직결 2025-10, vLLM 다계층 오프로딩 프레임워크 2026-05가 모두 머지된 PR로 확인된다."**
   ✅ — GitHub PR [LMCache #52](https://github.com/LMCache/LMCache/pull/52), [#773](https://github.com/LMCache/LMCache/pull/773), [Dynamo #3510](https://github.com/ai-dynamo/dynamo/pull/3510), [vLLM #40020](https://github.com/vllm-project/vllm/pull/40020)

4. **"수요의 무게중심은 이미 이동했다 — 전 세계 NAND 비트 출하에서 엔터프라이즈 SSD 비중이 1년 만에 26%에서 48%로 올라갔고, Kioxia는 데이터센터 NAND 수요가 2025년 295 EB에서 2028년 1,807 EB로 커지며 그 증분의 86%가 AI 추론이라고 전망했다."**
   🟡 — Counterpoint Q2 2026 ([링크](https://counterpointresearch.com/en/insights/server-led-essds-hit-48-percent-of-nand-shipments)); Kioxia Investor Day 2026-06-02 ([링크](https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html))

5. **[정직한 한계 — 반드시 포함] "그러나 이것은 'HBM에서 스토리지로의 이동'이 아니라 'HBM 위에 얹은 증설'이다 — 벤더 본인의 단어가 '추가(additional) KV 캐시 저장소'이고, Micron은 HBM을 hot KV cache로 유지한 채 SSD를 persistent KV로 추가하며, 같은 기간 GPU당 HBM 용량은 192 GB에서 288 GB를 거쳐 2027년 384 GB로 올라간다."**
   🟡 — SK hynix(V-01·V-02); Micron COMPUTEX 2026-06-01 ([링크](https://investors.micron.com/news-releases/news-release-details/micron-powers-ai-everywhere-computex-2026)); TrendForce HBM 전망(S-06·S-08)

6. **[정직한 한계 — 반드시 포함] "수요 총량은 모델 측 효율 개선에 노출되어 있고, 그 타격은 HBM보다 스토리지에 더 크다 — DeepSeek V4.1-Flash(2026-09-10)는 KV 캐시의 HBM 요구를 75%, 영속 SSD 요구를 87.5% 줄였다."**
   🟡 — arXiv 2609.19969 ([링크](https://arxiv.org/abs/2609.19969)); Yahoo Finance ([링크](https://finance.yahoo.com/technology/ai/articles/deepseek-cut-kv-cache-hbm-011603128.html))

> **덱 사용 금지 문장 (§7 근거)**: "KV 캐시 오프로드로 HBM 수요가 N% 줄어든다", "KV 캐시의 N%가 SSD에 안착한다", "AI NAND가 전체 NAND의 N%다", "NAND가 HBM보다 X배 빨리 성장한다"(금액 vs 비트 단위 불일치, Q-09). 넷 다 이번 수집에서 **근거를 확보하지 못했다.**
