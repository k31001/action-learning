# 위키 작업 로그

추가 전용. 시간 역순(최신이 위)으로 누적한다.

형식:
```
## [YYYY-MM-DD] 작업유형 | 제목
- 무엇을 했는가
- 왜 했는가
- 영향받은 페이지 목록
```

작업유형: `ingest` · `query` · `lint` · `migration` · `build`

---

## [2026-06-02] build | 신규 차트 — 운영사별 연도 누적 데이터센터 용량 (v2.11.2 → v2.12.0)
- **무엇**: AI DC 탭에 가로축=연도, 세로축=운영사 누적 보유 용량(GW), 운영사별 꺾은선 차트 추가.
- **왜**: 사용자 요청 — 주요 운영사별 데이터센터 총 규모의 연도별 변화를 한 그래프로.
- **구현**: `dataCenters.js` — DC_OPERATOR_GROUP(id→주요 AI 앵커 귀속) 맵 + operatorGroup 필드 병합 + capacityByOperatorYear(연도 누적·상위 N·기타 제외·커버리지%) 헬퍼 + OPERATOR_COLORS. `DataCenterTracker.jsx` — LineChart로 상위 10개 운영사(OpenAI/Stargate·Meta·G42·Amazon·CoreWeave·Microsoft·Reliance·Google·xAI·HUMAIN) 라인. region 필터 연동.
- **귀속 규칙**: 조인트/콜로는 단일 앵커로 — Stargate 컨소시엄→OpenAI/Stargate, Nscale 앵커→Microsoft, SK·HUMAIN의 AWS 몫→Amazon, UAE 5GW→G42. 상위 10개=추적 용량 ~76%, 지역/소형/논란(전남) 제외. `wiki/concepts/ai-datacenter-buildout.md`에 방법론 노트 추가.
- **검증**: 런타임 — 10개 라인·색상·범례(총량 내림차순)·Y축 0~12GW(최대 OpenAI/Stargate 8.68GW 적합) 확인. 누적 단조증가. 콘솔 오류 0. `npm run build` ✓. version v2.12.0(마이너: 새 데이터 카테고리).
- **영향 페이지**: dataCenters.js·DataCenterTracker.jsx·ai-datacenter-buildout.md·updates.js·version.js.

## [2026-06-02] build | 버그 수정 — 지도 마커 호버 백지 크래시 + ErrorBoundary (v2.11.1 → v2.11.2)
- **증상**: 세계 지도 마커에 마우스를 올렸다 떼면 툴팁이 잠깐 보였다가 브라우저 전체가 하얗게 됨(사용자 제보).
- **근본 원인**: 원에서 마우스가 벗어날 때 circle `onMouseLeave`(setHover(null))와 svg `onMouseMove`가 React18 자동 배치로 한 렌더에 묶임. move 의 함수형 업데이터 `setHover(h => ({...h, ...pos(e)}))`가 null 상태에서 실행되면 `{...null, ...pos}` → **d 없는 부분 hover 객체** 생성 → 툴팁이 `hover.d.name`/`hover.d.stage` 접근 → TypeError → 에러 바운더리 부재로 트리 전체 붕괴(백지).
- **수정**: `WorldMap.jsx` — 업데이터를 `h ? {...h, ...pos(e)} : null` 로 가드, 툴팁 렌더 `hover && →  hover?.d &&` 방어.
- **안전망**: `ErrorBoundary.jsx` 신설. `App.jsx` 탭 콘텐츠를 `<ErrorBoundary key={topTab}>` 로 감싸 — 어떤 컴포넌트 오류든 전체 백지 대신 격리 폴백, 탭 전환 시 자동 리셋.
- **검증**: 헤드리스 프리뷰에서 동일 레이스(hover 세팅 → 한 task 안 leave→move) 재현. 수정본: 앱 정상 유지(map+heading 존재, root 469KB)·hover null 클리어·콘솔 오류 0. `npm run build` ✓. version v2.11.2(패치).
- **영향 페이지**: WorldMap.jsx·ErrorBoundary.jsx(신규)·App.jsx·updates.js·version.js.

## [2026-06-02] build | AI DC 세계 지도 인터랙션 3종 (v2.11.0 → v2.11.1)
- **무엇**: 세계 지도 뷰에 ①줌/팬(휠·드래그·버튼) ②색상 기준 토글(권역↔단계) ③마커 클릭 시 상세 표 해당 행으로 스크롤·하이라이트 추가.
- **왜**: 사용자 요청 — 밀집 지역 확대, 단계 색 구분, 지도↔표 연동.
- **구현**: `WorldMap.jsx` — translate+scale 변환(패닝 클램프), 휠은 native non-passive 리스너(커서 기준 확대), 마커 반지름 ÷k·국경 vectorEffect non-scaling-stroke로 줌 시 시각 안정. colorBy state로 fill·범례 전환. onSelect/selectedId props. `DataCenterTracker.jsx` — handleSelectDc(동기 scrollIntoView)·표 행 id/하이라이트.
- **검증**: 런타임 — 토글 색 전환·줌 transform(scale 2.25, 마커 r 역스케일)·마커 클릭 시 selectedId·행 하이라이트·scrollY 이동 확인. 콘솔 오류 0. `npm run build` ✓. (헤드리스 프리뷰에서 smooth 스크롤·rAF 미동작 → 동기 instant 스크롤로 확정.) version v2.11.1(패치: 기존 카드 인터랙션 강화).
- **영향 페이지**: WorldMap.jsx·DataCenterTracker.jsx·updates.js·version.js.

## [2026-06-02] build | AI DC 트래커 세계 지도 뷰 추가 (v2.10.0 → v2.11.0)
- **무엇**: "AI DC" 탭에 세계 지도(Equal Earth) 배경 위 데이터센터를 전력 규모(원 크기)·권역(색)으로 표시하는 지도 뷰를 추가. 마커 호버 시 위치·전력·단계·칩·상태 툴팁.
- **왜**: 사용자 요청 — "세계 지도를 배경으로 한눈에" 보기.
- **구현**: d3-geo + topojson-client 도입, `dashboard/src/data/world-110m.json`(world-atlas countries-110m) 번들. 신규 `WorldMap.jsx`(정적 지오메트리 모듈 1회 계산·√스케일 버블·호버 툴팁·범례). `dataCenters.js`에 DC_COORDS [lng,lat] 46건 병합(CoreWeave 포트폴리오 제외). `DataCenterTracker.jsx` KPI 아래·단계 보드 위 풀폭 카드.
- **검증**: 런타임 확인 — 지도 SVG(179 paths)·46 마커 좌표 유효(NaN 0)·Equal Earth 비율·호버 툴팁(Meta Hyperion 등) 정상. `npm run build` ✓. version v2.11.0(마이너: 큰 UX + 좌표 데이터 카테고리).
- **건너뜀**: wiki/report/PPTX 미변경 — 새 사실 추가 없는 순수 시각화 강화(좌표는 도시 근사). 영향 페이지: dataCenters.js·DataCenterTracker.jsx·WorldMap.jsx(신규)·world-110m.json(신규)·package.json·index.md·updates.js·version.js.

## [2026-06-02] ingest+build | AI 데이터센터 착공 트래커 신설 — 메모리 수요 선행 지표 (v2.9.2 → v2.10.0)
- **무엇**: 전 세계 AI 데이터센터 건설 현황을 부지 확보→가동 9단계로 추적하고 용량→메모리(HBM/DRAM) 수요로 환산하는 신규 모니터링 페이지를 Data Viz에 추가.
- **왜**: AI DC 착공은 메모리 수요의 6~24개월 선행 신호. 어느 국가에서·어느 규모로·어느 단계까지 지어지는지를 통합 모니터링하면 향후 수요를 가늠할 수 있음 (사용자 요청).
- **수집**: 4개 리서치 에이전트 병렬 웹 수집 (US / Asia-Pacific / Middle East·Europe / 라이프사이클·메모리 환산). 47건·17개국·55.9GW. → `sources/raw-notes/ai-datacenter-buildout-2026-06.md` (전체 URL 포함).
- **위키**: 신규 `wiki/concepts/ai-datacenter-buildout.md` — 9단계 모델(Mermaid)·환산 모델(1GW≈0.47M GPU≈90~135PB HBM)·권역별 요약·함의 수요·시나리오(DF1) 연결. `ai-server-demand.md`·`energy-constraints.md`에 역링크 추가.
- **dashboard**: `dataCenters.js`(데이터+9단계+환산+집계 헬퍼) + `DataCenterTracker.jsx`(단계 칸반 보드·권역 필터·KPI·도넛·국가/전력 막대·메모리 예측·정렬 테이블). `DataVisualization.jsx` SUB_TABS 첫 탭 "AI DC"로 통합·기본 탭. `npm run build` ✓. version v2.10.0(마이너).
- **함의**: 추적 55.9GW → HBM 설치기반 ~5.0~7.5EB(~$75~113B). 2026 신규 가동 ~23.7GW → 증분 HBM ~$32B (cf. 2026 HBM TAM ~$45B Goldman). 병목 ②인허가·전력 ⑤변압기 ⑦HBM 할당이 수요 타이밍의 핵심.
- **영향 페이지**: index.md(concepts·sources·dashboard 3곳), updates.js, version.js, ai-server-demand.md, energy-constraints.md.

## [2026-05-25] build | dashboard 신규 탭 "업데이트 내역" 추가 (v2.7.8 → v2.8.0)

