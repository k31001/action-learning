---
type: concept
last_reviewed: 2026-10-10
sources:
  - sources/articles/ai-inference-ssd-requirements-samsung-lineup-2026-10.md
  - sources/articles/qlc-waf-qos-op-factcheck-2026-10.md
---

# AI 추론 스토리지 수요: 하위 수요 × SSD 요구 × 핵심 기술 × 고객 협력 (2026-10-10)

> 사용자 지시(2026-10-10): "AI 추론 수요에는 다양한 응용들이 혼재되어 있어. 모델 파라미터, RAG/Vector DB, KV Cache offloading 등 추론 수요를 세분화하고, 각 추론 수요마다 필요한 핵심 요구사항들을 도출하고, 그 요구사항들을 만족시키기 위한 핵심 기술들이 매핑되고, 고객 협력이 필요한 정도를 표현." 또 "AI 추론 수요에 DWPD도 중요하지만 tail latency, read bandwidth도 굉장히 중요한 특성인데 DWPD만 표현된 것 같아서 생각이 치우친 느낌."
>
> 근거 원장: [ai-inference-ssd-requirements-samsung-lineup-2026-10.md](../../sources/articles/ai-inference-ssd-requirements-samsung-lineup-2026-10.md)(IR-A · B · C · D). 덱: [ssd-future-ready-strategy-outline.md](../../outputs/presentation/ssd-future-ready-strategy-outline.md) v4.0 1장(추론 카드) · 2장.

⚠️ **등급**: 이번 수집은 프록시가 대부분의 원문 사이트를 막아 새 수치가 거의 모두 🟡(검색 요약)이다. 요구 · 기술 매핑과 협력 단계는 과제팀 판단이다.

## 1. AI 추론은 DWPD 하나가 아니다: 세 지표

| 지표 | 대표 수치 | ID · 등급 |
|---|---|---|
| **읽기 대역** | 70B · 128K 토큰 KV ≈ 43GB를 1초 안에 복원 → 서버 약 43GB/s · **GPU당 약 5.4GB/s**(450ms 목표면 약 95GB/s) | IR-A31 ⚠️ 산술 |
| | 재계산보다 빠르려면 1K 토큰 23.2GB/s → 80K 토큰 3.5GB/s, 8K 토큰 미만은 측정된 스토리지가 GPU prefill을 이기지 못함 | IR-A30 🟡 |
| | 405B BF16 ≈ 810GB를 PM1763 1대로 약 28.5초, PM1753 1대로 약 55.9초 | IR-A11 ⚠️ 산술 |
| **꼬리 지연** | MLPerf p99 목표: Llama 2 70B 대화형 첫 토큰 450ms · 토큰당 40ms, Llama 3.1 405B 6s · 175ms | IR-A37 🟡 |
| | p99 TTFT SLO 아래 SSD 계층 추가 시 GPU당 세션 10.77배 | IR-A40 🟡 |
| | SSD 지연 흔들림 · 큐잉이 TTFT를 키움, 개선 시 −78.3%(Tutti) | IR-A34 🟡 |
| | NVIDIA Storage-Next: "전력 · 테일 지연 제약 아래" GPU당 512B IOPS 최대화(약 2억 IOPS) | IR-A45 🟡 |
| **쓰기 내구** | KV 계층 드라이브 실측 3.2 DWPD, AI 전용 SLC급 30~120 DWPD, TLC KV 드라이브 1~3 DWPD | D-03 🟡 · IR-D01~D10 🟡 |

→ 덱 1장 AI 추론 카드는 "쓰기 내구(DWPD)" 하나에서 **읽기 대역 5.4GB/s · 꼬리 지연 p99 450ms · 쓰기 내구 3.2 DWPD** 세 줄로 바꿨다(v4.0).

## 2. 하위 수요 네 가지 × 핵심 요구

● 핵심 · ○ 해당 (⚠️ 과제팀 판단, 근거는 원장 §0-A · §A)

