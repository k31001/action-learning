# TLC → QLC 전환 가능 eSSD 시장 원장: TLC/QLC 비중, 내구성 등급 분포, AI 스토리지 요구, 가격·원가, 대체 사례, 장애 요인 (2026~2030)

**수집일**: 2026-10-09
**유형**: 웹 팩트 원장 (Research Agent, 해석 없음. 산술은 7장에 ⚠️로 분리)
**용도**: 사용자 주장 검증용 수치 수집. 사용자 주장(2026-10-09): "Today eSSD demand is dominated by general-purpose datacenter TLC, and AI storage also needs fast performance and about 1 DWPD endurance, so it is served by TLC. If customer co-design brings QLC WAF near 1 and cuts GC-induced tail latency, a large part of current TLC demand could move to QLC, which means profitability through cost reduction." 즉 "현재 TLC eSSD 수요 중 QLC가 새로 들어갈 수 있는 시장(TLC → QLC addressable market)"과 2030년까지의 전망.
**접근 한계**: 프록시가 이번 세션에서 solidigm.com, kingston.com, micron.com(assets 포함), trendforce.com(insights 포함), stockanalysis.com, biggo, ithome, mydrivers, memorycapex, xenospectrum, mouser 등 시도한 1차·2차 도메인을 모두 막았다. **✅ 없음.** 모든 값은 검색 엔진 스니펫 경유다.
**등급**: ✅ = 1차 원문 직접 열람 / 🟡 = 검색 스니펫 또는 2차 보도(1차 출처라도 원문 미열람) / ⚠️ = 출처 충돌, 단일 스니펫 미재확인, 저신뢰 시장조사, 또는 파생 계산

---

## 0. 기존 원장과의 관계 (중복 수집하지 않고 ID로만 참조)

| 약칭 | 원장 | 이 원장에서 참조하는 ID |
|---|---|---|
| EO | [essd-outlook-research-firms-2026-10.md](essd-outlook-research-firms-2026-10.md) | TF-01(2026 eSSD 비트 +80%+), **TF-05(eSSD 용량 중 QLC 9% → 17% → 18%(2026E) → 38%(2027F))**, TF-07(QLC가 증분 NAND 수요 최대), CP-01(eSSD = NAND 비트 48%), OT-06(Citi eSSD +52.9% 2027), OT-07(JPM 2028 약 900EB) |
| DA | [essd-demand-by-application-2030-2026-10.md](essd-demand-by-application-2030-2026-10.md) | AI-09 · AI-10(CMX 35EB 2026), AI-17(Solidigm 25EB/GW), AI-19(Micron DC SSD 분기 약 $10B), AI-27(Kioxia DC NAND 295 → 909EB, CY25 → CY28), AI-28(McKinsey 1,078EB 2030), AI-29(SanDisk 1.2ZB 2030), NA-06 · NA-07(HDD 대체, 비용 장벽), NA-20 · NA-21(Meta QLC, Pure) |
| QM | [qlc-essd-market-size-forecast-data-2026-09.md](qlc-essd-market-size-forecast-data-2026-09.md) | §2.1(QLC eSSD 2024 30EB), §3.3(VDURA 30TB TLC/QLC $/TB), §4(CMX TLC 진영) |
| DW | [ssd-customer-high-dwpd-evidence-2026-10.md](ssd-customer-high-dwpd-evidence-2026-10.md) | CU-13a(Microsoft 플릿 0.07~0.23 DWPD), CU-15(NetApp 중앙값 0.36, 7%+가 3 DWPD 초과), CU-16(NetApp 약 95%가 QLC로 옮겨도 조기 마모 없음) |
| KV | [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) | §3.1(QLC 정격 0.075~0.6 DWPD, KV 티어 TLC 1~3 DWPD), §3.2(CacheLib FDP WAF 3.22 → 1.03) |
| MX | [ssd-mixed-media-hyperscaler-logic-2026-10.md](ssd-mixed-media-hyperscaler-logic-2026-10.md) | MX-10 · MX-11(CSAL WAF ≈1), MX-15(QLC drop-in 실패 원인 = IU + GC), MX-34(Alibaba TLC 로컬 디스크 GC로 p99.9 > 1ms), MX-35(CSAL 포화 p99.99 약 501ms) |
| DP8 | [qlc-v8-dwpd-price-inference-2026-09.md](qlc-v8-dwpd-price-inference-2026-09.md) | C-01(TrendForce는 QLC/TLC $/TB 분리 공개 안 함), C-11(비트당 원가 절감 이론 상한 25%), C-14(드라이브 공통 원가 희석) |

---

