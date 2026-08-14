# 하이브리드 본딩의 구조 선택지와 중국 경쟁자의 기술 한계선 — 웹 리서치 종합 (2026-08-12)

**수집일**: 2026-08-12
**유형**: 웹 검색 기반 2차 자료 종합 (W2W/D2W 본딩 구조 유형 / 분할 경계별 트레이드오프 / YMTC Xtacking 선행성과 특허 / CXMT 기술 한계선 / 선단로직+메모리 동시보유의 희소성 / 메모리-로직 통합 양산 사례)
**용도**: 2차 저지선 전략 2번 「판을 옮긴다」 — 4장(제안 3: 최적의 본딩 구조)과 5장(해자)의 근거 데이터

**주의 (가장 중요)**:
- **"중국이 하이브리드 본딩을 못 한다"는 명제는 공개 자료로 성립하지 않는다.** ① YMTC가 2018년 업계 최초로 W2W 본딩 NAND를 상용화했고 ② Knowmade 기준 하이브리드 본딩 특허 수 1위이며 ③ 삼성이 오히려 라이선스를 받는 쪽으로 보도됐고 ④ CXMT는 2026년 현재 허페이에서 본디드 DRAM 파일럿을 돌리고 있으며 ⑤ YMTC–CXMT가 Xtacking 기반 HBM 협력을 발표했다. 본 노트 §3·§4-5는 이 반대 증거를 먼저 정리한다. **본딩에 해자를 두면 보고서가 무너진다.**
- 공개 자료로 성립하는 해자는 **본딩 + 선단 로직 노드 + 메모리의 결합**이다(§5). 10nm 이하 로직을 양산하는 회사는 전 세계 3곳(TSMC·삼성·인텔)이고, 그중 DRAM/NAND를 만드는 곳은 **삼성 하나**다.
- 개발 TAT·본딩 피치 등 사내 수치는 본 노트에 없다. 여기 실린 수치는 전부 공개 출처다.
- 신뢰도 낮은 2차 집계 매체(techtimes·wccftech·biggo·zerohedge 등)에서 나온 항목은 **[저신뢰]** 태그를 달았다.

---

## §1. 분할 경계 지도 — 무엇과 무엇을 어디서 잘라 붙이는가

하이브리드 본딩(Cu–Cu direct bond + 유전체 직접 접합)의 본질은 "붙이는 기술"이 아니라 **"어디서 자를지 고르는 자유"**다. 아래 표가 이 보고서 4장의 핵심 자료다.

### 1-1. 실제 구현별 분할 경계

