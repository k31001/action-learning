---
type: concept
last_reviewed: 2026-07-04
sources: [sources/raw-notes/ai-datacenter-buildout-2026-06.md, sources/articles/july-2026-market-update-2026-07-04.md]
---

# AI 데이터센터 착공 현황 — 메모리 수요 선행 지표

AI 데이터센터 건설은 메모리(HBM/DRAM) 수요의 **6~24개월 선행 신호**다. 부지 확보 → 인허가·전력 → 골조 → 전력 인프라 → **IT 장비 설치(GPU+HBM 실투입)** → 가동의 단계를 따라가면, 발표된 용량이 *언제* 실제 메모리 소비로 전환될지 가늠할 수 있다. 이 페이지는 전 세계 대형(>200MW·>$1B) AI 데이터센터의 단계별 현황을 추적하고, 그 파이프라인이 함의하는 메모리 수요를 추정한다.

> 표본 47건·17개국, 총 계획 용량 55.9GW (2026-06-01) ([ai-datacenter-buildout-2026-06.md](../../sources/raw-notes/ai-datacenter-buildout-2026-06.md)). **전수 조사가 아니므로 절대값보다 추세·구성·단계 분포로 해석**한다. 본 페이지는 dashboard `Data Viz > AI DC` 탭(`dashboard/src/data/dataCenters.js`)의 단일 소스.

관련: [ai-server-demand.md](ai-server-demand.md) (GPU·HBM 탑재량) · [ai-capex.md](ai-capex.md) (빅테크 capex) · [energy-constraints.md](energy-constraints.md) (전력 제약) · [hbm-market.md](hbm-market.md) (HBM 시장) · [semiconductor-cycle.md](semiconductor-cycle.md) (사이클) · [ai-compute-economics-gap.md](ai-compute-economics-gap.md) (Bain 컴퓨트 경제학·163GW 외부 앵커).

---

## 1. 라이프사이클 9단계 모델

종합 출처: Global Data Center Hub, Epoch AI, JLL/CBRE, Mastt ([ai-datacenter-buildout-2026-06.md](../../sources/raw-notes/ai-datacenter-buildout-2026-06.md)). 전체 사이클은 **유리한 시장 18~30개월, 전력 제약 시장 4~7년**.

```mermaid
flowchart LR
  S1[① 부지 확보] --> S2[② 인허가·전력계약]
  S2 --> S3[③ 부지 조성] --> S4[④ 골조·외피] --> S5[⑤ 전력 인프라]
  S5 --> S6[⑥ 기계·전기] --> S7[⑦ IT 장비 설치] --> S8[⑧ 시운전] --> S9[⑨ 가동·램프업]
  S2:::bottleneck
  S5:::bottleneck
  S7:::bottleneck
  classDef bottleneck fill:#fee2e2,stroke:#ef4444,stroke-width:2px;
```

| # | 단계 | 기간 | "완료" 기준 |
|---|---|---|---|
| 1 | 부지 확보 — 토지 통제+부지 선정(전력·계통·광·용수·존) | 2~6개월 | 토지 통제+존 적합 확인 |
| 2 | **인허가·전력계약** — 인허가+계통 접속(interconnection)·PPA | 수개월~수년 | 접속 계약+인허가 발급 |
| 3 | 부지 조성 — 정지·기초·트렌칭 | 2~4개월 | 패드·기초 완료 |
| 4 | 골조·외피 — 구조 골조·외피 (powered shell) | 6~12개월 | 방수 외피 완성 |
| 5 | **전력 인프라** — 변전소·스위치기어·변압기·발전 | — | 송전(energized) |
| 6 | 기계·전기 — PDU·UPS·냉각(액냉) | 3~6개월 | 화이트스페이스 IT 준비 |
| 7 | **IT 장비 설치** — GPU 서버·랙·네트워크 | 주~월/홀 | 랙 전원·네트워크 가동 |
| 8 | 시운전 — 통합 시험(L1~L5)·부하 테스트 | 1~3개월 | IST 통과 |
| 9 | 가동·램프업 — 워크로드 마이그레이션·설계부하 | 지속 | 설계 IT 부하 도달 |

