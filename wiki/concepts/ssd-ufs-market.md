# SSD · UFS · 모바일 메모리 시장
**수집일**: 2026-05-07
**출처**: NVIDIA·Micron·Samsung Semiconductor 기술 블로그, TrendForce, Mordor Intelligence, Intel Market Research, Verified Market Reports, abit.ee, TechInsights, Blocks & Files

---

## 1. Enterprise SSD 시장 — AI·클라우드 폭발

### 시장 규모

| 지표 | 2025 | 2030~2031 | CAGR | 출처 |
|------|------|-----------|------|------|
| 글로벌 Enterprise SSD 매출 | **$32B** (265 EB 용량) | — | — | [Intel Market Research](https://www.intelmarketresearch.com/enterprise-ssd-for-ai-market-40989) |
| Enterprise SSD 시장 (보수~공격) | $22~36B | — | 15.5% | [Verified Market Reports](https://www.verifiedmarketreports.com/product/enterprise-ssd-market/) |
| 북미 Data Center SSD | **$16.74B** | **$69.08B** (2031) | **27.6%** | [Mordor Intelligence](https://www.mordorintelligence.com/industry-reports/north-america-data-center-ssd-market) |

### 인터페이스 점유 (Generation Mix)

| 인터페이스 | 점유 | 비고 |
|----------|------|------|
| PCIe Gen3/Gen4 | 점진 축소 | 레거시 |
| **PCIe Gen5** | **양산 주력** (2025~) | PM1753 (Samsung), 9550 (Micron) |
| **PCIe Gen6** | **2026 진입** | PM1763 (Samsung 28.4 GB/s), Micron 9650 |
| PCIe Gen7 | 2027~2028 | NVIDIA 단일 SSD 1억 IOPS 목표 |

- PCIe 인터페이스 전체 SSD 시장 85% 점유 (2017년 30%→) — [Intel Market Research](https://www.intelmarketresearch.com/enterprise-ssd-for-ai-market-40989)
- 하이퍼스케일러가 Enterprise SSD 매출의 **60%** (2024) → 65% (2025) — [동일 출처](https://www.intelmarketresearch.com/enterprise-ssd-for-ai-market-40989)
- AI 워크로드가 SSD 수요 성장의 **40%** 기여 — [동일 출처](https://www.intelmarketresearch.com/enterprise-ssd-for-ai-market-40989)

---

## 2. AI SSD 경쟁 — NVIDIA Storage-Next 생태계

### IOPS 경쟁 — 기술 도약 곡선

| 시점 | 이벤트 | 성과 / 목표 | 출처 |
|------|--------|-----------|------|
| 2025-11 (SC'25) | **Micron 9650 × 44개 + SCADA** | **2.3억 IOPS** (역대 최고, 단일 서버) | [Micron Blog](https://www.micron.com/about/blog/storage/ssd/sc25-performance-breakthrough-230m-iops-in-a-single-server) |
| 2025-12 | 개별 SSD (Micron 9650) | **540만 IOPS** | [Blocks & Files](https://blocksandfiles.com/2025/11/25/scada-nvidia/) |
| 2026 GTC | Samsung PM1763 시연 | NVIDIA SCADA 워크로드 | [Samsung GTC 2026](https://news.samsung.com/global/samsung-unveils-hbm4e-showcasing-comprehensive-ai-solutions-nvidia-partnership-and-vision-at-nvidia-gtc-2026) |
| 2026~2027 | **SK하이닉스 AI-N P** (NVIDIA 공동 개발) | **2,500만 → 1억 IOPS** | [TrendForce](https://www.trendforce.com/news/2025/12/11/news-sk-hynix-reportedly-aims-100-million-iops-with-ai-nand-by-2027-in-collaboration-with-nvidia/) |
| 2027 | **Kioxia** (NVIDIA 공동 개발) | **1억 IOPS** (단일 SSD) | [Kioxia](https://blocksandfiles.com/2025/09/15/kioxia-100-million-iops-ssd-nvidia/) |
| **삼성전자** | (생태계 참여) | **목표 미공개** ⚠️ | — |

### NVIDIA AI SSD 파트너 매트릭스

| 업체 | NVIDIA 파트너십 단계 | NAND 타입 | 양산 시점 |
|------|----------------------|-----------|----------|
| **Micron** | **최초 레퍼런스 (9650 Gen6)** ✅ | TLC | 양산 중 (540만 IOPS) |
| **SK하이닉스** | **공동 개발 (AI-N P)** ✅ | **SLC** (2,500만→1억 IOPS) | 2026~2027 |
| **Kioxia** | 공동 개발 ✅ | SLC | 2027 (1억 IOPS) |
| **삼성전자** | **생태계 참여** (PM1763 시연) ⚠️ | TLC (Gen6) | **공식 SLC AI SSD 로드맵 미공개** |

> **시사점**: NVIDIA Storage-Next 핵심 파트너 자리를 **SK·Kioxia·Micron**이 선점. 삼성은 후행. SLC NAND 기반 초고 IOPS 로드맵 부재가 가장 큰 정보 공백 ⚠️.

---

## 3. NVIDIA CMX(Context Memory Storage Platform) 공급 구조

### 채택 SSD

| 제품 | 인터페이스 | 성능 | NVIDIA 채택 |
|------|------------|------|-------------|
| **Samsung PM1753** | PCIe Gen5 (TLC V8) | **순차읽기 14.5 GB/s, 랜덤 3.3M IOPS** | **CMX 공식 공급** ✅ |
| **Samsung PM1763** | PCIe Gen6 (NVMe 2.1) | **28.4 GB/s 읽기·21.9 GB/s 쓰기, 4~16TB** | **양산 개시 (2026-07-08)** — "차세대 AI 플랫폼 검증 완료" 공식 발표 (아래 [Update 2026-08-16] 참조) |

- PM1753은 NVIDIA Vera Rubin GTC 2026에서 CMX 첫 공식 공급 SSD로 확정 — 즉각 매출 인식 가능
- BlueField-4 DPU 출하(2026 H2) 이후 PM1753 → PM1763 전환 타이밍 관리 필요

---

## 4. UFS · LPDDR5X — 모바일 메모리

### UFS (Universal Flash Storage) 현황

| 세대 | 시점 | 주요 채택 | 점유 메이커 |
|------|------|-----------|-------------|
| UFS 3.1 | 2020~2023 | 미드레인지 스마트폰 | Samsung·SK·Micron·Kioxia |
| **UFS 4.0** | 2023~2025 양산 | **삼성 갤럭시 S24·S25**, 플래그십 | Samsung 점유 50%+ (TechInsights) |
| **UFS 4.1** | **2026 일부 플래그십** | iPhone 18 Pro 등 — **갤럭시 S26은 UFS 4.0 잔류(삼성 확인, 아래 정정)** | 신규 진입 |
| UFS 5.0 | 2027+ 목표 | — | JEDEC 표준 작업 |

### 가격·수요 변동

| 지표 | 2025 평균 | **2026 H1** | 변동 | 출처 |
|------|-----------|-------------|------|------|
| UFS 4.1 1TB 단가 | baseline | **+80~90% YoY** | AI 메모리 부족 전이 | [abit.ee](https://abit.ee/en/smartphones/lpddr5x-ufs-41-memory-prices-flagship-smartphones-16gb-ram-2026-en) |
| LPDDR5X 16GB | baseline | **+80~90% YoY** | 동일 | 동일 출처 |
| 플래그십 표준 | 12GB+512GB | **16GB + 1TB UFS 4.1** | 용량 2배 증가 | 동일 출처 |

### 시장 구조

- 모바일 메모리(LPDDR + UFS) 시장은 **Samsung·SK·Micron** 3강 (CXMT LPDDR5X-10667 시연으로 가시화 중)
- 2026 H1: 메모리 부족이 서버 → 모바일로 전이, 스마트폰 BOM 부담 ↑
- 분석가 전망: **2026 Q4부터 신규 capex 가동으로 부족 완화** ([Global Semi Research](https://globalsemiresearch.substack.com/p/2026-memory-industry-insights))

---

## 5. NAND 시장 — Data Center 비중 폭증

### 데이터센터 NAND 매출 비중 (벤더별)

| 벤더 | DC NAND 비중 (FY2025) | 비고 | 출처 |
|------|----------------------|------|------|
| **Micron** | **56%** ✅ (역대 최고) | 데이터센터 부문이 전체 매출의 56% | [Futurum Group](https://futurumgroup.com/insights/micron-q4-fy-2025-earnings-top-estimates-on-dram-and-hbm-strength/) |
| Samsung | **비공개** ⚠️ | NAND P&L 분리 미공개 | — |
| SK하이닉스 | 비공개 (대다수 추정) | 2025 NAND 321단 QLC 양산 | SK IR |

### NAND 신노드 진척

| 벤더 | 현세대 | 차세대 | 시점 |
|------|--------|--------|------|
| Samsung | V8 (236L), V9 TLC/QLC | **V10 (430L BV NAND)** | 2026 H2 |
| SK하이닉스 | 238L | **321L QLC** | 양산 중 (2025) |
| Micron | 232L | 276L (G9) | 2025~2026 |
| YMTC | 232L | **294L** | 2025 양산 (제재에도 유지) |

---

## 6. 삼성전자 전략 시사점

### 즉각적 수혜
- **PM1753**: NVIDIA CMX 공식 공급으로 매출 인식 시작
- **PM1763**: PCIe Gen6 28.4 GB/s — **2026-07-08 양산 개시 확정** (시연→양산 전환 완료)

### 구조적 위협
- **SLC AI SSD 로드맵 부재**: SK·Kioxia가 NVIDIA Storage-Next 핵심 파트너 고착화 위험
- **NAND DC 비중 비공개**: Micron 56% 대비 외부 평가 불리
- **UFS 4.1 가격 급등**: 호황기 매출 호조이나, 2026 Q4 이후 capex 가동 시 가격 조정 가능

### 외부 가시성 회복 액션
- 2026 H2 SCADA 호환 SLC AI SSD 로드맵 공개 → SK·Kioxia 추격
- NAND 사업부 P&L 분리 (HBM SD-1 패턴 확장) → DC 비중 외부 가시화

---

## 출처

- [NVIDIA CMX 공식](https://www.nvidia.com/en-us/data-center/ai-storage/cmx/)
- [Micron SC'25 — 2.3억 IOPS](https://www.micron.com/about/blog/storage/ssd/sc25-performance-breakthrough-230m-iops-in-a-single-server)
- [SK hynix — 1억 IOPS AI NAND (TrendForce)](https://www.trendforce.com/news/2025/12/11/news-sk-hynix-reportedly-aims-100-million-iops-with-ai-nand-by-2027-in-collaboration-with-nvidia/)
- [Kioxia — 1억 IOPS SSD](https://blocksandfiles.com/2025/09/15/kioxia-100-million-iops-ssd-nvidia/)
- [Samsung GTC 2026 PM1763 시연](https://news.samsung.com/global/samsung-unveils-hbm4e-showcasing-comprehensive-ai-solutions-nvidia-partnership-and-vision-at-nvidia-gtc-2026)
- [Mordor — 북미 DC SSD 시장](https://www.mordorintelligence.com/industry-reports/north-america-data-center-ssd-market)
- [Intel Market Research — Enterprise SSD for AI](https://www.intelmarketresearch.com/enterprise-ssd-for-ai-market-40989)
- [abit.ee — UFS 4.1 + LPDDR5X 가격 +80~90%](https://abit.ee/en/smartphones/lpddr5x-ufs-41-memory-prices-flagship-smartphones-16gb-ram-2026-en)
- [TechInsights — Smartphone Memory Q2 2023](https://www.techinsights.com/blog/smartphone-memory-market-share-q2-2023-demand-grows-ufs-40-and-lpddr5x-chips)
- [Global Semi Research — 2026 Memory Insights](https://globalsemiresearch.substack.com/p/2026-memory-industry-insights)
- [Futurum — Micron Q4 FY2025 (DC 56%)](https://futurumgroup.com/insights/micron-q4-fy-2025-earnings-top-estimates-on-dram-and-hbm-strength/)
- [Blocks & Files — NVIDIA SCADA](https://blocksandfiles.com/2025/11/25/scada-nvidia/)
- 내부 연계: [nvidia-cmx-scada.md](../entities/nvidia-cmx-scada.md), [nand-process-transition.md](nand-process-transition.md)

---

## [Update 2026-05-19 II] 권석준 — 애플 온디바이스 AI 진입 시 거대 폭풍 + 일본 폼팩터 실패 교훈

### 애플 온디바이스 AI 시장 진입

권석준 진단:
- 애플이 **에너지 효율 무기로 온디바이스 AI 시장 본격 등판** 가능성
- 스마트폰 폼팩터에 최적화된 **새 메모리 규격 등장** 가능
- 기존 LPDDR·UFS 시장 압도하는 대격변

### 일본 폼팩터 실패 교훈

- 권석준: "일본 반도체가 망한 이유 중 하나 = **폼팩터 전환기를 놓침**"
- 한국도 동일 위험 — 슈퍼사이클 정점에 LPDDR·UFS 새 폼팩터 전환을 놓치면 동일 결과

### 함의 — 삼성의 약점·강점

- **약점**: SLC AI SSD 로드맵 미공개 (NVIDIA Storage-Next 전략 파트너 SK·Kioxia·Micron 선점)
- **잠재 강점**: 갤럭시·노트북 LPDDR·UFS에서 삼성이 최대 점유 → 애플 온디바이스 AI 진입 시 폼팩터 표준 주도 가능
- **위험 신호 모니터링**: 애플 온디바이스 AI 발표 시점·메모리 규격 — 신규 EWI 후보

**출처**: [youtube-kwon-agentic-ai-memory-2026-05-01.md](../../sources/articles/youtube-kwon-agentic-ai-memory-2026-05-01.md)

---

## [Update 2026-08-15] 역사 축 신설 — 삼성 SSD·UFS 사업사 (2006~2026)

> 본 페이지가 2025~26 시황만 다뤄 온 공백을 메운다. 근거: 전용 리서치 노트 ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)).

### 삼성 SSD 사업 3단계 연표

**1기 — 응용처 개척 (2006~2009)**: 세계 최초 32GB SSD 탑재 PC(2006-05) → 1.8" 64GB 양산(2007-06) → **1차 치킨게임 한복판의 밀도 3연타** — 256GB MLC 발표(2008-05, "자체 컨트롤러로 MLC에서 SLC급 성능" 명시 = SLC→MLC 전환+컨트롤러 내재화의 공식 기점)·128GB 양산(2008-07)·256GB 양산(2008-11) ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)).

**2기 — 소비자 브랜드 구축 (2010~2014), 2차 다운턴과 정면 중첩**: 첫 브랜드 SSD 470(2010-08) → **830(2011) — NAND·컨트롤러(MCX)·DRAM 캐시·펌웨어 전 컴포넌트 자체화를 리뷰 매체들이 "유일 제조사"로 일제 기록** → **840(2012-10) — 세계 최초 TLC 소비자 SSD**(MDX 컨트롤러, 다운턴 중 저원가 TLC로 가격대 인하) → 840 EVO(2013-07, MEX·TurboWrite) → **V-NAND 세계 최초 양산 + 첫 V-NAND SSD(2013-08)** → 850 PRO(2014-07, 세계 최초 V-NAND 소비자 SSD)·850 EVO(2014-12). 결과: **2013 전체 SSD 점유 28.5% 1위(Gartner)** ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)). 컨트롤러 계보: MCX(2011)→MDX(2012)→MEX(2013).

**3기 — 엔터프라이즈 전환·1위 (2015~)**: PM863/SM863 DC SATA(2015) → 950 PRO 첫 소비자 NVMe(2015) → **PM1633a 15.36TB 세계 최대 용량(2016-03)** → **1Q16 enterprise SSD 32.4%로 1위 등극**(2위 16.9%) → SmartSSD CSD(2020-11, Xilinx FPGA)·ZNS SSD(2021-06)·PM9A3 E1.S(2021-03) → **PM1743 — 업계 최초급 PCIe Gen5 eSSD(2021-12 발표, 2022 Q1 양산)** → 990 PRO(2022-10) → PM1753 Gen5(CMX 공급)·PM1763 Gen6(§2·3 참조) ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)).

### UFS — "세계 최초" 연쇄와 eMMC 전환 주도

| 시점 | 삼성 액션 | 의미 |
|---|---|---|
| 2015-01 | **업계 최초 UFS 2.0 128GB 양산** → 갤럭시 S6(2015-04) 탑재 | 세계 최초 UFS 스마트폰 상용화 — eMMC→UFS 세대 전환 개시점 |
| 2016~ | eMMC→UFS 잠식 본격화 | 2016년 이전 모바일 스토리지는 사실상 전부 eMMC |
| 2019-01 / 2019-02 | 세계 최초 1TB eUFS 2.1 / 최초 512GB eUFS 3.0 양산 | 테라바이트 모바일 + 폴드 세대 |
| 2020-03 | 최초 512GB eUFS 3.1 양산 | 스마트폰 스토리지 최초 1GB/s 돌파 |
| 2022-05 | 업계 최초 UFS 4.0 개발 (Q3 양산) | 갤럭시 S23 세대~, 점유 50%+ (§4 참조) |
| **2026-06** | **업계 최속 UFS 5.0 공개 — 순차 읽기 10.8GB/s·쓰기 9.5GB/s(4.0의 2배+), 전력효율 +40%, 양산 2026 Q4 계획** | **온디바이스 AI 타깃 명시** — §4의 UFS 4.1 다음 수 확정 |

JEDEC 표준 이정표: UFS 3.0 2018-01-30·4.0 2022-08-17·4.1 2025-01-08 (JEDEC 1차 확인). 스마트폰 메모리(DRAM+NAND 합산) 매출 점유율: 1Q23 50% 1위 → 2Q24 49% 1위(TechInsights) — UFS 단독 시계열은 미공개 ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)).

### 점유율 시계열 (구간 보강)

| 시점 | 세그먼트 | 삼성 | 비고 |
|---|---|---|---|
| 2013 | 전체 SSD | **28.5% 1위** | Gartner — 브랜드 구축기의 배당 |
| 1Q16 | Enterprise SSD | **32.4% 1위 등극** | 2위 16.9% — 이후 1위 유지 기조 |
| **1Q23** | Enterprise SSD | **$801M (QoQ -55%)** | 3차 다운턴 최저점 — 북미 서버 재고 조정 |
| 3Q24 | Enterprise SSD | $3.2B 1위 | 회복 |
| 4Q25 | Enterprise SSD | $3.66B·33.8% 1위 | QoQ +49.7% |
| **1Q26** | Enterprise SSD | **$7.05B·38.2% 1위** | QoQ +92.8% — 아래 실측 절 참조 |

## [Update 2026-08-15 II] 1Q26 실측 반영 + 경쟁 구도 재편

### Enterprise SSD 1Q26 — Top5 $18.46B 사상 최대, 삼성 1위 수성

- Top5 합산 **$18.46B (QoQ +86.1%)**: **삼성 $7.05B·38.2% 1위**(QoQ +92.8%) > SK그룹(하이닉스+Solidigm) $4.64B·25.1% > Micron $3.09B·16.7% > Kioxia $2.22B·12.0% > SanDisk $1.47B·8.0% ([enterprise-ssd-market-1q26-2026-08.md](../../sources/articles/enterprise-ssd-market-1q26-2026-08.md))
- 계약가 분기 +80%(공급 제약)·재고 사상 최저. **분기 점유 변동성 큼**(4Q25 삼성 33.8% ↔ SK그룹 30.2%) — 특정 분기 단독 인용 지양, 연환산 ~$74B는 쇼티지 가격이 부풀린 수치 ([enterprise-ssd-market-1q26-2026-08.md](../../sources/articles/enterprise-ssd-market-1q26-2026-08.md))
- §2의 "삼성 SLC AI SSD 로드맵 부재" 진단은 유지 — 1위는 **범용 eSSD 물량·가격의 1위**이며, AI SSD 니치(SCADA SLC·초고 IOPS)의 레퍼런스 경쟁과는 별개 트랙이다.

### 경쟁 구도 — 다운턴이 재편한 스토리지 지형 3건

**① SK–Solidigm: 정점 매수 → 손실 → QLC 반전** — 인텔 NAND 인수 계약(2020-10, 총 $9B) → 1단계 $7B 종결(2021-12-29, **NAND 다운사이클 진입 직전 정점 매수**) → 2022 Q4 SK 10년 만의 분기 적자, 2023 H1 그룹 영업손실 ~$4.49B의 약 80%가 NAND → **122TB QLC eSSD(2024-11) → 2024 인수 후 첫 연간 흑자, SK+Solidigm QLC eSSD 점유 42%(2024)→51% 전망(2025)** → 2단계 $1.9B 종결(2025-03) → Solidigm 미국 AI 투자 비히클 분리 보도(2026-01) ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)). 타이밍은 최악이었으나 자산(고용량 QLC)·시장(AI DC) 정합이 회복시킨 사례.

**② WD–SanDisk: 통합 9년 만의 해체** — 2015-10 $19B 인수 발표(HDD 1위의 NAND 수직 통합 시도) → 2016 종결 → **2023-10 플래시 분사 결정(3차 다운턴 한복판)** → 2025-02 Sandisk(SNDK) 독립 상장 ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md)). HDD·NAND 시너지 가설의 공식 철회.

**③ Micron: 소비자 철수·DC 집중** — 2025-12-03 Crucial 소비자 사업 철수 공식 발표(약 30년 만의 리테일 종료), 사유를 "AI DC 수요 급증에 따른 캐파의 고마진 엔터프라이즈 재배치"로 명시 ([samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md), [enterprise-ssd-market-1q26-2026-08.md](../../sources/articles/enterprise-ssd-market-1q26-2026-08.md)). Kioxia는 2024-12 IPO 후 베인 전량 엑시트(2026-07, 이익 $15B+).

### 전략 시사점 추가 (기존 §6 보강)

- **다운턴 중 니치 육성의 사내 성공 선례 확보**: 2차 다운턴(2010~13) 한복판의 소비자 SSD 브랜드 구축(830 풀 자체화→840 세계 최초 TLC→2013 전체 SSD 1위)은, 3차 다운턴의 HBM 니치 배제(✕)와 정반대의 **성공한 "다운턴 중 니치→주류 전환"**이다. AI SSD(SCADA) 대응의 사내 벤치마크는 멀리 있지 않다 — CMO 매트릭스 참조.
- **소비자 SSD 지형 변화**: Micron 철수·Sandisk 독립으로 소비자 SSD는 삼성 대 중국·대만 모듈 메이커 구도로 재편 중 — 브랜드 수성 비용 대비 가치의 재평가 필요.
- **UFS 5.0 양산(2026 Q4)이 온디바이스 AI 폼팩터 전환의 선점 수** — §[Update 2026-05-19 II] 권석준의 "폼팩터 전환기를 놓치면 일본 꼴" 경고에 대한 실행 응답.

---

## [Update 2026-08-16] 탑재(Design Win) 축 — NVIDIA 서버·AI PC에 삼성 SSD

> 근거: 전용 리서치 노트 ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)). 프록시 차단으로 검색 요약 경유가 다수 — 항목별 신뢰도는 노트에 표기.

### NVIDIA 서버 축 — PM1763 양산 전환 + CMX "스펀지" 수요

- **PM1763 양산 개시 (2026-07-08 공식 발표)** — 9세대 V-NAND + 4nm 컨트롤러, 4/8/16TB, 16TB 기준 순차 읽기 28,400·쓰기 21,900 MB/s(PM1753 대비 2배+), 액체 냉각 최적화. 공식 인용: **"차세대 AI 플랫폼 검증(validation)을 성공적으로 완료"** — 단 "Vera Rubin 공식 채택"은 매체 해석이며 삼성 공식 문구는 여기까지다(최종 통합은 OEM·인증 시스템 디자인 의존) ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
- **CMX 물량 구조** — 1유닛 = SSD 576개·9,600TB. CMX향 NAND 수요 추정 **2026년 3,500만 TB → 2027년 1억+ TB** ("NAND 시장에 Apple급 수요원이 하나 더" 비유, 분석가 "Rubin CMX는 스펀지처럼 NAND를 흡수" 인용) ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
- **삼성 V-NAND 캐파의 CMX 배정 60%+ 보도** — V9 중심 월 10만 장+ 캐파의 약 60%를 NVIDIA向 배정, V10 양산·NVIDIA 공급 개시 + V11(최대 500단) 개발 병행("낸드 동맹 확대") — 한국 매체 원문 접근 불가로 재인용 확인(Med), 소비자 SSD 공급 크런치 우려 병행 보도 ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
- **시황 임팩트** — Vera Rubin 램프가 TLC NAND 공급을 압박, 512Gb TLC 웨이퍼 스팟가 6월 슬럼프 후 8월 $21 회복(+4.97% 주간, TrendForce 실측) ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).

### AI PC·온디바이스 축 — DGX Spark 실탑재 확인

- **PM9E1** (2024-10 양산) — "AI 응용에 최적인 업계 최고 성능 PC SSD", PCIe 5.0 8채널, **자체 5nm 'Presto' 컨트롤러(삼성 파운드리) + 8세대 V-NAND**, 순차 14,500/13,000 MB/s ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
- **NVIDIA DGX Spark(GB10 데스크톱 AI 슈퍼컴퓨터) 4TB 모델에 PM9E1 M.2 2242 실탑재** — 분해로 실물 확인(모델 MZALC4T0HBL1-00B07), 펌웨어가 DGX Spark OS·CUDA에 최적화·SPDM v1.2 지원 보도. **데이터센터(CMX·Vera Rubin)에 이어 개인용 AI 기기에서도 삼성이 NVIDIA 스토리지 공급사임이 실물로 확인된 design win** ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
- **PM9E1 2242 파생** — 세계 최초 M.2 22×42mm 양면 4TB Gen5, CES 2026 Innovation Award honoree — 공간 제약형 AI PC·컴팩트 AI 기기 타깃. **9100 PRO 8TB**는 소비자 Gen5를 "AI 컴퓨팅·워크스테이션"으로 공식 포지셔닝 ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).
- **정정** — 갤럭시 S26(2026-03)은 **UFS 4.0 잔류**(1TB 모델 4.1 루머를 삼성이 부인, 4.0↔4.1 인터페이스 대역폭 동일) — 본 페이지 §4 표의 기존 전망을 정정함 ([samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md)).

### 시사점 갱신

- **탑재 임팩트의 구조**: NVIDIA 스토리지 계층 전체(서버 CMX Gen5 → Vera Rubin Gen6 → 개인용 DGX Spark Gen5 클라이언트)에서 삼성 SSD가 공급 지위를 확보 — §2의 "AI SSD 후행" 진단은 **SLC 초고 IOPS(SCADA Storage-Next) 트랙에 한정**되며, 범용·CMX·클라이언트 축에서는 오히려 선두다. 두 트랙을 구분해 읽어야 한다.
- **캐파 배정의 양면**: NAND 캐파 60%+ NVIDIA 배정(보도 기준)은 매출 락인이자 **단일 고객 집중 리스크**(RS-4 단일 고객 ≤25% 원칙과 긴장) — 소비자 SSD 크런치와 함께 4차 다운턴 대비 관점에서 계약 커버리지·만기 구조 확인 필요.
- **미확인 잔여**: PM1753 CMX 공급 물량·매출 수치, CMX 경쟁사 진입 여부, 서버 OEM(Dell·HPE 등)의 삼성 eSSD 명시 채택, PM9E1의 갤럭시 북 탑재 — 후속 수집 대상.

---

## [Update 2026-08-16 II] 시장 전환기 전략 축 — PC→모바일→데이터센터, 삼성은 어떻게 움직였나

> 근거: 전용 리서치 노트 ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)). 프록시 차단으로 전 항목이 검색 요약 경유 등급(다수 매체 교차 일치 여부는 노트에 명기) — 수치 인용 시 유의.

### 전환기 ① PC→모바일 (2010~2015) — "레거시 매각 + 표준 창설"

- **HDD 사업 매각의 계약 구조 (2011)**: 발표 2011-04-19, Seagate에 **$1.375B** 매각(종결 2011-12-20). 대가는 **현금 50% + Seagate 주식 50%**(지분 약 9.6% + 이사회 1석), 그리고 같은 계약에 **"삼성 NAND → Seagate SSD 공급" 크로스-서플라이 조항**이 포함 — 레거시(회전 매체)에서 exit하면서 동시에 자사 NAND의 신규 판로를 심은 구조였다 ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).
- **수요 역전의 실측**: IHS 2013 — 스마트폰이 NAND 최대 소비처 등극(**스마트폰 24.6% > SSD 20.6%**, 태블릿 11.4% — 모바일 합산 ~36%). Gartner 2013 — 삼성 eMMC+eMCP **$3.317B·35.6% 1위**, 상위 4사 합계 95.4% ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).
- **UFS 표준 창설**: JEDEC UFS 1.0 2011-02-24 → 2.0 2013-09-18 (MIPI M-PHY·UniPro 참조). SSD(SCSI/UAS)식 command queuing을 모바일에 이식한 설계로, eMMC 지배자였던 삼성이 **자기 시장을 스스로 대체하는 차세대 표준**을 주도 — JEDEC 발표마다 삼성 임원(Kenny Han 등)이 대표 논평자로 반복 등장(의장사 여부는 미확인), 세계 최초 양산(2015-01)으로 회수 ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).
- **경쟁사 대비**: HDD 진영(Seagate·WD)은 스마트폰 내장 스토리지에 진입 자체가 불가한 채 PC 쇠퇴를 맞아 인수 연쇄(WD: 히타치→STEC→…→2015 SanDisk $19B)로 뒤늦게 플래시 전환 — 삼성만이 쇠퇴 자산을 **정점 부근에서 현금화**하고 성장 축으로 갈아탔다.

### 전환기 ② 모바일→데이터센터 (2014~2019) ★ — "캐파 선행 베팅 + 인터페이스 세대 선점"

**전략 4수** (시점 순):

| 수 | 액션 | 시점 | 성격 |
|---|---|---|---|
| 1 | **시안 팹 — V-NAND 전용 캐파 선행 베팅**: 2012 발표($7B) → 2012-09 착공 → **2014-05-09 V-NAND 양산 개시** → 2기 $7B 발표(2017-08-30, 월 20K→65K) → 2019-12 +$8B | 수요 폭발 **3~5년 전** | 캐파 |
| 2 | **NVMe 인터페이스 선점**: XS1715 — **업계 최초 NVMe 엔터프라이즈 SSD**(2013-07 공개, 2013-05-31 UNH-IOL NVMe 인증 1호, 최초 U.2 채택). Intel 첫 NVMe(DC P3700)는 2014-Q2로 **약 1년 후행** | 시장 형성 전 | 기술 표준 |
| 3 | **제품 사다리의 타깃 언어 이동**: PM953(2015, 저전력 DC) → PM963(2016, "data center") → NGSFF 16TB·1U 576TB(2017-08, "hyperscale") → PM983 NF1 8TB(2018-06, "hyperscale") | 2015→2018 | 제품 |
| 4 | **클라우드 표준 침투**: 2018-03 Microsoft **Project Denali**(클라우드 SSD 펌웨어 표준) 창립 파트너 — 하이퍼스케일러 개별 공급계약은 비공개라 보도 부재, OCP·표준 활동이 간접 증거 | 2018~ | 생태계 |

**전환 의도의 직접 증거**: 삼성 3Q17 공식 실적 자료 — NAND에서 "**datacenter NVMe SSD 등 고부가가치·고밀도 시장 수요에 적극 대응**", 전망에서 "서버 SSD 채택 가속" 명시. 같은 분기 DRAMeXchange도 NAND 성장 동인을 "smartphone **and server**"로 병기 — 서버가 스마트폰과 동급 수요축으로 격상된 당대 표현 ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).

**결과 — 이겼지만 단선적이지 않았다**:

| 시점 | 결과 | 기준 |
|---|---|---|
| 3Q17 | 분기 영업이익 **14.53조 원 사상 최대**(YoY +9.33조) — 데이터센터 수요가 명시 동인 | 실적 |
| 1Q17 | **Intel 1위, 삼성 2위(25%)** — 1Q16 32.4% 1위와 상충 가능(매출 vs 출하 집계 차이 추정, 미확인) | eSSD 출하량 |
| 3Q18 | **삼성 38.5% 1위 vs Intel 18.3%** — 역전 확대 | eSSD 매출 |
| 3Q19 | Intel ≈ 삼성 각 ~35% 동률 | eSSD 용량 |
| 4Q18~2019 | NAND 산업 매출 4Q18 QoQ -16.8%, **2019 연간 -23.1%** — 삼성 4Q18 매출 QoQ -28.9%, 서버 고객 재고조정이 동인의 하나 | 다운턴 |
| 3Q21~ | 삼성 eSSD 출하 과반 — "Intel fades" | 확정 |

즉 "2017~2019 내내 압도적 1위"는 집계 기준에 따라 흔들리는 서사이며(1Q17 출하량 기준 Intel 1위), **최종 승부는 Intel의 자멸로 확정**됐다: Optane 베팅(2015 발표 → 2017-03 첫 제품 → **2022 청산, 재고 손상 $559M**) + NAND 사업 SK 매각(2020-10, $9B). NVMe 규격을 설계한 Intel이 제품화에서 삼성에 1년 뒤졌고, 차세대 베팅(3D XPoint)은 생태계를 만들지 못했다 ([samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md)).

### 전환기 플레이북 — 3차 전환(AI·CMX)에 주는 시사

두 전환에서 반복된 삼성의 승리 공식은 4요소로 정리된다:

1. **레거시 exit + 판로 심기** — HDD 매각에 NAND 공급 조항 동반 (전환기 ①)
2. **자기잠식을 두려워하지 않는 표준 창설** — eMMC 지배자가 UFS를 주도 (전환기 ①)
3. **수요 폭발 3~5년 전의 전용 캐파 베팅** — 시안 V-NAND (전환기 ②)
4. **인터페이스 세대 선점** — NVMe 1호 인증, Intel보다 1년 선행 (전환기 ②)

현재 진행 중인 3차 전환(범용 DC → AI 스토리지)에 대입하면: §[Update 2026-08-16]의 **CMX·PM1763·PM9E1 축은 요소 3·4를 재실행 중**(V9 캐파 60%+ 배정 = 캐파 베팅, Gen6 28.4GB/s = 인터페이스 선점)이다. 반면 **SLC 초고 IOPS(SCADA Storage-Next) 트랙은 요소 2(자기잠식형 표준 창설)의 공백** — 과거 UFS를 만들던 방식으로 AI SSD 표준(초고 IOPS 계층)을 주도할지가 미결이다. 그리고 Intel의 교훈은 역방향 경고다: **규격을 만들고도 제품화가 늦으면 진다**. 다운턴 관점 연결은 [CMO 매트릭스 §5](../storyline/cmo-matrix.md) 참조 — 전환발(③) 다운턴 시나리오에서 이 플레이북의 실행 여부가 O를 가른다.

**미확인 잔여** (노트 §미확인 11건 중 핵심): 1Q16↔1Q17 점유율 집계 기준 상충, 시안 1기 투자액 $7B vs $10.87B 불일치, 하이퍼스케일러 개별 공급의 당대 보도 부재, "캐파를 eSSD로 전환" DRAMeXchange 명시 논평 원문.
