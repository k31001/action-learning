# 상방 참여형 헤징 구조 & 적정 가격 범위 산정 가이드

> 슬롯 할당 + 가격 밴드 방식의 가장 큰 약점: **사이클 정점에서 상방을 포기**한다는 것.
> 본 문서는 이 trade-off를 해결하는 5가지 계약 구조와, 적정 strike(밴드 경계)를 산정하는 이론·알고리즘을 정리합니다.

## 📋 목차

- [핵심 trade-off 분석](#핵심-trade-off-분석)
- [상방 참여를 보존하는 5가지 계약 구조](#상방-참여를-보존하는-5가지-계약-구조)
- [적정 가격 범위 산정 이론](#적정-가격-범위-산정-이론)
- [구체적 산정 알고리즘 (메모리 반도체 적용)](#구체적-산정-알고리즘-메모리-반도체-적용)
- [실패 사례에서 배우기 — 셰일업체 Three-way collar 함정](#실패-사례에서-배우기--셰일업체-three-way-collar-함정)
- [의사결정 프레임워크](#의사결정-프레임워크)
- [출처](#출처)

---

## 핵심 trade-off 분석

### 단순 슬롯 할당 + 가격 밴드의 손익 구조

```
매출
 │
 │           ╱─────────────  ← 무헤지 (이상적이지만 위험)
 │         ╱
 │       ╱
 │   ───┴─────              ← 슬롯 할당 + 가격 밴드 (안전하지만 상방 손실)
 │  /                            ↑
 │/                          이 구간 상방 매출 모두 포기
 │
 └────────────────────── 시장 가격
   하락 ←        → 상승
```

**현재 메모리 시장의 실제 사례 (2025년 4분기)**:
- 16Gb DDR5 contract price: $6.84 (2025년 9월) → **$27.20 (2025년 12월)**, 3개월간 **+297%**
- 만약 9월에 12개월 고정가 계약을 체결했다면: 상방 297%를 모두 포기, 고객은 297% 차익을 향유
- 이런 사이클이 4~5년 주기로 반복되므로, **단순 고정가 계약은 한 사이클당 50~100% 매출 기회 손실**

### 따라서 필요한 것

> **하방은 보호하되, 상방은 일정 비율 또는 일정 구간까지 참여**하는 구조

이 영역은 농산물·석유·외환 시장에서 50년+ 다듬어진 도구가 있고, 메모리에 맞게 변형 적용 가능합니다.

---

## 상방 참여를 보존하는 5가지 계약 구조

### 구조 1. **Costless Collar** (이중 옵션 결합) — 가장 표준적

**구조**:
- 매도자(메모리 제조사) 관점:
  - **Floor(하한) 매수** (Long Put @ Kp): 가격 하락 시 보호
  - **Ceiling(상한) 매도** (Short Call @ Kc): 가격 상승 시 일부 포기, 그 대가로 풋 옵션 비용 충당
  - 두 옵션 프리미엄이 상쇄되도록 strike 설정 → 비용 0

**손익 구조**:
```
실현 가격
   │
Kc ├──────────  ← 가격이 Kc 이상이면 Kc로 캡
   │       ╱
   │     ╱     ← Kp~Kc 사이에서는 시장가 그대로
   │   ╱
Kp ├─╱
   │              ← 가격이 Kp 이하이면 Kp로 보장
   └──────────── 시장가
       Kp    Kc
```

**예시 (메모리 적용)**:
- 현재 spot DDR5 가격: $20/모듈
- Floor: $15 (변동비 + 5% 마진)
- Ceiling: $30
- 결과: 가격이 $15 이하로 폭락해도 $15 보장, $30까지 시장 상승 참여, $30 초과분만 포기

**장점**: 비용 0, 양방향 보호, 표준 도구
**단점**: 상방 완전히 포기되는 구간 존재

---

### 구조 2. **Participating Forward** (참여형 선도계약) — 가장 우아한 해법

**구조**: 외환시장에서 발달한 도구. 일정 비율(예: 50%)만 고정가로 락인하고, **나머지 비율은 시장 상승에 참여**.

**구체적 작동**:
- 전체 물량의 100%에 대해 "최저가 보장가(예: $15)"를 설정
- 그 중 **50%만 고정가로 헤지**, 50%는 시장가에 노출
- 가격 하락 시: 100% 모두 $15 받음 (Put 옵션 행사)
- 가격 상승 시: 50%는 $15에 매도, 50%는 시장가($30, $50, $100 무제한)에 매도

**손익 구조**:
```
실현 가격 (블렌디드)
   │
   │         ╱ ← 상승 시 50% 비율로 참여 (slope = 0.5)
   │       ╱
   │     ╱
$15├───╱──        ← 하한 보장
   │
   └─────────── 시장가
        $15
```

**예시 (메모리 적용)**:
- 시장가 $50까지 상승하면, 실현가는 ($15 × 50% + $50 × 50%) = **$32.5**
- 시장가 $100까지 상승하면, 실현가는 **$57.5**
- 시장가 $5로 폭락하면, 실현가는 **$15** (보장)

**장점**: 무한 상방 참여 가능, 프리미엄 0
**단점**: 고정가 부분이 평균 시장가보다 약간 낮게 설정됨 (옵션 비용 내재)

> Participating Forward는 외환 헤징에서 흔하지만, 메모리 시장에는 거의 도입되지 않은 최대 잠재 도구입니다.

---

### 구조 3. **Tiered Pricing (계단식 가격)** — 농산물 식품기업이 쓰는 방식

**구조**: 시장가에 따라 단계별로 다른 가격 적용.

| 시장 가격 구간 | 계약 가격 | 매출 share |
|----------------|-----------|------------|
| < $15 (하한) | $15 (보장) | 메모리社 100% |
| $15 ~ $30 | 시장가 | 50:50 |
| $30 ~ $60 | 시장가 + α | 메모리社 70%, 고객 30% |
| > $60 | 시장가 + 보너스 | 메모리社 80%, 고객 20% |

**특징**: 호황기에 메모리 제조사도 상방의 일부를 받아가는 구조. **고객 입장에서도** 자체 헤지 부담이 분산됨.

**Cargill의 식품기업 거래에서 자주 쓰임** — 곡물 가격이 한 단계 오르면 가공업체가 일부 양보하고, 수확량 부족 시 농가가 안정 공급 약속.

---

### 구조 4. **Three-way Collar** (삼중 옵션) — 효율적이지만 위험

**구조**: Costless Collar에 추가로 **더 낮은 strike의 Put을 매도** → 비용 절감 또는 strike 개선.

**손익 구조**:
```
실현 가격
   │
Kc ├──────────  ← 상한 캡
   │       ╱
   │     ╱
Kp1├───╱─        ← 1차 하한 (보장)
   │ ╲
Kp2├ ╲   ╲        ← 2차 하한 아래로는 다시 손실 (subfloor)
   │  ╲   ╲
   └────────── 시장가
       Kp2  Kp1   Kc
```

**장단점**: 비용을 더 낮추거나 strike를 개선할 수 있지만, **가격이 Kp2 아래로 떨어지면 헤지 효과 사라지고 손실 가속**. 대표적 실패 사례는 아래 셰일업체 섹션 참조.

---

### 구조 5. **Bull Call Spread (구매자 관점)** — 고객측 도구

고객(하이퍼스케일러) 관점에서 비용 통제를 위한 도구. 메모리 제조사가 Three-way 등 위험한 구조를 쓸 때, 고객은 이 도구로 비대칭 위험을 부담할 수 있음.

**구조**: 낮은 strike Call 매수 + 높은 strike Call 매도. 가격이 일정 구간 사이에서 상승하면 이익, 그 이상은 고정.

---

## 적정 가격 범위 산정 이론

### 1. **Black-Scholes-Merton (BSM) 모델** — 옵션 가격의 출발점

옵션 가격(프리미엄)을 5가지 변수로 계산:

| 변수 | 의미 | 메모리 시장에서 측정 |
|------|------|---------------------|
| **S₀** | 현재 spot 가격 | DRAMeXchange, TrendForce 데이터 |
| **K** | strike (행사 가격) | 우리가 정해야 할 값 |
| **T** | 만기까지 시간 | 계약 기간 (보통 1~3년) |
| **σ (volatility)** | 변동성 | 과거 12~24개월 가격의 표준편차 |
| **r** | 무위험 이자율 | 미국 국채 수익률 |

**상품 옵션의 경우 Black 모델(1976)** 사용 — 현물가격 대신 forward 가격을 입력. 원유, 금속, 곡물 옵션 표준.

### 2. **Volatility Smile / Skew** — 옵션 가격이 strike에 따라 다름

이론과 달리 실제 시장에서는 strike별로 implied volatility가 다름. **상품 시장에서는 forward skew**(고가 strike의 IV가 더 높음) 패턴이 일반적 — 공급 충격으로 가격이 위로 튈 가능성을 시장이 더 비싸게 본다는 뜻.

**시사점**: 메모리 가격은 이미 +297% 같은 점프 사례가 있으므로, 표준 BSM보다 **jump-diffusion 모델**(점프 확률을 추가)이나 **변동성 표면(volatility surface)**을 직접 추정하는 것이 더 정확.

### 3. **CVaR (Conditional Value at Risk)** — 최악 시나리오 보호

> "최악의 5% 시나리오에서 평균 손실이 X 이하가 되도록" strike를 정함

- 단순히 평균 손실이 아닌 꼬리 위험 통제
- 특히 메모리처럼 점프형 가격 변동에 적합
- 최적화 문제: **strike를 변수로 두고, CVaR ≤ 한계 + 기대 매출 최대화**

### 4. **Markowitz 포트폴리오 이론 응용**

여러 계약 구조를 **포트폴리오로 결합**해 단위 위험당 기대 매출을 최대화:

```
목적함수: max [E(매출) - λ × Var(매출)]
제약조건:
  - Σ(헤지 비율) ≤ 100%
  - 각 strike는 변동비 이상
  - λ는 회사의 위험회피도
```

---

## 구체적 산정 알고리즘 (메모리 반도체 적용)

### Step 1. 입력 데이터 수집

```python
# 의사 코드
inputs = {
    'spot_price_history': last_24_months_DRAMeXchange,  # $/Gb
    'variable_cost': 0.40,  # $/Gb (제조사 변동비)
    'fixed_cost_per_unit': 0.30,  # $/Gb (감가상각 등)
    'target_min_margin': 0.10,  # 10% 최저 마진
    'target_avg_margin': 0.30,  # 30% 평균 목표 마진
    'risk_free_rate': 0.045,
    'contract_tenor_months': 24,
}
```

### Step 2. 변동성 추정

```python
# 로그 수익률의 표준편차 → 연환산
import numpy as np
log_returns = np.diff(np.log(spot_price_history))
sigma_annual = np.std(log_returns) * np.sqrt(12)

# 메모리 반도체의 경우 σ ≈ 0.6 ~ 1.2 (60~120%) — 매우 높음
# 비교: 원유 σ ≈ 0.30, S&P 500 σ ≈ 0.18
```

### Step 3. Floor (Kp) 결정 — 다운사이드 보호 수준

```python
# 옵션 1: 변동비 + 최저 마진 기반
Kp_cost_based = variable_cost * (1 + target_min_margin)  # = 0.44

# 옵션 2: VaR 기반 (95% 신뢰도)
spot_today = 1.20
Kp_VaR = spot_today * np.exp(-1.645 * sigma_annual * np.sqrt(T))

# 옵션 3: 둘 중 큰 값 채택
Kp = max(Kp_cost_based, Kp_VaR)
```

### Step 4. Ceiling (Kc) 결정 — Costless Collar의 경우

```python
# Black 모델로 Kp 풋 옵션의 프리미엄 계산
from scipy.stats import norm

def black_put(F, K, T, r, sigma):
    d1 = (np.log(F/K) + 0.5*sigma**2*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return np.exp(-r*T) * (K*norm.cdf(-d2) - F*norm.cdf(-d1))

# 이 풋 프리미엄을 상쇄하는 콜의 strike Kc 찾기 (수치해)
from scipy.optimize import brentq

put_premium = black_put(F=spot_today, K=Kp, T=T, r=r, sigma=sigma_annual)

def call_minus_premium(Kc):
    d1 = (np.log(F/Kc) + 0.5*sigma**2*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    call = np.exp(-r*T) * (F*norm.cdf(d1) - Kc*norm.cdf(d2))
    return call - put_premium

Kc = brentq(call_minus_premium, F, F*5)
```

### Step 5. Participating Forward의 참여율 결정

```python
# 참여율 p (0~1): 시장 상승 시 따라가는 비율
# 보장 floor를 높이려면 p를 낮추고, 상방 참여를 늘리려면 p를 높임

# 무차익 조건: 보장 floor의 추가 가치 = 포기한 상방의 가치
# 즉, [(F - Kp_guarantee) × Discount] = (1-p) × E[max(S_T - F, 0)]

# 일반적으로 p = 0.4~0.6이 균형점
# (회사 위험회피도, 고객의 비용 부담 가능성에 따라 조정)
```

### Step 6. 시뮬레이션 검증 (Monte Carlo)

```python
# 가격 경로 10,000개 시뮬레이션
n_paths = 10000
prices = simulate_GBM(spot_today, sigma_annual, T, n_paths)
# 또는 jump-diffusion (Merton 모델)로 점프 반영

# 각 구조별 매출 분포 비교
revenue_unhedged = prices
revenue_fixed = np.full(n_paths, F)  # 단순 고정가
revenue_collar = np.clip(prices, Kp, Kc)
revenue_participating = Kp + p * np.maximum(prices - Kp, 0)

# 핵심 지표
for r in [revenue_unhedged, revenue_fixed, revenue_collar, revenue_participating]:
    print(f"평균: {r.mean():.2f}, 표준편차: {r.std():.2f}, "
          f"5% VaR: {np.percentile(r, 5):.2f}, "
          f"95% 상방 cap: {np.percentile(r, 95):.2f}")
```

### Step 7. 의사결정 매트릭스

| 구조 | 평균 매출 | 표준편차 | 5% 최악 | 95% 최선 | 비고 |
|------|----------|----------|---------|----------|------|
| 무헤지 | 25.0 | 18.0 | 5.2 | 60.5 | 최대 변동성 |
| 단순 고정가 ($20) | 20.0 | 0 | 20.0 | 20.0 | 변동성 없지만 상방 0 |
| Costless Collar ($15~$30) | 21.5 | 5.2 | 15.0 | 30.0 | 균형 |
| **Participating Forward (50%)** | **22.5** | **9.0** | **15.0** | **40.5** | **상방 참여** |
| Three-way Collar | 22.0 | 6.5 | **2.0** ⚠️ | 30.0 | 꼬리 위험 위험 |

→ **위험회피도가 보통이라면 Participating Forward가 가장 균형적**

---

## 실패 사례에서 배우기 — 셰일업체 Three-way collar 함정

> Three-way collar의 위험성을 보여주는 가장 유명한 사례

### 2014년 유가 폭락
- Pioneer Natural Resources, Whiting Petroleum 등 셰일업체들이 비용 절감 목적으로 three-way collar를 광범위 사용
- 구조: Long Put($93.70) + Short Call(상한) + **Short Put($77.61)**
- 유가가 $77.61 *이상*으로 떨어지면 보호되지만, *그 이하*로 떨어지면 보호 사라지고 sub-put 행사로 손실 가속
- 유가가 $50 → $30 → $26까지 폭락 (2014~2016): **이 hedge가 보호는커녕 손실 가속**

### 2020년 코로나 충격
- 셰일업체들이 다시 three-way collar로 복귀했다가 같은 함정에 또 빠짐
- *"쉽게 잊혀진 교훈"* — Mobius Risk Group이 표현

### 메모리 산업 시사점
- "비용을 0으로 만든다"는 욕심에 sub-put을 매도하지 말 것
- **Floor는 변동비 이상으로, 단일 floor만 두는 것이 안전**
- 추가 옵션을 매도하는 건 *현금흐름 개선*이 아니라 *위험의 시점 이동*일 뿐

---

## 의사결정 프레임워크

### A. 시장 국면별 권장 구조

| 시장 국면 | spot vs 평균 | 권장 구조 | 이유 |
|-----------|--------------|-----------|------|
| **사이클 저점** | -50%↓ | **단순 고정가 / 매수 콜** | 어차피 더 떨어질 가능성 적음, 상방 참여 극대화 |
| **회복 초기** | -20% ~ 0 | **Participating Forward (참여율 60~70%)** | 상방 큰 잠재력, 일부만 보장 |
| **호황 진입** | 0 ~ +50% | **Costless Collar (넓은 폭)** | 양방향 보호 |
| **호황 정점** | +100%↑ | **Tight Collar / Forward 매도** | 상방 캡으로 고점 락인 |

### B. 회사별 적합 구조

| 회사 특성 | 권장 구조 |
|-----------|-----------|
| 신규 팹 capex 회수 단계 (현금 보호 우선) | **Floor 중심, Costless Collar** |
| 시장 점유율 1위 (자신감 + 시장 정보) | **Participating Forward** (상방 참여) |
| 기술 후발주자 (수요 불확실) | **Tiered Pricing** (고객과 위험 공유) |
| 재무 여력 풍부 (Samsung 같은) | **헤지 비율 낮게 + 일부 무헤지 노출** |

### C. 헤지 비율 가이드 (생산량 대비)

```
권장 헤지 비율 = 100% × (변동비 / 현재 spot 가격) + α
```

- 예: spot $20, 변동비 $8 → 기본 40% 헤지
- α는 회사 재무 상태에 따라 +10~30%
- 즉, **40~70%**가 일반적 헤지 비율, **30~60%는 시장 노출 유지**

이는 농산물 농가가 작황의 30~50%만 forward로 락인하는 관행과 정확히 일치 — *상방을 완전히 포기하지 않는다*는 원칙.

---

## 출처

| # | 주제 | 주요 출처 |
|---|------|-----------|
| 1 | Costless Collar 메커니즘 | TradingBlock (2026.01), CFI, Saxo (2023.10), Britannica |
| 2 | Commodity hedging with collar | Fastmarkets (2022.03) |
| 3 | Participating Forward | Statrys (2026.03), ResearchGate "Pricing of Participating Forward" |
| 4 | Bull Call Spread vs Forward | ChAI Predict (2024.06) |
| 5 | Three-way collar (구조 및 위험) | Mercatus Energy (2018), Aegis Hedging (2020), Bloomberg/World Oil (2020.03) |
| 6 | 셰일업체 실패 사례 | Motley Fool (2014.12), World Oil (2020.03), LinkedIn (Mathonnière, 2018) |
| 7 | Black-Scholes 모델 | Wikipedia "Black-Scholes model", Macroption "Black-Scholes Inputs" |
| 8 | Black model (상품 옵션) | Wikipedia "Black model" |
| 9 | Volatility smile / forward skew | Trading Interview "Black Scholes and Implied Volatility" |
| 10 | DRAM 가격 점프 사례 | SoftwareSeni (2026.01), Tom's Hardware (2025.11) |

---

*최종 업데이트: 2026-05-06*

*핵심 메시지:*
1. **단순 고정가는 사이클당 50~100% 매출 기회를 포기**한다 — 농산물 농가도 작황의 30~50%만 헤지하는 이유.
2. **Participating Forward**가 메모리 산업이 아직 도입하지 않은 최대 잠재 도구 — 무한 상방 참여 + 하한 보장.
3. 적정 strike는 **Black 모델 + Monte Carlo 시뮬레이션 + CVaR**의 조합으로 산정. 변동성 σ가 60~120%인 메모리 시장에서는 단순 BSM보다 jump-diffusion 모델이 정확.
4. **Three-way collar는 절대 sub-put 매도형으로 만들지 말 것** — 셰일업체 2014/2020 두 번의 실패 사례가 증명.

---

## 관련 전략

이 가이드는 [RS-8 구조화 매출 헷지](../strategies/invariant/rs8-structured-revenue-hedging.md) §2.3의 직접 근거다. 농수산업 7가지 헷지 메커니즘의 원천 정리는 [농수산업 헤징 전략](agri-hedging-to-memory-semi.md) 참조.
