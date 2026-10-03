# SSD 혼합 매체(Mixed Media) 팩트 원장 — 하이퍼스케일러 인프라 재사용·스케일아웃 수요 논거, 장치·시스템 수준 혼합 매체 제품, 표준 훅, 경제성, 호스트 공동설계

**수집일**: 2026-10-03
**수집자**: Research Agent (Mixed Media) — 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(GitHub 원본 코드·문서, Microsoft IR 원문, Google Cloud 블로그 원문) 기반 팩트 원장
**용도**: SSD 개발 조직의 3대 기술 재정의(① 고DWPD ② **혼합 매체** ③ 대용량+고장 허용) 중 ②와 그 수요 논거 — "하이퍼스케일러는 **기존 데이터센터·인프라를 최대한 재사용**하려 하므로 scale-up보다 **scale-out**을 선호하고, 따라서 QLC로 출하하되 용량 일부를 SLC/TLC 모드로 쓰게 하는 **단일 장치 혼합 매체**가 기존 인프라(별도 캐시 티어·HDD+SSD 티어·서버 슬롯·전력/공랭 한도)를 그대로 쓰게 해 준다" — 의 사실 근거와 반증. 섹션 A~E는 요청 항목 A~E에 1:1 대응.

**등급**: ✅ 1차 원문 직접 열람(공식 IR 원문·공식 블로그 원문·표준 구현 코드·헤더·공식 저장소 문서) / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술·코드 부재로 직접 도출(산식·근거 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch 모두): `sec.gov`, `abc.xyz`, `investor.fb.com`, `ir.aboutamazon.com`, `engineering.fb.com`, `about.fb.com`, `solidigm.com`, `news.solidigm.com`, `snia.org`, `files.futurememorystorage.com`, `terrapinn.com`, `image-ppubs.uspto.gov`, `ppubs.uspto.gov`, `patents.google.com`, `datacenters.microsoft.com`, `news.microsoft.com`, `azure.microsoft.com`, `aka.ms`, `datacenter.uptimeinstitute.com`, `businesswire.com`, `blocksandfiles.com`, `tomshardware.com`, `storagereview.com`, `servethehome.com`, `usenix.org`, `arxiv.org`, `nvmexpress.org`, `opencompute.org`, `kioxia.com`, `dapustor.com`, `phison.com`, `semiconductor.samsung.com`, `vastdata.com`, `purestorage.com`, `allthingsdistributed.com`, `datacenterdynamics.com` 등. **직접 열람이 가능했던 것은 `raw.githubusercontent.com`·GitHub `git clone`, `www.microsoft.com`(IR), `cloud.google.com`(블로그)뿐**이다. 따라서:
- **✅는 위 네 경로에서 원문을 직접 읽은 항목에만 붙였다**: Microsoft FY23·FY24·FY25 연차보고서와 FY26 4분기 실적 콜 원문, Google Cloud 블로그 6건(Colossus 2021·2025, Titanium 2023, Agile DC 2025, Brazos 2026, OCP 2024 키노트), SPDK(`doc/ftl.md`, `lib/ftl/*`, `include/spdk/ftl.h`, `test/ftl/*`, CHANGELOG), nvme-cli/libnvme(master `f938b92`, 2026-10-02 커밋), 구 libnvme `types.h`, Linux `include/linux/nvme.h`·`drivers/nvme/host/core.c`, QEMU `hw/nvme/ctrl.c`·`subsys.c`, Phison aiDAPTIV README.
- **Amazon·Meta·Alphabet의 10-K 수치는 sec.gov 차단으로 원문을 열지 못해 🟡**로 낮췄다. Microsoft만 자사 IR 사이트에서 원문을 열었다(✅).
- 벤더 보도자료·FMS/SNIA 발표 수치는 1차 출처이지만 검색 요약 경유이므로 🟡.

**0-2. 이 원장에서 "혼합 매체(mixed media)"의 뜻.** 세 가지를 섞지 않는다.
- **(a) 장치 수준 혼합 매체** — 한 드라이브 안에서 서로 다른 운용 모드(pSLC/QLC, SLC/TLC 등)의 영역을 **호스트가 볼 수 있게** 노출(별도 블록 디바이스·네임스페이스·엔듀런스 그룹). 예: DapuStor J5060 dual-mode, Micron 4150AT, Intel Optane H10/H20(이종 매체 2개를 한 M.2에).
- **(b) 시스템 수준 혼합 매체** — 서로 다른 장치(SCM/SLC/TLC SSD, QLC SSD, HDD)를 **호스트·클러스터 소프트웨어가 묶음**. 예: Solidigm CSAL, VAST Data, Google Colossus L4, Meta Tectonic.
- **(c) 비가시 SLC 캐시** — 드라이브 내부의 동적/정적 SLC 버퍼(호스트에 안 보임). **혼합 매체가 아니다.** 본 원장에서는 대조군으로만 쓴다.

**0-3. 기존 원장과의 관계.** [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **wcssd-v1**) §5-D(F-40~F-47)·§6-B(B-01~B-10)·§3(C-10~C-15)에 이미 있는 사실은 **ID로만 참조**하고 반복하지 않는다. 본 원장의 새 내용은 ① 인프라 재사용 근거(§1), ② wcssd-v1에 없던 혼합 매체 제품·시스템(§2), ③ 표준의 영역별 회계 필드와 NVMe 2.3 CDP 구현 반영(§3), ④ 경제성 산술(§4), ⑤ 공동설계 근거(§5)다.

---

## §1. (A) 인프라 재사용·스케일아웃 근거

### 1-A. 서버·데이터센터 건물 내용연수(useful life) 변경

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| IR-01 | **Microsoft: 서버·네트워크 장비 내용연수 4년 → 6년.** 2022-07 평가 완료, FY2023(2022-07-01 시작)부터 적용. 사유 원문: "**investments in software that increased efficiencies in how we operate our server and network equipment, as well as advances in technology**". FY23 영향: 영업이익 **+$3.7B**, 순이익 **+$3.0B**(주당 $0.40) | 2022-07 평가 / FY23 적용 | Microsoft 2023 Annual Report https://www.microsoft.com/investor/reports/ar23/index.html | ✅ |
| IR-02 | Microsoft 회계정책상 내용연수 범위: **computer equipment 2~6년, buildings and improvements 5~15년**(FY23·FY24·FY25 연차보고서 동일 문구, FY25에서 leasehold improvements만 3~20년 → 3~15년) | FY23~FY25 | https://www.microsoft.com/investor/reports/ar23/index.html ; …/ar24/index.html ; …/ar25/index.html | ✅ |
| IR-03 | ⭐ **Microsoft: 데이터센터·사무용 건물 내용연수 15년 → 25년**, FY27(2026-07-01) 시작부터. CFO Amy Hood 원문: "extending the estimated useful lives of our datacenters and office buildings, from 15 to 25 years, **reflecting our operating history and expected use of these assets**." FY27 영업이익 효과는 "minimal". 향후 데이터센터 리스가 금융리스→운용리스로 더 많이 분류되어 CY2026 CapEx 기대치가 **약 $175B**로 조정(투자 계획 자체는 불변이라고 명시) | **2026-07-29** (FY26 4분기 실적 콜) | https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4 | ✅ |
| IR-04 | **Alphabet: 서버 4년 → 6년, 일부 네트워크 장비 5년 → 6년**. 2023-01 평가, FY2023 적용. 2023 영향: 감가상각 **−$3.9B**, 순이익 **+$3.0B**(주당 $0.24) | 2023-01 | Alphabet 10-K FY2023 https://www.sec.gov/Archives/edgar/data/1652044/000165204424000022/goog-20231231.htm | 🟡 `[검색 요약 경유]` |
| IR-05 | **Meta: 서버·네트워크 자산 다수 4년 → 4.5년(2022 Q2) → 5년(2022 Q4)**. 사유: "expected longer refresh cycles". 2022 영향 감가상각 −$860M, 순이익 +$693M | 2022 | Meta 10-K FY2022 https://www.sec.gov/Archives/edgar/data/1326801/000132680123000013/meta-20221231.htm ; Data Center Frontier https://www.datacenterfrontier.com/hyperscale/article/21548840/meta-will-abandon-some-data-center-builds-run-servers-longer | 🟡 |
| IR-06 | **Meta: 서버·네트워크 자산 대부분 → 5.5년**, 2025-01-01 적용(2025-01 평가). FY25 영향 감가상각 **−$2.92B**, 순이익 **+$2.59B**(희석 주당 $1.00) | 2025-01 | Meta 10-K FY2025 https://www.sec.gov/Archives/edgar/data/1326801/000162828026003942/meta-20251231.htm ; Bloomberg Tax https://news.bloombergtax.com/financial-accounting/metas-accounting-move-on-ai-servers-to-boost-profit-this-year | 🟡 |
| IR-07 | **Amazon: 서버 3년 → 4년(2020-01), 4년 → 5년(2022-01), 5년 → 6년(2024-01)**. 2024 변경은 "continuous improvements in our hardware, software, and data center designs" 사유 | 2020~2024 | Hudson Labs 요약 https://www.hudson-labs.com/research/amazon-server-depreciation-amzn ; Amazon 10-K FY2024 https://www.sec.gov/Archives/edgar/data/1018724/000101872425000004/amzn-20241231.htm | 🟡 |
| IR-08 | **Amazon: 서버·네트워크 장비 "일부(subset)" 6년 → 5년**, 2025-01-01 적용. 사유: "**increased pace of technology development, particularly in the area of artificial intelligence and machine learning**". 2025 영향 D&A **+$1.4B**, 순이익 **−$1.0B**(주당 $0.10), 주로 AWS | 2025-01 | Amazon 10-K FY2025 https://www.sec.gov/Archives/edgar/data/1018724/000101872426000004/amzn-20251231.htm | 🟡 |
| IR-09 | **⚠️ 파생 — 방향 요약(판단 아님).** 2022~2025년 4사 모두 범용 서버 내용연수를 **5~6년**으로 늘렸고, **역방향은 Amazon의 AI/ML 일부 서버(2025, 6→5년)뿐**이다. 건물은 Microsoft가 **25년**으로 늘렸다(FY27). Microsoft만 사유에 "**소프트웨어로 장비 운영 효율을 높였다**"를 명시했다(IR-01) | — | IR-01~IR-08 | ⚠️ 파생 |

