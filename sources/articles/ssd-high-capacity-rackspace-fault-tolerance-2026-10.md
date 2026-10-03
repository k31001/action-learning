# 고용량 SSD · 랙 공간 가치 · 결함 허용(Fault Tolerance) — 팩트 원장

**수집일**: 2026-10-03
**수집자**: Research Agent — 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 기반 2차 자료 종합 + **공개 소스코드 직접 열람**(libnvme·nvme-cli·Linux 커널·QEMU·sg3_utils, `raw.githubusercontent.com`) + **1차 문서 직접 열람**(`www.microsoft.com` Research PDF 3건, `cloud.google.com` 블로그 2건)
**용도**: SSD 개발 조직의 3대 기술 축 중 **(3) 고용량 + 결함 허용(high capacity with fault tolerance)** 근거 — ① 랙 공간 가치가 오르는 조건(건설 지연·규제·전력, 컴퓨트의 전력·공간 잠식) ② 고용량 SSD 로드맵·경제성 ③ SSD 내부 결함 허용 ④ 고객 시스템 공동 설계(호스트 협업) ⑤ 재구축(rebuild) 산술
**등급**:
- ✅ 1차 원문(표준 구현 소스코드·논문 PDF·기업 공식 블로그)을 **이 세션에서 직접 열어** 문구를 확인함
- 🟡 검색 인덱스·2차 매체가 1차 자료를 인용한 것 (원문은 프록시 차단으로 미열람)
- ⚠️ 파생 산술(본 에이전트 계산), 벤더 마케팅 주장, 단일 2차 출처, 또는 일부 미확인

> **수집 환경 제약 (그대로 보고)**
> - 직접 접근 **가능**: `raw.githubusercontent.com`, `api.github.com`(레포 범위 한정), `www.microsoft.com`, `cloud.google.com`.
> - 직접 접근 **차단(403/연결 거부)** 확인: `opencompute.org`, `nvmexpress.org`, `snia.org`, `usenix.org`, `arxiv.org`, `dl.acm.org`, `research.google`, `engineering.fb.com`, `blocksandfiles.com`, `storagereview.com`, `servethehome.com`, `techradar.com`, `tomshardware.com`, `anandtech.com`, `solidigm.com`, `kioxia.com`/`americas.kioxia.com`, `semiconductor.samsung.com`, `news.samsung.com`, `download.semiconductor.samsung.com`, `sandisk.com`, `investors.micron.com`, `s25.q4cdn.com`, `businesswire.com`, `datacenterdynamics.com`, `cbre.com`, `iea.org`, `trendforce.com`, `vdura.com`, `newsletter.semianalysis.com`, `datacenterwatch.org`, `uptimeinstitute.com`, `pdl.cmu.edu`, `cs.princeton.edu`, `par.nsf.gov`, `psc.ga.gov`, `developer.nvidia.com`(WebFetch 포함 차단).
> - 따라서 NVMe·OCP 필드 이름은 **표준 문서가 아니라 그 표준을 구현한 오픈소스 코드**로 검증했다(✅의 의미는 "코드에 그 이름·값이 정의돼 있음"이며, 표준 문서의 절번호·요구 ID는 미확인).

> **선행 원장과의 중복 회피** — 아래는 이미 레포에 있으므로 반복하지 않는다(필요 시 해당 원장 참조).
> OCP MTBF 2M h·AFR 0.44%, 용량별 다이 수 표(512→1,024→2,133), 패리티 이항 모델, Micron RAIN 1:15, Google FAST'16·Alibaba 필드 데이터 → [`qlc-v6-reliability-ppm-die-protection-2026-09.md`](qlc-v6-reliability-ppm-die-protection-2026-09.md) · OCP XOR 복구 카운트·Hyrax·PM1733 FIP 요약 → [`component-to-system-solution-ladder-facts-2026-09.md`](component-to-system-solution-ladder-facts-2026-09.md) §9 · VDURA 30TB 가격 인덱스 → [`qlc-essd-market-size-forecast-data-2026-09.md`](qlc-essd-market-size-forecast-data-2026-09.md) §3.3 · 미국 계통 대기열 2,600GW·PJM 8년·SemiAnalysis "2026 계획의 30~50% 이연" → [`july-2026-market-update-2026-07-04.md`](july-2026-market-update-2026-07-04.md)·`wiki/concepts/energy-constraints.md` · GB200 NVL72 120/132kW → [`../raw-notes/ai-datacenter-buildout-2026-06.md`](../raw-notes/ai-datacenter-buildout-2026-06.md)

---

## §1. 랙 공간 가치 동인 (A)

