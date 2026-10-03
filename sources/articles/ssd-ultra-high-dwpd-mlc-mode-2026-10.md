# 초고DWPD(약 2TB·약 30 DWPD) SSD와 MLC 모드 팩트 원장: 2025~2026 제품 신호, MLC·eMLC·TLC의 MLC 모드 내구성, 다이 산술과 손익분기 P/E, 선례와 반증

**수집일**: 2026-10-03
**수집자**: Research Agent (Ultra-high DWPD / MLC mode). 사실 수집과 산식 기반 산술만 한다. 전략 판단·권고 없음.
**유형**: 웹 검색(검색 인덱스 요약) + GitHub 원문(SEF API 헤더) 직접 열람 기반 팩트 원장
**용도**: "약 2TB·30 DWPD" AI용 SSD 운영점을 (a) SLC 또는 TLC 다이의 SLC 모드로 낼지, (b) MLC(TLC 다이의 MLC 모드 또는 네이티브 MLC) + OP 소폭 증가 + FDP(WAF를 1 근처로)로 낼지의 타당성, 그리고 "초고DWPD"를 별도 솔루션으로 둘지 기존 "고DWPD" 솔루션의 일부로 둘지를 판단하기 위한 사실 근거. §1~§5는 요청 항목 1~5에 1:1 대응한다.

**등급**: ✅ 1차 원문 직접 열람 / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·가정 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 curl·WebFetch 모두에 대해 다음 도메인을 차단했다: `kioxia.com`, `americas.kioxia.com`, `europe.kioxia.com`, `techradar.com`, `guru3d.com`, `igorslab.de`, `phisonenterprise.com`, `innogritcorp.com`, `storage.cs.tsinghua.edu.cn`, `en.wikipedia.org`, `prnewswire.com`, `globenewswire.com`, `techpowerup.com`, `hyperstone.com`, `hpcwire.com`, `businesswirechina.com`, `lasvegassun.com`, `storagenewsletter.com`, `trendforce.com`, `thessdreview.com`, `tweaktown.com`, `anandtech.com`, `atpinc.com`, `innodisk.com`, `swissbit.com`, `delkin.com`, `virtium.com`, `greenliant.com`, `jedec.org`, `micron.com`, `intel.com`, `download.intel.com`, `web.archive.org`, `apacer.com`, `apacerus.com`, `soselectronic.com`, `lexarenterprise.com`, `ssstc.com`, `cactus-tech.com`, `marketscreener.com`, `computerbase.de`, `electronicdesign.com`, `nand-research.com`, `glennklockwood.com`, `blogs.fadu.io`, `weka.io`, `newegg.com`, `lenovopress.lenovo.com`, `community.solidigm.com`, `community.intel.com`, `cdn.blueally.com`, `static.bhphoto.com`. GitHub 코드 검색 API(`search/code`)도 세션 정책으로 막혔다. **직접 열람이 가능했던 것은 `raw.githubusercontent.com`뿐**이다. 따라서:
- **✅는 Kioxia SEF API 헤더(`SEFAPI.h`)를 직접 읽은 항목(UD-35)과 레포 기확인 항목에만** 붙였다.
- 벤더 보도자료·데이터시트·리뷰 수치는 1차 출처라도 검색 요약 경유이므로 🟡다. 요약기가 서로 다른 답을 낸 항목은 ⚠️ 충돌로 따로 적었다(§1-D, §2-B).

**0-2. "MLC 모드"의 세 가지 뜻을 섞지 않는다.** P/E 수치는 서로 옮겨 쓸 수 없다.
- **(a) 네이티브 MLC**: 2D(planar) MLC·eMLC·Intel HET-MLC(2009~2015 세대), 3D MLC V-NAND(삼성 24·32단, 2014~2016).
- **(b) TLC 다이의 MLC 모드**: 3D TLC 셀에 2비트만 기록(Apacer "MLC-liteX", Flexxon "3D pMLC" 등). 이 원장이 말하는 사용자 아이디어의 직접 대상이다.
- **(c) SCM급 저지연 NAND의 MLC 변형**: Kioxia XL-FLASH 2세대 MLC, 삼성 Z-NAND 2세대 MLC. 비트당 원가를 낮추려는 목적이며, 범용 TLC의 MLC 모드와 공정·설계가 다르다.

