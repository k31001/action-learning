---
type: report
status: 목차 제안 v0.1 — 사용자 승인 대기 (본문 미집필)
brief: sources/prompt/prompt-fdp-ssd.md
last_updated: 2026-08-17
---

# 삼성 SSD 전략적 방향성 — 사이클을 감쇠해 온 세 번의 선택, 그리고 네 번째 (가제)

> **상태**: 목차 제안 단계. 사용자 승인 후 본문 집필.
> **설계 전제**:
> ① 브리프([prompt-fdp-ssd.md](../../sources/prompt/prompt-fdp-ssd.md))의 논지·순서 보존.
> ② 이후 **PPT 3~4장** 압축 전제 — 본문 각 장이 슬라이드 1장에 1:1 대응하고, 장마다 거버닝 메시지 1문장을 둔다.
> ③ 모든 수치는 `sources/` 인용. 브리프 팩트체크 대장(F-1~F-9) 판정 반영 — 특히 F-1(가트너 수치)은 범위 명시 인용.
> **분량 목표**: A4 5~7장 (장당 1~1.5장 — PPT 압축을 감안해 절제)

---

## 제안 목차

### 0. Executive Summary — 세 문장

1. SSD는 2005년부터 메모리 사이클을 감쇠하기 위한 전략 사업이었고, 세 번의 선제적 방향 전환(진출·NVMe 선행·데이터센터 집중)으로 독보적 지위를 만들었다.
2. AI 호황이 그 완충 구조를 흔들고 있다 — 믹스는 서버로 쏠리고, 고객(하이퍼스케일러)은 Captive SSD로 경쟁자가 되고 있다.
3. 네 번째 방향 전환은 커스텀 니즈를 표준(FDP)으로 흡수하고 시스템 SW 생태계로 완성하는 것 — 공급자 우위인 지금이 실행할 유일한 계절이다.

### 1장. 사이클을 감쇠해 온 세 번의 선택 (2005~현재) — [슬라이드 1]

> **거버닝 메시지(안)**: "삼성 SSD 20년은 우연이 아니라 같은 패턴의 세 번 반복이었다 — 자기잠식을 무릅쓴 선제 결단, 표준 주도자보다 빠른 실행, 솔루션 부가가치로 사이클을 감쇠."

- **1.1 진출 (2005)** — 자기잠식을 무릅쓴 결단: Apple NAND 공급이 준 학습 → 2006 세계 최초 SSD 양산 → 안정화 후 2011 HDD 매각($1.375B)으로 스토리지 일원화. 사이클 감쇠라는 목적의 탄생
- **1.2 NVMe 선행 (2013)** — 표준은 인텔, 제품은 삼성: XS1715 업계 최초 NVMe SSD(인텔 대비 약 1년 선행). 빠른 의사결정 × 빠른 실행의 증명. 인텔의 스토리지 퇴장과의 대비
- **1.3 데이터센터 집중 (2017~)** — 전담 조직과 기술 내재화(COTS·MPF·ZNS·FDP): 1Q26 enterprise SSD 38.2% 1위, NVIDIA AI PC(DGX Spark 실탑재)·GPU 서버(CMX 공급) 채용으로 결실
- **1.4 패턴 추출** — 세 선택의 공통 구조: 선제 결단 × 실행 속도 × 솔루션 부가가치 = "사이클 감쇠"라는 일관된 목적
- *슬라이드 표현(안)*: 20년 연표 위 세 변곡점 카드 + 하단 패턴 3요소 밴드

### 2장. 호황의 역설 — 두 개의 균열 — [슬라이드 2]

> **거버닝 메시지(안)**: "역대 최대 호황이 다운턴 완충재(소비자 믹스)를 스스로 줄이게 만들고, 최대 고객을 경쟁자(Captive)로 바꾸고 있다."