## 1. eSSD 총량과 TLC/QLC 비중 전망 (질문 1 · 6)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| TQ-01 | SK hynix PCIe 설계 담당 박대식 팀장, TSMC OIP 콘퍼런스(2026-09-23, 산타클라라) 발표: "PCIe 기반 eSSD 시장이 2026년 509EB에서 2030년 1,933EB로 약 3.8배" 성장. 매체에 따라 "기업용 SSD 시장"으로도 표기 | **509EB(2026) → 1,933EB(2030)** | 뉴스핌 · 글로벌이코노믹 · 스마트비즈 등 2026-09-28 보도, BigGo 영문 재보도 | https://www.newspim.com/news/view/20260928001005 , https://www.g-enews.com/article/Industry/2026/09/202609281555574227139bf6e4b2_1 , https://finance.biggo.com/news/36a62c2a-97bc-440c-805a-2cf40456dd41 | 🟡 (복수 국내 보도 일치, 발표 원문 미확인, TLC/QLC 분할 없음) |
| TQ-02 | Omdia(2024-06-10 보고서): QLC가 NAND 시장에서 차지하는 비중 12.9%(2023) → 20.7%(2024) → **46.4%(2027)**, 같은 시점 TLC 약 51%. 성장 동인은 서버용 제품 | % | Omdia 2024-06, 중문 · 한국 매체 재보도 | https://www.sohu.com/a/785919596_114760 , https://m.huxiu.com/article/3172698.html | ⚠️ (NAND 전체 기준, 비트 · 매출 구분 불명, 2024년 전망이라 쇼티지 이전) |
| TQ-03 | DigiTimes(2025-11) 보도를 인용한 재보도: AI 기업이 HDD 대기 대신 QLC SSD로 이동, "QLC will pass TLC in total sales by early 2027", 다른 재보도는 "QLC bit shipments could surpass TLC as early as 2027" | 2027 QLC > TLC | TechSpot · Guru3D · WinFuture, 2025-11 | https://www.techspot.com/news/110196-data-centers-now-hoarding-ssds-hard-drive-supplies.html | ⚠️ (단일 원천 DigiTimes 반복 인용, 매출 · 비트 표현 혼재, 범위가 NAND 전체인지 eSSD인지 불명) |
| TQ-04 | SanDisk Investor Day(2026-08-13) 녹취록 검색 스니펫: "TLC is dominant technology in 2030, and QLC still has a very good, decent-sized share". 비율 수치 없음 | 정성 | SanDisk, 2026-08-13 | https://stockanalysis.com/stocks/sndk/transcripts/708061-investor-day-2026/ | ⚠️ (스니펫 1회, 재검색으로 원문 문구 재확인 실패) |
| TQ-05 | Mordor Intelligence: 2025 NAND 매출의 63.58%가 TLC, QLC는 2031년까지 CAGR 6.35%로 총 비트의 약 1/5에 접근 | % | Mordor, 2026 | https://www.mordorintelligence.com/industry-reports/nand-flash-memory-market | ⚠️ 저신뢰(TQ-02 · TQ-03 · EO TF-05와 크게 충돌) |
| TQ-06 | TrendForce(2026-09-21): 미국 CSP의 eSSD 수요 상향은 "not confined to high-performance TLC products", QLC가 "significant growth catalyst". 에이전틱 AI 확산으로 "QLC enterprise SSD penetration across North American cloud and data center applications" 증가 예상. 중국은 DeepSeek 중심 구성에서 KV 캐시를 대용량 QLC eSSD로 오프로드 | 정성 | TrendForce 2026-09-21 | https://www.trendforce.com/presscenter/news/20260921-13246.html | 🟡 (EO TF-04 · TF-05와 같은 발표, TLC 문구 보강) |
| TQ-07 | TrendForce X 게시: "some operators have begun buying QLC SSD for their SSD PODs, where TLC+HDD was the default" | 정성 | TrendForce, 2026-09 | https://x.com/trendforce/status/2103092109997662528 , https://insights.trendforce.com/p/why-csps-are-turning-to-qlc-ssds | 🟡 (TLC+HDD 기본 구성에 QLC가 추가되는 것이지 TLC 대체 비율 수치는 없음) |
| TQ-08 | TrendForce(2025-09-25): HDD 부족으로 "CSPs quickly redirect storage demand toward QLC Enterprise SSDs", SanDisk 10% 인상 · Micron 견적 중단. 2025-09-17 Bulletin: 공급사가 공정 전환 · 캐파 조정으로 QLC 생산 우선, 신규 팹은 회피 | 정성 | TrendForce 2025-09-25 · 2025-09-17 | https://www.trendforce.com/presscenter/news/20250925-12736.html | 🟡 (대체 대상은 HDD) |
| TQ-09 | TrendForce NAND 웨이퍼 계약가 2026-07 · 08 보고서 요약: QLC 가격 모멘텀 "froze", "QLC prices stay strictly flat"(컨슈머 수요 약세와 구매자 저항) | 정성 | TrendForce RP260731FS · RP260831VN | https://www.trendforce.com/research/download/RP260831VN | 🟡 (웨이퍼 기준, eSSD 계약가와 별개) |
| TQ-10 | 삼성 2Q26 실적 콜: PCIe Gen6를 "growing demand for high-performance TLC-based storage"의 대응으로 제시, 주요 고객 초기 반응 긍정. 서버 SSD가 2026 NAND 매출의 60% 초과(+20%p 이상) | % | 삼성 2Q26 실적 콜, 2026-07-29~30 | https://www.investing.com/news/transcripts/earnings-call-transcript-samsung-electronics-posts-record-q2-2026-profit-as-ai-demand-surges-93CH-4822292 | 🟡 (QLC 2H26 비트 2배는 QM §2.1 참조) |
| TQ-11 | Micron FQ4 FY26: DC SSD 매출 약 $10B로 회사 NAND 매출의 2/3 초과, "AI context memory storage used for KV cache offload and HDD displacement opportunities are expanding the addressable market for SSDs". QLC 비트 비중 수치 없음 | 비중 | Micron, 2026-09-30 | https://s25.q4cdn.com/621799436/files/doc_financials/2026/q4/Q4-FY26-Prepared-Remarks.pdf | 🟡 |

**1장 판독(사실만)**: eSSD 안에서 TLC/QLC를 나눈 공개 수치는 TrendForce 용량 비중(EO TF-05) 하나뿐이다. 2028 · 2030년 eSSD 내 QLC 비중을 수치로 낸 기관 자료는 찾지 못했다. 2030 총량으로는 SK hynix의 PCIe eSSD 1,933EB(TQ-01)가 새로 확보됐고, 기존 McKinsey 1,078EB(DA AI-28), SanDisk 1.2ZB(DA AI-29)와 함께 범위를 이룬다.

