# RS-4: 고객 포트폴리오 의도적 분산

> **한 줄 요약**: 단일 고객 의존은 호황기에는 매출을, 다운사이클·관계 악화 시에는 협상력을 잃게 한다. 지금 shortage 상황은 LTA·Take-or-Pay 구조를 짤 수 있는 골든 타임이다.

---

## 1. 전제 (Premise)

- **P1.** 고객 집중도가 높을수록 호황기 매출 효율은 높아지지만, **다운사이클·관계 악화 시의 협상력 비대칭**이 커진다.
- **P2.** 메모리 산업은 shortage(공급 우위)와 oversupply(수요 우위)가 24~36개월 주기로 역전된다. **shortage 시기에 잡은 LTA가 oversupply 시기의 보호막**이 된다.
- **P3.** Take-or-Pay·Minimum Volume Commitment 같은 약정은 **양방향 옵션**: 메모리사는 매출 하한 보장, 고객은 공급 보장. 어느 쪽도 단독으로 깨지 않는 게 양쪽에 이익.
- **P4.** 시나리오 A~E 어느 경우에도 **단일 고객 비중이 25%를 넘는 구조는 리스크가 가치보다 크다**.

---

## 2. 근거 데이터 (Evidence)

### 2.1 단일 고객 의존의 실제 충격 — 메모리 산업 사례
- 삼성 HBM3E 12Hi 품질 이슈 단발 사고로 NVIDIA 공급 자격 지연 → **Q2 2025 HBM 점유율 17%로 추락** ([data/competitors/market-share.md](../../data/competitors/market-share.md))
- Q3 2025 35%로 회복했으나, 1년간의 매출 갭 = 추정 **$5~8B 손실** (HBM 매출 기준)
- 핵심 교훈: **단일 고객의 단발 인증 지연이 매출의 절반을 날릴 수 있는 구조**

### 2.2 SK하이닉스의 NVIDIA 의존 — 양날의 검
- SK하이닉스 NVIDIA Rubin HBM4 점유율 **70% 전망** (UBS) ([data/market/hbm-market.md](../../data/market/hbm-market.md))
- 표면적으로는 호황. 그러나 UBS·Morgan Stanley는 **"단일 고객 의존 70%가 동시에 단일 고객 리스크 70%"**라고 분석
- 시나리오 E(패러다임 전환)에서 NVIDIA가 커스텀 ASIC으로 전환할 경우 SK하이닉스 매출 직격탄

### 2.3 Take-or-Pay·LTA 사례 — Samsung Foundry-Tesla
- Samsung Foundry-Tesla **다년 계약(2024)**: HW 다이 공급에 대한 take-or-pay 구조 명문화 ([analysis/benchmark/cyclical-strategy-benchmark.md §1](../../analysis/benchmark/cyclical-strategy-benchmark.md))
- 결과: Tesla AI 칩 출하 변동에도 Samsung Foundry 매출 안정화
- 시사점: 고객도 **단가보다 공급 안정성**을 더 중시하는 구간이 존재 — 그 구간이 LTA 협상의 골든 타임

### 2.4 SK하이닉스의 장기 선불계약 구조
- SK하이닉스가 2024~2025 shortage 시기에 NVIDIA·Microsoft·Amazon 등과 **장기 선불계약 체결** ([data/competitors/sk-hynix.md](../../data/competitors/sk-hynix.md), KED Global, Nikkei Asia)
- 효과: 2026~2028 캐파의 70%+ 사전 매출 확정. **다운사이클 충격 흡수 구조 확보**
- 삼성도 동일한 구조 협상 가능 — 지금이 골든 타임

### 2.5 Maersk의 통합 물류 — 다양화의 사이클 평탄화 효과
- 2016년 Maersk가 단일 사업(컨테이너) 모델 한계 인식 → **인접 영역(항공·육상·창고·풀필먼트) 통합** ([benchmark](../../analysis/benchmark/cyclical-strategy-benchmark.md))
- 2020 상반기 해운 부진 시 항공화물 단가 상승으로 그룹 EBITDA +$5,100만
- 메모리 적용: **사이클이 다른 고객군**(하이퍼스케일러 vs 자동차 vs 의료 vs 통신)을 균형 있게 보유 시 사이클 평탄화

### 2.6 SanDisk-Kioxia JV 모델 — 고객 공동투자
- 1991년부터 일본 욧카이치·기타카미에 NAND 팹을 **각 50% 지분** 공동 소유 ([data/competitors/market-share.md](../../data/competitors/market-share.md))
- 응용: 메모리 회사 + 하이퍼스케일러 50:50 JV 팹 구조. JV 생산물량 100%를 해당 고객에게 우선 공급, AI 가속기 로드맵에 맞춘 HBM 공동 설계
- 효과: 수요 불확실성 제거, 초기 자본 부담 50% 절감, 고객 락인

