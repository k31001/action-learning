# 데이터센터 SSD 10~15년 개선 시계열 원장: 성능 · 전력 효율 · 가성비 · 정격 DWPD (2010~2026)

**수집일**: 2026-10-07
**유형**: 웹 데이터 원장 (Research Agent, 해석 없음)
**용도**: 고객 협력 전략 덱 3장 계단 위 그래프 4개. 사용자 지시(2026-10-07): "지금까지 SSD 최적화를 통해 진전이 있었던 데이터를 수집하여 그래프로 시각화 … 성능, 파워와 가성비 지표를 선정하여 지난 10~15년 동안 어떻게 성장하였는지 … SSD 내부 최적화만으로도 이 정도로 성장을 했다. 하지만 DWPD는 개선이 어려운 상황이다라는 메시지를 던지기 위한 전 단계."
**접근 한계**: 이 세션의 프록시가 samsung.com · micron.com · storagereview · lenovopress · digitalpreservation.gov · ourworldindata · jcmit.net 등을 차단했다. **모든 값은 검색 결과 스니펫으로 확인했다(✅ 없음).** 🟡(공식) = 공식 도메인 페이지가 스니펫 출처, 🟡 = 언론 · 리뷰 · 리셀러 스니펫, 계산 = 출처 수치 두 개의 나눗셈(보간 없음). 덱에 쓰기 전 PM1733 · PM1743 브로슈어, Lenovo LP1300 · LP1712, LoC DSA 2018~2025 PDF를 원문으로 대조할 것.

---

## 1. 성능 (드라이브 세대별, U.2 · E3.S x4 기준으로 통일)

| ID | 연도 | 제품 | 인터페이스 | 순차 읽기 (MB/s) | 4K 랜덤 읽기 (IOPS) | 등급 · URL |
|---|---|---|---|---|---|---|
| GR-01 | 2012-11 발표 | Intel DC S3700 | SATA 6Gb/s 2.5" | 500 | 75,000 | 🟡(공식) https://www.intc.com/news-events/press-releases/detail/1241/intel-announces-intel-ssd-dc-s3700-series- |
| GR-02 | 2013 | Samsung SM843T | SATA | 500 / 530 (충돌) | 98K / 89K (충돌) | 🟡 사용 안 함 |
| GR-03 | 2013 발표 · 2014 양산 | Samsung XS1715 (첫 NVMe) | Gen3 x4 2.5" | 3,000 | 740K | 🟡 https://www.storagereview.com/review/samsung-xs1715-2-5-nvme-ssd-review |
| GR-04 | 2014 | Intel DC P3700 | Gen3 x4 | 2,800 | 450K | 🟡 https://www.storagereview.com/review/intel-ssd-dc-p3700-2-5-nvme-ssd-review |
| GR-05 | 2015-07 | Samsung SM863 | SATA | 520 | 97K | 🟡 |
| GR-06 | 2015-08 | Samsung PM1725 | **U.2 x4** (HHHL x8은 5,500 · 1,000K) | 3,100 | 750K | 🟡 https://www.storagereview.com/review/samsung-pm1725-ssd-review |
| GR-07 | 2017? (브로슈어 2018-05) | Samsung PM1725a | U.2 x4 / HHHL x8 | 3,300 / 6,400 | 800K / 1,080K | 🟡(공식) Brochure_Samsung_PM1725a_NVMe_SSD_1805.pdf |
| GR-08 | 2019 | Micron 9300 | Gen3 x4 U.2 | 3,500 | 850K | 🟡 |
| GR-09 | 2019-08 | Samsung PM1733 | Gen4 U.2 x4 | 7,000 | 1,500K (3.84TB) | 🟡(공식) https://lenovopress.lenovo.com/lp1300.pdf |
| GR-10 | 2023-01 | Micron 9400 | Gen4 U.3 | 7,000 | 1,600K | 🟡 https://blocksandfiles.com/2023/01/09/micron-9400-u-3-datacenter-ssd/ |
| GR-11 | 2021-12 발표 · 2022 양산 | Samsung PM1743 | Gen5 x4 U.2 · E3.S | 13,000 (발표) → 14,000 (2024 백서) | 2,500K | 🟡(공식) https://download.semiconductor.samsung.com/resources/white-paper/PM1743_White_Paper_240510.pdf |
| GR-12 | 2024-07 | Micron 9550 | Gen5 x4 | 14,000 | 3,300K | 🟡 https://blocksandfiles.com/2024/07/23/micron-sets-datacenter-ssd-speed-energy-efficiency-records/ |
| GR-13 | 2024-08 (FMS) | Samsung PM1753 | Gen5 x4 | 14,800 (FMS) / 14,500 | 3,400K (FMS) / 3,300K | 🟡 https://heise.de/en/news/FMS-Samsung-launches-fast-and-large-data-center-SSDs-9826691.html |
| GR-14 | 2025-07 발표 · 2026-02 양산 | Micron 9650 | **Gen6** x4 | 28,000 | 5,500K | 🟡 https://www.allaboutcircuits.com/news/micron-unveils-pcie-gen6-ssds-to-power-the-next-wave-of-ai-data-centers/ |
| GR-15 | 2026-07 양산 | Samsung PM1763 | **Gen6** x4 | 28,400 (16TB) | 6,800K | 🟡(공식) https://semiconductor.samsung.com/ssd/enterprise-ssd/pm1763/ ; https://news.samsung.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure |

