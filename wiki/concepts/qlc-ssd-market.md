---
type: concept
last_reviewed: 2026-09-17
sources:
  - sources/articles/qlc-essd-history-2022-background-2026-09.md
  - sources/articles/qlc-essd-market-size-forecast-data-2026-09.md
  - sources/articles/qlc-essd-timeline-fdp-ruh-2026-09.md
  - sources/articles/kv-cache-ssd-demand-2026.md
  - sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md
  - sources/articles/enterprise-ssd-market-1q26-2026-08.md
  - sources/prompt/prompt-qlc-ssd-strategy.md
---

# QLC eSSD 시장 — 초기·현재·향후 3기의 배경·요구사항과 2022~2030 수요·매출 모델

> **한 줄 요약**: 데이터센터 QLC eSSD는 2022년에 "요구"가 형성되고(표준·폼팩터·가격 급락·데이터 레이크) 2024년에 "물량"이 터졌다(30EB, 전년 4배). 지금은 용량 경쟁(61→122→245TB)과 니어라인 HDD 부족이 QLC를 끌어올리고 있으나, 향후 3~5년의 스토리지 공급 부족 국면에서 QLC의 다음 무대는 HDD 대체가 아니라 **추론 캐시 티어(KV cache 오프로드)** 다. 그 티어는 오늘 TLC가 서비스하고 있고, QLC가 들어가려면 정격 내구성 10~40배 갭을 **호스트 협력 데이터 배치와 시스템 소프트웨어**로 메워야 한다. 수요 모델은 QLC eSSD 비트가 2025년 53EB에서 2030년 550EB로 10배 늘지만, 가격이 정상화되면 매출은 $30B대에서 정체한다고 본다. 비트가 아니라 시스템 위의 부가가치가 이익을 결정한다.

> **표기 원칙**: 본 페이지의 수치는 대부분 검색 인용 경유 🟡 또는 삼각측량 ⚠️다(수집 세션의 외부 원문 열람이 차단됨, [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) 접근 제약 고지). 모델의 전망치는 전부 추정(e)이며 §4.3의 가정표를 통해 재현 가능하다. 데이터 배치 표준은 NVMe FDP(Flexible Data Placement, TP4146)를 가리키며 이하 "배치 표준"으로 줄여 쓴다.

---

## 1. 초기 국면(2018~2023): 2022년, 하이퍼스케일러는 왜 대용량 QLC를 요구했나

### 1.1 2022년의 실제 시장은 "QLC 주문 폭증"이 아니라 "준비기"였다

