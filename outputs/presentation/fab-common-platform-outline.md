# DRAM/NAND Fab 통합 운영: Bonding 시대에 맞는 Common Platform 구성 (1장, 시안 3종) v2.0

- 생성기: 그림 `outputs/presentation/scripts/generate_fab_common_platform_figs.py` → 슬라이드 `generate_fab_common_platform_pptx.py`
- 산출물: `outputs/presentation/fab-common-platform-options.pptx` (3장 = 시안 1·2·3, 하나를 고른다), 미리보기 `fab-common-platform-options-preview.pdf`
- 재생성: `.venv/bin/python outputs/presentation/scripts/generate_fab_common_platform_figs.py && .venv/bin/python outputs/presentation/scripts/generate_fab_common_platform_pptx.py`
- 디자인: samsung-memory-ppt-design-skill v2.2 (20 x 11.25in, B+2 팔레트, 본문 18pt · 그림 라벨 16pt 이상, em-dash 0)
- 성격: 가정 기반의 기획 장표. 위키(`wiki/`) 근거 체인 밖이며 수치를 쓰지 않았다(그림은 방향만 보이는 개념도)

## v2.0 변경 (사용자 피드백)

- v1.0 시안 C(건축형)의 형식과 그림 크기가 가장 좋다는 피드백 → 세 장 모두 그 형식으로 통일하고 v1.0 시안 A·B는 폐기
- "그림이 단조롭다" → 기둥 머리 그림을 5.30 x 1.80in로 키우고, 그림 하나에 Before → After와 메커니즘을 함께 담았다. 시안마다 그림 스타일만 다르다

## 공통 골격

| 층 | 내용 |
|---|---|
| 지붕(결론) | 종합 반도체 경쟁력: 기술·생산 경쟁력 + 효율·유연성 + Buying Power |
| 기둥 3개 | 머리 = 번호 · 효과 이름 · 그림, 몸통 = 항목 벽돌 3장 |
| 기초 | Bonding 패드 줄 + Common Platform (DRAM·NAND 공용 BEOL · Bonding 공정 · 설비 Pool) |
| 운영 제언 | DRAM · NAND BEOL 조직을 웨이퍼처럼 Bonding → 메모리 BEOL 통합조직(기능: 표준 Layout · 설비 Pool · 통합 구매) → 기초를 운영, 반도체연구소 / MTC 산하 |

## 시안별 기둥 그림

| 효과 | 시안 1 아이소메트릭 | 시안 2 메커니즘 | 시안 3 Fab 도면 |
|---|---|---|---|
| ① 공간 효율성 | 3D Fab 바닥: 분리(DRAM \| NAND 벽, 높이·크기 제각각인 설비, 빗금 빈 칸) → 통합(같은 모델 줄 배치, 한 줄 "확보") | 같은 면적 와플 격자: Dead Space 칸 → 추가 설비 칸, 범례 4종 | 위에서 본 Fab: 분리(OHT 루프 2개, 제각각 Footprint, 빈 Bay) → 통합(OHT 1개, 줄 배치, "확보" Bay) |
| ② 시황 변화 대응력 | 3D 공용 설비 줄(DRAM Blue · NAND 그레이, 전환 중 설비 + 회전 화살표) + 엇갈린 수요 곡선과 따라가는 설비 배분 막대 | 엇갈린 수요 누적 면적: 각 피크의 합(점선) vs 합산 피크(실선) = 유휴 ↓, 옆에 설비 전환 시간 · Bottleneck 대기 막대(분리 vs 통합) | DRAM · NAND 웨이퍼 Lot이 공용 BEOL 설비 Pool의 어느 설비로든 들어가고(교차 흐름선 · FOUP) Bonding 적층으로 이어짐 |
| ③ 설비 통일성·선단화 | 3D 모델 혼재 설비 + 발주 1단 → 같은 모델 6대 + 발주 4단 | 설비 모델 수(DRAM 전용 + NAND 전용 → 공용) ↓, 모델당 발주 물량 ↑ · 구매 협상력 | 공정 단계(Depo · Etch · CMP · Bond) x 모델 매트릭스: DRAM 2 + NAND 2 → 공용 1, 레시피 공유 · 부품 공용 · 물량 집중 · 협상력 ↑ (모델 코드는 예시) |

## 표현상 주의

- 통합조직의 세 기능(표준 Layout · 설비 Pool · 통합 구매)은 효과 ①②③과 짝을 맞춘 제안 문구다. 필요 없으면 `org_row()`에서 지운다
- 정량 효과가 확정되면 시안 2 그림에 수치를 넣고 출처 줄의 `[사내 확인]`을 실제 출처로 바꾼다
