---
type: article
date: 2026-06-27
domain: bottleneck-monitoring
tags: [HBM, AI-capex, power, CoWoS, DRAM, CXMT, Goldman-Sachs, SK-Hynix]
---

# 2026-06-27 병목 모델 시장 업데이트

수집 기준일: 2026-06-27. 이전 점검(2026-06-14) 이후 신규 신호를 병목별로 정리.

---

## 전력 (Power)

**Goldman Sachs 전력 수요 전망 업데이트 (2026년 5~6월)**
- 미국 DC 전력 수요: 2025년 31 GW → 2027년 **66 GW** (2년 내 2배+)
- 2030년까지 전 세계 DC 전력 수요 **175% 증가** (2023 기준, Goldman Sachs GS SUSTAIN)
- 미국 데이터센터 **전력 부족분**: 현재 11 GW, **2028년까지 45 GW**로 확대
- 2030년까지 **72 GW 신규 용량** 필요 — 대형 원전 72기 상당
- 글로벌 DC 전력 소비: 2022년 460 TWh → **2026년 650~1,050 TWh** (불확실 범위 크게 확대)
- 미국 IT 부하 용량: ~80 GW(2025) → **~150 GW(2028)** (3년 내 약 2배)
- 계통 접속 지연: 4~5년 이상, 대형 인프라 보강 필요 시 더 길어짐
- 그리드 지출: 2030년까지 **~$7,200억** 필요 (Goldman Sachs)
- **인력 병목**: 2030년까지 76만 명 추가 전력·그리드 인력 필요 (전문 T&D 역할 20.7만 명, 양성 3~4년 소요)
- DC 건설 인력 부족: 2026년 말까지 **34만 명** 미충원 (DataCenter 전공 조사)
- Fortune (2026-03): "DC 개발 궤적의 굴절 — 전력망이 성장의 실질적 제약"

---

## CAPEX/ROI

**빅4 하이퍼스케일러 2026년 CAPEX 확정 (~$725B, +77% YoY)**
- Amazon: **$200B**
- Alphabet: **$175~185B**
- Meta: **$115~145B** (5월 추가 상향)
- Microsoft: **~$190B** (Q2 2026 실적 반영 추정)
- 합산: ~$725B (2025년 ~$410B 대비 +77%)
- **모든 하이퍼스케일러: 수요 제약 아닌 공급 제약 상태** (Sundar Pichai: "compute-constrained")

**SK Hynix Q1 2026 실적 — 역대 최고 (2026-04-23)**
- 매출: **₩52.5763조** (전분기대비 +60%, 전년대비 +198%, 사상 첫 50조 돌파)
- 영업이익: **₩37.6103조**, 영업이익률 **72%** (NVIDIA·TSMC 동기 마진 초과)
- HBM 고객 주문이 **향후 3년치 생산계획을 초과** (극단적 수요 강세)

**글로벌 DRAM 시장 (Counterpoint Research)**
- Q1 2026 DRAM 매출: 전분기대비 **+80%** (사상 최고)
- DRAM 계약가 Q1 2026: 전분기대비 **+90~95%**
- Q2 2026 전망: DRAM **+58~63%** QoQ, NAND **+70~75%** QoQ

---

## 파운드리

**NVIDIA Rubin 2026 출하 비중 하향 (TrendForce, 2026-04-08)**
- Rubin의 2026년 고급 GPU 출하 비중: 29% → **22%** 하향
- Blackwell Ultra(B300) 비중: **70%+** (N3 캐파 일부 완화 의미)
- 지연 원인: HBM4 인증 지연·CX8→CX9 네트워크 전환·고전력 냉각 과제
- Rubin Ultra: 1TB HBM4e 탑재 Kyber 랙 시스템 GTC 2026 공개

**N2/A16 램프 계속 순항**
- TSMC N2 계획 진행 중, AI 가속기 배정 캐파 확보 지속

**CXMT (중국) HBM 동향**
- HBM3 양산 2026년 말 목표; 월 캐파 30만 장 중 약 20%(6만 장)를 HBM 배정
- 2026년 HBM 다이 생산 추정: ~700만 개 (H100급 AI칩 60만 개 상당)
- 미국 수출 통제(TSV·식각·유지보수 인원 철수)로 2027+ 이후 병목 심화 예상
- SemiAnalysis: CXMT HBM 웨이퍼 배정 2026년 말 ~30 kwspm, 2027년 말 ~55 kwspm

