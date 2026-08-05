# FDP Host–SSD 통합 플랫폼 전략 — 사용자 전략 인풋 (2026-07-24)

**수집일**: 2026-07-24
**유형**: 사용자 전략 브레인스토밍 원문 (제품·기술 전략 — 개발실 전환 전략의 제품 축)
**용도**: [dev-org-transformation.md](../../wiki/strategies/dev-org-transformation.md) 병합 — 기존 FDE는 인재 전략, 본 내용은 제품·기술 전략
**참고**: FDP = Flexible Data Placement (NVMe 표준), RU/RG/RUH = Reclaim Unit / Reclaim Group / Reclaim Unit Handle

---

맞습니다. 지금까지의 스토리라인에는 FDP 표준을 실제 고객 가치로 전환하는 실행 주체가 빠져 있었습니다.

FDP는 인터페이스일 뿐입니다. 워크로드의 데이터 수명을 분석하고, RUH에 매핑하고, 효과를 검증하는 시스템 소프트웨어가 없으면 고객은 FDP를 제대로 활용할 수 없습니다. 고객에게 이 작업을 전적으로 맡기면 삼성은 결국 FDP를 지원하는 여러 SSD 공급사 중 하나가 되어 표준화의 이익보다 가격 경쟁 압력을 더 크게 받을 수 있습니다.

따라서 전략은 다음과 같이 확장되어야 합니다.

**삼성은 FDP SSD 공급자에서 FDP 기반 Host–SSD 통합 솔루션 제공자로 전환해야 한다.**

## 보완된 전체 전략 구조

| 전략 요소 | 역할 |
|---|---|
| Binding 계약 | 장기 물량과 공급능력 확보 |
| FDP 표준 SSD | 고객별 요구를 공통 인터페이스로 수용 |
| 시스템 소프트웨어 | 워크로드 요구를 FDP 정책으로 변환 |
| End-to-End 검증 | 실제 WAF·QoS·수명 개선 보장 |
| 고객 공동개발 | 고객 시스템에 최적화하고 장기 관계 구축 |
| 현장 텔레메트리 | 제품·소프트웨어를 지속적으로 개선 |

이를 한 문장으로 표현하면 다음과 같습니다.

**Binding으로 수요를 확보하고, FDP로 제품을 표준화하며, 시스템 소프트웨어로 고객 워크로드를 연결한다.**

## 왜 시스템 소프트웨어가 필요한가

FDP SSD가 제공하는 것은 데이터 배치에 사용할 수 있는 RU, RG, RUH와 관련 명령 및 상태정보입니다. 그러나 SSD는 다음 사항을 스스로 알 수 없습니다.

* 어떤 데이터가 hot/cold인지
* 데이터의 예상 수명이 얼마인지
* 어떤 데이터가 함께 삭제되는지
* 어떤 테넌트와 서비스에 속하는지
* 어떤 I/O가 tail latency에 민감한지
* 어느 데이터가 성능보다 수명이 중요한지

이 정보는 DB, 캐시, 파일시스템, 오브젝트 스토리지와 같은 상위 소프트웨어에 있습니다.

따라서 실제 FDP 효과는 다음 과정에서 만들어집니다.

1. 고객 워크로드의 I/O와 데이터 수명 분석
2. 데이터 유형과 수명별 분류
3. 데이터 그룹을 RUH에 매핑
4. 워크로드 변화에 따라 정책 조정
5. WAF·성능·용량·수명 측정
6. 텔레메트리를 기반으로 SSD와 Host 정책을 재조정

삼성이 SSD만 제공하면 고객이 이 과정을 모두 개발해야 합니다. 반대로 삼성이 시스템 소프트웨어와 최적화 도구를 제공하면 FDP 도입 장벽을 낮추면서 고객 아키텍처에 더 깊이 참여할 수 있습니다.

## 실행전략 1: Samsung FDP Enablement Platform 구축

삼성은 SSD와 함께 다음 시스템 소프트웨어 패키지를 제공해야 합니다.

### FDP SDK와 공통 라이브러리