- **2.1 믹스 쏠림** — 이익 극대화를 위한 서버 집중·소비자 축소(마이크론 Crucial 철수가 극단 사례). 2019·2023 다운턴의 완충재가 '믹스'였다는 역사와의 정면 긴장 — 다운턴 대비 관점의 문제 제기
- **2.2 Captive SSD의 부상** — 동인 분해: ⑴ SSD 가격 급등(계약가 분기 +80%) ⑵ AI DC 워크로드 최적화(WAF·수명 = 투자비 절감). 통제권 상승 4단계(완제품→펌웨어→AWS Nitro 자체 컨트롤러→표준·웨이퍼 직구매), 구글 Titanium 이중 트랙. 규모: 가트너 수치(5%→30%, 범위 명시) + 정황 지표(웨이퍼 직구매 +246%)
- **2.3 이중 리스크** — 다운턴 도착 시 '줄여둔 소비자 믹스'와 '내준 Captive 물량'이 동시에 완충 능력을 잠식
- *슬라이드 표현(안)*: 좌측 믹스 쏠림 추이 / 우측 통제권 상승 계단 도식 + 30% 전망 콜아웃

### 3장. 네 번째 방향성 — 커스텀 니즈의 표준화 (FDP) — [슬라이드 3]

> **거버닝 메시지(안)**: "모든 커스텀을 받아주는 길은 지속 불가능하다 — 커스텀 니즈를 표준(FDP)으로 흡수하고 시스템 SW 생태계로 완성하는 것이 세 번의 성공 패턴의 네 번째 적용이다."

- **3.1 두 갈래 비교** — 풀커스텀 대행(고객 만족 최대 ↔ 개발·평가·불량 대응·유지보수 리소스 발산 = 지속 불가) vs 표준 기반 효율 대응. 사내 증언(커스텀 컨트랙 체질 부재) 인용
- **3.2 FDP 전략 논리** — 고객이 원하는 것은 '자기 워크로드 최적화'이고 FDP가 그것을 표준으로 제공. 구글·메타와의 표준 공동 주도 이력 = 자산. 단 FDP 멀티벤더 확산 = 제품만으로는 차별화 아님 → 차별화는 표준 위 계층
- **3.3 성립 조건** — 시스템 소프트웨어 생태계 확산: 응용 계층 연계가 관건, 생태계 조성은 삼성에 낯설지만 필수
- *슬라이드 표현(안)*: 두 갈래 비교표 + FDP 위 계층(디바이스→표준→시스템SW→생태계) 스택 다이어그램

### 4장. 실행 전략과 결론 — [슬라이드 4]

> **거버닝 메시지(안)**: "공급자 우위인 지금이 워크로드를 얻을 유일한 계절 — 제휴 패키지로 문을 열고, 오픈소스 조직으로 생태계를 만들어, 'FDP로 판매되는 SSD 비중'이라는 세 번째 비중 전환을 완성한다."

- **4.1 전략적 제휴 패키지** — 공급 부족 레버리지: 장기 물량 계약 + 워크로드 최적화 협력의 패키지화. 선례: Micron–Anthropic Strategic Agreement(2026-06-22, 4요소). 1순위 구글(FDP 협업 이력) — 단 Titanium 이중 트랙을 반영한 협상 설계. 발판: 삼성도 Anthropic Series H strategic infrastructure partner
- **4.2 조직** — FDP 제품 개발·최적화는 기존 SSD 개발 조직의 강점 활용 / 시스템 SW 생태계는 오픈소스 컨트리뷰터·메인테이너 조직 강화
- **4.3 결론** — 비중 전환 3단계의 완성: ⑴ NAND의 SSD화 ⑵ SSD의 DC SSD화 ⑶ DC SSD의 FDP SSD화. 역량 재정의(디바이스 단독 → +데이터센터·시스템SW / 혼자 잘하기 → 고객과 함께 잘하기). DNA 업그레이드 = 다운턴 연착륙
- *슬라이드 표현(안)*: 좌측 제휴 패키지 구조도 / 우측 3단계 진화 화살표 + 마무리 메시지 1문장

### 부록 (보고서 말미, PPT 미포함)

