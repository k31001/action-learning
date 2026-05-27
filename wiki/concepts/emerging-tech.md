# 신기술 동향: CXL / PIM / NAND 고단화
**수집일**: 2026-05-05
**출처**: TrendForce, KAD, Introl Blog, CXL Consortium Business Wire, Digitimes, TechPowerUp, TechRadar, SK hynix Newsroom, Winbuzzer, Yole Group

---

## 1. CXL (Compute Express Link) 메모리 기술

### 핵심 데이터

#### CXL 버전별 사양

| 버전 | 출시 | 전송 속도 | 물리 계층 | 주요 기능 |
|------|------|-----------|----------|----------|
| CXL 2.0 | 기완료 | 32 GT/s | PCIe 5.0 | 메모리 확장, 스위칭 |
| CXL 3.0 | 기완료 | 64 GT/s | PCIe 6.0 | 메모리 패브릭, 멀티-호스트 공유 |
| CXL 3.1 | 2024년 12월 (3.2) | 64 GT/s | PCIe 6.0 | 캐시 코히런시 강화 |
| CXL 4.0 | 2025년 11월 18일 | 128 GT/s | PCIe 7.0 | 번들 포트, 1.5 TB/s 연결 |

#### CXL 시장 규모 및 전망 (출처: MarketIntelo)

| 연도 | 시장 규모 |
|------|----------|
| 2025 | 13억 달러 |
| 2028 | 약 160억 달러 |
| 2034 | 약 118억 달러 (CAGR 28.7%, 2026–2034) |

#### 데이터센터 배포 단계

| 단계 | 시기 | 내용 |
|------|------|------|
| Phase 1: 메모리 확장 | 2024–2025 | 단일 서버 메모리 용량 확장 |
| Phase 2: 메모리 티어링 | 2025–2026 | 핫/콜드 메모리 계층화 |
| Phase 3: 메모리 풀링 | 2026–2027 | CXL 스위치 기반 공유 메모리 풀 |
| Phase 4: 멀티랙 패브릭 | 2027+ | 랙 단위 통합 메모리 패브릭 |

### 주요 발견

- CXL Consortium, 2025년 11월 18일 CXL 4.0 사양 공식 발표: PCIe 7.0 기반 128 GT/s, 번들 포트로 1.5 TB/s 연결 지원
- 2026년 핵심 기술 마일스톤: CXL 3.1 광범위 배포 (PCIe 6.1 물리 계층 기반)
- 2025년 상용 CXL 메모리 풀 100TiB 규모 제품 출시, 2026년 더 대규모 배포 예정
- Samsung CXL Memory Module-DRAM (CMM-D): 검증 플랫폼에서 실제 프로덕션 클러스터로 전환
- Montage Technology M88MX6852 컨트롤러 (2025년 말 출시): DDR5-8000 지원, 2026년 배포 핵심 제품
- Microsoft Azure CXL 프리뷰: 퍼블릭 클라우드 적용 가능성 입증
- CXL 기반 아키텍처, 하이퍼스케일러 TCO 15–20% 절감 추정 (출처: Introl Blog)
- 2026년 서버 CXL 어태치율: 메모리 확장·풀링 포함 30% 전망
- AI 데이터센터 메모리 부족 문제의 핵심 해결책으로 부상

---

## 2. PIM (Processing-in-Memory) / 컴퓨팅 메모리

### 핵심 데이터

#### SK하이닉스 AiM (Accelerator in Memory) 사양

| 항목 | 내용 |
|------|------|
| 제품명 | GDDR6-AiM 기반 AiMX 가속기 카드 |
| 처리 속도 | 16 Gbps |
| 성능 향상 | 특정 조건에서 CPU/GPU 대비 최대 16배 빠른 연산 |
| 주요 적용 | LLM (대형 언어 모델) 추론, KV-캐시 최적화 |
| 소프트웨어 지원 | vLLM 프레임워크 연동 |
| 배포 현황 | 실제 서비스 환경 적용 완료 |

#### Samsung LPDDR5X-PIM 및 LPDDR6-PIM

| 항목 | 내용 |
|------|------|
| 제품 | LPDDR5X-PIM (2025~), LPDDR6-PIM (2026 목표) |
| 성능 개선 | 기존 HBM 대비 2배 성능 향상 (삼성 주장) |
| 전력 절감 | 기존 대비 70% 전력 소비 절감 (삼성 주장) |
| 표준화 | 삼성·SK하이닉스 공동으로 LPDDR6-PIM 표준화 추진 |
| 출시 예상 | LPDDR6-PIM 2026년 출시 예정 |
| 적용 대상 | 온디바이스 AI (스마트폰·노트북 등 주류 기기) |

### 주요 발견

