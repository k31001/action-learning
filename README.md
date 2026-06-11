# 삼성전자 메모리사업부 — Shell 시나리오 플래닝

## 개요

AI 데이터센터 수요 폭증 시대의 불확실성에 대응하기 위해 Shell의 시나리오 플래닝 방법론으로 삼성전자 메모리사업부의 전략을 수립하는 프로젝트입니다. 메모리는 사상 최고 호황(2026년 시장 +134% YoY)을 누리는 동시에 SK하이닉스에 33년 만에 DRAM 1위를 내준 **"호황의 함정"** 에 처해 있습니다. 통제 불가능한 두 변수 — **AI 수요 지속성(DF1) × 미중 디커플링 강도(DF2)** — 를 축으로 5개의 대안적 미래를 도출하고, 어떤 시나리오가 와도 작동하는 전략을 수립합니다.

이 레포는 단발 보고서가 아니라 **살아있는 위키**입니다. 새 자료가 들어올 때마다 위키(진실의 원천)를 갱신하고, 대시보드·보고서·발표자료는 위키에서 파생되는 빌드 산출물로 동기화합니다. 자세한 운영 규칙은 [`CLAUDE.md`](CLAUDE.md)(위키 관리자 헌법) 참조.

---

## 라이브 대시보드

### 🔗 https://action-learning.vercel.app

React + Vite로 빌드해 Vercel에 자동 배포되는 Early Warning Indicator 대시보드입니다.

| 영역 | 내용 |
|------|------|
| **Planning** | 시나리오 사분면(DF1×DF2), 구동력 포지션 궤적, 시나리오 전환 트리거 |
| **Strategy** | 9개 Robust 전략 × 5 시나리오 가치 매트릭스(45셀), 메인벳/사이드벳, 의사결정 추적 |
| **Data Viz › AI DC** | 전 세계 AI 데이터센터 착공 트래커 — 세계 지도, 9단계 라이프사이클, 운영사별 누적 용량, 메모리 수요 환산 |
| **Bottleneck Model** | 2030 병목 정량 모델(전력·CAPEX·파운드리·패키징 min() 제약·what-if·수급 곡선) + 상류 드라이버 트리(depth 1~2) + 수요 변곡 EWI(인과 사슬·괴리·실측 추이) 통합 |
| **결정** | 17개 즉시 결정을 마감(D-150/240/330) 묶음으로 추적, KPI 연동 |
| **업데이트 내역** | 매 빌드 사이클의 변경 타임라인 |

실시간 데이터: Vast.ai 공개 API(GPU 현물 임대가·공급), Yahoo Finance(NVDA·MU·HYG 프록시)를 일 1회 자동 갱신.

---

## 방법론: Shell 시나리오 플래닝

```
Focal Issue 정의
    ↓
STEEP 요인 브레인스토밍 (50개)
    ↓
Impact × Uncertainty 매트릭스 → 핵심 Driving Forces 선별 (DF1·DF2)
    ↓
시나리오 매트릭스 (2×2 + 와일드카드)
    ↓
시나리오 내러티브 (5개)
    ↓
Main Bet (시나리오 B: AI 르네상스, 35%) + Side Bets
    ↓
Robust 전략 (RS-1~RS-9) — 모든 시나리오에서 유효
    ↓
Early Warning Indicators 대시보드 + 시나리오 전환 트리거
```

### Focal Issue
> AI 메모리 시대인 2030~2035년에도 글로벌 리더십을 유지하기 위해, 어떤 전략적 결정을 지금(2026년) 내려야 하는가?

### 5개 시나리오

| 시나리오 | DF1 (AI 수요) | DF2 (미중관계) | 확률 |
|---------|-------------|--------------|------|
| A: 황금 요새 | AI 지속 | 디커플링 | 26% |
| **B: AI 르네상스** ⭐ Main Bet | AI 지속 | 공존 | **35%** |
| C: 기술 냉전 | AI 붕괴 | 디커플링 | 10% |
| D: 조용한 재편 | AI 붕괴 | 공존 | 23% |
| E: 패러다임 전환 (와일드카드) | AI 지속(변형) | 양쪽 가능 | 6% |