---

## 3. 추론 과정 (Logic Chain)

```
[L1] 고객 집중은 호황기 매출 효율을 높인다 (P1)
     단, 다운사이클이나 관계 악화 시 협상력 비대칭이 치명적 (P1, 2.1)
  ↓
[L2] 메모리 산업은 24~36개월 주기로 shortage ↔ oversupply 역전 (P2)
     → shortage 시기에 잡은 LTA가 oversupply 시기 보호막 (P2)
  ↓
[L3] 2026 현재는 명확한 shortage 시기 (P2, 2.4)
     → "지금이 골든 타임" — 24개월 후의 oversupply 시기에 협상력 잃기 전에 LTA 확보
  ↓
[L4] LTA·Take-or-Pay·MVC 구조는 양방향 옵션 (P3)
     → 메모리사: 매출 하한 보장 + 캐파 투자 정당화
     → 고객: 공급 보장 + 단가 변동성 흡수
  ↓
[L5] 고객 분류 체계 재편:
     (a) 장기계약(LTC): 3년+ Take-or-Pay, 전체 HBM 매출 50%+ 목표
     (b) 전략 고객: Co-dev·인증 선행, 사실상 락인
     (c) 성장 고객: 중동·인도·동남아·자동차·의료 — 매출 작지만 2~3년 후 LTC 전환 목표
  ↓
[L6] 단일 고객 비중 ≤25%, 상위 3개 ≤55% 정량 목표 (2028)
     → P4의 정량 운영 기준
  ↓
[L7] LTA에 단가 조정 조항 (시장가의 ±15%) 명문화
     → 호황기 기회비용 흡수 + 다운사이클 단가 방어 동시 작동
```

---

## 4. 결론 (Conclusion) — 5개 시나리오에서의 가치

| 시나리오 | RS-4의 작동 방식 | 가치 창출 |
|---|---|---|
| **A 황금 요새** (AI 지속+디커플링) | 서방 편중을 신흥 시장(중동·인도)으로 분산. 중국 매출 손실 일부 대체 | 서방 편중 리스크 분산 — 단일 시장 충격 흡수 |
| **B AI 르네상스** (AI 지속+공존) | 글로벌 신흥 AI 시장(사우디 Humain, UAE G42, 인도 Jio) 적극 발굴 | 신흥시장 발굴 — 매출 다변화 |
| **C 기술 냉전** (AI 붕괴+디커플링) | 자동차·의료·통신 등 사이클이 다른 고객군이 안정 매출 제공 | 위기 시 리스크 분산 — 사이클 충격 흡수 |
| **D 조용한 재편** (AI 붕괴+공존) | LTA가 다운사이클 가격 인하 압박을 흡수. Take-or-Pay 매출 하한 작동 | 다운사이클 안정 수요 — 영업이익 방어 |
| **E 패러다임 전환** (HBM 대체) | NVIDIA 외에 구글 TPU·아마존 Trainium·메타 MTIA 등 다양한 고객이 다양한 기술 채택 → 어느 기술이 이겨도 한 고객이라도 작동 | 다양한 기술 수요처 — 패러다임 베팅 분산 |

→ **5개 시나리오 모두에서 ✅** — 진정 Robust 전략

---

## 5. 반박 가능성 검토 (Counter-argument Review)

### 반박 5.1: "LTA는 호황기 기회비용이 너무 크다 — 현물 가격이 LTA 단가의 2~3배가 되면 매출의 절반을 포기"

**Steel-man**: 2026 Q1 DRAM 계약가 +55~60% QoQ 상승. LTA 체결한 고객에게는 그 인상분을 못 받음. 분기당 수천억~조 단위 기회비용.

**재반박**:
- LTA에 **단가 조정 조항(시장가 ±15%)** 명문화. 시장 가격이 LTA 단가의 115%를 초과하면 자동 조정. 양방향 적용으로 다운사이클에도 메모리사가 보호.
- 더 근본적으로, **호황기 기회비용 < 다운사이클 매출 하한**. 2022~2023 다운사이클 메모리 영업적자 -10조 원 vs 호황기 LTA 기회비용 추정 분기당 수천억 원.
- 호황기에 LTA 없이 매출 폭증 → 다운사이클 매출 폭락 → 분기당 영업적자 1~3조 원의 진폭 훨씬 위험. **LTA는 진폭을 줄이는 변동성 평탄화 도구**.

