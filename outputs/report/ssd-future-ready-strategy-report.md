---
type: report
status: v2.5 (2026-10-07). 3장 점도표 점 크기 축소 · 흐린 추세 화살표(전체 중앙값 2011년 10 → 2026년 1). v2.4 (2026-10-07). 3장 배치를 발표 순서(ECC → SSD → DWPD → 공동 설계)로: 위 1 · 2칸, 아래 정격 DWPD 점도표(업체별 대표 제품 41개, 색 구분, 최고 등급 중앙값 10 → 5 → 3, QLC 0.2~0.6), 오른쪽 3칸. v2.3 (2026-10-07). 3장 계단 위를 정격 DWPD 점도표 하나로(6개 업체 226개 등급, 기간별 중앙값 10 → 1, 10 이상 비중 67% → 0%), 3칸 주요 3사(Google · Alibaba · AWS). §3.0 표 보강. v2.2 (2026-10-07). 3장 다시 그림: 계단 위 = SSD 혼자 이룬 10~15년 성장(성능 약 90배 · 전력 효율 약 13배 · 가성비 약 24배) 대 정격 DWPD 10 → 1(고객 캐시 3~7.2), 3칸 흰 상자 = 주요 DC 기업 7곳의 자체 SSD · 공동 설계 막대(Baidu 2014 → ByteDance 2026). §3.0 · §3.4 신설, CacheLib 저자 · AWS 컨트롤러 정정. v2.1 (2026-10-07). 3장 2칸(SSD 혼자 최적화)에 SSD 내부 기술 스택 시각화(FTL · ECC, GC · 웨어 레벨링 위에 2014~2019 핫 · 콜드 추정 · 스트림 분리 · IO 결정성), §3.3 2단계 보상 열 보강. v2.0 (2026-10-06). 덱 4장으로 정리: 보충 5장(FDP 시뮬레이션) 제외, 1~4장 텍스트 축소 · 시각화 보강(1장 카드당 그래프 하나, 2장 구역 산점도, 3장 CacheLib 단순화). v1.9: 4장 실행 시각화: 고객 상주 협업의 세 가지 핵심 업무(워크로드 측정 · 분석 / 호스트 SW 스택 최적화 · 평가 / 차세대 제품 기술 교류), CRM 범위 확장(경영진 · 영업 → 엔지니어). v1.8: 4장 실행: LTA → Multi-Year Deal(MYD), FDE가 고객 DC에서 하는 다섯 가지(관찰 · 실측 · 시제품 · 증명 · 수요화), 역량 화두(언어 · 문화 · 엔지니어 수준 고객 관계). v1.7: 보충 5장 추가: FDP 파라미터 민감도 시뮬레이션(RU 크기 · RUH 수 · 분류 정확도). v1.6: 고객 협력 깊이 재판단(사용자 기준: 스펙으로 분리되면 tightly coupled 불필요): 결합도 × 스펙 비완결도 → 공동 설계 필수 = FDP 하나, Mixed Media는 스펙으로 협력. 2장 단순화(제품군 매트릭스 + 3×3 격자). v1.5: 2장 재구성: 제품 포트폴리오를 받치는 핵심 기술 6가지(Fault Tolerant · Large Mapping · Multi-Tenant QoS · Confidential Storage · Mixed Media · FDP) × 제품군 × 고객 협력 강도(4기준 0~8점), 협력 필수 = Mixed Media · FDP. v1.4: 1장 재구성: 데이터센터 응용별 SSD 요구 + 제품 포트폴리오(SLC급 · 고내구 TLC · 고성능 TLC · 고용량 QLC), 에이전트 = 사용자별 VM → 고용량 QLC로 정정(팩트 체크). v1.3: Mixed Media를 고객 협력 과제로 재분류하고 논리 보강(사용자 분석 + 검증 원장). v1.2: SCADA · MLC 제외 · 데이터센터 유형별 요구 · 고객 측 고DWPD 근거. 덱 4장 v1.2
deck: outputs/presentation/ssd-future-ready-strategy.pptx (v1.9, 4장, 생성기 scripts/generate_ssd_future_ready_pptx.py)
outline: outputs/presentation/ssd-future-ready-strategy-outline.md
supersedes_focus: outputs/report/ssd-survival-strategy-report.md (KV 캐시 고DWPD 중심 → 데이터센터별 요구에 맞춘 준비 + 고객 협력 과제)
sources:
  - sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md
  - sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md
  - sources/raw-notes/user-mixed-media-hyperscaler-analysis-2026-10-03.md
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
  - wiki/concepts/ssd-core-technologies-customer-collaboration.md
  - wiki/concepts/fdp-parameter-sensitivity-simulation.md
  - wiki/concepts/datacenter-types-storage-requirements.md
  - wiki/concepts/high-dwpd-operating-point.md
  - wiki/concepts/mixed-media-ssd.md
  - wiki/concepts/high-capacity-fault-tolerance.md
  - wiki/concepts/solution-ladder-component-to-system.md
  - wiki/concepts/ssd-future-solution-candidates.md
  - wiki/scenarios/scenario-matrix.md
  - wiki/strategies/invariant/README.md
  - wiki/strategies/dev-org-transformation.md
  - wiki/strategies/qlc-execution-strategy.md
last_updated: 2026-10-06
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

> SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터 응용마다 SSD에 요구하는 특성이 다릅니다(그래서 SLC부터 QLC까지 다양한 제품 포트폴리오가 필요합니다). 핵심 기술 여섯 가지 중 다섯은 명확한 스펙으로 풀리지만, FDP는 고객과 함께 설계해야 제대로 동작합니다. 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다. 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다.

