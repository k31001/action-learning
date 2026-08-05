---
type: strategy
last_reviewed: 2026-07-24
sources:
  - sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md
---

# FDP Host–SSD 통합 플랫폼 전략 — SSD 공급자에서 통합 솔루션 제공자로 (DT-P: 개발실 전환의 제품·기술 축)

> **한 줄 요약**: FDP(Flexible Data Placement)는 인터페이스일 뿐이다. 워크로드의 데이터 수명을 분석해 RUH에 매핑하고 효과를 검증하는 **시스템 소프트웨어가 없으면 고객은 FDP를 활용할 수 없고, 삼성은 "FDP 지원 SSD 공급사 중 하나"로 가격 경쟁에 노출**된다. 따라서 **FDP SSD 공급자 → FDP 기반 Host–SSD 통합 솔루션 제공자**로 전환한다 ([fdp-host-ssd-platform-strategy-2026-07-24.md](../../sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md)).

> **전략 메시지**: *"Binding secures demand. FDP standardizes the device. System software creates customer value. End-to-end co-optimization builds the strategic relationship."* — Binding으로 수요를 확보하고, FDP로 제품을 표준화하며, 시스템 소프트웨어로 고객 워크로드를 연결한다.

> **개발실 전환 전략과의 관계**: [dev-org-transformation.md](dev-org-transformation.md)의 **인재 축(FDE 스타 플레이어, §4.6)** 과 짝을 이루는 **제품·기술 축**이다. FDE가 "누가 고객 아키텍처 안으로 들어가는가"라면, 본 전략은 "무엇을 들고 들어가는가"(시스템 SW·프로파일러·에뮬레이터)에 답한다.

---

## 1. 문제 정의 — 스토리라인의 빠진 조각

기존 스토리라인(수주산업화 → Binding 계약 → FDP 표준 SSD)에는 **FDP 표준을 실제 고객 가치로 전환하는 실행 주체**가 빠져 있었다 ([원문](../../sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md)):

- **고객 관점**: FDP SSD가 제공하는 것은 RU·RG·RUH와 명령/상태정보뿐. 어떤 데이터가 hot/cold인지, 예상 수명·삭제 단위·테넌트 소속·tail latency 민감도는 **SSD가 스스로 알 수 없고 DB·캐시·파일시스템 등 상위 SW에 있다.** 고객에게 이 통합을 전적으로 맡기면 도입이 확산되지 않는다.
- **삼성 관점**: 시스템 SW 없이 SSD만 공급하면 표준화의 이익보다 **가격 경쟁 압력**이 커진다. 반대로 전략 고객은 TCO 통제를 위해 **Captive SSD**를 확대 중 — NAND 공급에만 머물면 완제품 부가가치를 잃고, 모든 요구를 커스텀 SSD로 받으면 **펌웨어가 파편화**된다.
- **해법**: FDP 표준 SSD(공통 펌웨어)로 파편화를 막고, **시스템 소프트웨어로 고객 워크로드와 SSD를 연결**해 도입 장벽을 낮추면서 고객 아키텍처에 더 깊이 참여한다.

## 2. 전체 전략 구조 (6요소)

| 전략 요소 | 역할 |
|---|---|
| **Binding 계약** | 장기 물량과 공급능력 확보 |
| **FDP 표준 SSD** | 고객별 요구를 공통 인터페이스로 수용 (펌웨어 공통화) |
| **시스템 소프트웨어** | 워크로드 요구를 FDP 정책으로 변환 |
| **End-to-End 검증** | 실제 WAF·QoS·수명 개선 보장 |
| **고객 공동개발** | 고객 시스템 최적화 + 장기 관계 구축 |
| **현장 텔레메트리** | 제품·소프트웨어 지속 개선 루프 |

FDP 효과가 만들어지는 과정: 고객 워크로드 I/O·데이터 수명 분석 → 유형·수명별 분류 → RUH 매핑 → 워크로드 변화에 따른 정책 조정 → WAF·성능·용량·수명 측정 → 텔레메트리 기반 재조정.

## 3. 실행전략 6종

