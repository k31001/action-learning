# KV Cache Offloading의 SSD 수요·내구성 요구 — 웹 리서치 종합 (2026-08-05)

**수집일**: 2026-08-05
**유형**: 웹 검색 기반 2차 자료 종합 (FMS 2026 발표·벤더 발표·오픈소스 생태계 문서)
**용도**: [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §2.6 — 신규 수요(KV Cache)와 DWPD 갭(배경 슬라이드 데이터 기반)

---

## §1. KV Cache Offloading이 새 스토리지 계층이 된다

- LLM 추론에서 KV(Key-Value) 캐시를 GPU HBM → 호스트 DRAM → **SSD**로 내리는 오프로딩이 표준 아키텍처로 정착 중: **NVIDIA Dynamo**(KVBM 계층 관리)·**LMCache**·**Mooncake**·FlexKV(io_uring·GPUDirect Storage) 등 오픈소스 스택이 SSD 계층을 공식 지원 (NVIDIA Dynamo 문서, LMCache 블로그)
- NVIDIA **CMX**: BlueField 기반 KV 캐시 오프로드 플랫폼 — 기존 위키 [nvidia-cmx-scada.md](../../wiki/entities/nvidia-cmx-scada.md) 참조. VAST 등 스토리지 업체도 Dynamo 연동 발표
- 효과: 프리필(prefill) 재사용으로 GPU당 동시 사용자 수 확대·TTFT 단축 — SSD가 "추론의 캐시 계층"으로 승격

## §2. 수요 총량 전망 (SanDisk, FMS 2026 발표)

- **KV cache 단독으로 2027년까지 NAND 추가 수요 75~100EB**, **2028년에는 그 2배(150~200EB)** 전망
- **2030년 AI 데이터센터 NAND 워크로드의 ~35%가 KV cache**가 될 것으로 전망
- 랙 단위 환산: NVL144 랙 연 5만 대 생산 가정 시 **KV cache만으로 연 ~0.44EB**의 enterprise NAND 필요
- 맥락: enterprise SSD 시장은 2030년까지 연 ~35% 성장 전망, 2026년 enterprise 매출이 컨슈머를 역전 (보도 종합)

## §3. Write-intensive 특성과 DWPD 요구

- KV 블록 특성: 세션마다 생성·갱신, **짧고 제각각인 수명**, 유휴 후 재활성화, 세션·워커·테넌트에 걸친 **비동기 무효화** — 연속적 쓰기 부하 (ScaleFlux 발표·업계 문서)
- **요구 내구성: 유효 7~10+ DWPD (5년)** — ScaleFlux가 NVIDIA CMX·KV cache 오프로드 타깃 SSD 플랫폼에서 제시 (StorageReview·PR Newswire, 2026-07-30)
- **달성 수단이 FDP**: 동 플랫폼은 **200+ FDP 스트림**으로 수명이 다른 KV 블록을 분리 배치해 WAF를 낮춰 유효 DWPD를 확보 — FDP가 KV cache 내구성 문제의 표준 해법으로 등장
- 현행 제품 내구성 기준값 (공개 스펙): 고용량 QLC(Solidigm D5-P5336) **~0.6 DWPD** · TLC read-intensive(예: PM9A3급) **1 DWPD** · TLC mixed-use(예: PM1735급) **3 DWPD** — KV cache 요구(7~10+) 대비 **2~10배 이상 갭**

## 원본 링크

- SanDisk FMS 2026 KV cache 전망: https://www.kucoin.com/news/flash/sandisk-predicts-kv-cache-to-drive-35-of-ai-data-center-nand-workloads-by-2030
- ScaleFlux KV Cache SSD 플랫폼 (7~10+ DWPD·200+ FDP 스트림): https://www.storagereview.com/news/scaleflux-kv-cache-ssd-platform-claims-7-10-dwpd-and-200-fdp-streams
- ScaleFlux × NVIDIA CMX 발표: https://www.prnewswire.com/news-releases/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload-302838473.html
- NVIDIA Dynamo KV Cache Offloading 문서: https://docs.nvidia.com/dynamo/backends/v-llm/kv-cache-offloading
- LMCache × Dynamo: https://blog.lmcache.ai/en/2026/03/16/lmcache-nvidia-dynamo-1-0-a-match-made-in-inference-heaven/
- KV cache offloading 계층 해설: https://rdp.in/gpu-mart/knowledge-base/kv-cache-offloading-new-storage-tier-ai-inference/
- Solidigm D5-P5336 스펙(0.58 DWPD급): https://www.solidigm.com/products/data-center/d5/p5336.html
