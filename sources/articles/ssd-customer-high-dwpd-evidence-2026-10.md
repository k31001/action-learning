# 고객 측 고DWPD 수요 팩트 원장: 하이퍼스케일러 플래시 캐시 쓰기 예산, AI 랩·클라우드 KV 캐시 티어의 쓰기량, 플랫폼·스토리지 벤더 실측, 필드 DWPD 분포와 반증

**수집일**: 2026-10-03
**수집자**: Research Agent (Customer DWPD) · 사실 수집 전용. 전략 판단·권고 없음.
**유형**: 웹 검색 + 1차 원문 직접 열람(Microsoft Research 게시 논문 PDF 4건, GitHub 저장소 원문·데이터·코드, Google Cloud 블로그 원문) 기반 팩트 원장
**용도**: 슬라이드 "실제 고객(하이퍼스케일러·AI 랩·클라우드/추론 사업자·플랫폼 벤더·고객용 스토리지 시스템 벤더)이 높은 SSD 쓰기 내구성(고DWPD)을 요구하거나 소비한다"를 **차트로 그릴 수 있는 수치**로 뒷받침하거나 제약한다. 특히 AI 추론 캐시 티어(KV 캐시 오프로드·컨텍스트 메모리)와 기타 캐시 티어.

**등급**: ✅ 1차 원문 직접 열람(논문 저자본 PDF·공식 저장소 문서·코드·데이터·공식 블로그 원문) / 🟡 2차 매체 또는 검색 인덱스 경유(1차 출처라도 원문을 직접 못 연 경우 포함, `[검색 요약 경유]`) / ⚠️ 파생·단일출처·미검증·충돌 / **⚠️ 파생** = 본 원장이 산술로 직접 도출(산식·가정 명기)

---

## ⚠️ 0. 방법론 고지 (반드시 읽을 것)

