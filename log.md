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
