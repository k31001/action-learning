# 단품 → 상위 계층 "해법 사다리" 팩트체크 데이터 (NAND·DRAM·HBM·HBF, 1991~2026)

- **유형**: 팩트체크·데이터 수집 노트 (2차 자료 종합, 2026-09-18)
- **용도**: [solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md)(위키) · [memory-solution-ladder-report.md](../../outputs/report/memory-solution-ladder-report.md)(보고서) · 슬라이드 `memory-solution-ladder.pptx`의 근거
- **수집 방법**: 웹 검색 결과 요약(검색 엔진이 공식 보도자료·논문·업계 매체 본문을 요약한 것). 본 세션은 프록시 정책상 원문 페이지 직접 열람(WebFetch)이 차단되어(wikipedia·jedec.org 등 `EGRESS_BLOCKED`) **원문 대조는 못 했다**. 등급: ✅ = 공식 기관(JEDEC·NVM Express·CXL 컨소시엄·USENIX·기업 IR/보도자료)의 문구가 검색 요약에 그대로 인용된 것 또는 본 저장소 소스로 이미 검증된 것, 🟡 = 업계 매체·블로그·백과 요약, ⚠️ = 추정·해석.
- **위치**: `sources/articles/` (원본·불변)

> 사용자 가설(2026-09-18): "단위 부품 특성이 고객 요구를 만족하지 못하는 수준이 되면 상위 부품에서 솔루션을 제공하는 것이 자연스러운 흐름이다. NAND는 bit error·wear-out을 단품에서 못 풀어 SSD 계층에서 풀었고, QLC의 호스트 협력은 같은 흐름이다. DRAM은 단품이 요구를 계속 만족해 상위 솔루션 니즈가 작았다. HBM은 단품의 업그레이드, HBF는 NAND가 SSD로 먼저 간 뒤 늦게 온 것이라 순서가 다르다. 단품 자기 진화 축은 간과하면 안 된다." 아래는 이 가설의 각 명제를 검증하기 위한 사실 대장이다.

---

## 1. NAND → SSD: 단품 한계를 상위 계층(컨트롤러·디바이스)이 흡수한 역사

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F1 | 1991년 SanDisk가 20MB SSD를 IBM ThinkPad 옵션으로 출시 — PC용 최초 SSD | PCWorld "Evolution of the Solid-State Drive" | 🟡 |
| F2 | M-Systems(1989년 설립)가 1995년 **DiskOnChip**을 출시, 특허 **TrueFFS**(True Flash Filing System)로 플래시를 디스크처럼 보이게 함(= FTL의 원형). 2006년 SanDisk에 인수 | Wikipedia "M-Systems", OS/2 Museum "DiskOnChip" | 🟡 |
| F3 | 삼성전자 2006년 세계 최초 SSD 양산(HDD 대체 수요를 스스로 개척) | 본 저장소 [samsung-storage-solution-history.md](../../wiki/concepts/samsung-storage-solution-history.md) §2 | ✅(저장소) |
| F4 | NAND P/E 사이클 보증: SLC 30,000~100,000 / MLC 3,000~10,000 / TLC 800~3,000 / QLC 약 100~1,000 | Kingston, Lexar Enterprise, SSSTC 기술 블로그 종합 | 🟡 |
| F5 | RBER(raw bit error rate)는 P/E 사이클과 함께 증가하며, **RBER이 ECC 정정 한계를 넘기 전까지의 사이클 수가 곧 내구성** | Cai·Ghose·Haratsch·Luo·Mutlu, "Architectural Techniques for Improving NAND Flash Memory Reliability"(arXiv 1808.04016) | ✅(학술) |
| F6 | ECC 요구량의 상승: SLC 약 1비트/512B → 미세화·MLC에서 4·8비트 이상 → 2x nm MLC에서 24~60비트 BCH/1KB → 초기 3D MLC 사양서에 72비트 BCH 또는 LDPC/1KB 명시. 3D 전환은 셀당 전하량 회복으로 ECC 요구를 낮춤(MLC <10, TLC <15, QLC <20비트 수준으로) | Kioxia "Understanding ECC in NAND Flash Memory" 기술 브리프, The Memory Guy "How 3D NAND Shrinks ECC Requirements" | 🟡 |
| F7 | LDPC 상용화: 학술 "LDPC-in-SSD"(USENIX FAST 2013) → Marvell 88SS1093 컨트롤러 FMS 2014 시연 → Lite-On CV2, 세계 최초 LDPC 적용 TLC SSD(CES 2015). 부호율 0.936 LDPC는 RBER 5.0×10⁻³까지 UBER 10⁻¹⁶ 유지 | USENIX FAST'13, PC Perspective(2015-01), "BCH and LDPC error correction codes for NAND flash memories"(ResearchGate) | 🟡 |
| F8 | **QLC 상용 1호**: Micron 5210 ION(엔터프라이즈 SATA, 7.68TB) 2018-05 출하 개시 | GlobeNewswire(Micron, 2018-05-21) | ✅ |
| F9 | 3D NAND: 삼성 V-NAND 2013년 최초 상용. 양산 최고 층수(2025): SK hynix 321 · 삼성 286 · Micron 276, 삼성 10세대 400+층 개발 | Blocks & Files(2024-12), Tom's Hardware(10세대 V-NAND) | 🟡 |

