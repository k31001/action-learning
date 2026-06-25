# 2026-06-25 메모리·AI 인프라 시장 통합 업데이트

**수집일**: 2026-06-25  
**유형**: 시장 데이터 업데이트 (정기 병목 모델 점검)  
**출처**: SemiAnalysis (June 2026)·Counterpoint Research·TrendForce·SK Hynix Q1 2026 IR·Micron Q3 FY26 IR·NVIDIA·기업 실적  
**관련 분석**: [wiki/concepts/bottleneck-model-2030.md](../../wiki/concepts/bottleneck-model-2030.md)  
**이전 업데이트**: [june-2026-market-update-2026-06-14.md](june-2026-market-update-2026-06-14.md)

---

## 핵심 요약 (병목 지수 결론)

| 병목 | 이전(06-14) | 신규(06-25) | Δ | 핵심 드라이버 |
|---|---:|---:|---:|---|
| **전력** | 70 | **72** | **▲ +2** | DC 전력 49→96GW(3년 2배)·미국 AI 28GW·기가와트 DC 현실화 |
| **CAPEX/ROI** | 42 | **36** | **▼ −6** | **최초 Green 진입** — SK Hynix 72%·DRAM $97B·Micron $41.46B(가이던스 +24%) |
| **파운드리** | 52 | **48** | **▼ −4** | HBM4 3사 인증 완료·Vera Rubin Q3 출하·N2 순항 |
| **첨단 패키징** | 68 | **62** | **▼ −6** | CoWoS 갭 20%→10% 축소·HBM4 12-Hi 2배 빠른 램프·HBM4E 조기 샘플 |

---

## 1. CAPEX/ROI 완화 — 극적 ROI 실현 (지수 42 → 36, 최초 Green)

### Q1 2026 DRAM 시장: 역대 최고 분기 ($97.1B, +81% QoQ)

| 업체 | Q1 2026 매출 | QoQ 성장 | 점유율 |
|---|---:|---:|---:|
| Samsung | $37.3~37.4B | +93~95% | **38.5~38.6%** |
| SK Hynix | $28.0B | +62% | 28.8% |
| Micron | $21.75B | +82% | 22.4% |
| **업계 전체** | **~$97.1B** | **+81%** | — |

- 출처: TrendForce (2026-06-01), Counterpoint Research

### SK Hynix Q1 2026 — 반도체 제조 역사상 최고 마진

- 매출: **52.58조 원** (+198% YoY, +60% QoQ), 창사 최고
- 영업이익: **37.61조 원**, 영업이익률 **72%** — 반도체 제조 역사상 최고
- SK Hynix 2025년 연간 영업이익 **47.2조 원** → 삼성(43.6조) 최초 추월
- SK Hynix 시총(206.04조) Samsung(206.67조) 추월 — **26년 만에 한국 시총 1위 역전** (2026-06-22)
- 출처: SK Hynix IR (2026-05-15), PR Newswire

### Micron Q3 FY26 — 가이던스 대비 24% 초과 (이미 sources/filings에 수록)

- 실제 매출: **$41.46B** vs. 가이던스 **$33.5B** → **+$8B(+24%) 초과**
- DRAM ASP: **+low-60s% QoQ** (이전 추정 +58~63%와 거의 일치)
- NAND 매출: **$9.9B** (QoQ ~2배)
- Q4 FY2026 가이던스: **$50.0B ± $1B** (컨센서스 $42.9B 대비 대폭 초과)
- CEO: "HBM 고객 수요의 50~67%만 충족 가능" — 40% 공급 갭 확인
- 출처: [micron-q3-fy26.md](../../sources/filings/micron-q3-fy26.md)

### NVIDIA Q1 FY2027 — 연속 신기록

| 분기 | 총 매출 | 데이터센터 | YoY |
|---|---:|---:|---:|
| Q4 FY2026 (Jan 2026) | $68.1B | $62.3B | +75% |
| **Q1 FY2027 (Apr 2026)** | **$81.6B** | **$75.2B** | **+92%** |
| Q2 FY2027 가이던스 | $45B (±2%) | — | (중국 H20 $80억 규제손실 반영) |

- Vera Rubin NVL72 랙: $880만/랙 — H2 2026 파트너 공급 시작
- 출처: NVIDIA Newsroom (2026-05-28)

### 하이퍼스케일러 CAPEX 2026 — 합계 $725B (+77% YoY)

| 회사 | 2026 가이던스 | Q1 2026 실지출 |
|---|---:|---:|
| Amazon | **$200B** | $44.2B |
| Microsoft | **$190B** | $34.9B |
| Alphabet (Google) | **$180~190B** | $35.7B |
| Meta | **$125~145B** | $19.8B |
| **합계** | **~$725B** | **~$135B** |

- 2027년 4사 합계 **$1조 초과** 전망 (Evercore, Bank of America)
- 하이퍼스케일러: "**실리콘 공급 제약(silicon-supply constrained)**" — 투자 의지보다 물리적 공급이 병목
- 출처: Tom's Hardware·CNBC·DCD·Yahoo Finance (2026-04 to 2026-06)

