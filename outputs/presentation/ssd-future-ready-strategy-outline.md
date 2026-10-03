---
type: presentation-outline
status: v1.1 덱 (2026-10-03, 덱 v1.0 리뷰 반영). 생성기 outputs/presentation/scripts/generate_ssd_future_ready_pptx.py
deck: outputs/presentation/ssd-future-ready-strategy.pptx (v1.1, 미커밋 산출물 · 생성기로 재현)
report: outputs/report/ssd-future-ready-strategy-report.md (v1.2)
design: .claude/skills/samsung-memory-ppt-design-skill (v2.1: 11.J 근거 사슬, 20 × 11.25in, 본문 18pt+, 출처 15pt)
---

# 불확실성이 높은 미래에 대응하기 위한 고객 협력 전략: 4장 (덱 v1.1)

## v1.0 → v1.1 변경 (2026-10-03 사용자 리뷰)

| 지시 | 반영 |
|---|---|
| SCADA 완전 제거(논의하기 이른 시점) | 1장 GPU 512B 상자 · 2장 GPU 카드 · 3장 GPU 칩 · 4장 GPU I/O 줄 · TPAR 제거. 보고서 · 위키 후보 페이지에 "재검토 신호"만 남김 |
| 1장은 데이터 그래프로 근거 제시, 스킬에 명시 | 모든 구획 주장을 그래프로(근거 사슬). 디자인 스킬 v2.1 11.J 신설 · 프리플라이트 항목 · 패키지 재생성 |
| 하이퍼스케일러 데이터센터 종류별 스토리지 요구(범용 · AI · Muse · Dot 같은 에이전트) | **1장을 데이터센터 4종 비교로 재구성**: 범용 클라우드 · AI 학습 · AI 추론 · 에이전트(Meta Muse · OpenAI dots). 열마다 데이터 그래프 2개 → 요구 한 줄 → 기술 칩 |
| 2장 개념을 알기 쉽게, Blue는 하나 | Mixed Media = 슬롯 그림(캐시 SSD를 따로 +1 대 한 드라이브 안 pSLC +0), 고용량 = 같은 폼팩터 다이 격자(245TB 대 512TB, 고장 다이 · 패리티), 고DWPD = 수명이 섞인 블록(WAF ≈ 3) 대 수명별 블록(WAF ≈ 1) 그림 + 다이 120 → 47 |
| 3장에 실제 고객의 높은 DWPD 요구 팩트 | "셀이 견디는 쓰기(P/E 10만 → 1천)" 옆에 "고객 캐시가 쓰는 양(QLC 정격 0.6 · Meta 캐시 예산 3 · AI KV 실측 3.2 · Meta 스토리지 캐시 목표 7.2 DWPD)", 3칸 안 Meta CacheLib(쓰기 수요 = 수명 예산의 150% · ML 수용 정책 -44%) |
| 2TB · 30 DWPD에서 MLC 제거 | 막대 2개(SSD 혼자 약 120 · 고객 배치 정보 약 47)만 |
| 4장 첫 90일은 노트로 | 칩 줄 삭제, 열 캡션 복귀, 90일은 발표자 노트 |

## 제목 4개를 이어 읽으면

> SSD의 다음 수요는 하나로 정해지지 않으며, 데이터센터마다 스토리지에 요구하는 것이 다릅니다. SSD 안에서 풀 수 있는 기술은 지금처럼 준비하고, 고객 시스템과 함께 풀어야 하는 과제가 새로 나타나고 있습니다. 해법의 범위는 NAND에서 SSD로 넓어져 왔고, 새로 나타난 과제는 고객 시스템까지 넓어져야 풀립니다. 고객 시스템 안으로 들어가는 새로운 방식이 필요하므로, 전략 고객과 계약 · 사람 · 역량으로 함께 설계합니다. **실패할 수도 있는 기술에 투자하는 것이, 불확실한 미래에 실패하지 않는 불변 전략입니다.**

## 장별 주장 → 그래프 대조표 (근거 사슬 QA)

