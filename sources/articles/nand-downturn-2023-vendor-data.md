# 2023 NAND 다운턴 벤더별 데이터 — 웹 리서치 종합 (2026-08-05)

**수집일**: 2026-08-05
**유형**: 웹 검색 기반 2차 자료 종합 (TrendForce 분기 발표·기업 공시·보도)
**용도**: [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §2.5 — 2023 다운턴 복기(배경 슬라이드 데이터 기반)

---

## §1. 벤더별 NAND 매출: 피크(2Q22) → 저점(1Q23)

- **2Q22 (피크)**: 산업 전체 $18.12B (+1.1% QoQ). 삼성 점유 35.3% (≈$6.40B), SK그룹(SK하이닉스+Solidigm) $3.61B, Kioxia $2.83B, WDC $2.40B (TrendForce, evertiq 재보도)
- **1Q23 (저점)**: 산업 전체 $8.63B (-16.1% QoQ, 5개 분기 연속 하락 후 저점). 삼성 $2.93B, Kioxia $1.85B, SK그룹 $1.32B, WDC $1.31B, Micron $0.89B (TrendForce 2023-06-01)
- **피크→저점 낙폭 (계산)**: 산업 -52% · SK그룹 **-63%** · 삼성 **-54%** · WDC **-45%** · Kioxia **-35%** (Micron은 회계분기 매핑 차이로 계산 제외)
- **핵심 방증**: **SSD의 매출 기여가 4Q22 50%+ → 1Q23 20~25%로 붕괴** (TrendForce) — 하락의 진앙이 서버·클라이언트 SSD였음을 직접 보여줌
- 참고: 4Q23 반등기 점유 — 삼성 36.6%, SK그룹 21.6%, WDC 14.5%, Kioxia 12.6%, Micron 9.9% (산업 $11.49B, +24.5% QoQ)

## §2. 노출(포트폴리오·고객 믹스) 프록시 — Enterprise SSD 점유 (4Q22)

- 4Q22 enterprise SSD 시장 $3.79B로 급감 (TrendForce 2023-03-06)
- 점유: **삼성 46.9%** ($1.78B, 1위 — 서버 노출 최대) · SK그룹 19.0% ($720M) · Kioxia ~13% ($491M)
- 삼성은 3Q21에 세계 enterprise SSD 절반 이상 출하 (Blocks & Files 2022-01-06) — 다운턴 진입 시 서버·하이퍼스케일러 노출이 가장 컸음
- 대비: Kioxia는 스마트폰(UFS)·컨슈머 비중, WDC(SanDisk)는 리테일·클라이언트 비중이 커 서버발 충격이 상대적으로 얕았음(§1 낙폭 순위와 정합)
- SK그룹 낙폭(-63%)이 가장 깊은 이유: 서버 100%인 Solidigm 포함 — 서버 노출이 클수록 깊게 맞았다는 명제의 극단 사례

## §3. 하이퍼스케일러 CAPEX 2021~2023 — 총량이 아니라 재배분

- 연간 CapEx (각사 10-K, $B): **Amazon 61.1 → 63.6 → 52.7** (2023 창사 최초 감소, Platformonomics 집계) · **Meta 19.2 → 31.4 → 28.1** · **Alphabet 24.6 → 31.5 → 32.3**
- 2023 글로벌 서버 출하는 감소 (TrendForce: 2023 하향, 2024 +2.05% 회복 전망·AI 서버 비중 12.1%)
- 반면 **AI 서버 시장은 2023 ~$50B**로 급성장, **서버 시장 가치의 ~23%** 차지 (TrendForce 재인용, GIGALIGHT) — AI 서버 대당 가격은 일반 서버의 15~20배
- 독해: 2023 다운턴은 CapEx 총량 붕괴가 아니라 **일반 서버·스토리지 → AI 인프라로의 재배분**. 일반 서버향 메모리·SSD 수요만 급감

## §4. Solidigm의 반증 — 다변화가 아니라 니즈 적중

- 다운턴 최심부였던 SK그룹(Solidigm 포함, 낙폭 -63%)의 Solidigm이 **2023-07 세계 최대 용량 61.44TB QLC SSD(D5-P5336) 출시** (TechPowerUp 2023-07) — AI 학습·추론용 고용량 저전력 스토리지 수요를 정조준
- QLC 밀도 리더십: 2018년 이후 QLC 제품 **100EB+ 출하** (Solidigm), 이후 122TB로 확장
- 2024 AI 데이터센터 eSSD 수요 급증의 최대 수혜로 **흑자 전환** (SK하이닉스 2024 실적 발표·복수 보도) — 서버 SSD 비중이 높았음에도 제품을 니즈에 적중시켜 회복
- 교훈: 포트폴리오 다변화(방어)가 아니라 **변화하는 고객 니즈에 제품을 적중(공격)**시키는 것이 다운턴 극복의 결정 변수

## 원본 링크

- TrendForce 1Q23 NAND: https://www.trendforce.com/presscenter/news/20230601-11698.html
- TrendForce 4Q22 enterprise SSD: https://www.trendforce.com/presscenter/news/20230306-11591.html
- TrendForce 4Q23 NAND: https://www.trendforce.com/presscenter/news/20240306-12063.html
- TrendForce 2024 서버 출하 전망: https://www.trendforce.com/presscenter/news/20240229-12048.html
- evertiq 2Q22 NAND: https://evertiq.com/news/52415
- Blocks & Files enterprise SSD: https://blocksandfiles.com/2022/01/06/samsung-increasingly-dominates-enterprise-ssd-market-as-intel-fades/ · https://blocksandfiles.com/2023/03/06/enterprise-ssd-q4-2022/
- Platformonomics Follow the CAPEX: https://platformonomics.com/2025/02/follow-the-capex-cloud-table-stakes-2024-retrospective/
- GIGALIGHT AI 서버 시장 2023: https://www.gigalight.com/news-events/insights-7829.html
- TechPowerUp Solidigm D5-P5336: https://www.techpowerup.com/311603/solidigm-introduces-d5-p5336-the-worlds-highest-capacity-pcie-ssd
- Counterpoint NAND 분기 점유: https://counterpointresearch.com/en/insights/global-nand-memory-market-share
