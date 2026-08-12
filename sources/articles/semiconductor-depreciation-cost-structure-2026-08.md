# 반도체 감가상각·원가 구조 — 공시 원문 + 웹 리서치 종합 (2026-08-12)

**수집일**: 2026-08-12
**유형**: 1차 공시 원문(10-K·20-F·사업보고서·감사보고서) 직접 파싱 + 웹 검색 기반 2차 자료 보완
**용도**: 액션러닝 과제 2차 저지선 전략 1번 「전환할 수 있는 몸」의 **정량 척추**. 특히 ③ "낮은 레벨 설비 설계로 감가를 받아준다"의 경제학적 근거와, 다운턴에 감가가 손익을 어떻게 파괴하는지의 실측 데이터
**표기 규칙**
- **[실측]** = 기업 공시 원문에서 직접 추출한 숫자 (파일 다운로드 후 텍스트 파싱)
- **[산출]** = 위 실측치로 필자가 나눗셈한 파생 비율 (계산식 병기)
- **[추정]** = 애널리스트·업계 추정치 (추정 주체·시점 명기)
- **[미확인]** = 공개 자료에서 찾지 못함 — 창작하지 않고 공란으로 남김

---

## §0. 한 장 요약 — 보고서에 바로 쓸 핵심 수치 6개

| # | 수치 | 값 | 근거 |
|---|---|---|---|
| 1 | 삼성전자 기계장치 내용연수 | **5년** (건물·구축물 15/30년) | [실측] 삼성 2025 연결감사보고서 주석 2.9 |
| 2 | 메모리 3사 유형자산 취득원가 중 **기계장치 비중** | 삼성 81.7% / SK하이닉스 88.1% / 마이크론 78.3% | [산출] 각사 공시 |
| 3 | 감가상각비가 **매출원가에서 차지하는 비중** | SK하이닉스 30.8%(2025) · 마이크론 45.2%(FY2023 다운턴) · TSMC 44.5%(2025) | [산출] 각사 공시 |
| 4 | 다운턴의 파괴력 | 마이크론 FY2023 **감가상각비 76.7억 달러 = 매출의 49.4%**, 매출원가율 109%, 매출총이익률 −9% | [실측·산출] Micron FY2025 10-K |
| 5 | 이미 감가된 자산의 크기 | 기계장치 감가상각누계액/취득원가 = 삼성 **77.1%** · TSMC **77.0%** · SK하이닉스 **71.4%** | [산출] 각사 공시 |
| 6 | 인텔의 5년→8년 연장 효과 | 2023년 감가상각비 **42억 달러 감소**, 매출총이익 **+25억 달러** | [실측] Intel FY2023 10-K |

> 보고서 논증에 직결되는 함의: **원가의 30~45%가 감가**이고, 그 감가의 **85~93%가 기계장치**에서 나온다. 즉 "설비를 어떤 레벨로 설계하느냐"가 곧 원가 구조 그 자체다. 그리고 이미 **취득원가의 70~77%가 상각 완료**되어 있으므로, "감가 끝난 설비를 무엇으로 돌릴 수 있는가"는 이론이 아니라 지금 당장의 자산 관리 문제다.

---

## §1. 감가상각 정책 비교 — 5사 내용연수와 감가상각비 규모

### 1-1. 내용연수(useful life) 정책 — 전부 [실측], 정액법(straight-line)

| 회사 | 기계장치/생산설비 | 건물·구축물 | 출처(공시서류·연도) |
|---|---|---|---|
| **삼성전자** | **5년** (단일값) | 건물 및 구축물 **15년, 30년** | 2025 연결감사보고서(제57기) 주석 2.9 |
| **SK하이닉스** | **5~15년** | 건물 10~50년, 구축물 10~20년 | 2025 사업보고서(2026-03-17 접수) 연결주석 2.11 |
| **마이크론** | 생산설비 **7년**, 기타 설비 최대 7년 | 건물 **10~30년** (SW 3~5년) | FY2025 10-K (2025-08-28 결산) |
| **인텔** | **3~8년** (2023년 1월 5년→8년 연장) | 건물 **10~25년** | FY2025 10-K (2025-12-27 결산) |
| **TSMC** | **5년** (사무장비도 5년) | 건물 10~20년 — 주공장 20년, 기전설비 10년, **클린룸 10년** / 토지개량 10~20년 | FY2025 Form 20-F |

