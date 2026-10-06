---
type: concept
last_reviewed: 2026-09-28
sources:
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
  - sources/articles/component-to-system-solution-ladder-facts-2026-09.md
  - sources/articles/qlc-essd-market-size-forecast-data-2026-09.md
  - sources/articles/qlc-v7-hbm-to-storage-shift-2026-09.md
---

# 초고DWPD는 운영점이다 — 같은 쓰기 예산을 용량과 DWPD로 나누는 선택

KV 캐시의 **활성 작업 집합(active working set) 계층**이 요구하는 수십 DWPD를 어떻게 만들 것인가. [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)가 내구성 산식을 세웠다면, 이 페이지는 그 산식을 **저용량·초고DWPD 쪽 끝**에 적용한다. 정격 30 DWPD 이상 제품의 공개 지형, 30 DWPD에 닿는 조건, 그리고 그 조건이 말하는 수단의 순서를 정리한다. 구성을 언제 바꿀 수 있는가는 자매 페이지 [ssd-configurability-boundary.md](ssd-configurability-boundary.md)에 있다.

> 이 페이지의 출처 원장은 [wcssd-v1-high-dwpd-configurable-2026-09.md](../../sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **원장**)다. 원장 작성 시 벤더·표준 도메인이 막혀 **✅는 GitHub 원문을 직접 연 항목에만** 붙었고, 벤더 데이터시트 수치는 1차 출처라도 🟡다.

## 1. 한 문장

**용량과 DWPD의 곱은 하드웨어가 정한다. 같은 하드웨어는 같은 하루 쓰기 예산을 가지며, 그 예산을 용량과 DWPD로 어떻게 나눌지가 운영점이다.** 그래서 "2TB·30 DWPD"는 제품 스펙이기 이전에 **작업 집합 크기 × 하루 교체 횟수**라는 워크로드 파라미터이고, 고객마다 다르다.

## 2. 정격 30 DWPD 이상 제품의 공개 지형

정격 30 DWPD 이상으로 출하됐거나 출하된 적이 있는 제품은 모두 **셀당 비트를 줄인 SLC급 NAND**(SLC · XL-FLASH · Z-NAND · TLC/QLC 다이의 SLC 모드)이거나 **NAND가 아닌 SCM**(Optane, 단종)이다(원장 1-A).

| 제품 | 매체 | 용량 | 정격 DWPD | 발표·출시 | 원장 |
|---|---|---|---|---|---|
| 삼성 Z-SSD **SZ985** | Z-NAND (SLC 계열) | 240GB · 800GB | **30** (5년) | 2018-01 | H-09 🟡 |
| 삼성 **SZ983 M.2** | Z-NAND | 240 · 480GB | 30 | 2018 | H-10 🟡 |
| Kioxia **FL6** | XL-FLASH (SLC) | 800GB · 1.6TB · 3.2TB | **60** (5년, 기준 미공개) | 2021-09 | H-03 🟡 |
| Micron **XTR** | 176단 NAND를 SLC 모드로 | 960GB · **1.92TB** | **35** 랜덤 / 60 순차 | 2023-05 | H-02 🟡 |
| Solidigm **D7-P5810** | SLC 또는 QLC 다이의 SLC 모드 (출처 충돌 H-20) | 800GB · 1.6TB | **50** 4K 랜덤 / 65 순차 | 2023-09 | H-01 🟡 |
| DapuStor **X2900 / X2900P** | XL-FLASH (SLC) | 400GB ~ 1.6TB | 60 / 100 | 2023 리뷰 | H-13 🟡 |
| Phison Pascari **X200Z** | SLC 또는 TLC의 SLC 모드 (출처 충돌 H-22) | 800GB ~ 3.2TB, 최대 6.4TB | **60** | 2025-05 (시점 충돌 H-23) | H-06 🟡 |
| Intel **Optane P5800X** (단종) | 3D XPoint — NAND 아님 | 400GB ~ 3.2TB | 100 | 2020 Q4 | H-15 🟡 |

