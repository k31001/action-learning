# Claude Code 세미나 — 스킬 & 커넥터 슬라이드 아웃라인

세미나에서 Claude Code의 (1) 기본 제공 스킬과 (2) 커넥터를 각각 한 장씩 소개하기 위한 슬라이드 명세.

- **출력물**: `slides/seminar/claude-code-skills.pptx`, `slides/seminar/claude-code-connectors.pptx`
- **빌드**: `python3 slides/seminar/scripts/generate_slides.py`
- **시각 톤**: 두 슬라이드 동일 (4-카드 그리드 + 모노그램 아이콘 + 하단 출처). 스킬은 `copper`, 커넥터는 `slate` 액센트 컬러로 구분.
- **공식 문서 조회 일시**: 2026-05-07 (학습 데이터 outdated 가능성 → WebFetch로 최신 사양 검증 후 작성)

---

## 슬라이드 1 — 기본 제공 스킬 (Built-in Skills)

### 헤더
- 제목: **Claude Code 기본 제공 스킬 (Built-in Skills)**
- 부제: SKILL.md로 패키징 — 작업 지침을 동적 로드해 Claude의 능력을 확장

### 4-카드 그리드 (2×2)

| 카드 | 모노그램 | 헤드라인 | 본문 |
|----|--------|--------|----|
| ① 한 줄 정의 | `S` | **SKILL.md 기반 동적 로드 지침** | 디렉토리 + `SKILL.md` (YAML frontmatter + Markdown) 한 묶음. `description` 매칭으로 Claude가 자동 호출하거나, `/스킬-이름`으로 명시 호출. 본문은 호출 시점에만 컨텍스트에 로드 → 토큰 비용 최소화. |
| ② Anthropic 공식 번들 | `A` | **`docx` · `pdf` · `pptx` · `xlsx`** | `github.com/anthropics/skills` 공식 레포에 공개. Claude.ai · Claude Code · Anthropic API 어디서든 동일하게 동작 (`Claude의 문서 능력을 뒤에서 구동`). 설치: `/plugin marketplace add anthropics/skills`. |
| ③ Claude Code 내장 슬래시 스킬 | `/` | **번들 슬래시 스킬 6종** | `/simplify` (3개 리뷰 에이전트로 최근 변경 코드 점검 후 수정) · `/batch` (대규모 변경을 5~30 단위로 분해 후 worktree에서 병렬 실행) · `/debug` (디버그 로그 분석) · `/loop` (반복 실행) · `/claude-api` (Anthropic SDK 코드 마이그레이션 등) · `/fewer-permission-prompts`. |
| ④ 발견 + 호출 방식 | `?` | **`/skills`로 목록, 두 방식으로 호출** | 자동 발동 = `description` 매칭. 명시 호출 = `/스킬-이름` (인자 가능: `/fix-issue 123`). `disable-model-invocation: true`로 자동 발동만 차단. 저장 위치: enterprise / `~/.claude/skills/` (개인) / `.claude/skills/` (프로젝트) / 플러그인. |

### 푸터
- 출처: `code.claude.com/docs/en/skills` · `code.claude.com/docs/en/commands` · `github.com/anthropics/skills`

---

## 슬라이드 2 — 커넥터 (Connectors / MCP)

### 헤더
- 제목: **Claude Code 커넥터 (Connectors via MCP)**
- 부제: Model Context Protocol — 외부 도구·DB·API를 Claude의 도구로 노출

### 4-카드 그리드 (2×2)

| 카드 | 모노그램 | 헤드라인 | 본문 |
|----|--------|--------|----|
| ① 한 줄 정의 | `M` | **MCP 서버 ↔ Claude Code 어댑터** | 외부 시스템(GitHub · Slack · DB 등)이 MCP 서버를 노출하면 Claude Code가 그 도구·리소스·프롬프트를 세션 안에서 직접 호출 가능. "다른 도구에서 채팅창으로 데이터를 복사·붙여넣고 있다면 커넥트할 시점." (공식 문서 인용) |
| ② 디렉토리 커넥터 | `D` | **검증된 공식·서드파티 카탈로그** | `claude.com/connectors`에 카테고리별로 게재 (Productivity / Communication / Data / Sales & Marketing / Code / Design / Financial 등). 대표 예시: GitHub · Slack · Notion · Asana · Atlassian · Airtable · Stripe · Sentry · Linear · Figma · Google Drive. |
| ③ 커스텀 / 자체 MCP 서버 | `+` | **로컬 stdio 또는 자체 호스팅** | 디렉토리 외 통합은 `modelcontextprotocol/servers`(오픈소스 모음) 또는 MCP SDK로 직접 구현. 로컬 도구·내부 시스템 연결에 활용. |
| ④ 추가 명령 + 관리 | `>_` | **`claude mcp add` / `/mcp`** | HTTP(권장): `claude mcp add --transport http notion https://mcp.notion.com/mcp` · SSE(deprecated) · stdio(로컬, `--env KEY=VAL` + `--`로 명령 전달). 관리: `claude mcp list / get / remove`, 세션 내 `/mcp`로 OAuth·상태 확인. 스코프: `local` / `project` (`.mcp.json` 공유) / `user`. |

### 보안 배너 (하단 강조)
- "**Make sure you trust MCP servers you are installing.** Be especially careful when using MCP servers that could fetch untrusted content, as these can expose you to **prompt injection** risk." — Claude Code 공식 문서 경고문

### 푸터
- 출처: `code.claude.com/docs/en/mcp` · `claude.com/connectors` · `modelcontextprotocol.io`

---

## 시각 톤 통일 규칙

- 동일 그리드(2×2 카드), 동일 헤더/푸터, 동일 폰트(맑은 고딕 + Calibri).
- 카드 색만 다름:
  - 스킬: copper(#CC785C) 액센트 + cream(#F4F0E8) 카드 배경
  - 커넥터: slate(#596375) 액센트 + 같은 cream 배경
- 모노그램은 원형 + 단일 글자 (이모지 미사용 — 폰트 의존성 회피).
- 각 슬라이드 하단 1줄에 출처 URL을 한 묶음으로 표기.
