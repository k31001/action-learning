---
type: report
status: v1.0 (2026-09-28)
deck: outputs/presentation/ssd-survival-strategy.pptx (3장, v1.3)
outline: outputs/presentation/ssd-survival-strategy-outline.md
sources:
  - sources/articles/qlc-v9-hbm3-designin-causes-2026-09.md
  - sources/articles/qlc-essd-market-size-forecast-data-2026-09.md
  - sources/articles/qlc-essd-history-2022-background-2026-09.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/component-to-system-solution-ladder-facts-2026-09.md
  - sources/articles/samsung-kv-cache-activities-2026-09.md
  - sources/articles/micron-anthropic-sca-2026-06-22.md
  - sources/articles/palantir-fde-model-2026-07.md
  - sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md
  - sources/raw-notes/song-yongho-ax-pi-interview-2026-09-03.md
wiki:
  - wiki/concepts/hbm-market.md
  - wiki/concepts/hbm-to-storage-spillover.md
  - wiki/concepts/qlc-ssd-market.md
  - wiki/concepts/high-dwpd-operating-point.md
  - wiki/concepts/solution-ladder-component-to-system.md
  - wiki/concepts/fdp-placement-mechanics.md
  - wiki/concepts/ssd-configurability-boundary.md
  - wiki/strategies/qlc-execution-strategy.md
  - wiki/strategies/qlc-workload-capability-phases.md
last_updated: 2026-09-28
---

# 다운턴에서 배운 SSD 생존 전략: 3장 덱의 전략 해설

> **문서 성격**: 3장 발표 덱([ssd-survival-strategy.pptx](../presentation/ssd-survival-strategy.pptx))이 무엇을 주장하고 왜 그렇게 판단했는지를 풀어 쓴 전략 해설서다. 슬라이드는 그림으로 말하고, 이 문서는 그 그림 뒤의 논리와 근거를 적는다. 슬라이드 설계(좌표·시각 요소)는 [기획서](../presentation/ssd-survival-strategy-outline.md)에 있다. 모든 수치는 위키와 `sources/` 원장에 근거하며, 등급은 ✅(1차 원문 확인) · 🟡(2차 또는 검색 요약) · ⚠️(파생·가정)이다.

---

## 0. 요약

**세 장의 제목을 이어 읽으면 전략 전체가 된다.**

> HBM의 교훈은 고객과 함께 수요를 읽는 것이며, 다음 수요인 AI 스토리지는 높은 DWPD를 요구합니다. NAND의 한계는 SSD 안에서 풀어 왔지만, DWPD 장벽은 서버와 함께 WAF를 낮춰야 풀립니다. 그래서 계약에 기술 협력을 묶고, 고객 안에 사람을 두고, AI 데이터센터 운영자 수준의 시스템 SW 역량을 갖춰야 합니다.

| 장 | 질문 | 답 | 결정적 근거 |
|---|---|---|---|
| 1 배경 | 다운턴에서 무엇을 배웠고, 다음 수요는 어디에 있나 | 고객과 함께 수요를 읽어야 한다. 다음 수요는 KV 캐시가 내려오는 SSD이고, 그 수요는 높은 DWPD를 요구한다 | HBM 점유율 격차 45%p(2Q25), eSSD 수요 중 AI KV 캐시 350EB(2030e), DWPD 현 수준 0.3~1 대 요구 3~30 |
| 2 솔루션 | 높은 DWPD를 어떻게 푸나 | TCO를 지키려면 WAF를 낮춰야 하고, WAF는 서버가 주는 데이터 배치 정보로만 근본적으로 낮아진다 | FDP 적용 WAF ≈3 → ≈1, WAF 1이면 범용 TLC의 SLC 모드로 30 DWPD 도달 |
| 3 실행 | 무엇을 바꿔야 하나 | 계약(물량 + 기술 협력), 사람(고객 상주), 역량(시스템 SW와 AI 데이터센터 운영) | Micron ↔ Anthropic 전략적 계약, Palantir FDE, LMCache 외 KV 캐시 관리자 3종에 삼성 기여 0 |

**한 줄 결론**: 다음 호황의 승부는 좋은 SSD를 만드는 능력이 아니라 **고객 시스템 안에서 WAF를 함께 낮추는 능력**에서 갈린다. 그 능력은 계약·사람·역량을 함께 바꿀 때 생긴다.

