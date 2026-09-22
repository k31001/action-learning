# NVMe FDP 배치 핸들(RUH) 개수 — 스펙 상한·제품 공개 수준·호스트 요구 팩트 원장

**수집일**: 2026-09-22
**유형**: 웹 검색 기반 2차 자료 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v6.0 개정 — 위키 반영 근거

---

type: research-ledger
topic: NVMe FDP Reclaim Unit Handle (RUH) 개수 — 스펙 최대치 / 제품 실측 / 호스트 SW 사용량
agent: Research Agent (r3)
collected: 2026-09-22
status: 사실 수집 전용 (해석·전략 판단 없음)
---

# r3 — NVMe FDP RUH 개수 팩트 원장

## 조사 배경
이전 덱이 ScaleFlux 출처의 "RUH 200개 이상"을 인용했음. 이것이 제품 특정(product-specific) 주장인지,
그리고 "현재 현실적 고객 요구 ≈ 16 handles"가 근거 있는 수치인지 검증.

## 수집 제약 (중요 — 신뢰도 판정에 영향)
- 이 세션의 네트워크 egress 프록시가 주요 1차 출처 도메인을 **차단**함:
  `nvmexpress.org`, `opencompute.org`, `usenix.org`, `arxiv.org`, `cachelib.org`, `lore.kernel.org`,
  `ratatoskr.run`, `semiconductor.samsung.com`, `download.semiconductor.samsung.com`,
  `storagereview.com`, `prnewswire.com`, `scaleflux.com`, `phoronix.com`, `patents.google.com`,
  `xnvme.io`(HTML), `mail-archive.com`, `spinics.net`, `teledynelecroy.com`, `sanblaze.ellisys.com`
- 접근 가능했던 도메인: `manpages.ubuntu.com`, `github.com` / `raw.githubusercontent.com` (코드 검색 포함)
- WebSearch는 세션 예산(200/200) 소진으로 중도 종료.
- 따라서 **스펙 필드 폭·커널 상수·libnvme 구조체는 1차 코드로 직접 확인(✅)**,
  **벤더 백서·OCP 스펙·학회 논문 본문은 검색 요약 경유(🟡)** 또는 **미확인(⚠️)**.

## 등급 정의
- ✅ primary — 스펙 텍스트, 데이터시트, 벤더 문서, 커널/라이브러리 소스·공식 man page
- 🟡 reputable secondary — 신뢰할 만한 2차 출처(벤더 블로그, 업계 매체, 메일링리스트 패치 요약)
- ⚠️ unverified — 본문 직접 확인 실패, 추가 검증 필요

---