**독해**: NAND의 셀 한계(RBER↑·P/E↓)는 셀에서 해결되지 않았고 **컨트롤러 계층**(FTL·웨어 레벨링·BCH→LDPC·SLC 캐시·OP)이 흡수했다(F2·F5·F6·F7). 3D 전환(F9)은 단품 자기 진화로 ECC 요구를 잠시 낮췄지만, QLC(F8)는 다시 내구성 한계를 키웠다(F4).

## 2. SSD → 호스트 → 애플리케이션: 이관의 두 번째·세 번째 칸

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F10 | **TRIM**: ATA ACS-2 DATA SET MANAGEMENT 명령으로 표준화(T13), Windows 7(2009)이 지원 — 호스트가 무효 데이터를 SSD에 알려 GC·WAF를 줄이는 첫 호스트 협력 | SNIA 2009 "ATA Trim/Delete Notification Support in Windows 7", Thomas-Krenn Wiki | 🟡 |
| F11 | **Open-Channel SSD**: LightNVM(Linux 서브시스템) USENIX FAST 2017(2월) 발표 — FTL을 호스트로 올리는 시도 | USENIX FAST'17 Bjørling et al. | ✅(학술) |
| F12 | **Multi-stream**: NVMe·SCSI T10 표준으로 수명이 다른 데이터를 별도 소거 블록에 분리(SNIA 2017 AutoStream) | SNIA Educational Library 2017 | 🟡 |
| F13 | **ZNS**(Zoned Namespaces) TP 4053: 2018년 말 착수, **2020-06 비준** — NAND 쓰기 특성에 맞춘 순차 쓰기 존, 컨트롤러 복잡도 감소 목표 | NVM Express 웹캐스트 Q&A·발표자료(2020-09) | ✅ |
| F14 | **FDP**(Flexible Data Placement) TP 4146: **2022-12 공개**, Meta와 Google이 각자 풀던 WAF·OP 문제를 통합 — 호스트 유도 데이터 배치 | Samsung Semiconductor 기술 블로그, NVM Express FMS 2023 "FDP State of the Union" | ✅ |
| F15 | CacheLib(Meta)에 FDP 지원 업스트림 머지·대규모 배포, EuroSys'25 논문: 100% 사용률 WAF 3.22 → 1.03 | 본 저장소 [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §4 | ✅(저장소) |
| F16 | KV 캐시 관리자 4종(Dynamo KVBM·LMCache·Mooncake·FlexKV) README·코드에 데이터 배치·내구성 언급 0건 — 애플리케이션 계층의 규격은 아직 미정의 | 같은 소스 §2 | ✅(저장소) |
| F17 | QLC 정격 0.075~0.6 DWPD vs 추론 캐시 계층 TLC 1~3 DWPD(10~40배 갭); ScaleFlux RUH 200+로 유효 7~10 DWPD 제시 | 같은 소스 §3 | ✅(저장소) |

**독해**: 호스트 협력은 2009(TRIM)에서 시작해 2017(Open-Channel·Streams) → 2020(ZNS) → 2022(FDP)로 표준화됐고, 2025년 처음으로 **애플리케이션 계층**(CacheLib)에 머지됐다(F15). 다음 칸(KV 캐시 관리자)은 아직 비어 있다(F16). 디바이스 칸(1991)에서 호스트 칸(2022 FDP)까지 31년, 애플리케이션 칸(2025)까지 34년이 걸렸다.

## 3. DRAM: 단품이 만족해 왔다는 전제의 검증

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F18 | **Chipkill**: IBM Microelectronics 1997년 백서 — ECC 워드를 여러 DRAM 칩에 분산해 칩 1개 전체 고장을 메모리 컨트롤러가 정정(서버 메인 메모리) | Wikipedia "Chipkill", ATP 기술 블로그 | 🟡 |
| F19 | **Row Hammer**: Kim·Mutlu 외, ISCA 2014 "Flipping Bits in Memory Without Accessing Them" — 3사 모듈의 80% 이상에서 인접 행 반복 접근으로 비트 플립 유발 확인(셀 물리 한계의 규명) | CMU SAFARI 데이터 저장소, arXiv 2306.16093(회고) | ✅(학술) |
| F20 | **DDR5 JESD79-5**(2020-07-14 발표): **on-die ECC** 등 "스케일링 기능이 첨단 공정 노드 제조를 가능하게 함"(단품이 오류를 다이 내부에서 흡수) + Refresh Management(MR58/MR59 RFM 카운터) | JEDEC 보도자료(2020-07-14), VideoCardz 전재 | ✅ |
| F21 | **JESD79-5A**(2021-10): Adaptive RFM 추가 — 호스트가 발행하는 리프레시 관리 명령으로 시스템 신뢰성 개선 | JEDEC 보도자료(2021-10) | ✅ |
| F22 | **JESD79-5C**(2024-04-17): **PRAC**(Per Row Activation Counting) — DRAM이 행 단위로 활성화 횟수를 세고, 임계 초과 시 시스템에 경보(Alert Back-Off)해 트래픽을 멈추고 완화 시간을 확보. "DRAM과 시스템의 긴밀한 협조"가 명시. DDR5-8800 레퍼런스 속도 추가 | JEDEC 보도자료(2024-04-17), TechPowerUp, StorageNewsletter; 메커니즘은 arXiv QPRAC(2501.18861)·MOAT(2407.09995) | ✅ |
| F23 | **CXL**: 1.0 2019-03-11 · 1.1 2019-06 · **2.0 2020-11-10(스위칭·메모리 풀링)** · 3.0 2022-08-02(패브릭·P2P·메모리 공유) · 3.1 2023-11-14 | CXL 컨소시엄 웨비나 자료, Wikipedia | ✅ |
| F24 | **MRDIMM**: JEDEC JC-45가 2024년 중반 DDR5 MRDIMM 표준 확정(Gen1 8.8 GT/s → Gen2 12.8 → Gen3 17.6), Micron 2024-07 첫 MRDIMM(32~256GB) 샘플 — 모듈 계층에서 대역폭·용량을 배증 | TrendForce(2024-07-29), JEDEC 보도자료, ServerSimply | 🟡 |