---

## 1. 배경: 다운턴의 교훈과 다음 수요

### 1.1 HBM에서 수요를 늦게 읽었다

**사실 (그래프가 말하는 것)**

| 시점 | SK하이닉스 | 삼성 | 출처 |
|---|---|---|---|
| 2022 | 50% | 40% | TrendForce 2023-04-18 ✅ |
| 2023 (전망) | 53% | 38% | 같은 자료 🟡 |
| 2024 | 54% | 39% | [hbm-market.md](../../wiki/concepts/hbm-market.md) |
| 2Q25 | 62% | 17% | Counterpoint 🟡 |
| 3Q25 | 57% | 22% | Counterpoint 🟡 |
| 1Q26 | 약 58% | 약 32% | Counterpoint 🟡 |

- 2023년 다운턴을 지나며 격차가 벌어져 **2025년 2분기에 45%p**가 됐다. 2025년 1분기에는 DRAM 점유율 1위가 33년 만에 SK하이닉스로 넘어갔다(TrendForce · Korea Herald 🟡). 삼성은 2025년 4분기에 DRAM 점유율 1위를 되찾았고 HBM 점유율도 회복 중이다 ([dram-market-share.md](../../wiki/concepts/dram-market-share.md)).
- HBM 점유율 시계열은 TrendForce(2022~2024)와 Counterpoint(2025 이후)가 섞여 있어 집계 기준이 다를 수 있다. 절대값보다 **추세**로 읽는다.

**복기 (과제팀의 해석)**

슬라이드는 이 부분에 "복기" 라벨을 달아 사실과 구분한다.

1. 시장 규모를 작게 봤다
2. 그래서 개발 리소스를 적극적으로 투입하지 않았다
3. AI 시대의 첫 메모리 호황에서 선두를 내줬다

만약 NVIDIA 같은 고객과 긴밀하게 소통하고 협업했다면 AI 수요에 대해 더 적절한 판단을 내릴 수 있었을 것이다. 같은 진단이 안팎에서 나왔다.

- **신문섭(Bain 파트너, 2026-06-18)**: "앞으로의 승부는 칩을 많이 파는 기업이 아니라, **고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업**이 가져갈 것이다." ([인터뷰](../../sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md))
- **송용호(AX/PI센터장, 2026-09-03)**: "메모리는 부품이고, 이 부품이 어떻게 쓰일지는 시스템을 설계하는 사람 마음에 있다. **그걸 알았으면 HBM을 진작 준비했을 것이다.**" ([인터뷰](../../sources/raw-notes/song-yongho-ax-pi-interview-2026-09-03.md))

> **표현상 주의**: 2026-09-23 QLC 덱 작업에서는 "시장을 작게 봤다"를 해석으로 보고 "전략적 우선순위가 약화되었다"로만 쓰기로 했었다. 이번 덱은 사용자 지시에 따라 복기 문구를 쓰되, 과제팀 회고임을 라벨로 밝혔다. 2022년 design-in의 1순위 원인이 **양산 시점**이었다는 분석([hbm3-designin-lesson.md](../../wiki/concepts/hbm3-designin-lesson.md))과도 모순되지 않는다. 양산 시점을 앞당기는 것은 결국 수요 판단과 리소스 투입의 문제이기 때문이다.

**교훈**: 고객과 함께 수요를 만드는 기업이 미래를 선점한다. 이번에는 다음 AI 수요를 놓쳐서는 안 된다.

### 1.2 다음 수요: KV 캐시가 SSD로 내려온다

LLM 추론은 대화 문맥을 KV 캐시로 저장한다. 문맥이 길어지고 동시 사용자가 늘면 KV 캐시가 GPU의 HBM을 넘어 **서버 DRAM, 그리고 NVMe SSD로 내려온다**(KV 캐시 오프로딩). SK하이닉스도 2026년 7월 실적 발표에서 "KV 캐시를 담을 HBM 용량이 한계에 도달"했다고 진단했다 🟡.

