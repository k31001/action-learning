# 사용자 제공 분석: 하이퍼스케일러가 Mixed Media SSD(pSLC + QLC)를 원하는 이유

**수집일**: 2026-10-03
**제공**: 사용자(액션러닝 과제팀) 대화 입력, 원문 보존(원문에 em-dash 없음)
**성격**: 2차 분석 메모. 원문이 인용한 외부 출처(Kioxia 2026-09 mixed-media SSD 개념, Solidigm QLC · CSAL 자료)는 링크 없이 서술됐으므로, 사실 검증은 [ssd-mixed-media-hyperscaler-logic-2026-10.md](../articles/ssd-mixed-media-hyperscaler-logic-2026-10.md)에서 따로 한다.
**사용자 지시**: "아래 내용으로 보면 mixed media도 고객 협력이 필요한 부분으로 보여. 이 솔루션에 대한 디테일과 로직을 아래 내용 기반으로 좀 더 보강해줘."

---

## 원문

맞습니다. 최근 하이퍼스케일러가 관심을 보이는 **Mixed Media SSD(pSLC + QLC)**의 핵심은 "QLC에 캐시를 붙여 성능을 높인다"기보다, 한 SSD 안에서 고성능·고내구성 영역과 초고용량·저비용 영역을 분리해 워크로드를 직접 배치하려는 것에 가깝습니다. 특히 Kioxia가 2026년 9월 공개한 mixed-media SSD 개념도 이 방향을 명확히 설명합니다.

### 왜 하이퍼스케일러에게 매력적인가

가장 큰 이유는 데이터센터 워크로드가 실제로는 두 종류의 I/O가 섞여 있기 때문입니다.

| 데이터 특성 | 예 | 적합 Media |
|---|---|---|
| 작은 Random Write, 빈번한 갱신 | Metadata, Journal, WAL, Index, KV update | pSLC |
| Latency-sensitive write | GC metadata, checkpoint, cache | pSLC |
| 대용량 Sequential Write | Object, Blob, AI dataset | QLC |
| Read-mostly / Cold data | Model, image/video, archive | QLC |

QLC만 사용하면 small/random write → GC → Write Amplification → latency 증가 + endurance 감소라는 문제가 생깁니다. Solidigm도 QLC의 WAF를 낮추기 위해 빠른 SLC/TLC tier에서 write를 모은 뒤 큰 sequential write로 QLC에 내려보내는 구조를 설명하고 있습니다.

즉, Host random 4K write → pSLC에 빠르게 기록 → 여러 write를 aggregate/coalesce → 128 KB / 1 MB 같은 큰 write로 정렬 → QLC에 sequential하게 destage 시키면 QLC 입장에서는 훨씬 좋은 workload가 됩니다.

### 1. 가장 중요한 이유: QLC의 약점을 아주 적은 pSLC로 보완

QLC의 문제는 capacity나 read가 아니라 write path입니다. 특히 hyperscaler가 싫어하는 것은 평균 성능보다 p99 / p999 / p9999 latency입니다. QLC가 random write를 계속 받으면 Host write → NAND program → GC → relocation → erase가 겹치면서 순간적으로 latency가 튈 수 있습니다.

반대로 앞에 pSLC 영역을 두면 Host ↓ pSLC : Fast / Low latency / High endurance ↓ destage QLC : Dense / Cheap / Sequential optimized 구조를 만들 수 있습니다. 그래서 pSLC가 전체 NAND의 아주 일부만 있어도 효과가 큽니다. Kioxia가 제시한 예도 대략 1~6% 수준을 pSLC로 할당하는 구조입니다.

여기서 중요한 점이 하나 있습니다. QLC NAND cell 하나를 pSLC로 사용하면 원래 4bit를 저장하던 cell에 1bit만 저장하므로 capacity penalty가 약 4배입니다. 따라서 pSLC를 지나치게 크게 잡으면 QLC의 $/TB 장점을 잃어버립니다. 그래서 hyperscaler 입장에서는 "pSLC를 최소화하면서 QLC를 얼마나 deterministic하게 만들 수 있느냐"가 중요한 최적화 문제가 됩니다.

### 2. Endurance보다 오히려 WAF가 핵심

Mixed Media를 단순히 QLC endurance가 약하니까 pSLC를 넣는다라고 이해하면 조금 부족합니다. 더 근본적인 목적은 QLC NAND에 들어가는 쓰기의 형태를 바꾸는 것입니다. 예를 들어 host workload가 4K random write × 1000이라면 이를 그대로 QLC에 쓰지 않고 pSLC → grouping → coalescing → sequentialization 하여 1MB sequential write × 4 같은 형태로 QLC에 전달할 수 있습니다. 그러면 QLC에서 GC 감소, relocation 감소, WAF 감소, program/erase 횟수 감소, background operation 감소가 동시에 일어납니다.

Solidigm도 host-side caching과 sequentialization을 통해 QLC WAF를 1에 가까운 수준으로 낮추는 것을 QLC 활용의 주요 방법으로 설명합니다. 그래서 구조적으로 보면 pSLC의 가치 = pSLC 자체 endurance 보다 pSLC가 QLC write를 얼마나 깨끗하게 만들어 주느냐가 더 중요합니다.

