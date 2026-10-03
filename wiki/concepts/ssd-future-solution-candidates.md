---
type: analysis
last_reviewed: 2026-10-03
status: 후보 평가 + 사용자 결정 반영 (2026-10-03)
sources:
  - sources/articles/ssd-future-candidate-security-trust-2026-10.md
  - sources/articles/ssd-future-candidate-gpu-direct-iops-2026-10.md
  - sources/articles/ssd-future-candidate-power-cooling-2026-10.md
---

# SSD 미래 대응 솔루션 후보: 세 기술 다음의 두세 가지

"불확실성이 높은 미래에 대응하기 위한 고객 협력 전략"([보고서](../../outputs/report/ssd-future-ready-strategy-report.md))은 세 기술을 고른다: 고DWPD([high-dwpd-operating-point.md](high-dwpd-operating-point.md)) · Mixed Media(pSLC, [mixed-media-ssd.md](mixed-media-ssd.md)) · 고용량 + 결함 허용([high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md)). 사용자(2026-10-03)는 "다가올 미래에 대응하기 위한 핵심 솔루션 두어 개"를 더 찾아 달라고 했다. 이 페이지는 후보 다섯 개를 같은 잣대로 평가한다. 판정은 ⚠️ 과제팀 판단이다.

> **사용자 결정 (2026-10-03)**: ① **A 보안 · 신뢰 · 재사용은 덱 · 보고서에서 따로 강조하지 않는다.** 중요성이 이미 잘 인식돼 있고 삼성이 잘하고 있는 분야이기 때문이다(L.O.C.K. 공저가 그 예). ② **B GPU 직결 고IOPS(SCADA)는 "기술적으로 미리 준비가 필요한 기술"로 포함**하되, 시장 규모와 기술 성숙도의 불확실성이 커서 베팅 확률이 낮다는 점을 반영해 추가 서베이와 기술 검토 뒤 포함 방식을 정한다(추가 원장 `ssd-scada-market-technical-review-2026-10.md` 수집 중). ③ C 전력 · 냉각은 제품 요건으로 흡수하는 판정 유지.

> **사용자 결정 (2026-10-03, 덱 v1.0 리뷰 후)**: **SCADA(GPU 직결 고IOPS)는 전략 · 보고서 · 덱에서 완전히 제외한다.** "아직 SCADA를 논의하기에 이른 시점"이라는 판단이다. 아래 과제팀 판정과 원장 2종(시장 · 기술 검토)은 지식으로 남기되, 신호(NVIDIA SSD 요구 사양 공개 · 첫 프로덕션 배치 · PCIe Gen7 통합 일정 · 고객 RFQ의 512B IOPS 요구)가 나타나면 다시 검토한다.

> **과제팀 판정 (2026-10-03, 추가 서베이 · 기술 검토 후)**: **B GPU 직결 고IOPS를 "기술 옵션"으로 포함**한다. 제품 베팅은 하지 않고 준비에 오래 걸리는 기반 기술만 지금 한다. 근거 원장 [ssd-scada-market-technical-review-2026-10.md](../../sources/articles/ssd-scada-market-technical-review-2026-10.md)(SR).
> - 불확실성: 512B 고IOPS 세그먼트의 공개 시장 추정 없음(SR-14). 위키의 "SCADA $36B → $322B"는 MarketsAndMarkets **"AI-Powered Storage"**(HDD · NAS/SAN · SW 포함) 수치였다(SR-01 · SR-06 🟡) → RS-3 · strategy.md · 현황 페이지 정정. NVIDIA SSD 요구 사양 · cuFile 코드 · 프로덕션 배치 모두 없음.
> - 기술 검토(⚠️ 파생, SR §4): 512B 상한은 **매체**(2TB TLC 약 1.3~2.3M) → **NAND 채널 전송**(16채널 · 3.6GB/s · 4KB 전송 약 12.4M, 1KB면 약 37~44M) → **PCIe x4**(Gen6 약 50M · Gen7 약 100M) 순으로 걸린다. 1억 IOPS 드라이브는 Gen7(통합 2028 예상)에 묶인다. 그 다음 병목은 컨트롤러 명령 처리(명령당 10ns)와 GPU 쪽 비용(aisio 폴링 SM 26.8% ✅, SR-68).
> - 판단: 코드워드 · 채널 전송 · 명령 처리 구조는 컨트롤러 세대 단위로 바뀌므로 신호 뒤 착수는 한 세대 늦다 → **기반 기술은 지금, 제품은 신호(NVIDIA 사양 공개 · 첫 실배치 · Gen7 · 고객 RFQ)로**. GPU 쪽 병목은 고객과 함께 풀어야 하므로 "고객 시스템과 함께" 묶음.
>
> **초고DWPD**: 2TB · 30 DWPD는 별도 후보가 아니라 고DWPD의 운영점으로 둔다([high-dwpd-operating-point.md](high-dwpd-operating-point.md) §5.5).

