# 현황 분석: MB-4 커스텀 AI 메모리 솔루션

> **전략 핵심**: 메모리를 부품이 아니라 **솔루션**으로 — 구글/아마존/MS의 ASIC에 통합되는 맞춤형 메모리(HBM + CXL + PIM + CMX 복합) 공급. 2029년 단일 고객 매출 비중 30%+ 목표.
> **분류**: 메인벳 (점수 15 — 임팩트·창의성·모방난이도 모두 5)

---

## 1. 정량 현황

### 시장 규모

| 지표 | 2025 | 2026E | 2028E | 2030E | 출처 / 신뢰도 |
|------|------|------|------|------|------|
| HBM 시장 (전체) | ~$340억 | $546억 | $1,000억+ | ~$980억 | Bank of America, Yole Group · ✅ |
| HBM이 DRAM 매출 차지 비중 | ~20% | 23%+ | — | 50%+ | Yole Group, [Tech Insider](https://tech-insider.org/memory-chip-shortage-2026-ai-consumer-electronics/) · ✅ |
| 커스텀 AI 칩용 HBM 수요 성장률 | — | **+82%** | — | — | Goldman Sachs · 🔵 |
| AI 학습/추론이 HBM 수요 차지 | — | **55%+** | — | — | JEDEC tracking ([Tech Insider](https://tech-insider.org/memory-chip-shortage-2026-ai-consumer-electronics/)) · ✅ |
| 하이퍼스케일러 capex 중 메모리 비중 | 8% (2023~24) | **30%** | — | — | ([data/technology/nvidia-cmx-scada.md](../../data/technology/nvidia-cmx-scada.md)) · ✅ |

### 커스텀 AI 칩 진영 (2026 기준)

| 진영 | 칩 | HBM 사양 | 메모리 파트너 (공개) |
|------|---|----|----|
| **NVIDIA** Rubin | HBM4 12-Hi/16-Hi | SK하이닉스 70% / Samsung 28% / Micron 18% (2026E, UBS 추정) ([data/market/2026-q1-current-state.md](../../data/market/2026-q1-current-state.md)) · 🔵 |
| **Google** TPU v6/v7 | HBM3E → HBM4 | 다중 공급, Samsung 포함 (공개 미세부 공시 부재) · ⚠️ |
| **Amazon** Trainium2/3 | HBM3E → HBM4 | 다중 공급 (Trainium2은 SK하이닉스 우세 보도) · 🔵 |
| **Microsoft** Maia | HBM3E | TSMC 패키징, 메모리 공급사 비공개 · ⚠️ |
| **Meta** MTIA v2 | HBM3 → HBM3E | 비공개 · ⚠️ |

### 삼성 현재 위치 (커스텀 메모리 영역)

| 항목 | 현황 | 출처 / 신뢰도 |
|------|-----|------|
| HBM 점유율 (Q3 2025) | 35% (Q2 2025의 17%에서 회복) | Counterpoint Research · ✅ |
| HBM4 양산 개시 | 2026.2 | Samsung Newsroom · ✅ |
| NVIDIA Rubin HBM4 점유 | 28% (SK 70%, Micron 18%) | UBS 추정 · 🔵 |
| CXL 메모리 모듈 (CMM-D) | Pangea v3 (CXL 3.2) **2026 내 발표 예정** | KED Global, [TradingKey](https://www.tradingkey.com/analysis/stocks/us-stocks/261834990-samsung-sk-hynix-micron-hbm-cxl-pangea-v2-ai-data-center-tradingkey) · ✅ |
| LPDDR5X-PIM | 양산 중 | Samsung IR · ✅ |
| HBM 베이스다이 커스텀 | 공개 사례 없음 | 자체 추정 · ⚠️ |

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) 광범위 제품 포트폴리오 — HBM·CXL·PIM·SSD를 한 회사가 제공 가능. 경쟁 메모리사 중 유일. (2) 파운드리 보유 — 베이스다이 커스텀 로직 통합 가능. (3) 시스템 LSI·Foundry·Memory 통합 영업 가능. |
| **약점 (W)** | (1) 단일 고객 락인이 SK하이닉스 대비 약함 — NVIDIA 28% vs SK 70%. (2) HBM3E 12Hi 품질 이슈로 인한 신뢰 손상이 회복 중. (3) 하이퍼스케일러 ASIC 공동 개발 트랙 레코드가 SK하이닉스 대비 부족. |
| **기회 (O)** | (1) Custom ASIC 진영 다변화 — NVIDIA 외 Google/Amazon/MS/Meta가 본격적으로 자체 ASIC 출하. (2) 메모리가 hyperscaler capex 30% 차지로 부상. (3) 2027~2030 HBM5/HBM6 세대 진입 시 커스텀 베이스다이 차별화 가능. |
| **위협 (T)** | (1) SK하이닉스의 NVIDIA Co-design 락인 심화. (2) 패키징 병목 (TSMC CoWoS) 제한. (3) HBM 패러다임 자체가 3D DRAM·PIM·CXL로 분산될 가능성. |

### 외부 평가

- **Goldman Sachs**: 커스텀 AI 칩용 HBM 수요 +82% 급증, HBM이 전체 시장의 1/3 차지 예상 ([data/market/hbm-market.md](../../data/market/hbm-market.md))
- **UBS**: NVIDIA 듀얼소싱은 SK하이닉스 단일 의존도(70%)에 대한 NVIDIA 자체의 헤지 수요로 시간 다투기 (data/market/2026-q1-current-state.md)
- **TrendForce**: 2026년 HBM 가격 +20% 인상에도 전 제품 Sold Out — 공급 우위 지속 → LTA 골든 타임 ([data/macro/semiconductor-cycle.md](../../data/macro/semiconductor-cycle.md))

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **HBM 영역**: 회복 단계 — 17%(Q2 2025) → 35%(Q3 2025) → 30%+(2026E 목표). HBM4 양산 개시했으나 NVIDIA Rubin 점유는 28%로 SK하이닉스(70%) 절반 미만.
- **커스텀 베이스다이 영역**: 공개된 트랙 레코드 사실상 없음. 구글 TPU·아마존 Trainium 베이스다이 커스텀 사례 미공개.
- **CXL/PIM 영역**: 기술 리더십 보유 (Pangea v3, LPDDR5X-PIM 양산) — 그러나 매출 견인까지는 시간 필요.

### 다음 마일스톤 (외부 추적 가능)

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026 H2 | NVIDIA Rubin 본격 출하, Samsung HBM4 인증 결과 | 시장 점유율 30%+ 회복 가능성 검증 |
| 2026 H2 | Samsung Pangea v3 (CXL 3.2) 발표 | 차세대 메모리 패브릭 진입 |
| 2027 | NVIDIA Rubin Ultra HBM4E 양산, Samsung Foundry 4nm GAA 공정 안정화 | 베이스다이 커스텀 차별화 시작 가능 |
| 2027~2028 | Google TPU v7, Amazon Trainium3 본격 출하 | NVIDIA 외 락인 기회 결정 |
| 2028 | CXL 4.0 multi-rack 메모리 풀링 production deployment | CXL 매출 진입 결정 |

### 신뢰도 한계

- 베이스다이 커스텀 통합의 실제 실행 사례·매출 잠재력은 **공개 자료 한계**. 본 분석은 시장 트렌드 + 삼성 IR 코멘트의 외삽.
- 단일 고객 매출 비중 30% 목표는 strategy.md의 내부 목표 수치 — 외부 검증 불가.

---

## 4. 출처

- [SK hynix 2026 Market Outlook](https://news.skhynix.com/2026-market-outlook-focus-on-the-hbm-led-memory-supercycle/)
- [Memory Chip Shortage 2026: HBM Takes 23% of DRAM Wafers — Tech Insider](https://tech-insider.org/memory-chip-shortage-2026-ai-consumer-electronics/)
- [Samsung seeks post-HBM lead as CXL race heats up — KED Global](https://www.kedglobal.com/deep-insights/newsView/ked202604270010)
- [CXL vs. HBM: Why Samsung, SK Hynix, and Micron are Racing — TradingKey](https://www.tradingkey.com/analysis/stocks/us-stocks/261834990-samsung-sk-hynix-micron-hbm-cxl-pangea-v2-ai-data-center-tradingkey)
- 내부: [data/market/hbm-market.md](../../data/market/hbm-market.md), [data/market/2026-q1-current-state.md](../../data/market/2026-q1-current-state.md), [data/technology/nvidia-cmx-scada.md](../../data/technology/nvidia-cmx-scada.md), [data/competitors/sk-hynix.md](../../data/competitors/sk-hynix.md)

---

## [Update 2026-05-19] 권석준 인터뷰 (SBS, 2026-04-11) — 메모리 파운드리 모델 + 라인 분기 전략

권석준 교수가 제시한 **메모리 파운드리화** 비즈니스 모델은 MB-4 커스텀 AI 메모리 전략의 정확한 외부 검증.

### 새 비즈니스 모델 요약

- 고객사(NVIDIA·하이퍼스케일러·Tesla·OpenAI 등)가 **설계 단계부터 참여**하는 맞춤형 메모리
- **AI 맞춤형 HBM, LPDDR** — 에이전트 AI·피지컬 AI 등 영역 특화
- "지금까지 메모리 업체들이 잘 해보지 않은 비즈니스" → 향후 몇 년 불확실성 + **극복하는 업체가 장기 생존**

### 실행 방식 = 라인 분기 (Lines split)

- **신규 팹 건설은 모험**
- 대신 기존 시설의 **일부 라인을 분기**시켜 맞춤형 라인으로 운영
- 어떤 비율로 라인을 분기할지가 핵심 의사결정

### Samsung 입장 우위

- 권 교수: Samsung은 메모리 + Foundry 수직 통합 가능한 유일 회사 → 메모리 파운드리화 경쟁에서 **구조적 우위**
- 로직다이 내재화로 NVIDIA·Tesla 같은 고객의 커스텀 HBM 설계 요구 직접 수용 가능
- SK 하이닉스는 TSMC 의존으로 인해 동일 모델 실행 시 협상력 제약

### KPI 보강 제안

- **라인 분기 비율**: 전체 메모리 캐파 중 맞춤형 라인 비중 (목표: 2027E 15%+, 2030E 30%+)
- **고객별 NRE(Non-Recurring Engineering) 수익**: 설계 단계 참여 고객 수 × 단가
- **분기 라인 yield**: 맞춤형 양산 수율이 catalog 대비 격차 (15% 이내 목표)

**출처**: [youtube-kwon-seokjun-2026-04-11.md](../../../sources/articles/youtube-kwon-seokjun-2026-04-11.md)
