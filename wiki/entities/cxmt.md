---
type: entity
last_reviewed: 2026-05-18
sources: [sources/README.md (Morgan Stanley, TechInsights, Caixin Global, Tom's Hardware, Digitimes, Yole Group, Bloomberg, Reuters)]
---

# CXMT (창신메모리 / 长鑫存储) — DRAM 전문

중국 최대 DRAM 제조업체. 안후이성 정부 주도 국유기업으로, 미국 수출통제 환경에서도 빠른 캐파 확대와 기술 추격으로 글로벌 DRAM 시장 4강에 진입.

**수집일**: 2026-05-05  
**위키 분류**: 중국 메모리 업체 그룹 ([china-competitors.md](china-competitors.md))

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| 설립 | 2016년 |
| 본사 | 중국 안후이성 허페이(合肥) |
| 주요 제품 | DDR4, DDR5, LPDDR4/5 |
| 주주 | 안후이성 정부 주도 국유기업 |
| 제재 | 미국 엔티티 리스트 등재 |

## 생산 용량 (300mm WSPM)

| 연도 | 생산 용량 | 비고 |
|------|---------|------|
| 2020 | ~30,000 | 초기 양산 |
| 2023 | ~120,000 | 급격 확대 |
| 2024 | 170,000 | Morgan Stanley 추정 |
| Q1 2025 | ~200,000 | Fab 2 DDR5 가동 포함 |
| 2025E | 240,000 | Morgan Stanley 전망 |
| 2026E | 300,000 | 공격적 확장 시나리오 |

- 출처: Morgan Stanley, Tom's Hardware (2025년)
- Fab 2: DDR5 전용, 17nm 공정, 월 5만 웨이퍼

## DRAM 시장 점유율

| 기간 | CXMT 점유율 | 비고 |
|------|-----------|------|
| 2020 | ~0% | 양산 초기 |
| 2023 | ~3% | 빠른 성장 |
| 2024 | 4.9% | Morgan Stanley |
| Q3 2025 | 8% | TrendForce — DRAM 4강 진입 |
| 2027E | 13.9% | 업계 예측치 |

매출 추정: 2024년 $28~42억 (Tom's Hardware 기반)

## 기술 현황

| 제품 | 스펙 | 상태 |
|------|------|------|
| G4 DDR4 | 16nm | 양산 중 |
| G4 DDR5 | 16nm | 2024년 12월 최초 시판 (중국 국산 DDR5 최초) |
| DDR5-8000 | 8,000 MT/s | 2025년 CISCE 베이징 전시 |
| LPDDR5X-10667 | 10,667 MT/s | 2025년 전시 |
| DDR5 수율 | 80% | ExportSemi 보고 |

## 팹 투자

| 팹 | 위치 | 용량 (WSPM) | 공정 | 상태 |
|----|------|-----------|---------|------|
| Fab 1 (기존) | 허페이 | ~150,000 | DDR4 (16nm), LPDDR4/5 | 가동 중 |
| Fab 2 (신규) | 허페이 | ~50,000 추가 | DDR5 (17nm), LPDDR5X | 2025년 가동 |
| Fab 3 (계획) | 허페이 또는 신규 | ~100,000+ | 1x nm 이하 목표 | 계획 |

2026년 총 캐파 목표 300,000 WSPM은 글로벌 DRAM 캐파의 약 10~12% 수준.

## 자금 구조: 빅펀드 + 허페이 모델

- **국가 빅펀드 III** (2024년, 약 $470억 규모)의 첨단 메모리 자립 투자 대상
- **허페이 모델**: 안후이성 정부 + 허페이시 국유투자가 CXMT 지분 직접 보유, 토지·인프라 무상/할인 제공. 같은 구조를 BOE·NIO에도 적용한 "국유 VC 모델"

자세히는 [china-competitors.md](china-competitors.md#정부-지원-구조)와 [chips-act.md](../concepts/chips-act.md), [china-policy.md](../concepts/china-policy.md) 참조.

## 기술 자립 로드맵

| 단계 | 기간 | 목표 |
|------|------|---------|
| 1단계 | ~2024 | DDR4 16nm 양산, LPDDR5 개발 |
| 2단계 | 2024~2026 | DDR5 17nm 양산, LPDDR5X (국산 DUV 전환) |
| 3단계 | 2027~2030 | 1x nm 이하 DRAM, HBM 진출 시도 |

- 핵심 장벽: EUV(ASML 독점) 차단
- 대응: SMEE 국산 DUV + 다중 패터닝(SAQP)으로 1x nm 시도 — 비용·수율·속도 면에서 열위

## 삼성전자 전략 시사점

1. **"정부 자본 + 저수익 용인" 위협** — 범용 DRAM 공급 확대 시 삼성 범용 메모리 수익성 직접 타격. 포트폴리오를 HBM·고부가로 빠르게 전환 필요.
2. **세그먼트 분리 전략** — 삼성·SK·마이크론이 HBM에 집중하며 발생한 범용 DRAM 공급 공백을 CXMT가 흡수. 삼성은 이 공백을 의도적으로 CXMT에 넘기고 자신은 고마진 AI 메모리에 집중하는 분리 전략 채택 가능.
3. **기술 격차 유지** — CXMT는 2~3세대 뒤처지나 빅펀드 III로 격차 좁히는 중. HBM4/HBM5·CXL·PIM 등 5~10년 내 추격 어려운 영역에서 리더십 확고화가 방어 전략.

## 위키 내 관련 페이지

- [china-competitors.md](china-competitors.md) — CXMT/YMTC 그룹 인덱스
- [ymtc.md](ymtc.md) — 함께 묶이는 중국 NAND 업체
- [dram-market-share.md](../concepts/dram-market-share.md) — DRAM 시장 점유율 변화
- [china-policy.md](../concepts/china-policy.md) — 중국 반도체 자립 정책, 빅펀드
- [us-export-controls.md](../concepts/us-export-controls.md) — 미국 수출통제
- [wiki/scenarios/scenario-C.md](../scenarios/scenario-C.md) — 기술 냉전 시나리오 (CXMT 가속)
- [wiki/strategies/invariant/rs2-barbell-portfolio.md](../strategies/invariant/rs2-barbell-portfolio.md) — 바벨 포트폴리오 (CXMT에 범용 양보)

## 원본 링크

- [CXMT muscles into DRAM's top tier — Digitimes](https://www.digitimes.com/news/a20250421PD218/cxmt-dram-samsung-sk-hynix-2025.html)
- [CXMT takes aim at Global Leaders with High-End DDR5 — Caixin Global](https://www.caixinglobal.com/2025-11-26/chinas-cxmt-takes-aim-at-global-leaders-with-high-end-ddr5-memory-chips-102386784.html)
- [CXMT DDR5-8000 and LPDDR5X-10667 displayed — Tom's Hardware](https://www.tomshardware.com/pc-components/dram/chinas-banned-memory-maker-cxmt-unveils-surprising-new-chipmaking-capabilities-despite-crushing-us-export-restrictions-ddr5-8000-and-lpddr5x-10667-displayed)
- [CXMT Achieves 80 Percent DDR5 Yield — ExportSemi](https://www.exportsemi.com/company-post/cxmt-achieves-80-percent-ddr5-yield/)
- [China Enters 2025 with Big Memory Breakthroughs — TechInsights](https://www.techinsights.com/blog/china-enters-2025-big-memory-breakthroughs)

---

## [Update 2026-05-19] HBM ×4 + DDR 마진 회복 → CXMT 위협 가속

SemiAnalysis 2건에서 발생한 두 상충 효과:

| 효과 | CXMT에 미치는 영향 |
|---|---|
| (A) 범용 DRAM 마진이 HBM 계약 수준 근접/초과 | **단가 우위 약화** — 저가 공세 메리트 감소 |
| (B) HBM 캐파 잠식 ×3 → ×4 | **점유 확대 기회** — 한·미·일 HBM 집중으로 범용 공급 공백 흡수 |

### 결론: 위협 **가속**

(B) 물량 효과가 (A) 단가 효과보다 우세 — 메모리 시장은 일반적으로 물량 점유가 단가 우위보다 진입장벽을 더 빠르게 형성. CXMT 캐파 증설 계획(2024 170K → 2026E 300K WSPM)이 (B)와 시너지. (A)는 CXMT 수익성에 긍정적 → 자체 R&D·차세대 노드 진입 가속 가능 → 양쪽 모두 위협 강화.

### 위키 기존 가정 갱신

| 지표 | 기존 (Q3 2025) | 갱신 (2026-05-19) |
|---|---|---|
| DRAM 점유 (2027E) | 13.9% | **15~17%로 상향** |
| 캐파 (2026E) | 300,000 WSPM | 유지 |
| 단가 우위 의존도 | 핵심 | **약화** — 물량 우위 + 자국 시장 보호로 전환 |

### 신규 EWI 지표 제안

1. **CXMT 평균 ASP vs 글로벌 DRAM ASP 격차** — 좁아지면 단가 우위 약화 신호
2. **CXMT 분기 캐파 증설 속도** — 2026E 300K WSPM 도달 시점 가속/지연
3. **허페이 Fab 3 가동 시점** — 1x nm 도달 여부 (2027 이전 vs 이후)
4. **CXMT 하이퍼스케일러 인증 시도** — Alibaba·Tencent·ByteDance DRAM 입찰 진입 (보도)

### Samsung 전략 시사점
- [RS2 바벨 포트폴리오](../strategies/invariant/rs2-barbell-portfolio.md) "저원가 범용 양보 전략" **더 유효** — CXMT 점유 흡수, Samsung HBM 집중. 범용 마진 회복으로 양보 비용 ↓
- 시나리오 C·D 모두 위협 강화 ([scenario-C.md](../scenarios/scenario-C.md), [scenario-D.md](../scenarios/scenario-D.md) [Update 2026-05-19] 섹션)

**출처**: [semianalysis-ai-silicon-shortage-2026-03-12.md](../../sources/articles/semianalysis-ai-silicon-shortage-2026-03-12.md), [semianalysis-vera-rubin-2026-02-25.md](../../sources/articles/semianalysis-vera-rubin-2026-02-25.md)

---

## [Update 2026-05-19] 권석준 인터뷰 (SBS, 2026-04-11) — 한국 80년대 일본 추격 방식의 중국판

### 추격 전략 패턴

CXMT 전략은 **한국이 1980~90년대 일본 추격 시 사용한 방식의 중국판** (권석준):
- 후행 세대 메모리 양산 (DDR4/DDR5 16~17nm)
- 중국 내수 시장에서 현금 확보
- 2~3년 걸리는 기술을 **1.5년에 단축**
- 가속 + 캐파 확장 과정에서 엔지니어 숙련도·경험치 가속
- 엔지니어들이 다음 세대 개발·증설에 재투입 → **선순환 사이클**

역사적 비교: 한국이 일본의 64MB DRAM 양산기에 4MB·1MB로 시장 만들면서 인력 파이프라인 키운 패턴과 동일. 단 중국은 **훨씬 더 큰 규모·빠른 속도**.

### CXMT 점유율 시계열 — 권석준 추정 vs 위키 추정 (충돌)

| 시점 | 권석준 추정 (2026-04) | 위키 추정 (SemiAnalysis 후) |
|---|---|---|
| 2~3년 전 | < 1% | — |
| Q3 2025 | (불명시) | 8% (TrendForce) |
| 2026E | **5%** | (보간) ~10% |
| 2027E | **7~8%** | **15~17%** (SemiAnalysis ingest 후 상향) |
| 2030년대 | **마이크론 수준 (~25%)** | — |

→ **권 교수가 단기(2026~2027) 점유율을 위키보다 낮게 추정** (5% vs 10%, 7~8% vs 15~17%). 단 장기(2030년대) "마이크론 수준" 도달 시나리오는 위키와 정합 또는 더 공격적.

해석 가능성:
- 권 교수: 캐파 확장은 빠르나 점유율 전환은 느림 (수율 안정화 시간 필요)
- 위키 (SemiAnalysis 영향): HBM ×4 캐파 잠식으로 범용 공급 공백이 가속도로 흡수됨

**양 추정 병기 + 분기점 모니터링**: 2026 Q3·Q4 CXMT 분기 출하량 ([dashboard EWI `cxmt_ddr5_shipment`](../../dashboard/src/data/indicators.js))을 통해 판가름.

### 한국 세컨드 리그 부재 = CXMT 부상의 구조적 원인

권 교수의 추가 통찰:
- 삼성·SK를 받쳐줄 한국 중소 메모리 기업 부재 (자금력·인력·R&D 모두 어려움)
- TSMC의 UMC·PSMC·Vanguard 같은 layered 구조 한국에 없음
- 결과: 한국이 못 가져가는 중·후행 세대 물량을 CXMT가 흡수
- 함의: CXMT 위협은 단순 "중국 정부 자본"만의 문제가 아니라 **한국 산업 구조의 구조적 공백**도 원인

### Samsung 전략 시사점

- 위키 기존 가정의 "세그먼트 분리 전략(범용 양보 + HBM 집중)"이 더 정당화됨 — 어차피 한국엔 양보 받을 세컨드 리그 없음
- [RS2 바벨 포트폴리오](../strategies/invariant/rs2-barbell-portfolio.md): 중간 제품 축소 + HBM/커스텀 ↔ 저원가 범용 양극화 — 권 교수 분석과 정합

**출처**: [youtube-kwon-seokjun-2026-04-11.md](../../sources/articles/youtube-kwon-seokjun-2026-04-11.md)

---

## [Update 2026-06-30] 매출 폭증($50B+ 전망) + IPO 확정($27B 밸류) — 단 HBM은 여전히 미미

### 매출 — ASP 효과가 점유율 효과를 압도

| 연도 | 매출 | 비고 |
|---|---:|---|
| 2024 | $3.3B | |
| 2025 | $8.6B | |
| 2026 Q1 (단일 분기) | $7.3B | 분기 매출이 2025년 전체의 85% 수준 |
| **2026E** | **$50B+** | ASP 급등이 주 동인 — 캐파 확대보다 가격 효과 |

⚠️ 매출 $50B+는 위키 기존 매출 추정($28~42억, 2024년 기준)과 자릿수가 다름 — **2026년 메모리 슈퍼사이클의 ASP 폭등이 CXMT 매출에도 동일하게 반영**된 결과로 해석. 물량(점유율) 기준 위협도와는 별개 지표임에 유의.

### 캐파 — 2026년 말 기준 삼성·SK 대비 절반 수준

| 업체 | 2026년 말 캐파 | 2027E |
|---|---:|---:|
| 삼성전자 | ~720K WSPM | — |
| SK하이닉스 | ~595K WSPM | — |
| **CXMT** | **~350K WSPM** | **420K WSPM**(글로벌 ~17%, 2025년 ~13%에서 상향) |

비트 출하 점유율 9%→12%(2027E). 위키 기존 가정([Update 2026-05-19] DRAM 점유 2027E 15~17%)과 대체로 정합 — 캐파 기준 17% 도달 시점이 2027년으로 확인.

### IPO — $27B 밸류에이션 확정

- RMB 29.5B 조달, 밸류에이션 **~$27B**.

### HBM — 캐파 배정은 여전히 미미

- 전체 캐파 ~265K WSPM 중 HBM 배정 캐파는 **~5K WSPM(약 2%)** 불과. HBM3 8-Hi 수율·안정성 문제로 고전 지속.
- **Bottleneck Model 함의**: [bottleneck-model-2030.md](../concepts/bottleneck-model-2030.md)의 2030 HBM 공급 측 "기타·중국 0.06EB" 가정에 변경 없음 — CXMT는 여전히 **범용 DRAM 위협**이지 HBM 위협은 아님.

### Samsung 전략 시사점 (갱신)

- 매출 규모만으로 위협도를 판단하면 과대평가 — **캐파·HBM 배정 비중**이 더 정확한 위협 지표. 기존 RS2(바벨 포트폴리오) "범용 양보 + HBM 집중" 전략의 유효성 재확인.

**출처**: [june-2026-market-update-2026-06-30.md](../../sources/articles/june-2026-market-update-2026-06-30.md)
