# 온프렘 · 소버린 AI 수요와 Confidential Storage 기술 · 협력 요소 원장 (수요 전망 · 보안 설문 · 모델 가중치 보안 · 기밀 컴퓨팅 · SSD 보안 표준 현황)

**수집일**: 2026-10-10
**유형**: 웹 팩트 원장 (Research Agent, 해석 없음. 산술은 §7에 ⚠️로 분리)
**용도**: 사용자 주장의 사실 근거와 반증 수집. 사용자 주장(2026-10-10): "AI 엔터프라이즈 서비스가 온프렘(프라이빗 · 소버린) 데이터센터로 들어오려면 LLM 모델 파라미터(가중치)와 기업 데이터가 둘 다 보호돼야 한다. 이 수요는 얼마나 커질까? 'Confidential Storage' SSD(RoT/Caliptra, 암호화 · 키 관리, 증명 SPDM, 기밀 VM 연결 TDISP/TEE-IO, OCP L.O.C.K.)에는 어떤 고객 협력과 기술 요소가 필요한가?" 위키 연결: [ssd-core-technologies-customer-collaboration.md](../../wiki/concepts/ssd-core-technologies-customer-collaboration.md) 6번 Confidential Storage.
**기존 원장과의 관계**: Caliptra · L.O.C.K. · S.A.F.E. · SPDM · TDISP · PM1763 기본 사실은 [ssd-future-candidate-security-trust-2026-10.md](ssd-future-candidate-security-trust-2026-10.md)의 **보안원장 ST-xx**로만 참조하고 다시 수집하지 않았다(§5 끝 참조표). eSSD 수요 전망은 [essd-outlook-research-firms-2026-10.md](essd-outlook-research-firms-2026-10.md), 소버린 DC를 신규 고객으로 언급한 WD 발언은 [essd-demand-by-application-2030-2026-10.md](essd-demand-by-application-2030-2026-10.md) NA-23. [gartner-captive-nvme-ssd-forecast-2026-08.md](gartner-captive-nvme-ssd-forecast-2026-08.md)에는 "온프레미스 스토리지의 captive NVMe 비중" 외에 소버린 · 기밀 관련 내용이 없다.
**접근 한계**: 이번 세션 프록시가 idc.com · gartner.com · mckinsey.com · nvidia.com(investor · docs · developer 포함) · dell.com · hpe.com · amd.com · intel.com · rand.org · openai.com · cohere.com · mistral.ai · menlovc.com · a16z.com · everestgrp.com · linuxfoundation.org · confidentialcomputing.io · huggingface.co · sec.gov · businesswire.com · storagereview.com · blocksandfiles.com · theregister.com · assets.anthropic.com 등을 모두 막았다. **직접 열람이 된 곳은 `cloud.google.com`(블로그), `www.anthropic.com`, `raw.githubusercontent.com`(CHIPS Alliance Caliptra 저장소, Linux 커널 master)뿐**이다.
**등급**: ✅ = 이 세션에서 1차 원문을 직접 열람 / 🟡 = 검색 스니펫 · 2차 매체 · 재보도(1차 출처라도 원문을 못 연 경우 포함) / ⚠️ = 출처 간 충돌 · 벤더 후원 조사 · 파생 산술

**ID 네임스페이스**: `CS-xx` = Confidential Storage 수요 원장. 번호대: CS-01~19 수요 성장 / CS-20~39 왜(설문 · 규제) / CS-40~59 모델 가중치 보안 / CS-60~69 기밀 컴퓨팅 시장 · 채택 / CS-70~89 스토리지 측 기술 요소 / CS-90~99 고객 협력 / CS-D01~ 파생.

---

## §1. 수요 성장: 온프렘 · 프라이빗 · 소버린 AI 인프라

### 1-A. 기관 전망 (2028~2030)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-01 | McKinsey: 소버니티 요건이 2030년 **전 세계 AI 지출의 30~40%**를 좌우. 소버린 AI 시장 **2025년 약 $150~200B → 2030년 $500~600B**. 세부: 애플리케이션 $30~40B → $150~180B, 모델 · 데이터 · 툴링 $6~8B → $100~140B, **컴퓨트 수요는 연 약 12%로 훨씬 느리게 성장** | $ · % | McKinsey "Sovereign AI: building ecosystems for strategic resilience and impact" (2차 보도, 2026) | https://observatorioglobal.udlap.mx/sovereign-ai-building-ecosystems-for-strategic-resilience-and-impact/ ; https://agendadigitale.eu/industry-4-0/sovereign-ai-perche-le-imprese-italiane-devono-decidere-ora | 🟡 원문 미열람 |
| CS-02 | Gartner: **전 세계 소버린 클라우드 IaaS 지출 2026년 약 $80B(전년 대비 약 +36%)**, 표 1의 2027년 약 **$110.6B**. 지역: **중국 약 $47B**, 북미 약 $16B, 유럽이 2027년 북미 추월. 주 구매자 정부 → 규제 산업 → 핵심 인프라. 현 워크로드의 약 20%가 글로벌 → 로컬 사업자로 이동(geopatriation) | $ | Gartner 보도자료 2026-02-09 | https://www.gartner.com/en/newsroom/press-releases/2026-02-09-gartner-says-worldwide-sovereign-cloud-iaas-spending-will-total-us-dollars-80-billion-in-2026 | 🟡 |
| CS-03 | Gartner: "By 2028, more than **20% of enterprises** will run AI workloads (training or inference) **locally in their data centers**, an increase from approximately **2%** as of early 2025" (리포트 "How to Determine Infrastructure Requirements for On-Premises Generative AI") | % | Gartner 2025-03 (DDN 블로그 인용) | https://www.ddn.com/blog/the-ai-infrastructure-revolution-why-modern-data-and-compute-drive-ai-success/ | 🟡 2차 인용 |
| CS-04 | Gartner: 2028년까지 **정부의 65%**가 기술 소버니티 요건 도입. 소버린 AI 스택을 세우는 국가는 2029년까지 **GDP의 1% 이상**을 AI 인프라에 지출해야 함. 2027년 국가의 35%가 지역 특화 AI 플랫폼에 고착(5%에서). 2025 하이프 사이클에서 sovereign AI는 기대 정점 | % | Gartner 2025~2026 (IT Brief · IT-Online 보도) | https://itbrief.news/story/gartner-warns-of-rising-lock-in-to-regional-ai-stacks | 🟡 |
| CS-05 | IDC: 전 세계 AI 인프라 지출 **2029년 $758B**, 가속 서버가 94.3%. 2Q25 기준 **클라우드 · 공유 환경 배치가 AI 지출의 84.1%**, 하이퍼스케일러 · CSP · 디지털 서비스 사업자가 86.7%. 전통 기업은 온프렘 AI 인프라 도입에서 뒤처짐(2024 IDC 발표) | $ · % | IDC 보도자료 2025-10-28 | https://www.idc.com/resource-center/press-releases/artificial-intelligence-infrastructure-spending-to-reach-758bn-usd-mark-by-2029-according-to-idc/ | 🟡 |
| CS-06 | Intersect360: AI 인프라 연간 지출 2030년 $500B 초과, **소버린 세그먼트는 작게 시작하지만 전망 기간 성장률 최고**(소버린 절대치는 공개 안 됨) | $ | Intersect360 2026-06 | https://www.datacenterfrontier.com/press-releases/press-release/55384998/ai-infrastructure-market-grew-60-in-2025-forecast-to-exceed-520b-by-2030 | 🟡 |
| CS-07 | Deloitte TMT Predictions 2026: 소버린 AI 컴퓨트 구축에 **$100B 이상 약정** 전망, 2026년 추론이 AI 컴퓨트의 2/3 | $ | Deloitte 2026 (추적 사이트 "data not yet validated" 표기) | https://www.envisioning.com/hindsight/deloitte/tmt-predictions/2026 | 🟡 ⚠️ 미검증 |