**읽는 법**
- 사용자 제공 사내 수치 "**설비 감가상각 5년 기준**"은 삼성전자 공시상 기계장치 내용연수 5년과 **정확히 일치**한다. 보고서에서 사내 전제를 공시로 뒷받침할 수 있다.
- 삼성은 5사 중 **가장 짧고 가장 단순한(단일값) 상각 정책**이다. SK하이닉스(5~15년)·마이크론(7년)·인텔(3~8년)은 설비 종류·재사용 가능성에 따라 폭을 둔다. → 같은 CAPEX를 써도 삼성이 초기 연도 감가 부담이 가장 크고, 대신 **5년 뒤 "감가 완료 자산"이 가장 빨리 쌓인다**. 「전환할 수 있는 몸」 논지에서 이건 위협이자 기회다.
- TSMC는 **클린룸을 10년**으로 별도 분리해 상각한다. 건물 껍데기(20년)와 클린룸(10년)과 장비(5년)를 **3층으로 분리**하는 설계다 — "낮은 레벨 설비 설계" 논의에 참고할 회계상 선례.

### 1-2. 인텔의 5년 → 8년 연장 사건 (2023년 1월 발효) — [실측]

Intel FY2023 10-K 원문:
> "Effective January 2023, we increased the estimated useful life of certain production machinery and equipment from 5 to 8 years."

손익 효과 (2022년 말 기준 내용연수와 비교한 회사 추정):
- 2023년 **총 감가상각비 42억 달러 감소** ($4.2 billion)
- **매출총이익(gross margin) 약 +25억 달러**
- **R&D 비용 약 −4억 달러**
- **기말 재고자산 평가액 약 −13억 달러**
- 회사는 "IDM 2.0 전략에 따른 사업모델 변화 및 장비의 실증된 경제적 가치를 더 잘 반영"한다고 설명. 전진법(prospective) 적용.

**반전 — 연장했다가 다시 단축한 부분이 있다 (중요) [실측]**
Intel FY2025 10-K:
> "In 2025 and 2024, we evaluated our current process technology node capacities relative to projected market demand ... concluded that our manufacturing asset portfolio exceeded manufacturing capacity requirements, which resulted in us **shortening the useful lives of certain placed-in-service equipment and recording accelerated depreciation charges of $456 million and $992 million**, respectively."

즉 인텔은 2023년에 회계 내용연수를 늘려 손익을 방어했지만, **2024·2025년에는 수요 대비 설비가 남아 일부 설비의 내용연수를 오히려 단축하고 가속상각(2024년 9.92억, 2025년 4.56억 달러)을 인식**했다. → 보고서 시사점: **회계 연장은 현금을 만들지 않는다.** 설비가 전환 불가능하면 결국 손상·가속상각으로 되돌아온다. "구조로 풀어야지 회계로 못 푼다"는 논지의 실증 사례.

### 1-3. 각사 최근 연간 감가상각비 규모 — [실측]

| 회사 | 최근 회계연도 | 감가상각비 | 전년 | 전전년 |
|---|---|---|---|---|
| **삼성전자(연결)** | 2025 | **43조 6,057억 원** | 39조 6,500억 원(2024) | — |
| └ 그중 **DS부문** | 2025 | **37조 9,573억 원** (전사의 87.0%) | 34조 976억 원(2024) | — |
| **SK하이닉스(연결)** | 2025 | **12조 6,635억 원** (유형자산 감가만) | 11조 5,356억 원(2024) | — |
| └ 감가+무형상각 합계 | 2025 | **13조 8,896억 원** | 12조 5,448억 원(2024) | — |
| **마이크론** | FY2025 | **82.8억 달러** (D&A 합계 83.52억) | 77.0억(FY2024) | 76.7억(FY2023) |
| **인텔** | 2025 | **107.57억 달러** | 99.51억(2024) | 78.47억(2023) |
| **TSMC** | 2025 | **NT$6,796.8억 = US$216.7억** | NT$6,536.1억(2024) | NT$5,229.3억(2023) |

세부 출처: 삼성 2025 연결감사보고서 주석 21(비용의 성격별 분류)·주석 29(부문정보) / SK하이닉스 2025 사업보고서 연결주석 12(감가상각비의 기능별 배분)·26 / Micron FY2025 10-K Note 8 및 현금흐름표 / Intel FY2025 10-K 현금흐름표 / TSMC FY2025 20-F 현금흐름표.

**[산출] 감가상각비의 매출 대비 무게**
- 삼성 DS부문: 37조 9,573억 ÷ DS 매출 130조 1,282억 = **29.2%** (2024년은 34조 976억 ÷ 111조 660억 = 30.7%)
- SK하이닉스: 감가+무형상각 13조 8,896억 ÷ 매출 97조 1,467억 = **14.3%** (※2025년은 초호황이라 분모가 커서 비율이 낮게 보임 — 아래 §3에서 매출원가 기준으로 다시 봄)

---

## §2. 반도체 팹 CAPEX의 구성비 — 건물·인프라 vs 장비

