# SSD 후속 조사 원장: GPU 주도 512B 고IOPS SSD(SCADA·Storage-Next)의 시장 규모 검증, 성숙도 신호, 기술 제약 공개 수치와 병목 산술

**수집일**: 2026-10-03
**수집자**: Research Agent (Follow-up: SCADA market · maturity · technical review). 사실 수집과 산식이 명시된 파생 산술만 수행. 전략 판단·권고 없음.
**유형**: 웹 검색 요약 + 1차 원문 직접 열람(GitHub 원본: Linux 커널 헤더, Samsung `xnvme/aisio` 실험 문서, NVMeVirt·MQSim 설정, `xio-sig` 원격 저장소 상태) 기반 팩트 원장
**용도**: SSD 개발 조직이 "GPU 주도(GPU-initiated) 512B 소블록 고IOPS SSD 기술을 미리 준비할 것인가"를 검토할 때, 사용자가 우려한 두 불확실성(① **시장 규모** ② **기술 성숙도**)에 대한 사실 근거와, 기술 심의용 **공개 수치 + 병목 산술**을 제공한다. 선행 원장 [ssd-future-candidate-gpu-direct-iops-2026-10.md](ssd-future-candidate-gpu-direct-iops-2026-10.md)(ID: GD-, GR-, GW-, CE-, CX-, TC-, NF-)의 **후속편**이며, 그 사실은 반복하지 않고 ID로만 참조한다. §1은 요청 1(시장·위키 수치 검증), §2는 요청 2(성숙도), §3은 요청 3(기술 제약 공개 수치), §4는 요청 3의 파생 산술, §5는 요청 4(반증)에 1:1 대응.