- PIM: 메모리 칩 내부에 연산 유닛 내장, 행렬 연산(AI 핵심 연산) 메모리 내에서 수행
- SK하이닉스 AiMX: NVIDIA H100 GPU와 조합 시 메모리 바운드 워크로드 속도·효율 대폭 향상 확인
- 삼성·SK하이닉스, LPDDR6-PIM 표준화 협력: 메모리 반도체 라이벌 기업 간 이례적 기술 협력
- Samsung, 2026년 2월 LPDDR5X-PIM으로 AI 시장 점유율 회복 도전 (출처: Winbuzzer)
- TrendForce (2026년 3월): 삼성·SK하이닉스, HBM을 넘어 NVIDIA에 도전할 차세대 AI 메모리 탐색 중
- SK하이닉스 CES 2026: 차세대 AI 메모리 혁신 기술 전시, 16레이어 HBM4 48GB 포함
- SK하이닉스 AI Infra Summit 2025: 업데이트된 AiM 솔루션 공개

---

## 3. NAND 고단화 경쟁 (200단 이상)

### 핵심 데이터

#### 제조사별 레이어 경쟁 현황 (2025~2026)

| 제조사 | 현재 세대 | 레이어 수 | 유형 | 양산 상태 |
|--------|----------|-----------|------|----------|
| SK하이닉스 | V9 (128레이어급) | — | TLC | 양산 중 |
| SK하이닉스 | 321레이어 | 321 | QLC | 2025년 8월 양산 시작 |
| SK하이닉스 | 321레이어 TLC | 321 | TLC | 업계 최초 300+ 레이어 TLC 출하 |
| 삼성전자 | V9 | 286 | QLC | 2026년 초 플래그십 제품, Pyeongtaek 4라인 Phase 1 램프업 |
| 삼성전자 | V10 (차기) | 300+ | — | 2026년 테스트 라인 검증, 2027년 본격 양산 |
| 키옥시아 | BiCS8 | — | — | 2025년 전환 진행 |
| 키옥시아·SanDisk | BiCS10 | 332 | — | 2026년 양산 착수 예정 (당초 2H27에서 앞당김) |
| 마이크론 | — | — | — | Q3 2025 시장 점유율 4위 |

#### NAND 시장 점유율 Q3 2025 (출처: TrendForce)

| 제조사 | 시장 점유율 | 매출 | QoQ 성장 |
|--------|------------|------|---------|
| 삼성전자 | 32.3% | 약 60억 달러 | +15.4% |
| SK그룹 (SK하이닉스+Solidigm) | 19.3% | 약 35.3억 달러 | +5.7% |
| 키옥시아 | 15.3% | 약 28.4억 달러 | +33.1% |
| 마이크론 | ~12%대 | 약 24.2억 달러 | +15.4% |
| SanDisk | 12.4% | — | — |

#### 주요 가격 동향

| 항목 | 내용 |
|------|------|
| 2025년 하반기 | 주요 업체 생산량 감축으로 가격 상승세 |
| 2026년 가격 전망 | 삼성전자 HBM3E 20% 인상 협의, NAND 20–30% 인상 검토 (삼성) |
| 고용량 SSD | AI 서버 수요 급증으로 1년 이상 출하 지연 발생 |

### 주요 발견

- SK하이닉스: 업계 최초 321레이어 QLC NAND 2025년 8월 양산 시작 발표; 321레이어 TLC도 업계 최초 300+ 레이어 TLC로 출하
- SK하이닉스: 300+ 레이어 NAND에 하이브리드 본딩 기술 적용, 삼성에 도전
- 삼성전자: V9 286레이어 QLC NAND 2026년 초 플래그십 제품, V10(300+레이어) 2026년 테스트 라인 검증 → 2027년 본격 양산
- 키옥시아: BiCS10 332레이어, 2026년 양산 착수 (원래 2H27 계획에서 앞당김)
- AI 서버 수요 증가가 고용량 NAND 수요 주도: AI 인프라 확대로 엔터프라이즈 SSD 수요 급증
- 2025년 하반기: 삼성·SK하이닉스 등 주요 업체 생산량 감축으로 가격 반등 (출처: TrendForce)
- 키옥시아 Q3 2025: 전체 공급사 중 가장 높은 QoQ 성장률 33.1% 달성, 3위로 도약
- SK하이닉스: HBM4 램프업 속도를 늦추고 300+ 레이어 NAND에 자원 집중하는 이중 전략 채택

---

## 원본 링크

