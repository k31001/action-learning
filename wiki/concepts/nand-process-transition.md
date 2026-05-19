# NAND Flash 공정 전환 주기 — 비용·기술 동향

> **수집일**: 2026-05-06
> **출처**: TrendForce, Tom's Hardware, Yole Group, NAND Research, TechInsights, Lam Research, Knowmade, Block & Files
> **신뢰도**: High
> **태그**: #NAND #process-transition #hybrid-bonding #capex #yield-ramp

---

## 1. 핵심 요약 (Why this matters)

NAND Flash는 매 18~24개월마다 새로운 layer 세대로 전환하면서 layer 수를 1.3~1.5배씩 증가시켜왔다. 그러나 **공정 전환 한 번이 capex·수율 ramp·R&D에 끼치는 부담은 이익을 통째로 날려버릴 수 있는 수준**이다. 2026년 들어 메모리 3사가 일제히 capex 확장보다 **process upgrade 중심**으로 전략을 전환한 것이 그 시그널이다.

**핵심 결론**: 새 layer 세대로 옮기는 빈도를 낮추고, 같은 세대 내에서 가치를 더 오래 뽑아내는 R&D가 **어떤 시나리오에서도 가치 있는 robust 전략**이다.

---

## 2. 공정 전환 빈도 — 업계 로드맵 (2024~2030)

### Samsung Electronics (V-NAND)
| 세대 | 양산 시점 | Layer 수 | 비고 |
|------|---------|---------|------|
| V8 | 2023 | 236 | TLC, 1Tb |
| **V9** | 2024 (TLC) → **2026 Q1 (QLC)** | **286** (2×143 deck) | 업계 최초 QLC 9세대 양산 (AI 시대 대응) |
| **V10** | **2026 하반기 양산 목표** | **~430 (BV NAND, hybrid bonding)** | "BV NAND" — 메모리 셀과 peripheral을 별도 wafer에서 제작 후 본딩, bit 밀도 1.6배↑ |
| **V11** | **2027** | TBD | I/O 속도 50%↑ 목표 |
| 장기 비전 | **2030** | **1,000+** | Samsung 임원 공식 발언 |

### SK hynix
| 세대 | 양산 시점 | Layer 수 | 비고 |
|------|---------|---------|------|
| V7 | 2023 | 238 | 2×119 deck (string stacking) |
| V8 | 2025 1H | 321 | 1Tb TLC, 3,600 MT/s |
| V9 (321L QLC) | 2026 2H | 321 | QLC 양산 시작 |
| **V10** | **2027 Q1 양산 (개발 가속)** | **300+ (hybrid bonding)** | wafer-to-wafer (W2W) 채택, "PUC 한계 돌파" |

### Micron
| 세대 | 양산 시점 | Layer 수 |
|------|---------|---------|
| G8 | 2022 | 232 |
| G9 | 2024 | 276 (2650 client SSD) |
| 로드맵 | 2027~ | 500+ (hybrid bonding) |

### Kioxia / Western Digital (CBA 선행)
- 2023년부터 **CBA(CMOS Directly Bonded to Array)** 도입 — 업계 최초 hybrid bonding 양산
- BiCS8 (2025) → BiCS9 R&D 진행 중
- 2026년 capex $4.5B, +41% YoY (전환 가속)

> **관찰**: 4사 모두 **2026~2027년에 hybrid bonding/CBA로 아키텍처 대전환**. 매 세대 layer 수만 늘리는 단순 스택은 PUC(Peripheral-Under-Cell) 한계에 도달.

---

## 3. 공정 전환 비용의 경제학

### 3.1 Yield Ramp 시간이 곧 이익이다 (학습 곡선)
- **양산 ramp 6개월 단축 → 누적 순이익 2배+ 증가** (PSU Weber, "Yield Learning and Sources of Profitability")
- **양산 6개월 지연 → 이익의 2/3 소실**
- **1년 지연 → 손실 전환** — 메모리 기업의 1년 늦은 노드 전환은 거의 항상 적자 결과
- 이를 비용으로 환산하면 **공정 개발 시간 1분당 약 $5,000**의 손실

### 3.2 Capex 패턴 — 2026년 변곡점
- 2025년 NAND capex: $21.1B
- **2026년 NAND capex: $22.2B (+5%)** — TrendForce, 2025-11
- 핵심 메시지: "Investments focus on **process upgrades and hybrid bonding rather than capacity expansion**"
- **수년간의 cycle 변동성 학습 후, 메모리 공급사들이 capex·확장에 일제히 신중**
- 결과: bit 공급 증가율 제한적 (2026 NAND bit growth 한 자릿수 후반 예상)