## 2. 내구성 등급 분포: read-intensive(약 1 DWPD) 대 mixed-use(약 3 DWPD) (질문 2)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| TQ-12 | Micron 백서가 Forward Insights(Datacenter, 2018-05) 인용: 2017년 전 세계 출하 eSSD의 약 3/4이 정격 1 DWPD 이하 | 약 75% (2017, 출하) | Micron "Comparing SSD and HDD Endurance in the Age of QLC SSDs" | https://assets.micron.com/adobe/assets/urn:aaid:aem:85cdc41d-d44a-4dc3-8aa5-2cdc9c3a9206/original/as/5210-ssd-vs-hdd-endurance-white-paper.pdf | 🟡 (원문 차단, 스니펫) |
| TQ-13 | Kingston DC500 출시 보도자료의 Forward Insights Gregory Wong 발언: "Eighty (80) percent of all enterprise SSDs deployed in data centers require less than one (1) DWPD" | 80% (배치 기준) | Kingston, 2019 | https://www.kingston.com/fr/company/press/article/53087 | 🟡 |
| TQ-14 | Kingston 블로그가 Forward Insights 보고서 인용: SATA 드라이브를 쓰는 데이터센터 · 기업의 82.3%가 1 DWPD 미만 드라이브로 운영 | 82.3% (SATA) | Kingston, 날짜 미표기 | https://www.kingston.com/en/blog/servers-and-data-centers/ssd-drive-writes-per-day-dwpd | 🟡 |
| TQ-15 | DapuStor 64TB QLC eSSD 출시 자료가 Forward Insights 인용: "up to 91% of current PCIe SSD deployments are used in applications with DWPD of less than 1", **2028년 99%** 전망 | 91% → 99% (2028) | DapuStor, 2024년 추정(일자 미확인) | https://techpowerup.com/news-tags/64%20TB | ⚠️ (벤더 재인용, FI 원문 미확인) |
| TQ-16 | Solidigm 페이지 스니펫: "Today about 85% of SSDs shipped to data centers have an endurance of ≥1 DWPD, which meets the needs … at a lower cost than ≥3 DWPD"(2019 Forward Insights 인용으로 표기). 같은 Solidigm 자료군: "94% of workloads are read-intensive"(USENIX 워크로드 연구 인용, 드라이브가 아닌 워크로드 기준) | 85% · 94% | Solidigm EDSFF 혼합 워크로드 페이지 · D5-P5430 성능 브리프 | https://www.solidigm.com/products/technology/edsff-for-mixed-workload-lowers-cost-increases-density-for-ssds.html , https://www.solidigm.com/content/dam/solidigm/en/site/products/technology/performance-brief/documents/performance-brief-d5-p5430-qlc-read-intensive-workloads.pdf | ⚠️ (부등호 방향이 문맥상 "1 DWPD 등급"을 뜻하는지 불명, 재검색 미확인) |
| TQ-17 | 등급 정의: SNIA 분류 요약 RI 약 1 DWPD, MU 3 DWPD, WI 5~10 DWPD. HPE RI 약 1 · MU 약 3 · WI 약 10. 리셀러 가이드는 RI 0.5~1, MU 1~3으로 경계가 업체마다 다름 | DWPD | ARPHost(SNIA 요약), HPE, 리셀러 | https://arphost.com/nvme-ssd-for-server/ , https://www.prodisknetwork.com/blog/hp-enterprise-ssd-guide | 🟡 |
| TQ-18 | ServeTheHome Kioxia XD7P 리뷰: 정격 1 DWPD, "in the hyper-scale market, usually, we do not see drive endurance ratings above 1 DWPD", 하이퍼스케일 관리 기법이 OP · 고내구 수요를 줄임 | ≤1 DWPD 관행 | ServeTheHome, 2023경 | https://www.servethehome.com/?p=64718 | 🟡 |
| TQ-19 | Kioxia NX1 E1.S(BiCS8 **TLC**, PCIe 5.0, 1.92~15.36TB): "1 DWPD for read-intensive applications", 클라우드 · 하이퍼스케일 대상, 일부 하이퍼스케일 고객 샘플링, XD 시리즈 후속 | 1 DWPD TLC | Kioxia, 2026-07-28 | https://www.businesswire.com/news/home/20260728553833/en/Kioxia-Announces-Next-Generation-E1.S-SSDs-for-AI-and-Hyperscale-Environments | 🟡 |

**2장 판독(사실만)**: 등급 분포를 비트 · 매출 기준으로 나눈 자료는 찾지 못했다. 확보된 것은 **출하 · 배치 대수 기준** Forward Insights 계열 수치(75% 2017, 80% 2019, 82.3% SATA, 91% PCIe → 99% 2028)뿐이며 모두 벤더 재인용이다. "TLC eSSD 중 read-intensive 비중"을 직접 낸 자료도 없다. 하이퍼스케일 TLC는 관행적으로 1 DWPD 이하라는 리뷰 진술(TQ-18)과 2026년 신제품(TQ-19)이 있다. 실사용 DWPD는 DW CU-13a · CU-15 참조.

