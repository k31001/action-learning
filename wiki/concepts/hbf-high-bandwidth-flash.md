---
type: concept
last_reviewed: 2026-08-28
sources: [sources/articles/hbf-standard-china-dc-demand-2026-08-28.md, sources/articles/kv-cache-ssd-offload-ecosystem-2026-08.md, sources/articles/logic-paradigm-shifts-3d-dram-2026-08.md]
---

# HBF (High Bandwidth Flash) — AI 추론용 낸드 신계층과 해자 분석

HBM(속도)과 SSD(용량) 사이에 신설되는 **NAND 기반 고대역 메모리 계층**. 3D NAND 다이를 HBM처럼 TSV/하이브리드 본딩으로 적층해 가속기 패키지 옆(2.5D) 또는 위(3D)에 붙인다. AI 추론의 모델 가중치·KV 캐시처럼 "용량은 HBM 밖, 속도는 SSD 위"인 데이터가 표적 워크로드다.

---

## 1. 현황 (2026-08 기준)

전 항목 출처: [hbf-standard-china-dc-demand-2026-08-28.md](../../sources/articles/hbf-standard-china-dc-demand-2026-08-28.md)

| 축 | 상태 |
|----|------|
| 표준 | SanDisk·SK하이닉스 주도 — 2026-02 컨소시엄 킥오프 → **2026-08 FMS에서 첫 OCP 스펙 공개** (6개월 만). **Google·Tenstorrent 합류** |
| 스펙 | 스택당 512GB·최대 3.0TB/s — HBM 대비 용량 수 배, 비트당 원가 대폭 절감, 비휘발 |
| 일정 | SanDisk 샘플 2026 H2 → HBF 탑재 추론 디바이스 샘플 2027 초 |
| **삼성** | **컨소시엄 밖** — 자체 zNAND-O(엣지 AI향)·zHBM 컨셉 공개, "zHBF 추진 신호"(Digitimes 08-27). SanDisk-SK는 스펙 선공개로 사실상 표준 선점 시도 |
| **중국** | **YMTC "full speed toward HBF"**(Digitimes 2025-12-31) — Xtacking 진화가 가속기 통합(TSV+하이브리드 본딩) 지원. YMTC TSV로 HBM 진입 보도(TrendForce 2025-09) + Huawei 주도 중국 HBM 컨소시엄(CXMT·YMTC) |

수요 측 근거: 추론 시장에서 KV 캐시·모델 가중치의 SSD/플래시 오프로드 생태계가 이미 형성 중 (NVIDIA Dynamo·LMCache 등 — [kv-cache-ssd-offload-ecosystem-2026-08.md](../../sources/articles/kv-cache-ssd-offload-ecosystem-2026-08.md)). HBF는 이 계층의 전용 실리콘화다.

## 2. 해자 분석 — "차별화는 되지만, 자동 해자는 아니다"

HBF를 구성 요소로 분해하면 중국이 복제 가능한 부분과 불가능한 부분이 갈린다:

| 구성 요소 | 중국(YMTC) 복제 가능성 | 근거 |
|-----------|----------------------|------|
| NAND 코어 다이 | **높음** — 이미 동세대 | 294단 출하, 267단 주력 ([ymtc.md](../entities/ymtc.md)) |
| 다이 적층·본딩 | **높음 — 오히려 선행** | Xtacking = NAND-로직 본딩이 창업 아키텍처. hybrid bonding 핵심 특허 다수 보유 ([nand-process-transition.md](nand-process-transition.md) §6) |
| HBM급 TSV 대량 적층·첨단 패키징 | 중간 — 시간 소요 | 첨단 패키징 장비 2024년 대중 수출통제 ([us-export-controls.md](us-export-controls.md)). 단 Huawei 컨소시엄으로 우회 축적 중 |
| **표준·생태계 (OCP 스펙, 가속기 공동설계)** | **낮음 — 구조적 차단** | 서방 가속기(NVIDIA·AMD·Google) 패키지 안 인증·공동설계에서 중국산 배제. 중국 HBF는 Ascend 등 자국 가속기 내 채택 경로로 분리 |
| 컨트롤러·펌웨어·호스트 통합 | 낮음~중간 | FDP류 호스트 협력 스택의 레퍼런스 부족 ([ymtc-nand-defense.md](../strategies/ymtc-nand-defense.md) §2.2) |

