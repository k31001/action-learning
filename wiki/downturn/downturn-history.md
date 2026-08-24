---
type: analysis
last_reviewed: 2026-08-22
sources: [sources/raw-notes/memory-downturn-history-research-2026-08-22.md, sources/raw-notes/nand-market-history-research-2026-08-22.md, sources/raw-notes/nand-quarterly-addendum-2026-08-24.md, sources/articles/dram-chicken-game-history-2026-08-05.md, sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md, sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md, sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md, sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md]
---

# 지난 20년 메모리 다운턴 복기 (2006~2025) — 본편 4건 + 경계 1건의 원인·양상·지속·대응·결과

> **한 줄 요약**: 20년간 전체 메모리(D+N) 기준 다운턴은 **4번** 왔다 — 공급발 2번(치킨게임 — 길고 깊다), 수요발 2번(짧지만 갈수록 빠르다). 2015~16 조정(DT16)은 DRAM 단독·전체 +2%ᵉ로 다운턴 성립이 애매한 **경계 사례**로 재분류한다(복기 덱 본편 제외). 6강→3강 과점화는 다운턴의 **기간**을 절반으로 줄였지만 **깊이**는 막지 못했고(DT23 전체 메모리 낙폭 -45% 최심·분기 속도 사상 최속), NAND는 침투기(DT12·DT16)에는 완충재였지만 성숙기(DT19~)부터 DRAM과 완전 동조화됐다. 승부는 다운턴 그 자체가 아니라 **다운턴 중에 심은 것**(세대 전환 완주·역사이클 투자·저점 M&A — 또는 HBM팀 축소)이 다음 사이클에서 갈랐다.

이 페이지는 [SP-2 다운턴 트랙](README.md)의 **역사 기준선**이다. [key-drivers.md](key-drivers.md)의 사분면 검증(§4)이 "네 사분면 모두 실례가 있는가"를 물었다면, 여기서는 본편 4건(+경계 1건)을 **동일 지표(지속기간·낙폭·속도·발원)로 정렬**해 서로 어떻게 다른지 본다. 라벨은 저점 연도 기준 **DT08·DT12·DT19·DT23**(경계: DT16) — [CMO 매트릭스](../storyline/cmo-matrix.md)의 차수와 대응: 1차=DT08, 2차=DT12, 2019=DT19, 3차=DT23 (DT16은 CMO 미수록 창).

---

## 1. 20년 매출 타임라인 — 전체 메모리(DRAM+NAND) 연 매출과 다운턴 위치

