---
type: concept
last_reviewed: 2026-10-03
sources:
  - sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md
  - sources/articles/qlc-v6-reliability-ppm-die-protection-2026-09.md
  - sources/articles/qlc-essd-market-size-forecast-data-2026-09.md
---

# 고용량 SSD와 결함 허용: 랙 공간의 가치가 오르면 다이 고장이 시스템 문제가 된다

고용량 SSD는 지금 가격 때문에 고객이 서두르지 않는 기술이다. 그러나 **랙 공간의 가치가 오르는 미래**에서는 같은 폼팩터에 더 많은 용량을 담는 능력이 결정적이 된다. 그때 한 디바이스에 1,000개가 넘는 NAND 다이가 들어가므로 **다이 고장을 어떻게 견디는가(결함 허용)**가 핵심 기술이 된다. 이 기술은 SSD 안에서 해결할 수 있지만 **고객 시스템과 함께할 때 효과가 커진다**. 다이 수와 보호 구조의 ppm 모델은 [ssd-die-reliability-ppm.md](ssd-die-reliability-ppm.md)에 있다.

> 출처 원장은 [ssd-high-capacity-rackspace-fault-tolerance-2026-10.md](../../sources/articles/ssd-high-capacity-rackspace-fault-tolerance-2026-10.md)(이하 **원장**)다. 벤더 · 뉴스 · 표준 사이트가 대부분 막혀 ✅는 오픈소스 코드(libnvme · nvme-cli · Linux · QEMU)와 Microsoft Research 논문 · Google Cloud 블로그에만 붙었다.

## 1. 랙 공간의 가치는 왜 오를 수 있나

| 동인 | 근거 | 등급 |
|---|---|---|
| **데이터센터 건설 지연** | 2026년 미국 가동 예정 약 16GW 중 착공 확인은 약 5GW, 예정분의 30~50%가 연내 가동 어려움(Sightline Climate). 반론: 모라토리엄으로 실제 지연된 것은 전국 2.3GW(SemiAnalysis) — **추정이 엇갈린다** | 🟡 (원장 A1~A3) |
| **규제 강화** | 뉴욕주 50MW 이상 신규 데이터센터 주 인허가 1년 중단(2026-07-14), 버지니아 라우던 카운티 자동 허용 폐지, 조지아 100MW 초과 대형부하 별도 요금, 네덜란드 하이퍼스케일 신규 건설 2곳 외 금지 | 🟡 (A5~A11) |
| **전력망 대기** | 미국 그리드 연계 대기열 2,600GW, 평균 대기 5~12년 | 🟡 ([energy-constraints.md](energy-constraints.md)) |
| **컴퓨트가 전력·공간을 가져간다** | AI 랙 전력 밀도: H100 공랭 약 40kW, GB300 NVL72 약 140kW, Rubin 세대 190~230kW, 2027년 1MW급 랙 대비(NVIDIA 800VDC). 범용 랙 평균은 약 9kW | 🟡 / ⚠️ (A12~A16) |
| **코로케이션 공실 사상 최저** | 북미 1차 시장 공실률 1.4%(H1 2026), 호가 +4~8% | 🟡 (A26) |

