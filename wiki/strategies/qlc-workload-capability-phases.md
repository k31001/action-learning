---
type: strategy
last_reviewed: 2026-09-17
sources:
  - sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md
  - sources/articles/kv-cache-ssd-offload-ecosystem-2026-08.md
  - sources/articles/qlc-essd-timeline-fdp-ruh-2026-09.md
  - sources/articles/fdp-open-source-ecosystem-2026-08.md
  - sources/articles/fdp-technical-limits-adoption-context-2026-08.md
  - sources/articles/execution-benchmarks-sw-capability-customer-collab-2026-09.md
  - sources/prompt/prompt-qlc-ssd-strategy.md
---

# QLC 추론 캐시 티어를 위한 역량 3단계 — Phase 1 디바이스 · Phase 2 워크로드 최적화 · Phase 3 고객 시스템 co-design

> **한 줄 요약**: 워크로드는 고객 시스템 말단에서 관측되는 현상일 뿐이다. 추론 캐시 티어를 QLC로 가져가려면 (1) 배치 표준을 제대로 구현한 디바이스, (2) 고객 워크로드를 분석해 그 디바이스를 최적화하는 능력, (3) 고객의 응용·시스템 소프트웨어를 이해하고 함께 설계하는 능력이 순서대로 필요하다. 삼성은 Phase 1의 디바이스와 Phase 2·3의 오픈소스 도구를 5사 중 가장 두텁게 갖고 있으나, 그것을 **KV cache 스택에 연결한 공개물이 없다.** 이 페이지는 세 Phase의 정의, 필요한 역량, 참여할 기술 스택, 협업할 기업을 정리한다.

> **Phase 정의 (사용자 결정 2026-09-17, [prompt-qlc-ssd-strategy.md](../../sources/prompt/prompt-qlc-ssd-strategy.md) 피드백 6)**: Phase 1 = 배치 표준 SSD 디바이스를 잘 만드는 단계. Phase 2 = 그 SSD를 고객 워크로드 분석으로 최적화하는 단계. Phase 3 = 고객 시스템 이해를 기반으로 함께 설계(co-design)하는 단계. 시장 3기([qlc-ssd-market.md](../concepts/qlc-ssd-market.md) §3.3)와의 대응은 느슨하다: 현재 국면은 Phase 2를, 향후 국면(추론 캐시 티어)은 Phase 3를 요구한다.

---

## 1. 기술 스택 지도 — SSD 벤더가 코드로 들어갈 수 있는 자리

KV cache 오프로드 스택은 5계층으로 굳어졌다 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §1).

| 계층 | 주체·자산 | 무엇을 결정하나 | SSD 벤더 접점 |
|---|---|---|---|
| ① 추론 엔진 | vLLM(KV connector), SGLang(HiCache), TensorRT-LLM | KV 블록 할당·prefix 재사용·오프로드 트리거 | 없음(커넥터 인터페이스만) |
| ② KV 캐시 관리자 | NVIDIA Dynamo KVBM(G1~G4), LMCache(11.8k★), Mooncake Store, Tencent FlexKV, ByteDance AIBrix, Alibaba Tair KVCache(+HiSim), DeepSeek 3FS | 어떤 블록을 언제 SSD로 내리고 지우는가. **수명·재사용 정보의 원천** | 없음. README 4종(LMCache·Mooncake·FlexKV·3FS)에 배치 표준·write hint·내구성 언급 0 ✅ |
| ③ 전송·I/O 라이브러리 | NIXL(스토리지 플러그인), GPUDirect Storage, io_uring, SPDK/xNVMe(삼성 유지), LMCache L2 백엔드에 DOCA_MEMOS | 어떤 시스템콜·큐로 쓰는가. **스트림·배치 ID를 실을 수 있는 유일한 자리** | **가능**: NIXL 플러그인, xNVMe 배치 API, LMCache·FlexKV io_uring 경로에 write stream 부착 |
| ④-a 커널 | Linux 6.16 블록 write streams(최대 255), XFS write streams v2~v4(2026-03~07, RocksDB WAF -35%), f2fs RFC(2026-04) | 파일시스템·블록 계층의 스트림 부여 | **가능·진행 중**(삼성 GOST가 XFS·RocksDB·CacheLib 지원 구축) |
| ④-b 플랫폼 | NVIDIA CMX(BlueField-4, DOCA Memos KV API, NVMe KV 확장), ICMSP 파트너(DDN·VAST·WEKA·Pure·Dell·HPE·Supermicro 등) | 풀 레벨 배치·공유. SSD가 보는 쓰기 패턴을 사실상 결정 | 부분: NVMe/NVMe-oF 접속. **DOCA Memos 힌트 → 배치 표준 매핑 여부 미확인** ⚠️ |
| ⑤ 디바이스 | 컨트롤러(삼성 자체, Marvell SC6, SMI MonTitan), 펌웨어(RUH·RU·OP·GC), 미디어 | RUH 수, WAF, 유효 DWPD | 벤더 고유 |

