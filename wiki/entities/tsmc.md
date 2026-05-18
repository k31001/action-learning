---
type: entity
last_reviewed: 2026-05-18
sources: [sources/README.md (NIST, TrendForce, Tom's Hardware, Bloomberg, NAND Research, IMEC)]
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
