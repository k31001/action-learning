---
type: report
status: v1.1 (2026-10-03). 사용자 답변 반영(톤 조정 · 보안 제외 · GPU 직결 고IOPS 기술 옵션 추가 · 초고DWPD 운영점 · NAND → SSD → 고객 시스템 장). 덱 4장 v1.0 제작 완료(2026-10-03)
deck: outputs/presentation/ssd-future-ready-strategy.pptx (v1.0, 생성기 scripts/generate_ssd_future_ready_pptx.py)
outline: outputs/presentation/ssd-future-ready-strategy-outline.md (제안 v0.3)
supersedes_focus: outputs/report/ssd-survival-strategy-report.md (KV 캐시 고DWPD 중심 → 지금 보이는 신호별 준비 + 고객 협력 과제)
sources:
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md
  - sources/articles/ssd-future-candidate-gpu-direct-iops-2026-10.md
  - sources/articles/ssd-scada-market-technical-review-2026-10.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/samsung-kv-cache-activities-2026-09.md
  - sources/articles/component-to-system-solution-ladder-facts-2026-09.md
  - sources/articles/micron-anthropic-sca-2026-06-22.md
  - sources/articles/palantir-fde-model-2026-07.md
wiki:
  - wiki/concepts/high-dwpd-operating-point.md
  - wiki/concepts/mixed-media-ssd.md
  - wiki/concepts/high-capacity-fault-tolerance.md
  - wiki/concepts/ssd-future-solution-candidates.md
  - wiki/concepts/solution-ladder-component-to-system.md
  - wiki/entities/nvidia-cmx-scada.md
  - wiki/scenarios/scenario-matrix.md
  - wiki/strategies/invariant/README.md
  - wiki/strategies/qlc-execution-strategy.md
last_updated: 2026-10-03
---

# 불확실성이 높은 미래에 대응하기 위한 고객 협력 전략

**지금 보이는 신호에 맞춘 SSD 기술 준비와, 새로 나타난 고객 협력 과제**

> **문서 성격**: 2026-10-03 전략 방향 조정. 직전 [SSD 생존 전략](ssd-survival-strategy-report.md)은 KV 캐시 오프로딩이 만드는 고DWPD 수요를 중심에 두었다. 이 문서는 그것을 **지금 보이는 여러 신호 가운데 하나**로 낮춘다.
>
> **이 문서가 주장하지 않는 것**: 여기서 제안하는 기술만 준비하면 모든 미래에 대비할 수 있다고 말하지 않는다. 미래는 우리가 그린 시나리오 밖에서도 올 수 있다. 이 문서는 **지금 예측할 수 있는 범위**, 곧 위키의 시나리오 A~E와 지금 관측되는 신호 안에서 최선을 다해 준비하고, 신호가 바뀌면 판단을 고치겠다는 제안이다.
>
> 등급: ✅ 1차 원문 확인 · 🟡 2차 또는 검색 요약 · ⚠️ 파생 · 가정 · 과제팀 판단 · `[사내 확인]` 사내 데이터로 확인할 항목.

---

## 0. 요약

**슬라이드 네 장의 제목(제안)을 이어 읽으면 전략이 된다.**

> SSD의 다음 수요는 하나로 정해지지 않으며, 지금 보이는 신호들은 서로 다른 기술을 요구합니다. SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다. 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다. 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다.

| 묶음 | 기술 | 이 기술이 쓰이는 미래 | 지금 위치 | 대표 수치 |
|---|---|---|---|---|
| **SSD 안에서 지금처럼** | Mixed Media (QLC + pSLC 영역) | 고객이 기존 데이터센터 · 서버를 오래 쓰는 미래 | 경쟁사 발표 단계, 표준 그릇은 있음 | 24베이 서버에 추가 슬롯 0개로 pSLC 19.2TB(⚠️ 산술) |
| | 고용량 + 결함 허용 | 랙 공간 · 전력이 귀해지는 미래 | 245TB 출하 경쟁, 512TB 2027 로드맵 | 다이 1,024 → 약 2,133개: 단일 → 이중 패리티(⚠️ 모델) |
| **고객 시스템과 함께 (새로 나타남)** | 고DWPD: 용량형 + **초고DWPD(2TB · 30 DWPD)** | AI 추론의 쓰기가 SSD로 내려오는 미래 | LMCache FDP 머지(✅), 나머지 KV 관리자 기여 0 | 2TB · 30 DWPD · 5년: SSD 단독 약 120다이 → 고객과 함께 약 47다이(⚠️ 산술) |
| | GPU 직결 고IOPS (**기술 옵션**) | GPU가 512B 단위로 SSD를 직접 읽는 미래 | PM1763 SCADA 백서(🟡) · aisio 실측(✅), SLC급 로드맵 공백 | 드라이브 1억 IOPS = PCIe Gen7 x4 링크 한도(⚠️ 산술) |

**한 줄 결론**: **실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다.** 지금 보이는 신호마다 준비하되, SSD 안에서 풀 수 있는 것은 지금처럼 잘하고, **새로 나타난 고객 협력 과제(고DWPD · GPU 직결)는 지금까지와 다른 방식으로 전략적으로 실행**해야 한다.

---

## 1. 왜 방향을 조정하나

### 1.1 KV 캐시 고DWPD는 중요하지만 부분이다

KV 캐시 오프로딩이 만드는 고DWPD 수요는 **커질 수도, 얼마 안 가 줄어들 수도 있다**. 양쪽 신호가 모두 있다.