### 3대 병목 (long-pole)
발표 용량이 실제 가동(=메모리 소비)으로 전환되는 속도를 좌우하는 단계:
1. **②인허가·계통접속** — 美 접속 대기 중앙값 ~5년, 버지니아 ~7년, PJM 큐 ~8년.
2. **⑤전력 인프라** — 대형 변압기 리드타임 ~140주(2023)→160주+(2026), 고용량 ~4년.
3. **⑦GPU/HBM 할당** — HBM은 CY2026까지 sold-out, 첨단 패키징 연 ~2배 증설에 그침.

binding constraint가 큐(②)에서 물리적 인도(⑤·⑦)로 **하류 이동** 중 — 이는 [energy-constraints.md](energy-constraints.md)의 전력 제약 논의와 직결된다.

---

## 2. 용량 → 메모리 수요 환산 모델

GB200 NVL72(132kW/랙·72 GPU, PUE 1.1) 기준. 상세·출처는 [ai-server-demand.md](ai-server-demand.md) 및 소스 노트 참조.

**Rule-of-thumb (재현 산식)**:
> **1GW AI 데이터센터 ≈ 0.47M GPU ≈ 90PB HBM ≈ $1.35B HBM** (Blackwell 192GB)
> GB300/Rubin(288GB) 기준: **~135PB HBM ≈ $2.0B / GW**

1. 1GW ÷ PUE 1.1 = ~910MW IT
2. 910,000kW ÷ 132kW/랙 ≈ 6,900랙 × 72 = **~468,000 GPU**
3. HBM: 468,000 × 192GB ≈ **90PB** (Blackwell) / × 288GB ≈ 135PB (GB300)
4. $ HBM: 90PB × $15/GB ≈ **$1.35B**
5. 시스템 DRAM: 468,000 × 250GB ≈ **117PB DDR5**/GW

| GPU 세대 | HBM/GPU | 타입 |
|---|---|---|
| H100 | 80GB | HBM3 |
| H200 | 141GB | HBM3E |
| B200/GB200 | 192GB | HBM3E 8-hi |
| B300/GB300 | 288GB | HBM3E 12-hi |
| R100 Rubin | 288GB | HBM4 |

**애널리스트 앵커** (cf. 본 추정): 2026 HBM TAM ~$45B (Goldman) · HBM bit 수요 +70% YoY 2026 (SK hynix/TrendForce) · AI가 글로벌 DRAM 웨이퍼 ~20% 소비 (TrendForce) · 10GW ≈ $600B capex 중 ~$350B NVIDIA, 메모리 BOM ~25% (Morgan Stanley). 단가 하락으로 **bit/EB 수요와 $ TAM은 별도 모델** — 선형 환산 금지. **Bain(신문섭, 2025~26): 글로벌 DC 용량 163GW(2030, ~2배)·북미 ~50%·메모리=하이퍼스케일러 AI 지출 ~30%(2026, vs 2023~24 ~8%)** ([ai-compute-economics-gap.md](ai-compute-economics-gap.md)).

---

## 3. 글로벌 프로젝트 — 권역별 요약

전체 47건은 dashboard `AI DC` 탭·소스 노트 참조. 권역별 합계(계획 용량):

| 권역 | 건수 | 계획 용량 | 대표 프로젝트 |
|---|---|---|---|
| 북미 | 19 | ~30.4GW | Meta Hyperion 5GW, AWS Rainier 2.2GW, xAI Colossus 2GW, Stargate Abilene 1.2GW |
| 아시아·태평양 | 15 | ~12.8GW | Reliance Jamnagar 3GW, 전남 3GW(논란), SK·AWS 울산 1GW |
| 중동 | 4 | ~8.7GW | UAE Stargate 5GW, HUMAIN 1.9GW, DataVolt NEOM 1.5GW |
| 유럽 | 9 | ~4.1GW | MGX·Mistral France 1.4GW, Nscale Sines 1.2GW, Stargate Norway 0.5GW |