### 1-B. 공급사 실적 (실측 수요 신호)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-08 | NVIDIA CFO Kress(4Q FY26 콜): **FY2026 소버린 AI 매출이 전년 대비 3배 이상, $30B 초과**. 주요 기여국 캐나다 · 프랑스 · 네덜란드 · 싱가포르 · 영국. "countries spend on AI in proportion to their GDP"이므로 소버린 사업이 AI 인프라 시장과 최소 같은 속도로 성장 기대 | $ | NVIDIA 4Q FY26 콜 2026-02-25 | https://finance.yahoo.com/news/nvidia-earnings-call-nvidias-ai-112000659.html ; https://transcripts.platformaeronaut.com/transcripts/NVDA-4Q26-transcript | 🟡 |
| CS-09 | NVIDIA 2Q FY27: 매출 $96.2B(+106%), 데이터센터 $89.0B. 데이터센터를 **Hyperscale $48.7B**와 **ACIE(AI Clouds, Industrial & Enterprise) $40.3B(+138% YoY, +25% QoQ)**로 분리 공시. **소버린은 "35% QoQ" 성장으로 보도되나 YoY 배수는 "3배 이상"(Webull) 대 "2배 이상"(Cryptobriefing)으로 충돌** | $ · % | NVIDIA 2Q FY27 2026-08-26 | https://finviz.com/news/385939/nvidia-announces-financial-results-for-second-quarter-fiscal-2027 ; https://www.webull.com/news/15497781742806016 ; https://cryptobriefing.com/nvidia-cfo-sovereign-ai-business-doubles-yoy/ | 🟡 · YoY ⚠️ 충돌 |
| CS-10 | Dell FQ2'27(7월 말 마감): **AI 서버 주문 $60.9B(분기 사상 최대)**, AI 서버 매출 $16.4B, **AI 서버 백로그 $95B**, 총매출 $47.0B(+58%). **Dell AI Factory 고객 6,500개 이상, 최근 3개 분기에 3,300개 추가**(FY26 말 4,000개 이상). 고객군은 네오클라우드 · 소버린 정부 · 전통 기업을 포괄하나 **비중 공시 없음**. 공급 제약(DRAM · NAND) 언급. FY27 매출 가이던스는 $192B 보도와 다른 수치 보도가 충돌 | $ · 개 | Dell 실적 2026-09-01 (Futurum · Zacks · Cryptobriefing 보도) | https://futurumgroup.com/insights/dell-technologies-q2-fy-2027-ai-orders-fuel-server-and-storage-growth/ ; https://cryptobriefing.com/dell-customer-count-surpasses-6500-ai-demand/ | 🟡 · 가이던스 ⚠️ |
| CS-11 | HPE FQ3'26: 매출 $12.2B(+34%), **AI 시스템 신규 주문 $2.4B, AI 시스템 백로그 $5.9B → $6.8B**(AI 네트워킹 포함 총 AI 백로그 $7.6B). 경영진: 시작 백로그 $5.9B는 **"primarily enterprise and sovereign"**. Neri: "There is no incremental supply in 2026 at this point in time unless somebody cancels something", 메모리 제약 2027년까지 | $ | HPE FQ3'26 2026-09-02 | https://www.nasdaq.com/articles/hewlett-packard-enterprise-q3-earnings-call-highlights ; https://cryptobriefing.com/hpe-ai-backlog-memory-supply/ | 🟡 |
| CS-12 | 한국: NVIDIA가 2025-10-31(APEC 경주) GPU **최대 26만 개** 공급 발표. 배분 삼성 5만(AI 팩토리) · SK 5만 · 현대차 5만 · 네이버클라우드 6만 · 정부(국가AI컴퓨팅센터 · 소버린 모델) 5만 | 개 | Korea Times 2025-10-31 | https://www.koreatimes.co.kr/amp/business/tech-science/20251031/nvidia-to-supply-260000-chips-to-korea-for-ai-factories-with-samsung-sk-hyundai | 🟡 |
| CS-13 | EU: AI 기가팩토리 공모 **2026-07-30 개시**, 최대 7곳 · 각 AI 프로세서 **10만 개 초과**, 공공 €10B(EU 절반 · 회원국 절반) + 민간 €20B 기대, 접수 마감 2026-11-12, 선정 2027년 초, 첫 가동 2028년 중반. InvestAI 총 €200B(2030년까지 동원) 우산 | € · 개 | EuroHPC 공모 보도 2026-07~08 | https://pasqualepillitteri.it/en/news/9162/eu-call-seven-ai-gigafactories-30-billion ; https://oecd.ai/en/dashboards/policy-initiatives/investai | 🟡 · 일정 ⚠️ 보도 간 상이 |
| CS-14 | Microsoft: **Azure Local 연결 끊김(disconnected) 운영 · Microsoft 365 Local 연결 끊김 GA**(전 세계), **Foundry Local로 대형 멀티모달 모델을 고객 HW(NVIDIA 등)에서 외부 연결 없이 추론**, 단 대형 모델은 "qualified customers" 한정. Microsoft 365 Local 지원 최소 2035년까지 | 정성 | Microsoft 2026-02-24 | https://blogs.microsoft.com/blog/2026/02/24/microsoft-sovereign-cloud-adds-governance-productivity-and-support-for-large-ai-models-securely-running-even-when-completely-disconnected/ | 🟡 (도메인 차단) |
| CS-15 | Google: **Gemini on Google Distributed Cloud(GDC) air-gapped GA**, connected는 프리뷰. GDC는 NVIDIA Hopper · Blackwell 사용. "Confidential Computing support for both CPUs (with Intel TDX) and GPUs (with NVIDIA's confidential computing) to secure sensitive data and prevent tampering or exfiltration". 고객 언급: 싱가포르 CSIT · GovTech · HTX, KDDI, Liquid C2. GDC air-gapped는 미국 정부 Secret · Top Secret 인가 | 정성 | Google Cloud 블로그 2025-08-28 (2025-04-09 발표: 프리뷰 Q3 2025, Dell 공급 DGX/HGX B200) | https://cloud.google.com/blog/topics/hybrid-cloud/gemini-is-now-available-anywhere ; https://cloud.google.com/blog/products/ai-machine-learning/run-gemini-and-ai-on-prem-with-google-distributed-cloud | ✅ |
| CS-16 | Mistral: Microsoft와 수십억 달러 계약(2026-07), Mistral 모델을 **Azure 클라우드 · 고객 통제 Azure Local · 완전 연결 끊김 온프렘** 3환경에 배포. Mistral 엔터프라이즈 매출은 프라이빗 · 온프렘 배포 중심(Docker 이미지로 로컬 GPU 클러스터, 연간 라이선스), ARR 약 $400M(2026-01, Sacra 추정), 2030년까지 최대 1GW 목표. Dell 온프렘 스택을 학습 · 배포에 사용 | $ · 정성 | Sacra 2026 ; Futurum 2026-07 | https://sacra.com/research/400m-year-napoleon-of-sovereign-ai/ ; https://futurumgroup.com/?p=93412 | 🟡 |
| CS-17 | Cohere North: 온프렘 · 하이브리드 · VPC · **air-gapped** 배포, "as few as two GPUs", Cohere는 고객 데이터를 보지 않음. Carahsoft 공공 유통(2026-07), FedRAMP High(2026-05) | 정성 | TechCrunch 2025-08-06 ; HPCwire 2026-07-30 | https://techcrunch.com/2025/08/06/coheres-new-ai-agent-platform-north-promises-to-keep-enterprise-data-secure/ ; https://www.hpcwire.com/aiwire/2026/07/30/cohere-and-carahsoft-partner-to-bring-secure-sovereign-ai-deployment-solutions-to-public-sector/ | 🟡 |
| CS-18 | OpenAI for Countries: 국가 내 DC 구축 지원, 첫 사례 Stargate UAE 1GW(2026년 200MW 가동). **가중치 취급 · 기밀 컴퓨팅 언급은 확인 못함** | GW | OpenAI 2025~2026 | https://openai.com/global-affairs/openai-for-countries/ | 🟡 |