### 3.3 노드 전환의 hidden cost (TechInsights·Lam Research)
- 새 layer 양산 시 **older die의 단종/희귀화** → 산업·자동차·서버 고객의 **재설계·재인증 강요**
- 232L → 321L 전환에서 lateral cell shrink와 layer 증가가 동시 진행 → **공정 단계 수 + 난이도 모두 상승**
- High aspect ratio (HAR) etch에서 단일 cell defect가 string 전체를 무력화 → **수율 손실은 layer 수 비례 이상**
- TLC/QLC 같은 bit-per-cell 증가는 **error correction·controller firmware 부담**도 유발 (R&D 추가 비용)

---

## 4. 공정 전환 주기 연장을 가능하게 하는 기술

### 4.1 Hybrid Bonding (W2W) / CBA — 최우선 lever
**원리**: 메모리 cell array wafer와 CMOS peripheral wafer를 **별도 공정**으로 만들고 nano-scale 정밀도로 본딩.

**효과**:
- Cell array의 고온 공정 ↔ CMOS의 저온 공정 **열적 분리** → 각자 최적 공정 사용 가능
- 두 wafer **병렬 제작** → cycle time 단축
- 같은 layer 수에서 bit 밀도 **1.6배** (Samsung BV NAND 기준)
- **layer 증가 없이도 세대 가치 연장 가능** ← 핵심

**리스크**:
- Wafer alignment nano-precision 요구 → 장비 투자
- 두 wafer 사용 → 단순 cost 비교 시 CMOS-Under-Array(CUA)보다 **비싸**
- **YMTC가 hybrid bonding 핵심 IP·특허 다수 보유** (Knowmade, 2025-05)
  - Samsung은 YMTC와 라이선스 계약 체결한 정황
  - SK Hynix도 유사 계약 검토 보도

### 4.2 Multi-Deck String Stacking 정교화
- 2×143 (V9 286L), 2×119 (V7 238L) 같이 deck을 늘려서 layer 수 증가
- 각 deck의 layer 수를 늘리는 것이 비용 효율적 — 단순한 deck 추가는 cycle 시간 늘림
- **Deck 당 layer 수 한계 돌파 R&D**가 cycle 연장의 핵심

### 4.3 CMOS-on-Array (COA) — 같은 노드에서 read 성능 개선
- BonView Press 2024 연구: COA 구조가 CUA 대비 read latency 개선
- **새 layer 노드 없이도** 동일 array에서 controller·peripheral 위치만 바꿔서 성능 향상

### 4.4 TLC → QLC → PLC bit-per-cell 확장
- 같은 layer 수에서 bit 용량 33%↑ (TLC→QLC), 66%↑ (TLC→PLC)
- **새 layer 전환 없이 capacity 늘리는 가장 저렴한 방법**
- 단, ECC·firmware·내구성(P/E cycle) 부담 → controller R&D 동반 필요

### 4.5 Architecture-aware Firmware/Controller
- FDP(Flexible Data Placement), SCADA-aware controller 같은 호스트 협력형 firmware로 **endurance·throughput 개선**
- 같은 silicon에서 사용 수명·가치 연장
- Samsung Foundry의 SCADA AI 스토리지 협력 모델과 직접 연결

---

## 5. 시나리오별 영향

| 시나리오 | NAND 공정 전환 비용의 의미 |
|---------|--------------------------|
| **A 황금 요새** (AI 지속 + 디커플링) | 서방 동맹 NAND 수요 폭발 → 빠른 layer 경쟁 강요 → 전환 주기 길수록 마진 우위 |
| **B AI 르네상스** (AI 지속 + 공존) | NAND SSD 수요 폭발 (AI 학습 데이터·체크포인팅) → cycle 연장 R&D = 비용 우위로 직결 |
| **C 기술 냉전** (AI 붕괴 + 디커플링) | capex 회수 압박 + YMTC 의존 리스크 → IP 자립 hybrid bonding R&D 생존 직결 |
| **D 조용한 재편** (AI 붕괴 + 공존) | 다운사이클에서 신규 노드 전환 capex 정당화 어려움 → 기존 세대 가치 연장 R&D가 유일한 생존 경로 |
| **E 패러다임 전환** (HBM 대체) | 3D DRAM·PIM 등장으로 NAND 별도 트랙 → cycle 연장으로 수익성 확보, R&D 자원 차세대 메모리에 재배분 |

→ **모든 시나리오에서 가치 있다 = Robust 전략 자격 충족**

---

## 6. YMTC 종속 리스크 — 추가 근거

- TrendForce (2025-05): **"중국 YMTC가 hybrid bonding 특허를 지배하며 한국 메모리 거인 Samsung·SK Hynix를 압박"**
- Samsung은 V10 (430L, BV NAND)에서 hybrid bonding 채택 — YMTC 라이선스 의존 시 다음 시나리오 모두 위험:
  - 시나리오 C/E (디커플링 강화): 미국 제재로 YMTC 라이선스 차단 가능
  - 시나리오 A: 서방 동맹 공급망에서 중국 IP 사용 자체가 정치적 리스크
- 자체 hybrid bonding IP 확보 = **국가 안보 차원의 R&D**

---

