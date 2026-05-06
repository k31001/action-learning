# Claude Code for Reports
## 세미나 슬라이드 기획서 (Tutorial Template 적용)

**작성일**: 2026년 5월
**슬라이드 수**: 16매
**발표 예상 시간**: 60~75분
**대상**: 전략기획·연구·분석 담당자 (개발 경험 불필요)
**컨셉**: "AI Harness Engineering" 템플릿의 시각 언어로 — 기술적이고 실무적인 톤

---

## 디자인 시스템 (tutorial-template.pptx 기준)

| 요소 | 사양 |
|------|------|
| 슬라이드 크기 | 13.33" × 7.5" (LAYOUT_WIDE, 16:9) |
| 배경 | 다크 네이비 `#0B1220` |
| 패널/카드 BG | `#111B2E` · `#1E2A44` (살짝 밝은 네이비) |
| 1차 강조 (Primary) | 시안 `#22D3EE` |
| 2차 강조 (Secondary) | 앰버 `#FBBF24` |
| 본문 텍스트 | `#F1F5F9` (밝은 흰색) |
| 보조 텍스트 | `#CBD5E1` · `#94A3B8` |
| 푸터/캡션 | `#64748B` |
| 헤드라인 폰트 | Arial Black (84pt 표지 / 36pt 본문) |
| 본문 폰트 | Calibri (14~18pt) |
| 코드 폰트 | Consolas (10~13pt) |
| 우측 엣지 | 시안 세로 라인 (x=13.18", w=0.04") 전 슬라이드 공통 |

### 슬라이드 공통 영역

| 위치 | 요소 |
|------|------|
| 좌상단 (0.60, 0.35) | 섹션 라벨 — 시안 10pt Calibri (예: `▍ CLAUDE CODE  03 · DEFINITION`) |
| 우상단 (11.73, 0.35) | 페이지 카운터 — 회색 10pt Consolas (예: `03 / 16`) |
| 본문 타이틀 (0.60, 0.85) | 36pt Arial Black 흰색 |
| 본문 서브타이틀 (0.60, 1.70) | 14pt Calibri `#94A3B8` |
| 좌하단 (0.60, 7.05) | 푸터 — `#64748B` 9pt Calibri (`Claude Code for Reports · Technical Seminar`) |

---

## 📌 슬라이드 구성 요약

| # | 섹션 | 내용 | 형태 |
|---|------|------|------|
| 1 | COVER | 표지 — "Claude Code / for Reports." | 풀스크린 타이포그래피 |
| 2 | AGENDA | 6개 핵심 주제 안내 | 6칸 그리드 |
| 3 | 01 · DEFINITION | Claude Code란? + 컴포넌트 다이어그램 | 인용구 + 동심원 |
| 4 | 02 · WHY | 기존 보고서 작성의 4가지 한계 | 2×2 카드 |
| 5 | 03 · CORE CAPABILITIES | 6가지 핵심 기능 개관 | 6칸 그리드 |
| 6 | 03 · COMPONENT 01 | CLAUDE.md — 프로젝트 기억 | 텍스트 + 코드 |
| 7 | 03 · COMPONENT 02 | 파일 기반 워크플로우 | 텍스트 + 코드 |
| 8 | 03 · COMPONENT 03 | 서브에이전트 병렬 처리 | 다이어그램 + 코드 |
| 9 | 03 · COMPONENT 04 | 웹 검색 → Markdown 자동 정리 | 텍스트 + 코드 |
| 10 | 03 · COMPONENT 05 | Mermaid 시각화 | 코드 + 렌더링 |
| 11 | 03 · COMPONENT 06 | Git 자동 버전 관리 | 텍스트 + 코드 |
| 12 | 04 · END-TO-END | 통합 사례: 시나리오 플래닝 보고서 | 단일 워크플로우 |
| 13 | 04 · LIVE DEMO | 실제 산출물 데모 | 스크린샷 슬롯 |
| 14 | 05 · LESSONS | 베스트 프랙티스 6가지 | 6칸 카드 |
| 15 | 06 · ECOSYSTEM | 도구·프레임워크 지도 | 4개 카테고리 |
| 16 | CLOSING | Q&A | 표지 톤의 마무리 |

---

## 슬라이드 1: 표지 (COVER)

**섹션 라벨**: `▍ TECHNICAL  SEMINAR`

