# DT-E 「제품 정의가 바뀌는 경우」 발현 신호 웹 리서치 — 커스텀 HBM·NVHBM·zHBM·CXL 최신 (2026-08-28)

**수집일**: 2026-08-28
**수집 방법**: WebSearch(검색 요약) + 일부 원문 확인 시도. Tom's Hardware·TrendForce·heise 원문은 네트워크 프록시 차단으로 직접 열람 불가 — 검색 결과 요약·복수 매체 교차로 대체. 원문 확인이 안 된 수치는 표기함.
**유형**: article — 웹 검색 기반 2·3차 자료 종합 (팩트만, 해석은 wiki에서)
**용도**: `wiki/downturn/scenario-DT-E.md` 발현 근접도 평가 슬라이드 소스
**한계**:
- 커스텀 HBM **매출 비중 실측치**는 공개 자료 없음 (전망치만 존재)
- CXL 서버 어태치율의 **실측치** 없음 (30%는 2025년 Introl 전망치)
- NVHBM의 물량·가격·계약 규모 미공개
- 일부 스펙 수치는 검색 요약 기반으로 원문 재확인 필요

---

## §1. NVIDIA NVHBM — 고객이 base die를 정의하는 커스텀 HBM (2026-08-26 발표)

- **NVIDIA는 2026-08-26 (Q2 실적 발표와 같은 날) 공식 블로그로 커스텀 HBM `NVHBM`을 발표**했다.
  - 표준 HBM4E 대비 **스택당 대역폭 최대 +30%, 전력 최대 -15%**, 더 작은 온다이 풋프린트.
  - **메모리 컨트롤러를 HBM 스택의 base die 안으로 이동**시키고, 축소된 커스텀 PHY를 **NVLink Fusion 파트너가 자기 설계에 통합**할 수 있게 제공.
  - **첫 파트너는 Amazon Annapurna Labs — Trainium4**가 NVLink Fusion·NVLink 6 지원과 함께 NVHBM 첫 적용 대상.
  - 제조는 NVIDIA 직접이 아니라 **삼성전자·SK하이닉스 등 메모리 제조사가 표준 구현(implementation)으로 생산**하는 구조.
  - 출처: NVIDIA Blog "NVLink Fusion Expands With NVHBM Custom High-Bandwidth Memory" (2026-08-26), Tom's Hardware, StorageReview, VideoCardz, bloomingbit, wccftech (검색 요약 교차)
- **cHBM 구조 변화의 의미 (heise 보도, 검색 요약)**: 기존에는 base die 로직을 항상 메모리 제조사가 만들었으나, cHBM에서는 **고객(NVIDIA 등)이 메모리 스택 제어 로직을 직접 설계**해 자기 프로세서에 통합하거나, base die 트랜지스터를 CPU/GPU로 옮기면 **TSMC 같은 파운드리가 생산**할 수 있다.
- **NVIDIA Feynman 세대(2028 출시 예상)가 cHBM/NVHBM 첫 채택 GPU 세대**로 보도됨 (heise, Wikipedia Feynman microarchitecture, 검색 요약).

## §2. Hot Chips 2026 (2026-08-23~25) — 삼성 zHBM 스펙 공개, SK하이닉스 하이브리드본딩 HBM5로 연기

### 2.1 삼성 zHBM (Hot Chips 2026 발표분 — FMS 2026 목업 공개의 후속)