### 실행전략 1 — Samsung FDP Enablement Platform
- **FDP SDK·공통 라이브러리**: FDP 탐색/설정 API, RU/RG/RUH 관리, 데이터 분류·RUH 매핑 API, 미지원 SSD fallback, Linux block I/O·io_uring·SPDK 연동, telemetry 수집, reset/format/namespace 상태 관리. 고객 앱은 SSD별 세부 명령 대신 SDK·공통 API 사용
- **주요 워크로드 플러그인**: RocksDB·KV, CacheLib 등 분산 캐시, Ceph·오브젝트 스토리지, MySQL·PostgreSQL, Vector DB·RAG, Kubernetes PV, 가상화·멀티테넌트, AI checkpoint/dataset — 공통 시스템 SW에 FDP 연결 계층을 제공하고 고객은 정책만 수정
- **Workload Profiler**: 고객 I/O trace에서 데이터 수명 분포·overwrite 주기·hot/cold 비율·테넌트별 분포·GC-tail latency 상관을 분석해 **추천 RUH 수·매핑과 예상 WAF/OP/endurance 효과**를 자동 산출 — FDP를 기능에서 TCO 솔루션으로 격상시키는 도구
- **FDP Emulator·Digital Twin**: 삼성 SSD 미디어 모델 + 고객 워크로드 모델 결합 — trace replay, RU/RUH 스윕, NAND 세대별·수명 경과·장애/reset·멀티테넌트 간섭·p999/p9999까지 대규모 qualification 전 예측

### 실행전략 2 — 표준 워크로드 프로파일
고객마다 펌웨어를 새로 만들지 않고 **검증된 정책 프로파일**(Host SW 설정 + 검증된 FDP 사용법)로 제공 — 펌웨어 공통화와 고객별 최적화의 양립: FDP-Cache(eviction 주기별 분리) · FDP-KV(LSM level·compaction 분리) · FDP-Database(WAL·metadata·user data 분리) · FDP-Multi-tenant(GC 간섭 억제) · FDP-Vector(index·embedding·temp 분리) · FDP-Checkpoint(장기 vs 반복 갱신 분리) · FDP-QLC(저빈도 쓰기·대용량 읽기 최적화)

### 실행전략 3 — End-to-End 공동검증 체계
고객이 원하는 것은 표준 준수가 아니라 **실제 TCO 개선**. 검증 범위를 Application→파일시스템/DB→Host FDP 라이브러리→OS/Driver/SPDK→NVMe FDP→SSD FTL·GC→NAND media→현장 텔레메트리로 확대하고, 지표도 제품 성능에서 시스템 성과로: 효율(WAF·OP·usable capacity), 성능(throughput·p999/p9999), 수명(NAND write·DWPD·교체주기), 격리(테넌트 간섭), 전력(TB당 전력), 운영(reset·rollback·복구), 도입(고객 SW 변경량·qualification 기간). **고객 trace를 pre/post-silicon 검증에 재사용** — 고객 워크로드가 개발 후반이 아니라 컨트롤러·펌웨어 설계 초기부터 반영되게 한다.

### 실행전략 4 — 고객 공동개발 조직 신설
SSD 제품개발 조직과 고객 시스템 SW 조직 사이를 잇는 4개 기능: **Host Software**(SDK·Linux·SPDK), **Workload Integration**(DB·Cache·Vector DB 연동), **Customer Solution Engineering**(고객 trace 분석·정책 공동설계), **End-to-End Validation**(Host–SSD–NAND 통합검증). 단순 기술지원이 아니라 **제품 기획·개발에 참여**: 워크로드 요구 수집 → FDP 표준 개선 제안 → SSD 아키텍처 요구 도출 → Host SW·FW 공동 릴리스 → 현장 검증·배포 → 현장 데이터의 차기 제품 반영. *실행 주체 관점에서 [dev-org-transformation.md](dev-org-transformation.md)의 Co-Design Pod·FDE(§4.5–4.6)가 이 조직의 고객 접점 모델이다.*

### 실행전략 5 — Binding 계약에 기술협력 포함
단순 물량·가격 약정 → **공동 플랫폼 계약**으로 확장. 고객 약정: 연도별 NAND·SSD 물량, 대상 워크로드·도입 시스템, qualification 일정, **익명화 trace·workload 특성 제공**, FDP Host SW 적용·검증 참여, 공동 로드맵. 삼성 약정: 공급능력·제품/NAND 로드맵, FDP SSD·SDK, 워크로드 공동 최적화, 장기 FW·시스템 SW 지원, 성능·WAF·수명 개선 목표, 세대 전환 동등성 검증. ([lta-to-sca-transition.md](../concepts/lta-to-sca-transition.md)의 전략적 고객 계약 구조와 동일 계열 — NAND/SSD 도메인 구체화)

