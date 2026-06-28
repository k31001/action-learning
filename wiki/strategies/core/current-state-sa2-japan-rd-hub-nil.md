# 현황 분석: SA-2 일본 R&D 허브 (EUV 우회 — Canon NIL)

> **전략 핵심**: 요코하마 R&D 허브 확대 + JSR/신에쓰화학/Canon 파트너십. ASML EUV 의존 탈피를 위해 나노임프린트(NIL) 공동 개발. 투자 규모 ~1조 원.
> **분류**: 사이드벳 (점수 14, 시나리오 A·C 디커플링 헤지)

---

## 1. 정량 현황

### Canon NIL (FPA-1200NZ2C) 핵심 사양

| 지표 | 수치 | 출처 / 신뢰도 |
|------|------|------|
| 출시 | 2023.10.13 | [Canon Global](https://global.canon/en/news/2023/20231013.html) · ✅ |
| 첫 납품 | Texas Institute for Electronics, **2024.10** | [Canon USA](https://www.usa.canon.com/newsroom/2024/20241001-tie) · ✅ |
| 최소 linewidth | **14 nm** (5nm 노드 등가 일부 layer) | Canon, [IEEE Spectrum](https://spectrum.ieee.org/nanoimprint-lithography) · ✅ |
| 장비 단가 | **$50M 미만** (vs ASML EUV $150~200M) | [Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/japans-dnp-targets-2027-mass-production-of-1-4nm-nanoimprint-templates) · ✅ |
| 전력 소비 | **EUV 대비 ~90% 절감** (Canon 주장) | [DCD](https://www.datacenterdynamics.com/en/news/canon-ships-its-first-nanoprint-lithography-machine-rivals-asml/) · 🔵 |
| DNP 1.4nm 템플릿 | 양산 목표 **2027** | Tom's Hardware · 🔵 |

### EUV vs NIL — 적용 가능 영역 (2026 기준)

| 영역 | 기존 EUV | NIL 채택 가능성 |
|------|---------|------|
| 로직 칩 (TSMC 2nm) | 필수 (다중 패턴) | 일부 layer 가능 |
| 메모리 DRAM (1c nm) | 일부 layer EUV | NIL 일부 layer 가능 (R&D 단계) |
| NAND 어드밴스드 | EUV 미사용 (DUV 다중 패턴) | NIL 가능 |
| 패키징 (TSV) | 미사용 | NIL 가능 |

→ **메모리에서는 일부 layer NIL 전환이 가장 현실적 진입점**

### 일본 소재·장비 산업 — Samsung 파트너십 현황

| 회사 | 영역 | Samsung과의 협력 (공개) |
|------|------|------|
| **JSR** | 포토레지스트 | 2025 SK하이닉스도 JSR 인수 시도 (공개) — Samsung도 JSR 의존 ([wiki/policy/korea-policy.md](../../concepts/korea-policy.md)) · 🔵 |
| **신에쓰화학** | Si 웨이퍼·소재 | 다년 공급 계약 (구체 비공개) · 🔵 |
| **Canon** | NIL 장비 | (구체 협력 미공개) · ⚠️ |
| **TEL** | 장비 (CVD/etch 등) | 장기 발주 관계 · ✅ |
| **DNP** | NIL 템플릿 | (협력 미공개) · ⚠️ |

### 일본 R&D 인프라

| 항목 | 현황 | 출처 / 신뢰도 |
|------|------|------|
| Samsung 요코하마 R&D 허브 | 운영 중 (1995년 설립) | Samsung 공식 · ✅ |
| 일본 정부 보조금 | 수천억 엔 규모 (JASM 제외 별도) | Yole, NIST · 🔵 |
| 한일 반도체 협력 (정부 차원) | 2023년 화이트리스트 정상화 후 활발 | Nikkei Asia · ✅ |

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) 1995년부터 운영된 요코하마 R&D 허브 — 일본 산업과의 신뢰 자산. (2) 일본 정부 보조금 + 한일 협력 정상화 환경. (3) 한국 메모리사 중 일본 R&D 가장 깊이 운영. |
| **약점 (W)** | (1) **NIL 협력 공개 사례 없음** — Canon FPA-1200NZ2C는 Texas Institute에 첫 납품. Samsung 채용 사례 미공개. (2) NIL은 일부 layer만 가능, 다중 패턴 노광은 여전히 EUV 필요. (3) 1조 원 투자 규모는 ASML 의존 탈피에 부족할 수 있음. |
| **기회 (O)** | (1) 시나리오 A/C(디커플링) 발생 시 ASML 대중국 수출 통제 또는 가격 인상 → NIL 가치 급증. (2) DNP 1.4nm 템플릿 2027 양산 — NIL 적용 노드 확대. (3) 한국 정부 KRW 700조 반도체 투자 패키지 일부 활용 가능. |
| **위협 (T)** | (1) NIL 채택 foundry 사례 부재 (Tom's Hardware) — 양산 검증 미완. (2) 일본 정부 보조금 수령은 기술 일부 공유 의무 동반 가능. (3) Canon NIL은 5nm 노드 일부 — 메모리 1c 1d 같은 첨단 적용 가능성 미검증. |

### 외부 평가

- **IEEE Spectrum**: Canon NIL은 EUV 경쟁자보다는 **보조 수단** — 특정 layer에서 비용·전력 절감 ([IEEE Spectrum](https://spectrum.ieee.org/nanoimprint-lithography))
- **Tom's Hardware**: "1.4nm 칩 전체를 NIL로 만든다는 게 아니라 일부 layer가 NIL로 옮겨갈 수 있다는 제안" — Foundry 양산 채택 사례 없음 ([Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/japans-dnp-targets-2027-mass-production-of-1-4nm-nanoimprint-templates))
- **DCD**: Canon이 ASML 직접 경쟁자로 nanoprint lithography 진입 ([DCD](https://www.datacenterdynamics.com/en/news/canon-ships-its-first-nanoprint-lithography-machine-rivals-asml/))

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **요코하마 R&D 허브**: ✅ 운영 — 그러나 NIL 공동 개발 같은 구체 프로젝트 공개 없음
- **NIL 채택**: ⚠️ **미진입** — Texas Institute가 첫 납품처. Samsung 채용 사례 없음.
- **일본 소재 파트너십**: ✅ JSR·신에쓰·TEL 등 다년 관계 — 그러나 nanoimprint 영역 협력 미공개
- **일본 정부 보조금**: 🔵 부분 활용 — 구체 규모 비공개

### 다음 마일스톤

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026~2027 | Canon NIL 한국 메모리사 채용 발표 (가능성) | NIL 진입 시그널 |
| 2027 | DNP 1.4nm NIL 템플릿 양산 | NIL 적용 노드 확대 |
| 2027 H2 | Samsung 일본 R&D 허브 1조 원 투자 (목표, 내부) | SA-2 실행 단계 |
| 2027~2028 | NIL 공동 개발 1차 결과 (가정) | 디커플링 헤지 가시화 |
| 2030 | NIL 일부 layer 양산 적용 (시나리오 A/C 발동 시 가속) | 디커플링 회피 |

### 신뢰도 한계

- Samsung-Canon NIL 협력은 **외부 공개 자료 사실상 부재** — strategy.md 내부 가설.
- 1조 원 투자 규모는 strategy.md 추정 — 외부 검증 불가.
- NIL이 메모리 첨단 노드(1c 1d)에 실제 적용 가능한지는 **양산 검증 안 됨**. R&D 단계 베팅.

---

## 4. 출처

- [Canon FPA-1200NZ2C 출시 — Canon Global](https://global.canon/en/news/2023/20231013.html)
- [Canon NIL Texas Institute 납품 — Canon USA](https://www.usa.canon.com/newsroom/2024/20241001-tie)
- [Canon ships first nanoprint lithography machine — DCD](https://www.datacenterdynamics.com/en/news/canon-ships-its-first-nanoprint-lithography-machine-rivals-asml/)
- [Canon Delivers Nanoimprint Lithography to Compete With EUV — IEEE Spectrum](https://spectrum.ieee.org/nanoimprint-lithography)
- [Japan's DNP targets 2027 mass production of 1.4nm NIL — Tom's Hardware](https://www.tomshardware.com/tech-industry/semiconductors/japans-dnp-targets-2027-mass-production-of-1-4nm-nanoimprint-templates)
- 내부: [wiki/policy/korea-policy.md](../../concepts/korea-policy.md), [wiki/policy/us-export-controls.md](../../concepts/us-export-controls.md)