## 2. 전력 · 전력 효율

| ID | 제품 | 전력 (기준) | MB/s/W | IOPS/W | 등급 · 출처 |
|---|---|---|---|---|---|
| GR-20 | DC S3700 (2012) | Active 6W (typ) | 83 (계산) | 12.5K (계산) | 🟡 Intel 스펙 PDF 스니펫 |
| GR-21 | Intel P3700 (2014) | Active 25W | 112 (계산) | 18K (계산) | 🟡 |
| GR-22 | XS1715 (2013/14) | Active 25W | 120 (계산) | 29.6K (계산) | 🟡 |
| GR-23 | SM863 960GB (2015) | Read 2.2W | 236 (계산) | 44K (계산) | 🟡 SATA라 절대 전력이 작아 NVMe보다 높게 나옴 |
| GR-24 | PM1725 U.2 (2015) | Active 25W | 124 (계산) | 30K (계산) | 🟡 |
| GR-25 | PM1725a HHHL | 23W 미만 | 278 이상 (계산, x8) | - | 🟡(공식) |
| GR-26 | Micron 9300 7.68TB | - | - | 53,100 (Micron 공표) | 🟡 |
| GR-27 | PM1733 U.2 (2019) | Read typical 15~20W (용량별) | 350~467 (계산) | 72.5K~100K (계산) | 🟡(공식) lenovopress LP1300 |
| GR-28 | Micron 9400 7.68TB | - | - | 94,118 (Micron 공표, 9300 대비 +77%) | 🟡 |
| GR-29 | PM1743 (2022) | Read typical 19.9~24.6W / 7.68TB 23W | **608 (삼성 공표, 전 세대 대비 약 +30%)**, 14,000/23W = 609 | 109K (계산) | 🟡(공식) 백서 · https://lenovopress.lenovo.com/lp1712.pdf |
| GR-30 | PM1753 15.36TB E3.S (HPE OEM) | 평균 21.34W | 679 (계산) | 155K (계산) | 🟡 OEM 수치, 삼성 공식 W 미확인 |
| GR-31 | Micron 9650 (Gen6) | 피크 25W | **1,120 (Micron 공표, 전작 대비 2배)** | 220K (공표) | 🟡 |
| GR-32 | PM1763 (Gen6) | W 미공개 | - | - | 🟡(공식) "전 세대 대비 전력 효율 최대 1.8배"(2차 기사 1건은 60%로 충돌) |

## 3. 가성비: NAND $/GB (IBM Fontana · Decad · Lauhoff "Storage Landscape", NAND 산업 매출 ÷ 출하 비트, 명목 USD)

| ID | 연도 | NAND $/GB | 1달러로 사는 GB (계산) | 출처 |
|---|---|---|---|---|
| GR-40 | 2008 / 09 / 10 / 11 / 12 | 3.33 / 2.23 / **1.77** / 1.16 / 0.78 | 0.30 / 0.45 / **0.56** / 0.86 / 1.28 | 🟡 https://msstconference.org/MSST-history/2013/Papers/2013.Paper.01.pdf |
| GR-41 | 2013 | **0.615** ($24.0B ÷ 39 EB) | 1.63 | 🟡 https://www.digitalpreservation.gov/meetings/DSA2018/Day_1/4_TO_LOC%202018%20Talk__Fontana%20Decad__09172018_03.pdf |
| GR-42 | 2014 / 15 / 16 | 0.515 / 0.401 / **0.320** | 1.94 / 2.49 / 3.13 | 🟡 DSA2018 |
| GR-43 | 2017 | 0.323 (계산, $56.5B ÷ 175 EB) | 3.10 | 🟡 DSA2018 |
| GR-44 | 2018 | **0.253** (계산, $63.2B ÷ 250 EB) | 3.95 | 🟡 https://digitalpreservation.gov/meetings/DSA2019/Day_1/07_fontana2_Cloud-Storage-and-Tape-09092019.pdf |
| GR-45 | 2019 | ❌ (스니펫 0.320이 2016 값과 겹쳐 미사용) | - | - |
| GR-46 | 2020 | **0.129** ($56.7B ÷ 439 EB) | 7.75 | 🟡 https://digitalpreservation.gov/meetings/DSA2022/LAUHOFF_webversion_Storage%20Landscape_03152022.pdf |
| GR-47 | 2021 | 0.115 (598 EB) | 8.70 | 🟡 DSA2022 |
| GR-48 | 2022 | 0.095 ($60.1B ÷ 631 EB) | 10.5 | 🟡 DSA2023 |
| GR-49 | 2023 | **0.050** ($39B ÷ 779 EB, 사이클 저점) | 20.0 | 🟡 https://digitalpreservation.gov/meetings/DSA2024/loc_dsa2024_website_0104_Lauhoff_Libary_of_Congress_2024_IBM.pdf |
| GR-50 | 2024 | 0.075 | 13.3 | 🟡 https://digitalpreservation.gov/meetings/DSA2025/010201_lauhoff_LoC2025_IBM_G_Lauhoff.pdf |
| GR-51 | 2025 | ❌ | - | - |

