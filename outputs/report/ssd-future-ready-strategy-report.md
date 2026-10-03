---
type: report
status: v1.2 (2026-10-03). 덱 v1.0 리뷰 반영(SCADA 제외 · MLC 제외 · 데이터센터 유형별 스토리지 요구 · 고객 측 고DWPD 근거 · 근거 사슬). 덱 4장 v1.1
deck: outputs/presentation/ssd-future-ready-strategy.pptx (v1.1, 생성기 scripts/generate_ssd_future_ready_pptx.py)
outline: outputs/presentation/ssd-future-ready-strategy-outline.md
supersedes_focus: outputs/report/ssd-survival-strategy-report.md (KV 캐시 고DWPD 중심 → 데이터센터별 요구에 맞춘 준비 + 고객 협력 과제)
sources:
  - sources/articles/datacenter-types-storage-requirements-2026-10.md
  - sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/samsung-kv-cache-activities-2026-09.md
  - sources/articles/component-to-system-solution-ladder-facts-2026-09.md
  - sources/articles/micron-anthropic-sca-2026-06-22.md
  - sources/articles/palantir-fde-model-2026-07.md
wiki:
  - wiki/concepts/datacenter-types-storage-requirements.md
  - wiki/concepts/high-dwpd-operating-point.md
  - wiki/concepts/mixed-media-ssd.md
  - wiki/concepts/high-capacity-fault-tolerance.md
  - wiki/concepts/solution-ladder-component-to-system.md
  - wiki/concepts/ssd-future-solution-candidates.md
  - wiki/scenarios/scenario-matrix.md
  - wiki/strategies/invariant/README.md
  - wiki/strategies/qlc-execution-strategy.md
last_updated: 2026-10-03
---

# 불확실성이 높은 미래에 대응하기 위한 고객 협력 전략

**데이터센터마다 다른 스토리지 요구에 맞춘 준비와, 새로 나타난 고객 협력 과제**

> **문서 성격**: 2026-10-03 전략 방향 조정. 직전 [SSD 생존 전략](ssd-survival-strategy-report.md)은 KV 캐시 오프로딩이 만드는 고DWPD 수요를 중심에 두었다. 이 문서는 그것을 **지금 보이는 여러 신호 가운데 하나**로 낮춘다.
>
> **이 문서가 주장하지 않는 것**: 여기서 제안하는 기술만 준비하면 모든 미래에 대비할 수 있다고 말하지 않는다. 미래는 우리가 그린 시나리오 밖에서도 올 수 있다. 이 문서는 **지금 예측할 수 있는 범위**, 곧 위키의 시나리오 A~E와 지금 관측되는 데이터 안에서 최선을 다해 준비하고, 신호가 바뀌면 판단을 고치겠다는 제안이다.
>
> **근거 규칙**: 모든 주장에는 데이터 근거를 붙이고, 덱에서는 그 데이터를 그래프로 보인다(디자인 스킬 v2.1 · 11.J). 등급: ✅ 1차 원문 확인 · 🟡 2차 또는 검색 요약 · ⚠️ 파생 · 가정 · 과제팀 판단 · `[사내 확인]` 사내 데이터로 확인할 항목.

---

## 0. 요약

**슬라이드 네 장의 제목을 이어 읽으면 전략이 된다.**

> SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터마다 스토리지에 요구하는 것이 다릅니다. SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다. 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다. 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다.

| 묶음 | 기술 | 대응하는 데이터센터 | 대표 데이터 |
|---|---|---|---|
| **SSD 안에서 지금처럼** | Mixed Media (QLC + pSLC 영역) | 범용 클라우드(오래 쓰고 용량 중심) | 24베이 서버에 추가 슬롯 0개로 pSLC 19.2TB(⚠️ 산술) |
| | 고용량 + 결함 허용 | AI 학습(랙 공간 · 전력이 귀함), 에이전트 | 같은 폼팩터 다이 1,024 → 약 2,133개, 이중 패리티(⚠️ 모델) |
| **고객 시스템과 함께 (새로 나타남)** | 고DWPD (용량형 + 2TB · 30 DWPD 운영점) | AI 추론, 에이전트 | 2TB · 30 DWPD · 5년: SSD 혼자 약 120다이 → 고객 배치 정보로 약 47다이(-60%, ⚠️ 산술) |

