# 호스트 배치 4케이스별 WAF·유효 DWPD 팩트 원장 — 무배치·멀티스트림·FDP·혼재

**수집일**: 2026-09-23
**유형**: 웹 검색 기반 종합 (Research Agent 수집, 판단·해석 없음)
**용도**: QLC eSSD 전략 덱 v7.0 — 1장 교훈 재편·4장 배치 힌트 신설 근거

---

type: research-ledger
topic: 호스트 데이터 배치 4케이스(A 무배치 / B 멀티스트림 / C FDP 완전태깅 / D 혼재 트래픽)별 WAF 실측 근거
agent: Research Agent (r8) — 사실 수집 전용, 판단·해석 금지
collected: 2026-09-23
purpose: 4-panel explainer 도해의 수치 방어 근거 + 케이스별 유효 DWPD 산출
---

# r8 — 배치 케이스별 WAF 팩트 원장

## 0. 수집 조건 (등급 판정에 직접 영향 — 반드시 먼저 읽을 것)

### 0.1 이번 세션의 접근 제약
- **WebSearch: 정상 작동** (이전 세션의 예산 소진은 해소됨). 이번 원장의 🟡 다수가 검색엔진 요약 경유.
- **WebFetch / curl 직접 접근: 대부분 차단.** 이번 세션에서 EGRESS_BLOCKED 확인: `usenix.org`, `mdpi.com`, `lwn.net`, `borecraft.com`, `en.dapustor.com`. `manpages.ubuntu.com`은 503.
- **직접 fetch 성공한 유일 호스트: `github.com` / `raw.githubusercontent.com`.** → 이 경로로 읽은 것만 ✅(1차).
- 결과: **Kang HotStorage'14의 WAF 수치표는 이번에도 확보 실패** (§2 Case B 참조). 3회 다른 질의로 시도했으나 검색 요약에도 WAF 절대값이 나오지 않음.

### 0.2 등급
| 등급 | 의미 |
|---|---|
| ✅ | 1차 원문(코드·스펙·공식 문서)을 이번 세션에 직접 읽음, 또는 본 저장소의 기확립 ✅ 사실 |
| 🟡 | 1차 출처에 귀속되고 URL도 특정되나 **검색엔진 요약 경유**로만 얻음. 원문 대조 미완 |
| ⚠️ | 벤더 단독 주장이거나 조건 미명시 |
| ⚠️ 모델 | 측정치가 없어 가정을 명시하고 계산한 값 |
| `[미확보]` | 출처는 특정, 수치 미확보 |

### 0.3 WAF 비교 금지 경고 (재확인)
WAF는 **(워크로드, 호스트 OP, 디바이스 사용률, 디바이스 모델, 측정 구간)** 5요소 종속값이다.
본 원장의 4케이스 표는 **"하나의 연속된 측정"이 아니라 서로 다른 실험에서 뽑은 대표값의 조립**이다.
도해에 쓸 때는 각 패널에 **워크로드·OP 라벨을 반드시 병기**해야 한다.

---

## 1. Case A — 무배치(no placement): 도착 순서대로, 수명 혼재

| ID | 사실 | 수치 | 조건 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| A-01 | **해석적 근사식**: 완전 랜덤 쓰기 정상상태에서 `WA ≈ (1+X)/(2X)`, X = OP factor = (물리−논리)/논리. 문헌의 "바람직한 OP 범위 X = 7%~28%"를 그대로 대입 | **X=7% → 7.6** / **X=28% → 2.3** (문서 자체 예시는 X=25% → **2.5**) | 100% 랜덤 쓰기, 정상상태, greedy GC | (특허 명세) | US 10,289,317 "Memory apparatus and methods thereof for write amplification aware wear leveling" https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10289317 | 🟡 |
| A-01b | **주의**: 이 근사식은 greedy GC의 정확해(Hu'09/Desnoyers'12의 Lambert-W 형)보다 **보수적(과대) 추정**이다. 저OP 구간에서 특히 과대. 7% OP의 7.6은 **상한 성격**으로 읽어야 하고 도해에 단독 인용하면 위험 | — | — | — | 본 원장 주석 (정확해는 이전 원장 W02·W04·W05 항목, 수치 `[미확보]`) | ⚠️ |
| A-02 | **★ 실측 앵커 1**: Meta CacheLib, 1.88TB FDP SSD, KV cache trace. **디바이스 100% 사용(호스트 OP 0%)에서 Non-FDP SSD WAF = 3.22** | **3.22** | CacheLib KV cache trace, 디바이스 100% 사용 | (CacheLib FDP 문서) | https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md | ✅ |
| A-03 | **★ 실측 앵커 2**: 같은 드라이브·같은 트레이스, **디바이스 50% 사용(호스트 OP 50%)에서 Non-FDP WAF = 1.22** → 사용률만 바꿔도 baseline이 **1.22 ↔ 3.22 (2.6배)** 로 흔들린다는 자체 증거 | **1.22** | 동일, 디바이스 50% 사용 | (동일) | (동일) | ✅ |
| A-04 | Samsung FDP 백서 서술: CacheLib 배포가 **전체 사용 시 WAF ≈ 3.5**에 직면했고, **SSD WAF를 1.3 이하로 유지하려고 사용률을 50%로 낮춰야 했다** | **≈3.5** (full util) / **<1.3** (50% util) | Meta 프로덕션 flash cache | 2023-10-24 백서 | Samsung "Introduction to Flexible Data Placement" https://download.semiconductor.samsung.com/resources/white-paper/FDP_Whitepaper_102423_Final.pdf (본문 fetch 차단, 검색 인용) | 🟡 |
| A-05 | Samsung/NVMe 계열 서술: **랜덤 워크로드·50% 사용률에서 WAF 약 3 → 약 1** (FDP 적용 시). 즉 이 문맥의 baseline은 **≈3** | **≈3** (baseline) | 랜덤 워크로드, 50% 사용률 | 2023~2025 | 본 저장소 [component-to-system-solution-ladder-facts-2026-09.md](../../../../../home/user/action-learning/sources/articles/component-to-system-solution-ladder-facts-2026-09.md) F51 · NVMe FDP 블로그 | 🟡 |
| A-06 | **DWPD 정격 산정에 쓰는 대표 WAF = 3.** 본 저장소 기확립: "WAF는 통상 4KB 100% 랜덤 쓰기 기준으로 추정, 예시 계산에 WAF 3 사용" | **3** | 4KB 100% 랜덤 쓰기 | — | 저장소 ladder F29 (출처: ATP "Predict SSD lifespan", Kioxia "Understanding TBW versus P/E Cycles") | ✅(저장소) |
| A-07 | ScaleFlux 블로그: "실제 배포에서 WAF는 **2x~5x** 범위인 경우가 많다" (조건 미명시) | **2~5** | "many real-world deployments" | 2026-06-16 | https://scaleflux.com/blog/the-hidden-cost-of-write-amplification-in-enterprise-ssds/ | ⚠️ |
| A-08 | NVMe 협회 블로그의 설명용 예시(실측 아님): 전형적 WAF ≈ 2.5 | **2.5** (illustrative) | 특정 워크로드 아님 | — | https://nvmexpress.org/nvmeflexible-data-placement-fdp-blog/ | 🟡 (실측 아님) |
| A-09 | **GC 정성 메커니즘 (도해 캘리브레이션용)**: 핫·콜드가 같은 물리 블록에 섞이면, 핫 데이터 갱신으로 블록 일부만 조기 무효화되고 **나머지 콜드 페이지는 오래 valid로 남아 계속 복사되므로 WAF가 크게 증가**. 핫만 담은 블록은 GC 시점에 대부분이 obsolete → 복사량 소량. 콜드만 담은 블록은 안정적이라 GC 대상 선정 빈도 자체가 낮음 | 유효페이지 복사 **수치 예시는 `[미확보]`** | 일반 FTL/GC | — | USPTO 9,747,202 "Storage module and method for identifying hot and cold data"; 11,847,318 / 12,204,749 / 11,429,277 "Memory system for controlling nonvolatile memory" (Kioxia 계열) | 🟡 |