산업 연 매출($B, 기관 혼합·ᵉ=역산). DRAM 시계열은 [memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §1, NAND 시계열은 [nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §1.

| 구간 | DRAM | NAND | 전체 메모리(D+N) | 국면 |
|------|------|------|------------------|------|
| 2006→2009 | 34.3ᵉ→22.5ᵉ (**-34%ᵉ**) | 13.9→12.0ᵉ (**-14%**) | 46.7ᵉ→34.5ᵉ (**-26%ᵉ**) | **DT08** 하강 — D·N 동행 |
| 2010→2012 | 39.5ᵉ→26.5ᵉ (**-33%ᵉ**) | 18.6ᵉ→20.7ᵉ (-2%ᵉ 보합) | 58.1ᵉ→47.2ᵉ (**-19%ᵉ**) | **DT12** 하강 — N은 매출 방어·가격 위기만 동행 |
| 2013→2014 | 35.5ᵉ→46.1ᵉ | 25.1ᵉ→31.5ᵉ | 60.6ᵉ→77.6ᵉ | 회복·확장 |
| 2014→2016 | 46.1ᵉ→41.0ᵉ (**-11%ᵉ**) | 31.5ᵉ→38.5ᵉ (**+14%ᵉ**) | 77.6ᵉ→79.5ᵉ (**+2%ᵉ**) | **DT16** — **DRAM 단독** 다운턴 (3D 전환이 상쇄) |
| 2017→2018 | 72.2ᵉ→99.4 | 57.0ᵉ→63.2 | 129.2ᵉ→162.6ᵉ | 슈퍼사이클 |
| 2018→2019 | 99.4→62.0 (**-37.6%**) | 63.2→46.0ᵉ (**-27%ᵉ**) | 162.6ᵉ→108.0ᵉ (**-34%ᵉ**) | **DT19** 하강 — D·N 동시 진입(4Q18) |
| 2020→2021 | 66.2ᵉ→94.0ᵉ | 55.1→67.1 | 121.3ᵉ→161.1ᵉ | 회복·호황 |
| 2021→2023 | 94.0ᵉ→51.8 (**-45%ᵉ**) | 67.1→36.7 (**-45%**) | 161.1ᵉ→88.5ᵉ (**-45%ᵉ**) | **DT23** 하강 — D·N **동일 낙폭 완전 동조** |
| 2024→2025 | 90.7→~154ᵉ | 67.4ᵉ→~68ᵉ | 158.1ᵉ→~222ᵉ | AI 슈퍼사이클 (2025는 DRAM 주도) |

세 가지가 바로 보인다. 첫째, **다운턴 사이 간격이 일정하지 않다** — 회복 직후 재하강(DT08→DT12)도 있었고 8년 호황(DT12→…→DT19 사이 DT16은 얕은 조정)도 있었다. 둘째, **낙폭의 하한이 깊어지고 있다** — 전체 메모리 기준 -26%ᵉ(DT08)·-19%ᵉ(DT12)였던 낙폭이 과점 시대에 -34%ᵉ(DT19), -45%ᵉ(DT23)로 커졌다. 셋째, **NAND의 역할이 바뀌었다** — 침투기(DT12 모바일, DT16 3D 전환)에는 전체 산업의 완충재였지만, 성숙기 DT19부터 진입 분기(4Q18)·반등 분기(2Q23)·낙폭(-45%)까지 DRAM과 일치한다 ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §3).

## 2. 5건 한눈 비교 — 지속기간 × 속도 × 발원

조작적 정의: 지속기간 = 산업 분기 매출(또는 대표 가격) 정점 직후 분기 ~ 저점 분기. 낙폭 = 연 매출 정점→저점 (전체 메모리 = DRAM+NAND 합산, D·N 분리 병기). 속도 = 하강 창 내 **최악 분기의 매출 QoQ 낙폭** — **전체 메모리(D+N) 통합 기준**을 대표 지표로 쓴다. 통합 분기 절대액 시계열이 없는 구간이 있어, 검증된 D·N 각각의 QoQ를 **연간 매출 비중으로 가중 평균**해 산출한다(근사, 오차 ±1~2%p — DRAM 단독치 병기):

| | D QoQ (검증) | N QoQ | 가중(D:N) | **통합ᵉ** |
|---|---|---|---|---|
| 4Q08 | -36% | -19.3% ([nand-quarterly-addendum-2026-08-24.md](../../sources/raw-notes/nand-quarterly-addendum-2026-08-24.md)) | 0.66:0.34 | **-30%ᵉ** |
| 4Q10 | -20% | 보합 0ᵉ 가정 (2010~11 NAND 성장기, 미검증) | 0.68:0.32 | **-14%ᵉ** |
| 4Q18 | -18.3% | -16.8% ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §2) | 0.61:0.39 | **-18%ᵉ** |
| 4Q22 | -32.5% | -25% ([nand-quarterly-addendum-2026-08-24.md](../../sources/raw-notes/nand-quarterly-addendum-2026-08-24.md)) | 0.57:0.43 | **-29%ᵉ** |

