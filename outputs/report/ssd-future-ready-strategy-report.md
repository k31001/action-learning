---
type: report
status: v1.0 (2026-10-03). 전략 방향 조정, 슬라이드 3장은 아웃라인 승인 후 제작
deck: outputs/presentation/ssd-future-ready-strategy.pptx (승인 후 제작)
outline: outputs/presentation/ssd-future-ready-strategy-outline.md (제안)
supersedes_focus: outputs/report/ssd-survival-strategy-report.md (KV 캐시 고DWPD 중심 → 세 기술 포트폴리오로 확장)
sources:
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/samsung-kv-cache-activities-2026-09.md
  - sources/articles/qlc-v6-reliability-ppm-die-protection-2026-09.md
  - sources/articles/micron-anthropic-sca-2026-06-22.md
  - sources/articles/palantir-fde-model-2026-07.md
wiki:
  - wiki/concepts/high-dwpd-operating-point.md
  - wiki/concepts/mixed-media-ssd.md
  - wiki/concepts/high-capacity-fault-tolerance.md
  - wiki/concepts/ssd-die-reliability-ppm.md
  - wiki/concepts/ssd-configurability-boundary.md
  - wiki/scenarios/scenario-matrix.md
  - wiki/strategies/invariant/README.md
  - wiki/strategies/qlc-execution-strategy.md
last_updated: 2026-10-03
---

# 어떤 미래가 와도 대응하는 SSD 기술 전략: 고DWPD · Mixed Media · 고용량, 그리고 고객 공동 설계

> **문서 성격**: 2026-10-03 전략 방향 조정. 직전 [SSD 생존 전략](ssd-survival-strategy-report.md)은 KV 캐시 오프로딩이 만드는 고DWPD 수요를 중심에 두었다. 이 문서는 그것을 **여러 미래 가운데 하나**로 낮춘다. 개발실은 어느 시나리오에서도 쓸 수 있는 세 기술을 미리 준비하고, 그 효과가 고객 시스템과의 공동 설계에서 커진다는 점을 근거로 고객 협력 실행 전략으로 잇는다. 등급: ✅ 1차 원문 확인 · 🟡 2차 또는 검색 요약 · ⚠️ 파생 · 가정 · 과제팀 판단.

---

## 0. 요약

**슬라이드 세 장의 제목(제안)을 이어 읽으면 전략이 된다.**

> SSD의 다음 수요는 하나로 정해지지 않으며, 세 가지 신호가 서로 다른 기술을 요구합니다. 고DWPD · Mixed Media · 고용량을 미리 준비하면 어떤 미래에도 대응할 수 있고, 세 기술 모두 고객 시스템과 함께할 때 효과가 커집니다. 그래서 전략 고객과 계약 · 사람 · 역량으로 함께 설계하고, 신호에 따라 투자 비중을 조정합니다.

| 기술 | 이 기술이 필요해지는 미래 | SSD 안에서 할 수 있는 것 | 고객과 함께하면 | 대표 수치 |
|---|---|---|---|---|
| **고DWPD** | AI 추론의 KV 캐시 쓰기가 SSD로 크게 내려오는 미래 | SLC 모드 운용, OP, 출하 시 구성 | 데이터 수명 정보(FDP)로 WAF 3 → 1 | WAF 1이면 범용 TLC의 SLC 모드로 30 DWPD |
| **Mixed Media** | 고객이 기존 데이터센터 · 서버를 최대한 오래 쓰는 미래 | QLC 드라이브 안에 SLC · TLC 모드 영역, 영역별 마모 회계 | 호스트가 영역을 골라 쓰는 티어링 · 배치 | 24베이 서버에 추가 슬롯 0개로 pSLC 19.2TB(⚠️ 산술) |
| **고용량 + 결함 허용** | 랙 공간 · 전력이 귀해지는 미래 | 다이 패리티 · Fail-in-Place · 다이 텔레메트리 | 고장 LBA만 재구축, 용량을 줄이며 계속 운영, 보호 분담 | 245TB 재구축 21.5시간 → 고장 다이만 13분(⚠️ 산술) |

**한 줄 결론**: **실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다.** 세 기술 중 일부는 오지 않을 미래를 위한 준비지만, 어떤 미래가 와도 그 미래에 맞는 기술이 하나는 준비되어 있다. 그리고 그중 고DWPD는 SSD 안에서는 용량을 깎아야만 풀리고 데이터 수명은 고객 시스템만 알기 때문에, 실행 전략은 고객 협력이다.

