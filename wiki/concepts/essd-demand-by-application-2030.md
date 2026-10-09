---
type: analysis
last_reviewed: 2026-10-09
sources:
  - sources/articles/essd-demand-by-application-2030-2026-10.md
  - sources/articles/agent-vm-and-cloud-ssd-requirements-2026-10.md
---

# eSSD 수요처별 2030 전망: 범용 클라우드 · AI 학습 · AI 추론 · 에이전트, 그리고 빠진 수요(HDD 대체)

> 사용자 질문(2026-10-09): "슬라이드 1에서 언급된 eSSD 미래 수요처에 대해서 2030년까지 예상 수요가 어떻게 변화하는지 조사해 줘. 혹시 eSSD에서 빠진 거대한 수요가 있다면 포함해 주고." 덱 1장([datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md))의 네 응용을 수요 크기로 잇는 페이지다.

**한 줄 요약**: 공개 전망을 이어 붙이면 2030년 eSSD는 약 1.1~1.2ZB(2024년 약 180EB의 6배)이고, 성장의 대부분은 AI 추론(KV 캐시 · RAG 포함, 6 → 약 450EB)에서 나온다. AI 학습은 7 → 약 130EB, 범용 클라우드 · 엔터프라이즈는 약 170 → 약 500EB(산술)다. 에이전트는 따로 떼어 낸 전망이 없다. 네 응용에 없는 가장 큰 수요는 **HDD 대체**다. 니어라인 HDD는 2030년 연 약 3.9ZB가 출하될 전망이라, 그중 10%만 플래시로 넘어와도 약 390EB로 AI 학습 전체의 세 배다. 근거: [essd-demand-by-application-2030-2026-10.md](../../sources/articles/essd-demand-by-application-2030-2026-10.md)(AI-01~37 · NA-01~37).

⚠️ **등급**: 1차 문서를 열지 못해 모두 검색 스니펫 · 2차 보도(🟡)이고, 전망 기관마다 정의(eSSD 대 DC 플래시 TAM)와 작성 시점이 다르다. 아래 표는 "같은 자릿수에서 어떤 수요가 크고 작은가"를 보는 용도다.

## 1. 수요처별 2024 → 2030

| 수요처 (덱 1장) | 2024 | 2030 | 배율 | 근거 | 성격 |
|---|---|---|---|---|---|
| **AI 추론** (KV 캐시 · RAG · 추론 서버) | 약 6EB | 약 447EB | 약 75배 | McKinsey 2024-12 (AI-15) | 가장 큰 성장. KV 캐시만 2027년 75~100EB 추가(SanDisk, AI-11), CMX 34.6EB(2026) → 115EB(2027)(Citi, AI-09). Kioxia 추론 CAGR 86%(2025~28) |
| **AI 학습** (데이터셋 · 체크포인트) | 약 7EB | 약 127EB | 약 18배 | McKinsey (AI-01) | 서버당 30TB → 100TB, 학습 서버 0.2M → 0.4M대. 2028년 이후 대수 안정화(Yole) |
| **범용 클라우드 · 엔터프라이즈** (VM · DB · 블록 · 어레이) | 약 168EB | 약 504EB | 약 3배 | McKinsey 총량 − 학습 − 추론 (⚠️ 산술) | 2019~21 서버 교체 · 서버 출하 high-teens%(Micron), 온프렘 어레이 올플래시 52% |
| **에이전트** (사용자별 VM · 샌드박스 · 상태 · 벡터 DB) | - | 정량 전망 없음 | - | TrendForce · 삼성 · SK hynix 정성 (AI-22~26) | 추론(KV · RAG)과 범용(VM 디스크)에 나뉘어 잡힌다. TrendForce는 "상방 요인"으로만 서술 |
| **합계 eSSD** | 약 181EB | 약 1,078EB | 약 6배 | McKinsey 기준 시나리오 (AI-28) | SanDisk는 엔터프라이즈 DC 플래시 TAM 1.2ZB(2030, AI-29) |

