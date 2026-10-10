---
type: concept
last_reviewed: 2026-10-06
sources:
  - sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md
  - sources/raw-notes/user-mixed-media-hyperscaler-analysis-2026-10-03.md
  - sources/articles/ssd-mixed-media-infra-reuse-2026-10.md
  - sources/articles/wcssd-v1-high-dwpd-configurable-2026-09.md
---

# Mixed Media SSD: QLC 드라이브의 일부를 SLC·TLC로 쓰게 해 기존 인프라를 그대로 활용한다

**Mixed Media SSD**는 QLC로 출하하되 용량의 일부를 SLC(또는 TLC) 모드 영역으로 쓸 수 있게 한 드라이브다. 고객은 별도의 캐시 · 고내구 드라이브를 추가하지 않고 **기존 서버 슬롯 · 전력 · 냉각 안에서** 빠른 영역과 큰 영역을 함께 얻는다. 구성 시점의 경계는 [ssd-configurability-boundary.md](ssd-configurability-boundary.md), SLC 모드 P/E와 비용 비율은 [high-dwpd-operating-point.md](high-dwpd-operating-point.md)에 있다.

> 출처 원장은 [ssd-mixed-media-infra-reuse-2026-10.md](../../sources/articles/ssd-mixed-media-infra-reuse-2026-10.md)(이하 **원장**)다. ✅는 Microsoft IR · Google Cloud 블로그 · GitHub(SPDK · libnvme · nvme-cli · Linux · QEMU) 원문에만 붙었다.

## 0. 재정의 (2026-10-03): 캐시가 아니라 "두 영역에 호스트가 직접 배치"하는 드라이브 (협력 깊이는 2026-10-06 "스펙으로 협력"으로 정정, §0.4)

사용자 분석([원본 메모](../../sources/raw-notes/user-mixed-media-hyperscaler-analysis-2026-10-03.md))과 검증 원장 [ssd-mixed-media-hyperscaler-logic-2026-10.md](../../sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md)(MX)에 따라 논지를 고쳐 쓴다. **핵심은 "QLC에 캐시를 붙여 성능을 높인다"가 아니라, 한 SSD 안에서 고성능 · 고내구 영역(pSLC)과 초고용량 · 저비용 영역(QLC)을 별도 네임스페이스로 나누고 고객 소프트웨어가 데이터 종류에 따라 직접 배치하는 것**이다.

### 0.1 왜: 데이터센터 쓰기에는 두 종류가 섞여 있다

| 데이터 특성 | 예 | 맞는 매체 | 근거 |
|---|---|---|---|
| 작은 랜덤 쓰기, 잦은 갱신 | WAL · 저널 · 메타데이터 · 인덱스 | pSLC | Alibaba · Tencent 블록 스토리지 볼륨의 **91.5% · 92.3%가 쓰기 우세**, Alibaba 쓰기의 **75%가 16KiB 이하** (MX-60~MX-62 🟡) |
| 지연에 민감한 쓰기 | GC 메타데이터 · 쓰기 버퍼 | pSLC | Kioxia "Different IO flows drive customer needs: small random vs large sequential writes, metadata vs user data" (MX-01 🟡) |
| 큰 순차 쓰기 · 읽기 위주 | 객체 · Blob · AI 데이터셋 · 모델 | QLC | Solidigm: QLC는 AI/ML 데이터 레이크 · CDN, caching · logging · journaling은 SLC급(MX-14 🟡) |

**반증 주의**: KV 캐시 오프로드는 128KiB 요청 · 읽기 지배(읽기 2.0GiB/s 대 쓰기 11MiB/s), 체크포인트는 큰 쓰기 버스트다. "KV 캐시 · 체크포인트 = 작은 핫 쓰기 → pSLC"라는 분류는 공개 데이터와 맞지 않는다(MX-77 · X-01 · DT-20). AI 데이터 중 pSLC 후보는 메타데이터 · 인덱스 · 로그다.

### 0.2 메커니즘: pSLC의 가치는 내구성보다 "QLC에 들어가는 쓰기의 모양을 바꾸는 것"