---

## §2. 왜: 보안 · 프라이버시 · 소버니티가 장벽 또는 동인이라는 설문 · 규제

### 2-A. 설문 (대부분 벤더 후원, 정의가 서로 다름)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-20 | Broadcom Private Cloud Outlook 2026(8개국 IT 리더 1,800명, 1,000인+ 기업): **프로덕션 AI 추론을 프라이빗 클라우드에서 운영 · 계획 56%** 대 퍼블릭 41%(전년 거의 동률에서 역전), 퍼블릭 클라우드 추론 사용 -15%p. **데이터 소버니티 · 레지던시 요건 54%**가 인프라 결정의 1위 지정학 요인(관할 특화 규제 51% 추월). 퍼블릭 클라우드 최대 우려는 **비용(31%)이 보안을 추월**(2025년 26%). 워크로드 리패트리에이션 검토 83%, 실행 50% | % | Broadcom 2026-06 | https://news.broadcom.com/releases/broadcom-private-cloud-outlook-2026 ; https://storagereview.com/news/broadcom-2026-survey-cost-overtakes-security-as-top-public-cloud-concern | 🟡 ⚠️ 벤더 후원 |
| CS-21 | IDC(Broadcom 후원, 2025 데이터, 2026-07 발행): 조직 AI 워크로드의 평균 **49.9%가 온프렘 · 프라이빗 클라우드**에서 실행. 최근 12개월 퍼블릭 → 온프렘 이동 워크로드 17.6%, 리패트리에이션 1위 동인 AI 통합. **전면 철수 계획은 8~9%**(IDC 2024-10 조사 8%) | % | IDC 2026-07 | https://www.vmware.com/docs/SSPC-as-Engine-for-AI-and-App-Innovation ; https://campustechnology.com/articles/2026/08/18/survey-organizations-moving-ai-workloads-away-from-public-cloud.aspx | 🟡 ⚠️ 벤더 후원 |
| CS-22 | Cloudian(IT 의사결정자 203명, 2026-02): 민감 데이터가 들어간 AI 배포 시 **91%가 온프렘 · 프라이빗 · 하이브리드 선택**, **58%가 데이터 레지던시 우려로 AI 과제를 지연 · 축소**, 섀도 AI 우려 74%, 데이터 소버니티가 온프렘 채택 1위 동인 | % | Cloudian 2026-03-11 | https://www.storagenewsletter.com/2026/03/11/enterprise-survey-finds-93-are-repatriating-ai-workloads-or-evaluating-a-move-away-from-public-cloud/ | 🟡 ⚠️ 온프렘 스토리지 벤더 |
| CS-23 | Arqit/Intel(MWC 2026): **62%가 데이터 소버니티 · 프라이버시 위험을 퍼블릭 클라우드 AI 과제 지연의 최대 요인**으로 꼽음 | % | 2026-03 | https://www.nasdaq.com/press-release/62-respondents-cite-data-sovereignty-and-privacy-risks-biggest-factor-slowing-ai | 🟡 ⚠️ 벤더 |
| CS-24 | NTT DATA 2026 Global AI Report: AI 리더 약 **60%가 국경 간 데이터 제한을 주요 과제**로, 클라우드 보안 태세에 높은 확신은 38%뿐 | % | NTT DATA 2026 | https://www.nttdata.com/en-us/news/2026/enterprise-ai-hits-the-wall-ntt-data-research-reveals-growing-privacy-and-sovereignty-barriers | 🟡 |
| CS-25 | Gartner 폴(2024-02): **42%가 데이터 프라이버시를 IT 리더가 가장 걱정하는 GenAI 위험**으로 응답. Gartner 디지털 워크플레이스 조사(2024): 데이터 보안 · 거버넌스 우려로 57%가 GenAI 배포를 저위험 사용자로 제한, 40%가 3개월 이상 지연 | % | Gartner 2024 (초록 · AvePoint 인용) | https://www.gartner.com/en/documents/5211463 ; https://www.avepoint.com/ebooks/gartner-secure-and-govern-copilot-at-scale | 🟡 |
| CS-26 | Cobalt State of LLM Security 2025: GenAI 배포 우려 1위 민감 정보 노출 46%, **모델 오염 · 탈취 42%**, 학습 데이터 유출 37% | % | Cobalt 2025 | https://www.dreamfactory.com/hub/on-premise-llm-deployment-statistics | 🟡 2차 집계 |
| CS-27 | Barclays CIO Survey: 워크로드를 프라이빗 클라우드 · 온프렘으로 **리패트리에이션 계획 83%**(2021년 43%), 일부 보도는 Q4 2024 조사 86%. **의향 지표**이며 실제 이전 비중 아님 | % | Barclays 2024 (2차 보도) | https://www.eetimes.eu/?p=39075 ; https://www.softwareseni.com/cloud-repatriation-reality-check-and-the-return-of-the-internal-service-provider/ | 🟡 ⚠️ 83 대 86 충돌 |
| CS-28 | Flexera State of the Cloud 2026(750명+): 최대 과제 **클라우드 비용 관리 85%**, GenAI 사용 81%(2025 72%), 낭비 지출 29%. **2026년판 보안 비율은 확인 못함** | % | Flexera 2026-03-18 | https://www.flexera.com/about-us/press-center/flexera-finds-cloud-value-is-rising-while-ai-waste-grows | 🟡 |

### 2-B. 규제 동인

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-30 | EU AI Act Digital Omnibus: 고위험 의무 연기, **Annex III 단독 시스템 2027-12-02, Annex I 내장 시스템 2028-08-02**. 의회 승인 2026-06-16, 이사회 2026-06-29. **Article 50 투명성 · GPAI 집행권한은 2026-08-02 유지**. GPAI 의무 자체의 2025-08-02 개시는 이번 검색에서 확인 못함 | 일자 | Gibson Dunn · Sidley 2026-05~06 | https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines/ ; https://datamatters.sidley.com/2026/06/22/eu-lawmakers-reach-provisional-agreement-to-delay-key-eu-ai-act-obligations/ | 🟡 |
| CS-31 | EU DORA: **2025-01-17부터 직접 적용**, 계약 전 집중 위험 분석 의무. ESA가 2025-11-18 **핵심 ICT 제3자 제공자 19곳 지정**(AWS · Microsoft · Google Cloud 포함) | 일자 · 개 | locaterisk 등 2025~2026 | https://locaterisk.com/en/know/dora-ict-third-party-risk/ | 🟡 |
| CS-32 | 한국 AI 기본법: **본체 2026-01-22 시행**, 고영향 AI(의료 · 금융 신용평가 · 교통 · 원자력 등) 사업자 의무 5종, 국외 사업자 국내 대리인. 과태료 상한 3천만 원, 계도기간 1년 언급(보도마다 다름) | 일자 | Cooley 2026-01-27 | https://www.cooley.com/news/insight/2026/2026-01-27-south-koreas-ai-basic-act-overview-and-key-takeaways | 🟡 |
| CS-33 | EU Cloud Sovereignty Framework · CRA · 중국 CAC Micron 심사 · 중국 SM 알고리즘 의무는 기존 원장에 있음 | - | 보안원장 ST-60 · ST-63 · ST-65 · ST-66 | [ssd-future-candidate-security-trust-2026-10.md](ssd-future-candidate-security-trust-2026-10.md) | 레포 참조 |

---

## §3. 모델 가중치 보안

