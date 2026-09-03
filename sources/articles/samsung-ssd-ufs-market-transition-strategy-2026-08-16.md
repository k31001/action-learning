# 시장 전환기(PC→모바일→데이터센터) SSD·UFS 전략 — 웹 리서치 노트
(수집일 2026-08-16, Research Agent — 수집 전용, 해석 없음. 기존 수집분과 중복 배제 원칙)

**수집 방법 주기**: 본 세션의 네트워크 프록시가 주요 원문 도메인(jedec.org, news.samsung.com, trendforce.com, dramexchange.com, eetimes.com, theregister.com, businesswire.com, prnewswire.com, seagate IR)을 차단하여 원문 직접 열람(1차 확인)이 불가했다. 따라서 본 노트의 사실들은 대부분 **검색 요약 경유** 등급이다. 단, 다수의 독립 매체 검색 결과가 동일 수치·일자를 교차 제시한 항목은 그 취지를 명기했다. URL은 전부 §원 링크에 수록.

기존 수집분 참조(중복 배제):
- `samsung-ssd-ufs-history-competition-2026-08-15.md` — PM863/SM863(2015), PM1633a 15.36TB(2016-03), 1Q16 엔터프라이즈 SSD 32.4% 1위, 2013 SSD 전체 28.5% 1위, UFS 2.0 세계 최초 양산(2015-01), 830/840/840EVO/850PRO/950PRO 소비자 라인, V-NAND 최초 양산(2013-08), eMMC→UFS 잠식(2016~), 다운턴기 경쟁사 동향
- `samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md` — PM1763/PM1753/CMX/DGX Spark (2026 현재 축)

---

## 축 A — PC→모바일 전환기 (2010~2015)

### A-1. HDD 사업 매각 (2011)

- **발표일 2011-04-19**: Seagate Technology와 삼성전자가 확정 계약(definitive agreement) 발표. Seagate가 삼성의 HDD 사업을 **미화 13.75억 달러($1.375B)** 에 인수 (Forbes 2011-04-19, Engadget 2011-04-19, HotHardware). [검색 요약 경유 — 3개 이상 매체 교차 일치]
- **대가 구성**: 현금 50% + Seagate 보통주 50% — 현금 $687.5M + Seagate 주식 $687.5M(4,520만 주). 이 주식으로 삼성은 **Seagate 지분 약 9.6%** 를 취득, **Seagate 이사회 1인 지명권** 확보 (Forbes/Engadget 종합). [검색 요약 경유]
- **상호 공급 계약**: (1) 삼성이 Seagate의 SSD용 **NAND 플래시를 공급**, (2) Seagate가 삼성 PC·가전용 **HDD를 공급**하는 크로스-서플라이 계약 동반 (TechCrunch 2011-04, Engadget). [검색 요약 경유]
- **거래 종결 2011-12-19/20**: Seagate가 인수 완료 발표 ("Seagate Completes Acquisition of Samsung's Hard Disk Drive Business", Seagate IR 보도자료; Engadget 2011-12-20 "finalizes Samsung purchase"). [검색 요약 경유 — Seagate IR 원문은 프록시 차단으로 미열람]
- 구조적 의미(사실 배열): HDD(레거시 회전 매체) 사업을 현금·지분으로 전환하고, 같은 계약 안에 자사 NAND의 Seagate SSD 공급 채널을 심음 — 매각과 동시에 NAND 판로를 확대하는 계약 구조였다는 점은 계약 조항 자체에서 확인됨. [검색 요약 경유]

### A-2. eMMC 지배와 모바일 NAND 수요 전환

- **Gartner 2012년 집계**: eMMC+eMCP 매출 합계 **$6.05B** (전체 NAND 매출 $23.59B 중) ("Market Share Analysis: eMMC and eMCP Vendors by Revenue, Worldwide, 2012", Gartner; EE Times Asia 재보도 "Samsung leads eMMC, eMCP memory segment"). [검색 요약 경유]
- **Gartner 2013년 집계**: 삼성이 eMMC+eMCP **1위 — $3.317B, 점유율 35.6%**. 상위 4사(삼성·Toshiba·SK하이닉스·SanDisk) 합계 95.4% (전년 약 90%) (EE Times "Top Mobile Memory Vendors"). [검색 요약 경유]
- **IHS 2013**: 스마트폰이 NAND 최대 소비 애플리케이션으로 등극 — **스마트폰 24.6% > SSD 20.6% > 플래시카드(3위로 하락), 태블릿 11.4%**. IHS 애널리스트 Ryan Chen: "휴대폰 사업이 다른 모든 플래시 응용 시장을 압도(eclipsing)" (PhoneArena 2013, IHS 인용). [검색 요약 경유] → 스마트폰+태블릿 합산 ~36%로 PC계(SSD 20.6%)를 상회.
- **DRAMeXchange 2011-10**: 2012년 NAND 시장 $22B→$26B(+20%) 전망, 성장동력은 스마트폰·태블릿·울트라북·클라우드 서버 ("NAND Flash Demand to Diversify", TrendForce 보도 2011-10-24). 2012년 스마트폰 약 6.26억 대 × 평균 9GB = 5.7B GB, 태블릿은 NAND 시장의 12%(2015년 17% 전망) (EE Times "Tablet demand fuels NAND flash growth"). [검색 요약 경유]
- **TrendForce 2012-12**: "eMMC and SSD to Contribute to 15% NAND Flash Output Value Growth in 2013" — eMMC와 SSD가 2013년 NAND 성장의 양대 견인 (TrendForce 2012-12-24). [검색 요약 경유]

