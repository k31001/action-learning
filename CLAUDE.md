# 위키 관리자 헌법 (LLM Wiki Constitution)

이 레포는 **살아있는 위키**다. 단발 보고서를 만들기 위한 파이프라인이 아니라, 새로운 정보가 들어올 때마다 LLM이 읽고·요약하고·교차참조를 갱신해서 **한 번 컴파일되고 계속 최신 상태로 유지되는 지식베이스**다.

도메인은 **삼성전자 메모리사업부의 Shell 시나리오 플래닝**. 위키가 진실의 원천이고, 전략 보고서·발표자료·대시보드는 위키에서 파생되는 빌드 산출물이다.

---

## 1. 3계층 아키텍처

```
sources/   ← 1층: 원본 (불변, append-only)
wiki/      ← 2층: 위키 (LLM이 전적으로 소유·유지)
outputs/   ← 3층: 빌드 결과물 (위키에서 합성)
dashboard/ ← 빌드 결과물 (최상위 유지, Vercel 자동 배포 루트)

CLAUDE.md  ← 스키마 (이 문서)
index.md   ← 위키 전체 목차
log.md     ← 시간순 작업 로그 (append-only)
```

### `sources/` — 원본 (불변)
- 외부에서 수집한 1차 자료: 기사·논문·실적발표·공시·회의록·로 데이터
- 하위: `sources/articles/`, `sources/filings/`, `sources/papers/`, `sources/raw-notes/`
- **LLM은 읽기만 한다.** 절대 수정·요약·재배치하지 않는다.
- 새 소스는 항상 추가만. 기존 파일은 출처 변경이 있을 때만 덮어쓴다.
- 마이그레이션 중: `sources/raw/`는 옛 `data/` 디렉토리. 다음 세션에서 `sources/{articles,filings,papers,raw-notes}/`로 파일 단위 분리.