**평가 잣대**: ① 어느 시나리오에서 핵심이 되나(불변성) ② 공개 근거의 강도 ③ SSD 안에서 완결되나, 고객 시스템과 함께 풀어야 하나 ④ 삼성의 출발점과 공백.

## 1. 후보 요약

| 후보 | 필요해지는 미래 | 가장 강한 근거 | 반증 · 공백 | 분류 | 판정 |
|---|---|---|---|---|---|
| **A. 보안 · 신뢰 · 재사용** (OCP L.O.C.K. · Caliptra · PQC) → 사용자 결정으로 제외(이미 강점) | 드라이브를 파기하지 않고 다시 쓰는 미래, 양자 내성 전환, 진영별 신뢰 요구 | L.O.C.K. 사양의 목표가 "클라우드 사업자가 SSD를 파기할 필요를 없애는 것", Google · Microsoft 스토리지 제품의 확정 채택, **삼성 기여 · 공저** ✅. Caliptra 2.0이 SSD에 ML-DSA-87 · LMS 서명 정의 ✅. Microsoft 양자 내성 2029 도입 · 2033 전환, 공급망 포함 ✅ | Microsoft는 여전히 HDD 데이터 부품 파쇄 ✅, SSD 재사용 수치 없음, 출하 중 Caliptra · L.O.C.K. SSD 0, 삼성 S.A.F.E. 공개 감사 보고서 없음 ✅ | SSD 안에서 구현 + OCP 규격(고객이 정의) | **추천** |
| **B. GPU 직결 소블록 고IOPS** (Storage-Next · SCADA) → 기술 옵션 판정 후 **사용자 결정으로 제외(시기상조)** | GPU가 512B 단위로 SSD를 직접 읽는 미래(GNN · 추천 · 벡터 검색) | Storage-Next 공식 출범(FMS 2026, 40곳+, "GPU당 512B IOPS 최대화") 🟡. 삼성 PM1763 SCADA 백서(드라이브당 약 692만 IOPS) 🟡, 삼성 `xnvme/aisio` 실측 6,170만 IOPS ✅ | NVIDIA SSD 요구 사양 비공개, cuFile 코드 미공개 ✅, **SCADA 이득의 주원천은 HBM 캐시 적중**(삼성 aisio) ✅, cuVS는 SSD 인덱스 검색을 GPU로 하지 않음 ✅, Kioxia 1억 IOPS 2028로 순연 🟡 | **고객 협력 필수**(NVIDIA · 애플리케이션 SW) | **추천(조건부)** |
| **C. 전력 · 냉각 대응** (콜드플레이트 E1.S · NVMe 2.3 전력 제어) | 팬 없는 100% 액체냉각 랙, 랙 전력 상한 아래 운영 | Vera Rubin NVL72 팬리스 · SSD 냉각판 🟡, Solidigm(2025-03 NVIDIA 공동 시연) → Micron → Kioxia 순 출시 🟡, Google "IT 랙 전체를 xPU에" ✅, NVMe 2.3 Power Limit · Measurement가 nvme-cli에 구현 ✅(커널 미지원) | AI 랙에서 SSD 전력은 약 2~3%(⚠️ 파생), 액체냉각 SSD는 전부 TLC 컴퓨트 트레이급, 스토리지 서버는 공랭(xAI) 🟡, 삼성은 "D2C 최적화" 문구까지 | SSD 안에서(기구 · 열) + 시스템 규격 | 별도 솔루션보다 **제품 요건으로 흡수** |
| D. CXL 메모리 계층 SSD | NAND가 메모리 계층으로 쓰이는 미래 | Kioxia XL1 평가 샘플 🟡 | 삼성 CMM-H는 2025 FPGA 시제품 이후 일정 비공개 🟡 | 고객 협력 | 보류 |
| E. 드라이브 내 투명 압축 | 쓰기량 · 용량을 압축으로 늘리는 미래 | ScaleFlux · IBM FCM 제품 🟡 | 하이퍼스케일러 공개 배치는 Alibaba 2020뿐, Microsoft Zipline 2021 이후 비활성 ✅ | SSD 안에서 | 보류 |

## 2. 시나리오 대응 (⚠️ 과제팀 판단)

