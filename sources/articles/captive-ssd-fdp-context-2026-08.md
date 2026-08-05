# Captive SSD 위상 변화 + FDP 표준의 기원 — 웹 리서치 종합 (2026-08-05)

**수집일**: 2026-08-05
**유형**: 웹 검색 기반 2차 자료 종합 (하이퍼스케일러의 스토리지 통제권 상승 + FDP 표준 배경)
**용도**: [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) 전략 당위성 데이터 기반
**주의**: "captive SSD 비중 %"의 공식 시계열 통계는 공개되어 있지 않음. 본 노트는 공개 사실(이정표·정량 포인트)을 수집하고, 이를 "고객 통제권의 단계 상승" 프레임으로 배열한다(프레임은 분석적 구성임을 명시).

---

## §1. 하이퍼스케일러의 스토리지 수요 지배력 (정량)

- 하이퍼스케일 클라우드(AWS·Azure·GCP 등)가 **글로벌 enterprise SSD 물량의 약 55%를 소비** — 이들의 조달 결정이 NAND 공급망 전체의 속도를 결정 (SupplyICs, NAND Flash & Enterprise SSD Supply Outlook Q3 2026)
- 2026 공급 부족 국면에서 enterprise SSD 계약가 분기 +80%, NAND 계약가 +70~75% (TrendForce 인용 보도) — 하이퍼스케일러의 개방형 구매 약정이 가격 불문 물량을 흡수

## §2. 구매 단위의 이동 — 완제품에서 웨이퍼로 (Captive 전환의 정량 신호)