## 3. AI 스토리지 드라이브 요구와 매체 (질문 3)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| TQ-20 | StorageReview 2026 엔터프라이즈 SSD 리더보드: 읽기 중심 서빙 티어는 0.6~1 DWPD(고용량 QLC 영역), "AI training pipelines that checkpoint frequently want 3 DWPD" | 0.6~1 / 3 DWPD | StorageReview, 2026 | https://www.storagereview.com/best/enterprise-ssds | 🟡 |
| TQ-21 | StorageReview 체크포인트 시험: QLC Solidigm P5336이 다수 체크포인트 보관에 적합, 2~3회차 평균 체크포인트 시간 차이가 TLC 대비 17% 미만 | <17% | StorageReview, 2024경 | https://www.storagereview.com/review/scaling-ai-checkpoints-the-impact-of-high-capacity-ssds-on-model-training | 🟡 |
| TQ-22 | NVIDIA DGX SuperPOD 스토리지 인증은 "much more of a yes/no compatibility test"이며, 검색 범위에서 NVIDIA가 TLC/QLC나 DWPD를 요구 조건으로 명시한 자료는 없음. 인증 업체 DDN · Dell · IBM · NetApp · VAST · WEKA(2024), 이후 Everpure FlashBlade//S | 정성 | Blocks & Files, 2024-09-03 | https://blocksandfiles.com/2024/09/03/nvidia-superpod-storage-certification/ | 🟡 (요구 조건 부재는 부정 확인) |
| TQ-23 | VAST: SuperPOD 인증은 all-QLC 파일 스토리지(2023-05). QLC SSD에 대해 유지보수 계약 하 최대 10년 내구성 보증, 근거는 애플리케이션 인지 배치 + 대형 SCM 쓰기 버퍼 | 10년 | VAST 2019 · 2023 | https://blocksandfiles.com/2023/05/17/vast-data-goes-certifiably-superpodding/ , https://blocksandfiles.com/2019/06/05/vast-data-zero-compromise-guarantee/ | 🟡 (드라이브 DWPD 수치 비공개) |
| TQ-24 | DDN: "AI400X2 and AI400X2 QLC solutions are now fully validated with … DGX SuperPOD with DGX GB200". DDN 설명상 TLC 시스템은 LLM 등 최대 · 최복잡 AI 워크로드용, QLC는 드라이브당 성능을 일부 양보하고 용량 · $/TB 우위 | 정성 | DDN 블로그 · Scan 제품 페이지 | https://www.ddn.com/blog/unlocking-the-full-potential-of-ai-factories-with-nvidia-certified-storage-and-ddn-ai400x2/ , https://www.scan.co.uk/ai-solutions/ddn-storage | 🟡 |
| TQ-25 | WEKA: Micron 6500 ION(**TLC** 30.72TB) 고객 배치 언급(2024). WEKApod Prime(2025-11-18)은 **TLC + eTLC** 혼합 플래시로 "65% better price-performance", QLC 아님 | 정성 · 65% | Micron 6550 ION 출시 자료 · WEKA 2025-11-18 | https://www.blocksandfiles.com/data-management/2025/07/30/micron-rolls-out-276-layer-ssd-trio-for-speed-scale-and-stability/1609384 , https://www.aap.com.au/aapreleases/cision20251118ae25600 | 🟡 |
| TQ-26 | NVIDIA BlueField-4 STX: 노드당 BF-4 DPU 2개 + NVMe 24개, GPU당 16TB · NVL72 랙당 1,152TB(2차 출처), 2H26 출시. 공개 자료에 NAND 종류 · DWPD 없음(CMX 타깃 SSD의 TLC 정격은 KV §3.1 · QM §4 참조) | 구성 | Glenn Klockwood 노트 · NADDOD · NVIDIA GTC 2026 | https://www.glennklockwood.com/garden/stx , https://www.naddod.com/ai-insights/nvidia-bluefield-4-stx-storage-architecture-designed-for-an-ai-native-storage-and-data-platform | 🟡 |
| TQ-27 | Kioxia LD4: 첫 E1.L **QLC**(BiCS8) 하이퍼스케일용, 15.36 · 30.72TB 출시, 검증 구조상 최대 122.88TB, PCIe 5.0, OCP Datacenter NVMe SSD Spec 2.6, 단일 포트, 용도 "read-intensive workloads such as AI data repositories and object storage", 일부 고객 샘플링, OCP 2026(10-12~15) 전시. DWPD 미공개 | 정성 | Kioxia, 2026-10-08 | https://www.businesswire.com/news/home/20261008680762/en/Kioxia-Introduces-E1.L-QLC-based-SSDs-for-Hyperscale-Data-Centers | 🟡 |

**3장 판독(사실만)**: AI 스토리지 중 (i) 데이터 레이크 · 오브젝트 · 체크포인트 보관은 QLC 시스템이 이미 인증 · 출하됐고(VAST, DDN AI400X2 QLC), (ii) 빈번한 체크포인트 · KV 캐시 티어는 3 DWPD급 또는 TLC가 기준으로 제시된다(TQ-20, KV §3.1). NVIDIA 인증 자체에는 DWPD 기준이 공개돼 있지 않다. AI 스토리지 EB 중 TLC/QLC 분할 수치는 없다.

