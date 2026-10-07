# 주요 데이터센터 기업의 자체 SSD · 공동 설계 팩트 원장 (미국 하이퍼스케일러 · 중국 DC)

**수집일**: 2026-10-07
**유형**: 웹 팩트 체크 원장 (Research Agent 2개: 미국 US-xx, 중국 CN-xx)
**용도**: 고객 협력 전략 덱 3장 3칸 "공동 설계는 이미 주요 데이터센터 기업의 흐름" 근거. 사용자 질문(2026-10-07): "아마존이나 중화 DC 업체들은 자체 SSD를 개발해서 시스템과 연동하여 최적화하려는 움직임이 있다고 들었어. 팩트 체크해서 시각화까지 진행해 줘."
**접근 한계**: 이 세션의 프록시가 aws.amazon.com · azure.microsoft.com · opencompute.org · nvmexpress.org · usenix.org · dl.acm.org · arxiv.org · alibabacloud.com · developer.aliyun.com 등을 차단했다. 원문을 연 곳은 cloud.google.com 블로그와 github.com(CacheLib · xNVMe · MicrosoftDocs)뿐이다.

**등급**: ✅ = 원문 페이지를 열어 문장을 확인 · 🟡ᴾ = 1차 출처 URL(회사 블로그 · 논문 · 공식 발표자료)이나 검색 스니펫으로만 확인 · 🟡 = 2차 언론 스니펫 · ❌ = 확인 실패 또는 반증

**유형 표기**: [SSD] 자체 설계 SSD · [CTRL] 자체 컨트롤러 칩 · [FW] 자체 펌웨어 · FTL · [SPEC] 스펙 · 표준 공동 설계 · [SYS] 호스트 시스템 공동 설계(SSD는 상용품)

---

## 1. 요약: 회사별로 무엇을 직접 하나

| 회사 | 자체 설계 SSD | 자체 컨트롤러 칩 | 자체 펌웨어 · FTL | 스펙 · 표준 공동 설계 | 공개 근거 첫 해 |
|---|---|---|---|---|---|
| Baidu | ✔ SDF(FPGA 기반 보드, 3천 대+) | ✘ (FPGA) | ✔ | | 2014 (CN-14) |
| Google | ✔ "custom designed" SSD(2016 논문) · Titanium SSD | 공개 안 됨 | ✔ (2016 논문: custom PCIe interface, firmware, driver) | ✔ FDP(SmartFTL) · OCP v2.5~ | 2016 (US-12) |
| Alibaba | ✔ AliFlash(2016~) · Dual-mode SSD(2018) | ✔ AliFSC(2018, "customized") · 镇岳510(2023) | ✔ | ✔ AOC 스펙(벤더 5곳) | 2016 (CN-01) |
| Microsoft | 증거 없음("Azure Boost SSD"라는 이름만) | ✘ (오프로드는 FPGA → ASIC · DPU) | Denali에서 FTL 상위층을 호스트로(프로토타입) | ✔ Denali(2018) · OCP v1.0부터 공저 | 2018 (US-20) |
| Meta | 증거 없음 | ✘ | ✘ | ✔ OCP Cloud SSD 스펙 주저자(2020) · FDP(2022) | 2020 (US-27) |
| AWS | ✔ Nitro SSD("custom-designed by AWS") | **미확인, 외부 컨트롤러 벤더 협업 정황**(US-08) | ✔ ("rewrote the whole FTL") | 공개 참여 없음 | 2020 프리뷰 · 2021 공개 (US-01 · US-02) |
| ByteDance | 사내 SSD 개발 조직(펌웨어 설계 포함) | 근거 없음 | ✔ (FMS 2026 연사 소개) | | 2026 (CN-21) |
| Tencent | 근거 없음 | 근거 없음(자체 칩 3종에 SSD 컨트롤러 없음) | 근거 없음 | ✘ (Intel과 시스템 최적화만) | 없음 (CN-20) |

## 2. 미국 하이퍼스케일러 (US)

