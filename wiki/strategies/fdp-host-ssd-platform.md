---
type: strategy
last_reviewed: 2026-08-05
sources:
  - sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md
  - sources/articles/captive-ssd-fdp-context-2026-08.md
  - sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md
  - sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md
  - sources/raw-notes/fdp-ecosystem-execution-input-2026-08-05.md
---

# FDP Host–SSD 통합 플랫폼 전략 — 환경 변화에서 전략 선택까지 (DT-P: 개발실 전환의 제품·기술 축)

> **한 줄 요약**: 고객(하이퍼스케일러)의 스토리지 통제권이 완제품 → 펌웨어 → 자체 컨트롤러(Captive) → **표준(FDP)·웨이퍼 직구매**로 일관되게 상승했다. 이 흐름은 되돌릴 수 없다 — 남은 선택은 흐름 위에서 부가가치를 재정의하는 것이며, 검토한 4개 선택지 중 **"FDP 표준 SSD + 시스템 소프트웨어 통합 플랫폼"**이 유일하게 표준화(펌웨어 공통화)와 고객 통제권 수용을 양립시킨다 ([fdp-host-ssd-platform-strategy-2026-07-24.md](../../sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md), [captive-ssd-fdp-context-2026-08.md](../../sources/articles/captive-ssd-fdp-context-2026-08.md)).

> **전략 문장**: *Binding으로 수요를 확보하고, FDP로 제품을 표준화하며, 시스템 소프트웨어로 고객 워크로드를 연결한다.*

> **개발실 전환 전략과의 관계**: [dev-org-transformation.md](dev-org-transformation.md)의 **인재 축(FDE 스타, §4.6)** 과 짝을 이루는 **제품·기술 축(§4.7)**. FDE가 "누가 들어가는가"라면 본 전략은 "무엇을 들고 들어가는가"다.

---

## 1. 환경 변화 — 세 갈래 흐름이 한 지점에서 만난다

**① 수주산업화 — Binding 계약의 등장** (기존 지식 기반과의 연결)
AI 수요 급증으로 메모리 계약이 Spot → LTA → 전략적 고객 계약으로 진화했다 ([lta-to-sca-transition.md](../concepts/lta-to-sca-transition.md)). 이창수 부사장(메모리 영업팀장)의 1차 확인: *"지금은 5년짜리에 선수금을 수십억 달러 단위로 받아서… 구매 의무를 저버리면 받은 캐시에서 깐다 — take-or-pay야. **메모리가 처음으로 그 개념을 바인딩해**"* ([lee-changsoo-memory-sales-interview-2026-08-03.md](../../sources/raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md)). Binding은 장기 물량을 보장하지만 **물량 계약일 뿐, 완제품 부가가치를 보장하지 않는다** — 이것이 본 전략의 출발점이다.

**② 하이퍼스케일러의 수요 지배** — 하이퍼스케일 클라우드가 글로벌 enterprise SSD 물량의 **약 55%를 소비**하며, 2026 공급 부족 국면에서 이들의 개방형 구매 약정이 가격 불문 물량을 흡수한다 ([captive-ssd-fdp-context-2026-08.md](../../sources/articles/captive-ssd-fdp-context-2026-08.md) §1). 소수 고객이 시장 규칙을 정한다.

**③ 고객 통제권의 상승 — Captive SSD의 위상 변화** — 이 소수 고객이 TCO 통제를 위해 스토리지 스택을 계층별로 내재화해 왔다(§2). 세 흐름의 교차점: **물량은 Binding으로 잠기고, 규격은 고객이 정하며, 완제품 가치는 고객이 가져가려 한다.** 개발실이 대응 전략 없이 이 교차점에 서면 "웨이퍼 공급자"로 후퇴한다.

## 2. Captive SSD 위상 변화 — 데이터로 본 통제권의 단계 상승