### CXL
- [CXL Consortium Releases the Compute Express Link 4.0 Specification](https://www.businesswire.com/news/home/20251118275848/en/CXL-Consortium-Releases-the-Compute-Express-Link-4.0-Specification-Increasing-Speed-and-Bandwidth)
- [CXL Goes Mainstream: The Memory Fabric Era in 2026](https://www.kad8.com/hardware/cxl-opens-a-new-era-of-memory-expansion/)
- [CXL in 2026: How Memory Pooling Is Reshaping Data Centers](https://www.kad8.com/hardware/cxl-in-2026-how-memory-pooling-is-reshaping-data-centers/)
- [CXL 4.0 Infrastructure Planning Guide](https://introl.com/blog/cxl-4-0-infrastructure-planning-guide-memory-pooling-2025)
- [CXL Memory Expansion: Pooling, Disaggregated Memory, AI Data Center](https://introl.com/blog/cxl-memory-expansion-pooling-disaggregated-memory-ai-data-center-2025)
- [CXL Memory Expansion Market Research Report 2034](https://marketintelo.com/report/cxl-memory-expansion-market)
- [Montage Technology embraces CXL innovation](https://www.digitimes.com/news/a20250520PR202/cxl-performance-data-center-bandwidth-data.html&chid=9)

### PIM
- [Samsung and SK Hynix push PIM-enabled memory to address AI bottlenecks](https://www.digitimes.com/news/a20251218PD206/samsung-sk-hynix-hbm-ai-inference-data.html)
- [SK hynix and Samsung team up to standardize LPDDR6-PIM for on-device AI](https://www.tweaktown.com/news/101983/sk-hynix-and-samsung-team-up-to-standardize-lpddr6-processing-in-memory-pim-for-on-device-ai/index.html)
- [Samsung Pushes LPDDR5X-PIM Memory to Regain AI Market Edge](https://winbuzzer.com/2026/02/18/samsung-lpddr5x-pim-hbm4-memory-ai-computing-xcxwbn/)
- [Beyond HBM: Samsung, SK hynix Reportedly Explore Next-Gen AI Memory](https://www.trendforce.com/news/2026/03/10/news-beyond-hbm-samsung-sk-hynix-reportedly-explore-next-gen-ai-memory-that-could-challenge-nvidia/)
- [AI Infra Summit 2025: SK hynix Presents Updated AiM Solution](https://news.skhynix.com/ai-infra-summit-2025/)
- [CES 2026: SK hynix Showcases Next-Gen AI Memory Innovations](https://news.skhynix.com/sk-hynix-showcases-next-generation-ai-memory-innovations-at-ces-2026/)

### NAND 고단화
- [SK Hynix Slows Down HBM4 Ramp, Prepares 300+ Layer NAND Flash](https://www.techpowerup.com/343802/sk-hynix-slows-down-hbm4-ramp-prepares-300-layer-nand-flash)
- [SK hynix adopts hybrid bonding for 300-layer NAND to challenge Samsung](https://www.digitimes.com/news/a20251209PD213/sk-hynix-nand-samsung-development-technology.html)
- [Samsung and SK Hynix slash NAND spending as SK Hynix unveils 321-layer breakthrough](https://www.digitimes.com/news/a20250825PD209/samsung-sk-hynix-nand-nand-flash-demand.html)
- [SK Hynix 321-layer TLC NAND: first chipmaker to launch 300+ layer TLC](https://www.techradar.com/pro/samsungs-archrival-becomes-first-chipmaker-to-launch-300-layer-tlc-nand-flash-memory-sk-hynixs-321-layer-1-terabit-tlc-paves-the-way-for-more-affordable-100tb-ssds)
- [AI Infrastructure Continues to Strengthen NAND Flash Demand; Kioxia Q3 2025](https://www.trendforce.com/presscenter/news/20251203-12813.html)
- [NAND Giants Reportedly Cut Output in 2H25 as Prices Surge](https://www.trendforce.com/news/2025/11/13/news-nand-giants-reportedly-cut-output-in-2h25-as-prices-surge-samsung-mulls-20-30-hike-in-2026/)
- [Second-Tier No More: Kioxia and SanDisk Balance Alliance and Rivalry in AI NAND Race](https://www.trendforce.com/news/2026/01/29/news-second-tier-no-more-kioxia-and-sandisk-balance-alliance-and-rivalry-in-ai-nand-race/)
- [2026 Memory Industry Insights](https://globalsemiresearch.substack.com/p/2026-memory-industry-insights)

---

## [Update 2026-05-19] ISSCC 2026 — GDDR7·MRAM·4F² COP

### GDDR7 SK Hynix 1c (Paper 15.9)
- **48 Gb/s @ 1.2V/1.2V**
- 30.3 Gb/s @ 1.05V/0.9V (RTX 5080의 30 Gb/s 초과)
- 비트 밀도 0.412 Gb/mm² (Samsung 1b의 0.309 Gb/mm² 대비)
- GDDR7은 LPDDR5X 대비 약 70% 밀도 (주변회로 비중 증가)

### TSMC N16 MRAM (Paper 15.4)
- STT-MRAM, 자동차/산업용 비휘발성 메모리
- 듀얼포트(독립 R/W 동시), 51.2 Gb/s @ 200 MHz
- 7.5 ns 읽기, 비트셀 0.033 → 0.0249 µm² (−25%)
- 매크로 밀도 16.0 Mb/mm²

### Samsung 4F² COP DRAM
- 3D DRAM 상용화 후보 아키텍처 — 자세한 내용은 [dram-technology.md](dram-technology.md) 참조

**출처**: [semianalysis-isscc-2026-2026-04-15.md](../../sources/articles/semianalysis-isscc-2026-2026-04-15.md)

---

## [Update 2026-05-19] 권석준 인터뷰 (SBS, 2026-04-11) — 메모리 파운드리화

### 메모리 파운드리 비즈니스 모델 등장

권 교수가 강조한 **새 메모리 비즈니스 모델**:
- 고객사(NVIDIA·하이퍼스케일러·Tesla 등)가 **설계 단계부터 참여**하는 맞춤형 메모리
- 일종의 **메모리 파운드리화** — 기존 catalog 양산에서 고객 맞춤형으로 전환
- 대상 제품군:
  - **AI 맞춤형 HBM** — 에이전트 AI·피지컬 AI에 특화
  - **AI 맞춤형 LPDDR** — 전성비 높은 범용 DRAM 변종

### 실행 방식 = 라인 분기 운영

- 신규 팹 건설은 모험 → 기존 시설의 **일부 라인을 분기**시켜 맞춤형 라인으로 운영
- 메모리 업체들이 잘 해보지 않은 영역 → 향후 몇 년 불확실성
- 극복하는 업체가 장기 생존

### Samsung 전략 시사점

- [MB-4 커스텀 AI 메모리](../strategies/core/current-state-mb4-custom-ai-memory.md): 전략 자체의 정당화 + 실행 방안 (라인 분기) 명확화
- Samsung은 [로직다이 내재화 차별점](../entities/samsung.md)([Update 2026-05-19] 권석준 섹션)으로 메모리 파운드리화 경쟁에서 우위 잠재력

**출처**: [youtube-kwon-seokjun-2026-04-11.md](../../sources/articles/youtube-kwon-seokjun-2026-04-11.md)

---

## [Update 2026-05-19 II] 권석준 — CXL "메모리 부도심" + 2030년대 후반 게임 체인저 = 3D DRAM·CXL

### CXL = 메모리 부도심 (권석준 비유)

> "CXL은 메모리와 메모리 기기를 잇는 부도심 같은 개념이죠. 메모리를 **버추얼리 확장**하는 그런 느낌이 나오는 거죠."

- 클러스터와 클러스터, 랙과 랙을 이어 **하나의 거대 컴퓨팅 인프라**로 통합
- 굳이 느린 DRAM에 올리지 않고도 HBM-to-HBM, GDDR-to-GDDR 빠른 통신 가능
- 메모리 풀링·버추얼 확장의 기반 기술

### 삼성의 CXL 차별점 — 권석준 명시

- SK: HBM (고대역폭) 학습 특화
- **Samsung: HBM + CXL** (클러스터/랙 연결) — 인프라 통합

→ [SE-2 CXL SIG 리더십](../strategies/core/current-state-se2-cxl-sig-leadership.md) 전략의 외부 권위자 검증. 표준 주도권 확보가 핵심.

### 2030년대 후반 게임 체인저

권 교수 진단: **2030년 후반 반도체 게임 체인저 = 3D DRAM + CXL**

- 위키 기존 가정 "3D DRAM 상용화 2033~2034" 과 정합
- SemiAnalysis ISSCC 2026 Samsung 4F² COP DRAM (3D 후보 아키텍처)이 게임 체인저 시기 앞당길 가능성

### 함의

- [SE-1 3D DRAM IMEC M&A](../strategies/core/current-state-se1-3d-dram-imec-ma.md) — 결정적 가치. IMEC 협약·M&A 가속 필수.
- [SE-2 CXL SIG 리더십](../strategies/core/current-state-se2-cxl-sig-leadership.md) — 단순 SIG 참여 아닌 **표준 주도권** 확보 필요
- 두 전략(SE-1, SE-2)이 2030년대 후반 Samsung 메모리 지속력의 핵심

**출처**: [youtube-kwon-hbm-roadmap-cxl-2026-05-12.md](../../sources/articles/youtube-kwon-hbm-roadmap-cxl-2026-05-12.md), [youtube-kwon-agentic-ai-memory-2026-05-01.md](../../sources/articles/youtube-kwon-agentic-ai-memory-2026-05-01.md)