참고 중간값: Kioxia(TechInsights 인용) DC 플래시 295EB(2025) → 909EB(**2028**), JPM eSSD 약 900EB(약 2028). eSSD는 이미 NAND 비트 출하의 48%(2Q26, Counterpoint).

## 2. 빠진 큰 수요: HDD 대체 (용량 계층의 매체 전환)

| 항목 | 값 | 근거 |
|---|---|---|
| 니어라인 HDD 출하 | 2026 약 1.6ZB/년 → 2030 약 3.9ZB/년(연 25% 가이던스 적용) | Seagate 695EB · WD 분기 231EB 실적, 성장 가이던스 "mid-20s" · "25% plus" (NA-10~14, ⚠️ 산술) |
| DC 저장 용량 중 HDD 비중 | 약 80~87%, SSD 약 20%(2025) | IDC · WD · Coughlin · Phison (NA-15 · 16) |
| 전환 민감도 (2030) | 니어라인의 10% → 약 390EB, 20% → 약 780EB | ⚠️ 산술 |
| 진행 신호 | HDD 리드타임 52주+, CSP가 웜 · 콜드 데이터를 QLC로, Micron이 HDD 대체를 수요 동인으로 명시, Meta QLC 계층, VAST "약 200EB 부족" | NA-06 · 08 · 09 · 20 · 22 |
| 제약 | QLC 용량당 비용이 HDD의 4~5배(CSP 목표 3배 이내), 신규 NAND 팹 효과는 2028년 말 이후 | NA-07 · NA-36 |

**왜 빠졌나**: 덱 1장의 네 응용은 "무슨 일을 하느냐"(워크로드)로 나눴는데, HDD 대체는 "어떤 매체에 담느냐"(매체 전환)라서 어느 칸에도 들어가지 않는다. 데이터 레이크 · 오브젝트 · 백업 · 영상처럼 범용 클라우드와 AI 학습의 뒤편에 있는 대용량 저장소다. 고용량 QLC의 가장 큰 잠재 수요이며, 가격(용량당 3배 이내)과 공급이 열쇠다.

## 3. 그 밖의 후보 (정량 근거 없음)

- **Physical AI · 자율주행 · 로봇 영상 데이터**: WD는 신규 저장 수요로 꼽지만 EB 전망이 없다(NA-23~25). 분류상 AI 학습 데이터 레이크.
- **소버린 · 온프렘 AI**: 용도가 아니라 수요 채널(지역 · 고객). 달러 전망은 저신뢰(NA-27).
- **엣지 · 통신 · CDN**: SSD 분리 전망 없음(NA-28), 규모가 작거나 확인 불가.

## 4. 읽는 법 (⚠️ 과제팀 해석)

- 2030년 eSSD 성장의 중심은 **추론(KV 캐시)** 이고, 이는 쓰기 내구 · 지연 요구가 가장 까다로운 수요다([high-dwpd-operating-point.md](high-dwpd-operating-point.md), [essd-decade-growth-vs-dwpd.md](essd-decade-growth-vs-dwpd.md)).
- 물량으로 가장 큰 잠재 수요는 **HDD 대체**이며, 이는 용량당 비용이 결정한다. 같은 QLC가 두 수요를 동시에 노리지만 요구가 정반대다(추론은 쓰기 · 지연, HDD 대체는 용량 · 가격).
- McKinsey 수치는 KV 오프로드 표준(CMX, 2026-01) 이전 작성이라 추론을 과소 추정했을 수 있고, SanDisk는 KV 캐시 수요가 "현재 전망에 없다"고 했다. 두 출처를 더하면 이중 계산이 될 수 있다.
- 덱 1장 매트릭스에 HDD 대체를 넣는다면, 응용 열을 하나 더 두기보다 "고용량 QLC" 행에 "HDD 대체 (용량 계층)"를 표시하는 방식이 분류에 맞다.

## 5. 연결

- 덱 1장 근거: [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)
- QLC 수요 · 매출 모델: [qlc-ssd-market.md](qlc-ssd-market.md) §4 (2030 eSSD 약 1,000EB, KV 캐시 350EB)
- HBM → 스토리지 파급: [hbm-to-storage-spillover.md](hbm-to-storage-spillover.md)
