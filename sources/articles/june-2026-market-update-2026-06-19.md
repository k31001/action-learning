# 6월 2026 시장 업데이트 — 병목 모델 정기 점검 (2026-06-19)

**수집일**: 2026-06-19  
**작업**: Bottleneck Model 정기 점검 — 이전 점검(2026-06-14) 대비 신규 신호

---

## 1. 전력 병목 — 지수 70 → 72 (▲+2)

### 데이터센터 전력 수요 가속: 2026년 1,050 TWh 수준
- IEA 2026 글로벌 데이터센터 전력 수요 추정치: **1,050 TWh** — IEA 2030 Base Case(945 TWh)를 이미 4년 앞서 초과하는 속도
- Goldman Sachs: 데이터센터 전력 수요 2030년까지 **165% 증가** (2023 기준), 2030년 약 **122 GW** 온라인 예상
- 미국 데이터센터 전력 수요 전망:
  - 2026 IT 장비·냉각·기타 합산: **75.8 GW** (S&P Global)
  - 2030 전망: **134.4 GW** — 2023년 대비 약 8배 수준
- IEA Base Case: 2030년 전 세계 데이터센터 전력 소비 **945 TWh** (현재 대비 2배), 총 전력 소비의 약 3%
- AI 데이터센터 전력 소비 연 **15% 성장** — 전체 전력 소비 성장의 4배

**신호 해석**: 2030 Base Case를 4년 앞당겨 추적 중인 전력 수요는 계통 접속 리드타임(7~13년)과의 괴리를 더 심화. 이전 점검 대비 구조 악화 신호 추가. 지수 **72** (▲+2 from 70).

---

## 2. CAPEX/ROI 병목 — 지수 42 → 40 (▼-2)

### Microsoft FY2026 CapEx $190B 확정 — 예상 대비 대폭 상향
- Microsoft FY2026 전체 CapEx 가이던스: **$190B** (역대 최고, 2025 $118B 대비 +61%)
  - 분석가 컨센서스 $154.6B 대비 **$35B 초과**
  - 상향 이유: 메모리 가격 급등으로 인한 구성 요소 비용 증가 ($25B 추가)
  - 발표 시점: 2026-04-29 Microsoft FY2026 Q3 실적 발표 (The Register, CNBC 보도)