| 시나리오 (확률) | 기존 세 기술 중 핵심 | A 보안 · 신뢰 · 재사용 | B GPU 직결 고IOPS | C 전력 · 냉각 |
|---|---|---|---|---|
| B AI 르네상스 (39%) | 고DWPD · 고용량 | ◐ 기본 요건 | ● | ● |
| A 황금 요새 (26%) | 고DWPD · 고용량 | ● 진영 내 공급망 신뢰 · PQC | ● | ● |
| D 조용한 재편 (21%) | Mixed Media | ● 파기 대신 재사용 = CapEx 절감 | ○ | ○ |
| C 기술 냉전 (8%) | Mixed Media | ● 알고리즘 · 신뢰 체계 분리(SPDM NIST 대 SM 혼용 금지 ✅, 중국 NGCC 🟡) | ○ | ○ |
| E 패러다임 전환 (6%) | Mixed Media · 고용량 | ◐ | ◐ CXL · HBF가 흡수 가능 | ◐ |

- **A는 기존 세 기술이 약한 D · C에서 ●**가 되어 포트폴리오의 빈칸을 메운다. 수요가 아니라 규격 · 규제 일정이 끌고 가므로 AI 수요와 상관이 낮다.
- **B는 고DWPD와 같은 AI 쪽 상방**이지만 쓰기(KV 캐시 대블록)가 아니라 읽기(512B 소블록)라 수요의 원천이 다르다. AI 안에서 분산 효과가 있다.
- **C는 B · A 시나리오의 제품 요건**이다. 독립 솔루션이라기보다 고용량(랙 공간 · 전력)과 고DWPD 제품의 사양(냉각판 폼팩터, 전력 한도 · 측정)으로 흡수하는 편이 맞다.

## 3. 고객 협력 논리와의 관계

전략의 핵심 논리는 "SSD 안에서 완결되는 기술은 지금 방식으로 앞서가고, 고객 시스템 안에서 풀어야 하는 기술은 다른 접근이 필요하다"이다.

| 묶음 | 기술 | 왜 그 묶음인가 |
|---|---|---|
| 고객 시스템과 함께 | 고DWPD, **B GPU 직결 고IOPS** | 요구가 **고객 소프트웨어 안에서 정의**된다: 데이터 수명은 KV 캐시 관리자가, 512B 접근 패턴과 캐시 정책은 CUDA · SCADA · 애플리케이션이 안다. 삼성 aisio도 이득의 주원천을 GPU 쪽 캐시로 본다 ✅ |
| SSD 안에서 완결 | Mixed Media(pSLC), 고용량 + 결함 허용, **A 보안 · 신뢰 · 재사용** | 규격이 정해지면 SSD가 구현해 낸다. A는 고객(Google · Microsoft)이 OCP에서 규격을 쓰고 삼성이 이미 공저자다 |

→ **AI가 만드는 새 수요(쓰기의 고DWPD, 읽기의 512B 고IOPS)는 둘 다 고객 소프트웨어 안에서 요구가 정의된다.** B를 넣으면 "고객 협력이 필요한 문제"가 하나의 우연이 아니라 AI 수요의 공통 성질이라는 논리가 선다.

## 4. 쓰면 안 되는 문장

| 문장 | 이유 |
|---|---|
| "하이퍼스케일러가 이미 SSD를 재사용한다" | SSD 재사용 수치 없음, Microsoft는 HDD 데이터 부품 파쇄 |
| "OCP NVMe SSD 사양이 Caliptra · L.O.C.K. · PQC를 의무화했다" | 사양 원문 미확인 |
| "삼성은 SCADA 대응이 없다" | PM1763 SCADA 백서 · aisio가 있다. 공백은 SLC급 전용 매체 로드맵 |
| "KV 캐시 오프로드가 512B 고IOPS 수요를 만든다" | KV 캐시는 대블록 지배 |
| "SSD가 AI 데이터센터 전력의 상당 부분을 쓴다" | 출처별 2~9%로 범위가 넓다 |
| "삼성이 콜드플레이트 E1.S를 출시했다" | 확인된 문구는 "D2C 냉각 최적화"까지 |

## 5. 연결

- 세 기술: [high-dwpd-operating-point.md](high-dwpd-operating-point.md) · [mixed-media-ssd.md](mixed-media-ssd.md) · [high-capacity-fault-tolerance.md](high-capacity-fault-tolerance.md)
- SCADA · CMX 현황: [nvidia-cmx-scada.md](../entities/nvidia-cmx-scada.md) §2.6
- 전력 제약: [energy-constraints.md](energy-constraints.md) · [ai-datacenter-buildout.md](ai-datacenter-buildout.md)
- 해법 사다리(고객 시스템으로의 이관): [solution-ladder-component-to-system.md](solution-ladder-component-to-system.md)
- 불변 전략 원칙: [invariant/README.md](../strategies/invariant/README.md)
- 산출물: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md) · [아웃라인](../../outputs/presentation/ssd-future-ready-strategy-outline.md)
