# 삼성 SSD·UFS 사업사 + 경쟁사 스토리지 전략사 — 웹 리서치 노트

**수집일**: 2026-08-15
**수집 방법**: 레포 기존 자료(`wiki/concepts/ssd-ufs-market.md`, `wiki/concepts/nand-process-transition.md`, `sources/articles/captive-ssd-fdp-context-2026-08.md`, `sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md`, `wiki/storyline/cmo-matrix.md`) 재확인 후 공백을 웹 검색으로 보강. 교차 매체: StorageReview·The SSD Review·AnandTech·Tom's Hardware·TechPowerUp·phys.org·JEDEC 보도자료·TrendForce·TechInsights·Blocks & Files·SK hynix Newsroom·Solidigm Newsroom·SEC 공시(WD·Sandisk 8-K)·Micron IR·KED Global·Gizmodo·Legit Reviews·BetaNews·StorageNewsletter·ServeTheHome·Forbes 등.
**수집 목적**: SSD·UFS 축 보강 — `wiki/concepts/ssd-ufs-market.md`(현재는 2025~26 시황만 보유)와 CMO 매트릭스(`wiki/storyline/cmo-matrix.md`, 현재 SSD·UFS 단편 6건)의 역사 축 근거. 다운턴 3개 창(2007~09·2010~13·2022~23)·대비기 3개 창(2005~07·2009 H2~2010·2020~22 H1)에 걸리는 SSD·UFS 액션에 `[다운턴 창: N차 대응]` `[대비기 창: N차]` 태그 부여.
**신뢰도**: Medium~High (다수 항목이 동시대 보도 2개 이상 교차. 삼성 도메인(news.samsung.com·semiconductor.samsung.com)은 프록시 상황에 따라 검색 요약 경유 — 해당 항목 표기. 매체 간 수치 상이 시 병기. 1차 확인 실패 항목은 §7 미확인 목록)

> CLAUDE.md §7 Research Agent 규칙 준수 — 해석·전략 판단 없음. 사실만 기록.
> 기존 위키와의 중복 회피: 1Q26 enterprise SSD 삼성 38.2%·Top5 $18.46B, PM1753/PM1763·SCADA/CMX, UFS 4.1 가격 급등(+80~90%), 2006 32GB SSD·2007 64GB SSD·2010 470·2011 HDD 매각·2021 PM9A3·2022 UFS 4.0 개발은 기존 문서 보유 — 본 노트는 참조만 하고 재수집하지 않음.

---

## 축 1 — 삼성 SSD 사업사 (2005~2026)

### 1-A. 초기 (2006~2009) — NAND 응용처 개척과 MLC 전환

- **2006-05-24: 세계 최초 32GB NAND SSD 탑재 PC(Sens Q30PLUS·Q1)** — 기존 수집 (`samsung-pre-downturn-preparation-2005-2022-2026-08-08.md` §1-D). `[대비기 창: 1차]`
- **2007-06: 업계 최초 1.8" 64GB SSD 양산** — 기존 수집 (동 문서). `[대비기 창: 1차]`
- **2008-05-25: 세계 최고속 2.5" 256GB MLC SSD 개발 발표** (제5회 Samsung Mobile Solution Forum) — SATA II, 순차 읽기 200MB/s·쓰기 160MB/s, 두께 9.5mm, 활성 전력 0.9W, MTBF 100만 시간. "자체(proprietary) 컨트롤러 기술의 대폭 진전으로 MLC 기반이면서 SLC급 속도·신뢰성" 명시 — **SLC→MLC 전환 + 자체 컨트롤러 내재화가 공식 서술에 동시 등장한 최초 시점**. 샘플 2008-09, 양산 2008년 말 계획 (Gizmodo 2008-05·SlashGear·Legit Reviews). `[다운턴 창: 1차 대응]`
- **2008-07: 128GB MLC SSD 양산 보도** (TechCrunch 2008-07-09). `[다운턴 창: 1차 대응]`
- **2008-08: 고성능 저용량 SATA II SSD(8/16/32/64GB) 발표** (phys.org 2008-08). `[다운턴 창: 1차 대응]`
- **2008-11: 256GB SSD 양산 개시** (phys.org 2008-11 "Samsung Now Producing 256GB Solid State Drives"). **DRAM -85%·NAND 폭락의 1차 치킨게임 한복판에서 SSD 최고 밀도 라인업을 계속 출시**한 기록. `[다운턴 창: 1차 대응]`
- 같은 창의 인접 사실(기존 수집): 2008-09 SanDisk $5.85B 인수 제안 → 2008-10-22 철회 (`cmo-matrix.md`).

### 1-B. 소비자 SSD 브랜드 구축 (2010~2014) — 2차 다운턴 창과 정면 중첩