### 3-A. 위협 모델 · 프런티어 랩 보안 기준

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-40 | RAND "Securing AI Model Weights"(RR-A2849-1, 2024-05): **공격 벡터 38개 · 9범주**, 보안 수준 **SL1~SL5**(기회형 범죄자 → 최고 역량 국가). 약 12개 벡터는 비국가 행위자에겐 비현실적이나 국가 행위자에겐 가능. SL5 Task Force: 현 프런티어 조직 모범 관행은 SL5에 미달 | 개 | RAND 2024-05 | https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2800/RRA2849-1/RAND_RRA2849-1.mobi ; https://securityandtechnology.org/sl5/ | 🟡 원문 미열람 |
| CS-41 | RAND 권고(2차 요약): **SL4 · SL5에 기밀 컴퓨팅 권고**, 가중치가 처리 중에도 암호화되어 클라우드 직원 신뢰나 호스트국 법제에 의존하지 않음. CPU만 TEE이면 GPU 메모리를 읽는 공격자가 가중치 추출 가능. 가중치 사본을 소수의 통제 · 감시 시스템으로 집중, 접근 인원 축소. 후속 RAND SL3 리포트(RR-A4704-1): NIST SP 800-53 기반 통제 262개, 고실현성 공격 벡터 31개, 6~12개월 구현 | 개 | RAND 2024 · 2026-08 (Mercatus 등 2차) | https://www.mercatus.org/media/183496/download ; https://www.rand.org/pubs/research_reports/RRA4704-1.html | 🟡 |
| CS-42 | Anthropic ASL-3(2025-05-22): "The ASL-3 Security Standard involves increased internal security measures that make it harder to **steal model weights**"; "targeted security controls are focused on protecting model weights"; **보안 통제 100개 이상**, 가중치 접근 **2인 승인**, **egress 대역폭 통제**. 주 대상은 정교한 비국가 행위자, 정교한 내부자 위험은 범위 밖 | 개 | Anthropic 2025-05-22 | https://www.anthropic.com/news/activating-asl3-protections | ✅ |
| CS-43 | Anthropic · Pattern Labs(현 Irregular) "Confidential Inference"(2025-06-18): "**Model weights are a simpler story: they can be stored encrypted, decrypted at the loader, and never released from there.**" TPM이 부팅 단계를 측정, "A keyserver can check this proof and only release decryption keys when the recipient has proven itself secure." "**not all accelerators fully support confidential computing yet**", 호스트 암호화 메모리를 가속기와 공유하는 기능이 "aren't well established". 물리 DC · 하이퍼바이저 보안은 컴퓨트 제공자에 의존, 외부 당사자가 독립 키서버를 운영하는 모델 탐색. **고객 인프라 배포 언급 없음** | 정성 | Anthropic 2025-06-18 | https://www.anthropic.com/research/confidential-inference-trusted-vms | ✅ |
| CS-44 | OpenAI "Reimagining secure infrastructure for advanced AI"(2024-05): 6대 보안 조치 중 1번 **AI 가속기용 신뢰 컴퓨팅**, 가중치는 GPU에 로드될 때까지 암호화, 인가된 GPU만 복호화. 신뢰 경계를 "beyond the CPU host and into AI accelerators themselves"로 확장 | 정성 | OpenAI 2024-05 (2차 요약) | https://www.maginative.com/article/openai-calls-for-evolution-in-ai-infrastructure-security/ ; https://www.mercatus.org/research/public-interest-comments/american-ai-exports-program-comments-accelerator-level | 🟡 |

### 3-B. 가중치를 고객 · 온프렘 인프라에 배포하는 구조

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-45 | NVIDIA 용어집: 기밀 컴퓨팅 핵심 용례로 **"protecting model weights and preventing model theft when deploying in third-party environments"**, 모델 소유자에게 자기 소유가 아닌 인프라에서 가중치에 대한 암호학적 보증. **Blackwell = 업계 최초 TEE-I/O 지원 GPU**(NVLink 인라인 보호), 비암호화 모드와 "nearly identical" 처리량(벤더 주장) | 정성 | NVIDIA 상시 페이지 | https://www.nvidia.com/en-us/glossary/confidential-computing/ ; https://docs.nvidia.com/nvidia-secure-ai-with-blackwell-and-hopper-gpus-whitepaper.pdf | 🟡 (도메인 차단) |
| CS-46 | NVIDIA Vera Rubin NVL72: **3세대 기밀 컴퓨팅, 랙 단위 TEE**(Vera CPU 36 · Rubin GPU 72 · NVLink 패브릭), "keeping models, training data, and inference prompts isolated across the entire AI lifecycle", CPU · GPU · NVLink 전 버스 암호화. CES 2026 발표, 파트너 출하 2H26 | 개 | NVIDIA 2026-01 | https://www.nvidia.com/en-us/data-center/technologies/rubin/ ; https://venturebeat.com/security/nvidia-rubin-rack-scale-encryption-enterprise-ai-security | 🟡 |
| CS-47 | Fortanix Confidential AI(2026-03-18): "enables **model developers to securely distribute models for deployment in on-premises AI factories** without the risk of model theft", "proprietary model weights remain encrypted and invisible, even to the infrastructure running them". 가중치 · 코드 · 설정을 **Fortanix DSM(FIPS 140-2 L3 HSM)의 반출 불가 키**로 암호화, **CPU+GPU 복합 증명 성공 시에만 키를 TEE에 방출**, 편차 시 키 회수 · 워크로드 종료. Dell PowerEdge + NVIDIA CC GPU, Cisco Secure AI Factory with NVIDIA(2026-06) 연계 | 정성 | Fortanix 보도자료 2026-03-18 | https://www.fortanix.com/company/pr/2026/03/fortanix-confidential-ai-protects-proprietary-model-ip-and-data-for-secure-ai-inference-in-enterprise-ai-factories | 🟡 벤더 |
| CS-48 | VAST Data **DataEnclave**(2026-09-22): VAST DataEngine 내 기밀 컴퓨팅 런타임(NVIDIA CC 기반), 독점 모델을 민감 데이터와 함께 실행. "일반 암호화는 저장 · 전송 중 가중치를 보호하나 GPU 메모리 실행 시 노출" → 게스트 메모리 · GPU 메모리 · NVLink 암호화. **증명 후 복호화 키 방출, 기업과 모델 빌더가 KMS 연동으로 각자 키 관리**, 증명 서버는 CNCF Trustee 기반, 완전 소버린 배포엔 Fortanix 대안. 고객 DC · air-gapped 가능, OEM Cisco · Supermicro, **프리뷰, GA 2027 Q1** | 일정 | VAST 2026-09-22 (Blocks & Files · NAND Research) | https://www.blocksandfiles.com/ai-ml/2026/09/22/vasts-dataenclave-protects-private-enterprise-data-and-ai-model-builders-weights/5298161 ; https://nand-research.com/?p=5939 | 🟡 |
| CS-49 | Google Confidential G4(2026-06-23): **RTX PRO 6000 Blackwell + AMD Turin SEV 기밀 VM**, G4가 있는 모든 리전, "use cases involving highly restricted data, **sensitive models**, or private prompts". Confidential Space의 Hopper GPU 지원 GA, **Intel Trust Authority를 독립 증명 검증자로 GA**("before encryption keys are released to workloads"). C4 TDX 프리뷰 예정. Apple PCC on Google Cloud 언급. **TDISP · 스토리지 · 디스크 암호화 언급 없음** | 정성 | Google Cloud 블로그 2026-06-23 | https://cloud.google.com/blog/products/identity-security/verifiable-trust-in-the-ai-era-whats-new-in-confidential-computing | ✅ |
| CS-50 | Meta WhatsApp Private Processing: **AMD SEV-SNP 기밀 VM + NVIDIA H100 CC 모드**, Meta도 메시지 접근 불가 주장, OHTTP 릴레이, 상태 비저장, CVM 바이너리 다이제스트 공개 약속 | 정성 | Meta 2025-04 (보도) | https://thehackernews.com/2025/04/whatsapp-launches-private-processing-to.html | 🟡 |
| CS-51 | Anthropic: Claude 가중치를 고객 온프렘에 배포하는 공식 제공은 **확인 못함**(2026-06 서드파티 블로그: 가중치 비공개, 오프라인 추론 불가). Claude Code 자체 호스팅 환경 베타는 에이전트 실행 위치이지 모델 위치 아님(단일 2차 출처) | 정성 | 2026 2차 | https://aithinkerlab.com/?p=3610 | 🟡 ⚠️ 부재 확인 수준 |

