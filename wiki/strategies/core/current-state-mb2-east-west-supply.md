# 현황 분석: MB-2 동서 균형 공급망

> **전략 핵심**: 한국+미국+일본+인도 4거점 + 시안 라이선스 갱신 — "유일한 글로벌 플레이어" 포지션. 비중국 신흥 시장 매출 3배+ (2028 vs 2025).
> **분류**: 메인벳 (점수 12)

---

## 1. 정량 현황

### 글로벌 생산 거점 현황 (2026 Q1)

| 거점 | 역할 | 진척 | 출처 / 신뢰도 |
|------|------|------|------|
| **한국 (평택·기흥)** | HBM4/5, 첨단 DRAM·NAND 전략 허브 | P4·P5 1c nm 전환 진행, P5·P6 NAND 대체 라인 준비 | Samsung IR · ✅ |
| **미국 (텍사스 테일러)** | HBM4E/HBM5 미국 공급 거점 | **CHIPS Act 보조금 $4.745B 확정** (목표 대비 60~80%, 2024.4) | NIST, Bloomberg · ✅ |
| 텍사스 2기 (계획) | HBM4E·HBM5 전용 (2030 가동 목표) | 2026 내 CHIPS Act 2.0 신청 (목표 보조금 $60~80B) | Samsung IR · 🔵 |
| **일본 (요코하마)** | 첨단 소재·패키징 R&D 허브 | 일본 보조금 수천억 엔 ([wiki/competitors/market-share.md](../../concepts/dram-market-share.md)) | NIST, Yole · 🔵 |
| **인도 (델리/구자라트)** | OSAT 거점 (2027~2028 계획) | 인도 ISMP 인센티브 활용 검토 | strategy.md · ⚠️ |
| **중국 (시안)** | 128단 NAND, 일반 DRAM·NAND 대중국 공급 | **연간 라이선스 갱신 체제** (VEU 폐지 후) | US 상무부 · ✅ |

### 매출 지역 분포 (2025 추정)

| 지역 | 매출 비중 | 비고 |
|------|---------|------|
| 북미 (미국) | ~40% | 하이퍼스케일러 + Apple/Tesla 등 OEM | 🔵 |
| 중국 | ~20~25% | 데이터센터 + 일반 OEM | 🔵 |
| 한국·일본 | ~15% | 내수 + 일본 OEM | 🔵 |
| 유럽 | ~10% | 자동차 + 산업 | 🔵 |
| 기타 (인도·중동·동남아·남미) | ~10~15% | 신흥 시장 — **목표 3배+ 성장 (2028)** | strategy.md · ⚠️ |

### 경쟁사 글로벌 거점 비교

| 회사 | 한국 | 미국 | 일본 | 중국 | 인도 | 비고 |
|------|------|------|------|------|------|------|
| **삼성** | ✅ | ✅ (테일러) | ✅ (R&D) | ✅ (시안) | 🔵 (계획) | **유일한 5거점 보유** |
| **SK하이닉스** | ✅ | ⚠️ (인디애나 계획) | — | ✅ (다롄) | — | |
| **Micron** | — | ✅ (Idaho/NY) | ✅ (히로시마) | — | — | 미국 + 일본 |
| **CXMT** | — | — | — | ✅ | — | 중국 단일 |

### 정책 환경