**기업용 SSD 가격 앵커 (같은 시계열 아님)**: GR-52 2012 DC S3700 MSRP $2.35/GB(🟡 공식) · GR-53 eSSD/니어라인 HDD 프리미엄 2017Q4 18배 → 2019Q2 9배(🟡) · GR-54 2020Q2 eSSD 약 $185/TB 대 HDD 약 $19/TB(🟡) · GR-55 VDURA 30TB TLC 2025Q2 약 $100/TB → 2026-08 약 $736/TB, QLC 약 $589/TB(🟡, 2026 공급 부족 급등) · GR-56 OWID/McCallum 시리즈 존재만 확인, 수치 ❌.

## 4. 드라이브당 최대 용량

| ID | 시점 | 제품 | 용량 | 등급 |
|---|---|---|---|---|
| GR-60 | 2012 | Intel DC S3700 | 800GB | 🟡(공식) |
| GR-61 | 2014 | Samsung XS1715 | 1.6TB | 🟡 |
| GR-62 | 2016-03 | Samsung PM1633a SAS | 15.36TB | 🟡(공식) |
| GR-63 | 2018-02 | Samsung PM1643 SAS | 30.72TB | 🟡(공식) |
| GR-64 | 2019 | Samsung PM1733 U.2 | 30.72TB | 🟡 |
| GR-65 | 2023-07 | Solidigm D5-P5336 QLC | 61.44TB | 🟡 |
| GR-66 | 2024-07 | Samsung BM1743 QLC | 61.44TB | 🟡 |
| GR-67 | 2024-11 | Solidigm D5-P5336 | 122.88TB | 🟡 |
| GR-68 | 2025-07 | Kioxia LC9 | 245.76TB | 🟡(공식) https://www.kioxia.com/en-jp/business/news/2025/20250722-1.html |
| GR-69 | 2025-08 발표 | Sandisk UltraQLC | 256TB | 🟡 |

## 5. 정격 DWPD (클래스 혼재 주의)

| ID | 연도 | 제품 (클래스) | DWPD | 조건 · 등급 |
|---|---|---|---|---|
| GR-70 | 2012 | Intel DC S3700 (고내구) | 10 | 5년 🟡 |
| GR-71 | 2013 | Intel DC S3500 800GB (읽기 위주) | 0.31 (계산) | 450 TBW / 5년 🟡 |
| GR-72 | 2013 | Samsung SM843T | 1.8 / 2.1~2.2 (충돌) | 🟡 |
| GR-73 | 2014 | Intel DC P3700 | 10 | 🟡 |
| GR-74 | 2014 | Samsung XS1715 1.6TB | 5.6 | 🟡 |
| GR-75 | 2015 | Samsung SM863 960GB | 3.5 (계산) | 🟡 |
| GR-76 | 2015 | Samsung PM863 960GB (읽기 위주) | 1.3 (계산) | 3년 🟡 |
| GR-77 | 2015 / 2017 | Samsung PM1725 / PM1725a | 5 | 5년 🟡 |
| GR-78 | 2018 | Samsung PM983 (읽기 위주) | 1.3 | 🟡 |
| GR-79 | 2019 | Micron 9300 PRO / MAX | 1 / 3 | 🟡 |
| GR-80 | 2019 | Samsung PM1733 | 1 | 🟡(공식) Lenovo LP1300 |
| GR-81 | 2021 | Solidigm D5-P5316 30.72TB QLC | 0.41 (64K 랜덤 기준 계산), 64K 순차 기준이면 약 1.86 | 🟡 |
| GR-82 | 2022 | Samsung PM1743 | 1 | 5년 🟡 |
| GR-83 | 2023 / 2024 | Solidigm D5-P5336 61.44TB / 122.88TB | 0.58 / 0.6 | 워크로드 기준 미확인 🟡 |
| GR-84 | 2024 | Samsung BM1743 61.44TB QLC | 0.26 (전작 BM1733 0.18) | 기준 미확인 🟡 |
| GR-85 | 2024~25 | Samsung PM1753 | 1 | 5년 🟡 |

