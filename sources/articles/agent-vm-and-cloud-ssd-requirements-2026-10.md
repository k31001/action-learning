# 에이전트 VM · 범용 클라우드 · AI 학습의 SSD 요구 팩트 원장 (2026-10)

**수집일**: 2026-10-06
**수집자**: Research Agent (사실 수집 전용, 판단·권고 없음)
**목적**: "에이전트 서비스(Meta Muse · OpenAI dots 등 사용자별 클라우드 VM)는 KV 캐시가 아닌 영역에서 고DWPD가 아니라 고용량이 필요한가"를 사실로 점검하고, 범용 클라우드·AI 학습 DC의 SSD 요구를 차트용 수치로 정리한다.

**신뢰도 범례**: ✅ 원문 확인 · 🟡 검색 요약/2차 보도 · ⚠️ 파생 또는 충돌

---

## 0. 방법 고지

- **접근 제약**: 이번 세션의 egress 프록시가 다음을 차단했다(WebFetch·curl): `e2b.dev`, `docs.e2b.dev`, `modal.com`, `fly.io`, `www.daytona.io`, `developers.cloudflare.com`, `research.meta.ai`, `mouse.dev`, `metafilter.com`, `news.ycombinator.com`, `dev.to`, `ai-tldr.dev`, `techmeridian.news`, `trendforce.com`, `iconnect007.com`, `emsnow.com`, `s25.q4cdn.com`(Micron IR), `images.samsung.com`(Samsung IR), `vastdata.com`, `community.vastdata.com`, `tigrisdata.com`, `solidigm.com`, `americas.kioxia.com`, `opencompute.org`(스테이징 포함), `web.archive.org`, `files.futurememorystorage.com`, `sanblaze.ellisys.com`, `allion.com`, `blocksandfiles.com`, `old.flashmemorysummit.com`, `vldb.org`, `www-api.ibm.com`, `docs.cloud.google.com`, 대학 논문 호스트 다수.
- **직접 열람 성공 경로**: GitHub `git clone`/`raw.githubusercontent.com`(Firecracker·E2B infra·Agent Substrate·Fly docs·Muse 포렌식 저장소·논문 변환본 `lqhl/awesome-system-papers`), `www.microsoft.com`(FlashBlox PDF), `cloud.google.com`(블로그 원문, 일부는 2026-10-03 세션 저장본 재열람). ✅는 이 경로로 원문을 읽은 항목에만 붙였다.
- **기존 원장 ID 참조(반복하지 않음)**: [datacenter-types-storage-requirements-2026-10.md](datacenter-types-storage-requirements-2026-10.md)의 **DT-02**(Muse 2 vCPU·8GB·100GB 관측, 공식 여부 충돌), **DT-04**·**DT-5B**(Muse 규모 추정), **DT-06**(OpenAI dots 자원 비공개), **DT-10**(클라우드 EB 대부분 HDD), **DT-13**(Alibaba·Tencent 블록 스토리지 쓰기 우세, IISWC'20), **DT-20~DT-29**(Llama 3·SuperPOD·체크포인트), **DT-51·DT-52**(세션 append-only 로그·superstep 체크포인트), **DT-53**(GKE Agent Sandbox "10s~100s of millions of instances, increasingly idle"), **DT-54**(Agent Substrate 로컬 디스크+Cloud Storage 스냅샷, 호스트당 휴면 1,000+, 초당 500+ suspend/resume, 500ms 미만 재개), **DT-55**, **DT-58**(AgentCore 세션별 microVM 최대 8시간). [ssd-customer-high-dwpd-evidence-2026-10.md](ssd-customer-high-dwpd-evidence-2026-10.md)의 **CU-13/CU-13a**(Microsoft 플릿 0.07~0.23 DWPD), **CU-15**(NetApp 중앙값 0.36 DWPD). [ssd-mixed-media-hyperscaler-logic-2026-10.md](ssd-mixed-media-hyperscaler-logic-2026-10.md)의 **MX-34**(Alibaba FAST'26 로컬 디스크 p99.9 > 1ms @QD128, GC). [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md)의 **MM-20·MM-24**(CSAL·Alibaba QLC 로컬 디스크). [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)의 **X-03**(장시간 에이전트 LMCache-on-NVMe 읽기 92%/쓰기 8%), **D-03**(KV 티어 실측 3.2 DWPD). [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md)의 **B06**·**B07**·**C08**(OCP Latency Monitor, QoS 표 ⚠️, Micron 7450 6-nines ≤2ms). [qlc-v6-inflection-2028-demand-path-2026-09.md](qlc-v6-inflection-2028-demand-path-2026-09.md)의 **B-21**(Micron: 에이전트 워크로드 용량 10~40배). [ssd-future-candidate-power-cooling-2026-10.md](ssd-future-candidate-power-cooling-2026-10.md)의 **PC-51**(Meta QLC R+4W ≥ 32MB/s/TB).

---

## A. 에이전트 VM의 스토리지 프로파일

