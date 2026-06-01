# AI 데이터센터 착공 현황 — 글로벌 리서치 (2026-06-01 수집)

**수집 목적**: 메모리(HBM/DRAM) 수요의 선행 지표로서 전 세계 AI 데이터센터 건설 현황을 통합 모니터링.
**수집 방법**: 4개 리서치 에이전트 병렬 웹 수집 (US / Asia-Pacific / Middle East·Europe / 라이프사이클·메모리 환산). 2025~2026 보도 기준.
**파생 산출물**: [wiki/concepts/ai-datacenter-buildout.md](../../wiki/concepts/ai-datacenter-buildout.md), dashboard `Data Viz > AI DC` 탭 (`dashboard/src/data/dataCenters.js`).

> ⚠ 본 노트는 sources 층(원본·불변). 수치 해석·교차참조는 wiki 페이지에서. 절대값보다 추세·구성·단계 분포로 해석할 것 (대형 표본이지 전수 조사가 아님).

---

## A. 데이터센터 라이프사이클 9단계 모델

종합: Global Data Center Hub(하이퍼스케일 7-phase 언더라이팅), Epoch AI(GW 건설 기간), JLL/CBRE 2025, Mastt. 전체 사이클 **유리한 시장 18~30개월 / 전력 제약 시장 4~7년**.

| 단계 | 정의 | 기간 | "완료" 기준 | 비고 |
|---|---|---|---|---|
| 1. 부지 확보 | 토지 매입·옵션·지상권, 부지 선정 (전력·계통·광·용수·존 심사) | 2~6개월 | 토지 통제 확보+존 적합 | 5~10% |
| 2. 인허가·전력계약 | 인허가+계통 접속(interconnection)·PPA | 수개월~수년 | 접속 계약+인허가 발급 | **long-pole**. 美 중앙값 ~5년, 버지니아 ~7년, PJM ~8년 |
| 3. 부지 조성 | 정지(grading)·기초·유틸리티 트렌칭 | 2~4개월 | 패드·기초 타설 완료 | |
| 4. 골조·외피 | 구조 골조·외피·보안 외피 (powered shell) | 6~12개월 | 방수 외피 완성 | 지붕 완성 후 ~150일에 첫 부하(Epoch) |
| 5. 전력 인프라 | 변전소·스위치기어·변압기·백업발전·MV/LV | — | 송전(energized) | **long-pole**. 대형 변압기 리드 ~140주(2023)→160주+(2026), 고용량 ~4년 |
| 6. 기계·전기(M&E) | PDU·UPS·냉각(액침/직접칩) — GB200/GB300급 액냉 필수 | 3~6개월 | 화이트스페이스 IT 준비 | 5단계와 중첩 |
| 7. IT 장비 설치 | GPU 서버·랙·네트워크 설치 | 주~월/홀 | 랙 전원·네트워크·OS 가동 | **long-pole**. GPU+HBM 공급이 binding. HBM CY2026까지 sold-out |
| 8. 시운전 | 통합 시스템 시험 L1~L5·부하 테스트 | 1~3개월 | IST 통과 | |
| 9. 가동·램프업 | 핸드오버·워크로드 마이그레이션·설계부하 램프 | 지속 | 설계 IT 부하 도달 | groundbreaking→1GW: 1~3.6년(Epoch) |

**3대 병목(long-pole)**: ②인허가·계통접속, ⑤변압기·전력 인프라, ⑦GPU/HBM 할당. binding constraint가 큐(②)에서 물리적 인도(⑤·⑦)로 하류 이동 중.

출처:
- Global Data Center Hub — https://www.globaldatacenterhub.com/p/how-to-underwrite-the-hyperscale
- Epoch AI (build times) — https://epoch.ai/data-insights/data-centers-buildout-speeds
- Data Center Knowledge (delays) — https://www.datacenterknowledge.com/energy-power-supply/why-ai-data-center-projects-face-years-of-delays-after-approval
- pv-magazine (변압기 4년) — https://pv-magazine-usa.com/2026/05/11/u-s-transformer-market-faces-severe-supply-constraints-as-lead-times-extend-to-four-years/
- PowerMag (변압기 2026) — https://www.powermag.com/transformers-in-2026-shortage-scramble-or-self-inflicted-crisis/
- CBRE H2 2025; JLL 2026 Outlook; Mastt DC construction guide; TrueLook; BD+C