2026년 AI용으로 발표된 고내구 제품: Kioxia **GP1**(XL-FLASH 2세대, 최대 50 DWPD, 용량 미공개), SK하이닉스 **AI-N P**(SLC, DWPD 미공개), DapuStor **X5 SCM**(최대 120 DWPD, "KV 캐시 오프로딩" 포지셔닝), Phison **X202Z**(최대 60 DWPD)(원장 H-04·H-12·H-14·H-07 🟡). X5와 X202Z는 매체를 공개하지 않았으므로 위 "모두 SLC급 또는 SCM" 판정은 출하 제품에 대한 것이다.

**판정** (원장 1-D, ⚠️ 파생):
- 정격 30 DWPD 이상 제품의 용량은 **0.24TB ~ 3.2TB**(예외 6.4TB)에 몰려 있고, 가장 흔한 점은 **800GB · 1.6TB**다.
- **2TB·30 DWPD라는 점은 이미 이 범위 안에 있다.** Micron XTR 1.92TB는 2023년부터 35 DWPD(랜덤)이고, 삼성 SZ985는 2018년에 30 DWPD였다. 따라서 이 운영점을 "새로운 제품 형식"으로 부르면 바로 반론이 나온다. 새로운 것은 **겨냥하는 계층(KV 캐시 활성 작업 집합)**, **운영점을 고객이 고른다는 점**, **범용 NAND + FDP로 닿는다는 점**이다([workload-configurable-ssd-report.md](../../outputs/report/workload-configurable-ssd-report.md) §2.1).

**NAND 유형은 단정하지 않는다.** D7-P5810·XTR·X200Z는 "네이티브 SLC"와 "다른 다이의 SLC 모드" 서술이 출처마다 갈린다(원장 H-20~H-22). 표기는 "SLC 모드로 운용" 또는 "SLC급"으로 둔다.

## 3. KV 캐시와 30 DWPD — 공개 근거의 층위

**KV 캐시 요구치로 "30 DWPD"를 명시한 공개 출처는 없다**(원장 4-C). 공개된 KV 관련 수치는 기준이 다른 네 층으로 갈린다.

| 층위 | 수치 | 기준 | 원장 |
|---|---|---|---|
| KV 캐시용 주류 제품 정격 | **1 ~ 3 DWPD** | Kioxia CM10 1/3, Solidigm D7-PS1030 3 | X-08 🟡 |
| 실측 | **약 3.2 DWPD/드라이브** | StorageReview, 12.8TB × 8 RAID10, KV 쓰기 1.9 GB/s 상시 | D-03 🟡 |
| 배치·압축 적용 주장 | **7 ~ 10+ DWPD** (ScaleFlux, 5년, 정격 아님) · **최대 24 DWPD** (Huawei OceanStor M900, 시스템 수준, 3년) | 제3자 검증 없음 | D-01·D-02 🟡 |
| SLC급 AI 제품 정격 | **50 ~ 120 DWPD** | GP1 50 · X200Z/X202Z 60 · X5 120 | §1 🟡 |