---

## 패키징

**TrendForce (2026-06-15): CoWoS 수급 갭 추가 축소**
- CoWoS 공급-수요 갭: 현재 ~20% → **2026년 말 ~10%**로 축소 예상
- 2027년 이후 추가 완화 전망

**TSMC CoWoS 캐파 확대**
- 2026년 말 목표: **120,000~140,000 WPM** (2023년 말 13,000 대비 10배+)
- 업계 파트너 포함 총 캐파: **~200,000 WPM** 수준
- TSMC 첨단 패키징 매출 비중: 2025년 8% → **2026년 >10%** 돌파 예상
- CAGR: 2022~2027년 **80%+** (TSMC Taiwan Technology Symposium 발표)

**CoPoS (패널 수준 패키징) 진척**
- 파일럿 라인 자격 인증: **2026년 6월 완공** (이전 예상 일정 달성)
- 양산 목표: 2028~29년

**Rubin 수요 하향으로 2026년 CoWoS 압력 소폭 완화**

---

## HBM/DRAM 시장 점유율

**HBM 시장 점유율 (복수 출처)**
- SK Hynix: ~50~55% (일부 데이터: 62%, 2026년 최고치)
- 삼성전자: ~35~40% (HBM 특화 데이터 17%로 약세 지속)
- Micron: ~5~10% (일부 데이터: 21%, 삼성 추월 시사)
- NVIDIA HBM4 공급: SK Hynix 약 2/3·Samsung 나머지 (TrendForce)

**DRAM 시장 점유율 Q1 2026 (Counterpoint Research)**
- 삼성: 38%, SK Hynix: 29%, Micron: ~33%

**HBM 가격 (2026년 기준)**
- HBM3: ~$200/스택 ($8~10/GB), HBM3E: ~$300/스택, HBM4: ~$500/스택(추정)
- HBM3E 2026년 가격 인상: ~+20% YoY (삼성·SK Hynix 합의 인상)

**HBM 시장 규모 전망**
- 2027년 $43B 전망 (Counterpoint Research)
- Micron TAM: 2025 ~$350억 → 2028 ~$1,000억

---

## 출처 링크 (검색 기반, URL 접근 가능)

- [Goldman Sachs: US DC Power Demand to Double by 2027](https://www.goldmansachs.com/insights/articles/us-data-center-power-demand-projected-to-double-by-2027)
- [Goldman Sachs: AI to Drive 165~175% DC Power Demand by 2030](https://www.goldmansachs.com/insights/articles/ai-to-drive-165-increase-in-data-center-power-demand-by-2030)
- [TrendForce: CoWoS 수급 갭 2026년 말 10%로 축소 (2026-06-15)](https://www.trendforce.com/news/2026/06/15/news-tsmc-cowos-supply-demand-gap-reportedly-seen-narrowing-from-20-to-10-by-end-2026-as-capacity-expands/)
- [TrendForce: Rubin 비중 29%→22% (2026-04-08)](https://www.trendforce.com/presscenter/news/20260408-13003.html)
- [Counterpoint: Global DRAM and HBM Market Share](https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share)
- [Counterpoint: DRAM 매출 Q1 2026 +80%](https://germany.counterpointresearch.com/insights/pr/weltweiter-dram-umsatz-steigt-im-q1-2026-um-80-auf-rekordhoch/)
- [SK Hynix Q1 2026 실적 발표](https://news.skhynix.com/q1-2026-business-results/)
- [Tom's Hardware: 빅4 CAPEX $725B (2026)](https://www.tomshardware.com/tech-industry/big-tech/big-techs-ai-spending-plans-reach-725-billion)
- [Fortune: "Bend in trajectory" — DC 개발이 전력망 한계 직면 (2026-03)](https://fortune.com/2026/03/18/power-grids-snags-electricity-limits-data-centers/)
- [SemiAnalysis: CXMT DRAM HBM 동향](https://newsletter.semianalysis.com/p/chinas-cxmt-is-set-to-challenge-dram)