### A-3. UFS 표준 주도

- **JEDEC UFS 1.0 발행 2011-02-24**: JEDEC이 차세대 모바일 스토리지 표준 UFS 발표. 초기 대역 300MB/s, **command queuing** 지원(랜덤 성능 개선), eMMC의 모바일 기능(보안·전력관리)을 계승하며 **고성능 병렬(직렬 고속) 아키텍처**로 이행 (JEDEC 보도자료; PR Newswire 재배포). [검색 요약 경유 — JEDEC 원문 프록시 차단]
- **JEDEC UFS 1.1 갱신 2012-06-25** (Business Wire "JEDEC Updates Universal Flash Storage (UFS) Standard"). [검색 요약 경유]
- **JEDEC UFS 2.0 발행 2013-09-18**: 링크 대역 증대, 보안 기능 확장, 추가 절전 기능. **MIPI M-PHY v3.0 + UniPro v1.6** 참조 — JEDEC×MIPI Alliance 협업 구조 (JEDEC 보도자료). [검색 요약 경유]
- **아키텍처 계보**: UFS는 SCSI 아키텍처 모델(SAM)·SCSI 명령 집합 기반 — SSD(SCSI/UAS)식 명령 큐잉을 모바일에 이식한 설계라는 점은 JEDEC UFS 표준 페이지에서 일관 기술. [검색 요약 경유]
- **삼성의 역할**: 검색 범위에서 "삼성이 UFS 태스크그룹 의장"이라는 직접 문헌은 확보 못함(→미확인 목록). 다만 JEDEC UFS 관련 보도자료에서 반복적으로 삼성 임원이 대표 논평자로 등장 — Kenny Han(VP, NAND product planning) "Embedded UFS has been proven to deliver the best performance and highest power efficiency of any storage in the mobile industry", 이후 세대에서도 JaeHyeong Lee(VP memory product planning & application engineering), Kyungryun Kim(VP NAND Memory Planning/Enabling, UFS 4.0) 등 삼성 인사가 표준 발표 코멘트 담당 (JEDEC 보도자료들). [검색 요약 경유]
- 세계 최초 UFS 2.0 임베디드 양산(2015-01)은 기존 수집분(`samsung-ssd-ufs-history-competition-2026-08-15.md`) 참조.

### A-4. 경쟁사 대비 (간략)

- **SanDisk(+Toshiba 합작)**: 10-K/10-Q(FY2012~13) 기준, 모바일용 임베디드·리무버블 NAND 매출이 최대 매출원으로 성장. NAND 공급은 Toshiba와의 flash venture에서 조달. 성장처로 client SSD·enterprise datacenter를 지목하면서도 실제 매출 중심은 모바일 (SanDisk SEC filings FY2012-13). [검색 요약 경유]
- **Toshiba**: 2012-07 NAND 감산 30% 단행(가격 방어) (SanDisk 10-Q 배경 서술 등). [검색 요약 경유]
- **eMMC 경쟁 구도**: 삼성 지배 하에 SK하이닉스·SanDisk·Toshiba가 추격 — 2014-06 시점 분석에서 "eMMC/eMCP: Samsung lose, Hynix gain" 관측 (Ron Maltiel 블로그, Gartner 데이터 재인용). [검색 요약 경유]
- **HDD 진영의 대응**: PC 쇠퇴 국면에서 WD는 엔터프라이즈 강화 + 인수 연쇄(히타치 HDD, STEC, Virident, VeloBit, Skyera, 그리고 2015-10 **SanDisk $19B** 인수 합의)로 플래시 전환 시도. Seagate는 WD에 점유율을 잃으며 2014년에야 모바일·서버 제품 전환 착수 (Motley Fool 2013-01-31, 2014-04-17, 2015-11-10 종합). [검색 요약 경유] — 스마트폰 내장 스토리지는 HDD가 진입 자체가 불가한 시장이었고, 양사 모두 모바일 스토리지 시장 참여에 실패했다는 별도의 단정적 1차 문헌은 미확보(→미확인).