**한 줄 결론**: **실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다.** 데이터센터마다 다른 요구를 미리 준비하되, SSD 안에서 풀 수 있는 것은 지금처럼 잘하고, **새로 나타난 고객 협력 과제(고DWPD)는 지금까지와 다른 방식으로 전략적으로 실행**해야 한다.

---

## 1. 왜 방향을 조정하나

### 1.1 KV 캐시 고DWPD는 중요하지만 부분이다

| 커지는 신호 (데이터) | 줄어드는 신호 (데이터) |
|---|---|
| KV 캐시 계층 실측 쓰기 **드라이브당 3.2 DWPD**(정격 3 DWPD 제품 초과, StorageReview 2026-08 🟡) 대 QLC 정격 0.6 | KV 오프로드 블록 트레이스 **읽기 2.0GiB/s 대 쓰기 11MiB/s = 읽기 99.5%**(CHEOPS'25 ✅) |
| 2026년 AI 전용 SSD 정격 **50~120 DWPD**(Kioxia GP1 50 · Phison X202Z 60 · DapuStor X5 120 🟡) | DeepSeek V4.1 KV 캐시용 **SSD 용량 1/8**(보도 🟡) |
| AI 서비스의 GPU당 하루 KV 기록 **약 5~10TB**(DeepSeek · Kimi · B200 측정의 산술 ⚠️) | NVIDIA Dynamo는 SSD 수명 보호를 위해 재사용 빈도 ≥ 2 블록만 디스크로(기본 활성 ✅) |

**판단**: 고DWPD는 준비해야 할 기술이지만 **단일 베팅의 대상이 아니다**([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §3).

### 1.2 다운턴의 교훈: 수요를 하나만 보면 늦는다

HBM 점유율은 2022년 SK 50% · 삼성 40%에서 2Q25 62% · 17%로 갈렸다([ssd-survival-strategy-report.md](ssd-survival-strategy-report.md) §1.1). 하나의 수요를 늦게 읽으면 첫 호황을 놓친다. 이번에는 다음 수요를 하나로 단정하지 않고, **데이터센터마다 다른 요구를 미리 준비**한다. 위키의 불변 전략(Robust Strategy) 원칙을 SSD 개발에 적용한 것이다([invariant/README.md](../../wiki/strategies/invariant/README.md)).

### 1.3 데이터센터마다 스토리지 요구가 다르다

하이퍼스케일러는 한 종류의 데이터센터를 운영하지 않는다. Google은 8세대 TPU를 학습용과 추론용으로 나누며 "인프라 요구가 갈라졌다"고 밝혔다(✅). 상세는 [datacenter-types-storage-requirements.md](../../wiki/concepts/datacenter-types-storage-requirements.md).

| 데이터센터 | 스토리지 요구 | 근거 데이터 | 준비할 기술 |
|---|---|---|---|
| **범용 클라우드** | 오래 쓰고 용량 중심 | 서버 내용연수 4 → 6년(Microsoft ✅ · Alphabet · Meta · Amazon 🟡), 건물 15 → 25년(Microsoft FY27 ✅), 스토리지 = Azure 운영 배출 33%(✅) | Mixed Media |
| **AI 학습** | 랙 공간 · 전력이 귀하다, 체크포인트 대역 · 용량 | 랙 전력 범용 11kW → GB200 NVL72 약 130kW → 2027 1MW급(🟡), 405B 체크포인트 1회 약 5.7TB(14B/파라미터 산술 ⚠️), 2026 미국 가동 계획 16GW 중 착공 확인 약 5GW(추정 상충 🟡) | 고용량 |
| **AI 추론** | 쓰기 요구가 엇갈린다 | §1.1 표 | 고DWPD |
| **에이전트** (Meta Muse · OpenAI dots, 2026-09) | 문맥이 길고 상태가 남는다 | Copilot 에이전트 호출당 입력 67,818 토큰 = 2024 채팅 요청의 약 42배 → 70B 모델 KV 0.53GB → 22GB(✅ 원데이터 + ⚠️ 산술), 1시간 넘는 세션 18.8%(✅ 원데이터 집계), 사용자별 영속 클라우드 컴퓨터(🟡) | 고DWPD · 고용량 |

**한계**: 에이전트 전용 데이터센터를 따로 짓는다는 하이퍼스케일러 진술은 없고, 에이전트 데이터센터의 랙 전력 · 에이전트당 하루 쓰기량은 공개되지 않았다. 42배는 요청당 입력 토큰 비교(서비스 · 연도가 다름)이며 쓰기량이 아니다.

### 1.4 시나리오 안에서의 대응 (⚠️ 과제팀 판단)

| 시나리오 (확률) | 상황 | 고DWPD | Mixed Media | 고용량 |
|---|---|---|---|---|
| **B AI 르네상스** (39%) | AI 수요 지속 · 글로벌 성장 | ● | ◐ | ● |
| **A 황금 요새** (26%) | AI 지속 · 서방 진영 중심 증설 | ● | ◐ | ● |
| **D 조용한 재편** (21%) | AI 과열 조정 · 메모리 불황 | ○ | ● | ◐ |
| **C 기술 냉전** (8%) | AI 붕괴 + 디커플링 | ○ | ● | ◐ |
| **E 패러다임 전환** (6%) | CXL · PIM 등으로 메모리 구조 변화 | ○ | ● | ● |

(● 핵심 · ◐ 보조 · ○ 약함) 지금 그린 다섯 시나리오 안에서는 어느 경우에도 핵심이 되는 기술이 하나 이상 있다. **이것은 "모든 미래에 대비했다"는 뜻이 아니다.** 시나리오 밖의 변화는 §4.4의 신호 센싱으로 일찍 알아채고 판단을 고친다.

---

## 2. 솔루션: SSD 안에서 풀 것과 고객 시스템과 함께 풀 것

### 2.1 두 묶음으로 나누는 기준

| 기준 | SSD 안에서 지금처럼 | 고객 시스템과 함께 (새로 나타남) |
|---|---|---|
| 요구는 어디서 정의되나 | 규격 · 사양으로 정의되고 SSD가 구현해 낸다 | **고객 소프트웨어 안에서** 정의된다: 데이터가 언제 지워지는지는 KV 캐시 관리자 · 캐시 정책만 안다 |
| SSD 혼자 하면 | 충분한 효과가 난다 | 다이를 크게 희생한다(약 120 대 47) |
| 지금 위치 | 기존 개발 방식으로 경쟁 중 | 고객 코드 안의 접점이 이제 막 생기고 있다(LMCache FDP 머지 ✅) |
| 필요한 접근 | 지금 방식으로 잘하면 된다 | **지금까지와 다른 방식**이 필요하다(§4) |

보안 · 신뢰(OCP L.O.C.K. 공저, PQC 대응 등)는 중요성이 이미 잘 인식돼 있고 삼성이 잘하고 있는 영역이라 다루지 않는다. 전력 · 냉각(콜드플레이트 폼팩터, NVMe 2.3 전력 한도 · 측정)은 고용량 제품의 요건으로 흡수한다. GPU 직결 고IOPS(SCADA)는 논의하기 이른 시점이라 제외하고, 재검토 신호만 둔다([ssd-future-solution-candidates.md](../../wiki/concepts/ssd-future-solution-candidates.md)).

### 2.2 SSD 안에서 지금처럼: Mixed Media (pSLC)

**정의**: QLC로 출하하되 용량 일부를 **pSLC 영역**으로 쓰게 한 드라이브. 캐시 SSD를 따로 사면 슬롯이 하나 더 필요하지만, 한 드라이브 안의 pSLC 영역은 슬롯을 늘리지 않는다([mixed-media-ssd.md](../../wiki/concepts/mixed-media-ssd.md)).

| 층 | 내용 |
|---|---|
| SSD 안에서 | 매체 모드별 엔듀런스 그룹(EG) · NVM Set, 비율은 출하 시 구성, 다이 수준 격리, **영역별 마모 · 보증 회계**(EG별 로그는 표준 ✅, 영역별 TBW 보증 선례 없음) |
| 고객은 | 별도 네임스페이스로 노출된 빠른 영역을 **기존 소프트웨어 그대로** 쓴다. 계층 배치 소프트웨어(CSAL류)와 연동하면 효과가 더 커진다(선택) |
| 선례 · 경쟁 | DapuStor J5060 dual-mode(pSLC 400GB~1.2TB), Kioxia Mixed Mode 🟡. **삼성의 호스트 가시 pSLC 영역 제품은 공개 자료에서 찾지 못함** |
| 경제성 | QLC → pSLC 실제 전환비 5 : 1(DapuStor). 24베이 서버에서 추가 슬롯 0개로 pSLC 19.2TB(⚠️ 산술) |
| 근거의 한계 | 하이퍼스케일러가 "인프라 재사용 때문에 단일 혼합 매체 드라이브를 원한다"고 말한 공개 기록은 없다 |

### 2.3 SSD 안에서 지금처럼: 고용량 + 결함 허용

**정의**: 같은 폼팩터에 245TB → 512TB를 담는 기술과, 1,000~2,000개 다이 중 일부가 고장 나도 계속 쓰게 하는 결함 허용 기술([high-capacity-fault-tolerance.md](../../wiki/concepts/high-capacity-fault-tolerance.md)).

| 용량 | 다이 수 | 드라이브 재구축(무부하 · 부하 중) | 다이 1개만 복구 |
|---|---|---|---|
| 245.76TB | 1,024 | 21.5시간 · 9일 | 13분 |
| 512TB | 약 2,133 | 44.7시간 · 18.8일 | 13분 |

(61.44TB 실측의 선형 확대 ⚠️) 단일 패리티로 245TB급은 충족 가능하지만 512TB급은 이중 패리티 · 여분 다이가 필요하다([ssd-die-reliability-ppm.md](../../wiki/concepts/ssd-die-reliability-ppm.md)). SSD 안에서: 다이 패리티, Fail-in-Place, OCP SMART 다이 필드(✅), 콜드플레이트 폼팩터 · 전력 한도 대응. 고객과 하면 더 커지는 것(선택): 고장 LBA만 재구축(Get LBA Status ✅, Linux 경고 미활성 ✅), 용량을 줄이며 계속 운영(NVMe 명령 없음 ✅). Azure 연구는 "오늘날 부분 고장은 전체 고장"이라고 명시했다(✅).

> **재확인 필요**: 삼성 BM1773, PM1733 FIP 감량 단위는 이번 조사에서 재확인되지 않았다. 핵심 근거로 쓰지 않는다.

### 2.4 고객 시스템과 함께: 고DWPD (용량형 + 2TB · 30 DWPD 운영점)

**정의**: `용량 × DWPD = P/E × 원시 용량 ÷ (WAF × 보증 일수)`에서 **고객의 데이터 배치가 WAF를 정한다**([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §4). 하나의 기술에 두 운영점이 있다.

| 운영점 | 무엇 | 지금 신호 |
|---|---|---|
| **용량형 고DWPD** | 수십 TB급 TLC · QLC를 배치 정보(FDP)로 1~3 DWPD 이상에 올려 KV 캐시 계층에 쓴다 | KV 계층 실측 3.2 DWPD 🟡, LMCache FDP 머지 ✅ |
| **2TB · 30 DWPD** | 작업 집합이 작고 교체가 잦은 캐시 계층용 소용량 고내구 | 새 제품군 신호 `[사내 확인]`. 공개 자료에는 아직 2TB · 30 DWPD "KV 캐시 SSD"가 없고, 2026년 50 DWPD 이상 AI SSD는 모두 SLC급이며 IOPS · 지연을 앞세운다 🟡 |

**왜 고객과 함께인가 (메커니즘)**: SSD 혼자서는 곧 지워질 데이터와 오래 남을 데이터가 한 블록에 섞인다. 블록을 지울 때마다 유효 데이터를 옮겨 써야 해서 WAF가 약 3에 머문다. 2014~2019년 SSD 단독 워크로드 최적화(Multi-stream · 핫/콜드 분리)도 실제 워크로드에서 WAF를 약 3에서 내리지 못했다([solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md) §2.5). 고객이 수명을 알려 주면(FDP) 수명이 같은 데이터끼리 모아 블록을 통째로 지울 수 있어 WAF가 1에 가까워진다(CacheLib 3.22 → 1.03 ✅).

**2TB · 30 DWPD · 5년 다이 산술** (1Tb TLC 환산, SLC 모드 P/E 6만, 이론 비트/셀 비 ⚠️, [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](../../sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md) §3):

| 구성 | WAF | 필요 OP | 다이 수 |
|---|---|---|---|
| SLC 모드, SSD 혼자 | 3 | 174% | **약 120** |
| SLC 모드, 고객 배치 정보(FDP) | 1 | 최소 7% | **약 47** (-60%) |

같은 SLC 모드에서 **WAF 3 → 1만으로 다이가 약 60% 준다.** 이 지렛대는 SSD 혼자 당길 수 없다. 초고DWPD는 별도 축이 아니라 고DWPD의 운영점으로 둔다(같은 산식 · 지렛대 · 고객 소프트웨어). 사내에서 고객 요구가 확인되면 독립 제품 과제로 올린다(§4.4).

| 층 | 내용 |
|---|---|
| SSD 안에서 | SLC 모드 운용, OP 조정, 출하 시 구성 SKU(OP · 모드 비율 · RUH) |
| 고객과 함께 | **데이터 수명 정보(FDP)로 WAF 3 → 1**. 테넌트 · 수명별 배치, KV 트레이스 기반 WAF 실측 |
| 지금 위치 | LMCache에 FDP 배치 머지(삼성 Committer ✅). Dynamo · Mooncake · FlexKV 기여 0(✅) |
| 갭 | 프로덕션 KV 캐시 트레이스 기반 WAF 실측 미공개, 고내구 드라이브 중 FDP 지원을 명시한 제품 없음 🟡 |

### 2.5 공통 기반

| 공통 요소 | 고DWPD | Mixed Media | 고용량 |
|---|---|---|---|
| **배치 정보** | 수명별 분리(FDP)로 WAF ↓ | hot 데이터를 pSLC 영역으로 | 고장 영향 범위 국소화 |
| **구성 가능성** | SLC 모드 비율 · OP · RUH | 영역 비율 · EG 구성 | 보호 수준 · 용량 |
| **텔레메트리** | 실시간 WAF | 영역별 마모 | 다이 오프라인 · 고장 LBA |

세 기술은 **워크로드 구성형 SSD**([workload-configurable-ssd-report.md](workload-configurable-ssd-report.md)) 플랫폼 위의 구성이다. 공통 기반을 먼저 만들고, 제품화 비중은 신호로 정한다.

---

## 3. 왜 고객 시스템까지 넓어져야 하나: NAND → SSD → 고객 시스템

### 3.1 고객의 쓰기는 커지고, 셀 수명은 줄었다

| 축 | 데이터 | 등급 |
|---|---|---|
| 셀이 견디는 쓰기 | P/E 대표값 SLC 10만 → MLC 1만 → TLC 3천 → QLC 1천(약 100배 ↓) | 🟡 (해법 사다리 원장) |
| 고객 캐시 계층의 쓰기 | QLC 정격 0.6 DWPD 대 **Meta · Twitter 플래시 캐시 쓰기 예산 3 DWPD**(Kangaroo, SOSP'21 🟡), **Meta Tectonic 스토리지 캐시 목표 7.2 DWPD**(Baleen 아티팩트 ✅), AI KV 계층 실측 3.2 DWPD(🟡) | 기준(예산 · 목표 · 실측)이 서로 다름 |
| 필드 소비 | NetApp 약 200만 대 SSD 중앙값 0.36 DWPD, **7% 이상이 3 DWPD 초과**(FAST'22 🟡) | 🟡 |

근거: [ssd-customer-high-dwpd-evidence-2026-10.md](../../sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md)(CU). **한계**: 하이퍼스케일러 · AI 랩 · NVIDIA가 KV 캐시용 DWPD(10 또는 30)를 요구한다고 명시한 문서는 없다.

### 3.2 고객은 이미 자기 시스템에서 이 문제와 싸운다

**Meta CacheLib(OSDI'20 ✅)**: 하이브리드 캐시의 DRAM 축출분을 모두 플래시에 넣으면 **쓰기율이 SSD 목표 수명 예산의 150%**가 된다. 그래서 Meta는 **플래시를 50% 오버프로비저닝**하고, **머신러닝 수용 정책(자기 소프트웨어)으로 플래시 기록량을 44% 줄였다**(적중률 저하 없음). Google CacheSack도 플래시 마모를 18~26% 줄였다(🟡). 해법이 이미 **고객 소프트웨어 안에** 있다는 뜻이다.

### 3.3 해법 사다리

| 단계 | 시기 | 단품 지표(악화) | 보상(주체) | 결과 |
|---|---|---|---|---|
| **1 NAND → SSD** | 1991~ | RBER 약 100만 배 ↑ | 컨트롤러 ECC 약 60배 ↑ | **완결**: UBER 요구(JESD218) 충족 |
| **2 SSD 혼자 최적화** | 2014~2019 | P/E 약 100배 ↓ | SSD가 워크로드를 추정(Multi-stream · AutoStream · 핫/콜드 분리) | **부분 성공**: WAF는 실 워크로드에서 약 3 |
| **3 고객 시스템과 공동 설계** | 2022~ | 동일 | 호스트가 데이터 수명을 지정(FDP 2022), 애플리케이션까지(CacheLib 2025, LMCache 2026) | **WAF 3.22 → 1.03** |

**사양을 받아 SSD를 잘 만드는 방식은 2단계에 머문다. 3단계는 고객 시스템 안에서 함께 설계해야 닿는다.** DRAM도 같은 길에 들어섰다(PRAC 2024, HBM4 커스텀 베이스 다이).

---

## 4. 실행 전략: 고객 협력

### 4.1 무엇이 다른가

| | 지금까지 | 앞으로 (새 과제에 한해) |
|---|---|---|
| 요구를 얻는 곳 | 고객 사양서 | 고객 시스템 안(코드 · 트레이스 · 운영 지표) |
| 일하는 방식 | 사양 → 개발 → 인증 | 상주 · 오픈소스 기여 · 공동 실측 |
| 계약 | 물량 · 가격 | 물량 + 공동 설계 · 운영 통합 |
| 성과 | 사양 충족 · 인증 통과 | 고객 시스템에서 켜진 기능 · 고객 지표(토큰당 비용 · GPU 가동률) |

Mixed Media · 고용량은 지금 방식을 유지하고, 새 방식은 **고DWPD에 집중**한다.

### 4.2 공동 설계 의제

| 과제 | 고객 쪽 상대 | 공동 설계 과제 | 규격 · 오픈소스 |
|---|---|---|---|
| **고DWPD** | KV 캐시 관리자(LMCache · Dynamo · Mooncake), 추론 엔진, 캐시 계층(CacheLib류) | 테넌트 · 수명별 배치, KV 트레이스 기반 WAF 실측, 2TB · 30 DWPD 운영점 요구 확인 | LMCache 다음으로 Dynamo · Mooncake에 FDP 경로, NVMe FDP 런타임 재구성 |
| Mixed Media · 고용량 (선택) | 분산 스토리지 · 커널 블록 계층 | 계층 배치 연동, 고장 LBA 재구축 | 같은 협력 통로를 재사용 |

### 4.3 협력의 방식: 계약 · 사람 · 역량

- **계약: 물량에 기술 협력을**. 장기 물량 계약 위에 공동 설계 · 최적화와 운영 통합을 묶는다. 벤치마크는 Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략적 투자 🟡).
- **사람: 고객 안에 상주**. Co-Design Pod(FDE)가 고객 데이터센터 안에서 **명시된 요구와 실제 요구의 간극**을 메운다. 벤치마크는 Palantir FDE(🟡).
- **역량: 시스템 SW와 AI 데이터센터 운영의 눈**. KV 캐시 관리자 · 커널 블록 계층을 읽고 고칠 수 있는 시스템 소프트웨어 전문가, 고객의 지표로 말하는 사람. 출발점은 이미 있다(xNVMe 주 저자, SPDK 기여, LMCache Committer ✅).

### 4.4 신호에 따른 비중 조정 (불변 전략)

모든 기술은 **기반은 지금 만들고, 제품화 비중은 신호로 정한다**(RS-9, [rs9-demand-inflection-sensing.md](../../wiki/strategies/invariant/rs9-demand-inflection-sensing.md)). 신호는 분기마다 다시 읽는다.

| 기술 | 확대 신호 (비중 ↑) | 축소 신호 (비중 ↓) |
|---|---|---|
| 고DWPD | 고객 RFQ의 DWPD 요구 상승, KV 캐시 SSD 쓰기 실측 증가. **2TB · 30 DWPD 독립 과제 승격**: 고객 요구 확인 `[사내 확인]` | 모델 KV 압축 확산(SSD 1/8 사례), 오프로드 정책의 쓰기 억제 강화, CXL 메모리가 KV 계층 흡수 |
| Mixed Media | 서버 · 건물 내용연수 연장 지속, CapEx 절감, 고객 RFQ에 영역 요구 등장 | 신규 그린필드 캠퍼스 중심 증설 |
| 고용량 | 데이터센터 지연 · 규제 확대, AI 랙 전력 밀도 상승, 245TB 채택 확산 | 전력망 완화 · 건설 가속 |
| (재검토) GPU 직결 고IOPS | NVIDIA SSD 요구 사양 공개, 첫 프로덕션 배치, PCIe Gen7 통합 일정, 고객 RFQ에 512B IOPS | 지금은 제외 |

### 4.5 단계와 첫 90일

| 단계 | 시기 | 무엇을 |
|---|---|---|
| 1 공통 기반 | 2026 하반기 ~ 2027 상반기 | FDP · 구성 가능성 · 텔레메트리 플랫폼, 출하 시 구성 SKU 시제 |
| 2 고객별 공동 설계 | 2027 | 전략 고객 1~2사와 고DWPD 의제 착수(트레이스 · WAF 실측), 오픈소스 · 커널 기여 |
| 3 규격과 제품 결정 | 2028 전후 | NVMe · OCP 제안 반영, 2TB · 30 DWPD 독립 과제 여부 결정 |

**계약의 창**: 공급자 우위가 이어지는 2026년 4분기 ~ 2027년 상반기(2027년 하반기 공급 완화 전망 🟡) 안에 기술 협력을 계약에 담는다.

**첫 90일**(덱에서는 발표자 노트): ① 전략 고객 1~2사 선정과 고DWPD 의제 매칭 ② Co-Design Pod 구성 ③ 시스템 SW 전문가 채용 착수 ④ 고객 KV 트레이스로 WAF 실측 ⑤ 신호 대시보드(§4.4) 가동.

### 4.6 성과 지표

| 축 | 지표 |
|---|---|
| 공동 설계 | 공동 설계 의제를 가진 고객 수, 고객 시스템에서 켜진 기능(FDP · 영역 · LBA Status) |
| 이익 | 2TB · 30 DWPD 운영점의 다이 사용량(SSD 혼자 대비) |
| 생태계 | 업스트림 머지 건수(KV 캐시 관리자 · SPDK · 커널), 채택된 규격 제안 수 |

---

## 5. 리스크와 반론

| 리스크 · 반론 | 대응 |
|---|---|
| 신호가 틀릴 수 있다 | 단정하지 않고 분기마다 신호를 다시 읽는다(§4.4). 이 보고서의 판단은 지금 예측 가능한 범위 안의 최선이다 |
| 여러 기술을 하면 자원이 분산된다 | 공통 기반(§2.5)에 먼저 투자하고, 제품화 비중은 신호로 조정한다 |
| 2TB · 30 DWPD는 SLC로 충분하다 | 맞다. 다만 같은 SLC 모드에서도 고객 배치 정보로 다이가 약 60% 준다. 이익은 고객 협력에서 나온다 |
| KV 캐시 고DWPD가 사라질 수 있다 | 고DWPD에서 만든 FDP · SLC 모드 기술은 Mixed Media의 pSLC 영역으로 재사용된다 |
| 에이전트 수요는 아직 초기다 | 수치(요청당 KV 42배 · 1시간+ 세션 18.8%)는 한 서비스의 공개 트레이스다. 범위로 읽고 신호로 갱신한다 |
| 고객 협력은 시간이 오래 걸린다 | 계약의 창을 쓰고, 이미 있는 접점(LMCache)에서 시작한다 |

---

## 6. 근거 대장

| # | 주장 | 등급 | 출처 |
|---|---|---|---|
| F-1 | KV 캐시 고DWPD의 양방향 신호(실측 3.2 · AI SSD 50~120 · 읽기 99.5% · SSD 1/8 · Dynamo 필터) | 🟡 / ✅ | [wcssd-v1](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md) §1 · §4 |
| F-2 | 데이터센터 유형별 스토리지 요구, Muse · dots 식별, Copilot 에이전트 트레이스 | ✅ / 🟡 / ⚠️ | [datacenter-types-storage-requirements-2026-10.md](../../sources/articles/datacenter-types-storage-requirements-2026-10.md) DT-01~DT-55 |
| F-3 | 고객 캐시 DWPD(Kangaroo 3 · Baleen 7.2 · NetApp 7% > 3), Meta CacheLib 150% · OP 50% · -44% | ✅ / 🟡 | [ssd-customer-high-dwpd-evidence-2026-10.md](../../sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md) CU-01~CU-15 |
| F-4 | 30 DWPD 조건 · 2TB · 30 DWPD 다이 산술(120 → 47) | ⚠️ 파생 | [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §5 · §5.5 |
| F-5 | LMCache FDP 배치 머지 · 삼성 Committer, 나머지 3종 기여 0 | ✅ | [samsung-kv-cache-activities-2026-09.md](../../sources/articles/samsung-kv-cache-activities-2026-09.md) |
| F-6 | 서버 내용연수 연장, 건물 15 → 25년, Google fungible 데이터센터 | ✅ / 🟡 | [ssd-mixed-media-infra-reuse-2026-10.md](../../sources/articles/ssd-mixed-media-infra-reuse-2026-10.md) IR-01~IR-16 |
| F-7 | 장치 수준 혼합 매체 선례, 삼성 공개 제품 없음 | 🟡 / 부정 확인 | 같은 원장 §2-A · NG-01 · NG-02 |
| F-8 | 데이터센터 지연 · 랙 전력 · Azure 스토리지 33% · "부분 고장은 전체 고장" | 🟡 / ✅ | [ssd-high-capacity-rackspace-fault-tolerance-2026-10.md](../../sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md) |
| F-9 | 해법 사다리(RBER · ECC · WAF 3.22 → 1.03) | ✅ / 🟡 | [component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) |
| F-10 | 시나리오 확률 A26 · B39 · C8 · D21 · E6 | 위키 | [scenario-matrix.md](../../wiki/scenarios/scenario-matrix.md) |
| F-11 | Micron ↔ Anthropic 계약 4요소 · Palantir FDE | 🟡 | [micron-anthropic-sca](../../sources/articles/micron-anthropic-sca-2026-06-22.md) · [palantir-fde](../../sources/articles/palantir-fde-model-2026-07.md) |

---

## 7. 슬라이드 4장 (덱 v1.1)

상세는 [ssd-future-ready-strategy-outline.md](../presentation/ssd-future-ready-strategy-outline.md).

| 장 | 제목(액션 타이틀) | 주장 → 그래프 |
|---|---|---|
| 1 배경 | SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터마다 스토리지에 요구하는 것이 다릅니다 | HBM 점유율 슬로프 · 범용(내용연수 덤벨 · 건물 15 → 25년) · AI 학습(랙 전력 로그 막대 · 체크포인트 5.7TB) · AI 추론(DWPD 로그 막대 · 읽기 99.5%) · 에이전트(요청당 KV 0.5 → 22GB · 1시간+ 세션 18.8%) |
| 2 솔루션 | SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다 | 슬롯 그림(+1 대 +0) · 같은 폼팩터 다이 격자 · 수명 섞인 블록 대 수명별 블록(WAF ≈ 3 → ≈ 1) · 다이 120 → 47 |
| 3 당위성 | 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다 | P/E 10만 → 1천 · 고객 캐시 DWPD(0.6 · 3 · 3.2 · 7.2) · 계단 3칸 · Meta CacheLib 150% 대 100% · -44% |
| 4 실행 | 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다 | 계약 적층 · 상주 순환 · 역량 격자, 첫 90일은 노트 |
| 결론 밴드 | 실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다 | |
