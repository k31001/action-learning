# 삼성 SSD 탑재(Design Win) 뉴스 — NVIDIA 서버·AI PC 2축

**수집일**: 2026-08-16
**방법**: WebSearch 교차 검색 + 접근 가능 매체 WebFetch. 다수 매체(wccftech·PC Gamer·ServeTheHome·StorageReview·HotHardware·TechPowerUp·서울경제·Samsung Newsroom 등)가 프록시 차단되어 **검색 요약 경유** 수집이 다수 — 해당 항목은 신뢰도 하향(Med) 표기. 복수 매체 교차 확인된 항목은 High.
**목적**: 위키 공백 보강 — 삼성 SSD의 "탑재/디자인 윈" 축 (NVIDIA 서버·AI 인프라 + AI PC·온디바이스). 기존 보유분(PM1753 CMX 첫 공식 공급, PM1763 GTC 2026 시연, SCADA 경쟁 구도, UFS 5.0)은 재수집하지 않음 — [ssd-ufs-market.md](../../wiki/concepts/ssd-ufs-market.md)·[nvidia-cmx-scada.md](../../wiki/entities/nvidia-cmx-scada.md) 참조.
**신뢰도**: 항목별 표기 (High = 복수 매체 교차 / Med = 검색 요약 경유 또는 단일 매체 / Low = 소셜·집계 매체 단독)

---

## 축 1 — NVIDIA 서버·AI 인프라 탑재

### 1.1 PM1763 양산 개시 — "시연 → 양산" 전환 확정 (신규 핵심)

- **2026-07-08 삼성전자 공식 발표: PM1763 (PCIe 6.0 enterprise SSD) 양산 개시** — 9세대 V-NAND + 4nm 컨트롤러, 차세대 AI·HPC 서버 최적화. 용량 4/8/16TB. (High — Samsung Newsroom/Yahoo Finance/BigDATAwire/TechPowerUp/StorageReview/igorslab 교차, 원문 다수 차단으로 검색 요약 경유)
- 16TB 기준 **순차 읽기 28,400 MB/s · 쓰기 21,900 MB/s — PM1753 대비 2배+** (High). 쓰기 수치는 매체 간 21,000(GTC 시점 보도) ↔ 21,900 MB/s(양산 발표) 병존 — 양산 발표치가 최신.
- 공식 발표 인용(최지장석/Jangseok Choi VP, 메모리 상품기획): **"PM1763은 차세대 AI 플랫폼 검증(validation)을 성공적으로 완료했으며, 진화하는 AI 인프라 요구를 지원할 위치에 있다"** (High — 보도자료 인용).
  - 주의: "Vera Rubin 공식 채택·인증"이라는 표현은 wccftech·HotHardware·Benzinga 등 매체의 해석이며, 삼성 공식 문구는 "next-generation AI platforms" 검증 완료까지다. **최종 플랫폼 통합은 서버 OEM·하이퍼스케일러·NVIDIA 인증 시스템 디자인에 달렸다는 유보를 단 매체도 있음**(HotHardware, Med).
- 액체 냉각(liquid-cooling) 최적화 지원 언급 (Med — 검색 요약).

### 1.2 CMX 물량 구조 — "스펀지" 수요

- **CMX 1유닛 = SSD 576개, 총 9,600TB** (High — Benzinga·PC Gamer·Bitget·X/Jukan 교차).
- **CMX향 NAND 수요: 2026년 3,500만 TB → 2027년 1억+ TB** (업계 추정, High 교차). "NAND 시장에 Apple급 수요원이 하나 더 생기는 규모" 비유 병기 (Med).
- 분석가(Jukan) 인용: "Rubin CMX는 스펀지가 물을 빨아들이듯 NAND 공급을 흡수할 것" (Med — PC Gamer/Yahoo Tech, 원문 차단).

### 1.3 삼성 V-NAND 캐파의 CMX 배정 — 60%+ 보도