**등급**: ✅ 1차 원문 직접 열람 / 🟡 2차 매체 또는 검색 요약 경유(1차 출처라도 원문을 못 연 경우 포함) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·가정 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 2026-10-03 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch, `CONNECT 403`). 선행 원장 §0-1의 차단 목록(NVIDIA·Samsung·Micron·SK hynix·Kioxia·TrendForce·Blocks & Files·Tom's Hardware·StorageReview·arXiv·SNIA·IEEE·ACM·국내 매체 등)은 그대로이고, 이번에 **추가로 확인된 차단**: `www.marketsandmarkets.com`, `www.marketsandmarketsblog.com`, `www.kioxia-holdings.com`, `www.kioxia.com`, `blog-us.kioxia.com`, `files.futurememorystorage.com`, `handsoff.substack.com`, `technews.tw`, `www.marvell.com`, `pith.science`, `www.themoonlight.io`, `frontgrade.com`, `patents.google.com`, `www.swissbit.com`, `www.intelligentmemory.com`, `www.fortunebusinessinsights.com`, `www.mordorintelligence.com`, `www.researchandmarkets.com`, `www.itpro.com`, `ipsnews.net`, `www.sec.gov`, `ir.micron.com`, `www.skhynix.com`, `www.yole-group.com`, `www.idc.com`, `www.gartner.com`, `counterpointresearch.com`, `www.techinsights.com`, `www.jedec.org`, `pcisig.com`, `nvmexpress.org`, `www.onfi.org`, `www.isscc.org`, `www.anandtech.com`, `www.servethehome.com`, `www.nextplatform.com`, `www.theregister.com`, `www.eetimes.com`, `www.digitimes.com`, `www.semianalysis.com`, `www.forbes.com`, `www.hankyung.com`, `www.thelec.kr`, `www.elec.co.kr` 등(약 100개 도메인 일괄 시험에서 통과는 `raw.githubusercontent.com`, `github.com`(git), `www.microsoft.com`, `cloud.google.com` 4곳뿐). GitHub 검색 API는 세션 범위 제한으로 403.
- **✅는 GitHub에서 원문을 직접 읽은 항목에만** 붙였다: Linux 커널(`torvalds/linux` master, HEAD `ff47652`, `Makefile` = 7.3-rc5)의 `include/linux/nvme.h`·`drivers/nvme/host/core.c`·`include/uapi/linux/pci_regs.h`·`include/linux/pci.h`, Samsung `xnvme/aisio`(HEAD `7311ed0`, 커밋 2026-10-01)의 `docs/src/experiments/{pcie_saturation,device_initiated_qdepth,device_initiated_iosize,cpu_initiated}.md`, `snu-csl/nvmevirt`(HEAD `61c90f7`)의 `ssd_config.h`, `CMU-SAFARI/MQSim`(HEAD `51f0f2d`)의 `ssdconfig.xml`, `xio-sig` 저장소 `git ls-remote` 결과.
- 시장조사 보고서(MarketsAndMarkets·Fortune·Mordor), 증권사 보고서(JPMorgan·Morgan Stanley), 벤더 발표 수치는 **모두 검색 요약 경유라 🟡**다. 보고서 원문 정의 문장은 열지 못했다(§6 SN-01).

**0-2. 용어.** 선행 원장 §0-2를 따른다. 이 원장에서 "SCADA"는 **NVIDIA Scaled Accelerated Data Access**를, "산업용 SCADA"는 **Supervisory Control and Data Acquisition**(공정 감시제어)를 뜻한다. **"AI-Powered Storage"**는 MarketsAndMarkets 등이 쓰는 시장조사 범주명이며 둘 중 어느 것과도 같지 않다(§1).

**0-3. 블록 크기·링크 폭.** 모든 IOPS는 블록 크기(512B/4KB)와 링크 폭(x4 드라이브 / x16 GPU)을 함께 적는다. "Gen6 200M IOPS"처럼 링크 폭이 빠진 문장은 x16(GPU) 기준일 가능성이 높다(§4-D).

**0-4. 선행 원장과의 관계.** 반복 금지, ID 참조: Storage-Next 정의·목표(GD-01~GD-04), xio-sig(GD-06·GD-07), SCADA Server SDK·cuObject(GD-08), Newburn SDC 2025(GD-11), SMI CEO 1억 IOPS(GD-12), Samsung PM1763 백서(GD-20·GD-21), aisio(GD-23, GR-10, GR-20), Kioxia GP·1억 IOPS 순연(GD-25), Smart IOPS T50(GD-26), Graid(GD-27), Wiwynn(GD-28), Micron 9650(GD-29), SK hynix AI-N P(GD-30), 범용 Gen6 컨트롤러 7M(GD-32), XL-FLASH 사양(GR-01), 다이 산술(GR-03), 링크 산술 1차(GR-11), 매핑 테이블(GR-24), 읽기 증폭(GR-25), 반증(CE-01~CE-12), 부정 확인(NF-01~NF-15). 레포 다른 원장: [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md) H-04·H-05·H-11·H-12·C-15, [component-to-system-solution-ladder-facts-2026-09.md](component-to-system-solution-ladder-facts-2026-09.md) F33, [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) MM-21, [qlc-v8-dwpd-price-inference-2026-09.md](qlc-v8-dwpd-price-inference-2026-09.md) P-06, [qlc-essd-market-size-forecast-data-2026-09.md](qlc-essd-market-size-forecast-data-2026-09.md)(2025 eSSD 매출 약 $26B), [semianalysis-isscc-2026-2026-04-15.md](semianalysis-isscc-2026-2026-04-15.md)(BiCS10 6-plane), [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md) D08.

**본 원장의 새 내용**: ① 위키 수치 "SCADA(AI 스토리지) $36B → $322B, CAGR 24%, MarketsAndMarkets"의 **실제 출처 범주 판정** ② 512B 고IOPS 전용 시장에 대한 애널리스트 수치의 **부재 확인**과 인접 정량 단서(JPMorgan·Morgan Stanley) ③ 2025-03 ~ 2026-10 **성숙도 신호의 날짜별 정리**(PCIe 7.0·Linux·NVMe TPAR·컨트롤러 샘플 일정 포함) ④ NAND tR·플레인·채널 속도·명령 오버헤드·LDPC·PCIe 프레이밍의 **공개 수치** ⑤ 매체·채널·PCIe 상한의 **파생 산술과 병목 순서** ⑥ GPU 측 SM 점유 비용 등 새 반증.

---

## §1. 시장 규모·수요 근거, 위키 수치 검증

### 1-A. ⭐ 위키 "SCADA $36B → $322B (CAGR 24%), MarketsAndMarkets" 검증

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-01 | ⭐ MarketsAndMarkets **"AI-Powered Storage Market"** 보고서: "**USD 36.28 billion in 2025 → USD 321.93 billion by 2035, CAGR 24.4% (2025~2035)**". 동인 서술: 기업의 대량 비정형 데이터, AI/ML 워크로드용 고성능·저지연 스토리지, **하이브리드/멀티클라우드**, "**automated, intelligent data management at scale**" | 2035 예측판(발행일 미확인) | https://www.marketsandmarkets.com/Market-Reports/ai-powered-storage-market-29450656.html (차단) ; https://www.marketsandmarketsblog.com/global-ai-powered-storage-market-growth-fueled-by-big-data-cloud-computing-and-ai-workloads-2035.html (차단) | 🟡 `[검색 요약 경유]` |
| SR-02 | 같은 보고서의 **세분화 축**: Offering(**Hardware, Software**), Storage System(**DAS, NAS, SAN**), Storage Architecture(**File, Object, Block**), Storage Medium(**SSD, HDD**), End User(**Enterprises, CSP, Government, Telecom**). "Hardware가 최대 비중", "**SSD가 최고 CAGR**(AI의 저지연·고IOPS 요구)". 주요 업체: **Dell, HPE**, Intel, NVIDIA, IBM, Samsung, Pure Storage, NetApp, Micron, Cisco | 위와 같음 | 위 + https://www.marketsandmarkets.com/ResearchInsight/ai-powered-storage-market.asp | 🟡 |
| SR-03 | 같은 보고서 계열의 **이전 판**: "AI-Powered Storage Market worth **$34.5 billion by 2024**", **$10.4B(2019) → $34.5B(2024), CAGR 27.1%** | 2019~2020 | https://www.marketsandmarkets.com/PressReleases/ai-powered-storage.asp ; ITPro https://www.itpro.com/infrastructure/server-storage/365906/global-ai-powered-storage-market-to-grow-by-271-by-2024 | 🟡 |
| SR-04 | 대조: MarketsAndMarkets **산업용 SCADA(Supervisory Control and Data Acquisition) 시장**: **USD 12.89B(2025) → USD 20.05B(2030), CAGR 9.2%**, 서비스 부문 최대, 주요 업체 Siemens·ABB·Schneider Electric, 수요처 유틸리티·제조·석유가스·교통 | 2025~ | https://www.marketsandmarkets.com/ResearchInsight/scada-market-growth-analysis.asp ; https://www.marketsandmarkets.com/PressReleases/supervisory-control-data-acquisition.asp | 🟡 |
| SR-05 | 다른 조사기관의 "AI-powered storage" 수치: **Fortune Business Insights $35.90B(2025) → $271.32B(2034), CAGR 25.2%**; **Mordor Intelligence $27.06B(2025) → $76.6B(2030), CAGR 23.13%**; 출처 불명 재게시 **$36.3B(2025) → $164.93B(2032), CAGR 24.2%** | 2025~2026 | https://www.fortunebusinessinsights.com/ai-powered-storage-market-108741 ; https://www.mordorintelligence.com/industry-reports/artificial-intelligence-powered-storage-market ; https://gitea.gi.de/persistence30/ai-powered-storage-market/issues/1 | 🟡 / ⚠️(마지막 항목 출처 불명) |
| SR-06 | **⚠️ 파생 판정**: 위키의 "$36B(2025) → $322B(2035), CAGR 24%"는 **SR-01 "AI-Powered Storage" 보고서 수치($36.28B → $321.93B, 24.4%)를 반올림한 것**과 정확히 일치한다. (1) **산업용 SCADA가 아니다**: 산업용 SCADA는 같은 회사 수치가 $12.89B → $20.05B, 9.2%로 전혀 다르다(SR-04). (2) **NVIDIA SCADA 또는 GPU 주도 512B SSD 시장도 아니다**: 세분화에 **HDD, NAS·SAN, 소프트웨어**가 들어 있고(SR-02) 업체 1순위가 스토리지 시스템 회사(Dell·HPE)다. (3) 규모 대조: 2025 기준값 **$36.28B는 2025년 엔터프라이즈 SSD 전체 매출(TrendForce 분기 합 약 $26B, 레포 qlc-essd-market-size-forecast)보다 크다**. 2025년 실제 GPU 주도 I/O 생산 배치는 공개 확인되지 않는다(NF-09, §2 SR-37). 따라서 이 수치는 **AI 워크로드용 스토리지 시스템(하드웨어+소프트웨어) 전반**의 규모이며 512B 고IOPS SSD의 시장 규모로 쓸 수 없다 | 2026-10-03 | SR-01~SR-05, 레포 [qlc-essd-market-size-forecast-data-2026-09.md](qlc-essd-market-size-forecast-data-2026-09.md) 핵심 ①, 위키 [current-state-rs3-customer-switching-cost.md](../../wiki/strategies/core/current-state-rs3-customer-switching-cost.md) §1 표·§2 기회(1) | ⚠️ 파생 (수치 일치는 확실, 보고서 원문 정의 문장은 미열람 SN-01) |
| SR-07 | 같은 수치가 레포 안에서 "SCADA" 라벨로 쓰인 위치(사실 기록만, 수정하지 않음): `wiki/strategies/core/current-state-rs3-customer-switching-cost.md`(15행, 49행), `wiki/strategies/invariant/rs3-customer-switching-cost.md`(25행), `wiki/scenarios/strategy.md`(304행), `outputs/presentation/scripts/generate_pptx.py`(1813행, "AI 스토리지 시장"으로 표기) | 2026-10-03 | 레포 grep | ✅ (레포 내부) |

### 1-B. 512B 고IOPS·GPU 주도 스토리지에 대한 애널리스트·벤더 정량 단서

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-08 | **JPMorgan**: AI 추론 확산과 KV 캐시 채택으로 **향후 3년 eSSD 탑재 용량이 900EB로 가속**, **2028년 AI NAND 전체 잠재시장(TAM) 약 700억 달러($70B)**. 512B 고IOPS 별도 수치는 요약에 없음 | 2026-01-26 | technews.tw https://technews.tw/2026/01/26/jp-morgan-see-2026-global-memory-market/ ; https://technews.tw/?p=1503820 (차단) | 🟡 (한 검색 요약은 "$700B"로 오기, 원문 제목은 "700億美元" = $70B) |
| SR-09 | ⭐ **Morgan Stanley** NAND 산업 전망(7월 2일자 보고서): AI 관련 NAND 수요 **205EB(2025) → 400EB(2026) → 609EB(2027)**, NAND 전체 대비 **18% → 32% → 41%**. "숨은 위험: **초고 IOPS 전용 AI SSD는 일반 제품 대비 NAND 웨이퍼를 3배 소모**하며, **2028년 대량 생산되면 공급을 더 조인다**" | 2026-07-02 (보고서), 재인용 게시 2026-07 | 鉅亨 https://hao.cnyes.com/post/258401 ; itiger https://www.itiger.com/news/1106378814 | 🟡 (2차 요약, 원문 미열람) |
| SR-10 | **TrendForce**: 2027 SSD 시장 약 **$379.4B(+40.2%)**, "**SLC/pSLC SSD**가 AI 추론·학습·에이전트 워크로드에 빠르게 침투하는 핵심 성장 동인". **SLC AI SSD 별도 규모 수치는 없음**. 대만 업계 요약은 "**고IOPS SSD 수요 증가가 공급 증가 속도를 늦춰 2026 하반기 공급 부족 심화**"라는 제목 | 2026-05-29 / 2026 | https://www.trendforce.com/presscenter/news/20260529-13068.html ; https://statementdog.com/industry_reports/44 | 🟡 |
| SR-11 | **Kioxia Investor Day**: Storage-Next를 "**2027년부터** GPU 자체의 메모리 영역으로 SSD를 확장하는 개념"으로 제시, GP Series를 "**1억 IOPS를 넘는** Super High IOPS SSD"로 소개, **FY2028까지 데이터센터·엔터프라이즈 매출 비중 60% 초과** 목표, 플래시 시장 **CY26E 약 $147B(+112%) → CY27E $200B+**. **Storage-Next 또는 Super High IOPS SSD의 TAM 수치는 요약에서 찾지 못함** | 2026-06-02 | https://www.kioxia-holdings.com/en-jp/news/2026/20260602-1.html (차단) ; 스크립트 PDF https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Kioxia_Investor_Day_2026_en_script.pdf (차단) ; 레포 D08 | 🟡 |
| SR-12 | **Marvell 블로그(Chander Chadha, 플래시 스토리지 제품 마케팅 디렉터)** "The Next Step for AI Storage: GPU-initiated and CPU-initiated Storage": 스케일업·스케일아웃 네트워크처럼 스토리지도 **GPU 주도형과 CPU 주도형으로 갈라진다**. GPU 지원 SSD는 추론용 **고IOPS 중심으로 CPU 연결 드라이브와 "근본적으로 다르다"**(CPU형은 지연·용량 중심). 규모 수치 없음 | 일자 미확인 | https://www.marvell.com/blogs/the-next-step-for-ai-storage-gpu-initiated-cpu-initiated-storage.html (차단) | 🟡 |
| SR-13 | 실적 발표 확인: **SK hynix 2Q26 콜(2026-07-28 전후)** 요약에서 AI-N P 언급 찾지 못함. **Micron FQ4'26(2026-09-30)** 요약: "**7600(Gen5)·9650(Gen6)이 선도 고객에게 KV-cache 용도로 출하 중**", Storage-Next·SCADA 언급은 요약에서 찾지 못함 | 2026-07-28 / 2026-09-30 | https://www.investing.com/news/transcripts/earnings-call-transcript-sk-hynix-posts-record-q2-2026-results-as-shares-fall-93CH-4818480 ; Micron 8-K 보도자료 https://www.sec.gov/Archives/edgar/data/0000723125/000072312526000018/a2026q4ex991-pressrelease.htm (차단) | 🟡 / 부재 확인은 SN-15 |
| SR-14 | **⚠️ 파생 (수요 정량화 현황)**: Gartner·IDC·Yole·Counterpoint·TrendForce 어디서도 **512B 고IOPS 또는 GPU 주도 SSD를 별도 시장으로 집계한 수치를 찾지 못했다**(SN-02). 공개된 정량 단서는 (i) Morgan Stanley의 "**웨이퍼 3배 소모, 2028 대량생산 시 공급 압박**"(SR-09), (ii) Kioxia의 "**2027년부터**"(SR-11), (iii) 벤더 설계 목표(GPU당 2억 IOPS, §2 SR-21·SR-23) 세 가지뿐이다. 즉 수요는 **GPU당 IOPS 목표 × GPU 출하량**이라는 구조로만 추정할 수 있고, 그 곱을 공표한 기관은 없다 | 2026-10-03 | SR-08~SR-13 | ⚠️ 파생 |

---

## §2. 성숙도 신호 (날짜순)

### 2-A. 목표·로드맵 신호

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-20 | GTC 2025에서 Jensen Huang이 "**스토리지의 재발명**"을 촉구(Storage-Next 첫 노출, GD-03과 같은 계열). 키노트에서 IOPS 수치 목표를 제시했다는 근거는 찾지 못함 | 2025-03-18 | VAST 커뮤니티 정리 https://community.vastdata.com/t/when-storage-talks-back-what-the-gtc-keynote-really-said-about-the-future-of-ai-infrastructure/1154 | 🟡 |
| SR-21 | ⭐ **Kioxia(Rory Bolt) FMS 2025 "High IOPS SSD for AI Applications"**: "새 AI 사용례는 **GPU당 SSD 2~4개, 개당 1억 또는 5천만 IOPS**"(= GPU당 약 2억 IOPS). 로드맵에 **XL-FLASH Gen3(PCIe 7.0) "50GB/s"** 표기. 같은 해 Kioxia는 **GPU 직결 SSD 에뮬레이션 1.43억 IOPS** 시연 | 2025-08-06 / 2025-08~10 | https://files.futurememorystorage.com/proceedings/2025/20250806_SSDT-201-1_Bolt-2025-08-04-15.59.14.pdf (차단) ; Kioxia FMS 2025 이벤트 보고 https://americas.kioxia.com/en-us/insights/fms25-202510.html | 🟡 (요약 일부에 "XL-FLASH Gen2(PCIe 6.0)로 1억"이라는 문장이 섞여 GP1 10M(SR-29)과 충돌, ⚠️) |
| SR-22 | Kioxia Bolt **SNIA SDC AI 2026 "AI Impact on Storage"**: "**PCIe Gen7 + 512B 최적화 SSD → GPU당 100 MIOPS 목표**", "포화에 SSD 4개" 취지(요약). 512B 랜덤 읽기 100 MIOPS는 **Gen7 XL-FLASH 고IOPS SSD** 목표치로 표기 | 2026-04 | https://www.snia.org/sites/default/files/2026-04/SNIA-SDCAI26-Bolt-AI-Impact-On-Storage_0.pdf (차단) | 🟡 (요약 문장 해석 불확실, ⚠️) |
| SR-23 | ⭐ **Smart IOPS T50 보강**(GD-26): **범용 TLC NAND를 pSLC 모드로 운용**(저지연 특수 NAND도 지원 가능), 용량 **9 / 18 / 36TB**, "T50 4개로 **2억 IOPS = NVIDIA Rubin 같은 PCIe Gen6 x16 GPU의 I/O 능력에 맞춤**" | 2026-08-06 | StorageReview https://www.storagereview.com/news/smart-iops-unobtanium-t50-50-million-iops-per-gen6-ssd-with-a-one-billion-iops-appliance-target | 🟡 (설계 목표) |
| SR-24 | StorageReview: "**NVIDIA Storage-Next 로드맵은 개당 1억 IOPS를 유지하는 PCIe Gen7 SSD를 요구하며, Marvell을 포함한 컨트롤러 업체들이 이를 목표로 설계 중**" | 2026-08 | https://www.storagereview.com/news/nvidia-scada-puts-storage-control-on-the-gpu-as-cufile-goes-open-source | 🟡 (NVIDIA 1차 문서 아님) |
| SR-25 | **Silicon Motion(Alex Chou)**: **PCIe Gen7 컨트롤러 개발이 이미 진행 중**, NVIDIA Storage-Next가 SSD 로드맵의 기준점이 되고 있다 | 2026 (일자 미확인) | igor'sLAB https://www.igorslab.de/en/silicon-motion-pcie-gen7-development-already-underway-nvidia-storage-next-driver-ssd-roadmaps/ | 🟡 |
| SR-26 | **Marvell Bravera SC6(MV-SF1410)**: PCIe 6.0, NVMe 2.2, **NAND 16채널 × 채널당 CE 8개, ONFI/Toggle 최대 3,600MT/s**, 코어 15개, **초기 샘플 2026년 4분기** | 2026 | Guru3D https://www.guru3d.com/story/marvell-bravera-sc6-pcie-60-ssd-controller-uses-16-nand-channels-and-15-cores/ ; Tom's Hardware https://www.tomshardware.com/tech-industry/the-current-state-of-pcie-6-0-ssds-and-controllers-marvell-phison-and-smi-prepare-controllers-as-drives-finally-come-to-market-following-years-of-delays | 🟡 |

### 2-B. 플랫폼·표준 신호

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-27 | **PCIe 7.0 사양 회원사 배포**: 128.0 GT/s, x16 양방향 최대 512 GB/s, PAM4, Flit 인코딩. PCIe 8.0 패스파인딩 진행. 검색 요약상 "**PCIe 7.0은 2027년 pre-FYI 시험 완료, 첫 통합사 목록(integrators list)은 2028년 예상**"(Kioxia 1억 IOPS 2028 순연 사유 GD-25와 같은 시계) | 2025-06-11 / 2027~2028(전망) | Business Wire https://www.businesswire.com/news/home/20250611299049/en ; igor'sLAB https://www.igorslab.de/pcie-7-0-offiziell-finalisiert-512-gb-s-bandbreite-zielen-klar-auf-die-ai-infrastruktur/ ; TechTimes(GD-25) | 🟡 (통합사 목록 연도는 출처 문장 미특정, ⚠️) |
| SR-28 | ⭐ **Linux 메인라인(7.3-rc5, HEAD `ff47652`, 2026-10-03)**: `include/uapi/linux/pci_regs.h`의 링크 속도 상수는 `PCI_EXP_LNKCAP2_SLS_64_0GB`("Supported Speed 64GT/s")까지이고 **128 GT/s 상수는 없다**. `include/linux/pci.h`의 `enum pci_bus_speed`도 `PCIE_SPEED_64_0GT = 0x19`가 최고 | 2026-10-03 | https://raw.githubusercontent.com/torvalds/linux/master/include/uapi/linux/pci_regs.h ; https://raw.githubusercontent.com/torvalds/linux/master/include/linux/pci.h | ✅ (부재가 하드웨어 미존재를 뜻하지는 않음, ⚠️ 해석 주의) |
| SR-29 | **Kioxia GP1 보강**(H-04·GD-25): PCIe 6.0·NVMe 2.2, XL-FLASH Gen2, 512B 랜덤 읽기 10M, 최대 50 DWPD, E3.S·E1.S 9.5/15mm, **E3.S·E1.S 9.5mm는 콜드플레이트 액체냉각 가능**, 평가 샘플 **2026년 말**. **용량·지연·지속 처리량·전력·가격·컨트롤러 세부는 미공개** | 2026-08-04 | StorageReview https://www.storagereview.com/news/kioxia-gp1-series-hits-10-million-random-read-iops-on-xl-flash-gen-2 ; letsdatascience https://letsdatascience.com/news/kioxia-announces-gp1-ssd-with-up-to-10-million-random-read-i-4a5f1057 ; Kioxia Europe PR https://europe.kioxia.com/de-de/business/news/2026/20260804-2.html | 🟡 |
| SR-30 | **SK hynix AI-N P 원 발표 문구**(OCP 2025 계열, Blocks & Files 요약): "PoC 샘플은 **E3 폼팩터로 내년 말까지**, 그리고 **Gen6 위 1억 IOPS**, 양산 가능 제품은 **2027년 말**". 다른 요약은 "**1세대 Gen6 25M 샘플 2026 말, 2027 말 1억**". 국내: SK하이닉스 김천성 부사장 "2027년 말 1억 IOPS 지원 제품 가능"(2025-12-10). **2026년 진척 공개는 찾지 못함** | 2025-10-28 / 2025-12-10 | https://blocksandfiles.com/2025/10/28/sk-hynix-aims-for-ai-flash-glory-with-ain-trifecta/ ; 한경 https://www.hankyung.com/article/202512105960i | 🟡 / ⚠️ ("Gen6 위 1억"은 x4 링크 산술과 충돌, §4-D) |
| SR-31 | **Micron GTC 2026 블로그** "From Breakthrough Demo to Deployment Path: SCADA on Production-Grade PCIe Gen6 Hardware": SC'25 시연(GD-29)의 **Gen6 하드웨어(9650, Broadcom PEX90000, H3 Falcon 6048) 전부가 양산 출하·상용 구매 가능**, "고객이 상용 부품으로 SCADA 머신을 직접 구성 가능". 단 "**SCADA 서버는 아직 보급되지 않았고** Wiwynn이 처음 전시한 서버 업체 중 하나"(Tom's Hardware 서술) | 2026-03-16 / 2026-06 | https://www.micron.com/about/blog/storage/ssd/from-breakthrough-demo-to-deployment-path-scada-on-production-grade-pcie-gen6-hardware-at-nvidia-gtc-2026 (차단) ; Tom's Hardware(GD-28 URL) | 🟡 |
| SR-32 | **Sandisk HBF**: 2026 Investor Day에서 **첫 HBF 메모리 다이 테이프아웃** 공개, **추론용 HBF 제품 샘플 2027 목표**. SK hynix와 HBF 개방 사양: **8단·16단 NAND 스택, 최대 512GB, 성능 등급 약 0.4~3 TB/s**, UCIe. **Sandisk의 Storage-Next(512B NVMe) 입장은 찾지 못함** | 2026-08-13 / 2026-08 | https://www.storagereview.com/news/sandisk-tapes-out-its-first-hbf-memory-die-targets-2027-for-inference-product-samples ; https://www.guru3d.com/story/sk-hynix-and-sandisk-hbf-standard-reaches-512gb-and-3tb-s-through-ucie/ | 🟡 |
| SR-33 | **NVIDIA BlueField-4 STX**(GTC 2026): 저장소 최적화 BlueField-4 DPU + ConnectX-9 기반 **모듈형 스토리지 참조 아키텍처**, 호스트 CPU를 우회해 **Spectrum-X 이더넷 RDMA**로 KV 캐시 등 컨텍스트 메모리 제공, 최대 5배 토큰 처리량. **초기 채택: CoreWeave, Crusoe, IREN, Lambda, Mistral AI, Nebius, OCI, Vultr**. ⚠️ 구분: 이것은 **DPU·네트워크 경유 경로**이며 GPU가 NVMe 512B를 직접 발행하는 SCADA 로컬 경로와 다르다 | 2026-03-16 | NVIDIA IR https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-BlueField-4-STX-Storage-Architecture-With-Broad-Industry-Adoption/default.aspx ; Tom's Hardware https://tomshardware.com/tech-industry/nvidia-launches-bluefield-4-stx-storage-architecture-for-agentic-ai | 🟡 |
| SR-34 | **cuObject server v1.0.0 릴리스 노트 일자 2026-01-12(CUDA 13.1.1)**, 별도 다운로드 패키지(검색 요약). GD-08의 "cuObject GA(2026-09-30 블로그)"와 **시점 표기가 다르다** | 2026-01-12 | https://docs.nvidia.com/gpudirect-storage/cuobject/cuobject-server-release-notes/index.html (차단) | 🟡 / ⚠️ 충돌 |
| SR-35 | ⭐ **NVMe TPAR 4217 "LBA Range Access Control"**(NVIDIA Chaitanya Kulkarni, SNIA SDC AI 2026): GPU 직결 접근은 OS 보안 통제를 우회하는데 **현행 NVMe Persistent Reservation은 네임스페이스 단위**라 등록된 클라이언트가 어느 블록에나 쓸 수 있다. 제안: **한 네임스페이스 안에서 LBA 범위별 하드웨어 강제 쓰기 보호**, MB~TB 범위, **µs급 acquire/release**(GPU 작업 선점 대응) | 2026-04 | https://www.snia.org/sites/default/files/2026-04/SNIA-SDCAI26-Kulkarni-NVMe-LBA-Access-Control.pdf (차단) | 🟡 (TPAR 단계 = 표준 미완) |
| SR-36 | **HotStorage 2026 포스터 "Towards 100 Million IOPS for GPU-initiated I/O"**: GPU에서 직접 도는 NVMe-SSD 에뮬레이터로 GPU 파일시스템 오버헤드를 조사, "**NVMe SQ/CQ는 큐를 하나씩 소유하는 소수 CPU 코어용으로 설계돼, 수천 GPU 스레드가 큐를 공유하면 병목**"이라 주장하고 **요청별 완료 플래그, 일괄(벡터) 제출, 완료 대기 하드웨어 프리미티브** 등 NVMe 확장 제안. 본 논문은 불채택, 포스터 초청 | 2026-07 | HotStorage 운영위 메일링 https://lists.fsl.cs.sunysb.edu/pipermail/hotstorage-chairs/2026-July/000215.html | 🟡 |
| SR-37 | ✅ **xio-sig 재확인**: `xio-sig/.github` HEAD `9bdf34a`로 GD-06 시점과 **동일**, 열거된 7개 저장소(`cuFileAPI`, `cuFileConformance`, `libxFile`, `xFileLinux`, `cuObjectClientAPI`, `cuObjectWireProtocol`, `cuObjectConformance`)는 여전히 익명 `git ls-remote`에 인증 요구. 즉 GD-07의 "코드 미공개" 상태가 **2026-10-03에도 유지**. **SCADA 클라이언트 SDK의 GA·공개 다운로드, 하이퍼스케일러·네오클라우드 SCADA 프로덕션 배치는 찾지 못함**(SN-04·SN-05) | 2026-10-03 | `git ls-remote https://github.com/xio-sig/{.github,cuFileAPI,...}` | ✅ (접근 결과) / 부재 🟡 |
| SR-38 | 연구 생태계: **SwarmIO 저자 = Hyeseong Kim, Gwangoo Yeo, Minsoo Rhu(KAIST)**, "Towards 100 Million IOPS SSD Emulation for Next-generation GPU-centric Storage Systems", 최대 40 MIOPS 모사(선행 NF-14 해소). **GNStor**(arXiv 2606.04908, 2026-06-03): GPU 네이티브 원격 AFA, GPU 중심 NVMe-over-RDMA(GNoR), 처리량 최대 3.2배. **HBFSim**(arXiv 2609.09800): HBF를 실제 GPU 실행 아래 시뮬레이션 | 2026-04 ~ 2026-09 | https://arxiv.org/abs/2604.06668 ; https://arxiv.org/pdf/2606.04908 ; https://arxiv.org/pdf/2609.09800 (모두 차단, 검색 요약) | 🟡 |
| SR-39 | **NVIDIA의 GPU당 IOPS 공식 사양**: NVIDIA 1차 문서에서 "GPU당 X IOPS"를 공표한 문장은 찾지 못함. 확보한 것은 파트너 진술(GPU당 2억: SR-21·SR-23, Gen7 SSD 개당 1억: SR-24)과 Newburn 발표의 "Gen6 ↔ 200 MIOPs @512B"(GD-11). Vera Rubin 측 확인 사항: Rubin Ultra **GPU당 HBM4E 1TB, 2027**(GTC 2026 Kyber 시연) | 2026-03 | 3DTested https://www.3dtested.com/tech-industry/semiconductors/nvidia-enterprise-roadmap-rubin-rubin-ultra-feynman-and-silicon-photonics | 🟡 / SN-03 |