### 2-1. 2차 자료의 통설 [추정]
- Exyte(글로벌 팹 건설 EPC 1위) CTO 인터뷰: "**팹 총 자본지출의 80% 이상이 장비에 배분된다**" → 건물·건설은 20% 이하.
- 같은 검색 결과의 다른 2차 자료: "플랜트 비용의 20~30%가 건물, 나머지가 제조장비" — 20~30% 대역.
- 참고: 건물 비용 내부에서는 **HVAC·배기·초순수(UPW) 등 유틸리티 인프라가 시설비의 2/3 가까이**를 차지한다는 언급이 있음 (동 자료). 즉 "건물"의 대부분은 껍데기가 아니라 **설비화된 인프라**다.
- 지역 프리미엄: 서구권 팹 건설비는 아시아 대비 **최소 +50%**, 총 팹 투자는 **약 +20%** 비쌈 (Exyte). 대만은 인허가·설계~인계까지 **19개월**이 벤치마크.

### 2-2. 실제 공시 대차대조표로 검증한 구성비 — [산출] (더 신뢰도 높음)

**(a) 스톡 기준 — 유형자산 취득원가 중 기계장치 비중 (토지·건설중인자산 제외, 건물류 vs 기계장치만 비교)**

| 회사 | 기계장치 취득원가 | 건물(+구축물) 취득원가 | 기계장치 비중 |
|---|---|---|---|
| 삼성전자 (2025말, 연결) | 404조 2,330억 원 | 90조 2,892억 원 | **81.7%** |
| SK하이닉스 (2025말, 연결) | 139조 2,327억 원 | 18조 8,672억 원(건물 13.5조+구축물 5.3조) | **88.1%** |
| 마이크론 (FY2025말) | 799.34억 달러 | 221.73억 달러 | **78.3%** |
| TSMC (2025말) | NT$6조 2,367억 | NT$1조 1,919억 | **84.0%** |
| 인텔 (2025말) | 1,119.40억 달러 | 653.95억 달러(토지 포함) | **63.1%** |

→ **메모리 3사·TSMC는 78~88%가 장비.** 인텔이 63%로 낮은 건 토지가 합산돼 있고 미국 신규 팹 부지·건물 비중이 큰 탓으로 보임(주의: 인텔은 "Land and buildings"를 합산 공시).

**(b) 플로우 기준 — 삼성전자 2025년 연간 유형자산 취득 및 자본적지출 53조 9,474억 원의 내역 [실측]**

| 구분 | 금액(억 원) | 비중 |
|---|---|---|
| 기계장치 | 387,739 | 71.9% |
| 건물 및 구축물 | 89,613 | 16.6% |
| 건설중인자산(순증) | 41,667 | 7.7% |
| 기타 | 17,387 | 3.2% |
| 토지 | 3,068 | 0.6% |
| **합계** | **539,474** | 100% |

→ 건설중인자산·토지·기타를 뺀 **"건물 vs 장비"만 놓고 보면 장비 81.2% : 건물 18.8%**. 2차 자료의 "80% 이상이 장비"와 정합.

**(c) 감가상각비의 자산별 구성 — 이게 보고서의 핵심 [실측·산출]**

| 회사 | 연도 | 기계장치 감가 | 건물류 감가 | 기계장치 비중 |
|---|---|---|---|---|
| 삼성전자(연결) | 2025 | 37조 2,511억 원 | 4조 6,228억 원 | **85.4%** |
| SK하이닉스(연결) | 2025 | 11조 7,186억 원 | 7,188억 원(건물 4,718+구축물 2,470) | **92.5%** |
| TSMC | 2025 | NT$5,900.6억 | NT$713.5억 | **87.4%** |

→ **취득원가에서 장비가 78~88%인데, 감가상각비에서는 85~93%로 더 커진다.** 장비 내용연수(5년)가 건물(15~30년)보다 훨씬 짧기 때문. 결론: **감가 부담은 사실상 전량 장비 문제**이며, 건물·인프라를 아무리 길게 잡아도 손익 방어가 안 된다. → "낮은 레벨 설비 설계"가 감가를 받아준다는 명제의 회계적 근거.

---

## §3. 감가상각이 메모리 원가에서 차지하는 비중 — 현금원가 vs 총원가

### 3-1. 매출원가 대비 감가상각비 비율 — [산출] (공시 원문 기반 실측치)

| 회사 | 연도 | 감가상각비 | 매출원가 | **감가/매출원가** |
|---|---|---|---|---|
| **SK하이닉스** | 2025 | 11조 8,395억 원(매출원가 배부분) | 38조 4,559억 원 | **30.8%** |
| SK하이닉스 | 2024 | 10조 6,962억 원 | 34조 3,648억 원 | **31.1%** |
| **마이크론** | FY2025 | 82.8억 달러 | 225.05억 달러 | **36.8%** |
| 마이크론 | FY2024 | 77.0억 달러 | 194.98억 달러 | **39.5%** |
| **마이크론(다운턴)** | **FY2023** | **76.7억 달러** | **169.56억 달러** | **45.2%** |
| TSMC(참고, 파운드리) | 2025 | NT$6,796.8억(전사 감가) | NT$1조 5,277.6억 | **44.5%** (상한 — 전사 감가에 영업비용 배부분 포함) |
| TSMC(참고) | 2023 | NT$5,229.3억 | NT$9,866.3억 | **53.0%** (상한) |