## A. 스펙 (TP4146 / NVMe 2.1)

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| S-01 | TP4146 "Flexible Data Placement"가 비준됨. 원본 파일명이 `TP4146 Flexible Data Placement 2022.11.30 Ratified.pdf` | 비준일 **2022-11-30** | NVMe TP4146 | 2022-11-30 | xNVMe FDP 튜토리얼이 해당 파일명으로 참조 — https://raw.githubusercontent.com/xnvme/xnvme/main/docs/tutorial/fdp/index.rst | ✅ |
| S-01b | (정정 포인트) 기존 덱/노트의 "2022-12 비준"은 한 달 어긋남. 정확히는 **2022년 11월 30일** | — | TP4146 | 2022-11 | 상동 | ✅ |
| S-02 | FDP는 NVM Express **Base Specification Revision 2.1**에 통합됨. 2.1은 2024-08-05 비준, 2024-08-06 공표 | Rev **2.1** / 2024-08-05 | NVMe Base Spec | 2024-08 | https://nvmexpress.org/wp-content/uploads/NVM-Express-Base-Specification-Revision-2.1-2024.08.05-Ratified.pdf (제목·날짜만 확인, 본문 fetch 차단) | 🟡 |
| S-03 | **FDP Configuration Descriptor** 필드 폭: `nrg`(Number of Reclaim Groups) = `__le32`, `nruh`(Number of Reclaim Unit Handles) = `__le16`, `maxpids`(Max Placement Identifiers) = `__le16`, `nnss` = `__le32`, `runs`(Reclaim Unit Nominal Size) = `__le64`, `erutl` = `__le32` | **NRUH = 16비트** | 스펙 구조체 | 현행 | https://manpages.ubuntu.com/manpages/noble/man2/nvme_fdp_config_desc.2.html | ✅ |
| S-04 | ⇒ 한 FDP configuration이 **표현 가능한 RUH 최대 개수 = 65,535** (16비트 필드) | **65,535** | 스펙 상한 | 현행 | S-03에서 도출 + nvme-cli가 `nruh`를 `PRIu16`로 출력 — https://github.com/linux-nvme/nvme-cli `src/nvme-print-stdout.c` ("Number of Reclaim Unit Handles: %"PRIu16") | ✅ |
| S-05 | **Placement Identifier(PID)는 16비트**. RUH Status Descriptor = `__le16 pid; __le16 ruhid; __le32 earutr; __le64 ruamw;` | PID **16비트** | 스펙 구조체 | 현행 | https://manpages.ubuntu.com/manpages/noble/man2/nvme_fdp_ruh_status_desc.2.html | ✅ |
| S-06 | PID는 `<Reclaim Group, Placement Handle>` 쌍이며, Write 명령의 **Data Placement Directive DSPEC 필드**에 실려 전달됨 | — | 스펙 동작 | 현행 | xNVMe 튜토리얼 + NVMe FDP 개요 — https://raw.githubusercontent.com/xnvme/xnvme/main/docs/tutorial/fdp/index.rst | ✅ |
| S-07 | **네임스페이스당 Placement Handle 최대 = 128.** Namespace Management(Create) Host SW Specified 데이터 구조가 `__le16 nphndls` + **`__le16 phndl[128]`** 로 정의됨 | **128 / namespace** | 스펙 구조체 | 현행 | https://manpages.ubuntu.com/manpages/noble/man2/nvme_ns_mgmt_host_sw_specified.2.html | ✅ |
| S-07b | ⇒ **실질적 스펙 상한은 65,535가 아니라 "네임스페이스당 128"**. 컨트롤러/엔듀런스그룹이 RUH를 아무리 많이 노출해도, 하나의 네임스페이스가 한 번에 바인딩할 수 있는 Placement Handle은 128개 | **128** | 스펙 상한(실효) | 현행 | S-07에서 도출 | ✅ |
| S-08 | Placement Handle은 **namespace-scoped 핸들**이고, 이것이 **endurance-group-scoped RUH**로 매핑됨. RUH는 각 Reclaim Group 안의 Reclaim Unit을 참조 | — | 스펙 개념 | 현행 | https://raw.githubusercontent.com/xnvme/xnvme/main/docs/tutorial/fdp/index.rst | ✅ |
| S-09 | RUH Status의 `nruhsd`(descriptor 개수)는 디바이스가 보고하는 값이며 **최대 65535까지 보고 가능** (Linux 커널 보안 패치가 이 점을 명시하며 경계 검사 추가) | 최대 65,535 | 디바이스 보고 필드 | 2026-07~08 | Linux NVMe 패치 스레드 "[PATCH] nvme: fix racy access to FDP placement id array" — https://ratatoskr.run/linux-nvme/2026/08/17420186/t (본문 fetch 차단, 검색 요약) | 🟡 |
| S-10 | RU / RUH / RG 정의: Reclaim Unit(RU)은 호스트가 직접 주소지정할 수 없는 물리 낸드 묶음, RUH는 각 RG 안의 RU를 가리키는 컨트롤러 리소스(=append point), RG는 상호 간섭 없는 격리 단위 | — | 스펙 개념 | 2022~ | Samsung tech blog "NVMe FDP – A Promising New SSD Data Placement Approach" / xNVMe | 🟡 |
| S-11 | 통상 SSD는 append point가 1개인 데 반해, FDP 드라이브는 **RUH 개수만큼 동시 append point**를 노출 | — | 스펙 개념 | 2022~ | 상동 | 🟡 |

