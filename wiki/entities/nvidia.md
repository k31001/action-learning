---
type: entity
last_reviewed: 2026-05-18
sources: [sources/README.md (NVIDIA IR / 기술 블로그, UBS, BofA, TrendForce, theCUBE, JLL, CNBC)]
---

# NVIDIA Corporation

메모리·SSD 산업의 **최대 단일 수요자**. AI 데이터센터 GPU·플랫폼 시장의 압도적 1위로, HBM·고성능 SSD의 사실상 표준을 결정. 삼성 메모리사업부 입장에서 가장 중요한 고객이자 인증 게이트키퍼.

본 위키에는 NVIDIA의 두 가지 측면이 있다:
- **이 페이지**: 일반 NVIDIA — Rubin 플랫폼, HBM 점유, AI CapEx 영향
- **[nvidia-cmx-scada.md](nvidia-cmx-scada.md)**: 메모리 산업에 가장 큰 충격을 주는 두 핵심 제품(CMX 메모리 오프로드 + SCADA GPU 네이티브 스토리지)

---

## 사업 구조 (메모리 관점에서)

| 부문 | 내용 |
|------|------|
| Data Center | FY26 매출 $197.3B, 영업이익률 60.4% — 가치사슬 최상위 |
| Gaming | GPU 소비자 시장 |
| Automotive | DRIVE 플랫폼 |
| 핵심 플랫폼 | Hopper(H100/H200) → Blackwell(B100/B200) → Rubin(2026~) |

## HBM 사용량 — 메모리 산업 결정자

| 플랫폼 | 세대 | HBM 종류 | 메모리 공급 점유 |
|--------|------|---------|------------|
| H100 (Hopper) | 80GB HBM3 | 5스택 | SK 주력, Samsung 부분 공급 |
| H200 (Hopper) | 141GB HBM3E | 6스택 | SK·Micron·Samsung 분할 |
| B200 (Blackwell) | 192GB HBM3E | 8스택 12-hi | SK·Micron 우위, Samsung 인증 지연 |
| Rubin (2026~) | HBM4 | 8스택 | **SK 70% / Samsung 28% / Micron 18%** (UBS) |

- 출처: TrendForce, UBS, NVIDIA 발표 ([hbm-market.md](../concepts/hbm-market.md), [hbm-roadmap.md](../concepts/hbm-roadmap.md))
- GPU당 HBM 탑재량은 기존 HPC 대비 7배 — AI 슈퍼사이클의 메모리 수요 직접 유발

## AI CapEx의 핵심 공급자

- 빅테크 4사(Google·MS·Amazon·Meta) 2026년 AI CapEx 합산 $725B (+77% YoY)의 상당 부분이 NVIDIA GPU 구매
- 2027년 $1조 돌파 전망
- Microsoft만 메모리 가격 영향 $25B 직접 인정 — NVIDIA 수요가 메모리 가격 결정의 단일 변수
- 출처: [ai-capex.md](../concepts/ai-capex.md), [ai-server-demand.md](../concepts/ai-server-demand.md)

## NVIDIA가 메모리 산업에 던지는 충격 — 4가지

### 1. HBM 세대 전환 강제
- Rubin 플랫폼은 HBM4 필수 → SK·Samsung·Micron이 양산 일정을 NVIDIA에 맞춰야 함
- HBM4 단가 ~$500/개 (HBM3E +67% 프리미엄) — NAND Research

### 2. co-design 파트너십 = 락인
- SK하이닉스와 HBM4 공동 개발 — Samsung은 후순위
- 영향: SK 영업이익률 72% vs Samsung 비공개 ⚠️ — co-design 격차가 수익성 격차로 직결

### 3. CMX (Context Memory Storage Platform)
- BlueField-4 기반 KV 캐시 오프로드
- Samsung PM1753 **공식 공급 SSD** ✅ — 메모리 외 SSD 영역에서 삼성 강점
- 자세히 [nvidia-cmx-scada.md](nvidia-cmx-scada.md), [ssd-ufs-market.md](../concepts/ssd-ufs-market.md)