계산 근거(SK하이닉스): 매출원가 = (매출원가+판관비 합계 49조 9,404억) − 판관비 11조 4,845억 = 38조 4,559억. 감가상각비의 기능별 배분표에서 매출원가 배부액 11조 8,395억.

**결론: 메모리 매출원가의 대략 30~45%가 감가상각비.** 호황(2025)엔 30%대, 다운턴(마이크론 FY2023)엔 45%대로 올라간다 — 분모(생산량·원가총액)가 줄어도 감가는 그대로기 때문.

> ⚠️ 주의: "**DRAM/NAND 비트당 원가에서 감가가 몇 %**"라는 형태의 공식 수치는 **어느 회사도 공개하지 않는다**. 위 비율은 전사 매출원가 기준 대리지표(proxy)다. 비트당 원가 분해표는 [미확인].

### 3-2. 다운턴의 파괴력 — 마이크론 FY2023 실측 [실측·산출]

| 항목 | FY2023 | FY2024 | FY2025 |
|---|---|---|---|
| 매출 | 155.40억 달러 | 251.11억 | 373.78억 |
| 매출원가 | 169.56억 (**매출의 109%**) | 194.98억 (78%) | 225.05억 (60%) |
| 매출총이익률 | **−9%** | 22% | 40% |
| 영업손익 | **−57.45억 달러** | +13.04억 | +97.70억 |
| 감가상각비 | 76.7억 | 77.0억 | 82.8억 |
| **감가/매출** | **49.4%** | 30.7% | 22.2% |

→ **FY2023 마이크론은 매출의 절반을 감가상각비로 썼다.** 매출이 반토막 나도 감가는 그대로였고(76.7억 → 77.0억 → 82.8억으로 오히려 증가), 그것만으로 매출원가율이 109%가 됐다.

같은 다운턴의 한국 측 실측: **삼성전자 DS부문 2023년 영업손실 14조 8,800억 원**(매출 66조 5,900억, −32.3%), **SK하이닉스 2023년 영업손실 약 7조 7,000억 원** (언론 보도 기준 [추정]—원 공시 수치 재확인 권장).

### 3-3. 현금원가(cash cost) vs 총원가 — 산업 관행 [추정, 업계 공통 인식]

- SemiAnalysis(2025~2026, "Memory Mania"): "**the majority of the cost is already sunk, the fab is built and equipment purchased, suppliers are better off running wafers so long as they can sell bits above cash operating costs.**" — 즉 **가격이 총원가 밑이어도 현금원가 위면 계속 돌린다**가 업계 표준 행동.
- 같은 자료: 가동률은 사이클에 따라 **초호황 약 95% ~ 심한 다운사이클 50%**까지 흔들린다.
- Silicon Analysts(2026): "Once a fab is running at full utilization, the incremental cost of producing an additional bit is essentially the **variable cost of materials and utilities** — fixed depreciation is already sunk."
- Micron FY2025 10-K 리스크요인 [실측 인용]: "**A significant portion of our manufacturing costs are fixed and do not vary proportionally with changes in production output.** As a result, lower utilization, lower wafer output, and corresponding increases in our per gigabit manufacturing costs could result in higher inventory carrying costs..."
- Jim Handy(Objective Analysis, The Memory Guy, 2023-02): 다운사이클엔 "가격이 원가까지 떨어지고, 이후 하락하는 원가 곡선을 따라간다". 원가 곡선 하락률은 **DRAM 연 약 20%, NAND 연 약 30%**. 2022년 말~2023년 초 키옥시아·삼성·SK하이닉스는 재고평가손실을 인식 — 즉 **원가 이하 판매**를 회계로 인정.

> **"현금원가 이하로는 안 판다"**는 문장 자체를 그대로 담은 1차 공식 문서는 찾지 못했다 [미확인]. 다만 위 3개 2차 자료가 **동일한 경제 논리(감가는 매몰비용이므로 현금원가가 가격 하한)**를 명시하고 있어, 보고서에서는 "업계 표준 행동 규범"으로 인용 가능. 정확한 현금원가 절대값(예: DRAM $/Gb)은 [미확인].

---

## §4. 감가 완료 설비의 경제학 — 레거시 노드는 왜 돈을 버는가

### 4-1. 이미 상각된 자산의 크기 — [산출]

| 회사 | 기계장치 감가상각누계액 / 취득원가 | 건물류 상각률 |
|---|---|---|
| 삼성전자 (2025말) | 311조 8,098억 / 404조 2,330억 = **77.1%** | 43.5% |
| TSMC (2025말) | NT$4조 7,999억 / NT$6조 2,367억 = **77.0%** | 42.9% |
| SK하이닉스 (2025말) | 99조 3,434억 / 139조 2,327억 = **71.4%** | 23.7%(건물) |
| 마이크론 (FY2025말) | (전체 PP&E 기준) 631.06억 / 1,096.96억 = **57.5%** | — |

