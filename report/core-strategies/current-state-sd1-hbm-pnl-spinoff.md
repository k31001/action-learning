# 현황 분석: SD-1 HBM 조직 독립 P&L + 패키징 인재 전략

> **전략 핵심**: HBM 사업부를 메모리사업부 내 독립 P&L 센터로 분리, 패키징 기술(하이브리드 본딩) 전담 조직 신설. TSMC·IMEC·ASE 출신 100인+ 채용.
> **분류**: 메인벳 (점수 12)

---

## 1. 정량 현황

### HBM 사업부 추정 매출·비중

| 지표 | 2024 | 2025 | 2026E | 출처 / 신뢰도 |
|------|------|------|------|------|
| Samsung HBM 매출 (추정) | ~$70억 | ~$60억 (점유율 17→35% 변동) | ~$160억 (점유율 30%+ 회복 시) | Counterpoint, Yole · 🔵 |
| Samsung 메모리 전체 매출 | ~$650억 | ~$720억 | ~$900억+ | Samsung IR · 🔵 |
| HBM이 메모리 매출 비중 | ~11% | ~8% | **~18%** | 자체 계산 · 🔵 |
| HBM 사업부 영업이익률 (추정) | ~25% | ~30% | **35%+ 목표** (호황기) | strategy.md, SK 49% 비교 · ⚠️ |

### 경쟁사 HBM 조직 구조 — 외부 공개 정보

| 회사 | HBM 조직 구조 | 패키징 전담 | 외부 인재 영입 |
|------|---------|------|------|
| **SK하이닉스** | 메모리 솔루션 사업부 내 HBM Business Unit (2024 분리) | 청주 패키징 팹 ($1.7B 투자, 2026 Q4 가동) | NVIDIA Co-design 전담 (다수) |
| **Micron** | HBM 별도 BU 운영 (Idaho/NY 본거지) | Idaho ID2 우선 집행 | (구체 비공개) |
| **삼성** | 메모리사업부 내 HBM 라인 (별도 P&L 미공개) | 평택 패키징 라인 (DRAM과 통합) | (공개 사례 부재) |

### 패키징 인재 시장 (2026)

| 회사 | 패키징 R&D 인력 추정 | 출처 / 신뢰도 |
|------|---------|------|
| TSMC | 5,000+ (CoWoS 중심) | TSMC 사업보고서 · 🔵 |
| IMEC | 600~800 (3D 패키징·하이브리드 본딩 R&D) | IMEC 연차보고서 · 🔵 |
| ASE | 3,000+ (OSAT 패키징) | ASE 사업보고서 · 🔵 |
| **삼성 (DS 패키징)** | (구체 비공개, 1,000~2,000 추정) | 자체 추정 · ⚠️ |
| **SK하이닉스 패키징** | 청주 팹 인력 1,000+ | KED Global · 🔵 |

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) Samsung Foundry 보유 — 패키징 기술이 파운드리와 자연 통합 가능. (2) 평택 P5·P6 인프라 확보. (3) 2025 현금성 자산 $63B로 대규모 채용·인수 가능. |
| **약점 (W)** | (1) HBM이 메모리사업부 내부 라인으로 운영되어 P&L 가시성 부족. (2) SK하이닉스 청주 패키징 팹($1.7B) 대비 패키징 전용 인프라 명확하지 않음. (3) 패키징 R&D 인력이 TSMC·IMEC 대비 부족 추정. |
| **기회 (O)** | (1) HBM 매출 비중이 2024 11% → 2026E 18%로 사업부 내 비중 증가 — 분리 정당화. (2) Hybrid bonding 도입으로 패키징이 차별화 영역으로 부상. (3) TSMC·IMEC·ASE 패키징 인재 영입 시장 활발. |
| **위협 (T)** | (1) 조직 분리 자체로는 매출 효과 없음 — 단순 거버넌스 변경. (2) SK하이닉스 청주 패키징 팹 본격 가동(2026 Q4) 시 격차 가시화. (3) 인재 영입은 보안·IP 유출 리스크 동반. |

### 외부 평가

- **KED Global**: SK하이닉스의 청주 패키징 팹 + NVIDIA Co-design은 HBM 경쟁의 결정 요인 ([data/competitors/sk-hynix.md](../../data/competitors/sk-hynix.md))
- **Counterpoint**: 삼성의 HBM 회복(Q3 2025 35%)은 인증 통과 결과이지 조직 변화 결과는 아님
- **Bloomberg**: 메모리사들의 패키징 전담 조직 강화 추세 — 차별화 영역으로 부상 ([data/technology/nand-process-transition.md](../../data/technology/nand-process-transition.md))

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **HBM 조직 구조**: 메모리사업부 내 라인 — **공개된 P&L 분리 사례 없음**. SK하이닉스 HBM BU(2024 분리) 대비 거버넌스 후행.
- **패키징 인프라**: 평택 패키징 라인 (DRAM/NAND와 통합) — SK 청주 팹 같은 패키징 전용 거점 부재.
- **외부 인재 영입**: 공개된 사례 부재. 100인+ 전략 채용은 strategy.md 내부 목표.

### 다음 마일스톤

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026 H1 | HBM 사업부 독립 P&L 결정 (이사회 결의 가정) | 거버넌스 변경 — 가시성 확보 |
| 2026 H2 | 패키징 전담 조직 신설 + 외부 인재 채용 시작 | 인재 시장 진입 |
| 2026 Q4 | SK하이닉스 청주 패키징 팹 가동 | 격차 가시화 — 비교 기준점 |
| 2027 H1 | HBM 사업부 분리 회계 첫 보고 (가정) | 성과 측정 시작 |
| 2027~2028 | 외부 패키징 인재 100인+ 채용 완료 (목표) | SD-1 KPI |
| 2028 | HBM 사업부 영업이익률 35%+ 회복 (호황기) | KPI 목표 |

### 신뢰도 한계

- 메모리사업부 내부 P&L 분리는 외부 공개 자료 사실상 부재 — 가장 큰 정보 공백.
- 패키징 R&D 인력 규모는 외부 추정 (Samsung IR 미공시).
- HBM 매출 추정치는 점유율 × HBM 시장 규모로 역산 — 정확도 ±20% 추정.

---

## 4. 출처

- [SK hynix HBM4 supply backlog — KED Global 2026-04-23](https://www.kedglobal.com)
- [Counterpoint Research HBM Market Share](https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share)
- 내부: [data/competitors/sk-hynix.md](../../data/competitors/sk-hynix.md), [data/competitors/micron.md](../../data/competitors/micron.md), [data/technology/nand-process-transition.md](../../data/technology/nand-process-transition.md)
- TSMC, IMEC, ASE 사업보고서 (인재 규모 추정)