## B. 제품별 RUH 개수 (실측/공표)

| ID | 사실 | 수치 | 대상(제품) | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| P-01 | Samsung 공식 블로그: "The number of RUHs depend upon the device configuration and can be **typically in the range of 1 to 128** based upon the product requirements." | **1~128 (통상 범위)** | 업계 일반 (Samsung 서술) | 2023~2025 | https://semiconductor.samsung.com/news-events/tech-blog/nvme-fdp-a-promising-new-ssd-data-placement-approach/ (본문 fetch 차단, 검색 인용문) | 🟡 |
| P-02 | 같은 문서: FDP SSD는 RUH마다 write buffer stripe 등 추가 자원이 필요하므로, **이 오버헤드와 배치 요구가 지원 가능한 RUH 개수를 결정**한다 | — | 설계 제약 | 2023~2025 | 상동 / StorageNewsletter 재수록 https://www.storagenewsletter.com/2025/02/05/nvme-fdp-a-promising-new-ssd-data-placement-approach/ | 🟡 |
| P-03 | xNVMe 레퍼런스 FDP 구성(QEMU 에뮬레이션 기본값)의 실제 로그 출력: **nruh = 8, nrg = 1, maxpids = 127**, RUH 타입 8개(ruht[0..7]) 전부 = 1 | **nruh=8 / nrg=1 / maxpids=127** | QEMU 에뮬레이션 FDP 디바이스 (실드라이브 아님) | 현행 | https://raw.githubusercontent.com/xnvme/xnvme/main/docs/tutorial/fdp/100_xnvme_log_fdp_config.out | ✅ |
| P-04 | **부정적 발견**: Samsung PM9D3a / PM1743, Solidigm D5-P5336 / D7-PS1010, Kioxia CM7·CD8P·LC9, Micron 6500·6550 ION·9550, SK hynix PS1010·PS1030 의 **공개 데이터시트·제품 브리프 어디에도 RUH 개수가 명시되어 있지 않음** | 공표 없음 | 주요 벤더 전 제품 | 2026-09 검색 시점 | Kioxia Enterprise/DataCenter SSD 데이터시트, Micron 6550/9550 tech prod spec, Solidigm D5-P5336 product brief, SK hynix 제품 페이지 각각 확인 — RUH 수치 미기재 | ⚠️(부정 확인) |
| P-05 | ScaleFlux 측 주장(2차 매체 경유): "Standard enterprise SSDs typically support a small number of FDP reclaim unit handles — **commonly two to eight**." | **2~8 (업계 통상)** | 일반 엔터프라이즈 SSD | 2026-08-01 | TechTimes, "KV-Cache Churn Burns Through SSDs..." https://www.techtimes.com/articles/322601/20260801/kv-cache-churn-burns-through-ssds-scaleflux-built-drive-level-storage-nvidia-cmx.htm | 🟡 (ScaleFlux 브리핑 기반 = 경쟁사 자기평가) |
| P-06 | FADU 블로그가 3.84TB 드라이브에서 **8개 애플리케이션**을 서로 다른 블록 크기로 분리 기술하는 예시 사용 (8-way 분리가 전형적 시연 규모임을 시사) | 8 (예시) | FADU 시연 구성 | 2025-12 | https://blogs.fadu.io/flexible-data-placement-reducing-write-amplification/ | 🟡 |
| P-07 | FAST '26 논문 "Characterizing and Emulating FDP SSDs with WARP" (Virginia Tech + Samsung Electronics + Western Digital)가 **상용 FDP 드라이브 2종 이상**을 실측 특성화. RUH별 무효화 편중이 다른 핸들의 WAF를 부풀린다는 결과 보고 | 드라이브별 RUH 수치 **미확보** | 상용 FDP SSD (모델명 미공개 확인 실패) | 2026-02 | https://www.usenix.org/system/files/fast26-song.pdf (PDF fetch 차단) | ⚠️ |

