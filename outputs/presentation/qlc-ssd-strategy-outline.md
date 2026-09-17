# QLC eSSD 전략 — 발표 3장 기획서 (배경 / 요구사항·역량·기술 전략 / 실행 전략)

- **원본**: [outputs/report/qlc-ssd-strategy-report.md](../report/qlc-ssd-strategy-report.md) (본문 v1.0, 말미 PPT 압축 맵 기준)
- **위치**: 「삼성 SSD 전략적 방향성」 덱의 자매편. 호스트 협력 데이터 배치 전략에 이르는 논리적 흐름을 QLC 시장에서 세운다. 배치 표준 명칭(FDP)은 각주 외 본문에서 자제하고 "호스트 협력 데이터 배치"·"배치 표준"으로 쓴다(사용자 결정 2026-09-17).
- **디자인 시스템**: `ssd-strategy.pptx` 승계 (20×11.25in 캔버스, Arial 단일 폰트, Samsung Blue `#1428A0` 단일 액센트 + 잉크 `#1A1A1A` + 그레이 `#555555`/`#D9D9D9`, 틴트 카드 `#F4F6FC`, 직각 사각형, 다크 블루 정리 밴드, 헤더 = 조직명·문서등급·킥커·33pt 액션 타이틀·21pt 리드·헤어라인, 푸터 = 출처·페이지). 컨설팅 덱 문법(액션 타이틀·리드인·스티커·출처 줄)을 결합.
- **Deck Read**: 과제·액션러닝 SSD 전략 보고의 자매 3장 / 사업부 경영진 / 3장·10분 / 결론 우선. 다이얼 `DATA_DENSITY 7 · FORMALITY 8 · VISUAL_EXPRESSION 5` (사용자: 디자인 중요, 고객사 로고 사용 허용)
- **로고**: `assets/logos/` (NVIDIA·Meta·Google·Microsoft·AWS·OpenAI·Anthropic·Micron 컬러 로고, vLLM·Linux 단색 아이콘). 공식 로고를 못 구한 VAST·DDN·WEKA·ScaleFlux·LMCache·Mooncake·FlexKV·Kioxia·Solidigm은 워드마크 칩. 대외 배포 시 각사 브랜드 가이드 로고로 교체.
- **재생성**: `.venv/bin/python outputs/presentation/scripts/generate_qlc_chart.py` (그래프) → `.venv/bin/python outputs/presentation/scripts/generate_qlc_ssd_strategy_pptx.py` → `outputs/presentation/qlc-ssd-strategy.pptx`
- **렌더 검증**: `FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx` 로 렌더 전용 사본을 만들어 `soffice --headless --convert-to pdf` → pymupdf PNG로 육안 검사(본 산출물은 Arial 유지).

## 슬라이드 구성

| # | 킥커 | 액션 타이틀 | 레이아웃 |
|---|---|---|---|
| 1 | QLC eSSD 전략 · 배경 | 요구는 2022년에 정의되고 물량은 2024년에 터졌으며, 다음 무대는 HDD 대체가 아니라 추론 캐시 티어입니다 | 상단 3기 카드(초기 2018~23 / 현재 2024~26 / 향후 2027~30: 배경·구매 기준·삼성 위치) → 하단 좌 통합 그래프(EB·%·$B 3패널, 슬라이드 변형) + 우 스티커(키넘버 3: 비트 10배·매출 정체·2030 캐시 티어 350EB, so-what) → 결론 스트립 |
| 2 | 요구사항과 역량 · 기술 전략 | 캐시 티어는 오늘 TLC의 것이고, QLC가 들어가려면 디바이스·워크로드 최적화·고객 시스템 co-design 세 단계 역량이 필요합니다 | 상단 갭 타일 4(내구성 10~40배 · RUH 25배 · 캐시 관리자 접점 0건 · WAF 3.22→1.03 수단) → 중단 Phase 1·2·3 그리드(정의 / 필요 역량 / 삼성 현황 / 발전 역량·참여 스택) → 하단 협업 기업 5층 로고 행(플랫폼 게이트·스펙 상류·물량·활성화·실증·채널·오픈소스·인수) |
| 3 | 실행 전략 · 고객 협업 | 하던 대로는 안 됩니다: 자회사·상주 조직·업스트림 문화·수명 보증 계약·지분 참여를 한 묶음으로 실행하고, 2027년 상반기까지 접근권을 계약으로 고정합니다 | 좌 5축 카드(전략·조직·인사·문화·재무, 각 한 줄 결론 + 근거 수치) + 3티어 타임라인(90일·1년·3년) → 우 층별 협업 제안(로고 + 주는 것·받는 것 4행) + 유인 설계 3줄 → 결정 요청 밴드 |

## 수치·출처 (전부 저장소 소스, 보고서 부록 A 승계)

- S1: 4Q22 eSSD -25%·$3.79B(A-1), 배치 표준 비준 2022-12(A-2), 2024 QLC 30EB 4배(A-3), Meta 10 MB/s/TB 계층(A-4), 1U 1PB·TCO -47%(A-5), 벤더 타임라인(A-6), 2Q26 $37.59B·삼성 35.1%(A-7), 모델(3장 표), KV cache 2027 75~100EB·2030 35%(A-11), 2H27 공급 완화(A-14)
- S2: QLC 0.075~0.6 vs TLC 1~3 DWPD(A-15), RUH 2~8 vs 200+(A-18), README 언급 0(A-19), CacheLib WAF 3.22→1.03(A-16), CMX 타깃 전부 TLC(A-20), Meta CacheLib 업스트림(A-30), Micron↔Anthropic(A-25)
- S3: SK hynix AI Company $10B(A-21), Solidigm 반전(A-22), Pliops $70M/60명(A-23), 보상 격차(A-24), Anthropic 조항 부재(A-26), DDN 라운드(A-27), Tensormesh(A-28), ScaleFlux $65.9M(A-29), Micron SCA $22B(A-25)

## 문서등급

전 장 `[문서등급 표기]` 플레이스홀더. 고객사 실명·로고는 사용자 허용(2026-09-17)에 따라 본문에 사용하되, 대외 배포본은 보안 검토 후 교체.