### 1-1. 데이터센터 건설 지연·규제 (2025~2026)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| A1 | Sightline Climate(Data Center Outlook, 2026-02-24 갱신): 2024년 이후 발표된 50MW 초과 대형 데이터센터 777곳·190GW 추적. 2026년 가동 예정 **≥16GW(약 140개 프로젝트) 중 착공 확인 약 5GW**, 약 11GW는 발표 단계에 머묾. **2026 예정분의 30~50%가 연내 가동 어려움**. 2025년에는 예정 용량의 **26%가 지연**, 추가 10%가 예고 없이 상업운전일(COD)을 연기 | 2026-02-24 | https://www.utilitydive.com/press-release/20260305-sightline-climate-launches-powerstack-newsletter-with-analysis-finding-30-5-1 · (논쟁 맥락) https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter | 🟡 (검색 요약 경유, 원 리포트 미열람) |
| A2 | 반론 — SemiAnalysis: "2026년 미국 DC의 절반이 지연·취소" 주장은 Bloomberg 2026-04-01 기사("America's AI Build-Out Hinges on Chinese Electrical Parts")에서 퍼졌으며, 근거 데이터는 발표 단계 프로젝트를 액면 그대로 집계한 것. SemiAnalysis의 연말 북미 하이퍼스케일러 자가 건설 전망은 지난 6개월간 **약 1%**, 북미 코로케이션은 **5% 미만**만 변동 | 2026-04~05 | https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter | 🟡 |
| A3 | SemiAnalysis "Everyone Says Datacenter Moratoriums Are Killing the US Buildout. We Disagree": 모라토리엄 **300건 이상** 지도화 — 제한 구역 안에 있는 용량 **20GW**, 실제 지연된 것은 **1,525MW**, 뉴욕 포함 전국 **2.3GW** | 2026-09-15 | https://newsletter.semianalysis.com/p/everyone-says-datacenter-moratoriums · https://aiweekly.co/alerts/semianalysis-just-23-gw-of-us-datacenters-delayed-by-moratoriums | 🟡 |
| A4 | Data Center Watch(10a Labs): 2026년 2분기(4~6월) 지역 반대로 **45개 프로젝트·$68B**가 차단 또는 지연(해당 기간 대형 개발의 과반). 1분기는 **75건·$130B**가 반대에 직면. 반대 단체 843개(49개 주), 30개 주 의회가 입지·전력 규칙 도입 또는 발의 | 2026 Q1·Q2 | https://www.datacenterwatch.org/report · https://datacenterwatch.org/q1-2026 · https://aiweekly.co/alerts/data-center-watch-45-us-ai-data-center-projects-worth-68b-blocked-or-delayed-in | 🟡 |
| A5 | **뉴욕주**: 호컬 주지사가 **50MW 이상**(소비 가능 포함) 데이터센터에 대한 **주 환경 인허가를 1년간 중단**하는 행정명령 서명 — 주 단위 첫 모라토리엄. 의회가 6월 초 통과시킨 더 강한 법안(상원 44-16, 하원 102-39)은 서명되지 않음 | 2026-07-14 | https://axios.com/2026/07/14/ny-gov-kathy-hochul-data-center-moratorium-executive-order · https://www.jonesday.com/es/insights/2026/07/new-york-enacts-first-statewide-data-center-moratorium | 🟡 |
| A6 | **메인주**: 의회가 20MW 이상 대형 데이터센터 승인을 2027-11-01까지 금지하는 주 모라토리엄 법안 통과 → 주지사가 **2026-04-24 거부권** 행사. Good Jobs First 집계로 최소 11개 주가 유사 법안 발의 | 2026-04 | https://www.jurist.org/news/2026/04/maine-passes-first-moratorium-on-large-data-centers-in-us/ · https://broadbandbreakfast.com/nations-first-state-data-center-moratorium-vetoed-by-maine-governor/ | 🟡 |
| A7 | **버지니아 라우던 카운티**: 감독위원회가 7-2로 데이터센터의 **by-right(자동 허용) 개발을 폐지**, 특별예외(special exception) 대상으로 전환 — 기획위원회·감독위원회 공청회 필요. 2025-02-12 이전 접수 건 중 주거지 500ft 초과 건만 유예. 배경: Dominion Energy가 2023년 전력 제약 해소용 신규 가공 송전선 4개 필요 발표 | 2025-03-18 | https://www.hklaw.com/en/insights/publications/2025/04/loudoun-county-virginia-eliminates-by-right-data-center-development · https://www.mcguirewoods.com/client-resources/alerts/2025/4/loudoun-county-eliminates-by-right-use-for-data-centers-increasing-development-hurdles/ | 🟡 |
| A8 | **조지아**: 주 공공서비스위원회(PSC)가 만장일치로 **100MW 초과** 신규 대형부하에 별도 요금 조건 적용 규칙 승인 — 상류 발전·송배전 비용 부담, 계약 기간 5년→**최장 15년**, 최소 청구 요건, PSC 계약 심사 | 2025-01-23 | https://psc.ga.gov/site/assets/files/8617/media_advisory_data_centers_rule_1-23-2025.pdf · https://www.atlantanewsfirst.com/2025/01/23/new-georgia-power-rates-approved-data-centers-address-staggering-energy-use | 🟡 |
| A9 | **애리조나 투손**: 시의회가 Amazon 연계 'Project Blue'(290에이커, 2028년까지 286MW 목표) 부지 편입 요청을 거부 — 물·전력·요금 우려 | 2025-08 | https://www.azfamily.com/2025/08/09/tucson-rejects-amazon-linked-data-center-amid-water-energy-concerns/ · https://www.datacenterdynamics.com/en/news/amazon-linked-data-center-project-in-tuscon-arizona-requests-power-despite-water-denial-from-local-officials/ | 🟡 |
| A10 | **아일랜드**: 규제기관 CRU가 2025-12 최종 결정으로 약 3년간의 사실상 신규 DC 계통 연결 모라토리엄을 종료하되, **10MVA 초과** 신청자에 현장 디스패치 가능 발전·저장 설비 확보를 요구. 데이터센터는 국가 계량 전력의 **21%** 소비 | 2025-12 | https://www.williamfry.com/knowledge/cru-publishes-long-awaited-final-policy-on-data-centre-connections/ · https://itbrief.co.uk/story/ireland-unveils-strict-new-rules-for-data-centre-power-use | 🟡 |
| A11 | **네덜란드**: 2024년부터 개정 법령으로 하이퍼스케일(≥10ha/70MW 이상) 신규 건설을 Het Hogeland(Eemshaven)·Hollands Kroon(Agriport) 외 전국 금지. 암스테르담 초안 계획은 2030년까지 시 연결 용량 상한 **350MVA**. 노르트홀란트 계통 혼잡으로 암스테르담 가동 1,340MW·공실률 **2.7%**, TenneT 송전 대기열 미충족 수요 약 **4.6GW**, 신규 380kV 완공(약 2029) 전 여유 0 | 2024~2026-09-08 | https://www.datacentres.com/news/amsterdam-data-centre-market-1-340-mw-live-as-tennet-s-grid-congestion-locks-out-slot2-2026-09-08 · https://datacenterdynamics.com/en/analysis/the-ongoing-impact-of-amsterdams-data-center-moratorium | 🟡 |

### 1-2. AI 랙 전력 밀도 vs 일반 랙

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| A12 | NVIDIA: **2027년부터 1MW급 IT 랙**을 지원하기 위해 800VDC 데이터센터 전력 체계로 전환 주도. 기존 54V 랙 내 배전은 kW급 랙용 설계라 MW급 랙을 감당하지 못함. GTC 2025에서 Kyber 랙의 Rubin Ultra GPU 576개를 구동하는 800V 사이드카 전시 | 2025-05 | https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-generation-of-ai-factories | 🟡 (원문 차단, 검색 요약) |
| A13 | Kyber NVL576(Rubin Ultra, 2027) 랙 **약 600kW** | 2025-03 발표 | https://introl.com/blog/nvidia-vera-rubin-gpu-600kw-racks-2027 · 레포 [`ai-datacenter-buildout-2026-06.md`](../raw-notes/ai-datacenter-buildout-2026-06.md) (">600kW") | ⚠️ (2차 블로그, NVIDIA 1차 수치 미열람) |
| A14 | VR200 NVL72는 Max-Q 약 1.8kW/GPU·**190kW/랙**, Max-P 약 2.3kW/GPU·**230kW/랙**, GB300 NVL72는 1.4kW/GPU·140kW/랙 | 2026-01 | https://www.ctee.com.tw/news/20260107701081-430704 | ⚠️ (대만 언론 단일 출처) |
| A15 | 범용 CPU 랙은 최대 약 **12kW**, H100 공랭 랙은 약 **40kW**를 지원, 40kW를 크게 넘는 GB200은 액체냉각 필수 | 2024 | https://newsletter.semianalysis.com/p/gb200-hardware-architecture-and-component | 🟡 |
| A16 | Uptime Institute 2025 글로벌 DC 서베이: 평균 랙 밀도 약 **9kW**, 10~30kW 랙 채택 증가, 30kW 초과는 소수. 운영자 5분의 1이 최고 밀도 ≥30kW라고 응답(2023년 대비 +7%p) | 2025-07-30 | https://intelligence.uptimeinstitute.com/resource/uptime-institute-global-data-center-survey-2025 · https://www.businesswire.com/news/home/20250730149641/en | 🟡 |