→ **삼성·TSMC는 장비 장부가의 3/4 이상을 이미 털었다.** 이 설비들은 회계상 감가 부담이 거의 없거나 곧 없어진다. 문제는 **이 설비로 무엇을 만들 수 있느냐**뿐이다.

### 4-2. TSMC 레거시 노드의 수익성 — [추정] (애널리스트 추산, 공식 미공개)

SemiWiki 커뮤니티 분석(2025~2026, 5년 상각 가정, 7nm를 감가 완료 경계선으로 봄):
- TSMC는 **감가상각비의 90% 이상을 매출원가(COGS)에 계상**한다고 가정.
- 2024년 기준: **3nm+5nm가 매출의 52%를 만들지만 영업이익 기여는 27%**. 반대로 **7nm 이상 구세대(약 50% 매출)가 이익의 약 73%**를 만든다.
- 해석: 선단 노드는 감가를 짊어지고, **감가 끝난 레거시가 이익을 만든다.** (※ 공식 수치가 아니라 외부 추산이며, R&D·SG&A 배부 가정에 민감하다고 원 저자도 명시)
- TSMC 공식 수치로 확인 가능한 것: 2025년 전사 매출총이익률 **59.9%**, 매출원가율 40.1% (2023년 각각 54.4% / 45.6%) — 감가 부담이 큰 신규 노드 비중이 커져도 마진이 오른 것은 가격 인상과 레거시 이익 기여가 함께 작동했음을 시사.

### 4-3. 감가 끝난 팹을 특수 제품으로 전환한 실제 사례 — [실측·보도]

| 사례 | 내용 | 시점 |
|---|---|---|
| **삼성 화성 11라인 → S4 (CIS 전용)** | 300mm DRAM 라인을 이미지센서 전용 라인으로 전환. 2018년 노후 라인 전환 계획 수립의 일부 | 2017 발표 ~ 2019 전환 |
| **삼성 화성 13라인 → CIS** | 2018년 하반기 이미지센서 용도로 전환. 이후 CIS 업황 부진으로 추가 전환 계획은 지연되었고, 최근엔 **패키징 라인 전용** 검토 보도 | 2018~ |
| **전환 근거의 정량 표현** | "**이미지센서는 D램과 공정이 80% 정도 유사**해 전환 배치가 수월한 품목" (파이낸셜뉴스 2021-10) | — |
| **SK하이닉스 청주 M8(200mm)** | 저화소 CIS 축소 → 시스템반도체 파운드리(SK하이닉스시스템아이씨)로 전환 → 이후 장비를 중국 우시로 순차 이관(~2021말), 유휴 공간은 **SK실트론에 임대**해 300mm 웨이퍼 생산(2022-07 월 2만장) | 2017~2022 |
| **마이크론 Lehi(유타) 300mm 팹 → TI** | 3D XPoint 팹을 **9억 달러(마이크론 총 경제가치 15억 달러)**에 TI가 인수, TI의 4번째 300mm 팹으로 **65nm/45nm 아날로그·임베디드** 생산 전환 | 2021-06 발표, 2021-10 완료 |
| **GlobalFoundries East Fishkill 300mm → onsemi** | 로직 파운드리 팹을 onsemi가 인수해 **전력·아날로그·이미지센서(40/65nm)** 생산으로 전용. 미국 내 onsemi 최대 생산시설 | 2022-12-31 소유권 이전 |
| **마이크론 Manassas(버지니아)** | 미국 유일 자사 소유 300mm 팹으로 **자동차·국방·항공·산업용 레거시 DRAM/NAND/NOR** 전담. 1α 노드를 DDR4/LP4 등 장수명 제품에 배치, 20억 달러+ 투자로 DDR4 웨이퍼 공급 4배 확대 | 2026-05 발표 |

> 보고서 활용 포인트: **"D램 라인 → CIS"는 공정 유사도 80%라서 가능했다.** 즉 전환 가능성은 우연이 아니라 **공정 공통성의 함수**다(논지 ②의 실증). 반대로 Lehi·East Fishkill 사례는 **전환 불가능한 팹의 처분 경로는 "매각"뿐**임을 보여준다 — 그것도 원가 이하로.

---

## §5. 가동률과 손익분기 — 고정비 비중

### 5-1. 확인된 것 [실측/1차]
- Micron FY2025 10-K: "제조원가의 **상당 부분이 고정비**이며 생산량에 비례해 변하지 않는다. 따라서 낮은 가동률·낮은 웨이퍼 산출은 기가비트당 제조원가를 끌어올린다."
- Micron FY2009 10-K(과거 다운턴): "**유휴 설비(underutilized capacity) 관련 비용 1.87억 달러**"를 메모리 매출총이익에서 인식.
- 마이크론 FY2023 실적 자체가 사실상의 손익분기 실측치: **매출원가율 109%** (§3-2).

