---
type: concept
last_reviewed: 2026-10-06
sources:
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md
  - sources/articles/qlc-v7-placement-cases-waf-2026-09.md
  - sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md
  - sources/articles/ssd-future-candidate-security-trust-2026-10.md
  - sources/articles/qlc-v6-fdp-placement-handles-2026-09.md
  - sources/articles/component-to-system-solution-ladder-facts-2026-09.md
  - sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md
  - sources/articles/fdp-technical-limits-adoption-context-2026-08.md
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
---

# 제품 포트폴리오를 받치는 핵심 기술 6가지와 고객 협력 강도

[datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)가 "데이터센터 응용마다 SSD 요구가 달라 SLC급부터 고용량 QLC까지 포트폴리오가 필요하다"까지 세웠다면, 이 페이지는 **그 포트폴리오를 만드는 데 필요한 핵심 기술 6가지**를 제품군에 연결하고, 기술마다 **고객 협력이 얼마나 필요한지**를 같은 기준으로 판단한다. 덱 2장(고객 협력 전략 v1.5)의 단일 소스다.

> 사용자 지시(2026-10-06): "두 번째 슬라이드는 제품 포트폴리오에 따라 필요한 핵심 기술 6가지를 나타낼 거야. 1 Fault Tolerant(die/plane level fault isolation) 2 Large Mapping(FTL map unit 4KB → 8KB~64KB, FTL optimization) 3 Mixed Media(pSLC + QLC namespace separation) 4 Multi-Tenant QoS(Namespace QoS isolation) 5 FDP(RUH/RG policy optimization) 6 Confidential Storage(RoT/Encryption/Attestation for Confidential VM for AI agents). 각 핵심 기술이 어떤 제품군에 적합한지 표현하고, 고객 협력이 필요한 강도를 판단해서 고객 협력이 필수적이고 지금까지 하던 방식을 벗어나야 제대로 된 제품을 만들 수 있는 핵심 기술을 선정해 줘. 이 핵심 기술들을 제대로 확보해 미래 시대를 대비하려면 고객과의 협력이 필수라는 메시지."
>
> **결정 변경 기록**: 2026-10-03에는 보안 · 신뢰를 덱에서 따로 강조하지 않기로 했다([ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)). 2026-10-06 사용자 지시로 **Confidential Storage(에이전트 기밀 VM용)** 를 핵심 기술 6번으로 넣는다. 강조점은 "새 기술"이 아니라 "에이전트 시대의 기밀 VM이 스토리지까지 증명을 요구한다"이고, 협력 방식은 표준 기반이다.

## 1. 핵심 기술 6가지: 무엇이고 왜 필요한가

