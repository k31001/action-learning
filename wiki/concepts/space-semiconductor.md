---
type: concept
last_reviewed: 2026-06-11
sources:
  - sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md
---

# 우주용 반도체 (Space Semiconductor) — 선별 COTS·중간지대 전략

> **한 줄 요약**: 완전한 rad-hard가 아니더라도 **shielding + 선별 COTS + fault-aware firmware + long-lifecycle 패키징**의 중간지대가 충분히 시장이 된다. Samsung의 long-lifecycle 라인 강화 명분.

---

## 1. 시장 수요 — Smallsat 폭발

- **BryceTech 2024**: 약 **2,800기** smallsat 발사
- 전체 우주기체의 **97%** 차지
- → 메모리·스토리지·MCU 수요 동반 폭발

## 2. 공식 기관의 관점 변화

### 2.1 NASA SmallSat 기술 보고서
- **Radiation shielding을 비용효율적 리스크 완화 수단**으로 공식 설명
- COTS 전자부품 사용 가속 인정

### 2.2 ESA
- COTS 도입을 우주선 제작 방식 변화의 핵심으로 평가
- **"Risk Avoidance가 아닌 Risk Management"** 강조 — 전면 회피 → 관리·완화로 패러다임 이동

---

## 3. 중간지대 — 사업 진입 영역

> 완전 rad-hard 시장은 작고 진입장벽 높음. 일반 상용 시장에 우주 인증 추가는 부가가치 큼. **그 사이의 중간지대**가 가장 큰 기회.

| 중간지대 영역 | 기술·제품 | Samsung 강점 매칭 |
|---|---|---|
| **선별 COTS 메모리/스토리지** | 우주 환경 인증된 DDR4·DDR5·SSD 일부 SKU | 메모리 전 영역 보유 ✅ |
| **Fault-logging firmware** | 단일 비트 오류·우주선 충돌 이벤트 로깅 | SmartSSD·CXL SMDK firmware 노하우 ✅ |
| **Long-lifecycle DDR4 / SSD** | 10년+ 공급 보증, EOL 안내 5년+ | Samsung 자동차·산업용 DDR4 라인 |
| **Shield-aware 패키징** | 차폐재 결합 모듈, 방사선 흡수 PCB | 패키징 기술 ✅ |
| **EDAC 메모리 컨트롤러** | Error Detection and Correction 강화 | 메모리 컨트롤러 IP |

---

## 4. 한계 — 일반화 금지 영역

다음 영역은 본 페이지의 권고에서 **명시적으로 제외**:

| 영역 | 이유 |
|---|---|
| **Deep-space 미션** (Mars, 외행성) | 방사선 환경·신뢰성 요구가 차원이 다름. 완전 rad-hard 필수 |
| **장주기 임무** (10년+ deep-space) | COTS 신뢰성 데이터 부족 |
| **군수·국방 고신뢰** | 별도 인증 체계(MIL-STD-883 등) 필수 |

→ **Smallsat·LEO 통신위성·지구관측위성** 중심 진입

---

## 5. Samsung 전략 매칭

### 5.1 SD-2 산업용 AI 메모리 확장

[SD-2 산업용 AI 메모리](../strategies/core/current-state-sd2-industrial-ai-memory.md)에 우주·국방·항공우주 라인 신규 추가:

- 기존: 자동차·산업·네트워킹
- 신규: **우주(smallsat)·국방·항공우주 long-lifecycle DDR4/DDR5/SSD**
- Samsung 2026 Q1 발표 "**항공우주 산업 포트폴리오 확대**" 발언과 정합

### 5.2 RS-2 바벨 포트폴리오 — long-lifecycle 끝단 강화

[RS-2 바벨 포트폴리오](../strategies/invariant/rs2-barbell-portfolio.md)의 long-lifecycle 끝단 강화:

- **현재**: 자동차·산업 중심
- **확장**: 우주·국방·항공우주 — 비경기민감 수요 + 고마진
- Micron의 Manassas DDR4/1α long-lifecycle 라인([bloomberg-micron-ceo-virginia-2026-05-22.md](../../sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md))과 직접 경쟁

---

## 6. 시나리오 플래닝 함의

| 시나리오 | 작동 |
|---|---|
| **A** | 디커플링 환경에서 미국·동맹 우주 산업 수요 흡수 |
| **B** | 본 시장은 상대적으로 작음 (메모리 본업 대비) — 옵션 가치 보존 |
| **C** | **국방·우주 수요는 다운턴에도 견조** — 사이클 헤지 자산 |
| **D** | 비경기민감 매출원으로 작동 |
| **E** | HBM 도태 시에도 long-lifecycle 라인은 유지 — 자산 보존 |

→ **C·D·E 시나리오에서 큰 옵션 가치**

---

## 7. EWI 후보

| 지표 | 임계값 | 작동 |
|---|---|---|
| Smallsat 발사 수 (BryceTech) | +20% YoY | 시장 확장 가속 |
| Samsung 우주·국방용 SKU 공식 출시 수 | 분기 1건+ | 진입 진척 |
| Long-lifecycle DDR4/SSD 공급 보증 기간 | 10년 ↗ | 차별화 진척 |

---

## 8. 출처

- [senior-partner-interview-deep-research-2026-06-11.md](../../sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md) §3.5
- NASA SmallSat State of the Art (공개 리포트)
- ESA COTS guidance (공개)
- BryceTech Smallsat Markets Report 2024

---

## [Update 2026-08-06] Sachin Katti(OpenAI) — 오비탈 컴퓨트 "보완재로 실현 가능"

- OpenAI 컴퓨트 총괄의 평가: 우주 데이터센터는 "엔지니어링 문제로서 시간·투자가 있으면 해결 가능하며 **오비탈 컴퓨트의 자리는 있다**" — 단 전체 컴퓨트 수요의 해법이 아닌 **보완재(complement in the arsenal)** ([mad-podcast-sachin-katti-openai-compute-2026-07.md](../../sources/articles/mad-podcast-sachin-katti-openai-compute-2026-07.md)).
- 변곡점 조건: **발사 경제성 + 하드웨어 경제성** — "싸게 쏘아올리고, 고장 나면 (수리 불가하므로) 싸게 버릴 수 있어야" 한다. 본 페이지의 선별 COTS·저비용 폐기 전제와 일치하는 프레임 — 우주 반도체의 "고신뢰 소량"에서 "저가 대량 폐기형"으로의 전환 논지를 최대 수요자 후보가 확인.

**출처**: [mad-podcast-sachin-katti-openai-compute-2026-07.md](../../sources/articles/mad-podcast-sachin-katti-openai-compute-2026-07.md)