### 5-2. 2차 자료의 가동률 추정 [추정 — 출처 신뢰도 중~하, 인용 시 주의]
- SemiAnalysis: 사이클별 가동률 **초호황 ~95% ↔ 심한 다운사이클 ~50%**.
- 2023년 다운턴 대응: "삼성 등 대형 메모리 업체가 **생산을 50% 감축**해 가격이 제조원가 아래로 내려가는 것을 막으려 했다"는 보도 [추정].
- 투자은행 교육자료 계열 2차 자료(ibinterviewquestions.com, basisreport.com — **1차 근거 없음, 신뢰도 낮음**): "가동률이 80% 밑으로 가면 마진 압박, 70% 이하면 매출총이익률이 8~15%p 붕괴", "가동률 90%→75%면 2분기 만에 GM 55%→45%".

> **"메모리 팹이 가동률 몇 % 아래면 적자"에 대한 신뢰할 만한 공개 추정치는 확인하지 못했다** [미확인]. 회사별 원가·믹스·감가 잔존액에 따라 달라 단일 수치가 존재하지 않는 것으로 보임. 보고서에서는 "손익분기 가동률"을 단정하지 말고, **마이크론 FY2023 실측(매출원가율 109%)** 과 **가동률 95%↔50% 진폭**으로 대체 표현할 것을 권함.

---

## §6. CXMT·YMTC의 원가 구조

### 6-1. CXMT (창신메모리) — DRAM
- **원가 페널티 [추정, Morningstar 애널리스트 Wei Jingjie, 2026-07]**: EUV 없이 **DUV 다중패터닝**을 쓰기 때문에 **동일 산출량을 만들려면 웨이퍼 투입이 약 30% 더 필요**. 결과적으로 삼성·SK하이닉스·마이크론 대비 **비트당 원가 30%+ 열위**.
- 다이 면적 페널티 [추정, 보도]: 동급 제품 대비 **다이 면적 40~50% 큼** → 웨이퍼당 다이 수 감소 → 원가 상승. 각 패터닝 패스마다 공정 스텝과 오버레이 오차가 늘어남.
- 우회 시도: **본디드 DRAM(bonded DRAM)** — 셀 어레이와 페리 회로를 별도 웨이퍼에 만들어 접합. EUV 없이 밀도를 올릴 수 있으나 **파일럿 단계, 양산까지 수년**.
- 규모: 2026년 말 **약 350K wspm(12인치)** 목표 — 마이크론 추정 375K에 근접. 글로벌 DRAM 점유율 약 **7.7~10%**, Nomura는 2028년 말 **약 18%** 전망 [추정].
- 자본: 2026-07 상하이 STAR마켓 상장, 조달 **86억 달러**, 상장 첫날 +466%.
- **그럼에도 성립하는 이유** [부분 확인]: ① 국가 보조·정책 조달, ② 초기 설비의 감가 조건(보조금이 자산 차감으로 반영되면 감가 부담 축소 — 단, CXMT의 회계 처리 구체 수치는 [미확인]), ③ EUV 접근 차단 하에서도 DDR4/LPDDR4 등 **저가·성숙 티어 집중**. 단 최근 보도는 "**CXMT DDR5 모듈 가격이 빅3 가격을 그대로 추종**해 저가 대안 역할을 못 하고 있다"고 지적 [추정].
- **[미확인]**: CXMT의 웨이퍼당 공정 스텝 수, 수율(%) 절대값, 정부 보조금 누적액, 감가상각 정책·내용연수.

### 6-2. YMTC (창장메모리) — NAND
- **가격 포지션 [추정]**: TechInsights — 일·한·미 경쟁사 대비 **10~20% 가격 우위**. 대만 계열 조사(Taiwan Industry Economics Services) — 동일 스펙 기준 **15% 이상** 저가.
- **기술**: Xtacking(하이브리드 본딩)으로 셀 어레이 웨이퍼와 CMOS 페리 웨이퍼를 분리 제조 후 접합. Xtacking 4.0(232단)은 글로벌 200단대 제품과 **밀도·수율 모두 경쟁 가능** 수준이라는 평가.
- **보조금 [추정]**: 누적 **240억 달러 이상**의 정부 보조 (검색 결과 인용, 원 출처 확인 필요).
- **점유율·규모**: 2025년 1분기 글로벌 NAND 출하 점유율 10% 돌파 → 3분기 13%. 2026년 중반 CAPA **150~180K wpm**(글로벌 웨이퍼 캐파의 8~10%).
- **증설 계획**: 우한 3공장 2027년 50K/월 → 풀가동 100K/월(기존 1·2공장 합계 200K/월의 2배 증가분). 신규 2개 팹 포함 **2028년 총 500K/월, 글로벌 점유율 약 15%** 목표.
- **투자 규모**: 1~3기 누적 **2,700억 위안(약 370억 달러)**. 신규 2개 팹 추가 **1,600~1,800억 위안(220~250억 달러)** 소요 추정 (Macquarie).
- **자립도**: 3공장은 **장비의 50% 이상을 중국산으로 조달**(3D NAND 수직 적층 장비 포함) — 베이징의 국산화 임계치를 통과.
- **[미확인]**: YMTC의 비트당 원가 절대값, 감가상각 정책, 보조금이 반영된 실효 감가 부담.