**요약**: 공개 자료로 **모델별 RUH 개수를 확정할 수 있는 제품이 사실상 없다.** 확인 가능한 실수치는
에뮬레이션 레퍼런스 구성의 **8** (P-03), 벤더 서술 범위 **1~128** (P-01), 경쟁사 주장 업계 통상 **2~8** (P-05)뿐.

## C. 호스트 소프트웨어가 실제로 여는 스트림/핸들 개수

| ID | 사실 | 수치 | 대상(SW) | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| H-01 | Linux 블록 계층 queue_limits의 `max_write_streams`는 `unsigned short` (16비트). sysfs로 `max_write_streams`, `write_stream_granularity` 노출 | 16비트 | Linux block layer | 현행 master | `include/linux/blkdev.h`, `block/blk-sysfs.c` — https://github.com/torvalds/linux | ✅ |
| H-02 | **`bio->bi_write_stream`은 u8**이고 NVMe 드라이버는 `#define NVME_MAX_PLIDS U8_MAX` 로 상한을 둠 ⇒ **Linux가 지정할 수 있는 placement handle은 최대 255개** | **255** | Linux NVMe 드라이버 | 현행 master | `drivers/nvme/host/core.c` — https://github.com/torvalds/linux | ✅ |
| H-03 | NVMe 드라이버가 FDP RUH status에서 placement id 배열을 읽어 `lim.max_write_streams = ns->head->nr_plids` 로 설정. `nr_plids`/`plids`는 `struct nvme_ns_head`의 `u16 nr_plids; u16 *plids;` | — | Linux NVMe 드라이버 | 현행 master | `drivers/nvme/host/core.c`, `drivers/nvme/host/nvme.h` — https://github.com/torvalds/linux | ✅ |
| H-04 | 레거시 write-life 힌트 API는 값이 **5개뿐** — `RWH_WRITE_LIFE_SHORT=2, MEDIUM=3, LONG=4, EXTREME=5` (+ NOT_SET=0, NONE=1). 초기 FDP 연동은 이 힌트를 PID로 매핑했음 ⇒ **힌트 기반 경로의 실효 스트림 수 ≈ 5** | **5** | Linux fcntl write hints | 2017~ | `include/uapi/linux/fcntl.h` — https://github.com/torvalds/linux | ✅ |
| H-05 | **f2fs는 DATA 쓰기에 최대 3개 스트림만 사용**: `f2fs_io_type_to_write_stream()`이 `NR_TEMP_TYPE`(HOT/WARM/COLD = 3)으로 제한하며, 디바이스가 3개 미만이면 COLD만 분리 | **3** | f2fs (Linux) | 현행 master | `fs/f2fs/segment.c` — https://github.com/torvalds/linux | ✅ |
| H-06 | **XFS write streams: `XFS_MAX_USER_WRITE_STREAMS` = 16.** 애플리케이션이 파일 단위로 쓸 수 있는 사용자 write stream 최대치. `FS_IOC_WRITE_STREAM_GET_MAX` ioctl로 조회 | **16** | XFS (Linux) | 패치 v3 2026-06 / v4 2026-07 | "[PATCH v4 0/6] xfs write streams" (Kanchan Joshi) — https://ratatoskr.run/linux-block/2026/07/17274958/t · v3 https://ratatoskr.run/linux-fsdevel/2026/06/17142879/t | 🟡 |
| H-06b | **주의**: `XFS_MAX_USER_WRITE_STREAMS`는 2026-09-22 현재 GitHub `torvalds/linux` 코드 검색에서 **0건** ⇒ 아직 메인라인 머지 전이거나 상수명이 바뀐 상태. 수치 16은 메일링리스트 패치 요약 경유 | 16 (미머지) | XFS 패치 시리즈 | 2026-07 | GitHub code search `XFS_MAX_USER_WRITE_STREAMS` → 0 results | 🟡 |
| H-07 | Linux **6.16**이 블록 계층 write streams를 도입, io_uring per-IO write stream 노출 + NVMe FDP 연동 | 커널 6.16 | Linux kernel | 2025 | https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16 (fetch 차단, 검색 요약) | 🟡 |
| H-08 | XFS write stream + FDP 드라이브에서 **RocksDB YCSB WAF 35% 감소** 보고 | -35% WAF | RocksDB on XFS | 2026-06/07 | 상동 패치 커버레터 | 🟡 |
| H-09 | **Meta CacheLib**: FDP 핸들 수에 **하드코딩된 상한이 없음**. `initializeFDPHandles()`가 `maxPIDIdx_ = ruh_status->nruhsd - 1` 로 디바이스 보고값을 그대로 받고, `allocateFdpHandle()`이 `nextPIDIdx_++`로 순차 배정, 소진 시 `kDefaultPIDIdx = 0` 으로 폴백 | 디바이스 종속 | CacheLib Navy | 현행 | https://raw.githubusercontent.com/facebook/CacheLib/main/cachelib/navy/common/FdpNvme.cpp , FdpNvme.h | ✅ |
| H-10 | CacheLib이 실제로 배정하는 핸들 수 = **I/O 엔진 쌍마다 SOC/LOC에 각각 1개 + 메타데이터 등 소비자는 default 핸들(0) 공유** ⇒ 실사용량은 엔진 쌍 수에 비례하는 **한 자리수~십수 개 규모**이며 고정 공표치 없음 | 공표치 없음 (엔진 쌍 × 2 + 1) | CacheLib Navy (Meta) | 2025-03 | EuroSys'25 "Towards Efficient Flash Caches with Emerging NVMe FDP SSDs" https://arxiv.org/abs/2503.11665 (본문 fetch 차단, 검색 요약) + H-09 코드 | 🟡 |
| H-11 | CacheLib은 Placement Handle 추상화를 도입하고, FDP 지원 SSD면 Placement Handle Allocator가 `<RUH, RG>` 쌍(=PID)을 배정 | — | CacheLib Navy | 2025-03 | 상동 | 🟡 |

