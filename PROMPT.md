# Prompt

# 목표
나는 삼성전자 메모리사업부의 일원으로 불확실성에 대응하기 위한 회사의 전략을 제안하기 위한 발표자료를 만들거야

# 배경
최근 인공지능 데이터센터 수요가 폭발적으로 증가하면서 메모리 수요도 함께 증가하여 엄청난 호황을 누리고 있어. 한동안 이런 호황이 계속될 것이라는 전망이 많지만 회사가 지속 성장하기 위해서는 호황이나 불황일 때 적절한 전략적 의사결정을 통해 미래를 대비할 필요가 있어

# 방법론
불확실성 속에서 중요한 의사결정을 해야하기 때문에 쉘에서 사용하였던 '시나리오 플래닝' 기법을 활용할거야. 현 우리 회사가 처한 상황에서의 Focal Issue를 정의하고 관련 이슈에게 영향을 주는 STEEP (Social, Technology, Environment, Economy, Political) 관점에서 다양한 요소들을 브레인 스토밍 기법을 통해 도출한 뒤 그 중 가장 핵심적인 영향으르 미치는 Driving Forces를 찾아내고, 그 중 불확실성(Uncertainty) 가장 높은 요소들을 2~3개 선별하여 모든 조합에 대한 시나리오를 도출하고 그 중 핵심적인 3~5개의 대안적 미래를 도출하여 가장 높은 확률의 시나리오에 Bet을 하겠지만 나머지 시나리오의 미래가 오더라도 Side Bet을 통해 최악의 경우를 대비하려고 해. 그렇게 하여 어떤 시나리오에서도 기업이 생존하는 전략을 도출하는 것이 목적이야. 

# 산출물
1. 현재 환경을 정확하게 판단할 수 있도록 연관된 모든 데이터를 수집하여 별도의 디렉토리에 정리하고 다운로드 가능한 데이터는 다운로드하고 안되면 웹링크를 표시함. 그리고 모든 데이터에 대해서 요약을 포함하는 메타데이터를 관리하여 필요할 때 빠르게 참조할 수 있도록 함.
2. 최종 목표는 발표 자료를 파워포인트로 만드는 것이지만 그 전에 논리적으로 탄탄한 구성을 가진 시나리오 플래닝 기반의 전략 보고서가 필요해. 보고서는 마크다운 포맷으로 정리하고 시각적 자료들은 별도 디렉토리에 보관하여 마크다운에서 함께 렌더링 되어 볼 수 있도록 해줘. 
3. 2번에서 만든 마크다운 파일을 기반으로 파워포인트를 만들기 위한 중간 산출물을 생성해야해. 각 슬라이드에 어떤 내용과 시각자료, 표, 미디어, 논리 들이 들어가야되는지 정확하게 기술하여 파워포인트를 의도한대로 생성할 수 있도록 해주는 역할이야.
4. 파워포인트 생성은 어떻게 할지 고민이야. 가장 시각적으로 뛰어나고 전문적인 내용을 포함하기 위한 솔루션을 제안해줘.  

# 주요 지침
- 자료 조사, 보고서 작성, 파워포인트 작성, 시나리오 플래닝, 구체적 전략 구상 등 다양한 역할이 필요하므로 각 역할에 대한 서브에이전트를 생성하는 것이 좋겠어
- 내가 지시한 모든 프롬프트는 PROMPT.md 파일에 누적하여 기록해줘
- 모든 데이터는 git으로 관리하고 github에 올려서 공유할거야. 
- 파워포인트를 제외한 모든 문서는 마크다운으로 작성할거야


일단 이정도로 시작해보자.

---

## 2026-05-05: Bet 전략 심화 지시

전략 보고서의 Bet 전략 부분을 다음 7개 방향으로 수정 요청:

1. **옵션형 캐파 체계**: 고정 증설 아닌 장비 반입 시점·mix 전환권 단계화. "켜고 끌 수 있는 능력"이 핵심
2. **HBM 초과이익 재투자 원칙 명문화**: 배당/외형 확대 아닌 원가·수율·패키징·테스트 시간 단축에 재투자. 다운턴 흑자 구조 목표
3. **고객 포트폴리오 의도적 분산**: 협상력 기준 고객 tier화 (장기계약/전략/성장). shortage 시기에 take-or-pay 계약 구조 심어놓기
4. **바벨 포트폴리오 전략**: HBM/커스텀 고성능 ↔ 저원가 범용 DRAM/NAND. 중간 어정쩡한 제품 축소. AI 개발 효율화로 남는 인력을 PC/Mobile/Auto 포트폴리오 유지에 활용
5. **정책 리스크 지역 분산 공급망**: 규제별 출하 SKU 체계 설계. 미국 팹 확장 시 합작투자(샌디스크+키옥시아 모델) 또는 물량선점 계약 동반
6. **재무 규율 제도화**: 재고일수 상한, 장기계약 없는 증설 제한, EBITDA → 현금흐름 중심, 업황 피크 capex 기준 강화
7. **고객특화 기능/제품 확대**: 전환비용 높이는 전략. FDP(Flexible Data Placement) 사례처럼 고객 시스템 소프트웨어와 결합. HBM 베이스다이 커스텀 로직. **AI 개발 효율화가 이 모든 것의 선행 조건 — 남는 인력으로 포트폴리오 다변화 + 고객특화 기능 개발 동시 추진이 핵심 전략 논리**

