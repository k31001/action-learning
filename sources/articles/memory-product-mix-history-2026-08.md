# 메모리 제품별 매출 시계열과 비동기 사이클 — 수집 원본 (2026-08)

수집일: 2026-08-12 · 수집 목적: 제품 포트폴리오(HBM·범용 DRAM·NAND)의 믹스 변화와 사이클 비동기성 실측 확보

> 원본 보존 문서. 수집한 수치와 출처 URL만 기록하고 해석은 wiki에서 한다.

---

## 1. DRAM 연간 매출 (TrendForce)

| 연도 | 매출 | YoY | 출처 |
|---|---|---|---|
| 2023 | 약 $518억 (역산) | — | 2024년 $907억 · +75% YoY에서 역산 |
| 2024 | $907억 | +75% | TrendForce |
| 2025 | $1,657억 | +73% | TrendForce |
| 2026E | $4,043억 | +144% | TrendForce (2026-01 전망) |

## 2. NAND Flash 연간 매출 (TrendForce)

| 연도 | 매출 | YoY | 출처 |
|---|---|---|---|
| 2023 | 약 $381억 (역산) | — | 2024년 $674억 · +77% YoY에서 역산 |
| 2024 | $674억 | +77% | TrendForce |
| 2025 | $697억 | **+3.4%** | TrendForce |
| 2026E | $1,473억 | +112% | TrendForce (2026-01 전망) |

## 3. HBM이 DRAM 매출에서 차지하는 비중

| 연도 | 비중 | 비고 | 출처 |
|---|---|---|---|
| 2023 | **8%** | — | TrendForce 인용 보도 |
| 2024 | **20%** (비트 기준으로는 5%) | 매출 20% / 비트 5% — 단가 프리미엄 | TrendForce |
| 2025 | 약 20~21% | HBM 약 $340억 / DRAM $1,657억 | Yole Group · TrendForce |
| 2026E | **41%** | — | TrendForce 인용 보도 |
| 2030E | DRAM 매출의 50% 이상 | 33% CAGR 전망 | Yole Group |

## 4. 사이클 비동기성 실측

- **2025년 (연간)**: DRAM +73% vs NAND **+3.4%** — 같은 해에 한 제품군은 거의 두 배, 다른 제품군은 사실상 정체.
- **2024년 4분기 (분기)**: DRAM 매출 +9.9% QoQ 상승 국면에 NAND 매출은 **−6.2% QoQ** 하락, 2025년 1분기에는 추가 −20% 전망. 같은 분기, 반대 방향.
- **2023년**: DRAM 모듈 매출 −28% (팬데믹 이후 소비자 재고 조정). NAND는 PC·스마트폰 재고 소진이 2024년 말까지 이어지며 하강이 더 길게 지속.
- **2027년 전망**: AI 서버 풀인이 DRAM 공급 갭을 확대하는 반면, NAND는 소비자 수요 약세 + 비트 산출 증가로 가격 하방 압력 — **DRAM과 NAND의 수급이 서로 갈라질 것**으로 전망.
- **2026년 2분기 NAND 전망**: 하반기로 갈수록 공급-수요 구조가 느슨해지며 가격 조정 압력 — DRAM과 명확히 구분되는 사이클.

## 5. DRAM 응용처별 비중 (참고)

- 2023년 비트 산출: 서버 DRAM 약 37.6%, 모바일 DRAM 약 36.8% — 서버가 모바일을 처음으로 추월.
- 2023년 매출 기준: 모바일 응용이 44% 이상으로 최대, PC·노트북 26.5%.
- 모바일 DRAM 내 LPDDR5/5X 비트 비중: 2024년 50% → 2025년 60% 전망.

---

## 원본 링크

- TrendForce, "AI Architecture Evolution Set to Drive Memory Market Revenue to a New Peak in 2027, with Annual Growth Exceeding 50%" (2026-01-22) — https://www.trendforce.com/presscenter/news/20260122-12893.html
- TrendForce, "Memory Price Outlook for 1Q26 Sharply Upgraded; QoQ Increases of All Product Categories to Hit Record Highs" (2026-02-02) — https://www.trendforce.com/presscenter/news/20260202-12911.html
- TrendForce, "Price Rally Drives 4Q25 DRAM Revenue Up 29.4%; Samsung Regains No. 1 Market Share" (2026-02-26) — https://www.trendforce.com/presscenter/news/20260226-12937.html
- TrendForce, "AI Server Storage Demand Surges; Top Five NAND Flash Suppliers Post 23.8% QoQ Revenue Growth in 4Q25" (2026-03-03) — https://www.trendforce.com/presscenter/news/20260303-12943.html
- TrendForce, "Combined Revenue of Top Five Global NAND Flash Suppliers Rose by 83.7% QoQ for 1Q26" (2026-05-25) — https://www.trendforce.com/presscenter/news/20260525-13058.html
- TrendForce, "Memory Industry Revenue Expected to Reach Record High in 2025 Due to Increasing Average Prices and the Rise of HBM and QLC" (2024-07-22) — https://www.trendforce.com/presscenter/news/20240722-12228.html
- TrendForce, "Weak Consumer Demand Leads to 28% Decline in DRAM Module Revenue in 2023" — https://www.trendforce.com/presscenter/news/20241107-12352.html
- Tom's Hardware, "The NAND market faced a 6.2% revenue loss in Q4 24 — forecast projects a further 20% hit in Q1 25" — https://www.tomshardware.com/pc-components/ssds/the-nand-flash-market-faced-a-6-2-percent-revenue-loss-in-q4-24-forecast-projects-a-further-20-percent-hit-in-q1-25
- EE Times Asia, "TrendForce: 4Q 2024 DRAM Industry Revenue up Nearly 10% QoQ" — https://www.eetasia.com/trendforce-4q-2024-dram-industry-revenue-up-neawly-10-qoq/
- Statista, "Global share of HBM in DRAM market worldwide 2023-2025" — https://www.statista.com/statistics/1465669/hbm-share-of-dram-market-worldwide/
- Counterpoint Research, "Global DRAM and HBM Market Share: Quarterly" — https://counterpointresearch.com/en/insights/global-dram-and-hbm-market-share

---

*수집 방법: 웹 검색(2026-08-12). 2023년 DRAM·NAND 절대액은 직접 공시가 아니라 이듬해 매출과 YoY 증가율에서 역산한 값이므로 소수점 단위 정확도는 보장하지 않는다. 2026E는 TrendForce 2026-01 전망치이며 실측이 아니다.*