### 1-B. 기존 데이터센터 개조(brownfield)·공랭 홀 재사용

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| IR-10 | ⭐ **Microsoft 주주서한: "Every Azure region is now AI-first and can support liquid cooling, increasing the fungibility and the flexibility of our fleet."** 같은 서한: 70개 리전 400+ 데이터센터, 그해 2GW+ 신규 용량 추가, 신규 전용 AI 데이터센터 **Fairwater**(위스콘신) 발표 | FY2025 연차보고서 | https://www.microsoft.com/investor/reports/ar25/index.html | ✅ |
| IR-11 | **Microsoft FY26 Q4: CapEx $41B 중 "roughly two thirds … for short-lived assets, primarily CPUs and GPUs as customers increasingly build solutions that leverage both AI and non-AI infrastructure."** 나머지는 장기 자산. 같은 분기 금융리스 $5.6B는 "primarily for large datacenter sites" | 2026-07-29 | https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4 | ✅ |
| IR-12 | **Microsoft CFO(Amy Hood) 발언 3건** (같은 콜): ① "efficiency, being able to **get more out of everything that we've got in the fleet**. That applies to efficiency gains in the CPU fleet … GPU fleet" ② "Think about that infrastructure as being **pretty fungible**" ③ "The investment into **land and data center builds is actually quite flexible**. It's a smaller percentage of the overall cost structure" | 2026-07-29 | 위 URL | ✅ |
| IR-13 | **Microsoft CEO(Satya Nadella)**: "**Cobalt 200 racks in over 25 datacenters**" 월말까지 배치 예정, "among the first cloud providers to deploy next-generation **rack-scale** AI infrastructure based on AMD Helios and NVIDIA Vera Rubin" | 2026-07-29 | 위 URL | ✅ |
| IR-14 | Microsoft: Maia 100용 액체냉각 "sidekick"이 **기존 공랭 데이터센터에 DTC(direct-to-chip) 냉각을 처음 넣은 사례**. GB200 NVL72는 서버 액체냉각 + 건물 공랭 열배출 | 2024~2025 | Microsoft 인포그래픽 https://datacenters.microsoft.com/wp-content/uploads/2025/04/Liquid_Cooling_Infographic_FINAL-3.pdf (차단) ; DCD https://datacenterdynamics.com/en/news/microsoft-adopting-direct-to-chip-liquid-cooling-exploring-microfluidics | 🟡 |
| IR-15 | ⭐ **Google Brazos**: "AI·HPC 칩 TDP가 1,000W를 넘어 표준 공랭으로 감당 불가. 대안인 **시설 전체를 냉수 루프로 개조하는 것은 막대한 자본과 시간**이 든다. Brazos는 **기존 공랭 환경 안에** 고밀도 액체냉각 장비를 배치하게 해 주는 랙 장착형 폐루프 액체-공기 냉각" — "**one-rack-at-a-time** 설치", "**충분한 전력과 표준 공조가 있는 어떤 레거시 시설에도** 빠르게 설치". 사양: 모듈 3개로 **랙당 공칭 60kW**, 모듈당 11OU, OCP ORv3 호환, 40~60V DC 버스바 입력. **일반 공급(GA)** | **2026-06-16** | https://cloud.google.com/blog/topics/systems/brazos-liquid-cooling-system-for-air-cooled-data-centers | ✅ |
| IR-16 | ⭐ **Google "Agile AI architectures: A fungible data center for the intelligent era"**(Ranganathan·Vahdat): "design data centers with **fungibility and agility as first-class considerations**. Architectures need to be **modular** … **interoperable across different vendors or generations** … support the ability to **late-bind** the facility and systems … (for example, **reuse infrastructure designed for one generation to the next**). Data centers should also be built on agreed-upon **standard interfaces, so data center investments can be reused** across multiple customer segments … applied holistically across … power delivery, cooling, server hall design, compute, **storage**, and networking" | **2025-10-14** | https://cloud.google.com/blog/topics/systems/agile-data-centers-and-systems-to-enable-ai-innovations | ✅ |
| IR-17 | **Meta AALC(Air-Assisted Liquid Cooling)**: 냉각판 DTC를 "**기존 데이터 홀 설계 안에서**", 이중마루·외부 냉각수 배관 없이 적용. 후면도어 열교환기 + 인접 랙의 RPU. Meta·Microsoft는 2023년 OCP에서 **최대 40kW** AALC 시제품 공동 시연 | OCP 2024 (2024-10-15~17) | Data Center Frontier https://www.datacenterfrontier.com/cooling/article/11436915/meta-plans-shift-to-liquid-cooling-for-its-data-center-infrastructure ; Dell'Oro https://www.delloro.com/2024-ocp-global-summit-power-and-cooling-contributions-rise-to-the-top/ | 🟡 |
| IR-18 | **Meta: 20kW 공랭 데이터센터에 120kW 랙**. 6랙 설계 = 120kW Catalina(GB200) 컴퓨트 랙 2개 + 액체-공기 사이드 랙 4개 | 2025-09 보도 | DCD https://www.datacenterdynamics.com/en/news/how-meta-acheives-120kw-a-rack-in-20kw-air-cooled-data-centers/ | 🟡 |
| IR-19 | **AWS IRHX(In-Row Heat Exchanger)**: Blackwell용 DTC 액체냉각, 화이트보드→첫 양산 11개월. "**기존 데이터센터 구성 안에서 작동**하도록 설계, 액체냉각이 필요한 곳에만 추가". 증발식 공랭 대비 물 사용 −9% 기대 | **2025-07-09** | DCD https://www.datacenterdynamics.com/en/news/aws-in-row-heat-exchanger-to-reduce-water-use-by-9-over-evaporative-air-cooled-data-centers/ ; Dell'Oro https://www.delloro.com/awss-new-liquid-cooling-solution-rattled-the-market-but-is-it-truly-disruptive/ | 🟡 |
| IR-20 | Amazon 내부 문서(Business Insider 2026-05 보도 재인용): 다년 데이터센터 현대화 프로그램 **"Titus"** — 전력·냉각·서버 배치를 차세대 AI 하드웨어용으로 재설계. Amazon 채용공고에 "**Fleet Remediation Engineering**" 팀이 "existing AWS data center community" 내 **개조(retrofit)** 를 담당한다고 기재 | 2026-05 보도 / 공고 상시 | letsdatascience(BI 재인용) https://letsdatascience.com/news/amazon-advances-titus-project-to-future-proof-data-centers-cb76a985 ; amazon.jobs https://amazon.jobs/jobs/2889307 | ⚠️ (2차 재인용) / 🟡 (공고) |
| IR-21 | **Uptime Institute 2026 글로벌 설문**: 최빈(modal) 랙 밀도 **11kW**(2025: 9kW), 30kW 초과 설계 시설 제외 평균 **7.8kW**(2025: 7.5kW). "**CPU 기반 엔터프라이즈 워크로드가 여전히 설치 용량의 대부분**", 운영자는 고밀도 AI 클러스터와 CPU 워크로드라는 **두 시장을 동시에** 계획. 1,600+ 응답(2026-04~05). **주의: 응답자 다수가 엔터프라이즈·코로케이션이며 하이퍼스케일러 대표 표본이 아니다** | 2026-07 | Data Center Knowledge https://www.datacenterknowledge.com/ai-data-centers/ai-drives-data-center-uncertainty-in-uptime-s-2026-survey ; Uptime https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2026 | 🟡 |