- **2010-08 말: 첫 브랜드 소비자 SSD "470 시리즈" 소매 출시** — 기존 수집 (`samsung-pre-downturn-preparation-...` §2-D). `[대비기 창: 2차]`
- **2011-08 중순: 830 시리즈 발표 → 2011-10 중순 출시** — 2.5" SATA III, 64~512GB. **컨트롤러(트리플코어 ARM9 기반 MCX, S4LJ204X01)·NAND(2x nm Toggle MLC)·캐시 DRAM(256MB)·펌웨어 전부 삼성 자체 부품** — 리뷰 매체들이 "fully developed in-house"로 일제히 기록 (AnandTech·StorageReview·bit-tech·Vortez·PCR 2011-09). `[다운턴 창: 2차 대응]`
- **2012-09 말(SSD Global Summit 발표)~2012-10 중순 글로벌 출시: 840 / 840 PRO 시리즈** — **840은 세계 최초 TLC(3-bit MLC) NAND 소비자 SSD**. MDX 컨트롤러(3코어 ARM Cortex-R4, 300MHz). 840 PRO는 2-bit MLC 고성능형 (The SSD Review·StorageReview·PC Perspective 2012-10·삼성 뉴스룸 — 삼성 도메인은 검색 요약 경유). **다운턴 중 저원가 TLC로 소비자 시장 가격대를 끌어내린 액션**. `[다운턴 창: 2차 대응]`
- **2013-07: 840 EVO 출시** — TLC + MEX 컨트롤러(400MHz), TurboWrite(SLC 버퍼) 도입 (StorageReview 2013-07·Guru3D·Custom PC Review). `[다운턴 창: 2차 대응]`
- **2013-08: 세계 최초 V-NAND(24단) 양산 발표 + 첫 V-NAND 기반 SSD(엔터프라이즈용)** — 동시대 보도 다수이나 본 수집에서 1차 원문 재확인은 부분적 (§7 미확인 1). `[다운턴 창: 2차 대응(말기)]`
- **2014-07-01: 850 PRO 출시 — 세계 최초 3D V-NAND(32단 2-bit) 소비자 SSD** (phys.org 2014-07·Legit Reviews·AnandTech "Enter the 3D Era"). 128GB~1TB.
- **2014-12: 850 EVO 출시 — 32단 3-bit(TLC) V-NAND** — 53개국 글로벌 출시. 일부 매체는 10월 발표로 표기, 리뷰 게재는 2014-12 집중 (Softpedia·Slashdot 2014-12-08·The SSD Review — 출시월 매체 간 상이, 병기).
- **2015: 950 PRO — 소비자 시장 첫 NVMe SSD 도입** (삼성 반도체 기술 블로그 "Consolidation of the Consumer SSD Era" — 삼성 도메인, 검색 요약 경유).

### 1-C. 컨트롤러·펌웨어 내재화 연혁

- 컨트롤러 계보(소비자): **MCX(830, 2011) → MDX(840/840 PRO, 2012, 3코어 Cortex-R4 300MHz) → MEX(840 EVO, 2013, 400MHz)** — 동일 아키텍처의 진화 계열 (Guru3D·Custom PC Review·StorageReview). 이후 세대(Phoenix=970, Elpis=980 PRO, Pascal=990 PRO 등)의 코드네임은 리뷰 매체 통용 표기이나 본 수집에서 1차 교차 확인 실패 (§7 미확인 2).
- **"NAND·컨트롤러·DRAM 캐시·펌웨어 전 컴포넌트를 자체 개발·제조하는 유일 제조사"** 서술은 830(2011) 리뷰부터 일관 등장 (Notebookcheck·bit-tech). 2008-05 256GB MLC SSD 발표문에도 "proprietary controller technology" 명시 — **자체 컨트롤러는 최소 2008년부터 공식 서술, 풀스택(펌웨어 포함) 내재화 공식 확인은 2011년 830부터**. 그 이전(2006~07 1세대 SSD)의 컨트롤러 조달 구조는 미확인 (§7 미확인 3).

### 1-D. Enterprise SSD (PM 시리즈)와 세계 최초 기록

