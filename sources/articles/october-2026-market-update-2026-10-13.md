# 2026년 10월 시장 업데이트 — CoWoS·2nm 캐파 로드맵, TSMC 9월 매출, 4Q26 메모리 계약가, Counterpoint 2Q26 점유율, 전력 설비 리드타임

- **수집일**: 2026-10-13
- **이전 스냅샷**: 2026-07-04 ([july-2026-market-update-2026-07-04.md](july-2026-market-update-2026-07-04.md), 병목 모델 정기 점검)
- **유형**: 시장 데이터 묶음 (웹 검색 + 원문 일부 fetch)
- **수집 한계 (정직 표기)**:
  - SemiAnalysis: 2026-10 신규 게시물은 검색에서 확인되지 않음(검색된 것은 2023·2025년 글). 이번 갱신에 SemiAnalysis 직접 근거 없음.
  - TechInsights: HBM4 분해 보고서는 검색되지 않음. 최근 항목은 2026-06 SK hynix D1c DRAM 공정 분석(뉴스룸 목록) 정도.
  - Counterpoint: Memory Price Tracker Aug 2026(2026-08-07)은 구독 전용이라 본문 미확인. 점유율 표는 검색 스니펫 경유.
  - 4Q26 계약가는 TrendForce 원문이 아니라 중국어 2차 보도(IT Home → IFeng, 2026-09-30) — 원문 대조 필요.
  - 하이퍼스케일러 3Q26 실적(10월 말)·TSMC 3Q26 실적 콜(10월 중순)은 아직 발표 전.

---

## 1. 첨단 패키징·선단 로직 캐파 (TrendForce News, 2026-09-14)