- **표준 HBM4E 스택 대비 전력 효율 +70% (DRAM 전력 -70%), 대역폭 2.3배(+230%)** 주장. XPU에 **8.3% 추가 전력 여유** 확보.
- 예시: **zHBM 4스택 + 1,200W GPU SiP 구성에서 약 100W 절감**.
- 구조: GPU 등 컴퓨트 칩 **위에 DRAM을 수직 적층**하는 3D 통합 아키텍처. 분산 I/O로 데이터 이동 거리 최소화, SerDes 제거로 I/O 전력 절감, 기존 2D 인터페이스 제거.
- 삼성은 HBM base die에 선단 로직 공정을 활용하는 방향을 함께 제시 (ServeTheHome "Samsung Evolving HBM Base Die at Hot Chips 2026", Chips and Cheese).
- **상용화 시점은 여전히 미공개 (목업/컨셉 단계)**.
- 출처: TrendForce (2026-08-24), ServeTheHome, Chips and Cheese, wccftech, 전자신문 영문판 (검색 요약)

### 2.2 SK하이닉스 — 패키징 노선

- SK하이닉스 이재식 VP, Hot Chips 2026 (08-23): **하이브리드 본딩은 HBM4E에 준비되지 않으며, 도입을 HBM5 이후로 연기**. 마이크로범프(MR-MUF)를 **HBM4E·NVIDIA Rubin 세대까지 연장**.
- 제약: HBM 큐브 총 두께 한계 — JEDEC이 최대 스택 높이를 **720μm → 775μm**(300mm 로직 웨이퍼 표준 두께)로 상향해 다이 박형화 부담을 완화.
- SK하이닉스는 HBM5에서 **iHBM 패키지 구조** + **Intel EMIB 등 어드밴스드 패키징 채택 검토**.
- **HBM5 출시 목표 2029년** (Seoul Economic Daily, 2026-04-06).
- 같은 문제(전력·대역폭)에 삼성은 3D 수직 적층(zHBM), SK는 계층형 메모리·패키징 고도화로 **다른 해법** (전자신문 "Samsung, SK Hynix Take Divergent HBM Paths", 2026-08-25).
- 출처: Tom's Hardware, igorsLAB, Bits&Chips, ServeTheHome, Seoul Economic Daily (검색 요약)

## §3. 커스텀 HBM 로드맵·시장 전망 (2026 최신)

- **커스텀 HBM4E 설계 완료 목표: 삼성 2026년 중반(5~6월), SK하이닉스·마이크론도 유사 일정** — 3사 개발 진도 대등하다는 업계 평가 (TrendForce 2026-01-23, 검색 요약).
- **삼성, 2026년 5월 업계 최초 HBM4E 샘플 출하** 보도. base die는 백엔드 설계 단계 진행 (HBM 설계 통상 ~10개월, 백엔드가 60~70% 비중) (TrendForce 계열 보도, 검색 요약).
- **SK하이닉스 base die 이원화**: 메인스트림 서버용 **TSMC 12nm** + NVIDIA 플래그십 GPU·Google TPU용 프리미엄 **3nm** (검색 요약).
- **삼성 상품기획 VP: 커스텀 HBM이 2027~28년 시간대에 시장의 과반(>50%)이 될 것** (Moor Insights & Strategy 리서치 노트 인용, 검색 요약).
- 커스텀 HBM 시장 규모 전망: **2025년 $6.2B → 2031년 $25.4B, CAGR 26.5%** (Mobility Foresights — 2차 시장조사, 신뢰도 낮음, 참고용).
- TrendForce: 2027년 HBM 계약가 +70~140% 상승 가능 전망, Rubin Ultra GPU당 HBM 384GB (검색 요약, DT-E 직접 신호는 아님 — 표준 HBM 수급 강세의 방증).

## §4. 커스텀 실리콘 생태계 — 설계 주도권의 이동

