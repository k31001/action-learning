# 현황 분석: RS-3 고객특화·전환비용 극대화 (CMX/SCADA/FDP)

> **전략 핵심**: NVIDIA 생태계의 3대 데이터 경로(CMX·SCADA·FDP)에 깊이 통합 — 호황기 락인, 다운사이클 인하 압박 흡수. 통합 매출 잠재력 $8~9B/년 (2030).
> **분류**: 메인벳 (점수 15)

---

## 1. 정량 현황

### 3대 영역 시장 규모

| 영역 | 시장 규모 (2025) | 시장 규모 (2030~2035) | CAGR | 출처 / 신뢰도 |
|---|---|---|---|---|
| **CMX** (KV 캐시 G3.5) | NVIDIA CES 2026 공식 발표, 17개 클라우드·스토리지 파트너, 2H 2026 일반 출시 | — (NVIDIA Storage-Next 표준의 한 부분) | — | NVIDIA 공식 ([data/technology/nvidia-cmx-scada.md](../../data/technology/nvidia-cmx-scada.md)) · ✅ |
| **SCADA** (AI 스토리지) | $36B (2025) | $322B (2035) | **24%** | MarketsAndMarkets · 🔵 |
| **FDP** (NVMe TP41461) | NVMe 표준 (Meta+Google+Samsung 공동) | (NAND 시장 일부, 별도 규모 추정 부재) | — | NVMe Consortium · ✅ |

### CMX·SCADA 진영 — 전략 파트너십 분포 (2026 기준)

| 메모리/SSD사 | CMX 공식 공급 | SCADA 100M IOPS SLC NAND 양산 |
|---|---|---|
| **삼성** | PM1753 ✅, PM1763 GTC 시연 | 공개 로드맵 **없음** ⚠️ |
| **SK하이닉스** | 검토 중 | AI-N P (Phison 컨트롤러) — 2,500만→1억 IOPS 로드맵 ✅ |
| **Kioxia** | — | 1억 IOPS SLC, **2027 양산 목표** ✅ |
| **Micron** | 9650 (PCIe Gen6, SC'25에서 2.3억 IOPS 시연) ✅ | (CXL 우선) |

### FDP 표준 진척

- NVMe TP41461 표준화 **2022.12 완료** (Meta + Google + Samsung 공동)
- 효과: WAF -50%, OP -28%, 드라이브 수명 2배, 쓰기 속도 2배
- 호스트 SW 통합 채택 사례: 일부 하이퍼스케일러 파일럿 단계 (2026 기준 양산 미공개) · 🔵

### 가격 효과 — 락인의 정량 증거

| 항목 | 수치 | 출처 / 신뢰도 |
|------|------|------|
| HBM3E 2026 가격 인상 합의 (Samsung+SK 공동) | **+20% YoY** | TrendForce 2025-12-24 · ✅ |
| HBM4 단가 vs HBM3E | +67% 프리미엄 (~$500 vs ~$300/개) | NAND Research · 🔵 |
| Samsung HBM 점유율 회복 (Q3 2025) | 17%→35% | Counterpoint Research · ✅ |

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) FDP 표준 공동 개발자 — 구글과 NVMe TP41461을 공동 개발한 차별적 위치. (2) PM1753 CMX 공식 공급으로 진입점 확보. (3) Samsung Foundry 보유로 컨트롤러·firmware·NAND 통합 가능. |
| **약점 (W)** | (1) **SCADA AI SSD 공개 로드맵 없음** — SK하이닉스(AI-N P), Kioxia(1억 IOPS, 2027), Micron(9650 reference) 모두 SLC NAND 기반 진입 중. 삼성만 공백. (2) Co-Validation 모델은 인력 부담 큼 (RS-7 AI 자동화 prerequisite). |
| **기회 (O)** | (1) AI 스토리지 $36B → $322B (CAGR 24%) — 신규 사업 카테고리. (2) NVIDIA가 단일 공급사(SK하이닉스 70%) 의존 회피 인센티브 보유. (3) FDP 3계층 사업 모델 (HW 프리미엄 + 라이선스 + 컨설팅) — $2~3B/년 (2030). |
| **위협 (T)** | (1) SK하이닉스 + Kioxia가 SCADA 표준을 먼저 잡으면 HBM 패권 손실 반복 위험. (2) FDP 표준은 오픈이라 단순 구현체로는 차별화 약함. (3) 하이퍼스케일러가 자체 SW로 차별화 경로 우회 가능. |

### 외부 평가

- **TrendForce**: SCADA AI SSD에서 SK하이닉스·Kioxia가 전략 파트너 지위 선점 — 삼성의 SLC AI SSD 전략 수립 시급 ([data/technology/nvidia-cmx-scada.md](../../data/technology/nvidia-cmx-scada.md))
- **Blocks & Files**: NVIDIA SCADA + DOCA SDK 통합은 AI 추론 표준 인터페이스 후보 (data/technology/nvidia-cmx-scada.md)

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **CMX**: ✅ 진입 — PM1753 공식 공급 + PM1763 시연. 다만 NVIDIA Storage-Next 생태계 내 지분 확장 필요.
- **SCADA**: ⚠️ **위기** — 공개 로드맵 없음. SK하이닉스·Kioxia·Micron이 표준 파트너 지위 선점 중. 2026 Samsung Tech Day에서 SLC AI SSD 전략 공개가 결정적.
- **FDP**: ✅ 강점 — 공동 개발자 위치 + 호스트 SW 통합 노하우. 다만 매출화는 2027~2028 본격화.

### 다음 마일스톤

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026 Samsung Tech Day | SCADA AI SSD 로드맵 공개 (목표) | SK·Kioxia 추격 가능성 결정 — **가장 결정적** |
| 2026 H2 | NVIDIA CMX 일반 출시 + BlueField-4 DPU 출하 | PM1763 양산 전환 |
| 2027 | Kioxia 1억 IOPS SLC NAND 양산 | 표준 고착화 — 삼성 진입 윈도우 닫힘 |
| 2028 | FDP 검증 SSD 매출 비중 30% 목표 (내부) | RS-3 매출 검증점 |
| 2030 | 통합 매출 $8~9B/년 (CMX + SCADA + FDP) 목표 | RS-3 KPI |

### 신뢰도 한계

- SCADA AI SSD 전략은 strategy.md의 내부 목표 — 외부 공개 로드맵 부재가 가장 큰 리스크 신호.
- $8~9B/년 (2030) 매출 목표는 strategy.md 추정치 — 외부 벤치마크 없음.

---

## 4. 출처

- [Samsung Reportedly Plan 20% HBM3E Price Hike for 2026 — TrendForce](https://www.trendforce.com/news/2025/12/24/news-samsung-sk-hynix-reportedly-plan-20-hbm3e-price-hike-for-2026-as-nvidia-h200-asic-demand-rises/)
- [Global DRAM and HBM Market Share — Counterpoint Research](https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share)
- 내부: [data/technology/nvidia-cmx-scada.md](../../data/technology/nvidia-cmx-scada.md), [data/market/hbm-market.md](../../data/market/hbm-market.md)
- NVMe Consortium: NVMe TP41461 Specification (FDP)
- NVIDIA: CES 2026 CMX 공식 발표