### 레이아웃
```
[좌상단] ▍ TECHNICAL  SEMINAR             (시안)

[중앙 좌측 정렬]
Claude Code                                (84pt 흰색)
for Reports.                               (84pt 시안)

LLM 에이전트로 전략 보고서를 처음부터 끝까지   (18pt)

$ claude --project=memory --reports=on    (13pt 시안 Consolas)

발표자: [이름]  ·  소속: [팀]  ·  2026.05.05
```

### 디자인 지침
- "for Reports." 만 시안으로 강조 (템플릿의 "Engineering." 위치)
- 우측 엣지 시안 세로 라인 유지

---

## 슬라이드 2: AGENDA

**섹션 라벨**: `▍ CLAUDE CODE  AGENDA`

### 콘텐츠 (6개 항목)
| # | 제목 | 부제 |
|---|------|------|
| 01 | Claude Code란 무엇인가 | 정의, 챗봇과의 차이, 왜 보고서에 적합한가 |
| 02 | 왜 기존 방식은 부족한가 | 보고서 작성의 4가지 현실적 한계 |
| 03 | 6가지 핵심 기능 | 메모리·파일·에이전트·웹·시각화·버전 관리 |
| 04 | 통합 사례 — 시나리오 플래닝 | 실제 612줄 보고서가 만들어진 과정 |
| 05 | Best Practices & Pitfalls | 현장에서 배운 6가지 교훈 |
| 06 | 도구 & 생태계 | 클로드 코드와 함께 쓰면 좋은 것들 |

### 디자인 지침
- 6개 카드 2×3 그리드, 카드 좌측에 큰 번호 (시안)
- 카드 BG `#111B2E`

---

## 슬라이드 3: 01 · DEFINITION — Claude Code란 무엇인가

**섹션 라벨**: `▍ CLAUDE CODE  01 · DEFINITION`
**서브타이틀**: 보고서 한 편을 처음부터 끝까지 만들 수 있는 LLM 에이전트

### 좌측 — 인용구 패널
- 큰 시안 `"` 마크 (96pt)
- 본문(18pt 시안):
  > "Claude Code는 채팅창의 텍스트가 아니라, **파일 시스템 위에서 동작하는 LLM 에이전트**다.
  > 한 번의 한국어 지시로 자료 수집·분석·작성·시각화·버전 관리를 모두 수행한다."
- 보조(13pt 회색): "터미널에서 실행되며, 프로젝트 디렉토리를 직접 읽고 쓰고 git 커밋한다."

### 우측 — 컴포넌트 동심원
- 캡션: `CLAUDE CODE LAYER` (Consolas 10pt)
- 중앙 큰 원: `LLM` (시안 BG, 다크 텍스트, 22pt Arial Black)
- 외곽 원 8개 (Consolas 11pt 흰색):
  - File I/O · Web Search · Tools · Memory
  - Subagents · Mermaid · Git · MCP

---

## 슬라이드 4: 02 · WHY — 기존 방식은 왜 부족한가

**섹션 라벨**: `▍ CLAUDE CODE  02 · WHY`
**서브타이틀**: 보고서 작성이 마주하는 4가지 현실

### 2×2 카드
| 아이콘 | 카드 제목 | 본문 |
|--------|----------|------|
| ⏱ | 시간이 많이 든다 | 자료 수집·정리·작성·시각화 합쳐 6~10일. 정작 전략 사고에 쓸 시간이 없다. |
| 🔁 | 반복 작업이 너무 많다 | 출처 정리, 형식 통일, 표·다이어그램 다시 그리기 — 사람이 매번 똑같이 한다. |
| 💾 | 일관성을 잡기 어렵다 | 단위·표기·인용 규칙이 문서마다 흔들린다. 마지막에 통일하느라 또 시간이 든다. |
| 🧩 | 도구가 흩어져 있다 | 자료는 브라우저, 작성은 워드, 시각화는 다른 도구. 컨텍스트가 끊긴다. |

### 디자인 지침
- 카드 좌상단: 큰 시안/앰버 아이콘
- 카드 BG `#111B2E`, 좌측 액센트 라인

---

## 슬라이드 5: 03 · CORE CAPABILITIES — 6가지 핵심 기능

**섹션 라벨**: `▍ CLAUDE CODE  03 · CORE CAPABILITIES`
**서브타이틀**: 하나씩 코드와 예시로 살펴봅니다