**독해**: ②계층 소유자(NVIDIA·Tencent·Moonshot·ByteDance·Alibaba·DeepSeek·LMCache)는 모두 SSD를 파일·블록으로 취급한다. 수명 정보는 ②에 있는데 그것을 ⑤로 내려보내는 코드가 없다. 2026년 커널·XFS가 열리면서 ③에 스트림 부착 코드를 넣는 것이 가능해졌다. **Phase 2→3의 기술적 통로는 ③·④이고, 이 자리는 아직 비어 있다.**

## 2. Phase 1 — 배치 표준 SSD 디바이스를 잘 만든다

### 2.1 요구 역량

| 역량 | 추론 캐시 티어 기준 | 근거 |
|---|---|---|
| RUH 확장 펌웨어 | 현행 업계 2~8개 → **200+**(세션·테넌트·prefix·수명 등급 분리) | ScaleFlux 200+ 스트림·유효 7~10+ DWPD ([qlc-essd-timeline-fdp-ruh-2026-09.md](../../sources/articles/qlc-essd-timeline-fdp-ruh-2026-09.md) §2) |
| QLC 미디어 관리 | 2Tb 다이, SLC 캐시·쓰기 정형·GC 정책으로 WAF ≈1 유지, 수명 보증 가능 수준의 텔레메트리 | CacheLib 실측 WAF 3.22 → 1.03 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.2) |
| 인터페이스 | PCIe 5→6, NVMe 2.1, NVMe KV 확장, NVMe-oF(CMX 풀) | CMX가 NVMe KV 확장 사용(같은 소스 §1) |
| 전력·냉각 | W/TB 1차 KPI(245TB급 0.12 W/TB), D2C 액체냉각 | Micron 6600 ION, 삼성 PM1763·Kioxia CM10 액체냉각 |
| 플랫폼 인증 | NVIDIA CMX/BlueField-4 STX 검증, OCP 2.5/2.6, 하이퍼스케일러 qualification(12~18개월) | Supermicro STX가 Micron·삼성·Phison SSD로 검증 진행 |
| 에뮬레이션 | 정책 변수를 실리콘 전에 재현하는 에뮬레이터(QEMU FDP, WARP) | [fdp-technical-limits-adoption-context-2026-08.md](../../sources/articles/fdp-technical-limits-adoption-context-2026-08.md) |

### 2.2 삼성 현황 (공개 정보 기준)

- 보유: PM1753이 CMX 첫 공식 공급 SSD, PM1763(PCIe 6.0, V9 TLC) 2026-07 양산, BM1773 245.76TB(V9 QLC) FMS 2026 전시. 배치 표준 공동 주도자(백서 2023-10), xNVMe·SPDK·QEMU·fio 기여.
- 공백: PM1763·BM1773의 **RUH 수·배치 표준 지원·DWPD 미공개**. QLC 라인의 KV cache 포지셔닝 없음(FMS 2026 메시지는 "TLC=성능·QLC=용량" 이분법). 용량 리더십 후발(61TB 1년, 245TB 미출하).
- 경쟁: ScaleFlux만 Phase 2 스펙(RUH 200+·DWPD)을 제품으로 제시. Kioxia CM10·Solidigm PS1030은 TLC 3 DWPD로 캐시 티어 선점. SK hynix AI-N P는 SLC로 상단을 노린다.

### 2.3 Phase 1 산출물 정의