- QLC는 매핑 단위(IU)가 커서(16~64KB) 4KB 랜덤 쓰기가 들어오면 읽기-수정-쓰기와 GC가 겹친다. IU 산술 하한만 64KB IU에서 16배, 16KB IU에서 4배다(MX-21 ⚠️ 파생). Kioxia: "Random IO performance is the driving factor for Mixed Mode", "IU size only matters for random write"(MX-03 🟡).
- **작은 쓰기를 빠른 계층에 모았다가 큰 순차 쓰기로 QLC에 내리면 WAF가 크게 준다**: CSAL 백서 "4KB 랜덤 쓰기 WAF가 70 이상에서 1.02로"(MX-11 🟡, 단일 요약). 단 이 수치는 **별도 캐시 드라이브(Optane) + QLC 드라이브를 호스트 FTL로 묶은 구성**이고, WAF를 SMART 호스트 기록 기준으로 셌을 수 있다(MX-17). 한 드라이브 안의 실측은 아직 없다.
- 꼬리 지연: QLC 프로그램 2~3ms 대 SLC 50~220µs, Alibaba FAST'26에서 GC로 p99.9 > 1ms(✅), CSAL 포화 4K 쓰기 예시 p99 4.0ms · p99.99 501ms(✅ 예시 출력). 한 혼합 드라이브의 p99.9 이상 실측은 공개되지 않았다(MX-30~MX-37).

### 0.3 경제성: pSLC는 작게, 비율은 고객이 정한다

- QLC 셀을 pSLC로 쓰면 비트가 1/4(실제 전환비 5 : 1, DapuStor). **Kioxia가 받은 고객 요구(VoC)는 "pSLC = 최대 QLC 용량의 0.5~2%"**(MX-01 🟡). 이때 사용자 용량 손실은 (k − 1) × p = 약 1.5~8%(k = 4~5, MX-41 ⚠️). Kioxia 구성 예시 1:8 · 1:4 · 1:2(pSLC : QLC)는 손실이 25% 이상이라 "1:4가 좋은 출발, 1:2는 이점 제한"(MX-42 🟡).
- **슬롯 비용(Slot Tax)**: Kioxia Klemm "SLC SSD가 드라이브 슬롯을 통째로 차지해 전체 용량을 줄인다", 혼합 모드로 FRU 감소 · PCIe 레인 균형(MX-02 🟡). 예: TLC 2 + QLC 8 → 혼합 8이면 슬롯 2개 절약, 대신 pSLC 1%면 QLC 용량 4~5%, TLC 용량만큼이면 12.5~15.6%를 낸다(MX-54 ⚠️ 산술). 하이퍼스케일러 · 벤더의 혼합 대 분리 TCO 수치는 여전히 없다(EC-11).
- 가장 가까운 선례: Pure FlashArray//XL이 전용 NVRAM 슬롯 2~4개를 없애고 NVRAM을 플래시 모듈에 분산(MX-52 🟡).

### 0.4 고객 협력의 깊이 (2026-10-03 "고객 협력 과제" → 2026-10-06 **"스펙으로 협력"으로 정정** → 2026-10-10 **"② 최적화까지 함께"로 재분류**)