통합 기준으로 보면 **순간 낙차의 최대는 여전히 DT08(4Q08 -30%ᵉ, 금융위기)**이고 DT23(-29%ᵉ)이 근접 — 단 총낙폭(-45%)과 정점→저점 누적 속도(전체 2Q22 $43.9Bᵉ → 1Q23 $18.3Bᵉ, 3분기 -58%ᵉ)는 DT23이 사상 최대다. 근거는 [memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §2·§4. **DT16은 전체 메모리 기준 낙폭이 +2%ᵉ(성장)여서 다운턴 성립이 애매한 경계 사례** — 표에는 참고로 남기되 복기 덱 본편·산점도·타임라인 음영에서는 제외한다.

| | 창 | 지속ᵉ | 연매출 낙폭 (전체 / D / N) | 최악 분기 (통합ᵉ / D) | 발원 | 구조 이벤트 |
|---|-----|------|---------------------------|----------------------|------|-------------|
| **DT08** | 2007Q1~2009Q1 | ~9분기 | **-26%ᵉ** / -34%ᵉ / -14% | 4Q08 **-30%ᵉ** / -36% | **공급발**(6강 캐파 경쟁) → 말기 수요 충격(금융위기) 복합 | Qimonda 파산(2009-01) |
| **DT12** | 2010Q4~2012Q4 | ~9분기 | **-19%ᵉ** / -33%ᵉ / -2%ᵉ | 4Q10 -14%ᵉ / -20% | **공급발**(대만·엘피다 증산, PC 부진 겹침) — 저가 장기전 | Elpida 파산(2012-02)·SK의 하이닉스 인수(2012) → **3강 과점 완성**. NAND는 도시바 30% 감산(2012-07) |
| **DT16** (경계) | 2015Q1~2016Q2 | ~6분기 | **+2%ᵉ** / -11%ᵉ / +14%ᵉ | 4Q15 (D -9.1%) | **수요발**(PC 출하 감소·스마트폰 둔화) + 20nm 전환 공급 증가 — **DRAM 단독** | 파산 없음 — 3강 과점 첫 시험. 중국 진입 결정(칭화유니→YMTC·CXMT 설립) |
| **DT19** | 2018Q4~2019Q4 | ~5분기 | **-34%ᵉ** / -37.6% / -27%ᵉ | 4Q18 -18%ᵉ / -18.3% | **수요발**(하이퍼스케일러·스마트폰 재고 조정, 미중 분쟁 증폭) — D·N 동시 진입 | 파산 없음. Micron 최초 공식 감산(2019-03)·요카이치 정전(2019-06) |
| **DT23** | 2022Q2~2023Q3 | ~6분기 | **-45%ᵉ** / -45%ᵉ / **-45%** | 4Q22 **-29%ᵉ** / -32.5% | **수요발**(팬데믹 특수 소멸·금리) + 재고 대조정 — 6개월 인지 실패, D·N 완전 동조 | 3사 전원 감산 — 삼성 첫 공식 감산(2023-04, NAND 중심 연장). DRAM 분기 정점→저점 **-62%ᵉ, 사상 최속** |

### SP-2 사분면 매핑 (DF-D1 발원지 × DF-D2 전개 속도)

[key-drivers.md](key-drivers.md) §4의 분류를 5건 전체로 확장하면:

| | 급락형 | 침식형 |
|---|---|---|
| **수요발** | DT19 (재고 조정 — 5분기 최단) · DT08 말기 국면(2008Q4 금융위기) | DT16 (얕고 완만) · **DT23 진입부** (6개월 "일시적" 해석 → 재고 +76.6% 방치 후 급락 전화) |
| **공급발** | DT08 본체 (원가 이하 현물가 붕괴) | DT12 (2년 저가 지속으로 엘피다 소진) |

DT23이 가장 위험한 조합이었다 — **침식형으로 진입해(인지 실패) 급락형으로 끝났다**(3Q22 -28.9%, 4Q22 -32.5% — 2008 금융위기 이후 최대 연속 낙폭, [memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §2). 원인 오판이 대응 전체를 무효화한다는 [DF-D1의 명제](key-drivers.md)는 이 사례에서 나왔다.

---

## 3. 다운턴별 프로필

### DT08 — 1차 치킨게임 + 금융위기 (2007Q1~2009Q1, 공급발→복합)

- **원인**: 6강(삼성~30%·하이닉스~19%·엘피다~15%·마이크론~11%·키몬다~10%·대만 파워칩/난야) 체제의 12인치 캐파 경쟁. DRAM 가격 2007년 -85%, 2008년 -58% — 512Mb DDR2 $6.8 → $0.5 (-93%) ([dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)). 2008 Q4 금융위기 수요 급정지가 겹치며 분기 매출 -36% — 단일 분기 사상 최대 낙폭 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §2).
- **규모**: 산업 연 매출 -34%ᵉ (2006 $34.3ᵉ → 2009 $22.5ᵉ). 2008년 한 해 DRAM 업계 합산 순손실 **$7B** ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §1). 삼성도 2008 Q4 반도체 영업손실 -0.56조 원(OPM -14%) — 단 경쟁사들은 -40% 이하 ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)).
- **NAND 동행**: NAND도 2007년 ASP 급락을 거쳐 2008년 매출 -14%($13.9B→$12.0B) — 단 스마트폰 이전 침투 초기라 DRAM(-34%ᵉ)보다 얕았다 ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §3). 삼성의 SanDisk 인수 시도는 이 NAND 저가 국면의 사건이다.
- **대응 — 승자**: 삼성은 감산 없이 버티며 40nm급 DDR3 세계 최초 양산(2009-07, 생산성 +60%)으로 원가 격차를 벌리고, 2009-01 DS/DMC 2부문 통합·임원 연봉 -20% 구조 대응 후, 퇴출 확인 직후 2010년 메모리 투자를 5.5조→9조로 상향(반도체 12.7조) ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)). SanDisk $5.85B 인수 제안(2008-09) 후 손실 확대를 사유로 철회(2008-10) — 저가 매수 시도와 가격 규율의 병존.
- **대응 — 패자**: Qimonda — 누적손실 $30억+, 독일 정부 $5억 지원에도 2009-01 파산. 하이닉스는 채권단 공동관리(2001~2012)로 투자 여력 없이 2009년 투자 ~1.0조ᵉ 동결, Micron은 FY09 CapEx -81% ([memory-capex-history-research-2006-2015-2026-08-15.md](../../sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md)).
- **결과**: 키몬다 퇴출 직후 현물가 급등 — 공급자 1개 퇴출이 즉시 가격을 바꾸는 과점 실증. 삼성 2009년 연결 매출 136.3조·영업이익 10.9조, 2010년 영업이익 10.11조(당시 사상 최대) 수확.
- **교훈**: 공급발 다운턴에서는 **버티는 쪽의 원가·현금이 무기** — 그리고 회복은 경쟁자 퇴출이라는 구조 변화와 함께 왔다.

