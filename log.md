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
- §7-1: data/ 엄격 분리 (a) — 원본/해석 파일 단위 분리
- §7-2: dashboard는 최상위 유지 (Vercel 빌드 루트)
- §7-3: PPTX 변형 4종은 outputs/presentation/scripts/에 그대로 보존
- §7-4: PROMPT.md (a) — log.md로 변환·구조화 후 삭제
