# DRAM 기술 동향: DDR5/LPDDR5X 보급 현황 및 미세공정 로드맵
**수집일**: 2026-05-05
**출처**: TrendForce, Tom's Hardware, Accio, IntuitionLabs, Tweaktown, SK hynix Newsroom, Micron Investor Relations, SemiWiki

---

## 핵심 데이터

### DDR 세대별 주요 사양 비교

| 항목 | DDR4 | DDR5 | DDR6 (예상) |
|------|------|------|-------------|
| 초기 속도 | 3.2 GT/s | 4.8 GT/s | 8.8 GT/s |
| 최대 속도 | 6.4 GT/s | 8.4 GT/s (현재) | ~17.6 GT/s |
| 버스폭 | 64-bit | 64-bit (32-bit × 2채널) | 96-bit (24-bit × 4채널) |
| 전압 | 1.1–1.2V | 1.1V | <1.1V |
| JEDEC 최종 승인 | 완료 | 완료 | 2026년 내 예정 |

### DDR5 시장 보급률 (출처: Accio / TrendForce)

| 연도 | DDR5 시장 점유율 |
|------|----------------|
| 2022 | 약 8% |
| 2024 | 약 35% |
| 2025 예상 | 45–50% |

### LPDDR 세대별 현황

| 항목 | LPDDR5X | LPDDR6 |
|------|---------|--------|
| JEDEC 규격 | 기완료 | JESD209-6, 2025년 7월 최종 승인 |
| 양산 현황 | 대량 양산 중 | 삼성·SK하이닉스 생산 시작 |
| 적용 기기 | 플래그십 스마트폰·노트북 | 플래그십 스마트폰·태블릿·노트북 선도 적용 |

### DDR6 전망 일정

| 마일스톤 | 예상 시기 |
|----------|----------|
| JEDEC 최종 규격 승인 | 2026년 내 |
| DDR6 DIMM 초기 출하 | 2026년 말–2027년 |
| 대규모 상용화 | 2027년 |
| HPC·AI 클러스터 선행 도입 | 2026–2027년 |

### DRAM 미세공정 로드맵

| 세대명 | 공정 분류 | EUV 레이어 | 주요 제조사 | 양산 현황 |
|--------|-----------|-----------|------------|----------|
| 1a nm | 4세대 10nm급 | 1–2 레이어 | 삼성·SK하이닉스 (2021~) | 양산 완료 |
| 1b nm | 5세대 10nm급 | 증가 | 삼성·SK하이닉스 | 양산 중 |
| 1c nm | 6세대 10nm급 | 5–6 레이어 (SK하이닉스 기준) | 삼성·SK하이닉스·마이크론 | 양산 중 (2025~) |
| 1γ (1-gamma) | 마이크론 명명 | EUV 도입 | 마이크론 | 2025년 대만·일본 공장 램프업 |
| 1d nm | 7세대 예상 | High-NA EUV 활용 | 삼성·SK하이닉스 | 2026년 하반기 도입 예상 |

### High-NA EUV 도입 현황

| 항목 | 내용 |
|------|------|
| ASML 장비 모델 | TWINSCAN EXE:5200B |
| SK하이닉스 설치 시기 | 2025년 9월 DRAM 팹 설치 완료 |
| 양산 예상 시기 | 2027–2028년 |
| 대응 제조사 | 삼성전자, SK하이닉스 (Intel, TSMC 포함 검토 중) |

---

## 주요 발견

### DDR5 보급 현황

- DDR5 점유율 2022년 8% → 2024년 35% → 2025년 45–50% 예상 (출처: Accio)
- 서버·데이터센터 및 소비자 시장 모두에서 DDR5 채택 가속
- DDR5는 DDR4 대비 서브채널 구조(32-bit × 2) 변경으로 병렬성 향상

### LPDDR6

- JEDEC JESD209-6 표준 2025년 7월 최종 확정
- 삼성전자·SK하이닉스 LPDDR6 칩 생산 착수
- 표준 DDR6보다 먼저 플래그십 스마트폰·노트북에 적용될 전망
- SK하이닉스·삼성, LPDDR6-PIM 표준화 공동 추진

### DDR6 전망

