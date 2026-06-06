---
type: strategy
last_reviewed: 2026-06-06
sources: [wiki/concepts/demand-inflection-ewi.md, wiki/concepts/ai-datacenter-buildout.md]
---

# RS-9 · 데이터 기반 수요 변곡 센싱 (Demand-Inflection Sensing)

> **불변전략** — 5개 시나리오 모두에서 가치. "지을 능력·끌 능력"(RS-1)과 "절제할 능력"(RS-5)을 *언제* 발동할지를 데이터로 타이밍하는 센싱 계층.

메모리는 공급발·수요발 양쪽에서 사이클이 깨진다. RS-9는 **하락 변곡을 경쟁사보다 먼저** 잡아 RS-1(캐파 on/off)·RS-5(재무 규율)를 제때 발동시키는 정보 자산화 전략이다.

---

## 1. 전제 (Premise)
- 메모리 다운사이클의 손실 대부분은 *타이밍 실패*(정점에서 증설, 하락에서 늑장 감산)에서 발생한다.
- AI 데이터센터 건설은 메모리 수요의 **6~24개월 선행 신호**이며, 하락 변곡은 인과 사슬(수요 청산가→돈→발주→착공→메모리)을 따라 전파된다 ([demand-inflection-ewi.md](../../concepts/demand-inflection-ewi.md), [ai-datacenter-buildout.md](../../concepts/ai-datacenter-buildout.md)).
- 단일 지표는 노이즈·오인 위험(예: CRWV 주가는 GPU 임대가가 아닌 지분 가치 추종)이 크므로 **앙상블 + 괴리(선행−끈적)** 로 본다.

## 2. 근거 데이터 (Evidence)
- **추적 파이프라인** 55.9GW·17개국, 2026 가동 ~23.7GW — 메모리 수요 가시성 ([ai-datacenter-buildout.md](../../concepts/ai-datacenter-buildout.md)).
- **수요 변곡 EWI**(2026-06): 복합 43(주의) / 선행 33·끈적 29·**공급 과잉 68(경계)**·**SCM 56(경계 근접)** / 괴리 +4. 실측 피드 — GPU 임대가 바스켓 ~$3.3(둔화)·신용 스프레드 −60bps·MU 슈퍼사이클 +7.6×.
- **정점 신호**: DRAM OPM > HBM OPM(Counterpoint Q4 2025)·리드타임 정점(언와인드 셋업)·HBM sold-out·LTA·선급금 = 더블오더링 셋업 ([price-trends.md](../../concepts/price-trends.md), [ai-server-demand.md](../../concepts/ai-server-demand.md)).

## 3. 추론 과정 (Logic Chain)
1. 착공(④)은 사슬 중간의 *끈적한* 지표 — 약정 건설은 수요가 식어도 진행되어 하락 탐지엔 느리다.
2. 따라서 착공보다 **왼쪽(①수요 청산가·②돈·③발주 미시)** 선행 신호가 먼저 꺾이는데 끈적(착공·메모리)이 아직 강하면, 그 **괴리가 곧 하락 전 대응 윈도우**다.
3. 이 윈도우에서 RS-1(LTA 없는 신규 캐파 동결)·RS-5(재고 −15%·자사주 보류·재투자 70%+)를 선제 발동하면, 다운사이클 진입 손실을 줄이고 회복기 우위를 확보한다.
4. 공급 과잉(⑥, bit 공급 vs 수요)은 별도 구조 축 — 공급발 하락도 동일 프로토콜로 대응.
5. **SCM 공급망 축(⑦)**은 사슬을 *횡단* — 발주와 셀스루의 괴리(가짜수요 갭)·할당 커버리지·업스트림 공급증분으로 더블오더링 언와인드를 ⑤메모리 재고가 움직이기 전 선포착. 채찍효과로 증폭된 "실체 없는 수요"가 풀리는 시점이 급락 방아쇠이므로, RS-1 캐파 동결·RS-5 재고 컷의 *가장 빠른* 트리거가 된다.

## 4. 결론 (시나리오별 가치)
- **A 황금 요새**: 디커플링이 만드는 수요 왜곡(서방 편중·중국 봉쇄)을 조기 식별.
- **B AI 르네상스**: 슈퍼사이클 정점을 선포착해 증설 타이밍 최적화(과잉 투자 회피).
- **C 기술 냉전**: 이중 충격 시 가장 빠른 캐파·재고 컷으로 생존 우위.
- **D 조용한 재편**: 다운사이클 변곡을 선행 관측 → cushion 조기 확보.
- **E 패러다임 전환**: 아키텍처 전환에 따른 수요 이동(HBM→3D DRAM/CXL)을 선감지.

→ **45셀(9×5) 가치 매트릭스에서 모두 긍정.** 연동: [RS-1](rs1-options-based-capacity.md)·[RS-5](rs5-financial-discipline-reinvestment.md). 의사결정 **D15**(조기경보 운영)·**D16**(정점 공급 규율). 트리거 `gpu_rental_collapse`·`dc_construction_cancellations`·`demand_inflection_divergence`.

## 5. 반박 가능성 검토 (Counter-argument Review)
- **"선행 신호는 노이즈가 커 오경보가 잦다"** → 단일 지표가 아닌 앙상블 + 괴리 2개 분기 연속 확인 후 발동(D15). 가동률·고객 재고 불투명은 인정 — 확실성이 아니라 *리드타임 최대화*가 목표.
- **"Vast.ai는 마켓플레이스 한정, 하이퍼스케일러 계약가가 아니다"** → 맞다. 방향성 barometer로만 사용하고, DXI 스팟·book-to-bill·CoWoS 등 보완 지표와 교차 확인.
- **"센싱만으로는 가치가 없다"** → RS-9는 단독 전략이 아니라 RS-1·RS-5의 *발동 타이밍* 계층. Cargill Black River($10B 정보 자산화)·ExxonMobil 역사이클 타이밍이 정보의 P&L 기여를 입증.

---

## 출처
- [wiki/concepts/demand-inflection-ewi.md](../../concepts/demand-inflection-ewi.md) — 인과 사슬·괴리·복합 위험·실측 피드
- [wiki/concepts/ai-datacenter-buildout.md](../../concepts/ai-datacenter-buildout.md) — DC 착공 55.9GW 파이프라인
- 대시보드: `Data Viz > 수요 EWI`·`AI DC` 탭, `dashboard/src/data/demandSignals.js`·`dataCenters.js`