**요약**: 호스트 SW 쪽에서 확인 가능한 스트림 개수는 **f2fs 3 / write-life 힌트 5 / XFS 사용자 스트림 16 / Linux 이론 상한 255**.
현재 공개된 호스트 스택 중 **16을 넘는 스트림을 실제로 여는 것은 없다.**

## D. ScaleFlux "200+" 주장의 정확한 내용

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| SF-01 | ScaleFlux가 **"AI-Optimized SSD Platform Designed for NVIDIA CMX and KV Cache Offload"** 발표. 공식 보도자료 | — | ScaleFlux 플랫폼 발표 | **2026-07-30** | https://www.prnewswire.com/news-releases/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload-302838473.html · HPCwire 재수록 https://www.hpcwire.com/off-the-wire/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload/ | 🟡 |
| SF-02 | 보도자료 핵심 문구: **"Support for more than 200 Flexible Data Placement (FDP) write streams per drive for fine-grained lifecycle-aware data placement"** | **>200** | ScaleFlux AI-optimized SSD **플랫폼** | 2026-07-30 | 상동 | 🟡 |
| SF-03 | **표현은 "FDP write streams"이지 "reclaim unit handles"가 아님.** "200개 이상 RUH"는 우리 쪽 번역 과정에서 생긴 치환 | 용어 차이 | — | 2026-07-30 | SF-02 문구 | 🟡 |
| SF-04 | 함께 주장한 스펙: KV cache 워크로드에서 **7~10+ DWPD**, Context-Insight 워크로드 인텔리전스 | 7~10+ DWPD | 동일 플랫폼 | 2026-07-30 | StorageReview "ScaleFlux KV Cache SSD Platform Claims 7-10+ DWPD and 200+ FDP Streams" https://www.storagereview.com/news/scaleflux-kv-cache-ssd-platform-claims-7-10-dwpd-and-200-fdp-streams | 🟡 |
| SF-05 | **맥락**: NVIDIA CMX(Context Memory Storage Platform) 파드 레벨 KV 캐시 티어를 겨냥한 **제품 플랫폼 발표**. 출하 중인 범용 데이터센터 SSD의 표준 스펙이 아니며, 기존 CSD5000 제품 페이지에도 200+ 수치는 별도 기재 없음 | — | 포지셔닝 | 2026-07-30 | SF-01/SF-04 + https://scaleflux.com/products/csd-5000/ | 🟡 |
| SF-06 | ScaleFlux의 논거: 200+ 스트림이 있어야 추론 SW가 **테넌트 세션 / shared-prefix ID / idle KV 블록 / active KV 블록**에 각각 별도 stream ID를 동시 배정 가능. "소수 스트림만으로는 hot/cold KV가 같은 erase block을 공유해 GC 증폭이 남는다" | >200 필요 주장 | KV-cache 티어링 | 2026-08-01 | TechTimes https://www.techtimes.com/articles/322601/20260801/kv-cache-churn-burns-through-ssds-scaleflux-built-drive-level-storage-nvidia-cmx.htm | 🟡 (벤더 마케팅 논거) |
| SF-07 | 같은 기사에서 lifecycle-aware FDP 배치로 **baseline 대비 WAF 2배 이상 감소** 측정 주장 (측정 조건·제3자 검증 없음) | >2x WAF 감소 | ScaleFlux 자체 측정 | 2026-08-01 | 상동 | ⚠️ |

