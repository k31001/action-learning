# 대용량 QLC eSSD 벤더별 타임라인 · FDP RUH 지원 수준 · AI 서버 시장 가치 — 웹 리서치 종합 (2026-09-02)

**수집일**: 2026-09-02
**유형**: 웹 검색 기반 2차 자료 종합 (벤더 발표·전문지 보도·TrendForce)
**용도**: [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §2.5·§2.6 — 배경 슬라이드 ①(QLC 경쟁 타임라인·AI 인프라 재배분)·②(RUH 갭) 데이터 기반

---

## §1. 대용량 QLC eSSD 용량·출시 시점 (벤더별)

| 벤더 | 61.44TB | 122.88TB | 245.76TB |
|---|---|---|---|
| **Solidigm** (D5-P5336) | **2023-07 출시** (세계 최초) | 2024-11 발표·출하 | 2026 내 출시 확언 (CEO 인터뷰) |
| **삼성** (BM1743) | 2024-07 출시 (조용한 출시) | FMS 2024 **전시** — 미출하 (2026 현재 announcement 단계) | 2026 출시 전망 (업계 관측) |
| **Micron** (6600 ION, G9 QLC) | — (6550 ION 61.44TB는 TLC) | 2025-Q3 샘플링 | **2026-05-05 출하 개시** (상용 최대 용량 선점) |
| **Kioxia** (LC9, 2Tb QLC 32단 스택) | — | 2025 발표 | 2025 중반부터 샘플링 — GA 미확정 |

- 핵심 독해: **Solidigm이 61TB급을 12개월 선행**(2023-07 vs 삼성 2024-07), 122TB급도 선행 출하. 삼성은 61TB급 1년 후발에 122TB급은 아직 전시 단계. **245TB급 첫 상용 출하는 Micron**(2026-05). 다운턴 극복의 결정 변수였던 "니즈 적중"(§[nand-downturn-2023-vendor-data.md](nand-downturn-2023-vendor-data.md) §4) 경쟁에서 삼성이 용량 리더십 후발임을 보여주는 시계열
- 참고: 2025-10 TrendForce 보도 — 대용량 SSD 수요 폭증으로 삼성·SK·Kioxia 풀가동에도 리드타임 1년 수준 지연

## §2. FDP RUH 지원 수준 — 현행 2~8개 vs KV Cache 오프로드 요구 200+

- **현행 표준 enterprise FDP SSD의 RUH(Reclaim Unit Handle) 지원은 통상 2~8개** (StorageReview, 2026-07-30 — ScaleFlux 플랫폼 보도 내 업계 현황 서술)
- 문제: KV cache 블록은 **세션·테넌트·공유 프리픽스(prefix)·수명 등급별로 스트림을 분리**해야 hot/cold 혼재→GC(가비지 컬렉션) 증폭을 끊을 수 있는데, 소수 RUH로는 이 분리가 불가능 — 소수 스트림에서는 수명이 다른 KV 블록이 같은 소거 블록을 공유해 WAF 문제가 지속 (StorageReview·TechTimes)
- **ScaleFlux 팩트체크 (확인됨)**: NVIDIA **CMX**(Inference Context Memory Storage Platform, CES 2026 발표 — BlueField 기반 KV cache NVMe 오프로드) 타깃 SSD 플랫폼에서 **200+ FDP 쓰기 스트림**을 지원하고, 이 수명 분리로 WAF를 낮춰 **유효 7~10+ DWPD(5년)** 를 달성한다고 발표 (StorageReview 2026-07-30 · PR Newswire 2026-07-30 · TechTimes 2026-08-01)
- **표기 주의**: "RUH 200개"는 NVIDIA가 공식 스펙 문서로 요구한 수치로는 확인되지 않음 — **CMX 오프로드 워크로드가 실질적으로 요구하는 분리 수준을 ScaleFlux가 플랫폼 스펙(200+)으로 제시**한 것이 확인 가능한 사실. 인용 시 "CMX 생태계 타깃 200+ (ScaleFlux 기준)"으로 표기
- NVIDIA는 2026-01 GPU 클러스터 KV cache의 NVMe SSD 오프로드를 표준화하는 방향을 공식화 (Blocks & Files, 2026-01-06)

## §3. AI 서버 시장 가치 — CapEx 재배분의 정량 근거

- **2023: AI 서버 시장 ~$50B, 서버 시장 가치의 ~23%** (TrendForce 재인용 — 기존 수집 [nand-downturn-2023-vendor-data.md](nand-downturn-2023-vendor-data.md) §3)
- **2024: AI 서버 시장 가치 $187B 초과 전망(+69%), 서버 시장 가치의 65%** (TrendForce 보도자료, 2024-07-17)
- 독해: 2023 하이퍼스케일러 CapEx 총량 감소(Amazon 창사 최초 -17%) 국면에서도 AI 서버 가치 비중은 23%→65%로 폭증 궤도 — "총량 붕괴가 아니라 재배분" 명제의 연장 정량 근거

## 원본 링크

- Blocks & Files (삼성 BM1743 61.44TB, 2024-07-02): https://www.blocksandfiles.com/ai-ml/2024/07/02/samsung-takes-on-solidigm-with-6144-tb-qlc-ssd/1611674
- AnandTech (삼성 BM1743 122.88TB FMS 2024 전시): https://www.anandtech.com/show/21526/samsungs-128-tbclass-bm1743-enterprise-ssd-displayed-at-fms-2024
- TechPowerUp (Micron 6600 ION 245TB 출하): https://www.techpowerup.com/348783/industry-leading-245-tb-micron-6600-ion-data-center-ssd-now-shipping
- StorageReview (Micron 6600 ION 245TB 리뷰·122TB 샘플링 시점): https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay
- TechRadar (Kioxia LC9 245.76TB 샘플링·245TB 경쟁 구도): https://www.techradar.com/pro/samsung-archrival-showcases-245tb-pcie-gen5-ssd-joining-kioxia-huawei-and-sandisk-with-solidigm-samsung-and-micron-expected-to-launch-similar-products-in-2026
- TechRadar (Solidigm 245+TB 2026 내 출시 확언): https://www.techradar.com/pro/solidigm-confirms-245-tb-ssds-set-to-launch-before-end-of-2026
- TrendForce (대용량 SSD 리드타임 지연, 2025-10-29): https://www.trendforce.com/news/2025/10/29/news-high-capacity-ssds-reportedly-hit-year-long-delays-as-samsung-sk-and-kioxia-run-full-tilt
- StorageReview (ScaleFlux 200+ FDP 스트림·7~10+ DWPD·현행 2~8 RUH): https://www.storagereview.com/news/scaleflux-kv-cache-ssd-platform-claims-7-10-dwpd-and-200-fdp-streams
- TechTimes (ScaleFlux×NVIDIA CMX, 2026-08-01): https://www.techtimes.com/articles/322601/20260801/kv-cache-churn-burns-through-ssds-scaleflux-built-drive-level-storage-nvidia-cmx.htm
- Blocks & Files (NVIDIA KV cache NVMe 오프로드 표준화, 2026-01-06): https://blocksandfiles.com/2026/01/06/nvidia-standardizes-gpu-cluster-kv-cache-offload-to-nvme-ssds/
- TrendForce (2024 AI 서버 $187B·65%): https://www.trendforce.com/presscenter/news/20240717-12227.html