---

## 2. 전력 병목 악화 (지수 70 → 72)

### 글로벌 DC 전력: 3년 만에 2배

- 글로벌 DC 총 전력: **49GW (2023) → 96GW (2026)**, 3년 만에 2배
- **AI 전용**: 96GW 중 ~40GW (AI 집중형)
- **미국 AI 전력**: 3GW (2023) → **28GW (2026)**, 거의 10배
- 출처: SemiAnalysis, datacenters.com (2026-06)

### 기가와트급 데이터센터의 현실화

- **xAI Colossus 2**: 세계 최초 기가와트급 단일 시설. Memphis 240MW + 나머지 ~900MW JV (Solaris 50.1% / xAI 49.9%). **2027년 Q2까지 1.1GW 이상** 가동 목표
- **Meta Prometheus** (오하이오): 1GW 단일 슈퍼클러스터, 2026년 가동 예정
- AI 학습 워크로드 GW 규모 변동이 그리드 안정성 위협 가능성 제기 (SemiAnalysis)
- 출처: SemiAnalysis "xAI's Colossus 2" (Sept 2025)

### DC 건설 취소 주장 반박

- **SemiAnalysis (2026년 6월)**: "연말 2026 미국 하이퍼스케일러 자가 건설 예측이 6개월간 ~1%밖에 안 움직였다". NA 코로케이션도 <5% 변동
- 2대 하이퍼스케일러만 5GW 이상 자가 건설 진행 중
- 미국 대용량 전력 연계 대기 파이프라인: **1 테라와트(TW) 이상**
- 출처: SemiAnalysis "Stop Saying Half of 2026 US Datacenter Capacity Is Canceled" (2026-06)

---

## 3. 파운드리 완화 진행 (지수 52 → 48)

### HBM4 3사 인증 동시 완료

- Jensen Huang (NVIDIA CEO, 2026-06-05 확인): **Samsung·SK Hynix·Micron 3사 모두 HBM4 인증 완료·생산 중**
- Vera Rubin 본격 출하: Q3 2026 시작 (NVL72, 288GB HBM4/GPU)
- HBM4 NVIDIA 공급 배분 (2026년): SK Hynix **~70%**, Samsung **~25~30%**, Micron **나머지**

### 삼성 HBM4 양산 현황

- 2026년 2월 세계 최초 상업 출하. 속도: 11.7 Gbps → 최대 13 Gbps
- 4nm급 자사 로직 베이스 다이. 12-Hi 최대 3.3 TB/s
- HBM4 전용 1c DRAM: 2026년 말 ~250K WPM 목표 (+50% YoY)
- 삼성 HBM 시장점유율 2026 Q1: **~22%** (2025 Q3 22%에서 회복세)
- 삼성 DRAM 점유율 Q1 2026: **38.6%** (시장 1위 유지)

### TSMC N2 순항·ASIC 수요 부상

- TSMC N2 램프 계속 순항 (2026년 말 목표)
- ASIC 기반 AI 서버 출하 비중 2026년: 27.8% (2023년 이후 최고), 2028년 GPU 추월 전망
- Google TPU: Anthropic 최대 100만 TPU 계약 (Google Cloud 역대 최대). 2027년~ 5GW 차세대 TPU 용량 확보
- 출처: TrendForce, SemiAnalysis, 기업 IR

---

## 4. 패키징 갭 축소 가속 (지수 68 → 62)

### CoWoS 공급-수요 갭 20% → 10% (TrendForce 2026-06-15)

- TrendForce (2026-06-15): 연말까지 CoWoS 공급-수요 갭이 **20%→10%로 축소** 전망
- TSMC CoWoS: 2023년 ~13K WPM → 2024년 ~35K → **2026년 말 120~140K WPM** 목표
- TSMC + OSAT(Amkor 180~190K/년 + SPIL 60~80K/년) 합산: **~200K WPM** 가능
- CoWoS 연간 웨이퍼: 370K (2024) → 670K (2025) → **~1.0M (2026)** — 3년간 2.7배
- 출처: TrendForce (2026-06-15)

### Micron HBM4 12-Hi: 전세대 대비 2배 빠른 램프

- CEO Sanjay Mehrotra (2026-06-24): "HBM4 12-Hi 양산 램프가 HBM3E 12-Hi 대비 **약 2배 빠름**"
- 성숙 수율 도달 시점도 전세대보다 유의미하게 빠를 전망
- 패키징 생산성(CoWoS + TSV) 향상을 구조적으로 확인
- 출처: [micron-q3-fy26.md](../../sources/filings/micron-q3-fy26.md)

### HBM4E 샘플 조기 출하 — 양산 트랙 확인