> **재분류 (2026-10-10, 사용자 지시 "고객 협력을 고객 시스템 개발 · 최적화까지 함께 두 단계로")**: 고객 협력을 ① 고객 시스템 개발 · ② 최적화까지 함께로 나누면 Mixed Media는 **②**다. 아래 논거 2(pSLC 비율은 배치마다 고객 워크로드로 정함, 크면 $/TB 손실 · 작으면 넘침)가 출하 전에 고객 워크로드를 보고 함께 정해야 하는 최적화이기 때문이다. 다만 변수가 적어 배치당 한 번 맞추면 되므로 FDP(반복 튜닝, 중장기)보다 얕고 단기 실행 가능하다. 상세 [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3.5.

> **정정 (2026-10-06, 사용자 지적)**: "기능을 지원하는 SSD를 제공하면 고객이 입맛에 맞게 쓰면 되는 것 아닌가. 고객 시스템에 함께 디자인되어야 해도 스펙을 명확히 정하면 tightly coupled 협력은 필요 없을 수 있다." 다시 따져 보면 아래 1~2는 **고객 시스템과의 결합**을 보여 줄 뿐, **스펙으로 분리할 수 없다**는 근거는 아니다. 인터페이스는 표준 네임스페이스이고, pSLC 비율은 출하 시 정하는 값이며 고객이 이미 수치로 요구하고(VoC 0.5~2%), 네임스페이스 간 QoS는 목표 수치로 사내 검증할 수 있다. 그래서 Mixed Media는 **"스펙으로 협력"**(결합도 2 · 스펙 비완결도 1)으로 둔다. 공동 설계가 필수인 것은 3의 **QLC 네임스페이스에 FDP를 결합하는 부분**이며, 그것은 FDP의 범위다. 판단 기준: [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3.

아래는 2026-10-03의 논거이며, 결합의 근거로는 유효하다.


1. **배치 결정이 고객 소프트웨어에 있다**: 어떤 쓰기가 WAL · 메타데이터인지는 호스트만 안다. 상용 혼합 매체는 예외 없이 호스트 소프트웨어가 매체를 묶었다(CD-01: CSAL · RST · VAST · Colossus). Kioxia · DapuStor도 "보이지 않는 캐시가 아니라 호스트가 주소를 지정하는 영역"(네임스페이스)으로 발표했다(MM-06 · CD-04).
2. **pSLC 비율은 고객 워크로드로 정한다**: Kioxia "배치별 맞춤 비율", VoC 0.5~2%(MX-01 · MX-75). 비율이 크면 QLC $/TB를 잃고, 작으면 지속 쓰기에서 넘친다.
3. **QLC 영역의 GC는 수명 정보로 줄인다**: QLC 네임스페이스에 FDP 배치 핸들(수명별 RUH)을 쓰면 pSLC가 쓰기 충격을 흡수하고 FDP가 QLC 내부 GC를 줄이는 분업이 된다. 이 결합은 Kioxia 출처로는 확인되지 않았고 Solidigm CSAL(시스템 수준)의 FDP 구현 계획에서 나온다(MX-12 · ST-12).
4. **한계**: 하이퍼스케일러가 pSLC 네임스페이스를 요구했다는 공개 기록은 없다(NG-01, U-12 미확인).

### 0.5 SSD 안에서 준비할 기술 (컨트롤러 경쟁점, ⚠️ 전망)

| 기술 | 내용 |
|---|---|
| pSLC → QLC destage 정책 | 작은 쓰기를 모아 IU · 슈퍼블록 단위 순차 쓰기로, 유휴 시간 활용 |
| 네임스페이스별 QoS 격리 | pSLC NS 지연이 QLC NS의 GC · destage에 흔들리지 않게(다이 수준 격리, DapuStor F-43) |
| GC 간섭 차단 · 자원 예약 | 토큰 · 다이 · 채널 예약으로 p99.9 이상 꼬리 지연 억제 |
| FDP 연동 | QLC NS의 RUH와 destage 스트림 정렬 |
| pSLC 크기 결정 · 텔레메트리 | 영역별 마모 · 넘침 · destage 지연 지표를 호스트에 노출 |

### 0.6 사용자 분석의 출처 귀속 정정

| 사용자 분석 문구 | 검증 결과 |
|---|---|
| "Kioxia가 2026년 9월 공개한 mixed-media SSD" | 부분 확인: Kioxia 발표는 FMS 2025(2025-08) · FMS 2026(2026-08). 2026-09 공개물은 찾지 못함 |
| "Kioxia 예시 pSLC 약 1~6%" | 미확인: Kioxia 수치는 VoC 0.5~2%, 구성 비 1:8 · 1:4 · 1:2 |
| "Kioxia가 mixed media + FDP 결합을 설명" | 미확인: 결합은 Solidigm CSAL(시스템 수준) 쪽 |
| "Solidigm: 쓰기를 모아 QLC WAF ≈ 1" | 확인(🟡), 단 별도 드라이브 구성 |

## 1. 수요 논지와 근거의 범위

**논지**: 하이퍼스케일러는 기존 데이터센터와 인프라를 최대한 오래 쓰고 싶어 한다. 스케일 업보다 스케일 아웃을 선호하는 것도 같은 맥락이다. 그렇다면 한 드라이브 안에서 빠른 영역과 큰 영역을 함께 제공하는 제품이 기존 인프라 활용에 맞는다.

**공개 근거로 뒷받침되는 것**

| 근거 | 내용 | 등급 |
|---|---|---|
| 자산을 더 오래 쓴다 | 범용 서버 내용연수: Microsoft 4 → 6년(2022, 사유 "소프트웨어로 운영 효율"), Alphabet 4 → 6년(2023), Meta 4 → 5.5년(2025), Amazon 3 → 6년(2024). **데이터센터 건물은 Microsoft가 15 → 25년(FY27)** | ✅ Microsoft · 🟡 나머지 (원장 IR-01~IR-09) |
| 기존 홀을 개조해 쓴다 | Google Brazos(기존 공랭 홀에 랙 단위 액체냉각, 2026-06 일반 공급), Meta AALC(기존 홀 설계 그대로), AWS IRHX(기존 구성 안에서 동작), Microsoft "모든 Azure 리전이 액체냉각 지원 = 플릿의 fungibility" | ✅ / 🟡 (IR-10~IR-19) |
| 재사용을 설계 원칙으로 | Google "세대를 넘어 인프라를 재사용하는 fungible 데이터센터"(2025-10), 모듈성 · 표준 인터페이스 | ✅ (IR-16) |
| 스토리지는 스케일 아웃, 매체 혼합은 소프트웨어가 | Google Colossus는 HDD와 SSD를 섞고 "I/O 밀도를 맞출 만큼만 플래시를 산다". 어떤 데이터를 SSD에 얼마나 둘지는 클러스터 소프트웨어(L4)가 정한다. Meta Tectonic도 HDD · 플래시 티어링 | ✅ (IR-30~IR-34) |
| 현장 대부분은 여전히 범용 랙 | 최빈 랙 밀도 11kW, "CPU 기반 워크로드가 설치 용량의 대부분"(Uptime 2026) | 🟡 (IR-21) |

**뒷받침되지 않는 것 (정직하게 둔다)**

- 하이퍼스케일러가 "인프라 재사용 때문에 **한 드라이브 안의 혼합 매체**를 원한다"고 말한 공개 기록은 **없다**(원장 NG-01). 지금 하이퍼스케일러의 혼합 매체는 모두 **시스템 수준**(서버 · 드라이브는 매체별로 나뉘고 소프트웨어가 묶음)이다.
- 반대 방향도 있다: 컴퓨트는 랙 스케일 scale-up(NVL72 등)과 신규 캠퍼스로 가고, Amazon은 AI · ML 서버 일부의 내용연수를 6 → 5년으로 줄였다(🟡). Sandisk UltraQLC는 SLC 버퍼를 아예 없앴다(🟡).

→ 따라서 Mixed Media는 **고객과 함께 가치를 검증해야 하는 가설형 기술**이다. 이것이 공동 설계가 필요한 첫째 이유다. (2026-10-03: §0.4에 따라 전략 분류를 "고객 시스템과 함께"로 옮겼다.) (2026-10-06 정정: 가치 검증은 고객 워크로드가 필요하지만, 제품 요구는 표준 네임스페이스 · 비율 · QoS 목표의 스펙으로 닫힌다 → "스펙으로 협력", §0.4)

## 2. 지금 있는 것: 장치 수준과 시스템 수준

| 대상 | 수준 | 매체 조합 | 노출 방식 | 상태 | 호스트 SW |
|---|---|---|---|---|---|
| DapuStor J5060 dual-mode | 장치 | pSLC 400GB~1.2TB + QLC (QLC 용량의 6~20% 소모) | 별도 블록 디바이스 | 발표(2026) | 표준 블록 I/O |
| Kioxia Mixed Mode SSD | 장치 | SLC 네임스페이스 + QLC 네임스페이스, 배치별 비율 | 네임스페이스 2개 | 발표(FMS 2025 · 2026) | 데이터 유형별로 호스트가 보냄 |
| Micron 4150AT (차량용) | 장치 | TLC / SLC(20×) / HE-SLC(50×) 엔듀런스 그룹 | 엔듀런스 그룹 + 네임스페이스 | 샘플(2024-04) | 미확인 |
| Intel Optane H10/H20 | 장치(이종 매체) | Optane + QLC (3~6%) | NVMe 장치 2개 | 단종 | **필수(RST)** |
| Solidigm CSAL | 시스템 | SLC/TLC 캐시 SSD + QLC SSD | 호스트 FTL(SPDK, 오픈소스) | Alibaba 상용 | **필수** |
| VAST Data | 시스템 | SCM + QLC (0.5~2.7%) | 별도 드라이브 | 상용 | **필수** |
| Google Colossus L4 | 시스템 | SSD 서버 + HDD 서버 | 별도 서버 | 상용 | **필수** |

(원장 §2, 비율은 ⚠️ 파생) **삼성의 호스트 가시 pSLC/TLC 영역 제품은 공개 자료에서 찾지 못했다**(NG-02). **QLC의 일부를 TLC 모드로 노출한 제품도 없다**(NG-03) → TLC 영역은 차별화 후보다.

## 3. 경제성: 슬롯과 비트의 교환

- **비트 비용**: QLC 다이를 SLC로 쓰면 비트 1/4, TLC로 쓰면 3/4. 실제 전환비는 더 불리해 DapuStor는 QLC 약 4TB로 pSLC 800GB를 만든다(5 : 1) (원장 EC-01 · EC-02).
- **슬롯 이득**: 24베이 서버를 800GB pSLC 영역이 있는 드라이브로 채우면 **추가 슬롯 0개로 pSLC 19.2TB**를 얻는다. 같은 용량을 단품 SLC SSD로 얻으려면 800GB 24슬롯 또는 1.6TB 12슬롯이 필요하다(⚠️ 산술, EC-08). 기존 서버를 바꾸지 않고 빠른 계층을 더하는 길이다.
- **비교 불가 항목**: pSLC의 GB당 기회비용(약 $2.4~3.0/GB)과 단품 SLC SSD 소매가($2.8~3.3/GB)는 채널이 달라 우열을 말할 수 없다(EC-07). 단일 혼합 드라이브 대 별도 티어의 TCO 수치는 공개 자료가 없다(EC-11).

## 4. SSD 안에서 준비할 기술

| 요소 | 내용 | 근거 |
|---|---|---|
| 영역 구성 | 매체 모드별로 엔듀런스 그룹(또는 NVM Set)을 나누고 네임스페이스를 붙인다. 비율은 **출하 시 구성**으로 고객이 고른다 | NVMe EG · NVM Set · Capacity Management ✅. 영역 크기의 사후 변경은 어렵다(SEF 할당 후 변경 불가, DapuStor 영역 고정) |
| 다이 수준 격리 | SLC 영역과 QLC 영역의 간섭을 막는 다이 배치 · 스케줄링 | DapuStor가 다이 수준 격리 · 영역 인지 스케줄링을 명시 🟡 |
| 영역별 마모 · 보증 회계 | 영역마다 Percentage Used · Endurance Estimate를 따로 보고하고 영역별 TBW를 보증 | 표준 그릇은 있음(EG별 로그, 미디어 유닛별 로그) ✅. **영역별 TBW 보증 데이터시트 선례는 없음** → 차별화 자리 |
| TLC 모드 영역 | pSLC보다 용량 손실이 작은 중간 내구 영역 | 공개 제품 없음(NG-03) |
| 시스템 영역 활용 | 메타데이터 · 쓰기 버퍼를 SLC 영역에 | OCP C0h가 사용자/시스템 영역 마모를 따로 셈 ✅ |

## 5. 고객과 함께하면 커지는 효과 (스펙 협력 의제, 2026-10-06 정정)

> 아래 과제는 고객 요구를 스펙(비율 · 네임스페이스 배치 원칙 · QoS 목표)으로 받는 협력 의제다. 결과가 양쪽 정책의 반복 튜닝에 달린 공동 설계 필수 항목은 QLC 네임스페이스의 FDP 결합뿐이며, FDP 범위로 다룬다([ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3).

**상용화된 혼합 매체 사례는 예외 없이 호스트 소프트웨어가 매체를 묶는다**(CSAL = SPDK 호스트 FTL, Optane H10 = RST 드라이버, VAST = DASE, Colossus = L4) (원장 CD-01). 어떤 데이터를 빠른 영역에 둘지는 애플리케이션 정보(파일 유형 · DB 메타데이터 · 데이터 수명)가 있어야 정할 수 있기 때문이다(Colossus L4는 애플리케이션 feature로 "SSD에 1시간 / 2시간 / 안 둠"을 고른다 ✅).

| 공동 설계 과제 | 내용 |
|---|---|
| 영역 비율 맞추기 | 고객 워크로드의 hot 데이터 비율로 SLC : QLC 비율을 고른다(Kioxia "배치별 맞춤 비율") |
| 보이는 빠른 계층 | 보이지 않는 쓰기 캐시가 아니라 **호스트가 직접 주소 지정하는 영역**으로 쓴다(DapuStor "invisible write cache 대신") |
| 호스트 티어링 소프트웨어 | CSAL(오픈소스 SPDK FTL)처럼 호스트 계층이 SLC 영역 = 쓰기 버퍼 · 메타데이터, QLC 영역 = 용량으로 묶는다 |
| 배치 정보와 연결 | FDP RUH 서술자에는 **매체 유형 필드가 없다** ✅ → 지금 표준 경로에서 SLC 영역은 "별도 엔듀런스 그룹의 네임스페이스"다(Linux는 네임스페이스별 ENDGID로 FDP 구성을 읽는다 ✅) |

**규격 제안 자리**: ① FDP 배치 핸들에 매체 속성 ② NVMe 2.3 Configurable Device Personality에 매체 모드 퍼스낼리티(현재 정의는 보안 · 잠금 · 초기화뿐 ✅) ③ 엔듀런스 그룹별 보증 표기.

## 6. 쓰면 안 되는 문장

| 쓰면 안 되는 문장 | 이유 |
|---|---|
| "하이퍼스케일러가 인프라 재사용을 위해 혼합 매체 SSD를 요구한다" | 그런 연결 진술은 없다. 두 근거는 각각 있을 뿐이다 |
| "스토리지 서버는 기존 공랭 홀에 남는다" | 명시 진술이 없다 |
| "pSLC 영역이 단품 SLC SSD보다 싸다 / 비싸다" | 채널이 달라 비교할 수 없다 |
| "NVMe CDP로 SLC/QLC 모드를 바꿀 수 있다" | 정의된 퍼스낼리티에 매체 모드가 없다 |
| "FDP로 SLC 영역을 지정한다" | RUH에 매체 필드가 없다 |

## 7. 연결

- 같은 기술 포트폴리오의 다른 두 축: [high-dwpd-operating-point.md](high-dwpd-operating-point.md) · [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md)
- 구성 시점의 경계: [ssd-configurability-boundary.md](ssd-configurability-boundary.md)
- 배치 정보의 원리: [fdp-placement-mechanics.md](fdp-placement-mechanics.md)
- QLC 시장 · 중간 계층으로서의 QLC(Meta): [qlc-ssd-market.md](qlc-ssd-market.md)
- 보고서: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
- 추가 솔루션 후보 평가(보안 · 신뢰 · 재사용, GPU 직결 고IOPS, 전력 · 냉각): [ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)
- 데이터센터 유형별 스토리지 요구(범용 · AI 학습 · AI 추론 · 에이전트): [datacenter-types-storage-requirements.md](datacenter-types-storage-requirements.md)
- 핵심 기술 6가지 × 제품군 × 고객 협력 강도(덱 2장 단일 소스): [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md)
- 검증 원장(하이퍼스케일러 논리 · 출처 정정): [ssd-mixed-media-hyperscaler-logic-2026-10.md](../../sources/articles/ssd-mixed-media-hyperscaler-logic-2026-10.md)
