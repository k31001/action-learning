---
type: concept
last_reviewed: 2026-09-23
sources: [sources/articles/qlc-v7-hbm-to-storage-shift-2026-09.md, sources/articles/kv-cache-ssd-offload-ecosystem-2026-08.md, sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md]
---

# KV 캐시가 HBM 용량을 넘어선다 — 이동이 아니라 증설

QLC eSSD 덱 1장 ②구획이 서는 자리다. [codesign-demand-lesson.md](codesign-demand-lesson.md)가 "고객과 함께 수요를 설계한 쪽이 이겼다"를 세웠다면, 이 페이지는 **그 수요가 지금 어디에 있는가**에 답한다.

> **2026-09-23 정정 ①**: 이 페이지는 처음 "AI 메모리 수요가 HBM에서 스토리지로 **이동**한다"로 썼으나, 같은 날 리서치에서 그 프레이밍이 **지지되지 않음**을 확인하고 **"증설(additive)"**로 바꿨다. 근거는 §4. 파일명은 링크 안정성을 위해 유지한다.
>
> **2026-09-23 정정 ② (수치 오류)**: §3의 Kioxia 인용에 오류가 두 건 있었다. ① "**증분 DC 수요의 86%가 AI 추론**"은 오독이다 — **86%는 CY25~CY28 CAGR**이다(학습 16%). ② "DC NAND 2028년 **1,807EB**"도 오독이다 — **1,807EB는 전체 flash**이고 **데이터센터는 909EB**다. 출처 원장 [qlc-v7-hbm-to-storage-shift-2026-09.md](../../sources/articles/qlc-v7-hbm-to-storage-shift-2026-09.md) V-21에 같은 오류가 남아 있으나 `sources/`는 불변 계층이므로 수정하지 않고, 정정은 [qlc-v8-dwpd-price-inference-2026-09.md](../../sources/articles/qlc-v8-dwpd-price-inference-2026-09.md) §3-B가 보유한다. **이 페이지를 인용할 때는 v8 수치를 쓴다.**

## 1. 한 문장

**이동이 아니라 증설이다.** KV 캐시가 HBM 용량을 넘어서는 것은 사실이고 **그 진단은 HBM 1위 업체 본인이 공개적으로 했다**. 그러나 HBM 수요가 줄어 스토리지로 옮겨 간 것이 아니라, **HBM으로 감당되지 않는 몫이 그 위에 새 계층을 열었다.**

## 2. 메커니즘 — KV 캐시는 HBM보다 빨리 큰다

| 단 | 계층 | 크기의 변화 | 한계 |
|---|---|---|---|
| **G1** | GPU HBM | 80GB(H100) → 141(H200) → 288(B300·Rubin) → **384(Rubin Ultra 2027)** 🟡 | **단일 사용자의 128K 컨텍스트 KV 캐시가 Llama 3 70B 기준 약 40GB이고 사용자 수에 선형 비례** 🟡 |
| **G2** | CPU DRAM | 첫 확장 | Kioxia: "KV 캐시가 커지면서 **DRAM만으로는 더 못 따라간다**" 🟡 |
| **G3** | 로컬 / 풀 NVMe SSD | **새로 얹힌 계층** | 쓰기가 몰리는 첫 대용량 계층 → 내구성이 구속 조건 |
| **G3.5** | NVIDIA CMX | GPU당 16TB — HBM 288GB의 약 55배 규모 ⚠️ 파생 | 플랫폼 레벨 신설 계층 |
| **G4** | 원격 스토리지 | 마지막 단 | 지연 |

**⚠️ 파생 산술 주의**: "Rubin 288GB ÷ 40GB = 128K 동시 사용자 약 7명"은 두 공개 수치의 나눗셈이다. 모델 가중치·활성화가 같은 HBM을 쓰므로 실제는 더 작고, 모델·정밀도·GQA 구성에 따라 크게 달라진다. 덱에 쓰려면 파생임을 밝힌다.

## 3. 지지되는 근거