**"KV-ready QLC"**: 245TB급 V9 2Tb QLC 위에 RUH 200+, 세션·테넌트 격리, WAF·수명 텔레메트리, NVMe KV 확장, 액체냉각을 갖추고 **유효 DWPD를 워크로드 조건부로 보증**하는 제품. 스펙 문서에 "어떤 호스트 정책에서 얼마의 유효 DWPD"를 표로 싣는다. 이것이 Phase 2·3의 입장권이다.

## 3. Phase 2 — 고객 워크로드 분석으로 SSD를 최적화한다

### 3.1 요구 역량

| 역량 | 내용 | 공개 선례 |
|---|---|---|
| 트레이스 수집·재현 | 고객 KV 블록 트레이스(세션·prefix·재사용·무효화)를 받아 GPU 없이 재생, TTFT·처리량 예측 | Alibaba Tair KVCache **HiSim** ✅ |
| WAF·테일 지연 정량 | fio·blktrace·eBPF, p999/p9999, 격리, 전력 동시 측정 | CacheLib FDP 문서 WAF 실측 ✅, XFS write streams RocksDB -35% 🟡 |
| RUH 정책 설계 | 수명·테넌트·prefix 등급 → RUH 매핑 추천, 오분류 방지(WARP 조건) | ScaleFlux 텔레메트리 🟡, SK hynix SALT-KV(의미 기반 티어링) 🟡 |
| 관리자 정책과의 상호작용 | Dynamo KVBM "빈도≥2 블록만 디스크" 필터, LMCache 퇴거 정책과 RUH 분리의 결합 | KVBM 문서 🟡 |
| 디지털 트윈 | 에뮬레이터로 정책 변수를 실리콘 전 검증, 고객 trace의 pre/post-silicon 재사용 | [fdp-host-ssd-platform.md](fdp-host-ssd-platform.md) §4 실행전략 1·3 |
| 워크로드 프로파일 | Cache·KV·Vector·Checkpoint·QLC 등 표준 프로파일: 새 펌웨어가 아니라 호스트 설정 + 검증된 사용법 | 같은 페이지 실행전략 2 |

### 3.2 삼성 현황

- 보유: KV cache 백서 2종(PM1753 오프로드, CMM-D 풀 메모리 오프로드 with vLLM+LMCache) → **KV cache 워크로드를 자체 측정하는 역량은 있다.** GOST의 "RocksDB·CacheLib·XFS 지원 경험상 큰 앱 수정 없이 효익의 80%" 주장.
- 공백: **KV cache 트레이스 기반 RUH 정책·WAF 실측 공개물 없음.** 이는 업계 전체의 공백이기도 하다. 첫 공개가 곧 레퍼런스가 된다.

### 3.3 Phase 2 산출물 정의

"워크로드 프로파일 + 검증 리포트": 고객 유형별(추론 서비스·에이전트 플랫폼·스토리지 벤더 어레이) KV cache 프로파일 3종, 각 프로파일의 RUH 매핑·WAF·유효 DWPD·전력 실측, 그리고 **수명 보증 조건표**. 고객이 자기 워크로드로 재현할 수 있는 도구(프로파일러·에뮬레이터)를 함께 준다.

## 4. Phase 3 — 고객 시스템 이해로 함께 설계한다

### 4.1 요구 역량

| 역량 | 내용 | 공개 선례 |
|---|---|---|
| 추론 스택 내부 이해 | vLLM/SGLang 스케줄러·prefix 캐시, Dynamo KVBM·NIXL, LMCache·Mooncake·FlexKV 내부 구조, DOCA Memos API | FlexKV가 vLLM·SGLang·TRT-LLM·Dynamo 메인라인에 머지(PR 번호 공개) ✅ — **메인라인 머지가 co-design의 가시적 증거** |
| 커널 I/O 경로 | io_uring_cmd passthru vs 블록 write streams, XFS·f2fs 스트림, NVMe-oF 경로 | CacheLib FDP는 passthru 경로(`FdpNvme`) ✅ |
| 시스템 레벨 TCO 모델 | 디바이스→서버→랙→데이터센터에서 QLC 캐시 티어가 만드는 GPU당 동시 사용자·TTFT·전력·비용 예측, 고객과 공용 시뮬레이션 자산 | [dev-org-transformation.md](dev-org-transformation.md) 축 1(시스템 모델), Micron↔Anthropic "token economics" 공동 분석 🟡 |
| 스펙 상류 참여 | 고객 캐시 관리자의 SSD 티어 인터페이스(스트림·힌트·텔레메트리)를 공동 정의, 표준(NVMe·OCP·SNIA)에 반영 | Meta↔삼성 CacheLib 배치 표준 업스트림·EuroSys'25 ✅ |
| 계약 형태 | 공급 + 공동 최적화 + 운영 통합 + 자본 | Micron↔Anthropic(2026-06-22) ✅, SK hynix·Kioxia↔NVIDIA AI SSD 🟡 |

