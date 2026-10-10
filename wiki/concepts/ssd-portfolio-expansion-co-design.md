---
type: concept
last_reviewed: 2026-10-10
sources:
  - sources/articles/ai-inference-ssd-requirements-samsung-lineup-2026-10.md
  - sources/articles/qlc-waf-qos-op-factcheck-2026-10.md
---

# 공동 설계로 좋아지는 SSD 지표와 포트폴리오 확장: WAF · 꼬리 지연 → DWPD 영역 이동 (2026-10-10)

> 사용자 지시(2026-10-10): "고객 시스템과 공동으로 설계하고 개발한 핵심 기술을 통해 좋아지는 SSD 지표들을 보여 주고, 좋아진 지표를 활용하여 제품 포트폴리오를 어떻게 확장할 수 있는지 제안. 중요한 지표 하나는 WAF(SSD만 잘 만들어서는 해결이 어려웠던 지표), 다른 하나는 (Tail) Latency. FDP · Mixed Media · Large Mapping 등을 잘 조합하면 GC의 빈도 · 횟수 · 시간을 크게 줄여 예측 가능한 QoS를 보장하고 tail latency를 줄이는 메커니즘. 예: 0.3 DWPD QLC가 1 DWPD가 되면 TLC가 맡던 KV cache offloading까지, ultra-high DWPD가 필요하면 SLC의 WAF를 줄이거나 TLC의 WAF를 줄여서 대응. 어떤 AI 추론 수요가 등장해도 빠르게 대응할 수 있는 기술적 대비."
>
> 근거 원장: [ai-inference-ssd-requirements-samsung-lineup-2026-10.md](../../sources/articles/ai-inference-ssd-requirements-samsung-lineup-2026-10.md) §B · §C · §D, [qlc-waf-qos-op-factcheck-2026-10.md](../../sources/articles/qlc-waf-qos-op-factcheck-2026-10.md) §3. 덱: [ssd-future-ready-strategy-outline.md](../../outputs/presentation/ssd-future-ready-strategy-outline.md) v4.0 3장.

## 1. 지표 ①: WAF

| 사례 | 혼자 → 함께 | GC 재배치(WAF − 1) | ID · 등급 |
|---|---|---|---|
| CacheLib FDP(삼성 구현 · Meta 반영, 사용률 100%) | 3.22 → 1.03 (−68%) | 2.22 → 0.03 (**−98.6%**) | IR-C03 ⚠️ 파생 · KQ ✅ |
| LMCache KV 트레이스(PM9D3a FDP) | 2.600 → 1.425 | 1.600 → 0.425 (−73.4%) | IR-A53 · IR-C03 🟡 |
| RocksDB(PM9D3a FDP 최적화 분류) | 2.95 → 2.02 | 1.95 → 1.02 (−47.7%) | IR-C10 🟡 |

WAF − 1 = 호스트 쓰기 1단위당 GC가 옮기는 양(IR-C02 ⚠️ 정의에서 도출). SSD만으로는 3 근처에 머문 이유는 [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)와 덱 참고 5장(당위성, 3장에서 링크).

## 2. 지표 ②: 꼬리 지연과 GC 메커니즘

**왜 GC가 꼬리를 만드나**: 페이지 프로그램 · 블록 소거가 칩에 걸리면 뒤의 읽기가 기다린다. 평균 읽기 지연 2배(IR-C05), 소거는 블록당 약 10ms로 읽기 테일의 지배 원인, GC 유발 지연 약 10~100ms(IR-C06), 99~99.99p에서 GC 유발 지연 5~138배(TTFlash IR-C12). QLC는 프로그램 2~3ms로 TLC보다 길다(IR-C07).

**세 기술이 GC를 줄이는 방향** (⚠️ 과제팀 정리, 사용자 메커니즘 기술을 따름)

| 기술 | 하는 일 | 줄이는 것 |
|---|---|---|
| Mixed Media | 작은 랜덤 쓰기를 pSLC에 모아 QLC에는 큰 순차로만 | 블록 조각화 → **GC 빈도** |
| Large Mapping | 매핑 단위(IU)에 정렬된 큰 쓰기만 받음 | 부분 덮어쓰기(RMW) · 매핑 갱신 → **GC 횟수(추가 쓰기)** |
| FDP | 수명이 같은 데이터를 같은 블록(RUH)에 | 블록이 통째로 무효화 → 옮길 유효 데이터 → **GC 시간** |

