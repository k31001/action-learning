# NVIDIA CMX & SCADA — AI 스토리지 아키텍처 혁신

**수집일**: 2026-05-05  
**신뢰도**: High  
**태그**: #CMX #SCADA #NVIDIA #KV-cache #AI-storage #SSD #NVMe #PCIe-Gen6  
**출처**: NVIDIA 공식 기술 블로그, Micron IR, Samsung Semiconductor 기술 블로그, Blocks & Files, TrendForce

---

## 1. NVIDIA CMX (Context Memory Storage Platform)

### 1.1 기술 정의

**CMX**는 NVIDIA가 GTC 2026에서 공개한 **AI 추론을 위한 컨텍스트 메모리 스토리지 플랫폼**이다. 정식 명칭은 "BlueField-4 기반 CMX Context Memory Storage Platform"이며, NVIDIA Vera Rubin 플랫폼의 핵심 구성 요소다.

#### 배경 — KV Cache(Key-Value Cache) 문제

장문맥(Long-Context) AI 추론 및 에이전틱 AI(Agentic AI)에서 KV 캐시는 GPU HBM 메모리를 빠르게 소진한다.
- GPT-4급 모델에서 수천 개 동시 세션 처리 시 수백 GB의 KV 캐시 필요
- 현재 Vera Rubin GPU HBM 288GB/소켓으로도 대규모 추론 워크로드 감당 불가

#### G3.5 계층 신설 — CMX의 해법

| 계층 | 미디어 | 지연 | 역할 |
|------|--------|------|------|
| G1 | GPU HBM | 나노초 | 활성 계산 (핫 데이터) |
| G2 | 시스템 DRAM | 수십 나노초 | KV 스테이징/버퍼링 |
| G3 | 로컬 NVMe SSD | 마이크로초 | 단일 노드 캐시 |
| **G3.5** | **CMX (이더넷 연결 플래시)** | 마이크로초~수백 마이크로초 | **공유 포드 레벨 KV 캐시** |
| G4 | 공유 스토리지 | 밀리초 | 지속성 데이터 |

CMX(G3.5)는 이더넷(Spectrum-X, RDMA)으로 연결된 **외부 NVMe SSD 어레이**를 GPU 클러스터 전체가 공유하는 KV 캐시로 활용하는 구조다.

#### 핵심 구성요소

- **BlueField-4 DPU** (2026년 하반기 출하 예정): NVMe SSD 관리, KV I/O 가속, 암호화·무결성 검증
- **DOCA Memos SDK**: KV 캐시 오케스트레이션
- **Spectrum-X 이더넷 패브릭**: 저지연 RDMA 연결
- **NVIDIA Dynamo / NIXL**: 추론 스케줄링 연동

### 1.2 성능 수치

- 장문맥 워크로드: **최대 5배 TPS(토큰/초) 향상**
- **최대 5배 전력 효율 향상** (기존 로컬 SSD 대비)
- 페타바이트 규모 공유 KV 캐시 용량 제공

### 1.3 삼성전자 포지션 (메모리사업부 + SSD 사업)

**HBM/DRAM 관점 — 기회 우세**
- CMX는 HBM을 대체하지 않고 **HBM 활용도를 극대화**하는 오프로드 계층
- G2 계층(시스템 DRAM)이 KV 스테이징 역할 → DRAM 수요 증가
- 삼성전자 HBM4E GTC 2026에서 NVIDIA와 공동 전시 — HBM 협력 관계 확인
- 장기적으로: CMX 성숙 시 HBM 용량 확대 필요성 일부 완화 가능 (중장기 모니터링 필요)

**SSD 관점 — 즉각적 수혜**
- **삼성전자 PM1753 (PCIe Gen5, TLC V-NAND 8세대)**: NVIDIA CMX 플랫폼 공식 공급 SSD 확정
  - 스펙: 순차 읽기 14.5 GB/s, 랜덤 읽기 3.3M IOPS
- **삼성전자 PM1763 (PCIe Gen6, NVMe 2.1)**: Vera Rubin 메인 스토리지
  - 스펙: 순차 읽기 28,400 MB/s / 쓰기 21,000 MB/s, 용량 4~64TB
  - GTC 2026에서 NVIDIA SCADA 워크로드 시연에 활용

**리스크**: BlueField-4 출하(2026 하반기) 이후 Gen5 PM1753 → Gen6 PM1763 전환 타이밍 관리 필요