**0-1. 도구 제약.** 이번 세션에서 egress 프록시가 다음 도메인을 차단했다(curl·WebFetch 모두): `usenix.org`, `usenix.net`, `arxiv.org`, `export.arxiv.org`, `alphaxiv.org`, `dl.acm.org`, `pdl.cmu.edu`, `cs.cmu.edu`, `par.nsf.gov`, `semanticscholar.org`, `scholar.archive.org`, `openreview.net`, `pages.cs.wisc.edu`, `research.facebook.com`, `engineering.fb.com`, `opencompute.org`, `snia.org`, `micron.com`, `westerndigital.com`, `documents.westerndigital.com`, `seagate.com`, `storagereview.com`, `techtimes.com`, `metrum.ai`, `vastdata.com`, `weka.io`, `ddn.com`, `huawei.com`, `hpe.com`, `signal65.com`, `community.netapp.com`, `aws.amazon.com`, `blog.lmcache.ai`, `kvcache-ai.github.io`, `chenyoumin1993.github.io`, `junchengyang.com`, `micahlerner.com`, `atlarge-research.com`, `huggingface.co`, `theregister.com`, `blog.dshr.org`, `storagenewsletter.com`, `cdn.jsdelivr.net` 등. **직접 열람이 가능했던 것은 `raw.githubusercontent.com`·GitHub `git clone`, `www.microsoft.com`(Microsoft Research 게시 PDF), `cloud.google.com`(블로그)뿐**이다. 따라서:
- **✅는 위 세 경로에서 원문을 직접 읽은 항목에만 붙였다**: FairyWREN(OSDI'24)·CacheLib(OSDI'20)·Microsoft SSD 필드 연구(SYSTOR'16)·MRM(HotOS'25) 저자본 PDF(microsoft.com), CacheLib 공식 문서(GitHub), Baleen(FAST'24) 아티팩트 코드·노트북(GitHub), DeepSeek open-infra-index Day 6 문서(GitHub), Mooncake FAST'25 논문·트레이스(GitHub), 3FS README·그림(GitHub), Google Cloud Managed Lustre KV 캐시 블로그 2건.
- Kangaroo(SOSP'21)·CacheSack(ATC'22)·NetApp 필드 연구(FAST'22)·Alibaba KVCache 연구(ATC'25)는 **원문 PDF를 열지 못해 🟡**다.
- 벤더 기술 브리프·백서(WD·Seagate/SK hynix)·리뷰(StorageReview)·클라우드 블로그(AWS) 수치는 1차 출처라도 검색 요약 경유이므로 🟡.

**0-2. 세 가지 수치를 섞지 않는다.** (a) **예산(budget)**: 고객이 장치 수명을 지키려고 스스로 정한 쓰기 상한(예: Kangaroo 3 DWPD). (b) **수요(demand)**: 상한이 없을 때 애플리케이션이 쓰려는 양(예: CacheLib "상한 없으면 수명 허용치의 1.5배"). (c) **실측·필드 소비(observed)**: 실제로 쓴 양(예: NetApp 중앙값 0.36 DWPD). 차트의 범례도 이 셋으로 나눌 것.

**0-3. KV 캐시 쓰기량은 토큰 수 × 토큰당 KV 바이트로만 바이트가 된다.** AI 랩이 공개한 것은 대부분 **토큰 수**다(DeepSeek·Kimi). 바이트·DWPD로 바꾸는 순간 (i) 모델 구조(토큰당 KV 바이트), (ii) 저장 정밀도(BF16/FP8), (iii) 어떤 토큰을 SSD에 쓰는가(쓰기 허용 정책), (iv) GPU당 SSD 용량 배정이라는 **네 개의 가정**이 들어간다. §6의 모든 DWPD는 **⚠️ 파생**이며 고객이 밝힌 요구치가 아니다.

**0-4. 기존 원장과의 관계.** [wcssd-v1-high-dwpd-configurable-2026-09.md](wcssd-v1-high-dwpd-configurable-2026-09.md)(이하 **wcssd-v1**) §4(D-01 ScaleFlux 7~10+ effective, D-02 Huawei M900 24 DWPD·3년, D-03 StorageReview 실측 3.2 DWPD, D-09 산술, X-01~X-11 반증, G-01·G-02 부정 확인), [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](qlc-v6-purchase-criteria-dwpd-history-2026-09.md)(이하 **qlc-v6-pc**) D01~D14·E01~E09, [kv-cache-ssd-demand-2026.md](kv-cache-ssd-demand-2026.md), [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](ssd-ultra-high-dwpd-mlc-mode-2026-10.md)(이하 **ud**) UD-08·UD-11·UD-12, [component-to-system-solution-ladder-facts-2026-09.md](component-to-system-solution-ladder-facts-2026-09.md)(이하 **ladder**) F15·F17·F48~F52, [qlc-v6-waf-measurement-trend-2026-09.md](qlc-v6-waf-measurement-trend-2026-09.md) W17·W19, [qlc-v7-hbm-to-storage-shift-2026-09.md](qlc-v7-hbm-to-storage-shift-2026-09.md) V-51·W-32·W-35에 이미 있는 사실은 **ID로만 참조**하고 반복하지 않는다.

---

## §1. 하이퍼스케일러 플래시 캐시: 쓰기 예산과 수요 (Meta·Twitter·Google)

캐시 티어에서 "고객이 DWPD를 소비한다"를 보여 주는 가장 오래되고 정량적인 1차 근거는 하이퍼스케일러 플래시 캐시 논문이다. 이들은 **쓰기 예산(DWPD)을 설계 제약으로 명시**한다.

| ID | 주체 | 사실 | 수치 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|---|
| CU-01 | **Meta·Twitter (Kangaroo, CMU+Meta)** | 프로덕션 트레이스(Facebook 소셜그래프·Twitter) 평가의 기본 제약: **1.9TB 드라이브, DRAM 16GB, 쓰기율 62.5 MB/s 이하 = 3 DWPD**. Facebook 프로덕션 플래시 캐시에서 섀도 프로덕션 시험 배포로 결과 확인. 논문은 "Micron 5300 MAX는 3~5 DWPD만 지원"을 예로 듦 | **3 DWPD 예산** / 62.5 MB/s / 1.9TB | 2021-10 (SOSP'21 최우수 논문) | Meta 엔지니어링 블로그 https://engineering.fb.com/2021/10/26/core-infra/kangaroo/ ; 논문 https://www.pdl.cmu.edu/PDL-FTP/NVM/McAllister-SOSP21.pdf ; 저장소 https://github.com/saramcallister/Kangaroo | 🟡 `[검색 요약 경유]` (저장소 README는 ✅이나 수치 없음) |
| CU-01a | (⚠️ 파생 검산) | 62.5 MB/s × 86,400 s = **5.40 TB/일** ÷ 1.9TB = **2.84 DWPD ≈ 3** | 2.84 | | 산술 | ⚠️ 파생 |
| CU-02 | **Meta (CacheLib)** | "하이브리드 캐시의 DRAM 축출분을 **모두 플래시에 넣으면, 플래시가 목표 수명을 달성하는 쓰기율보다 50% 높은 쓰기율**이 관측된다" → **상한 없는 수요 = 수명 허용 예산의 1.5배** | **150%** (수요/예산) | 2020-11 (OSDI'20) | 저자본 PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2022/04/2020_osdi_cachelib.pdf (부록 C) | ✅ |
| CU-03 | Meta (CacheLib) | 프로덕션에서 SOC(소객체 캐시) 장치 수준 WA **1.1×(Lookaside) ~ 1.4×(Storage)** 를 얻기 위해 **플래시를 통상 50% 오버프로비저닝**. LOC 순차 쓰기 전환으로 장치 WA **1.5× → 1.05×**, NAND 쓰기 **-15%**. SOC 애플리케이션 WA 약 **6.5×** | OP 50%, WA 1.1~1.4, 6.5 | 2020-11 | 상동 §5 "Flash endurance" | ✅ (OP 50%는 레포 W19에 문서 경유로 기존재, 여기서 논문 원문 확인) |
| CU-04 | Meta (CacheLib) | 프로덕션 SocialGraph에 배치한 ML 기반 플래시 수용 정책: 기본 정책(고정 확률 수용, "목표 쓰기율 이하 유지") 대비 **플래시 기록 바이트 -44%**, 적중률 저하 없음 | **-44%** | 2020-11 | 상동 부록 C | ✅ |
| CU-05 | Meta (CacheLib 공식 문서) | 플래시 수용 정책 `DynamicRandomAP`는 "**장치에 하루 쓸 수 있는 최대 데이터량**"을 사용자가 지정하고 그 일일 예산을 넘지 않게 확률적으로 거부. 설정값 `navyAdmissionWriteRateMB`는 "**장치 내구성 한계를 지키기 위한** 논리 쓰기율 상한" | 정성 (DWPD 개념이 API에 내장) | 저장소 현행 (2026-10-03 열람) | https://github.com/facebook/CacheLib `website/docs/Cache_Library_Architecture_Guide/Navy_Overview.md`, `.../Configure_HybridCache.md`, `.../Configuring_cachebench_parameters.md` | ✅ |
| CU-06 | Meta (CacheLib 공개 트레이스 설명) | 프로덕션 캐시 호스트당 SSD 캐시 용량: **KV 캐시 클러스터 930GB**(DRAM 42GB; 2022-06 500대, 2024-01 8,000대), **CDN 1.8TB**(DRAM 40GB, 2023-03, 수천 대), **CDN 엣지 3,577GB**(DRAM 105GB, 2025-04, 약 300대), **블록 스토리지 캐시 380GB**(DRAM 10GB, 2023-12, 3,000대) | 0.38~3.58 TB/호스트 | 2022~2025 | 상동 `website/docs/Cache_Library_User_Guides/Cachebench_FB_HW_eval.md` | ✅ (용량만, 쓰기율 미공개) |
| CU-07 | **Meta·Twitter 트레이스 (FairyWREN, CMU+Microsoft Azure)** | (a) 평가에서 **Kangaroo가 1.46 DWPD**를 씀. (b) **10년 수명이면 QLC는 0.37 DWPD 미만, PLC는 0.16 DWPD 미만**이어야 함. (c) 7년 수명이면 TLC 같은 고밀도 플래시는 **2 DWPD 미만**에서만 유리. (d) "2TB QLC로 6년 수명을 얻으려면 애플리케이션은 **14 MB/s(가용 쓰기 대역의 0.09%)** 만 쓸 수 있다". (e) 실험 장치 WD ZN540 1TB ZNS는 **5년 3.5 DWPD** | 1.46 / 0.37 / 0.16 / 2 / 14 MB/s / 3.5 | 2024-07 (OSDI'24) | 저자본 PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2024/06/2024-Sustainable-Flash-Caching-OSDI2024.pdf | ✅ |
| CU-07a | (⚠️ 파생) | (d)의 DWPD 환산: 14 MB/s × 86,400 = 1.21 TB/일 ÷ 2TB = **0.60 DWPD** | 0.60 | | 산술 | ⚠️ 파생 |
| CU-08 | FairyWREN | Meta 프로덕션 트레이스(400GB 플래시) 실험: 쓰기율 **Kangaroo 97 MB/s → FairyWREN 7.8 MB/s(12.5배 감소)**, WA **23× → 1.89×**, 적중률 손실 없음. 플래시 비용 **-35%**, 탄소 **-33%**. 서버 내재 탄소의 **40%가 플래시** | 97 → 7.8 MB/s | 2024-07 | 상동 §6 | ✅ |
| CU-08a | ⚠️ 충돌 메모 | 97 MB/s를 400GB로 환산하면 약 21 DWPD지만 논문은 Kangaroo를 **1.46 DWPD**로 적는다. 실험 재생 속도·규모 조건이 원문에 명시되지 않아 **97 MB/s를 DWPD로 환산하지 말 것**. 차트에는 논문이 직접 쓴 1.46만 사용 | | | | ⚠️ |
| CU-09 | FairyWREN | 밀도별 쓰기 내구성 계수(TLC=1, Micron 7300 기준): **SLC 4.4× / MLC 4× / TLC 1× / QLC 0.32× / PLC 0.16×** | 계수 | 2024-07 | 상동 표 4 | ✅ |
| CU-10 | FairyWREN | **Twitter 트레이스가 더 쓰기 집약적**: Kangaroo는 Twitter에서 쓰기율 때문에 **MLC·TLC로 제한**, 탄소 최적 밀도는 Kangaroo TLC(Twitter)·QLC(Meta), FairyWREN QLC(Twitter)·PLC(Meta) | 범주형 | 2024-07 | 상동 §6.2 | ✅ |
| CU-11 | **Meta Tectonic(벌크 스토리지) 플래시 캐시 (Baleen, CMU+Meta)** | 아티팩트 기본값: 플래시 캐시 **357.4GB + DRAM 9.0GB**, **목표 쓰기율 34 MB/s**. 저자 변환 함수 `wr_to_dwpd()`로 **7.16 DWPD**. 논문 그림 노트북은 **목표 DWPD 1~20**(1, 2.5, 3, 3.75, 7.5, 10, 12.5, 15, 17.5, 20)을 스윕 | 기본 **≈7.2 DWPD**, 스윕 1~20 | 2024-02 (FAST'24) | https://github.com/wonglkd/BCacheSim `episodic_analysis/exps/factory_base.py`, `episodic_analysis/trace_utils.py` ; https://github.com/wonglkd/Baleen-FAST24 `notebooks/paper-figs/fig-10a,24-wr-20230414.ipynb` | ✅ (코드) / ⚠️ (논문 본문 미열람, 기본값이 프로덕션 예산과 같은지 미확인) |
| CU-11a | (⚠️ 파생 검산) | 단순 산술 34 MB/s × 86,400 ÷ 366.5GB = **8.0 DWPD**, 400GB 장치 기준 **7.3**. 저자 함수는 CacheLib 오버헤드 보정(× 357.45/400)으로 **7.16** | 7.2~8.0 | | 산술 | ⚠️ 파생 |
| CU-12 | **Google (CacheSack, Colossus Flash Cache)** | Colossus 플래시 캐시 수용 알고리즘. 프로덕션 실험: **플래시 마모 -17.8%, 디스크 읽기 -9.5%, TCO -7.7%**. 다른 요약: **플래시 기록 바이트 -26%, 디스크 읽기 -6%, TCO -6.5%**(1주 평균). TCO 목적함수에 "플래시 기록 비용"이 들어감 | -17.8% / -26% | 2022-07 (ATC'22) | https://www.usenix.org/conference/atc22/presentation/yang-tzu-wei ; https://research.google/pubs/cachesack-admission-optimization-for-datacenter-flash-caches/ | 🟡 / ⚠️ (요약 간 수치 충돌, 원문 미열람) |

**§1 판독(사실만).** 하이퍼스케일러 캐시 논문은 쓰기 예산을 **DWPD로 명시**하고(Kangaroo 3, Baleen 기본 약 7, 스윕 1~20), 상한이 없으면 수요가 예산의 **1.5배**(CacheLib)이며, 예산을 지키려고 **용량 50% OP**·수용 정책·배치 기법으로 쓰기를 깎는다(-44%, -17.8~26%, 12.5배). 즉 공개 근거가 보여 주는 것은 "고객이 고DWPD 드라이브를 산다"보다 **"고객의 캐시 수요는 장치 예산에 의해 잘려 있다(budget-capped)"** 이다.

---

## §2. 필드 데이터: 고객 플릿이 실제로 소비하는 DWPD

| ID | 주체 | 사실 | 수치 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|---|
| CU-13 | **Microsoft (클라우드 데이터센터)** | 50만 대 이상 SSD, 약 3년 관측. 장치당 배치 후 평균 누적 기록량: 1-A 160GB **42.8 TB**(평균 3.17년), 1-B 160GB **25.1 TB**(3.31년), 1-C 160GB **11.7 TB**(2.69년), 1-D 480GB **40.3 TB**(1.92년). 워크로드 4종 중 **W2 = 고객 가까운 엣지 노드의 콘텐츠 캐싱**. W1(빅데이터 분석)을 제외한 모든 워크로드에서 **읽기 > 쓰기** | 누적 TB | 2016-06 (SYSTOR'16) | 저자본 PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2016/08/a7-narayanan.pdf (표 2, 그림 1) | ✅ |
| CU-13a | (⚠️ 파생) | DWPD = 누적 TB ÷ (평균 연수 × 365) ÷ 용량: 1-A **0.23**, 1-B **0.13**, 1-C **0.07**, 1-D **0.12** (그림 1의 장치당 일 기록량도 약 10~100 GB/일 범위, 로그 축 판독) | 0.07~0.23 | | 산술 | ⚠️ 파생 (MLC 세대·소용량, 10년 전 데이터) |
| CU-14 | Microsoft | 구세대(1-A~1-C)는 일 평균 기록량이 늘수록 **AFR 2~4배 증가**, 1-D는 "정격 내구성에서 아직 멀어" 상관 없음 | 2~4× | 2016-06 | 상동 §3.5.1 | ✅ |
| CU-15 | **NetApp (엔터프라이즈 스토리지 시스템, 고객 설치 기반)** | 약 200만 대 SSD. **DWPD 중앙값 0.36**, 그러나 **7% 이상의 드라이브가 3 DWPD 초과**. 같은 용량 기준으로 엔터프라이즈 스토리지 드라이브의 읽기·쓰기율은 데이터센터 드라이브 보고치보다 **한 자릿수 높음** | 중앙값 0.36 / >3 DWPD 비율 >7% | 2022-02 (FAST'22) | https://www.usenix.org/conference/fast22/presentation/maneas ; PDF https://www.usenix.org/system/files/fast22-maneas.pdf | 🟡 `[검색 요약 경유]` |
| CU-15a | (⚠️ 파생) | 7% × 약 2,000,000대 ≈ **약 14만 대가 3 DWPD 초과** | ≈140,000 | | 산술 (모수 "almost 2 million" 근사) | ⚠️ 파생 |
| CU-16 | NetApp (반증 겸) | **캐시로 쓰는 SSD는 영구 저장용보다 호스트 쓰기율이 유의하게 높지만, WAF가 낮아 NAND 쓰기율은 높지 않다** → "캐시 워크로드라고 **반드시 고내구 드라이브가 필요한 것은 아니다**". 모집단의 **약 95%가 QLC로 옮겨도 조기 마모 없음**(추정) | 95% | 2022-02 | 상동 | 🟡 `[검색 요약 경유]` |

**§2 판독(사실만).** 플릿 전체로 보면 소비 DWPD는 낮다(Microsoft 0.07~0.23, NetApp 중앙값 0.36). 그러나 분포의 꼬리는 두껍다: NetApp 설치 기반의 **7% 이상(약 14만 대)이 3 DWPD를 넘는다**. 캐시 SSD는 호스트 쓰기가 많지만 순차·대형 쓰기로 WAF가 낮아 NAND 마모는 크지 않다는 것이 NetApp의 결론이다.

---

## §3. AI 랩·클라우드 KV 캐시 티어: 공개 운영 데이터와 쓰기량

### 3-A. 운영 데이터 (1차)

| ID | 주체 | 사실 | 수치 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|---|
| CU-20 | **DeepSeek (V3/R1 온라인 서비스)** | 24시간(UTC+8 2025-02-27 12:00 ~ 02-28 12:00): **입력 토큰 6,080억, 그중 3,420억(56.3%)이 온디스크 KV 캐시 적중**. 출력 토큰 1,680억, 출력 토큰당 평균 KV 캐시 길이 4,989 토큰. 추론 노드 평균 226.75대·피크 278대(노드당 H800 8장). 노드당 프리필 입력 처리량 평균 약 7.37만 토큰/s(적중 포함). "**핵심 MLA 연산은 BF16**" | 608B / 342B / 56.3% | **2025-03-01** 공개 | https://github.com/deepseek-ai/open-infra-index/blob/main/202502OpenSourceWeek/day_6_one_more_thing_deepseekV3R1_inference_system_overview.md | ✅ |
| CU-21 | DeepSeek (모델 구조) | DeepSeek-V3 671B 구성: `n_layers` 61, `kv_lora_rank` 512, `qk_rope_head_dim` 64 → MLA 토큰당 KV 원소 61 × (512 + 64) = **35,136개** | 35,136 원소/토큰 | 저장소 현행 | https://github.com/deepseek-ai/DeepSeek-V3/blob/main/inference/configs/config_671B.json | ✅ (원소 수는 ⚠️ 파생 곱셈) |
| CU-22 | **Moonshot AI Kimi (Mooncake)** | Kimi 서빙 플랫폼, **수천 노드, 하루 1,000억 토큰 이상**. 로컬 DRAM 약 1TB로는 약 **300만 토큰**만 저장, 5,000만 토큰 캐시면 이론 최대 적중률에 근접(DRAM 기준 20노드 이상 풀링 필요). 2025-07-20 Kimi K2를 H200 128장에서 프리필 **22.4만 토큰/s**, 디코드 28.8만 토큰/s로 서빙 | 100B 토큰/일 | 2025-02 (FAST'25 최우수 논문) ; README 2025-07-20 | https://github.com/kvcache-ai/Mooncake `FAST25-release/Mooncake-FAST25.pdf`, `README.md` | ✅ |
| CU-23 | Kimi (Mooncake 공개 트레이스) | 온라인 요청 1시간 샘플(블록 512토큰, 접두 해시). **대화**: 12,031건·3,537초·입력 1.448억 토큰. **툴·에이전트**: 23,608건·입력 2.029억 토큰. 논문은 대화 트레이스를 **8×A800 노드 16대(GPU 128장)** 에 재생, 실험용 더미 모델은 **LLaMA3-70B 구조** | 표 참조 | 2025-02 | 상동 `FAST25-release/traces/*.jsonl`, `README.md` | ✅ |
| CU-24 | **Alibaba Cloud Bailian/Tongyi (ATC'25)** | 프로덕션 KV 캐시 트레이스: KV 블록의 90%가 **to-C 트레이스에서 612초 후, to-B 트레이스에서 0.3초 후** 더 이상 재사용되지 않음(짧은 수명·높은 회전). 실제 적중률 **54~62%** 로 합성 벤치마크보다 낮음 | 612 s / 0.3 s | 2025-07 | https://www.usenix.org/conference/atc25/presentation/wang-jiahao ; arXiv 2506.02634 | 🟡 / 적중률은 ⚠️ (요약기 서술, 미검증) |
| CU-25 | **Google Cloud (Managed Lustre 외부 KV 캐시)** | TCO 모델: **A3-Ultra(H200 8장) 73대, 머신당 Lustre 18 TiB**, 목표 100만 토큰/s, Lustre 성능 등급 **1,000 MB/s per TiB**. DeepSeek-R1 실험: 50K 컨텍스트, 적중률 약 75%, **전체 KV 3.4 TiB**, 기준선 호스트 메모리 1 TiB. 결과 처리량 +75%, TTFT -40% 이상, TCO **-35%**, GPU **약 40% 절감**. "GPU에서는 로컬 SSD가 Lustre를 보조" | 18 TiB/8 GPU | **2025-10-31** | https://cloud.google.com/blog/products/storage-data-transfer/choosing-google-cloud-managed-lustre-for-your-external-kv-cache | ✅ |
| CU-25a | Google Cloud (후속) | Llama-3.3-70B, A3 Mega 6노드, **적중률 95%**, TCO 50% 이상 절감, GPU 시간 약 60% 감소. KV 청크 LRU 축출기 **Lustre 72TB당 1개 레플리카** 권장 | 95% | **2026-07-01** | https://cloud.google.com/blog/topics/developers-practitioners/scaling-llm-inference-multi-node-kv-cache-offloading-with-gke-managed-lustre | ✅ |
| CU-26 | **AWS (SageMaker HyperPod + Curvine)** | 노드 로컬 NVMe를 묶은 L2 KV 티어: **노드 로컬 NVMe 쓰기 9.6 GB/s**, 교차 노드 L2 읽기 지연 약 56ms, TTFT 최대 2.7배 개선(ml.g6e.4xlarge) | 9.6 GB/s (쓰기 대역 실측) | 2026-08-12 | https://aws.amazon.com/blogs/machine-learning/tiered-kv-cache-for-large-llms-on-amazon-sagemaker-hyperpod-with-curvine | 🟡 (용량 미상 → DWPD 산출 불가) |
| CU-27 | **Huawei (OceanStor M900, 하이퍼스케일 추론용)** | 클러스터당 **KV 캐시 64 PB**, 집계 대역 **40 TB/s**, 지연 60 µs, NPU당 KV 용량을 GB → TB급으로. "KV 인지 적응형 스토리지"로 **SSD 수명 16배**(24 DWPD는 wcssd-v1 D-02) | 64 PB / 40 TB/s / ×16 | 2026-09-17 | https://www.huawei.com/en/news/2026/9/hc-context-memory-storage ; PRNewswire https://www.prnewswire.com/il/news-releases/huawei-introduces-oceanstor-m900-context-memory-storage-to-accelerate-ai-inference-in-hyperscale-data-centers-302882127.html | 🟡 |
| CU-28 | **DeepSeek (3FS KVCache)** | KVCache 유스케이스 그림 원문: 전 클라이언트 **피크 읽기 약 40 GiB/s**(W-35 기존), **평균 읽기 약 2~4 GiB/s**(그림 판독). 같은 30분 동안 **GC 삭제 연산 약 0.8~1.4 M ops/s 버스트가 약 1~1.5분 주기**로 반복 → KV 파일의 생성·삭제 회전이 상시적임. **쓰기 처리량은 미공개** | 삭제 0.8~1.4 MIOPS | 저장소 현행 | https://github.com/deepseek-ai/3FS `docs/images/kvcache_gc_iops.png`, `kvcache_read_throughput.png` | ✅ (그림) / ⚠️ (값은 본 원장의 그림 판독) |
| CU-29 | **Huawei (CachedAttention/AttentionStore, ATC'24)** | 다회차 대화 KV 재사용 실험 구성: **HBM 10GB, DRAM 128GB, SSD 10TB**. "디스크 용량이 호스트 메모리보다 훨씬 커 대부분의 KV 캐시는 디스크에 보존" | SSD 10TB | 2024-07 | https://www.usenix.org/system/files/atc24-gao-bin-cost.pdf | 🟡 (쓰기율 미공개) |

### 3-B. ⚠️ 파생: 운영 데이터에서 KV 쓰기량·읽기/쓰기 비 (산술만)

| ID | 산식 | 결과 | 가정 | 등급 |
|---|---|---|---|---|
| CU-30 | DeepSeek 미적중 토큰 = 608B − 342B | **2,660억 토큰/일** | "미적중 입력 토큰의 KV를 디스크에 한 번 기록" | ⚠️ 파생 |
| CU-31 | 토큰당 KV 바이트 = 35,136 원소 × 2 B(BF16) / × 1 B(FP8) | **70,272 B (BF16) / 35,136 B (FP8)** | 디스크 저장 정밀도 미공개. CU-20 "MLA는 BF16"에 따라 BF16을 기준, FP8을 하한 | ⚠️ 파생 |
| CU-32 | DeepSeek 일 KV 기록량 = 266e9 × 70,272 B | **약 18.7 PB/일 (BF16)**, FP8이면 **약 9.3 PB/일** | 출력 토큰(168B)의 KV 기록은 제외(포함 시 BF16 약 30.5 PB/일) | ⚠️ 파생 |
| CU-33 | DeepSeek GPU당 = 18.7 PB ÷ (226.75 × 8 = 1,814 GPU) | **약 10.3 TB/일·GPU (BF16)**, **5.2 (FP8)** | 평균 가동 노드 기준, 프리필·디코드 GPU 합산 | ⚠️ 파생 |
| CU-34 | DeepSeek 온디스크 KV 읽기:쓰기(토큰 기준) = 342 : 266 | **1.29 : 1** (KV 트래픽의 약 44%가 쓰기) | 적중 1회 = 디스크 읽기 1회 | ⚠️ 파생 |
| CU-35 | Kimi 대화 트레이스(무한 캐시 가정, 선행 블록 적중): 적중 토큰 비율 **37.4%**, 처음 보는 블록 비율 **63.4%**, 신규 토큰 **25,642 토큰/s** | 쓰기:읽기 = 62.6 : 37.4 = **1.67 : 1** | "새 블록은 모두 저장" 수용 정책 | ⚠️ 파생 (✅ 데이터에서 계산) |
| CU-36 | Kimi 툴·에이전트 트레이스: 적중 **57.1%**, 신규 블록 **44.7%**, 신규 토큰 **24,637 토큰/s** | 쓰기:읽기 = **0.75 : 1** | 상동 | ⚠️ 파생 |
| CU-37 | Kimi 대화 트레이스 GPU당 = 25,642 토큰/s × 327,680 B(LLaMA3-70B: 80층 × KV헤드 8 × 128 × K·V 2 × BF16 2B) ÷ 128 GPU | **8.40 GB/s(클러스터) → 65.6 MB/s·GPU → 약 5.7 TB/일·GPU** | 논문 재생 구성(GPU 128장)·더미 모델 기준, 실제 Kimi 모델의 KV 크기 아님 | ⚠️ 파생 |

**3-B 판독(사실만).** 운영 데이터를 바이트로 바꾸면 GPU당 KV 기록 잠재량이 **약 5~10 TB/일**(DeepSeek 5.2~10.3, Kimi 트레이스 5.7) 범위로 모인다. 또 **KV 저장소 수준의 읽기:쓰기 비는 0.75:1 ~ 1.67:1**로, 블록 계층 트레이스의 186:1(wcssd-v1 X-01)이나 LMCache 프로필 92:8(X-03)과 크게 다르다. 차이는 **측정 계층**(KV 저장소 입출입 vs. SSD 블록 I/O, DRAM 계층 흡수 여부)과 **수용 정책**(전부 저장 vs. 빈도 필터, X-04~X-06)에서 나온다.

---

## §4. 플랫폼·스토리지 시스템 벤더의 실측·추정 (고객용 시스템 구축자)

| ID | 주체 | 사실 | 수치 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|---|
| CU-40 | **Western Digital (기술 브리프)** | NVIDIA **B200 8장** 추론 호스트, 144회 벤치마크: **GPU 축출 스트림 약 0.7 GB/s 상시 쓰기**, 이 쓰기를 HDD가 직접 받지 못해 플래시 버퍼 티어가 흡수. 플래시+HDD 계층 구성 92.0~92.4 토큰/s(올플래시와 동등) | **0.7 GB/s/호스트** | 2026 (일자 미상) | https://www.westerndigital.com/resources/technical-brief/kv-cache-offload-tiered-storage-benchmark | 🟡 (HDD 벤더의 HDD 티어 옹호 자료, 버퍼 플래시 용량 미확인) |
| CU-40a | (⚠️ 파생) | 0.7 GB/s × 86,400 = **60.5 TB/일·호스트 = 7.6 TB/일·GPU**. 이 하루 쓰기량은 **2TB 드라이브 1개 기준 30.2 DWPD**, 12.8TB 기준 4.7, 30.72TB 기준 2.0 (wcssd-v1 D-09의 "2TB·30 DWPD = 상시 0.69 GB/s"와 일치) | 60.5 TB/일 | | 산술 | ⚠️ 파생 |
| CU-41 | Western Digital (OpenFlex Data24 4000) | 70B 모델·vLLM+LMCache: **NVMe 네임스페이스 1개(SSD 1개)가 4-GPU 텐서병렬 노드 1개**의 KV 오프로드를 동시 대화 16개까지 감당 → **GPU:SSD = 4:1** | 4:1 | 2026 (일자 미상) | https://documents.westerndigital.com/content/dam/doc-library/en_us/assets/public/western-digital/collateral/tech-brief/technical-brief-disaggregated-key-value-cache-offloading-openflex-data24-4000-wd.pdf | 🟡 |
| CU-42 | **Seagate·SK hynix (공동 백서)** | Microsoft가 시연한 **72-GPU 랙 110만 토큰/s** 기준으로 생성 KV 캐시가 **GPU당 하루 약 92TB**에 이를 수 있다고 추정. "하이퍼스케일러는 SSD+HDD 하이브리드 티어로 이미 긍정적 결과" | **≈92 TB/일·GPU** | 2026 (일자 미상) | https://www.seagate.com/resources/enabling-inference-at-massive-scale-with-hybrid-storage-for-kv-cache-offloading/ ; PDF …/files/kv-caching-white-paper.pdf | 🟡 |
| CU-42a | (⚠️ 역산) | 92 TB/일 = 1.065 GB/s·GPU. GPU당 15,278 토큰/s(1.1M ÷ 72)로 나누면 **토큰당 약 70KB**를 가정한 셈. 산식·모델·정밀도는 백서 원문 미열람으로 미확인. **CU-33·CU-37·CU-40a보다 약 9~18배 큼** → 차트에서는 "상한 추정"으로 분리 | 70 KB/토큰 | | 산술 | ⚠️ 파생·이상치 |
| CU-43 | **StorageReview (Dell XE7740 KV 오프로드 실측, D-03 보강)** | 지속 추론 시나리오에서 **피크 쓰기 4.1 GB/s vs 피크 읽기 1.1 GB/s**. 상시 1.9 GB/s는 RAID10 기준 드라이브당 3.2 DWPD(D-03), **RAID0이면 약 1.6 DWPD** | 4.1 / 1.1 GB/s | 2026-07~08 | https://www.storagereview.com/review/the-token-efficient-path-for-long-context-inference-kv-cache-offload-to-flash ; https://www.storagereview.com/review/solidigm-d7-ps1030-review-3-dwpd-gen5-that-earned-its-keep-in-the-kv-cache-tier | 🟡 |

---

## §5. 반증·뉘앙스 (같은 고객 측 출처)

| ID | 주체 | 사실 | 수치 | 일자 | 출처 URL | 등급 |
|---|---|---|---|---|---|---|
| CU-50 | **Microsoft Research (MRM, HotOS'25)** | 파운데이션 모델 추론은 메모리 계층에서 **읽기:쓰기 1,000:1 이상**(디코드 1토큰마다 가중치·KV 전체 읽기, 쓰기는 수 MB 벡터 1개). 그러나 "읽기 지배적이어도 **스토리지 워크로드에 비하면 매우 높은 쓰기율**을 요구". **HBM 대체 메모리 역할에는 "플래시는 SLC라도 내구성이 부족"**, KV 캐시는 소프트 스테이트라 비휘발성 불필요 | >1000:1 | 2025-05 | 저자본 PDF https://www.microsoft.com/en-us/research/wp-content/uploads/2025/05/MRM-HotOS25.pdf | ✅ (메모리 계층 논의, SSD 오프로드 계층 아님) |
| CU-51 | NetApp | 캐시 SSD는 호스트 쓰기는 많지만 WAF가 낮아 고내구 드라이브가 꼭 필요하지 않다(CU-16) | | 2022-02 | CU-16 | 🟡 |
| CU-52 | Microsoft | 엣지 콘텐츠 캐싱(W2)을 포함해 W1 외 전 워크로드가 읽기 우위, 플릿 DWPD 0.07~0.23(CU-13) | | 2016-06 | CU-13 | ✅ |
| CU-53 | 고객이 쓰기를 **깎는** 방향 | CacheLib ML 수용 -44%(CU-04), CacheSack 마모 -17.8%(CU-12), FairyWREN 12.5배(CU-08), CacheLib OP 50%(CU-03), Dynamo SSD 수명 보호 필터 기본 활성·LFU 임계 8(wcssd-v1 X-04~X-06), DeepSeek V4.1-Flash KV용 SSD 용량 1/8(X-10) | | 2020~2026 | 각 ID | ✅/🟡 |
| CU-54 | KV 캐시 관리자 저장소의 내구성 언급 | LMCache·Mooncake·FlexKV(Tencent)·Tair KVCache(Alibaba)·UCM(Huawei) 저장소 문서·코드에서 `DWPD`·`endurance`·`TBW`·`wear`·"write amplification" **검색 0건**(UCM·Tair의 `lifespan`은 KV 블록 수명 통계이지 SSD 수명이 아님). SSD 수명을 명시적으로 다루는 것은 Dynamo KVBM 필터뿐(X-04~X-06) | 0건 | 2026-10-03 | https://github.com/LMCache/LMCache ; https://github.com/kvcache-ai/Mooncake ; https://github.com/taco-project/FlexKV ; https://github.com/alibaba/tair-kvcache ; https://github.com/ModelEngine-Group/unified-cache-management | ✅ (부재 확인) |

---

## §6. ⚠️ 파생: GPU당 KV 쓰기량 × GPU당 SSD 배정 용량 → 필요 DWPD (산술만, 고객 요구치 아님)

**산식**: `필요 DWPD = (GPU당 일 KV 기록 TB) ÷ (GPU당 SSD 용량 TB)`. WAF = 1, 모든 신규 KV를 SSD에 1회 기록, 균등 분산 가정. 용량 열의 출처: 16TB = NVIDIA CMX GPU당(레포 V-51·UD-11), 2.47TB = Google Cloud TCO 모델 18 TiB ÷ 8 GPU(CU-25, 18 × 1.0995 ÷ 8), 2TB·1TB = 비교용 가정값.

| 쓰기량 출처 (TB/일·GPU) | 16TB/GPU (CMX) | 2.47TB/GPU (Google 사이징) | 2TB/GPU | 1TB/GPU |
|---|---|---|---|---|
| DeepSeek FP8 **5.2** (CU-33) | 0.32 | 2.1 | 2.6 | 5.2 |
| Kimi 트레이스 **5.7** (CU-37) | 0.35 | 2.3 | 2.8 | 5.7 |
| WD 실측 **7.6** (CU-40a) | 0.47 | 3.1 | 3.8 | 7.6 |
| DeepSeek BF16 **10.3** (CU-33) | 0.64 | 4.2 | 5.2 | 10.3 |
| Seagate·SK hynix 추정 **92** (CU-42, 이상치) | 5.75 | 37.2 | 46 | 92 |

**판독(산술만).** 같은 쓰기량에서도 **필요 DWPD는 GPU당 용량 배정에 반비례**한다. CMX식 대용량 배정(16TB/GPU)이면 0.3~0.6 DWPD로 범용 TLC·QLC 영역이고, 클라우드 사이징(약 2.5TB/GPU)이면 2~4 DWPD로 혼합용(3 DWPD) 영역이며, 30 DWPD에 도달하려면 GPU당 약 0.2~0.35TB(= 8-GPU 호스트당 약 2TB)로 용량을 좁혀야 한다(WD 0.7 GB/s 호스트 = 2TB·30 DWPD, CU-40a). 이 표의 어떤 값도 고객이 밝힌 요구치가 아니다.

---

## §7. 차트용 데이터 표

> 모든 행은 그대로 막대·점 차트로 옮길 수 있다. "기준" 열이 다른 행끼리는 같은 축에 그리지 말 것(예: 예산 vs 필드 소비 vs 파생). 범례 구분: **예산(B) / 수요(D) / 소비·실측(O) / 파생(X)**.

### 7-A. 캐시 티어 DWPD 지형 (단위 DWPD)

| 주체 | 지표 | 값 | 단위 | 기준 | 등급 | ID |
|---|---|---|---|---|---|---|
| Meta·Twitter (Kangaroo) | 평가 쓰기 예산 | 3 | DWPD | B, 1.9TB, 62.5 MB/s | 🟡 | CU-01 |
| Meta Tectonic (Baleen) | 기본 목표 쓰기율 | 7.2 | DWPD | B, 357GB, 34 MB/s, 저자 함수 | ✅/⚠️ | CU-11 |
| Meta Tectonic (Baleen) | 평가 스윕 하한~상한 | 1~20 | DWPD | B, 범위 | ✅ | CU-11 |
| Meta·Twitter (FairyWREN 평가) | Kangaroo 실제 쓰기 | 1.46 | DWPD | O, 평가 | ✅ | CU-07 |
| FairyWREN 모델 | 10년 수명 QLC 허용 상한 | 0.37 | DWPD | B, 모델 | ✅ | CU-07 |
| FairyWREN 모델 | 10년 수명 PLC 허용 상한 | 0.16 | DWPD | B, 모델 | ✅ | CU-07 |
| FairyWREN 모델 | 7년 수명 TLC 유리 구간 상한 | 2 | DWPD | B, 모델 | ✅ | CU-07 |
| FairyWREN 모델 | 2TB QLC 6년 허용 쓰기 | 0.60 | DWPD | X, 14 MB/s 환산 | ⚠️ | CU-07a |
| WD ZN540 (FairyWREN 실험 장치) | 정격 | 3.5 | DWPD | 정격, 5년 | ✅ | CU-07 |
| Microsoft 플릿 | 1-A ~ 1-D 평균 소비 | 0.07~0.23 | DWPD | O→X, 누적 환산 | ✅/⚠️ | CU-13a |
| NetApp 설치 기반 | 중앙값 소비 | 0.36 | DWPD | O | 🟡 | CU-15 |
| NetApp 설치 기반 | 3 DWPD 초과 드라이브 비율 | >7 | % | O | 🟡 | CU-15 |
| StorageReview KV 티어 | 드라이브당 실측 (RAID10 / RAID0) | 3.2 / 1.6 | DWPD | O, 12.8TB×8 | 🟡 | D-03, CU-43 |
| ScaleFlux | KV 플랫폼 effective | 7~10+ | DWPD | 벤더 주장 | 🟡 | D-01 |
| Huawei M900 | 시스템 수준 | 24 | DWPD | 벤더 주장, 3년 | 🟡 | D-02 |

### 7-B. 캐시 쓰기 수요 대 예산 (단위 % 또는 배)

| 주체 | 지표 | 값 | 단위 | 기준 | 등급 | ID |
|---|---|---|---|---|---|---|
| Meta CacheLib | 상한 없을 때 수요 / 수명 예산 | 150 | % | D/B | ✅ | CU-02 |
| Meta CacheLib | 예산 유지용 플래시 OP | 50 | % | 프로덕션 | ✅ | CU-03 |
| Meta CacheLib | ML 수용 정책 쓰기 절감 | -44 | % | 프로덕션 | ✅ | CU-04 |
| Google CacheSack | 플래시 마모 절감 | -17.8 | % | 프로덕션 | 🟡/⚠️ | CU-12 |
| Google CacheSack | 플래시 기록 바이트 절감(다른 요약) | -26 | % | 프로덕션 1주 | 🟡/⚠️ | CU-12 |
| FairyWREN | 쓰기율 Kangaroo → FairyWREN | 97 → 7.8 | MB/s | 실험 (DWPD 환산 금지) | ✅ | CU-08 |

### 7-C. AI 추론 KV 티어: GPU당 일 KV 기록량 (단위 TB/일·GPU)

| 주체 | 지표 | 값 | 단위 | 기준 | 등급 | ID |
|---|---|---|---|---|---|---|
| DeepSeek (운영 24h) | 미적중 입력 KV 기록, FP8~BF16 | 5.2~10.3 | TB/일·GPU | X | ⚠️ | CU-33 |
| Kimi (Mooncake 대화 트레이스) | 신규 블록 KV 기록 | 5.7 | TB/일·GPU | X, 128 GPU 재생 | ⚠️ | CU-37 |
| WD (8×B200) | GPU 축출 스트림 | 7.6 | TB/일·GPU | O→X, 0.7 GB/s/호스트 | 🟡/⚠️ | CU-40a |
| StorageReview (XE7740) | 상시 KV 쓰기 (서버 전체) | 164 | TB/일·서버 | O→X, 1.9 GB/s | 🟡/⚠️ | D-09 |
| Seagate·SK hynix | 생성 KV 추정 | 92 | TB/일·GPU | 추정(이상치) | 🟡/⚠️ | CU-42 |

### 7-D. KV 트래픽의 쓰기 비중 (단위 %, 측정 계층별)

| 주체 | 지표 | 값 | 단위 | 기준 | 등급 | ID |
|---|---|---|---|---|---|---|
| CHEOPS'25 (DeepSpeed·FlexGen 블록 트레이스) | 쓰기 비중 | 0.5 | % | 블록 계층 평균 대역 | ✅(레포) | X-01 |
| LMCache-on-NVMe 프로필 | 쓰기 비중 | 8 | % | 2차 인용 | ⚠️ | X-03 |
| DeepSeek 온디스크 KV | 쓰기 비중(토큰) | 44 | % | X, 266/(266+342) | ⚠️ | CU-34 |
| Kimi 툴·에이전트 | 쓰기 비중(토큰) | 43 | % | X, 무한 캐시 | ⚠️ | CU-36 |
| Kimi 대화 | 쓰기 비중(토큰) | 63 | % | X, 무한 캐시 | ⚠️ | CU-35 |
| StorageReview | 쓰기 비중(피크 대역) | 79 | % | O, 4.1/(4.1+1.1) | 🟡/⚠️ | CU-43 |

### 7-E. 고객 측 캐시·KV 용량 배정 (단위 TB, 내구성 아님)

| 주체 | 지표 | 값 | 단위 | 기준 | 등급 | ID |
|---|---|---|---|---|---|---|
| Meta KV 캐시 클러스터 | 호스트당 SSD 캐시 | 0.93 | TB | 프로덕션 | ✅ | CU-06 |
| Meta CDN (2023) / CDN 엣지 (2025) | 호스트당 SSD 캐시 | 1.8 / 3.58 | TB | 프로덕션 | ✅ | CU-06 |
| Meta 블록 스토리지 캐시 | 호스트당 SSD 캐시 | 0.38 | TB | 프로덕션 | ✅ | CU-06 |
| Google Cloud KV (TCO 모델) | 8-GPU 머신당 외부 KV 용량 | 18 | TiB | 사이징 | ✅ | CU-25 |
| NVIDIA CMX | GPU당 컨텍스트 메모리 | 16 | TB | 플랫폼 | 🟡 | V-51, UD-11 |
| WD Data24 | SSD 1개당 GPU 수 | 4 | GPU/SSD | 시스템 벤더 | 🟡 | CU-41 |
| Huawei M900 | 클러스터당 KV 용량 | 64,000 | TB | 시스템 벤더 | 🟡 | CU-27 |

---

## §8. 부정 확인 (검색했으나 확보하지 못한 것)

- **NG-01. 하이퍼스케일러·AI 랩의 RFP·조달 사양에 KV 캐시용 "≥10 DWPD" 또는 "30 DWPD"를 명시한 문서.** 없음(wcssd-v1 G-01 유지). 검색어: `KV cache SSD "drive writes per day" customer deployment`, `hyperscaler requirement DWPD inference 2026 Kioxia OR SK hynix OR Micron customer requirement`.
- **NG-02. NVIDIA CMX/STX의 드라이브 DWPD 요구치.** 여전히 없음(wcssd-v1 G-02 유지). 2차 블로그에 "CMX는 다중 DWPD가 기본 요구"라는 서술만 있음(⚠️ 근거 미제시). 검색어: `NVIDIA STX CMX reference design SSD requirement "3 DWPD" OR "1 DWPD" E3.S`.
- **NG-03. OCP Datacenter NVMe SSD 규격의 수치 내구성 요구 조항.** opencompute.org 차단으로 원문 미열람, 검색 요약에도 DWPD 수치 조항 없음. 검색어: `"Datacenter NVMe SSD Specification" endurance "drive writes per day" requirement`.
- **NG-04. AI 랩·하이퍼스케일러가 공개한 KV 티어 SSD의 실측 일 기록 바이트(TB/일) 또는 실측 DWPD.** 없음. DeepSeek·Kimi는 **토큰 수**만 공개(§3-B는 파생). 3FS는 KVCache **읽기**와 GC 삭제만 공개(CU-28), Mooncake SSD 오프로드 벤치마크 문서에 쓰기 수치 없음(삼성 PM1733/PM983 RAID0 구성만, 레포 samsung-kv-cache B-01).
- **NG-05. Kangaroo·CacheSack·NetApp FAST'22·Alibaba ATC'25·Baleen 논문 원문.** usenix·CMU·arXiv 차단으로 미열람(🟡). 특히 Baleen 기본값 34 MB/s가 Meta 프로덕션 예산과 같은지, CacheSack의 두 요약 수치(-17.8% vs -26%) 중 어느 것이 본문 값인지 미확인.
- **NG-06. WD 기술 브리프의 플래시 버퍼 용량·모델·KV 정밀도.** 미확인 → 드라이브당 DWPD 산출 불가(CU-40a는 가정 용량별 환산만).
- **NG-07. Seagate·SK hynix 백서의 "GPU당 92TB/일" 산식.** 원문 미열람. 역산 시 토큰당 약 70KB(CU-42a).
- **NG-08. Twitter(X)·Netflix EVCache·ByteDance·Tencent의 플래시/SSD 캐시 쓰기율·DWPD 수치.** 없음. 검색어: `Netflix EVCache SSD Moneta write endurance`, `Tencent FlexKV OR ByteDance OR Alibaba Tair KVCache production SSD tier write GB/s endurance`.
- **NG-09. Kioxia·Solidigm·Micron이 "고객이 X DWPD를 요구했다"고 수치로 인용한 발언.** 없음. Micron은 7600·9650(MAX 3 DWPD급)이 "주요 고객에 KV 캐시 용도로 출하 중"이라고만 밝힘(UD-08).
- **NG-10. Cohere·CoreWeave(LMCache), NetApp ONTAP, HPE X10000(Signal65), IBM Storage Scale, VAST·Lablup KV 오프로드 사례의 지속 쓰기 대역·용량.** 검색 요약에 성능 배수(TTFT 등)·장비 최대 대역만 있고 고객 워크로드의 지속 쓰기량 없음.

---

## §9. 보고서에 쓸 수 있는 문장 (사실로만, 그대로 복사 가능)

> **1. ✅/🟡 (하이퍼스케일러 캐시는 DWPD 예산으로 설계된다)** "Meta·Twitter 프로덕션 트레이스로 평가한 플래시 캐시 Kangaroo는 1.9TB 드라이브에 하루 3회 전체 기록(3 DWPD, 62.5 MB/s)을 쓰기 예산으로 두었고, Meta CacheLib은 상한 없이 수용하면 쓰기가 수명 허용치보다 50% 많아진다고 밝혔다." CU-01, CU-02

> **2. ✅ (예산을 지키는 비용)** "Meta는 플래시 캐시의 장치 쓰기 증폭을 1.1~1.4배로 묶기 위해 플래시를 통상 50% 오버프로비저닝했고, ML 수용 정책으로 기록 바이트를 44% 줄였다." CU-03, CU-04

> **3. ✅ (밀도와 수명이 허용 DWPD를 낮춘다)** "FairyWREN(OSDI'24) 모델에서 10년 수명이면 QLC는 0.37 DWPD, PLC는 0.16 DWPD 미만이어야 하며, 같은 평가에서 기존 캐시 Kangaroo는 1.46 DWPD를 썼다." CU-07

> **4. 🟡 (필드 분포의 꼬리)** "약 200만 대의 NetApp 엔터프라이즈 SSD에서 DWPD 중앙값은 0.36이지만 7% 이상의 드라이브가 3 DWPD를 넘었다." CU-15

> **5. ✅ + ⚠️ 파생 (AI 랩 운영 데이터)** "DeepSeek은 하루 입력 6,080억 토큰 중 56.3%가 온디스크 KV 캐시에 적중했다고 공개했다. 미적중분의 KV를 한 번씩 기록한다고 가정하면 하루 약 9~19 PB(GPU당 약 5~10 TB/일)에 해당한다(본 원장 산술)." CU-20, CU-33

> **6. ⚠️ 파생 (KV 저장소 수준의 쓰기 비중)** "Kimi(Mooncake) 공개 트레이스와 DeepSeek 통계로 계산하면 KV 저장소 수준의 쓰기:읽기 비는 0.75:1~1.67:1로, 블록 계층 트레이스에서 보고된 읽기 편중(186:1)과 측정 계층에 따라 크게 다르다." CU-34~CU-36, X-01

> **7. 🟡 + ⚠️ 파생 (호스트 1대의 KV 쓰기 = 2TB·30 DWPD 예산)** "Western Digital의 8×B200 호스트 벤치마크에서 KV 축출 스트림은 상시 약 0.7 GB/s였고, 이는 하루 약 60TB로 2TB 드라이브 한 개의 30 DWPD 예산과 같은 크기다(본 원장 산술)." CU-40, CU-40a

> **8. ⚠️ 파생 (필요 DWPD는 용량 배정이 정한다)** "GPU당 하루 5~10TB의 KV 기록을 가정하면, GPU당 16TB(CMX)에서는 0.3~0.6 DWPD, 클라우드 사이징 약 2.5TB/GPU에서는 2~4 DWPD가 필요하다(본 원장 산술, 고객 요구치 아님)." §6

> **9. ✅/🟡 (반증 병기용)** "Microsoft 클라우드 SSD 50만 대 연구에서 엣지 콘텐츠 캐싱을 포함한 대부분 워크로드는 읽기 우위였고 플릿 평균은 0.07~0.23 DWPD였으며, NetApp은 캐시 SSD가 호스트 쓰기는 많아도 WAF가 낮아 반드시 고내구 드라이브가 필요하지는 않다고 결론 내렸다." CU-13, CU-16

> **10. 부정 확인 (반증 병기용)** "하이퍼스케일러·AI 랩·NVIDIA가 KV 캐시 티어용 SSD에 특정 DWPD(10 또는 30)를 요구한 공개 문서는 찾지 못했다." NG-01, NG-02

---

## §10. 쓰지 말 것

- "하이퍼스케일러가 KV 캐시에 30 DWPD를 요구한다" → 근거 없음(NG-01·NG-02). 30 DWPD는 **용량을 좁힐 때 산술로 나오는 값**(§6, CU-40a)이지 요구치가 아니다.
- "DeepSeek이 하루 18.7 PB를 SSD에 쓴다" → **파생**(CU-32). DeepSeek은 토큰 수만 공개했고 디스크 저장 정밀도·쓰기 정책은 미공개. 반드시 "가정 시"와 범위(9.3~18.7 PB)를 병기.
- "FairyWREN 실험에서 Kangaroo는 21 DWPD를 썼다" → 97 MB/s를 400GB로 나눈 값은 논문의 1.46 DWPD와 충돌(CU-08a). 쓰지 말 것.
- "Meta Tectonic 플래시 캐시는 7 DWPD로 운용된다" → Baleen **아티팩트 기본값**이며 프로덕션 예산과 같은지 미확인(CU-11, NG-05). "평가 기본값 약 7 DWPD(스윕 1~20)"로만 쓸 것.
- "KV 캐시는 읽기 전용에 가깝다" 또는 "KV 캐시는 쓰기 집약적이다"를 단정 → 측정 계층·수용 정책에 따라 쓰기 비중이 0.5%~79%로 갈린다(7-D). 계층을 병기할 것.
- "GPU당 92TB/일"을 대표값으로 사용 → 산식 미확인 이상치(CU-42a). 다른 세 출처(5~10TB)와 분리해 "상한 추정"으로만.
- "캐시 SSD는 고내구가 필수" → NetApp FAST'22는 반대 결론(CU-16).
- CacheSack 수치를 하나로 단정 → 요약 간 충돌(-17.8% 마모 vs -26% 기록 바이트, CU-12).

---

## 부록 A. 직접 열람한 1차 원문 (✅ 근거)

| 원문 | 경로 | 확인 내용 |
|---|---|---|
| FairyWREN (OSDI'24) 저자본 | https://www.microsoft.com/en-us/research/wp-content/uploads/2024/06/2024-Sustainable-Flash-Caching-OSDI2024.pdf | 14 MB/s(2TB QLC 6년), 0.37/0.16 DWPD(10년), Kangaroo 1.46 DWPD, TLC 2 DWPD(7년), ZN540 3.5 DWPD, 97→7.8 MB/s, WA 23→1.89, 표 4 계수, -35%/-33%, 플래시 40% 내재 탄소 |
| CacheLib (OSDI'20) 저자본 | https://www.microsoft.com/en-us/research/wp-content/uploads/2022/04/2020_osdi_cachelib.pdf | 수요 = 예산의 1.5배, OP 50%, DLWA 1.1~1.4, LOC 1.5→1.05·NAND -15%, SOC 앱 WA 6.5, ML 수용 -44% |
| Microsoft SSD 필드 연구 (SYSTOR'16) 저자본 | https://www.microsoft.com/en-us/research/wp-content/uploads/2016/08/a7-narayanan.pdf | 표 2 누적 기록량, 워크로드 W1~W4(W2 엣지 콘텐츠 캐싱), 읽기 우위, AFR 2~4배 |
| MRM (HotOS'25) 저자본 | https://www.microsoft.com/en-us/research/wp-content/uploads/2025/05/MRM-HotOS25.pdf | 읽기:쓰기 1000:1 이상, "스토리지 대비 높은 쓰기율", 플래시 SLC도 메모리 계층 내구성 부족 |
| CacheLib 공식 문서 | https://github.com/facebook/CacheLib (`website/docs/...`) | DynamicRandomAP 일일 쓰기 예산, navyAdmissionWriteRateMB, 트레이스별 호스트 SSD 캐시 용량 |
| Baleen 아티팩트 | https://github.com/wonglkd/BCacheSim ; https://github.com/wonglkd/Baleen-FAST24 | DEFAULT_WR 34 MB/s, csize 357.45GB + RAM 9.03GB, `wr_to_dwpd()`, 목표 DWPD 1~20 스윕 |
| DeepSeek open-infra-index Day 6 (2025-03-01 커밋) | https://github.com/deepseek-ai/open-infra-index | 608B/342B/56.3%, 168B, 4,989, 226.75/278 노드, 73.7k 토큰/s, MLA BF16 |
| DeepSeek-V3 구성 | https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/inference/configs/config_671B.json | 61층, kv_lora_rank 512, qk_rope_head_dim 64 |
| Kimi-K2 README | https://raw.githubusercontent.com/MoonshotAI/Kimi-K2/main/README.md | 61층, MLA, 128K (본 원장 산술에는 미사용) |
| Mooncake (FAST'25) 논문·트레이스·README | https://github.com/kvcache-ai/Mooncake (`FAST25-release/`) | 100B 토큰/일, 1TB DRAM ≈ 300만 토큰, 128 GPU 재생, 트레이스 3종 원자료(§3-B 계산 입력), K2 22.4만 토큰/s |
| 3FS README·그림 | https://github.com/deepseek-ai/3FS | KVCache 읽기(피크·평균), GC 삭제 IOPS 그림 |
| Google Cloud 블로그 2건 | https://cloud.google.com/blog/products/storage-data-transfer/choosing-google-cloud-managed-lustre-for-your-external-kv-cache ; https://cloud.google.com/blog/topics/developers-practitioners/scaling-llm-inference-multi-node-kv-cache-offloading-with-gke-managed-lustre | 18 TiB/머신, 73대, 1000 MB/s/TiB, 3.4 TiB KV, TCO -35%·-40% GPU, 95% 적중, 축출기 72TB당 1개 |
| KV 캐시 관리자 저장소 5종 | LMCache·Mooncake·FlexKV·tair-kvcache·unified-cache-management | 내구성 관련 키워드 0건(CU-54) |

## 부록 B. 기존 레포 원장과의 접점

| 기존 | 본 원장의 보완·수정 |
|---|---|
| wcssd-v1 G-01·G-02 (30 DWPD·NVIDIA 요구치 부재) | 유지(NG-01·NG-02). 대신 **고객 측 쓰기 "예산"과 "운영 토큰 데이터"** 를 정량화(§1·§3) |
| wcssd-v1 D-03·D-09 (StorageReview 3.2 DWPD, 2TB·30 DWPD = 0.69 GB/s) | StorageReview 피크 쓰기 4.1 / 읽기 1.1 GB/s, RAID0 1.6 DWPD 추가(CU-43). **WD 실측 0.7 GB/s/호스트가 D-09의 0.69 GB/s와 일치**(CU-40a) |
| wcssd-v1 X-01·X-03 (읽기 편중 186:1, 92/8) | KV 저장소 수준 쓰기 비중 43~63%(DeepSeek·Kimi 파생)와 대비, **측정 계층 차이**로 정리(7-D) |
| ladder F15·F17, qlc-v6-waf W17·W19 (CacheLib WAF 3.22→1.03, OP 50% 문서 경유) | OP 50%를 **OSDI'20 원문으로 재확인**, 수요 = 예산 1.5배·ML 수용 -44% 추가(CU-02~CU-04) |
| qlc-v6-pc E01 (Google FAST'16, 과도한 OP 불필요) | Microsoft SYSTOR'16 플릿 0.07~0.23 DWPD, NetApp FAST'22 중앙값 0.36·7% >3 DWPD 추가(§2) |
| qlc-v7 V-51·UD-11 (CMX 16TB/GPU) | §6에서 용량 배정 축으로 사용. Google 18 TiB/8 GPU(CU-25)를 두 번째 사이징 점으로 추가 |
| qlc-v7 W-32·W-35 (Mooncake +59~498%, 3FS 피크 읽기 40 GiB/s) | Mooncake 트레이스 원자료로 적중·신규 블록 비율 계산(CU-35~CU-37), 3FS GC 삭제 버스트 추가(CU-28) |
| ssd-mixed-media IR-01 (Microsoft 서버 4→6년) | FairyWREN도 같은 사실을 "수명 연장이 허용 DWPD를 더 낮춘다"는 근거로 인용(CU-07의 6년·10년 시나리오) |