---

## 2026-05-05: Canva 중단 → Notion 프로젝트 생성 지시

캔바로 프리젠테이션 만드는 것은 중단. 대신 전략 권고안, 전략 보고서, 슬라이드 아웃라인 마크다운 파일들을 활용해서 노션에 프로젝트를 만들어서 문서를 작성해줘.

→ 결과: Notion에 메인 허브 페이지 + 전략 보고서, 전략 권고안, 슬라이드 아웃라인(1-12, 13-25) 페이지 생성 완료

---

## 2026-05-05: NVIDIA CMX·SCADA 기술 데이터 추가 및 전략 반영 지시

`@data/technology` 기술 부문에 최근 NVIDIA에서 주도적으로 드라이브하고 있는 CMX, SCADA 관련 내용도 추가해줘. 메모리, SSD 기업 입장에서는 굉장히 중요한 부분이라 고려가 되어야 하는 부분이야. 전략과 보고서에 관련 부분도 추가해주고.

→ 결과:
- `data/technology/nvidia-cmx-scada.md` 신규 생성 (CMX KV 캐시 오프로드 플랫폼, SCADA GPU 네이티브 스토리지, AI SSD 경쟁 구도 분석)
- `data/metadata.md` 업데이트 (16개 항목)
- `analysis/scenarios/strategy.md`: MB-4 CMX 에코시스템 참여, RS3 사례 4(SCADA AI SSD) 추가
- `report/scenario-planning-report.md`: SWOT 업데이트, STEEP 섹션 3.4 신설

---

## 2026-05-05: Notion 업데이트 정책 변경

앞으로 노션 업데이트는 필수는 아니야. 내가 시킬 때만 해줘.

---

## 2026-05-05: PROMPT.md 누락분 로깅 및 로깅 규칙 확인

지금까지 요청한 프롬프트들을 PROMPT.md 파일에 로깅해주고, 앞으로도 계속 로깅은 잊지 말아줘.

---

## 2026-05-05: 대규모 멀티파일 수정 지시

다음 7개 파일에 대한 수정 요청:

1. **README.md**: 상세 내용 추가, Canva 관련 내용 제거

2. **CLAUDE.md**: Canva 참조 제거, Mermaid 다이어그램 가이드라인 추가 (기본 지침에 포함)

3. **report/scenario-planning-report.md** 다수 변경:
   - Executive Summary: AI 개발 효율화 섹션 추가 (모든 전략의 선행 조건으로 명시)
   - 숫자 형식: 억 표기 → B 형식으로 전환 ($5,516억 → $551.6B 등)
   - 약어 각주 추가: VEU, MATCH, BIS, P&L, FCF, EWI 등
   - 시나리오 매트릭스: ASCII art → Mermaid 다이어그램 교체
   - Section 6.1 MB-4: CMX/SCADA 내용 추가
   - Section 6.4 포트폴리오 매트릭스: ✅ 기준 강화 (과도한 ✅ 정리)
   - Decision 2 "HBM 사업부 독립 P&L 조직 전환" 제거
   - Section 8.2 Call to Action: 부문별(전략기획/마케팅/인사/제조/연구/개발) 재작성

4. **analysis/scenarios/strategy.md** 다수 변경:
   - RS6 + RS7 단일 전략으로 병합 (재무 규율 + 초과이익 재투자 통합 패키지)
   - 포트폴리오 매트릭스 ✅ 기준 강화
   - RS 상호의존 관계도 추가 (Mermaid flowchart)
   - CMX/SCADA 내용 보강