### 6-3. 종합 — 중국 원가 모델의 정체
공통 구조는 "**공정 효율 열위를 자본비용·감가 부담의 인위적 인하로 상쇄**"다. CXMT는 30% 웨이퍼 페널티를 안고도 버티고, YMTC는 10~20% 저가로 점유율을 산다. **이는 「전환할 수 있는 몸」이 겨냥하는 볼륨·로우엔드 티어와 정확히 겹치는 전장**이다. 선단(1c nm·HBM4E·EUV)에서는 이들이 아직 경쟁자가 아니라는 점도 동일 자료들이 일관되게 말한다(CXMT는 IPO 투자설명서에 **HBM 프로젝트가 없음**).

---

## §7. 확인 실패 / 공개 자료 미확인 항목 (창작 금지 목록)

1. **DRAM/NAND 비트당 원가에서 감가가 차지하는 %** — 어느 회사도 미공개. §3-1의 매출원가 기준 비율(30~45%)이 최선의 대리지표.
2. **현금원가(cash cost) 절대값** ($/Gb 등) — 미확인. Jim Handy가 특정 분기 SK하이닉스 DRAM 원가 $2.60/GB를 언급한 게시글이 검색에 잡혔으나 **원문·시점 확정 실패**로 인용 보류.
3. **메모리 팹의 손익분기 가동률(%)** — 신뢰할 만한 공개 추정치 없음. 2차 자료의 70~80% 수치는 1차 근거 없는 교육용 자료.
4. **팹 CAPEX 중 건물:장비 비율의 메모리 팹 전용 공식 통계** — SEMI/Exyte의 "80%+ 장비"는 전체 팹 평균. 메모리 전용 분해는 미확인 → §2-2의 공시 대차대조표 기반 산출로 대체.
5. **CXMT·YMTC의 감가상각 정책·내용연수·보조금 회계 처리** — 미공개.
6. **SK하이닉스 2023년 영업손실 정확한 공시 수치** — 언론 보도(약 7조 7,000억 원)만 확보. 원 공시 재확인 필요.
7. **"현금원가 이하로는 안 판다"는 명문화된 산업 규범 문서** — 존재하지 않음. 경제 논리로만 서술된 2차 자료 3건으로 대체.
8. **삼성전자 화성 노후 라인의 패키징 라인 전환** — 커뮤니티/저품질 매체 보도만 확인, 공식 확인 실패.

---

## 원본 링크

### 1차 공시 (직접 다운로드·파싱)
- Micron FY2025 Form 10-K (2025-08-28 결산): https://www.sec.gov/Archives/edgar/data/723125/000072312525000028/mu-20250828.htm
- Intel FY2023 Form 10-K (5년→8년 연장 원문): https://www.sec.gov/Archives/edgar/data/50863/000005086324000010/intc-20231230.htm
- Intel FY2025 Form 10-K (가속상각 $456M·$992M): https://www.sec.gov/Archives/edgar/data/50863/000005086326000011/intc-20251227.htm
- TSMC FY2025 Form 20-F: https://www.sec.gov/Archives/edgar/data/1046179/000162828026025362/tsm-20251231.htm
- 삼성전자 제57기(2025) 연결감사보고서: https://images.samsung.com/kdp/ir/financial-info/2025/2025_con_quarter04_all.pdf
- SK하이닉스 2025 사업보고서 (DART, 2026-03-17 접수, rcpNo 20260317000635): https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260317000635
- SK hynix 영문 연결재무제표(2023·2022, 내용연수 영문 표기 대조용): https://uploads3.craft.co/uploads/operating_source/document/1098220/336b619333a74c6c.pdf

### 팹 CAPEX 구성
- Exyte — Why building semiconductor fabs in the US costs more (장비 80%+): https://www.exyte.net/About-Us/Innovation-And--Experts/Opportunities-semiconductor-fab-planning-and-construction
- SEMI — Fab Investment Outlook and Capacity Growth Projection (2025-05): https://www.semi.org/sites/semi.org/files/2025-05/SEMI_Capex_market_outlook_5.28.2025_shared.pdf