---

## 2. NVIDIA SCADA (Scaled Accelerated Data Access)

### 2.1 기술 정의

**SCADA**는 일반 산업제어 SCADA와 **완전히 다른 기술**이다. NVIDIA SCADA는 **Scaled Accelerated Data Access**의 약어로, GPU가 스토리지 I/O를 CPU를 거치지 않고 직접 시작·제어하는 **GPU 네이티브 스토리지 프로그래밍 모델**이다.

#### GPUDirect Storage vs. SCADA 비교

| 구분 | GPUDirect Storage | NVIDIA SCADA |
|------|------------------|-------------|
| 제어 경로(Control Path) | CPU 담당 | **GPU 직접 담당** |
| 데이터 경로(Data Path) | GPU 담당 | GPU 담당 |
| CPU 병목 | 존재 | **완전 제거** |
| 소형 블록(4KB) 성능 | 제한적 | **최적화** |

#### 배경 — 소형 블록 I/O 문제

AI 추론에서 4KB 이하 소형 블록 I/O가 지배적이나, 기존 SSD는 이 크기에서 IOPS 한계로 PCIe 버스를 충분히 활용하지 못하고 GPU가 데이터를 기다리며 낭비된다. SCADA는 GPU가 직접 I/O를 구동함으로써 이 문제를 해결한다.

SCADA는 NVIDIA **"Storage-Next"** 이니셔티브의 소프트웨어 기반이며, Micron, SK하이닉스, Kioxia, 삼성전자 등 스토리지 기업들과 함께 새로운 AI 스토리지 생태계를 구축 중이다.

### 2.2 핵심 성과 수치