- **삼성이 V-NAND 생산 캐파의 60% 이상을 NVIDIA CMX향 공급에 배정**했다는 보도 (Med — BigGo Finance가 한국 매체 재인용, 원문 접근 불가). 월 V-NAND 캐파 10만장+ 중 약 60%가 V9 (Med).
- **서울경제 (2026-07-20경): "삼성·엔비디아 '낸드 동맹' 확대…V10 공급 시작"** — V10(10세대) 양산 및 NVIDIA 공급 개시, V9 수율 안정화·V10 양산·V11(최대 500단) 시험 병행 (Med — 원문 차단, 제목·요약 확인). V11 개발 + "60% for NVIDIA"는 guru3d도 보도 (Med).
- 소비자용 SSD 공급 축소(크런치) 우려 병행 보도 (Med — BigGo).

### 1.4 시황 임팩트 — Vera Rubin 램프의 NAND 스팟 압박

- **Vera Rubin 양산 램프가 TLC NAND 공급을 압박, 512Gb TLC 웨이퍼 스팟가가 6월 슬럼프 후 8월 $21 회복** — 8/9 주간 +4.97% $21.125 (High — TrendForce 스팟 데이터 + wccftech 보도).
- 배경: CMX가 HBM과 백엔드 스토리지 사이 중간 계층으로 "Rubin GPU 클러스터에 붙는 대규모 TLC 플래시 풀"을 신설 → eSSD 수요 구조 확대 (Med).

### 1.5 미확인 — OEM 서버·CMX 후속

- Dell·HPE·Supermicro·Lenovo AI 서버에서 **삼성 eSSD 채택을 명시한 보도는 미발견** (AI 서버 수요 호조 보도는 다수이나 스토리지 벤더 명시 없음).
- PM1753의 CMX **공급 개시일·물량·매출 인식 규모의 구체 수치 보도 미발견** — "삼성이 공급을 시작했다"(Bitget 등 집계 매체, Low) 수준.
- (인접 참고) SOCAMM2: 위키 기보유 — HBM4·SOCAMM2 업계 최초 양산 판매 ([samsung.md](../../wiki/entities/samsung.md)). 본 수집에서 신규 사실 없음.

---

## 축 2 — AI PC·온디바이스 AI 탑재

### 2.1 PM9E1 — 발표 상세 (2024-10)

- **2024-10 삼성 발표: PM9E1 양산 — "AI 응용에 최적인 업계 최고 성능 PC SSD"** (High — Samsung Semiconductor 뉴스, 검색 요약 경유). PCIe 5.0 8채널, **자체 5nm 'Presto' 컨트롤러(삼성 파운드리) + 8세대 V-NAND(TLC)**.
- 스펙: 순차 읽기 14,500 / 쓰기 13,000 MB/s, 랜덤 읽기 2,100K / 쓰기 2,640K IOPS, 512GB~4TB, M.2 2280 (High). 전작 대비 순차 읽기 2배·전력 효율 개선.
- 삼성은 "글로벌 PC 메이커로 공급 확대 + 향후 소비자용 PCIe 5.0 제품 출시로 온디바이스 AI 리더십 강화" 계획 명시 (Med).

### 2.2 NVIDIA DGX Spark 실탑재 확인 — 개인용 AI 기기 design win (신규 핵심)

- **NVIDIA DGX Spark(GB10 기반 데스크톱 AI 슈퍼컴퓨터, FE $4,699) 4TB 모델의 SSD = 삼성 PM9E1 4TB M.2 2242** — Chargerlab 분해로 실물 확인, **모델명 MZALC4T0HBL1-00B07** (High — 분해 실측 + NVIDIA 공식 문서의 self-encrypting NVMe 표기 + NVIDIA 개발자 포럼 교차).
- HotHardware: PM9E1의 **펌웨어가 DGX Spark OS·NVIDIA CUDA·AI UX에 최적화**되었고, SPDM v1.2(기기 인증·펌웨어 증명·보안 채널) 지원 (Med — 원문 차단, 검색 요약).
- 의미(보도 기준): NVIDIA 데이터센터(CMX/Vera Rubin)에 이어 **개인용 AI 기기에서도 삼성이 스토리지 공급사**임이 실물로 확인된 사례.

### 2.3 PM9E1 2242 파생 — CES 2026

