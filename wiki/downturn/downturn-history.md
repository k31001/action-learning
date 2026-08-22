---
type: analysis
last_reviewed: 2026-08-22
sources: [sources/raw-notes/memory-downturn-history-research-2026-08-22.md, sources/articles/dram-chicken-game-history-2026-08-05.md, sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md, sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md, sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md, sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md]
---

# 지난 20년 메모리 다운턴 복기 (2006~2025) — 5건의 원인·양상·지속·대응·결과

> **한 줄 요약**: 20년간 다운턴은 5번 왔다. 공급발 2번(치킨게임 — 길고 깊다), 수요발 3번(짧지만 갈수록 빠르다). 6강→3강 과점화는 다운턴의 **기간**을 절반으로 줄였지만 **깊이**는 막지 못했고(DT23 낙폭 -45% 최심·분기 속도 사상 최속), 승부는 다운턴 그 자체가 아니라 **다운턴 중에 심은 것**(세대 전환 완주·역사이클 투자·저점 M&A — 또는 HBM팀 축소)이 다음 사이클에서 갈랐다.

이 페이지는 [SP-2 다운턴 트랙](README.md)의 **역사 기준선**이다. [key-drivers.md](key-drivers.md)의 사분면 검증(§4)이 "네 사분면 모두 실례가 있는가"를 물었다면, 여기서는 5건 전부를 **동일 지표(지속기간·낙폭·속도·발원)로 정렬**해 서로 어떻게 다른지 본다. 라벨은 저점 연도 기준 **DT08·DT12·DT16·DT19·DT23** — [CMO 매트릭스](../storyline/cmo-matrix.md)의 차수와 대응: 1차=DT08, 2차=DT12, 2019=DT19, 3차=DT23 (DT16은 CMO 미수록 창).

---

## 1. 20년 매출 타임라인 — DRAM 산업 연 매출과 다운턴 위치

