---
type: entity
last_reviewed: 2026-05-18
sources: [sources/README.md (Samsung Semiconductor / Samsung Electronics IR, TrendForce, Counterpoint Research, NIST, Samsung C&T / SDS Newsroom, UBS, CNBC)]
---

# Samsung Electronics — 메모리사업부 (DS 부문)

이 위키의 **분석 대상 주체**. 글로벌 메모리 1위 기업이지만, HBM 시장에서 SK하이닉스에 추월당하면서 "호황의 함정"(역대 최고 매출 + HBM 후순위)에 처해 있다. 본 시나리오 플래닝의 Focal Issue는 삼성 메모리가 2030~2035년에도 글로벌 리더십을 유지하기 위한 2026년 의사결정.

**위키 내 위치**: 분석 주체. 모든 시나리오·전략 페이지가 이 entity를 참조.

---

## 사업 구조

| 항목 | 내용 |
|------|------|
| 소속 | Samsung Electronics DS(Device Solutions) 부문 |
| 주요 제품 | DRAM(범용/HBM), NAND Flash, SSD, UFS, LPDDR, Foundry(별도) |
| 핵심 거점 | 평택·기흥·화성·텍사스 테일러·중국 시안(NAND) |
| 글로벌 위치 | DRAM 1위(42%), NAND 1위, HBM 추격(35% Q3 2025) |

## 주요 수치 (2026 Q1 시점)

| 지표 | 값 | 출처 / 페이지 |
|------|----|---------|
| Q1 2026 메모리 매출 | $50.4B | +292% YoY, 호황의 정점 ([2026-q1-current-state.md](../concepts/2026-q1-current-state.md)) |
| Q1 2026 총매출 | 134조 원 | Samsung IR |
| HBM 점유 (Q3 2025) | 35% | SK 53%, Micron 11% ([hbm-market.md](../concepts/hbm-market.md)) |
| HBM 점유 (Q2 2025, 저점) | 17% | SK 62% — 가장 추락한 분기 |
| NVIDIA Rubin HBM4 점유 | 28% | SK 70% / Micron 18% (UBS) |
| HBM4 캐파 (2026) | Sold Out | +50% YoY 증설 |
| HBM4 양산 개시 | 2026.2 | 3.3 TB/s |
| 1c nm 수율 | 50~70% | 2027년 80%+ 목표 (RS6) |
| 영업이익률 (Q1 2026) | 비공개 ⚠️ | SD-1 정보 공백 (SK 72% / Micron 41% GP) |
| Texas CHIPS 보조금 | $4.745B | 연방 + Texas $250M 추가, 3순위 (Intel $8.5B / TSMC $6.6B / Micron $6.16B) |
| DRAM 매출 1위 | 빼앗김 (2025 Q1) | 33년 만에 SK에 추월 ([dram-market-share.md](../concepts/dram-market-share.md)) |
| NAND DC 비중 | 비공개 ⚠️ | Micron 56% ✅ 대비 (SD-2 정보 공백) |
| SLC AI SSD 로드맵 | 미공개 ⚠️ | SK·Kioxia·Micron이 NVIDIA Storage-Next 전략 파트너 선점 |

## 강점 vs 약점 (Competitive Landscape)

| 강점 | 약점 |
|------|------|
| 파운드리 통합 가능 (DS 부문 내) | SD-1: HBM P&L 비공개 → 외부 가시성 부재 |
| HBM4 캐파 Sold Out | SE3 정보 공백: NAND DC 비중 비공개 |
| 5거점 글로벌 생산 (한·미·중) | SLC AI SSD 로드맵 미공개 (NVIDIA Storage-Next 추격) |
| V8/V9 NAND 양산 (V10 430L 2026 H2) | 1c nm 수율 추격 (SK 영업이익률 격차의 근본 원인) |
| Stargate Korea LOI 참여 ([SE-3](../strategies/core/current-state-se3-vertical-ascent.md)) | NVIDIA Rubin HBM4 후순위 (28%) |
| CMX PM1753 공식 공급 ✅ | SCADA 전략 파트너 미포함 (SK·Kioxia 선점) |

상세 비교는 `dashboard/src/data/strategies.js`의 COMPETITIVE_LANDSCAPE 참조.

## 전략 포지셔닝 — 본 위키의 핵심