### 4. SCADA (Scaled Accelerated Data Access)
- GPU 네이티브 스토리지 — 2.3억 IOPS (SC'25 시연)
- 전략 파트너: SK·Kioxia·Micron 선점 — **삼성 SLC AI SSD 미공개**
- 디스플레이된 위협: [strategy.md](../scenarios/strategy.md)의 RS3 사례 4

## 중국 시장 변동성

| 시기 | NVIDIA 중국 점유 | 트리거 |
|------|---------------|--------|
| 2023 이전 | ~90% | 미규제 |
| 2024~ | ~50%로 급락 | 미국 수출통제 + 중국 관세 |

- 출처: [ai-demand-sustainability.md](../concepts/ai-demand-sustainability.md)
- GPU 관세 최대 +15%

## Stargate Korea LOI (2025-10)

- Samsung C&T + Heavy + SDS + Electronics + OpenAI 공동 데이터센터 평가
- 부유식 DC 공동개발
- Tier 2 규모 $15~25B 추정
- Samsung 측 전략: [SE-3 수직 상승](../strategies/core/current-state-se3-vertical-ascent.md)

## 삼성전자 전략 시사점

1. **HBM4 NVIDIA 인증 회복이 최우선 과제** — Main Bet(시나리오 B)의 사실상 전제. Q4 2026까지 인증 회복 없으면 시나리오 B에서도 28% 점유에 갇힘
2. **co-design 파트너십 확보** — SK가 차지한 자리에 진입하려면 HBM5/HBM6 세대에서 공동 R&D 필수
3. **CMX 에코시스템 심화** — PM1753 공급사 지위를 [MB4 커스텀 AI 메모리](../strategies/core/current-state-mb4-custom-ai-memory.md)로 확장
4. **SCADA 추격 시급** — SLC AI SSD 로드맵 즉시 공개 + 100M IOPS급 양산 일정 제시 ([RS3](../strategies/invariant/rs3-customer-switching-cost.md))
5. **고객 분산 헷지** — NVIDIA 단일 의존 25% 이하 유지([RS4](../strategies/invariant/rs4-customer-portfolio-diversification.md))

## 위키 내 관련 페이지

- [nvidia-cmx-scada.md](nvidia-cmx-scada.md) — CMX/SCADA 두 핵심 제품 상세
- [samsung.md](samsung.md) — 인증 게이트키퍼로서의 NVIDIA 영향
- [sk-hynix.md](sk-hynix.md) — co-design 파트너
- [micron.md](micron.md) — Rubin 18% 점유
- [hbm-market.md](../concepts/hbm-market.md), [hbm-roadmap.md](../concepts/hbm-roadmap.md)
- [ai-capex.md](../concepts/ai-capex.md), [ai-server-demand.md](../concepts/ai-server-demand.md)
- [ssd-ufs-market.md](../concepts/ssd-ufs-market.md)
- [strategies/core/current-state-mb4-custom-ai-memory.md](../strategies/core/current-state-mb4-custom-ai-memory.md)
- [strategies/invariant/rs3-customer-switching-cost.md](../strategies/invariant/rs3-customer-switching-cost.md)
- [strategies/invariant/rs4-customer-portfolio-diversification.md](../strategies/invariant/rs4-customer-portfolio-diversification.md)

---

## [Update 2026-05-19] Rubin HBM4 — SemiAnalysis 분석

### Rubin HBM4 사양 (Vera Rubin 기사)
- 용량: **288 GB** (GB300/Blackwell Ultra와 동일 유지)
- 대역폭 스케일링: ~2.8×
- 목표 속도: **22 TB/s (10.8 GT/s)** — 실제 초기 출하 ~20 TB/s 수준 예상

### 공급사 점유 — UBS와 충돌
- **SemiAnalysis (2026-02)**: Micron HBM4 자격 취득 불가 (effectively out) → SK·Samsung 양강
- **UBS (2026 Q1)**: SK 70% / Samsung 28% / Micron 18%

→ 자세한 충돌 분석은 [hbm-market.md](../concepts/hbm-market.md) 참조

### 메모리 산업 추가 충격
- **Rubin → Rubin Ultra**: HBM 용량 추가 약 **4배**
- **GPU 세대당 HBM 수요 누적**: Rubin이 Blackwell 대비 +50%, Rubin Ultra가 다시 ~4×

### Vera CPU DRAM 폭증
- Grace CPU당 512 GB → **Vera CPU당 1,536 GB (3배)**
- VR NVL72 랙 단위 서버 DRAM 수요 폭증

**출처**: [semianalysis-vera-rubin-2026-02-25.md](../../sources/articles/semianalysis-vera-rubin-2026-02-25.md), [semianalysis-ai-silicon-shortage-2026-03-12.md](../../sources/articles/semianalysis-ai-silicon-shortage-2026-03-12.md)

---

## [Update 2026-06-30] Vera Rubin 풀 프로덕션 확장 + 2H FY27 매출 컨센서스 상회 전망

### Vera Rubin 출하 — 8개 클라우드 파트너로 확장

- 2026-06-01 풀 프로덕션 공식화 이후, 2026년 가을 **8개 클라우드 파트너**(AWS·Google Cloud·Microsoft Azure·Oracle Cloud·CoreWeave·Lambda·Nebius·Nscale) 출하 확정 — 고객 기반이 빅4 하이퍼스케일러를 넘어 neocloud(CoreWeave·Lambda·Nebius·Nscale)까지 확장.

### 2H FY2027 매출 — 컨센서스 대비 +20% 전망 (SemiAnalysis)

- SemiAnalysis Accelerator Model: NVIDIA 2H FY2027 데이터센터 매출이 월가 컨센서스 대비 **약 +20% 상회** 전망. 근거: **HBM4 공급 문제 해소** + 전공정 웨이퍼 재고 누적으로 Rubin 램프 가속.
- Q2 FY2027 실적 발표 예정 **2026-08-26**(컨센서스 매출 $91.7B·EPS $2.07) — 모니터링 분기점.

### HBM4 공급사 배분 — 3사 인증 후 첫 비공식 추정치

- 2026-06-05 젠슨 황이 삼성·SK하이닉스·마이크론 **3사 모두 HBM4 자격 통과**를 확인한 데 이어, 비공식 애널리스트 배분 추정 등장: **SK하이닉스 ~60-70% · 삼성 ~25-30% · 마이크론 잔여**. UBS 기존 추정(SK 70%/삼성 28%/마이크론 18%, [hbm-roadmap.md](../concepts/hbm-roadmap.md))과 대체로 정합.

### Bottleneck Model 함의 — 파운드리 압력 재상승

- HBM4 공급 해소 → Rubin 램프 재가속은 [bottleneck-model-2030.md](../concepts/bottleneck-model-2030.md)의 **파운드리 제약지수를 52→55로 재상승**시키는 핵심 근거 — 직전(06-14) "Rubin 출하 비중 하향 = 캐파 여유" 판단이 역전됨. AI 수요 강도가 식지 않았다는 신호로, Main Bet(시나리오 B) conviction에는 긍정적이나 공급망 압박은 지속.

**출처**: [june-2026-market-update-2026-06-30.md](../../sources/articles/june-2026-market-update-2026-06-30.md)