### 1-3. 스토리지의 전력·공간 비중, "컴퓨트가 스토리지를 밀어낸다"는 진술

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| A17 | **Azure 실측(HotCarbon'24, CMU·Microsoft)**: 스토리지 관련 배출(스토리지 랙 + 로컬 저장장치)이 Azure 범용 클라우드 **운영 배출의 33%, 내재 배출의 61%**. 스토리지 랙만으로 운영 24%·내재 45%. SSD 스토리지 랙은 HDD 랙 대비 **TB당 운영 배출 약 4배**. 랙 내 운영 배출에서 저장장치 비중은 SSD 랙 39%(SSD 38%+HDD 1%), HDD 랙 48%(HDD 41%+SSD 7%) | 2024-07 | https://www.microsoft.com/en-us/research/publication/a-call-for-research-on-storage-emissions/ · PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/2024-Storage-HotCarbon.pdf | ✅ |
| A18 | 동 논문 표1(Project Olympus): **SSD 플래시 확장 블레이드 1U·16드라이브, 블레이드 용량 128TB(2017) → 246TB(2024 용량 적용)**, **HDD JBOD 블레이드 4U·88드라이브, 1.2PB → 2.6PB** (표의 랙당 블레이드 수 열은 PDF 텍스트 추출이 불명확해 인용하지 않음). HDD 서버가 **랙 공간당 약 2.6배** 더 많은 데이터를 저장. "스토리지 전력은 기본적으로 평탄" — 7일간 HDD·SSD 클러스터 전력 표준편차 3%, 전력은 스토리지 서버 피크(전 디스크 가동) 기준으로 프로비저닝 | 2024-07 | 동상 | ✅ |
| A19 | ⚠️ 파생: A18의 1U·16슬롯 SSD 블레이드에 245.76TB 드라이브를 넣으면 **약 3.93PB/U**, HDD JBOD(2.6PB/4U)는 **0.65PB/U** — 2024년 용량 기준의 HDD 밀도 우위(2.6배)는 245TB급에서 역전 | — | A18 + §2 B1 산술 | ⚠️ 파생 |
| A20 | IEA *Energy and AI*: 현대 데이터센터 전력에서 서버 약 60%, **스토리지 약 5%**, 네트워크 최대 5%, 냉각 7%(효율적 하이퍼스케일)~30% 초과(비효율 엔터프라이즈) | 2025-04 | https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai | 🟡 |
| A21 | Epoch AI: 프런티어 AI 데이터센터 피크 운영 시 **GPU는 전체 전력의 약 40%**만 사용, 나머지는 비효율·냉각·칩 간 인터커넥트 | 2025~2026 | https://epoch.ai/data-insights/gpus-power-usage-in-ai-data-centers | 🟡 |
| A22 | Meta ISCA'22(DSI 파이프라인): 3개 프로덕션 추천 모델(DLRM)에서 **데이터 저장·수집(DSI)이 학습 자체보다 더 많은 전력을 소비할 수 있음**; 한 사례에서 GPU 사이클의 56%가 데이터 대기로 정지 | 2022 | https://arxiv.org/pdf/2108.09373 · https://engineering.fb.com/2022/09/19/ml-applications/data-ingestion-machine-learning-training-meta/ | 🟡 |
| A23 | Meta 엔지니어링(TechRadar 보도): 스토리지 병목이 GPU 정지의 주원인 중 하나 — SSD 캐싱으로 AI 데이터셋 로딩을 수 시간 → 수 분으로 단축, "느린 데이터로 인한 GPU 유휴가 싼 스토리지의 절감분을 상쇄할 수 있다" | 2026 | https://techradar.com/pro/a-disk-in-a-planet-scale-computer-meta-has-so-many-expensive-gpus-that-its-buying-ssds-to-kill-idle-time | 🟡 |
| A24 | 벤더 주장(Solidigm 후원 Signal65 연구): 100MW AI DC 모델에서 QLC SSD는 TLC 대비 전력 효율 19.5%, TLC+HDD 하이브리드 대비 79.5% 우위 → 동일 전력 안에 AI 인프라를 TLC 대비 **1.6%**, HDD 대비 **26.3%** 더 배치 가능(DGX H100 10.2kW 기준) | 2024-12 | https://signal65.com/research/ai/building-power-efficient-ai-data-centers-with-solidigm-qlc-ssds/ | ⚠️ (벤더 의뢰 연구) |
| A25 | 벤더 주장(Solidigm 후원 기사): "1U에 122TB 24개로 약 4PB, 전력 80~90% 절감 — 회수한 전력을 GPU로 돌릴 수 있다", "스토리지가 낭비하는 와트는 GPU에서 빼앗은 와트" | 2025~2026 | https://venturebeat.com/ai/breaking-the-bottleneck-why-ai-demands-an-ssd-first-future · https://www.cdotrends.com/story/4836/your-hard-drives-are-stealing-your-ais-lunch-money | ⚠️ (후원 콘텐츠; 산술상 24×122.88TB=2.95PB로 "약 4PB"와 불일치, 32슬롯 E1.L이면 3.93PB) |

### 1-4. 코로케이션 가격 추세

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| A26 | CBRE 북미 DC 동향 H1 2026: 1차 시장 공실률 **1.4%**(사상 최저, H1 2025 1.6%), 1차 시장 공급 전년比 +33.7%로 사상 최대 10,903MW, 순흡수 1,456.2MW(+11.7%). 호가 상승률: 3~10MW **+8.3%**, 500kW~3MW +7.9%, 10MW+ +6.7%, 250~500kW +4.3%. 10MW+ 구간 뉴욕 트라이스테이트 +19%, 애틀랜타 +14.5%, 시카고 +9.7%. 250~500kW 호가: 시카고 $200~230/kW·월, 북버지니아 $190~235, 실리콘밸리 $200~275 | 2026 H1 | https://www.cbre.com/insights/books/north-america-data-center-trends-h1-2026 · https://www.ciodive.com/news/data-center-all-time-low-vacancy-record-construction/829611/ | 🟡 |

---

## §2. 고용량 SSD 로드맵·경제성 (B)

### 2-1. 제품·로드맵

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| B1 | **Micron 6600 ION 245TB 출하 시작** — G9 QLC, U.2·E3.L, 최대 30W. 벤더 주장: 동일 원시 용량의 HDD 구성 대비 **랙 82% 감소**, 전력 약 절반. FMS 2026 Grand Prize | 2026-05-05 / 2026-08 | https://www.datacenterdynamics.com/en/news/micron-begins-shipping-its-245tb-micron-6600-ion-ssd/ · https://www.hpcwire.com/off-the-wire/micron-ships-245tb-6600-ion-ssd-for-rack-scale-ai-storage/ · https://tweaktown.com/news/113032/kioxia-micron-and-samsung-earn-best-of-show-awards-at-fms-2026/index.html | 🟡 (수치는 벤더 주장 ⚠️) |
| B2 | **Kioxia LC9**: 122TB·245TB 모델을 CY2025 말 고객 인증용으로 출하, CY2026 양산 개시 의향. Dell PowerEdge R7725xd 2U에 LC9 E3.L 245.76TB 40개 = **9.8PB** | 2025-07 / 2026-02-13 | https://www.blocksandfiles.com/flash/2026/02/13/high-nand-selling-prices-help-kioxias-quarterly-revenue/4091286 · https://techspot.com/news/108765-kioxia-announces-world-first-245-tb-ssd-generative.html | 🟡 |
| B3 | **Sandisk UltraQLC SN670** 128/256TB — BiCS8 218층 2Tb CBA 다이, PCIe Gen5, 1H26 출하 목표. 직접 QLC 기록(pSLC 버퍼 미사용), Dynamic Frequency Scaling(동일 전력 성능 최대 +10%), DR 프로파일로 DR 재활용 최대 33% 감소. 로드맵: 128 → 256TB(2026) → **512TB(2027)** → **1PB(연도 미제시)** | 2025-02 투자자의 날 / 2025-08-05 FMS | https://www.blocksandfiles.com/ai-ml/2025/08/05/sandisk-unveils-256-tb-ssd-for-ai-workloads-shipping-in-2026/1589534 · https://www.storagenewsletter.com/2025/08/06/fms-2025-sandisk-unveils-ultraqlc-technology-platform-with-up-to-256tb-enterprise-ssd-capacity/ · https://www.notebookcheck.net/SanDisk-promises-1-Petabyte-SSD-but-release-timeline-remains-unclear.962531.0.html | 🟡 |
| B4 | **Samsung**: GMIF 2025에서 **512TB PCIe Gen6 SSD를 2027년**(EDSFF 1T) 출시 계획 발표. 256TB 모델은 매체에 따라 "PCIe Gen5로 이미 출시 중"(TechRadar) vs "2026년 PCIe 6.0"(Guru3D)으로 **기술이 엇갈림** | 2025-09 | https://www.techradar.com/pro/samsung-will-launch-a-512tb-pcie-gen6-ssd-but-you-will-have-to-wait-till-2027-as-it-looks-set-to-compete-against-sandisk-solidigm-sk-hynix-and-kioxia-and-no-consumers-wont-even-get-a-whiff-of-it · https://www.guru3d.com/story/samsung-plans-256tb-pcie-60-ssd-for-2026-512tb-model-in-2027/ | 🟡 (256TB 인터페이스는 ⚠️ 상충) |
| B5 | **SK hynix PS1101** 245TB E3.L PCIe Gen5 QLC — Dell Technologies Forum 2025(서울) 공개 | 2025-09-17 | https://news.skhynix.com/dell-technologies-forum-2025/ · https://www.techradar.com/pro/samsung-archrival-showcases-245tb-pcie-gen5-ssd-joining-kioxia-huawei-and-sandisk-with-solidigm-samsung-and-micron-expected-to-launch-similar-products-in-2026 | 🟡 |
| B6 | **Solidigm**: 245TB+ SSD를 **2026년 말 이전** 출시 확인(현 최대 D5-P5336 122.88TB) | 2025-10 | https://www.techradar.com/pro/solidigm-confirms-245-tb-ssds-set-to-launch-before-end-of-2026 · https://blocksandfiles.com/2025/10/09/solidigm-speaks-about-its-ssd-roadmap/ | 🟡 |
| B7 | **DapuStor R6060 512TB** PCIe 5.0 QLC(E3.L·E2) FMS 2026 공개 — "2개 드라이브로 1PB", 직전 245TB 설계의 2배 | 2026-08 | https://www.storagenewsletter.com/2026/08/10/fms-2026-dapustor-unveils-industry-first-512tb-and-liquid-cooled-ssds-optimized-for-ai · https://storagereview.com/news/dapustor-shows-a-512tb-qlc-ssd-at-fms-2026-1pb-of-flash-in-two-drives | 🟡 |
| B8 | Phison Pascari D205V 122.88TB(PCIe Gen5, U.2·E3.L) 사전주문, 2025 Q2 초 출하 예정 | 2024-11-13 | https://www.phison.com/sc24-phison-disrupts-data-deluge-with-worlds-first-pcie-gen5-128tb-class-pascari-data-center-ssd/ | 🟡 |
| B9 | Kioxia·Sandisk BiCS10: **332층 2Tb QLC, 면적 밀도 >37Gb/mm²**(발표 기준 최고 밀도 QLC) | 2026 투자자의 날 | https://guru3d.com/story/kioxia-details-332layer-bics10-nand-for-future-pcie-gen6-ssds/ · https://cloudnews.tech/kioxia-and-sandisk-take-qlc-memory-to-the-next-level-with-bics10-more-capacity-for-the-ai-era/ | 🟡 |
| B10 | **Meta**(엔지니어링 블로그 "A case for QLC SSDs in the data center"): QLC SSD를 **최대 512TB**까지 계획, U.2-15mm와 Pure Storage DirectFlash Module(DFM)에 집중. QLC는 "10 MB/s/TB 대역" 워크로드용 HDD·TLC 사이 계층 | 2025-03-04 | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ · https://www.theregister.com/2025/03/07/meta_proposes_qlc_ssds_as/ | 🟡 |
| B11 | **Pure Storage DFM**: 드라이브 DRAM 없이 FTL을 어레이 컨트롤러 소프트웨어가 시스템 단위로 수행. 75TB → **150TB(2025, Micron G8 QLC)** → **300TB(2026 계획)** | 2025 | https://www.techradar.com/pro/150tb-ssd-modules-to-go-mainstream-in-2025-and-micron-is-getting-a-slice-of-that-pie · https://www.purestorage.com/uk/knowledge/what-is-directflash-and-how-does-it-work.html · https://blocksandfiles.com/2025/04/07/metas-positive-assessment-of-pure-storages-flash-mettle/ | 🟡 |
| B12 | Solidigm AI Central Lab: D5-P5336 122TB **192개 = 23.6PB를 16U**에 탑재한 테스트 클러스터 | 2025-10-01 | https://news.solidigm.com/en-WW/254753-solidigm-unveils-ai-central-lab-home-to-highest-performing-and-most-dense-storage-test-cluste · https://www.storagenewsletter.com/2025/10/08/solidigm-unveils-ai-central-lab-home-to-performing-and-dense-storage-test-clusters/ | 🟡 (산술: 192×122.88TB=23.59PB ✓, ≈1.47PB/U ⚠️) |

### 2-2. 가격·채택 장애

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| B13 | Solidigm D5-P5336 **122.88TB 소매가**: 2024-11 발표, 2025-05 판매 개시 시 **$12,399**(≈$101/TB) → 약 9개월 후 Tech-America **$37,128**(≈**$302/TB**); 100개 이상 구매 할인은 개당 $853 | 2025-05 → 2026 초(정확 일자 미확인) | https://www.techradar.com/pro/worlds-largest-ssd-has-tripled-in-price-in-just-nine-months-and-now-costs-more-than-a-new-car | 🟡 |
| B14 | ⚠️ 대조: 같은 시기 VDURA 지수의 30TB QLC는 $504/TB(1Q26)~$603/TB(3Q26, 레포 기존 원장). 소매 리스팅 기준으로는 **122TB의 TB당 가격이 30TB 지수보다 낮다** — 122/245TB급 전용 $/TB 지수는 없어 "초고용량 프리미엄"을 공개 데이터로 확정할 수 없음 | — | B13 + [`qlc-essd-market-size-forecast-data-2026-09.md`](qlc-essd-market-size-forecast-data-2026-09.md) §3.3 | ⚠️ (가격 기준 상이: 소매 vs 인덱스) |
| B15 | TrendForce: CSP가 콜드 데이터에 QLC SSD를 쓰는 데 대한 **대규모 채택 장애는 비용과 공급망** — 데이터 관리 알고리즘·소프트웨어 스택 호환·정밀 TCO 산정이 필요하고 "확고한 가격 임계치 유지"가 비용 균형의 관건 | 2025-09-15 | https://www.trendforce.com/presscenter/news/20250915-12714.html | 🟡 |
| B16 | TrendForce: Samsung·SK hynix·Kioxia SSD 라인 풀가동, 일부 모델 **납기 1년 이상 지연**, 8TB 이상 고용량 제품이 특히 빠듯하고 이듬해 하반기까지 대부분 예약 | 2025-10-29 | https://www.trendforce.com/news/2025/10/29/news-high-capacity-ssds-reportedly-hit-year-long-delays-as-samsung-sk-and-kioxia-run-full-tilt/ | 🟡 |
| B17 | SSD/HDD 비트당 가격비(1차 논문): Microsoft SYSTOR'16 "SSD는 등급에 따라 GB당 HDD의 **4~40배**" / HotCarbon'24 "SSD는 비트당 HDD의 **약 2~4배**(내재 배출은 비트당 3~10배)" | 2016 / 2024 | https://www.microsoft.com/en-us/research/wp-content/uploads/2016/08/a7-narayanan.pdf · https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/2024-Storage-HotCarbon.pdf | ✅ |

### 2-3. TCO 주장 (벤더)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| B18 | Solidigm 122TB D5-P5336: 30TB TLC 대비 **TB/W 3.4배**, 레거시 HDD+TLC 대비 NAS 설치면적 **4:1** 축소·스토리지 전력 최대 84% 감소, 랙 유닛당 최대 4PB. 5년 TCO는 20TB HDD 106랙 대비 47% 낮다는 자체 시험 | 2024-11 | https://www.storagenewsletter.com/2024/11/21/solidigm-introduces-highest-capacity-pcie-ssd-122tb-d5-p5336/ · https://hpcwire.com/bigdatawire/2025/01/22/solidigm-celebrates-worlds-largest-ssd-with-122-day/ | ⚠️ (벤더 자체 시험) |
| B19 | Micron 6600 ION 245TB: HDD 대비 랙 82% 감소, 최대 30W(동급 HDD 구성 전력의 약 절반), 자체 시험 AI 워크로드 에너지 효율 최대 84배 | 2026-05-05 | B1과 동일 | ⚠️ (벤더 자체 시험) |

---

## §3. SSD 내부 결함 허용 (C)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| C1 | **OCP SMART/Health Information Extended 로그(LID 0xC0) — nvme-cli OCP 플러그인 구조체**에 다이 단위 결함 허용 필드가 정의돼 있음: **`total_media_dies`(바이트 217:216), `total_die_failure_tolerance`(219:218), `media_dies_offline`(221:220)**. 출력 코드는 **로그 페이지 버전 ≥5**에서 이 3필드를 표시, 버전 6에서 `die_in_use_bad_nand_block` 추가. 같은 로그에 `xor_recovery_count`(55:48), `uncorrectable_read_err_count`, `bad_user_nand_blocks`, `percent_free_blocks`, `endurance_estimate`. 파일 저작권 표기 "Copyright (c) 2022 Meta Platforms" | 코드 master, 2026-10-03 열람 | https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/plugins/ocp/ocp-smart-extended-log.h · https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/plugins/ocp/ocp-print-stdout.c | ✅ (코드. OCP 스펙 원문·요구 ID와 "버전 5 = 스펙 몇 판"의 대응은 ⚠️ 미확인) |
| C2 | QEMU NVMe 에뮬레이터의 OCP 확장 SMART 로그 구조체(`NvmeSmartLogExtended`)는 바이트 208 이후를 예약(rsvd208[286])으로 두어 **다이 수·다이 고장 허용 필드가 없음**(구버전 로그 형식) | master, 2026-10-03 | https://raw.githubusercontent.com/qemu/qemu/master/include/block/nvme.h | ✅ |
| C3 | NVMe 표준 Endurance Group 치명 경고 플래그: `SPARE`(가용 예비 임계 이하), `DEGRADED`(미디어 오류로 신뢰성 저하), `READ_ONLY`. SMART 치명 경고에도 "NVM 서브시스템 신뢰성이 중대한 미디어 관련 오류로 저하됨"(DEGRADED) 정의 | master | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h | ✅ |
| C4 | **Samsung PM1733 Fail-in-Place(FIP)**: 최대 NAND 다이 1개 전체 고장까지 처리 — 30.72TB 모델은 **512개 다이 중 임의 1개를 잃어도** 정상에 가깝게 동작; 손상 데이터를 스캔·재구성해 정상 칩으로 재배치하고 처리량·QoS 유지("RAID-5/6 어레이가 degraded 모드로 계속 도는 것과 유사") | 2019-09 | https://www.anandtech.com/show/14884 · https://www.networkworld.com/article/3440026/samsung-introduces-ssds-it-claims-will-never-die.html · 브로슈어 https://download.semiconductor.samsung.com/resources/brochure/PM1733%20NVMe%20SSD.pdf | 🟡 (브로슈어 원문 차단) |
| C5 | **Kioxia** NVMe SSD 데이터 손실 완화 기술 브리프: **Flash Die Failure Protection** — NAND 다이 1개 고장 시에도 완전한 신뢰성으로 계속 동작; SSD 내부 패리티·해시 엔진으로 RAID 스트라이프 수준 오류를 조기 탐지 | 연도 미확인 | https://kioxia.com/content/dam/kioxia/en-us/business/ssd/asset/KIOXIA_NVMe_SSDs_Data_Loss_Mitigation_Tech_Brief.pdf | 🟡 |
| C6 | Kioxia LC9(245.76TB) 신뢰성 기능으로 "다이 수준 복구(die-level recovery)·패리티 기반 오류 관리·전원 손실 보호" 언급 | 2025-07 | https://www.notebookcheck.net/Kioxia-unveils-industry-s-first-245-76-TB-NVMe-SSD-optimized-for-AI-workloads.1064593.0.html | ⚠️ (2차 매체 단독, Kioxia 1차 문구 미확인) |
| C7 | Micron "shift-left" 블로그(Steven Wells): 기존 복원력 노력 = 배드 블록 은퇴, 내부 XOR(RAIN), 버스 CRC 재전송; 비전은 **"수직 통합 복원력 — 호스트와 디바이스가 함께 복원력을 나눠 맡는 것"**, 고장 드라이브 교체보다 플릿 건강 감시·데이터 손실 없는 복구 능력 강화 | 2023-12 | https://www.micron.com/about/blog/storage/ssd/working-to-revolutionize-ssd-resiliency-with-shift-left-approach | 🟡 |
| C8 | **SNIA SDC 2026 — Leil(CTO David Gerstein) "Graceful Degradation for the QLC Era: Moving SSD Lifecycle Management to the Host"**: QLC 밀도 상승으로 다이·블록 고장이 데이터센터 규모의 지배적 운영 이슈. 기존 펌웨어는 고장을 블랙박스로 처리해 예비 블록 소진 시 드라이브를 은퇴시키며 **매체의 99%가 멀쩡한데도** 폐기. 다이당 **10~20 DPPM**이 512다이 이상 SSD에서 **약 10,000 DPPM**으로 누적 → **대형 플릿의 약 1%가 운용 중 다이 고장**을 겪음. 200TB+ 드라이브에서 다이 1개는 약 0.05% | 2026-09 | https://www.snia.org/sniadeveloper/session/19741 · https://www.snia.org/sites/default/files/snia-presentations/67c8bec0-52fc-4727-b1cb-9cbcac6ae1f5/SNIA-SDC26-Gerstein-Graceful-Degradation-for-the-QLC-Era.pdf | 🟡 (PDF 차단, 검색 인덱스 인용) |
| C9 | ⚠️ 산술 대조: 10~20 DPPM × 512다이 = 5,120~10,240 ppm ✓(C8과 정합). 다이 1개 비중은 1,024다이(LC9 245.76TB)에서 0.098%, 2,048다이에서 0.049% — C8의 "약 0.05%"는 약 2,000다이 구성에 해당. **기존 원장 §5-4의 Google FAST'16 역산 밴드(다이당 40~550 ppm/yr)와 한 자릿수 이상 차이** — 기간 정의(연간 vs 수명) 미확인 | — | C8 + [`qlc-v6-reliability-ppm-die-protection-2026-09.md`](qlc-v6-reliability-ppm-die-protection-2026-09.md) §5-4 | ⚠️ 파생 |
| C10 | OCP Storage 프로젝트(Meta Ross Stenfort·Microsoft Lee Prewitt 공동 리드) SDC25 업데이트: Datacenter NVMe SSD **v2.7**(Dell·Google·HPE·Meta·Microsoft 지원)의 개선 항목에 **"QLC High Capacity SSD improvements"**, 텔레메트리·E2 강화, 디바이스 측정 전력 포함 | 2025-09 | https://www.snia.org/sites/default/files/2025-09/SNIA-SDC25-Stenfort-OCP-Storage-Project-Update.pdf | 🟡 (세부 요구 항목 미확인) |
| C11 | Microsoft SYSTOR'16(50만 대 이상 SSD, 약 3년): 일부 모델의 현장 AFR이 사양 대비 **최대 70% 높음**; **SSD 관련 장애 티켓의 79%가 교체**로 이어짐(HDD 11%); "고장 후 수리·교체에 수일이 걸릴 수 있고 그동안 서버가 사용 불가 → 가용성 SLA를 위해 과잉 프로비저닝" | 2016-06 | https://www.microsoft.com/en-us/research/publication/ssd-failures-in-datacenters-what-when-and-why/ · PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2016/08/a7-narayanan.pdf | ✅ |

---

## §4. 호스트·시스템 공동 설계 (D)

### 4-1. NVMe 표준 메커니즘 — 오픈소스 구현으로 이름·값 검증

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| D1 | **Get LBA Status** — 관리 명령 opcode **0x86**. libnvme 문서 주석: "Get LBA Status 명령은 **잠재적 복구 불가 LBA(Potentially Unrecoverable LBAs)**에 대한 정보를 요청한다". Action Type: **0x10** = 스캔 수행 후 미추적+추적 PU LBA 반환, **0x11** = 물리 저장소와 연관된 추적 PU LBA 반환, 0x02 = 할당 LBA. 응답 = LBA 상태 디스크립터(시작 LBA·블록 수) 목록 + 완료 조건(미완료 시 추가 디스크립터 존재/스캔 미완). 지원 여부는 Identify Controller **OACS** 비트(`NVME_CTRL_OACS_LBA_STATUS`) | master, 2026-10-03 | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h · https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/ioctl.h · https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/api-types.h | ✅ |
| D2 | **LBA Status Information 로그(LID 0x0E)**: 필드 = 로그 길이, 네임스페이스 원소 수, **Estimate of Unrecoverable Logical Blocks(ESTULB)**, 생성 카운터; 네임스페이스별 원소 = LBA 범위 디스크립터 목록 + **권장 조치 유형(Recommended Action Type)**. **비동기 이벤트 Notice 0x05 "LBA Status Information Alert"**, Identify의 OAES 비트(`NVME_CTRL_OAES_LBAS`), **Feature 0x15 "LBA Status Information Report Interval"** | master | 동상 (types.h) | ✅ |
| D3 | nvme-cli 사용자 명령: `nvme get-lba-status`(옵션: 시작 LBA, 최대 dword, action type, range length), `nvme log lba-status`(구 `lba-status-log`는 3.0에서 deprecated alias) | master | https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/Documentation/nvme-get-lba-status.txt · https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/Documentation/nvme-lba-status-log.txt | ✅ |
| D4 | NVMe 1.4(2019-06-14 공표)의 **"Rebuild Assist"**: Get LBA Status로 잠재적 복구 불가 LBA를 호스트에 알려, 호스트가 **어떤 LBA를 다른 위치에서 복구·재기록할지** 결정하게 함. 백그라운드 스캔에서 감지한 ECC 오류, **심한 경우 NAND 다이 또는 채널 전체 고장으로 영향받는 LBA**까지 보고 가능 | 2019-06 | https://www.anandtech.com/show/14543 · https://nvmexpress.org/changes-in-nvme-revision-1-4/ | 🟡 (TP 번호는 ⚠️ 미확인) |
| D5 | **Media Unit Status 로그(0x10)**: 미디어 유닛(다이 등)별 **Capacity Adjustment Factor·Available Spare·Percentage Used**·도메인/Endurance Group/NVM Set ID·채널 수. **Supported Capacity Configuration List 로그(0x11)**: Endurance Group별 총 용량·예비 용량·내구성 추정. **Capacity Management 관리 명령(0x20)**: Endurance Group/NVM Set 생성·삭제(nvme-cli `capacity-mgmt`). **Endurance Group Event Aggregate 로그(0x0F)** + AEN Notice 0x06, Feature 0x18 | master | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h · https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/Documentation/nvme-capacity-mgmt.txt · https://raw.githubusercontent.com/linux-nvme/nvme-cli/master/Documentation/nvme-media-unit-stat-log.txt | ✅ |
| D6 | NVMe 2.0 Endurance Group 관리: 용량 계층 = Domain > Endurance Group > NVM Set > Namespace, 하위에 **Media Unit(예: 다이)**이 채널로 연결. 호스트가 현장에서 미디어 구성을 바꿔 한 SSD 모델로 여러 용도(단일 풀·성능 격리 하위 드라이브 등) 충족 | 2021 | https://snia.org/sites/default/files/2025-05/SNIA-SDC21-Onufryk-NVMe2.0-Specifications-The-Next-Generation-of-NVMe-Technology.pdf · https://nvmexpress.org/wp-content/uploads/NVM-Express-Revision-2.0-Changes.pdf | 🟡 |

### 4-2. 운영체제·에뮬레이터 지원 현황

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| D7 | **Linux 커널 NVMe 호스트 드라이버**: 활성화하는 AEN 마스크 `NVME_AEN_SUPPORTED` = 네임스페이스 속성 변경·FW 활성화·ANA 변경·디스커버리 변경만 포함 — **LBA Status Information Alert(0x05)는 활성화하지 않음**. 해당 Notice가 오면 default 분기에서 "async event result" 경고 로그만 남김. 커널 헤더에 `nvme_admin_get_lba_status = 0x86` opcode 정의만 존재 | master, 2026-10-03 | https://raw.githubusercontent.com/torvalds/linux/master/drivers/nvme/host/core.c · https://raw.githubusercontent.com/torvalds/linux/master/include/linux/nvme.h | ✅ |
| D8 | **QEMU NVMe 에뮬레이터**: 관리 명령 열거형에 Get LBA Status(0x86) 없음 — 미구현. FDP·OCP 확장 SMART(구형)는 구현 | master | https://raw.githubusercontent.com/qemu/qemu/master/include/block/nvme.h · https://raw.githubusercontent.com/qemu/qemu/master/hw/nvme/ctrl.c | ✅ |
| D9 | libnvme 관리 opcode 목록에 **디팝퓰레이션(요소 제거·용량 축소)에 해당하는 NVMe 명령 없음** | master | https://raw.githubusercontent.com/linux-nvme/libnvme/master/src/nvme/types.h | ✅ (부재 확인) |

### 4-3. HDD 선례 — 저장 요소 디팝퓰레이션(SCSI)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| D10 | SCSI **SBC-4 이후 REMOVE ELEMENT AND TRUNCATE(REAT)·RESTORE ELEMENTS AND REBUILD(RESAR)**, ZBC-2 이후 REMOVE ELEMENT AND MODIFY ZONES(REAMZ). REAT의 요청 용량 0 = 디바이스가 축소 용량 결정; 실행 중 'Depopulation in progress' NOT READY; GET PHYSICAL ELEMENT STATUS로 고장 요소 식별(sg3_utils `sg_get_elem_status`·`sg_rem_rest_elem`) | 문서 2026-07-01(sg3_utils 1.49) | https://raw.githubusercontent.com/doug-gilbert/sg3_utils/master/doc/sg_rem_rest_elem.8 · https://raw.githubusercontent.com/doug-gilbert/sg3_utils/master/doc/sg_get_elem_status.8 | ✅ |
| D11 | Leil SDC26 제안(HM-OP, Host-Managed Over-Provisioning): 90/30/7일 리텐션 카운터 텔레메트리 → 호스트·드라이브 협조 핸드셰이크로 선제 데이터 대피 → **호스트 주도 MAX_LBA 축소** → **클러스터 수준 소거 부호 + hole consolidation**으로 내구성 유지, 표준화에 필요한 **NVMe 확장** 제시. HDD의 GET PHYSICAL ELEMENT STATUS / REMOVE ELEMENT AND TRUNCATE를 대응 사례로 언급 | 2026-09 | C8과 동일 | 🟡 |

### 4-4. 학술·업계 연구 (부분 고장·용량 가변·호스트 재구축)

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| D12 | **HotCarbon'24(CMU·Microsoft Azure)**: "저장장치는 고정 용량을 제시하지만 현실은 그렇지 않다 … 광고된 고정 용량을 더 이상 갖지 못하면 장치는 고장 처리돼야 한다. 즉 **오늘날 부분 고장은 전체 고장**" → 스토리지 스택과 드라이브 배치·교체 방식을 바꿔 **부분 고장을 허용**해야. 수명 연장은 고장률을 높여 소거 부호 용량을 더 요구; 적응형 중복(adaptive redundancy)의 부호 전환 IO는 **고밀도 드라이브일수록 대역폭 부담** | 2024-07 | https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/2024-Storage-HotCarbon.pdf | ✅ |
| D13 | **Google "Disks for Data Centers"**(Brewer, FAST'16 기조연설·백서): 단일 디스크가 아니라 **디스크 집합을 최적화**해야 하며, 데이터가 어차피 다른 곳에 있으므로 **"약간 더 데이터를 잃을 수 있는 디스크"**라는 반직관적 목표 — 데이터 손실 회피 비용을 용량·성능 개선으로 돌리자는 것. 물리 변경(더 높은 드라이브·디스크 그룹화)과 펌웨어 변경 모두 탐색 | 2016-02-23 | https://cloud.google.com/blog/products/gcp/google-seeks-new-disks-for-data-centers/ · 백서 https://research.google/pubs/pub44830/ | ✅ (블로그) / 🟡 (백서 본문) |
| D14 | **CVSS(FAST'24, Syracuse·단국대)**: 용량 가변 스토리지 — CV-SSD가 노화에 따라 **노출 용량을 점진 축소**, CV-FS(로그 구조 FS)·CV-manager가 조율. 실워크로드에서 지연 8~53% 감소, 처리량 49~316% 개선, 수명 268~327% 연장 | 2024-02 | https://usenix.org/conference/fast24/presentation/jiao | 🟡 |
| D15 | **Reparo(ACM TOS 17(3), 2021, DGIST 등)**: 초대용량 SSD(32TB)로 RAID 구성 시 드라이브 교체 대신 **NAND 다이 단위로 수리** — SSD 컨트롤러의 멀티코어로 **고장 다이의 LBA를 식별**해 해당 LBA만 복구, SSD 간 데이터 복사 대부분 회피. 32TB 엔터프라이즈 SSD 실험에서 다이 고장 복구가 기존 재구축 대비 **약 57배 빠름** | 2021-08 | https://scholar.dgist.ac.kr/handle/20.500.11750/16127 · DOI 10.1145/3450977 | 🟡 |
| D16 | Tiger(OSDI'22, CMU·Google 등): 디스크 고장률에 맞춰 중복 방식을 조정하는 disk-adaptive redundancy를 배치 제약 없이 구현("eclectic stripe"), 부호 전환 IO의 버스트 감소. 선행 Pacemaker는 11만~45만 디스크 프로덕션 클러스터 트레이스에서 전환 IO를 클러스터 대역폭의 5% 이하(평균 0.2~0.4%)로 묶고 공간 14~20% 절감 | 2022-07 | https://www.usenix.org/conference/osdi22/presentation/kadekodi | 🟡 (Pacemaker 수치는 검색 요약 ⚠️) |

### 4-5. 하이퍼스케일러 소거 부호와 재구축 트래픽

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| D17 | **Azure LRC(ATC'12)**: 저장 비용을 원본의 **1.33배**로 낮추면서 3중 복제보다 높은 내구성. RS(6,3)(1.5배)를 같은 재구축 비용(6조각 읽기)으로 **LRC(12,2,2) 1.33배**로 대체하거나, 같은 1.5배에서 **LRC(12,4,2)로 단일 조각 재구축 읽기를 6→3(50% 감소)**. 재구축 시간은 가장 느린 조각(straggler)에 지배됨 | 2012 | https://www.microsoft.com/en-us/research/publication/erasure-coding-in-windows-azure-storage/ · PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/LRC12-cheng20webpage.pdf | ✅ |
| D18 | **Google Colossus**: 클라이언트 라이브러리에 **소프트웨어 RAID** 기능, 애플리케이션별 다양한 인코딩 사용. 백그라운드 관리자 **Custodian**이 디스크 공간 균형·**RAID 재구성** 담당. "구글 규모에서는 하드웨어가 거의 항상 고장" → I/O를 고장 주변으로 우회하고 빠른 백그라운드 복구. 플래시는 GB당 I/O 밀도를 디스크 수준으로 맞출 만큼만 구매, 데이터는 식으면 **더 큰 용량 드라이브로 재배치** | 2021-04-19 | https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system | ✅ |
| D19 | Facebook 웨어하우스 클러스터(HotStorage'13): RS(14,10) 데이터 복구로 **하루 100TB 이상**의 네트워크 트래픽 발생(수 PB 규모 RS 부호 데이터 클러스터) | 2013 | https://www.usenix.org/conference/hotstorage13/workshop-program/presentation/rashmi · https://arxiv.org/pdf/1309.0186 | 🟡 |
| D20 | VAST Data: 36+4 ~ **146+4**의 매우 넓은 소거 부호 스트라이프, 최대 4개 SSD 동시 고장 보호, 교체 전에도 보호를 유지하는 rebuild-in-place 구조 | 2019~2025 | https://vastdata.com/blog/introducing-rack-scale-resilience · https://blocksandfiles.com/2019/02/26/vast-striping-and-data-protection/ | 🟡 |
| D21 | Kioxia RAID Offload: SSD 컨트롤러 내 패리티 가속 블록이 RAID 초기화·재구축을 SSD 최대 순차 쓰기 속도로 수행 — PoC에서 소프트웨어 RAID 대비 CPU 사용 약 50%·시스템 DRAM 사용 90% 이상 감소 | 2024 | https://americas.kioxia.com/content/dam/kioxia/en-us/business/ssd/asset/KIOXIA_SSD_Rebuilds_Using_RAID_Offload_Tech_Brief.pdf · https://snia.org/sites/default/files/2025-05/SNIA-SDC2024-Saluja-Redefining-Data-Redundancy-and-Data-Scrubbing-with-RAID-offload_0.pdf | 🟡 |

---

## §5. 재구축(Rebuild) 산술 (E)

### 5-1. 공표 수치

| ID | 사실 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|
| E1 | Xinnor·Solidigm: Dell R760 + **D5-P5336 61.44TB** RAID5. 무부하 재구축 **xiRAID 5시간 22분 vs Linux mdraid 53시간 40분**. 호스트 부하 중 재구축 속도 316MB/s vs 10.5MB/s → 61.44TB 1대 재구축 **약 54시간 vs 67일 이상**. 재구축 중 WAF 1.02 vs 1.2 | 2025-07 | https://blocksandfiles.com/2025/07/28/xinnor-ssd-raid-rebuild/ · https://www.solidigm.com/products/technology/raid-rebuild-with-xiraid-and-qlc-ssds.html · https://files.futurememorystorage.com/proceedings/2025/01K5FH3QVZYTSDE82S96S1P04B.pdf | 🟡 (벤더 공동 연구) |
| E2 | Reparo: 32TB SSD 다이 고장 복구가 기존 전체 재구축 대비 약 57배 빠름(D15) | 2021 | D15와 동일 | 🟡 |
| E3 | Kioxia LC9 순차 쓰기 3GB/s(레포 기존 원장 D2) | 2025-07 | [`qlc-v6-reliability-ppm-die-protection-2026-09.md`](qlc-v6-reliability-ppm-die-protection-2026-09.md) §3 D2 | 🟡 |
| E4 | 122TB·245TB·512TB 드라이브의 **공표된 재구축 시간**은 이 세션에서 찾지 못함(§6) | — | — | ⚠️ 부재 |

### 5-2. 파생 산술 (가정 명시, 선형 확대)

가정: E1의 무부하 속도(61.44TB ÷ 5h22m = **3.18GB/s**), 부하 중 속도(**316MB/s**), E3의 드라이브 순차 쓰기(**3GB/s**, 교체 드라이브를 채우는 하한). 다이 1개 = 2Tb = 0.25TB(Kioxia 환산 규약).

| 대상 | @3GB/s 쓰기 하한 | @3.18GB/s(xiRAID 무부하) | @316MB/s(xiRAID 부하 중) |
|---|---|---|---|
| 61.44TB 드라이브 | 5.7h | 5.4h | 2.3일 |
| 122.88TB 드라이브 | 11.4h | 10.7h | 4.5일 |
| **245.76TB 드라이브** | **22.8h** | **21.5h** | **9.0일** |
| 512TB 드라이브 | 47.4h | 44.7h | 18.8일 |
| **다이 1개(0.25TB)만 복구** | 83초 | 79초 | **13.2분** |

⚠️ 파생 — 재구축 속도가 용량과 무관하게 일정하다는 단순 가정. 실제는 스트라이프 폭·네트워크·호스트 부하에 따라 달라짐. 다이 단위 복구는 고장 다이의 LBA를 호스트가 알 수 있을 때(D1·D2·D15)만 성립.

---

## §6. 부정 확인 — 찾지 못한 것 · 재확인 실패 · 상충

| # | 항목 | 결과 |
|---|---|---|
| N1 | **AI 클러스터 내 스토리지의 랙 공간 점유율** 1차 수치 | 미발견. 전력 비중(IEA 약 5%, A20)과 Azure 배출 비중(A17)만 존재 |
| N2 | 하이퍼스케일러가 직접 "GPU가 스토리지의 전력·랙 예산을 잠식한다"고 밝힌 1차 진술 | 미발견. 벤더 후원 콘텐츠(A24·A25)와 Meta의 "GPU 유휴" 보도(A23)뿐 |
| N3 | 122/245TB급 **$/TB 프리미엄** 지수 | 미발견. 소매 리스팅(B13)은 30TB 지수보다 TB당 낮게 나와 프리미엄을 확인하지 못함(B14) |
| N4 | 고객이 **가격 때문에 245TB급 채택을 미룬다**는 직접 진술 | 미발견. TrendForce의 "비용·공급망이 QLC 대규모 채택 장애"(B15)가 가장 가까운 근거 |
| N5 | Samsung **BM1773 245.76TB**(기존 원장 D8) | 이번 검색으로 재확인 실패. FMS 2026 수상 보도에서 Samsung은 V10 BV-NAND·LPDDR5X-PIM으로 수상, 245TB 수상은 Micron·Kioxia |
| N6 | Samsung PM1733 FIP의 **"플레인 4GB·다이 8GB 감량"**(위키·기존 원장 인용) | 재확인 실패(브로슈어 403). AnandTech는 "512다이 중 1개 손실 허용"만 기술. 산술상 30.72TB÷512다이 ≈ 60GB/다이라 "다이 8GB"와의 관계 확인 필요 |
| N7 | 245TB+ 드라이브의 **SSD 내부 보호 구조 공개 수치**(패리티 비율·예비 다이 수) | 어느 벤더도 미공개. Kioxia LC9 "die-level recovery"는 2차 매체 단독(C6) |
| N8 | OCP 스펙의 다이 결함 허용 **요구 ID·최소값** | 미확인. 필드 이름·오프셋은 nvme-cli 코드로만 확인(C1) |
| N9 | 하이퍼스케일러·Ceph·mdraid 등이 **Get LBA Status/LBA Status 알림을 프로덕션에서 사용**한다는 공개 자료 | 미발견. 리눅스 커널은 해당 AEN을 활성화하지 않고(D7) QEMU는 미구현(D8) |
| N10 | NVMe의 **디팝퓰레이션 명령**(HDD의 REAT 대응) | libnvme에 없음(D9). Leil SDC26이 "NVMe 확장 필요"를 제시(D11) |
| N11 | 호스트 소거 부호가 있을 때 **SSD 내부 패리티를 완화**하자는 SSD 대상 제안 | 미발견. HDD 대상 Google 2016 백서(D13)만 확인 |
| N12 | Meta "HDD 스토리지가 AI 추천 클러스터 전력의 35%" (Solidigm 자료가 인용) | Meta 1차 문구 미발견. Meta ISCA'22는 "DSI가 학습보다 더 많은 전력을 쓸 수 있음"(A22) |
| N13 | Meta Tectonic·Google Colossus의 **정확한 RS 파라미터** | 1차 확인 실패. Colossus 블로그는 "다양한 인코딩·소프트웨어 RAID"만 기술(D18) |
| N14 | Kioxia 512TB 제품 계획 | 미발견(BiCS10 2Tb QLC 다이만 확인, B9) |
| N15 | Samsung 256TB 모델 인터페이스 | 매체 간 상충: Gen5(TechRadar) vs PCIe 6.0(Guru3D) (B4) |

---

## §7. 보고서에 쓸 수 있는 문장

1. 2026년 미국 데이터센터 지연 규모는 추적 기관에 따라 "예정 용량의 30~50%"(Sightline Climate)부터 "모라토리엄으로 인한 2.3GW"(SemiAnalysis)까지 엇갈리지만, 뉴욕주는 2026년 7월 50MW 이상 데이터센터의 주 인허가를 1년간 중단했다. (A1·A3·A5, 🟡)
2. AI 랙 전력은 GB200 NVL72 기준 120~132kW로 2025년 업계 평균 랙 밀도(약 9kW)의 10배를 넘고, NVIDIA는 2027년부터 1MW급 랙을 위한 800VDC 전환을 추진하고 있다. (A12·A16·기존 원장, 🟡)
3. Azure에서 스토리지는 운영 탄소배출의 33%, 내재 배출의 61%를 차지하며, 2024년 용량 기준으로는 HDD 서버가 SSD 서버보다 랙 공간당 약 2.6배 많은 데이터를 저장했다. (A17·A18, ✅)
4. 245TB급 SSD는 2026년 5월 Micron이 출하를 시작했고, Sandisk와 Samsung은 512TB 제품을 2027년 로드맵에 올렸다. (B1·B3·B4, 🟡)
5. OCP 데이터센터 SSD의 확장 SMART 로그에는 전체 다이 수, 허용 가능한 다이 고장 수, 오프라인 다이 수 필드가 정의돼 있어 호스트가 드라이브의 다이 결함 허용 상태를 읽을 수 있다. (C1, ✅ 코드 기준)
6. NVMe는 2019년(1.4)부터 Get LBA Status로 복구 불가 가능성이 있는 LBA 범위를 호스트에 알려 그 범위만 다른 사본에서 복구하게 하는 메커니즘을 두었지만, 리눅스 커널 NVMe 드라이버는 해당 비동기 알림을 활성화하지 않는다. (D1·D2·D4·D7, ✅/🟡)
7. Microsoft와 CMU 연구진은 "오늘날 저장장치의 부분 고장은 곧 전체 고장"이라며, 스토리지 스택을 바꿔 부분 고장을 허용해야 한다고 제안했다. (D12, ✅)
8. 61.44TB QLC SSD 1대의 RAID5 재구축은 무부하에서 5시간 22분(xiRAID)~53시간 40분(mdraid)이 걸렸고, 부하 중 mdraid로는 67일 이상으로 추산됐다. (E1, 🟡)

---

## §8. 열람 기록 (✅ 근거 파일)

- libnvme `src/nvme/types.h`·`ioctl.h`·`api-types.h` (master, 2026-10-03 열람) — Get LBA Status·LBA Status 로그·AEN·Media Unit·Capacity Management·EG 경고 플래그
- nvme-cli `plugins/ocp/ocp-smart-extended-log.h`·`ocp-print-stdout.c`·`ocp-print-json.c`, `Documentation/nvme-get-lba-status.txt`·`nvme-lba-status-log.txt`·`nvme-media-unit-stat-log.txt`·`nvme-capacity-mgmt.txt`
- Linux `drivers/nvme/host/core.c`·`include/linux/nvme.h` (master)
- QEMU `include/block/nvme.h`·`hw/nvme/ctrl.c` (master)
- sg3_utils `doc/sg_rem_rest_elem.8`·`doc/sg_get_elem_status.8` (1.49, 2026-07-01)
- Microsoft Research: HotCarbon'24 *A Call for Research on Storage Emissions* PDF · ATC'12 *Erasure Coding in Windows Azure Storage* PDF · SYSTOR'16 *SSD Failures in Datacenters* PDF
- Google Cloud Blog: *Colossus under the hood* (2021-04-19) · *Google seeks new disks for data centers* (2016-02-23)