### 2.1 AWS: Nitro SSD

| ID | 사실 | 핵심 수치 (비교 기준) | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| US-01 | 1세대 Nitro SSD가 EBS io2 Block Express의 기반. "The first generation of Nitro SSD devices were used to power io2 Block Express EBS volumes" | 볼륨당 256K IOPS, 4,000 MB/s, 64 TiB | 프리뷰 2020-12, GA 2021-07-19 | https://aws.amazon.com/blogs/aws/aws-nitro-ssd-high-performance-storage-for-your-i-o-intensive-applications/ | 🟡ᴾ |
| US-02 | 공식 공개(re:Invent 2021). 2세대는 Im4gn · Is4gen. "reduce I/O latency by up to 60% and also reduce latency variability by up to 75% when compared to the third generation of storage-optimized instances" | 지연 최대 -60%, 변동성 최대 -75% (I3 대비) | 2021-11-30 | 같은 블로그 | 🟡ᴾ |
| US-03 | I4i: "Nitro SSDs are NVMe-based and custom-designed by AWS" | 지연 최대 -60%, 변동성 -75% (I3 대비), 로컬 최대 30 TB | 2022-04-27 | https://aws.amazon.com/ec2/instance-types/i4i/ | 🟡ᴾ |
| US-04 | 이유(DeSantis 키노트): FTL은 "all provide generally the same API … but each one has unpredictable and idiosyncratic behaviors"(GC로 I/O 멈춤). Raj Pai: "We launched the Nitro SSDs … where we essentially rewrote the whole FTL." | - | 2021-12-02 | https://www.datanami.com/2021/12/02/aws-adds-a-little-more-nitro-to-its-ssds/ | 🟡 |
| US-05 | 자체 디바이스로 텔레메트리 · 진단, "firmware updates at cloud scale & at cloud speed"(CI/CD) | - | 2021-11-30 | US-01 블로그 | 🟡ᴾ |
| US-06 | re:Invent 2024 CMP334: "design control of hardware and firmware", "centralized Nitro SSD FTL reduces performance variability from different NAND" | 3세대 최대 5.2M 랜덤 IOPS, <250µs, 인스턴스당 최대 120 TB | 2024-12 | https://d1.awsstatic.com/ (CMP334 Deep dive into third-generation AWS Nitro SSDs) | 🟡ᴾ |
| US-07 | NAND는 외부 구매 · 멀티소싱(채용공고): "transparent multi-sourcing of NAND", "fastest growing vertically integrated NAND flash based storage solution at AWS", 사용처 EC2 · EBS | - | 2024~26 공고 | https://amazon.jobs/jobs/3002927 | 🟡ᴾ |
| US-08 | **컨트롤러 반대 증거**: "work with NAND vendor and SSD controller vendor on SSD back end firmware". StorageReview · Forbes는 "Annapurna가 하드웨어 설계"(2차, 범위 모호) | - | 공고(연도 미상) | https://amazon.jobs/en/jobs/3057096 | 🟡ᴾ / "자체 컨트롤러 ASIC"은 ❌ |
| US-09 | I8g(3세대 Nitro SSD) | 성능/TB 최대 +65%, 지연 -50%, 변동성 -60% (I4g 대비), 최대 22.5 TB | 2024-11~12 | https://aws.amazon.com/blogs/aws/ (introducing storage optimized I8g) | 🟡ᴾ |
| US-10 | I7ie(3세대 Nitro SSD) | 최대 120 TB, 성능 +65%, 지연 -50%, 변동성 -65% (I3en 대비) | 2024-12 | https://aws.amazon.com/blogs/aws/now-available-storage-optimized-amazon-ec2-i7ie-instances | 🟡ᴾ |
| US-11 | I8ge GA(3세대 Nitro SSD) | 120 TB, 성능/TB +55%, 지연 -60%, 변동성 -75% (Im4gn 대비) | 2025-08-29 | https://aws.amazon.com/about-aws/whats-new/2025/08/amazon-ec2-i8ge-instances-generally-available | 🟡ᴾ |