**결론**: HBF의 해자는 **실리콘이 아니라 "누구의 패키지 안에 들어가느냐"에 있다.** 다이·본딩은 YMTC의 홈그라운드라 몇 년 내 복제되지만, 서방 가속기 생태계로의 진입은 표준·인증·지정학이 3중으로 막는다. 즉 해자는 **조건부**이며, 조건은 삼성이 표준·가속기 공동설계 안에 "먼저, 깊이" 들어가 있는 것이다. 세계는 HBF 생태계(서방)와 중국 내 HBF(자국 가속기)로 **이중화**될 공산이 크다 — 이는 위협이 아니라 시장 분리이며, 위험한 것은 서방 생태계 안에서 삼성이 표준 밖에 있는 현 상태다.

## 3. 삼성 전략 시사점

1. **표준 리스크가 기술 리스크보다 크다** — SanDisk-SK가 OCP로 스펙을 선점하고 Google이 합류한 상태에서, 자체 규격(zHBF·zNAND-O) 단독 노선은 eSSD 1위 지위에도 불구하고 **HBM 초기의 "표준 밖 고립"을 낸드에서 반복할 리스크**. 컨소시엄 합류(빠른 추종) 또는 NVIDIA CMX/Storage-Next 축 선점(별도 사실상 표준) 중 하나는 조기 확정 필요 ([nvidia-cmx-scada.md](../entities/nvidia-cmx-scada.md), 내부 개념설계 허용 판단은 [memory-cycle-storyline-r3-2026-08-12.md](../../sources/raw-notes/memory-cycle-storyline-r3-2026-08-12.md) "3D DRAM·PIM·HBF — 실패해도 잃을 시장이 아직 없음")
2. **YMTC 방어 관점** — HBF는 [ymtc-nand-defense.md](../strategies/ymtc-nand-defense.md) 축 4(락인)의 차세대 진지: 범용 낸드와 달리 가속기 패키지 인증이 필수라 전환비용이 구조적으로 높다. 단 "중국이 못 따라오는 기술"로 오판하지 말 것 — 따라오되, 다른 생태계에서 따라온다.
3. **EWI** — ① 삼성의 HBF 컨소시엄 합류 여부(방어 측), ② YMTC HBF 샘플/Ascend 채택 뉴스(위협 측), ③ HBF 탑재 추론 디바이스의 실수요 규모(2027~, 계층 자체의 성립 검증).

## 4. 시나리오 연결

- **B (AI 르네상스)**: HBF 계층 최대 개화 — 추론 수요가 낸드 가치 사다리의 새 최상단 형성. 표준 안에 있는 자가 독식
- **A/C (디커플링)**: 생태계 이중화 고착 — 서방 HBF 표준 안 지위가 곧 시장 접근권
- **D (조용한 재편)**: 추론 수요 둔화 시 HBF 지연 — zNAND-O류 엣지 AI 파생만 잔존, 과투자 경계
- **E (패러다임 전환)**: HBF 자체가 전환의 일부 — "HBM 단일 축 해체"의 낸드 측 표현 ([hbm-roadmap.md](hbm-roadmap.md) [Update 2026-08-03] 크리스 밀러 논지와 정합)

## 관련 페이지

- [ymtc-nand-defense.md](../strategies/ymtc-nand-defense.md) — YMTC 방어 전략 (후속 질의 §9)
- [nand-process-transition.md](nand-process-transition.md) — hybrid bonding IP 구도
- [hbm-roadmap.md](hbm-roadmap.md) — 아키텍처 계층 경쟁 축
- [ssd-ufs-market.md](ssd-ufs-market.md) — eSSD 시장
- [nvidia-cmx-scada.md](../entities/nvidia-cmx-scada.md) — 가속기 측 스토리지 표준 축
- [ymtc.md](../entities/ymtc.md) — YMTC HBF 개발