### 원가·사이클 경제학
- SemiAnalysis — Memory Mania: How a Once-in-Four-Decades Shortage Is Fueling a Memory Boom: https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades
- Silicon Analysts — DRAM's Structural Repricing (2026): https://siliconanalysts.com/analysis/dram-pricing-cycle-2026-nanya-margin-expansion
- The Memory Guy (Jim Handy, 2023-02) — Memory Market Down, but a Turnaround is Coming: https://thememoryguy.com/memory-market-down-but-a-turnaround-is-coming/
- SemiWiki — How Profitable are TSMC's Nodes: Crunching the Numbers: https://semiwiki.com/forum/threads/how-profitable-are-tsmcs-nodes-crunching-the-numbers.22406/
- Audit Analytics — What Depreciation at Intel says about Moore's Law: https://blog.auditanalytics.com/what-depreciation-at-intel-says-about-moores-law/

### 팹 전환 사례
- 파이낸셜뉴스 (2021-10-21) — 삼성 D램 생산라인 CIS로 전환 속도 ("공정 80% 유사"): https://www.fnnews.com/news/202110211733147293
- 한국경제 (2020-12-09) — 삼성, D램 라인 바꿔 이미지센서 생산: https://www.hankyung.com/economy/article/2020120918141
- ZDNet Korea (2017-04-27) — 삼성전자 "화성 11라인 일부 CIS용 전환 예정": https://zdnet.co.kr/view/?no=20170427105455
- 충청타임즈 — SK하이닉스시스템IC 청주 M8 공장 중국 이전: https://www.cctimes.kr/news/articleView.html?idxno=619972
- KIPOST — SK실트론, SK하이닉스 M8 유휴공간 빌려 웨이퍼 생산: https://www.kipost.net/news/articleView.html?idxno=208435
- TI (2021-06-30) — TI to acquire Micron 300-mm semiconductor factory: https://www.ti.com/about-ti/newsroom/news-releases/2021/2021-06-30-ti-to-acquire-micron-300-mm-semiconductor-factory--extending-ti-s-cost-advantage-and-greater-control-of-supply-chain.html
- Micron (2021-06-30) — Micron to Sell Lehi, Utah, Fab to Texas Instruments: https://investors.micron.com/news-releases/news-release-details/micron-sell-lehi-utah-fab-texas-instruments
- onsemi — East Fishkill 소유권 이전 (2022-12-31): https://www.onsemi.com/company/news-media/press-announcements/en/onsemi-commemorates-transfer-of-ownership-of-east-fishkill-new-york-facility-from-globalfoundries-with-ribbon-cutting-ceremony
- Micron (2026-05-22) — Micron Advances Made-in-America Memory With Manufacturing Expansion in Virginia: https://investors.micron.com/news-releases/news-release-details/micron-advances-made-america-memory-manufacturing-expansion

### CXMT · YMTC
- TechTimes (2026-07-27) — CXMT Surges 466%: Nomura Sees Tripling, Morningstar Flags 30% Cost Ceiling: https://www.techtimes.com/articles/321720/20260727/cxmt-surges-466-489b-nomura-sees-tripling-morningstar-flags-30-cost-ceiling.htm
- TechTimes (2026-08-05) — Apple's CXMT Gambit Collapses: DUV Cost Gap Locks In Samsung's Pricing Power: https://www.techtimes.com/articles/323140/20260805/apples-cxmt-gambit-collapses-duv-cost-gap-locks-samsungs-pricing-power.htm
- Tom's Hardware — CXMT closes up 466% in Shanghai debut, no HBM project in IPO prospectus: https://www.tomshardware.com/tech-industry/cxmt-closes-up-466-percent-in-shanghai-debut-with-no-hbm-project-in-its-ipo-prospectus
- Tom's Hardware — Chinese CXMT DRAM doesn't look like the budget savior many were expecting: https://www.tomshardware.com/pc-components/dram/chinese-cxmt-dram-doesnt-look-like-the-budget-savior-many-were-expecting-new-modules-enter-the-market-but-prices-still-track-the-big-three
- Tom's Hardware — YMTC's third Wuhan fab clears Beijing's 50% local tooling threshold: https://www.tomshardware.com/tech-industry/semiconductors/ymtcs-third-wuhan-fab-clears-beijings-50-percent-domestic-tooling-threshold-as-two-more-are-planned
- Digitimes (2026-04-16) — YMTC to ramp Wuhan fab in 2026, new capacity unlikely before 2028: https://www.digitimes.com/news/a20260416PD219/ymtc-dram-fab-capacity-2026.html
- TechInsights — Unlocking the Secrets of the YMTC 64-Layer 3D Xtacking NAND Flash: https://www.techinsights.com/blog/unlocking-secrets-ymtc-64-layer-3d-xtackingr-nand-flash

### 다운턴 실적
- SK hynix Newsroom — SK hynix Posts Record Annual Financial Results in 2025: https://news.skhynix.com/en/sk-hynix-announces-fy25-financial-results/
- Yole Group — Memory pricing set to take off in 2H-2023: https://www.yolegroup.com/strategy-insights/memory-pricing-set-to-take-off-in-2h-2023/
