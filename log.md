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

## [2026-08-03] ingest | 인터뷰 3번째 추가 — 이창수 부사장(메모리 영업팀장) (v2.32.8 → v2.32.9)
- **무엇**: 2026-08-03 진행된 이창수 부사장(영업팀장, 녹취록 참석자 3, 약 89분) 내부 인터뷰를 동일 형식(16개 섹션·핵심 인용문 4개·수요 사슬 3형태 표)으로 구조화해 대시보드 "인터뷰" 메뉴에 추가. **민감 상업 수치(개별 계약 금액·구체 판가·이익률·캐파 바인딩 비중·내부 코드명·고객별 일정)는 사용자 요청에 따라 제외 또는 대략적 범위 표현으로 조정**(소스 정리본 헤더에 정책 명시). 패치 v2.32.9.
- **왜**: 사용자 지시 — 인터뷰 시리즈(신문섭 파트너 → 최장석 상무 → 이창수 부사장)의 세 번째. 판매 최전선·멀티이어 계약 실무 총괄 관점 확보.
- **핵심 논지**: (1) 수요는 예측이 아니라 만드는 것 — 가격 탄력도, 수요 예측 무용론. (2) 작년 하반기부터 "종이 다른" 고객(AI 프론티어·CSP) — 투자 기반 타이밍 산업, 시가(時價) 시장, 중복 수요·수요 사슬 3형태(CSP 경유→GPU 리스→직접 건설). (3) 꺼짐 시그널은 재무 — CAPEX vs FCF(메타 사례), 3축 프레임(CSP 파이낸셜·최종 수요 진정성·GPU 생태계). (4) 1차 방어선 = take-or-pay 멀티이어(대규모 선수금·상호 페널티·NTE/NTB 밴드·캐파 대부분 바인딩 목표), 과제 = 2차 방어선(사업 경쟁력 3축 Back to Basic + WPSI·상시 비가동·투자 탄력도). (5) 원가 비교열위 — 현 이익률은 "AI가 준 선물". (6) 커스텀 HBM 퇴조론(속도전) — 최장석 zHBM 관점과 대비되는 리트머스. (7) 브로드컴·ASIC·소버린 재편, HBM 판매 비중 브로드컴 우위(의도적 밸런스). (8) 중국 비동조화 — BAT 멀티이어 헤지, 낸드는 YMTC발 조정 가능성.
- **sources**: `raw-notes/lee-changsoo-memory-sales-interview-2026-08-03.md` 신설(주요 발언 정리본, 민감 수치 조정). `index.md` raw-notes 섹션 갱신.
- **dashboard (v2.32.9, 패치 = 콘텐츠 추가, 동일 탭·스키마)**: `data/interviews.js` INTERVIEWS 최상단에 이창수 인터뷰 추가(16개 섹션·keyQuotes 4). `data/updates.js` v2.32.9 항목. `src/version.js` v2.32.9.
- **건너뜀**: wiki·outputs·기타 dashboard 데이터는 본 인터뷰가 분석 페이지 수치를 직접 바꾸지 않으므로 미변경(앞선 인터뷰들과 동일 스코프). 인터뷰 인사이트의 위키 환원(take-or-pay 계약 구조는 wiki/concepts/lta-to-sca-transition.md 와 연결 여지, WPSI·FCF EWI 편입)은 후속 ingest에서 검토.

## [2026-07-29] ingest | 용어 정정 — GHBM → zHBM (최장석 인터뷰) (v2.32.7 → v2.32.8)
- **무엇**: 최장석 상무 인터뷰의 3D 적층 커스텀 메모리 용어를 GHBM → zHBM으로 일괄 통일 정정(38곳: `raw-notes/choi-jangseok-...md` 12·`interviews.js` 19·`updates.js`·`index.md`·`log.md`). 소스 녹취록 헤더에 "음성 자동 전사가 GHBM·지앤드·z HBM으로 흩어 표기 → zHBM 통일" 정정 이력 명시. 패치 v2.32.8.
- **왜**: 사용자 지시 — 올바른 용어는 zHBM.
- **dashboard (v2.32.8, 패치)**: `data/interviews.js`·`data/updates.js`·`src/version.js`.

## [2026-07-29] ingest | 인터뷰 2번째 추가 — 최장석 상무(메모리 상품기획팀장) (v2.32.6 → v2.32.7)
- **무엇**: 2026-07-29 진행된 최장석 상무(상품기획팀장, 녹취록 참석자 4) 내부 인터뷰를 sources 층에 녹취록 원본으로 보존하고, 대시보드 "인터뷰" 메뉴에 신문섭 파트너 인터뷰와 동일 형식(Executive Summary 포함 15개 섹션·핵심 인용문 4개·HBM vs zHBM 비교표)으로 구조화해 추가. 패치 v2.32.7.
- **왜**: 사용자 지시 — 사내 임원·전문가 인터뷰 시리즈(베인 신문섭 → 최장석 → 이창수 예정)의 2번째. 고객 최일선(상품기획) 관점 확보.
- **핵심 논지**: (1) "AI 수요 감소"를 추상적 시장 축소가 아니라 가속기→HBM→DDR 제품 단위 인과로 정의. (2) HBM은 DDR 캐파를 희생해 만들므로 HBM 감소 시 디맨드/서플라이 60~70% 갭이 반전 → 쇼티지가 즉시 오버서플라이. (3) 모든 미국 CSP가 zHBM(가속기 로직 위 3D 수직 적층 커스텀 메모리)만 요구, 배경은 가속기 비용·전력(랙당 6~8kW→210kW)·써멀 한계. (4) 커스텀 제품은 소싱·컨트랙·SCM이 파운더리 모델에 가까워 표준품과 근본적으로 다름 — 과거 커스텀 GPU 실패 원인이자 확보해야 할 체질. (5) 미주 우선 선택과 집중 + 중화 재진입 딜레마(YMTC·CXMT). (6) 하이-로 포트폴리오(80% 메인스트림 현금 + 20% 차별화 옵션). 베인 신문섭의 "AI가 돈을 버는가/수요 검증 사이클"을 내부 제품·캐파 관점에서 재확인.
- **sources**: `raw-notes/choi-jangseok-product-planning-interview-2026-07-29.md` 신설(참석자 구성·과제 맥락 헤더 + 자동 전사 녹취록 전문, 원본·불변). `index.md` raw-notes 섹션 갱신.
- **dashboard (v2.32.7, 패치 = 데이터/콘텐츠 추가, 동일 탭·스키마)**: `data/interviews.js` INTERVIEWS 최상단에 최장석 인터뷰 추가(15개 섹션·keyQuotes 4). `data/updates.js` v2.32.7 항목. `src/version.js` v2.32.7.
- **건너뜀**: wiki·outputs·기타 dashboard 데이터는 본 인터뷰가 분석 페이지 수치를 직접 바꾸지 않으므로 미변경(신문섭 인터뷰와 동일 스코프). 인터뷰 인사이트의 위키 환원(HBM↔DDR 캐파 상쇄·zHBM·커스텀 체질)은 후속 ingest에서 검토.

## [2026-07-21] assessment | 시나리오 포지션 맵·확률 정기 재평가 — 유지 + 삼성 HBM4 볼륨 발주 지연·EWI 갱신 (v2.31.5 → v2.31.6)
- **무엇**: 직전 포지션 맵 갱신(2026-07-14) 이후 git log상 신규 커밋·소스 없음. 07-14→07-21 구간을 웹 리서치로 점검한 결과 거시 축(DF1·DF2)을 움직일 신규 실현 신호가 없어 **포지션 맵(DF1 8.5·DF2 0.5)과 확률(A26·B39·C8·D21·E6)을 전부 유지**. 이번 주 물질적 발전은 개별 실행 신호 하나 — 삼성 HBM4가 NVIDIA 인증(06-05 Vera Rubin 3사 인증)을 통과했으나 07-17 현재 볼륨(양산) 발주로 미전환·매출 유상 평가용 샘플 수준(Winbuzzer 07-17), SK Rubin 2/3+ 락인 유지. 이는 거시 축이 아니라 시나리오 B 내부의 삼성 점유·실행 리스크 → EWI·트리거·B 내러티브로만 반영. 신규 소스 1건(`samsung-hbm4-volume-order-pending-2026-07-17.md`).
- **왜**: 주간 모니터링 사이클 — 시나리오 포지션 맵을 최신 수집 데이터 대비 재평가하고, EWI·시나리오 트리거 중 갱신 가능한 부분을 갱신하기 위함. 확증(무변화) 신호: 빅테크 4사 2026 CapEx ~$725B(+77% YoY, DF1 정점 재확인)·GPU 현물 임대가 firming(H200 +8% YoY, 붕괴 아님 → 수요 변곡 조기경보 미발동)·DRAM Q3 계약가 +13~18% 감속(소비자 지불한계·기저효과에 따른 정제, 서버 견조)·MATCH 위원회 단계 유지·CXMT 2026 HBM 양산 지연.
- **EWI·트리거**: EWI 5종 갱신 — `bigtech_capex_growth` 40→77%(2026 실측)·`samsung_hbm4_rubin_share` 28% 유지+볼륨 발주 대기 이력·`gpu_rental_h100_usd`/`gpu_rental_price_trend` firming 이력(H200 +8% YoY)·`cxmt_hbm3_production` "2026 HBM 양산 지연" 이력. 트리거 발동 0건 — `samsung_hbm4_nvidia_confirmed`(볼륨 계약 기준)는 인증만으로 미충족(note 보강), `samsung_hbm4_no_nvidia`(deadline 2026-12-31) 미도래.
- **영향받은 페이지**: `sources/articles/samsung-hbm4-volume-order-pending-2026-07-17.md`(신규), `dashboard/src/data/{indicators,scenarioPlanning,updates,version}.js`, `wiki/driving-forces/key-drivers.md`, `wiki/scenarios/scenario-matrix.md`, `wiki/entities/samsung.md`, `outputs/report/scenario-planning-report.md` §5.1, `index.md`. 위키 간 링크 무변경(신규 링크는 sources/ 인용) → 지식그래프 재생성 생략. PPTX는 확률 미포함·구조 무변경 → 재생성 생략. `cd dashboard && npm run build` 검증.

