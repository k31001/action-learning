# 데이터센터 SSD 출시 제품의 정격 DWPD 데이터 원장 (2008~2026, 6개 업체 226개 등급)

**수집일**: 2026-10-07
**유형**: 웹 데이터 원장 (Research Agent 2개: ① Samsung · SK hynix · Kioxia/Toshiba, ② Intel/Solidigm · Micron · WD/HGST/SanDisk). 해석 없음.
**용도**: 고객 협력 전략 덱 3장 계단 위 점도표. 사용자 지시(2026-10-07): "여러 그래프 그리지 말고 DWPD 그래프 하나로 … 지난 십수 년간 출시한 SSD들에 대하여 DWPD 값이 어떻게 변화해 왔는지 조사를 해서 점도표로 표현을 해 줘. 기업별로 점의 색을 구분하거나 하면 더 보기 편하겠다."
**접근 한계**: 프록시가 업체 · 리뷰 도메인(intel.com, solidigm, micron, sandisk, kioxia, toshiba, skhms, samsung, storagereview, anandtech, lenovopress, theregister 등)의 원문 열람을 막았다. **✅ 없음.** 🟡 = 검색 스니펫(업체 페이지 · 리뷰 · 유통), ⚠️ = TBW · PBW · 보증 기간으로 계산한 값 또는 출처 간 충돌.
**점도표 데이터**: [outputs/presentation/assets/essd_dwpd_points.json](../../outputs/presentation/assets/essd_dwpd_points.json) (업체, 연도, 5년 기준 DWPD, 특수 여부, 제품)

## 0. 정규화 규칙 (점도표에 찍은 값)

1. **5년 보증 기준**: 3년 보증 제품은 DWPD × 3 ÷ 5로 환산(Intel X25-E 28.5 → 17.1, SSD 710 3.3 → 2.0, Samsung PM853T 0.3 → 0.18, PM863 · PM863a · PM883 · PM963 · PM983 1.3 → 0.78, SK hynix SE3010 0.5 → 0.3).
2. **QLC · 용량형은 랜덤 쓰기 기준**(순차는 3~5배 높음). 랜덤 블록 크기는 제품마다 다름(P5316 64K, P5336 32K, 6550 · 6600 ION 16K, 6500 ION 4K).
3. **등급(티어)마다 한 점**: RI / MU / WI 변형을 각각 찍는다. 같은 해 · 같은 업체 · 같은 값은 겹쳐 보인다.
4. **연도**: 대부분 발표 연도(출하 · GA가 다르면 표에 병기).
5. **특수 제품 표시**: SLC · Z-NAND · XL-FLASH · 3D XPoint는 빈 점(14개). 중앙값 · 비중 계산에서 제외.
6. **대표값**: 용량별로 다른 제품은 대표값(P4510 1, 5300 PRO 1.5, 7300 PRO 1.1, 5100 PRO 2, P5336 0.58), 공칭 "최대 2" · ">1"은 공칭값.
7. **제외**: 수치가 없는 행(Toshiba MKx001GRZB 200 · 400GB "무제한", CD5 · XD5 "<1", SK hynix SE5110 · SE5031 연도 미확인), 중복(SK hynix 브랜드 PS1010 = Solidigm D7-PS1010).

## 1. Samsung