* FDP 탐색·설정 API
* RU/RG/RUH 관리 라이브러리
* 데이터 분류 및 RUH 매핑 API
* FDP 미지원 SSD용 fallback
* Linux block I/O, io_uring, SPDK 연동
* FDP event와 telemetry 수집 API
* reset·format·namespace 변경 시 상태 관리

고객 애플리케이션은 SSD별 세부 명령을 직접 처리하지 않고 삼성 SDK나 표준화된 공통 API를 사용합니다.

### 주요 워크로드용 플러그인

모든 고객의 애플리케이션을 삼성에서 직접 개발할 필요는 없습니다. 공통적으로 사용되는 시스템 소프트웨어에 FDP 연결 계층을 제공하는 것이 현실적입니다.

* RocksDB 및 KV Store
* CacheLib 등 분산 캐시
* Ceph 및 오브젝트 스토리지
* MySQL·PostgreSQL 계열 DB
* Vector DB 및 RAG 스토리지
* Kubernetes persistent storage
* 가상화 및 멀티테넌트 스토리지
* AI checkpoint 및 dataset storage

고객은 자신의 워크로드 특성에 맞게 정책만 수정하고, FDP 처리의 공통 부분은 재사용할 수 있습니다.

### Workload Profiler

고객이 FDP 정책을 수작업으로 설계하기는 어렵습니다. 삼성은 고객 I/O trace를 분석해 다음을 자동으로 식별하는 도구를 제공할 수 있습니다.

* 데이터 수명 분포
* overwrite 및 invalidation 주기
* hot/cold 데이터 비율
* sequential/random 특성
* 테넌트별 I/O 분포
* GC와 tail latency의 상관관계
* 추천 RUH 수와 매핑
* 예상 WAF·OP·endurance 효과

이 도구가 있어야 FDP가 단순 기능에서 실제 TCO 최적화 솔루션으로 발전합니다.

### FDP Emulator와 Digital Twin

고객이 실제 SSD를 대규모로 도입하기 전에 FDP 효과를 예측할 수 있어야 합니다.

* 고객 trace replay
* RU 크기와 RUH 수 변화
* NAND 세대별 동작
* GC·OP·wear 조건
* 수명 경과에 따른 성능
* 장애·reset·power cycle
* 멀티테넌트 간섭
* p999/p9999 latency

삼성 SSD의 미디어 모델과 고객 워크로드 모델을 결합하면 고객은 대규모 qualification 전에 정책 효과를 평가할 수 있습니다.

## 실행전략 2: 표준 워크로드 프로파일 제공

고객마다 새로운 펌웨어를 만드는 대신 검증된 정책 프로파일을 제공합니다.

| 프로파일 예시 | 주요 목표 |
|---|---|
| FDP-Cache | cache eviction 주기별 데이터 분리 |
| FDP-KV | LSM-tree level과 compaction 데이터 분리 |
| FDP-Database | WAL·metadata·user data 분리 |
| FDP-Multi-tenant | 서비스 또는 테넌트별 GC 간섭 억제 |
| FDP-Vector | index·embedding·temporary data 분리 |
| FDP-Checkpoint | 장기 데이터와 반복 갱신 checkpoint 분리 |
| FDP-QLC | 저빈도 쓰기와 대용량 읽기 중심 최적화 |

프로파일은 새로운 펌웨어가 아니라 Host 소프트웨어 설정과 검증된 FDP 사용 방법으로 제공해야 합니다. 그러면 SSD 펌웨어 공통화를 유지하면서 고객별 최적화를 제공할 수 있습니다.

## 실행전략 3: End-to-End 공동검증 체계 구축

FDP 검증은 NVMe 명령이 정상 동작하는지만 확인해서는 부족합니다. 고객이 원하는 것은 표준 준수가 아니라 실제 TCO 개선입니다.

따라서 검증 범위를 다음까지 확대해야 합니다.

* Application → 파일시스템/DB
* Host FDP 라이브러리
* OS·Driver·SPDK
* NVMe FDP 인터페이스
* SSD FTL·GC
* NAND media behavior
* 현장 텔레메트리