- **세계 최초 M.2 22×42mm 양면 실장 4TB Gen5 SSD** (V8 TLC NAND·DRAM을 PCB 양면 배치), 순차 읽기 최대 14.5~14.8GB/s — **CES 2026 Innovation Award honoree** (High — tweaktown·wccftech·TechRadar·guru3d·삼성 테크블로그 교차). CES 2026에서 LPDDR6(10.7Gbps)와 함께 전시.
- 타깃: 공간 제약형 AI PC·고성능 노트북·컴팩트 AI 기기 (DGX Spark류) (Med).

### 2.4 9100 PRO — 소비자 Gen5의 AI 워크스테이션 포지셔닝

- 9100 PRO (PCIe 5.0×4, V8 TLC): 순차 14,800/13,400 MB/s, 랜덤 2,200K/2,600K IOPS, 최대 **8TB** (High — 리테일 스펙 교차). 마케팅 포지셔닝을 "AI 컴퓨팅·게이밍·헤비듀티 워크스테이션"으로 명시 — ML 데이터셋 스트리밍·생성형 미디어 렌더링 임시파일 처리 용례 강조 (High — 삼성 공식 제품 페이지·리테일 리스팅).

### 2.5 갤럭시 북·갤럭시 S26 — 확인/정정

- **Galaxy Book6/Book6 Pro**: Intel Panther Lake(Core Ultra 시리즈 3) + 49 TOPS NPU, Copilot+ PC 지원 (Med). **PM9E1 탑재 여부를 명시한 보도는 미발견**.
- **갤럭시 S26 (2026-03 출시): UFS 4.0 사용 — UFS 4.1 아님** (High — 삼성 확인을 인용한 SamMobile·AndroidHeadlines·PhoneArena·SammyGuru 교차; "1TB 모델은 4.1" 루머를 삼성이 부인). 256GB/512GB/1TB. JEDEC 기준 UFS 4.0↔4.1의 인터페이스 대역폭(레인당 23.2Gbps)은 동일.
  - **위키 정정 포인트**: [ssd-ufs-market.md](../../wiki/concepts/ssd-ufs-market.md) §4의 "UFS 4.1 — 2026 플래그십: iPhone 18 Pro·갤럭시 S26 등" 채택 전망과 상충 → 갤럭시 S26은 4.0 잔류로 확인됨.

---

## 원 링크