| 제품 (등급) | 연도 | NAND / 클래스 | IF | 정격 DWPD (보증) | 점 | 등급 · 출처 |
|---|---|---|---|---|---|---|
| SM825 | 2011 | eMLC WI | SATA | ~9.6 (400GB 7,000TBW, 5년 가정) | 9.6 | ⚠️ storagereview.com/review/samsung-ssd-sm825-enterprise-ssd-review |
| SM843 | 2012 | MLC | SATA | 1 (랜덤, 순차 4) | 1 | 🟡 thessdreview.com/our-reviews/samsung-843 |
| SM1625 | 2012 | eMLC WI | SAS | 10 | 10 | 🟡 storagenewsletter.com/?p=126844 |
| SM843T | 2013 | MLC | SATA | 1.8 (OP 확대 시 5.4) | 1.8 | 🟡 news.samsung.com |
| 845DC PRO / EVO | 2014 | V-NAND MLC / 평면 TLC | SATA | 10 / 0.35 | 10 · 0.35 | 🟡 storagereview · tweaktown |
| PM853T | 2014 | 평면 TLC RI | SATA | 0.3 (3년) | 0.18 | 🟡/⚠️ tweaktown 6695 |
| SM1715 | 2014 | V-NAND MLC | NVMe | 10 | 10 | 🟡 storagereview |
| XS1715 | 2014 | MLC | NVMe | 5.6 | 5.6 | 🟡 (성장 원장 GR-74) |
| PM1725 | 2015 | TLC | NVMe | 5 | 5 | 🟡 |
| SM863 | 2015 | MLC MU | SATA | 3.5 | 3.5 | 🟡 |
| PM863 | 2015 | TLC RI | SATA | 1.3 (3년) | 0.78 | 🟡/⚠️ |
| PM1633a / PM1635a | 2016 | 48L TLC RI / MU | SAS | 1 / 3 | 1 · 3 | 🟡 news.samsung.com/us/?p=6481 · storagereview |
| PM863a | 2016 | TLC RI | SATA | 1.3 (3년) | 0.78 | 🟡 lenovopress lp0589 |
| SM863a | 2016 | MLC MU | SATA | ~3.5 (12,320TBW 계산) | 3.5 | ⚠️ |
| PM963 | 2016 | TLC RI | NVMe | 1.3 (3년) | 0.78 | 🟡 |
| PM1725a | 2017 | TLC | NVMe | 5 | 5 | 🟡 |
| PM1725b | 2018 | TLC | NVMe | 5 | 5 | 🟡 |
| PM883 / SM883 | 2018 | TLC RI / MLC MU | SATA | 1.3 (3년) / 3 | 0.78 · 3 | 🟡 cdw · semiconductor.samsung.com |
| 860 DCT / 883 DCT / 983 DCT | 2018 | TLC | SATA / SATA / NVMe | 0.2 / 0.8 / 0.8 | 0.2 · 0.8 · 0.8 | 🟡 anandtech 13322 |
| 983 ZET | 2018 | Z-NAND (SLC) | NVMe | 10 (960GB) / 8.5 (480GB) | 10 (빈 점) | 🟡 anandtech 13951 |
| SZ985 (Z-SSD) | 2018 | Z-NAND (SLC) | NVMe | 30 | 30 (빈 점) | ✅(기존 원장 A07) |
| PM1643 / PM983 | 2018 | TLC RI | SAS / NVMe | 1 / 1.3 (3년) | 1 · 0.78 | ✅(A08) / 🟡 |
| PM1645a / PM1643a | ~2019 | TLC MU / RI | SAS | 3 / 1 | 3 · 1 | 🟡 (연도 미검증) |
| PM1733 / PM1735 | 2019 | TLC RI / MU | NVMe Gen4 | 1 / 3 | 1 · 3 | ✅(A09) |
| SZ1735a | 2020 | Z-NAND (SLC) | NVMe Gen4 | 30 | 30 (빈 점) | 🟡 Samsung 브로셔 |
| BM1733 | 2020 | QLC | NVMe | 0.18 | 0.18 | 🟡 |
| PM9A3 | 2020 | TLC RI | NVMe | 1 (2020 기사 1.3과 충돌) | 1 | 🟡/⚠️ |
| PM1653 | 2021 | 128L TLC RI | SAS 24G | 1 | 1 | 🟡 |
| PM893 / PM897 | 2021 | TLC RI / MU | SATA | 1 / 3 | 1 · 3 | 🟡 |
| PM1743 / PM1745 | 2022 (2021-12 발표) | TLC RI / MU | NVMe Gen5 | 1 / 3 | 1 · 3 | 🟡 |
| PM9D3a | 2023 | TLC RI | NVMe Gen5 | 1 (30.72TB 0.9) | 1 | 🟡 |
| PM1753 / PM1755 | 2024 | TLC RI / MU | NVMe Gen5 | 1 / 3 | 1 · 3 | 🟡 |
| BM1743 | 2024 | QLC | NVMe | 0.26 | 0.26 | 🟡 |
| PM1763 | 2026 | V9 TLC RI | NVMe Gen6 | 1 | 1 | 🟡 ampinc · ddaily |