| # | 근거 | 등급 | 출처 |
|---|---|---|---|
| 1 | **HBM 1위 업체 본인의 진단**: SK하이닉스가 2026-07-29 2분기 실적 콜에서 "KV 캐시를 저장할 HBM 용량이 한계에 도달하고 있다"고 밝히고 **near-GPU storage** 개발을 공표 | 🟡 (실적 콜의 2차 보도, 사실상 1차급) | 서울경제 2026-07-29 |
| 2 | **오프로드는 메인라인 코드**: LMCache 디스크 캐시 2024-08(PR #52) → GDS 백엔드 2025-06(#773) → Dynamo GPU↔디스크 직결 2025-10(#3510) → vLLM 다계층 오프로딩 2026-05(#40020) → vLLM 디스크 커넥터 다수 2026-08 | ✅ GitHub PR 직접 확인 | 각 PR |
| 3 | **비트의 무게중심 이동**: 전 세계 NAND 비트 출하 중 eSSD 비중이 **1년 만에 26% → 48%** | 🟡 | Counterpoint Q2 2026 |
| 4 | **플랫폼 계층 신설**: NVIDIA가 G3와 G4 사이에 **G3.5(CMX)**를 정의하고 GPU당 16TB를 붙였다. CMX NAND 소요 2026 35EB → 2027 100EB+ | 🟡 | nvidia.com/cmx · 서울경제 2026-07-20 |
| 5 | **수요 총량 전망**: SanDisk Investor Day 2026-08-13 "KV 캐시가 메모리 위계를 **Tier 3.5**로 재편", 엔터프라이즈 DC 플래시 TAM 2030년 **1.2ZB**. Kioxia Investor Day 2026-06-02(슬라이드 15): **DC NAND 295EB(CY25) → 909EB(CY28), CAGR 46%**이고 그 안에서 **추론 관련 수요 CAGR 86% · 학습 CAGR 16%**. 전체 flash는 997 → 1,807EB(CAGR 22%) | 🟡 / ✅(Kioxia 수치) | 각사 IR · [qlc-v8-dwpd-price-inference-2026-09.md](../../sources/articles/qlc-v8-dwpd-price-inference-2026-09.md) §3-A |
| 6 | **규모의 역전**: Gartner 2026-08-10 — **2026년 AI 최적화 IaaS 지출의 55%가 추론**, 추론 **$23.3B**가 학습 **$19.0B**를 **사상 최초로 추월**. 2027년 59% | ✅ Gartner 공식 릴리스 | 같은 원장 §3-C |
| 6 | **삼성의 대응**: V-NAND 캐파의 약 **60%**를 9세대(V10) CMX 대응에 배정, V10 양산 2026-08 | 🟡 | 서울경제·SamMobile 2026-07 |

## 4. 지지되지 **않는** 것 — "이동" 프레이밍이 반박당하는 지점

이것이 이 페이지의 존재 이유다. 덱과 보고서는 아래를 같은 화면·같은 문단에 둔다.

- **벤더 본인의 단어가 "추가"다**: SK하이닉스의 표현은 대체(replacement)가 아니라 **"additional KV cache repository"**다 🟡.
- **GPU당 HBM 용량이 같은 기간 커진다**: 96/192GB → 216/288GB(2026) → **384GB(2027)** 🟡. "HBM에서 빠져나간다"는 서사와 정면으로 어긋난다.
- **컨텍스트 전용 가속기조차 HBM으로 회귀했다**: Rubin CPX는 2025-09에 **128GB GDDR7**로 발표됐다가 **168GB HBM4로 재설계**(1Q27 양산)됐다는 보도가 있다. ⚠️ 애널리스트(Ming-Chi Kuo) 보도이며 **NVIDIA 공식 확인 없음**.
- **계층 정의가 HBM을 빼지 않는다**: Micron은 **HBM = hot KV cache**, DC SSD = persistent KV cache로 정의한다 🟡. Kioxia가 "못 따라간다"고 지목한 것도 HBM이 아니라 **DRAM**이다 🟡.
- **이득의 출처가 정책이 아니라 용량이다**: "Where Should the KV Cache Live?"(arXiv 2609.16215, 2026-09)는 티어링이 GPU당 동시 세션 73배·세션당 비용 62배를 개선한다고 보고하면서, **"these gains coming from tier capacities of 1 plus 8 plus 64, not placement policy"**라고 못박는다 🟡.
- **SK하이닉스의 자본 배분은 반대로 읽힌다**: 2026-08-07 승인한 54조 원 중 NAND(청주 M17) 19.1조, **DRAM/HBM(용인) 35.2조 — 약 1.84배** ⚠️ 파생.
- **모델 효율이 수요를 깎고, 스토리지를 더 크게 깎는다**: DeepSeek V4.1-Flash(2026-09-10)는 KV 캐시의 **HBM 요구 −75%, 영속 SSD 요구 −87.5%** 🟡. TurboQuant 6배·KVTC 20배 압축도 같은 방향.
- **오프로드 경로는 아직 비싸다**: 기존 SSD 기반 KV 솔루션의 **GPU 버블 70~80%** 🟡. HBM 압박이 작으면 오프로드는 3~5% 오버헤드만 남긴다.
- **NVIDIA가 자기 KV 블록 매니저를 deprecate했다**: Dynamo v1.5.0(2026-09-18)에서 **KVBM deprecated, removal targeted for v1.6.0**, 마이그레이션 지침은 "엔진 네이티브 KV 오프로딩을 쓰라"다 ✅ 릴리스 노트 원문 확인. **디스크 티어 자체는 유지**되며(같은 릴리스가 "extends KV indexing to Mooncake and disk tiers") 사라진 것은 NVIDIA 전용 매니저다. **"NVIDIA가 KV 캐시 계층 소프트웨어를 소유한다"는 서사는 폐기한다.**
- **수요 이중계상 경고**: "같은 데이터 블록이 계층 사이를 오가는 것을 각 계층의 증분 수요로 중복 계산할 수 없다" 🟡. EB 전망을 인용할 때 함께 읽는다.
- **HBF는 아직 제품이 아니다**: 샘플 2027 / 양산 2028로 1년 이상 지연 🟡.
- **"KV 캐시 = QLC"는 아직 성립하지 않는다**: 오늘 이 계층은 TLC가 서비스한다(CMX 타깃으로 벤더가 지명한 드라이브는 전부 TLC). QLC 공개 사례는 SanDisk FMS 2026 1건이며 DWPD 미공개 🟡.

## 5. 덱에 쓰면 안 되는 문장 (부정 확인)

아래 넷은 **근거를 확보하지 못했다**. 그럴듯해 보여도 쓰지 않는다.

- "KV 캐시 오프로드로 HBM 수요가 N% 줄어든다" — 정량치가 어디에도 없다.
- "KV 캐시의 N%가 SSD에 안착한다" — HBM/DRAM/SSD 실제 안착 비율 공개치가 없다.
- "AI NAND가 전체 NAND의 N%다" — 정의가 기관마다 다르다.
- "NAND가 HBM보다 X배 빨리 성장한다" — 금액 대 비트 단위 불일치. NAND 매출 전망도 출처 간 충돌(2026 $174.1B vs 2027 $126B).

또한 B200 HBM 용량은 출처에 따라 **180GB / 192GB**로 엇갈리므로 단일 수치로 쓰지 않는다 ⚠️.

## 6. 그래서 무엇이 달라지는가

수요가 새 계층을 연 것은 사실이고, **그것을 QLC로 받는 것이 우리 문제**다. 이 계층은 쓰기가 몰리는 첫 대용량 계층이라 요구가 내구성(DWPD 1~3)으로 잡히고([essd-purchase-criteria-shift.md](essd-purchase-criteria-shift.md)), 현 QLC 정격 0.6과는 2~5배 거리가 있다([solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)).

## 7. 연결

- 덱: `outputs/presentation/qlc-ssd-strategy.pptx` **1장 ②구획**(v7.2) — 구매 기준 체인 · G1~G3 도해 · "대체가 아니라 증설" 스트립 · SK하이닉스 진단 · 요구 DWPD
- 앞: [codesign-demand-lesson.md](codesign-demand-lesson.md) (교훈 — 수요를 함께 설계하라)
- 뒤: [essd-purchase-criteria-shift.md](essd-purchase-criteria-shift.md) (그 수요가 SSD 구매 기준으로 번역된 모습)
- 요구의 크기: [qlc-ssd-market.md](qlc-ssd-market.md) §4 · [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
- 스택에서 우리 자리: [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)
