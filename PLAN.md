# 삼성전자 메모리사업부 시나리오 플래닝 프로젝트 계획

## 프로젝트 개요

**목적**: AI 데이터센터 수요 급증 환경에서 삼성전자 메모리사업부의 불확실성 대응 전략 수립  
**방법론**: Shell 시나리오 플래닝 (Scenario Planning)  
**최종 산출물**: 전략 보고서(Markdown) + 발표자료(PowerPoint)

---

## 디렉토리 구조

```
action-learning/
├── PROMPT.md                    # 사용자 지시 누적 기록
├── PLAN.md                      # 본 문서: 전체 계획
├── CLAUDE.md                    # 프로젝트 가이드라인 (Claude용)
├── README.md                    # 프로젝트 소개
│
├── data/                        # 원시 데이터 수집
│   ├── metadata.md              # 전체 데이터 인덱스 + 요약
│   ├── market/                  # 메모리 시장 데이터 (시장규모, 가격, 수요)
│   ├── industry/                # 산업 보고서 (Gartner, IDC, SEMI 등)
│   ├── technology/              # 기술 트렌드 (HBM, CXL, PIM, DRAM 로드맵)
│   ├── competitors/             # 경쟁사 분석 (SK하이닉스, Micron)
│   ├── macro/                   # 거시경제 지표 (GDP, 인플레이션, 금리)
│   └── policy/                  # 정책/규제 (미중 반도체 분쟁, 보조금)
│
├── analysis/                    # 분석 산출물
│   ├── steep/                   # STEEP 요소별 분석
│   │   ├── social.md
│   │   ├── technology.md
│   │   ├── environment.md
│   │   ├── economy.md
│   │   └── political.md
│   ├── driving-forces/          # Driving Forces 도출
│   │   ├── brainstorm.md        # 브레인스토밍 결과
│   │   ├── impact-uncertainty-matrix.md
│   │   └── key-drivers.md       # 핵심 Driving Forces 2~3개
│   └── scenarios/               # 시나리오 구성
│       ├── scenario-matrix.md   # 시나리오 조합 매트릭스
│       ├── scenario-A.md        # 시나리오별 상세
│       ├── scenario-B.md
│       ├── scenario-C.md
│       ├── scenario-D.md
│       └── scenario-E.md
│
├── report/                      # 최종 전략 보고서
│   ├── scenario-planning-report.md   # 메인 보고서
│   └── assets/                  # 보고서용 시각자료
│       ├── charts/              # 데이터 차트 (PNG/SVG)
│       └── diagrams/            # 다이어그램 (시나리오 매트릭스 등)
│
└── presentation/                # 발표자료
    ├── slide-outline.md         # 슬라이드별 상세 기술 (PPTX 제작 지침)
    └── assets/                  # 발표용 시각자료
```

---

## 서브에이전트 설계

### Agent 1: Research Agent (자료 조사)
**역할**: 최신 데이터 수집 및 정리  
**입력**: 리서치 주제 목록  
**출력**: `data/` 디렉토리의 마크다운 파일 + `data/metadata.md` 업데이트  
**도구**: WebSearch, WebFetch, Write  
**수행 작업**:
- 메모리 시장 규모 및 전망 데이터 수집
- HBM/DDR5/LPDDR5 기술 트렌드
- AI 서버 수요 전망 (NVIDIA, AMD, CSP 투자계획)
- 미중 반도체 규제 현황
- 경쟁사 (SK하이닉스, Micron) 전략 동향
- 거시경제 불확실성 지표

### Agent 2: STEEP Analysis Agent (환경 분석)
**역할**: STEEP 관점 브레인스토밍 및 Driving Forces 도출  
**입력**: `data/` 수집 데이터  
**출력**: `analysis/steep/*.md`, `analysis/driving-forces/*.md`  
**수행 작업**:
- 5개 STEEP 차원별 요소 30~50개 도출
- 영향력(Impact) × 불확실성(Uncertainty) 매트릭스 작성
- 핵심 Driving Forces 2~3개 선별 (사전조사 + 전문가 판단 근거 포함)

### Agent 3: Scenario Building Agent (시나리오 구성)
**역할**: 시나리오 매트릭스 구성 및 시나리오 내러티브 작성  
**입력**: `analysis/driving-forces/key-drivers.md`  
**출력**: `analysis/scenarios/scenario-matrix.md`, 각 시나리오 파일  
**수행 작업**:
- Driving Forces 2개 → 2×2 매트릭스 (4개 시나리오)
  또는 3개 → 조합에서 핵심 3~5개 선별
- 각 시나리오 내러티브 (10~15년 후 세계 묘사)
- 시나리오별 삼성전자에 대한 함의 분석

### Agent 4: Strategy Agent (전략 도출)
**역할**: 시나리오별 전략 + 강건한 전략 도출  
**입력**: 시나리오 파일들  
**출력**: `report/scenario-planning-report.md`의 전략 파트  
**수행 작업**:
- Main Bet 시나리오 선정 및 근거
- Side Bet 전략 (나머지 시나리오 대비 헤징)
- 어떤 시나리오에서도 유효한 Robust 전략 도출
- Early Warning Indicators (시나리오 전환 신호) 정의

### Agent 5: Report Agent (보고서 작성)
**역할**: 논리적으로 탄탄한 전략 보고서 작성  
**입력**: 모든 분석 결과물  
**출력**: `report/scenario-planning-report.md` (완성본)  
**수행 작업**:
- Executive Summary
- 방법론 설명
- STEEP 분석 결과
- 시나리오 전체 기술
- 전략적 권고안
- 시각자료 생성 (Mermaid 다이어그램, 표)

