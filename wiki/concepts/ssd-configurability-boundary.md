---
type: concept
last_reviewed: 2026-09-28
sources:
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/qlc-v7-placement-cases-waf-2026-09.md
---

# 출하 시 구성과 운영 중 조정의 경계 — NVMe 규격이 이미 그은 선

한 SKU로 모든 고객의 운영점을 맞출 수 없다면([high-dwpd-operating-point.md](high-dwpd-operating-point.md) §4), SSD의 무엇을 **언제** 고객에게 열 수 있는가. 이 페이지는 그 경계를 공개 규격과 출하 제품으로 확인한다. 결론은 규격이 이미 선을 그어 두었다는 것이다.

> 출처 원장은 [wcssd-v1-high-dwpd-configurable-2026-09.md](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **원장**)다. 규격 조항은 규격 PDF가 아니라 **그것을 구현한 코드**(libnvme · QEMU · nvme-cli · xNVMe · SEF API)로 역확인했다 — ✅는 그 코드를 직접 연 항목이다.

## 1. 한 문장

**배치(어디에 쓰나)는 데이터가 살아 있는 채로 운영 중에 바꿀 수 있다. 용량 · OP · SLC 비율 · FDP 구조는 표준과 벤더 API 모두에서 "빈 상태에서만" 바꿀 수 있다**(원장 B-11, ⚠️ 파생 판정). 이 선은 **고객과의 계약(용량 · 보증 TBW)을 바꾸는 항목인가**와 일치한다.

## 2. 네 단계 — 구성 가능에서 적응형까지

| 단계 | 이름 | 언제 바꾸나 | 무엇을 | 구분 |
|---|---|---|---|---|
| ① | 고정 SKU | 설계 시점 | 용량 · DWPD 조합 몇 가지를 별도 SKU로 | 워크로드 구성형 (workload-configurable) |
| ② | 출하 시 구성 | 출하 · 프로비저닝 시점 | RUH · RG · OP · SLC 비율 | 〃 |
| ③ | 운영 중 조정 | 운영 중 | RUH 매핑 정책 · 배치 가중치 · 백그라운드 GC 강도 | 〃 |
| ④ | 워크로드 적응 | 운영 중 | 용량 · 내구성 · 자원 구조 전체 | 워크로드 적응형 (workload-adaptive) |

단계를 나누는 기준은 기술 난이도가 아니라 **"바꿔도 계약이 유지되는가"**다(§5). 전략 판단(구성형을 먼저, 적응형은 나중)은 [workload-configurable-ssd-report.md](../../outputs/report/workload-configurable-ssd-report.md) §3에 있다.

## 3. 출하 시 구성 — 규격과 선례

| 항목 | 규격·선례 | 상태 | 원장 |
|---|---|---|---|
| **FDP 구성 (RG · RUH)** | 벤더가 **검증한 구성 목록**을 FDP Configurations 로그(LID 20h)로 노출하고, 호스트가 Set Features FID 1Dh로 그중 하나를 켠다(FDPE + 구성 인덱스). **RG 수 · RUH 수 · RU 크기 · RUH 유형은 구성마다 고정**이며, 호스트는 목록에서 고를 뿐 값을 지정하지 못한다 | ✅ 규격 · 참조 구현 | F-02~F-06 |
| FDP 구성 변경 시점 | 해당 엔듀런스 그룹의 **네임스페이스가 0개일 때만**. QEMU는 네임스페이스가 있으면 Command Sequence Error로 거부한다 | ✅ | F-07·F-08 |
| 배치 핸들 목록 | 네임스페이스 생성 시 지정(`--nphndls`, `--phndls`) | ✅ | F-09 |
| **OP** | 네임스페이스를 작게 만들면 남는 용량이 OP가 된다. 출하 선례: Micron Flex Capacity(**TBW 고정, DWPD 변동**) · Samsung DC Toolkit(기본 OP 6.7%) · WDC namespace-resize(OP 7 / 28 / 50%) | ✅ WDC · 🟡 나머지 출하 | F-31·F-32·F-40~F-42 |
| **SLC 비율** | DapuStor J5060: QLC 드라이브 일부를 **pSLC 영역 400GB / 800GB / 1.2TB 중 선택**, 별도 블록 디바이스로 노출, 다이 수준 격리. Kioxia SEF: 호스트가 가상 디바이스별 **pSLC 슈퍼블록 수 지정** | 🟡 J5060 발표(2026-09, 출하 미확인) · ✅ SEF API(하드웨어는 개발자 샘플) | F-43·F-45 |
| 엔듀런스 그룹 구성 | NVMe 2.0 **Capacity Management**(opcode 20h): 고정 구성 집합 선택 또는 용량을 끌어와 엔듀런스 그룹·NVM Set 생성. 설계 의도가 "균일 공간 · 성능 격리 · **소량 저지연 영역 + 대량 고지연 영역**이 필요한 고객을 **단일 SSD 타입**으로 구성"이다 | 🟡 규격만 — **지원 출하 제품 없음**, QEMU도 미구현 | F-20~F-25 |
| 규격 방향 | NVMe 2.3 **Configurable Device Personality**(2025-08): 호스트가 서브시스템 구성을 안전하게 변경, 공급자의 **재고 관리 완화**. freeze 후 인증이 있어야 unfreeze | 🟡 규격만 — 지원 제품 없음 | F-46 |

