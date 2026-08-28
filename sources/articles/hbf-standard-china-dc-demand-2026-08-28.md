# HBF 표준화 현황 + 중국 DC 기업 AI 수요 — 웹 리서치 종합

> **수집일**: 2026-08-28
> **트리거**: 사용자 후속 질의 — "AI 수요 집중이 좋은 전략인가 / 중국 DC 기업과 협업해야 하나 / 미국 집중이 낫나 / 고객 리스트에 미중 공존이 가능한가 / HBF 차별화는 해자인가, 중국이 금방 따라오나"
> **출처**: SanDisk·SK hynix 공식 발표, TrendForce, Digitimes, StorageReview, Forbes, NAND Research, Tom's Hardware, DCD, SCMP 등 (웹 검색 교차)
> **신뢰도**: High (표준화 일정·스펙·CapEx는 복수 매체/공식 보도자료 일치) / Medium (YMTC HBF 개발 — Digitimes 단독 + 기술 정합 추론)
> **태그**: #HBF #AI-inference #standards #china-dc #capex #YMTC

---

## 1. HBF (High Bandwidth Flash) 표준화 현황 — SanDisk·SK하이닉스 주도

### 타임라인

| 시점 | 이벤트 |
|------|--------|
| 2025 | SanDisk가 HBF 개념 공개 ("Scaling the Memory Wall" — AI 추론용 NAND 기반 고대역 계층) + SK하이닉스와 표준화 협력 MOU |
| **2026-02-25** | SK하이닉스·SanDisk **"HBF Spec. Standardization Consortium" 킥오프** — 글로벌 표준화 로드맵 공개 |
| **2026-08-03 (FMS 2026)** | **첫 OCP(Open Compute Project) 기술 스펙 공개** — 컨소시엄 출범 6개월 만. **Google·Tenstorrent가 컨소시엄 합류** (기술 검증·표준 수립 기여) |
| 2026 H2 | SanDisk 첫 HBF 샘플 출하 목표 |
| 2027 초 | HBF 탑재 첫 AI 추론 디바이스 샘플링 예상 |

### 첫 공개 스펙 (OCP)

- **스택당 512GB**, 대역폭 **최대 3.0TB/s** (StorageReview) — HBM과 SSD 사이의 신규 계층. HBM 대비 용량 수 배·비트당 원가 대폭 절감, NAND 기반이므로 비휘발
- 포지셔닝: AI 추론에서 모델 가중치·KV 캐시 등 "용량은 HBM 밖, 속도는 SSD 위" 데이터의 전용 계층

### 삼성의 위치 — 컨소시엄 밖

- 삼성은 SanDisk-SK 컨소시엄에 **불참**. FMS 2026에서 자체 **zNAND-O**(V-NAND 기반 고성능 NAND, 4/8단 버전 개발, 엣지 AI 지향)와 **zHBM**(가속기 위 수직 적층 HBM, HBM5 대비 8배 성능 주장) 컨셉 공개 — 자체 아키텍처 노선
- Digitimes (2026-08-27): **"삼성이 zHBF 추진 신호"** — HBM 너머 NAND 기반 신규 계층 경쟁에 뒤늦게 합류하는 흐름. SanDisk·SK는 스펙 선공개로 **사실상 표준(de facto standard) 선점**을 노림

## 2. 중국의 HBF/HBM 추격 움직임

- **Digitimes (2025-12-31): "YMTC goes full speed toward HBF next"** — YMTC가 3D NAND 진전과 함께 HBF 기술 개발 계획 공개. **Xtacking 아키텍처 진화가 AI 가속기와의 통합(TSV+hybrid bonding, 2.5D/3D)을 지원** — HBF의 구조(NAND 어레이를 로직에 본딩)가 YMTC 창업 아키텍처와 동형
- TrendForce (2025-09-26): YMTC가 **TSV를 이용해 HBM 영역 진입** 보도 — CXMT·Huawei에 이어. Xtacking 1.0→4.0에서 dual stacking·backside power delivery 등 축적
- Tom's Hardware: **Huawei가 중국 내 HBM 제조 컨소시엄 지원** — 제재 우회용 자국 HBM 생태계 구축 (CXMT·YMTC·Huawei 3각)
- 함의: HBF의 다이 적층·본딩 요소는 중국이 빠르게 복제 가능한 영역. 반면 **HBM급 첨단 패키징 장비는 2024년 대중 수출통제 대상**이고, 서방 가속기(NVIDIA·AMD·Google) 패키지 안으로 들어가는 인증·공동설계 경로는 차단되어 있음 — 중국의 HBF는 Ascend 등 자국 가속기 생태계 내 채택 경로

## 3. 중국 DC(하이퍼스케일러) AI 수요 — 규모와 접근 가능성