DRAM 산업 연 매출($B, 기관 혼합·ᵉ=역산). 전 구간 수치와 근거는 [memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §1.

| 구간 | 궤적 | 국면 |
|------|------|------|
| 2006→2009 | 34.3ᵉ → 31.5ᵉ → 23.6 → 22.5ᵉ | **DT08** 하강 (-34%ᵉ) |
| 2010 | 39.5ᵉ (+75%ᵉ) | 회복 — 그리고 즉시 재하강 |
| 2010→2012 | 39.5ᵉ → 29.6 → 26.5ᵉ | **DT12** 하강 (-33%ᵉ) |
| 2013→2014 | 35.5ᵉ → 46.1ᵉ | 회복·확장 |
| 2014→2016 | 46.1ᵉ → 45.0ᵉ → 41.0ᵉ | **DT16** 하강 (-11%ᵉ) |
| 2017→2018 | 72.2ᵉ → 99.4 | 슈퍼사이클 |
| 2018→2019 | 99.4 → 62.0 | **DT19** 하강 (-37.6%) |
| 2020→2021 | 66.2ᵉ → 94.0ᵉ | 회복·호황 |
| 2021→2023 | 94.0ᵉ → 80.1ᵉ → 51.8 | **DT23** 하강 (-45%ᵉ) |
| 2024→2025 | 90.7 → ~154ᵉ | AI 슈퍼사이클 |

두 가지가 바로 보인다. 첫째, **다운턴 사이 간격이 일정하지 않다** — 회복 직후 재하강(DT08→DT12)도 있었고 8년 호황(DT12→…→DT19 사이 DT16은 얕은 조정)도 있었다. 둘째, **낙폭의 하한이 깊어지고 있다** — 치킨게임 시대 -33~34%였던 낙폭이 과점 시대에 -37.6%(DT19), -45%(DT23)로 오히려 커졌다.

## 2. 5건 한눈 비교 — 지속기간 × 속도 × 발원

조작적 정의: 지속기간 = 산업 분기 매출(또는 대표 가격) 정점 직후 분기 ~ 저점 분기. 낙폭 = 연 매출 정점→저점. 속도 = 하강 창 내 **최악 분기의 매출 QoQ 낙폭**. 근거는 [memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §2·§4.

| | 창 | 지속ᵉ | 연매출 낙폭 | 최악 분기(QoQ) | 발원 | 구조 이벤트 |
|---|-----|------|------------|----------------|------|-------------|
| **DT08** | 2007Q1~2009Q1 | ~9분기 | **-34%ᵉ** ($34.3ᵉ→$22.5ᵉ) | 4Q08 **-36%** | **공급발**(6강 캐파 경쟁) → 말기 수요 충격(금융위기) 복합 | Qimonda 파산(2009-01) |
| **DT12** | 2010Q4~2012Q4 | ~9분기 | **-33%ᵉ** ($39.5ᵉ→$26.5ᵉ) | 4Q10 -20% | **공급발**(대만·엘피다 증산, PC 부진 겹침) — 저가 장기전 | Elpida 파산(2012-02)·SK의 하이닉스 인수(2012) → **3강 과점 완성** |
| **DT16** | 2015Q1~2016Q2 | ~6분기 | **-11%ᵉ** ($46.1ᵉ→$41.0ᵉ) | 4Q15 -9.1% | **수요발**(PC 출하 감소·스마트폰 둔화) + 20nm 전환 공급 증가 | 파산 없음 — 3강 과점 첫 시험. 중국 진입 결정(칭화유니→YMTC·CXMT 설립) |
| **DT19** | 2018Q4~2019Q4 | ~5분기 | **-37.6%** ($99.4→$62.0) | 4Q18 -18.3% | **수요발**(하이퍼스케일러·스마트폰 재고 조정, 미중 분쟁 증폭) | 파산 없음. Micron 최초 공식 감산(2019-03) |
| **DT23** | 2022Q2~2023Q3 | ~6분기 | **-45%ᵉ** ($94.0ᵉ→$51.8) | 4Q22 **-32.5%** | **수요발**(팬데믹 특수 소멸·금리) + 재고 대조정 — 6개월 인지 실패 | 3사 전원 감산 — 삼성 첫 공식 감산(2023-04). 분기 정점→저점 **-62%ᵉ, 사상 최속** |

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
- **대응 — 승자**: 삼성은 감산 없이 버티며 40nm급 DDR3 세계 최초 양산(2009-07, 생산성 +60%)으로 원가 격차를 벌리고, 2009-01 DS/DMC 2부문 통합·임원 연봉 -20% 구조 대응 후, 퇴출 확인 직후 2010년 메모리 투자를 5.5조→9조로 상향(반도체 12.7조) ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)). SanDisk $5.85B 인수 제안(2008-09) 후 손실 확대를 사유로 철회(2008-10) — 저가 매수 시도와 가격 규율의 병존.
- **대응 — 패자**: Qimonda — 누적손실 $30억+, 독일 정부 $5억 지원에도 2009-01 파산. 하이닉스는 채권단 공동관리(2001~2012)로 투자 여력 없이 2009년 투자 ~1.0조ᵉ 동결, Micron은 FY09 CapEx -81% ([memory-capex-history-research-2006-2015-2026-08-15.md](../../sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md)).
- **결과**: 키몬다 퇴출 직후 현물가 급등 — 공급자 1개 퇴출이 즉시 가격을 바꾸는 과점 실증. 삼성 2009년 연결 매출 136.3조·영업이익 10.9조, 2010년 영업이익 10.11조(당시 사상 최대) 수확.
- **교훈**: 공급발 다운턴에서는 **버티는 쪽의 원가·현금이 무기** — 그리고 회복은 경쟁자 퇴출이라는 구조 변화와 함께 왔다.

### DT12 — 2차 치킨게임 (2010Q4~2012Q4, 공급발·침식형)

