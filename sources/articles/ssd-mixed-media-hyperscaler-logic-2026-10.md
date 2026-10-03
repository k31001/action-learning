# SSD 혼합 매체(Mixed Media) 하이퍼스케일러 논리 검증 원장: Kioxia·Solidigm 인용 검증, WAF·꼬리 지연·용량 손실·슬롯 통합·워크로드 구성 데이터, 반증

**수집일**: 2026-10-03
**수집자**: Research Agent (Mixed Media 논리 검증) - 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(GitHub 저장소: CSAL 아티팩트 README·잡 파일, FAST'26 논문 변환본, libnvme 헤더) 기반 팩트 원장
**용도**: 사용자 제공 분석 [user-mixed-media-hyperscaler-analysis-2026-10-03.md](../raw-notes/user-mixed-media-hyperscaler-analysis-2026-10-03.md)(이하 **사용자 분석**)이 인용한 외부 출처(Kioxia "2026년 9월 mixed-media SSD 개념", Solidigm QLC·CSAL 진술)의 검증과, 그 논리 5단(① QLC $/TB 유지 ② p99~p9999 쓰기 지연 안정화 ③ 소형 랜덤 쓰기를 pSLC가 흡수해 QLC WAF 저감 ④ 별도 TLC/SLC 성능 SSD의 "drive slot tax" 제거 ⑤ FDP 등 호스트 배치와 결합)을 지지·반박하는 차트용 데이터 수집.

**등급**: ✅ 1차 원문 직접 열람 / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·가정 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(WebFetch·curl 모두): `www.snia.org`, `americas.kioxia.com`, `blog-us.kioxia.com`, `lasvegassun.com`, `www.blocksandfiles.com`, `rutab.net`, `acsweb.ucsd.edu`, `yanbozyb.github.io`, `zenodo.org`, `dl.acm.org`, `arxiv.org`, `web3.arxiv.org`, `www.semanticscholar.org`, `api.semanticscholar.org`, `scholar.archive.org`, `www.theregister.com`, `www.wiwynn.com`, `sdmsdfwdriver.blob.core.windows.net`(Solidigm 문서 저장소), `servomarket.ru`, `www.asipartner.com`, `at-web1.www.anandtech.com`, `www.usenix.org`. 직전 원장([ssd-mixed-media-infra-reuse-2026-10.md](ssd-mixed-media-infra-reuse-2026-10.md) §0-1)의 차단 목록(`solidigm.com`, `kioxia.com`, `files.futurememorystorage.com`, `terrapinn.com`, `nvmexpress.org`, `opencompute.org` 등)도 그대로다. **직접 열람이 가능했던 것은 GitHub(`git clone`, `raw.githubusercontent.com`, GitHub 코드 검색)뿐**이다. 따라서:
- **✅는 다음에만 붙였다**: ① `ARDICS/CSAL_AE`(CSAL EuroSys'24 아티팩트 평가 저장소, commit `588db75`, 2023-11-06) README·잡 파일 원문, ② `lqhl/awesome-system-papers`(commit `c5e525b`, 2026-09-14)에 수록된 FAST'26 논문 "Here, There and Everywhere"의 PDF→마크다운 변환본(본문 문장 그대로 인용, 그림 수치는 변환본에 없음), ③ libnvme `types.h`(SMART 필드 정의), ④ 이전 세션 스크래치에 내려받아 둔 FairyWREN 논문 PDF 텍스트.
- Kioxia FMS 2025 발표 PDF(Klemm), FMS 2026 세션 초록(Sayed), SNIA SDC 2026 세션·연사 페이지, Solidigm 기술 페이지·제품 브리프, CSAL 논문·백서, 클라우드 블록 트레이스 논문, DT-RAID 논문은 **모두 검색 요약 경유(🟡)** 다. 같은 PDF에서 검색 요약끼리 수치가 다르게 나오면 ⚠️ 충돌로 표기했다.

**0-2. 용어.** "혼합 매체"의 세 뜻((a) 장치 수준 = 한 드라이브 안 호스트 가시 영역, (b) 시스템 수준 = 서로 다른 장치를 호스트 소프트웨어가 묶음, (c) 비가시 SLC 캐시)은 직전 원장 §0-2를 따른다. 주의할 이름 충돌 두 가지:
- **Solidigm의 "Mixed Media(MM)"는 (b) 시스템 수준**이다. CSAL이 별도 SLC SSD와 QLC SSD를 묶는 구성을 MM이라 부른다(MX-12). 사용자 분석이 인용한 Solidigm 진술은 모두 이 구성에 대한 것이다.
- **Alibaba "Dual-mode SSD"(SDC 2018)는 Open-Channel 모드와 표준 NVMe 모드를 겸하는 드라이브**로, pSLC+QLC와 무관하다. DapuStor J5060 "dual-mode"(pSLC+QLC)와 섞지 말 것(MX-78).

**0-3. 기존 원장과의 관계.** 다음 사실은 **ID로만 참조**하고 반복하지 않는다. 직전 원장(이하 **MMR**): MM-04(DapuStor), MM-05·MM-06(Kioxia FMS 2025·2026), MM-09(Sandisk UltraQLC), MM-20~MM-26(CSAL·Alibaba·VAST), MM-28(Colossus L4), ST-11·ST-12(Linux FDP 조회·RUH 매체 필드 부재), EC-01~EC-12, CD-01~CD-10, NG-01~NG-14, IR-37(Meta QLC 블로그). [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **WC**): F-43, X-01. [qlc-v6-waf-measurement-trend-2026-09.md](qlc-v6-waf-measurement-trend-2026-09.md)(이하 **WM**): W17~W21, W38. [qlc-v7-placement-cases-waf-2026-09.md](qlc-v7-placement-cases-waf-2026-09.md)(이하 **PC7**): E-06. [qlc-v8-dwpd-price-inference-2026-09.md](qlc-v8-dwpd-price-inference-2026-09.md)(이하 **DP8**): P-06. [datacenter-types-storage-requirements-2026-10.md](datacenter-types-storage-requirements-2026-10.md)(이하 **DT**): DT-13, DT-14, DT-20~DT-22.

---

## §1. 사용자 분석 주장 검증 표 ("검증 결과")

판정: **확인** / **부분 확인** / **미확인**(출처를 찾지 못함) / **반증**(공개 데이터가 반대). 근거 ID의 상세는 아래 각 절.

| # | 사용자 분석의 주장(요지) | 판정 | 근거 ID | 비고 |
|---|---|---|---|---|
| U-01 | "Kioxia가 **2026년 9월** 공개한 mixed-media SSD 개념" | **부분 확인** | MX-01~MX-06 | 개념 자체는 Kioxia가 **FMS 2025(2025-08-06, Klemm "Mixed Mode SSD")** 와 **FMS 2026(2026-08-04~06, Sayed 세션)** 에서 발표했다. **"2026년 9월"에 해당하는 Kioxia 공개물(블로그·보도자료·백서·SDC 2026 발표)은 찾지 못했다.** 시점 표기는 근거 없음 |
| U-02 | Kioxia 구조는 **두 개의 별도 namespace**(pSLC NS + QLC NS)를 전제 | **확인**(🟡) | MM-06, MX-04 | FMS 2026 초록: "a small, high-endurance SLC namespace alongside a large, high-density QLC namespace within a single drive" |
| U-03 | Kioxia 예시 = **pSLC 약 1~6%** | **미확인**(Kioxia 출처 기준) | MX-01, MX-40, C-1 | Kioxia가 공개한 수치는 **"VoC: pSLC는 최대 QLC 용량의 ½%~2%"** 와 구성 비 **1:8(12.5%)·1:4(25%)·1:2(50%)** 다. "1~6%"라는 Kioxia 문구는 없다. 다만 1~6%는 기존 사례 범위(0.47~6.25%, C-1)와 겹치고, "NAND의 1~6%"로 읽으면 사용자 pSLC는 공칭의 0.25~1.5%라 Kioxia VoC와 일부 겹친다(⚠️ 파생, MX-41) |
| U-04 | pSLC의 용량 페널티는 **약 4배** | **확인**(산술) + 실측은 더 불리 | EC-01, EC-02, MX-41 | 이론 4:1(비트/셀). DapuStor 실제 전환비 **5:1**(QLC ≈4TB → pSLC 800GB) |
| U-05 | Kioxia가 "**별도 performance tier SSD 필요성 감소**"를 직접 지적 | **부분 확인**(🟡, 2025-08 자료) | MX-02 | Klemm FMS 2025: **"Slot Tax"**(SLC SSD가 드라이브 슬롯을 통째로 차지해 전체 용량 감소), **"Reduce FRUs"**, "소수의 별도 SLC SSD 대비 모든 SSD가 IOPS·대역 제공, PCIe 레인 사용 균형". 2026-09 자료로는 미확인 |
| U-06 | Kioxia: mixed media와 **FDP를 결합**하면 small/random write를 pSLC에서 받아 sequential stream으로 QLC에 저장 | **부분 확인** | MM-06, MX-04, MX-12, ST-12 | "소블록·메타데이터·쓰기 버퍼 → SLC NS, 큰 정렬 쓰기 → QLC NS, WA 감소"는 확인(🟡). **FDP 결합 진술은 Kioxia 혼합 매체 자료에서 찾지 못했다.** MM과 FDP를 함께 거론한 것은 **Solidigm(CSAL, 시스템 수준)** 이다. 표준 FDP RUH에는 매체 필드가 없다(ST-12) |
| U-07 | Solidigm: 빠른 SLC/TLC 티어에서 쓰기를 모아 큰 순차 쓰기로 QLC에 내려 **WAF ≈1** | **확인**(🟡), 단 **구성 차이** | MX-10, MX-11, MX-13, MX-16 | Solidigm 진술은 **별도 SLC/TLC(과거 Optane) SSD + QLC SSD를 호스트 FTL(CSAL)로 묶는 시스템 수준** 구성에 대한 것이다. 단일 드라이브 내부 pSLC에 대한 진술이 아니다. "WAF ≈1"의 측정 정의도 확인 필요(MX-16) |
| U-08 | Solidigm: QLC는 AI/ML data lake·CDN 같은 read-heavy에 적합, caching·logging·journaling은 SLC급 매체 | **확인**(🟡) | MX-14 | D7-P5810 제품 브리프 문구 |
| U-09 | QLC가 random write를 계속 받으면 **p99~p9999 지연이 튄다**, pSLC가 이를 안정화 | **부분 확인** | MX-30~MX-37 | 메커니즘(QLC 프로그램 2~3ms vs SLC 50~220µs, IU 단위 RMW)과 GC로 인한 p99.9 >1ms(Alibaba, TLC 로컬 디스크)는 확인. **혼합 매체 단일 드라이브의 p99.9 이상 실측은 공개되지 않았다**(DapuStor는 평균 <8µs만). 별도 SLC급 캐시를 둔 CSAL도 포화 쓰기에서 p99.99 ≈0.5s 예시가 있어 "쓰기 버퍼 = 꼬리 지연 보장"은 성립하지 않을 수 있다(MX-35) |
| U-10 | 과거에는 고내구 SSD(SLC/TLC) + 용량 SSD(QLC) **두 종류**를 설치 | **확인** | MM-23, MM-26, IR-37, MX-74 | CSAL(Optane P5800X → SLC P5810 → TLC PS1010 캐시 + QLC), VAST(SCM + QLC), Meta(TLC 성능 티어 + QLC 중간 티어) |
| U-11 | "2 × TLC + 8 × QLC" → "8 × 혼합"으로 CAPEX·랙 TCO 하락 가능 | **미확인**(수치 없음) | EC-11, MX-50~MX-55 | 벤더·하이퍼스케일러 TCO 수치 **여전히 없음**. 유사 선례: Pure FlashArray//XL이 **전용 NVRAM 슬롯을 없애고 NVRAM을 각 DFMD에 분산**(MX-52). 용량 산술(⚠️ 파생): 같은 예에서 슬롯 2개를 아끼는 대가로 QLC 용량 **−4.0~−5.0%**(pSLC 1%) 또는 **−12.5~−15.6%**(TLC 15.36TB를 같은 용량의 pSLC로 대체)(MX-53) |
| U-12 | 하이퍼스케일러는 투명 캐시보다 **namespace 노출**을 선호 | **미확인** | NG-01, CD-03, CD-04, MX-04 | 하이퍼스케일러가 그렇게 말한 공개 기록 없음. "보이는 영역"은 **벤더(DapuStor·Kioxia) 발표**. "호스트가 의미 정보를 준다"는 원칙은 Colossus L4(MM-28)·CacheLib FDP(W17~W21)로 확인 |
| U-13 | 데이터센터 워크로드에는 small random write와 대용량 순차가 섞여 있다 | **확인**(🟡) | MX-60~MX-62 | Alibaba·Tencent 블록 스토리지: 볼륨의 **91.5% / 92.3%가 쓰기 우세**, Alibaba 쓰기의 **75%가 16KiB 이하** |
| U-14 | AI 데이터 중 **KV cache·Checkpoint**는 Small + Hot + Write-intensive → pSLC | **반증**(부분) | MX-77, X-01, DT-20~DT-22 | KV 캐시 오프로드 블록 트레이스는 **128KiB 요청·읽기 지배**(읽기 2.0GiB/s vs 쓰기 11MiB/s). 체크포인트는 **대용량·동기화 버스트 쓰기**(지속 2TB/s·피크 7TB/s). 메타데이터·로그·인덱스는 소형 쓰기에 부합(벤더 진술 수준) |
| U-15 | 95% 이상 데이터는 QLC 경제성, 몇 %의 pSLC로 SLC급 쓰기 거동 | **산술상 일관**(⚠️ 파생) | MX-41 | pSLC가 공칭의 1~2%면 사용자 용량 손실 **3~8%**(k=4~5). pSLC 6%면 **18~24%** 손실 |
| U-16 | 경쟁 포인트가 destage 정책·NS별 QoS 격리·GC 간섭 차단·pSLC sizing·텔레메트리로 이동 | 전망(검증 대상 아님) | F-43, MX-03, ST-06 | 관련 사실: DapuStor 다이 수준 격리·영역 인지 스케줄링(F-43), Klemm "랜덤 I/O 성능이 Mixed Mode의 구동 요인"(MX-03), 표준 EG별 마모 회계 그릇(ST-06) |

**요약 판정**: 사용자 분석의 **메커니즘**(소형 쓰기 흡수 → 큰 순차 destage → WAF 저감, 슬롯 세금, 비트/셀 4배 페널티)은 공개 근거가 있다. 그러나 **출처 귀속 3건이 틀리거나 근거가 없다**: ① "Kioxia 2026년 9월" 시점, ② "Kioxia 1~6%" 수치, ③ "Kioxia가 FDP 결합을 설명". 또 **Solidigm 근거는 시스템 수준(별도 드라이브) 구성**이라 단일 드라이브 혼합 매체의 직접 근거가 아니다.

---

## §2. (A) Kioxia 혼합 매체 진술 재확인

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| MX-01 | ⭐ **Kioxia "Mixed Mode SSD"(Mike Klemm, Kioxia Fellow) 추가 문구** (MM-05 보완): ① "Different IO flows drive customer needs": **small random vs large sequential writes, metadata vs user data, application differences** ② **Voice of Customer: pSLC는 통상 최대 QLC 용량의 ½%~2%** ③ pSLC:QLC 구성 비 표: **1:2(50%) = "limited advantages"**, **1:4(25%) = "a good beginning ratio for mixed mode"**, **1:8(12.5%)**(한 요약은 "future", 다른 요약은 "typical 고객 요구보다 많음"으로 서술) ④ "pSLC delivers improved performance and endurance **at the price of reduced capacity**" | 2025-08-06 (FMS 2025 SSDT-203-1) | https://files.futurememorystorage.com/proceedings/2025/20250806_SSDT-203-1_Klemm.pdf (차단) | 🟡 `[검색 요약 경유]` / ⚠️ (구성 비 표의 "최대" 범위가 요약마다 1:2~1:8, 1:4~1:8로 다름) |
| MX-02 | ⭐ **같은 발표의 "Slot Tax" 논거**: "**SLC SSD consumes full drive slots reducing overall capacity**"(예시: **QLC 30.7TB, SLC 3.2TB, data SSD 20개, 스페어·패리티 제외**). Mixed Mode 이점으로 "**All SSDs provide IOPS and bandwidth vs small-number discrete SLC SSDs**", "**Balance PCIe lane usage**", "**Reduce FRUs**(현장 교체 단위)" | 2025-08-06 | 위 PDF | 🟡 `[검색 요약 경유]` (예시의 표 수치·결론값은 미열람) |
| MX-03 | 같은 발표: "**Random IO performance is the driving factor for Mixed Mode**", "**4KB or 16KB IU(Indirection Unit) size only matters for random write**", pSLC 용량이 제한돼 지속 쓰기를 오래 받을 수 없다는 취지 | 2025-08-06 | 위 PDF | 🟡 `[검색 요약 경유]` |
| MX-04 | Kioxia FMS 2026 세션 "Unlocking QLC Performance and Scalability"(Hadi Sayed): 내용은 MM-06과 동일(SLC NS = 지연 민감 메타데이터·쓰기 버퍼·소블록 I/O, QLC NS = 큰 정렬 쓰기, WA 감소·고사용률 지속 쓰기 효율 개선, "245TB and beyond"로 용량이 커지는 맥락). Kioxia FMS 2026 보도자료(2026-08-03)도 이 세션을 "mixed-media SSD architectures that combine SLC and QLC storage to improve performance and efficiency"로 소개. **이번 검색에서 확보한 초록·보도자료 요약에는 FDP 언급이 없다** | 2026-08-04~06 | Terrapinn 연사 페이지 https://www.terrapinn.com/conference/future-memory-storage/speaker-hadi-SAYED.stm ; Kioxia PR https://americas.kioxia.com/en-us/business/news/2026/ssd-20260803-2.html ; Businesswire https://www.businesswire.com/news/home/20260803123361/en/ (모두 차단) | 🟡 `[검색 요약 경유]` |
| MX-05 | **SNIA SDC 2026(2026-09-28~30, Santa Clara)의 Kioxia 세션으로 확인된 것**: Rory Bolt(Senior Fellow) "AI Storage Workloads: What is Different and Impacts on SSD Design"(CPU·GPU 개시 워크로드와 향후 드라이브 변화), John Geldman 패널 "NVMe SSD Management: What NVMe-MI is…"(2026-09-30). **혼합 매체 주제 Kioxia 세션은 확인하지 못했다** | 2026-09-28~30 | NVMe 행사 페이지 https://nvmexpress.org/event/snia-developers-conference-sdc-2026/ ; SNIA 아젠다 https://www.snia.org/sniadeveloper/agenda ; 세션 https://www.snia.org/node/19577 (차단) | 🟡 `[검색 요약 경유]` |
| MX-06 | **Kioxia 2026-09 공개물 탐색 결과(부정)**: Kioxia 2026-09 뉴스는 미국 상장 검토 보도(2026-09-14)가 확인됐고, 9월 Kioxia 블로그·보도자료 중 혼합 매체 글은 검색되지 않았다. Kioxia 미국 블로그의 2026년 QLC 관련 글은 "High-Capacity QLC SSDs: A Compelling HDD Alternative"(2026-02-25), "How KIOXIA BiCS FLASH Gen 8 …"(2026-06-25) 등 | 2026-09 | Blocks&Files https://www.blocksandfiles.com/flash/2026/09/14/us-listing-me-too-says-kioxia/5296100 ; https://blog-us.kioxia.com/post/2026/02/25/high-capacity-qlc-ssds-a-compelling-hdd-alternative (차단) | 🟡 / ⚠️ 부정 확인 |

---

## §3. (B) Solidigm 진술과 CSAL 수치

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| MX-10 | ⭐ **Solidigm: "CSAL maintains a WAF of very close to 1 on the QLC drives"**, 방법은 "writing IO to QLC drives in **large sequential, indirection unit friendly IO sizes**". 다른 페이지: "**Writes land first on SLC/TLC (formerly Optane) media, then flush to QLC as large, sequential blocks, driving WAF down to ~1**" (W38·D11·C-11의 문구 보완) | 2024~2026 (페이지 일자 미표기) | https://www.solidigm.com/products/technology/platform-optimization-for-performance-and-endurance-qlc-csal.html ; https://www.solidigm.com/products/technology/cloud-storage-acceleration-layer-write-shaping-csal.html (차단) | 🟡 `[검색 요약 경유]` |
| MX-11 | **CSAL 백서(Intel·Alibaba, "A Media-Aware Cloud Storage Acceleration Layer (CSAL) Cache Solution with Intel Optane SSDs for Alibaba EBS Local Disk D3C Service")**: "**4KB random write WAF drops from over 70 to 1.02**". D3C에서 빅데이터 워크로드 성능 2배·밀도 2배(D2C 대비) | 2023-01경(검색 요약 표기) | https://acsweb.ucsd.edu/~yaz093/paper/csal_white_paper.pdf (차단) | 🟡 `[검색 요약 경유]` / ⚠️ 단일 요약(">70"의 측정 조건·장치 미확인) |
| MX-12 | **Solidigm의 "Mixed Media"는 CSAL(시스템 수준)의 기능명**: SDC 2026 연사 Kapil Karkra(Senior Principal Engineer) 소개문 "evolving CSAL, a host-based FTL with RAID and Caching, **bringing technologies such as Mixed Media (MM) and Flexible Data Placement (FDP) to market**, and defining turnkey reference architectures … for high-density NAND SSDs (QLC, PLC, and HLC)". SDC 2026 발표 제목 "Capacity Begets Intelligence at Scale". Solidigm 페이지: "CSAL delivers mixed media solutions **combining Solidigm SLC SSDs** with other storage components, such as **Solidigm QLC SSDs**" | 2026-09-28~30 | https://www.snia.org/sniadeveloper/conference-speaker/kapil-karkra (차단) ; https://www.solidigm.com/products/technology/csal-based-reference-storage-platform.html | 🟡 `[검색 요약 경유]` |
| MX-13 | **Solidigm의 IU 설명**: 고밀도 QLC는 IU가 4KiB보다 크고, 호스트 스택은 4KiB에 맞춰져 있다. "IU에 정렬된 쓰기는 추가 동작 없이 기록되지만, **정렬되지 않으면 read-modify-write가 필요해 WAF로 나타난다**". "**CSAL FTL intercepts a part of the user workload that is smaller than the indirection unit of the QLC SSD and stages it on the cache tier first, as these are generally small user writes with short data lifetime**" | 일자 미표기 | https://www.solidigm.com/products/technology/qlc-considerations-for-mainstream-workloads-data-center.html (차단) | 🟡 `[검색 요약 경유]` |
| MX-14 | ⭐ **Solidigm D7-P5810(SLC) 제품 브리프 문구**(사용자 분석 U-08의 원문): "QLC drives are well suited for many mainstream and read-intensive workloads, such as **data lakes for AI, ML, and CDNs**. The storage needs of **write-intensive workloads, such as high-frequency trading, caching, and databases**, are quite different … Solidigm offers the D7-P5810". P5810 용도: "**caching, HPC, data logging, journaling**". "ideally suited as a **storage accelerator in front of highly dense capacity tiers like QLC-based SSDs for metadata/logging**" | 2023-09 출시 이후 | https://www.solidigm.com/products/data-center/product-briefs/d7-p5810-product-brief.html (차단) | 🟡 `[검색 요약 경유]` |
| MX-15 | **CSAL EuroSys'24 논문**("CSAL: the Next-Gen Local Disks for the Cloud", Alibaba·Solidigm): QLC가 drop-in 대체가 안 된 근본 원인 = **"두 단계 쓰기 증폭"(IU 단위 장치 주소 매핑 + NAND GC)**. 예: **P5316 QLC IU 64KB** → 4KB 논리 쓰기가 64KB NAND 쓰기. 캐시 = **P5800X 800GB**, 캐시 라인 64KB(QLC IU 정렬). 2단계 L2P로 4KB 접근. 성능: 2위 대비 **최대 2.22×(마이크로벤치)·1.82×(애플리케이션)·2.03×(현장 배치)**, **raw QLC 대비 최대 81.45×** | 2024-04 (EuroSys'24) | https://doi.org/10.1145/3627703.3629566 ; https://yanbozyb.github.io/paper/csal_eurosys.pdf (차단) | 🟡 `[검색 요약 경유]` |
| MX-16 | ⭐ **CSAL 아티팩트 저장소 원문**: 실험 환경 = **P5800X 800GB(캐시) 1개 + P5316 15.36TB(QLC) 1개**, CPU 2× Xeon 8369B, DRAM 512GB. 생성 명령 `--overprovisioning 18 --l2p-dram-limit 2048`(OP 18%, L2P DRAM 2GiB), FTL bdev를 **8개 파티션**으로 나눠 VM 8개에 할당. 사전조건 = 전체 순차 쓰기 2회 + 전 영역 랜덤 쓰기(약 10시간). 그림 13(WAF) 재현법: "**WAF = NAND 쓰기 총량 ÷ 논리 쓰기 총량**, NAND 쓰기는 호스트에서 `nvme smart-log`의 `data_units_written`으로 읽는다". 캐시 장치 요구: "NVMe Optane SSD or **SLC SSD with VSS capability (4K + 64B format)**" | 2023-11-06 (commit `588db75`) | https://github.com/ARDICS/CSAL_AE (README.md, raw/*.job) | ✅ |
| MX-17 | **⚠️ 파생: MX-16의 WAF 측정 정의 주의**: 표준 SMART `data_units_written`은 "**the number of 512 byte data units the host has written to the controller**"(libnvme 정의 원문)다. 따라서 아티팩트 방식의 "WAF"는 **CSAL이 QLC 장치에 쓴 양 ÷ VM 논리 쓰기**(호스트 FTL 수준 증폭)이며, **QLC 장치 내부 NAND 수준 WAF는 포함하지 않는다**. MX-10·MX-11의 "WAF ≈1"이 어느 정의인지는 미확인(NX-09) | - | libnvme `struct nvme_smart_log` 주석 https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h ; MX-16 | ✅ (정의) / ⚠️ 파생 (해석) |

---

## §4. (C) WAF 데이터 (QLC 소형 랜덤 쓰기 vs 쓰기 정형화)

| ID | 사실 | 수치 | 출처 | 등급 |
|---|---|---|---|---|
| MX-20 | **⚠️ 파생: IU 단위 RMW의 하한(쓰기 증폭 1단계)**: 4KB 랜덤 쓰기가 IU보다 작으면 IU 전체를 다시 쓴다. 하한 = IU ÷ 4KB: **IU 4KB → 1×, 16KB → 4×, 64KB → 16×**. 실측 WAF = 이 하한 × NAND GC 증폭. 해당 IU: Solidigm **P5316 64KB**, **P5336 16KB**, **P5430 4KB**(MX-71), Micron 6600 ION **245.76TB 16KB / 30.72TB 4KB**(P-06) | 1× / 4× / 16× | MX-13 ; MX-15 ; AnandTech https://anandtech.com/show/18967 ; P-06 | ⚠️ 파생 (IU 값은 🟡) |
| MX-21 | **⚠️ 파생: MX-11의 ">70"과 IU 산술의 정합**: P5316(64KB IU)에서 4KB 랜덤 쓰기 하한 16× → 70 ÷ 16 ≈ **4.4**가 GC 증폭 몫이라면 설명된다(가정: 백서의 >70이 P5316 기준. 미확인) | ≈4.4 | MX-11 ; MX-20 | ⚠️ 파생 |
| MX-22 | **같은 QLC 드라이브의 정격 내구성이 워크로드에 따라 13배 차이** (PC7 E-06 참조): Micron 6600 ION 245TB **4K 랜덤 0.075 / 16K 랜덤 0.3 / 128K 순차 1.0 DWPD** → 128K 순차 ÷ 4K 랜덤 = **13.3×** | 13.3× | PC7 E-06 ; DP8 P-06 | 🟡 (참조) / ⚠️ 파생 (배수) |
| MX-23 | **호스트 배치(FDP)로 WAF ≈1** (WM 참조): CacheLib KV 캐시 트레이스, 호스트 OP 0%에서 **3.22 → 1.03**, OP 50%에서 1.22 → 1.03 | 3.22 → 1.03 | WM W17·W18 | ✅ (참조) |
| MX-24 | **소형 객체 플래시 캐시의 증폭 구조(FairyWREN)**: 100B 객체를 집합 연관 캐시에 넣으면 최소 4KB 페이지를 써야 해 **응용 수준 증폭(ALWA) 40×**, 랜덤 쓰기라 **장치 수준 증폭(DLWA) 2×~10×**, 곱하면 "**WA easily exceeds 100×**". "**To mitigate this, Meta's flash caches use only 50% of the drive**". FairyWREN은 최신 연구 대비 플래시 쓰기 **12.5× 감소**(97 → 7.8 MB/s), 플래시 비용 −35% (OSDI'24, 2024) | WA >100× ; 쓰기 12.5× 감소 | https://www.usenix.org/conference/osdi24/presentation/mcallister (차단, 원문 PDF 텍스트는 세션 스크래치 사본으로 열람) | ✅ (원문 텍스트) |
| MX-25 | **CSAL 후속**: CSAL + RAID5F, "기존 CSAL 대비 WA −30%"(MM-25 참조). Kioxia RocksDB FDP 플러그인 RAID5 4드라이브 WAF −46%(WM W23) | −30% / −46% | MM-25 ; WM W23 | 🟡 (참조) |
| MX-26 | **⚠️ 파생: pSLC 전환의 수명 쓰기량(원시 NAND당)**: pSLC 영역의 수명 쓰기량 = (원시 용량 ÷ k) × (m × QLC P/E). DapuStor "pSLC P/E가 QLC의 25배 이상"(m ≥25, MM-04)과 k = 4~5를 넣으면 **원시 NAND당 수명 쓰기량은 QLC 모드의 5~6.25배**(25÷5, 25÷4), 대신 용량은 1/4~1/5. WAF 차이는 미반영 | 5~6.25× | MM-04 ; EC-01·EC-02 | ⚠️ 파생 |

---

## §5. (D) 꼬리 지연 데이터

| ID | 사실 | 수치 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|
| MX-30 | ⭐ **SLC vs QLC NAND 동작 특성 표(DT-RAID 논문)**: SLC 읽기 **20~25µs**, 프로그램 **50~220µs**, 내구 **60~100K P/E** / QLC 읽기 **120~200µs**, 프로그램 **2.0~3.0ms**, 내구 **0.5~3K P/E** | ⚠️ 파생: 프로그램 지연비 QLC/SLC ≈ **9~60×** (2.0ms÷220µs ~ 3.0ms÷50µs) | 2026-09 (arXiv 2609.16003) | https://arxiv.org/abs/2609.16003 (차단) | 🟡 `[검색 요약 경유]` |
| MX-31 | **DT-RAID(드라이브 내부 이종 영역을 인지하는 RAID)**: 스트라이프 단위 열 추적으로 hot 스트라이프를 고성능·고내구 티어에 두고 티어 크기를 동적 조정. **SNIA MSR 엔터프라이즈 트레이스 시뮬레이션**에서 균일 RAID 대비 **성능 최대 6.8×, 정규화 수명 최대 20.9×**, 꼬리 지연·워크로드 간섭 완화 | 6.8× / 20.9× (시뮬레이션) | 2026-09 | 위 URL | 🟡 / ⚠️ (시뮬레이션, 실장치 아님) |
| MX-32 | **데이터시트 전형 지연**: Solidigm **D7-P5810(SLC) 랜덤 쓰기 15µs**·랜덤 읽기 53µs(전형). **D5-P5336(QLC) 랜덤 쓰기 전형 25~31µs**(요약마다 25µs·30µs·31µs(16K)로 다름). DapuStor pSLC 영역 4K 랜덤 쓰기 **평균 <8µs**(MM-04) | 15 / 25~31 / <8 µs | 2023~2026 | D7-P5810 브리프(MX-14 URL) ; https://www.solidigm.com/products/data-center/d5/p5336.html ; MM-04 | 🟡 / ⚠️ (P5336 값 충돌, 측정 조건 상이) |
| MX-33 | **D5-P5336 QoS(99.99%)**: 4KB 읽기 QD1 **140µs** / QD128 **565µs**, 4KB 쓰기 QD1 **200µs** / QD128 **9,540µs** | 쓰기 QD128 99.99% ≈ 9.5ms | 출처 문서 미특정 | 검색 요약(제품 사양서 추정) | ⚠️ 단일 요약, 재검색 확인 실패. **차트 사용 보류** |
| MX-34 | ⭐ **Alibaba 로컬 디스크 실측(FAST'26)**: 사전조건 "전체 순차 쓰기 2회 + **4KB 랜덤 쓰기 8시간**" 후 측정, "**The 99.9th tail latency of all local disks exceed 1ms at QD 128 due to GC**". 대상은 대표 엔터프라이즈 NVMe(M-1) 위의 세 세대 로컬 디스크(ESPRESSO·DOPPIO·RISTRETTO). **QLC 아님** | p99.9 > 1ms @QD128 | 2026-02 (FAST'26) | 논문 https://www.usenix.org/conference/fast26/presentation/yang ; 변환본 https://github.com/lqhl/awesome-system-papers (markdowns/fast-2026/fast2026-yang) | ✅ (변환본 본문) |
| MX-35 | ⭐ **별도 SLC급 캐시를 둔 CSAL의 포화 쓰기 꼬리 지연(아티팩트 README 예시 출력)**: P5800X 800GB + P5316 15.36TB, VM 디스크 8개, 각 **4KB 순차 쓰기(rw=write) QD128**, 180초: **544K IOPS, 2,228MB/s**, 완료 지연 p50 **1.34ms**, p99 **4.02ms**, p99.5 4.62ms, **p99.9 56.9ms**, **p99.95 476ms**, **p99.99 501ms**, 최대 514ms | p99.99 ≈ 0.5s | 2023-09-28 실행 출력 | MX-16 URL (README "Reproducing Figures 10" 예시) | ✅ (수치) / ⚠️ (해석: 논문 그림이 아닌 예시 출력 1건. "쓰기 버퍼가 있어도 지속 유입이 QLC destage 대역을 넘으면 꼬리가 길어질 수 있다"는 해석은 본 원장의 추론) |
| MX-36 | **Meta·Samsung FDP 논문**: 고사용률에서 FDP가 **p99 읽기·쓰기 지연을 개선**, 사용률과 무관하게 DLWA ≈1(WM W21 참조). 이번 세션에서 지연 수치는 확보 못함 | 정성 | 2025 (EuroSys'25) | https://arxiv.org/abs/2503.11665 | 🟡 (참조) |
| MX-37 | **Alibaba의 꼬리 지연 대응 설계 문구(LATTE)**: "The frontend (i.e., local disk) can work as a **high-performance buffer to absorb I/Os with tail latency** and cache hot data. The backend is supported by a more cost-effective EBS." LATTE = CSAL 구조에서 "**Optane → 로컬 디스크, QLC SSD → 원격 클라우드 디스크**"로 교체 + ML 디스패처 + S3-FIFO | 정성 | 2026-02 | MX-34 URL | ✅ (변환본 본문) |

---

## §6. (E) 용량 페널티 산술 (⚠️ 파생, 산식 명기)

**기호**: C = 공칭 QLC 사용자 용량, k = pSLC 1단위를 만들 때 소모되는 QLC 사용자 용량(이론 **4**, DapuStor 실측 **5**, EC-01·EC-02).

| ID | 산식 | 결과 | 등급 |
|---|---|---|---|
| MX-40 | **해석 A: 원시 NAND의 f를 pSLC로 전환**(사용자 분석의 "전체 NAND의 1~6%"). pSLC = f·C/k, QLC = (1−f)·C, 총 사용자 용량 = (1 − f + f/k)·C, 손실 = f·(1 − 1/k) | k=4: **f 1% → pSLC 0.25%, 손실 0.75%** / **f 3% → 0.75%, 2.25%** / **f 6% → 1.5%, 4.5%**. k=5: 1% → 0.2%, 0.8% / 3% → 0.6%, 2.4% / 6% → 1.2%, 4.8%. 61.44TB 기준 f 6%(k=4): pSLC **0.92TB**, 총 **58.68TB** | ⚠️ 파생 |
| MX-41 | **해석 B: pSLC 사용자 용량을 공칭의 p로 지정**(Kioxia VoC "최대 QLC 용량의 ½~2%"). QLC 소모 = k·p, 총 = (1 − k·p + p)·C, 손실 = (k−1)·p | k=4: **p 0.5% → 손실 1.5%**, **1% → 3%**, **2% → 6%**, 6% → 18%. k=5: 0.5% → 2%, 1% → 4%, 2% → 8%, 6% → 24%. 61.44TB, p 1%(k=4): pSLC **0.61TB**, QLC **58.98TB** | ⚠️ 파생 |
| MX-42 | **해석 C: Kioxia 구성 비 R = pSLC : QLC(사용자 용량 비)**. 원시 = Q + k·S, S = R·Q → Q = C/(1 + k·R) | k=4: **1:8 → QLC 66.7% + pSLC 8.3% = 75%(손실 25%)**, **1:4 → 50% + 12.5% = 62.5%(손실 37.5%)**, **1:2 → 33.3% + 16.7% = 50%(손실 50%)**. k=5: 손실 30.8% / 44.4% / 57.1%. (R의 정의가 원문 표와 같은지는 미확인) | ⚠️ 파생 |
| MX-43 | **"1~6%"와 Kioxia VoC의 관계**: 해석 A의 f 1~6%는 사용자 pSLC **0.2~1.5%**(k=5~4)로, Kioxia VoC ½~2%와 **0.5~1.5% 구간에서 겹친다**. 해석 B로 p 1~6%면 VoC 상한(2%)을 넘는다 | - | ⚠️ 파생 |
| MX-44 | **기존 사례의 "빠른 쪽" 비율**(C-1 표 원자료): Kioxia 슬롯세 예시 3.2 ÷ (20 × 30.72) = **0.52%**; DapuStor pSLC 400GB/800GB/1.2TB ÷ 30.72TB = **1.3% / 2.6% / 3.9%**(공칭 대비); CSAL 아티팩트 800GB ÷ 15.36TB = **5.2%**; VAST 0.47~2.7%(EC-04); Optane H10/H20 3.1~6.25%(EC-03) | 0.47~6.25% | ⚠️ 파생 |

---

## §7. (F) 슬롯·SKU 통합 근거와 산술

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| MX-50 | Kioxia "Slot Tax"·"Reduce FRUs"·"Balance PCIe lane usage"(MX-02) | 2025-08-06 | MX-01 URL | 🟡 |
| MX-51 | DapuStor: 24베이 전부 dual-mode면 각 800GB로 **pSLC 19.2TB, 빠른 저장소가 24개 PCIe 링크 전체로 분산**(EC-08 문구 보완) | 2026-09 | MM-04 ; cloudnews https://cloudnews.tech/dapustor-combines-slc-and-qlc-in-a-single-ssd-to-speed-up-ai/ | 🟡 |
| MX-52 | ⭐ **유사 선례(어레이, 비하이퍼스케일): Pure FlashArray//XL의 DFMD**(DirectFlash Module with Distributed NVRAM): "**no longer use dedicated NVRAM modules** … NVRAM built into DFMD". 기존 //X는 **전용 NVRAM 슬롯 2개 또는 4개**, //XL은 NVRAM이 **DFMD 20개(//XL130) 또는 30개(//XL170)** 에 분산되어 "NVRAM 용량·쓰기 대역·어레이 용량이 DFMD 수와 함께 확장, 쓰기 처리량 한계 해제". 5U에 드라이브 **40개**(//X 3U 20개). **주의: NVRAM(DRAM+보호)이지 pSLC가 아니다** | 2022-01 출시 | WWT https://www.wwt.com/article/introducing-the-pure-storage-flasharray-xl ; TechTarget https://www.techtarget.com/searchstorage/news/252510638/Pure-Storage-launches-highest-performing-FlashArray-XL | 🟡 |
| MX-53 | **⚠️ 파생: 사용자 예시 "2 × TLC + 8 × QLC" vs "8 × 혼합"의 용량 산술**(가정: TLC 7.68TB, QLC 61.44TB, 성능·내구 동등성 미검증). 분리형: QLC **491.52TB** + TLC 15.36TB, **슬롯 10개**. 혼합형 8개, **슬롯 8개**(−2): ① pSLC 1%/드라이브(총 4.92TB) → QLC **471.86TB(−4.0%, k=4)** / 466.94TB(−5.0%, k=5) ② TLC 15.36TB를 같은 용량 pSLC로 대체(1.92TB/드라이브) → QLC **430.08TB(−12.5%, k=4)** / 414.72TB(−15.6%, k=5) | - | 사용자 분석 ; EC-01·EC-02 | ⚠️ 파생 |
| MX-54 | **⚠️ 파생: Klemm 예시의 재구성**(해석: data 슬롯 20개, QLC 30.72TB, SLC 3.2TB 1개 vs 혼합 20개): 분리형 QLC 19 × 30.72 = **583.68TB** + SLC 3.2TB. 혼합형(드라이브당 pSLC 0.16TB) QLC **601.60TB(k=4, +17.9TB, +3.1%)** / 598.40TB(k=5, +14.7TB, +2.5%) + pSLC 3.2TB. 같은 방식 24베이·61.44TB·SLC 3.2TB 2슬롯 → 혼합형 QLC **+6.7~7.2%** | - | MX-02 ; EC-01·EC-02 | ⚠️ 파생 (원문 예시의 결론값 미열람) |
| MX-55 | **TCO 수치 재확인(부정)**: 단일 혼합 드라이브 대 별도 티어의 랙·전력·드라이브 수 TCO를 수치로 공개한 출처는 **이번에도 없다**(EC-11·NG-05 유지). Kioxia·DapuStor·Solidigm 모두 비용 수치 미공개. 위 산술은 **용량만** 비교 | - | EC-11 | ⚠️ 부정 확인 |

---

## §8. (G) 하이퍼스케일러 워크로드 구성 근거

| ID | 사실 | 수치 | 일자 | 출처 | 등급 |
|---|---|---|---|---|---|
| MX-60 | ⭐ **Alibaba Cloud·Tencent CBS 프로덕션 블록 트레이스(DT-13 수치 보강)**: AliCloud = 볼륨 **1,000개, 1개월**(2020-01), TencentCloud = 볼륨 **4,995개, 약 9일**. **쓰기 우세 볼륨 비율: AliCloud 91.5%(915/1,000), TencentCloud 92.3%** | 91.5% / 92.3% | IISWC 2020 → ACM TOS 2023 | arXiv https://arxiv.org/abs/2203.10766 ; ACM https://dl.acm.org/doi/10.1145/3572779 | 🟡 `[검색 요약 경유]` |
| MX-61 | 같은 논문: **작업 집합(WSS) 중 쓰기가 차지하는 비중 AliCloud 89.4%, TencentCloud 85.2%**, 읽기는 34.3% / 37.6%. "Each written block … is likely to be followed by a write". **Small I/O dominates in all traces**: AliCloud에서 **읽기의 75%가 12KiB 이하, 쓰기의 75%가 16KiB 이하**. 전통 DC 트레이스(MSRC)는 읽기 우세 | 89.4% / 85.2% ; 75% ≤16KiB | 위 | 위 | 🟡 `[검색 요약 경유]` |
| MX-62 | Alibaba 공개 트레이스 대상 "ultra disk"의 전형 용도 = OS·빅데이터·웹서버(DT-14 ✅ 참조) | - | 2020-01 | DT-14 | ✅ (참조) |
| MX-63 | **Meta CacheLib 프로덕션은 SSD의 최대 50%를 호스트 OP로 소모**(WM W19), FairyWREN도 "Meta's flash caches use only 50% of the drive"(MX-24) → 소형 랜덤 쓰기 워크로드의 비용이 **용량 미사용**으로 나타나는 사례 | 50% | 2020~2024 | WM W19 ; MX-24 | ✅ (참조) |
| MX-64 | **Meta QLC 대상 워크로드는 쓰기가 적다**: "read-bandwidth-intensive workloads with **infrequent and comparatively low write bandwidth** requirements", 10MB/s/TB 대역(IR-37·C1-30 참조) | - | 2025-03-04 | IR-37 | 🟡/✅ (참조) |
| MX-65 | **AI 워크로드 I/O 형태(사용자 분석 U-14 대조)**: KV 캐시 오프로드 = **128KiB 요청 지배, 읽기 2.0GiB/s vs 쓰기 11MiB/s**(X-01). Llama 3 학습 체크포인트 = **짧은 시간 스토리지 패브릭을 포화시키는 버스트**, 지속 2TB/s·피크 7TB/s(DT-20~DT-22) | - | 2024~2025 | WC X-01 ; DT-20~DT-22 | ✅ (참조) |

---

## §9. (H) 반증·긴장 관계

| ID | 반증 또는 대안 | 출처 | 등급 |
|---|---|---|---|
| MX-70 | **SLC 버퍼를 없애는 방향**: Sandisk UltraQLC "Direct Write QLC", SN670 128TB·UltraQLC 256TB U.2, **2026 상반기 공급 예정**, AI 인제스트·데이터 레이크 대상(MM-09 참조, 2026 출하 여부는 이번에도 미확인) | MM-09 ; https://investor.sandisk.com/news-releases/news-release-details/sandisk-showcases-ultraqlctm-technology-platform-milestone | 🟡 |
| MX-71 | ⭐ **IU 축소로 QLC 자체를 소블록 쓰기에 맞추는 경로**: Solidigm **D5-P5430(QLC)은 IU 4KB**("mixed and small-block write workloads"용, P5316 64KB → P5430 4KB), Micron 6600 ION **30.72TB 모델 4K IU**(P-06). pSLC 없이 MX-20의 1단계 증폭을 없애는 대안 | StorageReview https://www.storagereview.com/review/solidigm-d5-p5430-30-72tb-review ; architecting.it https://www.architecting.it/?p=5097 ; P-06 | 🟡 |
| MX-72 | **Alibaba는 별도 장치 간 호스트 티어링을 유지·확장**: CSAL(별도 캐시 SSD + QLC SSD, 아티팩트도 캐시·QLC를 각각 별도 NVMe로 구성, MX-16) → LATTE(로컬 디스크 + 원격 클라우드 디스크, MX-37). 공개 문헌상 Alibaba가 단일 드라이브 혼합 매체로 옮겼다는 기록은 없음 | MX-16 ✅ ; MX-37 ✅ | ✅ |
| MX-73 | **쓰기 버퍼가 꼬리 지연을 보장하지 않는 사례**: CSAL 포화 4K 순차 쓰기 p99.99 ≈ 501ms(MX-35). 버퍼 용량·destage 대역을 넘는 지속 유입에서는 버퍼가 차는 구간의 지연이 남는다는 해석(⚠️). Klemm도 "pSLC 용량이 제한돼 지속 쓰기를 오래 받을 수 없다"는 취지(MX-03) | MX-35 ; MX-03 | ✅ / 🟡 / ⚠️ |
| MX-74 | **하이퍼스케일러는 성능 티어와 용량 티어를 별도 드라이브로 운용**: Meta = TLC 성능 티어 + QLC 중간 티어(IR-37). VDURA 블로그(벤더 해석): Meta는 성능 계층 **TLC 8~16TB/드라이브**, 용량 계층 **QLC 64~150TB/드라이브**, "Google·Meta·Microsoft는 SSD와 HDD를 같은 소프트웨어 스택에서 네이티브 티어링" | IR-37 ; VDURA 2026-05-20 https://www.vdura.com/2026/05/20/what-google-meta-and-microsoft-know-about-flash-that-neoclouds-are-still-learning/ | 🟡 / ⚠️ (경쟁 벤더 해석, 원출처 미확인) |
| MX-75 | **Kioxia 스스로 pSLC를 키울수록 이점이 줄어든다고 표기**: 1:2(50%) = "limited advantages", VoC는 ½~2%(MX-01). 즉 Kioxia 자료는 "작은 pSLC"를 전제 | MX-01 | 🟡 |
| MX-76 | **표준 FDP로 "pSLC NS + QLC NS + RUH 수명 분리"를 표현하는 길**: RUH 서술자에 매체 필드 없음(ST-12), Linux는 네임스페이스의 ENDGID로 해당 EG의 FDP 구성을 읽는다(ST-11) → 사용자 분석의 그림(Metadata/WAL → pSLC NS, User Data → RUH 0/1/2 → QLC + FDP)은 **엔듀런스 그룹 2개 + QLC 쪽 EG에 FDP 구성**으로만 표준 표현이 가능(⚠️ 파생, CD-08 연장) | ST-11·ST-12 ; CD-08 | ✅ / ⚠️ 파생 |
| MX-77 | **AI 데이터 분류의 반례**: KV 캐시 오프로드는 큰 읽기, 체크포인트는 큰 버스트 쓰기(MX-65) → "KV cache·Checkpoint = small·hot·write" 분류는 공개 트레이스와 맞지 않음 | MX-65 | ✅ (참조) |
| MX-78 | **이름 충돌**: Alibaba "Dual-mode SSD"(SDC 2018, Zhu Feng) = Open-Channel + 표준 NVMe 겸용, 읽기 지연 −75%·성능 최대 5배 목표. pSLC+QLC와 무관 | https://www.alibabacloud.com/blog/alibaba-cloud-launches-dual-mode-ssd-to-optimize-hyper-scale-infrastructure-performance_558010 ; https://www.snia.org/sites/default/files/SDC/2018/presentations/Storage_Architecture/Zhu_Feng_Dual-Mode_SSD_Architecture_for_Next-Generation_Hyperscale_Data_Centers.pdf | 🟡 |
| MX-79 | **SDC 2026의 다른 방향 세션(참고)**: Leil Storage(David Gerstein) "Graceful Degradation for the QLC Era: Moving SSD Lifecycle Management to the Host" = 호스트 관리 OP(HM-OP)로 드라이브를 "gracefully shrink". FDP가 쓰기 유입을 최적화한다면 HM-OP는 수명 관리를 호스트로 옮김. 혼합 매체 반증은 아니나 "호스트가 매체를 관리" 흐름의 또 다른 사례 | https://www.snia.org/sites/default/files/snia-presentations/67c8bec0-52fc-4727-b1cb-9cbcac6ae1f5/SNIA-SDC26-Gerstein-Graceful-Degradation-for-the-QLC-Era.pdf | 🟡 |

---

## §10. 차트용 데이터 표

모든 표는 위 ID의 수치를 옮긴 것이다. 등급이 다른 값을 한 차트에 넣을 때는 각주로 등급을 병기할 것.

**C-1. "빠른 영역" 비율 비교 (공칭 용량 대비, %)** (막대 또는 범위 막대)

| 대상 | 수준 | 비율(%) | 근거 | 등급 |
|---|---|---|---|---|
| Kioxia VoC(고객 요구) | 장치 | 0.5 ~ 2.0 | MX-01 | 🟡 |
| Kioxia "Slot Tax" 예시(SLC 3.2TB / QLC 20 × 30.72TB) | 비교 예시 | 0.52 | MX-44 | ⚠️ 파생 |
| VAST(SCM / QLC) | 시스템 | 0.47 ~ 2.7 | EC-04 | ⚠️ 파생 |
| DapuStor J5060 dual-mode(pSLC / 공칭 30.72TB) | 장치 | 1.3 ~ 3.9 | MX-44 | ⚠️ 파생 |
| Optane H10/H20(Optane / QLC) | 장치(이종) | 3.1 ~ 6.25 | EC-03 | ⚠️ 파생 |
| CSAL 아티팩트(P5800X 800GB / P5316 15.36TB) | 시스템 | 5.2 | MX-44 | ✅ 수치 / ⚠️ 비율 |
| Kioxia 구성 비 1:8 ~ 1:2(k=4 환산 pSLC / 공칭) | 장치 | 8.3 ~ 16.7 | MX-42 | ⚠️ 파생 |

**C-2. pSLC 크기 vs 사용자 용량 손실 (%)** (선 그래프, x = pSLC 사용자 용량 % of 공칭, y = 총 사용자 용량 손실 %)

| pSLC / 공칭 (p) | 손실 k=4 (=3p) | 손실 k=5 (=4p) | 61.44TB에서 pSLC(TB) |
|---|---|---|---|
| 0.5% | 1.5% | 2.0% | 0.31 |
| 1% | 3.0% | 4.0% | 0.61 |
| 2% | 6.0% | 8.0% | 1.23 |
| 6% | 18.0% | 24.0% | 3.69 |
| 12.5%(≈ Kioxia 1:4, k=4) | 37.5% | 해당 없음 | 7.68 |

(⚠️ 파생, MX-41·MX-42. k=4는 비트/셀 이론, k=5는 DapuStor 실측 전환비)

**C-3. 쓰기 증폭: 소형 랜덤 쓰기 vs 정형화·배치** (전후 막대, 로그축 권장)

| 경우 | 전 | 후 | 근거 | 등급 |
|---|---|---|---|---|
| CSAL 백서, 4KB 랜덤 쓰기(QLC) | >70 | 1.02 | MX-11 | 🟡 / ⚠️ 단일 |
| IU 단위 RMW 하한, 4KB 쓰기(IU 64KB / 16KB / 4KB) | 16 / 4 / 1 | (정렬 시 1) | MX-20 | ⚠️ 파생 |
| CacheLib FDP, 호스트 OP 0% | 3.22 | 1.03 | MX-23 | ✅ (참조) |
| 소형 객체 집합 연관 캐시(ALWA 40 × DLWA 2~10) | >100 | FairyWREN 12.5× 쓰기 감소 | MX-24 | ✅ |
| Micron 6600 ION 정격 DWPD(4K 랜덤 → 128K 순차) | 0.075 | 1.0 (13.3×) | MX-22 | 🟡 |

**C-4. 지연: NAND 모드와 장치 수준** (로그축 막대)

| 항목 | 값 | 근거 | 등급 |
|---|---|---|---|
| SLC NAND 프로그램 | 50 ~ 220 µs | MX-30 | 🟡 |
| QLC NAND 프로그램 | 2.0 ~ 3.0 ms | MX-30 | 🟡 |
| SLC NAND 읽기 / QLC NAND 읽기 | 20~25 µs / 120~200 µs | MX-30 | 🟡 |
| DapuStor pSLC 영역 4K 랜덤 쓰기 평균 | < 8 µs | MM-04 | 🟡 |
| D7-P5810(SLC) 랜덤 쓰기 전형 | 15 µs | MX-32 | 🟡 |
| D5-P5336(QLC) 랜덤 쓰기 전형 | 25 ~ 31 µs | MX-32 | 🟡 / ⚠️ 충돌 |
| Alibaba 로컬 디스크 4K, QD128, p99.9(GC) | > 1 ms | MX-34 | ✅ |
| CSAL 포화 4K 순차 쓰기 p99 / p99.9 / p99.99 | 4.02 / 56.9 / 501 ms | MX-35 | ✅ (예시 1건) |

**C-5. 슬롯·용량 산술** (누적 막대: QLC / 빠른 영역, x = 구성)

| 구성 | 슬롯 | QLC(TB) | 빠른 영역(TB) | 근거 |
|---|---|---|---|---|
| 분리: TLC 7.68TB × 2 + QLC 61.44TB × 8 | 10 | 491.52 | 15.36 (TLC) | MX-53 |
| 혼합 × 8, pSLC 1%/드라이브 (k=4 / k=5) | 8 | 471.86 / 466.94 | 4.92 | MX-53 |
| 혼합 × 8, pSLC 1.92TB/드라이브 (k=4 / k=5) | 8 | 430.08 / 414.72 | 15.36 | MX-53 |
| 분리: SLC 3.2TB × 1 + QLC 30.72TB × 19 | 20 | 583.68 | 3.2 | MX-54 |
| 혼합 × 20, pSLC 0.16TB/드라이브 (k=4 / k=5) | 20 | 601.60 / 598.40 | 3.2 | MX-54 |

(전부 ⚠️ 파생. 성능·내구·전력 동등성은 미검증, TCO 아님)

**C-6. 클라우드 블록 워크로드 구성** (그룹 막대)

| 지표 | AliCloud | TencentCloud | 근거 | 등급 |
|---|---|---|---|---|
| 쓰기 우세 볼륨 비율 | 91.5% | 92.3% | MX-60 | 🟡 |
| WSS 중 쓰기 비중 | 89.4% | 85.2% | MX-61 | 🟡 |
| WSS 중 읽기 비중 | 34.3% | 37.6% | MX-61 | 🟡 |
| 쓰기 크기 75퍼센타일 | ≤ 16 KiB | 미확보 | MX-61 | 🟡 |
| 볼륨 수 / 기간 | 1,000 / 1개월 | 4,995 / 약 9일 | MX-60 | 🟡 |

---

## §11. 부정 확인 (검색했으나 확보하지 못한 것)

- **NX-01. Kioxia의 2026년 9월 혼합 매체 공개물.** 없음. 검색어: `Kioxia mixed-media SSD September 2026 SLC namespace QLC namespace FDP`, `"KIOXIA" "mixed media" SSD`, `blog-us.kioxia.com/post/2026/09`, `Kioxia September 2026 SSD announcement QLC pSLC`, `キオクシア SLC QLC 混在 SSD ネームスペース 2026`, `"SNIA-SDC26" Kioxia`. 확인된 것은 FMS 2025·FMS 2026(8월) 자료뿐(MX-01~MX-06).
- **NX-02. Kioxia의 "pSLC 1~6%" 문구.** 없음. `Kioxia mixed-media SSD "1%" "6%" SLC capacity`, `"1 to 6 percent" OR "1-6%" pSLC`. Kioxia 수치는 ½~2%(VoC)와 1:8~1:2(구성 비).
- **NX-03. Kioxia 혼합 매체 자료에서 FDP 결합 진술.** 없음. `Kioxia mixed media SSD Flexible Data Placement small random writes SLC sequential stream QLC`. MM+FDP 병기는 Solidigm(MX-12).
- **NX-04. 단일 드라이브 혼합 매체의 p99 / p99.9 / p99.99 실측.** 없음(DapuStor 평균만, Kioxia 수치 없음).
- **NX-05. 단일 혼합 드라이브 대 별도 티어의 TCO 수치.** 없음(EC-11·NG-05 유지). Klemm "Slot Tax" 예시의 결론값도 원문 미열람.
- **NX-06. 하이퍼스케일러의 "pSLC를 네임스페이스로 노출" 요구 진술.** 없음(NG-01 유지). `hyperscaler requirement SSD "SLC namespace" OR "pSLC namespace" QLC OCP 2026`.
- **NX-07. CSAL 논문·백서 원문의 WAF·꼬리 지연 그림 수치.** 원문 차단(acsweb.ucsd.edu, yanbozyb.github.io, dl.acm.org, zenodo.org). 아티팩트 저장소에는 결과 파일이 없다("Results will be generated in this folder"만 존재).
- **NX-08. Alibaba 운영 환경의 CSAL 캐시 : QLC 용량비.** 없음(NG-11 유지). 실험 구성 5.2%(MX-44)만.
- **NX-09. Solidigm "WAF ≈1"의 측정 정의**(QLC 내부 NAND WAF인지, CSAL→QLC 호스트 쓰기 비인지). 미확인. 아티팩트 방식은 후자(MX-17).
- **NX-10. "Optane+QLC가 QLC 대비 P99.99 읽기 꼬리 지연 5배 개선"** 이라는 검색 요약 문구: 원출처를 찾지 못해 **채택하지 않음**.
- **NX-11. D5-P5336 QoS 99.99% 쓰기 9,540µs(MX-33)의 원문 재확인.** 실패(두 번째 검색에서 재현 안 됨). 차트 사용 보류.
- **NX-12. 하이퍼스케일러 트레이스에서 "메타데이터·WAL·저널" 쓰기의 바이트 비중.** 없음. 확보한 것은 블록 수준 크기 분포·쓰기 우세 비율(MX-60·MX-61)뿐이며, 이것이 메타데이터 비중을 뜻하지는 않는다.

---

## §12. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. 🟡 (Kioxia 개념의 실제 출처)** "Kioxia는 FMS 2025(2025-08)에서 pSLC와 QLC를 한 SSD에 담는 'Mixed Mode SSD'를 발표하며 고객 요구를 'pSLC = 최대 QLC 용량의 ½~2%'로 제시했고, FMS 2026(2026-08)에서 '작은 SLC 네임스페이스 + 큰 QLC 네임스페이스' 구조를 설명했다." (MX-01, MX-04)

> **2. 🟡 (슬롯 세금)** "Kioxia는 별도 SLC SSD가 드라이브 슬롯을 통째로 차지해 전체 용량을 줄이는 것을 'Slot Tax'라 부르고, 모든 드라이브에 pSLC를 나누어 두면 PCIe 레인 사용이 균형을 이루고 현장 교체 단위(FRU)가 줄어든다고 설명했다." (MX-02)

> **3. 🟡 (Solidigm 메커니즘, 구성 명시)** "Solidigm은 별도 SLC/TLC SSD에 쓰기를 먼저 받고 QLC SSD에는 IU에 맞춘 큰 순차 쓰기만 내려보내는 호스트 FTL(CSAL)로 QLC의 WAF를 1에 가깝게 유지한다고 설명한다. 이는 두 종류의 드라이브를 소프트웨어로 묶는 시스템 수준 구성이다." (MX-10, MX-12, MX-16)

> **4. ✅/🟡 (소형 쓰기의 비용)** "QLC는 매핑 단위(IU)가 16~64KB로 커서 4KB 랜덤 쓰기 하나가 IU 전체의 재기록을 부른다. 같은 QLC 드라이브의 정격 내구성은 4K 랜덤 기준 0.075 DWPD, 128K 순차 기준 1.0 DWPD로 13배 차이 난다." (MX-20, MX-22)

> **5. 🟡 (클라우드 워크로드)** "Alibaba Cloud와 Tencent의 프로덕션 블록 스토리지에서 볼륨의 91.5%와 92.3%가 쓰기 우세였고, Alibaba 쓰기 요청의 75%는 16KiB 이하였다." (MX-60, MX-61)

> **6. ⚠️ 파생 (용량 페널티)** "QLC 셀을 pSLC로 쓰면 비트 기준 4배(실측 사례 5배)의 용량을 소모하므로, pSLC를 공칭 용량의 1%로 잡으면 전체 사용자 용량은 3~4%, 2%로 잡으면 6~8% 줄어든다." (MX-41)

> **7. ✅ (반증 병기)** "Alibaba는 CSAL에서 별도 캐시 SSD와 QLC SSD를 묶었고, 차세대 LATTE에서는 같은 구조를 로컬 디스크와 원격 클라우드 디스크로 넓혔다. 별도 SLC급 캐시를 둔 CSAL도 포화 4KB 쓰기 예시에서 p99.99 지연이 약 0.5초였다." (MX-16, MX-35, MX-37)

> **8. 부정 확인 (출처 귀속)** "하이퍼스케일러가 단일 드라이브 혼합 매체나 pSLC 네임스페이스 노출을 요구했다는 공개 진술, 그리고 혼합 드라이브와 별도 티어의 TCO 비교 수치는 확인되지 않았다." (NX-05, NX-06)

**❌ 쓰지 말 것**
- "Kioxia가 2026년 9월 mixed-media SSD 개념을 공개했다" → 확인된 공개 시점은 2025-08·2026-08(NX-01). 쓰려면 "FMS 2025·2026에서 발표"로.
- "Kioxia는 pSLC를 1~6%로 할당한다" → Kioxia 문구 없음(NX-02). Kioxia 수치는 VoC ½~2%.
- "Kioxia가 mixed media와 FDP의 결합을 설명했다" → 확인 못함(NX-03). MM+FDP를 함께 말한 것은 Solidigm CSAL(시스템 수준).
- "Solidigm이 단일 드라이브 pSLC로 QLC WAF를 1로 만든다" → Solidigm 진술은 별도 SLC/TLC 드라이브 + QLC 드라이브 + 호스트 FTL 구성(MX-10·MX-12).
- "CSAL은 QLC NAND WAF를 1.02로 만든다" → 측정 정의 미확인. 아티팩트 방식은 호스트 쓰기 비(MX-17, NX-09).
- "KV 캐시·체크포인트는 소형 랜덤 쓰기라 pSLC에 둔다" → 공개 트레이스는 큰 읽기·큰 버스트 쓰기(MX-65·MX-77).
- "혼합 매체로 2개 슬롯을 줄여 랙 TCO가 X% 내려간다" → TCO 수치 없음. 용량 산술만 가능하고, 같은 용량의 빠른 영역을 pSLC로 대체하면 QLC 용량이 12.5~15.6% 줄어든다(MX-53).
- "D5-P5336의 99.99% 쓰기 지연은 9.5ms" → 재확인 실패(NX-11).
- "Optane+QLC가 P99.99 읽기 지연을 5배 개선" → 원출처 없음(NX-10).
- "DapuStor dual-mode = Alibaba Dual-mode SSD" → 전혀 다른 개념(MX-78).

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| CSAL EuroSys'24 아티팩트 평가 저장소 | https://github.com/ARDICS/CSAL_AE (commit `588db75`, 2023-11-06): `README.md`, `csal.json`, `raw/uniform/fio_seq_4k.job`·`fio_rnd_4k.job`, `raw/skewed/fio_4k_zipf0.8.job`, `precondition/start.sh` | 실험 장치(P5800X 800GB + P5316 15.36TB), OP 18%, L2P DRAM 2GiB, 8 파티션, 사전조건, WAF 산출 방법, 4K 순차 쓰기 예시 출력의 지연 백분위 |
| FAST'26 "Here, There and Everywhere: The Past, the Present and the Future of Local Storage in Cloud"(Alibaba·Solidigm·SJTU) | 변환본 https://github.com/lqhl/awesome-system-papers `markdowns/fast-2026/fast2026-yang/fast2026-yang.md` (commit `c5e525b`, 2026-09-14) ; 원 논문 https://www.usenix.org/conference/fast26/presentation/yang | CSAL = "Optane이 모든 쓰기를 흡수해 고정 크기 청크로 QLC에 append", LATTE 구조, p99.9 >1ms(QD128, GC), 사전조건 |
| libnvme `types.h` | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h | SMART `data_units_written` = 호스트가 컨트롤러에 쓴 512B 단위 |
| FairyWREN 논문 PDF 텍스트 | 세션 스크래치 사본(원 URL https://www.usenix.org/conference/osdi24/presentation/mcallister) | ALWA 40×, DLWA 2~10×, WA >100×, Meta 플래시 캐시 50% 사용, 12.5× 쓰기 감소 |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| MMR MM-05(Klemm FMS 2025: "custom ratio"만 기록) | **VoC ½~2%, 구성 비 1:2·1:4·1:8과 각 평가, "Slot Tax"·FRU·PCIe 레인, IU는 랜덤 쓰기에만 중요** 추가(MX-01~MX-03) |
| MMR MM-06(Sayed FMS 2026) | 보도자료 요약에서도 FDP 언급 없음 확인, SDC 2026 Kioxia 세션은 혼합 매체 주제 아님(MX-04·MX-05) |
| MMR EC-11·NG-05(TCO 수치 없음) | 재확인. 용량만의 슬롯 산술(MX-53·MX-54)과 어레이 선례 Pure DFMD(MX-52) 추가 |
| WM W38·D11·C-11(CSAL WAF ≈1, ⚠️) | Solidigm 문구 보강(MX-10), 백서 ">70 → 1.02"(MX-11, ⚠️), 아티팩트의 WAF 정의 확인(MX-16·MX-17) |
| DT DT-13(쓰기 우세, 비율 수치 미확보) | **91.5%·92.3% 쓰기 우세 볼륨, WSS 쓰기 89.4%·85.2%, 쓰기 75% ≤16KiB**(MX-60·MX-61, 🟡) |
| MMR CD-01(상용 혼합 매체는 호스트 SW가 묶음) | Alibaba의 차세대(LATTE)도 별도 장치 간 호스트 티어링(MX-37·MX-72) |
| 사용자 분석 원문 | 주장 16개 판정(§1). 출처 귀속 오류 3건(시점·1~6%·FDP) |
