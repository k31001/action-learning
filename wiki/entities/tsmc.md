---
type: entity
last_reviewed: 2026-07-04
sources: [sources/README.md (NIST, TrendForce, Tom's Hardware, Bloomberg, NAND Research, IMEC), sources/articles/july-2026-market-update-2026-07-04.md]
---

# TSMC (Taiwan Semiconductor Manufacturing Company)

세계 최대 파운드리. 본 위키에는 직접 메모리 경쟁자가 아니라 **벤치마크 baseline**과 **간접 관계자**로 등장한다:

1. **공정 전환 베스트 프랙티스** — "Nx·Nx+·Nx++" enhancement 패턴
2. **CHIPS Act 보조금 비교 기준** — Samsung Texas 협상의 레퍼런스
3. **HBM 베이스다이 파운드리** — SK하이닉스의 HBM4 베이스다이 일부를 TSMC가 제조
4. **Samsung Foundry 비교** — 동일 산업, 다른 비즈니스 모델

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| 본사 | 대만 신주(新竹) |
| 사업 | 파운드리 (foundry, 위탁 제조) |
| 주요 고객 | NVIDIA, AMD, Apple, Broadcom 등 — 메모리사 직접 고객 아님 |
| Samsung 관점 | 직접 경쟁 X, 간접 경쟁(Foundry) + 메모리 베이스다이 파트너 |

## CHIPS Act 보조금 — Samsung 협상 기준

| 기업 | 보조금 | 비고 |
|------|--------|------|
| Intel | $8.5B | 1위 |
| TSMC | **$6.6B** | 2위 — 베이스라인 |
| Micron | $6.16B | 3위 |
| **Samsung** | **$4.745B** | 4위 — TSMC 대비 72% 수준 |

- 출처: NIST, [chips-act.md](../concepts/chips-act.md)
- 목표 대비 60~80% 수준 — D8 2단계 협상 필수
- TSMC의 미국 거점(Phoenix, Arizona) 보조금 협상이 Samsung Texas 협상의 직접 레퍼런스

## 공정 전환 enhancement 패턴 — RS7 R&D의 영감

TSMC는 노드 전환을 **"Nx → Nx+ → Nx++"** 점진 개선으로 잘게 쪼개 학습곡선 이익을 극대화. 예: N3 → N3E → N3P → N3X.

삼성 메모리는 이 패턴을 NAND/DRAM에 적용 — V10 → V10+ → V10++ 점진 개선. 자세히는:
- [strategies/invariant/rs7-ai-engineering-automation.md](../strategies/invariant/rs7-ai-engineering-automation.md) — NAND 공정 전환 주기 연장 R&D 4 트랙
- [nand-process-transition.md](../concepts/nand-process-transition.md) — 학습곡선 경제학 (ramp 6M 단축 = 이익 2배)

## HBM 베이스다이 파운드리

- HBM4 베이스다이(로직 다이)는 메모리사 자체 제조 또는 파운드리 외주
- SK하이닉스 일부 HBM4 베이스다이를 TSMC에 외주 (HBM 베이스다이 커스텀 로직 = NVIDIA co-design 산출물)
- Samsung은 Foundry를 내재화한 강점 — DS 부문 통합 가능성 ([wiki/strategies/core/current-state-mb4-custom-ai-memory.md](../strategies/core/current-state-mb4-custom-ai-memory.md))

## Samsung Foundry 비교 baseline

- TSMC는 N2(2nm) 양산을 2025년 시작, 2026년 본격화
- Samsung Foundry는 2nm 진입을 시도 중 — 수율과 고객 확보에서 격차
- 메모리사업부와 무관해 보이나, DS 부문 전체 자본 배분 / R&D 우선순위 결정에 영향 (SD1 HBM P&L 분리 결정에도 관련)
- 참고: [strategies/core/current-state-sd1-hbm-pnl-spinoff.md](../strategies/core/current-state-sd1-hbm-pnl-spinoff.md)

## 시나리오별 함의

- **시나리오 A (황금 요새)**: 미·대만 동맹 강화 — TSMC Arizona 보조금 확대, Samsung Texas와 보조금 격차 확대 리스크
- **시나리오 B (AI 르네상스)**: NVIDIA 수요 폭증 — TSMC가 GPU 다이 + HBM 베이스다이 동시 수혜
- **시나리오 C (기술 냉전)**: 대만 지정학 리스크 ↑ — Samsung Texas의 전략적 가치 상승
- **시나리오 D (조용한 재편)**: 미·중 공존 + AI 둔화 — TSMC도 수요 감소, 메모리·파운드리 동반 둔화

## 위키 내 관련 페이지

- [samsung.md](samsung.md) — Samsung Foundry 동일 회사 내 비교
- [chips-act.md](../concepts/chips-act.md) — CHIPS Act 보조금 순위
- [nand-process-transition.md](../concepts/nand-process-transition.md) — enhancement 패턴 학습곡선
- [strategies/invariant/rs7-ai-engineering-automation.md](../strategies/invariant/rs7-ai-engineering-automation.md)
- [strategies/invariant/rs6-process-leadership.md](../strategies/invariant/rs6-process-leadership.md) — 공정 리더십 회복
- [strategies/core/current-state-sd1-hbm-pnl-spinoff.md](../strategies/core/current-state-sd1-hbm-pnl-spinoff.md)

---

## [Update 2026-05-19] 권석준 인터뷰 (SBS, 2026-04-11) — HBM 로직다이 파운드리 지위

### 핵심 위상

10nm 이하급 로직 양산 가능 회사 3사(TSMC·Intel·Samsung Foundry) 중 TSMC가 **HBM 로직다이 사실상 표준 공급사**:

- SK Hynix HBM4 로직다이: N12 (TSMC) ([SemiAnalysis ISSCC 2026](../concepts/hbm-roadmap.md))
- Micron HBM4 로직다이: N12 (TSMC)
- 권석준 평가: SK하이닉스에 대해 **"TSMC에 인질 잡힐 위기"** — SK는 플랜 B 시급 ([sk-hynix.md](sk-hynix.md) [Update 2026-05-19] 권석준 섹션)

### TSMC의 layered 파운드리 구조 = 한국 부재 모델

권 교수가 강조한 대만 파운드리 산업 구조:
- TSMC가 최선단(2nm) → 5/4/3nm 구형 공정은 UMC·PSMC·Vanguard(VIS) 같은 2~4등 업체로 전수
- 세대가 겹치지 않게 분담 → TSMC는 가장 비싼 칩에 집중
- 한국은 동급 구조 부재 (DB하이텍 규모·기술 격차 큼)
- 결과: 한국이 가져가야 할 중·후행 세대 메모리 물량을 CXMT가 흡수 — Samsung·SK 위협의 구조적 원인 중 하나

### Samsung 전략 시사점

- Samsung Foundry는 TSMC와 함께 10nm 이하 양산 가능한 3사 중 1곳 + 메모리도 하는 유일 회사 = **수직 통합 잠재력** ([samsung.md](samsung.md) [Update 2026-05-19])
- 단 SemiAnalysis 평가는 Samsung SF4 베이스다이가 TSMC N12 대비 고비용 노선 — Samsung Foundry의 수율·비용 경쟁력이 차별점 실현의 전제

**출처**: [youtube-kwon-seokjun-2026-04-11.md](../../sources/articles/youtube-kwon-seokjun-2026-04-11.md)

## [Update 2026-06-10] 딥리서치 — CoWoS·선단 캐파 정량 + "상방 최종 병목" 지위

4대 병목 정량 모델([bottleneck-model-2030.md](../concepts/bottleneck-model-2030.md))에서 TSMC는 파운드리·패키징 두 축의 중심:

- **CoWoS**: 2025년 캐파 **두 배** 증설에도 "**still fully loaded**"(2026 수요도 강세 발언). TrendForce 집계: **2026년 말 11.5만~14만 장/월 → 2027 ~17만 장/월**(연간 2026 ~130만 장 → 2027 ~200만 장). 전 세계 2.5D 부족은 2027년부터 점진 완화.
- **선단 로직**: AI 가속기 매출 **2024년부터 5년간 중간 40%대 CAGR** 가이던스. 3nm 2026말 ~18만 장/월·2nm ~10만 장/월(TrendForce). 미국 추가 **$1,000억**(웨이퍼 팹 3 + 첨단 패키징 팹 2), 애리조나 AP 팹 **2029년 전** 가동 목표. ASML High-NA 2026말 HVM 요건 도달 → **2027~28 고객 양산 삽입**.
- 미국 후공정 생태계: Amkor 애리조나 **2028년 초**·SK hynix 인디애나 **2028년 말** — 2030 패키징 지역 분해(기준): 대만 0.546 / 미국 0.070 / 한국 0.056 (백만 장/년).
- **병목 지위**: 패키징은 2026~27의 최예리한 운영 병목이나 라인 개통 후 완화가 빠름. 반면 **선단 로직은 상방 시나리오에서 끝까지 남는 최종 병목** — 돈·전력이 충분해도 AI 배정 선단 캐파(0.62/0.75/0.95백만 장/년)가 출하 상한 결정. 하방 충격은 -0.43EB(-14.9%)로 4축 중 최소.
- Samsung 함의: TSMC 단일 공급 집중(single-supplier concentration)이 상방을 누르는 구조 = Samsung Foundry 2nm·삼성 HBM4 베이스다이의 **대체 슬롯 가치**가 상방 시나리오일수록 커짐.

**출처**: [deep-research-2030-bottleneck-quant-model-2026-06.md](../../sources/papers/deep-research-2030-bottleneck-quant-model-2026-06.md) · [deep-research-bottleneck-monitoring-dashboard-design-2026-06.md](../../sources/papers/deep-research-bottleneck-monitoring-dashboard-design-2026-06.md)

## 업데이트 (2026-07-04)

- **N2 램프**: 2026년 3월부터 매출 기여 시작, 유의미한 매출 기여는 2026 Q3 예상. Kaohsiung Fab 22 + Baoshan 동시 램프 진행 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- **CoWoS 세부 배정**: NVIDIA가 CoWoS 배정량의 ~60%(~59.5만 장)를 점유. TSMC는 2026년 24만~27만 장을 OSAT(Amkor·SPIL)에 외주. 첨단 패키징이 2026년 TSMC 총 CAPEX($520~560억)의 최대 20%를 배정받음. CEO 웨이저자(C.C. Wei)는 "CoWoS 캐파는 매우 타이트하며 2025~2026년까지 계속 sold out" 상태라고 재확인 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- **CoPoS**: 2026-06-17 TrendForce 확인 — AP7 Chiayi 파일럿(310×310mm 글래스코어 패널) 트라이얼 수율 ~90%. 다만 **전면 양산 램프는 2028년 하반기~2029년**으로 재확인(DigiTimes: 2029년 목표) — 이전 위키 서술과 일치하되 양산 지연은 재확인·강조 필요 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- **ASML High-NA EUV 도입 연기**: TSMC가 High-NA EUV 도입을 최소 2029년까지 연기 결정 — 비용 대비 현행 장비로 충분하다는 판단, 이전 전망(2027~28)보다 후퇴 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