> 2026-10-03 사용자 답변(아웃라인 v0.2)으로 논리가 조정됐다: Mixed Media는 확인된 pSLC까지만, Mixed Media · 고용량은 SSD 안에서 완결, 고DWPD를 고객 협력의 핵심으로. 본문(§1~§6)은 덱 제작 시 v1.1로 함께 고친다.

---

## 1. 왜 방향을 조정하나

### 1.1 KV 캐시 고DWPD는 중요하지만 부분이다

KV 캐시 오프로딩이 만드는 고DWPD 수요는 **커질 수도, 얼마 안 가 줄어들 수도 있다**. 양쪽 신호가 모두 있다.

| 커지는 신호 | 줄어드는 신호 |
|---|---|
| 2026년 AI 전용 고내구 SSD 잇단 출시: Kioxia GP1 최대 50 DWPD, DapuStor X5 최대 120 DWPD("KV 캐시 오프로딩"), Phison X202Z 60 DWPD 🟡 | KV 캐시 오프로드 트레이스는 **읽기 편중**(DeepSpeed · FlexGen), 삼성 기술 블로그도 "주로 읽기 집약적"(2026-08) 🟡 |
| 삼성 엔지니어가 LMCache에 NVMe FDP 배치를 머지(2026-08) ✅ | NVIDIA Dynamo는 **SSD 수명 보호를 위해** 재사용 빈도가 높은 블록만 디스크로 내린다(기본 활성) ✅ |
| 고객 요구 최대 30 DWPD `[사내 확인]` | DeepSeek V4.1-Flash는 KV 캐시용 **SSD 용량을 1/8**로 줄였다고 보도됨(2026-09) 🟡 |
| eSSD 수요 중 AI KV 캐시 350EB(2030, 과제팀 모델 ⚠️) | Dynamo KVBM은 v1.5에서 deprecate, "엔진 네이티브 오프로딩"으로 대체 ✅ · CXL 메모리 풀(CMM-D)이 KV 계층을 흡수할 가능성 🟡 |

