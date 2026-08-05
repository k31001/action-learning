# MAD Podcast (Matt Turck) × Dylan Patel — 메모리 부족·KV 캐시·CPO 지연 (2026-07)

**수집일**: 2026-08-05 (1차) / **보강**: 2026-08-05 (2차 — 사용자 제공 유튜브 링크 계기로 디테일 확장)
**원문**: [Apple Podcasts 에피소드](https://podcasts.apple.com/kr/podcast/the-mad-podcast-with-matt-turck/id1686238724?i=1000779102407) · [YouTube 영상 (사용자 제공)](https://youtu.be/3FHsGiONOGw)
**프로그램**: The MAD Podcast with Matt Turck (FirstMark Capital) — Dylan Patel(SemiAnalysis 창업자·수석 애널리스트) 2번째 출연 (1번째: 2026-02-05 "NVIDIA's New Moat & Why China is Semiconductor Pilled")
**발행 시점**: 2026년 7월 초 (녹음 시점 근거: "6월 마감 전" 언급 → 6월 말~7월 초 녹음)
**수집 방법**: 이 환경에서 원문(오디오·유튜브·Apple 페이지) 직접 접근이 차단되어, 에피소드를 다룬 2차 자료로 수집·교차 확인 — [Podcast Alpha 상세 요약](https://podcastalpha.substack.com/p/dylan-patel-of-semianalysis-the-11m) ("The $11M Bill, the Memory Shortage, and Why CPO Is Two Years Late"), [Jukan(@jukan05) 테이크어웨이 스레드](https://x.com/jukan05/status/2075453653662769476), [TradingKey (Marvell 하락 분석)](https://www.tradingkey.com/analysis/stocks/us-stocks/262023275-marvell-mrvl-nvidia-rubin-feynman-used-copper-cable-cpo-put-off-2029-tradingkey), [BigGo Finance](https://finance.biggo.com/news/a1dcef9e-e3c8-4481-86eb-5b33be414e37), [KuCoin 플래시](https://www.kucoin.com/fil/news/flash/semianalysis-founder-dylan-patel-predicts-memory-shortages-to-continue-cpo-deployment-delayed-until-2028-2029). 에피소드 식별은 사용자 제공 Apple 에피소드 ID·유튜브 링크 + 2차 자료 시점·주제 대조.

---

## 1. "$11M Bill" — SemiAnalysis 자체 AI 지출의 수요 미시 표본

- 에피소드 제목의 "$11M Bill"은 **SemiAnalysis 자신의 AI(추론 컴퓨트) 지출**: 8개월 만에 연환산 **$100K 미만 → $11M**으로 폭증. 현재 **전체 인건비의 약 1/3** 수준이며 연말이면 **절반**에 이를 전망.
- 함의: 소규모 리서치 회사조차 AI 지출이 인건비와 맞먹는 속도로 증가 — **토큰 수요의 미시 표본**으로서 "AI 수요는 실재하며 가격 비탄력적"이라는 그의 거시 주장(시가 시장)을 자기 회계로 예증.

## 2. 메모리 — 다년(multi-year) 구조적 부족, 가격 상방 2~3배

- **핵심 주장**: 메모리는 다년 구조적 부족 국면이며 **DRAM·NAND 가격은 3배 방향(상방 2~3배)**. "메모리 랠리는 끝나지 않았다" — 몇 달이 아니라 **몇 년 단위**. "거의 아무도 제대로 프라이싱하지 않는 메커니즘"으로 KV 캐시를 지목.
- **수요 메커니즘 — KV 캐시**: 추론(reasoning) 모델·에이전트 워크로드는 **대규모 KV 캐시**를 요구 — 긴 컨텍스트·멀티턴일수록 DRAM/HBM 용량 선점. 추론 시대의 메모리 수요는 학습 시대보다 용량 탄성이 큼.
- **공급 측 논거**:
  - 진짜 증분 공급(true incremental supply)은 **2028년에야 도래** — 팹은 연간 캐파의 **20~30%만 증설 가능**.
  - **2023년 다운턴에 벤더들이 신규 팹을 짓지 않았고**, 수요가 확인된 뒤 팹 건설에는 **2년+** 소요 — 현 부족의 구조적 기원.
  - 동일 논거 직접 인용(Invest Like the Best EP.468, 2026-04): "**DRAM은 여기서 2~3배 더 오른다. 그만큼의 캐파가 필요하기 때문**" ([Yahoo Finance 2026-04-23](https://finance.yahoo.com/markets/stocks/articles/dram-double-triple-ai-demand-190647891.html)).
- **컨슈머 전치(displacement)의 정량화**:
  - 빅테크 2026년 CapEx의 **약 30%가 메모리로** 배분.
  - 파급: **iPhone 원가 ~$150 상승** 압력, **저가 스마트폰 시장은 연 11억 대 → 5~6억 대로 붕괴 가능** — 컨슈머 시장이 부족의 비용을 지불하는 구조의 구체 수치.

## 3. Anthropic — FCF 전환·수익성 (Patel 주장, 월 마감 수준 세부)

- **Anthropic은 2026년 2분기(Q2) FCF(잉여현금흐름) 흑자 전환** — **4월·5월 모두 흑자·현금흐름 플러스**, 녹음 시점에 6월은 미마감이나 같은 방향 지속.
- **ARR $50B 돌파**, **매출총이익률(GM) 70%+**. 모델 티어별로는 **Opus 4.8 토큰 GM 80%+**. **SBC(주식보상비용) 제외 기준 Q2 순이익 흑자**.
- **신뢰도 평가**: 미검증 주장이나, Patel은 (SemiAnalysis가) Anthropic의 대형 고객으로서 **월 마감 수준의 세부**를 언급 — 단순 추측과 구별. 대조: The Information 보도 기준 Anthropic 공식 가이던스는 현금흐름 흑자 시점을 2028년으로 제시해 왔음 ([The Information](https://www.theinformation.com/articles/anthropic-hikes-2026-revenue-forecast-20-delays-will-go-cash-flow-positive)) — Patel 주장이 맞다면 **가이던스 대비 대폭 조기 달성**.

## 4. 네트워킹·전력 — CPO 2029 지연, Rubin·Feynman 전세대 구리 유지, 800V 재설계

- **CPO(Co-Packaged Optics) 대규모 양산은 2028년 말~2029년으로 지연** — Street 기대(2027)보다 약 2년 뒤. 근거: 제조 수율·칩 설계·공급망 성숙도가 대량 배치 기준 미달. "2026년 최고 인기 네트워킹 트레이드는 아마 2년 이르다."
- **NVIDIA Rubin과 후속 Feynman 아키텍처까지 전(全)구리(all-copper) 솔루션 유지** — GPU 측 CPO는 여러 세대 뒤. 수혜는 구리 커넥터(예: **Amphenol**) — "Rubin·Feynman은 올-커퍼, Amphenol이 그 트레이드."
- **800V(HVDC) 재설계**: NVIDIA가 **Rubin Ultra의 Kyber 랙 버전에서 800V 설계를 제거** — 800V 전환이 뒤로 밀렸고, 이런 다운스트림 설계 변경이 CPO 지연을 추가로 심화.

## 5. 직전 출연(2026-02-05)과의 관계

- 1번째 출연 논지(NVIDIA "원칩" → 포트폴리오 전략 전환·추론 특화 실리콘·중국 "semiconductor pilled"·CapEx 버블 여부는 모델 진보에 달림)는 별도 에피소드. 이번 회차는 그 프레임 위에서 **메모리·네트워킹·수익성**으로 초점 이동.

---

## 위키 함의 (수집자 요약)

1. **가격 전망 상향 근거**: 위키 기존 수집(DRAM Q3 +13~18% 감속 조짐)과 대비되는 **강세 지속론** — "감속 = 정점 신호 vs 다년 부족의 중간 조정" 해석 대립. 공급 2028 도래는 시나리오 C/D(공급 과잉 반전) 시간축 가늠자.
2. **KV 캐시 메커니즘 + $11M 자기 표본**: 권석준(추론 100배)·이창수(시가 시장)와 수렴하되 미시 메커니즘·미시 표본을 제공.
3. **컨슈머 전치 정량**: 저가폰 11억→5~6억 대 붕괴 가능성은 위키 모바일 수요 가정(이창수 "폰 시장 12~13억 대 비저블")의 **하방 시나리오** — 컨슈머 비중 축소가 삼성 세트사업·범용 D램 믹스에 미칠 이차 효과 추적 필요.
4. **Anthropic FCF 전환**: 3자 공통 축 "AI 수익화·현금흐름 마스터 변수"의 첫 긍정 데이터 포인트(주장 단계, 공식 가이던스 2028과 대조 명시).
5. **CPO·800V 지연**: 랙 아키텍처 급변 리스크 완화 → DC 파이프라인→메모리 실투입 예측 안정성 상승. Rubin·Feynman 세대까지 구리 유지 확정 발언은 광학 전환 EWI 후보의 시간축을 뒤로 이동.