- **A. 팩트체크 대장** — 브리프 F-1~F-9 승계 (F-1 가트너 범위 주의, F-8 COTS·MPF 표기 확인)
- **B. 용어** — FDP·ZNS·WAF·Captive SSD·SCA·RU/RUH
- **C. 저장소 재사용 자산 맵** — 아래 표

---

## PPT 압축 맵

| 슬라이드 | 4장 구성 (기본) | 3장 구성 (압축 시) |
|---|---|---|
| S1 | 1장 — 세 번의 선택 (역사·패턴) | 1장 동일 |
| S2 | 2장 — 호황의 역설 (균열 2개) | 2장 동일 |
| S3 | 3장 — FDP 전략 | 3장+4장 통합 (전략→실행→결론) |
| S4 | 4장 — 실행·결론 | — |

## 집필 시 활용할 저장소 자산

| 주제 | 자산 | 활용 |
|---|---|---|
| 20년 사업사 | [samsung-storage-solution-history.md](../../wiki/concepts/samsung-storage-solution-history.md) · [samsung-ssd-ufs-market-transition-strategy-2026-08-16.md](../../sources/articles/samsung-ssd-ufs-market-transition-strategy-2026-08-16.md) · [samsung-ssd-ufs-history-competition-2026-08-15.md](../../sources/articles/samsung-ssd-ufs-history-competition-2026-08-15.md) | 1장 — 계기 3장면·XS1715·HDD 매각 계약 구조·점유율 궤적 |
| 시장 현재값 | [enterprise-ssd-market-1q26-2026-08.md](../../sources/articles/enterprise-ssd-market-1q26-2026-08.md) · [ssd-ufs-market.md](../../wiki/concepts/ssd-ufs-market.md) | 1·2장 — 38.2% 1위·계약가 +80%·Crucial 철수 |
| Captive·FDP | [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) · [captive-ssd-fdp-context-2026-08.md](../../sources/articles/captive-ssd-fdp-context-2026-08.md) · [google-captive-titanium-fdp-factcheck-2026-08.md](../../sources/articles/google-captive-titanium-fdp-factcheck-2026-08.md) · [gartner-captive-nvme-ssd-forecast-2026-08.md](../../sources/articles/gartner-captive-nvme-ssd-forecast-2026-08.md) | 2·3장 — 통제권 4단계·선택지 판정·FDP 정량 효과·가트너 범위 |
| NVIDIA 채용 | [samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md) | 1장 — PM9E1 DGX Spark·PM1753 CMX·PM1763 양산 |
| 제휴 선례 | [micron-anthropic-sca-2026-06-22.md](../../sources/articles/micron-anthropic-sca-2026-06-22.md) · [customer-co-design-anthropic.md](../../wiki/concepts/customer-co-design-anthropic.md) · [lta-to-sca-transition.md](../../wiki/concepts/lta-to-sca-transition.md) | 4장 — SCA 4요소·Series H 발판·Binding 격상 |
| 인접 산출물 | [ssd-fdp-proposal.md](../storyline/ssd-fdp-proposal.md) (「SSD의 CUDA」, 7인 스토리라인 SSD 제안편) | 진단·3안 선택·실행 서술 재사용 — 단 본 보고서는 '20년 전략사 → 네 번째 방향성' 프레임의 단독 보고서로 차별화 |

## 프레이밍 결정 (승인 시 확정할 사항)

1. **본문 구조**: '세 번의 전략적 방향성'(진출·NVMe·DC) + '네 번째 방향성'(FDP) / **결론**: '비중 전환 3단계'(NAND→SSD→DC SSD→FDP SSD)로 수렴 — NVMe는 비중 축에서는 별도 단계가 아니라 실행력의 증거로 처리 (브리프 원문의 이중 구조를 그대로 살리는 방식)
2. 대안: 처음부터 '3단계 비중 전환'만으로 단순화 (NVMe를 1→2 전환의 가속 장치로 축소 서술)
3. 가트너 수치(F-1) 처리: 범위 명시 인용 vs 정황 지표로 대체 — 기본안은 범위 명시 인용 + 정황 지표 병기