- **Main Bet**: 시나리오 B (AI 르네상스, 30~35%) — HBM4 NVIDIA 인증 회복 + 1c nm 원가 우위 + 동서 균형 공급자
- **Side Bets**: 시나리오 A·C·D·E별 대응 ([scenario-matrix.md](../scenarios/scenario-matrix.md))
- **Robust 8개 전략 (RS1~RS8)**: 모든 시나리오에서 작동 ([wiki/strategies/invariant/](../strategies/invariant/))
- **즉시 결정 (D1~D9)**: 2026 Q4 안에 묶음 처리 ([strategy.md](../scenarios/strategy.md))

## 정보 공백 / 외부 가시성 회복 우선순위

[wiki/strategies/core/README.md](../strategies/core/README.md)에 7대 정보 공백 정리. 핵심:

1. HBM 부문 P&L 분리 공개 (SK·Micron 대비 영업이익률 가시성)
2. NAND DC 비중 공개 (Micron 56% 사례)
3. SLC AI SSD 로드맵 공개
4. 1c nm 수율 진행률
5. HBM4 캐파 확장 일정 구체화

## 위키 내 관련 페이지 (Backlinks)

### 전략
- [scenarios/strategy.md](../scenarios/strategy.md) — Main Bet/Side Bet/RS/EWI 통합, D1~D9
- [strategies/core/](../strategies/core/) — 11개 핵심전략 현황 (MB·SE·SD·SA·RS 시리즈)
- [strategies/invariant/](../strategies/invariant/) — 8개 Robust 전략

### 외부 환경 (개체)
- [sk-hynix.md](sk-hynix.md) — 최대 경쟁자 (HBM·DRAM 1위)
- [micron.md](micron.md) — 3강 중 미국 거점
- [nvidia.md](nvidia.md) — 최대 고객
- [cxmt.md](cxmt.md), [ymtc.md](ymtc.md) — 중국 위협
- [tsmc.md](tsmc.md) — 파운드리 비교 baseline + HBM 베이스다이

### 시장·정책
- [chips-act.md](../concepts/chips-act.md) — Texas 보조금
- [korea-policy.md](../concepts/korea-policy.md) — 용인 클러스터, K-반도체
- [us-export-controls.md](../concepts/us-export-controls.md) — 중국 시안 팹 영향
- [2026-q1-current-state.md](../concepts/2026-q1-current-state.md) — 현재 시점 스냅샷

### 시나리오
- [scenarios/scenario-A.md](../scenarios/scenario-A.md) — 황금 요새
- [scenarios/scenario-B.md](../scenarios/scenario-B.md) — ⭐ Main Bet
- [scenarios/scenario-C.md](../scenarios/scenario-C.md), [scenario-D.md](../scenarios/scenario-D.md), [scenario-E.md](../scenarios/scenario-E.md)

---

## [Update 2026-05-19] SemiAnalysis ISSCC 2026 — Samsung HBM4 우위

### HBM4 (ISSCC Paper 15.6)
- **36 GB, 12-high, 3.3 TB/s** — Samsung HBM4 1세대 사양
- **최고 핀 속도 13 Gb/s** (JEDEC 6.4 Gb/s의 2배 이상) — 경쟁사 대비 성능 우위
- **VDDQ 0.75 V** (HBM3E 대비 −32%) — 전력 우위
- 구성: **1c DRAM 코어 다이 + SF4 (Samsung Foundry) 로직 베이스 다이**
- 기법: ABB, TSV 4× 증가, Per-channel RDQS 자동 캘리브레이션(7.8→9.4 Gb/s), PMBIST

### 1c DRAM 수율 — SemiAnalysis 추정
- **2025년 약 50%** (점진 개선 중)
- 위키 기존 "1c nm 수율 50~70%"의 하단에 가까운 수치

### SemiAnalysis 평가
- ✅ **성능·전력**: Samsung HBM4가 경쟁사 대비 우수
- ⚠️ **안정성**: SK Hynix 여전히 우위
- ⚠️ **베이스다이 비용**: Samsung **SF4가 SK/Micron의 N12 대비 고비용 노선**

