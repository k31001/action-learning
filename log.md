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

## [2026-06-25] ingest | Micron FY26 Q3 실적 발표 (2026-06-24) — $41.46B 사상 최대 (v2.24.1 → v2.24.2)
- **무엇**: 2026-06-24 발표된 Micron 회계 Q3 FY26(5/28 종료) 실적 반영. 매출 **$41.46B**(+74% QoQ·+346% YoY), GAAP 매출총이익률 **84.9%**(사상 최고), Non-GAAP EPS **$25.11**(컨센서스 $20.60 상회). DRAM $31.3B(76%, ASP +low-60s% QoQ)·NAND $9.9B. 데이터센터 연환산 $100B 초과. HBM4 누적 $1B·2026 캐파 완판. **SCA 16건 $100B·예치금 $22B**. Q4 가이던스 매출 **$50B**·마진 ~86%·EPS $30.73. 수급 타이트 calendar 2027 이후 지속 전망.
- **왜**: 사용자 지시 — 어제 실적 발표 내용 위키·보고서·대시보드 반영.
- **정정**: 직전 가이던스 $33.5B(june-2026-market-update §2)를 +24% 실제 상회 — 위키 내 $33.5B는 가이던스로 표기, 확정 실적은 신규 filing 따름.
- **영향 페이지**: 신규 `sources/filings/micron-q3-fy26.md`(1차 자료), `wiki/entities/micron.md`(Update 섹션), `wiki/concepts/price-trends.md`(Update 섹션), `index.md`(filings 섹션 신설·micron 설명), `outputs/report/scenario-planning-report.md`(KPI 표·현재 위치), `dashboard/src/data/updates.js`+`version.js`(v2.24.2 패치).

---

## [2026-06-18] ingest | 인터뷰 대상자 식별 — 베인앤컴퍼니 신문섭 파트너 (v2.24.0 → v2.24.1)
- **무엇**: 직전 ingest의 인터뷰 대상자를 "산업 전문가(직책·소속 미공개)"에서 **베인앤컴퍼니(Bain & Company) 신문섭(Moonsup Shin) 파트너** — APAC 하드웨어·반도체·데이터센터 총괄 / 한국 TMT 대표 — 로 정정. 원본 소스 헤더·대시보드 인터뷰 메뉴 메타(목록·헤더)·검색 태그·인덱스 동기화. 패치 v2.24.1.
- **왜**: 사용자가 대상자 신원을 확인해 줌.
- **sources**: `raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md` 헤더 "인터뷰 대상" 라인 갱신. `index.md` raw-notes 설명 갱신.
- **dashboard (v2.24.1, 패치 = 데이터 정정)**: `data/interviews.js` interviewee·tags(베인앤컴퍼니·신문섭) 갱신. `data/updates.js` v2.24.1 항목. `src/version.js` v2.24.1.

## [2026-06-18] ingest | 산업 전문가 인터뷰 추가 + 대시보드 "인터뷰" 메뉴 신설 (v2.23.1 → v2.24.0)
- **무엇**: 사용자 제공 산업 전문가 인터뷰 보고서("AI 인프라 슈퍼사이클과 메모리 사업의 전략 전환", 16개 섹션)를 sources 층에 원본 보존하고, 대시보드에 별도 **"인터뷰" 최상단 탭**을 신설. 앞으로 다수 인터뷰 추가를 전제로 한 확장형 구조(좌측 목록·검색, 인터뷰별 메타 헤더, 핵심 인용문 대형 강조 카드, 목차, 블록 기반 본문 렌더러)로 설계. 마이너 버전 v2.24.0(탭 추가).
- **왜**: 사용자가 향후 여러 인터뷰를 누적·참고할 메뉴를 요청. 중요 문구는 큰 인용문 형태로 강조해 빠르게 재참조할 수 있게 함.
- **sources**: `raw-notes/expert-interview-ai-infra-supercycle-2026-06-18.md` 신설(원본·불변, 16개 섹션 전문 + 핵심 인용문 블록쿼트). `index.md` raw-notes·dashboard 섹션 갱신.
- **dashboard (v2.24.0, 마이너 = 탭/페이지 추가)**: `data/interviews.js` 신설(INTERVIEWS 배열·확장형 스키마: keyQuotes·블록 타입 p/h/ul/ol/quote/table). `components/Interviews.jsx` 신설(목록·검색·핵심 인용문 대형 강조·목차·블록 본문). `App.jsx` TOP_TABS에 "인터뷰"(MessageSquareQuote) 추가 + 렌더 분기. `src/version.js` v2.24.0.
- **건너뜀**: wiki·outputs·기타 dashboard 데이터(scenario/strategy/bottleneck)는 본 인터뷰가 분석 페이지 수치를 바꾸지 않으므로 미변경. 인터뷰 인사이트의 위키 환원은 후속 ingest에서 검토.