**판단**: 고DWPD는 준비해야 할 기술이지만 **단일 베팅의 대상이 아니다**([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §3).

### 1.2 다운턴의 교훈: 수요를 하나만 보면 늦는다

HBM에서 배운 것은 **고객과 함께 수요를 읽지 못하면 첫 호황의 선두를 놓친다**는 것이었다(2022년 HBM 점유율 SK 50% · 삼성 40% → 2Q25 62% · 17%, [ssd-survival-strategy-report.md](ssd-survival-strategy-report.md) §1.1). 이번에는 다음 수요가 무엇이 될지 하나로 단정하지 않는다. **어느 미래가 와도 쓸 수 있는 기술을 미리 준비하고**, 신호를 보며 비중을 조정한다. 이는 위키의 불변전략(Robust Strategy) 원칙, 곧 "시나리오 A~E 모두에서 긍정적 가치를 만드는 전략"을 SSD 개발에 적용한 것이다([invariant/README.md](../../wiki/strategies/invariant/README.md)).

### 1.3 세 가지 신호, 세 가지 기술

| 신호 (불확실성) | 무엇을 지켜보나 | 준비할 기술 |
|---|---|---|
| **① AI 추론이 SSD에 얼마나 쓰는가** | KV 캐시 오프로딩의 쓰기 집약도, 모델의 KV 압축 | **고DWPD** |
| **② 고객이 기존 인프라를 얼마나 오래 쓰는가** | 서버 · 건물 내용연수, 기존 홀 개조, 스케일 아웃 | **Mixed Media** |
| **③ 랙 공간 · 전력이 얼마나 귀해지는가** | 데이터센터 건설 지연 · 규제, AI 랙 전력 밀도, 코로케이션 공실 | **고용량 + 결함 허용** |

**신호 ②의 근거**: 하이퍼스케일러는 범용 서버 내용연수를 5~6년으로 늘렸다(Microsoft 4 → 6년, 사유 "소프트웨어로 운영 효율" ✅ · Alphabet 4 → 6년 · Meta 5.5년 · Amazon 6년 🟡). Microsoft는 데이터센터 건물 내용연수를 **15 → 25년**으로 늘렸고(FY27 ✅), Google은 "세대를 넘어 인프라를 재사용하는 데이터센터"를 설계 원칙으로 공표하고 기존 공랭 홀에 랙 단위 액체냉각을 넣는 Brazos를 공급한다(✅). 스토리지는 이미 스케일 아웃이며, Google Colossus는 HDD와 SSD를 섞어 "필요한 만큼만 플래시를 산다"(✅) ([mixed-media-ssd.md](../../wiki/concepts/mixed-media-ssd.md) §1).

**신호 ③의 근거**: 2026년 미국 가동 예정 약 16GW 중 착공 확인은 약 5GW로 30~50%가 지연될 수 있다는 추정과, 모라토리엄으로 실제 지연된 것은 2.3GW라는 반론이 엇갈린다(🟡). 뉴욕주는 50MW 이상 신규 데이터센터 인허가를 1년 중단했다(2026-07 🟡). AI 랙 전력 밀도는 H100 공랭 약 40kW → GB300 NVL72 약 140kW(⚠️ 단일 출처) → 2027년 1MW급 랙 대비(NVIDIA 800VDC)로 오르고, 범용 랙 평균은 약 9~11kW다(🟡). 북미 1차 시장 코로케이션 공실률은 1.4%로 사상 최저다(🟡). Azure 실측에서 스토리지는 운영 배출의 33%를 차지한다(✅) ([high-capacity-fault-tolerance.md](../../wiki/concepts/high-capacity-fault-tolerance.md) §1).

### 1.4 시나리오별로 어느 기술이 먼저 쓰이나

위키의 시나리오 A~E(확률은 2026-09 정기 재평가 유지)에 세 기술을 대응시킨다(⚠️ 과제팀 판단).

| 시나리오 (확률) | 상황 | 고DWPD | Mixed Media | 고용량 |
|---|---|---|---|---|
| **B AI 르네상스** (39%) | AI 수요 지속 · 글로벌 성장 | ● 추론 확대 | ◐ 비용 효율 AI 스토리지 | ● 전력 · 공간 경합 |
| **A 황금 요새** (26%) | AI 지속 · 서방 진영 중심 증설 | ● | ◐ | ● 규제 · 전력 제약 |
| **D 조용한 재편** (21%) | AI 과열 조정 · 메모리 불황 | ○ | ● CapEx 절감 · 기존 인프라 최대 활용 | ◐ 가격 하락 시 채택 |
| **C 기술 냉전** (8%) | AI 붕괴 + 디커플링 | ○ | ● 비용 압박 | ◐ |
| **E 패러다임 전환** (6%) | CXL · PIM 등으로 메모리 구조 변화 | ○ KV 계층이 메모리로 이동 가능 | ● | ● |

(● 핵심 · ◐ 보조 · ○ 약함) **어떤 시나리오에서도 세 기술 중 최소 하나가 핵심**이다. 하나만 준비하면 그 기술이 약해지는 시나리오에서 비어 있게 된다.

---

## 2. 세 가지 기술

### 2.1 고DWPD: AI 추론의 쓰기를 받아 내는 기술

**정의**: 저용량 · 초고DWPD 운영점(설계점 2TB · 30 DWPD)을 범용 NAND로 만드는 기술. 새로운 것은 운영점 자체가 아니라(Micron XTR 1.92TB · 35 DWPD, 삼성 SZ985 30 DWPD가 이미 있다) **범용 NAND + 배치 정보로 거기에 닿고, 운영점을 고객이 고르게 한다**는 점이다([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md)).

| 층 | 내용 |
|---|---|
| SSD 안에서 | TLC의 SLC 모드 운용(6만 P/E급), OP 조정, 출하 시 구성 SKU(OP · SLC 비율 · RUH) |
| 고객과 함께 | **데이터 수명 정보(FDP)로 WAF 3 → 1**. 5년 30 DWPD 조건 `P/E × (원시/사용자) = 54,750 × WAF`에서 WAF 1이면 6만 P/E로 기본 OP만 두고 도달, WAF 3이면 10만 P/E로도 OP 64% 필요(⚠️ 파생) |
| 지금 위치 | LMCache에 FDP 배치 머지(삼성 Committer, ✅). Dynamo · Mooncake · FlexKV는 기여 0(✅) |
| 갭 | 프로덕션 KV 캐시 트레이스 기반 WAF 실측 미공개, 고객 스택 다수에 미진입 |

### 2.2 Mixed Media: 기존 인프라 안에서 빠른 영역과 큰 영역을 함께

**정의**: QLC로 출하하되 용량 일부를 SLC 또는 TLC 모드 영역으로 쓰게 한 드라이브. 고객은 캐시 · 고내구 드라이브를 따로 사지 않고 **기존 서버 슬롯 · 전력 · 냉각 안에서** 두 계층을 얻는다([mixed-media-ssd.md](../../wiki/concepts/mixed-media-ssd.md)).

| 층 | 내용 |
|---|---|
| SSD 안에서 | ① 매체 모드별 엔듀런스 그룹(EG) · NVM Set 구성, 비율은 **출하 시 구성** ② 다이 수준 격리와 영역 인지 스케줄링 ③ **영역별 마모 · 보증 회계**(EG별 Percentage Used · Endurance Estimate는 표준에 있음 ✅, 영역별 TBW 보증 선례는 없음) ④ **TLC 모드 영역**(공개 제품 없음 → 차별화 후보) ⑤ 메타데이터 · 쓰기 버퍼용 SLC 영역 |
| 고객과 함께 | 상용 혼합 매체는 **예외 없이 호스트 소프트웨어가 매체를 묶는다**(Solidigm CSAL = SPDK 호스트 FTL, Alibaba 상용 / Optane H10 = RST / VAST / Colossus L4 ✅·🟡). 공동 설계 과제: 고객 hot 데이터 비율에 맞는 SLC : QLC 비율, 보이지 않는 캐시가 아닌 **호스트가 주소를 지정하는 빠른 영역**, CSAL형 호스트 티어링 연동 |
| 선례 · 경쟁 | DapuStor J5060 dual-mode(pSLC 400GB~1.2TB, QLC의 6~20%, 발표), Kioxia Mixed Mode(SLC + QLC 네임스페이스, FMS 2025 · 2026 발표), Micron 4150AT 차량용(TLC / SLC 20× / HE-SLC 50× EG) 🟡. **삼성의 호스트 가시 pSLC 영역 제품은 공개 자료에서 찾지 못함** |
| 표준 갭 | FDP 배치 핸들에 **매체 속성 없음**, NVMe 2.3 CDP에 **매체 모드 퍼스낼리티 없음**(보안 · 잠금 · 초기화뿐) ✅ → 규격 제안 자리 |
| 경제성 | QLC → pSLC 실제 전환비 5 : 1(DapuStor). 24베이 서버에서 추가 슬롯 0개로 pSLC 19.2TB, 단품 SLC면 12~24슬롯 필요(⚠️ 산술). 단일 혼합 드라이브 대 별도 티어의 TCO 공개 수치는 없음 |
| 근거의 한계 | 하이퍼스케일러가 "인프라 재사용 때문에 단일 혼합 매체 드라이브를 원한다"고 말한 공개 기록은 없다. **그래서 고객과 가치를 함께 검증해야 하는 기술**이다 |

### 2.3 고용량 + 결함 허용: 같은 폼팩터에 더 많이, 그리고 다이 고장을 견디게

**정의**: 같은 폼팩터(E3.L · U.2 등)에 245TB → 512TB를 담는 기술과, 1,000~2,000개 다이 중 일부가 고장 나도 계속 쓰게 하는 결함 허용 기술([high-capacity-fault-tolerance.md](../../wiki/concepts/high-capacity-fault-tolerance.md)).

**왜 결함 허용이 화두인가**

| 용량 | 다이 수 | 드라이브 재구축(무부하 · 부하 중) | 다이 1개만 복구 |
|---|---|---|---|
| 61.44TB | 512 | 5.4시간 · 2.3일 | 해당 없음 |
| 245.76TB | 1,024 | **21.5시간 · 9일** | **13분** |
| 512TB | 약 2,133 | **44.7시간 · 18.8일** | 13분 |

(61.44TB 실측 xiRAID 5시간 22분 · 부하 중 316MB/s의 선형 확대 ⚠️) 다이 보호가 없으면 다이당 요구 고장률이 10~21ppm까지 내려가고, 단일 패리티로 245TB급은 충족 가능하지만 512TB급은 이중 패리티 · 여분 다이가 필요하다([ssd-die-reliability-ppm.md](../../wiki/concepts/ssd-die-reliability-ppm.md) §3·§4).

| 층 | 내용 |
|---|---|
| SSD 안에서 | 다이 단위 패리티(RAIN 1:15 · Kioxia Die Failure Protection), **Fail-in-Place**(삼성 PM1733: 512다이 중 1개 상실 허용 🟡), 512TB용 이중 패리티 · 여분 다이, OCP SMART 다이 필드(`total_media_dies` · `total_die_failure_tolerance` · `media_dies_offline` ✅), 컨트롤러 RAID 가속 |
| 고객과 함께 | ① **고장 LBA만 알려 주기**: NVMe Get LBA Status(0x86) · Rebuild Assist ✅ → 드라이브 재구축 대신 고장 다이 LBA만 호스트가 복구(21.5시간 → 13분). **Linux는 해당 경고를 켜지 않고 QEMU는 미구현** ✅ → 호스트 구현이 비어 있다 ② **용량을 줄이며 계속 운영**: SCSI HDD에는 디팝퓰레이션 명령이 있으나 **NVMe에는 없다** ✅. CVSS(FAST'24) 수명 268~327% 연장, SDC26 호스트 주도 용량 축소 + 클러스터 EC 제안 🟡 ③ **보호 분담**: 하이퍼스케일러는 이미 시스템 EC(Azure LRC 1.33배, Colossus 소프트웨어 RAID)를 쓴다 → 디바이스 패리티와 중복 조정 ④ 다이 오프라인 · 예비 소진 텔레메트리로 계획적 대피 |
| 로드맵 · 경쟁 | 245TB: Micron 출하(2026-05), Kioxia LC9 · SK하이닉스 PS1101. 512TB: 삼성(2027 계획) · Sandisk · DapuStor(FMS 2026 공개), Meta는 QLC를 512TB까지 계획 🟡. OCP v2.7에 "QLC High Capacity SSD improvements" 🟡 |
| 장애물 | 가격 · 공급(TrendForce: 비용과 공급망이 채택 장애, 고용량 납기 1년+ 🟡). 초고용량 TB당 프리미엄은 공개 지수로 확인되지 않음 |
| 근거의 강점 | Azure 연구가 "**오늘날 부분 고장은 전체 고장**", 스토리지 스택이 부분 고장을 견디도록 바뀌어야 한다고 명시(✅). 고객 쪽 문제의식이 이미 있다 |

> **재확인 필요**: 삼성 BM1773, PM1733 FIP의 "플레인 4GB · 다이 8GB" 감량 단위는 이번 조사에서 재확인되지 않았다. 이 보고서는 두 사실을 핵심 근거로 쓰지 않는다.

### 2.4 세 기술은 하나의 플랫폼을 공유한다

| 공통 요소 | 고DWPD | Mixed Media | 고용량 + 결함 허용 |
|---|---|---|---|
| **배치 정보(FDP · write stream)** | 수명별 분리로 WAF ↓ | hot 데이터를 빠른 영역으로 | 고장 영향 범위를 국소화 |
| **구성 가능성(출하 시 · 운영 중)** | OP · SLC 비율 · RUH | 영역 비율 · EG 구성 | 보호 수준(패리티 · 여분) · 용량 |
| **텔레메트리** | 실시간 WAF(FDP 통계) | 영역별 마모 | 다이 오프라인 · 예비 · 고장 LBA |
| **표준 제안** | FDP 런타임 재구성 | FDP 매체 속성 · CDP 매체 퍼스낼리티 | NVMe 용량 축소 · Linux LBA Status 경고 |

세 기술은 따로 개발할 제품이 아니라 **워크로드 구성형 SSD**([workload-configurable-ssd-report.md](workload-configurable-ssd-report.md)) 플랫폼 위의 세 가지 구성이다. 공통 기반을 한 번 만들면 미래가 어느 쪽으로 가도 비중만 바꾸면 된다.

### 2.5 세 기술의 공통점: SSD 안에서 시작하고, 고객과 함께 완성된다

| 기술 | SSD 혼자 낼 수 있는 효과 | 고객과 함께 낼 수 있는 효과 | 고객이 가진 정보 |
|---|---|---|---|
| 고DWPD | SLC 모드 · OP로 DWPD ↑(용량 · 비용 대가) | **WAF 3 → 1, 용량 손실 없이** | 데이터가 언제 지워지나(수명) |
| Mixed Media | 영역 제공 | **영역을 올바른 데이터에 씀** | 어떤 데이터가 hot인가(온도) |
| 고용량 + 결함 허용 | 다이 패리티 · FIP | **고장 다이만 재구축, 용량 줄이며 계속 운영** | 데이터가 어디에 중복돼 있나(중복 배치) |

**세 기술 모두 고객 시스템만 아는 정보가 있어야 최대 효과가 난다.** 이것이 실행 전략이 고객 협력, 곧 시스템 공동 설계로 넘어가는 이유다.

---

## 3. 실행 전략: 고객 협력 (시스템 공동 설계)

### 3.1 기술별 공동 설계 의제

| 기술 | 고객 쪽 상대 | 공동 설계 과제 | 규격 · 오픈소스 기여 |
|---|---|---|---|
| 고DWPD | KV 캐시 관리자(LMCache · Dynamo · Mooncake), 추론 엔진 | 테넌트 · 수명별 배치, KV 트레이스 기반 WAF 실측 공개 | LMCache 다음으로 Dynamo · Mooncake에 FDP 경로, NVMe FDP 런타임 재구성 |
| Mixed Media | 분산 스토리지 · 티어링 소프트웨어(CSAL류, Colossus · Tectonic류), 메타데이터 · 쓰기 버퍼 | 영역 비율 선정, 호스트 주소 지정 영역, 영역별 보증 | SPDK FTL(CSAL 핵심) 연동, FDP 매체 속성 · CDP 매체 퍼스낼리티 제안 |
| 고용량 + 결함 허용 | 분산 스토리지 EC 계층, 커널 블록 계층 | 고장 LBA 재구축, 용량 축소 운영, 디바이스 · 시스템 보호 분담 | Linux LBA Status 경고 활성 패치, NVMe 용량 축소(디팝퓰레이션) 명령 제안, OCP 다이 필드 활용 |

### 3.2 협력의 방식: 계약 · 사람 · 역량

직전 전략에서 승인된 세 축을 그대로 쓰되, 의제를 세 기술로 넓힌다([qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md)).

- **계약: 물량에 기술 협력을**. 장기 물량 계약(LTA) 위에 공동 설계 · 최적화와 운영 통합을 묶는다. 벤치마크는 Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략적 투자, 재무 조건 비공개 🟡). 계약은 세 기술 중 그 고객에게 맞는 의제(예: 추론 고객 = 고DWPD, 클라우드 스토리지 고객 = Mixed Media · 고용량)를 명시한다.
- **사람: 고객 안에 상주**. 스펙 문서와 간헐적 미팅을 넘어 Co-Design Pod(FDE)가 고객 데이터센터 안에서 **명시된 요구와 실제 요구의 간극**을 메운다. 벤치마크는 Palantir FDE(🟡). 세 기술 모두 "고객만 아는 정보(수명 · 온도 · 중복 배치)"가 필요하므로 상주가 가장 빠른 통로다.
- **역량: 시스템 SW와 AI 데이터센터 운영의 눈**. KV 캐시 관리자 · 분산 스토리지 · EC · 커널 블록 계층을 읽고 고칠 수 있는 시스템 소프트웨어 전문가, 고객의 지표(토큰당 비용 · 전력 · GPU 가동률 · 재구축 시간)로 말하는 사람. 출발점은 이미 있다(xNVMe 주 저자, SPDK 기여, LMCache Committer ✅).

### 3.3 포트폴리오 운영: 신호에 따라 비중을 조정한다

세 기술은 모두 **기반은 지금 만들고, 제품화 비중은 신호로 정한다**. 위키의 RS-9(데이터 기반 수요 변곡 센싱)를 SSD 기술 포트폴리오에 적용한다([rs9-demand-inflection-sensing.md](../../wiki/strategies/invariant/rs9-demand-inflection-sensing.md)).

| 기술 | 확대 신호 (비중 ↑) | 축소 신호 (비중 ↓) |
|---|---|---|
| 고DWPD | 고객 RFQ의 DWPD 요구 상승, SLC AI SSD 양산 채택, KV 캐시 SSD 쓰기 실측 증가 | 모델 KV 압축 확산(SSD 1/8 사례), 오프로드 정책의 쓰기 억제 강화, CXL 메모리가 KV 계층 흡수 |
| Mixed Media | 서버 · 건물 내용연수 연장 지속, 기존 홀 개조 발표, CapEx 절감, 고객 RFQ에 영역 요구 등장 | 신규 그린필드 캠퍼스 중심 증설, 직접 쓰기 QLC(SLC 버퍼 없음) 확산 |
| 고용량 + 결함 허용 | 데이터센터 지연 · 규제 확대, 코로케이션 공실 1%대 유지, AI 랙 전력 밀도 상승, 245TB 채택 확산 | 전력망 완화 · 건설 가속, 초고용량 가격 프리미엄 지속 |

### 3.4 단계와 첫 90일

| 단계 | 시기 | 무엇을 |
|---|---|---|
| 1 공통 기반 | 2026 하반기 ~ 2027 상반기 | FDP · 구성 가능성 · 텔레메트리 플랫폼, 세 기술의 출하 시 구성 SKU 시제(고DWPD SLC 모드 · Mixed Media 영역 · 고용량 보호 수준) |
| 2 고객별 공동 설계 | 2027 | 전략 고객 1~2사와 기술별 의제 착수(트레이스 · 영역 비율 · 고장 재구축), 오픈소스 · 커널 기여 |
| 3 규격과 플랫폼 | 2028~ | NVMe · OCP 제안 반영(FDP 매체 속성, 용량 축소, LBA Status), 워크로드 구성형 플랫폼으로 통합 |

**계약의 창**: 공급자 우위가 이어지는 2026년 4분기 ~ 2027년 상반기(2027년 하반기 공급 완화 전망 🟡) 안에 기술 협력을 계약에 담는다.

**첫 90일**: ① 세 기술의 공통 기반 범위 확정 ② 전략 고객 1~2사 선정과 기술별 의제 매칭 ③ Co-Design Pod 구성 ④ 시스템 SW 전문가 채용 착수 ⑤ 신호 대시보드(3.3) 가동.

### 3.5 성과 지표

| 축 | 지표 |
|---|---|
| 기술 준비도 | 세 기술의 출하 시 구성 SKU 시제 완료 여부, 공통 플랫폼 재사용률 |
| 공동 설계 | 기술별 공동 설계 의제를 가진 고객 수, 고객 시스템에서 활성화된 기능 용량(FDP · 영역 · LBA Status) |
| 생태계 | 업스트림 머지 건수(KV 캐시 관리자 · SPDK · 커널), 채택된 규격 제안 수 |

---

## 4. 리스크와 반론

| 리스크 · 반론 | 대응 |
|---|---|
| 세 기술을 다 하면 자원이 분산된다 | 공통 기반(2.4)에 먼저 투자하고, 제품화 비중은 신호(3.3)로 조정한다. 세 기술은 같은 플랫폼의 구성이다 |
| Mixed Media는 고객 수요가 공개적으로 확인되지 않았다 | 가설로 명시하고 공동 설계로 검증한다. 경쟁사(DapuStor · Kioxia)는 이미 발표 단계 |
| 고용량은 지금 비싸서 고객이 원하지 않는다 | 결함 허용과 공통 기반은 가격과 무관하게 필요하다. 채택 시점은 랙 공간 신호로 판단 |
| KV 캐시 고DWPD가 사라질 수 있다 | 그래서 단일 베팅에서 포트폴리오로 바꿨다. 고DWPD에서 만든 FDP · SLC 모드 기술은 Mixed Media의 빠른 영역으로 재사용된다 |
| 표준 제안이 받아들여지지 않을 수 있다 | 오픈소스(SPDK · 커널 · LMCache) 구현을 먼저 만들어 사실상의 표준을 만든다 |
| 데이터센터 지연 추정이 엇갈린다 | 범위로 쓰고, 단일 수치로 단정하지 않는다 |

---

## 5. 근거 대장

| # | 주장 | 등급 | 출처 |
|---|---|---|---|
| F-1 | KV 캐시 고DWPD의 양방향 신호(SLC AI SSD 출시 · 읽기 편중 · Dynamo 쓰기 필터 · DeepSeek SSD 1/8 · KVBM deprecate) | 🟡 / ✅ | [wcssd-v1](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md) §1 · §4 |
| F-2 | LMCache FDP 배치 머지 · 삼성 Committer, 나머지 3종 기여 0 | ✅ | [samsung-kv-cache-activities-2026-09.md](../../sources/articles/samsung-kv-cache-activities-2026-09.md) |
| F-3 | 30 DWPD 조건 `P/E × (원시/사용자) = 54,750 × WAF` | ⚠️ 파생 | [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §5 |
| F-4 | 서버 내용연수 연장(Microsoft 4 → 6년 등), 건물 15 → 25년 | ✅ / 🟡 | [ssd-mixed-media-infra-reuse-2026-10.md](../../sources/articles/ssd-mixed-media-infra-reuse-2026-10.md) IR-01~IR-09 |
| F-5 | Google fungible 데이터센터 원칙 · Brazos · Colossus 혼합 매체 | ✅ | 같은 원장 IR-15 · IR-16 · IR-30 |
| F-6 | 장치 수준 혼합 매체 선례(DapuStor · Kioxia · Micron 4150AT), 삼성 공개 제품 없음 | 🟡 | 같은 원장 §2-A · NG-02 |
| F-7 | 상용 혼합 매체는 모두 호스트 소프트웨어가 묶음(CSAL · H10 · VAST · Colossus) | ✅ / 🟡 | 같은 원장 CD-01 |
| F-8 | FDP RUH 매체 필드 없음, CDP 매체 퍼스낼리티 없음 | ✅ | 같은 원장 ST-12 · ST-14 |
| F-9 | 하이퍼스케일러의 단일 혼합 매체 요구 공개 기록 없음 | 부정 확인 | 같은 원장 NG-01 |
| F-10 | 데이터센터 지연 추정(30~50% vs 2.3GW), 뉴욕 인허가 중단, 코로케이션 공실 1.4% | 🟡 | [ssd-high-capacity-rackspace-fault-tolerance-2026-10.md](../../sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md) A1~A5 · A26 |
| F-11 | AI 랙 전력 밀도(40 → 140kW, 1MW급 대비), 범용 랙 9~11kW | 🟡 / ⚠️ | 같은 원장 A12~A16 |
| F-12 | Azure 스토리지 = 운영 배출 33% · 내재 61%, "부분 고장은 전체 고장" | ✅ | 같은 원장 A17 · D12 |
| F-13 | 245TB 출하(Micron) · 512TB 2027 로드맵(삼성 · Sandisk · DapuStor) | 🟡 | 같은 원장 B1~B7 |
| F-14 | 재구축 시간(61TB 실측 → 245TB 21.5시간 · 다이 13분) | 🟡 / ⚠️ 파생 | 같은 원장 E1 · §5-2 |
| F-15 | Get LBA Status · OCP 다이 필드 · Linux 경고 미활성 · NVMe 용량 축소 명령 부재 | ✅ | 같은 원장 C1 · D1~D9 |
| F-16 | 다이 수 · 패리티 요구 모델 | ⚠️ 모델 | [ssd-die-reliability-ppm.md](../../wiki/concepts/ssd-die-reliability-ppm.md) |
| F-17 | 시나리오 확률 A26 · B39 · C8 · D21 · E6 | 위키 | [scenario-matrix.md](../../wiki/scenarios/scenario-matrix.md) |
| F-18 | Micron ↔ Anthropic 계약 4요소 · Palantir FDE | 🟡 | [micron-anthropic-sca](../../sources/articles/micron-anthropic-sca-2026-06-22.md) · [palantir-fde](../../sources/articles/palantir-fde-model-2026-07.md) |

---

## 6. 슬라이드 3장 아웃라인 (제안 · 승인 대기)

상세는 [ssd-future-ready-strategy-outline.md](../presentation/ssd-future-ready-strategy-outline.md).

| 장 | 제목(액션 타이틀) | 시각 |
|---|---|---|
| 1 배경 | SSD의 다음 수요는 하나로 정해지지 않으며, 세 가지 신호가 서로 다른 기술을 요구합니다 | 세 신호 패널(① 저울: KV 캐시 쓰기 ↑ · ↓ 신호 ② 하이퍼스케일러 서버 · 건물 내용연수 막대 + 로고 ③ 랙 전력 밀도 막대 + 건설 지연) → 각 패널 끝에 기술 칩. 하단 밴드 "어느 하나에 걸지 않고 셋을 미리 준비한다" |
| 2 솔루션 | 고DWPD · Mixed Media · 고용량을 미리 준비하면 어떤 미래에도 대응할 수 있고, 세 기술 모두 고객 시스템과 함께할 때 효과가 커집니다 | 세 기술 열(부품 이미지) × 두 층("SSD 안에서" 그레이 / "고객과 함께" Blue + 대표 수치) + 시나리오 칩. 하단 공통 플랫폼 막대(배치 · 구성 · 텔레메트리) |
| 3 실행 | 세 기술의 시너지는 시스템 공동 설계에서 나오므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계하고 신호에 따라 비중을 조정합니다 | 상단: 기술별 공동 설계 의제 줄(고객 쪽 소프트웨어 로고 · 규격 제안) / 가운데: 계약 · 사람 · 역량(승인된 v1.3 그림 축소) / 하단: 신호 게이트 + 90일 밴드 |