**독해**: "DRAM은 단품이 계속 만족해 왔다"는 전제는 **부분적으로만** 맞다. 신뢰성 축에서는 1997년(Chipkill, 컨트롤러 계층)에 이미 상위 계층 해법이 있었고, Row Hammer(F19)라는 셀 한계가 규명된 뒤 DRAM은 **on-die ECC(단품 흡수, F20) → RFM(호스트 발행, F21) → PRAC(DRAM 카운트 + 호스트 경보 = 협력 프로토콜, F22)** 로 사다리를 올랐다. 용량·대역폭 축에서는 HBM(자기 진화)·MRDIMM(모듈)·CXL(시스템) 세 갈래가 병행한다(F23·F24·F25). 아직 애플리케이션 계층(5단) 해법은 없다.

## 4. HBM·HBF: 단품 자기 진화 축과 순서의 차이

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F25 | **HBM**: SK hynix가 2013년 첫 HBM 실리콘 제작(AMD와 공동 개발), JEDEC **JESD235 2013-10 채택**, 상용 1호 AMD Fiji(Radeon R9 Fury X) 2015-06. HBM3 표준 2022-01-27, **HBM4 JESD270-4 2025-04**. 스택당 대역폭 HBM1 128GB/s → HBM2 256 → HBM3 819 → HBM3E 1,229 → HBM4 2,048GB/s | Wikipedia/HandWiki "High Bandwidth Memory", PC Perspective(Fiji 2015-06), JEDEC 보도자료(HBM4), Rambus 블로그 | 🟡/✅(JEDEC) |
| F26 | **HBM4/4E 커스텀 베이스 다이**: HBM4 베이스 다이는 삼성 4nm·SK hynix TSMC N12; HBM4E부터 고객 사양 맞춤 로직 다이 시장 본격화(삼성 커스텀 HBM4E 설계 2026-05~06 완료 목표, SK hynix TSMC 3nm 검토·Intel 파운드리도 검토), HBM5 베이스 다이 삼성 2nm | TrendForce(2026-01·03·08), EE Times CES 2026 | 🟡 |
| F27 | **HBF**(High Bandwidth Flash): SanDisk↔SK hynix MOU 2025-08-06(표준화 협력) → 표준화 킥오프 2026-02-25 → **OCP 첫 공개 사양 FMS 2026(2026-08)**: 패키지당 최대 512GB, 8-Hi/16-Hi NAND 스택, UCIe 인터페이스, 대역폭 등급 약 0.4~3.0TB/s. SanDisk 목표: HBF 샘플 2H26, HBF 탑재 추론 디바이스 샘플 2027 초. 매체 평가: HBM 대비 8~16배 용량 가능(Tom's Hardware), Hot Chips 2026에서 "사용성은 극히 제한적" 지적 | SanDisk 보도자료(2025-08-06·2026-02-25), StorageReview·Tom's Hardware(2026-08), Hot Chips 2026 기사 | 🟡 |

**독해**: DRAM의 자기 진화(HBM 2013)는 시스템 해법(CXL 2019·PRAC 2024)보다 **6~11년 앞섰고**, NAND의 자기 진화(HBF 2026 사양)는 시스템 해법(SSD 1991)보다 **35년 뒤**다. 사용자의 "순서 차이" 관찰은 사실과 부합한다. HBM4E의 커스텀 베이스 다이(F26)는 자기 진화 축이 고객 공동 설계와 합쳐지는 지점이다.

## 7. 지표로 보는 이관 — P/E · BER · UBER · DWPD · WAF (2026-09-18 추가, 슬라이드 v1.1 근거)

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F28 | **UBER 요구(JESD218)**: 클라이언트 10⁻¹⁵ · 엔터프라이즈 10⁻¹⁶. 데이터 보존 요구: 클라이언트 30°C 1년(활성 40°C 8h/일), 엔터프라이즈 40°C 3개월(활성 55°C 24h/일), FFR 3%. TBW는 "이 요구를 만족하면서" 쓸 수 있는 양으로 정의 | SNIA 백서 "Endurance of NVMe, SAS, and SATA SSDs", Seagate TP618, JEDEC JC-64.8 발표자료(Alvin Cox) | ✅ |
| F29 | **DWPD 공식**: DWPD = P/E × (1 + OP) ÷ (EOL일수 × WAF), EOL은 통상 5년; TBW = 물리 용량 × P/E ÷ WAF. WAF는 통상 4KB 100% 랜덤 쓰기 기준으로 추정, 예시 계산에 WAF 3 사용 | ATP "Predict SSD lifespan…", Kioxia "Understanding TBW versus P/E Cycles" 기술 브리프 | ✅ |
| F30 | **정격 DWPD 추이(5년 환산)**: Intel X25-E 64GB(SLC, 2008) 랜덤 쓰기 2PB 보증 → 17.1 DWPD(환산) · Intel DC S3700(HET-MLC, 2012) 10 DWPD · Intel DC P4510(64L TLC, 2018) 0.7 DWPD(4TB 6,300TBW = 0.85) · Solidigm D5-P5316 30.72TB(144L QLC, 2021) 22,930TBW(64K 랜덤) = 0.41 DWPD(환산) · 최신 QLC 0.075~0.6(F17) | Intel X25-E 데이터시트(2009-05), StorageReview S3700 리뷰, Intel P4510 사양·StorageReview, Solidigm P5316 제품 브리프 | ✅(수치)·환산은 본 노트 |
| F31 | 엔터프라이즈 SSD 일반 보증 부하 3~10 DWPD, 클라이언트 약 1 DWPD(JEDEC 워크로드 기준) | Seagate TP618 | 🟡 |
| F32 | **RBER 대표값(EOL)**: SLC가 가장 낮음(문헌 대표 10⁻⁹~10⁻⁷ ⚠️) · MLC는 10,000 P/E 후 최대 10⁻²(Mielke 외, "Bit error rate in NAND Flash memories") · TLC는 부호율 0.936 LDPC가 RBER 5×10⁻³까지 UBER 10⁻¹⁶ 유지(F7) · QLC는 16레벨로 EOL에서 BER 열화(대표 10⁻³~10⁻² ⚠️). 오류원: P/E 사이클링·프로그램 간섭·**보존(retention, 시간에 따른 Vt 이동)**·리드 디스터브, 보존 오류가 지배적이고 P/E에 초선형 증가 | ResearchGate(Mielke 2008, Cai 2012 "Error Patterns in MLC NAND"), arXiv 1805.03283, USPTO 특허 요약 | 🟡(범위)·⚠️(SLC·QLC 대표값) |
| F33 | **ECC 정정 능력 추이**: SLC 약 1비트/512B → MLC 4~8비트 → 2x nm MLC 24~60비트 BCH/1KB → 3D MLC 72비트 → **LDPC는 TLC에서 1KB당 최대 120비트 플립 정정**(BCH는 2KB당 120비트), 소프트 디시전으로 용량 한계 근접 | Kioxia ECC 기술 브리프, The Memory Guy, **WD 백서 "The Application of ECC/DSP to Flash Memory"(2021-03)**, ATP LDPC 블로그 | 🟡/✅(WD) |
| F34 | **WAF**: 랜덤 쓰기 대표값 3(F29 예시) · CacheLib 100% 사용률 FDP 없음 3.22 → FDP 1.03(F15) · XFS write streams RocksDB WAF −35%(저장소) | F15·F29 | ✅ |
| F35 | 이관의 산식적 의미: DWPD 공식에서 P/E는 셀(단품), OP는 디바이스, WAF는 호스트·애플리케이션(데이터 배치·수명 분리), 보증연수·요구 DWPD는 고객이 정한다. SLC→QLC로 P/E가 100배 줄었으므로 요구 DWPD를 지키려면 WAF를 줄이는 것이 남은 지렛대이며, WAF는 호스트가 데이터 수명을 알려 줄 때만 1에 수렴한다(F14·F15) | 본 노트 해석 | ⚠️ |

**독해**: 셀이 못 지킨 것은 BER이고(F32), 컨트롤러는 ECC를 60배 키워(F33) UBER 요구(F28)를 지켰다. 그러나 ECC는 P/E 자체를 늘리지 못하므로 정격 DWPD는 17 → 10 → 0.7 → 0.41로 내려왔고(F30), 고객 요구(캐시 계층 1~3, 유효 7~10)는 그대로다(F17). 공식(F29)에서 남은 변수는 WAF뿐이며, WAF 3.22 → 1.03은 호스트 배치가 만들었다(F34). 이것이 "이제 상위 계층과의 협력이 필요한 시점"의 수치적 근거다(F35).

## 8. SSD 단독 워크로드 최적화의 한계 — 2단계의 부분 성공 (2026-09-18 추가, 슬라이드 v1.3 근거)

사용자 지적(2026-09-18): "1단계는 ECC가 맞고, 2단계는 SSD가 워크로드에 최적화하려는 시도를 했으나 고객 워크로드를 완벽히 감지할 수 없어 QoS·성능 개선 효과는 있었지만 WAF를 크게 줄이지 못했다. 그래서 3단계(호스트 시스템 co-design)로 WAF를 1에 가깝게 만드는 것이 QLC로 요구 DWPD를 만족하는 유일한 방법이다."

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F36 | **Multi-streamed SSD**(삼성, USENIX HotStorage'14 Kang 외): 갱신 빈도가 다른 데이터를 별도 쓰기 스트림(append point)으로 분리해 WAF·GC를 줄이는 SSD 기능. 호스트가 스트림 ID를 태그해야 하며, Cassandra에서 CommitLog·SSTable 티어별 스트림 분리로 WAF 감소를 시연. NVMe Streams directive(1.3, 2017)로 표준화됐으나 업계 채택은 미미("did not find much traction") | USENIX HotStorage'14 논문, [fdp-technical-limits-adoption-context-2026-08.md](fdp-technical-limits-adoption-context-2026-08.md) §1, F12 | 🟡 |
| F37 | **AutoStream**(삼성, ACM SYSTOR 2017): 애플리케이션 수정 없이 **런타임 워크로드 감지**로 스트림을 자동 배정(NVMe 리눅스 드라이버 프로토타입). 평가 워크로드에서 WAF 최대 60% 감소·성능 최대 237% 개선 — 즉 감지 기반 배정은 워크로드에 따라 효과가 크게 달라지며, 실 워크로드의 데이터 수명은 LBA 접근 패턴으로 완전히 추정되지 않음. 후속 연구(StreamCSD 2025 등)가 여전히 "SSD 자율 스트림 관리"를 미해결 과제로 다룸 | ACM SYSTOR'17 논문·발표자료, ResearchGate(StreamCSD 2025) | 🟡 |
| F38 | **FTL 핫/콜드 데이터 분리**: 펌웨어가 LBA 범위를 빈(bin)으로 나눠 덮어쓰기 빈도를 추적해 핫·웜·콜드를 추정하고 별도 블록에 배치(특허 US20160139812A1·US11068197, ASA-FTL 등). 효과는 추정 정확도에 좌우되며, 웜 데이터·패턴 변화가 오분류를 낳음. 실 캐시 워크로드에서 호스트 힌트 없이 최신 FTL이 낸 결과가 CacheLib WAF 3.22(F15) — **디바이스 단독 추정은 WAF ≈ 3 수준을 벗어나지 못함** | Google Patents(US20160139812A1), USPTO 11068197, ASA-FTL(ResearchGate), F15 | 🟡(F15는 ✅) |
| F39 | **NVMe IO Determinism / NVM Sets / Predictable Latency Mode**(Facebook FMS 2018 제안, NVMe 1.4 2019): 다이 집합을 분리하고 결정적·비결정적 시간 창을 번갈아 운용해 읽기 **테일 지연(QoS)** 을 제거 — SSD 하우스키핑(GC)의 간섭을 격리하는 기능이지 WAF를 줄이는 기능은 아님 | Blocks & Files(2019-11, NVMe 1.4 노이지 네이버), Medium(NVM Sets), IIT Kanpur PLMlight·PLMC(2021), ACM TOS(IOD 확장) | 🟡 |
| F40 | **FDP의 전제**(삼성 기술 블로그): NAND는 덮어쓰기가 불가하고 GC가 WAF를 만든다. **호스트가 데이터의 생애주기(life cycle)를 알므로** 유사 수명 데이터를 같은 RU(Reclaim Unit)에 묶어 GC 비효율을 제거 — "host/device cooperation"이 WAF를 낮추고 GC 빈도를 줄인다. FDP는 Google SmartFTL·Meta Direct Placement 제안을 통합(F14) | Samsung Semiconductor 기술 블로그(FDP 소개·하이퍼스케일러 채택·RocksDB WAF), StorageNewsletter 2025-02 | ✅ |

**독해**: 1단계(ECC)는 완결된 이관이다(F33). 2단계는 SSD 진영이 디바이스·드라이버 안에서 워크로드에 적응하려 한 시도들(스트림 F36·자동 스트림 F37·FTL 핫/콜드 추정 F38·IO 결정성 F39)로, **QoS·성능은 개선했으나 WAF는 실 워크로드에서 ≈3에 머물렀다**(F38). 원인은 데이터 수명이 호스트·애플리케이션에만 있는 정보라는 점(F40)이다. 따라서 3단계(호스트 시스템 공동 설계: 배치 표준 + 캐시 관리자 정책)만이 WAF를 1.03까지 낮췄고(F15·F34), P/E가 100배 준 QLC로 요구 DWPD를 충족하는 경로는 이것뿐이다(F35). 등급: F36~F39는 검색 인용(원문 열람 차단), F40은 삼성 공식 블로그.

## 9. 병렬 축 — SSD당 NAND 다이 수와 다이 고장률 (2026-09-18 추가, 슬라이드 v1.4 근거)

사용자 지적(2026-09-18): "SSD에 들어가는 NAND 다이 수의 경향성도 봐야 한다. 다이 수가 늘수록 다이 고장(die failure)으로 함께 버려야 할 다이가 늘어, SSD 고장률을 일정 수준으로 유지하려면 다이 고장률을 계속 낮춰야 하는 부담이 생겼고 기술적 한계에 봉착하고 있다. 칩 면적이 커질수록 수율을 올리기 어려운 것과 같은 원리다. 그래서 SSD 내부 RAID나 여분 다이 교체 형태의 해법이 발전하는 방향이고, 향후 SSD 수준에서 해결하지 못하면 상위 계층의 도움이 필요할 수 있다."

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| F41 | **요구 고정 — 기능 고장률(FFR)**: JESD218은 클라이언트·엔터프라이즈 모두 FFR ≤ 3%를 요구하며, 내구성 등급(TBW)은 이 FFR을 만족하는 최대 쓰기량으로 정의된다 | Seagate TP618, JEDEC JC-64.8(Alvin Cox 발표), JESD218B.01 | ✅ |
| F42 | **SSD당 다이 수 추이(환산)**: Intel DC S3700 800GB(2012) = 16패키지 × 8다이 × 64Gb 25nm MLC = **128다이**(raw 1,024GB) · Intel P4510 8TB(2018) 512Gb 64L TLC ≈ **144다이**(raw 환산) · Solidigm P5316 30.72TB(2021) 144L QLC 1Tb ≈ **256다이**(raw 32TB) · Solidigm P5336 61.44TB(2023) 192L QLC 1Tb ≈ **512다이** · **Kioxia LC9 245.76TB(2025) = 2Tb BiCS8 QLC 32다이 스택(8TB/패키지) × 32패키지 = 1,024다이**, Micron 6600 ION 245.76TB(2026-05 출하, G9 QLC)도 동급 | TweakTown(S3700 분해), Intel P4510 리뷰, Solidigm P5316·P5336 제품 브리프, Kioxia 보도자료·StorageReview(LC9), Micron 보도자료(6600 ION) | 🟡(S3700·LC9 ✅, 나머지 용량÷다이 밀도 환산 ⚠️) |
| F43 | **고장 모델**: 보호 없이 다이가 독립 고장하면 SSD 생존 확률 ≈ (1−p)^N ≈ e^(−Np) — 반도체 수율의 포아송 모델 Y = e^(−AD)(면적 A가 클수록 수율 하락, Murphy 모델은 더 비관적)와 같은 구조. 다이 수 N이 8배 늘면 같은 FFR을 지키기 위해 다이 고장률 p를 8배 낮추거나 다이 고장을 허용(tolerate)하는 구조가 필요 | 수율 모델(Leachman 강의노트, Medium 해설), 본 노트 유도 | ✅(모델)·⚠️(적용은 해석) |
| F44 | **SSD 내부 해법 1 — 다이 패리티(RAID-like)**: 슈퍼페이지를 여러 칩·다이에 걸쳐 구성하고 한 다이(패리티 다이)에 XOR 패리티를 저장해 ECC 실패·다이 고장을 복구. 패리티 실패 확률은 스트라이프에 포함된 칩·다이 수에 따라 증가하는 것으로 모델링됨. 상용 명칭: Micron **RAIN**(Redundant Array of Independent NAND, Crucial M550 2014·엔터프라이즈·관리형 NAND) | Cai·Ghose·Haratsch·Luo·Mutlu(arXiv 1808.04016 §"superpage-level parity"), Tom's Hardware(M550 RAIN), Micron 특허(RAIN 스트라이프) | ✅(학술)·🟡(상용) |
| F45 | **SSD 내부 해법 2 — 다이 은퇴·감량 운영(Fail-in-Place)**: 삼성 PM1733/PM1735(2019)의 FIP는 다이 고장을 감지해 데이터를 정상 다이로 재배치하고 고장 다이를 제외한 채 운영 — 플레인 고장 시 4GB, 듀얼 플레인 다이 고장 시 8GB 용량 감소. Kioxia도 엔터프라이즈·데이터센터 SSD에 die failure recovery를 제공 | 삼성 PM1733 브로슈어("Revolutionary Reliability — Fail-in-Place"), Network World·Windows Central(2019), Kioxia Data Loss Mitigation 기술 브리프 | ✅(삼성)·🟡(Kioxia) |
| F46 | **호스트 가시성 — OCP SMART**: OCP Datacenter NVMe SSD 사양(v2.0 2021~v2.7 2025)의 SMART Cloud Attributes 로그(C0)에 **XOR 복구 카운트**(NAND ECC와 별도)와 데이터 복구 성공/실패 필드를 두어 하이퍼스케일러가 다이 수준 복구 이벤트를 관측 — 다이 고장 처리가 SSD 내부에서 호스트가 보는 지표로 올라온 첫 단계 | OCP Datacenter NVMe SSD Specification v2.0~v2.7, NVMe Cloud SSD Spec v1.0(2020), NVM Express 웨비나(2020) | 🟡 |
| F47 | **상위 계층 선례 — 플랫폼 fail-in-place**: Microsoft Research **Hyrax**는 부품(메모리)이 고장난 서버를 교체하지 않고 저하된 용량·성능을 VM 스케줄러가 흡수하게 해 서버 수리 요구를 50~60% 줄임(프로덕션 트레이스 시뮬레이션) — 감량 운영을 SSD가 아니라 플랫폼 계층이 수용하는 구조. 하이퍼스케일러의 드라이브 간 소거 부호·복제는 SSD 단위 고장을 이미 호스트가 흡수하는 표준 | Microsoft Research(Hyrax) | ✅(DRAM·서버)·⚠️(SSD 적용은 해석) |

**독해**: 요구(FFR ≤ 3%, F41)는 고정인데 단품 지표(SSD당 다이 수 128 → 1,024, 8배, F42)는 악화됐다. 보호 없는 SSD 고장률은 N에 비례하므로(F43) 다이 고장률을 8배 낮추거나 다이 고장을 허용해야 하고, 다이 고장률 개선이 한계에 닿자 해법은 SSD 계층으로 이관됐다 — 다이 패리티(F44)와 다이 은퇴·감량 운영(F45). 이 해법들은 패리티·여분 용량 오버헤드를 늘리며, 다이 수가 계속 늘면 SSD 단독으로는 부족해질 수 있다. 상위 계층은 이미 준비 중이다: 호스트가 XOR 복구를 관측하고(F46), 플랫폼이 감량 운영을 수용하며(F47), 드라이브 간 소거 부호가 SSD 고장을 흡수한다. 내구성 축(P/E → ECC → WAF)과 같은 "요구 고정·단품 악화·상위 계층 보상" 구조의 **병렬 축**이다.

## 5. 검색 원문 목록

- §9 다이 수·고장률: JESD218 FFR https://www.seagate.com/files/staticfiles/docs/pdf/whitepaper/tp618-ssd-tech-paper-us.pdf · https://www.jedec.org/sites/default/files/Alvin_Cox%20[Compatibility%20Mode]_0.pdf · S3700 분해 https://www.tweaktown.com/reviews/5195/intel-dc-s3700-800gb-enterprise-ssd-review/index.html · P4510 https://www.storagereview.com/review/intel-ssd-dc-p4510-review · P5316 https://www.solidigm.com/products/data-center/product-briefs/d5-p5316-product-brief.html · LC9 https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html · https://www.storagereview.com/news/245tb-kioxia-lc9-ssd-sets-new-ssd-density-record · 6600 ION https://investors.micron.com/news/press-release/2026/Industry-Leading-245TB-Micron-6600-ION-Data-Center-SSD-Now-Shipping/default.aspx · 수율 모델 https://fog.misty.com/perry/cod/references/yield_models.pdf · 다이 패리티 https://arxiv.org/pdf/1808.04016 · RAIN https://www.tomshardware.com/reviews/crucial-m550-ssd-review,3772-3.html · 삼성 FIP https://download.semiconductor.samsung.com/resources/brochure/PM1733%20NVMe%20SSD.pdf · https://www.networkworld.com/article/967895/samsung-introduces-ssds-it-claims-will-never-die.html · Kioxia https://americas.kioxia.com/content/dam/kioxia/en-us/business/ssd/asset/KIOXIA_NVMe_SSDs_Data_Loss_Mitigation_Tech_Brief.pdf · OCP 사양 https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-7-final-pdf · Hyrax https://www.microsoft.com/en-us/research/publication/hyrax-fail-in-place-server-operation-in-cloud-platforms/
- §8 SSD 단독 최적화 한계: HotStorage'14 https://www.usenix.org/system/files/conference/hotstorage14/hotstorage14-paper-kang.pdf · AutoStream SYSTOR'17 https://dl.acm.org/doi/10.1145/3078468.3078469 · https://www.systor.org/2017/slides/AutoStream.pdf · StreamCSD https://www.researchgate.net/publication/394380061 · FTL 핫/콜드 https://patents.google.com/patent/US20160139812A1/en · https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11068197 · ASA-FTL https://www.researchgate.net/publication/309687398 · NVMe 1.4 IOD https://blocksandfiles.com/2019/11/07/datacentre-ssd-noisy-neighbour-problems-and-long-tail-latencies-solved-by-nvme-v1-4/ · https://medium.com/@saswatidas13/using-nvm-sets-to-mitigate-read-indeterminism-in-ssd-drives-4427b10bf776 · https://www.cse.iitk.ac.in/users/amitangshu/nca_2021.pdf · https://dl.acm.org/doi/10.1145/3568427 · 삼성 FDP 블로그 https://semiconductor.samsung.com/news-events/tech-blog/flexible-data-placement/ · https://semiconductor.samsung.com/news-events/tech-blog/what-hyperscalers-need-to-know-about-flexible-data-placement-fdp/ · https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/ · https://www.storagenewsletter.com/2025/02/05/nvme-fdp-a-promising-new-ssd-data-placement-approach/

- JEDEC JESD79-5C PRAC: https://www.jedec.org/news/pressreleases/jedec-updates-jesd79-5c-ddr5-sdram-standard-elevating-performance-and-security · https://www.techpowerup.com/321808/ · https://www.storagenewsletter.com/2024/04/22/jedec-published-jesd79-5c-ddr5-sdram-standard/ · QPRAC https://arxiv.org/pdf/2501.18861 · MOAT https://arxiv.org/pdf/2407.09995
- JEDEC DDR5 JESD79-5: https://www.jedec.org/news/pressreleases/jedec-publishes-new-ddr5-standard-advancing-next-generation-high-performance · JESD79-5A: https://www.jedec.org/news/pressreleases/jedec-publishes-update-ddr5-sdram-standard-used-high-performance-computing
- HBM: https://en.wikipedia.org/wiki/High_Bandwidth_Memory · https://pcper.com/2015/06/amd-exposes-fiji-to-the-world-hbm-for-the-enthusiast/ · HBM4 https://www.jedec.org/news/pressreleases/jedec%C2%AE-and-industry-leaders-collaborate-release-jesd270-4-hbm4-standard-advancing · https://www.rambus.com/blogs/hbm3-everything-you-need-to-know/
- HBM4E 커스텀 베이스 다이: https://www.trendforce.com/news/2026/01/23/ · https://www.trendforce.com/news/2026/03/20/ · https://www.trendforce.com/news/2026/08/31/ · https://www.eetimes.com/the-state-of-hbm4-chronicled-at-ces-2026/
- HBF: https://www.sandisk.com/company/newsroom/press-releases/2025/2025-08-06-sandisk-to-collaborate-with-sk-hynix-to-drive-standardization-of-high-bandwidth-flash-memory-technology · https://www.sandisk.com/company/newsroom/press-releases/2026/2026-02-25-sandisk-and-sk-hynix-begin-global-standardization-of-next-generation-memory-solution-high-bandwidth-flash-hbf · https://www.storagereview.com/news/high-bandwidth-flash-gets-its-first-open-spec-512gb-stacks-and-up-to-3-0tb-s · https://www.tomshardware.com/pc-components/ssds/sandisk-and-sk-hynix-unveil-hbf-spec-up-to-16-hi-nand-stacks-3-tb-s-bandwidth-ucie · Hot Chips 2026: https://www.tomshardware.com/pc-components/ssds/hot-chips-2026-high-bandwidth-flash-promises-massive-bandwidth-and-capacity-but-its-usability-is-extremely-limited-new-memory-format-strikes-a-balance-between-hbm-and-nand-flash
- CXL: https://computeexpresslink.org/wp-content/uploads/2024/03/CXL_3.1-Webinar-Presentation_Feb_2024.pdf · https://en.wikipedia.org/wiki/Compute_Express_Link
- MRDIMM: https://www.trendforce.com/news/2024/07/29/news-mrdimmmcrdimm-to-be-the-new-sought-afters-in-memory-field/ · https://www.jedec.org/news/pressreleases/jedec%C2%AE-advances-ddr5-mrdimm-ecosystem-new-memory-interface-logic-and-expanded
- Row Hammer: https://arxiv.org/abs/2306.16093 · https://github.com/CMU-SAFARI/rowhammer · Chipkill: https://en.wikipedia.org/wiki/Chipkill · https://www.atpinc.com/blog/ecc-dimm-memory-ram-errors-types-chipkill
- NAND 내구성·ECC: https://www.kingston.com/en/blog/pc-performance/difference-between-slc-mlc-tlc-3d-nand · https://lexarenterprise.com/nand-flash-memory/ · https://arxiv.org/pdf/1808.04016 · https://americas.kioxia.com/content/dam/kioxia/shared/business/memory/mlc-nand/asset/productbrief/KIOXIA_Understanding_ECC_Tech_Brief.pdf · https://thememoryguy.com/how-3d-nand-shrinks-ecc-requirements/
- LDPC: https://www.usenix.org/system/files/conference/fast13/fast13-final125.pdf · https://pcper.com/2015/01/lite-on-introduces-worlds-first-tlc-ssd-with-ldpc-technology/
- SSD 역사: https://www.pcworld.com/article/472983/evolution-of-the-solid-state-drive.html · https://en.wikipedia.org/wiki/M-Systems · https://www.os2museum.com/wp/diskonchip/
- 호스트 협력 표준: TRIM https://www.snia.org/educational-library/ata-trim-delete-notification-support-windows-7-2009 · LightNVM https://www.usenix.org/conference/fast17/technical-sessions/presentation/bjorling · Streams https://www.snia.org/educational-library/autostream-automatic-stream-management-multi-stream-ssds-big-data-era-2017 · ZNS https://nvmexpress.org/nvm-express-q3-webcast-qa-answering-your-questions-about-nvme-zoned-namespace-ssds-and-the-linux-zoned-storage-ecosystem/ · FDP https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/ · https://nvmexpress.org/wp-content/uploads/FMS-2023-Flexible-Data-Placement-FDP-Overview.pdf
- 지표(§7): SNIA 내구성 백서 https://snia.org/sites/default/files/SSSI/NVMe_SAS_SATA_Endurance_White_Paper.pdf · Seagate TP618 https://www.seagate.com/files/staticfiles/docs/pdf/whitepaper/tp618-ssd-tech-paper-us.pdf · ATP DWPD 공식 https://www.atpinc.com/blog/ssd-endurance-specification-lifespan · Kioxia TBW vs P/E https://americas.kioxia.com/content/dam/kioxia/en-us/business/memory/mlc-nand/asset/KIOXIA-TBW-vs-PE-Cycles-Tech-Brief.pdf · Intel X25-E 데이터시트 https://download.intel.com/newsroom/kits/ssd/pdfs/X25-E_DataSheet.pdf · S3700 https://www.storagereview.com/review/intel-ssd-dc-s3700-series-enterprise-ssd-review · P4510 https://www.storagereview.com/review/intel-ssd-dc-p4510-review · P5316 https://www.solidigm.com/products/data-center/product-briefs/d5-p5316-product-brief.html · RBER https://www.researchgate.net/publication/4348207_Bit_error_rate_in_NAND_Flash_memories · https://www.researchgate.net/publication/254023554_Error_Patterns_in_MLC_NAND_Flash_Memory_Measurement_Characterization_and_Analysis · WD ECC/DSP 백서 https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/public/western-digital/collateral/white-paper/white-paper-the-application-of-ecc-dsp-to-flash-memory.pdf
- QLC 1호: https://www.globenewswire.com/news-release/2018/05/21/1509612/14450/en/Micron-Ships-Industry-s-First-Quad-Level-Cell-NAND-SSD.html · 3D NAND 층수: https://www.blocksandfiles.com/data-management/2024/12/04/samsung-developing-400-plus-layer-3d-nand/1603230

## 6. 미확인·주의

- F6의 ECC 비트 수치는 세대·벤더별 편차가 크고 검색 요약 기반이므로 **대표값**으로만 쓴다(정확한 값은 각 벤더 데이터시트 필요).
- F27 HBF 용량·대역폭은 **사양 상한**이며 상용 제품 값이 아니다. "HBM 대비 8~16배"는 매체 표현.
- F25 HBM 스택당 대역폭은 세대 대표값(핀 속도·폭 구성에 따라 다름).
- "DRAM 단품이 요구를 만족해 왔다"는 명제는 §3처럼 축(신뢰성 vs 용량·대역폭)을 나눠 봐야 하며, 본 노트는 반례(Chipkill·RFM·PRAC·CXL·MRDIMM)를 함께 기록했다.