출처: [TrendForce News 2026-09-14](https://www.trendforce.com/news/2026/09/14/news-tsmc-reportedly-targets-22-2nm-16-3nm-capacity-boost-by-mid-2027-cowos-to-double-by-2028/) (원 보도: Economic Daily News, Wccftech 경유)

| 항목 | 수치 |
|---|---|
| TSMC 2nm 월 캐파 | 2026말 9만 장 → 2027 중반 11만 장 (+22%) |
| TSMC 3nm 월 캐파 | 2026말 18만 장+ → 2027 중반 21만 장 (+16%+) |
| TSMC CoWoS 월 캐파 | 2026말 약 13만 장 → 2028말 26만 장 (2배), AP7(대만)·애리조나 중심 |
| Intel EMIB-T (CoWoS 환산) | 2027 1.5~2만 장 → 2028 4~4.5만 장 (애널리스트 추정) |
| TSMC 2026 CapEx 가이던스 | $60~64B (7월 콜), 70~80% 선단 공정 |

보조 검색 결과(2차): KGI(2026-03) 2027말 CoWoS 17만 장/월; TrendForce 계열 보도 2026말 11.5만~14만 → 2027 약 17만 장/월; Epoch AI 2026말 9~11만 장/월(2차 벤치마크 기반); TrendForce는 2.5D 패키징 부족이 2027년부터 완화될 것으로 전망(TSMC CoWoS 2027까지 60%+ 증설). 2027말 20만 장+ / 24~26만 장은 미검증 루머.

## 2. TSMC 월·분기 매출

출처: [Crypto Briefing 보도, TSMC 9월 매출](https://cryptobriefing.com/tsmc-september-revenue-16-billion-ai/) (2차)

- 2026-09 매출 NT$5,118.6억(약 $161억), YoY +54.6%, 전월(8월 NT$5,148.1억, 월 최고) 대비 -0.6%
- 3Q26 매출 NT$1.494조 — QoQ +17.6%, YoY +50.9%, 가이던스 상단($446~458억) 상회. 3Q 매출총이익률 가이던스 65~67%
- 2026년 매출 성장 가이던스 USD 기준 30%+ 상향. AI 가속기 매출 전망 2029까지 중반~후반 50% CAGR(1월 상향). 5/4nm·3nm 캐파 완판 지속
- J.P. Morgan 추정(2차): N2 매출 2026 $80억 → 2027 $360억
- 3Q26 실적 콜(10월)은 미발표 — 신규 가이던스 미확인

## 3. 메모리 가격·점유율

- **TrendForce 4Q26 계약가 전망** (2차, IFeng/IT Home 2026-09-30): 범용 DRAM +10~15% QoQ, HBM 포함 전체 DRAM +15~20%, NAND 전체 +15~20%. 3Q26은 범용 DRAM +13~18%·NAND +10~15%로 상승폭 둔화 추세 지속(2Q26 DRAM +58~63%·NAND +70~75%). 소비자 수요 약화·고기저 효과로 상승 폭 축소
- **Counterpoint DRAM·HBM 점유율 2Q26** ([Counterpoint Global DRAM and HBM Market Share](https://counterpointresearch.com/insights/global-dram-and-hbm-market-share), [Malaysian Wireless 보도](https://www.malaysianwireless.com/2026/08/samsung-global-dram-market-q2-2026/)):
  - DRAM 매출 점유율: 삼성 38~39%(1위) · SK hynix 25~26% · Micron 24~25% · CXMT 10% (두 출처 간 1pt 차이, 미조정)
  - HBM 점유율: SK hynix 50% · 삼성 33% · Micron 18% (SK hynix 2Q25 64% → 하락; 삼성 HBM4 출하와 함께 점진 상승 전망)
  - Counterpoint Memory Price Tracker Aug 2026: 모바일 DRAM 3Q26 약 +10% QoQ, 내년 HBM이 메모리 매출 핵심 축 (스니펫 수준)
- **HBM4 동향** (2차): 삼성 2026-02 HBM4 상용 출하 개시(11.7Gbps, 1c DRAM, 수율 2026-04 60% 미만 추정 보도와 80% 목표 근접 보도 병존), SK hynix 16-Hi HBM4 CES 2026 공개. 2026-04 ZDNet: Rubin 지연으로 SK hynix HBM4 출하 20~30% 하향 조정 보도

## 4. 하이퍼스케일러 CAPEX·신용

출처: [DCD — Moody's 하이퍼스케일러 CAPEX 상향](https://datacenterdynamics.com/en/news/moodys-hyperscaler-capex-forecasts-marked-up-by-85bn-to-close-in-on-1trn-by-2027/), [Nvidia CFO 발언 보도](https://cryptobriefing.com/nvidia-cfo-cloud-backlog-2-trillion-capex-2027/), [Seeking Alpha — Goldman](https://seekingalpha.com/news/4501906-us-hyperscalers-capex-to-almost-triple-to-14t-by-2027-goldman-sachs-says)

- 빅4(MS·Alphabet·Amazon·Meta) 2Q26(6월 분기) 합산 CapEx $1,660억, YoY +87%
- 2026 가이던스: MS 약 $190B(+61%, 부품가 상승 $25B 포함) · Alphabet $180~190B · Amazon 현금 CapEx 약 $220B(7월 시점 $200B에서 상향) · Meta $125~145B
- 2027: Alphabet CFO "2026 대비 유의미 증가". 서드파티 추정 — Evercore·BofA 합산 $1조+, Nvidia CFO 하이퍼스케일러 $1.3조(범위 넓음), Goldman 미국 하이퍼스케일러 $1.4조(2027), Moody's 약 $1조(Oracle·CoreWeave 포함)
- 신용: Penn Mutual(2026-08-06) — 데이터센터 HY 채권의 광의 HY 대비 프리미엄이 2025-12 약 220bp에서 2026 상반기 크게 압축, AI 연계 부채 2024 이후 $4,500억+. 기존 위키 원장([macro-reassessment-signals-2026-10-13.md](macro-reassessment-signals-2026-10-13.md))의 Nvidia·Oracle CDS 확대와 병존 — 발행 프리미엄은 압축, 개별 신용 tell은 확대. 2026-10 시점 HY OAS 직접 수치는 미확인(07-04 값 285bp 유지 가정)

## 5. 전력 설비·계통

출처: [Data Center Knowledge — Wood Mackenzie 인용](https://datacenterknowledge.com/energy-power-supply/why-ai-data-center-projects-face-years-of-delays-after-approval), [Carbon Direct](https://www.carbon-direct.com/press/carbon-direct-releases-new-analysis-of-power-grid-interconnection-queues-pjm-ercot)

- 변전소 변압기 리드타임: 2023 약 140주 → 2025 약 150주 → 2026 160주+ (Wood Mackenzie). 일부 고압 변압기 36~48개월 견적. (07-04 원장의 "최대 5년"은 최악 사례, 평균은 약 3년+)
- PJM 인터커넥션 평균 약 40개월(Carbon Direct), 데이터센터 부하 증가 구역 36~48개월. 큐 규모는 출처별 편차 큼(60GW~643GW) — 권위 수치 아님
- ERCOT 2031 피크 수요 전망 약 145GW(2024 85GW 대비)
- 2026-10 시점 PJM·ERCOT 공식 큐 신규 발표는 미확인

## 6. 병목 제약지수 판독 요약 (이 원장 기준)

| 병목 | 방향 | 핵심 근거 |
|---|---|---|
| 전력 | 소폭 악화 | 변압기 160주+·인터커넥션 36~48개월 지속, 완화 신호 없음 |
| CAPEX/ROI | 소폭 악화 | 2026·2027 CapEx 추가 상향(수요 강), 그러나 개별 신용 tell 확대·CapEx/현금흐름 압박 — 하방 민감도 증가 |
| 파운드리 | 소폭 악화 | TSMC 매출 호조로 3nm 완판 지속, 2nm 2026말 9만 장(위키 기준 ~10만 장보다 소폭 낮음), 증설 폭 +16~22%로 완만 |
| 패키징 | 완화 | CoWoS 2026말 13만 → 2028말 26만, TrendForce 2027 부족 완화 전망. 단 하이브리드본딩·CoPoS 지연은 07-04와 동일 |