### 4.2 삼성 현황

- 보유: Meta CacheLib 배치 표준 업스트림·대규모 배포·논문(Memory Solutions Lab, San Jose) — **5사 중 가장 강한 Phase 3 선례**. Anthropic 전략 인프라 파트너·공급계약, Mistral €3B 리드 투자(운영 통합), OpenAI 파운드리·HBM 협력.
- 공백: **KV cache 관리자(LMCache·FlexKV·Mooncake·KVBM) 어디에도 삼성 기여 흔적 없음** ✅(README 기준). Anthropic 공급계약에 Micron과 달리 "공동 최적화" 문구 부재 🟡. 시스템 TCO 모델 조직 없음(개발실 전환 전략의 미착수 항목).

### 4.3 Phase 3 산출물 정의

"레퍼런스 스택 + 공동 계약": 고객 추론 스택 위에서 삼성 KV-ready QLC가 기본 백엔드로 선택되는 레퍼런스 아키텍처(메인라인 머지된 커넥터·플러그인 포함), 공용 TCO 모델, 그리고 공급·공동 최적화·수명 보증·자본을 묶은 공동 플랫폼 계약.

## 5. 기술 전략 — 발전시킬 역량, 참여할 스택, 협업할 기업

### 5.1 기존 역량 위에 무엇을 쌓나

| 기존 역량(강점) | 발전시킬 역량 | 왜 |
|---|---|---|
| 컨트롤러·펌웨어·미디어 수직계열화, 세대 전환 속도 | RUH 200+ 펌웨어, 워크로드 조건부 수명 보증, 텔레메트리 | Phase 1 입장권. 미디어만으로 10~40배 갭을 못 메운다 |
| 배치 표준 공동 주도·GOST 오픈소스(xNVMe·XFS·CacheLib) | 그 자산을 **KV cache 계층(③)에 연결**하는 커넥터·플러그인 | 도구는 있는데 KV 스택에 없다 |
| KV cache 워크로드 측정(백서 2종) | 트레이스 재현기·프로파일러·에뮬레이터를 고객 공용 도구로 제품화 | Phase 2를 반복 가능한 서비스로 |
| CMX 첫 공급 SSD, 하이퍼스케일러 1위 물량 | DOCA Memos↔배치 표준 매핑 공동 정의, STX 인증 | 플랫폼 게이트 통과 |
| Meta CacheLib co-design 선례 | 같은 문법을 LLM 기업·CMX·스토리지 벤더로 복제 | Phase 3 확산 |
| 데이터센터 전담 개발 조직 | 시스템 아키텍트·TCO 모델링 조직 신설 | 스펙 상류 대화의 언어 |

### 5.2 참여할 기술 스택 (우선순위)

1. **③ I/O 라이브러리에 write stream 부착**: LMCache·FlexKV의 io_uring·GDS 백엔드, NIXL 스토리지 플러그인, xNVMe 배치 API. 업스트림 PR이 성과 단위.
2. **④-a 커널·파일시스템**: XFS write streams·f2fs 배치 표준 패치의 메인라인 머지 완주, RocksDB·CacheLib 후속.
3. **④-b CMX·DOCA Memos**: 배치·수명 힌트의 NVMe 매핑을 NVIDIA와 공동 정의(미확인 항목 1호).
4. **② KV 캐시 관리자**: Dynamo KVBM 디스크 필터·LMCache 퇴거 정책과 RUH 분리의 결합 설계 제안, Mooncake NVMe-oF 풀 RFC 참여.
5. **표준·커뮤니티**: SNIA SDC StorageAI(KV Cache as Distributed Storage), OCP–SNIA AI 스토리지, NVMe TP.
6. **에뮬레이션·시뮬레이션**: WARP류 에뮬레이터 + HiSim류 트레이스 재생기를 하나의 디지털 트윈으로.

### 5.3 협업할 기업 (기술 보유 기준)

