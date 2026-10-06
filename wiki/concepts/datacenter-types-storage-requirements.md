---
type: concept
last_reviewed: 2026-10-06
sources:
  - sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md
  - sources/articles/datacenter-types-storage-requirements-2026-10.md
  - sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md
  - sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md
---

# 데이터센터 유형별 스토리지 요구: 범용 클라우드 · AI 학습 · AI 추론 · 에이전트

하이퍼스케일러는 한 종류의 데이터센터를 운영하지 않는다. 기존 범용 클라우드, AI 학습, AI 추론, 그리고 2026년 하반기 등장한 **항상 켜진 개인 에이전트**(Meta Muse, OpenAI dots) 서비스가 서로 다른 스토리지 요구를 만든다. Google은 8세대 TPU를 학습용(8t)과 추론용(8i)으로 나누며 "인프라 요구가 갈라졌다"고 밝혔다(✅). 근거 원장은 [datacenter-types-storage-requirements-2026-10.md](../../sources/articles/datacenter-types-storage-requirements-2026-10.md)(DT)와 [agent-vm-and-cloud-ssd-requirements-2026-10.md](../../sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md)(AV · CQ · AT, 2026-10-06 팩트 체크)다.

> 사용자 요청(2026-10-03): "하이퍼스케일러 데이터센터의 종류가 다양하고, AI 수요용뿐 아니라 이전부터 제공하던 데이터센터와 Muse · Dot 같은 에이전트를 서비스하는 데이터센터가 어떻게 다르고 스토리지 관점에서 어떻게 다른 요구가 있는지 배경 슬라이드에 시각적으로."
>
> 사용자 지적(2026-10-06): "Muse 같은 에이전트는 사용자별 VM을 제공하는 수준이라 KV 캐시와 다른 워크로드의 용량이 필요하고, 고DWPD 가정은 맞지 않아 보인다. 팩트 체크 후 업데이트. 일반 고용량 QLC가 적절할 수 있다." → **§0 정정**으로 반영.

## 0. 정정 (2026-10-06): 에이전트 VM은 고DWPD가 아니라 용량이다

2026-10-03판은 에이전트를 "문맥이 길고 상태가 남는다 → 고DWPD · 고용량"으로 읽었다. 팩트 체크 결과 이 독해는 **두 계층을 섞은 것**이었다.

| 계층 | 사실 | 판정 |
|---|---|---|
| **에이전트 VM 디스크** (사용자별 영속 볼륨) | Muse = Cloud Hypervisor VM, 영속 영역은 `/home` Btrfs **100GiB**(zstd 강제 압축), 관측 사용 0.6~1.7GB(AV-01~AV-04, 제3자 관측 ✅/🟡) · dots VM 9코어 · 9.73GB · **32GB**(AV-07 🟡) · 에이전트는 "**대부분의 시간을 휴면**"(Google, AV-19 ✅) · 휴면 상태는 **diff · 압축 스냅샷으로 오브젝트 스토리지**에(E2B · Agent Substrate 코드, AV-14 · AV-15 · AV-17 ✅) · 디스크 쓰기량 · DWPD 공개 측정은 **없음**(AV-32) | **용량 · TB당 비용이 요구.** 고DWPD 근거 없음 → 고용량 QLC |
| **에이전트 추론의 KV 캐시 계층** | 에이전트 호출당 입력 67,818 토큰(DT-42) · KV 계층 실측 3.2 DWPD(D-03) · "Agentic AI Storage"로 출시된 Kioxia CM9 = TLC **3 DWPD**(AV-41 🟡) · TrendForce가 Agentic AI 대응으로 SLC · XL-Flash 언급(AV-40 🟡) | 고DWPD 수요는 **여기**서 나온다. 데이터센터 유형으로는 **AI 추론**에 속한다 |

- **남는 불확실성(신호)**: Google Agent Substrate는 스냅샷을 로컬 SSD에 계층화하는 것을 로드맵에 올렸다(AV-18). 휴면 1,000개 호스트에서 스냅샷이 로컬 SSD로 간다고 가정하면 0.3~17 DWPD 범위가 나오지만(AV-28 ⚠️), 가정 의존이 크고 공개 측정은 없다. → 고내구 TLC 칸은 **점선(신호)** 으로만 둔다.
- **기동 버스트**: 대량 기동 때 컨테이너 이미지 압축 해제로 "severe disk contention"(AV-19 ✅) → 고성능 TLC는 점선(신호).
- **용량 수치의 성격**: "1억 명 × 100GB = 10EB"(DT-5B)는 **할당 기준 상한**이다. 실사용은 할당의 0.6~1.7%로 관측됐고(AV-30 ⚠️), 샌드박스 디스크가 1~20GB인 플랫폼도 많다(AV-16 · AV-22 · AV-23 · AV-24). 벤더 진술은 용량 쪽이다: Micron "storage racks for rapidly expanding context store"(AV-42), SK hynix 고용량 QLC eSSD(AV-44), Samsung 에이전트 AI 확산 속 QLC 출하 2배 · 256TB(AV-45, 인과 문장은 없음).

## 1. 비교표 (차트용 지표)