### DT12 — 2차 치킨게임 (2010Q4~2012Q4, 공급발·침식형)

- **원인**: 회복 1년 만의 재하강. 대만 진영·엘피다의 증산 + PC 수요 부진 + 유럽 재정위기. 급락이 아니라 **2년 이상 저가 지속** — DDR3 2Gb 벤치마크 가격 2011년 한 해 -85% ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §원 링크 IHS·[dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)).
- **규모**: 산업 연 매출 -33%ᵉ (2010 $39.5ᵉ → 2012 $26.5ᵉ, IHS 2011 -25%).
- **대응 — 승자**: 삼성 — Line-16 12조 착공·가동(2010-05→2011-09, 세계 최대 메모리 팹), 30nm급(2010-07)→20nm급(2011-09) 세계 최초 연속, PC→모바일 DRAM 전환 선행(2012-08 세계 최초 2GB LPDDR3), Austin 팹 메모리→로직 전환($4B), HDD 사업 매각(2011, $1.375B)으로 포트폴리오 경량화 ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)). SK그룹의 하이닉스 인수(2012)는 채권단 관리 11년을 끝낸 구조 전환 ([memory-capex-history-research-2006-2015-2026-08-15.md](../../sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md)).
- **대응 — 패자**: Elpida — 태국 홍수·엔고·업계 가격 급락·**PC→모바일 전환 대응 실패**로 부채 4,480억 엔, 2012-02-27 회사갱생법 신청(전후 일본 제조업 사상 최대 파산). 파워칩·프로모스·난야는 범용 DRAM에서 축차 퇴장 ([dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)).
- **NAND 부분 동행**: NAND 매출은 모바일 침투가 방어해 보합(-2%ᵉ)이었지만 **가격은 원가 이하 위기 동행** — 현물 31¢/GB까지 붕괴하자 도시바가 요카이치 NAND 투입 30% 감산을 발표(2012-07-24)했고 2주 만에 현물가 +20% 반등 ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §3). DRAM(무감산 소모전)과 NAND(1위권 감산 조율)의 대응이 갈린 첫 사례.
- **결과**: 6강 → **삼성·SK하이닉스·마이크론 3강 과점 완성**. Micron은 엘피다를 파산 법정관리에서 ~$2.5B에 인수(2013 완료) — 저점 M&A로 모바일 DRAM 스케일 확보. 삼성은 입찰 불참 ([memory-capex-history-research-2006-2015-2026-08-15.md](../../sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md), [samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)).
- **교훈**: 침식형 공급발은 **재무 체력전** — 퇴출은 낙차가 아니라 소진으로 온다. 그리고 수요 구조 전환(PC→모바일)의 심판대를 겸했다: 전환 성패가 곧 퇴출 순서였다.

