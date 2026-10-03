# SSD 미래 후보 기술 팩트 원장: 전력·냉각 제약 대응 SSD (전력 효율 + 액체냉각 준비)

**수집일**: 2026-10-03
**수집자**: Research Agent (Power·Cooling). 사실 수집 전용, 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(GitHub 원본 코드·문서, Linux 커널 원본, Google Cloud 블로그 원문, Microsoft Research 페이지) 기반 팩트 원장
**용도**: SSD 개발 조직이 이미 고른 3대 기술(① 고DWPD ② 혼합 매체(QLC + pSLC 영역) ③ 대용량 + 고장 허용) 외에 "어떤 미래에도 대응할 핵심 솔루션" 추가 후보 2~3개를 검토하는 과정 중, 후보 영역 **"전력·냉각 제약 대응 SSD"** 의 사실 근거와 반증. 다루는 범위는 (1) 액체냉각이 SSD까지 내려온 경위, (2) 스토리지 전력 비중·SSD 전력 추세·랙 전력 예산, (3) 호스트가 SSD 전력·열을 측정·제한하는 표준 인터페이스, (4) 시스템 업체·고객이 SSD 열·전력 포락선을 정의하는 공동설계 사례, (5) 반증.

**등급**: ✅ 1차 원문 직접 열람(표준 구현 코드·헤더·문서, Linux 커널 원본, 공식 블로그 원문) / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·근거 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch 모두 403 또는 연결 실패): `news.samsung.com`, `developer.nvidia.com`, `docs.nvidia.com`, `www.nvidia.com`, `www.snia.org`, `opencompute.org`, `nvmexpress.org`, `storagereview.com`, `blocksandfiles.com`, `servethehome.com`, `storagenewsletter.com`, `futurumgroup.com`, `guru3d.com`, `hpe.com`, `lenovopress.lenovo.com`, `gigabyte.com`, `supermicro.com`, `dell.com`, `europe.kioxia.com`, `micron.com`, `micron.cn`, `marvell.com`, `evertiq.com`, `lasvegassun.com`, `vrlatech.com`, `digitimes.com`, `climate.mit.edu`, `eta-publications.lbl.gov`, `iea.org`, `epoch.ai`, `export.arxiv.org`, `alphaxiv.org`, `emergentmind.com`, `huggingface.co`, `signal65.com`, `brighttalk.com`, `sanblaze.ellisys.com`, `smartm.com`, `storagedeveloper.org`, `learn.microsoft.com`, `blogs.microsoft.com`, `techcommunity.microsoft.com`, `research.google`, `sustainability.google`, `about.meta.com`, `aws.amazon.com`, `amazon.science`, `datacenterknowledge.com`, `seagate.com`, `netapp.com`, `techradar.com`, `heise.de`, `hpcwire.com`, `techpowerup.com`, `pdl.cmu.edu`, `par.nsf.gov`, `verdantix.com`, `stantec.com`, `computeexpresslink.org` 등. **직접 열람이 가능했던 것은 `raw.githubusercontent.com`·GitHub `git clone`, `cloud.google.com`(블로그), `www.microsoft.com`(Research 출판물 페이지, WebFetch 경유)뿐**이다. 따라서:
- **✅는 위 경로에서 원문을 직접 읽은 항목에만 붙였다**: nvme-cli(master `f938b92`, 2026-10-02 커밋) 병합 libnvme 헤더·`Documentation/`·`plugins/ocp/`, nvme-cli 커밋 이력(bare clone), Linux 커널 master(`drivers/nvme/host/core.c`·`hwmon.c`, `include/linux/nvme.h`, `drivers/thermal/pcie_cooling.c`, `drivers/pci/pcie/bwctrl.c`, 2026-10-03 취득), Google Cloud 블로그 "Enabling 1 MW IT racks and liquid cooling at OCP EMEA Summit"(2025-04-29), Microsoft Research GreenSKU 출판물 페이지.
- 벤더 보도자료(Samsung·Solidigm·Kioxia·Micron·DapuStor), NVIDIA 발표, SNIA·OCP·NVMe 표준 발표 수치는 1차 출처이지만 **검색 요약 경유이므로 🟡**다. 벤더의 에너지 절감률 주장은 추가로 ⚠️를 붙였다.
- **검색 예산 소진**: 수집 막바지에 세션 전체 WebSearch 한도(200회)에 도달했다. 그 뒤로는 확인 검색을 하지 못했으며, 해당 항목(예: Vera Rubin 컴퓨트 트레이당 E1.S 개수)은 ⚠️로 남겼다.

**0-2. 이 원장에서 "전력·냉각 제약 대응 SSD"의 범위.** 세 가지를 섞지 않는다.
- **(a) 컴퓨트 트레이 로컬 SSD**: GPU 서버·랙 스케일 컴퓨트 트레이 안의 E1.S/E3.S(주로 TLC, Gen5/Gen6). 액체냉각 이행이 실제로 일어나는 곳이다(§1).
- **(b) 스토리지 티어 고용량 SSD**: 별도 스토리지 서버·랙의 QLC 122~512TB급. 지금까지 확인된 액체냉각 SKU가 없다(§6 PC-97, §7 NG-03). 전력 지표는 W/TB가 중심이다(§3-B).
- **(c) 호스트 전력·열 인터페이스**: NVMe Power State·HCTM·NVMe 2.3 Power Limit/Measurement, OCP DSSD Power State 등 매체와 무관하게 적용되는 표준(§4).