- **원인**: 회복 1년 만의 재하강. 대만 진영·엘피다의 증산 + PC 수요 부진 + 유럽 재정위기. 급락이 아니라 **2년 이상 저가 지속** — DDR3 2Gb 벤치마크 가격 2011년 한 해 -85% ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §원 링크 IHS·[dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)).
- **규모**: 산업 연 매출 -33%ᵉ (2010 $39.5ᵉ → 2012 $26.5ᵉ, IHS 2011 -25%).
- **대응 — 승자**: 삼성 — Line-16 12조 착공·가동(2010-05→2011-09, 세계 최대 메모리 팹), 30nm급(2010-07)→20nm급(2011-09) 세계 최초 연속, PC→모바일 DRAM 전환 선행(2012-08 세계 최초 2GB LPDDR3), Austin 팹 메모리→로직 전환($4B), HDD 사업 매각(2011, $1.375B)으로 포트폴리오 경량화 ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)). SK그룹의 하이닉스 인수(2012)는 채권단 관리 11년을 끝낸 구조 전환 ([memory-capex-history-research-2006-2015-2026-08-15.md](../../sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md)).
- **대응 — 패자**: Elpida — 태국 홍수·엔고·업계 가격 급락·**PC→모바일 전환 대응 실패**로 부채 4,480억 엔, 2012-02-27 회사갱생법 신청(전후 일본 제조업 사상 최대 파산). 파워칩·프로모스·난야는 범용 DRAM에서 축차 퇴장 ([dram-chicken-game-history-2026-08-05.md](../../sources/articles/dram-chicken-game-history-2026-08-05.md)).
- **결과**: 6강 → **삼성·SK하이닉스·마이크론 3강 과점 완성**. Micron은 엘피다를 파산 법정관리에서 ~$2.5B에 인수(2013 완료) — 저점 M&A로 모바일 DRAM 스케일 확보. 삼성은 입찰 불참 ([memory-capex-history-research-2006-2015-2026-08-15.md](../../sources/raw-notes/memory-capex-history-research-2006-2015-2026-08-15.md), [samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)).
- **교훈**: 침식형 공급발은 **재무 체력전** — 퇴출은 낙차가 아니라 소진으로 온다. 그리고 수요 구조 전환(PC→모바일)의 심판대를 겸했다: 전환 성패가 곧 퇴출 순서였다.

### DT16 — 과점 첫 시험, 얕은 조정 (2015Q1~2016Q2, 수요발·침식형)

- **원인**: PC 출하 감소 + 스마트폰 성장 둔화(수요발), 20nm 전환에 따른 공급 증가 겹침. 2H15 점유율 경쟁·재고발 가격 인하 사이클 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §3).
- **규모**: 5건 중 최소 — 산업 연 매출 -11%ᵉ (2015 -2.4%, 2016 -9%ᵉ). PC DRAM 연평균 계약가 2016년 -34%, 4GB 모듈 저점 $12.5. 최악 분기도 -9.1%(4Q15)에 그침.
- **대응**: 파산·구제 없음 — 3강이 **증설 대신 3D NAND 전환으로 투자를 이동**시키며 DRAM 공급 성장을 억제(이것이 2016 H2 반등~2017 슈퍼사이클 공급 부족의 씨앗). Micron은 다운턴 저점에서 Inotera 잔여 지분을 $4.1B에 인수(2016-12) — 2013 엘피다에 이은 두 번째 저점 M&A ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §3).
- **구조 이벤트 — 중국의 진입 결정**: 칭화유니그룹의 Micron $23B 인수 시도(2015-07)가 미국 정부 반대로 무산되자 중국은 **자국 메모리 팹 건설로 선회** — YMTC·CXMT가 2016년 이 창에서 설립됐다 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §3). 오늘의 [CXMT 리스크](../entities/cxmt.md)는 이 다운턴의 유산이다.
- **결과**: 2016 H2 모바일·서버 수요 회복 + 공급 규율 → 2017~18 사상 최대 슈퍼사이클(+77%, +38%)로 직결.
- **교훈**: 과점은 얕은 수요 조정을 **가격 규율로 흡수**할 수 있음을 처음 실증. 동시에, 다운턴의 가장 큰 유산은 시장 밖에서 왔다 — 진입자의 결정.

### DT19 — 재고 조정 급락 (2018Q4~2019Q4, 수요발·급락형)