- 초기 속도 8.8 GT/s, 목표 최대 17.6 GT/s (DDR5의 약 2–3배 대역폭)
- 버스폭 DDR5 64-bit → DDR6 96-bit (24-bit × 4 서브채널)로 확장
- 동작 전압 1.1V 미만으로 전력 효율 개선
- 2027년 대규모 상용화 예상, PC·노트북은 DDR5·LPDDR5X/6을 더 오래 사용할 전망 (출처: TrendForce, 2025년 7월)

### 미세공정: EUV 적용 확대

- 삼성·SK하이닉스: 1a nm에서 EUV 적용 시작, 1c nm에서 5–6 레이어로 증가
- SK하이닉스: 1c DRAM에 EUV 6레이어 적용, 차세대 1d 설계를 High-NA EUV로 준비
- 마이크론: 1γ 노드에서 EUV 양산 돌입 (대만·일본, 2025년~)
- ASML High-NA EUV 장비 업계 도입 경쟁: SK하이닉스 2025년 9월 설치, 양산 2027–2028년 목표

### 3D DRAM (장기 로드맵)

- 현재 2D 스케일링 한계에 따른 대안으로 수직 채널 트랜지스터(VCT) 기반 3D DRAM 연구 진행
- 주요 아키텍처: 1T1C (수평 커패시터), 2T0C (게인 셀), 1T-DRAM (플로팅 바디)
- 삼성: 2025년 수직 채널 트랜지스터 기반 3D DRAM 초기 버전 출시 계획 발표
- 2026년 말 첫 개념 증명 칩 (1T1C, 3T0C, NEO IGZO 아키텍처) 예상
- 상용 3D DRAM 로드맵 수렴 예상 시점: 2033–2034년경 (Yole Group)
- 8×8 3D 적층 IGZO 2T0C DRAM 어레이: 3비트 저장, 100초 이상 리텐션 타임 시연 (Science Advances 게재)

---

## 원본 링크