---

## B. 용량 → 메모리 수요 환산 모델

### B1. 전력/가속기 (GB200 NVL72 기준)
- GB200 NVL72: NVIDIA 공칭 **120kW**/랙, 72 GPU. 실부하 HPE **132kW**(115kW 액체+17kW 공랭).
- GB300 NVL72 ~120~140kW급. VR300 NVL576 ">600kW"/랙.
- **IT MW당 ~545 GPU** (= 1000kW÷132kW×72). PUE 1.1 적용 시 **1GW(시설) ≈ 910MW IT ≈ 468,000 GPU**.

### B2. GPU당 HBM (NVIDIA 스펙)
| GPU | HBM | 타입 |
|---|---|---|
| H100 | 80GB | HBM3 |
| H200 | 141GB | HBM3E |
| B200/GB200 | 192GB | HBM3E 8-hi |
| B300/GB300 | 288GB | HBM3E 12-hi |
| R100 (Rubin) | 288GB | HBM4 |
| R300 (Rubin Ultra) | ~1TB | HBM4E 16-stack |

랙 단위: GB200 NVL72 = 72×192GB ≈ **13.8TB HBM3E**/랙. VR300 NVL576 = 144TB HBM4E/랙.

### B3. 시스템 DRAM
- DGX/HGX H100/H200 8-GPU 노드 = 최대 **2TB DDR5** → GPU당 ~250GB.
- GB200 Grace-Blackwell: Grace CPU당 480GB LPDDR5X (DDR5 RDIMM 아닌 LPDDR로 일부 이동).

### B4. 애널리스트 GW/capex ↔ 메모리 링크
- **Morgan Stanley**: 10GW AI 컴퓨트 ≈ $600B capex (이 중 ~$350B NVIDIA). Rubin VR200 NVL72 = 시스템 원가의 **~25%가 메모리** (~$2M/$7.8M 랙).
- **Goldman Sachs**: 2026 HBM TAM ≈ **$45B** (51→45 하향), +25% YoY.
- **TrendForce/SK hynix**: HBM bit 수요 +130% YoY(2025), **+70% YoY(2026)**. AI가 2026 글로벌 DRAM 웨이퍼 **~20%** 소비 (HBM 1GB ≈ 표준 DRAM 4배 웨이퍼).
- **HBM 단가**: HBM3E ~$8~17/GB (Epoch BOM ~$15/GB). 2026 ~20% 인상 예정.

### B5. Rule-of-thumb (재현 가능 산식)
> **1GW AI 데이터센터 ≈ 0.47M GPU ≈ 90PB HBM ≈ $1.35B HBM** (Blackwell 192GB 기준)

1. 1GW ÷ PUE 1.1 = ~910MW IT
2. 910,000kW ÷ 132kW/랙 ≈ 6,900랙 × 72 = ~468,000 GPU
3. HBM: 468,000 × 192GB = ~90PB (0.09EB). GB300(288GB) → ~135PB
4. $ HBM: 90PB × $15/GB ≈ $1.35B (범위 $0.7~1.5B). GB300 → ~$2.0B
5. 시스템 DRAM: 468,000 × 250GB ≈ 117PB DDR5

**가정 레버 2개**: 랙 전력(120~140kW)·PUE(1.1~1.6). bit/EB 수요와 $ TAM은 별도 모델 (단가 하락으로 선형 아님).