> 확률은 AI DC 착공 트래커(55.9GW)와 수요 변곡 EWI(공급 과잉 경계)를 반영해 B·D를 상향(2026-06). 시나리오 이름은 좋고 나쁨 없이 중립적.

---

## 9개 Robust 전략 (시나리오 불문 즉시 실행)

네 개의 거버넌스 축으로 묶었습니다.

| 축 | 전략 | 핵심 내용 |
|----|------|---------|
| **공급 거버넌스** | RS-1 옵션형 캐파 | "켜고 끌 수 있는" 증설 유연성 — Fab Shell + 장비 단계 반입 |
| | RS-5 재무 규율 + 재투자 | 다운사이클 capex 하한(4조 원/년) 사수, HBM 초과이익 원가·수율·패키징 재투자 |
| | RS-9 수요 변곡 센싱 ⭐NEW | DC 착공 추적 + 수요 변곡 EWI 앙상블로 하락 변곡을 선행 신호에서 먼저 포착 |
| **포트폴리오** | RS-2 바벨 포트폴리오 | HBM/커스텀 ↔ 저원가 범용 1c nm, 중간 제품 축소 |
| | RS-6 공정 리더십 | 1c nm DRAM + NAND 4트랙 + 자체 Hybrid Bonding IP |
| **고객 관계** | RS-3 고객 전환비용 | CMX·SCADA·FDP 통합 + Asset-Light SW 매출로 락인 |
| | RS-4 고객 분산 | LTA·Take-or-Pay, 단일 고객 ≤25%, 소버린 다변화 |
| **신규 도구** | RS-7 AI 엔지니어링 자동화 | 잉여 인력을 RS-2·3·6에 전환 배치 (모든 RS의 prerequisite) |
| | RS-8 구조화 매출 헷지 | Participating Forward + HTA + Memory Trading Desk로 매출 변동성 ±25%→±12% |

### Main Bet: "AI 르네상스" (시나리오 B)
- 2026년 내 **HBM4 NVIDIA 인증 회복**이 최우선 과제 (KPI 윈도우는 HBM4E·HBM5로 이동 검토)
- **1c nm 공정 전환**으로 원가 우위 복원
- **NVIDIA CMX** 에코시스템 공식 공급 파트너(PM1753) 지위 심화 → HBM + SSD 이중 수혜
- 동서 균형 공급(텍사스 테일러 + 인도) — 디커플링·공존 양쪽 대응

---

## 최근 추가: 메모리 수요 선행 지표 체계

위키와 대시보드에 두 개의 메모리 수요 선행 관측 도구를 신설했습니다 (DF1 공식 센싱 도구).

### ① AI 데이터센터 착공 트래커 — [`wiki/concepts/ai-datacenter-buildout.md`](wiki/concepts/ai-datacenter-buildout.md)
- 전 세계 AI DC **47건·17개국·55.9GW**를 부지 확보 → 가동 **9단계**로 추적
- 용량 → GPU → HBM/DRAM 환산 (1GW ≈ 0.47M GPU ≈ 90~135PB HBM)
- AI DC 착공은 메모리 수요의 **6~24개월 선행 신호**. 단, 약정된 건설은 수요가 식어도 진행되는 *끈적한* 지표

### ② 수요 변곡 조기경보(EWI) — [`wiki/concepts/demand-inflection-ewi.md`](wiki/concepts/demand-inflection-ewi.md)
- 착공보다 **왼쪽(선행)·오른쪽(미시)·공급 과잉**으로 둘러싼 인과 사슬 앙상블
- **괴리(선행 위험 − 끈적 위험)** = 하락 전 행동 윈도우. 현재 복합 36(주의)·공급 과잉 68(경계)·괴리 +4
- 샤프 드롭 메커니즘(더블오더링 언와인드·효율 에어포켓·파이낸싱 프리즈) 명시
- 시나리오 전환 트리거 3종 + 의사결정 D15·D16과 연동

---

## 핵심 데이터 하이라이트

