# Enterprise SSD 시장 1Q26 실적·중기 전망 — 웹 리서치 (2026-08-09)

**수집일**: 2026-08-09
**유형**: 웹 검색 기반 시장 데이터 (TrendForce 계열 + 기관 전망 교차)
**용도**: `outputs/storyline/` SSD 제안서 6장(이익 규모 산정)의 기준 데이터. [ssd-ufs-market.md](../../wiki/concepts/ssd-ufs-market.md) 갱신 근거
**핵심**: 삼성은 enterprise SSD **1위(1Q26 점유 38.2%)**다 — 제안서의 "2~3년 뒤 키플레이어가 된다" 프레임은 사실과 불일치, "1위 수성 + Captive 침식 방어 + 플랫폼 전환"으로 교정 필요.

---

## §1. 1Q26 실적 (TrendForce, I-Connect007 인용)

Top 5 합산 매출 **$18.46B** (QoQ **+86.1%**, 사상 최대):

| 벤더 | 1Q26 매출 | 점유율 | 비고 |
|---|---|---|---|
| **Samsung** | **$7.05B** | **38.2%** | QoQ +92.8%, 1위 |
| SK그룹 (하이닉스+Solidigm) | $4.64B | 25.1% | Solidigm 고용량 QLC 수요 |
| Micron | $3.09B | 16.7% | — |
| Kioxia | $2.22B | 12.0% | — |
| SanDisk | $1.47B | 8.0% | — |

- 계약가 분기 **+80%** (공급 제약), 주요 공급사 재고 사상 최저, 생산이 주문 증가에 크게 미달
- 직전 분기(4Q25): Samsung 33.8% · SK그룹 30.2% — **분기별 점유 변동이 큼** (4Q25는 SK그룹이 QoQ +75%로 최고 성장)
- 3Q25: 업계 매출 QoQ +28%, Kioxia +33.1%로 최고 성장 — AI 인프라가 NAND 수요 견인

## §2. 구조 신호

- **Micron, 2026년 초 컨슈머 Crucial 브랜드 철수** — 전 생산능력을 고마진 enterprise·AI 세그먼트로 전환 (전 산업의 enterprise 집중 신호)
- SSD의 위상 전환: "저장 장치 → 컴퓨트 워크로드를 지지하는 핵심 부품" (AI Agent 시스템) — Micron SLC 이니셔티브·Kioxia XL-Flash 등 고성능 대응 가속
- PCIe 5.0이 2026 주류 인터페이스화, enterprise SSD 출하 비트 지속 증가 — TrendForce는 연매출 배증 가능성 언급

## §3. 중장기 전망 (기관별 — 정의 차이 주의)

| 출처 | 수치 | 신뢰도 메모 |
|---|---|---|
| Intel Market Research | 2025 글로벌 enterprise SSD **$32B** (265EB), CAGR 15.5% → 2030 ~$66B | 협의 정의, 기존 위키와 정합 |
| Mordor Intelligence | 북미 Data Center SSD $16.74B(2025) → **$69.08B(2031)**, CAGR 27.6% | 북미 한정 |
| 복수 기관 | AI 스토리지 CAGR ~28% (through 2030), AI 워크로드가 SSD 수요 성장의 ~40% 기여 | 방향성 지표 |
| (참고, 신뢰 낮음) | 일부 기관 2025 $143.6B 등 광의 정의 수치 혼재 | 산정에 사용 금지 |

- **1Q26 실측 연환산 ~$74B** — 단 쇼티지 가격 급등(+80%/분기)이 부풀린 수치. 산정 시 "가격 정상화 시나리오"를 별도로 둘 것
- 하이퍼스케일러의 enterprise SSD 소비 비중 55~65% (기존 소스 [captive-ssd-fdp-context-2026-08.md](captive-ssd-fdp-context-2026-08.md) §1, [ssd-ufs-market.md](../../wiki/concepts/ssd-ufs-market.md)) → Captive-addressable 모수의 기준

## §4. 6장 산정 지침

1. 기준 앵커는 TrendForce 분기 실측($18.46B/분기) — 기관 전망치는 교차 검증용
2. 삼성의 서사는 "시장 진입"이 아니라 **1위 수성**: 무대응 시 Captive 침식 기준선(counterfactual) 대비 방어된 매출 + Captive 계획 물량의 완제품 전환 + SW 매출의 3층 구조로 산정
3. 점유율 변동성(4Q25 33.8% ↔ 1Q26 38.2%)이 크므로 특정 분기 수치 단독 인용 지양, 범위로 표기

## 원본 링크

- I-Connect007 — Top Five Enterprise SSD Brands Post Record $18.46 Billion Revenue in 1Q26: https://iconnect007.com/article/150370/top-five-enterprise-ssd-brands-post-record-1846-billion-revenue-in-1q26/150367/ein
- TrendForce — Global Top Five Enterprise SSD Vendors Post Over 50% QoQ Revenue Growth in 4Q25 (2026-03-13): https://www.trendforce.com/presscenter/news/20260313-12967.html
- TrendForce — Enterprise SSD Prices and Shipments Surge in 3Q25, Industry Revenue Climbs 28% (2025-12-05): https://www.trendforce.com/presscenter/news/20251205-12819.html
- TrendForce — AI Infrastructure Continues to Strengthen NAND Flash Demand; Kioxia Posts Highest QoQ Growth of 33.1% in 3Q25 (2025-12-03): https://www.trendforce.com/presscenter/news/20251203-12813.html
- Intel Market Research — Enterprise SSD for AI Market Outlook 2026-2034: https://www.intelmarketresearch.com/enterprise-ssd-for-ai-market-40989
- Mordor Intelligence — North America Data Center SSD Market: https://www.mordorintelligence.com/industry-reports/north-america-data-center-ssd-market