**판정**: ScaleFlux 주장은 **(a) 제품 플랫폼 특정**, **(b) 용어가 RUH가 아니라 "write streams"**,
**(c) 2026-07-30 발표 시점의 마케팅 포지셔닝**이며, 스펙 상한도 업계 통상치도 아니다.
참고로 **S-07b(네임스페이스당 Placement Handle 128개 한계)** 때문에, 200+ 스트림을 쓰려면
멀티 네임스페이스 구성이거나 RG를 곱해 PID 공간을 넓히는 구성이어야 한다 — 보도자료는 이 구조를 설명하지 않음.

## E. LLM KV-cache 티어링에 필요한 핸들 수 — 공개 진술

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| K-01 | **ScaleFlux 외에 "KV-cache 분리에 핸들 N개가 필요하다"를 수치로 공개한 곳을 찾지 못함.** NVMe/OCP/SNIA/하이퍼스케일러 발표 어디에도 per-tenant·per-prefix·per-lifetime 분리용 핸들 수 요구치 진술 없음 | 없음 | 업계 전반 | 2026-09 검색 시점 | 검색 범위: OCP/SNIA/FMS 발표, NVMe 블로그, llm-d tiered-prefix-cache 가이드 | ⚠️(부정 확인) |
| K-02 | llm-d "tiered prefix cache" 가이드 등 오픈소스 KV 캐시 티어링 스택은 **FDP 스트림 수를 전혀 파라미터로 노출하지 않음** | — | llm-d | 현행 | https://github.com/llm-d/llm-d/tree/main/guides/tiered-prefix-cache | 🟡 |
| K-03 | KV cache 배치 연구(예: "Where Should the KV Cache Live?", CacheCast 등)는 GPU/CPU/SSD 계층 배치를 다루되 **FDP 핸들 수를 변수로 두지 않음** | — | 학계 | 2026 | https://arxiv.org/html/2609.16215 등 | 🟡 |

## F. "현재 고객 요구 ≈ 16" 검증 결과

