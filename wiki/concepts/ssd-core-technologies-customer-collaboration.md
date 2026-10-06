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
---

# 제품 포트폴리오를 받치는 핵심 기술 6가지와 고객 협력 강도

[datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)가 "데이터센터 응용마다 SSD 요구가 달라 SLC급부터 고용량 QLC까지 포트폴리오가 필요하다"까지 세웠다면, 이 페이지는 **그 포트폴리오를 만드는 데 필요한 핵심 기술 6가지**를 제품군에 연결하고, 기술마다 **고객 협력이 얼마나 필요한지**를 같은 기준으로 판단한다. 덱 2장(고객 협력 전략 v1.4)의 단일 소스다.

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

## 3. 고객 협력 강도: 판단 기준과 점수 (⚠️ 과제팀 판단)

### 3.1 기준 4가지 (각 0~2점, 합계 0~8)

| 기준 | 질문 | 0 | 1 | 2 |
|---|---|---|---|---|
| **A 고객만 아는 정보** | 제품이 제대로 동작하려면 고객만 아는 정보가 필요한가 | SSD가 안다 | 요구 사양 수준(SLO · 정책) | 데이터 단위 정보(수명 · 쓰기 크기 · 종류) |
| **B 고객 SW 변경** | 고객 소프트웨어가 바뀌어야 효과가 나는가 | 바뀌지 않아도 됨 | 설정 · 연동 수준 | 애플리케이션이 데이터를 나눠 보내야 함 |
| **C 표준 공백** | 메커니즘과 정책을 표준이 정해 주는가 | 표준이 정책까지 정함 | 메커니즘은 표준, 정책은 공백 | 메커니즘도 정책도 공백 |
| **D 고객 환경 검증** | 고객 워크로드 없이 검증할 수 있는가 | 사내에서 검증 가능 | 일부 고객 환경 필요 | 고객 워크로드에서만 효과가 측정됨 |

### 3.2 점수

| 핵심 기술 | A | B | C | D | **합계** | 판정 | 한 줄 이유 (근거) |
|---|---|---|---|---|---|---|---|
| Fault Tolerant | 0 | 0 | 1 | 0 | **1** | SSD 안에서 | 고장 정보는 SSD가 안다. 다이 · 플레인 격리와 패리티는 SSD 안에서 완결(C4 · C5). OCP 로그에 다이 고장 허용 필드는 있으나 요구 최소값은 미확인(C1 · N8) |
| Large Mapping | 1 | 1 | 1 | 1 | **4** | 요구 사양 · 가이드로 협력 | 쓰기를 IU에 맞추면 WAF가 오르지 않는다(MX-13). 호스트 스택은 4KB에 맞춰져 있어 정렬 가이드가 필요하지만, 정렬 규칙 자체는 단순하다 |
| Multi-Tenant QoS | 1 | 0 | 1 | 1 | **3** | 요구 사양 · 표준으로 협력 | 고객의 SLO를 받고 격리는 SSD 안에서 한다. NVM Set · 네임스페이스는 표준(B12), OCP는 지연 백분위 표를 둔다(B07) |
| Confidential Storage | 1 | 1 | 0 | 1 | **3** | 표준으로 협력 | 키 · 증명 정책은 고객이 갖지만 Caliptra · SPDM · TDISP · L.O.C.K. 표준이 정한다. Samsung은 이미 L.O.C.K. 공저자다(ST-26) |
| **Mixed Media** | 2 | 2 | 2 | 2 | **8** | **고객과 공동 설계 필수** | 어떤 쓰기가 작은지 고객 SW만 알고, 고객 SW가 pSLC 네임스페이스로 보내야 효과가 난다. pSLC 비율 · destage 정책 표준은 없고(MX-01 VoC로 고객이 직접 요구), 꼬리 지연은 고객 워크로드에서만 측정된다 |
| **FDP** | 2 | 2 | 1 | 2 | **7** | **고객과 공동 설계 필수** | 데이터 수명은 고객 SW만 안다. 애플리케이션이 RUH를 태깅해야 효과가 나고(CacheLib · LMCache 코드 변경), TP4146은 메커니즘만 정하며 RUH · RG 정책은 공백이다. WAF는 워크로드에 달렸다 |

