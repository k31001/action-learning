---
type: presentation-outline
deck: outputs/presentation/ssd-survival-strategy.pptx
generator: outputs/presentation/scripts/generate_ssd_survival_pptx.py
charts: outputs/presentation/scripts/generate_ssd_survival_charts.py
report: outputs/report/ssd-survival-strategy-report.md (전략 해설서)
parts: outputs/presentation/scripts/render_parts/ (3D 부품 렌더·로고)
status: v1.3 (2026-09-28): 3장 SCA·FDE 재설계, 역량 칸 기술명, "전략 고객", KV 캐시 기여 정정
wiki: [wiki/concepts/hbm3-designin-lesson.md, wiki/concepts/hbm-to-storage-spillover.md, wiki/concepts/qlc-ssd-market.md, wiki/concepts/high-dwpd-operating-point.md, wiki/concepts/solution-ladder-component-to-system.md, wiki/concepts/ssd-configurability-boundary.md, wiki/strategies/qlc-execution-strategy.md, wiki/strategies/qlc-workload-capability-phases.md]
---

# 다운턴에서 배운 SSD 생존 전략: 3장 요약 덱

> **Deck Read**: 이 덱은 액션러닝 요약 보고 3장, 청중은 사업부 임원, 5~10분 기준, 결론 우선·시각 중심 언어로 읽었다. 다이얼 `DATA_DENSITY 4 / FORMALITY 7 / VISUAL_EXPRESSION 6`.
>
> **표현 규율**: 본문 18pt 이상, 출처 줄만 15pt. 사실은 그래프, 개념은 도형과 선. 기업은 로고, 부품은 이미지. 액센트는 Samsung Blue 하나(자사 = Blue, 경쟁 = 그레이). em-dash 없음.

## 제목 3개를 이어 읽으면

> HBM의 교훈은 고객과 함께 수요를 읽는 것이며, 다음 수요인 AI 스토리지는 높은 DWPD를 요구합니다. NAND의 한계는 SSD 안에서 풀어 왔지만, DWPD 장벽은 서버와 함께 WAF를 낮춰야 풀립니다. 계약에 기술 협력을 묶고, 고객 안에 사람을 두고, AI 데이터센터 운영자 수준의 시스템 SW 역량을 갖춰야 합니다.

---

## 1장 배경: 다운턴의 교훈과 다음 수요

**제목**: HBM의 교훈은 고객과 함께 수요를 읽는 것이며, 다음 수요인 AI 스토리지는 높은 DWPD를 요구합니다

| 구획 | 시각 | 담는 것 |
|---|---|---|
| ① 교훈: HBM 수요를 늦게 읽었다 | HBM 점유율 선 그래프(삼성 Blue, SK하이닉스 그레이, 삼성·SK하이닉스 로고 범례, 2023 다운턴 음영) + 복기 3단 도형 + 교훈 상자(NVIDIA 로고) | 2022년 40% 대 50% → 2Q25 17% 대 62%(격차 45%p) → 1Q26 32% 대 58%. 복기: 시장 규모를 작게 봄 → 개발 리소스 투입 지연 → AI 첫 호황 선두 상실. "고객과 함께 수요를 만드는 기업이 미래를 선점합니다"(신문섭 파트너 인터뷰) |
| ② 다음 수요: KV 캐시가 SSD로 | GPU HBM → 서버 DRAM → NVMe SSD 이미지 체인 + eSSD 수요 누적 막대(AI 추론 KV 캐시 = Blue) + QLC 비중 줄 + 랙 공간 콜아웃(서버 이미지) | eSSD 155EB(2022) → 265EB(2025) → 1,000EB(2030e), 그중 AI 추론 KV 캐시 350EB. QLC 비중 4% → 14%(2024) → 55%(2030e). 랙 공간 제약으로 고용량 선호: Meta의 QLC 서버 바이트 밀도 목표는 TLC 서버의 6배 |
| ③ 새 요구: 높은 DWPD | DWPD 로그 축 가로 막대(QLC 0.3~0.6, TLC 1 = 그레이, AI 요구 3~30 = Blue, 30 이상 SLC급 점선) + 빅넘버 "최대 100배" | 기존 TLC 1 · QLC 0.3~0.6 대 AI 스토리지 요구 3~30. 30 이상은 지금 SLC급 매체만. 요점은 모두 TLC·QLC로 풀자는 것이 아니라 고객이 높은 DWPD를 요구하기 시작했다는 사실 |
| 명제 밴드 | Blue 밴드 | DWPD 갭을 메우는 기업이 AI 스토리지 시장을 가져갑니다 |