### LPDDR6 (Paper 15.8)
- **14.4 Gb/s @ 1.025V**, 12.8 Gb/s @ 0.97V — 저전압 효율 우위
- 16 Gb 다이, 44.5 mm², 0.360 Gb/mm² 밀도
- 자세히는 [dram-technology.md](../concepts/dram-technology.md) 참조

### 4F² COP DRAM (Paper 15.10) — 3D DRAM 상용화 후보
- 핵심 회로 면적 17% → 2.7%, 10 nm급 DRAM 프로세스, 하이브리드 본딩 셀+페리
- 자세히는 [dram-technology.md](../concepts/dram-technology.md) 참조

**출처**: [semianalysis-isscc-2026-2026-04-15.md](../../sources/articles/semianalysis-isscc-2026-2026-04-15.md)

---

## [Update 2026-05-19] Rubin HBM4 28% 점유 가정 — 분기 분석

UBS 28% vs SemiAnalysis "Micron out" 충돌. 세 분기:
- **(α) UBS (50%)**: Samsung 28% 갇힘
- **(β) SemiAnalysis (35%)**: Micron 자격 불가 → Samsung 28~35% 진입 여지
- **(γ) 기타 (15%)**: Samsung 40%+ 진입 또는 Micron 협상 복귀

→ Samsung 28%+ 진입 기대값 **~28.5%**, Main Bet 가정과 일치. **Main Bet 확률 30~35% 유지** + **HBM4 인증 회복 노력 conviction 강화**.

자세한 분기 분석은 [scenario-B.md](../scenarios/scenario-B.md)의 [Update 2026-05-19] 섹션 참조.

**출처**: [semianalysis-vera-rubin-2026-02-25.md](../../sources/articles/semianalysis-vera-rubin-2026-02-25.md)

---

## [Update 2026-05-19] 권석준 인터뷰 (SBS, 2026-04-11) — 로직다이 내재화 = 장기 차별점

권석준 성균관대 교수는 HBM4·HBM4E 세대 이후 **로직다이(Logic Die)** 가 메모리 3사 차별의 핵심 요인이 된다고 진단. 삼성 입장에서 결정적 구조 우위 주장.

### 핵심 주장 — Samsung 단독 수직 통합

**HBM 로직다이**는 DRAM 셀에 저장된 데이터를 GPU 코어로 정확한 타이밍에 스케줄링하는 로직 반도체 ("공항 관제탑" 비유). HBM4·HBM4E 세대부터 **10nm 이하급 EUV 공정 필수**.

10nm 이하 로직 양산 가능 회사 (전 세계 3사):
1. TSMC
2. Intel
3. **Samsung Foundry**

→ 그 중 **메모리도 하는 회사는 Samsung 단독**

결론: **로직다이 → DRAM 다이 적층 → NVIDIA GPU 코어 패키징**까지 수직 통합 가능한 유일 회사. HBM 세대 진화할수록 SK 대비 차별점.

### SemiAnalysis 평가와의 충돌 (양 관점 병기)

| 관점 | 평가 |
|---|---|
| SemiAnalysis (2026-04-15) | Samsung SF4 베이스다이는 **SK/Micron의 N12 대비 고비용 노선** ⚠️ |
| 권석준 (2026-04-11) | 메모리 + 로직 + 패키징 수직 통합 = **장기 차별점** ✅ |

→ 단기 비용 vs 장기 구조의 trade-off. 분기점: HBM4E·HBM5 세대에서 로직다이 정밀도가 성능에 미치는 영향. 모니터링 필요.

### 함의

- **MB-4 커스텀 AI 메모리**([current-state-mb4](../strategies/core/current-state-mb4-custom-ai-memory.md)): 로직다이 내재화로 NVIDIA·Tesla·하이퍼스케일러 맞춤형 HBM 설계 가능성 ↑
- **Main Bet (시나리오 B)**: HBM4 인증 회복 + HBM4E 차별화 = 시나리오 B의 expected payoff 추가 ↑
- **SD-1 HBM P&L 분리**([current-state-sd1](../strategies/core/current-state-sd1-hbm-pnl-spinoff.md)): 로직다이 내재화 가치를 외부에 공개해야 평가 가능

**출처**: [youtube-kwon-seokjun-2026-04-11.md](../../sources/articles/youtube-kwon-seokjun-2026-04-11.md)

---

## [Update 2026-05-25] Counterpoint — FY2025 메모리 OP·Q4 매출