**선정 기준**: 합계 6 이상 = 고객과 공동 설계 필수(지금까지의 "사양 받고 → SSD 안에서 구현 → 인증" 방식으로는 제품이 완성되지 않는다). 3~5 = 요구 사양 · 표준으로 협력(지금 방식의 연장). 0~2 = SSD 안에서.

**선정 결과**: **Mixed Media(8) · FDP(7).** 두 기술 모두 **"데이터에 대한 정보는 고객 SW에 있고, 효과는 고객 SW가 바뀌어야 난다"** 는 같은 성질을 가진다. 이것이 덱 3장(NAND → SSD → 고객 시스템)과 4장(계약 · 사람 · 역량)의 출발점이다.

### 3.3 "지금까지와 다른 방식"이 뜻하는 것

| | 지금까지 (사양 기반) | 필수 협력 기술 (공동 설계) |
|---|---|---|
| 요구의 출처 | 고객 사양서 · OCP 요구 ID | 고객 애플리케이션의 데이터 흐름(수명 · 쓰기 크기 · 종류) |
| 우리가 바꾸는 것 | SSD 펌웨어 | SSD 펌웨어 + 고객 SW(오픈소스 기여 포함) |
| 검증 | 사내 인증 → 고객 인증 | 고객 워크로드 안에서 함께 측정(WAF · 꼬리 지연) |
| 경쟁 우위의 원천 | 매체 · 컨트롤러 | 고객 SW 안의 배치 정책(RUH · RG · destage) |

### 3.4 판단의 한계

- 점수는 과제팀 판단이다. 근거 사실은 각 칸에 인용했지만 가중치와 경계(6점)는 정성적이다.
- Fault Tolerant는 지금은 SSD 안에서 완결되지만, "부분 고장을 호스트와 나눠 처리"하는 방향(Micron "수직 통합 복원력" C7, SNIA SDC 2026 Leil C8)이 커지면 B · D가 올라간다. **신호로 본다.**
- Large Mapping은 고객이 쓰기를 IU에 맞추지 못하면 WAF 비용이 크다(16배 하한). Mixed Media와 결합하면(작은 쓰기를 pSLC가 흡수) 협력 강도가 Mixed Media 쪽으로 옮겨 간다.
- Confidential Storage는 표준 기반이지만, 에이전트 기밀 VM이 스토리지 증명을 실제로 요구하는지(Meta Muse Confidential VM의 구현)는 아직 공개되지 않았다(AV-05 🟡).

## 4. 쓰면 안 되는 문장

| 문장 | 이유 |
|---|---|
| "6가지 기술만 확보하면 모든 데이터센터 요구에 대응한다" | 지금 보이는 응용 기준의 목록이다. 예측 가능한 범위 안의 준비 |
| "Mixed Media는 한 드라이브에서 WAF 1.02를 달성했다" | 1.02는 별도 캐시 드라이브 구성(CSAL)의 값 |
| "Large Mapping은 DRAM을 1/16로 줄인다" | 매핑 DRAM 산술(엔트리 4B 가정)의 비율이며, 작은 쓰기 비용(최대 16배 재기록)이 함께 온다 |
| "Muse가 기밀 스토리지를 쓴다" | Confidential VM은 예고 단계(AV-05 🟡) |

## 5. 연결

- 응용 · 포트폴리오: [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)
- 기술별 상세: [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md) · [mixed-media-ssd.md](mixed-media-ssd.md) · [fdp-placement-mechanics.md](fdp-placement-mechanics.md) · [high-dwpd-operating-point.md](high-dwpd-operating-point.md)
- 해법 사다리(왜 고객 시스템까지): [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
- 후보 검토 이력(보안 · GPU 직결 · 전력): [ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