## 2. Intel → Solidigm

| 제품 (등급) | 연도 | NAND / 클래스 | 정격 DWPD (보증) | 점 | 등급 · 출처 |
|---|---|---|---|---|---|
| X25-E | 2008 | SLC WI | 28.5 (3년) | 17.1 (빈 점) | ⚠️ thomas-krenn.com |
| SSD 710 | 2011 | HET-MLC | 3.3 (3년) | 2.0 | ⚠️ storagereview |
| SSD 910 / DC S3700 | 2012 | HET-MLC WI | 10 / 10 | 10 · 10 | 🟡 intc.com · storagereview |
| DC S3500 | 2013 | MLC RI | 0.3 (450TB/800GB 계산) | 0.3 | ⚠️ |
| DC P3700 / P3600 / P3500 | 2014 | MLC WI / MU / RI | 10 / 3 / 0.3 | 10 · 3 · 0.3 | 🟡/⚠️ |
| DC P3700 재정격(1.6 · 2TB, LDPC) | 2015 | MLC WI | 17 | 17 | 🟡 tomshardware |
| DC S3510 / S3610 / S3710 | 2015 | MLC | 0.3 / 3 / 10 | 0.3 · 3 · 10 | 🟡 servethehome |
| DC S3520 / P3520 | 2016 | 3D MLC RI | 1 / 1 (P3520 계산 0.68 · 기사 3과 충돌) | 1 · 1 | 🟡/⚠️ |
| DC S4500 / S4600 | 2017 | 3D TLC RI / MU | 1 / 3 | 1 · 3 | 🟡 lenovopress LP0754 |
| DC P4500 / P4600 | 2017 | 3D TLC | 0.7 / 2.9 (랜덤) | 0.7 · 2.9 | 🟡 computerbase |
| Optane DC P4800X | 2017 / 2018 | 3D XPoint | 30 (5년 재표기) / 60 SKU | 30 · 60 (빈 점) | ⚠️/🟡 lenovopress lp0770 |
| DC P4510 / P4610 | 2018 | 64L TLC RI / MU | 0.7~1.1 / 3 | 1 · 3 | 🟡 |
| D3-S4510 / S4610 | 2018 | 64L TLC | 최대 2 / 3 | 2 · 3 | 🟡 |
| D5-P4320 / D5-P4326 | 2018 / 2019 | 64L QLC | 0.2 / 0.18 (랜덤) | 0.2 · 0.18 | 🟡 |
| D7-P5500 / P5600 / P5510 | 2020 | 96L · 144L TLC | 1 / 3 / 1 | 1 · 3 · 1 | 🟡 |
| Optane P5800X | 2021 (2020-12 발표) | 3D XPoint | 100 | 100 (빈 점) | 🟡 servethehome |
| D5-P5316 | 2021 | 144L QLC | 0.41 (64K 랜덤, 0.58은 근거 없음) | 0.41 | 🟡 |
| D3-S4520 / S4620 | 2021 | 144L TLC | ">1" / ">3" (PBW 계산 2.6 / 5.0) | 1 · 3 | ⚠️ |
| D7-P5520 / P5620 | 2022 | 144L TLC | 1 / 3 | 1 · 3 | 🟡 |
| D5-P5430 / D5-P5336 | 2023 | 192L QLC | 0.58 / 0.42~0.58 (랜덤) | 0.58 · 0.58 | 🟡 blocksandfiles |
| D7-P5810 | 2023 | SLC | 50 (랜덤) | 50 (빈 점) | 🟡 |
| D7-PS1010 / PS1030 | 2024 | 176L TLC | 1 / 3 | 1 · 3 | 🟡 |
| D5-P5336 122.88TB | 2024 | 192L QLC | 0.6 (32K 랜덤) | 0.6 | 🟡 storagereview |

