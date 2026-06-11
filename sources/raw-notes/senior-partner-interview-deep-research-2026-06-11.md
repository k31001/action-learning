# 시니어 파트너 인터뷰 딥리서치 보고서 (사용자 1차 자료)

- **유형**: 사용자(권의혁) 직접 인터뷰 기반 딥리서치 종합 보고서
- **인터뷰 대상**: 시니어 파트너 (직책·소속 미공개)
- **수집·정리일**: 2026-06-11
- **검증 방법**: 인터뷰 발언 → 공개 1차 자료(WSTS·IDC·IEA·Dell'Oro·NDRC·NASA·기업 IR) 교차 팩트체크
- **위치**: `sources/raw-notes/` (인터뷰 1차 + 자체 팩트체크 종합)

> 본 노트는 sources 층(원본·불변). 위키 페이지가 본문에서 인용·해석한다. wiki 작성 시 인터뷰 발언과 공개 자료를 구분해서 표기.

---

## 0. 한 줄 핵심 명제

> **"`SaaS Calypso` 이후 하드웨어의 시간이 돌아왔다"** — AI 시대의 병목은 SW 라이선스가 아니라 **메모리·가속기·전력·냉각·패키징·DC 부지·인허가·저계층 SW**로 이동.

---

## 1. 인터뷰의 4대 메시지 (구조화)

1. **AI 시대의 가치사슬은 다시 물리적 병목으로 이동** — 하드웨어 재평가
2. **메모리 사업을 '제품군'이 아니라 '요소기술·기능·운영능력'으로 분해해 재조합** — commodity Ready-to-Sell → solution portfolio 체질 전환
3. **삼성의 차별화 포인트는 "하드웨어를 이해하는 SW"와 "멀티사이트 제조·품질 운영 능력"** — IDM·다사이트 강점의 인접시장 확장
4. **새로운 사업은 무(無)에서 만드는 것이 아니라 기존 강점을 인접시장으로 피벗** — 무리한 신사업 진출 지양

---

## 2. 인터뷰 발언별 팩트체크 결과

| 인터뷰 원문 발언 | 공개 자료 검증 | 보고서 반영 |
|---|---|---|
| "삼성/SK하이닉스의 Anthropic 투자" | **부분 확인** — Anthropic Series F(2026, $65B post-money)에서 Micron·Samsung·SK hynix를 "strategic infrastructure partners"로 명시. 개별사 직접 지분 투자액은 미공개. | "직접 투자" 표현은 지양, **"전략적 인프라 파트너십/고객 선점"**으로 해석 |
| "Micron Tick-Tock 전략은 Elpida PMI 목적" | **공개 1차 자료 부재** — Tick-Tock 자체는 확인, PMI 설계라는 1차 자료는 미확인. 단, Micron은 Hiroshima·Taiwan·Akita 자산 편입 후 "central coordination across sites", "customer-specific requirements in central DB", "enterprise registration system"을 공식화. | **"운영 원리의 해석"으로만 활용**, 사실 단정 보류. PMI 시사점은 다사이트 지식관리 권고로 전환 |
| "충칭 등 고지대의 서늘한 기후 활용 중국 DC" | **부분 수정 필요** — 성유(成渝)는 8대 국가 허브 중 하나가 맞으나, NDRC 공식 문건이 기후·재생에너지 우위로 강조한 곳은 **구이저우·내몽골·간쑤·닝샤**. 충칭 강점은 **정책·전력·네트워크 통합배치**. | "충칭 기후" 표현 대체 → **국가 정책형 통합배치** |
| "Oracle Stargate 일부 포기, 권리 판매 가능성" | **공식 확인 안 됨** — OpenAI·SoftBank·Oracle은 5개 신규 사이트, ~7GW 계획, $400B+ 투자 공표. Oracle은 2026-06 Texas site 진척 + FY27 capex 최대 $95B 발표. 전체 철회·인허가권 매각은 미확인. | "일부 재배치 가능성" 정도만 시사. **전체 후퇴 서술 제외** |
| "Space 차폐 기술 발전으로 상용 반도체 사용 가능" | **방향성 타당** — NASA·ESA가 SmallSat·일부 임무에서 COTS 채택 확대 + shielding·qualification 중요성 인정. BryceTech: 2024년 ~2,800기 smallsat 발사(우주기체의 97%). 다만 deep-space·장수명·고신뢰 임무 일반화는 과함. | **"선별적 기회"로 반영**. Full rad-hard가 아닌 중간지대(선별 COTS·fault logging firmware·long-lifecycle DDR4/SSD·shield-aware 패키징) 강조 |
| "구글도 GPU 중고 생태계를 고민" | **공개 확인 부족** — 이번 검증 범위에서 Google 공식 추진 근거 미확인. | 아이디어는 유지하되, **공식 사례 대신 시나리오 분석**으로 전환 |
| "SaaS Calypso" 표현의 외부 출처 | **미확인** — 정확한 외부 출처 없음. | **인터뷰 원문 그대로 유지** (인용 시 발언자 귀속) |
| "Tesla 2026 pull-in 요청" / "과거 Samsung 내부 CoreWeave 유사 논의" | **공개 자료 부재** | **전략 가설 또는 인터뷰 발언으로 처리** |

---

## 3. 보강된 공개 데이터 (인터뷰 명제 뒷받침)

### 3.1 AI 하드웨어 재부상 — 숫자

| 지표 | 최신 공개 수치 |
|---|---:|
| WSTS 2026 반도체 시장 | **$1.51T**, YoY **+90%** |
| WSTS 2026 메모리 시장 | **$800B+**, YoY **약 +250%** |
| IDC 2026 AI 인프라 지출 | **$487B**, YoY **+53%** |
| Dell'Oro 2026 서버·스토리지 시스템 부품 | **+75%** YoY |
| IEA 2030 DC 전력수요 | **~945TWh** (2024 대비 약 2배) |
| Meta 2026 capex | **$125B~$145B** |
| Alphabet 2026 capex | **$180B~$190B** |
| Oracle FY26 capex | **$55.66B** |
| Oracle FY27 capex 계획 | **최대 $95B** |
| Stargate 2025-01 공식 출범 | 4년 **$500B**, 즉시 **$100B** 집행 |
| Stargate 2025-09 추가 | 5개 신규 사이트, **~7GW**, **$400B+** |
| Oracle Texas Stargate site (2026-06) | 90일 내 **75% 이상 완성** |
| Anthropic Series F (2026) | **$65B post-money valuation** |
| Anthropic strategic infrastructure partners | **Micron, Samsung, SK hynix** (공식 표기) |

### 3.2 메모리 3사의 공식 움직임

- **Samsung (2026 Q1)**: 메모리 사업 분기 최대 실적, NVIDIA Vera Rubin용 **HBM4·SOCAMM2 업계 최초 양산 판매**, **PCIe Gen6 SSD 개발**, **항공우주 산업 포트폴리오 확대** 언급
- **SK hynix**: 미국에 **AI Company 설립**, **$10B 커밋**, AI 데이터센터 생태계 솔루션 사업 확대
- **Micron**: FY26 Q2 매출 **$23.86B**, 영업현금흐름 **$11.9B**, FY26 capex **$25B 초과**, 메모리를 "고객의 전략 자산"으로 규정

### 3.3 임베디드 SW · 솔루션화 공개 근거 (Samsung)

- **SmartSSD**: SSD 내부 처리 → CPU/GPU/RAM 간 데이터 이동 감소. 스캔 중심 DB 쿼리 **−50% 시간**, **−70% 에너지**, **−97% CPU 활용**
- **CXL SMDK**: 메모리 가상화·지능형 티어링·확장 메모리 풀 관리. 앱 크게 안 바꾸고 새 메모리 구조 도입
- **Linux 커널 + NVIDIA GPUDirect Storage**: 드라이버·데이터 경로 최적화 → CPU overhead↓, latency↓, throughput↑

### 3.4 중국 정책형 DC 배치

- NDRC 2022: **8개 국가 산력 허브 + 10개 클러스터** (성유 포함)
- 기후·재생에너지 우위 지역: **구이저우·내몽골·간쑤·닝샤** (구분 필요)
- 2023년: 8개 허브 전부 착공, 서부 신규 DC 건설 전년 대비 2배, 신규 착공 **약 70개**
- 2026 보도: 향후 5년 **2조 위안** 전국 AI DC 계획 (계획 단계)
- 충칭 시 정부: **2024~2026 산력 고품질 발전 계획** + 서부 최초 산력 상호연결 플랫폼

### 3.5 우주 COTS 메모리 — 사업 중간지대

- NASA SmallSat 보고서: radiation shielding을 비용효율적 리스크 완화 수단으로 설명, COTS 가속 인정
- ESA: COTS 도입을 우주선 제작 방식 변화의 핵심으로, **risk avoidance가 아닌 risk management** 강조
- 수요: BryceTech 2024 **약 2,800기 smallsat 발사**, 우주기체의 **97%**
- 중간지대 기회: 선별 COTS 메모리/스토리지, fault logging firmware, **long-lifecycle DDR4/SSD**, shield-aware 패키징
- 한계: deep-space·군수·장주기 임무 일반화는 과함

### 3.6 중고 반도체 시장 — 보수적 시나리오 추정

> 본 항목은 **공식 시장통계가 빈약**해 시나리오 추정만 제시. 사업의 본질은 거래소가 아니라 **검사·등급화·잔존수명 예측·추적성·보증**.

| 시나리오 | 가정 | 2026 규모 추정 |
|---|---|---:|
| **인증 재사용 칩·모듈** | IDC AI 인프라 $487B의 0.5~1.5% | **약 $24억~$73억** |
| **broader 2차 시장** (서버·보드·스토리지 포함) | 1~3% | **약 $49억~$146억** |

- **다운턴 우선 액션**: "중고 판매"보다 **테스트·인증 대행**
- 산업 내 2차 시장 관행 존재 확인: SK hynix 웹사이트 "Surplus Equipment Offerings/유휴장비매각" 운영

---

## 4. 인터뷰 기반 전략 권고 7개 (단기/중기/장기)

| 기간 | 액션 | 기대효과 | 초기 KPI |
|---|---|---|---|
| 단기 | 메모리 포트폴리오를 기능 단위로 재분해 + CXL/SmartSSD/스토리지 박스 2~3개 lighthouse 제품 정의 | commodity 매출 → 솔루션 ASP 전환 | 6개월 내 PoC 2건, 디자인인 1건 |
| 단기 | 다사이트 공정·수율·FA·고객요구 **중앙 DB 구축** | PMI/양산 품질 편차 축소 | 공정 변경/고객 이슈 문서화율 90% |
| 단기 | 커널·드라이버·펌웨어 전담 조직을 제품조직과 묶어 **BSP/SDK 패키지화** | HW-aware SW 매출원 창출 | 유상 지원 계약 3건 |
| 중기 | Anthropic형 전략 고객 접점 모델 구축 | 수요 추종 → 수요 창출 | 고객 공동개발 MOU 2건 |
| 중기 | DC 부지·전력 옵션 map 작성 + utility/colo 파트너링 | AI 인프라 사업 선택권 | 후보 부지/전력 옵션 3개 |
| 중기 | 중고 반도체 **인증·테스트 파일럿** | 다운턴 대응 신규 매출 | 샘플 수거·등급화 프로세스 구축 |
| 장기 | 우주·산업·국방용 **장수명 제품군 + 인증 체계** | 비경기민감 수요 | 장주기 고객 2곳 확보 |

> **반대 권고**: 고객-비경쟁 원칙을 깨는 **전면적 Neo Cloud 진출은 우선순위 낮음**. 대신 "고객과 경쟁하지 않는" 화이트라벨 인프라/레퍼런스 아키텍처 공급자가 현실적 경로.

---

## 5. 시나리오 플래닝 함의 (Samsung 메모리사업부 관점)

1. **시나리오 B (AI 르네상스, Main Bet) 정합**: WSTS·IDC·Dell'Oro·IEA·Anthropic Series F 모두 B 가정 강화. 단 Main Bet의 진입 경로가 "HBM 시장점유"만이 아닌 **"솔루션 포트폴리오 + 전략적 고객 락인"**으로 확장 필요
2. **시나리오 D (조용한 재편) 대응 자산**: 중고/재활용 반도체 인증 사업, 다사이트 지식 DB는 다운턴에서도 작동
3. **시나리오 E (패러다임 전환)와 정합**: 임베디드 SW + CXL + SmartSSD는 HBM 패러다임 붕괴 시에도 자산
4. **MB-2 동서 균형 공급자**: 인터뷰의 "DC 부지·전력 옵션" 권고와 정합, MB-2 강도 강화 명분
5. **MB-4 커스텀 AI 메모리**: Anthropic strategic infrastructure partners 모델은 MB-4의 산업 표준화 신호
6. **RS-2 바벨 포트폴리오**: 인터뷰의 "장수명·우주·국방·산업" 라인은 RS-2의 long-lifecycle 끝단 강화 — Micron Manassas([bloomberg-micron-ceo-virginia-2026-05-22.md](../articles/bloomberg-micron-ceo-virginia-2026-05-22.md))와 정합
7. **신규 D 후보**: 인터뷰 권고 7개를 D15·D16·D17로 등재 검토

---

## 6. 오픈 이슈 (다음 ingest 추적 대상)

- Samsung·SK hynix의 Anthropic 직접 지분 투자 여부 — Anthropic Series F SEC 공시
- Micron Tick-Tock의 PMI 설계 여부 — Micron CFO·운영 부문 인터뷰
- Google GPU 중고 생태계 공식 추진 — Google Cloud 블로그·기술 컨퍼런스
- Tesla 2026 pull-in 요청 — Samsung·SK·Tesla 공시
- 과거 Samsung 내부 CoreWeave 유사 논의 — 내부 자료 (사용자 위치에서 접근 가능)
- "SaaS Calypso" 표현의 외부 출처 — 인용 정확성 위해 추적

---

## 7. 인용 출처 (보고서 본문 turn-citation 정리)

본 raw-notes 파일은 원문 보고서의 turn-citation 형식(citeturn0search4 등)을 보존하지 않고 **출처 기관·연도·핵심 지표만 정리**. 원문 전체는 사용자 로컬 `/Users/euihyeokkwon/Downloads/deep-research-report-3.md`에 보관.

주요 인용 기관: WSTS, IDC, Dell'Oro Group, IEA, Bain & Company, NDRC, NASA, ESA, BryceTech, Reuters, CSIS, FERC, EIA, Anthropic 공식 블로그, Samsung·SK hynix·Micron IR, Oracle FY 가이던스, Meta·Alphabet capex 가이드, Microsoft·Google DC 공식 자료.
