# 프로젝트 가이드라인

## 프로젝트 정보
- **주제**: 삼성전자 메모리사업부 불확실성 대응 전략 (시나리오 플래닝)
- **방법론**: Shell 시나리오 플래닝
- **최종 산출물**: 전략 보고서(Markdown) + 슬라이드 기획서(Markdown) + 발표자료(PowerPoint) + EWI 모니터링 대시보드(React + Vercel)

## 필수 규칙

### 파일 관리
- 모든 사용자 지시 및 프롬프트는 `PROMPT.md`에 누적 기록
- 모든 문서는 Markdown 형식 (PowerPoint 제외)
- 데이터 수집/수정 시마다 `data/metadata.md` 업데이트 필수
- 모든 변경사항은 git commit + 마무리 단계에서 push (자세한 흐름은 아래 "변경 정합성 체인" 참조)

### 디렉토리 규칙
- 원시 데이터: `data/{category}/`
- 분석 결과: `analysis/{type}/`
- 보고서 시각자료: `report/assets/`
- 발표 시각자료: `presentation/assets/`

### 데이터 메타데이터 형식 (`data/metadata.md`)
각 데이터 항목은 다음 형식으로 기록:
```
### [데이터명]
- **파일/링크**: 경로 또는 URL
- **수집일**: YYYY-MM-DD
- **출처**: 기관명
- **신뢰도**: High/Medium/Low
- **태그**: #market #HBM #competitor 등
- **요약**: 2~3줄 핵심 내용
```

### 시나리오 플래닝 방법론 순서
1. Focal Issue 정의
2. STEEP 요인 브레인스토밍 (30~50개)
3. Impact × Uncertainty 매트릭스 작성
4. 핵심 Driving Forces 2~3개 선별
5. 시나리오 매트릭스 구성 (2×2 또는 선택적 조합)
6. 시나리오 내러티브 작성 (3~5개)
7. Main Bet + Side Bet 전략 도출
8. Robust 전략 + Early Warning Indicators

### 서브에이전트 사용 규칙
- Research Agent: 데이터 수집만 담당, 판단 금지
- STEEP Agent: 요인 도출 후 중요도/불확실성 점수 부여 (1~5점)
- Scenario Agent: 시나리오는 중립적 이름 사용 (좋고 나쁨 없이)
- Strategy Agent: 모든 전략은 시나리오와 연결고리 명시
- Report/Presentation Agent: 수치는 반드시 출처 표기

### PowerPoint 제작
- 1차: `presentation/slide-outline.md`에 슬라이드별 상세 기획
- 2차: **`python3 presentation/scripts/generate_pptx.py` 실행** → `presentation/samsung-memory-scenario-planning.pptx` (25매)
- 데이터 차트: Python matplotlib (스크립트 내장) — 결과는 `presentation/assets/*.png`에 자동 저장
- PPTX 자체는 `.gitignore`로 미커밋. 재현 가능성은 `template.pptx` + `slide-outline.md` + `scripts/generate_pptx.py` + `assets/*.png`에 의존
- 의존성: `python3 -m pip install python-pptx matplotlib numpy`

### EWI 대시보드 (`dashboard/`)

전략 보고서의 시나리오·Driving Forces·Robust 전략과 항상 정합성을 맞춰야 하는 React + Vercel 웹앱.

- **단일 소스 → 동기화 대상 매핑**:
  | 단일 소스 (전략 사슬) | 대시보드 동기화 대상 |
  |--------------------|--------------------|
  | `analysis/scenarios/scenario-{A..E}.md` + `scenario-matrix.md` (시나리오 5종, 확률, 메인벳) | `dashboard/src/data/indicators.js` 의 `SCENARIOS` 배열 |
  | `analysis/driving-forces/key-drivers.md` (DF1/DF2 축, 현재 위치) | `dashboard/src/data/indicators.js` 의 `INITIAL_QUADRANT_POSITIONS` |
  | `analysis/scenarios/strategy.md` (9개 즉시 결정 — D1~D9) | `dashboard/src/components/DecisionTracker.jsx` 의 `DECISIONS` 배열 |
  | `data/market/`, `data/macro/` 시계열 (HBM·CapEx 등) | `dashboard/data/*.json` (auto-update API가 채움) |
- **로컬 빌드 검증**: `cd dashboard && npm run build` → `dist/` 생성 확인. 콘솔 오류 없으면 통과
- **배포**: GitHub `origin/main` push 시 Vercel이 `dashboard/`를 자동 빌드·배포 (Vercel ↔ GitHub git integration). 별도 CLI 호출 불필요
- **vercel.json**: 서버리스 함수(`api/*.js`) + 매일 0시 cron(`/api/auto-update/all`) 구성

### 변경 정합성 체인 (Continuous Consistency)