2022년은 AI 인프라 투자가 늘기 시작한 해(하이퍼스케일러 4사 CapEx 분기 약 $36B, ChatGPT 출시 2022-11)이지만, 같은 해 enterprise SSD 시장은 정반대로 움직였다. 4Q22 eSSD 계약가 -25% QoQ, 4Q22 eSSD 매출 $3.79B(-27.4%), 원인은 PC·스마트폰 둔화와 데이터센터 재고 조정이었다 ([qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §2.1, [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §1.1). 즉 2022년은 물량의 해가 아니라 **QLC를 쓸 수 있는 조건이 한꺼번에 갖춰진 해**다.

| 2022년에 갖춰진 조건 | 내용 | 출처 |
|---|---|---|
| 공급자 교체 | Intel NAND 사업의 SK hynix 매각 1단계 종결(2021-12-29) → Solidigm 출범, 대용량 QLC 전문 벤더의 탄생 | 연혁 소스 §2.1 |
| 폼팩터 표준 | Meta·Microsoft 주도 OCP E1.S 사양, E1.L "1U에 1PB"(D5-P5316 30.72TB) | 연혁 소스 §2.2·§2.3 |
| 배치 표준 | Meta와 Google이 각자 풀던 WAF 문제를 통합해 NVMe 배치 표준(TP4146) 비준(2022-12-22), WAF ~3 → ~1 | 연혁 소스 §2.4 |
| 가격 | 2H22 NAND·eSSD 계약가 급락으로 QLC $/TB의 HDD 대체 임계 접근 | 연혁 소스 §2.1 |
| 제품 예고 | OCP 2022(10월)에서 Solidigm이 61.44TB D5-P5336(192단 QLC) 예고 | 연혁 소스 §2.2 |
| 데이터 | AI 학습 데이터셋 중앙값 2022년 1,050억 → 2023년 7,500억 데이터포인트(6배 이상) | 연혁 소스 §2.1 |

### 1.2 요구의 논리: 공급자 TCO 논거와 수요자 계층 논거

**공급자(Intel/Solidigm)의 논거는 랙 밀도와 TCO였다.** 4TB HDD로 1PB를 채우면 20U, 30.72TB E1.L QLC로는 1U(20배). Ceph 기준 5년 TCO 47% 절감, 전력 32.9~79.5% 우위. 122TB 세대에서는 30TB TLC 대비 TB당 와트 3.4배, TLC+HDD 하이브리드 9랙을 QLC 1랙으로 ([qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §2.2).

**수요자(Meta)의 논거는 HDD의 대역폭 붕괴였다.** HDD는 용량이 늘어도 IOPS와 대역폭이 늘지 않아 TB당 대역폭이 계속 떨어진다. Meta는 "10 MB/s/TB 대역"을 요구하는 워크로드를 HDD(20~30TB, 최저 성능)와 TLC(8~16TB, 성능 계층) 사이의 **QLC 용량 계층(64~150TB)** 이 흡수한다고 정리했고, QLC 서버의 바이트 밀도 목표를 TLC 서버의 6배로 잡았다. 쓰기가 NAND 전력의 대부분을 차지하므로 읽기 중심 워크로드를 QLC로 옮기면 전력도 준다. 다만 "QLC가 TLC보다 싸지만 광범위 배치를 위해선 아직 더 싸져야 한다"는 단서가 붙었다 (같은 소스 §2.3).

**초기 국면의 요구사항 요약**: 읽기 중심, 낮은 내구성 허용(0.3~0.6 DWPD), 드라이브당 30TB급, PCIe 4.0, E1.L/U.2, TB당 원가·전력·랙 밀도가 구매 기준. 고객은 CDN·오브젝트 스토리지·빅데이터·어레이 벤더(Pure Storage DirectFlash QLC 2019~)였고, 하이퍼스케일러 인증을 가진 QLC 벤더는 2024년 4월 시점에도 Solidigm·삼성 2사뿐이었다 (같은 소스 §2.5).

### 1.3 물량이 터진 해는 2024년이다

TrendForce는 2024년 QLC eSSD 비트 출하를 **30EB, 2023년 대비 4배**로 집계했고, 동인을 "AI 추론 서버의 에너지 효율이 핵심 우선순위로 부상하며 북미 고객 주문 증가"로 짚었다 ([qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §2.1). 2023년 7월 Solidigm이 61.44TB를 세계 최초 출시하고 2024년 eSSD 수요 급증의 최대 수혜로 흑자 전환한 이야기는 [fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §2.5에 정리돼 있다. 요약하면 **2022년에 요구가 정의되고, 2023년에 제품이 나오고, 2024년에 AI 추론 서버가 물량을 만들었다.**

## 2. 현재 국면(2024~2026): 용량 경쟁과 니어라인 HDD 부족이 QLC를 끌어올린다

### 2.1 2022년경 vs 2026년 현재 QLC eSSD 비교표

| 비교 축 | 2022년경 (Solidigm D5-P5316 → 2023 D5-P5336 61TB 초기) | 2026년 현재 (Micron 6600 ION 245TB · Kioxia LC9 · Solidigm 122TB · 삼성 176단/V9 QLC) |
|---|---|---|
| 드라이브 최대 용량 | 15.36 / 30.72TB (2023-07 61.44TB 등장) | 122.88 ~ 245.76TB (SanDisk 256TB 예고) |
| NAND 다이·단수 | 1Tb QLC, 96/144단 | 1Tb(192·286단) → **2Tb QLC**(BiCS8 Kioxia·SanDisk, 삼성 V9 2Tb 개발 완료, SK hynix 321단 2Tb 양산) |
| 인터페이스 | PCIe 3.1 → PCIe 4.0 | PCIe 5.0 주류, PCIe 6.0은 TLC(PM1763)부터 |
| 폼팩터 | U.2, E1.L(1U 1PB), E1.S | E3.S / E3.L 중심, 2.5"는 2026년 말 퇴장 전망, E2(1PB·80W) 표준화 진행 |
| 내구성(DWPD) | 0.4~0.6 (D5-P5336 61TB 0.58) | 0.3 랜덤 ~ 1.0 순차(6600 ION), LC9 0.3, 삼성 BM1743 0.26, Solidigm 122TB 0.6 |
| 전력 | 15W(2018, 1.95 W/TB) → 25W(61TB, 0.41 W/TB) | 30W 최대 / **0.12 W/TB**(245TB), 유휴 <5W |
| 순차 읽기 / 랜덤 읽기 | 3.2 → 7 GB/s / 427K → 1.6M IOPS | 12~13.7 GB/s / 1.3M~1.78M IOPS |
| 타깃 워크로드 | CDN·오브젝트·빅데이터·warm storage·HDD 대체 | AI 데이터 레이크·학습 인제스트·체크포인트·추론(RAG·KV cache)·니어라인 HDD 부족 대체 |
| 핵심 고객 | 북미 CSP 일부, CDN, 어레이 벤더 | 하이퍼스케일러 전면(삼성 176단 QLC 대량 출하, Meta QLC 계층, Pure DFM 2EB), AI 팩토리 |
| 경쟁 대상 | HDD 4~16TB, TLC 15~30TB("QLC 가격·TLC 성능" Micron 6500 ION) | 니어라인 HDD 24~44TB(2026년 완판, 리드타임 52주+), TLC 60TB. HDD 완판으로 QLC가 대안이 아니라 필수 공급원 |
| 호스트·펌웨어 기능 | Multi-stream(2017)·ZNS(2020)·배치 표준 비준 직후 | 배치 표준 상용 채택(삼성·Kioxia·Solidigm·Micron), OCP 2.5/2.6, NVMe 2.0/2.1, 텔레메트리·PLP 강화 |
| 인증·리드타임 | 인증 QLC 벤더 2사 | 5사 경쟁(Solidigm·삼성·Micron·Kioxia·SanDisk), 대용량 SSD 리드타임 약 1년 |
| 수요 논리 | 공급자 TCO 논거("$/TB·랙 밀도·전력으로 HDD 대체") | 수요자 주도("HDD 대역폭 붕괴 + HDD 공급 부족 + AI 추론 전력 효율") |
| $/TB(공개 소매 추정) | 61TB ≈ $60~95/TB(2024 초) | 30TB QLC 인덱스 $92(3Q25) → $504(1Q26) → $603(3Q26), TLC 대비 13~20% 할인 |

출처: [qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §1·§3, [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §3.3. 전 항목 🟡.

### 2.2 현재 국면의 구조 신호

- **용량 리더십은 후발이다**: 61TB Solidigm 2023-07 vs 삼성 2024-07, 122TB Solidigm 2024-11 출하 vs 삼성 FMS 2024 전시, 245TB 첫 출하 Micron 2026-05. 삼성 BM1773 245.76TB(V9 QLC, 2Tb 다이)는 FMS 2026 전시 단계이며 DWPD·배치 표준 지원은 미공개다 ([qlc-essd-timeline-fdp-ruh-2026-09.md](../../sources/articles/qlc-essd-timeline-fdp-ruh-2026-09.md) §1, [kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2).
- **물량은 1위다**: 1Q26 eSSD 매출 삼성 $7.05B(38.2%)는 176단 QLC 대량 출하가 기여했고, 2Q26에는 $14.35B(35.1%)로 배증했다. 2Q26 Top-5 합산 $37.59B(+103.6% QoQ), eSSD가 NAND 매출의 약 55%다 ([qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §1.2). 삼성은 2H26 QLC 비트를 1H26 대비 2배 이상 출하할 계획이다 (같은 소스 §2.1).
- **니어라인 HDD 부족이 QLC를 끌어올린다**: 니어라인 HDD 리드타임 수 주 → 52주 초과, Seagate·WD 2026년 물량 완판과 2027~28 장기계약, HDD 가격 2025-09 이후 +46%. TrendForce는 "2026년 대용량 QLC SSD 출하 급증"을 전망하되 대량 전환의 장애로 비용과 공급망을 꼽았다 (같은 소스 §5).
- **가격은 비정상이다**: 30TB TLC 인덱스가 3Q25 $3,062에서 3Q26 $22,600으로 6.5배, eSSD 계약가 1Q26 약 +80%. 2027년 하반기 공급 완화가 TrendForce의 전망이다 (같은 소스 §3). 수요 모델은 이 가격을 외삽하지 않는다.

## 3. 향후 국면(2027~2030): QLC의 다음 무대는 추론 캐시 티어다

### 3.1 왜 니어라인 HDD 대체가 아닌가

향후 3~5년은 스토리지 공급 부족 국면이다(HDD 완판·2027~28 장기계약, NAND 쇼티지 2028년까지 가능). 니어라인 대체 수요는 존재하지만 이 시장은 (a) TB당 원가와 전력으로만 승부하는 커머디티 경쟁이고, (b) 공급이 풀리는 순간 HDD 가격 경쟁력이 복귀하며, (c) 고객 시스템과의 접점이 얇아 전환비용이 쌓이지 않는다. 사용자 결정(2026-09-17): **니어라인 HDD 대체 시장에는 들어가지 않고, AI 추론 캐시 티어를 QLC로 가져간다** ([prompt-qlc-ssd-strategy.md](../../sources/prompt/prompt-qlc-ssd-strategy.md) 피드백 3).

### 3.2 추론 캐시 티어의 크기와 현재 주인

- **크기**: KV cache 단독 NAND 추가 수요 2027년 75~100EB, 2028년 그 2배(150~200EB), 2030년 AI 데이터센터 NAND 워크로드의 약 35%(SanDisk FMS 2026). NVIDIA CMX 공급망 추정은 2026년 35EB → 2027년 100EB 이상으로 독립 경로에서 같은 방향이다. 삼성은 V-NAND 캐파의 약 60%를 CMX 대응에 배정했다는 보도가 있다 ([qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §4, [kv-cache-ssd-demand-2026.md](../../sources/articles/kv-cache-ssd-demand-2026.md)).
- **현재 주인은 TLC다**: CMX 타깃으로 벤더가 지명한 드라이브는 전부 TLC(삼성 PM1753/PM1763, Kioxia CM10 1/3 DWPD, Solidigm PS1010/PS1030 1/3 DWPD)이고, CMX 발표 뒤 TLC 현물가가 반등했다. QLC를 이 티어에 지명한 공개 사례는 SanDisk FMS 2026의 "고내구 KV cache 구성(BiCS10 QLC)" 1건뿐이며 DWPD는 미공개다 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.3).
- **갭(2026-09-22 재계산)**: 현 QLC 정격 **0.6 DWPD**를 기준으로 KV cache 티어 요구 1~3 DWPD와 **2~5배** 갭이다. 종전 표기 10~40배는 최저 정격 0.075와 상한 3을 짝지은 극단 조합이었고, ScaleFlux의 유효 7~10+ DWPD는 벤더 자사 플랫폼 발표값이라 요구 수준의 근거에서 제외했다 (같은 소스 §3.1, [qlc-v6-purchase-criteria-dwpd-history-2026-09.md](../../sources/articles/qlc-v6-purchase-criteria-dwpd-history-2026-09.md)).
- **갭을 메우는 수단은 이미 공개돼 있다**: 배치 표준으로 수명이 다른 블록을 분리하면 CacheLib 실측에서 WAF 3.22 → 1.03(디바이스 사용률 100%) · 1.22 → 1.03(사용률 50%), Kioxia XD8 CacheBench 2.8 → 약 1.0, XFS write streams에서 RocksDB WAF -35%. 반면 **KV cache 워크로드에서 배치 표준의 WAF 실측을 공개한 벤더는 아직 없다**. 이것이 업계 공백이자 선점 기회다 (같은 소스 §3.2).

### 3.3 향후 국면의 요구사항

| 요구 축 | 초기(2018~23) | 현재(2024~26) | 향후(2027~30, 추론 캐시 티어) |
|---|---|---|---|
| 배경 | 데이터 레이크·HDD 대역폭 붕괴·표준 정비 | AI 추론 서버 전력 효율, 용량 경쟁, HDD 부족 | 장문맥·에이전틱 추론의 KV cache가 HBM·DRAM을 넘쳐 SSD로 내려옴, 전력 제약 데이터센터 |
| 1차 구매 기준 | $/TB, 랙 밀도 | $/TB, W/TB, 리드타임(공급 확보) | **슬롯당 TB·TB당 와트 + 99.9999% 읽기 지연 + DWPD·TBW + 공급 보장 + 배치 힌트·텔레메트리 지원** |
| 내구성 | 0.3~0.6 DWPD 허용 | 0.3 랜덤 / 1.0 순차 스펙 분리 | 요구 1~3 DWPD를 미디어가 아니라 **배치·호스트 SW로 달성**, WAF 급등 시 런타임 대응이 계약 조건 |
| 인터페이스·플랫폼 | PCIe 4, OCP NVMe | PCIe 5, E3.S/E3.L, 배치 표준 상용 | PCIe 6, NVMe-oF, NVMe KV 확장, CMX(BlueField-4·DOCA Memos)·GPU 직결(SCADA) |
| 호스트 기능 | 없음(블록 디바이스) | 배치 표준 지원, 텔레메트리 | **배치 핸들 16+ 지원·공개**(스펙 상한은 네임스페이스당 128), 세션·테넌트·prefix·수명별 스트림 분리, 커널 write streams, 캐시 관리자 연동 |
| 고객이 사는 것 | 드라이브 | 드라이브 + 공급 약정 | **워크로드에 검증된 TCO**(WAF·전력·QoS 보증) + 스택 통합 |
| 경쟁 대상 | HDD | HDD·TLC | **TLC 1~3 DWPD 드라이브, SLC AI SSD(SK hynix AI-N P·Kioxia 1억 IOPS), 고객 자체 SSD** |
| 삼성의 위치 | 후발(61TB 1년) | 물량 1위, 용량 후발 | 디바이스는 확보(PM1753 CMX), 워크로드·시스템 SW 연결은 공백 |

### 3.4 고객이 QLC를 원하는 이유 — 세 국면을 관통하는 불변과 변화

> 덱 3장을 잇는 축(2026-09-17 4차 피드백: "고객이 왜 QLC SSD를 원하는지에 대한 통찰이 빠져 있다"). 답은 하나다. **고객이 사는 것은 비트가 아니라 용량 계층(capacity tier)의 TB당 TCO** 다. 원가($/TB)·전력(W/TB)·밀도(TB/U)를 한 지표로 묶은 것이고, 쉽게 말해 계산 옆에 둔 가장 싼 바이트다. 그 계층이 읽기 전용 용량 계층에서 쓰기가 많은 추론 캐시로 옮겨가면서 **내구성이 문**이 됐다.

| 국면 | 고객 | 고객이 산 것 | 왜 QLC였나 | 조건(내구성) | 삼성 |
|---|---|---|---|---|---|
| 초기 2018~23 | 하이퍼스케일러(Meta·Google), CDN·오브젝트·어레이 벤더 | TB당 TCO(원가 · 랙 밀도) | 데이터셋 6배(2022→23), HDD는 용량이 늘어도 TB당 대역폭이 떨어져 10 MB/s/TB 대역을 못 채움 → 플래시 용량 계층(64~150TB, TLC 서버의 6배 바이트 밀도). 공급자는 1U에 1PB·5년 TCO -47%를 팔았다 ([qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §2.2·§2.3) | 읽기 중심이라 0.3~0.6 DWPD로 충분. 쓰기가 NAND 전력의 대부분이므로 읽기 중심 데이터를 QLC로 옮기면 전력도 준다 (같은 소스 §2.3) | 61TB 1년 후발 |
| 현재 2024~26 | AI 추론 서버 운영자, CSP | TB당 TCO(전력 · 공급 확보) | 추론 서버의 전력·공간이 병목 → 2024년 QLC eSSD 30EB(4배), 61→122→245TB 용량 경쟁 ([qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §2.1) | 여전히 읽기 중심 데이터가 QLC의 자리, 쓰기 티어는 TLC(0.3 랜덤/1.0 순차 스펙 분리) | 물량 1위(35.1%), 용량 후발 |
| 향후 2027~30 | LLM 서비스·플랫폼(OpenAI·Anthropic·Meta·NVIDIA 스택) | GPU당 컨텍스트 용량 · 토큰당 비용 | 장문맥·에이전틱 추론의 KV 캐시가 HBM·DRAM을 넘쳐 SSD로 내려오고, 프리필 재사용으로 GPU당 동시 사용자가 늘고 TTFT가 줄어든다(NVMe 오프로드로 H100 한 장이 동시 사용자 10배 주장). 2027년 75~100EB, 2030년 AI DC NAND의 35% ([kv-cache-ssd-offload-ecosystem-2026-08.md](../../sources/articles/kv-cache-ssd-offload-ecosystem-2026-08.md) §1, [kv-cache-ssd-demand-2026.md](../../sources/articles/kv-cache-ssd-demand-2026.md), [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §4) | **쓰기가 많은 캐시**라 오늘 이 티어는 TLC 1~3 DWPD가 서비스하고 CMX 타깃 드라이브도 전부 TLC. QLC 정격과 10~40배 갭 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.1·§3.3) | 디바이스 확보(PM1753 CMX), 시스템 연결 공백 |

**불변**: 세 국면 모두 구매 기준은 **TB당 TCO**였고 QLC는 그 기준에서 가장 싼 플래시였다. 강조점이 $/TB·TB/U → W/TB → GPU당 컨텍스트 용량(TB/GPU)·토큰당 비용으로 옮겨가도 고객이 사는 것은 같다.

**용어**(2026-09-17 5차 피드백): 덱·보고서는 "계산 옆의 가장 싼 바이트" 대신 공식 용어 **용량 계층의 TB당 TCO**를 쓴다. 초기·현재 국면의 단위는 TB당 TCO($/TB·W/TB·TB/U — Meta의 "capacity tier"·"byte density", Solidigm의 1U 1PB TCO 논거가 쓰는 단위), 향후 국면은 **GPU당 컨텍스트 용량·토큰당 비용**(NVIDIA의 context memory storage 프레임). 1장의 TCO는 드라이브·랙 단위이고 2·3장의 "TCO 보증"은 고객 시스템 단위다. 고객이 사던 TCO의 단위가 TB에서 시스템으로 올라간다는 것이 곧 이 전략의 스토리다.

**변화**: 가장 빨리 크는 용량 수요(KV cache)가 처음으로 **쓰기 많은 티어**에 있다. 고객은 여기서도 QLC의 경제성을 원하지만 내구성 때문에 TLC를 쓴다. 내구성은 미디어를 바꿔서가 아니라 **고객 시스템이 데이터를 어떻게 놓느냐**(배치 표준으로 수명이 다른 블록을 분리: CacheLib WAF 3.22→1.03, 사용률 50%에서도 1.22→1.03)로 풀리므로 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.2), QLC 벤더는 디바이스에서 고객 시스템 안까지 올라가야 한다. 이것이 [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)의 Phase 1·2·3과 [qlc-execution-strategy.md](../strategies/qlc-execution-strategy.md)의 FDE·SCA로 이어지는 논리다.

**덱 표기 원칙**(사용자 결정 2026-09-17): 니어라인 HDD 대체 여부는 발표 덱에서 다루지 않는다(§3.1의 범위 결정은 위키에 유지).

**현행 덱 = v7.5(7장, 2026-09-23).** 스토리 스파인은 ① 문제(왜 지금인가 — 교훈은 **양산 시점**이다: 2022년 H100의 HBM3 소켓을 가른 것은 규격이 아니라 양산 시점이었고 양사 공표 스펙은 6.4 Gbps·819 GB/s로 같았다, [hbm3-designin-lesson.md](hbm3-designin-lesson.md); 이어 **같은 구조가 SSD에서** — KV 캐시가 HBM 용량을 넘어 SSD를 추론 메모리 계층으로 올리고 그에 따라 고객 요구에 **내구성이 더해진다**([hbm-to-storage-spillover.md](hbm-to-storage-spillover.md), [essd-purchase-criteria-shift.md](essd-purchase-criteria-shift.md) — 요구는 교체가 아니라 **누적**); 끝은 **질문**이다 — 고용량 QLC의 밀도·비용 이점을 유지하면서 AI 추론이 요구하는 내구성을 확보할 수 있는가. 결론을 내리지 않는다) → ② 신뢰성([ssd-die-reliability-ppm.md](ssd-die-reliability-ppm.md)) → ③ 내구성([solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)) → ④ **배치 힌트**([fdp-placement-mechanics.md](fdp-placement-mechanics.md)) → ⑤ 역량([qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)) → ⑥ 실행([qlc-execution-strategy.md](../strategies/qlc-execution-strategy.md)) → ⑦ 대응 기술([waf-runtime-response.md](waf-runtime-response.md))이다. **1장 서술 규율(2026-09-23)**: ① 특정 회사의 내부 의사결정을 평가하지 않는다("시장을 작게 봤다"·"조직 축소"·"5년 공백" 전량 폐기). ② **창(窓)을 지킨다** — 2022년 결과는 2019~2023 사실로만 설명하고 HBM4·HBM3E 근거를 끌어오지 않는다. ③ **수율 숫자를 쓰지 않는다**(출처 간 정면 충돌). ④ QLC 정격은 **245TB급 헤드라인 0.3~0.6**으로 쓰고 두 제품이 측정 기준 미공개임을 병기한다. ⑤ TB당 가격차는 **방향성만**(20~30%는 산술적으로 불가능). 시각화 강화판(`qlc-ssd-strategy-visual.pptx` v2.0)은 v5.2 내용 기준으로 **동결**돼 있어 원본 덱과 다르다.

<details><summary>이전 덱 표기(v5.2, 6장) — 이력</summary>

덱 표기 원칙(2026-09-17): 니어라인 HDD 대체 여부는 발표 덱에서 다루지 않는다(§3.1의 범위 결정은 위키에 유지). 덱(v5.2, 6장, 2026-09-19 비판적 리뷰 반영 + 2·3장 순서 교체 + 제목 문단화)의 스토리 스파인은 ① 문제(왜 지금 필요한가 — §3.5 다운턴 교훈 + §3.4 요구의 이동; 격차는 동급 비교 2~10배로 표기, 사다리 소스 §10 F48; 문제 카드가 고용량화의 두 축 — 다이 8배 → 신뢰성 2장 · DWPD 격차 → 내구성 3장 — 을 세움) → ② 신뢰성(SSD 내부 해법 — 고용량화의 첫째 축; 다이 수·고장률은 다이 패리티·여분 다이·감량 운영·텔레메트리로 SSD 내부에서 대응, 소스 §9; 결론 "이 축은 SSD 내부에서 충족되지만 둘째 축 내구성(DWPD)은 SSD 내부에서 충족되지 않았다") → ③ 해법 사다리(왜 호스트인가 — 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고 잔여 변수 WAF는 호스트가 결정한다; [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md) §2.5; 호스트 배치는 "유일한 경로"가 아니라 다이 세대·OP·보증연수·SLC 캐시 등 병행 축과 결합하는 "잔여 변수", KV 캐시 FDP WAF는 미실측 가설 F52; 결론 "잔여 변수 WAF는 SSD 밖 호스트가 결정하므로 고객 협업과 새로운 역량이 필요하다") → ④ 역량(어떻게 해소하는가 — [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md), 삼성 현 위치는 Phase 1 진행 중으로 정직 표기) → ⑤ 실행(누구와 어디서 — [qlc-execution-strategy.md](../strategies/qlc-execution-strategy.md) 중 개발실 내부 범위: FDE는 워크로드를 여는 고객에 선별 집중, 자회사·별도 보상·결정 요청은 덱 범위 밖) → ⑥ 보증·SLA(무엇을 보증하나 — 유효 DWPD 보증의 워크로드 리스크와 텔레메트리 기반 조건부 보증 설계, 소스 §10 F53·F54)이다. 문제 제기 → 당위성 → 솔루션 → 실행의 순서로, 각 장의 결론이 다음 장의 질문이 되도록 리드·결론 밴드를 연결하고, 제목 6개만 이어 읽어도 한 문단이 되게 쓴다(v5.2 제목 문단: AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다. 첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다. 둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다. 따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다. 3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다. 유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다.). 비유 표현은 쓰지 않는다(지렛대 → 잔여 변수·격차 축소 변수, 닫힌다 → 충족·해소). 같은 스파인의 **시각화 강화판**(2026-09-20, `qlc-ssd-strategy-visual.pptx` 7장 = 요약 스토리 맵 + 1~6장)은 제목 문단과 수치를 그대로 두고 본문을 네이티브 도형(편집 가능)으로 다시 그려 텍스트를 원본의 50%로 줄였다(v2.0, 2026-09-22; 그림은 다이 픽토그램·RBER 스파크라인·유효 DWPD 곡선 4장만, 5장 실행은 두 트랙 화살표 그림). 또한 헤더 스토리 레일·다음 장 포인터·요약 체인으로 시각화한다(사용자 결정 2026-09-18: 비유·구어 표현은 보상·이관·격차·규격·진입·접근권 등 기술 용어로 통일).

</details>

### 3.5 다운턴이 가르친 것 — 세 교훈과 QLC 전략의 연결 (덱 1장 · v4.0에서 문제 제기와 한 장)

> 2026-09-18 6차 피드백: "배경이 이전 다운턴의 교훈에서 논리가 이어지면 좋겠다 — 고객 협업의 중요성과 QLC 같은 시장 요구를 센싱하는 측면에서." 위키의 다운턴 역사([downturn-history.md](../downturn/downturn-history.md) §4 패턴)와 2023 복기([fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §2.5)를 QLC 연혁에 겹치면 세 교훈이 나온다. **다운턴 극복은 방어가 아니라 니즈 적중이었고, 적중은 고객 안에서 먼저 본 쪽이 했다.**

| 교훈 | 역사(근거) | 지금의 등가물(QLC) | 덱 연결 |
|---|---|---|---|
| **1 센싱 — 수요는 주문서보다 2년 먼저 고객의 스펙·표준·코드에 나타난다** | DT23(2022Q2~2023Q3, 사상 최심 -45%)의 진앙은 eSSD였다(4Q22 eSSD 매출 -27.4%). 그 한복판에서 Meta·Google이 배치 표준을 비준(2022-12)하고 OCP E1.S/E1.L을 정했으며 Solidigm이 61TB를 예고했다. 물량은 2년 뒤(2024년 30EB, 4배)에 왔다 ([qlc-essd-history-2022-background-2026-09.md](../../sources/articles/qlc-essd-history-2022-background-2026-09.md) §2, [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §2.1). 하이퍼스케일러 CapEx는 붕괴가 아니라 재배분이었고(AI 서버 $50B→$187B), 총량만 본 쪽은 다운턴을 봤고 고객 스펙을 본 쪽은 다음 요구를 봤다 ([fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §2.5). DT23 교훈 ①(원인·형태 오판)의 제품 버전 | KV 캐시 관리자 4종(KVBM·LMCache·Mooncake·FlexKV) 코드에 배치·내구성 언급 0건 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §2·§4). 요구가 아직 안 쓰였다 = 지금 들어가면 우리가 쓴다. 센싱 전략 [rs9-demand-inflection-sensing.md](../strategies/invariant/rs9-demand-inflection-sensing.md)의 인과 사슬에서 **가장 앞 노드는 고객 코드**다 | 2장(고객은 왜 QLC를 원하는가) |
| **2 고객 협업 — 요구를 정의하는 자리에 있던 쪽이 적중했다** | Solidigm은 SK그룹에서 낙폭이 가장 깊었지만 2023-07 61TB QLC를 삼성보다 12개월 먼저 내(삼성 BM1743 2024-07) 2024년 eSSD 급증의 최대 수혜로 흑자 전환했다 — "포트폴리오 다변화(방어)가 아니라 고객 니즈 적중(공격)이 결정 변수"([fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §2.5). HBM은 NVIDIA와 규격을 공동 정의한 SK hynix가 가져갔다([sk-hynix.md](../entities/sk-hynix.md) 핵심 교훈 1). 송용호: "부품이 어떻게 쓰일지는 시스템 설계자 마음에 있다. 그걸 알았으면 HBM을 진작 준비했을 것" | 캐시 티어의 내구성 요구는 미디어가 아니라 고객 시스템(배치 표준·캐시 관리자 정책)에서 정의된다. 정의하는 자리(캐시 관리자 메인라인·SNIA/OCP·NVIDIA CMX 공동 정의)에 들어가야 한다 | 3장(세 단계), 4장(FDE·SCA) |
| **3 타이밍 — 한 다운턴의 결정이 다음 다운턴의 출발 조건이 된다** | 20년 패턴 5: DT19 무감산 성공 → DT23 무감산 오판, DT19 HBM 팀 축소 → DT23 회복기 주도권 상실, DT16 칭화유니 무산 → CXMT ([downturn-history.md](../downturn/downturn-history.md) §4). 삼성 스토리지 사업사: 캐파 베팅은 수요를 만드는 솔루션과 짝이어야 성립했고(2006 SSD), 다운턴에 핵심으로 재배치한 쪽이 이겼다(2011 HDD 매각) ([samsung-storage-solution-history.md](samsung-storage-solution-history.md) §2·§4). 전환기 플레이북: 수요 폭발 3~5년 전 전용 캐파 베팅·인터페이스 세대 선점, 단 "규격을 만들고도 제품화가 늦으면 진다"(Intel) ([ssd-ufs-market.md](ssd-ufs-market.md) 전환기 플레이북) | 다음 심판대는 2027년 하반기 가격 정상화(TrendForce 2H27 공급 완화). 비트 10배에 매출이 정체하면(§4 모델) 남는 이익은 고객 시스템 안에서 보증한 TCO뿐이므로, 지금 고객 안에 들어가는 결정이 그 국면의 출발 조건이다 | 4장(지금 들어가는 결정) |

**서술 원칙**: 삼성 자신의 후발(61TB 12개월, HBM)이 핵심 사례이므로 비난이 아니라 "직전 성공 공식이 다음 다운턴의 함정이 된다"는 **패턴**으로 서술한다([downturn-history.md](../downturn/downturn-history.md) §4 패턴 5). 덱 1장은 두 다운턴 구간을 음영으로 한 타임라인 위에 QLC 이정표(배치 표준 비준·61TB·30EB·캐시 관리자 0건·2027H2 심판대·2030 비트 10배)와 3기 띠를 얹고, 교훈 카드 3(역사 → 지금 → 이 덱의 장)으로 나머지 세 장을 예고한다.

## 4. 수요·매출 모델 (2022~2030)

### 4.1 모델 표 (그래프 미러: `outputs/presentation/assets/qlc_model.csv`)

| 연도 | 구분 | 전체 eSSD(EB) | QLC eSSD(EB) | QLC 비중 | eSSD 매출($B) | eSSD ASP($/TB) | QLC $/TB | QLC 매출($B) 기준선 | QLC 매출 상단 | KV cache NAND 수요(EB, 전 미디어) | 그중 QLC(EB) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2022 | 실측·추정 | 155 | 6 | 4% | 21.9 ✅ | 141 | 120 | 0.7 | 0.7 | 0 | 0 |
| 2023 | 실측·추정 | 115 | 7.5 | 6.5% | 7.0 ⚠️ | 61 | 52 | 0.4 | 0.4 | 0 | 0 |
| 2024 | 실측·추정 | 210 | **30 ✅** | 14% | 24 ⚠️ | 114 | 97 | 2.9 | 2.9 | 0 | 0 |
| 2025 | 실측·추정 | 265 | 53 | 20% | 26.5 🟡 | 100 | 85 | 4.5 | 4.5 | 0 | 0 |
| 2026 | 전망(e) | 340 (~390) | 102 (~120) | 30% (26~34) | 125 (1H 56 ✅) | 368 | 313 | 32 | 36 | 35 | 2 |
| 2027 | 전망(e) | 450 (~565) | 167 (~210) | 37% (32~42) | 99 | 220 | 187 | 31 | 50 | 90 | 9 |
| 2028 | 전망(e) | 600 (~825) | 264 (~340) | 44% (38~50) | 72 | 120 | 102 | 27 | 56 | 175 | 44 |
| 2029 | 전망(e) | 780 (~1,050) | 390 (~500) | 50% (43~56) | 74 | 95 | 81 | 32 | 60 | 260 | 104 |
| 2030 | 전망(e) | 1,000 (~1,300) | 550 (~720) | 55% (47~62) | 80 | 80 | 68 | 37 | 65 | 350 | 175 |

괄호는 상단 밴드. ✅는 TrendForce 실측(연 합산), ⚠️는 분기 QoQ 역산, 🟡는 검색 인용. 2026 이후 전 셀 추정(e).

![QLC eSSD 수요·비중·매출 통합 그래프](../../outputs/presentation/assets/qlc_demand_share_revenue.png)

### 4.2 독해

1. **비트는 10배, 매출은 정체.** QLC eSSD 비트는 2025년 53EB에서 2030년 550EB로 10배 늘지만, 2027년 하반기 이후 가격이 정상화되면 QLC 매출은 2026년 $32B 수준에서 $27~37B 사이를 오간다. 쇼티지 가격이 이어지는 상단에서도 $65B다. **비트 성장이 곧 이익 성장이 아니다.** 이익은 TB당 가격이 아니라 시스템 위에서 보증하는 TCO(WAF·전력·QoS)로 결정된다는 것이 모델의 첫 함의다.
2. **QLC는 2028년경 eSSD 비트의 절반에 다가선다.** 2024년 14%(30EB/210EB)에서 2026년 30%, 2030년 55%. 근거는 2026년 "출하 급증" 전망, 삼성 QLC 비트 2H26 2배, 5사 2Tb QLC 양산, Meta의 용량 계층 설계(QLC 서버 바이트 밀도 TLC의 6배)다.
3. **추론 캐시 티어는 조건부 상방이다.** KV cache NAND 수요 350EB(2030)의 절반을 QLC가 가져가는 경로(175EB)는 호스트 협력 배치와 시스템 SW가 성립할 때만 열린다. 성립하지 않으면 이 175EB는 TLC·SLC로 간다. 그래프의 진한 파랑이 이 조건부 영역이다.
4. **가격 밴드가 전략의 시계를 정한다.** 공급자 우위(협상력)는 2027년 하반기 공급 완화 전까지다. 고객에게 워크로드·스펙 접근권을 요구할 수 있는 창이 그때 닫힌다.

### 4.3 가정표 (재현용)

| 항목 | 가정 | 근거 |
|---|---|---|
| 전체 eSSD EB 2022~2025 | TrendForce 연 매출 ÷ 추정 ASP(2022 $141, 2023 $61, 2024 $114, 2025 $100/TB) | 매출은 [qlc-essd-market-size-forecast-data-2026-09.md](../../sources/articles/qlc-essd-market-size-forecast-data-2026-09.md) §1.3, ASP는 VDURA 30TB 인덱스(3Q25 $102~115)와 컨슈머 $/TB 방향 프록시(§3.2~3.3). 2025년 265EB는 Intel MR 수치와 일치 |
| 전체 eSSD EB 2026~2030 | 연 +28~30%(기준선), 상단은 TechInsights DC NAND 295→909EB(CAGR 46%)의 90% | 같은 소스 §2.1(Micron NAND 비트 +20%, 서버 >40%, Kioxia IR) |
| QLC 비중 | 2024년 14%(30EB 앵커 ÷ 210EB) → 2026년 30% → 2030년 55%, 밴드 ±4~7pt | 같은 소스 §2.3 삼각측량, 벤더 정성 신호 |
| eSSD ASP 기준선 | 2026 $368(1H 실측 $56B ÷ 추정 150EB 연장) → 2027 $220 → 2028 $120 → 2029 $95 → 2030 $80 | 2H27 공급 완화(TrendForce 2026-07-30), 4Q27 가격 개선 신호(Counterpoint), 2Tb QLC 원가 곡선 |
| 쇼티지 상단 ASP | 2027 $350, 2028 $250, 2029 $180, 2030 $140 | 2028년까지 NAND 쇼티지 지속 시나리오 |
| QLC $/TB | eSSD ASP × 0.85 | QLC 할인폭 13~20%(VDURA) |
| KV cache NAND 수요 | 2026 35EB(CMX 공급망) → 2027 90 → 2028 175 → 2029 260 → 2030 350EB(AI DC NAND 1,000EB × 35%) | SanDisk FMS 2026·Investor Day, CMX 공급망 보도 |
| QLC의 KV 티어 침투 | 2026 5% → 2027 10% → 2028 25% → 2029 40% → 2030 50% | 조건부: 배치 핸들 16+ 공개 디바이스 + 캐시 관리자 연동 + WAF 급등 런타임 대응 성립 시. 미성립 시 0~10% |

**민감도**: QLC 비중이 2030년 47%(하단)면 QLC EB 470, 매출 기준선 $32B. 가격 정상화가 1년 늦으면 2028년 매출이 $27B → $45B. 추론 캐시 침투가 0이면 2030년 QLC EB 375, 비중 38%.

### 4.4 삼성 몫 시나리오 (부록 성격, 사내 확인 필요)

삼성 eSSD 매출 점유 35~38%(1Q~2Q26)를 QLC에 그대로 적용할 수 없다. 용량 리더십이 후발이라 QLC 점유는 그보다 낮다고 보는 것이 보수적이다. 가정 `[사내 확인]`: 2026년 QLC 점유 25% → 2030년 35%(추론 캐시 티어 40%). 이 경우 2030년 삼성 QLC 매출은 기준선 $13B, 상단 $23B, 추론 캐시 티어 QLC 70EB. 점유 5pt는 2030년 기준 약 $2B(기준선)에 해당한다.

## 5. 리스크와 반대 신호

- **KV cache 압축**: DeepSeek V4.1-Flash(2026-09-10)는 토큰당 KV를 줄여 SSD 풋프린트를 8분의 1로 낮췄다고 보도됐다. 모델 측 압축이 총량을 줄일 수 있다 ([kv-cache-qlc-tech-stack-vendor-capability-2026-09.md](../../sources/articles/kv-cache-qlc-tech-stack-vendor-capability-2026-09.md) §3.3). 다만 같은 기간 컨텍스트 길이와 에이전트 세션 수가 늘어 총량 방향은 상방이라는 것이 SanDisk·Kioxia 전망이다.
- **상단이 SLC로 갈 수 있다**: SK hynix AI-N P(SLC, NVIDIA 공동), Kioxia 1억 IOPS SSD(2027)는 캐시 티어의 상단을 SLC로 끌어올린다. QLC의 자리는 캐시 티어의 "대용량·긴 수명 블록" 구간이며, 전 구간을 노리는 전략이 아니다.
- **플랫폼 힌트 매핑 미확인**: NVIDIA DOCA Memos의 배치·수명 힌트가 NVMe 배치 표준으로 내려오는지 확인되지 않았다. 내려오지 않으면 CMX 위의 QLC는 자체 텔레메트리와 호스트 라이브러리로 수명을 분리해야 한다 (같은 소스 §5).
- **배치 효과의 조건부성**: RUH 오분류·noisy RUH에서 효과가 붕괴한다(FAST'26 WARP). 워크로드 이해 없는 배치 표준 지원은 "여러 공급사 중 하나"로 회귀한다 ([fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md) §3).
- **가격 정상화 시점**: 모델의 매출 정체는 2H27 정상화 가정에서 나온다. 늦어지면 상단 밴드, 빨라지면 기준선 아래다.

## 6. 연결

- 역량·기술 전략: [qlc-workload-capability-phases.md](../strategies/qlc-workload-capability-phases.md)
- 실행 전략·고객 협업: [qlc-execution-strategy.md](../strategies/qlc-execution-strategy.md)
- 선행 전략: [fdp-host-ssd-platform.md](../strategies/fdp-host-ssd-platform.md)(자매편), [dev-org-transformation.md](../strategies/dev-org-transformation.md)
- 시장 맥락: [ssd-ufs-market.md](ssd-ufs-market.md), [nand-process-transition.md](nand-process-transition.md), [nvidia-cmx-scada.md](../entities/nvidia-cmx-scada.md)
- 시나리오 연결: B(AI 르네상스)에서 추론 캐시 티어가 최대로 열리고, C·D(AI 조정)에서는 QLC 비중 상승 자체는 유지되나 KV 티어 침투가 지연된다 ([scenario-matrix.md](../scenarios/scenario-matrix.md))