### 3. Hyperscaler가 특히 원하는 이유: "Drive slot tax" 제거

과거에는 이런 역할을 하기 위해 서버에 High endurance SSD (SLC/TLC) + Capacity SSD (QLC) 두 종류의 SSD를 설치했습니다. 그런데 hyperscale server에서 이건 상당히 비쌉니다. PCIe lane, SSD slot, switch port, power, cooling뿐 아니라 별도 SKU, Qualification, FW 관리, Failure management, Spare inventory, Telemetry, Fleet management까지 두 종류로 관리해야 하기 때문입니다.

Kioxia가 mixed-media SSD를 설명하면서 직접적으로 지적하는 이유도 이것입니다. 하나의 SSD 안에서 두 tier를 제공하면 별도의 performance tier SSD를 둘 필요가 줄어듭니다. 예를 들어 기존 구조가 CPU → 2 × TLC SSD → 8 × QLC SSD 였다면, Mixed Media에서는 CPU → 8 × [pSLC + QLC] SSD 처럼 만들 수 있습니다. 따라서 CAPEX뿐 아니라 rack-level TCO가 내려갈 가능성이 있습니다.

### 4. "Cache"보다 Namespace로 노출하는 것이 중요한 이유

Hyperscaler가 원하는 pSLC가 반드시 SSD 내부에서 알아서 사용하는 transparent SLC cache인 것은 아닙니다. 오히려 Namespace 1 = pSLC, Namespace 2 = QLC 형태로 host에 직접 노출시키는 것이 상당히 매력적입니다. Kioxia가 설명한 mixed-media 구조도 두 개의 별도 namespace를 전제로 합니다.

그러면 hyperscaler software가 직접 WAL / Journal, Metadata, LSM tree hot data, DB index, Checkpoint → pSLC, Object, Blob, AI Dataset, Cold Data, Large Sequential Data → QLC로 보낼 수 있습니다. 이는 hyperscaler가 좋아하는 철학과 잘 맞습니다. SSD가 workload를 추측하게 하지 말고 Host가 workload semantics를 알려준다. 이게 결국 FDP와도 연결됩니다.

### 5. FDP와 Mixed Media가 매우 잘 맞음

Host가 1. 어떤 데이터가 hot/write-intensive인지 2. 어떤 데이터가 cold/read-intensive인지 3. 어떤 데이터의 lifetime이 비슷한지 알고 있기 때문입니다. 예를 들면 Host Application ├── Metadata/WAL → pSLC Namespace └── User Data ├── RUH 0 : Short lifetime ├── RUH 1 : Medium lifetime └── RUH 2 : Long lifetime → QLC + FDP 가 가능합니다. pSLC는 write shock absorber, FDP는 QLC 내부 GC 최적화 역할을 하게 됩니다. Kioxia 역시 mixed media와 FDP를 결합하면 small/random write를 pSLC에서 받아 sequential stream으로 만든 뒤 QLC에 저장하여 불필요한 NAND write를 줄일 수 있다고 설명합니다.

### 6. AI 시대에 더 중요해지는 이유

AI storage를 단순화하면 Small + Hot + Write intensive(Metadata, KV cache, Checkpoint, Log, Index, Journal) → pSLC, Large + Cold/Warm + Read intensive(Training Dataset, Model, Vector data, Object, Multimedia) → QLC 형태입니다. 즉 데이터의 대부분은 QLC에 적합하지만, 아주 작은 비율의 write-sensitive 데이터가 전체 시스템 latency와 endurance를 결정합니다. 그래서 전체를 TLC로 만들면 너무 비싸고, 전체를 QLC로 만들면 QoS가 불안정합니다. Mixed Media는 95% 이상의 데이터는 QLC economics를 가져가고, 몇 %의 pSLC로 TLC/SLC급 write behavior를 얻자라는 접근입니다. Solidigm도 QLC를 AI/ML data lake, CDN 같은 read-heavy 대용량 workload에 적합하다고 설명하는 반면 caching, logging, journaling 같은 write-heavy workload에는 SLC급 media의 장점이 크다고 설명합니다.

### 결론: 하이퍼스케일러의 핵심 요구 5가지

① QLC $/TB와 density 확보, ② p99~p9999 write latency 안정화, ③ QLC WAF/endurance 개선, ④ TLC/SLC 별도 SSD를 없애 PCIe slot·power·운영비 절감, ⑤ FDP 등 host-aware placement와 결합. 특히 SSD Controller 관점에서는 앞으로 경쟁 포인트가 NAND 자체보다 pSLC→QLC destage 정책, namespace별 QoS isolation, GC 간섭 차단, token/resource reservation, FDP 연동, pSLC sizing 및 telemetry 쪽으로 이동할 가능성이 큽니다. 이 부분이 실제 mixed-media SSD 아키텍처에서 가장 어려운 영역입니다.