### DT16 — 경계 사례: 과점 첫 시험, DRAM 단독 조정 (2015Q1~2016Q2, 수요발·침식형)

- **원인**: PC 출하 감소 + 스마트폰 성장 둔화(수요발), 20nm 전환에 따른 공급 증가 겹침. 2H15 점유율 경쟁·재고발 가격 인하 사이클 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §3).
- **규모**: 5건 중 최소 — 산업 연 매출 -11%ᵉ (2015 -2.4%, 2016 -9%ᵉ). PC DRAM 연평균 계약가 2016년 -34%, 4GB 모듈 저점 $12.5. 최악 분기도 -9.1%(4Q15)에 그침.
- **대응**: 파산·구제 없음 — 3강이 **증설 대신 3D NAND 전환으로 투자를 이동**시키며 DRAM 공급 성장을 억제(이것이 2016 H2 반등~2017 슈퍼사이클 공급 부족의 씨앗). Micron은 다운턴 저점에서 Inotera 잔여 지분을 $4.1B에 인수(2016-12) — 2013 엘피다에 이은 두 번째 저점 M&A ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §3).
- **NAND 비동행**: NAND는 2D→3D 전환 공급 제약으로 오히려 +14%ᵉ 성장(4Q16 +17.8% QoQ, "공급 부족 최심 국면") — 전체 메모리 매출은 +2%ᵉ로 **DRAM 단독 다운턴** ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §3). 제조사들의 3D NAND 전환 투자가 DRAM 공급 억제와 NAND 부족을 동시에 만든 구조.
- **구조 이벤트 — 중국의 진입 결정**: 칭화유니그룹의 Micron $23B 인수 시도(2015-07)가 미국 정부 반대로 무산되자 중국은 **자국 메모리 팹 건설로 선회** — YMTC·CXMT가 2016년 이 창에서 설립됐다 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §3). 오늘의 [CXMT 리스크](../entities/cxmt.md)는 이 다운턴의 유산이다.
- **결과**: 2016 H2 모바일·서버 수요 회복 + 공급 규율 → 2017~18 사상 최대 슈퍼사이클(+77%, +38%)로 직결.
- **교훈**: 과점은 얕은 수요 조정을 **가격 규율로 흡수**할 수 있음을 처음 실증. 동시에, 다운턴의 가장 큰 유산은 시장 밖에서 왔다 — 진입자의 결정.

### DT19 — 재고 조정 급락 (2018Q4~2019Q4, 수요발·급락형)

- **원인**: 슈퍼사이클 중 과발주한 하이퍼스케일러·스마트폰 고객의 재고 조정(삼성 4Q18 실적 발표에 명시) + 미중 분쟁·Huawei 제재 증폭. 공급 측 신규 진입 없음 — 순수 수요·재고 사이클 ([samsung-2019-downturn-2017-2019-actions-2026-08-16.md](../../sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md)).
- **규모**: 산업 연 매출 **-37.6%**($99.4B→$62.0B) — 당시 기준 최대 낙폭. DRAM 고정가 연간 -50% 이상. 삼성 반도체 영업이익 44.57조→14.02조(**-69%**).
- **대응**: 감산 착수 순서 — **Micron 최초 공식 감산(2019-03, DRAM·NAND 웨이퍼 -5%) → SK하이닉스(2019-07, NAND -15%·D램 캐파 축소·M10 CIS 전환) → 삼성만 "인위적 웨이퍼 투입 감소 검토 안 함" 무감산 기조 유지 + CapEx 22.6조(-5%)로 규모 유지**. 삼성은 다운턴 중 세대 전환을 완주(1z DRAM·6세대 V낸드·EUV 준비·HBM2E Flashbolt 발표)하고, 한복판에 비전 2030(시스템반도체 133조)을 선언 ([samsung-2019-downturn-2017-2019-actions-2026-08-16.md](../../sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md)).
- **NAND 동행**: 4Q18 NAND -16.8%로 DRAM(-18.3%)과 동시 진입, 2019년 -27%ᵉ. 단 요카이치 정전(2019-06)과 도시바메모리 감산으로 **NAND가 2H19 먼저 수급 개선** — DRAM보다 앞서 바닥을 만들었다 ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §2·§3, [samsung-2019-downturn-2017-2019-actions-2026-08-16.md](../../sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md) §4).
- **동시에 심긴 함정**: 같은 2019년, 삼성은 HBM 시장을 니치로 판단해 **HBM 전담팀을 축소** — SK하이닉스는 반대로 베팅을 늘림 ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md) CNBC 인용).
- **결과**: 4Q19 가격 바닥 → 2020 COVID 클라우드 수요로 V자 회복. 삼성 1Q20 DRAM 점유율 44.1% — 무감산·투자 유지가 점유율 방어로 이어짐. 5분기, 5건 중 최단.
- **교훈**: 수요발(재고) 다운턴은 재고 소진과 함께 스스로 끝난다 — 감산 없이 버틴 1위가 점유율로 보상받았다. **그러나 이 성공 경험이 다음 다운턴의 오판 근거가 된다.**

