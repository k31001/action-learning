# 데이터센터 QLC eSSD 연혁 — 2022년 하이퍼스케일러 대용량 QLC 수요의 배경과 "2022 vs 2026" 스펙·특성 비교 — 웹 리서치 종합 (2026-09-17)

**수집일**: 2026-09-17
**유형**: 웹 검색 기반 2차 자료 종합 (벤더 발표·제품 브리프 인용 보도·TrendForce·Meta 엔지니어링 블로그 인용 보도·전문지 리뷰)
**용도**: QLC eSSD 전략 보고서(outputs/report/qlc-ssd-strategy-report.md 예정) 1장(2022년 수요 배경)·2장(2022 vs 2026 스펙 비교) 데이터 기반
**신뢰도 표기**: ✅확인(1차 페이지 직접 열람) / 🟡보도 인용(검색 결과·전문지·벤더 보도 요약에서 확인) / ⚠️추정·미확인
**수집 환경 주의**: 본 수집 세션에서는 네트워크 egress 프록시가 모든 외부 도메인(solidigm.com·micron.com·trendforce.com·engineering.fb.com·storagereview.com 등)의 직접 열람(WebFetch)을 차단하여 **1차 페이지 직접 확인(✅)이 불가능**했다. 따라서 모든 수치는 검색 엔진이 반환한 원문 발췌·전문지 보도 요약에 근거한 🟡 등급이 상한이며, 이후 lint에서 1차 페이지 재확인을 권고한다.

**핵심**: 데이터센터 QLC eSSD는 2018년 Intel D5-P4320(64단 QLC, 7.68TB, PCIe 3.1)에서 출발해 2021년 D5-P5316(144단, 30.72TB, PCIe 4.0, E1.L로 "1U에 1PB")로 대용량 노선을 확립했고, 2022년은 (a) Intel NAND 사업의 SK hynix 매각 완료(2021-12-29)와 Solidigm 출범, (b) Meta·Microsoft 주도 OCP E1.S 사양·Meta+Google 공동의 NVMe FDP(TP4146, 2022-12 비준) 등 **하이퍼스케일러 주도 표준화**, (c) 2H22 NAND·eSSD 계약가 급락(4Q22 eSSD −25% QoQ)으로 QLC $/TB 매력이 커진 **전환기**였다. 그러나 2022년 당시 하이퍼스케일러 실수요는 재고 조정으로 오히려 약했고, QLC eSSD 출하가 실제로 폭증한 것은 AI 추론 서버의 전력 효율이 핵심 우선순위가 된 2023→2024(TrendForce: 2024년 QLC eSSD 30EB, 2023 대비 4배)이다. 2026년 현재는 245TB급(Micron 6600 ION G9 QLC, 2026-05 출하; Kioxia LC9 2Tb 다이 32단 스택)·PCIe 5.0·E3.S/E3.L·0.3~1.0 DWPD·30W(0.12 W/TB)로 진화했고, 수요 성격도 "CDN·오브젝트 스토리지의 HDD 대체"에서 "AI 데이터 레이크·추론(RAG·KV cache)·nearline HDD 부족 대체"로 바뀌었으며, HDD가 2026년 물량 완판·리드타임 52주+ 상황이라 대용량 SSD 리드타임도 약 1년에 이른다.

---

## §1. 데이터센터 QLC eSSD 제품 타임라인 (2018–2026)