### `wiki/` — 위키 (LLM 소유)
- LLM이 새 소스 수집·질의 응답·정기 점검을 통해 지속적으로 유지하는 마크다운 페이지
- 모든 페이지는 다음 중 하나:
  - **entities/** — 회사·제품·인물 (예: `sk-hynix.md`, `hbm4.md`, `nvidia.md`)
  - **concepts/** — 개념·기술 트렌드·정책 (예: `memory-cycle.md`, `cxl.md`, `chips-act.md`)
  - **steep/, driving-forces/, scenarios/, benchmark/** — 시나리오 플래닝 분석 페이지
  - **strategies/** — 전략 페이지 (core, invariant)
  - **comparisons/** — 비교표 (선택)
- **모든 사실 주장은 `sources/`의 파일을 인용**한다. 형식:
  ```markdown
  HBM3E 12-hi는 2026년 1분기 양산 진입했다 ([micron-q1-fy26.md](../../sources/filings/micron-q1-fy26.md)).
  ```
- 인용 없는 주장은 lint에서 플래그 대상.

### `outputs/` — 빌드 결과물
- `outputs/report/scenario-planning-report.md` — 위키 페이지를 합성한 전략 보고서
- `outputs/presentation/` — 발표자료 (slide-outline.md + scripts + assets + .pptx)
- 빌드 산출물이므로, 위키와 모순되면 **항상 위키가 우선**. outputs은 재생성 가능.

### `dashboard/` — 빌드 결과물 (최상위 유지, Vercel 루트)
- React + Vercel 앱. `dashboard/src/data/*.js`의 SCENARIOS·DECISIONS·INITIAL_QUADRANT_POSITIONS는 wiki 페이지의 수치 미러
- Vercel 빌드 루트가 `dashboard/`라 최상위에 유지

---

## 2. 인덱스와 로그

### `index.md` — 위키 전체 목차
- 카테고리별로 모든 wiki 페이지 나열: `- [페이지명](경로) — 한 줄 요약`
- **수집·생성마다 갱신**. 페이지를 추가했는데 인덱스에 없으면 고아 페이지로 lint에서 잡힘.

### `log.md` — 시간순 추가 전용 로그
- 형식: `## [YYYY-MM-DD] 작업유형 | 제목`
- 작업유형: `ingest`, `query`, `lint`, `migration`, `build`
- 한 항목은 5~10줄 내외. 무엇을 추가·갱신했고 왜 했는지.
- **삭제·재작성 금지**. 잘못된 항목은 새 항목으로 정정.

---

## 3. 3대 워크플로우

### Ingest — 새 소스 추가
사용자가 새 자료를 던지면:
1. `sources/{articles,filings,papers,raw-notes}/` 적절한 곳에 저장 (원본 보존)
2. 영향받는 wiki 페이지 식별 (entities·concepts·scenarios·strategies)
3. 해당 페이지들을 갱신. 새 개체/개념이면 신규 페이지 생성
4. `index.md` 갱신
5. `log.md`에 항목 추가

한 ingest는 보통 wiki 페이지 5~15개를 건드린다. 누락 페이지는 다음 lint에서 회수.

### Query — 질문 응답
사용자가 질문하면:
1. wiki에서 먼저 답을 찾는다 (인용 포함)
2. wiki에 없으면 sources에서 찾고, **답변 가치가 있으면 새 wiki 페이지로 환원**
3. 답변 자체가 새 통찰이면 `log.md`에 `query` 항목으로 기록

### Lint — 정기 정합성 점검
점검 항목:
- **고아 페이지**: `index.md`에 없는 wiki 파일
- **역링크 누락**: 페이지 A가 B를 인용하는데 B가 A를 모름
- **모순**: 동일 사실에 대해 두 페이지의 수치/주장이 다름
- **낡은 주장**: 출처가 6개월 이상 묵었고 시계열 데이터(가격·점유율·CapEx)
- **인용 없는 주장**: wiki 페이지에 `sources/` 링크 없는 수치·고유명사
- **빌드 정합성**: 위키 ↔ `outputs/`·`dashboard/src/data/`의 핵심 수치 일치

lint 결과는 `log.md`에 항목으로 남기고, 즉시 고칠 수 있는 건 그 자리에서 고친다.

---

## 4. 시나리오 플래닝 도메인 규칙

위키의 분석 페이지는 Shell 시나리오 플래닝 방법론을 따른다:

1. Focal Issue → `wiki/scenarios/scenario-matrix.md`
2. STEEP 요인 → `wiki/steep/{social,technology,environment,economy,political}.md`
3. Impact × Uncertainty → `wiki/driving-forces/impact-uncertainty-matrix.md`
4. 핵심 Driving Forces → `wiki/driving-forces/key-drivers.md` (DF1·DF2)
5. 시나리오 매트릭스 → `wiki/scenarios/scenario-matrix.md`
6. 시나리오 내러티브 → `wiki/scenarios/scenario-{A..E}.md`
7. Main Bet + Side Bet → `wiki/strategies/core/`
8. Robust 전략 + EWI → `wiki/strategies/invariant/`

### 일관성 규칙
- 시나리오 이름은 **중립적** (좋고 나쁨 없이)
- 모든 수치는 `sources/` 인용 필수
- 모든 전략은 시나리오와 연결고리 명시 (어느 시나리오에서 작동하는가)

---

## 5. 빌드 산출물 동기화

### 위키 → 빌드 산출물 매핑

| 위키 (단일 소스) | 동기화 대상 |
|---|---|
| `wiki/scenarios/scenario-{A..E}.md` + `scenario-matrix.md` | `dashboard/src/data/scenarioPlanning.js` SCENARIOS |
| `wiki/driving-forces/key-drivers.md` | `dashboard/src/data/scenarioPlanning.js` INITIAL_QUADRANT_POSITIONS |
| `wiki/strategies/` (D1~D9, RS1~RS8) | `dashboard/src/components/DecisionTracker.jsx` DECISIONS, `dashboard/src/data/strategies.js` |
| `sources/raw/{market,macro}/` 시계열 | `dashboard/data/*.json` (auto-update API) |
| `wiki/` 전체 | `outputs/report/scenario-planning-report.md` (합성) |
| `outputs/report/scenario-planning-report.md` | `outputs/presentation/slide-outline.md` |
| `outputs/presentation/slide-outline.md` | `outputs/presentation/scripts/generate_pptx.py` (구조 변경 시) |

### 빌드 명령
- PPTX 재생성: `python3 outputs/presentation/scripts/generate_pptx.py`
  - 의존성: `python3 -m pip install python-pptx matplotlib numpy`
- 대시보드 검증: `cd dashboard && npm run build` → `dist/` 생성, 콘솔 오류 없음
- PPTX 본체는 `.gitignore`로 미커밋. 재현성은 `outputs/presentation/template.pptx` + `slide-outline.md` + `scripts/` + `assets/*.png`에 의존

---

## 6. 변경 정합성 체인 (Continuous Consistency)

위키의 한 페이지가 바뀌면 하류 산출물도 같이 갱신한다. lint의 일부.

```
sources/ (불변)
   ↓ ingest
wiki/entities, wiki/concepts (개체·개념)
   ↓
wiki/steep → wiki/driving-forces → wiki/scenarios → wiki/strategies
   ↓
        ├─ outputs/report/scenario-planning-report.md
        │     ↓
        │  outputs/presentation/slide-outline.md
        │     ↓
        │  python3 outputs/presentation/scripts/generate_pptx.py
        │     ↓
        │  outputs/presentation/*.pptx (미커밋)
        │
        └─ dashboard/src/data/*.js + DecisionTracker.jsx
              ↓
           cd dashboard && npm run build  (검증)
              ↓
           (push → Vercel 자동 배포)
              ↓
        git commit + git push origin main
              ↓
        ✓ 원격 동기화 + Vercel 프로덕션 배포
```

### 변경 단계별 필수 갱신

| 변경된 위치 | 갱신해야 할 하류 |
|---|---|
| `sources/` 추가·수정 | `index.md` (sources 섹션) + 관련 `wiki/` 페이지 재검토 + 시계열이면 `dashboard/data/*.json` |
| `wiki/steep`, `wiki/driving-forces` | `wiki/scenarios/`, `wiki/strategies/`, `dashboard/src/data/scenarioPlanning.js`의 INITIAL_QUADRANT_POSITIONS |
| `wiki/scenarios/` | `wiki/strategies/` (RS·MB·SB 매핑) + `dashboard/src/data/scenarioPlanning.js`의 SCENARIOS |
| `wiki/strategies/` | `outputs/report/scenario-planning-report.md` 해당 섹션 + `dashboard/src/components/DecisionTracker.jsx`의 DECISIONS |
| `outputs/report/scenario-planning-report.md` | `outputs/presentation/slide-outline.md` |
| `outputs/presentation/slide-outline.md` | `outputs/presentation/scripts/generate_pptx.py` (구조 변경 시) |
| `dashboard/src/**` 또는 `dashboard/api/**` | `cd dashboard && npm run build` 빌드 검증 |

### 마무리 단계

1. PPTX 재생성: `python3 outputs/presentation/scripts/generate_pptx.py`
2. 대시보드 빌드 검증: `cd dashboard && npm run build`
3. `git commit` — 의미 단위, `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` 포함
4. `git push origin main` — 본 체인 흐름은 사전 승인됨 (push가 Vercel 자동 배포 트리거)
5. Vercel 배포 성공 확인

### 자동화 원칙
- 한 번의 사용자 지시로 위키 → outputs → dashboard 갈래 끝까지 자동 추적·갱신
- 영향 없는 갈래는 건너뛰되 **건너뛴 이유 명시**
- push 전 반드시 양쪽 갈래 빌드 검증 통과
- **사전 승인 범위**: 본 체인의 commit + push + (push로 트리거된) Vercel 배포만. 이외 destructive 작업(force push, branch 삭제, history rewrite, Vercel 환경변수 변경)은 매번 별도 확인.

---

## 7. 서브에이전트 사용 규칙

- **Research Agent** — `sources/`에 자료 수집만. 판단·해석 금지
- **STEEP Agent** — STEEP 요인 도출 + Impact×Uncertainty 점수 (1~5)
- **Scenario Agent** — 시나리오 내러티브, 중립적 이름
- **Strategy Agent** — 모든 전략은 시나리오 연결고리 명시
- **Lint Agent** — 위키 정합성 점검 (모순·고아·낡은 주장·인용 누락)

---

## 8. 언어와 표기
- 모든 문서는 한국어 (기술 용어 영어 병기 허용)
- 다이어그램은 Mermaid (` ```mermaid ` 코드 블록). 시나리오 매트릭스는 quadrantChart, 흐름은 flowchart, 관계는 graph
- 모든 wiki 페이지 상단에 yaml frontmatter 권장 (선택):
  ```yaml
  ---
  type: entity | concept | scenario | strategy | analysis
  last_reviewed: 2026-05-18
  sources: [sources/filings/micron-q1-fy26.md, sources/articles/trendforce-2026q1.md]
  ---
  ```

---

## 9. 기존 누적 로그
- `PROMPT.md` — 2026-05-18 위키화 시점에 의미 단위로 추려 `log.md`에 흡수 후 삭제. 필요 시 git history에서 회수.
- `PLAN.md` — 초기 프로젝트 계획. 위키화 이후 의미가 줄어듦. 정리 대상.

---

## 10. 마이그레이션 진행 현황 (2026-05-18)

| 단계 | 상태 |
|---|---|
| 디렉토리 골격 (sources/wiki/outputs) | ✓ |
| 무손실 mv (analysis→wiki, report 분해, presentation→outputs, data→sources/raw) | ✓ |
| dashboard 경로 의존성 갱신 (SourceLink PATH_REGEX + source props + indicators/visualizations) | ✓ |
| CLAUDE.md 위키 헌법화 | ✓ |
| `index.md`, `log.md` 생성 | ✓ |
| `sources/raw/` 24개 파일 → `wiki/entities/`·`wiki/concepts/` 재배치 | ✓ |
| `sources/raw/metadata.md` → `sources/README.md` (외부 출처 카탈로그) | ✓ |
| `PROMPT.md` → `log.md` 의미 단위 변환 + 삭제 | ✓ |
| 빌드 검증 (dashboard `npm run build` ✓ + `generate_pptx.py` ✓ 29매 540KB) | ✓ |
| `wiki/entities/china-competitors.md` → `cxmt.md` + `ymtc.md` 분리 | ✓ |
| 신규 entity: `samsung.md`, `nvidia.md`, `tsmc.md` | ✓ |
| 신규 entity (정보 부족으로 보류): `intel.md`, `amd.md`, `broadcom.md` | 다음 ingest에서 외부 자료 들어올 때 |