## 4. 가격·원가: QLC 대 TLC (질문 4)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| TQ-28 | VDURA 지수 분기 표(QM §3.3 보강): 30TB TLC $17,500(1Q26) → **$18,900(2Q26)** → $22,600(3Q26), 30TB QLC $14,000(1Q26) → **$15,120(2Q26)** → $18,080(3Q26). 1Q26 QLC는 발표본에 따라 $14,000 대 $15,121로 개정 차이 | $/드라이브 | VDURA, 2026-04 · 08 | https://www.vdura.com/?p=16714 , https://www.tomshardware.com/pc-components/ssds/vdura-sharply-revises-its-enterprise-ssd-pricing-figures | 🟡 (2Q26 비율 15,120 ÷ 18,900 = 0.800, DP8 2-A의 "모델링 가정" 의심 유지) |
| TQ-29 | Kioxia BiCS8 1Tb **TLC** 메모리 밀도 18.3 Gb/mm² | 18.3 Gb/mm² | Kioxia 기술 토픽 | https://www.kioxia.com/en-jp/rd/technology/topics/topics-66.html | 🟡 |
| TQ-30 | BiCS8 2Tb **QLC** 다이 밀도 "22.9 Gb/mm² (?)"(TechInsights 수치로 인용, 물음표 표기) | 22.9 Gb/mm² | Tom's Hardware | https://www.tomshardware.com/pc-components/ssds/wd-2tb-3d-qlc-nand-chips-should-open-the-door-to-cheaper-high-capacity-ssds | ⚠️ (불확실 표기, 동일 세대 TLC 대비 약 1.25배는 7장 산술) |
| TQ-31 | Kioxia · SanDisk BiCS10 332단 QLC 37 Gb/mm². SanDisk: BiCS10 QLC가 BiCS8 대비 비트 밀도 +60%, 웨이퍼당 다이 +65% | Gb/mm² · % | 2026, SanDisk Investor Day · Counterpoint | https://xenospectrum.com/en/kioxia-sandisk-bics10-332-layer-qlc-nand-highest-density/ , https://counterpointresearch.com/en/insights/sandisk-investor-day-caching-out-the-nand-cycle-with-contracts | 🟡 (QLC 대 QLC 비교) |
| TQ-32 | Micron 6500 ION(232단 **TLC**, 30.72TB, 2023): "a superior value over the competing QLC-based drive and comes in at a comparable price point to the competing QLC SSD"(경쟁 Solidigm P5316). 정격 0.3 DWPD(4KB 랜덤) · 1.0 DWPD(128KB 순차), 4KB 랜덤 쓰기 내구성 경쟁 QLC 대비 10배 이상(벤더 주장) | 가격 동등 주장 | Micron 제품 브리프 · AnandTech · TechRadar, 2023-05 | https://www.anandtech.com/show/18863 , https://www.techradar.com/news/microns-new-3072tb-ssd-could-trigger-huge-price-drop-amongst-big-qlc-ssds | 🟡 (다운턴기 발언, 현재가 미확인) |
| TQ-33 | Meta 엔지니어링 블로그: "While today QLC is lower in cost than TLC, it is not yet price competitive enough for a broader deployment" | 정성 | Meta, 2025-03-04 | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ | 🟡 |
| TQ-34 | DapuStor 주장: QLC의 TB당 TCO가 TLC보다 약 20% 낮음, 다른 자료에서는 최대 1/3 절감 | 20% · 33% | DapuStor, 2025-03 | https://www.storagenewsletter.com/2025/04/03/dapustor-sees-qlc-enterprise-ssd-boom-amid-ai-integration-surges/ | ⚠️ (벤더 주장, DP8 C-11의 25% 이론 상한과 충돌 가능, TCO와 $/TB 혼용) |

**4장 판독(사실만)**: TrendForce를 포함한 가격 기관의 QLC/TLC eSSD 계약가 분리 공개는 이번에도 찾지 못했다(DP8 C-01 유지). 공개 지수(VDURA)상 QLC는 3개 분기 모두 TLC보다 약 13~20% 낮았고 2026년 쇼티지 중 QLC가 TLC보다 비싸진 기록은 찾지 못했다. 같은 세대 다이 밀도 비교(TQ-29 · TQ-30)가 비트당 원가 차이의 유일한 공개 근거이며, 그중 QLC 쪽 수치는 불확실 표기다. 반대 사례로 "QLC 가격의 TLC"(TQ-32)가 있다.

## 5. 범용 클라우드에서의 QLC 채택·대체 사례 (질문 5)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| TQ-35 | Meta: 성능 티어 TLC, 중간 티어 QLC, 대량 HDD의 3계층. 대상 워크로드 약 10 MB/s/TB, 과거 저용량(<32TB) · 고비용 · 쓰기 내구성 때문에 TLC 대안이 못 됐음. Pure DFM 150TB · 300TB(동일 패키지로 600TB까지), 표준 NVMe QLC는 U.2-15mm 512TB 계획. At-Scale 발표: "At Meta we are deploying high density QLC racks at scale"(용량 수치 없음) | 정성 | Meta 2025-03-04 · At-Scale 발표 | https://engineering.fb.com/2025/03/04/data-center-engineering/a-case-for-qlc-ssds-in-the-data-center/ , https://atscaleconference.com/videos/advancing-flash-storage-meta/ | 🟡 (DA NA-20 보강, QLC 티어가 TLC를 대체하는지 HDD를 대체하는지는 "중간 티어"로만 기술) |
| TQ-36 | Pure Storage(현 Everpure): 상위 4개 하이퍼스케일러 디자인 윈, CY2026 "double-digit Exabytes" 본배치 예상, 대상 시장 "700 Exabyte per year". 3Q FY26에 연간 하이퍼스케일러 출하 예상치 2EB 초과 달성. 2026년 두 번째 상위 5개 하이퍼스케일 고객 확보 | EB | Pure 실적 콜 2025 · Blocks & Files 2025-12-03 · SDxCentral 2026 | https://blocksandfiles.com/2025/12/03/pure-storage-q3-2026/ , https://www.sdxcentral.com/news/everpure-ever-richer-as-revenues-rise-38-amid-hyperscaler-success/ | 🟡 (700EB는 HDD 시장 표현으로 읽히며 TLC 대체 아님, DA NA-21 보강) |
| TQ-37 | Alibaba CSAL: ECS 수천 대 서버 배치. 비교 기준은 이전 세대 **HDD** 로컬 디스크(2TB HDD 24개)이며 CSAL 서버(800GB 고성능 SSD + 15.36TB QLC)가 같은 SLO에서 인스턴스 2배 | 수천 대 · 2배 | EuroSys'24 · The Register 2024-05-02 | https://www.theregister.com/2024/05/02/alibaba_cloud_csal_ecs_scaling/ , https://yanbozyb.github.io/paper/csal_eurosys.pdf | 🟡 (MX-15 · MX-16과 같은 사례, 대체 대상은 HDD) |
| TQ-38 | 국내 · 중국 업체 블로그: AWS · Azure가 AI 데이터 레이크용 128TB QLC SSD 대량 조달 시작 | 정성 | OSCOO 블로그, 2025~26 | https://www.oscoo.com/kr/news/qlc-ssds-full-rise-a-new-storage-paradigm-for-the-ai-era-balancing-cost-and-performance/ | ⚠️ (출처 불명, AWS · Microsoft 1차 확인 없음) |
| TQ-39 | DapuStor: 122TB QLC 모델이 최종 고객에 이미 배치(고객명 없음). Micron 6600 ION 245TB QLC 2026-05 출시(AI 데이터 레이크 · 하이퍼스케일 대상) | 정성 | DapuStor · Electronics Weekly 2026-05 | https://www.electronicsweekly.com/news/business/micron-launches-245tb-ssd-2026-05/ | 🟡 |

