---
type: report
status: 본문 v2.0 (2026-09-19) — 덱 v5.0~v5.2 논리로 재구성(고용량화의 두 축 · 신뢰성은 SSD 내부 설계 · 내구성의 잔여 변수 WAF는 호스트 · 3단계 역량 · FDE 선별 · 조건부 보증). v1.0(2026-09-17, 브리프 질문 10개 답변 구조)은 git 이력
brief: sources/prompt/prompt-qlc-ssd-strategy.md
series: 「삼성 SSD 전략적 방향성」(outputs/report/ssd-strategy-report.md)의 자매편
last_updated: 2026-09-19
---

# QLC eSSD 전략 보고서 — 고용량 QLC의 두 축: 신뢰성은 SSD 내부에서, 내구성은 고객 시스템과 함께

> **문서 성격**: 집필 브리프([prompt-qlc-ssd-strategy.md](../../sources/prompt/prompt-qlc-ssd-strategy.md), 2026-09-17)에서 출발해 2026-09-18~19의 비판적 리뷰와 사용자 결정을 반영한 전략 보고서 v2.0. 「삼성 SSD 전략적 방향성」 보고서의 자매편으로, 그 보고서가 제시한 호스트 협력 데이터 배치 전략에 이르는 논리적 흐름을 QLC eSSD 시장에서 다시 세운다. 위키([qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md), [solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md), [qlc-workload-capability-phases.md](../../wiki/strategies/qlc-workload-capability-phases.md), [qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md))에서 합성했고, 모든 수치는 `sources/` 인용을 달았다. 본문 1~6장은 발표 덱 6장(v5.2)과 같은 순서이며, 각 장 제목은 덱의 액션 타이틀이다. 7장(수요·매출 모델)과 부록 D·E는 덱에 싣지 않은 근거·배경이다.
>
> **v1.0 → v2.0에서 바뀐 것**: ① 내구성 격차를 "10~40배"에서 **동급 용량 비교 2~10배**로 정정(극단 조합 40배는 각주). ② "호스트 공동 설계가 유일한 경로"를 철회하고, 호스트 배치를 다이 세대·OP·SLC 캐시·보증연수·워크로드 재정의와 **병행하는 잔여 변수**로 둔다. ③ KV 캐시 워크로드의 배치 표준 WAF는 **공개 실측이 없어 검증할 가설**로 표기한다. ④ 다이 수 증가에 따른 **신뢰성 축**을 분리해 SSD 내부 해법으로 정리한다. ⑤ 실행은 **개발실 내부에서 실행 가능한 범위**(FDE 선별 집중, 업스트림·규격 채널, 조직·인사·문화)로 한정하고, 자회사·별도 보상·지분 참여·결정 요청은 부록 D(위키 유지)로 옮긴다. ⑥ 삼성 현 위치는 **Phase 1 진행 중**으로 표기한다. ⑦ **수명 보증·SLA 리스크**를 장으로 신설한다. ⑧ 판돈은 락인으로 얻는 캐시 계층 점유율, 비용은 개발실 개발 자원이며 별도 투자는 없다.
>
> **팩트체크 등급 고지**: 외부 원문 직접 열람이 차단된 세션이 많아 다수 수치가 검색 인용 경유(🟡)다. 실측 앵커(✅)는 TrendForce 분기 eSSD 매출과 2024년 QLC 30EB, CacheLib 배치 표준 WAF 문서, GitHub 저장소 확인, JESD218 요구값, 보증 관행, 삼성 PM1733 FIP 사양에 한정된다. 다이 고장률 상한과 유효 DWPD 곡선은 산식 모델(⚠️)이다. 부록 A 참조. 데이터 배치 표준은 NVMe FDP(Flexible Data Placement)를 뜻하며 본문에서는 "배치 표준"으로 쓴다. 계층(tier)은 "계층"으로 통일한다.

---

## 0. Executive Summary

발표 덱 6장의 제목을 이어 읽으면 다음 문단이 된다. 이것이 본 보고서의 요지다.

> AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다. 첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다. 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다. 따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다. 3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다. 유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다.

**첫째, 문제(1장).** 두 다운턴(DT19 −37.6%, DT23 −45%)의 교훈은 요구가 발주보다 약 2년 먼저 고객의 규격·코드에 나타나고, 규격 정의에 참여한 공급자가 선점했으며, 직전 다운턴의 결정이 다음 다운턴의 초기 조건이 된다는 것이다. 지금 그 요구는 TB당 TCO에서 GPU당 컨텍스트 용량·토큰당 비용으로, 61TB에서 245TB(다이 8배)로, 0.3~0.6 DWPD에서 KV 캐시 계층 제품(TLC) 정격 1~3 DWPD로 이동했다. 동급 용량으로 비교하면 61TB QLC 정격 0.58~1.0, 245TB QLC 0.3과 TLC 1~3 사이의 격차는 **2~10배**다. 고용량화는 두 축의 문제를 낳는다. 다이 수 8배 증가가 만드는 신뢰성 축과, DWPD 격차가 만드는 내구성 축이다.

**둘째, 신뢰성 축(2장)은 SSD 내부 설계로 충족된다.** 요구(JESD218 기능 고장률 FFR ≤ 3%)는 고정인데 SSD당 다이 수는 128(2012)에서 1,024(2025)로 늘었다. 보호가 없으면 SSD 고장률은 다이 수에 비례하므로 같은 FFR을 지키는 다이 고장률 상한은 8배 낮아진다(2.4e-4 → 3.0e-5, 모델). 해법은 다이가 아니라 SSD 계층에 있다. 다이 패리티(Micron RAIN 류), 여분 다이·다이 은퇴·감량 운영(삼성 PM1733 Fail-in-Place), 텔레메트리 기반 사전 예측이다. 호스트·플랫폼은 관측(OCP SMART C0)과 수용(Microsoft Hyrax 류)만 한다. 이 축은 호스트 협력 대상이 아니다.

**셋째, 내구성 축(3장)은 SSD 내부에서 충족되지 않았다.** 요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층이 보상해 왔다. 1단계 컨트롤러 ECC(1비트/512B → LDPC 120비트/KB)는 UBER 요구를 충족해 완결됐다. 2단계 SSD 단독 워크로드 최적화(2014~2019: Multi-stream·AutoStream·FTL 핫/콜드 추정·IO 결정성)는 QoS·성능은 개선했으나 데이터 수명을 SSD가 감지할 수 없어 실 워크로드 WAF는 약 3에 머물렀다. DWPD 산식에서 셀(P/E)·SSD(OP)·고객(보증연수)이 정하는 항을 빼면 남는 변수는 WAF이고, WAF는 호스트가 데이터 수명에 따라 배치를 지정할 때 약 3에서 약 1로 내려간다. 다만 호스트 배치 하나로는 2~10배 격차가 해소되지 않는다. 다이 세대·OP·SLC 캐시·보증연수·워크로드 재정의와 결합해야 하며, KV 캐시 워크로드에서의 배치 표준 WAF는 공개 실측이 없어 검증할 가설이다.

**넷째, 역량(4장).** 잔여 변수 WAF를 호스트가 결정하므로 역량을 디바이스에서 워크로드, 고객 시스템 계층까지 3단계로 확장한다. 삼성은 배치 표준 오픈소스 자산과 CMX 첫 공급 디바이스를 갖고도 KV 캐시 스택과의 연결이 비어 있다. 현 위치는 Phase 1 진행 중(QLC 라인 RUH 2~8 대 요구 200+, DWPD 미공개, CMX 첫 공급은 TLC), Phase 2 준비(트레이스 기반 실측 미공개), Phase 3 미착수(캐시 관리자 4종 기여 0건)다.

**다섯째, 실행(5장).** FDE(고객 상주 엔지니어)는 트레이스·KV 정책 접근을 허용하고 캐시 관리자 코드를 자체 운영하며 물량·규격 파급력이 있는 고객(AI 랩, NVIDIA 생태계) 1~2사에 집중한다. 하이퍼스케일러는 업스트림·OCP 규격 채널로, OEM·네오클라우드는 레퍼런스 스택으로 협업한다. 개발실 내부 실행은 시스템 소프트웨어 조직 강화, 개발실 소속 Co-Design Pod 3~5명, 상주 로테이션, 오픈소스 메인테이너 문화이며 별도 보상·자회사는 두지 않는다. 통과 조건은 90일(트레이스 확보·KV 캐시 실측 공개·플러그인 PR), 12개월(메인라인 머지·유효 DWPD ≥ 1 실증·조건부 보증 초안), 2027년 상반기(디자인인 1사·협약 공동 설계 조항·레퍼런스 스택 공개)다. 판돈은 락인으로 얻는 캐시 계층 점유율(2030년 350EB 중 QLC 조건부 상방 175EB), 비용은 개발실 개발 자원 투입이며 별도 투자는 없다.

**여섯째, 보증·SLA(6장).** 관행은 5년 또는 TBW·DWPD 선도달 보증이다. 호스트 배치를 전제로 한 유효 DWPD(정격 × 3 ÷ WAF)는 WAF가 오르면 그대로 삼성의 보증 부담이 된다. 정격 0.58은 WAF 1.74에서 보증선 1.0 아래로 내려간다. 따라서 보증 기준은 관행대로 TBW·물리 매체 기록량 선도달로 두고, 유효 DWPD는 WAF 밴드별 조건부 등급으로 표기하며, OCP SMART C0로 양측이 같은 WAF를 관측하고, 배치 규격 준수를 조건으로 하며, 초과 지속 시 재협상·감량 운영 조항을 둔다.

---

## 1장. 문제 — AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다

> **거버닝 메시지**: 결론을 내리지 않는다. 두 다운턴의 교훈은 요구를 고객 시스템 안에서 먼저 관측하라는 것이었고, 지금 그 요구는 고용량과 높은 DWPD로 이동했다. 고용량화는 다이 수(신뢰성)와 DWPD(내구성) 두 축의 해법을 요구한다.

### 1.1 두 다운턴의 교훈 — 센싱 2년, 협업 12개월, 결정 시점 2027H2

