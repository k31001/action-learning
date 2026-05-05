# 프로젝트 가이드라인

## 프로젝트 정보
- **주제**: 삼성전자 메모리사업부 불확실성 대응 전략 (시나리오 플래닝)
- **방법론**: Shell 시나리오 플래닝
- **최종 산출물**: 전략 보고서(Markdown) + 발표자료(PowerPoint via Canva MCP)

## 필수 규칙

### 파일 관리
- 모든 사용자 지시 및 프롬프트는 `PROMPT.md`에 누적 기록
- 모든 문서는 Markdown 형식 (PowerPoint 제외)
- 데이터 수집/수정 시마다 `data/metadata.md` 업데이트 필수
- 모든 변경사항은 git commit

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
- 2차: Canva MCP (`mcp__b3b23031-*__generate-design`) 활용
- 데이터 차트: Python matplotlib/plotly로 생성 후 삽입

## 언어
- 모든 문서는 한국어 작성 (기술 용어는 영어 병기 허용)