주요 검증지표도 제품 성능에서 시스템 성과로 확대해야 합니다.

| 영역 | 핵심 지표 |
|---|---|
| 효율 | WAF, OP, usable capacity |
| 성능 | throughput, 평균 latency, p999/p9999 |
| 수명 | NAND write량, DWPD, 예상 교체주기 |
| 격리 | 테넌트 간 성능 간섭 |
| 전력 | TB당 전력, NAND 내부 동작 감소 |
| 운영 | reset·rollback·장애복구 시간 |
| 도입 | 고객 SW 변경량, qualification 기간 |

특히 고객 trace를 pre-silicon 및 post-silicon 검증에 재사용하는 체계가 필요합니다. 이를 통해 고객 워크로드가 제품 개발 후반에 들어오는 것이 아니라 컨트롤러와 펌웨어 설계 초기부터 반영될 수 있습니다.

## 실행전략 4: 고객 공동개발 조직 신설

기존의 SSD 조직만으로는 이 전략을 수행하기 어렵습니다. SSD 제품개발 조직과 고객의 시스템 소프트웨어 조직 사이를 연결하는 별도 역량이 필요합니다.

### 필요한 네 가지 기능

| 기능 | 역할 |
|---|---|
| Host Software | SDK, Linux, SPDK, 라이브러리 개발 |
| Workload Integration | DB·Cache·Vector DB·스토리지 SW 연동 |
| Customer Solution Engineering | 고객 trace 분석과 정책 공동설계 |
| End-to-End Validation | Host–SSD–NAND 통합검증 |

이 조직은 단순 기술지원 조직이 아니라 제품 기획과 개발에 참여해야 합니다.

* 고객 워크로드 요구 수집
* FDP 표준 개선 제안
* SSD 아키텍처 요구사항 도출
* Host SW와 FW 공동 릴리스
* 고객 현장 검증 및 배포 지원
* 현장 데이터의 차기 제품 반영

## 실행전략 5: Binding 계약에 기술협력을 포함

Binding 계약도 단순 물량과 가격 약정에서 확장해야 합니다.

### 고객의 약정

* 연도별 NAND·SSD 물량
* 대상 워크로드와 도입 시스템
* qualification 일정
* 익명화된 trace 및 workload 특성 제공
* FDP Host SW 적용과 검증 참여
* 공동 로드맵 운영

### 삼성의 약정

* NAND와 SSD 공급능력
* 제품 및 NAND 세대 로드맵
* FDP SSD와 SDK 제공
* 고객 워크로드 공동 최적화
* 장기 펌웨어와 시스템 SW 지원
* 성능·WAF·수명 개선 목표
* 세대 전환 시 동등성 검증

이렇게 하면 Binding은 단순 NAND 예약계약이 아니라 SSD와 시스템 소프트웨어를 포함한 공동 플랫폼 계약이 됩니다.

## 실행전략 6: 오픈소스와 차별화의 경계 설정

FDP는 개방형 표준이므로 삼성의 시스템 소프트웨어가 지나치게 독점적이면 고객이 vendor lock-in을 우려할 수 있습니다.

따라서 계층을 분리해야 합니다.

### 공개해야 할 영역

* 기본 FDP 라이브러리와 API
* Linux·SPDK 연동
* 관리 및 진단 도구
* 표준 workload adapter
* FDP 규격 적합성 테스트

### 삼성의 차별화 영역

* NAND 및 FTL 동작 모델
* workload 분석 알고리즘
* 자동 RUH 정책 추천
* 삼성 SSD 전용 성능 최적화
* 수명·WAF·tail latency 예측 모델
* 현장 텔레메트리 분석
* 고객별 검증 프로파일

고객은 공개 표준의 안정성을 확보하면서도 삼성 SSD를 선택하면 더 높은 TCO 효과를 얻을 수 있습니다.

## 단계별 실행 로드맵

### 1단계: FDP 제품과 기본 도구 확보

