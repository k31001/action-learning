# AI 추론 하위 수요별 비트 수요(EB) 조사 원장 (2026-10-15)

**수집일**: 2026-10-15
**유형**: 웹 검색 + 1차 IR 자료(Kioxia PDF 직접 확인) 기반 수치 원장
**질문(사용자)**: 덱 2장 추론 하위 수요(모델 가중치 · RAG/벡터 DB · KV 캐시 오프로드 · 에이전트 메모리)별 2030년 bit demand. 없으면 다른 미래 시점, 그것도 없으면 현재 · 과거 비중.
**결론**: 네 하위 수요를 모두 EB로 나눈 공개 전망은 **찾지 못했다**. KV 캐시만 EB 전망이 있고(SanDisk), 나머지는 정성 진술이거나 단일 2차 출처다. 구조 비중의 대용치로 Solidigm의 1GW당 플래시 계층 분할이 있다.

표기: ✅ 1차 자료 직접 확인 / 🟡 2차 보도 · 요약 / ⚠️ 과제팀 산술 · 해석

## 1. 수치

| ID | 내용 | 수치 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|
| IB-01 | SanDisk: AI 데이터센터 플래시 2030년 약 1.2ZB = 학습 스테이징 480EB(40%) · **KV 캐시 420EB(35%)** · 빠른 데이터 레이크 300EB(25%). TLC 약 66% · QLC 약 34% | EB · % | 2030 (2026-08-13 Investor Day) | https://investor.sandisk.com/news-releases/news-release-details/sandisk-details-growth-strategy-and-long-term-financial-model · https://newsletter.bepresearch.com/p/the-write-problem-which-ai-bytes · https://counterpointresearch.com/en/insights/sandisk-investor-day-caching-out-the-nand-cycle-with-contracts | 🟡 (분할은 2차 요약 다수 일치) |
| IB-02 | SanDisk: KV 캐시만으로 2027년 NAND 75~100EB 추가 수요, 2028년 약 2배 | EB | 2027 · 2028 | 레포 기존 원장(essd-outlook-research-firms-2026-10 OT-08) · https://www.kucoin.com/news/flash/sandisk-predicts-kv-cache-to-drive-35-of-ai-data-center-nand-workloads-by-2030 | 🟡 |
| IB-03 | Kioxia Investor Day 2026(2026-06-02): 데이터센터 플래시 2025년 295EB → 2028년 909EB(CAGR 46%), 그 안에서 **추론 CAGR 86%**(Agentic AI · Physical AI · RAG · KV-cache 포함) · 학습 16% · Traditional 16%. 출처 TechInsights NAND Market Report Q2 2026. **용도별 EB 분할 없음** | EB · CAGR | 2025~2028 | https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/library/event/asset/Kioxia-Investor-Day-2026-en.pdf (p.15 · p.28) | ✅ |
| IB-04 | Kioxia 2025 전략 설명회: AI 관련 비트 수요 970EB('25E) → 2,044EB('29E), 추론 CAGR 69% · 학습 26%. SSD 용도로 "LLM fast loading & KV caching · RAG · snapshot & log · content store" 나열, **용도별 EB 없음** | EB · CAGR | 2025~2029 | https://www.kioxia-holdings.com/content/dam/kioxia-hd/en-jp/ir/event/asset/Kioxia-Corporate-Strategy-Meeting-2025-en.pdf (p.17 · p.24) | ✅ |
| IB-05 | Kioxia 추론 NAND 수요 86EB → 1,251EB(2031) | EB | 2031 | Dolphin Research 인용 https://dolphinresearch.substack.com/p/nand-flash-from-data-warehouse-to (Kioxia 원 자료에서 미확인) | 🟡 |
| IB-06 | Solidigm(Scott Shadley, AI Infrastructure Field Day 4, 2026-01-30): 1GW당 신규 플래시 약 25EB(GB300 기준 55만 GPU). Vera Rubin 계층 구성에서 **컨텍스트 메모리(CMX, KV 캐시) 6.4EB · 직접 연결(DAS) 6.1EB**, 나머지는 대용량 네트워크 스토리지 | EB/GW | 2026 | https://techfieldday.com/video/driving-storage-efficiency-and-the-impacts-of-ai-in-2026-with-solidigm/ | 🟡 (영상 요약, 원 슬라이드 미확인) |
| IB-06a | IB-06의 네트워크 스토리지 몫 = 25 − 6.4 − 6.1 ≈ 12.5EB → 비중 NAS 약 50% · CMX 약 26% · DAS 약 24% | % | 2026 | 과제팀 산술 | ⚠️ |
| IB-07 | Citrini Research(Zephyr): 영속 에이전트 메모리가 SanDisk 전망 위에 연 500~600EB 추가 가능 | EB/년 | 미상 | BEP Research 재인용 https://newsletter.bepresearch.com/p/the-write-problem-which-ai-bytes (Citrini 원문 미확인) | 🟡 단일 2차 |
| IB-08 | McKinsey: 2030 eSSD 1,078EB 중 AI 추론 447EB(KV 캐시 · RAG 포함, 분할 없음) | EB | 2030 | 레포 기존 원장 essd-demand-by-application-2030-2026-10 (AI-01 · AI-15) | 🟡 |
| IB-09 | TrendForce: 북미 CSP의 4Q26 eSSD 수요 상향 요인으로 벡터 DB의 고용량 QLC 사용, 중국은 KV 캐시 오프로드 | 정성 | 2026 4Q | https://coretechtips.com/news/enterprise-ssd-q4-2026-demand-qlc-trendforce (TrendForce 원문 미확인) | 🟡 |
| IB-10 | 벡터 저장 용량 원단위: 1024차원 float32 벡터 10억 개 ≈ 4TB(색인 전), 3072차원 FP16 10억 문서 ≈ 6TB | TB | 2025~2026 | https://introl.com/blog/rag-infrastructure-production-retrieval-augmented-generation-guide · https://plutux.ai/insights/20260716_nand_flash_industry_deep_dive | 🟡 · 산술 확인 ⚠️ |