### 3-C. 가중치 크기 · SSD 위치

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-52 | Llama 3.1 405B: **FP16 약 812GB, FP8 약 406GB, INT4 약 203GB**(별도 비교 페이지 bf16 약 810GB, 최소 H100 8장) | GB | 참조 페이지 2025~2026 | https://gpuperhour.com/reference/llm-gpu-requirements ; https://www.llmreference.com/compare/llama3.1-405b/deepseek-v3 | 🟡 |
| CS-53 | DeepSeek-V3 계열: 원본 FP8, V3-Base 685B 체크포인트 **디스크 687.9GB**(Simon Willison), BF16 약 1.3TB, 4비트 GGUF 약 377GB. Mozilla.ai의 "BF16 변환 시 2.5TB"는 다른 수치와 충돌 | GB · TB | 2024-12 ~ 2025 | https://feeds.simonwillison.net/2024/Dec/?page=5 ; https://blog.mozilla.ai/deploying-deepseek-v3-on-kubernetes/ | 🟡 · 2.5TB ⚠️ |
| CS-54 | 가중치는 스토리지에서 GPU로 적재: NVIDIA Run:ai Model Streamer가 **스토리지에서 가중치를 동시 읽기해 GPU 메모리로 스트리밍**(로컬 SSD · S3 비교, 최대 6배 단축, NVIDIA 벤치). 벤더 추정: 70B 모델 로드 약 40~45초, 로컬 NVMe 3GB/s+ 필요. WEKA는 로컬 NVMe 대비 약 40% 빠르다고 주장 | 초 · 배 | NVIDIA 개발자 블로그 · 벤더 2025~2026 | https://developer.nvidia.com/blog/reducing-cold-start-latency-for-llm-inference-with-nvidia-runai-model-streamer ; https://www.spheron.network/blog/gpu-cold-start-llm-inference-2026/ | 🟡 |
| CS-55 | KV 캐시 · 컨텍스트 메모리도 SSD 계층으로 이동(NVIDIA CMX GPU당 16TB 등) | TB | 레포 OT-10 · TF-22 | [essd-outlook-research-firms-2026-10.md](essd-outlook-research-firms-2026-10.md) | 레포 참조 |

---

## §4. 기밀 컴퓨팅 시장 규모 · 채택

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-60 | Gartner 2026 10대 전략 기술 트렌드 6위 기밀 컴퓨팅: "By 2029, **more than 75% of operations processed in untrusted infrastructure will be secured in-use by confidential computing**". 규제 산업 · 지정학 · 컴플라이언스 위험에 특히 가치 | % | Gartner 2025-10-20 | https://www.businesswire.com/news/home/20251020453550/en/Gartner-Identifies-the-Top-Strategic-Technology-Trends-for-2026 | 🟡 |
| CS-61 | IDC(CCC 의뢰, 2025-07 IT 리더 600명): **75%가 기밀 컴퓨팅 사용 중(프로덕션 18% · 파일럿 57%)**, 이점 데이터 무결성 88% · 기밀성 보장 73% · 규제 준수 68%, **장벽 1위 증명(attestation) 검증 84%**, 틈새 인식 77%, 기술 격차 75% | % | Linux Foundation · CCC 2025-12-03 | https://www.linuxfoundation.org/press/new-study-finds-confidential-computing-emerging-as-a-strategic-imperative-for-secure-ai-and-data-collaboration ; https://confidentialcomputing.io/wp-content/uploads/sites/10/2025/11/US53866125.pdf | 🟡 |
| CS-62 | Everest Group(2021, CCC 의뢰): 기밀 컴퓨팅 시장 **2026년 $54B**, CAGR 최선 90~95% · 최악 40~45%, 수요 75% 이상 금융 · 의료 등 규제 산업. **2021년 전망이며 갱신판 확인 못함** | $ | Everest 2021-10 | https://www.everestgrp.com/in-the-news/confidential-computing-market-to-reach-54-billion-in-2026-in-the-news.html | 🟡 ⚠️ 낡음 |
| CS-63 | MarketsandMarkets: **$5.3B(2023) → $59.4B(2028), CAGR 62.1%** | $ | MarketsandMarkets | https://marketsandmarkets.com/ResearchInsight/size-and-share-of-confidential-computing-market.asp | 🟡 |
| CS-64 | Market Glass(구 GIA): **$10.0B(2024) → $150.6B(2030), CAGR 57.1%**. Technavio: 2025~2030 +$16.88B, CAGR 28.4% | $ | 2025~2026 | https://m.giikorea.co.kr/report/go1779846-confidential-computing.html ; https://www.giikorea.co.kr/report/infi2126217-global-confidential-computing-market.html | 🟡 ⚠️ 기관 간 편차 큼 |

---

## §5. 스토리지 측 보안 기술 요소와 현황

### 5-A. 표준 · 사양 상태

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-70 | **OCP L.O.C.K. 버전 이력(사양 원문)**: **1.0 Initial release = 2025-09**, 1.1_RC1~RC3 2026-05, **1.1_RC4 2026-06**. 헤더 `version: TBD` | 일자 | `doc/ocp_lock/lock_spec.ocp` (CHIPS Alliance Caliptra main, 2026-10-10 열람) | https://raw.githubusercontent.com/chipsalliance/Caliptra/main/doc/ocp_lock/lock_spec.ocp | ✅ |
| CS-71 | **L.O.C.K.의 호스트 인터페이스(원문)**: NVMe 전용 아님, **TCG Opal · Enterprise · Key Per I/O** 호환, MEK-MPA Opal 기능 세트 지원. MEK는 (LBA 범위, 네임스페이스 ID) 쌍 또는 KPIO 키 태그로 식별. 위협 모델에 "Executing code within a virtual machine on a **multi-tenant host** offered by the cloud provider which manages an attached storage device" 포함. HEK · SEK 회전 · 호스트 엔트로피 주입은 "beyond the scope" | 정성 | 동상 (§ 범위 · 위협 모델 · host API 매핑표) | 동상 | ✅ |
| CS-72 | **NVMe Key Per I/O(KPIO)**: NVMe + TCG 공동, 호스트가 다수 MEK를 다운로드하고 **명령 단위로 키 지정**. NVMe 2.1(2024-08)에 도입, **NVMe 2.4 Base(2026-08-04 발행)에서 KPIO 공식화**라는 보도(단일 출처) | 일자 | TechTimes 2026-08-05 ; SNIA | https://www.techtimes.com/articles/323099/20260805/nvme-24-closes-post-quantum-protocol-gap-enterprise-ssd-procurement.htm ; https://www.snia.org/educational-library/fine-grain-encryption-using-key-i-o-2023 | 🟡 · 2.4 일자 ⚠️ 단일 출처 |
| CS-73 | **DMTF DSP0286 1.0.0 "SPDM to Storage Binding" 발행 2025-05-15**: SAS · SATA · NVMe(PCIe · Fabrics)에 SPDM 바인딩, MCTP 불필요, **SPDM 1.0~1.4** 지원, PQC 포함(SNIA SDC 2025), SPDM Security Protocol ID 0xE8 | 일자 | DMTF · SNIA SDC25 | https://www.dmtf.org/sites/default/files/standards/documents/DSP0286_1.0.0.pdf ; https://www.snia.org/sites/default/files/2025-09/SNIA-SDC25-Hilland-Henning-Updates-On-SPDM-Specifications.pdf | 🟡 (libspdm 지원은 ST-15 ✅) |
| CS-74 | **Intel TDX Connect** = PCI-SIG **TDISP 1.0**의 CPU 호스트 측 구현(VT-d · TDX 확장). 2025-12 단순화 아키텍처 ABI 사양, 2025-06 GHCI 확장. Intel 지원 문서(2026-02-18 검토) 제목 "Do All Intel Xeon 6 Processors Support TDX Connect?", **출하 SKU 확인 못함** | 일자 | Intel | https://www.intel.com/content/www/us/en/content-details/773614/intel-tdx-connect-architecture-specification.html ; https://www.intel.com/content/www/us/en/support/articles/000101754.html | 🟡 |
| CS-75 | **AMD Trusted I/O(TDISP, 구 SEV-TIO)**: AMD SEV 페이지는 **EPYC 9005(Turin)** 행에 표기. **Venice(EPYC 9006) SEV-TIO TDISP 17개 패치 시리즈**(PCIe 6.0 연계) 2026-09 중순 게시, 리뷰 중 | 일자 | AMD ; Phoronix 2026-09 | https://www.amd.com/en/developer/sev.html ; https://phoronix.com/news/AMD-SEV-TIO-TDISP-Linux-Patches | 🟡 |
| CS-76 | **Linux 메인라인 7.3-rc6**: `drivers/crypto/ccp/Makefile`에 `ccp-$(CONFIG_CRYPTO_DEV_SP_PSP) += sev-dev-tsm.o sev-dev-tio.o`, PSP Kconfig가 `select PCI_TSM if PCI`. 즉 **AMD 호스트 측 SEV-TIO/TSM 코드가 메인라인에 있음**. Intel 쪽 `drivers/virt/coco/tdx-host/Kconfig`는 `TDX_HOST_SERVICES`(FW 로더)만 확인, **TDX Connect 항목은 이 열람에서 확인 못함** | 코드 | torvalds/linux master (2026-10-10 열람) | https://raw.githubusercontent.com/torvalds/linux/master/drivers/crypto/ccp/Makefile ; https://raw.githubusercontent.com/torvalds/linux/master/drivers/crypto/ccp/Kconfig | ✅ (PCI_TSM 자체는 ST-38) |
| CS-77 | **복합 증명(CPU+GPU)**: Intel Trust Authority에 **NVIDIA GPU TEE 원격 증명 추가**(H100 · B200, 온프렘 · 일부 클라우드), "GPU 단독은 완전한 TEE가 아님, CPU 기밀 VM 필요". Microsoft · Intel · NVIDIA의 IETF 초안(TDX CVM + 기밀 GPU 증명 결과 프로필): "relying party is expected to **release secrets only when** the verifier has established that all components ... are bound and trusted". **스토리지 장치를 복합 증명에 넣는 문서는 확인 못함** | 정성 | Intel Trust Authority 문서 2026-04 ; IETF draft | https://docs.trustauthority.intel.com/main/articles/concept-gpu-attestation.html ; https://datatracker.ietf.org/doc/draft-kykdxy-rats-tdx-cgpu-ear-profile/ | 🟡 |