| 출시 시점 | 벤더 / 제품 | 최대 용량 | NAND (세대·단수·다이) | 인터페이스 | 폼팩터 | DWPD / 내구성 | 전력(활성/유휴) | 성능(순차 R/W, 랜덤 R/W) | 근거·신뢰도 |
|---|---|---|---|---|---|---|---|---|---|
| 2018-Q3 (PRQ 2018-07-13) | Intel D5-P4320 | 7.68TB (U.2) | 64단 QLC 3D NAND (TLC 대비 셀당 33% 비트↑) | PCIe 3.1 x4 | U.2 2.5" | 12.3 PBW (≈0.9 DWPD·5년 ⚠️환산) | 15W / 5W | 3,200 / 1,000 MB/s; 427K / 36K IOPS | Intel ARK·STH·AllAboutCircuits 🟡 |
| 2020-12 발표 → 2021-H1 출하 | Intel D5-P5316 (현 Solidigm) | 15.36 / 30.72TB | **144단 QLC** (업계 최초) | PCIe 4.0 x4 | U.2 15mm, **E1.L** | "0.5 DWPD"급 판매 표기, 최대 22.9 PBW 급(⚠️ 원 브리프 미열람) | 미확인 | 최대 7 GB/s / 3.6 GB/s (STH·StorageReview: 6.8 GB/s·800K IOPS 발표치) | KitGuru(2020-12)·StorageReview·Solidigm 브리프 인용 🟡 |
| 2019-09 (Accelerate 2019) | Pure Storage FlashArray//C (DirectFlash QLC 모듈) | 시스템 4.2PB (효과 용량) | QLC DirectFlash Module (벤더 자체 모듈) | — (어레이) | DFM | — | — | e2e 지연 2~4ms (디스크 어레이 대비 빠름) | StorageNewsletter·TechTarget 🟡 |
| 2023-05 | Micron 6500 ION (TLC 대조군) | 30.72TB | **232단 TLC** ("QLC 가격, TLC 성능" 포지셔닝) | PCIe 4.0 | U.3 15mm, E1.L 9.5mm | 1.0 DWPD(순차) / 0.3 DWPD(랜덤) | 미확인 | 6.8 / 5 GB/s; 1M / 200K IOPS | Micron IR·Tom's HW 🟡 |
| 2023-07 | Solidigm D5-P5336 | 30.72TB(출시 시) → **61.44TB**(2023 하반기, 세계 최초) | **192단 QLC** | PCIe 4.0 x4 | U.2/U.3, E1.L, E3.S(2024 초) | 61.44TB 0.58 DWPD (213 PBW) / 7.68TB 0.42 DWPD | 25W(활성 쓰기) / 5W | 7 / 3.3 GB/s | TechPowerUp·Architecting IT·STH 🟡 |
| 2024-07 | Samsung BM1743 | **61.44TB** (U.2, PCIe 4.0) | **176단(7세대 V-NAND) QLC** | PCIe 4.0(U.2) · PCIe 5.0(E3.S) | U.2, E3.S | **0.26 DWPD** (전작 BM1733 0.18) · 전원차단 보존 3개월(전작 1개월) | 미공개 | 7,200 / 2,000 MB/s; 1.6M / 110K IOPS | Blocks & Files·Tom's HW·STH 🟡 |
| 2024-08 (FMS 2024 전시) | Samsung BM1743 122.88TB | 122.88TB | 176단 QLC | PCIe 5.0 | U.2/E3.S | 미확인 | 미공개 | 7.5 / 3 GB/s; 1.6M / 45K(16KB) IOPS | SamMobile·AnandTech 🟡 — 2026-09 현재 출하 여부 ⚠️미확인 |
| 2024-09-12 | Samsung 9세대 QLC V-NAND 양산 (다이 레벨) | 1Tb 다이 | **286단**, 28.5 Gb/mm² (전세대 QLC 대비 +86%) | — | — | — | — | — | Samsung 뉴스룸 인용(HPCwire·EW) 🟡 |
| 2024-11-21 발표 → 2025-Q1~Q2 출하 | Solidigm D5-P5336 122.88TB | **122.88TB** | 192단 QLC | PCIe 4.0 x4 | U.2, E1.L, E3.S | **0.6 DWPD** (134.3 PBW, "5년 랜덤 쓰기 무제한" 마케팅) | 25W(max) / <5W | 7,000 / 3,300 MB/s | StorageNewsletter·TechPowerUp·Tom's HW 🟡 |
| 2024-11-22 (고객 인증 개시) | Micron 6550 ION (TLC 대조군) | 61.44TB | G8 232단 TLC | **PCIe 5.0** | **E3.S 7.5mm**(업계 최초 60TB급), U.2, E1.L | 미확인 | ≤20W(활성) / 4W(L1 유휴), 최대 25W | 14,000 / 7,000 MB/s; 2M / 70K IOPS | Micron 블로그·STH·StorageNewsletter 🟡 |
| 2025-07-23 발표, 2025-H2 샘플링 | Kioxia LC9 | **245.76TB** | **BiCS8 2Tb QLC 다이 ×32단 스택(패키지 8TB)** | PCIe 5.0 (x4 또는 dual x2), NVMe 2.0 | 2.5", **E3.L** | **0.3 DWPD** | 미확인 | 12,000 / 3,000 MB/s; 1.3M / 80K IOPS | Kioxia 보도자료 인용(StorageNewsletter·STH·HPCwire) 🟡 — GA 시점 ⚠️미확인 |
| 2025-08-05 (FMS 2025) → 2026-H1 U.2 출시 예정 | SanDisk UltraQLC 256TB / SN670 128TB | 256TB, 122.88TB | **BiCS8 2Tb QLC 다이**, CBA(218단) | PCIe 5.0, NVMe 2.0, OCP 2.5 | U.2 (후속 폼팩터 2026-H2) | 미공개 | DFS(동적 주파수 스케일링)로 동일 전력 +10% 성능(예상) | 128TB: 경쟁 128TB Gen5 QLC 대비 랜덤 R +68%·W +55% 주장 | SanDisk 보도자료 인용·Tom's HW·B&F 🟡 — 실제 출하 ⚠️미확인 |
| 2026-05-05 출하 | **Micron 6600 ION 245TB** | **245.76TB** (30.72·61.44·122.88TB 동시) | **G9 QLC** (6-plane, NAND I/O 3.6 GB/s) | PCIe 5.0 x4 | E3.L 9.5mm, U.2 15mm (122TB 이하 E3.S) | **1.0 SDWPD(128K 순차) / 0.3 RDWPD(16K 랜덤)** | **<30W(max) / <5W(유휴)** → 0.12 W/TB(max), 0.47 W/TB(유휴 측정·StorageReview) | 13,700 / 3,000 MB/s; 1.78M / 42K IOPS | Micron 보도자료 인용(TechPowerUp·GlobeNewswire)·StorageReview·STH 🟡 |
| 2026-07-08 | Samsung PM1763 (참고: TLC·PCIe 6.0) | 미확인 | 9세대 V-NAND | **PCIe 6.0** | 미확인 | — | — | 28,400 / 21,000 MB/s | Samsung 뉴스룸 인용 🟡 — QLC 여부 ⚠️미확인(성능 프로파일상 TLC로 추정) |

- 독해: 용량 리더십은 Solidigm(61TB 2023-07 → 122TB 2024-11)이 선행, 245TB급 첫 상용 출하는 Micron(2026-05). 삼성은 61TB 1년 후발(2024-07), 122TB는 전시 단계에서 2026년 176단 QLC 대량 출하로 전환(§4). 다이 밀도는 1Tb(Solidigm 192단·Samsung 286단) → **2Tb(Kioxia/SanDisk BiCS8)** 로 넘어가며 245TB급을 가능하게 했다.
- TrendForce(2025-09/10 보도 인용 🟡): 2Tb QLC 칩 2026년 양산이 nearline SSD 원가 하락의 핵심.