## 2. 하위 수요별로 정리하면

| 하위 수요 | EB 전망 | 판단 |
|---|---|---|
| KV 캐시 오프로드 | 2027년 75~100EB(+) → 2028년 약 2배 → 2030년 420EB(AI DC 플래시의 35%) (IB-01 · 02) | **유일하게 EB 전망 있음** |
| RAG · 벡터 DB | 없음. Kioxia · McKinsey는 추론 안에 합산(IB-03 · 08), TrendForce는 QLC 견인 요인으로 정성 언급(IB-09) | 공백. SanDisk 분할에서는 "빠른 데이터 레이크"(300EB)와 겹칠 가능성 ⚠️ 해석 |
| 모델 가중치 | 없음. Kioxia는 "LLM fast loading"으로 용도만 나열(IB-04) | 공백. 모델 수 × 크기라 EB 규모는 작을 것 ⚠️ 해석 |
| 에이전트 메모리 | 연 500~600EB 추가 가능(Citrini, 단일 2차, IB-07) | 근거 약함 |

**구조 비중 대용치**: 1GW AI 데이터센터 신규 플래시 약 25EB 중 KV 캐시 전용 CMX 약 26%, 서버 직접 연결(가중치 로딩 · 로컬 캐시) 약 24%, 네트워크 스토리지(데이터 레이크 · RAG DB · 체크포인트 · 에이전트 상태) 약 50% (IB-06 · 06a, 계층과 하위 수요의 대응은 ⚠️ 해석).

## 3. 확보 실패

- 하위 수요 네 가지를 모두 나눈 EB · % 전망(TrendForce RP260612EF · RP260828HR 등 유료 보고서 본문은 미확인)
- RAG · 벡터 DB의 EB 전망, 모델 가중치 저장 EB, 에이전트 메모리의 1차 출처