| 교훈 | 근거 | 지금의 등가 신호 | 받는 장 |
|---|---|---|---|
| **① 수요 센싱**: 요구는 발주·출하보다 약 2년 먼저 고객 규격·코드에 나타난다 | DT23 한복판(4Q22 eSSD −27%)에서 배치 표준 비준(2022-12-22)·OCP 폼팩터·61TB 예고 → 2024년 QLC 비트 30EB(4배) ([qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §2.1 ✅, [qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §2) | KV 캐시 관리자 4종(LMCache·Mooncake·FlexKV·3FS) 코드에 배치·내구성 규격 언급 0건 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §1 ✅) | 3장 |
| **② 고객 협업**: 규격 정의에 참여한 공급자가 선점했다 | Solidigm 61.44TB 2023-07(OCP 예고 후 9개월) vs 삼성 2024-07(12개월 후발) ([fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §2.5); HBM4는 NVIDIA와 규격을 공동 정의한 SK hynix가 주도 | 다운턴 극복의 결정 변수는 방어가 아니라 요구 적중 | 5장 |
| **③ 의사결정 시점**: 직전 다운턴의 결정이 다음 다운턴의 초기 조건 | DT19 무감산 성공 → DT23 국면 오판, DT19 HBM 조직 축소 → DT23 주도권 상실 ([downturn-history.md](../../wiki/downturn/downturn-history.md) §4) | 차기 전환점은 2027년 하반기 가격 정상화 국면(TrendForce 2H27 공급 완화, Counterpoint 4Q27 가격 개선 신호) | 4장 |

상세는 [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §3.5.

### 1.2 요구의 이동 — 세 국면의 구매 기준

| 축 | 초기 (2018~2023) | 현재 (2024~2026) | 향후 (2027~2030, 추론 캐시 계층) |
|---|---|---|---|
| 구매 기준 | TB당 TCO — 원가·랙 밀도 | TB당 TCO — 전력·공급 확보 | GPU당 컨텍스트 용량 · 토큰당 비용 |
| 드라이브 용량 | 15.36 / 30.72TB → 61.44TB(2023-07, 1Tb 다이) | 122.88 ~ 245.76TB(2025, 2Tb 다이, 다이 8배) | 256TB 예고, E2 폼팩터 1PB |
| 요구 DWPD | 0.3~0.6(읽기 중심) | 랜덤·순차 스펙 분리 | 1~3 — KV 캐시 계층 제품(TLC: Kioxia CM9 1/3 DWPD, CMX 타깃 SSD 전부 TLC)의 정격. 쓰기 강도는 프레임워크별로 크게 달라 실측 필요 |
| 고객이 사는 것 | 드라이브 | 드라이브 + 공급 약정 | 워크로드에 검증된 TCO(WAF·전력·QoS 보증) + 스택 통합 |
| 경쟁 대상 | HDD | HDD·TLC | TLC 1~3 DWPD, SLC AI SSD, 고객 자체 SSD |

세 국면의 구매 기준은 일관되게 용량 계층의 TB당 TCO였고, 바뀐 것은 워크로드의 쓰기 비중과 드라이브당 용량이다. 향후 국면을 니어라인 HDD 대체가 아니라 추론 캐시 계층으로 두는 이유는 부록 E.3. 출처: [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §3.3·§3.4, [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.3.

### 1.3 격차의 정직한 크기 — 동급 비교 2~10배

| 제품 | NAND | 용량 | 정격 DWPD | 비고 |
|---|---|---|---|---|
| Solidigm D5-P5336 | QLC | 61.44TB | 0.58 | 5년 보증 |
| Micron 6550 ION | QLC | 61.44TB | 1.0 RDWPD | 16KB 랜덤 기준 |
| Kioxia LC9 | QLC | 245.76TB | 0.3 | 최대 용량 |
| Kioxia CM9 | TLC | KV 캐시 계층 제품군 | 1(읽기 집중) / 3(혼합) | CMX 타깃 |

동급 61TB 비교는 QLC 0.58~1.0 대 TLC 1~3(약 1~5배), 최대 용량 245TB QLC 0.3 대 혼합용 TLC 3은 10배다. 따라서 **동급 비교 격차는 2~10배**가 정직한 범위다 ([component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) F48 🟡). 최저 정격 QLC 0.075와 TLC 3을 짝지은 극단 조합만 40배이며, v1.0의 "10~40배"는 이 극단 조합이었다. KV 캐시의 쓰기 강도 자체도 프레임워크에 따라 크게 다르다. DeepSpeed·FlexGen 오프로드 트레이스는 읽기 평균 2.0GiB/s 대 쓰기 11MiB/s로 읽기 편중이고(CHEOPS 2025, 같은 소스 F49), 공유 프리픽스 캐시(LMCache·Mooncake)는 쓰기 비중이 다르므로 요구 DWPD 1~3은 제품 정격이지 실측 요구가 아니다.

수요의 크기는 7장의 모델이 준다. QLC eSSD 비트는 2025년 53EB에서 2030년 550EB(10배)로 늘고, 2030년 추론 캐시 계층 NAND 수요는 350EB, 그중 QLC는 호스트 협력이 성립할 때의 조건부 상방 175EB다.

### 1.4 고용량화의 두 축

245TB급 고용량화는 두 개의 다른 문제를 동시에 만든다.

| 축 | 단품 지표의 변화 | 요구 | 해결 주체 | 장 |
|---|---|---|---|---|
| **신뢰성** | SSD당 NAND 다이 수 128 → 1,024(8배) | 기능 고장률 FFR ≤ 3% 고정(JESD218) | SSD 내부 설계(다이 패리티·여분 다이·감량 운영·텔레메트리) | 2장 |
| **내구성** | P/E 사이클 SLC → QLC 100배 감소, 정격 DWPD 17 → 0.4 | 요구 DWPD 1~3 고정 | 잔여 변수 WAF는 호스트·애플리케이션이 결정 → 고객 협업 | 3장 |

두 축은 구조가 같다. 요구는 고정이고 단품 지표는 악화됐으며 격차는 상위 계층이 보상한다. 다른 것은 어느 계층이 보상할 수 있는가이다.

---

## 2장. 신뢰성 축 — 첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다

> **거버닝 메시지**: 요구 FFR ≤ 3%는 고정인 반면 SSD당 다이 수는 128 → 1,024로 늘었다. 다이 고장률 개선이 기술적 한계에 접근하므로 해법은 다이가 아니라 SSD 계층에 있고, 호스트에는 관측 지표만 제공한다.

### 2.1 요구 고정 대 다이 수 8배

JESD218은 클라이언트·엔터프라이즈 모두 기능 고장률 FFR ≤ 3%를 요구하며, 내구성 등급(TBW)은 이 FFR을 만족하는 최대 쓰기량으로 정의된다 ([component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) F41 ✅). 한편 SSD당 다이 수는 다음과 같이 늘었다(raw 용량 ÷ 다이 밀도 환산, S3700·LC9는 실측, 같은 소스 F42 🟡).

| 제품 (연도) | 다이 | SSD당 다이 수 |
|---|---|---|
| Intel DC S3700 800GB (2012) | 64Gb 25nm MLC | 128 |
| Intel DC P4510 8TB (2018) | 512Gb 64L TLC | ≈144 |
| Solidigm D5-P5316 30.72TB (2021) | 1Tb 144L QLC | ≈256 |
| Solidigm D5-P5336 61.44TB (2023) | 1Tb 192L QLC | ≈512 |
| Kioxia LC9 245.76TB (2025) | 2Tb BiCS8 QLC, 32다이 스택 × 32패키지 | 1,024 |

### 2.2 고장 모델 — 다이 고장률 상한은 8배 낮아진다

보호가 없고 다이가 독립적으로 고장나면 SSD 생존 확률은 (1−p)^N ≈ e^(−Np)다. 반도체 수율의 포아송 모델 Y = e^(−AD)(면적이 클수록 수율 하락)와 같은 구조다. 같은 FFR을 지키는 다이 고장률 상한은 p ≤ 1 − 0.97^(1/N)이므로 128다이에서 2.4e-4, 1,024다이에서 3.0e-5로 **8배 엄격**해진다. 단일 다이 고장을 허용하면 상한은 √(0.03 ÷ C(N,2))로 p에서 p² 차수로 완화된다 (같은 소스 F43, 독립 고장 모델 ⚠️). 다이 고장률 개선이 기술적 한계에 접근하므로 해법은 SSD 계층으로 이관된다.

### 2.3 SSD 내부 해법 세 가지

| 해법 | 원리 | 선례 | 비용 | 효과 |
|---|---|---|---|---|
| **① 다이 패리티(RAID-like XOR)** | 슈퍼페이지를 여러 다이에 걸쳐 구성하고 패리티 다이에 XOR 저장, 단일 다이 고장 시 복구 | Micron RAIN, Cai 외 superpage-level parity (F44) | 패리티 다이 용량(1/스트라이프), 다이 수와 함께 스트라이프 설계 재최적화 | SSD 고장률 p → p² 차수, FFR 여유 확보 |
| **② 여분 다이 · 다이 은퇴 · 감량 운영** | 고장 다이 감지 → 데이터 재배치 → 고장 다이 제외 운영(Fail-in-Place), 필요 시 여분 다이 투입 | 삼성 PM1733/1735 FIP: 플레인 고장 4GB, 다이 고장 8GB 감량 운영 (F45 ✅), Kioxia die failure recovery | 예비 용량, 감량 시 고객 용량 계약 조건 | 다이 고장이 SSD 교체로 이어지지 않음, 수리 비용 감소 |
| **③ 텔레메트리 · 사전 예측** | 다이별 RBER 추이·XOR 복구 횟수·리드 리트라이로 징후를 감지해 사전 은퇴 | OCP SMART Cloud Health(C0) XOR 복구 카운트 (F46), 삼성 텔레메트리(KV 백서) | 펌웨어 통계, 로그 대역, 예측 모델 검증 | 돌발 고장 → 계획 감량, 1,024다이급의 관리 가능성 |

### 2.4 호스트·플랫폼의 역할 — 관측과 수용

호스트는 SSD가 노출한 지표(XOR 복구 카운트, 감량 예고)를 관측하고 감량 운영을 수용한다. OCP Datacenter NVMe SSD 사양의 SMART C0가 관측 필드이고(F46), Microsoft Research Hyrax는 부품이 고장난 서버를 교체하지 않고 저하된 용량을 스케줄러가 흡수해 수리 요구를 50~60% 줄였다(F47 🟡). 드라이브 간 소거 부호가 SSD 단위 고장을 흡수한다. **다이 고장의 해결 주체는 SSD이고 호스트 협력은 규격(텔레메트리 필드·감량 정책)에 한정된다.**

### 2.5 삼성 과제

1,024다이급에서 패리티·예비 비율을 FFR과 용량 오버헤드 사이에서 재최적화한다. FIP 감량 정책과 텔레메트리 필드를 OCP에 규격으로 제안한다. 다이 고장 예측 모델을 6장의 수명 보증(재협상·감량 운영 조항)과 연결한다.

**결론**: SSD 고장률 ≈ N × 다이 고장률에서 늘어난 N만큼을 다이 패리티·여분 다이·감량 운영으로 SSD 안에서 흡수한다. 이 축은 SSD 내부에서 충족되지만, 둘째 축 내구성(DWPD)은 SSD 내부에서 충족되지 않았다.

---

## 3장. 내구성 축 — 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다

> **거버닝 메시지**: 요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층이 보상해 왔다. 1단계 ECC는 완결, 2단계 SSD 단독 최적화는 부분 성공이다. DWPD 산식의 잔여 변수 WAF는 데이터 수명을 아는 호스트·애플리케이션만 낮출 수 있으므로 고객 협업과 새로운 역량이 필요하다.

### 3.1 이관 매트릭스 — 요구 고정, 단품 악화, 보상은 상위 계층으로

| 이관 단계 | 요구 (고객이 정한다 · 고정) | 단품 지표 (셀·다이 · 세대마다 악화) | SSD 계층의 보상 | 호스트·시스템 계층의 보상 |
|---|---|---|---|---|
| 내구성 축 | DWPD 1~3(추론 캐시 계층 제품), UBER 10⁻¹⁵(클라이언트)·10⁻¹⁶(엔터프라이즈, JESD218) | P/E 사이클 SLC 30K~100K → QLC 100~1K(100배 감소), RBER 약 10⁶배 상승 | 1단계 컨트롤러 ECC: 1비트/512B → LDPC 120비트/KB(60배) → UBER 요구 충족, 완결. 2단계 SSD 단독 워크로드 최적화(2014~2019) → QoS·성능 개선, WAF ≈ 3, 부분 성공 | 3단계 호스트 공동 설계(2022~): 호스트가 데이터 수명을 지정 → WAF ≈3 → ≈1, 요구 도달은 조건부 |

DWPD 산식 DWPD = P/E × (1 + OP) ÷ (WAF × 365 × 년)의 각 항은 결정 주체가 다르다. P/E는 셀(단품), OP는 SSD, WAF는 호스트·애플리케이션, 보증연수와 요구 DWPD는 고객이 정한다 ([component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) F29 ✅, F35). 지표 근거는 같은 소스 F28(UBER)·F30(정격 DWPD 17 → 10 → 0.7 → 0.41)·F32(RBER)·F33(ECC). 모델과 해설은 [solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md) §2.5, 상세 보고서는 [memory-solution-ladder-report.md](memory-solution-ladder-report.md).

### 3.2 1단계 ECC 완결, 2단계 SSD 단독 최적화 부분 성공

셀이 못 지킨 것은 BER이고 컨트롤러는 ECC를 60배 키워 UBER 요구를 지켰다(F33). 그러나 ECC는 P/E 자체를 늘리지 못하므로 정격 DWPD는 17(X25-E, 2008) → 10(S3700) → 0.7(P4510) → 0.41(P5316 30.72TB, 2021)로 내려왔다(F30). SSD 진영은 2014~2019년에 디바이스·드라이버 안에서 워크로드에 적응하려 했다. Multi-streamed SSD(HotStorage'14, F36), AutoStream 런타임 감지 배정(SYSTOR'17, F37), FTL 핫/콜드 추정(F38), NVMe IO Determinism(F39)이다. 이들은 QoS·성능은 개선했으나 **실 워크로드 WAF는 약 3에 머물렀다**. 원인은 데이터 수명이 호스트·애플리케이션에만 있는 정보라서 SSD가 LBA 접근 패턴만으로는 감지할 수 없기 때문이다(F38·F40). 이것이 2단계가 부분 성공에 그친 이유이고, 3단계 호스트 공동 설계의 전제다.

### 3.3 3단계 호스트 공동 설계 — WAF ≈3 → ≈1의 근거와 한계

| 근거 | 결과 | 등급 |
|---|---|---|
| 배치 표준 범용 실측(삼성·NVM Express, 랜덤 워크로드 50% 사용률) | WAF 약 3 → 약 1, 전력 −43.6% | 🟡 F51 |
| CacheLib(Meta) 배치 표준 지원, EuroSys'25, 100% 사용률 | WAF 3.22 → 1.03 | ✅ F15·F34 |
| 호스트 쓰기 패턴만으로 SSD WAF = 1 보장(VLDB 2026 "How to Write to SSDs", NoWA 패턴, 데이터베이스) | YCSB-A 플래시 쓰기 6.2~9.8배 감소 | 🟡 F50 |
| FAST'26 WARP(배치 표준 에뮬레이터) | RUH 격리가 객체 수명과 정렬될 때 WAF ≈1 유지, 오분류·RUH 간섭·적대적 무효화에서는 실패 | 🟡 [fdp-technical-limits-adoption-context-2026-08.md](../../sources/articles/fdp-technical-limits-adoption-context-2026-08.md) §3 |
| **KV 캐시 워크로드의 배치 표준 WAF 실측** | 공개 문헌에 없음(2026-09-19 검색 기준) | ⚠️ F52 |

따라서 "QLC로 KV 캐시 요구 DWPD를 충족한다"는 **검증할 가설**이며, 4장 Phase 2 실측(고객 트레이스 기반 RUH 정책·WAF)이 그 검증이다. 덱 3장의 WAF 차트는 KV 캐시 칸을 빈 막대(미실측 · 가설)로 그린다.

### 3.4 격차 축소 변수 — 호스트 배치 하나로는 2~10배가 해소되지 않는다

| 변수 | 산식 항 | 결정 주체 | 상태 |
|---|---|---|---|
| 다이 세대 | P/E ↑ (2Tb QLC) | 셀·다이 | 병행 중 |
| OP | (1 + OP), 예비 용량 | SSD | 병행 중 |
| SLC 캐시 · 쓰기 정형 | GC 효율, 순차화 | SSD | 병행 중 |
| 보증연수 · TBW 기준 | 365 × 년, 정격 산정 | 고객·계약 | 병행 중 |
| 워크로드 재정의 | 어드미션, TLC 혼합 계층 | 고객·앱 | 병행 중 |
| **호스트 배치 (WAF)** | ≈3 → ≈1, 유효 DWPD ×2.9 | 호스트·앱 · **본 보고** | 잔여 변수 |

WAF 변수는 유효 DWPD 약 2.9배이고 동급 비교 격차는 2~10배이므로, 다이 세대·OP·SLC 캐시·보증연수·워크로드 재정의와 결합해야 요구에 도달한다. 이 축들은 모두 병행 중이며 본 보고는 호스트 축만 다룬다. 호스트·고객 측 변수가 다수라는 점이 공동 설계의 근거다 (같은 소스 §10 독해).

### 3.5 왜 고객 협업과 새로운 역량인가

신뢰성 축은 SSD 안에서 충족됐지만 내구성 축의 잔여 변수 WAF는 SSD 밖 호스트가 결정한다. 데이터의 생애주기는 호스트가 알고 있으므로 유사 수명 데이터를 같은 RU에 묶는 host/device cooperation이 WAF를 낮춘다(F40). 호스트가 배치를 결정하는 이상, SSD 벤더가 할 일은 디바이스를 잘 만드는 것을 넘어 고객의 워크로드와 시스템을 이해하고 함께 설계하는 것이다. 그 역량이 4장이다.

**결론**: 요구는 고정, 단품은 악화, 격차는 상위 계층이 보상해 왔고, 잔여 변수 WAF는 SSD 밖 호스트가 결정한다. 다이 세대·OP·보증연수와 병행하되, 이 변수는 고객 협업과 새로운 역량을 요구한다.

---

## 4장. 역량 — 따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다

> **거버닝 메시지**: 워크로드는 고객 시스템 말단의 현상이다. 그것을 분석하는 단계를 넘어 고객의 응용·시스템 소프트웨어를 이해하고 함께 설계해야 추론 캐시 계층에 들어갈 수 있다. 삼성은 디바이스와 도구는 갖고 있으나 KV 캐시 스택과의 연결이 비어 있다. "승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져간다"(신문섭, Bain, [expert-interview-ai-infra-supercycle-2026-06-18.md](../../sources/raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md)).

### 4.1 기술 스택 지도 — 벤더가 들어갈 수 있는 자리

KV 캐시 오프로드 스택은 5계층으로 굳어졌다. ① 추론 엔진(vLLM·SGLang·TensorRT-LLM), ② KV 캐시 관리자(NVIDIA Dynamo KVBM, LMCache, Mooncake, Tencent FlexKV, ByteDance AIBrix, Alibaba Tair KVCache, DeepSeek 3FS), ③ 전송·I/O 라이브러리(NIXL, GPUDirect Storage, io_uring, SPDK/xNVMe), ④ 커널·플랫폼(Linux 6.16 write streams·XFS·f2fs, NVIDIA CMX·DOCA Memos), ⑤ 디바이스. ②계층 저장소 4종의 README에는 배치 표준·write hint·내구성 언급이 없다(✅ GitHub 확인). 수명 정보는 ②에 있는데 ⑤로 내려보내는 코드가 없다. **SSD 벤더가 코드로 들어갈 수 있는 자리는 ③·④이고, 2026년 커널·XFS가 열리면서 이 자리가 비어 있다** ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §1).

### 4.2 격차 네 가지

| 격차 | 크기 | 내용 |
|---|---|---|
| 내구성 격차 | 2~10배 | 동급 61TB QLC 0.58~1.0 · 245TB 0.3 대 TLC 1~3 DWPD (1장 §1.3) |
| 스트림 격차 | 25배 | 삼성 QLC 라인 RUH 2~8개 대 ScaleFlux 200개 이상 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2 🟡) |
| 접점 부재 | 0건 | 캐시 관리자 4종 코드의 배치 규격 언급 (§4.1 ✅) |
| 해소 수단 실증 | ≈3 → ≈1 | 범용·캐시 WAF 실측은 있으나 KV 캐시는 미실측 (3장 §3.3) |

### 4.3 세 Phase의 정의와 요구 역량

| Phase | 정의(사용자 결정) | 요구 역량 | 업계 최고 공개 수준 | 삼성 공개 수준 | 갭 |
|---|---|---|---|---|---|
| **1 디바이스** | 배치 표준 SSD를 잘 만든다 | RUH 200+ 펌웨어, QLC 미디어 관리(2Tb 다이·SLC 캐시·배치 표준 적용 시 WAF ≈1), PCIe 5→6·NVMe KV 확장·NVMe-oF, W/TB·액체냉각, CMX/STX·OCP 인증, 에뮬레이터 | ScaleFlux RUH 200+·유효 7~10 DWPD, Kioxia CM9/CM10 3 DWPD 캐시 계층 | PM1753 CMX 첫 공급(TLC), PM1763 Gen6, BM1773 245TB QLC 전시. RUH·DWPD·배치 표준 지원 미공개 | QLC를 캐시 계층에 지명한 제품 없음 |
| **2 워크로드 최적화** | 고객 워크로드 분석으로 그 SSD를 최적화한다 | 트레이스 수집·재현(HiSim류), WAF·p999·전력 정량, 수명·테넌트·prefix → RUH 정책, 관리자 정책(KVBM 빈도≥2 필터)과의 결합, 디지털 트윈, 표준 프로파일 | Alibaba Tair HiSim, SK hynix SALT-KV, ScaleFlux 텔레메트리, CacheLib WAF 실측 | KV 캐시 백서 2종(PM1753, CMM-D with vLLM+LMCache), CacheLib·RocksDB·XFS 배치 지원 | KV 캐시 트레이스 기반 RUH 정책·WAF 실측 미공개(업계 공백) |
| **3 공동 설계** | 고객 시스템 이해로 함께 설계한다 | 추론 스택 내부(스케줄러·prefix 캐시·KVBM·NIXL·DOCA Memos), 커널 I/O 경로, 시스템 TCO 모델(디바이스→랙→DC), 스펙 상류 참여·표준, 공동 계약 | Micron↔Anthropic SSD 공동 설계 계약, FlexKV의 vLLM·SGLang·TRT-LLM·Dynamo 메인라인 머지 | Meta CacheLib 배치 표준 업스트림·EuroSys'25(5사 중 최강 선례), Anthropic 파트너 | KV 관리자 4종에 기여 0, 공급계약에 공동 최적화 조항 없음 |

출처: [qlc-workload-capability-phases.md](../../wiki/strategies/qlc-workload-capability-phases.md) §2~§4·§6. 단계마다 고객 보증 범위가 정격 내 QLC 원가·전력 → 고객 워크로드 기준 수명 → 시스템 수준 TCO로 확장된다.

### 4.4 삼성 현 위치 — Phase 1 진행 중

**Phase 1 진행 중**: CMX 첫 공급은 TLC(PM1753)이고, QLC 라인의 RUH는 2~8개로 200개 이상에 미달하며 DWPD가 미공개다. **Phase 2 준비**: KV 캐시 백서 2종으로 측정 역량은 있으나 트레이스 기반 실측이 미공개다. **Phase 3 미착수**: 캐시 관리자 4종 기여 0건, 공급계약에 공동 최적화 조항 없음. v1.0의 "Phase 1 확보" 표기는 스트림 격차 25배와 모순이어서 정정했다 (같은 위키 §6 덱 표기). 오케스트레이션(Dynamo·LMCache·Mooncake) 자체는 만들지 않는다. 그 아래의 기본 백엔드·디바이스·통합 서비스가 자리다.

### 4.5 Phase별 산출물과 기술 전략

- **Phase 1 "KV-ready QLC"**: 245TB급 V9 2Tb QLC에 RUH 200+, 세션·테넌트 격리, WAF·수명 텔레메트리, NVMe KV 확장, 액체냉각을 갖추고 유효 DWPD를 워크로드 조건부로 보증하는 제품. 스펙에 "어떤 호스트 정책에서 얼마의 유효 DWPD"를 표로 싣는다(6장).
- **Phase 2 "워크로드 프로파일 + 검증 리포트"**: 고객 유형별 KV 캐시 프로파일 3종, RUH 매핑·WAF·유효 DWPD·전력 실측, 수명 보증 조건표, 고객이 재현할 수 있는 프로파일러·에뮬레이터.
- **Phase 3 "레퍼런스 스택 + 공동 설계"**: 고객 추론 스택에서 삼성 QLC가 기본 백엔드로 선택되는 레퍼런스 아키텍처(메인라인 머지된 커넥터 포함), 공용 TCO 모델, 협약의 공동 설계 조항.

기존 강점(컨트롤러·펌웨어·미디어 수직계열화, 배치 표준 공동 주도와 xNVMe·XFS·CacheLib 오픈소스 자산, KV 캐시 워크로드 측정 백서, CMX 첫 공급, Meta CacheLib 공동 설계 선례) 위에 쌓을 것은 그 자산을 KV 캐시 계층(③)에 연결하는 커넥터·플러그인, 트레이스 재현기·프로파일러의 고객 공용 도구화, DOCA Memos 힌트↔배치 표준 매핑 공동 정의, 시스템 TCO 모델링이다. 참여할 스택의 우선순위는 ③ I/O 라이브러리 write stream 부착(LMCache·FlexKV의 io_uring·GDS 백엔드, NIXL 스토리지 플러그인, xNVMe 배치 API) → ④-a 커널·파일시스템(XFS write streams·f2fs 배치 패치 메인라인 완주) → ④-b CMX·DOCA Memos 힌트 매핑 → ② 캐시 관리자 정책과 RUH 분리의 결합 설계 제안 → 표준·커뮤니티(SNIA SDC StorageAI, OCP–SNIA AI 스토리지, NVMe TP) → 디지털 트윈(WARP류 에뮬레이터 + HiSim류 재생기)이다 ([qlc-workload-capability-phases.md](../../wiki/strategies/qlc-workload-capability-phases.md) §5).

**결론**: 단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장된다. 삼성은 1단계 진행 중·2단계 준비 단계이며, 3단계 진입 수단이 5장이다.

---

## 5장. 실행 — 3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다

> **거버닝 메시지**: 실행의 목표는 두 가지다. 고객의 워크로드를 받는 것, 그리고 고객 시스템 안으로 들어가 함께 설계하는 것. FDE 상주는 워크로드를 개방하는 고객에만 효과가 있으므로 1~2사에 집중하고, 나머지 고객은 업스트림·규격·레퍼런스 채널로 넓힌다. 실행 범위는 개발실 내부에서 가능한 것으로 한정한다. "단 한 번도 고객 지향적인 적이 없었다. 진짜 고객 지향이 뭔지 이해하고, 그것을 위한 전략이 필요한 시점이 이미 됐다"(송용호 AX/PI센터장, [song-yongho-ax-pi-interview-2026-09-03.md](../../sources/raw-notes/song-yongho-ax-pi-interview-2026-09-03.md)).

### 5.1 두 목표와 왜 하던 대로는 안 되는가

| 목표 | 무엇을 얻나 | 어떻게 여나 |
|---|---|---|
| ① 워크로드를 받는다 | KV 블록 트레이스, 캐시 관리자의 수명 정책, 레퍼런스 스펙의 기본값 자리 | 협약의 공동 설계 조항, 실측 공개로 쌓는 신뢰, 조건부 보증(6장)으로 리스크 분담 |
| ② 고객 시스템 안으로 들어간다 | 캐시 관리자·I/O·커널에 메인라인 코드, 고객 아키텍트 옆의 상주 엔지니어, 공용 TCO 모델 | Co-Design Pod 상주(FDE), 업스트림 우선, 시스템 소프트웨어 조직 강화 |

두 목표는 서로를 강화한다. 워크로드가 와야 최적화할 수 있고, 안에 들어가야 워크로드가 온다 ([qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §2.0). 하던 대로가 안 되는 이유는 네 가지다. 캐시 계층의 스펙(수명·재사용·무효화 정책)은 고객 캐시 관리자 안에 있고 RFQ에 적히지 않는다. 커널·파일시스템·추론 엔진·캐시 관리자 4개 커뮤니티의 메인테이너 문법은 펌웨어 엔지니어의 겸업으로 얻어지지 않는다. 제품 로드맵에 묶이지 않은 오픈소스 조직은 소멸했다(Intel OTC). 물량 계약만으로는 공동 설계 조항이 생기지 않는다(Micron↔Anthropic은 공동 설계·운영 통합까지 묶었고 삼성·SK↔Anthropic 계약에는 그 문구가 없다) (같은 위키 §1).

### 5.2 고객 선별 — FDE 상주 조건과 고객 유형별 채널

FDE 상주 조건은 세 가지다. ① 트레이스·KV 정책 접근을 허용한다. ② 캐시 관리자 코드를 자체 운영한다. ③ 물량·규격 파급력이 있다.

| 고객 유형 | 워크로드 접근 | 협업 채널 | 삼성 방식 | 효과 극대화 포인트 |
|---|---|---|---|---|
| **AI 랩** (Anthropic · OpenAI) | 협약 시 트레이스·KV 수명 정책 공유 | 전략적 협약(SCA)의 공동 설계 조항 | **FDE 상주 Pod 3~5명** | Micron↔Anthropic 선례. 캐시 관리자 정책을 함께 정의해 수명 보증 레퍼런스 확보, 로고 효과 |
| **NVIDIA 생태계** (CMX · Dynamo KVBM · NIXL) | 파트너 프로그램, 레퍼런스 스택 코드 | 플러그인, CMX 힌트 매핑 공동 정의 | **FDE 상주 플랫폼 팀 파견** | CMX 첫 공급 관계 활용. KVBM 플러그인 메인라인 머지 → 생태계 기본 디바이스 |
| 하이퍼스케일러 (Meta · Google · MS · AWS) | 내부 코드 상주 불가(보안·중립성) | OCP 규격, 업스트림(CacheLib·XFS·커널) | 업스트림 기여, OCP 규격 제안 | 배치 표준 공동 주도 이력. OCP 텔레메트리·FIP 규격, 실측 공개로 신뢰 확보 |
| OEM · 네오클라우드 | 자체 캐시 스택 없음 | 삼성 레퍼런스 스택 채택 | 레퍼런스 아키텍처(vLLM + LMCache + QLC), 공용 TCO 모델 | 검증된 스택 제공으로 디자인인. FDE 없이 확산, 실측 데이터 재사용 |

선례: Palantir FDE는 고객 상주 엔지니어가 실제 운영 제약 아래서 시스템을 구축하고 성과로 평가받는 모델이며 Anthropic·OpenAI가 엔터프라이즈 GTM으로 채택했다 ([palantir-fde-model-2026-07.md](../../sources/articles/palantir-fde-model-2026-07.md)). Micron↔Anthropic 협약(2026-06-22)은 공동 설계·다년 공급·운영 통합·자본을 한 계약에 묶었고, 삼성·SK의 Anthropic 계약에는 공동 설계 조항이 없다 ([micron-anthropic-sca-2026-06-22.md](../../sources/articles/micron-anthropic-sca-2026-06-22.md)). 협약의 자본 요소는 덱 범위 밖이며(부록 D), 본 보고가 제안하는 것은 공동 설계 조항이다.

### 5.3 개발실 내부 실행 — 조직·인사·문화

| 축 | 내용 |
|---|---|
| **조직** | 시스템 소프트웨어 조직 강화(캐시 관리자·I/O·커널). Co-Design Pod 3~5명, 개발실 소속, 선별 고객 1~2사. 미주 법인 협업으로 고객 시간대 대응 |
| **인사** | 시스템 SW 전문가 채용·양성, 기준은 고객 코드를 읽고 고치는가. 본사 엔지니어 상주 로테이션(3~6개월). 성과 평가는 머지·실측 공개·디자인인 |
| **문화** | 오픈소스 메인테이너·커미터 배출, 업스트림 우선. KV 캐시 실측(WAF·유효 DWPD) 업계 최초 공개. 레퍼런스 프로젝트 운영으로 외부 기여 유입 |

자회사 설립·별도 보상 체계·지분 참여·결정 요청은 개발실 범위 밖이므로 본문에서 제외하고 부록 D(위키 유지)에 둔다(사용자 결정 2026-09-19, [qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §2.2 덱 범위 결정).

### 5.4 단계별 통과 조건 — 각 단계의 증명이 다음 단계의 승인 근거

| 단계 | 통과 조건 |
|---|---|
| **90일** | 등대 고객 1사 트레이스 확보. KV 캐시 실측(WAF·유효 DWPD) 공개. 캐시 관리자 플러그인 PR 1건 |
| **12개월** | 플러그인 메인라인 머지. 고객 워크로드에서 QLC 유효 DWPD ≥ 1 실증. 조건부 보증 초안(6장) |
| **2027년 상반기** | 디자인인 1사. 협약에 공동 설계 조항 제안. 레퍼런스 스택 공개 → 공급 완화 전 락인 |

시계가 2027년 상반기인 이유는 1장 §1.1의 교훈 ③이다. 2H27 공급 완화 이후 협상력은 사라지므로 워크로드·규격 접근권은 그 전에 고정한다.

### 5.5 판돈과 비용

| 항목 | 내용 |
|---|---|
| **판돈 · 락인으로 얻는 점유율** | 캐시 계층 QLC 0 → 50%. 2030년 추론 캐시 계층 350EB 중 QLC 175EB는 호스트 협력이 성립할 때의 조건부 상방이며, 락인이 없으면 TLC가 유지된다(7장 §7.2). 디자인인 1사당 점유율 변화는 `[사내 확인]` |
| **비용 · 개발실 자원 투입** | 별도 투자 없음. Pod 인력 3~5명 × 1~2사 재배치, 시스템 SW 채용은 정원 내, 실측 공개는 보안 검토만 |

### 5.6 참여할 스택과 협업 기업

| 기업 | 보유 기술 | 협업 목적 | 형태(개발실 범위) |
|---|---|---|---|
| NVIDIA | CMX·BlueField-4·DOCA Memos·Dynamo KVBM·NIXL | 플랫폼 게이트, 힌트 매핑, 레퍼런스 백엔드 | STX 인증 + 공동 기술 정의, FDE 플랫폼 팀 파견 |
| Anthropic · OpenAI | 추론 스택·KV 수명 정책의 원천 소유자 | 스펙 상류 | 협약 공동 설계 조항 제안, FDE Pod |
| Meta | CacheLib(배치 표준 기지원), QLC 용량 계층 | 캐시 계층 활성화 + KV 캐시 확장 | 기존 공동 설계의 업스트림 확장 |
| Google · Microsoft · AWS | 배치 표준 공동 설계자, OCP 규격 | 스펙 상류·활성화 | OCP 텔레메트리·FIP 규격 제안, 공동 프로파일 |
| Tensormesh(LMCache) · Moonshot(Mooncake) · Tencent(FlexKV) · Alibaba(Tair) | 캐시 관리자, HiSim | 배치 표준 백엔드 업스트림, 인터페이스 정합 | 오픈소스 기여·메인테이너 |
| VAST Data · DDN · WEKA | CMX 파트너, KV 캐시 SW | 6~12개월 실증·레퍼런스, 네오클라우드 채널 | 인증·레퍼런스 스택(지분 참여는 부록 D) |
| ScaleFlux · Marvell · Silicon Motion | 200+ 스트림·텔레메트리, KV 오프로드 컨트롤러 | Phase 1·2 벤치마크 | 비교 대상 |
| Linux Foundation · SNIA · OCP | 커널 write streams, StorageAI, AI 스토리지 표준 | 표준 지위 | 워킹그룹 참여·에디터 |

출처: [qlc-workload-capability-phases.md](../../wiki/strategies/qlc-workload-capability-phases.md) §5.3, [execution-benchmarks-sw-capability-customer-collab-2026-09.md](../../sources/articles/execution-benchmarks-sw-capability-customer-collab-2026-09.md) §2·§4.

### 5.7 KPI와 리스크

핵심 KPI는 **고객 캐시 계층에서 실제 활성화된 삼성 QLC 용량(EB)**이다. 보조 KPI는 업스트림 머지 수, 기본 백엔드 채택, 공개 실측 인용, 협약 공동 설계 조항 수, 조건부 보증 이행률, qualification 기간, 유효 DWPD 실측, 시스템 SW 전문가 인원, 메인테이너·커미터 수, 레퍼런스 프로젝트의 외부 기여자 수다.

리스크와 대응: 하이퍼스케일러 협업의 통제권 잠식(펌웨어·텔레메트리 통제권 유지), KV 캐시 압축·SLC 상단 이동(대용량·긴 수명 블록 구간 집중, 용량 계층 회귀 가능한 공통 펌웨어), KV 캐시 배치 표준 WAF 가설의 기각(Phase 2 실측이 12개월 통과 조건이며, 기각 시 TLC 혼합 계층으로 워크로드 재정의), 수명 보증의 품질 리스크(6장), 메인테이너 지위의 개인 귀속(프로젝트당 2명 이상·조직 소유) ([qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §5~§6).

**결론**: FDE는 워크로드를 개방하는 1~2사에 집중해 효과를 극대화하고, 나머지 고객은 업스트림·규격·레퍼런스 채널로 넓힌다. 판돈은 락인으로 얻는 캐시 계층 점유율, 비용은 개발실 개발 자원 투입이다. 실행의 마지막 리스크가 수명 보증·SLA(6장)다.

---

## 6장. 수명 보증·SLA — 유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다

> **거버닝 메시지**: 4장·5장의 전략은 고객 시스템 위에서 유효 DWPD를 보증하는 수익 모델을 전제한다. 그 보증은 워크로드 변화 리스크를 삼성이 떠안는 구조이므로, 보증 기준은 관행대로 두고 유효 DWPD는 조건부로만 표기한다.

### 6.1 보증 관행과 유효 DWPD 산식

엔터프라이즈 SSD 보증은 "기간(통상 5년) 또는 TBW·DWPD 선도달"이다. 삼성 PM9A3는 "5년 또는 DWPD 선도달", Micron 엔터프라이즈 SSD도 같다 ([component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) F53 ✅). 정격 DWPD는 통상 4KB 랜덤 쓰기 WAF 약 3 기준으로 산정된다(F29). 호스트 배치로 WAF가 1에 가까우면 유효 DWPD = 정격 × (3 ÷ WAF)로 정격의 약 3배가 되지만, WAF가 오르면 그대로 내려간다.

| 정격 (제품) | WAF 1.0 | WAF 1.2 | WAF 1.74 | WAF 2.0 | WAF 3.0 |
|---|---|---|---|---|---|
| 1.0 (61TB QLC, 6550 ION) | 3.0 | 2.5 | 1.7 | 1.5 | 1.0 |
| 0.58 (61TB QLC, P5336) | 1.74 | 1.45 | **1.0** | 0.87 | 0.58 |
| 0.3 (245TB QLC, LC9) | 0.9 | 0.75 | 0.52 | 0.45 | 0.3 |

보증 목표를 KV 캐시 계층 하한 1.0 DWPD로 두면, 정격 0.58은 WAF 1.74에서 보증선 아래로 내려가고 정격 0.3은 WAF 1.0에서도 0.9에 그친다. 산식 모델(⚠️)이며 덱 6장 차트의 근거다.

### 6.2 리스크 시나리오 — WAF가 오르는 경우

| 시나리오 | 내용 | 결과 |
|---|---|---|
| ① 워크로드 변화 | 퇴거 정책·프리픽스 재사용률·세션 길이가 바뀌면 데이터 수명 분포가 바뀌어 WAF 상승. KV 캐시 쓰기 강도 자체가 프레임워크별로 상이(F49) | 보증 기간 내 TBW 조기 소진 → RMA·교체 비용을 삼성이 부담 |
| ② 오분류 · RUH 간섭 | 수명 오분류와 RUH 간 간섭(noisy RUH)이 격리를 깨면 다른 핸들의 WAF까지 상승(FAST'26 WARP) | 동상 |
| ③ 고객 스택 업데이트 | 캐시 관리자·I/O 라이브러리 버전 변경으로 배치 힌트가 사라지면 정격 WAF ≈3으로 회귀 | 동상 |

### 6.3 보증 설계 원칙 다섯 가지

| # | 원칙 | 내용 |
|---|---|---|
| 1 | 보증 기준은 관행대로 TBW · 물리 매체 기록량 선도달 | 5년 또는 TBW·DWPD 선도달(삼성 PM9A3·Micron 관행). 유효 DWPD는 부가 표기이지 보증 기준이 아니다 |
| 2 | 유효 DWPD는 WAF 밴드별 조건부 등급 | WAF ≤ 1.2 / ≤ 2.0 / > 2.0 각각에 보증 DWPD를 매핑. 정격 0.58은 WAF 1.74에서 1.0 아래로 내려가므로 밴드 경계를 명시 |
| 3 | 양측이 같은 텔레메트리로 WAF를 관측 | OCP SMART C0의 "Physical Media Units Written" ÷ 호스트 "Data Units Written" = WAF. 사양이 WAF 산출 목적을 명시(F54 ✅). 분기 실측 리포트를 계약 부속으로 |
| 4 | 배치 규격 준수 조건 | RUH 매핑 가이드·캐시 관리자 정책 준수 시에만 유효 DWPD 적용. 미준수·힌트 손실 시 정격 기준으로 자동 복귀 |
| 5 | 재협상 · 감량 운영 조항 | WAF 초과가 지속되면 등급 재조정 또는 감량 운영(2장 FIP 유사). 무상 교체가 아니라 조건 재설정 |

### 6.4 연결

이 설계는 5장의 텔레메트리·실측 공개 실행 항목과 2장의 감량 운영 정책·다이 고장 예측 모델을 계약 언어로 옮긴 것이다. 12개월 통과 조건의 "조건부 보증 초안"이 이 장의 산출물이다.

---

## 7장. 수요 규모와 예상 매출 — 2022~2030 모델 (판돈의 근거)

> **거버닝 메시지**: QLC eSSD 비트는 2030년까지 10배 늘어 eSSD의 절반을 넘지만, 가격이 정상화되면 매출은 $30B대에서 정체한다. 비트 성장이 이익 성장이 아니므로, 이익은 고객 시스템 위에서 보증하는 TCO로 만들어야 한다. 5장의 판돈(캐시 계층 QLC 175EB)은 이 모델의 조건부 상방이다.

### 7.1 모델 표

| 연도 | 구분 | 전체 eSSD(EB) | QLC eSSD(EB) | QLC 비중 | eSSD 매출($B) | QLC $/TB | QLC 매출($B) 기준선 | QLC 매출 상단 | KV 캐시 NAND 수요(EB) | 그중 QLC(EB) |
|---|---|---|---|---|---|---|---|---|---|---|
| 2022 | 실측·추정 | 155 | 6 | 4% | 21.9 ✅ | 120 | 0.7 | 0.7 | 0 | 0 |
| 2023 | 실측·추정 | 115 | 7.5 | 6.5% | 7.0 ⚠️ | 52 | 0.4 | 0.4 | 0 | 0 |
| 2024 | 실측·추정 | 210 | 30 ✅ | 14% | 24 ⚠️ | 97 | 2.9 | 2.9 | 0 | 0 |
| 2025 | 실측·추정 | 265 | 53 | 20% | 26.5 🟡 | 85 | 4.5 | 4.5 | 0 | 0 |
| 2026 | 전망(e) | 340 (~390) | 102 (~120) | 30% (26~34) | 125 (1H 56 ✅) | 313 | 32 | 36 | 35 | 2 |
| 2027 | 전망(e) | 450 (~565) | 167 (~210) | 37% (32~42) | 99 | 187 | 31 | 50 | 90 | 9 |
| 2028 | 전망(e) | 600 (~825) | 264 (~340) | 44% (38~50) | 72 | 102 | 27 | 56 | 175 | 44 |
| 2029 | 전망(e) | 780 (~1,050) | 390 (~500) | 50% (43~56) | 74 | 81 | 32 | 60 | 260 | 104 |
| 2030 | 전망(e) | 1,000 (~1,300) | 550 (~720) | 55% (47~62) | 80 | 68 | 37 | 65 | 350 | 175 |

괄호는 상단 밴드. 가정표는 [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §4.3, 데이터는 `outputs/presentation/assets/qlc_model.csv`.

![QLC eSSD 수요(EB)·비중(%)·매출($B) 통합 그래프](../presentation/assets/qlc_demand_share_revenue.png)

### 7.2 앵커와 가정

- **앵커(실측)**: TrendForce 분기 eSSD 매출 2022~2Q26(2022 $21.9B, 2025 약 $26.5B, 1H26 $56.05B), 2024년 QLC eSSD 30EB(전년 4배), DC NAND 2025→2028 295→909EB(TechInsights, Kioxia IR 인용), KV 캐시 NAND 2027 75~100EB·2028 그 2배·2030 워크로드 35%(SanDisk), 30TB QLC $/TB 인덱스 $92(3Q25) → $603(3Q26) ([qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §1~§4).
- **EB 복원**: 2022~2025 전체 eSSD EB는 연 매출 ÷ 추정 ASP(2022 $141, 2023 $61, 2024 $114, 2025 $100/TB). 2025년 265EB는 Intel MR 수치와 일치한다. QLC 비중 2024년 14%(30/210)는 두 경로의 삼각측량(같은 소스 §2.3)과 일치.
- **전망**: 전체 eSSD 연 +28~30%(상단은 TechInsights DC NAND의 90%), QLC 비중 2026 30% → 2030 55%(근거: 2026 "출하 급증" 전망, 삼성 QLC 비트 2H26 2배, 5사 2Tb QLC 양산, Meta 용량 계층 설계). 가격은 2H27 공급 완화(TrendForce)와 4Q27 가격 개선 신호(Counterpoint)를 따라 2027 $220 → 2030 $80/TB(eSSD ASP), QLC는 그 85%. 쇼티지 지속 상단은 2027 $350 → 2030 $140.
- **추론 캐시 계층**: KV 캐시 NAND 수요 2026 35EB(CMX 공급망) → 2030 350EB, QLC 침투 5% → 50%. 침투는 RUH 200+ 디바이스·캐시 관리자 연동·조건부 수명 보증이 성립할 때의 조건부 상방이며, 미성립 시 0~10%다.

### 7.3 독해

1. **비트 10배, 매출 정체.** 2026년 $32B(쇼티지 가격)에서 2030년 기준선 $37B. 쇼티지가 이어져도 $65B. 비트가 늘어도 정상화된 가격에서는 매출이 늘지 않는다. 이익은 TB당 가격이 아니라 시스템 위의 TCO 보증(WAF·전력·QoS)으로 결정된다.
2. **QLC는 2028년경 eSSD 비트의 절반에 다가선다.** 이 흐름은 전략과 무관하게 진행되며, 삼성이 용량 후발이라도 물량 1위(2Q26 eSSD $14.35B, 35.1%)는 유지된다. 문제는 그 물량의 이익률이다.
3. **추론 캐시 계층은 조건부 상방이다.** 2030년 175EB는 QLC 총량의 32%이지만 성립하지 않으면 TLC·SLC가 가져간다. 그래프의 진한 파랑이 전략이 걸린 영역이고 5장의 판돈이다.
4. **창은 2027년 상반기까지다.** 공급 완화 이후 협상력은 사라진다. 워크로드·규격 접근권을 그 전에 고정할 시계다.

### 7.4 민감도와 삼성 몫

QLC 비중이 2030년 47%(하단)이면 QLC EB 470, 매출 기준선 $32B. 가격 정상화가 1년 늦으면 2028년 매출 $27B → $45B. 추론 캐시 침투가 0이면 2030년 QLC EB 375, 비중 38%. 삼성 몫은 `[사내 확인]` 전제 아래 QLC 점유 25%(2026) → 35%(2030, 캐시 계층 40%)로 두면 2030년 QLC 매출 기준선 $13B, 상단 $23B, 캐시 계층 QLC 70EB. 점유 5pt는 2030년 기준 약 $2B다 ([qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §4.4).

---

## 부록 A. 팩트체크 대장

| # | 주장 | 등급 | 출처 | 비고 |
|---|---|---|---|---|
| A-1 | 4Q22 eSSD 계약가 −25% QoQ, 매출 $3.79B(−27.4%) | ✅/🟡 | TrendForce 2023-03-06 (기존 소스 nand-downturn-2023-vendor-data) | 실측 |
| A-2 | 배치 표준 TP4146 비준 2022-12-22, Meta·Google 주도, WAF ~3 → ~1 | 🟡 | NVMe.org 백서·Blocks & Files 2023-08-14 | 비준일은 복수 인용 |
| A-3 | 2024년 QLC eSSD 30EB, 전년 4배 | ✅ | TrendForce 2024-04-23 (복수 미러 일치) | 모델의 유일한 QLC 비트 앵커. 2023 7.5EB는 역산 ⚠️ |
| A-4 | Meta QLC 계층: 10 MB/s/TB, HDD/QLC/TLC 3계층, 밀도 6배 | 🟡 | Meta Engineering 2025-03-04, The Register·SSD Guy 인용 | 원문 미열람 |
| A-5 | Solidigm TCO: 1U 1PB(20배), Ceph 5년 TCO −47%, 전력 −32.9~−79.5% | 🟡 | Solidigm 브리프·TCO 페이지 인용 | 벤더 마케팅 수치 |
| A-6 | 벤더 타임라인(61TB 2023-07 Solidigm, 삼성 2024-07, 122TB 2024-11, 245TB Micron 2026-05, LC9, BM1773 전시) | 🟡 | TechPowerUp·StorageReview·Blocks & Files·STH | BM1743 122TB 출하 여부 ⚠️ |
| A-7 | 2Q26 eSSD Top-5 $37.59B(+103.6%), 삼성 $14.35B(35.1%) | 🟡 | TrendForce 2026-09-01 검색 인용 | SanDisk 값은 잔차 ⚠️ |
| A-8 | 1H26 eSSD $56.05B(18.46+37.59) | ✅/🟡 | TrendForce 2026-06-11·09-01 | 1Q26은 기존 소스 ✅ |
| A-9 | 2022~2025 연간 eSSD 매출 21.9 / ≈7 / ≈24 / ≈26.5 | ✅/⚠️/⚠️/🟡 | TrendForce 분기 합산, 일부 QoQ 역산 | 1Q23 미확인 |
| A-10 | DC NAND 2025 295EB → 2028 909EB, 총 NAND 997 → 1,807EB | 🟡 | Kioxia Investor Day 2026-06-02(TechInsights 인용) | |
| A-11 | KV 캐시 NAND 2027 75~100EB, 2028 2배, 2030 워크로드 35% | ✅ | SanDisk FMS 2026 (기존 소스) | 연간·누적 정의 모호 ⚠️ |
| A-12 | CMX NAND 2026 35EB → 2027 100EB+, 삼성 V-NAND 캐파 60% CMX 배정 | 🟡 | 서울경제 2026-07-20 | 보도 |
| A-13 | 30TB QLC $/TB $92(3Q25) → $504(1Q26) → $603(3Q26), TLC 대비 −13~−20% | 🟡 | VDURA Flash Volatility Index | 인덱스, 하이퍼스케일 계약가 아님 |
| A-14 | 2H27 NAND 공급 완화, 4Q27 가격 개선 신호 | 🟡 | TrendForce 2026-07-30, Counterpoint | 모델 가격 경로의 근거 |
| A-15 | 최신 QLC 정격 0.075~0.6 DWPD vs 캐시 계층 TLC 1~3 DWPD (극단 조합 40배) | 🟡 | StorageReview·Solidigm 브리프·BusinessWire | v2.0부터 동급 비교(A-33)를 본문 수치로 사용 |
| A-16 | CacheLib 배치 표준 WAF 3.22 → 1.03(100% 사용률) | ✅ | github.com/facebook/CacheLib FDP 문서 | 직접 확인 |
| A-17 | XFS write streams v4: RocksDB YCSB WAF −35% | 🟡 | linux-fsdevel 2026-07 패치 요약 | 머지 상태 ⚠️ |
| A-18 | ScaleFlux 200+ 스트림, 유효 7~10+ DWPD | 🟡 | StorageReview·PR Newswire 2026-07-30 | NAND 종류 미공개 ⚠️ |
| A-19 | ②계층 4종 README에 배치 표준·write hint·내구성 언급 0, OpenMPDK에 KV 캐시 저장소 없음 | ✅ | GitHub 직접 확인 | |
| A-20 | CMX 타깃 SSD 전부 TLC, CMX 발표 후 TLC 현물가 반등 | 🟡 | TrendForce 2026-08-18 등 | |
| A-21 | SK hynix AI Company ≥$10B 캐피털콜(2026-01-28) | ✅ | SK hynix 뉴스룸·CNBC·SDxCentral | 부록 D 참고 |
| A-22 | Solidigm: $9B 인수 → 2023 자본잠식 → 2026 상반기 순이익 ₩5.84조 | 🟡/✅ | BigGo·Korea Herald, SK hynix 6-K | 실적은 보도 |
| A-23 | Astera↔Pliops 약 $70M, 엔지니어 약 60명 이전 | ✅ | Calcalist·Globes·StorageNewsletter | 부록 D 참고 |
| A-24 | 삼성 SV L6 TC $392K vs NVIDIA IC6 $626K+, Meta E6 $708K, Google L6 $700K | 🟡 | levels.fyi 2026 | 부록 D 참고, 자기 보고 데이터 |
| A-25 | Micron↔Anthropic: 공동 설계·다년 공급·Claude 배치·Series H | ✅ | Micron IR (기존 소스) | 조직 형태 미공개 ⚠️ |
| A-26 | 삼성·SK↔Anthropic 공급계약에 공동 최적화 문구 부재 | 🟡 | BusinessToday 2026-07-27 | 계약 조건 비공개, 부재는 보도 기준 ⚠️ |
| A-27 | DDN $300M @ $5B(2025-01), 2026 연내 전략 투자자 라운드 예고 | ✅/🟡 | Blackstone PR, Bloomberg 2026-06-10 | 부록 D 참고 |
| A-28 | Tensormesh $20M(NVentures·AMD·CoreWeave, 2026-05) | ✅ | SiliconANGLE·HPCwire | |
| A-29 | ScaleFlux 누적 조달 $65.9M | 🟡 | Tracxn | |
| A-30 | Meta↔삼성 CacheLib 배치 표준 업스트림·EuroSys'25 | ✅ | ACM DOI·arXiv 2503.11665 | 저자 소속 🟡 |
| A-31 | DeepSeek V4.1-Flash KV SSD 풋프린트 1/8 | 🟡 | Yahoo Finance 재인용 | 수요 리스크 |
| A-32 | 삼성 몫 시나리오(QLC 점유 25 → 35%) | ⚠️ | 본 보고서 가정 | `[사내 확인]` |
| A-33 | 동급 정격 DWPD: P5336 61.44TB 0.58, 6550 ION 61.44TB 1.0 RDWPD, CM9 1/3, LC9 245.76TB 0.3 → 동급 격차 2~10배 | 🟡 | 각사 제품 브리프·STH (사다리 소스 F48) | v2.0 본문 격차 수치 |
| A-34 | KV 캐시 오프로드 I/O: 읽기 평균 2.0GiB/s vs 쓰기 11MiB/s, 128KiB 요청 지배 | 🟡 | CHEOPS 2025 (VU Amsterdam·IBM) (F49) | DeepSpeed·FlexGen 기준, 공유 프리픽스 캐시는 상이 |
| A-35 | 호스트 쓰기 패턴(NoWA)으로 SSD WAF = 1 보장, YCSB-A 플래시 쓰기 6.2~9.8배 감소 | 🟡 | VLDB 2026 "How to Write to SSDs" (TUM) (F50) | 데이터베이스 영역 |
| A-36 | 배치 표준 범용 실측: 랜덤 50% 사용률 WAF 약 3 → 약 1, 전력 −43.6% | 🟡 | NVM Express 블로그·삼성 기술 블로그 (F51) | |
| A-37 | KV 캐시 워크로드의 배치 표준 WAF 공개 실측 없음 | ⚠️ | 검색 결과 종합 2026-09-19 (F52) | 본 전략의 핵심 가설, Phase 2가 검증 |
| A-38 | FDP 효과의 조건부성: RUH 격리가 수명과 정렬될 때 WAF ≈1, 오분류·RUH 간섭·적대적 무효화 시 실패 | 🟡 | USENIX FAST'26 WARP | 6장 리스크 ② |
| A-39 | 보증 관행 "5년 또는 TBW·DWPD 선도달" | ✅ | 삼성 PM9A3·Micron 엔터프라이즈 SSD 보증 (F53) | |
| A-40 | OCP SMART C0: Physical Media Units Written(WAF 산출 목적 명시), XOR 복구 카운트 | ✅/🟡 | OCP NVMe Cloud/Datacenter SSD 사양 (F54·F46) | |
| A-41 | JESD218 FFR ≤ 3%, TBW는 FFR 만족 범위로 정의 | ✅ | Seagate TP618·JEDEC JC-64.8 (F41) | |
| A-42 | SSD당 다이 수 128(S3700) → 144 → 256 → 512 → 1,024(LC9) | 🟡 | 분해·제품 사양 환산 (F42) | S3700·LC9 실측, 나머지 환산 |
| A-43 | 다이 고장률 상한 1−0.97^(1/N): 2.4e-4 → 3.0e-5, 단일 고장 허용 시 √(0.03/C(N,2)) | ⚠️ | 독립 고장 모델, 수율 포아송 모델 유비 (F43) | 본 보고서 산식 |
| A-44 | 다이 패리티: Micron RAIN, superpage-level parity(Cai 외) | 🟡 | Micron 기술 브리프·학술 (F44) | |
| A-45 | 삼성 PM1733/1735 Fail-in-Place: 플레인 4GB·다이 8GB 감량 운영 | ✅ | 삼성 제품 브로슈어 (F45) | |
| A-46 | Microsoft Hyrax: 서버 수리 요구 50~60% 감소 | 🟡 | MSR 논문 (F47) | 프로덕션 트레이스 시뮬레이션 |
| A-47 | SSD 단독 워크로드 최적화(Multi-stream'14·AutoStream'17·FTL 핫/콜드·IO Determinism)는 QoS·성능 개선, 실 WAF ≈3 | 🟡 | HotStorage'14·SYSTOR'17·특허·NVMe 1.4 (F36~F40) | 2단계 부분 성공의 근거 |
| A-48 | P/E SLC 30K~100K → QLC 100~1K, RBER 약 10⁶배, ECC 1비트/512B → LDPC 120비트/KB, 정격 DWPD 17 → 0.41 | 🟡 | Kingston·Mielke·Kioxia·WD·Intel/Solidigm 사양 (F30·F32·F33) | 대표값 |
| A-49 | 유효 DWPD = 정격 × (3 ÷ WAF), 정격 0.58은 WAF 1.74에서 1.0 아래 | ⚠️ | 본 보고서 산식(정격 WAF ≈3 가정, F29) | 6장 차트 |

**미확인·후속 확인**: DOCA Memos 힌트↔배치 표준 매핑, PM1763·BM1773 RUH·DWPD·배치 표준 지원, SanDisk QLC KV 구성 DWPD, Micron FDP 지원, **KV 캐시 워크로드 배치 표준 WAF 실측(업계 공백, 12개월 통과 조건)**, XFS·f2fs 패치 머지 상태, ScaleFlux NAND 종류, 실제 다이 고장률과 패리티·예비 비율 `[사내 확인]`, Forward Insights QLC 비중 원문, 1Q23 eSSD 매출, 하이퍼스케일 QLC 계약가.

## 부록 B. 용어

배치 표준(FDP, Flexible Data Placement): 호스트가 데이터 수명·성격별로 배치 힌트(RUH)를 주어 SSD의 쓰기 증폭(WAF)을 낮추는 NVMe 표준(TP4146). RUH(Reclaim Unit Handle): 배치 표준의 스트림 단위. WAF: 호스트 쓰기 대비 NAND 실제 쓰기 배율. DWPD: 하루 전체 용량 쓰기 횟수(통상 5년 보증 기준, 정격은 WAF ≈3 랜덤 4KB 가정). 유효 DWPD: 실 WAF에서의 DWPD = 정격 × (3 ÷ WAF). 잔여 변수: DWPD 산식에서 셀(P/E)·SSD(OP)·고객(보증연수)이 정하는 항을 뺀 뒤 남는 변수(WAF). 격차 축소 변수: 요구 DWPD와 정격의 격차를 줄이는 병행 축(다이 세대·OP·SLC 캐시·보증연수·워크로드 재정의·호스트 배치). FFR(Functional Failure Requirement): JESD218 기능 고장률 요구(≤ 3%). UBER: 정정 불가 비트 오류율. FIP(Fail-in-Place): 고장 다이를 제외하고 감량 운영하는 SSD 기능. OCP SMART C0: OCP Datacenter NVMe SSD 사양의 SMART Cloud Health 로그 페이지. KV 캐시: LLM 추론의 키·값 캐시, HBM→DRAM→SSD로 오프로드. CMX: NVIDIA의 BlueField-4 기반 컨텍스트 메모리 스토리지 플랫폼. FDE(Forward Deployed Engineer): 고객 상주 엔지니어. Co-Design Pod: 개발실 소속 고객 상주 공동 설계 조직. SCA: 전략적 고객 협약.

## 부록 C. 저장소 자산 맵

| 위치 | 내용 |
|---|---|
| `wiki/concepts/qlc-ssd-market.md` | 3기 비교·2022 배경·다운턴 교훈·수요 모델·가정표·덱 표기 원칙 |
| `wiki/concepts/solution-ladder-component-to-system.md` | 이관 매트릭스·이관의 3단계·격차 축소 변수 |
| `wiki/strategies/qlc-workload-capability-phases.md` | Phase 1·2·3·스택 지도·참여 스택·협업 기업·현 위치 |
| `wiki/strategies/qlc-execution-strategy.md` | 5축·볼드 안·고객 협업·KPI (덱 범위 결정 §2.2) |
| `sources/articles/component-to-system-solution-ladder-facts-2026-09.md` | 지표(F28~F35)·SSD 단독 최적화(F36~F40)·다이 수·고장률(F41~F47)·동급 비교·KV 실측 공백·보증(F48~F54) |
| `sources/articles/qlc-essd-history-2022-background-2026-09.md` | 연혁·2022 배경·비교표 원자료 |
| `sources/articles/qlc-essd-market-size-forecast-data-2026-09.md` | 매출·EB·가격·KV 수요 원자료 |
| `sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md` | 스택 지도·벤더 역량·내구성 원자료 |
| `sources/articles/execution-benchmarks-sw-capability-customer-collab-2026-09.md` | 실행 벤치마크·협업·재무 원자료 |
| `sources/articles/fdp-technical-limits-adoption-context-2026-08.md` | FAST'26 WARP 조건부성 |
| `outputs/report/memory-solution-ladder-report.md` | 해법 사다리 상세 보고서(부록 A F28~F54, 부록 B 슬라이드 맵) |
| `outputs/presentation/assets/qlc_model.csv` · `qlc_demand_share_revenue*.png` · `scripts/generate_qlc_chart.py` | 모델·그래프 |
| `outputs/presentation/assets/ladder_cell_*.png` · `rel_*.png` · `sla_effective_dwpd.png` · `scripts/generate_ladder_cells.py` | 덱 2·3·6장 차트 |
| `outputs/presentation/qlc-ssd-strategy-outline.md` · `scripts/generate_qlc_ssd_strategy_pptx.py` · `scripts/solution_ladder_slide.py` · `qlc-ssd-strategy.pptx` | 6장 덱(v5.2: 문제 → 신뢰성 → 해법 사다리 → 역량 → 실행 → 보증·SLA, 제목 문단) |
| `outputs/presentation/qlc-ssd-strategy-visual.pptx` · `scripts/generate_qlc_ssd_strategy_visual_pptx.py` · `scripts/generate_qlc_visual_figures.py` · `assets/visual/qlc_vis_s{0..6}.svg|png` | 시각화 강화판 7장 v2.0(요약 스토리 맵 + 1~6장, 네이티브 도형으로 편집 가능, 그림은 다이 픽토그램·RBER 스파크라인·유효 DWPD 곡선 4장만, 텍스트 원본 대비 50%) — 기획서 「시각화 강화판 v2.0」 절 |

## 부록 D. 덱 범위 밖 확장 옵션 (위키 유지, 본문 제외)

사용자 결정(2026-09-19)으로 큰 의사결정이 필요한 항목은 본문과 덱에서 제외하고 위키 [qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §2.2~§2.5·§3에만 유지한다. 5장의 개발실 내부 실행이 성과(12개월·2027H1 통과 조건)를 보인 뒤 검토할 옵션이다.

| 옵션 | 내용 | 선례 | 위키 |
|---|---|---|---|
| 실리콘밸리 추론 스토리지 소프트웨어 자회사 | Memory Solutions Lab 모체, 자체 CEO·보상·지분, 미주 현지 채용 다수, 본사 SSD와 동일 P&L 지표 | SK hynix AI Company(≥$10B 캐피털콜), Solidigm 공동 CEO 체제 | §2.2 |
| 별도 보상 체계 | 자회사 지분·RSU형, SV 시니어 시장가 $600~700K대(삼성 SV L6 $392K 대비 1.5~1.8배 격차) | SK hynix 자사주 성과급·ADR | §2.3 |
| 공동 플랫폼 계약(SCA)의 자본 요소 | 공급 + 공동 최적화 + 트레이스 접근권 + 수명 보증 + 선급·지분 | Micron SCA 16건·최소 계약매출 약 $100B·예치금 $22B | §2.5 |
| 고객·생태계 지분 참여 | DDN 전략 라운드, Tensormesh 공동 투자, 캐피털콜형 생태계 펀드 | Anthropic·Mistral 기존 지분 | §2.5 |
| 볼드 안 3단계(즉시·1년·3년) | I-1~I-9 / Y-1~Y-8 / L-1~L-6 액션과 가성비 판정 | — | §3 |

## 부록 E. 배경 상세 — 2022년의 조건과 현재 국면

### E.1 2022년 eSSD 시장은 급락했고, 그 해에 대용량 QLC의 조건이 갖춰졌다

2022년 4분기 eSSD 계약가는 −25% QoQ, 매출은 $3.79B(−27.4%)였고 연간 eSSD 매출은 2022년 $21.9B에서 2023년 약 $7B로 무너졌다 ([qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §2.1, [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §1.3). 대신 그 해에 다섯 조건이 갖춰졌다. 대용량 QLC 전문 벤더(Solidigm, 2021-12-29 출범), 하이퍼스케일러 주도 폼팩터(OCP E1.S/E1.L "1U에 1PB"), 배치 표준 비준(2022-12-22, WAF 약 3 → 약 1), NAND·eSSD 계약가 급락, AI 학습 데이터셋 6배 증가. 공급자(Intel/Solidigm)는 TCO를 팔았고(4TB HDD 1PB 20U 대 30.72TB E1.L 1U, Ceph 5년 TCO −47%), 수요자(Meta)는 HDD(20~30TB)와 TLC(8~16TB) 사이의 QLC 용량 계층(64~150TB, 10 MB/s/TB)을 정의했다 (같은 소스 §2). **요구는 2022년에, 제품은 2023년에, 물량은 2024년(30EB, 4배)에.** 이 시차가 1장 교훈 ①의 근거다.

### E.2 2022년경 대 2026년 현재

| 비교 축 | 2022년경 | 2026년 현재 |
|---|---|---|
| 드라이브 최대 용량 | 15.36 / 30.72TB (2023-07 61.44TB) | 122.88 ~ 245.76TB (256TB 예고) |
| NAND 다이·단수 | 1Tb QLC, 96/144단 | 1Tb(192·286단) → 2Tb QLC(BiCS8, 삼성 V9 2Tb, SK hynix 321단) |
| 인터페이스·폼팩터 | PCIe 3.1 → 4.0, U.2·E1.L·E1.S | PCIe 5.0 주류, E3.S/E3.L, E2(1PB·80W) 표준화 진행 |
| 내구성 | 0.4~0.6 DWPD | 0.3 랜덤 ~ 1.0 순차(Micron 6600 ION), 삼성 BM1743 0.26 |
| 전력 | 25W(61TB, 0.41 W/TB) | 30W 최대, 0.12 W/TB(245TB) |
| 타깃 워크로드 | CDN·오브젝트·빅데이터·HDD 대체 | AI 데이터 레이크·인제스트·체크포인트·추론(RAG·KV 캐시)·니어라인 HDD 부족 대체 |
| 호스트·펌웨어 | Multi-stream·ZNS·배치 표준 비준 직후 | 배치 표준 상용 채택(4사), NVMe 2.0/2.1, 텔레메트리·PLP 강화 |
| $/TB | 61TB ≈ $60~95/TB(2024 초 소매) | 30TB QLC 인덱스 $92(3Q25) → $603(3Q26), TLC 대비 13~20% 할인 |

출처: [qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §3, [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §3.3. 전 항목 🟡.

### E.3 왜 니어라인 HDD 대체가 아니라 추론 캐시 계층인가

니어라인 HDD는 2026년 물량이 완판됐고 2027~28년 장기계약이 잡혀 있다. 대체 수요는 있지만 TB당 원가·전력만의 커머디티 경쟁이고, 공급이 풀리면 HDD 가격 경쟁력이 복귀하며, 고객 시스템과의 접점이 얇아 전환비용이 쌓이지 않는다. 반면 추론 캐시 계층은 고객의 추론 스택 안에 있어 한 번 들어가면 소프트웨어·정책·보증이 전환비용이 된다. 사용자 결정(2026-09-17)은 이 계층을 QLC로 가져가는 것이며, 니어라인 HDD 대체 논의는 덱에서 다루지 않는다 ([prompt-qlc-ssd-strategy.md](../../sources/prompt/prompt-qlc-ssd-strategy.md) 피드백 3, [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §3.1). 이 계층의 현재 주인은 TLC다. CMX 타깃으로 벤더가 지명한 드라이브는 전부 TLC이고, QLC를 지명한 공개 사례는 SanDisk FMS 2026의 "고내구 KV 캐시 구성" 1건이며 DWPD는 미공개다 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.3).

---

## PPT 압축 맵 (6장 덱, v5.2 스토리라인: ① 문제 → ② 신뢰성 → ③ 해법 사다리 → ④ 역량 → ⑤ 실행 → ⑥ 보증·SLA)

2026-09-19 v5.2(제목 개편): 제목 6개를 이어 읽으면 한 문단이 되도록 재작성하고 비유 표현(지렛대·닫힌다·여는·안으므로)을 기술 용어(잔여 변수·충족·개방·수반)로 통일했다. **제목 문단** — AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다. 첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다. 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다. 따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다. 3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다. 유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다.

2026-09-19 v5.1(2·3장 순서 교체): 1장이 고용량화의 두 축(다이 8배 → 신뢰성, DWPD 격차 → 내구성)을 세우고, 2장 신뢰성은 SSD 내부 해법(다이 패리티·여분 다이·감량 운영·텔레메트리)으로 닫히는 축임을, 3장 해법 사다리는 신뢰성과 달리 DWPD 격차가 SSD 안에서 닫히지 않았고 남은 지렛대 WAF는 SSD 밖 호스트에 있어 고객 협업과 새로운 역량이 필요함을 세운다. 4~6장은 v5.0과 같다.

2026-09-19 비판적 리뷰 반영: "호스트 공동 설계가 유일한 경로" 표현을 철회하고 다이 세대·OP·보증연수·SLC 캐시·워크로드 재정의 등 병행 축과 결합하는 "남은 지렛대"로 정정, 격차는 동급 비교 2~10배로, KV 캐시 FDP WAF는 미실측 가설로 명시(사다리 소스 §10 F48~F54), 신뢰성 축은 SSD 내부 해법 슬라이드로 분리, 실행은 개발실 내부 범위(자회사·별도 보상·결정 요청 제외)와 FDE 선별 집중, 수명 보증·SLA 리스크 슬라이드 신설.

| # | 스토리 레일 | 액션 타이틀 | 본문 |
|---|---|---|---|
| 1 | ① 문제 · 왜 지금 필요한가 | AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다 | 타임라인 세 구간 아래 교훈(2018~23) / 지금·요구의 이동(2024~26) / 문제(2027~30: 동급 비교 2~10배 격차 · 10배 · 350EB · 해법 필요) (본문 §1.0·§2.4) |
| 2 | ② 신뢰성 · SSD 내부 해법 | 첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다 | 다이 수 128→1,024 · FFR ≤3% 상한 모델 · SSD 내부 해법 3(다이 패리티 / 여분 다이·감량 운영 / 텔레메트리 예측) + 호스트는 관측·수용만 (사다리 소스 §9) · 결론 밴드: 이 축은 SSD 내부에서 닫히지만 둘째 축 DWPD는 SSD 안에서 닫히지 않았다 → 3장 |
| 3 | ③ 해법 사다리 · 왜 호스트인가 | 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다 | 리드 "신뢰성과 달리 DWPD 격차는 SSD 안에서 닫히지 않았다" + 이관 매트릭스(내구성 행) + WAF 셀(범용·CacheLib 실측, KV 캐시 미실측 가설) + 지렛대 스트립(다이 세대·OP·SLC 캐시·보증연수·워크로드 재정의·호스트 배치) ([memory-solution-ladder-report.md](memory-solution-ladder-report.md) §2.5) · 결론 밴드: 남은 지렛대 WAF는 SSD 밖 호스트에 → 고객 협업과 새로운 역량(4장) |
| 4 | ④ 역량 · 어떻게 해소하는가 | 따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다 | 격차 타일 4 → Phase 1·2·3 스택 → 삼성 현 위치(Phase 1 진행 중 · 2 준비 · 3 미착수) (본문 §4~§5) |
| 5 | ⑤ 실행 · 누구와 어디서 | 3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다 | 고객 선별·협업 채널 표(AI 랩·NVIDIA 생태계 = FDE / 하이퍼스케일러 = 업스트림·OCP / OEM = 레퍼런스 스택) + 단계별 통과 조건(90일·12개월·2027H1) + 개발실 내부 실행(조직·인사·문화) + 판돈(캐시 계층 QLC 0 → 50%)·비용(별도 투자 없음) (본문 §6, 덱 범위는 [qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §2.2 덱 범위 결정) |
| 6 | ⑥ 보증 · SLA · 무엇을 보증하나 | 유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다 | 유효 DWPD = 정격 × (3 ÷ WAF) 차트 + 리스크 시나리오 3 + 보증 설계 원칙 5(TBW 선도달 관행 · WAF 밴드 조건부 · OCP SMART C0 공동 관측 · 규격 준수 조건 · 재협상·감량 운영) + 6장 요약 체인 (사다리 소스 §10 F53·F54) |

### 이전 4장 맵(v4.0~v4.1)

덱의 헤더는 4장 스토리 레일(현재 장 강조), 각 장 결론 밴드 우측은 다음 장 포인터, 4장 결론 밴드는 요약 체인이다. 2026-09-19 순서 재편: 문제 제기(다운턴 교훈 + AI 수요로 이동하는 요구)로 열고, 해법의 경향(이관 사다리)으로 당위성을 세운 뒤, 솔루션(3단계 역량)과 실행으로 닫는다. 구 3장(고객의 QLC 채택 동인)은 1장 문제 제기 패널로 흡수(본문 2장·수요 그래프는 보고서에 유지).

| # | 스토리 레일 | 액션 타이틀 | 본문 |
|---|---|---|---|
| 1 | ① 교훈 · 문제 · 왜 지금, 무엇이 필요한가 | AI 추론 수요는 고용량 QLC에 높은 DWPD를 요구하며, 이를 충족할 해법이 필요한 상황입니다 (v4.1: 결론이 아닌 문제 제기) | 타임라인(DT19·DT23 + QLC 이정표)의 세 구간 아래 세 패널 정렬 — 교훈 2018~23(3행: 수요 센싱 2년 / 고객 협업 12개월 / 의사결정 시점 2027H2, 소형 도식 + 받는 장 번호) / 지금·요구의 이동 2024~26(구매 기준 TB당 TCO → GPU당 컨텍스트·토큰당 비용, 용량 61TB → 245TB, 요구 DWPD 0.3~0.6 → 1~3) / 문제·해법이 필요한 상황 2027~30(10~40배 격차 · 10배 · 350EB · "고용량 QLC에서 DWPD를 높일 해법이 필요" · 송용호 인용) → 밴드 "문제" → ② (본문 §1.0·§2.4) |
| 2 | ② 해법 사다리 · 왜 호스트 협력인가 | 요구는 고정, 단품은 악화, 보상은 상위 계층으로: QLC의 DWPD는 호스트 공동 설계로만 충족됩니다 | 이관 매트릭스(열 = 요구 → 단품 → SSD 계층 → 호스트·시스템 계층, 행 = 내구성·신뢰성 축, 산식 칩) → 결론 → ③ (상세: [memory-solution-ladder-report.md](memory-solution-ladder-report.md) §2.5) |
| 3 | ③ 역량 · 어떻게 해소하는가 | 내구성 격차는 호스트 배치(WAF)로 해소되므로, 고객 시스템까지 3단계로 역량을 확장합니다 (리드 = 신문섭 인용) | 격차 타일 4 → Phase 1·2·3 스택(층별 기술, 고객 보증 범위) → 진행 바 → 결론 → ④ (본문 §4~§5) |
| 4 | ④ 실행 · 누가 어떻게 실행하는가 | 고객 시스템 진입 수단은 FDE 상주와 전략적 협약(SCA)이며, 두 수단 모두 업계 선례가 있습니다 (리드 = 송용호 인용) | 두 트랙 그림(FDE 상주 / 전략적 협약, 선례 카드 2) → 조직·인사·문화 3축 → 요약 체인(① 교훈·문제 → ② 해법 사다리 → ③ 역량 → ④ 실행) (본문 §6) |

### 이전 5장 맵(v3.10~v3.14)

| # | 킥커(스토리 레일) | 액션 타이틀 | 본문 |
|---|---|---|---|
| 1 | ① 산식 · 왜 호스트 협력인가 (v3.9 신설, v3.10 문안, v3.11 이관의 3단계, v3.12 병렬 축) | ECC가 RBER을 보상했듯 P/E 감소는 WAF로 보상해야 하며, 이는 호스트 공동 설계로만 가능합니다 (리드: QLC의 내구성 격차를 어느 계층이 해소하는가 — SSD 단독 최적화는 QoS·성능은 개선했으나 WAF는 낮추지 못했다) | 네 지표 차트(P/E 100배↓ / RBER 10⁶배↑ vs UBER 고정·ECC 60배 / 정격 DWPD 17→0.41 vs 요구 1~3·유효 7~10 / WAF: SSD 단독 ≈3 vs 호스트 공동 설계 1.03) + 산식 카드(항별 결정 주체) + 이관의 3단계 카드(1 ECC 완결 → UBER 충족 / 2 SSD 단독 워크로드 최적화 2014~2019 부분 성공: QoS·성능 개선, WAF ≈3 → DWPD 미충족 / 3 호스트 시스템 공동 설계 2022~ 본 덱: WAF 1.0 → DWPD 충족 = 유일한 경로) + 병렬 축 스트립(다이 고장률: FFR ≤3% 고정 · SSD당 다이 수 128→1,024 · 다이 → SSD 내부 RAID·여분 다이·FIP → 상위 계층) + 결론 "요구(UBER·DWPD·FFR)는 고정, 단품 지표(RBER·P/E·다이 수)는 악화, 격차는 상위 계층이 보상 · QLC로 요구 DWPD를 충족하는 경로는 호스트 시스템 공동 설계뿐, 산식의 귀결" → ② 시점. 상세: [memory-solution-ladder-report.md](memory-solution-ladder-report.md) §2.5 |
| 2 | ② 시점 · 왜 지금인가 (v3.5 신설; v3.6 공식 문체; v3.10 연결 리드 "1장의 보상 변수 WAF는 고객이 정의하는 배치 규격") | 다운턴 극복의 결정 요인은 고객 요구 적중이었고, 요구는 고객 시스템 내부에서 먼저 관측됐습니다 | 다운턴 구간 음영 타임라인(DT19·DT23 + QLC 이정표 6: 2019 HBM 팀 축소 / 2022-12 배치 표준 비준 / 2023-07 Solidigm 61TB 12개월 선행 / 2024 30EB·흑자 전환 / 2026 캐시 관리자 배치 언급 0건 / 2027H2 차기 전환점 / 2030 비트 10배·매출 정체; 3기 띠는 v3.10에서 제거) → 교훈 카드 3(v3.8: 문장 없이 키 숫자 2년·12개월·2027H2 + 도식: 수요 센싱 = 고객 규격·코드 레인이 발주·출하 레인보다 ≈2년 선행, 2026 슬롯 빈 원 = 규격 미정의 / 고객 협업 = 61TB 출시 시점 막대 Solidigm 9개월 vs 삼성 21개월 + HBM4 공동 정의 아이콘 / 의사결정 시점 = DT19 결정→DT23 초기 조건 연쇄 + 2026 고객 시스템 진입→2027H2 TCO 보증 수익원 강조; 각 카드 하단 연결 칩 ③ 수요 / ④ 역량 / ⑤ 실행) → 결론 "요구사항은 다운턴 국면에서 고객 규격·코드로 정의됐고, 정의에 참여한 공급자가 선점했습니다. 차기 요구사항(KV 캐시 배치·내구성 규격)은 현재 미정의 상태입니다" → ③ 수요 |
| 3 | ③ 수요 · 고객의 요구는 무엇인가 (v3.10 연결 리드 "2장이 지목한 차기 요구사항의 내용") | 고객의 구매 기준은 용량 계층의 TB당 TCO이며, 해당 계층은 추론 캐시 계층으로 이동합니다 | 3기 스트립(고객이 산 것: TB당 TCO 원가·랙 밀도 / 전력·공급 확보 / GPU당 컨텍스트 용량·토큰당 비용 · 왜 · 조건 · 삼성) → 통합 그래프(이정표 타임라인은 1장으로 이동)(EB·%·$B) + 키넘버 3 + **송용호 인용**(부품이 어떻게 쓰일지는 시스템 설계자 마음) → 결론 "고객은 추론 캐시 계층에서도 QLC의 TB당 TCO를 요구하며, 제약 조건은 내구성(DWPD 10~40배 격차)입니다. 1장의 산식대로 이 격차는 디바이스 단독으로 해소되지 않습니다" → ④ 역량 |
| 4 | ④ 역량 · 어떻게 해소하는가 (v3.10 공식 문안·결론 밴드 신설) | 내구성 격차는 호스트 배치(WAF)로 해소되므로, 고객 시스템까지 3단계로 역량을 확장합니다 (리드 = **신문섭 인용**: 승부는 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져간다) | 상: 격차 타일 4(내구성 격차 · 스트림 격차 · 접점 부재 · 해소 수단 실증) / 중·하: Phase 1 배치 표준 디바이스 확보 · Phase 2 워크로드 실측 기반 최적화 · Phase 3 고객 시스템 내 공동 설계 **스택 그림 확대**(고객 시스템 5계층에 층마다 구체 기술을 적고 우리가 닿는 층을 색으로: 응용 vLLM·SGLang·TRT-LLM / 관리자 KVBM·LMCache·Mooncake·FlexKV / I/O NIXL·GDS·io_uring·xNVMe / 커널·플랫폼 write streams·XFS·CMX / SSD RUH·2Tb QLC·NVMe KV; 트레이스 수집·배치 정책 반영 화살표, FDE 상주 아이콘, 범례는 Phase 1 옆, 진행 바에 삼성 현 위치; 산출물 줄 = 고객 보증 범위: 정격 내 QLC 원가·전력 / 고객 워크로드 기준 수명 / 시스템 수준 TCO). 결론 "단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장. 삼성은 1단계 확보·2단계 진입 상태, 3단계 진입 수단이 다음 장" → ⑤ 실행. 협업 기업 로고 행은 제거 |
| 5 | ⑤ 실행 · 누가 어떻게 실행하는가 (v3.10 공식 문안·요약 체인) | 고객 시스템 진입 수단은 FDE 상주와 전략적 협약(SCA)이며, 두 수단 모두 업계 선례가 있습니다 (리드 = **송용호 인용**: 단 한 번도 고객 지향적인 적이 없었다; 개발실 박스 = 고객의 집에서 저녁) | 중앙 **두 트랙 그림**(삼성 개발실 ↔ 고객 시스템 스택, 위 화살표 "① FDE 상주: 삼성 엔지니어의 고객 시스템 진입", 아래 화살표 "② 전략적 협약(SCA): 워크로드·규격 접근권 확보 · 계약 시한 2027년 상반기", 가운데 **선례 카드 2**: Palantir FDE(상주 엔지니어 그림 + 파급) · Micron↔Anthropic SCA(계약 4요소 블록 + 16건·$100B·$22B)) / 하: 조직·인사·문화 3축 타일(축당 3줄 — 조직: 자회사 / FDE Pod / 시스템 SW 조직 강화, 인사: 고객 시스템을 아는 시스템 SW 전문가 채용·양성 / 미주 현지 채용 확대 / 별도 보상·상주 로테이션, 문화: 오픈소스 생태계를 주도 / 메인테이너·커미터 배출·레퍼런스 프로젝트 운영 / 업스트림 우선·실측 공개) + 결론 밴드 = **5장 요약 체인**(① 산식 보상 변수 WAF는 호스트 계층이 결정 → ② 시점 규격은 다운턴 국면에 정의·차기 규격은 현재 미정의 → ③ 수요 추론 캐시 계층도 TB당 TCO·제약 조건 = 내구성 → ④ 역량 디바이스→워크로드→고객 시스템 3단계 → ⑤ 실행 FDE 상주·전략적 협약·조직·인사·문화; v3.4의 한 문장 결론은 노트로 이동). 전략·재무 축·3티어 타임라인·결정 요청은 덱에서 제외(본문 §6.2·§6.3 참조) |