- **환산 한 줄**(원장 D-09, ⚠️ 파생): 위 실측의 드라이브당 41 TB/일이 2TB 드라이브에 걸리면 약 **20.5 DWPD**다. 2TB에서 30 DWPD는 드라이브당 **60 TB/일, 약 0.69 GB/s 상시 쓰기**에 해당한다. 같은 쓰기량이 작은 드라이브에 몰린다는 가정에 의존하며, 원문의 주장은 아니다.
- **반증도 같은 무게로 둔다**(원장 4-B): DeepSpeed·FlexGen 오프로드 트레이스는 읽기 편중이다(CHEOPS'25, 읽기 2.0 GiB/s 대 쓰기 11 MiB/s). 삼성 기술 블로그(2026-08-25)도 KV 캐시 오프로딩을 "주로 읽기 집약적"으로 서술한다. NVIDIA Dynamo는 **SSD 수명 보호를 이유로** 재사용 빈도가 임계값 이상인 블록만 디스크로 내린다(기본 LFU 임계값 8, ✅ GitHub). 2025~2026년 SLC AI SSD의 공개 동기는 **IOPS·지연**이며 DWPD가 아니다(X-11).
- **그래서 고DWPD 요구는 KV 캐시 전체의 성격이 아니라, 교체가 잦은 활성 작업 집합 계층의 성격**이다. 설계점 수치(2TB·30 DWPD)의 근거는 공개 자료가 아니라 `[사내 확인]` 대상이다.

## 4. 운영점 산식 — 같은 쓰기 예산, 다른 운영점

레포가 이미 세운 산식(F29, ✅ — [component-to-system-solution-ladder-facts-2026-09.md](../../sources/articles/component-to-system-solution-ladder-facts-2026-09.md))을 용량 쪽으로 옮겨 쓰면 다음과 같다(원장 2-C, ⚠️ 산식 모델).

```
DWPD = P/E × (1 + OP) ÷ (WAF × 365 × 보증연수)          ← F29
사용자 용량 × DWPD = P/E × 원시 용량 ÷ (WAF × 보증 일수)   ← 같은 식, 원시 용량 = 사용자 용량 × (1 + OP)
```

우변은 NAND와 워크로드가 정한다. **좌변의 곱, 곧 하루 쓰기 예산이 하드웨어의 성질**이고, 용량과 DWPD는 그 예산을 나누는 방법이다.

**60 TB/일 예산 하나가 만족시키는 운영점** (⚠️ 파생):

| 작업 집합 (= 용량) | 하루 교체 횟수 (= DWPD) | 교체 주기 |
|---|---|---|
| 1TB | 60 | 24분 |
| **2TB** | **30** | **48분** |
| 4TB | 15 | 96분 |
| 8TB | 7.5 | 3시간 12분 |

- DWPD의 정의(하루 기록량 ÷ 용량)에서 바로 나온다: 작업 집합 W가 하루 T번 교체되고 용량을 W로 잡으면 **DWPD = T**다.
- 2TB·30 DWPD를 풀면 하루 60 TB, 평균 약 **0.69 GB/s** 상시 쓰기, 5년 총기록량 약 **110 PB**다.
- **고정 SKU는 이 곡선 위의 한 점**이다. 다른 작업 집합을 가진 고객에게는 용량이 모자라거나 DWPD가 남는다.

**이 곡선은 이미 출하 제품의 보증 규칙이다.** Micron Flex Capacity는 사용자가 용량을 바꿔도 **"TBW는 고정이고 DWPD가 바뀐다"**고 명시한다(원장 F-32 🟡). 반대로 Kioxia가 CM7-R 3.84TB(1 DWPD)를 1.6TB 네임스페이스로 줄여 "10 DWPD를 모사한다"고 한 것은 **성능 표현이지 보증 변경이 아니다** — TBW가 고정이면 보증 DWPD는 1 × 3.84 ÷ 1.6 = **2.4**다(원장 F-31·F-32, ⚠️ 파생).

**검산**: QLC(공개 P/E 범위 약 1,000, 원시 8TB · 사용자 7.68TB, WAF 약 2)를 넣으면 **0.285 DWPD**로 Kioxia LC9 정격 0.3과 같은 자릿수다(⚠️ WAF·기준 블록은 가정). QLC 정격 표기 규칙은 [qlc-ssd-market.md](qlc-ssd-market.md)의 표기 규칙을 따른다.

## 5. 30 DWPD에 닿는 조건

5년(1,825일) 30 DWPD의 조건은 `P/E × (원시/사용자) = 30 × 1,825 × WAF = 54,750 × WAF`다(원장 2-C, ⚠️ 파생).

**SLC 모드 P/E의 공개 범위**(원장 2-A·2-B, 🟡):

| 매체 | P/E | 비고 |
|---|---|---|
| TLC의 SLC 모드 — 구세대·보수적 | 약 30,000 | Virtium·TDK·Innodisk iSLC |
| TLC의 SLC 모드 — 엔터프라이즈 AI 제품 (2026) | 약 60,000 | Phison aiDAPTIV (TLC 모드 약 5,000 대비) |
| TLC의 SLC 모드 — 산업용 (2023) | 약 100,000 | Innodisk Ultra iSLC · Swissbit, 112단 BiCS5 |
| QLC의 SLC 모드 | **절대값 벤더 공표 없음** | DapuStor "QLC 영역 대비 25배 이상"(2026-09) |
| 네이티브 TLC / QLC | 약 3,000 ~ 5,000 / 약 1,000 | 비교용 |

단일값으로 쓰지 않는다 — 세대·ECC·보존 조건·온도 등급이 다르고, 산업용 10만은 SATA·저용량 제품 기준이다(원장 P-12).

**30 DWPD에 필요한 OP** (⚠️ 파생):

| SLC 모드 P/E | WAF 1 (배치 힌트 적용) | WAF 3 (배치 없음) |
|---|---|---|
| 30,000 | OP 82% | OP 447% |
| 60,000 | **기본 OP로 충분** (최대 약 35 DWPD) | OP 174% |
| 100,000 | 기본 OP로 충분 | OP 64% |

**판정**: **WAF 1이면 범용 TLC의 SLC 모드(6만 P/E급)로 기본 OP만 두고 30 DWPD에 닿는다. WAF 3이면 가장 좋은 공개 SLC 모드(10만 P/E)로도 OP 64%가 필요하다.** 전용 SLC 매체 없이 이 운영점에 닿게 하는 첫 수단은 배치 힌트(FDP)로 WAF를 낮추는 것이다. WAF가 내려가는 원리는 [fdp-placement-mechanics.md](fdp-placement-mechanics.md), 운영 중 WAF가 다시 오를 때의 대응은 [waf-runtime-response.md](waf-runtime-response.md)에 있다.

### 5.5 초고DWPD 운영점(2TB · 30 DWPD)과 MLC 모드 (2026-10-03 추가)

사용자 문제의식(2026-10-03): "2TB · 30 DWPD 제품군이 등장할 기미가 있다. SLC로 대응하면 되지만, MLC에 OP를 살짝 늘리고 FDP를 적용하는 기술 혁신으로 대응하면 이익을 늘릴 수 있다." 근거 원장은 [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](../../sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md)(UD).

**제품 신호** (🟡): 2026년 50 DWPD 이상 AI SSD(Kioxia GP1 · InnoGrit N3X · Phison X202Z · DapuStor X5)는 모두 SLC급이거나 매체 비공개이며 **DWPD보다 IOPS · 지연을 앞세운다**. 단일 드라이브 보증은 모두 5년이다. 공개 자료에는 2TB · 30 DWPD "KV 캐시 SSD"가 아직 없고, NVIDIA CMX는 GPU당 최대 16TB를 두되 DWPD 요구를 공개하지 않았다(UD-01~UD-13). → 2TB · 30 DWPD 신호는 `[사내 확인]`으로 둔다.

**다이 산술** (2TB · 30 DWPD · 5년, 1Tb TLC 다이 환산, 이론 비트/셀 비, ⚠️ 파생, UD §3):

| 구성 | WAF | 필요 OP | 다이 수 |
|---|---|---|---|
| SLC 모드 6만 P/E | 3 | 174% | 약 120 |
| SLC 모드 6만 P/E | 1 | 최소 7% | **약 47** |
| MLC 모드 P/E 1만(공개 산업용 수준) | 1 | 447% | 약 120 |
| MLC 모드 P/E 2만 | 1 | 174% | 약 60 |
| MLC 모드 P/E 3만 | 1 | 82% | 약 40 |
| MLC 모드 P/E 4만 | 1 | 37% | 약 30 |

- **손익분기**: FDP를 양쪽에 적용(WAF 1)하면 MLC 모드가 SLC 모드보다 다이를 덜 쓰는 최소 P/E는 **약 2.56만(5년) · 약 1.54만(3년)**, MLC 쪽 WAF가 1.2면 약 3.07만 · 1.84만이다. "OP를 살짝(40% 이하)" 늘리는 수준은 5년 기준 P/E 약 4만 이상이다.
- **MLC 모드 P/E 공개 근거**: 산업용 TLC의 MLC 모드 1만(Apacer MLC-liteX 🟡, 3K 보도와 충돌 ⚠️), 평면 시대 엔터프라이즈 MLC 2~3만(Micron 🟡). **3D TLC의 MLC 모드 엔터프라이즈 P/E는 공개 자료가 없다** → `[사내 확인]`. 네이티브 MLC 공급은 축소 중(2026 생산능력 -41.7% 전망 🟡).
- **판정**: 이 운영점의 **가장 큰 이익 지렛대는 WAF 3 → 1(고객 배치 정보)**이다: SLC 모드 그대로 다이 약 120 → 47. MLC 모드는 P/E가 손익분기를 넘을 때의 **추가** 지렛대이며, SLC 대비 읽기 지연이 길어 지연을 중시하는 구매자에게는 불리하다. MLC 모드는 5~20 DWPD 중간 운영점에서 더 자연스럽다(UD §3 표: P/E · OP · 보증 조합에 따라 약 5~30+ DWPD를 연속으로 덮는다).
- **사용자 결정 (2026-10-03, 덱 v1.0 리뷰 후)**: 고객 협력 전략 덱 · 보고서에서는 **MLC 모드 부분을 뺀다.** 초고DWPD는 "같은 SLC 모드에서 고객 배치 정보(FDP)로 WAF 3 → 1, 다이 약 120 → 47"만 보여 준다. 위 MLC 모드 산술은 지식으로 남긴다.
- **분류**(⚠️ 과제팀 판단): 초고DWPD는 별도 기술 축이 아니라 **이 페이지의 운영점 하나**로 둔다(같은 산식 · 지렛대 · 고객 소프트웨어). 사내에서 고객 요구와 MLC 모드 P/E가 확인되면 독립 제품 과제로 올린다([ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md) §2.4 · §4.4).

## 6. DWPD를 올리는 수단 — 비용의 순서

산식의 각 항이 곧 수단이다.

| 수단 | 산식 항 | DWPD 효과 | 대가 | 비용 순서 |
|---|---|---|---|---|
| ① WAF 낮추기 (FDP 배치 힌트) | WAF 3 → 1 | 약 3배 | 용량 손실 없음, **호스트 협력 필요** | 1 (가장 낮다) |
| ② 예비 공간(OP) 늘리기 | 사용자 용량 ↓ | 용량 감소에 비례 | 판매 가능 용량 | 2 |
| ③ SLC 모드 비율 늘리기 | P/E ↑, 원시 용량 ↓ | P/E 약 10배 이상 | 셀당 비트 감소 (TLC → SLC면 1/3) | 3 |
| ④ 전용 SLC 매체 | P/E 최대 | 가장 크다 | 별도 NAND 제품군 | 4 (가장 높다) |

- ①의 근거 수치: CacheLib은 RUH 2개만으로 KV 캐시 트레이스의 WAF를 **3.22 → 1.03**으로 낮췄다(원장 R-08 ✅, 레포 기확인).
- 순서는 **정성 판단**이다. 수단별 원가를 같은 기준으로 비교한 공개 자료는 없다.

## 7. 비용 표기 규칙

- **원가 배수를 고정 숫자로 쓰지 않는다.** SLC급 SSD와 TLC·QLC SSD의 $/GB를 같은 시점·같은 채널로 비교한 공개 자료가 없다(원장 C-15). 게다가 2026년은 NAND 가격 급등기라 시점이 다른 가격끼리의 배수는 의미가 없다(원장 0-3).
- 쓸 수 있는 것은 **용량 비율**이다: 같은 다이를 SLC로 쓰면 QLC 대비 이론상 **1/4**(⚠️ 이론). 실제 전환비는 더 불리하다 — DapuStor J5060은 QLC 약 4TB로 pSLC 800GB를 만들어 **5 : 1**, Phison aiDAPTIV는 원시 TLC 2TB로 사용자 320GB를 만들어 **6.25 : 1**(OP 포함)이다(원장 C-10·C-11 🟡).

## 8. 쓰면 안 되는 문장

| 쓰면 안 되는 문장 | 이유 |
|---|---|
| "2TB·30 DWPD는 새로운 형식의 제품" | 같은 운영점이 Micron XTR(2023)·삼성 SZ985(2018)로 이미 있다 (§2) |
| "KV 캐시는 30 DWPD를 요구한다" | 이 수치를 명시한 공개 출처가 없다. 공개 수치는 1~3 / 3.2 / 7~10+ / 24 / 50~120으로 층위가 다르다 (§3) |
| "KV 캐시 오프로드는 쓰기 집약적이다" (한정 없이) | 오프로드 트레이스는 읽기 편중이고, Dynamo는 SSD 수명 때문에 쓰기를 거른다. **활성 작업 집합 계층**으로 한정해야 한다 (§3) |
| "SLC SSD는 TB당 원가가 약 N배" | 같은 시점·채널의 공개 비교가 없다. 용량 비율로만 쓴다 (§7) |
| "Phison AI100E는 2TB·100 DWPD" | 공개된 세 수치(6만 P/E·원시 2TB·100 DWPD/5년)가 서로 맞지 않는다 — WAF 1에서도 68.5 DWPD(원장 P-30). 인용하지 않는다 |
| "용량을 줄이면 N DWPD 드라이브가 된다" (보증 의미로) | 벤더 표현은 성능 모사다. TBW 고정이면 보증 DWPD는 용량 비율만큼만 오른다 (§4) |
| pSLC P/E를 단일값으로 | 공개 범위가 3만~10만이고 조건이 다르다 (§5) |

## 9. 연결

- 보고서: [workload-configurable-ssd-report.md](../../outputs/report/workload-configurable-ssd-report.md) §1~§2 (v0.2 확정, 슬라이드 보류)
- 자매 페이지(구성 시점의 경계): [ssd-configurability-boundary.md](ssd-configurability-boundary.md)
- 산식의 출발점: [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md) §2 (F29)
- WAF가 내려가는 원리와 정격 DWPD의 워크로드 의존성: [fdp-placement-mechanics.md](fdp-placement-mechanics.md) §1·§5
- WAF가 다시 오를 때: [waf-runtime-response.md](waf-runtime-response.md)
- 추론 캐시 계층에서만 내구성이 구속 조건이다: [essd-purchase-criteria-shift.md](essd-purchase-criteria-shift.md) §4
- 운영점 곡선의 반대쪽 끝(대용량 1~3 DWPD): [qlc-ssd-market.md](qlc-ssd-market.md) · [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)
- KV 캐시가 SSD로 내려오는 경로: [hbm-to-storage-spillover.md](hbm-to-storage-spillover.md)
- 같은 기술 포트폴리오(어떤 미래에도 대응하는 세 기술)의 다른 두 축: [mixed-media-ssd.md](mixed-media-ssd.md) · [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md)
- 추가 솔루션 후보 평가(보안 · 신뢰 · 재사용, GPU 직결 고IOPS, 전력 · 냉각): [ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)
- 데이터센터 유형별 스토리지 요구(범용 · AI 학습 · AI 추론 · 에이전트): [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)
- 핵심 기술 6가지 × 제품군 × 고객 협력 강도(덱 2장 단일 소스): [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md)
- 파라미터 민감도 시뮬레이션(RU 크기 · RUH 수 · 분류 정확도, 덱 5장): [fdp-parameter-sensitivity-simulation.md](fdp-parameter-sensitivity-simulation.md)