### 2-C. ⭐ 성숙도 요약 (사실 배열, 판단 아님)

| 층위 | 2026-10-03 상태 | 근거 ID |
|---|---|---|
| 목표 정의 | GPU당 약 2억 IOPS @512B(파트너 진술), 드라이브당 1억(Gen7) | SR-21·SR-23·SR-24, GD-03 |
| SW 인터페이스 | cuFile 오픈소스 "발표", 코드 비공개 / cuObject 릴리스 / SCADA Server SDK 발표 / SCADA 클라이언트 GA 미확인 | SR-34·SR-37, GD-06·GD-08 |
| NVMe 표준 | GPU 직결 보안(TPAR 4217) 진행 중, 큐 구조 확장은 연구 제안 단계 | SR-35·SR-36 |
| PCIe·OS | Gen6 양산(9650, PM1763), Gen7 사양 2025-06, 통합사 목록 2028 전망, Linux 메인라인 128GT/s 상수 없음 | SR-27·SR-28·SR-31 |
| 컨트롤러 | 16ch Gen6 컨트롤러 샘플 2026-Q4(Marvell), Gen7 개발 착수(SMI), 50M 설계 목표(T50) | SR-23·SR-25·SR-26 |
| 전용 매체 SSD | GP1 10M 샘플 2026 말, Kioxia 1억 2028, SK AI-N P 2026 진척 미공개, Samsung 미공개(NF-03) | SR-29·SR-30, GD-25 |
| 시스템 시연 | TLC 다수 드라이브로 1억~2.8억(서버 합산) | GD-20·GD-27·GD-29 |
| 프로덕션 배치 | 공개 확인 없음 | SR-37, NF-09 |