**5장 판독(사실만)**: 공개 대체 사례의 비교 기준은 대부분 **HDD**다(Alibaba CSAL, Pure 700EB, TrendForce 2025-09). **TLC를 QLC로 바꿨다고 수치로 밝힌 하이퍼스케일러 사례는 찾지 못했다.** 가장 가까운 것은 TrendForce의 "TLC+HDD 기본 SSD POD에 QLC 추가"(TQ-07)와 Meta의 "TLC와 HDD 사이 중간 티어"(TQ-35)다. Google · AWS · Microsoft · Oracle의 QLC 공식 공개는 찾지 못했다(9장).

## 6. QLC 전환 장애 요인 (질문 6, 수치 근거)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| TQ-40 | Solidigm D5-P5336 122.88TB(QLC, Gen4): 순차 쓰기 최대 3,000MB/s, 랜덤 쓰기 19,000 IOPS(16K, QD256), 랜덤 읽기 900K IOPS(4K). 61.44TB 모델은 16K 랜덤 쓰기 43K IOPS · 순차 쓰기 3.3GB/s | MB/s · IOPS | Solidigm 데이터시트 재게시 · StorageReview | https://www.disctech.com/Solidigm-D5-P5336-122.88TB-PCIe-4.0-NVMe-U.2-SSD-SBFPF2BV0P12001 , https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency | 🟡 |
| TQ-41 | Micron 6600 ION 245.76TB(G9 **QLC**): 4K · 16K 랜덤 쓰기 42,000 IOPS, 순차 쓰기 3,000MB/s, 16K RDWPD 0.3(4K 0.075는 KV §3.1). 실측 약 50K IOPS(QD256) | IOPS · MB/s | StorageReview · TechRadar · TweakTown, 2026 | https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay | 🟡 |
| TQ-42 | Micron 6550 ION 61.44TB(G8 **TLC**, Gen5, 2024-11): 4K 랜덤 쓰기 70,000 IOPS, 순차 쓰기 7,000~8,000MB/s(유통 목록) 또는 5GB/s(StorageReview E3.S), 1 RDWPD(16K) · 0.25 RDWPD(4K). "Before releasing the TLC-based 6550 ION, manufacturers needed to use QLC NAND to hit the 61.44TB capacity point" | IOPS · MB/s · DWPD | StorageReview · 유통 목록 | https://www.storagereview.com/review/the-micron-6550-ion-ssd-gen5-performance-energy-efficiency-and-high-capacity-in-one-drive | 🟡 (순차 쓰기 출처 간 충돌) |
| TQ-43 | Toshiba(현 Kioxia) FMS 2018 시뮬레이션: 백그라운드 쓰기 중 평균 읽기 지연 증가가 IO 격리 없을 때 QLC 약 18배 대 TLC 약 6배, NVMe IO Determinism으로 완화 | 18× 대 6× | FMS 2018 ARCH-102-1 Wells | https://files.futurememorystorage.com/proceedings/2018/20180807_ARCH-102-1_Wells.pdf | 🟡 (시뮬레이션, 2018년 세대) |
| TQ-44 | IU 크기가 4K → 16K → 64K로 커짐(컨트롤러 DRAM의 FTL 표 축소 목적). 64K IU 드라이브에 4K 쓰기 시 소형 쓰기 WA 16배. SNIA: IU 비정렬 쓰기 → RMW, "more common with increasing SSD capacities and QLC SSDs" | 16× | All About Circuits(컨트롤러 업체 기고) · SNIA RSDC 2025 Helmick | https://www.allaboutcircuits.com/industry-articles/solving-the-qlc-nand-flash-ssd-scaling-challenge/ , https://snia.org/sites/default/files/2025-05/SNIA-RSDC2025-Helmick-From-Standards-to-Practice.pdf | 🟡 (MX-15의 P5316 IU 64KB와 정합) |
| TQ-45 | DigiTimes 경유: 일부 제조사의 2026년 QLC NAND 생산능력이 이미 선구매 완료, QLC 할당 캐파 2026년 내내 예약 | 정성 | Guru3D · Borecraft, 2025-11 | https://www.guru3d.com/story/ai-data-centers-cause-twoyear-hard-drive-shortage-worldwide/ | 🟡 (공급 측 장애) |
| TQ-46 | QLC 셀 사이클 약 1,000 P/E 대 TLC 약 5,000 P/E, WA 4배 랜덤 쓰기 가정 시 5년 0.14 DWPD 미만(구매 가이드 모델) | P/E · DWPD | 구매 가이드, 2026 | https://www.servnetuk.com/insights/qlc-flash-enterprise-when-right-call-2026 | ⚠️ (2차 모델, YMTC X3-6070 QLC 4,000 P/E 주장과 충돌) |

**6장 판독(사실만)**: 같은 시기 대용량 드라이브 기준 QLC는 TLC 대비 순차 쓰기 약 3GB/s 대 5~8GB/s, 4K 랜덤 쓰기 42K 대 70K IOPS(Micron 동사 비교), 4K 내구성 0.075 대 0.25 RDWPD다. 꼬리 지연은 GC 상호작용이 TLC보다 크다는 2018 시뮬레이션(TQ-43)과 TLC에서도 GC로 p99.9 > 1ms인 실측(MX-34)이 있다. 고객 측 장애로는 비용 경쟁력 부족(TQ-33), 공급 측 장애로는 QLC 캐파 선점(TQ-45)이 기록돼 있다.

---

## 7. 파생 계산 (⚠️ 산술, 2026-10-09)