- **글로벌 메모리 시장**: 2026년 **$551.6B** (+134% YoY), 2027년 **$842.7B** 전망 (TrendForce)
- **HBM 시장**: 2026년 **~$54.6B** (BofA), 전 제품 Sold Out 상태
- **HBM 점유율 (Q3 2025)**: Samsung **22%** / SK하이닉스 **57%** / Micron 21% (Counterpoint)
- **빅테크 AI CapEx**: 2026년 합산 **$650~725B** (+40%+ YoY)
- **슈퍼사이클 정점 신호**: Micron 주가 12개월 **+7.6×**, DRAM 영업이익률이 HBM을 사상 첫 초과(언와인드 셋업)
- **AI DC 착공 파이프라인**: **55.9GW**(17개국), 2026 신규 가동 ~23.7GW → 증분 HBM ~$32B

---

## 프로젝트 구조 (LLM Wiki 모델)

```
action-learning/
├── sources/                       # 1층: 원본 (불변, append-only)
│   ├── articles/                  # 기사·리포트
│   ├── raw-notes/                 # 수집 노트 (DC 착공·수요 변곡 EWI 방법론 등)
│   └── README.md                  # 외부 출처 카탈로그
│
├── wiki/                          # 2층: 위키 (LLM이 소유·유지하는 진실의 원천)
│   ├── steep/                     # STEEP 5 카테고리
│   ├── driving-forces/            # DF 식별, Impact×Uncertainty
│   ├── scenarios/                 # 5개 시나리오 + 매트릭스
│   ├── strategies/
│   │   ├── core/                  # 핵심전략 현황 (메인벳/사이드벳)
│   │   └── invariant/             # 9개 Robust 전략 (RS-1~RS-9)
│   ├── benchmark/                 # 사이클 대응·헤징 벤치마크
│   ├── entities/                  # 회사·제품·인물 (Samsung·SK하이닉스·NVIDIA 등)
│   └── concepts/                  # 개념·기술 트렌드 (HBM·CXL·AI DC 착공·수요 변곡 EWI 등)
│
├── outputs/                       # 3층: 빌드 결과물 (위키에서 합성)
│   ├── report/scenario-planning-report.md
│   └── presentation/              # slide-outline.md + scripts + assets + .pptx
│
├── dashboard/                     # React + Vite 대시보드 (Vercel 빌드 루트)
│
├── CLAUDE.md                      # 위키 관리자 헌법
├── index.md                       # 위키 전체 목차
├── log.md                         # 시간순 작업 로그
└── README.md                      # 이 파일
```

위키의 모든 사실 주장은 `sources/`의 파일을 인용합니다. 한 페이지가 바뀌면 하류 산출물(대시보드·보고서·발표자료)도 같은 작업에서 동기화합니다 (변경 정합성 체인, [`CLAUDE.md`](CLAUDE.md) §6).

---

## 주요 산출물

| 파일 | 설명 |
|------|------|
| [`outputs/report/scenario-planning-report.md`](outputs/report/scenario-planning-report.md) | 시나리오 플래닝 기반 전략 보고서 (위키 합성) |
| [`wiki/strategies/invariant/`](wiki/strategies/invariant/) | 9개 Robust 전략 (RS-1~RS-9) 상세 |
| [`wiki/scenarios/scenario-matrix.md`](wiki/scenarios/scenario-matrix.md) | 시나리오 매트릭스 + 확률 + 분기 요인 |
| [`outputs/presentation/slide-outline.md`](outputs/presentation/slide-outline.md) | 발표자료 슬라이드 기획서 |
| [`sources/README.md`](sources/README.md) | 외부 출처 카탈로그 |
| [`index.md`](index.md) | 위키 전체 페이지 목차 |
| [`log.md`](log.md) | 시간순 작업 로그 |

---

## 데이터 출처

주요 출처: TrendForce, Yole Group, Bank of America, Counterpoint Research, SemiAnalysis, SK하이닉스·Micron IR, NVIDIA 기술 블로그, Vast.ai, Yahoo Finance, BIS, NIST, IEA 등. 전체 카탈로그는 [`sources/README.md`](sources/README.md) 참조.

---

## 관련 규칙

위키 관리자 헌법은 [`CLAUDE.md`](CLAUDE.md), 위키 전체 목차는 [`index.md`](index.md), 시간순 작업 로그는 [`log.md`](log.md) 참조.