### CapEx 규모 (TrendForce 2026-08 외)

| 항목 | 수치 |
|------|------|
| 글로벌 톱9 CSP 2026 CapEx (구글·아마존·메타·MS·오라클·바이트댄스·텐센트·알리바바·바이두) | **$886.7B+** — 북미 5사가 ~90% |
| 중국 4사 (바이트댄스·텐센트·알리바바·바이두) 2026 CapEx | **+80%+ YoY** (합산 ~$90B 규모대) |
| 바이트댄스 2026 | RMB 1,600억 (~$23B), 그중 ~$13B AI 프로세서 · NVIDIA 칩 $14B 계획 |
| 알리바바 | 3년간 RMB 3,800억 (~$53B) AI+클라우드 — CEO "더 큰 신규 계획 예고" |
| 텐센트 | 2026년 "대폭 증액" 공언 (특히 하반기, 중국산 AI 칩 가용 시점 연동) |

### 미중 공존의 실측 신호

- 미 행정부가 H200의 대중 판매를 허용하고, **중국 정부도 바이트댄스·알리바바·텐센트 3사에 H200 구매 승인 (3사 합산 최대 40만 개)** — 규제 양쪽 모두에서 "관리된 공존" 방향의 실현 사실
- 단, HBM은 2024년 Big Four 룰로 대중 수출 전면 통제 유지 — **중국 DC에 팔 수 있는 것은 범용 DRAM·NAND·eSSD 등 비통제 품목** ([us-export-controls.md](../../wiki/concepts/us-export-controls.md) 참조)

## 원본 링크

- [SK hynix & Sandisk Kick Off Global Standardization of HBF — TrendForce](https://www.trendforce.com/news/2026/02/26/news-sk-hynix-sandisk-kick-off-global-standardization-of-hbf-market-set-to-surge-by-2030/)
- [Sandisk and SK hynix — First OCP Technical Specification (FMS 2026)](https://www.sandisk.com/company/newsroom/press-releases/2026/2026-08-03-Sandisk-and-sk-hynix-advance-global-standardization-of-hbf)
- [SK hynix Unveils First HBF Standard Specifications — SK hynix Newsroom](https://news.skhynix.com/en/hbf-at-fms-2026/)
- [High Bandwidth Flash Gets Its First Open Spec: 512GB Stacks and Up to 3.0TB/s — StorageReview](https://www.storagereview.com/news/high-bandwidth-flash-gets-its-first-open-spec-512gb-stacks-and-up-to-3-0tb-s)
- [High Bandwidth Flash Advances At The 2026 FMS Conference — Forbes](https://www.forbes.com/sites/tomcoughlin/2026/08/21/high-bandwidth-flash-advances-at-the-2026-fms-conference/)
- [Samsung signals zHBF push as memory race moves beyond HBM — Digitimes](https://www.digitimes.com/news/a20260827VL229/samsung-hbm-bandwidth-capacity-2026.html)
- [Samsung Unveils Next-Gen 3D-Memory Vision at FMS 2026 — Samsung Newsroom](https://news.samsung.com/global/samsung-unveils-next-gen-3d-memory-vision-at-fms-2026-charting-the-future-of-ai-infrastructure)
- [Samsung Showcases zHBM at FMS 2026 — TrendForce](https://www.trendforce.com/news/2026/08/05/news-samsung-expected-to-showcase-zhbm-at-fms-2026-a-next-gen-3d-memory-architecture-with-4x-bandwidth/)
- [YMTC goes full speed toward HBF next — Digitimes](https://www.digitimes.com/news/a20251231PD217/ymtc-3d-hbm-flash-technology.html)
- [China's NAND Giant YMTC Reportedly Moves into HBM Using TSV — TrendForce](https://www.trendforce.com/news/2025/09/26/news-chinas-nand-giant-ymtc-reportedly-moves-into-hbm-using-tsv-following-cxmt-and-huawei/)
- [Huawei backs HBM memory manufacturing in China — Tom's Hardware](https://www.tomshardware.com/pc-components/dram/huawei-backs-development-of-hbm-memory-in-china-new-consortium-aims-to-sidestep-us-sanctions)
- [AI Server Shipments Forecast Raised to Nearly 31% YoY in 2026 — TrendForce](https://www.trendforce.com/presscenter/news/20260803-13161.html)
- [Alibaba considers increasing AI data center capex spend to $69bn over three years — DCD](https://www.datacenterdynamics.com/en/news/alibaba-considers-increasing-ai-data-center-capex-spend-to-69bn-over-three-years-report/)
- [Alibaba, Tencent present a tale of two strategies for AI spending — SCMP](https://www.scmp.com/tech/big-tech/article/3353573/alibaba-tencent-signal-ai-spending-surge-despite-earnings-pressure-china-chips-ramp)