### 2.2 Google

| ID | 사실 | 핵심 수치 | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| US-12 | FAST'16(Schroeder · Lagisetty · Merchant): "custom designed high performance solid state drives, which are based on commodity flash chips … use a custom PCIe interface, firmware and driver" | 6년치, 수백만 드라이브 · 일, 10개 모델 | 2016-02 | https://www.usenix.org/system/files/conference/fast16/fast16-papers-schroeder.pdf | 🟡ᴾ |
| US-13 | "Disks for Data Centers"(Brewer)는 **HDD 대상** 백서. SSD 신설계 요청이 아니다 | YouTube 분당 400시간 업로드, 하루 1 PB+ | 2016-02-23 | https://cloud.google.com/blog/products/gcp/google-seeks-new-disks-for-data-centers/ | ✅ |
| US-14 | "C4A … with Titanium SSDs custom designed by Google", "first generation of Google SSDs integrated with Titanium" | 2.4M 랜덤 읽기 IOPS, 10.4 GiB/s, 접근 지연 최대 -35% (이전 세대 Local SSD 대비) | 2025-01 (C4A GA 2024-10-30에는 언급 없음) | https://cloud.google.com/blog/products/compute/first-google-axion-processor-c4a-now-ga-with-titanium-ssd | ✅ |
| US-15 | C4 `-lssd`: "latest Titanium SSDs" | 최대 7.2M 읽기 IOPS, 지연 -35% | 2025-07-31 | https://cloud.google.com/blog/products/compute/c4-vms-based-on-intel-6th-gen-xeon-granite-rapids-now-ga | ✅ |
| US-16 | Z4D Titanium SSD | 15.6M 랜덤 읽기 IOPS, 75,600 MiB/s, LSSD 성능 +70% · 쓰기 지연 -25% (Z3 대비) | 2026-09-28 | https://cloud.google.com/blog/products/compute/storage-optimized-z4d-vm-and-bare-metal-instances | ✅ |
| US-17 | "Titanium SSD is a custom-designed Local SSD disk that uses Titanium I/O offload processing"(C4 · C4A · C4D · Z3 · Z4D) | - | 현행 문서 | https://docs.cloud.google.com/compute/docs/disks/local-ssd | 🟡ᴾ |
| US-18 | FDP(TP4146) = Google SmartFTL + Meta Direct Placement Mode 통합("Google & Meta merged their independent learnings"), FMS 2022 발표 Chris Sabol(Google) · Ross Stenfort(Meta) | 예시 WAF ≈2.5 → ≈1.25 (원문 확인 필요) | 2022 | https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf | 🟡ᴾ |
| US-19 | TP4146 비준 파일명 "TP4146 Flexible Data Placement 2022.11.30 Ratified" | 비준 2022-11-30 | 2022-11-30 | https://github.com/xnvme/xnvme/blob/main/docs/tutorial/fdp/index.rst | ✅ |

### 2.3 Microsoft

| ID | 사실 | 핵심 수치 | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| US-20 | Project Denali(CNEX Labs 프로토타입): 미디어 관리(ECC · 배드블록 · read retry)는 드라이브, 로그 관리(주소 맵 · GC)는 호스트. OCP 표준화 예정. 상용 배치는 확인 못 함 | "slightly better than standard SSDs" | 2018-03 | https://azure.microsoft.com/en-us/blog/project-denali-to-define-flexible-ssds-for-cloud-scale-applications/ | 🟡ᴾ |
| US-21 | "Azure Boost is a system designed by Microsoft", "Storage processing operations are offloaded to the Azure Boost FPGA" | 로컬 최대 36 GBps · 6.6M IOPS | 문서 2025-03-18 | https://github.com/MicrosoftDocs/azure-docs/blob/main/articles/azure-boost/overview.md | ✅ |
| US-22 | Lsv4 "powered by Azure Boost SSDs"(드라이브 설계 주체 미명시) | L96s_v4 6.6M IOPS, 18,000 MBps, 최대 23 TB | 2025 | MicrosoftDocs azure-compute-docs lsv4-series.md | ✅(문서) / 🟡(이름) |
| US-23 | Azure Boost DPU = MS 첫 자체 DPU(Fungible 기술) | 스토리지 워크로드에서 CPU 대비 성능 4배, 전력 1/3 (MS 전망) | 2024-11 | https://techcrunch.com/2024/11/19/new-in-house-chips-round-out-microsofts-portfolio | 🟡 |
| US-24 | 차세대 Azure Boost GA(Esv7 · Dsv7 · Dlsv7): "custom ASIC/FPGA hybrid" | 로컬 NVMe 최대 21M IOPS | 2026-05-07 | techcommunity.microsoft.com (announcing GA of next generation Azure Boost) | 🟡 |