| 하위 수요 | 지배 I/O | 읽기 대역 | 꼬리 지연 | 쓰기 DWPD | 용량 · $/TB | 격리 · 보안 | 대표 근거 |
|---|---|---|---|---|---|---|---|
| 모델 가중치 (로딩 · 교체) | 대블록 순차 읽기 버스트 | ● | ○ | | ● | ○ | 8B 1GB/s SSD 48초 → 스트리머 14초 · 4GB/s SSD 7.5초(IR-A01), 70B 기동 37초(IR-A03 ✅), 가중치 보호는 [onprem-ai-confidential-storage.md](onprem-ai-confidential-storage.md) |
| RAG · Vector DB | 4KB급 랜덤 읽기, 쿼리당 다회 | ○ | ● | | ● | ○ | DiskANN 10억 점 · 평균 3ms 미만(IR-A20), 쿼리 지연의 70~90%가 I/O(IR-A23) |
| KV 캐시 오프로드 | 대블록 읽기 + 상시 쓰기 | ● | ● | ● | ○ | | IR-A30 · A31 · A37 · A40, PM9D3a FDP LMCache WAF 2.600 → 1.425 · 읽기 p90 −22%(IR-A53) |
| 에이전트 메모리 | append 로그 · 스냅샷 쓰기 | | ○ | ○ | ● | ● | 호출당 입력 67,818 tok · 재사용 85.7%(DT-42), 재개 500ms 미만(DT-54) |

## 3. 요구 → 핵심 기술 → 고객 협력 단계

협력 단계는 [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3.5(① 고객 시스템 개발 · ② 최적화까지 함께).

| 하위 수요 | 핵심 기술 | 협력 단계 | 이유 |
|---|---|---|---|
| 모델 가중치 | Large Mapping · Confidential Storage · Fault Tolerant | **① 개발** | 큰 용량을 싸게(매핑 DRAM ↓), 가중치 보호는 고객 키 · 증명 체계 연동, 고장 격리는 SSD 안 |
| RAG · Vector DB | FDP · Multi-Tenant QoS · Large Mapping | **② 최적화** | 색인 갱신 쓰기의 GC가 랜덤 읽기 꼬리를 키우지 않게 수명별 배치, 테넌트 격리 |
| KV 캐시 오프로드 | FDP · Mixed Media · Large Mapping | **② 최적화** | 대역 · 꼬리 · DWPD를 동시에: KV 관리자(LMCache · Dynamo)와 배치 · pSLC 비율을 함께 맞춤 |
| 에이전트 메모리 | Mixed Media · Multi-Tenant QoS · Confidential Storage | **② 최적화** | 작은 로그 쓰기를 pSLC에 모아 QLC로, 사용자 격리 · 보안 |

**결론(덱 2장)**: 네 가지 추론 수요 모두 고객 시스템 개발이 필요하고, 세 가지는 최적화까지 함께 해야 한다 → **AI 추론 수요에 대응하려면 고객과의 협업이 필수.**

## 4. 한계

- 모델 가중치 로딩의 GPU당 GB/s 요구, RAG 스토리지의 쿼리당 I/O 수 · p99를 공개한 자료는 찾지 못했다(원장 §E).
- KV 캐시 계층에서 GC가 p99 TTFT 스파이크를 만든 직접 측정은 없다. "GC ↓ → TTFT 꼬리 ↓"는 RocksDB · CacheLib 등 다른 워크로드의 결과로 유추한다(⚠️).
- 에이전트 메모리를 Mixed Media로 묶은 것은 작은 쓰기 패턴에 근거한 판단이며, 에이전트 VM 디스크의 쓰기량 공개 측정은 없다.

## 5. 연결

- 협력 단계 기준: [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3.5
- 지표 개선 · 포트폴리오 확장(덱 3장): [ssd-portfolio-expansion-co-design.md](ssd-portfolio-expansion-co-design.md)
- 응용별 요구 · 포트폴리오: [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)
- 수요 규모: [essd-demand-by-application-2030.md](essd-demand-by-application-2030.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