## 3. Micron

| 제품 (등급) | 연도 | NAND / 클래스 | 정격 DWPD | 점 | 등급 · 출처 |
|---|---|---|---|---|---|
| RealSSD P300 / P320h | 2010 / 2011 | SLC | 9.6 / 39 (계산) | 빈 점 | ⚠️ legitreviews · thessdreview |
| P410m / P420m | 2013 | eMLC WI / MLC MU | 10 / 3.9 (계산) | 10 · 3.9 | 🟡/⚠️ |
| M500DC | 2014 | MLC MU | 최대 2 | 2 | ⚠️ |
| 9100 PRO / MAX | 2016 | MLC | 1.6 / 2.2 (계산) | 1.6 · 2.2 | ⚠️ |
| 5100 ECO / PRO / MAX | 2016 | 3D eTLC | 0.9 / 1~3 / 5 | 0.9 · 2 · 5 | 🟡 anandtech 10886 |
| 9200 ECO / PRO / MAX | 2017 | TLC | 0.8 / 1.0 / 3.0 (계산) | 0.8 · 1 · 3 | ⚠️ |
| 5200 ECO / PRO / MAX | 2018 | 64L TLC | ≤1 / 1~2 / 3.3 (계산, 판매처 5와 충돌) | 1 · 1.5 · 3.3 | 🟡/⚠️ |
| 9300 PRO / MAX | 2019 | 64L TLC | 1 / 3 | 1 · 3 | 🟡 |
| 5300 PRO / MAX | 2019 | 96L TLC | 1.5 / 5 | 1.5 · 5 | 🟡 |
| 7300 PRO / MAX | 2019 | 96L TLC | 1.1~1.6 / 3.0~4.2 | 1.1 · 3 | 🟡 |
| 7400 PRO / MAX | 2021 | 96L TLC | 1 / 3 | 1 · 3 | 🟡 |
| 7450 PRO / MAX · 5400 PRO / MAX | 2022 | 176L TLC | 1 / 3 · 1.5 / 5 | 1 · 3 · 1.5 · 5 | 🟡 |
| 9400 PRO / MAX · 7500 PRO / MAX | 2023 | 176L · 232L TLC | 1 / 3 · 1 / 3 | 1 · 3 · 1 · 3 | 🟡 |
| 6500 ION | 2023 | 232L TLC 용량형 | 0.3 (4K 랜덤) | 0.3 | 🟡 |
| XTR | 2023 | SLC | 35 (랜덤) | 35 (빈 점) | 🟡 |
| 9550 PRO / MAX · 6550 ION | 2024 | 232L TLC | 1 / 3 · 1.0 (16K) | 1 · 3 · 1 | 🟡 |
| 9650 PRO / MAX · 7600 PRO / MAX · 6600 ION | 2025 | G9 TLC · QLC | 1 / 3 · 1 / 3 · 0.3 (16K) | 1 · 3 · 1 · 3 · 0.3 | 🟡 |

## 4. Kioxia · Toshiba

