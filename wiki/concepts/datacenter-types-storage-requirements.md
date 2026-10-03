---
type: concept
last_reviewed: 2026-10-03
sources:
  - sources/articles/datacenter-types-storage-requirements-2026-10.md
  - sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
---

# 데이터센터 유형별 스토리지 요구: 범용 클라우드 · AI 학습 · AI 추론 · 에이전트

하이퍼스케일러는 한 종류의 데이터센터를 운영하지 않는다. 기존 범용 클라우드, AI 학습, AI 추론, 그리고 2026년 하반기 등장한 **항상 켜진 개인 에이전트**(Meta Muse, OpenAI dots) 서비스가 서로 다른 스토리지 요구를 만든다. Google은 8세대 TPU를 학습용(8t)과 추론용(8i)으로 나누며 "인프라 요구가 갈라졌다"고 밝혔다(✅). 근거 원장은 [datacenter-types-storage-requirements-2026-10.md](../../sources/articles/datacenter-types-storage-requirements-2026-10.md)(DT)다.

> 사용자 요청(2026-10-03): "하이퍼스케일러 데이터센터의 종류가 다양하고, AI 수요용뿐 아니라 이전부터 제공하던 데이터센터와 Muse · Dot 같은 에이전트를 서비스하는 데이터센터가 어떻게 다르고 스토리지 관점에서 어떻게 다른 요구가 있는지 배경 슬라이드에 시각적으로."

## 1. 비교표 (차트용 지표)

| 유형 | 하는 일 | 스토리지 요구를 보여 주는 데이터 | 등급 | 이어지는 기술 |
|---|---|---|---|---|
| **범용 클라우드** | VM · DB · 객체 · 블록 저장 | 서버 내용연수 4 → 6년, 건물 15 → 25년(Microsoft FY27) · 스토리지 = Azure 운영 배출 33% · 최빈 랙 11kW · 저장 EB의 약 80%가 HDD(파생) · 블록 스토리지는 쓰기 우세 | ✅ / 🟡 / ⚠️ | [Mixed Media](mixed-media-ssd.md) |
| **AI 학습** | 모델 학습 · 체크포인트 | GB200 NVL72 랙 120~132kW · 405B 체크포인트 1회 약 5.67TB(14B/파라미터 산술) · DGX SuperPOD 가이드 GPU당 읽기 0.49 · 쓰기 0.24 GB/s(파생) · 장애가 수 시간 간격 → 체크포인트 수 분~수 시간 간격 | 🟡 / ✅ + ⚠️ | [고용량](high-capacity-fault-tolerance.md) |
| **AI 추론** | 질의 응답 · KV 캐시 오프로드 | CMX GPU당 최대 16TB · KV 오프로드 읽기:쓰기 186:1(학계 트레이스) · KV 계층 실측 3.2 DWPD · 토큰당 KV 320KiB(70B) · 채팅 요청 1,632 토큰 → KV 0.53GB | 🟡 / ✅ / ⚠️ | [고DWPD](high-dwpd-operating-point.md) |
| **에이전트** | 항상 켜진 개인 에이전트, 사용자별 클라우드 컴퓨터 | Copilot 에이전트 호출당 입력 67,818 토큰(채팅의 약 42배) → KV 22.2GB(파생) · 세션당 입력 약 210만 토큰 · 캐시 재사용 85.7% · 1시간 넘는 세션 18.8% · Muse 사용자별 VM SSD 100GB(관측, 공식 여부 충돌) · Google Agent Substrate는 멈춘 에이전트 상태를 디스크 · Cloud Storage에 저장해 호스트당 1,000+ | ✅ 원데이터 + ⚠️ / 🟡 | 고DWPD · 고용량 |

## 2. Muse와 Dot

- **Meta Muse**(2026-09-08): Muse Spark 1.3 기반 자율 개인 에이전트. 앱을 닫아도 계속 일하고 기억을 유지한다. 사용자마다 전용 · 격리된 영속 Linux 클라우드 컴퓨터(Muse Secure VM). 관측 사양 2 vCPU · 8GB · 100GB SSD(공식 여부 충돌 ⚠️) (DT-01~DT-04 🟡)
- **OpenAI dots**(2026-09-29 DevDay): GPT-6 Astra 기반 "always-on" 에이전트. 각 dot이 파일 · 세션을 보관하는 자기 클라우드 컴퓨터와 브라우저를 가진다. "많은 컴퓨트를 쓰기 때문에" Pro 요금제부터(DT-05~DT-07 🟡)
- 혼동 주의: Microsoft Muse(2025 게임 모델), Unity Muse, New Computer Dot(2025-10 종료)은 다른 것이다(DT-09)

## 3. 스토리지 관점의 독해 (⚠️ 과제팀 판단)

- **범용**은 오래 쓰고 용량 중심이다 → 기존 인프라 안에서 빠른 영역을 더하는 Mixed Media.
- **AI 학습**은 랙 전력 · 공간을 컴퓨트가 가져가고 체크포인트가 대역 · 용량을 요구한다 → 같은 공간에 더 담는 고용량.
- **AI 추론**은 쓰기 요구의 신호가 엇갈린다(실측 3.2 DWPD 대 읽기 99.5%) → 고DWPD를 준비하되 단일 베팅은 하지 않는다.
- **에이전트**는 문맥이 길고(요청당 KV 약 42배) 상태가 오래 남는다(1시간+ 세션 18.8%, 사용자별 영속 VM) → 용량과 쓰기가 함께 필요하다. 다만 에이전트 전용 데이터센터를 따로 짓는다는 하이퍼스케일러 진술은 없고, 랙 전력 · 에이전트당 하루 쓰기량도 공개되지 않았다(DT 부정 확인).

## 4. 쓰면 안 되는 문장

| 문장 | 이유 |
|---|---|
| "하이퍼스케일러가 에이전트 전용 데이터센터를 짓는다" | 그런 진술 없음 |
| "Muse는 사용자당 100GB SSD를 공식 제공한다" | 관측치, 공식 여부 충돌 |
| "에이전트는 채팅보다 42배 많이 쓴다(쓰기)" | 42배는 요청당 입력 토큰 비교(서비스 · 연도 다름), 쓰기량이 아니다 |
| "하이퍼스케일 데이터의 87%가 HDD" | 원출처 확인 실패 |

## 5. 연결

- 세 기술: [mixed-media-ssd.md](mixed-media-ssd.md) · [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md) · [high-dwpd-operating-point.md](high-dwpd-operating-point.md)
- 고객 측 고DWPD 근거(Meta CacheLib 150% · -44%): [ssd-customer-high-dwpd-evidence-2026-10.md](../../sources/articles/ssd-customer-high-dwpd-evidence-2026-10.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