출처:
- NVIDIA GB200 NVL72 — https://www.nvidia.com/en-us/data-center/gb200-nvl72/
- The Next Platform (로드맵) — https://www.nextplatform.com/2025/03/19/nvidia-draws-gpu-system-roadmap-out-to-2028/
- HPE GB200 NVL72 (132kW) — https://buy.hpe.com/us/en/compute/rack-scale-system/nvidia-nvl-system/nvidia-gb200-nvl72-by-hpe/p/1014890104
- techplustrends (468k GPU/GW) — https://techplustrends.com/1gw-data-center-power-consumption-guide/
- TrendForce (AI 20% DRAM 웨이퍼) — https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026-hbm-gddr7-lead-demand/
- Tom's Hardware (MS 메모리 25%) — https://www.tomshardware.com/tech-industry/artificial-intelligence/nvidias-memory-costs-soar-485-percent-latest-ai-systems-now-cost-usd7-8-million-to-build-memory-now-comprises-25-percent-of-the-total-cost
- SK hynix 2026 Outlook (HBM +70%) — https://news.skhynix.com/2026-market-outlook-focus-on-the-hbm-led-memory-supercycle/
- Epoch AI (B200 BOM, $15/GB) — https://epoch.ai/data-insights/b200-cost-breakdown

---

## C. 글로벌 프로젝트 (>200MW 또는 >$1B 표본)

