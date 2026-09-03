# DT-B 수요 효율화 신호 실측 — 웹 리서치 (2026-08-28)

**수집일**: 2026-08-28
**수집 방법**: 웹 검색 교차 (Stanford HAI·Epoch AI·arXiv·TrendForce 보도·Tom's Hardware·Futurum·ppc.land·BigGo·a16z 등). 검색 엔진 결과 요약 기반이며 일부 원문(TrendForce 본문)은 프록시 차단으로 직접 열람 불가 — 해당 항목은 복수 2차 보도로 교차 확인.
**수집 목적**: DT-B 「긴 하산」(수요발×침식, 원단위 효율화) 발현 근접도 평가 슬라이드의 소스. 위키 갭 4종 보강 — ① 토큰당 추론 비용 하락률 실측, ② 모델·시스템 계층의 메모리 원단위 절감 실측, ③ 가속기당 HBM 탑재량·HBM 비트수요 전망 추이, ④ 상쇄력(토큰 총소비 폭증) 실측.
**신뢰도**: Medium-High (기관 발표·논문·복수 매체 교차. 단 2027E 전망치는 기관 추정이며, TrendForce 수치는 2차 보도 경유)
**한계**: 판단 없이 팩트만 기록. "토큰당 메모리(GB) 소요"의 직접 실측 통계는 공개 소스에서 확인 불가 — 비용·KV캐시·FLOPs 프록시로 대체. 서버 1대당 DRAM 탑재량의 산업 평균 시계열도 공개 통계 확인 불가.

---

## §1. 토큰당 추론 비용 — 실측 하락률

- **Stanford AI Index 2025**: GPT-3.5 동급 성능 모델의 쿼리 비용 — 2022-11 **$20/백만 토큰 → 2024-10 $0.07/백만 토큰**, 약 18개월간 **280배 하락**.
- **Epoch AI** (LLM inference price trends): 특정 성능 마일스톤 달성 비용의 연간 하락률은 벤치마크에 따라 **연 9배~900배**, **중앙값 연 50배**. 2024-01 이후로는 중앙값 **연 200배**로 가속. GPT-4의 박사급 과학 문제 성능 달성 가격은 **연 40배** 하락.
- **장기 추세**: GPT-3급 산출물 비용 — 2021년 말 $60/백만 토큰 → 2024년 말 $0.06 (**3년간 약 1,000배**).
- **전망(추정)**: 2027년까지 연 3~5배 하락 후 연 1.5~2배로 감속 예상 (aiSuperior 등 업계 추정 — 확정 아님).

## §2. 모델·시스템 계층의 메모리 원단위 절감 — 2026 실측

- **DeepSeek-V4-Pro** (arXiv 2606.19348, 2026): 100만 토큰 컨텍스트 설정에서 이전 버전 대비 **단일 토큰 추론 FLOPs 27%, KV 캐시 10%만 소요** (= KV 캐시 메모리 원단위 90% 감소).
- **Lookahead Sparse Attention (LSA)** (arXiv 2606.09079, 2026): DeepSeek-V4 아키텍처 기반 — 쿼리 임계 KV 청크만 GPU 메모리에 보존, 압축 HCA 청크 **128:1 압축률**로 전역 컨텍스트 유지.
- 계보: MLA(Multi-head Latent Attention, DeepSeek-V2)의 KV 캐시 저랭크 압축 → MQA/GQA → 2026년 sparse attention 계열로 확산 중.

## §3. CXL·메모리 계층화의 실배치 — 서버당 DRAM 절감 실측

- **Meta**: 재활용 DDR4를 CXL 뒤에 배치해 **수백만 대 서버** 규모로 운용 중 — 일부 추론 워크로드에서 **서버 대수 최대 25% 절감** (Tom's Hardware, Marvell 인용, 2026).
- **하이퍼스케일러 CapEx 중 메모리 비중**: 2023~24년 약 8% → 2026년 **약 30%**로 급등 (동일 보도) — 메모리 비용 압박이 CXL 채택의 동인.
- CXL 기반 아키텍처의 하이퍼스케일러 TCO 절감 추정 **15~25%** (Marvell·Futurum·업계 보도, 2026). Marvell Structera 플랫폼 하이퍼스케일러 출하 개시, FMS 2026에서 단일 CXL 스위치 뒤 48TB 풀링 시연.
- 성격 유의: 2026년 CXL 채택 서사의 상당 부분은 "DRAM 부족·고가에 대한 대응"(부족발)으로 보도됨 — 수요 효율화(원단위 하락)와 공급 부족 대응이 혼재.

## §4. 가속기당 HBM 탑재량 — 하향 조정 보도

- **Rubin Ultra**: 원계획 **HBM4E 1TB**/GPU (2027 H2, 업계 최초 1TB) → 2026-08-04 TrendForce발 보도로 **최저 256GB(또는 192GB 8-Hi, -33%~-81%) 구성 검토** 중. NVIDIA가 4개 HBM 구성을 병행 평가.
- **하향의 명시된 이유**: 수요 효율화가 아니라 **2027년까지 심화되는 DRAM·HBM 공급 부족** (SK하이닉스·삼성·마이크론 3사 공급 제약) — TrendForce "DRAM Supply to Remain Tight in 2027, Prompting NVIDIA to Lower HBM Configurations for Rubin Ultra" (2026-08-04, 본문 직접 열람 불가·Seoul Economic Daily/KuCoin/BigGo 교차).
- 파급 보도: GPU당 메모리가 줄면 동일 워크로드에 더 많은 GPU 필요(전력·랙·인터커넥트 비용 증가) — 총 GPU 수요 상방 요인으로 해석하는 보도 병존.

## §5. HBM 비트수요·메모리 시장 전망 추이

- **TrendForce HBM 비트수요 성장률**: 2025 **+130%+ YoY** → 2026 **+70%+ YoY** → 2027 **+50~60% YoY** (증가율 3년 연속 감속 전망 — 단 "여전히 수요 대비 공급 부족" 판단 병기).
- **HBM 웨이퍼 투입 비중**(3사 DRAM 웨이퍼 중): 2025년 말 ~18% → 2026 ~22% → 2027 ~30%. HBM 비트 비중은 총 DRAM 비트의 8% → 9% → 13%.
- **시장 규모 전망은 하향이 아니라 대폭 상향**: TrendForce 2026 글로벌 메모리 시장 $551.6B → **$889.3B**로 상향, 2027 $842.7B → **$1.28T+** (YoY ~+44%) — "Agentic AI가 메모리 수요의 구조적 확장 견인" (2026-05-29).
- 2027 분화 전망: DRAM 공급 타이트 지속, NAND는 완화 (TrendForce 2026-07-30).
- HBM 계약가: 2027년 "배수(multiples) 상승" 전망 (TrendForce 2026-06-02).

## §6. 상쇄력 — 토큰 총소비의 폭증 실측 (Jevons)

- **Google**: 월 **3.2 quadrillion(3,200조) 토큰** 처리 (I/O 공개), **YoY 7배**.
- **OpenRouter**: 주간 토큰 볼륨 2025-11 ~5조 → 2026 여름 **31~33조** (약 6배). 2025-01 → 2026-04 토큰 사용량 **+1,001%**.
- **가격-지출 역설**: 토큰 가격 2023년 이후 **-90%+** 하락했으나 기업 AI 총지출은 2025년 말 이후 **2배** — Jevons 패러독스 사례로 보도 (BigGo·a16z 등).
- **에이전트 효과**: AI 에이전트는 인간 사용자 대비 **5배** 토큰 소비 (OpenRouter 데이터, ppc.land). 프로그래밍 토큰 비중 2025 초 ~11% → 2026-03 **50%+**.
- **전망(추정)**: Goldman Sachs — 2030년 글로벌 토큰 소비 월 120 quadrillion (현재 대비 **24배**).

## 원본 링크

- Stanford HAI — AI Index 2025: State of AI in 10 Charts: https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts
- Epoch AI — LLM inference prices have fallen rapidly but unequally across tasks: https://epoch.ai/data-insights/llm-inference-price-trends
- aiHola — AI Now Costs 280 Times Less Than Two Years Ago: https://aihola.com/article/ai-inference-cost-decline-2025
- TokenCost — AI Price Index: LLM Costs Dropped 300x (2023-2026): https://tokencost.app/blog/ai-price-index
- arXiv 2606.19348 — DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence: https://arxiv.org/html/2606.19348v1
- arXiv 2606.09079 — FlashMemory-DeepSeek-V4: Lightning Index Ultra-Long Context via Lookahead Sparse Attention: https://arxiv.org/abs/2606.09079
- Tom's Hardware — Marvell VP pushes for DDR4 recycling for use in CXL memory: https://www.tomshardware.com/pc-components/dram/marvell-sells-cxl-memory-recycling-into-the-worst-dram-shortage-in-years
- Futurum — Marvell Scales AI Memory to 48TB Behind a Single CXL Switch at FMS 2026: https://futurumgroup.com/insights/marvell-scales-ai-memory-to-48tb-behind-a-single-cxl-switch-at-fms-2026/
- HPCwire — What Hyperscalers Should Know About CXL (2026-08-20): https://www.hpcwire.com/2026/08/20/what-hyperscalers-should-know-about-cxl/
- TrendForce — DRAM Supply to Remain Tight in 2027, Prompting NVIDIA to Lower HBM Configurations for Rubin Ultra (2026-08-04): https://www.trendforce.com/presscenter/news/20260804-13166.html
- Seoul Economic Daily — Nvidia Weighs Cutting HBM Capacity for Rubin Ultra (2026-08-07): https://en.sedaily.com/international/2026/08/07/nvidia-weighs-cutting-hbm-capacity-for-rubin-ultra
- BigGo Finance — Nvidia Weighs Slashing Next-Gen AI Chip HBM Capacity by Up to 81%: https://finance.biggo.com/news/732d7473-dcae-467e-8108-6768e433a198
- Tom's Hardware — Nvidia demonstrates Rubin Ultra tray, world's first AI GPU with 1TB of HBM4E: https://www.tomshardware.com/pc-components/gpus/nvidia-demonstrates-rubin-ultra-tray-worlds-1st-ai-gpu-with-1tb-of-hbm4e
- TrendForce — Tight DRAM Supply Gives Suppliers Greater Pricing Power in HBM (2026-06-02): https://www.trendforce.com/presscenter/news/20260602-13074.html
- TrendForce — Diverging Memory Market Outlook in 2027 (2026-07-30): https://www.trendforce.com/presscenter/news/20260730-13158.html
- TrendForce — Agentic AI Drives Structural Expansion in Memory Demand, $1.28T by 2027 (2026-05-29): https://www.trendforce.com/presscenter/news/20260529-13068.html
- ppc.land — AI agents use five times more tokens than humans, OpenRouter data shows: https://ppc.land/ai-agents-use-five-times-more-tokens-than-humans-openrouter-data-shows/
- SGNL — Jevons Paradox: Why Every AI Optimization Makes the Hardware Shortage Worse (2026-03-28): https://sgnl.blog/2026-03-28-jevons-paradox-inference/
- BigGo Finance — The AI Economy Paradox: More Efficient Models, Spiraling Costs: https://finance.biggo.com/news/e257398b-9b5d-409c-8c6d-d8939c28bc82
- a16z — We heard you like Jevons: https://www.a16z.news/p/jevons-or-bust
- Mandar's Blog — The Machines Are Talking to Themselves (2026-02-20): https://mandar.dev/2026/02/20/i-thought-moores-law-was-fast/