| 기업 | 보유 기술 | 협업 목적 | 형태 |
|---|---|---|---|
| **NVIDIA** | CMX·BlueField-4·DOCA Memos·Dynamo KVBM·NIXL | 플랫폼 게이트·힌트 매핑·레퍼런스 백엔드 | STX 인증 + 공동 기술 정의 |
| **Meta** | CacheLib(배치 표준 기지원), QLC 용량 계층 설계, 구매 SSD 전량 배치 표준 탑재·기본 비활성 | 캐시 티어 활성화 + KV cache 확장 | 기존 co-design 확장 |
| **Google** | 배치 표준 공동 설계자, Titanium SSD(자체 설계) | 스펙 상류·활성화 | 공동 프로파일 |
| **Anthropic · OpenAI** | 추론 스택·KV 수명 정책의 원천 소유자 | 스펙 상류 장악, 공동 최적화 조항 | 공급계약에 co-design 조항 추가 |
| **Tensormesh(LMCache)** | 사실상 표준 OSS KV 캐시 관리자, NVentures·AMD·CoreWeave 투자 | 배치 표준 백엔드 업스트림 | 공동 투자 + 기여 |
| **Moonshot(Mooncake) · Tencent(FlexKV) · Alibaba(Tair)** | 중국 추론 스택의 KV 계층, HiSim 트레이스 시뮬레이터 | 플러그인 인터페이스 정합, 트레이스 방법론 | 오픈소스 기여 |
| **VAST Data · DDN · WEKA** | CMX ICMSP 파트너, KV cache SW(DDN 2026-06), Dynamo 연동 | 6~12개월 실증·레퍼런스 아키텍처, 네오클라우드 채널 | 인증 + DDN 전략 라운드 지분 |
| **ScaleFlux** | 200+ 스트림·7~10 DWPD 플랫폼, 워크로드 텔레메트리 | Phase 2 역량 즉시 확보 | acqui-hire 후보(누적 조달 $65.9M) |
| **Marvell · Silicon Motion** | KV 오프로드 지원 컨트롤러(SC6·MonTitan) | 자체 컨트롤러 로드맵 대조·백업 | 벤치마크 |
| **Linux Foundation · SNIA · OCP** | 커널 write streams, StorageAI 트랙, AI 스토리지 표준 | 표준 지위 유지 | 워킹그룹 리드 |

## 6. 삼성의 Phase 위치와 갭 요약

| Phase | 업계 최고 공개 수준 | 삼성 공개 수준 | 갭 |
|---|---|---|---|
| 1 디바이스 | ScaleFlux RUH 200+·7~10 DWPD, Kioxia CM10 3 DWPD 캐시 티어 | CMX 첫 공급(TLC), 245TB QLC 전시, RUH·DWPD 미공개 | QLC를 캐시 티어에 지명한 제품 없음 |
| 2 워크로드 최적화 | Alibaba HiSim, SK hynix SALT-KV, ScaleFlux 텔레메트리 | KV cache 백서 2종, CacheLib WAF 실측 | KV cache 트레이스 기반 RUH 정책·WAF 실측 미공개(업계 공백) |
| 3 co-design | Micron↔Anthropic SSD 공동 설계, FlexKV 메인라인 머지 | Meta CacheLib 업스트림·논문 | KV 관리자 기여 0, 계약에 공동 최적화 조항 없음 |

**결론**: 갭은 기술보다 **연결**에 있다. 디바이스(⑤)와 도구(③·④)는 있고 캐시 관리자(②)는 열려 있다. 연결을 만드는 것은 개인 엔지니어의 노력이 아니라 조직·인사·재무의 설계다 → [qlc-execution-strategy.md](qlc-execution-strategy.md).

## 7. 시나리오 연결

- B(AI 르네상스): 추론 캐시 티어 최대 개방, Phase 3 계약이 가장 많이 성립.
- A(황금 요새): 진영 내 CSP·NVIDIA 생태계 안에서 Phase 1·2가 인증 장벽으로 작동.
- C·D(AI 조정): 캐시 티어 확장 지연. Phase 2 도구와 수명 보증이 기존 QLC 용량 티어의 전환비용으로 남는다.
- E(패러다임 전환): 커널·플랫폼 계층 참여(④)가 차세대 스토리지 인터페이스 전환기의 헤지.
