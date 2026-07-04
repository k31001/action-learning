# 개발실 체질 전환 발표 기획서 — 5장

**빌드 원천**: [dev-org-transformation-report.md](../report/dev-org-transformation-report.md) (← wiki [dev-org-transformation.md](../../wiki/strategies/dev-org-transformation.md), [lta-to-sca-transition.md](../../wiki/concepts/lta-to-sca-transition.md))
**생성 스크립트**: `scripts/generate_dev_transformation_pptx.py` → `dev-org-transformation.pptx` (5장, 16:9)
**디자인**: 기존 `generate_pptx.py` THEME 재사용 (samsung_blue #1428A0, amber #D97706, 맑은 고딕)

## 발표 논리 (5단 구성)

사건(무슨 일이 있었나) → 해부(무엇이 달라졌나) → 역할(우리는 무엇이 되어야 하나) → 득실(안 하면/하면) → 실행(무엇부터 하나)

---

### 슬라이드 1 — 표지 + 사건: "LTA가 SCA가 되었다"
- 제목: 개발실 체질 전환 — 수주 이행자에서 기술 파트너로
- 부제: Micron–Anthropic 전략적 계약(2026-06-22)이 보여준 산업의 다음 단계
- 하단 타임라인 5개 마커: 커스텀 HBM 인증(25-06) → Stargate LOI(25-10) → 선급금 체제화(25~26) → Series H 3사 참여(26-05) → **Micron–Anthropic SCA(26-06)**
- 키 넘버: SCA 16건 · $100B · 예치금 $22B

### 슬라이드 2 — 해부: SCA는 LTA에 무엇을 더했나
- 좌: 계약 3단 진화 (Spot → LTA+선급금 → SCA) + 단계별 요구 역량
- 우: Micron–Anthropic 4대 구성요소 체크표 (다년 공급 ✅✅ / 공동 최적화 ─✅ / 운영 통합 ─✅ / 자본 연계 ─✅)
- SO WHAT: 고객이 사는 것은 칩이 아니라 "워크로드를 이해하고 함께 최적화하는 파트너"

### 슬라이드 3 — 역할: 개발실 As-Is vs To-Be
- 8행 비교표 (요구사항/제안/기술 방향/성공 지표/고객 접점/정보 흐름/가치 단위/**모델링 범위**)
- 모델링 범위: 메모리 디바이스 단품(데이터시트) → 랙·데이터센터 전체 시스템 모델(성능·전력 정량 예측)
- 하단: 왜 As-Is로는 안 되는가 — 스펙 확정 "전" 단계(공동설계가 일어나는 곳)에 개입 불가

### 슬라이드 4 — 득실: 전환하지 않으면 vs 전환하면
- 좌(적색): R1 SCA 수주 배제 / R2 커스텀 전환기 고착 / R3 2nd source화 / R4 기술 선점 실패
- 우(청색): B1 지속 매출(락인+선급금) / B2 수익률 프리미엄 / B3 미래 기술 선점(IDM 통합 카드) / B4 자본 연계 옵션
- SO WHAT: 리스크는 비가역, 이점은 복리 — 조기 전환의 기대값이 압도적

### 슬라이드 5 — 실행: 4대 축 + 3-Phase 액션 플랜
- 상단 4축 카드: 기술(워크로드 랩 + 시스템 성능·파워 모델, 디바이스→랙·DC 확장) / 문화(가설 제안 보상) / 조직(Co-Design Pod + 시스템 아키텍트·모델링 조직 신설) / 방식(로드맵 교차 리뷰·PoA)
- 하단 로드맵: 90일(증명: Pod 1호·선제 제안 1호·시스템 모델 v0.1) → 1년(제도화: Pod 3~5·아키텍트 조직·모델 v1.0 랙·SCA 계약 1건) → 3년(표준화: 플랫폼·모델 v2.0 DC·IR 공시)
- KPI 5개: 선제 제안 12→40건 / 채택률 20→35% / 고객 교류 시간 10→25% / 커스텀 매출 30%+ / 시스템 모델 랙→DC