### 반박 5.2: "Take-or-Pay는 고객도 안 받음 — shortage 시기에 고객이 약속한 물량을 다 못 가져갈 위험"

**Steel-man**: AI 거품이 빠지면(시나리오 C·D) 빅테크가 약정 물량을 못 받음. Take-or-Pay 차액 청구 시 관계 파탄 가능.

**재반박**:
- Take-or-Pay 차액 청구는 실제로는 **재협상 트리거**일 뿐, 강제 집행은 드물다. 양쪽이 합의한 매출 하한을 일부 조정해서 재계약하는 게 일반적.
- 빅테크 입장에서도 **다운사이클에 메모리 공급사가 무너지면 회복기 공급 부족**의 책임을 짐. 양쪽이 사이클 동반 항해 인센티브.
- 실증: 2022~2023 다운사이클에서 SK하이닉스-NVIDIA LTA가 깨지지 않음. 양쪽이 단가 조정으로 흡수.

### 반박 5.3: "신흥 시장 고객(중동·인도)은 단가가 낮고 매출 규모도 작다 — 분산 효과 대비 운영 비용이 큼"

**Steel-man**: 사우디 Humain·UAE G42 발주 규모 합산 연 30억 달러도 안 됨. 전담 영업팀·서비스 센터 운영비가 매출보다 클 수 있음.

**재반박**:
- 신흥 시장은 **현재 매출 규모가 아니라 2030년 시점 매출 잠재력**으로 평가. 인도 AI 데이터센터는 2030년 글로벌 5위 시장 전망 (Reliance Jio + Tata + Adani 합산).
- 현재 서방 시장에 영업 자원의 95% 집중된 구조에서 **5%를 신흥 시장에 분산**해서 옵션 가치를 만드는 게 핵심. 5% 운영비가 그 시점 옵션 가치보다 작다면 OK.
- 시나리오 A(디커플링)에서는 신흥 시장이 **중국 매출 대체의 유일한 경로**. 시나리오 가중 평균에서는 매우 valuable한 옵션.

### 반박 5.4: "고객 분산은 결국 단일 고객 NVIDIA·하이퍼스케일러를 놓치는 결과 — SK하이닉스가 가져간 자리 다시 뺏기 어려움"

**Steel-man**: 단일 고객 분산 ≤ 25%는 NVIDIA 공급 자체를 줄이라는 뜻. SK하이닉스 70% 점유 상태에서 삼성이 NVIDIA 비중을 더 높여야지, 줄이는 건 후퇴.

**재반박**:
- "분산"은 NVIDIA 비중을 **줄이는** 게 아니라 **신규 고객 추가로 자연 분산**. NVIDIA 매출은 그대로 유지하면서 구글·아마존·메타·신흥 시장 매출을 늘려서 비중이 25% 이하가 되도록 함.
- 또한 **NVIDIA 70% 의존(SK하이닉스 패턴)은 시나리오 E에서 직격탄**. 패러다임 전환 시 NVIDIA가 커스텀 ASIC 강화하면 SK하이닉스 매출 절반 사라질 수 있음.
- 삼성의 강점은 **다양한 고객·다양한 제품**의 광범위 포트폴리오. 이 강점을 살리는 것이 SK하이닉스 패턴을 모방하는 것보다 시나리오 평균값이 높음.

---

## 출처 (Citations)

### 내부 문서
- [analysis/scenarios/strategy.md §3 RS4](../../analysis/scenarios/strategy.md)
- [analysis/benchmark/cyclical-strategy-benchmark.md (Maersk, Samsung Foundry-Tesla)](../../analysis/benchmark/cyclical-strategy-benchmark.md)
- [data/competitors/market-share.md (SanDisk-Kioxia JV 모델)](../../data/competitors/market-share.md)
- [data/competitors/sk-hynix.md](../../data/competitors/sk-hynix.md)
- [data/market/hbm-market.md](../../data/market/hbm-market.md)
- [data/market/2026-q1-current-state.md](../../data/market/2026-q1-current-state.md)

### 외부 자료
- [SK Hynix's NVIDIA Co-design Partnership — Nikkei Asia](https://asia.nikkei.com)
- [Samsung Foundry's Tesla Multi-Year Contract — KED Global](https://www.kedglobal.com)
- [SK hynix HBM4 supply backlog — KED Global 2026-04-23](https://www.kedglobal.com)
- [SK hynix holds 62% of HBM, Micron overtakes Samsung — Astute Group](https://www.astutegroup.com/news/general/sk-hynix-holds-62-of-hbm-micron-overtakes-samsung-2026-battle-pivots-to-hbm4/)