| # | 핵심 기술 | 내용 | 왜 필요한가 (데이터) | 등급 |
|---|---|---|---|---|
| 1 | **Fault Tolerant** | 다이 · 플레인 단위 고장 격리, SSD 내부 패리티로 고장 다이를 견딤 | 같은 폼팩터에서 245.76TB = 다이 1,024개 → 512TB = 약 2,133개(1Tb 다이 환산, [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md)). 하이퍼스케일러에게 "오늘날 부분 고장은 전체 고장"(HotCarbon'24, D12). 선례: Samsung PM1733 다이 1개 고장 허용(C4), Kioxia Flash Die Failure Protection(C5) | ⚠️ 산술 / 🟡 |
| 2 | **Large Mapping** | FTL 매핑 단위(IU)를 4KB → 8~64KB로 키워 매핑 DRAM을 줄이고 FTL 최적화 | 4KB 매핑은 엔트리 4B 기준 매핑 DRAM ≈ 용량의 1/1,000 → 245TB면 약 245GB, 64KB면 약 15GB(⚠️ 산술). 실제 IU: Solidigm P5316 64KB · P5336 16KB, Micron 6600 ION 245TB 16KB(MX-15 · MX-20). **대가**: IU보다 작은 쓰기는 IU 전체를 다시 쓴다(64KB IU에서 4KB 쓰기 = 16배, MX-20 ⚠️). 같은 Micron 6600 ION의 정격이 4K 랜덤 0.075 · 16K 랜덤 0.3 · 128K 순차 1.0 DWPD로 13배 갈린다(E-06 🟡) | ⚠️ / 🟡 |
| 3 | **Mixed Media** | 한 드라이브 안 pSLC 네임스페이스 + QLC 네임스페이스, 고객 SW가 데이터 종류별로 배치 | 4KB 랜덤 쓰기 WAF 70+ → 모아서 순차로 내리면 1.02(CSAL, 별도 캐시 드라이브 구성, MX-11 🟡) · 고객이 요구한 pSLC = QLC 용량의 0.5~2%(Kioxia VoC, MX-01 🟡) · 상세 [mixed-media-ssd.md](mixed-media-ssd.md) | 🟡 |
| 4 | **Multi-Tenant QoS** | 네임스페이스 · NVM Set 단위 QoS 격리, 이웃 테넌트 간섭 차단 | 공유 SSD를 하드웨어로 격리하면 p99 지연 최대 3.1배 감소(FlashBlox, CQ-10 ✅) · 이웃 테넌트의 4K 랜덤 쓰기로 CacheLib WAF 1.28 → 약 3.0(WARP FAST'26, CQ-16 ✅) · NVMe 1.4 IO Determinism · NVM Set이 noisy neighbor 대응으로 도입(B12 🟡) | ✅ / 🟡 |
| 5 | **FDP** | Flexible Data Placement(TP4146, 2022-11-30 비준), RUH · RG 배치 정책 최적화 | CacheLib 사용률 100%에서 WAF 3.22 → 1.03(EuroSys'25, F15 ✅) · 2TB · 30 DWPD · 5년을 SLC 모드로 만들 때 다이 약 120 → 47(-60%, [high-dwpd-operating-point.md](high-dwpd-operating-point.md) ⚠️ 산술) · 상세 [fdp-placement-mechanics.md](fdp-placement-mechanics.md) | ✅ / ⚠️ |
| 6 | **Confidential Storage** | RoT(Caliptra) · 암호화(키 관리) · 증명(SPDM) · 기밀 VM 연결(TDISP) | Meta가 "Meta도 접근 못 하는 Muse Confidential VM" 선택지를 예고(AV-05 🟡) · Linux 메인라인에 TDISP를 기밀 VM에 장치를 붙이는 경로로 구현(ST-38 ✅) · OCP L.O.C.K.는 "Google · Microsoft 스토리지 제품에 채택 확정"이고 Samsung이 공저자(ST-26 · ST-27 ✅) · Caliptra 2.0 범위에 DC SSD 명시(ST-20 ✅) · Samsung PM1763은 TDISP · PQC 탑재로 양산 발표(ST-10 🟡) | ✅ / 🟡 |

## 2. 어떤 제품군에 적합한가

제품군은 덱 1장의 포트폴리오 행이다(● 핵심 · ◐ 해당). 근거는 1절과 [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md) §1.5.

| 핵심 기술 | SLC급 (30~120 DWPD) | 고내구 TLC (3) | 고성능 · 범용 TLC (1) | 고용량 QLC (0.3~0.6) | 이유 |
|---|---|---|---|---|---|
| Fault Tolerant | | | ◐ | ● | 다이 수가 많을수록 고장 다이 격리가 필요하다(고용량일수록 다이 ×2) |
| Large Mapping | | | | ● | 매핑 DRAM이 용량에 비례한다. 고용량 QLC에서 가장 크다 |
| Mixed Media | | | | ● | QLC의 작은 쓰기 약점을 소량 pSLC로 메운다 |
| Multi-Tenant QoS | | ◐ | ● | ● | 범용 클라우드 VM(TLC) · 에이전트 VM(QLC)이 여러 테넌트를 한 드라이브에 싣는다. KV 캐시 공유 계층은 ◐ |
| FDP | ● | ● | ◐ | ● | 쓰기가 많은 제품군일수록 WAF 1에 가까워지는 값이 크다(SLC급 다이 -60% · KV 캐시 TLC · QLC의 쓰기 역할 확대) |
| Confidential Storage | | | ● | ● | 기밀 VM의 디스크: 범용 클라우드 VM(TLC)과 에이전트 사용자 VM(QLC) |

→ **고용량 QLC에 6개 중 5개가 걸린다.** 고용량 QLC는 "만들기만 하면 되는" 제품군이 아니라, 고장 격리 · 매핑 · 배치 · 격리 · 증명이 한 드라이브에 모이는 제품군이다. FDP는 SLC급부터 QLC까지 가장 넓게 걸친다.

## 3. 고객 협력의 깊이: 스펙으로 분리되는가 (⚠️ 과제팀 판단, v2 2026-10-06)

> 사용자 기준(2026-10-06): "고객과 협력하지 않으면 핵심 기술이 제대로 최적화되지 않거나 요구를 만족하지 못한다면 고객 협력이 필수인 기술이다. 반면 고객 시스템에 함께 디자인되어야 하지만 **스펙을 명확하게만 정한다면 굳이 tightly coupled 되어 협력할 필요는 없을 수 있다.** Mixed Media는 기능을 지원하는 SSD를 제공하면 고객이 입맛에 맞게 쓰면 되는 것 아닌가."

### 3.1 두 축

| 축 | 질문 | 0 | 1 | 2 |
|---|---|---|---|---|
| **결합도** (x) | 이 기술을 쓰려면 고객 시스템이 함께 설계돼야 하나 | 그대로 쓴다 | 설정 · 정렬 · 매핑을 맞춘다 | 데이터 경로나 신뢰 체계에 새로 넣는다 |
| **스펙 비완결도** (y) | 인터페이스와 수치 목표를 명확히 정하면, 양쪽이 따로 개발 · 검증해도 요구가 만족되나 | 표준 · 사내 검증으로 닫힌다 | 고객 워크로드로 **목표 수치를 한 번** 정하면 닫힌다 | 결과가 **양쪽 정책의 맞물림**에 달려, 고객 워크로드에서 **반복 공동 튜닝**해야 닫힌다 |

**판정**: y = 2 → **고객과 공동 설계 필수**(tightly coupled). x ≥ 1이고 y ≤ 1 → **스펙으로 협력**(요구를 정확히 받으면 따로 개발 가능). x = 0 → **SSD 안에서**.

### 3.2 배치

| 핵심 기술 | 결합도 | 스펙 비완결도 | 판정 | 근거 |
|---|---|---|---|---|
| Fault Tolerant | 0 | 0 | SSD 안에서 | 고장 다이 격리 · 패리티는 SSD 안에서 완결(PM1733 FIP C4 · Kioxia C5). OCP 로그에 다이 고장 허용 필드(C1) |
| Large Mapping | 1 | 1 | 스펙으로 협력 | IU 크기는 고객 쓰기 크기 분포로 한 번 정하고(제품별 IU 4KB · 16KB · 64KB, MX-20 · MX-71), 고객은 IU에 정렬해 쓴다(Solidigm 정렬 설명 MX-13). 정렬 규칙이 단순해 스펙으로 닫힌다 |
| Multi-Tenant QoS | 1 | 1 | 스펙으로 협력 | 고객이 테넌트를 네임스페이스 · NVM Set에 매핑하고, 지연 백분위 목표(OCP 표 B07)를 스펙으로 준다. 격리는 SSD가 합성 부하로 사내 검증한다 |
| Confidential Storage | 2 | 0 | 스펙으로 협력 (표준) | 고객의 기밀 VM · 증명 체계에 들어가야 하지만(TDISP, ST-38) Caliptra · SPDM · TDISP · L.O.C.K. 표준이 인터페이스와 동작을 정한다. 삼성은 L.O.C.K. 공저자(ST-26) |
| Mixed Media | 2 | 1 | **스펙으로 협력** | 고객 SW가 데이터를 pSLC · QLC 네임스페이스로 나눠 보내야 하지만(결합 2), **인터페이스가 표준 네임스페이스**이고 pSLC 비율은 출하 시 정하는 값이며 고객이 이미 수치로 요구한다(Kioxia "배치별 맞춤 비율" MM-05, VoC 0.5~2% MX-01). 네임스페이스 간 QoS는 목표 수치로 사내 검증할 수 있다. 상용 혼합 매체도 고객이 범용 드라이브 위에 자기 SW로 묶었다(CD-01) |
| **FDP** | 2 | **2** | **고객과 공동 설계 필수** | ① 효과가 고객 SW의 **수명 분류**와 SSD의 **RU 크기 · GC 정책**이 맞물릴 때만 난다: 오분류 · RUH 간섭 · 적대적 무효화에서 실패(WARP FAST'26, D-01), 한 RUH의 무효화가 다른 핸들의 WAF까지 부풀림(Noisy RUH, D-02), 사용자 데이터 99%가 한 RUH로 몰려 붕괴(D-03). ② **같은 "FDP 지원" 스펙, 같은 워크로드에서 한 장치는 near-ideal, 다른 장치는 붕괴**(D-04): 스펙만으로 결과가 보장되지 않는다. ③ RU 크기 · OP · RUH 수 · GC 정책은 펌웨어가 노출하지 않는 정책 변수다(WARP). ④ RUH · RG 구성은 출하 시 고정이라(F-07) 고객 워크로드를 보고 미리 함께 정해야 한다. ⑤ 핸들이 모자라면 기본 핸들 하나로 합류한다(CacheLib 폴백, D-05). 선례: CacheLib WAF 3.22 → 1.03은 삼성 엔지니어가 Meta의 오픈소스 CacheLib 안에 구현하고 Meta가 업스트림에 반영한 결과(EuroSys'25, C-08; 2026-10-07 정정: 논문 저자는 삼성, [dc-in-house-ssd-co-design-2026-10.md](../../sources/articles/dc-in-house-ssd-co-design-2026-10.md) US-26) |

**선정 결과**: **FDP.** 고객 시스템과 함께 설계돼야 하는 기술은 여럿(Mixed Media · Confidential Storage · QoS · Large Mapping)이지만, 그중 **명확한 스펙으로 분리되지 않는 것은 FDP 하나다.** FDP는 SLC급(2TB · 30 DWPD 다이 -60%) · 고내구 TLC(KV 캐시) · 고용량 QLC에 걸쳐 가장 넓은 제품군을 받친다.

**메시지**: 협력의 깊이는 두 가지다. 다섯 기술은 **고객 요구를 정확한 스펙으로 받는 협력**이 필요하고(그중 Fault Tolerant는 SSD 안에서), FDP는 **고객 시스템 안에서 함께 설계 · 튜닝하는 협력**이 필요하다. 어느 쪽이든 핵심 기술을 제대로 확보하려면 고객과의 협력이 필수다.

### 3.2.1 덱 표현 (2026-10-10, 사용자 지시 "FDP만 강조하지 말고, 정도는 달라도 다섯 기술 모두 고객 협력이 필요함을 강조")

덱 2장은 3.2 판정의 결합도 + 스펙 비완결도 합(0~4)을 "고객 협력의 깊이" 막대로 그린다: FDP 4(공동 설계) · Mixed Media 3 · Confidential Storage 2 · Large Mapping 2 · Multi-Tenant QoS 2 · Fault Tolerant 0(SSD 안에서). 메시지는 "6개 중 5개가 고객 협력이 필요하고, 깊이만 다르다"(⚠️ 점수는 정성). 덱: [ssd-future-ready-strategy-outline.md](../../outputs/presentation/ssd-future-ready-strategy-outline.md) v3.6.

### 3.3 "지금까지와 다른 방식"이 뜻하는 것 (FDP에 한해)

| | 스펙으로 협력 (5기술, 지금 방식의 연장) | 공동 설계 (FDP) |
|---|---|---|
| 요구의 출처 | 고객 사양서 · OCP 요구 ID · VoC 수치 | 고객 애플리케이션의 데이터 수명 분포와 쓰기 흐름 |
| 우리가 바꾸는 것 | SSD 펌웨어 | SSD 정책(RU · RUH · RG · GC) + 고객 SW의 분류(오픈소스 기여 포함) |
| 검증 | 사내 인증 → 고객 인증 | 고객 워크로드 안에서 함께 측정 · 반복(WAF) |
| 경쟁 우위의 원천 | 매체 · 컨트롤러 | 고객 SW와 맞물린 배치 정책 |

### 3.4 판단 변경 기록

- **v1(2026-10-06 오전)**: 4기준(고객만 아는 정보 · 고객 SW 변경 · 표준 공백 · 고객 환경 검증) 0~8점, Mixed Media 8 · FDP 7을 공동 설계 필수로 선정. **한계**: "고객 SW가 바뀌어야 하나"를 협력 필수의 근거로 셌다. 그러나 고객 SW가 바뀌어야 해도 **인터페이스와 목표가 명확하면 따로 개발할 수 있다**(사용자 지적).
- **v2(2026-10-06)**: 축을 "결합도 × 스펙 비완결도"로 바꿨다. Mixed Media는 결합도가 높지만 스펙으로 닫혀 **스펙으로 협력**으로, FDP만 **공동 설계 필수**로 남았다. Mixed Media의 2026-10-03 "고객 협력 과제" 분류([mixed-media-ssd.md](mixed-media-ssd.md) §0)도 같은 날 정정했다.
- **한계**: 축의 점수는 정성적이다. Fault Tolerant는 "부분 고장을 호스트와 나눠 처리"하는 흐름(Micron C7, SNIA SDC 2026 C8)이 커지면 결합도가 오른다. Mixed Media는 **QLC 네임스페이스에 FDP를 결합하는 순간** 그 부분이 FDP의 공동 설계 범위에 들어간다.

## 4. 쓰면 안 되는 문장

| 문장 | 이유 |
|---|---|
| "6가지 기술만 확보하면 모든 데이터센터 요구에 대응한다" | 지금 보이는 응용 기준의 목록이다. 예측 가능한 범위 안의 준비 |
| "Mixed Media는 한 드라이브에서 WAF 1.02를 달성했다" | 1.02는 별도 캐시 드라이브 구성(CSAL)의 값 |
| "Mixed Media는 고객과 공동 설계해야 완성된다" | v2에서 정정: 결합도는 높지만 표준 네임스페이스와 수치 목표(비율 · QoS)로 스펙이 닫힌다 |
| "FDP를 지원하면 WAF가 1이 된다" | 같은 "FDP 지원" 스펙에서도 장치 · 분류에 따라 붕괴한다(WARP D-04) |
| "Large Mapping은 DRAM을 1/16로 줄인다" | 매핑 DRAM 산술(엔트리 4B 가정)의 비율이며, 작은 쓰기 비용(최대 16배 재기록)이 함께 온다 |
| "Muse가 기밀 스토리지를 쓴다" | Confidential VM은 예고 단계(AV-05 🟡) |

## 5. 연결

- 응용 · 포트폴리오: [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)
- 기술별 상세: [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md) · [mixed-media-ssd.md](mixed-media-ssd.md) · [fdp-placement-mechanics.md](fdp-placement-mechanics.md) · [high-dwpd-operating-point.md](high-dwpd-operating-point.md)
- 해법 사다리(왜 고객 시스템까지): [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
- 주요 DC 기업의 자체 SSD · 공동 설계(2026-10-07): [datacenter-in-house-ssd-co-design.md](datacenter-in-house-ssd-co-design.md)
- 출하 시 구성의 경계(RUH · RG · SLC 비율): [ssd-configurability-boundary.md](ssd-configurability-boundary.md)
- 파라미터 민감도 시뮬레이션(RU 크기 · RUH 수 · 분류 정확도, 덱 5장): [fdp-parameter-sensitivity-simulation.md](fdp-parameter-sensitivity-simulation.md)
- 보안 한 장(2026-10-10, 덱 5장): 온프렘 AI의 가중치 · 기업 데이터 보안 수요와 Confidential Storage 기술 요소 × 고객 협력: [onprem-ai-confidential-storage.md](onprem-ai-confidential-storage.md)
- 후보 검토 이력(보안 · GPU 직결 · 전력): [ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
