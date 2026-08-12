# 팹 설비 공용성과 제품 전환의 기술·경제적 실체 — 웹 리서치 종합 (2026-08-12)

**수집일**: 2026-08-12
**유형**: 웹 검색 기반 2차 자료 종합 (DRAM·NAND·로직 간 장비 공용성 / 라인 전환 사례 / 전환 병목 / 기술 연장성 / HBM 캐파 트레이드 / 타 산업 공용화 벤치마크)
**용도**: 2차 저지선 전략 「전환할 수 있는 몸」 — ① 세대 연장성 ② 제품 간 동일성 ③ 낮은 레벨 설비 설계의 근거 데이터
**주의 (중요)**:
- **DRAM↔NAND 장비군별 공용 가능 비율(%)의 공개 추정치는 존재하지 않는다.** 업계 공개 담론은 전부 정성적이다. 유일하게 확인되는 정량 공용률은 **DRAM↔CIS 약 80%** 뿐이며 이마저 ETNews 보도 인용의 2차 전언이다. §8에 미확인 항목을 전부 명시했다.
- 라인 전환의 **소요 기간·비용은 3사 모두 미공시**다. 본 노트가 제시하는 기간·비용은 전부 언론 관측치이거나 인접 대리지표이며 그렇게 표기했다.
- 일부 항목은 신뢰도가 낮은 2차 집계 사이트에서 나왔다. 해당 수치는 **[저신뢰]** 태그를 달았다.

---

## §1. 제품별 공정·장비 프로파일 — 왜 갈라졌는가

### 1-1. 리소 집약 vs 식각/증착 집약 (핵심 분기)

