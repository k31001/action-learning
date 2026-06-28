# 현황 분석: RS-5 재무 규율 + 초과이익 재투자

> **전략 핵심**: 호황기 절제 (재고일수 상한, LTA 없는 캐파 금지, FCF 기준) + 다운사이클 capex 하한 (HBM 신세대 R&D + 패키징 4조 원/년 삭감 불가). Nucor·ExxonMobil 모델.
> **분류**: 메인벳 (점수 10, 사용자 강제 포함 — 사이클 거버넌스 backbone)

---

## 1. 정량 현황

### 삼성 메모리사업부 사이클 패턴 (역사적)

| 기간 | 메모리 영업이익 (추정) | 사이클 단계 | 출처 / 신뢰도 |
|------|---------|------|------|
| 2017~2018 | +20조 원 (호황 피크) | 슈퍼사이클 | Samsung IR · ✅ |
| 2019~2020 | +5~10조 원 (조정) | 다운턴 | Samsung IR · ✅ |
| 2021 | +15조 원 (재상승) | 회복 | Samsung IR · ✅ |
| 2022~2023 | **-8조 원+ (영업적자)** | 다운사이클 | Samsung IR, [wiki/macro/semiconductor-cycle.md](../../concepts/semiconductor-cycle.md) · ✅ |
| 2024~2025 | +20조 원+ (회복) | AI 호황 진입 | Samsung IR · ✅ |
| 2026 Q1 | 메모리 매출 +292% YoY ($50.4B) | 슈퍼사이클 | Samsung IR · ✅ |

→ **사이클 진폭이 영업이익 ±10조 원 이상**

### 현금·재무 자산 (2025)

| 지표 | 2025 | 출처 / 신뢰도 |
|------|------|------|
| Samsung 연결 현금성 자산 | **$63B (~85조 원)** | Samsung IR · ✅ |
| Samsung 전사 capex | ~57조 원 | Samsung IR · ✅ |
| 메모리사업부 capex (추정) | ~22~27조 원 | 자체 추정 (DS 비중 ~40%) · 🔵 |
| 2026E 메모리 capex | 25~30조 원 | KPMG, Electronics Weekly · 🔵 |

### 경쟁사 사이클 대응 — 벤치마크

| 회사 | 호황기 영업이익률 (2025) | 다운사이클 capex 정책 | 출처 / 신뢰도 |
|------|---------|------|------|
| **SK하이닉스** | **49%** (호황) | 청주 패키징 팹 $1.7B 사이클 전 구간 유지 | [wiki/competitors/sk-hynix.md](../../entities/sk-hynix.md) · 🔵 |
| **Micron** | **~30%** (안정) | CHIPS Act 활용 + LTSA 구조 | Micron IR · ✅ |
| **Nucor (벤치마크)** | 평균 ROE 33% (2020~2023) | **30~40억 달러 capex 사이클 전 구간 유지** | [wiki/benchmark/cyclical-strategy-benchmark.md](../../benchmark/cyclical-strategy-benchmark.md) · ✅ |
| **ExxonMobil (벤치마크)** | (석유 사이클) | 다운사이클에 capex 사수 → 2023 Pioneer **$59.5B 인수** | benchmark · ✅ |

### 재투자 4개 항목 — 추정 비중

| 항목 | 권고 비중 | 비고 |
|------|---------|------|
| 원가 개선 (차세대 공정) | ~35% | 1c nm, GAA, 소재 국산화 |
| 수율·Fab Intelligence | ~25% | AI 기반 공정 이상 감지 |
| 패키징 내재화 | ~25% | Hybrid bonding, TSV |
| 테스트 시간 단축 | ~15% | 병렬 테스트, AI 알고리즘 |