모든 값은 위 사실과 기존 원장 ID의 사칙연산이다. 점 추정이 아니라 범위로 쓴다. **용량 기준 비중(TF-05)을 EB에 곱하고, 대수 기준 등급 비중(FI)을 EB에 곱하는 것 자체가 정의 불일치를 포함한다**(8장).

### 7-1. eSSD 총량과 TLC EB

| 항목 | 산식 | 값 |
|---|---|---|
| 2023 eSSD 총량(역산) | QLC 7.5EB(QM §2.1) ÷ QLC 비중 9%(TF-05) | 약 83EB |
| 2024 eSSD 총량(역산) | QLC 30EB ÷ 17% | 약 176EB (McKinsey 2024 181EB, EO MK-01과 3% 이내) |
| 2024 TLC eSSD | 176 × (1 − 0.17) | 약 146EB |
| 2026 eSSD 총량 | (a) Kioxia · TechInsights DC NAND 295EB × 1.46(CAGR, AI-27) ≈ 431EB / (b) SK hynix 509EB(TQ-01) / (c) 2025 기저 265~295EB × 1.80(TF-01) ≈ 477~531EB | **약 430~530EB** (중앙 509EB) |
| 2026 TLC eSSD | 총량 × (1 − 0.18)(TF-05, SLC · MLC 무시) | **약 353~435EB** (중앙 417EB) |
| 2027 eSSD 총량 | 2026 총량 × 1.529(Citi, OT-06) | 약 659~812EB |
| 2027 TLC eSSD | 2027 총량 × (1 − 0.38)(TF-05) | 약 409~503EB → **2026 대비 TLC EB는 약 0~+16%, 증분 대부분이 QLC**(TF-07 "QLC가 증분 최대"와 정합) |
| 2030 eSSD 총량 | McKinsey 1,078EB(AI-28) · SanDisk 1.2ZB(AI-29) · SK hynix PCIe eSSD 1,933EB(TQ-01) | **약 1,078~1,933EB** |
| 2030 QLC 비중 가정 | 하한 38%(2027 TF-05 유지), 상한 50%(TQ-03의 "QLC > TLC" 근접). TQ-04(SanDisk "TLC dominant 2030")는 50% 미만을 시사 | 38~50% (기관 수치 없음, 가정) |
| 2030 TLC eSSD | 1,078 × 0.50 ~ 1,933 × 0.62 | **약 540~1,200EB** |
| 2030 이미 QLC인 EB | 1,078 × 0.38 ~ 1,933 × 0.50 | 약 410~970EB (전환 대상이 아니라 이미 QLC로 계산되는 몫) |

### 7-2. QLC addressable EB (TLC 중 전환 가능 몫)

- **1단계(등급 필터)**: TLC EB × read-intensive(≤1 DWPD) 비중. 비중은 FI 계열 75%(2017, TQ-12) ~ 91%(현재 PCIe, TQ-15). 2030은 75% ~ 95%(TQ-15의 2028년 99%는 벤더 재인용이라 상한을 95%로 둠).
- **2단계(성능 필터, 공동 설계 성공 여부)**: 1단계 결과 중 쓰기 대역 · 꼬리 지연 · 소형 랜덤 쓰기 때문에 TLC가 선택된 몫을 제외. **이 비율을 낸 자료는 없다.** 그래서 전환율 30% / 50% / 70%의 민감도로만 제시한다. 근거 범위: NetApp은 모집단 약 95%가 QLC로 옮겨도 조기 마모 없음(DW CU-16, 내구성만 본 상한), Microsoft 플릿 소비 0.07~0.23 DWPD(DW CU-13a)는 QLC 정격 0.26~0.6(KV §3.1) 아래.

| 연도 | 1단계: RI급 TLC EB | 2단계 전환율 30% | 50% | 70% |
|---|---|---|---|---|
| 2026 | 353 × 0.75 = **약 265EB** ~ 435 × 0.91 = **약 396EB** (중앙 417 × 0.83 ≈ 346EB) | 약 80~119EB | 약 133~198EB | 약 186~277EB |
| 2030 | 539 × 0.75 = **약 404EB** ~ 1,198 × 0.95 = **약 1,139EB** | 약 121~342EB | 약 202~569EB | 약 283~797EB |

- 비교 기준: 2026 KV 캐시 · CMX NAND 약 35EB(DA AI-09 · AI-10, 현재 TLC 1~3 DWPD 티어)는 2026 1단계 범위의 약 9~13%다(35 ÷ 396 ~ 35 ÷ 265). 이 티어는 정격상 1단계에 일부만 포함될 수 있어 별도 표시만 한다.
- **결과 요약(⚠️)**: 2026년 TLC eSSD 약 350~435EB 중 등급상 QLC 후보는 약 265~396EB, 성능 조건까지 감안한 전환 가능 몫은 가정에 따라 약 80~277EB. 2030년은 TLC 약 540~1,200EB 중 등급상 후보 약 400~1,140EB, 전환 가능 몫 약 120~800EB. 범위가 넓은 주된 이유는 (i) 2030 총량 1.8배 차, (ii) 2030 QLC 기준 비중 미공개, (iii) 성능 필터 비율 데이터 부재다.

### 7-3. 금액 환산과 공급사 웨이퍼당 산술