### Case A 판정
- **도해에 쓸 방어 가능한 값: WAF ≈ 3 (밴드 2.2 ~ 3.5).** 근거는 세 독립 앵커의 수렴 — CacheLib 실측 3.22(✅), Samsung 백서 서술 ≈3.5(🟡), DWPD 정격 산정 관행 3(✅).
- **OP 라벨을 반드시 병기**: 3.22는 **호스트 OP 0%(디바이스 100% 사용)**, 1.22는 **호스트 OP 50%**. "7% / 28% OP"를 그대로 축에 쓰려면 A-01의 근사식(7.6 / 2.3)을 쓰되 **⚠️ 모델 상한**으로 표기.
- **7% OP에서 WAF 7.6을 실측으로 제시하는 것은 금지.** 실측 앵커가 없다.

---

## 2. Case B — 멀티스트림 (2~8 streams)

| ID | 사실 | 수치 (before→after) | 조건 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| B-01 | Kang·Hyun·Maeng·Cho, "The Multi-streamed Solid-State Drive" — 개념 원전. Samsung Electronics. Cassandra 케이스 스터디 구성: **Single**(전부 1스트림) / **Multi-Log**(CommitLog 분리 = 총 3스트림) / **Multi-Data**(SSTable 티어별 3스트림 추가 분리). 근거: 같은 티어 SSTable은 수명이 비슷하고 다른 티어끼리는 수명이 크게 다르다 | **Cassandra 최악 케이스 update throughput 약 +56%** | Cassandra (CommitLog + SSTable), 실제 멀티스트림 SSD 프로토타입 | 2014-06 (HotStorage'14) | https://www.usenix.org/system/files/conference/hotstorage14/hotstorage14-paper-kang.pdf | 🟡 |
| B-01b | **★ 공백 (3회 재시도 실패)**: **이 논문의 WAF before→after 절대 수치는 이번에도 확보 못 함.** `usenix.org` egress 차단, MDPI·ResearchGate 미러도 차단, 검색 요약에 WAF 절대값이 등장하지 않음. 공개적으로 인용 가능한 것은 **"throughput +56%"라는 성능 지표뿐** | `[미확보]` | — | — | — | `[미확보]` — **덱에 "Kang 2014 WAF X→Y"를 쓰지 말 것** |
| B-02 | 프로토타입 하드웨어: Samsung **NVMe PM953 M.2** SSD 기반 멀티스트림 펌웨어 | — | — | 2014~2017 | 검색 요약 (AutoStream/후속 논문 인용) | 🟡 |
| B-03 | **★ AutoStream** (Samsung, SYSTOR'17) — 앱 수정 없이 런타임 워크로드 감지로 스트림 자동 배정(NVMe Linux 드라이버 프로토타입). **conventional SSD 대비 WAF 최대 60% 감소, 성능 최대 237% 개선** | **−60% (최대)**, 절대 쌍 `[미확보]` | Cassandra-stress 등 평가 워크로드 | 2017 (SYSTOR'17) | https://dl.acm.org/doi/10.1145/3078468.3078469 · 슬라이드 https://www.systor.org/2017/slides/AutoStream.pdf | 🟡 |
| B-04 | **★ FStream** (Rho 외, FAST'18) — 앱 수준 매핑 없이 **파일시스템 계층에서 스트림 추출**. **Filebench: WAF 7~46% 감소, 성능 5~35% 개선. NoSQL DB 벤치마크: WAF 최대 81% 감소, 성능 최대 38% 개선** | **−7~−46%** (filebench) / **−81% (최대)** (NoSQL) | Filebench, NoSQL DB 벤치 | 2018-02 (FAST'18) | https://www.usenix.org/system/files/conference/fast18/fast18-rho.pdf · https://www.usenix.org/conference/fast18/presentation/rho | 🟡 |
| B-05 | **★ FlashAlloc** (Enlightening Flash Storage to Stream Writes by Objects, VLDB'23) — 객체 단위 LBA 범위를 디바이스에 알려 객체별로 블록 전용화. **RocksDB WAF 1.5 감소, F2FS 2.5 감소, MySQL 0.3 감소**(절대 WAF 포인트 감소량), 처리량 각각 2×·1.8×·1.2× | RocksDB **−1.5 WAF 포인트** 등 | 단일 앱 각각 | 2022-01 arXiv / VLDB'23 | https://arxiv.org/abs/2201.04409 · https://dl.acm.org/doi/abs/10.14778/3611479.3611524 | 🟡 |
| B-06 | 업계 통상 드라이브가 지원하는 FDP/stream 핸들 수: **2~8개**가 일반적 (ScaleFlux 브리핑 경유 = 경쟁사 자기평가). 호스트 측 실사용: f2fs **3**, 레거시 write-life 힌트 **5**, XFS 사용자 스트림 **16** | 2~8 (드라이브) / 3·5·16 (호스트) | — | 2026 | 저장소 [qlc-v6-fdp-placement-handles-2026-09.md](../../../../../home/user/action-learning/sources/articles/qlc-v6-fdp-placement-handles-2026-09.md) P-05·H-04·H-05·H-06 | 🟡 / ✅(코드) |
| B-07 | **저장소 기확립 정성 결론**: 멀티스트림·AutoStream·FTL 핫콜드 추정·IO Determinism 등 "디바이스·드라이버 단독 적응" 시도는 **QoS·성능은 개선했으나 실 워크로드 WAF는 ≈3에서 크게 벗어나지 못했다.** 데이터 수명은 호스트·앱에만 있는 정보이기 때문 | WAF ≈3 잔존 | 실 캐시 워크로드 | 2026-09 | 저장소 ladder F36~F40, 독해 문단 | 🟡 (F40만 ✅) |
| B-08 | **채택 실패 사실**: NVMe Streams directive는 NVMe 1.3(2017)로 표준화됐으나 업계 채택 미미 — "did not find much traction in the industry" | — | — | 2017~ | 저장소 [fdp-technical-limits-adoption-context-2026-08.md](../../../../../home/user/action-learning/sources/articles/fdp-technical-limits-adoption-context-2026-08.md) §1 · iokpp.de | 🟡 |

### Case B 판정
- **절대 before→after 쌍을 가진 멀티스트림 실측이 공개 문헌에 사실상 없다.** 있는 것은 전부 **상대 감소율**(−60% AutoStream, −7~−46%/−81% FStream)과 **WAF 포인트 감소량**(FlashAlloc −1.5 등)이다.
- 도해용 값은 **상대 감소율을 Case A baseline 3.0에 적용해 만들어야 하며, 그 합성 자체가 ⚠️ 모델이다.**
- 권장: **WAF 3.0 → 1.8 (−40%)**. −40%는 AutoStream 최대 −60%와 FStream filebench −7~−46% 밴드의 **보수적 중앙값**. 상단(−60~−81%)은 워크로드 특화 최댓값이므로 헤드라인에 쓰지 말 것.
- **스트림 수 라벨: 2~8** (B-06과 일치, Kang의 Multi-Log 3 / Multi-Data 6 구성과도 정합).

---

## 3. Case C — FDP 배치 힌트, 완전 태깅

| ID | 사실 | 수치 (before→after) | 조건 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| C-01 | **★ CacheLib 공식 문서 (Meta)** — 1.88TB FDP SSD, RAM 43GB, SOC 4%, KV cache trace. **디바이스 100% 사용(호스트 OP 0%): 3.22 → 1.03** | **3.22 → 1.03** | CacheLib KV cache trace, 디바이스 100% 사용 | (CacheLib FDP 문서) | https://github.com/facebook/CacheLib/blob/main/website/docs/Cache_Library_User_Guides/FDP_enabled_Cache.md | ✅ |
| C-02 | **★ 동 문서** — **디바이스 50% 사용(호스트 OP 50%): 1.22 → 1.03** | **1.22 → 1.03** | 동일 | (동일) | (동일) | ✅ |
| C-03 | 동 문서 — BigHash(랜덤 쓰기)와 BlockCache(순차 쓰기)가 NAND에서 섞이는 것이 WAF 상승의 원인. **CDN 워크로드처럼 BigHash가 없으면 FDP 분리는 WAF에 아무 차이를 만들지 않음** | 효과 0 (조건부) | CDN 워크로드 | (동일) | (동일) | ✅ — **효과의 조건부성 근거** |
| C-04 | **★ KIOXIA XD8 FDP Performance Brief** — CacheBench 실측. **FDP 비활성 + 메모리 제한: 누적 WAF 2.8 → FDP 활성 ≈1.0. 메모리 제한 없음: 2.2 → ≈1.0** | **2.8 → ≈1.0** / **2.2 → ≈1.0** | CacheBench (CacheLib 벤치), KIOXIA XD8 (TLC 데이터센터 SSD) | (XD8 브리프) | https://americas.kioxia.com/content/dam/kioxia/en-us/business/ssd/data-center-ssd/asset/KIOXIA_XD8_FDP_Performance_Brief.pdf | 🟡 (벤더 브리프) |
| C-05 | **★★ QLC 드라이브 FDP 결과 (요청 항목)** — **KIOXIA LC9 시리즈는 QLC**: 2Tb BiCS FLASH QLC 3D 플래시 32-die 스택 + CBA, 최대 **245.76TB**, **0.3 DWPD**, **FDP 지원**. Kioxia는 **RocksDB용 FDP 플러그인 사용 시 WAF ≈ 1.1** 임을 확인 | **WAF ≈ 1.1** | RocksDB + Kioxia FDP 플러그인 | 2025-07-21/22 (LC9 발표) | https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html · https://www.businesswire.com/news/home/20250721671536/en/ · https://www.storagenewsletter.com/2025/07/23/kioxia-unveils-lc9-series-up-to-245-76tb-pcie-5-0-nvme-2-5-inch-and-edsff-e3-l-form-factor-ssd/ | 🟡 |
| C-05b | **주의(과대주장 방지)**: C-05의 "WAF ≈ 1.1"이 **LC9(QLC) 상에서 측정된 것인지, 플러그인 일반 성능치인지 공개 요약만으로는 분리되지 않는다.** LC9가 QLC·FDP 지원이라는 것과 플러그인 WAF ≈1.1은 확실하나, 두 사실의 결합은 원문 대조 필요 | — | — | — | 본 원장 주석 | ⚠️ — **재검증 1순위** |
| C-06 | **KIOXIA OCP Global Summit 2025** — RocksDB용 신규 오픈소스 플러그인. **4-drive RAID5: WAF −46%, 처리량 MDRAID 대비 8.22×. 2-drive 미러: WAF ≈1/3 (−67%), 처리량 1.45×** | **−46%** / **−67%** | RocksDB, RAID5 4-drive / mirror 2-drive | 2025-10-09/10 | https://americas.kioxia.com/en-us/business/news/2025/ssd-20251009-1.html · https://www.kioxia.com/en-jp/business/news/2025/20251010-1.html | 🟡 |
| C-07 | **XFS write streams 패치 시리즈** — FDP 지원 NVMe에서 **RocksDB YCSB WAF 약 −35%** | **−35%** | RocksDB YCSB on FDP NVMe, XFS write streams | 2026-06/07 (v3/v4) | https://ratatoskr.run/linux-xfs/2026/07/17274958/t · https://ratatoskr.run/linux-fsdevel/2026/06/17142879/t | 🟡 |
| C-08 | **EuroSys'25** (Meta+Samsung) — Meta·Twitter 프로덕션 트레이스 다수에서 **호스트 OP 0%로 device-level WA ≈ 1 달성**, 디바이스 사용률과 무관하게 유지. 규모 환산 시 비용 2×·탄소 4× 절감 주장 | **→ ≈1.0** | Meta·Twitter 프로덕션 flash cache 트레이스 | 2025-03 (EuroSys'25) | https://dl.acm.org/doi/10.1145/3689031.3696091 · https://arxiv.org/abs/2503.11665 | 🟡 |
| C-09 | **"How to Write to SSDs"** (TUM, PVLDB'26) — 단순한 small-RU 최적화로 **40% SOC 조건 CacheLib WAF 1.37 → 1.16** | **1.37 → 1.16** | CacheLib, 40% SOC | 2026 | https://www.vldb.org/pvldb/vol19/p1469-lee.pdf · https://arxiv.org/abs/2603.09927 | 🟡 |
| C-10 | Samsung 기술 블로그 (Hui Qi) — FDP를 RocksDB에 최소 변경으로 통합, **WAF·처리량 최대 4× 개선, 지연 최대 5× 감소** 주장 | **최대 4×** | RocksDB | — | https://semiconductor.samsung.com/news-events/tech-blog/optimizing-rocksdb-write-amplification-on-fdp-ssds | 🟡 (벤더 블로그) |
| C-11 | Solidigm CSAL — QLC 캐시 디바이스의 **WAF를 1.0×에 가깝게 유지**한다는 아키텍처 주장. FDP 채택은 "계획 중(in planning)" 기재 | **→ ≈1.0** (baseline 없음) | QLC + CSAL | — | https://www.solidigm.com/products/technology/platform-optimization-for-performance-and-endurance-qlc-csal.html | ⚠️ |

### Case C 판정
- **도해에 쓸 방어 가능한 값: WAF ≈ 1.03 ~ 1.1.** 헤드라인은 **1.05**로 잡으면 양 끝(CacheLib 1.03 ✅, Kioxia RocksDB 1.1 🟡)을 모두 포괄.
- **QLC 특정 FDP 결과**: 공개 문헌에서 확인 가능한 것은 **Kioxia LC9(QLC, 245.76TB, 0.3 DWPD, FDP 지원) + RocksDB 플러그인 WAF ≈1.1** 하나뿐이며, 그마저 C-05b의 결합 불확실성이 있다. **"QLC FDP 실측"을 단정하려면 원문 대조 필요.** CacheLib·XD8·EuroSys'25는 전부 TLC 계열 드라이브다.
- **반드시 병기할 조건**: 이 값들은 **"수명이 실제로 분리되는 워크로드"**에서만 나온다 (C-03의 CDN 반례).

---

## 4. Case D — 혼재 트래픽 (일부 앱만 태깅, 같은 드라이브/네임스페이스)

### 4.1 결론 먼저
**부분 태깅(partially-tagged) 트래픽의 WAF를 정량 보고한 공개 측정치는 2026-09-23 기준 존재하지 않는다.**
WARP(FAST'26)·EuroSys'25·CacheLib 코드는 **실패 메커니즘**을 정성적으로 규명하고 **양 극단(전원 태깅 / 전원 미태깅)** 을 각각 측정했을 뿐, **태깅 비율 f를 스윕한 곡선은 어디에도 없다.**

| ID | 사실 | 수치 | 조건 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| D-01 | **★ WARP (Song 외, FAST'26; Virginia Tech + Samsung + Western Digital)** — FDP SSD 최초 공개 에뮬레이터 + 포괄 특성화. 핵심: **FDP는 RUH 격리가 객체 수명과 정렬될 때만 near-1 WAF를 유지하고, 수명 오분류(misclassification)·RUH 간섭·적대적 무효화 하에서는 실패한다** | 구체 WAF 수치 `[미확보]` | 상용 FDP 드라이브 2종 이상 + 에뮬레이션 | 2026-02 (FAST'26) | https://www.usenix.org/conference/fast26/presentation/song · https://www.usenix.org/system/files/fast26-song.pdf | 🟡 |
| D-02 | **★★ "Noisy RUH" (기존 미보고 현상, Case D의 직접 근거)** — **한 RUH에 무효화가 집중되면 다른 핸들들의 WAF까지 부풀어 오르며, FDP가 제공해야 할 격리가 깨진다. 상용 디바이스 2종 모두에서 관측됨** | 정성 (**수치 `[미확보]`**) | 상용 FDP SSD 2종 | 2026-02 | (동일) | 🟡 — **"태깅한 앱도 옆 앱 때문에 손해 본다"의 유일한 1차 근거** |
| D-03 | **★★ 실질적 부분태깅 사례 (WARP)** — 10시간 F2FS Fileserver 실행에서 **user data write의 99%가 WARM으로 태깅되어 단일 RUH로 몰렸고, FDP가 conventional SSD 동작으로 붕괴(collapse)했다.** 사용자 데이터는 더 세분화된 분류가 있어야 FDP 효익이 발현됨 | **99%가 1개 RUH로 집중 → 효과 소멸** | F2FS Fileserver, 10h | 2026-02 | (동일) | 🟡 — **"태깅은 했는데 분리가 안 되면 Case A로 되돌아간다"의 실증** |
| D-04 | **★ WARP** — 같은 워크로드가 **한 디바이스에서는 near-ideal WAF, 다른 디바이스에서는 붕괴**한다. 둘 다 "FDP 지원"을 광고함. 이 스펙-실제 격차가 FDP 채택의 최대 장벽 | 디바이스별 편차 (수치 `[미확보]`) | 상용 FDP 드라이브 | 2026-02 | (동일) | 🟡 |
| D-05 | **★★ CacheLib 폴백 동작 (1차 코드 직접 확인)** — `allocateFdpHandle()`이 핸들을 순차 배정하다가 **소진되면 `kDefaultPIDIdx`(= 0)로 폴백**하고, prepare 경로에서 `handle == -1`이면 `getFdpPID(kDefaultPIDIdx)` 즉 **"default stream"** 을 쓴다. 즉 **핸들이 모자라거나 지정되지 않은 쓰기는 전부 0번 핸들 하나에 합류해 서로 섞인다** | 핸들 0 단일 합류 | CacheLib Navy, 현행 main | 2026-09-23 확인 | `cachelib/navy/common/FdpNvme.cpp` — https://raw.githubusercontent.com/facebook/CacheLib/main/cachelib/navy/common/FdpNvme.cpp (코드 주석 원문: `// Use the default stream`) | ✅ |
| D-05b | 동 코드 — `initializeFDPHandles()`는 디바이스 보고값 `nruhsd`를 그대로 받아 `maxPIDIdx_ = nruhsd - 1`로 두고, `nruhsd == 0`이면 예외. **CacheLib 자체에는 핸들 수 하드코딩 상한이 없다** | 디바이스 종속 | 동일 | 2026-09-23 | (동일) | ✅ |
| D-06 | **NVMe FDP 스펙의 untagged write 동작** — **"태깅 없이 쓰거나 유효하지 않은 태그로 쓰는 것은 에러가 아니다."** 즉 스펙은 미태깅 쓰기를 허용하며, 그 쓰기는 컨트롤러가 정한 기본 RUH로 간다. **다만 "initial/default RUH"의 정확한 스펙 문구는 이번 세션에 확보 실패**(`nvmexpress.org` 차단, manpages 503) | 정성 | NVMe TP4146 / Base Spec 2.1 | 2022-11-30 비준 | 검색 요약 (xNVMe FDP 튜토리얼 https://xnvme.io/tutorial/fdp/index.html 계열) | ⚠️ — **스펙 원문 인용은 재검증 필요** |
| D-06b | 관련 확립 사실: PID = `<Reclaim Group, Placement Handle>`이고 Write 명령의 **Data Placement Directive DSPEC 필드**로 전달된다. Placement Handle은 namespace-scoped, RUH는 endurance-group-scoped | — | 스펙 동작 | 현행 | 저장소 [qlc-v6-fdp-placement-handles-2026-09.md](../../../../../home/user/action-learning/sources/articles/qlc-v6-fdp-placement-handles-2026-09.md) S-06·S-08 (xNVMe 1차) | ✅ |
| D-07 | **★★ 멀티테넌트 FDP 측정 (EuroSys'25, 요청 항목)** — 배치 정책이 **여러 테넌트의 SOC/LOC를 서로 다른 RUH로 매핑**할 때(다른 파라미터 동일): **각 테넌트가 FDP로 자기 데이터를 분리하면 DLWA ≈ 1을 유지하고, FDP가 없으면 DLWA가 ≈3.5로 상승한다** | **≈3.5 → ≈1** | 멀티테넌트 flash cache | 2025-03 (EuroSys'25) | https://arxiv.org/pdf/2503.11665 · https://dl.acm.org/doi/10.1145/3689031.3696091 | 🟡 — **단, 이것은 "전원 태깅" vs "전원 미태깅"이지 부분 태깅이 아님** |
| D-08 | **★★ 동거 앱 간섭의 유일한 절대 쌍 (FlashAlloc, VLDB'23)** — **RocksDB와 MySQL을 같은 SSD에서 함께 돌리면 WAF 4.2**, FlashAlloc으로 객체별 블록 전용화를 적용하면 **2.5**로 감소하고 양쪽 처리량이 2배 | **4.2 → 2.5** | RocksDB + MySQL 동거, 단일 SSD | 2022-01 arXiv / VLDB'23 | https://arxiv.org/abs/2201.04409 · https://arxiv.org/pdf/2201.04409 | 🟡 — **Case D 캘리브레이션의 최적 앵커** |
| D-08b | 해석 주의: D-08의 4.2는 **"두 앱 모두 미태깅으로 동거"**, 2.5는 **"두 앱 모두 객체 단위로 분리"** 다. **부분 태깅이 아니며, 2.5라는 값 자체가 "동거 상태에서는 완전 분리를 해도 단일 앱 수준(≈1)까지 못 내려간다"** 는 것을 보여준다 | — | — | — | 본 원장 해석 | ⚠️ |
| D-09 | 핸들 부족의 구조적 원인: 네임스페이스가 바인딩 가능한 Placement Handle **실효 상한 128** (`__le16 phndl[128]`), Linux NVMe 드라이버 상한 **255**(`NVME_MAX_PLIDS = U8_MAX`), 업계 통상 드라이브 **2~8**. 태깅하려는 앱·테넌트가 늘면 핸들 경합 → D-05의 0번 폴백으로 수렴 | 128 / 255 / 2~8 | — | 2026-09 | 저장소 qlc-v6-fdp-placement-handles S-07·H-02·P-05 | ✅ / 🟡 |
| D-10 | **부정 확인**: 태깅 비율(f)에 따른 WAF 곡선, "태깅 앱 N개 + 미태깅 앱 M개" 조합 실험, 미태깅 트래픽이 태깅 앱의 WAF에 주는 정량 페널티 — **어떤 공개 논문·벤더 문서·표준 문서에도 없다** (2026-09-23 검색 기준: WARP, EuroSys'25, CacheLib 문서·코드, Kioxia/Samsung/Solidigm/ScaleFlux 자료, OCP·SNIA 발표 범위) | **없음** | — | 2026-09-23 | 본 세션 검색 종합 | ⚠️(부정 확인) |

### 4.2 Case D 모델 추정 (⚠️ 모델 — 측정치 없음)

**가정 (도해·발표 시 반드시 병기):**
1. 호스트 쓰기의 비율 **f**가 수명에 맞게 태깅되고, **1−f**는 미태깅으로 기본 핸들(0번)에 합류한다 (D-05 ✅, D-06 ⚠️).
2. 태깅분은 Case C 수준(**WAF ≈ 1.05**), 미태깅분은 기본 핸들 안에서 수명이 섞이므로 Case A 수준(**WAF ≈ 3.0**)의 증폭을 받는다.
3. 두 흐름의 가중 평균 위에, **noisy-RUH 간섭 페널티 +10%** 를 얹는다 — D-02가 존재를 확인했으나 **크기는 미측정**이므로 이 10%는 순수 가정이다.

`WAF_D ≈ [ f × 1.05 + (1−f) × 3.0 ] × 1.10`

| f (태깅 비율) | 가중평균 | 간섭 +10% 후 | 비고 |
|---|---|---|---|
| 0.25 | 2.51 | **2.76** | 소수만 태깅 — Case A와 거의 구분 안 됨 |
| **0.50** | 2.03 | **2.23** | **권장 대표값** |
| 0.75 | 1.54 | **1.70** | Case B(1.8)와 대등 |
| 0.90 | 1.25 | **1.37** | 거의 Case C |

**교차검증**: f=0.5 모델값 **2.23** 은 FlashAlloc의 동거 실측 밴드 **4.2 → 2.5**(D-08)의 하단과 같은 자리수이고, CacheLib 50% 사용률 non-FDP **1.22**(A-03)보다는 높다. 즉 **2.2~2.5**가 방어 가능한 밴드다.
**주의**: D-03(F2FS 99% WARM 붕괴)은 **f가 높아도 분류가 거칠면 WAF가 Case A로 되돌아간다**는 것을 보여준다. 위 모델은 **"태깅된 것은 실제로 수명이 분리되어 있다"**는 낙관적 가정 위에 있으며, 현실은 이보다 나쁠 수 있다.

---

## 5. WAF ↔ 내구성(DWPD) 관계

| ID | 사실 | 수치/식 | 조건 | 시점 | 출처 | 등급 |
|---|---|---|---|---|---|---|
| E-01 | **★ 가장 권위 있는 형태의 관계식 (본 저장소 기확립)**: `DWPD = P/E × (1 + OP) ÷ (EOL일수 × WAF)`, `TBW = 물리용량 × P/E ÷ WAF`. EOL은 통상 5년. **WAF는 통상 4KB 100% 랜덤 쓰기 기준으로 추정하며, 예시 계산에 WAF 3을 쓴다** | 위 식 | 엔터프라이즈 SSD 일반 | — | 저장소 ladder **F29** (출처: ATP "Predict SSD lifespan…", Kioxia "Understanding TBW versus P/E Cycles" 기술 브리프 https://americas.kioxia.com/content/dam/kioxia/en-us/business/memory/mlc-nand/asset/KIOXIA-TBW-vs-PE-Cycles-Tech-Brief.pdf) | ✅ |
| E-02 | ⇒ **`DWPD_effective = DWPD_rated × (WAF_rated / WAF_actual)` 는 E-01의 직접 따름정리다.** E-01에서 P/E·OP·EOL일수가 고정이면 DWPD ∝ 1/WAF이므로, 두 WAF 조건의 비를 취하면 이 식이 나온다. **이 형태를 그대로 쓴 1차 출처는 이번에도 못 찾았다** — 덱에는 "E-01에서 유도" 라고 명시할 것 | 유도식 | — | — | 본 원장 유도 (E-01 기반) | 🟡 (유도는 ✅ 식에서, 이 표기 자체는 출처 없음) |
| E-03 | **JESD219 (JEDEC SSD Endurance Workloads)** — SSD application class의 내구성 정격·검증용 워크로드를 정의. **JESD218(SSD Requirements and Endurance Test Method)과 함께 사용.** 2010-09 공표, 2012-07 개정(JESD219A) | — | — | 2010-09 / 2012-07 | https://www.jedec.org/standards-documents/docs/jesd219a · https://www.jedec.org/sites/default/files/docs/JESD219.pdf | 🟡 |
| E-04 | **★ JESD219 엔터프라이즈 워크로드의 정체**: **다양한 블록 길이의 랜덤 쓰기 혼합이며, 4KB·8KB 랜덤 쓰기에 크게 편중(heavily biased)** 되어 있다. 일반적으로 작은 블록 랜덤 쓰기가 큰 블록 순차 쓰기보다 훨씬 큰 write amplification을 낳는다 | 4K·8K 랜덤 편중 | JEDEC 엔터프라이즈 클래스 | 2010~ | 검색 요약 (JEDEC JC-64.8 Alvin Cox 발표자료 https://www.jedec.org/sites/default/files/Alvin_Cox%20[Compatibility%20Mode]_0.pdf · WD 백서 https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/public/western-digital/collateral/white-paper/white-paper-ssd-endurance-and-hdd-workloads.pdf) | 🟡 |
| E-05 | **JESD218 요구(본 저장소 ✅)**: UBER 클라이언트 10⁻¹⁵ / 엔터프라이즈 10⁻¹⁶, 보존 요구 엔터프라이즈 40°C 3개월(활성 55°C 24h/일), FFR 3%. **TBW는 "이 요구를 만족하면서" 쓸 수 있는 양으로 정의** | — | — | — | 저장소 ladder F28 (SNIA 내구성 백서, Seagate TP618, JEDEC JC-64.8) | ✅ |
| E-06 | **★ 정격 DWPD가 워크로드 파생값이라는 직접 증거 (Micron 6600 ION 245TB, QLC)**: **4K 랜덤 0.075 RDWPD · 16K 랜덤 0.3 RDWPD · 128K 순차 1.0 SDWPD.** 같은 드라이브가 워크로드에 따라 **13배** 차이나는 정격을 갖는다. (245TB 모델은 16K indirection unit) | **0.075 / 0.3 / 1.0** | 4K 랜덤 / 16K 랜덤 / 128K 순차 | 2025~2026 | Micron 6600 ION 제품 브리프 https://www.micron.com/content/dam/micron/global/public/products/storage/ssds/data-center/6600/6600-ion-nvme-ssd-product-brief.pdf · StorageReview 리뷰 https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay | 🟡 |
| E-07 | 일반 진술: **내구성은 랜덤 쓰기 워크로드 기준으로 정격화되므로, 주로 순차 쓰기를 하는 드라이브는 정격 TBW를 넘겨 살아남고, 순수 랜덤 워크로드는 정격에 근접한다** | — | — | — | 검색 요약 (Kingston "Understanding SSD endurance: TBW and DWPD" 등) | 🟡 |
| E-08 | 보증 관행: 엔터프라이즈 SSD 보증은 "기간(통상 5년) **또는** TBW·DWPD 선도달" | 5년 or TBW | — | — | 저장소 ladder F53 (삼성 PM9A3 제품 페이지, Micron Enterprise SSD Warranty) | ✅ |
| E-09 | **호스트 측 WAF 관측 수단**: OCP Datacenter NVMe SSD 사양의 SMART Cloud Health 로그(C0)에 **Physical Media Units Written**(NAND 기록량)을 두어, 표준 SMART **Data Units Written**(호스트 기록량)과의 비로 **호스트가 WAF를 직접 계산**할 수 있다 (사양 문구가 WAF 산출 목적을 명시) | — | — | 2020~ | 저장소 ladder F54 (OCP NVMe Cloud SSD Spec v1.0, Datacenter NVMe SSD Spec) | ✅ |

---

## 6. QLC 데이터센터 SSD 정격 DWPD (2025~2026 제품)

| ID | 제품 | 용량 | 정격 DWPD | 보증 | 근거 | 등급 |
|---|---|---|---|---|---|---|
| Q-01 | **Solidigm D5-P5336** (192L QLC) | **122.88TB** | **0.6 DWPD** (= 5년 **134.3PB**) | 5년, MTBF 200만h | https://www.solidigm.com/content/dam/solidigm/en/site/products/technology/p5336-product-brief/documents/Solidigm-D5P5336-ProductBrief.pdf · StorageReview 리뷰 https://www.storagereview.com/review/solidigm-122-88tb-d5-p5336-review-high-capacity-storage-meets-operational-efficiency | 🟡 |
| Q-01b | 동 계열 | 61.44TB | **0.58 DWPD** | 5년 | 저장소 ladder F48 (Solidigm 제품 사양) | ✅(저장소) |
| Q-02 | **KIOXIA LC9** (2Tb BiCS FLASH **QLC**, 32-die 스택, CBA) | **245.76TB** | **0.3 DWPD** | — (FDP 지원 명시) | https://americas.kioxia.com/en-us/business/news/2025/ssd-20250721-1.html · https://www.storagenewsletter.com/2025/07/23/kioxia-unveils-lc9-series-up-to-245-76tb-pcie-5-0-nvme-2-5-inch-and-edsff-e3-l-form-factor-ssd/ | 🟡 |
| Q-03 | **Micron 6600 ION** (QLC, 276L) | **245.76TB** (30.72/61.44/122.88/245.76 라인업) | **0.075 RDWPD(4K 랜덤) / 0.3 RDWPD(16K 랜덤) / 1.0 SDWPD(128K 순차)** | — | Micron 6600 ION 제품 브리프 · https://www.storagereview.com/review/micron-6600-ion-245tb-ssd-review-a-quarter-petabyte-per-drive-bay · https://www.servethehome.com/micron-9650-6600-ion-7600-nvme-ssds/ | 🟡 |
| Q-04 | **Samsung BM1743** (7세대 V-NAND **QLC**) | **61.44TB** | **0.26 DWPD** (선대 BM1733 0.18 대비 향상) | 보증기간 기준, power-off 보존 3개월 | https://www.servethehome.com/the-samsung-bm1743-is-a-61-44tb-today-with-a-122-88tb-drive-possible/ · https://blocksandfiles.com/2024/07/02/samsung-bm1743-qlc-flash/ · https://www.storagenewsletter.com/2024/07/01/samsung-next-gen-qlc-v-nand-in-bm1743-u-2-ssd-increases-data-center-profitability/ | 🟡 |
| Q-05 | **Micron 6550 ION** (QLC, G8/G9) | 61.44TB | **1.0 RDWPD** (16KB 랜덤) | — | 저장소 ladder F48 | ✅(저장소) |
| Q-06 | 대조군 **KIOXIA CM9** (TLC) | — | 읽기집중 **1 DWPD** / 혼합 **3 DWPD** | — | 저장소 ladder F48 | ✅(저장소) |
| Q-07 | **정격 DWPD 추이(5년 환산)**: Intel X25-E 64GB SLC(2008) 17.1 → DC S3700 HET-MLC(2012) 10 → DC P4510 TLC(2018) 0.7 → Solidigm D5-P5316 QLC(2021) 0.41 → 최신 QLC **0.075~0.6** | — | — | — | 저장소 ladder **F30·F17** | ✅(저장소) |

**⚠️ 비교 시 주의**: Q-03의 0.075는 **4K 랜덤 기준**, Q-02의 0.3·Q-05의 1.0은 **16K 랜덤 기준**, Q-01의 0.6은 별도 기준이다. **정격 DWPD는 기준 블록 크기를 병기하지 않으면 비교 불가.**

---

## 7. 4케이스 종합표 + 유효 DWPD (0.6 DWPD @ WAF 3 정격 QLC 기준)

`DWPD_eff = 0.6 × (3 / WAF_actual)` — E-01에서 유도(E-02), WAF_rated = 3은 F29의 4K 100% 랜덤 쓰기 기준값

| 케이스 | 방어 가능한 WAF | 등급 | 한 줄 근거 | 유효 DWPD |
|---|---|---|---|---|
| **A 무배치** | **3.0** (밴드 2.2~3.5) | ✅ (앵커) / ⚠️ 모델 (OP 7%/28% 환산) | CacheLib 비-FDP 실측 3.22(디바이스 100% 사용, ✅) + Samsung 백서 ≈3.5(🟡) + DWPD 정격 산정 관행 3(✅). OP 7%/28% 근사식은 7.6/2.3이나 이는 상한 성격의 모델 | **0.60** |
| **B 멀티스트림 (2~8)** | **1.8** (= −40%) | ⚠️ 모델 (상대 감소율을 A에 적용) | 절대 쌍은 문헌에 없음. AutoStream 최대 −60%(🟡) + FStream filebench −7~−46%·NoSQL 최대 −81%(🟡)의 보수적 중앙값. Kang 2014는 WAF 수치 미공개, throughput +56%만 인용 가능 | **1.00** |
| **C FDP 완전 태깅** | **1.05** (밴드 1.03~1.1) | ✅ | CacheLib FDP 실측 3.22→**1.03** (디바이스 100% 사용, 1차 문서 ✅). Kioxia XD8 2.8→≈1.0(🟡), Kioxia RocksDB 플러그인 ≈1.1(🟡). QLC 특정은 LC9(QLC·FDP·0.3 DWPD)뿐이고 결합 재검증 필요 | **1.71** |
| **D 혼재 트래픽** | **2.2** (밴드 2.2~2.5, f=0.5) | ⚠️ 모델 | **부분 태깅 측정치는 존재하지 않음**(D-10 부정 확인). f=0.5 가중평균 + noisy-RUH 간섭 +10% 가정. 교차검증: FlashAlloc 동거 실측 4.2→2.5(🟡), WARP noisy-RUH·F2FS 99%-WARM 붕괴(🟡), CacheLib 핸들 소진 시 0번 폴백(✅) | **0.82** |

---

## 8. 명시적 공백 (다음 세션 재검증 1순위)

1. **Kang HotStorage'14의 WAF before→after 절대 수치** — 3회 시도 실패. `usenix.org` 차단이 풀리거나 다른 미러 필요. 현재 상태로는 **덱에 Kang WAF 수치를 쓸 수 없다.**
2. **C-05b — Kioxia "RocksDB 플러그인 WAF ≈1.1"이 LC9(QLC)에서 측정된 것인지.** 확인되면 **QLC FDP 실측**이라는 강한 주장이 가능. 확인 전에는 "QLC FDP 실측 사례는 사실상 부재"로 써야 한다.
3. **D-06 — NVMe 스펙의 untagged write / initial RUH 원문 문구.** TP4146 또는 Base Spec 2.1의 해당 절 인용 필요.
4. **WARP의 정량값** — noisy RUH 하에서 다른 핸들의 WAF가 얼마나 오르는지, 오분류율 대 WAF 곡선. 있으면 Case D가 ⚠️ 모델에서 🟡로 승급한다.
5. **AutoStream·FStream의 절대 WAF 쌍** — 상대값만 확보. `dl.acm.org`·`usenix.org` 차단.
6. **GC 유효페이지 복사 수의 수치 예시** — 정성 메커니즘(A-09)만 확보. 도해 캘리브레이션에 쓸 published 수치 예시는 미확보. 필요하면 A-01 근사식에서 자체 계산할 것(⚠️ 모델 표기).
7. **JESD219 본문의 WAF 정의·정격 WAF 값** — JEDEC 문서 유료/차단. E-04는 2차 요약 경유.

## 9. 도해 작성 시 금지사항

- **4패널을 하나의 연속 측정처럼 그리지 말 것.** A(3.22)는 CacheLib 실측, B(1.8)는 상대율 합성, C(1.03)는 CacheLib 실측, D(2.2)는 모델이다. **패널마다 등급 배지(✅/⚠️ 모델)를 달 것.**
- **"Kang 2014: WAF X → Y" 금지** (미확보).
- **"QLC FDP 실측 WAF 1.0" 단정 금지** (C-05b 미해결).
- **"부분 태깅 시 WAF 2.2 측정됨" 금지** — 측정이 아니라 모델이다.
- **CacheLib의 "KV cache"는 LLM KV cache가 아니다** (Meta 소셜그래프 key-value 캐시). 혼동 시 허위 주장이 된다.