→ 출처: strategy.md 내부 권고 · ⚠️ 외부 벤치마크 부재

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) 현금성 자산 $63B로 다운사이클 4조 원/년 capex 하한 사수 가능. (2) Samsung 그룹 전체의 안정적 거버넌스 — 단기 압박에 굴복 가능성 낮음. (3) 한국 거버넌스가 미국 대비 활동가 투자자 압박 약함. |
| **약점 (W)** | (1) **이사회 결의된 다운사이클 capex 하한 부재** — 정책 명문화 안 됨. (2) 호황기 LTA 기반 캐파 증설 원칙 미명문화 — 투기적 증설 가능성. (3) 메모리사업부 분기 P&L이 외부 가시성 부족 → 시장 신뢰 저하. |
| **기회 (O)** | (1) 호황기 초과이익 재투자 → 다음 사이클 우위 (Nucor 모델). (2) 한국 정부 KRW 700조 반도체 투자 패키지 활용 시 capex 부담 분담. (3) IR 메시지 정비로 외국인 주주 long-term 비중 흡수. |
| **위협 (T)** | (1) 외국인 주주 배당 확대 압력 (활동가 투자자) — ExxonMobil 사례. (2) 호황기 절제 시 SK하이닉스 같은 공격 경쟁사에게 단기 점유율 손실. (3) 한국 상속세·세제 변화 시 그룹 거버넌스 압박 가능. |

### 외부 평가

- **Bank of America**: 2026 메모리 시장을 "1990년대형 슈퍼사이클"로 규정 — 호황기 절제와 다운사이클 자원 보존이 1~2회 사이클 후 결정 ([wiki/macro/semiconductor-cycle.md](../../concepts/semiconductor-cycle.md))
- **Goldman Sachs**: SK하이닉스 HBM 95%+ capex 집중은 호황기 점유율 우위지만 단일 사이클 패턴 — 사이클 평균 ROE 평가 필요
- **Bloomberg (ExxonMobil 사례)**: 활동가 압박 견디고 capex 사수 → Pioneer $59.5B 인수까지 도달 ([benchmark](../../benchmark/cyclical-strategy-benchmark.md))

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **재무 자산**: ✅ 강점 — 현금 $63B, 다운사이클 4조 원/년 capex 하한 사수 가능
- **이사회 정책**: ⚠️ **명문화 부재** — 가장 큰 거버넌스 공백. 호황기 절제·다운사이클 사수 기준 미공시.
- **재고 정책**: ⚠️ 외부 미공시 — DDR5 60일·HBM 45일·NAND 50일 같은 정량 기준 미공개.
- **IR 커뮤니케이션**: 부분적 — "수요와 가격 균형" 코멘트는 있으나 다운사이클 capex 하한 명시 부재.

### 다음 마일스톤

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026 H1 | 이사회 결의 — 다운사이클 capex 하한 4조 원/년 명문화 (목표) | RS-5 prerequisite |
| 2026 H1 | 재고일수 상한 정책 이사회 승인 | 호황기 절제 메커니즘 |
| 2026 H2 | 호황기 IR 메시지에 "다운사이클 capex 하한 보장" 사전 공시 | 활동가 투자자 방어 |
| 2027~2028 | 다음 다운사이클 진입 시 정책 첫 시험 | 거버넌스 작동 검증 |
| 2028 | 다운턴 흑자 구조 KPI — HBM 가격 60% 하락 시에도 영업이익 흑자 | RS-5 최종 KPI |

### 신뢰도 한계

- 다운사이클 capex 하한 4조 원/년은 strategy.md 내부 목표 — 외부 검증 불가.
- 메모리사업부 영업이익은 공시 분리 안 됨 — 추정 정확도 ±20%.
- 재고일수·LTA 정책은 외부에 사실상 비공개.

---

## 4. 출처

- [Nucor 2020-2024 Capex 패턴 — wiki/benchmark/cyclical-strategy-benchmark.md §2](../../benchmark/cyclical-strategy-benchmark.md)
- [ExxonMobil Pioneer Acquisition — benchmark §4](../../benchmark/cyclical-strategy-benchmark.md)
- [Memory industry to maintain cautious capex — TrendForce 2025-11](https://evertiq.com/news/2025-11-13-memory-industry-to-maintain-cautious-capex-in-2026)
- [2026 semiconductor capex outlook — Electronics Weekly](https://www.electronicsweekly.com/news/business/semiconductor-capex-2026-04/)
- 내부: [wiki/macro/semiconductor-cycle.md](../../concepts/semiconductor-cycle.md), [wiki/market/2026-q1-current-state.md](../../concepts/2026-q1-current-state.md), [wiki/competitors/sk-hynix.md](../../entities/sk-hynix.md), Samsung IR
