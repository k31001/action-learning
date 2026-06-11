---
type: concept
last_reviewed: 2026-06-11
sources:
  - sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md
---

# 임베디드 SW 수익화 — 커널·드라이버·펌웨어·BSP·SDK 상품화

> **한 줄 요약**: 메모리 회사의 차별화는 상위 앱보다 **커널·드라이버·펌웨어·런타임·SDK**에 생긴다. 하드웨어를 이해하는 저계층 SW를 별도 P&L로 분리하면 commodity 매출을 솔루션 ASP로 전환할 수 있다.

---

## 1. 공개 근거 — Samsung의 저계층 SW 자산

### 1.1 SmartSSD (Computational Storage)

SSD 내부에서 데이터를 직접 처리 → CPU/GPU/RAM 간 데이터 이동 감소:

| 지표 | 효과 |
|---|---|
| 스캔 중심 DB 쿼리 처리시간 | **−50% 이상** |
| 에너지 소비 | **최대 −70%** |
| CPU 활용 | **최대 −97%** |

→ 하드웨어 차별화가 아니라 **firmware + 드라이버 통합 솔루션**이 효과의 원천

### 1.2 CXL SMDK (Scalable Memory Development Kit)

- 메모리 가상화
- 지능형 티어링 (DRAM ↔ CXL 메모리 ↔ SSD)
- 확장 메모리 풀 관리
- → 애플리케이션을 크게 바꾸지 않고도 새로운 메모리 구조 도입

### 1.3 Linux 커널 + NVIDIA GPUDirect Storage

- 드라이버·데이터 경로 최적화
- CPU overhead 감소
- Latency 축소
- Throughput 향상

→ **저계층 SW가 시스템 성능의 결정 요인**

---

## 2. 비즈니스 모델 4종 — 인터뷰 권고

| 모델 | 설명 | ASP 효과 |
|---|---|---|
| **1. 하드웨어 + 펌웨어 번들** | 펌웨어 기능을 별도 SKU로 분리, 프리미엄 버전에 추가 기능 (Compute Express, Tiering Profile 등) | 단가 +10~20% |
| **2. BSP/SDK/관리 SW 라이선스** | Board Support Package · SDK · 관리 콘솔을 별도 라이선스로 판매 | 별도 매출원 (반복) |
| **3. 고객 맞춤 커널/드라이버/보안 기능 개발** | NRE 기반 맞춤 개발 — 하이퍼스케일러·모델사 요구 흡수 | 개발비 + 단가 +30% |
| **4. 장수명 지원·성능 보증·현장 최적화 서비스** | 분기 패치·성능 튜닝·온사이트 엔지니어 | 서비스 매출 (반복) |

→ **상기 4종을 통합 패키지화**하면 SmartSSD·CXL 메모리·AI 메모리 박스가 "스토리지 박스 같은 솔루션"으로 변환

---

## 3. 조직·P&L 구조 권고

```
[기존]                              [권고]
─────────                          ─────────
제품 개발                          제품 개발
  └ 펌웨어 (제품 종속)              ├ BSP/SDK 패키지 (별도 P&L)
  └ 드라이버 (제품 종속)            │   ├ 라이선스
                                    │   ├ 유상 지원
                                    │   └ 맞춤 개발 (NRE)
                                    └ HW + FW 번들 SKU 라인업
```

### 핵심 KPI (인터뷰 권고)
- **6개월 내 PoC 2건, 디자인인 1건**
- **유상 지원 계약 3건**
- 분기 IR에 BSP/SDK 매출 별도 공시

---

## 4. 경쟁 환경

| 회사 | 임베디드 SW 자산 | 수익화 모델 |
|---|---|---|
| **Samsung** | SmartSSD · CXL SMDK · PCIe Gen6 SSD 펌웨어 · 메모리 컨트롤러 IP | **현재 무상 번들** (수익화 안 됨) |
| **SK hynix** | AI Solutions Group · PCIe Gen6 SSD 펌웨어 · HBM 컨트롤러 | 미국 AI Company $10B 설립 — **솔루션 사업 확대 중** |
| **Micron** | 9650 PCIe Gen6 SSD · NAND 펌웨어 | 미국 데이터센터 솔루션 협력 확대 |
| **NVIDIA** | CUDA · GPUDirect Storage · CUDA-Q | **솔루션 SW를 이미 핵심 수익원으로 운영** |

→ Samsung은 **자산은 있으나 수익화 시동 미동**. SK hynix·Micron이 한 발 앞서 솔루션화 진행 중.

---

## 5. Samsung 강점 — IDM 종합반도체

권 교수 진단: "TSMC/Intel/Samsung 3사 중 **메모리도 하는 유일** IDM" ([samsung.md](../entities/samsung.md))

- Foundry 통합 → 하이퍼스케일러 ASIC + Samsung 메모리 + Samsung firmware 통합 솔루션 가능
- 일반 메모리 회사는 ASIC 측 firmware에 접근 못 함
- → **IDM 차별점을 임베디드 SW로 수익화**

---

## 6. 시나리오 플래닝 함의

| 시나리오 | 작동 |
|---|---|
| **A** | 디커플링 환경에서 미국·동맹 고객 BSP/SDK 매출 확보 |
| **B** (Main Bet) | 하이퍼스케일러·모델사 맞춤 SW가 차별화 핵심 |
| **C** | 다운턴에도 SW 매출은 견조 — 사이클 헤지 |
| **D** | HW 매출 감소를 SW 매출이 일부 상쇄 |
| **E** | HBM 도태 시에도 **저계층 SW는 새 메모리에 이전 가능** → 자산 보존 |

→ **모든 시나리오에서 작동하는 Robust 자산** (RS 후보)

---

## 7. RS·MB 매핑

- **MB-4 커스텀 AI 메모리**: BSP/SDK를 고객 맞춤 솔루션의 일부로 묶으면 ASP·전환비용 ↑
- **RS-3 고객 전환비용**: SDK 학습·통합 비용은 가장 강력한 전환비용 자산
- **RS-7 AI 엔지니어링 자동화**: BSP/SDK 개발 자체에 AI 도구 적용 — 양방향 강화

---

## 8. EWI 후보

| 지표 | 임계값 |
|---|---|
| Samsung BSP/SDK 라이선스 계약 수 | 분기 2건+ |
| 임베디드 SW 매출 비중 | 메모리사업부 매출의 1%+ |
| 유상 지원 계약 수 | 분기 3건+ |

---

## 9. 출처

- [senior-partner-interview-deep-research-2026-06-11.md](../../sources/raw-notes/senior-partner-interview-deep-research-2026-06-11.md) §3.3, §4
- Samsung Newsroom (SmartSSD·CXL SMDK 공식 자료)
- Linux Kernel Documentation
- NVIDIA GPUDirect Storage Documentation