### 실행전략 6 — 오픈소스와 차별화의 경계
FDP는 개방형 표준 — 지나친 독점은 vendor lock-in 우려를 낳는다. **공개**: 기본 FDP 라이브러리·API, Linux·SPDK 연동, 관리·진단 도구, 표준 workload adapter, 규격 적합성 테스트. **차별화(비공개)**: NAND·FTL 동작 모델, workload 분석 알고리즘, 자동 RUH 정책 추천, 삼성 SSD 전용 최적화, 수명·WAF·tail latency 예측 모델, 현장 텔레메트리 분석, 고객별 검증 프로파일. 고객은 개방 표준의 안정성을 얻되, 삼성 SSD 선택 시 더 높은 TCO 효과를 얻는다.

## 4. 단계별 실행 로드맵

| 단계 | 내용 |
|---|---|
| **1단계 — 제품·기본 도구** | 공통 FDP 펌웨어, Linux·SPDK SDK, nvme-cli·fio 테스트 도구, trace 수집·분석, FDP Emulator, 기본 Cache/KV 프로파일 |
| **2단계 — 전략 고객 공동검증** | 핵심 CSP 2~3개사 workload pilot, trace 기반 RUH 정책, WAF·p999·용량효율 측정, 공통 요구의 제품·표준 반영, 고객별 펌웨어 요구의 Host 정책 전환 |
| **3단계 — 상용 플랫폼화** | FDP 전 라인업 확대, 검증된 프로파일 제공, qualification 자동화, Host SW·SSD FW 공동 릴리스, Binding 계약에 시스템 SW 지원 포함 |
| **4단계 — Host Control 확장** | 데이터 배치 성공 후 동일 접근을 QoS·traffic isolation, 전력·thermal, telemetry·failure analytics, firmware attestation·배포관리, namespace별 endurance·OP, multi-tenant resource control로 확대 |

## 5. KPI

- 기업용 SSD 중 FDP 지원 비중 / **실제 FDP 활성화 비중** (핵심 지표 — 지원 출하량만 세면 미사용 기능이 됨: **고객 시스템에서 FDP가 실제 활성화된 SSD 용량**이 가장 중요)
- FDP 적용 고객·Binding 계약 물량, 고객별 펌웨어 브랜치 감소율, qualification 기간, Host SW 적용 개발기간
- WAF·NAND write 감소율, usable capacity 증가율, p999/p9999 개선율
- **고객 Captive SSD 계획에서 삼성 완제품으로 전환된 물량**

## 6. 시나리오 연결 (일관성 규칙)

- **시나리오 B (AI 르네상스, Main Bet)**: 기업용 SSD·AI 스토리지 수요 최대 — 플랫폼 효과가 가장 크게 작동. MB-4(커스텀 AI 메모리)의 NAND/SSD 측 대응물
- **시나리오 A (황금 요새)**: 진영 내 핵심 CSP와의 Binding+플랫폼 결합이 진영 락인을 강화
- **시나리오 C·D (AI 조정)**: 수요 수축기에 Binding 최소 물량 + 시스템 SW 전환비용이 방어벽 ([rs3-customer-switching-cost.md](invariant/rs3-customer-switching-cost.md) — FDP SW 스택은 전환비용 그 자체, [rs8-structured-revenue-hedging.md](invariant/rs8-structured-revenue-hedging.md) 연계)
- **시나리오 E (패러다임 전환)**: Host Control 확장(4단계)이 차세대 스토리지 아키텍처 전환기의 헤지
- 연결: [dev-org-transformation.md](dev-org-transformation.md)(조직·인재 실행 계층) · [embedded-software-monetization.md](../concepts/embedded-software-monetization.md)(시스템 SW 수익화의 상위 개념) · [customer-co-design-anthropic.md](../concepts/customer-co-design-anthropic.md)(공동 최적화 선례)