| 항목 | 산식 | 값 |
|---|---|---|
| 100EB(= 1억 TB)의 매출 규모, 정상가 | TLC $115/TB · QLC $92/TB(3Q25, QM §3.3) | TLC $11.5B · QLC $9.2B → 구매자 절감 $2.3B/100EB |
| 100EB의 매출 규모, 쇼티지가 | TLC $753/TB · QLC $603/TB(3Q26) | TLC $75.3B · QLC $60.3B → 구매자 절감 $15.0B/100EB |
| 같은 세대 비트 밀도비 r(QLC/TLC) | 22.9 ÷ 18.3(TQ-30 · TQ-29) ~ 4/3(이론) | 약 1.25 ~ 1.33 |
| 다이 수준 비트당 원가비 | 1 ÷ r (웨이퍼 원가 동일 가정) | 약 0.80 ~ 0.75 (DP8 C-11의 25% 상한과 정합, 드라이브 수준은 C-14로 더 작음) |
| 가격비 p(QLC/TLC $/TB) | VDURA 3개 분기(QM §3.3, TQ-28) | 0.80 ~ 0.87 |
| 웨이퍼당 매출비(QLC/TLC) | r × p | 1.25 × 0.80 = **1.00** ~ 1.33 × 0.87 = **1.16** |
| 웨이퍼당 매출총이익 차이 | QLC 이익 − TLC 이익 = (r × p − 1) × TLC 웨이퍼당 매출 (웨이퍼 원가 동일 가정이면 원가 수준과 무관) | **TLC 웨이퍼당 매출의 0% ~ +16%** |

- 위 산술의 가정: 웨이퍼 원가 동일(실제로는 QLC 수율 · ECC · 테스트 시간 차이 미반영), 다이 밀도비를 드라이브 $/TB에 그대로 적용(컨트롤러 · DRAM 공통 원가 미반영), VDURA 가격비가 실거래가를 대표(DP8 2-A에서 모델링 가정 의심).

## 8. 충돌·한계

1. **정의 불일치**: TF-05는 eSSD **용량** 비중, FI 계열(TQ-12~TQ-15)은 **출하 대수 · 배치** 비중, SK hynix(TQ-01)는 **PCIe eSSD**, McKinsey는 eSSD, SanDisk는 "enterprise data center flash TAM", Omdia(TQ-02)는 **NAND 전체**다. 7장은 이들을 곱했으므로 정의 오차가 누적된다. 대용량 드라이브가 RI에 몰려 있다면 비트 기준 RI 비중은 대수 기준보다 높을 수 있으나 확인 자료 없음.
2. **2027 이후 QLC 비중 충돌**: TrendForce eSSD 38%(2027), Omdia NAND 46.4%(2027, 2024년 전망), DigiTimes "QLC > TLC 2027", SanDisk "TLC dominant 2030"(⚠️ 미재확인), Mordor "QLC 약 1/5(2031)". 방향(상승)은 다수가 일치하나 수준은 크게 다르다.
3. **대체 대상**: 공개된 QLC 채택 사례 다수가 HDD 대체(TQ-08, TQ-36, TQ-37)이며, TLC 대체를 수치로 밝힌 사례는 없다. "TLC → QLC" 전환 증거는 정성(TQ-06, TQ-07, TQ-35)에 그친다.
4. **반대 방향 증거**: TLC가 QLC 용량점 · 가격점으로 내려온 사례(TQ-32 6500 ION "QLC 가격", TQ-42 6550 ION 61.44TB TLC), AI 스토리지 업체의 TLC + eTLC 혼합(TQ-25), 2026년 하이퍼스케일용 1 DWPD TLC 신제품(TQ-19), 삼성의 고성능 TLC 수요 언급(TQ-10).
5. **RI 비중의 시점 · 출처**: 75%(2017) → 80%(2019) → 91%(현재) → 99%(2028)는 모두 FI 원문 미확인 벤더 재인용이며, 91% · 99%는 QLC 판매 업체(DapuStor)가 인용했다. Solidigm 85%는 부등호 방향이 불명(TQ-16).
6. **정격과 소비의 차이**: "RI = 정격 1 DWPD"인 TLC 다수가 실제로는 0.1~0.4 DWPD를 쓴다(DW CU-13a · CU-15). 반대로 QLC 정격은 4K 랜덤 기준 0.075~0.3으로 같은 RI 표기라도 TLC 1 DWPD와 동급이 아니다(TQ-41, TQ-42).
7. **가격**: QLC/TLC 실거래 계약가 분리 공개 없음(DP8 C-01). VDURA 2Q26 비율도 0.800으로 모델링 가정 의심이 지속된다.
8. **2026 총량**: SK hynix 509EB 외에는 2026 eSSD EB 절대치가 공개되지 않아 성장률 역산(TF-01, AI-27)으로 범위를 만들었다.

## 9. 미확보 (찾지 못함)

1. eSSD의 **TLC/QLC별 EB 절대치와 매출 분할** 2022~2026 시계열 및 2028 · 2030 전망(TrendForce 유료 Enterprise SSD Datasheet, Forward Insights, Gartner, IDC, Yole 모두 공개 범위에 없음).
2. eSSD의 **내구성 등급별(RI · MU · WI) 비트 · 매출 분할**, "TLC eSSD 중 RI 비중" 직접 수치.
3. 기관별 2028 · 2030년 **eSSD 내 QLC 비중** 수치(TrendForce는 2027까지, Omdia는 NAND 전체 2027까지).
4. TrendForce · DRAMeXchange의 **QLC 대 TLC eSSD 계약가 $/TB**, 동일 노드 **웨이퍼 원가 차이** 실측.
5. **Google · AWS · Microsoft · Oracle**의 QLC 채택 공식 수치(검색 결과 없음), Meta QLC EB 규모, Alibaba CSAL 총 EB.
6. NVIDIA DGX SuperPOD · AI Data Platform · STX의 **드라이브 DWPD · NAND 종류 요구 조건** 공개 문서, WEKA NeuralMesh의 QLC 지원 여부, DDN AI400X3 용량점별 TLC/QLC 구분.
7. AI 스토리지(학습 · 추론 · 데이터 레이크) EB 중 **TLC/QLC 분할**, GW당 TLC/QLC 비율.
8. "QLC 전환을 막는 사유별 비중"(쓰기 대역 · 꼬리 지연 · 내구성 · 가격 · 공급)을 정량화한 고객 설문 · 분석.
9. SanDisk Investor Day 2026의 TLC/QLC 2030 비중 슬라이드 원문(TQ-04 재확인 필요).
