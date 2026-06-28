# 핵심전략 10개 현황 분석 — 문서 인덱스

> **작업 3 산출물**: 외부 공개 자료(연차보고서·산업 리포트·뉴스·IR·경쟁사 공시)만 사용해 11개 핵심전략 각각의 정성·정량 현황을 분석.
> **선정 근거**: [wiki/scenarios/core-strategy-selection.md](../../scenarios/core-strategy-selection.md)
> **상위 문서**: [wiki/scenarios/strategy.md](../../scenarios/strategy.md) (Main Bet/Side Bet/RS 통합)

---

## 10개 전략 현황 분석

### 메인벳 5개 — 평상시 작동, 불변전략 기반 최적 (2026-06: 구 SD-1 → RS-5 흡수)

| ID | 전략 | 현재 위치 (한 줄) | 문서 |
|----|------|------|------|
| **MB-4** | 커스텀 AI 메모리 솔루션 | HBM 회복 단계, 베이스다이 커스텀은 미가시 | [current-state-mb4-custom-ai-memory.md](current-state-mb4-custom-ai-memory.md) |
| **RS-3** | 고객특화·전환비용 (NVIDIA 통합) | CMX 진입 ✅, SCADA 공개 로드맵 부재 ⚠️ | [current-state-rs3-customer-switching-cost.md](current-state-rs3-customer-switching-cost.md) |
| **RS-6** | 공정 리더십 통합 | 1c yield 60% 추격, hybrid bonding IP 공백 ⚠️ | [current-state-rs6-process-leadership.md](current-state-rs6-process-leadership.md) |
| **MB-2** | 동서 균형 공급망 | 5거점 구축 중, 시안 라이선스 매년 리스크 | [current-state-mb2-east-west-supply.md](current-state-mb2-east-west-supply.md) |
| ~~SD-1~~ | HBM 조직 독립 P&L → **RS-5 흡수** | IR·거버넌스 전술이라 시나리오 베팅에서 demote (2026-06). 의도는 RS-5(재무 규율 가시성)로 이관 | [current-state-sd1-hbm-pnl-spinoff.md](current-state-sd1-hbm-pnl-spinoff.md) |
| **RS-5** | 재무 규율 + 재투자 | 현금 $63B 강점, 이사회 정책 명문화 부재 | [current-state-rs5-financial-discipline.md](current-state-rs5-financial-discipline.md) |

### 사이드벳 5개 — 보완·헤지

| ID | 전략 | 현재 위치 (한 줄) | 문서 |
|----|------|------|------|
| **SA-2** | 일본 R&D 허브 (EUV 우회 NIL) | NIL 양산 채택 사례 부재, R&D 단계 베팅 | [current-state-sa2-japan-rd-hub-nil.md](current-state-sa2-japan-rd-hub-nil.md) |
| **SD-2** | 산업용 AI 메모리 (자동차·의료) | Tesla 다년 계약 ✅, AEC-Q100 양산 미공개 | [current-state-sd2-industrial-ai-memory.md](current-state-sd2-industrial-ai-memory.md) |
| **SE-1** | 3D DRAM + IMEC + M&A | SK 30년 로드맵 발표, Samsung 전담 조직 미공개 | [current-state-se1-3d-dram-imec-ma.md](current-state-se1-3d-dram-imec-ma.md) |
| **SE-2** | CXL SIG 표준 주도 | Pangea v3 2026 발표 예정 ✅, 인력 부족 ⚠️ | [current-state-se2-cxl-sig-leadership.md](current-state-se2-cxl-sig-leadership.md) |
| **SE-3** | AI 인프라 수직 진출 (Vertical Ascent) | Stargate Korea LOI ✅, 그룹 통합 P&L 부재 ⚠️ | [current-state-se3-vertical-ascent.md](current-state-se3-vertical-ascent.md) |

---

## 데이터 신뢰도 라벨

각 정량 데이터는 다음 3단계로 표기:

- ✅ **확정** — 공시·표준·공식 발표 (Samsung IR, NIST, JEDEC, NVMe Consortium 등)
- 🔵 **추정** — 대외 보고서·애널리스트 추정 (TrendForce, Counterpoint, Yole, BofA 등)
- ⚠️ **가정** — 외부 공개 자료 부족, strategy.md 내부 목표 또는 자체 추론

## 작성 원칙

각 문서는 다음 5단계 구조:

1. **전략 핵심** — 한 줄 요약 + 분류 (메인/사이드)
2. **정량 현황** — 시장 규모, 점유율, 성장률, 경쟁사 비교 표
3. **정성 현황** — SWOT
4. **우리의 현재 위치 평가** — 어디에 있는가, 다음 마일스톤
5. **출처** — 외부 공개 자료 URL + 내부 자료 경로

목표: **"우리는 지금 어디에 있고, 무엇이 가장 큰 정보 공백인가"**를 외부 공개 자료만으로 명확히 답할 수 있는 수준.

## 핵심 인사이트 (11개 전략 종합)

### 강점 영역 (✅)

- **Samsung Foundry 보유**: 대부분 전략의 차별화 자원 (베이스다이 커스텀, 1c nm + 패키징 통합 등)
- **현금 $63B**: RS-5 다운사이클 capex 하한 사수 자원
- **5거점 글로벌 공급망**: SK하이닉스·Micron 어느 쪽도 못 가진 구조
- **CXL·PIM 선제 진입**: CMM-D, LPDDR5X-PIM 양산 우위

### 정보 공백 (⚠️)

가장 큰 외부 공개 부재 영역들:
1. **HBM 사업부 P&L 분리** (SD-1) — 외부에 사실상 비공개
2. **자체 hybrid bonding IP 진척** (RS-6) — 공개 자료 부재
3. **SCADA AI SSD 로드맵** (RS-3) — 2026 Tech Day가 결정점
4. **3D DRAM 전담 R&D 조직** (SE-1) — SK 30년 로드맵 대비 후행 신호
5. **AEC-Q100 자동차 메모리 양산** (SD-2) — 인증 단계 추정
6. **Canon NIL 협력** (SA-2) — Texas Institute가 첫 납품, Samsung 사례 미공개
7. **다운사이클 capex 하한 정책 명문화** (RS-5) — 이사회 결의 미공개

### 행동 우선순위 (외부 가시성 회복)

- **2026 H1**: HBM 사업부 P&L 분리 + RS-5 이사회 정책 명문화 → IR 메시지 발표
- **2026 H1**: Stargate Korea 컨소시엄 운영 협약 (Electronics·C&T·SDS·Heavy 4사 분담·이익 분배) → SE-3 작동 기반
- **2026 Tech Day**: SCADA AI SSD 로드맵 공개 → SK·Kioxia 추격 가능성 결정
- **2026 H2**: 자체 hybrid bonding 특허 출원 가속 → YMTC IP 의존 회피 신호
- **2026 H2**: Stargate Korea LOI → DA 전환, neocloud equity-for-supply swap 첫 사례
- **2027**: 3D DRAM 전담 R&D 조직 발표 + IMEC 협약 + AEC-Q100 양산 가시화
- **2028**: 그룹 AI 인프라 사업 P&L 분리 공시 (SD-1 패턴 확장)
