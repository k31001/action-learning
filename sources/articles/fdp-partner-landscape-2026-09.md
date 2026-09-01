# FDP 협업 대상 지형 — 하이퍼스케일러 채택 현황·인증 주기·스토리지 벤더 KV Cache 상용화 (2026-09-01)

**수집일**: 2026-09-01
**유형**: 웹 검색 기반 2차 자료 종합 (벤더 기술 블로그·업계 보도)
**용도**: [fdp-host-ssd-platform.md](../../wiki/strategies/fdp-host-ssd-platform.md) §4.6 — FDP 협업 대상 3유형(하이퍼스케일러·스토리지 벤더·LLM 기업) 비교의 데이터 기반

---

## §1. 하이퍼스케일러 FDP 채택 현황

- FDP는 2022-12 발행된 NVMe 사양으로, **Meta와 Google이 각자 WAF(write amplification) 문제를 풀다가 수렴해 공동 주도**한 표준 — OpenChannel·ZNS가 요구했던 침습적 애플리케이션 수정 없이 WAF를 줄이는 접근 (NVM Express 백서·Samsung Semiconductor 기술 블로그)
- **Meta가 구매하는 모든 SSD에는 이미 FDP가 탑재되어 있으나 기본 비활성(not enabled by default)** — 지원 출하와 실제 활성화 사이의 갭이 존재 (The SSD Guy, 2026). §5 KPI("실제 활성화 용량")의 외부 방증
- 빠른 채택 그룹은 **Meta·Microsoft** 등 하이퍼스케일러로 전망되며, 그 외 시장(엔터프라이즈·클라이언트)은 램프가 느릴 것으로 관측 (The SSD Guy)
- Meta는 FMS 2025 키노트에 하드웨어 엔지니어링 팀이 직접 등장(FADU Sierra FC6161 발표)할 정도로 SSD 벤더 신제품에 조기 관여 — 하이퍼스케일러 SSD 딜 규모 $209M+ 보도 (TechTimes, 2026-07-30)

## §2. 인증 주기 — 지금 시작해야 2027~28 물량

- 드라이브 가용 시점부터 프로덕션 배치까지 **OEM/하이퍼스케일러 qualification은 표준 12~18개월** — FMS 2026에서 엔지니어링 접점을 시작하는 팀은 **빨라야 2027~2028 프로덕션**을 타깃하게 됨 (TechTimes, 2026-07-30)
- 함의: 공급부족 국면(협상력 우위)이 유지되는 지금 워크로드 교환·co-design을 시작해야, 다음 사이클 국면 전환 전에 인증·물량이 연결됨

## §3. 스토리지 벤더의 KV Cache 상용화 (실증 무대 성숙)

- **DDN**: 2026-06-24 고속 어레이 HW + **KV Cache SW 솔루션** 출시 — AI 추론용 KV cache 오프로드를 어플라이언스 제품으로 상용화 (Blocks & Files·HPCwire, 2026-06-24)
- **VAST**: NVIDIA Dynamo 연동 발표 — 기존 수집 [storage-vendor-deal-structures-2026.md](storage-vendor-deal-structures-2026.md)와 정합
- 함의: 스토리지 벤더 층에서 KV cache→SSD 오프로드가 이미 제품화 단계 — FDP·고DWPD 논지([kv-cache-ssd-demand-2026.md](kv-cache-ssd-demand-2026.md))를 실증할 상용 무대가 존재

## §4. LLM 기업의 SSD 설계 관여 (선례 심화)

- Micron↔Anthropic 전략 계약의 공동 최적화에는 **HBM·DRAM과 함께 데이터센터 SSD 설계가 명시** — Claude 워크로드에 맞춘 공동 설계 (TechRadar, 2026; 1차 자료는 [micron-anthropic-sca-2026-06-22.md](micron-anthropic-sca-2026-06-22.md))
- 2026 추론 인프라에서 KV cache가 VRAM→DRAM→로컬 NVMe→네트워크 스토리지의 4계층 위계로 정착, 추론 서버 BOM에 **고내구성 NVMe 다수 장착**이 표준화 (arXiv 2608.01526 외 업계 문서) — 워크로드 정의권이 추론 스택 소유자(LLM 기업)에게 있음을 방증

## 원본 링크

- Samsung Semiconductor 기술 블로그 (하이퍼스케일러 FDP): https://semiconductor.samsung.com/news-events/tech-blog/hyperscalers-embrace-flexible-data-placement-fdp-to-increase-performance-and-lower-tco/
- NVM Express FDP 백서: https://nvmexpress.org/wp-content/uploads/Hyperscale-Innovation-Flexible-Data-Placement-Mode-FDP.pdf
- The SSD Guy (Meta 전 SSD FDP 탑재·채택 전망): https://thessdguy.com/flexible-data-placement-means-better-ssds/
- TechTimes (FADU·하이퍼스케일러 딜·12~18개월 인증): https://www.techtimes.com/articles/322162/20260730/fadu-show-first-physical-gen6-ssd-fms-hyperscaler-deals-top-209m.htm
- Blocks & Files (DDN KV Cache SW): https://www.blocksandfiles.com/ai-ml/2026/06/24/ddn-launches-faster-array-hw-and-kv-cache-sw-for-ai/5261447
- HPCwire (DDN KV Cache): https://www.hpcwire.com/2026/06/24/ddn-preps-for-ai-wave-with-speedy-new-appliance-kv-cache-solution/
- TechRadar (Anthropic↔Micron SSD 공동 설계): https://www.techradar.com/pro/anthropics-claude-to-help-micron-design-better-hbm-dram-and-ssd-for-ai-even-as-both-companies-refuse-to-address-computational-storage-directly
- arXiv (KV cache 인프라 계층): https://arxiv.org/html/2608.01526v1
