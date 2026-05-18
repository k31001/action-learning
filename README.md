# 삼성전자 메모리사업부 시나리오 플래닝 전략 프로젝트

## 개요

AI 데이터센터 수요 폭증 시대의 불확실성에 대응하기 위해 Shell의 시나리오 플래닝 방법론을 활용한 전략 수립 프로젝트입니다. 현재 삼성전자 메모리사업부는 HBM 시장에서 SK하이닉스에 추월 당하는 구조적 위기 속에서도 역대 최고 호황을 경험하는 "호황의 함정"에 처해 있습니다. 이 프로젝트는 불확실성이 가장 높은 두 변수(AI 수요 지속성 × 미중 디커플링 강도)를 축으로 5개의 대안적 미래를 도출하고, 어떤 시나리오에서도 생존·성장하는 전략을 수립합니다.

---

## 방법론: Shell 시나리오 플래닝

```
Focal Issue 정의
    ↓
STEEP 요인 브레인스토밍 (50개)
    ↓
Impact × Uncertainty 매트릭스 → 핵심 Driving Forces 선별
    ↓
시나리오 매트릭스 (2×2 + 와일드카드)
    ↓
시나리오 내러티브 (5개)
    ↓
Main Bet (시나리오 B: AI 르네상스, 30~35%) + Side Bets
    ↓
Robust 전략 (RS1~RS6) — 모든 시나리오에서 유효
    ↓
Early Warning Indicators 대시보드
```

### Focal Issue
> 삼성전자 메모리사업부가 AI 메모리 시대인 2030~2035년에도 글로벌 리더십을 유지하기 위해, 어떤 전략적 결정을 지금(2026년) 내려야 하는가?

### 5개 시나리오

| 시나리오 | DF1 (AI 수요) | DF2 (미중관계) | 확률 |
|---------|-------------|--------------|------|
| A: 황금 요새 | AI 지속 | 디커플링 | 25~30% |
| **B: AI 르네상스** ⭐ Main Bet | AI 지속 | 공존 | 30~35% |
| C: 기술 냉전 | AI 붕괴 | 디커플링 | 10~15% |
| D: 조용한 재편 | AI 붕괴 | 공존 | 20~25% |
| E: 패러다임 전환 (와일드카드) | AI 지속(변형) | 양쪽 가능 | 5~10% |

---

## 프로젝트 구조 (LLM Wiki 모델)

```
action-learning/
├── sources/                       # 1층: 원본 (불변, append-only)
│   └── raw/                       # 마이그레이션 중 — 다음 세션에서 articles/filings/papers/raw-notes 로 분리
│       ├── market/                # 시장 규모·가격·수요
│       ├── technology/            # HBM 로드맵·NVIDIA CMX/SCADA
│       ├── competitors/           # SK하이닉스·마이크론·중국
│       ├── macro/                 # AI CapEx·반도체 사이클
│       ├── policy/                # 미국 수출통제·CHIPS Act·한국
│       └── metadata.md            # 원본 카탈로그
│
├── wiki/                          # 2층: 위키 (LLM이 소유)
│   ├── steep/                     # STEEP 5 카테고리
│   ├── driving-forces/            # DF 식별, Impact×Uncertainty
│   ├── scenarios/                 # 5개 시나리오 + 매트릭스
│   ├── strategies/
│   │   ├── core/                  # 11개 핵심전략 현황
│   │   └── invariant/             # 8개 Robust 전략 (RS1~RS8)
│   ├── benchmark/                 # 사이클 대응·헤징 벤치마크
│   ├── entities/                  # 회사·제품·인물 (생성 예정)
│   └── concepts/                  # 개념·기술 트렌드 (생성 예정)
│
├── outputs/                       # 3층: 빌드 결과물
│   ├── report/scenario-planning-report.md
│   └── presentation/              # slide-outline.md + scripts + assets + .pptx
│
├── dashboard/                     # Vercel 빌드 루트 (최상위 유지)
│
├── CLAUDE.md                      # 위키 관리자 헌법
├── index.md                       # 위키 전체 목차
├── log.md                         # 시간순 작업 로그
└── README.md                      # 이 파일
```