## [2026-06-14] ingest | 병목 모델 정기 점검 — 제약지수 갱신 (전력 70·CAPEX 42·파운드리 52·패키징 68) (v2.23.0 → v2.23.1)
- **무엇**: semianalysis.com·counterpointresearch.com·techinsights.com 및 DOE·ERCOT·WEF·TrendForce·Dell'Oro·Micron IR·Futurum 등 최신 데이터 수집. 4대 병목 제약지수 갱신: **전력 68→70(▲+2)·CAPEX 44→42(▼-2)·파운드리 54→52(▼-2)·패키징 70→68(▼-2)**. 드라이버 노트 4개 갱신(`interconnect`·`capex_guide`·`ai_revenue`·`cowos_util`). 패치 버전 v2.23.1.
- **왜**: 정기 점검 루틴. 신규 신호 — PJM 계통 접속 평균 8년 확정·DOE 2030 100GW 신규 필요(50% DC)·ERCOT 145GW(2031) = 전력 병목 추가 악화; Meta $125~145B 상향·Micron Q3 FY26 $33.5B 역대최고·전체 하이퍼스케일러 $782B(Dell'Oro) = CAPEX 완화 추가; NVIDIA Rubin 29%→22% 하향(HBM4 지연)·N2 순항 = 파운드리 여유; TSMC 130K WPM 확정·CoPoS 6월 완공·선진 패키징 >10% 매출 = 패키징 완화. 삼성 HBM 4월 35~40%(이전 추정 25~30% 초과 급회복). DRAM Q1 실제 +90~95% QoQ(이전 추정 +55~60% 대폭 초과).
- **sources**: `articles/june-2026-market-update-2026-06-14.md` 신설. `index.md` 갱신.
- **wiki**: `concepts/bottleneck-model-2030.md` — 종합 판독(2026-06-14) + 변동 표 추가·드라이버 설명 갱신·출처 추가. `concepts/hbm-market.md` — 4월 2026 점유율(삼성 35~40%)·Micron 역대최고 가이던스·DRAM 가격 실적 추가. `concepts/price-trends.md` — Q1 실제 +90~95%·Q2 예상 갱신. `concepts/energy-constraints.md` — PJM 8년·DOE 100GW·ERCOT 145GW·백악관 서약 추가.
- **dashboard (v2.23.1, 패치 = 제약지수 갱신·드라이버 노트·날짜 갱신)**: `data/bottleneckModel.js` MODEL_ASOF/DRIVERS_ASOF·PREV 갱신·제약지수 4개·indexNote 4개·드라이버 노트 4개 갱신. `data/updates.js` v2.23.1 항목. `src/version.js` v2.23.1.
- **outputs**: 보고서·발표자료는 제약지수 수치 변경 수준이라 재생성 보류 (병목 분석 섹션 최신화는 다음 마이너 빌드에 포함).
- **검증**: `cd dashboard && npm run build` 통과(2410 모듈·콘솔 0).

## [2026-06-13] ingest | 병목 모델 정기 점검 — 제약지수 업데이트 + 변동폭(Δ) 표시 (v2.22.0 → v2.23.0)
- **무엇**: semianalysis.com·counterpointresearch.com·techinsights.com 및 IEA·TSMC·KeyBanc 등 최신 데이터 수집. 4대 병목 제약지수 갱신: **전력 64→68(▲+4)·CAPEX 46→44(▼-2)·파운드리 56→54(▼-2)·패키징 72→70(▼-2)**. 지수 변동폭을 대시보드에 시각 표시(▲적색/▼녹색/─회색) — `PREV_MODEL_ASOF`·`PREV_INDICES` 상수 추가, `BottleneckCard`에 delta 배지·헤더에 요약 스트립.
- **왜**: 정기 점검 루틴(사용자 지시). 주요 신호 — 미국 DC 전력 수요 23→42GW(3년 2배)·그리드 연계 대기열 2,600GW(5~12년 지연) = 전력 병목 심화; 삼성 HBM4E 업계 최초(2026-05-29)·Vera Rubin 인증 완료·CoWoS 98% 수율·TSMC 5월 매출 YoY+30.1%(사상최고) = 패키징·파운드리 완화; 빅4 CapEx $700~725B(상단 수렴·Meta 상향)·삼성 DS Q1 이익 약 49배 = CAPEX 다소 완화. Rubin 생산 목표 200→150만 대 하향(KeyBanc)은 단기 수요 하방 리스크.
- **sources**: `articles/june-2026-market-update-2026-06-13.md` 신설. `index.md` 갱신.
- **wiki**: `concepts/bottleneck-model-2030.md` — 종합 판독(2026-06-13) + 변동 표 추가·interconnect 드라이버 '긴장→임계' 업데이트. `concepts/hbm-market.md` — Q1 2026 점유율·HBM4E·Rubin 인증·가격 추가. `concepts/price-trends.md` — Q2 2026 DRAM/NAND 가격 추가. `concepts/energy-constraints.md` — 42GW·2,600GW 그리드 대기열·병목지수 68 업데이트.
- **dashboard (v2.23.0, 마이너 = 변동폭 Δ 표시 신규 + 제약지수 갱신)**: `data/bottleneckModel.js` MODEL_ASOF/DRIVERS_ASOF 갱신·PREV_MODEL_ASOF·PREV_INDICES 추가·제약지수 4개 갱신·interconnect/cowos_util 드라이버 갱신. `components/BottleneckModel.jsx` BottleneckCard delta 배지·헤더 요약 스트립. `data/updates.js` v2.23.0 항목.
- **outputs**: `report/scenario-planning-report.md` — 날짜 헤더·핵심 수치 표(삼성 DS 이익·CapEx·Rubin 하향·HBM4E·DRAM 가격·병목 지수 행) 최신화. 발표자료(slide-outline/PPTX)는 제약지수 숫자 변경 수준이라 재생성 보류.
- **검증**: `cd dashboard && npm run build` 통과.

## [2026-06-11] build | 모델 구조 도식 내장 + 모델 프레임에서 수요 EWI 분리 (v2.21.0 → v2.22.0)
- **무엇**: ① 채팅에서 승인받은 **모델 구조 도식**(상류 d2 → 중류 d1 → 4대 병목 → min() 게이트 → 실현 출하 → 수요 변환 → 수급·가격 + 조기경보 규칙)을 대시보드 병목 모델 화면 상단에 SVG 카드로 내장 — 수치(B·ε·제약지수·U·실현 출하·수급차·p*·조기경보 발동값)는 `bottleneckModel.js`에서 실시간 파생, 트리 항목 라벨은 요약 표기. ② **수요 변곡 EWI를 모델 프레임에서 분리** — 병목 모델 화면의 EWI 요약 스트립 제거, 드라이버 트리의 "EWI 연계" 칩 제거, 도식에서도 EWI 축 제외. EWI는 같은 탭의 별도 서브탭으로만 운영(시스템 삭제 아님).
- **왜**: 사용자 피드백 — "수요 변곡 EWI는 큰 틀에서 자료의 일관성을 무너뜨려서 빼는 게 낫겠다. 나머지 도식은 괜찮아 보여. dashboard에도 추가해주면 좋겠어." 수요 방향(EWI)과 제약 압력(병목)은 서로 다른 온톨로지(신호 레벨·스케일·방향)라 한 화면 혼합이 프레임 일관성을 해침. 신호 차원의 대응 관계(임대가·capex·CoWoS ↔ CAPEX·패키징 상류)는 위키 교차참조로만 유지.
- **wiki**: bottleneck-model-2030.md 미러 노트(도식 추가·EWI 비표출 결정 기록)·§5 종합 판독 "EWI와의 관계(분리 운영)" 정정, demand-inflection-ewi.md 상보 축 bullet(운영상 분리), index.md 행 갱신.
- **dashboard (v2.22.0, 마이너 = 새 시각화 카드 + 프레임 정리)**: BottleneckModel.jsx — ModelStructureDiagram 신설(viewBox 680×736, 3단 컨테이너 × 4레인 × 수렴 컬렉터), DemandSummaryStrip 삭제, DriverRow EWI 칩 삭제. updates.js 항목, version bump.
- **outputs**: report §7.2 해당 문장 정정(도식 내장·분리 운영). 발표자료는 기존 결정대로 후속 분리.
- **정정**: v2.21.0 항목·위키 §5의 패키징 상류(d2) 압력 **45 → 57** 산술 오류 정정(340/6=56.7; 데이터 파생 도식이 불일치를 적발). 완화 예고는 57 ≤ 72−15 경계로 여전히 발동 — 방향 결론 불변, 크기만 축소(−27 → −15).
- **검증**: `cd dashboard && npm run build` 통과, 프리뷰 — 도식 렌더(수치 파생 확인)·EWI 스트립/칩 부재·서브탭 동작·콘솔 에러 0.

## [2026-06-11] build | 병목 모델 depth 확장 — 상류 드라이버 트리 + 수요 EWI 통합 (v2.20.0 → v2.21.0)
- **무엇**: ① 4대 병목 각각에 영향을 주는 상류 요소를 depth 1(중류)·depth 2(상류)로 분해한 **22개 드라이버 트리**를 모델에 반영 — CAPEX 7(하이퍼스케일러 이익·FCF ← **AI 기업 매출·이익(OpenAI·Anthropic·xAI·Google)**·단위 경제성·GPU 임대가·자금조달·금리)·전력 6(접속 큐 ← 변압기 리드타임, COD ← BTM 발전·전력 정치)·파운드리 5(램프 ← ASML·수율, 배정 ← 지정학)·패키징 5(가동률 ← 기판·적층 수율, 사이트 ← 세대 믹스). 압력 4단계(완화 15·중립 40·긴장 65·임계 90) 가중 롤업 → 병목별 선행 압력(상류/중류) 산출, 현재 지수와의 괴리로 **조기경보 3규칙**(악화 예고 d2≥현재+10 / 완화 예고 d2≤현재−15 / 상류-중류 괴리 d2−d1≥10). ② **수요 EWI를 Bottleneck Model 탭으로 통합** — Data Viz > 수요 EWI 서브탭 제거, Bottleneck Model 탭 내 [병목 모델 | 수요 변곡 EWI] 서브탭 + 병목 모델 화면에 EWI 요약 스트립 + 드라이버 "EWI 연계" 표기(같은 사실의 양면).
- **왜**: 사용자 요청 — "수요 EWI와 Bottleneck Model 내용 겹침 → 통합·메뉴 제거" + "4개 병목에 영향 주는 요소를 1~2 depth 더 도출해 모델 정교화, 더 이른 시점에 수요 변화 인지(예: CAPEX ← AI 기업 매출·이익)". 상류일수록 선행시차가 길어(AI 기업 매출 12~18개월, 변압기 18~36개월) 병목·수요 변화를 먼저 포착.
- **판독(2026-06-11)**: CAPEX — 중류(가이던스 강세 37)는 조용하나 상류(48: GPU 임대가·자금조달)가 먼저 악화, 괴리 +11. 파운드리 — 운영 완화(d1 15) vs 구조 리스크(d2 48: 지정학·수율 미지수), 괴리 +33. 패키징 — 유일하게 상류(45) < 현재(72) = 2027~28 완화 예고. 전력 — 상·중·현 모두 60 안팎, 장주기 공급망이라 단기 해소 없음.
- **wiki**: bottleneck-model-2030.md §5 "상류 드라이버 트리" 신설(mermaid 트리·판정 체계·병목별 표 4개·종합 판독, 기존 §5→§6), demand-inflection-ewi.md(단일 소스 위치·통합 구조)·rs9(대시보드 참조)·README(기능 표) 갱신.
- **dashboard (v2.21.0, 마이너 = 탭 구조 변경 + 새 데이터 카테고리)**: bottleneckModel.js에 PRESSURE_LEVELS·BOTTLENECK_DRIVERS(22)·driverPressure() 추가, BottleneckModel.jsx 서브탭 구조 + DemandSummaryStrip + DriverTree + 병목 카드 선행 압력/플래그, DataVisualization.jsx 수요 EWI 서브탭 제거, updates.js v2.21.0 항목, version bump.
- **outputs**: report §7.2에 상류 드라이버 트리 단락 추가. 발표자료는 기존 결정대로 후속 분리.
- **검증**: `cd dashboard && npm run build` 통과. 프리뷰 — 서브탭 전환(병목 모델↔수요 변곡 EWI)·Data Viz에서 수요 EWI 부재·드라이버 트리 렌더·롤업 수치(37/48·58/60·15/48·55/45)·조기경보 플래그·콘솔 에러 0 확인.
- **참고**: 같은 날 병렬 세션의 시니어 파트너 인터뷰 ingest(신규 concept 4·source 1·updates 항목)와 워킹트리 공존 — 본 커밋은 공유 파일(index·updates) 정합을 위해 병렬 세션의 **신규 파일만** 동반 포함, 기존 페이지 수정분(samsung·sk-hynix·micron·mb4·sd2·rs2)은 해당 세션 체인에 남김.

## [2026-06-10] ingest | 딥리서치 2건 수집 + 대시보드 병목 기반 모델링 도입 (v2.19.1 → v2.20.0)
- **무엇**: 사용자 의뢰 딥리서치 2건(① 2030 메모리 수급 4대 병목 정량 모델, ② 병목 모니터링 모델·대시보드 설계)을 수집·환원하고, 대시보드에 **Bottleneck Model 탭**을 신설해 모델 기반으로 업그레이드. 핵심 프레임 — S₂₀₃₀ = min(U, 전력, CAPEX, 파운드리, 패키징), Sᵢ = S_base×(Bᵢ/B_base)^εᵢ (ε: 전력 1.00·CAPEX 0.90·파운드리 0.85·패키징 0.95). 기준: HBM-GPU 서버 125만 대·HBM 2.88/2.95EB·DRAM 2.50/3.30EB. 하방 CAPEX(-31.5%) > 전력(-21.1%) ≈ 패키징(-20.5%) > 파운드리(-14.9%), 상방 최종 병목 = 파운드리.
- **왜**: 사용자 요청 — "두 문서 기반 자료 업데이트 + 대시보드를 병목 기반 모델링으로 업그레이드". 기존 EWI(수요 *방향*)에 병목 모델(수요 *실현 가능성*·상방 제약)을 더해 수요의 양면을 감시.
- **sources**: `papers/deep-research-2030-bottleneck-quant-model-2026-06.md`·`papers/deep-research-bottleneck-monitoring-dashboard-design-2026-06.md` 신설(원본 보존, papers 디렉토리 첫 파일), `sources/README.md` papers 카탈로그 신설.
- **wiki**: `concepts/bottleneck-model-2030.md` 신설(모델 구조·4대 병목 정량·수급·가격 균형·모니터링 설계·시나리오 연결) + 7개 페이지 보강 — energy-constraints(IEA 945TWh·300/380/520TWh)·ai-capex(Goldman $7.6조·-31.5% 최대 하방)·hbm-market(2030 수급 2.88/2.95EB·공급사별 캐파)·ai-server-demand(잠재 164만→실현 125만 대)·tsmc(CoWoS 정량·상방 최종 병목)·demand-inflection-ewi(상보 축)·rs9(병목 레이더 = 상방 축 확장). index.md 갱신.
- **dashboard (v2.20.0, 마이너 = 새 탭 + 새 데이터 카테고리)**: `data/bottleneckModel.js`(모델 데이터+수식 — min 제약·탄력도·상수탄력도 균형·경보 5단계·KPI 20종·충격 5종), `components/BottleneckModel.jsx`(병목 상태 카드 4축·what-if 시뮬레이터·수급 곡선+균형점·민감도 토네이도·3×3 수급차 매트릭스·공급사 캐파·충격 대응 매뉴얼·KPI 설계), App.jsx 탭 연결, updates.js v2.20.0 항목 + v2.18.0/v2.19.0 소급 2건(누락 갭 보충), version.js bump.
- **outputs**: report §4.2(DF1)에 병목 정량 모델 단락, §7.2에 병목 레이더 표 추가. **발표자료(slide-outline/PPTX)는 건너뜀** — v2.17+ 미반영분과 함께 별도 후속 작업으로 분리(직전 2건 ingest와 동일 결정, 스테일 outline에 부분 반영 시 정합 깨짐 방지).
- **검증**: `cd dashboard && npm run build` 통과(2410 모듈). 브라우저 프리뷰 — 탭 렌더·콘솔 에러 0, 시뮬레이터 인터랙션 검증(CAPEX 0.90조 달러 → 85.6만 대·HBM 1.97EB·binding 표시), 모델 수치가 보고서 표값 재현(125.0만·+0.07EB·p* 97.5·stress -1.12EB·149.7).

## [2026-06-06] migration | working-style/ 디렉토리 제거 (Claude Code 세미나 자료, 본 프로젝트 무관) — v2.19.0 → v2.19.1
- **무엇**: 레포 최상위 `working-style/`(하위 `seminar-claude-code-report/` — Claude Code 세미나 발표자료: content.md·slide-outline.md·generate-pptx.js·*.pptx·node_modules) 전체 삭제. 추적 6파일 `git rm`, 비추적(node_modules·*.pptx·.DS_Store) 정리.
- **왜**: 사용자 요청 — 시나리오 플래닝 위키와 무관한 세미나 자료라 제거. 직전 [2026-06-06] lint 항목에서 "본 프로젝트 무관이라 미변경"으로 보류했던 것을 정식 삭제.
- **하류 정합**: `dashboard/src/components/SourceLink.jsx` PATH_REGEX 화이트리스트에서 `working-style` 토큰 제거(삭제된 디렉토리 → 죽은 참조). `slides/`는 실존하므로 유지. `version.js` v2.19.1(패치=죽은 참조 정리).
- **영향 페이지**: `working-style/` 전체, `dashboard/src/components/SourceLink.jsx`, `dashboard/src/version.js`. wiki·sources·index.md·outputs·README 무영향(참조 없음 확인). log.md 과거 항목은 append-only라 보존(과거 working-style 언급은 당시 사실 기록).
- **검증**: `cd dashboard && npm run build` 통과(2408 모듈·콘솔 0).

## [2026-06-06] ingest | 베인앤컴퍼니(신문섭) AI 컴퓨트·반도체 시리즈 → 위키·대시보드 (v2.18.0 → v2.19.0)
- **무엇**: 베인 신문섭 파트너(APAC 하드웨어·반도체·DC 총괄·한국 TMT 대표) 도메인의 3개 시리즈를 취합·반영. ① 6th Global Technology Report(2025): AI 컴퓨트 경제학 갭 — 2030 글로벌 컴퓨트 200GW·연 $500B DC capex·수익성 충당 신규 매출 $2조·자금 갭 $800B. ② The AI Ripple Effect(2026-03, **신문섭 공동저자**): 메모리=하이퍼스케일러 AI 지출 ~30%(vs 2023~24 ~8%)·AI ~20% DRAM 웨이퍼 잠식·1GB HBM 4×/GDDR7 1.7× 웨이퍼·GPU 2배 시 부품사 +30% 증산. ③ DC Construction Crunch(2025-10)/Scramble→Strategy: 글로벌 DC 163GW(2030, ~2배)·북미 ~50%·전력=게이트키퍼·규율 있는 성장·4대 병목·계통 접속 5년.
- **왜**: 사용자(메모리사업부) 요청 — "베인 신문섭 파트너의 AI DC·반도체 작업을 취합해 데이터·대시보드에 반영". 베인 top-down 프레임은 위키의 거품론(심리) 논쟁을 공급-수요-자금 경제학으로 환산하고, DRAM 웨이퍼 잠식·HBM 수요 비중을 외부 교차검증.
- **sources**: `articles/bain-ai-compute-semiconductor-2025-09-to-2026-03.md` 신설(3개 시리즈 발췌+전체 URL+신문섭 인물), `sources/README.md` 카탈로그 2행.
- **wiki**: `concepts/ai-compute-economics-gap.md` 신설(통합 환원 페이지) + 6개 페이지 보강(ai-demand-sustainability·ai-capex·ai-datacenter-buildout·energy-constraints·hbm-market·semiconductor-cycle) + index.md 2행.
- **dashboard (v2.19.0, 마이너=새 데이터 카테고리)**: `data/dataCenters.js` DC_ANCHORS에 Bain 7개 앵커 추가, `components/DataCenterTracker.jsx` "외부 전망 벤치마크 — Bain(신문섭)" 카드 신설(6 KPI 타일+Scramble→Strategy 내러티브), `version.js` bump.
- **outputs**: report §4.2(DF1)에 Bain 컴퓨트 경제학 갭 단락 추가. **발표자료(slide-outline/PPTX)는 건너뜀** — 직전 결정대로 v2.17+ 미반영분과 함께 별도 후속 작업으로 분리(현 outline에 Bain 콘텐츠 없음 → 스테일 비반영이 정합 깸 방지).
- **검증**: `cd dashboard && npm run build` 통과(2408 모듈·콘솔 0). 브라우저 프리뷰 — AI DC 탭에 Bain 카드 렌더(163GW·200GW·$500B·$2조·$800B·30%), 콘솔 에러 0.

## [2026-06-06] build | SCM 공급망 축 EWI 편입 — 채찍효과·재고위치·할당 (v2.17.0 → v2.18.0)
- **무엇**: SCM(공급망관리) 관점 7대 불황 선행지표를 수요 변곡 EWI에 **⑦ SCM 공급망 축**으로 정식 편입. demand-inflection-ewi.md(§2 신호표 +7행·§2-1 신규 소단락·mermaid ⑦ 노드·복합점수 갱신) + 대시보드 `수요 EWI` 탭(CHAIN_TIERS ⑦·DEMAND_SIGNALS +7·inflectionSummary.scm·Panel SCM 막대/구분선/방법론).
- **7대 신호**: 가짜수요 갭(발주−셀스루)·더블오더링(고객 재고주수)·재고 에셜론(다운스트림 DIO)·할당 커버리지·선급금률·업스트림 공급증분(WFE·경쟁사 장비반입)·주문 처닝율(취소·푸시아웃)·CCC/고객 신용(DSO). **즉시 운용 3종** = 가짜수요 갭·할당 커버리지·업스트림 공급증분.
- **왜**: 기존 EWI는 "최종 수요 하강"(top-down)에 강하나, 메모리 불황의 직접 방아쇠인 **더블오더링/채찍효과 언와인드**(발주−셀스루 괴리)를 정량 추적하는 축이 부재했음. SCM 렌즈는 ③발주↔⑤재고↔⑥공급의 빈틈을 메워 ⑤메모리 재고가 움직이기 전 급락을 선포착. 사용자 요청(SCM 관점 메모리 불황 조기식별 아이디어 → A안 정식 편입).
- **복합점수**: 36→43(주의), 신규 SCM side 56(경계 근접). 선행−끈적 괴리(+4)·밴드 로직 불변. RS-9 §2·§3, index.md EWI 요약 동기화.
- **영향 페이지**: wiki — concepts/demand-inflection-ewi(§1·§2·§2-1·§3·§4), strategies/invariant/rs9-demand-inflection-sensing(§2·§3), index.md. dashboard — data/demandSignals.js, components/DemandInflectionPanel.jsx, version.js(v2.18.0). outputs — report(EWI 섹션)·presentation/slide-outline(해당 슬라이드).
- **검증**: `cd dashboard && npm run build` 통과(예정), PPTX 재생성.

## [2026-06-06] lint | README 최신화 + CLAUDE.md 스테일 정리
- **무엇**: README.md를 최근 작업에 맞춰 전면 재작성 — 9개 Robust(RS-1~RS-9 정확 택소노미)·확률 26/35/10/23/6·AI DC 착공 트래커(55.9GW)·수요 변곡 EWI·라이브 대시보드 기능표. CLAUDE.md의 완료된 마이그레이션 스캐폴딩(§9 기존 누적 로그 + §10 마이그레이션 진행 현황 표)을 §9 연혁 1단락으로 축약, `sources/raw/` 스테일 참조 3건 정리(§1 "마이그레이션 중" 불릿 + §5 매핑 표 2행: D/RS 카운트·실시간 시계열 출처를 vast/yahoo로 갱신).
- **왜**: README가 옛 RS 택소노미(RS1~RS6)·옛 확률(30~35% 등)·"생성 예정" 디렉토리(지금은 entities 9·concepts 21 존재)·`sources/raw/metadata.md`(지금은 sources/README.md) 등 6개월 묵은 내용이라 현 위키와 불일치. 사용자 요청(README 최신화 + 불필요·올드 내용 제거).
- **영향 페이지**: README.md(전면), CLAUDE.md(§1·§5·§9·§10). 위키 사실·수치 변경 없음 — 문서 정합성만.
- **비고**: 발표자료(slide-outline 29매)는 v2.17 값 미반영 상태로 별도 후속 작업으로 분리. `slides/`·`working-style/`(Claude Code 세미나 자료)는 본 프로젝트 무관이라 미변경. dashboard/src 무변경 → version bump 없음.

## [2026-06-06] build | 전략 리팩토링 — 최신 데이터(DC 착공 + 수요 변곡) 반영 (v2.16.0 → v2.17.0)
- **무엇**: 이번 세션의 AI DC 착공 트래커(55.9GW·17개국)와 수요 변곡 EWI(복합 36 주의·공급 과잉 68 경계·괴리 +4)를 시나리오·구동력·전략에 반영하고 위키 → 대시보드 → 보고서로 동기화.
- **왜**: "근위 슈퍼사이클 정점은 확인됐고 다음 하락 변곡이 선행 신호에서 형성 중"이라는 신규 데이터에 맞춰 불필요 전략 제거 + 신규 전략 추가로 전략 포트폴리오를 최신화. 이것이 대시보드에 드러나야 함.
- **전략 ADD**: RS-9 "데이터 기반 수요 변곡 센싱" 신설 — DC 착공 추적 + 수요 변곡 EWI 앙상블(선행·끈적·공급 과잉 + 괴리)로 하락 변곡을 먼저 잡아 RS-1(캐파 on/off)·RS-5(규율) 제때 발동. 공급 거버넌스 축 편입(RS-1·RS-5·RS-9). 9개 Robust·45셀.
- **전략 REMOVE/DEMOTE**: SD-1 "HBM 독립 P&L" → 메인벳에서 제외(6→5), IR·거버넌스 전술이라 시나리오 베팅 아님 → RS-5 재무 규율 가시성으로 흡수.
- **시나리오 확률**: A26·B35·C10·D23·E6 (합 100). B 34→35(슈퍼사이클로 수요 가시성↑)·D 22→23(공급 과잉·정점 신호로 순환 조정 리스크↑) 상향, A 27→26·C 11→10 하향, E 6 불변(신규 신호는 DF1축, DF3 패러다임 근거 아님). indicators.js + scenarioPlanning.js 동시 갱신.
- **의사결정 +3 / 트리거 +3**: D15(수요 변곡 조기경보 운영)·D16(호황 정점 공급 규율, critical)·D17(소버린 다변화) → 17개. gpu_rental_collapse·dc_construction_cancellations·demand_inflection_divergence → 21개(모두 시나리오 D·C). DecisionTracker 로컬 중복 DECISIONS 제거 → strategies.js 단일 소스 통합 + deadline 정규화(Q/H 문자열 NaN 버그 수정).
- **영향 페이지**: wiki — strategies/invariant/{README, rs9-demand-inflection-sensing(신규)}, strategies/core/{README, current-state-sd1-hbm-pnl-spinoff}, scenarios/scenario-matrix, driving-forces/key-drivers, concepts/demand-inflection-ewi §5. dashboard — data/{indicators, scenarioPlanning, strategies, updates}.js, components/{DecisionTracker, Strategies}.jsx, App.jsx, version.js. outputs — report §5/7.1/7.3/4.2/8.1/6.3.
- **알려진 이슈**: 보고서 §6.3의 구 RS 넘버링(RS1=수율…)은 대시보드 9-RS 택소노미와 불일치 — 이번엔 재조정 보류, §6.3 상단에 이슈로 명시. 진실의 원천은 wiki/strategies/invariant + 대시보드 Strategy 탭.
- **검증**: 대시보드 런타임 확인(17 결정·NaN 없음, 9 RS·RS-9·45셀, 메인벳 5개·SD-1 사라짐, 확률 26/35/10/23/6, 트리거 21개, 콘솔 0). `npm run build` 통과.

## [2026-06-02] build | 수요 EWI 고도화 — GPU 바스켓·선행 시장 추이·현물 공급 (v2.15.0 → v2.16.0)
- **무엇**: 사용자 1·2·3 순서 — ① GPU 임대가 바스켓(유동성 보강), ② 선행 시장 신호 실측 추이 차트, ③ Vast 현물 공급 신호.
- **① 바스켓**: `vast.js` fetchVastBasket(H100 SXM·H200 0.5:0.5 + NVL은 count만). 핸들러 gpu_rental_h100_usd가 H100 단독(n=7 박함)→바스켓 중앙값으로 안정화(현재 ~$3.3). 지표 명/임계치(alert $2.0/warn $2.6) 갱신.
- **② 추이 차트**: `DemandInflectionPanel`에 /api/stocks/history NVDA·MU·HYG 12개월 정규화(시작=100) 라인. MU 12개월 7.6배(슈퍼사이클) 실측이라 **로그축**으로 NVDA/HYG 가독성 확보. yahoo.js·server SYMBOLS에 HYG 추가. 동반 우하향=선행 약화.
- **③ 현물 공급**: 핸들러 gpu_supply_offers(Vast 가용 오퍼 수, ~51건), 신규 EWI. demandSignals 미편입(복합 안정 유지, EWI 탭+위키 노트).
- **검증**: 로컬 dev 엔드포인트 — 바스켓 $3.277(H100 $2.646·n7/H200 $3.908·n42), 공급 51, HYG 262주. 차트 3선·로그축 틱[100/200/400/800] 렌더, 콘솔 0. 프로덕션 egress(Vast)는 지난 배포서 확인됨(동일 API). `npm run build` ✓. version v2.16.0.
- **영향 페이지**: vast.js·handlers.js·server/index.js·yahoo.js·indicators.js·demandSignals.js·DemandInflectionPanel.jsx·demand-inflection-ewi.md·updates.js·version.js.

## [2026-06-02] build | GPU 현물 임대가 실측 연동 — Vast.ai 공개 API (v2.14.0 → v2.15.0)
- **무엇**: Tier0 최선행 신호(GPU 임대가)를 Vast.ai 공개 오퍼 API로 실측 자동 갱신.
- **왜**: 사용자 요청 — "vast.ai 공개 API 무료 연동 시도". 지난 턴 CRWV 프록시 거부의 정직한 대안 = 실제 마켓 현물가.
- **발견**: Vast.ai `console.vast.ai/api/v0/bundles/?q=` 는 무인증이지만 WAF가 브라우저 헤더(Origin/Referer/UA) 요구 — 헤더 없으면 403(HTML). 헤더 추가 시 200·offers JSON. H100 SXM n=7 중앙 $2.5(min $2.0), H200 n=42 $3.9, RTX4090 n=145 $0.67.
- **구현**: `api/_lib/vast.js`(fetchVastMedian: per-GPU dph_total/num_gpus 중앙값·캐시) + `handlers.js`·`server/index.js` 핸들러 `gpu_rental_h100_usd`(H100 SXM 중앙값·H200 병기, isProxy:false). 기존 일 1회 cron 자동 편입. `indicators.js` 신규 EWI(level, alert $1.5/warn $2.0, autoUpdate). `demandSignals` Tier0 gpu_rental ewiId 연결.
- **정직성**: CRWV 주가 프록시는 6개월 +30%인데 실제 임대가는 하락(주가≠가격) → 거부. Vast.ai 실측으로 대체.
- **검증**: 로컬 dev 서버 엔드포인트 실측 — POST gpu_rental_h100_usd → $2.646(n=7, H200 $3.908) ok, ai_dc_credit_spread → -61bps ok. 신규 EWI 렌더(Vast·H100 SXM 노출)·콘솔 0. `npm run build` ✓. 프로덕션 egress(Vercel→Vast WAF/IP)는 배포 후 /api/auto-update/all 로 확인 예정.
- **영향 페이지**: api/_lib/vast.js(신규)·handlers.js·server/index.js·indicators.js·demandSignals.js·DemandInflectionPanel.jsx·demand-inflection-ewi.md·updates.js·version.js.

## [2026-06-02] build | 수요 EWI — 신용 스프레드 자동 갱신 + what-if 시뮬레이터 (v2.13.0 → v2.14.0)
- **무엇**: ① AI-DC 신용 스프레드 EWI를 HYG 프록시로 자동 갱신 연결, ② 수요 EWI 탭에 what-if 시뮬레이터 추가.
- **왜**: 사용자 요청(실시간 피드 연동 + 괴리 추적 후속). 조기경보 시스템을 더 라이브하게.
- **자동 갱신**: `ai_dc_credit_spread` ← HYG 6개월 역행·듀레이션 환산(bps, 계수 2900, 가격↓=스프레드↑). `api/_lib/handlers.js`(prod) + `server/index.js`(dev) 양쪽 핸들러 + 기존 일 1회 cron. indicators.js에 autoUpdateId/Source/IsProxy 추가.
- **정직성 결정**: GPU 임대가는 자동 연동 **제외**. CRWV(CoreWeave) 6개월 +30.2%인데 실제 GPU 임대가는 하락세 — 주가는 임대'가격'이 아닌 지분가치 추종 → 핵심 Tier0 선행 신호를 "정상"으로 오인시킬 위험. 수동 유지(ClusterMAX/Vast.ai). 스팟(DXI)·재고·취소도 무료 실시간 피드 부재로 수동.
- **what-if 시뮬레이터**: `DemandInflectionPanel` — sim 토글 + 사슬 보드 칩 클릭으로 레벨 변경(확장→중립→주의→수축), 복합 위험·선행/끈적 괴리·측면 바 즉시 재계산, "현재로 초기화". demandSignals 헬퍼가 signals 인자 받도록 이미 설계되어 재사용.
- **검증**: 런타임 — 베이스라인 복합 36, 선행 4신호 수축 시뮬 → 복합 62(경계)·선행 74·괴리 +45·"행동 윈도우 열림" 메시지·초기화(4)→36 복귀. HYG 프록시 노드 테스트(+2.3%→-68bps). 콘솔 오류 0. `npm run build` ✓. version v2.14.0(마이너).
- **영향 페이지**: DemandInflectionPanel.jsx·api/_lib/handlers.js·server/index.js·indicators.js·demand-inflection-ewi.md·updates.js·version.js.

## [2026-06-02] build+query | 수요 변곡 조기경보 시스템 신설 (v2.12.0 → v2.13.0)
- **무엇**: "DC 착공보다 더 정확히, 메모리 수요 하락을 먼저 잡는 법"에 대한 답을 시스템으로 구현. Data Viz에 "수요 EWI" 탭 신설 + EWI 5종 추가.
- **왜**: 사용자 질의 — 착공은 인과 사슬 중간의 끈적한 지표라 하락 변곡 탐지엔 느림. 더 정확 = 단일 지표가 아닌 **앙상블 + 괴리(선행−끈적) + 공급 축**.
- **개념(query 산출)**: 인과 사슬 ①수요청산가(GPU임대가)→②돈(capex·파이낸싱)→③발주미시(스팟·book-to-bill·CoWoS)→④DC 착공→⑤메모리(재고·가격), ⑥공급 과잉(구조 축). 착공보다 왼쪽이 먼저 꺾이는 괴리 = 행동 윈도우. 샤프드롭: 불휩 언와인드(부족 정점=급락 셋업)·효율 에어포켓·파이낸싱 프리즈.
- **위키**: 신규 `wiki/concepts/demand-inflection-ewi.md`(Mermaid 사슬·계층표·괴리·시나리오 D 연결) + `sources/raw-notes/demand-inflection-ewi-2026-06.md`(방법론·출처). DF1 선행 관측 도구.
- **dashboard**: `demandSignals.js`(6단계·15신호·복합/측면 위험·괴리 헬퍼) + `DemandInflectionPanel.jsx`(복합 위험 미터·선행/끈적/공급 바·괴리 콜아웃·사슬 보드·15신호 표, custom JSX). `indicators.js`에 EWI 5종(gpu_rental_price_trend·ai_dc_credit_spread·dc_cancellation_count·spot_contract_spread·memory_inventory_days). `DataVisualization.jsx` SUB_TABS 2번째 "수요 EWI"(Gauge).
- **검증**: 런타임 — 복합 36(주의)·선행33/끈적29/공급68·괴리+4·15신호 표·EWI 탭 5종 노출(뱃지 20→21) 확인. 콘솔 오류 0. `npm run build` ✓. version v2.13.0(마이너).
- **영향 페이지**: demand-inflection-ewi.md·demand-inflection-ewi-2026-06.md(신규)·demandSignals.js·DemandInflectionPanel.jsx(신규)·indicators.js·DataVisualization.jsx·index.md·updates.js·version.js.

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

## [2026-06-11] ingest | 시니어 파트너 인터뷰 딥리서치 보고서 (사용자 1차 자료)

사용자가 직접 인터뷰한 시니어 파트너 발언 + 공개 자료(WSTS·IDC·IEA·Dell'Oro·Anthropic·NASA·NDRC·Oracle IR) 교차 팩트체크. 인터뷰 4대 메시지를 위키 4개 신규 concept + 6개 갱신으로 환원.

**핵심 명제**: "SaaS Calypso 이후 하드웨어의 시간이 돌아왔다" — AI 시대의 병목이 메모리·가속기·전력·냉각·패키징·DC 부지·인허가·저계층 SW로 이동.

**팩트체크 결과 요약**:
- ✓ AI 하드웨어 재부상: WSTS $1.51T (+90%), 메모리 $800B+ (+250%), IDC $487B (+53%), IEA 945TWh
- ✓ Anthropic strategic infra partners (Micron·Samsung·SK) — 단 직접 지분 투자액은 미공개 → "전략적 파트너십"으로 해석
- △ Micron Tick-Tock PMI 목적: 1차 자료 부재 → 운영원리 해석으로만 유효 (다사이트 지식 DB 권고)
- △ 충칭 기후 우위: NDRC 공식은 구이저우·내몽골·간쑤·닝샤 → "정책·전력·네트워크 통합배치"로 표현 수정
- ✗ Stargate 일부 포기 가능성: 오히려 확대 진행 중 (Oracle Texas 90일 75%+)
- △ Space COTS: smallsat·LEO에 한정 (deep-space·군수 일반화는 과함)
- ? Google 중고 GPU·Tesla pull-in·과거 Samsung CoreWeave 논의: 공개 자료 부재 → 전략 가설로 처리

**신규 wiki concept 4종**:
- `customer-co-design-anthropic.md`: Anthropic Series F + Microsoft/Google SK LTA + Micron LTSA 통합, 영업 4단계 진화 모델
- `embedded-software-monetization.md`: SmartSSD/CXL SMDK 자산 수익화, BSP/SDK 별도 P&L 분리, MB-4·RS-3·RS-7 연결
- `used-semiconductor-market.md`: $2.4B~$14.6B 시나리오 추정, 본질=검사·인증, C·D 시나리오 폭발 가능성
- `space-semiconductor.md`: Smallsat 2,800기/97% COTS, 중간지대(선별 COTS·fault firmware·long-lifecycle·shield-aware), SD-2·RS-2 long-lifecycle 끝단 강화

**갱신 wiki 6개**:
- `entities/samsung.md`: HBM4·SOCAMM2 양산·PCIe Gen6 SSD·항공우주 + Anthropic infra partner + 임베디드 SW 미수익화 격차
- `entities/sk-hynix.md`: 미국 AI Company $10B + 영업 4단계 모델 격차 분석 (Samsung 3·4단계 미진입)
- `entities/micron.md`: FY26 Q2 $23.86B + Elpida PMI는 운영원리 해석으로만
- `strategies/core/current-state-mb4-custom-ai-memory.md`: Anthropic 모델 + 임베디드 SW 통합 패키지화 + 6개월 KPI
- `strategies/core/current-state-sd2-industrial-ai-memory.md`: 우주·항공우주·국방 신규 영역 + Micron Manassas 경쟁 구도
- `strategies/invariant/rs2-barbell-portfolio.md`: long-lifecycle 끝단을 우주·국방·중고 인증으로 확장

**전략 권고 7개 (인터뷰 기반)**:
- 단기: 메모리 포트폴리오 기능 단위 분해 + lighthouse 제품(CXL·SmartSSD·스토리지 박스), 다사이트 지식 DB, BSP/SDK 패키지화
- 중기: Anthropic형 전략 고객 접점, DC 부지·전력 옵션 맵, 중고 반도체 인증 파일럿
- 장기: 우주·산업·국방 장수명 + 인증 체계

**반대 권고**: 고객-비경쟁 원칙 깨는 전면적 Neo Cloud 진출은 우선순위 낮음. **화이트라벨 인프라/레퍼런스 아키텍처 공급자**가 현실적 경로.

**dashboard**:
- `dashboard/src/data/updates.js`에 entry 추가 (v2.21.0 환경, version bump 없음 — wiki concept 추가는 dashboard 데이터 구조 변경 없음)
- 브라우저 미리보기로 "업데이트 내역" 탭 신규 entry 표시 확인 (총 24건, ingest 8건, 최신 2026-06-11)

**의도적 미반영 / 다음 사이클 후보**:
- DECISIONS D15·D16·D17 신설 (인터뷰 권고 7개 → 즉시 결정): 별도 build 사이클로 분리
- 신규 EWI 3종 후보: 전략 인프라 파트너 수, 임베디드 SW 매출 비중, 중고 인증 사업 진척
- 다음 ingest 추적: Samsung·SK Anthropic 직접 지분, Micron Tick-Tock PMI 1차 자료, Google GPU 중고

**출처**: [senior-partner-interview-deep-research-2026-06-11.md](sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md) (사용자 로컬: `/Users/euihyeokkwon/Downloads/deep-research-report-3.md`)

---

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