사용자 요청: dashboard에 새로운 내용이 반영됐을 때 업데이트 날짜·핵심 내용을 한 곳에서 확인할 수 있는 메뉴 신설.

**구조**:
- 신규 컴포넌트: `dashboard/src/components/Updates.jsx` — 타임라인 카드 + 필터 칩 + 펼침/접기 + 통계 상자
- 신규 데이터: `dashboard/src/data/updates.js` — 시간 역순 큐레이션 (date·type·version·title·summary·tags·items·links). 매 ingest/build 사이클 종료 시 entry 추가가 컨벤션.
- `App.jsx` TOP_TABS에 History 아이콘 + "업데이트 내역" 5번째 탭(Strategy 다음)으로 삽입.

**초기 채워진 entries**: 최근 9건 (Counterpoint sync v2.7.8, Counterpoint ingest, Bloomberg Micron ingest, 권석준 3건 v2.7.5~v2.7.7, SemiAnalysis 등). 그 이전 entries는 log.md에서 추후 큐레이션.

**필터**: 타입(전체/Ingest/Build/Query) + 태그 다중 필터. 통계 상자 4종 (총·ingest·build·최신 일자).

**의도적 미반영**:
- log.md 자동 파싱: 향후 build hook으로 자동화 가능하나 현재는 수동 큐레이션이 더 정확 — entry당 사람이 정한 우선순위·태그·item 분류가 가치 있음
- 사용자 알림(unread badge): 다음 build에서 검토 — 현재 dashboard에 alerting 채널이 없어 사이클·시각만으로 충분

**version**: `v2.7.8 → v2.8.0` (마이너 — CLAUDE.md §6 규칙 "페이지/탭 추가, 새 데이터 카테고리")

**검증**: `npm run build` ✓ 2.75s · 2,339 modules · 914.9 kB JS (이전 898.6 kB 대비 +16.3 kB)

영향받은 파일:
- 신규: `dashboard/src/components/Updates.jsx` · `dashboard/src/data/updates.js`
- 갱신: `dashboard/src/App.jsx` (import + TOP_TABS + 분기) · `dashboard/src/version.js`

---

## [2026-05-25] ingest | Counterpoint Research 메모리 시리즈 7건 (2025-11 ~ 2026-04)

