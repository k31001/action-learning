# 엔터프라이즈 스토리지 벤더별 딜 구조 — 웹 리서치 (2026-08-05)

**수집일**: 2026-08-05
**유형**: 웹 검색 기반 2차 자료 (실행전략 1의 대상 벤더 딜 구조 검증)
**용도**: [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §4.5 실행전략 1 보정

---

## §1. Pure Storage — 완제품 SSD 구매자가 아니다

- Pure는 표준 SSD를 쓰지 않고 **raw NAND를 조달해 자체 DFM(DirectFlash Module, 150TB→300TB QLC)** 을 만들며 FTL을 호스트 SW(Purity)에서 처리
- **Micron과 G9 QLC NAND 협업 공식 발표** (PR Newswire 2025-01) — 컴포넌트 공급은 Micron이 선점
- 하이퍼스케일러(Meta) 딜 구조: **라이선스 모델** — 고객이 NAND를 자체 조달하고 Pure는 SW·비NAND 부품·IP 수수료 수취 (분기 ~$30M, 90%+ 마진, 2번째 하이퍼스케일러 win 2026-08) — 완제품 SSD가 흐르지 않는 구조이며, 오히려 Captive(고객 NAND 직조달) 흐름을 가속
- 함의: "Pure에 SSD 판매"는 실제로는 **raw NAND/웨이퍼 딜(옵션 A 컴포넌트 채널)** — 완제품 부가가치 없음

## §2. VAST Data·DDN — 표준 NVMe SSD 기반 SW 회사

- VAST: DASE 아키텍처 SW 회사 — 하드웨어는 **인증 ODM 박스 + 표준 고용량 QLC NVMe SSD**. 고객·ODM이 SSD를 구매 → **인증(qualification)·레퍼런스 아키텍처 확보가 곧 SSD 판매 경로**
- **CoreWeave와 $1.17B 계약 (2025-11)** — GPU 네오클라우드의 기본 스토리지 지위. 누적 SW 부킹 $4B+·committed ARR $500M+·NRR 300%+ (Series F 보도)
- VAST는 NVIDIA Dynamo(KV cache offloading) 연동 발표 — KV cache 계층의 실전 배치 무대 ([kv-cache-ssd-demand-2026.md](kv-cache-ssd-demand-2026.md) 연계)
- DDN: AI/HPC 어플라이언스 + SW, 표준 SSD 채택 — VAST와 유사 구조

## 원본 링크

- Blocks & Files — Pure 2nd hyperscaler win: https://www.blocksandfiles.com/flash/2026/08/11/second-hyperscaler-plumps-for-everpures-flash-technology/5285903
- Blocks & Files — Meta·Pure 딜: https://blocksandfiles.com/2025/04/07/metas-positive-assessment-of-pure-storages-flash-mettle/
- PR Newswire — Pure×Micron G9 QLC: https://www.prnewswire.com/news-releases/pure-storage-and-micron-collaborate-to-deliver-scalable-energy-efficient-solutions-for-hyperscale-data-centers-302343154.html
- Blocks & Files — VAST $1.17B CoreWeave: https://blocksandfiles.com/2025/11/06/vasts-1-17-billion-coreweave-deal/
- Sacra — VAST Data metrics: https://sacra.com/c/vast-data/
- Forbes — VAST powers CoreWeave: https://www.forbes.com/sites/stevemcdowell/2023/09/27/vast-data-powers-the-storage-for-coreweave-ai-infrastructure/
