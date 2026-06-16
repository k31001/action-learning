# June 2026 Market Update (2026-06-16)

**수집일**: 2026-06-16
**출처**: TrendForce, Data Center Knowledge, Counterpoint Research, Yahoo Finance, Tom's Hardware, DataCenterDynamics, TechTimes, TheElec, EnkiAI, Futurum, Introl Blog, Astute Group, CNBC, SEC filings

---

## 1. 전력 그리드 — PJM 용량 부족·변전소 병목 심화

### PJM 용량 경매 부족 (신규)
- **PJM 2025년 12월 용량 경매**: **6,625 MW 부족** — 공급이 수요를 채우지 못한 최초 사례 수준. 2030년까지 **최대 15 GW** 누적 부족 전망
- PJM은 2030년 현 용량 기준 부족분 보전 위해 송전 확장·신규 발전 가속 필요

### 그리드 병목 하류 이동 (신규)
- 미국 대형 DC 프로젝트의 인허가 이후 실제 가동까지 평균 **7년 이상** 소요 (2025 기준)
  - 계통 접속 서비스 협약까지: 평균 **3년 이상**
  - 협약 후 실제 가동까지: 추가 **4년**
- **병목의 실질 이동**: 과거 연계 대기열 → **현재 송전선·변전소·고압 변압기**가 핵심 병목
  - 대형 변압기·스위치기어·그리드-타이 배터리: 리드타임 **5년**
- 하이퍼스케일러 대응: 공공 전력망 우회한 **"에너지 아일랜드"** (on-site 자가 발전) 구축 가속

### ERCOT Q1 2026 대형 부하 신청 (신규)
- **Q1 2026 단 한 분기에만**: ERCOT에 대규모 부하 **198 GW 신규 신청**
- 현재 ERCOT 부하 연계 대기열: **233 GW** (데이터센터 70% 이상 차지)
  - 전년 대비 4배 급증 (1년간 ~58 GW → ~233 GW)
  - 기존 2026-06-13 업데이트의 "대기열 410 GW" 수치는 발전·저장 포함 전체 큐 기준
- **미국 연계 대기열 합계**: 2,300~2,600 GW (발전+저장+부하 포함)

### 병목 제약지수 영향: 전력 70 → **73** (▲+3)
- PJM 용량 경매 부족은 전력 신뢰도 직접 훼손 — 기존 "접속 대기"와 달리 **가동 중 전력 부족** 리스크
- 변전소·변압기 5년 리드타임이 병목의 NEXT LAYER — 계통 접속보다 더 이른 선행 병목
- ERCOT Q1 2026 198 GW 신규 신청 = 수요 가속 재확인

---

## 2. CAPEX/ROI — Big5 수렴·Q2 가격 상승률 둔화

### Big4/Big5 CapEx 수렴 (업데이트)
- 2026년 Big4 합산: **Amazon $200B·Google $175~185B·Meta $115~135B·Microsoft $110~120B** → 합산 **$600~640B**
- Big5(Big4 + 기타) 총합: **$660~690B** (컨센서스)
  - 이전 추정 상단 $700~725B에서 약 3~7% 하향 수렴
  - Amazon $200B: 연간 사상 최고치, AWS 데이터센터 투자 지속

### Micron FY2026 CapEx (업데이트)
- Micron FY2026 전체 CapEx 가이던스: **$25B 이상** (FY2025 대비 증가)
- FY2027 CapEx: HBM·DRAM 관련 건설 지출 **$10B 이상 추가 증가** 예상

### DRAM 가격 상승률 둔화 (신호)
- Q1 2026 DRAM 계약가: **+90~95% QoQ** (역대 최대)
- Q2 2026 DRAM 계약가 예상: **+58~63% QoQ** — 상승 지속하나 상승률 **둔화**
- Q2 2026 NAND 계약가 예상: **+70~75% QoQ**
- 함의: HBM 가격·DRAM 가격 상승률 정점 통과 가능성 — ROI 검증이 계속되나 가격 모멘텀 소화 단계

### 병목 제약지수 영향: CAPEX/ROI 42 → **43** (▲+1)
- Big5 $660-690B 수렴: 절대 지출은 사상 최대지만 상단 추정치 대비 소폭 하향
- Q2 DRAM 가격 상승률 둔화: 여전히 강한 ROI이나 모멘텀 감소 신호
- 자금조달 긴장(ABS·SPV) 잔존. CAPEX 감소 트리거(-15% 가이던스 하향)는 아직 없음

---

## 3. 파운드리 — HBM4 3사 양산 확정·SK hynix M15X 조기 가동

### NVIDIA Vera Rubin HBM4 3사 양산 확정 (핵심 신호)
- **2026-06-05 Jensen Huang 공식 확인**: Samsung·SK hynix·Micron **3사 모두 Vera Rubin HBM4 공급 인증 완료**, Q3 2026 출하 확인
  - Samsung: 4nm 로직 기반다이 사용, 12-Hi 스택, **3.3 TB/s** — NVIDIA 사양 충족
  - SK hynix: Vera Rubin 물량 약 **60~70%** 점유, 공급 주도
  - Micron: 나머지 할당, 이전 "자격 취득 불가" 우려 해소
- 함의: 기존 "HBM4 수율 미성숙→Rubin 생산 축소→N3 일부 여유" 리스크 해소
  - Rubin 생산 목표는 여전히 200→150만 대로 조정된 수준이나, 해당 목표를 향한 생산은 정상 궤도

### SK hynix M15X — 계획 대비 4개월 조기 가동 (신규)
- SK hynix M15X(청주) 팹: **HBM4용 1b DRAM 생산을 2026년 2월 개시** — 당초 6월 계획 대비 **4개월 조기**
  - 초기 캐파: ~10,000 WPM, 2027년 중반 60,000 WPM까지 확대 로드맵