### 5-B. SSD 벤더 지원 현황 (공개 문구 기준)

| ID | 사실 | 값 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-80 | **Samsung PM1763**(PCIe 6.0, 9세대 V-NAND, 4nm 컨트롤러, 4 · 8 · 16TB, 16TB 순차 읽기 28,400MB/s · 쓰기 21,900MB/s): "post-quantum cryptography (PQC) algorithms ... as well as **TEE Device Interface Security Protocol (TDISP)**". 양산 발표 2026-07-08. **SPDM 명시는 이번에도 확인 못함**(보안원장 ST-10 · NG-01과 동일) | 일자 | Samsung 뉴스룸 재게시 2026-07 | https://evertiq.com/news/2026-07-14-samsung-begins-mass-production-of-pm1763-ssd ; https://guru3d.com/story/samsung-pm1763-28-gb-sec-begins-mass-production-of-pcie-60-ssd/ | 🟡 |
| CS-81 | ⭐ **Dell KB: "PowerEdge: Samsung PM9D3a and PM9D5a NVMe SSDs Do Not Support SPDM"** - 이 드라이브에서 SPDM 의존 기능 실패. E3.S PM9D3a RI · PM9D5a MU, U.2 PM9D3a RI의 Dell 부품번호 열거, 17세대 PowerEdge(R7715 등) 페이지에 2026-07-03 갱신으로 게시. **KB 번호 000459691 대 000467282 표기 혼재** | 정성 | Dell KB 2026-07 | https://www.dell.com/support/kbdoc/en-us/000459691/poweredge-samsung-pm93a-and-pm95a-nvme-ssds-do-not-support-spdm?lang=en | 🟡 · ID ⚠️ |
| CS-82 | **Micron 9650**(PCIe Gen6): SPDM 1.2, SED 옵션, Micron SEE, OCP 2.6, FIPS 140-3 L2 · TAA 옵션. **TDISP · Caliptra 언급 없음** | 정성 | Micron 2025-07 (Blocks & Files) | https://blocksandfiles.com/2025/07/30/micron-three-276-layer-ssds/ | 🟡 |
| CS-83 | **Solidigm D7-PS1010**: TCG Opal 2.02, FIPS 140-3 L2, AES-256 XTS, 디바이스 증명(펌웨어 진위) · 보안 부팅. **SPDM 명시 확인 못함** | 정성 | 판매처 · 리뷰 | https://www.avendor.com/products/solidigm-d7-ps1010-series-3-84tb-e3-s-7-5mm-pcie-5-0-x4-v7-tlc-generic-opal ; https://www.storagereview.com/review/solidigm-ps1010-ssd-review | 🟡 |
| CS-84 | Kioxia CM9 · SK hynix PS1012의 SPDM · TDISP · Caliptra 공개 문구: **확인 못함**. 4사(Micron · Kioxia · Solidigm · SK hynix) TDISP SSD 발표 검색 결과 0건 | - | 2026-10-10 검색 | - | 부재 |

### 5-C. 기존 원장 참조 (다시 수집하지 않음)

| 요소 | 보안원장 ID | 요지 |
|---|---|---|
| Caliptra 2.0 범위에 DC SSD 명시 | ST-20 | ✅ |
| Caliptra 로드맵 · 2.1 OCP LOCK 구현 · FIPS 인증서 TBD | ST-22 · ST-25 | ✅ |
| Caliptra 상표 승인 제품 0개 | ST-24 | ✅ |
| L.O.C.K. 기여사 Google · Microsoft · Samsung · Kioxia · Solidigm, Samsung 공저자 | ST-26 | ✅ |
| L.O.C.K. "committed intercept for storage products for Google and Microsoft" | ST-27 | ✅ |
| L.O.C.K. MEK는 드라이브 FW에 비가시, MPK 접근 키는 원격 KMS가 호스트에 노출 없이 전달 | ST-29 · ST-68 | ✅ |
| L.O.C.K. PQ HPKE(ML-KEM-1024 등) | ST-08 | ✅ |
| ScaleFlux FC6116 Caliptra 2.0 컨트롤러, Q4 2026 샘플링 | ST-12 | 🟡 |
| S.A.F.E. 공개 SFR: Kioxia · Micron · SK hynix 있음, Samsung · Solidigm 없음 | ST-33 · ST-34 · ST-82 | ✅ |
| SPDM 탑재 SSD(PM9E1 1.2 · Micron 9550/7600 1.2 · PM1763 1.4 ⚠️), libspdm 1.0.2~1.4.1 · DSP0286 지원 | ST-15 · ST-37 | ✅ / 🟡 |
| Linux PCI_TSM(TDISP)·PCI_IDE 메인라인 | ST-38 | ✅ |
| L.O.C.K. · Common Criteria 충돌로 KPIO 미지원 가능 | ST-73 | ✅ |
| Micron + Microchip Gen6 스토리지 PQC 공동 시연(FMS 2026) | ST-13 | 🟡 |

---

## §6. 필요한 고객 협력 (누가 무엇을 통합하는가)