## §2. 2022년 수요 배경 — 하이퍼스케일러가 대용량 QLC를 요구하게 된 이유

### §2.1 2022년의 실제 시장 상황 (정정적 사실)
- **2H22 NAND·eSSD 가격 급락**: TrendForce 3Q22 NAND 계약가 −8~13%(2022-07-19 보도), 4Q22 NAND −15~20% 전망(2022-09-26), **4Q22 eSSD 계약가 −25% QoQ**, 4Q22 eSSD 매출 $3.79B(−27.4% QoQ), 4Q22 NAND 총매출 $10.29B(−25% QoQ). 원인은 PC·스마트폰 수요 둔화와 **데이터센터 재고 조정** 🟡 (TrendForce 2022-09-26·2022-12-05·2023-03-17, TechPowerUp 인용).
- 즉 2022년은 "하이퍼스케일러 QLC 주문 폭증"의 해가 아니라, **QLC $/TB가 크게 내려가고 표준·폼팩터·호스트 인터페이스가 정비된 준비기**였다. 하이퍼스케일러 CapEx는 2022년 분기당 약 $36B(MS·Alphabet·Amazon·Meta 합계) 수준이었고, 2026-1Q $129.8B로 3.6배 증가 🟡 (Epoch AI·DCD 등 인용). 2022년은 ChatGPT 출시(2022-11)의 해로, 이후 AI 학습 데이터셋 중앙값이 2022년 1,050억 → 2023년 7,500억 데이터포인트로 6배 이상 증가 🟡 (WD 블로그 인용).

### §2.2 공급측 논리 — Intel/Solidigm의 "1U에 1PB"·HDD 대체 TCO
- D5-P5316(30.72TB E1.L): **1U에 1PB**. 4TB HDD로 1PB를 채우면 2U×10(=20U) 필요 → **랙 집적 최대 20배** 🟡 (Solidigm 제품 브리프·Storage Field Day 자료 인용).
- Solidigm QLC vs HDD(Ceph 기준) 5년 TCO: **47% 절감**(랙 공간·에너지·인건비·폐기), 전력은 하이브리드 HDD 환경 대비 저용량 32.9% ~ 고용량 79.5% 우위 🟡 (Solidigm "Exabyte Storage Numbers Don't Lie" 인용). 다른 Solidigm 자료는 "과잉 프로비저닝 어레이를 전량 QLC로 교체 시 서버 ~5배 통합·TCO 최대 42% 절감" 🟡 — 두 수치는 시나리오가 달라 병기.
- D5-P5336 122TB(2024-11): 30TB TLC 대비 **TB/W 3.4배**, NAS 환경 저장 전력 최대 84% 절감, TLC+HDD 하이브리드 9랙 → 전량 QLC 1랙 🟡 (Solidigm 뉴스룸 인용·StorageNewsletter).
- 2022-10 OCP Summit에서 Solidigm은 61.44TB D5-P5336(192단 QLC, E1.L/U.2)을 "업계 최고 밀도 PCIe 드라이브"로 예고 🟡 (StorageNewsletter OCP 2022 recap·Forbes Coughlin 2022-10-20).
- Solidigm은 2018년 QLC 출하 개시 이후 누적 **120EB+** QLC 출하(2025-10 기준) 🟡 (Blocks & Files 2025-10-09 인용).