---

## §3. 기술 제약: 공개 수치 (기술 심의용)

### 3-A. NAND 읽기 지연(tR)·플레인

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-50 | **ISSCC 2021 3D TLC 발표 tR**: Samsung 128L **40µs**, SK hynix 176L **45µs**, Kioxia·WD 162L **50µs** | 2021-02-19 | AnandTech https://www.anandtech.com/show/16491 | 🟡 |
| SR-51 | Samsung 6세대 V-NAND(136단 단일 스택, 512Gb TLC): **읽기 45µs 미만, 쓰기 450µs 미만** | 2019-08-06 | Samsung 뉴스룸 https://news.samsung.com/global/samsung-electronics-takes-3d-memory-to-new-heights-with-sixth-generation-v-nand-ssds-for-client-computing | 🟡 |
| SR-52 | 공개 데이터시트 예(Frontgrade UT81NDQ512G8T, 4Tb TLC 패키지): **SNAP READ 51µs(typ)**, 단일 플레인 페이지 읽기 **74/73µs**, 다중 플레인 페이지 읽기 **88µs**. ⚠️ 해석: 부분(소용량) 읽기 명령이 전체 페이지 읽기보다 짧다 | 일자 미확인 | https://frontgrade.com/sites/default/files/documents/Datasheet-UT81NDQ512G8T.pdf (차단) | 🟡 |
| SR-53 | ✅ **NVMeVirt(SNU, 에뮬레이터 보정값)** `ssd_config.h`: Samsung 970 PRO 모델 **NAND 읽기 36.0µs(±6µs)**, 8채널×LUN 2, 채널 800MB/s; ZNS 시제품(TLC) **4KB 읽기 25.5µs vs 전체 페이지 40.95µs**, 8채널×LUN 16, 페이지 64KB, 채널 800MB/s; WD ZN540(TLC) **4KB 50µs vs 페이지 58µs**, 채널 450MB/s. 모두 `LBA_BITS 9`(512B LBA) | HEAD `61c90f7` | https://raw.githubusercontent.com/snu-csl/nvmevirt/main/ssd_config.h | ✅ (벤더 사양 아님, 연구용 보정값) |
| SR-54 | Kioxia **XL-FLASH**: tR **5µs 미만**, 페이지 4KB, **16 플레인**, 다이 SLC 128Gb/MLC 256Gb(GR-01과 동일 확인). Tom's Hardware 산술: Innogrit Tacoma 기반 400GB(다이 32개) 3.5M IOPS → **다이당 약 10.9만 IOPS**(GR-03 계열) | 2019~2025 | https://kioxia.com/en-jp/business/memory/xlflash.html (차단) ; TechRadar https://www.techradar.com/pro/security/towards-the-giga-iops-pipedream-how-nvidia-wants-to-reach-100-million-iops-even-if-it-means-inventing-totally-new-types-of-memory | 🟡 |
| SR-55 | Samsung **Z-NAND 1세대**: 48단 SLC, **tR 3µs**, 페이지 2KB/4KB, 다이 64Gb. SZ985의 지속 랜덤 읽기 지연 **12~20µs**(시스템 수준) | 2018~2019 | AnandTech https://www.anandtech.com/show/13951/the-samsung-983-zet-znand-ssd-review/2 | 🟡 |
| SR-56 | 플레인 수: Micron 232L **세계 첫 6-plane TLC, 플레인별 독립 읽기**(4→6), ONFI 2.4GB/s(2022-07); Micron G9 276L **6-plane, 3.6GB/s**(2024-07); SK hynix 321L 2Tb QLC **4→6 플레인**, 읽기 +18%(2025-08); Kioxia BiCS8 218L **4-plane**(2023~2024); BiCS10 332L **6-plane(1×6)**(ISSCC 2026, 레포 semianalysis). Samsung V9·V10 플레인 수는 확보 못함(SN-09) | 2022~2026 | AnandTech https://www.anandtech.com/show/17509 ; Guru3D https://www.guru3d.com/story/micron-announces-volume-production-of-ninthgeneration-nand-flash-technology/ ; TrendForce https://www.trendforce.com/news/2025/08/25/news-sk-hynix-unveils-worlds-first-321-layer-qlc-nand-targets-1h26-commercial-launch/ ; AnandTech https://anandtech.com/show/21519 ; 레포 [semianalysis-isscc-2026-2026-04-15.md](semianalysis-isscc-2026-2026-04-15.md) | 🟡 |
| SR-57 | 부분 페이지 읽기: 특허 US11216189("다중 플레인에서 페이지 일부 데이터 읽기")는 **4KB 읽기에 단일 플레인 snap read**, 페이지보다 짧은 4KB·8KB를 여러 플레인에서 읽는 **MPR-Lite**를 기술. 검색 요약상 TLC 하위 페이지 **fast read 36µs vs normal 40µs** 예시 | 특허 공개일 미확인 | https://patents.justia.com/patent/11216189 ; https://patents.justia.com/patent/20100287329 | 🟡 |

