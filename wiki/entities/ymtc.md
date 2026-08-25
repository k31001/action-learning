---
type: entity
last_reviewed: 2026-08-25
sources: [sources/README.md (Digitimes, Tom's Hardware, TechInsights, Yole Group, Bloomberg, Reuters), sources/raw-notes/memory-market-strategy-update-2026-08-25.md]
---

# YMTC (양쯔메모리 / 长江存储) — NAND Flash 전문

중국 최대 NAND Flash 제조업체. 칭화유니그룹 계열, 후베이성 정부 지원. 2022년 12월 미국 수출통제 엔티티 리스트 등재 후에도 자체 Xtacking 아키텍처와 국산 장비 라인 구축으로 회복·확장 중.

**수집일**: 2026-05-05  
**위키 분류**: 중국 메모리 업체 그룹 ([china-competitors.md](china-competitors.md))

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| 설립 | 2016년 |
| 본사 | 중국 후베이성 우한(武漢) |
| 주요 제품 | 3D NAND Flash (Xtacking 구조) |
| 주주 | 칭화유니그룹 계열 |
| 제재 | 2022년 12월 미국 수출통제 엔티티 리스트 등재 |

## 생산 용량

| 연도 | 연간 웨이퍼 투입량 | 월 WSPM |
|------|-----------------|---------|
| 2024 | 약 129만 장 | ~107,500 |
| 2025 | 약 177만 장 | ~147,500 |
| 2026E | 약 200만 장 접근 | ~166,000 |

- 2024년 말 월 13만 WSPM 도달 (약 전세계 NAND 공급의 8%)
- 출처: Digitimes (2025-11-25)

## NAND Flash 시장 점유율 (출하량 기준)

| 기간 | YMTC 점유율 | 비고 |
|------|-----------|------|
| 2023 | ~5% | 제재 이후 회복 단계 |
| 2024 | ~8~10% | 연간 평균 추정 |
| Q1 2025 | 10% 초과 | Digitimes |
| Q3 2025 | 13% | 전분기 대비 상승 — 마이크론 추격 단계 |
| 2025E 연말 | 15% | YMTC 목표 |

매출 추정: 2025년 $30~40억 (제재 후 회복)

## 기술 현황

| 제품/기술 | 스펙 | 출시 |
|---------|------|------|
| X3-9070 (232L) | 232단 3D NAND | 2022년 8월 |
| 270단 NAND | 270층 | 2024년 |
| 294단 NAND | 294층 | 2025년 출시 — 글로벌 동일 세대 수준 |
| HBM 진출 계획 | AI용 HBM | 3공장 50% DRAM 전환, 현지 패키징 협력 |

- **Xtacking 아키텍처**: 주변 회로(periphery)와 어레이를 별도 제조 후 웨이퍼 본딩하는 자체 IP. 미국 특허 의존도 감축.
- **Hybrid bonding 핵심 IP 지배**: YMTC가 hybrid bonding 핵심 IP를 다수 보유 (TrendForce 2025-05, Knowmade). 한국·미국 메모리사가 V11·HBM4 세대에서 YMTC 라이선스 의존 가능 → 디커플링 시 차단 리스크. 자세히는 [nand-process-transition.md](../concepts/nand-process-transition.md) 참조.

## 팹 투자 및 DRAM 다각화

| 팹 | 위치 | 목적 | 상태 |
|----|------|------|------|
| 1공장 | 우한 동호하이테크파크 | NAND (232L, 294L) | 가동 중 |
| 2공장 | 우한 | NAND 증설 | 가동 중 |
| 3공장 | 우한 신규 | NAND 50% + DRAM 50% 전환 | 2027년 목표 |

- 누적 투자 $280억+ (2016~2024, 복수 추정)
- 3공장 신규 용량의 50%를 DRAM(HBM 포함 가능성)에 배분 — NAND 단일 사업자에서 DRAM/HBM으로 확장 시도

## 제재 대응

- 미국 장비 없이 생산 가능한 **국산 장비 라인 구축** 추진 (2025년 보고)
- 국산 장비 비율 50%+ 목표 (2025~2027 단계)
- Xtacking 아키텍처로 미국 특허 의존도 감축 지속

## 자금 구조

- **국가 빅펀드 III** (2024년, 약 $470억)의 첨단 메모리 자립 투자 대상
- 후베이성 정부 + 칭화유니그룹 지분, 우한시 국유기업 저금리 정책금융 대출

자세히는 [china-competitors.md](china-competitors.md#정부-지원-구조)와 [china-policy.md](../concepts/china-policy.md) 참조.

## 14~15차 5개년 계획 연계

| 항목 | 내용 |
|------|------|
| 기간 | 14차(~2025), 15차(2026~2030) |
| 핵심 목표 | 메모리 반도체 자급률 40% 이상 |
| 주요 과제 | 국산 EUV/DUV, 국산 화학·소재, DRAM/NAND 전 세대 자립 |
| 지원 기관 | MIIT, NDRC, 과학기술부 |

## 삼성전자 전략 시사점

1. **NAND 직접 경쟁자** — YMTC가 13% → 15%로 점유 확대 시 삼성 NAND DC 매출에 직접 타격. NAND DC 비중 공개(Micron 56% ✅) 대비 삼성은 비공개 ⚠️ → [SD1 HBM P&L 분리](../strategies/core/current-state-sd1-hbm-pnl-spinoff.md) 와 [SD2 산업용 AI 메모리](../strategies/core/current-state-sd2-industrial-ai-memory.md) 의 가시성 회복 압력
2. **Hybrid bonding IP 종속 리스크** — V11(2027) 세대에 hybrid bonding 도입 필수. YMTC IP 회피를 위한 자체 IP 확보가 RS7의 핵심 (목표: 자체 IP 비율 70%+)
3. **DRAM 진출 모니터링** — 3공장 DRAM 전환이 실제 양산으로 이어지면 CXMT와 함께 중국 DRAM 자급 가속. EWI 지표 추적 대상
4. **공급 공백 흡수** — 한국·미국이 HBM 집중하며 발생한 범용 NAND 공백을 YMTC가 흡수 ([Economy.ac 2026-02-28](https://economy.ac/news/2026/02/202602287605))

## 위키 내 관련 페이지

- [china-competitors.md](china-competitors.md) — CXMT/YMTC 그룹 인덱스
- [cxmt.md](cxmt.md) — 함께 묶이는 중국 DRAM 업체
- [nand-process-transition.md](../concepts/nand-process-transition.md) — NAND 적층·hybrid bonding (YMTC IP 지배)
- [china-policy.md](../concepts/china-policy.md) — 중국 반도체 자립 정책, 빅펀드
- [us-export-controls.md](../concepts/us-export-controls.md) — 미국 수출통제
- [wiki/strategies/invariant/rs7-ai-engineering-automation.md](../strategies/invariant/rs7-ai-engineering-automation.md) — Hybrid bonding 자체 IP 4 R&D 트랙

## 원본 링크

- [YMTC rockets to 13% shipment share in NAND Flash — Digitimes](https://www.digitimes.com/news/a20251125PD212/ymtc-cxmt-memory-nand-2025.html)
- [YMTC moves to break free of US sanctions — Tom's Hardware](https://www.tomshardware.com/pc-components/ssds/chinas-ymtc-moves-to-break-free-of-u-s-sanctions-by-building-production-line-with-homegrown-tools-aims-to-capture-15-percent-of-nand-market-by-late-2026)
- [CXMT and YMTC to massively expand memory output — KR Asia](https://kr-asia.com/chinas-cxmt-and-ymtc-to-massively-expand-memory-output-amid-global-crunch)
- [A Gap Created by Shifting Supply Priorities — Economy.ac](https://economy.ac/news/2026/02/202602287605)

---

## [Update 2026-08-25] 우한 3공장 — 절반가량 DRAM 배정, NAND 전업에서 DRAM 진출로 전략 전환

YMTC의 **우한 3공장**(2027년경 가동 목표)이 신규 캐파의 **절반가량을 DRAM에 할당**할 예정이다 ([memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)). 위 [팹 투자 및 DRAM 다각화](#팹-투자-및-dram-다각화) 표에서 "50% 전환"으로 이미 언급됐던 계획이, 이번 갱신에서 **비중 있는 전략 전환 신호로 격상**된다.

### 왜 중요한가 — "NAND 단일 사업자"에서 "DRAM 신규 진입자"로

- YMTC는 설립 이래 **NAND Flash 전업(專業)** 업체였다. 국가 빅펀드·후베이성 지원도 NAND 자립에 집중돼 왔고, CXMT(DRAM)와 YMTC(NAND)가 영역을 분담하는 구도가 [china-competitors.md](china-competitors.md)의 그룹 프레임이었다.
- 우한 3공장의 DRAM 절반 배정은 이 **영역 분담 구도 자체를 흔드는 사건**이다. YMTC가 NAND에서 축적한 자본·엔지니어링 역량·정부 지원 채널을 DRAM으로 확장한다는 뜻이며, 실현될 경우 CXMT와 함께 **중국 내 DRAM 공급자가 복수화**된다 — 단일 국가대표(CXMT) 체제에서 경쟁 구도로 전환.
- 3공장 DRAM 라인이 최종적으로 HBM까지 겨냥할지는 미확정이나, 기존 위키의 "HBM 진출 계획: 3공장 50% DRAM 전환" 메모(기술 현황 표)와 결합하면 **YMTC가 NAND뿐 아니라 DRAM·HBM 전 영역에서 중국의 두 번째 공급축이 되려는 궤적**으로 읽힌다.

### Samsung 전략 시사점 (갱신)

1. **경쟁자 지형 확대** — 범용 DRAM에서 삼성·SK·Micron이 상대해야 할 중국 업체가 CXMT 단일에서 CXMT+YMTC 복수로 늘어날 가능성. [RS2 바벨 포트폴리오](../strategies/invariant/rs2-barbell-portfolio.md)(범용 양보 전략)의 "양보 대상"이 더 커지는 동시에, 양보 이후 저가 경쟁 압력이 이중화될 리스크.
2. **NAND 쪽 여력 재배분 신호** — YMTC가 신규 캐파의 절반을 DRAM으로 돌린다는 것은 NAND 증설 속도가 상대적으로 둔화될 수 있음을 시사 — 삼성 NAND DC 사업의 경쟁 압력이 단기적으로는 완화될 여지. 단, 3공장 가동(2027년경) 이전까지는 확정적 신호로 보기 어려워 EWI 모니터링 대상.
3. **hybrid bonding IP 리스크와 결합** — DRAM·HBM 진출 시 YMTC가 보유한 hybrid bonding 핵심 IP(위 [기술 현황](#기술-현황) 참조)를 자사 DRAM/HBM 라인에도 적용할 가능성 — 한국·미국 메모리사의 V11·HBM4 세대 IP 종속 리스크와는 별개로, **YMTC 자체가 DRAM/HBM 경쟁자로 부상하는 시나리오**를 [RS7 AI 엔지니어링 자동화](../strategies/invariant/rs7-ai-engineering-automation.md)의 자체 IP 확보 트랙에서 함께 추적할 필요.

**출처**: [memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)
