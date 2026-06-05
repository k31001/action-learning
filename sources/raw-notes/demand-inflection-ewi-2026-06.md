# 메모리 수요 변곡 조기경보 — 방법론 참조 (2026-06-02 정리)

**목적**: DC 착공 추적을 보완해, 메모리 수요의 *하락 변곡*을 최대한 먼저 잡는 인과-사슬 선행지표 체계의 근거 정리.
**성격**: 상당 부분 분석 프레임워크(합성). 사실 앵커는 기존 위키 페이지 인용, 신규 참조는 아래 출처.
**파생**: [wiki/concepts/demand-inflection-ewi.md](../../wiki/concepts/demand-inflection-ewi.md), dashboard `Data Viz > 수요 EWI` 탭, EWI 5종 신설.

## 핵심 명제
- **DC 착공은 인과 사슬의 *중간*에 있는 끈적한(committed) 지표** — 미래 수요 규모엔 좋지만 *하락 변곡* 탐지엔 느림. 약정된 건설은 수요가 식어도 진행됨.
- 하락 신호는 사슬을 따라 →로 전파: **수요 청산가 → 돈 → 발주 미시 → 착공 → 메모리 내부**. 착공보다 *왼쪽*이 선행, *오른쪽(메모리 내부)* 미시신호가 매출/계약가보다 선행.
- 가장 정확한 조기탐지 = 단일 지표 아닌 **앙상블 + 괴리(선행 − 끈적) 탐지 + 공급 과잉 축**.

## 선행지표 계층 (선행도 순) + 참조
- **Tier0 수요 청산가격**: GPU 시간당 임대가/스팟가 (Vast.ai, RunPod, Lambda, SF Compute, CoreWeave; SemiAnalysis ClusterMAX). AI 컴퓨트 가동률(유휴 GPU). → 24~25 H100 임대가 대폭 하락(부족 완화)했다는 점이 컴퓨트 과잉의 실시간 신호.
- **Tier1 돈**: 빅4 capex 가이던스·"digestion" 언어 ([ai-capex.md](../../wiki/concepts/ai-capex.md)); AI-DC 파이낸싱·신용 스프레드 — capex 상당분이 부채·SPV·ABS(Meta–Blue Owl JV, Oracle 채권, CoreWeave/neocloud 부채, 사모신용). 착공 취소·연기(Abilene 600MW 철회, Stargate Norway OpenAI 이탈 — [ai-datacenter-buildout.md](../../wiki/concepts/ai-datacenter-buildout.md)).
- **Tier2 발주 미시구조**: 메모리 book-to-bill(SEMI 장비 포함); 리드타임 급변(단축=부족해소→과잉); 스팟-계약가 괴리(DRAMeXchange DXI, 스팟이 계약 주~월 선행); CoWoS 가동률(TSMC, HBM 직결).
- **Tier3 메모리 내부**: 재고일수(메모리사+고객+채널, 가격 하락 전 최선행); HBM vs 범용 DRAM 이익률 역전(기존 EWI dram_opm_vs_hbm_opm — DRAM OPM>HBM = 정점 신호, [price-trends.md](../../wiki/concepts/price-trends.md)); 전통 수요 스마트폰 -2.1% YoY(기존 EWI smartphone_shipment_yoy).
- **공급 과잉(구조적)**: bit 공급 증가율 vs 수요 증가율(3사 capex·웨이퍼 스타트·HBM 캐파). 메모리 하락은 공급발이 많음. CXMT 범용 공급(기존 cxmt_asp_gap, [cxmt.md](../../wiki/entities/cxmt.md)). 참조: [semiconductor-cycle.md](../../wiki/concepts/semiconductor-cycle.md).

## 샤프 드롭(급락) 메커니즘
- **더블오더링/불휩 언와인드**: 부족기 공포성 과잉발주(LTA·선급금) → 가용성 정상화 시 가짜 백로그 일시 증발. **"부족 신호의 정점"(리드타임·할당 정점)이 역설적으로 급락 셋업**. (현재 HBM sold-out·LTA·선급금이 바로 이 상태 — [ai-server-demand.md](../../wiki/concepts/ai-server-demand.md))
- **효율 혁신 에어포켓**: DeepSeek류 토큰당 컴퓨트 급감 → Jevons 미흡 시 수요 에어포켓 ([ai-demand-sustainability.md](../../wiki/concepts/ai-demand-sustainability.md)).
- **파이낸싱 프리즈 / capex digestion**: 대형 하이퍼스케일러 capex 컷 시그널 연쇄.

## 출처 (신규 참조)
- GPU 클라우드 가격: Vast.ai·RunPod·Lambda·SF Compute 공개 임대가; SemiAnalysis "ClusterMAX"/GPU cloud price tracking
- 스팟/계약 메모리 가격: TrendForce DRAMeXchange (DXI)
- book-to-bill: SEMI (장비), 각사 공시
- CoWoS/첨단패키징: TSMC 실적 코멘트, SemiAnalysis
- AI-DC 파이낸싱: Oracle/CoreWeave 채권 발행, Blue Owl–Meta Hyperion JV($27B), neocloud 부채, 사모신용 보도
- 메모리 BOM/수요: Morgan Stanley, Goldman Sachs, TrendForce, SK hynix 2026 outlook
- 불휩/더블오더링: 메모리 사이클 표준 개념 (UBS "LTA가 cyclicality 제거" 논쟁 포함 — counterpoint batch 노트)
- 사실 앵커: 기존 위키 페이지(ai-capex, ai-datacenter-buildout, semiconductor-cycle, price-trends, ai-server-demand, cxmt) 인용
