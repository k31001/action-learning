# 개발실 체질 전환 발표 기획서 — 3장 · IBM Carbon · 고밀도

**빌드 원천**: [dev-org-transformation-report.md](../report/dev-org-transformation-report.md) (← wiki [dev-org-transformation.md](../../wiki/strategies/dev-org-transformation.md), [lta-to-sca-transition.md](../../wiki/concepts/lta-to-sca-transition.md))
**생성 스크립트**: `scripts/generate_dev_transformation_pptx.py` → `dev-org-transformation.pptx` (3장, 16:9)
**디자인**: **IBM Carbon Design System** — Blue-60 #0f62fe(단일 액센트) · Yellow-30 #f1c21b · Red-60 #da1e28 · Green-50 #24a148 · Gray-100 #161616 · Gray-70 #525252(2차 텍스트) · Gray-20 #e0e0e0(border-subtle) · Gray-10 #f4f4f4(layer-01) · Blue-10 #edf5ff(info bg) · **각진(sharp) 카드 + 얇은 헤어라인 그리드** · IBM Plex Sans KR + IBM Plex Mono(숫자). 팔레트 토큰은 `generate_carbon_pptx.py`와 동일 계열.
**설계 원칙**: **여백 최소화 · 고밀도** — 외곽 마진 0.32in, 각진 카드, 얇은 헤어라인. Apple HIG(넓은 여백) 대비 슬라이드당 콘텐츠 밀도 ↑ (shape 60~68 → 74~85), 이전에 압축했던 As-Is/To-Be 행·전체 타임라인 복원.
**타이포그래피 스케일** (점진적 위계, 2단계 상향): 타이틀 23 · 섹션 14 · 카드/행 제목 13 · 본문 12 · 보조 11 · 캡션·태그 10 · 키넘버(mono) 22 · 데이터 값 13.5. 슬라이드당 6~8단계 크기가 함께 쓰여 위계가 살아나고, 커진 폰트에 맞춰 카드·행 높이/간격을 키워 콘텐츠가 슬라이드를 꽉 채운다(빈 공간 최소화).

> 폰트 주의: IBM Plex Sans KR / IBM Plex Mono 미설치 환경에선 PowerPoint 대체 폰트로 렌더되나, Carbon의 밀도는 레이아웃(각진 카드·촘촘한 마진)이 좌우하므로 유지됨.

## 발표 논리 (3단 구성)

WHY(왜 지금인가) → WHAT(무엇이 되어야 하나) → HOW(무엇부터 하나)

---

### 슬라이드 1 — WHY · 왜 지금, LTA가 SCA가 되었다
- 북극성 명제 배너 (신문섭): "고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다"
- 좌: 계약 3단 진화 (Spot → LTA+선급금 → SCA) + 단계별 요구 역량 이동
- 우: Micron–Anthropic SCA 4요소 (다년 공급=LTA / 공동 최적화·운영 통합·자본 연계=SCA 신규) + 키넘버 16건·$100B·$22B
- SO WHAT: 고객이 사는 것은 칩이 아니라 "함께 최적화하는 파트너"

### 슬라이드 2 — WHAT · 수주 이행자에서 기술 파트너로
- 좌상: As-Is → To-Be 7행 (요구사항/제안/기술 방향/고객 접점/정보 흐름/**모델링 범위**/성공 지표) — 모델링 범위 행 강조
- 좌하: **모델링 범위 확대 중첩(onion) 시각화** — 메모리 디바이스 ⊂ 서버 ⊂ 랙 ⊂ 데이터센터 중첩 프레임(안→바깥으로 범위 확대), 로드맵 버전 매핑(현재/v0.1/v1.0/v2.0). 대시보드는 동일 개념을 SVG 동심 프레임으로 표현.
- 우상: Palantir FDE 벤치마크 — 고객사 상주(=Co-Design Pod), Anthropic·OpenAI 채택, 5개 원리 매핑 + 메모리 변형(FDE+시스템 모델링)
- 우하: 리스크 4 ↔ 이점 4 압축 대비
- SO WHAT: 리스크는 비가역·이점은 복리, "아키텍처 안으로"는 검증된 조직 형태(FDE)

### 슬라이드 3 — HOW · 4대 축과 3-Phase 실행
- 4대 축 카드: 기술 / 문화 / 조직(Co-Design Pod=FDE + 아키텍트·모델링) / 일하는 방식
- 3-Phase 로드맵: 90일(증명) → 1년(제도화·★SCA 계약 1건) → 3년(표준화)
- KPI 6개: 선제 제안 ~0→12→40 / 채택률 20→35% / 고객 교류 10→25% / 커스텀 매출 30%+ / 시스템 모델 디바이스→랙→DC / 아키텍트 인력 없음→조직→Pod당 1+
- NEXT STEP: 90일 증명 → 1년 SCA 계약 1건으로 제도화 근거

---

## Carbon 테마 재현 방법 (참고)
- 본 스크립트는 `generate_pptx.py`의 helper(add_text/add_rect/add_footer 등)를 재사용하되, 모듈 전역 `THEME` 딕셔너리를 Carbon 값으로 in-place 치환(`G.THEME.update(CARBON)`)해 helper 내부 색까지 Carbon화한다. 각진 카드는 기본 `add_rect`(RECTANGLE), 폰트는 한글 IBM Plex Sans KR + 숫자 IBM Plex Mono.
- 시나리오 플래닝 30장 덱의 Carbon 변형은 별도 소스-치환 래퍼 `generate_carbon_pptx.py` 참조(동일 토큰 매핑). Apple HIG 변형은 `generate_apple_hig_pptx.py`.