| 시점 | 이벤트 | 성과 |
|------|--------|------|
| 2025년 11월 (SC'25) | Micron 9650 PCIe Gen6 × 44개 + SCADA | **2억 3천만 IOPS** (역대 최고) |
| 개별 SSD | Micron 9650 | **540만 IOPS** |
| NVIDIA 목표 | PCIe 7.0 기반 | **1억 IOPS** (단일 SSD) |

### 2.3 SCADA 호환 AI SSD 요구사항

1. **PCIe Gen6 이상** (현재), PCIe Gen7 (차세대)
2. **초고 IOPS**: 현재 ~3M IOPS → 목표 2,500만~1억 IOPS
3. **소형 블록(4KB 이하) 최적화** → TLC/QLC NAND 아키텍처 한계 존재
4. **SLC NAND 기반** AI SSD 개발 필요 (SK하이닉스, Kioxia 선행)
5. GPU 메모리 의미론(load/store 기반 접근) 지원 컨트롤러

### 2.4 NVIDIA AI SSD 파트너십 경쟁 구도

| 업체 | NVIDIA 파트너십 | 목표 IOPS | 예상 시기 | NAND 타입 |
|------|----------------|-----------|----------|-----------|
| **Micron** | 최초 레퍼런스 (9650 Gen6) | 540만 IOPS (현재) | 양산 중 | TLC |
| **SK하이닉스** | 공동 개발 (AI-N P) | 2,500만 → 1억 IOPS | 2026~2027 | SLC |
| **Kioxia** | 공동 개발 | 1억 IOPS | 2027 | SLC |
| **삼성전자** | 생태계 참여 (PM1763 시연) | 미공개 | 미정 | TLC (Gen6) |

### 2.5 삼성전자 포지션 — 위협 우세

**기회**:
- PM1763 GTC 2026 시연으로 생태계 진입 자체는 확인
- PCIe Gen6 SSD 선도 로드맵 (256TB/2026, 512TB/2027)은 스케일아웃 수요와 부합
- 수직 통합(NAND + 컨트롤러 + SSD) 역량으로 맞춤 AI SSD 개발 가능

**위협 (핵심)**:
- **SK하이닉스가 NVIDIA Storage-Next 전략적 파트너로 고착화 위험**: SK하이닉스 + Phison 컨트롤러 조합이 레퍼런스 플랫폼화 가능성
- **SLC NAND 기반 초고 IOPS AI SSD 경쟁 준비 부족**: 삼성전자 공개 SLC AI SSD 로드맵 미발표
- 2027년 1억 IOPS 시장 개화 전 삼성전자만의 AI SSD 전략 및 NVIDIA 파트너십 심화 시급

---

## 3. 전략적 시사점 종합

### CMX: 즉각적 수혜 + 중기 관리 필요
- PM1753 CMX 공식 공급 → 삼성전자 SSD 사업 **즉각적 매출 기회 확보**
- HBM4E NVIDIA 협력 → 메모리·스토리지 이중 포지션 강점
- BlueField-4 출하 시점(2026 H2)에 맞춰 Gen6 전환 타이밍 관리 필요

### SCADA: 구조적 위협 — 삼성전자 AI SSD 전략 수립 시급
- NVIDIA AI SSD 에코시스템의 핵심 파트너십이 **SK하이닉스·Kioxia·Micron 중심**으로 형성
- 삼성전자가 HBM처럼 SSD에서도 구조적 열위에 빠질 위험
- **RS3(고객특화 전환비용)** 전략에 SCADA 호환 AI SSD 공동 개발을 포함해야 함
- Robust 전략(RS2 바벨 포트폴리오)에서 AI SSD를 고부가가치 제품군으로 포지셔닝 검토

---

## 출처

- [NVIDIA CMX 공식 페이지](https://www.nvidia.com/en-us/data-center/ai-storage/cmx/)
- [NVIDIA Technical Blog - CMX 발표](https://developer.nvidia.com/blog/introducing-nvidia-bluefield-4-powered-inference-context-memory-storage-platform-for-the-next-frontier-of-ai/)
- [HPCwire - CMX 플랫폼 분석](https://www.hpcwire.com/2026/03/02/blasting-through-the-gpu-memory-wall-with-nvidias-new-cmx-platform/)
- [Samsung Semiconductor - KV Cache Offloading 기술 블로그](https://semiconductor.samsung.com/news-events/tech-blog/scaling-ai-inference-with-kv-cache-offloading-why-storage-is-becoming-a-key-enabler-for-next-generation-ai-systems/)
- [Samsung Global Newsroom - GTC 2026 HBM4E](https://news.samsung.com/global/samsung-unveils-hbm4e-showcasing-comprehensive-ai-solutions-nvidia-partnership-and-vision-at-nvidia-gtc-2026)
- [Blocks & Files - NVIDIA SCADA](https://blocksandfiles.com/2025/11/25/scada-nvidia/)
- [Micron - GTC 2026 SCADA 상용화](https://www.micron.com/about/blog/storage/ssd/from-breakthrough-demo-to-deployment-path-scada-on-production-grade-pcie-gen6-hardware-at-nvidia-gtc-2026)
- [Micron - SC'25 2.3억 IOPS 성과](https://www.micron.com/about/blog/storage/ssd/sc25-performance-breakthrough-230m-iops-in-a-single-server)
- [TrendForce - SK하이닉스 1억 IOPS AI NAND](https://www.trendforce.com/news/2025/12/11/news-sk-hynix-reportedly-aims-100-million-iops-with-ai-nand-by-2027-in-collaboration-with-nvidia/)
- [TrendForce - SLC AI SSD 현황](https://www.trendforce.com/news/2025/12/29/news-slc-based-ai-ssds-gain-traction-as-sk-hynix-and-kioxia-accelerate-development-with-nvidia/)
- [Blocks & Files - NVIDIA KV Cache 파트너 현황](https://www.blocksandfiles.com/ai-ml/2026/03/30/nvidia-and-its-partners-kv-cache-extenders/5209284)
- [Tweaktown - NVIDIA+SK하이닉스 AI SSD](https://www.tweaktown.com/news/109427/nvidia-and-sk-hynix-to-introduce-ai-ssd-with-10x-more-performance-in-middle-of-dram-crisis/index.html)
- [Kioxia - 1억 IOPS SSD](https://blocksandfiles.com/2025/09/15/kioxia-100-million-iops-ssd-nvidia/)

---

## [Update 2026-08-16] PM1763 양산 전환 + CMX 물량 구조 + DGX Spark — 탑재 축 구체화

> 근거: [samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md](../../sources/articles/samsung-ssd-design-wins-nvidia-aipc-2026-08-16.md) (항목별 신뢰도 표기).

### §1.3 갱신 — 시연에서 양산·물량으로

- **PM1763 양산 개시 (2026-07-08)**: "차세대 AI 플랫폼 검증 완료" 공식 발표 — GTC 2026 시연이 4개월 만에 양산으로 전환. 16TB·28,400/21,900 MB/s. 단 "Vera Rubin 공식 채택" 표현은 매체 해석이며 삼성 공식 문구는 검증 완료까지 — 최종 통합은 OEM·인증 디자인 의존.
- **CMX 물량 구조 확인**: 1유닛 = SSD 576개·9,600TB, CMX향 NAND 수요 2026년 3,500만 → 2027년 1억+ TB — §1.3의 "즉각적 매출 기회"가 물량 구조로 구체화됐다.
- **캐파 배정**: 삼성 V-NAND 캐파 60%+ NVIDIA CMX向 배정·V10 공급 개시·V11(500단) 개발 보도(재인용 경유, Med) — "낸드 동맹"이 HBM에 이어 NAND로 확장되는 신호. 기존 리스크 문구(PM1753→PM1763 전환 타이밍)는 양산 개시로 관리 국면 진입.

### 신설 — 개인용 AI 기기 축 (DGX Spark)

- **NVIDIA DGX Spark 4TB의 SSD = 삼성 PM9E1 M.2 2242** — 분해 실측으로 확인(MZALC4T0HBL1-00B07), 펌웨어 DGX Spark OS·CUDA 최적화·SPDM v1.2 보도. **데이터센터(CMX·Gen6)와 개인용 AI 기기(Gen5 클라이언트) 양 축에서 삼성이 NVIDIA 스토리지 공급사**임이 실물로 확인.

### §2.5 재해석 — 두 트랙 구분

- 본 페이지의 "위협 우세" 진단은 **SLC 초고 IOPS(SCADA Storage-Next) 트랙에 한정해 유지**된다 — 그 트랙의 SK(AI-N P)·Kioxia(1억 IOPS)·Micron(9650 레퍼런스) 선점 구도는 불변. 반면 **CMX(TLC 대용량)·Vera Rubin 메인 스토리지·개인용 AI 기기 트랙에서는 삼성이 선두 공급 지위**를 확보했다. "AI SSD에서 삼성 후행"이라는 단일 서술은 이제 부정확하며, 트랙별로 갈라 읽어야 한다.

---

## [Update 2026-08-18] FMS 2026 — cuFile 오픈소스화·SCADA 2.3억 IOPS 재시연·CMX BlueField-4/STX

> 근거: [samsung-sk-micron-nvidia-china-update-2026-08-18.md](../../sources/articles/samsung-sk-micron-nvidia-china-update-2026-08-18.md) §4 (NVIDIA FMS 2026 발표 종합).

### cuFile 오픈소스화

- FMS 2026(2026년 8월)에서 NVIDIA가 **cuFile을 Google·Intel·Meta와 공동으로 오픈소스화** — GPU 주도 스토리지 접근(GPUDirect Storage 계열) 생태계를 업계 전반으로 확대하는 신호.

### SCADA — Wiwynn 44대 Gen6 SSD로 2.3억 IOPS 재시연

- BlueField-4/STX 기반 SCADA로 Wiwynn이 **PCIe Gen6 SSD 44대**를 사용해 **초당 2.3억 회 랜덤읽기(IOPS)**를 시연 — 위 §2.2의 "2025년 11월 SC'25 Micron 9650×44개, 2.3억 IOPS" 성과가 2026년 FMS에서도 재확인·재시연됐다. 이번 시연은 Wiwynn 서버 구성 기준으로 보도되어 개별 SSD 벤더명은 원문에 명시되지 않음 — Micron 9650이 동일 구성인지는 후속 확인 필요.

### CMX — BlueField-4/STX 기반 장문맥 추론 컨텍스트 메모리 계층 재확인

- NVIDIA는 FMS 2026에서 **CMX(장문맥 추론용 컨텍스트 메모리 스토리지 계층)**를 BlueField-4/STX 기반으로 다시 선보였다 — §1의 G3.5 계층 구조·BlueField-4 DPU 의존성이 FMS 2026 시점에도 유효함을 재확인하는 신호. §1.3·[Update 2026-08-16]에서 다룬 PM1763 양산·CMX 물량 구조(2026년 3,500만 TB → 2027년 1억+ TB)의 하드웨어 기반이 이 BlueField-4/STX 축임을 뒷받침.

**출처**: [samsung-sk-micron-nvidia-china-update-2026-08-18.md](../../sources/articles/samsung-sk-micron-nvidia-china-update-2026-08-18.md) §4