- NAND 계약 구조가 **분기 계약 → 다년 계약**으로 이동, 하이퍼스케일러가 **웨이퍼 단위로 직접 구매**: 2025-11 NAND 웨이퍼 계약가 월 +60% 이상 급등 — "hyperscalers purchase capacity for AI data centers" (Tom's Hardware, 2025-11)
- NAND **웨이퍼 가격 Q1 2025 대비 +246%** (Kingston 데이터센터 SSD 사업부 매니저 발언, 2026)
- DRAM 쪽 유사 사례: OpenAI Stargate — 삼성·SK와 월 최대 90만 장 웨이퍼 계약 (기존 위키 [lta-to-sca-industry-context-2026-06.md](lta-to-sca-industry-context-2026-06.md)와 정합)
- 함의: 고객의 구매 단위가 완제품 SSD → 컴포넌트/웨이퍼로 내려간다는 것 = **완제품(컨트롤러·펌웨어) 부가가치를 고객이 내재화**한다는 뜻

## §3. Captive SSD 이정표 — 자체 컨트롤러·자작 SSD

- **AWS Nitro SSD (2021-12)**: AWS가 자체 설계 Nitro 컨트롤러를 탑재한 **자작 SSD**를 공개 — "커스텀 실리콘의 첫 사례가 스토리지로 확장" (BigDATAwire, 2021-12-02)
- 하이퍼스케일러의 build-vs-buy 원칙: "**crown jewels는 만들고, staples는 산다**" — 차별화 가치가 큰 영역부터 내재화 (archilabs; IEEE ComSoc 하이퍼스케일러 in-house 설계 프로세스)
- Google: 자체 서버 보드·랙·TPU 등 인프라 수직 통합의 연장선에서 스토리지 스택 통제 (동)

## §4. FDP 표준의 기원 — 고객이 표준을 설계했다

- **NVMe FDP(Flexible Data Placement) = TP4146**: **Meta와 Google이 각자 WAF(Write Amplification Factor) 문제를 풀다가 합류**, Samsung과 함께 **6개월 만에 표준 비준(2023)** (StorageNewsletter 2025-02-05; NVM Express "Hyperscale Innovation: FDP" 자료)
- 배경: ZNS·Open-Channel 등 기존 데이터 배치 기술의 생태계 복잡성 회피 — 호스트가 RU(Reclaim Unit)에 쓰기를 태깅하는 '힌트' 방식으로 단순화
- **Meta CacheLib이 FDP 지원을 공식화** (cachelib.org 문서), EuroSys 2025 논문 "Towards Efficient Flash Caches with Emerging NVMe FDP SSDs" (ACM)
- **삼성은 FDP 표준의 공동 주도자**: FDP 백서(2023-10)·"Hyperscalers Embrace FDP to Increase Performance and Lower TCO" 등 기술 블로그 발행 (Samsung Semiconductor)
- 함의: FDP는 벤더가 만든 기능이 아니라 **고객(하이퍼스케일러)이 데이터 배치 통제권을 표준으로 요구한 결과물** — 통제권 상승의 4단계(표준 계층)

## §5. 위상 변화 프레임 — 고객 통제권의 단계 상승 (분석적 구성)

| 단계 | 시기(대략) | 고객이 통제하는 계층 | 근거 이정표 |
|---|---|---|---|
| 1. 완제품 구매 | ~2016 | 없음 — 벤더 표준품 선택 | 전통적 조달 |
| 2. 커스텀 스펙·펌웨어 | 2017~2020 | 펌웨어 요구사항 | OCP 스토리지 스펙·고객별 펌웨어 브랜치 관행 |
| 3. 자체 컨트롤러 (Captive) | 2021~ | 하드웨어(컨트롤러) | AWS Nitro SSD (2021-12) |
| 4. 표준 주도 + 웨이퍼 직구매 | 2022~26 | 인터페이스 표준 + 공급 단위 | FDP TP4146 비준(2023, Meta·Google 주도)·웨이퍼 다년 계약(+60%/월, +246% vs Q1'25) |

- 방향: 통제권이 **완제품 → 펌웨어 → 하드웨어 → 표준·공급 단위**로 일관되게 상승. 이 흐름은 되돌릴 수 없으며, 공급자의 선택지는 "흐름을 거스르기"가 아니라 "흐름 위에서 부가가치를 재정의"하는 것.

## 원본 링크

- SupplyICs — NAND Flash & Enterprise SSD Supply Outlook Q3 2026: https://supplyics.com/insights/market-intelligence/nand-flash-enterprise-ssd-supply-outlook-q3-2026/
- Tom's Hardware — NAND wafer shortages push November contract prices up by over 60%: https://www.tomshardware.com/tech-industry/nand-wafer-shortage-pushes-november-contract-prices-up
- Tom's Hardware — AI data centers swallowing memory/storage supply: https://www.tomshardware.com/pc-components/storage/perfect-storm-of-demand-and-supply-driving-up-storage-costs
- BigDATAwire — AWS Adds a Little More Nitro to Its SSDs (2021-12-02): https://www.bigdatawire.com/2021/12/02/aws-adds-a-little-more-nitro-to-its-ssds/
- StorageNewsletter — NVMe FDP: A Promising New SSD Data Placement Approach (2025-02-05): https://www.storagenewsletter.com/2025/02/05/nvme-fdp-a-promising-new-ssd-data-placement-approach/
- NVM Express — Hyperscale Innovation: Flexible Data Placement Mode (FDP): https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf
- Samsung Semiconductor — What Hyperscalers Need to Know About FDP / Hyperscalers Embrace FDP: https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/
- Samsung FDP Whitepaper (2023-10): https://download.semiconductor.samsung.com/resources/white-paper/FDP_Whitepaper_102423_Final.pdf
- Meta CacheLib — FDP enabled cache: https://cachelib.org/docs/Cache_Library_User_Guides/FDP_enabled_Cache/
- ACM EuroSys 2025 — Towards Efficient Flash Caches with Emerging NVMe FDP SSDs: https://dl.acm.org/doi/10.1145/3689031.3696091
- archilabs — How hyperscalers choose to build or buy technology: https://archilabs.ai/posts/how-hyperscalers-choose-to-build-or-buy-technology
- IEEE ComSoc — Hyperscaler compute server in-house design process: https://techblog.comsoc.org/2025/09/01/hyperscaler-compute-server-in-house-designs-with-odm-partners/
