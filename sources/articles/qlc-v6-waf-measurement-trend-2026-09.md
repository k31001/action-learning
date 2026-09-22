# WAF 실측 추이와 기법별 before→after — 웹 리서치 팩트 원장

**수집일**: 2026-09-22
**유형**: 웹 검색 기반 2차 자료 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v6.0 개정 — 위키 반영 근거

---

type: research-ledger
topic: Enterprise SSD Write Amplification Factor (WAF) — 시계열/기법별 before→after
researched: 2026-09-22
agent: Research Agent (사실 수집 전용, 판단·해석 금지)
---

# R2 — WAF 변화 추이 팩트 원장 (Fact Ledger)

## 0. 수집 조건과 신뢰도 등급 정의 (반드시 먼저 읽을 것)

### 0.1 이번 세션의 접근 제약 (중요)
이 원장의 등급 체계는 **실제로 원문을 직접 읽었는지** 여부에 따라 매겼다. 이번 세션에서는:

- **WebFetch / curl 직접 접근이 조직 egress 정책으로 차단됨.** 차단 확인된 호스트: `usenix.org`, `arxiv.org`(및 모든 미러: export/ar5iv/xxx.lanl.gov), `dl.acm.org`, `vldb.org`, `nvmexpress.org`, `semiconductor.samsung.com`, `download.semiconductor.samsung.com`, `americas.kioxia.com`, `scaleflux.com`, `snia.org`, `lore.kernel.org`, `lwn.net`, `phoronix.com`, `blocksandfiles.com`, `storagereview.com`, `ccs.neu.edu`, `semanticscholar.org`, `wikipedia.org` 외 다수.
- **접근 가능했던 호스트: `github.com` / `raw.githubusercontent.com` 뿐.**
- **WebSearch 예산 소진** (세션 한도 200/200). 추가 검색 불가.

따라서 다수의 고전 논문(Agrawal 2008, Hu 2009, Desnoyers 2012, Kang 2014)의 **정확한 수치표는 확보하지 못했다.** 확보 못 한 항목은 `[미확보]`로 명시했다. **위키에 옮길 때 미확보 수치를 추정으로 메우지 말 것.**

### 0.2 등급 정의 (이 원장 전용, 보수적으로 조정)
| 등급 | 의미 |
|---|---|
| ✅ | **원문을 직접 읽고 인용한 수치.** 이번 세션에서는 GitHub 경유로 읽은 1차 문서만 해당. |
| 🟡 | 1차 문서(논문/스펙/벤더 문서)에 귀속되는 수치이고 URL도 확보했으나, **검색엔진 요약 경유로만 얻어 원문 직접 대조를 못 함.** 위키 반영 전 원문 확인 권장. |
| ⚠️ | 벤더 마케팅 단독 주장이거나, 워크로드·OP 조건이 명시되지 않아 비교 불가한 수치. |
| `[미확보]` | 출처는 특정했으나 수치를 얻지 못함. 후속 조사 대상. |

### 0.3 WAF 수치 비교 불가 경고
WAF는 **(워크로드, 오버프로비저닝(OP), 디바이스 사용률, 디바이스 모델, 측정 구간)** 5요소에 전적으로 종속된 값이다.
서로 다른 연구의 WAF 숫자는 **원칙적으로 서로 비교할 수 없다.** 이 원장의 표는 "시간순 추세표"가 아니라 **"같은 실험 안에서의 before→after 쌍 모음"**으로 읽어야 한다. (§4 판정 참조)

---

## 1. 번호표 (Fact Table)