### 3-B. NAND 인터페이스·채널·명령 오버헤드

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-58 | **JEDEC JESD230G**: NAND 인터페이스 **최대 4,800 MT/s**(2011 초판 400 MT/s), **SCA(Separate Command/Address) 버스 프로토콜** 추가 | 2024-11-18 | JEDEC https://www.jedec.org/node/9465 ; Business Wire https://www.businesswire.com/news/home/20241118637716/en/ | 🟡 |
| SR-59 | 다이 I/O 속도: Samsung V9 **Toggle 5.1 3.2Gbps**(2024-04 양산), Samsung V10 **5.6Gb/s/pin**(ISSCC 2025, 4XX단 1Tb TLC, 28Gb/mm²), Kioxia BiCS10 **Toggle DDR6.0 4.8Gb/s**(ISSCC 2025 논문 30.2), Micron G9 **3.6GB/s**. 컨트롤러 측은 Marvell SC6 **3,600MT/s**(SR-26) | 2024~2025 | AnandTech https://www.anandtech.com/show/21365 ; Tom's Hardware https://tomshardware.com/pc-components/ssds/samsung-prepares-to-unveil-10th-generation-v-nand-with-400-layers-ready-to-power-future-pcie-5-0-and-6-0-ssds ; Kioxia https://www.kioxia.com/en-jp/rd/technology/topics/topics-83.html ; Guru3D(SR-56) | 🟡 |
| SR-60 | ⭐ **채널 점유 모델(5분 규칙 재검토 논문)**: 블록 크기 l을 읽을 때 채널 점유 시간 **τ_R = τ_CMD + l / B_CH**, 채널당 최대 읽기 IOPS = **1/τ_R**. **τ_CMD**(명령당 버스 점유)는 **8비트 공유 명령/데이터 버스에서 약 1.2µs**, **SCA I/O 프로토콜로 100~200ns**. 모델 결과(WA 3 가정) **피크 SSD IOPS 약 57M @512B, 11M @4KB**. 저자: Tong Zhang(ScaleFlux), **Vikram Sharma Mailthody, Chris J. Newburn, Wen-Mei Hwu(NVIDIA)** 등. MQSim-Next 동반 | 2025-11 (v1), v2 개정 | https://arxiv.org/abs/2511.03944 ; https://arxiv.org/html/2511.03944v2 (차단) | 🟡 (GW-06과 같은 논문, 이해관계자 공저 CE-12) |
| SR-61 | ✅ 참고 기준선: MQSim 기본 설정(2018 FAST 계열) 채널 8, 채널 폭 1, **전송률 333MT/s**, 칩/채널 4, 다이/칩 2, **플레인/다이 2**, 페이지 8KB, **읽기 75µs**, 프로그램 750µs | HEAD `51f0f2d` | https://raw.githubusercontent.com/CMU-SAFARI/MQSim/master/ssdconfig.xml | ✅ (오래된 기본값, 비교용) |

### 3-C. ECC(LDPC)·부분 읽기·FTL

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-62 | LDPC 코드워드 크기 공개 사례: **Silicon Motion SM2264(PCIe 4.0 엔터프라이즈/클라이언트) "4KB LDPC 엔진"**(NANDXtend 7세대); **InnoGrit IG5236 "4K-page LDPC"**(기존 더 작은 코드워드 대비 내구성 개선 주장); FMS 2012(Miladinovic): LDPC 매크로 **0.5KB / 1KB / 2KB** 선택지; FMS 2014(Motwani): **1KB LDPC** 엔터프라이즈 시뮬레이션. 레포 F33: TLC LDPC **1KB당 최대 120비트** 정정. **Samsung·Micron·Kioxia·SK hynix 엔터프라이즈 컨트롤러의 코드워드 크기는 공개 확인 못함**(SN-10) | 2012~2021 | Guru3D https://www.guru3d.com/news-story/silicon-motion-launches-pcie-4-nvme-1-4-controller-reaching-7400-mbs.html ; AnandTech https://anandtech.com/show/15417 ; https://old.flashmemorysummit.com/English/Collaterals/Proceedings/2012/20120823_S302C_Miladinovic.pdf ; https://old.flashmemorysummit.com/English/Collaterals/Proceedings/2014/20140806_E22_Motwani.pdf ; 레포 F33 | 🟡 |
| SR-63 | FTL 매핑 단위 추세: SPDK FTL L2P **4B/LBA(<16TiB), 8B/LBA(≥16TiB)**(레포 MM-21 ✅); Micron 6600 ION **245.76TB는 16K IU, 30.72TB는 4K IU**(레포 P-06). ⚠️ 관찰: 대용량 드라이브는 **IU를 키우는 방향**이고, 512B 랜덤 접근은 **반대 방향**의 요구다 | 2025~2026 | 레포 MM-21·P-06 | ✅/🟡 |

### 3-D. NVMe·PCIe 프로토콜 오버헤드

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| SR-64 | ✅ **NVMe 명령·완료 크기(Linux 원문)**: `drivers/nvme/host/core.c` `_nvme_check_size()`에 `BUILD_BUG_ON(sizeof(struct nvme_command) != 64)`, `nvme_rw_command`도 64B. `include/linux/nvme.h`의 `struct nvme_completion` = result(union, 최대 8B) + sq_head 2B + sq_id 2B + command_id 2B + status 2B = **16B**. 즉 512B 읽기 1건마다 **SQE 64B + CQE 16B**(+ SQ tail·CQ head 도어벨 쓰기) | 2026-10-03 (7.3-rc5) | https://raw.githubusercontent.com/torvalds/linux/master/drivers/nvme/host/core.c ; https://raw.githubusercontent.com/torvalds/linux/master/include/linux/nvme.h | ✅ |
| SR-65 | PCIe TLP 오버헤드(비-Flit, Gen1~5): 시작/끝·STP 프레이밍 + 시퀀스 번호 2B + 헤더 **12B(32비트 주소) 또는 16B(64비트)** + 선택적 ECRC 4B + LCRC 4B → **TLP당 20~28B**. MPS 256B·오버헤드 28B면 최대 효율 256/284 = 90%. Gen3~5는 **128b/130b** 부호화 | 문서별 | Xilinx WP350 https://www.scribd.com/doc/235719034/wp350 ; Intel AN 456 https://intel.com/content/www/us/en/docs/programmable/683541/current/protocol-overhead.html ; billauer https://billauer.co.il/blog/?p=1119 | 🟡 |
| SR-66 | **PCIe 6.0 Flit**: 256B = **TLP 236B + DLP 6B + CRC 8B + FEC 6B**. 프레이밍 토큰·TLP별 LCRC·128b/130b 불필요 → **소형 패킷 효율 향상**. Flit 지연 x4 기준 8ns | 2021~2022 | SNIA SDC22 DasSharma https://snia.org/sites/default/files/SDC/2022/SNIA-SDC22-DasSharma-PCIe%206.0-Specification-and-Beyond-Enabling-Storage.pdf ; Synopsys https://www.synopsys.com/articles/pcie-6-designs.html | 🟡 |
| SR-67 | ✅ **aisio 실측 상세(Gen5 x16, H100 PCIe, CPU 1스레드, NVMe 4개)**: **512B에서 페이로드 7.9 GB/s vs GPU 측 PCIe 수신 10.1 GB/s = 라인레이트(64.0 GB/s)의 약 16%** → "링크가 아니라 NVMe 명령 처리량이 제약". 4KB·8KB에서는 약 **57.8 GB/s(약 90%)**로 링크 포화. 총 수신/페이로드 비 **약 1.28**이 IOPS 영역·대역폭 영역 모두에서 일정 → "**초과분은 연산 횟수가 아니라 전송 바이트에 비례**". GPU 주도(16개, nqueues=1): 512B에서 2048 스레드로도 **21.6 GB/s**, 실용 상한 **44~45 GB/s**(nvbandwidth 53.7 GB/s의 약 84%) | 2026-04 확정 문서, HEAD `7311ed0` | https://github.com/xnvme/aisio `docs/src/experiments/pcie_saturation.md`·`device_initiated_iosize.md` | ✅ (GR-10 보강) |
| SR-68 | ✅ **GPU 측 비용(aisio)**: 장치 주도 폴링 커널은 **큐 1개 × 장치 1개당 SM 1개**를 점유. H100 PCIe(**SM 114개**)에서 16개 장치 기준 nqueues=1 **13.3%**, nqueues=2 **26.8%**, nqueues=4 **53.2%** SM 점유, nqueues=8부터 약 96%. 6,170만 IOPS 상한을 내는 nqueues=2·qdepth=128 구성은 "**SM의 26.8%, 워프 슬롯의 1.74%**"를 차지하며 "**소진이 아니라 존재로 간섭**"(공존 커널은 워프 슬롯은 받을 수 있음) | 같음 | `device_initiated_qdepth.md` | ✅ |

### 3-E. 컨트롤러·드라이브 IOPS·전력 공개치

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| SR-69 | 공개 IOPS 기준점(블록 크기 명기): 범용 Gen6 컨트롤러 SM8466 **7M**(블록 미확인, GD-32), TLC Gen6 GPU 발행 실측 **5.2~6.92M @512B**(GR-05), Kioxia GP1 **10M @512B**(SR-29), Smart IOPS T50 **50M @512B 읽기 / 10M 쓰기**(설계 목표, pSLC, SR-23), Kioxia Gen7 XL-FLASH **100M @512B**(2028, GD-25). XL-FLASH 전력(TechRadar 서술): **50M IOPS 약 35W, 100M IOPS 약 60W** | GD-25·GD-26·GD-32, GR-05, SR-23·SR-29, TechRadar(SR-54 URL) | 🟡 / ⚠️(전력은 단일 출처) |
| SR-70 | 큐 요구: BaM 예시 **128큐 × 깊이 1024**(GR-21), aisio **장치당 큐 2개 이상, 4개 초과는 이득 없음**(GR-20), 큐 1개는 깊이와 무관하게 상한 미도달 | GR-20·GR-21 | ✅ |

---

## §4. ⚠️ 파생 산술 (가정·산식 명기, 모두 본 원장 계산)

### 4-A. 가정