### A-1. Muse Secure VM · OpenAI dots 클라우드 컴퓨터

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| AV-01 | Muse 런타임 구조(제3자 블랙박스 측정): Cloud Hypervisor/KVM 게스트 안에 systemd-nspawn 워크로드 셀, root는 user namespace로 호스트 uid 131072에 매핑. DMI 벤더 `cloud-hypervisor`, 스왑 없음 | 하이퍼바이저 Cloud Hypervisor, RAM 약 7.75 GiB(게스트 전체), Swap 0 | 2026-09-30 (저장소 커밋) | https://github.com/sys-dissect/meta-muse-sandbox-architecture (part1-the-cage/README.md) | ✅ (제3자 관측 원문, Meta 공식 아님) |
| AV-02 | Muse 파일시스템 배치: `/` = overlayfs 7.5 GiB, `/home/hatch` = Btrfs 100 GiB(소스 `/dev/mapper/rv`, 옵션 `compress-force=zstd:3`), `/tmp` tmpfs 512 MB, `/var/tmp` tmpfs 2 GiB. 저장소 진술: "The only large durable writable area is `/home/hatch` (100G btrfs)". 한 프로브의 `df -h`: `/` 34M 사용, `/home/hatch` 567M 사용·99G 여유 | 100 GiB 영속 / 7.5 GiB 루트 / 사용 567 MB | 2026-09-30 | 상동 (part1-the-cage/evidence/vm-boundary-probe-report.md, sandbox-telemetry-audit.md) | ✅ (제3자 관측) |
| AV-03 | Muse 저장 계층의 압축·불확정성: 루트에 0으로 채운 2 GB를 쓰자 물리 공간 변화는 약 58 MB(투명 압축 또는 sparse 할당과 정합). `/dev/mapper` 노드·`/dev/disk/by-*` 미노출로 블록 계층이 로컬 장치인지 네트워크·암호화·loop인지 "NOT DETERMINABLE". 같은 부팅 안의 영속성만 확인, 재부팅·재배치 후 생존은 미시험 | 2 GB 기록 → 약 58 MB 소비 | 2026-09-30 | 상동 | ✅ (제3자 관측) |
| AV-04 | Muse 별도 관측 보도: 홈 볼륨 100 GB 중 **1.7 GB 사용·98 GB 여유**, 루트 7.5 GB overlay 거의 비어 있음·non-rotational(SSD 기반) 보고, **순차 쓰기 약 177 MB/s · 순차 읽기 약 644 MB/s(direct I/O)**, AMD EPYC 9D25에서 2 vCPU, RAM 7.7 GB 중 약 3 GB 사용 | 1.7/100 GB, 177/644 MB/s | 2026-09 | StarkInsider https://www.starkinsider.com/2026/09/meta-muse-specs-what-it-runs-on.html ; Tom's Hardware https://www.tomshardware.com/pc-components/cpus/meta-muse-runs-agents-on-amd-epyc-turin-hosts-with-two-cores-and-8gb-of-memory-ai-agent-can-pass-terminal-commands-to-ubuntu-host-system | 🟡 / ⚠️ (대역 수치의 원 측정 출처 특정 실패) |
| AV-05 | Meta 공식 설명(검색 요약): 각 VM은 "an isolated Linux box with a browser and enough storage, CPU, and memory to do real work"(코드 컴파일·스킬 개발·동시 하위 에이전트·cron). 내구 애플리케이션 상태는 런타임 셀 밖 PostgreSQL, 파일·워크스페이스 데이터는 전용 VM 안. 향후 Meta도 접근 못 하는 "Muse Confidential VM" 선택지 예고 | 정성 | 2026-09 | Meta https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse (차단) ; 도움말 https://www.meta.com/help/artificial-intelligence/1047255454427887/ | 🟡 |
| AV-06 | Muse 파일시스템 내보내기 사건: 사용자 요청으로 Muse가 자기 샌드박스 루트 파일시스템을 압축해 Google Drive로 전송. **압축 약 2.7 GB, 해제 6.8 GB**. 하위 에이전트 대화 기록 113건, 내부 매뉴얼 약 20건, OpenAI Codex CLI 사본, SSH 키 파일 포함. Meta 버그바운티는 "Not Applicable" 처리 | 6.8 GB (해제) | 2026-09 | mouse.dev https://mouse.dev/blog/muse-runtime-export/ (차단) ; HN https://news.ycombinator.com/item?id=49802871 ; remio https://www.remio.ai/post/meta-muse-filesystem-export-exposes-the-gap-between-isolation-and-control | 🟡 |
| AV-07 | OpenAI dots VM 관측(Geekbench 7 결과 경유): 호스트 AMD EPYC 9V74(80코어), **dot VM당 9코어 · 메모리 9.73 GB · 스토리지 32 GB**, GB7 싱글 1,667·멀티 9,435(Muse 대비 멀티코어 약 6배). OpenAI는 CPU·RAM·스토리지 할당을 공식 공개하지 않음(DT-06). 2차 보도는 각 dot이 영속 VM·브라우저·터미널·파일시스템·메모리·cron 러너를 가진다고 서술 | 9코어 / 9.73 GB / 32 GB | 2026-09-30~10-01 | Tom's Hardware https://www.tomshardware.com/tech-industry/artificial-intelligence/geekbench-7-results-suggest-openais-dots-agent-runs-on-nine-core-amd-epyc-vms-with-nearly-10gb-of-memory-newest-runs-score-about-six-times-meta-muse-in-multi-core ; Wccftech https://wccftech.com/openais-dot-vm-is-hosted-on-an-amd-epyc-9v74-80-core-processor-where-each-9-core-vm-instance-has-9-73-gb-of-memory-and-sports-a-multi-core-score-of-9435-on-geekbench-7/ ; newmobilelife https://www.newmobilelife.com/2026/10/01/openai-dots-geekbench-7-epyc-vms/ | 🟡 (벤치마크 경유 관측, 공식 아님) |
| AV-08 | OpenAI Codex 클라우드 환경: 컨테이너 상태를 **최대 12시간** 캐시(설정 변경 시 무효화). DevDay(2026-09-29)에서 클라우드 작업을 격리 샌드박스가 아니라 **지속·재사용 가능한 환경**으로 전환 발표. 2026-06-11 Ona(구 Gitpod) 인수: 세션 종속 샌드박스에서 영속 클라우드 환경으로 | 12시간 캐시 | 2026-06-11 / 2026-09-29 | OpenAI https://developers.openai.com/codex/cloud/environments ; TechCrunch https://techcrunch.com/2026/09/29/openai-gives-codex-reusable-cloud-environments-that-work-across-devices/ ; https://codex.danielvaughan.com/2026/06/14/openai-acquires-ona-gitpod-codex-cli-persistent-cloud-agents-enterprise-execution-environments/ | 🟡 |

