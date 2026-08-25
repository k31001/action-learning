---
type: entity
last_reviewed: 2026-08-25
sources: [sources/README.md (Morgan Stanley, TechInsights, Caixin Global, Tom's Hardware, Digitimes, Yole Group, Bloomberg, Reuters), sources/articles/july-2026-market-update-2026-07-04.md, sources/raw-notes/memory-market-strategy-update-2026-08-25.md]
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
| 상하이 신공장 | 상하이 | 허페이 대비 2~3배 규모 | DRAM (HBM 포함 목표) | 2026년 하반기 장비반입 시작, 2027년 양산 목표 ([memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)) |

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

## 업데이트 (2026-07-04)

CXMT의 HBM 진출 관련 신규 데이터(SemiAnalysis): HBM 웨이퍼 배정 규모가 2026년 말까지 **월 3만 장(30k wspm)** 수준으로 확대될 전망 — 기존 위키의 "3단계(2027~2030) HBM 진출 시도" 로드맵보다 이른 시점에 HBM향 웨이퍼 배정이 가시화되는 신호 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).

---

## [Update 2026-07-11] 애플, 중국 내수용 기기에 CXMT DRAM 테스트 착수 — CXMT 고객 인증 이정표

**애플이 CXMT DRAM 칩을 "중국 내수용 기기" 대상으로 기술 검증(qualification test)에 착수**했다 (FT 2026-07-08 단독). 애플은 동시에 미국 정부에 CXMT 제품의 광범위한 사용 허용을 로비 중 ([apple-cxmt-china-dram-2026-07-08.md](../../sources/articles/apple-cxmt-china-dram-2026-07-08.md)).

이는 위키가 2026-05-19에 신규 EWI로 제안한 **"CXMT 하이퍼스케일러 인증 시도"** 신호의 한 단계 격상판이다 — 하이퍼스케일러(알리바바·텐센트)를 넘어 **글로벌 최대 프리미엄 완제품 고객(애플)의 인증 파이프라인 진입**이라는, CXMT 위상 변화의 결정적 이정표.

### 사실 요약

| 항목 | 내용 | 비고 |
|---|---|---|
| 대상 | 중국 내수용(China-market) 기기의 DRAM | 글로벌 채택 아님, 중국 판매분 한정 |
| 단계 | 기술 검증(qualification), 양산 채택 확정 아님 | 정식 공급사 승인 선행 단계 |
| 동기 | 2026년 초 범용 DRAM 계약가 +55~60% 급등, 조달 다변화·원가 압박 완화 | 애플 맥북·아이패드 가격 인상 배경 |
| 규제 리스크 | CXMT는 미 국방부 **1260H 리스트**(PLA 연계 의심) 등재 | 1260H 자체는 거래 법적 금지 아님, 정치적 후폭풍 리스크 |
| 전례 | 2022년 애플 YMTC NAND 검토 → 미 의회 반대 + Entity List 등재로 무산 | 재현 리스크 |

### 위키 수치 정합성 — 점유율 전망 교차 검증

FT 보도의 CXMT 점유율 수치("2025년 ~11% → 2028년 15%")는 **웨이퍼 캐파 점유율** 기준으로, 위키 기존의 **매출·출하 점유율**(Q3 2025 8%, 2027E 15~17% 상향)과 기준이 다르다. 두 계열 병기:

| 기준 | 2025 | 2027~2028E | 출처 |
|---|---|---|---|
| 웨이퍼 캐파 점유율 | ~11% | 15% (2028) | FT (apple-cxmt) |
| 매출·출하 점유율 | 8% (Q3, TrendForce) | 15~17% (2027E) | 위키 [Update 2026-05-19] SemiAnalysis |

→ 캐파 점유(11%)가 매출 점유(8%)보다 높은 것은 CXMT가 저가 범용 위주로 ASP가 낮기 때문 — [cxmt_asp_gap EWI](../../dashboard/src/data/indicators.js)의 근거와 정합. 애플 인증은 이 ASP 격차를 좁히는(프리미엄 고객 확보) 방향의 신호.

### DF2(미중 지정학)에 대한 함의 — "관리된 공존" 신호

- 로이터(2026-06 중순): 트럼프 행정부가 대베이징 긴장 격화를 피하려 CXMT 추가 블랙리스트 등재를 *보류*. 애플의 로비가 성공(승인)한다면 이는 DF2의 **Pole B(관리된 공존)** 쪽 신호 — 미국이 "중국 내수용 한정"이라는 예외를 용인하는 선택적 제재 패턴.
- 반대로 의회·행정부가 제동을 걸어 YMTC 전철을 밟으면 DF2의 **Pole A(디커플링)** 재확인 신호.
- → 이 건의 결말(승인 vs 차단)이 DF2 방향의 실시간 리트머스. 신규 EWI [`cxmt_apple_qualification`](../../dashboard/src/data/indicators.js)로 추적.
- 상세: [us-export-controls.md](../concepts/us-export-controls.md#1260h-리스트--애플-cxmt-로비-2026-07), [key-drivers.md DF2](../driving-forces/key-drivers.md), [scenario-D.md](../scenarios/scenario-D.md)

### Samsung 전략 시사점

1. **협상력 리스크 (신규)** — 애플이 CXMT를 "제4의 공급처 후보"로 세워둠으로써, 삼성·SK·마이크론을 상대로 한 장기계약 단가 협상에서 **심리적 price leverage**를 얻는다. 삼성·SK 과점 체제에 대한 "균열 신호". → [RS-4 고객 포트폴리오 분산](../strategies/invariant/rs4-customer-portfolio-diversification.md), [RS-3 고객 전환비용](rs3 참조)에서 **공급사도 고객 집중 리스크를 진다**는 대칭 논리로 반영.
2. **세그먼트 분리 전략 재확인** — 실제 채택은 중국 내수 보급형 소량에 그칠 공산이 크므로(기술 격차+미 제동), 삼성이 범용 저가 세그먼트를 CXMT에 양보하고 HBM·고부가에 집중하는 [RS-2 바벨 포트폴리오](../strategies/invariant/rs2-barbell-portfolio.md)의 전제와 정합 — 단, 양보 대상이 "무명 중국 물량"이 아니라 "애플 중국 내수 물량"으로 구체화된 점이 새롭다.
3. **모니터링 격상** — CXMT의 프리미엄 고객 인증 성공은 "저가 범용" 프레임을 넘어서는 위상 변화. HBM4/HBM5·CXL·PIM 등 추격 난이도 높은 영역의 리더십 방어가 더 중요해짐.

**출처**: [apple-cxmt-china-dram-2026-07-08.md](../../sources/articles/apple-cxmt-china-dram-2026-07-08.md)

---

## [Update 2026-08-03] 크리스 밀러 — 애플–CXMT 건에 공개 경계 표명

- 크리스 밀러(Chip War 저자)는 경향신문 인터뷰(2026-07-09)에서 **애플의 중국 메모리(CXMT) 구매 시도에 경계**를 표명 — 성사 시 **중국 메모리 업체의 글로벌 점유율 확대**로 이어질 수 있다고 평가 ([chris-miller-interviews-2025-12-to-2026-07.md](../../sources/articles/chris-miller-interviews-2025-12-to-2026-07.md) §9).
- 위 [Update 2026-07-11] 애플–CXMT 테스트 건에 대한 **외부 전문가의 위협 인식 확인** — "중국 내수 한정 소량"이라는 최소화 해석보다 "글로벌 점유율 확대의 교두보"라는 위협 해석에 무게를 싣는 방향. DF2 리트머스([`cxmt_apple_qualification`](../../dashboard/src/data/indicators.js)) 모니터링의 우선순위를 재확인.
- 다만 밀러는 같은 시기 중국의 구조적 제약도 병행 지적("중국은 4년째 AI 과소투자", Huawei/SMIC 규모 한계 — [china-competitors.md [Update 2026-08-03]](china-competitors.md#update-2026-08-03-크리스-밀러의-중국-이중-평가) 참조) — CXMT 위협은 첨단(HBM)이 아닌 **범용·완제품 채택 경로**로 실현된다는 위키 기존 프레임과 정합.

**출처**: [chris-miller-interviews-2025-12-to-2026-07.md](../../sources/articles/chris-miller-interviews-2025-12-to-2026-07.md)

---

## [Update 2026-08-25] 상하이 신공장 착공 + HBM3 양산 시점 재확인 + 미 국방부 1260H 등재

### 상하이 신공장 — 허페이 대비 2~3배 규모

CXMT가 **상하이에 신공장**을 건설 중이며, 기존 허페이 캐파 대비 **2~3배 규모**로 계획돼 있다. **2026년 하반기 장비반입** 개시, **2027년 양산** 목표다 — 위 [팹 투자](#팹-투자) 표에 반영. 허페이 단일 거점 구조에서 상하이로 지리적·자본적 확장이 이뤄지는 시점으로, 앞서 언급된 2026E 300,000 WSPM 캐파 목표 이후의 **다음 증설 사이클**로 해석된다.

### HBM3 로드맵 — 목표(2026년말)와 경쟁력 있는 양산(2028년 이후) 분리

- CXMT는 **HBM3를 2026년말 양산 목표**로 제시하고 있으나, **경쟁력 있는 수율의 실제 양산은 2028년 이후**로 전망된다.
- 이는 위 [Update 2026-07-04] "HBM 웨이퍼 배정 2026년말 3만 WSPM"과 결이 다르다: 웨이퍼 배정(캐파 확보)과 **양산 가능 수율 도달**은 별개 지표다. "목표 발표 시점"과 "경쟁력 있는 양산 시점" 사이 약 2년의 간극이 존재 — 삼성·SK하이닉스·Micron이 HBM4/HBM4E로 세대 전환하는 동안 CXMT는 여전히 HBM3 수율 확보 단계에 머문다는 뜻으로, [기술 자립 로드맵](#기술-자립-로드맵)의 "3단계(2027~2030) HBM 진출 시도"와 정합적이나 하한선(2028년 이후)이 이번에 구체화됐다.

### 미 국방부 1260H 리스트 등재 재확인

- 미 국방부가 CXMT를 **중국군 관련 기업(1260H) 리스트에 추가**했다(2026년). [us-export-controls.md](../concepts/us-export-controls.md#1260h-리스트--애플-cxmt-로비-2026-07)에서 이미 다룬 1260H 체계상의 등재이며, **자동 거래금지는 아니다**라는 점이 이번 소스에서도 재확인됐다 — 국방부 조달 금지·평판 리스크·향후 제재 확대의 예비 신호라는 기존 해석을 유지.

### Samsung 전략 시사점

- 상하이 신공장의 "2~3배 규모"는 CXMT가 범용 DRAM 캐파 경쟁에서 장기전을 준비하고 있다는 신호 — [RS2 바벨 포트폴리오](../strategies/invariant/rs2-barbell-portfolio.md)(범용 양보 + HBM 집중)의 전제를 강화.
- HBM3 "목표 vs 경쟁력 있는 양산" 간극(2026말 vs 2028+)은 삼성·SK·Micron에게 **HBM4/HBM4E/HBM5로 최소 2세대 앞서 나갈 시간적 여유**가 아직 있음을 시사 — 단, 상하이 신공장이 HBM향으로도 배정될 경우 이 여유는 축소될 수 있어 EWI 모니터링 대상 유지.

**출처**: [memory-market-strategy-update-2026-08-25.md](../../sources/raw-notes/memory-market-strategy-update-2026-08-25.md)