- **Samsung** (2026-05-29): 업계 최초 HBM4E 샘플 (3.6 TB/s, 14→16 Gbps, 48GB/12-Hi)
- **SK Hynix** (2026-06-18): 12-Hi HBM4E 12층 샘플 **예정보다 조기** 출하. 16 Gbps, ~4 TB/s, 20%+ 전력 효율 향상. NVIDIA Rubin Ultra·AMD MI500 탑재 예정. 양산 2027년 목표
- 하이브리드 본딩: SK Hynix 12-Hi 검증 완료 (2026-04-29). Samsung 16-Hi 수율 ~10% (초기)
- 출처: TrendForce, Samsung/SK Hynix 뉴스룸 (2026-05~06)

---

## 5. HBM 시장 규모 및 경쟁 구도

### HBM 시장 규모

| 연도 | HBM 시장 규모 | YoY 성장 |
|---|---:|---:|
| 2025 | ~$35B | — |
| **2026** | **~$60B** (Yole/TrendForce) | +70% |
| 2027 | $43B+(Counterpoint) / 배증 가능성(TrendForce) | 추가 급등 |
| 2028 | ~$100B (Micron 이전 TAM) | — |

- 2027년 HBM 계약가 **수배 급등 가능** (TrendForce, 2026-06-02)
- HBM 수요: AI 서버 ASIC 기준 **2024~2028년 35배 성장** (Counterpoint)
- 출처: TrendForce, Yole Group, Counterpoint Research

### HBM 공급-수요 갭

- 공급 성장률: ~7.5% / 수요 충족 필요: ~12% → **연간 갭 ~40%** (CEO Mehrotra 발언)
- HBM 웨이퍼 점유: 2025년 18% → 2026년 22% → 2027년 30% (TrendForce)
- 2026년 전 3사 HBM 완판. CSP들 2027년 물량 1Q26부터 선취득 중
- 공급-수요 균형 전환: **2028~2029년** (Goldman Sachs: 2026년 HBM 공급 부족 5.1%)

### DRAM 가격 추이

| 분기 | 계약가 QoQ |
|---|---:|
| Q1 2026 (실제) | **+90~95%** (사상 최고, 이전 추정 +55~60% 대폭 초과) |
| Q2 2026 (전망) | **+58~63%** |
| 2026년 연간 | 전년 대비 **2배 이상** |

- SK Hynix DRAM ASP Q1 2026: +mid-60% QoQ (Samsung과 동일 수준)
- LPDDR5X: $77.1(2025 Q4) → $145.9(2026 Q1) — +89% 단일 분기 (SemiAnalysis)
- 출처: TrendForce, SemiAnalysis, Counterpoint

---

## 6. CXMT 위협 — 빠른 추격 (지정학·경쟁 리스크)

- **Q1 2026 매출**: **$7.3B** (+700% YoY) — 2025년 연간 매출에 근접하는 분기 매출
- 2026 연간 매출 **$50B 초과** 가능 (SemiAnalysis 추정)
- DRAM 점유율: 3%(2025) → **8%(2026 Q1)** (Counterpoint Research)
- 용량: 2026년 말 **~350K WPM** → 용량 기준 글로벌 3위 가능성
- LPDDR5 8.5GHz 수율 안정화. HP·Dell PC용 CXMT DRAM 자격 취득 검토 중
- HBM 목표: HBM3E 2026년 → 단 수출통제·장비 접근으로 2M 스택 수준(Ascend 250~300K대 분량)
- ASP 갭: 삼성/SK Hynix/Micron 대비 **5~10%** — 범용 DRAM 시장 가격 압박 시작
- 출처: SemiAnalysis "China's CXMT Is Set to Challenge DRAM Incumbents" (2026-06)

---

## 관련 링크 (주요 출처)

- SemiAnalysis "Stop Saying Half of 2026 US Datacenter Capacity Is Canceled" (2026-06)
- SemiAnalysis "China's CXMT Is Set to Challenge DRAM Incumbents" (2026-06)
- SemiAnalysis "The Great AI Silicon Shortage" (2026 Apr~May)
- TrendForce: TSMC CoWoS 공급-수요 갭 20%→10% 전망 (2026-06-15)
- TrendForce: 1Q26 업계 매출 +81% 집계 (2026-06-01)
- TrendForce: 2027년 HBM 계약가 급등 가능성 (2026-06-02)
- Counterpoint Research: Memory Prices Surge Up to 90% From Q4 2025
- Counterpoint Research: Q4 2025 Samsung Reclaims Top Memory Spot With $26Bn in Revenue
- Counterpoint Research: SK Hynix overtakes Samsung in annual profit for first time
- Counterpoint Research: HBM Demand for AI Server Compute ASICs to Grow 35x by 2028
- SK Hynix Q1 2026 IR (PR Newswire, 2026-05)
- NVIDIA Q1 FY2027 실적 (NVIDIA Newsroom, 2026-05-28)
- [micron-q3-fy26.md](../../sources/filings/micron-q3-fy26.md) — Micron Q3 FY26 $41.46B