- **원인**: 슈퍼사이클 중 과발주한 하이퍼스케일러·스마트폰 고객의 재고 조정(삼성 4Q18 실적 발표에 명시) + 미중 분쟁·Huawei 제재 증폭. 공급 측 신규 진입 없음 — 순수 수요·재고 사이클 ([samsung-2019-downturn-2017-2019-actions-2026-08-16.md](../../sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md)).
- **규모**: 산업 연 매출 **-37.6%**($99.4B→$62.0B) — 당시 기준 최대 낙폭. DRAM 고정가 연간 -50% 이상. 삼성 반도체 영업이익 44.57조→14.02조(**-69%**).
- **대응**: 감산 착수 순서 — **Micron 최초 공식 감산(2019-03, DRAM·NAND 웨이퍼 -5%) → SK하이닉스(2019-07, NAND -15%·D램 캐파 축소·M10 CIS 전환) → 삼성만 "인위적 웨이퍼 투입 감소 검토 안 함" 무감산 기조 유지 + CapEx 22.6조(-5%)로 규모 유지**. 삼성은 다운턴 중 세대 전환을 완주(1z DRAM·6세대 V낸드·EUV 준비·HBM2E Flashbolt 발표)하고, 한복판에 비전 2030(시스템반도체 133조)을 선언 ([samsung-2019-downturn-2017-2019-actions-2026-08-16.md](../../sources/articles/samsung-2019-downturn-2017-2019-actions-2026-08-16.md)).
- **동시에 심긴 함정**: 같은 2019년, 삼성은 HBM 시장을 니치로 판단해 **HBM 전담팀을 축소** — SK하이닉스는 반대로 베팅을 늘림 ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md) CNBC 인용).
- **결과**: 4Q19 가격 바닥 → 2020 COVID 클라우드 수요로 V자 회복. 삼성 1Q20 DRAM 점유율 44.1% — 무감산·투자 유지가 점유율 방어로 이어짐. 5분기, 5건 중 최단.
- **교훈**: 수요발(재고) 다운턴은 재고 소진과 함께 스스로 끝난다 — 감산 없이 버틴 1위가 점유율로 보상받았다. **그러나 이 성공 경험이 다음 다운턴의 오판 근거가 된다.**

### DT23 — 사상 최속·최심 (2022Q2~2023Q3, 수요발·침식→급락 전화)

- **원인**: 팬데믹 특수 소멸(PC·모바일 수요 절벽) + 금리 인상 + 고객 재고 대조정. 공급 측은 증설 관성 지속. 6개월 이상 "일시적"으로 해석되는 동안 삼성 DS 재고 16.5조→29.1조(+76.6%) 축적 — 침식형 인지 실패의 전형 ([samsung-pre-downturn-preparation-2005-2022-2026-08-08.md](../../sources/articles/samsung-pre-downturn-preparation-2005-2022-2026-08-08.md)).
- **규모**: 산업 연 매출 **-45%ᵉ**($94.0Bᵉ→$51.8B) — 5건 중 최심. 분기로는 3Q22 **-28.9%**(2008 이후 최대) → 4Q22 **-32.5%**(4Q08 -36%에 근접) 연속, 정점→저점(2Q22 $25.6ᵉ→1Q23 $9.7ᵉ) **-62%ᵉ를 3분기에** — 사상 최속 ([memory-downturn-history-research-2026-08-22.md](../../sources/raw-notes/memory-downturn-history-research-2026-08-22.md) §2). 삼성 DS 2023년 영업손실 **-14.88조(사상 최대)**, Q1 -4.58조 ([memory-capex-history.md](../concepts/memory-capex-history.md), [samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md)).
- **대응**: 삼성 — "인위적 감산 없다"(2022-10-27) → 재확인(2023-01-31) → **감산 공식화(2023-04-07)**로 6개월 만의 선회, 그러면서 CapEx 48.4조 사상 최대·R&D 28.34조 사상 최대 유지(레거시 감산 + HBM/DDR5 증설 재배치). SK하이닉스 — CapEx **-56.2%** 급축 + HBM 선택·집중. Micron — CapEx -42% ([samsung-downturn-actions-2007-2023-2026-08-07.md](../../sources/articles/samsung-downturn-actions-2007-2023-2026-08-07.md), [memory-capex-history.md](../concepts/memory-capex-history.md)).
- **왜 소모전이 불발했나**: 3강 전원이 원가 이상 체력을 갖춘 과점에서는 "체력 열위 퇴출"이라는 치킨게임 교범의 전제가 성립하지 않았다 — 버티기는 퇴출 대신 전원 손실만 낳았고, 결국 1위가 먼저 감산으로 선회했다 ([key-drivers.md](key-drivers.md) DF-D1).
- **결과**: 감산 + AI/HBM 수요로 2Q23 반등 개시(+20.4%) → 2024 +75%. 단 회복의 과실 배분이 달랐다 — 2019년 HBM팀 축소의 대가로 **HBM 주도권은 SK하이닉스로** ([hbm-market.md](../concepts/hbm-market.md)). 총량(CapEx 사상 최대)을 지킨 삼성보다 배분(HBM 집중)을 바꾼 SK가 회복기를 가져갔다 ([memory-capex-history.md](../concepts/memory-capex-history.md) §4).
- **교훈**: ① 원인·형태 오판(수요발 침식을 공급발 급락 교범으로 대응)은 대응 전체를 무효화한다. ② 직전 다운턴(DT19)의 성공 공식(무감산 버티기)이 그대로 함정이 됐다. ③ 과점은 기간을 줄여도 깊이와 속도를 막지 못한다.

