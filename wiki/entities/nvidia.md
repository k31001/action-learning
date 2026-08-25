---
type: entity
last_reviewed: 2026-08-25
sources: [sources/README.md (NVIDIA IR / 기술 블로그, UBS, BofA, TrendForce, theCUBE, JLL, CNBC), sources/raw-notes/bottleneck-model-update-2026-08-25.md, sources/raw-notes/memory-market-strategy-update-2026-08-25.md]
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

## [Update 2026-08-25] Rubin 양산 본격화·3사 HBM4 인증 확정·SK하이닉스 $500B+ LOI

### Rubin 양산 본격화(2026 하반기)

- Rubin 플랫폼 양산이 **2026년 하반기 본격화**, HBM4 최대 **288GB/22TB/s**(위 [Update 2026-05-19]의 SemiAnalysis 사양 전망과 일치)([memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)).
- **삼성·SK하이닉스·Micron 3사 모두 NVIDIA Rubin向 HBM4 인증 완료**(2026-06-05 발표) — [samsung.md [Update 2026-07-21]](samsung.md)에서 확인된 "인증 통과, 볼륨 발주 대기" 상태 이후 3사 인증 자체는 재확인됨([bottleneck-model-update-2026-08-25.md](../../sources/raw-notes/bottleneck-model-update-2026-08-25.md)).
- **Vera Rubin 2026년 출하는 20~30만대 수준으로, 대부분 물량이 2027년으로 이월** — 초기 Q3 2026 출하, Q4 볼륨 램프이나 "late" 진행([bottleneck-model-update-2026-08-25.md](../../sources/raw-notes/bottleneck-model-update-2026-08-25.md)). 2026년 자체 물리적 공급 압력은 완화되나 2027년으로 수요가 이연되는 구조 — 위 "HBM 사용량" 표의 Rubin 공급 배정 비중(SK 70%/Samsung 28%/Micron 18%, UBS)은 물량 자체가 이월되며 시점이 뒤로 밀리는 효과와 함께 해석 필요.

### SK하이닉스와 $500B+ 전략적 파트너십 LOI(2026-07-25) — HBM4 공동개발

- NVIDIA와 SK그룹이 2026-07-25 **$500B+ 규모의 전략적 파트너십 LOI**를 체결 — AI 팩토리(SK텔레콤 2GW Vera Rubin DSX 데이터센터, 2027년 1단계 가동)와 **HBM4 공동개발·장기공급**을 포함([memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)). 위 "2. co-design 파트너십 = 락인" 섹션에서 기술한 "SK하이닉스와 HBM4 공동 개발" 관계가 금액·범위 면에서 대폭 확대된 최신 사례 — 상세 함의는 [sk-hynix.md [Update 2026-08-25]](sk-hynix.md)·[samsung.md [Update 2026-08-25]](samsung.md) 참조.

**출처**: [bottleneck-model-update-2026-08-25.md](../../sources/raw-notes/bottleneck-model-update-2026-08-25.md), [memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)