### §2.3 수요측 논리 — Meta의 "QLC 계층" 논거 (2022~2025에 걸쳐 공식화)
- **HDD의 TB당 대역폭 하락**: HDD는 용량이 늘어도 IOPS/대역폭이 늘지 않아 BW/TB가 계속 떨어짐. Meta는 **"10 MB/s/TB 대역(16~20TB HDD 시절 수준)"** 을 요구하는 워크로드를 QLC가 HDD와 TLC 사이의 고유 구간에서 흡수한다고 설명 🟡 (Meta Engineering 2025-03-04 "A case for QLC SSDs in the data center", The Register·Techzine·SSD Guy 인용).
- **3계층 구조**: HDD(대용량 20~30TB/드라이브, 최저 성능) — **QLC SSD(용량 계층, 64~150TB/드라이브, 중간 성능)** — TLC SSD(성능 계층, 8~16TB/드라이브) 🟡 (Meta 2024-03 블로그 인용·SSD Guy).
- **밀도·전력 목표**: QLC 기반 서버의 바이트 밀도 목표는 TLC 서버의 **6배**; NAND 전력 대부분이 쓰기에서 발생하므로 읽기 중심 워크로드는 QLC로 전력 절감 기대. 단 "QLC가 TLC보다 싸지만 광범위 배치를 위해선 아직 가격 경쟁력이 더 필요" 🟡 (Meta 2025-03 인용).
- **폼팩터**: Meta·Microsoft가 OCP Datacenter NVMe SSD 사양 주도, E1.S를 차기 OCP 플랫폼 표준으로 지정(Kioxia·Meta·Microsoft 공동 백서) 🟡; OCP 2022에서 Meta Grand Canyon(72 드라이브 4OU HDD 스토리지, 노드당 E1.S 2개) 공개 🟡 (Next Platform·STH·Wiwynn). 2025-10 OCP에서 Meta는 **1PB·80W E2 폼팩터** 비전 발표(2.5" 폼팩터 2026 말부터 퇴장 전망) 🟡 (STH 2025-11-03·StorageReview).
- **Pure Storage 설계 승리**: Meta는 Pure DirectFlash Module(150TB, 곧 300TB, Micron G8 232단 QLC 인증)·DirectFlash 소프트웨어를 하이퍼스케일 표준 스토리지에 채택(2024-12 발표, 특정 하이퍼스케일러 2EB 출하) 🟡 (Blocks & Files 2024-12-04·2025-04-07).

### §2.4 호스트-SSD 인터페이스 표준화 — 2022년이 분기점
| 기술 | 표준 시점 | 주도 | QLC와의 관계 | 신뢰도 |
|---|---|---|---|---|
| Multi-stream (Streams Directive) | NVMe 1.3, 2017-06 | Samsung 등 | 수명별 스트림 분리 초기 시도, 채택 제한 | 🟡 |
| ZNS (Zoned Namespaces) | 2020-06 비준 (NVMe 2.0 계열), 1.1은 2021-06 | WD 등 | 호스트 관리 순차 쓰기, 소프트웨어 스택 부담 큼 | 🟡 |
| **FDP (TP4146)** | **2022-12-22 비준** | **Meta + Google** (각자 개발하던 방식을 통합) | WAF ~3 → ~1에 근접, 과잉 프로비저닝 회피 → **QLC 수명·성능 한계 완화의 핵심** | 🟡 (NVMe 조직·B&F 2023-08-14·Samsung 테크블로그 인용) |
- Google(Chris Sabol)·Meta(Ross Stenfort) OCP 발표: WA 감축이 CapEx/OpEx에 미치는 영향의 데이터센터 사례 최초 공개 🟡. Silicon Motion OCP 2024 블로그: "AI 타깃 대용량 QLC SSD에서 FDP 활성화의 도전" 🟡.

### §2.5 시장 데이터 — QLC eSSD 출하·점유 전망
- TrendForce 2024-04-23: **2024년 QLC eSSD 비트 출하 30EB, 2023 대비 4배**(→ 2023 ≈7.5EB ⚠️역산). 배경: **AI 추론 서버의 에너지 효율이 핵심 우선순위**로 부상하며 북미 고객 주문 증가; 당시 QLC 인증 보유는 **Solidigm·Samsung 2사**뿐, 최대 용량 64TB; 4Q23 eSSD 점유 Samsung 40%+, SK그룹(SK hynix+Solidigm) 32%; Solidigm은 QLC 주문 증가로 2H24 144단 생산 확대 🟡.
- Forward Insights(보도 인용): QLC 점유 2025년 30%, 엔터프라이즈 QLC 채택 2023년 10% → 2026년 35% 🟡 — 원 보고서 미열람, 정의(비트 vs 매출) ⚠️미확인.
- E1.S: PCIe 폼팩터 합산 EB 점유 2022년 7.2% → 2027년 25.9%, 유닛 8% → 40.4% 전망 🟡 (Kioxia/Meta/Microsoft 백서 인용).
- TrendForce 2025-09-15: AI 추론으로 **nearline HDD 리드타임 수 주 → 52주+**, QLC SSD가 nearline HDD 대비 **전력 약 30% 낮음**, 2026년 대용량 QLC SSD 출하 폭발적 성장 전망, 다만 비용·공급망이 대규모 전환의 2대 장애 🟡. 2025-10-14: NAND 벤더들이 122TB·245TB nearline SSD로 HDD 대체 가속 🟡. 2025-10-29: 대용량 SSD 리드타임 약 1년 🟡.
- HDD 측: Seagate·WD 2026년 nearline 물량 완판, MS·Google·Amazon·Meta 등 7개 고객이 2027~28년까지 장기계약, HDD 평균 가격 2025-09 이후 +46%, $/GB 0.012~0.013 → 0.015~0.016 🟡 (heise·Tom's HW·TrendForce 2026-01-28 인용).
- 삼성: 1Q26 eSSD 매출 $7.05B(+92.8% QoQ), **176단 QLC 대량 출하**가 기여; 2Q26에도 176단 QLC 출하 급증; SanDisk는 2026년 QLC 비중 대폭 확대 예정 🟡 (TrendForce 2026-06-11·2026-09-01·2026-03-13 인용).
- 가격 참고: D5-P5336 61.44TB 2024 초 예약가 $3,692~3,975(≈$60~65/TB), 대량가 기준 <$95/TB; 122.88TB 2025 소매 $12,399(≈$101/TB) 🟡 (TechRadar·Tom's HW 인용) — 소매가이며 하이퍼스케일 계약가 ⚠️미확인. 6600 ION 245TB 리뷰어 언급 "$100,000 가격표" ⚠️(TechRadar 헤드라인, 단위·근거 미확인).

## §3. "2022년경" vs "2026년 현재" QLC eSSD 비교표

| 비교 축 | 2022년경 (대표: Solidigm D5-P5316 → 2023 D5-P5336 61TB 초기) | 2026년 현재 (대표: Micron 6600 ION 245TB · Kioxia LC9 · Solidigm 122TB · Samsung 176단 QLC) | 신뢰도 |
|---|---|---|---|
| 드라이브 최대 용량 | 15.36 / 30.72TB (2023-07 61.44TB 등장) | **122.88 ~ 245.76TB** (256TB SanDisk 예고) | 🟡 |
| NAND 다이 밀도 | 1Tb QLC (144단) | 1Tb(192·286단) → **2Tb QLC(BiCS8, Kioxia·SanDisk)**, Micron G9 6-plane | 🟡 |
| 단수 | 96/144단 (Intel 64→144) | 176(Samsung 양산 주력)·192(Solidigm)·232/276(Micron G8/G9)·286(Samsung V9 QLC)·218 CBA(Kioxia/SanDisk) | 🟡 |
| 인터페이스 | PCIe 3.1 → **PCIe 4.0** x4 | **PCIe 5.0** x4 주류(6600 ION·LC9·BM1743 E3.S), Solidigm 122TB는 PCIe 4.0 유지; PCIe 6.0은 TLC(PM1763)부터 | 🟡 |
| 폼팩터 | U.2 15mm, **E1.L**(1U 1PB), E1.S(OCP 부팅/노드) | **E3.S / E3.L** 중심, U.2 병행; 2.5" 2026 말 퇴장 전망, **E2(1PB·80W)** 표준화 진행 | 🟡 |
| DWPD | 0.4~0.6(D5-P5336 61TB 0.58) / "0.5"급(P5316) | **0.3 RDWPD ~ 1.0 SDWPD**(6600 ION), LC9 0.3, Solidigm 122TB 0.6, Samsung BM1743 0.26 | 🟡 |
| 전력 (활성 max / W/TB) | 15W(P4320, 1.95 W/TB) → 25W(D5-P5336 61TB, 0.41 W/TB) | **30W / 0.12 W/TB**(6600 ION 245TB), 유휴 <5W(0.02 W/TB); StorageReview 측정 유휴 0.47 W/TB vs HDD 0.72 W/TB(−35%) | 🟡 |
| 순차 읽기 | 3.2 GB/s(2018) → 7 GB/s(2021~23) | **12~13.7 GB/s** | 🟡 |
| 랜덤 읽기 | 427K(2018) → 800K~1.6M IOPS | 1.3M~1.78M IOPS | 🟡 |
| $/TB (공개 소매 추정) | 61TB ≈ $60~95/TB(2024 초 소매·대량) | 122TB ≈ $101/TB(2025 소매); 2026은 NAND 가격 급등기(TrendForce 1Q26 전 품목 사상 최대 상승)로 상승 방향 ⚠️ | ⚠️추정 |
| 타깃 워크로드 | CDN·오브젝트 스토리지·빅데이터·HCI·"warm storage"·HDD 대체 | **AI 데이터 레이크·학습 데이터 인제스트·체크포인트·추론(RAG·KV cache 오프로드)·nearline HDD 대체(cold data까지 검토)** | 🟡 |
| 핵심 고객 | 북미 CSP 일부(Solidigm 인증 2사 체제)·CDN·Pure Storage 등 어레이 벤더 | 하이퍼스케일러 전면(삼성 176단 QLC 대량 출하, Meta QLC 계층·Pure DFM 2EB), AI 팩토리 | 🟡 |
| 경쟁 대상 | HDD(4~16TB) 및 TLC 15~30TB(Micron 6500 ION "QLC 가격·TLC 성능") | nearline HDD(24~44TB, 공급 부족)·TLC 60TB(6550 ION) — 그러나 HDD 완판으로 QLC가 "대안"이 아니라 "필수 공급원"으로 위치 이동 | 🟡 |
| 호스트·펌웨어 기능 | Multi-stream(2017), ZNS(2020), FDP 비준 직후(2022-12), OCP NVMe SSD 사양 | **FDP 상용 채택**(Samsung·Kioxia·Solidigm·Micron), OCP 2.5/2.6, NVMe 2.0/2.1, Direct Write QLC(SanDisk), 텔레메트리·PLP 강화 | 🟡 |
| 인증·리드타임 | 하이퍼스케일러 인증 보유 QLC 벤더 2사(Solidigm·Samsung, 2024-04 기준) | 대용량 SSD 리드타임 **약 1년**(2025-10), HDD 52주+·2026 완판 | 🟡 |
| 수요 논리 | "$/TB·랙 밀도·전력으로 HDD 대체" (공급자 TCO 논거 중심) | "HDD BW/TB 붕괴 + HDD 공급 부족 + AI 추론 전력 효율" (수요자 주도, Meta 공식 논거) | 🟡 |

## §4. AI가 QLC 요구조건을 바꾼 방식 (2022–23 학습 데이터 레이크 → 2024–26 추론)

- **2022–2023 (학습·데이터 레이크)**: Solidigm은 AI 파이프라인을 Ingest → Prep → Training → Checkpointing → Inference → Archive로 정의하고, 대용량 읽기 중심 단계(인제스트·데이터 레이크)에 QLC(D5-P5336 61TB)를 배치 🟡 (FMS 2024 Solidigm 발표·Solidigm AI 페이지). Micron 6500 ION(2023)은 TLC로 QLC 가격대를 공격("QLC 단점 없는 QLC 경제성") 🟡 — 당시 QLC의 약점이 내구성·성능으로 인식됐음을 방증.
- **2024 (추론 서버 전력 효율)**: TrendForce 2024-04: AI **추론 서버의 에너지 효율**이 QLC eSSD 주문의 직접 동인; QLC는 HDD 대비 읽기 우위·64TB 용량 🟡.
- **2025–2026 (추론·RAG·KV cache·nearline 대체)**: TrendForce 2025-09-22: 향후 2년 AI 인프라의 중심은 고성능 추론 서비스, CSP가 HDD 부족을 NAND 벤더 nearline QLC SSD로 보완, 2027년까지 수요 지속·2026 eSSD 공급 타이트 🟡. KV cache SSD 오프로드가 GPU 메모리 병목 해소 수단으로 부상(Solidigm·Seagate 백서, NVIDIA 2026-01 표준화 — 기존 수집 [qlc-essd-timeline-fdp-ruh-2026-09.md](qlc-essd-timeline-fdp-ruh-2026-09.md) §2 참조) 🟡. Vera Rubin 세대 GPU당 NAND 가정 4TB → 20~21TB 상향 보도 ⚠️(404K Research 뉴스레터 인용, 1차 미확인).
- **요구조건 변화 요약**: (1) 용량 — 30TB → 122/245TB, 랙당 EB급(6600 ION: 1EB를 22랙 → 6랙, SSD 1대가 HDD 8대 대체·55W 절감 🟡 StorageReview); (2) 내구성 — 읽기 전용 0.2~0.3 DWPD로는 KV cache·체크포인트 혼합에 부족 → FDP/다중 RUH·순차 1.0 DWPD 스펙 분리; (3) 전력 — W/TB가 1차 KPI(0.41 → 0.12 W/TB max); (4) 폼팩터 — E1.L → E3.S/E3.L → E2(1PB); (5) 공급 — 인증 2사 체제 → 5사(Solidigm·Samsung·Micron·Kioxia·SanDisk) 경쟁, 그러나 리드타임 1년.

## §5. 미확인·후속 확인 필요 항목
- Intel D5-P5316 공식 DWPD·활성 전력(원 제품 브리프 미열람) ⚠️
- Samsung BM1743 122.88TB의 2026-09 현재 출하 여부 및 삼성 245TB급 QLC eSSD 공식 발표 여부 ⚠️ (TrendForce 1Q26 "176단 QLC 대량 출하"는 용량 미명시)
- Kioxia LC9·SanDisk UltraQLC 256TB의 활성 전력·GA 시점 ⚠️
- Forward Insights QLC 점유 전망의 정의(비트/매출)·원 보고서 ⚠️
- Microsoft·AWS·Google의 QLC 채택 공식 발언: 검색 범위 내에서는 Google은 FDP 공동 개발(OCP 발표)까지만, Microsoft는 OCP E1.S 사양 공동 저술·SNIA/OCP 참여까지만 확인, AWS는 **미확인**
- 하이퍼스케일 QLC 계약가($/TB)·QLC vs TLC 가격비 ⚠️ (Meta: "QLC가 TLC보다 싸지만 충분치 않음"이라는 정성 발언만 확인)

## 원본 링크

- Intel ARK D5-P4320 7.68TB 사양: https://www.intel.com/content/www/us/en/products/sku/186679/intel-ssd-d5p4320-series-7-68tb-2-5in-pcie-3-1-x4-3d2-qlc/specifications.html
- ServeTheHome D5-P4320: https://www.servethehome.com/intel-ssd-d5-p4320-data-center-7-68tb-qlc-ssd/
- KitGuru Intel Memory & Storage Moment 2020 (D5-P5316 발표): https://www.kitguru.net/components/ssd-drives/joao-silva/intel-introduces-new-generation-of-memory-and-storage-solutions/
- StorageReview Intel P5316 30.72TB 리뷰: https://www.storagereview.com/review/intel-p5316-ssd-review-30-72tb
- Solidigm D5-P5316 제품 브리프: https://www.solidigm.com/products/data-center/product-briefs/d5-p5316-product-brief.html
- TechPowerUp D5-P5336 발표(2023-07): https://www.techpowerup.com/311603/solidigm-introduces-d5-p5336-the-worlds-highest-capacity-pcie-ssd
- Architecting IT D5-P5336: https://www.architecting.it/blog/solidigm-introduces-the-worlds-highest-capacity-pcie-ssd/
- ServeTheHome D5-P5336 61.44TB 리뷰: https://www.servethehome.com/solidigm-d5-p5336-61-44tb-ssd-review-hard-drives-lost/
- Solidigm D5-P5336 제품 브리프: https://www.solidigm.com/products/data-center/product-briefs/d5-p5336-product-brief.html
- StorageNewsletter Solidigm 122TB(2024-11-21): https://www.storagenewsletter.com/2024/11/21/solidigm-introduces-highest-capacity-pcie-ssd-122tb-d5-p5336/
- Solidigm 뉴스룸 122TB: https://news.solidigm.com/en-WW/243441-solidigm-122tb-drive/
- Tom's Hardware Solidigm 122TB: https://www.tomshardware.com/pc-components/ssds/solidigm-reveals-122tb-ssd-the-worlds-highest-capacity-drive-for-ai-workloads-d5-p5336-offers-unlimited-write-durability
- Solidigm QLC vs HDD Ceph TCO(47%): https://www.solidigm.com/products/technology/economics-of-exabyte-data-storage.html
- Solidigm Storage Field Day(20x 랙, 42% TCO): https://www.solidigm.com/products/technology/qlc-ssds-value-performance-density-storage-field-day.html
- Solidigm OCP Summit 2022 밀도 블로그: https://www.solidigm.com/products/technology/performance-and-density-rule-for-data-center-storage-at-ocp-summit.html
- Solidigm KV cache 오프로드: https://www.solidigm.com/products/technology/ssds-unlock-ai-inference-with-rag-and-kv-cache.html
- FMS 2024 Solidigm AI Data Pipeline 발표: https://files.futurememorystorage.com/proceedings/2024/20240806_AIML-102-1_Stryker.pdf
- Blocks & Files Solidigm 로드맵·120EB(2025-10-09): https://blocksandfiles.com/2025/10/09/solidigm-speaks-about-its-ssd-roadmap/
- Blocks & Files Samsung BM1743(2024-07-02): https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/
- Tom's Hardware Samsung BM1743: https://www.tomshardware.com/pc-components/ssds/samsung-quietly-launches-6144tb-ssd-talks-about-12288tb-model
- ServeTheHome Samsung BM1743: https://www.servethehome.com/the-samsung-bm1743-is-a-61-44tb-today-with-a-122-88tb-drive-possible/
- SamMobile Samsung 122.88TB(FMS 2024): https://www.sammobile.com/news/samsung-122-88tb-ssd-enterprise-announced/
- Samsung 9세대 QLC V-NAND 양산(2024-09-12): https://semiconductor.samsung.com/news-events/news/samsung-begins-industrys-first-mass-production-of-qlc-9th-gen-v-nand-for-ai-era/
- Electronics Weekly Samsung 286단 V9 QLC: https://www.electronicsweekly.com/news/business/samsung-in-mass-production-of-286-layer-v9-qlc-nand-2024-09/
- Samsung PM1763 양산(2026-07-08): https://news.samsung.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure
- Samsung FDP 테크블로그: https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/
- Micron 6500 ION 발표(IR): https://investors.micron.com/news-releases/news-release-details/micron-scales-storage-new-heights-launch-two-data-center-drives
- Tom's Hardware Micron 6500 ION: https://www.tomshardware.com/news/micron-launches-ultra-high-capacity-30tb-6500-ion-ssd-and-high-endurance-xtr
- Micron 6550 ION 블로그: https://www.micron.com/about/blog/applications/data-center/meet-the-micron-6550-ion-the-next-breakthrough-storage-innovation
- StorageNewsletter Micron 6550 ION(2024-11-22): https://www.storagenewsletter.com/2024/11/22/micron-sampling-6550-ion-pcie-gen5-up-to-61tb-data-center-ssd-in-e3-s-form-factor/
- GlobeNewswire Micron 6600 ION 245TB 출하(2026-05-05): https://www.globenewswire.com/news-release/2026/05/05/3287806/14450/en/Industry-Leading-245TB-Micron-6600-ION-Data-Center-SSD-Now-Shipping.html
- TechPowerUp Micron 6600 ION: https://www.techpowerup.com/348783/industry-leading-245-tb-micron-6600-ion-data-center-ssd-now-shipping
- StorageReview Micron 6600 ION 리뷰: https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay
- StorageReview Micron 6600 ION HDD 대체·NVL72: https://www.storagereview.com/review/micron-6600-ion-245tb-swap-the-hard-drives-power-an-nvl72-for-free
- Micron 6600 ION 제품 페이지: https://www.micron.com/products/storage/ssd/data-center-ssd/6600-ion
- Kioxia LC9 Best of Show(2025-08-05): https://americas.kioxia.com/en-us/business/news/2025/ssd-20250805-1.html
- StorageNewsletter Kioxia LC9(2025-07-23): https://www.storagenewsletter.com/2025/07/23/kioxia-unveils-lc9-series-up-to-245-76tb-pcie-5-0-nvme-2-5-inch-and-edsff-e3-l-form-factor-ssd/
- ServeTheHome Kioxia LC9: https://www.servethehome.com/kioxia-lc9-ssd-hits-245-76tb-of-capacity-in-a-single-drive/
- SanDisk UltraQLC FMS 2025 보도자료: https://www.sandisk.com/company/newsroom/press-releases/2025/2025-08-05-sandisk-showcases-ultraqlc-technology-platform-with-milestone-enterprise-ssd-capacity-at-fms-2025
- Tom's Hardware SanDisk 256TB: https://www.tomshardware.com/pc-components/ssds/sandisk-unveils-colossal-new-256tb-ssd-with-new-ultraqlc-flash-memory-enterprise-grade-ssds-for-high-density-storage-also-come-in-128tb
- Blocks & Files SanDisk 256TB(2025-08-05): https://blocksandfiles.com/2025/08/05/sandisk-pre-announces-256-tb-ssd/
- TechRadar SanDisk SN670 128TB: https://www.techradar.com/pro/sandisk-plans-256tb-ssd-in-2026-and-512tb-ssd-in-2027-and-no-you-wont-be-able-to-install-it-in-your-desktop-computer
- StorageNewsletter Pure FlashArray//C(2019-09-17): https://www.storagenewsletter.com/2019/09/17/pure-storage-adds-qlc-flasharray-c-up-to-4-2pb/
- Blocks & Files Pure×Meta(2025-04-07): https://blocksandfiles.com/2025/04/07/metas-positive-assessment-of-pure-storages-flash-mettle/
- Blocks & Files Pure 하이퍼스케일러 딜(2024-12-04): https://blocksandfiles.com/2024/12/04/pure-q3-2025/
- Meta Engineering "A case for QLC SSDs in the data center"(2025-03-04): https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/
- The Register Meta QLC 계층(2025-03-07): https://www.theregister.com/2025/03/07/meta_proposes_qlc_ssds_as/
- SSD Guy Meta QLC 계층: https://thessdguy.com/meta-adding-a-qlc-layer-for-better-cost-performance/
- Techzine Meta QLC: https://www.techzine.eu/news/devices/129321/meta-sees-qlc-as-middle-ground-between-tlc-ssds-and-hdds/
- ServeTheHome Meta 1PB E2 SSD 비전(2025-11-03): https://www.servethehome.com/a-meta-vision-for-gpu-scale-compute-with-1pb-e2-ssds/
- StorageReview E2 폼팩터: https://www.storagereview.com/news/e2-ssd-form-factor
- Meta OCP Summit 2022(Grand Teton/Grand Canyon): https://engineering.fb.com/2022/10/18/open-source/ocp-summit-2022-grand-teton/
- Next Platform Meta OCP 2022: https://www.nextplatform.com/2022/10/20/the-iron-that-will-drive-ai-at-meta-platforms/
- StorageNewsletter OCP 2022 recap: https://www.storagenewsletter.com/2022/10/25/recap-of-ocp-global-summit-2022/
- Forbes Coughlin OCP 2022 스토리지(2022-10-20): https://www.forbes.com/sites/tomcoughlin/2022/10/20/digital-storage-advances-at-the-2022-open-compute-project-summit/
- Kioxia·Meta·Microsoft EDSFF E1.S 백서: https://americas.kioxia.com/content/dam/kioxia/en-us/business/ssd/data-center-ssd/asset/KIOXIA_Meta_Microsoft_EDSFF_E1_S_Intro_White_Paper.pdf
- NVMe FDP Hyperscale Innovation(Meta·Google): https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf
- NVMe FDP State of the Union(FMS 2023): https://nvmexpress.org/wp-content/uploads/FMS-2023-Flexible-Data-Placement-FDP-Overview.pdf
- Blocks & Files FDP 설명(2023-08-14): https://www.blocksandfiles.com/architecture/2023/08/14/using-ssd-data-placement-to-lessen-ssd-write-amplification/1600183
- StorageNewsletter NVMe FDP(2025-02-05): https://www.storagenewsletter.com/2025/02/05/nvme-fdp-a-promising-new-ssd-data-placement-approach/
- Silicon Motion OCP 2024 FDP in QLC: https://www.siliconmotion.com/company/blog/2024_OCP_Global_Summit/detail
- SNIA ZNS(2020): https://www.snia.org/educational-library/zoned-namespaces-bringing-zones-nvme-ssds-2020
- NVMe 1.3 Streams: https://www.design-reuse.com/blog/54529-jumping-on-the-demand-for-nvme-1-3-streams/
- TrendForce 3Q22 NAND −8~13%(2022-07-19): https://www.trendforce.com/presscenter/news/20220719-11310.html
- TrendForce 4Q22 NAND −15~20% 전망(2022-09-26): https://www.trendforce.com/presscenter/news/20220926-11395.html
- TrendForce 3Q22 eSSD $5.22B(2022-12-05): https://www.trendforce.com/presscenter/news/20221205-11486.html
- TechPowerUp/TrendForce 4Q22 eSSD $3.79B: https://www.techpowerup.com/305513/revenue-from-enterprise-ssds-totaled-just-ususd-3-79-billion-for-4q22-due-to-slumping-demand-and-widening-decline-in-ssd-contract-prices-says-trendforce
- TrendForce 4Q22 NAND 매출 −25%(2023-03-17): https://www.trendforce.com/presscenter/news/20230317-11618.html
- TrendForce QLC eSSD 2024 30EB(2024-04-23): https://www.trendforce.com/presscenter/news/20240423-12122.html
- TrendForce nearline HDD 부족·QLC 2026 폭발(2025-09-15): https://www.trendforce.com/presscenter/news/20250915-12714.html
- TrendForce 추론 AI·nearline SSD(2025-09-22): https://www.trendforce.com/presscenter/news/20250922-12726.html
- TrendForce HDD 대체 가속(2025-10-14): https://www.trendforce.com/presscenter/news/20251014-12744.html
- TrendForce 대용량 SSD 리드타임 1년(2025-10-29): https://www.trendforce.com/news/2025/10/29/news-high-capacity-ssds-reportedly-hit-year-long-delays-as-samsung-sk-and-kioxia-run-full-tilt
- TrendForce Seagate nearline 2026 완판(2026-01-28): https://www.trendforce.com/news/2026/01/28/news-seagate-q3-guidance-tops-estimates-nearline-hdd-capacity-fully-booked-through-2026/
- TrendForce 4Q25 eSSD(2026-03-13): https://www.trendforce.com/presscenter/news/20260313-12967.html
- TrendForce 1Q26 eSSD $18.46B·삼성 176단 QLC(2026-06-11): https://www.trendforce.com/presscenter/news/20260611-13092.html
- TrendForce 2Q26 eSSD $37.59B(2026-09-01): https://www.trendforce.com/presscenter/news/20260901-13210.html
- heise WD·Seagate 2026 완판: https://www.heise.de/en/news/WD-and-Seagate-confirm-Hard-drives-for-2026-sold-out-11178917.html
- Tom's Hardware WD 2026 완판·2027~28 장기계약: https://www.tomshardware.com/pc-components/hdds/western-digital-is-already-sold-out-of-hard-drives-for-all-of-2026-chief-says-some-long-term-agreements-for-2027-and-2028-already-in-place
- TechRadar Solidigm 122TB 소매가 $12,399: https://www.techradar.com/pro/worlds-largest-ssd-is-on-sale-for-almost-usd12-400-and-yes-it-is-quite-a-bargain-if-you-can-afford-it-of-course
- Tom's Hardware Solidigm 61.44TB 소매가 추이: https://www.tomshardware.com/pc-components/ssds/worlds-highest-capacity-ssd-sees-retail-price-hikes-solidigm-61-44tb-ssd-pricing-nearly-doubles
- Epoch AI 하이퍼스케일러 CapEx 추이: https://epoch.ai/data-insights/hyperscaler-capex-trend
- WD 블로그 AI 스토리지 수요(학습 데이터셋 2022→2023): https://blog.westerndigital.com/ai-storage-demand-data-center-build-out/
- Intel 8-K NAND 사업 SK hynix 1차 종결(2021-12-29): https://www.sec.gov/Archives/edgar/data/50863/000119312521369552/d282616dex991.htm
