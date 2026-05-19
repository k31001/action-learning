# SemiAnalysis: ISSCC 2026 — NVIDIA & Broadcom CPO, HBM4 & LPDDR6, TSMC Active LSI

- **출처 기관**: SemiAnalysis (newsletter)
- **URL**: https://newsletter.semianalysis.com/p/isscc-2026-nvidia-and-broadcom-cpo
- **발행일**: 2026-04-15
- **수집일**: 2026-05-19
- **paywall**: 일부 paywall, 메모리 섹션은 무료 발췌 가능
- **유형**: 컨퍼런스 리뷰 (ISSCC 2026 메모리 논문)

> 본 파일은 paywall 일부 발췌·메모리 관련 사실만 추출. 원문은 위 URL 참조. 인용 시 wiki 페이지에서 이 파일을 가리킨다.

---

## HBM4 — 제조사별

### Samsung HBM4 (ISSCC 2026 Paper 15.6)
- 36GB, 12-high 스택, 2048 IO 핀, **3.3 TB/s** 대역폭
- 최고 핀 속도 **13 Gb/s** (JEDEC 표준 6.4 Gb/s의 2배 이상)
- 구성: **1c DRAM 코어 다이 + SF4 로직 베이스 다이**
- VDDQ: HBM3E 1.1V → **HBM4 0.75V (−32%)**
- Sub-1V에서 11 Gb/s, 고전압에서 13 Gb/s
- 적응형 바디-바이어스(ABB) 제어, TSV 4배 증가
- Per-channel TSV RDQS 자동 캘리브레이션: 7.8 → 9.4 Gb/s 개선
- Programmable Memory Built-In Self-Test(PMBIST) 아키텍처 도입

### SK Hynix HBM4
- ISSCC 2026에 별도 HBM4 논문 미제출 (Samsung·Micron 노출 대비 신중)
- **N12 로직 프로세스** 사용 (Micron과 동일) — Samsung SF4 대비 저비용 노선

### Micron HBM4
- **N12 로직 프로세스** 사용
- 별도 ISSCC 발표 없음

### Samsung vs SK Hynix HBM4 평가 (SemiAnalysis 견해)
- Samsung: 성능(13 Gb/s 최고 핀 속도)·전력 면에서 경쟁사 대비 우수
- SK Hynix: 안정성은 여전히 우위
- 베이스다이 비용: Samsung SF4 > SK/Micron N12 (SF4가 N12보다 고비용)

---

## LPDDR6

### Samsung LPDDR6 (Paper 15.8)
- 12.8 Gb/s @ 0.97V, 최대 **14.4 Gb/s @ 1.025V**
- 16Gb 다이, 44.5 mm², 밀도 0.360 Gb/mm²
- 2 서브채널 아키텍처, 16 뱅크/서브채널
- Wide NRZ 신호링: 12 DQ 핀/서브채널, 버스트 길이 24
- 효율 모드: 읽기 전력 −27%, 쓰기 전력 −22%

### SK Hynix 1c LPDDR6 (Paper 15.7)
- 최고 **14.4 Gb/s** (LPDDR5X 대비 +35%)
- 0.95V에서 10.9 Gb/s (Samsung의 12.8 Gb/s 대비 낮음)
- 효율 모드: 대기 전류 −12.7%, 동작 전류 −18.9%

### Samsung SF2 LPDDR6 PHY (Paper 37.3)
- 14.4 Gb/s 지원, 2.32 mm 쇼어라인, 0.695 mm² 면적
- 효율 모드: 읽기/쓰기 전력 −39%/−29%
- 클록 게이팅으로 거의 −50% 전력

---

## GDDR7

### SK Hynix 1c GDDR7 (Paper 15.9)
- **48 Gb/s @ 1.2V/1.2V**
- 30.3 Gb/s @ 1.05V/0.9V (RTX 5080의 30 Gb/s 초과)
- 비트 밀도 0.412 Gb/mm² (Samsung 1b의 0.309 Gb/mm² 대비)
- GDDR7은 LPDDR5X 대비 약 70% 밀도 (주변회로 비중 ↑)

---

## Samsung 4F² COP DRAM (Paper 15.10)
- **Cell-on-Peripheral (COP) 아키텍처**
- 수직 채널 트랜지스터(VCT) + 상단 캐패시터
- 하이브리드 본딩으로 DRAM 노드 셀 + 로직 노드 주변회로 결합
- 핵심 회로 면적: **17.0% → 2.7%** (샌드위치 구조)
- 16Gb 다이, 10nm급 DRAM 프로세스
- 의의: 종래 3D DRAM 상용화 전망(2033~2034)을 앞당길 후보 아키텍처

---

## SanDisk/Kioxia BiCS10 NAND (Paper 15.1)
- **332 레이어**, 3 데크 구성
- 최고 밀도 **37.6 Gb/mm² (QLC)** — SK Hynix V9 대비 +30%
- 6-plane (1×6 방식), IO 대역폭 +50%
- CBA 아키텍처로 추가 상단 금속층으로 전력 공급 개선

---

## 기타 메모리 기술

### MediaTek xBIT Logic-based SRAM (Paper 15.2)
- 10-트랜지스터 셀(균형 NMOS/PMOS)
- 표준 8T 대비 22~63% 높은 밀도
- 읽기/쓰기 전력 −30%+, 누설 전력 −29%

### TSMC N16 MRAM (Paper 15.4)
- STT-MRAM, 자동차/산업용 비휘발성
- 듀얼포트(독립 R/W 동시), 51.2 Gb/s @ 200MHz
- 7.5ns 읽기, 비트셀 0.033 → 0.0249 µm² (−25%), 매크로 밀도 16.0 Mb/mm²

---

## 제조사 함의 (SemiAnalysis)

### Samsung
- 1c DRAM 수율: **2025년 약 50%** (점진적 개선 중)
- HBM4에서 경쟁사보다 우수한 성능·전력
- SF4 베이스다이 비용 우려

### SK Hynix
- N12 로직 프로세스로 저비용 추구
- HBM4 안정성 여전히 우위
- LPDDR6 저전압 효율은 Samsung 대비 낮음

### Micron
- 내부 CMOS 베이스다이 기술 (비용 경쟁)
- HBM3E 가격 압박
