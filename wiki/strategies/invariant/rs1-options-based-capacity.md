# RS-1: 옵션형 캐파 체계 (Options-Based Capacity)

> **한 줄 요약**: "지을 능력"이 아니라 "제때 켜고 끌 능력"이 사이클 산업의 핵심 자산이다. Fab Shell은 선행 건설하되 장비 반입은 수요 신호 확인 후 단계적으로 집행한다.

---

## 1. 전제 (Premise)

메모리 산업은 **사이클 산업**이며, 다음 두 가지가 동시에 성립한다:

- **P1.** Capex 결정 시점(t)과 매출 발생 시점(t+24~36개월) 사이에 수요·가격이 ±50% 이상 변동할 수 있다.
- **P2.** 한번 발주된 장비를 취소·연기하는 비용은 작지 않으나(2~5%), **불황기 가동률 저하의 손실보다는 훨씬 작다**.

이 두 전제가 성립하는 한, "수요 확정 후 공급" 원칙이 "공급 후 수요 대응"보다 항상 기댓값이 높다.

---

## 2. 근거 데이터 (Evidence)

### 2.1 메모리 가격 변동성 — 24개월 안에 ±60%
- 2026 Q1 DRAM 계약가: **+55~60% QoQ** (역대 최대 분기 상승) ([data/market/price-trends.md](../../data/market/price-trends.md), TrendForce)
- 2022~2023 다운사이클: DRAM ASP YoY -45~50%, 메모리 3사 합산 영업적자 진입 (TrendForce 2023)
- 2024 Q4 → 2026 Q1 사이 DDR5 현물가 약 4배 인상 (데이터센터 다이내믹스, [PC Gamer 2026](https://www.pcgamer.com/hardware/memory/memory-crisis-and-sky-high-dram-prices-could-run-past-2028-as-samsung-and-sk-hynix-opt-to-minimize-the-risk-of-oversupply/))

### 2.2 업계가 이미 "신중 capex"로 선회
- **2026 NAND capex $22.2B (+5%)** — 캐파 확장 아닌 process upgrade·hybrid bonding에 집중 ([TrendForce 2025-11](https://evertiq.com/news/2025-11-13-memory-industry-to-maintain-cautious-capex-in-2026), [data/technology/nand-process-transition.md](../../data/technology/nand-process-transition.md))
- 2025년 Samsung 전사 capex 전년比 **-11%**, Intel **-20%** vs TSMC +27~37%로 갈리는 흐름 ([Electronics Weekly 2026-04](https://www.electronicsweekly.com/news/business/semiconductor-capex-2026-04/))
- Samsung 공식 코멘트: "수요와 가격을 균형 맞추는 Capex 전략으로 공급 과잉 위험을 최소화" ([Blocks & Files](https://blocksandfiles.com/2026/01/21/the-memory-supercycle/))

### 2.3 잘못된 타이밍 증설의 직접 비용 — Weber 학습곡선
- 양산 ramp **6개월 지연 → 누적 이익의 2/3 소실**, 1년 지연 → 손실 전환 ([Weber, PSU "Yield Learning"](https://web.pdx.edu/~webercm/documents/2004%20Weber%20Yield%20Learning.pdf))
- 공정 개발 시간 **1분당 약 $5,000** 손실로 환산 가능
- 반대로 호황기 빠른 증설 실패 시 매출 기회비용은 분기당 수천억 원 (HBM4 단가 $500/개 × 분기 수십만 개 단위)

### 2.4 벤치마크 — Nucor의 변동비 구조 모델
- 1969년 Nucor가 도입한 **EAF(전기로) 미니밀** 구조: 고로 대비 가동률을 빠르게 조절. 분권화 경영으로 공장 단위 생산 결정 ([analysis/benchmark/cyclical-strategy-benchmark.md](../../analysis/benchmark/cyclical-strategy-benchmark.md))
- 결과: 2020~2023 평균 ROE 33%, EPS CAGR 44%, 50년 연속 배당 인상 — 사이클 전 구간에서 통합 고로 경쟁사 대비 EBITDA 마진 우위
- 시사점: **고정비 → 변동비 전환**은 사이클 산업에서 가장 강력한 구조 개선

### 2.5 Marriott Asset-Light 모델 (자본 사이클 회피)
- 1993년 Marriott Corporation을 두 회사로 분할: Marriott International(브랜드/운영) ↔ Host Marriott(부동산) ([benchmark](../../analysis/benchmark/cyclical-strategy-benchmark.md))
- 9,300+ 호텔 중 **자체 보유 1% 미만**, 약 77%가 프랜차이즈/라이선스
- COVID 직격탄 후 빠른 배당 복원, EBITDA 마진 77.7% (Airbnb 36.4%의 2배)
- 시사점: 메모리도 "팹 소유" 외에 "팹 통제" 옵션을 늘리면 사이클 변동성 흡수 가능

---

## 3. 추론 과정 (Logic Chain)

```
[L1] 메모리 수요는 24개월 시계에서 ±60% 변동 (P1, 2.1)
  ↓
[L2] 따라서 t 시점에 확신을 가지고 결정한 캐파가 t+24개월에 잘못된 결정으로 판명될 확률이 50%에 근접
  ↓
[L3] 잘못된 증설의 비용 (가동률 저하·재고 손실·금융 비용) > 옵션 프리미엄 비용 (2~5%, 2.3+P2)
  ↓
[L4] 따라서 "조건부 집행"의 기댓값이 "확정 집행"보다 항상 높다
  ↓
[L5] 옵션을 만드는 구체적 메커니즘:
     (a) Fab Shell 선행 건설 (수요 무관)
     (b) 장비 반입 단계화 (수요 신호 확인 후)
     (c) 장비 발주 계약에 "반입 연기 옵션(최대 12개월)" 명문화
     (d) Multi-Product Fab 구조 (DRAM/NAND/Logic 비율 분기별 조정)
     (e) 캐파 집행 거버넌스: 분기별 롤링 캐파 리뷰
  ↓
[L6] 이 구조는 호황기에는 "빠른 증설 옵션"으로, 다운사이클에는 "집행 연기 옵션"으로 작동 — 어떤 시나리오에서도 매몰 비용 절감
  ↓
[L7] 단, 옵션을 만드는 행위 자체에 비용이 든다 (L3의 2~5% 프리미엄 + Shell 선행 건설비). 이는 "보험료"로 정당화 — 보험료 < 사고 비용
```

---

## 4. 결론 (Conclusion) — 5개 시나리오에서의 가치

| 시나리오 | RS-1의 작동 방식 | 가치 창출 |
|---|---|---|
| **A 황금 요새** (AI 지속+디커플링) | 시안 팹 라이선스 갱신 실패 시 평택 P5/P6에서 즉시 NAND 캐파 전환 가능 | 정책 충격 흡수, 매출 손실 최소화 |
| **B AI 르네상스** (AI 지속+공존) | HBM 폭발 수요에 대해 단계화된 장비 반입을 "전환 가속"으로 변경 | 매출 극대화 (옵션을 콜로 행사) |
| **C 기술 냉전** (AI 붕괴+디커플링) | 발주된 장비의 반입을 12개월 지연, 공실 Shell 유지 | 매몰 capex 회피 (수조 원 단위) |
| **D 조용한 재편** (AI 붕괴+공존) | 분기별 롤링 캐파 리뷰로 가동률 60% 이하 라인 즉시 조정 | 다운사이클 적자 폭 축소 |
| **E 패러다임 전환** (HBM 대체) | Multi-Product Fab의 DRAM/NAND/Logic 비율을 3D DRAM·CXL 라인으로 전환 | 기술 피벗 (Shell·유틸리티는 재활용) |

→ **5개 시나리오 모두에서 ✅** — 진정 Robust 전략

---

## 5. 반박 가능성 검토 (Counter-argument Review)

### 반박 5.1: "옵션 프리미엄도 결국 비용. 누적되면 만만치 않다"

**Steel-man**: 장비 반입 연기 옵션 2~5% × 연간 capex 30조 = 연 6,000억~1.5조 원. 5년 누적 3~7.5조 원. SK하이닉스가 같은 기간 옵션 없이 직진하면 우리가 옵션 비용을 흡수하는 동안 그들은 그 비용으로 추가 캐파를 짓는다.

**재반박**:
- 옵션 비용은 **다운사이클 1회의 기회비용보다 훨씬 작다**. 2022~2023 다운사이클에서 메모리 3사 합산 영업적자 약 -10조 원 규모. 옵션이 없었기 때문에 발생한 손실의 일부를 옵션 보험료로 본다면 보험금 회수 비율이 높다.
- SK하이닉스의 직진 전략이 성공한 것은 **우연히 사이클 상승기와 일치**한 결과. 그들이 2022~2023 다운사이클에 직격탄을 맞은 사실(영업적자 7조+)이 이를 입증.
- 더 근본적으로, **삼성의 사이클 손실 패턴**(호황기 피크 증설→다운턴 재고 급증→현금흐름 악화)이 반복되는 한 옵션 구조는 필수.

### 반박 5.2: "Shell만 짓고 장비 안 들이면 IR이 비효율적이라고 본다"

**Steel-man**: 활동가 투자자·외국인 주주는 "공장 공실"을 capex 낭비로 해석한다. 주가 디스카운트 + 배당 압력 가중.

**재반박**:
- IR 메시지 정비로 흡수 가능: "전략적 옵션 가치(Strategic Option Value)"로 명명, 분기 IR에서 "옵션 행사 가능 수치(Convertible Capacity)" 별도 공시.
- ExxonMobil이 2020년 다우 산업평균 제외·40년 만의 첫 적자에도 capex를 사수해 2023년 Pioneer Natural Resources $59.5B 인수까지 도달한 거버넌스 모델 차용 ([benchmark](../../analysis/benchmark/cyclical-strategy-benchmark.md)).
- IR 디스카운트 대비 옵션 행사 시 매출 갭 회피 효과 — 분기당 수천억 원 단위가 IR 디스카운트의 배수.

### 반박 5.3: "결국 SK하이닉스 같은 집중 투자가 점유율을 가져간다. 옵션은 후발 주자의 변명"

**Steel-man**: SK하이닉스는 2025년 HBM 점유율 62%, NVIDIA Rubin HBM4 70% 점유. 옵션 구조 없이 직진해서 1위를 잡았다.

**재반박**:
- SK하이닉스의 집중 투자는 **단일 제품(HBM) + 단일 고객(NVIDIA)** 구조에서만 작동. 시나리오 E(패러다임 전환)에서는 같은 집중이 부메랑이 된다.
- 또한 이미 SK하이닉스도 HBM4 단일 고객 의존도에 대한 우려가 본격화 — UBS는 "NVIDIA Rubin 70% 점유는 동시에 단일 고객 의존 70%이기도 하다"라고 분석 ([data/market/hbm-market.md](../../data/market/hbm-market.md)).
- 삼성의 강점은 "다양한 제품·다양한 고객 구조에서의 가치 창출"이며, 이 구조에서는 옵션형 캐파가 더 큰 가치를 만든다 (RS-2 바벨, RS-4 고객 분산과 결합).

### 반박 5.4: "Multi-Product Fab은 이론적으로 가능하나 실제로는 라인 변경 비용이 크다"

**Steel-man**: DRAM ↔ NAND 전환은 단순 비율 조정이 아니라 공정 변경(예: 침전 공정 변경, 메탈 레이어 변경)을 동반. 분기별 조정은 비현실적.

**재반박**:
- 완전 자유 전환이 아니라 **±20% 범위 내 조정**으로 정의. DRAM 60→80% 조정 같은 범위.
- 실제 사례: 평택 P2 라인이 DRAM·NAND 혼용 운영된 전례 있음 (삼성 IR, 2021).
- 핵심은 "라인 전환 능력 자체"보다 "전환 가능성을 갖춘 설계"임. 후자는 fab 설계 단계에서 결정 — 사후에 만들 수 없다.

---

## 출처 (Citations)

### 내부 문서
- [analysis/scenarios/strategy.md §3 RS1](../../analysis/scenarios/strategy.md)
- [analysis/benchmark/cyclical-strategy-benchmark.md (Nucor, Marriott, ExxonMobil)](../../analysis/benchmark/cyclical-strategy-benchmark.md)
- [data/market/price-trends.md](../../data/market/price-trends.md)
- [data/macro/semiconductor-cycle.md](../../data/macro/semiconductor-cycle.md)
- [data/technology/nand-process-transition.md](../../data/technology/nand-process-transition.md)

### 외부 자료
- [Memory industry to maintain cautious capex in 2026 — TrendForce](https://evertiq.com/news/2025-11-13-memory-industry-to-maintain-cautious-capex-in-2026)
- [2026 semiconductor capex to increase 20% YoY — Electronics Weekly](https://www.electronicsweekly.com/news/business/semiconductor-capex-2026-04/)
- [Memory crisis and sky-high DRAM prices — PC Gamer](https://www.pcgamer.com/hardware/memory/memory-crisis-and-sky-high-dram-prices-could-run-past-2028-as-samsung-and-sk-hynix-opt-to-minimize-the-risk-of-oversupply/)
- [Yield Learning and the Sources of Profitability — Weber, PSU](https://web.pdx.edu/~webercm/documents/2004%20Weber%20Yield%20Learning.pdf)
- [The memory supercycle — Blocks & Files](https://blocksandfiles.com/2026/01/21/the-memory-supercycle/)

---

## [Update 2026-05-19] DDR 마진 회복 → 옵션형 캐파 절제 강화

SemiAnalysis (2026-03-12) **DDR DRAM 마진이 HBM 계약 수준에 근접/초과** ([price-trends.md](../../concepts/price-trends.md)) 신호를 반영해 RS1 호황기 절제 강도를 **강화**한다.

### 근거
- 범용 DRAM 마진 회복은 시장 전체가 **호황 정점에 근접**했다는 신호. 다운턴 시점이 가까워졌다는 의미.
- HBM 캐파 잠식 3→4× 가속([hbm-market.md](../../concepts/hbm-market.md))이 범용 공급 부족을 장기화해 추가 증설 유혹이 강해지는 시점.
- 과거 메모리 사이클 정점에서의 무절제 증설이 다운턴 손실을 확대한 패턴([semiconductor-cycle.md](../../concepts/semiconductor-cycle.md)).

### 시나리오별 강도

| 시나리오 | 절제 강도 |
|---|---|
| A (황금 요새) | **강화** — 디커플링 + 호황 지속이지만 정점 임박 |
| B (AI 르네상스, Main Bet) | **강화** — Main Bet conviction 강화, capex 규율로 다운턴 진입 시 손실 최소화 |
| C (기술 냉전) | **매우 강화** — 다운턴 임박, 옵션 가치 극대화 |
| D (조용한 재편) | **강화** + 다각화 우선 — 점유 분산 신호 동시 대응 |
| E (패러다임 전환) | **유지·옵션 가치 ↑** — 와일드카드, 옵션형 캐파의 본질 가치 시현 |

### 실행 강화 항목
- **신규 고정 캐파 증설 동결**: 2026 Q3까지 장비 발주 우선권만 확보, 실집행은 분기 단위 재승인
- **mix 전환권 정량화**: 라인별 HBM↔범용 mix 전환 시 6개월 이내 수율 회복 옵션 확보
- **장기계약(LTA) 없는 증설 금지**: 1년치 이상 take-or-pay 보장 없는 캐파는 옵션으로만 유지

**출처**: [semianalysis-ai-silicon-shortage-2026-03-12.md](../../../sources/articles/semianalysis-ai-silicon-shortage-2026-03-12.md)