### Agent 6: Presentation Agent (발표자료)
**역할**: 슬라이드 구성 설계 + PowerPoint 제작  
**입력**: `report/scenario-planning-report.md`  
**출력**: `presentation/slide-outline.md` → PowerPoint 파일  
**수행 작업**:
- 슬라이드별 내용/시각자료/로직 상세 기술
- PPTX 제작 (아래 솔루션 참조)

---

## 워크플로우 (단계별)

```
Phase 1: 데이터 수집 [Research Agent]
    ↓ (병렬 실행 가능)
    ├── 시장 데이터
    ├── 기술 트렌드
    ├── 경쟁사 분석
    ├── 거시경제
    └── 정책/규제

Phase 2: STEEP 분석 [STEEP Analysis Agent]
    ↓
    브레인스토밍 → Impact/Uncertainty 매핑 → Driving Forces 2~3개 선별

Phase 3: 시나리오 구성 [Scenario Building Agent]
    ↓
    시나리오 매트릭스 → 4~5개 대안 미래 내러티브

Phase 4: 전략 도출 [Strategy Agent]
    ↓
    Main Bet + Side Bets + Robust Strategies + Early Warning Indicators

Phase 5: 보고서 작성 [Report Agent]
    ↓
    Markdown 전략 보고서 (시각자료 포함)

Phase 6: 발표자료 제작 [Presentation Agent]
    ↓
    슬라이드 기획서(Markdown) → PowerPoint
```

---

## PowerPoint 제작 솔루션 (추천)

> PROMPT.md에서 "가장 시각적으로 뛰어나고 전문적인 솔루션"을 요청했으므로 세 가지 옵션을 평가합니다.

### Option A: **Canva MCP** ⭐ 추천 (현재 연결됨)
- **장점**: 이미 MCP로 연결되어 있어 Claude가 직접 Canva에 디자인 생성 가능. 전문적인 템플릿, 고품질 시각 디자인. 실시간 편집 가능.
- **단점**: 복잡한 데이터 차트는 별도 생성 후 삽입 필요
- **사용 방법**: `slide-outline.md`를 기반으로 `generate-design` MCP 도구 호출
- **결론**: **현재 환경에서 최선의 선택**

### Option B: **python-pptx** (프로그래밍)
- **장점**: 완전한 자동화, 데이터 기반 차트 직접 생성, 반복 수정 용이
- **단점**: 디자인 품질이 Canva보다 낮음. 템플릿 적용이 제한적.
- **적합 상황**: 데이터가 많고 자동화가 중요할 때

### Option C: **Gamma.app** (AI 프레젠테이션)
- **장점**: AI가 자동으로 전문적인 레이아웃 생성
- **단점**: Claude가 직접 제어 불가 (브라우저 조작 필요)

### 최종 권장: **Canva MCP (Option A) + python-pptx 백업**
Canva로 시각적으로 뛰어난 슬라이드를 만들고, 데이터 차트는 `matplotlib`/`plotly`로 생성 후 Canva에 삽입.

---

## 슬라이드 구성 (예비 기획)

| # | 슬라이드 제목 | 내용 유형 |
|---|---|---|
| 1 | 표지 | 제목, 날짜, 부서 |
| 2 | Executive Summary | 핵심 메시지 3가지 |
| 3 | 왜 시나리오 플래닝인가? | 불확실성 환경 배경 |
| 4 | Focal Issue | 핵심 질문 정의 |
| 5-9 | STEEP 분석 | 요인별 차트 |
| 10 | Impact-Uncertainty Matrix | 2×2 매트릭스 |
| 11 | 핵심 Driving Forces | Top 2~3 요인 |
| 12 | 시나리오 매트릭스 | 2×2 또는 3축 다이어그램 |
| 13-17 | 시나리오별 내러티브 | 각 미래 묘사 |
| 18 | Main Bet 전략 | 핵심 시나리오 대응 |
| 19 | Side Bet 전략 | 헤징 전략 |
| 20 | Robust 전략 | 공통 필수 전략 |
| 21 | Early Warning Indicators | 모니터링 지표 |
| 22 | 결론 및 Next Step | 실행 계획 |

---

## 프롬프트에서 개선한 사항

1. **Canva MCP 활용**: 현재 세션에 Canva MCP가 연결되어 있어 PPTX를 직접 Canva에서 제작하는 방식을 추가 제안
2. **데이터 메타데이터 구조화**: 단순 링크 목록이 아니라 요약 + 신뢰도 + 수집일 + 태그를 포함하는 체계적인 메타데이터 구조 설계
3. **Early Warning Indicators**: 시나리오 전환 신호 지표를 전략에 포함 (원본에 없던 내용 — 실제 기업 의사결정에서 필수)
4. **병렬 실행 최적화**: Phase 1 (데이터 수집)을 병렬로 실행하여 총 소요 시간 단축
5. **시각자료 포맷 구분**: Mermaid 다이어그램(보고서용) vs 고품질 이미지(발표용)를 분리하여 관리

---

## 실행 순서 (즉시 착수 가능한 다음 단계)

1. `git init` → GitHub 저장소 연결
2. Research Agent 병렬 실행 → `data/` 채우기
3. STEEP Agent → `analysis/` 채우기  
4. Scenario Agent → 시나리오 내러티브 완성
5. Strategy Agent → 전략 도출
6. Report Agent → 보고서 완성
7. Presentation Agent → Canva로 발표자료 제작
