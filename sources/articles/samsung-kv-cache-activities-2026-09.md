# 삼성의 KV 캐시 오프로딩·AI 추론 스토리지 SW 스택 활동 팩트 원장 — "KV 캐시 관리자 4종 삼성 기여 0" 재검증 (2026-09-28)

**수집일**: 2026-09-28
**수집자**: Research Agent — 사실 수집 전용. 전략 판단·권고 없음.
**유형**: GitHub 1차 원문(커밋 이력 전수 조회·PR 본문·저장소 파일·프로필) + 웹 검색 요약 기반 팩트 원장
**용도**: 발표 덱 문장 "KV 캐시 관리자 4종(LMCache · Mooncake · FlexKV · Dynamo KVBM) 공개 저장소에 삼성 기여 0"의 검증과 보강. 기존 원장 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md)(§1.1·§2·§4, 삼성 행)과 [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(X-02·X-03)을 **커밋 단위 조사로 확장·정정**한다. 두 원장에 이미 있는 사실(PM1753 CMX 공급, PM1763, BM1773, EuroSys'25 CacheLib FDP, Z-NAND 부활 등)은 반복하지 않고 ID로만 참조한다.

**등급**: ✅ 1차 원문 직접 열람(GitHub 커밋·PR 본문·저장소 파일·프로필 페이지) / 🟡 2차 매체 또는 검색 인덱스 요약 경유(1차 출처라도 원문을 직접 못 연 경우 포함) / ⚠️ 파생(본 원장이 산술로 도출, 산식 명기)·단일출처·미검증·충돌

---

## ⚠️ 0. 핵심 결론 (사실만)

1. **덱 문장은 4종 중 1종(LMCache)에서 틀렸다.** LMCache 기본 브랜치(`dev`) 커밋 2,394건 중 **62건**이 작성자·커미터 이메일 또는 `Signed-off-by`/`Co-authored-by` 트레일러에 `@samsung.com`을 포함한다(✅, §1·§2). 또한 LMCache `MAINTAINERS.md`는 **"Dongjoo Seo, Samsung, Committer"**를 메인테이너로 적고 있다(✅, A-01).
2. **나머지 3종(Mooncake · FlexKV · Dynamo KVBM)은 머지된 삼성 기여 0이 유지된다**(✅, §3). 전체 커밋 이력에서 `samsung.com` 연결 커밋 0건, LMCache·SGLang에서 확인된 삼성 엔지니어 GitHub 계정·개인 이메일로도 0건.
3. 삼성 기여의 내용은 **NVMe raw block 계층(Rust, `O_DIRECT`, io_uring, NVMe `io_uring_cmd` 패스스루) → NVMe FDP 배치(2026-08-05 머지)**, **Device-DAX(CXL 부착 메모리 등) 백엔드**, **3FS 백엔드**, **RDMA P2P**다(✅, §2). 조사한 KV 캐시 관리자·전송 라이브러리 중 **FDP 코드가 들어간 곳은 LMCache뿐**이며 이 코드는 삼성 엔지니어가 작성했다(✅, B-10).
4. 이 결과는 기존 원장의 두 문장과 **충돌**한다 — "①②계층은 어느 것도 FDP·write hint를 아직 쓰지 않는다(README 4종 확인)", "KV cache 관리자에 삼성 기여 흔적 없음(README 기준)". 기존 확인은 README 기준이었고, 본 원장은 커밋 이력 기준이다(§9).

## 0-1. 방법론·도구 제약

- **커밋 전수 조사**: 19개 저장소를 `git clone --filter=blob:none --bare`로 받아 기본 브랜치 전체 이력에서 (a) 작성자 이메일, (b) 커미터 이메일, (c) 커밋 본문 트레일러(`Signed-off-by`, `Co-authored-by`)에 `@samsung.com`이 있는 커밋을 셌다. 이것을 **"삼성 연결 커밋"**으로 정의한다. 조사일 2026-09-28.
- **보조 조사**: LMCache·SGLang에서 확인된 삼성 엔지니어의 GitHub 계정·개인 이메일(예: `commisori28@gmail.com`, `DongDongJu`, `daegyu94`, `ankit-sam`, `nayeonikim`, `2xdevv`/`3xdevv`, `jayhpark530`, `Wenwen-Chen`, `hunhokim`, `MMuzzammil1`)로 다른 저장소를 다시 검색했다. GitHub 검색 API(MCP)로 PR 제목·본문의 "samsung"도 검색했다.
- **소속 판정 근거**: 커밋의 `@samsung.com` 트레일러와 GitHub 프로필의 회사 표기. 개인 이메일만 쓰고 트레일러를 남기지 않은 삼성 직원은 **탐지할 수 없다**(과소 집계 가능).
- **egress 차단(이번 세션)**: `blog.lmcache.ai`, `docs.lmcache.ai`, `lmcache.ai`, `arxiv.org`, `export.arxiv.org`, `alphaxiv.org`, `semiconductor.samsung.com`, `download.semiconductor.samsung.com`, `news.samsungsemiconductor.com`, `news.samsung.com`, `zapply.jobs`, `dreamworkhq.com`, `ratatoskr.run`, `lore.kernel.org`, `lwn.net`, `phoronix.com`, `youtube.com`, `linkedin.com`, `storagenewsletter.com`, `snia.org`, `pliops.com`. `api.github.com`의 사용자 엔드포인트는 403("sessions are bound to their configured repositories"). **직접 열람이 가능했던 것은 github.com·raw.githubusercontent.com·git 프로토콜·GitHub 검색 API뿐**이다. 그래서 백서·블로그·채용 공고·논문은 전부 🟡다.

---

## §1. KV 캐시 관리자 4종 + 인접 추론 스택 — 저장소별 삼성 연결 커밋 집계 (기본 브랜치, 2026-09-28)

| ID | 저장소 (브랜치) | 전체 커밋 | 삼성 연결 커밋 | 비고 | 등급 |
|---|---|---|---|---|---|
| N-01 | **LMCache/LMCache** (`dev`) | 2,394 | **62** | 서로 다른 `@samsung.com` 주소 9개. 첫 삼성 연결 커밋 2025-11-03, 최신 2026-09-23. 2026-01-01 이후 1,324건 중 59건 | ✅ |
| N-02 | **kvcache-ai/Mooncake** (`main`) | 2,285 | **0** | 삼성 엔지니어 계정·개인 이메일로도 0 | ✅ |
| N-03 | **taco-project/FlexKV** (`main`) | 638 | **0** | 동일 | ✅ |
| N-04 | **ai-dynamo/dynamo** (`main`, KVBM 포함) | 7,453 | **0** | 동일. 코드 검색 "samsung" 0건 | ✅ |
| N-05 | ai-dynamo/nixl (`main`) | 1,236 | 0 | 단, 삼성 직원(프로필 기준) `jayhpark530`의 문서 오타 수정 1건(B-06) | ✅ |
| N-06 | sgl-project/sglang (`main`) | 19,022 | **8** | HiCache 스토리지·LMCache 커넥터·KV 전송 관련(B-07) | ✅ |
| N-07 | vllm-project/vllm (`main`) | 22,063 | 2 | 2024년, 투기적 디코딩 버그 수정·오타(KV 오프로드 무관) | ✅ |
| N-08 | NVIDIA/TensorRT-LLM (`main`) | 9,934 | 0 | | ✅ |
| N-09 | llm-d/llm-d · llm-d/llm-d-kv-cache | 1,505 · 393 | 0 · 0 | | ✅ |
| N-10 | vllm-project/aibrix · vllm-project/production-stack | 1,518 · 703 | 0 · 0 | | ✅ |
| N-11 | kvcache-ai/ktransformers · LMCache/lmcache-ascend | 1,347 · 138 | 0 · 0 | | ✅ |

- **⚠️ 파생**: LMCache 삼성 연결 커밋 비중 = 62 ÷ 2,394 ≈ **2.6%**(전 기간), 59 ÷ 1,324 ≈ **4.5%**(2026-01-01 이후).
- **⚠️ 보조 집계**: 같은 엔지니어들의 개인 이메일 커밋까지 포함하면 LMCache 연결 커밋은 **78건**(2025-10-16 첫 커밋)이다. 삼성 트레일러가 없는 커밋은 소속을 커밋 자체로 증명할 수 없어 ⚠️로 둔다.
- 저장소 URL: https://github.com/LMCache/LMCache · https://github.com/kvcache-ai/Mooncake · https://github.com/taco-project/FlexKV · https://github.com/ai-dynamo/dynamo · https://github.com/ai-dynamo/nixl · https://github.com/sgl-project/sglang · https://github.com/vllm-project/vllm · https://github.com/NVIDIA/TensorRT-LLM · https://github.com/llm-d/llm-d · https://github.com/llm-d/llm-d-kv-cache · https://github.com/vllm-project/aibrix · https://github.com/vllm-project/production-stack

---

## §2. LMCache 내 삼성 기여 상세

### 2-A. 거버넌스·소유권

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| A-01 | `MAINTAINERS.md` 현행본에 **"@dongjoo.seo1@samsung.com, Dongjoo Seo, Samsung, Committer"**. 같은 목록의 다른 소속은 UChicago·Tensormesh·IBM·Bytedance | 추가 2025-12-12(PR #2233), 소속 갱신 커밋 2026-09-16(#5130) 이후에도 유지 | https://github.com/LMCache/LMCache/blob/dev/MAINTAINERS.md ; https://github.com/LMCache/LMCache/commit/fd9616ea0d93ac2de4bfc5e666d04e425d534bb5 ; https://github.com/LMCache/LMCache/commit/60480f0e3defbce935dcf2bc3356b85decfb31c6 | ✅ |
| A-02 | `.github/CODEOWNERS`에서 `@DongDongJu`(Dongjoo Seo)가 소유자로 지정된 경로: `lmcache/v1/storage_backend/`, `lmcache/v1/distributed/`·`l2_adapters/`, `memory_management.py`, `multiprocess/`, `integration/sglang/`, `csrc/`·`csrc/storage_backends/`, `operator/`, `rust/`, CXL·Maru·DAX 백엔드와 문서 | 현행(2026-09-28 열람) | https://github.com/LMCache/LMCache/blob/dev/.github/CODEOWNERS | ✅ |
| A-03 | Dongjoo Seo의 GitHub 프로필: "Works at Samsung; PhD from UC Irvine", Saratoga, CA. LMCache 커밋 작성자 기준 **40건, 전체 15위**(`git shortlog -sn`). GitHub 검색상 LMCache에서 작성한 PR **83건**(모든 상태) | 2026-09-28 | https://github.com/DongDongJu | ✅ |
| A-04 | 삼성 연결 커밋의 `@samsung.com` 주소별 출현 수: dongjoo.seo1 125, syk0905.kwon 46, daegyu94.han 26, ankit.kumar 21, nayeoni.kim 12, tino.park 9, wenwen.chen 5, dongjin_.kim 4, daejun7.park 3 (트레일러 중복 포함 출현 횟수이며 커밋 수가 아님) | 2025-11~2026-09 | LMCache `git log` | ✅ |
| A-05 | 기여자 소속(GitHub 프로필): Ankit Kumar = **Samsung Semiconductor India Research**(Bangalore, "Linux userspace device drivers and tools"); Daegyu Han = **Samsung Electronics**(Hwasung, 스토리지 시스템 박사); Wenwen Chen = **Samsung Electronics**(Xi'an, "Flash storage, Linux IO stack"); Jay H. Park = "Staff Engineer at Samsung Electronics". `2xdevv`·`nayeonikim` 프로필에는 소속 표기가 없으나 커밋에 `@samsung.com` 서명이 있다 | 2026-09-28 | https://github.com/ankit-sam ; https://github.com/daegyu94 ; https://github.com/Wenwen-Chen ; https://github.com/jayhpark530 | ✅ |
| A-06 | LMCache 소스 파일 3개(`hf3fs_adapter.py`, `storage_backend_io_benchmark.py`, `tests/conftest.py`) 머리말: **"Copyright (c) 2026 Samsung Electronics Co., Ltd."**, 작성자 Ruyi Zhang·Wenwen Chen(`@samsung.com`) | 2026 | https://github.com/LMCache/LMCache/blob/dev/lmcache/v1/storage_backend/connector/hf3fs_adapter.py | ✅ |

### 2-B. NVMe raw block 계층과 FDP 배치 (SSD 벤더 관점의 핵심)

| ID | 사실 | 일자(머지) | 출처 URL | 등급 |
|---|---|---|---|---|
| A-10 | **[1/N] 단순화된 Rust raw block 백엔드**(#2482, Dongjoo Seo): 블록 디바이스 직접 I/O, `O_DIRECT`, 크래시 복구용 매니페스트, LRU, TP=1 | 2026-02-04 | https://github.com/LMCache/LMCache/commit/65bc0524b9fc264a6f083c12b2a8ba621d2caa2c | ✅ |
| A-11 | [2/N] zero-copy 정렬 버퍼 `O_DIRECT`(#2573), [3/N] 디바이스 위 메타데이터 영속화(#2614) — Dongjoo Seo | 2026-02-24 · 2026-03-26 | https://github.com/LMCache/LMCache/commit/0c6e06215651ffc757085035a422b8f9307f70c0 ; https://github.com/LMCache/LMCache/commit/951cd3b0f1bb037d163e5bf67a5840204b0af834 | ✅ |
| A-12 | TP>1 지원·배치 검색 경로(#2948) — 서명 Daejun Park·Dongjin Kim·Dongjoo Seo(모두 `@samsung.com`) | 2026-04-10 | https://github.com/LMCache/LMCache/commit/e7dfb09a424a6f728fcd7304ad60b17269ec0640 | ✅ |
| A-13 | [6/N] Rust raw block에 **io_uring** 지원(#2635, Ankit Kumar) | 2026-04-28 | https://github.com/LMCache/LMCache/commit/2621c440978bdb05813c678dd2689e8d70ef841a | ✅ |
| A-14 | raw block을 **멀티프로세스(MP) L2 어댑터**로 편입(#3119, Dongjoo Seo). PR 본문의 기능 검증: Qwen2.5-14B, vLLM 0.19.1, TP=2, `/dev/nvme5n1p1`, 쿼리 라운드 "78/78 prefix hits (0 L1, 78 L2)"; 본문 스스로 "tuned performance claim이 아님"이라 명시 | 2026-05-04 | https://github.com/LMCache/LMCache/pull/3119 ; https://github.com/LMCache/LMCache/commit/31b5535aec7ef4d13991b744187464dd4279c1b8 | ✅ |
| A-15 | **NVMe `io_uring_cmd`(패스스루)** 도입(#3274, Ankit Kumar; 서명 Daegyu Han·Dongjoo Seo). NVMe 네임스페이스 문자 디바이스(`/dev/ngXnY`) 필요 | 2026-06-11 | https://github.com/LMCache/LMCache/commit/7021790bf5d562ed8887d8e901bf25edfa2ff18e | ✅ |
| A-16 | **⭐ NVMe FDP 탐색·배치 배관(#4016)** — 작성 Daegyu Han, 공동작성 Ankit Kumar. RUH 상태 조회(I/O Management Receive), 쓰기 경로에 FDP placement directive, `fdp_enabled`/`fdp_placement_ids`/`fdp_data_placement_policy`/`meta_checkpoint_placement_id` 설정, **`cache_salt_prefix`(테넌트 버킷별 배치)·`cache_salt_rank`(버킷×로컬 랭크별 배치) 정책**, 메타데이터와 KV 데이터의 PID 분리, PID 친화 슬롯 재사용, PID 0 예약 | PR 2026-07-06 생성 → **2026-08-05 머지** | https://github.com/LMCache/LMCache/pull/4016 ; https://github.com/LMCache/LMCache/commit/e88f674b017d6df4a3740eeb5ade53abe0a68913 | ✅ |
| A-17 | 사용자 문서: FDP는 `io_engine="io_uring"`+`use_uring_cmd=true` 필수. 예시로 "`app01`~`app16` 16개 버킷 × 랭크 8개 = **최대 128개 placement identifier**(식별자 128개 이상·GPU 8개 이상일 때)"를 제시. 버킷이 식별자보다 많으면 초과분은 FDP 지시 없이 기록 | 현행 | https://github.com/LMCache/LMCache/blob/dev/docs/source/mp/l2_storage/raw_block.rst ; https://github.com/LMCache/LMCache/blob/dev/docs/design/v1/distributed/l2_adapters/raw_block.md | ✅ |
| A-18 | FDP 머지 후 후속 커밋: uring_cmd 비정렬 버퍼 바운스(#3891, Nayeon Kim), 전송 크기 상한(#3882)·`load_many` 배치 읽기(#3812, Sangyoon Kwon), `put_many` io_uring 배치 쓰기(#3636, Nayeon Kim), 복구 슬롯 헤더 병렬 검증(#3835, Daegyu Han·Nayeon Kim) | 2026-08-11 ~ 2026-09-22 | https://github.com/LMCache/LMCache/commit/33962edb4f595ce4a0cbdd6a2bc5b59aeb05d0fa | ✅ |
| A-19 | 미머지: **SPDK I/O 엔진·zero-copy DMA**(#4661, Ankit Kumar, 2026-08-20 생성, open). 다중 디바이스 샤딩(#3210, `2xdevv`)은 머지 없이 closed | 2026-09-28 기준 | https://github.com/LMCache/LMCache/pull/4661 ; https://github.com/LMCache/LMCache/pull/3210 | ✅ |
| A-20 | LMCache 블로그 "Raw Block in LMCache: Building a fast, recoverable NVMe tier for KV cache": 기여자로 **삼성의 Dongjoo Seo·Ankit Kumar·Sangyoon Kwon·Daegyu Han·Nayeon Kim** 명시. FDP로 워크로드 클래스를 분리하자 **WAF 2.600 → 1.425(−45.2%)**; 조건은 **Samsung PM9D3a**, 합성 LMCache 스토리지 트레이스 9개 동시, 구성 용량 960 GiB의 4배 쓰기, 디바이스 사용률 89%. 쓰기 지연 평균 −55.6%·p90 −29.4%, 읽기 지연 평균 −35.7%·p90 −22.0% | 2026-09-22 | https://blog.lmcache.ai/en/2026/09/22/raw-block-in-lmcache-building-a-fast-recoverable-nvme-tier-for-kv-cache/ | 🟡 `[검색 요약 경유 — 블로그 차단, 원문 미열람]`. 수치를 GitHub 문서·PR #4016 본문에서 찾지 못함 |

### 2-C. CXL·기타 백엔드와 엔진 통합

| ID | 사실 | 일자(머지) | 출처 URL | 등급 |
|---|---|---|---|---|
| A-30 | **Device-DAX(`/dev/dax`) KV 캐시 백엔드**(#2788, 서명 JaeHyeong Park `tino.park@samsung.com`). 문서: "Typical `/dev/dax` devices include persistent memory, **CXL-attached memory**…" | 2026-03-24 | https://github.com/LMCache/LMCache/commit/8993df1e3ecb5bf35e71b4385381808b9c8a3466 ; https://github.com/LMCache/LMCache/blob/dev/docs/source/kv_cache/storage_backends/dax.rst | ✅ |
| A-31 | DAX 후속: MP L2 지원(#3161), 런타임 DAX 핫플러그 HTTP API(#3264), Device-DAX를 하이브리드 L1 오버플로로(#3584), DAX L2 로드 경로 병합(#4010) — Dongjoo Seo. 미머지: MP 서버 간 고정 Device-DAX L1 풀 공유(#5105, open) | 2026-05-07 ~ 2026-07-20 | https://github.com/LMCache/LMCache/pull/3584 ; https://github.com/LMCache/LMCache/pull/5105 | ✅ |
| A-32 | **DeepSeek 3FS(hf3fs) 스토리지 백엔드**(USRBIO 네이티브 API, #3120)와 스토리지 백엔드 I/O 벤치마크(#3283) — Wenwen Chen(삼성, Xi'an) | 2026-05-13 · 2026-06-07 | https://github.com/LMCache/LMCache/commit/70399c6cbcdfca2d392a8768d3ebe8f11ebced9a ; https://github.com/LMCache/LMCache/commit/35b6dec347ffbad4f3e0574bb2e0650d20b22ae8 | ✅ |
| A-33 | **네이티브 verbs RDMA P2P 전송**(멀티레일 채널 등, 커밋 다수) — Dongjoo Seo | 2026-07-20 ~ 2026-07-29 | https://github.com/LMCache/LMCache/commit/27bd17f75b9cfb7026e634d3f00fc03b1cf0623e | ✅ |
| A-34 | SGLang 통합: SGLang layerwise 통합 버그 수정(#2410), **SGLang→vLLM KV 캐시 공유 예제**(#4130) — Dongjoo Seo | 2026-01-21 · 2026-07-17 | https://github.com/LMCache/LMCache/commit/e38ee4157a11703b07845f45fd98e714b25c13cd | ✅ |
| A-35 | (문맥) CODEOWNERS의 "CXL / Maru" 항목의 Maru는 **XCENA**(`xcena-dev/maru`)의 CXL 공유 메모리 KV 저장 엔진이다 — 삼성 제품 아님 | 현행 | https://github.com/LMCache/LMCache/blob/dev/docs/source/kv_cache/storage_backends/maru.rst | ✅ |

---

## §3. 나머지 KV 캐시 관리자 3종과 인접 엔진

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| B-01 | **Mooncake**: 삼성 연결 커밋 0. 삼성은 **벤치마크 하드웨어로만** 등장 — 공식 SSD 오프로드 벤치마크 문서의 스토리지가 "5 × Samsung NVMe SSDs in RAID0 — 3 × PM1733 3.84TB + 2 × PM983 1.92TB" | 문서 2026-07-10 개편 | https://github.com/kvcache-ai/Mooncake/blob/main/docs/source/performance/mooncake/ssd-offload-benchmark-results.md | ✅ |
| B-02 | Mooncake PR 중 "samsung"이 걸리는 4건(#2922·#2806·#3128·#3758)은 모두 **테스트 장비**로 삼성 SSD(Gen5 NVMe, 990 PRO, 870)를 적은 것이고, 작성자 이메일은 alibaba-inc.com·fb.com·gmail 등이다 | 2026-07~08 | https://github.com/kvcache-ai/Mooncake/pull/2806 ; https://github.com/kvcache-ai/Mooncake/pull/3128 | ✅ |
| B-03 | Mooncake 미머지 PR #3128(버킷 데이터 persist 모드)의 작성자 "Daejun Park <pdaejun@gmail.com>"는 LMCache #2948 서명자 Daejun Park(`daejun7.park@samsung.com`)와 **이름만 같다**. 프로필에 소속 없음. 동일인 여부 미확인, PR은 open | 2026-07-27 | https://github.com/kvcache-ai/Mooncake/pull/3128 ; https://github.com/Daejun | ⚠️ 미검증 |
| B-04 | (문맥) Mooncake에 **NVMe KV SSD 오프로드 백엔드**(`mooncake-store/src/nvme_kv/`, ioctl·libnvme·io_uring 실행기)가 머지됨. 작성자 이메일 163.com — 삼성 연결 없음 | 2026-08-14(#2167) | https://github.com/kvcache-ai/Mooncake/commit/91c1c455cf275a1231a20319c196cb4f46b9cb5f | ✅ |
| B-05 | **FlexKV**·**Dynamo(KVBM 포함)**: 삼성 연결 커밋 0, 삼성 엔지니어 계정 0, 코드 검색 "samsung" 0. FlexKV PR 검색의 "samsung" 1건(#265)은 비삼성 작성자 | 2026-09-28 | https://github.com/taco-project/FlexKV ; https://github.com/ai-dynamo/dynamo | ✅ |
| B-06 | **NIXL**: `jayhpark530`(프로필 "Staff Engineer at Samsung Electronics")의 문서 오타 수정 1건(#1260). 기능 기여 아님 | 2026-01-30 | https://github.com/ai-dynamo/nixl/commit/101a1e02e8d1f9fa26dcd8e21d6d642dbc411e5e | ✅ |
| B-07 | **SGLang** 삼성 연결 커밋 8건: MMuzzammil1(프로필 "Samsung Research", 서울) — **LMCache 커넥터 버그 수정**(#12946), **HiCache write-back 시 스토리지 기록 버그 수정**(#14718), **PD 분리 디코드 측 KV 캐싱 시 hicache-storage-backend 검사**(#20732); Hun-ho Kim 공동작성 3건(KV 복제 전송량 지표 #30351, **Mooncake 경유 DSA 상태 전송 중복 제거** #32620, #39871); Taegeon Um 공동작성(NSA HiCache 수정 #25022); joo_yeon.lee 공동작성(PD 모드 지표 #18552). 별도로 Dongjoo Seo의 LMCache 단위테스트 수정(#14005, 개인 이메일) | 2025-11-10 ~ 2026-09-19 | https://github.com/sgl-project/sglang/commit/1f2a6c691b3e9183fb3aa9178fd9775e88a303cc ; https://github.com/sgl-project/sglang/commit/2399af55575f92daa30685b41775eb781c201554 ; https://github.com/sgl-project/sglang/commit/855ec7017d430f196a4f5da6123399b1f67c10c6 ; https://github.com/sgl-project/sglang/commit/983e4aa18d7e8746d3ef357ad9f8c8d757a3de5b ; https://github.com/MMuzzammil1 | ✅ |
| B-08 | SGLang의 Dongjoo Seo PR 중 LMCache MP 모드 통합 2건(#16185, #21229)은 **머지 없이 closed**, #32946(MP prefix 조회 생략)은 open | 2025-12-30 · 2026-03-23 · 2026-07-30 | https://github.com/sgl-project/sglang/pull/21229 ; https://github.com/sgl-project/sglang/pull/32946 | ✅ |
| B-09 | **vLLM**: 삼성 연결 커밋 2건(2024-07-19 #6369, 2024-09-25 #8765; 투기적 디코딩·오타). KV 오프로드 커넥터 관련 0 | 2024 | https://github.com/vllm-project/vllm/commit/a921e863921721ecae8250e0543aba1920c7c53a | ✅ |
| B-10 | **FDP·write stream 코드의 위치**: NIXL·Dynamo·FlexKV·Mooncake·llm-d-kv-cache의 파일 트리와 커밋 메시지에 `fdp`/`write_stream`/`placement_id`/`xnvme` 0건. **LMCache만** raw_block FDP 코드와 FDP 테스트(`test_raw_block_fdp_status_probe.py` 등)를 가진다 | 2026-09-28 | 각 저장소 `git ls-tree`·`git log --grep` | ✅ |

---

## §4. 스토리지 I/O·커널 계층 (KV 관리자 아래 계층)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| C-01 | **xNVMe**: 기본 브랜치 2,163커밋 중 작성자 `@samsung.com` 1,932건. 2025년 이후 468건 중 296건. 최신 삼성 커밋 2026-09-22. 트리에 **NVMe KV 명령 세트(kvs) 테스트**와 **FDP 튜토리얼** 포함 | 2026-09-28 | https://github.com/xnvme/xnvme | ✅ |
| C-02 | **xnvme/aisio**(Accelerator-integrated Storage I/O): README "SPDX-FileCopyrightText: Samsung Electronics Co., Ltd", 324커밋 중 삼성 연결 251건(k.torp·n.koch·yonggil.song·j_yoon.choi·siu.jung @samsung.com). CPU 시작 vs **GPU 시작 NVMe I/O**를 GDS·BaM과 비교하는 벤치 환경. **KV 캐시·LLM 명시 없음** | 2025-06-04 ~ 2026-09-23 | https://github.com/xnvme/aisio | ✅ |
| C-03 | SNIA 세션 "AiSIO: Orchestrating Storage I/O Across CPUs and Accelerators" — 발표자 Simon A. F. Lund(삼성 Principal Engineer, SAI 그룹·AiSIO 프로젝트 리드) | 연도 미확인 | https://www.snia.org/sniadeveloper/session/19565 | 🟡 |
| C-04 | "GPU 약 10만 스레드에서 GPU당 9,500만 IOPS 이상(삼성 테스트)" 서술 | 미확인 | 검색 요약(출처 페이지 특정 못함) | ⚠️ 단일·미검증 |
| C-05 | **Linux 블록 계층·io_uring write streams**(`bi_write_stream`, 블록 디바이스 write stream 노출, io_uring per-I/O write stream, NVMe FDP 스트림 매핑) 시리즈가 **Kanchan Joshi(`joshi.k@samsung.com`) 서명**으로 머지, Nitesh Shetty(삼성) 리뷰 | 2025-05-06 | https://github.com/torvalds/linux/commit/5006f85ea23ea0bda9a8e31fdda126f4fca48f20 ; https://github.com/torvalds/linux/commit/02040353f4fedb823f011f27962325f328d0689f ; https://github.com/torvalds/linux/commit/38e8397dde6338c76593ddb17ccf3118fc3f5203 | ✅ |
| C-06 | 2026-08 NVMe FDP 수정: FDP placement handle 상한 126(S8_MAX−1)→**U8_MAX** 상향(Alibaba 작성, Kanchan Joshi 제안·리뷰, 2026-08-10 커밋), FDP placement ID 배열 경쟁 조건 수정(Kanchan Joshi 작성, 2026-08-19 커밋) | 2026-08-10 · 2026-08-19 | https://github.com/torvalds/linux/commit/56e1c6bbe4bb084d7ecf61698afdf70be23dd35f ; https://github.com/torvalds/linux/commit/53cdaeab2e30e0cb849a74b94f93729ad98946b1 | ✅ |
| C-07 | XFS write streams v4 패치(6개) 게시자 Kanchan Joshi. **메인라인 미머지**(GitHub 미러 커밋 검색 0건) | 2026-07-17 게시 | https://ratatoskr.run/linux-block/2026/07/17274958/t | 🟡(게시) / ✅(미머지) |
| C-08 | **SPDK**: 작성자 `@samsung.com` 커밋 475건(트레일러 포함 2,002건). 2025년 이후 작성 4건 — Ankit Kumar·Simon A. F. Lund가 MAINTAINERS에 자신을 추가(bdev_xnvme 등) | 2025-05-01 | https://github.com/spdk/spdk/commit/52261c022ad0e5e2eb6b8178382f187ac6533567 ; https://github.com/spdk/spdk/commit/a0493a098d7f04a7b4b1de0e7dfc27c11139b58b | ✅ |
| C-09 | **CacheLib**: 삼성 작성 3건 모두 2024년(FDP 지원 #277 2024-01-25, 문서 #308, 단위테스트 #318). 2025년 이후 0 | 2024 | https://github.com/facebook/CacheLib | ✅ |
| C-10 | **liburing**: 삼성 작성 19건, 2025년 이후 6건, 최신 2025-05-22 | 2025 | https://github.com/axboe/liburing | ✅ |

---

## §5. 백서·블로그·논문·발표 (2025~2026)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| D-01 | (기존) PM1753 KV 캐시 오프로딩 백서·기술 블로그 — 기존 원장 §2 삼성 행, WCSSD X-02·X-03 참조 | 2026-08-25(블로그) | https://semiconductor.samsung.com/news-events/tech-blog/scaling-ai-inference-with-kv-cache-offloading-why-storage-is-becoming-a-key-enabler-for-next-generation-ai-systems/ | 🟡 |
| D-02 | 국내 보도: 삼성이 **H100 환경**에서 PM1753 KV 캐시 오프로딩을 검증한 결과 **동시 사용자 1.7배, TPS 1.5배, 전체 시스템 전력 −47%** | 2026-01-15 | https://www.mt.co.kr/industry/2026/01/15/2026011515201765837 ; https://www.mt.co.kr/industry/2026/01/16/2026011520104080818 | 🟡 |
| D-03 | 백서 "Optimizing KV Cache Offloading to CMM-D in a CXL Switch-based Memory Pool": **vLLM+LMCache**, NVIDIA RTX PRO 6000 Blackwell 8장, CMM-D를 CXL 2.0 스위치로 묶은 **1TB 메모리 풀**을 LMCache 백엔드로 사용. 단일 GPU에서 DRAM과 대등, **GPU 8장에서 DRAM 대비 약 92%** | 2026-06 | https://download.semiconductor.samsung.com/resources/white-paper/Optimizing_KV_Cache_Offloading_to_CMM-D_in_a_CXL_Switch-based_Memory_Pool.pdf | 🟡 |
| D-04 | 같은 결과를 요약한 기술 블로그 "Breaking AI Memory Limits with CXL Memory Pooling" | 2026-08(검색 요약상) | https://semiconductor.samsung.com/news-events/tech-blog/breaking-ai-memory-limits-with-cxl-memory-pooling/ | 🟡 |
| D-05 | 논문 **DUAL-BLADE**(arXiv 2604.26557): 엣지 LLM용 이중 경로 KV 캐시 오프로딩 — KV 텐서를 NVMe LBA 영역에 직접 매핑하는 경로 + 페이지 캐시 경로. 파일 기반 오프로딩 대비 **prefill 지연 최대 −33.1%, decode 지연 최대 −42.4%**. 삼성전자 연구원(서강대 박사과정 겸) 참여, 서강대·Florida State University 공동 | 2026-04 | https://arxiv.org/abs/2604.26557 | 🟡 |
| D-06 | 논문 "Scalable Processing-Near-Memory for 1M-Token LLM Inference: CXL-Enabled KV-Cache Management Beyond GPU Limits"(PACT 2025, arXiv 2511.00321): 저자 11명 중 **삼성전자 5명**(Sang-Soo Park, Minyong Yoon, Si-Dong Roh, Yongsuk Kwon, Jinin So) + 한양대 | 2025 | https://arxiv.org/abs/2511.00321 ; https://ieeexplore.ieee.org/abstract/document/11282934/ | 🟡 |
| D-07 | FMS 2026 기조연설(이진엽 부사장·김경륜 부사장): 입력 컨텍스트·KV 캐시 증가를 메모리 대역폭·용량 수요 동인으로 제시; zHBM·zNAND-O 컨셉, V10 공개(기존 WCSSD H-11 참조) | 2026-08 | https://semiconductor.samsung.com/news-events/tech-blog/samsung-presents-its-vision-for-next-generation-ai-infrastructure-with-3d-memory-architecture-at-fms-2026/ | 🟡 |
| D-08 | **OCP Global Summit 2026(10-12~15, 산호세) 예정 발표**: CXL 메모리 풀과 SSD로 **KV 캐시 저장 공간을 확장하는 방안**, CXL-PNM, 다수 서버 메모리 관리 SW, 풀링·공유·PNM을 결합한 에이전트형 AI 시스템 아키텍처 | 보도 2026-09-28(발표 예정) | https://www.mt.co.kr/industry/2026/09/28/2026092815580639077 | 🟡 (예정) |
| D-09 | OCP Global Summit 2025 삼성 데모: Virtual SSD Migration, **AiSIO**, **FDP**; CXL 2.0 CMM-D·CMM-DC(PNM 통합) | 2025-10 | https://semiconductor.samsung.com/news-events/tech-blog/samsung-electronics-highlights-open-collaboration-for-the-ai-era-at-ocp-global-summit-2025/ | 🟡 |
| D-10 | LMCache 블로그 FDP 실측(A-20) — 삼성 SSD(PM9D3a)에서 KV 캐시 트레이스로 FDP WAF를 보고한 공개물 | 2026-09-22 | A-20 | 🟡 |

---

## §6. 파트너십·협업

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| E-01 | **Tensormesh**(LMCache 창시팀 회사) 2천만 달러 투자 발표 보도자료에 삼성전자 **Leno Park 부사장(NAND 상품기획)** 인용: "Tensormesh's LMCache is built to take full advantage of next-generation storage, and we look forward to our **continued collaboration** to push the boundaries of what's possible across the AI stack." 투자사 명단(AMD Ventures·CoreWeave·NVentures 등)에 삼성은 없음 | 2026-05-27 | https://www.businesswire.com/news/home/20260527958597/en/ ; https://www.tensormesh.ai/blog-posts/tensormesh-raises-20m-launches-inference-platform | 🟡 |
| E-02 | LMCache 메인테이너 목록의 조직: UChicago·Tensormesh·IBM·Bytedance·**Samsung**(A-01) | 2026-09-16 갱신본 | https://github.com/LMCache/LMCache/blob/dev/MAINTAINERS.md | ✅ |
| E-03 | NVIDIA GTC 2026: 삼성은 BlueField-4 **STX 레퍼런스 아키텍처**의 일부로 PM1753을 소개(추론 워크로드의 에너지 효율·성능). CMX 공급은 기존 원장 참조 | 2026-03 | https://news.samsung.com/global/samsung-unveils-hbm4e-showcasing-comprehensive-ai-solutions-nvidia-partnership-and-vision-at-nvidia-gtc-2026 | 🟡 |
| E-04 | "삼성이 V-NAND 생산능력의 60% 이상을 NVIDIA CMX 공급에 배정" 보도 | 2026 | https://finance.biggo.com/news/28505c22-0cdb-466a-ae3e-2add03860ceb | ⚠️ 단일출처·미검증 |
| E-05 | 학계 협업: 서강대·FSU(D-05), 한양대(D-06) | 2025~2026 | D-05·D-06 | 🟡 |
| E-06 | vLLM Korea Meetup 2026(4-02, 서울)의 삼성전자 발표는 "Protecting Sensitive Data with vLLM"(사내 폐쇄망 LLM API, 직원 4,000명+ 사용) — **KV 캐시 주제 아님**. 같은 행사 KV 캐시·CXL·LMCache 발표는 XCENA | 2026-04-14 게시 | https://github.com/vllm-project/vllm-project.github.io/blob/main/_posts/2026-04-14-vllm-korea-meetup-2026.md | ✅ |

---

## §7. KV 캐시를 겨냥한 제품·기능

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| F-01 | (기존) PM1753 CMX 공급, PM1763 Gen6 양산, BM1773 — 기존 원장 §2 삼성 행 | 2026 | 기존 원장 | 🟡 |
| F-02 | **PM9D3a**: LMCache FDP 실측에 쓰인 삼성 SSD(A-20) | 2026-09-22 | A-20 | 🟡 |
| F-03 | **CMM-D**: vLLM+LMCache KV 오프로딩 백엔드로 평가(D-03). LMCache Device-DAX 백엔드(A-30)는 CXL 부착 메모리를 대상 디바이스로 명시 — 단, CMM-D 백서가 이 백엔드를 썼는지는 미확인 | 2026 | D-03·A-30 | 🟡 / ✅ |
| F-04 | **Samsung Cognos**(MSL Data Fabric Solutions): "memory software orchestrator"로 SLA 기반 메모리 티어링을 추상화하는 CXL 소프트웨어. 채용 공고는 Cognos를 "GPU HBM·호스트 DRAM·CXL 메모리 풀·NVMe/SSD 티어에 걸쳐 모델 상태를 옮기는 AI 메모리 소프트웨어"로 서술 | 현행 | https://semiconductor.samsung.com/us/about-us/us-office/us-r-and-d-labs/memory-labs/data-fabric-solutions/ | 🟡 |
| F-05 | (기존) Z-NAND 부활·GIDS·zNAND-O — WCSSD H-11 참조 | 2025-08 · 2026-08 | 기존 원장 | 🟡 |

---

## §8. 조직·채용 신호

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| G-01 | Samsung Semiconductor(산호세) **"Senior Staff Engineer - AI Workloads & Storage"**: 어텐션·**KV 캐시**·배칭 지식, 우대 경험으로 **vLLM·SGLang·LMCache·NVIDIA Dynamo·TensorRT-LLM·Triton**. 직무에 워크로드 접근 패턴 분석 결과를 **NVMe FDP·streams** 같은 데이터 배치 기술로 연결하는 일 포함; "SSD를 AI 데이터 경로의 1급 시민으로" | 게시일 미확인 | https://zapply.jobs/jobs/d01ed6fe-bf91-4418-b00d-df6f6f91f8fc/ ; https://www.dreamworkhq.com/job/04a3b38b-ec8e-4844-a92c-162580dc4382 | 🟡 (애그리게이터 차단, 검색 요약) |
| G-02 | **"Technical Director, Large-Scale AI Model Inferencing"**: SGLang(**HiCache**), vLLM(PagedAttention, **LMCache 통합**), NVIDIA Dynamo, TensorRT-LLM의 메모리 관리 내부 구조 전문성 요구; GPU HBM·DRAM·CXL 풀·NVMe/SSD 티어와 **Samsung Cognos**에 걸친 풀스택 AI 메모리 솔루션 요구사항 담당 | 게시일 미확인 | https://zapply.jobs/jobs/fbf0ad3d-8f49-4a0a-a07c-3668c8346fad/ ; https://www.dreamworkhq.com/job/82f564db-7cb5-4d40-ba39-e6bae0e1c3fc | 🟡 |
| G-03 | **"Staff Engineer, AI Platform Enablement and Emerging Applications"**: AI 추론, **KV 캐시·컨텍스트 스토리지**, 메모리 확장, 체크포인팅, GPU-direct I/O 등 신규 스토리지 기회 탐색 | 게시일 미확인 | https://zapply.jobs/jobs/d2617e64-a105-4bdc-8d91-3976b76b9c4b/ | 🟡 |
| G-04 | **"Staff Engineer, SSD Storage and Systems Architecture"**: AI 학습·추론 가속용 스토리지 아키텍처, FTL 최적화, HW-SW 공동 설계 | 게시일 미확인 | https://zapply.jobs/jobs/6edc45f4-a06d-4f9b-95d8-dd30fcf0bef9/ | 🟡 |
| G-05 | 커밋·프로필로 확인되는 삼성 기여자 거점: 미국 Saratoga CA(Dongjoo Seo), 화성(Daegyu Han), 벵갈루루 SSIR(Ankit Kumar), 시안(Wenwen Chen), 서울 Samsung Research(MMuzzammil1) — **LMCache 기여는 복수 법인·거점에 걸쳐 있음** | 2026-09-28 | A-03·A-05·B-07 | ✅ |

---

## §9. 기존 원장과의 충돌 기록 (⚠️ 충돌)

| ID | 기존 서술 | 본 원장의 사실 | 판정 |
|---|---|---|---|
| K-01 | [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) 핵심 1: "①②는 NVIDIA·중국 3사·OSS가 선점했고 **어느 것도 FDP·write hint를 아직 쓰지 않는다**(✅ GitHub README 4종 확인)" | LMCache(②)에 NVMe FDP 배치 코드가 **2026-08-05 머지**(A-16), 문서화(A-17) | ⚠️ 충돌 — 기존은 README 기준(2026-09-17), 본 원장은 코드·커밋 기준. 기존 서술은 LMCache에 대해 성립하지 않음 |
| K-02 | 같은 원장 §2.1 삼성 노트·§4 Phase 3 행: "**KV cache 관리자(LMCache·FlexKV·Mooncake·KVBM)에 삼성 기여 흔적 없음** ✅(README 기준)" | LMCache 삼성 연결 커밋 62건, 삼성 Committer 1명(A-01, N-01). Mooncake·FlexKV·KVBM은 0 유지(N-02~N-04) | ⚠️ 충돌(LMCache 한정) |
| K-03 | 같은 원장 핵심 2·§2 삼성 행: "오픈소스 FDP 툴체인은… **KV cache에 연결된 공개물은 없다**" / §4 Phase 2 행: "KV cache 트레이스 기반 RUH 정책 공개물 없음" | LMCache `cache_salt_prefix`/`cache_salt_rank` FDP 배치 정책(A-16, ✅), PM9D3a에서 LMCache 트레이스 기반 WAF 2.600→1.425(A-20, 🟡) | ⚠️ 충돌 |
| K-04 | 같은 원장 §4 "보고서 반영 지침"·§5 공백 목록 5번: "KV cache 워크로드 FDP WAF 실측 공개는 현재 업계 공백(§3.2)" | A-20 블로그 수치(🟡, 원문 미열람) | ⚠️ 충돌 가능 — 원문 확인 전까지 🟡 |
| K-05 | 덱 문장 "KV 캐시 관리자 4종 공개 저장소에 삼성 기여 0" | 4종 중 3종 0, LMCache는 기여·메인테이너 있음 | ⚠️ 충돌(1/4) |

---

## § 부정 확인 (찾았으나 없었던 것)

| # | 확인 대상 | 결과 | 확인 방법 |
|---|---|---|---|
| X-01 | Mooncake 커밋의 삼성 흔적 | **없음** | 기본 브랜치 2,285커밋 전수: 작성자·커미터 이메일, `Signed-off-by`/`Co-authored-by`에 `@samsung.com` 0건; LMCache·SGLang 삼성 엔지니어 계정·개인 이메일 0건 |
| X-02 | FlexKV 커밋의 삼성 흔적 | **없음** | 638커밋 전수, 같은 방법 |
| X-03 | Dynamo(KVBM 포함) 커밋의 삼성 흔적 | **없음** | 7,453커밋 전수 + GitHub 코드 검색 "samsung repo:ai-dynamo/dynamo" 0건 + PR 검색 0건 |
| X-04 | NIXL 기능 기여 | **없음**(문서 오타 1건만) | 1,236커밋 전수 + PR 검색("samsung" 4건 모두 비삼성 작성자) |
| X-05 | TensorRT-LLM·llm-d·llm-d-kv-cache·AIBrix·production-stack·ktransformers의 삼성 기여 | **없음** | 각 기본 브랜치 전수 |
| X-06 | vLLM의 KV 오프로드·커넥터 관련 삼성 기여 | **없음** | 22,063커밋 중 삼성 연결 2건 모두 2024년 비관련 |
| X-07 | KV 관리자·전송 계층(NIXL·Dynamo·FlexKV·Mooncake·llm-d-kv-cache)의 FDP/write stream 코드 | **없음** | `git ls-tree` 파일명과 `git log --grep`(`fdp`, `write stream`, `write_stream`, `flexible data placement`) 0건 |
| X-08 | CacheLib에 대한 2025년 이후 삼성 커밋 | **없음** | 기본 브랜치 전수(마지막 2024-07-19) |
| X-09 | XFS write streams의 메인라인 머지 | **없음** | torvalds/linux GitHub 미러 커밋 검색 0건 |
| X-10 | NVIDIA DOCA Memos와 삼성의 공개 연계 | **찾지 못함** | 웹 검색(DOCA Memos 파트너·STX SSD 벤더) — 삼성 언급 없음 |
| X-11 | PM1753·PM1763의 FDP 지원·RUH 수 | **찾지 못함** | 웹 검색 — 양산 보도·백서 요약에 FDP·RUH 언급 없음 |
| X-12 | Samsung SDS·SAIT의 KV 캐시 오프로딩 공개물 | **찾지 못함** | 웹 검색 2회(SDS KV cache, SAIT KV cache) — 관련 결과 없음 |
| X-13 | vLLM Korea Meetup 2026 삼성 발표의 KV 캐시 내용 | **없음** | vLLM 블로그 원문(GitHub) — 삼성 발표는 보안·사내 LLM API |
| X-14 | Tensormesh 투자사 명단의 삼성 | **없음** | 투자 보도 검색 요약(AMD Ventures·CoreWeave·NVentures·Valley Capital·Laude) 🟡 |
| X-15 | LMCache 블로그 FDP 수치(A-20)의 GitHub 상 원문 | **찾지 못함** | raw_block 설계·사용자 문서, PR #4016 본문, GitHub 코드 검색("PM9D3a", "raw-block-in-lmcache") 0건 |
| X-16 | HillInfer(SmartSSD 기반 KV 퇴출, arXiv 2602.18750)의 삼성 저자 | **확인 못함** | 검색 요약상 저자 USTC 등 — 삼성 제품을 쓴 학계 연구로만 확인 |

---

## § 슬라이드에 쓸 수 있는 문장 (✅/🟡 사실에 한정)

1. **"KV 캐시 관리자 4종 중 Mooncake·FlexKV·Dynamo KVBM에는 삼성 기여가 0이다. LMCache에는 삼성 엔지니어 커밋 62건이 머지됐고, 삼성 소속 Committer 1명이 메인테이너 명단에 있다."** — N-01~N-04, A-01 (✅)
2. **"삼성은 LMCache에 NVMe raw block 계층(io_uring, NVMe 패스스루)과 NVMe FDP 배치 기능(2026-08 머지)을 기여했다. 조사한 KV 캐시 관리자·전송 라이브러리 중 FDP 코드가 있는 곳은 LMCache뿐이다."** — A-10~A-17, B-10 (✅)
3. **"LMCache 블로그(2026-09-22)는 삼성 PM9D3a에서 FDP로 KV 캐시 트레이스의 WAF를 2.600에서 1.425로 45.2% 낮췄다고 보고했다."** — A-20 (🟡, 원문 미열람. 슬라이드 각주에 "LMCache 블로그, 검색 요약 기준" 표기 필요)
4. **"삼성은 CXL 메모리(CMM-D) 풀을 LMCache 백엔드로 쓴 KV 캐시 오프로딩 백서를 냈다(GPU 8장에서 DRAM 대비 약 92%). LMCache에 Device-DAX(CXL 부착 메모리) 백엔드도 기여했다."** — D-03 (🟡), A-30 (✅)
5. **"Tensormesh 투자 발표에서 삼성 NAND 상품기획 부사장은 LMCache와의 '지속적 협업'을 언급했다. 삼성 채용 공고(게시일 미확인)는 vLLM·SGLang·LMCache·Dynamo 경험과 FDP 기반 데이터 배치를 요구한다."** — E-01, G-01 (🟡)
6. **(덱 문구 대체안, 사실 표기만)** "KV 캐시 관리자 4종 중 3종(Mooncake · FlexKV · Dynamo KVBM) 삼성 기여 0 · LMCache는 삼성 Committer 1명, 커밋 62건(FDP 배치 포함)" — N-01~N-04, A-01, A-16 (✅)

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| 19개 저장소 커밋 이력 | `git clone --filter=blob:none --bare https://github.com/<org>/<repo>.git`(§1 목록 + xnvme/xnvme, xnvme/aisio, spdk/spdk, axboe/liburing, facebook/CacheLib) | 기본 브랜치 커밋 수, `@samsung.com` 작성자·커미터·트레일러, 작성자 순위, 파일 트리 |
| LMCache MAINTAINERS·CODEOWNERS | https://raw.githubusercontent.com/LMCache/LMCache/dev/MAINTAINERS.md ; https://raw.githubusercontent.com/LMCache/LMCache/dev/.github/CODEOWNERS | 삼성 Committer, 소유 경로 |
| LMCache raw_block·DAX·Maru 문서 | https://raw.githubusercontent.com/LMCache/LMCache/dev/docs/source/mp/l2_storage/raw_block.rst ; `.../docs/design/v1/distributed/l2_adapters/raw_block.md` ; `.../docs/source/kv_cache/storage_backends/dax.rst` ; `.../maru.rst` | FDP 설정·정책·제약, DAX 대상 디바이스, Maru=XCENA |
| LMCache PR 본문 | GitHub 검색 API: #4016, #3119, #3210, #3812, #4899, #4661 | FDP 기능 목록, MP 통합 검증 조건, 머지 여부 |
| LMCache 소스 머리말 | `lmcache/v1/storage_backend/connector/hf3fs_adapter.py` 외 2 | Samsung Electronics 저작권 표기 |
| Mooncake 문서·PR | `docs/source/performance/mooncake/ssd-offload-benchmark-results.md` ; PR #2806·#2922·#3128·#3758 헤드 커밋 | 삼성 SSD는 테스트 장비로만 등장, 작성자 이메일 |
| torvalds/linux 커밋 | GitHub 커밋 검색(`write stream`, `author-email:joshi.k@samsung.com`) | write streams 시리즈 서명, 2026-08 FDP 수정, XFS write streams 미머지 |
| GitHub 프로필 | github.com/DongDongJu, ankit-sam, daegyu94, Wenwen-Chen, jayhpark530, MMuzzammil1, 2xdevv, nayeonikim, Daejun | 회사·거점 표기 |
| vLLM 블로그 원문 | https://raw.githubusercontent.com/vllm-project/vllm-project.github.io/main/_posts/2026-04-14-vllm-korea-meetup-2026.md | 삼성 발표 주제 |
| xnvme/aisio README | https://raw.githubusercontent.com/xnvme/aisio/main/README.md | 삼성 저작권, 목적 |