- **MATCH 법안 통과 여부**: 2026 Q3~2027 Q1 결정 — 통과 시 시안 운영 사실상 차단 ([wiki/policy/us-export-controls.md](../../concepts/us-export-controls.md)) · ✅
- **VEU 폐지** (2025): 시안 팹은 연간 갱신 체제로 전환 — 갱신 실패 위험 상존 · ✅
- **CHIPS Act 2.0**: 2026 신청, 결과 2027 예상 · 🔵
- **인도 반도체 인센티브 (ISMP)**: 자본 투자의 50% 보조 가능 · ✅

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) 5거점 보유는 메모리 3사 중 유일. (2) 시안 팹은 NAND 글로벌 생산의 ~40% 차지 — 절대 비중. (3) CHIPS Act 보조금 $4.745B 확정 — 미국 재정 지원 확보. |
| **약점 (W)** | (1) 시안 라이선스 갱신 리스크 매년. (2) 텍사스 팹 1기 보조금이 목표 대비 60~80% 수준 (Micron $61.65억 대비 작음). (3) 인도 OSAT는 계획 단계, 실행 미가시. |
| **기회 (O)** | (1) 신흥 AI 시장 (사우디 Humain, UAE G42, 인도 Reliance Jio) 동시 개화. (2) 시나리오 B(공존)에서 동서 양쪽 동시 공급 = 최대 수혜. (3) 인도 ISMP 활용 시 자본 효율 ↑. |
| **위협 (T)** | (1) MATCH 법안 통과 시 시안 운영 사실상 차단 → 매출 -20~25%. (2) 한국산 반도체 25% 관세 시나리오 (트럼프 행정부) — 미국 매출 압박. (3) 텍사스 팹 단가가 한국 대비 20~30% 높음 (CHIPS Act + 관세 면제로 상쇄). |

### 외부 평가

- **Counterpoint Research**: 삼성의 동서 양쪽 시장 접근은 SK하이닉스·Micron 대비 차별 구조 ([wiki/competitors/market-share.md](../../concepts/dram-market-share.md))
- **NIST**: 텍사스 테일러 보조금 $4.745B 확정 (2024.4) — 미국 정부의 명시적 투자 지지
- **Nikkei Asia**: SK하이닉스가 인디애나 팹 검토 중이나 CHIPS Act 보조금 미확정 — 삼성 대비 후발

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **한국 허브**: ✅ 안정 — P4/P5 1c nm 전환 진행
- **미국 (텍사스 1기)**: ✅ 진행 중 — 보조금 확정, 가동 시점 보도 분분 (2026~2027)
- **미국 (텍사스 2기)**: ⚠️ 신청 단계 — 2026 내 CHIPS Act 2.0 신청 예정
- **일본 R&D 허브**: ✅ 운영 중 (SA-2 별도 분석 참조)
- **중국 (시안)**: ⚠️ **연간 갱신 리스크** — 라이선스 비갱신 시나리오 대비 필요 (Plan B: 평택 P5/P6 이전)
- **인도 OSAT**: 🔵 계획 단계 — 2027~2028 가동 목표

### 다음 마일스톤

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026 Q4 | 시안 라이선스 갱신 결과 | 시나리오 분기점 |
| 2026 Q4 | CHIPS Act 2.0 신청 | 텍사스 2기 자금 |
| 2027 Q1 | MATCH 법안 미국 의회 결정 | 시나리오 A vs B 결정 |
| 2027 H1 | 텍사스 1기 가동 | 미국 현지 HBM 공급 진입 |
| 2027~2028 | 인도 OSAT 가동 | 5거점 완성 |
| 2028 | 비중국 신흥 시장 매출 3배+ (vs 2025) 목표 | MB-2 KPI |
| 2030 | 텍사스 2기 가동 + HBM4E/5 미국 공급 | 미국 공급망 거점 완성 |

### 신뢰도 한계

- 매출 지역 분포는 외부 추정 — Samsung IR이 메모리만 따로 분리 공시하지 않음.
- 신흥 시장 매출 3배+ 목표는 strategy.md 내부 목표 — 외부 검증 불가.
- 시안 라이선스 갱신 결정은 미국 정책 변동에 종속 — 매년 재평가 필요.

---

## 4. 출처

- [CHIPS Act Samsung Texas Taylor — NIST](https://www.nist.gov/news-events/news/2024/04/biden-harris-administration-announces-preliminary-terms-samsung-electronics)
- [Samsung pulls ahead of SK Hynix as commodity DRAM prices surge — Digitimes](https://www.digitimes.com/news/a20260504VL202/samsung-sk-hynix-dram-hbm4-price.html)
- 내부: [wiki/policy/us-export-controls.md](../../concepts/us-export-controls.md), [wiki/policy/chips-act.md](../../concepts/chips-act.md), [wiki/competitors/market-share.md](../../concepts/dram-market-share.md), [wiki/market/2026-q1-current-state.md](../../concepts/2026-q1-current-state.md)