### DT23 — 사상 최속·최심 (2022Q2~2023Q3, 수요발·침식→급락 전화)

- **원인**: 팬데믹 특수 소멸(PC·모바일 수요 절벽) + 금리 인상 + 고객 재고 대조정. 공급 측은 증설 관성 지속. 6개월 이상 "일시적"으로 해석되는 동안 삼성 DS 재고 16.5조→29.1조(+76.6%) 축적 — 침식형 인지 실패의 전형 ([samsung-pre-downturn-preparation-2005-2022-2026-08-08.md](../../sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md)).
- **규모**: 산업 연 매출 **-45%ᵉ**($94.0Bᵉ→$51.8B) — 5건 중 최심. 분기로는 3Q22 **-28.9%**(2008 이후 최대) → 4Q22 **-32.5%**(4Q08 -36%에 근접) 연속, 정점→저점(2Q22 $25.6ᵉ→1Q23 $9.7ᵉ) **-62%ᵉ를 3분기에** — 사상 최속 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §2). 삼성 DS 2023년 영업손실 **-14.88조(사상 최대)**, Q1 -4.58조 ([memory-capex-history.md](../concepts/memory-capex-history.md), [samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)).
- **NAND 완전 동조**: NAND는 2021 $67.1B → 2023 $36.7B(**-45%**)로 DRAM과 **동일 낙폭** — 3Q22 -24.3%·1Q23 -16.1%, 반등도 2Q23 동시(+7.4%) ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §2·§3). 침투기의 완충 효과가 소멸해 전체 메모리가 한 몸으로 떨어진 첫 다운턴. 삼성의 감산 연장도 NAND 중심이었다(2023-07, [samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)).
- **대응**: 삼성 — "인위적 감산 없다"(2022-10-27) → 재확인(2023-01-31) → **감산 공식화(2023-04-07)**로 6개월 만의 선회, 그러면서 CapEx 48.4조 사상 최대·R&D 28.34조 사상 최대 유지(레거시 감산 + HBM/DDR5 증설 재배치). SK하이닉스 — CapEx **-56.2%** 급축 + HBM 선택·집중. Micron — CapEx -42% ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md), [memory-capex-history.md](../concepts/memory-capex-history.md)).
- **왜 소모전이 불발했나**: 3강 전원이 원가 이상 체력을 갖춘 과점에서는 "체력 열위 퇴출"이라는 치킨게임 교범의 전제가 성립하지 않았다 — 버티기는 퇴출 대신 전원 손실만 낳았고, 결국 1위가 먼저 감산으로 선회했다 ([key-drivers.md](key-drivers.md) DF-D1).
- **결과**: 감산 + AI/HBM 수요로 2Q23 반등 개시(+20.4%) → 2024 +75%. 단 회복의 과실 배분이 달랐다 — 2019년 HBM팀 축소의 대가로 **HBM 주도권은 SK하이닉스로** ([hbm-market.md](../concepts/hbm-market.md)). 총량(CapEx 사상 최대)을 지킨 삼성보다 배분(HBM 집중)을 바꾼 SK가 회복기를 가져갔다 ([memory-capex-history.md](../concepts/memory-capex-history.md) §4).
- **교훈**: ① 원인·형태 오판(수요발 침식을 공급발 급락 교범으로 대응)은 대응 전체를 무효화한다. ② 직전 다운턴(DT19)의 성공 공식(무감산 버티기)이 그대로 함정이 됐다. ③ 과점은 기간을 줄여도 깊이와 속도를 막지 못한다.

---

## 4. 패턴 — 20년이 말하는 여섯 가지