---

## 축 B — 모바일→데이터센터 전환기 (2014~2019) ★

### B-1. 시안 팹 — V-NAND 전용 캐파 베팅

- **투자 발표 2012**: 삼성, 중국 시안(西安)에 **$7B** 규모 NAND 팹 투자 발표 — 중국 서부 최대 외국인 투자이자 삼성의 최대 중국 투자 (EE Times "Samsung to Invest $7 Billion in China Fab" 2012-04경, The Register 2012-04-03). [검색 요약 경유]
- **착공 2012-09**: 1단계 건설에 $2.3B 승인, 2012-09-12 착공 (China Daily 2012-09-13 "Samsung launches construction of $7b Xi'an high-tech factory", PCWorld "Samsung breaks ground"). [검색 요약 경유]
- **양산 개시 2014-05-09**: 삼성 발표 — 시안 메모리 라인 본격 가동, 생산품은 **3D V-NAND** (Samsung Newsroom "Samsung Announces Operation of its Memory Facility in Xi'an, China"; The Memory Guy "Samsung Begins Operations at its Xi'an Fab"). [검색 요약 경유 — 원문 차단] ※ 1단계 누적 투자액을 **$10.87B**로 기재한 후대 자료 존재 (TrendForce 2023-12-13 회고 기사) — 2012년 발표치 $7B와의 차이는 집행 누계 vs 발표치 차이로 보이나 원문 대조 불가(→미확인).
- **2단계 발표 2017-08-30**: **$7B** 투자로 시안 2기 12인치 NAND 라인 건설 발표. 월 20K→65K 웨이퍼로 증설 목표, 90단 이상 5세대 V-NAND 생산 (Businesskorea "Samsung Electronics Puts 2nd Plant in Xian into Operation as Planned"; Seeking Alpha 2017 "Samsung's Future 3D NAND Fab In China"). [검색 요약 경유]
- **후속**: 2019-12 2기 프로젝트에 **$8B** 추가 투자 결정, 2기 1단계 2020-03 완공·가동 (Blocks & Files 2020-03-19, Global Times 2021-03). [검색 요약 경유]
- **현재 위상(후대 자료)**: 시안은 삼성 유일의 해외 메모리 생산기지로 성장, 월 265K 웨이퍼 이상, **삼성 전체 NAND 생산의 40%+** (TrendForce 2023-12-13). [검색 요약 경유]

### B-2. 데이터센터 제품 사다리 (2014~2018)

(PM863/SM863(2015 SATA 라인)·PM1633a는 기존 수집분 참조 — 여기서는 NVMe 계열만)