### 해석 플래그
- **Stargate operator 중복**: Frontier·Jupiter·Freebird·Lighthouse·Barn은 Vantage·STACK·SB Energy·Related 소유 — capex 이중계산 금지.
- **커스텀 실리콘**: AWS Rainier(Trainium2)·Google(TPU)·Alibaba(Zhenwu)는 NVIDIA 외 HBM 프로파일 → 표준 가속기 등가로 환산(주의).
- **중국 불투명**: MW·capex 비공개 多 → 추정. **전남 3GW**는 개발사 주장(전력 미확정).
- **Reliance**: 프로젝트(~3GW)와 그룹 계획(₹10T/$110B/10GW)을 구분.

### 운영사별 누적 용량 추이 (대시보드 차트)
대시보드는 운영사별 연도 누적 용량(GW) 추이를 라인 차트로 제공한다. 조인트·콜로 프로젝트가 많아 **주요 AI 앵커/소유주 기준으로 단일 귀속**한다: Stargate 컨소시엄 부지(Vantage·STACK·SB Energy·Related 소유)→**OpenAI/Stargate**, Nscale 앵커 부지→**Microsoft**, SK·HUMAIN 조인트의 AWS 몫→**Amazon AWS**, UAE 5GW 캠퍼스→**G42**. 상위 10개 운영사(추적 용량의 ~76%)만 표시하며 지역·소형·논란(전남 등) 프로젝트는 제외 — 전수는 프로젝트 표/지도 참조. (귀속은 편의적 분류이며 capex·소유권 이중계산과 무관.)

---

## 4. 함의 메모리 수요 (2026-06-01 추정)

- 총 추적 파이프라인 **55.9GW** → 함의 HBM 설치기반 **~5.0EB**(Blackwell) ~ **7.5EB**(GB300), 금액 **~$75B ~ $113B** (1회성 충전, 설치 기반).
- 가동중 **10.5GW**. 연간 1차 가동 신규: 2025 ~2.5GW, **2026 ~23.7GW** → 함의 증분 HBM **~$32B** (cf. 2026 HBM TAM ~$45B).
- 시스템 DRAM 함의(설치기반) ~6.5EB.
- **외부 벤치마크 (Bain, 신문섭)**: 글로벌 DC 용량 수요 **163GW(2030, 현재 ~2배)** — 본 추적 표본 55.9GW가 전체의 일부임을 정량화하는 상한 앵커. 하이퍼스케일러는 "원시적 확장 → 규율 있는 전력 인식형 성장"으로 전환, **전력이 GPU·건설을 넘어선 게이트키퍼** ([ai-compute-economics-gap.md](ai-compute-economics-gap.md)).

> **메모리 수요 신호로서의 함의**: 2026년에 23.7GW가 1차 가동에 진입(전체의 ~42%)한다는 것은, HBM 수요가 2026~2027에 집중적으로 실현됨을 시사. 단 ⑤전력·⑦HBM 할당 병목이 이 전환을 지연시키면 수요가 2027~2028로 이연될 수 있다 — [semiconductor-cycle.md](semiconductor-cycle.md)의 2028 공급과잉 리스크와 연결되는 핵심 변수.

⚠ 대형 프로젝트는 다단계 확장 — **1차 주요 가동 연도에 전체 계획 용량을 귀속**(보수적 상단). 누적치는 설치 기반(연간 흐름 아님).

---

## 5. 시나리오 플래닝 연결고리

본 지표는 **DF1 (AI 메모리 수요)**의 선행 관측 도구다 ([key-drivers.md](../driving-forces/key-drivers.md)):
- **단계 분포가 ④~⑦로 두텁다** → AI 수요 강세 지속 → 시나리오 **A(황금 요새)·B(AI 르네상스)** 우위 ([scenario-matrix.md](../scenarios/scenario-matrix.md)).
- **②인허가·⑤전력 병목으로 착공이 정체** → 발표 대비 가동 지연 → 수요 이연·과잉 투자 조정 → 시나리오 **D(조용한 재편)** 신호.
- **착공 취소·축소 빈발** (예: Abilene 600MW 철회, Stargate Norway OpenAI 이탈) → AI 거품 우려 → [ai-demand-sustainability.md](ai-demand-sustainability.md) 모니터링.

EWI 후보: ① 분기별 신규 착공 GW, ② 병목 단계(②·⑤·⑦) 적체 비율, ③ 착공 취소·연기 건수.

---