축 1:
- [Samsung Newsroom — PM1763 양산 (2026-07-08)](https://news.samsung.com/global/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure)
- [Samsung Semiconductor — PM1763 양산](https://semiconductor.samsung.com/news-events/news/samsung-begins-mass-production-of-pm1763-ssd-optimized-for-next-generation-ai-infrastructure/)
- [wccftech — PM1763 양산·Vera Rubin](https://wccftech.com/samsung-mass-produces-first-pcie-6-0-ssd-to-feed-nvidia-vera-rubin/)
- [ServeTheHome — PM1763 in Production](https://www.servethehome.com/samsung-pm1763-pcie-gen6-enterprise-ssd-in-production/)
- [TechPowerUp — PM1763 양산](https://www.techpowerup.com/350600/samsung-begins-mass-production-of-pm1763-pcie-gen-6-ssd)
- [StorageReview — PM1763 양산 28.4GB/s](https://www.storagereview.com/news/samsung-pm1763-pcie-gen6-ssd-enters-mass-production-with-28-4-gb-s-reads)
- [Benzinga — Vera Rubin용 AI SSD 양산·CMX 576 SSD/9,600TB](https://www.benzinga.com/markets/tech/26/07/60323075/samsung-begins-mass-production-of-high-speed-ai-ssd-for-nvidias-vera-rubin-platform)
- [PC Gamer — "sponge" 분석가 인용](https://www.pcgamer.com/hardware/nvidia-rubin-will-soak-up-nand-supply-like-a-sponge-absorbs-water-says-one-analyst-thanks-to-the-ai-servers-new-way-of-using-ssds/)
- [BigGo Finance — 삼성 NAND 60%+ CMX 배정](https://finance.biggo.com/news/28505c22-0cdb-466a-ae3e-2add03860ceb)
- [서울경제 — 삼성·엔비디아 낸드 동맹 확대, V10 공급 시작](https://www.sedaily.com/article/20069608)
- [guru3d — V11 500단 개발, 60% for NVIDIA](https://www.guru3d.com/story/samsung-develops-v11-nand-with-up-to-500-layers-for-nvidia/)
- [wccftech — Vera Rubin 램프의 TLC NAND 스팟 압박 ($21)](https://wccftech.com/nvidias-vera-rubin-production-ramp-up-is-now-squeezing-tlc-nand-supply-driving-512gb-spot-prices-to-21-after-the-june-slump/)
- [TrendForce — 512Gb TLC 웨이퍼 스팟 +4.97% $21.125](https://www.trendforce.com/price/flash/flash_spot)
- [Bitget — CMX 1억 TB·삼성 공급 개시(집계)](https://www.bitget.com/amp/news/detail/12560605523093)

축 2:
- [Samsung Semiconductor — PM9E1 양산 발표 (2024-10)](https://semiconductor.samsung.com/news-events/news/samsung-starts-mass-production-of-industrys-most-powerful-pc-ssd-optimal-for-ai-applications/)
- [Samsung 테크블로그 — PM9E1 AI-optimized Gen5](https://semiconductor.samsung.com/news-events/tech-blog/samsung-pm9e1-inside-the-leading-ai-optimized-pcie-gen5-ssd/)
- [Chargerlab — DGX Spark 4TB 분해 (PM9E1 확인)](https://www.chargerlab.com/teardown-of-nvidia-dgx-spark-4tb/)
- [HotHardware — PM9E1 optimized for DGX Spark](https://hothardware.com/news/samsung-pm9e1-gen5-2242-ssd)
- [NVIDIA 개발자 포럼 — DGX Spark NVMe 암호화 문의 (모델 MZALC4T0HBL1)](https://forums.developer.nvidia.com/t/request-for-confirmation-of-aes-256-hardware-encryption-on-dgx-spark-nvme-ssd/379512)
- [StorageReview — DGX Spark 리뷰 (Samsung 4TB Gen5 2242)](https://www.storagereview.com/review/nvidia-dgx-spark-review-the-ai-appliance-bringing-datacenter-capabilities-to-desktops)
- [tweaktown — PM9E1 2242 세계 최초 4TB / CES 2026](https://www.tweaktown.com/news/109951/samsungs-new-pm9e1-is-the-worlds-first-4tb-gen-5-ssd-in-the-tiny-m-2-22x42-form-factor/index.html)
- [Samsung 테크블로그 — CES 2026 Innovation Award PM9E1 2242](https://semiconductor.samsung.com/news-events/tech-blog/ces-innovations-awards-2026-honoree-interview-pm9e1-2242)
- [Samsung US — 9100 PRO 8TB (AI 컴퓨팅 포지셔닝)](https://www.samsung.com/us/memory-storage/nvme-ssd/9100-pro-nvme-ssd-sku-mz-vap8t0b-am/)
- [SamMobile — 갤럭시 S26 UFS 버전](https://www.sammobile.com/news/what-ufs-version-galaxy-s26-storage/)
- [AndroidHeadlines — S26 UFS 4.0 사용](https://www.androidheadlines.com/2026/03/samsung-uses-older-ufs-4-0-storage-on-galaxy-s26-devices.html)

---

## 미확인 목록

1. **PM1763의 Vera Rubin "공식 채택·인증" 여부** — 삼성 공식 문구는 "차세대 AI 플랫폼 검증 완료"까지. Vera Rubin 명시는 매체 해석.
2. **PM1753 CMX 공급의 물량·매출 인식 규모** — 구체 수치 보도 미발견 (공급 개시 자체는 집계 매체 수준).
3. **CMX SSD 공급의 경쟁사 진입 여부** (Kioxia·SK·Micron의 CMX 벤더 자격) — 보도 미발견.
4. **Dell·HPE·Supermicro·Lenovo AI 서버의 삼성 eSSD 채택 명시 보도** — 미발견.
5. **삼성 NAND 캐파 60%+ CMX 배정의 1차 출처·정확 수치** — 집계 매체(BigGo) 경유, 한국 원문(서울경제 추정) 원문 접근 불가.
6. **PM9E1의 갤럭시 북(Book6 등)·타 OEM 노트북 탑재를 명시한 보도** — 미발견 ("글로벌 PC 메이커 공급 확대" 계획 언급뿐).
7. **DGX Spark향 PM9E1 공급 물량·매출** — 미발견 (탑재 사실만 확인).