| ID | 사실 | 협력 주체 | 출처·날짜 | URL | 등급 |
|---|---|---|---|---|---|
| CS-90 | **클라우드 · 하이퍼스케일러 + SSD 벤더 공동 사양**: OCP L.O.C.K.를 Microsoft가 Google · Samsung · Kioxia · Solidigm과 공동 개발, Caliptra 2.1에 구현 | Google · Microsoft · SSD 3사 | 보안원장 ST-25 · ST-26 | [ssd-future-candidate-security-trust-2026-10.md](ssd-future-candidate-security-trust-2026-10.md) | ✅ |
| CS-91 | **OEM BMC + 외부 KMS(KMIP) + SED**: Dell iDRAC **SEKM**(라이선스 기능)이 KMIP 서버(Thales CipherTrust Manager · Luna HSM 등)로 SED 잠금 · 해제, 포트 5696, 직결 NVMe SED 지원 추가. 최초 iDRAC9 FW 3.31.31.31(Gemalto/SafeNet KeySecure) | Dell + Thales + SSD | Dell KB 000177799 ; Thales 솔루션 브리프 2023-04 | https://www.dell.com/support/kbdoc/000177799/idrac9-secure-enterprise-key-manager-sekm-support-enablement ; https://cpl.thalesgroup.com/sites/default/files/content/solution_briefs/field_document/2023-04/thales-ciphertrust-manager-dell-poweredge-sekm-sb.pdf | 🟡 |
| CS-92 | **HPE iLO 7(ProLiant Gen12)**: Opal 준수 장치 SED화, 로컬 또는 원격 마스터 키, **Utimaco ESKM · Thales CipherTrust** 지원, **iLO 6 · 7 전반 KMIP 지원을 2026년까지 도입 예정**(OCP 2025 발표). Utimaco 통합 가이드는 Gen11 기준(2025-12-16) | HPE + Utimaco/Thales + SSD | StorageReview OCP 2025 ; Utimaco 2025-12 | https://www.storagereview.com/news/hpe-sharpens-ilo-7-and-gen12-servers-at-ocp-2025 ; https://integration-guides.utimaco.com/hpe-proliant-and-eskm/1.0.0/product-overview | 🟡 |
| CS-93 | **OEM 자격 인증이 SPDM 기능의 관문**: Dell 17세대 PowerEdge에서 SPDM 미지원 Samsung 드라이브는 SPDM 의존 기능 실패(CS-81) | Dell + SSD 벤더 | CS-81 | 동상 | 🟡 |
| CS-94 | **증명 검증 서비스**: Intel Trust Authority(독립 검증자, Confidential Space GA, NVIDIA GPU 복합 증명), NVIDIA NRAS, VAST 증명 서버(CNCF Trustee), Fortanix DSM(증명 후 키 방출). 기밀 컴퓨팅 장벽 1위가 증명 검증 84%(CS-61) | Intel · NVIDIA · 키 관리 벤더 | CS-47 · CS-48 · CS-49 · CS-61 · CS-77 | 각 ID | ✅ / 🟡 |
| CS-95 | **기밀 VM · 하이퍼바이저 스택**: Linux PCI_TSM + AMD SEV-TIO 호스트 코드(CS-76), Intel TDX Connect(CS-74), Google Confidential G4(AMD SEV + Blackwell, CS-49), Microsoft Azure Local disconnected(CS-14), Meta CVM(CS-50) | CPU 벤더 · 클라우드 · OS | 각 ID | 각 ID | ✅ / 🟡 |
| CS-96 | **AI SW · 모델 소유자**: Fortanix(모델 개발자의 온프렘 배포, Dell · Cisco), VAST DataEnclave(Cisco · Supermicro OEM), Google Gemini on GDC(Dell DGX/HGX B200), Mistral(Dell · Azure Local), Cohere North(Carahsoft), Anthropic(외부 독립 키서버 모델 탐색, CS-43) | 모델 · 플랫폼 벤더 + OEM | CS-15 · CS-16 · CS-17 · CS-43 · CS-47 · CS-48 | 각 ID | ✅ / 🟡 |
| CS-97 | **OCP Global Summit 2026(10-12~15, 산호세)**: L.O.C.K.의 FIPS 정합을 다루는 **Samsung 연사 세션이 10-15 10:05~10:25로 게시**됐다는 검색 요약 1건, 다른 검색에서는 Samsung 세션 미확인. Caliptra 세션(Intel · HPE, AI 워크로드 신뢰) 10-13 | Samsung · OCP | CHIPS Alliance 2026 | https://www.chipsalliance.org/news/ocp-global-2026/ | 🟡 ⚠️ 상충 |
| CS-98 | **SSD 벤더 + 모델 소유자(AI 랩) 공동 개발 공개 사례: 확인 못함.** 공개 사례는 SSD 벤더 + 하이퍼스케일러(L.O.C.K.), SSD 벤더 + 컨트롤러 · 스위치(ST-12 · ST-13), OEM + KMS(CS-91 · CS-92) 조합뿐 | - | 2026-10-10 검색 | - | 부재 |

---

## §7. 파생 계산 (⚠️ 산술, 해석 아님)

| ID | 항목 | 계산 | 값 |
|---|---|---|---|
| CS-D01 | McKinsey 소버린 AI 2025→2030 CAGR(CS-01) | 하단 (500/200)^(1/5) - 1 ; 상단 (600/150)^(1/5) - 1 | **약 20%~32%/년** |
| CS-D02 | Gartner 소버린 클라우드 IaaS(CS-02) | 2025 역산 80/1.36 ; 2027 증가율 110.6/80 - 1 | 2025 약 **$58.8B**, 2026→2027 **+38%** |
| CS-D03 | Gartner 온프렘 AI 기업 비중(CS-03) | 20% / 2% | 2025 초 → 2028 **10배** (3년) |
| CS-D04 | NVIDIA FY26 소버린 비중(CS-08) | $30B / $215.9B(FY26 총매출, Yahoo 기사 수치) | **약 13.9%** (기사도 같은 값). "3배 이상"이므로 FY25 소버린은 **$10B 미만** 함의 |
| CS-D05 | NVIDIA ACIE 비중(CS-09) | 40,313 / 89,023 | 데이터센터의 **약 45.3%** |
| CS-D06 | IDC 2029 AI 인프라 중 비클라우드(CS-05) | 2Q25 비클라우드 15.9%(100 - 84.1)를 2029 $758B에 그대로 적용 | **약 $120B**. ⚠️ 비중 고정 가정, IDC가 제시한 값 아님 |
| CS-D07 | Dell 신규 AI 고객 속도(CS-10) | 3,300 / 3분기 | **분기당 약 1,100개** |
| CS-D08 | 한국 26만 GPU 배분 합(CS-12) | 50k×4 + 60k | 260k (일치) |
| CS-D09 | 기밀 컴퓨팅 CAGR 검산(CS-63 · CS-64) | (59.4/5.3)^(1/5) - 1 ; (150.6/10.0)^(1/6) - 1 | 62.2% · 57.1% (공표치와 일치) |
| CS-D10 | 기밀 컴퓨팅 2026 규모 비교 | MarketsandMarkets 경로 5.3 × 1.621³ (2026) 대 Everest 2021 전망 $54B | 약 **$22.6B 대 $54B**, 약 2.4배 차이 |
| CS-D11 | 가중치 크기(파라미터 × 바이트) | 70B × 2B ; 405B × 2B ; 1T × 1B(FP8) ; 1T × 2B(BF16) | **140GB · 810GB · 1TB · 2TB**. 405B는 CS-52(약 810~812GB)와 일치, 671B FP8 ≈ 671GB는 CS-53(687.9GB, 685B)과 근접 |
| CS-D12 | 학습 체크포인트 크기(참고) | 파라미터 × 16B (혼합정밀 Adam의 통상 경험칙: FP16 가중치 · 기울기 2+2, FP32 마스터 4, Adam 모멘트 4+4) | 405B 약 **6.5TB**, 1T 약 **16TB**. ⚠️ **16B/param은 이번 세션에서 출처 확보 못한 가정** |
| CS-D13 | 단일 SSD 대비 | 1T FP8 가중치 1TB 대 PM1763 최대 16TB(CS-80) | 가중치 1벌은 SSD 1대 용량의 약 1/16. 체크포인트 · 버전 · KV 캐시가 용량을 결정(CS-55) |