이것은 HBM에서 SSD로의 **이동**이 아니라 HBM 아래에 새 계층이 **더해지는** 것이다([hbm-to-storage-spillover.md](../../wiki/concepts/hbm-to-storage-spillover.md)). 그래서 덱은 "이동한다"가 아니라 "내려온다"고 쓴다.

**eSSD 수요와 AI 비중** (과제팀 모델, 2026년 이후 전망 ⚠️)

| 연도 | 2022 | 2024 | 2025 | 2026e | 2028e | 2030e |
|---|---|---|---|---|---|---|
| eSSD 수요 (EB) | 155 | 210 | 265 | 340 | 600 | 1,000 |
| 그중 AI 추론 KV 캐시 (EB) | 0 | 0 | 0 | 35 | 175 | 350 |
| QLC 비중 | 4% | 14% | 20% | 30% | 44% | 55% |

- 모델은 TrendForce 실측(2024년 QLC eSSD 30EB, 전년 대비 4배 ✅), TechInsights 데이터센터 NAND 전망, SanDisk의 KV 캐시 수요 전망을 조합했다. 가정은 [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §4.3에 있다.
- 고객이 **고용량 QLC**를 선호하는 이유는 랙 공간과 전력이다. Meta는 QLC 서버의 바이트 밀도 목표를 TLC 서버의 **6배**로 잡았다(2025-03 🟡).

### 1.3 새 요구: 높은 DWPD

AI 스토리지 수요는 용량만이 아니라 **높은 쓰기 내구성(DWPD)**을 요구한다. 기존 SSD와 요구 수준 사이에 큰 갭이 있다.

| 구분 | DWPD | 근거 |
|---|---|---|
| QLC (245TB급) | 0.3 ~ 0.6 | Kioxia LC9 0.3 · 삼성 BM1773 0.6 (헤드라인 정격) |
| TLC (주력 eSSD) | 1 | Kioxia CM10 RI 등 |
| KV 캐시용 TLC SSD | 3 | Kioxia CM10 MU · Solidigm D7-PS1030 🟡 |
| KV 캐시 계층 실측 | 약 3.2 | StorageReview, 12.8TB × 8 RAID10 🟡 |
| 시스템 수준 주장 | 7~10+ · 최대 24 | ScaleFlux(유효) · Huawei OceanStor M900(3년) 🟡 |
| 고객 요구 상단 | 30 | `[사내 확인]` |
| SLC급 AI SSD 정격 | 50 ~ 120 | Kioxia GP1 · Phison X200Z · DapuStor X5 🟡 |

- **QLC 0.3 대비 요구 30은 최대 100배**다.
- 정격 30 DWPD 이상으로 출하된 SSD는 모두 SLC급 NAND(SLC · XL-FLASH · Z-NAND · SLC 모드) 또는 Optane 같은 SCM이다([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §2). 30 DWPD는 당장은 SLC급만 닿는다.
- 모든 요구를 TLC·QLC로 풀자는 것이 아니다. 중요한 것은 **고객이 높은 DWPD를 요구하기 시작했다**는 사실이다.

**반증도 함께 본다**: KV 캐시 오프로딩이 언제나 쓰기 집약적인 것은 아니다. DeepSpeed · FlexGen 트레이스는 읽기 편중이고, 삼성 기술 블로그(2026-08-25)도 "주로 읽기 집약적"이라고 썼으며, NVIDIA Dynamo는 SSD 수명 보호를 이유로 재사용 빈도가 높은 블록만 디스크로 내린다. 따라서 높은 DWPD는 **KV 캐시 전체가 아니라 교체가 잦은 활성 작업 집합 계층**의 성격이다([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §3).

### 1.4 명제

> **DWPD 갭을 메우는 기업이 AI 스토리지 시장을 가져간다.**

---

## 2. 솔루션: SSD 안에서 서버로

### 2.1 지금까지의 해법은 SSD 안에 있었다

NAND 솔루션은 NAND 플래시의 한계를 SSD 안에서 극복하며 발전해 왔다.

| 부품 | 한계 | 해법 |
|---|---|---|
| NAND | 비트 에러 | ECC (BCH → LDPC) |
| NAND | 제자리 덮어쓰기 불가(쓰기 전 소거), 셀 수명 편차 | FTL, 웨어 레벨링 → 여러 NAND를 하나의 SSD로 |
| SSD | 여러 사용자 간 QoS 간섭 | 멀티테넌트 격리 |
| SSD | 데이터 보호 | 보안 기능 |

지금까지는 **고객이 원하는 스펙대로 SSD를 잘 만들면** 됐다. 그러나 기능이 늘어도 **WAF의 근본 한계는 그대로** 남았다. 랜덤 쓰기 워크로드에서 SSD 내부 WAF는 3 안팎이다(삼성 · NVM Express FDP 실측, 50% 사용률 기준 🟡).

### 2.2 높은 DWPD를 만드는 세 갈래

DWPD는 `DWPD = P/E × (1 + OP) ÷ (WAF × 365 × 보증연수)`로 정해진다([solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md), F29 ✅). 올리는 길은 세 가지다.

| 길 | 산식의 항 | 대가 | 판단 |
|---|---|---|---|
| SLC 같은 비싼 셀 | P/E ↑ | 같은 다이에서 용량 1/4 이하 → **비용 ↑** | 30 DWPD 이상 초고내구 영역에서만 |
| 높은 OP | 사용자 용량 ↓ | 판매 가능 용량 ↓ → **용량 ↓** | 보조 수단 |
| **WAF 저감** | WAF ↓ | 용량 손실 없음, 호스트 협력 필요 | **TCO를 유지하는 길. 선택** |

고객은 여전히 TCO 절감을 원하므로 WAF를 줄이는 방향이 가장 적절하다. 효과는 산식으로 확인된다. 5년 30 DWPD의 조건은 `P/E × (원시/사용자 용량) = 54,750 × WAF`이다(⚠️ 파생).

| SLC 모드 P/E | WAF 1 (배치 정보 적용) | WAF 3 (배치 없음) |
|---|---|---|
| 60,000 (TLC의 SLC 모드, 2026 AI 제품) | **기본 OP로 충분** | OP 174% 필요 |
| 100,000 (산업용 최상) | 기본 OP로 충분 | OP 64% 필요 |

**WAF를 1로 낮추면 범용 TLC의 SLC 모드로도 30 DWPD에 닿는다.** WAF 3에서는 가장 좋은 SLC 모드로도 OP를 크게 늘려야 한다([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §5).

### 2.3 WAF를 낮추려면 서버의 정보가 필요하다

NAND는 페이지 단위로 쓰고 블록 단위로 지운다. **수명이 다른 데이터가 한 블록에 섞이면**, 짧은 데이터가 먼저 지워져도 긴 데이터가 남아 블록을 지울 수 없다. 남은 데이터를 다른 블록으로 복사하는 양이 곧 WAF다([fdp-placement-mechanics.md](../../wiki/concepts/fdp-placement-mechanics.md)).

문제는 **데이터가 언제 지워질지를 SSD는 모르고 호스트만 안다**는 것이다. KV 캐시라면 그 정보는 캐시 관리자(LMCache 등)의 퇴거 정책 안에 있다. 그래서 가장 효과적인 방법은 **고객 시스템이 데이터 배치 정보를 SSD에 넘겨주는 것**이다. 이것이 NVMe FDP(Flexible Data Placement)다.

### 2.4 기술 스택은 3단계로 진화했다

| 단계 | 시기 | 해법이 있는 곳 | 대표 기술 | WAF |
|---|---|---|---|---|
| 1. NAND를 SSD로 | 2000년대~ | SSD 컨트롤러 · FW, NAND | ECC · FTL · 웨어 레벨링 | ≈ 3 |
| 2. SSD 기능 고도화 | 2010년대~ | NVMe, 컨트롤러 | NVMe 멀티 큐, QoS · 멀티테넌트 · 보안 | ≈ 3 (근본 한계 그대로) |
| 3. **서버와 함께** | 2020년대~ | **NVMe · 커널 · AI 프레임워크** | Open-Channel(2017) · ZNS(2020)를 거쳐 **FDP(2022 비준)**, Linux 6.16 write stream(2025), **LMCache · vLLM · Dynamo**, 워크로드 구성형 SSD | **3 → 1** |

- 호스트 협력은 Open-Channel SSD(FTL을 통째로 호스트로, 채택 제한)와 ZNS(순차 쓰기 존)를 거쳐, 배치 힌트만 넘기는 **FDP가 가장 실질적인 대안으로 상용화**되고 있다.
- 효과는 공개 실측으로 확인된다: Meta CacheLib에 FDP를 적용해 **WAF 3.22 → 1.03**(EuroSys'25, 삼성 · Meta ✅).
- **AI 스토리지에서도 이미 시작됐다.** 삼성 엔지니어가 오픈소스 KV 캐시 관리자 LMCache에 NVMe FDP 배치 기능을 **2026-08-05에 머지**했다(PR #4016 ✅). 테넌트 버킷과 GPU 랭크별로 배치 핸들을 나누는 구조다. LMCache 블로그는 PM9D3a에서 합성 트레이스 WAF 2.600 → 1.425를 보고했다(🟡 원문 미열람, 슬라이드에는 쓰지 않음) ([samsung-kv-cache-activities-2026-09.md](../../sources/articles/samsung-kv-cache-activities-2026-09.md)).

### 2.5 고객마다 다르므로 워크로드 구성형 SSD로

고객마다 KV 캐시 작업 집합의 크기와 교체 횟수가 달라, 필요한 용량과 DWPD가 다르다. 하나의 고정 SKU로는 모든 고객을 맞출 수 없다. 그래서 **워크로드 구성형 SSD**로 진화한다([workload-configurable-ssd-report.md](workload-configurable-ssd-report.md)).

- **출하 시 구성**: OP · SLC 비율 · FDP 구성(RUH · RG)을 고객이 고른다.
- **운영 중 조정**: 배치 정책 · 배치 가중치 · 백그라운드 GC 강도를 운영 중에 조절한다.
- 경계는 NVMe 규격이 이미 그어 두었다. 배치는 운영 중에 바꿀 수 있지만 용량 · OP · SLC 비율 · FDP 구조는 드라이브가 비어 있을 때만 바꿀 수 있다([ssd-configurability-boundary.md](../../wiki/concepts/ssd-configurability-boundary.md)).

### 2.6 가장 크게 바뀌는 것

> 그동안은 고객이 원하는 스펙대로 SSD만 잘 만들면 됐다. **이제는 고객 시스템과 협력해 WAF를 낮추는 방식으로 일해야 한다.** NAND나 SSD만 잘 만들어서는 안 되고, 서버와의 협력이 필수이며, 그것을 위한 **기술 · 인재 · 고객 협력**이 필요하다.

---

## 3. 실행 전략: 계약 · 사람 · 역량

2장의 결론(기술 · 인재 · 고객 협력)을 실행하려면 세 가지가 바뀌어야 한다. 각각 검증된 선례를 벤치마크로 삼는다.

### 3.1 계약: 물량에 기술 협력을

**지금**: 고객과의 계약은 장기 물량 계약(LTA), 즉 수량과 가격의 약속이다.

**벤치마크: Micron ↔ Anthropic 전략적 계약 (2026-06-22)** ([원장](../../sources/articles/micron-anthropic-sca-2026-06-22.md))

| 요소 | 내용 |
|---|---|
| ① 공동 최적화 | Micron의 HBM · DRAM · 데이터센터 SSD를 Claude의 학습 · 추론 워크로드에 맞춰 함께 설계 · 최적화 |
| ② 다년 공급 | 데이터센터 전 포트폴리오 공급 |
| ③ 운영 통합 | Micron의 엔지니어링 · 제조 운영에 Claude 도입 |
| ④ 전략적 투자 | Anthropic Series H 참여 |

- 재무 조건은 비공개다. Micron은 이 외에도 전략적 고객 계약(SCA) 16건, 최소 계약 매출 약 $100B를 공시했다([micron-q3-fy26.md](../../sources/filings/micron-q3-fy26.md) 🟡).
- 외신의 공통 관전평은 "LTA의 다음 단계, **물량 락인 위에 로드맵 공동 설계와 자본 연계를 적층**한 구조"다.

**우리의 적용**: 전략 고객 1~2사와의 계약에 **다년 공급 위에 공동 설계 · 최적화와 운영 통합을 함께** 묶는다. 계약이 워크로드(KV 블록 트레이스, 캐시 관리자의 수명 정책)에 접근할 권리를 보장해야 2장의 WAF 저감이 가능하다. 자본 연계는 개발실 범위를 넘으므로 선택지로 둔다.

### 3.2 사람: 고객 안에 상주

**지금**: 스펙 문서와 간헐적 미팅으로 협력한다. 그래서 고객이 **명시한 요구만** 우리에게 온다.

**벤치마크: Palantir FDE(Forward Deployed Engineer)** ([원장](../../sources/articles/palantir-fde-model-2026-07.md))

- 엔지니어가 고객 환경 **안에 상주**하며 실제 운영 제약 아래서 시스템을 직접 만든다. 제품팀은 "한 능력, 많은 고객", FDE는 **"한 고객, 많은 능력"**이다.
- 청구 시간이 아니라 **성과(outcome)로 평가**받는다.
- 원거리 제품팀이 얻을 수 없는 맥락, 곧 **"명시된 요구"와 "실제 요구"의 간극**을 현장에서 메운다.
- 현장에서 만든 거친 해법이 제품의 표준 기능이 된다("gravel road → paved highway").
- 이 방식은 Anthropic · OpenAI의 엔터프라이즈 전략으로 채택됐다. 우리의 최대 고객이 이미 자기 고객에게 이렇게 들어가고 있다.

**왜 FDE가 필요한가: 수요를 함께 만드는 순환**

```mermaid
flowchart LR
  A[삼성 제품 · 로드맵] -- 사람이 들어간다 --> B[고객 AI 데이터센터<br/>Co-Design Pod 상주]
  B -- 매일 함께 --> C[고객 엔지니어]
  B -- 실제 요구가 나온다 --> A
  A -- 새 제품이 새 수요가 된다 --> B
```

사람이 고객 안으로 들어가면 실제 요구가 보이고, 그 요구가 제품이 되며, 그 제품이 다시 고객의 수요가 된다. **1장의 교훈인 "고객과 함께 수요를 만든다"를 조직으로 구현하는 방법이 FDE다.**

**우리의 적용**: 전략 고객 1~2사에 **Co-Design Pod(고객당 3~5명)**를 상주시킨다. 첫 임무는 고객이 말한 스펙과 캐시 관리자 코드가 실제로 요구하는 것의 간극을 문서화하는 것이다. 메모리는 SW보다 제조 리드타임이 길므로 상주 인력에 시스템 아키텍처 · 성능 · 전력 모델링 역량을 결합한다([dev-org-transformation.md](../../wiki/strategies/dev-org-transformation.md) §4.5).

### 3.3 역량: 고객처럼 운영하는 눈

AI 데이터센터를 운영하는 고객은 **토큰당 비용 · 전력 · GPU 가동률**로 말한다. 그 고객의 입장에서 문제를 볼 수 있어야 SSD의 WAF를 고객 시스템 안에서 낮출 수 있다.

| 계층 | 지금 | 필요한 기술 |
|---|---|---|
| AI 데이터센터 운영 | 없음 | TCO 모델 · 추론 SLO |
| KV 캐시 SW | **LMCache 한 곳** | Dynamo · Mooncake로 확장 |
| 커널 · I/O | 일부 (xNVMe · SPDK 기여) | io_uring · GDS · NIXL |
| SSD FW | 강점 | FDP · WAF 텔레메트리 강화 |
| NAND | 강점 | 유지 |

- **시작은 했다**: LMCache의 메인테이너 명단에 삼성 소속 Committer가 있고, 삼성 연결 커밋이 62건(전체 2,394건 중)이며, NVMe raw block 계층과 FDP 배치를 머지했다 ✅.
- **아직 한 곳이다**: NVIDIA Dynamo(KVBM) · Mooncake · FlexKV에는 삼성 기여가 0건이다 ✅. 고객이 실제로 쓰는 스택으로 넓혀야 한다.
- 우리가 그동안 갖지 못한 것은 **시스템 소프트웨어**, 특히 **AI 데이터센터를 운영하는 고객 수준의 전문성**이다. 이를 위해:
  1. 채용 기준을 "SSD를 아는가"에서 **"고객 시스템을 아는가"**로 바꾼다(추론 엔진 · 캐시 관리자 · I/O 경로를 읽고 고칠 수 있는 사람).
  2. 고객이 있는 **미주 현지 채용**을 늘린다.
  3. 펌웨어 · FTL 엔지니어를 호스트 SW로 전환하는 트랙을 만든다(미국 로테이션 6~12개월, **업스트림 머지로 수료**).
  4. 기여자에서 **오픈소스 메인테이너**로, 고객이 이름으로 부르는 아키텍트로 키운다.

### 3.4 시계와 순서

**계약의 창은 2026년 4분기부터 2027년 상반기다.** NAND 공급 부족으로 공급자가 협상력을 가진 기간은 2027년 하반기 공급 완화(TrendForce 전망 🟡) 전까지다. 이 기간에 물량 확약과 교환해 워크로드 접근권과 기술 협력을 계약으로 고정해야 한다([qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §2.1).

| 단계 | 시기 | 기술 | 사람 · 역량 | 고객 협력 |
|---|---|---|---|---|
| 1 디바이스를 준비한다 | 2026 하반기 | 출하 시 구성 SKU (OP · SLC 비율 · RUH 16+) | 시스템 SW 전문가 채용 · 미주 현지 | 전략 고객 1~2사 선정 · Co-Design Pod 상주 |
| 2 워크로드로 최적화한다 | 2027 | 운영 중 조정 (배치 정책 · GC 강도 · WAF 감시) | FW · FTL → 호스트 SW 전환 트랙 | LMCache · vLLM · Dynamo에 FDP 경로 업스트림 |
| 3 고객 시스템과 함께 설계한다 | 2028~ | 워크로드 구성형 플랫폼 (런타임 WAF 대응) | 오픈소스 메인테이너 · 호명되는 아키텍트 | 전략적 협약 (공동 설계 · 다년 공급 · 워크로드 접근) |

**첫 90일**: 전략 고객 1~2사와 기술 협력을 포함한 계약 협상 · Co-Design Pod 구성과 상주 · 시스템 SW 전문가 채용 착수.

### 3.5 성과 지표

| 축 | 지표 | 이유 |
|---|---|---|
| 기술 | **고객 시스템에서 FDP가 실제 활성화된 SSD 용량** | 지원 출하량만 세면 쓰이지 않는 기능이 된다([fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §5) |
| 인재 | **업스트림 머지 건수**(캐시 관리자 · 커널 · I/O) | 코드가 고객 스택에 들어갔다는 가장 확실한 증거 |
| 고객 협력 | **워크로드를 공유한 고객 수** · Pod 상주 고객 수 | 워크로드가 와야 최적화할 수 있다 |

---

## 4. 리스크와 반론

| 리스크 · 반론 | 대응 |
|---|---|
| KV 캐시 오프로딩은 읽기 편중이다 | 고DWPD는 **교체가 잦은 활성 작업 집합**에 한정해 주장한다. 대용량 계층은 QLC 1~3 DWPD로 대응(QLC 전략) |
| 30 DWPD 요구의 공개 근거가 없다 | 고객 요구로 `[사내 확인]` 표기. 공개 근거는 3(제품 정격) · 24(Huawei 시스템)까지 |
| FDP는 호스트가 써 줘야 효과가 난다 | 그래서 Co-Design Pod와 업스트림 기여가 전략의 중심이다. 배치가 섞이면 효과가 줄어든다는 점은 런타임 WAF 대응으로 보완([waf-runtime-response.md](../../wiki/concepts/waf-runtime-response.md)) |
| 공급 완화 후에는 협상력이 줄어든다 | 계약의 창(2026 4Q ~ 2027 상반기) 안에 기술 협력을 계약으로 고정 |
| 벤치마크 계약의 재무 조건을 모른다 | 공개된 구성 요소만 벤치마크하고 조건은 우리 협상으로 정한다 |
| HBM 복기는 해석이다 | 슬라이드에 "복기" 라벨. 사실은 점유율 추세만 주장 |

---

## 5. 근거 대장

| # | 주장 | 등급 | 출처 |
|---|---|---|---|
| S-1 | HBM 점유율 2022 SK 50 / 삼성 40, 2023 전망 53 / 38 | ✅ / 🟡 | TrendForce 2023-04-18 · [qlc-v9-hbm3-designin-causes-2026-09.md](../../sources/articles/qlc-v9-hbm3-designin-causes-2026-09.md) C-08 |
| S-2 | HBM 점유율 2Q25 62 / 17, 3Q25 57 / 22, 1Q26 약 58 / 약 32 | 🟡 | Counterpoint · [hbm-market.md](../../wiki/concepts/hbm-market.md) |
| S-3 | 1Q25 DRAM 점유율 1위 교체(33년 만), 4Q25 삼성 1위 탈환 | 🟡 | TrendForce · Korea Herald · [dram-market-share.md](../../wiki/concepts/dram-market-share.md) |
| S-4 | 신문섭 · 송용호 인터뷰 | ✅ (과제팀 기록) | [expert-interview](../../sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md) · [song-yongho](../../sources/raw-notes/song-yongho-ax-pi-interview-2026-09-03.md) |
| S-5 | eSSD 155 → 1,000EB, KV 캐시 350EB, QLC 4 → 55% | ⚠️ 모델 | [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §4 · `assets/qlc_model.csv` |
| S-6 | 2024년 QLC eSSD 30EB, 전년 대비 4배 | ✅ | TrendForce 2024-04-23 · [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) |
| S-7 | Meta QLC 서버 바이트 밀도 목표 TLC의 6배 | 🟡 | Meta 2025-03 · [qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) |
| S-8 | DWPD 현 수준(QLC 0.3~0.6 · TLC 1)과 KV 캐시 공개 수치(3 · 3.2 · 7~10+ · 24 · 50~120) | 🟡 | [wcssd-v1-high-dwpd-configurable-2026-09.md](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md) · [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) |
| S-9 | 정격 30 DWPD 이상 제품은 모두 SLC급 NAND 또는 SCM | 🟡 / ⚠️ 판정 | 같은 원장 §1 |
| S-10 | 30 DWPD 조건 `P/E × (원시/사용자) = 54,750 × WAF` | ⚠️ 파생 | 같은 원장 §2-C · F29 |
| S-11 | 호스트 협력 연혁 Open-Channel(2017) · ZNS(2020-06) · FDP(2022-11) · Linux 6.16(2025) | ✅ / 🟡 | [component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) |
| S-12 | CacheLib + FDP WAF 3.22 → 1.03 | ✅ | EuroSys'25 · 같은 원장 |
| S-13 | LMCache: 삼성 Committer 1명, 커밋 62 / 2,394, FDP 배치 머지(2026-08-05, PR #4016). Mooncake · FlexKV · Dynamo KVBM 0 | ✅ | [samsung-kv-cache-activities-2026-09.md](../../sources/articles/samsung-kv-cache-activities-2026-09.md) |
| S-14 | LMCache 블로그 PM9D3a WAF 2.600 → 1.425 | 🟡 원문 미열람 | 같은 원장 A-20 |
| S-15 | Micron ↔ Anthropic 계약 4요소, 재무 조건 비공개 | 🟡 | [micron-anthropic-sca-2026-06-22.md](../../sources/articles/micron-anthropic-sca-2026-06-22.md) |
| S-16 | Micron SCA 16건 · 최소 계약 매출 약 $100B | 🟡 | [micron-q3-fy26.md](../../sources/filings/micron-q3-fy26.md) |
| S-17 | Palantir FDE 원리, Anthropic · OpenAI 채택 | 🟡 | [palantir-fde-model-2026-07.md](../../sources/articles/palantir-fde-model-2026-07.md) |
| S-18 | 2027년 하반기 공급 완화 전망 | 🟡 | TrendForce 2026-07-30 · [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) |

## 6. 슬라이드와의 대응

| 슬라이드 | 이 문서의 절 |
|---|---|
| 1장 ① 교훈: HBM 수요를 늦게 읽었다 | §1.1 |
| 1장 ② 다음 수요: KV 캐시가 SSD로 | §1.2 |
| 1장 ③ 새 요구: 높은 DWPD · 명제 밴드 | §1.3 · §1.4 |
| 2장 상단 범위 체인 · 세 갈래 | §2.1 · §2.2 · §2.3 |
| 2장 하단 기술 스택 3단계 · 결론 밴드 | §2.4 · §2.5 · §2.6 |
| 3장 ① 계약 · ② 사람 · ③ 역량 · 시작 밴드 | §3.1 · §3.2 · §3.3 · §3.4 |