| 기호 | 가정값 | 근거 |
|---|---|---|
| A1 TLC 다이 | 1Tb = **128GB** | SR-59(1Tb TLC 세대), SR-56 |
| A2 pSLC 다이 | TLC 다이의 1/3 = **42.7GB** | 비트/셀 비(레포 C-15는 실제 제품 전환비가 더 불리하다고 기록) |
| A3 XL-FLASH 다이 | SLC **128Gb = 16GB**(1세대) | SR-54. Gen2·Gen3 다이 용량 미공개(SN-11) |
| A4 다이 수 | 다이 수 = 사용자 용량 ÷ 다이 용량(OP 무시, 실제는 더 많음) | 단순화 |
| A5 플레인 | TLC **4 또는 6**, pSLC 동일, XL-FLASH **16**, **플레인별 독립 랜덤 읽기 가능**(최선 가정) | SR-56, SR-54 |
| A6 tR | TLC **40~50µs**, pSLC **20µs(가정, 공개 데이터시트 값 미확보 SN-08)**, XL-FLASH **3~5µs** | SR-50·SR-51·SR-54 |
| A7 채널 | **16채널**, **3.6 GB/s(3,600MT/s×8비트)** 또는 **4.8 GB/s**, τ_CMD **1.2µs(레거시) 또는 0.15µs(SCA)** | SR-26·SR-58·SR-60 |
| A8 전송량 | 512B 읽기 1건당 채널 전송 = **코드워드 크기(4KB/2KB/1KB/512B)**, 패리티 미포함(실제는 약 10% 더 큼) | SR-62, GR-25 |
| A9 PCIe | MPS 256B, 비-Flit TLP 오버헤드 24B(64비트 주소, ECRC 없음), Flit 모드 TLP 헤더 16B·TLP 효율 236/256, 1 IO당: 데이터 쓰기 TLP 2개 + CQE 쓰기 TLP 1개 + SQE 읽기 요청 TLP 1개(장치→호스트 방향) | SR-64~SR-66 |

### 4-B. (a) 매체 상한 = 다이 수 × 플레인 × (1/tR)

산식: **IOPS_media = (C ÷ D_die) × P × (1 ÷ tR)**

| 드라이브 | 매체 | 다이 수 | 플레인·tR | 매체 상한 | 플레인 병렬 없이(다이만) |
|---|---|---|---|---|---|
| 2TB | TLC | 15.6 | 4 · 50µs / 6 · 40µs | **1.25M ~ 2.34M** | 0.31~0.39M |
| 2TB | pSLC | 46.9 | 4 · 20µs / 6 · 20µs | **9.4M ~ 14.1M** | 2.3M |
| 2TB | XL-FLASH | 125 | 16 · 5µs / 16 · 3µs | **400M ~ 667M** | 25~42M |
| 16TB | TLC | 125 | 4 · 50µs / 6 · 40µs | **10.0M ~ 18.8M** | 2.5~3.1M |
| 16TB | pSLC | 375 | 4 · 20µs / 6 · 20µs | **75M ~ 113M** | 18.8M |
| 16TB | XL-FLASH | 1,000 | 16 · 5µs / 16 · 3µs | **3.2B ~ 5.3B** | 200~333M |

**1억 IOPS에 필요한 다이 수(매체만)**: TLC(4·50µs, 다이당 8만) **1,250개 = 160TB**, TLC(6·40µs, 15만) 667개 = 85TB, pSLC(4·20µs, 20만) 500개 = pSLC 21TB(TLC 원 비트 64TB), XL-FLASH(16·5µs, 320만) **31개**.
**검산**: XL-FLASH 실측 다이당 약 10.9만 IOPS(SR-54)는 매체 상한 320만의 약 3%로, **XL-FLASH 드라이브는 매체가 아닌 다른 곳에서 막힌다**. 16TB TLC 매체 상한 10~19M 대비 PM1763 실측 6.92M(GD-20)은 약 37~69%.

### 4-C. (b) NAND 채널 상한 = 채널 수 ÷ (τ_CMD + 전송량 ÷ B_CH)

산식: **IOPS_ch = N_ch ÷ (τ_CMD + L_cw ÷ B_CH)** (SR-60 모델, N_ch = 16)

| B_CH | τ_CMD | 4KB 코드워드 | 2KB | 1KB | 512B |
|---|---|---|---|---|---|
| 3.6 GB/s | 1.2µs | 6.8M | 9.0M | 10.8M | 11.9M |
| 3.6 GB/s | 0.15µs(SCA) | **12.4M** | 22.3M | **36.8M** | **54.8M** |
| 4.8 GB/s | 1.2µs | 7.8M | 9.8M | 11.3M | 12.2M |
| 4.8 GB/s | 0.15µs(SCA) | 15.9M | 27.7M | **44.0M** | **62.3M** |

**1억 IOPS에 필요한 채널 수**(4.8 GB/s, SCA): 4KB 코드워드 **100채널**, 2KB 58, 1KB **36**, 512B **26**. 레거시 τ_CMD(1.2µs)에서는 512B라도 131채널.
**관찰**: τ_CMD 1.2µs에서는 코드워드를 줄여도 채널당 약 0.7M에 묶인다(명령 오버헤드 지배). SCA가 있어야 코드워드 축소의 효과가 나타난다.

### 4-D. (c) PCIe 상한 @512B (장치→호스트 방향)

산식: **IOPS_pcie = 링크 TLP 가용 대역 ÷ IO당 바이트**
- 비-Flit(Gen5): IO당 = 데이터 2×(256+24) + CQE(16+24) + SQE 요청 24 = **624B** (페이로드 대비 1.22배, aisio 실측 1.28과 근접)
- Flit(Gen6·7): 가용 = 원시 × 236/256, IO당 = 2×(256+16) + (16+16) + 16 = **592B**
- 개선형(MPS 512B, CQE 4개 묶음, SQE 8개 일괄 읽기 가정): IO당 약 550B
- 호스트→장치 방향(SQE 완료 64B·도어벨)은 IO당 약 96~112B로 아래 모든 경우 상한이 3배 이상 높아 **비구속**

| 링크 | 원시(방향당) | 기본 산식 | aisio 1.28 비 적용(원시 ÷ 655B) | 개선형 | 페이로드만 |
|---|---|---|---|---|---|
| Gen5 x4 | 15.75 GB/s | **25.2M** | 24.0M | 28.1M | 30.8M |
| Gen6 x4 | 32 GB/s | **49.8M** | 48.8M | 53.6M | 62.5M |
| Gen7 x4 | 64 GB/s | **99.7M** | 97.7M | 107.3M | 125M |
| Gen6 x16 (GPU) | 128 GB/s | **199M** | 195M | 215M | 250M |
| Gen7 x16 (GPU) | 256 GB/s | 399M | 391M | 429M | 500M |

**공개 수치와의 정합 검산**(우연 일치 가능성 있음, 인과 주장 아님):
- Smart IOPS T50 **Gen6 x4 50M**(GD-26) ≈ Gen6 x4 상한 49.8M.
- Kioxia **1억 IOPS를 PCIe 7.0에 맞춤**(GD-25) ≈ Gen7 x4 상한 99.7M(여유 없음, 개선형이어야 107M).
- Newburn "**Gen6 ↔ 200 MIOPs @512B**"(GD-11)과 T50 "4개 = 2억 = Rubin급 Gen6 x16"(SR-23) ≈ **Gen6 x16 상한 199M** → GD-11의 단위 모호성은 **GPU x16 링크 기준**으로 읽으면 산술과 정합.
- Kioxia XL-FLASH Gen3 "50GB/s"(SR-21) ≈ 1억 × 512B = 51.2 GB/s.
- **충돌**: SK hynix "Gen6 위 1억 IOPS"(SR-30)는 페이로드만으로 51.2 GB/s라 **Gen6 x4(원시 32 GB/s)를 넘는다** → x8 이상 링크이거나, 시스템 합산이거나, 보도 오류 중 하나여야 한다(어느 쪽인지 미확인).

### 4-E. (d) 어느 상한이 먼저 걸리는가

조건: 16채널, SCA(0.15µs), 4KB 코드워드는 3.6 GB/s, 축소 코드워드는 4.8 GB/s 기준. 컨트롤러 명령 처리 한계는 공개치가 없어 별도 열로 표시.

| 시나리오 | 매체 | 채널 | PCIe x4 | 먼저 걸리는 것 | 공개 대조 |
|---|---|---|---|---|---|
| 2TB TLC | 1.3~2.3M | 12.4M(4KB) | 49.8M(Gen6) | **매체** | 해당 공개 제품 없음 |
| 16TB TLC | 10~19M | 12.4M(4KB) | 49.8M | **매체 ≈ 채널 ≈ 범용 컨트롤러(7M)** | PM1763 6.92M, 9650 약 5.2M |
| 2TB pSLC | 9.4~14.1M | 12.4M(4KB) / 44M(1KB) | 49.8M | **매체 ≈ 채널(4KB)** | 해당 공개 제품 없음 |
| 16TB pSLC | 75~113M | 12.4M(4KB) / 44M(1KB) / 62M(512B) | 49.8M(Gen6) / 99.7M(Gen7) | **채널(코드워드 ≥1KB)**, 512B면 **PCIe** | T50 50M(9~36TB pSLC) |
| 2TB XL-FLASH | 400M+ | 12.4M(4KB) | 49.8M | **채널(4KB 전송)** | GP1 10M(Gen2) |
| XL-FLASH 1억 목표 | 400M+ | 100M에 26~36채널(512B~1KB, 4.8 GB/s) 필요 | 99.7M(Gen7) | **채널 설계 + Gen7 링크 동시** | Kioxia 2028 |

