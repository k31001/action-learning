---
type: concept
last_reviewed: 2026-10-10
sources:
  - sources/articles/onprem-ai-confidential-storage-demand-2026-10.md
  - sources/articles/ssd-future-candidate-security-trust-2026-10.md
---

# 온프렘 엔터프라이즈 AI와 Confidential Storage: 수요 · 이유 · 기술 × 협력 (2026-10-10)

> 사용자 지시(2026-10-10): "시큐리티 쪽은 confidential storage 관련 내용을 AI의 엔터프라이즈 서비스를 위해 on-prem 데이터센터로 들어오기 위해 LLM 모델 파라미터와 기업 데이터 모두 보안이 중요한 내용이고, 이런 수요가 얼마나 커질지를 조사해서 시각화해 주고 필요한 고객 협력과 기술 요소를 시각화해서 한 장." 근거 원장: [onprem-ai-confidential-storage-demand-2026-10.md](../../sources/articles/onprem-ai-confidential-storage-demand-2026-10.md)(CS-01~98, CS-D01~D13). 덱: [ssd-future-ready-strategy-outline.md](../../outputs/presentation/ssd-future-ready-strategy-outline.md) v3.7 5장 "보안 기회".

⚠️ **등급**: 대부분 🟡(검색 · 2차). 원문 확인(✅)은 Google Cloud 블로그 · Anthropic · OCP L.O.C.K. 사양 · Linux 커널뿐. 설문 상당수는 온프렘 · 프라이빗 인프라 벤더 후원.

## 1. 수요: 온프렘 · 소버린 AI가 커진다

| 지표 | 값 | ID |
|---|---|---|
| 소버린 AI 시장 | 2025 $150~200B → 2030 $500~600B(연 약 20~32%), 소버니티가 2030 AI 지출의 30~40% 좌우 | CS-01 · CS-D01 |
| AI를 자기 DC에서 돌리는 기업 | 2025 초 약 2% → 2028 20%+ (Gartner) | CS-03 |
| 소버린 클라우드 IaaS | 2026 약 $80B(+36%) → 2027 $110.6B (Gartner) | CS-02 |
| NVIDIA 소버린 매출 | FY26 $30B+, 전년 대비 3배+ | CS-08 |
| Dell · HPE | Dell AI 서버 주문 $60.9B(분기) · AI Factory 고객 6,500+, HPE AI 백로그 $6.8B 대부분 기업 · 소버린 | CS-10 · CS-11 |
| 반대 신호 | IDC 2Q25 AI 지출의 84.1%가 클라우드 · 공유 환경 | CS-05 |

## 2. 왜 보안인가: 두 주인의 자산이 한 곳에

- 온프렘 AI DC에는 **모델 제공자의 가중치**(Llama 405B FP16 약 810GB, 1T FP8 약 1TB, CS-52 · CS-D11)와 **기업의 민감 데이터 · RAG · KV**가 함께 놓인다.
- 설문(벤더 후원 포함): 소버니티 · 프라이버시가 퍼블릭 클라우드 AI 지연 1위 62%(CS-23), 데이터 레지던시로 AI 과제 지연 · 축소 58%(CS-22), 프로덕션 추론 프라이빗 56% 대 퍼블릭 41%(CS-20), 기밀 컴퓨팅 장벽 1위 증명 검증 84%(CS-61).
- 가중치 보호 요구: RAND SL4 · SL5에 기밀 컴퓨팅 권고(CS-41), Anthropic ASL-3 가중치 보호(CS-42), NVIDIA 기밀 컴퓨팅의 핵심 용례 "제3자 환경에서 가중치 보호"(CS-45), Fortanix "온프렘 AI 팩토리로 모델 배포"(CS-47).
- **⚠️ 반박 지점**: 공개된 가중치 보호 설계(Anthropic CS-43 · Fortanix · VAST)는 가중치를 드라이브 밖에서 암호화하고 TEE 안에서만 복호화한다. SSD 자체 암호화(SED · L.O.C.K.)나 TDISP를 가중치 보호 요건으로 명시한 문서는 없다. 따라서 덱 주장은 "SSD가 가중치를 지킨다"가 아니라 **"SSD도 고객의 키 · 증명 신뢰 체계 안에 들어가야 한다"** 로 쓴다.

## 3. 기술 요소 × 고객 협력

| 층 | SSD 기술 | 현황 | 함께할 고객 |
|---|---|---|---|
| 기밀 VM 연결 | TDISP | SSD 쪽 발표는 삼성 PM1763 1건(CS-80), AMD SEV-TIO 호스트 코드 Linux 메인라인(CS-76 ✅), Intel TDX Connect 출하 미확인 | CPU 벤더 · 하이퍼바이저 · 기밀 VM 스택(CS-95) |
| 증명 | SPDM | DSP0286 스토리지 바인딩 1.0.0(2025-05, CS-73). **Dell KB: 삼성 PM9D3a · PM9D5a SPDM 미지원으로 기능 실패**(CS-81) | 서버 OEM 자격 인증(CS-93) · 증명 검증 서비스(Intel Trust Authority · NVIDIA NRAS 등, CS-94) |
| 키 관리 | OCP L.O.C.K. · NVMe KPIO | L.O.C.K. 1.0 2025-09 · 1.1 RC4(CS-70 ✅), 삼성 공저, Opal · Enterprise · KPIO 호환, 위협 모델에 멀티테넌트 VM(CS-71 ✅) | 클라우드(Google · Microsoft) · OEM KMS(Dell SEKM · HPE iLO + Thales · Utimaco KMIP, CS-91 · CS-92) |
| 신뢰 루트 | Caliptra | 2.0 범위에 DC SSD 명시, 탑재 SSD 아직 없음(ST-20 · ST-24) | 하이퍼스케일러 · OCP |

**판단(⚠️ 과제팀 해석)**: Confidential Storage는 표준이 인터페이스를 정하므로 스펙으로 협력하는 기술이지만([ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md) §3.2), 실제로 팔리려면 고객 · OEM의 키 관리와 증명 체계에 들어가 인증을 통과해야 한다. Dell SPDM 사례가 그 관문을 보여 준다.

## 4. 공백

1. 온프렘 기업 AI 하드웨어 지출 · Confidential Storage 시장 규모 전망(공개 자료 없음)
2. SSD 벤더와 AI 랩의 공동 개발 사례, Anthropic · OpenAI의 고객 온프렘 가중치 배포 확인
3. 스토리지를 CPU + GPU 복합 증명에 넣는 문서, Intel TDX Connect 출하

## 5. 연결

- 핵심 기술 6가지 · 협력 깊이: [ssd-core-technologies-customer-collaboration.md](ssd-core-technologies-customer-collaboration.md)
- 보안 후보 검토: [ssd-future-solution-candidates.md](ssd-future-solution-candidates.md)
- 덱: [ssd-future-ready-strategy-report.md](../../outputs/report/ssd-future-ready-strategy-report.md)