| 유형 | 하는 일 | 스토리지 요구를 보여 주는 데이터 | 등급 | 이어지는 기술 |
|---|---|---|---|---|
| **범용 클라우드** | VM · DB · 웹 · 객체 · 블록 저장, 여러 고객이 한 서버의 SSD를 나눠 씀 | 실사용 쓰기 0.07~0.23 DWPD(Microsoft SSD 50만 대, CU-13a ⚠️) · NetApp 중앙값 0.36(CU-15) · 드라이브 대역 활용률 8.0~27.8%(CQ-17 ✅) · **공유 SSD를 하드웨어로 격리하면 p99 지연 최대 3.1배 감소**(FlashBlox, Microsoft 워크로드, CQ-10 ✅) · 이웃 테넌트 쓰기로 WAF 1.28 → 약 3.0(WARP FAST'26, CQ-16 ✅) · 로컬 디스크 p99.9 > 1ms(GC, MX-34 ✅) · 블록 스토리지는 쓰기 우세(쓰기:읽기 3:1, CQ-25) | ✅ / 🟡 / ⚠️ | **기존 SSD 기술(범용 TLC · QLC)로 대응**, 요구는 멀티테넌트 QoS · 격리 → [Mixed Media](mixed-media-ssd.md)의 네임스페이스 QoS |
| **AI 학습** | 데이터 로딩 · 체크포인트 | DGX SuperPOD 가이드 GPU당 읽기 · 쓰기 기본 0.16 · 0.08 → 멀티모달(Enhanced) 0.49 · 0.24 GB/s(약 3배, DT-24 ⚠️) · "체크포인트를 다 쓸 때까지 학습이 멈춘다"(DT-23) · 405B 체크포인트 1회 약 5.67TB(DT-28 ⚠️) · 체크포인트 간격 "수 시간 → 수 분"(DT-26 ✅) · GB200 NVL72 랙 120~132kW | 🟡 / ✅ + ⚠️ | 데이터 로딩 = **고성능 TLC**, 체크포인트 간격이 짧아지면 **고내구 TLC**(신호), 데이터셋 = 고용량 QLC · [고용량](high-capacity-fault-tolerance.md) |
| **AI 추론** | 질의 응답 · KV 캐시 오프로드 | KV 계층 실측 3.2 DWPD(D-03) 대 QLC 정격 0.6 · AI 전용 SSD 50~120 DWPD · CMX 대상 드라이브는 모두 TLC(1~3 DWPD) · 반대 신호: KV 오프로드 읽기 99.5%(학계 트레이스) · 읽기 위주 추론은 QLC 0.3~1 DWPD로 충분하다는 구매 가이드(E03 🟡) | 🟡 / ✅ / ⚠️ | 쓰기량에 따라 **SLC급(신호) · 고내구 TLC · 고성능 TLC · 읽기 위주면 QLC(신호)** → [고DWPD](high-dwpd-operating-point.md) |
| **에이전트** | 항상 켜진 개인 에이전트, **사용자별 VM** | §0 표 · Muse VM 메모리 7.75GB 대 디스크 100GB(디스크가 약 13배, AV-31 ⚠️) · 에이전트는 대부분 휴면 · 휴면 상태는 압축 스냅샷으로 오브젝트 스토리지 · 1억 명 × 100GB = 10EB(할당 기준, DT-5B ⚠️) | ✅ / 🟡 / ⚠️ | **고용량 QLC**(사용자 VM 디스크 · 상태), 기동 버스트에 고성능 TLC(신호). 고DWPD는 VM이 아니라 추론의 KV 캐시 계층 |

## 1.5 SSD 제품 포트폴리오 (덱 1장 매트릭스, 2026-10-06)

요구 DWPD가 낮아질수록 최대 용량이 커진다. 응용마다 필요한 제품군의 조합이 다르므로 하나의 제품으로 모든 응용에 대응할 수 없다. ■ = 지금 쓰는 곳, ▢ = 신호에 따라 쓰일 곳.

| 제품군 (정격 DWPD · 최대 용량, 공개 사양) | 범용 클라우드 | AI 학습 | AI 추론 | 에이전트 |
|---|---|---|---|---|
| **SLC급** 30~120 · ≤ 3.2TB (Kioxia FL6 3.2TB 60 · Micron XTR 1.92TB 35 · Solidigm P5810 50 · DapuStor X5 120) | | | ▢ 초고DWPD KV | |
| **고내구 TLC** 3 · ≤ 12.8TB (Solidigm PS1030 12.8TB · Kioxia CM9 25.6TB 3 DWPD 샘플 예정 AV-41) | | ▢ 체크포인트 | ■ KV 쓰기가 많을 때 | |
| **고성능 · 범용 TLC** 1 · ≤ 15.36TB (Solidigm PS1010 · Samsung PM1743) | ■ VM · DB 블록 | ■ 데이터 로딩 | ■ KV 계층(CMX) | ▢ 기동 버스트 |
| **고용량 QLC** 0.3~0.6 · ≤ 245TB (Kioxia LC9 245.76TB 0.3 · Solidigm P5336 122.88TB 0.6) | ■ 객체 · 콜드 데이터 | ■ 데이터셋 | ▢ 읽기 위주 KV | ■ 사용자 VM 디스크 · 상태 |

- **고내구는 하나가 아니다**: 같은 "쓰기가 많은" 요구도 필요한 DWPD에 따라 SLC급(30+) · 고내구 TLC(3) · 범용 TLC(1)로 갈리고, 고객이 쓰기를 모아 주거나(Mixed Media) 수명별로 나눠 주면(FDP) QLC도 후보가 된다. Meta 플래시 캐시는 QLC가 탄소 최적이라는 분석도 있다(FairyWREN, CU-10).
- 최대 용량은 같은 TLC 플랫폼에서도 OP로 갈린다: Solidigm PS1010 1 DWPD 15.36TB 대 PS1030 3 DWPD 12.8TB.

## 2. Muse와 Dot

- **Meta Muse**(2026-09-08): Muse Spark 1.3 기반 자율 개인 에이전트. 앱을 닫아도 계속 일하고 기억을 유지한다. 사용자마다 전용 · 격리된 영속 Linux 클라우드 컴퓨터(Muse Secure VM). 관측 사양 2 vCPU · 8GB · 100GB SSD(공식 여부 충돌 ⚠️) (DT-01~DT-04 🟡)
- **OpenAI dots**(2026-09-29 DevDay): GPT-6 Astra 기반 "always-on" 에이전트. 각 dot이 파일 · 세션을 보관하는 자기 클라우드 컴퓨터와 브라우저를 가진다. "많은 컴퓨트를 쓰기 때문에" Pro 요금제부터(DT-05~DT-07 🟡)
- 혼동 주의: Microsoft Muse(2025 게임 모델), Unity Muse, New Computer Dot(2025-10 종료)은 다른 것이다(DT-09)

## 3. 스토리지 관점의 독해 (⚠️ 과제팀 판단, 2026-10-06 갱신)

- **범용**은 쓰기가 적어 기존 SSD 기술(범용 TLC · QLC)로 대응할 수 있다. 그러나 여러 고객이 한 SSD를 나눠 쓰므로 **멀티테넌트 QoS · 격리**는 여전히 중요한 요구다. 이웃 테넌트의 쓰기는 지연뿐 아니라 WAF(내구 소비)로도 번진다(CQ-16).
- **AI 학습**은 데이터가 캐시보다 크면 GPU당 대역이 약 3배 필요하다 → 고성능 TLC. 체크포인트 간격이 짧아지면 쓰기 피크와 내구가 함께 문제가 된다 → 고내구 TLC는 신호.
- **AI 추론**의 KV 캐시는 쓰기량에 따라 SLC급부터 QLC까지 답이 갈린다. 고DWPD는 준비하되 단일 베팅은 하지 않는다.
- **에이전트**는 사용자별 VM이고 대부분 휴면이다 → 용량 · TB당 비용이 요구이고 고용량 QLC가 맞다. 에이전트가 키우는 고DWPD 수요는 VM이 아니라 추론의 KV 캐시 계층에서 나온다. 에이전트 전용 데이터센터를 따로 짓는다는 하이퍼스케일러 진술은 없다(DT 부정 확인).
- **결론**: 다양한 데이터센터 응용에 대응하려면 SLC부터 QLC까지 다양한 제품 포트폴리오가 필요하다. 지금 예측할 수 있는 범위 안의 준비다.

## 4. 쓰면 안 되는 문장

| 문장 | 이유 |
|---|---|
| "하이퍼스케일러가 에이전트 전용 데이터센터를 짓는다" | 그런 진술 없음 |
| "Muse는 사용자당 100GB SSD를 공식 제공한다" | 관측치, 공식 여부 충돌 |
| "에이전트는 채팅보다 42배 많이 쓴다(쓰기)" | 42배는 요청당 입력 토큰 비교(서비스 · 연도 다름), 쓰기량이 아니다 |
| "하이퍼스케일 데이터의 87%가 HDD" | 원출처 확인 실패 |
| "에이전트 VM은 고DWPD SSD가 필요하다" | 에이전트 VM 디스크의 쓰기량 · DWPD 공개 측정 없음(AV-32), 대부분 휴면 · 스냅샷은 오브젝트 스토리지(AV-19 · AV-17). 고DWPD 근거는 KV 캐시 계층에만 있다 |
| "에이전트 1억 명이 10EB의 SSD를 쓴다" | 할당 기준 상한(DT-5B). 관측 실사용은 할당의 0.6~1.7%(AV-30) |
| "OCP 사양이 멀티테넌트 QoS 수치를 요구한다" | QoS 표 원문 확보 실패(F-01) |

## 5. 연결

- 근거 원장(2026-10-06 팩트 체크): [agent-vm-and-cloud-ssd-requirements-2026-10.md](../../sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md)
- 세 기술: [mixed-media-ssd.md](mixed-media-ssd.md) · [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md) · [high-dwpd-operating-point.md](high-dwpd-operating-point.md)
- 고객 측 고DWPD 근거(Meta CacheLib 150% · -44%): [ssd-customer-high-dwpd-evidence-2026-10.md](../../sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