---

## §8. 충돌 · 한계

- **수요 규모의 정의가 서로 다르다**: McKinsey "소버린 AI 시장"(앱 · 모델 · 컴퓨트 포함, CS-01), Gartner "소버린 클라우드 IaaS"(CS-02), NVIDIA "소버린 AI 매출"(CS-08), Dell · HPE "AI 백로그"(CS-10 · CS-11)는 합산 · 비교 불가. **온프렘 기업 AI 하드웨어 지출 단독 전망(2028~2030 $)은 공개 자료에서 확보 못함.**
- **McKinsey 내부 신호의 방향**: 소버린 시장은 연 20~32% 성장(CS-D01)하지만 **컴퓨트 수요는 연 약 12%**(CS-01)로 가장 느리다고 보도됨. 하드웨어(스토리지 포함) 비중이 커지는 근거는 아님.
- **클라우드가 여전히 지배적**: IDC 2Q25 AI 지출의 84.1%가 클라우드 · 공유 환경(CS-05), Gartner 기준 2025 초 온프렘 AI 운영 기업 약 2%(CS-03). 반면 IDC(Broadcom 후원)는 AI 워크로드의 49.9%가 온프렘 · 프라이빗(CS-21). **지출 기준과 워크로드 수 기준의 차이**이며, 49.9%와 56%(CS-20) · 91%(CS-22)는 **모두 온프렘 · 프라이빗 인프라 벤더 후원 조사**.
- **"보안이 1위 장벽"의 약화 신호**: Broadcom 2026에서 퍼블릭 클라우드 최대 우려가 비용(31%)으로 보안을 추월(CS-20), Flexera도 비용 85%(CS-28). 반면 소버니티 · 레지던시는 54%(CS-20) · 58%(CS-22) · 62%(CS-23)로 상위. 즉 보도된 동인은 "보안 일반"보다 "소버니티 · 레지던시 · 비용" 쪽.
- **가중치 보호의 위치**: Anthropic(CS-43) · Fortanix(CS-47) · VAST(CS-48) 설계는 **가중치를 드라이브 밖(소프트웨어 · KMS · TEE)에서 암호화한 채 저장하고 TEE 안에서만 복호화**한다고 서술. 이 문서들 중 **SSD 자체 암호화(SED · L.O.C.K.)나 TDISP를 가중치 보호 요건으로 명시한 것은 없음.** SSD 쪽 원문(L.O.C.K.)이 다루는 위협은 매체 키 탈취 · 도난 · 멀티테넌트 호스트 VM · 파쇄 대체(CS-71, ST-27 · ST-28)다.
- **온프렘 가중치 배포의 실제 범위**: Google Gemini(GDC, air-gapped GA), Mistral · Cohere(온프렘 판매)는 확인. **Anthropic · OpenAI의 온프렘 가중치 배포는 확인 못함**(CS-18 · CS-51). Gemini on GDC 원문은 기밀 컴퓨팅을 "sensitive data" 보호로 서술하며 가중치를 직접 언급하지 않음(CS-15).
- **TDISP 생태계 성숙도**: 호스트 측은 AMD Turin 표기 · Linux 메인라인 SEV-TIO 코드(CS-75 · CS-76), Venice 패치 리뷰 중, Intel TDX Connect 출하 SKU 미확인(CS-74). GPU 측은 Blackwell TEE-I/O(CS-45). **SSD 측 TDISP 발표는 Samsung PM1763 1건**(CS-80), 클라우드(Google, CS-49)는 TDISP 미언급. Anthropic 원문은 "not all accelerators fully support confidential computing yet"(CS-43).
- **SPDM 지원이 Samsung 내에서도 제품별로 다름**: PM9E1 SPDM 1.2(ST-37) 대 PM9D3a · PM9D5a SPDM 미지원으로 Dell 기능 실패(CS-81).
- **NVIDIA 2Q FY27 소버린 YoY**: "3배 이상" 대 "2배 이상" 충돌(CS-09). EU 기가팩토리 선정 일정(2026년 내 대 2027 초) 충돌(CS-13). Barclays 83% 대 86%(CS-27).
- **기밀 컴퓨팅 시장 규모 편차**: 2026년 기준 약 $22.6B(MarketsandMarkets 경로) 대 $54B(Everest 2021) (CS-D10), 2025 기준값 $10~17B 범위.

---

## §9. 미확보 (검색했으나 확보 못한 것)

- **NG-CS-01** 온프렘 · 프라이빗 기업 AI 인프라(서버 · 스토리지) 지출의 2028~2030 달러 전망(IDC · Gartner 공개분). IDC 트래커 원문 차단.
- **NG-CS-02** 소버린 AI 지출 중 하드웨어 · 스토리지 비중. McKinsey 원문 미열람.
- **NG-CS-03** "Confidential Storage" 또는 보안 SSD 단독 시장 규모 전망. 없음.
- **NG-CS-04** Menlo Ventures 2025 State of GenAI, a16z CIO 설문의 보안 · 온프렘 비율. 검색 결과에 수치 없음(Menlo Security 결과만 잡힘).
- **NG-CS-05** Barclays CIO Survey 2025 · 2026판 리패트리에이션 수치. 2024 조사만 확인.
- **NG-CS-06** Flexera 2026 보안 과제 비율.
- **NG-CS-07** RAND 원문 PDF의 SL1~SL5 정의 원문, 저장 중(at rest) 가중치 암호화 요건. rand.org 차단, 2차 요약만.
- **NG-CS-08** Anthropic · OpenAI가 고객 온프렘에 가중치를 배포하며 기밀 컴퓨팅을 요구한다는 공식 진술. 없음.
- **NG-CS-09** Micron · Kioxia · Solidigm · SK hynix의 TDISP 지원 SSD 발표. 없음.
- **NG-CS-10** Intel TDX Connect의 출하 Xeon SKU · 출하 시점, Linux 메인라인 병합. 없음.
- **NG-CS-11** 스토리지 장치를 CPU+GPU 복합 증명 체인에 포함시키는 클라우드 · OEM 문서. 없음.
- **NG-CS-12** OCP Global Summit 2026 Samsung L.O.C.K. · FIPS 세션의 공식 일정 원문. 검색 요약 간 상충(CS-97).
- **NG-CS-13** NVMe 2.4(2026-08-04) KPIO 공식화의 NVM Express 1차 원문. nvmexpress.org 미열람.
- **NG-CS-14** 학습 체크포인트 바이트/파라미터 경험칙(16B)의 출처. CS-D12는 가정.
- **NG-CS-15** EU AI Act GPAI 의무 2025-08-02 개시의 1차 확인, 중국 국경 간 데이터 이전 규칙 최신 원문.
- **NG-CS-16** NVIDIA 2Q FY27 콜 원문의 소버린 문장(35% QoQ, YoY 배수). q4cdn 원문 차단.

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

- Google Cloud 블로그: 2025-04-09 "Bringing Gemini and Google Agentspace to you on-premises", 2025-08-28 "Gemini is now available anywhere", 2026-06-23 "Verifiable, private AI: Google Cloud expands Confidential Computing frontiers" (CS-15 · CS-49)
- Anthropic: 2025-05-22 "Activating ASL-3 protections", 2025-06-18 "Confidential inference via trusted virtualization" (CS-42 · CS-43)
- CHIPS Alliance Caliptra 저장소 `doc/ocp_lock/lock_spec.ocp` main (2026-10-10 열람) (CS-70 · CS-71)
- Linux 커널 master 7.3-rc6: `drivers/crypto/ccp/Makefile` · `Kconfig`, `drivers/virt/coco/Kconfig` · `tdx-host/Kconfig` (CS-76)