- [DDR5 Adoption Rate 2025: Market Trends & Projections](https://www.accio.com/business/ddr5-adoption-rate-trend-2025)
- [DDR6 Set for 2027 Mass Adoption as Memory Giants Reportedly Finalize Prototype Designs](https://www.trendforce.com/news/2025/07/23/news-ddr6-set-for-2027-mass-adoption-as-memory-giants-reportedly-finalize-prototype-designs/)
- [DDR6 Explained: Speeds, Architecture, & Release Date](https://intuitionlabs.ai/articles/ddr6-explained-speed-architecture)
- [DDR6 RAM: Everything We Know in 2026 About Next-Gen Memory](https://www.technerdo.com/blog/ddr6-ram-everything-we-know-2026)
- [LPDDR6 @ Q3-2025: Mother of All CPU Upgrades (AnandTech Forums)](https://forums.anandtech.com/threads/lpddr6-q3-2025-mother-of-all-cpu-upgrades.2617537/)
- [SK hynix Develops Industry's First 1c DDR5](https://news.skhynix.com/sk-hynix-develops-industry-first-1c-ddr5/)
- [SK hynix ramps 1c DRAM to 6 EUV layers, preps for High-NA EUV designs](https://www.tweaktown.com/news/106957/sk-hynix-ramps-1c-dram-to-6-euv-layers-preps-for-high-na-designs-destroy-samsung-in-hbm/index.html)
- [Micron Announces Shipment of 1γ (1-gamma) DRAM](https://investors.micron.com/news-releases/news-release-details/micron-announces-shipment-1g-1-gamma-dram-pioneering-memory)
- [ASML's High-NA EUV for 2027-28: Which Giants Are Betting Big](https://www.trendforce.com/news/2026/02/16/news-asmls-high-na-euv-for-2027-28-which-giants-are-betting-big-intel-samsung-sk-hynix-or-tsmc/)
- [Samsung puts 3D DRAM on the roadmap](https://www.tomshardware.com/pc-components/dram/samsung-outlines-plans-for-3d-dram-which-will-come-in-the-second-half-of-the-decade)
- [Next-generation 3D DRAM approaches reality: 120-layer stack](https://www.tomshardware.com/tech-industry/next-generation-3d-dram-approaches-reality-as-scientists-achieve-120-layer-stack-using-advanced-deposition-techniques)
- [Memory industry at a crossroads: why 2025 marks a defining year](https://www.yolegroup.com/strategy-insights/memory-industry-at-a-crossroads-why-2025-marks-a-defining-year/)
- [The future of DRAM: From DDR5 advancements to future ICs](https://www.tomshardware.com/pc-components/ram/the-future-of-dram-from-ddr5-advancements-to-future-ics)

---

## [Update 2026-05-19] ISSCC 2026 — LPDDR6 + 4F² COP DRAM

### LPDDR6 양사 비교
| 항목 | Samsung LPDDR6 (Paper 15.8) | SK Hynix 1c LPDDR6 (Paper 15.7) |
|---|---|---|
| 최고 속도 | 14.4 Gb/s @ 1.025V | 14.4 Gb/s |
| 저전압 동작 | 12.8 Gb/s @ 0.97V | 10.9 Gb/s @ 0.95V |
| 다이 | 16 Gb, 44.5 mm², 0.360 Gb/mm² | — |
| 아키텍처 | 2 서브채널, 16 뱅크/서브채널, Wide NRZ 12 DQ, 버스트 24 | — |
| 효율 모드 | 읽기 −27%, 쓰기 −22% | 대기 −12.7%, 동작 −18.9% |

→ Samsung이 LPDDR6 저전압 효율 측면에서 SK Hynix 대비 우위 (0.97V에서 12.8 Gb/s vs 0.95V에서 10.9 Gb/s)

### Samsung 4F² COP DRAM (Paper 15.10) — 3D DRAM 상용화 후보
- **Cell-on-Peripheral (COP) 아키텍처** — 수직 채널 트랜지스터(VCT) + 상단 캐패시터
- 하이브리드 본딩으로 DRAM 노드 셀 + 로직 노드 주변회로 결합
- **핵심 회로 면적 17.0% → 2.7%** (샌드위치 구조)
- 16 Gb 다이, 10 nm급 DRAM 프로세스
- **함의**: 위키 기존 전망(3D DRAM 상용화 2033~2034)을 앞당길 후보 아키텍처

### Samsung SF2 LPDDR6 PHY (Paper 37.3)
- 14.4 Gb/s, 2.32 mm 쇼어라인, 0.695 mm², 효율 모드 −39%/−29%, 클록 게이팅 −50%

**출처**: [semianalysis-isscc-2026-2026-04-15.md](../../sources/articles/semianalysis-isscc-2026-2026-04-15.md)

---

## [Update 2026-05-19 II] 권석준 — 메모리 5종 동시 폭증 (LPDDR·GDDR·KV 캐시 플래시 보강)

### AI DC 메모리 다양화

권 교수: 슈퍼사이클의 본질 = **5종 메모리 동시 폭증** (HBM + KV 캐시 메모리 + 플래시 + GDDR + LPDDR)

| 메모리 | 신규 용도 |
|---|---|
| **GDDR** | 추론(Inference) 가속 그래픽 메모리 — RTX·게이밍 외 AI 추론 |
| **LPDDR** | **온디바이스 AI** — 애플·삼성·구글 스마트폰·노트북 |
| **KV 캐시 플래시** | NVIDIA CMX 같은 KV 캐시 오프로드 |

### LPDDR + 신규 폼팩터 — 일본 폼팩터 실패 교훈

- 권석준: **일본 반도체가 망한 이유 중 하나 = 폼팩터 전환기를 놓침**
- 한국도 동일 위험 — 슈퍼사이클 정점에서 LPDDR·UFS 새 폼팩터 전환을 놓치면 동일 결과
- 애플 온디바이스 AI 진입 시 스마트폰 폼팩터 최적화 메모리 규격 폭풍 ([ssd-ufs-market.md](ssd-ufs-market.md) [Update 2026-05-19 II])

**출처**: [youtube-kwon-cycle-formula-2026-05-21.md](../../sources/articles/youtube-kwon-cycle-formula-2026-05-21.md), [youtube-kwon-agentic-ai-memory-2026-05-01.md](../../sources/articles/youtube-kwon-agentic-ai-memory-2026-05-01.md)