### 2.4 Meta · OCP 스펙

| ID | 사실 | 핵심 수치 | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| US-25 | CacheLib 공식 문서(1.88 TB FDP SSD, KV 캐시 트레이스) | WAF **3.22 → 1.03**(NVM 캐시 100%), 1.22 → 1.03(50%) | 문서 PR 2024-06-18 | https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md | ✅ |
| US-26 | **CacheLib FDP 코드 · 문서 기여자는 삼성 엔지니어**(PR #308, `@samsung.com` 서명), Meta는 리뷰 · 머지. EuroSys'25 저자 7인(Allison, George, González, Helmick, Kumar, Nair, Shah)은 삼성 소속으로 보이며 **Meta 공저자는 찾지 못함** | - | PR 2023-11~2024-08, 논문 2025-03 | https://github.com/facebook/CacheLib/pull/308 ; https://arxiv.org/abs/2503.11665 | ✅(PR) / 🟡(논문 소속) |
| US-27 | NVMe Cloud SSD Spec v1.0 저자: Ross Stenfort · Ta-Yu Wu(Facebook), Lee Prewitt(Microsoft) | v1.0 2020-03-18 | 2020 | https://www.opencompute.org/documents/nvme-cloud-ssd-specification-v1-0-3-pdf | 🟡ᴾ |
| US-28 | Datacenter NVMe SSD Spec v2.0 저자: Facebook · Microsoft · HPE · Dell EMC | - | 2021-07-30 | https://www.opencompute.org/documents/datacenter-nvme-ssd-specification-v2-0r21-pdf | 🟡ᴾ |
| US-29 | v2.5부터 Google 합류(Chris Sabol, Charles Kunzman), 기여사 Meta · Microsoft · HPE · Dell · Google | v2.5 2023-09-28, v2.6 2024-09-25, v2.7 표지 2026-01-08 | 2023~26 | opencompute.org (datacenter-nvme-ssd-specification v2-5 · v2-6-2 · v2-7-final) | 🟡ᴾ |

## 3. 중국 데이터센터 기업 (CN)

### 3.1 Alibaba · Alibaba Cloud · T-Head(平头哥)

| ID | 사실 | 핵심 수치 | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CN-01 | [SSD][FW] AliFlash: "started developing their own SSD solution since 2016". V1 호스트 FTL PCIe SSD, V2 디바이스 NVMe SSD, V3 Open-Channel SSD(DB · RDS · Search · EBS) | V1 2016년 말 배포 **5만 대 이상**, V2 2017년부터 | FMS 2018-08-07 | http://files.futurememorystorage.com/proceedings/2018/20180807_SSDS-102-1_Zhou.pdf ; https://www.alibabacloud.com/blog/alibabas-ssd-platform-sets-a-new-standard-for-storage_593916 | 🟡ᴾ |
| CN-02 | [CTRL?] AliFSC: "Alibaba's first customized high-performance storage controller"(중국어 기사 "自研存储控制芯片"). 설계 주체가 파트너 공동 커스텀일 가능성 배제 못 함 | 6코어, 16채널, PCIe Gen3 x8 | 2018~2019 | https://alibaba-cloud.medium.com/alibaba-deploys-alibaba-open-channel-ssd-for-next-generation-data-centers-3e5e56425f10 | 🟡ᴾ |
| CN-03 | [SPEC] AOC: Alibaba가 스펙을 정의, Intel · Micron · SK hynix · Shannon · CNEX가 같은 플랫폼으로 AOC SSD 출시 예정 | - | 2018~2019 | 위 블로그 · Medium ; https://2019ocpglobalsummit.sched.com/event/Jipe | 🟡ᴾ |
| CN-04 | [SSD][FW] Dual-mode SSD(Open-Channel + NVMe), 내부 서버 배포 | "75% reduction in reading latency", 성능 최대 5배, p99 지연 5.8배 개선 | 2018-03-23 | https://www.alibabacloud.com/blog/alibaba-cloud-launches-dual-mode-ssd-to-optimize-hyper-scale-infrastructure-performance_558010 | 🟡ᴾ |
| CN-05 | [SSD] AliFlash V5: 연산 가속 + 컨트롤러 하이브리드(개발 중) | 배포 미확인 | FMS 2019-08 | https://old.flashmemorysummit.com/Proceedings2019/08-06-Tuesday/20190806_ARCH-101-1_Qiu.pdf | 🟡ᴾ |
| CN-06 | [CTRL] **镇岳510**: 平头哥 "首颗SSD主控芯片", 2023 云栖大会(2023-10-31~11-02) 발표, 2021년 상반기 개발 시작, 자체 RISC-V(玄铁 C910) · PCIe 5.0 | - | 2023-10/11 | https://developer.aliyun.com/article/1365025 | 🟡ᴾ |
| CN-07 | 镇岳510 주장: "4μs超低时延，比业界主流降低30%以上", "误码率低至10^-18" | 3,400K IOPS, 14 GB/s, 420K IOPS/W | 2023-11 | https://news.mydrivers.com/1/943/943260.htm | 🟡 |
| CN-08 | [CTRL → SYS] MemoryS 2025: "规模上线阿里云EBS"(AI 학습 · 추론, 분산 스토리지). Memblaze · DERA SSD 개발 완료, Biwin 공동 개발 | 혼합 읽기 · 쓰기에서 IO 지연 -92%(기사마다 비교 기준 다름, Alibaba 측 주장) | 2025-03 | https://www.yicai.com/news/102509022.html | 🟡 |
| CN-09 | [CTRL만 Alibaba] Memblaze PBlaze7 7A40 = 镇岳510 + YMTC TLC, "阿里云内部使用之后的首款第三方企业级SSD" | 3,300K / 1,000K IOPS, 14.1 / 11.2 GB/s | 2024-09-03 | memblaze.com PBlaze7 7A40 brief | 🟡ᴾ |
| CN-10 | [CTRL] CFMS/MemoryS 2026: **누적 출하 50만 개 초과**, CPFS · OSS · EBS · ECS · RDS 규모 배포, ZNS 네이티브 · 상위 스토리지 시스템과 협업으로 QLC 약점 보완 | 50만 개+ (내부 · 외판 비중 미공개) | 2026-03-27 | https://finance.sina.com.cn/jjxw/2026-03-27/doc-inhsmnzu2060840.shtml | 🟡 |
| CN-11 | [SYS] CSAL(Alibaba · Intel, EuroSys'24): Optane 쓰기 버퍼 + QLC, 호스트 user-mode FTL(4KB 2단계 L2P), SPDK 오픈소스, Solidigm 인수 | VM 밀도 2배. **"WAF 70 → 1.02"는 이 조사에서 확인 실패**(멀티테넌트 WAF 3.8 대 2.3, "30% WAF 감소"만 검색됨) | 2024-04/05 | https://yanbozyb.github.io/paper/csal_eurosys.pdf ; https://www.theregister.com/2024/05/02/alibaba_cloud_csal_ecs_scaling/ | 🟡ᴾ |
| CN-12 | [SYS] HDD 로컬 디스크 → Solidigm D5-P5316 QLC 교체 | 성능 · 밀도 2배 | 2023~2024 | https://news.solidigm.com/en-WW/231383-csal-qlc-game-changer-and-open-source-solution-for-the-future/ | 🟡ᴾ |
| CN-13 | [SYS] FAST'26 Best Paper(Alibaba · SJTU · Solidigm): 로컬 스토리지 Espresso → Doppio → Ristretto(자체 ASIC + ARM SoC 보드) → Latte. SSD가 아니라 IO 오프로드 이야기 | 수십만 대 노드 | 2026-02 | https://www.usenix.org/conference/fast26/presentation/yang | 🟡ᴾ |

### 3.2 Baidu

| ID | 사실 | 핵심 수치 | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CN-14 | [SSD][FW][SYS] SDF(ASPLOS'14, Baidu · 북경대): "hardware/software co-designed storage system", 채널을 호스트에 노출, OP 제거, 웹페이지 · 이미지 저장 | 원시 대역폭 약 **95%**, 용량 **99%** 사용(상용 SSD는 대역폭 40% 이하, 용량 50~70%). 기존 상용 SSD 시스템 대비 I/O 대역폭 **+300%**, GB당 비용 **-50%**. 배포 **3,000대 이상** | 2014-03 | https://dl.acm.org/doi/10.1145/2644865.2541959 ; ceca.pku.edu.cn 논문 PDF | 🟡ᴾ |
| CN-15 | SDF 하드웨어: 25nm MLC, 44채널, FPGA 5개(ASIC 아님) | 44채널 | 2015 | xilinx.com Seoul_Keynote_Baidu.pdf | 🟡ᴾ |
| CN-16 | SDF 이후 자체 SSD · 컨트롤러 공개 자료 없음 | - | - | - | ❌ |

### 3.3 Tencent · ByteDance · 기타

| ID | 사실 | 핵심 수치 | 날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CN-17 | Tencent 자체 칩 3종(紫霄 AI 추론 · 沧海 트랜스코딩 · 玄灵 스마트 NIC), **SSD 컨트롤러 없음** | - | 2021-11-03 | https://www.thepaper.cn/newsDetail_forward_15203146 | 🟡 |
| CN-18 | [SYS] Tencent Cloud × Intel 초고속 CBS 재설계(SPDK · RDMA · Optane PMem), 자체 SSD 아님 | - | 연도 미확인 | Intel 고객 사례 | 🟡ᴾ |
| CN-19 | Tencent Cloud가 삼성 PM1733(Gen4) 공동 테스트 후 배포 | - | 날짜 미확인 | chinaflashmarket.com/a/172356 | 🟡 |
| CN-20 | Tencent 자체 SSD · 컨트롤러 · 공개 맞춤 펌웨어 협력 없음 | - | - | - | ❌ |
| CN-21 | [FW] FMS 2026 연사 소개(Bo Jiang, ByteDance): "in charge of in-house SSD development, including analysis of technical requirements for internal applications, firmware design/development, product delivery, and maintenance". NeoHint(hint 채널 + 재설계 펌웨어, SLC · TLC · QLC 혼합 배치, die 격리). 자체 컨트롤러 칩 증거 아님 | PoC 메타데이터 처리량 3~3.5배, 사용자 처리량 · tail 20~50% 개선 | 2026-08 | https://www.terrapinn.com/conference/future-memory-storage/speaker-bo-JIANG.stm | 🟡ᴾ |
| CN-22 | ByteDance 칩 사업(AI 칩 · CPU · VPU · DPU, 1,000명+), SSD 컨트롤러 언급 없음 | - | 2026-02-13 | ctee.com.tw/news/20260213700775-430804 | 🟡 |
| CN-23 | ByteDance 자체 SSD 컨트롤러 · 자체 브랜드 SSD 양산 보도 없음 | - | - | - | ❌ |
| CN-24 | [CTRL][SSD] Huawei Hi1812E 컨트롤러(OceanStor Dorado V6), 128TB SSD는 A800 전용. 장비 벤더 수직 통합이며 **Huawei Cloud의 자체 SSD 근거는 없음** | - | 2019-09 / 2024 | https://blocksandfiles.com/2019/09/22/huawei-oceanstor-dorado-v6-all-flash-array/ | 🟡 |
| CN-25 | [FW, 벤더 측] DapuStor 상장 자료: 고객에 ByteDance · Tencent · Alibaba · JD · Baidu · Meituan · Kuaishou, "主控芯片+固件算法+模组" 자체 개발 · 고객 요구별 펌웨어 최적화. 특정 사업자 전용 펌웨어인지는 미공개 | - | 2025~2026 | m.gelonghui.com/p/2574543 | 🟡 |

## 4. 확인 실패 · 반증 · 기존 위키와 다른 점

1. **AWS 자체 컨트롤러 ASIC: 미확인, 반대 정황(US-08).** 공식 표현은 "custom-designed by AWS", "design control of hardware and firmware", "rewrote the whole FTL"까지다. 기존 원장 [captive-ssd-fdp-context-2026-08.md](captive-ssd-fdp-context-2026-08.md) §3 · §5의 "자체 컨트롤러 자작 SSD"는 "자체 설계 SSD(펌웨어 · FTL 자체, NAND 멀티소싱, 컨트롤러 실리콘 출처 미공개)"로 읽어야 한다.
2. **AWS 시점**: "2017년부터"의 근거 없음(2017은 Nitro System). 가장 이른 Nitro SSD = io2 Block Express 프리뷰 2020-12, 공식 공개 2021-11-30.
3. **Nitro SSD 배치 대수 · S3 사용**: 근거 없음.
4. **"Disks for Data Centers"는 HDD 백서**(US-13).
5. **Google 자체 컨트롤러 · Titanium SSD 제조사**: 미공개. 다만 상용 플래시 칩에 자체 인터페이스 · 펌웨어 · 드라이버를 얹은 SSD 운용은 2016 논문에 있다(US-12).
6. **C4A Titanium SSD 날짜**: C4A GA 2024-10-30, Titanium SSD GA 2025-01. -35%의 기준은 Google의 이전 세대 Local SSD.
7. **CacheLib FDP(EuroSys'25)를 "Meta + 삼성 공동 연구"로 쓴 기존 위키 서술은 근거가 약하다**(US-26). 확인된 저자는 삼성, Meta는 CacheLib 업스트림 리뷰 · 머지. WAF 3.22 → 1.03 수치 자체는 CacheLib 공식 문서로 ✅(US-25).
8. **FDP "6개월 만에 비준" · "삼성 공동 주도"**: 1차 자료로 확인 못 함. 비준일 2022-11-30만 ✅(US-19).
9. **Microsoft 자체 SSD · 컨트롤러 없음.** 자체로 하는 것은 오프로드 하드웨어(FPGA → ASIC · DPU)와 스펙(Denali, OCP).
10. **OCP v2.7 날짜**: 기존 C3-30(2025-11)과 표지(2026-01-08) 차이, 개정판 차이일 수 있음.
11. **镇岳510 발표는 2023-10/11**(2022-11 아님). 컨트롤러 칩이며 완제품 SSD는 Alibaba 내부용과 제3자 브랜드로 나뉜다.
12. **CSAL "WAF 70 → 1.02"**: 기존 원장 MX-11(검색 요약)의 수치를 이 조사에서는 재확인하지 못했다.
13. **镇岳510 IO 지연 -92%**는 기사마다 비교 기준이 달라 "Alibaba 측 주장"으로만 쓴다.
14. Kuaishou · JD · Meituan 자체 SSD 근거 없음. DapuStor "客户A"의 신원 미공개.
15. 镇岳510 출하 50만 개+(2026-03-27)를 平头哥 AI 칩 출하량(47만 · 50만 개)과 혼동하지 말 것.