## 7. 한계 및 추가 검증 필요 사항

- **공정 전환 1회당 capex 단가**: 공개 자료에 단일 노드 전환 비용 명시 부족. 일반적으로 신규 fab 1조 원+ 추정되나 검증 필요.
- **수율 ramp 곡선 실측**: 232L → 321L 등 구체 노드 전환의 수율 ramp 기간(개월) 데이터 비공개.
- **자체 IP vs YMTC 라이선스 비용 비교**: 정확한 라이선스 단가/조건 비공개.
- 위 한계들은 추가 IR 자료, 분기 컨퍼런스콜, TechInsights/Yole 유료 보고서로 보완 가능.

---

## 8. 출처 (Citations)

- [Memory industry to maintain cautious capex in 2026 — Evertiq/TrendForce](https://evertiq.com/news/2025-11-13-memory-industry-to-maintain-cautious-capex-in-2026)
- [SK hynix Reportedly Accelerates Hybrid Bonding for 300-Layer V10 NAND, Eying 2027 Mass Production — TrendForce](https://www.trendforce.com/news/2025/12/08/news-sk-hynix-reportedly-accelerates-hybrid-bonding-for-300-layer-v10-nand-eying-2027-mass-production/)
- [SK hynix announces production of its 321-layer NAND flash — Tom's Hardware](https://www.tomshardware.com/pc-components/storage/sk-hynix-announces-production-of-its-321-layer-nand-flash-shipments-will-start-in-the-first-half-of-2025)
- [Samsung unveils 10th Gen V-NAND: 400+ layers, 5.6 GT/s and hybrid bonding — Tom's Hardware](https://www.tomshardware.com/pc-components/ssds/samsung-unveils-10th-gen-v-nand-400-layers-5-6-gt-s-and-hybrid-bonding)
- [Samsung Reportedly Plans 400-layer Vertical NAND by 2026, Targeting 1,000-layer NAND by 2030 — TrendForce](https://www.trendforce.com/news/2024/10/29/news-samsung-reportedly-plans-400-layer-vertical-nand-by-2026-targeting-1000-layer-nand-by-2030/)
- [China's YMTC Dominates Hybrid Bonding Patents, Pressuring South Korean Memory Giants — TrendForce](https://www.trendforce.com/news/2025/05/09/news-chinas-ymtc-dominates-hybrid-bonding-patents-pressuring-south-korean-memory-giants-samsung-and-sk-hynix/)
- [Why YMTC's Hybrid Bonding IP Is Unavoidable for Memory Chipmakers — Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/)
- [Yield Learning and the Sources of Profitability — Weber, PSU](https://web.pdx.edu/~webercm/documents/2004%20Weber%20Yield%20Learning.pdf)
- [Inside the future of 3D NAND: The roadmap to 500 layers — Tom's Hardware](https://www.tomshardware.com/pc-components/storage/inside-the-future-of-3d-nand-the-roadmap-to-500-layers)
- [3D NAND Race Faces Huge Tech And Cost Challenges — Semiconductor Engineering](https://semiengineering.com/3d-nand-race-faces-huge-tech-and-cost-challenges/)
- [Beyond advanced packaging basics — Yole Group](https://www.yolegroup.com/strategy-insights/beyond-advanced-packaging-basics-exploring-the-next-frontier-in-memory/)
- [Improvement of Read Performance Using CMOS on Array (COA) in 3D NAND Flash — BonView Press](https://ojs.bonviewpress.com/index.php/AAES/article/view/2269)

---

## [Update 2026-05-19] ISSCC 2026 — Kioxia BiCS10 등장

### SanDisk/Kioxia BiCS10 (Paper 15.1)
- **332 레이어, 3 데크 구성**
- **최고 밀도 37.6 Gb/mm² (QLC)** — SK Hynix V9 대비 +30%
- 6-plane (1×6 방식), IO 대역폭 +50%
- CBA 아키텍처 — 추가 상단 금속층로 전력 공급 개선

### 4사 layer 로드맵 갱신
| 제조사 | 2024 | 2025 | 2026~2027 |
|---|---|---|---|
| Samsung | V8 (236L) | V9 (286L) | V10 430L (2026 H2) |
| SK Hynix | V8 321L | (QLC 양산) | V10 hybrid bonding (2027) |
| Micron | 232L | 276L | G9 (500L 계획) |
| **Kioxia / SanDisk** | BiCS8 (218L) | BiCS9 (CBA 2023~) | **BiCS10 332L** (ISSCC 2026) |
| YMTC | 232L → 294L | 294L 양산 | 300L+ + 국산 장비 |

→ **함의**: BiCS10이 SK Hynix V9를 능가 (QLC 기준 +30% 밀도). 4사 적층 경쟁에서 Kioxia 선두 진입. 한·미·중·일 4파전 강화.

**출처**: [semianalysis-isscc-2026-2026-04-15.md](../../sources/articles/semianalysis-isscc-2026-2026-04-15.md)
