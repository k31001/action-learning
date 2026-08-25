# FDP 오픈소스 생태계 현황 지도 — 웹 리서치

**수집일**: 2026-08-18
**목적**: 「삼성 SSD 전략적 방향성」 v1.1 반영 — ① "왜 이번에는 다른가"(ZNS 대비 호스트 복잡도·생태계 성숙 근거) ② AI DC에서 FDP가 자리 잡기 위한 오픈소스 생태계 지도(현황과 공백)
**출처**: Phoronix, LWN, xNVMe 문서, CacheLib 공식 문서, LPC25, NVM Express, LMCache·vLLM·llm-d 문서, SNIA (URL 하단)

---

## 1. 커널·드라이버 계층 — 메인라인 진입이 시작됐다

- **Linux 5.19+**: NVMe I/O Passthru(io_uring_cmd) 경유 FDP 사용 가능 — 단 응용이 직접 passthrough를 다뤄야 하는 우회로.
- **Linux 6.16 (2025)**: **블록 계층 write streams 도입 — NVMe FDP를 블록 디바이스·io_uring의 per-IO write stream으로 노출** (Phoronix "Linux 6.16 To Introduce Block Write Streams For NVMe FDP", LWN "Flexible data placement"). 수년 간의 LKML 논쟁(write hints 부활) 끝의 메인라인 수용 — Streams·ZNS가 끝내 얻지 못한 것.
- 진행 중: 파일시스템 계층 힌트 연결(기존 인프라 재사용 방향) — LPC25 "Data Placement at Scale" 세션.

## 2. 개발 도구 계층 — 사실상 성숙

- **fio**: FDP 명령·로그 페이지 업스트림 지원 + xNVMe ioengine 경유 지원(3.35+)
- **nvme-cli**: FDP 구성·상태 관리 지원
- **QEMU 8.0+**: FDP 완전 에뮬레이션(RU·RUH) — 개발·CI에서 실기기 없이 검증 가능
- **SPDK**: FDP 지원 — 유저스페이스 스토리지 스택 경로
- **xNVMe**: FDP 튜토리얼·API 제공 (0.7.5 문서)

## 3. 스토리지 엔진·응용 계층 — 실채택 시작, 확산은 초기

- **CacheLib (Meta)**: 공식 문서에 "FDP enabled cache" — 프로덕션 캐시 엔진의 공식 FDP 지원 (cachelib.org)
- RocksDB 등 여타 엔진: 커널 write streams 경유 연결이 이제 가능해진 단계 — 확산 과제
- SEF SDK(Software-Enabled Flash) 등 인접 프로젝트 존재

## 4. AI 추론 스택 계층 — SSD 오프로드는 일반화, FDP 인지는 공백

- **LMCache**: vLLM의 KV 캐시를 CPU·디스크로 계층화하는 사실상 표준 엔진 — **vLLM·SGLang·NVIDIA Dynamo 세 추론 엔진 모두 지원**, 디스크 지속화(재시작에도 캐시 유지). in-process(LMCacheConnectorV1)·multi-process(분산 공유) 두 모드 (docs.lmcache.ai, vLLM production-stack 문서)
- **llm-d**: "Native KV Cache Offloading to Any Filesystem" — 파일시스템 일반화 오프로드 (llm-d.ai)
- **NVMe KV 캐시 오프로드 실증**: H100 1장에서 동시 사용자 10배 (Spheron 2026, 기존 수집 [kv-cache-ssd-offload-ecosystem-2026-08.md](kv-cache-ssd-offload-ecosystem-2026-08.md)와 일치). GPU HBM → CPU DRAM → NVMe SSD 3계층 구조가 표준화 중
- SNIA FAST 병행 세션: LLM KV-Cache SSD 오프로드의 예측성·처리량 트레이드오프 연구 등장 — 학계·업계 관심 확대
- **공백**: LMCache·llm-d의 SSD 백엔드는 **일반 파일시스템/블록 쓰기** — KV 캐시 블록의 수명·재사용 정보를 FDP 배치 힌트로 전달하는 **FDP 인지 백엔드는 부재**. KV 캐시는 수명 태깅이 명확한 워크로드라 FDP 적합성이 높다(가설 — [kv-cache-ssd-offload-ecosystem-2026-08.md](kv-cache-ssd-offload-ecosystem-2026-08.md)의 분석적 관찰). 커널 6.16 write streams가 이 연결의 기술적 전제를 이제 막 제공.

## 5. 시사점 (보고서 v1.1 반영용)

1. **계층별 성숙도 비대칭**: 디바이스~커널~도구 계층은 성숙(1·2절), 응용~AI 스택 계층이 공백(3·4절) — 생태계 투자의 표적이 명확하다.
2. **"왜 이번에는 다른가"의 생태계 증거**: Streams·ZNS는 메인라인에 자리 잡지 못했지만, FDP는 커널 6.16 블록 write streams로 메인라인에 진입 — 하위 호환(힌트 없이도 동작) 설계가 만든 차이.
3. **1호 과제의 구체 경로**: LMCache FDP 인지 백엔드(커널 6.16 write streams 경유) 기여 → Dynamo·llm-d로 확산 — AI DC에서 FDP가 자리 잡기 위한 최단 경로이자 선점 가능한 공백.

## 6. URL

- https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16
- https://lwn.net/Articles/1018642/
- https://lpc.events/event/18/contributions/1737/attachments/1405/3052/LPC25.pdf
- https://xnvme.io/tutorial/fdp/index.html
- https://cachelib.org/docs/Cache_Library_User_Guides/FDP_enabled_Cache/
- https://nvmexpress.org/wp-content/uploads/FMS-2023-Flexible-Data-Placement-FDP-Overview.pdf
- https://docs.lmcache.ai/getting_started/quickstart/offload_kv_cache.html
- https://docs.vllm.ai/projects/production-stack/en/vllm-stack-0.1.2/tutorials/kv_cache.html
- https://llm-d.ai/blog/native-kv-cache-offloading-to-any-file-system-with-llm-d
- https://www.spheron.network/blog/nvme-kv-cache-offloading-llm-inference/
- https://www.snia.org/sniadeveloper/session/19768