1. **발원이 지속기간을 결정했다**: 공급발(DT08·DT12)은 ~9분기, 수요발(DT19·DT23)은 5~6분기(경계 사례 DT16도 6분기로 정합). 과잉 캐파는 퇴출·전환으로만 해소돼 시간이 걸리고, 재고는 소진되면 수요가 돌아온다. → 다음 다운턴에서 [DR-1 감별 프로토콜](response-playbook.md)이 첫 30일에 발원지를 판별해야 하는 이유.
2. **과점화는 기간을 줄였지만 깊이는 못 막았다**: 6강 시대 9분기 → 3강 시대 5~6분기로 단축. 그러나 낙폭은 -33~34% → -37.6% → -45%로 오히려 확대 — 수요 변동 자체가 커졌기 때문(서버·하이퍼스케일러 집중, [rs4-customer-portfolio-diversification.md](../strategies/invariant/rs4-customer-portfolio-diversification.md)).
3. **속도는 구조적으로 빨라진다**: 최악 분기 낙폭 -36%(4Q08)는 15년 뒤 -28.9%→-32.5% **연속 2분기**(2H22)로 재현됐다. 집중된 고객·핸드투마우스 재고·계약 갱신 집중이 낙차를 한 시점에 몰아 터뜨린다 — [DP-1 계약 만기 사다리화](preparation.md)·[DX-7 만기 집중도](differential-indicators.md)의 역사적 논거.
4. **승자의 행동은 세 가지로 반복됐다**: ① 다운턴 중 세대 전환 완주(40nm·20nm·1z — 원가 격차), ② 역사이클 투자(2010 배증·2019 유지 — 회복기 점유율), ③ 저점 M&A(Micron의 Elpida·Inotera). 퇴출자는 정확히 반대였다 — 현금 소진 + 세대 전환 지연 + 단일 시장(PC) 노출(Qimonda·Elpida). 단 역사이클 투자의 성립 조건(경쟁자의 재무 취약)은 소멸 중 ([memory-capex-history.md](../concepts/memory-capex-history.md) §4).
5. **한 다운턴의 결정이 다음 다운턴의 출발 조건이 된다**: DT19의 무감산 성공 → DT23의 무감산 오판. DT19의 HBM팀 축소 → DT23 회복기의 주도권 상실. DT16의 칭화유니 무산 → YMTC·CXMT 설립 → [DT-D 「저가 잠식」](scenario-DT-D.md)의 현재 리스크. — [CMO 렌즈](../storyline/storyline-cmo.md)의 "한 다운턴의 M이 다음 다운턴의 C가 된다"의 20년 실증.
6. **NAND의 완충 효과는 소멸했다**: 침투기에는 NAND의 신규 수요(모바일 침투 DT12, 3D 전환 DT16)가 전체 산업의 낙폭을 흡수해 DT16은 전체 메모리 기준 +2%ᵉ였다. 그러나 성숙기 DT19부터 진입·반등·낙폭이 DRAM과 일치했고 DT23에서는 D·N 모두 -45% — **다음 다운턴은 전체 메모리가 한 몸으로 떨어진다고 전제해야 한다** ([nand-market-history-research-2026-08-22.md](../../sources/raw-notes/nand-market-history-research-2026-08-22.md) §3). DRAM 다운턴 중 NAND가 캐시카우가 되던 시대의 종료 — [rs2-barbell-portfolio.md](../strategies/invariant/rs2-barbell-portfolio.md)(바벨 포트폴리오)가 제품 축이 아니라 계약·고객 축으로 가야 하는 이유.

## 5. 다음 다운턴과의 연결 — 역사 대응물 매핑 (SP-2)

[SP-2 시나리오 매트릭스](scenario-matrix.md)의 DT-A~E를 본 페이지의 역사 4건과 같은 축(발원×속도)에 놓으면, 각 시나리오에는 "형태가 같은 과거"가 존재한다. **형태가 같으면 대응 문법도 유사하되, '다른 점'이 함정이다.** 복기 덱의 시나리오 장(S2·Appendix E~I)은 이 매핑을 단일 소스로 쓴다.