데이터·분석·전략·보고서 중 어느 단계든 변경되면 아래 사슬을 따라 **두 갈래**(① 발표자료 / ② 대시보드)의 하류를 모두 갱신한 뒤 git push 한 번으로 마무리한다 (push가 Vercel 자동 배포 트리거).

```
data/{category}/                                          (원시 데이터)
        ↓ Research Agent
analysis/{steep, driving-forces, scenarios, benchmark}/   (분석)
        ↓ Strategy Agent
analysis/scenarios/strategy.md                            (전략 통합)
        ↓
report/scenario-planning-report.md                        (전략 보고서)
        ↓
        ├─── ① 발표자료 갈래 ───────────────────────┐
        │                                              │
        │   presentation/slide-outline.md              │
        │           ↓                                  │
        │   python3 presentation/scripts/              │
        │           generate_pptx.py                   │
        │           ↓                                  │
        │   presentation/samsung-memory-               │
        │           scenario-planning.pptx (.gitignore)│
        │                                              │
        └─── ② 대시보드 갈래 ───────────────────────┤
            │                                          │
            │   dashboard/src/data/indicators.js       │
            │   dashboard/src/components/              │
            │           DecisionTracker.jsx            │
            │           ↓                              │
            │   cd dashboard && npm run build  (검증)  │
            │           ↓                              │
            │   (push 후 Vercel 자동 배포)              │
            │                                          │
            └──────────────────────────────────────────┘
                              ↓
            git commit + git push origin main
                              ↓
            ✓ 원격 저장소 동기화
            ✓ Vercel 프로덕션 자동 배포 (대시보드)
```

#### 변경 단계별 필수 갱신

| 변경된 위치 | 갱신해야 할 하류 |
|----------|----------------|
| `data/` 추가·수정 | `data/metadata.md` 항목 + 관련 `analysis/` 재검토 + `dashboard/data/*.json`(시계열인 경우) |
| `analysis/steep/`, `driving-forces/` | `scenarios/`, `benchmark/` 일관성 재검토 + `dashboard/src/data/indicators.js`의 `INITIAL_QUADRANT_POSITIONS` |
| `analysis/scenarios/`, `benchmark/` | `analysis/scenarios/strategy.md` (RS·MB·SB 매핑) + `dashboard/src/data/indicators.js`의 `SCENARIOS` |
| `analysis/scenarios/strategy.md` | `report/scenario-planning-report.md` 해당 섹션 + `dashboard/src/components/DecisionTracker.jsx`의 `DECISIONS` |
| `report/scenario-planning-report.md` | `presentation/slide-outline.md` 슬라이드 명세 |
| `presentation/slide-outline.md` | `presentation/scripts/generate_pptx.py` 함수 (구조 변경 시) |
| `dashboard/src/**` 또는 `api/**` | `cd dashboard && npm run build`로 빌드 검증 |

#### 마무리 단계 (모든 변경의 종착점)

1. **PPTX 재생성**: `python3 presentation/scripts/generate_pptx.py`
   → 슬라이드 수(예상 25) + 산출물 크기(~500KB) 확인
2. **대시보드 빌드 검증**: `cd dashboard && npm run build`
   → `dist/` 생성, 콘솔 오류 없음 확인
3. **git commit**: 의미 단위로 커밋, `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` 포함
4. **`git push origin main`** — 원격 저장소 동기화 (이 규칙으로 사전 승인됨)
5. **Vercel 자동 배포 확인**: push 후 GitHub Actions/Vercel 대시보드에서 빌드 성공 여부 확인 (실패 시 사용자에게 알림)

#### 자동화 원칙

- 한 번의 사용자 지시로 영향 범위 끝까지 자동 추적·갱신 (발표자료 갈래 + 대시보드 갈래 모두)
- 영향이 없는 갈래는 건너뛰되, **건너뛴 이유를 응답에 명시** (예: "데이터 시각화만 변경되어 대시보드 indicators.js는 영향 없음")
- push 전에 반드시 양쪽 갈래 빌드 검증 (PPTX 스크립트 정상 실행 + dashboard `npm run build` 통과)
- **사전 승인 범위**: 본 규칙은 위 체인 흐름에서 발생하는 commit + push + (push 트리거된) Vercel 배포에 한해 사전 승인. 이외 destructive 작업(force push, branch 삭제, history rewrite, Vercel 환경변수 변경 등)은 매번 별도 확인 필요

### Mermaid 다이어그램
- 시나리오 매트릭스, 전략 상관관계 등 시각적 다이어그램은 Mermaid 문법으로 작성
- Markdown 파일 내 ` ```mermaid ` 코드 블록 사용
- 지원 다이어그램 유형: flowchart, quadrantChart, graph, gitGraph 등
- 복잡한 매트릭스(2×2)는 Mermaid quadrantChart 또는 graph 사용

## 언어
- 모든 문서는 한국어 작성 (기술 용어는 영어 병기 허용)
