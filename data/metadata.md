# 데이터 메타데이터 인덱스

> 수집된 모든 데이터의 중앙 인덱스. 데이터 추가/수정 시 반드시 이 파일도 업데이트.

**마지막 업데이트**: 2026-05-06  
**총 데이터 항목**: 19개 (2026-05-06 Q1 2026 실적·HBM4 NVIDIA Rubin 공급 점유율·CXMT HBM3 양산·테일러 팹 진척 데이터 추가, 벤치마크 사례 통합, **NAND 공정 전환 비용·기술 데이터 추가**)

---

## 카테고리별 인덱스

| 카테고리 | 항목 수 | 디렉토리 |
|---------|--------|---------|
| 시장 데이터 | 5 | `data/market/` |
| 산업/기술 트렌드 | 5 | `data/technology/` |
| 경쟁사 분석 | 4 | `data/competitors/` |
| 거시경제/AI수요 | 4 | `data/macro/` |
| 정책/규제 | 4 | `data/policy/` |
| **벤치마크** | **1** | **`analysis/benchmark/`** |

---

## 시장 데이터 (`data/market/`)

### market-overview.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #market #DRAM #NAND #forecast
- **요약**: 2024년 글로벌 메모리 시장 $1,700억(역대 최고). TrendForce 기준 2026년 $5,516억, 2027년 $8,427억 전망. AI 슈퍼사이클로 2027년까지 공급 부족 지속 예상.
- **출처**: Yole Group, TrendForce, Grand View Research, IDC

### hbm-market.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #HBM #AI #market-share
- **요약**: 2025년 HBM 매출 ~$340억(전년 2배). SK하이닉스 57~62%, Micron 21%, 삼성 17~22% (삼성 점유율 역전 상태). 2030년 CAGR 33%.
- **출처**: Yole Group, BofA, Counterpoint Research

### price-trends.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #price #DRAM #NAND #cycle
- **요약**: 2026 Q1 DRAM 계약가 +55~60% QoQ (역대 최대 분기 상승폭). HBM4 단가 ~$500/개(HBM3E 대비 +67%). NAND +33~38% QoQ.
- **출처**: TrendForce, NAND Research, Tom's Hardware

### ai-server-demand.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #AI #server #demand #GPU
- **요약**: AI가 2026년 전체 DRAM 웨이퍼 소비의 ~20% 차지. GPU당 HBM 탑재량이 기존 HPC 대비 7배. NVIDIA H200→B200으로 전환 시 HBM 탑재량 대폭 증가.
- **출처**: TrendForce, SK하이닉스, Avnet, Oxford Economics

### 2026-q1-current-state.md ⭐ (신규)
- **수집일**: 2026-05-06 | **신뢰도**: High | **태그**: #current-state #Q1-2026 #HBM4 #NVIDIA-Rubin #CXMT #Texas-Taylor #benchmark
- **요약**: 2026년 1분기 삼성 매출 134조 원, 메모리 매출 +292% YoY ($50.4B). HBM4 양산 2026.2 개시, 2026년 캐파 전량 Sold Out. NVIDIA Rubin HBM4 점유율: SK 70%/Samsung 28%/Micron 18%. 빅테크 4사 AI CapEx $725B(+77%). 테일러 팹 CHIPS Act 보조금 $4.745B 확정(목표 대비 60~80%). CXMT HBM3 양산 2026년 개시(월 6만 W). MS가 메모리 가격 영향 $25B 직접 인정. 슬라이드용 8개 차트 권장 목록 포함.
- **출처**: Samsung IR, TrendForce, Counterpoint Research, CNBC, Tom's Hardware, NIST, UBS, BofA

---

## 기술 트렌드 (`data/technology/`)

### hbm-roadmap.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #HBM #roadmap #Samsung #SKhynix #Micron
- **요약**: HBM3E→HBM4 전환 진행 중. SK하이닉스 HBM4 Q3 2026 램프업(62% 점유). 삼성 2026년 2월 HBM4 양산 개시(3.3TB/s). 마이크론 2026 HBM4 연매출 $80억 전망.
- **출처**: SK하이닉스 IR, Micron IR, TrendForce

### dram-technology.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #DDR5 #DDR6 #LPDDR6 #process #EUV
- **요약**: DDR5 보급률 2025년 45~50%. DDR6 2027년 대규모 상용화 예정. DRAM 1a→1b→1c→1d 미세공정 로드맵. 3D DRAM 상용화 2033~2034년 전망.
- **출처**: JEDEC, TrendForce, Yole