- **빅4 합산 재추정**: Amazon $200B + Google $175~185B + Microsoft $190B + Meta $125~145B = **$690~720B** (기존 $700~725B과 근사)
- **전체 하이퍼스케일러** 합산: $725~800B+ 수준으로 상향
- **빅4 AI CapEx 누계 YoY**: +77% (Tom's Hardware·Goldman 분석)

### AI ROI 실현 신호 지속 강화
- Samsung Q1 2026 메모리 매출: **133.9조 원($100B)**, 영업이익 +756% YoY — HBM 마진 >80%
- HBM4 단가: **$500~560/unit**, 총이익률 **>80%** (Samsung IR 확인)
- Google Cloud +110%, Azure +84%, AWS +28%, Meta +54% — AI 클라우드 매출 가속
- Micron Q3 FY2026 가이던스 역대 최고 $33.5B 유지

**신호 해석**: Microsoft $190B 확정으로 상방 수요는 더 강력히 뒷받침됨. CAPEX 경색 하방 리스크가 추가 완화(수요가 견조·ROI 실현 강화). ABS·SPV 의존 잔존하나 규모상 문제 전이 여지 축소. 지수 **40** (▼-2 from 42).

---

## 3. 선단 파운드리 병목 — 지수 52 → 50 (▼-2)

### NVIDIA Vera Rubin 풀 프로덕션 — 3사 HBM4 모두 공급 확정
- **2026-06-01** GTC 타이페이: NVIDIA Vera Rubin 풀 프로덕션 공식 발표
- **2026-06-05**: 젠슨 황이 삼성·SK하이닉스·마이크론 **3사 모두** HBM4 공식 공급사 확인
- Vera Rubin 생산은 N3 로직(TSMC) + HBM4 패키징(CoWoS)으로 N3 공정이 순조롭게 운영 중임을 시사
- N2 램프 지속: TSMC N2 2026 말 10만 장/월 확대 경로 순항 (이전 점검에서 확인, 변동 없음)

### HBM4 공급 점유 — Counterpoint HBM4 전용 데이터
- Counterpoint Research (HBM4 2026 추정):
  - SK Hynix: **54%**
  - Samsung: **28%**
  - Micron: **18%**
- 전체 HBM 시장: SK Hynix ~62%, Micron이 Samsung 추월 시기 있었으나 April 2026 기준 Samsung 35~40% 회복

**신호 해석**: Rubin 풀 프로덕션 확정으로 N3 캐파가 충분히 운영 중임 확인. 파운드리 병목은 추가 완화. 지수 **50** (▼-2 from 52).

---

## 4. 첨단 패키징 병목 — 지수 68 → 70 (▲+2)

### TSMC CEO C.C. Wei (2026-06-04 주주총회) — 명시적 확인
- **TSMC CEO C.C. Wei (2026-06-04)**: "CoWoS capacity remains extremely tight and sold out through 2026"
- **TSMC 3개 첨단 패키징 백엔드 시설** 모두 2027년까지 완판, 납기 **52~78주**
- TSMC CoWoS 2026 말 용량: 기관 투자자 예측 상향 → **125K WPM** (이전 최고 130K 목표 대비 약간 보수적)
  - 2027 말: **170K WPM** (확장 목표)
- NVIDIA CoWoS 예약: 2026년 분 **800K~850K 웨이퍼** (TSMC 총 output의 약 60%)
  - 나머지 40%는 Broadcom, AMD, 기타 고객 — 타 고객 확보 여지 극히 제한

### HBM4 16-Hi 수율 이슈 지속
- Micron HBM4 자격 이슈 — 16-Hi 전환 난도로 수율 도전 지속
- Counterpoint HBM4 Rubin 공급: SK 54% vs 이전 SK 2/3+ 시나리오에서 다소 하향 → Samsung/Micron 진입 확대
- CXMT(중국): HBM3 생산 2026 말 목표, 초기 수율 **~50%** 예상 — 볼륨 생산 경쟁력 기준 **2028+ 현실적**
- YMTC: 3번째 우한 팹 착공 2026 H2로 앞당김 (원래 2027), NAND·DRAM 병행 확장, HBM TSV 연구 중

### 패키징 2027+ 완화 경로
- CoPoS(CoWoS-on-Panel) 파일럿 라인 6월 완공 확인 (2028~29 본격 양산 목표)
- Fan-Out Panel-Level Packaging(FOPLP) 차세대 대안으로 부상
- Amkor AZ 2028 초·SK 인디애나 2028 말·TSMC AZ 2029 전 — 신규 사이트 일정 진행 중

**신호 해석**: CEO 직접 발언으로 2026 매진 확인. 2027까지 52~78주 리드타임은 이전 "fully booked" 수준보다 더 장기·명시적인 병목 확인. NVIDIA 물량이 전체의 60% 선점. 지수 **70** (▲+2 from 68).

---

## 5. 경쟁 구도 최신

### HBM 점유율 종합 (2026 Q2 기준)

| 기업 | 전체 HBM | HBM4 (Rubin) | 변화 |
|---|---|---|---|
| SK Hynix | ~55% | ~54% (Counterpoint) | 소폭 하향 추세 |
| Samsung | ~30~35% | ~28% | 4월 35~40% 이후 안정화 |
| Micron | ~10~15% | ~18% | HBM4 진입으로 HBM3E 대비 개선 |

### 삼성 Q1 2026 실적 확인
- 메모리 매출 **74.8조 원($50.4B)** — QoQ +101%, YoY +292%
- 영업이익 **+756% YoY** (단일 분기 이익이 2025년 전체 이익 초과)
- 디바이스솔루션 영업이익률 **70%+**
- HBM4 양산 시작: 2026년 2월 (업계 최초 상업 출하)
- HBM4E 샘플: SK하이닉스보다 **6개월 선행** 출하 확인

### DRAM 가격 추이 (최신)

| 분기 | DRAM 계약가 QoQ | NAND QoQ |
|---|---|---|
| 2026 Q1 실적 | **+90~95%** (추정 +55~60% 대폭 초과) | — |
| 2026 Q2 예상 | **+58~63%** | **+70~75%** |
| 2026 Q3~Q4 | 상승 지속 (공급 조임·CSP 선점 계약) | 상승 지속 |

### 중국 메모리 현황
- CXMT: DDR5 및 HBM3 개발 중. HBM3 샘플 Huawei 등 제공. **2026 말 HBM3 양산 목표**
  - 초기 수율 ~50%, 경쟁력 있는 볼륨 생산은 **2028+** 현실적
  - 수출 규제·장비 접근성이 스케일업 핵심 변수
- YMTC: 우한 3팹 2026 H2 착공, DRAM·HBM TSV 병행. 영향은 2028+

---

## 6. 제약지수 요약 (2026-06-19)

| 병목 | 이전 (2026-06-14) | 현재 (2026-06-19) | 변동 | 핵심 신호 |
|---|---:|---:|---:|---|
| **전력** | 70 | **72** | ▲ +2 | 데이터센터 전력 2026년 1,050 TWh — IEA 2030 Base Case 초과 |
| **CAPEX/ROI** | 42 | **40** | ▼ −2 | Microsoft $190B 확정(컨센서스 $155B 대비 +$35B) · AI ROI 실현 추가 강화 |
| **파운드리** | 52 | **50** | ▼ −2 | Vera Rubin 풀 프로덕션 3사 확인 · N3 캐파 충분 운영 확인 |
| **패키징** | 68 | **70** | ▲ +2 | CEO 명시 "sold out through 2026" · 3개 시설 2027까지 만판 · 납기 52~78주 |

**하방 위험 순서 불변: CAPEX/ROI > 전력 ≈ 패키징 > 파운드리**  
**전력 + 패키징 동반 상향 — 공급 측 물리 병목(전기·패키징) vs 수요 측 자금 병목(CAPEX) 분리 패턴 강화**

---

## 출처

- CNBC (2026-04-29): "Microsoft calls for $190 billion in 2026 capital spending on soaring memory prices"
- The Register (2026-04-30): "Microsoft lifts 2026 CapEx by $25B to cover price rises"
- Tom's Hardware: "Google, Microsoft, Meta, and Amazon capex spending to hit $725 billion in 2026"
- GlobalElectricity.org: "Data Centers and AI Energy Consumption: The Surge in Electricity Demand"
- Goldman Sachs: "AI to drive 165% increase in data center power demand by 2030"
- S&P Global: "Data center grid-power demand to rise 22% in 2025, nearly triple by 2030"
- IEA: "Energy demand from AI" (Energy and AI report)
- Silicon Analysts / fusionww.com (2026-06-04): TSMC CEO shareholder meeting — CoWoS "extremely tight and sold out through 2026"
- fusionww.com: "Inside the AI Bottleneck: CoWoS, HBM, and 2–3nm Capacity Constraints Through 2027"
- Astute Group: "SK hynix holds 62% of HBM, Micron overtakes Samsung, 2026 battle pivots to HBM4"
- Counterpoint Research: HBM4 market share 2026 (SK 54%, Samsung 28%, Micron 18%)
- TechTimes (2026-06-02): "Nvidia Vera Rubin Enters Full Production: Samsung, SK Hynix, Micron Named HBM4 Suppliers"
- Tom's Hardware: "Chinese semiconductor industry gears up for domestic HBM3 production by end of 2026"
- TechWireAsia: "Chinese memory giants are scaling fast"
- Samsung Global Newsroom: "Samsung Electronics Announces First Quarter 2026 Results"
- TrendForce: "Memory Price Outlook for 1Q26 Sharply Upgraded"
