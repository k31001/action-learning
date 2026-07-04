# 개발실 체질 전환 발표 기획서 — 3장 · Apple HIG · 컴팩트

**빌드 원천**: [dev-org-transformation-report.md](../report/dev-org-transformation-report.md) (← wiki [dev-org-transformation.md](../../wiki/strategies/dev-org-transformation.md), [lta-to-sca-transition.md](../../wiki/concepts/lta-to-sca-transition.md))
**생성 스크립트**: `scripts/generate_dev_transformation_pptx.py` → `dev-org-transformation.pptx` (3장, 16:9)
**디자인**: **Apple HIG(Human Interface Guidelines)** — systemBlue #007AFF · systemOrange #FF9500 · systemRed #FF3B30 · systemGreen #34C759 · primary label #1D1D1F · secondaryLabel #6E6E73 · opaqueSeparator #C6C6C8 · 레이어드 배경(#F2F2F7 / #FFFFFF) · SF Pro Display + Apple SD Gothic Neo · 둥근 카드. 팔레트 토큰은 `generate_apple_hig_pptx.py`와 동일 계열.
**설계 원칙**: 6장 → **3장 축약**. 함축적 카피 + 소형 폰트(본문 8~9pt, 헤더 21pt) + 조밀한 둥근 카드 레이아웃.

## 발표 논리 (3단 구성)

WHY(왜 지금인가) → WHAT(무엇이 되어야 하나) → HOW(무엇부터 하나)

---

### 슬라이드 1 — WHY · 왜 지금, LTA가 SCA가 되었다
- 북극성 명제 배너 (신문섭): "고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다"
- 좌: 계약 3단 진화 (Spot → LTA+선급금 → SCA) + 단계별 요구 역량 이동
- 우: Micron–Anthropic SCA 4요소 (다년 공급=LTA / 공동 최적화·운영 통합·자본 연계=SCA 신규) + 키넘버 16건·$100B·$22B
- SO WHAT: 고객이 사는 것은 칩이 아니라 "함께 최적화하는 파트너"

### 슬라이드 2 — WHAT · 수주 이행자에서 기술 파트너로
- 좌: As-Is → To-Be 압축 5행 (요구사항/제안/고객 접점/모델링 범위/성공 지표)
- 우상: Palantir FDE 벤치마크 — 고객사 상주(=Co-Design Pod), Anthropic·OpenAI 채택, 4개 원리 매핑 + 메모리 변형(FDE+시스템 모델링)
- 우하: 리스크 4 ↔ 이점 4 압축 대비
- SO WHAT: 리스크는 비가역·이점은 복리, "아키텍처 안으로"는 검증된 조직 형태(FDE)

### 슬라이드 3 — HOW · 4대 축과 3-Phase 실행
- 4대 축 카드: 기술 / 문화 / 조직(Co-Design Pod=FDE + 아키텍트·모델링) / 일하는 방식
- 3-Phase 로드맵: 90일(증명) → 1년(제도화·★SCA 계약 1건) → 3년(표준화)
- KPI 5개: 선제 제안 12→40 / 채택률 20→35% / 고객 교류 10→25% / 커스텀 매출 30%+ / 시스템 모델 랙→DC
- NEXT STEP: 90일 증명 → 1년 SCA 계약 1건으로 제도화 근거

---

## Apple HIG 테마 재현 방법 (참고)
- 본 스크립트는 `generate_pptx.py`의 helper(add_text/add_rect/add_footer 등)를 재사용하되, 모듈 전역 `THEME` 딕셔너리를 Apple HIG 값으로 in-place 치환(`G.THEME.update(APPLE)`)해 helper 내부 색까지 Apple화한다. 폰트는 한글 Apple SD Gothic Neo + 숫자/영문 SF Pro Display.
- 시나리오 플래닝 30장 덱의 Apple HIG 변형은 별도 소스-치환 래퍼 `generate_apple_hig_pptx.py` 참조(동일 토큰 매핑).
