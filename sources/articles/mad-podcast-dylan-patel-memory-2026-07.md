# MAD Podcast (Matt Turck) × Dylan Patel — 메모리 부족·KV 캐시·CPO 지연 (2026-07)

**수집일**: 2026-08-05
**원문**: [Apple Podcasts 에피소드 (사용자 제공 링크)](https://podcasts.apple.com/kr/podcast/the-mad-podcast-with-matt-turck/id1686238724?i=1000779102407)
**프로그램**: The MAD Podcast with Matt Turck (FirstMark Capital) — Dylan Patel(SemiAnalysis 창업자·수석 애널리스트) 2번째 출연 (1번째: 2026-02-05 "NVIDIA's New Moat & Why China is Semiconductor Pilled")
**발행 시점**: 2026년 7월 초 (2차 보도 기준 수집일로부터 약 4주 전)
**수집 방법**: 이 환경에서 원문(오디오·트랜스크립트) 직접 접근이 차단되어, 에피소드를 다룬 2차 보도 3건으로 내용을 수집·교차 확인 — [Podcast Alpha 요약](https://podcastalpha.substack.com/p/dylan-patel-of-semianalysis-the-11m) ("The $11M Bill, the Memory Shortage, and Why CPO Is Two Years Late"), [BigGo Finance](https://finance.biggo.com/news/a1dcef9e-e3c8-4481-86eb-5b33be414e37) ("Memory Still Has Room to Double, CPO Mass Production Delayed to 2029"), [KuCoin 플래시](https://www.kucoin.com/fil/news/flash/semianalysis-founder-dylan-patel-predicts-memory-shortages-to-continue-cpo-deployment-delayed-until-2028-2029). 에피소드 식별은 사용자 제공 Apple 에피소드 ID + 2차 보도 시점·주제 대조로 특정(공식 에피소드 제목은 미확정 — 원문 접근 차단).

---

## 1. 메모리 — 다년(multi-year) 구조적 부족, 가격 상방 2~3배

- **핵심 주장**: 메모리는 다년 구조적 부족 국면이며 **가격 상방 여력 2~3배(2-3x upside)**. "메모리 랠리는 끝나지 않았다" — 몇 달이 아니라 **몇 년 단위로 지속**된다는 구조적 논거.
- **공급 측 논거** (팟캐스트 및 동일 시기 발언 교차): 메모리 업체들이 2025년 말부터 수요 신호에 대응하기 시작했으나 **진짜 증분 공급(true incremental supply)은 2028년에야 도래** — 팹은 연간 캐파의 **20~30%만 증설 가능**. 같은 논거의 직접 인용은 Invest Like the Best EP.468(2026-04): "**DRAM은 여기서 2~3배 더 오른다. 그만큼의 캐파가 필요하기 때문**" ([Yahoo Finance 2026-04-23](https://finance.yahoo.com/markets/stocks/articles/dram-double-triple-ai-demand-190647891.html), [24/7 Wall St.](https://247wallst.com/personal-finance/2026/04/23/dram-will-double-or-triple-from-here-as-ai-demand-outpaces-supply-chain-capacity/)).
- **수요 측 메커니즘 — KV 캐시**: 추론·에이전트 워크로드의 **KV 캐시(KV cache)가 다년 메모리 부족을 구동하는 핵심 메커니즘**. 긴 컨텍스트·멀티턴 에이전트일수록 KV 캐시가 DRAM/HBM 용량을 선점 — 추론 시대의 메모리 수요는 학습 시대보다 용량 탄성이 크다.
- **컨슈머 전치(displacement)가 랠리의 재원**: 스마트폰·PC 등 **컨슈머 일렉트로닉스로 가던 메모리 물량이 AI로 전치**되며 그 가격 충격이 랠리를 지탱 — 부족의 부담을 컨슈머 시장이 지불하는 구조.

## 2. Anthropic — FCF 전환·수익성

- Patel은 **Anthropic의 흑자 전환(FCF turn)** 세부를 언급 — 2차 보도 기준 **연환산 매출 $50B+ 및 수익성 달성**(토큰 효율성·매출 지표 관련 세부 포함). *(2차 보도 경유 수치 — 원문 검증 전까지 Patel 주장으로 취급)*
- 함의: "AI가 돈을 버는가"라는 수요 지속성 마스터 변수에 대한 **긍정 방향의 구체 사례** — 프론티어 랩 중 최초 수준의 FCF 전환 주장.

## 3. 네트워킹 — CPO 양산 2029년 지연, 구리 붐 연장

- **CPO(Co-Packaged Optics) 양산은 2029년으로 지연** — 시장(Street)은 2027년 램프를 기대하지만 Patel은 2029년으로 본다. "2026년 최고 인기 네트워킹 트레이드는 아마 2년 이르다"며 구체 타임라인·GPU 세대 근거 제시.
- 그 결과 **구리 케이블(copper) 붐이 예상 밖으로 연장** — 광학 전환 지연의 수혜.
- **NVIDIA 800V(HVDC) 전력 로드맵** 세부도 논의 — 데이터센터 전력 아키텍처 전환 맥락.

## 4. 기타

- 에피소드 제목의 "**$11M Bill**"은 2차 보도에서 세부 맥락 미확인 (컴퓨트 비용 관련 일화로 추정 — 추정임을 명시).
- 직전 출연(2026-02-05)의 논지(NVIDIA 포트폴리오 전략 전환·추론 특화·중국 "semiconductor pilled"·CapEx 버블 vs 필연 논쟁)는 별도 에피소드 — 본 파일 범위 밖.

---

## 위키 함의 (수집자 요약)

1. **가격 전망 상향 근거**: 위키 기존 수집(DRAM Q3 +13~18% 감속 조짐)과 대비되는 **강세 지속론** — "감속은 정점 신호 vs 다년 부족의 중간 조정" 해석 대립을 명시적으로 기록할 가치.
2. **KV 캐시 메커니즘**: 권석준(추론 100배)·이창수(AI 프론티어 시가 시장)와 수렴하되, **수요의 기술적 미시 메커니즘**(KV 캐시→용량 선점)을 처음으로 명시한 소스.
3. **Anthropic FCF 전환**: 신문섭·최장석·이창수 3자 공통 축 "AI 수익화·현금흐름이 마스터 변수"에 대한 실측 방향의 첫 긍정 데이터 포인트(주장 단계).
4. **공급 2028 도래**: "진짜 증분 공급 2028" = 시나리오 C/D(공급 과잉 반전)의 시점 가늠자 — 최장석 "shortage→oversupply 급반전" 리스크의 시간축과 일치.
