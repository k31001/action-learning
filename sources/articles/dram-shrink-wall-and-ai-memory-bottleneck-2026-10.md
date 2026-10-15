# DRAM 미세화 장벽 · 후발 추격 · AI 추론 메모리 병목 — 슬라이드 근거 원장 (2026-10-14)

**수집일**: 2026-10-14
**유형**: 웹 검색 + 레포 기존 소스 재인용 종합
**용도**: "DRAM 기술 경쟁력 제고를 위한 차별화 준비: 현실 파악" 1장(3안) 슬라이드의 차트 근거

**주의**
- 노드 half-pitch(nm)는 **업계 선두의 주력 양산 노드 근사값**이다. 10nm급(1x 이후)은 업체마다 명명과 실제 셀 피치가 달라 한 숫자로 대표할 수 없다. 추세(기울기) 읽기용이며, 개별 노드 비교용이 아니다.
- 2027~2030은 로드맵 전망(TechInsights)이다. 실측이 아니다.
- KV 총수요 산술은 본 원장의 파생 계산이다(⚠️ 산술 · 가정 표기).

---

## §1. DRAM 주력 양산 노드 추이 (업계 선두, half-pitch 근사)

| 연도 | 노드(근사 nm) | 비고 | 근거 |
|---|---|---|---|
| 2000 | 180 | 0.18µm | ITRS 1999/2001 DRAM half-pitch 표, 업체 양산 발표 |
| 2001 | 150 | | 동 |
| 2002 | 130 | | 동 |
| 2003 | 110 | | 동 |
| 2004 | 90 | | 동 |
| 2005 | 80 | | 동 |
| 2006 | 68 | | 동 |
| 2007 | 60 | 60nm급. 6F² 셀 레이아웃 도입 이후 유지 | 동, [logic-paradigm-shifts-3d-dram-2026-08.md](logic-paradigm-shifts-3d-dram-2026-08.md) |
| 2008 | 50 | 50nm급 | 동 |
| 2009 | 44 | 40nm급 | 동 |
| 2010 | 35 | 30nm급 | 동 |
| 2011 | 29 | 2x nm | 동 |
| 2013 | 25 | 2y nm | 동 |
| 2014 | 20 | 20nm | 동 |
| 2016 | 18 | 1x | TechInsights |
| 2018 | 17.1 | 1y (Samsung D/R 17.1nm) | [TechInsights D1z LPDDR5 분석](https://www.techinsights.com/blog/samsung-d1z-lpddr5-dram-euv-lithography-euvl-memory-techstream-blog) |
| 2019 | 15.7 | 1z (Samsung D/R 15.7nm, 1y 대비 -8.2%) | 동 |
| 2021 | 14 | 1a, EUV 도입 | [dram-technology.md](../../wiki/concepts/dram-technology.md) |
| 2023 | 12.5 | 1b | 동 |
| 2025 | 11.5 | 1c (SK hynix 1c DDR5, Samsung 1c HBM4 코어) | 동, [TechInsights SK hynix D1c 2026-04](https://www.techinsights.com/ko/node/61364) |
| 2027E | 10.5 | 1d / 1δ, 10nm급 마지막 | [TechInsights DRAM Roadmap Q2 2024](https://www.techinsights.com/ja/node/57790) |
| 2030E | 9 | 0a (4F² · VCT · 하이브리드 본딩) | 동, TechInsights "6F²는 1d까지" ([logic-paradigm-shifts-3d-dram-2026-08.md](logic-paradigm-shifts-3d-dram-2026-08.md)) |

**파생 (⚠️ 산술)**
- 로그 회귀(연도 vs log10 nm) 기울기: 2000~2011 **연 -14.9%**, 2013~2025 **연 -5.7%** (슬라이드 표기 -15% → -6%). 양 끝점 CAGR로는 -15.3% / -6.3%.
- 새 노드 수: 2000~2011 12년간 12개(약 **1년에 1개**), 2013~2025 13년간 8개(약 **1.6년에 1개**).
- 반감 시간: 약 4.3년 → 약 11.8년(회귀 기울기 기준).
- 교차 확인: "DRAM 비트 밀도는 전성기에 18개월마다 2배였으나 최근 10년간 2배"([logic-paradigm-shifts-3d-dram-2026-08.md](logic-paradigm-shifts-3d-dram-2026-08.md)).

## §2. 2026년 업체별 노드 위치

| 업체 | 2026 위치 | 근거 |
|---|---|---|
| Samsung | 1c 양산(HBM4 코어 1c), 1d 개발 | Fab Tracker Q2'26 "volume at 1c in 2026" ([PDF](https://s29.q4cdn.com/619069826/files/doc_downloads/fab_tracker/2026/Aug/Fab-Tracker-Q226.pdf)), [semianalysis-isscc-2026-2026-04-15.md](semianalysis-isscc-2026-2026-04-15.md) |
| SK hynix | 1b 주력, 1c 램프(D1c DDR5 16Gb) | Fab Tracker Q2'26, [TechInsights 2026-04](https://www.techinsights.com/ko/node/61364) |
| Micron | 1γ(1-gamma, EUV 첫 적용, 1β 대비 비트 밀도 +30%+) | [Micron IR](https://investors.micron.com/news-releases/news-release-details/micron-announces-shipment-1g-1-gamma-dram-pioneering-memory) |
| CXMT 궤적(슬라이드 점선) | 2019 19nm(첫 양산, DDR4) → 2023 G3 18nm → 2025 G4 16nm → 2026 말 G5 15nm 목표 | 2019 19nm: CXMT 양산 발표 보도(2019-09, Reuters 등), 이후: 아래 행 |
| CXMT | G4 16nm(첫 DDR5, 1z급) 양산·전환, G5 15nm 2026 말 양산 목표, DUV 다중 패터닝 | [hybrid-bonding-structures-china-limits-2026-08.md](hybrid-bonding-structures-china-limits-2026-08.md) §4-2 (Digitimes 2025-02-13), Fab Tracker Q2'26 "volume 1y, ramp 1z" |
| CXMT 캐파 · 점유율 | 약 30만 → 35만 wpm(2026 말), Micron 약 37.5만 wpm. 점유율 Q3'25 8% → 2026E 10%, 2030 30% 목표 | 동 §4-1 (SemiAnalysis, Counterpoint, Tom's Hardware) |

## §3. AI 추론 메모리 수요 (레포 기존 소스 재인용)

| ID | 내용 | 값 | 출처 |
|---|---|---|---|
| K-1 | 토큰당 KV(BF16): Llama 3.1 8B / 70B / 405B / DeepSeek-V3(MLA) | 128 / 320 / 504 / 68.6 KiB | [datacenter-types-storage-requirements-2026-10.md](datacenter-types-storage-requirements-2026-10.md) DT-30 (⚠️ 파생, 설정 파일 원문) |
| K-2 | 70B GQA는 KV 헤드 8(쿼리 헤드 64) → MHA였다면 8배인 2.5 MiB/token | ÷8 | 동 DT-30 산식 |
| K-3 | 요청 1건 KV(70B급): 채팅 1,632토큰 0.53GB, 에이전트 67,818토큰 22.2GB, 1M 컨텍스트 327.7GB | | 동 DT-33 · DT-45 · DT-31 |
| K-4 | Google 월간 처리 토큰 9.7조(2024-05) → 480조(2025-05) → 3,200조(2026-05) | YoY 약 7배 | [qlc-v6-inflection-2028-demand-path-2026-09.md](qlc-v6-inflection-2028-demand-path-2026-09.md) B-30 |
| K-5 | Micron: 장문맥 KV ≈ 토큰당 300~350KB | | 동 B-20 |
| K-6 | 가속기 1개 HBM 288GB (TPU 8i) | | DT-35 |
| K-7 | PagedAttention(vLLM): 기존 시스템은 KV 메모리의 60~80%를 단편화로 낭비, vLLM은 4% 미만. 처리량 2~4배 | | Kwon et al., SOSP 2023 ([arXiv 2309.06180](https://arxiv.org/abs/2309.06180)) |
| K-8 | 에이전트 세션 KV 캐시 재사용 85.7% (prefix caching 대리 지표) | | datacenter-types DT-42 |
| K-9 | DeepSeek V4.1-Flash 토큰당 KV 890B | 🟡 | 동 C-40 |
| K-10 | TrendForce(2026-07-30): DRAM 공급 충족률 2026 -1~-2%, 2027 격차 확대. 신규 팹 램프 2H27, 실질 출하 기여 2028 | | [TrendForce Press Center 2026-07-30](https://www.trendforce.com/presscenter/news/20260730-13158.html) |
| K-12 | Google Next '26: "Automatic KV Cache storage tiering across RAM, Local SSD, and Google Cloud Storage/Lustre" | | datacenter-types DT-34 |
| K-11 | HBM 비트 비중(총 DRAM 비트 중) 8%(2025) → 9%(2026) → 13%(2027). HBM은 비트당 웨이퍼 투입이 커 웨이퍼 증가가 비트 증가로 비례하지 않음 | | 레포 wiki 인용, TrendForce 동 보도 |

**파생 (⚠️ 산술 · 가정)**
- 월간 KV 생성량 = 320 KiB × 3.2×10¹⁵ 토큰 ≈ **1.05 ZB/월** (B-35와 동일 차수. 생성량 상한이며 저장 수요가 아님).
- 초당 토큰 = 3.2×10¹⁵ ÷ (30 × 86,400) ≈ 1.23×10⁹ 토큰/s.
- 상주 KV(Little's law, 가정: 토큰이 HBM에 머무는 시간 T): T = 60초 → 약 24 PB, T = 5분 → 약 121 PB. 288GB 가속기 환산 약 8.4만 개 / 42만 개 분량.
- 알고리즘 절감 계단(토큰당 KV, 70B급 기준): MHA BF16 2,560 KiB → GQA 320 → FP8 160 → FP4 80 KiB. 구조 교체(MLA, 671B) 68.6 KiB.
- 배수 비교(슬라이드 시안 B, 요인별·곱하지 않음): 줄이는 쪽 GQA ÷8(KV 헤드 64→8), MLA ÷7.3(405B GQA 504 → 68.6 KiB), FP4 ÷4(BF16 대비), PagedAttention ÷3.2(유효 KV 메모리 30% → 96%) / 늘리는 쪽 모델 ×3.9(8B → 405B KV/토큰), 문맥 ×128(8K → 1M), 토큰 ×330(Google 2024-05 → 2026-05).