**⚠️ 파생 결론(사실 정리)**:
1. **TLC**: 다이 수 × 플레인 ÷ tR가 먼저 걸린다. IOPS가 **용량(다이 수)에 비례**하므로 소용량 TLC는 512B 고IOPS를 낼 수 없고, 다이 용량이 커질수록(1Tb → 2Tb) TB당 IOPS는 줄어든다.
2. **SLC·pSLC·XL-FLASH**: 매체 여유가 크므로 **NAND 채널 전송(코드워드 크기 × 채널 수 × 인터페이스 속도, 명령 오버헤드)**이 먼저 걸린다. 4KB 코드워드·16채널·3.6 GB/s의 상한 12.4M은 GP1 10M과 같은 대역이다.
3. 코드워드(또는 채널 전송 단위)를 512B~1KB로 줄이고 SCA·4.8 GB/s·16채널 이상을 갖추면 다음 상한은 **PCIe x4 링크**다: **Gen6 약 50M, Gen7 약 100M**. 즉 **드라이브 1개 1억 IOPS는 Gen7 x4를 거의 100% 써야** 하고 Gen7 통합 일정(2028, SR-27)에 묶인다.
4. 그 다음은 **컨트롤러 명령 처리율**(1억 IOPS = 명령당 10ns)과 **GPU 측 SM 점유**(SR-68)이며, 둘 다 공개 수치가 부족하다.

### 4-F. 매핑·쓰기·동시성·NAND 비트 소모

| ID | 산식 | 결과 | 비고 |
|---|---|---|---|
| SR-71 | L2P = 용량 ÷ IU × 엔트리 | 16TB: **4KB IU·4B = 15.6GB**, **512B IU·4B = 125GB**, 512B IU·8B(≥16TiB 규칙, MM-21) = 250GB. 2TB: 2.0GB / 15.6GB | 512B 매핑은 DRAM 8배. GR-24 확장 |
| SR-72 | 4KB IU 유지 시 512B 랜덤 쓰기의 읽기-수정-쓰기 | T50 쓰기 목표 10M IOPS(SR-23) × 4KB = **NAND 쓰기 41 GB/s** vs 512B 매핑이면 5.12 GB/s | 쓰기 측 8배 증폭. 실제 버퍼 합치기 효과 미반영 |
| SR-73 | 리틀의 법칙: 동시 미결 IO = IOPS × 지연 | 5천만 × 10µs = **500**, 1억 × 20µs = **2,000**, 2억(GPU당) × 100µs(TLC) = **20,000** | GPU 스레드 약 10만(GD-21)으로 충족 가능, CPU 코어 큐 모델로는 큐 수가 문제(SR-36) |
| SR-74 | GPU 1개당 2억 IOPS @512B를 낼 때 NAND 비트 | TLC(PM1763급 6.92M): 200M ÷ 6.92M = **29개 × 15.36TB = 약 444TB TLC**; T50(pSLC, 50M 목표): **4개 × 9TB pSLC = TLC 환산 108TB** | **용량당은 pSLC가 3배 비트를 쓰지만(SR-09), IOPS당은 TLC 다수 드라이브 경로가 약 4배 많은 비트를 쓴다**. 단 TLC 경로는 444TB의 실사용 용량을 함께 제공(용량이 필요한 워크로드에서는 낭비가 아님) |
| SR-75 | aisio 수치 재검산 | 7.9 GB/s ÷ 512B = 15.4M IOPS ÷ 4개 = **3.86M/장치**, 수신/페이로드 = 10.1/7.9 = **1.278** | GD-23의 장치당 3.86M과 일치 |

---

## §5. 반증·실현되지 않을 이유

| ID | 반증 | 근거 | 등급 |
|---|---|---|---|
| SR-80 | **HBM 용량 자체가 커진다**: Rubin Ultra **GPU당 HBM4E 1TB(2027)**. GPU 메모리 밖으로 나가는 작업집합의 하한이 올라간다 | SR-39 | 🟡 |
| SR-81 | **NVMe가 아닌 GPU 메모리 확장 경로(HBF)**: Sandisk·SK hynix HBF 최대 512GB 스택, 0.4~3 TB/s, Sandisk 샘플 2027. SMI CEO는 HBF에 회의적("믿지 않는다")이라 업계 의견이 갈린다 | SR-32, TechRadar(SR-54 URL) | 🟡 |
| SR-82 | **SCADA 이득의 주원천이 HBM 소프트웨어 캐시 적중**(삼성 aisio 요약) | CE-03 | ✅/⚠️ |
| SR-83 | **NVIDIA 자신의 KV 캐시 주력 경로는 DPU·RDMA(STX·CMX)**이며 초기 채택 고객 명단(CoreWeave·Lambda·Nebius·OCI 등)도 이쪽에 있다. GPU 주도 512B 로컬 경로의 고객 배치는 공개 확인 없음 | SR-33·SR-37 | 🟡 |
| SR-84 | **TLC 다수 드라이브로 시스템 목표는 이미 달성**(1억~2.8억 서버 합산). 전용 매체의 의미는 GPU당 드라이브 수 축소에 한정 | CE-08, SR-74 | ⚠️ 파생 |
| SR-85 | **비용**: 초고 IOPS 전용 SSD는 웨이퍼 **3배 소모**(Morgan Stanley), SLC·pSLC와 TLC의 동일 시점 $/GB 공개 비교는 없음(레포 C-15). 공급 부족기(2026~2027)에는 웨이퍼 3배 제품이 기회비용을 가진다 | SR-09, 레포 C-15, SR-10 | 🟡 |
| SR-86 | **워크로드가 CPU 측에 남는 근거**: cuVS는 DiskANN 검색을 CPU에 맡김(GW-09), JPMorgan의 AI NAND 성장 설명은 eSSD 용량·KV 캐시(대블록) 중심(SR-08, GW-20) | GW-09·GW-20, SR-08 | ✅/🟡 |
| SR-87 | **프로토콜·플랫폼 미성숙**: NVMe 큐 구조가 GPU 수천 스레드에 맞지 않는다는 연구 주장(SR-36), GPU 직결 보안 TPAR 진행 중(SR-35), Linux 메인라인에 128GT/s 상수 없음(SR-28), xio-sig 코드 비공개 유지(SR-37) | SR-28·SR-35~SR-37 | ✅/🟡 |
| SR-88 | **GPU 연산 자원 비용**: 6,170만 IOPS 상한 구성에서 폴링 커널이 **SM의 26.8%** 상주(장치·큐 수에 비례). GPU당 2억 IOPS·드라이브 수 증가 시 더 커질 수 있음(⚠️ 외삽) | SR-68 | ✅ / ⚠️(외삽) |
| SR-89 | **1억 IOPS 단일 드라이브는 링크 시계에 묶임**: Gen7 x4 상한 약 1억(§4-D), Gen7 통합사 목록 2028 전망(SR-27), Kioxia 2028(GD-25) | SR-27, §4-D | ⚠️ 파생 |
| SR-90 | **경쟁사 진척 공백**: SK hynix AI-N P의 2026 진척·실적콜 언급 없음, Micron FQ4'26 요약은 KV 캐시 출하만 언급 | SR-13·SR-30, CE-11 | 🟡 |
| SR-91 | **수요 정량 근거의 공백**: 512B 고IOPS를 별도로 집계한 애널리스트 수치 없음, 위키의 $36B→$322B는 다른 범주 | SR-06·SR-14 | ⚠️ 파생 |

---

## §6. 부정 확인 (검색했으나 확보하지 못한 것)

- **SN-01. MarketsAndMarkets "AI-Powered Storage" 보고서 원문의 시장 정의 문장·발행일·보고서 코드.** 페이지·블로그 차단. 수치·세분화·업체는 검색 요약으로만 확보(SR-01·SR-02). 검색어: `MarketsAndMarkets AI-powered storage market 36.28 321.93`, `"AI-powered storage market" definition report code`.
- **SN-02. 512B 고IOPS·GPU 주도 SSD 전용 시장 규모(매출·EB).** TrendForce·Yole·Gartner·IDC·Counterpoint·Kioxia·SK hynix·Micron IR 모두에서 찾지 못함(선행 NF-08 재확인). 검색어: `Yole OR IDC OR Gartner "high IOPS" SSD GPU-initiated forecast`, `SLC AI SSD market size forecast 2028`.
- **SN-03. NVIDIA 1차 문서의 GPU당 IOPS 목표 수치, Vera Rubin의 스토리지(SCADA) 요구 사양.** 파트너 진술만 확보(SR-21~SR-24·SR-39).
- **SN-04. SCADA 클라이언트 SDK GA·공개 다운로드.** 검색 결과가 산업용 SCADA(VTScada 등)로 오염. cuObject 릴리스 노트만 확인(SR-34).
- **SN-05. 하이퍼스케일러·네오클라우드의 SCADA(GPU 주도 512B) 프로덕션 배치.** 없음(선행 NF-09 유지). STX 채택 명단(SR-33)은 다른 경로.
- **SN-06. SK hynix AI-N P의 2026년 샘플·PoC 진척.** 없음.
- **SN-07. Solidigm·Sandisk의 Storage-Next(512B NVMe) 공개 입장.** 없음(Sandisk는 HBF만, SR-32).
- **SN-08. 3D TLC 다이의 SLC 모드 tR 공개 데이터시트 값.** 없음. §4는 20µs를 가정으로 사용.
- **SN-09. Samsung V9·V10의 플레인 수와 tR.** 공개 요약에 없음.
- **SN-10. Samsung·Micron·Kioxia·SK hynix 엔터프라이즈 컨트롤러의 LDPC 코드워드 크기.** 없음.
- **SN-11. XL-FLASH Gen2·Gen3의 다이 용량·플레인 수·tR.** Gen3 "읽기 3배·쓰기 +150%"(GD-25) 외 없음.
- **SN-12. 512B·1KB 단위 서브페이지 감지(sense)·전송을 지원하는 NAND 공개 사양.** 특허 수준(SR-57)만 확인.
- **SN-13. Storage-Next가 요구하는 LBA 포맷·쓰기 단위·DRAM 매핑 단위.** 없음(선행 NF-13 유지).
- **SN-14. 50M·100M IOPS 드라이브의 폼팩터별 전력 한도와 벤더 공식 전력.** TechRadar 서술(35W·60W) 단일 출처뿐. GP1 전력 미공개(SR-29).
- **SN-15. Micron FQ4'26·SK hynix 2Q26 실적콜 원문의 Storage-Next 언급.** 원문 차단, 요약에서는 없음.
- **SN-16. SLC·pSLC·XL-FLASH SSD와 TLC SSD의 $/GB·$/IOPS 비교.** 없음(레포 C-15와 같은 상태).
- **SN-17. Kioxia Investor Day 스크립트 원문의 Storage-Next 매출 기여 규모.** 원문 차단, 요약상 "2027년부터"만.
- **SN-18. JPMorgan·Morgan Stanley 보고서 원문.** 재인용 요약만. "웨이퍼 3배"의 산정 근거(pSLC 비트비인지, 다이 수인지) 미확인.