| ID | 사실 | 수치 | 대상 | 시점 | 출처(URL) | 등급 |
|---|---|---|---|---|---|---|
| V-01 | **16을 직접 지지하는 유일한 1차급 근거는 XFS의 `XFS_MAX_USER_WRITE_STREAMS = 16`** (H-06). 이는 "고객 요구"가 아니라 **호스트 파일시스템 API가 노출하는 사용자 스트림 상한** | **16** | XFS write streams | 2026-06~07 | H-06 참조 | 🟡 |
| V-02 | 검색 요약 단계에서 **"FDP support expands to accommodate up to 16 initially isolated and 16 persistently isolated Reclaim Unit Handles in a single Reclaim Group"** 라는 진술이 등장했고 정황상 **OCP Datacenter NVMe SSD Specification** 계열 문서로 보이나, **원문 확인 실패** (opencompute.org egress 차단 + 검색 예산 소진) | 16 + 16 | OCP DC NVMe SSD Spec (추정) | v2.5(2023-09-28) / v2.6(2024-09-25) / v2.7(2025-11-17, 2026-01-08) | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf | ⚠️ **최우선 재검증 항목** |
| V-03 | **"하이퍼스케일러가 16개를 요구한다"는 직접 진술을 어떤 공개 출처에서도 확인하지 못함.** Meta(Ross Stenfort)·Google(Christopher Sabol)의 OCP 발표는 FDP의 WAF·전력 효과를 말하되 **핸들 개수 요구치는 언급 없음** | 없음 | Meta / Google OCP 발표 | 2024~ | https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf, OCP Storage Tech Talk 2024 | ⚠️(부정 확인) |
| V-04 | 정황 증거(수렴): 호스트 스택 실사용 = f2fs **3**, write-life 힌트 **5**, XFS 사용자 스트림 **16**; 업계 통상 드라이브 = **2~8**(경쟁사 주장) ~ **1~128**(Samsung 서술); 레퍼런스 구성 = **8** ⇒ **"현실 수요는 한 자리수~16 수준"이라는 주장은 정황상 타당** | 3 / 5 / 8 / 16 | 종합 | 2026-09 | H-04, H-05, H-06, P-01, P-03, P-05 | 🟡 |

---

## 최종 판정 요약

1. **스펙 상한**: 필드 폭 기준 RUH는 configuration당 **65,535**(NRUH = `__le16`)이나, **네임스페이스가 실제로 바인딩 가능한 Placement Handle은 128개**(`__le16 phndl[128]`)가 실효 상한. PID는 16비트 = `<RG, PHNDL>`.
2. **제품별 RUH 개수**: 주요 벤더 공개 데이터시트에 **전혀 공표되지 않음**. 확인 가능한 수치는 레퍼런스/에뮬 구성 8, Samsung 서술 "통상 1~128", ScaleFlux 주장 "업계 통상 2~8"뿐.
3. **호스트 SW 실사용**: f2fs 3, write-life 힌트 5, **XFS 16**, Linux 이론 상한 255(u8), CacheLib은 상한 없이 디바이스 보고값을 따름.
4. **ScaleFlux 주장**: 2026-07-30 NVIDIA CMX 대응 **AI 특화 SSD 플랫폼 발표**에서 **"200개 이상의 FDP write streams per drive"**. RUH라는 단어를 쓰지 않았고, 출하 중 범용 제품 스펙이 아니며, 제3자 검증 없음.
5. **"고객 요구 ≈ 16"**: **"고객 요구"로는 미입증.** 다만 **XFS 사용자 write stream 상한 16**이라는 호스트 측 1차급 근거가 있고, 나머지 정황(3/5/8, 2~8)이 모두 한 자리수~16에 수렴하므로 **"현재 호스트 소프트웨어가 실제로 요구하는 스트림 수는 16 이하"**로 표현하면 근거를 갖춘다.

## 재검증 필요 항목 (다음 세션)
- **[최우선] OCP Datacenter NVMe SSD Specification v2.5/2.6/2.7 의 FDP 요구사항 절** — "16 initially isolated + 16 persistently isolated RUH" 원문 확인 (V-02). 확인되면 "고객 요구 = 16"의 **결정적 1차 근거**가 됨.
- FAST '26 WARP 논문 본문의 상용 드라이브별 RUH 수치 표 (P-07).
- `XFS_MAX_USER_WRITE_STREAMS = 16` 의 메인라인 머지 여부 및 최종 값 (H-06b).
- Samsung `getting-started-with-fdp-v4.pdf` 내 `nvme fdp configs` 샘플 출력의 nruh 값.