| 장 | 주장 | 그래프 · 데이터 |
|---|---|---|
| 1 | HBM의 교훈 | 점유율 슬로프: SK 50 → 62%, 삼성 40 → 17%(2022 → 2Q25) |
| 1 | 범용: 오래 쓰고 용량 중심 | 서버 내용연수 덤벨(Microsoft · Google · Meta · AWS) + 건물 15 → 25년 |
| 1 | AI 학습: 랙 공간 · 전력이 귀하다 | 랙 전력 로그 막대(11 · 40 · 약 130 · 1MW) + 체크포인트 5.7TB(산술) |
| 1 | AI 추론: 쓰기 요구가 엇갈린다 | DWPD 로그 막대(QLC 0.6 · KV 실측 3.2 · AI 전용 50~120) + 읽기 99.5% 100% 막대 |
| 1 | 에이전트: 문맥이 길고 상태가 남는다 | 요청당 KV 막대(채팅 0.5GB 대 에이전트 22GB, 산술) + 1시간+ 세션 18.8% |
| 2 | Mixed Media: 슬롯을 늘리지 않는다 | 슬롯 그림 +1 대 +0, 추가 슬롯 0개 · pSLC 19.2TB |
| 2 | 고용량: 같은 폼팩터 다이 ×2 | 다이 격자 245TB 대 512TB |
| 2 | 고DWPD: 고객 정보로 다이 -60% | 블록 그림(WAF ≈ 3 → ≈ 1) + 다이 막대 120 → 47 |
| 3 | 고객의 쓰기는 크고 셀 수명은 줄었다 | P/E 막대 + 고객 캐시 DWPD 막대 |
| 3 | 고객은 이미 자기 SW로 푼다 | Meta CacheLib 150% 대 100% 막대 + -44% |
| 3 | 3칸에서 WAF가 1에 닿는다 | WAF 3.22 → 1.03 |
| 4 | 계약 · 사람 · 역량 | 적층 · 순환 · 격자(승인된 v1.3 그림) |

## 판단 근거 (과제팀)

- (v0.3 기록) **GPU 직결을 옵션으로 넣는 이유**: 세그먼트 시장 추정이 없고(위키의 "$36B"는 AI 스토리지 전체 수치로 정정), NVIDIA 요구 사양 · cuFile 코드 · 실배치가 모두 아직이다 → 제품 베팅은 확률이 낮다. 반면 512B 상한은 매체 → 채널 → PCIe 순으로 걸리고, 채널 전송 단위 · 명령 처리 구조는 컨트롤러 세대 단위로 바뀐다 → 신호 뒤에 시작하면 한 세대 늦다. 1억 IOPS가 Gen7(2028)에 묶인다는 산술은 지금부터 2028 전까지가 준비의 창이라는 뜻이다. 마지막 병목(GPU 쪽 비용)은 고객과 함께 풀어야 하므로 Blue 묶음이다. 상세: [ssd-future-solution-candidates.md](../../wiki/concepts/ssd-future-solution-candidates.md), [ssd-scada-market-technical-review-2026-10.md](../../sources/articles/ssd-scada-market-technical-review-2026-10.md)
- **초고DWPD를 고DWPD 안의 운영점으로 두는 이유**: 같은 산식 · 지렛대 · 고객 소프트웨어라 따로 떼면 의제가 겹치고, 공개 신호가 아직 약해 독립 축은 확실성을 과장한다. 사내에서 2TB · 30 DWPD 고객 요구와 MLC 모드 P/E 약 2.6만 이상이 확인되면 독립 과제로 승격(신호 게이트). 상세: [high-dwpd-operating-point.md](../../wiki/concepts/high-dwpd-operating-point.md) §5.5, [ssd-ultra-high-dwpd-mlc-mode-2026-10.md](../../sources/articles/ssd-ultra-high-dwpd-mlc-mode-2026-10.md)

- **v1.1(2026-10-03)**: 사용자 결정으로 GPU 직결(SCADA)은 덱 · 보고서에서 제외, 2TB · 30 DWPD의 MLC 모드도 제외. 위 판단은 기록으로만 남긴다.