### 6칸 그리드
| 번호 | 제목 | 부제 |
|------|------|------|
| 01 | Project Memory | CLAUDE.md로 규칙·형식·언어를 영속화 |
| 02 | File-based Workflow | data/ → analysis/ → report/ 자동 흐름 |
| 03 | Sub-agents | 4개 영역 병렬 리서치 |
| 04 | Web Search | 출처가 박힌 Markdown 자동 생성 |
| 05 | Mermaid Visualization | 텍스트 코드 → 차트·다이어그램 |
| 06 | Git Auto-versioning | 모든 변경이 commit 이력으로 |

---

## 슬라이드 6: COMPONENT 01 — Project Memory (CLAUDE.md)

**섹션 라벨**: `▍ CLAUDE CODE  03 · COMPONENT 01`
**큰 번호**: `01` (시안 96pt)
**큰 제목**: `Project Memory` (40pt 흰색)
**서브타이틀**: 규칙을 코드로 적어두면 모든 세션이 같은 톤으로 동작한다

### 좌측 (텍스트 50%)
✱ **CLAUDE.md = 프로젝트의 헌법**
   매번 말하지 않아도 자동 적용되는 약속

✱ **언어·형식·인용 규칙 영속화**
   "한국어, 수치는 B 단위, 출처 명시"

✱ **워크플로우 규칙도 함께**
   "데이터 추가 시 metadata.md 업데이트, 변경 시 git commit"

### 우측 (코드 50%)
파일명: `CLAUDE.md`
```markdown
# 프로젝트 가이드라인

## 필수 규칙
- 모든 문서는 Markdown 형식
- 수치는 억 → B 형식 ($5,516억 → $551.6B)
- 데이터 추가 시 metadata.md 업데이트
- 모든 변경사항은 git commit
- 한국어 작성 (기술 용어는 영어 병기 허용)

## 시각자료
- 2×2 매트릭스는 Mermaid quadrantChart
- 의존 관계는 Mermaid flowchart TD
```

---

## 슬라이드 7: COMPONENT 02 — File-based Workflow

**섹션 라벨**: `▍ CLAUDE CODE  03 · COMPONENT 02`
**큰 번호**: `02`
**큰 제목**: `File-based Workflow`
**서브타이틀**: 채팅창이 아니라 파일 시스템 위에서 동작한다

### 좌측 — 디렉토리 흐름 (3박스 화살표)
```
data/        →   analysis/   →   report/
(원시 데이터)    (가공·요약)     (최종 산출물)
```
하단 보조: "사용자는 한 번 지시, AI는 디렉토리를 자동 순회"

### 우측 (코드)
파일명: `terminal`
```bash
$ claude

> @data/ 디렉토리의 모든 데이터를 기반으로
  STEEP 분석 표를 만들어
  analysis/steep-table.md에 저장하고
  data/metadata.md에 항목을 추가해줘.

✓ data/ 16개 파일 읽음
✓ analysis/steep-table.md (50개 요인) 생성
✓ data/metadata.md 업데이트
```

---

## 슬라이드 8: COMPONENT 03 — Sub-agents

**섹션 라벨**: `▍ CLAUDE CODE  03 · COMPONENT 03`
**큰 번호**: `03`
**큰 제목**: `Sub-agents`
**서브타이틀**: 4개 영역을 동시에 — 1/4 시간으로 끝낸다

### 4단계 다이어그램 (가로)
| 1 | 2 | 3 | 4 |
|---|---|---|---|
| **DISPATCH** | **PARALLEL** | **MERGE** | **REPORT** |
| 메인 에이전트가 4개 영역 분배 | Market·Competitor·Tech·Policy 동시 실행 | 결과를 하나의 컨텍스트로 통합 | 보고서에 자동 인용 |

### 우측 (코드)
파일명: `sub-agents.py`
```python
# 한 번의 지시 → 4개 에이전트 자동 분기
agents = [
  Agent("market",     "TrendForce·Yole·BofA"),
  Agent("competitor", "삼성/SK하이닉스/마이크론"),
  Agent("technology", "HBM4·CMX·SCADA"),
  Agent("policy",     "CHIPS Act·VEU·MATCH"),
]
results = parallel(agents)   # 4 in flight
report  = merge(results)
```

---

## 슬라이드 9: COMPONENT 04 — Web Search

**섹션 라벨**: `▍ CLAUDE CODE  03 · COMPONENT 04`
**큰 번호**: `04`
**큰 제목**: `Web Search`
**서브타이틀**: 출처가 박힌 Markdown으로 정리된다

### 좌측 (체크리스트)
✱ **공신력 있는 출처만**
   TrendForce, Yole, BofA, Counterpoint 우선

✱ **출처 자동 인용**
   표·수치마다 출처와 날짜 footnote

