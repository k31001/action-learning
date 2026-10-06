---
type: analysis
last_reviewed: 2026-10-06
sources:
  - sources/articles/qlc-v7-placement-cases-waf-2026-09.md
  - sources/articles/fdp-technical-limits-adoption-context-2026-08.md
  - sources/articles/component-to-system-solution-ladder-facts-2026-09.md
  - sources/articles/qlc-v6-fdp-placement-handles-2026-09.md
---

# FDP 파라미터 민감도 시뮬레이션: 왜 응용마다 고객과 함께 맞춰야 하나

[ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3은 FDP를 "스펙만으로 닫히지 않는 유일한 핵심 기술"로 판정했다. 근거는 공개 연구의 정성 진술(같은 "FDP 지원" 장치에서 결과가 갈림, 오분류 · Noisy RUH, WARP FAST'26)이었다. 이 페이지는 같은 주장을 **하나의 단순 모델 위에서 수치로** 보인다. 덱 보충 5장의 근거였으나 2026-10-06 사용자 지시로 슬라이드는 제외했고, 분석은 지식으로 보존한다(보고서 §2.4 요약).

> 사용자 지시(2026-10-06): "FDP는 왜 고객과 협력해야 제대로 된 효과를 볼 수 있는지 설명할 수 있는 시각화 보충 자료를 마지막 슬라이드 한 장 추가해 줘. FDP 개념 이해부터 시작해서 응용에 따라 주요 파라미터들이 변경이 필요하다는 것을 시뮬레이션이나 시각적으로 이해시키는 것이 필요해."

**성격**: ⚠️ 시뮬레이션(모델). 실측이 아니다. 방향과 민감도를 보이기 위한 것이며 절대값은 실제 장치 · 워크로드에서 재야 한다.

## 1. 모델

- 코드: [`scripts/fdp_waf_sim.py`](../../scripts/fdp_waf_sim.py) (난수 시드 고정, 재현 가능). 결과: [`outputs/presentation/assets/fdp_waf_sim.json`](../../outputs/presentation/assets/fdp_waf_sim.json)
- **SSD**: 페이지 매핑 FTL, 논리 용량 L = 32,768 단위(RU 128 이상은 65,536), 물리 = L × 1.12(OP 12%). 지움 단위 = RU(R 단위). GC는 유효 단위가 가장 적은 닫힌 RU를 고르고(greedy), 유효 데이터는 같은 핸들의 GC 전용 RU로 옮긴다(persistently isolated).
- **호스트(응용)**: 수명 등급마다 객체를 쓴다. 등급 = (용량 몫, 쓰기 몫, 객체 크기, 교체 방식). fifo = 오래된 객체부터 덮어씀, random = 임의 객체를 덮어씀. 덮어쓴 객체의 단위는 통째로 무효가 된다. 등급마다 쓰는 중인 객체가 하나씩 있고, **단위마다 등급이 쓰기 몫 비율로 번갈아 들어온다**(동시 쓰기).
- **FDP**: 등급 → 배치 핸들. 핸들이 등급보다 적으면 수명이 가까운 등급끼리 묶는다. 오분류율 m: 객체의 m 비율이 다른 핸들로 간다.
- **측정**: 채운 뒤 3L 워밍업, 이어서 4L 동안 WAF = (호스트 기록 + GC 이동) ÷ 호스트 기록.

| 응용 모델 | 수명 등급 (용량 몫 · 쓰기 몫 · 객체 크기 · 교체) | 무엇을 흉내 냈나 |
|---|---|---|
| 플래시 캐시 (CacheLib형) | 작은 객체 5% · 40% · 1 · random / 큰 객체 95% · 60% · 16 · fifo | SOC(해시 버킷) + LOC(로그 구조) |
| LSM DB (RocksDB형) | L0 0.5% · 25% · 16 · fifo / L1 4.5% · 25% · 16 · random / L2 20% · 25% · 16 · random / L3 75% · 25% · 16 · random | 레벨별 수명 ×10, 레벨마다 쓰기량이 비슷한 leveled 컴팩션, SST = 16단위 |
| KV 캐시 오프로드 | 인덱스 2% · 10% · 1 · random / KV 블록 98% · 90% · 64 · random | 큰 KV 블록 파일 + 작은 인덱스 |
| 멀티테넌트 (8등급) | 8개 등급, 용량 몫 0.5~44.5%, 쓰기 몫 각 12.5%, 객체 4 · random | 수명이 서로 다른 테넌트 8개 |

## 2. 결과

### 2.0 모델 검증: FDP 없음 대 FDP (RU 16, 핸들 = 등급 수)

| 응용 | FDP 없음 | FDP | 비교 실측 |
|---|---|---|---|
| 플래시 캐시 | **2.97** | **1.00** | CacheLib 3.22 → 1.03(EuroSys'25, Meta · Samsung, [qlc-v7-placement-cases-waf-2026-09.md](../../sources/articles/qlc-v7-placement-cases-waf-2026-09.md) C-08 · [component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md) F15) |
| LSM DB | 2.40 | 1.00 | (RocksDB 공개 FDP 쌍 없음) |
| KV 캐시 | 1.10 | 1.00 | |
| 멀티테넌트 | 3.47 | 2.66 | RU(16)가 객체(4)보다 커서 등급 안 무작위 교체가 남는다(§2.1과 같은 원리) |

→ 플래시 캐시 모델은 실측과 같은 방향 · 비슷한 크기다. 모델이 FDP의 기본 효과를 재현한다.

### 2.1 RU 크기: 응용의 삭제 단위보다 크면 무너진다 (핸들 = 등급 수)

| RU 크기 (단위) | 4 | 8 | 16 | 32 | 64 | 128 | 256 |
|---|---|---|---|---|---|---|---|
| LSM DB (SST 16) | 1.00 | 1.00 | **1.00** | 1.67 | 2.44 | 2.97 | 3.71 |
| KV 캐시 (블록 64) | 1.00 | 1.00 | 1.00 | 1.00 | **1.00** | 1.80 | 2.85 |

→ WAF 1이 무너지는 지점 = **응용의 삭제 단위**(SST 크기 · KV 블록 크기). RU가 그보다 크면 한 RU에 여러 객체가 섞여 따로 죽고, GC가 다시 필요해진다. RU 크기는 SSD가 정하고(NAND 블록 × 다이 묶음, 출하 시 구성), 삭제 단위는 고객 SW가 정한다 → **둘을 함께 맞춰야 한다.**

### 2.2 RUH 수: 수명 등급 수만큼 필요하다 (RU 4)

| RUH 수 | 1 | 2 | 4 | 8 |
|---|---|---|---|---|
| 플래시 캐시 (2등급) | 2.09 | **1.00** | 1.00 | 1.00 |
| LSM DB (4등급) | 1.90 | 1.38 | **1.00** | 1.00 |
| 멀티테넌트 (8등급) | 2.36 | 1.93 | 1.54 | **1.00** |

→ 필요한 핸들 수 = **응용의 수명 등급 수**(2 · 4 · 8). 모자라면 수명이 다른 데이터가 한 핸들에서 다시 섞인다. RUH · RG 구성은 출하 시 고정이다([ssd-configurability-boundary.md](ssd-configurability-boundary.md), F-07 ✅). 업계 통상 드라이브의 핸들은 2~8개, 과제팀 요구는 16개([qlc-v6-fdp-placement-handles-2026-09.md](../../sources/articles/qlc-v6-fdp-placement-handles-2026-09.md)). (RU 4는 등급 안 무작위 교체의 영향을 빼고 핸들 수만 보려고 골랐다.)

### 2.3 분류 정확도: 고객 SW가 잘못 나누면 효과가 사라진다 (RU 16, 핸들 = 등급 수)

| 잘못 나눈 쓰기 비율 | 0% | 5% | 10% | 20% | 40% |
|---|---|---|---|---|---|
| 플래시 캐시 | 1.00 | 1.09 | 1.42 | **2.37** | 2.77 (FDP 없음 2.97) |
| LSM DB | 1.00 | 1.01 | 1.02 | 1.48 | 1.55 |

→ 분류 품질은 **고객 SW**가 정한다. 플래시 캐시는 20%만 잘못 나눠도 FDP 없음에 가까워진다. 공개 연구의 정성 진술과 같은 방향이다: 오분류 · RUH 간섭 시 실패, 사용자 데이터 99%가 한 RUH로 몰려 붕괴(WARP FAST'26, [qlc-v7-placement-cases-waf-2026-09.md](../../sources/articles/qlc-v7-placement-cases-waf-2026-09.md) D-01 · D-03 🟡, [fdp-technical-limits-adoption-context-2026-08.md](../../sources/articles/fdp-technical-limits-adoption-context-2026-08.md) §3).

## 3. 읽는 법 (⚠️ 과제팀 판단)

| 파라미터 | 누가 정하나 | 무엇을 알아야 정하나 | 모델이 보인 것 |
|---|---|---|---|
| RU 크기 | SSD(출하 시 구성) | 고객 응용의 삭제 단위 | 무너지는 지점이 응용마다 다르다(16 대 64) |
| RUH 수 · RG | SSD(출하 시 고정) | 고객 응용의 수명 등급 수 | 필요한 수가 응용마다 다르다(2 · 4 · 8) |
| 분류(어떤 쓰기를 어느 핸들로) | 고객 SW | SSD의 RU · GC 동작 | 10~20% 오분류로 효과 대부분 소멸(캐시) |

→ SSD 쪽 두 값은 고객 응용을 알아야 출하 전에 정할 수 있고, 고객 쪽 한 값은 SSD 동작을 알아야 잘 정할 수 있다. **어느 한쪽 스펙만으로 닫히지 않는다.** 이것이 FDP를 "고객과 공동 설계 필수"로 둔 이유다.

## 4. 한계

- **단순 모델**: 균일한 단위 크기, 등급 안 객체 크기 고정, 등급마다 동시 객체 1개, greedy GC, persistently isolated만, 다이 · 채널 병렬성 · 읽기 · 시간 지연 미반영. "단위"는 응용 모델의 최소 쓰기 단위이며 실제 바이트가 아니다.
- **실제 RU 크기는 공개되지 않았다**: 실제 장치의 RU는 NAND 블록을 여러 다이에 묶은 큰 단위로 알려져 있으나 제품별 값은 확보하지 못했다. 그래서 절대값 대신 "응용의 삭제 단위 대비"로 읽어야 한다.
- **멀티테넌트 모델**은 수명이 다른 8등급을 가정했다. 테넌트 수와 수명 분포는 고객마다 다르다.
- 절대 WAF는 OP · 사용률 · GC 정책에 민감하다. 덱 5장은 방향과 민감도만 쓴다.

## 5. 쓰면 안 되는 문장

| 문장 | 이유 |
|---|---|
| "FDP는 WAF를 항상 1로 만든다" | 모델에서도 RU가 삭제 단위보다 크거나, 핸들이 모자라거나, 분류가 틀리면 무너진다 |
| "실측 결과 RU를 16으로 하면 된다" | 단위는 모델의 상대 단위다. 실측이 아니다 |
| "시뮬레이션이 CacheLib 실측을 재현했다" | 방향과 크기가 비슷할 뿐(2.97 → 1.00 대 3.22 → 1.03), 같은 조건이 아니다 |

## 6. 연결

- 협력 깊이 판정(FDP = 공동 설계 필수): [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md)
- FDP 메커니즘 · 네 가지 경우: [fdp-placement-mechanics.md](fdp-placement-mechanics.md)
- 출하 시 구성의 경계(RUH · RG · OP): [ssd-configurability-boundary.md](ssd-configurability-boundary.md)
- 고DWPD 운영점(WAF 3 → 1이면 다이 -60%): [high-dwpd-operating-point.md](high-dwpd-operating-point.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md) §2.4