**스토리지는 작지 않다.** Azure 실측에서 스토리지 관련 배출은 범용 클라우드 **운영 배출의 33%, 내재 배출의 61%**다(HotCarbon'24 ✅). 벤더는 "스토리지가 낭비하는 와트는 GPU에서 빼앗은 와트"라고 주장한다(⚠️ 벤더). 같은 전력·공간 예산 안에서 GPU를 늘리려면 스토리지의 TB당 공간과 전력을 줄여야 한다.

**밀도 역전**: Azure 표준 플랫폼에서 2024년 용량 기준으로는 HDD 블레이드(4U · 2.6PB)가 SSD 블레이드(1U · 246TB)보다 공간당 용량이 약 2.6배 높았다. 1U · 16슬롯 블레이드에 245.76TB 드라이브를 넣으면 **약 3.9PB/U로 HDD(0.65PB/U)를 역전**한다(원장 A18 ✅, A19 ⚠️ 파생).

## 2. 고용량 SSD 로드맵과 지금의 장애물

| 용량 | 제품 · 계획 | 등급 |
|---|---|---|
| 122.88TB | Solidigm D5-P5336, Phison D205V | 🟡 |
| 245.76TB | Kioxia LC9(CY2026 양산), **Micron 6600 ION 출하(2026-05-05)**, SK하이닉스 PS1101 공개(2025-09) | 🟡 |
| 256TB | Sandisk UltraQLC SN670(BiCS8 2Tb 다이, 1H26 출하 목표) | 🟡 |
| **512TB** | 삼성 PCIe Gen6 512TB 2027 계획(GMIF 2025), Sandisk 로드맵, **DapuStor R6060 512TB 공개(FMS 2026)**, Meta는 QLC를 최대 512TB까지 계획 | 🟡 |

- **장애물은 가격과 공급이다.** TrendForce는 CSP의 QLC 대규모 채택 장애로 비용과 공급망을 꼽았고, 고용량 제품은 납기가 1년 이상 늘어났다(🟡). Solidigm 122.88TB 소매가는 판매 개시 약 $101/TB에서 약 9개월 뒤 약 $302/TB가 됐다(🟡, 소매 리스팅).
- **초고용량의 TB당 프리미엄을 직접 보여 주는 공개 지수는 없다.** 같은 시기 30TB QLC 지수($504~603/TB)보다 122TB 소매 리스팅의 TB당 가격이 오히려 낮아, "초고용량은 TB당 더 비싸다"를 공개 데이터로 확인할 수 없다(원장 B14 ⚠️).

## 3. 다이가 늘면 고장은 시스템 문제가 된다

| 용량 | 다이 수(2Tb 기준) | 다이 1개가 안는 데이터 | 드라이브 재구축 시간(무부하 3.2GB/s · 부하 중 316MB/s) | 다이 1개만 복구 |
|---|---|---|---|---|
| 61.44TB | 512(1Tb) | 0.125TB | 5.4시간 · 2.3일 | — |
| 245.76TB | 1,024 | 0.25TB | **21.5시간 · 9일** | **13분**(부하 중) |
| 512TB | 약 2,133 | 0.25TB | **44.7시간 · 18.8일** | 13분 |

재구축 시간은 61.44TB 실측(xiRAID 5시간 22분, 부하 중 316MB/s)을 선형 확대한 값이다(원장 E1 🟡, §5-2 ⚠️ 파생). **용량이 커질수록 드라이브 하나를 통째로 다시 만드는 비용이 커지고, 고장 난 다이 하나의 데이터만 고치는 것과의 차이는 수천 배가 된다.**

현장 데이터도 같은 방향이다. 대규모 플릿에서 SSD 관련 장애 티켓의 79%가 교체로 이어졌고(Microsoft SYSTOR'16 🟡), Azure 연구는 "**오늘날 부분 고장은 전체 고장**"이라며 스토리지 스택이 부분 고장을 견디도록 바뀌어야 한다고 썼다(HotCarbon'24 ✅).

## 4. SSD 안에서 할 수 있는 것

| 기술 | 내용 | 선례 |
|---|---|---|
| 다이 단위 패리티(RAIN · 내부 RAID) | 다이 1개 고장에도 데이터 보존 | Micron RAIN 1:15, Kioxia Flash Die Failure Protection 🟡 |
| Fail-in-Place(감량 운영) | 다이를 잃어도 데이터를 재구성해 정상 다이로 옮기고 계속 동작 | 삼성 PM1733 FIP(30.72TB, 512다이 중 1개 상실 허용) 🟡 |
| 이중 패리티 · 여분 다이 | 512TB급에서 단일 패리티 요구를 못 맞출 때의 선택지 | 모델 옵션([ssd-die-reliability-ppm.md](ssd-die-reliability-ppm.md) §3) |
| 다이 상태 텔레메트리 | OCP SMART 확장 로그의 `total_media_dies` · `total_die_failure_tolerance` · `media_dies_offline` | nvme-cli OCP 플러그인 ✅ |
| 컨트롤러 RAID 가속 | 재구축을 SSD 최대 쓰기 속도로 | Kioxia RAID Offload(CPU 약 50%↓) 🟡 |

> **재확인 필요**: 삼성 PM1733 FIP의 "플레인 4GB · 다이 8GB 단위 감량" 서술은 이번 조사에서 재확인되지 않았다(30.72TB ÷ 512다이 ≈ 60GB와도 맞지 않는다). FIP 기능 자체(다이 1개 상실 허용)는 🟡로 유지한다.

## 5. 고객 시스템과 함께하면 커지는 효과 (공동 설계)

하이퍼스케일러는 이미 **시스템 수준에서 데이터를 중복 저장**한다(Azure LRC 1.33배, Google Colossus 소프트웨어 RAID, Meta RS 부호, VAST 146+4 스트라이프 🟡). 디바이스와 시스템이 서로의 보호를 모르면 **같은 보호를 두 번 하거나, 다이 하나 때문에 드라이브 전체를 재구축**한다.

| 공동 설계 요소 | 무엇을 바꾸나 | 표준 · 연구 근거 |
|---|---|---|
| **고장 LBA만 알려 주기** | 드라이브 전체가 아니라 고장 다이의 LBA만 호스트가 다시 쓴다(21.5시간 → 13분) | NVMe **Get LBA Status(0x86)** · LBA Status Information 로그 · Rebuild Assist(NVMe 1.4) ✅. 단 **Linux는 해당 경고를 켜지 않고 QEMU는 미구현** ✅ → 호스트 쪽 구현이 비어 있다 |
| **용량을 줄이며 계속 쓰기** | 다이를 잃으면 드라이브를 버리지 않고 용량을 줄여 계속 운영 | SCSI HDD에는 디팝퓰레이션 명령(REAT)이 있으나 **NVMe에는 없다** ✅. 학계 CVSS(FAST'24, 수명 268~327% 연장)·업계 SDC26 제안(호스트 주도 용량 축소 + 클러스터 EC) 🟡 |
| **보호의 분담** | 시스템 EC가 있으면 디바이스 패리티를 조정해 용량을 돌려받는다 | Google "디스크 집합 최적화"(FAST'16), Micron "호스트와 디바이스가 복원력을 나눠 맡는다" 🟡 |
| **고장 예측 텔레메트리** | 다이 오프라인 · 예비 소진을 미리 알려 계획적으로 비운다 | OCP 다이 필드 ✅, NVMe Media Unit Status(0x10) · Endurance Group 경고 ✅ |

**결론**: 245TB까지는 SSD 내부 단일 패리티로 충분하다. 그러나 512TB급에서는 내부 보호만으로 요구를 맞추기 어렵고, 재구축 비용이 드라이브 하나에 며칠 단위가 된다. 그래서 **고장 정보를 호스트와 나누는 표준(Get LBA Status, 용량 축소)과 그것을 쓰는 고객 소프트웨어**가 함께 있어야 고용량의 가치가 온전히 나온다. NVMe에 용량 축소 명령이 없다는 것은 **규격을 먼저 제안할 수 있는 자리**이기도 하다.

## 6. 쓰면 안 되는 문장

| 쓰면 안 되는 문장 | 이유 |
|---|---|
| "미국 데이터센터의 절반이 지연된다" | 추정이 엇갈린다(30~50% vs 모라토리엄 지연 2.3GW). 범위와 출처를 함께 쓴다 |
| "초고용량 SSD는 TB당 N% 더 비싸다" | 공개 지수가 없고, 소매 리스팅은 오히려 반대 방향 |
| "NVMe로 드라이브 용량을 줄일 수 있다" | 표준 명령이 없다(SCSI HDD에만 있음) |
| "Linux는 고장 LBA를 자동으로 재구축한다" | 커널이 해당 경고를 켜지 않는다 |
| "245TB 재구축은 N시간" (실측처럼) | 공표 수치가 없고, 61TB 실측의 선형 확대일 뿐이다 |

## 7. 연결

- 다이 수 · 보호 구조 ppm 모델: [ssd-die-reliability-ppm.md](ssd-die-reliability-ppm.md)
- 전력 · 그리드 제약: [energy-constraints.md](energy-constraints.md) · [ai-datacenter-buildout.md](ai-datacenter-buildout.md)
- QLC 시장과 고용량 선호: [qlc-ssd-market.md](qlc-ssd-market.md)
- 같은 기술 포트폴리오의 다른 두 축: [high-dwpd-operating-point.md](high-dwpd-operating-point.md) · [mixed-media-ssd.md](mixed-media-ssd.md)
- 구성 시점의 경계(용량 · 구조는 빈 상태에서만 변경): [ssd-configurability-boundary.md](ssd-configurability-boundary.md)
- 보고서: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
- 추가 솔루션 후보 평가(보안 · 신뢰 · 재사용, GPU 직결 고IOPS, 전력 · 냉각): [ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)