**읽는 법**: OP 선택은 이미 여러 벤더가 출하한다. SLC 비율 선택은 2026년에 발표 단계로 들어왔다. **여러 운영점을 한 SSD 타입으로 소화하겠다는 규격(Capacity Management, CDP)은 있지만, 그것을 구현한 출하 제품은 없다.**

## 4. 운영 중 조정 — 이미 되는 것과 비어 있는 것

| 항목 | 무엇을 바꾸나 | 상태 | 원장 |
|---|---|---|---|
| **RUH 매핑 정책** | 호스트가 **매 쓰기마다** 배치 ID(⟨RG, 배치 핸들⟩) 지정 · RUH Update로 새 RU를 가리키게 갱신 · Linux 6.16 블록 write stream(파일 경로는 미지원) | ✅ | R-01·R-02·R-07 |
| **배치 가중치** | 호스트 소프트웨어 정책. CacheLib은 RUH 2개로 WAF **3.22 → 1.03** | ✅ (레포 기확인) | R-08 |
| 쓰기 억제 정책 | Dynamo: 디스크 오프로드 필터 · 우선순위 필터 · LFU 임계값(기본 8) | ✅ | R-09 |
| **조정의 눈** | FDP Statistics로 **실시간 WAF = 미디어 기록 ÷ 호스트 기록**, RUH 상태, 엔듀런스 그룹 로그(Percentage Used · Endurance Estimate), FDP 이벤트(FID 1Eh) | ✅ | R-03~R-05 |
| **백그라운드 GC 강도** | 표준 수단은 **Predictable Latency Mode**(FID 13h/14h, 결정적/비결정적 창으로 GC 시점 제어)뿐. **지원을 표기한 출하 제품은 확인되지 않았다.** FDP에서 GC는 컨트롤러 소관이고 호스트는 로그로 피드백만 받는다 | ⚠️ **규격은 있으나 제품이 없는 자리** | R-06·R-11 |

**세 번째 단계에서 가장 비어 있는 곳은 GC 강도다.** 배치는 이미 운영 중에 조정되지만, GC 시점을 운영 중에 조절하는 표준 기능을 실제로 지원하는 제품은 없다.

## 5. 경계의 기준 — 계약을 깨는가

| 항목 | 바꾸면 무엇이 흔들리나 | 열 수 있는 시점 | 규격상 근거 |
|---|---|---|---|
| 용량 | 호스트 네임스페이스 · 파일시스템 | 출하 시 | 네임스페이스 관리는 생성·삭제뿐, 크기 변경 없음 (F-30 ✅) |
| SLC 비율 · OP | 용량과 보증 TBW | 출하 시 | SEF pSLC 수는 할당 후 변경 불가 (B-03 ✅) · Micron TBW 고정 (F-32) |
| RUH · RG 개수 | FDP 구성 | 출하 시 | 네임스페이스 0개일 때만 (F-07 ✅) |
| RUH 매핑 정책 | 없음 — 어느 데이터를 어느 핸들로 보낼지의 정책 | **운영 중** | 쓰기별 배치 ID (R-01 ✅) |
| 배치 가중치 | 없음 | **운영 중** | 호스트 정책 (R-08) |
| 백그라운드 GC 강도 | 지연 분포 — 성능 영향 상한으로 관리 | **운영 중** | PLM (R-06, 제품 없음) |

**용량과 보증 TBW는 고객과의 계약이다.** 운영 중에 바꾸면 호스트 파일시스템이 흔들리고 수명 회계가 모호해진다. 그래서 이 항목은 출하 시점에 한 번 정하고, 운영 중에는 **계약을 바꾸지 않는 정책 항목만** 조정한다. 이 구분은 설계 원칙이기 전에 **현행 규격이 허용하는 범위 그대로**다.

## 6. 적응형이 아직 어려운 이유 — 동적 변경의 장벽