---

## 4. 패턴 — 20년이 말하는 다섯 가지

1. **발원이 지속기간을 결정했다**: 공급발(DT08·DT12)은 ~9분기, 수요발(DT16·DT19·DT23)은 5~6분기. 과잉 캐파는 퇴출·전환으로만 해소돼 시간이 걸리고, 재고는 소진되면 수요가 돌아온다. → 다음 다운턴에서 [DR-1 감별 프로토콜](response-playbook.md)이 첫 30일에 발원지를 판별해야 하는 이유.
2. **과점화는 기간을 줄였지만 깊이는 못 막았다**: 6강 시대 9분기 → 3강 시대 5~6분기로 단축. 그러나 낙폭은 -33~34% → -37.6% → -45%로 오히려 확대 — 수요 변동 자체가 커졌기 때문(서버·하이퍼스케일러 집중, [rs4-customer-portfolio-diversification.md](../strategies/invariant/rs4-customer-portfolio-diversification.md)).
3. **속도는 구조적으로 빨라진다**: 최악 분기 낙폭 -36%(4Q08)는 15년 뒤 -28.9%→-32.5% **연속 2분기**(2H22)로 재현됐다. 집중된 고객·핸드투마우스 재고·계약 갱신 집중이 낙차를 한 시점에 몰아 터뜨린다 — [DP-1 계약 만기 사다리화](preparation.md)·[DX-7 만기 집중도](differential-indicators.md)의 역사적 논거.
4. **승자의 행동은 세 가지로 반복됐다**: ① 다운턴 중 세대 전환 완주(40nm·20nm·1z — 원가 격차), ② 역사이클 투자(2010 배증·2019 유지 — 회복기 점유율), ③ 저점 M&A(Micron의 Elpida·Inotera). 퇴출자는 정확히 반대였다 — 현금 소진 + 세대 전환 지연 + 단일 시장(PC) 노출(Qimonda·Elpida). 단 역사이클 투자의 성립 조건(경쟁자의 재무 취약)은 소멸 중 ([memory-capex-history.md](../concepts/memory-capex-history.md) §4).
5. **한 다운턴의 결정이 다음 다운턴의 출발 조건이 된다**: DT19의 무감산 성공 → DT23의 무감산 오판. DT19의 HBM팀 축소 → DT23 회복기의 주도권 상실. DT16의 칭화유니 무산 → YMTC·CXMT 설립 → [DT-D 「저가 잠식」](scenario-DT-D.md)의 현재 리스크. — [CMO 렌즈](../storyline/storyline-cmo.md)의 "한 다운턴의 M이 다음 다운턴의 C가 된다"의 20년 실증.

## 연결 페이지

- [key-drivers.md](key-drivers.md) — DF-D1(발원지)×DF-D2(전개 속도) 축과 사분면 검증 (본 페이지가 역사 기준선)
- [scenario-matrix.md](scenario-matrix.md) — 2027~2030 다음 다운턴 시나리오 DT-A~E
- [preparation.md](preparation.md) · [response-playbook.md](response-playbook.md) · [differential-indicators.md](differential-indicators.md) — 대비·대응·감별
- [cmo-matrix.md](../storyline/cmo-matrix.md) · [storyline-cmo.md](../storyline/storyline-cmo.md) — 다운턴별 대비/대응 CMO 분해 (차수 매핑: 1차=DT08·2차=DT12·2019=DT19·3차=DT23)
- [memory-capex-history.md](../concepts/memory-capex-history.md) — 3사 CAPEX 20년 (역사이클 투자 정량)
- [semiconductor-cycle.md](../concepts/semiconductor-cycle.md) — 현 사이클(2026~28) 전망
- [cyclical-strategy-benchmark.md](../benchmark/cyclical-strategy-benchmark.md) — 타 산업 사이클 대응 벤치마크