**0-3. 기존 원장과의 관계.** [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **wcssd-v1**)의 제품표(H-01~H-23), pSLC P/E(P-01~P-12), 네이티브 P/E(P-20~P-24), 정합 점검(P-30), 전환비(C-10~C-12), 수요·반증(D-01~D-09, X-01~X-11), 배치(R-08), 공백(G-01~G-14)은 **ID로만 참조**한다. 운영점 산식은 [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §4·§5를 그대로 쓴다. Intel S3700(10 DWPD, HET-MLC)은 [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md) A03, P3700은 A04를 참조한다.

**0-4. 기본 산식(레포 기확립, 반복 표기).**
```
P/E × (원시/사용자) = DWPD × 보증일수 × WAF
5년(1,825일) 30 DWPD: P/E × (원시/사용자) = 54,750 × WAF
3년(1,095일) 30 DWPD: P/E × (원시/사용자) = 32,850 × WAF
```
여기서 "원시"는 **해당 모드로 운용되는 물리 용량**이다(SLC 모드면 TLC 용량의 1/3, MLC 모드면 2/3).

---

## §1. 2025~2026 제품 신호: 약 1.6~3.2TB, 25~60 DWPD AI SSD

### 1-A. 제품·플랫폼 표 (wcssd-v1 H-01~H-19에 없던 새 사실 위주)

| ID | 벤더·모델 | 매체 | 용량 | 정격 DWPD | 보증 | 상태·일자 | 벤더가 든 수요 | 출처 | 등급 |
|---|---|---|---|---|---|---|---|---|---|
| UD-01 | **Kioxia GP1** (GP 시리즈 첫 제품) | **XL-FLASH 2세대를 SLC(1비트/셀) 형식으로** 사용(Blocks&Files), 신규 자체 컨트롤러 | **미공개** (용량·지연·지속 처리량·전력·가격 모두 미공개) | **최대 50** (기준 미공개) | **미공개** | PCIe 6.0, NVMe 2.2, 512B 랜덤 읽기 1,000만 IOPS, E3.S·E1.S(9.5/15mm), E3.S·E1.S 9.5mm는 콜드플레이트 액체냉각. **평가 샘플 2026년 말**. FMS 2026(2026-08-04~06) 전시. 발표 2026-08-03/04 | GPU 직접 접근으로 HBM 아래 계층 확장. 2차 해설은 **KV 캐시 오프로딩, 임베딩 조회, 벡터 인덱스 탐색, RAG**의 "작고 흩어진 읽기"를 표적으로 서술 | Kioxia PR https://www.kioxia.com/en-jp/business/news/2026/20260804-1.html ; Blocks&Files https://blocksandfiles.com/flash/2026/08/03/kioxias-nearly-faster-than-optane-ssd/5282259 ; StorageReview https://www.storagereview.com/news/kioxia-gp1-series-hits-10-million-random-read-iops-on-xl-flash-gen-2 ; Guru3D https://www.guru3d.com/story/kioxia-gp1-pcie-60-xlflash-ssd-targets-100-million-randomread-iops ; 수요 해설 remio.ai https://www.remio.ai/post/kioxia-gp1-hits-10-million-iops-but-the-hardware-still-has-more-to-prove | 🟡 (수요 서술은 ⚠️ 2차 해설) |
| UD-02 | **Kioxia GP Series** (GTC 2026 발표) | XL-FLASH SCM | 미공개 | 미공개 | 미공개 | **2026-03-16**. NVIDIA **"Storage-Next"** 이니셔티브: "SSD 벤더에 GPU 개시(GPU-initiated) AI 워크로드에 최적화된 드라이브 설계를 요구". 기존 Kioxia TLC SSD 대비 "더 높은 IOPS, **512B 단위 접근**, IO당 전력 감소" | HBM 용량 한계를 넘는 GPU 접근 메모리 공간 | Kioxia PR https://americas.kioxia.com/en-us/business/news/2026/ssd-20260316-1.html ; StorageNewsletter 2026-03-18 https://www.storagenewsletter.com/2026/03/18/nvidia-gtc-2026-kioxia-announces-new-ssd-model-optimized-for-ai-gpu-initiated-workloads/ | 🟡 |
| UD-03 | **SK hynix AIN P** (AI-N P) | **SLC NAND** | 미공개 | **미공개** | 미공개 | 샘플 2026년 말 목표, 2세대 100M IOPS 2027년 목표. **1세대 IOPS 수치 충돌(UD-15)**: 2,500만(TrendForce 2025-12) vs 512B 약 5,000만(eeNews·Yahoo, 2025-10 발표 보도) | 대규모 AI 추론의 데이터 입출력 병목 | TrendForce 2025-12-29 https://www.trendforce.com/news/2025/12/29/news-slc-based-ai-ssds-gain-traction-as-sk-hynix-and-kioxia-accelerate-development-with-nvidia/ ; eeNews Europe https://www.eenewseurope.com/fr/sk-hynix-devoile-sa-strategie-de-stockage-ai-nand/ ; Yahoo Tech https://tech.yahoo.com/ai/articles/sk-hynix-unveils-ai-nand-101838422.html | 🟡 (계획) |
| UD-04 | **Phison Pascari X202Z** | **"3D pSLC NAND"** (TheSSDReview 요약) | **최대 6.4TB** (중간 용량점 미확인) | **최대 60** (기준 미확인) | **미확인** | COMPUTEX 2026(**2026-06-01**). PCIe 5.0, **듀얼포트 2×2**, NVMe 2.0, U.2·E1.L, 순차 쓰기 10,000MB/s·읽기 14,800MB/s | "쓰기 집약 AI 워크로드": **AI 파이프라인, 트랜잭션 DB, 실시간 분석, 캐싱, 쓰기 위주 엔터프라이즈 앱**. 체크포인트 언급은 2차 요약에만 등장 | TheSSDReview https://www.thessdreview.com/computex-2026/phison-unveils-pascari-gen6-28gb-s-demo-along-with-new-pascari-enterprise-offerings-computex-2026-post-update/ ; Phison 블로그 https://phisonblog.com/phison-unveils-a-new-era-of-pascari-enterprise-storage-at-computex-2026/ ; MarketScreener https://www.marketscreener.com/news/phison-electronics-announces-comprehensive-ai-storage-and-computing-architecture-solutions-at-comput-ce7f5dd9d18cf627 | 🟡 |
| UD-05 | **Phison aiDAPTIVCache AI100E** | **"SLC NAND"**(제품 요약) / TLC의 pSLC(wcssd-v1 H-08) | **320GB ~ 2TB**, M.2 2280 · U.2 15mm · E1.S 9.5mm, PCIe Gen4 x4 | **100** | **5년**(2TB 리스팅 "5-year limited warranty") | 판매 중(시스템 통합사 채널). 1,024GB U.2 품번 A1808K031T00E004T0900 리스팅 존재 | LLM 파인튜닝용 GPU 메모리 확장(aiDAPTIVLink 미들웨어) | Phison FMS 2025 Media Update https://www.phison.com/images/media-kits-fms2025/Phison-FMS-2025-Media-Update.pdf ; Newegg https://www.newegg.com/p/N82E16820979054 ; ASI 리스팅 https://www.asipartner.com/289839 | 🟡 (P-30 수치 부정합은 그대로 유효) |
| UD-06 | **InnoGrit N3X** | **Kioxia XL-FLASH 2세대를 SLC 모드로** (TechRadar). **"SLC·MLC 모드 구성 모두 제공" 요약과 "SLC 전용" 요약이 충돌(UD-16)** | 400GB(또는 800GB) ~ **3.2TB** | **50 / 5년**(TechRadar 2025-06) vs **"최대 100"**(InnoGrit 제품 페이지 요약) 충돌 | 5년(50 DWPD 서술 기준) | Computex 2025 공개, PR **2025-07-31**. IG5669 PCIe 5.0 x4, NVMe 2.0, 14/12 GB/s, 랜덤 읽기 350만 IOPS | "AI와 실시간 엣지 컴퓨팅용 **캐시 SSD**" | TechRadar 2025-06-11 https://www.techradar.com/pro/meet-the-duracell-bunny-of-ssds-that-can-withstand-50-drive-writes-per-day-for-five-whole-years-but-it-wont-come-cheap ; PRWeb 2025-07-31 https://www.prweb.com/releases/innogrit-unveils-innogrit-n3x-next-generation-cache-ssds-optimized-for-ai-and-real-time-edge-computing-302515852.html ; 3DTested https://www.3dtested.com/pc-components/ssds/custom-pcie-5-0-ssd-with-3d-xl-flash-debuts-special-optane-like-flash-memory-delivers-up-to-3-5-million-random-iops ; InnoGrit https://www.innogritcorp.com/ssd-solutions/n3x/ | 🟡 / ⚠️ (충돌) |
| UD-07 | **DapuStor X5 SCM** | 미공개 | 미공개 | 최대 120 | 미공개 | wcssd-v1 H-14 이후 **새 사실 확보 못함**(용량·매체 재검색 실패) | KV 캐시 오프로딩·TTFT 단축 (H-14) | StorageNewsletter 2026-07-28 (H-14) | 🟡 |
| UD-08 | **Micron** | XTR 후속 **확인 못함** | (XTR 960GB·1.92TB, H-02) | (XTR 35 RDWPD) | (미확인, G-14) | Micron은 **7600(PCIe 5.0)·9650(PCIe 6.0)이 "KV 캐시 용도로 주요 고객에 출하 중"**이라고 밝힘. 7600 MAX·9650 MAX는 **3 DWPD**급. XTR 출시 당시 1.92TB 가격 "약 $600" 보도(일자·채널 불명) | XTR: **캐싱 계층, 쓰기 버퍼, 로깅·저널링, OLTP** | Micron IR(COMPUTEX 2026) https://investors.micron.com/news-releases/news-release-details/micron-powers-ai-everywhere-computex-2026 ; StorageReview 7600 MAX https://www.storagereview.com/review/micron-7600-max-review ; XTR: AnandTech https://www.anandtech.com/show/18863 ; TechRadar https://www.techradar.com/news/micron-unveils-scm-lite-ssd-a-third-of-the-performance-a-fifth-of-the-cost | 🟡 (XTR 가격 ⚠️) |
| UD-09 | **Solidigm** | D7-P5810 후속 **확인 못함**. 최신 TLC는 D7-PS1010/PS1030(1/3 DWPD, X-08) | (P5810 800GB·1.6TB) | (50 @4K 랜덤) | 5년 | P5810 매체 서술 추가: "SK hynix 144단 3D NAND를 **순수 SLC 구성으로 운용**"(H-20 충돌에 한 표 추가). 1.6TB의 PBW를 "800GB와 같은 73 PBW"로 쓴 요약 존재(1-C 검산 146 PBW와 충돌, UD-17) | 플래시 어레이 캐싱, 고빈도 매매(HFT), HPC | TechPowerUp https://techpowerup.com/news-tags/Caching (H-01 출처군) | 🟡 / ⚠️ |
| UD-10 | **Samsung** | 2026년 고내구 SLC 계열 **출시 제품 확인 못함**. 7세대 Z-NAND + GIDS "2026 예정"(H-11)뿐 | | | | **PM1763**(V9 TLC, PCIe 6.0, 4nm 컨트롤러) 2026-07 양산. **GPU 개시 512B 랜덤 읽기: 드라이브당 약 692만 IOPS**(PM1753 372만 대비 +86%), 15.36TB E1.S 42개로 2억 8,100만 IOPS(삼성 시험), SCADA 프레임워크. DWPD 미기재 | AI 서버, GPU 직접 I/O | StorageReview https://storagereview.com/news/samsung-pm1763-pcie-gen6-ssd-enters-mass-production-with-28-4-gb-s-reads | 🟡 (벤더 시험 조건) |
| UD-11 | **NVIDIA CMX / BlueField-4 STX** (플랫폼) | 지명 드라이브는 TLC (wcssd-v1 X-08, kv-cache-qlc 원장) | **GPU당 최대 16TB**, BlueField-4당 약 150TB, 랙당 BF4 64개·약 9,600TB, Vera Rubin SuperPod 1,152 GPU × 16TB = 18,432TB | **요구 DWPD 미공개**(G-02 유지). FADU는 "3 DWPD 보증 + OP 구성"을 CMX 적합성 근거로 제시 | 해당 없음 | CES 2026 발표, GTC 2026 STX. Supermicro는 STX SSD 검증 파트너로 Micron·Samsung·Phison 명시 | 장문맥·다회차 KV 캐시. 2차 해설: "디코드 단계는 읽기 위주, 쓰기는 프리필·캐시 갱신 때만" | Blocks&Files 2026-01-12 https://www.blocksandfiles.com/2026/01/12/nvidias-basic-context-memory-extension-infrastructure/4090541 ; Glenn Klockwood https://www.glennklockwood.com/garden/icms ; NADDOD https://www.naddod.com/ai-insights/nvidia-bluefield-4-stx-storage-architecture-designed-for-an-ai-native-storage-and-data-platform ; FADU https://blogs.fadu.io/cmx-ssd-for-ai-inference/ | 🟡 |
| UD-12 | **Huawei OceanStor M900** (시스템) | 미공개 | 클러스터당 64PB | 최대 24 (SSD 수명 16배 연장, **3년**, D-02) | 시스템 3년 안정성 | 2026-09-17. 집계 대역 40TB/s, **접근 지연 60µs**, UnifiedBus로 NPU-SSD 직결. NPU당 KV 캐시를 GB급에서 TB급으로 | KV 캐시 공유 계층 | AICYBR https://aicybr.com/blog/huawei-oceanstor-m900-context-memory-kv-cache ; cloudnews https://cloudnews.tech/huawei-oceanstor-m900-pushes-kv-cache-to-64-pb/ ; D-02 | 🟡 |
| UD-13 | ScaleFlux KV 캐시 플랫폼 | 미공개 | 미공개 | **7~10+ effective / 5년**, FDP 쓰기 스트림 200개 이상 | 5년 기준 서술 | Q4 2026 샘플 (H-18, D-01) | KV 캐시 블록의 수명 이질성으로 GC가 유효 데이터를 옮겨 WAF 상승 → FDP로 분리 | StorageReview https://www.storagereview.com/news/scaleflux-kv-cache-ssd-platform-claims-7-10-dwpd-and-200-fdp-streams ; TechTimes 2026-08-01 https://www.techtimes.com/articles/322601/20260801/kv-cache-churn-burns-through-ssds-scaleflux-built-drive-level-storage-nvidia-cmx.htm | 🟡 |

### 1-B. ⚠️ 파생 집계: 보증 기간과 벤더가 든 수요 (판단 아님)

| 항목 | 관찰 | 근거 |
|---|---|---|
| **보증 기간** | 보증이 공개된 **단일 드라이브 ≥30 DWPD 제품은 모두 5년**이다: D7-P5810, FL6, X200Z, SZ985, X2900, AI100E, N3X(50 DWPD 서술 기준). **3년은 Huawei M900(시스템 수준)에서만** 나온다. GP1·X202Z·X5·AIN P·XTR은 보증 미공개 | H-01·H-03·H-06·H-09·H-13·H-19, UD-01·04·05·06·07·08·12 |
| **수요 근거 1: 지연·IOPS** | GP1(512B 1,000만 IOPS, GPU 직접 접근), AIN P(2,500만~5,000만 IOPS), X5(20/5µs), N3X(350만 IOPS)는 **작은 랜덤 읽기·저지연**을 전면에 둔다 | UD-01·02·03·06·07, X-11 |
| **수요 근거 2: 쓰기 흡수** | XTR(캐싱·쓰기 버퍼·로깅·저널링·OLTP), P5810(어레이 캐싱·HFT·HPC), X202Z(AI 파이프라인·트랜잭션 DB·실시간 분석·캐싱), N3X("캐시 SSD") | UD-04·06·08·09 |
| **수요 근거 3: KV 캐시** | X5·GP1(2차 해설)·M900·ScaleFlux가 KV 캐시를 명시. 그러나 정격 30 DWPD를 KV 캐시 요구치로 명시한 출처는 여전히 없다(G-01) | UD-01·07·12·13 |
| **2TB·30 DWPD 점에 정확히 맞춘 "KV 캐시 SSD"** | **확인 못함**(§6 NG-01). 가장 가까운 점은 XTR 1.92TB 35 RDWPD(2023, H-02)와 AI100E 2TB 100 DWPD(PCIe Gen4, UD-05) | H-02, UD-05 |

### 1-C. ⚠️ 파생 산술: 하루 쓰기 예산 비교 (산식 `용량(TB) × DWPD`)

| 대상 | 계산 | 하루 쓰기 예산 |
|---|---|---|
| CMX GPU당 16TB를 1 DWPD TLC로 채울 때 | 16 × 1 | 16 TB/일·GPU |
| 같은 16TB를 3 DWPD TLC로 채울 때 | 16 × 3 | 48 TB/일·GPU |
| 2TB·30 DWPD 드라이브 1개 | 2 × 30 | **60 TB/일** (약 0.69 GB/s 상시) |
| StorageReview 실측의 드라이브당 쓰기(D-09) | 1.9 GB/s × 86,400 × 2 ÷ 8 | 41 TB/일 |
| Huawei M900의 "24 DWPD = 16배 연장"이 같은 드라이브 기준이라면 역산되는 기준 DWPD | 24 ÷ 16 | 1.5 DWPD (⚠️ 가정 의존, 원문 서술 아님) |

→ 2TB·30 DWPD 드라이브 1개의 하루 쓰기 예산은 GPU당 16TB·3 DWPD 배분(48 TB/일)보다 크다. 산술 비교일 뿐, 실제 GPU당 쓰기량은 공개되지 않았다.

### 1-D. 충돌 기록

- **UD-15 ⚠️ AIN P 1세대 IOPS**: 2,500만(TrendForce 2025-12-11·29, wcssd-v1 H-12) vs 512B 약 5,000만(eeNews·Yahoo). 측정 블록 크기·세대 정의가 다를 수 있다. 단정하지 말 것.
- **UD-16 ⚠️ InnoGrit N3X 매체 모드·DWPD**: "SLC·MLC 모드 구성 모두 제공"(한 검색 요약) vs "SLC 모드 전용"(다른 검색 요약, TechRadar 서술). DWPD도 50/5년 vs "최대 100". 제품 페이지 원문 차단으로 미해결.
- **UD-17 ⚠️ D7-P5810 1.6TB PBW**: "두 모델 모두 73 PBW" 요약 vs 산식 검산 146 PBW·리스팅 149,504 TBW(wcssd-v1 1-C). 리스팅·산식 쪽이 정합적이다.
- **UD-18 ⚠️ X202Z 매체**: "3D pSLC NAND"(UD-04). 형제 제품 X200Z는 "SLC" vs "pSLC" 충돌(H-22)이 남아 있다.

---

## §2. MLC 모드·eMLC 내구성 근거

### 2-A. (a) 네이티브 MLC·eMLC: 공표 P/E와 정격

| ID | 제품·매체 | 공개 수치 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|
| UD-20 | 일반 MLC (참고) | P/E **3,000~10,000**, TLC 1,000~3,000, SLC 30,000~100,000. "셀당 비트가 하나 늘 때마다 P/E가 대략 한 자릿수 준다" | 상시 | 레포 ladder F4 ; Lexar Enterprise https://lexarenterprise.com/comparing-nand-flash-slc-mlc-tlc-qlc-industrial-application/ | 🟡 |
| UD-21 | **Micron 34nm Enterprise MLC NAND** | **30,000 쓰기 사이클**, 표준 MLC 대비 **6배**. 같은 발표에서 Enterprise SLC는 3배 개선 | **2009-10-19** 발표, 2010 초 양산 | EE Times https://www.eetimes.com/?p=1172025 ; Computerworld https://www.computerworld.com/?p=1451026 ; Enterprise Storage Forum https://www.enterprisestorageforum.com/?p=4872 | 🟡 |
| UD-22 | **Micron P400m** (25nm MLC, SATA) | 메모리 정격 **20,000 P/E**(클라이언트 25nm MLC는 3,000~5,000). **원시 340GB / 사용자 200GB(OP 약 70%)**. 400GB = **7.00 PB**, 10 DWPD·5년 | 2013 | Tom's Hardware https://www.tomshardware.com/uk/reviews/p400m-ssd-enterprise,3424-5.html ; StorageReview https://www.storagereview.com/review/micron-p400m-enterprise-ssd-review ; Computerworld https://www.computerworld.com/article/1526625/micron-introduces-its-highest-endurance-mlc-ssd-for-servers.html | 🟡 |
| UD-23 | **Intel HET-MLC** (S3700 25nm, P3700 20nm) | S3700: 10 DWPD·5년(A03), **800GB = 원시 1,024GB·14.6 PB**, 200GB = 원시 264GB. HET는 "**가장 좋은 MLC 다이를 선별(binning)한 것이며 장기 데이터 보존을 쓰기 사이클과 맞바꾼다**"(AnandTech, SSD 710 리뷰). "표준 MLC의 30배 쓰기 사이클"(Tom's Hardware, 710) 서술은 기준(드라이브 수명인지 셀 P/E인지)이 불명확. **P3700 2TB: 17 DWPD**, LDPC 적용 컨트롤러로 HET 내구성을 확장했다는 보도, OP 25% | S3700 2012-11 ; 710 2011 ; P3700 2014 출시(17 DWPD 상향 보도 일자 미확인) | StorageReview S3700 https://www.storagereview.com/review/intel-ssd-dc-s3700-series-enterprise-ssd-review ; HotHardware https://hothardware.com/reviews/intel-solidstate-drive-dc-s3700-review ; AnandTech 710 https://www.anandtech.com/show/4902/intel-ssd-710-200gb-review/2 ; Tom's 710 https://www.tomshardware.com/uk/reviews/ssd-710-enterprise-x25-e,3038.html ; Tom's P3700 LDPC https://www.tomshardware.com/uk/news/intel-dc-p3700-endurance-ldpc,29326.html ; Solidigm 커뮤니티(OP 25%) https://community.solidigm.com/t5/solid-state-drives-nand/2tb-dc-p3700-raw-nand-size/m-p/17346 | 🟡 (HET 절대 P/E는 미공표) |
| UD-24 | **HGST Ultrastar SSD800MH.B** | Intel 20nm 고내구 엔터프라이즈 MLC, **25 DWPD(완전 랜덤)·5년**, 100GB~800GB, SAS 12Gb/s | 2014-07 | StorageReview https://www.storagereview.com/news/hgst-ultrastar-ssd1600mr-ssd800mh-b-and-ssd1600mm-enterprise-ssds-launched ; ComputerBase https://www.computerbase.de/2014-07/hgst-bringt-neue-ultrastar-ssds-mit-sas-12-gb-s | 🟡 |
| UD-25 | ⭐ **Toshiba PX04SHB** | **25 DWPD(100% 랜덤)**, **200GB ~ 1.6TB**, A19nm eMLC(MLC), SAS 12Gb/s 듀얼포트. 1.6TB 품번 PX04SHB160 | **2015-08-04** | Toshiba PR(Kioxia 아카이브) https://www.kioxia.com/en-jp/business/news/2015/20150804-1.html ; StorageReview https://www.storagereview.com/review/toshiba-px04s-enterprise-ssd-review ; Disctech 리스팅 https://www.disctech.com/Toshiba-PX04SHB160-1-6TB-SAS-eSSD | 🟡 |
| UD-26 | **Seagate 1200.2 High Endurance** | **25 DWPD**, 200/400GB, **Micron eMLC**, 5년 보증, UBER 1/10¹⁷, AFR 0.35%. 같은 1200.2 계열이 1~25 DWPD 다섯 등급(같은 eMLC, 용량·OP로 등급 분화) | 2015-08 | AnandTech https://anandtech.com/show/9487 ; StorageReview https://www.storagereview.com/news/seagate-announces-new-enterprise-sas-ssd-with-speeds-of-1800mb-s ; The Register https://www.theregister.com/2015/08/04/seagate_enterprise_sas_ssd_creds/ | 🟡 |
| UD-27 | **Samsung SM1715** (3D V-NAND, NVMe HHHL) | **3.2TB, 10 DWPD·5년**, 1.6TB·3.2TB, "42nm급 다층 3D V-NAND". **셀 유형(MLC) 명시를 원문 요약에서 확인 못함** | 2014-09-25 | Samsung Newsroom https://news.samsung.com/global/samsung-starts-producing-3-2-terabyte-nvme-ssd-based-on-3d-v-nand-for-next-generation-enterprise-severs | 🟡 / ⚠️ (셀 유형) |
| UD-28 | **Samsung SM863** (32단 MLC V-NAND, SATA) | 960GB **6,160 TBW**, 5년. 요약은 "3.6 DWPD", 산식 6,160 ÷ (0.96 × 1,825) = **3.5 DWPD**(⚠️ 파생, 소폭 불일치) | 2015 | AnandTech https://at-web1.www.anandtech.com/show/9455/samsung-releases-pm863-sm863-enterprise-sata-ssds-up-to-384tb-with-3d-vnand ; TheSSDReview https://thessdreview.com/our-reviews/samsung-sm863-pm863-ssd-review-960gb | 🟡 |
| UD-29 | **Samsung 850 Pro 256GB** (32단 MLC V-NAND, 소비자용) | c't 시험에서 **9,100 TB** 기록 후 고장(정격 150 TBW) | 2015 (c't) | AnandTech https://www.anandtech.com/show/8239 | ⚠️ 단일 표본·소비자 제품·고장 시점(정격 아님) |

### 2-B. (b) TLC 다이의 MLC 모드(pMLC 등): 공표값

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| UD-30 | ⭐ **Apacer MLC-liteX / SLC-liteX (3D NAND, 펌웨어 기반)**: 3D TLC 셀에 **2비트만 기록(MLC-liteX) 시 P/E 10,000**, 1비트만(SLC-liteX) 30,000, **표준 3D TLC 3,000**. 일부 SSD 모델에서 MLC-liteX P/E는 "요청 시 제공" | **2019-10-29** (Apacer PR, 일본어판 Kyodo PR Wire) | Kyodo PR Wire https://kyodonewsprwire.jp/release/201910292776 ; Elektor https://www.elektormagazine.com/news/apacer-technology-pinpoints-accuracy-with-3d-nand-flash-optimization ; StorageNewsletter https://www.storagenewsletter.com/?p=208958 ; SOS Electronic https://www.soselectronic.com/en/articles/apacer/keep-up-with-new-technologies-from-apacer-2395 | 🟡 (산업용, 단일 벤더) |
| UD-31 | Apacer **SLC-liteX 100,000 P/E** (3D NAND, 산업용 SSD SH250·PH920) | **2022-03-10** 발표 | StorageNewsletter 2022-03-17 https://www.storagenewsletter.com/2022/03/17/apacer-technology-unveils-slc-litex-3d-nand-ssd/ ; Elektor https://www.elektormagazine.com/news/apacer-s-slc-litex-optimizes-3d-nand-ssds-to-reach-the-industry-s-highest-100k-pe-cycles | 🟡 |
| UD-32 | ⚠️ **Flexxon "3D pMLC"**: eMMC XTRA VI 계열이 3D TLC / 3D pMLC / 3D pSLC 세 옵션 제공. pMLC의 장점은 "**고온에서 3D TLC보다 낮은 오류율**"로 서술. 한 요약은 **pMLC P/E 3,000(TLC와 동일), pSLC 30,000**으로 표기 → **UD-30(MLC-liteX 10,000)과 충돌** | 일자 미상 | Flexxon 기술 문서 https://www.flexxon.com/wp-content/uploads/Technical%20Info/FLEXXON%203D%20pSLC%203D%20pMLC%20Technology.pdf ; Flexxon https://www.flexxon.com/nand-flash-explained/ | ⚠️ 충돌 |
| UD-33 | (참고) **ATP N651Si/N651Sc 네이티브 3D TLC 11,000 P/E**(초기 공표 5,000에서 +120%), 512Gb IC 패키지, 산업용 Gen4 M.2·U.2·E1.S 등 양산 | **COMPUTEX 2025 (2025-05-20~23)** | Simms https://www.simms.co.uk/tech-talk/atps-game-changing-gen4-ssd-8-tb-11000-pe-endurance/ ; TechPowerUp https://www.techpowerup.com/338285/atp-extends-endurance-of-its-industrial-3d-tlc-ssds | 🟡 (DWPD 서술 "1 DWPD·OP 7%"는 11K 이전 값일 가능성, 사용하지 말 것) |
| UD-34 | 학술: TOS'22 "Reprogramming 3D TLC Flash Memory based SSDs"는 TLC를 2비트(MLC 상당)로 줄이는 선행 연구를 인용하고, MLC 모드 SSD의 "빠른 프로그램과 큰 P/E"를 장점으로 서술. 한 요약의 "MLC 모드 정규화 내구성 13.4배"는 **조건 미확인** | 2022 (ACM TOS) | ACM https://dl.acm.org/doi/10.1145/3487064 ; Tsinghua PDF https://storage.cs.tsinghua.edu.cn/papers/tos22reprogramming.pdf/ (차단) | ⚠️ (본문 미열람) |
| UD-35 | ✅ **Kioxia SEF API의 셀 모드는 "일반"과 "pSLC" 둘뿐이다.** `enum SEFSuperBlockType { kForWrite, kForPSLCWrite }`(슈퍼블록 유형 주석 "normal or pSLC"), 지원 옵션 비트 `kPSLCSupported (1 << 14)`. **MLC 모드를 지정하는 필드·열거값은 없다**. 가상 디바이스 정보에 `averagePEcount`·`maxPEcount`(uint8) | 헤더 HEAD `aa665e5` (2026-10-03 열람) | https://raw.githubusercontent.com/SoftwareEnabledFlash/SEF-API/main/SEFAPI.h (L135, L705~714, L905~908, L1045) | ✅ |

### 2-C. (c) SCM급 저지연 NAND의 MLC 변형

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| UD-36 | ⭐ **Kioxia XL-FLASH 2세대**: 기존 SLC에 더해 **MLC(2비트/셀) 기능을 추가해 비트당 원가를 크게 낮춤**, 다이 256Gb, 패키지 최대 8다이 2,048Gb. **"MLC는 SLC보다 지연이 길어, 동시 동작 플레인 수를 늘려 병렬성으로 일부 보상"**(Tom's Hardware 해설). 샘플 2022-11, 양산 2023. P/E·DWPD 미공표 | **2022-08-02** | Businesswire https://www.businesswire.com/news/home/20220801005862/en/Kioxia-Launches-Second-Generation-of-High-Performance-Cost-Effective-XL-FLASH-Storage-Class-Memory-Solution ; Tom's Hardware https://www.tomshardware.com/news/kioxia-launches-2nd-gen-xl-flash ; Kioxia https://business.kioxia.com/en-jp/news/2022/20220802-1.html | 🟡 |
| UD-37 | **Samsung Z-NAND 2세대**: SLC 128Gb(읽기/프로그램 **1~3µs / 70µs**) + **MLC 256Gb(5µs / 150µs)**. 1세대 64Gb는 3µs / 100µs. FMS 2017에서 "2세대에 MLC 버전 도입" 예고 | 2017-08 (FMS) / 2018-10 (Tech Day) | AnandTech https://www.anandtech.com/show/11703 ; AnandTech Z-NAND 해설 https://at-web1.www.anandtech.com/show/13951/the-samsung-983-zet-znand-ssd-review/2 | 🟡 |

### 2-D. SLC 모드 비교값 (새 항목만, 나머지는 wcssd-v1 P-01~P-12)

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| UD-38 | Apacer SLC-liteX: 30,000(2019) → 100,000(2022)(UD-30·31). 같은 벤더 안에서 **SLC 모드 : MLC 모드 : 네이티브 TLC = 30,000 : 10,000 : 3,000**(2019 공표 기준, 3 : 1 : 0.3) | UD-30·31 | 🟡 |
| UD-39 | Swissbit 산업용 M.2 SATA(X-86m2·X-78m2·X-76m2): 산업용 3D NAND를 pSLC로 운용해 **최대 80 DWPD** | Swissbit https://www.swissbit.com/en/products/nand-flash-products/sata-modules/ | 🟡 |
| UD-40 | 2025~2026 고내구 SLC 계열은 **TLC 다이의 SLC 모드**(X202Z "3D pSLC", AI100E, Gigabyte AI TOP 100E "Kioxia BiCS5 TLC를 pSLC로, 용량의 1/3만 사용")와 **SCM급 다이의 SLC 모드**(GP1·N3X의 XL-FLASH 2세대)로 갈린다 | UD-01·04·05·06 ; Yahoo Tech(Gigabyte) https://tech.yahoo.com/computing/articles/endurance-champion-ssds-gigabyte-ai-210616280.html | 🟡 |
| UD-41 | **XL-FLASH 읽기 지연 5µs 미만, "기존 TLC(약 50µs)의 약 10배 빠름"**(2019 발표 기준) | Kioxia 2019-08-05 https://americas.kioxia.com/en-ca/business/news/2019/memory-20190805-1.html ; Tom's Hardware https://www.tomshardware.com/uk/news/kioxia-intros-ssd-optane-competitor | 🟡 |

### 2-E. 보존(retention)·온도 단서

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| UD-42 | **JESD218 사용 조건**: 클라이언트 = 가동 40°C·하루 8시간, 전원 차단 보존 30°C·**1년** / 엔터프라이즈 = 가동 55°C·하루 24시간, 전원 차단 보존 40°C·**3개월**. 정격 내구성을 다 쓴 뒤 이 보존을 지켜야 한다. 엔터프라이즈 UBER ≤ 10⁻¹⁶ | Seagate TP618 https://www.seagate.com/files/staticfiles/docs/pdf/whitepaper/tp618-ssd-tech-paper-us.pdf ; JEDEC(Alvin Cox) https://www.jedec.org/sites/default/files/Alvin_Cox%20[Compatibility%20Mode]_0.pdf ; Dell KB https://www.dell.com/support/kbdoc/en-ca/000198930/ | 🟡 |
| UD-43 | **보존과 P/E의 교환**: Intel HET-MLC는 선별 다이로 "장기 보존을 쓰기 사이클과 맞바꿨다"(UD-23). FAST'12(Liu·Yang·Wu)는 보존 1년 → 2주 완화로 쓰기 2.3배 가속, 선행 연구 인용으로 "**보존 3년에서 3,000 P/E인 셀이 보존 3일로 완화하면 최대 50배(150,000 P/E)**"(2D MLC 시대 수치) | USENIX FAST'12 https://static.usenix.org/events/fast/tech/full_papers/Liu.pdf ; WARM(MSST'15) https://ghose.cs.illinois.edu/papers/15msst_warm.pdf | 🟡 / ⚠️ (2D MLC 세대, 3D TLC로 이전 불가) |
| UD-44 | **KV 캐시 데이터의 성질**(기존 원장): 잃으면 재계산하는 휘발성 컨텍스트(X-09 ⚠️ 개인 블로그 해설), 2TB·30 DWPD 운영점의 교체 주기 48분(운영점 페이지 §4 ⚠️ 파생). **JESD218 엔터프라이즈 3개월 보존 조건을 KV 캐시 계층에 완화한 공개 규격·고객 요구는 확인 못함**(NG-09) | X-09 ; high-dwpd-operating-point §4 | ⚠️ |
| UD-45 | Google 현장 데이터(FAST'16): **SLC가 MLC보다 신뢰성이 높다는 증거 없음**, 고장은 마모보다 연식과 상관 | 레포 [qlc-v6-reliability-ppm-die-protection-2026-09.md](qlc-v6-reliability-ppm-die-protection-2026-09.md) F4 | 🟡 (레포 기록 등급 유지) |

### 2-F. ⚠️ 파생: MLC 시대 정격에서 P/E 역산 (산식 `P/E = DWPD × 보증일수 × WAF ÷ (원시/사용자)` 또는 `TBW × WAF ÷ 원시`)

정격은 JESD219 엔터프라이즈 워크로드(랜덤) 기준이라 실제 WAF는 1보다 크다. WAF를 공개한 벤더는 없으므로 "× WAF" 형태로 둔다.

| ID | 제품 | 입력값 | 계산 | 결과 |
|---|---|---|---|---|
| UD-46 | Micron P400m 400GB | P/E 20,000(벤더), 원시 680GB(200GB 모델 340GB × 2), TBW 7,000 TB | 20,000 × 0.68 ÷ 7,000 | **함의 WAF 약 1.94**. 공표 P/E·원시·TBW가 서로 정합적이다 |
| UD-47 | Intel S3700 800GB | 원시 1,024GB(10진 1.024TB 또는 1,024GiB = 1.0995TB), TBW 14,600 TB | 14,600 × WAF ÷ (1.024 ~ 1.0995) | **P/E ≈ 13,300 ~ 14,300 × WAF** → WAF 2면 약 2.7만~2.9만 |
| UD-48 | Intel S3700 200GB | 원시 264GB(또는 GiB 해석 0.2835TB), TBW 3,650 TB | 3,650 × WAF ÷ (0.264 ~ 0.2835) | P/E ≈ 12,900 ~ 13,800 × WAF (800GB와 정합) |
| UD-49 | Intel P3700 2TB | 17 DWPD, 5년, OP 25%(원시/사용자 1.25 가정) | 17 × 1,825 × WAF ÷ 1.25 | **P/E ≈ 24,800 × WAF** |
| UD-50 | Toshiba PX04SHB160 (1.6TB, 25 DWPD) | 원시 미공개 | 45,625 × WAF ÷ (원시/사용자) | 원시/사용자 1.37(S3700형)·1.7(P400m형)·2.0이면 **P/E ≈ 33,300 / 26,800 / 22,800 × WAF** |
| UD-51 | Samsung SM863 960GB | TBW 6,160 TB, 원시 1,024GiB(1.0995TB) 가정 | 6,160 × WAF ÷ 1.0995 | P/E ≈ 5,600 × WAF |
| UD-52 | Samsung SM1715 3.2TB | 10 DWPD·5년, 원시 미공개 | 10 × 1,825 × WAF ÷ (원시/사용자) | P/E × (원시/사용자) = 18,250 × WAF |
| UD-53 | Samsung 850 Pro 256GB (c't) | 기록 9,100 TB, 원시 256GiB(0.2749TB) 또는 0.256TB | 9,100 ÷ (0.256 ~ 0.2749) | 고장까지 **약 3.3만~3.6만 × WAF_시험** (정격 아님) |

**UD-54 ⚠️ 파생 요약 (판단 아님).**
- **25 DWPD·5년(랜덤) MLC 드라이브의 함의 P/E**는 원시/사용자 2.0이라도 2.3만 × WAF 이상이다(UD-50). 공표된 엔터프라이즈 MLC P/E(2만~3만, UD-21·22)와 같은 자릿수이고, 이 점은 **2009~2015년 선별(binned) planar eMLC + OP 25~70%** 로 만들어졌다(UD-22·23·49).
- **현행 3D TLC 다이의 MLC 모드 P/E로 공개된 값은 Apacer 10,000(2019, 산업용)뿐**이며, Flexxon은 pMLC를 3,000으로 표기한 요약이 있어 충돌한다(UD-30·32). 엔터프라이즈 3D TLC(200단 이상)의 MLC 모드 P/E 공표값은 없다(NG-03).
- 따라서 eMLC의 2만~3만 P/E를 "TLC 다이의 MLC 모드 P/E"로 옮겨 쓰면 안 된다.

---

## §3. ⚠️ 파생: 다이 산술과 손익분기 P/E (2TB 사용자 용량, 30 DWPD)

### 3-A. 산식과 가정

```
k (필요 원시/사용자 비) = DWPD × 보증일수 × WAF ÷ P/E
r (실제 원시/사용자 비)   = max(k, f)          f = 최소 OP 하한 1.07 (OP 7%, 가정)
모드 원시 용량 (TB)        = 2 × r
TLC 환산 용량 (TLC-TB)     = 모드 원시 용량 × 3 ÷ (모드의 비트/셀)   → SLC ×3, MLC ×1.5
1Tb TLC 다이 수            = TLC-TB ÷ 0.1374 (1Tb = 2⁴⁰비트 = 137.4GB)
```
- 가정·한계: 같은 TLC 다이를 SLC 모드면 용량 1/3, MLC 모드면 2/3로 쓸 수 있다고 둔다(이론 비트/셀 비). **실제 전환비는 이보다 불리하다**(DapuStor 5:1, Phison 6.25:1, wcssd-v1 C-10·C-11). 다이 수준 패리티(RAID)·불량 블록 예비·ECC 패리티 영역은 f에 뭉뚱그렸다(§3-F 민감도). 성능·지연·보존 동등성은 다루지 않는다.
- 보증 5년 = 1,825일 → DWPD × 일수 = 54,750 / 3년 = 1,095일 → 32,850.

### 3-B. 5년 30 DWPD

| 모드 | P/E | WAF | k | 실제 OP | 모드 원시 | TLC-TB | 1Tb TLC 다이 |
|---|---|---|---|---|---|---|---|
| SLC | 30,000 | 1 | 1.825 | 82% | 3.65TB | 10.95 | 약 80 |
| SLC | 30,000 | 3 | 5.475 | 447% | 10.95TB | 32.85 | 약 239 |
| SLC | 60,000 | 1 | 0.913 → **하한** | 7% | 2.14TB | **6.42** | 약 47 |
| SLC | 60,000 | 3 | 2.738 | 174% | 5.48TB | 16.43 | 약 120 |
| SLC | 100,000 | 1 | 0.548 → **하한** | 7% | 2.14TB | **6.42** | 약 47 |
| SLC | 100,000 | 3 | 1.643 | 64% | 3.29TB | 9.86 | 약 72 |
| MLC | 10,000 | 1 | 5.475 | 447% | 10.95TB | 16.43 | 약 120 |
| MLC | 10,000 | 1.2 | 6.570 | 557% | 13.14TB | 19.71 | 약 143 |
| MLC | 10,000 | 3 | 16.425 | 1,542% | 32.85TB | 49.28 | 약 359 |
| MLC | 20,000 | 1 | 2.738 | 174% | 5.48TB | 8.21 | 약 60 |
| MLC | 20,000 | 1.2 | 3.285 | 228% | 6.57TB | 9.86 | 약 72 |
| MLC | 20,000 | 3 | 8.213 | 721% | 16.43TB | 24.64 | 약 179 |
| MLC | 30,000 | 1 | 1.825 | 82% | 3.65TB | **5.48** | 약 40 |
| MLC | 30,000 | 1.2 | 2.190 | 119% | 4.38TB | 6.57 | 약 48 |
| MLC | 30,000 | 3 | 5.475 | 447% | 10.95TB | 16.43 | 약 120 |
| MLC | 40,000 | 1 | 1.369 | 37% | 2.74TB | **4.11** | 약 30 |
| MLC | 40,000 | 1.2 | 1.643 | 64% | 3.29TB | 4.93 | 약 36 |
| MLC | 40,000 | 3 | 4.106 | 311% | 8.21TB | 12.32 | 약 90 |

참고: 같은 2TB를 OP 7% TLC로 만들면 2.14 TLC-TB(약 16다이)다. SLC 모드 하한점(6.42)은 그 3배, MLC 모드 하한점(3.21)은 1.5배다.

### 3-C. 3년 30 DWPD

| 모드 | P/E | WAF | k | 실제 OP | 모드 원시 | TLC-TB | 1Tb TLC 다이 |
|---|---|---|---|---|---|---|---|
| SLC | 30,000 | 1 | 1.095 | 9% | 2.19TB | 6.57 | 약 48 |
| SLC | 30,000 | 3 | 3.285 | 228% | 6.57TB | 19.71 | 약 143 |
| SLC | 60,000 | 1 | 0.548 → 하한 | 7% | 2.14TB | 6.42 | 약 47 |
| SLC | 60,000 | 3 | 1.643 | 64% | 3.29TB | 9.86 | 약 72 |
| SLC | 100,000 | 1 | 0.329 → 하한 | 7% | 2.14TB | 6.42 | 약 47 |
| SLC | 100,000 | 3 | 0.986 → 하한 | 7% | 2.14TB | 6.42 | 약 47 |
| MLC | 10,000 | 1 | 3.285 | 228% | 6.57TB | 9.86 | 약 72 |
| MLC | 10,000 | 1.2 | 3.942 | 294% | 7.88TB | 11.83 | 약 86 |
| MLC | 10,000 | 3 | 9.855 | 886% | 19.71TB | 29.57 | 약 215 |
| MLC | 20,000 | 1 | 1.643 | 64% | 3.29TB | **4.93** | 약 36 |
| MLC | 20,000 | 1.2 | 1.971 | 97% | 3.94TB | 5.91 | 약 43 |
| MLC | 20,000 | 3 | 4.928 | 393% | 9.86TB | 14.78 | 약 108 |
| MLC | 30,000 | 1 | 1.095 | 9% | 2.19TB | 3.29 | 약 24 |
| MLC | 30,000 | 1.2 | 1.314 | 31% | 2.63TB | 3.94 | 약 29 |
| MLC | 30,000 | 3 | 3.285 | 228% | 6.57TB | 9.86 | 약 72 |
| MLC | 40,000 | 1 | 0.821 → 하한 | 7% | 2.14TB | 3.21 | 약 23 |
| MLC | 40,000 | 1.2 | 0.986 → 하한 | 7% | 2.14TB | 3.21 | 약 23 |
| MLC | 40,000 | 3 | 2.464 | 146% | 4.93TB | 7.39 | 약 54 |

### 3-D. TLC 1TB(다이 용량)당 평생 쓰기 예산 (산식 `모드 용량 비율 × P/E`, 단위 TB·회)

| 운용 | 계산 | TLC 1TB당 평생 NAND 기록 예산 |
|---|---|---|
| 네이티브 TLC 3,000 / 5,000 | 1 × P/E | 3,000 / 5,000 TB |
| (참고) 산업용 네이티브 TLC 11,000 (UD-33) | 1 × 11,000 | 11,000 TB |
| MLC 모드 10,000 / 20,000 / 30,000 / 40,000 | 2/3 × P/E | 6,667 / 13,333 / **20,000** / 26,667 TB |
| SLC 모드 30,000 / 60,000 / 100,000 | 1/3 × P/E | 10,000 / **20,000** / 33,333 TB |

→ **용량 하한이 걸리지 않는 영역에서는 MLC 모드 P/E가 SLC 모드 P/E의 절반 이상이면 다이당 쓰기 예산이 같거나 크다**(MLC 30,000 = SLC 60,000 = 20,000 TB). 2TB·30 DWPD·5년의 필요 NAND 기록량은 109,500 TB × WAF(3년 65,700 TB × WAF)다.

### 3-E. ⭐ 손익분기 MLC 모드 P/E (TLC-TB가 SLC 모드 이하가 되는 최소 P/E)

```
P_M* = DWPD × 일수 × W_M ÷ (2 × max(DWPD × 일수 × W_S ÷ P_S, f))
  (SLC가 하한에 걸리지 않으면 P_M* = P_S × W_M ÷ (2 × W_S),
   SLC가 하한에 걸리면  P_M* = DWPD × 일수 × W_M ÷ (2 × f))
```

| 비교 조건 | SLC 모드 P/E | 5년 P_M* | 3년 P_M* |
|---|---|---|---|
| **(i) 양쪽 모두 FDP, WAF 1** | 30,000 | 15,000 | 15,000 |
| | 60,000 (SLC 하한) | **25,584** | **15,350** |
| | 100,000 (SLC 하한) | 25,584 | 15,350 |
| **(ii) SLC WAF 1, MLC WAF 1.2** | 30,000 | 18,000 | 18,000 |
| | 60,000 (SLC 하한) | **30,701** | **18,421** |
| | 100,000 (SLC 하한) | 30,701 | 18,421 |
| **(iii) 양쪽 모두 배치 없음, WAF 3** | 30,000 | 15,000 | 15,000 |
| | 60,000 | 30,000 | 30,000 |
| | 100,000 | 50,000 | 46,051 (3년은 SLC 하한) |
| **(iv) SLC 배치 없음 WAF 3, MLC FDP WAF 1.2** | 30,000 | 6,000 | 6,000 |
| | 60,000 | 12,000 | 12,000 |
| | 100,000 | 20,000 | 18,421 (3년은 SLC 하한) |

- (iv)는 FDP를 MLC 쪽에만 적용한 비교라 **MLC 모드의 효과와 FDP의 효과가 섞여 있다**. 같은 FDP를 SLC 모드에도 적용하면 (i)·(ii)가 된다.
- **MLC 모드가 다이를 최대 50% 줄이려면**(MLC도 OP 7% 하한에 도달) P/E가 5년 WAF 1에서 **51,168**, WAF 1.2에서 61,402, 3년 WAF 1에서 30,701, WAF 1.2에서 36,841 이상이어야 한다.

**공개 MLC 근거를 대입한 결과 (5년·WAF 1, SLC 6만 하한 6.42 TLC-TB 대비):**
- Apacer MLC-liteX 10,000(UD-30): 16.43 TLC-TB → **SLC 대비 약 2.56배**. 3년이면 9.86 → 약 1.54배.
- P400m급 20,000(UD-22, planar eMLC): 8.21 → 약 1.28배. 3년이면 4.93 → **약 23% 적음**.
- Micron 34nm급 30,000(UD-21, planar eMLC): 5.48 → **약 15% 적음**. WAF 1.2면 6.57 → 약 2% 많음.
- planar eMLC 값은 2009~2013년 선별 다이 기준이며 3D TLC의 MLC 모드에 이전할 수 없다(UD-54).

### 3-F. 민감도: 최소 OP 하한 f

| f | 의미 | SLC 하한 TLC-TB | 5년 P_M* (WAF 1 / 1.2) | 3년 P_M* (WAF 1 / 1.2) |
|---|---|---|---|---|
| 1.07 | OP 7% | 6.42 | 25,584 / 30,701 | 15,350 / 18,421 |
| 1.20 | OP 20%(패리티·불량 블록 예비 포함 가정) | 7.20 | 22,813 / 27,375 | 13,688 / 16,425 |

하한이 클수록(=SLC 모드가 남는 내구성을 더 많이 버릴수록) MLC 모드 손익분기 P/E는 내려간다.

### 3-G. DWPD 연속성: MLC 모드 P/E·원시/사용자 비·WAF별 정격 DWPD (산식 `P/E × r ÷ (WAF × 일수)`)

**5년**

| P/E | WAF | r = 1.07 | 1.28 | 1.5 | 2.0 |
|---|---|---|---|---|---|
| 3,000 (네이티브 TLC 참고) | 1 | 1.8 | 2.1 | 2.5 | 3.3 |
| 3,000 | 3 | 0.6 | 0.7 | 0.8 | 1.1 |
| 10,000 | 1 | 5.9 | 7.0 | 8.2 | 11.0 |
| 10,000 | 1.2 | 4.9 | 5.8 | 6.8 | 9.1 |
| 20,000 | 1 | 11.7 | 14.0 | 16.4 | 21.9 |
| 20,000 | 1.2 | 9.8 | 11.7 | 13.7 | 18.3 |
| 30,000 | 1 | 17.6 | 21.0 | 24.7 | **32.9** |
| 30,000 | 1.2 | 14.7 | 17.5 | 20.5 | 27.4 |

**3년**

| P/E | WAF | r = 1.07 | 1.28 | 1.5 | 2.0 |
|---|---|---|---|---|---|
| 10,000 | 1 | 9.8 | 11.7 | 13.7 | 18.3 |
| 10,000 | 1.2 | 8.1 | 9.7 | 11.4 | 15.2 |
| 20,000 | 1 | 19.5 | 23.4 | **27.4** | **36.5** |
| 20,000 | 1.2 | 16.3 | 19.5 | 22.8 | **30.4** |
| 30,000 | 1 | **29.3** | **35.1** | 41.1 | 54.8 |
| 30,000 | 1.2 | 24.4 | 29.2 | 34.2 | 45.7 |

### 3-H. 산술 판독 (판단 아님)

1. **5년 30 DWPD를 MLC 모드로 내려면** WAF 1에서도 P/E 3만에 원시/사용자 약 1.8~2.0(OP 80~100%)이 필요하다. "OP 소폭 증가"로 닿으려면(r ≤ 1.28) P/E가 약 4.3만 이상이어야 한다(54,750 ÷ 1.28 = 42,773).
2. **3년 30 DWPD**는 P/E 2만·r 1.5~2.0, 또는 P/E 3만·r 1.07~1.28(WAF 1)에서 닿는다.
3. MLC 모드 P/E 1만(유일한 3D TLC 공표값)은 5년이면 r 2.0에서도 11 DWPD, 3년이면 18 DWPD다. 이 값은 **기존 고DWPD 영역(3~10 DWPD)과 초고DWPD(30) 사이**에 놓인다.
4. 같은 MLC 모드·FDP 조합이 P/E·OP·보증 기간만 바꿔 **약 5 DWPD에서 30 DWPD 이상까지 연속으로** 이어진다(3-G). 반면 SLC 모드는 하한(OP 7%)에서도 5년 기준 P/E 6만이면 약 35 DWPD(운영점 페이지 §5), 즉 시작점이 30 DWPD 근처다.

---

## §4. 선례: 내구성을 위한 MLC 운용, 고내구 제품의 FDP

| ID | 선례 | 상태 | 근거 | 등급 |
|---|---|---|---|---|
| UD-60 | ⭐ **MLC + 대형 OP로 10~25 DWPD를 낸 엔터프라이즈 세대(2012~2015)**: S3700 10(원시/사용자 약 1.28~1.37), P400m 10(OP 70%), P3700 17(OP 25%), SSD800MH.B 25, PX04SHB 25(최대 1.6TB), 1200.2 HE 25 | 출하·단종 | UD-22~UD-26, A03·A04 | 🟡 / ⚠️ 파생 집계 |
| UD-61 | **같은 NAND로 OP만 바꿔 DWPD 등급을 나눈 선례**: Seagate 1200.2는 같은 Micron eMLC로 1~25 DWPD 다섯 등급(UD-26). Micron 5100 ECO/PRO/MAX는 3D eTLC로 1 / 1~3 / 5 DWPD, OP 10~20% / 20~30% / 60~70%(레포 A05) | 출하·단종 | UD-26 ; qlc-v6-purchase A05 | 🟡 |
| UD-62 | **SCM급 저지연 NAND 벤더는 비트당 원가를 위해 MLC를 추가했다**: XL-FLASH 2세대 MLC(2022), Z-NAND 2세대 MLC(2017 예고, 2018 사양) | 다이 발표 | UD-36·37 | 🟡 |
| UD-63 | **그러나 2025~2026 고내구 제품은 같은 다이를 SLC로 쓴다**: GP1은 XL-FLASH 2세대를 "SLC(1비트/셀) 형식"으로(UD-01), N3X도 "SLC 모드"(UD-06, MLC 옵션 서술과 충돌). **MLC Z-NAND 탑재 출하 제품은 확인 못함**(NG-06) | 발표·출하 | UD-01·06·37 | 🟡 / ⚠️ |
| UD-64 | **TLC 다이의 MLC 모드는 산업·임베디드 영역에만 공개 선례가 있다**: Apacer MLC-liteX(2019), Flexxon 3D pMLC eMMC. **2024~2026 엔터프라이즈·AI SSD에서 TLC를 MLC 모드로 운용한 제품은 확인 못함**(NG-02) | 산업용 | UD-30·32 | 🟡 / ⚠️ |
| UD-65 | **고내구 제품의 FDP**: ScaleFlux KV 캐시 플랫폼(FDP 스트림 200개 이상, 7~10+ effective DWPD, UD-13), Kioxia CM10(FDP, 1/3 DWPD, H-16), Huawei M900(KV 인지 배치, 시스템 24 DWPD·3년, UD-12). **정격 ≥30 DWPD 단일 드라이브가 FDP 지원을 표기한 사례는 확인 못함**(NG-04). Phison은 FMS 2024 시점에 FDP를 광고하지 않았다(AnandTech 해설) | 발표·출하 | UD-12·13, H-16 ; AnandTech https://at-web1.www.anandtech.com/show/21527/phison-enterprise-ssds-at-fms-2024-pascari-branding-and-accelerating-ai | 🟡 |
| UD-66 | FDP의 WAF 근거: CacheLib RUH 2개로 3.22 → 1.03(R-08) | 논문 | R-08 | ✅ (레포) |

---

## §5. 반증·제약

| ID | 반증 | 근거 | 등급 |
|---|---|---|---|
| UD-70 | ⭐ **네이티브 MLC는 공급이 닫히고 있다**: 2026년 세계 MLC NAND 생산능력 **전년 대비 −41.7%** 전망. 삼성은 2025-03 MLC NAND 단종을 예고하고 **최종 출하 2026-06**, 화성 12라인 2D NAND를 1c DRAM으로 전환. Kioxia는 2029년부터 완전 철수 계획, SK hynix·Micron은 기존 고객 수요분만 유지. MLC 현물가는 2025년 말 이후 약 3배 | TrendForce 2026-01-07 https://www.trendforce.com/presscenter/news/20260107-12866.html ; TrendForce 2026-05-13 https://www.trendforce.com/news/2026/05/13/news-mlc-nand-spot-prices-reportedly-triple-since-late-2025-as-samsung-kioxia-exit-supply/ ; TweakTown https://www.tweaktown.com/news/111595/mlc-nand-prices-have-tripled-as-samsung-shuts-its-last-2d-nand-line-and-kioxia-plans-a-full-exit-by-2029/index.html | 🟡 (대상은 레거시 2D MLC 중심) |
| UD-71 | **MLC는 SLC보다 읽기 지연이 길다**: Z-NAND 2세대 SLC 1~3µs vs MLC 5µs(UD-37), XL-FLASH 2세대는 MLC 지연을 플레인 병렬성으로 "일부 보상"(UD-36). 특허 예시: 감지 시간 SLC 30µs / MLC 50µs / TLC 70µs(읽기 레벨 1·2·3개) | UD-36·37 ; USPTO 11099783 https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/11099783 | 🟡 / ⚠️ (특허 예시값, 제품 사양 아님) |
| UD-72 | **2025~2026 ≥50 DWPD 제품의 공개 동기는 IOPS·지연이다**(X-11). GP1 512B 1,000만 IOPS, AIN P 2,500만~5,000만 IOPS, X5 20/5µs. 같은 다이가 MLC를 지원해도 GP1은 SLC를 택했다(UD-63) | X-11, UD-01·03·07·63 | 🟡 |
| UD-73 | **반대 방향 근거(지연 요구가 SLC급이 아닐 수 있음)**: KV 캐시 오프로드 트레이스는 128KiB 요청이 지배(X-01), LMCache 프로필은 약 33MB 블록 파일·약 78% 순차(X-03). CMX 지명 드라이브는 전부 TLC(UD-11). 삼성 PM1763(TLC)은 GPU 개시 512B 랜덤 읽기 드라이브당 약 692만 IOPS(UD-10, 벤더 시험). Huawei M900 시스템 접근 지연 60µs(UD-12) | X-01·X-03, UD-10·11·12 | 🟡 (GP1·PM1763 수치는 시험 조건이 달라 비교 불가) |
| UD-74 | **TLC 다이 MLC 모드의 P/E 공개값이 서로 충돌하고 엔터프라이즈 값이 없다**: Apacer 10,000 vs Flexxon 3,000(UD-30·32). Flexxon은 pMLC의 장점을 P/E가 아니라 **고온 오류율**로 서술 | UD-30·32 | ⚠️ |
| UD-75 | **보존 조건은 완화되지 않는다(공개 기준)**: JESD218 엔터프라이즈는 정격 내구성 소진 후 40°C·3개월 보존(UD-42). HET-MLC가 P/E를 늘린 방식이 보존과의 교환이었다(UD-23·43). 고P/E 운용 시 보존 여유가 줄어드는 구조 | UD-23·42·43 | 🟡 |
| UD-76 | **인터페이스에 MLC 모드가 없다**: SEF API는 일반·pSLC 두 유형뿐(UD-35 ✅). NVMe FDP RUH 서술자에는 매체 유형 필드가 없다(혼합 매체 원장 ST-12 ✅) | UD-35 ; [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) ST-12 | ✅ |
| UD-77 | **고객 인증(qualification) 부담의 공개 정량치 없음**: 엔터프라이즈 OEM 인증은 RDT·FTC·코드 회귀·통합·시스템 시험의 다단계라는 서술만 있고, 새 셀 모드 도입 시 재인증 기간을 밝힌 공개 출처는 확인 못함(NG-08) | FMS 2016(Loon) https://files.futurememorystorage.com/proceedings/2016/20160809_FC11_Loon.pdf ; SNIA 2016 https://www.snia.org/sites/default/files/NVM/2016/presentations/Jeanette-Chen_Things_Happening_Solid_State_Storage_FINAL.pdf | 🟡 / ⚠️ |
| UD-78 | **KV 캐시 쓰기를 줄이는 쪽의 움직임**(기존 원장): Dynamo의 SSD 수명 보호 필터 기본 활성(X-04·X-06), DeepSeek V4.1-Flash의 KV 캐시용 SSD 용량 1/8(X-10) | X-04·X-06·X-10 | ✅ / 🟡 |

---

## §6. 부정 확인 (검색했으나 확보하지 못한 것)

- **NG-01. 2TB급·30 DWPD를 정격으로 내건 "KV 캐시 SSD" 제품.** 없음. 검색어: `"KV cache" SSD "30 DWPD" OR "25 DWPD" OR "40 DWPD" 2026`, `NVIDIA CMX ... endurance DWPD requirement qualified drives`.
- **NG-02. 2024~2026 엔터프라이즈·AI SSD 중 TLC 다이를 MLC 모드(2비트)로 운용한 제품.** 없음. 검색어: `enterprise SSD "TLC" NAND operated in "MLC mode" endurance write-intensive`, `SSD "TLC NAND in MLC mode" OR "TLC as MLC" ... data center`, `FMS 2026 "MLC" mode SSD high endurance AI inference`.
- **NG-03. 엔터프라이즈 3D TLC(200단 이상)의 MLC 모드 P/E 벤더 공표값.** 없음(산업용 Apacer 10,000만, 그마저 Flexxon 3,000과 충돌). 검색어: `pMLC TLC NAND MLC mode P/E cycles industrial SSD endurance`, `"3D TLC" "MLC mode" P/E industrial flash firmware 2-bit`.
- **NG-04. 정격 ≥30 DWPD 단일 드라이브의 FDP 지원 표기.** 없음. 검색어: `high endurance SLC SSD "Flexible Data Placement" FDP support 60 DWPD OR 50 DWPD product`, `Phison Pascari FDP "Flexible Data Placement" support X200 OR X202Z`.
- **NG-05. 보증 3년을 내건 ≥30 DWPD 단일 드라이브.** 없음(3년은 Huawei M900 시스템뿐, UD-12).
- **NG-06. MLC Z-NAND·MLC XL-FLASH를 탑재한 출하 제품과 그 P/E·DWPD.** 없음. 검색어: `Samsung second generation Z-NAND MLC version`, `SSD using Kioxia XL-FLASH MLC mode second generation product endurance DWPD`.
- **NG-07. GP1·AIN P·X5·X202Z의 용량 전 구간·보증·DWPD 기준(순차/랜덤).** 미공개(wcssd-v1 G-03 일부 갱신: X202Z 최대 6.4TB·"3D pSLC", AI100E 5년만 확보).
- **NG-08. 새 셀 모드 도입 시 고객 재인증 기간의 공개 정량치.** 없음. 검색어: `enterprise SSD customer qualification takes months hyperscaler requalification NAND change`.
- **NG-09. KV 캐시 계층에 JESD218 엔터프라이즈 보존(3개월)을 완화한 규격·고객 요구.** 없음.
- **NG-10. 25 DWPD MLC 드라이브(PX04SHB, SSD800MH.B, 1200.2 HE)의 원시 NAND 용량.** 없음 → UD-50은 원시/사용자 비를 가정으로 둠.
- **NG-11. Intel HET-MLC의 셀 P/E 절대값.** 없음("표준 MLC의 30배" 서술만, 기준 불명).
- **NG-12. 현행 3D TLC 다이에서 SLC·MLC·TLC 모드의 tR 실측값(제품 데이터시트).** 없음(특허 예시값·2019 Kioxia 비교만). 검색어: `3D NAND read latency tR SLC mode vs MLC vs TLC microseconds ISSCC 2024 2025`.
- **NG-13. Micron XTR 후속 제품, Solidigm D7-P5810 후속 제품.** 없음.
- **NG-14. NVIDIA CMX·Storage-Next의 SSD 내구성(DWPD) 요구치.** 여전히 없음(wcssd-v1 G-02 유지).
- **NG-15. Samsung SM1715의 셀 유형(MLC/TLC) 명시 원문.** 없음.

---

## §7. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. 🟡 (제품 지형)** "2025~2026년 발표된 정격 50 DWPD 이상 AI SSD(Kioxia GP1, InnoGrit N3X, Phison X202Z, DapuStor X5)는 SLC 또는 SLC 모드 매체이거나 매체를 공개하지 않았고, 보증이 공개된 단일 드라이브 고내구 제품은 모두 5년 기준이다." (UD-01·04·06·07, 1-B)

> **2. 🟡 (같은 다이, SLC 선택)** "Kioxia는 2022년 XL-FLASH 2세대에 비트당 원가를 낮추는 MLC(2비트/셀)를 추가했지만, 2026년 발표한 GP1은 같은 2세대 XL-FLASH를 SLC 형식으로 쓴다." (UD-36, UD-01)

> **3. 🟡 (MLC 시대 선례)** "MLC 시대에는 OP를 크게 잡은 eMLC로 5년 25 DWPD(랜덤)를 낸 엔터프라이즈 SSD가 1.6TB 용량까지 있었다(Toshiba PX04SHB, 2015)." (UD-25, UD-60)

> **4. 🟡 (MLC P/E 근거의 층위)** "엔터프라이즈 MLC의 공표 P/E는 Micron 34nm 3만 회(2009), Micron P400m 25nm 2만 회(2013)였고, 3D TLC를 MLC 모드로 운용한 공개 P/E는 산업용 Apacer MLC-liteX 1만 회(2019)가 확인된 전부다." (UD-21·22·30)

> **5. ⚠️ 파생 (손익분기)** "2TB·30 DWPD에서 SLC 모드(P/E 6만 이상)와 MLC 모드가 모두 FDP로 WAF 1이라면, MLC 모드가 TLC 다이를 덜 쓰려면 MLC 모드 P/E가 5년 보증 기준 약 2.6만 회, 3년 보증 기준 약 1.5만 회 이상이어야 한다(OP 하한 7% 가정)." (§3-E)

> **6. ⚠️ 파생 (OP 규모)** "MLC 모드로 5년 30 DWPD를 내려면 WAF 1에서도 P/E 3만에 OP 약 80%가 필요하고, OP 28% 이내로 닿으려면 P/E가 약 4.3만 회 이상이어야 한다." (§3-B, §3-H)

> **7. 🟡 (공급 제약)** "삼성은 MLC NAND의 최종 출하를 2026년 6월로 예고했고, 2026년 세계 MLC NAND 생산능력은 전년 대비 41.7% 감소할 전망이다(TrendForce)." (UD-70)

> **8. 🟡 (보존 조건)** "JESD218 엔터프라이즈 등급은 정격 내구성을 소진한 뒤 40°C 전원 차단 상태에서 3개월 데이터 보존을 요구한다." (UD-42)

> **❌ 쓰지 말 것**
> - "TLC의 MLC 모드 P/E는 N회" 단일값 → 공개값이 1만(Apacer)과 3천(Flexxon)으로 충돌하고, 엔터프라이즈 3D TLC 값은 없다(UD-30·32, NG-03)
> - "eMLC가 25 DWPD를 냈으니 TLC 다이의 MLC 모드로도 된다" → eMLC 2만~3만 P/E는 2009~2013년 선별 planar 다이 값이다(UD-54)
> - "MLC 모드는 SLC 모드 대비 다이를 절반만 쓴다" (조건 없이) → 손익분기 P/E 이상에서만 줄고, 최대 50% 절감은 5년 WAF 1에서 P/E 약 5.1만 이상일 때다(§3-E)
> - "MLC 모드 + FDP가 SLC 모드보다 다이를 덜 쓴다" (SLC 쪽에 FDP를 빼고 비교) → 차이의 상당 부분이 FDP 효과다(§3-E (iv))
> - "GP1은 MLC XL-FLASH를 쓴다" / "InnoGrit N3X에 MLC 모드가 있다" → GP1은 SLC 형식으로 보도, N3X는 출처 충돌(UD-01·16)
> - "Huawei M900은 24 DWPD SSD" → 시스템 수준·3년 주장이다(UD-12)
> - "NVIDIA CMX는 N DWPD를 요구한다" → 미공개(NG-14)
> - "네이티브 MLC로 공급한다" (공급 단서 없이) → 주요 3사가 MLC를 축소·철수 중이다(UD-70)
> - "XL-FLASH는 TLC보다 10배 빠르다"를 2026년 TLC에 그대로 적용 → 2019년 발표 기준 비교다(UD-41)

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| Kioxia Software-Enabled Flash API 헤더 `SEFAPI.h` (HEAD `aa665e5`, 2026-10-03 열람, 2,304행) | https://raw.githubusercontent.com/SoftwareEnabledFlash/SEF-API/main/SEFAPI.h | `kPSLCSupported (1 << 14)`(L135), `enum SEFSuperBlockType { kForWrite, kForPSLCWrite }`(L905~908), 슈퍼블록 유형 주석 "normal or pSLC"(L1045), `averagePEcount`·`maxPEcount` uint8(L713~714). MLC 모드 열거값·필드 없음 |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| wcssd-v1 H-04(GP1 "용량 미공개") | 여전히 용량·보증 미공개. **매체는 XL-FLASH 2세대 SLC(1비트/셀) 형식**으로 보도, 수요 해설(KV 캐시·임베딩·벡터 인덱스·RAG) 추가(UD-01) |
| wcssd-v1 H-07(X202Z "매체·용량 미확인") | "3D pSLC NAND", 최대 6.4TB, 듀얼포트 2×2, 10,000/14,800MB/s, 수요 서술 추가(UD-04). 보증은 여전히 미확인 |
| wcssd-v1 H-08·P-30(AI100E) | 320GB~2TB, M.2·U.2·E1.S, 100 DWPD, 5년 보증 확보(UD-05). P-30의 수치 부정합은 해소되지 않았다 |
| wcssd-v1 H-12(AIN P 2,500만 IOPS) | 512B 약 5,000만 IOPS 보도와 충돌 기록(UD-15) |
| wcssd-v1 G-02·G-03·G-14 | G-02(CMX DWPD)·G-14(XTR 보증) 유지, G-03 일부 갱신(NG-07) |
| wcssd-v1 P-01~P-12(pSLC) | Apacer SLC-liteX 3만(2019)·10만(2022), Swissbit pSLC 80 DWPD, XL-FLASH 2세대 SLC 제품(GP1·N3X) 추가(UD-31·38~40). 같은 벤더의 SLC : MLC : TLC 모드 P/E 비 30,000 : 10,000 : 3,000(UD-38) |
| 레포 ladder F4(MLC 3,000~10,000) | 엔터프라이즈 eMLC 2만~3만(UD-21·22), TLC 다이 MLC 모드 1만 vs 3천 충돌(UD-30·32) 추가 |
| qlc-v6-purchase A03·A04(S3700 10, P3700 17 DWPD) | 원시 용량(1,024GB·264GB), OP 25%, HET의 보존 교환, 역산 P/E(UD-23·47~49) 추가. 25 DWPD MLC 세대(UD-24~26) 추가 |
| [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §5(SLC 모드 OP 표) | 같은 산식을 MLC 모드로 확장한 5년·3년 표, 다이당 쓰기 예산, 손익분기 P/E, DWPD 연속성 표(§3) |
| [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) ST-12(FDP RUH에 매체 필드 없음) | SEF API에도 MLC 모드가 없음을 원문으로 확인(UD-35) |