* 공통 FDP SSD 펌웨어
* Linux·SPDK SDK
* nvme-cli·fio 기반 테스트 도구
* trace 수집 및 분석 도구
* FDP Emulator
* 기본 Cache/KV 프로파일

### 2단계: 전략 고객 공동검증

* 2~3개 핵심 CSP와 workload pilot
* 고객 trace 기반 RUH 정책 개발
* WAF·p999·용량효율 측정
* 공통 요구를 제품 및 표준에 반영
* 고객별 펌웨어 요구를 Host 정책으로 전환

### 3단계: 상용 플랫폼화

* FDP 지원 SSD 전 라인업 확대
* 검증된 workload profile 제공
* 고객 qualification 자동화
* Host SW와 SSD FW의 공동 릴리스
* Binding 계약에 시스템 SW 지원 포함

### 4단계: FDP 이후의 Host Control 확장

FDP가 데이터 배치 영역에서 성공하면 동일한 접근법을 다음 영역으로 확대합니다.

* 표준 QoS 및 traffic isolation
* 전력·thermal control
* telemetry 및 failure analytics
* firmware attestation과 배포관리
* namespace별 endurance와 OP
* multi-tenant resource control

## 전략 성과를 측정하는 KPI

* 전체 기업용 SSD 중 FDP 지원 비중
* 출하 SSD 중 실제 FDP 활성화 비중
* FDP 적용 고객과 Binding 계약 물량
* 고객별 펌웨어 브랜치 감소율
* 고객 qualification 기간
* Host SW 적용에 필요한 개발기간
* WAF 및 NAND write 감소율
* usable capacity 증가율
* p999/p9999 latency 개선율
* 고객의 Captive SSD 계획에서 삼성 완제품으로 전환된 물량

단순히 FDP 지원 SSD 출하량을 KPI로 삼으면 실제 사용되지 않는 기능이 될 수 있습니다. 가장 중요한 지표는 고객 시스템에서 FDP가 실제 활성화된 SSD 용량입니다.

## 보완된 최종 스토리라인

AI 성장으로 메모리와 기업용 SSD 수요가 급증하고 있지만, 삼성은 향후 공급 확대와 불황에 대비해 고객 수요를 Binding 계약으로 장기화해야 한다. Binding은 단순 물량계약을 넘어 고객과 생산능력·제품·기술 로드맵을 공유하는 전략적 협력관계로 발전한다.

그런데 이러한 전략 고객들은 자신의 워크로드와 데이터센터 TCO를 통제하기 위해 Captive SSD를 확대하고 있다. 삼성이 NAND 공급에만 머물면 장기 물량은 확보하더라도 완제품 SSD의 부가가치를 잃게 되고, 모든 요구를 고객별 커스텀 SSD로 개발하면 제품과 펌웨어가 파편화된다.

이에 삼성은 FDP 기반 표준 SSD를 통해 고객의 데이터 배치 통제권과 삼성의 제품 표준화를 양립시켜야 한다. 그러나 FDP SSD만 공급해서는 고객이 시스템 소프트웨어를 직접 개발해야 하므로 도입이 확산되기 어렵고, 삼성 역시 차별화하기 어렵다.

따라서 삼성은 FDP SSD와 함께 Host SDK, 워크로드 분석, DB·캐시 연동, 정책 최적화, Emulator 및 End-to-End 검증을 제공하는 시스템 소프트웨어 역량을 구축해야 한다. 고객은 삼성과 함께 자신의 워크로드를 최적화하고, 삼성은 고객 시스템과 SSD·NAND를 연결하는 장기 플랫폼 파트너가 된다.

결과적으로 삼성의 전략은 Binding으로 장기 수요를 확보하고, FDP로 SSD를 표준화하며, 시스템 소프트웨어 공동개발을 통해 Captive 고객의 요구를 삼성 완제품 생태계 안에 수용하는 것이다.

최종 전략 메시지는 다음과 같이 정리할 수 있습니다.

**Binding secures demand. FDP standardizes the device. System software creates customer value. End-to-end co-optimization builds the strategic relationship.**
