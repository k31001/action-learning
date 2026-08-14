# 하이퍼스케일러 Q2 2026 CapEx 실적 + GPU 임대가 스냅샷 — 웹 리서치 (2026-08-11)

**수집일**: 2026-08-11
**수집 방법**: 웹 검색 교차 (CNBC·Yahoo Finance·Futurum·ValueAddVC·getdeploying·Jarvislabs·Thunder Compute 등)
**수집 목적**: 2026-08-11 시나리오 포지션 맵 정기 재평가 입력 — 07-28 재평가가 "다음 주 DF1 핵심 확인 이벤트"로 지목한 Microsoft·Meta·Amazon Q2(07-29·07-30) 실적의 실현 결과 확인, GPU 임대가(Tier0 최선행) 최신 스냅샷.
**신뢰도**: Medium-High (동시대 실적 보도 + 복수 트래커 교차. 개별 가이던스 수치는 매체 간 소폭 상이 가능)

---

## §1. 빅테크 4사 2026 CapEx — Q2 실적 후 상향 (전원 상향, 삭감 0건)

07-28 재평가 시점의 4사 합산 기준선은 ~$725B(+77% YoY vs 2025 $410B). Q2 실적 발표(Alphabet 07-22, Microsoft·Meta 07-29, Amazon 07-30) 후 **네 곳 모두 가이던스를 상향**:

| 기업 | 07-28 기준선 | Q2 실적 후 상향 |
|---|---|---|
| **Amazon** | $200B | **~$220B** (2026 상향) |
| **Alphabet(Google)** | $175~185B → $195~205B(07-22) | $195~205B 유지 |
| **Meta** | $115~135B | **하한 상향 $130~145B** |
| **Microsoft** | ~$190B(2026) | ~$190B, **FY2027 $255~260B로 상향** |

- 4사 합산 2026 ≈ **~$745~750B** (Amazon $220 + Google $200 + Meta $137 + MS $190 중간값) → 2025 $410B 대비 **~+82% YoY** (직전 +77%에서 소폭 상향).
- 공통 프레이밍: "수요 견인 지출" — **장기 자산(토지·전력·셸)은 조기 확약, 단기 자산(칩)은 필요 몇 달 전에 결정**하는 디리스킹 플레이북 4사 공통.
- **삭감(YoY -25%) 발표 0건** — `bigtech_capex_cut25` 트리거 미발동, 정반대 방향.

## §2. FCF 다이버전스 — 후기순환 tell이 실측으로 등장

07-28~08-04 재평가가 이창수 부사장 프레임("진짜 꼭짓점은 CapEx가 아니라 FCF — CapEx↑인데 FCF 흑자→마이너스 반전")으로 **선행 관전 대상**으로 지목한 CapEx-vs-FCF 다이버전스가 Q2 실적에서 **가시화**:

- **Meta**: 분기 잉여현금흐름(FCF) **-91% 급감 → $784M** (CapEx 급증분이 현금흐름을 압박).
- **Amazon**: 후행 12개월(TTM) FCF **마이너스 전환 (~-$7.6B)** — Meta에 이은 두 번째 하이퍼스케일러.
- 해석: CapEx 절대 성장은 여전히 상방(전원 상향)이나, **자기자본·현금흐름 기반이 부채·SPV·미래 리스크 매수 쪽으로 이동**하는 후기순환 신호. 단 이는 **수요 붕괴가 아닌 조달 구조 경보** — CapEx 자체는 상승, 핸드투마우스 재고 없음, 백로그(Google Cloud $514B) 견조.

## §3. GPU 현물 임대가 스냅샷 (Tier0 최선행) — firming/flat, 붕괴 없음

| GPU | 08-11 스냅샷 | 직전(07-28) |
|---|---|---|
| **H100** 온디맨드 | 중앙값 ~$2.69/h (Jarvislabs), 범위 $1.49~6.98 (스팟 ~$1.03~2.00) | ~$3.46/h |
| **H200** 온디맨드 | ~$3.99/h(Jarvislabs)·복수 공급사 중앙값 ~$4.38/h (스팟 ~$1.99) | ~$4.11/h |

- H200 중앙값 소폭 상승(~$4.11 → ~$4.38), H100은 공급사별 분산 큼 — **전반적으로 firming/flat, 6개월 -35% 급락 신호 없음** → `gpu_rental_collapse` 트리거·수요 변곡 조기경보 미발동.
- 하이퍼스케일러 자체 클라우드(AWS·Azure)는 프리미엄, 전문 GPU 클라우드는 경쟁적 — 가격 분산이 큼.

## §4. 재평가 함의 (요약)

- **DF1(AI 수요)**: 4사 CapEx 전원 상향 = 이미 정점(8.5)인 축의 **재확인**(신규 상방 레그 아님). FCF 다이버전스는 후기순환 tell의 **실측 등장**이나 수요 붕괴가 아닌 조달 경보 → **DF1 8.5 유지**, EWI `demand_inflection_divergence`·`bigtech_capex_growth`(FCF 렌즈) 감시 강화.
- **DF2(미중)**: 본 수집분에 신규 미중 실현 사실 없음 → **무변화**.
- **시나리오 확률**: 상대 확률 변경 요인 아님(정점 재확인) → **A26·B39·C8·D21·E6 유지**.

## 원본 링크

- CNBC — Amazon, Meta and Microsoft face skeptical investors after Google report: https://www.cnbc.com/2026/07/28/hyperscalers-face-higher-capex-scrutiny-after-alphabet-report-panned.html
- Futurum — AI Capex 2026: The $690B Infrastructure Sprint: https://futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/
- Yahoo Finance — Meta, Microsoft, Amazon, Alphabet AI spending: https://finance.yahoo.com/sectors/technology/article/meta-microsoft-amazon-and-alphabet-are-about-to-spend-a-shocking-amount-of-money-to-dominate-the-ai-era-115359575.html
- ValueAddVC — AI Capex 2026: Where $725B Actually Goes: https://valueaddvc.com/blog/big-tech-ai-capex-in-2025-microsoft-google-meta-amazon-and-the-spending-race
- getdeploying — NVIDIA H200 Cloud Pricing (34+ providers): https://getdeploying.com/gpus/nvidia-h200
- Jarvislabs — NVIDIA H200 GPU Price (August 2026): https://jarvislabs.ai/blog/h200-price
- Thunder Compute — AI GPU Rental Market Trends (August 2026): https://www.thundercompute.com/blog/ai-gpu-rental-market-trends