---

## 주요 산출물

| 파일 | 설명 |
|------|------|
| [`outputs/report/scenario-planning-report.md`](outputs/report/scenario-planning-report.md) | 시나리오 플래닝 기반 전략 보고서 (약 500줄, 완성) |
| [`wiki/scenarios/strategy.md`](wiki/scenarios/strategy.md) | 전략 권고안 상세본 — Main Bet / Side Bet / RS / EWI |
| [`outputs/presentation/slide-outline.md`](outputs/presentation/slide-outline.md) | 25개 슬라이드 기획서 |
| [`sources/raw/metadata.md`](sources/raw/metadata.md) | 원본 데이터 카탈로그 |
| [`index.md`](index.md) | 위키 전체 페이지 목차 |
| [`log.md`](log.md) | 시간순 작업 로그 |

---

## 전략 핵심 논리

### Main Bet: "AI 르네상스" (시나리오 B)
- 2026년 내 **HBM4 NVIDIA 인증 회복**이 최우선 과제
- **1c nm 공정 전환**으로 원가 우위 복원
- **NVIDIA CMX** 에코시스템 공식 공급 파트너(PM1753) 지위 심화 → HBM + SSD 이중 수혜
- 인도·중동·동남아 신흥 AI 시장 "동서 균형 공급자" 포지션

### Robust 전략 (시나리오 불문 즉시 실행)
| 전략 | 핵심 내용 |
|------|---------|
| RS1 옵션형 캐파 체계 | "켜고 끌 수 있는" 증설 유연성 — 고정 캐파 증설 금지 |
| RS2 바벨 포트폴리오 | HBM/커스텀 ↔ 저원가 범용 DRAM/NAND, 중간 제품 축소 |
| RS3 고객특화·전환비용 극대화 | FDP·CMX·SCADA 기반 소프트웨어 통합으로 락인 |
| RS4 고객 포트폴리오 분산 | Take-or-Pay LTA, 단일 고객 25% 이하 |
| RS5 정책 리스크 지역 분산 | 규제별 SKU 체계, JV 모델로 미국 팹 진입 |
| RS6 재무 규율 + 초과이익 재투자 | 재고일수 상한, FCF 중심, HBM 초과이익 원가·수율·패키징에 재투자 |

---

## 핵심 데이터 하이라이트

- **글로벌 메모리 시장**: 2026년 **$551.6B** (+134% YoY), 2027년 **$842.7B** 전망 (TrendForce)
- **HBM 시장**: 2025년 **~$34B** → 2028년 **~$100B** 전망. 삼성 점유율 Q2 2025 **17%** (SK하이닉스 62%)
- **빅테크 AI CapEx**: 2026년 합산 **$650~725B** (+40%+ YoY)
- **NVIDIA CMX**: KV 캐시 오프로드 플랫폼 — 삼성 **PM1753** 공식 공급 SSD
- **NVIDIA SCADA**: GPU 네이티브 스토리지 2.3억 IOPS — SK하이닉스·Kioxia 전략 파트너 (삼성 위협)

---

## 데이터 출처

수집된 데이터 항목은 [`sources/raw/metadata.md`](sources/raw/metadata.md) 참조.  
주요 출처: TrendForce, Yole Group, Bank of America, Counterpoint Research, SK하이닉스 IR, Micron IR, NVIDIA 기술 블로그, BIS, NIST, IEA 등

---

## 관련 규칙

위키 관리자 헌법은 [`CLAUDE.md`](CLAUDE.md) 참조.  
위키 전체 목차는 [`index.md`](index.md), 시간순 작업 로그는 [`log.md`](log.md) 참조.  
위키화 이전 누적 프롬프트는 [`PROMPT.md`](PROMPT.md) (다음 세션에서 log.md로 변환 예정).

---

## Early Warning Indicator

https://action-learning.vercel.app