- **2015: PM863(읽기 중심)·SM863(쓰기 내구성) 데이터센터 SATA SSD 출시, V-NAND 기반** — 동시대 리뷰(StorageReview 2015) 존재하나 본 수집에서 출시월 1차 확인 부분적 (§7 미확인 4).
- **2015-08(FMS 공개) → 2016-03-03 출하 발표: PM1633a — 세계 최대 용량 15.36TB 엔터프라이즈 SAS SSD** — 48단 3세대 256Gb V-NAND 512개(16단 적층 512GB 패키지 × 32), 랜덤 읽기 200K IOPS, 순차 1,200MB/s, 2.5" (BetaNews 2016-03-02·TechPowerUp·StorageReview·삼성 뉴스룸 US). 전작 PM1633은 32단 128Gb V-NAND.
- **PM1725**: NVMe 고성능 라인 — 2015~16년 계열이나 본 수집에서 시점 1차 확인 실패 (§7 미확인 4).
- **2020-11: SmartSSD CSD(Computational Storage Drive) 발표 — Xilinx FPGA 탑재, 2021-01 일반 판매** (Forbes 2020-11-11·StorageReview·ServeTheHome). 2세대 SmartSSD는 2022년 AMD-Xilinx와 발표 (삼성 US 뉴스룸·ServeTheHome). `[대비기 창: 3차]`
- **2021-06-02: 첫 ZNS(Zoned Namespace) SSD(PM1731a) 발표** (StorageReview 등 — 모델명 1차 확인 부분적). `[대비기 창: 3차]`
- **2021-03: PM9A3 E1.S 데이터센터 SSD 양산** — 기존 수집 (`samsung-pre-downturn-preparation-...` §3-D). `[대비기 창: 3차]`
- **2021-12-23: PM1743 발표 — 업계 최초급 PCIe Gen5 엔터프라이즈 SSD** — 6세대 V-NAND, 순차 읽기 13,000MB/s·쓰기 6,600MB/s, 1.92~15.36TB, 2.5"·E3.S, 전력효율 608MB/s/W(Gen4 대비 약 30% 개선), **양산 2022 Q1** (Tom's Hardware 2021-12·StorageReview·StorageNewsletter 2021-12-28·TechTimes). `[대비기 창: 3차]`
- **PM1753(Gen5, NVIDIA CMX 공급)·PM1763(Gen6 28.4GB/s)**: 기존 수집 (`ssd-ufs-market.md`) — 재수집 안 함.
- FDP 표준 공동 주도(2023, Meta·Google과): 기존 수집 (`captive-ssd-fdp-context-2026-08.md`) — 재수집 안 함.

### 1-E. 시장 점유율 시계열 (1Q26 이전)

| 시점 | 세그먼트 | 삼성 수치 | 출처 |
|---|---|---|---|
| 2013 연간 | 전체 SSD | **28.5% 1위** (Gartner) | Tom's Hardware·Trefis |
| 2014 H1 | 전체 SSD | 28% 1위 유지 | Trefis 2014-12 |
| 2015 연간 | Enterprise SSD | **20.6%** | 검색 요약 경유 (기관 미상 — §7 미확인 5) |
| 4Q15 | Enterprise SSD | 약 22% — 2위와 초접전 | 동일 |
| **1Q16** | Enterprise SSD | **32.4% 1위 등극** (2위 16.9%) | 삼성 뉴스룸 "Ranked No.1 in Enterprise SSD Market" — 삼성 도메인, 검색 요약 경유 |
| 1Q23 | Enterprise SSD 매출 | **$801M, QoQ -55%** | TrendForce 2023-06-01 |
| 3Q24 | Enterprise SSD 매출 | $3.2B 1위 | TrendForce 2024-12-11 |
| 4Q25 | Enterprise SSD | **$3.66B(+49.7% QoQ)·33.8% 1위** | TrendForce 2026-03-13·TechPowerUp |
| 1Q26 | Enterprise SSD | 38.2% 1위 — **기존 위키 보유, 재수집 안 함** | (`ssd-ufs-market.md` 참조) |

### 1-F. 3차 다운턴(2022~23) 중 SSD 행보

