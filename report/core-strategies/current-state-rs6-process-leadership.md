# 현황 분석: RS-6 공정 리더십 통합 (1c nm DRAM + NAND 주기 연장 + Hybrid bonding 자체 IP)

> **전략 핵심**: 1c nm DRAM 우위 + NAND 공정 주기 연장 R&D + Hybrid bonding 자체 IP. 3축 통합으로 다른 회사가 흉내내기 어려운 공정 리더십 구축.
> **분류**: 메인벳 (점수 14)

---

## 1. 정량 현황

### 1c nm DRAM 진척 (2026 Feb 기준)

| 회사 | 1c yield | 캐파 | 마일스톤 | 출처 / 신뢰도 |
|------|---------|------|------|------|
| **Samsung** | **~60%** (목표 80% 양산 근접) | 60-70K wafer/month → **2026 +50% 확장** | HBM4 양산 2026.2 | [Tweaktown](https://www.tweaktown.com/news/108316/samsung-1c-dram-for-hbm4-yields-rumored-to-hit-around-50-percent-to-battle-sk-hynix-and-micron/index.html) · 🔵 |
| **SK하이닉스** | (구체 미공개, 80%대 추정) | **8x 증산 계획 (2026)** | HBM4 양산 시스템 2025.9 완성 | [KED Global](https://www.kedglobal.com/korean-chipmakers/newsView/ked202511200013) · 🔵 |
| **Micron** | 1γ DRAM 양산 (1c 등가) | (구체 비공개) | LPDDR6 R&D | Micron IR · ✅ |

### NAND 공정 전환 — 업계 동향

| 회사 | 2026 양산 세대 | 2027 계획 | Hybrid bonding 도입 | 출처 / 신뢰도 |
|------|---------|------|------|------|
| **Samsung** | V9 286L (QLC) → V10 430L (BV NAND) 2026 H2 | V11 (개발) | V10에서 도입 — **YMTC IP 의존 가능성** | TrendForce, Tom's Hardware · ✅ |
| **SK하이닉스** | V8 321L QLC | V10 300+L (W2W hybrid bonding) Q1 양산 가속 | V10에서 도입 | [TrendForce 2025-12](https://www.trendforce.com/news/2025/12/08/news-sk-hynix-reportedly-accelerates-hybrid-bonding-for-300-layer-v10-nand-eying-2027-mass-production/) · ✅ |
| **Micron** | G9 276L | 500+L (2027~) | 도입 | Tom's Hardware · ✅ |
| **Kioxia/WD** | BiCS9 (R&D) | — | **CBA 2023년부터 양산 (업계 최초)** | TrendForce · ✅ |

### Hybrid Bonding IP 분포 — 결정적 변수

| 항목 | 현황 | 출처 / 신뢰도 |
|------|------|------|
| **YMTC가 보유한 hybrid bonding 핵심 IP** | TrendForce·Knowmade에 의해 "압도적 다수 보유" 확인 (2025.5) | [TrendForce 2025-05](https://www.trendforce.com/news/2025/05/09/news-chinas-ymtc-dominates-hybrid-bonding-patents-pressuring-south-korean-memory-giants-samsung-and-sk-hynix/), [Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/) · ✅ |
| Samsung·SK하이닉스 라이선스 의존 정황 | TrendForce에서 Samsung은 라이선스 체결 정황 보도 | TrendForce · 🔵 |
| 한국 자체 hybrid bonding 특허 출원 | 공개 자료 부재 (정부 KRW 700조 반도체 패키지에서 별도 트랙 가능성) | ⚠️ |

### Capex 효율 — Process Upgrade로 선회한 업계

- **2026 NAND capex $22.2B (+5%)** — 업계가 capa 확장보다 **process upgrade·hybrid bonding 중심** 전략 (TrendForce 2025-11)
- Samsung 2025 capex 전년比 -11%, SK하이닉스 23~25조 → **2026 30조+** ([data/competitors/market-share.md](../../data/competitors/market-share.md))

### 양산 ramp 손실 환산

- **6개월 지연 → 누적 이익의 2/3 소실** (Weber/PSU 학습곡선)
- **공정 개발 시간 1분당 약 $5,000** 손실
- 출처: [Weber, PSU Yield Learning](https://web.pdx.edu/~webercm/documents/2004%20Weber%20Yield%20Learning.pdf) · ✅

---

## 2. 정성 현황 (SWOT)

| | 내용 |
|---|---|
| **강점 (S)** | (1) Samsung Foundry 보유 — 1c nm + 베이스다이 통합 가능 (다른 메모리사 불가). (2) 1c yield 80% mass-production target 근접. (3) 한국 정부 KRW 700조 반도체 투자 패키지 활용 가능. |
| **약점 (W)** | (1) **YMTC hybrid bonding IP 의존 정황** — 디커플링 시 양산 차단 리스크. (2) SK하이닉스 1c nm 8x 증산 가속에 비해 Samsung 캐파 +50% 확장은 상대적 약세. (3) 하이브리드 본딩에서 Kioxia/WD가 CBA로 2023년 선행. |
| **기회 (O)** | (1) 업계가 process upgrade로 일제 선회 — 추격 윈도우 존재. (2) NAND 공정 주기 18→24개월 연장 시 누적 capex 회피 1.5~2조 원/3년. (3) 한국 IP 컨소시엄(Samsung+SK) 가능성. |
| **위협 (T)** | (1) SK하이닉스가 2027 V10 W2W hybrid bonding 양산 가속 — 우리가 늦으면 1세대 격차. (2) 시나리오 C(디커플링) 발생 시 YMTC 라이선스 차단. (3) 1c yield 격차 영구 고착 시 HBM4·HBM5 마진 영구 격차. |

### 외부 평가

- **TrendForce**: YMTC가 hybrid bonding 핵심 IP 지배 — 한국 메모리사 압박 ([TrendForce 2025-05](https://www.trendforce.com/news/2025/05/09/news-chinas-ymtc-dominates-hybrid-bonding-patents-pressuring-south-korean-memory-giants-samsung-and-sk-hynix/))
- **Knowmade**: YMTC hybrid bonding 특허 회피는 한국 메모리사의 경쟁 변수 ([Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/))
- **TSMC 벤치마크**: 2026 N2P **80% yield 목표**, 영업이익률 50%+ — 공정 리더십이 마진의 결정 요인 ([CNBC 2026-04](https://www.cnbc.com/2026/04/16/tsmc-q1-profit-58-percent-ai-chip-demand-record.html))

---

## 3. 우리의 현재 위치 평가

### 어디에 있는가

- **1c nm DRAM**: 추격 단계 — yield 60%로 80% target 근접 중. SK하이닉스 8x 증산에 비해 캐파 확장 상대적 약세이나 yield는 추격 가능 거리.
- **NAND layer 경쟁**: 선행 단계 — V10 430L (BV NAND) 2026 H2 양산은 SK V10 (300+L, 2027 Q1)보다 빠름. 단, hybrid bonding IP는 YMTC 의존 가능성.
- **Hybrid bonding 자체 IP**: ⚠️ **공개된 진척 없음** — 가장 큰 공백 영역.

### 다음 마일스톤

| 시점 | 이벤트 | 의미 |
|------|------|------|
| 2026 H2 | Samsung 1c yield 80% 도달 | HBM4·HBM5 마진 회복 결정 |
| 2026 H2 | V10 (BV NAND) 양산 개시 | NAND layer 경쟁 선행 |
| 2027 Q1 | SK하이닉스 V10 양산 | hybrid bonding 양산 격차 가시화 |
| 2027 | 자사 hybrid bonding 특허 200건+ 출원 목표 (내부) | YMTC IP 의존 회피 가능성 |
| 2028 | V11 자체 IP 비중 70%+ 목표 (내부) | RS-6 KPI |
| 2030 | NAND 공정 주기 24개월+ 연장 효과 측정 | 누적 capex 회피 1.5~2조 원 |

### 신뢰도 한계

- **자체 hybrid bonding IP 진척**은 외부 공개 자료에 사실상 부재 — 가장 큰 정보 공백.
- 1c nm yield는 외부 추정치(60%)와 내부 목표(80%) 격차가 있음 — 업데이트 필요.
- YMTC 라이선스 의존 정황은 TrendForce 보도 기반이나 정확한 라이선스 단가·조건은 비공개.

---

## 4. 출처

- [Samsung 1c DRAM yields rumored — Tweaktown](https://www.tweaktown.com/news/108316/samsung-1c-dram-for-hbm4-yields-rumored-to-hit-around-50-percent-to-battle-sk-hynix-and-micron/index.html)
- [SK Hynix 1c DRAM 8x 증산 — KED Global](https://www.kedglobal.com/korean-chipmakers/newsView/ked202511200013)
- [SK hynix V10 hybrid bonding — TrendForce](https://www.trendforce.com/news/2025/12/08/news-sk-hynix-reportedly-accelerates-hybrid-bonding-for-300-layer-v10-nand-eying-2027-mass-production/)
- [YMTC Hybrid Bonding Patents — TrendForce](https://www.trendforce.com/news/2025/05/09/news-chinas-ymtc-dominates-hybrid-bonding-patents-pressuring-south-korean-memory-giants-samsung-and-sk-hynix/)
- [Why YMTC's Hybrid Bonding IP Is Unavoidable — Knowmade](https://www.knowmade.com/technology-news/semiconductor-news/packaging-news/ymtcs-hybrid-bonding-patents-a-key-competitive-factor-for-memory-chipmakers/)
- [Yield Learning — Weber, PSU](https://web.pdx.edu/~webercm/documents/2004%20Weber%20Yield%20Learning.pdf)
- [TSMC Q1 2026 — CNBC](https://www.cnbc.com/2026/04/16/tsmc-q1-profit-58-percent-ai-chip-demand-record.html)
- 내부: [data/technology/nand-process-transition.md](../../data/technology/nand-process-transition.md), [data/competitors/sk-hynix.md](../../data/competitors/sk-hynix.md)