### emerging-tech.md
- **수집일**: 2026-05-05 | **신뢰도**: Medium | **태그**: #CXL #PIM #NAND #emerging
- **요약**: CXL 시장 2025년 $13억 → 2028년 $160억. 삼성/SK하이닉스 PIM 기술 경쟁(2배 성능, 70% 전력절감). NAND 300층+ 경쟁(SK하이닉스 321층 선두).
- **출처**: CXL Consortium, SK하이닉스, 삼성전자 IR

### nvidia-cmx-scada.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #CMX #SCADA #NVIDIA #KV-cache #AI-storage #SSD #PCIe-Gen6
- **요약**: NVIDIA CMX(Context Memory Storage Platform): BlueField-4 기반 KV 캐시 오프로드 플랫폼. 삼성 PM1753 공식 공급 SSD. SCADA(Scaled Accelerated Data Access): GPU 네이티브 스토리지로 2.3억 IOPS 달성(SC'25). SK하이닉스·Kioxia가 NVIDIA AI SSD 전략 파트너 — 삼성전자 SLC AI SSD 전략 수립 시급.
- **출처**: NVIDIA 공식 기술 블로그, Micron IR, Samsung Semiconductor 기술 블로그, TrendForce

### nand-process-transition.md
- **수집일**: 2026-05-06 | **신뢰도**: High | **태그**: #NAND #process-transition #hybrid-bonding #capex #yield-ramp
- **요약**: NAND layer 경쟁 가속(Samsung V9 286L→V10 430L 2026, V11 2027, 1000L 2030 / SK V8 321L 2025→V10 hybrid bonding 2027). 2026 NAND capex $22.2B(+5%)만 — 업계가 capa 확장보다 process upgrade에 집중. **양산 ramp 6개월 지연 = 누적 이익의 2/3 손실**. **YMTC가 hybrid bonding 핵심 IP 지배** → 한국 메모리사 라이선스 종속 리스크. 공정 전환 주기 연장(deck 정교화·CBA·QLC/PLC·firmware) R&D가 모든 시나리오에서 robust 가치.
- **출처**: TrendForce, Tom's Hardware, Yole Group, Knowmade, NAND Research, TechInsights, Lam Research, Block & Files

---

## 경쟁사 분석 (`data/competitors/`)

### sk-hynix.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #SKhynix #HBM #competitor #market-leader #CapEx #investment
- **요약**: 2025년 매출 97조원(영업이익률 49%). HBM4 세계 최초 개발 완료(2025년 9월). Q2 2025 HBM 점유 62%. 2025 Q1에 33년 만에 삼성 DRAM 매출 추월. [2026-05-05 추가] M15X·청주 패키징 팹·용인 클러스터 투자 전략, NVIDIA co-design 파트너십 심화, CapEx 2026E 30조원 이상, 장기 선불계약 구조 상세 분석 추가.
- **출처**: SK하이닉스 IR, TrendForce, KED Global, UBS, Nikkei Asia

### micron.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #Micron #HBM #CHIPS-Act #US #CapEx #investment
- **요약**: FY2025 매출 $374억(역대 최고). HBM3E 점유율 21%(Q2 2025). CHIPS Act $61.65억 확정. NY/Idaho 팹 $1,000억+ 장기 투자. [2026-05-05 추가] CHIPS Act 보조금 활용 구조(보조금+세액공제 이중 수혜), Idaho ID2 우선 집행, 고객 선불계약 구조, CapEx FY2025 $140억, 팹 JV 미채택 이유 분석 추가.
- **출처**: Micron IR, NIST, Bloomberg, Tom's Hardware

### market-share.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #market-share #DRAM #HBM #삼성 #역전 #CapEx #투자비교
- **요약**: 2025년 SK하이닉스가 33년 만에 DRAM 매출에서 삼성 추월. 삼성 HBM 점유율 17~22%로 3위. DRAM 전체 점유율은 삼성 42%로 여전히 1위. [2026-05-05 추가] 경쟁사 CapEx·R&D·보조금 비교 테이블, SanDisk+Kioxia JV 모델 분석, 삼성 대응 3축 전략 추가.
- **출처**: TrendForce, Counterpoint Research, 각사 IR 종합

### china-competitors.md
- **수집일**: 2026-05-05 | **신뢰도**: Medium | **태그**: #China #CXMT #YMTC #risk #BigFund #investment
- **요약**: CXMT DRAM 글로벌 점유율 8%(Q3 2025), DDR5-8000 기술 시연. YMTC NAND 13% 출하 점유, 294층 기술. 미국 수출 규제에도 불구 급성장 중. [2026-05-05 추가] 빅펀드 III ($470억) 구조, 지방정부 국유 VC 모델(허페이 모델), CXMT·YMTC 팹 투자 규모, 기술 자립 3단계 로드맵, 15차 5개년 계획 반도체 자급률 40% 목표 상세 추가.
- **출처**: Bloomberg, Reuters, Yole Group, Morgan Stanley, TechInsights

---

## 거시경제/AI수요 (`data/macro/`)

### ai-capex.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #BigTech #Capex #AI #datacenter
- **요약**: 빅테크 4사(Google·MS·Amazon·Meta) 2026년 합산 AI Capex $650~725B, 2027년 $1조 돌파 전망. Q1 2026 클라우드 매출 강세(Google Cloud +63%, AWS +28%).
- **출처**: 각사 IR, Evercore, BofA

### semiconductor-cycle.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #cycle #forecast #2028 #supercycle
- **요약**: 글로벌 반도체 2026년 ~$975B, 2028년 $1T 전망. DRAM +51% / NAND +45% (2026). HBM $35B→$100B (2028). 2028~2029년 공급과잉 리스크 대두.
- **출처**: BofA, Gartner, TrendForce

### ai-demand-sustainability.md
- **수집일**: 2026-05-05 | **신뢰도**: Medium | **태그**: #AI-bubble #demand #sustainability #risk
- **요약**: 거품론: NBER 기업 90% AI 생산성 미체감, MIT 엔터프라이즈 95% ROI 미실현. 낙관론: 빅테크 Capex 지속 상향. 관세로 NVIDIA 중국 점유율 90%→50% 급락.
- **출처**: NBER, MIT, Bloomberg, Reuters

### energy-constraints.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #energy #power #SMR #nuclear #constraint
- **요약**: 2026년 AI 데이터센터 전력 950~1,100 TWh(IEA). 빅테크 SMR/핵에너지 계약(MS 2GW, Amazon 5GW). 단기는 천연가스, 상용화는 2030년 이후. GPU 관세 최대 +15%.
- **출처**: IEA, Microsoft IR, Amazon IR, Bloomberg

---

## 정책/규제 (`data/policy/`)

### us-export-controls.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #export-control #US-China #BIS #risk
- **요약**: 미국의 對중국 반도체 수출 통제 지속 강화. HBM 포함 첨단 메모리 규제 범위 확대. 삼성 중국 시안(NAND) 팹 운영 불확실성 증가.
- **출처**: BIS, Reuters, SEMI

### chips-act.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #CHIPS-Act #subsidy #Texas #Samsung
- **요약**: 삼성전자 텍사스 팹 CHIPS Act 보조금 협상 진행 중. Micron은 $61.65억 확정. TSMC $66억 확정. 삼성 지연 이슈로 보조금 규모 불확실.
- **출처**: NIST, Reuters, Bloomberg

### china-policy.md
- **수집일**: 2026-05-05 | **신뢰도**: Medium | **태그**: #China #자립 #CXMT #YMTC #정책
- **요약**: 중국 반도체 자립 정책($1,500억+ 펀드). CXMT/YMTC 정부 지원으로 급성장. 미국 규제 회피 우회 전략 지속. 중장기 저가 공세로 메모리 시장 교란 가능.
- **출처**: CSIS, Reuters, TrendForce

### korea-policy.md
- **수집일**: 2026-05-05 | **신뢰도**: High | **태그**: #Korea #K반도체 #세제 #정책
- **요약**: 한국 K-반도체 전략: 용인 클러스터 조성, R&D 세액공제 25%. 삼성·SK하이닉스 국내 투자 유지 인센티브. 대미 협력 강화로 수출 규제 완충 노력.
- **출처**: 산업통상자원부, 기획재정부, KOTRA

---

## 벤치마크 (`analysis/benchmark/`)

### cyclical-strategy-benchmark.md ⭐ (신규)
- **수집일**: 2026-05-06 | **신뢰도**: High | **태그**: #benchmark #cycle-strategy #counter-cyclical #asset-light #vertical-integration #hedging #m-and-a
- **요약**: 7개 산업·7개 기업의 사이클 대응 전략 사례 분석. 7가지 핵심 패턴 추출 — ① 역사이클 투자(Samsung, ExxonMobil, Disney) ② 변동비 구조(Nucor) ③ Asset-light(Marriott, Maersk) ④ 수직·수평 통합(Maersk) ⑤ 헤징·장기계약(Southwest, Samsung Foundry) ⑥ 요새형 재무구조(Nucor, Samsung) ⑦ 불황기 M&A(Disney-Marvel, ExxonMobil-Pioneer). 메모리 산업에 적용 가능한 1~3개 조합 권장.
- **출처**: Reuters, Korea Times, Nucor SEC 8-K, Maersk IR, ExxonMobil SEC 8-K, Hospitality Investor, Disney/Marvel SEC, Southwest SEC 8-K, Bloomberg
