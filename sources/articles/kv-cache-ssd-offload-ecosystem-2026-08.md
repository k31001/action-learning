# KV Cache → SSD 오프로드 생태계 — 웹 리서치 (2026-08-09)

**수집일**: 2026-08-09
**유형**: 웹 검색 기반 기술 생태계 조사
**용도**: `outputs/storyline/` SSD 제안서 5장 1절(워크로드 최적화 SSD 수요의 동인) — KV Cache 응용의 SSD 도입 현황. [nvidia-cmx-scada.md](../../wiki/entities/nvidia-cmx-scada.md) 보완
**핵심**: KV 캐시의 SSD 오프로드는 실재하며 가속 중. 단, **워크로드↔스토리지를 잇는 소프트웨어 계층은 NVIDIA(Dynamo·NIXL·CMX)와 오픈소스(LMCache·Mooncake)가 선점 중** — SSD 벤더의 자리는 오케스트레이션 계층 경쟁이 아니라 "그 아래의 최적 백엔드 + 디바이스 계층"이다.

---

## §1. 왜 KV Cache가 SSD로 내려오는가

- 장문맥·에이전틱·멀티턴 추론에서 KV 캐시가 GPU HBM을 소진 — prefix 재계산(prefill) 비용을 피하려면 캐시를 버리지 않고 계층화해야 함
- NVMe KV 캐시 오프로딩으로 **단일 H100이 동시 사용자 10배 서빙** 가능 주장 (Spheron, 2026) — 오프로드의 경제성이 GPU 증설 대비 압도적
- KV 캐시 블록은 수명·재사용·퇴거(eviction) 패턴이 명확 → **FDP의 RU 태깅과 자연 정합** (분석적 관찰 — 세션 단위 수명 데이터를 RUH로 분리하면 WAF·격리 동시 개선 여지)

## §2. 소프트웨어 계층의 경쟁 지형 (2026-08 시점)

| 주체 | 자산 | 위치 |
|---|---|---|
| **NVIDIA Dynamo** | 분산 추론 프레임워크 — KV 오프로딩 계층: GPU HBM → CPU DRAM → 로컬 SSD → 네트워크 스토리지. NIXL이 prefill/decode 워커 간 KV 전송 계층 | 오케스트레이션 |
| **NVIDIA ICMSP→CMX** | CES 2026 발표 — 추론 컨텍스트의 NVMe SSD 오프로드 표준화. 4계층 구조, NVMe 상주 KV 캐시를 컨텍스트 메모리 주소 공간에 편입 | 플랫폼 표준 |
| **LMCache** | vLLM·SGLang·Dynamo 지원 KV 캐시 엔진. 백엔드: CPU 메모리·파일시스템·Mooncake·ValKey. 2026-03 Dynamo 1.0과 공식 통합 (동일 NIXL 프리미티브 공유) | 미들웨어 (OSS) |
| **Mooncake** (Moonshot AI 발) | KVCache 중심 분리형(disaggregated) 아키텍처 — prefill/decode 클러스터 분리, GPU 클러스터의 유휴 CPU·DRAM·SSD를 묶은 분산 KVCache 풀 | 아키텍처 (OSS) |
| 학계 (2026) | CXL 기반 분리형 KV 캐시(SAC), 엣지 NVMe-direct 오프로딩(DUAL-BLADE), 적응형 KV 재사용 등 논문 다수 | 선행 연구 |

## §3. 전략 함의 (제안서 반영 지침)

1. KV Cache는 "워크로드에 최적화된 SSD 필요성"의 **최신·최대 실증 사례** — 제안서 5.1의 핵심 사례로 사용 가능 (SSD가 저장 장치에서 추론 파이프라인의 성능 부품으로 이동)
2. 단, 이 계층의 오케스트레이션 SW는 NVIDIA·OSS가 이미 점유 — 삼성 플랫폼 전략은 이들과의 정면 경쟁이 아니라 그 **아래 계층**(Dynamo/LMCache/CacheLib가 호출하는 최적 FDP 백엔드 + 디바이스 최적화 + 통합 서비스)으로 들어가야 성립
3. AI SSD 하드웨어 트랙에서 삼성은 후발 (SK AI-N P·Kioxia·Micron의 NVIDIA 공동개발 대비, [ssd-ufs-market.md](../../wiki/concepts/ssd-ufs-market.md) ⚠️와 정합) — SW·플랫폼 전략의 실행 시간 창이 좁음

## 원본 링크

- Spheron — NVMe KV Cache Offloading for LLM Inference (2026): https://www.spheron.network/blog/nvme-kv-cache-offloading-llm-inference/
- NVIDIA Dynamo Docs — KV Cache Offloading: https://docs.nvidia.com/dynamo/backends/v-llm/kv-cache-offloading
- Blocks & Files — Nvidia and its partners' KV Cache extenders (2026-03-30): https://www.blocksandfiles.com/ai-ml/2026/03/30/nvidia-and-its-partners-kv-cache-extenders/5209284
- LMCache Blog — LMCache + NVIDIA Dynamo 1.0 (2026-03-16): https://blog.lmcache.ai/en/2026/03/16/lmcache-nvidia-dynamo-1-0-a-match-made-in-inference-heaven/
- Mooncake Docs: https://kvcache-ai.github.io/Mooncake/
- BentoML — KV cache offloading (LLM Inference Handbook): https://bentoml.com/llm/inference-optimization/kv-cache-offloading
- arXiv — SAC: Disaggregated KV Cache System for Sparse Attention LLMs with CXL: https://arxiv.org/pdf/2606.19746
- arXiv — DUAL-BLADE: Dual-Path NVMe-Direct KV-Cache Offloading: https://arxiv.org/pdf/2604.26557
- arXiv — Adaptive KV Cache Reuse for Fast Long-Context LLM Serving: https://arxiv.org/pdf/2605.24022