- **3D NAND**: "3D NAND는 리소 스텝의 압력을 걷어내고 증착·식각으로 관심을 옮겼다" — 3D NAND 팹은 **증착·식각 스텝이 다수, 리소 스텝은 소수**로 툴링된다 (The Memory Guy / Jim Handy, "3D NAND's Impact on the Equipment Market")
- **DRAM**: "DRAM 팹의 툴링 비용은 여전히 **리소가 지배**한다" (동)
- 결과: "**DRAM과 3D NAND 팹 툴링 사이의 공통점은 오히려 줄었다**" (동)
- 수직 적층이 3D NAND의 리소 요구를 완화시키고, 가장 어려운 공정 난제를 **증착·식각으로 이관**했다 (동)
- NAND 장비 지출 중 **식각+증착이 약 50~60%** 차지 [2차 자료: Jason's Chips, "DRAM vs. NAND: The Supply Side"]

### 1-2. 병목 구조가 다르다 — 단일 공급 vs 복수 공급

- **DRAM 선단**: EUV가 병목. "ASML은 EUV 리소 시스템의 유일한 제조사. 세컨드 소스가 없다." EUV 스캐너 대당 약 $200~400M, ASML 증설 여력은 연간 십수 대 수준 [Jason's Chips]
- **NAND**: "NAND 증설을 게이팅하는 단일 툴 병목이 없다" — 식각(Lam 우세)·증착(AMAT 우세) 모두 복수 공급사, 정상 리드타임 조달 가능 [Jason's Chips]
- 함의: **"낮은 레벨 설비로 설계 가능하게 한다"는 명제는 NAND형(식각·증착 집약) 공정 구조에서 이미 부분적으로 실현된 형태**다. DRAM에서 이를 하려면 EUV 의존 레이어를 볼륨 티어에서 분리해야 한다.
- 참고 — DRAM 1c 세대에서도 DUV 멀티패터닝(SAQP/LE4)이 EUV보다 원가 우위인 레이어가 존재: "EUV vs DUV의 원가 차이가 스페이서 피치 하빙 1회 추가 비용보다 훨씬 크다. 그래서 SAQP가 원가 기준 선호 옵션" [chentfred, "DRAM Scaling: DUV Multipatterning from 1z to 0b"]. EUV 루프당 제조원가 약 $70/웨이퍼, EUV 툴 1대 $170M 수준 [SemiAnalysis]

### 1-3. DRAM 주변부(periphery) = 로직에 가장 가까운 접점, 그러나 copy-paste 불가

- DRAM 주변 트랜지스터는 요구조건이 까다로워 **일반 로직 트랜지스터 공정 플로우의 'copy-paste'가 불가능**하다. 게이트 스택·소스/드레인 정션·소스/드레인 메탈 콘택 모듈의 개별 최적화가 필요 (imec, "DRAM peripheral transistors technology platform")
- 결정적 제약: **550~600℃ 이상의 열처리를 견뎌야 한다** (동)
- 실무적으로 주변부 로직은 **더 성숙한(older) 공정 노드**로 만들며, 배선층 수도 표준 CMOS보다 적다 (EDN, "DRAM basics and its quest for thermal stability")
- 함의: 로직↔DRAM 사이에는 물리적 다리가 있으나 **셀 어레이의 열예산(thermal budget)이 그 다리의 폭을 결정**한다. 어레이와 페리를 분리(=CBA/하이브리드 본딩)하면 이 제약이 사라진다 → §5로 연결.

### 1-4. 팹 레벨 공용성에 대한 역사적 판정 (가장 중요한 정성 진술)

> 플래너 NAND 시절, "일부 업체는 **NAND와 DRAM 사이를 빠르고 빈번하게 전환할 수 있는 완전 가변(fully-fungible) 팹**을 만들려고까지 했다. 그러나 두 기술의 **장비 밸런스가 서로 너무 달라 유휴 장비가 발생**하는 결과를 낳았다."
> "오늘날 **한 기술에서 다른 기술로 팹을 전환하는 것을 고려할 제조사는 거의 없다.**"
> — The Memory Guy (Jim Handy), "3D NAND's Impact on the Equipment Market"

반면 **동일 제품군 내 세대 전환은 재사용도가 높다**:
> "NAND 세대 간 전환에서는 **재사용도가 높다. 대부분의 장비가 이미 그 자리에 있기 때문**이다. 다만 CVD·식각 툴이 추가로 필요하다." (동)

**이 두 문장이 본 과제의 정확한 좌표다.** 업계의 현행 상식은 "제품 간 전환은 비경제적, 세대 간 전환은 경제적"이고, 「전환할 수 있는 몸」은 그 상식을 **팹 설계 시점에 바꾸자**는 제안이다. 즉 이 노트는 전략의 근거이자 **반론의 근거**이기도 하다. 반론을 먼저 인용하고 넘어야 한다.

---

## §2. 장비군별 공용성 — 확인된 것과 확인 안 된 것

| 장비군 | 제품 간 공용성 | 근거 |
|---|---|---|
| **리소 (EUV)** | **DRAM 선단 전용에 가까움**. NAND는 EUV 미사용, 로직과는 노드 세대가 다름 | Jason's Chips; The Memory Guy |
| **리소 (DUV/immersion·트랙)** | 상대적으로 공용 가능. DRAM 비선단·NAND 상부·CIS 모두 사용 | DRAM→CIS 전환 시 리소 재사용 명시 (ETNews 인용 보도) |
| **식각 (HAR 유전체)** | NAND 특화 → **3D DRAM으로 이전 중** (전용→공용 전환 진행형) | Lam Vantex·Cryo 3.0; Lam "Learning From NAND" |
| **식각 (범용/셀렉티브)** | 공용. AMAT Selectra Mo Etch는 "NAND·DRAM·파운드리로직 전반에 신규 기회" 명시 | AMAT 보도자료 (2026-06-15) |
| **증착 (ALD/CVD)** | 공용성 높음. AMAT Centris Spectral SiN ALD는 "DRAM과 로직 양쪽 스케일링" 적용 명시 | AMAT 보도자료 (2026-06-15) |
| **CMP·세정·PR 스트립** | **범용 성격이 가장 강함.** 한국 증권가: "테스·피에스케이는 **D램·낸드 전환 투자와 신규 투자 모두에서 발주되는 범용 장비**" | 시사저널e; 한국신용신문 |
| **계측·검사** | 공용 (DRAM→CIS 전환에서 테스트 장비 재사용 명시) | ETNews 인용 보도 |
| **이온주입** | **공개 확인 자료 미확인** (공용성에 관한 명시적 진술 못 찾음) | — |
| **TSV·본딩·박막화(HBM)** | 전용. 팹이 아니라 후공정 캐파 | SemiWiki; SK hynix 뉴스룸 |

- **로직 노드 간** 툴 재사용률 참고치: FinFET 세대 간(N7→N5, N5→N3) **50~70%**. 단 N2에서는 GAA·백사이드 전력공급 도입으로 재사용률이 크게 떨어짐 [2차 자료: tscsw substack, "Semiconductor Equipment Primer"]. **이 수치는 로직 노드 간이지 제품 간이 아니다 — 인용 시 오용 주의.**
- **제품 간 공용률로 공개된 유일한 수치**: DRAM↔CIS **약 80%** — §3 참조.

---

## §3. 실제 라인 전환 사례

### 3-1. DRAM → CIS (이미지센서) — **공용률 수치가 남아 있는 유일한 사례**

- 대상: 삼성전자 **화성 11라인(S4)·13라인** (300mm DRAM)
- 시점: 2018년 보도(11라인/S4) → 2020년 보도(13라인) → 2021년 전환 (ETNews→Image Sensors World 2018-03-15; 하드웨어존/안드로이드헤드라인 2020-05~06; 비즈니스코리아 2020-12-10)
- **공용률**: "**DRAM과 이미지센서 제조 공정의 거의 80%가 동일**하다. **리소그래피·CVD·식각** 공정과 **DRAM 라인의 테스트 장비**도 이미지센서 생산에 사용 가능하다." (ETNews 인용 보도)
- **캐파 손실**: 13라인은 DRAM 기준 **월 10만 장** 규모. "**이미지센서는 DRAM보다 공정 스텝이 많아 전환 후 생산능력이 약 50% 감소**" → 전환 후 약 5만 장/월 (ETNews 인용, 2018-03)
- 합산 목표: 11·13라인 전환분 7만 장/월 + 기존 4.5만 장/월 = **약 12만 장/월** (Sony 기준 13.7만 장/월과 근접)
- **비용**: "**최소 1조 원(약 8.2억 달러)**. 이는 **신규 이미지센서 라인을 처음부터 짓는 것보다 훨씬 적다**" (ETNews 인용 보도, 2020)
- ※ 원문 ETNews 기사는 직접 확인 실패(유료/링크 소실). 위 인용은 3개 이상의 2차 매체에서 교차 확인된 문구다.

**이 사례의 전략적 함의**: 80% 동일 공정에서도 **스텝 수 증가로 캐파가 절반 난다**. 즉 "장비 공용 = 캐파 보존"이 아니다. 공용성은 **자본 지출을 아끼는 것이지 산출량을 지키는 것이 아니다**. 전환 논거를 세울 때 이 구분을 흐리면 안 된다.

### 3-2. NAND → DRAM (2025~2026, 현재 진행형)

| 사례 | 내용 | 출처·시점 |
|---|---|---|
| 삼성 화성 12라인 | **2D NAND 생산 종료 → 1c DRAM '엔드팹'(메탈 배선 등 전공정 후반부)으로 전환**. 이르면 **2026년 3월** 가동 중단 후 전환. 규모 12인치 웨이퍼 기준 **월 8만~10만 장** | 디일렉(THE ELEC) 2026-02 / DIGITIMES 2026-02-26 |
| 삼성 평택·화성 NAND 라인 일부 | AI 서버·데이터센터용 범용 DRAM 수요 대응 위해 NAND 라인 일부를 DRAM으로 전환 추진 | 다음/디지타임스 2025-11-20·24, TechPowerUp 2025-11 |
| 삼성 화성 (2026-07) | **구형 NAND 웨이퍼 팹의 가동 중단 및 장비 이관 완료**, DRAM 생산 확대 (세부 수치는 유료 구간) | DIGITIMES 2026-07-30 |
| SK하이닉스 | 2H26 DRAM 캐파 2배 확대, **NAND는 축소(pull back)** | TrendForce 2025-10-02 |

- **주목**: 화성 12라인 전환은 라인 전체가 아니라 **'엔드팹(후반부 공정)'만 DRAM으로 전환**한다. 이는 전환의 실제 단위가 팹이 아니라 **공정 구간(모듈)** 임을 시사한다. 「전환할 수 있는 몸」의 설계 단위 논의에 직접 쓰이는 사실이다.

### 3-3. 파운드리(로직) → DRAM

- 삼성 **평택 P4**: 당초 파운드리 장비용으로 계획된 구역을 **DRAM 전환 대상으로 검토·전환**. P4 월 캐파 추정 **8만 장**. 삼성은 라인 전환 + 추가 장비 반입으로 **2026년 말까지 1c DRAM 20만 장/월 이상** 확보 목표 (DIGITIMES 2025-11-11; TrendForce 2025-11-19)
- 순서 확보: 2025 Q4 +6만 장 → 2026 Q2 +8만 장 → 2026 Q4 +6만 장 (TrendForce 2025-11-19)
- 반대 방향(메모리→로직)의 근대 사례: **공개 자료 미확인**. 역사적 사례는 Intel(§3-6).

### 3-4. 패키징 라인 전환 — SK하이닉스 M10F

- **DRAM 패키징 라인 → HBM 패키징 라인** 전환 완료 (이천 M10F). HBM 캐파 **월 12만 → 13만 개**, 그중 신규 전환된 M10F가 약 **1만 개** 담당 (TweakTown, 2024)
- 팹이 아니라 **후공정에서 먼저 전환이 일어난다**는 실증. §4의 "병목은 팹이 아니다"와 정합.

### 3-5. 동일 제품군 내 전환 — 가장 빈번하고 가장 싸다

- **NAND 세대 전환**: SK하이닉스 M15(청주) — 176/238/321단 생산 중인 기존 라인을 **375단 양산용으로 전환 투자** (2026) (The Elec)
- **DRAM 노드 전환**: SK하이닉스 M14·M16의 1c 전환 가속, 연말까지 1c 17만~20만 장/월 (한국 증권가 집계)
- **DRAM 제품 믹스 전환(동일 노드 내)**: 삼성이 **1a DRAM 캐파의 30~40%를 HBM3E용에서 1b/범용 DRAM용으로 전환** 검토, 연말까지 **약 8만 장/월** 추가. 사유 — 범용 DRAM(DDR5·LPDDR5X·GDDR7) 영업이익률 60%+ vs HBM3E 약 30% (딜사이트 2025-12-02)
- **한국 증권가 판정**: "**올해 메모리 시장에서 신규 투자보다 전환 투자 비중이 커진다**" (한국신용신문). → **전환은 예외가 아니라 메모리 CAPEX의 주된 형태다.**

### 3-6. 역사적 사례 — Intel의 메모리 철수 (1985)

- 1985년 DRAM 철수 결정. 그러나 **결정 시점에 이미 8개 실리콘 팹 중 1개만 메모리를 생산**하고 있었다 — 중간관리자들이 1984년 중반 이미 **로직에 유리한 신공정 기술을 채택**해 사실상 전환이 선행되어 있었다 (Stanford GSB Case / Commoncog)
- 철수 실행 완료까지 **1986년 중반**, 흑자 회복까지 **다시 1년** 소요 (Intel timeline)
- 함의: **전환은 경영 결정이 내려지기 전에 설비·공정 선택 단계에서 이미 결정되어 있었다.** 「전환 가능성은 팹 설계 시점에 결정된다」는 명제의 역사적 선례.

### 3-7. 인접 산업 — 디스플레이 LCD → OLED 라인 전환 (공용성의 조건을 보여주는 사례)

- 삼성디스플레이: 아산 **기존 LCD 라인 → 8.6세대 IT AMOLED 전환**, 총 **$3.1B**, 2023-03 착수 (OLED-Info)
- 삼성디스플레이(6세대): LCD 팹 → 6세대 플렉시블 OLED 전환, **$2.7B** (OLED-Info)
- LG디스플레이: P10 기존 건물 + **기존 백플레인 증착 장비 재사용**으로 8.6세대 라인 비용 절감 (OLED-Info)
- **그러나 결정적 단서**: "유리 기판이 약 10cm 커지면 생산 효율이 약 9% 올라가지만, **삼성이 쓰려던 기존 8.5세대 LCD 장비는 더 이상 사용할 수 없게 된다**" (OLED-Info)
- **함의: 공용성은 규격(기판/웨이퍼 포맷)이 유지되는 한에서만 성립한다.** 공용성을 자산으로 만들려면 성능 목표보다 **규격 안정성**을 먼저 규범화해야 한다. → ③ "낮은 레벨 설비 설계"의 표준화 논거.

---

## §4. 전환의 진짜 병목 — 장비가 아니라 퀄과 수율

### 4-1. 팹 내 전환은 생각보다 빠르다

- **메모리 타입 간 전환(DDR5 → GDDR7)**: 웨이퍼 투입부터 패키지 출하까지 **약 5개월**, **팹 다운타임은 사실상 없음** — "스캐너 레티클 교체를 다운타임으로 치지 않는 한 다운타임은 없다. 같은 팹 공정을 쓰고 설계 변경과 새 마스크 세트만 필요하다" (SemiWiki 포럼, "How fungible are memory maker fabs…", 모더레이터 진술 — **전문가 코멘트이지 공식 자료 아님**)
- 사용자 제공 사내 수치 **"제품 믹스 전환 리드타임 약 6개월"** 과 위 5개월은 서로 정합적이다. (외부 공식 근거는 미확인 — §8)

### 4-2. 진짜 병목 ① — 고객 퀄리피케이션

- **삼성 HBM3E 12단 NVIDIA 퀄: 개발 완료 후 승인까지 약 18개월**, 수차례 실패(전력 성능 이슈 포함) 후 **2025년 9월 말** 통과 — SK하이닉스·마이크론에 이어 3번째 (Investing.com; KED Global 2025-09-19; TrendForce 2025-06-12)
- HBM 인증 절차: 메모리 벤더 + GPU/가속기 OEM 양쪽이 참여, **다단계 검증**, first silicon → 양산 승인까지 **수개월** (Silicon Analysts)
- 서버 DRAM: **CPU 플랫폼 지원 → 모듈 벤더 검증 → 서버 OEM 시스템 퀄** 의 순차 다단계. "공급사가 HBM 캐파를 50% 더 갖고도 **HBM4 퀄 일정이 1~2분기 밀리면 고객 레벨에서는 여전히 공급 제약**" (Silicon Analysts)
- **"메모리 퀄은 수개월이 걸리며, 현 공급 환경에서 중대한 제약"** (SHI Insights, 2026)

### 4-3. 진짜 병목 ② — 수율 램프

- 신규 노드: 초기 개발 수율 → 성숙 수율까지 **12~24개월** (TestFlow, 일반론)
- 선단 노드는 "분기 단위로 수율이 개선되지만 최종 정상상태 산출량에는 못 미침" (Siemens/Calibre)
- 그린필드 팹: 착공~상업 양산 **36~60개월**. 수율 램프 구간만 **43~60개월차** (SupplyICs, 2026)
- **HBM4 수율 실측 보도**: 삼성 **양산 개시 시 60% → 연내 80% 목표 조기 달성** 보도 (wccftech). 업계 추정 **60~70%** (SGNL Intelligence, 2026-03)
- **스택 수율의 복리 손실**: 층당 스택 수율 99%면 8단 92%, **12단 87%** (SGNL Intelligence)
- KGD 탈락 다이의 전용 불가: "HBM 다이는 TSV 홀·I/O 레이아웃이 물리적으로 달라 표준 DRAM으로 되돌리는 것이 비현실적. **본딩된 HBM 스택은 분해할 수 없어 다이 하나가 불량이면 패키지 전체가 스크랩**" (SGNL Intelligence)

### 4-4. 병목의 위치 — 팹이 아니다

> "한계 요인은 팹이 아니었다." HBM의 실제 제약은 **프로브 웨이퍼 테스트, 슬라이싱·패키징, 패키지 테스트·번인·써멀 소트**에 있으며, 각 단계마다 전용 장비·테스트 프로그램·자원 제약이 따로 있다. 소재 측면에서는 **TC-NCF**(총 생산원가의 약 0.1%에 불과한 소재)가 병목이 된 적도 있다.
> — SemiWiki 포럼 (전문가 코멘트)

**전략적 함의**: 「전환할 수 있는 몸」의 설계 범위를 **팹(전공정)에만 두면 병목을 못 푼다.** 전환 가능성 규범은 **후공정·테스트 프로그램·퀄 패키지**까지 포함해야 한다.

---

## §5. 제품 간 기술 연장성 — 무엇이 어디서 어디로 건너가는가

### 5-1. 흐름 요약

```
[NAND에서 검증]                     →  [DRAM/HBM으로 이전]
W2W 하이브리드 본딩 (Xtacking/CBA)   →  3D DRAM, zHBM, BV-NAND
HAR 유전체 식각                      →  3D DRAM 커패시터/채널
Mo(몰리브덴) 워드라인 필              →  DRAM 저저항 배선
컨포멀 ALD 갭필                      →  3D DRAM 측면/수직 필

[로직에서]                          →  [메모리로]
파운드리 선단 로직 공정               →  HBM4 베이스다이 (4nm/12nm/3nm)
CMOS 페리 분리                       →  CBA/CuA/PUC 구조 전반
```

### 5-2. (a) W2W 하이브리드 본딩 — NAND → DRAM/HBM

| 단계 | 주체·제품 | 내용 |
|---|---|---|
| 최초 도입 | **YMTC Xtacking** | 2세대 64단부터 하이브리드 본딩 채택 → Xtacking2(128단)·3(232단)·4(160/267단). "페리 회로와 메모리 셀 동작을 별도 웨이퍼에서 처리 → **어레이 효율과 비트 밀도가 기존 3D NAND 대비 상당히 높음**" (TechInsights; Knowmade) |
| 양산 확산 | **Kioxia CBA (BiCS8, 218단)** | CMOS와 셀 어레이를 **각각 별도 Si 웨이퍼에** 형성, 표면에 Cu 본딩 패드 형성 후 **Cu 다이렉트 본딩**. "**CMOS 로직과 NAND 셀 어레이를 각각 최적 기술로 제조 가능 — 타협이 필요 없다**" (KIOXIA 공식) |
| 현재 | **Kioxia·YMTC 양산, Sandisk/WD 합류** | 200단+ 설계 전반에 W2W 본딩 적용 (DIGITIMES 2025-07-14; Yole) |
| DRAM으로 건너감 | **삼성 V10 BV-NAND (FMS 2026)** | 400+ 액티브 레이어. **메모리 어레이와 페리 로직을 분리 후 웨이퍼 본딩**. V9 대비 저장 밀도 **약 +58%** (Samsung Global Newsroom, FMS 2026; Techzine; guru3d) |
| 최종 목적지 | **삼성 zHBM (FMS 2026)** | **HBM을 AI 가속기 위에 수직 적층**. 주장 성능: HBM5 대비 **약 8배 성능, 10배 이상 밀도, 3배 전력효율, 열저항 절반 미만**. 마이크로범프 없는 Cu-Cu 직접 접합 (Samsung; Tom's Hardware; Futurum) |
| SK하이닉스 | 16단 HBM4 2026 양산, 그 이상 적층에 **하이브리드 본딩** 사용 계획. HBM4E에 전략 옵션으로 검토 | (검색 결과 요약) |
| 설비 준비 | **삼성 평택**에 **D2W 하이브리드 본더 약 50대** 규모 양산 라인 구축. 장비 반입·설치 **2026년 말 시작**, **대규모 양산은 2030년경** 내부 전망 | TrendForce 2026-07-22 |

**핵심**: 「NAND가 먼저 검증하고 DRAM이 받는다」는 흐름이 **이미 실증된 단 하나의 기술 축**이 W2W 하이브리드 본딩이다. ① 세대 연장성 논거의 가장 강한 실물 근거.

### 5-3. (b) HAR 식각 — NAND → 3D DRAM

Lam Research 공식 블로그 "Learning From NAND: What the 3D Transition Teaches Us About DRAM's Next Decade" 인용:

- "**NAND 워드라인용 몰리브덴 필**(배리어리스 증착, 극한 종횡비에서 보이드 프리)에 축적된 공정 이해가 **DRAM으로 적응되고 있다**"
- "NAND 갭필에서 입증된 **Striker의 컨포멀 ALD**가 3D DRAM의 측면·수직 필 과제로 **확장되고 있다**"
- "Akara의 식각 정밀도는 이미 선단 플래너 DRAM에서 옹스트롬 레벨 제어를 가능케 하며, **동일 플랫폼이 3D DRAM에 필요한 초고종횡비 식각용으로 개발 중**"
- "Aether 드라이 레지스트는 현행 DRAM 패터닝에서 20nm 이하를 해상 — **미래 수직 아키텍처의 더 좁은 형상에 직접 매핑되는 역량**"
- **정량 전망**: "산업이 3D로 이동하면서 **웨이퍼당 SAM(서비스 가능 시장)이 약 1.7배 확대**될 것으로 전망" — 즉 3D 전환은 웨이퍼당 증착·식각 장비 집약도를 1.7배로 올린다.
- Lam Vantex (2021-01): "3D NAND**와 DRAM** 로드맵을 동시에 진전시키는 HAR 유전체 식각" — **처음부터 양 제품 공용 플랫폼으로 출시**

보완:
- 3D DRAM 구조: "실리콘 기판에 **50:1~100:1 트렌치**를 식각하는 딥트렌치 커패시터 아키텍처, PECVD 라이닝 — 필름 컨포멀리티가 결정적. **HAR 식각 + ALD 필 + CMOS 웨이퍼를 어레이 배면에 본딩하는 구리 도금**을 요구" (ACM Research)
- **3D DRAM HVM 시점: 2030년경 전망** (ACM Research / 업계 컨센서스)
- AMAT (2026-06-15): Centris Spectral SiN ALD + Producer Selectra Mo Etch — "**DRAM과 로직 양쪽의 지속적 스케일링을 가능하게 함**", "Selectra 포트폴리오를 **NAND·DRAM·파운드리로직 전반의 신규 기회**로 확장"

### 5-4. (c) HBM 베이스다이 = 로직 공정의 메모리 유입

| 업체 | HBM4 베이스다이 | HBM4E 계획 | 특징 |
|---|---|---|---|
| **삼성** | **자사 파운드리 4nm** | 자사 4nm 검토 | **메모리사업부가 코어 다이, 파운드리가 베이스 다이 → 3D 패키징까지 일괄(턴키)**. "실리콘부터 최종 패키징까지 전체 스택을 통제하는 유일한 HBM4 공급사" (TweakTown; KED Global; SemiWiki) |
| **SK하이닉스** | **TSMC 12nm** | **TSMC 3nm 검토** | 성숙 공정으로 초기 양산 리스크 최소화 전략. 대역폭 2배, 효율 40%+ 개선 (TrendForce 2026-03-20; BigGo) |

- **전략적 함의**: HBM4 이후 **메모리 제품의 일부가 로직 팹에서 만들어진다**. 「종합반도체는 양산 체제가 종합반도체여야 한다」는 명제가 **이미 제품 구조로 현실화**된 지점이며, 삼성은 여기서 구조적 우위(내재화)를 갖는다. ② 제품 간 동일성 논거의 가장 강한 현재형 근거.
- 커스텀 HBM4E 설계 완료 목표: 3사 모두 **2026년 5~6월**, "특별히 앞서거나 뒤진 회사 없음" (TrendForce 2026-01-23)

### 5-5. (d) CMOS under Array (CuA / PUC / CBA) — 정량 효과

**Micron CuA (32단 → 64단, TechInsights 실측)**:

| 지표 | 32단 | 64단 | 변화 |
|---|---|---|---|
| 메모리 어레이 효율 | 84.9% | **89.8%** | +4.9%p |
| 다이 크기 | 168.2 mm² | **58.18 mm²** | 약 1/4 |
| 밀도 | 2.28 Gb/mm² | **4.40 Gb/mm²** | **약 +90%** |

- "CuA는 **칩의 로직 위에 다층 스택을 쌓아** 더 좁은 공간에 더 많은 메모리를 담고 **다이 크기를 실질적으로 축소**, 웨이퍼당 GB를 늘린다" (Micron)
- "CNA(CMOS Near Array) 대비 **CUA 구조는 최소 셀 풋프린트와 다이 크기 달성 가능**" (ScienceDirect)
- 232단도 CuA 기반 (Micron)

**CBA(본딩형)가 CuA(모놀리식)보다 나아간 지점**: CuA는 어레이를 로직 위에 쌓되 **같은 웨이퍼**이므로 로직이 셀 어레이의 열예산을 견뎌야 한다. CBA는 **별도 웨이퍼**라 그 제약이 사라진다 (KIOXIA: "각각 최적 기술 사용, 타협 불필요"). → §1-3에서 지적한 DRAM 페리의 열예산 제약을 푸는 경로가 곧 CBA다.

---

## §6. HBM ↔ 범용 DRAM 캐파 트레이드 비율

### 6-1. 공식·준공식 수치

| 배수 | 정의 | 출처 |
|---|---|---|
| **최소 2배** | "HBM은 일반 DRAM 제품과 **같은 생산량을 확보하는 데 최소 2배의 캐파**가 필요" | **SK hynix 뉴스룸 (공식)** |
| **4배 (GB당)** | "**1GB의 HBM은 표준 DRAM의 4배 캐파를 소모**". GDDR7은 1.7배 | TrendForce 2025-12-26 (Commercial Times 인용) |
| **약 3배 (GB당)** | "HBM은 GB당 DDR5의 **약 3배 웨이퍼 캐파**를 소모" | Tom's Hardware, 2026 |
| **2~4배 (실리콘)** | "HBM은 큰 다이와 스택 수율 손실 때문에 **LPDDR 대비 2~4배 실리콘**을 요구" | SemiWiki 포럼 (전문가 코멘트) |

→ **공개 추정의 수렴 구간은 GB당 2~4배**이고, 가장 널리 인용되는 값은 **3배**다. 보고서에는 "**3~4배(공개 추정 구간 2~4배)**"로 쓰는 것이 안전하다.

### 6-2. 시장 충격 규모

- **AI(HBM+GDDR7 등가 웨이퍼 환산)가 2026년 글로벌 DRAM 공급의 약 20% 잠식** (TrendForce 2025-12-26)
- **연간 DRAM 캐파 성장은 10~15%에 불과** → HBM 급증은 PC·스마트폰·서버 DDR5 공급을 직접 압박 (동)
- 역방향 실증(§3-5): 삼성이 **HBM3E용 1a 캐파의 30~40%를 범용 DRAM으로 되돌리는 것을 검토** — 범용 영업이익률 60%+ vs HBM3E 약 30%. **트레이드는 양방향으로 발생하며, 실제로 발생했다** (딜사이트 2025-12-02)

### 6-3. [저신뢰] 참고 수치 — 출처 신뢰도 낮음, 인용 시 주의

Utmel "2026 DRAM and the 3-to-1 HBM Rule" (2차 집계 사이트, 원출처를 "Micron·OpenMetal 2026-02 벤치마크 리포트"로 언급하나 직접 인용 없음):
- "3-to-1 웨이퍼 트레이드 비율": HBM3e에 300mm 웨이퍼 1장을 배정하면 **표준 DDR5 다이 3개분의 웨이퍼 면적**이 사라짐
- HBM 다이는 TSV 어레이·마이크로범프 때문에 표준 DDR5 대비 **50~60% 큰 면적**
- 다이 수율 90%일 때 12단 스택 순 완성 효율 **28% 미만** → 동일 산출 확보에 최대 **400% 추가 웨이퍼 투입**
- TSV 형성이 플래너 DRAM 대비 클린룸 처리 시간을 **40% 이상 연장**

→ 마지막 두 항목(28%, 40%)은 다른 출처로 교차 확인되지 않았다. **보고서 본문 인용 비권장**.

---

## §7. 벤치마크 — 전환 유연성을 자산으로 만든 타 산업

### 7-1. 자동차 플랫폼 공용화 (가장 정량이 풍부)

| 사례 | 공용화 수준 | 원가·투자 효과 | 출처 |
|---|---|---|---|
| **VW MQB** | 부품 **최대 60% 공유** | VW 임원진 2009년부터 **원가 20% 절감** 주장 | WapCar; WardsAuto |
| **VW MQB (반론)** | — | Bernstein 애널리스트 Max Warburton: **"과대포장(overhyped)"** — VW는 이미 고효율이며 추가 이득은 주장한 20%가 아니라 소폭 | WardsAuto |
| **Toyota TNGA** | 부품 공용률 **초기 20~30% → 최종 70~80% 목표** | **신모델 개발비 20~30% 절감** 주장. **신모델 생산라인 준비 투자 2008년 대비 약 50% 절감** 목표, **초기 공장 투자 약 40% 절감**에 근접(2015 진행보고) | Toyota Global (공식); Green Car Congress; WardsAuto |
| **Toyota TNGA (메커니즘)** | — | "**부품·컴포넌트의 전략적 공유로 한 라인에 복수 플랫폼·파워트레인을 추가해 혼류 생산 가능** → 전체 생산라인 투자의 상당한 절감" | Toyota Global (공식) |
| **Renault-Nissan CMF** | 엔진베이·콕핏·전후 언더바디·전기전자 아키텍처 = 5대 '빅 모듈' 조합 | **모델당 진입비용 30~40% 절감**, **부품 구매비 20~30% 절감**. 1차 전개만 연 160만 대·14개 모델 | Nissan Global (공식, 2013-06-19) |
| **CMF의 개념 정의** | — | "**CMF는 플랫폼이 아니다. 여러 플랫폼을 아우를 수 있다.** 플랫폼은 수평 분할이고 CMF는 부문 횡단 개념" | Nissan Global (공식) |

**보고서에 쓸 수 있는 두 가지 교훈**:
1. **긍정**: 공용화의 최대 효과는 원가가 아니라 **"한 라인에 복수 제품을 혼류 생산할 수 있게 되는 것"** (Toyota 공식 표현). 이것이 정확히 「전환할 수 있는 몸」이 노리는 지점이다.
2. **경계**: MQB의 20% 주장에 대한 Bernstein의 반박은 **공용화 효과가 과대추정되기 쉽다**는 실제 사례다. 사내 제안 시 효과 수치를 방어 가능한 범위로 제한해야 한다.

### 7-2. 항공 — 단일 기종 함대 (Southwest)

- Southwest는 **보잉 737 단일 패밀리 800대** 운용 (2025-03 기준)
- 효과: 조종사·정비사·객실승무원 **단일 기종 훈련**, 정비 프로세스 단순화, **부품 재고 품목 수 축소**, "**어느 조종사든 어느 기체든 조종 가능 → 초유연 승무원 스케줄링, 기종 불일치로 인한 지연 소멸**"
- **연간 수억 달러 절감 추정** [2차 자료: rmstudygroup, eplaneai — 회사 공식 수치 아님]
- 함의: 공용화의 진짜 가치는 **원가가 아니라 자원 재배치 속도**다. 「호황엔 문제없지만 불황엔 상호 보완이 안 된다」는 문제의식과 정확히 대응.

### 7-3. 화학·정유 — 스윙 캐파 (개념적 근거만, 정량 미확인)

- "불확실한 시장에서 수요 변화에 산출을 맞추려면 **캐파 유연성이 필요**하며, 이는 미래 생산 시나리오의 **핵심 요건**" (Seifert et al., *Chem. Eng. Technol.*, 2014)
- "**볼륨 유연 플랜트**는 단위 공정의 **오버사이징(oversizing)과 넘버링업(numbering-up)** 으로 확보되며, **그 추가 비용은 불확실한 수요에 적응할 수 있는 옵션의 재무적 이익으로 상쇄되어야 한다**" (ScienceDirect, 2018)
- 정유: **원료·제품 유연성이 높을수록 제품 슬레이트를 빠르게 조정 → 설비 가동률 개선, 변동 국면에서 마진 포착** (Chemical Engineering)
- **정량 사례는 공개 자료 미확인** (구체 기업·수치 사례 못 찾음)
- **그러나 "오버사이징·넘버링업의 추가 비용 = 유연성 옵션의 가격"이라는 프레임은 그대로 차용 가능**하다. ③ "낮은 레벨 설비 설계"는 이 프레임에서 **유연성 옵션의 프리미엄을 지불하는 설계 결정**으로 정식화된다.

### 7-4. 디스플레이 — §3-7 참조 (LCD→OLED 라인 전환, 규격 안정성이 공용성의 전제)

---

## §8. 확인 실패 / 공개 자료 미확인 항목 (창작 금지 대상)

1. **DRAM↔NAND 장비군별 공용 가능 비율(%)** — **공개 추정치 없음.** 정성 진술("장비 밸런스가 너무 다르다", "전환을 고려할 제조사는 거의 없다")만 존재. 유일한 제품 간 정량치는 DRAM↔CIS 약 80%.
2. **라인 전환의 소요 개월수·비용의 공식 수치** — 삼성·SK하이닉스·마이크론·키옥시아 **전부 미공시**. 유일한 비용 근사는 삼성 DRAM→CIS **최소 1조 원**(ETNews 인용 2차 보도, 2020).
3. **SK하이닉스 M10의 DRAM→CIS 전환** — **확인 실패.** 검색으로 확인되는 것은 M10F의 **DRAM 패키징 → HBM 패키징** 전환이다. 과제 지시의 전제와 다르므로 그대로 쓰면 안 된다.
4. **마이크론·키옥시아의 제품 간 라인 전환 사례** — 확인 실패. 마이크론은 신규 팹(버지니아 확장, 대만 PSMC P5 인수 $1.8B)과 세대 전환 위주. 키옥시아는 세대 전환·가동률 조정 위주(요카이치 Fab7·기타카미 Fab2 가동률 약 50%).
5. **메모리 3사 설비 감가상각 5년 기준의 공시 근거** — 이번 검색으로 **미확인**. 사용자 제공 사내 수치로만 유지할 것.
6. **제품 믹스 전환 리드타임 6개월의 외부 공개 근거** — **미확인.** 인접 대리지표 2건만 확보: (a) DDR5→GDDR7 웨이퍼 투입~패키지 출하 약 5개월(SemiWiki 전문가 코멘트), (b) 삼성 1a→1b 전환분 약 8만 장/월을 수개월 내 확보(딜사이트).
7. **라인 전환 후 수율 회복 곡선의 정량 데이터** — 미확인. 신규 노드 12~24개월이라는 일반론만 존재하며, 이는 **전환이 아니라 신규 노드 램프**의 수치다. 혼용 금지.
8. **3D NAND vs DRAM의 공정 스텝 수 비교 수치** — 공신력 있는 비교치 미확인. 확인된 것은 "선단 로직 600~1,000 스텝"(일반론)과 "CIS는 DRAM보다 스텝이 많아 전환 시 캐파 50% 감소"뿐.
9. **이온주입 장비의 제품 간 공용성** — 명시적 진술 미확인.
10. **HBM 웨이퍼 투입의 전체 DRAM 웨이퍼 대비 비중(22~23% 등)** — 검색 요약에서 등장했으나 **원문 교차 확인 실패**. TrendForce 원문으로 확인된 것은 "AI가 2026년 글로벌 DRAM 공급의 약 20% 잠식"이다. 이 문장만 쓸 것.
11. **메모리→로직 방향의 근대 라인 전환 사례** — 미확인 (역방향인 파운드리→DRAM은 삼성 P4 사례 확인됨).
12. **화학·정유 설비 공용화로 사이클을 흡수한 정량 기업 사례** — 미확인. 개념적 프레임(오버사이징·넘버링업 = 유연성 옵션 비용)만 확보.

---

## §9. 본 자료가 전략 논지에 주는 3가지 판정

1. **① 세대 연장성은 실증되었다.** W2W 하이브리드 본딩이 NAND(YMTC Xtacking → Kioxia CBA → 삼성 BV-NAND)에서 검증되어 3D DRAM·zHBM으로 건너가는 중이고, NAND의 HAR 식각·Mo 필·컨포멀 ALD가 3D DRAM으로 적응되고 있음을 장비사(Lam)가 공식 문서로 명시한다. **"공통 기술 축"은 희망이 아니라 이미 진행 중인 사실이다.**

2. **② 제품 간 동일성은 아직 반대 방향으로 가고 있다.** The Memory Guy의 판정("장비 밸런스가 너무 달라 유휴 장비 발생 → 오늘날 팹 전환을 고려할 제조사는 거의 없다")이 현재 업계 상식이며, 3D NAND 전환이 DRAM과의 공통점을 **오히려 줄였다**. 다만 HBM4 베이스다이(로직 공정)와 CBA 구조가 역방향 압력을 만들고 있다. **이 반론을 먼저 인용하고 넘는 구조로 보고서를 짜야 설득력이 산다.**

3. **③ "낮은 레벨 설비 설계"의 경제적 정식화는 화학 산업 프레임이 가장 깔끔하다.** "볼륨 유연 플랜트의 오버사이징 추가 비용은 불확실 수요 적응 옵션의 재무 이익으로 상쇄되어야 한다"(Seifert 2014 계열). 그리고 디스플레이 사례(8.5세대 LCD 장비가 8.6세대 전환에서 무용지물)는 **공용성이 규격 안정성 위에서만 성립한다**는 것을 보여준다 — 설계 규범이 성능 목표보다 **포맷·사양 표준**을 먼저 고정해야 하는 이유.

---

## 원본 링크

**§1 공정·장비 프로파일**
- The Memory Guy — 3D NAND's Impact on the Equipment Market: https://thememoryguy.com/3d-nands-impact-on-the-equipment-market/
- Jason's Chips — DRAM vs. NAND | ROUND 1: The Supply Side: https://www.jasonschips.ai/p/dram-vs-nand-round-1-the-supply-side
- SemiEngineering — How To Make 3D NAND: https://semiengineering.com/how-to-make-3d-nand/
- chentfred — DRAM Scaling: DUV Multipatterning from 1z to 0b: https://chentfred.substack.com/p/dram-scaling-duv-multipatterning
- SemiAnalysis — EUV Requirements Halved? Applied Materials' Sculpta: https://newsletter.semianalysis.com/p/euv-requirements-halved-applied-materials
- imec — DRAM peripheral transistors technology platform: https://www.imec-int.com/en/articles/technology-platform-thermally-stable-dram-peripheral-transistors
- EDN — DRAM basics and its quest for thermal stability by optimizing peripheral transistors: https://www.edn.com/dram-basics-and-its-quest-for-thermal-stability-by-optimizing-peripheral-transistors/
- tscsw — Semiconductor Equipment Primer (툴 재사용률 50~70%, 로직 노드 간): https://tscsw.substack.com/p/semiconductor-equipment-primer-13

**§2~3 라인 전환 사례**
- Image Sensors World (ETNews 인용, 2018-03-15) — Samsung CIS Production Capacity to Beat Sony: http://image-sensors-world.blogspot.com/2018/03/samsung-cis-production-capacity-to-beat.html
- Businesskorea (2020-12-10) — Samsung to Produce Image Sensors by Converting DRAM Line: https://www.businesskorea.co.kr/news/articleView.html?idxno=56553
- AndroidHeadlines (2020-05, ETNews 인용 — "80% 동일") — Samsung Is Expanding Its Camera Sensor Production Line: https://www.androidheadlines.com/2020/05/samsung-expanding-camera-sensor-production.html
- HardwareZone (2020-06-04, BusinessKorea 인용 — 1조 원): https://www.hardwarezone.com.sg/tech-news-samsung-reportedly-converting-part-its-dram-production-line-make-image-sensors
- 디일렉 THE ELEC — 삼성, 2D 낸드 시대 마감…화성 12라인 1c D램 엔드팹 전환: https://www.thelec.kr/news/articleView.html?idxno=52724
- DIGITIMES (2026-02-26) — Samsung exits 2D NAND, converts Hwaseong Line 12 to 1c DRAM end fab: https://www.digitimes.com/news/a20260226PD226/samsung-dram-nand-planar-3d-production.html
- DIGITIMES (2026-07-30) — Samsung boosts Hwaseong DRAM capacity as it converts older NAND lines: https://www.digitimes.com/news/a20260730PD202/samsung-dram-capacity-fab-nand.html
- DIGITIMES (2025-11-24) — Samsung reportedly converts NAND lines to DRAM: https://www.digitimes.com/news/a20251124PD215/samsung-nand-dram-demand-production.html
- DIGITIMES (2025-11-11) — Samsung Pyeongtaek P4 shifts to 1c DRAM production: https://www.digitimes.com/news/a20251111PD232/samsung-dram-production-investment-nvidia.html
- TrendForce (2025-11-19) — Samsung Plans 200K 1c DRAM Wafers/Month by 2026: https://www.trendforce.com/news/2025/11/19/news-samsung-reportedly-plans-200k-1c-dram-wafersmonth-by-2026-about-one-third-of-its-total-output/
- TrendForce (2025-10-02) — SK hynix to Double DRAM Capacity in 2H26, Pulls Back on NAND: https://www.trendforce.com/news/2025/10/02/news-sk-hynix-reportedly-to-double-dram-capacity-in-2h26-to-match-samsung-pulls-back-on-nand/
- TweakTown — SK hynix M10F fab re-purposing (DRAM 패키징 → HBM 패키징): https://www.tweaktown.com/news/104360/sk-hynix-hbm-expansion-m10f-fab-re-purposing-aims-for-up-to-170-000-units-per-month-in-2025/index.html
- The Elec — SK hynix to Mass Produce 375-Layer NAND (M15 세대 전환): https://www.thelec.net/news/articleView.html?idxno=11210
- 딜사이트 (2025-12-02) — 삼성전자, HBM3E 생산 감소…1a 30~40% 전환 검토: https://dealsite.co.kr/articles/152437
- 한국신용신문 — D램 전환투자, 신규 투자 추월 전망: https://www.creditnews.kr/news/articleView.html?idxno=2518
- 시사저널e — 낸드 고단수 전환투자 확대: https://www.sisajournal-e.com/news/articleView.html?idxno=421852
- Intel Timeline (1985) — Farewell to DRAM: https://timeline.intel.com/1985/farewell-to-dram
- Commoncog — Intel's Near Death Moment: Switching from Memories to Microprocessors: https://commoncog.com/c/cases/intel-transition-memories-processors/
- OLED-Info — Samsung Display to invest $3.1B to convert an LCD fab to 8.5-Gen AMOLED: https://www.oled-info.com/samsung-display-invest-31-billion-convert-lcd-fab-it-85-gen-amoled-line
- OLED-Info — Samsung Display to convert LCD fab to 6-Gen flexible OLED ($2.7B): https://www.oled-info.com/samsung-display-convert-lcd-fab-6-gen-flexible-oled-fab-27-billion-investment
- OLED-Info — LG Display 8.6-Gen IT AMOLED (기존 건물·장비 재사용): https://www.oled-info.com/lg-display-said-be-starting-order-equipment-its-86-gen-it-amoled-line

**§4 병목 (퀄·수율)**
- SemiWiki 포럼 — How "fungible" are memory maker fabs for switching between memory types: https://semiwiki.com/forum/threads/how-fungible-are-memory-maker-fabs-for-switching-between-memory-types.24185/
- KED Global (2025-09-19) — Samsung clears Nvidia hurdle for 12-layer HBM3E supply: https://www.kedglobal.com/korean-chipmakers/newsView/ked202509190008
- TrendForce (2025-06-12) — Samsung Stumbles Again on NVIDIA's 12-Hi HBM3E Validation: https://www.trendforce.com/news/2025/06/12/news-samsung-reportedly-stumbles-again-on-nvidias-12-hi-hbm3e-validation-retest-set-for-september/
- Silicon Analysts — The HBM Qualification Race: Who Actually Passed Whose Qual, 2022–2026: https://siliconanalysts.com/analysis/hbm-qualification-race-2022-2026
- Silicon Analysts — SK Hynix and Samsung: HBM4 Readiness, 1c DRAM Scaling: https://siliconanalysts.com/analysis/sk-hynix-samsung-2026-memory-capex-hbm4-qualification-race
- TestFlow — What is Yield in Semiconductor Fabs (수율 램프 12~24개월): https://testflowinc.com/blog/semiconductor-yield-explained
- SupplyICs (2026) — Semiconductor Fab Construction Economics and Timelines: https://supplyics.com/insights/supply-chain/semiconductor-fab-construction-economics-timeline-2026/
- SGNL Intelligence (2026-03-21) — The HBM4 Yield Game: https://sgnl.blog/2026-03-21-hbm4-yield-game/
- SemiEngineering — HBM Shifts Testing Left To Preserve AI Chip Yield: https://semiengineering.com/hbm-shifts-testing-left-to-preserve-ai-chip-yield/

**§5 기술 연장성**
- KIOXIA — What is CMOS directly Bonded to Array (CBA) Technology: https://www.kioxia.com/en-jp/rd/technology/cba.html
- DIGITIMES (2025-07-14) — Kioxia, YMTC jump ahead with wafer-bonded NAND in volume production: https://www.digitimes.com/news/a20250714PD212/kioxia-ymtc-nand-cmos-wafer.html
- TechInsights — Hybrid Bonding – Tomorrow's Interconnect: https://library.techinsights.com/hg-asset/10147ff7-c189-4040-871f-a113cae34dc0
- Knowmade — Why YMTC's Hybrid Bonding IP Is Unavoidable for Memory Chipmakers: https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/
- Samsung Global Newsroom (FMS 2026) — Samsung Unveils Next-Gen 3D-Memory Vision: https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure
- Tom's Hardware — Samsung debuts zHBM, zNAND-O, BV-NAND (all rely on wafer bonding): https://www.tomshardware.com/pc-components/dram/samsung-debuts-three-next-generation-memory-technologies-for-ai-data-centers-zhbm-znand-o-and-bv-nand-all-rely-on-advanced-wafer-bonding-technologies
- Techzine — Samsung unveils V10 BV-NAND with wafer bonding and 400 layers: https://www.techzine.eu/news/infrastructure/143432/samsung-unveils-v10-bv-nand-with-wafer-bonding-and-400-layers/
- TrendForce (2026-07-22) — Samsung Builds Hybrid Bonding Mass Production Line; Full-Scale Deployment 2029–2030: https://www.trendforce.com/news/2026/07/22/news-samsung-reportedly-builds-hybrid-bonding-mass-production-line-full-scale-deployment-seen-in-2029-2030/
- Lam Research Newsroom — Learning From NAND: What the 3D Transition Teaches Us About DRAM's Next Decade: https://newsroom.lamresearch.com/learning-from-nand-3d-dram-transition-ai-era?blog=true
- Lam Research (2021-01-27) — Vantex dielectric etch (3D NAND과 DRAM 로드맵 동시 지원): https://www.globenewswire.com/en/news-release/2021/01/27/2165339/0/en/Lam-Research-Advances-Next-Generation-3D-Memory-Manufacturing-with-Revolutionary-New-Etch-Technology.html
- Applied Materials (2026-06-15) — Deposition and Selective Etch Systems to Advance 3D Chip Scaling: https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-unveils-deposition-and-selective-etch-systems
- ACM Research — PECVD: Enabling Next-Gen Memory Devices (3D DRAM 딥트렌치 50:1~100:1, HVM 2030): https://www.acmr.com/pecvd-3d-nand-dram-deposition/
- TechInsights — Intel/Micron 64L 3D NAND Analysis (CuA 어레이 효율·다이 크기): https://www.techinsights.com/blog/intelmicron-64l-3d-nand-analysis
- Micron — First to market, second to none: the world's first 232-layer NAND (CuA): https://www.micron.com/about/blog/memory/nand/first-to-market-second-to-none-the-worlds-first-232-layer-nand
- ScienceDirect — PMOS junction optimization for 3D NAND FLASH memory with CMOS under array: https://www.sciencedirect.com/science/article/abs/pii/S0038110123000333
- TrendForce (2026-03-20) — SK hynix Weighs TSMC 3nm for HBM4E Logic Dies: https://www.trendforce.com/news/2026/03/20/news-sk-hynix-reportedly-weighs-tsmc-3nm-for-hbm4e-logic-dies-to-gain-edge-over-samsung/
- KED Global — Samsung to mass-produce HBM4 on 4nm foundry process: https://www.kedglobal.com/korean-chipmakers/newsView/ked202407150016
- TrendForce (2026-01-23) — Samsung's Custom HBM4E Design Aimed for Mid-2026: https://www.trendforce.com/news/2026/01/23/news-samsungs-custom-hbm4e-design-reportedly-aimed-for-mid-2026-parallels-sk-hynix-and-micron/

**§6 HBM 캐파 트레이드**
- SK hynix Newsroom — SK hynix to Produce DRAM From M15X in Cheongju ("HBM은 일반 DRAM 대비 최소 2배 캐파 필요"): https://news.skhynix.com/en/sk-hynix-to-produce-dram-from-m15x-in-cheongju/
- TrendForce (2025-12-26) — AI to Consume 20% of Global DRAM Wafer Capacity in 2026 (HBM 4x, GDDR7 1.7x, 캐파 성장 10~15%): https://www.trendforce.com/news/2025/12/26/news-ai-reportedly-to-consume-20-of-global-dram-wafer-capacity-in-2026-hbm-gddr7-lead-demand/
- Tom's Hardware — HBM is Coming for Your PC's RAM (GB당 약 3배 웨이퍼): https://www.tomshardware.com/pc-components/ram/hbm-is-eating-your-ram
- [저신뢰] Utmel — 2026 DRAM and the 3-to-1 HBM Rule: https://www.utmel.com/blog/categories/memory%20chip/2026-dram-and-the-3-to-1-hbm-rule-market-supply-analysis-and-b2b-procurement-guide

**§7 타 산업 벤치마크**
- Toyota Global (공식) — Making Ever-better Cars: A Progress Report (TNGA 라인 투자 절감): https://global.toyota/en/detail/7225822
- Green Car Congress (2015-03-27) — Toyota progress report on TNGA: https://www.greencarcongress.com/2015/03/20150327-tnga.html
- WardsAuto — Toyota's TNGA Drives Savings, Diversity: https://www.wardsauto.com/toyota/toyota-s-tnga-drives-savings-diversity
- WardsAuto — Big Rewards, Hurdles Seen With Next-Gen Flexible Vehicle Architectures (MQB 20% 주장 및 Bernstein 반박): https://www.wardsauto.com/news/archive-wards-big-rewards-hurdles-seen-with-next-gen-flexible-vehicle-architectures/783920/
- Nissan Global (공식, 2013-06-19) — Common Module Family (CMF): https://global.nissannews.com/en/releases/common-module-family-cmf-a-new-approach-to-engineering-for-the-renault-nissan-alliance
- Renault-Nissan Alliance 보도자료 PDF — Common Module Family: https://alliance-renault-nissan.com/sites/default/files/Common-Module-Family.pdf
- WapCar — VW's MQB and Toyota's TNGA: Platform sharing has gone beyond just platform sharing: https://www.wapcar.my/news/VWs-MQB-and-Toyotas-TNGA-Platform-sharing-has-gone-beyond-just-platform-sharing-2179
- Wiley (Seifert et al., 2014) — Capacity Flexibility of Chemical Plants: https://onlinelibrary.wiley.com/doi/10.1002/ceat.201300635
- ScienceDirect — Framework to decide for a volume flexible chemical plant during early phases of plant design: https://www.sciencedirect.com/science/article/abs/pii/S0263876217305464
- Chemical Engineering — Refiners Pursue Flexibility Amid Economic Headwinds: https://www.chemengonline.com/refiners-pursue-flexibility-amid-economic-headwinds/
- [2차] RM Study Group — Strategic Simplification: Southwest Airlines' Single-Model Fleet: https://www.rmstudygroup.com/blog/strategic-simplification-southwest-airlines-single-model-fleet
- [2차] ePlaneAI — Fleet Commonality: Saving Millions with Unified Aircraft Strategy: https://www.eplaneai.com/blog/the-hidden-economics-of-fleet-commonality