| 커지는 신호 | 줄어드는 신호 |
|---|---|
| 2026년 AI 전용 고내구 SSD 잇단 출시: Kioxia GP1 최대 50 DWPD, DapuStor X5 최대 120 DWPD("KV 캐시 오프로딩"), Phison X202Z 60 DWPD 🟡 | KV 캐시 오프로드 트레이스는 **읽기 편중**(DeepSpeed · FlexGen), 삼성 기술 블로그도 "주로 읽기 집약적"(2026-08) 🟡 |
| 삼성 엔지니어가 LMCache에 NVMe FDP 배치를 머지(2026-08) ✅ | NVIDIA Dynamo는 **SSD 수명 보호를 위해** 재사용 빈도가 높은 블록만 디스크로 내린다(기본 활성) ✅ |
| 고객 요구 최대 30 DWPD `[사내 확인]` | DeepSeek V4.1-Flash는 KV 캐시용 **SSD 용량을 1/8**로 줄였다고 보도됨(2026-09) 🟡 |
| eSSD 수요 중 AI KV 캐시 350EB(2030, 과제팀 모델 ⚠️) | Dynamo KVBM은 v1.5에서 deprecate ✅ · CXL 메모리 풀이 KV 계층을 흡수할 가능성 🟡 |

**판단**: 고DWPD는 준비해야 할 기술이지만 **단일 베팅의 대상이 아니다**([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §3).

### 1.2 다운턴의 교훈: 수요를 하나만 보면 늦는다

HBM에서 배운 것은 **고객과 함께 수요를 읽지 못하면 첫 호황의 선두를 놓친다**는 것이었다(2022년 HBM 점유율 SK 50% · 삼성 40% → 2Q25 62% · 17%, [ssd-survival-strategy-report.md](ssd-survival-strategy-report.md) §1.1). 이번에는 다음 수요가 무엇이 될지 하나로 단정하지 않는다. **지금 보이는 신호마다 준비하고**, 신호를 보며 비중을 조정한다. 위키의 불변 전략(Robust Strategy) 원칙, 곧 "시나리오 A~E 모두에서 긍정적 가치를 만드는 전략"을 SSD 개발에 적용한 것이다([invariant/README.md](../../wiki/strategies/invariant/README.md)).

### 1.3 지금 보이는 신호와 준비할 기술

| 신호 (불확실성) | 무엇을 지켜보나 | 준비할 기술 |
|---|---|---|
| **① AI 추론이 SSD를 어떻게 쓰는가** | KV 캐시 오프로딩의 쓰기 집약도 · 2TB급 초고DWPD 요구, GPU의 512B 직접 읽기(Storage-Next) | **고DWPD**(용량형 · 초고DWPD), **GPU 직결 고IOPS** |
| **② 고객이 기존 인프라를 얼마나 오래 쓰는가** | 서버 · 건물 내용연수, 기존 홀 개조, 스케일 아웃 | **Mixed Media** |
| **③ 랙 공간 · 전력이 얼마나 귀해지는가** | 데이터센터 건설 지연 · 규제, AI 랙 전력 밀도, 코로케이션 공실 | **고용량 + 결함 허용** |

**신호 ①의 GPU 직결 근거**: NVIDIA Storage-Next가 2026-08 FMS에서 40곳 이상의 업계 이니셔티브로 공식 출범했고, 목표는 "전력 · 꼬리 지연 제약 아래 **GPU당 512B IOPS 최대화**"다(🟡). 파트너들은 GPU당 약 2억 IOPS(SSD 2~4개 × 개당 5천만~1억)를 목표로 제시했다(Kioxia FMS 2025 · Smart IOPS 2026-08 🟡). 공개 근거 워크로드는 GNN · 그래프 분석 · 추천 · 벡터 검색이며(BaM · GIDS ✅), KV 캐시 오프로드는 대블록 중심이라 **고DWPD와는 다른 수요 원천**이다([ssd-future-candidate-gpu-direct-iops-2026-10.md](../../sources/articles/ssd-future-candidate-gpu-direct-iops-2026-10.md) GD-03 · GD-04 · GW-20).

**신호 ②의 근거**: 하이퍼스케일러는 범용 서버 내용연수를 5~6년으로 늘렸다(Microsoft 4 → 6년 ✅ · Alphabet 4 → 6년 · Meta 5.5년 · Amazon 6년 🟡). Microsoft는 데이터센터 건물 내용연수를 **15 → 25년**으로 늘렸고(FY27 ✅), Google은 "세대를 넘어 인프라를 재사용하는 데이터센터"를 설계 원칙으로 공표했다(✅) ([mixed-media-ssd.md](../../wiki/concepts/mixed-media-ssd.md) §1).

**신호 ③의 근거**: 2026년 미국 가동 예정 약 16GW 중 착공 확인은 약 5GW로 30~50%가 지연될 수 있다는 추정과, 모라토리엄으로 실제 지연된 것은 2.3GW라는 반론이 엇갈린다(🟡). AI 랙 전력 밀도는 H100 공랭 약 40kW → GB300 NVL72 약 140kW(⚠️ 단일 출처) → 2027년 1MW급 대비로 오르고, Google은 "IT 랙 전체를 xPU에 쓰게" 전원 부품을 랙 밖으로 빼는 설계를 표준화하고 있다(✅) ([high-capacity-fault-tolerance.md](../../wiki/concepts/high-capacity-fault-tolerance.md) §1).

### 1.4 시나리오 안에서의 대응 (⚠️ 과제팀 판단)

| 시나리오 (확률) | 상황 | 고DWPD | GPU 직결 | Mixed Media | 고용량 |
|---|---|---|---|---|---|
| **B AI 르네상스** (39%) | AI 수요 지속 · 글로벌 성장 | ● | ● | ◐ | ● |
| **A 황금 요새** (26%) | AI 지속 · 서방 진영 중심 증설 | ● | ● | ◐ | ● |
| **D 조용한 재편** (21%) | AI 과열 조정 · 메모리 불황 | ○ | ○ | ● | ◐ |
| **C 기술 냉전** (8%) | AI 붕괴 + 디커플링 | ○ | ○ | ● | ◐ |
| **E 패러다임 전환** (6%) | CXL · PIM 등으로 메모리 구조 변화 | ○ | ◐ | ● | ● |

(● 핵심 · ◐ 보조 · ○ 약함) 지금 그린 다섯 시나리오 안에서는 어느 경우에도 핵심이 되는 기술이 하나 이상 있다. **이것은 "모든 미래에 대비했다"는 뜻이 아니다.** 시나리오 밖의 변화(예: 모델 구조가 SSD를 거의 쓰지 않게 바뀌는 경우)는 §4.4의 신호 센싱으로 일찍 알아채고 판단을 고치는 것으로 대응한다.

---

## 2. 솔루션: SSD 안에서 풀 것과 고객 시스템과 함께 풀 것

### 2.1 두 묶음으로 나누는 기준

| 기준 | SSD 안에서 지금처럼 | 고객 시스템과 함께 (새로 나타남) |
|---|---|---|
| 요구는 어디서 정의되나 | 규격 · 사양으로 정의되고 SSD가 구현해 낸다 | **고객 소프트웨어 안에서** 정의된다: 데이터가 언제 지워지는지(KV 캐시 관리자), GPU가 어떤 단위로 무엇을 다시 읽는지(CUDA · SCADA · 애플리케이션 캐시) |
| SSD 혼자 하면 | 충분한 효과가 난다 | 용량 · 다이를 크게 희생하거나(고DWPD), 시스템 병목 일부만 푼다(GPU 직결) |
| 지금 위치 | 기존 개발 방식으로 경쟁 중 | 고객 코드 안의 접점이 이제 막 생기고 있다 |
| 필요한 접근 | 지금 방식으로 잘하면 된다 | **지금까지와 다른 방식**이 필요하다(§4) |

보안 · 신뢰(OCP L.O.C.K. 공저, PQC 대응 등)는 중요성이 이미 잘 인식돼 있고 삼성이 잘하고 있는 영역이라 이 문서에서 따로 다루지 않는다. 전력 · 냉각(콜드플레이트 폼팩터 · NVMe 2.3 전력 한도 · 측정)은 독립 솔루션이 아니라 고용량 · AI 제품의 요건으로 흡수한다([ssd-future-solution-candidates.md](../../wiki/concepts/ssd-future-solution-candidates.md)).

### 2.2 SSD 안에서 지금처럼: Mixed Media (pSLC)

**정의**: QLC로 출하하되 용량 일부를 **pSLC 영역**으로 쓰게 한 드라이브. 고객은 캐시 · 고내구 드라이브를 따로 사지 않고 **기존 서버 슬롯 · 전력 · 냉각 안에서** 두 계층을 얻는다([mixed-media-ssd.md](../../wiki/concepts/mixed-media-ssd.md)). 공개 선례가 확인된 pSLC 영역까지만 다룬다.

| 층 | 내용 |
|---|---|
| SSD 안에서 | ① 매체 모드별 엔듀런스 그룹(EG) · NVM Set 구성, 비율은 **출하 시 구성** ② 다이 수준 격리와 영역 인지 스케줄링 ③ **영역별 마모 · 보증 회계**(EG별 Percentage Used · Endurance Estimate는 표준에 있음 ✅, 영역별 TBW 보증 선례는 없음) ④ 메타데이터 · 쓰기 버퍼용 pSLC 영역 |
| 고객은 | 별도 네임스페이스로 노출된 빠른 영역을 **기존 소프트웨어 그대로** 쓴다. 고객 계층 배치 소프트웨어(CSAL류)와 연동하면 효과가 더 커진다(선택) |
| 선례 · 경쟁 | DapuStor J5060 dual-mode(pSLC 400GB~1.2TB, QLC의 6~20%), Kioxia Mixed Mode(SLC + QLC 네임스페이스) 🟡. **삼성의 호스트 가시 pSLC 영역 제품은 공개 자료에서 찾지 못함** |
| 경제성 | QLC → pSLC 실제 전환비 5 : 1(DapuStor). 24베이 서버에서 추가 슬롯 0개로 pSLC 19.2TB, 단품 SLC면 12~24슬롯 필요(⚠️ 산술) |
| 근거의 한계 | 하이퍼스케일러가 "인프라 재사용 때문에 단일 혼합 매체 드라이브를 원한다"고 말한 공개 기록은 없다. 고객과 가치를 확인하며 준비한다 |

### 2.3 SSD 안에서 지금처럼: 고용량 + 결함 허용

**정의**: 같은 폼팩터(E3.L · U.2 등)에 245TB → 512TB를 담는 기술과, 1,000~2,000개 다이 중 일부가 고장 나도 계속 쓰게 하는 결함 허용 기술([high-capacity-fault-tolerance.md](../../wiki/concepts/high-capacity-fault-tolerance.md)).

| 용량 | 다이 수 | 드라이브 재구축(무부하 · 부하 중) | 다이 1개만 복구 |
|---|---|---|---|
| 61.44TB | 512 | 5.4시간 · 2.3일 | 해당 없음 |
| 245.76TB | 1,024 | **21.5시간 · 9일** | **13분** |
| 512TB | 약 2,133 | **44.7시간 · 18.8일** | 13분 |

(61.44TB 실측의 선형 확대 ⚠️) 다이 보호가 없으면 다이당 요구 고장률이 10~21ppm까지 내려가고, 단일 패리티로 245TB급은 충족 가능하지만 512TB급은 이중 패리티 · 여분 다이가 필요하다([ssd-die-reliability-ppm.md](../../wiki/concepts/ssd-die-reliability-ppm.md) §3 · §4).

| 층 | 내용 |
|---|---|
| SSD 안에서 | 다이 단위 패리티(RAIN · Die Failure Protection), **Fail-in-Place**, 512TB용 이중 패리티 · 여분 다이, OCP SMART 다이 필드(`total_media_dies` · `total_die_failure_tolerance` · `media_dies_offline` ✅), 컨트롤러 RAID 가속. 제품 요건: 콜드플레이트 폼팩터 대응, NVMe 2.3 전력 한도 · 측정(nvme-cli 구현, 커널 미지원 ✅) |
| 고객과 하면 더 커지는 것(선택) | 고장 LBA만 알려 주기(NVMe Get LBA Status · Rebuild Assist ✅, Linux 경고 미활성 ✅) → 21.5시간 → 13분, 용량을 줄이며 계속 운영(NVMe에는 용량 축소 명령 없음 ✅) |
| 로드맵 · 경쟁 | 245TB: Micron 출하(2026-05), Kioxia LC9 · SK하이닉스 PS1101. 512TB: 삼성(2027 계획) · Sandisk · DapuStor 🟡 |
| 근거의 강점 | Azure 연구가 "**오늘날 부분 고장은 전체 고장**"이라고 명시(✅) |

> **재확인 필요**: 삼성 BM1773, PM1733 FIP의 "플레인 4GB · 다이 8GB" 감량 단위는 이번 조사에서 재확인되지 않았다. 이 보고서는 두 사실을 핵심 근거로 쓰지 않는다.

### 2.4 고객 시스템과 함께: 고DWPD (용량형 + 초고DWPD)

**정의**: 용량과 DWPD의 곱(하루 쓰기 예산)을 범용 NAND로 원하는 운영점에 놓는 기술. `용량 × DWPD = P/E × 원시 용량 ÷ (WAF × 보증 일수)`에서 **셀 모드(TLC · MLC · SLC)가 P/E를, OP가 원시 용량을, 고객의 데이터 배치가 WAF를 정한다**([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §4). 하나의 기술에 두 운영점이 있다.

| 운영점 | 무엇 | 지금 신호 |
|---|---|---|
| **용량형 고DWPD** | 수십 TB급 TLC · QLC를 FDP로 1~3 DWPD 이상에 올려 KV 캐시 계층에 쓴다 | LMCache FDP 머지 ✅, ScaleFlux "유효 7~10 DWPD"(벤더 주장 🟡) |
| **초고DWPD (2TB · 30 DWPD)** | 작업 집합이 작고 교체가 잦은 캐시 계층용 소용량 고내구 | 새 제품군 신호 `[사내 확인]`. 공개 자료로는 2TB · 30 DWPD "KV 캐시 SSD"가 아직 없고, 2026년 50 DWPD 이상 AI SSD는 모두 SLC급이거나 매체 비공개이며 **DWPD보다 IOPS · 지연을 앞세운다**. 단일 드라이브 보증은 모두 5년 🟡 ([ssd-ultra-high-dwpd-mlc-mode-2026-10.md](../../sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md) UD-01~UD-13) |

**초고DWPD의 경제성 (2TB · 30 DWPD · 5년, 1Tb TLC 다이 환산, ⚠️ 파생 · 이론 비트/셀 비, 같은 원장 §3)**

| 구성 | WAF | 필요 OP | 다이 수 | 누가 정하나 |
|---|---|---|---|---|
| SLC 모드(6만 P/E), SSD 단독 | 3 | 174% | **약 120** | SSD |
| SLC 모드(6만 P/E), 고객 배치 정보(FDP) | 1 | 최소 7% | **약 47** | 고객과 함께 |
| MLC 모드(P/E 3만 가정), FDP | 1 | 82% | 약 40 | 고객과 함께 + 사내 P/E |
| MLC 모드(P/E 4만 가정), FDP | 1 | 37% | 약 30 | 고객과 함께 + 사내 P/E |
| MLC 모드(P/E 1만, 공개 산업용 수준), FDP | 1 | 447% | 약 120 | 불리 |

- **가장 큰 이익 지렛대는 고객의 배치 정보(WAF 3 → 1)다**: SLC 모드 그대로도 다이가 약 120 → 47개로 약 60% 준다. 이 지렛대는 SSD 혼자 당길 수 없다. 2014~2019년 SSD 단독 워크로드 최적화(Multi-stream · 핫/콜드 분리)는 실제 워크로드에서 WAF를 약 3에서 내리지 못했다([solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md) §2.5).
- **MLC 모드 + OP 소폭 + FDP는 조건부 추가 이익이다**: FDP 위에서 MLC 모드가 SLC 모드보다 다이를 덜 쓰려면 MLC 모드 P/E가 **약 2.6만 이상(5년 보증)** 또는 약 1.5만 이상(3년)이어야 한다. "OP를 살짝 늘리는" 수준(OP 40% 이하)이 되려면 5년 기준 약 4만 이상이 필요하다. 공개 근거는 산업용 TLC의 MLC 모드 1만(🟡), 평면 시대 엔터프라이즈 MLC 2~3만(🟡)뿐이고 **3D TLC의 MLC 모드 엔터프라이즈 P/E는 공개 자료가 없다** → `[사내 확인]`.
- **주의할 점**: 50 DWPD 이상 구매자는 지연을 중시하는데 MLC 모드는 SLC 모드보다 읽기 지연(tR)이 길다. 네이티브 MLC 공급은 줄고 있다(2026 생산능력 -41.7% 전망 🟡). MLC 모드는 SLC를 대체하기보다 **5~20 DWPD 중간 운영점**에서 더 자연스럽다(같은 원장 §3 표).

**초고DWPD를 따로 떼지 않고 고DWPD 안의 운영점으로 두는 이유 (⚠️ 과제팀 판단)**: ① 물리(같은 산식) · 지렛대(셀 모드 · OP · WAF) · 고객 소프트웨어(KV 캐시 관리자)가 같아서 따로 떼면 공동 설계 의제가 겹친다. ② 2TB · 30 DWPD라는 점 자체는 2018년(SZ985) · 2023년(Micron XTR 1.92TB)부터 있었고, 새로운 것은 겨냥하는 계층과 만드는 방법이다([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §2). ③ 공개 신호가 아직 약해 독립 축으로 세우면 확실성을 과장하게 된다. 단, **사내에서 2TB · 30 DWPD 고객 요구가 확인되고 MLC 모드 P/E가 약 2.6만 이상으로 확인되면** 독립 제품 과제로 올린다(§4.4 신호 게이트).

| 층 | 내용 |
|---|---|
| SSD 안에서 | 셀 모드(TLC · MLC · SLC) 운용, OP 조정, 출하 시 구성 SKU(OP · 모드 비율 · RUH) |
| 고객과 함께 | **데이터 수명 정보(FDP)로 WAF 3 → 1**. 테넌트 · 수명별 배치, KV 트레이스 기반 WAF 실측 |
| 지금 위치 | LMCache에 FDP 배치 머지(삼성 Committer, ✅). Dynamo · Mooncake · FlexKV는 기여 0(✅) |
| 갭 | 프로덕션 KV 캐시 트레이스 기반 WAF 실측 미공개, 고내구 드라이브 중 FDP 지원을 명시한 제품 없음 🟡 |

### 2.5 고객 시스템과 함께: GPU 직결 고IOPS (기술 옵션)

**정의**: GPU가 CPU를 거치지 않고 512B 단위로 SSD를 직접 읽는 접근(NVIDIA Storage-Next · SCADA)에 맞는 SSD 기술. **지금은 베팅하지 않고, 준비에 시간이 오래 걸리는 기반 기술만 먼저 만든다.**

**왜 베팅이 아니라 옵션인가 (불확실성)**

| 항목 | 지금 아는 것 |
|---|---|
| 시장 규모 | **512B 고IOPS 세그먼트를 따로 집계한 공개 추정이 없다**(Gartner · IDC · Yole · TrendForce 등 🟡). 위키에 있던 "SCADA $36B → $322B"는 MarketsAndMarkets "AI-Powered Storage"(HDD · NAS/SAN · 소프트웨어 포함) 수치를 잘못 붙인 것이라 정정했다 🟡 ([ssd-scada-market-technical-review-2026-10.md](../../sources/articles/ssd-scada-market-technical-review-2026-10.md) SR-01 · SR-06) |
| 요구 사양 | NVIDIA의 SSD 요구 사양은 공개되지 않았다. cuFile 오픈소스(xio-sig) 코드는 2026-10-03 현재 미공개다 ✅ (GD-07) |
| 실배치 | 프로덕션 SCADA 배치는 확인되지 않았다(SR 원장 부정 확인) |
| 일정 | Kioxia 1억 IOPS는 PCIe 7.0 일정으로 2028로 순연 🟡, PCIe 7.0 첫 통합 목록은 2028 예상 🟡 |
| 반대 근거 | 삼성 aisio 문서는 SCADA 이득의 주원천을 I/O 속도보다 **GPU HBM 캐시 적중**으로 본다 ✅. 서버 합산 2~3억 IOPS는 이미 TLC 드라이브 다수로 달성 🟡 → SLC급 전용 매체의 가치는 GPU당 드라이브 수를 줄이는 데 있다 |
| 공급 측 경고 | 초고 IOPS 전용 AI SSD는 NAND 웨이퍼를 일반 제품의 3배 소모, 2028 양산 시 공급을 조일 것(Morgan Stanley 🟡, SR-09) |

**왜 지금 기술은 준비해야 하나 (기술 검토, ⚠️ 파생 산술, SR 원장 §4)**

512B 랜덤 읽기의 상한은 세 곳에서 차례로 걸린다.

| 순서 | 병목 | 산식 | 수치 | 준비할 기술 |
|---|---|---|---|---|
| 1 | **매체** | 다이 수 × 플레인 ÷ tR | 2TB TLC 약 1.3~2.3M, 2TB pSLC 약 9~14M | 소용량에서는 저지연 매체 모드(pSLC tR 단축, Z-NAND 경험 활용) |
| 2 | **NAND 채널 전송** | 채널 수 ÷ (명령 시간 + 전송량 ÷ 채널 속도) | 16채널 · 3.6GB/s · 4KB 전송이면 약 12M(GP1 10M과 같은 대역), 1KB면 약 37~44M | **512B 읽기 경로**: 작은 ECC 코드워드 · 부분 전송, 빠른 명령 신호 |
| 3 | **PCIe 링크** | 링크 대역 ÷ IO당 바이트(약 592B) | Gen5 x4 약 25M · Gen6 x4 약 50M · **Gen7 x4 약 100M** | Gen7 일정에 맞춘 컨트롤러 |
| 4 | 컨트롤러 · GPU | 1억 IOPS = 명령당 10ns | 삼성 aisio에서 GPU 폴링이 H100 SM의 **26.8%** 점유 ✅ (SR-68) | 명령 처리 하드웨어화, **GPU 쪽 완료 처리 부담을 줄이는 공동 설계** |

- 코드워드 · 채널 · 명령 처리 구조는 컨트롤러 세대 단위로 바뀌므로 **신호가 확인된 뒤 시작하면 한 세대(2~3년) 늦는다**. 1억 IOPS 드라이브가 Gen7(2028)에 묶인다는 산술은 반대로 **지금부터 2028 전까지가 기반 기술을 준비할 창**이라는 뜻이다.
- 넷째 병목(GPU 쪽 비용)은 SSD 혼자 풀 수 없다. 완료 통지 방식, GPU 캐시 정책, 큐 구성은 NVIDIA · 애플리케이션과 함께 정해야 한다. NVMe TPAR 4217(GPU 직결 접근의 LBA 범위 접근 제어)도 진행 중이다 🟡 (SR-35).

| 층 | 내용 |
|---|---|
| SSD 안에서(기반, 지금) | 512B 읽기 경로(코드워드 · 부분 전송), 명령 처리 하드웨어화 · 다수 큐, 저지연 매체 모드 |
| 고객과 함께 | GPU 완료 처리 · 캐시 정책 공동 설계(aisio 연장), xio-sig 적합성 · NVMe TPAR 4217 참여 |
| 지금 위치 | PM1763 SCADA 백서(512B 드라이브당 약 692만 IOPS 🟡), `xnvme/aisio` 실측(PM1753 16개 6,170만 IOPS ✅). 공백은 **SLC급 초고 IOPS 제품 로드맵** |
| 제품 결정 | 신호 게이트(§4.4)로: NVIDIA 요구 사양 공개, 첫 프로덕션 배치, Gen7 통합 일정, 고객 RFQ의 512B IOPS 요구 |

### 2.6 공통 기반

| 공통 요소 | 고DWPD | GPU 직결 | Mixed Media | 고용량 |
|---|---|---|---|---|
| **배치 · 접근 정보** | 수명별 분리(FDP)로 WAF ↓ | 512B 접근 패턴 · GPU 캐시 정책 | hot 데이터를 pSLC 영역으로 | 고장 영향 범위 국소화 |
| **구성 가능성** | 셀 모드 · OP · RUH | 저지연 모드 · 큐 구성 | 영역 비율 · EG 구성 | 보호 수준 · 용량 |
| **텔레메트리** | 실시간 WAF | 지연 분포 · 큐 상태 | 영역별 마모 | 다이 오프라인 · 고장 LBA |

네 기술은 따로 개발할 제품이 아니라 **워크로드 구성형 SSD**([workload-configurable-ssd-report.md](workload-configurable-ssd-report.md)) 플랫폼 위의 구성이다. 공통 기반을 먼저 만들고, 제품화 비중은 신호로 정한다.

---

## 3. 왜 고객 시스템까지 넓어져야 하나: NAND → SSD → 고객 시스템

단품의 한계는 늘 한 계층 위에서 풀려 왔다([solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md)).

| 단계 | 시기 | 단품 지표(악화) | 보상(주체) | 결과 |
|---|---|---|---|---|
| **1 NAND → SSD** | 1991~ | RBER 약 10⁶배 ↑ | 컨트롤러 ECC 약 60배 ↑ | **완결**: UBER 요구(JESD218) 충족 |
| **2 SSD 단독 최적화** | 2014~2019 | P/E 약 100배 ↓ | SSD가 워크로드를 추정(Multi-stream · AutoStream · 핫/콜드 분리) | **부분 성공**: QoS는 개선, WAF는 실 워크로드에서 약 3에 머묾(CacheLib 3.22). 데이터 수명은 호스트만 안다 |
| **3 고객 시스템과 공동 설계** | 2022~ | 동일 | 호스트가 데이터 수명을 지정(FDP 2022), 애플리케이션까지 공동 설계(CacheLib 2025, LMCache 2026) | **WAF 3.22 → 1.03** |

세 단계 모두 "요구는 고정, 단품 지표는 악화, 보상은 한 계층 위로"라는 같은 구조다. 새로 나타난 두 과제도 같은 자리에 있다.

- **고DWPD**: 남은 변수 WAF는 데이터 수명을 아는 **KV 캐시 관리자** 안에 있다.
- **GPU 직결**: 남은 병목(GPU 쪽 완료 처리 · 캐시 적중)은 **CUDA · SCADA · 애플리케이션** 안에 있다.

**사양을 받아 SSD를 잘 만드는 방식은 2단계에 머문다. 3단계는 고객 시스템 안에서 함께 설계해야 닿는다.** DRAM도 같은 길에 들어섰다(PRAC 2024: DRAM-호스트 협력 프로토콜, HBM4 커스텀 베이스 다이).

---

## 4. 실행 전략: 고객 협력

### 4.1 무엇이 다른가

| | 지금까지 | 앞으로 (새 과제에 한해) |
|---|---|---|
| 요구를 얻는 곳 | 고객 사양서 | 고객 시스템 안(코드 · 트레이스 · 운영 지표) |
| 일하는 방식 | 사양 → 개발 → 인증 | 상주 · 오픈소스 기여 · 공동 실측 |
| 계약 | 물량 · 가격 | 물량 + 공동 설계 · 운영 통합 |
| 성과 | 사양 충족 · 인증 통과 | 고객 시스템에서 켜진 기능 · 고객 지표(토큰당 비용 · GPU 가동률) |

SSD 안에서 풀 수 있는 기술(Mixed Media · 고용량)은 지금 방식을 유지한다. 새 방식은 **고객 시스템과 함께 풀어야 하는 과제에 집중**한다.

### 4.2 공동 설계 의제

| 과제 | 고객 쪽 상대 | 공동 설계 과제 | 규격 · 오픈소스 |
|---|---|---|---|
| **고DWPD** (첫 의제) | KV 캐시 관리자(LMCache · Dynamo · Mooncake), 추론 엔진 | 테넌트 · 수명별 배치, KV 트레이스 기반 WAF 실측, 초고DWPD 운영점의 셀 모드 선택 | LMCache 다음으로 Dynamo · Mooncake에 FDP 경로, NVMe FDP 런타임 재구성 |
| **GPU 직결** (옵션) | NVIDIA(SCADA · cuFile), GNN · 추천 · 벡터 검색 애플리케이션 | GPU 완료 처리 · 캐시 정책, 512B 읽기 경로 실측 | xio-sig 적합성, NVMe TPAR 4217, aisio 연장 |
| Mixed Media · 고용량 (선택) | 분산 스토리지 · 커널 블록 계층 | 계층 배치 연동, 고장 LBA 재구축 | 같은 협력 통로를 재사용 |

### 4.3 협력의 방식: 계약 · 사람 · 역량

직전 전략에서 승인된 세 축을 그대로 쓴다([qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md)).

- **계약: 물량에 기술 협력을**. 장기 물량 계약 위에 공동 설계 · 최적화와 운영 통합을 묶는다. 벤치마크는 Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략적 투자 🟡).
- **사람: 고객 안에 상주**. Co-Design Pod(FDE)가 고객 데이터센터 안에서 **명시된 요구와 실제 요구의 간극**을 메운다. 벤치마크는 Palantir FDE(🟡). 새 과제의 요구(데이터 수명 · 접근 패턴)는 고객 시스템 안에 있으므로 상주가 가장 빠른 통로다.
- **역량: 시스템 SW와 AI 데이터센터 운영의 눈**. KV 캐시 관리자 · CUDA I/O 경로 · 커널 블록 계층을 읽고 고칠 수 있는 시스템 소프트웨어 전문가, 고객의 지표로 말하는 사람. 출발점은 이미 있다(xNVMe · aisio 주 저자, SPDK 기여, LMCache Committer ✅).

### 4.4 신호에 따른 비중 조정 (불변 전략)

모든 기술은 **기반은 지금 만들고, 제품화 비중은 신호로 정한다**(RS-9, [rs9-demand-inflection-sensing.md](../../wiki/strategies/invariant/rs9-demand-inflection-sensing.md)). 신호는 분기마다 다시 읽고, 시나리오 밖의 변화도 여기서 잡는다.

| 기술 | 확대 신호 (비중 ↑) | 축소 신호 (비중 ↓) |
|---|---|---|
| 고DWPD | 고객 RFQ의 DWPD 요구 상승, KV 캐시 SSD 쓰기 실측 증가. **초고DWPD 독립 과제 승격**: 2TB · 30 DWPD 고객 요구 확인 `[사내 확인]` + MLC 모드 P/E 약 2.6만 이상 확인 | 모델 KV 압축 확산(SSD 1/8 사례), 오프로드 정책의 쓰기 억제 강화, CXL 메모리가 KV 계층 흡수 |
| GPU 직결 | NVIDIA SSD 요구 사양 공개, cuFile 코드 공개 · 적합성 시험 시작, 첫 프로덕션 배치, 고객 RFQ에 512B IOPS, Gen7 통합 일정 확정 | GPU HBM 캐시만으로 충분하다는 실측 확산, CXL · HBF가 같은 계층 흡수, 일정 추가 순연 |
| Mixed Media | 서버 · 건물 내용연수 연장 지속, CapEx 절감, 고객 RFQ에 영역 요구 등장 | 신규 그린필드 캠퍼스 중심 증설, 직접 쓰기 QLC(SLC 버퍼 없음) 확산 |
| 고용량 | 데이터센터 지연 · 규제 확대, AI 랙 전력 밀도 상승, 245TB 채택 확산 | 전력망 완화 · 건설 가속, 초고용량 가격 프리미엄 지속 |

### 4.5 단계와 첫 90일

| 단계 | 시기 | 무엇을 |
|---|---|---|
| 1 공통 기반 | 2026 하반기 ~ 2027 상반기 | FDP · 구성 가능성 · 텔레메트리 플랫폼, 셀 모드 SKU 시제(SLC · MLC 모드), 512B 읽기 경로 설계 검토 |
| 2 고객별 공동 설계 | 2027 | 전략 고객 1~2사와 고DWPD 의제 착수(트레이스 · WAF 실측), GPU 직결은 NVIDIA 생태계 적합성 · 공동 실측 |
| 3 규격과 제품 결정 | 2028 전후 | NVMe · OCP 제안 반영, Gen7 시점에 GPU 직결 제품 여부 결정 |

**계약의 창**: 공급자 우위가 이어지는 2026년 4분기 ~ 2027년 상반기(2027년 하반기 공급 완화 전망 🟡) 안에 기술 협력을 계약에 담는다.

**첫 90일**: ① 전략 고객 1~2사 선정과 고DWPD 의제 매칭 ② Co-Design Pod 구성 ③ 시스템 SW 전문가 채용 착수 ④ MLC 모드 P/E · 지연 사내 평가 ⑤ 신호 대시보드(§4.4) 가동.

### 4.6 성과 지표

| 축 | 지표 |
|---|---|
| 공동 설계 | 공동 설계 의제를 가진 고객 수, 고객 시스템에서 켜진 기능(FDP · 영역 · LBA Status) |
| 이익 | 초고DWPD 운영점의 GB당 다이 사용량(SSD 단독 대비) |
| 생태계 | 업스트림 머지 건수(KV 캐시 관리자 · SPDK · 커널), 채택된 규격 제안 수 |
| 준비도 | 셀 모드 SKU 시제, 512B 읽기 경로 설계 완료 여부 |

---

## 5. 리스크와 반론

| 리스크 · 반론 | 대응 |
|---|---|
| 신호가 틀릴 수 있다 | 그래서 단정하지 않고 분기마다 신호를 다시 읽는다(§4.4). 이 보고서의 판단은 지금 예측 가능한 범위 안의 최선이다 |
| 여러 기술을 하면 자원이 분산된다 | 공통 기반(§2.6)에 먼저 투자하고, 제품화 비중은 신호로 조정한다. GPU 직결은 제품이 아닌 기반 기술만 지금 한다 |
| GPU 직결은 시장이 없을 수 있다 | 옵션으로 둔다. 기반 기술(512B 읽기 경로 · 명령 처리)은 고IOPS 범용 제품에도 쓰인다 |
| 초고DWPD는 SLC로 충분하다 | 맞다. 그래서 MLC 모드는 사내 P/E가 손익분기(약 2.6만)를 넘을 때만 추진한다. 가장 큰 이익은 FDP(WAF 3 → 1)에서 나온다 |
| KV 캐시 고DWPD가 사라질 수 있다 | 고DWPD에서 만든 FDP · 셀 모드 기술은 Mixed Media의 pSLC 영역으로 재사용된다 |
| 고객 협력은 시간이 오래 걸린다 | 계약의 창(2026 4Q ~ 2027 1H)을 쓰고, 이미 있는 접점(LMCache · aisio)에서 시작한다 |
| 데이터센터 지연 추정이 엇갈린다 | 범위로 쓰고, 단일 수치로 단정하지 않는다 |

---

## 6. 근거 대장

| # | 주장 | 등급 | 출처 |
|---|---|---|---|
| F-1 | KV 캐시 고DWPD의 양방향 신호 | 🟡 / ✅ | [wcssd-v1](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md) §1 · §4 |
| F-2 | LMCache FDP 배치 머지 · 삼성 Committer, 나머지 3종 기여 0 | ✅ | [samsung-kv-cache-activities-2026-09.md](../../sources/articles/samsung-kv-cache-activities-2026-09.md) |
| F-3 | 30 DWPD 조건 `P/E × (원시/사용자) = 54,750 × WAF` | ⚠️ 파생 | [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §5 |
| F-4 | 2TB · 30 DWPD 다이 산술, MLC 모드 손익분기 P/E 약 2.6만(5년) | ⚠️ 파생 | [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](../../sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md) §3 |
| F-5 | 50 DWPD 이상 AI SSD는 SLC급 · IOPS 우선 · 5년 보증, 2TB · 30 DWPD KV 캐시 SSD 공개 제품 없음, MLC 모드 P/E 공개치 | 🟡 | 같은 원장 §1 · §2 |
| F-6 | Storage-Next 출범 · 목표, cuFile 코드 미공개, 삼성 PM1763 백서 · aisio | 🟡 / ✅ | [ssd-future-candidate-gpu-direct-iops-2026-10.md](../../sources/articles/ssd-future-candidate-gpu-direct-iops-2026-10.md) GD-03 · GD-04 · GD-07 · GD-20 · GD-23 |
| F-7 | "SCADA $36B" 수치 정정, 세그먼트 시장 추정 없음, 웨이퍼 3배 경고 | 🟡 / ⚠️ | [ssd-scada-market-technical-review-2026-10.md](../../sources/articles/ssd-scada-market-technical-review-2026-10.md) SR-01 · SR-06 · SR-09 · SR-14 |
| F-8 | 512B 병목 산술(매체 · 채널 · PCIe), GPU 폴링 SM 26.8% | ⚠️ 파생 / ✅ | 같은 원장 §4 · SR-68 |
| F-9 | 서버 내용연수 연장, 건물 15 → 25년, Google fungible 데이터센터 | ✅ / 🟡 | [ssd-mixed-media-infra-reuse-2026-10.md](../../sources/articles/ssd-mixed-media-infra-reuse-2026-10.md) IR-01~IR-16 |
| F-10 | 장치 수준 혼합 매체 선례, 삼성 공개 제품 없음, 단일 혼합 매체 요구 공개 기록 없음 | 🟡 / 부정 확인 | 같은 원장 §2-A · NG-01 · NG-02 |
| F-11 | 데이터센터 지연 추정 · AI 랙 전력 밀도 · Azure 스토리지 33% · "부분 고장은 전체 고장" | 🟡 / ✅ | [ssd-high-capacity-rackspace-fault-tolerance-2026-10.md](../../sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md) A1~A17 · D12 |
| F-12 | 재구축 시간 · Get LBA Status · OCP 다이 필드 · 용량 축소 명령 부재 | 🟡 / ⚠️ / ✅ | 같은 원장 C1 · D1~D9 · E1 |
| F-13 | 해법 사다리(RBER · ECC · WAF 3.22 → 1.03) | ✅ / 🟡 | [component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) |
| F-14 | Google "IT 랙 전체를 xPU에", NVMe 2.3 전력 기능(커널 미지원) | ✅ | [ssd-future-candidate-power-cooling-2026-10.md](../../sources/articles/ssd-future-candidate-power-cooling-2026-10.md) PC-60 · PC-70 · PC-77 |
| F-15 | 시나리오 확률 A26 · B39 · C8 · D21 · E6 | 위키 | [scenario-matrix.md](../../wiki/scenarios/scenario-matrix.md) |
| F-16 | Micron ↔ Anthropic 계약 4요소 · Palantir FDE | 🟡 | [micron-anthropic-sca](../../sources/articles/micron-anthropic-sca-2026-06-22.md) · [palantir-fde](../../sources/articles/palantir-fde-model-2026-07.md) |

---

## 7. 슬라이드 4장 (덱 v1.0)

상세는 [ssd-future-ready-strategy-outline.md](../presentation/ssd-future-ready-strategy-outline.md).

| 장 | 제목(액션 타이틀) |
|---|---|
| 1 배경 | SSD의 다음 수요는 하나로 정해지지 않으며, 지금 보이는 신호들은 서로 다른 기술을 요구합니다 |
| 2 솔루션 | SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다 |
| 3 당위성 | 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다 |
| 4 실행 | 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다 |
| 결론 밴드 | 실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다 |
