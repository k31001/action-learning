# DRAM/NAND Fab 통합 운영: Bonding 시대에 맞는 Common Platform 구성 (1장, 시안 3종)

- 생성기: `outputs/presentation/scripts/generate_fab_common_platform_pptx.py`
- 산출물: `outputs/presentation/fab-common-platform-options.pptx` (3장 = 시안 A·B·C, 하나를 고른다), 미리보기 `fab-common-platform-options-preview.pdf`
- 재생성: `.venv/bin/python outputs/presentation/scripts/generate_fab_common_platform_pptx.py`
- 디자인: samsung-memory-ppt-design-skill v2.2 (20 x 11.25in, B+2 팔레트, 본문 18pt 이상, em-dash 0)
- 성격: 가정 기반의 기획 장표. 위키(`wiki/`)의 근거 페이지와 연결하지 않았고 수치는 쓰지 않았다(차트는 방향만 보이는 개념도)

## 공통 원고

| 구획 | 내용 |
|---|---|
| 제목 | DRAM/NAND Fab 통합 운영: / Bonding 시대에 맞는 Common Platform 구성 |
| ① 공간 효율성 (Space Efficiency) | 설비 밀집도 향상, Dead Space 최소화 · 동일 모델 군집화 시너지 · 단위 면적당 생산성 극대화 |
| ② 시황 변화 대응력 (Market Agility) | DRAM/NAND 설비 전환 속도 증가 · 생산 Bottleneck 해소로 생산성 증가 · 유휴 설비 최소화, 투자 회수 기간 단축 |
| ③ 설비 통일성·선단화 (Equipment Unif.) | P-Mix 관점 투자·전환 Loss 감소 · 생산성 향상, 수율 안정화 · 강력한 구매 협상력 확보 |
| 운영 제언 | 반도체연구소 / MTC 산하 메모리 BEOL 통합조직 구성 |
| 결론 | 종합 반도체로서 기술·생산 경쟁력에 효율·유연성과 Buying Power를 더합니다 |

## 시안별 시각 매핑

| | 시안 A 평면도형 | 시안 B 차트형 | 시안 C 건축형 |
|---|---|---|---|
| 분할 | 상 60% 효과 / 하 40% 제언 | 좌 60% 효과 / 우 40% 제언 | 지붕 · 기둥 60% / 기초 · 제언 40% |
| ① 공간 | Fab 평면도 Before → After (모델 혼재 + 사선 Dead Space → 모델별 줄 + 확보 공간) | 같은 면적 100 막대: 설비 + 추가 설비 + 작은 Dead Space | 기둥 머리: 촘촘한 격자 그림, 항목 = 벽돌 3장 |
| ② 대응력 | 시황 3국면 × (분리 / 통합) 설비 칸 격자: 분리 = 유휴(점선) + 병목(적색 테두리), 통합 = 전량 가동 | 엇갈린 DRAM·NAND 수요 누적 면적, 각 피크의 합(점선) vs 합산 피크(실선) 사이 = 유휴 ↓ | D ⇄ N 그림 |
| ③ 통일성 | 라인별 모델 아이콘 혼재 → 공용 모델 3종 겹침, 모델당 발주 물량 막대 | 슬로프: 설비 모델 수 ↓ · 모델당 구매 물량 ↑ | 같은 모델 3대 겹침 그림 |
| 운영 제언 | DRAM · NAND Fab BEOL 두 줄이 합쳐져 통합조직, 오른쪽으로 세 역할(효과 ①②③ 대응) | 조직도: 반도체연구소 · MTC → 통합조직(좌우에서 DRAM · NAND BEOL 편입) → 기능 3개 | 두 조직을 웨이퍼처럼 Bonding → 통합조직이 기초(Common Platform)를 받쳐 운영 |
| 결론 | Blue 밴드 | Blue 밴드 | 지붕 |

## 표현상 주의

- 운영 제언의 세 기능(공용 Layout 표준 · 설비 Pool 통합 운영 · 설비 표준·통합 구매)은 효과 ①②③과 짝을 맞춘 제안 문구다. 필요 없으면 생성기 `ROLES`에서 지운다
- 정량 효과가 확정되면 시안 B 차트에 축 수치를 넣고 출처 줄의 `[사내 확인]`을 실제 출처로 바꾼다