| 협력의 깊이 (결합도 · 스펙 비완결도, 각 0~2) | 핵심 기술 | 적합한 제품군 | 대표 데이터 |
|---|---|---|---|
| **SSD 안에서** | Fault Tolerant (0 · 0) | 고용량 QLC ● · 고성능 TLC ◐ | 같은 폼팩터 다이 1,024 → 약 2,133개(245TB → 512TB, ⚠️ 산술) |
| **스펙으로 협력** (고객 시스템과 함께 설계되지만, 요구를 정확한 스펙으로 받으면 따로 개발 가능) | Large Mapping (1 · 1) | 고용량 QLC ● | 245TB 매핑 DRAM 4KB 단위 약 245GB → 64KB 약 15GB(⚠️), 대가는 작은 쓰기 최대 16배 재기록 |
| | Multi-Tenant QoS (1 · 1) | 고성능 TLC · 고용량 QLC ● · 고내구 TLC ◐ | 이웃 테넌트 쓰기로 WAF 1.28 → 약 3.0(✅), 격리 시 p99 최대 3.1배 감소(✅) |
| | Mixed Media (2 · 1) | 고용량 QLC ● | 표준 네임스페이스 인터페이스, 고객 요구 pSLC 0.5~2%(VoC 🟡), WAF 70+ → 1.02(CSAL, 별도 드라이브 🟡) |
| | Confidential Storage (2 · 0) | 고성능 TLC · 고용량 QLC ● | Caliptra · SPDM · TDISP · OCP L.O.C.K.(Google · Microsoft 채택 확정, 삼성 공저 ✅) |
| **고객과 공동 설계 필수** (스펙만으로 닫히지 않음) | **FDP (2 · 2)** | SLC급 · 고내구 TLC · 고용량 QLC ● · 고성능 TLC ◐ | 같은 "FDP 지원" 스펙 · 같은 워크로드에서 장치마다 near-ideal 대 붕괴(WARP FAST'26 🟡), WAF 3.22 → 1.03(CacheLib FDP ✅, 구현 · 논문은 삼성 · Meta 반영), RUH · RG 출하 시 고정(✅) |

**한 줄 결론**: **실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다.** 데이터센터마다 다른 요구를 미리 준비하되, 다섯 기술은 고객 요구를 정확한 스펙으로 받아 지금처럼 잘 만들고, **스펙만으로 닫히지 않는 FDP는 지금까지와 다른 방식(공동 설계)으로 전략적으로 실행**한다. FDP의 효과는 고객 소프트웨어의 데이터 수명 분류와 SSD의 배치 정책이 맞물릴 때만 난다. 스펙을 정확히 받든 함께 설계하든, 핵심 기술을 제대로 확보하려면 고객과의 협력이 필수다.

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

### 1.3 데이터센터 응용마다 SSD에 요구하는 특성이 다르다

하이퍼스케일러는 한 종류의 데이터센터를 운영하지 않는다. Google은 8세대 TPU를 학습용과 추론용으로 나누며 "인프라 요구가 갈라졌다"고 밝혔다(✅). 상세는 [datacenter-types-storage-requirements.md](../../wiki/concepts/datacenter-types-storage-requirements.md).

| 데이터센터 응용 | SSD 요구 | 근거 데이터 (덱 1장 그래프) | 맞는 제품군 |
|---|---|---|---|
| **범용 클라우드** (VM · DB · 웹, 멀티테넌트) | **QoS · 테넌트 격리**. 쓰기는 적다 | 실사용 0.07~0.23 DWPD 대 범용 TLC 정격 1(Microsoft SSD 50만 대, ⚠️ 파생) · 공유 SSD를 하드웨어로 격리하면 **p99 지연 최대 3.1배 감소**(FlashBlox FAST'17, Microsoft 워크로드 ✅) · 이웃 테넌트 쓰기로 WAF 1.28 → 약 3.0(WARP FAST'26 ✅) · 드라이브 대역 활용률 8.0~27.8%(OSDI'26 ✅) | 기존 범용 TLC · QLC |
| **AI 학습** (데이터 로딩 · 체크포인트) | **대역 · 쓰기 피크** | GPU당 스토리지 대역 기본 읽기 0.16 · 쓰기 0.08 → 멀티모달 0.49 · 0.24 GB/s(NVIDIA SuperPOD 가이드 환산 ⚠️, 약 3배) · 405B 체크포인트 1회 약 5.7TB(14B/파라미터 산술 ⚠️) · "체크포인트를 다 쓸 때까지 학습이 멈춘다"(🟡) | 고성능 TLC, 체크포인트는 고내구 TLC(신호), 데이터셋은 고용량 QLC |
| **AI 추론** (KV 캐시 오프로드) | **쓰기 내구(DWPD)** | QLC 정격 0.6 · KV 계층 실측 3.2 · AI 전용 SSD 50~120 DWPD(🟡) · 반대 신호: 읽기 99.5%(CHEOPS'25 ✅) | 쓰기량에 따라 SLC급(신호) · 고내구 TLC · 고성능 TLC · 읽기 위주면 QLC(신호) |
| **에이전트** (Meta Muse · OpenAI Dot, 2026-09) | **용량 · TB당 비용** | 사용자마다 VM 하나 · 에이전트는 "대부분의 시간을 휴면"(Google ✅) · 휴면 상태는 압축 스냅샷으로 오브젝트 스토리지(E2B · Agent Substrate 코드 ✅) · Muse VM 메모리 7.75GB 대 디스크 100GB(제3자 관측 ✅) · 1억 명 × 100GB = 10EB(할당 기준 ⚠️) | 고용량 QLC, 기동 버스트에 고성능 TLC(신호) |

**정정 (v1.4, 2026-10-06)**: v1.3까지는 에이전트를 "문맥이 길고 상태가 남는다 → 고DWPD · 고용량"으로 읽었다. 사용자 지적에 따라 팩트 체크한 결과, 에이전트 서비스는 **사용자별 VM**이고 VM 디스크의 쓰기량 · DWPD를 공개한 측정은 없다. 고DWPD 근거(요청당 문맥 약 42배 · KV 계층 3.2 DWPD · "Agentic AI Storage"로 나온 TLC 3 DWPD 제품)는 모두 **추론의 KV 캐시 계층**에 속한다. 그래서 에이전트 열은 고용량 QLC로 고치고, 고DWPD는 AI 추론 열로 모았다. 근거: [agent-vm-and-cloud-ssd-requirements-2026-10.md](../../sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md) AV-01~AV-49 · CQ-01~CQ-28.

**한계**: 에이전트 VM의 실사용은 아직 할당의 0.6~1.7%로 관측됐고(10EB는 상한), 휴면 스냅샷을 로컬 SSD에 계층화하면(Google 로드맵) 쓰기가 늘 수 있다(가정 의존 0.3~17 DWPD ⚠️). 둘 다 §4.4의 신호로 본다. 에이전트 전용 데이터센터를 따로 짓는다는 하이퍼스케일러 진술은 없다.

### 1.3.1 제품 포트폴리오: SLC부터 QLC까지

요구 DWPD가 낮아질수록 최대 용량은 커진다(공개 사양). 응용마다 필요한 제품군의 조합이 다르므로 **하나의 제품으로 모든 응용에 대응할 수 없다.** ■ 지금 쓰는 곳 · ▢ 신호에 따라 쓰일 곳.

| 제품군 (정격 DWPD · 최대 용량) | 범용 클라우드 | AI 학습 | AI 추론 | 에이전트 |
|---|---|---|---|---|
| **SLC급** 30~120 · ≤ 3.2TB (Kioxia FL6 · Micron XTR · Solidigm P5810 · DapuStor X5) | | | ▢ 초고DWPD KV | |
| **고내구 TLC** 3 · ≤ 12.8TB (Solidigm PS1030) | | ▢ 체크포인트 | ■ KV 쓰기가 많을 때 | |
| **고성능 · 범용 TLC** 1 · ≤ 15.36TB (Solidigm PS1010 · Samsung PM1743) | ■ VM · DB 블록 | ■ 데이터 로딩 | ■ KV 계층(CMX) | ▢ 기동 버스트 |
| **고용량 QLC** 0.3~0.6 · ≤ 245TB (Kioxia LC9 · Solidigm P5336) | ■ 객체 · 콜드 데이터 | ■ 데이터셋 | ▢ 읽기 위주 KV | ■ 사용자 VM 디스크 · 상태 |

**고내구는 하나가 아니다**: 같은 "쓰기가 많은" 요구라도 필요한 DWPD에 따라 SLC급 · 고내구 TLC · 범용 TLC로 갈리고, 고객 시스템이 쓰기를 모아 주거나(Mixed Media) 수명별로 나눠 주면(FDP) QLC까지 후보가 된다. 이 포트폴리오를 준비하는 기술 가운데 일부는 SSD 안에서 풀리고, 일부는 고객 시스템과 함께 풀어야 한다는 것이 §2의 출발점이다.

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

## 2. 핵심 기술 6가지와 고객 협력 강도

§1.3.1의 제품 포트폴리오(SLC급 · 고내구 TLC · 고성능 · 범용 TLC · 고용량 QLC)를 만들려면 여섯 가지 핵심 기술이 필요하다. 기술마다 어느 제품군에 맞는지, 고객 협력이 얼마나 필요한지를 같은 기준으로 판단했다. 단일 소스: [ssd-core-technologies-customer-collaboration.md](../../wiki/concepts/ssd-core-technologies-customer-collaboration.md).

### 2.1 핵심 기술 6가지와 적합한 제품군

| 핵심 기술 | 내용 | SLC급 | 고내구 TLC | 고성능 · 범용 TLC | 고용량 QLC | 왜 필요한가 (데이터) |
|---|---|---|---|---|---|---|
| **Fault Tolerant** | 다이 · 플레인 단위 고장 격리 | | | ◐ | ● | 다이 1,024 → 약 2,133개(⚠️), "오늘날 부분 고장은 전체 고장"(Azure 연구 ✅) |
| **Large Mapping** | FTL 매핑 단위 4KB → 8~64KB, FTL 최적화 | | | | ● | 매핑 DRAM 약 1/16(⚠️ 산술, 엔트리 4B), 대가: IU보다 작은 쓰기 재기록(64KB IU에서 4KB 쓰기 16배 하한 ⚠️). 같은 Micron 6600 ION의 정격이 쓰기 크기에 따라 0.075~1.0 DWPD(13배 🟡) |
| **Multi-Tenant QoS** | 네임스페이스 QoS 격리 | | ◐ | ● | ● | 이웃 쓰기로 WAF 1.28 → 3.0(✅), 격리 시 p99 최대 3.1배 감소(✅) |
| **Confidential Storage** | RoT · 암호화 · 증명, 에이전트 기밀 VM | | | ● | ● | 기밀 VM이 장치 증명 · 연결(TDISP)을 요구(Linux 구현 ✅), L.O.C.K. 채택 확정(✅), Muse Confidential VM 예고(🟡) |
| **Mixed Media** | pSLC + QLC 네임스페이스 분리 | | | | ● | WAF 70+ → 1.02(🟡), pSLC 0.5~2%(🟡) |
| **FDP** | RUH · RG 배치 정책 최적화 | ● | ● | ◐ | ● | WAF 3.22 → 1.03(✅), 다이 120 → 47(⚠️) |

(● 핵심 · ◐ 해당) **고용량 QLC에 여섯 가지 중 다섯 가지가 걸리고, FDP는 SLC급부터 QLC까지 가장 넓게 걸친다.**

전력 · 냉각(콜드플레이트 폼팩터, NVMe 2.3 전력 한도 · 측정)은 고용량 제품의 요건으로 흡수한다. GPU 직결 고IOPS(SCADA)는 논의하기 이른 시점이라 제외하고 재검토 신호만 둔다. 보안은 2026-10-03에 따로 강조하지 않기로 했으나, 2026-10-06 사용자 지시로 **에이전트 기밀 VM용 Confidential Storage**를 핵심 기술로 넣었다([ssd-future-solution-candidates.md](../../wiki/concepts/ssd-future-solution-candidates.md)).

### 2.1.1 고객 협력의 깊이: 스펙으로 분리되는가 (⚠️ 과제팀 판단, v2)

**기준(사용자, 2026-10-06)**: 고객과 협력하지 않으면 핵심 기술이 제대로 최적화되지 않거나 요구를 만족하지 못하면 **협력 필수**다. 고객 시스템에 함께 설계돼야 하더라도 **스펙을 명확히 정하면** tightly coupled 협력은 필요 없다.

| 축 | 0 | 1 | 2 |
|---|---|---|---|
| **결합도**: 고객 시스템이 함께 설계돼야 하나 | 그대로 쓴다 | 설정 · 정렬 · 매핑을 맞춘다 | 데이터 경로 · 신뢰 체계에 넣는다 |
| **스펙 비완결도**: 명확한 스펙으로 양쪽이 따로 개발 · 검증해도 닫히나 | 표준 · 사내 검증으로 닫힘 | 고객 수치로 목표를 한 번 정하면 닫힘 | 양쪽 정책이 맞물려야 해 고객 워크로드에서 반복 공동 튜닝 |

| 핵심 기술 | 결합도 | 비완결도 | 판정 | 이유 |
|---|---|---|---|---|
| Fault Tolerant | 0 | 0 | SSD 안에서 | 고장 격리 · 패리티는 SSD 안에서 완결 |
| Large Mapping | 1 | 1 | 스펙으로 협력 | IU를 고객 쓰기 크기로 한 번 정하고, 고객은 IU에 정렬해 쓴다 |
| Multi-Tenant QoS | 1 | 1 | 스펙으로 협력 | 고객은 테넌트를 네임스페이스에 매핑하고 지연 목표를 준다. 격리는 SSD가 사내 검증 |
| Mixed Media | 2 | 1 | 스펙으로 협력 | 고객 SW가 데이터를 나눠 보내야 하지만, 인터페이스는 표준 네임스페이스이고 pSLC 비율은 출하 시 값(고객이 이미 0.5~2%로 요구), 네임스페이스 간 QoS는 목표 수치로 사내 검증 |
| Confidential Storage | 2 | 0 | 스펙으로 협력(표준) | 기밀 VM · 증명 체계에 들어가지만 Caliptra · SPDM · TDISP · L.O.C.K. 표준이 정한다 |
| **FDP** | 2 | **2** | **공동 설계 필수** | 효과가 고객 SW의 수명 분류 × SSD의 RU 크기 · GC 정책의 맞물림에 달렸다. 같은 "FDP 지원" 스펙 · 같은 워크로드에서 장치마다 near-ideal 대 붕괴(WARP D-04), 오분류 · Noisy RUH · 99%가 한 RUH로 몰리면 붕괴(D-01~D-03), RU 크기 · RUH 수 · GC 정책은 펌웨어가 노출하지 않는 정책 변수, RUH · RG는 출하 시 고정(F-07). CacheLib 3.22 → 1.03도 삼성 엔지니어가 Meta CacheLib 안에 구현한 결과 |

**선정**: **FDP.** 고객 시스템과 함께 설계돼야 하는 기술은 넷(Large Mapping · QoS · Mixed Media · Confidential Storage)이지만, 스펙으로 분리되지 않는 것은 FDP 하나다. FDP는 SLC급(2TB · 30 DWPD 다이 -60%) · 고내구 TLC(KV 캐시) · 고용량 QLC에 걸쳐 가장 넓다. **메시지**: 다섯 기술은 고객 요구를 정확한 스펙으로 받는 협력, FDP는 고객 시스템 안에서 함께 설계 · 튜닝하는 협력. **스펙을 정확히 받든 함께 설계하든, 핵심 기술을 제대로 확보하려면 고객과의 협력이 필수다.**

| | 스펙으로 협력 (5기술, 지금 방식의 연장) | 공동 설계 (FDP) |
|---|---|---|
| 요구의 출처 | 고객 사양서 · OCP 요구 ID · VoC 수치 | 고객 애플리케이션의 데이터 수명 분포와 쓰기 흐름 |
| 우리가 바꾸는 것 | SSD 펌웨어 | SSD 정책(RU · RUH · RG · GC) + 고객 SW의 분류(오픈소스 기여 포함) |
| 검증 | 사내 인증 → 고객 인증 | 고객 워크로드 안에서 함께 측정 · 반복(WAF) |

**판단 변경 기록**: v1.5(같은 날)는 4기준(고객만 아는 정보 · 고객 SW 변경 · 표준 공백 · 고객 환경 검증) 0~8점으로 Mixed Media 8 · FDP 7을 함께 선정했다. "고객 SW가 바뀌어야 하나"를 협력 필수의 근거로 센 것이 문제였다. 고객 SW가 바뀌어야 해도 인터페이스와 목표가 명확하면 따로 개발할 수 있다(사용자 지적). **한계**: 축 점수는 정성적이다. Mixed Media는 QLC 네임스페이스에 FDP를 결합하는 순간 그 부분이 FDP의 공동 설계 범위에 들어가고, Fault Tolerant는 "부분 고장을 호스트와 나눠 처리"하는 흐름이 커지면 결합도가 오른다.

### 2.2 SSD 안에서 · 스펙으로 협력: Fault Tolerant (고용량 + 결함 허용)

**정의**: 같은 폼팩터에 245TB → 512TB를 담는 기술과, 1,000~2,000개 다이 중 일부가 고장 나도 계속 쓰게 하는 결함 허용 기술([high-capacity-fault-tolerance.md](../../wiki/concepts/high-capacity-fault-tolerance.md)).

| 용량 | 다이 수 | 드라이브 재구축(무부하 · 부하 중) | 다이 1개만 복구 |
|---|---|---|---|
| 245.76TB | 1,024 | 21.5시간 · 9일 | 13분 |
| 512TB | 약 2,133 | 44.7시간 · 18.8일 | 13분 |

(61.44TB 실측의 선형 확대 ⚠️) 단일 패리티로 245TB급은 충족 가능하지만 512TB급은 이중 패리티 · 여분 다이가 필요하다([ssd-die-reliability-ppm.md](../../wiki/concepts/ssd-die-reliability-ppm.md)). SSD 안에서: 다이 패리티, Fail-in-Place, OCP SMART 다이 필드(✅), 콜드플레이트 폼팩터 · 전력 한도 대응. 고객과 하면 더 커지는 것(선택): 고장 LBA만 재구축(Get LBA Status ✅, Linux 경고 미활성 ✅), 용량을 줄이며 계속 운영(NVMe 명령 없음 ✅). Azure 연구는 "오늘날 부분 고장은 전체 고장"이라고 명시했다(✅).

> **재확인 필요**: 삼성 BM1773, PM1733 FIP 감량 단위는 이번 조사에서 재확인되지 않았다. 핵심 근거로 쓰지 않는다.

**스펙으로 협력하는 나머지 세 기술** (Mixed Media는 §2.3)

| 핵심 기술 | SSD 안에서 할 것 | 고객에게서 받을 것 | 근거 |
|---|---|---|---|
| Large Mapping | IU 8~64KB FTL, 2단계 매핑 · 작은 쓰기 버퍼, DRAM 축소 | 쓰기 크기 분포, IU 정렬 가이드 수용 | IU 64KB = 4KB 쓰기 16배 하한(MX-20 ⚠️), Solidigm 정렬 설명(MX-13 🟡), Micron 6600 ION 0.075 · 0.3 · 1.0 DWPD(🟡) |
| Multi-Tenant QoS | 네임스페이스 · NVM Set 격리, 다이 수준 자원 분할, GC 간섭 차단 | 테넌트 SLO(지연 백분위) | FlashBlox p99 3.1배(✅), WARP WAF 1.28 → 3.0(✅), OCP 지연 백분위 표(🟡) |
| Confidential Storage | Caliptra RoT, SPDM 증명, TDISP 기밀 VM 연결, L.O.C.K. 키 관리 · 암호 삭제, PQC | 키 · 증명 정책(표준 경유) | L.O.C.K. Google · Microsoft 채택 확정 · 삼성 공저(✅), Caliptra 2.0 범위에 DC SSD(✅), PM1763 TDISP · PQC(🟡), Muse Confidential VM 예고(🟡) |

### 2.3 스펙으로 협력: Mixed Media (pSLC + QLC, 네임스페이스 2개)

> **정정 (v1.6)**: v1.3~v1.5는 Mixed Media를 고객 협력(공동 설계) 과제로 두었다. 아래 "왜 고객 협력 과제인가"의 1~2는 고객 시스템과의 **결합**을 보여 줄 뿐, 스펙으로 분리할 수 없다는 근거는 아니다. 인터페이스(표준 네임스페이스) · pSLC 비율(출하 시 값, VoC 0.5~2%) · 네임스페이스 간 QoS(목표 수치)를 스펙으로 정하면 고객은 자기 SW로 배치하고, 우리는 사내에서 검증할 수 있다. 3(QLC 네임스페이스 + FDP 결합)은 FDP(§2.4)의 공동 설계 범위다.

**재정의**: "QLC에 캐시를 붙여 성능을 높인다"가 아니라, **한 SSD 안에서 고성능 · 고내구 영역(pSLC)과 초고용량 · 저비용 영역(QLC)을 별도 네임스페이스로 나누고, 고객 소프트웨어가 데이터 종류에 따라 직접 배치**하는 드라이브다. 근거: 사용자 분석([원본 메모](../../sources/raw-notes/user-mixed-media-hyperscaler-analysis-2026-10-03.md))과 검증 원장 [ssd-mixed-media-hyperscaler-logic-2026-10.md](../../sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md)(MX), 상세는 [mixed-media-ssd.md](../../wiki/concepts/mixed-media-ssd.md) §0.

**왜 하이퍼스케일러에게 맞나 (데이터)**

| 논리 | 데이터 | 등급 |
|---|---|---|
| ① 쓰기는 두 종류가 섞여 있다 | Alibaba · Tencent 블록 스토리지 볼륨의 91.5% · 92.3%가 쓰기 우세, Alibaba 쓰기의 **75%가 16KiB 이하**. Kioxia "small random vs large sequential, metadata vs user data가 고객 요구를 만든다" | 🟡 (MX-01 · MX-60~MX-62) |
| ② QLC의 약점은 용량 · 읽기가 아니라 쓰기 경로다 | IU 16~64KB에서 4KB 랜덤 쓰기 하한만 4~16배(산술), QLC 프로그램 2~3ms 대 SLC 50~220µs, GC로 p99.9 > 1ms(Alibaba FAST'26) | ⚠️ / ✅ (MX-21 · MX-30~MX-37) |
| ③ 핵심은 WAF: 작은 쓰기를 모아 큰 순차로 내린다 | **4KB 랜덤 쓰기 WAF 70+ → 1.02**(CSAL 백서). 단 별도 캐시 드라이브 구성, 호스트 기록 기준일 수 있음 | 🟡 (MX-11 · MX-17) |
| ④ pSLC는 작게 | QLC 셀을 pSLC로 쓰면 비트 1/4(실제 5 : 1). **고객 요구 pSLC = 최대 QLC 용량의 0.5~2%**(Kioxia VoC) → 사용자 용량 손실 약 1.5~8% | 🟡 / ⚠️ (MX-01 · MX-41) |
| ⑤ 드라이브 슬롯 비용(Slot Tax)을 없앤다 | Kioxia "SLC SSD가 슬롯을 통째로 차지", FRU 감소 · PCIe 레인 균형. TLC 2 + QLC 8 → 혼합 8이면 슬롯 2개 절약(대신 QLC 용량 4~15.6%), 선례 Pure FlashArray//XL 전용 NVRAM 슬롯 제거 | 🟡 / ⚠️ (MX-02 · MX-52 · MX-54) |

**고객 시스템과 결합하는 이유** (v1.3 논거, 결합의 근거로 유효)

1. **배치 결정이 고객 소프트웨어에 있다**: 어떤 쓰기가 WAL · 메타데이터인지는 호스트만 안다. 상용 혼합 매체는 예외 없이 호스트 소프트웨어가 매체를 묶었다(CSAL · RST · VAST · Colossus, CD-01). "SSD가 워크로드를 추측하게 하지 말고 호스트가 의미를 알려 준다"는 고DWPD와 같은 구조다.
2. **pSLC 비율을 고객 워크로드로 정한다**: Kioxia "배치별 맞춤 비율", VoC 0.5~2%. 크면 QLC $/TB를 잃고, 작으면 지속 쓰기에서 넘친다.
3. **QLC 영역의 GC는 수명 정보로 줄인다**: QLC 네임스페이스에 FDP 수명별 RUH를 쓰면 pSLC = 쓰기 충격 흡수, FDP = QLC 내부 GC 최적화로 분업한다(결합 근거는 Solidigm CSAL 쪽, Kioxia 출처로는 미확인).

| 층 | 내용 |
|---|---|
| SSD 안에서 준비할 것 (컨트롤러 경쟁점) | **pSLC → QLC destage 정책**, **네임스페이스별 QoS 격리**(다이 수준 격리), **GC 간섭 차단 · 자원 예약**(p99.9 이상), **FDP 연동**, **pSLC 크기 결정 · 영역별 마모 · 넘침 텔레메트리**, 영역별 보증 회계 |
| 고객과 함께 정할 것 | 데이터 종류별 네임스페이스 배치(WAL · 메타데이터 · 인덱스 → pSLC, 객체 · 데이터셋 → QLC), 워크로드별 pSLC 비율, QLC NS의 RUH 설계, 꼬리 지연 목표 |
| 선례 · 경쟁 | Kioxia Mixed Mode(FMS 2025 · 2026, 네임스페이스 2개), DapuStor J5060 dual-mode, Solidigm CSAL(시스템 수준, Alibaba 상용). **삼성의 호스트 가시 pSLC 영역 제품은 공개 자료에서 찾지 못함** |
| 근거의 한계 | 하이퍼스케일러가 pSLC 네임스페이스를 요구했다는 공개 기록 없음, 한 혼합 드라이브의 p99.9 이상 실측 없음, 혼합 대 분리 TCO 수치 없음. KV 캐시 · 체크포인트는 큰 I/O라 pSLC 후보가 아니다(AI 데이터 중 후보는 메타데이터 · 인덱스 · 로그) |
| 출처 귀속 정정 | 사용자 분석의 "Kioxia 2026-09 공개" · "pSLC 1~6%" · "Kioxia + FDP 결합"은 확인되지 않았다(실제: FMS 2025 · 2026, VoC 0.5~2%, 결합은 Solidigm CSAL). 메커니즘 자체는 근거가 있다 |

### 2.4 고객과 공동 설계 필수: FDP (RUH · RG 배치 정책, 고DWPD 운영점 포함)

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

**왜 응용마다 함께 맞춰야 하나 (⚠️ 시뮬레이션, [fdp-parameter-sensitivity-simulation.md](../../wiki/concepts/fdp-parameter-sensitivity-simulation.md), 덱에서는 제외하고 보고서 · 위키에 보존)**: 페이지 매핑 FTL · greedy GC · OP 12% 모델에 응용별 수명 등급 부하를 넣고 파라미터 하나씩 바꿨다. 모델은 플래시 캐시에서 FDP 없음 2.97 → FDP 1.00으로 CacheLib 실측(3.22 → 1.03)과 같은 방향이다.

| 파라미터 | 누가 정하나 | 결과 |
|---|---|---|
| RU 크기 | SSD(출하 시) | WAF 1이 무너지는 지점 = 응용의 삭제 단위: LSM(SST 16단위)은 RU 16까지 1.00 → 256에서 3.71, KV 캐시(블록 64)는 64까지 1.00 → 256에서 2.85 |
| RUH 수 | SSD(출하 시 고정) | 필요한 핸들 = 수명 등급 수: 캐시 2 · LSM 4 · 멀티테넌트 8. 멀티테넌트에 핸들 2개면 1.93 |
| 분류 정확도 | 고객 SW | 플래시 캐시 오분류 10% → 1.42, 20% → 2.37(FDP 없음 2.97에 근접) |

SSD 쪽 두 값은 고객 응용을 알아야 출하 전에 정할 수 있고, 고객 쪽 분류는 SSD 동작을 알아야 잘 정할 수 있다. 어느 한쪽 스펙만으로 닫히지 않는다.

### 2.5 공통 기반

| 공통 요소 | FDP (고DWPD) | Mixed Media | 고용량 (Fault Tolerant · Large Mapping) |
|---|---|---|---|
| **배치 정보** | 수명별 분리(FDP)로 WAF ↓ | hot 데이터를 pSLC 영역으로 | 고장 영향 범위 국소화 |
| **구성 가능성** | SLC 모드 비율 · OP · RUH | 영역 비율 · EG 구성 | 보호 수준 · 용량 |
| **텔레메트리** | 실시간 WAF | 영역별 마모 | 다이 오프라인 · 고장 LBA |

이 기술들은 **워크로드 구성형 SSD**([workload-configurable-ssd-report.md](workload-configurable-ssd-report.md)) 플랫폼 위의 구성이다. 공통 기반을 먼저 만들고, 제품화 비중은 신호로 정한다.

---

## 3. 왜 고객 시스템까지 넓어져야 하나: NAND → SSD → 고객 시스템

### 3.0 SSD 혼자서도 성능 · 전력 효율 · 가성비는 크게 올랐지만, 정격 DWPD는 내려왔다 (2026-10-07)

| 지표 | 2010~2012 → 2024~2026 | 배율 | 근거 |
|---|---|---|---|
| 성능: 4K 랜덤 읽기 | 75K IOPS(2012 Intel DC S3700) → 6.8M IOPS(2026 PM1763) | 약 90배 | 🟡 |
| 전력 효율: 순차 읽기 MB/s per W | 83(2012) → 608(2022 PM1743 공표) → 1,120(Gen6, Micron 9650 공표) | 약 13배 | 🟡 |
| 가성비: 1달러로 사는 NAND GB(명목) | 0.56(2010) → 13(2024), 2023 저점 20 | 약 24배 | 🟡 IBM Storage Landscape |
| 정격 DWPD | 고내구 10(2012) → 플래그십 1(2019~2024), QLC 0.26~0.6 | 10 → 1 | 🟡 |
| 고객 캐시 요구 | Kangaroo 예산 3 · KV 실측 3.2 · Baleen 목표 7.2 | - | §3.1 |

**출시 제품 정격 DWPD (덱 3장 점도표)**: 6개 업체 226개 등급(5년 기준, QLC 랜덤 쓰기 기준, SLC · SCM 특수 14개 제외 집계) 중앙값 2008~2012 10 → 2013~2015 3 → 2016~2018 1.5 → 2019~2026 1, 10 DWPD 이상 비중 67% → 0%. 2016년 이후 30 이상은 특수 제품뿐. 근거: [essd-rated-dwpd-products-2008-2026-2026-10.md](../../sources/articles/essd-rated-dwpd-products-2008-2026-2026-10.md).

근거: [essd-growth-metrics-2010-2026-2026-10.md](../../sources/articles/essd-growth-metrics-2010-2026-2026-10.md), 위키 [essd-decade-growth-vs-dwpd.md](../../wiki/concepts/essd-decade-growth-vs-dwpd.md). 성장은 NAND 세대 · 컨트롤러 · 인터페이스 세대가 만들었고 모두 SSD 안의 일이다. DWPD의 "10 → 1"에는 고내구 → 읽기 위주 등급 이동이 섞여 있다. **한계**: 모든 값이 검색 스니펫 확인(원문 대조 필요), 가격은 NAND 부품 매출/비트(완제품가 아님).

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
| **2 SSD 혼자 최적화** | 2014~2019 | P/E 약 100배 ↓ | SSD가 안에서 워크로드를 추정: 기본 관리(FTL · ECC, GC · 웨어 레벨링) 위에 핫/콜드 추정 · 스트림 분리(Multi-stream 2014 · AutoStream 2017) · IO 결정성(NVMe 1.4, 2019)을 쌓음([원장 F36~F39](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md)) | **부분 성공**: 테일 지연 · 성능은 개선, WAF는 실 워크로드에서 약 3 |
| **3 고객 시스템과 공동 설계** | 2022~ | 동일 | 호스트가 데이터 수명을 지정(FDP 2022), 애플리케이션까지(CacheLib 2025, LMCache 2026) | **WAF 3.22 → 1.03** |

**사양을 받아 SSD를 잘 만드는 방식은 2단계에 머문다. 3단계는 고객 시스템 안에서 함께 설계해야 닿는다.** DRAM도 같은 길에 들어섰다(PRAC 2024, HBM4 커스텀 베이스 다이).

### 3.4 공동 설계는 이미 주요 데이터센터 기업의 흐름이다 (2026-10-07 팩트 체크)

| 회사 | 공개 근거 첫해 | 직접 하는 것 | 대표 수치 |
|---|---|---|---|
| Baidu | 2014 | 자체 SSD(SDF) · 시스템 공동 설계 | 3,000대+ · I/O 대역폭 +300% · GB당 비용 -50%(ASPLOS'14) |
| Google | 2016 | 자체 설계 SSD(자체 인터페이스 · 펌웨어) → Titanium SSD | 지연 최대 -35%(이전 세대 Local SSD 대비 ✅) |
| Alibaba | 2016 | AliFlash → 자체 컨트롤러 칩(镇岳510, 2023) | AliFlash V1 5만 대+, 컨트롤러 누적 50만 개+(2026-03, 외판 포함) |
| Microsoft | 2018 | 스펙(Denali · OCP Cloud SSD) · Azure Boost 오프로드 | 자체 SSD 근거 없음 |
| Meta | 2020 | 스펙 · 표준(OCP 주저자 · FDP) | FDP 비준 2022-11-30 ✅ |
| AWS | 2020~21 | 자체 설계 SSD(Nitro SSD) · FTL 자체 | I3 대비 지연 최대 -60% · 변동성 -75%. 자체 컨트롤러 칩 근거 없음(외부 벤더 협업 정황) |
| ByteDance | 2026 | 사내 SSD 개발 조직(펌웨어) | FMS 2026 연사 소개 |
| Tencent | - | 근거 없음 | - |

근거: [dc-in-house-ssd-co-design-2026-10.md](../../sources/articles/dc-in-house-ssd-co-design-2026-10.md), 위키 [datacenter-in-house-ssd-co-design.md](../../wiki/concepts/datacenter-in-house-ssd-co-design.md). 사용자가 들은 "아마존 · 중국 DC 업체의 자체 SSD"는 AWS(자체 설계 SSD · FTL)와 Alibaba(자체 컨트롤러까지) · Baidu(2014)에는 맞고, Tencent에는 근거가 없으며 ByteDance는 사내 개발 조직 신호 수준이다. **정정**: CacheLib FDP 3.22 → 1.03의 구현 · 논문(EuroSys'25)은 삼성 엔지니어, Meta는 업스트림 반영(✅ PR). 대부분 🟡(원문 미열람).

---

## 4. 실행 전략: 고객 협력

### 4.1 무엇이 다른가

| | 지금까지 | 앞으로 (새 과제에 한해) |
|---|---|---|
| 요구를 얻는 곳 | 고객 사양서 | 고객 시스템 안(코드 · 트레이스 · 운영 지표) |
| 일하는 방식 | 사양 → 개발 → 인증 | 상주 · 오픈소스 기여 · 공동 실측 |
| 계약 | 물량 · 가격 | 물량 + 공동 설계 · 운영 통합 |
| 성과 | 사양 충족 · 인증 통과 | 고객 시스템에서 켜진 기능 · 고객 지표(토큰당 비용 · GPU 가동률) |

다섯 기술(Fault Tolerant · Large Mapping · Multi-Tenant QoS · Mixed Media · Confidential Storage)은 고객 요구를 정확한 스펙으로 받는 지금 방식을 다듬어 준비하고, 새 방식은 **스펙으로 닫히지 않는 FDP에 집중**한다(§2.1.1).

### 4.2 공동 설계 의제

| 과제 | 고객 쪽 상대 | 공동 설계 과제 | 규격 · 오픈소스 |
|---|---|---|---|
| **FDP (고DWPD)** | KV 캐시 관리자(LMCache · Dynamo · Mooncake), 추론 엔진, 캐시 계층(CacheLib류) | 테넌트 · 수명별 배치, KV 트레이스 기반 WAF 실측, 2TB · 30 DWPD 운영점 요구 확인 | LMCache 다음으로 Dynamo · Mooncake에 FDP 경로, NVMe FDP 런타임 재구성 |
| Mixed Media (스펙 협력 의제) | 분산 스토리지 · DB · 블록 스토리지(로그 · 메타데이터 경로), 계층 배치 소프트웨어(CSAL류) | 데이터 종류별 네임스페이스 배치, 워크로드별 pSLC 비율(0.5~2% 구간 검증), destage · QoS 격리 목표(p99.9), QLC NS의 RUH 설계 | NVMe 네임스페이스 · 엔듀런스 그룹 활용, 영역별 텔레메트리 · 보증 표기 제안, FDP 매체 속성 제안 |
| Fault Tolerant (선택) | 분산 스토리지 EC · 커널 블록 계층 | 고장 LBA 재구축 | 같은 협력 통로를 재사용 |

### 4.3 협력의 방식: 계약 · 사람 · 역량

- **계약: 물량에 기술 협력을**. 지금의 **Multi-Year Deal(MYD)** 은 여러 해의 수량과 가격을 약속한다. 앞으로는 MYD(다년 물량) 위에 공동 설계 · 최적화와 운영 통합을 묶는다(자본 연계는 선택). 벤치마크는 Micron ↔ Anthropic 전략적 계약(2026-06-22: 공동 최적화 · 다년 공급 · 운영 통합 · 전략적 투자 🟡).
- **사람: 고객 안에 상주(FDE)**. Co-Design Pod가 고객 엔지니어와 매일 함께 일하며 **명시된 요구와 실제 요구의 간극**을 메우고 수요를 함께 만든다. 벤치마크는 Palantir · OpenAI FDE(🟡, [palantir-fde-model-2026-07.md](../../sources/articles/palantir-fde-model-2026-07.md)). 고객 AI 데이터센터 안에서 하는 **세 가지 핵심 업무**([dev-org-transformation.md](../../wiki/strategies/dev-org-transformation.md) [Update 2026-10-06]):

| 핵심 업무 | 무엇을 하나 | 산출물 |
|---|---|---|
| ① 고객 워크로드 측정 · 분석 | 고객 트레이스로 쓰기 크기 · 데이터 수명을 재서, 말한 요구와 실제 요구의 차이를 찾는다 | 고객별 수명 등급 · 삭제 단위 프로파일, WAF · 꼬리 지연 기준선 |
| ② 호스트 SW 스택 최적화 · 평가 | 고객 엔지니어와 KV 캐시 SW · 커널 · SSD를 맞물려 최적화하고(배치 코드, 선례 LMCache FDP 머지 ✅), 고객 지표(토큰당 비용 · GPU 가동률)로 평가한다 | 배치 패치 · RU · RUH 구성안, 고객 지표 기준 효과 보고 |
| ③ 차세대 제품 기술 교류 · 소통 | 현장에서 증명한 것을 고객 엔지니어와 다음 제품 사양 · 고객 RFQ · OCP 요구로 굳힌다("gravel road → paved highway") | 차세대 사양, RFQ 항목, OCP 요구 제안, 공동 발표 |

- **역량: 고객처럼 보는 눈**. KV 캐시 관리자 · 커널 블록 계층을 읽고 고칠 수 있는 시스템 소프트웨어 전문가, 고객의 지표로 말하는 사람. 출발점은 이미 있다(xNVMe 주 저자, SPDK 기여, LMCache Committer ✅). **화두(⚠️ 문제 제기): 고객 관계(CRM)를 엔지니어까지.** 지금의 CRM은 경영진 ↔ 경영진, 영업 ↔ 구매 사이의 일이다. 앞으로는 **엔지니어 ↔ 엔지니어**까지 넓어져야 한다. 고객 엔지니어가 신뢰하는 상대는 같은 문제를 같은 언어로 푸는 엔지니어이고, 고객 · 국가마다 다른 언어와 문화를 이해하는 것도 그 관계의 일부다.

### 4.4 신호에 따른 비중 조정 (불변 전략)

모든 기술은 **기반은 지금 만들고, 제품화 비중은 신호로 정한다**(RS-9, [rs9-demand-inflection-sensing.md](../../wiki/strategies/invariant/rs9-demand-inflection-sensing.md)). 신호는 분기마다 다시 읽는다.

| 기술 | 확대 신호 (비중 ↑) | 축소 신호 (비중 ↓) |
|---|---|---|
| 고DWPD | 고객 RFQ의 DWPD 요구 상승, KV 캐시 SSD 쓰기 실측 증가, 에이전트 휴면 스냅샷의 로컬 SSD 계층화(Google Agent Substrate 로드맵). **2TB · 30 DWPD 독립 과제 승격**: 고객 요구 확인 `[사내 확인]` | 모델 KV 압축 확산(SSD 1/8 사례), 오프로드 정책의 쓰기 억제 강화, CXL 메모리가 KV 계층 흡수 |
| Mixed Media | 고객 RFQ에 영역 · 비율 요구 등장, 서버 · 건물 내용연수 연장 지속, CapEx 절감 | 직접 쓰기 QLC 확산(SLC 버퍼 없는 UltraQLC류), 신규 그린필드 캠퍼스 중심 증설 |
| 고용량 | 데이터센터 지연 · 규제 확대, AI 랙 전력 밀도 상승, 245TB 채택 확산, **에이전트 VM 실사용 증가 · 사용자 수 확대**(Muse · dots) | 전력망 완화 · 건설 가속, 에이전트 상태의 HDD · 오브젝트 계층 흡수 |
| (재검토) GPU 직결 고IOPS | NVIDIA SSD 요구 사양 공개, 첫 프로덕션 배치, PCIe Gen7 통합 일정, 고객 RFQ에 512B IOPS | 지금은 제외 |

### 4.5 단계와 첫 90일

| 단계 | 시기 | 무엇을 |
|---|---|---|
| 1 공통 기반 | 2026 하반기 ~ 2027 상반기 | FDP · 구성 가능성 · 텔레메트리 플랫폼, 출하 시 구성 SKU 시제 |
| 2 고객별 공동 설계 | 2027 | 전략 고객 1~2사와 고DWPD 의제 착수(트레이스 · WAF 실측), 오픈소스 · 커널 기여 |
| 3 규격과 제품 결정 | 2028 전후 | NVMe · OCP 제안 반영, 2TB · 30 DWPD 독립 과제 여부 결정 |

**계약의 창**: 공급자 우위가 이어지는 2026년 4분기 ~ 2027년 상반기(2027년 하반기 공급 완화 전망 🟡) 안에 기술 협력을 계약에 담는다.

**첫 90일**(덱에서는 발표자 노트): ① 전략 고객 1~2사 선정과 FDP 공동 설계 의제 매칭(Mixed Media 등은 요구 스펙 정리), MYD 협상에 기술 협력 항목 제안 ② Co-Design Pod 구성 ③ 시스템 SW 전문가 채용 착수 ④ 고객 트레이스로 WAF · 작은 쓰기 비중 실측(pSLC 비율 근거) ⑤ 신호 대시보드(§4.4) 가동.

### 4.6 성과 지표

| 축 | 지표 |
|---|---|
| 공동 설계 | 공동 설계 의제를 가진 고객 수, 고객 시스템에서 켜진 기능(FDP · 영역 · LBA Status) |
| 이익 | 2TB · 30 DWPD 운영점의 다이 사용량(SSD 혼자 대비), Mixed Media의 pSLC 비율 대비 QLC WAF · p99.9 개선 |
| 생태계 | 업스트림 머지 건수(KV 캐시 관리자 · SPDK · 커널), 채택된 규격 제안 수 |

---

## 5. 리스크와 반론

| 리스크 · 반론 | 대응 |
|---|---|
| 신호가 틀릴 수 있다 | 단정하지 않고 분기마다 신호를 다시 읽는다(§4.4). 이 보고서의 판단은 지금 예측 가능한 범위 안의 최선이다 |
| 여러 기술을 하면 자원이 분산된다 | 공통 기반(§2.5)에 먼저 투자하고, 제품화 비중은 신호로 조정한다 |
| 2TB · 30 DWPD는 SLC로 충분하다 | 맞다. 다만 같은 SLC 모드에서도 고객 배치 정보로 다이가 약 60% 준다. 이익은 고객 협력에서 나온다 |
| KV 캐시 고DWPD가 사라질 수 있다 | 고DWPD에서 만든 FDP · SLC 모드 기술은 Mixed Media의 pSLC 영역으로 재사용된다 |
| pSLC가 QLC $/TB를 잠식한다 | 셀당 비트 1/4이라 비율이 핵심이다. 고객 요구 0.5~2%(손실 약 1.5~8%) 구간에서 고객 워크로드로 검증한다 |
| SLC 버퍼 없이 직접 쓰는 QLC가 이길 수 있다 | 신호(§4.4 축소)로 본다. 작은 쓰기 비중이 낮은 고객에게는 Mixed Media가 필요 없다 |
| 에이전트 수요는 아직 초기다 | Muse · dots VM 사양은 제3자 관측이고(공식 비공개), 실사용은 할당의 0.6~1.7%다. 10EB는 할당 기준 상한으로 읽고, 실사용 증가와 휴면 스냅샷의 로컬 SSD 계층화(Google 로드맵)를 신호로 갱신한다 |
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
| F-11 | Micron ↔ Anthropic 계약 4요소 · Palantir · OpenAI FDE(명시적 대 실제 요구 · 검증 단계 · 고객 인프라 코드 · 현장 해법 → 제품) | 🟡 | [micron-anthropic-sca](../../sources/articles/micron-anthropic-sca-2026-06-22.md) · [palantir-fde](../../sources/articles/palantir-fde-model-2026-07.md) |
| F-12 | Mixed Media 논리: 쓰기 75%가 16KiB 이하 · WAF 70+ → 1.02 · VoC pSLC 0.5~2% · Slot Tax · 출처 귀속 정정 | 🟡 / ⚠️ / ✅ | [ssd-mixed-media-hyperscaler-logic-2026-10.md](../../sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md) MX-01~MX-77 |
| F-13 | 사용자 제공 Mixed Media 분석(원문) | 원본 | [user-mixed-media-hyperscaler-analysis-2026-10-03.md](../../sources/raw-notes/user-mixed-media-hyperscaler-analysis-2026-10-03.md) |
| F-14 | 에이전트 VM 스토리지 프로파일(Muse · dots · 휴면 · 스냅샷 경로), 멀티테넌트 QoS(FlashBlox 3.1배 · WARP WAF 3.0), 드라이브 활용률 | ✅ / 🟡 / ⚠️ | [agent-vm-and-cloud-ssd-requirements-2026-10.md](../../sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md) AV · CQ · AT |
| F-16 | 핵심 기술 6가지 × 제품군 × 고객 협력의 깊이(결합도 × 스펙 비완결도, 선정 FDP. v1.5의 4기준 점수는 기록으로) | ⚠️ 과제팀 판단(근거 사실은 ✅ / 🟡) | [ssd-core-technologies-customer-collaboration.md](../../wiki/concepts/ssd-core-technologies-customer-collaboration.md) |
| F-17 | FDP 파라미터 민감도(RU 크기 · RUH 수 · 분류 정확도) | ⚠️ 시뮬레이션(모델, 실측 아님) | [fdp-parameter-sensitivity-simulation.md](../../wiki/concepts/fdp-parameter-sensitivity-simulation.md) · `scripts/fdp_waf_sim.py` |
| F-15 | 제품군 정격 DWPD · 최대 용량(FL6 · XTR · P5810 · PS1010 · PS1030 · PM1743 · LC9 · P5336) | 🟡 | [wcssd-v1](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md) §1 · [qlc-v6-purchase-criteria](../../sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md) A15 · A19 · A20 · A23 |

---

## 7. 슬라이드 4장 (덱 v2.5)

상세는 [ssd-future-ready-strategy-outline.md](../presentation/ssd-future-ready-strategy-outline.md).

| 장 | 제목(액션 타이틀) | 주장 → 그래프 |
|---|---|---|
| 1 배경 | SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터 응용마다 SSD에 요구하는 특성이 다릅니다 | HBM 점유율 슬로프 · 응용 카드 4장(카드당 그래프 하나: 범용 = 클라우드 사업자 로고 + VM 여러 개가 공유 SSD를 나눠 쓰는 그림 + p99 섞어 3.1× 대 격리 1 / AI 학습 = NVIDIA + GPU당 읽기 0.16 대 0.49 GB/s ×3 / AI 추론 = DWPD 로그 막대 / 에이전트 = Muse · Dot + 휴면 격자 + VM 디스크 100GB 대 메모리 7.75GB) · 제품군 × 응용 매트릭스 · 결론 밴드 "SLC부터 QLC까지 다양한 제품 포트폴리오" |
| 2 핵심 기술 | 핵심 기술 여섯 가지 중 다섯은 명확한 스펙으로 풀리지만, FDP는 고객과 함께 설계해야 제대로 동작합니다 | 왼쪽 "어떤 제품군에 쓰이나" 6 × 4 점 매트릭스(FDP 행 Blue) / 오른쪽 "고객과 어떻게 협력하나" 구역 산점도(가로 고객 시스템과 함께 설계되는 정도, 세로 스펙만으로 안 닫힘, 구역 SSD 안에서 · 스펙으로 협력 · 공동 설계 필수, FDP 큰 점 + CacheLib WAF 혼자 3.22 대 함께 1.03), 밴드 "스펙을 정확히 받든 함께 설계하든, 핵심 기술을 제대로 확보하려면 고객과의 협력이 필수입니다" |
| 3 당위성 | 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다 | 아래 정격 DWPD 점도표(6개 업체 대표 제품 41개 = 세대 대표 최고 등급 33 · QLC 8, 업체별 색 · 삼성 Blue, 최고 등급 중앙값 10 → 5 → 3, QLC 0.2~0.6, 고객 캐시 3~7.2 띠, 흐린 추세 화살표 10 → 1, 로그 축; 전체 226개 집계는 노트) · 계단 3칸(ECC 약 60배 완결 / WAF ≈ 3 부분 성공 + SSD 내부 기술 스택(FTL · ECC → GC · 웨어 레벨링 → 핫 · 콜드 추정 · 스트림 분리 2014~17 · IO 결정성 2019) / WAF 3.22 → 1.03 다음 칸 + 주요 DC 기업의 자체 SSD 막대(Google 2016 · Alibaba 2016 · AWS 2020, 덱 v2.2에서 주요 3사로 축소, 나머지는 §3.4 표)) |
| 4 실행 | 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다 | ① 계약 적층(지금 Multi-Year Deal(MYD) → MYD 위에 운영 통합 · 공동 설계, 자본 연계 선택) ② 사람: 지금 스펙 문서 → 고객 AI 데이터센터 안 세 가지 핵심 업무 그림 카드(측정 · 분석: 분포 막대 + 돋보기 / 최적화 · 평가: KV 캐시 · 커널 · SSD 층 + 공동 최적화 화살표 / 기술 교류: 엔지니어 둘 + 말풍선 + SSD) ③ 역량 격자 + CRM 관계도(삼성 · 고객 × 경영진 · 영업/구매 · 엔지니어, 괄호 지금 대 앞으로, 엔지니어 줄에 언어 · 문화). 90일은 노트 |
| 결론 밴드 | 실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다 | |