| ID | 사실 | 수치 (WAF before→after) | 워크로드 / 조건 | 시점 | 출처 (URL) | 등급 |
|---|---|---|---|---|---|---|
| **W01** | Agrawal 외, "Design Tradeoffs for SSD Performance" — SSD 성능·수명이 워크로드에 극히 민감함을 확립한 기초 논문. 트레이스 기반 시뮬레이터 + 실측 트레이스. | `[미확보]` (WAF 수치표 확보 실패) | 실측 트레이스 기반 시뮬레이션 | 2008-06 (USENIX ATC'08) | https://www.usenix.org/legacy/events/usenix08/tech/full_papers/agrawal/agrawal.pdf | 🟡(서지)·`[미확보]`(수치) |
| **W02** | Hu·Eleftheriou·Haas·Iliadis·Pletka, "Write amplification analysis in flash-based solid state drives" — 로그구조 플래시 SSD의 WA 확률 모델. **핵심 정성 결론: WA는 오버프로비저닝에만 의존하고, 드라이브 용량이나 블록당 페이지 수와 무관하다.** 균일 랜덤 워크로드에서 greedy GC가 WA 최소화 관점에서 최적. | `[미확보]` (OP별 WAF 곡선값 확보 실패) | 균일분포 랜덤 short write, greedy GC | 2009 (SYSTOR'09) | https://dl.acm.org/doi/10.1145/1534530.1534544 | 🟡 |
| **W03** | 동 저자 IBM Research Report — "The Fundamental Limit of Flash Random Write Performance" (RZ3771). W02의 확장판. | `[미확보]` (호스트 차단) | 랜덤 라이트 | 2010경 | https://dominoweb.draco.res.ibm.com/reports/rz3771.pdf | `[미확보]` |
| **W04** | Desnoyers, "Analytic modeling of SSD write performance" / 확장판 "Analytic Models of SSD Write Performance" — **균일 랜덤 트래픽·greedy cleaning에 대한 최초의 거의-정확한 closed-form WA 해.** LRW/greedy cleaning의 비균일 트래픽 성능 열화 모델 포함. | `[미확보]` (수치표 확보 실패) | 균일 랜덤 트래픽 | 2012-06 (SYSTOR'12) / 2014 (ACM TOS) | https://dl.acm.org/doi/10.1145/2367589.2367603 · https://dl.acm.org/doi/10.1145/2577384 | 🟡 |
| **W05** | WA closed-form (Lambert W 형): `A = (-1-ρ) / (-1-ρ - W((-1-ρ)·e^(-1-ρ)))`, W(·)는 Lambert W 함수, ρ는 OP 관련 파라미터. | 공식만 확보, 수치 대입 예시 `[미확보]` | 균일 랜덤 + greedy GC | (NUCAR/Northeastern 자료) | https://ece.northeastern.edu/groups/nucar/NUCARTALKS/WriteAmplification.pdf | 🟡 (**공식 표기 원문 대조 필수**) |
| **W06** | Haas 외, "SSD-iq: Uncovering the Hidden Side of SSD Performance" — **상용 SSD 5종(Samsung·SK hynix·Intel·Micron·WD)의 절대 WAF를 skew를 높여가며 실측.** Fig.3a가 해당 실측 곡선. → **현대 멀티벤더 baseline WAF의 최적 출처 후보.** | `[미확보]` (Fig.3a 수치 확보 실패) | two-zone skewed write workload | 2025 (PVLDB vol.18, p.4295) | https://www.vldb.org/pvldb/vol18/p4295-haas.pdf · https://dl.acm.org/doi/10.14778/3749646.3749694 | 🟡 / `[미확보]` |
| **W07** | NVM Express 공식 블로그: "전형적 예시로 WAF ~2.5는 호스트가 1KB 쓸 때 부수적으로 1.5KB가 추가로 기록됨을 뜻한다. FDP로는 WAF ~1이 가능해졌다." | **2.5 → ~1.0** | 예시(illustrative), 특정 워크로드 아님 | (FDP 블로그) | https://nvmexpress.org/nvmeflexible-data-placement-fdp-blog/ | 🟡 (**실측 아님 — 설명용 예시**) |
| **W08** | ScaleFlux 블로그: "실제 배포 환경에서 WAF는 2x~5x 범위인 경우가 많다. 앱이 1TB를 쓰면 NAND에는 2~5TB가 기록된다." | **2~5x (baseline 범위)** | "many real-world deployments" (조건 미명시) | 2026-06-16 | https://scaleflux.com/blog/the-hidden-cost-of-write-amplification-in-enterprise-ssds/ | ⚠️ |
| **W09** | Kang·Hyun·Maeng·Cho, "The Multi-streamed Solid-State Drive" — 멀티스트림 SSD 개념 제안. Cassandra 케이스 스터디에서 Single / Multi-Log(CommitLog 분리) / Multi-Data(SSTable tier별 3스트림 분리) 구성 비교. | `[미확보]` (**before→after WAF 쌍 확보 실패 — usenix.org 차단**) | Cassandra (CommitLog + SSTable) | 2014-06 (HotStorage'14) | https://www.usenix.org/system/files/conference/hotstorage14/hotstorage14-paper-kang.pdf | 🟡(서지)·`[미확보]`(수치) |
| **W10** | AutoStream — 멀티스트림 SSD의 자동 스트림 관리 (Kang 후속). | `[미확보]` | — | 2017 (SYSTOR'17) | https://dl.acm.org/doi/10.1145/3078468.3078469 | `[미확보]` |
| **W11** | FStream — 파일시스템 레이어에서 플래시 스트림 관리. | `[미확보]` | — | 2018 (FAST'18) | https://www.usenix.org/system/files/conference/fast18/fast18-rho.pdf | `[미확보]` |
| **W12** | Open-Channel SSD / LightNVM (2017) | **이번 세션 미조사** (검색 예산 소진) | — | 2017 (FAST'17) | — | `[미확보]` |
| **W13** | Bjørling 외, "ZNS: Avoiding the Block Interface Tax for Flash-based SSDs" — **ZNS SSD는 전 용량을 쓰면서도 WAF ≈ 1× 를 유지.** 동일 물리 하드웨어의 block-interface SSD 대비 RocksDB 쓰기 처리량 2×, 99.9p 랜덤 리드 지연 최소 2~4× 낮음. | **(block-interface baseline) → ≈1.0** | RocksDB, f2fs (ZNS 대응 개조본) | 2021-07 (USENIX ATC'21) | https://www.usenix.org/conference/atc21/presentation/bjorling · https://www.usenix.org/system/files/atc21-bjorling.pdf | 🟡 |
| **W14** | **[과제 브리프 정정]** ZNS+ 논문 "ZNS+: Advanced Zoned Namespace Interface for Supporting In-Storage Zone Compaction" (Han·Gwak·Shin·Hwang)은 **FAST'21이 아니라 OSDI'21**. LFS-aware ZNS 인터페이스 + in-storage zone compaction(IZC) + sparse sequential overwrite로 threaded logging 기반 블록 회수 가능. | `[미확보]` (WA 감소 수치) | F2FS | 2021 (OSDI'21) | https://www.usenix.org/conference/osdi21/presentation/han · https://www.usenix.org/system/files/osdi21-han.pdf | 🟡 |
| **W15** | ZenFS (Western Digital) 공식 README: "파일을 zone으로 분리하고 write lifetime hint로 수명이 비슷한 데이터를 같은 zone에 배치함으로써 **conventional block device 대비 시스템 write amplification이 크게 감소**. ZenFS는 파일시스템·디스크 모두에서 background GC가 없음을 보장." | **수치 없음 (정성 주장만)** | RocksDB on ZNS | (지속 유지) | https://github.com/westerndigitalcorporation/zenfs/blob/master/README.md | ✅ (원문 직접 확인, 단 수치 없음) |
| **W16** | NVMe TP4146/TP4146a Flexible Data Placement(FDP) 비준 — 호스트가 데이터를 Reclaim Unit 단위로 물리 분리 배치하게 하는 방식. **명시적 목적이 "SSD WAF 감소".** | — | — | "fully ratified", 2022 공개 (**정확한 비준일 요검증**) | https://nvmexpress.org/nvmeflexible-data-placement-fdp-blog/ | 🟡 |
| **W17** | **★ CacheLib 공식 문서 (Meta) — 1.88TB FDP SSD 실측.** RAM 43GB, SOC 4%, key-value cache trace. **NVM Cache = 930GB(디바이스의 50%, 즉 호스트 OP 50%): SSD WAF Non-FDP 1.22 → FDP 1.03** | **1.22 → 1.03** | CacheLib KV cache trace, 1.88TB FDP SSD, 50% 사용률 | (CacheLib FDP 지원 문서) | https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md · https://cachelib.org/docs/Cache_Library_User_Guides/FDP_enabled_Cache/ | ✅ |
| **W18** | **★ 동 문서 — NVM Cache = 1.88TB(디바이스의 100%, 즉 호스트 OP 0%): SSD WAF Non-FDP 3.22 → FDP 1.03** | **3.22 → 1.03** | CacheLib KV cache trace, 1.88TB FDP SSD, 100% 사용률(호스트 OP 0%) | (동일) | (동일) | ✅ |
| **W19** | 동 문서 — **프로덕션 CacheLib은 SSD의 최대 50%를 호스트 오버프로비저닝으로 소모**하고 있었음(OSDI'20 CacheLib 논문 인용). FDP는 **호스트 OP 0%에서도** device WAF를 낮춤. | 호스트 OP: **50% → 0%** | Meta 프로덕션 flash cache | OSDI'20 인용 | https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md · https://www.usenix.org/system/files/osdi20-berg.pdf | ✅ |
| **W20** | 동 문서 — BigHash(랜덤 쓰기)와 BlockCache(순차 쓰기)가 NAND에서 섞이는 것이 WAF 상승 원인. **CDN 워크로드처럼 BigHash가 없으면 FDP 분리는 WAF에 아무 차이를 만들지 않음.** | — (적용 조건 한정) | CDN 워크로드 = 효과 없음 / KV cache 워크로드 = 효과 있음 | (동일) | (동일) | ✅ |
| **W21** | Meta+Samsung, "Towards Efficient Flash Caches with Emerging NVMe Flexible Data Placement SSDs" — Meta·Twitter 프로덕션 트레이스 다수에서 **호스트 오버프로비저닝 0%로 이상적 device-level WA ≈ 1 달성.** 디바이스 사용률과 무관하게 DLWA=1 유지, 고사용률에서 p99 read/write 지연도 개선. 규모 환산 시 비용 2×·탄소배출 4× 절감 주장. | **→ ≈1.0** (baseline 절대값 `[미확보]`) | Meta·Twitter 프로덕션 flash cache 트레이스 | 2025-03/04 (EuroSys'25) | https://dl.acm.org/doi/10.1145/3689031.3696091 · https://arxiv.org/abs/2503.11665 | 🟡 |
| **W22** | KIOXIA XD8 FDP Performance Brief — **CacheBench 실측: FDP 활성 누적 WAF ≈ 1. FDP 비활성 + 메모리 제한 조건 2.8, 메모리 제한 없음 2.2.** | **2.8 → ≈1.0** / **2.2 → ≈1.0** | CacheBench (CacheLib 벤치), KIOXIA XD8 SSD | (XD8 브리프) | https://americas.kioxia.com/content/dam/kioxia/en-us/business/ssd/data-center-ssd/asset/KIOXIA_XD8_FDP_Performance_Brief.pdf | 🟡 (벤더 브리프) |
| **W23** | KIOXIA OCP Global Summit 2025 발표 — RocksDB용 신규 오픈소스 플러그인. **4-drive RAID5: WAF 약 46% 감소 + 처리량 MDRAID 대비 8.22×. 2-drive 미러: WAF 약 1/3 수준으로 감소 + 처리량 1.45×.** 쓰기를 순차로 몰아 단편화·GC를 줄이는 방식. | **−46%** / **≈1/3 (−67%)** — 상대값만 | RocksDB, RAID5 4-drive / mirror 2-drive | 2025-10-09~10 | https://americas.kioxia.com/en-us/business/news/2025/ssd-20251009-1.html · https://www.storagenewsletter.com/2025/10/14/ocp-global-summit-2025-kioxia-improves-flash-storage-lifespan-and-performance-in-rocksdb-with-new-open-source-software/ | 🟡 (벤더 PR) |
| **W24** | Samsung 기술 블로그 "Optimizing RocksDB Write Amplification on FDP SSDs" (Hui Qi, Samsung R&D Institute China-Xian) — FDP를 RocksDB에 최소한의 구조 변경·앱 재작성 없이 통합. **WAF와 처리량 최대 4× 개선, read/write 지연 최대 5× 감소** 주장. | **최대 4× 개선** — 절대 before→after 쌍 `[미확보]` | RocksDB | (블로그) | https://semiconductor.samsung.com/news-events/tech-blog/optimizing-rocksdb-write-amplification-on-fdp-ssds | 🟡 (벤더 블로그) |
| **W25** | Lee 외, "How to Write to SSDs" (TUM, LeanStore) — **FDP는 CacheLib에서 hit ratio 손실 없이 WAF를 1.0 근처로 유지하며, 단순한 small-RU 최적화로 40% SOC 조건에서 CacheLib WAF를 1.37 → 1.16으로 추가 감소.** ZNS는 zone-append로 SSD WAF = 1 (by construction), FDP는 placement hint가 NoWA를 대체. | **1.37 → 1.16** (40% SOC) | CacheLib, small-RU 최적화 | 2026 (PVLDB vol.19, p.1469 / arXiv 2603.09927) | https://www.vldb.org/pvldb/vol19/p1469-lee.pdf · https://arxiv.org/abs/2603.09927 | 🟡 (**원문 대조 필수**) |
| **W26** | 동 논문 — LeanStore out-of-place write 설계 + 페이지 단위 압축/패킹: **YCSB-A에서 트랜잭션당 flash write 6.2~9.8× 감소, 처리량 1.65~2.24× 개선. TPC-C 15,000 warehouse에서 flash write 7.2× 감소, 처리량 2.45× 개선.** (WAF가 아니라 flash write 총량 지표임에 주의) | flash writes/txn **6.2~9.8×↓** (YCSB-A), **7.2×↓** (TPC-C) | LeanStore + YCSB-A / TPC-C 15k WH | 2026 | (동일) | 🟡 |
| **W27** | **★ Song 외, "Characterizing and Emulating FDP SSDs with WARP" — FDP SSD 최초의 공개 에뮬레이터 + 포괄 연구. 핵심 결론: FDP는 RUH 격리가 객체 수명과 정렬될 때만 near-1 WAF를 유지하고, 수명 오분류(misclassification)·RUH 간 간섭(interference)·적대적 무효화(adversarial invalidation) 하에서는 실패한다. 실제 디바이스별 결과 편차가 크다.** WARP는 하드웨어 WAF 추세를 재현하면서 per-RUH 증폭·GC victim 선택·RUH 자원 공유 등 하드웨어가 감추는 내부 동역학을 노출. 현행 하드웨어보다 WAF를 더 줄이는 펌웨어 정책도 탐색. | 구체 수치 `[미확보]` | FDP SSD 다수 디바이스 + 에뮬레이션 | 2026 (FAST'26) | https://www.usenix.org/conference/fast26/presentation/song · https://www.usenix.org/system/files/fast26-song.pdf | 🟡 (**"FDP=WAF 1" 단순화에 대한 직접 반증 근거**) |
| **W28** | Kim(Jeeyun) 외, "DOGI: Data Placement with Oracle-Guided Insights for Log-structured ..." — FAST'26 동시 발표 데이터 배치 논문. | `[미확보]` | — | 2026 (FAST'26) | https://www.usenix.org/system/files/fast26-kim-jeeyun.pdf | `[미확보]` |
| **W29** | Linux 6.16에서 **블록 레이어 write streams** 도입 (NVMe FDP 대응). Jens Axboe가 블록 서브시스템에 머지. 커널 내부에서 write **hint**(데이터 온도 = 수명 암시)와 write **stream**(데이터 배치 = 분리만 암시)의 분리가 6.16부터 시작됨. | — (인프라 도입) | — | Linux 6.16 (2025) | https://www.phoronix.com/news/NVMe-FDP-Block-Linux-6.16 | 🟡 |
| **W30** | **XFS write streams 패치 시리즈 (v3/v4, 2026-06~07) 성능 결과.** 일반 NVMe·fio 4k write·direct IO·16 jobs·16 files×8GiB·iodepth 32·XFS 16 AG: **base 41 KIOPS → generic AG-set 93 KIOPS(+126%) → write-stream AG-set 227 KIOPS(+453%).** intra-stream(4 jobs·4 files×8GiB): **base 59 → generic 94(+59%) → write-stream 112(+89%) KIOPS.** | — (IOPS, WAF 아님) | fio 4k random write, XFS | 2026-06 / 2026-07 | https://ratatoskr.run/linux-fsdevel/2026/06/17142879/t · https://ratatoskr.run/linux-xfs/2026/07/17274958/t | 🟡 |
| **W31** | **★ 동 패치 시리즈 — FDP 지원 NVMe에서 RocksDB YCSB WAF가 base 대비 write-stream 적용 시 약 35% 감소.** | **−35%** (상대값만, 절대 쌍 `[미확보]`) | RocksDB YCSB on FDP NVMe, XFS write streams | 2026-06/07 | (동일) | 🟡 |
| **W32** | Ren 외, "An I/O Characterizing Study of Offloading LLM Models and KV Caches to NVMe SSD" (VU Amsterdam / IBM Research) — DeepSpeed·FlexGen의 블록레이어 I/O 트레이스 특성화. 결과: 모델 오프로딩은 128KiB read 지배, NVMe를 포화시키지 못함. **KV cache 오프로딩은 read/write 혼재·128KiB 요청 지배이고 평균 대역폭은 read 2.0 GiB/s vs write 11.0 MiB/s.** **WAF·endurance 지표는 보고하지 않음** (아티팩트 리포지토리 직접 확인 결과도 I/O 트레이싱 전용). | **WAF 수치 없음 (부재 확인)** | DeepSpeed / FlexGen KV cache 오프로드 | 2025 (CHEOPS'25) | https://dl.acm.org/doi/10.1145/3719330.3721230 · https://atlarge-research.com/pdfs/2025-cheops-llm.pdf · https://github.com/stonet-research/cheops25-IO-characterization-of-LLM-model-kv-cache-offloading-nvme | ✅ (부재 사실에 한해) |
| **W33** | Tutti — 장문맥 LLM 서빙용 SSD-backed KV cache. GDS 기반 SSD-backed LMCache 대비 엄격 SLO 하 TTFT 78.3% 감소, 처리 가능 요청률 2×. **README·공개 요약 어디에도 WAF/endurance 지표 없음.** | **WAF 수치 없음 (부재 확인)** | 장문맥 LLM 서빙 KV cache | 2026-05 (arXiv 2605.03375) | https://arxiv.org/abs/2605.03375 · https://github.com/xPU-IO/Tutti | ✅ (부재 사실에 한해) |
| **W34** | LMCache 공식 리포지토리 — 스토리지 백엔드로 CPU RAM / local disk(SSD) / Redis·Valkey / Mooncake / InfiniStore / S3 / NIXL / GDS 지원. **WAF·endurance 관련 기재 없음.** | **WAF 수치 없음 (부재 확인)** | LLM KV cache 오프로드 | (지속 유지) | https://github.com/lmcache/lmcache | ✅ (부재 사실에 한해) |
| **W35** | **★ ScaleFlux AI-Optimized SSD Platform (NVIDIA CMX·KV cache offload 대상) 발표.** 주장: **KV cache 워크로드에서 5년 기준 "effective DWPD 7 ~ 10 이상"**, **FDP 스트림 200개 이상** 지원. 전제로 "effective endurance는 워크로드 특성·FDP 활용도·디바이스 구성에 따라 달라진다"고 명시. | **effective DWPD 7~10+** (WAF 절대 쌍 없음) | LLM KV cache offload (NVIDIA CMX) | 2026-07-30 | https://www.prnewswire.com/news-releases/scaleflux-introduces-ai-optimized-ssd-platform-designed-for-nvidia-cmx-and-kv-cache-offload-302838473.html · https://www.storagereview.com/news/scaleflux-kv-cache-ssd-platform-claims-7-10-dwpd-and-200-fdp-streams | ⚠️ |
| **W36** | ScaleFlux — "예비 통제 실험(preliminary controlled testing)에서 lifecycle-aware FDP 배치가 baseline 배치 구성 대비 **write amplification 2배 이상 감소**를 측정했다." 절대 WAF 값·워크로드 정의·OP 조건 **모두 미공개**. | **>2× 감소** (절대값 없음) | "KV cache workloads" (정의 미공개) | 2026-07~08 | (동일 W35 출처) | ⚠️ |
| **W37** | ScaleFlux — "1.2:1 정도의 매우 완만한 압축률만 있어도 타 NVMe SSD 대비 2배 endurance"를 얻는다는 주장 (Write Reduction Technology / 압축 기반). | **endurance 2×** (압축 경유, WAF와 별개 메커니즘) | DB 워크로드 일반 | — | https://scaleflux.com/products/technology/what-is-write-reduction/ · https://www.scaleflux.com/blog/item-59 | ⚠️ |
| **W38** | Solidigm CSAL(Cloud Storage Acceleration Layer) — 캐시 디바이스의 WAF를 1.0×에 가깝게 유지해 사용자 애플리케이션 가용 대역폭을 극대화한다는 아키텍처 주장 (QLC 활용 목적). | **→ ≈1.0** (baseline 없음) | QLC + CSAL 캐시 계층 | — | https://www.solidigm.com/products/technology/platform-optimization-for-performance-and-endurance-qlc-csal.html | ⚠️ |
| **W39** | 업계 일반 진술: FDP 사용 시 표준 SSD 마모를 2~3× 줄일 수 있고 쓰기 성능도 비슷한 폭으로 개선된다. (2023 FMS 계열 보도) | **2~3× 마모 감소** | 조건 미명시 | 2023-08 | https://www.forbes.com/sites/tomcoughlin/2023/08/23/sk-hynix-solidigm-fadu-and-microchip-announcements-at-the-2023-fms/ · https://blocksandfiles.com/2023/08/14/using-ssd-data-placement-to-lessen-write-amplification/ | ⚠️ |
| **W40** | DWPD 정의 (ScaleFlux 블로그 기준): 정격 수명 기간 동안 하루에 드라이브 전체 용량을 몇 번 쓸 수 있는가. 100TB 드라이브가 1 DWPD면 하루 100TB 호스트 쓰기, 3 DWPD면 300TB, 10 DWPD면 1,000TB. | — (정의) | — | 2026-06-16 | https://scaleflux.com/blog/the-hidden-cost-of-write-amplification-in-enterprise-ssds/ | 🟡 |
| **W41** | **`DWPD_effective = DWPD_rated × (WAF_rated / WAF_actual)` 공식은 이번 조사에서 이 형태로 명시한 1차 출처를 찾지 못했다.** 이는 고정된 NAND P/E 예산 하에서 "허용 호스트 쓰기량 ∝ 1/WAF"라는 항등식으로부터 따라나오는 **유도식**이며, `WAF_rated`는 드라이브를 정격화할 때 쓴 JEDEC 엔터프라이즈 워크로드에서의 WAF를 뜻한다(JEDEC 표준 번호 **요검증**). | — (유도식, 인용 출처 없음) | — | — | — | `[미확보]` — **인용 없는 주장으로 위키에 넣지 말 것** |

---

## 2. 핵심 before→after 쌍 (같은 실험 내 비교 가능한 것만)

| 기법 | before | after | 조건 | 등급 |
|---|---|---|---|---|
| FDP (CacheLib, 호스트 OP 0%) | **3.22** | **1.03** | 1.88TB FDP SSD, KV cache trace, 디바이스 100% 사용 | ✅ |
| FDP (CacheLib, 호스트 OP 50%) | **1.22** | **1.03** | 동일 디바이스, 디바이스 50% 사용 | ✅ |
| FDP (Kioxia XD8, 메모리 제한) | **2.8** | **≈1.0** | CacheBench | 🟡 |
| FDP (Kioxia XD8, 메모리 제한 없음) | **2.2** | **≈1.0** | CacheBench | 🟡 |
| FDP small-RU 최적화 (CacheLib, 40% SOC) | **1.37** | **1.16** | "How to Write to SSDs" (PVLDB'26) | 🟡 |
| NVMe 협회 예시 (실측 아님) | **2.5** | **~1.0** | illustrative | 🟡 |
| XFS write streams (RocksDB YCSB) | — | **−35%** | FDP NVMe, 상대값만 | 🟡 |
| Kioxia RocksDB 플러그인 (RAID5 4-drive) | — | **−46%** | 상대값만 | 🟡 |
| Kioxia RocksDB 플러그인 (mirror 2-drive) | — | **≈1/3** | 상대값만 | 🟡 |
| ZNS (RocksDB/f2fs) | block-interface baseline (값 미확보) | **≈1.0** | 동일 물리 HW 비교 | 🟡 |

---

## 3. 명시적 공백 (후속 조사 필요)

1. **Kang HotStorage'14 멀티스트림의 실제 WAF before→after 수치** — `usenix.org` 차단으로 미확보. 이 값이 있어야 2014 마일스톤이 차트에 들어갈 수 있다.
2. **Hu 2009 / Desnoyers 2012의 OP별 WAF 곡선 실수치** — "OP 7% → WAF 약 X" 같은 baseline 앵커가 전부 미확보.
3. **Agrawal ATC'08의 WAF 수치** — 미확보.
4. **SSD-iq (PVLDB'25) Fig.3a의 벤더별 절대 WAF** — 현대 baseline으로 가장 가치 있는 미확보 데이터.
5. **Open-Channel SSD / LightNVM (2017)** — 검색 예산 소진으로 아예 미조사.
6. **WARP (FAST'26)의 구체 WAF 수치** — 오분류/간섭 시 WAF가 얼마까지 오르는지가 서사의 핵심인데 미확보.
7. **NVMe TP4053(ZNS) / TP4146(FDP)의 정확한 비준일** — 검색 요약이 "2022"까지만 확인. 과제 브리프의 "2020-06", "2022-12"는 이번 세션에서 **검증하지 못함**.
8. **LLM KV cache 오프로드의 공개 WAF 측정치 — 존재하지 않음** (§5 참조).

---

## 4. 판정 — "WAF 변화 추이" 차트는 공개 데이터로 방어 가능한가?

### 결론: **연도축 시계열(trend line) 차트는 방어 불가. 기법별 before→after 쌍 차트는 방어 가능.**

**시계열이 불가능한 이유 3가지:**

1. **WAF는 단독 측정 가능한 양이 아니다.** (워크로드, 호스트 OP, 디바이스 사용률, 디바이스 모델)에 전적으로 종속된다. W17·W18이 이를 자체 증명한다 — **같은 드라이브·같은 트레이스·같은 코드인데 사용률만 50%↔100%로 바꾸면 baseline WAF가 1.22와 3.22로 2.6배 차이난다.** 서로 다른 논문의 WAF를 연도축에 늘어놓으면 이 교란변수가 전부 숨는다.
2. **conventional SSD의 baseline WAF는 2008→2026 사이에 하락하지 않았다.** 고정 OP에서의 랜덤 라이트 WAF는 Hu(2009)·Desnoyers(2012)가 준 closed-form이 지배하는 **수학**이지 기술 진보가 아니다(W02: "WA는 OP에만 의존"). 바뀐 것은 baseline이 아니라, **호스트 주도 데이터 배치라는 새 메커니즘이 생겨서 WAF를 1 근처로 "고정"할 수 있게 된 것**이다.
3. **FDP가 곧 WAF≈1은 아니다 — FAST'26 WARP(W27)가 직접 반증한다.** FDP는 RUH 격리가 객체 수명과 정렬될 때만 near-1을 유지하고, 수명 오분류·RUH 간섭·적대적 무효화에서는 실패하며 **디바이스별 편차가 크다.** CacheLib 문서(W20)도 같은 방향 — CDN 워크로드처럼 BigHash가 없으면 FDP 분리는 **WAF에 아무 차이도 만들지 않는다.** 매끄러운 우하향 곡선은 이 문헌을 왜곡한다.

### 대신 방어 가능한 시각화 2종

**(A) 기법별 before→after 페어 바 차트** — x축은 연도가 아니라 **기법/실험**, 각 쌍마다 워크로드·OP·디바이스를 라벨로 붙임. §2 표가 그대로 데이터. ✅ 2쌍 + 🟡 여러 쌍. 색으로 등급 구분 권장.

**(B) 인터페이스 역량 타임라인 (범주형, 수치축 없음)** — 2014 Multi-stream(HotStorage) → 2017 Open-Channel/LightNVM → 2020 ZNS(TP4053) → 2021 ZNS ATC'21·ZNS+ OSDI'21 → 2022 FDP(TP4146) → 2025 Linux 6.16 block write streams → 2025~26 EuroSys'25·FAST'26·XFS write streams. **"WAF를 1에 고정할 수 있는 호스트 제어권이 어디까지 왔는가"의 서사**이지, WAF 값의 추이가 아님.

**(C) 절대 금지:** W07(NVMe 예시 2.5), W08(ScaleFlux 2~5x), W17/W18(CacheLib 실측), W22(Kioxia 실측)를 하나의 연도축 선으로 잇는 것. 이들은 각각 illustrative·마케팅 범위·특정 트레이스 실측·특정 벤치 실측으로 **측정 대상 자체가 다르다.**

---

## 5. LLM KV-cache 오프로드 워크로드의 WAF — 공개 측정치 존재 여부

### **결론: 2026-09 기준, LLM KV-cache 오프로드 워크로드에 대한 공개된 WAF 측정치는 존재하지 않는다.**

근거:
- **CHEOPS'25 (W32)** — 이 주제의 유일한 본격 I/O 특성화 논문인데, 보고 지표는 요청 크기 분포(128KiB 지배)와 대역폭(read 2.0 GiB/s vs write 11.0 MiB/s)뿐이고 **WAF도 endurance도 다루지 않는다.** 공개 아티팩트 리포지토리를 직접 확인한 결과도 blktrace 기반 I/O 트레이싱 전용이다.
- **Tutti (W33), LMCache (W34)** — 성능(TTFT, 요청률) 지표만 있고 WAF/endurance 항목 없음.
- **유일한 인접 수치는 벤더 주장뿐이다.** ScaleFlux(W35/W36)의 "KV cache 워크로드 5년 effective DWPD 7~10+", "lifecycle-aware FDP 배치로 WA 2배 이상 감소" — **절대 WAF 값·워크로드 정의·OP 조건이 전부 미공개**라 ⚠️ 등급을 넘을 수 없다.

### ⚠️ 위키 작성 시 반드시 피해야 할 혼동
**CacheLib의 "KV cache"(W17/W18/W22/W25)는 LLM KV cache가 아니다.** Meta의 소셜그래프용 key-value 캐시 워크로드다. 두 값을 같은 문맥에 놓으면 안 된다. 이 혼동은 "LLM KV cache 오프로드의 WAF가 3.22→1.03으로 측정됐다"는 **허위 주장**을 만들어낸다.

---

## 6. 과제 브리프 대비 정정 사항

| 브리프 기재 | 실제 확인 |
|---|---|
| ZNS+ = FAST 2021 | **OSDI '21** (Han·Gwak·Shin·Hwang) |
| ZNS 주 논문 = FAST 2021 | **USENIX ATC '21** (Bjørling 외) |
| XFS write streams = Linux 6.16 (2025) RocksDB 결과 | Linux **6.16(2025)은 블록 레이어** write streams. **XFS 파일시스템 레벨** write streams 패치(RocksDB YCSB WAF −35% 결과 포함)는 **2026-06~07 패치 시리즈 v3/v4** |
| FAST'26 WARP 존재 여부 | **존재 확인.** "Characterizing and Emulating FDP SSDs with WARP" (Song 외), FAST '26 |
| TP4053 2020-06 / TP4146 2022-12 | 이번 세션에서 **비준일 검증 실패**. FDP는 "2022 공개"까지만 확인 |