**0-3. 기존 원장과의 관계.** 다음은 이미 레포에 있으므로 **ID로만 참조**하고 반복하지 않는다.
- [ssd-high-capacity-rackspace-fault-tolerance-2026-10.md](ssd-high-capacity-rackspace-fault-tolerance-2026-10.md) (이하 **HC**): A12(NVIDIA 800VDC·1MW 랙), A13(Kyber 약 600kW), A14(VR200 190~230kW·GB300 140kW/랙, ⚠️ 단일 출처), A15(CPU 랙 약 12kW, H100 공랭 40kW), A16(Uptime 2025 평균 9kW), **A17(Azure 스토리지 = 운영 배출 33%·내재 배출 61%, ✅)**, **A18(스토리지 전력 평탄, 피크 기준 프로비저닝, ✅)**, A20(IEA 스토리지 약 5%), A21(GPU는 DC 전력의 약 40%), A22(Meta DSI 전력), A24·A25(벤더 의뢰 전력 효율 주장), B1·B18·B19(6600 ION·D5-P5336 전력 주장), C10(OCP 2.7 디바이스 측정 전력), N1·N2·N12(부정 확인).
- [ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) (이하 **MM**): IR-10("Every Azure region … can support liquid cooling", ✅), IR-14(Microsoft sidekick), IR-15(Google Brazos 60kW, ✅), IR-17(Meta AALC), IR-18·IR-44(Meta 20kW 공랭 홀에 120kW 랙, 6랙 중 컴퓨트 2), IR-19(AWS IRHX), IR-21(Uptime 2026 최빈 11kW), NG-06("스토리지는 공랭 홀에 남는다"는 하이퍼스케일러 진술 없음).
- [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md): B11(OCP v2.7 2025-11-17, device measured power), E04(하이퍼스케일러는 밀도·에너지 효율 우선, ⚠️), E05(6600 ION 약 8.2TB/W).
- [qlc-v6-standards-lessons-factcheck-2026-09.md](qlc-v6-standards-lessons-factcheck-2026-09.md) C1-31 / [qlc-v7-hbm-codesign-lesson-2026-09.md](qlc-v7-hbm-codesign-lesson-2026-09.md) D-09: Meta E2 폼팩터 1PB·80W 제안.
- [qlc-essd-history-2022-background-2026-09.md](qlc-essd-history-2022-background-2026-09.md) §3 비교표 "전력" 행: 15W(P4320, 1.95 W/TB) → 25W(D5-P5336 61TB, 0.41 W/TB) → 30W(6600 ION 245TB, 0.12 W/TB), 유휴 <5W.
- [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2 벤더 표: 삼성 PM1763 D2C 액체냉각, Kioxia CM10 콜드플레이트, Solidigm PS1010/1030 DWPD.
- [samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md) §1.1: PM1763 양산(2026-07-08), "액체 냉각 최적화 지원 언급(Med)".

---

## 핵심 요약 (사실만, 출처는 각 ID)

1. **SSD 냉각은 NVIDIA 세대 경계에서 바뀌었다.** GB200 NVL72는 CPU·GPU·NVSwitch만 액체냉각하고 스토리지·네트워크 모듈은 공랭이었다(PC-01). GB300 NVL72도 콜드플레이트는 CPU·GPU에 두고 나머지는 보조 공랭이었다(PC-02). Vera Rubin NVL72(2026 하반기)는 "100% 액체냉각·팬 없음·45°C 온수"이며 컴퓨트 트레이 안의 E1.S SSD까지 냉각판에 물린다(PC-03~PC-05). 🟡
2. **SSD 4사와 2차 벤더가 2025-03~2026-08 사이 콜드플레이트 SKU를 내놓았다**: Solidigm PS1010 E1.S 9.5mm(2025-03 시연, 2025-09 출시), Micron 9650 E1.S(2025-07), Kioxia NX1·CM10(2026-07-29~30), DapuStor R6 E1.S(2026-08). 삼성은 PM1763을 "D2C 냉각 최적화"로 발표(2026-07-08)했고 2025-08에 2상 침지 냉각유를 인증했다(PC-10~PC-22). 🟡
3. **표준이 냉각 접촉면을 정의했다**: SFF-TA-1006(E1.S 9.5mm, 평탄도 <0.12mm·최대 138kPa)과 SFF-TA-1008(E3, 평탄도 <0.2mm·최대 103kPa)이 "Cooling Interface Area"를 규정했고, SNIA는 액체냉각 E1.S 9.5mm가 35~40W까지 지원한다고 발표했다(PC-30~PC-32). 🟡
4. **호스트가 SSD 전력을 측정·제한하는 표준이 오픈소스에 반영됐다**: NVMe 2.3 Power Limit(FID 23h)·Power Threshold(24h)·Power Measurement(25h)·Power Measurement 로그(LID 25h)·SMART의 누적 에너지(Wh)·1초 평균 전력 필드가 nvme-cli/libnvme(2025-12~2026-03 커밋)에 들어갔다. **Linux 커널 NVMe 드라이버에는 아직 없다**(PC-70~PC-77). ✅
5. **스토리지 전력 비중은 출처마다 다르다**: Azure 운영 배출의 33%(HC A17, ✅), 미국 DC 전력 중 스토리지 16TWh/176TWh(2023, ⚠️ 파생 약 9%, 그중 플래시 약 2%), IEA 약 5%(HC A20). GB300 랙에서 로컬 E1.S 전부를 최대 전력으로 잡아도 랙 전력의 약 2~3%(⚠️ 파생, PC-45).
6. **반증**: 액체냉각의 동인은 GPU이고 SSD는 따라가는 쪽이다(PC-91). 지금까지 액체냉각 SSD는 전부 TLC·소용량(3.84~61.44TB) 컴퓨트 트레이 등급이며 고용량 QLC 콜드플레이트 SKU는 확인되지 않았다(PC-97). xAI Colossus는 GPU 랙을 액체냉각하면서 스토리지 서버는 팬 + 후면도어 열교환기로 운용했다(PC-92). 🟡

---

## §1. 액체냉각이 SSD까지 내려온 경위

### 1-A. NVIDIA 랙 스케일 플랫폼 세대별 SSD 냉각

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| PC-01 | **GB200 NVL72**: Grace CPU·Blackwell GPU·CX7·NVLink Switch ASIC은 액체냉각, **나머지 부품(네트워크 모듈·스토리지)은 공랭**. 랙 = 1U 컴퓨트 트레이 18개 + NVSwitch 트레이 9개. NVIDIA DGX SuperPOD GB200 레퍼런스 아키텍처: "가장 전력 집약적인 부품(GPU·CPU)은 액체냉각, 다른 부품은 공랭"의 하이브리드, SU(랙 8개)당 TDP **1.2MW** | 2024~2025 | SemiAnalysis https://newsletter.semianalysis.com/p/gb200-hardware-architecture-and-component ; NVIDIA RA-11338001 https://docs.nvidia.com/dgx-superpod/reference-architecture-scalable-infrastructure-gb200/latest/dgx-superpod-architecture.html (차단) | 🟡 `[검색 요약 경유]` |
| PC-02 | **GB300 NVL72(HPE·Lenovo 문서)**: 컴퓨트 트레이 = 1U 액체냉각 노드, Grace 2 + Blackwell Ultra 4, **E1.S Gen5 NVMe 드라이브 베이 8개**, 800Gb/s OSFP 4개. 콜드플레이트는 CPU·GPU에. "CPU·GPU·NVLink 스위치·전원 서브시스템은 주로 온수 액체냉각, **나머지 열은 보조 공기 흐름(supplemental airflow)**". HPE 제공 E1.S 용량 3.84·7.68·15TB | 2025 | HPE https://www.hpe.com/us/en/collaterals/collateral.a50009244enw.html ; Lenovo https://lenovopress.lenovo.com/lp2357-lenovo-nvidia-gb300-nvl72-rack-scale-ai (모두 차단) | 🟡 |
| PC-03 | **Vera Rubin NVL72(CES 2026)**: "100% 액체냉각, 모든 칩과 네트워크 부품을 폐루프 액체로, 시스템 내 팬 0개", **냉각수 공급 45°C**(물·프로필렌글리콜). Jensen Huang: "No water chillers are necessary. We are cooling this supercomputer with hot water." 고객 공급 **2026 하반기**. 명칭 주의: NVIDIA 공식명은 NVL72이며 "NVL144"는 패키지당 다이 2개를 센 표기 또는 CPX 변형을 가리킨다 | 2026-01 (CES) | sentisense 요약 https://app.sentisense.ai/stories/nvidia-develops-breakthrough-cooling-tech-for-ai-machines-06222026 ; vrlatech https://vrlatech.com/nvidia-vera-rubin-architecture-explained/ | 🟡 (2차, NVIDIA 원문 미열람) |
| PC-04 | **Vera Rubin 컴퓨트 트레이(GTC 2026 부스, ServeTheHome)**: "GPU·CPU·네트워킹·**SSD가 모두 액체냉각**", 섀시에 팬 구획 없음. 상단 1U 영역에 BlueField-4 DPU·관리 I/O·**액체냉각 E1.S SSD**. **냉각판이 SSD에 고른 접촉을 위해 압력을 유지해야 하며, SSD 정비 시 냉각판을 비켜 세울 수 있음**. 트레이 케이블이 이전 세대보다 크게 줄어 조립·정비가 빨라짐 | 2026-03 (GTC 2026) | STH Aivres https://www.servethehome.com/aivres-nvidia-vera-rubin-at-its-nvidia-gtc-2026-booth/3/ ; STH Gigabyte https://www.servethehome.com/gigabyte-nvidia-vera-rubin-and-more-at-nvidia-gtc-2026/4 ; STH Pegatron https://www.servethehome.com/nvidia-vera-rubin-nvl72-rack-and-more-in-the-pegatron-booth-at-gtc-2026/4/ | 🟡 |
| PC-05 | Vera Rubin 트레이 구성(2차 요약): "BlueField-4 통합 NVMe(캐시) + **트레이 단위 E1.S PCIe Gen6 SSD** + M.2 부트 드라이브". VR200 NVL72 컴퓨트·NVSwitch 트레이는 **팬리스**, 액체 유량 요구가 Blackwell 대비 **약 2배** | 2026 | vrlatech(위) ; SemiAnalysis 요약 https://newsletter.semianalysis.com/i/188150420 | 🟡 |
| PC-06 | **⚠️ 충돌·미확인**: (a) 트레이당 E1.S 개수: STH 요약 한 곳은 "ConnectX-9 포트 4개와 **E1.S 2개**"로 서술(어느 트레이인지 불명확). GB300(PC-02)의 8베이와 다르다. (b) naddod(벤더 블로그)는 BlueField-4 **STX 스토리지 랙**이 "완전 액체냉각 설계", "GPU당 16TB, 랙당 1,152TB(Rubin GPU 72개)"라고 쓰지만 컴퓨트 트레이(18개·GPU 72개)와 STX 구성을 섞어 서술해 신뢰도 낮음. 대만 uanalyze도 "VR NVL72 랙당 SSD 최대 1,152TB" | 2026 | naddod https://www.naddod.com/ko/ai-insights/nvidia-bluefield-4-stx-storage-architecture-designed-for-an-ai-native-storage-and-data-platform ; uanalyze https://uanalyze.com.tw/articles/1715445961 | ⚠️ |

### 1-B. 벤더별 액체냉각(콜드플레이트·침지) SSD 타임라인

| ID | 벤더·제품 | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|
| PC-10 | **Solidigm D7-PS1010 E1.S 9.5mm (GTC 2025, NVIDIA와 공동 시연)** | "업계 최초 콜드플레이트 냉각 eSSD"를 NVIDIA와 공동 전시. 팬 냉각 불필요, "완전 액체냉각 AI 서버 설계" 가능. 기판을 감싸는 냉각판, 양 끝 호스 커넥터, **핫스왑**, 컨트롤러·NAND 직접 냉각, **양면 냉각**. 9.5mm(냉각판 키트) + 15mm(공랭) 2종. 효과 주장: HVAC 비용 절감, **팬 없는 1U AI 서버**. 공급 **2025 하반기** | **2025-03-18** | Businesswire https://www.businesswire.com/news/home/20250318841870/en/ ; Blocks&Files https://blocksandfiles.com/2025/03/18/solidigm-promises-fanless-gpu-servers-by-extending-liquid-cooling-to-ssds/ | 🟡 |
| PC-11 | Solidigm (FMS 2025 수상) | FMS 2025 Best of Show "Most Innovative Technology"(SSD Technology 부문) 수상: "Liquid Cooled Hot Swappable NVMe SSD", 후면에서 스프링 기구로 핫스왑 | 2025-08 | Solidigm https://news.solidigm.com/en-WW/252892-fms-awards-solidigm-liquid-cooled-essd-best-of-show-for-most-innovative-technology/ ; FMS https://futurememorystorage.com/program/events-awards/best-of-show-awards/winners/2025 | 🟡 |
| PC-12 | ⭐ **Solidigm D7-PS1010 E1.S 출시** | "World's First Cold-Plate-Cooled eSSD for Next-Generation Fanless Server Designs". "업계 최초 **단면(single-sided) 직접 액체냉각** eSSD", DAS AI 워크로드용 PCIe 5.0. **"Solidigm has worked with NVIDIA to address eSSD liquid-cooling challenges, such as hot swap-ability and single-side cooling constraints"**. Supermicro NVIDIA HGX B300 서버에서 사용 가능. 9.5mm E1.S **3.84TB·7.68TB**. Greg Matson(SVP): "world's first single-sided cold-plate solution that cools both sides of the SSD". 서버 ODM·OEM의 권장 벤더 목록(RVL) 인증 진행 | **2025-09-23** | Businesswire https://www.businesswire.com/news/home/20250923822315/en/ ; Solidigm https://news.solidigm.com/en-WW/254479-solidigm-introduces-world-s-first-cold-plate-cooled-essd-for-next-generation-fanless-server-designs/ ; Blocks&Files https://www.blocksandfiles.com/ai-ml/2025/09/25/solidigm-adds-e1s-liquid-cooled-variant-to-ps1010-ssd-line/1610586 | 🟡 |
| PC-13 | Solidigm (SC25, 침지) | D5-P5430 E1.S를 Hypertec 서버에 넣어 Midas 탱크·Valvoline 유체에 침지, FIO 기반 AI 워크로드 실행하며 SMART 온도 감시 시연 | 2025-11 | Solidigm https://news.solidigm.com/en-WW/257819-solidigm-extends-essd-liquid-cooling-leadership-at-sc25/ | 🟡 |
| PC-14 | **Micron 9650 (PCIe Gen6)** | 업계 첫 PCIe 6.0 데이터센터 SSD, G9 TLC(3600MT/s), 최대 30.72TB, 순차 읽기 28GB/s·쓰기 14GB/s, 랜덤 읽기 5.5M IOPS. **E1.S 9.5mm는 액체냉각 지원**, ServeTheHome: "liquid-cooling capable이 아니라 **사실상 필수**인 첫 Micron SSD"(Micron 표현은 "optimized"). **성능 수치는 25W 전력 기준**. 순차 읽기 **1,120MB/s/W(직전 세대 2배)**, 순차 쓰기 560MB/s/W(1.4배) | 2025-07 발표, 양산 | itdaily https://itdaily.com/news/datacenter/micron-9650-pro-max-ssd-pcie6 ; STH https://www.servethehome.com/spotted-at-computex-2026-microns-first-pcie-gen6-data-center-ssd-the-9650/ ; DCD https://www.datacenterdynamics.com/en/news/micron-unveils-three-new-data-center-ssds-including-worlds-first-pcie-gen6-offering/ | 🟡 |
| PC-15 | ⭐ Micron 블로그 "Storage joins the cooling loop: Designing SSDs for cold-plates"(Ryan Meredith) | "오늘의 공랭 GPU 시스템은 SSD 8개와 함께 **8U**를 차지하지만, 같은 8-GPU 구성이 신형 서버에서는 액체냉각이 필수라 **2U**로 줄어든다." "**25W SSD 32개**의 열을 옮기는 데 공랭은 **38~81W**, 액체냉각은 **0.4~1.4W**(약 98% 감소)." 9650 E1.S 9.5mm는 냉각판 접촉을 위한 단면 구조로 처음부터 설계 | 일자 미확인 | https://www.micron.com/about/blog/applications/data-center/storage-joins-the-cooling-loop-designing-ssds-for-cold-plates (차단) | 🟡 / ⚠️ (벤더 산정) |
| PC-16 | **Samsung (FMS 2025)** | AI 인프라 4대 요구를 **고성능·고용량·열 제어(thermal control)·보안**으로 정의, PM1763(PCIe 6.0)·**액체냉각 등 차세대 냉각 기술**·Confidential SSD·Memory Class Storage(Z-NAND) 전시. PM1763은 FMS Best of Show "Most innovative memory technology" | 2025-08 | Samsung Semiconductor https://news.samsungsemiconductor.com/global/samsung-electronics-presents-vision-for-ai-memory-and-storage-at-fms-2025 | 🟡 |
| PC-17 | **Samsung × Chemours (2상 침지)** | Chemours Opteon 2상 침지 냉각유를 삼성이 **현세대 SSD("generation four SSD")** 로 인증, "삼성이 승인한 첫 2상 침지 냉각유". LiquidStack·PKI와 상용 규모 **48U 침지 탱크**에서 약 1년 시험, 후속 세대 시험 예정. Chemours 주장: 물 사용 거의 0, 공간 −60%, 에너지 최대 −40%, 냉각 에너지 최대 −90%. "generation four"가 PCIe 4세대인지 원문 미확인 | **2025-08-13** | Businesswire https://www.businesswire.com/news/home/20250813122004/en ; csrwire https://csrwire.com/press-release/samsung-electronics-successfully-qualifies-chemours-opteontm-two-phase/ | 🟡 / ⚠️ (절감률은 유체 벤더 주장) |
| PC-18 | ⭐ **Samsung PM1763 양산** | PCIe 6.0, 9세대 V-NAND + 4nm 컨트롤러. 보도자료: "**optimized for liquid-cooled server environments through direct-to-chip (D2C) cooling technology**", 집중 부하·장시간 운용에서 최고 성능 유지. "**Power efficiency is also improved by more than 1.8 times compared to its predecessor**"(PM1753 대비). 16TB 순차 읽기 28,400MB/s·쓰기 21,900MB/s. 폼팩터: E1.S·E3.S(PCIe 6.0), U.2(PCIe 5.0만) | **2026-07-08** | Samsung https://news.samsung.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure (차단) ; Samsung Semiconductor https://news.samsungsemiconductor.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure/ ; AMP https://ampinc.com/samsung-pm1763-pcie-gen6-e1s-ssd/ | 🟡 |
| PC-19 | **⚠️ PM1763 용량 충돌** | 보도자료 요약은 "4·8·16TB", AMP·serverflow 등은 "최대 61.44TB(64TB)". 어느 폼팩터·SKU에 냉각판 키트가 있는지는 확인하지 못함 | 2026-07 | 위 ; serverflow https://serverflow.ru/blog/novosti/samsung-predstavila-tlc-ssd-pm1763-obemom-64-tb-i-podderzhkoy-pcie-6-0/ | ⚠️ |
| PC-20 | **Kioxia NX1** | "**KIOXIA's first SSD with direct liquid cooling support**". E1.S PCIe 5.0, 차세대 자체 컨트롤러, GPU 서버·하이퍼스케일용. **E1.S 9.5mm(직접 액체냉각 + 공랭)**, 15mm(공랭). 1.92~15.36TB, **1 DWPD**, NVMe 2.0, **OCP Datacenter NVMe SSD 2.6**, **FDP 지원**. 직전 세대 대비 순차 쓰기 +38%, 랜덤 쓰기 +20%. FMS 2026 전시 | **2026-07-29** | Kioxia https://www.kioxia.com/ja-jp/business/news/2026/20260729-1.html ; KIE PR https://europe.kioxia.com/content/dam/kioxia/en-europe/business/news/2026/asset/KIE_PR_20260729-1_EN.pdf | 🟡 |
| PC-21 | **Kioxia CM10** | 첫 PCIe 6.0, BiCS10 TLC, "**direct-cold-plate liquid cooling capability**", 콜드플레이트는 **E3.S와 E1.S 9.5mm**에서 지원(2.5"는 미지원). NVIDIA CMX 지원, NVMe 2.1, **OCP 2.7**, 1.60~61.44TB. 순차 읽기 약 +92%, 랜덤 읽기 약 +85%. 보도자료에 와트 수치 없음 | **2026-07-29~30** | Kioxia https://www.kioxia.com/en-jp/business/news/2026/20260730-1.html ; Businesswire https://www.businesswire.com/news/home/20260730298466/en/ | 🟡 |
| PC-22 | **DapuStor** | (a) FMS 2026: **R6 8TB PCIe 5.0 TLC E1.S, 콜드플레이트 액체냉각 지원**(같은 발표에 R6060 512TB QLC는 E3.L·E2, 냉각 언급 없음). (b) **ZTE와 침지 냉각 SSD 상용 배치**: J5 시리즈 기반 "liquid-cooled eSSD", **액체냉각 랙 24개(48kW/랙)·CDU 6대·합성유 30,000L·ZTE 침지 서버 200대**, 연속 RW 부하에서 안정 운용, "Green Data Center Demonstration Project" | (a) 2026-08 / (b) **2025-12-30** | StorageNewsletter https://www.storagenewsletter.com/2026/08/10/fms-2026-dapustor-unveils-industry-first-512tb-and-liquid-cooled-ssds-optimized-for-ai ; https://www.storagenewsletter.com/2025/12/30/dapustor-and-zte-partner-to-build-green-high-efficiency-data-centers-with-immersion-cooling-ssds/ | 🟡 |
| PC-23 | **SSSTC (침지)** | Computex 2026: 침지 냉각용 SSD 포트폴리오 확대(SATA ER3·ER4·ER5, PCIe U.2 PJ1·EJ5), 부식 저항 소재·부품 보호·구조 설계, eTLC 1·3 DWPD. 침지 위험 요인: 화학적 침식·열 사이클·소재 비호환·유전 특성 변화. 라벨·접착제 용해, EPDM 밀봉 전해 커패시터 팽윤 → 전용 부품 필요 | 2026-06 | antaranews https://en.antaranews.com/news/417917/computex-2026-ssstc-expands-immersion-cooling-ssd-portfolio-to-address-ai-data-center-thermal-challenges ; SSSTC https://www.ssstc.com/knowledge-detail/immersion-cooling-ssd/ | 🟡 |
| PC-24 | **⚠️ 파생, 타임라인 요약(판단 아님)** | 콜드플레이트 SSD 공개 순서: Solidigm(2025-03 시연, 2025-09 출시) → Micron 9650(2025-07) → Samsung PM1763 "D2C 최적화"(2026-07-08) → Kioxia NX1·CM10(2026-07-29~30) → DapuStor R6(2026-08). 공개 SKU 용량: PS1010 3.84/7.68TB, NX1 ≤15.36TB, R6 8TB, 9650 ≤30.72TB, CM10 ≤61.44TB. **삼성 공식 문구에서 "cold plate"·"E1.S 9.5mm 냉각판 키트" 표현은 이번 수집에서 확인하지 못했다**(PC-18, NG-02) | 2025-03~2026-08 | PC-10~PC-22 | ⚠️ 파생 |

---

## §2. 표준: 냉각 접촉면·폼팩터 전력 상한·침지 호환

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| PC-30 | ⭐ **SFF-TA-1006(E1.S)**: 9.5mm E1.S의 2차면(secondary side)에 공랭·직접 액체냉각(DLC) 공용 **"Cooling Interface Area"**(SSD와 냉각판의 접촉면) 정의. **평탄도 <0.12mm, 거칠기 <1.6µm**, 접촉면 **최대 압력 138kPa**, 삽입용 리딩엣지 챔퍼·라운드. 검색 요약상 **Rev 1.6 공개 2025-09-02**. 다른 요약은 "Solidigm이 SNIA와 함께 **Rev 2.0**으로 액체냉각 E1.S 구현을 정의"라고 서술 | 2025-09 | SNIA SFF https://www.snia.org/sff ; SNIA 웨비나 PDF https://www.snia.org/sites/default/files/CMSC/SNIA-Webinar-Liquid-Cooling-for-SSDs-What's-Next.pdf (모두 차단) | 🟡 / ⚠️ (개정 번호 충돌) |
| PC-31 | **SFF-TA-1008(E3)**: 7.5mm E3.S·E3.L 상면에 "Cooling Interface Area", **평탄도 <0.2mm, 거칠기 <1.6µm, 최대 103kPa**. Rev 2.1.2(2025-12-11)에서 5.2절 DLC 도면·주석 갱신, "Rev 3.0"에서 접촉면 정의라는 서술 병존. E3.S/E3.L 1T의 "thermal contact cooling" 개정 제안 | 2025-12 | SNIA members 문서 https://members.snia.org/document/dl/31359 ; 위 웨비나 PDF | 🟡 / ⚠️ (개정 번호 충돌) |
| PC-32 | ⭐ **SNIA 웨비나 "Liquid Cooling for SSDs: What's Next"**(SSD SIG·SFF Community, 발표: **Anthony Constantine(Micron, SFF Community·SFF TWG 의장)**, **Scott Shadley(Solidigm)**): 액체냉각 E1.S 9.5mm로 **E1.S가 35~40W까지 지원**. 표준은 접촉면·삽입 구조·평탄도·거칠기·허용 압력을 정의하며 "**host-defined cold plates and SSD-defined surfaces**"가 표준화 중. 후속 블로그(질문 20개+): "GPU·AI 가속기가 액체냉각 이행의 **주된 동력**", "PCIe Gen6·향후 Gen7 SSD는 성능과 함께 전력·열 요구가 커지고, **서버가 완전 액체냉각이 되면 SSD도 정비성·상호운용성을 유지하며 그 환경에 통합돼야**" | **2026-07-23** (웨비나) | SNIA 블로그 https://www.snia.org/blog/2026/liquid-cooling-ssds-expert-answers-common-questions ; BrightTALK https://www.brighttalk.com/webcast/663/667389 | 🟡 |
| PC-33 | SNIA 웨비나 "Unlocking Sustainable Data Centers: Optimizing SSD Power Efficiency and Liquid Cooling for AI Workloads": 발표사 **Solidigm·Samsung·KIOXIA America**. 주제: NVMe 전력 튜닝(와트당 성능), 컨트롤러 구조(HW 오프로드·연산 스토리지), 팬리스 서버로 가는 액체냉각 SSD | **2025-06-10** | SNIA https://www.snia.org/educational-library/unlocking-sustainable-data-centers-optimizing-ssd-power-efficiency-and-liquid | 🟡 |
| PC-34 | ⭐ **SNIA SDC23(Wells) "Does Gen6x4 Make Sense for SSDs Claiming 25W Due to Standard Form Factor Recommendations"**: Gen5 SSD 약 **20~25W**, Gen6는 약 **35~40W** 예상(속도 2배를 전력 효율이 못 따라감). **EDSFF는 E1.S·E3.S 1T의 최대 25W를 참고(informative) 권고**. 선택지: 냉각이 어려운 폼팩터 포기 / 25W 전력 상태로 제한 / 더 높은 온도·풍량 수용 | 2023 | https://snia.org/sites/default/files/2025-05/SNIA-SDC23-Wells-Does-Gen6x4-Make-Sense-for-SSDs-Claiming-25W-Due-to-Standard-Form-Factor-Recommendations.pdf | 🟡 |
| PC-35 | E1.S 폼팩터 최대 전력(Kioxia EDSFF 설명): **5.9mm 12W, 9.5mm(대칭 인클로저) 20W**. Kioxia XD6(E1.S, OCP 사양 준수) 활성 14W(전형)·Ready 5W(전형) | 상시 | Kioxia https://www.kioxia.com/en-jp/business/ssd/solution/edsff/e1.html ; https://europe.kioxia.com/nl-nl/business/ssd/data-center-ssd/xd6.html | 🟡 |
| PC-36 | **침지 호환성**: OCP 침지 냉각 요구사항이 사용 가능한 유전 유체와 접액(wetted) 소재 호환 지침을 규정(Vertiv 설명). HDD는 **헬륨 충전 밀봉형만** 침지 가능("헬륨을 가두는 밀봉이 액체 유입도 막는다") | 2022~2025 | Vertiv https://www.vertiv.com/en-emea/about/news-and-insights/articles/blog-posts/updated-immersion-cooling-requirements-from-ocp-pave-the-way-for-increased-adoption/ ; The Register https://www.theregister.com/2022/12/01/iceotope_immersion_hard_drives/ | 🟡 |
| PC-37 | **Meta × Iceotope 단상 침지 스토리지 연구(ASME InterPACK 2022)**: OCP Bryce Canyon(4OU, 3.5" 헬륨 HDD 72개 + 단일 소켓 컴퓨트 노드 2)을 정밀 침지로 재설계, 핫스왑·냉각 이중화 유지. HDD 간 온도 편차 **<3°C**(공랭 18~19°C), 랙 수온 **최대 40°C**에서 안정 운용, **펌프 전력 <IT 전력의 5%**, 팬 진동 없음 | 2022 | Meta Research https://research.facebook.com/file/1123371848260516/Single-Phase-Immersion-Cooling-Study-of-a-High-Density-Storage-System.pdf ; Iceotope https://www.iceotope.com/company/resources/single-phase-immersion-cooling-storage | 🟡 |

---

## §3. 전력: 스토리지 비중, SSD 전력 추세, 랙 전력 예산

### 3-A. 스토리지의 전력·배출 비중 (HC A17·A18·A20·A21·A22·A24·A25에 추가)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| PC-40 | **LBNL 2024 미국 DC 에너지 보고서**: 스토리지 전력 **7TWh(2014, HDD 96%) → 16TWh(2023, 플래시 25% ≈ 4TWh) → 22TWh(2028 전망, 플래시 11TWh = 50%)**. 같은 보고서: 미국 DC 전체 58TWh(2014) → **176TWh(2023, 미국 전력의 4.4%)**, 2028년 325~580TWh(6.7~12%) | **2024-12-19** 공개 (DOE 2024-12-20 발표) | LBNL https://eta-publications.lbl.gov/publications/2024-lbnl-data-center-energy-usage-report ; LBNL 뉴스 https://newscenter.lbl.gov/2025/01/15/berkeley-lab-report-evaluates-increase-in-electricity-demand-from-data-centers/ | 🟡 |
| PC-41 | **⚠️ 파생**: 2023년 스토리지 16 / 176 = **약 9.1%**(DC 전체 전력 대비, 냉각 등 기반시설 포함 분모), 플래시 4 / 176 = **약 2.3%**. 2028년 스토리지 22 / (325~580) = **3.8~6.8%**, 플래시 11 / (325~580) = **1.9~3.4%**. 보고서의 범주 경계(스토리지 서버 CPU 포함 여부)는 원문 미확인 | 해당 없음 | PC-40 | ⚠️ 파생 |
| PC-42 | LBNL 2025 업데이트: 2030년 미국 DC 전력 기준 시나리오 **649TWh(미국 전력의 11.8%)**, 범위 521~843TWh. 스토리지 내역은 확보하지 못함 | **2026-06-18** | https://eta-publications.lbl.gov/publications/united-states-data-center-energy-2025 | 🟡 |
| PC-43 | ✅ **Microsoft GreenSKU(ISCA 2024)** 초록 원문: "**compute servers cause the majority of cloud emissions**", 그래서 저탄소 컴퓨트 서버 SKU 설계가 유망. (2차 요약: 에너지 효율 CPU + CXL로 재사용한 구형 DRAM + **재사용한 구형 SSD**, 코어당 배출 −28%, Azure 순배출 −8%) | 2024-06 | https://www.microsoft.com/en-us/research/publication/designing-cloud-servers-for-lower-carbon/ ; CMU PDL https://www.pdl.cmu.edu/PDL-FTP/CloudComputing/Wang_ISCA24_abs.shtml | ✅ (초록) / 🟡 (수치) |
| PC-44 | Meta 논문 "Provisioning to Runtime Optimization of a 100 MW-Scale AI Cluster"(arXiv 2605.24461): **150MW DC, GB200 83K개**의 전력 측정. 검색 요약상 백엔드 네트워크 = IT 랙의 11%·150MW의 8~9%, 지원 서비스 = 서버 전력의 10%, AALC = 서버 전력의 3%. **스토리지 비중은 확보하지 못함** | 2026-05 | https://arxiv.org/pdf/2605.24461 (차단) | ⚠️ (검색 요약 단일, 스토리지 미확인) |
| PC-45 | **⚠️ 파생, GB300 랙의 로컬 SSD 전력 상한**: 트레이 18개 × E1.S 8베이(PC-02) = 144개. 25W(PC-14 Micron 성능 기준)면 **3.6kW**, 20W(PC-35 E1.S 9.5mm)면 **2.9kW**. GB300 NVL72 140kW/랙(HC A14, ⚠️ 단일 출처) 대비 **약 2.6% / 2.1%**. 전 베이 장착·최대 전력 가정의 상한이며 실제 장착 수는 미확인 | 해당 없음 | PC-02·PC-14·PC-35·HC A14 | ⚠️ 파생 |
| PC-46 | Solidigm 의뢰 Signal65 100MW 모델(HC A24 확장): 검색 요약 두 건이 서로 다름. 한 요약은 "GPU+스토리지 쌍 구성에서 **스토리지가 총 전력의 약 13%**(14,000W 중 7,000W)", 다른 요약은 "QLC(61.44TB) 시 약 24%, all-TLC(30.72TB) 시 약 13%" | 2024-12 | https://signal65.com/wp-content/uploads/2024/12/Solidigm-100MW_Signal65-Insights.pdf (차단) | ⚠️ (벤더 의뢰, 요약 충돌) |

### 3-B. 드라이브 전력 추세 (qlc-essd-history §3 "전력" 행·E05·B1·B18·B19에 추가)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| PC-50 | **Samsung BM1743(QLC)**: 유휴 **5W**, "후속 버전은 **2W**까지", 읽기/쓰기 전형 **23.1W / 24.4W**(어느 용량 기준인지 원문 미확인). 61.44TB U.2 판매 개시, 122.88TB 예고 | 2024-08 (FMS 2024) | heise https://www.heise.de/en/news/FMS-Samsung-launches-fast-and-large-data-center-SSDs-9826691.html?view=print (차단) ; techradar https://www.techradar.com/pro/samsungs-largest-ssd-to-date-goes-on-sale-for-usd5-593-61-44tb-pcie-gen5-ssd-costs-only-usd0-09-gb | 🟡 |
| PC-51 | **Meta의 QLC 성능 요구식**: R + 4W ≥ **32MB/s/usable-TB**(R = 읽기, W = 쓰기). QLC 대상 워크로드는 "16~20TB HDD 시절의 **10MB/s/TB** 범위" | 2025-03 | The Register https://www.theregister.com/2025/03/07/meta_proposes_qlc_ssds_as/ ; Meta https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ (차단) | 🟡 |
| PC-52 | Meta(Ross Stenfort) FMS 2025 QLC 지침의 전력 수치: **128TB에 20W, 256TB에 30W**, 읽기 32MB/s/usable-TB·쓰기 8MB/s/usable-TB | 2025-08 | FMS 2025 DCTR-102-1 https://files.futurememorystorage.com/proceedings/2025/20250805_DCTR-102-1_Stenfort_.pdf (차단) | ⚠️ (검색 요약 단일, 원문 미확인) |
| PC-53 | **Gen6 TLC 전력 효율 발표치**: Micron 9650 25W 기준 1,120MB/s/W(PC-14), Samsung PM1763 "1.8배 이상"(PC-18), Kioxia CM10 와트 수치 미공개(PC-21). Samsung PM9A3(Gen4) 순차 쓰기 283MB/s/W(직전 188MB/s/W) | 2021~2026 | PC-14·PC-18·PC-21 ; Samsung 2021-02-23 https://www.businesswire.com/news/home/20210223005778/en/ | 🟡 |
| PC-54 | **OCP Datacenter NVMe SSD 전력 요구(시험 스크립트 경유)**: 유휴 운용 상태 평균 전력 **≤ 5W + 5%**, 임의의 연속 **1초 창**에서 전력 ≤ 해당 Power State 최대 전력 서술값. 전력 관련 요구 계열 PWR-1/3/5/6/8/9, DSSDPSS-1~3, SDSSDPS-1~15, 열 관련 THRMS·TTHROTTLE 계열 존재 | OCP 2.5~2.6 | SANBlaze OCP 2.6 Group 6 https://sanblaze.ellisys.com/scripts/OCP_2_6_Group_6.html (차단) | 🟡 / ⚠️ (요구 원문 미열람) |
| PC-55 | **OCP v2.7**: "Device Self-Reported Power"로 인증·대규모 운용 시 전력 측정을 단순화(HC C10, qlc-v6 B11의 "device measured power"와 같은 항목) | 2025-11-17 (B11) | SNIA SDC25 Stenfort https://www.snia.org/sites/default/files/2025-09/SNIA-SDC25-Stenfort-OCP-Storage-Project-Update.pdf (차단) | 🟡 |

### 3-C. 랙 전력 예산·공간 압박 (HC A12~A16, MM IR-18·IR-21·IR-44에 추가)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| PC-60 | ⭐ **Google(Madhusudan Iyengar·Amber Huffman) 원문**: "**ML will require more than 500 kW per IT rack before 2030**." "the densification of each IT rack, where **every millimeter of space in the IT rack is used for tightly interconnected 'xPUs'** (e.g. GPUs, TPUs, CPUs)." ±400VDC로 전원 부품·배터리를 IT 랙 밖으로: "an AC-to-DC sidecar power rack that disaggregates power components from the IT rack. This solution improves the end-to-end efficiency by ~3% **while enabling the entire IT rack to be used for xPUs**." Mt Diablo는 **Meta·Microsoft와 OCP에서** 전기·기계 인터페이스 표준화. 액체냉각 ML 서버는 공랭 대비 "**nearly half the geometrical volume**", 물은 공기 대비 단위 부피당 열 운반 약 4,000배, 2,000+ TPU Pod에 GW 규모 배치·가동률 약 99.999%, 5세대 CDU **Project Deschutes**를 OCP에 기여 예정, 현 세대 100kW → 최대 1MW 랙 | **2025-04-29** | https://cloud.google.com/blog/topics/systems/enabling-1-mw-it-racks-and-liquid-cooling-at-ocp-emea-summit | ✅ |
| PC-61 | 같은 방향의 2차 사례: Micron "8-GPU 시스템 8U → 2U"(PC-15), Meta 공랭 홀 6랙 중 컴퓨트 2랙(MM IR-44), NVIDIA 2027년 1MW 랙(HC A12) | 해당 없음 | PC-15 ; MM IR-44 ; HC A12 | 🟡 |
| PC-62 | **하이브리드 냉각이 단기 표준**: 직접 칩 냉각이 랙 열의 **약 70~80%**를 제거하고 나머지는 공기, 공랭 설계 상한 약 15kW/랙, 액체냉각 200kW+; 액체냉각 시장 2025년 약 $3B → 2029년 약 $7B(Verdantix) | 2025~2026 | Verdantix https://www.verdantix.com/insights/blog/hybrid-data-centre-cooling-emerges-as-the-near-term-solution-for-ai-factories | 🟡 |

---

## §4. 호스트가 SSD 전력·열을 측정·제한하는 인터페이스

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| PC-70 | ⭐ **NVMe 2.3 전력 기능이 nvme-cli 병합 libnvme에 정의됨**(master `f938b92`, 2026-10-02): Set/Get Features **FID 23h Power Limit**, **24h Power Threshold**, **25h Power Measurement**, 26h Voltage Threshold, 27h Voltage Measurement, 28h Rate Limiting. **Power Measurement 로그 LID 25h**: 측정 횟수, 평균 구간 전력(AIPWR), 최대 구간 전력(MIPWR)과 시각, **히스토그램 bin 250mW 고정**, 측정 오차율(0~100%). **SMART/Health 로그 신규 필드**: "**Operational Lifetime Energy Consumed**"(제조 이후 누적 **Wh**, wrap 없음), "**Interval Power Measurement**"(직전 **1초** 평균 전력). Identify Controller CTRATT 비트 **PLS(Power Limit Support)·PMS(Power Measurement Support)·VMS**, 필드 **MUP**(전력 제한 해제 시 PS0 최대 전력), **IPMSR**(측정 샘플 간격), **MSMT**(최대 측정 중지 시간). 상태 코드 3Eh "**Invalid Power Limit**: 지정 한도가 모든 운용 전력 상태를 금지" | 2026-10-02 | `libnvme/src/nvme/nvme-types-base.h` https://github.com/linux-nvme/nvme-cli | ✅ |
| PC-71 | ✅ **구현 이력(커밋 원문)**: 2025-12-30 "types: add NVMe 2.3 opcode, fid and lid definitions"(Tokunori Ikegami) → **2026-01-25 `feat power-limit` 명령** → 2026-02-02 `power-thresh` → **2026-03-04 `power-meas` 기능**(Jim Munn, `@micron.com`) → 2026-03-06 NVMe 2.3 id-ctrl 필드 cdpa·mup·ipmsr·msmt·ccrl(Jeff Lien, `@sandisk.com`) → **2026-03-09 `power-measurement-log`(LID 25h) + SMART에 OLEC·IPM 출력**(Micron) → 2026-08-20 **Idle I/O Exit Latency Limit(TP4204)**(SUSE) → 2026-09-23 Power State Descriptor **Max Bandwidth** 필드 | 2025-12~2026-09 | nvme-cli 커밋 `836ea002`, `b7716089`, `935878c4`, `a333a9e1`, `8a9d01da`, `e06fe27a` | ✅ |
| PC-72 | `nvme feat power-limit` 문서: `--pwrlm`(컨트롤러에 적용할 전력 한도), `--pvlmt`(Power Limit Type, 정적/동적), `--save`(모든 전력 상태·리셋 후 유지). `feat power-meas`: 샘플링 주기·측정 지속 시간 설정. `feat power-thresh`: 전력 임계값·유형 | 2026 | `Documentation/nvme-feat-power-limit.txt` 등 | ✅ |
| PC-73 | **NVMe 2.3 발표(2025-08-05)**: "**Power Limit Config**: NVMe 장치 최대 전력을 완전히 제어, 전력 여유가 제한된 구형 시스템에 특히 중요", "**Self-reported Drive Power**: 호스트가 장치 전력과 수명 전체 소비 전력을 측정·감시, 유지보수·지속가능성 대응". 같은 발표에 Configurable Device Personality·Rapid Path Failure Recovery·Sanitize Per Namespace | **2025-08-05** | Businesswire https://www.businesswire.com/news/home/20250805262591/en/ ; NVMe https://nvmexpress.org/nvm-express-publishes-set-of-nvme-specifications-enabling-new-capabilities-for-ai-cloud-enterprise-and-client-storage/ (차단) | 🟡 |
| PC-74 | ✅ **Power State Descriptor(전력 상태별 서술)**: MP(해당 상태의 지속 최대 전력), ENLAT/EXLAT(진입·이탈 지연 µs), 상대 읽기/쓰기 처리량·지연 순위, **IDLP(유휴 30초 전형 전력)**, **ACTP(지정 워크로드 10초 최대 평균 전력)**, 비상 전원 상실 복구·볼트 시간, 신규 **MBW/MBWS(이 전력 상태에서 얻을 수 있는 최대 대역폭)**, **MIIELL(최소 Idle I/O Exit Latency Limit, 100µs 단위)** → 호스트가 "전력 상태별 대역폭"을 읽고 고를 수 있는 필드가 생김 | 현행 | `struct nvme_id_psd` (위 헤더) | ✅ |
| PC-75 | ✅ **Host Controlled Thermal Management(HCTM)**: Identify의 HCTMA·**MNTMT/MXTMT(호스트가 지정 가능한 최소·최대 온도, Kelvin)**, FID 10h. nvme-cli `feat hctm` 문서: TMT1 = "컨트롤러가 **저전력 상태로 전환하거나 스로틀링을 시작**하는 온도 임계(Kelvin)", TMT2 = 강한 스로틀링 | 현행 | 위 헤더 ; `Documentation/nvme-feat-hctm.txt` | ✅ |
| PC-76 | ✅ **OCP 확장(nvme-cli `plugins/ocp`)**: **DSSD Power State 기능(FID C7h)**, 문서 원문 "DSSD Power State to set in watts"(와트 단위 지정). Device Capabilities 로그: Minimum Valid DSSD Power State, **DSSD Power State Descriptors**. SMART Extended(C0h): **Thermal throttling event count·current status, Power State Change Count, Max temperature recorded, Max peak power capability, Current max avg power, Lifetime power consumed**. 텔레메트리 통계 ID: 현재 NVMe/DSSD 전력 상태, TMT1·TMT2 전이 횟수, 온도 센서 1~8 | 현행 | `plugins/ocp/ocp-nvme.h`, `ocp-smart-extended-log.h`, `ocp-telemetry-decode.h`, `Documentation/nvme-ocp-set-dssd-power-state-feature.txt` | ✅ |
| PC-77 | ✅ **Linux 커널 NVMe 드라이버(master, 2026-10-03 취득)**: 자동으로 설정하는 전력 기능은 **APST**뿐(`default_ps_max_latency_us = 100000`, 1차 타임아웃 100ms·지연 허용 15ms, 2차 2,000ms·100ms). `include/linux/nvme.h`에 HCTM(0x10)·APST(0x0c)·PLM은 정의돼 있으나 **Power Limit(0x23)·Power Measurement(0x25)는 없음**, `core.c`는 HCTM을 설정하지 않음. `hwmon.c`는 온도 임계값을 hwmon으로 노출. **⚠️ 파생**: 오늘 전력 상한·측정은 사용자 공간 패스스루(nvme-cli)로만 쓸 수 있다 | 2026-10-03 | https://raw.githubusercontent.com/torvalds/linux/master/drivers/nvme/host/core.c ; …/include/linux/nvme.h ; …/drivers/nvme/host/hwmon.c | ✅ / ⚠️ 파생 |
| PC-78 | ✅ **Linux "PCIe cooling device"(Intel, 2023~2024)**: 열 관리 프레임워크에 `PCIe_Port_Link_Speed_` 냉각 장치를 등록, **PCIe 링크 속도를 낮춰 열을 줄임**(대역폭 컨트롤러 `bwctrl` 사용, 상태 0 = 최대 속도). 호스트 쪽에서 SSD 링크를 열 스로틀하는 경로 | 현행 | https://raw.githubusercontent.com/torvalds/linux/master/drivers/thermal/pcie_cooling.c ; …/drivers/pci/pcie/bwctrl.c | ✅ |
| PC-79 | **⚠️ 파생, 공개 기여 메타데이터(판단 아님)**: nvme-cli 커밋 작성자 메일 도메인별 건수(2025-01-01 이후): micron 218, sandisk 60, **samsung 54**, wdc 49, solidigm 46, kioxia 0, skhynix 0. 커밋 메시지에 power·thermal·energy가 들어간 전력 기능 구현은 Micron·SanDisk·독립 기여자·SUSE 작성이며, samsung.com 작성 건은 키워드 일치 0건 | 2025-01~2026-10 | nvme-cli bare clone `git log` | ⚠️ 파생 |

---

## §5. 고객·시스템 업체의 공동설계 (SSD 열·전력 포락선을 누가 정하나)

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| PC-80 | **NVIDIA가 SSD 벤더와 냉각 제약을 함께 풀었다는 1차 진술**: Solidigm 보도자료 "worked with NVIDIA to address eSSD liquid-cooling challenges, such as hot swap-ability and single-side cooling constraints", GTC 2025 공동 시연 | PC-10·PC-12 | 🟡 |
| PC-81 | **냉각판은 호스트(트레이)가 정하고 SSD는 접촉면을 맞춘다**: Vera Rubin 트레이 냉각판이 SSD에 압력을 유지하고 정비 시 비켜 세움(PC-04), SNIA "host-defined cold plates and SSD-defined surfaces"(PC-32), SFF 접촉면 평탄도·압력 규격(PC-30·PC-31) | PC-04·PC-30~PC-32 | 🟡 |
| PC-82 | **하이퍼스케일러가 랙·폼팩터 전력 포락선을 공동 정의**: Google·Meta·Microsoft Mt Diablo(±400VDC, 전원 사이드카, ✅ PC-60), Meta E2 1PB·80W 제안(C1-31·D-09), OCP Datacenter NVMe SSD 사양 작성 주체 Meta·Microsoft·HPE·Dell·Google(PC-54·PC-55), Kioxia·Meta·Microsoft E1.S 공동 백서(qlc-essd-history §2.4) | 위 ID | ✅ / 🟡 |
| PC-83 | **NVIDIA MGX 생태계**: 냉각 부품 파트너(Jentech·Cooler Master·Eaton)는 GPU/CPU 냉각판·NVLink 트레이 냉각·매니폴드 공급. Solidigm 9.5mm E1.S 액체냉각형이 NVIDIA MGX short-form edge AI 서버에 통합 검증됐다는 서술 | Jentech https://www.jentech.com.tw/post/nvidia-ai-factory-mgx-ecosystem-jentech ; Futurum https://futurumgroup.com/insights/liquid-cooled-ssd-solidigm-and-nvidias-innovative-solutions-six-five-media-at-nvidia-gtc/ | 🟡 |
| PC-84 | **Supermicro DLC-2(2025-05)**: 냉각판 대상 = CPU·GPU·메모리·PCIe 스위치·전압 조정기(**SSD는 목록에 없음**), 입수 최대 45°C, 랙 내 CDU 250kW, 주장: 공랭 대비 DC 전력 최대 −40%, TCO 최대 −20%, 소음 약 50dB | Supermicro https://www.supermicro.com/en/pressreleases/supermicros-dlc-2-next-generation-direct-liquid-cooling-solutions-aims-reduce-data (차단) ; insideHPC https://insidehpc.com/2025/05/supermicro-announces-dlc-2-direct-liquid-cooling-updates/ | 🟡 / ⚠️ (절감률은 벤더 주장) |
| PC-85 | **삼성그룹 인접 사업(메모리사업부 아님)**: 삼성전자가 독일 HVAC 기업 **FläktGroup을 €1.5B에 인수(2025-11 종결)**. 2026-08-12 인도 푸네 공장 가동, 2026-08 광주에 2028년까지 HVAC 라인 신설(약 2,400억 원·$158M), 주력 품목 = **CDU(냉각수 분배 장치)**, 팬월·CRAH·AHU | sammobile https://www.sammobile.com/?p=16673754 ; dealroom https://dealroom.co/news/145842-samsung-to-invest-240b-won-in-korean-plant-for-ai-data-centre-cooling/ ; Verdict https://www.verdict.co.uk/samsung-flaktgroup-e1-5bn/ | 🟡 |

---

## §6. 반증·긴장 관계

| ID | 반증 | 출처 | 등급 |
|---|---|---|---|
| PC-90 | **SSD 전력은 GPU 랙에서 작다**: GB300 랙 로컬 E1.S 전부 최대 전력이어도 약 2~3%(PC-45), IEA 스토리지 약 5%(HC A20), Microsoft "컴퓨트 서버가 클라우드 배출의 대부분"(PC-43). 다만 Azure 범용 클라우드에서는 스토리지가 운영 배출의 33%(HC A17) | PC-43·PC-45 ; HC A17·A20 | ✅ / ⚠️ 파생 |
| PC-91 | **액체냉각의 동인은 GPU다**: SNIA 블로그 "GPU·AI 가속기가 주된 동력"(PC-32), Google 1MW 랙 글의 액체냉각 근거도 xPU 밀도(PC-60). SSD는 "서버가 완전 액체냉각이 되면 통합돼야 하는" 쪽으로 서술됨 | PC-32·PC-60 | 🟡 / ✅ |
| PC-92 | **같은 클러스터에서도 스토리지 서버는 공랭**: xAI Colossus(Supermicro)는 GPU 랙을 액체냉각(랙당 4U 서버 8대 + CDU)하면서, 스토리지 서버는 2.5" NVMe 베이에 전면 흡기 구조, 팬 냉각 + **후면도어 열교환기**로 시설 수냉 루프에 열을 넘겨 "액체냉각·공랭 장비를 함께" 운용. (MM NG-06의 "하이퍼스케일러 명시 진술 없음"은 그대로이며, 이것은 하이퍼스케일러가 아닌 사례) | STH https://servethehome.com/inside-100000-nvidia-gpu-xai-colossus-cluster-supermicro-helped-build-for-elon-musk (기사 일자 검색 결과에 미표시) | 🟡 |
| PC-93 | **Blackwell 두 세대는 SSD를 공랭으로 출하**: GB200(PC-01)·GB300(PC-02). SSD 액체냉각이 랙 표준 구성으로 들어온 것은 Vera Rubin(2026 하반기 공급, PC-03~PC-05)부터 | PC-01~PC-05 | 🟡 |
| PC-94 | **대부분의 시설은 아직 저밀도**: Uptime 2026 최빈 랙 11kW(MM IR-21), 공랭 상한 약 15kW(PC-62), Google은 레거시 공랭 시설용 Brazos를 GA(MM IR-15). 하이브리드(액체 70~80% + 공기)가 단기 표준(PC-62) | MM IR-15·IR-21 ; PC-62 | ✅ / 🟡 |
| PC-95 | **침지 SSD는 데모·지역 사례 수준**: Solidigm SC25 시연(PC-13), DapuStor·ZTE 200대(PC-22), SSSTC 포트폴리오(PC-23), 삼성·Chemours 유체 인증(PC-17). 하이퍼스케일러가 SSD를 대규모 침지 운용한다는 1차 진술은 찾지 못함(NG-08) | PC-13·PC-17·PC-22·PC-23 | 🟡 |
| PC-96 | **에너지 절감 수치는 대부분 벤더 주장**: Chemours −40%(PC-17), Supermicro −40%(PC-84), Micron 팬 전력 −98%(PC-15), Solidigm·Micron QLC 전력 절감(HC A24·A25·B18·B19) | 위 ID | ⚠️ |
| PC-97 | **⚠️ 파생: 공개된 액체냉각 SSD는 전부 TLC·컴퓨트 트레이 등급**: PS1010 3.84/7.68TB, NX1 ≤15.36TB, R6 8TB, 9650 ≤30.72TB, CM10 ≤61.44TB(PC-24). 같은 시기 발표된 고용량 QLC(DapuStor R6060 512TB, Kioxia LC9 245TB, Micron 6600 ION 245TB, Samsung BM1773 245TB)에는 냉각판 SKU 언급이 없다(NG-03) | PC-24 ; HC B1·B2·B7 ; kv-cache §2 | ⚠️ 파생 |
| PC-98 | **Gen6 SSD 전력 상승과 폼팩터 상한의 긴장**: Gen6 35~40W 예상 vs EDSFF 참고 상한 25W(PC-34), 액체냉각 E1.S 35~40W 지원(PC-32). 즉 25W를 넘는 구간은 냉각판 또는 전력 상태 제한이 필요하다는 것이 표준 단체 발표의 서술 | PC-32·PC-34 | 🟡 |

---

## §7. 부정 확인 (검색했으나 확보하지 못한 것)

- **NG-01. SK hynix 자사 브랜드 액체냉각 SSD.** 없음. 검색 결과는 자회사 Solidigm PS1010만 반환. `SK hynix liquid cooled SSD cold plate eSSD 2026`.
- **NG-02. 삼성 콜드플레이트 E1.S/E3.S SKU의 명시적 발표(제품명·냉각판 키트·두께).** 없음. PM1763 "D2C 냉각 최적화"(PC-18)와 FMS 2025 "액체냉각 기술 전시"(PC-16)뿐. FMS 2026 삼성 액체냉각 전시 내용도 확인 못함. `Samsung liquid-cooled SSD E1.S cold plate FMS 2026 OR OCP 2025`.
- **NG-03. 122TB 이상 고용량 QLC의 냉각판(액체냉각) SKU.** 없음(PC-97).
- **NG-04. OCP Datacenter NVMe SSD 사양의 전력 요구 원문(PWR-x 값, DSSD Power State 단계 와트값).** opencompute.org 차단. 시험 스크립트 요약(PC-54)만 확보.
- **NG-05. NVIDIA 1차 문서의 Vera Rubin 컴퓨트 트레이 E1.S 개수·SSD 냉각 요구 사양.** developer.nvidia.com·docs.nvidia.com 차단, 2차 서술 충돌(PC-06). 검색 예산 소진으로 추가 확인 불가.
- **NG-06. AI 클러스터에서 스토리지가 차지하는 전력 비중의 하이퍼스케일러 1차 수치.** Meta 150MW 논문의 스토리지 항목 미확보(PC-44). Google·AWS 1차 진술 없음. (HC N1·N2와 같은 결론)
- **NG-07. Google의 스토리지 전력 효율(W/TB 등) 1차 진술.** cloud.google.com 블로그 검색에서 없음. Colossus 글은 비용·I/O 밀도만 다룸.
- **NG-08. 하이퍼스케일러의 SSD 대규모 침지 운용 진술.** 없음(PC-95).
- **NG-09. NVMe 2.3 규격 원문(Power Limit의 정적/동적 유형 정의, Power Threshold 이벤트 동작).** nvmexpress.org 차단, 구현 헤더·문서만 확인(PC-70~PC-72).
- **NG-10. Linux 커널의 NVMe Power Limit·Power Measurement 지원.** 없음(PC-77, 사실로 확인된 부재).
- **NG-11. 액체냉각 SSD의 가격 프리미엄·TCO 수치, 현장 신뢰성 데이터.** 없음.
- **NG-12. Micron 블로그(PC-15) 게시 일자, Samsung BM1743 전력 수치의 기준 용량(PC-50).** 미확인.
- **NG-13. Meta FMS 2025 QLC 전력 지침(128TB 20W, 256TB 30W)의 원문.** 미열람(PC-52 ⚠️).

---

## §8. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. 🟡 (SSD 냉각의 세대 전환)** "NVIDIA GB200·GB300 랙은 CPU·GPU만 액체냉각하고 SSD는 공랭으로 남겼지만, 2026년 하반기 공급되는 Vera Rubin NVL72는 팬이 없는 100% 액체냉각 랙이며 컴퓨트 트레이의 E1.S SSD도 냉각판으로 식힌다." (PC-01~PC-05)

> **2. 🟡 (경쟁사 출시 순서)** "콜드플레이트 냉각 SSD는 Solidigm이 2025년 3월 NVIDIA와 공동 시연하고 9월 출시했으며, Micron(2025-07)과 Kioxia(2026-07)가 뒤따랐다. 삼성은 2026년 7월 PM1763을 'D2C 냉각 최적화' 제품으로 양산했다." (PC-10·PC-12·PC-14·PC-18·PC-20·PC-21)

> **3. 🟡 (표준)** "SNIA SFF는 E1.S 9.5mm와 E3.S의 냉각판 접촉면(평탄도·거칠기·최대 압력)을 규격화했고, 액체냉각 E1.S 9.5mm는 35~40W까지 지원한다고 발표했다. 반면 EDSFF의 공랭 참고 상한은 25W다." (PC-30~PC-32·PC-34)

> **4. ✅ (호스트 전력 인터페이스)** "NVMe 2.3의 전력 한도(Power Limit), 전력 측정(Power Measurement), 수명 누적 에너지(Wh) 필드가 2025년 12월~2026년 3월 nvme-cli에 구현됐으나, Linux 커널 NVMe 드라이버는 아직 이를 지원하지 않는다." (PC-70·PC-71·PC-77)

> **5. ✅ (랙 공간은 xPU 몫)** "Google은 2030년 이전 ML 랙이 500kW를 넘을 것으로 보고, 전원 부품을 랙 밖 사이드카로 빼 'IT 랙 전체를 xPU에 쓰게' 하는 설계를 Meta·Microsoft와 OCP에서 표준화하고 있다." (PC-60)

> **6. ✅/⚠️ (전력 비중, 반증 병기용)** "Azure 범용 클라우드에서 스토리지는 운영 배출의 33%를 차지하지만, GB300 AI 랙에서는 로컬 SSD 전부를 최대 전력으로 잡아도 랙 전력의 약 2~3%다(파생 산술)." (HC A17·PC-45)

> **7. 🟡 (반증)** "지금까지 공개된 액체냉각 SSD는 모두 TLC 컴퓨트 트레이 등급(3.84~61.44TB)이며, 122TB 이상 고용량 QLC의 냉각판 제품은 확인되지 않았다." (PC-97·NG-03)

> **❌ 쓰지 말 것**
> - "하이퍼스케일러가 액체냉각 SSD를 요구한다" → 요구 주체로 확인된 것은 NVIDIA(랙 설계)와 SSD 벤더 공동 작업(PC-80)이며, 하이퍼스케일러 1차 요구 진술은 없다.
> - "스토리지 서버도 액체냉각으로 간다" → 고용량 QLC 냉각판 SKU 없음(NG-03), xAI는 스토리지 서버를 공랭으로 운용(PC-92).
> - "삼성이 콜드플레이트 E1.S를 출시했다" → 확인된 공식 문구는 "D2C 냉각 최적화"까지(NG-02).
> - "SSD가 AI 데이터센터 전력의 상당 부분을 쓴다" → 출처별 9%(LBNL 파생), 5%(IEA), 2~3%(GB300 랙 파생)로 범위가 넓다. 범위를 함께 쓸 것.
> - "Linux에서 SSD 전력 상한을 바로 쓸 수 있다" → 커널 미지원, nvme-cli 패스스루만(PC-77).
> - 벤더 에너지 절감률(−40%, −98% 등)을 사실처럼 인용 → 벤더 주장 표기 필수(PC-96).

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| nvme-cli(master `f938b92`, 2026-10-02) + 병합 libnvme | https://github.com/linux-nvme/nvme-cli (`libnvme/src/nvme/nvme-types-base.h`, `Documentation/nvme-feat-{power-limit,power-meas,power-thresh,hctm}.txt`, `Documentation/nvme-ocp-set-dssd-power-state-feature.txt`, `plugins/ocp/*.h`) | FID 23h~28h, LID 25h, SMART OLEC·IPM, CTRATT PLS·PMS·VMS, MUP·IPMSR·MSMT, PSD MBW·MIIELL·IDLP·ACTP, HCTM, OCP DSSD Power State(C7h)·C0h 전력·열 필드 |
| nvme-cli 커밋 이력(bare clone) | `git log` | NVMe 2.3 정의(2025-12-30)·power-limit(2026-01-25)·power-meas(2026-03-04)·power-measurement-log(2026-03-09)·TP4204(2026-08-20), 작성자 도메인 |
| Linux 커널 master(2026-10-03 취득) | https://raw.githubusercontent.com/torvalds/linux/master/drivers/nvme/host/core.c ; …/hwmon.c ; …/include/linux/nvme.h ; …/drivers/thermal/pcie_cooling.c ; …/drivers/pci/pcie/bwctrl.c | APST 기본값, Power Limit/Measurement 미정의, HCTM 미설정, 온도 임계 hwmon, PCIe 링크 속도 냉각 장치 |
| Google Cloud 블로그 "Enabling 1 MW IT racks and liquid cooling at OCP EMEA Summit"(2025-04-29) | https://cloud.google.com/blog/topics/systems/enabling-1-mw-it-racks-and-liquid-cooling-at-ocp-emea-summit | 500kW 이상/2030 전, "every millimeter … xPUs", 사이드카로 "entire IT rack … for xPUs", Mt Diablo(Meta·Microsoft), Deschutes CDU |
| Microsoft Research GreenSKU(ISCA 2024) 출판물 페이지 | https://www.microsoft.com/en-us/research/publication/designing-cloud-servers-for-lower-carbon/ | 초록 "compute servers cause the majority of cloud emissions" |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| kv-cache-qlc-tech-stack §2 "PM1763 D2C 액체냉각", "Kioxia CM10 콜드플레이트" | 냉각 지원 폼팩터(CM10은 E3.S·E1.S 9.5mm), OCP 2.7 준수, Kioxia 첫 DLC 제품은 NX1(2026-07-29)이라는 발표 문구 추가(PC-20·PC-21). PM1763 효율 1.8배·폼팩터·용량 충돌(PC-18·PC-19) |
| samsung-ssd-design-wins §1.1 "액체 냉각 최적화 지원 언급(Med)" | 보도자료 문구 "optimized for liquid-cooled server environments through D2C"와 효율 1.8배를 2차 경유로 재확인(PC-18), 삼성의 침지 유체 인증(PC-17)·FMS 2025 "열 제어" 요구 정의(PC-16) 추가 |
| HC B7 "DapuStor … liquid-cooled SSDs"(제목만) | 액체냉각 제품은 512TB QLC가 아니라 **R6 8TB TLC E1.S**임을 명시(PC-22) |
| HC C10·qlc-v6 B11 "OCP 2.7 device measured power" | 표준 구현 쪽 실체(NVMe 2.3 Power Measurement 로그·SMART OLEC·IPM, OCP C0h 전력 필드)를 ✅로 확보(PC-70·PC-76) |
| HC A17·A20(스토리지 비중) | LBNL 미국 스토리지 TWh와 파생 비중(PC-40·PC-41), GreenSKU "컴퓨트가 배출 대부분"(PC-43) 추가. 출처별 비중 범위가 넓다는 점을 §8 문장 6에 명시 |
| MM NG-06("스토리지는 공랭 홀에 남는다" 진술 없음) | 결론 유지. 비하이퍼스케일러 사례로 xAI 스토리지 서버 공랭 + 후면도어(PC-92) 추가 |
| qlc-essd-history §3 "전력" 행(W/TB 추세) | Samsung BM1743 유휴 5W→2W·활성 23~24W(PC-50), Meta R+4W ≥ 32MB/s/TB(PC-51), Meta 128TB 20W·256TB 30W(PC-52, ⚠️) 추가 |
