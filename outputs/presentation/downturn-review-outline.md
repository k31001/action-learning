# 메모리 다운턴 복기 덱 (6장) 기획서 — downturn-review.pptx

> 지난 20년(2006-2025) 메모리 다운턴 5건의 원인·양상·지속기간·기업 대응·성공과 실패를 복기하는 덱.
> **요약 1장에 전체가 들어가고, 다운턴별 1장씩 5장이 보충자료(Appendix)** 구조.

- **Deck Read**: 과제·액션러닝 보고, 청중은 메모리사업부 과제팀·경영진, 요약 1장 + 백업 5장, 결론 우선 스코어카드 언어
- **다이얼**: DATA_DENSITY 7 / FORMALITY 7 / VISUAL_EXPRESSION 3
- **디자인 시스템**: ssd-strategy.pptx / storyline-overview.pptx 승계 (20x11.25in, Arial, Samsung Blue #1428A0 단일 액센트, 화이트 배경, 틴트/아웃라인 카드, 다크 블루 정리 밴드)
- **콘텐츠 단일 소스**: [wiki/downturn/downturn-history.md](../../wiki/downturn/downturn-history.md) + [sources/raw-notes/memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md)
- **문서등급**: `[문서등급 표기]` 플레이스홀더 — 배포 전 실제 등급 기입 필요

## 슬라이드 구성

| # | 슬라이드 | 핵심 시각요소 |
|---|---|---|
| 01 | **요약 (한 장 전체)** — "지난 20년 다운턴 5건: 공급발은 길었고, 수요발은 짧지만 갈수록 빠르고 깊어졌다" | ① DRAM 산업 연매출 2006-2025 타임라인 + 다운턴 5개 창 음영(assets/downturn_timeline.png) ② 지속기간 x 최악분기 낙폭 산점도, 버블=연매출 낙폭·색=수요발(블루)/공급발(그레이)/복합(assets/downturn_scatter.png) ③ 5행 비교 표(발원·원인·규모·대응·결과) ④ 인사이트 밴드 3종 |
| 02 | Appendix A · **DT08** (2007-2009) 공급발+수요충격 | KPI 4타일 + 창 확대 미니 차트 + 현장 수치 + 원인/대응(승자·패자)/결과·교훈 카드 |
| 03 | Appendix B · **DT12** (2010-2012) 공급발·침식형 | 동일 패밀리 |
| 04 | Appendix C · **DT16** (2015-2016) 수요발·침식형 | 동일 패밀리 |
| 05 | Appendix D · **DT19** (2018-2019) 수요발·급락형 | 동일 패밀리 |
| 06 | Appendix E · **DT23** (2022-2023) 수요발·침식→급락 | 동일 패밀리 |

## 산점도 데이터 (요약 슬라이드 우상단)

| | 지속(분기)ᵉ | 최악 분기 QoQ | 연매출 낙폭(버블) | 발원(색) |
|---|---|---|---|---|
| DT08 | 9 | -36% (4Q08) | -34%ᵉ | 복합(그레이+블루 테두리) |
| DT12 | 9 | -20% (4Q10) | -33%ᵉ | 공급발(그레이) |
| DT16 | 6 | -9.1% (4Q15) | -11%ᵉ | 수요발(블루) |
| DT19 | 5 | -18.3% (4Q18) | -37.6% | 수요발(블루) |
| DT23 | 6 | -32.5% (4Q22) | -45%ᵉ | 수요발(블루) |

## 재생성

```bash
.venv/bin/python outputs/presentation/scripts/generate_downturn_assets.py       # 차트 PNG 7종
.venv/bin/python outputs/presentation/scripts/generate_downturn_review_pptx.py  # 덱 본체
```