## 6. 한계 · 주의

1. **인터페이스 주도 대 컨트롤러 주도**: 순차 성능 상승은 인터페이스 한계에 거의 붙어 있다(SATA 약 0.55, Gen3 x4 약 3.5, Gen4 약 7, Gen5 약 14, Gen6 약 28 GB/s). 같은 세대 안 개선(PM1743 → PM1753 순차 +4%, 랜덤 +32%)이 컨트롤러 · NAND 효과다. 랜덤 IOPS와 전력 효율은 컨트롤러 공정과 NAND 세대 기여가 더 크다.
2. **폼팩터 혼용 금지**: HHHL x8은 U.2 x4의 약 2배로 보인다. 시계열은 x4로 통일했다.
3. **전력 기준 제각각**: Intel typ, 삼성 · Lenovo typical read(용량별), Micron 피크 25W 기준 공표, HPE average. MB/s/W는 ±20% 오차 전제. SATA는 절대 전력이 작아 효율이 높게 나온다(SM863 236 > PM1725 124).
4. **가격 시계열의 성격**: IBM 시리즈는 NAND 부품 매출/비트이며 SSD 완제품가가 아니다(2020: 부품 $129/TB 대 eSSD $185/TB). 명목가, 인플레이션 미보정. 사이클 영향 큼(2017~18 정체, 2023 저점 후 2024 반등, 2026 eSSD 급등).
5. **스펙 버전 차이**: PM1743 13,000 → 14,000, PM1753 14,800 · 3.4M → 14,500 · 3.3M. 차트에 쓴 값을 각주에 고정한다.
6. **DWPD 비교의 함정**: 2012~15년에는 고내구 10, 메인스트림 3~5, 읽기 위주 0.3이 공존했다. "10 → 1"은 하이퍼스케일러 표준이 읽기 위주(1 DWPD)로 이동한 결과를 포함하며, 같은 클래스의 내구가 그만큼 떨어졌다는 뜻이 아니다. 보증 기간 · 워크로드 기준에 따라 같은 드라이브도 0.41~1.86으로 달라진다(P5316).
7. **미확보**: PM1763 전력(W) · IOPS/W, PM1753 삼성 공식 W, NAND $/GB 2019 · 2025, SM843T 정확 스펙, PM1725a 출시 연도, OWID/McCallum 수치.

## 7. 덱 3장에 쓴 시계열 (2026-10-07)

| 그래프 | 점 (연도, 값) | 배율 | 근거 ID |
|---|---|---|---|
| 성능: 4K 랜덤 읽기 (K IOPS) | (2012, 75) Intel S3700 · (2015, 750) PM1725 · (2019, 1,500) PM1733 · (2022, 2,500) PM1743 · (2024, 3,300) PM1753 · (2026, 6,800) PM1763 | 약 90배 | GR-01 · 06 · 09 · 11 · 13 · 15 |
| 전력 효율: 순차 읽기 MB/s per W | (2012, 83) · (2015, 124) · (2019, 350, 20W 기준) · (2022, 608 삼성 공표) · (2026, 1,120 Gen6 Micron 9650 공표, PM1763 "1.8배" 주장과 같은 수준) | 약 13배 | GR-20 · 24 · 27 · 29 · 31 · 32 |
| 가성비: 1달러로 사는 NAND GB (명목) | (2010, 0.56) · (2013, 1.6) · (2016, 3.1) · (2018, 4.0) · (2020, 7.8) · (2022, 10.5) · (2023, 20) · (2024, 13) | 2010 → 2024 약 24배 | GR-40 ~ 50 |
| 정격 DWPD | 플래그십 (2012, 10) S3700 · (2015, 5) PM1725 · (2019, 1) PM1733 · (2022, 1) PM1743 · (2024, 1) PM1753 / QLC (2021, 0.41) P5316 · (2024, 0.26) BM1743 / 고객 캐시 요구 3~7.2(Kangaroo 예산 3 · KV 실측 3.2 · Baleen 목표 7.2, [ssd-customer-high-dwpd-evidence-2026-10.md](ssd-customer-high-dwpd-evidence-2026-10.md)) | 10 → 1 | GR-70 · 77 · 80 · 82 · 85 · 81 · 84 |