**측정된 꼬리 개선**: PM9D3a RocksDB FDP p99.9 **−55%**(IR-C10), LMCache KV 읽기 p90 −22%(IR-C11), ZNS 99.9p 2~4배↓(IR-C13), Valet 최대 6배↓(IR-C14), WALTZ 3.02~4.73배↓(IR-C15), IO Determinism 격리 약 50배(개념 증명, IR-C17). NVMe Predictable Latency Mode는 GC를 비결정 창으로 몰아 결정 창의 지연을 보장한다(IR-C18).

**한계(반드시 함께 말할 것)**: 측정은 모두 TLC/MLC(IR-C32), QLC에서 배치로 p99가 준 공개 측정 없음. KV 캐시 계층의 GC발 p99 TTFT 스파이크 직접 측정 없음(IR-C33). GC가 아니라 칩 간 큐 불균형이 주원인이라는 반대 결과(IR-C30). FDP는 best-effort라 오분류 시 붕괴(IR-C31).

## 3. 포트폴리오 확장: WAF 3 → 1이면 같은 NAND · 같은 OP로 정격 DWPD 약 3배 (⚠️ 산술)

DWPD = P/E × (1 + OP) / (일수 × WAF)이므로 WAF만 1/3이 되면 DWPD는 3배. 높이(꼬리 지연)는 정성 등급.

| # | 제품군 · 삼성 모델 | 지금 | WAF ↓ 후 | 들어가는 수요 | 근거 |
|---|---|---|---|---|---|
| 1 | 고용량 QLC · BM1743(0.26 DWPD, 122.88TB) | 0.3 | **1** | KV 캐시 오프로드(지금 TLC 몫)에 원가 우위로 진입 | B-1 🟡 · [qlc-tlc-market-entry.md](../strategies/qlc-tlc-market-entry.md) §4.5 |
| 2 | 고성능 TLC · PM1753(1 DWPD) | 1 | **3** | 쓰기 많은 KV를 고내구 제품 없이 | B-1 🟡 |
| 3 | 고내구 TLC · PM1755 · PM1745(3 DWPD) | 3 | **9** | 초고DWPD 입구(KV SSD 내구 사양 3~9 DWPD로 흔들림, IR-D12 🟡 단일 출처) | B-1 🟡 |
| 4 | SLC급 · Z-NAND(SZ985 30 DWPD, 2018 단종 · 7세대 계획) | 30 | **약 100** | 초고DWPD KV(경쟁 P5810 50 · FL6 60 · X5 120 DWPD) | IR-D01~D07 🟡 · [high-dwpd-operating-point.md](high-dwpd-operating-point.md) |

**선택지라는 점이 핵심**: 초고DWPD 요구가 오면 SLC급의 WAF를 낮춰 극한으로 올리거나(4), TLC의 WAF를 낮춰 대응(3)할 수 있다. 요구에 따라 이전에는 대응하지 못하던 제품군에 빠르게 들어갈 **기술적 기반**이다.

## 4. 삼성 대응 현황 (덱 1장 하단)

| 제품군 | 모델(형태) | 대응 중인 수요 |
|---|---|---|
| SLC급 30+ DWPD | SZ985(HHHL, 단종) | **공백**: 초고DWPD KV에 현행 삼성 제품 없음(2019~2026 TLC/QLC 라인업에 10 DWPD 이상 없음, B-2) |
| 고내구 TLC 3 DWPD | PM1755 · PM1745(U.2 · E3.S) | 쓰기 많은 KV, 체크포인트(신호) |
| 고성능 TLC 1 DWPD | PM1753 · PM1763(Gen6) · PM9D3a | VM · DB(PM9D3a · PM1753), 데이터 로딩(PM1763), KV 계층 CMX(PM1753, NVIDIA CMX 공급) |
| 고용량 QLC | BM1743 · BM1773(245.76TB, FMS 2026 전시) | 객체 · 데이터셋 · 사용자 VM 디스크, 가중치 · RAG 읽기(적합하나 삼성 포지셔닝 없음 → 점선) |

덱의 제품 이미지는 공식 사진을 쓸 수 없어 폼팩터 치수로 재현한 3D 렌더다(`outputs/presentation/assets/products/`, 실물 사진 아님).

## 5. 연결

- 추론 하위 수요 × 요구 × 기술: [ai-inference-storage-requirements.md](ai-inference-storage-requirements.md)
- 협력 단계: [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3.5
- QLC → TLC 시장 규모: [qlc-tlc-market-entry.md](../strategies/qlc-tlc-market-entry.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
