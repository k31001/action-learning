---
type: concept
last_reviewed: 2026-09-23
sources: [sources/articles/kv-cache-ssd-offload-ecosystem-2026-08.md, sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md, sources/articles/qlc-essd-market-size-forecast-data-2026-09.md]
---

# AI 메모리 수요는 HBM에서 넘쳐 스토리지로 내려온다

QLC eSSD 덱 1장 ②구획이 서는 자리다. [codesign-demand-lesson.md](codesign-demand-lesson.md)가 "고객과 함께 수요를 설계한 쪽이 이겼다"를 세웠다면, 이 페이지는 **그 수요가 지금 어디에 있는가**에 답한다.

## 1. 한 문장

**대체가 아니라 스필오버다.** KV 캐시는 먼저 GPU HBM을 채우고, 용량이 고정된 그 계층을 넘겨 CPU DRAM으로, 다시 NVMe SSD로 내려온다. HBM 수요가 줄어 스토리지로 옮겨 간 것이 아니라, **넘친 증분이 새 계층을 열었다.**

## 2. 메커니즘 — 추론 메모리 위계는 네 단이다

| 단 | 계층 | 성격 | 한계 |
|---|---|---|---|
| **G1** | GPU HBM | 가속기당 용량이 고정된 계층 | 길어진 컨텍스트·동시 사용자가 먼저 채운다 |
| **G2** | CPU DRAM (노드 내/간) | 첫 확장 | 용량당 단가가 벽 |
| **G3** | 로컬 / 풀 NVMe SSD | **새로 열린 계층** | 쓰기가 몰리는 첫 대용량 계층 → 내구성이 구속 조건 |
| **G4** | 원격 스토리지 | 마지막 단 | 지연 |

이 위계는 해석이 아니라 **NVIDIA Dynamo의 KV Block Manager가 실제로 구현한 구조**다(🟡 docs.nvidia.com/dynamo kvbm). KVBM은 "SSD 수명 연장을 위해 빈도 ≥2 블록만 CPU→디스크"라는 기본 필터까지 둔다 — **오프로드 설계자가 이미 SSD 내구성을 고려하고 있다는 증거**다.

NVIDIA는 여기서 더 나아가 **CMX(Context Memory Storage)**로 이 계층을 Vera Rubin 플랫폼의 정식 구성요소로 규정했다(BlueField-4 = Vera CPU + ConnectX-9, DOCA Memos가 KV 통신·스토리지 계층). 같은 위계를 구현한 오픈소스도 여럿이다 — LMCache, Mooncake(DRAM+SSD 다계층, vLLM 공식 2026-05-07), FlexKV(Tencent, GPU/CPU/SSD/원격), DeepSeek 3FS(노드당 14TiB NVMe × 16) ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) ✅ GitHub 확인).

## 3. 시장 신호

| 신호 | 수치 | 등급 | 출처 |
|---|---|---|---|
| **TrendForce의 표현** | **"Vera Rubin의 HBM → NAND 스필오버"** — CMX가 6월 저점 대비 **TLC 현물가 반등**을 견인 | 🟡 | TrendForce 2026-08-18 |
| CMX NAND 소요 | 2026 **35EB** → 2027 **100EB 이상**; "Apple 규모 수요원 추가와 동급" | 🟡 | 서울경제 2026-07-20 · 분석가 추정 |
| 독립 경로의 수렴 | SanDisk KV 캐시 NAND 전망 2027 **75~100EB** — CMX 공급망 추정과 같은 자리 | ✅ / 🟡 | SanDisk FMS 2026 · Investor Day 2026-08-13 |
| 삼성의 대응 | V-NAND 캐파의 **약 60%**를 9세대(V10) CMX 대응에 배정, V10 양산 2026-08 | 🟡 | 서울경제·SamMobile 2026-07 |
| 성장의 방향 | 추론 수요 CAGR **86%** 대 학습 **16%** | 🟡 | Kioxia Investor Day 2026-06-02 |

가격에 나타났다는 점이 중요하다. 전망은 빗나갈 수 있지만 **현물가는 조달이 실제로 움직였다는 흔적**이다.

## 4. 반드시 함께 적을 단서

이 명제를 "HBM 수요가 스토리지로 옮겨 갔다"로 읽으면 2026년 데이터에 반박당한다.

- **HBM은 줄지 않았다**: 삼성은 2026-02-12 업계 최초 상용 HBM4를 출하했고 2026-Q2 HBM 점유 33%(직전 분기 21%에서 +12%p)에 올랐다. 이동한 것은 **총량이 아니라 증분**이다 ([codesign-demand-lesson.md](codesign-demand-lesson.md) §3).
- **오늘 이 계층은 TLC가 서비스한다**: CMX 타깃으로 벤더가 스스로 지명한 드라이브는 전부 TLC다(삼성 PM1753·PM1763, Kioxia CM10, Solidigm PS1010/1030 🟡). QLC를 이 계층에 넣은 공개 사례는 SanDisk FMS 2026의 "고내구 KV 캐시 구성(BiCS10 QLC)" 1건이며 **DWPD 미공개**다(🟡).
- **반대 방향의 신호도 있다**: 2025-12 TrendForce 보도에 따르면 SK하이닉스·Kioxia는 NVIDIA와 **SLC 기반 AI SSD**를 개발 중이다. 이 계층의 상단이 SLC로 갈 가능성은 QLC와 반대 방향이다(⚠️).
- **KV 캐시 자체가 작아질 수 있다**: DeepSeek V4.1-Flash는 KV SSD 풋프린트 1/8을 주장한다(🟡 재인용). 효율 개선이 수요를 상쇄하는 경로다.
- **CMX 100EB는 KV 캐시만이 아니다**: 컨텍스트 데이터 저장 일반이 포함될 수 있다(⚠️).

## 5. 그래서 무엇이 달라지는가

수요가 내려온 것은 사실이고, **그것을 QLC로 받는 것이 우리 문제**다. 이 계층은 쓰기가 몰리는 첫 대용량 계층이므로 요구가 내구성(DWPD 1~3)으로 잡히고([essd-purchase-criteria-shift.md](essd-purchase-criteria-shift.md)), 현 QLC 정격 0.6과는 2~5배 거리가 있다([solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)).

## 6. 연결

- 덱: `outputs/presentation/qlc-ssd-strategy.pptx` **1장 ②구획**(v7.1) — 구매 기준 체인 · G1~G3 스필 도해 · 시장 신호 · 요구 DWPD
- 앞: [codesign-demand-lesson.md](codesign-demand-lesson.md) (교훈 — 수요를 함께 설계하라)
- 뒤: [essd-purchase-criteria-shift.md](essd-purchase-criteria-shift.md) (그 수요가 SSD 구매 기준으로 번역된 모습)
- 요구의 크기: [qlc-ssd-market.md](qlc-ssd-market.md) §4 (수요 모델) · [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
- 스택에서 우리 자리: [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)