## 출처
- [sources/raw-notes/ai-datacenter-buildout-2026-06.md](../../sources/raw-notes/ai-datacenter-buildout-2026-06.md) — 4개 리서치 에이전트 병렬 수집 (US/APAC/MEA·EU/라이프사이클·환산), 전체 URL 목록 포함
- 라이프사이클: Global Data Center Hub, Epoch AI, JLL/CBRE, Mastt
- 환산: NVIDIA·HPE 스펙, TrendForce, Morgan Stanley, Goldman Sachs, SK hynix
- 프로젝트: DCD, CNBC, Epoch AI, 각사 보도자료 (소스 노트 C절 참조)

---

## 업데이트 (2026-07-04)

- **SemiAnalysis 등 보강 자료 기준, 글로벌 하이퍼스케일 캐파 약 190GW가 777개 프로젝트에 걸쳐 발표**됐다(148GW 계획·21GW 착공중·12GW 가동) — 본 위키 트래커(47건·55.9GW)보다 훨씬 큰 모집단이다 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- 이 차이는 **방법론 차이로 추정**된다 — 본 위키는 대형 랜드마크 프로젝트를 선별해 추적하는 반면, 신규 수치는 전수 집계 성격을 띤다. 다음 정기 ingest에서 방법론 조정을 검토할 필요가 있다 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- 미국은 ~43GW 계획(84개 시설)이 발표되어 있으나, Sightline Climate 기준 2026년 발표 12GW(140개 프로젝트) 중 **실제 착공은 5GW뿐**으로, "계획 vs 착공" 갭이 지속되고 있다 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- 6대 하이퍼스케일러(Amazon·Google·Meta·Microsoft·Oracle·Stargate) 합산 CAPEX 서약은 **$690B+**이며, 2026년 74개 시설이 착공했다 ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).
- Meta는 단독으로 2026년 상반기에만 **5GW+ 클라우드·코로케이션 용량 계약**을 체결했다(SemiAnalysis "Meta Compute: Everyone Wants To Be A Neocloud") ([july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md)).

**출처**: [sources/articles/july-2026-market-update-2026-07-04.md](../../sources/articles/july-2026-market-update-2026-07-04.md) §5

---

## [Update 2026-08-05] Dylan Patel — CPO 2029 지연·구리 붐 연장·NVIDIA 800V

- MAD Podcast(2026-07)에서 Dylan Patel은 **CPO(Co-Packaged Optics) 양산을 2029년으로 전망** — Street 기대(2027) 대비 2년 지연. "2026년 최고 인기 네트워킹 트레이드는 2년 이르다" ([mad-podcast-dylan-patel-memory-2026-07.md](../../sources/articles/mad-podcast-dylan-patel-memory-2026-07.md)).
- 그 결과 **구리 케이블 붐 연장** — 광학 전환 지연의 수혜. [보강 2026-08-05] 세부: **NVIDIA Rubin과 후속 Feynman 아키텍처까지 전(全)구리 솔루션 유지**(GPU 측 CPO는 여러 세대 뒤, 구리 커넥터 업체 수혜 — "Amphenol이 그 트레이드"). 지연 근거는 제조 수율·칩 설계·공급망 성숙도 미달 ([mad-podcast-dylan-patel-memory-2026-07.md](../../sources/articles/mad-podcast-dylan-patel-memory-2026-07.md) §4).
- [보강 2026-08-05] **800V(HVDC) 재설계**: NVIDIA가 **Rubin Ultra의 Kyber 랙 버전에서 800V 설계를 제거** — 800V 전환이 후퇴했고 이 다운스트림 설계 변경이 CPO 지연을 추가 심화. 본 페이지의 전력 게이트키퍼 논지에서 랙 전력 아키텍처 전환 시간축이 뒤로 이동.
- 메모리 함의: 네트워킹·전력 아키텍처의 전환 지연은 랙당 구성의 급변 리스크를 낮춰 **GPU+HBM 실투입 단계 예측의 안정성**을 높이는 방향 — DC 파이프라인→메모리 수요 환산(본 페이지 방법론)의 가정 변화 요인은 아님.

**출처**: [mad-podcast-dylan-patel-memory-2026-07.md](../../sources/articles/mad-podcast-dylan-patel-memory-2026-07.md)