- **2022-08 발표 → 2022-10 출시: 990 PRO** — PCIe 4.0, 순차 읽기 7,450MB/s (Tom's Hardware 2022-08). **2022-10은 "인위적 감산 미고려" 선언(2022-10-27)과 같은 달** — 다운턴 진입기 플래그십 소비자 SSD 출시. `[다운턴 창: 3차 대응]`
- **시장 붕괴 정량**: enterprise SSD 시장 매출 3Q22 $5.22B → 4Q22 $3.79B(계약가 하락 확대) → **2023 상반기 "물량·가격 동반 급락으로 매출 반토막"** (TrendForce 2022-12-05·2023-03·2023-06-01). NAND 전체 매출 4Q22 QoQ -25%, 1Q23 -16.1% (TrendForce). `[다운턴 창: 3차 대응(환경)]`
- **삼성 enterprise SSD 매출 1Q23 $801M(-55% QoQ)** — 북미 고객 서버 출하 목표 하향·재고 조정이 원인으로 명시 (TrendForce 2023-06-01). `[다운턴 창: 3차 대응(환경)]`
- 회복: 4Q23 enterprise SSD 산업 매출 +47.6% QoQ (TrendForce 2024-03-07 — 보도문 표기 "$23.1B"는 타 분기 대비 자릿수 이상치, §7 미확인 6).
- 2023-04 감산 공식화·NAND 감산 폭 확대는 기존 수집 (`samsung-downturn-actions-2007-2023-2026-08-07.md` 참조) — 재수집 안 함.

---

## 축 2 — 삼성 UFS·모바일 스토리지 사업사 (2011~2026)

### 2-A. JEDEC UFS 표준 연혁

| 버전 | 제정/발표 | 확인 수준 |
|---|---|---|
| UFS 1.0 | 2011 (통설 2011-02) | 본 수집에서 JEDEC 1차 확인 실패 — 통설 (§7 미확인 7) |
| UFS 2.0 | 2013 (통설 2013-09) | 동일 |
| UFS 2.1 | 2016-04-04 업데이트 발표 | JEDEC 보도자료 |
| **UFS 3.0** | **2018-01-30** — M-PHY HS-Gear4, 레인당 11.6Gbps(전세대 2배) | JEDEC 보도자료 |
| UFS 3.1 | 2020-01 (JEDEC "Updates UFS" 계열 보도) | JEDEC — 월 표기 부분 확인 |
| **UFS 4.0** | **2022-08-17** — VCC 2.5V, 3.1/3.0 하위 호환 | JEDEC 보도자료 |
| **UFS 4.1** | **2025-01-08** — M-PHY 5.0 + UniPro 2.0, 대역폭 2배·읽기/쓰기 ~4.2GB/s | JEDEC·Business Wire 2025-01-08 |
| UFS 5.0 | M-PHY 6.0 + UniPro 3.0 참조 (JEDEC 문서 언급) — 제정일 미확인 | §7 미확인 7 |

- 삼성의 JEDEC 의장사 여부·표준화 기여 정량 기록: **미확인** (§7 미확인 8).

### 2-B. 삼성 양산 연혁 — "세계 최초" 연쇄

- **2015-01(생산 개시)~2015-02-26(발표): 업계 최초 UFS 2.0 128GB 양산** — "차세대 플래그십 스마트폰용" 명시, 랜덤 읽기 19,000 IOPS(eMMC 5.0의 2.7배), eMMC 5.1 대비 1.4배 — **갤럭시 S6(2015-04 출시) 탑재로 세계 최초 UFS 스마트폰 상용화** (Android Police 2015-02-26·fonearena·TechTimes·삼성 뉴스룸). **eMMC→UFS 세대 전환의 개시점**. 
- 2017: 車용 128GB eUFS(2017-09)·256GB eUFS 양산 (삼성 뉴스룸 — 검색 요약 경유).
- **2019-01: 세계 최초 1TB eUFS 2.1 양산** — 테라바이트급 모바일 스토리지 최초 (삼성 뉴스룸 — 검색 요약 경유).
- **2019-02-27: 업계 최초 512GB eUFS 3.0 양산** — 갤럭시 폴드 세대. 전세대 대비 속도 2배 서술 (Android Police·삼성 US 뉴스룸).
- **2020-03: 업계 최초 512GB eUFS 3.1 양산** — 쓰기 속도 eUFS 3.0의 3배, 스마트폰 스토리지 최초 1GB/s 돌파 (Electronics Weekly 2020-03·StorageNewsletter 2020-03-27).
- **2022-05: 업계 최초 UFS 4.0 개발(2022 Q3 양산 계획)** — 기존 수집 (`samsung-pre-downturn-preparation-...` §3-D) — 재수집 안 함. 갤럭시 S23(2023-02) 세대부터 플래그십 탑재. `[대비기 창: 3차]`
- UFS 4.1 제품·가격(2026): 기존 수집 (`ssd-ufs-market.md`) — 재수집 안 함.
- **2026-06-23~24: 업계 최속 UFS 5.0 솔루션 공개** — 순차 읽기 최대 10.8GB/s·쓰기 9.5GB/s(UFS 4.0 4.2GB/s의 2배 이상), 전력효율 +40%, 패키지 7.5×13×0.9mm(-16.7%), 최대 1TB, **양산 2026 Q4 계획, 온디바이스 AI 타깃 명시** (삼성 뉴스룸 글로벌·Androidheadlines·New Electronics·SoyaCincau 2026-06).

### 2-C. eMMC→UFS 구조 전환과 점유율

- **2016년 이전 모바일 주 스토리지는 사실상 전부 eMMC → 2016년부터 UFS가 잠식 시작** (QY Research "eMMC and UFS Research"). 삼성 자체 기술블로그도 "eMMC to UFS" 전환 서사 보유 (삼성 도메인 — 검색 요약 경유).
- **스마트폰 메모리(모바일 DRAM+NAND 합산) 매출 점유율(TechInsights)**: 1Q23 **50% 1위** → 2Q23 46% → 2Q24 49% 1위 — 2위 SK하이닉스, 3위 마이크론. **UFS 단독 점유율 공식 시계열은 미공개** — "UFS 4.0 점유 50%+"(TechInsights)는 기존 위키 보유 (`ssd-ufs-market.md`). (§7 미확인 9)

---

## 축 3 — 경쟁사 스토리지 전략사 (다운턴 관점)

### 3-A. SK하이닉스 — Solidigm(인텔 NAND) 인수: 정점 매수 → 손실 → QLC 반전

- **2020-10-19: 인텔 NAND·SSD 사업 인수 계약 — 총액 $9B, 2단계 구조** (SK hynix Newsroom·Munger Tolles·Baker McKenzie).
- **2021-12-29: 1단계 종결 — $7B 지급, 다롄 팹 + SSD 사업 인수, "Solidigm" 출범** (SK hynix Newsroom 2021-12·SiliconANGLE 2021-12-30). 일부 보도는 종결일 2021-12-20 표기 — 병기. **NAND 다운사이클(2022 H2~) 진입 직전 정점 매수의 타임라인**. `[대비기 창: 3차 — 경쟁사]`
- **2022~2023: 대규모 손실** — NAND 가격 2022~23 H1 50%+ 하락. **SK하이닉스 2023 H1 연결 영업손실 약 $4.49B 중 약 80%가 NAND 부문**, Solidigm 단독 2023 H1 매출 약 $0.91B·순손실 약 $1.6B (The Economy 2025-11 — 후행 정리, Medium 신뢰도). SK하이닉스 2022 Q4부터 10년 만의 분기 적자 (DCD). Solidigm 인수 후 수년 누적 손실 "수조 원" 서술 (동). `[다운턴 창: 3차 — 경쟁사]`
- **2024~25 반전**: 2024-11-13 업계 최대 122TB QLC eSSD(D5-P5336) 공개 — 61.44TB의 2배, AI 데이터센터 타깃, 2025 Q1 판매 (KED Global 2024-11-13·TrendForce 2024-11-14). **인수 후 첫 연간 흑자 2024년** — 업계 추정 2024 매출 약 9.3조 원·순이익 약 6,130억 원 (완성 수치는 추정치, Medium). **SK+Solidigm QLC eSSD 점유율 2024년 42% → 2025년 51% 전망** (업계 보도 경유). SK하이닉스 자체도 PS1012 U.2 61TB QLC 개발 (SK hynix Newsroom 2024-12).
- **2025-03-27: 2단계 종결 — $1.9B 지급, 인텔 NAND IP·R&D 인력 인수 완료 (누적 약 $8.9B)** (Tom's Hardware·evertiq 2025-04-01). 총액 "$9B" 표기와 실지급 합계($7B+$1.9B) 간 차이 병기.
- 2026-01: Solidigm을 미국 AI 투자 비히클로 분리(spin) 보도 (Blocks & Files 2026-01-28) — 후속 확인 필요.

### 3-B. Kioxia — 매각·JV·상장

- **2018: 도시바메모리 → 베인캐피털 컨소시엄에 $18B 매각** (아시아 최대 LBO. 컨소시엄에 Apple·Dell 참여). **SK하이닉스 출자 약 395억 엔× — 정정: 약 3,950억 엔(약 $3.5~3.7B, 임무 문서의 "$4B"와 병기)**, 의결권 15% 상한(2028년 이전) 조건 (TAdviser·BigGo·tradingkey — 출자액 환산치 매체 간 상이). 
- **WD(SanDisk)와의 JV 팹**: 욧카이치(四日市) NAND 팹을 1999년 이래 SanDisk(현 Sandisk)와 공동 소유·운영 + 기타카미(北上) 팹 — **기존 위키 보유** (`wiki/concepts/dram-market-share.md`의 JV 모델 분석) — 재수집 안 함.
- **2024-12: 도쿄증권거래소 상장(IPO)** — 이후 AI 붐으로 주가 상장가 대비 49배+ 급등(2026 중), 2026-07 베인 전량 매각 완료·이익 $15B+ (BigGo Finance 2026 — 후행 정리, Medium).
- 스토리지 완제품 측: NVIDIA와 1억 IOPS AI SSD 공동 개발(2027 목표) — 기존 위키 보유 (`ssd-ufs-market.md`) — 재수집 안 함.

### 3-C. Micron — 데이터센터 집중, 소비자 철수

- **9550(Gen5)·9650(Gen6, NVIDIA 최초 레퍼런스·540만 IOPS)**: 기존 위키 보유 (`ssd-ufs-market.md`) — 재수집 안 함.
- **2025-12-03: Crucial 소비자 사업 철수 공식 발표** — 소비자 채널 출하는 회계 2026 Q2 말(2026-02)까지, 이후 보증만 유지. **사유를 "AI 데이터센터 수요 급증에 따른 캐파의 고마진 엔터프라이즈·하이퍼스케일 재배치"로 명시**. Crucial 브랜드는 1996년 시작 — 약 30년 만의 소비자 리테일 종료 (Micron IR 2025-12-03·GlobeNewswire·TechPowerUp·Forbes 2025-12-07).

### 3-D. WD/Sandisk — HDD·NAND 통합과 해체의 왕복 (2015~2025)

- **2015-10-21: WD, SanDisk 인수 발표 — 약 $19B, 주당 $86.50(일부 매체 $86.10 표기 — 병기)** (TechCrunch 2015-10-21·Datacenter Knowledge·Cleary Gottlieb).
- **2016(3분기 캘린더): 인수 종결** — WD 8-K 프로포마 공시 (SEC). HDD 1위 업체의 NAND 수직 통합 시도.
- **2023-10: WD, 플래시(NAND) 사업 분리 방침 발표** — HDD 본체와 분리하는 스핀오프 (Sandisk Form 10-12B 계열 공시). **3차 다운턴 한복판의 구조 결정**. `[다운턴 창: 3차 — 경쟁사]`
- **2025-02-21: 분사 완료 → 2025-02-24 Sandisk Corp(SNDK) 나스닥 독립 상장** — WDC 주주에게 1/3주 배분(기준일 2025-02-12), 분사 파이낸싱 $3.5B (Sandisk 8-K 2025-02·MarketScreener·Cahill 2025-02-24). **2016 $19B 통합 → 2025 해체까지 약 9년** — 이후 AI 스토리지 랠리로 SNDK 주가 분사 후 4,000~6,000%+ 상승 보도 (Yahoo Finance·TIKR — 주가 수치는 시점 의존, 참고 수준).

---

## §4. 다운턴·대비기 창 매핑 요약 (CMO 매트릭스 투입용 — 사실 배열만)

| 창 | 삼성 SSD·UFS 액션 (본 노트 신규) | 경쟁사 액션 |
|---|---|---|
| 1차 대비기 (2005~07) | (기존 보유: 32GB SSD 2006-05, 64GB SSD 2007-06) | Apple NAND LTA 1.25B 선급(2005-11, 기존) |
| **1차 다운턴 (2007~09)** | **256GB MLC SSD 발표(2008-05)·128GB 양산(2008-07)·256GB 양산(2008-11) — 자체 컨트롤러 명시** | (기존 보유: SanDisk 인수 시도·철회 2008) |
| 2차 대비기 (2009 H2~2010) | (기존 보유: 470 소매 출시 2010-08) | — |
| **2차 다운턴 (2010~13)** | **830 풀 자체화(2011-08~10)·840 세계 최초 TLC(2012-09~10)·840 EVO(2013-07)·V-NAND 양산+첫 V-NAND SSD(2013-08)** — 소비자 SSD 브랜드 구축이 다운턴 창과 정면 중첩 | 엘피다 파산(2012-02, 기존) |
| 대비~회복기 (2014~16) | 850 PRO 세계 최초 V-NAND 소비자(2014-07)·850 EVO(2014-12)·UFS 2.0 세계 최초 양산(2015-01)·950 PRO 첫 소비자 NVMe(2015)·PM1633a 15.36TB(2016-03)·enterprise SSD 1위 등극(1Q16 32.4%) | WD, SanDisk $19B 인수(2015-10 발표→2016 종결) |
| 3차 대비기 (2020~22 H1) | SmartSSD(2020-11)·ZNS(2021-06)·PM1743 Gen5(2021-12) + (기존: PM9A3 2021-03, UFS 4.0 2022-05) | **SK: 인텔 NAND $9B 계약(2020-10)·1단계 $7B 종결(2021-12) — 다운턴 직전 정점 매수** / AWS Nitro SSD(2021-12, 기존) |
| **3차 다운턴 (2022~23)** | 990 PRO(2022-10) / 삼성 eSSD 매출 1Q23 $801M -55% QoQ / 시장: eSSD 4Q22 $3.79B·2023 H1 반토막 | **Solidigm 손실(SK 2023 H1 영업손실 $4.49B의 ~80%가 NAND)** / **WD 플래시 분사 결정(2023-10)** |
| 회복~현재 (2024~26) | UFS 5.0 공개(2026-06, 양산 2026 Q4 계획) + (기존: PM1753 CMX·PM1763 Gen6·1Q26 38.2%) | Solidigm 122TB QLC(2024-11)·2024 첫 흑자·QLC 점유 42→51% / Kioxia IPO(2024-12) / Sandisk 분사 완료(2025-02) / Micron Crucial 철수(2025-12) |

---

## §5. 원 링크

### 축 1 — 삼성 SSD
- https://gizmodo.com/blazing-samsung-256gb-ssd-is-the-one-weve-been-waiting-393198 (2008-05 256GB MLC)
- https://phys.org/news/2008-11-samsung-256gb-solid-state.html (2008-11 256GB 양산)
- https://phys.org/news/2008-08-samsung-high-performance-low-density-sata-ii.html
- https://techcrunch.com/2008/07/09/samsung-producing-128gb-ssds/amp/
- https://www.anandtech.com/show/4863/the-samsung-ssd-830-review (830 풀 자체화)
- https://www.storagereview.com/review/samsung-ssd-830-review-256gb
- https://www.thessdreview.com/our-reviews/samsung-840-series-240gb-ssd-review-the-worlds-first-tlc-ssd-takes-the-stage/ (840 세계 최초 TLC)
- https://pcper.com/2012/10/samsung-840-series-250gb-ssd-full-review-time-for-some-tlc/
- https://news.samsung.com/global/samsung-unveils-new-ssd-series (삼성 도메인 — 검색 요약 경유)
- https://www.storagereview.com/news/samsung-ssd-840-evo-released (840 EVO, MEX)
- https://www.guru3d.com/articles-pages/samsung-840-evo-ssd-benchmark-review-test,2.html (MCX→MDX→MEX 계보)
- https://phys.org/news/2014-07-samsung-branded-ssd-powered-3d.html (850 PRO 2014-07-01)
- https://www.anandtech.com/show/8216/samsung-ssd-850-pro-128gb-256gb-1tb-review-enter-the-3d-era/3
- https://news.softpedia.com/news/Samsung-Officially-Releases-850-EVO-Mainstream-SSDs-with-3D-V-NAND-466865.shtml (850 EVO)
- https://semiconductor.samsung.com/news-events/tech-blog/all-there-is-to-know-about-flash-memory-part3-samsung-electronics-brings-consumer-ssds-into-the-mainstream/ (950 PRO 첫 소비자 NVMe — 삼성 도메인, 검색 요약 경유)
- https://betanews.com/2016/03/02/samsung-1536tb-pm1633a-ssd/ (PM1633a)
- https://www.techpowerup.com/220551/samsung-introduces-worlds-highest-capacity-enterprise-ssd-15-36-tb
- https://news.samsung.com/us/samsung-introduces-worlds-largest-capacity-15-36tb-ssd-enterprise-storage-systems/ (삼성 도메인 — 검색 요약 경유)
- https://www.forbes.com/sites/tiriasresearch/2020/11/11/samsung-and-xilinx-build-a-super-smart-ssd/ (SmartSSD)
- https://www.servethehome.com/samsung-and-amd-xilinx-launch-2nd-gen-smartssd/
- https://www.tomshardware.com/news/samsung-unveils-pcie-gen5-enterprise-ssds (PM1743)
- https://www.storagenewsletter.com/2021/12/28/samsung-pm1743-pcie-5-0-2-5-inch-edsff-e3-s-up-to-15tb-ssd-with-6-gen-v-nand/
- https://www.tomshardware.com/news/samsung-990-pro-ssd-pcie4-launch (990 PRO 2022-10)
- https://www.tomshardware.com/news/client-ssds-outsell-client-hdds-by-2-6-times-in-q2 (클라이언트 1위 유지)
- https://www.trefis.com/stock/stx/articles/267133/where-does-seagate-stand-in-the-vast-ssd-market/2014-12-04 (2013 28.5% Gartner)
- https://news.samsung.com/global/samsung-electronics-now-ranked-no-1-in-enterprise-ssd-market (1Q16 32.4% — 삼성 도메인, 검색 요약 경유)
- https://www.trendforce.com/presscenter/news/20221205-11486.html (3Q22 $5.22B)
- https://www.techpowerup.com/305513/... (4Q22 $3.79B)
- https://www.trendforce.com/presscenter/news/20230601-11704.html (2023 H1 반토막·삼성 1Q23 $801M -55%)
- https://www.trendforce.com/presscenter/news/20240307-12064.html (4Q23 +47.6%)
- https://www.trendforce.com/presscenter/news/20260313-12967.html (4Q25 33.8%)

### 축 2 — UFS
- https://www.jedec.org/news/pressreleases/jedec-publishes-universal-flash-storage-ufs-ufshci-version-30-and-ufs-card (UFS 3.0 2018-01-30)
- https://www.businesswire.com/news/home/20250108099318/en/JEDEC-Announces-Updates-to-Universal-Flash-Storage-UFS-and-Memory-Interface-Standards (UFS 4.1 2025-01-08)
- https://www.jedec.org/standards-documents/focus/flash/universal-flash-storage-ufs
- https://www.androidpolice.com/2015/02/26/samsung-electronics-starts-mass-producing-industrys-first-128gb-universal-flash-storage-almost-certainly-galaxy-s6-bound/ (UFS 2.0 2015 양산)
- https://www.techtimes.com/articles/35652/20150226/samsung-begins-production-of-ufs-2-0-storage-for-smartphones-and-tablets-why-this-excites-technophiles.htm
- https://news.samsung.com/global/samsung-electronics-doubling-current-smartphone-storage-speed-as-it-begins-mass-production-of-first-512gb-eufs-3-0 (eUFS 3.0 2019-02 — 삼성 도메인, 검색 요약 경유)
- https://www.electronicsweekly.com/news/business/samsung-starts-mass-production-512gb-eufs-3-1-2020-03/ (eUFS 3.1 2020-03)
- https://www.storagenewsletter.com/2020/03/27/samsung-beginning-mass-production-of-up-to-512gb-eufs-3-1-components-for-smartphone-storage/
- https://news.samsung.com/global/samsung-unveils-industrys-fastest-ufs-5-0-solution-for-next-gen-on-device-ai-applications (UFS 5.0 2026-06 — 삼성 도메인, 검색 요약 경유)
- https://www.androidheadlines.com/2026/06/samsung-ufs-5-storage-chip-announcement-specs.html
- https://www.newelectronics.co.uk/content/news/samsung-presents-ufs-50-storage-targeted-at-on-device-ai-performance
- https://www.techinsights.com/blog/smartphone-memory-market-share-q1-2023-samsung-tops-ranking-50-percent-share (1Q23 50%)
- https://www.techinsights.com/blog/smartphone-memory-market-share-q2-2024-samsung-leads-ranking-strong-demand-drives-growth (2Q24 49%)
- https://www.qyresearch.com/news/11773/emmc-and-ufs (2016 eMMC→UFS 전환)

### 축 3 — 경쟁사
- https://news.skhynix.com/en/sk-hynix-completes-the-first-phase-of-intel-nand-and-ssd-business-acquisition/ (1단계 $7B 2021-12)
- https://siliconangle.com/2021/12/30/intel-completes-major-milestone-9b-sale-flash-business-sk-hynix/
- https://www.tomshardware.com/pc-components/ssds/intel-and-sk-hynix-close-nand-business-deal-intel-gets-usd1-9-billion-sk-hynix-gets-ip-and-employees (2단계 $1.9B 2025-03-27)
- https://www.bakermckenzie.com/en/newsroom/2025/04/intel-corp-usd-9b-divestiture (총액 $9B)
- https://economy.ac/news/2025/11/202511282986 (Solidigm 손실·2023 H1 — Medium)
- https://www.datacenterdynamics.com/en/news/sk-hynix-posts-first-loss-in-10-years-as-memory-market-struggles/
- https://www.kedglobal.com/korean-chipmakers/newsView/ked202411130015 (122TB eSSD 2024-11)
- https://www.trendforce.com/news/2024/11/14/news-sk-hynix-subsidiary-solidigm-unveils-industrys-highest-capacity-essd-available-in-early-2025/
- https://news.skhynix.com/en/sk-hynix-develops-ps1012-ssd-for-ai-data-centers/
- https://www.blocksandfiles.com/ai-ml/2026/01/28/sk-hynix-to-spin-solidigm-into-new-us-ai-investment-vehicle/4090437
- https://tadviser.com/index.php/Company:Kioxia_(formerly_Toshiba_Memory) (2018 베인 $18B·SK 출자)
- https://www.tradingkey.com/analysis/stocks/us-stocks/262094462-kioxia-largest-shareholder-skhynix-14-19-percent-toshiba-stake-cut-14-12-percent-tradingkey
- https://finance.biggo.com/news/5f156bc3-3627-48cd-8ec6-5581cd634f75 (베인 엑시트 $15B+ — Medium)
- https://investors.micron.com/news-releases/news-release-details/micron-announces-exit-crucial-consumer-business (2025-12-03)
- https://www.techpowerup.com/343633/micron-to-exit-crucial-consumer-business-ending-retail-ssd-and-dram-sales
- https://techcrunch.com/2015/10/21/western-digital-to-aquire-sandisk-for-19-billion (2015-10 $19B)
- https://www.sec.gov/Archives/edgar/data/0000106040/000010604016000044/exhibit993proforma.htm (2016 종결 8-K)
- https://www.sec.gov/Archives/edgar/data/2023554/000119312525019298/d919795dex991.htm (Sandisk 분사 8-K)
- https://press.spglobal.com/2025-02-19-SanDisk-Set-to-Join-S-P-SmallCap-600
- https://www.cahill.com/news/firm-news/2025-02-24-cahill-advises-financing-sources-on-35-billion-financing-for-sandisk-spinoff-from-western-digital (분사 완료 2025-02-21·거래 개시 02-24)

---

## §7. 미확인 목록 (후속 검증 필요)

1. **2013-08 V-NAND(24단) 세계 최초 양산 발표 + 첫 V-NAND SSD(엔터프라이즈)의 정확한 발표일·제품명** — 통설 수준, 1차 원문 재확인 실패
2. 소비자 SSD 컨트롤러 후기 코드네임(Phoenix=970·Elpis=980 PRO·Pascal=990 PRO 등)의 **1차 출처 교차 확인**
3. 2006~07 1세대 SSD(32GB·64GB)의 **컨트롤러 조달 구조**(자체 vs 외부)
4. **PM863/SM863 출시 정확월(2015)·PM1725 출시 시점** — 본 수집에서 1차 확인 부분적
5. 2015 enterprise SSD 20.6%·4Q15 약 22%의 **조사기관 확정**(검색 요약 경유)
6. TrendForce 2024-03-07 보도의 4Q23 enterprise SSD 산업 매출 표기 "$23.1B"의 **자릿수 정합**(전후 분기 $3~5B대와 불일치 — 원문 재확인 필요)
7. **UFS 1.0(2011)·2.0(2013) JEDEC 제정 정확일 + UFS 5.0 표준 제정일** — 통설 수준
8. 삼성의 **JEDEC UFS 표준화 의장사 여부·기여 정량**
9. **삼성 UFS 단독(모바일 NAND 완제품) 점유율 시계열** — TechInsights 수치는 모바일 DRAM+NAND 합산
10. Solidigm 2024 매출 9.3조 원·순이익 6,130억 원의 **확정 공시 수치**(현재 업계 추정)
11. SK하이닉스의 도시바메모리 컨소시엄 **출자액 확정**(약 3,950억 엔 vs $4B 보도 병기)
12. 2016 WD-SanDisk 인수 **종결 정확일**(2016 3분기 캘린더 — 5월 12일 통설, 1차 확인 실패)