✱ **단위·형식 통일**
   `$5,516억` 입력 → `$551.6B`로 자동 변환

✱ **메타데이터 자동 등록**
   `data/metadata.md`에 신뢰도·태그·요약 항목 추가

### 우측 — 생성된 hbm-market.md 미리보기
```markdown
# HBM 시장 현황 및 전망

## 시장 규모
| 연도 | 규모  | YoY  |
|------|-------|------|
| 2024 | $18.6B | +82% |
| 2025 | $34.0B | +83% |
| 2026 | $54.6B | +61% |
(출처: TrendForce, BofA, 2026)
```

---

## 슬라이드 10: COMPONENT 05 — Mermaid Visualization

**섹션 라벨**: `▍ CLAUDE CODE  03 · COMPONENT 05`
**큰 번호**: `05`
**큰 제목**: `Mermaid Visualization`
**서브타이틀**: 텍스트 코드 한 줄 → GitHub에서 자동 렌더링

### 좌측 (코드 입력)
파일명: `scenario-matrix.mmd`
```
quadrantChart
  title 시나리오 매트릭스
  x-axis AI 거품 붕괴 --> 수요 지속
  y-axis 관리된 공존 --> 디커플링
  quadrant-1 A 황금 요새
  quadrant-2 C 기술 냉전
  quadrant-3 D 조용한 재편
  quadrant-4 B AI 르네상스 ⭐
```

### 우측 (렌더링 미리보기)
- 흰색 배경 박스 안에 4분면 mock-up
- 각 분면 라벨 + B 시나리오 ⭐ 표시
- 캡션: `GitHub에서 자동 렌더링 · 이미지 편집 도구 불필요`

### 지원 차트 (하단 캡션)
`flowchart TD` · `quadrantChart` · `graph` · `gitGraph` · `sequenceDiagram` · `pie` · `mindmap`

---

## 슬라이드 11: COMPONENT 06 — Git Auto-versioning

**섹션 라벨**: `▍ CLAUDE CODE  03 · COMPONENT 06`
**큰 번호**: `06`
**큰 제목**: `Git Auto-versioning`
**서브타이틀**: 모든 변경이 자동 커밋 — 언제든 되돌릴 수 있다

### 좌측 (체크리스트)
✱ **자동 commit**
   파일 변경 발생 시 자연어로 메시지 생성

✱ **PROMPT.md 누적 기록**
   모든 사용자 지시가 날짜별로 로깅

✱ **PR·Push까지 통합**
   `gh pr create`로 GitHub PR 생성 가능

✱ **언제든 git revert**
   잘못 만든 섹션은 한 번에 복구

### 우측 (터미널 출력)
```bash
$ git log --oneline

1e44831 Add seminar content
c74e59c quadrantChart로 매트릭스 교체
5844ab8 대규모 멀티파일 수정
405e187 경쟁사 투자 전략 추가
b41c46b NVIDIA CMX·SCADA 반영
```

---

## 슬라이드 12: 04 · END-TO-END EXAMPLE — 통합 사례

**섹션 라벨**: `▍ CLAUDE CODE  04 · END-TO-END EXAMPLE`
**타이틀**: 통합 사례 — 삼성전자 메모리사업부 시나리오 플래닝
**서브타이틀**: 6가지 컴포넌트가 한 프로젝트 안에서 모두 보이는 모습

### 코드 패널 (전체 영역)
파일명: `workflow.md`
```bash
# 1. CLAUDE.md (① Project Memory)
$ claude
> 시나리오 플래닝 보고서 프로젝트 시작.
  CLAUDE.md와 디렉토리 구조 만들어줘.

# 2. data/ 수집 (② File Workflow + ④ Web Search)
> @data/ 16개 영역에 시장·경쟁사·기술·정책 데이터 수집.

# 3. 병렬 분석 (③ Sub-agents)
> 4개 영역 동시 분석 → analysis/

# 4. 보고서 작성 + Mermaid (⑤ Visualization)
> Shell 시나리오 플래닝으로 612줄 보고서 작성.
  매트릭스는 Mermaid quadrantChart로.

# 5. 자동 커밋 (⑥ Git)
✓ 27 commits · github.com/k31001/action-learning
```

### 하단 캡션
`✱ 6가지 컴포넌트가 단 한 프로젝트 안에서 자연스럽게 흐릅니다.`

---

## 슬라이드 13: 04 · LIVE DEMO — 실제 산출물