### 1-C. 스토리지의 스케일아웃·혼합 매체 아키텍처 진술 (하이퍼스케일러 자체)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| IR-30 | ⭐ **Google Colossus (2021)**: "Google data centers have a tremendous variety of underlying storage hardware, offering **a mix of spinning disk and flash storage in many sizes and types**." "The hottest data is put on flash … **We buy just enough flash to push the I/O density per gigabyte into what disks can typically provide and buy just enough disks to ensure we have enough capacity.**" "**Disaggregation of resources** drives more efficient use of valuable resources and lowers costs." 단일 클러스터가 "exabytes of storage and tens of thousands of machines"까지 확장, 메타데이터 curator는 "can scale horizontally" | **2021-04-19** (Hildebrand·Serenyi) | https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system | ✅ |
| IR-31 | ⭐ **Google Colossus (2025)**: 다수 파일시스템이 수 EB, **2개는 각 10EB 초과**; 최대 파일시스템은 읽기 **50TB/s**·쓰기 **25TB/s** 상시 초과; 최대 클러스터 **600M+ IOPS**. "SSDs have gotten more affordable … **No storage designer would ever just spec a system just built out of HDDs anymore. However, SSD-only storage still poses a substantial cost premium over a blended storage fleet of SSD and HDD.**" D 서버가 "HDDs or SSDs"를 호스팅(=매체는 서버 단위로 분리) | **2025-03-26** (Greenfield·Pollen) | https://cloud.google.com/blog/products/storage-data-transfer/how-colossus-optimizes-data-placement-for-performance | ✅ |
| IR-32 | **Google Titanium**: "Just as modern workloads **scale out horizontally** in the cloud, with Titanium, we've extended the architecture to augment on-host offloads with an additional tier of **scale-out offloads** that run outside the host … deployed fleet-wide". Hyperdisk는 "decoupled compute-instance size from storage performance" | **2023-08-29** (Vahdat·Mehta) | https://cloud.google.com/blog/products/compute/titanium-underpins-googles-workload-optimized-infrastructure | ✅ |
| IR-33 | Google: **Hyperdisk ML 데이터가 GA 이후 37배** 성장, AI 가속기 소비 24개월 15배 | 2025-10-14 | IR-16 URL | ✅ |
| IR-34 | **Meta Tectonic**: EB급 분산 파일시스템, 서비스별 전용 시스템을 멀티테넌트 인스턴스로 통합, 메타데이터를 독립 확장 계층으로 분리 + **선형 확장 스토리지 노드 계층**; **HDD·플래시 간 티어링**과 hot/warm/cold 배치 관리 | FAST'21 / 2021-06-21 | USENIX https://www.usenix.org/conference/fast21/presentation/pan ; Meta Eng https://engineering.fb.com/2021/06/21/data-infrastructure/tectonic-file-system/ | 🟡 |
| IR-35 | **AWS S3**(Andy Warfield, FAST'23 기조연설 기반 블로그): 280조+ 객체, 평균 1억+ req/s, "**literally millions of hard drives**"; 최대 기술 난제 중 하나가 대규모 HDD 집합에 I/O "heat"를 균형 분산하는 것 | 2023-07-27 | https://www.allthingsdistributed.com/2023/07/building-and-operating-a-pretty-big-storage-system.html (차단) ; TidBITS https://tidbits.com/2023/07/31/lessons-from-building-and-operating-amazon-s3 | 🟡 |
| IR-36 | **Meta Grand Canyon** 스토리지 서버(OCP 기여): 설계 우선순위에 "power efficiency, modularity, and **longer-life components**"; 드로어당 3.5" HDD 36개, JBOD 2대 연결 시 최대 216 HDD | OCP 2022 | StorageReview https://www.storagereview.com/news/ocp-grand-canyon-storage-system-hands-on ; Wiwynn https://wiwynn.com/news/ocp-grand-canyon-storage-system-hands-on | 🟡 |
| IR-37 | **Meta "A case for QLC SSDs in the data center"**: QLC를 HDD와 TLC 사이 **중간 티어**로, 대상은 "**read-bandwidth-intensive workloads with infrequent write requirements**"; E1.S는 QLC 확장에 부적합, **U.2-15mm 선호(512TB까지 확장 가능)**; "**Designing a server to support DFMs allows the drive slot to also accept U.2 drives**"(슬롯 호환) | **2025-03-04** | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ (이번 세션 차단; 레포 [qlc-v6-standards-lessons-factcheck-2026-09.md](qlc-v6-standards-lessons-factcheck-2026-09.md) C1-30은 ✅로 기록) | 🟡 (본 세션 신규 문구) |

### 1-D. 반증·긴장 관계

| ID | 반증 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| IR-40 | **AI 서버는 내용연수를 줄이는 방향도 있다**: Amazon AI/ML 일부 서버 6→5년 | 2025-01 | IR-08 | 🟡 |
| IR-41 | **컴퓨트는 scale-up(랙 스케일)으로 간다**: Microsoft "rack-scale AI infrastructure based on AMD Helios and NVIDIA Vera Rubin"(IR-13), GB200 NVL72 랙 120kW 공칭(레포 [ai-datacenter-buildout-2026-06.md](../raw-notes/ai-datacenter-buildout-2026-06.md)) | 2026-07-29 / 2026-06 | IR-13 ✅ ; 레포 | ✅ / 레포 |
| IR-42 | **신규 전용(greenfield) AI 캠퍼스도 병행**: Microsoft Fairwater(IR-10), Meta Prometheus(2026년 1GW)·Hyperion(수년 내 5GW)·텐트형 구조물 | 2025-07~ | IR-10 ✅ ; Gigazine https://gigazine.net/news/20250725-meta-tent-data-center | ✅ / 🟡 |
| IR-43 | **CapEx의 2/3가 단수명 자산(CPU·GPU)** — 지출의 중심은 새 하드웨어이며, 토지·건물은 "smaller percentage"(IR-11·IR-12). 인프라 재사용 논지와 양립하나, 지출 규모로는 신규 장비가 지배 | 2026-07-29 | IR-11·IR-12 | ✅ |
| IR-44 | **개조의 비용 — 공랭 홀에 고밀도 랙을 넣으면 랙 위치를 더 쓴다**: Meta 6랙 설계에서 컴퓨트 랙 2개당 냉각 사이드 랙 4개 → **랙 위치 6개에 컴퓨트 2개**(⚠️ 파생: 2/6 = 33%가 컴퓨트) | 2025-09 | IR-18 | ⚠️ 파생 |
| IR-45 | GPU 감가상각 5~6년 가정에 대한 비판(Michael Burry: 실경제 수명 2~3년 주장) — **의견**이며 회사 공시 아님 | 2025~2026 | beancount 블로그 정리 https://beancount.io/blog/2026/07/10/gpu-cloud-depreciation-schedules-guide | ⚠️ (의견·2차) |

### 1-E. ⭐ 판정 — 사용자 논지 중 무엇이 공개 근거로 뒷받침되나

**뒷받침되는 것**
1. **하이퍼스케일러는 기존 자산을 더 오래 쓴다**: 범용 서버 5~6년(4사), 데이터센터 건물 25년(Microsoft FY27). Microsoft는 사유로 **소프트웨어 기반 운영 효율**을 들었다(IR-01·IR-03·IR-09).
2. **기존(공랭) 홀을 버리지 않고 AI 장비를 끼워 넣는다**: Google Brazos(랙 단위, 레거시 시설, GA), Meta AALC(기존 홀 설계 그대로), Microsoft sidekick·"모든 Azure 리전 액체냉각 지원 = fleet fungibility", AWS IRHX(기존 구성 내 작동)(IR-10·IR-14~IR-19).
3. **"세대를 넘는 인프라 재사용·표준 인터페이스·모듈성"을 하이퍼스케일러가 설계 원칙으로 공표**했다(Google IR-16, 스토리지까지 명시).
4. **스토리지는 스케일아웃이고, 매체 혼합은 소프트웨어가 한다**: Colossus(HDD+SSD 혼합, "필요한 만큼만 플래시"), Tectonic(HDD·플래시 티어링), S3(수백만 HDD), Titanium(scale-out offload)(IR-30~IR-35).

**뒷받침되지 않거나 확보하지 못한 것**
- 하이퍼스케일러가 **"인프라 재사용 때문에 단일 장치 혼합 매체를 원한다"고 연결한 공개 진술**: 없음(§6 NG-01).
- **"스토리지·범용 서버는 기존 공랭 홀에 남는다"는 명시적 공개 진술**: 없음(NG-06). 확보한 것은 정황(Uptime IR-21: CPU 워크로드가 설치 용량 대부분, Microsoft IR-11: "AI and non-AI infrastructure" 병행).
- 하이퍼스케일러 스토리지 시스템이 보여 주는 혼합 매체는 **모두 시스템 수준(b)** — 매체는 서버·장치 단위로 분리되고 소프트웨어가 묶는다(IR-31 "D servers host HDDs or SSDs"). **장치 수준(a) 혼합 매체를 하이퍼스케일러가 채택했다는 공개 기록은 확보하지 못했다.**

**긴장**: 컴퓨트는 랙 스케일 scale-up(IR-41)과 신규 캠퍼스(IR-42)로 가고, AI 서버 일부는 수명이 짧아진다(IR-40). "scale-out 선호"는 **스토리지·범용 컴퓨트에 대해서만** 근거가 있다.

---

## §2. (B) 혼합 매체 제품·아키텍처

### 2-A. 장치 수준 (한 드라이브 안에 호스트가 볼 수 있는 이종 영역)

| ID | 제품·기술 | 사실 (용량·비율·영역 내구성·노출 방식) | 일자·상태 | 출처 URL | 등급 |
|---|---|---|---|---|---|
| MM-01 | **Intel Optane Memory H10** | 한 M.2 2280에 **Optane 16GB + QLC 256GB / Optane 32GB + QLC 512GB / Optane 32GB + QLC 1TB**. 호스트에는 **PCIe 3.0 x2 SSD 2개**로 보이며(플랫폼 bifurcation 필요), **Intel RST 드라이버(v17.2+)** 가 둘을 묶어 hot 데이터를 Optane에 캐싱. 8세대 Core U + 300 시리즈 PCH 필요 | 2019-04 사양 공개, OEM 노트북 | AnandTech https://www.anandtech.com/show/14196/intel-releases-optane-memory-h10-specifications ; AnandTech 리뷰 https://www.anandtech.com/show/14249/the-intel-optane-memory-h10-review-two-ssds-in-one ; Tom's Hardware https://www.tomshardware.com/reviews/intel-h10-qlc-flash-optane-caching,6094.html | 🟡 |
| MM-02 | **Intel Optane Memory H20** | **Optane 32GB + QLC 512GB/1TB**, M.2 2280, PCIe 3.0 x4, 11세대 Core 플랫폼용 | 2021-05-18 발표, 2021-06-20 OEM 공급. Optane 사업은 2022 종료(wcssd-v1 H-15) | Intel Newsroom https://intel.com/content/www/us/en/newsroom/article/intel-delivers-next-gen-optane-memory-laptops.html ; Vortez https://www.vortez.net/news_story/intel_launches_optane_memory_h20_with_solid_state_storage_for_11th_gen_platforms.html | 🟡 |
| MM-03 | ⭐ **Micron 4150AT** (차량용) | 쿼드포트 SR-IOV, **176단 TLC**, 최대 1.8TB, 네임스페이스로 64개 private/shared 자원. **TLC / SLC / HE-SLC "엔듀런스 그룹"을 구성 가능 — SLC는 TLC 대비 20배, HE-SLC는 50배 내구성**. HE-SLC는 블랙박스 상시 기록 등 쓰기 집약 용도(DRAM 대체) | **2024-04-09 샘플링 발표**. 양산 여부 미확인 | TipRanks(Micron PR) https://www.tipranks.com/news/press-releases/micron-debuts-worlds-first-quad-port-ssd-to-accelerate-data-rich-autonomous-and-ai-enabled-vehicle-workloads ; Mouser https://www.mouser.ch/new/micron-technology/micron-4150at-ssd ; Nasdaq https://www.nasdaq.com/articles/micron-mu-unveils-quad-port-ssd-for-autonomous-vehicles | 🟡 (엔듀런스 그룹·20×/50×는 Mouser 페이지 검색 요약) |
| MM-04 | **DapuStor J5060 dual-mode** (wcssd-v1 F-43·P-08·C-10 보완) | 신규 확인: pSLC 영역 **4K 랜덤 쓰기 평균 지연 <8µs**(벤더), 순수 QLC 대비 랜덤 쓰기 IOPS **7배+**, "**software-defined media configuration**" — 전용 SLC NAND 없이 선택된 QLC 셀을 pSLC로 운용, 영역은 **고정(permanent/fixed)**. 매체 산술: 24베이 서버 × 800GB = **19.2TB pSLC**. J5060 계열 15.36/30.72/61.44/122.88TB. **가격·영역별 전체 내구성·독립 벤치마크·GA 일자 미공개** | FMS 2026(2026-08) 발표, 상세 2026-09-21~23 | remio https://www.remio.ai/post/dapustor-dual-mode-ssd-trades-capacity-for-faster-random-writes ; WindowsForum https://windowsforum.com/news/dapustor-j5060-adds-fixed-pslc-region-as-separate-block-devices.445407/ ; cloudnews https://cloudnews.tech/dapustor-combines-slc-and-qlc-in-a-single-ssd-to-speed-up-ai/ ; foro3d 2026-09-23 https://foro3d.com/2026/septiembre/dapustor-j5060-ssd-empresarial-con-qlc-y-region-pslc-por-firmware.html | 🟡 |
| MM-05 | ⭐ **Kioxia "Mixed Mode SSD"** (FMS 2025) | 발표자 Mike Klemm(Kioxia Fellow, Storage Pathfinding). **pSLC + QLC**, "**custom pSLC:QLC ratio for each deployment**", pSLC의 랜덤 IOPS·내구성 + QLC 용량. 용도: **데이터 티어링, 단수명 vs 장수명 데이터**, "flexible space configuration" | **2025-08-06** 발표. 제품명·출하 미확인 | FMS 2025 SSDT-203-1 https://files.futurememorystorage.com/proceedings/2025/20250806_SSDT-203-1_Klemm.pdf (차단) | 🟡 `[검색 요약 경유]` |
| MM-06 | ⭐ **Kioxia FMS 2026 세션 "Unlocking QLC Performance and Scalability"** | 발표자 Hadi Sayed(Kioxia America, Staff PM). "**mixed-media SSD** architectures that integrate **a small, high-endurance SLC namespace alongside a large, high-density QLC namespace within a single drive**". **SLC 티어 = 지연 민감 메타데이터·쓰기 버퍼·소블록 I/O, QLC 티어 = 큰 정렬 쓰기**. 주장: WA 감소, 고사용률에서 지속 쓰기 효율 개선, 성능 민감 환경에서 대용량 QLC 활용 가능 | **2026-08** (FMS 2026: 2026-08-04~06) | Terrapinn 연사 페이지 https://www.terrapinn.com/conference/future-memory-storage/speaker-hadi-SAYED.stm (차단) | 🟡 `[검색 요약 경유]` |
| MM-07 | Phison aiDAPTIV+ 하이브리드 SSD | TLC 네임스페이스 + SLC 캐시 네임스페이스(wcssd-v1 D-05·F-44). README 원문: "**aiDAPTIV middleware requires the use of an aiDAPTIV cache memory SSD**", 캐시 SSD는 시스템 통합사 경유 판매 | CES 2026 데모 | https://raw.githubusercontent.com/aiDAPTIV-Phison/aiDAPTIV/main/README.md | ✅ (README) / 🟡 (하이브리드 구성) |
| MM-08 | Kioxia SEF | 가상 디바이스별 pSLC 슈퍼블록 쿼터(wcssd-v1 F-45, B-03). **2020-11 QLC 지원 추가 → SLC/MLC/TLC/QLC 전 밀도 지원** | 2020-11 / SDK | StorageNewsletter https://www.storagenewsletter.com/2020/11/12/fms-2020-kioxia-improves-software-enabled-flash-technology-with-qlc-flash-and-weighted-fair-queueing/ | 🟡 |
| MM-09 | (대조) **Sandisk UltraQLC — "Direct Write QLC"** | "**eliminates SLC buffering** by enabling power-loss safe writes on the first pass". SN670 128TB·UltraQLC 256TB U.2 **2026 상반기**. DFS로 동일 전력에서 성능 최대 +10%, Data Retention profile로 DR recycle 최대 −33%(예상치) | 2025-08-05 (FMS 2025) | Businesswire https://www.businesswire.com/news/home/20250805490958/en/ ; Sandisk IR https://investor.sandisk.com/news-releases/news-release-details/sandisk-showcases-ultraqlctm-technology-platform-milestone | 🟡 — **혼합 매체와 반대 방향(SLC 버퍼 제거)** |
| MM-10 | 특허(방향성 참고) | Micron **US10452596** "Memory cells configured in multiple configuration modes": 호스트 제어 정보로 **논리 주소 범위에 대응하는 셀 부분을 SLC/MLC/TLC 모드로 동시에 다르게** 운용(공개 US20170123707). **US12093547B2** "User configurable SLC memory size"(발명자 Chace A. Clark·Francis Corrado, PCT/US2022/024865) — 양수인 순서가 검색 요약에서 "SK hynix NAND Product Solutions → Intel"로 나와 **양도 방향 미확정** | 2017 공개 / 2024 등록 | https://patents.justia.com/patent/10452596 ; https://patents.google.com/patent/US12093547 (차단) | 🟡 / ⚠️ (양수인) |

### 2-B. 시스템 수준 (이종 장치를 호스트·클러스터 소프트웨어가 묶음)

| ID | 시스템 | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|
| MM-20 | **Solidigm CSAL** | 원래 Intel 기술. "**Optane을 얇은 성능 티어로, QLC를 용량 티어로**" 쓰는 호스트 FTL. **Alibaba(초기 QLC 고객)와 공동 개발**, Optane 종료 후 Solidigm이 기술·팀 인수. **SPDK v22.09로 오픈소스화**. Alibaba에서 대규모 배치 — "**VM 밀도 2배, time to insight 절반**" | 2022-09~ | Solidigm 뉴스룸 https://news.solidigm.com/en-WW/231383-csal-qlc-game-changer-and-open-source-solution-for-the-future/ ; SNIA SDC22(Ye·Karkra) https://www.snia.org/sites/default/files/2025-05/SNIA-SDC22-Ye-Karka-Cloud-Storage-Acceleration-Layer.pdf | 🟡 |
| MM-21 | ⭐ **SPDK FTL = CSAL의 핵심** (원문) | `doc/ftl.md`: "It is the **core component of CSAL**". 목적: "**>4K write unit 장치나 큰 indirection unit을 가진 장치(some capacity-focused NAND drives)** 위에 효율적인 4K 블록 디바이스 제공". **nvcache(별도 bdev)가 사용자 쓰기를 버퍼링**하고, 빈 chunk가 임계치 아래로 떨어지면 꽉 찬 chunk를 base bdev로 옮김(chunk compaction). L2P = **4B/LBA(<16TiB), 8B/LBA(≥16TiB)**, 기본 DRAM 2GiB만 상주·나머지는 캐시 장치로 페이징. band 기본 1GiB, write unit 1MiB. **전제: 캐시 ≥5GiB, base ≥20GiB**, base write unit은 2의 거듭제곱(코드상 ≤1MiB). 기본값(`ftl_conf.c`): **OP 20%**, chunk compaction 임계 80%, free 목표 5%, GC 시작 = free band 5개. `include/spdk/ftl.h`: cache bdev "must support extended metadata"; 이후 non-VSS 경로 추가(`ftl_nvc_bdev_non_vss.c`, "Copyright 2023 Solidigm") | 저장소 master `d912280`(2026-10-01) | https://raw.githubusercontent.com/spdk/spdk/master/doc/ftl.md ; https://github.com/spdk/spdk/tree/master/lib/ftl | ✅ |
| MM-22 | SPDK FTL CI 테스트 토폴로지 (원문) | `test/ftl/ftl.sh`: 캐시 디스크는 **메타데이터 64B(`md_size==64`) 포맷 NVMe**에서 고르고, base 디스크는 **캐시와 다른 PCI 주소**의 NVMe에서 고른다. `common.sh`는 각 장치를 `bdev_split_create`로 잘라 쓴다 | 2026-10-01 | https://raw.githubusercontent.com/spdk/spdk/master/test/ftl/ftl.sh ; …/test/ftl/common.sh | ✅ |
| MM-23 | CSAL 캐시 매체 구성 이력 | 캐시 = **Optane P5800X**(Alibaba 초기) → **D7-P5810 SLC 800GB(50 DWPD)** → Wiwynn 레퍼런스 플랫폼은 **D7-PS1010 Gen5 TLC** 캐시 + **D5-P5336 QLC** 용량 | 2022~2025 | Solidigm https://www.solidigm.com/products/technology/csal-based-reference-storage-platform.html ; architecting.it https://www.architecting.it/?p=5518 | 🟡 |
| MM-24 | Alibaba ECS D3C | HDD 기반 2세대 로컬디스크 인스턴스(D2C) 노드를 **D5-P5316 QLC**로 교체한 3세대(D3C)에서 **성능·밀도 2배, 고객 가격 동일 유지**. D5-P5336 61.44TB는 P5316 대비 밀도 4배, TCO 2배 절감(Solidigm 주장) | FMS 2024 등 | 위 Solidigm 레퍼런스 페이지 ; StorageNewsletter https://storagenewsletter.com/?p=279197 | 🟡 (벤더 주장) |
| MM-25 | CSAL 후속 | SNIA SDC25(Barczak·Mehta): CSAL + 코어 스케일링 + RAID5F — "**최대 2배 처리량, 기존 CSAL 대비 WA −30%**"(예비 시뮬레이션·결과). FMS 2024: "CSAL의 FDP 구현, Gen5 캐시 SSD 스케일링", "Alibaba ECS D3C용 CSAL" 세션 | 2024-08 / 2025-09 | SNIA https://www.snia.org/sites/default/files/2025-10/SNIA-SDC25-Barczak-Mehta-CSAL-with-Core-Scaling-RAID5F.pdf ; FMS 2024 https://files.futurememorystorage.com/proceedings/2024/20240806_FARP-101-1_Barczak.pdf | 🟡 |
| MM-26 | **VAST Data** | 단일 QLC 플래시 티어 + **SCM(Optane)을 메타데이터·입력 쓰기 버퍼로** 사용("QLC 마모를 줄일 시간과 공간 확보"). 초기 D-box: **Optane 1.5TB × 12 + QLC 15TB × 44**. 2021-11 Optane 공급 우려로 **Kioxia FL6(SLC) 인증**. **Ceres(2022-03-22)**: 1RU에 **E1.L QLC 22개(15.36/30.72TB, 이후 61.44TB로 1.35PB) + U.2 SCM 8개(Kioxia FL6 800GB, 총 6.4TB)** | 2019~2022 | Blocks&Files https://blocksandfiles.com/2021/11/05/vast-data-lessens-optane-ssd-dependency/ ; https://blocksandfiles.com/2022/03/22/vast-data-ceres-storage-drive-enclosure/ ; StorageReview https://www.storagereview.com/review/vast-data-ceres-data-nodes-launched-with-bluefield-e1-l-and-scm-on-board | 🟡 |
| MM-27 | Pure DirectFlash × Meta | DFM 150TB→300TB QLC, 호스트(Purity)가 FTL 처리; Meta 설계 승리 2024-12(레포 [qlc-essd-history-2022-background-2026-09.md](qlc-essd-history-2022-background-2026-09.md)·[storage-vendor-deal-structures-2026.md](storage-vendor-deal-structures-2026.md)) | 2024-12~ | 레포 | 🟡 (레포 기록) |
| MM-28 | ⭐ **Google Colossus L4** (원문) | SSD 배치 3방식: ① `partition=ssd` = 파일 전체를 SSD(가장 비쌈) ② `partition=ssd.1` = **복제본 1개만 SSD**("hybrid placement") ③ **L4 분산 SSD 캐시**(대부분 데이터). L4 읽기 캐시는 워크로드별로 **ML 정책 선택**(쓰기 시 삽입 / 1회 읽기 후 / 짧은 시간 내 2회 읽기 후; CacheSack 논문). **L4 writeback**: 새 파일을 SSD에 둘지·**얼마나 오래**(예: 1시간·2시간·안 둠) 둘지 curator에 조언 → 기간 후 HDD로 이전, 파일이 먼저 지워지면 HDD I/O 없음. 애플리케이션이 파일 유형·DB 컬럼 메타데이터 같은 **feature를 L4에 전달**, 범주별 I/O 관찰로 **온라인 시뮬레이션** | **2025-03-26** | IR-31 URL | ✅ |

### 2-C. 요약 비교 (사실만, 출처는 위 ID)

| 대상 | 수준 | 매체 조합 | 작은 쪽 비율 | 노출 방식 | 영역별 내구성 공개 | 상태 | 호스트 SW 필수 |
|---|---|---|---|---|---|---|---|
| Optane H10/H20 (MM-01·02) | 장치(이종 매체) | Optane + QLC | 3.1~6.25% (⚠️ 파생, EC-03) | **NVMe 장치 2개**(x2+x2) | 미확인 | 단종 | **예(Intel RST)** |
| Micron 4150AT (MM-03) | 장치(모드) | TLC/SLC/HE-SLC | 미공개 | **엔듀런스 그룹 + 네임스페이스** | **상대값(20×·50×)** | 샘플링(2024-04) | 미확인 |
| DapuStor J5060 dual-mode (MM-04) | 장치(모드) | pSLC + QLC | 6~20%의 QLC 소모 | **별도 블록 디바이스** | 상대값(>25× P/E), 절대값 미공개 | 발표(2026-08) | 표준 블록 I/O로 접근(전용 SW 언급 없음) |
| Kioxia Mixed Mode (MM-05·06) | 장치(모드) | pSLC + QLC | "배치별 맞춤" | **SLC 네임스페이스 + QLC 네임스페이스** | 미공개 | 발표(2025-08·2026-08) | 플랫폼이 데이터 유형별로 보내야 함(MM-06 서술) |
| Phison aiDAPTIV 하이브리드 (MM-07) | 장치(모드) | SLC + TLC | 미공개 | 네임스페이스 2개 | 미공개 | 데모 | **예(aiDAPTIV 미들웨어)** |
| Kioxia SEF (MM-08) | 장치(호스트 관리) | pSLC + 원 모드 | 호스트 지정 쿼터 | 가상 디바이스·QoS 도메인 | API로 P/E 조회 | SDK·샘플 | **예(SEF API)** |
| CSAL (MM-20~25) | 시스템 | Optane/SLC/TLC SSD + QLC SSD | 미공개 | 별도 장치 2개를 FTL bdev 1개로 | 장치별 | 상용(Alibaba) | **예(SPDK)** |
| VAST (MM-26) | 시스템 | SCM(Optane/FL6) + QLC | 0.47~2.7% (⚠️ 파생, EC-04) | 별도 드라이브 | 장치별 | 상용 | **예(DASE)** |
| Colossus L4 (MM-28) | 시스템 | SSD 서버 + HDD 서버 | "just enough flash" | 별도 서버 | — | 상용 | **예(L4·curator)** |

---

## §3. (C) 혼합 매체를 가능하게 하는 표준 훅

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| ST-01 | **NVMe 1.4(2019-06)**가 **NVM Sets·Endurance Groups·Predictable Latency Mode(NVM Set 단위)** 를 도입. 하이퍼스케일러가 격리·예측 지연·WA 요구를 가져와 추가된 기능으로 소개됨 | 2019-06 | NVM Express "Changes in NVMe Revision 1.4" https://nvmexpress.org/changes-in-nvme-revision-1-4/ (차단) ; AnandTech https://www.anandtech.com/show/14543/nvme-14-specification-published/2 | 🟡 |
| ST-02 | **Identify Controller CTRATT 비트**: bit2 **NVM Sets**, bit4 **Endurance Groups**, bit5 **Predictable Latency Mode**, bit11 **Fixed Capacity Management**, bit12 **Variable Capacity Management**, bit13 **Delete Endurance Groups**, bit14 **Delete NVM Sets**, bit19 **Flexible Data Placement** | 규격 구현 현행 | libnvme `enum nvme_id_ctrl_ctratt` https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h ; Linux `include/linux/nvme.h` | ✅ |
| ST-03 | Identify Controller에 **NSETIDMAX**(NVM Set ID 최댓값), **ENDGIDMAX**(Endurance Group ID 최댓값), **MEGCAP**(단일 엔듀런스 그룹 최대 용량) 필드 | 〃 | libnvme `struct nvme_id_ctrl` | ✅ |
| ST-04 | ⭐ **NVM Set Attributes Entry**(Identify NVM Set List): `nvmsetid`, `endgid`, **`rr4kt`(Random 4 KiB Read Typical — PLM 결정적 창에서 미결 명령 1개일 때 4KiB 랜덤 읽기 전형 시간, 100ns 단위)**, **`ows`(Optimal Write Size)**, `tnvmsetcap`/`unvmsetcap`(전체/미할당 용량) → **⚠️ 파생**: 표준만으로 호스트가 "지연이 낮은 세트 vs 큰 쓰기 단위 세트"를 발견할 수 있는 필드가 있다 | 〃 | libnvme `struct nvme_nvmset_attr` | ✅ / ⚠️ 파생 |
| ST-05 | **Identify Namespace에 `nvmsetid`·`endgid`** — 네임스페이스는 하나의 NVM Set·엔듀런스 그룹에 소속 | 〃 | libnvme `struct nvme_id_ns` ; Linux `nvme.h` | ✅ |
| ST-06 | ⭐ **엔듀런스 그룹별 회계·경보** — Endurance Group Information 로그(LID 09h): Available Spare·Threshold, **Percentage Used**, **Endurance Estimate**, Data Units Read/Written, **Media Units Written**, Total/Unallocated EG Capacity, Domain ID. **EG Critical Warning**: 예비 용량 임계 미만 / 신뢰성 저하 / "**Endurance Group have been placed in read only mode**". 동반: Endurance Group Event Aggregate 로그, OAES "Endurance Group Events Aggregate Log Change Notices", SMART의 Endurance Group Critical Warning Summary → **영역(EG)별 마모·읽기전용 전환을 표준으로 따로 보고할 그릇이 있다** | 〃 | libnvme `struct nvme_endurance_group_log`, `enum nvme_eg_critical_warning_flags` (wcssd-v1 R-05 보완) | ✅ |
| ST-07 | **NVMe 2.0(2021-06) TP4052 — Endurance Group·NVM Set 관리**: Capacity Management 관리 명령, 계층 = **NVM Subsystem ⊃ Domain ⊃ Endurance Group ⊃ NVM Set ⊃ Namespace**, **Media Unit**을 EG·NVM Set에 할당 | 2021-06 | SNIA SDC21(Onufryk) https://snia.org/sites/default/files/2025-05/SNIA-SDC21-Onufryk-NVMe2.0-Specifications-The-Next-Generation-of-NVMe-Technology.pdf ; NVMe 2.0 Changes https://nvmexpress.org/wp-content/uploads/NVM-Express-Revision-2.0-Changes.pdf (차단) | 🟡 |
| ST-08 | ⭐ **Media Unit·Capacity Configuration 구조(원문)** — **Media Unit Status Descriptor**: MUID·Domain ID·**ENDGID·NVMSETID**·**Capacity Adjustment Factor**·Available Spare·**Percentage Used**·채널 수/오프셋(=**미디어 유닛마다 소속 EG와 마모율을 따로 보고**). **Endurance Group Configuration Descriptor**: ENDGID·**Capacity Adjustment Factor**·TEGCAP·SEGCAP·**Endurance Estimate**·소속 NVM Set 목록. **Capacity Configuration Descriptor**(구성 ID·Domain·EG 구성 목록)와 **Supported Capacity Configuration List** 로그. **Domain Attributes**: 총·미할당·EG 최대 도메인 용량. (Capacity Adjustment Factor의 규격 정의는 여전히 미확보 — wcssd-v1 F-24·G-08) | 〃 | libnvme `nvme_media_unit_stat_desc`, `nvme_end_grp_config_desc`, `nvme_capacity_config_desc`, `nvme_supported_cap_config_list_log`, `nvme_id_domain_attr` | ✅ (필드) / ⚠️ (의미) |
| ST-09 | nvme-cli: `capacity-mgmt`는 "configure/create/delete the Endurance Groups or NVM Sets", 생성 용량은 바이트(`--cap-lower/--cap-upper`), 성공 시 CQE DW0에 생성 ID. **nvme-cli 3.0에서 명령 체계 개편**: `nvme log endurance`, `nvme id endgrp-list`, `nvme log media-unit-stat`, `nvme id nvmset`(구 명령은 deprecated alias) | master 2026-10-02 | https://github.com/linux-nvme/nvme-cli/tree/master/Documentation (`nvme-capacity-mgmt.txt`, `nvme-endurance-log.txt`, `nvme-list-endgrp.txt`, `nvme-media-unit-stat-log.txt`) | ✅ |
| ST-10 | **QEMU NVMe 에뮬레이터는 엔듀런스 그룹 1개만** 모델링(서브시스템당 `endgrp` 하나, Endurance Group Information 로그는 `endgrpid != 0x1`이면 Invalid Field 반환). Capacity Management 미구현(wcssd-v1 F-25) → **표준 참조 에뮬레이터로는 다중 EG 혼합 매체를 시험할 수 없다** | master | https://raw.githubusercontent.com/qemu/qemu/master/hw/nvme/ctrl.c (`nvme_endgrp_info`) ; …/hw/nvme/subsys.c | ✅ |
| ST-11 | ⭐ **Linux 커널은 네임스페이스마다 ENDGID를 읽고, 그 EG의 FDP 구성을 조회**한다: `nvme_query_fdp_info()`가 Get Features FDP를 `info->endgid`로 호출 → FDP 활성 시 RUH Status(I/O Management Receive)로 **Placement ID 목록을 받아 블록 계층 write stream(`nr_plids`)으로 노출**, `write_stream_granularity = RUNS` | master | https://raw.githubusercontent.com/torvalds/linux/master/drivers/nvme/host/core.c | ✅ |
| ST-12 | ⭐ **FDP RUH 서술자에는 매체 유형 필드가 없다**: `struct nvme_fdp_ruh_desc` = `ruht`(1 Initially Isolated / 2 Persistently Isolated) + 예약 3바이트. FDP Configuration Descriptor = `fdpa`(RGIF·FDPVWC·Valid)·`vss`·`nrg`·`nruh`·`maxpids`·`nnss`·`runs`·`erutl`·예약 → **⚠️ 파생: 표준 FDP로는 "이 RUH는 SLC 영역"을 표현할 수 없고, 매체 분리를 표준으로 표현하는 단위는 엔듀런스 그룹(ST-05·06)이다** | master | nvme-cli `libnvme/src/nvme/nvme-types-nvm.h` | ✅ / ⚠️ 파생 |
| ST-13 | ⭐ **NVMe 2.3 Configurable Device Personality(CDP)가 libnvme에 반영됨**(wcssd-v1 F-46의 "libnvme 미반영(2026-09-28)"을 갱신): Set Features **FID 22h** "Configurable Device Personality", **Device Personalities 로그 LID 1Dh**, Identify Controller **`cdpa`**(HMAC-SHA-384 지원 비트), Persistent Event **0Fh "CDP Change Event"**(변경 오류·freeze 요청 상태), SMART Critical Warning "**Indeterminate Personality**"(변경 실패 후 이전 설정으로도 복귀 못함). Personality Properties: **MRSTT**(필요 리셋: 없음/컨트롤러 리셋/제한적 컨트롤러 리셋/**NVM 서브시스템 리셋/전원 재투입**), **AUS**(물리 자격증명·프로그래머블 키 인증 unfreeze; 0이면 "frozen instance … is **permanently frozen**"), 속성 PSCUDE("Personality Settings Change User Data Effect") | nvme-cli master `f938b92`(2026-10-02) | nvme-cli `libnvme/src/nvme/nvme-types-base.h` https://github.com/linux-nvme/nvme-cli/tree/master/libnvme/src/nvme | ✅ |
| ST-14 | ⭐ **CDP에 정의된 퍼스낼리티 ID는 보안·잠금·초기화 계열뿐**: 00h Manufacturing Default, 01h Security, 02h Lockdown Persistence, 03h Revert to Subsystem Manufacturing Settings, FFh All. **매체 모드·용량·내구성 퍼스낼리티는 libnvme 열거형에 없다.** nvme-cli는 이름 디코딩만 하고 CDP 설정 전용 명령은 없다 | 〃 | 위 파일 `enum nvme_personality_identifier` ; nvme-cli `src/nvme-print.c` | ✅ (구현 기준) / ⚠️ (규격 원문 미열람 — 규격에 추가 ID가 있을 가능성 배제 못함) |
| ST-15 | **OCP SMART Extended 로그(C0h)는 사용자 영역과 시스템 영역 마모를 따로 센다**: Physical Media Units Written/Read, **Bad User NAND Blocks / Bad System NAND Blocks**, **System Data % Used**, Endurance Estimate, Percent Free Blocks. (시스템 영역이 pSLC로 운용되는지는 규격 원문 미확인) | 현행 | nvme-cli `plugins/ocp/ocp-smart-extended-log.h` | ✅ (필드) / ⚠️ (매체 해석) |

---

## §4. (D) 경제성

| ID | 사실 | 일자 | 출처 | 등급 |
|---|---|---|---|---|
| EC-01 | **bits-per-cell 산술**: QLC 다이를 SLC 모드로 쓰면 비트 용량 **1/4**, TLC 모드면 **3/4**. 즉 같은 물리 NAND에서 pSLC 1GB는 QLC 4GB, TLC 모드 1GB는 QLC 1.33GB의 기회비용 | — | 산술 | ⚠️ 파생 |
| EC-02 | **실제 전환비는 이론보다 불리**: DapuStor 30.72TB에서 **QLC ≈4TB → pSLC 800GB = 5:1**(wcssd-v1 C-10). 같은 5:1을 세 옵션에 적용(⚠️ 파생): **400GB ← 2.0TB(QLC의 6.5%) / 800GB ← 4.0TB(13.0%) / 1.2TB ← 6.0TB(19.5%)** → 벤더의 "6~20%"와 일치. 드라이브 총 사용 용량은 **29.12 / 27.52 / 25.92TB**(손실 **5.2% / 10.4% / 15.6%**) | 2026-09 | MM-04 ; wcssd-v1 C-10 | 🟡 + ⚠️ 파생 |
| EC-03 | **Optane H10/H20의 캐시 비율**(⚠️ 파생): 16/256 = **6.25%**, 32/512 = **6.25%**, 32/1,024 = **3.1%** | 2019~2021 | MM-01·02 | ⚠️ 파생 |
| EC-04 | **VAST SCM 비율**(⚠️ 파생): 초기 D-box 18TB/660TB = **2.7%**; Ceres 6.4TB/675.84TB = **0.95%**; 61.44TB QLC 장착 시 6.4/1,351.68 = **0.47%** | 2019~2022 | MM-26 | ⚠️ 파생 |
| EC-05 | **Google의 원칙(수치 없음)**: "buy just enough flash to push the I/O density per gigabyte into what disks can typically provide"(2021), "SSD-only storage still poses a **substantial cost premium** over a blended storage fleet of SSD and HDD"(2025). L4 시뮬레이션이 **SSD 용량을 늘리고 줄일 때 HDD에서 덜어낼 I/O를 예측해 SSD 구매와 앱 간 SSD 재배분을 결정** | 2021-04-19 / 2025-03-26 | IR-30·IR-31·MM-28 | ✅ |
| EC-06 | **VDURA Flash Volatility Index**: 30TB QLC SSD **$15,121** vs 30TB HDD **$668** → **22.6배**(2026 Q1). 2025 Q2는 $2,450 vs $495 → **4.9배**. 2026-03-04~23 3주간 SSD 가격 약 +24%. (2026-08 30TB QLC $18,080 — wcssd-v1 C-06) | 2026-04-08 보도 | Blocks&Files https://www.blocksandfiles.com/flash/2026/04/08/vdura-says-30-tb-qlc-ssd-capacity-now-costs-226x-more-than-hdd/5214761 ; Tom's Hardware https://www.tomshardware.com/pc-components/ssds/vdura-sharply-revises-its-enterprise-ssd-pricing-figures | 🟡 |
| EC-07 | **⚠️ 파생 — QLC에서 떼어낸 pSLC의 GB당 기회비용(2026-08)**: VDURA QLC $0.60/GB(C-06) × 4~5 = **$2.4~3.0/GB(pSLC)**. 같은 달 단품 SLC SSD 소매가 Solidigm D7-P5810 **$2.80~3.32/GB**(wcssd-v1 C-04·C-05). **채널(구매자 지수 vs 소매 리스팅)·용량이 달라 원가 비교가 아니다** — "같은 범위에 있다"는 관찰만 가능 | 2026-08 | EC-02 ; wcssd-v1 C-04~C-06 | ⚠️ 파생 |
| EC-08 | **⚠️ 파생 — 슬롯 산술**: 24베이 서버를 J5060 dual-mode(800GB pSLC)로 채우면 **pSLC 19.2TB를 추가 슬롯 0개**로 얻는다(MM-04). 같은 19.2TB를 단품 SLC로 얻으려면 D7-P5810 800GB **24슬롯** 또는 1.6TB **12슬롯**이 필요(용량만 산술, 성능·내구성 동등성은 미검증) | — | MM-04 ; wcssd-v1 H-01 | ⚠️ 파생 |
| EC-09 | Solidigm TCO 주장: QLC SSD가 **HDD+TLC 하이브리드 대비 총 솔루션 비용 최대 −61%**, all-TLC 대비 TCO 최대 −20%; 2PB/1U QLC vs 2U HDD에서 랙 공간 최대 11.8배·전력비 평균 4.9배 절감 | 일자 미상 | SmartBrief(Solidigm 기고) https://www.smartbrief.com/original/qlc-ssds-deliver-on-capacity-performance-and-cost | 🟡 / ⚠️ (벤더 주장, 2026 가격 급등 이전 전제일 가능성) |
| EC-10 | Alibaba: QLC(D3C)로 **성능·밀도 2배, 고객 가격 동일**; CSAL로 **VM 밀도 2배** | 2022~2024 | MM-20·MM-24 | 🟡 (벤더) |
| EC-11 | **"단일 장치 혼합 매체 vs 별도 캐시/티어 장치"의 TCO(랙 유닛·전력·드라이브 수)를 수치로 공개한 출처는 확보하지 못했다** — DapuStor·Kioxia·Phison 모두 비용 수치 없음 | — | §6 NG-05 | ⚠️ 부정 확인 |
| EC-12 | **하이퍼스케일러 지출 구조**: Microsoft CapEx의 약 2/3가 단수명 자산(CPU·GPU), 토지·건물은 "smaller percentage … quite flexible"(IR-11·12). 건물 25년 상각(IR-03) | 2026-07-29 | IR-03·11·12 | ✅ |

---

## §5. (E) 공동설계 — 호스트가 영역을 알아야 하는 근거

| ID | 사실 | 출처 | 등급 |
|---|---|---|---|
| CD-01 | ⭐ **상용 혼합 매체의 대표 사례는 모두 호스트 소프트웨어가 매체를 묶는다**: CSAL = 호스트 FTL(SPDK), Intel H10/H20 = Intel RST 드라이버, VAST = DASE 소프트웨어, Colossus = L4·curator, Phison aiDAPTIV = 미들웨어가 전용 캐시 SSD를 요구 | MM-01·MM-20·MM-21·MM-26·MM-28·MM-07 | ✅(CSAL·Colossus·aiDAPTIV) / 🟡(H10·VAST) |
| CD-02 | **호스트 FTL의 자원 비용(CSAL)**: L2P 4~8B/LBA, 기본 DRAM 2GiB 상주. ⚠️ 파생: 61.44TB를 4KiB LBA로 쓰면 1.5×10¹⁰ LBA × 8B = **약 120GB L2P** → 2GiB만 DRAM, 나머지는 캐시 장치로 페이징 | MM-21 | ✅ + ⚠️ 파생 |
| CD-03 | **배치 결정에 애플리케이션 정보가 들어간다(Colossus)**: 애플리케이션이 파일 유형·DB 컬럼 메타데이터 등 feature를 L4에 넘기고, L4가 범주별 정책("SSD에 1시간/2시간/안 둠")을 고른다. 파일 생성 시점에 Colossus는 "생성 앱과 파일 이름"만 안다고 명시 | MM-28 | ✅ |
| CD-04 | **장치 수준 혼합 매체도 "어디에 쓸지"를 호스트가 정하는 구조로 발표됨**: DapuStor — "storage software can address the fast region separately, **instead of relying on an invisible write cache**", 영역은 별도 블록 디바이스. Kioxia FMS 2026 — 메타데이터·쓰기 버퍼·소블록은 SLC 네임스페이스, 큰 정렬 쓰기는 QLC 네임스페이스로 "data platforms"가 보냄 | MM-04·MM-06 | 🟡 |
| CD-05 | **같은 기능(메타데이터+쓰기 버퍼)이 지금은 별도 장치에 있다**: VAST는 SCM 드라이브를 메타데이터·쓰기 버퍼로, CSAL은 별도 캐시 장치를 쓰기 버퍼로 사용. SPDK CI도 캐시와 base를 **다른 PCI 장치**로 고른다 | MM-26·MM-21·MM-22 | 🟡 / ✅ |
| CD-06 | **표준의 영역별 회계 그릇**: EG별 Percentage Used·Endurance Estimate·Media Units Written·읽기전용 경보(ST-06), 미디어 유닛별 소속 EG·Percentage Used(ST-08), OCP C0h의 사용자/시스템 영역 분리 계수(ST-15) | ST-06·08·15 | ✅ |
| CD-07 | **보증(TBW) 회계는 영역 단위로 공개된 선례가 없다**: Micron Flex Capacity는 "TBW 고정, DWPD만 변동"(wcssd-v1 F-32). 영역별 내구성을 공개한 것은 Micron 4150AT의 **상대 배수(SLC 20×, HE-SLC 50×)** 와 DapuStor의 **"QLC 대비 P/E 25배+"** 뿐 | wcssd-v1 F-32·P-08 ; MM-03 | 🟡 |
| CD-08 | **표준 호스트 스택의 매체 분리 경로**: Linux는 네임스페이스별 ENDGID로 그 EG의 FDP 구성을 읽어 write stream을 만든다(ST-11). FDP RUH에는 매체 필드가 없다(ST-12). ⚠️ 파생: **표준 경로에서 SLC 영역은 "RUH"가 아니라 "별도 EG의 별도 네임스페이스"로 표현되며, 각 EG가 자기 FDP 구성을 가질 수 있다** | ST-05·11·12 | ✅ + ⚠️ 파생 |
| CD-09 | **영역 크기의 사후 변경은 어렵다**: SEF는 할당 후 pSLC 슈퍼블록 수 변경이 "-ENOSPC로 실패할 수 있음"(wcssd-v1 B-03), DapuStor 영역은 "fixed/permanent"(MM-04), 표준 Capacity Management 삭제 = 소속 네임스페이스 삭제(wcssd-v1 B-04), CDP 변경은 서브시스템 리셋·전원 재투입을 요구할 수 있고 인증 없는 freeze는 영구(ST-13) | wcssd-v1 B-03·B-04 ; MM-04 ; ST-13 | ✅ / 🟡 |
| CD-10 | **"인프라를 소프트웨어로 더 오래 쓴다"는 하이퍼스케일러 진술**: Microsoft 서버 6년의 사유가 "software that increased efficiencies in how we operate our server and network equipment"(IR-01), Google은 "late-bind … reuse infrastructure … standard interfaces"(IR-16) | IR-01·IR-16 | ✅ |

---

## §6. 부정 확인 (검색했으나 확보하지 못한 것)

- **NG-01. 하이퍼스케일러가 장치 수준 혼합 매체(구성 가능한 SLC/TLC 영역)를 공개적으로 요구하거나, 그것을 인프라 재사용과 연결한 진술.** 없음. 검색어: `hyperscaler requirement configurable SLC region QLC SSD OCP specification pSLC namespace Meta Microsoft Google request`, `"mixed-media" SSD SLC namespace QLC namespace single drive … hyperscale`.
- **NG-02. Samsung 엔터프라이즈 SSD의 호스트 가시 pSLC/TLC 영역 기능.** 없음. `Samsung "FlexZ" SSD`는 Z-SSD 결과만 반환(그런 이름의 제품 확인 못함). `Samsung FMS 2026 keynote SSD QLC pSLC hybrid mixed mode namespace`, `Samsung enterprise SSD SLC mode partition QLC configurable SLC namespace hyperscaler`.
- **NG-03. QLC 드라이브의 일부를 "TLC 모드"로 노출하는 제품.** 없음 — 확인된 모든 장치 수준 사례는 pSLC(또는 TLC 다이의 SLC/HE-SLC)다.
- **NG-04. 엔터프라이즈 데이터시트의 영역(엔듀런스 그룹)별 TBW/DWPD 보증.** 없음(Micron 4150AT 상대 배수 제외). `SSD endurance group separate TBW rating per namespace SLC endurance group warranty datasheet`.
- **NG-05. 단일 혼합 매체 드라이브 vs 별도 캐시·티어 장치의 TCO(랙 유닛·전력·드라이브 수) 수치.** 없음. `hybrid SLC QLC single SSD TCO versus separate TLC cache drive plus QLC drive rack units power drive slots claim`.
- **NG-06. "스토리지·범용 서버는 기존 공랭 홀에 남는다"는 하이퍼스케일러 명시 진술.** 없음(검색 요약에 그런 문장이 나왔으나 요약기의 추론으로 판단해 채택하지 않음). `Meta storage servers general compute remain air-cooled data halls AI racks liquid cooled`.
- **NG-07. FDP RUH를 pSLC 영역에 매핑하는 벤더·표준 사례.** 없음(ST-12: 표준 필드 자체가 없음). `FDP reclaim unit handle mapped to SLC pSLC region QLC SSD hot data placement host hint`.
- **NG-08. OCP Datacenter NVMe SSD 규격의 엔듀런스 그룹·pSLC 관련 조항 원문.** opencompute.org 차단. `OCP Datacenter NVMe SSD specification endurance group requirement "single Endurance Group" NVM Sets not supported`.
- **NG-09. DapuStor J5060 dual-mode의 영역별 DWPD/TBW·가격·GA 일자.** 미공개(MM-04).
- **NG-10. Kioxia Mixed Mode SSD의 제품명·출하 일정.** 없음. `Kioxia "mixed mode" SSD pSLC QLC FMS 2025 demonstration press release` — 보도자료는 LC9·CM9·CD9P만 언급.
- **NG-11. Alibaba CSAL 배치의 캐시:QLC 용량비, Google L4의 SSD:HDD 용량비.** 없음.
- **NG-12. Amazon·Meta·Alphabet 10-K 원문.** sec.gov 차단으로 미열람(IR-04~IR-08은 🟡).
- **NG-13. NVMe Capacity Management 지원 출하 제품.** 여전히 없음(wcssd-v1 F-25). 참조 에뮬레이터 QEMU는 EG 1개만 모델링(ST-10).
- **NG-14. NVMe 2.3 CDP 규격 원문에서 매체·용량 퍼스낼리티가 정의됐는지.** nvmexpress.org 차단, libnvme 구현에는 없음(ST-14).

---

## §7. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. ✅ (인프라 재사용)** "Microsoft는 2022년 서버·네트워크 장비 내용연수를 4년에서 6년으로 늘리며 '소프트웨어로 장비 운영 효율을 높였다'는 사유를 들었고, 2026년 7월에는 데이터센터 건물 내용연수를 15년에서 25년으로 늘린다고 밝혔다." — IR-01, IR-03

> **2. ✅ (기존 시설 재사용 원칙)** "Google은 '세대가 바뀌어도 인프라를 재사용하는' fungible 데이터센터를 설계 원칙으로 공표했고(2025-10), 기존 공랭 시설에 랙 단위로 액체냉각을 넣는 Brazos를 일반 공급하고 있다(2026-06)." — IR-15, IR-16

> **3. ✅ (스토리지는 소프트웨어가 매체를 섞는다)** "Google Colossus는 HDD와 SSD를 섞어 쓰며 'I/O 밀도를 맞출 만큼만 플래시를 산다'고 밝혔고, 어떤 파일을 SSD에 얼마 동안 둘지는 저장장치가 아니라 클러스터 소프트웨어(L4)가 정한다." — IR-30, IR-31, MM-28

> **4. ✅/🟡 (공동설계)** "지금까지 상용화된 SLC·QLC 혼합 운용 사례(Solidigm CSAL, Intel Optane H10)는 모두 호스트 소프트웨어가 두 매체를 묶는 구조다." — CD-01, MM-01, MM-21

> **5. 🟡 (장치 수준 선례)** "한 QLC 드라이브 안에 호스트가 볼 수 있는 pSLC 영역을 두는 엔터프라이즈 제품은 DapuStor J5060(pSLC 400GB~1.2TB, QLC 용량의 6~20% 소모)이 2026년 발표 단계이고, Kioxia는 FMS 2025·2026에서 SLC 네임스페이스와 QLC 네임스페이스를 한 드라이브에 둔 'Mixed Mode SSD'를 발표했다." — MM-04, MM-05, MM-06

> **6. ✅ (표준 훅)** "NVMe 표준에는 영역별 마모를 따로 보고할 그릇(엔듀런스 그룹별 Percentage Used·Endurance Estimate, 미디어 유닛별 Percentage Used)이 이미 있지만, FDP의 RUH 서술자에는 매체 유형 필드가 없다." — ST-06, ST-08, ST-12

> **7. ✅ (CDP의 한계)** "NVMe 2.3 Configurable Device Personality가 libnvme에 반영됐으나, 정의된 퍼스낼리티는 보안·잠금·공장 초기화 계열뿐이며 매체 모드 전환은 없다." — ST-13, ST-14 (규격 원문 미열람 단서 병기)

> **8. 🟡 + 부정 확인 (반증 병기용)** "하이퍼스케일러가 장치 수준 SLC 영역을 공개적으로 요구한 기록은 찾지 못했고, Amazon은 AI·ML 서버 일부의 내용연수를 오히려 6년에서 5년으로 줄였다(2025)." — NG-01, IR-08

> **❌ 쓰지 말 것**
> - "하이퍼스케일러가 기존 인프라 재사용을 위해 혼합 매체 SSD를 요구한다" → 그런 연결 진술 없음(NG-01). 인프라 재사용(§1)과 혼합 매체(§2)는 **각각** 근거가 있을 뿐이다.
> - "스토리지 서버는 기존 공랭 홀에 남는다" → 명시 진술 없음(NG-06)
> - "QLC 드라이브에서 떼어낸 pSLC가 단품 SLC SSD보다 싸다/비싸다" → 채널이 달라 비교 불가(EC-07)
> - "NVMe CDP로 SLC/QLC 모드를 바꿀 수 있다" → 구현된 퍼스낼리티에 매체 모드 없음(ST-14)
> - "FDP RUH로 SLC 영역을 지정한다" → 표준 필드 없음(ST-12, NG-07)
> - "Samsung FlexZ" → 확인된 제품명 아님(NG-02)

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| Microsoft 2023·2024·2025 Annual Report | https://www.microsoft.com/investor/reports/ar23/index.html (ar24, ar25 동일 경로) | 서버·네트워크 4→6년(FY23 영향 $3.7B/$3.0B), 내용연수 정책 범위, "Every Azure region … liquid cooling … fungibility" |
| Microsoft FY26 Q4 실적 콜 원문 (2026-07-29) | https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4 | 건물 15→25년(FY27), CapEx 2/3 단수명 자산, "pretty fungible", "get more out of everything … in the fleet", 토지·건물 투자 "quite flexible", Cobalt 200 25+ DC, rack-scale Helios/Vera Rubin |
| Google Cloud 블로그 — Colossus (2021-04-19, 2025-03-26) | https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system ; …/how-colossus-optimizes-data-placement-for-performance | HDD+플래시 혼합, "just enough flash", 분리(disaggregation), 10EB+, 50/25 TB/s, 600M IOPS, SSD-only 비용 프리미엄, L4 읽기 캐시·writeback·시뮬레이션 |
| Google Cloud 블로그 — Titanium (2023-08-29) | https://cloud.google.com/blog/products/compute/titanium-underpins-googles-workload-optimized-infrastructure | scale-out offload, Hyperdisk 분리 |
| Google Cloud 블로그 — Agile/fungible DC (2025-10-14), Brazos (2026-06-16), OCP 2024 키노트 | https://cloud.google.com/blog/topics/systems/agile-data-centers-and-systems-to-enable-ai-innovations ; …/brazos-liquid-cooling-system-for-air-cooled-data-centers ; …/2024-ocp-global-summit-keynote | fungibility·late-bind·인프라 재사용·표준 인터페이스, 레거시 공랭 시설 랙 단위 액체냉각 60kW |
| SPDK (master `d912280`, 2026-10-01) | https://raw.githubusercontent.com/spdk/spdk/master/doc/ftl.md ; `lib/ftl/utils/ftl_conf.c` ; `lib/ftl/nvc/*` ; `include/spdk/ftl.h` ; `test/ftl/{ftl,common,fio}.sh` ; `CHANGELOG.md` | CSAL 핵심 = FTL, nvcache 구조, L2P 크기, 전제 용량, 기본 OP 20%, 캐시 확장 메타데이터, CI는 캐시·base를 다른 PCI 장치로 |
| nvme-cli (master `f938b92`, 2026-10-02) + 병합된 libnvme | https://github.com/linux-nvme/nvme-cli (`libnvme/src/nvme/nvme-types-base.h`, `nvme-types-nvm.h`, `Documentation/`, `plugins/ocp/`, `src/nvme-print.c`) | CDP(FID 22h, LID 1Dh, 퍼스낼리티 ID·MRSTT·AUS), FDP RUH/구성 서술자, capacity-mgmt·endurance 명령 문서, OCP C0h 필드 |
| 구 libnvme `types.h` | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h | CTRATT 비트, NSETIDMAX/ENDGIDMAX/MEGCAP, NVM Set 속성(rr4kt·ows), EG 로그·경보, Media Unit·Capacity Config 서술자 |
| Linux 커널 | https://raw.githubusercontent.com/torvalds/linux/master/include/linux/nvme.h ; …/drivers/nvme/host/core.c | 네임스페이스 ENDGID로 FDP 조회, PID → write stream |
| QEMU | https://raw.githubusercontent.com/qemu/qemu/master/hw/nvme/ctrl.c ; …/subsys.c | EG 1개만 모델링(`endgrpid != 0x1` → Invalid Field) |
| Phison aiDAPTIV README | https://raw.githubusercontent.com/aiDAPTIV-Phison/aiDAPTIV/main/README.md | 미들웨어가 전용 캐시 SSD 요구 |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| wcssd-v1 F-46: "NVMe 2.3 CDP — libnvme·Linux `nvme.h`에 미반영(2026-09-28 기준)" | **nvme-cli 병합 libnvme(2026-10-02)에 반영됨**: FID 22h·LID 1Dh·퍼스낼리티 00h~03h/FFh·MRSTT·AUS·SMART "Indeterminate Personality"(ST-13). **정의된 퍼스낼리티에 매체·용량 계열 없음**(ST-14). Linux `include/linux/nvme.h`에는 여전히 없음 |
| wcssd-v1 F-43(DapuStor J5060) | 4K 랜덤 쓰기 <8µs, "software-defined media configuration", 고정 영역, 24베이 19.2TB, 가격·GA 미공개 추가(MM-04). 5:1을 세 옵션에 적용한 용량 손실 산술(EC-02) |
| wcssd-v1 F-44·D-05(Phison 하이브리드) | README 원문으로 "미들웨어가 전용 캐시 SSD 요구" 확인(MM-07) |
| wcssd-v1 F-20~F-25(Capacity Management) | Media Unit Status·EG Configuration·Capacity Configuration·Domain 서술자 필드 원문(ST-08), QEMU 단일 EG(ST-10), nvme-cli 3.0 명령 개편(ST-09) |
| wcssd-v1 R-05(EG 로그) | EG Critical Warning(읽기전용 포함)·Event Aggregate·SMART 요약(ST-06), NVM Set 속성 rr4kt·ows(ST-04) |
| 레포 v6 W38·v7 C-11·qlc-v6-purchase D11(CSAL WAF≈1.0 주장, ⚠️) | CSAL의 원문 구조(SPDK FTL)를 ✅로 확보(MM-21·22). WAF 수치는 여전히 벤더 주장 |
| 레포 qlc-v6-standards-lessons C1-30(Meta QLC 블로그 ✅) | 슬롯 호환("DFM 지원 슬롯은 U.2도 수용")·쓰기 드문 읽기 대역 워크로드 문구 추가(IR-37, 본 세션 🟡) |
| 레포 semiconductor-depreciation-cost-structure(삼성·Intel 등 **제조장비** 내용연수) | 본 원장은 **하이퍼스케일러 서버·건물** 내용연수(IR-01~IR-09)로 다른 대상이다 — 섞지 말 것 |