**표현상 주의 (과제팀 확인 필요)**
- **복기 3단은 과제팀의 해석이다.** 2026-09-23 QLC 덱 작업에서는 "시장을 작게 봤다"를 해석으로 보고 "전략적 우선순위가 약화되었다"만 쓰기로 했었다. 이번 덱은 사용자 지시(2026-09-28)에 따라 복기 문구를 쓰되, 도형 위에 **"복기"** 라벨을 달아 사실 주장이 아니라 과제팀의 회고임을 표시했다. 사실 부분은 점유율 그래프만 담당한다. 조직 축소·공백 기간 같은 표현은 쓰지 않았다.
- **"이동"이 아니라 "내려온다"**: KV 캐시 오프로딩은 HBM을 대체하지 않고 그 아래 계층을 더한다([hbm-to-storage-spillover.md](../../wiki/concepts/hbm-to-storage-spillover.md)). 그래서 구획 제목은 "KV 캐시가 SSD로"다.
- **HBM 점유율 시계열은 기관이 섞였다**: 2022~2024 TrendForce(2023은 2023-04 시점 전망), 2Q25 이후 Counterpoint. 집계 기준(매출·출하)이 다를 수 있어 절대 비교보다 추세로 읽는다.
- **30 DWPD는 공개 근거가 없다**: 공개 수치는 KV 캐시용 제품 정격 1~3, 실측 3.2, 시스템 주장 24(Huawei), SLC급 50~120이다([high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §3). 30은 고객 요구로 `[사내 확인]` 표기.

## 2장 솔루션: SSD 안에서 서버로

**제목**: NAND의 한계는 SSD 안에서 풀어 왔지만, DWPD 장벽은 서버와 함께 WAF를 낮춰야 풀립니다

| 구획 | 시각 | 담는 것 |
|---|---|---|
| 상단 1/3: 솔루션의 범위 | NAND → SSD → 서버 이미지 체인, 괄호 두 개("지금까지: SSD 안에서 해결" 그레이 / "이제: 서버와 함께" Blue), 부품별 "문제 → 해법" | NAND: 비트 에러 → ECC, 쓰기 전 소거 → FTL / SSD: QoS 간섭 → 멀티테넌트, 데이터 보호 → 보안 / 서버: 데이터 수명 혼재 → 배치 정보 FDP |
| 상단 우측: 높은 DWPD, 세 갈래 | 선택지 3줄, WAF 저감만 Blue | SLC 매체 → 비용 ↑ / OP 확대 → 용량 ↓ / WAF 저감 → TCO 유지 |
| 하단 2/3: 기술 스택 3단계 | 5계층(AI 프레임워크 · 호스트 OS·커널 · NVMe · SSD 컨트롤러·FW · NAND) × 3단계 격자, 해법이 사는 칸을 채움. 3단계만 Blue로 위쪽 계층까지 채워진다 | 1 NAND를 SSD로(2000년대~): ECC · FTL · 웨어 레벨링, 여러 NAND를 하나로 / 2 SSD 기능 고도화(2010년대~): NVMe · 멀티 큐, QoS · 멀티테넌트 · 보안 / 3 서버와 함께(2020년대~): LMCache · vLLM · Dynamo, Linux write stream, FDP(OC-SSD · ZNS 이후), 워크로드 구성형 SSD |
| WAF 줄 | 단계별 값 | ≈ 3 / ≈ 3 근본 한계는 그대로 / 3 → 1 |
| 결론 밴드 | Blue 밴드 + 알약 3개 | NAND·SSD만 잘 만들어서는 안 됩니다. 서버와의 협력이 필수입니다 · 기술 · 인재 · 고객 협력 |

- 사용자 원고의 "XX 문제"는 **쓰기 전 소거(제자리 덮어쓰기 불가)와 수명 편차**로, "YY 문제"는 **데이터 수명 혼재(수명이 다른 데이터가 한 블록에 섞여 GC 복사가 생기는데, 데이터가 언제 지워질지는 SSD가 아니라 호스트가 안다)**로 채웠다([fdp-placement-mechanics.md](../../wiki/concepts/fdp-placement-mechanics.md) §1).
- LMCache는 **오픈소스 KV 캐시 관리 라이브러리**다. 스택에서는 AI 프레임워크 계층(추론 엔진 vLLM, 오케스트레이션 Dynamo와 함께)에 둔다.

## 3장 실행 전략: 계약 · 사람 · 역량 (v1.1)

**제목**: 계약에 기술 협력을 묶고, 고객 안에 사람을 두고, AI 데이터센터 운영자 수준의 시스템 SW 역량을 갖춰야 합니다

> **v1.0 → v1.1 (사용자 피드백)**: v1.0의 "기술 · 인재 · 고객 협력 × 3단계" 로드맵 표는 글이 많고 메시지가 흐렸다. Micron ↔ Anthropic 전략적 계약(SCA)과 Palantir FDE를 벤치마크로 세 가지 핵심 메시지를 **지금 → 앞으로** 그림으로 바꿨다.

| 열 | 핵심 메시지 | 벤치마크 줄 | 지금 (그레이) | 앞으로 (Blue) | 캡션 |
|---|---|---|---|---|---|
| ① 계약: 물량에 기술 협력을 | 장기 물량 계약만이 아니라 기술 협력을 함께 맺는다 | Micron ↔ Anthropic 로고, 2026-06 | "장기 물량 계약 (LTA)": 수량과 가격만 약속 | 적층 4단: 다년 공급(물량) → **공동 설계 · 최적화** → 운영 통합 → 자본 연계(점선, 선택). 가운데 두 단을 "기술 협력" 괄호로 묶음 | 물량 위에 기술 협력을 쌓습니다 |
| ② 사람: 고객 안에 상주 (FDE) | 간헐적 미팅·스펙 문서를 넘어 사람이 교류하고 상주하는 협업. 그 안에서 수요를 함께 만든다 | Palantir 심볼 + "Palantir FDE", Anthropic · OpenAI도 채택 | 삼성 ··· 문서 도형 ··· 고객: "스펙 문서 · 간헐적 미팅: 명시된 요구만 오갑니다" | 삼성 제품·로드맵 줄 ↓ **사람** / ↑ **실제 요구 → 제품** 순환, 고객 AI 데이터센터 경계 안에 삼성 Pod(Blue 3명)와 고객 엔지니어(그레이 2명)가 "매일 함께" | 고객 안에서 실제 요구를 찾고, 수요를 함께 만듭니다 |
| ③ 역량: 고객처럼 운영하는 눈 | 그동안 없던 시스템 SW, 특히 AI 데이터센터를 운영하는 고객 입장의 전문성 | "고객의 지표: 토큰당 비용 · 전력 · GPU 가동률" | 층별 현재: NAND·SSD FW 강점, 커널·I/O 일부, KV 캐시 SW 기여 0, AI DC 운영 없음 | "필요한 기술" 칸에 대표 기술명: AI DC 운영 = TCO 모델 · 추론 SLO / KV 캐시 SW = Dynamo · Mooncake (지금 칸 "LMCache") / 커널 · I/O = io_uring · GDS · NIXL (부족한 세 층 진한 Blue) / SSD FW = FDP · WAF 텔레메트리 (강화, 중간 Blue) / NAND = 연한 Blue(유지) | 시스템 SW와 AI 데이터센터 운영 역량 |

- 밴드(시작): 전략 고객 1~2사와 기술 협력 계약 · Co-Design Pod 상주 · 시스템 SW 전문가 채용.
- **FDE 필요성의 그림**: 수요를 함께 만든다는 것은 ②의 세로 순환이다. 사람이 고객 안으로 들어가고(↓), 현장에서 찾은 실제 요구가 제품이 되며(↑), 그 제품이 다시 고객의 수요가 된다. Palantir의 "현장 해법 → 제품 표준(gravel road → paved highway)"과 같은 구조다.
- **벤치마크 범위**: Micron ↔ Anthropic 계약의 4요소(공동 최적화 · 다년 공급 · 운영 통합 · 전략 투자)는 공개된 구성만 썼고 재무 조건은 비공개다. 자본 연계는 개발실 범위를 넘으므로(2026-09-19 덱 범위 결정) 점선 "(선택)"으로 둔다.
- **KV 캐시 기여 정정(2026-09-28)**: 초안의 "KV 캐시 관리자 4종에 삼성 기여 0"은 README 기준 판정이었고, 커밋 전수 조사로 LMCache에서 틀렸음이 확인됐다. 역량 구획의 근거 줄은 "LMCache: 삼성 Committer · FDP 배치 머지 / Mooncake · FlexKV · Dynamo: 기여 0"으로, "지금" 칸은 "LMCache"(일부), 필요한 기술은 "Dynamo · Mooncake"로 고쳤다. LMCache 블로그의 PM9D3a FDP 실측(WAF 2.600 → 1.425)은 원문 미열람(🟡)이라 슬라이드에는 넣지 않고 노트에도 쓰지 않았다.
- **"고객의 지표"**는 AI 데이터센터 운영자가 쓰는 말(토큰당 비용 · 전력 · GPU 가동률)로 적은 개념 줄이다. 근거는 Micron ↔ Anthropic의 공동 분석 서술과 송용호 인터뷰("상쇄 불가한 축은 파워 · 원가 · 품질")다.
- v1.0의 3단계 로드맵(출하 시 구성 → 운영 중 조정 → 워크로드 구성형 플랫폼, 계약의 창 2026 4Q ~ 2027 상반기)은 발표자 노트와 [qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md)에 남긴다.

## 근거 표

| 슬라이드 수치 | 값 | 출처 | 위키 |
|---|---|---|---|
| HBM 점유율 2022 · 2023e | SK 50 / 삼성 40 → SK 53 / 삼성 38 (%) | TrendForce 2023-04-18 | [qlc-v9-hbm3-designin-causes-2026-09.md](../../sources/articles/qlc-v9-hbm3-designin-causes-2026-09.md) C-08 · [hbm3-designin-lesson.md](../../wiki/concepts/hbm3-designin-lesson.md) |
| HBM 점유율 2024 | SK 54 / 삼성 39 | [hbm-market.md](../../wiki/concepts/hbm-market.md) 점유율 표 | 같은 페이지 |
| HBM 점유율 2Q25 · 3Q25 · 1Q26 | 62/17 · 57/22 · 약 58/약 32 | Counterpoint | [hbm-market.md](../../wiki/concepts/hbm-market.md) |
| DRAM 점유율 1위 교체 (원고) | 1Q25 SK하이닉스 36% > 삼성 34%, 33년 만 (4Q25 삼성 1위 탈환) | TrendForce · Korea Herald | [dram-market-share.md](../../wiki/concepts/dram-market-share.md) |
| eSSD 수요 · KV 캐시 · QLC 비중 | 155 → 265 → 1,000EB, KV 350EB, QLC 4 → 55% | 과제팀 모델(TrendForce 실측 + TechInsights DC NAND 전망 + SanDisk KV 캐시 전망), 2026 이후 전망 | [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) §4 · `assets/qlc_model.csv` |
| Meta QLC 서버 밀도 목표 | TLC 서버의 6배 | Meta 2025-03 🟡 | [qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) |
| DWPD 현 수준 | QLC 0.3~0.6 (Kioxia LC9 0.3, 삼성 BM1773 0.6), TLC 1 (Kioxia CM10 RI) | 벤더 정격 | [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) · [qlc-ssd-market.md](../../wiki/concepts/qlc-ssd-market.md) |
| AI 요구 3~30 | 3 = KV 캐시용 TLC 정격(Kioxia CM10 MU, Solidigm D7-PS1030), 30 = 고객 요구 `[사내 확인]` | 벤더 정격 · 사내 | [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §3 |
| 30 이상은 SLC급 | 정격 30 DWPD 이상 출하 제품은 모두 SLC급 NAND 또는 SCM | 원장 wcssd-v1 §1 | [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §2 |
| 호스트 협력 규격 연혁 | Open-Channel(FAST'17) · ZNS(TP4053, 2020-06) · FDP(TP4146, 2022-11) · Linux 6.16 write stream(2025) | NVM Express · USENIX · Phoronix | [solution-ladder-component-to-system.md](../../wiki/concepts/solution-ladder-component-to-system.md) |
| WAF 3 → 1 | FDP 범용 실측(랜덤 50% 사용률 약 3 → 약 1), CacheLib 3.22 → 1.03 | 삼성·NVM Express, EuroSys'25 | [fdp-placement-mechanics.md](../../wiki/concepts/fdp-placement-mechanics.md) |
| 인터뷰 | 신문섭(Bain, 2026-06-18) · 송용호(2026-09-03) | 과제팀 인터뷰 | [qlc-execution-strategy.md](../../wiki/strategies/qlc-execution-strategy.md) §2.0 |
| Micron ↔ Anthropic 전략적 계약 | 2026-06-22, 공동 최적화 · 다년 공급 · 운영 통합 · Series H 전략 투자, 재무 조건 비공개 | Micron IR 외 | [micron-anthropic-sca-2026-06-22.md](../../sources/articles/micron-anthropic-sca-2026-06-22.md) |
| Palantir FDE | 고객 환경 상주, "한 고객, 많은 능력", 성과로 평가, 명시 요구와 실제 요구의 간극, Anthropic · OpenAI 채택 | Pragmatic Engineer 외 | [palantir-fde-model-2026-07.md](../../sources/articles/palantir-fde-model-2026-07.md) |
| KV 캐시 관리자 기여 (2026-09-28 정정) | LMCache: 삼성 Committer 1명, 삼성 연결 커밋 62 / 2,394건, NVMe FDP 배치 머지(2026-08-05, PR #4016) · Mooncake · FlexKV · Dynamo KVBM: 0건 | GitHub 커밋 전수 ✅ | [samsung-kv-cache-activities-2026-09.md](../../sources/articles/samsung-kv-cache-activities-2026-09.md) · [qlc-workload-capability-phases.md](../../wiki/strategies/qlc-workload-capability-phases.md) §4.2 |

## 이미지 자산

- **로고**: `assets/logos/`(samsung · sk-hynix · nvidia · meta · google · microsoft · aws · micron · anthropic · palantir). 삼성·SK하이닉스·Huawei는 이번에 `@iconify-json/logos`·`simple-icons` npm 패키지에서 렌더해 추가. 사내 보고용 식별 표시.
- **부품 이미지**: 작업 환경에서 외부 이미지 호스트(Wikimedia·언론·벤더 사이트) 접근이 막혀 **실물 사진 대신 3D 렌더**(`scripts/render_parts/`, three.js + headless Chromium)로 만들었다. `assets/photos/`에 같은 이름(`nand` · `dram` · `hbm` · `ssd` · `server`)의 공식 사진을 넣고 스크립트를 다시 돌리면 자동으로 교체된다.

## 재생성

```bash
.venv/bin/python outputs/presentation/scripts/generate_ssd_survival_charts.py
.venv/bin/python outputs/presentation/scripts/generate_ssd_survival_pptx.py
# 부품 렌더·로고 재생성(선택): cd outputs/presentation/scripts/render_parts && npm i && node render.mjs <출력 폴더> all
```