용량 · 내구성 · 자원 구조를 운영 중에 바꾸는 SSD는 가치가 있다. 노화에 따라 노출 용량을 점진적으로 줄이는 설계는 실 워크로드에서 **최대 2.94배** 더 많은 쓰기를 받아냈다(CVSS, FAST'24 — 원장 B-08 🟡). 그러나 넘어야 할 장벽이 있다.

| 장벽 | 근거 | 등급 | 원장 |
|---|---|---|---|
| 용량을 운영 중에 바꾸는 표준이 없다 | 네임스페이스 크기 변경 = 삭제 후 재생성(데이터 소실). 예외는 벤더 전용 명령(WDC) | ✅ | B-01 |
| FDP 구조를 운영 중에 바꿀 수 없다 | 구성 변경에 네임스페이스 0개 필요 | ✅ | B-02 |
| SLC 비율도 할당 후에는 못 바꾼다 | SEF: 슈퍼블록 할당 후 pSLC 수 변경 호출은 -ENOSPC로 실패할 수 있다 | ✅ | B-03 |
| 엔듀런스 그룹 재구성은 콘텐츠 삭제를 동반한다 | Capacity Management 삭제 동작 · 지원 제품 없음 | 🟡 / ⚠️ | B-04 |
| 모드 전환은 마모를 늘린다 | TLC로 한 번 쓴 블록은 총 P/E 한도가 SLC 전용보다 줄고, SLC → TLC 회수 시 데이터를 두 번 쓴다 | 🟡 | B-05·B-06 |
| 보증 회계가 흔들린다 | 보증은 TBW 고정이 관행이고 Percentage Used는 벤더 고유 추정치다. 운영점이 운영 중에 바뀌면 대응 규칙을 새로 정해야 한다 | 🟡 / ⚠️ | B-07 |
| 호스트가 따라와야 한다 | 용량 가변 설계는 SSD만으로 안 되고 **탄력적 파티션을 지원하는 파일시스템과 사용자 수준 관리자**가 함께 있어야 했다 | 🟡 | B-08 |
| 구성 변경에 인증 게이트가 있다 | NVMe 2.3 CDP는 freeze 후 인증이 있어야 unfreeze | 🟡 | B-09 |
| 모드 혼재는 격리가 필요하다 | DapuStor는 QLC와 pSLC를 한 드라이브에 두기 위해 다이 수준 격리가 필요했다 | 🟡 | B-10 |

## 7. QLC 전략의 T3와 같은 벽

[waf-runtime-response.md](waf-runtime-response.md)의 핵심 기술 요소 **T3(무중단 FDP 재구성)**는 "운영 중 변경 경로가 스펙에 없다"를 현 수준으로 적었다. 이 페이지의 §5·§6이 그 상태를 코드 수준에서 확인한다 — FDP 구성 변경은 네임스페이스 0개일 때만 허용되고(✅ QEMU), 대안 규격(Capacity Management · CDP)은 지원 제품이 없다. **QLC 대용량 계층과 저용량 초고DWPD 계층은 운영점 곡선의 반대쪽 끝에 서지만, 같은 벽 앞에 있다.**

## 8. 쓰면 안 되는 문장

| 쓰면 안 되는 문장 | 이유 |
|---|---|
| "FDP 구성은 운영 중에 바꿀 수 있다" | 변경에는 네임스페이스 0개가 필요하다 (§3) |
| "FDP로 호스트가 GC를 제어한다" | FDP에서 GC는 컨트롤러 소관이다. 호스트는 배치만 지정하고 로그로 피드백을 받는다 (§4) |
| "NVMe로 네임스페이스 크기를 바꿀 수 있다" | 표준은 생성·삭제뿐이다. 벤더 전용 명령만 예외다 (§6) |
| "SLC 비율을 고르는 제품이 출하 중이다" | J5060은 발표 단계(출하 미확인), SEF는 API와 개발자 샘플이다 (§3) |
| "Capacity Management · CDP를 지원하는 제품이 있다" | 확인된 지원 출하 제품이 없다 (§3) |
| "용량을 줄이면 보증 DWPD가 N배가 된다" | TBW 고정 관행에서 보증 DWPD는 용량 비율만큼만 오른다 ([high-dwpd-operating-point.md](high-dwpd-operating-point.md) §4) |

## 9. 연결

- 보고서: [workload-configurable-ssd-report.md](../../outputs/report/workload-configurable-ssd-report.md) §3 (v0.2 확정, 슬라이드 보류)
- 자매 페이지(운영점과 30 DWPD 조건): [high-dwpd-operating-point.md](high-dwpd-operating-point.md)
- 배치 핸들의 작동 원리: [fdp-placement-mechanics.md](fdp-placement-mechanics.md)
- 운영 중 WAF 급등 대응과 T3: [waf-runtime-response.md](waf-runtime-response.md) §4·§5
- 배치 핸들 개수와 플랫폼 전략: [fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §2.6
- 역량 단계(디바이스 → 워크로드 최적화 → co-design): [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)
- 운영점 곡선의 반대쪽 끝(QLC 대용량 계층): [qlc-ssd-market.md](qlc-ssd-market.md)
- 이 경계를 쓰는 두 기술: [mixed-media-ssd.md](mixed-media-ssd.md)(영역 비율은 출하 시 구성) · [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md)(NVMe에 용량 축소 명령이 없음)
