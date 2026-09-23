---
type: concept
last_reviewed: 2026-09-23
sources: [sources/articles/qlc-v7-placement-cases-waf-2026-09.md, sources/articles/qlc-v6-waf-measurement-trend-2026-09.md, sources/articles/qlc-v6-fdp-placement-handles-2026-09.md]
---

# 배치 힌트의 작동 원리 — 같은 드라이브, 네 가지 결과

호스트가 데이터 수명을 알려 주면 왜 WAF가 내려가는가. [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)가 "잔여 변수는 WAF이고 호스트가 결정한다"까지 세웠다면, 이 페이지는 그 메커니즘을 보인다.

## 1. 메커니즘 한 문장

NAND는 페이지 단위로 쓰고 **블록 단위로 지운다**. 한 블록 안에 수명이 다른 데이터가 섞이면, 짧은 것이 먼저 무효화돼도 긴 것이 남아 있어 블록을 지우지 못한다. 지우려면 남은 유효 페이지를 **다른 블록으로 복사**해야 하고, 그 복사량이 곧 쓰기 증폭(WAF)이다. **수명이 같은 데이터만 한 블록에 모이면 그 블록은 통째로 무효화되므로 복사할 것이 없다.** 이것이 WAF 1의 정체다.

## 2. 네 가지 경우

같은 QLC 드라이브에 같은 양을 쓰되, 호스트가 수명 정보를 주는 정도만 다르다. **네 값은 하나의 연속 측정이 아니며 조건이 다르다.**

| 경우 | 인터페이스 | WAF | 등급 | 유효 DWPD (정격 0.6) | 근거 |
|---|---|---|---|---|---|
| **① 배치 없음** | 큐 1개, 수명 정보 없음 | **3.0** | ✅ 실측 | 0.6 | CacheLib 비-FDP **3.22**(1.88TB FDP SSD, 디바이스 사용률 100%) · Samsung FDP 백서 ≈3.5 · 정격 DWPD 산정 관행 WAF 3 |
| **② 멀티스트림** | 스트림 2~8개 | **1.8** | ⚠️ 모델 | 1.0 | 절대 before→after 쌍이 문헌에 **없다**. AutoStream 최대 −60%, FStream −7~−46%(filebench)의 보수 중앙값을 ①에 적용 |
| **③ 배치 힌트(FDP) 전면 적용** | 수명 등급별 배치 핸들 | **1.05** | ✅ 실측 | 1.7 | CacheLib **3.22 → 1.03**(호스트 OP 0%) · **1.22 → 1.03**(OP 50%) · Kioxia XD8 CacheBench 2.8 → 약 1.0 |
| **④ 혼재** | 핸들 일부 + 기본 핸들 | **2.2** | ⚠️ 모델 | 0.8 | 부분 태깅 측정치 **부재**. 절반 태깅 가중평균 + 핸들 간 간섭 10% 가정. 교차검증: FlashAlloc(VLDB'23) 동거 시 4.2 → 2.5 |

유효 DWPD = 정격 0.6 × 3 ÷ WAF. 정격이 WAF 3 기준으로 산정되기 때문이다(⚠️ 이 형태의 1차 출처는 없고 `DWPD = P/E × (1+OP) ÷ (EOL일수 × WAF)`에서 유도).

## 3. ④가 현실이고, 그래서 6장이 필요하다

혼재가 가장 위험한 이유는 **힌트 없는 트래픽이 기본 핸들 하나로 몰리기 때문**이다.

- **CacheLib 폴백 코드**(✅ 원문 확인): `allocateFdpHandle()`은 핸들이 소진되면 `kDefaultPIDIdx`(=0)를 쓰고, 핸들이 없으면 `getFdpPID(kDefaultPIDIdx)`로 떨어진다. 주석 그대로 `// Use the default stream`.
- **FAST'26 WARP의 "Noisy RUH"**: 한 핸들에 무효화가 집중되면 **다른 핸들의 WAF까지 부풀어** 격리가 깨진다. 상용 디바이스 2종 모두에서 관측됐다.
- **WARP의 F2FS 실측**: Fileserver 10시간에서 사용자 데이터 쓰기의 **99%가 WARM으로 태깅**되어 단일 핸들로 몰렸고, FDP가 사실상 일반 SSD로 붕괴했다.

즉 배치 힌트는 **켜는 것만으로 성립하지 않는다.** 수명 등급이 실제로 분리되어야 하고, 그 상태가 유지돼야 한다. 유지되지 않을 때 감지하고 되돌리는 것이 [waf-runtime-response.md](waf-runtime-response.md)다.

## 4. 공개 자료의 공백 (덱에 쓰면 안 되는 것)

- **Kang 외 HotStorage'14(멀티스트림)의 WAF before→after 수치**를 확보하지 못했다. 인용 가능한 것은 "Cassandra 최악 update throughput +56%"와 구성 설명뿐이다. "Kang 2014: WAF X→Y"로 쓰면 안 된다.
- **부분 태깅 비율에 따른 WAF 곡선**은 논문·벤더 문서·표준 어디에도 없다(부정 확인). ④의 2.2는 측정이 아니라 모델이다.
- **QLC에서의 FDP 결과**: 후보는 Kioxia LC9(2Tb QLC, 245.76TB, 0.3 DWPD, FDP 지원) + RocksDB 플러그인 WAF ≈1.1이지만, 그 1.1이 LC9에서 측정된 값인지 플러그인 일반 성능치인지 공개 요약으로는 분리되지 않는다. CacheLib·XD8·EuroSys'25는 모두 TLC 계열이다.
- **CacheLib의 "KV cache"는 Meta 소셜그래프용 키값 캐시**이지 LLM KV 캐시가 아니다. 섞으면 허위 주장이 된다.

## 5. 정격 DWPD는 워크로드 파생값이다

같은 드라이브가 기준 블록 크기에 따라 13배 차이 난다. **Micron 6600 ION 245TB**: 4K 랜덤 **0.075** / 16K 랜덤 **0.3** / 128K 순차 **1.0** DWPD. 기준을 병기하지 않은 DWPD 비교는 무의미하다.

| 제품 | 용량 | 정격 DWPD |
|---|---|---|
| Solidigm D5-P5336 | 122.88TB | 0.6 (5년 134.3PB) |
| Kioxia LC9 | 245.76TB | 0.3 |
| Samsung BM1743 | 61.44TB | 0.26 |
| Micron 6550 ION | 61.44TB | 1.0 (16K 랜덤) |

## 6. 연결

- 덱: `outputs/presentation/qlc-ssd-strategy.pptx` **4장**(v7.6) — 네 경우의 블록 도해와 WAF·유효 DWPD
  - **도해의 부호화 규칙**: 수명 등급은 **명도 3단 블루 램프 + 글자(S·M·L) 이중 부호화**로 표시한다(색만으로 구분하지 않는다 — 색맹·흑백 인쇄 대비). **무효화는 색이 아니라 상태**로 그린다 — 흰 바탕에 해당 등급 색의 점선. 즉 색은 언제나 **수명 등급**만 뜻하고, 채움/점선이 **유효/무효**를 뜻한다
  - 8칸 블록은 **원리를 보이는 모식도**이며 실측 레이아웃이 아니다. 각 경우의 「소거 대상 블록 복사 n/8칸」은 그 블록의 **유효 칸 수**와 일치시킨다(정합성 규칙)
- 앞 장: [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md) (잔여 변수 WAF)
- 뒷 장: [waf-runtime-response.md](waf-runtime-response.md) (④가 일어났을 때의 대응)
- 배치 핸들 개수: [fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §2.6