| 제품 (등급) | 연도 | NAND / 클래스 | 정격 DWPD | 점 | 등급 · 출처 |
|---|---|---|---|---|---|
| MKx001GRZB 100GB | 2011 | 32nm SLC | ~45 (8.2PB 계산) | 45 (빈 점) | ⚠️ storagereview |
| PX02SM / PX02SS / PX03SN | 2012 / 2013 / 2013 | eMLC WI / eMLC 고OP / MLC RI | 10 / 30 / 1 | 10 · 30 · 1 | 🟡 storagereview |
| PX04SH / SM / SV / SR | 2015 | MLC | 25 / 10 / 3 / 1 | 네 점 | 🟡 businesswire |
| PX04P WI / MU / RI | 2015 | MLC | 10 / 3 / 1 | 세 점 | 🟡 |
| PX04SL · HK4R / HK4E · PX05SM / SV / SR · ZD6300 | 2016 | MLC | 0.5 · 1 / 3 · 10 / 3 / 1 · 3 | 일곱 점 | 🟡 |
| PM5-M / -V / -R · CM5 HE / -V / -R | 2017 | 64L TLC | 10 / 3 / 1 · 5 / 3 / 1 (CM5 고내구는 10이 아니라 5) | 여섯 점 | 🟡 storagenewsletter |
| CM6-V / -R | 2019 | 96L TLC | 3 / 1 | 3 · 1 | 🟡 |
| CD6-V / -R · PM6-M / -V / -R · XD6 | 2020 | 96L TLC | 3 / 1 · 10 / 3 / 1 · 1 | 여섯 점 | 🟡 |
| CD7 · FL6 | 2021 | TLC · XL-FLASH(SLC) | 1 · 60 | 1 · 60 (빈 점) | 🟡 |
| PM7-V / -R · CD8-V / -R · CM7-V / -R · XD7P | 2022 | BiCS5 TLC | 3 / 1 · 3 / 1 · 3 / 1 · 1 | 일곱 점 | 🟡 (CD8 인터페이스 Gen4 · Gen5 충돌) |
| CD8P-V / -R | 2023 | TLC | 3 / 1 | 3 · 1 | 🟡 (연도 미검증) |
| XD8 | 2024 | TLC | 1 | 1 | 🟡 |
| CD9P-V / -R · CM9-R / -V · LC9 | 2025 | BiCS8 TLC · QLC | 3 / 1 · 1 / 3 · 0.3 | 다섯 점 | ✅(A22 · A23) / 🟡 |

## 5. SK hynix

| 제품 (등급) | 연도 | NAND / 클래스 | 정격 DWPD | 점 | 등급 · 출처 |
|---|---|---|---|---|---|
| SE3010 | 2016 | 16nm MLC | 0.5 (3년) | 0.3 | 🟡 kitguru |
| PE6011 / PE6031 | 2019 | 72L TLC RI / MU | 1 / 3 | 1 · 3 | 🟡 storagereview |
| PE8010 / PE8030 | 2020 | 96L TLC | 1 / 3 ("1~3" 시리즈 표기 · HPE MU 3) | 1 · 3 | 🟡 |
| PE8110 | 2021 | 128L TLC RI | 1 | 1 | 🟡 |
| (PS1010 2023 SK hynix 브랜드 = Solidigm D7-PS1010, 중복 제외) | | | | | |

SK hynix는 데이터시트를 공개하지 않는다(blocksandfiles). PE8111 · PEB110 · PS1012 · PS1101 · SE4011의 DWPD는 찾지 못했다.

## 6. WD · HGST · SanDisk