### A-2. microVM·샌드박스 스냅샷 메커니즘 (suspend 1회당 몇 바이트를 어디에 쓰는가)

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| AV-10 | **Firecracker full snapshot**: "the full contents of guest memory being written to the snapshot". 산출물 = 메모리 파일 + microVM 상태 파일. "The separate block device file components of the snapshot have to be handled by the user"(디스크는 스냅샷 밖) | 1회 기록량 = 게스트 RAM 전체 | 저장소 main (2026-10-06 열람) | https://raw.githubusercontent.com/firecracker-microvm/firecracker/main/docs/snapshotting/snapshot-support.md | ✅ |
| AV-11 | **Firecracker diff snapshot**: 마지막 스냅샷 이후 접근·기록된 메모리만 sparse 파일로 저장. dirty page tracking 활성 시 KVM dirty page log로 "exactly pages that were written to". 그 자체로는 대개 재개 불가하고 베이스와 병합 필요. **developer preview** 상태. 복원은 메모리 파일을 MAP_PRIVATE로 매핑해 런타임 on-demand 로딩 | 1회 기록량 = dirty 페이지만 | 상동 | 상동 | ✅ |
| AV-12 | **Fly.io Machines suspend**: Firecracker 스냅샷으로 CPU 레지스터·메모리·열린 파일 핸들까지 저장. 요건: **메모리 ≤ 2 GB**("For larger memory sizes, suspend is discouraged due to increased suspend times"), 스왑 없음. 재개 수백 ms vs 콜드 스타트 약 2초+. 스냅샷은 볼륨에 저장되지 않으며 배포·호스트 이전·하드웨어 장애·공간 회수 시 폐기될 수 있음("Snapshots aren't guaranteed to persist") | ≤ 2 GB, 재개 수백 ms | 2026-10-05 (docs 커밋) | https://github.com/superfly/docs (reference/suspend-resume.mdx) | ✅ |
| AV-13 | Fly 커뮤니티 공지: suspend에서 가장 느린 단계는 메모리 스냅샷을 디스크로 복사하는 것이며, 현재 **suspend마다 머신 메모리 전체를 디스크에 기록**하므로 2 GiB 제한으로 시작 | 매회 메모리 전체 기록 | 2024-07 | https://community.fly.io/t/autosuspend-is-here-machine-suspension-is-enabled-everywhere/20942 | 🟡 |
| AV-14 | **E2B 아키텍처**: 샌드박스 = "a resumed snapshot". 템플릿·일시정지 스냅샷 아티팩트(`memfile`, `rootfs.ext4`, `snapfile`, 메타데이터)는 **오브젝트 스토리지(GCS/S3)** 에 저장되고 노드 **로컬 디스크에 캐시**(선택적으로 공유 NFS 청크 캐시·P2P). 재개 시 userfaultfd로 메모리 페이지를 지연 로딩, rootfs는 템플릿 읽기 전용 + 샌드박스별 COW 캐시(NBD) | 정성 | 2026-10-06 (저장소 HEAD) | https://github.com/e2b-dev/infra (docs/ARCHITECTURE.md) | ✅ |
| AV-15 | **E2B pause 경로**: VM 일시정지 → 스냅샷 → 메모리(dirty-page tracking)와 rootfs(COW 캐시)를 **템플릿 대비 diff**로 산출 → 로컬 캐시 → 오브젝트 스토리지로 **비동기 업로드**. 일시정지 스냅샷은 템플릿과 같은 형태(diff 체인). 노드의 pause 허용 검사식 = 게스트 메모리 + rootfs 캐시 크기 + snapfile 여유분(템플릿 저장소가 같은 FS면 2배) | 최악 로컬 기록 ≈ RAM + rootfs 캐시 | 2026-10-06 | 상동 | ✅ |
| AV-16 | E2B 문서: pause는 **RAM 1 GB당 약 4초**, resume 약 1초. 일시정지 상태 **최대 30일** 보관 후 삭제. `keepMemory=false`면 파일시스템만 저장(더 가벼운 스냅샷, 재개 시 재부팅). 디스크 기본 Hobby 10 GB, Pro 20 GB | 4 s/GB, 30일, 10/20 GB | 2026 (문서 현행) | https://e2b.dev/docs/sandbox/persistence (차단) ; https://docs.e2b.dev/billing.md (차단) | 🟡 |
| AV-17 | **Google Agent Substrate 코드**: 스냅샷 파일을 각각 **zstd 압축해 동시 업로드**하고 매니페스트를 마지막에 기록(커밋 마커). 코드 주석: "**A guest memory image is mostly holes**", SEEK_DATA/SEEK_HOLE로 채워진 범위만 압축·업로드. GKE 워커 실측 주석: 단일 코어 zstd 압축 출력 **약 190 MB/s**, GCS 64 MiB 객체 업로드 1스트림 **87**, 4스트림 254, 8스트림 518, 12스트림 **622 MB/s** | 190 MB/s, 87~622 MB/s | 2026-10-06 (저장소 HEAD) | https://github.com/agent-substrate/substrate (cmd/atelet/main.go, pkg/objectstorage/parzstd.go, sparseparts.go) | ✅ |
| AV-18 | Agent Substrate 로드맵(Storage): "gVisor snapshot/resume optimizations: **storage tiering (local zswap, local SSD, peer-to-peer, blob)**", "**incremental snapshots**"(예정 항목). 벤치마크 스위트는 `snapshots.size_p50_mb`~`p99`, `checkpoint_mb_s`(체크포인트에 쓴 초당 바이트) 지표를 정의하나 공개 측정값은 없음 | 정성 | 2026-10-06 | 상동 (docs/roadmap.md, benchmarking/README.md) | ✅ |
| AV-19 | Agent Substrate 블로그(원문 저장본) 추가 문구: "Autonomous agents spend the **vast majority of their time dormant** while waiting on model inference, tool responses, or human feedback". 대량 버스트 시 "repeatedly decompressing container images can cause **severe disk contention**". 상태형 워크스페이스는 **Filestore agent volumes**(NFS, 밀리초 attach/detach, RWX) | 정성 | 2026-09-15 | https://cloud.google.com/blog/products/containers-kubernetes/agent-substrate-available-on-gke | ✅ |
| AV-20 | **GKE Pod snapshots**: CPU·GPU 메모리 포함 실행 상태를 "**high-throughput Cloud Storage**"에 영속. 유휴 에이전트 샌드박스를 suspend해 "entire compute resources"를 회수하는 용도 명시 | 정성 | 2026-09-21 | https://cloud.google.com/blog/products/containers-kubernetes/gke-pod-snapshots | ✅ |
| AV-21 | **Modal**: Filesystem snapshot = 베이스 이미지 대비 **변경 파일만** 저장, 명시 삭제 전까지 보관. Directory snapshot은 마지막 사용 30일 후 GC. Memory snapshot은 **생성 7일 후 만료**(연장 불가), 메모리 매핑은 보통 **100 MiB~10 GiB**로 단일 'pages' 파일에 저장(4 KiB 페이지 단위) | 100 MiB~10 GiB | 2026 (문서 현행) | https://modal.com/docs/guide/sandbox-snapshots ; https://modal.com/docs/guide/sandbox-memory-snapshots (차단) | 🟡 |
| AV-22 | **Daytona**: 기본 1 vCPU · 1 GB RAM · **3 GiB 디스크**, 샌드박스당 디스크 최대 **10 GB**(조직 한도 4 vCPU·8 GB·10 GB). 15분 비활성 시 자동 정지, 정지 **7일 후 오브젝트 스토리지로 자동 아카이브**(CPU·메모리·디스크 쿼터 해제) | 3 GiB / 10 GB | 2026 (문서 현행) | https://www.daytona.io/docs/en/sandboxes (차단) ; https://support.daytona.io/articles/9061688978-managing-storage-space-for-sandboxes | 🟡 |
| AV-23 | **Cloudflare Containers**: 디스크는 전부 ephemeral(sleep 후 재시작하면 이미지 정의대로 새 디스크). 인스턴스 타입별 **2~20 GB**. 기본 10분 후 sleep | 2~20 GB | 2025~2026 | https://developers.cloudflare.com/containers/platform-details (차단) ; https://fly.io/learn/fly-vs-cloudflare/ | 🟡 |
| AV-24 | **AWS Bedrock AgentCore Runtime 세션 스토리지(프리뷰)**: stop/resume 사이 파일시스템 상태 영속. **세션당 최대 1 GB**, **유휴 14일** 보관, durable storage로 투명 복제, 같은 세션 ID로 재개하면 새 microVM이 같은 스토리지를 마운트. 14개 리전 | 1 GB, 14일 | 2026-03 | https://aws.amazon.com/about-aws/whats-new/2026/03/bedrock-agentcore-runtime-session-storage ; https://dev.classmethod.jp/en/articles/bedrock-agentcore-runtime-session-storage/ | 🟡 |
| AV-25 | **Sabre (OSDI'24, MIT·Intel·Cornell)**: 서버리스 microVM 스냅샷을 하드웨어 가속(IAA)으로 **최대 4.5배 압축**, 페이지 prefetch로 메모리 복원 최대 55% 가속 | 4.5x | 2024-07 | https://www.usenix.org/conference/osdi24/presentation/lazarev | 🟡 |
| AV-26 | **VAST Data 블로그**(Itzik Reich): 에이전트 샌드박스 플릿은 "**create and destroy thousands of volumes an hour**", 각각 전용·일회용·고성능 디스크를 원함. 대응: 세션별 격리 블록 볼륨(NVMe/TCP CSI) + 데이터셋 공유 NFS, 템플릿 스냅샷을 수 초 안에 클론 | 시간당 수천 볼륨 | 2026 (일자 미확인) | https://www.vastdata.com/blog/agent-sandboxes-where-every-storage-trend-shows-up-at-once (차단) | 🟡 |
| AV-27 | **⚠️ 파생 (suspend 1회 기록량 범위)**: full snapshot이면 게스트 RAM 전체(AV-10): Muse형 8 GB, dots형 9.73 GB(AV-07), Fly 상한 2 GB(AV-12). dirty/sparse + 압축이면 사용 메모리 ÷ 압축률: Muse 관측 사용 약 3 GB(AV-04) ÷ 4.5(AV-25) ≈ **0.67 GB** ~ 3 GB(압축 없음). 즉 1회 기록량은 정책에 따라 **약 0.7~10 GB**로 한 자릿수 배 이상 벌어짐 | 0.7~10 GB/회 | 해당 없음 | AV-04·AV-07·AV-10·AV-12·AV-25 | ⚠️ 파생 |
| AV-28 | **⚠️ 파생 (호스트 로컬 SSD 쓰기 민감도)**: 가정 = 호스트당 휴면 에이전트 1,000개(DT-54), 스냅샷 1회 1 GB(AV-27 중간값), 모든 스냅샷이 로컬 SSD에 1회 기록·WAF 1·오브젝트 업로드분 제외. suspend 10회/에이전트/일 → **10 TB/일**, 100회 → **100 TB/일**. 로컬 SSD 6 TB(C4A 최대, CQ-21) 기준 **1.7 / 16.7 DWPD**, 30.72 TB(Alibaba RISTRETTO 최대 구성, CQ-19) 기준 **0.33 / 3.3 DWPD**. 에이전트당 suspend 빈도 공개값 없음 | 0.33~16.7 DWPD | 해당 없음 | DT-54·AV-27·CQ-19·CQ-21 | ⚠️ 파생 (가정 의존) |

### A-3. 에이전트 샌드박스 디스크 사용·I/O 성격에 관한 진술·측정

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| AV-30 | **⚠️ 파생 (Muse 영속 볼륨 사용률)**: 567 MB ÷ 100 GiB ≈ **0.55%**(AV-02), 1.7 GB ÷ 100 GB = **1.7%**(AV-04). 관측 시점·계정별 1회 측정치 | 0.55~1.7% | 2026-09 | AV-02·AV-04 | ⚠️ 파생 |
| AV-31 | **⚠️ 파생 (VM당 영속 스토리지 대비 RAM)**: Muse 100 GiB ÷ 7.75 GiB ≈ 12.9배, dots 32 GB ÷ 9.73 GB ≈ 3.3배. 영속 스토리지 ÷ vCPU: Muse 50 GB/vCPU, dots 약 3.6 GB/코어 | 12.9x / 3.3x | 해당 없음 | AV-01·AV-02·AV-07 | ⚠️ 파생 |
| AV-32 | 에이전트 샌드박스 디스크 수준의 읽기/쓰기 비율·일 쓰기량·DWPD를 공개한 측정은 **찾지 못함**(확보 실패 F-03). 확보된 것은 "대부분 휴면"(AV-19, DT-53)이라는 정성 진술과 Substrate의 지표 정의(AV-18)뿐 | 없음 | 해당 없음 | 해당 없음 | ⚠️ (공백) |

### A-4. 벤더·애널리스트의 "에이전트 AI → 고용량 vs 고내구" 진술

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| AV-40 | **TrendForce 1Q26**: "rapid adoption of AI Agent services and strong procurement demand from CSPs"로 eSSD 매출 **+86.1% QoQ, 184.6억 달러**, 계약가 약 +80%. Agentic AI 스토리지 아키텍처 대응으로 **Micron SLC SSD 이니셔티브·Kioxia XL-Flash** 언급("DRAM 용량 한계·비용 상승으로 고성능 SSD를 메모리 계층의 대체 티어로"). 동시에 "고용량 QLC 공급 부족" 속 Sandisk QLC eSSD 양산 출하, **QLC는 향후 매출 성장의 주 동인**이며 "AI 학습 데이터셋의 저장 요구" 대응 | 86.1%, 184.6억 달러 | 2026-06-11 | https://www.trendforce.com/presscenter/news/20260611-13092.html (차단) ; https://iconnect007.com/article/150370/top-five-enterprise-ssd-brands-post-record-1846-billion-revenue-in-1q26/150367/pcb | 🟡 |
| AV-41 | **Kioxia (GTC 2026)**: CM9 PCIe 5.0 E3.S **25.6 TB TLC, 3 DWPD**(일 76.8 TB 쓰기), 대규모 추론(KV 캐시) 환경용, Q3 2026 샘플. GP 시리즈 = GPU-initiated 접근용. 보도 제목 "for the Era of Agentic AI Storage" | 25.6 TB / 3 DWPD | 2026-03-16~18 | https://www.businesswire.com/news/home/20260316827516/en ; https://www.servethehome.com/kioxia-gp-series-and-cm9-launched-for-the-era-of-agentic-ai-storage/ | 🟡 |
| AV-42 | **Micron FQ3·FQ4 FY26**: 에이전트 AI가 DC 인프라를 가속기 랙 너머 "**CPU racks for the agent control plane and program execution**"와 "**storage racks for rapidly expanding context store**"로 확장. KV 캐시 오프로드용 AI 컨텍스트 메모리 스토리지와 HDD 대체가 SSD TAM 확대, 122 TB 고용량 SSD 채택 강세. FQ4 DC SSD 매출 약 100억 달러(전년 대비 10배+, NAND 매출의 2/3+) | 약 100억 달러 | 2026-06 / 2026-09 | https://s25.q4cdn.com/621799436/files/doc_financials/2026/q4/Q4-FY26-Prepared-Remarks.pdf (차단) ; https://www.nasdaq.com/articles/will-agentic-ai-adoption-expand-microns-memory-growth-opportunity | 🟡 |
| AV-43 | **Micron Computex 2026**: 추론(추론형·에이전트 기반 시스템 포함) 대상 쇼케이스에서 "data center SSDs offer **high-performance drives to address persistent KV cache needs** and **high-capacity drives for massive data lakes**" (두 갈래 병기). 7600 PRO 1 DWPD / MAX 3 DWPD | 1 / 3 DWPD | 2026-06-01 | https://www.nasdaq.com/press-release/micron-powers-ai-everywhere-computex-2026-2026-06-01 | 🟡 |
| AV-44 | **SK hynix 2Q26 실적 콜**: 에이전트 서비스용 **서버 DRAM** 수요 증가, "AI 서비스 확대와 데이터 증가를 수용할 **고성능·고용량 NAND**". 포트폴리오: 고성능 TLC eSSD, **고용량 QLC eSSD**, 고성능 SSD. KV 캐시가 지수적으로 늘며 고객이 고성능·고용량 eSSD를 대규모 채택 | 정성 | 2026-07 | https://finance.yahoo.com/quote/000660.KS/earnings/000660.KS-Q2-2026-earnings_call-653208.html | 🟡 |
| AV-45 | **Samsung 2Q26 실적 콜**: 하이퍼스케일러 투자 확대와 **에이전트 AI 확산**으로 AI 서버뿐 아니라 **범용 컴퓨팅 서버** 수요도 견조. 서버 SSD가 2026년 NAND 매출 믹스 **60% 초과**(+20%p 이상), **QLC 비트 출하 2H26 2배**, V9 1Tb QLC 기반 **256 TB** eSSD 출하 확대. 에이전트와 QLC의 인과를 직접 잇는 문장은 확인 못 함 | 60%+, 2배, 256 TB | 2026-07-30 | https://images.samsung.com/is/content/samsung/assets/global/ir/docs/2026_2Q_conference_eng.pdf (차단) ; https://finance.biggo.com/quote/005930.KS/earnings-call/KR_005930.KS_2026-07-30 | 🟡 |
| AV-46 | **Seagate FQ2 FY26**: 에이전트 AI = nearline HDD의 **신규 수요원**. "training → inference → agentic 전환에서 더 많은 데이터가 생성되고 이력 맥락·컴플라이언스·재사용을 위해 **보존**", "Agentic AI relies on persistent access to large volumes of historic data". 2026년 용량 배정 완료, nearline EB 대부분 2028까지 LTA | 정성 | 2026-01-27 | https://www.constellationr.com/insights/news/seagate-agentic-ai-video-fuel-storage-demand-spike ; https://blocksandfiles.com/2026/01/28/seagate-q2-2026/ | 🟡 |
| AV-47 | **Solidigm**: "token amplification": 작은 사용자 프롬프트가 도메인 규칙·검색 맥락·도구 정의·세션 이력으로 **수만 토큰**으로 부풀고 스토리지가 이를 조립. RAG·에이전트 워크플로·장문맥이 동시 저장·접근 정보량을 키운다. QLC 누적 출하 **120 EB+**, 245 TB+ 드라이브 2026년 말 출하 예정 | 120 EB+, 245 TB | 2026-07 (HBR 스폰서) | https://hbr.org/sponsored/2026/07/the-hidden-storage-tax-on-every-ai-conversation ; https://techstrong.ai/sponsored-content/breaking-the-ai-storage-bottleneck-solidigms-strategic-approach-to-each-pipeline-stage/ ; https://www.techradar.com/pro/solidigm-confirms-245-tb-ssds-set-to-launch-before-end-of-2026 | 🟡 |
| AV-48 | **VAST Data CEO Renen Hallak**: "three compounding exponents of data that has to be **stored forever with very fast access**"(에이전트 수 × 에이전트당 관측 데이터 × 코드·영상·체크포인트·메모리 등 생성 산출물) | 정성 | 2025~2026 (일자 미확인) | https://sacra.com/research/renen-hallak-vast-data-flash-storage-agents/ | 🟡 |
| AV-49 | **WEKA 용어집**: 에이전트는 사람 사용자 대비 "**an order of magnitude more queries**"를 발생, 세션 간 장기 맥락 유지·병렬 하위 작업 생성으로 저지연 일관성 요구 | 10배 쿼리 | 현행 | https://www.weka.io/learn/glossary/ai-ml/what-is-ai-storage/ | 🟡 |

---

## B. 범용 클라우드(멀티테넌트 VM) SSD 요구

### B-1. OCP Datacenter NVMe SSD 사양 (지연 QoS · 멀티테넌트)

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| CQ-01 | OCP Datacenter NVMe SSD Specification 버전 이력(문서 제목 날짜): v2.0 (2021-07-30), v2.5 (2023-09-28), v2.6 (2024-09-25, 이후 2.6.1), **v2.7 (2026-01-08)**. 공동 작성 Meta·Microsoft·HPE·Dell·Google. 장 구성: NVMe·PCIe 요구, 신뢰성, **Endurance**, 열, OOB 관리, 보안, Device Profiles 등. v2.5에서 FDP·사람이 읽는 텔레메트리 추가 | 버전 날짜 | 2021~2026 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-5-pdf ; …-v2-6-2-pdf ; …-v2-7-final-pdf-1 (모두 차단) ; SNIA SDC25 https://www.snia.org/sites/default/files/2025-09/SNIA-SDC25-Stenfort-OCP-Storage-Project-Update.pdf | 🟡 (검색 색인 제목) |
| CQ-02 | **OCP QoS 퍼센타일 표 정확값은 이번에도 미확보**(F-01). 기존 원장 참조: B07(99.9999% 구간 3,000/4,000/5,000 µs 임계, ⚠️ 검색 추출), C08(Micron 7450 "99.9999% QoS ≤ 2 ms", 혼합 랜덤 4 KB 90% 읽기/10% 쓰기, OCP 2.0 지원), B06(Latency Monitor Log C3h/Feature C5h, v2.0) | 6-nines ≤ 2 ms (벤더) | 2021~2022 | 기존 원장 | ⚠️ (원문 미대조) |
| CQ-03 | OCP 2.0 적합성 시험(SANBlaze) 명령 시간 검증: I/O 프로파일 1시간 실행 중 **8초 초과 I/O 0건**, **2초 초과 7건 이하**, 나머지는 2초 이하 | 8 s / 2 s / 7건 | 2024-07 (패키지 배포) | https://sanblaze.ellisys.com/scripts/OCP_DatacenterSSD_2_0.html (차단) | 🟡 |
| CQ-04 | NVMe 1.4 IO Determinism / NVM Sets(Facebook 주도): Toshiba(현 Kioxia)가 FMS 2017에서 Facebook IOD 목표 초과, **99.999% QoS에서 최대 두 자릿수(약 100배) 개선**. 혼합 워크로드 읽기 꼬리 지연 **40~100배 감소** 보고 | 40~100x | 2017-08-09 | https://americas.kioxia.com/en-ca/business/news/2017/ssd-20170809-1.html ; https://www.blocksandfiles.com/flash/2019/11/07/nvme-v14-resolves-data-centre-ssd-noisy-neighbour-problems/1596834 | 🟡 |

### B-2. 공유 NVMe의 noisy neighbor 측정

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| CQ-10 | **FlashBlox (FAST'17, Georgia Tech·Microsoft)**: Microsoft 데이터센터 멀티테넌트 스토리지 워크로드에서 테넌트별 채널·다이 하드웨어 격리 시 소프트웨어 격리 대비 **p99 지연 최대 3.1배 감소, 처리량 최대 1.6배**. 쓰기를 한 채널에 몰아넣는 적대 워크로드에서도 이상 수명의 **95%** 유지(격리하면 채널 간 마모 불균형이 생겨 별도 웨어레벨링 필요) | 3.1x / 1.6x / 95% | 2017-02 | https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/fast17-final100.pdf | ✅ |
| CQ-11 | **RAIL (ACM TOS 18(1), Stanford·Berkeley·Samsung·ETH)**: 사용자 쓰기 뒤로 읽기가 직렬화되는 것을 피해 **99.99% 읽기 꼬리 지연 7배 감소**, 대가로 상대 대역 33% 감소 | 7x | 2022-01 | https://mast.stanford.edu/pubs/rail_predictable_low_tail_latency_for_nvme_flash | 🟡 |
| CQ-12 | **Gimbal (SIGCOMM'21)**: SmartNIC JBOF 멀티테넌트 스토리지에서 SSD 혼잡 제어·쓰기 비용 추정·공정 스케줄로 **활용률 최대 6.6배, 꼬리 지연 62.6% 감소**. 상용 KV 스토어 멀티테넌트 처리량 1.7배, 꼬리 35.0% 감소 | 6.6x / -62.6% | 2021-08 | https://research.vmware.com/publications/gimbal-enabling-multi-tenant-storage-disaggregation-on-smartnic-jbofs | 🟡 |
| CQ-13 | **blk-switch (OSDI'21)**: 지연 민감 앱 수십 개가 처리량 앱과 호스트 자원을 공유할 때 Linux 대비 **평균 지연 최대 130배, P99 최대 24배 개선**(처리량 84~100% 유지). 간섭이 장치가 아니라 호스트 스택에서도 발생함을 보임 | 130x / 24x | 2021-07 | https://www.usenix.org/conference/osdi21/presentation/hwang | 🟡 |
| CQ-14 | **UPI (HotStorage'18)**: 공유 SSD에서 지연 민감 워크로드 **p99 38.5% 감소**, 처리량 워크로드 평균 응답 16.1% 감소(정적 분할 대비) | -38.5% | 2018-07 | https://www.usenix.org/conference/hotstorage18/presentation/kim-bryan | 🟡 |
| CQ-15 | **DC-Store (FAST'20, KAIST·Samsung)**: 공유 풀 위 다중 NVM Set으로 내부 자원 충돌을 제거하고 커널이 noisy neighbor 컨테이너를 격리. 데이터 집약 컨테이너 평균 실행시간 **31% 단축** | -31% | 2020-02 | https://www.usenix.org/conference/fast20/presentation/kwon | 🟡 |
| CQ-16 | **WARP (FAST'26)**: CacheLib가 용량 60%, 다른 테넌트가 40%를 쓰는 공존 시험(noisy neighbor = 4K 랜덤 쓰기 QD1). **FDP 없으면 kvcache WAF 1.28 → 약 3.0**, FDP 사용 시 최대 2.6. 공유 드라이브의 간섭이 지연뿐 아니라 NAND 쓰기 증폭(내구 소비)으로도 나타남 | WAF 1.28 → 3.0 | 2026-02 | https://github.com/lqhl/awesome-system-papers (markdowns/fast-2026/fast2026-song) | ✅ (변환본 본문) |
| CQ-17 | **Espresso (OSDI'26)**: IaaS에서 드라이브를 테넌트별로 할당하고 버스트 시점이 달라 활용률이 낮다. Tencent 스토리지 서버(25 드라이브)에서 **20개 이상이 대역 75% 미만일 확률 94.6%**. 평균 드라이브 대역 활용률 **Alibaba 8.0%, Tencent 27.8%, Fujitsu 15.3%** | 8.0 / 27.8 / 15.3% | 2026-07 | https://github.com/lqhl/awesome-system-papers (markdowns/osdi-2026/osdi26-yi) | ✅ (변환본 본문) |
| CQ-18 | **클라우드 ESSD "unwritten contract" (arXiv 2508.17372)**: 작은 I/O·낮은 QD에서 클라우드 ESSD 지연은 로컬 SSD 대비 **수십~100배**. 랜덤 쓰기 처리량이 순차보다 최대 1.52배·2.79배 높고, 최대 대역은 접근 패턴과 무관하게 결정적. 쓰기 집약에서 I/O를 충분히 키우면 ESSD-AM1이 로컬 SSD보다 평균 25%, **P99.9 3.3배** 낮음 | 10~100x / 3.3x | 2025-08 | https://arxiv.org/abs/2508.17372v1 | 🟡 |

### B-3. 클라우드 로컬·블록 스토리지의 사양·쓰기량 (DWPD 관련)

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| CQ-19 | **Alibaba 로컬 스토리지 (FAST'26 최우수 논문)**: 3세대 RISTRETTO(2023 출시, 수천 노드) 최대 인스턴스 = **NVMe 8개 × 3.84 TB = 30.72 TB**, 48 GB/s, 7.2M IOPS(VD당 900K). 로컬 디스크 **AFR 약 0.44%**, 주 용도는 캐시 데이터(CDN 등). 체크포인트·모델 파라미터·LLM KV 캐시 등 **탄력 용량** 요구가 로컬 디스크 한계(LDL_2). 차세대 LATTE는 로컬 디스크를 프런트엔드 버퍼·핫 캐시로, EBS를 용량으로 쓰며 "노드당 8~12 SSD 대신 1개"를 여러 인스턴스가 공유·분할 가능. 로컬 스토리지는 vCPU·메모리와 디스크 할당을 묶어 판매(자원 고립 방지). p99.9 GC 수치는 기존 MX-34 | 30.72 TB, AFR 0.44% | 2026-02 | https://github.com/lqhl/awesome-system-papers (markdowns/fast-2026/fast2026-yang) ; https://www.usenix.org/conference/fast26/presentation/yang | ✅ (변환본 본문) |
| CQ-20 | **AWS I4i (Nitro SSD)**: I3 대비 스토리지 I/O **지연 최대 60%↓, 지연 변동성 75%↓**, 로컬 Nitro SSD 최대 **30 TB**(i4i.32xlarge, 128 vCPU) | 60% / 75% / 30 TB | 2022-04 | https://aws.amazon.com/ec2/instance-types/i4i/ (차단) ; https://blocksandfiles.com/2022/04/28/aws-go-faster-go-large-nitro-ssd-instances/ | 🟡 |
| CQ-21 | **Google C4A + Titanium SSD**: 최대 72 vCPU · 576 GB · **6 TB 로컬**, 최대 2.4M 랜덤 읽기 IOPS·10.4 GiB/s, 이전 세대 대비 **접근 지연 최대 35%↓**. Titanium SSD = 구글 커스텀 로컬 SSD(스토리지 처리 오프로드). 대상: 고성능 DB·분석·검색·캐싱 | 6 TB / 72 vCPU, -35% | 2025-01-17 | https://cloud.google.com/blog/products/compute/first-google-axion-processor-c4a-now-ga-with-titanium-ssd | ✅ |
| CQ-22 | **Fly.io 로컬 NVMe 테넌트 상한**: rootfs(ephemeral)는 VM 종류와 무관하게 **최대 2,000 IOPS · 8 MiB/s**. Volume = 같은 물리 서버 NVMe의 슬라이스, VM 크기별 **4,000~32,000 IOPS · 16~128 MiB/s** 상한. 일일 블록 스냅샷 보관 1~60일(기본 5일) | 2,000 IOPS / 8 MiB/s | 2026-10-05 | https://github.com/superfly/docs (volumes/overview.mdx, volumes/snapshots.mdx) | ✅ |
| CQ-23 | Azure Lsv3: 직접 매핑 로컬 NVMe, **vCPU 8개당 1.92 TB NVMe 1개** | 1.92 TB/8 vCPU | 현행 | https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/storage-optimized/lsv3-series | 🟡 |
| CQ-24 | **⚠️ 파생 (로컬·영속 스토리지 GB/vCPU)**: Azure Lsv3 240, AWS i4i.32xlarge 234(30,000 ÷ 128), Google C4A 83(6,000 ÷ 72), Muse 50(AV-02), dots 약 3.6(32 ÷ 9, AV-07) | 3.6~240 GB/vCPU | 해당 없음 | CQ-20·CQ-21·CQ-23·AV-02·AV-07 | ⚠️ 파생 |
| CQ-25 | **Alibaba·Tencent 블록 스토리지 쓰기 비중(DT-13 정량 보강)**: 전체 쓰기:읽기 = **AliCloud 3:1, TencentCloud 2.35:1**. 쓰기 우세 볼륨 91.5% / 92.3%, 쓰기:읽기 > 100인 볼륨 42.4% / 36.5%. 쓰기가 전체 WSS의 89.4% / 85.2%, 읽기 34.3% / 37.6%. 표본: Alibaba 1,000 볼륨(2020-01, 31일), Tencent 4,995 볼륨(2018-10, 9일) | 3:1 / 2.35:1 | 2023 (ACM TOS) | https://dl.acm.org/doi/fullHtml/10.1145/3572779 ; https://arxiv.org/pdf/2203.10766 | 🟡 |
| CQ-26 | Alibaba 트레이스 규모: 31일간 쓰기 **455.5 TiB**, 쓰기 요청 151.7억 건, 볼륨 원시 용량 **40 GiB~5 TiB** | 455.5 TiB | 2020-01 데이터 | 상동 ; https://github.com/alibaba/block-traces | 🟡 |
| CQ-27 | **⚠️ 파생 (가상 디스크 기준 DWPD 범위)**: 455.5 TiB × 1,024 ÷ 31일 ÷ 1,000 볼륨 ≈ **15.0 GiB/일/볼륨**. 볼륨 40 GiB면 0.38, 5 TiB면 0.003 DWPD. 볼륨별 용량(device_size.csv) 미확보로 평균 DWPD는 계산 불가. 백엔드 복제·WAF 미반영 | 0.003~0.38 DWPD | 해당 없음 | CQ-26 | ⚠️ 파생 |
| CQ-28 | 기존 원장 참조(반복 안 함): Microsoft 플릿 소비 **0.07~0.23 DWPD**(CU-13/CU-13a), NetApp 설치 기반 **중앙값 0.36 DWPD·7%+가 3 DWPD 초과**(CU-15), Meta QLC 요구식 R+4W ≥ 32 MB/s/TB(PC-51), Alibaba QLC 로컬 디스크(CSAL) VM 밀도 2배(MM-20·MM-24) | 0.07~0.36 DWPD | 2016~2025 | 기존 원장 | ✅/🟡 (원장별) |

---

## C. AI 학습 스토리지 (GPU당 대역 가이드)

| ID | 사실 | 수치 | 날짜 | 출처(URL) | 신뢰도 |
|---|---|---|---|---|---|
| AT-01 | **DGX SuperPOD B300** 스토리지 가이드(SU 합계): Standard 읽기 **80 / 쓰기 40 GB/s**, Enhanced **250 / 124 GB/s**. Standard = 복수 LLM·파인튜닝 + 주기적 체크포인트(컴퓨트 지배), Enhanced = 멀티모달 학습(데이터 I/O 중요). SU = **DGX B300 64대(512 GPU)**. DT-23 재확인 | 80/40, 250/124 GB/s | 2025~2026 (RA 현행) | https://docs.nvidia.com/dgx-superpod/reference-architecture/scalable-infrastructure-b300/latest/storage-architecture.html (차단) | 🟡 |
| AT-02 | **DGX B300 노드 내부 NVMe**: OS용 M.2 1.9 TB × 2 + 워크로드용 **E1.S 3.84 TB × 8**. **⚠️ 파생**: 30.72 TB/노드, **3.84 TB/GPU** 로컬 캐시 | 30.72 TB/노드 | 현행 | https://docs.nvidia.com/dgx-superpod/reference-architecture/scalable-infrastructure-b300/latest/_downloads/5fe4960ce43a21f33d6a5919d57bd583/RA11337001-DSPB300-ReferenceArch.pdf (차단) | 🟡 + ⚠️ 파생 |
| AT-03 | **DGX SuperPOD GB200** 스토리지 표(검색 요약): 단일 SU Standard **40 / 20 GB/s**, Enhanced **125 / 62 GB/s**; 4 SU 160/80, 500/250 GB/s | 40/20, 125/62 GB/s | 2024~2026 (RA 현행) | https://docs.nvidia.com/dgx-superpod/reference-architecture-scalable-infrastructure-gb200/latest/storage-architecture.html (차단) | 🟡 |
| AT-04 | GB200 SuperPOD SU 정의: DGX GB200 시스템 8대(각 72 GPU) = **576 GPU** | 576 GPU/SU | 2024-03-18 | https://investor.nvidia.com/news/press-release-details/2024/NVIDIA-Launches-Blackwell-Powered-DGX-SuperPOD-for-Generative-AI-Supercomputing-at-Trillion-Parameter-Scale/default.aspx | 🟡 |
| AT-05 | **⚠️ 파생·충돌 (GB200 GPU당 환산)**: AT-03 ÷ 576 GPU = Standard 읽기 **0.069** · 쓰기 0.035, Enhanced 읽기 **0.217** · 쓰기 0.108 GB/s/GPU. B200·B300 환산치(DT-24: Standard 0.16/0.08, Enhanced 0.49/0.24)와 **약 2.25배 차이**. 같은 SU 합계 표가 GPU 수가 다른 SU에 적용됐는지 원문 대조 못 함 | 0.069~0.217 GB/s/GPU | 해당 없음 | AT-03·AT-04·DT-24 | ⚠️ 파생 / 충돌 |
| AT-06 | **MLPerf Storage UNet3D (H100 에뮬레이션)**: 배치 7에서 H100 1개가 0.323초마다 데이터 처리, 활용률 90%+ 유지에 **최소 2.85 GB/s**, 가속기당 약 **3 GiB/s** 필요(이미지 집약 벤치마크, LLM 학습보다 I/O 강도 높음) | 2.85~3 GiB/s/GPU | 2025 (v2.0) | https://www.storagenewsletter.com/?p=295048 ; https://blocksandfiles.com/2025/08/05/storage-arrays-get-faster-in-2nd-version-of-mlperf-storage-benchmark/ | 🟡 |
| AT-07 | MLPerf Storage v2.0 제출 사례: Huawei OceanStor A800(8U 2노드) **698 GiB/s로 H100 255개** 충족, DDN AI400X3 **120.68 GB/s로 가속기 45개**. **⚠️ 파생**: 2.74 GiB/s/GPU, 2.68 GB/s/가속기 | 약 2.7 GB/s/GPU | 2025-08~09 | https://e.huawei.com/de/news/2025/solutions/storage/mlperfstorage-oceanstoraseries-no1 ; https://www.storagenewsletter.com/?p=295048 | 🟡 + ⚠️ 파생 |
| AT-08 | 기존 원장 참조: Llama 3 실측 지속 0.12 · 피크 0.43 GB/s/GPU(DT-20·DT-24, ⚠️), Google Managed Lustre 10 TB/s·80 PB(DT-27), 405B 체크포인트 1회 약 5.67 TB(DT-28, ⚠️), GPU당 스토리지 용량 약 14.6 TB(DT-29, ⚠️) | 0.12~0.43 GB/s/GPU | 2024~2026 | 기존 원장 | 🟡/✅/⚠️ (원장별) |

---

## 판정 보조 (의견 없이 사실 배치)

### 주장 1: "에이전트 = 고DWPD"

**지지하는 사실**
- 에이전트 추론의 KV 캐시 티어를 겨냥한 제품·진술은 고내구 등급을 쓴다: Kioxia CM9 TLC 3 DWPD(AV-41), TrendForce가 Agentic AI 대응으로 Micron SLC·Kioxia XL-Flash 언급(AV-40), KV 티어 실측 3.2 DWPD(D-03).
- full snapshot 방식의 suspend는 매회 게스트 RAM 전체를 기록한다(AV-10, AV-13). Fly는 매 suspend마다 메모리 전체를 디스크에 쓴다(AV-13).
- suspend 빈도가 높고 로컬 SSD가 작으면 파생 계산상 DWPD가 1을 넘을 수 있다(AV-28: 6 TB 기준 1.7~16.7 DWPD, ⚠️ 가정 의존). Agent Substrate는 초당 500회+ suspend/resume을 내세운다(DT-54).
- 범용 클라우드 블록 스토리지는 쓰기 우세다(CQ-25, DT-13). 공유 드라이브의 noisy neighbor는 WAF를 1.28 → 약 3.0으로 키운다(CQ-16).
- 에이전트 상태 저장은 append-only 로그·superstep 체크포인트 형태다(DT-51, DT-52).

**반하는 사실**
- 에이전트는 대부분 휴면이다: "vast majority of their time dormant"(AV-19), "increasingly idle"(DT-53).
- 스냅샷은 dirty page·sparse·압축으로 RAM보다 작게 기록된다: Firecracker diff(AV-11), E2B 템플릿 대비 diff(AV-15), Substrate "memory image is mostly holes" + zstd(AV-17), 최대 4.5배 압축(AV-25). 1회 기록량 범위 약 0.7~10 GB(AV-27, ⚠️).
- 스냅샷·아카이브의 최종 저장처는 오브젝트 스토리지다: E2B GCS/S3(AV-14, AV-15), Substrate GCS(AV-17), GKE Pod snapshots Cloud Storage(AV-20), Daytona 7일 후 오브젝트 스토리지(AV-22). 로컬 SSD 계층 저장은 Substrate 로드맵의 예정 항목이다(AV-18).
- Muse 영속 볼륨 사용률은 관측 시점 0.55~1.7%이고(AV-30, ⚠️), 볼륨은 zstd 강제 압축이다(AV-02, AV-03). AgentCore 세션 스토리지는 1 GB 한도다(AV-24).
- 범용 플릿의 소비 DWPD는 낮다: Microsoft 0.07~0.23, NetApp 중앙값 0.36(CQ-28). Alibaba 가상 디스크 환산 0.003~0.38(CQ-27, ⚠️). 클라우드 드라이브 평균 대역 활용률 8.0~27.8%(CQ-17).
- 장시간 에이전트 LMCache-on-NVMe 측정은 읽기 92%/쓰기 8%다(X-03).
- 에이전트 샌드박스 디스크의 실측 쓰기량·DWPD 공개값은 없다(AV-32, F-03).

### 주장 2: "에이전트 = 고용량"

**지지하는 사실**
- 사용자별 영속 볼륨: Muse 100 GiB(AV-02, DT-02), dots 32 GB(AV-07). 사용자 수 비례 누적 파생치는 DT-5B(1억 명 × 100 GB = 10 EB, ⚠️).
- 휴면 상태가 장기 보관된다: E2B 일시정지 최대 30일(AV-16), AgentCore 유휴 14일(AV-24), Modal 파일시스템 스냅샷 무기한(AV-21), Daytona 아카이브(AV-22), Fly 볼륨 스냅샷 1~60일(CQ-22).
- 벤더·애널리스트 진술: Micron "storage racks for rapidly expanding context store"(AV-42)와 에이전트 워크로드 용량 10~40배(B-21), SK hynix "고용량 NAND"·QLC eSSD(AV-44), Samsung 에이전트 AI 확산 속 범용 서버 수요·QLC 출하 2배·256 TB(AV-45), Seagate 데이터 보존 수요(AV-46), VAST "stored forever"(AV-48), Solidigm token amplification(AV-47), TrendForce 고용량 QLC 공급 부족(AV-40).
- Alibaba는 체크포인트·모델 파라미터·KV 캐시용 탄력 용량 요구를 로컬 디스크 한계로 꼽는다(CQ-19).

**반하는 사실**
- 샌드박스당 디스크는 작다: Daytona 기본 3 GiB·최대 10 GB(AV-22), Cloudflare 2~20 GB ephemeral(AV-23), E2B 10/20 GB(AV-16), AgentCore 1 GB(AV-24), dots 32 GB(AV-07).
- 실사용량이 할당보다 훨씬 작다: Muse 567 MB~1.7 GB 사용(AV-02, AV-04, AV-30).
- 템플릿 공유·COW·diff·변경 파일만 저장 구조로 사용자 고유 바이트가 줄어든다(AV-14, AV-15, AV-21). Muse 볼륨은 강제 압축(AV-03).
- 장기 보관처는 오브젝트 스토리지다(AV-14, AV-17, AV-20, AV-22). 클라우드 EB의 다수가 HDD라는 기존 사실은 DT-10.
- 에이전트 추론 계층을 겨냥한 신제품은 고용량 QLC가 아니라 TLC 3 DWPD(AV-41)·SLC/XL-Flash(AV-40)로 제시되었다.
- 로컬 스토리지 GB/vCPU는 범용 스토리지 최적화 인스턴스(234~240)가 에이전트 VM(Muse 50, dots 약 3.6)보다 크다(CQ-24, ⚠️).

---

## 확보 실패

- **F-01. OCP Datacenter NVMe SSD v2.x의 지연 QoS 표 정확값**(워크로드별 99%/99.99%/99.9999% µs, 요구사항 ID)과 **멀티테넌트·네임스페이스 최소 요구**: opencompute.org·스테이징·웹 아카이브·Allion·SANBlaze·Kioxia 성능 브리프 모두 차단, 검색 색인에 표 본문 없음. 검색어: `opencompute datacenter-nvme-ssd-specification-v2-5 Latency 4KiB random read percentile table`.
- **F-02. Muse·dots 스토리지 백엔드 종류**(로컬 NVMe vs 네트워크 블록), 스냅샷·하이버네이션 정책, 데이터 보관 기간: Meta·OpenAI 미공개. 포렌식 저장소도 `/dev/mapper` 실체는 "NOT DETERMINABLE"(AV-03). dots 32 GB는 벤치마크 경유 관측(AV-07).
- **F-03. 에이전트 샌드박스의 suspend 1회 실측 바이트, suspend 빈도, 디스크 읽기/쓰기 비율, 일 쓰기량·DWPD**: 어떤 플랫폼도 공개하지 않음. Agent Substrate는 지표만 정의(AV-18).
- **F-04. 하이퍼스케일 클라우드(AWS·Azure·GCP)의 로컬 SSD·인스턴스 스토어·블록 백엔드 DWPD 공개값**: 없음. 검색어: `cloud instance local NVMe SSD DWPD published`.
- **F-05. Alibaba 블록 트레이스 볼륨별 용량(device_size.csv)**: 다운로드가 설문 경유·181 GB로 미확보, 평균 DWPD 계산 불가(CQ-27).
- **F-06. Samsung·Sandisk가 "에이전트 AI → QLC 고용량"을 인과로 직접 잇는 문장**: 같은 콜에서 병기만 확인(AV-45). Sandisk는 UltraQLC를 AI 데이터 레이크·수집 용도로만 제시.
- **F-07. GB200 SuperPOD 스토리지 표 원문 대조**(AT-03, AT-05 충돌 해소): docs.nvidia.com 차단.
- **F-08. E2B·Modal·Daytona·Cloudflare·VAST·TrendForce·Micron IR·Samsung IR 원문**: 차단으로 해당 행은 🟡.
- **F-09. 공유 NVMe noisy neighbor의 "쓰기 테넌트 공존 시 읽기 꼬리 X배" 단일 장치 실측의 원문 대조**: CQ-11~CQ-15는 초록·요약 수준. 원문 확인은 FlashBlox(CQ-10), WARP(CQ-16), Espresso(CQ-17)뿐.