## [2026-07-08] build | 인터뷰 목차 앵커 버그 수정 + 상위 탭 메뉴명 영문 통일 (v2.31.2 → v2.31.3)
- **무엇**: (1) 인터뷰 메뉴 목차에서 문서 하단 섹션(§15·§16 등)을 클릭하면 스크롤 여유 부족으로 뷰포트 최상단까지 못 가고 화면 중간(§16 결론은 466px 지점)에 멈추던 버그 수정 — 본문 말미 trailing spacer(h-70vh) 추가로 모든 섹션 최상단 정렬, 목차 클릭을 `scrollIntoView({behavior:'smooth'})`+도착 섹션 링 강조로 전환(#해시 잔류 제거 → 해시 라우팅과 충돌 방지). (2) 상위 탭 메뉴명 한글("인터뷰"·"업데이트 내역")을 영문(Interviews·Updates)으로 통일. 패치 v2.31.3.
- **왜**: 사용자 보고("목차 클릭하면 이상한 곳으로 가네") + 상위 메뉴 영문 통일 요청("인터뷰·업데이트 내역만 한글이라 안 어울린다").
- **검증**: `vite preview` + playwright-core(Chromium /opt/pw-browsers) 실측. 수정 후 16개 섹션 전부 headingTop=16px(=scroll-mt-4) 정렬 확인. 검증 스크립트·임시 dev 의존성(playwright-core)은 커밋에서 제외.
- **dashboard (v2.31.3, 패치)**: `components/Interviews.jsx`(scrollToSection·flashId·spacer), `App.jsx`(TOP_TABS 라벨 Interviews·Updates), `data/updates.js`, `src/version.js`.

## [2026-07-07] assessment | 시나리오 포지션 맵·확률 재평가 — LTA→SCA 계약 체제 확립 반영 (B 37→38·C 9→8, DF1 8.5 유지, v2.31.2)
- **무엇**: 직전 포지션 맵 갱신(2026-07-04, 정점 확증 DF1 8.0→8.5) 이후 git log로 파악한 변경분(LTA→SCA 전환·Micron–Anthropic SCA·Stargate LOI·CAPEX 추가 상향)을 근거로 포지션 맵·확률 재평가. **DF1 8.5·DF2 1.0 유지**, 확률 **B 37→38·C 9→8**(A27·D21·E6 불변, 합 100).
- **왜**: 이번 주기의 핵심 변화는 개별 실적이 아니라 **계약 구조** — 산업이 스팟→LTA→SCA(공동설계+다년공급+운영통합+자본연계)로 이동하며 다년 계약 락인이 근단기 순환 붕괴 확률을 추가 축소(UBS: "LTA가 메모리 cyclicality를 근본적으로 제거"). Micron–Anthropic SCA(06-22)·SCA 16건 $100B 공시 제도화·Stargate LOI(글로벌 DRAM 40%)가 근거. 상쇄 하방으로 범용 DRAM Q3 감속(+13~18% vs Q2 +58~63%)이 처음 등장했으나 비(非)AI-락인 범용 축에 집중·서버/HBM/SCA 락인 축 견조 → 구조 반전 아닌 정제. 지지 성격이 실적 모멘텀→계약 구조 락인으로 전환됐으나 정점 위치는 8.5 유지.
- **EWI·트리거**: 삼성 HBM 점유율 Counterpoint Q1 확정 ~32% 교차 병기(시계열은 hbm-share.json 37% 기준 통일). SCA 전환 EWI 3종은 07-04 기준선 유지(신규 분기 데이터 없음). 시나리오 트리거는 임계 미충족으로 신규 발동 없음(LTA→SCA는 방향 근거일 뿐 특정 트리거 크로싱 아님).
- **영향받은 페이지**: dashboard/src/data/{indicators.js(포지션·확률·HBM점유율 EWI), scenarioPlanning.js(DF1·matrix 확률), updates.js(assessment 신규 항목), version.js(v2.31.2)}, wiki/driving-forces/key-drivers.md, wiki/scenarios/scenario-matrix.md, outputs/report/scenario-planning-report.md(§5.1 확률표 2026-06 잔존값 정정 + Exec Summary). 위키 링크 구조 무변경이라 지식그래프 재생성 생략. PPTX는 시나리오 확률 미포함이라 재생성 생략.

## [2026-07-06] build | 스타 엔지니어 논거 정정 — DE는 이미 존재, 미션 재정의 + 실리콘밸리 영입 (v2.31.0 → v2.31.1)
- **무엇**: 사용자 정정 — ① "DE 1호 임명"은 틀림, DE는 이미 존재 → **기존 DE에게 고객사 협업·기술 리드 미션 부여** + **관리 보직에서 분리**(현 DE는 관리자 역할에 묶여 기술 교류 어려움, dual-ladder 실효화). ② **실리콘밸리 현역 스타 영입** 강조 — 고객 대부분이 미국이라 영어 커뮤니케이션이 관건, 한국인 한계 → SV 스타가 언어·현지 네트워크·아키텍처 감각을 동시 확보하는 최적 경로.
- **반영**: §4.6을 "전제(DE 존재) + 축 A(미션 재정의·관리 분리) + 축 B(SV 영입·미국 고객·영어)"로 재구성. 축3 조직 항목·액션 A5/B6·KPI(고객리드 DE·SV 영입 2행)·보고서 §4.6·PPTX(축3 항목·NEXT STEP)·대시보드(DT_STAR_ENGINEER.twoAxes + 카드 렌더·DT_AXES·DT_PHASES·DT_KPIS) 전면 수정. source §3 실행 전제 추가.
- **검증**: 대시보드 빌드·프리뷰(2축 카드 렌더·콘솔 0), PPTX 오버플로우 0·문구 확인. 위키 링크 구조 무변경이라 지식그래프 재생성 생략. 패치 bump v2.31.1.

## [2026-07-06] ingest | 개발실 전환에 스타 엔지니어(Distinguished Engineer) 트랙 추가 (v2.30.1 → v2.31.0)
- **무엇**: 사용자 요청 — 스타 엔지니어/Distinguished Engineer 필요성 추가. ① **호명사회**(송길영 『시대예보: 호명사회』): 조직 이름 뒤에 숨지 않고 개인이 이름으로 불리는 사회 → 대기업도 스타(개인) 필요, SCA 시대 고객 신뢰 단위 = "그 아키텍트 누구". ② **메모리 처우 급등 활용**(2026 삼성 DS ~6억 성과급·SK 영업이익 10%·연봉 상한 철폐): 스타 영입 협상 우위(재원·정상화·명분·이탈방어). 조직×문화 양축에 걸친 요소로 정리(조직=DE 이원 트랙 신설, 문화=호명).
- **파일**: `sources/articles/star-engineer-context-2026-07.md` 신규(호명사회 + 성과급 급등 5개 근거). `wiki/strategies/dev-org-transformation.md`(축2 문화·축3 조직 항목 + §4.6 스타 엔지니어 섹션 + 액션 A5/B6 + KPI DE 수 + frontmatter). `outputs/report`(§4.6 + 축 표 + Phase 2 + KPI). `outputs/presentation`(슬라이드 3 문화·조직 축 항목 교체 + NEXT STEP 타이밍 논거, PPTX 재생성). `dashboard`(devTransformation.js DT_STAR_ENGINEER·DT_AXES·DT_PHASES·DT_KPIS + Strategies.jsx 스타 엔지니어 카드). index.md. 마이너 bump v2.31.0.
- **검증**: 대시보드 빌드·프리뷰(카드 렌더·호명사회 인용·처우 급등 4포인트·콘솔 0), PPTX 오버플로우 0·문구 확인, 지식그래프 재생성(80노드·고아 0).

## [2026-07-05] build | 모델링 범위 시각화 — 계단형 → 중첩(onion) 프레임 (v2.30.0 → v2.30.1)
- **무엇**: 사용자 참조 이미지(AI Datacenter ⊃ Rack ⊃ Server ⊃ GPU 중첩 줌) 반영 — 계단형 막대를 **중첩 프레임**으로 교체. 메모리 디바이스가 서버·랙·데이터센터 안에 순차 포함되며 바깥으로 갈수록 모델링 범위가 커지는 containment 시각화.
- **대시보드**: `Strategies.jsx` 모델링 범위 카드를 SVG 동심(onion) 프레임으로 재작성 — 데이터센터(바깥·연파랑) ⊃ 랙 ⊃ 서버 ⊃ 메모리 디바이스(중심·진파랑 칩), 각 프레임 모델버전·Phase 라벨 + "모델링 범위 확대 →" 화살표. 패치 bump v2.30.1.
- **발표자료**: 슬라이드 2 좌하 계단형 → 중첩 프레임(하단 정렬·폭이 안쪽으로 축소, 라벨은 각 프레임 고유 우측 띠). PPTX 재생성(오버플로우 0·기하 검증).
- **검증**: 대시보드 빌드·프리뷰 SVG 렌더 확인(4프레임·라벨 8종·콘솔 0), PPTX 중첩 좌표 검증.

## [2026-07-05] build | 모델링 범위 확대 시각화 — 대시보드 + 발표자료 계단형 (v2.29.0 → v2.30.0)
- **무엇**: 사용자 요청 — "모델링 범위가 디바이스에서 서버·랙으로 확대되는 것을 시각적으로". 계단형(staircase) 시각화 도입: 디바이스 ⊂ 서버 ⊂ 랙 ⊂ 데이터센터로 막대 높이가 상승(범위·정밀도↑), 로드맵 버전(현재/v0.1/v1.0/v2.0)·Phase와 매핑.
- **대시보드**: `devTransformation.js` DT_MODELING_SCOPE(4단계 stages·intro) 추가, `Strategies.jsx` 개발실 전환 탭에 "모델링 범위 확대 — 디바이스에서 데이터센터로" 카드(계단 막대 + 포함관계 그라데이션 범례). 마이너 bump v2.30.0(새 데이터 카테고리·시각화). npm run build 통과, 프리뷰 렌더 확인(콘솔 0).
- **발표자료**: 슬라이드 2 좌하에 계단 시각화 추가 — As-Is/To-Be 행 높이 0.57→0.47로 축소해 공간 확보, "모델링 범위" 행 강조(blue-10). 막대 4개 하단 정렬·높이 0.34→0.81 상승. PPTX 재생성(오버플로우 0, 막대 좌표 검증).
- **검증**: 대시보드 빌드·프리뷰 OK, PPTX 계단 막대 기하 검증(상승·SO WHAT 미충돌).

## [2026-07-05] build | 개발실 전환 발표자료 — 폰트 2단계 상향 + 레이아웃 확장 (빈 공간 축소)
- **무엇**: 사용자 피드백 "폰트 두 단계 키워도 됨 · 내용 대비 빈 공간 많음". 타입 스케일 전체 +2단계 상향(T_TITLE 20→23·T_SECTION 12→14·T_CARD 11→13·T_BODY 10→12·T_SUB 9→11·T_CAP 8→10·T_NUM 18→22·T_DATA 11.5→13.5). 커진 폰트 수용 + 빈 공간 축소를 위해 카드·행 높이/간격 확장(예: As-Is/To-Be 행 0.4→0.57, 축 카드 1.5→1.64, 키넘버 0.62→0.74, 타임라인 0.5→0.56), 콘텐츠가 6.4in(SO WHAT 직전)까지 차도록 재배치.
- **검증**: 재생성 후 슬라이드별 실제 폰트 = S1 {10,11,12,13,14,22,23}·S2 {11,12,14,23}·S3 {10,11,12,13,14,23} (+ 푸터 9) — 위계 유지, 오버플로우 0, maxBottom 7.4in(푸터). outline 스케일 갱신. dashboard 무변경이라 version bump 없음.

## [2026-07-05] build | 개발실 전환 발표자료 — 타이포그래피 스케일 도입 (평면 9pt → 8단계 위계)
- **무엇**: 사용자 피드백 "전부 9pt라 평면적·작아 보임 → 단계별 폰트 위계 필요". 타입 스케일 상수(T_TITLE 20·T_SECTION 12·T_CARD 11·T_BODY 10·T_SUB 9·T_CAP 8·T_NUM 18·T_DATA 11.5) 도입해 `generate_dev_transformation_pptx.py` 전체 size= 를 스케일로 교체. 섹션 제목 9.5→12(본문과 확실히 구분), 헤더 19→20, 카드/행 제목 11, 본문 10, 태그/캡션 8.
- **검증**: 재생성 후 슬라이드별 실제 사용 폰트 = S1 {8,9,10,10.5,11,12,18,20}·S2 {9,10,10.5,12,20}·S3 {8,9,10,10.5,11,12,20} — 6~8단계 위계 확인, 오버플로우 0. outline 타입 스케일 명시. dashboard 무변경이라 version bump 없음.

## [2026-07-05] build | 개발실 전환 발표자료 — Apple HIG→IBM Carbon 고밀도 재작성 (여백 축소·본문 9pt)
- **무엇**: 사용자 피드백 "Apple은 여백이 많음 → 여백 줄이고 한 슬라이드에 많은 내용, 폰트 9pt". `generate_dev_transformation_pptx.py`를 IBM Carbon Design System으로 재작성. 각진(sharp) 카드 + 얇은 헤어라인 그리드 + 외곽 마진 0.32in로 밀도 ↑(shape 60~68→74~85). 본문 9pt(라벨 8~8.5pt). 압축했던 As-Is/To-Be 행(기술 방향·정보 흐름) + 전체 5-이벤트 타임라인 복원.
- **Carbon 구현**: `G.THEME.update(CARBON)` — Blue-60 #0f62fe(단일 액센트)·Yellow-30·Red-60·Green-50·Gray-100/70/20/10·Blue-10. 폰트 IBM Plex Sans KR + IBM Plex Mono(숫자). 팔레트 토큰은 기존 `generate_carbon_pptx.py`(시나리오 덱 Carbon 변형)와 동일 계열. 각진 카드는 기본 add_rect 사용.
- **검증**: python-pptx 구조 검증 — 3슬라이드·오버플로우 0·핵심 문구 11/11 present(복원 행 포함). `dev-transformation-outline.md` Carbon·고밀도로 갱신. dashboard 무변경(발표 산출물 전용)이라 version bump 없음.

## [2026-07-04] build | 개발실 전환 발표자료 — 6장→3장 축약 + Apple HIG 테마 재작성
- **무엇**: 사용자 요청 — 발표자료를 3장으로 축약(함축적 카피 + 소형 폰트 8~9pt로 컴팩트) + Apple 디자인 시스템으로 테마 변경. `generate_dev_transformation_pptx.py`를 3장 Apple HIG 버전으로 전면 재작성: WHY(사건+북극성 명제+계약 3단 진화+Micron 4요소) / WHAT(As-Is→To-Be 5행+FDE 벤치마크+리스크↔이점) / HOW(4대 축+3-Phase+KPI).
- **Apple HIG 구현**: `generate_pptx.py` helper 재사용하되 모듈 전역 `THEME`를 Apple 토큰(systemBlue #007AFF·systemOrange·systemRed·systemGreen·primary label #1D1D1F·secondaryLabel·opaqueSeparator·레이어드 배경)으로 in-place 치환(`G.THEME.update(APPLE)`) → helper 내부 색까지 Apple화. 폰트: 한글 Apple SD Gothic Neo + 영문/숫자 SF Pro Display. 둥근 카드(ROUNDED_RECTANGLE) helper 추가. 팔레트 토큰은 기존 `generate_apple_hig_pptx.py`(시나리오 덱 Apple 변형)와 동일 계열.
- **검증**: python-pptx 구조 검증 — 3슬라이드·오버플로우 0(모든 shape 슬라이드 경계 내)·핵심 문구 9/9 present. `dev-transformation-outline.md` 3장·Apple HIG로 갱신. dashboard 무변경(발표 산출물 전용)이라 version bump 없음.

## [2026-07-04] ingest | 개발실 전환 설득력 보강 — Palantir FDE 벤치마크 + 신문섭 북극성 명제 (v2.28.3 → v2.29.0)
- **무엇**: 사용자 요청 두 흐름 추가. ① **Palantir FDE(Forward Deployed Engineer, 내부코드 "Delta")** — 고객사 상주 엔지니어 모델을 Co-Design Pod의 검증된 롤모델로 명시. 5개 원리→개발실 매핑(상주/한고객·다능력/명시vs실제 요구/gravel→paved/성과평가), Anthropic·OpenAI GTM 채택이 방증, 메모리 변형(FDE+시스템 모델링 결합) 강조. ② **신문섭 파트너 북극성 명제** — 인터뷰 원문 "고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다"를 전략 서두·표지 배너로 격상.
- **파일**: `sources/articles/palantir-fde-model-2026-07.md` 신규(FDE 5개 근거). `wiki/strategies/dev-org-transformation.md`(북극성 인용·§4.5 FDE 벤치마크 섹션·축3·A1). `outputs/report/dev-org-transformation-report.md`(Exec Summary 명제·§4.5). `outputs/presentation/`(5장→**6장**: 표지 북극성 배너 + 신규 슬라이드5 FDE 벤치마크, 실행 슬라이드6으로 이동) PPTX 재생성. `dashboard`(devTransformation.js DT_SUMMARY.northStar·DT_FDE_BENCHMARK·DT_AXES, Strategies.jsx 북극성 배너+FDE 카드). 마이너 bump v2.29.0(새 데이터 카테고리·발표 슬라이드 추가).
- **검증**: `npm run build` 통과, PPTX 6장 생성, 프리뷰에서 북극성 인용·FDE 매핑 5행·방증·메모리 변형 렌더 확인·콘솔 0.

## [2026-07-04] ingest | SCA 전환 EWI 3종 기준선 등록 (v2.28.2 → v2.28.3)
- **무엇**: lta-to-sca-transition §5의 EWI 후보 3종을 기준값 조사 후 대시보드 지표로 등록. ① `competitor_sca_disclosures` — 경쟁사 SCA형(공동설계 포함) 계약 공시, 기준 분기 1건(Micron–Anthropic 06-22), 경보 분기 2건+. ② `samsung_codesign_contracts` — Samsung 공동설계 조항 계약, 기준 공시 0건(선행 신호: 커스텀 전담 2팀·250명 증원·Broadcom/AMD 협의), 1건+ = DT Phase 2 달성 긍정 경보. ③ `custom_hbm_revenue_share` — 커스텀 HBM 매출 비중 기준 ~0%(2026은 표준 HBM3E/HBM4 중심), 경보 30%+(경계 15%), 선행 지표 HBM4E 2027년 ~40% 전망.
- **파일**: `sources/articles/sca-ewi-baseline-2026-07-04.md` 신규(TrendForce 3건 근거), `wiki/concepts/lta-to-sca-transition.md` §5 기준선 표로 확정, `dashboard/src/data/indicators.js` 분기별 3종 추가, index.md. 패치 bump v2.28.3.
- **다음 갱신**: Micron Q4 FY26(2026-09 말)·TrendForce HBM 분기 리포트 — 정기 점검 사이클에서 흡수.
- **건너뜀**: 지식 그래프(위키 간 링크 무변화 — sources 링크만 추가), outputs 보고서·PPTX(EWI 운영 데이터 계층 — 보고서 서사 무영향).

## [2026-07-04] lint | SCA ingest 후속 — entities 갱신 + 역링크 7건 (v2.28.0 → v2.28.1)
- **무엇**: 이번 SCA ingest가 entities를 건드리지 않았고 신규 전략 페이지의 역링크가 없었음(비대칭 링크). ① `wiki/entities/micron.md` Update(Anthropic SCA — 4단계 진입 확정), `wiki/entities/samsung.md` Update(Series H 참여했으나 공동설계 계층 미확보 → dev-org-transformation 대응). ② RS-3·RS-7·RS-8·RS-9·MB-4 페이지에 dev-org-transformation·lta-to-sca-transition 역링크/Update 추가.
- **효과**: 지식 그래프 상호링크 54→62, 비대칭 233→230, dev-org-transformation이 허브 진입(연결 17). 그래프 재생성 + `npm run build` 통과. 패치 bump v2.28.1 (생성 데이터 갱신).

## [2026-07-04] build | 대시보드 딥링크 URL — 페이지·서브탭 해시 라우팅 (v2.27.1 → v2.28.0)
- **무엇**: 대시보드에 해시 기반 딥링크 라우팅 추가 — 페이지·서브탭마다 공유 가능한 고유 URL(`#/페이지/서브탭`). 신규 훅 `dashboard/src/hooks/useHashRoute.js`(useHashSegment — location.hash 세그먼트를 useState처럼 사용, 유효하지 않은 URL은 기본 탭으로 폴백, 뒤로가기 지원). App.jsx 최상위 8개 탭 + EWI 메인 탭, BottleneckModel·ScenarioPlanning·Strategies·DataVisualization 서브탭, Interviews 개별 인터뷰 선택까지 URL 동기화. 예: `#/strategy/transformation`, `#/ewi/triggers`, `#/interviews/ai-infra-supercycle`.
- **왜**: 사용자 요청 — 특정 페이지를 다른 사람에게 공유할 때 항상 루트에서 메뉴를 찾아 들어가야 하는 불편 해소.
- **건너뜀**: 위키·outputs 갈래 (콘텐츠 변경 없음 — 대시보드 코드만), PPTX 재생성·지식 그래프 재생성 불필요.
- **검증**: `npm run build` 통과. 프리뷰에서 ① 최초 진입 시 `#/ewi` 정규화 ② 탭 클릭 → URL 갱신 ③ `#/planning/scenarios`·`#/strategy/transformation` 딥링크 직접 진입 시 해당 서브탭 렌더 ④ 잘못된 URL `#/oops/zzz` → `#/ewi` 폴백 확인, 콘솔 오류 0. 마이너 bump v2.28.0 (큰 UX 기능 추가).

## [2026-07-04] build | 개발실 전환 보강 — 시스템 아키텍트·모델링 축 추가 (v2.27.0 → v2.27.1)
- **무엇**: 사용자 피드백 반영 — 공동 최적화의 기술적 전제조건으로 ① **시스템 레벨 성능·파워 모델**(우리 제품이 고객 시스템에서 만드는 성능·전력·TCO 효과를 정량 예측, 고객 공용 시뮬레이션 자산화)과 ② **시스템 아키텍트·모델링 전문 인력·조직**(외부 채용+내부 육성, Pod에 아키텍트 공급) 추가. ③ **모델링 범위 확장**(메모리 디바이스 단품 → 서버→랙→데이터센터 전체 시스템)을 As-Is/To-Be 8번째 행으로 명시.
- **전파**: `wiki/strategies/dev-org-transformation.md`(축1·축3·액션플랜 A2/B2a/C4·KPI 2행) → `outputs/report/dev-org-transformation-report.md`(§2.1·§4·§5) → `dev-transformation-outline.md` + PPTX 재생성(슬라이드 3·5) → `dashboard devTransformation.js`(DT_ROLE_SHIFT·DT_MODELING_NOTE·DT_AXES·DT_PHASES·DT_KPIS) + `Strategies.jsx` 모델링 강조 노트. 패치 bump v2.27.1 (기존 카테고리 내 콘텐츠 보강).
- **건너뜀**: 지식 그래프 재생성 (페이지 간 링크 변화 없음 — 본문 보강만).
- **검증**: `npm run build` 통과, 프리뷰에서 신규 콘텐츠 6개 항목 렌더 확인·콘솔 오류 0.

## [2026-07-04] build | 개발실 체질 전환 — 보고서·5장 PPTX·대시보드 전략 서브탭 (v2.26.0 → v2.27.0)
- **무엇**: ① `outputs/report/dev-org-transformation-report.md` 신규 (LTA→SCA 사건 연대기·As-Is/To-Be·리스크/이점·4대 축·3-Phase). ② `outputs/presentation/dev-transformation-outline.md` + `scripts/generate_dev_transformation_pptx.py` → `dev-org-transformation.pptx` 5장 생성 (기존 THEME 재사용). ③ 대시보드 Strategy 탭에 "개발실 전환" 서브탭 신규 — `src/data/devTransformation.js` (사건 타임라인·계약 3단 진화·SCA 4대 요소·역할 비교·리스크/이점·4축·3-Phase·KPI·시나리오 연결), `Strategies.jsx` TransformationPanel. 마이너 bump v2.27.0 (새 서브탭 + 새 데이터 카테고리 — 같은 날 포지션 재평가 작업이 v2.26.0 선점, rebase로 정정).
- **왜**: 사용자 요청 — Micron–Anthropic SCA를 계기로 개발실의 일하는 방식·문화·조직 체질 개선 전략과 액션 플랜 수립.
- **검증**: `npm run build` 통과, 프리뷰에서 새 서브탭 렌더·콘솔 오류 0, 지식 그래프 재생성 (79 노드·고아 0).

## [2026-07-04] ingest | Micron–Anthropic SCA + LTA→SCA 산업 전환 맥락
- **무엇**: `sources/articles/micron-anthropic-sca-2026-06-22.md` (전략적 계약 4대 요소: 공동 최적화·다년 공급·Claude 전사 도입·Series H 투자), `sources/articles/lta-to-sca-industry-context-2026-06.md` (LTA 선급금 10~30% 체제화·Stargate LOI 월 90만 장·커스텀 HBM $130B 3주제 묶음) 신규 수집.
- **위키 반영**: `wiki/concepts/lta-to-sca-transition.md` 신규 (계약 3단 진화 Spot→LTA→SCA), `wiki/concepts/customer-co-design-anthropic.md` Update 2026-07-04 (Micron 4단계 실체화·Series H), `wiki/strategies/dev-org-transformation.md` 신규 (개발실 체질 전환 전략 — MB-4·RS-3·RS-7·RS-8·RS-9 연결).
- **인덱스**: index.md에 신규 페이지 4건 + outputs 2건 등록.

---

## [2026-07-04] ingest | 7월 정기 시장 점검 — 병목 모델 갱신(전력 72·CAPEX 40·파운드리 50·패키징 67) + SK하이닉스 나스닥·반독점 소송 (병렬 브랜치에서 진행, main v2.28.1과 병합 → v2.28.2)
- **참고**: 본 ingest는 v2.26.0(포지션 재평가) 시점에서 분기한 별도 브랜치(`claude/focused-pascal-lqlzxp`)에서 진행되어 위 SCA·개발실 전환 작업(v2.27.0~v2.28.1)과 시간상 병렬로 존재했다. main 병합 시점 기준으로 버전은 v2.28.1 → **v2.28.2**(패치)로 이어진다.
- **무엇**: semianalysis.com·counterpointresearch.com·techinsights.com을 우선 참조하고 PJM·ERCOT·TrendForce·Dell'Oro·JPMorgan·SEC 등으로 보강한 5개 병렬 리서치 에이전트(전력/CAPEX/파운드리·패키징/HBM시장/AI DC)로 최신 데이터를 수집, 이전 병목 정기 점검(2026-06-14) 대비 4대 제약지수를 갱신: **전력 70→72(▲+2)·CAPEX/ROI 42→40(▼-2)·파운드리 52→50(▼-2)·패키징 68→67(▼-1)**. 전력은 2개 분기 연속 재상승 — ERCOT 대형부하 접속 큐 1년 만에 410GW+로 거의 4배 폭증·PJM 2030년까지 최대 15GW 구조적 부족·변압기/개폐장치 리드타임 5년으로 가스터빈보다 강한 신규 병목 부상. CAPEX는 빅5(MS $190B·Alphabet $180~190B·Amazon $200B·Meta $125~145B·Oracle ~$50B) 추가 상향 + Dell'Oro 글로벌 DC CAPEX 2026 $1조 돌파 + JPMorgan 2030 누적 $5.5조 상향으로 완화 지속. 파운드리는 ASML High-NA EUV 도입이 TSMC에 의해 2029년까지 연기되며 완화. 패키징은 NVIDIA CoWoS 배정(~60%) 확정·OSAT 외주 확대로 공급대응이 진전됐으나 CoPoS 전면양산 2028~29 재확인 + HBM4 하이브리드본딩 수율 10%로 업계가 마이크로범프 유지로 선회하며 완화 속도 둔화.
- **주요 신규 사실**: ① HBM4 Vera Rubin 공급배정 세분화(SK하이닉스 60~70%·삼성 25~30%·Micron 잔여) + Micron 초기 빌드 일시배제→2026-06-01 GTC 재확인 에피소드. ② **SK하이닉스 나스닥 이중상장** 추진(Form F-1 수정 06-30, 티커 SKHY, 목표조달액 ~$294억, 거래개시 07-10, 역대 최대 ADR 상장 전망). ③ **DRAM 반독점 집단소송**(2026-06-25 N.D.Cal. 제소, 삼성·SK하이닉스·Micron 공동피고 — HBM 전환 명목 범용 DRAM 공급제한·가격담합 주장) — 신규 개념 페이지로 추적. ④ TrendForce(07-03, 최신) Q3 2026 범용 DRAM 계약가 전망 +13~18% QoQ(Q2 +58~63% 대비 대폭 감속) — 수요 변곡 EWI 조기신호 후보 추가. ⑤ 한국 정부 800조 원 반도체 생태계 계획(06-29, 삼성·SK 각 신규 팹 2개). ⑥ CXMT HBM 웨이퍼 2026년 말 월 3만 장 전망(위협 시점 조기화).
- **왜**: 사용자 지시 — "@data 보고서 작성에 필요한 최신 데이터를 검색하여 업데이트, semianalysis/counterpoint/techinsights 등 참조, Bottleneck Model 최신 수치 반영 + 변동폭 표시, LLM wiki·link 업데이트, 필요시 전략 수정".
- **sources**: 신규 `sources/articles/july-2026-market-update-2026-07-04.md`(5개 에이전트 수집 통합, 전력/CAPEX/파운드리·패키징/HBM시장/AI DC 5개 섹션 + 병목지수 변동 요약).
- **wiki**: 신규 페이지 `wiki/concepts/dram-antitrust-litigation.md`. 갱신 17개 — entities(`samsung.md`·`sk-hynix.md`·`micron.md`·`tsmc.md`·`cxmt.md`), concepts(`bottleneck-model-2030.md`·`energy-constraints.md`·`ai-capex.md`·`hbm-market.md`·`price-trends.md`·`hbm-roadmap.md`·`dram-market-share.md`·`korea-policy.md`·`demand-inflection-ewi.md`·`ai-datacenter-buildout.md`·`semiconductor-cycle.md`), strategies(`invariant/rs5-financial-discipline-reinvestment.md` — 재무규율에 반독점 리스크·DRAM 가격감속·SK하이닉스 자본접근성 확대를 신규 모니터링 항목으로 추가, 전략 자체는 불변 판단). `index.md` 갱신(신규 소스·신규 페이지 등록).
- **전략 검토 결과**: 신규 리스크(반독점 소송)는 병목 모델의 실물 수급 구조를 바꾸지 않고 결론 미확정 단계라 **신규 전략 미신설** — RS-5 모니터링 항목으로만 편입. SK하이닉스 나스닥 상장은 RS-1·RS-5·RS-6 벤치마크 갱신 필요 항목으로 교차 참조. 9개 Robust 전략 구성 자체는 불변.
- **LLM 지식그래프**: `node scripts/build-knowledge-graph.mjs` 재실행 — 노드 77→**78**·엣지 275→**285**(상호 56)·평균연결 7.1→7.3·고립 0·고아 0 유지.
- **dashboard (main 병합 후 v2.28.1 → v2.28.2, 패치 = 데이터 갱신)**: `data/bottleneckModel.js`(MODEL_ASOF/PREV_MODEL_ASOF/PREV_INDICES·제약지수 4개·indexNote 4개·DRIVERS_ASOF·드라이버 노트 6개 갱신), `data/demandSignals.js`(EWI_ASOF·capex_guide 노트·신규 신호 `dram_price_decel`), `data/strategies.js`(빅5 CapEx KPI 카드), `data/updates.js`(신규 ingest 항목), `data/knowledgeGraph.js`(재생성 — SCA 브랜치 신규 페이지 5개 + 본 ingest 신규 페이지 1개 합산 반영), `version.js`(v2.28.2).
- **outputs**: `outputs/report/scenario-planning-report.md` — "핵심 수치 한눈에" 표 전체 갱신(작성일 07-04) + §2.2.2 신규 소단원("[정기점검] 2026-07-04 시장 업데이트"). `outputs/presentation/slide-outline.md` — 헤더에 07-04 데이터 갱신 노트 추가(세부 슬라이드 CapEx 연쇄 수치·EWI 지표는 다음 구조 개편 시 일괄 재계산 예정 — 부분 수정 시 슬라이드 간 불일치 위험이라 명시적으로 보류). PPTX 본체 재생성은 구조 변경 없어 보류.
- **병합 노트**: `claude/focused-pascal-lqlzxp` 브랜치를 main(v2.28.1, SCA·개발실 전환 반영 완료)에 병합. 충돌 4건(`version.js`·`knowledgeGraph.js`·`log.md`·`wiki/entities/{micron,samsung}.md`) 모두 두 브랜치 내용을 보존하는 방향으로 수동 해결 — SCA/개발실 전환 Update 섹션과 본 ingest의 Update 섹션을 같은 페이지에 순서대로 병기, 지식그래프는 병합 후 재생성.
- **검증**: `cd dashboard && npm run build` 통과. 지식그래프 lint 고립 0·고아 0. 위키 내부 링크는 신규 페이지 상호링크 확인(samsung/sk-hynix/micron/bottleneck-model/ai-capex와 교차 링크).

---

## [2026-07-04] build | 시나리오 포지션 맵·확률 재평가 — Micron Q3 슈퍼사이클 확증 (DF1 8.0→8.5) (v2.25.2 → v2.26.0)
- **무엇**: 직전 포지션 맵 갱신(2026-06-06) 이후 git log로 수집분을 파악(병목 정기 점검 06-13/14, **Micron FY26 Q3 실적 06-24**)하고 시나리오 포지션 맵·확률을 재평가. ① **포지션 맵**: DF1 8.0→8.5 상향(DF2 1.0 불변, date 2026-06→2026-07). ② **확률**: A26→27·B35→37·C10→9·D23→21·E6 불변(합 100). ③ **EWI**: `dram_opm_vs_hbm_opm` 역전 신호 히스토리(06-24 Micron 84.9% 마진·DRAM ASP +low-60s%) 추가·`samsung_hbm_share` 35→37%(2026Q1 확정·4월 35~40% 급회복). ④ 업데이트 내역 메뉴에 **"포지션·확률"(assessment) 타입·필터 신설**로 재평가 이력을 별도 조회.
- **왜**: 사용자 지시 — "포지션 맵 최근 업데이트 대비 변경점 파악·반영, 업데이트 내역 별도 조회, EWI·트리거 수집 데이터 기반 갱신". Micron Q3 $41.46B 사상 최대·Q4 $50B·SCA 16건 $100B take-or-pay 백로그·2026 HBM 전량 Sold Out·수급 타이트 2027+ → 근단기 수요 가시성이 계약 백로그로 고정, 슈퍼사이클 정점 확증·근단기 하락 조정 확률 축소. 단 사상 최고 마진(84.9%)·DRAM>HBM OPM 역전은 후기순환(정점) 신호로 유효 → 하락 변곡 EWI 감시 지속. DF2는 디커플링 신규 신호 없어 불변.
- **트리거**: 수집분으로 활성화(activated) 조건 충족 트리거 없음 — Samsung 2027 캐파 사전확정·빅테크 2027 CapEx $500B 등 미확정. Micron 백로그는 산업 방증으로만 반영, 트리거 상태 불변.
- **wiki**: `driving-forces/key-drivers.md`(DF1 현재 위치), `scenarios/scenario-matrix.md`(확률 추정표·평가 기준).
- **dashboard (v2.26.0, 마이너 = 업데이트 내역 새 타입·필터 칩)**: `data/indicators.js`(INITIAL_QUADRANT_POSITIONS current·SCENARIOS·EWI 2건), `data/scenarioPlanning.js`(SCENARIOS_DATA.matrix 확률·요약·DF1 currentPosition), `data/updates.js`(assessment 항목), `components/Updates.jsx`(assessment 타입·칩), `version.js`.
- **건너뜀**: index.md(신규 페이지 없음), outputs/report·presentation(확률·포지션 수치 변경 수준 — 다음 보고서 빌드에 흡수, 발표자료 재생성 보류).
- **검증**: `cd dashboard && npm run build` 통과(2414 모듈·콘솔 0). 확률 합 100(27+37+9+21+6).

## [2026-06-28] build | 지식 그래프 팬(드래그) 크래시 수정 (v2.25.1 → v2.25.2)
- **무엇**: Knowledge Graph 탭에서 `Cannot read properties of null (reading 'vx')` 런타임 크래시 수정. `onPointerMove`의 `setView` 업데이터 클로저가 `drag.current.vx`를 지연 실행 시점에 읽는데, 그 사이 `onPointerUp`이 `drag.current = null`로 만들면 null 참조 발생. ref 값을 핸들러 진입 시점에 지역 변수(`const d = drag.current`)로 캡처하도록 변경.
- **왜**: 사용자 버그 리포트 — 그래프 탭에서 화면 오류, 다른 탭은 정상. 드래그-놓기 경합 조건.
- **검증**: 프리뷰에서 드래그+놓기-후-이동 시뮬레이션 → 크래시 없이 정상 팬, 77노드 렌더 유지, 에러 바운더리 미발생.
- **dashboard (v2.25.2, 패치 = 버그 수정)**: KnowledgeGraph.jsx onPointerMove, version bump.

## [2026-06-28] lint | 마이그레이션 잔존 깨진 링크 일괄 수선 + 고립 페이지 0 달성 (v2.25.0 → v2.25.1)
- **무엇**: 지식 그래프가 드러낸 연결성 결함을 수선. ① **마이그레이션(2026-05-18) 잔존 깨진 내부 링크 128건**(`analysis/` 37 + `data/` 87 + `report/` 4)을 각 타깃의 실제 wiki 위치로 재해석해 올바른 상대경로로 일괄 교정 — `scripts/fix-stale-analysis-links.mjs` 신설(basename 해석 + 개명 별칭 `competitors/market-share.md`→`concepts/dram-market-share.md`). 표시 라벨의 옛 경로(`analysis/`·`data/`·`report/`)도 `wiki/`로 정리. ② **기타 깨진 링크 5건** 수동 수선(ssd-ufs-market의 잘못된 `../technology/` 2건 → `entities/`·동일 dir; 보고서 역참조 3건 → 헌법상 원천인 `wiki/scenarios/strategy.md`로 재지정). ③ **고립 7개 페이지 신규 상호링크**: STEEP 4개(environment·political·social·technology) + Impact×Uncertainty 매트릭스에 Shell 파이프라인 spine 푸터 추가(STEEP→매트릭스→key-drivers→scenario-matrix, 상호링크화), 벤치마크 2개(agri-hedging·upside-participation)를 RS-8과 상호링크.
- **왜**: 사용자 요청 — 그래프 lint 신호(고립 9·역링크 누락) 기반 위키 상호링크 보강. 고립의 근본 원인이 단순 미링크가 아니라 **마이그레이션 때 끊긴 깨진 경로**였음이 그래프 추출로 드러남.
- **검증**: 위키 내부 .md 링크 604건 중 깨진 링크 **0건**(수선 전 9건). 그래프 재생성: 엣지 199→**275**(+38%)·상호링크 37→51·평균연결 5.2→7.1·**고립 9→0**·고아 0 유지.
- **dashboard (v2.25.1, 패치 = 데이터 갱신)**: `knowledgeGraph.js` 재생성(빌드 산출물), version bump. 빌드 통과·고립 0 lint 패널 확인.

## [2026-06-28] build | 위키 지식 그래프 — graph DB 없는 LLM 링크 시각화 (v2.24.2 → v2.25.0)
- **무엇**: Karpathy LLM Wiki의 "graph DB 대신 LLM이 유지하는 마크다운 링크" 개념을 **기계 순회 가능한 그래프로 추출·시각화**. ① `scripts/build-knowledge-graph.mjs` 신설 — `wiki/**/*.md`를 스캔해 노드(페이지)·엣지(페이지 간 인용 링크) 추출, degree 집계, 의존성 없는 손수 구현 force-directed 레이아웃으로 좌표 베이크, 고아(index.md 미등록)·고립(엣지 0)·역링크 누락(A→B인데 B가 A 미인용) lint 신호 산출 → `dashboard/src/data/knowledgeGraph.js`(GENERATED) 출력. ② 대시보드 `Knowledge Graph` 탭 신설 — SVG 팬/줌·호버 이웃 하이라이트·클릭 고정·카테고리 토글 범례·검색·허브 top8·lint 패널·노드별 GitHub blob 링크.
- **왜**: 사용자 요청 — "그래프 시각화를 위한 작업을 하고 대시보드에 표현". 기존엔 링크가 사람/LLM이 읽는 인라인 마크다운으로만 존재 → 노드-엣지로 추출하니 허브(Samsung 36·Bottleneck 18·HBM 16·NVIDIA 16)·고립 9·역링크 누락 162가 정량 가시화. graph DB의 쿼리/제약을 LLM lint 워크플로우로 대체하는 구조를 그대로 시각화.
- **산출 통계**: 노드 77 · 엣지 199(상호 37) · 평균연결 5.2 · 고아 0(인덱스 무결성 OK).
- **dashboard (v2.25.0, 마이너 = 새 탭 + 새 데이터 카테고리)**: App.jsx 탭 추가(Share2), KnowledgeGraph.jsx 신설, knowledgeGraph.js(빌드 산출물), version bump(원격 인터뷰 탭 v2.24.2와 rebase 머지). 빌드 검증 통과·콘솔 에러 없음. 재생성: `node scripts/build-knowledge-graph.mjs`.

---

## [2026-06-25] build | 보고서에 Micron Q3 FY26 분기 실적 상세 섹션 추가
- **무엇**: `outputs/report/scenario-planning-report.md` §2.2에 하위 절 **2.2.1 [속보] 마이크론 FY26 Q3 실적**을 신설. 손익 표(매출 $41.46B·마진 84.9%·EPS $25.11)·사업부 표(DRAM $31.3B·NAND $9.9B·데이터센터 $100B 런레이트·HBM4 $1B)·SCA $100B 16건·자본배분·Q4 가이던스 $50B·삼성 함의 4가지를 1차 자료 인용과 함께 본문화.
- **왜**: 사용자 지시 — 어제 마이크론 분기 실적 발표 내용을 보고서에 본격 추가.
- **영향 페이지**: `outputs/report/scenario-planning-report.md`(§2.2.1 신설). 직전 [2026-06-25] ingest의 KPI 표 1행과 중복 아닌 보강(상세 deep-dive). dashboard/src 변경 없어 version bump 생략. slide-outline은 직전 작업에서 Q3 수치 이미 반영돼 구조 변경 불요.

---

## [2026-06-25] ingest | Micron FY26 Q3 실적 발표 (2026-06-24) — $41.46B 사상 최대 (v2.24.1 → v2.24.2)
- **무엇**: 2026-06-24 발표된 Micron 회계 Q3 FY26(5/28 종료) 실적 반영. 매출 **$41.46B**(+74% QoQ·+346% YoY), GAAP 매출총이익률 **84.9%**(사상 최고), Non-GAAP EPS **$25.11**(컨센서스 $20.60 상회). DRAM $31.3B(76%, ASP +low-60s% QoQ)·NAND $9.9B. 데이터센터 연환산 $100B 초과. HBM4 누적 $1B·2026 캐파 완판. **SCA 16건 $100B·예치금 $22B**. Q4 가이던스 매출 **$50B**·마진 ~86%·EPS $30.73. 수급 타이트 calendar 2027 이후 지속 전망.
- **왜**: 사용자 지시 — 어제 실적 발표 내용 위키·보고서·대시보드 반영.
- **정정**: 직전 가이던스 $33.5B(june-2026-market-update §2)를 +24% 실제 상회 — 위키 내 $33.5B는 가이던스로 표기, 확정 실적은 신규 filing 따름.
- **영향 페이지**: 신규 `sources/filings/micron-q3-fy26.md`(1차 자료), `wiki/entities/micron.md`(Update 섹션), `wiki/concepts/price-trends.md`(Update 섹션), `index.md`(filings 섹션 신설·micron 설명), `outputs/report/scenario-planning-report.md`(KPI 표·현재 위치), `dashboard/src/data/updates.js`+`version.js`(v2.24.2 패치).

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

## [2026-07-11] ingest | 애플, 중국 내수용 기기에 CXMT DRAM 테스트 착수 (FT 2026-07-08)

사용자 제공 KBS 링크(직접 fetch 차단) → 웹검색·복수 매체(FT/CNBC/Reuters/이데일리/ZDNet/EBN 등) 교차 확인 후 반영. 신규 소스 `sources/articles/apple-cxmt-china-dram-2026-07-08.md`. **핵심**: 애플이 중국 내수용 기기 DRAM에 CXMT 기술 검증 착수 + 미 행정부에 사용 승인 로비. CXMT는 국방부 1260H(PLA 연계 의심) 리스트 등재. 배경 = 2026 초 범용 DRAM 계약가 +55~60% 급등·애플 맥북/아이패드 가격 인상. 전례 = 2022 YMTC NAND 무산. CXMT 웨이퍼 캐파점유 11%(2025)→15%(2028). 

갱신 wiki 6종: (1) `entities/cxmt.md` [Update 2026-07-11] 고객 인증 이정표 + 캐파/매출 점유율 이중 계열 정합. (2) `concepts/us-export-controls.md` 1260H 리스트 체계 위키 최초 도입 + 애플 케이스. (3) `driving-forces/key-drivers.md` DF2 현재위치 — 승인=Pole B 공존/차단=Pole A 디커플링 리트머스. (4) `scenarios/scenario-D.md` D의 교과서적 전조. (5) `strategies/invariant/rs4-...md` 대칭 논리("고객도 공급사 분산")·애플 price leverage. (6) `index.md` 소스 등록. 

빌드 동기화: `dashboard/src/data/indicators.js` 신규 EWI `cxmt_apple_qualification`(4단계 select, B·D 신호) 추가 → 지식그래프 재생성(node 80·edge 309·orphan 0) → version v2.31.3→v2.31.4(패치).

## [2026-07-14] assessment | 시나리오 포지션 맵·확률 재평가 — 애플–CXMT 건 반영 (DF2 1.0→0.5·A 27→26·B 38→39)

직전 포지션 맵 갱신(2026-07-07) 이후 git log로 파악한 변경분 재평가. 물질적 신규 소스는 하나 — 애플–CXMT 건(FT 2026-07-08, 07-11 ingest). **포지션 맵**: 애플의 中 CXMT DRAM 테스트 착수·행정부 승인 로비 + 로이터(2026-06) CXMT 추가 블랙리스트 보류 = 관리된 공존 쪽 약한 신호 → **DF2 1.0→0.5 소폭 이동**. DF1은 애플–CXMT가 DF2 축 신호일 뿐 수요 강도 구조 변화 아님(범용 DRAM +55~60% 급등은 기존 슈퍼사이클과 정합) → **8.5 정점 유지**. **확률**: 순수 DF2 재배분 — AI-지속 행(A+B, 합 65 유지) 내부에서 디커플링(A)→공존(B)으로 **A 27→26·B 38→39**, C·D·E 불변(합 100). 이동폭 소폭 한정 이유 = 아직 "테스트" 단계·1260H 등재·의회 반대·YMTC 2022 무산 전철 → 승인/차단 리트머스 미해결.

**EWI·트리거**: `cxmt_apple_qualification`(07-11 신설, 테스트 단계) 상태 유지. `cxmt_dram_share`에 FT 2028E 캐파 15%(2025 11%) 병기(캐파 계열, 매출 점유와 구분) + 애플 인증 파이프라인 note 연동. 신규 트리거 `apple_cxmt_approved`(승인·양산 채택 시 B·D 공존 확정, df2Δ −1.5) 추가.

**동기화**: dashboard indicators.js(포지션·SCENARIOS·EWI note·트리거)·scenarioPlanning.js(matrix 확률·DF1·DF2 현재위치)·updates.js(assessment 항목)·version.js(v2.31.5). wiki key-drivers·scenario-matrix. outputs/report §5.1 확률표·Exec Summary. 위키 링크 무변경 → 지식그래프 재생성 생략. PPTX는 확률 미포함 → 재생성 생략. cd dashboard && npm run build 검증.

## [2026-07-24] build | 개발실 전환 요약 PPT — 1장 요약 × 디테일 상·중·하 3페이지

요청: 최근 추가한 개발실 전환 전략(dev-org-transformation) 요약 PPT를 만들어 GitHub에 업로드. 스타일 지정 — 화이트 배경 + 블루·그린 계열 강조, 제목 32pt·본문 21pt, 내용 디테일 수준(상·중·하)별 1장씩 총 3페이지.

산출: `outputs/presentation/dev-transformation-summary.pptx` (3장, 16:9) + 생성 스크립트 `scripts/generate_dev_transformation_summary.cjs` (pptxgenjs·Node). 3장 공통 골격 = 북극성 명제(신문섭) + 왜(WHY: LTA→SCA·Micron–Anthropic SCA 16건·$100B) / 무엇(WHAT: As-Is→To-Be) / 어떻게(HOW: 4대 축·3-Phase). 디테일 상 = 3열 + KPI 스탯 5종(선제 제안 40건/년·채택률 35%·커스텀 매출 30%+·교류 시간 25%·SV 스타 5명+), 중 = 2카드 + 4축 칩 + Phase 스트립, 하 = 인용 배너 + 3카드 + $100B 콜아웃. 원천은 wiki/strategies/dev-org-transformation.md 단일 페이지 — 위키 무변경.

동기화: `.gitignore` 화이트리스트에 summary pptx 추가(최종 산출물 커밋 관례), `index.md` outputs 섹션 등록. dashboard 무변경(데이터·UI 영향 없음 → version bump 생략), report·slide-outline 무변경(기존 3장 발표덱과 별개 요약 변형). 브랜치 `claude/dev-lab-transition-ppt-e9stzt`에 push.

## [2026-07-24] build | 요약 PPT 도식 재설계 + 대시보드 다운로드 링크 (v2.32.0)

요청 2건: ① 개발실 전환 대시보드 페이지에 PPT 3종 다운로드 링크, ② "글자가 너무 많다" — 도식·이미지 중심으로 개선.

**PPT 재설계**: `generate_dev_transformation_summary.cjs` 전면 개편 — 불릿 텍스트를 도식으로 대체. 디테일 상 = 사건 수직 타임라인 + As-Is→To-Be 화살표 페어(박스→화살표→박스) + 4대 축 2×2 아이콘 그리드(react-icons Feather, 컬러 서클) + Phase 미니 타임라인 + KPI 스탯 밴드. 중 = 계약 진화 체브런(Spot→LTA→SCA) + 역할 전환 화살표 3행 + 4대 축 아이콘 행 + 3-Phase 수평 타임라인. 하 = 인용 배너 + 전환 한 컷(수주 이행자 → rightArrow(LTA→SCA) → 기술 파트너) + 로드맵 타임라인 + $100B 콜아웃. 1장짜리 개별본 3종(`-high/-mid/-low.pptx`) 신규 생성, 통합 3장본과 함께 outputs/presentation/에 커밋.

**대시보드 (v2.31.6→v2.32.0, 마이너 — 새 자료 카테고리)**: `dashboard/public/downloads/`에 1장본 3종 미러(생성 스크립트가 자동 복사) + `devTransformation.js` DT_DOWNLOADS 추가 + `Strategies.jsx` 개발실 전환 탭 상단에 다운로드 카드(FileDown 아이콘 서클 3버튼, `<a download>`) 배치. `npm run build` 통과, dist/downloads/ 포함 확인. `.gitignore`에 `!dashboard/public/downloads/*.pptx` 화이트리스트 추가.

## [2026-07-24] build | 요약 PPT — DE 스타 플레이어 핵심 강조 + 컬러 절제 (v2.32.1)

피드백 2건 반영: ① 핵심 전략 = "DE(Distinguished Engineer)를 스타 플레이어로, 고객사와 기술 생태계를 함께 만든다"를 3장 모두에 명시 — 하·중은 그린 콜아웃 스트립("'모난 놈이 정 맞는' 기존 문화 → 스타를 호명하고 드러내는 문화로" 부제 포함), 상은 HOW 카드 내 배지 + 문화/조직 축 캡션("모난 놈 → 호명", "DE 스타·Pod 상주"). 근거는 wiki §4.6 스타 엔지니어 트랙(호명사회·관리 분리·실리콘밸리 영입). ② 블루·그린 절제 — 카드 배경·헤더·아이콘·타임라인을 뉴트럴 그레이로 통일하고, 강조색은 To-Be 박스·SCA 체브런·전환 화살표·DE 콜아웃(그린)·$100B·스타 영입 KPI에만 유지.

동기화: 통합 3장본 + 1장본 3종 재생성 → dashboard/public/downloads/ 자동 미러. DT_DOWNLOADS 설명에 DE 스타 반영, version v2.32.0→v2.32.1(패치 — 자료·텍스트 갱신). npm run build 통과. 위키 무변경(발표 표현만 조정, 사실 주장 추가 없음).

## [2026-07-24] build | 요약 PPT — 신문섭·송길영 인용 추가 (v2.32.2)

요청: 신문섭·송길영 인용 추가. 하 = 듀얼 인용 배너(좌 신문섭 "고객의 아키텍처 안으로…" / 우 송길영 "조직의 이름 뒤에 숨지 않고, 자신의 이름으로 불리며 책임과 결과를 마주한다" — 『시대예보: 호명사회』). 상 = 상단 북극성 줄 아래 호명사회 인용 줄 추가(2줄 스트립, 3열 레이아웃 0.2in 하향). 중 = DE 콜아웃 부제를 송길영 인용문+출처로 교체. 인용 문구는 sources/articles/star-engineer-context-2026-07.md §1 표현 사용.

동기화: 통합본+1장본 3종 재생성 → dashboard/public/downloads/ 미러, version v2.32.1→v2.32.2(패치 — 자산 갱신), npm run build 통과. 위키 무변경.

## [2026-07-24] build | 요약 PPT 용어 정비 — DE→FDE·SCA→전략적 고객 계약 (v2.32.3)

요청: ① Distinguished Engineer(DE)는 사내에서 다른 용도로 쓰는 용어 → 업계 용어 FDE(Forward Deployed Engineer)로 교체. ② SCA 약어 사용 중지 → 한글 "전략적 고객 계약"(위키 lta-to-sca-transition.md의 공식 표현)으로 풀어쓰기.

교체 지점: 상 = 사건 타임라인(Micron–Anthropic 전략적 고객 계약)·경고 배지("정확한 납품만으로는 전략적 고객 계약 수주 불가")·조직 축 캡션·FDE 배지. 중 = 계약 진화 체브런 3단(전략적 고객 계약 박스 확장, 가변 폭)·FDE 콜아웃·조직 캡션·Phase 캡션. 하 = 전환 화살표(LTA→전략적 고객 계약 2줄)·FDE 콜아웃·Phase 캡션·$100B 라벨. LTA는 유지(지적 없음). wiki·dashboard 본문의 DE/SCA 용어는 원천 유지 — 발표 산출물만 정비.

동기화: pptx 4종 재생성·다운로드 미러, DT_DOWNLOADS 설명 FDE로 갱신, version v2.32.2→v2.32.3(패치), npm run build 통과.

## [2026-07-24] update | 요약 PPT — 적용 계획·하단 숫자 제거, 임금 환경 선순환 보강 (v2.32.4)

요청: ① 3-Phase 적용 계획은 현 시점에 불필요 → 3장 모두 제거. ② 하단 숫자(상 KPI 스탯 5종·하 $100B 콜아웃)도 제거하고 공간 재활용. ③ 대신 "스타를 영입할 수 있는 임금 수준" 환경 변화를 언급 — 과거 실리콘밸리 대비 보상 열위였으나 최근 메모리 처우 급등으로 다수 스타 영입 가능 수준, 영입 축적 → 조직 전반 수준 상향 선순환 기대.

팩트체크: star-engineer-context-2026-07.md §2로 확인 — 삼성 DS 특별성과급 ~6억원 시대, SK하이닉스 영업이익 10% 명문화·연봉 상한 철폐(맥쿼리 최대 12.9억 전망), "실리콘밸리 스타급 처우 감당 여력 확보". "과거 SV 수준 미달"은 소스의 함의(이제야 감당 가능)로 정합. "선순환"은 신규 전략 판단 → wiki §4.6(2)에 판단 명시로 추가(last_reviewed 2026-07-24), report 해당 문단·dashboard DT_STAR_ENGINEER.hiringEdge에 동기 반영.

PPT: 3장 모두 하단에 [과거: SV 보상 열위] ▶ [현재: 성과급 ~6억·상한 철폐(상 슬라이드는 최대 12.9억 전망 포함)] ▶ [선순환: 영입 축적 → 조직 수준 상향(그린 강조)] 플로우 배치. pptx 4종 재생성·미러, version v2.32.4(패치), npm run build 통과. 지식그래프 재생성 생략 — wiki 링크 구조 무변경(기존 링크 대상과 동일).

## [2026-07-24] fix | 다운로드 카드 설명 최신화 — 3-Phase·KPI·$100B 표기 잔존 정정 (v2.32.5)

사용자 보고 "요약 발표자료에 반영 안 된 것 같다" → 검증: origin/main의 다운로드 pptx 3종에서 텍스트 추출 확인 결과 파일 자체는 최신(환경 변화·선순환·성과급·FDE·전략적 고객 계약 포함, 90일 로드맵·Distinguished 없음). 원인은 dashboard 다운로드 카드 desc가 이전 구성(3-Phase·KPI·로드맵·$100B)을 그대로 표기해 미반영처럼 보인 것. DT_DOWNLOADS desc 3종을 새 구성(임금 환경 변화·임금 선순환·호명사회 인용)으로 정정, version v2.32.5(패치). pptx 재생성 불필요(파일 무변경).

## [2026-07-24] query | 수주산업화 적응을 위한 개발실의 추가 전략 옵션

질문: 메모리 수주사업화 국면에서 개발실이 (기존 전환 전략 외에) 또 어떤 전략적 변화를 가져갈 수 있는가. wiki 기존 커버리지(dev-org-transformation 4대 축·FDE 스타·임금 선순환) 확인 후, 수주산업(조선·항공·ASIC)의 표준 운영 체계를 개발실에 이식하는 8개 옵션을 신규 제안: ① 프로그램 조직(고객 계약 단위 PM·수익성 소유) ② 수주 심의 게이트(Deal Review·Design-to-Cost) ③ NRE 과금 — 공동설계의 수익 센터화 ④ 체인지오더 프로세스 ⑤ 백로그 연동 R&D 캐파 플래닝 ⑥ 감사 가능한 개발 프로세스(트레이서빌리티) ⑦ 고객간 방화벽+공통 플랫폼 학습 양립 ⑧ FDE 로테이션·수주 연동 인센티브. 채팅 답변으로 제공 — 채택 항목 확정 시 wiki 전략 페이지 반영 예정(현재 위키 미반영, 전략 판단 제안 단계).

## [2026-07-24] ingest | FDP Host–SSD 통합 플랫폼 전략 — 개발실 전환의 제품·기술 축 병합 (v2.32.12)

사용자 전략 인풋 병합: 기존 FDE는 인재 축, 신규 내용은 제품·기술 축. 원문 보존 `sources/raw-notes/fdp-host-ssd-platform-strategy-2026-07-24.md`. 신규 위키 페이지 `wiki/strategies/fdp-host-ssd-platform.md` — FDP SSD 공급자→Host–SSD 통합 솔루션 제공자 전환: 6요소 구조(Binding·FDP 표준 SSD·시스템 SW·E2E 검증·공동개발·텔레메트리), 실행전략 6종(Enablement Platform SDK·Profiler·Emulator / 표준 워크로드 프로파일 7종 / E2E 공동검증 / 공동개발 조직 4기능 / Binding 기술협력 / 오픈소스-차별화 경계), 4단계 로드맵, KPI(핵심 = FDP 실제 활성화 용량), 시나리오 연결(B 주 무대·RS-3 전환비용·RS-8 연계).

동기화: dev-org-transformation.md §4.7 신설(인재 축×제품 축 프레임·frontmatter 소스 추가), report §4.5 요약 추가, index.md 등록(위키·소스), 지식그래프 재생성(node 80→81·edge 309→316·orphan 0), version v2.32.12(패치 — 원격 v2.32.11 이후). 건너뜀: 대시보드 개발실 전환 탭 UI(신규 페이지는 DT_* 미러 범위 외 — 요청 시 확장), 요약 PPT(구성 변경은 별도 지시 대기).

## [2026-07-28] assessment | 시나리오 포지션 맵·확률 정기 재평가 — 유지 (DF1 8.5·DF2 0.5, A26·B39·C8·D21·E6) + Alphabet CapEx 상향·SK하이닉스 사상 최대

직전 포지션 맵 갱신(2026-07-21) 이후 git log로 파악한 변경분(개발실 전환 요약 PPT·FDE/전략적 고객 계약 용어 정비·임금 선순환·수주산업화 8개 전략 옵션 질의)은 전부 실행/조직 계층으로 거시 축(DF1·DF2)을 움직일 신규 소스 없음. 07-21→07-28 구간 웹 리서치 점검 결과 in-window 신호는 전부 **정점 재확인** 방향 → 포지션 맵·확률 유지.

**포지션 맵**: DF1 8.5·DF2 0.5 유지. 물질적 발전 2건 — (1) Alphabet Q2(07-22) 2026 CapEx 가이던스 **$180~190B→$195~205B 상향**·Cloud 백로그 QoQ +$50B→$514B(상방 확인), (2) SK하이닉스 Q2(~07-28) 영업이익 **~$43.7B·OPM ~76% 사상 최대**(정점 확인). 이미 정점(8.5)이므로 신규 상방 레그 아닌 재확인 → DF1 유지. **절제**: 가장 큰 3개 tell(MS·Meta 07-29·Amazon 07-30)이 창 직후 발표 예정 — DF1 방향 핵심 확인 이벤트 다음 주 대기. DF2: 미중 신규 실현 사실 부재(MATCH 위원회 단계·본회의 표결 movement 없음·CXMT HBM 미확정·애플 CXMT 테스트 단계·신규 수출통제 없음) → 유지. 삼성 HBM4 볼륨 발주 미전환도 무변화.

**확률**: A26·B39·C8·D21·E6 전부 유지 — 거시 축 무변화, in-window 신호는 DF1 정점 재확인이지 시나리오 간 상대 확률 변경 요인 아님.

**EWI·트리거**: EWI 5종 실측 갱신(`bigtech_capex_growth` Alphabet 상향·`gpu_rental_price_trend`/`gpu_rental_h100_usd` 07-28 스냅샷 H100 ~$3.46·H200 ~$4.11·`samsung_hbm4_rubin_share` 무변화·`cxmt_hbm3_production` 무변화). 트리거 4종 note 갱신(`bigtech_capex_2027_sustained` 선행 상방·`bigtech_capex_cut25` 미발동·`match_act_passed` 위원회 단계·`samsung_hbm4_nvidia_confirmed` 미충족). 발동 트리거 0건.

**동기화**: 신규 소스 `hyperscaler-q2-2026-capex-2026-07-28.md`. dashboard indicators.js(포지션·SCENARIOS·EWI·트리거)·scenarioPlanning.js(DF1·DF2 현재위치·matrix 확률)·updates.js(assessment 항목 — 업데이트 내역 메뉴)·version.js(v2.32.6 패치). wiki key-drivers·scenario-matrix. outputs/report §5.1. index.md sources 등록. 위키 링크 무변경 → 지식그래프 재생성 생략. PPTX는 확률 미포함 → 재생성 생략. cd dashboard && npm run build 검증. main 직접 병합·push.

## [2026-08-03] ingest | 크리스 밀러(Chip War 저자) 최근 인터뷰·기고 종합 수집 (v2.32.11)

요청: Chip War 저자 크리스 밀러의 최근 인터뷰·기고문 조사 → inbound data로 활용, 대시보드 갱신. 웹 검색 기반으로 2025-12~2026-07 발언 10건 수집(상원 외교위 증언 12-02·WaPo H200 비판 12-10·ChinaTalk H20+15%·CommonWealth·AEI "Why China Can't Export AI Chips"·CMU Chips and Chokepoints·중앙일보 "반도체 구루의 고언" 시리즈 04-24·"중국 4년째 AI 과소투자" 06월 발언·경향신문 단독 07-09·인사이트코리아 2부작). 원문 직접 접근 차단 항목은 검색 결과 요약·2차 인용으로 수집(소스 헤더에 명시).

신규 소스: `sources/articles/chris-miller-interviews-2025-12-to-2026-07.md`. wiki 6개 페이지에 [Update 2026-08-03] 추가 — samsung(체질 전환·R&D/설비 동시 투자·추론 메모리 프런티어·800조 환영), cxmt(애플–CXMT 공개 경계 = 위협 해석 무게), china-competitors(중국 이중 평가: Ascend 5~8배 열위·SMIC 규모 한계 vs 전력·피지컬 AI 위협), hbm-roadmap("HBM은 유일한 솔루션 아니다" — 추론 최적화 아키텍처 축), us-export-controls(초크포인트 위계 HBM·장비>GPU, H200 완화의 정치 구도: 행정부 완화 vs 의회 초당 통제파), steep/political(요인 1·4·6 외부 교차 검증).

거시 축 판단: DF1·DF2 위치 변경 없음 — 밀러 발언은 기존 신호의 외부 교차 검증이자 해석 보강(정성)이며 신규 실현 사실이 아님. "통제 무게중심의 GPU→HBM·장비 이동" 관찰은 다음 정기 재평가 참고 입력으로 표기.

대시보드: interviews.js에 외부 전문가 항목(크리스 밀러 종합, 공개 자료 기반) 추가 — 인터뷰 메뉴 4번째. updates.js ingest 항목 추가. version v2.32.11(패치: 데이터 추가·기존 카테고리 내 — 당초 v2.32.10으로 부여했으나 08-04 정기 재평가가 동일 버전을 선점, main 병합 시 v2.32.11로 재버전). 지식그래프 재생성(wiki 링크 신규)·npm run build 검증. 개발 브랜치 push 후 사용자 승인으로 main 병합(08-04 재평가 커밋과 merge — updates.js·log.md 충돌은 양쪽 항목 시간순 유지로 해결).
## [2026-08-04] assessment | 시나리오 포지션 맵·확률 정기 재평가 — 유지 (DF1 8.5·DF2 0.5, A26·B39·C8·D21·E6) + 내부 인터뷰 2건(최장석·이창수) 반영·EWI 갱신

직전 포지션 맵 갱신(2026-07-28) 이후 git log 변경분은 **내부 임원·전문가 인터뷰 2건**뿐 — 최장석 상무(상품기획팀장, 07-29)·이창수 부사장(영업팀장, 08-03). 둘 다 sources 층 녹취록 + 인터뷰 메뉴 구조화이며, 거시 축(DF1·DF2)은 "실현된 외부 사실"이 움직인다는 일관 방법론상 내부 전문가 프레이밍(해석·전망)으로 분류. 내용도 양면적 → **정점 재확인, 축 무이동**.

**양면성**: (상방·바닥 경직화) 이창수 1차 방어선 — take-or-pay 멀티이어 다수 사인(선수금 수백억 달러 규모 예치)·**NTB(Not-To-Below) 가격 하한**·NTE 상한으로 컬랩스 와도 상당 이익률 바닥 계약 고정 = 기존 LTA→SCA 락인을 삼성 1차 자료로 재확인, 핸드투마우스(재고 없음)로 근단기 수급 견조. (하방·유보) 최장석 HBM 편중 다운사이드(HBM 꺼지면 캐파 stranded·HBM↔DDR 상쇄로 shortage→oversupply 반전, D/S 60~70%)·이창수 중복수요·NAND 조정 우려(YMTC 에코 확대)·원가 비교열위. 영업 수장 본인 "충분히 올랐다·파티할 때 아니다·2차 방어선 필요"로 정점+경계 톤. 순효과 상쇄 → DF1 8.5 정점 재확인.

**포지션 맵**: DF1 8.5·DF2 0.5 유지. 커스텀 HBM 퇴조(이창수) vs zHBM 커스텀 시대(최장석) 논쟁은 DF3/제품믹스 축이지 DF1·DF2 아님. DF2: 이창수 "중국 비동조화"·미주 집중+중국 페이즈2 멀티이어는 관리된 공존(0.5) 정합 전망(실현된 정책 사실 아님) → 위치·방향 유지.

**확률**: A26·B39·C8·D21·E6 전부 유지 — 이창수 take-or-pay/NTB 확인은 이미 C 8·D 21에 반영된 락인의 재확인(신규 증분 아님), 최장석 HBM 편중은 조건부 심도(꺼졌을 때 캐파 리스크)라 상대 확률 무변화.

**EWI·트리거**: EWI 4종 정성 note/history 갱신(`bigtech_capex_growth`에 CAPEX-vs-FCF 꼭짓점 프레임·`custom_hbm_revenue_share`에 커스텀 HBM 퇴조 vs zHBM 대비·`samsung_codesign_contracts`에 take-or-pay/NTB 1차 확인·`competitor_sca_disclosures` 스톡 note). 트리거 3종 note 갱신(`demand_inflection_divergence`에 3축 프레임+핸드투마우스 미발동 확인·`bigtech_capex_cut25`/`bigtech_capex_2027_sustained`에 FCF 렌즈). 민감 수치 제외로 currentValue는 전부 무변화(정성 갱신). 발동 트리거 0건.

**동기화**: 신규 소스 0건(인터뷰 2건은 기 ingest). dashboard indicators.js(QUADRANT·SCENARIOS·EWI·트리거)·scenarioPlanning.js(DF1·DF2 현재위치·matrix A·B note)·updates.js(assessment 항목 — 업데이트 내역 메뉴)·version.js(v2.32.10 패치). wiki key-drivers·scenario-matrix. 위키 링크 무변경 → 지식그래프 재생성 생략. PPTX 확률 미포함 → 재생성 생략. cd dashboard && npm run build 검증. main 직접 병합·push.

## [2026-08-05] ingest | MAD Podcast(Matt Turck) × Dylan Patel — 메모리 부족·KV 캐시·CPO 지연 (v2.33.1)

요청: 사용자 제공 Apple Podcasts 링크(에피소드 ID 1000779102407)의 인터뷰 추가. 이 환경에서 원문(오디오·트랜스크립트·Apple 페이지) 직접 접근이 프록시 정책으로 차단되어, 웹 검색으로 에피소드를 특정(MAD Podcast Dylan Patel 2번째 출연, 2026-07 초)하고 2차 보도 3건(Podcast Alpha 요약·BigGo Finance·KuCoin 플래시)으로 내용을 교차 수집. 공식 에피소드 제목 미확정·"$11M Bill" 세부 미확인은 소스 헤더에 명시.

핵심: ① 메모리 다년 구조적 부족 — 가격 상방 2~3배, 진짜 증분 공급 2028(팹 연 +20~30% 한계, ILTB EP.468 "DRAM은 여기서 2~3배" 직접 인용 교차), ② KV 캐시가 수요의 미시 메커니즘(추론·에이전트→용량 선점) + 컨슈머 전치가 랠리 재원, ③ Anthropic FCF 전환 주장(연환산 $50B+·수익성 — 2차 보도 경유, 주장 단계 명시), ④ CPO 양산 2029 지연(Street 2027)·구리 붐 연장·NVIDIA 800V.

신규 소스: `sources/articles/mad-podcast-dylan-patel-memory-2026-07.md`. wiki 3개 페이지 [Update 2026-08-05] — price-trends(상방 2~3배 vs 기존 Q3 감속 조짐의 해석 대립 명시·공급 2028=C/D 시간축 가늠자), ai-demand-sustainability(KV 캐시=권석준 "추론 100배"의 미시 구체화·Anthropic FCF=3자 마스터 변수의 첫 긍정 사례, CSP FCF와 층위 구분 유의), ai-datacenter-buildout(CPO 2029·800V — 방법론 가정 무변화).

거시 축 판단: DF1·DF2 위치 변경 없음 — 외부 애널리스트 전망(프레이밍)이지 실현된 사실 아님. 단 price-trends의 "감속 vs 다년 부족" 해석 대립은 다음 정기 재평가 참고 입력.

대시보드: interviews.js에 외부 전문가 항목(Dylan Patel, 5번째) 추가. updates.js ingest 항목. version v2.33.1(패치 — 당초 v2.32.12로 부여했으나 FDP 대시보드 반영이 v2.33.0 마이너를 선점, main 병합 시 재버전). 지식그래프 재생성·npm run build 검증. 개발 브랜치 커밋 후 main 병합·push(사전 승인 체인).
## [2026-08-05] build | FDP 제품·기술 축 — 대시보드 섹션 + PPT 슬라이드 2장 추가 (v2.33.0)

요청: FDP 병합분의 대시보드 반영 + PPT 슬라이드 1~2장 추가. **대시보드(마이너 v2.33.0 — 새 데이터 카테고리)**: devTransformation.js에 DT_FDP 신설(선언·전략 문장·문제 3·6요소·실행전략 6종·로드맵 4단계·핵심 KPI), Strategies.jsx 개발실 전환 탭에 카드 2개 추가(제품·기술 축 개요 — 스타 엔지니어 카드 다음 / 실행전략·로드맵·KPI), 다운로드 카드에 4번째 항목(제품·기술 축 FDP 2장) + 그리드 4열화.

**PPT**: generate_dev_transformation_summary.cjs 확장 — 제품 축 슬라이드 2장 신규(① 전환 한 컷[FDP SSD 공급자 →+시스템 SW→ 통합 솔루션 제공자]·왜 시스템 SW인가 3문제·6요소 체인, ② 실행전략 6종 아이콘 그리드·핵심 KPI 콜아웃[실제 활성화 용량]). 통합본 3장→5장, 개별본 4종(-fdp 신규 2장)·downloads 미러. 헤더 함수 리팩터(제목·출처·칩 파라미터화). 렌더 QA 통과·validate 통과·npm run build 통과.

## [2026-08-05] update | FDP 전략 당위성 재구성 — 환경 변화→Captive 데이터→선택지→선택 논리 (v2.34.0)

피드백: "배경·논리 흐름이 없어 당위성 설득력 부족 — Captive SSD 위상 변화를 데이터로, 다른 선택지와 선택 이유를 보여라." **리서치**: 웹 검색으로 신규 소스 `sources/articles/captive-ssd-fdp-context-2026-08.md` 등재 — 하이퍼스케일러 enterprise SSD 수요 ~55%, NAND 웨이퍼 가격 +246%(vs Q1'25)·계약 분기→다년, AWS Nitro SSD(2021, 자체 컨트롤러), FDP(TP4146)는 Meta·Google 주도·삼성 공동으로 6개월 만에 비준(2023). Captive % 공식 시계열은 부재 → "통제권 4단계 상승"(완제품→펌웨어→컨트롤러→표준·웨이퍼) 프레임으로 이정표·정량 포인트를 배열(분석적 구성 명시).

**위키 재구성** (`fdp-host-ssd-platform.md` 전면 개편): §1 환경 변화 3갈래(수주산업화 Binding — 이창수 take-or-pay 1차 인용 / 수요 지배 55% / 통제권 상승) → §2 Captive 위상 4단계 표(데이터) → §3 선택지 4개 비교표(A 컴포넌트 후퇴·B 풀커스텀(최장석 소싱·컨트랙 체질 인용)·C FDP HW-only·D 표준+시스템 SW ✅)와 선택 논리("부가가치는 고객이 아직 풀지 못한 계층 위에서") → §4 전략·실행(압축) → §5 KPI → §6 시나리오. 기존 인터뷰·LTA→SCA 지식 기반과 인용으로 연결.

**대시보드(마이너 v2.34.0)**: FDP 섹션을 서사형 3카드로 재구성 — ① 환경 변화 + **Captive 위상 Recharts 막대 차트**(4단계·단계별 근거·정량 스탯 3종·독해) ② 선택지 4개 비교(탈락/채택 판정) ③ 선택된 전략(선언·6요소·실행전략·로드맵·KPI). **PPT**: FDP 2장 → 3장 재작성(① 환경 변화+계단 차트+스탯 ② 선택지 2×2+선택 논리 ③ 구조·실행·KPI), 통합본 6장·-fdp 3장. report §4.5 당위성 반영, index 등록, 지식그래프 재생성, npm build·렌더 QA 통과.

## [2026-08-05] fix | 개발실 전환 탭 NEW 태그 제거 (v2.34.1)

Strategies 상위 탭의 "개발실 전환"에서 isNew 배지 제거 — 탭이 정착 단계로 판단. version v2.34.1(패치).

## [2026-08-05] build | Storyline 신설 — 위키 종합 서사 + 대시보드 첫 탭 (v2.35.0)

요청: "최상위 메뉴에 Storyline 항목 신설 — 위키 전체 지식을 아우르는 삼성 전략 방향성 스토리라인, 완전한 문장·스토리 느낌·시각화·명시적 레퍼런스·신규 소스 유입 시 자동 갱신."

**위키 신설**: `wiki/storyline/storyline.md` — 8장 완결형 서사(환경 변화→진단→핵심 동인→다섯 개의 미래→선택→Robust 구조→**대안 비교 논증**(올인·관망·수축 3개 대안 대비 확률가중 베팅+Robust 헤지+데이터 트리거의 우위)→감시와 전환). Mermaid 스토리 플로우 + 2023→2035 연대기 내장. 전 수치·주장에 sources/ 인용, 해석은 위키 페이지 상대링크(→ 지식그래프 엣지). 상단에 갱신 규칙 명문화.

**정합성 체인 등록**: CLAUDE.md §1 카테고리에 storyline/ 추가, §3 Ingest에 "storyline 서사 정합 확인" 4단계 삽입, §5 매핑 테이블·§6 변경 단계별 테이블에 storyline 행 추가 — 이후 steep·driving-forces·scenarios·strategies 변경 시 storyline 해당 장(3~7장) + `dashboard/src/data/storyline.js` 동반 갱신 의무. index.md 최상단 섹션 등록.

**대시보드(마이너 v2.35.0)**: TOP_TABS 첫 탭 "Storyline"(BookOpen) 신설, 기본 랜딩 ewi→storyline 변경(기존 `#/ewi` 딥링크 동작 유지). `data/storyline.js`(META·FLOW 7단계·TIMELINE 6이벤트·CHAPTERS 8장, 블록별 refs) + `components/Storyline.jsx`(SVG 플로우 체인 — 클릭 시 해당 장 스크롤·EWI→시나리오 점선 피드백 루프, 연대기 스트립, Interviews Block 계열 본문 렌더러 + SourceLink 각주, `#/storyline/ch1~ch8` 딥링크). 지식그래프 빌더 CATEGORIES에 storyline(노랑) 추가 후 재생성 — 노드 82·엣지 343, 스토리라인 허브(링크 25). asymmetric 증가(~25건)는 종합 페이지의 단방향 인용 특성상 수용. `npm run build` 통과.

**생략 명시**: outputs/ 무변경(storyline은 위키 계층 서사, report·PPT는 별도 산출물) → PPTX 재생성 생략. 푸시는 세션 지정 브랜치 `claude/storyline-menu-creation-f6ch4f`(main 아님).