| 시나리오 (조건부 확률) | 사분면 | 역사 대응물 | 계승되는 문법 | 달라지는 것 (함정) |
|---|---|---|---|---|
| **DT-A 급제동** (20%) | 수요발×급락 | **DT19형** — 짧고 깊다 | 감산 무효·계약 방어·저점 매수 창 최대 ([DR-4](response-playbook.md)) | 재고 소진형 자연 회복 부재 — 조달 정상화까지 종료 없음. 만기 집중과 겹치면 낙차 증폭 ([DP-1](preparation.md)) |
| **DT-B 긴 하산** (24%) | 수요발×침식 | **역사에 없음** — DT23 진입부(침식 오인)의 장기판 | '일시적' 해석의 위험, 원가 백분위 기준 판단 ([DP-3](preparation.md)) | "수요발은 5~6분기" 경험칙(§4 패턴 1)이 처음으로 깨진다: 8~12분기. 적자 미발생으로 위기 명분 부재 — 손익 무관 발동 조건([DP-7](preparation.md)) 필요 |
| **DT-C 동시 방류** (22%) | 공급발×급락 | **DT08형** — 원가 이하 붕괴 | 공급발이므로 감산이 직접 효과 ([DR-2](response-playbook.md)) | 6강 대칭이 아닌 3강+CXMT — 체력 열위 퇴출 함수 부재, 무감산 버티기 보상 소멸. 감가 정점(2028~29)으로 낙폭 여지는 §4 패턴 2 추세보다 확대 |
| **DT-D 저가 잠식** (26%) | 공급발×침식 | **DT12형** — 저가 장기전·체력 소모 | 침식형 장기전의 재무 체력 관리, 층 이동 ([DR-5](response-playbook.md)) | 엘피다·대만은 자본 소진으로 퇴출됐지만 CXMT는 보조금으로 무한 지속 — **"기다리면 승리"가 처음으로 거짓**. 하단 철수가 액션이 되는 유일 시나리오 |
| **DT-E 판 갈이** (8%) | 축 밖 | **DT12의 전환 심판대** — PC→모바일 전환 실패 = 엘피다 퇴출 | 전환 완주가 생사를 가른다는 §4 패턴 4 | 심판대가 다운턴과 별개가 아니라 다운턴 그 자체. 청구서는 다음 호황에서 도착(2019 HBM 축소 → 2023~24 실증, [DP-5](preparation.md)) |

역사 통찰과의 접점 세 가지:
- **§4 패턴 1(발원=기간)의 적용**: 공급발 시나리오(DT-C·D, 합계 48%)가 지배적이면 다음 다운턴은 장기전(9분기+) 준비가 기본값이다. 단 DT-B는 수요발인데도 8~12분기 — 경험칙의 예외를 시나리오가 명시한다.
- **§4 패턴 2(낙폭 확대)의 연장**: DT-C의 감가 정점 메커니즘([scenario-matrix.md](scenario-matrix.md))은 -26→-34→-45% 추세가 다음에 더 깊어질 수 있는 구조적 근거다.
- **§4 패턴 5(직전 성공=함정)의 다음 회차**: DT23의 교훈("감산 선회")이 "조기 감산" 반사신경으로 굳으면, 수요발(DT-A·B)에서 그 감산이 오진이 된다 — [DR-1 감별 프로토콜](response-playbook.md)이 먼저인 이유.

## 연결 페이지

- [key-drivers.md](key-drivers.md) — DF-D1(발원지)×DF-D2(전개 속도) 축과 사분면 검증 (본 페이지가 역사 기준선)
- [scenario-matrix.md](scenario-matrix.md) — 2027~2030 다음 다운턴 시나리오 DT-A~E
- [preparation.md](preparation.md) · [response-playbook.md](response-playbook.md) · [differential-indicators.md](differential-indicators.md) — 대비·대응·감별
- [cmo-matrix.md](../storyline/cmo-matrix.md) · [storyline-cmo.md](../storyline/storyline-cmo.md) — 다운턴별 대비/대응 CMO 분해 (차수 매핑: 1차=DT08·2차=DT12·2019=DT19·3차=DT23)
- [memory-capex-history.md](../concepts/memory-capex-history.md) — 3사 CAPEX 20년 (역사이클 투자 정량)
- [semiconductor-cycle.md](../concepts/semiconductor-cycle.md) — 현 사이클(2026~28) 전망
- [cyclical-strategy-benchmark.md](../benchmark/cyclical-strategy-benchmark.md) — 타 산업 사이클 대응 벤치마크
