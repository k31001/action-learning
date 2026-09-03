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
- 4대 축 카드: 기술 / 문화(+스타 엔지니어 호명·호명사회) / 조직(Co-Design Pod=FDE + 아키텍트·모델링 + **Distinguished Engineer 트랙**) / 일하는 방식
- 3-Phase 로드맵: 90일(증명) → 1년(제도화·★SCA 계약 1건) → 3년(표준화)
- KPI 6개: 선제 제안 ~0→12→40 / 채택률 20→35% / 고객 교류 10→25% / 커스텀 매출 30%+ / 시스템 모델 디바이스→랙→DC / 아키텍트 인력 없음→조직→Pod당 1+
- NEXT STEP: 기존 DE를 관리에서 분리해 고객 기술 리드로 + 미국 고객·영어는 실리콘밸리 스타 영입으로 (처우 급등이 적기)
- 스타 엔지니어 논거(상세는 보고서/대시보드): DE는 이미 있음 → ①기존 DE 미션 재정의(관리 분리·고객 리드), ②실리콘밸리 현역 스타 영입(미국 고객·영어 한계 보강). 근거 송길영 『호명사회』(조직→개인 이름) + 메모리 성과급 급등(삼성 ~6억·SK 상한철폐)으로 영입 협상 우위

---

## Carbon 테마 재현 방법 (참고)
- 본 스크립트는 `generate_pptx.py`의 helper(add_text/add_rect/add_footer 등)를 재사용하되, 모듈 전역 `THEME` 딕셔너리를 Carbon 값으로 in-place 치환(`G.THEME.update(CARBON)`)해 helper 내부 색까지 Carbon화한다. 각진 카드는 기본 `add_rect`(RECTANGLE), 폰트는 한글 IBM Plex Sans KR + 숫자 IBM Plex Mono.
- 시나리오 플래닝 30장 덱의 Carbon 변형은 별도 소스-치환 래퍼 `generate_carbon_pptx.py` 참조(동일 토큰 매핑). Apple HIG 변형은 `generate_apple_hig_pptx.py`.


---

## 부록: 컨설팅 스타일 통합 덱 (2026-09-02) — 고스트 덱

**생성 스크립트**: `scripts/generate_dev_transformation_consulting.cjs` → `dev-transformation-consulting.pptx` (8장, 16:9). **스킬**: `.claude/skills/consulting-deck-design-skill` (구조·문법) + `samsung-memory-ppt-design-skill` (Samsung Blue 단일 액센트). 원천: `wiki/strategies/fdp-host-ssd-platform.md` §1~§6, `dev-org-transformation.md` §4.6~4.7.

액션 타이틀만 이어 읽으면 논증이 완결된다:
1. 요약: 고객의 스토리지 통제권 상승은 불가역이다. 개발실은 FDP 표준 SSD와 시스템 소프트웨어를 묶은 플랫폼으로 부가가치를 재정의하고, 다음 니즈(KV cache)를 선행해야 한다
2. 세 흐름이 한 점에서 만난다: 물량은 Binding으로 잠기고, 규격은 고객이 정하며, 완제품 가치는 고객이 가져가려 한다
3. 2023 다운턴에서 삼성은 -54%로 서버 노출 순위 그대로 맞았고, 회복은 니즈를 적중한 Solidigm이 가져갔다
4. 다음 니즈는 KV cache다: 2028년 150~200EB 신규 NAND 수요가 열리지만, 현행 제품은 RUH 25배·내구성 2~10배 갭을 안고 있다
5. 네 가지 선택지 중 FDP 표준 + 시스템 SW 통합 플랫폼만이 부가가치 방어·펌웨어 공통화·통제권 정합·차별화 지속을 동시에 충족한다
6. 전략의 핵심은 시스템 소프트웨어다: 워크로드를 FDP 정책으로 변환하는 계층이 펌웨어 공통화와 고객별 최적화를 양립시키고 전환비용을 만든다
7. 협업 대상은 양자택일이 아니다: LLM 기업에서 스펙을 잡고, 스토리지 벤더에서 실증하고, 하이퍼스케일러에서 물량을 수확한다
8. 실행 요청: FDE 트랙을 신설해 플랫폼을 고객 아키텍처 안으로 들고 들어가고, 성과는 FDP 실제 활성화 용량으로 잰다