Counterpoint Research (2026-01-29) + 현지 언론 인용:

### Q4 2025 메모리 매출

- **Samsung 메모리 매출: KRW 37.1조 = $25.9B** — SK hynix를 추월하며 **메모리 매출 1위 탈환**
- 동인: HBM·서버 DRAM·일반 DRAM 가격 동반 상승

### FY2025 전사·메모리 영업이익

| 구분 | FY2025 OP (조 원) |
|---|---|
| Samsung Electronics 전사 | **43.6** |
| - Samsung 메모리사업부만 | **24.9** |
| SK hynix (메모리 단일) | **47.2** |

→ **SK hynix > Samsung 전사 OP (사상 최초)** — 단, Samsung은 다중 사업 구조, 메모리만 비교하면 24.9 vs 47.2로 SK hynix가 약 **1.9배**

### Samsung 함의

- Q4 2025 매출 1위 회복은 **표면 회복**. 사이클 평균 수익성·HBM 마진은 SK hynix가 우위.
- 시나리오 B Main Bet의 KPI인 "HBM 28%+ 점유 회복"이 Q3 2025 22%로 미달 → 본 위키 [scenario-B.md](../scenarios/scenario-B.md) Main Bet conviction 재검증 필요.
- [hbm-market.md Update 2026-05-25](../concepts/hbm-market.md) 및 [dram-market-share.md Update 2026-05-25](../concepts/dram-market-share.md) 교차 참조.

**출처**: [counterpoint-memory-batch-2025-11-to-2026-04.md](../../sources/articles/counterpoint-memory-batch-2025-11-to-2026-04.md) §4, §5

---

## [Update 2026-06-11] 시니어 파트너 인터뷰 — 솔루션화·임베디드 SW·항공우주 확장

[senior-partner-interview-deep-research-2026-06-11.md](../../sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md)

### 1. 2026 Q1 메모리 사업 — 분기 최대 실적

- NVIDIA Vera Rubin용 **HBM4·SOCAMM2 업계 최초 양산 판매**
- **PCIe Gen6 SSD 개발** 진행
- **항공우주 산업 포트폴리오 확대** 언급 (신규 영역)
- → MB-4 커스텀 AI 메모리·SD-2 산업용 메모리·신규 [space-semiconductor.md](../concepts/space-semiconductor.md) 정합

### 2. Anthropic Strategic Infrastructure Partner

- Anthropic Series F (2026, $65B post-money)에서 **Micron·Samsung·SK hynix를 "strategic infrastructure partners"로 공식 표기**
- 개별사 직접 지분 투자액은 미공개 → "직접 투자"보다 **"전략적 인프라 파트너십"**으로 해석
- → [customer-co-design-anthropic.md](../concepts/customer-co-design-anthropic.md) · MB-4 산업 표준화 신호

### 3. 강점 자산 — 임베디드 SW 미수익화 상태

| 자산 | 공개 효과 | 수익화 |
|---|---|---|
| SmartSSD | DB 쿼리 −50% 시간, −70% 에너지, −97% CPU 활용 | ❌ 무상 번들 |
| CXL SMDK | 메모리 가상화·티어링·확장 풀 | ❌ 무상 번들 |
| PCIe Gen6 SSD 펌웨어 | (개발 중) | — |

→ 자산은 있으나 **수익화 시동 미동**. SK hynix(US AI Company $10B)·Micron이 한 발 앞서 솔루션화 진행 중.
→ [embedded-software-monetization.md](../concepts/embedded-software-monetization.md) 사업화 권고.

### 4. 시니어 파트너 인터뷰 4대 메시지의 Samsung 적용

1. **하드웨어 시간 돌아옴** → 메모리 본업의 전략적 가치 ↑
2. **요소기술·기능·운영능력으로 분해 재조합** → 5종 메모리 통합 솔루션 + BSP/SDK 분리 P&L
3. **HW를 이해하는 SW + 다사이트 운영** → Samsung IDM 차별점의 직접 수익화 경로
4. **인접시장 피벗** → 우주·국방·항공우주·중고 인증으로 RS-2 long-lifecycle 끝단 확장

**출처**: [senior-partner-interview-deep-research-2026-06-11.md](../../sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md) §1, §3.2, §3.3