| 단계 | 시기 | 고객이 통제하는 계층 | 근거 이정표 (출처: [captive-ssd-fdp-context-2026-08.md](../../sources/articles/captive-ssd-fdp-context-2026-08.md)) |
|---|---|---|---|
| 1. 완제품 구매 | ~2016 | 없음 (벤더 표준품) | 전통적 조달 |
| 2. 커스텀 스펙·펌웨어 | 2017~20 | 펌웨어 | OCP 스토리지 스펙 · 고객별 펌웨어 브랜치 관행 |
| 3. **자체 컨트롤러 (Captive)** | 2021~ | 하드웨어 | **AWS Nitro SSD (2021-12)** — 자체 컨트롤러 자작 SSD. "crown jewels는 만들고 staples는 산다" |
| 4. **표준 주도 + 웨이퍼 직구매** | 2022~26 | 인터페이스 표준 + 공급 단위 | **FDP(TP4146): Meta·Google이 각자 WAF 문제를 풀다 합류, 삼성과 6개월 만에 비준(2023)** · Meta CacheLib FDP 공식 지원 · NAND 웨이퍼 다년 계약(계약가 월 +60%, Q1'25 대비 +246%) |

**독해**: ① 통제권 상승은 일방향이다 — 펌웨어를 가진 고객이 컨트롤러로, 컨트롤러를 가진 고객이 표준과 웨이퍼로 내려갔다. ② **FDP 표준 자체가 고객이 설계한 것** — 벤더 기능이 아니라 "데이터 배치 통제권을 표준으로 달라"는 요구의 산물. ③ 구매 단위가 완제품→웨이퍼로 내려간다는 것 = 컨트롤러·펌웨어 부가가치를 고객이 내재화한다는 뜻. **단, 삼성은 FDP 표준의 공동 주도자다** (백서·기술 블로그 발행) — 흐름의 피해자가 아니라 설계 참여자 위치에 있다.

## 3. 삼성의 딜레마와 전략적 선택지 — 왜 이 전략인가

교차점에서 검토 가능한 선택지는 4개였다. 평가 기준: (a) 완제품 부가가치 방어 (b) 펌웨어 공통화·개발 효율 (c) 고객 통제권 흐름과의 정합 (d) 차별화 지속성.

| 선택지 | 내용 | 탈락/채택 사유 |
|---|---|---|
| **A. 컴포넌트 후퇴** | NAND·웨이퍼 공급에 집중, 완제품은 고객에 위임 | ❌ 물량은 지키나 **완제품 부가가치 영구 상실** — 커머디티 공급자 고착, Binding이 있어도 마진 열위 |
| **B. 풀커스텀 대응** | 고객별 커스텀 SSD·펌웨어 전면 개발 | ❌ 제품·펌웨어 **파편화**. 커스텀 소싱·컨트랙 체질 부재는 사내 1차 확인 — 최장석: *"커스텀 제품은 소싱·컨트랙이 파운드리 모델과 비슷한데 **그걸 우리가 안 해본 것**, 보상 계약 없이 코스트를 다 먹었다"* ([choi-jangseok-product-planning-interview-2026-07-29.md](../../sources/raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md)) |
| **C. FDP 표준 SSD만 공급 (HW-only)** | 표준 지원 SSD를 만들되 통합은 고객 몫 | ❌ 통제권 흐름과는 정합하나 **"FDP 지원 여러 공급사 중 하나"** — 시스템 SW 없이는 고객 도입 장벽도 못 낮추고 차별화도 없어 가격 경쟁으로 회귀 |
| **D. FDP 표준 + 시스템 SW 통합 플랫폼** ✅ | 표준 SSD(공통 펌웨어) + Host SDK·Profiler·E2E 검증 제공 | ✅ 유일하게 4개 기준 동시 충족: 공통 펌웨어로 파편화 방지(b) + 고객의 데이터 배치 통제권을 표준으로 수용(c) + SW·검증 계층에서 차별화(a·d) + 표준 공동 주도자 지위 활용. **고객 통제권 흐름을 거스르지 않고 그 위에서 부가가치를 재정의** |

**선택 논리 한 줄**: 통제권 상승이 불가역이라면, 부가가치는 "고객이 가져간 계층 아래(웨이퍼)"가 아니라 **"고객이 아직 풀지 못한 계층 위(워크로드↔FDP 정책 변환)"**에서 만들어야 한다. FDP SSD가 제공하는 RU/RUH를 워크로드에 매핑하는 시스템 SW가 그 계층이고, 이는 [rs3-customer-switching-cost.md](invariant/rs3-customer-switching-cost.md)(전환비용)와 [embedded-software-monetization.md](../concepts/embedded-software-monetization.md)(SW 수익화)의 NAND/SSD 구체화다.

## 4. 선택된 전략 — 구조와 실행

**6요소 구조**: Binding 계약(장기 물량) → FDP 표준 SSD(공통 인터페이스) → **시스템 소프트웨어(워크로드→정책 변환)** → E2E 검증(TCO 보장) → 고객 공동개발(장기 관계) → 현장 텔레메트리(개선 루프).

**실행전략 6종** (상세: [fdp-host-ssd-platform-strategy-2026-07-24.md](../../sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md)):
1. **Samsung FDP Enablement Platform** — SDK·공통 라이브러리(Linux·io_uring·SPDK), 워크로드 플러그인(RocksDB·CacheLib·Ceph·Vector DB·K8s), Workload Profiler(trace→추천 RUH·예상 WAF), Emulator/Digital Twin
2. **표준 워크로드 프로파일 7종** — Cache·KV·Database·Multi-tenant·Vector·Checkpoint·QLC: 새 펌웨어가 아니라 Host 설정+검증된 사용법 → 펌웨어 공통화와 고객별 최적화 양립
3. **End-to-End 공동검증** — App→Host→SSD→NAND→텔레메트리, 시스템 성과 지표(WAF·p999/p9999·격리·전력·qualification 기간), 고객 trace의 pre/post-silicon 재사용
4. **고객 공동개발 조직** — Host SW·Workload Integration·Solution Engineering·E2E Validation 4기능, 제품 기획·개발 참여 (Co-Design Pod·FDE의 NAND/SSD 구체화)
5. **Binding 계약에 기술협력 포함** — 물량·trace 제공·공동 로드맵 ↔ 공급능력·SDK·개선 목표: 물량 계약을 **공동 플랫폼 계약**으로 격상 (이창수 take-or-pay 체제의 다음 단계)
6. **오픈소스·차별화 경계** — 공개(기본 라이브러리·연동·적합성) / 차별화(NAND·FTL 모델·정책 추천·예측 모델): lock-in 우려 없이 삼성 SSD 선택 시 더 높은 TCO 효과

**단계**: ① 제품·기본 도구 → ② 전략 고객 2~3사 공동검증 → ③ 상용 플랫폼화(Binding에 SW 지원 포함) → ④ Host Control 확장(QoS·전력·telemetry·multi-tenant)

### 4.5 생태계 확산·락인 실행전략 3종 — "SCA로 다가가고, FDP로 제공하고, FDE로 협업한다"

목표: FDP 생태계를 고객사에 이식해 **락인 플라이휠**(워크로드 유입 → 최적화 심화 → 전환비용 증가)을 만들고, 다운턴에도 유지되는 관계로 피해를 최소화한다 ([fdp-ecosystem-execution-input-2026-08-05.md](../../sources/raw-notes/fdp-ecosystem-execution-input-2026-08-05.md), 사용자 전략 인풋 2026-08-05).

**실행전략 1 — 워크로드 교환 협업 제안 (지금이 적기)**: 현재 공급부족 국면의 협상력 우위를 지렛대로, **하이퍼스케일러 + 스토리지 박스 업체(Pure Storage·VAST Data·DDN)**에 협업을 제안한다. 딜 구조: 고객이 워크로드(trace)를 공유하면 삼성이 FDP SSD를 그 워크로드에 최적화해 공급. 고객은 소중한 데이터를 내주지만 성능·수명 개선과 TCO 절감을 얻으므로 거절하기 어렵다. 공급부족이 끝나면 이 창은 닫힌다 — 협상력이 있을 때 관계를 계약(전략적 고객 계약)으로 고정한다.

**실행전략 2 — 워크로드 최적화 개발 역량 확보 (전문가 프로파일 5종, 분석 2026-08-05)**: SSD를 잘 만드는 것을 넘어 호스트 시스템·소프트웨어 이해가 필요하다.
1. **Linux 커널 스토리지**: 블록 계층·io_uring·NVMe 드라이버 (커널 업스트림 경험자)
2. **유저스페이스 스토리지 엔진**: SPDK·NVMe-oF 데이터패스
3. **데이터 인프라 내부구조**: RocksDB(LSM·compaction)·CacheLib·Ceph·DB 스토리지 엔진 — FDP 플러그인(실행전략 1~2의 워크로드 연동)의 실장 역량
4. **스토리지 성능·워크로드 분석**: fio·blktrace·eBPF 트레이싱, WAF·tail latency 정량 분석
5. **FTL·NAND 미디어 모델링**: 사내 강점(FW·미디어)과 호스트 SW를 잇는 브리지, Emulator/Digital Twin 소유
- 확보: **채용**(오픈소스 커미터·하이퍼스케일러 스토리지팀 출신) + **양성**(사내 SSD FW 인력의 호스트 SW 전환 트랙, 오픈소스 기여를 평가에 반영)

**실행전략 3 — FDE 파견·협력 운영안 (분석 2026-08-05, [palantir-fde-model-2026-07.md](../../sources/articles/palantir-fde-model-2026-07.md) 준용)**: 고객이 밀집한 미국에서 하이퍼스케일러 개발자들과 상시 소통하며 개발하고 FDP 생태계에 기여할 인재.
- **채용**: 실리콘밸리 현지 채용 중심(고객 인접·영어 커뮤니케이션), 오픈소스 스토리지 기여자·고객사/스토리지 스타트업 출신 우대 — §4.6 스타 영입 트랙과 결합
- **양성**: 본사 FW·시스템 SW 엔지니어의 미국 로테이션(6~12개월) + 현지 FDE 멘토 페어링, "명시 요구 vs 실제 요구" 검증 단계 훈련
- **운영**: 파일럿 고객 1~2사 상주(Co-Design Pod 소속·홈조직 유지, dual-ladder), 평가는 청구 시간이 아닌 **outcome**(FDP 활성화 용량·정책 채택률), 커널·SPDK·CacheLib **업스트림 기여로 생태계 공헌과 호명**을 병행, 순환 배치로 번아웃·단절 방지

## 5. KPI

핵심 = **고객 시스템에서 FDP가 실제 활성화된 SSD 용량** (지원 출하량만 세면 미사용 기능이 된다). 보조: FDP 적용 Binding 물량 · 펌웨어 브랜치 감소율 · qualification 기간 · WAF/NAND write 감소율 · usable capacity 증가율 · p999/p9999 개선율 · **Captive 계획에서 삼성 완제품으로 전환된 물량**.

## 6. 시나리오 연결 (일관성 규칙)

- **B (AI 르네상스, Main Bet)**: enterprise SSD·AI 스토리지 수요 최대 — 플랫폼 효과 최대. MB-4의 NAND/SSD 대응물
- **A (황금 요새)**: 진영 내 핵심 CSP와 Binding+플랫폼 결합이 진영 락인 강화
- **C·D (AI 조정)**: Binding 최소 물량 + 시스템 SW 전환비용이 방어벽 ([rs8-structured-revenue-hedging.md](invariant/rs8-structured-revenue-hedging.md) 연계)
- **E (패러다임 전환)**: Host Control 확장(4단계)이 차세대 스토리지 아키텍처 전환기의 헤지
- 연결: [dev-org-transformation.md](dev-org-transformation.md) · [rs3-customer-switching-cost.md](invariant/rs3-customer-switching-cost.md) · [embedded-software-monetization.md](../concepts/embedded-software-monetization.md) · [customer-co-design-anthropic.md](../concepts/customer-co-design-anthropic.md)