### 북미 (미국)
- **Stargate Abilene** (Crusoe/Oracle/OpenAI), TX — 1.2GW 원캠퍼스(브로더 ~2.1GW), 875~1,000ac, 450k GB200, 4/8동 가동. OpenAI 600MW 증설 철회(26-03), MS 700MW 임차. [Epoch AI / DCD / Crusoe / Tom's HW]
- **Stargate Frontier** (Vantage), Shackelford Co. TX — 1.4GW, 1,200ac, $25B, 10동 3.7M sqft, H2 2026 1동. [Vantage / DCD]
- **Stargate Jupiter** (STACK), Doña Ana Co. NM — ~2.2GW(추정), 기초공사, 2028. [Epoch AI]
- **Stargate Freebird** (SB Energy), Milam Co. TX — ~1.2GW, 10월 1동. [Epoch AI / OpenAI]
- **Stargate Lighthouse** (Vantage), Port Washington WI — ~1.3GW, $15B, 기초공사. [Data Center Knowledge]
- **Stargate "The Barn"** (Related), Saline Twp. MI — 1.0GW, 250ac, $7B, 26년 건설. [Bisnow / DCD / Fortune]
- **Meta Hyperion**, Richland Parish LA — 5GW(Phase1 1.5GW 27년말), 5,000ac+, $27B JV(그룹 $200B설), 1.3M GPU. Entergy 가스 10기·송전 240mi. [ENR / Wikipedia / DCD]
- **Meta Prometheus**, New Albany OH — 1GW(세계 첫 1GW급), 5동중 3동, 26년 가동, Williams 가스. [NBC4 / AI DC Index]
- **Meta El Paso**, TX — 1GW by 2028, $10B, 366MW 모듈 가스. [CNBC / DCD]
- **Meta Lebanon**, IN — 1GW, $10B, 13동, 26-02 건설. [Meta / DCD]
- **Microsoft Fairwater WI**, Mount Pleasant — 450MW, 315ac, $7.3B(WI 총), 15만+ GB200/GB300, 조기 가동 26-04. [Tom's HW / DCD]
- **Microsoft Fairwater Atlanta**, GA — ~2GW 네트워크 일부, GB200/GB300, 가동+Fairwater4 건설. [Microsoft / DCF]
- **xAI Colossus 2**, Memphis TN — 2GW, 555k GPU, $18B, 세계 첫 GW급. [Introl / SemiAnalysis / DCD]
- **AWS Project Rainier**, New Carlisle IN — 2.2GW, 1,200ac, $11B, ~500k Trainium2(→1M+), 가동중 25-10. [aboutamazon / CNBC]
- **AWS Mississippi (Atlas)**, Madison Co. MS — ~1GW, 1,700ac, $25B, 27년. [aboutamazon / DCD]
- **QTS Fayetteville**, GA — ~1GW 계획(250MW 확인), 615ac, 13동중 2동, MS 수용. [DCD / The Citizen]
- **Crusoe Wyoming**, Cheyenne — 1.8GW(→10GW), 카운티 승인 26-01, 가스. [DCD / Inside Climate]
- **Google Texas (3캠퍼스)**, Armstrong/Haskell — $40B, TPU·솔라+배터리, 27년말. [Google / Texas Tribune]
- **CoreWeave (포트폴리오)** — 계약 전력 3.5GW(→30년 5GW), Rubin 조기. [CoreWeave 8-K Q1 FY26]

### 아시아·태평양
- **Reliance Jamnagar** (Jio), Gujarat 인도 — ~3GW(논란), $20~30B(그룹 $110B/10GW와 구분), 1차 >120MW H2 2026. [Bloomberg/Light Reading / TechCrunch]
- **Google AI Hub Vizag** (Google/AdaniConneX), AP 인도 — GW급, $15B, 26-04 착공·~30년. [Google Cloud / Adani / DCD]
- **전남 3GW AI DC** (Fir Hills/SFR), 한국 — 3GW·$35B·200k GPU(개발사 주장·논란), MoU, 전력원 미확정. [DCD / Tom's HW]
- **SK·AWS 울산**, 한국 — 풀 1GW(41MW 27-11→103MW 29-02), $5.1B, 60k GPU, 25-08 착공. SK가스 LNG. [KED Global / DCD]
- **현대차 새만금**, 한국 — GW급, $6.3B, 50k Blackwell, MoU 26-02. [Introl / NVIDIA]
- **Stargate Korea** (OpenAI/Samsung·SK), 포항·전남 — 20MW×2, 26-03 착공 예정. Samsung·SK가 글로벌 Stargate HBM 공급. [Korea Herald / Blocks&Files]
- **SoftBank Sakai (Stargate JP)**, Osaka 일본 — 150→250MW(FY28), 구 Sharp 공장, $0.68B 부지, 26년 가동. [DCD / Nasdaq]
- **Oracle Japan**, 동·서 — $8B/10년, H100/H200. [Introl / DCD]
- **Bridge DC MY06/MY07** (ByteDance), Johor 말레이 — 110+400MW, 58ac, $2.8B 금융, MY06 가동·MY07 건설. [Mingtiandi / MIDA]
- **Microsoft Malaysia SEA3**, Kulai Johor — $2.2B, 3 AZ, 발표 25-11. [DCD / ASEAN Briefing]
- **Alibaba Shaoguan** (Alibaba/China Telecom), 광둥 중국 — 1만 자국칩(Zhenwu)→10만 목표, 가동 26-04, MW 비공개. [CNBC / Capital Brief]
- **Alibaba Ulanqab**, 내몽골 중국 — 東數西算 서부 허브, 가동·확장. [Baxtel / Goldman]
- **DayOne Batam** (Oracle), Nongsa 인니 — 450MW(150 Q3 26→450 27), Oracle North 리전. [Jakarta Globe / ANTARA]
- **Foxconn Kaohsiung** (Foxconn/NVIDIA), 대만 — 100MW, GB200 NVL72 64랙·4,608 GPU·>90EF, Phase1 가동. [NVIDIA / CNBC]
- **호주 (MS/AWS/NextDC)** — ~30년 3.1GW, MS A$25B+AWS A$20B+OpenAI A$7B. [Microsoft / CNBC]

### 중동
- **UAE-US AI Campus / Stargate UAE** (G42/OpenAI·Oracle·NVIDIA·Cisco·SoftBank), Abu Dhabi — 5GW(Phase1 1GW, 첫 200MW 35k GB300), 6,400ac, M&E 진행. 美 외 최대. [G42 / CNBC]
- **HUMAIN** (PIF), Riyadh·Dammam 사우디 — 쌍둥이 2×100MW(→30년 1.9GW), $10B(AMD), 18k GB300→60만 시스템, Q2 26 가동. [NVIDIA / DCD]
- **AWS·HUMAIN AI Zone**, Riyadh — $5B, 15만 가속기(GB300+Trainium), 26년. [BusinessWire / aboutamazon]
- **DataVolt NEOM Oxagon**, 사우디 — 1.5GW(300MW 1차), $5B, 넷제로, ~28년. [NEOM / DCD]

### 유럽
- **Stargate UK** (Nscale/OpenAI), Cobalt Park NE 영국 — 8k→31k GPU, AI Growth Zone, 1차 GPU 26년초. [Nscale / GOV.UK]
- **Nscale Loughton** (Nscale/Microsoft), Essex 영국 — 50→90MW, 23k GB300, Q1 27 GPU. 英 최대 AI 슈퍼컴. [Nscale / DCD]
- **Blackstone Northumberland** (Blackstone/QTS), Cambois 영국 — ~400MW(추정), £10B, AI Growth Zone. [GOV.UK / DCD]
- **Stargate Norway** (Nscale·Aker→Microsoft), Narvik — 230→520MW, 100k GPU 26년말, $1B 초기, OpenAI 이탈→MS 인수 26-04. 100% 수력. [Nscale / CNBC]
- **MGX·Mistral France 캠퍼스** (MGX/Bpifrance/Mistral/NVIDIA), Paris — 1.4GW, €8.5B(~$9.2B), H2 26 착공·28년. 유럽 최대 AI 캠퍼스. [MGX / DCD]
- **Mistral Paris DC**, Bruyères-le-Châtel — 44MW, 13.8k GB300, $830M, Q2 26 가동. [TechCrunch / DCD]
- **DT Industrial AI Cloud** (Deutsche Telekom/NVIDIA), Munich — 10k GPU, €1B, 가동 Q1 26. 기가팩토리 전초. [DT / NVIDIA]
- **Nebius Polarnode**, Lappeenranta 핀란드 — 310MW, $10B, Meta $27B 앵커, 27년 1차. [Nebius / CNBC]
- **Nscale Start Campus Sines** (Nscale/Microsoft), 포르투갈 — 1.2GW, 66k Rubin, MS $10B. 남유럽 최대급. [Nscale / TechCrunch]
- **EU AI Gigafactories** (InvestAI) — €20B로 4~5개(각 >10만 칩), 정식 콜 Q2 2026 연기. 파이프라인. [DCD / EC]

---

## D. 핵심 플래그 (해석 주의)
1. **Stargate operator 중복 주의**: Frontier·Jupiter·Freebird·Lighthouse·Barn은 Vantage·STACK·SB Energy·Related가 소유·건설. capex 이중계산 금지.
2. **커스텀 실리콘**: AWS Rainier(Trainium2), Google(TPU), Alibaba(Zhenwu)는 NVIDIA 외 — HBM 프로파일 별도.
3. **MW 정의 차이**: Vantage 1.4GW vs Epoch 2.0GW(IT부하 vs 총전력). 보수적으로 발표 용량 채택.
4. **중국 불투명**: 대부분 MW·capex 비공개 → 추정. 30GW 국가 수치·39 DC/115k GPU 계획은 NVIDIA 제재 전 보도.
5. **전남 3GW**: 개발사 주장, 전력 조달 미확정 — 논란 표기.
6. **Reliance**: 프로젝트(~3GW)와 그룹 계획(₹10T/$110B/10GW 그린E) 구분 필수.
7. **capex ≠ 연간 지출**: 대부분 다년 빌드아웃 총 약정. Meta 2026 가이던스 $115~145B, MS $100B+/년.

---

## E. 도출 집계 (dashboard 미러, 2026-06-01 시점)
- 추적 프로젝트 **47건**, **17개국**, 총 계획 용량 **55.9 GW**, 가동중 **10.5 GW**.
- 함의 HBM 설치기반: **~5.03 EB** (Blackwell 192GB) ~ **7.54 EB** (GB300 288GB). 금액 **~$75B ~ $113B**.
- 연간 1차 가동 신규 용량: 2025 ~2.5GW, 2026 ~23.7GW (→ 함의 증분 HBM ~$32B, cf. 2026 HBM TAM ~$45B Goldman).
- ※ 대형 프로젝트는 1차 가동 연도에 전체 계획 용량 귀속(보수적 상단). 누적 = 설치 기반(1회성).