counterpointresearch.com 인바운드 수집 — WebFetch는 JS 렌더링/구독 제한, WebSearch 스니펫 + 3자 보도(EE Times·Tom's Hardware·CNBC·The Register 등) 교차 검증으로 본문 추출.

**수집된 7건**:
1. (2025-11-19, MS Hwang/Ivan Lam) Advanced Memory Prices Likely to Double — NVIDIA LPDDR 피벗 "seismic shift", DDR4 $2.10/Gb > DDR5 $1.50/Gb 역전
2. (2025-12-18, Jeongku Choi) Micron Achieves Record Performance — Q1 FY26 $13.6B +57% YoY, 시장 $200B→$400B
3. (2025-12-18) 2026 Smartphone Shipment Forecasts Revised Down — 글로벌 -2.1%, BoM +25/15/10% (저/중/고가), ASP +6.9% YoY
4. (2026-01-29, Jeongku Choi) Q4 2025 Samsung Reclaims Top Memory Spot — Samsung $25.9B 메모리 매출 1위 회복, SK hynix OPM 58%
5. (2026-01-29, MS Hwang/CNBC) SK Hynix Overtakes Samsung in Annual Profit — SK 47.2조 > Samsung 전사 43.6조 (Samsung 메모리만 24.9조), HBM Q3 2025 SK 57% vs Samsung 22%, Rubin 2/3+ SK
6. (2026-02-05, Jeongku Choi) Memory Prices Surge Up to 90% — Q1 2026 80~90% QoQ, 64GB RDIMM $450→$900→$1000+, DRAM OPM 60% > HBM 처음 발생
7. (2026-04-06, MS Hwang/Jeongku Choi) LTA Structurally Reshaping DRAM — UBS Arcuri "LTA가 cyclicality 제거", Microsoft·Google SK hynix와 3년 LTA + 선급금 계약

**핵심 결론 (시나리오 플래닝 관점)**:
- **호황 정점 신호 결정적 확정**: DRAM OPM 60% > HBM은 사상 처음. RS-5 절제 강도 결정적 정점 신호로 격상
- **NVIDIA LPDDR 피벗**: 스마트폰 OEM 1곳 수준 신규 수요. 모바일·산업 LPDDR4 공급 공백 영구화 가능
- **LTA 산업 표준화 + Microsoft·Google SK 락인**: RS-8의 "단순 LTA 차별화 부족" 가설 일부 수정 — 단순 LTA가 사이클 평탄화 효과(UBS Arcuri). Samsung은 동일 하이퍼스케일러 LTA + 선급금 즉시 확보 필요
- **Main Bet KPI 미달 사실 직시**: HBM 28%+ 목표 vs Q3 2025 22% 실측 (-6%pt). Rubin 2/3+ SK 락인 → SemiAnalysis (β) 시나리오 현실화 진행. Main Bet 확률(30~35%) 유지하되 KPI 윈도우 HBM4E·HBM5로 이동 검토
- **스마트폰 -2.1%**: 메모리 부족이 소비자 시장 첫 수축. Samsung은 메모리(공급자) ↔ 스마트폰(수요자) 양면 노출 — 전사 자기상쇄

**영향받은 페이지** (1차 ingest, 14곳):
- 신규 source: `sources/articles/counterpoint-memory-batch-2025-11-to-2026-04.md` (7건 통합)
- 갱신 wiki/concepts: `price-trends.md` · `memory-market-overview.md` · `dram-market-share.md` · `hbm-market.md` · `ai-server-demand.md`
- 갱신 wiki/entities: `samsung.md` · `sk-hynix.md` · `micron.md`
- 갱신 wiki/steep: `economy.md` (스마트폰 -2.1%·BoM)
- 갱신 wiki/scenarios: `scenario-B.md` (Main Bet KPI 재평가)
- 갱신 wiki/strategies/invariant: `rs1-options-based-capacity.md` · `rs5-financial-discipline-reinvestment.md` · `rs8-structured-revenue-hedging.md`
- 갱신 `index.md` (sources 카탈로그)

**의도적 미반영 / 다음 단계 후보** (체인 §6):
- **dashboard**: 다수 수치 갱신 후보 발생 (Q3 2025 HBM 57/22, FY2025 OP 47.2/43.6/24.9, 메모리 시장 $200B/$400B, 64GB RDIMM 시계열). 본 ingest는 위키 갱신만 처리 — dashboard 미러는 별도 build 사이클에서 한꺼번에 sync 예정 (체인 §6 자동화 원칙: "영향 없는 갈래는 건너뛰되 이유 명시" — 본 건은 영향 있으나 폭이 넓어 별도 사이클 분리). 다음 build 작업으로 분리: SCENARIOS B의 KPI 메모, COMPETITIVE_LANDSCAPE 갱신, visualizations dramMarketShareTrend·hbmShareTrend 갱신, indicators에 "DRAM OPM > HBM OPM" EWI 신설 검토
- **outputs/report**: 본 ingest의 결론들이 다음 보고서 재합성 시 자동 흡수. 별도 즉시 갱신 안 함 (위키가 진실의 원천)
- **outputs/presentation**: report 미변경 → PPTX 재생성 불필요

**출처**: [counterpoint-memory-batch-2025-11-to-2026-04.md](sources/articles/counterpoint-memory-batch-2025-11-to-2026-04.md) (Counterpoint Research 7건)

---

## [2026-05-25] ingest | Bloomberg TV: Micron CEO Mehrotra 미국 캐파·LTA·"discipline" 발언

Bloomberg TV 인터뷰 (Sanjay Mehrotra, Manassas VA 1α DRAM 양산 개시 행사, 2026-05-22 게시, 10:05). yt-dlp로 영문 자막 추출 → 시나리오 플래닝 관점에서 의미 있는 6대 포인트 추출.

**핵심 발언 6선**:
- 미국 DRAM 비중 **10% → ~40% (10년)**, 총 **$200B**, **90,000 신규 일자리**
- Manassas DDR4/1α — 4배 확장, 자동차·항공우주·국방·산업·네트워킹 long life cycle
- Boise Fab 1 첫 웨이퍼 **2027년 중반**, Fab 2 **2028년 말**, Syracuse 4팹 메가 클러스터
- "Shortage continuing **well beyond 2026**", 현재 고객 수요의 **50%~2/3**만 충족, "Meaningful new supply doesn't really start ramping until **2028**"
- "**With discipline**" 4회 반복 — Shell 선행 + 장비 단계화 본인 언어 명시
- "**Long term supply agreements**" — 고객 predictability ↔ 생산자 confidence 양방향 take-or-pay

**RS·시나리오 매핑**:
- RS-1 (옵션형 캐파): **본인 언어로 확인** — 경쟁사 동시 채택 시 점유율 손실 우려(반박 5.3) 약화
- RS-2 (바벨): Manassas long life cycle + Boise leading edge = RS-2 본인 사례. Samsung은 자동차·산업·국방용 long life cycle 진입 여지
- RS-5 (재무 규율): "discipline" 동시 채택 환경에서 강도 **유지**, IR 정량 지표 공시 검토
- RS-8 (구조화 매출 헷지): 단순 LTA 산업 표준화 — Samsung은 Participating Forward·HTA·Tiered Pricing 한 단계 더 진전 차별화
- MB2 동서 균형: Micron 미국 40% 집중 ↔ Samsung 평택·시안·Taylor 동서 분산 차별점 강화
- 시나리오 A (디커플링 지속): 미국 메모리 자급 비중 상승 → 확률 상향 압력
- 시나리오 B (Main Bet): 부족 장기화·메모리 strategic asset 프레임 정합 강화
- 시나리오 D (조용한 재편): CEO 부족 장기화 공식 인정 → 일부 D→B 이동 신호

**영향받은 페이지** (1차 ingest):
- 신규: `sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md` (전체 자막에서 발췌 + RS 매핑)
- 갱신: `wiki/entities/micron.md` (Update 2026-05-22 섹션 추가)
- 갱신: `wiki/strategies/invariant/rs1-options-based-capacity.md` (Update 2026-05-22)
- 갱신: `wiki/strategies/invariant/rs2-barbell-portfolio.md` (Update 2026-05-22)
- 갱신: `wiki/strategies/invariant/rs5-financial-discipline-reinvestment.md` (Update 2026-05-22)
- 갱신: `wiki/strategies/invariant/rs8-structured-revenue-hedging.md` (Update 2026-05-22)
- 갱신: `index.md` (sources/articles 카탈로그)

**의도적 미반영** (변경 정합성 체인 §6에서 건너뛴 이유 명시):
- `wiki/scenarios/*.md` 본문: 시나리오 확률·내러티브 변경 없음. micron.md Update 안의 매핑으로 충분 (CEO 발언이 확률 가중치를 결정적으로 흔드는 신호는 아님 — 추가 신호 누적 시 다음 lint에서 처리)
- `outputs/report/scenario-planning-report.md`: 기존 Micron 언급 3건은 HBM4 점유율·SSD 레퍼런스 — Bloomberg 인터뷰는 신규 수치 변경 없음, RS·entities 갱신만으로 다음 보고서 재합성 시 자동 반영 예정
- `dashboard/src/data/*.js`: 신규 수치 (40%/10%/200B/90K jobs) 모두 위키 entity에 흡수. dashboard의 SCENARIOS·DECISIONS·INITIAL_QUADRANT_POSITIONS·EWI에 해당하는 변동 없음 → dashboard 변경 없음 → version bump 건너뜀
- `outputs/presentation/*`: 위 report 미변경에 연동, PPTX 재생성 불필요

**출처**: [bloomberg-micron-ceo-virginia-2026-05-22.md](sources/articles/bloomberg-micron-ceo-virginia-2026-05-22.md) (Bloomberg TV https://youtu.be/Q_PSCMdINmg)

---

## [2026-05-19] build | 4개 후속 작업 (venv 정비 + EWI 신설 + D13·D14 + v2.7.7)

이전 ingest 사이클에서 식별된 4개 후속 작업을 일괄 처리.

**(1) PPTX venv 정비** ✓
- `python3 -m venv .venv` + `pip install python-pptx matplotlib numpy`
- brew Python PEP 668 차단 우회 — 전용 가상환경에 의존성 격리
- `.gitignore`에 `.venv/`, `__pycache__/` 추가
- CLAUDE.md §5 빌드 명령 갱신: `python3 outputs/presentation/scripts/generate_pptx.py` → `.venv/bin/python outputs/presentation/scripts/generate_pptx.py`
- 초기 셋업 명령 명시 + PEP 668 우회 사유 주석 추가
- PPTX 재생성 ✓ (540.6 KB, 29매, venv 경유)

**(2) 애플 온디바이스 AI EWI 모니터링** ✓
- `apple_ondevice_ai_status` currentValue **'unannounced' 유지** — Apple Intelligence(2024 WWDC) 자체 발표는 별개이고, 권 교수가 우려한 **신규 메모리 폼팩터·LPDDR6/특수 규격 공식 채택**은 미발표 상태로 EWI 의미 정의가 분리됨
- history에 의미 명확화 항목 추가 + options·hint 텍스트 정밀화
- WebFetch는 검색 페이지 robots 차단으로 직접 시점 갱신 불가 — 다음 이벤트(Apple WWDC, 신규 iPhone 발표) 시점에 currentValue 재평가

**(3) HBM 6세대 양산 진척 EWI 신설** ✓
- 신규 EWI `hbm6_mass_production_status` — 4단계 select (계획/시제품/리스크 양산/대량 양산)
- 권석준 동아일보 2026-05-12 진단 "빠르면 2026 하반기 HBM 6세대 양산 시작" 반영
- scenarioSignals: A·B (Main Bet Scenario B의 기술 토대 검증 신호)
- 리스크 양산 진입 시 권 교수 전망 검증 + MB-2 동서 균형 공급자 가속 명분

**(4) SE-1·SE-2 결정 신설 (D13·D14)** ✓
- **D13 SE-1 3D DRAM 가속**: IMEC 협약 $200M → $300M+ 상향, R&D 200~300인 → 300~500인 확대, 4F² COP DRAM 양산 일정 2030 → 2028 H2 risk production 목표
- **D14 SE-2 CXL 표준 주도권 4단계 로드맵**: 2026 Q4 SIG 의장단 진입 → 2027 H1 CXL 3.0 표준 작성 주도 → 2027 H2 NVIDIA 인증 → 2028+ CXL Memory Pooling 시장 점유 30%+
- 두 결정 모두 cluster D-240 (2026 Q4 결정), priority high, isNew flag
- 권 교수 진단 "2030년대 후반 게임 체인저 = 3D DRAM + CXL"의 실행 결정 명문화

**Dashboard 갱신 요약**:
- `indicators.js`: EWI 1종 신설 (`hbm6_mass_production_status`) + `apple_ondevice_ai_status` history 보강
- `strategies.js`: DECISIONS 신규 2종 (D13·D14)
- `version.js`: v2.7.6 → **v2.7.7** (패치 — EWI 1종 + DECISIONS 2종, 페이지 구조 변경 없음)

**검증**:
- `cd dashboard && npm run build` ✓ (3.12s)
- `.venv/bin/python outputs/presentation/scripts/generate_pptx.py` ✓ (540.6 KB, 29매)

---

## [2026-05-19] ingest | 권석준 교수 추가 영상 3건 → 전략 개선 (MB-4 / SE-1 / SE-2 / RS2 강화)

권석준 교수의 다른 영상 3건을 ingest하고 핵심 인사이트를 위키 12개 페이지에 반영. 단순 사실 갱신을 넘어 **전략 페이지 4개를 명시적으로 강화** (MB-4·SE-1·SE-2·RS2).

**수집 자료 (3건)**:
- [youtube-kwon-agentic-ai-memory-2026-05-01.md](sources/articles/youtube-kwon-agentic-ai-memory-2026-05-01.md) — SBS 교양이를 부탁해, 추론 100배·HBM3E 한계·HBM4E 격전지
- [youtube-kwon-hbm-roadmap-cxl-2026-05-12.md](sources/articles/youtube-kwon-hbm-roadmap-cxl-2026-05-12.md) — 동아일보 머니가이드, HBM6 2026 H2·CXL "메모리 부도심"·2030년대 게임 체인저
- [youtube-kwon-cycle-formula-2026-05-21.md](sources/articles/youtube-kwon-cycle-formula-2026-05-21.md) — 연합뉴스경제TV 인사이트30, Q1 폭증·5종 메모리 다발·사이클 공식 변화

**핵심 통합 인사이트**:
1. **추론 패러다임 100배** (Jensen Huang GTC) — 학습→추론 전환, HBM3E도 토큰 한계
2. **HBM-DRAM 사이 '징검다리 메모리'** 신규 시장 — CXL·GDDR·KV 캐시 플래시
3. **5종 메모리 동시 폭증** — HBM·KV 캐시·플래시·GDDR·LPDDR (사이클 비동기화)
4. **HBM 6세대 양산 2026 H2** + 4~5년 로드맵 안정
5. **CXL = "메모리 부도심"** (메모리 풀링·버추얼 확장) + 삼성 차별점
6. **2030년대 후반 게임 체인저 = 3D DRAM + CXL** (권 교수 명시)
7. **HBM4E 격전지: 삼성 IDM vs SK + TSMC 연합** — 두 모델의 격돌
8. **애플 온디바이스 AI 진입 시 거대 폭풍** — 일본 폼팩터 실패 교훈
9. **구글 터보퀀트 역설** — 양자화도 메모리 수요 촉진 (총량 증가)
10. **사이클 공식 변화** — 메모리 종류별 비동기 사이클

**갱신된 wiki 페이지 (12개, 2025-05-19 [Update II] 섹션)**:
- concepts: `ai-server-demand`, `hbm-market`, `hbm-roadmap`, `emerging-tech`, `semiconductor-cycle`, `dram-technology`, `ai-demand-sustainability`, `ssd-ufs-market`
- strategies/core: `current-state-mb4-custom-ai-memory` (5종 통합 솔루션 확장), `current-state-se1-3d-dram-imec-ma` (게임 체인저), `current-state-se2-cxl-sig-leadership` (표준 주도권)
- strategies/invariant: `rs2-barbell-portfolio` (다극 포트폴리오)

**전략 개선 요약**:
- **MB-4 강화**: HBM 커스텀 → **5종 메모리 통합 솔루션 제공자**로 정의 확장. 신규 KPI 3종 (통합 솔루션 매출 비중·CXL 표준 주도 점수·KV 캐시 매출). 실행 우선순위 5단계 제시.
- **SE-1 가속**: IMEC 협약 $200M → $300M+ 상향 검토 + R&D 200~300인 → 300~500인 확대. 4F² COP DRAM 가속.
- **SE-2 강화**: 단순 SIG 참여 → 표준 주도권 확보. 4단계 로드맵 (SIG 의장단 → CXL 3.0 표준 작성 → NVIDIA 인증 → 시장 점유 30%+).
- **RS2 확장**: 양극 바벨 → **다극(Multi-pole) 포트폴리오**. 시나리오별 mix 비중 가이드 신설 (HBM·CXL·KV / GDDR·LPDDR / 범용 3극).

**Dashboard 갱신**:
- `COMPETITIVE_LANDSCAPE.samsung.strengthAreas`: "IDM 종합반도체 — HBM4E 격전지 차별점" + "CXL '메모리 부도심' 표준 주도 잠재력" 추가
- 신규 EWI `apple_ondevice_ai_status` — 애플 온디바이스 AI 메모리 채택 단계 (4단계 select, 미발표/공식 발표/시제품/양산 채택)
- `version.js`: v2.7.5 → **v2.7.6** (패치 — EWI 1종 + 전략 페이지 다수 강화. 페이지/탭 구조 변경 없으므로 패치 분류)

**의도적 미반영**:
- HBM4E 격전지 권석준 분석은 위키 hbm-market.md에 기록. 본인 페이지(samsung, sk-hynix)는 1차 ingest에 이미 반영된 권석준 2026-04-11 분석과 일관성 유지를 위해 추가 append 안 함 — 중복 회피.
- 구글 터보퀀트 별도 entity 미생성 — 메모리 산업 관점에서는 양자화 효과만 의미있으며 위키 ai-demand-sustainability·semiconductor-cycle 에 흡수.

**검증**:
- `cd dashboard && npm run build` ✓ (2.67s)
- PPTX 빌드는 직전 사이클과 동일하게 brew Python PEP 668 차단 — venv 정비 별도 필요

---

## [2026-05-19] ingest | 권석준 성균관대 교수 인터뷰 (SBS 교양이를 부탁해, 2026-04-11)

YouTube 영상 ingest. 권석준 교수의 산업 인사이트는 위키 다수 페이지와 정합·충돌이 동시에 발생.

**수집 자료**: [youtube-kwon-seokjun-2026-04-11.md](sources/articles/youtube-kwon-seokjun-2026-04-11.md) — 자동 한국어 자막 기반 정리, 20분 영상, 11개 챕터.

**핵심 12 메시지**:
1. 메모리 단가 3~4배 폭등 (2025 9~10월 대비), 공급자가 가격·물량 권한 ("을이 갑")
2. **HBM:DRAM 가격 균형선 = 6:1** — 그 미만이면 DRAM이 이익률에서 HBM 추월 가능
3. **삼성 로직다이 내재화 = 장기 차별점** — TSMC·Intel·Samsung 3사 중 메모리도 하는 유일 회사. HBM4E 이후 EUV 10nm 이하 필수
4. **SK하이닉스 "TSMC 인질 잡힐 위기"** → Plan B 시급 (새 위험)
5. 머스크 Terafab 회의적 (양산 인력 확보 어려움)
6. AI DC에 HBM 외 DRAM 폭증 동시 필요
7. **메모리 파운드리화** — 고객 설계 단계 참여 + 라인 분기 운영
8. **CXMT 추격 = 한국 80년대 일본 추격 패턴의 중국판**. 권 추정: 2026 5% → 2027 7~8% → 2030년대 마이크론 수준 (위키 추정보다 보수적)
9. **한국 세컨드 리그 부재** → CXMT가 그 빈자리 점령 (새 통찰)
10. 팹 건설 5년 + 슈퍼사이클 5년 베팅 + 속도 조절
11. 슈퍼사이클 끝 시점 누구도 모름
12. 변화의 씨앗 알아보는 시야 + 따라잡을 체력 + 변신 능력 (시나리오 플래닝 정신)

**갱신된 wiki 페이지 (10개)**:
- entities: `samsung.md` (로직다이 차별점), `sk-hynix.md` (TSMC 인질 위기), `tsmc.md` (HBM 로직다이 파운드리 지위), `cxmt.md` (권 추정 시계열 병기 + 80년대 추격 패턴)
- concepts: `price-trends.md` (HBM:DRAM 6:1), `hbm-roadmap.md` (로직다이 EUV 10nm), `hbm-market.md` (갑을 역전 + 파운드리화), `memory-market-overview.md` (5년 베팅), `emerging-tech.md` (메모리 파운드리화)
- strategies: `current-state-mb4-custom-ai-memory.md` (라인 분기 전략 + KPI 보강)

**SemiAnalysis와의 충돌 (위키에 양 관점 병기)**:
- Samsung SF4 베이스다이: SemiAnalysis "고비용 노선" ⚠️ vs 권석준 "장기 차별점" ✅ — 단기 비용 vs 장기 구조의 trade-off, 분기점 모니터링
- CXMT 시계열: 위키 2027E 15~17% (SemiAnalysis) vs 권석준 2027E 7~8% — 양 추정 병기, 2026 Q3~Q4 분기 출하량으로 판가름

**dashboard 갱신**:
- `COMPETITIVE_LANDSCAPE.samsung.strengthAreas`: "로직다이 내재화 — TSMC/Intel/Samsung 3사 중 메모리도 하는 유일" 추가
- `COMPETITIVE_LANDSCAPE.skhynix.gapAreas`: "TSMC N12 로직다이 의존 — '인질 잡힐 위기' Plan B 시급" 추가
- 신규 EWI `hbm_dram_price_ratio` — HBM:DRAM 단가 비율, 임계 6배(권 균형선), 6배 이하 시 RS2 "저원가 범용" 축 강화 신호

**의도적 미반영**:
- SK하이닉스 Plan B 구체화는 SK 내부 결정 영역 — Samsung 위키에선 위험 신호로만 기록
- 머스크 Terafab 별도 entity 미생성 — 정보 부족·권 교수 회의적 평가. 향후 신규 자료 시점에 재검토
- 보고서(`outputs/report/scenario-planning-report.md`) 직접 갱신 안 함 — 위키 합성 산출물이라 다음 보고서 빌드 사이클에서 자동 반영
- `wiki/strategies/invariant/rs1-options-based-capacity.md`는 이미 [Update 2026-05-19] 섹션 있음 — 5년 베팅·속도 조절은 권 교수가 RS1 핵심을 외부 검증한 형태이므로 별도 append 없이 `memory-market-overview.md`로 cross-ref

**검증**:
- `cd dashboard && npm run build` ✓ (2.76s)
- `python3 outputs/presentation/scripts/generate_pptx.py` ✗ `ModuleNotFoundError: No module named 'pptx'` — brew Python PEP 668 externally-managed로 변경되어 `pip install python-pptx` 차단. CLAUDE.md 의존성 설치 명령 갱신 필요(다음 사이클에서 venv 또는 pipx로 회수). 이번 사이클은 위키·dashboard 변경만 commit, PPTX 본체는 다음에 재생성.
- version bump v2.7.4 → **v2.7.5**

---

## [2026-05-19] build | dashboard 버전 v2.7.3 → v2.7.4 + 변경 정합성 체인 보강

이번 ingest → query → dashboard sync 사이클을 마무리하면서 누락됐던 dashboard 버전 bump 처리 + CLAUDE.md §6 체인에 version bump 단계 강제 추가.

**변경**:
- `dashboard/src/version.js`: `v2.7.3` → `v2.7.4` (패치 — 신규 EWI 2종 + 카드 텍스트 보강, 페이지 구조 변경 없음)
- `CLAUDE.md` §6 변경 정합성 체인 보강:
  - 변경 단계별 갱신 표: `dashboard/src/**` 행에 "`version.js` bump (분류 규칙은 version.js 주석)" 명시
  - 마무리 단계: 기존 5단계 → **6단계**. 단계 2로 "dashboard 변경 있으면 `version.js` bump" 신설. 변경 없으면 건너뛰되 사유 명시.
  - 커밋 메시지에 새 버전 표기 의무 추가

**누락 회수**:
- 위키화 마이그레이션 이후 dashboard 코드 변경 3건(`5170bb9`, `2fd2f3c`, `491cc35`)이 version bump 없이 push됨. 이번 v2.7.4 패치로 그 누적 변경을 한꺼번에 반영.
- 향후 동일 누락 방지를 위해 CLAUDE.md 체인에 강제 단계 추가.

**검증**: `cd dashboard && npm run build` ✓ (3.04s)

---

## [2026-05-19] build | 4개 query 결과를 dashboard에 미러링

위키 갱신 결론을 dashboard 데이터 미러에 반영. 한 번에 묶음으로 처리.

**변경 (5곳)**:
- `dashboard/src/data/visualizations.js`
  - `dramMarketShareTrend.data` 2027E: cxmt 14 → **16** (samsung 30→29, skhynix 32→31 분배, 합 100 유지)
  - `chinaCompetitorShare.data` 2027E: cxmtDram 14 → **16**
- `dashboard/src/data/strategies.js` `COMPETITIVE_LANDSCAPE.cxmt`
  - `dramRank`: "4위 (Q3 2025 8% → **2027E 15~17% 상향**, SemiAnalysis 2026-05-19)"
  - `strengthAreas`에 "HBM ×4 캐파 잠식 → 범용 공급 공백 흡수 가속" 추가
  - `gapAreas`에 "(DDR 마진 회복으로 약화)" 메모 추가
- `dashboard/src/data/strategies.js` `DECISIONS` D6 (RS1·4·5)
  - title에 "(호황기 절제 강화)" 추가
  - summary에 [2026-05-19 강화] 실행 항목 5종 (Q3 캐파 동결, mix 전환권, LTA 없는 증설 금지, 재고일수 −15%, 재투자 70%+, 자사주 매입 보류)
- `dashboard/src/data/strategies.js` `DECISIONS` D10 (NAND R&D)
  - title에 "+ V11 가속 검토" 추가
  - summary에 [2026-05-19 추가] Kioxia BiCS10 등장 → V11 2027 H1 → 2026 H2 가속 검토
  - contingency에 Kioxia CBA IP 추가 조사 메모
- `dashboard/src/data/indicators.js` 신규 EWI 2종 추가
  - `cxmt_asp_gap`: CXMT 평균 ASP vs 글로벌 DRAM ASP 격차 (quarterly, −10% 임계값으로 단가 우위 약화 신호 추적)
  - `cxmt_fab3_status`: 허페이 Fab 3 가동 상태 (4단계 select — 계획/건설/시험양산/양산)

**의도적 미반영**:
- SCENARIOS B 확률 33% **유지** (위키 결론과 정합 — 30~35% 유지)
- RS2 바벨 포트폴리오 강도는 위키만 갱신 (dashboard DECISIONS에는 RS2 단독 항목 없음, D6의 RS-1·4·5 묶음에서 다룸)
- 신규 EWI 4종 중 2종(캐파 증설 속도·하이퍼스케일러 인증 시도)은 기존 `cxmt_ddr5_shipment` 와 정성 지표라 미추가

**검증**: `cd dashboard && npm run build` ✓ (3.02s)

---

## [2026-05-19] query | Kioxia BiCS10 → RS7 hybrid bonding 자체 IP 목표 시급도 재평가

결론: 자체 IP 70%+ 목표 **유지** + **V11 hybrid bonding 진입 시점 2027 H1 → 2026 H2 가속 검토**.

근거: CBA(Kioxia BiCS10 활용)는 산업 표준화 추세로 IP 종속 약함. Hybrid bonding W2W는 YMTC 핵심 IP 지배 — 별개 기술이라 BiCS10 등장이 자체 IP 시한 가속의 직접 근거는 약함. 단 332L 등장으로 layer 적층 경쟁이 4파전(한·미·중·일)으로 강화되어 Samsung V11 일정 가속 명분 발생.

⚠️ Kioxia CBA IP 라이선스 구조는 sources에 명시 없음 — 추가 조사 필요(다음 ingest 후보).

영향 페이지: `wiki/strategies/invariant/rs7-ai-engineering-automation.md`
출처: `sources/articles/semianalysis-isscc-2026-2026-04-15.md`

---

## [2026-05-19] query | HBM ×4 + DDR 마진 회복 → CXMT 위협 시계열 재평가

결론: CXMT 위협 **가속**. 위키 가정 갱신: 2027E DRAM 점유 13.9% → **15~17% 상향**.

근거: 두 상충 효과 중 (B) 물량 효과(범용 공급 공백 흡수)가 (A) 단가 효과(범용 마진 회복)보다 우세. 메모리 시장은 물량 점유가 단가 우위보다 진입장벽을 더 빠르게 형성. 시나리오 C·D 모두 payoff 가정 악화. [RS2 바벨 포트폴리오](wiki/strategies/invariant/rs2-barbell-portfolio.md) "저원가 범용 양보" 전략 유효성 ↑.

신규 EWI 지표 4개 제안: CXMT ASP 격차, 분기 캐파 증설 속도, 허페이 Fab 3 가동 시점, CXMT 하이퍼스케일러 인증 시도.

영향 페이지: `wiki/entities/cxmt.md`, `wiki/scenarios/scenario-C.md`, `wiki/scenarios/scenario-D.md`
출처: `sources/articles/semianalysis-ai-silicon-shortage-2026-03-12.md`, `vera-rubin-2026-02-25.md`

---

## [2026-05-19] query | SemiAnalysis vs UBS Rubin HBM4 충돌 → Main Bet 확률 재평가

결론: Main Bet (Scenario B AI 르네상스) 확률 **30~35% 유지** + **conviction 강화**.

근거: Samsung Rubin HBM4 28%+ 진입 기대값 ≈ **28.5%** (α UBS 50%·β SemiAnalysis 35%·γ 기타 15% 분기 가중 평균). 기존 Main Bet 가정과 정합. (β) SemiAnalysis 시나리오에서 Samsung 28~35% 진입 여지로 HBM4 인증 회복 노력의 expected payoff ↑. 시나리오 매트릭스 5개 확률 분포는 변동 없음. 의사결정 D2~D4(NVIDIA 인증 회복 + co-design + HBM4 캐파) 우선순위 ↑.

모니터링 분기점: 2026 Q3 Rubin 초기 출하 시 Micron 자격 통과 여부.

영향 페이지: `wiki/scenarios/scenario-B.md`, `wiki/entities/samsung.md`, `wiki/entities/micron.md`
출처: `sources/articles/semianalysis-vera-rubin-2026-02-25.md`

---

## [2026-05-19] query | DDR 마진 ~ HBM 수준 → RS1·RS5 호황기 절제 강도 재검토

결론: RS1(옵션형 캐파)·RS5(재무 규율) 모두 **강화**.

근거: DDR DRAM 마진이 HBM 계약 수준 근접/초과는 시장 정점 임박 신호. HBM 캐파 잠식 3→4× 가속이 범용 공급 부족을 장기화해 추가 증설 유혹 ↑. 과거 메모리 사이클 정점 무절제 패턴과 동일. 모든 시나리오(A·B·C·D·E)에서 강화 결론 일치 — 다운턴 진폭 ↑ 우려.

실행:
- RS1: 신규 고정 캐파 증설 동결(Q3까지), mix 전환권 정량화, 장기계약 없는 증설 금지
- RS5: 재고일수 상한 -15%, HBM 초과이익 재투자 70%+ 명문화, 자사주 매입 보류

영향 페이지: `wiki/strategies/invariant/rs1-options-based-capacity.md`, `rs5-financial-discipline-reinvestment.md`
출처: `sources/articles/semianalysis-ai-silicon-shortage-2026-03-12.md`

---

## [2026-05-19] ingest | SemiAnalysis 3개 기사 (ISSCC 2026 / AI Silicon Shortage / Vera Rubin)

위키화 후 첫 본격 ingest. SemiAnalysis newsletter에서 메모리 관련 최신 3건 수집·반영.

**수집 자료** (3개 원본, sources/articles/):
- [semianalysis-isscc-2026-2026-04-15.md](sources/articles/semianalysis-isscc-2026-2026-04-15.md) — ISSCC 2026 메모리 논문 모음
- [semianalysis-ai-silicon-shortage-2026-03-12.md](sources/articles/semianalysis-ai-silicon-shortage-2026-03-12.md) — AI 칩 부족·HBM 캐파 잠식
- [semianalysis-vera-rubin-2026-02-25.md](sources/articles/semianalysis-vera-rubin-2026-02-25.md) — Vera Rubin 메모리·Micron 자격

**갱신된 wiki 페이지 (12개)**:
- `wiki/concepts/hbm-roadmap.md` — Samsung HBM4 13Gb/s·VDDQ 0.75V·ABB·PMBIST 스펙, SK Hynix N12 베이스다이
- `wiki/concepts/hbm-market.md` — Rubin HBM4 공급 분석 SemiAnalysis vs UBS 충돌 표, 핀 속도 진척 격차, HBM 웨이퍼 효율 3→4×
- `wiki/entities/nvidia.md` — Rubin HBM4 288GB/22TB/s, Rubin Ultra +4×, Vera CPU 1,536GB
- `wiki/concepts/dram-technology.md` — LPDDR6 양사 비교, Samsung 4F² COP DRAM (3D DRAM 후보)
- `wiki/concepts/emerging-tech.md` — GDDR7 SK Hynix 1c 48Gb/s, TSMC N16 MRAM
- `wiki/concepts/nand-process-transition.md` — Kioxia BiCS10 332L 등장, 4사 layer 로드맵 갱신
- `wiki/concepts/ai-server-demand.md` — Rubin/TPU v8AX/Trainium3/MI400 메모리 폭증 표
- `wiki/concepts/price-trends.md` — DDR DRAM 마진이 HBM 계약 수준 근접 (시장 구조 변화)
- `wiki/concepts/semiconductor-cycle.md` — HBM 웨이퍼 효율 압박 → 사이클 가속
- `wiki/entities/samsung.md` — HBM4 우위(성능·전력), 1c 수율 SemiAnalysis 추정 50%, SF4 비용 우려
- `wiki/entities/sk-hynix.md` — HBM4 N12·안정성 우위, LPDDR6 1c 14.4Gb/s, GDDR7 1c 48Gb/s
- `wiki/entities/micron.md` — HBM4 뒤처짐, Rubin 자격 취득 불가 (UBS 추정과 충돌)

**주요 발견** (시나리오·전략 함의):
- **SemiAnalysis vs UBS 충돌**: Rubin HBM4에서 Micron 점유 18%(UBS) vs 자격 불가(SemiAnalysis) — Samsung 입장에서 양 시나리오 모두 점유 28% 진입 여지. 분기점 모니터링 지표로 추가.
- **HBM 웨이퍼 효율 3→4× 가속**: 일반 DRAM 캐파 잠식이 가속 → 범용 DRAM 수익성 회복([price-trends.md](wiki/concepts/price-trends.md))
- **DDR 마진이 HBM 계약 수준 근접**: [RS2 바벨 포트폴리오](wiki/strategies/invariant/rs2-barbell-portfolio.md)의 "저원가 범용" 축 수익 회복 → RS1·RS5 호황기 절제 재검토 필요
- **Samsung HBM4 성능 우위·SK 안정성 우위**: 두 우위가 평행하게 존재 — Main Bet(시나리오 B) NVIDIA 인증 회복 노력의 명분 강화
- **Kioxia BiCS10 332L**: NAND 적층 경쟁에서 4파전 강화. YMTC hybrid bonding IP 종속 리스크([RS7](wiki/strategies/invariant/rs7-ai-engineering-automation.md))와 별개로 한·미·중·일 모두 진척.

**의도적 미반영**:
- dashboard `COMPETITIVE_LANDSCAPE.micron.hbmShare` 등 수치 미러는 UBS 추정 그대로 유지. SemiAnalysis 분석과 충돌하지만 dashboard에 두 출처를 동시에 표기하기 어렵기 때문. 위키에 양쪽 모두 기록하고 분기점에서 재검토.
- `wiki/entities/nvidia-cmx-scada.md` 미갱신 — CMX·SCADA 자체에 새 사실 없음. 일반 NVIDIA 정보는 [nvidia.md](wiki/entities/nvidia.md)에 반영.
- 시나리오·전략 페이지 미갱신 — 본 ingest는 사실 갱신 위주, 시나리오 재가정/전략 변경은 별도 lint·query 세션에서 다룸.

**검증** (다음 단계):
- `cd dashboard && npm run build` — dashboard 코드 변경 없으므로 이전 빌드 그대로지만 정합성 확인 위해 실행
- `python3 outputs/presentation/scripts/generate_pptx.py` — PPTX는 위키 합성이 아니라 slide-outline 기반이라 변동 없음. 그래도 재생성으로 확인.

---

## [2026-05-18] migration | wiki/entities 확장 (china-competitors 분리 + samsung/nvidia/tsmc 신설)

마이그레이션 종결 작업. CLAUDE.md §10 후속 항목 정리.

**china-competitors 분리**:
- `wiki/entities/cxmt.md` 신규 — CXMT DRAM 전문 entity. 생산 용량, DDR5 기술, 자립 로드맵, 삼성 시사점
- `wiki/entities/ymtc.md` 신규 — YMTC NAND 전문 entity. Xtacking, hybrid bonding IP 지배, 3공장 DRAM 전환
- `wiki/entities/china-competitors.md` — 그룹 인덱스로 재작성 (빅펀드 III, 허페이 모델, 5개년 계획 공통 컨텍스트 유지). cxmt/ymtc로 링크.

**신규 entity (위키 내 분산 정보 통합)**:
- `wiki/entities/samsung.md` — 본 위키의 분석 주체. Q1 2026 매출 $50.4B, HBM 점유 35%(Q3 2025)→28%(Rubin), 1c nm 수율, Texas CHIPS $4.745B, 정보 공백(영업이익률·NAND DC 비중·SLC AI SSD)
- `wiki/entities/nvidia.md` — 일반 NVIDIA(CMX/SCADA는 별도). Rubin HBM4 점유 분포(SK 70/Sam 28/Mic 18), AI CapEx $725B, Stargate Korea LOI, 4가지 충격(세대 강제·co-design 락인·CMX·SCADA)
- `wiki/entities/tsmc.md` — 직접 경쟁자 아님. Nx·Nx+ enhancement 패턴(RS7 영감), CHIPS Act $6.6B 비교 기준, HBM 베이스다이 외주, Samsung Foundry 비교 baseline

**보류**: `intel.md`(18건), `amd.md`(6건), `broadcom.md`(0건) — wiki 내 정보 빈약, 외부 자료 없이 신설하면 빈약한 페이지가 위키 가치 해침. 다음 ingest에서 외부 자료 들어올 때 신설.

**기타**:
- `PLAN.md` 삭제 — 위키화 이전 디렉토리 구조·서브에이전트 설계 담은 초기 계획. CLAUDE.md가 모두 흡수했고 디렉토리 매핑이 옛 것이라 가치 없음. 필요 시 git history에서 회수.
- CLAUDE.md §10 잘못된 lint 항목("슬라이드 25매 → 29매 정정") 제거 — 본문에 25매 박힌 곳 없음. 마이그레이션 기록 오류.

**dashboard 경로 갱신**:
- 5곳의 `wiki/entities/china-competitors.md` 참조 → `wiki/entities/cxmt.md, wiki/entities/ymtc.md` 평문 나열로 갱신 (Strategies.jsx, strategies.js, indicators.js, visualizations.js 2곳)

**검증**:
- `cd dashboard && npm run build` (별도 확인 예정)
- `python3 outputs/presentation/scripts/generate_pptx.py` (별도 확인 예정)

---

## [2026-05-18] migration | sources/raw 24개 파일을 wiki/entities·concepts로 재배치

§7-1(a) "엄격 분리" 결정 후 실제 데이터를 보니 sources/raw/의 파일들은 이미 "표·수치+해석"이 통합된 정리 노트였음. 진짜 외부 원본은 IR PDF·웹 URL로 레포 밖에 있고 sources/raw/는 사실상 위키의 첫 버전. 따라서 a 옵션의 정신을 살리기 어려워 사용자 재확인 후 "파일 통째로 wiki/로 이동 + sources/는 외부 출처 카탈로그" 전략으로 전환.

**git mv (24개)**:
- `sources/raw/competitors/` → `wiki/entities/` (sk-hynix, micron, china-competitors) + `wiki/concepts/dram-market-share.md`
- `sources/raw/technology/nvidia-cmx-scada.md` → `wiki/entities/`
- `sources/raw/market/`, `macro/`, `policy/`, `technology/` 의 나머지 19개 → `wiki/concepts/`
- `sources/raw/metadata.md` → `sources/README.md` (외부 출처 카탈로그로 재작성)
- 빈 `sources/raw/` 하위 디렉토리 정리

**dashboard 경로 의존성 추가 갱신**:
- `dashboard/src/data/{indicators,visualizations}.js` 의 옛 `data/{competitors,market,macro,policy,technology}/` 주석 → 새 wiki 경로로 sed 일괄 치환
- `dashboard/src/components/Strategies.jsx`의 brace 표현 `{sk-hynix,micron,...}.md`는 PATH_REGEX 호환을 위해 평문 나열로 풀어씀
- `SourceLink.jsx` 주석 예시 갱신

**검증**:
- `cd dashboard && npm run build` ✓ (2.9s)
- `python3 outputs/presentation/scripts/generate_pptx.py` ✓ (29매, 540KB) — 스크립트의 `ROOT = ../../` 우연히 outputs/와 잘 맞아 경로 수정 없이 작동
- index.md 재생성: wiki/entities 4 + wiki/concepts 19 카탈로그 채움

**다음 ingest에서 분리 후보**:
- `wiki/entities/china-competitors.md` → `cxmt.md`, `ymtc.md`로 분리
- 신규 entity: `samsung.md`, `nvidia.md` (CMX/SCADA 외 일반), `tsmc.md`, `intel.md`, `amd.md`, `broadcom.md`

**lint에서 확인 필요**:
- CLAUDE.md §4·§5에 슬라이드 25매라고 적혀있지만 실제 PPTX는 29매. 옛 정보로 보임 — 다음 lint에서 정정.

---

## [2026-05-18] migration | LLM Wiki 모델로 레포 재구성

karpathy의 [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) 아이디어에 맞춰 레포를 3계층 구조로 재편.

**변경된 디렉토리 (git mv, 이력 보존)**:
- `analysis/steep/` → `wiki/steep/`
- `analysis/driving-forces/` → `wiki/driving-forces/`
- `analysis/scenarios/` → `wiki/scenarios/`
- `analysis/benchmark/` → `wiki/benchmark/`
- `report/core-strategies/` → `wiki/strategies/core/`
- `report/invariant-strategies/` → `wiki/strategies/invariant/`
- `report/scenario-planning-report.md` → `outputs/report/scenario-planning-report.md`
- `report/assets/` → `outputs/report/assets/` (빈 디렉토리 재생성)
- `presentation/` → `outputs/presentation/`
- `data/` → `sources/raw/` (다음 세션에서 articles/filings/papers/raw-notes로 분리)

**dashboard 경로 의존성 갱신**:
- `dashboard/src/components/SourceLink.jsx` PATH_REGEX 화이트리스트 `(data|analysis|report|presentation|working-style)` → `(sources|wiki|outputs|dashboard|working-style|slides)`
- `ScenarioPlanning.jsx`, `Strategies.jsx`의 source prop 19곳, `scenarioPlanning.js`·`strategies.js` 주석 일괄 치환

**신규 파일**:
- `CLAUDE.md` (위키 관리자 헌법으로 전면 재작성)
- `index.md` (위키 전체 목차)
- `log.md` (이 파일)

**다음 세션 작업**:
- `sources/raw/` 25개 파일을 sources/{articles,filings,papers,raw-notes}/로 파일 단위 분리. 동시에 인용·원본 텍스트는 sources에 두고 해석·요약은 `wiki/entities/`·`wiki/concepts/` 신규 페이지로 추출.
- `PROMPT.md` (43KB) → `log.md`로 의미 단위 변환 후 PROMPT.md 삭제
- 빌드 검증: `python3 outputs/presentation/scripts/generate_pptx.py` 경로 점검, `cd dashboard && npm run build` 통과 확인 후 push

**결정 사항 (이 마이그레이션의 합의 옵션)**:
- §7-1: data/ 엄격 분리 (a) — 실제 데이터 확인 후 "파일 통째로 wiki/로 이동"으로 재합의
- §7-2: dashboard는 최상위 유지 (Vercel 빌드 루트)
- §7-3: PPTX 변형 4종은 outputs/presentation/scripts/에 그대로 보존
- §7-4: PROMPT.md (a) — log.md로 변환·구조화 후 삭제

---

> 아래 항목들은 위키화 이전 `PROMPT.md`(528줄, 43KB)에서 의미 단위로 압축 추출한 작업 로그다. 자세한 산출물은 wiki/·outputs/·dashboard/에 이미 반영되어 있고, 원본 PROMPT.md는 변환 완료 후 삭제됨(필요 시 git history에서 회수).

## [2026-05-07] build | 세미나 슬라이드 통합 (SKILLS + CONNECTORS)

`working-style/seminar-claude-code-report/seminar-claude-code.pptx` 25매 → 27매. SLIDE 12 SKILLS(좌: SKILL.md 해부 코드패널, 우: Anthropic 번들 4칩 + 슬래시 6종 카드) + SLIDE 13 CONNECTORS(좌: `claude mcp add` 패널, 우: 디렉토리 카테고리 6 + SECURITY 콜아웃). HARNESS 트랙 12매, 발표시간 60→65분. 페이지 카운터·아젠다·표지 전반 renumber. `slide-outline.md` v3.2 동기화.

## [2026-05-07] build | Claude Code 스킬·커넥터 단독 슬라이드 (slides/seminar/)

세미나 자료에 (1) Claude Code 기본 스킬, (2) 커넥터 각 1장 신규. 학습 데이터 outdated 가능성 → 공식 문서 4종(`code.claude.com/docs/en/skills`, `/mcp`, `claude.com/connectors`, `github.com/anthropics/skills`) WebFetch로 최신 사양 직접 확인. 결과: Bundled Skills 6종(`/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api`, `/fewer-permission-prompts`), 공식 번들 4종(docx/pdf/pptx/xlsx), MCP 추가 명령(HTTP/SSE/stdio). 산출: `slides/seminar/{scripts,assets}/`, `claude-code-{skills,connectors,skills-and-connectors}.pptx`. `.gitignore`에 `!slides/seminar/*.pptx` 예외 추가.

## [2026-05-06] build | Figma 폐기 + 사용 정책 정립

요청: "피그마는 좀 복잡하고 화려한 시각화가 필요할 때 한번씩 불러다 쓰면 괜찮겠다. 일단 생성 파일들을 제거해줘". `memory/feedback_figma_usage.md`에 정책 등록 — Figma는 일회성 복잡·화려 시각화 전용, 일반 PPTX 빌드(변경 정합성 체인 표준 경로)에는 끼우지 않음. 매번 호출하기엔 Starter 한도와 PNG export 추가 단계가 자동화에 부적합. 로컬 Figma 산출물 git rm. 표준 빌드는 `presentation/scripts/generate_pptx.py` (matplotlib + python-pptx, 26슬라이드) 유일 경로.

## [2026-05-06] build | PPTX 미화 Figma 하이브리드 (Gamma 폐기)

피드백: "Gamma는 별로". `memory/feedback_no_gamma.md` 저장(PPTX 미화에 Gamma MCP 금지). 대신 Figma 도입 시도 — Figma 디자인 파일(1920×1080 hero 10매) 생성, Plugin API로 디자인 시스템 적용. Figma Starter rate limit 도달로 슬라이드 1~3만 PNG 추출 성공. 하이브리드 빌드 `generate_pptx_figma.py`로 (1~3: Figma PNG, 4~10: python-pptx 네이티브) 175KB 10슬라이드 출력. 한도 reset 후 통일 가능 — 단 다음 세션 피드백으로 폐기.

## [2026-05-06] ingest | NAND 공정 전환 주기 연장 R&D 전략(RS7) — 변경 정합성 체인 첫 적용

CLAUDE.md "변경 정합성 체인" 규칙의 첫 실행 사례. 한 번의 지시로 data → analysis → strategy → report → presentation → dashboard → 빌드 검증 → push까지 일관 흐름. (1) `data/technology/nand-process-transition.md` 신규(TrendForce·Tom's Hardware·Yole·Knowmade·Weber/PSU 8개 출처) — 4사 layer 로드맵, 2026 NAND capex \$22.2B(+5%) capa보다 process upgrade 집중, 학습곡선(ramp 6M 단축 = 이익 2배, 6M 지연 = 이익 2/3 소실), YMTC가 hybrid bonding 핵심 IP 지배 → 라이선스 종속 리스크. (2) `analysis/steep/technology.md`에 7b 신규 요인 추가. (3) `strategy.md`에 **RS7 신규 추가** + 4 R&D 트랙(Hybrid Bonding 자체 IP, Multi-deck 정교화, bit-per-cell 확장 QLC→PLC, FDP·SCADA firmware) + 4 KPI + TSMC "Nx·Nx+·Nx++" enhancement 메모리 적용. (4) 보고서 갱신. (5) 발표자료 25→26슬라이드, 슬라이드 22 RS7 신규. (6) `DecisionTracker.jsx` D10 신규 + EWI 4개(`nand_layer_cycle_months`, `hybrid_bonding_own_ip_share`, `nand_yield_ramp_time_months`, `nand_capex_per_bit_growth`). (7) commit + push → Vercel 자동 배포.

## [2026-05-06] build | 세미나에 자동화 워크플로우 슬라이드 2매 추가 (v3.1)

요청: "이런 자동화는 소중하니까 세미나에 추가". 23 → 25매. SLIDE 23 (CONSISTENCY): 변경 정합성 체인 두 갈래 다이어그램(PPTX + 대시보드 → git push → GitHub + Vercel) + ASCII 트리 풀 체인. SLIDE 24 (RULE): 자동화 보존 — CLAUDE.md "변경 정합성 체인" 발췌 + 마무리 5단계 + 사전 승인 범위. closing 23→25. 시간 배분 60분 유지(이론 25 + 실전 25 + Q&A 7). 표지·page counter `/25` 일괄 갱신.

## [2026-05-06] ingest | 변경 정합성 체인에 대시보드 + Vercel 배포 추가

요청: "대시보드 업데이트하는 것도 추가해줘. vercel에 배포하는 것 까지!" CLAUDE.md 신설 섹션 "EWI 대시보드"에 단일 소스 → 동기화 매핑 표 4행, 로컬 빌드 검증 명령, GitHub push → Vercel 자동 배포 흐름, `vercel.json` 설명. 변경 정합성 체인 다이어그램 "두 갈래" 구조로 확장(① PPTX, ② 대시보드+Vercel). 마무리 5단계로 확장(PPTX → 대시보드 빌드 → commit → push → Vercel 확인). 사전 승인 범위 명확화 — Vercel 환경변수 변경은 매번 별도 확인.

## [2026-05-06] ingest | 변경 정합성 체인 규칙 추가 (CLAUDE.md)

요청: "데이터/상황/전략/보고서 모든 변경에 대해 지속적으로 정합성을 맞춰야 하고 최종적으로 PPTX 생성까지 해서 깃에 푸쉬하도록 규칙 추가". CLAUDE.md 신설 섹션 "변경 정합성 체인 (Continuous Consistency)" — data → analysis → strategy → report → slide-outline → generate_pptx.py → PPTX → commit + push 다이어그램. 변경 단계별 갱신 매핑 6행. 마무리 4단계. 자동화 원칙: 한 번 지시로 영향 범위 끝까지 추적, 영향 없는 단계는 명시적 건너뛰기, push 전 빌드 검증. **사전 승인 범위**: 본 체인의 commit + push만 사전 승인. force push·branch 삭제·history rewrite는 별도 확인.

## [2026-05-06] build | 세미나 자료 v3 — 신설 트랙만 + 라이트 개발자 테마

피드백: 신설 두 트랙(00 하네스, 04 케이스)만 + 논리적 연결 + 라이트 개발자 색감. 34 → 23매(60분: 이론 25 + 실전 22 + Q&A 10). 제거: Claude Code 정의·Why·6 컴포넌트(13~21), Lessons·Ecosystem(32~33), `componentSlide` 헬퍼. 라이트 테마 토큰: bg `#FFFFFF`, panel `#F8FAFC`, primary 인디고 `#4F46E5`, secondary 핑크 `#EC4899`, 본문 `#0F172A`, border `#E2E8F0` slate-200. 표지 "AI Harness / Engineering." 부제 "보고서 워크플로우 — 이론에서 실전까지". AGENDA 3행 큰 카드. 트랙 다리: 슬라이드 12 끝 캡션과 13 시작 캡션이 5블록·5원칙 역참조. 출력 734KB 23슬라이드.

## [2026-05-06] build | 세미나 자료 v2 — Harness Engineering + 케이스 스터디 (34매)

확장 요청: AI 하네스 엔지니어링 개요 10페이지 + 시나리오 플래닝 케이스 10페이지. 16 → 34매. 트랙 00 HARNESS(슬라이드 3~12): 하네스 정의, LLM vs Harness 비교, 5 빌딩 블록(Tool/State/Context/Subagent/Loop), 에이전틱 루프, 컨텍스트 엔지니어링, 서브에이전트 3패턴(Researcher/Specialist/Critic), 도구 위계 + 권한, 영속성 4레이어, Claude Code 위치도, 설계 원칙 5. 트랙 04 CASE(22~31): 케이스 개요, 첫 프롬프트 + 6단계 자동 계획, 디렉토리 트리, CLAUDE.md 발췌, 6 서브에이전트 표, metadata.md 발췌, STEEP 깔때기 + key-drivers, scenario-matrix Mermaid + 렌더링, strategy 벤치마크 매핑, report→outline→PPTX 파이프라인. 시간 75→105분(90 단축안 병기). `generate-pptx.js` 보강(헬퍼 `harnessTitle`, `captionFoot` 추가). 출력 1.0MB.

## [2026-05-06] build | 세미나 PPTX 템플릿 적용 재작성 (v1, 16매)

`tutorial-template.pptx` (AI Harness Engineering 16매) 디자인 시스템 적용. 28 → 16매. LAYOUT_WIDE 13.33×7.5", 다크 네이비 `#0B1220`, 시안 `#22D3EE` 강조, 앰버 `#FBBF24` 보조. Cover → Agenda → Definition → Why → Core Capabilities 6 → Component 01~06 → End-to-end → Live Demo → Lessons → Ecosystem → Q&A. `generate-pptx.js`로 pptxgenjs 재현. Keynote 시각 검증 통과.

## [2026-05-06] ingest | 슬라이드 7 — 호황 지속 시나리오 추가

피드백: "다운턴 대비도 중요하지만 호황을 최대한 누리기 위한 전략도 고민". 가설 A를 다운턴이 2030년 이후 와서 호황 지속되는 시나리오로 변경. 색상 톤 긍정적 green. 제목·서브타이틀 "호황 지속도, 다운턴도 모두 모름"으로 조정.

## [2026-05-06] lint | RS 전략 팩트 체크 + 슬라이드 논리 재구성

피드백 5가지: (1) 모든 Robust Strategy를 데이터로 검증 — CMX(기존 SSD 대응 가능성 vs 신제품군), SCADA(시장 규모·지속성), FDP(구글 호스트 SW 공동개발 → 유료 판매). (2) 슬라이드 14 시나리오 매트릭스 크기 조정(슬라이드 영역 초과). (3) 슬라이드 22 EWI: 지난 2년 사분면 위치 변화 시각화 + 현재 마커. (4) 슬라이드 24 전략 리마인드 — Main/Side/Robust 각 3~4단어 요약 + 해결 문제 연결. (5) **모든 슬라이드 제목 + 핵심 메시지의 논리 연결** — 제목과 메시지를 이어 읽으면 그 자체로 강력한 논리적 주장이 되도록 흐름 재설계.

## [2026-05-06] build | 발표자료 9단계 논리 흐름 (템플릿은 테마만)

피드백: 템플릿 슬라이드 구조 그대로 따르지 말고 **테마(색상·폰트)만 활용**, 9단계 논리 흐름으로 재구성. ① 현재 상황(메모리 사이클 산업, 업턴 지금 준비) ② 불확실성(언제·얼마나 큰 다운턴) ③ 시나리오 플래닝 정당화(Shell 등 최악 극복 사례) ④ 방법론 소개(워크플로우) ⑤ 메모리 시나리오 플래닝 적용(단계별 1~2 페이지) ⑥ Robust 전략 3~4개 상세(시각화 공들임) ⑦ 모니터링 대시보드 ⑧ 전략 리마인드 + 문제 해결 가능 강조 ⑨ 최종 메시지 클로징. → slide-outline.md 재작성 + 새 generate_pptx.py(테마 추출, 함수형) + matplotlib 차트.

## [2026-05-06] ingest | 전반적 개선 + 발표자료 최종화

요구사항 7개: ① 자료조사 강화(현재 경영 상황 정확 판단, 그래프용 데이터 — slide-outline에 반영) ② 벤치마크 활용(`analysis/benchmark/` → strategy → report → slide-outline 반영) ③ 템플릿 활용(`presentation/template.pptx`) ④ PPTX 최종 산출 ⑤ PROMPT.md 로깅 ⑥ Git 커밋 ⑦ 대시보드 개선(트리거·UI/UX·콘텐츠·디자인).

## [2026-05-05] build | 세미나 자료 생성 ("클로드 코드와 함께 보고서 만들기")

`working-style/seminar-claude-code-report/` 신규. `content.md` 8개 섹션(취지, Claude Code 개요, 핵심 개념, 워크플로우, 사례, 베스트 프랙티스, 환경 설정, Q&A). `slide-outline.md` 28슬라이드 + 발표자 가이드. 딥 네이비 `#0D1B2A` + 클로드 오렌지 `#E07B39` + 민트 그린 `#4ECDC4` 디자인. 12개 [데모] 슬라이드 화면 캡처 지정. 90분 타임테이블 + 데모 체크리스트 + 인터넷 불안정 대비 플랜 B. 비기술자 청중 대상.

## [2026-05-05] ingest | 대규모 멀티파일 수정 (7파일)

(1) README.md: Canva 제거. (2) CLAUDE.md: Canva 참조 제거, Mermaid 가이드 추가. (3) report/scenario-planning-report.md: Executive Summary에 AI 개발 효율화 섹션, 숫자 형식 억→B 전환($5,516억→$551.6B), 약어 각주(VEU/MATCH/BIS/P&L/FCF/EWI), 시나리오 매트릭스 ASCII→Mermaid, MB-4에 CMX/SCADA, 포트폴리오 매트릭스 ✅ 기준 강화, Decision 2 "HBM 사업부 독립 P&L" 제거, 8.2 Call to Action 부문별 재작성. (4) strategy.md: RS6+RS7 단일 전략 병합, RS 상호의존 Mermaid, CMX/SCADA 보강. (5) data/competitors/ 4파일 경쟁사 투자 전략 벤치마킹(서브에이전트). (6) slide-outline.md 전 슬라이드 변경 반영. (7) PROMPT.md 누적 로깅.

## [2026-05-05] feedback | Notion 업데이트 정책 변경

요청: "노션 업데이트는 필수 아냐. 시킬 때만". `memory/feedback_notion_updates.md` 저장. 자동 동기화 금지, 명시적 요청 시에만 업데이트.

## [2026-05-05] ingest | NVIDIA CMX·SCADA 데이터 + 전략 반영

요청: 메모리·SSD 기업 입장에서 중요한 NVIDIA CMX/SCADA 추가. `data/technology/nvidia-cmx-scada.md` 신규(CMX KV 캐시 오프로드 BlueField-4, SCADA GPU 네이티브 스토리지 2.3억 IOPS, AI SSD 경쟁 구도). `data/metadata.md` 16개 항목. strategy.md MB-4 CMX 에코시스템 참여, RS3 사례 4 SCADA AI SSD. report SWOT 업데이트, STEEP 섹션 3.4 신설.

## [2026-05-05] ingest | Bet 전략 심화 (7개 방향)

전략 보고서 Bet 전략 부분 수정 요청 — (1) 옵션형 캐파(고정 증설 아닌 장비 반입 시점·mix 전환권 단계화), (2) HBM 초과이익 재투자 원칙 명문화(배당·외형 X, 원가·수율·패키징·테스트 시간 단축), (3) 고객 포트폴리오 의도적 분산(협상력 tier화, take-or-pay 계약), (4) 바벨 포트폴리오(HBM/커스텀 ↔ 저원가 범용, 중간 제품 축소, AI 자동화로 남는 인력 → PC/Mobile/Auto 유지), (5) 정책 리스크 지역 분산(규제별 SKU, 합작투자 SanDisk+Kioxia 모델), (6) 재무 규율 제도화(재고일수 상한, 장기계약 없는 증설 제한, EBITDA→현금흐름, 피크 capex 기준 강화), (7) 고객특화 기능(FDP·HBM 베이스다이 커스텀 로직, AI 개발 효율화가 모든 전략의 선행 조건).

## [2026-05-05] feedback | Canva 중단 → Notion 프로젝트

요청: "캔바로 프리젠테이션 만드는 것 중단. 노션에 프로젝트 만들어서 마크다운 문서 활용". Notion 메인 허브 페이지 + 전략 보고서 + 전략 권고안 + 슬라이드 아웃라인(1-12, 13-25) 페이지 생성.

## [2026-05-05] migration | 프로젝트 시작 — 목표·방법론·산출물 정의

초기 지시(PROMPT.md 헤더). 목표: 삼성전자 메모리사업부의 일원으로 불확실성 대응 전략 발표자료. 방법론: Shell 시나리오 플래닝(Focal Issue → STEEP 브레인스토밍 → Driving Forces → Uncertainty 2~3개 선별 → 시나리오 도출 → Main Bet + Side Bet → Robust). 산출물: ① 데이터 수집 + 메타데이터 ② 시나리오 플래닝 기반 전략 보고서(마크다운, 시각자료 별도 디렉토리) ③ 슬라이드 기획서 ④ PowerPoint. 주요 지침: 역할별 서브에이전트 생성, PROMPT.md 누적 기록, git/GitHub 공유, PowerPoint 제외 모두 마크다운.