- **XS1715 (2013)**: 2013-07 삼성 SSD Global Summit에서 공개 — **업계 최초 NVMe PCIe 엔터프라이즈 SSD**. 400GB/800GB/1.6TB, 순차 읽기 3,000MB/s, 랜덤 읽기 740K IOPS, 최초의 SFF-8639(현 U.2) 커넥터 채택. **2013-05-31 UNH-IOL NVMe Integrators List 최초 등재 제품** (The SSD Review 2013-07-18, NVM Express 블로그 "First NVMe PCIe SSD Arrives!!!", UNH-IOL, StorageReview·TweakTown 리뷰 2014). [검색 요약 경유 — 다수 매체 교차 일치]
- **PM953 (2015)**: PM1633·PM1725와 함께 발표된 TCO 최적화 데이터센터 NVMe SSD (StorageReview 2015 재보도). 2.5" 7mm(SATA 동일 두께)·M.2 22110, 480GB~1.92TB, PCIe G3 x4, 랜덤 읽기 240K IOPS, 9W — "모든 슬롯을 채워도 되는" 저전력 데이터센터 설계. SM951(클라이언트) 후속 포지셔닝 (Samsung PM953 brochure, Overclock.net의 StorageReview 재게시). [검색 요약 경유]
- **PM1725 (2015) → PM1725a (2016) → PM1725b**: 2015 Flash Memory Summit/SSD Global Summit에서 PM1725 공개 — HHHL 애드인카드 NVMe, 3.2/6.4TB, 순차 읽기 5,500MB/s, 랜덤 읽기 최대 1M IOPS, 5 DWPD/5년, 3-bit V-NAND (The SSD Review 2015, StorageReview 리뷰). PM1725a는 48단 V-NAND TLC 기반 후속 (Samsung brochure). [검색 요약 경유]
- **PM963 (2016)**: M.2 22110 데이터센터 NVMe, 960GB~3.84TB, 48단 TLC V-NAND, PCIe G3 x4 — "NVMe SSD engineered for data center environments" (TechPowerUp DB, Samsung PM963 brochure). [검색 요약 경유]
- **SM961/PM961 (2016, 클라이언트 OEM)**: 2016-03 일본 SSD Forum 공개, 2H16 출하. 신형 **Polaris 컨트롤러**(8채널 5코어, 950 PRO의 UBX 후속), M.2 2280, SM961(MLC V-NAND) 순차 읽기 3,200MB/s (HotHardware, HEXUS, Tom's Hardware 리뷰). [검색 요약 경유]
- **NGSFF(NF1) 폼팩터 (2017~2018)**: 2017-08 Flash Memory Summit에서 16TB NGSFF SSD 및 **1U 랙 576TB**(36×16TB) 레퍼런스 서버 시연. NGSFF("M.3", 후에 NF1로 개칭)는 M.2 후속으로 서버 공간 활용률 2배+. 4Q17 생산 개시, 1Q18 표준화·배치 목표 (Techerati 2017-08-09). 2018-06 **PM983 8TB NF1** 데이터센터 SSD 발표 — "하이퍼스케일 데이터센터의 공간 활용·확장성" 명시 (Samsung Newsroom "Samsung Introduces 8TB SSD for Data Centers in Next-generation 'NF1' Form Factor"; StorageReview 재보도; PM983 NF1 product brief 문서번호 1806=2018-06). [검색 요약 경유 — PM983 세부 일자 미확인 목록 참조]
- **PM983 (2018)**: PCIe G3 x4 데이터센터 NVMe(U.2/NF1), "SATA SSD 대비 4배 성능" 포지셔닝. CES 2018에서 8TB NGSFF 버전 시연 (Legit Reviews 2018-01, Samsung product brief). [검색 요약 경유]

### B-3. 하이퍼스케일러 고객 확보

- **직접적 공급계약 보도(2015~2018)는 미확보**: AWS·Google·Microsoft·Facebook에 대한 개별 퀄/공급을 특정한 당대 보도를 검색 범위에서 찾지 못함(하이퍼스케일러 부품 조달은 통상 비공개) — 미확인 목록 등재.
- **간접 증거 1 — 제품 포지셔닝**: PM963·PM983·NF1 등 2016~2018 제품군을 삼성이 일관되게 "hyperscale datacenter" 명칭으로 발표 (Samsung Newsroom/브로슈어 다수). [검색 요약 경유]
- **간접 증거 2 — OCP/Project Denali (2018-03)**: Microsoft가 OCP U.S. Summit 2018에서 클라우드 SSD 펌웨어 표준 Project Denali 발표 시 **삼성이 Intel·CNEX Labs·Broadcom·SK hynix·Marvell·LITEON과 함께 창립 파트너로 명기** (Microsoft Azure Blog "Microsoft creates industry standards for datacenter hardware storage and security" 2018-03-21, DCD, The Register 2018-03-28). [검색 요약 경유]
- **간접 증거 3 — 후대 소급**: 삼성 반도체 공식 블로그가 Amazon·Facebook·Google·Microsoft 등 "Super 7" 하이퍼스케일러와의 협업을 언급 (Samsung Semiconductor 블로그 "Surfing the Hyperscale Data Tsunami with Silicon"); OCP NVMe Cloud SSD 스펙(Facebook·Microsoft 주도) 완전 준수 제품 PM9A3 E1.S 양산(2021) — E1.S 폼팩터 리더십의 연장선 (Samsung Newsroom). [검색 요약 경유 — 시기상 2019 이후이므로 참고용]

### B-4. NVMe 전환 주도

- **엔터프라이즈 최초**: XS1715(2013) — 업계 최초 NVMe SSD이자 최초 NVMe 인증 제품 (B-2 참조, NVM Express 공식 블로그가 "First NVMe PCIe SSD" 명명). [검색 요약 경유]
- **소비자 최초**: 950 PRO(2015)가 최초 소비자(리테일) M.2 NVMe SSD — 제품 자체는 기존 수집분 참조; NVMe 전환 맥락만 여기 기록. 컨트롤러 계보 UBX(950 PRO)→Polaris(SM961/PM961, 2016)는 삼성 자체 설계 (Tom's Hardware). [검색 요약 경유]
- **수직계열화 구조**: 컨트롤러·NAND·DRAM·펌웨어 일괄 내재화가 NVMe 세대 전환 속도의 기반이라는 서술은 당대 리뷰(Tom's Hardware PM981 리뷰 등)에서 반복 — 정량 비교 문헌은 미확보. [검색 요약 경유]
- **Intel의 NVMe 진입**: Intel 최초 NVMe 제품군 DC P3700/P3600/P3500은 **2014-Q2** 출시 — 삼성 XS1715보다 발표 기준 약 1년 후 (Tom's Hardware "Intel SSD DC P3700 Review" 2014, TweakTown). [검색 요약 경유]

### B-5. 경쟁사 대비 — Intel의 실패 경로

- **DC P3700 (2014-Q2)**: Intel의 데이터센터 NVMe 개막작. NVMe 규격 자체를 Intel이 주도 설계했음에도 제품화는 삼성이 선행 (Tom's Hardware 2014). [검색 요약 경유]
- **3D XPoint/Optane 베팅**: 2015-07 Intel·Micron 공동으로 3D XPoint 발표("NAND보다 1,000배 빠름" 마케팅). 첫 제품 Optane SSD DC P4800X(375GB)는 발표 1년 반 뒤인 **2017-03** 출시 (AnandTech 2017-03 "Intel Introduces Optane SSD DC P4800X", PC Perspective). [검색 요약 경유]
- **Optane 청산 2022-Q2**: Intel, Optane 메모리 사업 wind-down 발표 — **재고 손상차손 $559M** 계상. Gelsinger는 CXL 아키텍처로의 산업 이동을 사유로 언급 (Tom's Hardware "Intel Kills Optane Memory Business Entirely", ServeTheHome, Forbes 2022-07-28). [검색 요약 경유]
- **NAND 사업 매각 2020-10-19/20**: Intel, NAND 메모리·SSD 사업 및 다롄 팹을 SK하이닉스에 **$9B** 매각 합의 (Optane은 잔류). 1단계 종결 2021-12-20(다롄 팹+SSD 사업 이전, Solidigm 출범), 최종 종결 2025-03-27 (Intel IR 보도자료, SK hynix Newsroom, Tom's Hardware, AnandTech). [검색 요약 경유]
- **Micron**: 3D XPoint 공동개발 파트너였으나 자체 제품(QuantX)은 사실상 불발. 4Q18 시점 SATA 엔터프라이즈 SSD 중심으로 빗그로스 10%+ 유지 (TrendForce 4Q18 보도). 2012~13 시점 SanDisk 10-K류 문헌에서 Micron·Intel의 PC·엔터프라이즈 중심 NAND 전략의 직접 서술은 미확보(→미확인). [검색 요약 경유]

### B-6. 결과 정량 (2017~2019)

- **삼성 3Q17 실적**: 분기 영업이익 **14.53조 원(사상 최대, YoY +9.33조)**. NAND 부문 — "플래그십 스마트폰 출시와 클라우드 인프라 확장으로 수요 견조, **데이터센터 NVMe SSD 등 고부가·고밀도 시장 수요에 적극 대응**" (Samsung Newsroom "Samsung Electronics Announces Third Quarter 2017 Results" 2017-10). [검색 요약 경유 — 원문 차단]
- **3Q17 NAND 산업**: 브랜드 NAND 매출 QoQ +14.3% — "스마트폰·**서버** 수요 성장" 명시 (DRAMeXchange/TrendForce 2017-11). [검색 요약 경유]
- **2018 연간**: NAND 산업 매출 **$63.2B 사상 최대** (2017 대비 +10.9% — 역산 시 2017년 약 $57B) (TrendForce 계열 보도, elinfor 재인용). [검색 요약 경유 — 2017 연간 수치 자체는 미확인 목록]
- **엔터프라이즈 SSD 점유율 추이**:
  - 1Q16 32.4% 1위 — 기존 수집분 참조.
  - **1Q17**: TrendForce 기준 출하량(shipments) **Intel 1위, 삼성 2위(25%)** (TrendForce 보도 2017-05-25 "Intel Took First Place in Enterprise-Grade SSD Shipments... Samsung Followed Closely in Second"). ※ 1Q16 32.4%(1위)와의 관계는 집계 기준(매출 vs 출하) 차이 가능성 — 원문 대조 불가(→미확인). [검색 요약 경유]
  - **3Q18**: 엔터프라이즈 SSD 매출 점유 **삼성 38.5% 1위, Intel 18.3% 2위** (The Register 2018-11-23, IDC 등 애널리스트 데이터 인용). [검색 요약 경유]
  - **3Q19**: 엔터프라이즈 SSD 용량(capacity) 출하 기준 **Intel ≈ 삼성 각 ~35%** (TrendFocus·Wells Fargo, Blocks & Files 재인용). [검색 요약 경유]
  - (참고, 후대) 3Q21 삼성 엔터프라이즈 SSD 출하 과반 — "Intel fades" (Blocks & Files 2022-01-06). [검색 요약 경유]
- **다운턴(2018Q4~2019)**: 4Q18 NAND 산업 매출 QoQ **-16.8%**. 삼성 4Q18 빗 출하 QoQ -7%+, ASP QoQ -20%+, 분기 매출 $4.304B(QoQ -28.9%) — 스마트폰·**서버**·노트북 동반 수요 약화 (TrendForce 2019-02-21). 2019 연간 NAND 매출 **-23.1%** — 2018년 말 과잉재고+1H19 수요 부진, 1Q19에도 스마트폰·서버 고객 재고조정 지속 (Gartner 2019 반도체 -11.9% 보도, EE Times; TrendForce). [검색 요약 경유]

### B-7. 전환 의도 증거 (당대 보도·발언)

- **삼성 3Q17 공식 실적 코멘트**: "NAND는... **datacenter NVMe SSD 같은 고부가가치·고밀도 시장의 수요에 적극 대응**(actively responding to demand from value-added and high density markets such as datacenter NVMe SSD)". 전망 코멘트: "빅데이터 수요 증가로 **서버 SSD 채택 가속** 예상", "고밀도 모바일 + **데이터센터 확장**으로 타이트한 수급 지속 전망" (Samsung Newsroom 3Q17 Results). [검색 요약 경유] — 컨퍼런스콜이 아닌 공식 실적 보도자료 문구.
- **DRAMeXchange 3Q17 시장평**: 브랜드 NAND 매출 성장 동인으로 "smartphone **and server**" 병기 — 서버가 스마트폰과 동급의 수요축으로 격상된 당대 표현 (DRAMeXchange Weekly Research 2017-11). [검색 요약 경유]
- **제품 명명 증거**: 2016 PM963 브로슈어("engineered for data center environments") → 2017 NGSFF 발표("hyperscale data centres... space utilisation") → 2018 PM983 보도자료 제목("Data Center SSD Customized for **Hyperscale** Environments") — 2016~2018 사이 공식 자료의 타깃 시장 언어가 클라이언트→데이터센터→하이퍼스케일로 단계 이동. [검색 요약 경유]
- **표준 활동 증거**: 2018-03 Microsoft Project Denali(클라우드 SSD 표준) 창립 파트너 참여 (Azure Blog). [검색 요약 경유]
- 2015~2016년의 "삼성이 NAND 캐파를 엔터프라이즈 SSD로 전환 중"이라는 DRAMeXchange/TrendForce 명시 논평은 검색 범위에서 원문 확보 실패 — 미확인 목록.

---

## §. 원 링크 (전체 URL 목록)

**축 A — HDD 매각**
- https://www.forbes.com/sites/briancaulfield/2011/04/19/seagate-agrees-to-buy-samsungs-hard-drive-business-in-1-375-billion-deal/
- https://www.engadget.com/2011-04-19-samsung-sells-hdd-division-to-seagate-for-1-375-billion.html
- https://www.engadget.com/2011-12-20-seagate-shores-up-its-hard-drive-business-finalizes-samsung-pur.html
- https://investors.seagate.com/news/news-details/2011/Seagate-Completes-Acquisition-of-Samsungs-Hard-Disk-Drive-Business/default.aspx
- https://hothardware.com/news/samsung-sells-hard-drive-business-to-seagate-for-1375-billion
- https://techcrunch.com/?p=295338

**축 A — eMMC·모바일 수요**
- https://www.gartner.com/en/documents/2497115
- https://archive.eetasia.com/www.eetasia.com/ART_8800699558_499486_NT_72c4fdc8.HTM
- https://www.eetimes.com/top-mobile-memory-vendors/
- https://www.phonearena.com/news/Smartphones-will-be-the-largest-flash-memory-consuming-product-in-2013_id39399
- https://www.trendforce.com/presscenter/news/20111024-7394.html
- https://www.trendforce.com/presscenter/news/20121224-7654.html
- https://www.eetimes.com/tablet-demand-fuels-nand-flash-growth/
- http://semiconductorexpert.blogspot.com/2014/06/emmc-emcp-samsung-lose-hynix-gain-17bil.html

**축 A — UFS 표준**
- https://www.jedec.org/news/pressreleases/jedec-announces-publication-universal-flash-storage-ufs-standard
- https://www.prnewswire.com/news-releases/jedec-announces-publication-of-universal-flash-storage-ufs-standard-116807933.html
- https://www.businesswire.com/news/home/20120625006352/en/JEDEC-Updates-Universal-Flash-Storage-UFS-Standard
- https://www.jedec.org/news/pressreleases/jedec-publishes-universal-flash-storage-ufs-standard-v20
- https://www.jedec.org/standards-documents/focus/flash/universal-flash-storage-ufs

**축 A — 경쟁사**
- https://www.sec.gov/Archives/edgar/data/0001000180/000100018014000019/sndk201310-k.htm
- https://www.fool.com/investing/general/2013/01/31/western-digital-looks-strong-in-face-of-pc-demise.aspx
- https://www.fool.com/investing/general/2014/04/17/why-investing-in-seagate-is-not-a-good-idea.aspx
- https://www.fool.com/investing/general/2015/11/10/better-buy-now-western-digital-corp-or-seagate-tec.aspx

**축 B — 시안 팹**
- https://www.eetimes.com/samsung-to-invest-7-billion-in-china-fab/
- https://www.eetimes.com/samsung-to-spend-7-billion-on-wafer-fab-in-xian-china/
- https://www.theregister.com/2012/04/03/samsung_china_chip_factory_investment/
- http://usa.chinadaily.com.cn/china/2012-09/13/content_15754545.htm
- https://www.pcworld.com/article/461256/samsung_breaks_ground_on_7_billion_memory_chip_factory_in_china.html
- https://news.samsung.com/global/samsung-announces-operation-of-its-memory-facility-in-xian-china
- https://thememoryguy.com/samsung-begins-operations-at-its-xian-fab/
- https://www.businesskorea.co.kr/news/articleView.html?idxno=42855
- https://seekingalpha.com/article/4102356-samsungs-future-3d-nand-fab-in-china-is-good-news-for-western-digital
- https://blocksandfiles.com/2020/03/19/samsung-opens-xian-china-nand-memory-fab/
- https://www.trendforce.com/news/2023/12/13/news-samsung-secures-indefinite-u-s-exemption-initiates-expansion-plans-for-xian-base-in-china/

**축 B — 제품 사다리·NVMe**
- https://www.thessdreview.com/daily-news/latest-buzz/samsung-announces-xs1715-enterprise-ssd-3000-mbs-and-740000-iops-from-a-single-drive/
- https://nvmexpress.org/1050/
- https://www.iol.unh.edu/news/2014/10/24/samsung-xs1715-16tb-25-inch-nvme-pcie-enterprise-ssd-review
- https://www.storagereview.com/review/samsung-xs1715-2-5-nvme-ssd-review
- https://www.overclock.net/threads/storage-review-samsung-announces-tco-optimized-high-performance-ssds-pm1633-pm1725-and-pm953.1569204/
- https://image.semiconductor.samsung.com/content/samsung/p6/semiconductor/newsroom/tech-blog/brochure-pm953-25-nvme-pcie-ssd/PM953_flyer_web-1.pdf
- https://www.thessdreview.com/daily-news/latest-buzz/samsung-pm1725-nvme-tlc-enterprise-ssd-reaches-5-5gbs-speeds-and-6-4-tb-capacity-2015-samsung-ssd-global-summit-update/
- https://www.storagereview.com/review/samsung-pm1725-ssd-review
- https://www.techpowerup.com/ssd-specs/samsung-pm963-1-9-tb.d1368
- https://www.compuram.de/documents/datasheet/Samsung_PM963-1.pdf
- https://hothardware.com/news/samsung-sm961-and-pm961-oem-ssds-utilized-supercharged-polaris-controller
- https://hexus.net/tech/news/storage/91538-samsung-shows-sm961-pm961-nvme-polaris-ssds/
- https://www.tomshardware.com/reviews/samsung-sm961-ssd-256gb-512gb,4621.html
- https://techerati.com/the-stack-archive/data-centre/2017/08/09/samsung-announces-16tb-ngsff-ssd-for-hyperscale-data-centres/
- https://news.samsung.com/global/samsung-introduces-8tb-ssd-for-data-centers-in-next-generation-nf1-form-factor
- https://www.storagereview.com/news/samsung-introduces-8tb-ssd-in-nf1-form-factor
- https://download.semiconductor.samsung.com/resources/data-sheet/Product_Brief_Samsung_PM983_NF1_NVMe_SSD_1806.pdf
- https://www.legitreviews.com/samsung-will-show-off-gddr6-memory-8tb-ngsff-nvme-ssd-ces-2018_200077
- https://news.samsung.com/global/samsung-begins-mass-production-of-data-center-ssd-customized-for-hyperscale-environments

**축 B — 하이퍼스케일러·표준**
- https://azure.microsoft.com/en-us/blog/microsoft-creates-industry-standards-for-datacenter-hardware-storage-and-security/
- https://azure.microsoft.com/en-us/blog/project-denali-to-define-flexible-ssds-for-cloud-scale-applications/
- https://www.theregister.com/2018/03/28/microsoft_climbing_flash_performance_efficiency_mountain_with_project_denali/
- https://www.datacenterdynamics.com/en/news/ocp-summit-microsoft-speeds-up-cloud-ssds-with-project-denali/
- https://semiconductor.samsung.com/us/newsroom/tech-blog/surfing-the-hyperscale-data-tsunami-with-silicon

**축 B — Intel 대비**
- https://www.tomshardware.com/reviews/intel-ssd-dc-p3700-nvme,3858.html
- https://at-web1.www.anandtech.com/show/11208/intel-introduces-optane-ssd-dc-p4800x-with-3d-xpoint-memory
- https://www.tomshardware.com/news/intel-kills-optane-memory-business-for-good
- https://www.servethehome.com/intel-optane-559m-impairment-with-q2-2022-wind-down/
- https://www.forbes.com/sites/tomcoughlin/2022/07/28/intel-winding-down-its-optane-memory-business/
- https://www.intc.com/news-events/press-releases/detail/1513/intel-sells-ssd-business-and-dalian-facility-to-sk-hynix
- https://news.skhynix.com/sk-hynix-to-acquire-intel-nand-memory-business/
- https://www.tomshardware.com/news/intel-sells-nand-fab-ssd-business-sk-hynix-9-billion-dollars
- https://www.anandtech.com/Show/Index/17134?cPage=2&all=False&sort=0&page=1&slug=intel-sells-ssd-business-to-sk-hynix-as-new-subsidiary-solidigm

**축 B — 결과 정량·타이밍**
- https://news.samsung.com/global/samsung-electronics-announces-third-quarter-2017-results
- https://www.dramexchange.com/WeeklyResearch/Post/2/4834.html
- https://www.trendforce.com/presscenter/news/20170525-9765.html
- https://www.theregister.com/2018/11/23/ssd_market_q3fy18/
- https://blocksandfiles.com/2022/01/06/samsung-increasingly-dominates-enterprise-ssd-market-as-intel-fades/
- https://www.trendforce.com/presscenter/news/20190221-10105.html
- https://www.elinfor.com/news/nand-manufacturers-fight-through-2018-with-a-substantial-capacity-growth-and-a-17-revenue-reduction-p-11024
- https://www.eetimes.com/semiconductor-market-fell-11-9-in-2019-gartner-reports/

---

## §. 미확인 목록 (후속 검증 필요)

1. **삼성의 2011년(초기) eMMC 점유율 수치** — Gartner 2012·2013 데이터만 확보. 2010~2011 개별 연도 점유율(iSuppli/Gartner) 미확보.
2. **삼성의 JEDEC UFS 태스크그룹 의장/주도사 직접 문헌** — 보도자료 논평자 반복 등장이라는 정황만 확보. JEDEC 위원회 구성 원문 필요.
3. **HDD 업체(Seagate/WD)의 '모바일 피벗 실패'를 단정하는 1차 문헌** — 정황(PC 쇠퇴 대응·인수 연쇄)만 확보.
4. **시안 1기 총투자액** — 2012년 발표 $7B vs 후대(TrendForce 2023) $10.87B. 집계 기준 차이 원문 대조 못함.
5. **1Q16 32.4%(1위) vs 1Q17 Intel 1위·삼성 25%(2위)의 집계 기준** — 매출 vs 출하량 차이로 추정되나 TrendForce 원문 차단으로 미확인. "삼성이 2017~2019 내내 1위"라는 과제 전제와 상충 가능성 있음(3Q18은 매출 기준 38.5%로 1위 확인, 3Q19는 용량 기준 Intel과 동률 ~35%).
6. **PM983 정확한 출시/양산 일자** — CES 2018 시연 + NF1 8TB 보도자료(2018-06 추정, product brief 문서번호 1806)까지만 확인.
7. **2017 연간 NAND 산업 매출 및 삼성 연간 점유율(≈38% 설)** — 2018년 $63.2B(+10.9%)에서 역산한 ~$57B만 확보.
8. **AWS·Google·Microsoft·Facebook 개별 퀄/공급 계약의 당대(2015~2018) 보도** — 미발견. OCP·Project Denali 참여 등 간접 증거만.
9. **2015~2016년 DRAMeXchange/TrendForce의 "삼성, NAND 캐파를 엔터프라이즈 SSD로 전환" 명시 논평 원문** — 미확보. 3Q17 삼성 공식 실적 코멘트가 가장 이른 직접 증거.
10. **Micron·Intel의 2012~13 'PC·엔터프라이즈 중심 NAND 전략' 직접 서술** — 미확보.
11. **원문 직접 확인 전반** — 프록시 차단으로 Seagate IR·JEDEC·Samsung Newsroom·TrendForce 원문 미열람. 본 노트 전 항목이 사실상 검색 요약 경유 등급.