| 제품 (등급) | 연도 | NAND / 클래스 | 정격 DWPD | 점 | 등급 · 출처 |
|---|---|---|---|---|---|
| HGST Ultrastar SSD400S | 2010 | SLC | 48 (35PB 계산) | 48 (빈 점) | ⚠️ hitachi.com 2010-11-16 |
| Ultrastar SSD400M | 2011 | eMLC WI | 10 | 10 | 🟡 |
| SMART → SanDisk Optimus Ultra+ | 2012 | cMLC WI | 50 | 50 | 🟡 theregister |
| HGST SSD800MH / MM / MR | 2013 | MLC | 25 / 10 / 2 | 세 점 | 🟡 theregister |
| SanDisk Optimus Extreme / Ascend / Eco | 2013 | MLC | 45 / 10 / 3 | 세 점 | 🟡 tomshardware |
| SanDisk Lightning Ultra / Ascend / Eco Gen II | 2014 | MLC | 25 / 10 / 3 | 세 점 | 🟡 hpcwire |
| SanDisk CloudSpeed Extreme / Ultra / Ascend / Eco | 2014 | MLC | 10 / 3 / 1 / 1 | 네 점 | 🟡 storagereview |
| HGST SN100 · CloudSpeed Eco II · Ultra II | 2015 | MLC | 3 · 0.6 · 1.8 | 세 점 | 🟡 |
| HGST SS200 · SN200 (RI / MU) | 2016 | MLC | 1 / 3 · 1 / 3 | 네 점 | 🟡 anandtech 10890 · 10891 |
| HGST SS300 | 2017 | 3D MLC · TLC | 0.5 / 1 / 3 / 10 | 네 점 | 🟡 |
| WD DC SS530 | 2018 | 64L TLC | 1 / 3 / 10 | 세 점 | 🟡 anandtech 13149 |
| WD DC SN630 · SN640 · SS540 | 2019 | TLC | 0.8 / 2 · 0.8 / 2 · 1 / 3 | 여섯 점 | 🟡 |
| WD DC SN840 | 2020 | 96L TLC | 1 / 3 | 1 · 3 | 🟡 |
| WD DC SN650 · SN655 | 2022 · 2023 | BiCS5 TLC RI | 1 · 1 | 1 · 1 | 🟡 |
| WD DC SN861 | 2024 | TLC | 1 / 3 | 1 · 3 | 🟡 |
| Sandisk UltraQLC SN670 | 2025 | BiCS8 QLC | 0.35 | 0.35 | 🟡 blocksandfiles 2025-08-05 |

## 7. 집계 (특수 제품 14개 제외, 일반 NAND 212개 등급)

| 기간 | 등급 수 | 중앙값 DWPD | 10 이상 비중 | 1 미만 등급 | 최대 |
|---|---|---|---|---|---|
| 2008~2012 | 9 | 10 | 67% | 0 | 50 |
| 2013~2015 | 45 | 3 | 38% | 7 | 45 |
| 2016~2018 | 61 | 1.5 | 7% | 14 | 10 |
| 2019~2021 | 46 | 1 | 2% | 5 | 10 |
| 2022~2026 | 51 | 1 | 0% | 8 | 5 |

2016년 이후 30 DWPD 이상은 모두 특수 제품(Optane P4800X 30 · 60 · P5800X 100, Z-SSD 30, FL6 60, D7-P5810 50, XTR 35)이다. **표본 한계**: 출시 등급의 단순 집계이며 판매량 가중이 아니다. 2008~2012 표본은 9개로 적다.

## 8. 주의 · 충돌

1. 보증 기간: X25-E · 710(3년), Samsung PM 계열 SATA · Gen3(PM853T · PM863 · PM863a · PM883 · PM963 · PM983), SK hynix SE3010(3년) → 5년 환산.
2. Intel DC P3700: 2014 출시 10, 2015 LDPC 재정격으로 1.6 · 2TB만 17(400 · 800GB는 10).
3. Optane P4800X: 출시 표기 30 DWPD · 12.3PBW는 3년 기준, 이후 5년 30 DWPD · 60 DWPD SKU 추가(시점 미확인).
4. D5-P5316: 0.41(64K 랜덤) 확인, 0.58은 근거 없음(P5430 · P5336과 혼동 추정).
5. 출처 충돌: P3520(1 · 3 · 0.68), Micron 5200 MAX(5 · 3.3), P420m(10 · 3.9), Samsung PM9A3(1 · 1.3), PM893(1 · 1.3), Kioxia CD8 인터페이스.
6. 랜덤 · 순차 혼재: SM843(1 · 4), SM843T(1.8 · 5.4), PM853T(0.3 · 1.6), QLC 전반.
7. 미수집: Samsung SS805 · PM1633, Toshiba HK3R2 · HK6-DC, Intel P3608 · D5-P4420, Micron P400m/e · 9300 ECO, Pliant Lightning 1세대, SK hynix 다수(데이터시트 비공개). Agent ①은 WebSearch 한도(200회)에 도달해 종료.