5. **data/competitors/*.md** 4개 파일: 경쟁사 투자 전략 벤치마킹 데이터 추가 (서브에이전트가 수행)
   - sk-hynix.md: HBM 캐파 투자 전략, NVIDIA 파트너십 심화 과정
   - micron.md: CHIPS Act 활용 구조, 고객 공동투자 모델
   - china-competitors.md: 빅펀드 구조, YMTC DRAM 진출 위협
   - market-share.md: CapEx·R&D 비교 테이블, SanDisk+Kioxia JV 모델 분석

6. **presentation/slide-outline.md**: 위 모든 변경사항 반영
   - 슬라이드 3: 5개 즉시 결정 목록 업데이트 (HBM 조직 독립 제거, AI 개발 효율화 추가)
   - 슬라이드 4: 숫자 형식 B 표기로 통일
   - 슬라이드 19 MB-4: CMX/SCADA 추가
   - 슬라이드 23: 결정 목록 업데이트
   - 슬라이드 25 Call to Action: 부문별 6개 카드 그리드로 재구성

---

## 2026-05-05: 세미나 자료 생성 지시

"클로드 코드와 함께 보고서 만들기" 주제로 세미나 개최를 위한 자료 생성 요청:

- `working-style/seminar-claude-code-report/` 디렉토리 신규 생성
- `content.md`: 세미나 기술 문서 (8개 섹션 — 세미나 취지, Claude Code 개요, 핵심 개념, 워크플로우, 실제 사례 분석, 베스트 프랙티스, 환경 설정, Q&A)
- `slide-outline.md`: 28슬라이드 프리젠테이션 아웃라인 + 발표자 가이드
  - 딥 네이비 (#0D1B2A) + 클로드 오렌지 (#E07B39) + 민트 그린 (#4ECDC4) 디자인 시스템
  - 12개 [데모] 슬라이드: 실제 프로젝트 파일 경로 기반 화면 캡처 지정
  - Before/After 비교 슬라이드 포함
  - 90분 타임테이블 + 데모 체크리스트 + 인터넷 불안정 대비 플랜 B
  - 발표 대상: 비기술자 대상 (예제·결과·화면 캡처 위주 구성 요청 반영)

---

## 2026-05-06: 전반적 개선 및 발표자료 최종화 지시

지금까지 작업한 레파지토리 내용을 분석하여 자료조사, 전략 구상, 전략 보고서 작성, 발표자료 아웃라인 작성, 발표자료 작성에 대해서 전반적으로 모든 것을 개선하는 작업.

요구사항:
1. **자료조사 강화**: 부족한 부분 추가 조사. 특히 현재 경영 상황을 정확하게 판단하기 위한 데이터들. 어떤 데이터로 그래프를 그려야 상황을 정확하게 파악할 수 있는지 판단해서 `presentation/slide-outline.md`에 반영.
2. **벤치마크 활용**: `analysis/benchmark` 디렉토리의 자료를 보고 필요시 더 조사하여 보강하고 더 나은 전략 수립의 재료로 사용. 추가/수정된 전략은 `analysis/scenarios/strategy.md`에 반영하고 최종적으로 `report/scenario-planning-report.md`, `presentation/slide-outline.md`에 반영 (중요 룰).
3. **템플릿 활용**: `presentation/template.pptx` 템플릿을 활용하여 파워포인트 작성. 감안해서 `presentation/slide-outline.md` 리뉴얼.
4. **파워포인트 최종 작성**: 슬라이드 아웃라인 기반 PPTX 산출.
5. **PROMPT.md 로깅**: 모든 프롬프트 누적 기록.
6. **Git 커밋**: 작업 내용 git 반영.
7. **대시보드 개선**: 추가 트리거 요소, UI/UX, 컨텐츠, 디자인 모두 개선 대상.

---

## 2026-05-06: 발표자료 논리 흐름 재구성 (템플릿은 테마만 활용)

피드백: 템플릿 슬라이드 구조를 그대로 따르지 말고 **테마(색상·폰트·디자인 요소)만 활용**하면서, 다음 9단계 논리 흐름으로 발표자료를 다시 구성하라.

1. **현재 상황**: 메모리 반도체 시장은 매우 좋으나 과거 경험상 사이클 산업이라 언젠가 다운턴이 옴. 업턴인 지금 준비 잘 해야 함. 시장·기업 환경을 설명할 때 그래프와 데이터를 충분히 활용.
2. **불확실성**: 언제·얼마나 큰 다운턴이 올지 정확히 모름. 전략 방향성은 잡을 수 있지만 지금 당장 뭘 해야 할지 도출 어려움.
3. **시나리오 플래닝의 정당화**: 불확실성 높은 상황에서 중요 의사결정에 시나리오 플래닝이 제격. Shell·다른 기업의 최악 상황 극복 사례.
4. **방법론 소개**: 시나리오 플래닝이라는 방법론의 전체적인 워크플로우 설명.
5. **메모리 반도체 시나리오 플래닝 적용**: 각 단계별로 한두 페이지씩 할당하여 상세 시각화.
6. **Robust 전략 3~4개 상세**: 모든 상황에 통하는 불변 전략 중 핵심 3~4개를 별도 페이지로 상세히 설명, 시각화에 특별히 공을 들임.
7. **모니터링 대시보드 설명**.
8. **전략 리마인드**: 주요 전략 한 페이지 요약 + 우리가 풀려고 하는 문제를 해결할 수 있음 강조.
9. **최종 메시지** 클로징.

→ 작업: slide-outline.md 재작성 + 새 generate_pptx.py(테마 추출, 함수형 구성) + matplotlib 차트 활용

---

## 2026-05-06: RS 전략 팩트 체크 + 슬라이드 논리 흐름 재구성

피드백 5가지:

1. **RS 전략 팩트 체크 (자료조사 기반)**: 모든 Robust Strategy를 데이터로 검증.
   - CMX: 기존 SSD로 대응 가능한지 — 새 제품군 필요성
   - SCADA: 시장 규모·지속성 (반짝하고 사장될 가능성)
   - FDP: 구글과 호스트 시스템 소프트웨어 공동 개발 → 유료 판매 가능성
   - 현실성 없으면 설득력 없음 → 최대한 설득력 있는 논거 제시

2. **슬라이드 14 (시나리오 매트릭스)**: 2×2 매트릭스가 슬라이드 영역 초과 — 크기 조정

3. **슬라이드 22 (EWI 대시보드)**: 지난 2년간 2×2 사분면(DF1×DF2) 위치 변화 시각화 + 현재 위치 마커

4. **슬라이드 24 (전략 리마인드)**: 레이아웃 재구성 — Main Bet/Side Bet/Robust 각각 가장 중요한 것 3~4단어 요약 + 각 전략이 해결하는 문제 연결

5. **모든 슬라이드 제목 + 핵심 메시지의 논리 연결**: 제목과 핵심 메시지를 이어서 읽으면 그 자체로 강력한 논리적 주장이 되도록 슬라이드 흐름 재설계

---

## 2026-05-06: 슬라이드 7 — 호황 지속 시나리오 추가

피드백: 가설 A를 다운턴이 2030년 이후 와서 호황이 지속되는 시나리오로 변경.
"다운턴 대비도 중요하지만 호황을 최대한 누리기 위한 전략도 고민해야 함" — 호황 지속 시 전략적 행동도 동등하게 중요.

→ 작업: 슬라이드 7 가설 A를 "호황 지속" 시나리오로 교체. 색상 톤도 긍정적(green)으로 변경. 제목·서브타이틀도 "호황 지속도, 다운턴도 모두 모름"으로 조정.

---

## 2026-05-06: 세미나 PPTX 템플릿 적용 재작성

`working-style/seminar-claude-code-report/tutorial-template.pptx` (AI Harness Engineering 16매 템플릿) 디자인 시스템에 맞춰 발표자료 재작성 요청.

- `slide-outline.md`: 28슬라이드 → **16슬라이드** 구조로 전면 재작성
  - LAYOUT_WIDE (13.33×7.5"), 다크 네이비 `#0B1220` 배경, 시안 `#22D3EE` 강조, 앰버 `#FBBF24` 보조
  - 폰트: Arial Black(타이틀) / Calibri(본문) / Consolas(코드)
  - 공통 크롬: 좌상단 섹션 라벨, 우상단 페이지 카운터(NN/16), 우측 엣지 시안 라인, 좌하단 푸터
  - 구성: Cover → Agenda → Definition → Why → Core Capabilities 6 → Component 01~06 → End-to-end → Live Demo → Lessons → Ecosystem → Q&A
- `generate-pptx.js`: pptxgenjs로 템플릿 디자인 시스템 충실 재현 (16슬라이드 생성)
- `seminar-claude-code.pptx`: 재생성 완료, Keynote에서 시각 검증 통과

---

## 2026-05-06: 세미나 자료 v2 — Harness Engineering 개요 + 케이스 스터디 보강

`working-style/seminar-claude-code-report/slide-outline.md`를 16매 → **34매**로 확장.

요청 내용:
1. AI 하네스 엔지니어링에 대한 전반적인 내용을 Claude Code 기반으로 10페이지 보강
2. 시나리오 플래닝 보고서를 만들 때 하네스 엔지니어링 요소를 어떻게 활용했는지 예제 10페이지 추가
3. 하네스가 세운 계획 / 만든 서브에이전트 / 활용한 디렉토리 구조에 대한 세부 내용 포함
4. 예제는 git에 있는 코드·프롬프트·마크다운 그대로 활용 가능

작업 결과:
- **신설 트랙 00 · HARNESS (슬라이드 3~12, 10매)**: 하네스 정의, LLM vs Harness 비교, 5대 빌딩 블록(Tool/State/Context/Subagent/Loop), 에이전틱 루프, 컨텍스트 엔지니어링, 서브에이전트 3패턴(Researcher/Specialist/Critic), 도구 위계 + 권한 모델, 영속성 4레이어, Claude Code 위치도, 설계 원칙 5가지
- **신설 트랙 04 · CASE (슬라이드 22~31, 10매)**: 케이스 개요, 첫 프롬프트 + 6단계 자동 계획, 디렉토리 구조 트리, CLAUDE.md 발췌, 6개 서브에이전트 표(Research·STEEP·DF·Scenario·Strategy·Report), data/metadata.md 발췌, STEEP 깔때기 + key-drivers 결과, scenario-matrix.md Mermaid 코드 + 렌더링, strategy.md 벤치마크 매핑 표, report→outline→PPTX 파이프라인
- **기존 흡수**: 슬라이드 12 (END-TO-END), 13 (LIVE DEMO) 제거 → 케이스 스터디(22~31)로 흡수
- **재배치**: 정의·Why·6 컴포넌트는 13~21로 시프트, Lessons·Ecosystem·Closing은 32~34로 시프트
- **시간 배분**: 75분 → 105분 표준 (90분 단축안 병기)

후속 작업 필요: `generate-pptx.js`는 16슬라이드 기준이므로 34슬라이드 빌드용 보강 필요

---

## 2026-05-06: generate-pptx.js 34슬라이드 빌드 보강

`working-style/seminar-claude-code-report/generate-pptx.js`를 16슬라이드 → **34슬라이드** 빌드로 확장.

작업 내용:
- 페이지 카운터 `/ 16` → `/ 34`로 변경
- 슬라이드 2 AGENDA를 7트랙으로 재구성 (트랙 00·04는 앰버 액센트)
- 기존 슬라이드 3~11(번호 13~21), 14~16(번호 32~34)으로 페이지 번호 재조정
- 기존 슬라이드 12 (END-TO-END), 13 (LIVE DEMO) 제거 — 케이스 스터디로 흡수
- **신설 슬라이드 3~12 (10매)**: AI 하네스 엔지니어링 트랙 — 정의, LLM vs Harness 비교 표, 5대 빌딩 블록, 에이전틱 루프(4단계 카드 + 비교 표), 컨텍스트 4레이어, 서브에이전트 3패턴, 도구 위계 + 권한 모드, 영속성 4레이어 표, Claude Code 4분면 위치도, 설계 원칙 5가지
- **신설 슬라이드 22~31 (10매)**: 케이스 스터디 트랙 — 프로젝트 카드 + 디렉토리 트리, 첫 프롬프트 + 6단계 계획, 디렉토리 구조 코드 패널, CLAUDE.md 발췌 + 효과 4개, 6 서브에이전트 표, 데이터 카테고리 표 + metadata.md 발췌, STEEP 깔때기 + key-drivers 결과, scenario-matrix.md Mermaid 코드 + 4분면 렌더링, Strategy 벤치마크 매핑 7행 표, report→outline→PPTX 3단 파이프라인
- 헬퍼 함수 추가: `harnessTitle()`, `captionFoot()` (트랙 00 슬라이드 공용)
- 디자인 시스템 일관성: 트랙 00·04는 앰버(`#FBBF24`) 액센트, 기존 트랙은 시안(`#22D3EE`) 유지

검증:
- `node generate-pptx.js` 정상 실행
- 출력 파일: `seminar-claude-code.pptx` (1.0MB, 34슬라이드)
- `unzip -l` 확인 — `ppt/slides/slide{1..34}.xml` 모두 존재

---

## 2026-05-06: 세미나 자료 v3 — 신설 트랙만 + 라이트 개발자 테마

피드백 3가지:
1. 신설 트랙 두 개(00 하네스, 04 케이스)만으로 세미나 진행
2. 두 트랙이 논리적으로 이어지도록 리파인
3. 전체 테마를 밝고 개발자스러운 색감으로 변경

작업 결과:
- **슬라이드 수**: 34 → **23매** (60분 발표 구성: 이론 25 + 실전 22 + Q&A 10)
- **제거**:
  - 슬라이드 13~21: Claude Code 정의·Why·6 컴포넌트
  - 슬라이드 32~33: Lessons·Ecosystem
  - `componentSlide` 헬퍼 (사용처 없음)
- **재번호**: CASE 22~31 → **13~22**, CLOSING 34 → **23**
- **트랙 라벨**: `▍ CLAUDE CODE  04 · CASE *` → `▍ CASE STUDY  04 · *` (생성 코드 + 슬라이드 아웃라인 양쪽 동기화)
- **표지 리프레시**: "Claude Code / for Reports." → **"AI Harness / Engineering."**, 부제 "보고서 워크플로우 — 이론에서 실전까지", 핑크 italic 한 줄로 두 트랙 구조 안내, 터미널 라인 `$ harness --tracks=00,04 --slides=23`
- **AGENDA 리프레시**: 7트랙 그리드 → 3행 큰 카드 (00 인디고, 04 핑크, Q 뮤트). 각 카드에 시간 메타 표기
- **클로징 리프레시**: takeaway 3줄 + `$ harness --next-step=your-report` + 저장소 링크
- **트랙 사이 다리**: 슬라이드 12 끝 캡션과 슬라이드 13 시작 캡션이 명시적으로 5블록·5원칙을 거꾸로 참조하도록 수정
- **slide-outline.md에 매핑 표 추가**: 5블록·5원칙 ↔ 케이스 슬라이드

**라이트 개발자 테마 (v3 색상)**:
| 토큰 | 기존 (v2 다크) | 신규 (v3 라이트) |
|------|--------------|----------------|
| `bg` | 다크 네이비 `#0B1220` | **순수 화이트 `#FFFFFF`** |
| `panel` | `#111B2E` | `#F8FAFC` (slate-50) |
| `panel2` | `#1E2A44` | `#F1F5F9` (slate-100) |
| `cyan` (Primary) | `#22D3EE` 시안 | **`#4F46E5` 인디고-600** |
| `amber` (Secondary) | `#FBBF24` 앰버 | **`#EC4899` 핑크-500** |
| `white` (본문 텍스트) | `#F1F5F9` | `#0F172A` (slate-900) |
| `light` (보조) | `#CBD5E1` | `#1E293B` (slate-800) |
| `mid` | `#94A3B8` | `#475569` (slate-600) |
| `muted` | `#64748B` | `#64748B` (slate-500) |
| `green` / `red` | 그대로 | `#059669` / `#DC2626`로 좀 더 진하게 |

신규 토큰 `border` (`#E2E8F0` slate-200) 추가 — addCard·addCodePanel의 보더에 사용 (구 `#1E2A44` 하드코딩 5건 모두 교체).

검증:
- `node generate-pptx.js` 정상 실행
- 출력 파일: `seminar-claude-code.pptx` (734KB, 23슬라이드)
- 슬라이드 아웃라인(`slide-outline.md`)도 v3 헤더·구성표·시간배분·매핑표 모두 동기화

---

## 2026-05-06: 변경 정합성 체인 규칙 추가

워크트리 병합 시 PPTX 산출물이 git에 없는 점을 확인 후 `python3 presentation/scripts/generate_pptx.py`로 재생성 (525KB, 25슬라이드). 이후 사용자 요청:

> "앞으로 새로운 데이터를 수집하거나 그로인해 상황이 변경되거나 그로인해 전략을 수정하거나 그로인해 전략보고서가 수정되거나하는 모든 변경에 대해 지속적으로 정합성을 맞춰야하고 최종적으로는 pptx 생성까지 해서 깃에 푸쉬하도록 규칙을 추가해줘."

작업 결과 (`CLAUDE.md` 갱신):

- **PowerPoint 제작 섹션 보강**: 실제 빌드 명령(`python3 presentation/scripts/generate_pptx.py`), 산출물 경로(`presentation/samsung-memory-scenario-planning.pptx`, 25매), 의존성(python-pptx · matplotlib · numpy), `.gitignore` 정책 명시
- **신설 섹션 "변경 정합성 체인 (Continuous Consistency)"**:
  - data → analysis → strategy → report → slide-outline → generate_pptx.py → PPTX → commit + push 흐름 다이어그램
  - 변경 단계별 필수 갱신 매핑 표 (6행)
  - 마무리 4단계: PPTX 재생성 → 빌드 검증 → commit → push origin main
  - 자동화 원칙: 한 번 지시로 영향 범위 끝까지 추적, 영향 없는 단계는 건너뛰되 이유 명시, push 전 빌드 검증 필수
  - **사전 승인 범위**: 본 체인 흐름의 commit + push만 사전 승인. force push·branch 삭제·history rewrite 등은 매번 별도 확인
- **파일 관리 섹션 갱신**: "git commit" → "git commit + 마무리 단계에서 push (자세한 흐름은 변경 정합성 체인 참조)"

이로써 향후 데이터·분석·전략·보고서 어느 단계 변경이든 한 번의 지시로 PPTX 재빌드 + git push까지 자동 진행되는 워크플로우가 보장된다.

---

## 2026-05-06: 변경 정합성 체인에 대시보드 + Vercel 배포 추가

요청: "@dashboard 업데이트하는 것도 추가해줘. vercel에 배포하는 것 까지!"

작업 결과 (`CLAUDE.md` 추가 갱신):

- **프로젝트 정보 갱신**: 최종 산출물에 "EWI 모니터링 대시보드(React + Vercel)" 추가
- **신설 섹션 "EWI 대시보드 (`dashboard/`)"**:
  - 단일 소스 → 동기화 대상 매핑 표 (4행):
    - `analysis/scenarios/scenario-{A..E}.md` + `scenario-matrix.md` → `dashboard/src/data/indicators.js`의 `SCENARIOS`
    - `analysis/driving-forces/key-drivers.md` → `INITIAL_QUADRANT_POSITIONS`
    - `analysis/scenarios/strategy.md` (9개 즉시 결정) → `dashboard/src/components/DecisionTracker.jsx`의 `DECISIONS`
    - `data/market/`, `data/macro/` 시계열 → `dashboard/data/*.json` (auto-update API가 채움)
  - 로컬 빌드 검증: `cd dashboard && npm run build`
  - 배포: GitHub `origin/main` push → **Vercel ↔ GitHub git integration**으로 자동 배포 (별도 CLI 호출 불필요)
  - vercel.json 설명: 서버리스 함수 `api/*.js` + 매일 0시 cron `/api/auto-update/all`
- **변경 정합성 체인 다이어그램 확장**: "두 갈래" 구조로 — ① 발표자료 갈래(slide-outline → PPTX) + ② 대시보드 갈래(indicators.js + DecisionTracker → npm run build → push 후 Vercel 자동 배포). 두 갈래가 하나의 git push로 합쳐짐
- **변경 단계별 갱신 표 확장**: 각 분석 단계가 발표자료 + 대시보드 양쪽에 어떻게 영향을 주는지 명시. dashboard 파일 변경 시 `npm run build` 빌드 검증 필수도 추가
- **마무리 단계 5단계로 확장**: ① PPTX 재생성 → ② 대시보드 빌드 검증 → ③ git commit → ④ **`git push origin main`** → ⑤ Vercel 자동 배포 결과 확인
- **자동화 원칙**: "두 갈래 모두" 영향 추적 + 영향 없는 갈래는 명시적으로 건너뛰기 + 양쪽 빌드 검증 후 push
- **사전 승인 범위 명확화**: commit + push + push 트리거된 Vercel 배포까지. force push, branch 삭제, history rewrite, **Vercel 환경변수 변경**은 매번 별도 확인

이로써 데이터 → 분석 → 전략 → 보고서 변경이 발생하면 발표자료(PPTX)와 대시보드(Vercel 프로덕션) 양쪽이 한 번의 지시로 동기화되는 통합 워크플로우 완성.

---

## 2026-05-06: 세미나에 자동화 워크플로우 2슬라이드 추가 (v3.1)

요청: "마지막 이 자동화 워크플로우 부분까지 @working-style/seminar-claude-code-report에 추가해줘. 이런 자동화는 소중하니까."

작업 결과:
- **슬라이드 수**: 23 → **25**
- **신설 슬라이드 23** (`▍ CASE STUDY  04 · CONSISTENCY`): 변경 정합성 체인 — 두 갈래 다이어그램 (PPTX 갈래 + 대시보드 갈래 → git push → GitHub + Vercel 자동 배포). 코드 패널에 ASCII 트리로 풀 체인 표시
- **신설 슬라이드 24** (`▍ CASE STUDY  04 · RULE`): 자동화 보존 — CLAUDE.md 규칙으로 박제. 좌측에 CLAUDE.md "변경 정합성 체인" 섹션 발췌 + 마무리 5단계 + 사전 승인 범위. 우측에 효과 4가지 (다음 세션도 같은 흐름 / 사전 승인된 commit + push / 양쪽 갈래 빌드 검증 / destructive 작업은 매번 확인)
- **closing 재번호**: 슬라이드 23 → 25
- **시간 배분 갱신**: 이론 25 + 실전 25 + Q&A 7 (총 60분 유지)
- **표지 터미널 라인**: `$ harness --tracks=00,04 --slides=23` → `--slides=25`
- **page counter**: `/ 23` → `/ 25` (모든 chrome 적용)
- **AGENDA 카드**: 트랙 04 메타 "10매 · 약 25분 · 슬라이드 13~22" → "12매 · 약 28분 · 슬라이드 13~24", Q "1매 · 약 10분 · 슬라이드 23" → "1매 · 약 7분 · 슬라이드 25"
- **slide-outline.md 동기화**: 헤더(v3.1), 구성표, AGENDA, 신설 슬라이드 2매 outline, 시간 배분, 매핑 표(슬라이드 23·24가 Context Engineering + Loop Control + Idempotent + Audit + Human-in-the-loop + Composable의 메타 실현 사례임 명시), 변경 이력

검증:
- `node generate-pptx.js` 정상 실행
- 출력 파일: `seminar-claude-code.pptx` (788KB, 25슬라이드)
- 자동화 워크플로우는 트랙 04의 9개 케이스 슬라이드(13~22) 다음, 그리고 closing 직전에 자연스럽게 위치 — "구체적 케이스 9개 → 메타 패턴 2개" 흐름

---

## 2026-05-06: NAND 공정 전환 주기 연장 R&D 전략 추가 (RS7) — 변경 정합성 체인 첫 적용

요청: "전략에 NAND Flash 제조 공정 전환이 너무 잦은 경우 비용이 많이 들기 때문에 공정 전환 주기를 최대한 늘리기 위한 기술 연구 관련된 전략을 추가해주고 관련 데이터를 수집하여 이 전략의 필요성에 대한 근거 로직을 만들어줘. 그리고 업데이트 된 내용을 기반으로 dashboard 최종 업데이트 해줘."

CLAUDE.md "변경 정합성 체인" 규칙의 첫 적용 사례. 사슬 전체를 한 지시로 흘림.

**(1) 데이터 수집** — `data/technology/nand-process-transition.md` 신규 (TrendForce·Tom's Hardware·Yole·Knowmade·Weber/PSU 학습곡선·SemiEngineering·BlocksAndFiles 등 8개 출처):
- 4사 layer 로드맵: Samsung V9 286L → V10 430L (2026 H2, BV NAND hybrid bonding) → V11 (2027) → 1000L (2030); SK V8 321L (2025) → V10 hybrid bonding (2027); Micron 232→276→500L; Kioxia BiCS8→9 (CBA 2023~)
- 2026 NAND capex \$22.2B (+5%) — capa 확장보다 process upgrade에 집중 (TrendForce 2025-11)
- 학습곡선 경제학: ramp 6개월 단축 = 누적 이익 2배, 6개월 지연 = 이익 2/3 소실, 1년 지연 = 손실 전환 (Weber/PSU)
- 주기 연장 4기술: ① Hybrid bonding/CBA(W2W) — 열적 분리 + 병렬 wafer + bit 밀도 1.6배 / ② Multi-deck stacking 정교화 / ③ CMOS-on-Array(COA) read 성능 / ④ TLC→QLC→PLC bit-per-cell 확장 / ⑤ FDP·SCADA 호스트 협력 firmware
- **YMTC가 hybrid bonding 핵심 IP 지배** (TrendForce 2025-05, Knowmade) — Samsung·SK 라이선스 의존 → 디커플링 시 차단 리스크 → 자체 IP 확보 = 국가 안보 R&D

**(2) 분석 갱신** — `analysis/steep/technology.md`:
- 7b 신규 요인 추가: "NAND 공정 전환 비용 부담 + 주기 연장 R&D 가치"
- 카테고리 소결에 RS7 의제로 부상 명시

**(3) 전략 갱신** — `analysis/scenarios/strategy.md`:
- **RS7 신규 추가** (Robust 매트릭스에 RS7 행 추가, 전 시나리오에서 ✅)
- 4 R&D 트랙: ① Hybrid Bonding 자체 IP (V11에 70%+, 패키징 R&D 1.5조 원 추가) / ② Multi-deck 정교화 (V9→V10 fab 재구성 비용 30% 절감) / ③ bit-per-cell 확장 (QLC 30%+/2026, PLC 시제품/2028) / ④ FDP·SCADA 호스트 협력 firmware (RS3 SW 매출과 R&D 자원 공유)
- 4 KPI: Hybrid bonding 자체 IP 비율 / 공정 전환 ramp 시간 / NAND capex/bit growth / YMTC 라이선스 의존도
- 재무 효과: 전환 주기 18→24M 연장 시 3년 누적 capex 회피 1.5~2조 원
- TSMC "Nx · Nx+ · Nx++" enhancement 패턴을 메모리에 적용 (V10 → V10+ → V10++ 점진 개선)

**(4) 보고서 갱신** — `report/scenario-planning-report.md`:
- Executive Summary에 RS7 신규 추가 항목 + 7개 Robust 전략으로 갱신
- 6.3 Robust 표에 RS7 행 추가
- 6.4 포트폴리오 매트릭스에 RS7 행 추가

**(5) 발표자료 갱신** — `presentation/slide-outline.md` + `presentation/scripts/generate_pptx.py`:
- 25 → **26슬라이드**, 슬라이드 22 RS7 신규 (Why now 3가지 증거 + 4 R&D 트랙 + 재무 효과·KPI)
- 슬라이드 17 (Robust overview) — 6개 → 7개 RS, 4-col layout, 매트릭스 7행
- 기존 슬라이드 22~25 → 23~26으로 시프트 (build_slide 함수 + footer 페이지 번호 + 26/26 갱신)
- TOTAL = 25 → 26
- `python3 presentation/scripts/generate_pptx.py` 정상 빌드 — 529KB 26슬라이드

**(6) 대시보드 갱신** — `dashboard/src/components/DecisionTracker.jsx` + `dashboard/src/data/indicators.js`:
- D10 신규: "NAND 공정 전환 주기 연장 R&D 4트랙 착수 (RS7 신규)" — TSMC enhancement 패턴 벤치마크
- EWI 신규 4개: ① `nand_layer_cycle_months` (목표 24M+) / ② `hybrid_bonding_own_ip_share` (자체 IP 70%+ 목표) / ③ `nand_yield_ramp_time_months` (12M 이내 yield 90%) / ④ `nand_capex_per_bit_growth` (마이너스 추세 목표)
- `cd dashboard && npm run build` 정상 빌드 — `dist/` 생성, 콘솔 오류 없음

**(7) Git** — 본 메시지 작성 직후 commit + push origin main → Vercel 자동 배포 (대시보드 프로덕션)

**메타**: 본 작업은 CLAUDE.md "변경 정합성 체인" 규칙의 첫 실행 사례. 한 번의 사용자 지시로 데이터 수집 → 분석 → 전략 → 보고서 → 발표자료 → 대시보드 → 빌드 검증 → git push까지 한 사슬로 흘렸다. 두 갈래(① PPTX, ② 대시보드+Vercel)가 모두 빌드 통과 후 push.

---

## 2026-05-06: PPTX 미화 — Gamma 폐기 + Figma 하이브리드 도입

피드백: "gamma는 별로인 것 같아 앞으로 쓰지말자". → 메모리에 `feedback_no_gamma.md` 저장 (PPTX 미화에 Gamma MCP 사용 금지).

요청: "presentation/samsung-memory-scenario-planning.pptx를 더 시각적으로 풍성하게 만들기 위해 Figma를 활용해보고 (origin-name)-figma.pptx로 저장해줘".

**작업 결과**:

1. **Figma 디자인 파일 생성**: https://www.figma.com/design/rgllvhasHUQcLRRxBo7UOq — 1920×1080 hero 슬라이드 10매 (Cover, Executive Summary, Current State, Cycle History, Scenario Matrix, Main Bet, Robust 7, RS7 NAND, EWI Dashboard, Closing). Plugin API(`use_figma`)로 디자인 시스템(딥 네이비 + 앰버 + Samsung Blue) 적용.

2. **Figma Starter 플랜 rate limit 문제**:
   - `get_screenshot` 3회 + `use_figma` 다회 호출 후 limit 도달
   - 슬라이드 1~3만 PNG 추출 성공 (`presentation/assets/figma/slide-01..03.png`)
   - 슬라이드 4~10은 export 차단

3. **하이브리드 빌드 — `generate_pptx_figma.py` 신규 작성**:
   - 슬라이드 1~3: Figma PNG full-bleed 배경 (실제 Figma 렌더링)
   - 슬라이드 4~10: python-pptx 네이티브로 동일 디자인 시스템 매칭 (NAVY=#0A1B5C, AMBER=#F5A623, GREEN/RED/PURPLE 동일 팔레트, Arial Black 타이포)
   - Cycle History (다운턴 5번 음영 + 사이클 라인 + 현재 점), Scenario Matrix (2×2 quadrant + 5 시나리오 + E 와일드카드), Main Bet (Big "B" + 5 이니셔티브), Robust 7 (4×2 grid + RS7 NEW), RS7 NAND (3 evidence + 4 R&D 트랙), EWI Dashboard (KPI 6 + 사분면 궤적 + decisions 진척), Closing (Decision Request)

4. **검증**: `python3 presentation/scripts/generate_pptx_figma.py` 정상 실행 → `presentation/samsung-memory-scenario-planning-figma.pptx` (175KB, 10슬라이드)

5. **저장된 자산**:
   - `presentation/scripts/generate_pptx_figma.py` (신규 빌드 스크립트)
   - `presentation/assets/figma/slide-{01,02,03}.png` (Figma 원본 export, 1024×576)
   - `presentation/samsung-memory-scenario-planning-figma.pptx`

**한계**: Figma Starter 플랜의 MCP 호출 한도로 슬라이드 4~10은 Figma 직접 export 불가 — python-pptx 네이티브로 디자인 시스템만 매칭. 한도 reset 후 재시도하면 모든 10매를 Figma 렌더링으로 통일 가능.