- **Broadcom: 커스텀 AI 가속기 설계 서비스 시장 점유 70%+** (2026년 초 60~80% 레인지에서 상승). 확인된 고객: Google TPU, Meta, ByteDance, Fujitsu 등 (Tom's Hardware "The custom AI ASIC state of play (May 2026)", hashrateindex, 검색 요약).
- **Marvell: 점유 20~25%** — AWS Trainium·Microsoft Maia 설계 지원. 2026년 4월 Google 커스텀 칩 프로그램 지원 확인 보도.
- **Marvell 커스텀 HBM 컴퓨트 아키텍처**: XPU별 맞춤 인터페이스로 성능·전력·다이 면적·비용 최적화. **Micron·삼성·SK하이닉스 3사와 공동으로 차세대 XPU용 커스텀 HBM 정의·개발 협업** 공식화 (Marvell 뉴스룸·블로그).
- Marvell, FMS 2026에서 **단일 CXL 스위치 뒤 48TB 메모리 확장** 시연 (Futurum, 검색 요약).

## §5. CXL — 프로덕션 진입 실측 vs 풀링 회의론

- **실측 프로덕션 배치**:
  - **Microsoft Azure: CXL 메모리 프로덕션 배포** (검색 요약).
  - **Meta: ISCA 2026 Vistara 논문 — 수명 만료 서버에서 회수한 DDR4를 CXL로 신규 DDR5 서버에 확장 메모리로 부착, 하이퍼스케일 프로덕션 배포** (검색 요약).
  - **Marvell Structera X 2404·2504 CXL 컨트롤러가 하이퍼스케일러에 출하 중** — "평가에서 실배치로 이동" (Futurum, 검색 요약).
- **플랫폼 보급**: 신규 출하 서버의 90% 이상이 CXL 지원 가능(capable) (Eduonix 2026-08 가이드 — 블로그 수준, 신뢰도 낮음). CXL 3.1 광범위 배포가 2026년 기술 마일스톤 (KAD 등).
- **어태치율**: 2026년 서버 CXL 어태치율 30% 전망은 **2025년 Introl 전망치** — 실측 아님. 실측 어태치율 공개 자료 확인 불가.
- **풀링 회의론 (반대 신호)**:
  - Google 연구진 "A Case Against CXL Memory Pooling" (HotNets): 비용·복잡성·효용 3가지 문제 지적. Google·Azure 프로덕션 트레이스 분석 결과 현대 서버는 대부분의 VM에 충분히 커서 풀링 동기가 약함.
  - Microsoft 연구진은 풀링의 비용 이점을 주장 — 업계 내 논쟁 지속.
  - 멀티랙 메모리 풀링의 프로덕션 배치는 CXL 컨소시엄 목표 기준 **2026년 말~2027년** — 아직 미래형.
- 종합: CXL은 **확장(expansion)·재활용(DDR4 reuse) 용도로 프로덕션 진입 실측**, **풀링·패브릭에 의한 서버 DRAM 물량 구조 재편은 미실측**.

## §6. 출처 URL 목록

- NVIDIA Blog — NVLink Fusion Expands With NVHBM Custom High-Bandwidth Memory: https://blogs.nvidia.com/blog/nvlink-fusion-nvhbm-custom-high-bandwidth-memory/
- Tom's Hardware — Nvidia custom 'NVHBM' promises 30% higher bandwidth, 15% lower power than commodity HBM4e: https://www.tomshardware.com/pc-components/dram/nvidia-custom-nvhbm-promises-30-percent-higher-bandwidth-15-percent-lower-power-than-commodity-hbm4e-custom-base-die-and-phy-will-be-available-to-nvlink-fusion-partners
- StorageReview — NVIDIA NVHBM Moves the Memory Controller Into the HBM Stack, With Amazon's Trainium4 First in Line: https://www.storagereview.com/news/nvidia-nvhbm-moves-the-memory-controller-into-the-hbm-stack-with-amazons-trainium4-first-in-line
- VideoCardz — NVIDIA announces NVHBM as industry shifts toward custom HBM designs: https://videocardz.com/newz/nvidia-announces-nvhbm-as-industry-shifts-toward-custom-hbm-designs
- heise online — Nvidia Feynman comes with stacked GPU dies and custom HBM: https://www.heise.de/en/news/Nvidia-Feynman-comes-with-stacked-GPU-dies-and-custom-HBM-11214678.html
- TrendForce — Hot Chips 2026: Samsung's zHBM Claims 70% Power-Efficiency Gain; SK hynix Evaluates Intel EMIB (2026-08-24): https://www.trendforce.com/news/2026/08/24/news-hot-chips-2026-samsungs-zhbm-claims-70-power-efficiency-gain-sk-hynix-evaluates-intel-emib/
- ServeTheHome — Samsung Evolving HBM Base Die at Hot Chips 2026: https://www.servethehome.com/samsung-evolving-hbm-base-die-at-hot-chips-2026/
- Chips and Cheese — Hot Chips 2026: Samsung and HBM Base Die Opportunities: https://chipsandcheese.com/p/hot-chips-2026-samsung-and-hbm-base
- Tom's Hardware — Hot Chips 2026: SK hynix pushes hybrid bonding to HBM5 as AI memory hits 775-micron ceiling: https://www.tomshardware.com/tech-industry/semiconductors/sk-hynix-says-hybrid-bonding-wont-be-ready-for-hbm4e-as-ai-memory-runs-into-a-775-micron-ceiling
- igorsLAB — SK Hynix: HBM4E remains with MR-MUF, HBM5 with Hybrid Bonding: https://www.igorslab.de/en/sk-hynix-delays-hybrid-bonding-hbm4e-mr-muf-hbm5-turning-point/
- Seoul Economic Daily — SK hynix Eyes HBM5 Launch by 2029 with Hybrid Bonding: https://en.sedaily.com/finance/2026/04/06/sk-hynix-eyes-hbm5-launch-by-2029-with-hybrid-bonding
- Electronic Times (영문) — Samsung, SK Hynix Take Divergent HBM Paths: https://en.etnews.com/20260825200005
- TrendForce — Samsung's Custom HBM4E Design Reportedly Aimed for Mid-2026 (2026-01-23): https://www.trendforce.com/news/2026/01/23/news-samsungs-custom-hbm4e-design-reportedly-aimed-for-mid-2026-parallels-sk-hynix-and-micron/
- Moor Insights & Strategy — The Custom Silicon Market Is Exploding, Custom HBM Is Next: https://moorinsightsstrategy.com/research-notes/the-custom-silicon-market-is-exploding-custom-hbm-is-next/
- Mobility Foresights — Custom HBM Market Size 2031: https://mobilityforesights.com/product/custom-hbm-market
- Tom's Hardware — The custom AI ASIC state of play (May 2026): https://www.tomshardware.com/tech-industry/semiconductors/custom-ai-asics-examined-from-broadcom-to-mtia
- Marvell — Custom HBM: What Is It and Why It's the Future: https://www.marvell.com/blogs/custom-hbm-what-is-it-and-why-its-the-future.html
- Marvell 뉴스룸 — Marvell Announces Breakthrough Custom HBM Compute Architecture: https://www.marvell.com/company/newsroom/marvell-announces-breakthrough-custom-hbm-compute-architecture.html
- Futurum — Marvell Scales AI Memory to 48TB Behind a Single CXL Switch at FMS 2026: https://futurumgroup.com/insights/marvell-scales-ai-memory-to-48tb-behind-a-single-cxl-switch-at-fms-2026/
- Eduonix — CXL Memory and Composable Infrastructure: The Complete 2026 Guide: https://blog.eduonix.com/2026/08/cxl-memory-and-composable-infrastructure-the-complete-2026-guide/
- ACM HotNets — A Case Against CXL Memory Pooling (Google): https://dl.acm.org/doi/10.1145/3626111.3628195
- Introl — CXL 4.0 Infrastructure Planning Guide: https://introl.com/blog/cxl-4-0-infrastructure-planning-guide-memory-pooling-2025
- servermall — CXL in 2026: What Actually Works: https://servermall.com/blog/cxl-in-2026-memory-expansion-and-pooling/
