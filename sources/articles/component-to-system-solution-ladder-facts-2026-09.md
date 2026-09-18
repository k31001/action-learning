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

## 5. 검색 원문 목록

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
- QLC 1호: https://www.globenewswire.com/news-release/2018/05/21/1509612/14450/en/Micron-Ships-Industry-s-First-Quad-Level-Cell-NAND-SSD.html · 3D NAND 층수: https://www.blocksandfiles.com/data-management/2024/12/04/samsung-developing-400-plus-layer-3d-nand/1603230

## 6. 미확인·주의

- F6의 ECC 비트 수치는 세대·벤더별 편차가 크고 검색 요약 기반이므로 **대표값**으로만 쓴다(정확한 값은 각 벤더 데이터시트 필요).
- F27 HBF 용량·대역폭은 **사양 상한**이며 상용 제품 값이 아니다. "HBM 대비 8~16배"는 매체 표현.
- F25 HBM 스택당 대역폭은 세대 대표값(핀 속도·폭 구성에 따라 다름).
- "DRAM 단품이 요구를 만족해 왔다"는 명제는 §3처럼 축(신뢰성 vs 용량·대역폭)을 나눠 봐야 하며, 본 노트는 반례(Chipkill·RFM·PRAC·CXL·MRDIMM)를 함께 기록했다.
