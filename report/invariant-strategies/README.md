# 불변전략 (Robust Strategies) — 문서 인덱스

> **목적**: 시나리오 A~E (5개) **모두**에서 긍정적 가치를 창출하는 전략. "어떤 미래가 와도 이긴다"의 조건을 충족한다.
> **재검증 결과**: 기존 RS1~RS7 비판적 평가 후 7개 재편 (메모: [robust-reverification.md](../../analysis/scenarios/robust-reverification.md))
> **상위 문서**: [scenario-planning-report.md](../scenario-planning-report.md), [analysis/scenarios/strategy.md](../../analysis/scenarios/strategy.md)

---

## 7개 불변전략

| ID | 전략명 | 핵심 메커니즘 | 문서 |
|----|--------|-------------|------|
| **RS-1** | 옵션형 캐파 체계 | Fab Shell 선행 + 장비 단계 반입 + 롤링 캐파 리뷰 | [rs1-options-based-capacity.md](rs1-options-based-capacity.md) |
| **RS-2** | 바벨 포트폴리오 | 고마진(HBM)+저원가(범용) 양 끝, 가운데 제품 축소 | [rs2-barbell-portfolio.md](rs2-barbell-portfolio.md) |
| **RS-3** | 고객특화·전환비용 극대화 | NVIDIA CMX/SCADA/FDP, Co-Validation, 베이스다이 커스텀 | [rs3-customer-switching-cost.md](rs3-customer-switching-cost.md) |
| **RS-4** | 고객 포트폴리오 의도적 분산 | LTA + Take-or-Pay, 단일 고객 ≤25% | [rs4-customer-portfolio-diversification.md](rs4-customer-portfolio-diversification.md) |
| **RS-5** | 재무 규율 + 초과이익 재투자 | 재고일수 상한, FCF 기준, 다운사이클 capex 하한 | [rs5-financial-discipline-reinvestment.md](rs5-financial-discipline-reinvestment.md) |
| **RS-6** | 공정 리더십 통합 | 1c nm DRAM 우위 + NAND 주기 연장 + Hybrid bonding 자체 IP | [rs6-process-leadership.md](rs6-process-leadership.md) |
| **RS-7** | AI 엔지니어링 자동화 | EDA·firmware·수율예측 AI 전사 도입 → 잉여 자원 전략 투입 | [rs7-ai-engineering-automation.md](rs7-ai-engineering-automation.md) |

## 시나리오 가치 매트릭스

| 전략 | 시나리오 A<br>(황금 요새) | 시나리오 B<br>(AI 르네상스) | 시나리오 C<br>(기술 냉전) | 시나리오 D<br>(조용한 재편) | 시나리오 E<br>(패러다임 전환) |
|---|---|---|---|---|---|
| RS-1 옵션형 캐파 | 정책 충격 흡수 | 빠른 증설 | 손실 회피 | 집행 지연 | 기술 피벗 |
| RS-2 바벨 포트폴리오 | 양 끝 모두 가치 | HBM 극대화 | 범용 현금흐름 | CXMT 방어 | 한쪽 갈아끼움 |
| RS-3 전환비용 극대화 | 점유율 방어 | 하이퍼스케일러 락인 | 락인 고객 이탈 방지 | 가격 인하 흡수 | SW 가치 부각 |
| RS-4 고객 분산 | 서방 편중 분산 | 신흥시장 발굴 | 위기 분산 | 안정 수요 | 다양한 기술 수요처 |
| RS-5 재무 규율+재투자 | 투자 절제 | 초과이익 재투자 | 다운턴 흑자 | 회복 자금 | 피벗 자금 |
| RS-6 공정 리더십 | 마진 우위 | Capex 회수 | IP 자립 생존 | 원가 우위 | 자원 차세대 재배분 |
| RS-7 AI 자동화 | 인력 보안 강화 | R&D 속도 | 인건비 절감 | 잉여 자원 활용 | 신기술 R&D 가속 |

> 7개 전략 × 5개 시나리오 = 35셀 모두에서 긍정 가치 창출 확인.

## 작성 원칙

각 전략 문서는 다음 구조를 공통 적용한다:

1. **전제 (Premise)** — 이 전략이 성립하기 위한 핵심 가정
2. **근거 데이터 (Evidence)** — 출처가 명시된 정량·정성 자료
3. **추론 과정 (Logic Chain)** — 전제와 근거에서 결론으로 이어지는 단계별 논리
4. **결론 (Conclusion)** — 5개 시나리오 각각에서 왜 가치를 만드는가
5. **반박 가능성 검토 (Counter-argument Review)** — 가능한 반론을 steel-man 후 재반박

목표는 "비약 없는 논리, 출처 있는 모든 수치"다.