- 함의: 파운드리·패키징 양쪽에서 HBM4 공급 능력 조기 개선

### 병목 제약지수 영향: 파운드리 52 → **49** (▼-3)
- HBM4 3사 NVIDIA 인증: 기존 "HBM4 지연" 프레임 해소 → "3사 양산 확정"으로 전환
- Samsung 4nm 기반다이 NVIDIA 요구사항 충족 확인
- SK hynix M15X 조기 가동: 선단 메모리 공급 당김 → 파운드리 캐파 압박 다소 완화
- 대만 집중·지정학 리스크는 잔존 (변동 없음)

---

## 4. 첨단 패키징 — 수급 격차 축소·신규 사이트 확대

### TrendForce — CoWoS 수급 격차 20%→10% 목표 (신규)
- TrendForce: 2026년 말 CoWoS 수급 격차가 **~20%에서 ~10%로 축소** 목표
- TSMC + OSAT(Amkor 등) 합산 월 캐파: **190~200K WPM** (TSMC 130K + OSAT 60~70K)
- 연간 수요 규모: ~700K WPM 내외 (분기별 변동), 여전히 공급 부족이나 격차 축소 추세

### SK hynix 청주 첨단 패키징팹 신설 (신규)
- SK hynix, 청주에 **HBM 출력 확대 목적 첨단 패키징팹 신설** 발표 (2026-01-13)
  - 목표: **2027년까지 HBM 생산 기여** 시작
  - 투자 규모: $13B+
- **인디애나 패키징팹**: 2026-02-23 착공 착수, **2028 하반기** 양산 목표 ($3.87B)

### HBM 적층 수율 불확실성 완화 (신규)
- **3사 모두 NVIDIA HBM4 16-Hi 인증** (2026-06-05) → Micron의 기존 "자격 이슈" 해소
- SK hynix M15X 조기 가동으로 HBM4 16-Hi 적층 공급 능력 조기 확보
- 수율 수치 자체는 비공개이나 인증 완료는 수율 목표 달성을 시사

### 병목 제약지수 영향: 패키징 68 → **65** (▼-3)
- TrendForce 공식 확인: 격차 20%→10% 축소 목표 → 실질 완화 방향 재확인
- OSAT 참여로 총 캐파 190-200K WPM 확대
- SK hynix 청주팹(2027) + 인디애나(2028) 중기 공급 파이프라인 강화
- 3사 HBM4 수율 인증 → 패키징 적층 불확실성 완화

---

## 5. HBM 시장 최신 현황

### Vera Rubin HBM4 공급 배분 (업데이트)
| 공급사 | Vera Rubin HBM4 배분 비중 | 비고 |
|---|---|---|
| SK hynix | **60~70%** | 주력 공급, M15X 조기 가동 |
| Samsung | **25~30%** | 4nm base-die 양산 확정 |
| Micron | 나머지(~5~10%) | 이전 "자격 불가" 우려 해소 |

### 전체 HBM 시장점유율 (2026 최신 추정)
- SK hynix: **50~55%** (전체 기준)
- Samsung: **35~40%** (4월 기준, 급회복 유지)
- Micron: **5~10%**
- HBM 공급 부족 **2026~2027년 지속** 전망 (TrendForce)

### HBM 가격 전망 (업데이트)
- HBM3E 가격: 2026년 이후 연간 **-30% YoY** 가능성 (TrendForce, 3사 경쟁 심화)
- HBM4 가격 프리미엄: HBM3E 대비 **+67%** 추정
- 2026년은 가격 상승 정점, 이후 경쟁 심화로 완화 예상

---

## 출처

- [NVIDIA Vera Rubin HBM4: Jensen Huang Confirms All Three Suppliers in Production for Q3 Ship](https://www.techtimes.com/articles/317855/20260605/nvidia-vera-rubin-hbm4-jensen-huang-confirms-all-three-suppliers-production-q3-ship.htm)
- [SK Hynix to start M15X fab production 4 month earlier than planned (TheElec)](https://www.thelec.net/news/articleView.html?idxno=5533)
- [SK hynix to Build Cheongju Advanced Packaging Fab (TrendForce)](https://www.trendforce.com/news/2026/01/13/news-sk-hynix-to-build-cheongju-advanced-packaging-fab-boosting-hbm-output-by-2027/)
- [Hyperscalers Hit $700 Billion in 2026 AI Spending Plans (Yahoo Finance)](https://finance.yahoo.com/sectors/technology/articles/hyperscalers-hit-700-billion-2026-111243744.html)
- [AI Capex 2026: The $690B Infrastructure Sprint (Futurum)](https://futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/)
- [PJM Grid 6GW Shortfall: 2027 Data Center Power Crisis (Introl Blog)](https://introl.com/blog/pjm-grid-crisis-6gw-shortfall-data-center-power-2027)
- [Amazon Private Power Grids 2026, 233 GW ERCOT Queue (EnkiAI)](https://enkiai.com/data-center/amazon-private-power-interconnection/)
- [Why AI Data Center Projects Face Years of Delays After Approval (DCK)](https://www.datacenterknowledge.com/energy-power-supply/why-ai-data-center-projects-face-years-of-delays-after-approval)
- [TSMC's CoWoS Capacity: Scaling Up, Outsourcing (Global Semi Research)](https://globalsemiresearch.substack.com/p/tsmcs-cowos-capacity-scaling-up-outsourcing)
- [DRAM prices predicted to jump 63% in Q2 (Tom's Hardware)](https://www.tomshardware.com/pc-components/dram/dram-and-nand-contract-prices-to-climb-again-in-q2)
- [Global DRAM and HBM Market Share: Quarterly (Counterpoint Research)](https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share)