| 구현 | 무엇을 자르는가 (경계) | 방식 | 상태 | 출처 |
|---|---|---|---|---|
| **CuA/CUA** (Micron, 32L~) | 안 자름 — 같은 웨이퍼에 페리를 **먼저** 만들고 그 위에 어레이 | 모놀리식 | 양산 (2016~) | [TechInsights 비교](https://www.techinsights.com/blog/comparison-latest-3d-nand-products-ymtc-samsung-sk-hynix-and-micron) |
| **COP** (Samsung, 176L~) | 동일. 명칭만 다름 (Cell over Periphery) | 모놀리식 | 양산 | 동 |
| **PUC** (SK hynix, "4D NAND" 2018~) | 동일 (PERI Under Cell) | 모놀리식 | 양산 | [Tom's Hardware](https://www.tomshardware.com/news/sk_hynix-debuts-4d_nand,37565.html) |
| **Xtacking** (YMTC, 2018~) | **셀 어레이 ↔ 페리 CMOS를 별도 웨이퍼로 분리**. 페리가 어레이 *위*로 뒤집혀 올라감 | **W2W 본딩** | 양산 (2019-09~) | [YMTC](https://www.ymtc.com/en/technicalintroduction.html), [AnandTech 2018](https://home.anandtech.com/show/13166/yangtze-memory-unveils-xtacking-architecture-for-3d-nand-up-to-3-gbps-io) |
| **CBA** (Kioxia/SanDisk, BiCS8 218L~) | 동일 경계(어레이/페리)를 별도 웨이퍼로 | **W2W 본딩** | 양산 (2024 하반기~) | [Kioxia](https://www.kioxia.com/en-jp/rd/technology/cba.html), [TechInsights](https://www.techinsights.com/blog/kioxiawd-bics8-218l-cba-3d-tlc-nand) |
| **Samsung V10 BV-NAND** (400+ layer) | 동일 경계, 웨이퍼 본딩 + 3-Stack | **W2W 본딩** | 2026 발표 | [Samsung Newsroom FMS 2026](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure) |
| **Samsung 4F² COP/PUC DRAM** (ISSCC 2026) | **DRAM 셀 어레이 ↔ core/페리 회로**를 별도 웨이퍼로 | **W2W 하이브리드 Cu 본딩** | 프로토타입 (16Gb) | [THE ELEC 2026-03-04](https://www.thelec.net/news/articleView.html?idxno=5632), [SemiWiki](https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/) |
| **Sony 3층 CIS** (IMX400, 2017) | **픽셀 / DRAM(1Gb) / 로직**을 3개 층으로 | F2F 본딩 + TSV (DRAM 3µm 박막화) | 양산 (2017~) | [WikiChip IEDM 2017](https://fuse.wikichip.org/news/763/iedm-2017-sonys-3-layer-stacked-cmos-image-sensor-technology/) |
| **AMD 3D V-Cache** (TSMC SoIC) | **SRAM 캐시 ↔ 로직 다이** | D2W 하이브리드 본딩 (~9µm 패드 피치) | 양산 (2022~) | [WikiChip](https://fuse.wikichip.org/news/5531/amd-3d-stacks-sram-bumplessly/) |
| **HBM** (전 세대) | **코어 DRAM 다이 ↔ 베이스(로직) 다이** — 베이스만 로직 노드 | D2W (현재 TC-NCF/MR-MUF, 마이크로범프) | 양산 | §5-3 |
| **imec AuC** (Array-under-CMOS, CMOS 2.0) | **비트셀 ↔ 인코딩/디코딩 로직** — 페리의 *일부만* 분리해 선단 로직 티어로 | W2W 하이브리드 본딩 | 연구 | [imec CMOS 2.0](https://www.imec-int.com/en/articles/cmos-20-bringing-heterogeneity-inside-system-chip), [arXiv 2510.04535](https://arxiv.org/html/2510.04535v1) |

### 1-2. 이 표가 말하는 것 — 경계는 하나가 아니다

세 층위의 경계가 이미 산업에 존재한다:

1. **어레이 / 페리 전체** — NAND CBA·Xtacking, DRAM 4F² COP. 가장 굵은 절단.
2. **비트셀 / 페리의 일부(디코더·센스앰프)** — imec AuC. "인코딩/디코딩 로직은 선단 로직 티어에 두고, 비트셀은 완전히 다른 기술 최적화를 따라간다" ([arXiv 2510.04535](https://arxiv.org/html/2510.04535v1)). **이것이 "메모리를 로직 노드에 붙인다"의 가장 정밀한 형태**이며, 현재 연구 단계다.
3. **메모리 스택 / 시스템 로직** — HBM 베이스다이, zHBM. 메모리 바깥의 경계.

> imec CMOS 2.0의 핵심 명제: SoC를 기능 층(tier)으로 쪼개고, **각 층을 그 기능의 제약에 가장 맞는 기술로** 만든 뒤 3D 인터커넥트로 다시 잇는다. 이때 분할의 기준은 STCO(System-Technology Co-Optimization)다 ([imec](https://www.imec-int.com/en/articles/cmos-20-bringing-heterogeneity-inside-system-chip)).

**보고서 4장 「진화에는 논리가 있다」에 직접 대응되는 근거**: 산업은 이미 "디램에 맞게 본딩을 바꾼" 게 아니라 **기능별 제약에 맞춰 경계를 새로 그리는** 방향으로 이론화를 끝냈다(CMOS 2.0/STCO). 우리가 논쟁 중인 것을 imec은 방법론으로 정리해 두었다.

### 1-3. 모놀리식(CuA/COP/PUC)의 한계 — 왜 잘라야 하는가

- CuA 구조는 **단일 Si 웨이퍼 위에 CMOS를 먼저 만들고 그 위에 셀 어레이를 연속 형성**한다. 따라서 "셀 어레이 형성 중의 **열예산(thermal budget)이 CMOS 성능을 제약**한다" ([Kioxia](https://www.kioxia.com/en-jp/rd/technology/topics/topics-64.html)).
- CBA는 CMOS와 셀 어레이를 **각각 개별 처리**할 수 있어 칩 면적을 줄이고 성능을 올린다 (동).
- CBA는 **CMOS↔어레이를 잇던 HARC(고종횡비 콘택)를 제거**하고 저저항 Cu 배선을 쓸 수 있게 한다 (동).
- 부가 효과: "**서로 다른 성능의 CMOS와 서로 다른 용량의 어레이를 조합**해 다양한 사양의 3D 플래시를 만들 수 있다" (동). → 제품 파생 전략(제안 2 zHBM MTO 다품종)의 공개 근거.
- 332L BiCS10에서 CBA의 효과가 정량화됨: "고온 식각이 하부 트랜지스터를 열화시키는 제약을 분리 제조로 완전히 제거 → **332층 스택에서 4,800 MT/s 인터페이스의 신호 무결성**을 로직 층의 타협 없이 달성" ([Tech Times 2026-08-05, 저신뢰 2차](https://www.techtimes.com/articles/323160/20260805/kioxia-squeezes-38-more-data-per-chip-samsung-68-fewer-layers.htm))
- DRAM 쪽의 동일 제약: DRAM 주변 트랜지스터는 **550~600℃ 이상의 열처리를 견뎌야** 하며 일반 로직 플로우의 copy-paste가 불가능하다 (imec — 상세는 [fab-toolset-commonality-conversion-2026-08.md §1-3](fab-toolset-commonality-conversion-2026-08.md) 참조). **어레이와 페리를 분리하면 이 제약이 사라진다** — 이것이 DRAM에서 본딩이 필연인 1차 이유다.

---

## §2. 분할 경계 선택의 트레이드오프 — 공개된 정량치

### 2-1. 본딩 피치의 계층 (가장 중요한 정량 지표)

| 응용 | 피치 | 출처 |
|---|---|---|
| 마이크로범프 (최선단) | **40µm** (범프 25µm + 간격 15µm) | [SemiEngineering](https://semiengineering.com/bumps-vs-hybrid-bonding-for-advanced-packaging/) |
| HBM 현행 (TC-NCF/MR-MUF) | **수 µm** | [THE ELEC 2026-03-04](https://www.thelec.net/news/articleView.html?idxno=5632) |
| AMD 3D V-Cache (TSMC SoIC) | **~9µm** 패드 피치 | [WikiChip](https://fuse.wikichip.org/news/5531/amd-3d-stacks-sram-bumplessly/) |
| 3D NAND CBA/Xtacking | **~700nm** (Kioxia는 sub-800nm 정렬보정 기법 발표) | [THE ELEC](https://www.thelec.net/news/articleView.html?idxno=5632); Kioxia ECTC |
| **DRAM 4F² (Samsung ISSCC 2026)** | **~300nm** | [THE ELEC 2026-03-04](https://www.thelec.net/news/articleView.html?idxno=5632) |
| imec/EVG W2W 연구 최선단 | **200nm** (ECTC 2026 발표) | [imec 보도자료](https://www.imec-int.com/en/press/imec-and-ev-group-demonstrate-wafer-wafer-hybrid-bonding-200nm-interconnect-pitch-and-record) |

> **핵심 함의**: DRAM은 NAND보다 **2배 이상 미세한 피치**(300nm vs 700nm)를 요구하고, HBM보다 **10배 이상 미세**하다. "NAND에서 되니까 DRAM에서도 된다"가 성립하지 않는 지점이 여기다. 반대로 말하면 DRAM용 W2W 본딩 역량은 NAND 역량의 자동 파생물이 아니다 — **YMTC의 NAND 본딩 선행이 DRAM 본딩 선행을 자동으로 의미하지는 않는다**(§3-6, §4-5의 균형점).

### 2-2. 정렬 정밀도·수율 — ECTC 2026 최신 공개치

| 항목 | 수치 | 출처 |
|---|---|---|
| imec/EVG W2W, 200nm 피치 | Cu 패드-패드 **post-bond 오버레이 40nm 미만**, 300mm 웨이퍼 전 다이 | [imec/EVG PR](https://www.evgroup.com/fileadmin/media/company/news/2026/2026_05_28_IMEC/Press_Release_IMEC_EVG_2026_05_28_EN.pdf) |
| 공정 조건 | 유전체 **SiCN**, 본딩 전 CMP로 초평탄화 + Cu 패드 **수 nm 리세스** 제어 | 동 |
| AMAT/EVG, 450nm 피치 | **수율 98%**, via chain **2,000만 링크** 기준 | [ECTC 2026, NineScrolls 2차](https://ninescrolls.com/news/applied-materials-and-ev-group-report-98-yield-on-450nm-pitch-copper-hybrid) |
| AMAT/EVG, 300nm 피치 | 오버레이 **50nm** | 동 |
| 결함 기구 | Cu–Cu 계면의 **탄소 리치 오염층**이 큰 (111) 배향 Cu 그레인과 동반 발생 → 공정 최적화로 제거 | 동 |
| 업계 요구 기준선 | "최선단 3D 메모리·로직에는 **sub-0.5µm 본드 피치 + 2,000만 링크 via chain에서 90% 이상 수율**이 요구된다" | 동 |
| 참고 (D2W) | imec D2W **2µm** Cu 패드 피치 시연 | [imec](https://www.imec-int.com/en/press/imec-demonstrates-die-wafer-hybrid-bonding-cu-interconnect-pad-pitch-2mm) |

**ECTC 2026** = 제76회 IEEE Electronic Components and Technology Conference, 2026-05-26~29, Orlando.

### 2-3. W2W vs D2W — 수율 곱셈 문제

| 항목 | W2W | D2W |
|---|---|---|
| KGD 선별 | **불가** — 웨이퍼 통째로 붙음 | **가능** — 사전 테스트된 양품 다이만 적층 |
| 수율 구조 | 한 웨이퍼의 불량 다이가 **짝을 이룬 반대편 양품까지 폐기** | 불량 다이는 본딩 전 폐기 |
| 다이 크기 의존 | **다이가 커질수록 비용곡선이 가파름** (양품 손실 비용이 지배) | 완만 |
| 다층 적층 | 층당 99% 수율 → 10층 시 0.99¹⁰ ≈ **90%** (10% 결함) | KGD로 완화 |
| 정합/스루풋 | 정렬 효율·균일도·스루풋 우수 → **대량생산 적합** | 다이 단위 핸들링으로 스루풋 부담 |
| 실제 적용 | 수율이 높고 **다이가 작은** 제품 — CIS, 3D NAND | HBM(사전 테스트 DRAM 다층), 로직 칩렛 |

출처: [3D InCites 비용분석](https://www.3dincites.com/2015/04/wafer-to-wafer-bonding-cost-analysis/), [IMAPSource "A Cost and Yield Analysis of Wafer-to-Wafer Bonding"](https://imapsource.org/article/66759-a-cost-and-yield-analysis-of-wafer-to-wafer-bonding/attachment/133303.pdf), [arXiv 2510.15880](https://arxiv.org/pdf/2510.15880), [MarketsandMarkets](https://www.researchandmarkets.com/reports/6214301/hybrid-bonding-market-wafer-to-wafer-die-to)

**테스트·수리 전략**: "W2W 조립에서는 **각 층과 시스템에 충분한 리던던시를 내장해 대부분의 문제를 repair로 해결**할 수 있어야 한다." 메모리는 이미 2D 설계에서 BIST·repair·리던던시를 써 왔고, 이것이 2.5D/3D로 이전 가능하다 ([SemiEngineering "Welcome To The 'Probably Good Die' Era"](https://semiengineering.com/welcome-to-the-probably-good-die-era/)).

> **보고서 논증에 중요한 비대칭**: DRAM 어레이/페리 분리는 **W2W가 자연스러운 선택**(피치 300nm는 D2W로 불가)인데, W2W는 KGD를 포기해야 한다. 즉 **"수리 가능한 설계(repairability by design)"가 본딩 구조 선택의 진짜 제약**이다. Samsung이 ISSCC 2026 프로토타입에서 -25~95℃ 전 구간 결함이 **"repairable limit 이내"**임을 검증한 것이 정확히 이 지점이다([THE ELEC](https://www.thelec.net/news/articleView.html?idxno=5632)).

### 2-4. 열·전력 — 공개된 정량치

| 항목 | 수치 | 출처 |
|---|---|---|
| Samsung HCB vs TCB (16-Hi 급) | **패키지 스택 높이 15% 이상 감소**, **열저항 20% 이상 감소**, 핫스팟 정션 온도 하락, 메모리 스택↔로직 다이 간 **열간섭 감소** | Samsung, "System-Level Thermal Characterization of Hybrid Cu Bonding HBM with 2.5D Advanced Packaging", IEEE, 2026-06 ([NineScrolls 요약](https://ninescrolls.com/news/samsung-publishes-first-system-level-proof-that-hybrid-copper-bonding-cuts-hbm)) |
| 하이브리드 본딩 열전달 일반 | Cu 패드 밀도·계면 특성·기계적 처리 최적화로 **정션-정션 열저항 22.8~47% 감소**, 수직 열전도도 최대 3배 | [MDPI Electronics 14(13) 2682](https://www.mdpi.com/2079-9292/14/13/2682) |
| 인터커넥트 효율 (vs 마이크로범프) | 밀도 **>15배**, 에너지 효율 **3배** | [WikiChip](https://fuse.wikichip.org/news/5531/amd-3d-stacks-sram-bumplessly/) |

**단, 열은 양날**: "3DIC 조립에서 열 방출은 문제이고, **DRAM은 특히 열에 약하다**" ([SemiEngineering](https://semiengineering.com/memory-wall-gets-higher/)).

### 2-5. 얻는 이득 — 실제 제품에서 확인된 수치

| 제품/기술 | 이득 | 출처 |
|---|---|---|
| Samsung 4F² VCT + HCB | 셀 크기 **6F² 대비 약 30% 축소**, 웨이퍼당 칩 **약 20% 증가** | [THE ELEC 2026-03-04](https://www.thelec.net/news/articleView.html?idxno=5632) |
| 동 — core 회로 면적 | **17.0% → 2.7%** (다이 면적 직접 축소) | [SemiWiki ISSCC 2026](https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/) |
| 동 — 본딩 인터커넥트 수 | **2,880만 → 약 1,000만 개**로 감축 (설계 최적화) | [THE ELEC](https://www.thelec.net/news/articleView.html?idxno=5632) |
| 동 — 설계 여유 | 어레이 밖 회로를 별도 웨이퍼로 빼면서 **design rule을 느슨하게** 쓸 수 있음 | [SemiWiki](https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/) |
| 동 — 2030 목표 | 핀당 **7 → 10 Gbps**, **3 → 2 pJ/bit** | [THE ELEC](https://www.thelec.net/news/articleView.html?idxno=5632) |
| Samsung V10 BV-NAND (400+층) | V9 대비 **밀도 약 58% 증가**, read/write/IO 성능 개선 | [TrendForce 2026-08-05](https://www.trendforce.com/news/2026/08/05/news-samsung-unveils-industry-first-400-layer-v10-bv-nand-memory-density-up-58-vs-v9/), [Samsung Newsroom](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure) |
| Kioxia BiCS10 (332층 QLC, CBA) | **37 Gb/mm² 초과** — 68층 적은 스택으로 삼성 400+층 칩을 상회 | [Tech Times 2026-08-05, 저신뢰 2차](https://www.techtimes.com/articles/323160/20260805/kioxia-squeezes-38-more-data-per-chip-samsung-68-fewer-layers.htm) |
| YMTC 1Tb QLC (Xtacking 3.0) | **19.8 Gbit/mm²** — 당시 상용 IC 최고 밀도 | [iNEWS/YMTC 발표 2차](https://inf.news/en/digital/e0badbb5a6dd19bc8847558e3750d96b.html) |

**Samsung 4F² 프로토타입 사양**: 10nm급, 16Gb, VCT + W2W 하이브리드 Cu 본딩, ISSCC 2026(2026-02-15~19, 샌프란시스코) 발표. 알려진 난제는 **floating-body effect로 인한 누설 증가·리텐션 저하** ([SemiWiki](https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/)).

### 2-6. 개발 TAT — 공개 근거는 YMTC 자사 주장 하나뿐

- YMTC는 Xtacking이 **"제품 개발 기간을 최소 3개월 단축하고 제조 사이클 타임을 20% 단축"**한다고 주장 ([AllAboutCircuits 인용](https://www.allaboutcircuits.com/news/threes-a-crowd-ytmc-throws-its-own-3d-nand-into-the-ring/), YMTC 자사 발표 기반 2차).
- **이것이 "본딩이 개발 TAT를 줄인다"는 명제의 유일한 공개 정량 근거**다. 삼성·SK하이닉스·Micron·Kioxia는 본딩의 TAT 효과를 정량 공개한 적이 없다(§8).
- 메커니즘상의 정성 근거는 CBA 쪽에 있다: 어레이와 CMOS를 **개별 처리**하므로 두 웨이퍼의 공정 검토 turn을 독립적으로 돌릴 수 있고, **서로 다른 CMOS와 서로 다른 어레이를 조합**해 파생 제품을 만들 수 있다 ([Kioxia](https://www.kioxia.com/en-jp/rd/technology/cba.html)).

---

## §3. YMTC Xtacking의 선행성 — 이 보고서의 정직성이 걸린 항목

### 3-1. 타임라인 (무엇을 언제 먼저 했는가)

| 시점 | 사건 | 출처 |
|---|---|---|
| **2018-08-06** | Flash Memory Summit에서 Xtacking 아키텍처 공개, "Best of Show" 수상 | [YMTC](https://www.ymtc.com/en/technicalintroduction.html), [AnandTech](https://home.anandtech.com/show/13166/yangtze-memory-unveils-xtacking-architecture-for-3d-nand-up-to-3-gbps-io) |
| **2018~2019** | **업계 최초로 3D NAND에 하이브리드 본딩 적용** | [Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/) |
| **2019-09** | Gen2 (64L) Xtacking 양산 개시 | [YMTC](https://www.ymtc.com/en/technicalintroduction.html) |
| ~2020 | Xtacking 2.0 — WSi → **NiSi** 전환(디바이스 성능·IO 속도), 128L | [TechInsights](https://www.techinsights.com/blog/ymtcs-xtacking-30-not-what-techinsights-was-expecting-see) |
| **2022-08** | Xtacking 3.0 / X3-9070 (232L) FMS 공개 — **BSSC(back side source connect)**로 공정 단순화·원가 절감, center X-DEC로 성능 15~20% 향상 | 동, [PRNewswire](https://www.prnewswire.com/news-releases/ymtc-introduces-x3-9070-3d-nand-flash-powered-by-innovative-xtacking-3-0-architecture-301597786.html) |
| 2022-11 | TechInsights, HikSemi CC700 2TB SSD에서 232L 확인 — **시장 최초의 200층 이상 3D NAND**. 삼성·Micron·SK하이닉스보다 앞섬 | [TechInsights](https://www.techinsights.com/disruptive-event/ymtc-232l-tlc-3d-nand) |
| 이후 | Xtacking 4.0 준비 | [Tom's Hardware](https://www.tomshardware.com/news/chinas-ymtc-xtacking-4.0) |

**즉, 한국 3사가 2024~2026년에 하기 시작한 것을 YMTC는 2019년에 양산했다.** 이것이 사실관계다.

### 3-2. 특허 포지션 — Knowmade 분석

| 기업 | 하이브리드 본딩 특허 수 | 기간 |
|---|---|---|
| **YMTC** | **119건** | 2017 ~ 2024-01 |
| Samsung | **83건** | ~2023년 말 (공개 시작 2015년) |
| SK hynix | **11건** | ~2023년 말 |

출처: [Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/), [TrendForce 2025-05-09](https://www.trendforce.com/news/2025/05/09/news-chinas-ymtc-dominates-hybrid-bonding-patents-pressuring-south-korean-memory-giants-samsung-and-sk-hynix/)

**YMTC 핵심 특허 패밀리 25건이 커버하는 3개 영역** (Knowmade):
1. **3D 메모리 아키텍처** — 수직 적층 NAND·**DRAM**·SRAM 어레이, 로직 다이와 메모리 다이를 분리해 본딩하는 구조
2. **본딩 계면 엔지니어링** — **그래핀 배리어를 이용한 Cu 확산 억제**, 정밀 정렬 방법, 금속-유전체 본딩, 응력 보상
3. **제조 공정** — 표면 처리, 배리어층, 웨이퍼 다이싱, **이온주입 매립 정지층**, **커패시터 웨이퍼와 페리 웨이퍼의 모듈러 분리**

> **경고 (4장·5장 집필 시 반드시 반영)**: 위 1번과 3번 마지막 항목은 **NAND가 아니라 DRAM 구조를 직접 겨냥**한다. "커패시터 웨이퍼와 페리 웨이퍼의 모듈러 분리"는 우리가 지금 4F² COP에서 하려는 바로 그 경계다. **YMTC의 IP 우산은 NAND에 국한되지 않는다.**

### 3-3. 라이선스 현실 — 우리는 라이선시 쪽이다

- Knowmade의 판정: YMTC 특허는 **"회피 불가(unavoidable)"**. 근거는 ① 3D 메모리 집적의 근본적 병목을 커버하고 ② 삼성·SK하이닉스가 법적 다툼 대신 **라이선싱을 선택**했다는 사실 자체가 회피 난이도를 방증하며 ③ 공정·소자 양쪽 레벨에 걸쳐 있음 ([Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/)).
- **2025-02-24 보도**: 삼성이 400층 이상 NAND용으로 YMTC의 하이브리드 본딩 특허를 **라이선스하기로 했다는 루머** ([TrendForce](https://www.trendforce.com/news/2025/02/24/news-samsung-rumored-to-adopt-hybrid-bonding-patent-from-chinas-ymtc-for-400-layer-nand/), [Digitimes 2025-02-26](https://www.digitimes.com/news/a20250226PD216/nand-yangtze-memory-samsung-3d-technology.html)). SK하이닉스도 협상 중이라는 보도.
- **양사 공식 확인은 없다** — 보도 기반. §8 참조.

### 3-4. Adeia(구 Xperi) DBI 층 — 또 하나의 통행료

- Adeia는 **DBI®(Direct Bond Interconnect)의 원조 특허권자**로, 하이브리드 본딩 IP를 공격적으로 라이선싱한다.
- 라이선시: **Sony, YMTC, Micron, Kioxia, SanDisk, STMicroelectronics, Canon, AMD** ([Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/), [Adeia](https://investors.adeia.com/news-releases/news-release-details/adeia-signs-long-term-semiconductor-patent-license-agreement-0)).
  - Kioxia는 **2023-03** 장기 라이선스 체결.
  - **YMTC도 Adeia 라이선시**다 — 즉 YMTC조차 완전 자립이 아니다.
- Adeia는 **AMD를 3D V-Cache 하이브리드 본딩 관련 10건 특허 침해로 제소** ([Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/adeia-sues-amd-over-hybrid-bonding-tech-behind-3d-v-cache)).
- 특허 랜드스케이프 상위: **TSMC, Adeia, YMTC, Intel, Samsung** ([Knowmade Hybrid Bonding Patent Landscape 2024](https://www.knowmade.com/patent-analytics-services/patent-report/semiconductor-patent-landscape/semiconductor-advanced-packaging-patent-landscape/hybrid-bonding-patent-landscape-analysis-2024/)).

### 3-5. 압박의 성격 — 정확히 무엇이 문제인가

| 압박의 종류 | 실재 여부 | 근거 |
|---|---|---|
| 기술적 선행 (먼저 했다) | **사실** | 2018 발표 / 2019-09 양산 / 2022 200층+ 최초 |
| 특허 수량 우위 | **사실** | 119 vs 83 vs 11 |
| DRAM 구조까지 커버하는 IP | **사실** (Knowmade 패밀리 분류) | §3-2 |
| 라이선스 비용·조건 | **미공개** | §8 |
| 디커플링 시 라이선스 차단 리스크 | **가설** (실현 사례 없음) | 위키 [rs6-process-leadership.md](../../wiki/strategies/invariant/rs6-process-leadership.md) |
| YMTC가 선단 로직을 가졌다 | **아님** | §3-6, §5 |

### 3-6. 반대 방향의 사실 — YMTC의 경계

- Xtacking의 페리 웨이퍼는 "**원하는 IO 속도와 기능에 맞는 CMOS 로직 노드**"로 만든다 ([Semiconductor Digest 2020-09-08 teardown](https://www.semiconductor-digest.com/unlocking-the-secrets-of-the-ymtc-64-layer-3d-xtacking-nand-flash/)). **구체적 노드는 세대별로 공개 확인 실패**(§8). 다만 NAND 페리는 산업 전반적으로 성숙 노드다.
- YMTC의 본딩 피치는 NAND급(~700nm)이며, DRAM 4F²가 요구하는 **300nm급 W2W 실증 공개 기록은 확인되지 않았다**(§8).
- TechInsights는 YMTC가 Xtacking 3.0을 주장한 제품에서 **실제로는 이전 세대 구성(128L 2×2 plane)**을 발견한 사례를 보고했다 — 발표와 실물의 괴리 사례 ([TechInsights](https://www.techinsights.com/blog/ymtcs-xtacking-30-not-what-techinsights-was-expecting-see)).

> **결론 (4·5장 서술 지침)**: YMTC의 선행성은 **인정하고 시작**해야 한다. 우리의 차별점은 "본딩을 할 줄 안다"가 아니라 **"어느 경계에서 자를지 고를 수 있고, 자른 쪽을 선단 로직 노드로 만들 수 있다"**는 데 있다.

---

## §4. CXMT의 기술 한계선 — 할 수 있는 것 / 좁은 것 / 막힌 것

### 4-1. 사업 범위와 규모

| 항목 | 값 | 시점·출처 |
|---|---|---|
| 사업 범위 | **순수 DRAM 전업(pure-play)**. 로직 파운드리 없음, NAND 없음 | [SemiconductorX](https://semiconductorx.com/fabs-dram.php), [namu](https://en.namu.wiki/w/CXMT) |
| 제품 | DDR4·DDR5·LPDDR5X (JEDEC 인증), LPDDR6 준비 | 2026 |
| 팹 | 12인치 3개 (허페이 2 + 베이징 1), 각 허페이 팹 10만 wpm | 2026 |
| 캐파 | 현재 **약 30만 wpm** → 2026년 말 **약 35만 wpm** (Micron 약 37.5만 wpm) | 2026, [SemiAnalysis](https://newsletter.semianalysis.com/p/chinas-cxmt-is-set-to-challenge-dram) |
| 확장 계획 | 상하이 신규 팹 + 베이징 2번째 팹 검토, 장기 **60만 wpm 이상**, **2030년 점유율 30% 목표** | [Tom's Hardware](https://www.tomshardware.com/pc-components/dram/chinas-cxmt-targets-30-percent-dram-memory-market-share-by-2030-with-sixth-mega-fab-future-plans-bottlenecked-by-access-to-advanced-chipmaking-tools), [TrendForce 2026-08-04](https://www.trendforce.com/news/2026/08/04/news-cxmt-reportedly-eyes-second-beijing-12-inch-dram-fab-hp-asus-and-acer-said-to-begin-limited-use/) |
| 점유율 | Q3 2025 **8%** (Samsung 38 / SK 29 / Micron 22), 2026E **10%** | Counterpoint |
| 자금 | STAR Market 상장 2026-07, 조달 **$8.6B**, 상장일 **+466%**, 시총 **$489B** | [CNBC 2026-07-31](https://www.cnbc.com/2026/07/31/cxmts-sk-hynix-samsung-micron-memory-chip.html) |

### 4-2. 공정 노드 — DUV 천장

| 세대 | 노드 | 상태 | 출처 |
|---|---|---|---|
| G3 | 18nm | 양산 | [Digitimes 2025-02-13](https://www.digitimes.com/news/a20250213VL204/dram-cxmt-16nm-production-development.html) |
| G4 | 17nm → **16nm** (첫 DDR5), G3 대비 셀 크기 **20% 축소** | 양산/전환 | 동 |
| — | 17nm DDR5 수율 **약 90%** | [wccftech, **저신뢰**](https://wccftech.com/cxmt-hits-90-yield-on-17nm-ddr5-chips-closing-the-gap-with-micron-others-report/) |
| G5 | **15nm** — R&D 2025 완료, 양산 2026 말 목표 | 개발 | [Digitimes](https://www.digitimes.com/news/a20250213VL204/dram-cxmt-16nm-production-development.html) |
| 그 이하 | **sub-10nm은 EUV 없이는 불가** | — | [Tech Times, **저신뢰**](https://www.techtimes.com/articles/321597/20260725/cxmt-hits-star-market-monday-86b-war-chest-hard-equipment-ceiling.htm) |

- 방식: **SADP/SAQP 등 DUV 다중 패터닝**으로 EUV 단일 노광의 피처를 근사. 패스가 늘수록 **공정 스텝 증가 + 오버레이 오차 누적 → 비트당 원가 상승** [저신뢰 2차].
- 국산 리소: SMEE가 2025 초 첫 **28nm 이머전 DUV**를 SMIC에 인도(단일 노광 28nm, 다중 패터닝으로 11nm까지) ([abhs.in 정리](https://abhs.in/blog/china-euv-machine-asml-export-controls-ai-chip-race-2026)). 2026-07 중국이 이머전 DUV **양산 착수** 보도, SMIC·화홍·**CXMT 인도 예정** ([TrendForce 2026-07-28](https://www.trendforce.com/news/2026/07/28/news-china-reportedly-starts-mass-producing-immersion-duv-tools-smic-hua-hong-cxmt-deliveries-expected-this-year/)).
- 국산 EUV: **양산 가능한 국산 EUV는 낙관적으로 봐도 수년 뒤** ([abhs.in](https://abhs.in/blog/china-euv-machine-asml-export-controls-ai-chip-race-2026)).
- LPDDR6 성능 격차 주장: CXMT **12.8 Gbps vs 경쟁사 14.4 Gbps** — "DUV 천장의 발현" [Tech Times, **저신뢰**].

### 4-3. 로직 — 구조적으로 닫힌 경로

- **CXMT는 로직 파운드리를 갖고 있지 않다.** HBM 베이스(로직) 다이는 **SMIC 의존**으로 관측 ([SemiAnalysis](https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp)).
- SMIC의 한계 (전부 **[저신뢰] 2차 추정치**, 공식 수치 아님):
  - 7nm 수율 **50% 미만**, 개발 중인 5nm은 **20~40%** (일부 보도 ~20%)
  - DUV로 7nm 구현 시 **리소 스텝 34회** (EUV는 9회)
  - 웨이퍼 원가가 TSMC EUV 대비 **40~50% 높음**
  - N+3가 2025-12 Kirin 9030용 양산 진입, **~5nm급 밀도**이나 스케일링·수율·성능은 TSMC/삼성 5nm에 미달
  - 2026년 7nm 캐파 2배 확대 계획
  - 출처: [Semiecosystem](https://marklapedus.substack.com/p/can-china-make-5nm-chips), [SupplyICs](https://supplyics.com/insights/market-intelligence/china-logic-fabs-yield-geopolitical-risks-2026/), [chinamade.tech](https://chinamade.tech/blog/smic-explained)
- **HBM4 이후 베이스 다이는 선단 로직 노드를 요구**한다 — "HBM4와 그 이후 세대는 대역폭 증가를 따라잡기 위해 로직 다이를 선단 노드에서 만들어야 한다" ([SemiAnalysis](https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp)). **이것이 CXMT에게 닫힌 문의 정확한 위치다.**

### 4-4. HBM — 지연의 실체

| 항목 | 내용 | 출처 |
|---|---|---|
| 목표 | HBM3(4세대) **2026년 상반기 양산** | [Wedbush/TokenRing 2026-01-23](https://investor.wedbush.com/wedbush/article/tokenring-2026-1-23-chinas-cxmt-targets-2026-hbm3-production-with-42-billion-ipo) |
| 실제 | 2026-04 기준 **여전히 테스트 단계, 연내 양산 불투명** | [Digitimes 2026-04-21](https://www.digitimes.com/news/a20260421PD230/cxmt-hbm3-dram-production-2026.html) |
| 병목 | 수율, 장비 조달, **열 관리** | 동 |
| 패키징 | SK하이닉스와 동일한 **MR-MUF** 채택 | [Digitimes 2025-11-07](https://www.digitimes.com/news/a20251107PD215/hbm-sk-hynix-cxmt-mr-muf-2026.html) |
| 후공정 제약 | 적층/조립, 본딩, warpage, 패키지 수율 학습곡선 — **국산 장비만 쓰면 램프가 더 느려짐**, 검사·테스트 툴 부족 시 특히 | [Tom's Hardware](https://www.tomshardware.com/pc-components/dram/chinese-semiconductor-industry-gears-up-for-domestic-hbm3-production-by-the-end-of-2026-cxmt-to-produce-chips-while-naura-maxwell-and-u-preseason-design-tools-for-assembly) |
| 물량 | 2026년 **약 200만 스택** ≈ Ascend 910C 환산 25~30만 패키지 | [SemiAnalysis](https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp) |
| 캐파 배분 | 2026년 양산 캐파의 **20%를 HBM3 라인**에 배정 계획 | [TechPowerUp 2차](https://www.techpowerup.com/346207/cxmt-reportedly-plans-to-dedicate-20-of-mass-production-capacity-to-hbm3-line-in-2026) |

### 4-5. ⚠️ 본딩은 막혀 있지 않다 — 반대 증거 4종

이 항목이 본 보고서의 논지를 지키는 데 가장 중요하다.

1. **CXMT 본디드 DRAM 파일럿 (허페이, 2026)** — 셀 어레이와 페리 회로를 별도 웨이퍼에 만들어 W2W 하이브리드 본딩으로 접합하는 라인을 시험 중. 핵심 논리: **"각 웨이퍼를 달성 가능한 DUV 노드에서 개별 패터닝하면, 단일 DUV 웨이퍼로는 불가능한 밀도를 조합으로 달성 — EUV 없이 EUV 스케일링의 기능적 이점 일부를 근사"**. 한국 업계 평가로 "CXMT가 기술과 개발 속도 양쪽에서 한국 경쟁사보다 앞설 수 있다"는 관측까지 보도 ([ZeroHedge/한국 언론 인용, **저신뢰 2차**](https://www.zerohedge.com/technology/china-cxmt-testing-production-line-next-gen-bonded-dram-closing-tech-gap-korea-far)). **단, 파일럿 단계이며 양산까지 수년.**
2. **CXMT 18nm 3D DRAM 논문 (IEDM 제69회, 2023-12)** — "junction-less GAA VCT + hexagonal capacitor로 컴팩트한 **4F² DRAM 아키텍처**를 성공적으로 제작". **현재 보유 장비로** 제작했다고 기술. CXMT는 SCMP에 "DRAM 구조와 4F² 설계 타당성에 관한 **기초 연구**이며 현행 양산 공정과 무관"이라고 해명 ([Tom's Hardware](https://www.tomshardware.com/pc-components/ssds/chinas-memory-maker-cxmt-reportedly-violates-us-export-rules-with-its-18nm-3d-dram-chipmaker-blatantly-presented-new-tech-at-industry-conference-report), [SCMP/Yahoo](https://finance.yahoo.com/news/tech-war-china-memory-chip-093000390.html)). 미국은 2022-08 GAA 설계 소프트웨어를 수출통제 대상에 포함시킨 바 있어, 이 발표 자체가 통제 이슈를 촉발.
3. **YMTC–CXMT HBM 협력 (2026)** — YMTC의 Xtacking 하이브리드 본딩을 CXMT의 DRAM에 결합해 중국산 HBM을 가속. "YMTC는 하이브리드 본딩에서 강력한 IP를 보유" ([Tom's Hardware](https://www.tomshardware.com/pc-components/ram/ymtc-partners-with-cxmt-for-hbm), [SemiconductorInsight](https://semiconductorinsight.com/blog/chinas-ymtc-teams-up-with-cxmt-to-advance-hbm-production-using-hybrid-bonding/)). **구체적 세대·일정·기여 내역은 미공개**(§8).
4. **장비 접근** — W2W 하이브리드 본더 시장은 **EVG가 약 82%**, 대당 **500~800만 유로** [출처: 36kr 인용 2차, **저신뢰**]. EVG(오스트리아)·SUSS(독일)는 미국 기업이 아니어서 통제 실효성 논점이 존재. 국산화도 진행 — **Naura가 SEMICON China 2026(3-25)에서 하이브리드 본딩 툴 공개** ([TrendForce 2026-03-26](https://www.trendforce.com/news/2026/03/26/news-naura-reportedly-unveils-hybrid-bonding-tool-at-semicon-china-sicarrier-last-years-lithography-standout-misses-show/)).

### 4-6. 정리 — 열린 문 / 좁은 문 / 닫힌 문

| 경로 | 판정 | 근거 |
|---|---|---|
| 커머디티 DRAM 15~16nm 대량생산 | **열림** | 30~35만 wpm, DDR5/LPDDR5X JEDEC 인증, 90% 수율 주장 |
| DUV 다중 패터닝으로 15nm까지 | **열림 (원가 열위)** | SADP/SAQP, 스텝·오버레이 부담 |
| W2W 하이브리드 본딩 자체 | **열림** | 허페이 본디드 DRAM 파일럿, YMTC 제휴, Naura 툴 |
| 4F²/VCT 구조 연구 | **열림** | IEDM 2023 논문 (18nm 하프피치) |
| HBM3 양산 | **좁음** | 2026 목표 → 지연, 수율·열·후공정 병목, 연 200만 스택 |
| sub-10nm DRAM 셀 | **닫힘 (EUV)** | 국산 EUV 수년 뒤 |
| **선단 로직 베이스다이 자체 공급** | **닫힘** | 로직 파운드리 미보유 + SMIC 5nm급 저수율 |
| **메모리+선단로직+패키징 턴키** | **닫힘** | 구조적 부재 |
| 미국 정부·방산 시장 | **닫힘** | DoD 1260H 2026-06-08 복원 / 조달 금지 2026-06-30 / 간접 금지 2027-06-30 / **Sec.5949 전 연방기관 금지 2027-12-23** |

---

## §5. 선단 로직 + 메모리 동시 보유의 희소성 — 해자의 실제 위치

### 5-1. 10nm 이하 로직을 양산하는 기업

> "현재 전 세계에서 선단 공정을 대량생산할 수 있는 회사는 **단 3곳**이다: **TSMC, Samsung, Intel**" ([Averroes 2026 정리](https://averroes.ai/blog/top-10-semiconductor-foundries), [Tom's Hardware 로드맵](https://www.tomshardware.com/tech-industry/semiconductors/leading-edge-foundry-roadmaps-for-tsmc-intel-and-samsung-outlining-the-path-to-1-4nm-nodes-and-beyond))

- TSMC: 파운드리 시장 약 60%, **선단 생산의 90% 이상**. N2 2025년 말 양산.
- Samsung: 2nm GAA 양산.
- Intel: 선단 역량 보유(회복 국면).
- **SMIC**: 7nm급까지, 상업 물량 대부분은 28nm 이상. **5nm 이하 양산 불가**.
- **Rapidus**: 아직 선단 양산 검증 안 됨.

### 5-2. 그중 메모리를 만드는 곳 — 삼성 하나

| 기업 | ≤10nm 로직 양산 | DRAM | NAND | 선단 패키징 |
|---|---|---|---|---|
| **Samsung** | ✅ (2nm GAA) | ✅ | ✅ | ✅ |
| TSMC | ✅ | ❌ | ❌ | ✅ (SoIC/CoWoS) |
| Intel | ✅ | ❌ (철수) | ❌ (매각) | ✅ (Foveros) |
| SK hynix | ❌ (성숙 노드 파운드리만) | ✅ | ✅ | ✅ (MR-MUF) |
| Micron | ❌ | ✅ | ✅ | 자체 |
| CXMT | ❌ | ✅ | ❌ | 개발 중 |
| YMTC | ❌ | ❌ | ✅ | ✅ (Xtacking) |

**Intel의 메모리 철수 (확정 사실)**:
- NAND/SSD 사업 → SK하이닉스에 **$9B**에 매각. 1차 클로징 **2021-12** (다롄 팹 포함) ([Engadget](https://www.engadget.com/intel-flash-sk-hynix-optane-022355772.html)).
- Optane → **2022년 2분기 종료 발표, 재고 $559M 상각** ([Tom's Hardware](https://www.tomshardware.com/news/intel-kills-optane-memory-business-for-good), [Forbes](https://www.forbes.com/sites/tomcoughlin/2022/07/28/intel-winding-down-its-optane-memory-business/)).
- → "Optane 종료로 인텔의 메모리 제품 사업 이탈이 사실상 완료" (Forbes).

> **이 표가 5장 해자 논증의 뼈대다.** 하이브리드 본딩은 4개 회사가 한다. **선단 로직 + 메모리를 동시에 가진 회사는 1개**다.

### 5-3. HBM 베이스 다이 조달 구조 — 희소성의 현금화 지점

| 기업 | HBM4 베이스다이 | HBM4E 계획 | 구조 |
|---|---|---|---|
| **Samsung** | **자사 파운드리 4nm** | 자사 4nm급 | **턴키** — 메모리+파운드리+패키징 단일 사내 |
| SK hynix | **TSMC N12(12FFC+)** / N5 버전 | **TSMC 3nm 검토** | 외주 (best-of-breed 제휴) |
| Micron | **자사 내부 CMOS 베이스다이** | 동 | 자체 (선단 노드 아님, 저원가 지향) |

출처: [TrendForce 2026-03-20](https://www.trendforce.com/news/2026/03/20/news-sk-hynix-reportedly-weighs-tsmc-3nm-for-hbm4e-logic-dies-to-gain-edge-over-samsung/), [TweakTown](https://www.tweaktown.com/news/99355/samsung-to-manufacture-logic-dies-for-next-gen-hbm4-ai-memory-using-4nm-node/index.html), [Nomad Semi](https://www.nomadsemi.com/p/deep-dive-on-hbm), [EE Times CES 2026](https://www.eetimes.com/the-state-of-hbm4-chronicled-at-ces-2026/)

- Samsung 자체 표현: **"메모리·파운드리·선단 패키징을 한 지붕 아래 둔 유일한 IDM"**, 설계부터 양산까지 원스톱 턴키 ([Samsung Newsroom FMS 2026](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure)).
- 커스텀 HBM4E 설계 완료 목표 **2026년 5~6월** — SK하이닉스·Micron도 유사 일정 ([TrendForce 2026-01-23](https://www.trendforce.com/news/2026/01/23/news-samsungs-custom-hbm4e-design-reportedly-aimed-for-mid-2026-parallels-sk-hynix-and-micron/)). "고객들이 **베이스다이에 로직 기능을 추가한 커스텀 HBM**을 점점 더 요구한다" (동). → **제안 2(zHBM MTO 다품종)의 시장 근거**.

### 5-4. zHBM — 통합 논거의 구체형

Samsung FMS 2026(2026-08-04~05) 발표. **개념 모델 단계**.

| 항목 | 회사 발표 목표치 |
|---|---|
| 구조 | HBM을 AI 가속기 **바로 위에 수직 적층** |
| 성능 | HBM5 대비 **약 8배** |
| 밀도 | HBM5 대비 **10배 이상** |
| 에너지 효율 | **3배** |
| 열저항 | **50% 이상 감소** |

출처: [Samsung Newsroom](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure), [StorageReview](https://www.storagereview.com/news/samsung-outlines-3d-memory-roadmap-for-ai-infrastructure-at-fms-2026)

**통합 논거 (외부 논평, 인용 시 논평임을 표기)**:
> "zHBM 시스템을 만들려면 누군가는 가속기 다이를, 누군가는 DRAM을, 누군가는 고객 IP가 들어간 커스텀 인터레이어를 만들고, 누군가는 경제성 있는 수율로 이 전부를 본딩해야 한다. **이 네 개 라인아이템을 전부 견적낼 수 있는 회사는 정확히 하나다.**" ([technologies.org 논평](https://technologies.org/samsung-unveils-zhbm-and-400-layer-v10-bv-nand-at-fms-2026-and-wafer-bonding-is-the-common-thread/))

---

## §6. 메모리-로직 통합 산업 사례 — 양산 / 검증 / 연구 구분

### 6-1. 양산 도달

| 사례 | 무엇 | 시점 | 출처 |
|---|---|---|---|
| YMTC Xtacking | NAND 어레이 + 페리 CMOS W2W | 2019-09 | §3-1 |
| Kioxia/SanDisk CBA | 동, BiCS8 218L | 2024 하반기 | [Kioxia](https://www.kioxia.com/en-jp/business/topics/bics-cba-202407.html) |
| Sony 3층 CIS | 픽셀+DRAM+로직 | 2017 (IMX400) | [WikiChip](https://fuse.wikichip.org/news/763/iedm-2017-sonys-3-layer-stacked-cmos-image-sensor-technology/) |
| AMD 3D V-Cache | SRAM on 로직 (TSMC SoIC) | 2022~ | [WikiChip](https://fuse.wikichip.org/news/5531/amd-3d-stacks-sram-bumplessly/) |
| HBM4 (베이스다이 = 선단 로직) | 메모리 스택 + 로직 다이 | **2026-01 양산 개시** (Samsung·SK hynix) | [FinancialContent 2026-01-26](https://markets.financialcontent.com/stocks/article/tokenring-2026-1-26-the-hbm4-era-begins-samsung-and-sk-hynix-trigger-mass-production-for-next-gen-ai) |
| Samsung V10 BV-NAND | NAND 웨이퍼 본딩 400+층 | 2026 발표 (양산 예정) | [Samsung](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure) |
| Kioxia BiCS10 332L | CBA, 4,800 MT/s | 샘플 출하 **2026-07-03** | [Blocks&Files](https://www.blocksandfiles.com/flash/2026/07/03/kioxia-and-sandisk-sample-shipping-332-layer-3d-nand/5266362) |

### 6-2. 샘플·검증 단계

| 사례 | 상태 | 출처 |
|---|---|---|
| SK hynix 12-hi 하이브리드 본딩 HBM | **검증 완료**, 양산 위한 수율 개선 중 (2026-04-29) | [TrendForce](https://www.trendforce.com/news/2026/04/29/news-sk-hynix-reportedly-completes-12-high-hybrid-bonding-hbm-validation-works-to-raise-yields-for-mass-production/) |
| Samsung HBM4E | 업계 최초 샘플 출하 **2026-05** | [Tech Times](https://www.techtimes.com/articles/318633/20260619/sk-hynix-ships-12-layer-hbm4e-samples-ahead-schedule-tightening-race-samsung.htm) |
| Samsung LPDDR5X-PIM | FMS 2026 공개, **판매 단계 진입(미출하)**. Hot Chips에서 상세 발표 예정 | [SamMobile](https://www.sammobile.com/news/samsung-znand-o-lpddr5x-pim-pm1763-memory-chips-ssd-ai-data-centers/), [Seoul Economic Daily](https://en.sedaily.com/finance/2026/08/05/samsung-sk-push-pim-and-cxl-as-us-china-japan-challenge-hbm) |
| SK hynix AiMX·CuD·CMM-Ax | CES 2026 **프로토타입** 공개 | [Seoul Economic Daily](https://en.sedaily.com/finance/2026/08/05/samsung-sk-push-pim-and-cxl-as-us-china-japan-challenge-hbm) |
| LP-DDR6-PIM | 삼성·SK 공동 **JEDEC 표준화 예비 작업** | 동 |
| CXMT 본디드 DRAM | 허페이 **파일럿 라인** | §4-5 |

### 6-3. 연구·로드맵 단계

| 사례 | 목표 시점 | 출처 |
|---|---|---|
| Samsung 4F² VCT DRAM | 개발 완료 2026 → 품질 검증 2027 → **양산 라인 이관 2028** (업계 관측은 2029~30) | [TrendForce 2026-04-24](https://www.trendforce.com/news/2026/04/24/news-samsung-reportedly-produces-sub-10nm-10a-dram-working-die-using-4f-square-and-vct-targets-2028-production/), [SemiWiki](https://semiwiki.com/forum/threads/isscc-2026-samsung-shows-16-gb-hybrid-bonded-cell-on-peripheral-4f-2-dram.24805/) |
| SK hynix 4F2VG + 3D DRAM | **3D DRAM 2030** | [SK hynix VLSI 2025 로드맵](https://news.skhynix.com/sk-hynix-presents-future-dram-technology-roadmap-at-ieee-vlsi-2025/) |
| Micron 하이브리드 본딩 | 연구 단계, **채택은 가장 늦을 가능성** | [Digitimes/2차](https://www.digitimes.com/news/a20231017PD200/memory-chips-hybrid-bonding-south-korea-dram.html) |
| HBM 하이브리드 본딩 | **연기** — HBM4에서 TC 본딩 유지, 빨라야 **16-hi HBM4E**, 전면 전환은 **HBM5(2029~2030)** | [TrendForce 2026-07-07](https://www.trendforce.com/news/2026/07/07/news-samsung-sk-hynix-reportedly-reconsider-hybrid-bonding-timeline-16-high-hbm4e-may-be-earliest-adoption/), [Seoul Economic Daily 2026-04-06](https://en.sedaily.com/finance/2026/04/06/sk-hynix-eyes-hbm5-launch-by-2029-with-hybrid-bonding) |
| imec CMOS 2.0 / AuC | 연구 | [imec](https://www.imec-int.com/en/articles/cmos-20-bringing-heterogeneity-inside-system-chip) |
| zHBM / zNAND-O | **개념 모델** | [Samsung FMS 2026](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure) |
| HBM 로직다이 내 AI 연산 유닛(PIM) | **2027 예상** | [EE Times CES 2026](https://www.eetimes.com/the-state-of-hbm4-chronicled-at-ces-2026/) |

### 6-4. HBM 하이브리드 본딩 연기의 이유 (반론 대비용)

- **열 대안 확보**: 삼성은 별도 방열 구조 **HPB(Heat Path Block)** 시험 — 본딩 전환의 긴급성이 완화 ([Sammy Fans 2026-07-06](https://www.sammyfans.com/2026/07/06/samsung-hbm-heat-dissipation-hpb-hybrid-bonding-delay/)).
- **두께 규격 완화**: HBM4 775µm, HBM5는 JEDEC에서 **약 1,000µm** 논의 → 다이 간격 최소화 압력 감소 ([note.com 정리 2차](https://note.com/loyal_myrtle1528/n/nb10228842520?hl=en)).
- **수요 지연**: NVIDIA 등 고단 적층 HBM 논의 제한적, **12-hi HBM4E가 주류 유지** 전망.
- **리스크 회피**: AI 메모리 초호황기에 검증된 공정을 유지해 생산 리스크 최소화.
- 단, "HBM5부터 I/O 수 증가와 대역폭 확대가 예상되므로 **중장기적으로 하이브리드 본딩은 필수 기술이 될 가능성이 매우 높다**" (동).

> **보고서 시사점**: "본딩이 필연"이라는 명제는 **DRAM 셀/페리 분리(4F², 3D DRAM)**에서는 강하게 성립하지만, **HBM 적층 본딩**에서는 2026년 현재 산업이 한 번 연기했다. 두 개를 구분해 서술해야 반론에 걸리지 않는다.

---

## §7. 이 자료를 4·5장에 쓸 때의 서술 경계 (집필 지침)

### 성립하는 주장
1. **분할 경계는 선택지다** — 산업에 최소 3개 층위(어레이/페리, 비트셀/디코딩로직, 메모리스택/시스템로직)의 실제 구현이 존재하고, imec은 이를 STCO로 이론화했다. "디램에 맞춰 본딩을 바꾼다"가 아니라 "**기능 제약에 맞춰 경계를 다시 그린다**"가 산업의 방법론이다. (§1)
2. **본딩은 열예산 제약을 푼다** — 모놀리식 CuA/COP/PUC의 근본 한계(어레이 형성 열이 CMOS를 열화)가 분리 제조로 사라진다. Kioxia가 명시적으로 말한다. (§1-3)
3. **DRAM은 NAND보다 2배 이상 미세한 본딩 피치를 요구한다** (300nm vs 700nm). NAND 본딩 역량이 DRAM 본딩 역량을 자동 보장하지 않는다. (§2-1)
4. **W2W는 KGD를 포기하는 대신 피치를 얻는다** — 따라서 **repairability by design**이 구조 선택의 실제 제약이다. (§2-3)
5. **선단 로직 + 메모리 동시 보유는 세계에 1곳** — 이것이 유일하게 방어 가능한 해자다. (§5)
6. **HBM4 이후 베이스다이가 선단 로직을 요구** — 해자가 현금화되는 정확한 지점. (§4-3, §5-3)

### 성립하지 않는 주장 (쓰면 무너짐)
1. ❌ "중국은 하이브리드 본딩을 못 한다" — YMTC 2019 양산, 특허 1위, CXMT 파일럿, YMTC–CXMT 제휴.
2. ❌ "본딩 IP는 우리 것이다" — Knowmade 기준 삼성 83 vs YMTC 119, 삼성이 라이선시 측으로 보도. Adeia 층도 별도 존재.
3. ❌ "W2W는 EUV를 대체할 수 없다" — CXMT의 본디드 DRAM 논리가 정확히 "**DUV 노드 두 장을 조합해 단일 웨이퍼로 불가능한 밀도를 만든다**"이다. 본딩은 **중국의 우회로이기도 하다**.
4. ❌ "하이브리드 본딩은 곧 모든 HBM에 들어간다" — 2026년 산업은 한 번 연기했다(빨라야 16-hi HBM4E, 전면은 HBM5).
5. ⚠️ "삼성이 4F² 페리 웨이퍼를 로직 노드로 만든다" — **공개 확인 실패**. 셀/페리 각 웨이퍼의 노드는 미공개다(§8). 단정하지 말 것.

### 권장 프레이밍
> 해자는 **"본딩을 한다"**가 아니라 **"본딩으로 갈라낸 쪽을 선단 로직으로 만들 수 있고, 그 로직과 메모리와 패키징을 같은 회사 안에서 동시에 돌릴 수 있다"**에 있다. CXMT에는 로직 파운드리가 없고, SMIC의 5nm급은 저수율이며, EUV는 닫혀 있다. YMTC에는 본딩이 있으나 DRAM도 선단 로직도 없다. TSMC에는 선단 로직이 있으나 메모리가 없다. **네 개 라인아이템을 다 견적낼 수 있는 회사는 하나다.**

---

## §8. 미확인 항목 (공개 자료 없음 / 확인 실패)

1. **YMTC Xtacking 페리 웨이퍼의 세대별 공정 노드** — 확인 실패. 초기 세대가 성숙 노드라는 2차 언급은 있으나 검증 불가.
2. **삼성–YMTC 하이브리드 본딩 라이선스 계약의 존재·조건·요율** — 보도(TrendForce·Digitimes)만 존재. **양사 공식 확인 없음**.
3. **삼성 4F² DRAM의 셀 웨이퍼 / 페리 웨이퍼 각각의 공정 노드** — 미공개. "페리를 로직 노드로 만드는가"는 공개 확인 실패.
4. **YMTC의 DRAM급(300nm 피치) W2W 실증 기록** — 공개 확인 실패.
5. **YMTC–CXMT HBM 협력의 세대·일정·기여 내역·물량** — 미공개.
6. **CXMT 본디드 DRAM 파일럿의 규모·수율·장비 출처** — 미공개.
7. **W2W DRAM의 실제 수율 페널티 정량치** — 3사 모두 미공시. §2-3의 0.99ⁿ는 이론 계산이지 실측이 아니다.
8. **본딩 도입에 따른 개발 TAT 단축의 제조사별 정량치** — YMTC 자사 주장(3개월·20%) 외에 공개 수치 없음. **삼성·SK하이닉스·Micron·Kioxia는 미공개**.
9. **"공정 검토 turn 횟수 개선" 관련 공개 지표** — 산업 전체에 공개 자료 없음.
10. **zHBM의 본딩 방식(W2W/D2W)·피치·베이스다이 노드** — 미공개. 발표된 수치는 전부 회사 목표치.
11. **하이브리드 본딩 라이선스 요율(YMTC·Adeia)** — 비공개.
12. **"VS-DRAM"** — 공개 근거 없음. 보고서에서는 **"수직 적층 DRAM 계열"** 일반명 사용. VCT(수직 채널 트랜지스터)는 공개 근거 있음(삼성 ISSCC 2026, CXMT IEDM 2023, SK hynix VLSI 2025).
13. **CXMT의 W2W 본더 조달처** — 미확인. EVG/SUSS/Naura 중 어느 쪽인지 공개 자료 없음.
14. **삼성 사내 "B1b 프로젝트"** — 2차 보도(ZeroHedge)만. **[저신뢰]**, 인용 비권장.
15. **"3D DRAM에서 중국이 SK하이닉스보다 앞선다"는 SK하이닉스 임원 발언** — 2차 전언(wccftech 계열)으로만 확인. **[저신뢰]**, 원출처 확인 실패. 인용 시 반드시 전언임을 표기.

---

## §9. 위키 연결

- [wiki/strategies/invariant/rs6-process-leadership.md](../../wiki/strategies/invariant/rs6-process-leadership.md) — 기존에 기록된 YMTC 특허 지배 판정(P4)과 정합. 본 노트는 그 판정을 **강화**하되, "자체 IP 확보로 회피 가능"이라는 대응책의 난이도를 상향 조정할 근거를 추가한다(Knowmade "unavoidable" 판정, Adeia 이중 라이선스 구조).
- [wiki/entities/china-competitors.md](../../wiki/entities/china-competitors.md) — "기술 격차 유지(5~10년 내 추격 어려운 영역)" 항목에 **본딩은 포함되지 않는다**는 정정 근거.
- [wiki/entities/cxmt.md](../../wiki/entities/cxmt.md) — §4 전체가 갱신 소스.
- [sources/articles/fab-toolset-commonality-conversion-2026-08.md](fab-toolset-commonality-conversion-2026-08.md) — §1-3(DRAM 페리 열예산 550~600℃, 로직 copy-paste 불가)에서 이어짐. 전략 1(설비·공정 축)과 전략 2(제품·아키텍처 축)의 접합점.