---

## §7. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. ⚠️ 파생 (위키 수치 정정용)** "위키에 'SCADA(AI 스토리지) $36B → $322B, CAGR 24%'로 인용된 MarketsAndMarkets 수치는 'AI-Powered Storage Market' 보고서(2025년 362.8억 달러 → 2035년 3,219.3억 달러, CAGR 24.4%)의 값으로, HDD와 NAS·SAN, 소프트웨어를 포함하는 AI용 스토리지 시스템 전반의 규모다. 산업용 SCADA(같은 회사 기준 2025년 128.9억 달러)도, NVIDIA SCADA용 512B 고IOPS SSD 시장도 아니다." (SR-01~SR-06)

> **2. 🟡 (수요 정량의 현주소)** "512B 고IOPS SSD를 별도 시장으로 집계한 애널리스트 수치는 공개되지 않았고, 공개된 정량 단서는 Morgan Stanley의 '초고 IOPS 전용 AI SSD는 웨이퍼를 3배 소모하며 2028년 대량생산 시 공급을 조인다'와 Kioxia의 'Storage-Next는 2027년부터'가 대표적이다." (SR-09, SR-11, SR-14)

> **3. 🟡 (목표 수준)** "파트너들이 공개한 목표는 GPU당 512B 약 2억 IOPS(드라이브 2~4개)이며, 이는 PCIe Gen6 x16 GPU 링크 용량과 같은 수준이다." (SR-21, SR-23, §4-D)

> **4. ⚠️ 파생 (링크 산술)** "512B 읽기 1건에 NVMe·PCIe 프레이밍을 포함하면 x4 드라이브 링크의 상한은 Gen5 약 2,500만, Gen6 약 5,000만, Gen7 약 1억 IOPS다. 따라서 드라이브 1개 1억 IOPS는 PCIe 7.0 x4를 거의 다 써야 하며, PCIe 7.0 첫 통합사 목록은 2028년으로 전망된다." (§4-D, SR-27)

> **5. ⚠️ 파생 (병목 순서)** "TLC는 다이 수 × 플레인 ÷ tR이 먼저 막혀 IOPS가 용량에 비례하고, SLC·XL-FLASH는 매체 여유가 커서 NAND 채널 전송(코드워드 크기·채널 수·인터페이스 속도·명령 오버헤드)이 먼저 막힌다. 16채널·3.6GB/s·4KB 코드워드의 채널 상한은 약 1,240만 IOPS로 Kioxia GP1의 1,000만과 같은 대역이다." (§4-B, §4-C, §4-E)

> **6. ✅ (GPU 측 비용)** "삼성 aisio 실험에서 PM1753 16개로 512B 6,170만 IOPS를 낸 GPU 주도 구성은 H100의 SM 26.8%에 폴링 커널을 상주시켰다(워프 슬롯은 1.74%)." (SR-68)

> **7. ✅/🟡 (성숙도)** "2026년 10월 3일 기준 cuFile 오픈소스 저장소의 코드는 여전히 비공개이고, Linux 메인라인은 128GT/s 링크 속도 상수를 정의하지 않았으며, GPU 직결 접근의 LBA 범위 보안은 NVMe TPAR 4217로 표준화가 진행 중이다." (SR-28, SR-35, SR-37)

> **8. 🟡 (컨트롤러 일정)** "16채널·3,600MT/s의 PCIe 6.0 엔터프라이즈 컨트롤러(Marvell Bravera SC6)는 2026년 4분기 샘플 예정이고, Silicon Motion은 Storage-Next를 기준점으로 PCIe 7.0 컨트롤러 개발에 착수했다고 밝혔다." (SR-25, SR-26)

> **9. 🟡/⚠️ 파생 (NAND 비트 소모의 양면)** "용량 기준으로 pSLC는 TLC보다 3배의 비트를 쓰지만, GPU 1개에 512B 2억 IOPS를 공급할 때는 TLC Gen6 드라이브 약 29개(약 444TB)보다 pSLC 5천만 IOPS 드라이브 4개(TLC 환산 약 108TB)가 더 적은 비트를 쓴다. 단 후자는 설계 목표치 기준이다." (SR-74, SR-09, SR-23)

> **❌ 쓰지 말 것**
> - "SCADA(AI 스토리지) 시장 $36B → $322B" → 다른 범주(AI-Powered Storage 시스템 전반, SR-06). "산업용 SCADA 수치"라고 쓰는 것도 틀림(SR-04).
> - "512B 고IOPS SSD 시장은 X억 달러" → 공개 수치 없음(SN-02).
> - "NVIDIA가 GPU당 2억 IOPS를 공식 요구했다" → 파트너 진술(SR-21·SR-23), NVIDIA 1차 문서 미확인(SN-03).
> - "SK hynix가 Gen6로 1억 IOPS 드라이브를 낸다" → x4 링크 산술과 충돌(§4-D), 2026 진척 미확인(SN-06).
> - "PCIe Gen6 x4 드라이브로 1억 IOPS" → 상한 약 5,000만(§4-D).
> - "SCADA가 프로덕션에 배치됐다" → 공개 근거 없음(SN-05). STX 채택(SR-33)과 혼동 금지.
> - "TLC로는 512B 고IOPS가 불가능" → 16TB TLC 6.92M 실측, 시스템 합산 2.8억(GD-20). 맞는 서술은 "TLC는 IOPS가 용량에 비례한다"(§4-E).
> - "SLC는 TLC보다 3배 비싸다" → 비트 비율 산술이며 가격 비교 공개 자료 없음(SN-16, 레포 C-15).
> - "Gen6 200M IOPS"를 드라이브 수치로 인용 → x16(GPU 링크) 기준으로 읽어야 산술과 맞음(§4-D).
> - 본 원장의 §4 상한값을 제품 사양처럼 인용 → 모두 가정(§4-A)에 의존하는 ⚠️ 파생값.

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| Linux 커널 NVMe | `torvalds/linux` master HEAD `ff47652`(7.3-rc5): `include/linux/nvme.h`, `drivers/nvme/host/core.c` | `nvme_command`·`nvme_rw_command` 64B 컴파일 검사, `nvme_completion` 16B 구조, `lbaf[64]` |
| Linux 커널 PCI | `include/uapi/linux/pci_regs.h`, `include/linux/pci.h` | 링크 속도 상수 최대 64 GT/s, `PCIE_SPEED_64_0GT = 0x19`, 128 GT/s 상수 없음 |
| Samsung aisio | https://github.com/xnvme/aisio HEAD `7311ed0`(작성 2026-09-22, 커밋 2026-10-01): `docs/src/experiments/{pcie_saturation,device_initiated_qdepth,device_initiated_iosize,cpu_initiated}.md` | 512B 7.9/10.1 GB/s(라인레이트 16%), 4KB 이상 57.8 GB/s, 비 1.28, GPU 주도 21.6 GB/s·실용 상한 44~45 GB/s, SM 114개 중 점유 13.3/26.8/53.2%, 워프 1.74% |
| NVMeVirt | https://github.com/snu-csl/nvmevirt HEAD `61c90f7`, `ssd_config.h` | 970 PRO·ZNS·ZN540 모델의 NAND 읽기 지연·채널 대역·LUN·페이지·512B LBA |
| MQSim | https://github.com/CMU-SAFARI/MQSim HEAD `51f0f2d`, `ssdconfig.xml` | 기본 채널·플레인·tR 75µs·333MT/s |
| xio-sig | `git ls-remote https://github.com/xio-sig/*` | `.github` HEAD `9bdf34a` 불변, 7개 저장소 인증 요구 유지 |

## 부록 B. 기존 레포 원장·위키와의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| RS-3 현황 §1 표 "SCADA(AI 스토리지) $36B→$322B, CAGR 24%, MarketsAndMarkets 🔵", §2 기회(1) (동일 수치가 `rs3-customer-switching-cost.md`·`strategy.md`·`generate_pptx.py`에도 존재, SR-07) | 출처 범주는 **AI-Powered Storage(시스템 전반)**, 산업용 SCADA도 NVIDIA SCADA SSD도 아님(SR-06). 선행 NF-08의 "AI 스토리지 전반 추정"을 수치·세분화로 확정 |
| 위키 nvidia-cmx-scada §2.3 "PCIe Gen6 이상(현재), Gen7(차세대)", §2.4 "SK 2,500만→1억 2026~2027" | 링크 산술상 x4 1억은 Gen7 필요(§4-D), SK "Gen6 위 1억"은 충돌(SR-30) |
| 선행 GD-11(Newburn "Gen6 ↔ 200 MIOPs", 단위 ⚠️) | Gen6 **x16** 링크 기준으로 산술 정합(§4-D) |
| 선행 GR-11(Gen6 x4 상한 약 4,270만~5,470만) | TLP 구성 기반으로 약 4,880만~4,980만으로 정밀화, Gen5·Gen7·x16 추가(§4-D) |
| 선행 GR-24·GR-25(매핑·읽기 증폭) | L2P 8배, 쓰기 RMW 41 GB/s, 채널 전송 상한으로 연결(SR-71·SR-72, §4-C) |
| 선행 GR-03(XL-FLASH 915다이) | 그 산술은 **관측 다이당 IOPS**(컨트롤러·채널 제약 포함) 기반이며, 매체 상한 기준이면 31다이(§4-B). 차이 자체가 "XL-FLASH는 매체가 아닌 채널·컨트롤러에서 막힌다"는 근거 |
| 선행 NF-14(SwarmIO 저자) | KAIST(Minsoo Rhu 등)로 해소(SR-38) |
| 선행 GD-07·NF-06(xio-sig 코드) | 2026-10-03 재확인, 변화 없음(SR-37) |
| 선행 GD-08(cuObject GA 2026-09-30) | cuObject server v1.0.0 릴리스 노트 2026-01-12와 시점 표기 충돌(SR-34) |
| 레포 C-15(SLC 비용 비교 부재) | Morgan Stanley "웨이퍼 3배"(SR-09)와 IOPS당 비트 산술(SR-74)로 양면 보강, 가격 비교 부재는 유지(SN-16) |
