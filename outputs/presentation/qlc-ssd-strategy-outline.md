# QLC eSSD 전략 — 발표 3장 기획서 (배경 / 요구사항·역량·기술 전략 / 실행 전략)

- **원본**: [outputs/report/qlc-ssd-strategy-report.md](../report/qlc-ssd-strategy-report.md) (본문 v1.0, 말미 PPT 압축 맵 기준)
- **위치**: 「삼성 SSD 전략적 방향성」 덱의 자매편. 호스트 협력 데이터 배치 전략에 이르는 논리적 흐름을 QLC 시장에서 세운다. 배치 표준 명칭(FDP)은 각주 외 본문에서 자제하고 "호스트 협력 데이터 배치"·"배치 표준"으로 쓴다(사용자 결정 2026-09-17).
- **디자인 시스템**: `ssd-strategy.pptx` 승계 (20×11.25in 캔버스, Arial 단일 폰트, Samsung Blue `#1428A0` 단일 액센트 + 잉크 `#1A1A1A` + 그레이 `#555555`/`#D9D9D9`, 틴트 카드 `#F4F6FC`, 직각 사각형, 다크 블루 정리 밴드, 헤더 = 조직명·문서등급·킥커·33pt 액션 타이틀·21pt 리드·헤어라인, 푸터 = 출처·페이지). 컨설팅 덱 문법(액션 타이틀·리드인·스티커·출처 줄)을 결합.
- **Deck Read**: 과제·액션러닝 SSD 전략 보고의 자매 3장 / 사업부 경영진 / 3장·10분 / 결론 우선. 다이얼 `DATA_DENSITY 7 · FORMALITY 8 · VISUAL_EXPRESSION 5` (사용자: 디자인 중요, 고객사 로고 사용 허용)
- **로고**: `assets/logos/` (NVIDIA·Meta·Google·Microsoft·AWS·OpenAI·Anthropic·Micron 컬러 로고, vLLM·Linux 단색 아이콘). 공식 로고를 못 구한 VAST·DDN·WEKA·ScaleFlux·LMCache·Mooncake·FlexKV·Kioxia·Solidigm은 워드마크 칩. 대외 배포 시 각사 브랜드 가이드 로고로 교체.
- **재생성**: `.venv/bin/python outputs/presentation/scripts/generate_qlc_chart.py` (그래프) → `.venv/bin/python outputs/presentation/scripts/generate_qlc_ssd_strategy_pptx.py` → `outputs/presentation/qlc-ssd-strategy.pptx`
- **렌더 검증**: `FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx` 로 렌더 전용 사본을 만들어 `soffice --headless --convert-to pdf` → pymupdf PNG로 육안 검사(본 산출물은 Arial 유지).

## 슬라이드 구성 (v2 2026-09-17 — 시각 중심 개편: 글 최소, 그림·도형으로 논증)

피드백: "전반적으로 글이 많다. 그림으로 보완. 슬라이드 2의 Phase 1·2·3는 글이 아니라 그림으로. 슬라이드 3은 ScaleFlux 인수를 빼고 워크로드 공유·고객 시스템 안 co-design에 초점, 실행 전략이 한눈에 드러나게."

| # | 킥커 | 액션 타이틀 | 레이아웃 |
|---|---|---|---|
| 1 | QLC eSSD 전략 · 배경 | 요구는 2022년에 정의되고 물량은 2024년에 터졌으며, 다음 무대는 추론 캐시 티어입니다 | **3기 스트립**(초기·현재·향후: 구매 기준을 큰 키워드로, 배경·삼성 한 줄씩) → **이정표 타임라인**(2022-12 배치 표준 비준 · 2023-07 61TB · 2024 30EB · 2026-05 245TB · 2027 KV 75~100EB) → 통합 그래프(EB·%·$B) + 키넘버 스티커 3(10배·정체·350EB) → 결론 스트립 |
| 2 | 요구사항과 역량 · 기술 전략 | QLC가 캐시 티어에 들어가려면 디바이스에서 고객 시스템 안까지 세 단계로 올라가야 합니다 | 갭 타일 4(숫자 + 한 줄) → **Phase 1·2·3 스택 그림**: 고객 시스템 5계층(응용·추론 엔진 / KV 캐시 관리자 / I/O 라이브러리 / 커널·플랫폼 / SSD)을 세 번 그리고 우리가 닿는 층을 색으로(파랑 = 우리 코드·제품, 연파랑 = 관측·이해, 흰색 = 고객 영역). Phase 2에 트레이스 내려옴↓·정책 올라감↑ 화살표, Phase 3에 상주 사람 아이콘·메인라인 머지·공용 TCO 모델. 각 Phase 아래 산출물 한 줄. **진행 바 + 삼성 현 위치 마커** → 협업 기업 로고 5층(라벨만) |
| 3 | 실행 전략 · 고객 협업 | 고객의 워크로드를 받고 고객 시스템 안으로 들어갑니다. 조직·보상·계약이 그 길을 엽니다 | **교환 그림**: 좌 「삼성 개발실」(들고 들어가는 것 4) ↔ 우 「고객 시스템」 스택(캐시 관리자에 상주 아이콘, I/O·커널 머지, SSD 삼성 QLC). 가운데 위 화살표 "① 고객 시스템 안으로 들어간다", 아래 화살표 "② 워크로드가 온다", 중앙 계약 상자 "계약으로 고정 · 창은 2027 상반기". → 대상 로고 스트립 → **5축 타일**(전략·조직·인사·문화·재무, 두 줄) → 90일·1년·3년 핀 → 결정 요청 밴드(자회사·별도 보상 / Anthropic 조항·NVIDIA 협의 / Co-Design Pod 1호) |

- 도형 헬퍼: `stack()`(계층 스택, 상태별 색), `person()`(머리 원 + 몸통, 단색), `v_arrow()`, `logo_row(max_w)`(로고·칩 자동 축소). 화살표 몸통은 `adjustments[0]=0.78`로 두껍게 해 두 줄 텍스트를 담는다.
- v1(글 중심: 3기 카드 3줄 본문·Phase 표·5축 카드·층별 협업 표)은 git 이력에 보존.

## 수치·출처 (전부 저장소 소스, 보고서 부록 A 승계)

- S1: 4Q22 eSSD -25%·$3.79B(A-1), 배치 표준 비준 2022-12(A-2), 2024 QLC 30EB 4배(A-3), Meta 10 MB/s/TB 계층(A-4), 1U 1PB·TCO -47%(A-5), 벤더 타임라인(A-6), 2Q26 $37.59B·삼성 35.1%(A-7), 모델(3장 표), KV cache 2027 75~100EB·2030 35%(A-11), 2H27 공급 완화(A-14)
- S2: QLC 0.075~0.6 vs TLC 1~3 DWPD(A-15), RUH 2~8 vs 200+(A-18), README 언급 0(A-19), CacheLib WAF 3.22→1.03(A-16), CMX 타깃 전부 TLC(A-20), Meta CacheLib 업스트림(A-30), Micron↔Anthropic(A-25)
- S3: SK hynix AI Company $10B(A-21), Solidigm 반전(A-22), 보상 격차(A-24), Anthropic 조항 부재(A-26), DDN 라운드(A-27), Micron SCA $22B(A-25). Pliops·ScaleFlux 인수 관련 수치는 덱에서 제외(전략에서 팀 인수 제외, 2026-09-17)

## 문서등급

전 장 `[문서등급 표기]` 플레이스홀더. 고객사 실명·로고는 사용자 허용(2026-09-17)에 따라 본문에 사용하되, 대외 배포본은 보안 검토 후 교체.