**섹션 라벨**: `▍ CLAUDE CODE  04 · LIVE DEMO`
**타이틀**: 데모 화면
**서브타이틀**: 이 자리에 실제 산출물 스크린샷을 넣습니다

### 빈 슬롯
- 점선 박스 (시안 점선)
- 안에 `▢ [ 보고서 / 슬라이드 / Mermaid 렌더링 캡처 삽입 ]`
- 보조 텍스트: `권장: 1920×1080 PNG · 또는 짧은 GIF (< 5초)`
- 하단 캡션: `report/scenario-planning-report.md · presentation/slide-outline.md · GitHub Mermaid 렌더링 — 가장 임팩트 있는 한 장면`

---

## 슬라이드 14: 05 · LESSONS — Best Practices

**섹션 라벨**: `▍ CLAUDE CODE  05 · LESSONS`
**타이틀**: Best Practices
**서브타이틀**: 보고서 30편을 만들면서 배운 것

### 2×3 그리드 (6개 카드)
| # | 제목 | 본문 |
|---|------|------|
| 01 | CLAUDE.md를 가장 먼저 | 형식·인용·단위 규칙을 시작 시 박아두면 후반 통일 작업이 사라진다. |
| 02 | 한 번에 하나의 지시 | 다섯 가지를 한꺼번에 시키면 흐려진다. 좁고 명확하게. |
| 03 | 출처는 반드시 검증 | AI가 정리한 수치라도 1차 출처를 사람이 확인. 구조는 믿어도 숫자는 확인. |
| 04 | 데이터 → 분석 → 보고서 분리 | 디렉토리를 분리해야 재사용·재실행이 가능하다. |
| 05 | PROMPT.md를 살려라 | 다음 세션이 과거 의도를 이해할 수 있게 모든 지시를 누적 기록. |
| 06 | 사람을 루프에 두기 | 전략 판단·민감 정보·승인은 반드시 사람이. AI는 초안과 형식. |

---

## 슬라이드 15: 06 · ECOSYSTEM — 도구 & 생태계

**섹션 라벨**: `▍ CLAUDE CODE  06 · ECOSYSTEM`
**타이틀**: 함께 쓰면 좋은 도구
**서브타이틀**: 보고서·문서 워크플로우를 더 강하게 만드는 것들

### 4개 카테고리 (각 4개 항목)
| 카테고리 | 항목 |
|----------|------|
| **EDITOR & TERMINAL** | VS Code · iTerm2 · Cursor · Warp |
| **VISUALIZATION** | Mermaid · D3 · matplotlib · Excalidraw |
| **PUBLISHING** | GitHub · Notion · Obsidian · Pandoc |
| **MCP CONNECTORS** | Notion MCP · Google Drive · Gmail · Slack |

### 디자인
- 4컬럼 카드, 각 카테고리 헤더는 시안
- 항목은 `▸` 마커 + Consolas 항목명

---

## 슬라이드 16: CLOSING — Q&A

### 표지 톤의 단순한 마무리
```
[좌상단] ▍ THANK YOU                     (시안)

Questions                                  (84pt 흰색)
&  Discussion.                             (84pt 시안)

Claude Code = 보고서를 만들어내는 LLM 에이전트.
시작은 CLAUDE.md 한 줄, 그 다음은 자동입니다.

발표자료 / 코드: github.com/k31001/action-learning
연락: euihyeok.kwon@gmail.com
```

---

## 발표자 가이드

### 시간 배분 (75분)

| 구간 | 슬라이드 | 시간 |
|------|---------|------|
| 오프닝 + 정의 + Why | 1~4 | 12분 |
| 6가지 컴포넌트 | 5~11 | 30분 |
| 통합 사례 + 데모 | 12~13 | 15분 |
| Best Practices + 생태계 | 14~15 | 8분 |
| Q&A | 16 | 10분 |

### 데모 준비 체크리스트
- [ ] 터미널 폰트 18pt 이상으로 확대
- [ ] `action-learning/` 디렉토리 열어두기
- [ ] VS Code에 CLAUDE.md, scenario-planning-report.md 탭으로 띄우기
- [ ] GitHub 브라우저 탭 — Mermaid 렌더링 확인용
- [ ] 인터넷 불안정 시: 슬라이드 13 스크린샷이 백업 역할

### 라이브 데모 대안
모든 컴포넌트 슬라이드 우측 코드 영역이 이미 데모 스크립트 역할을 하므로, 인터넷이 끊겨도 슬라이드만으로 시연 가능합니다.
