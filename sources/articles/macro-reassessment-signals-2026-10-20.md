# 거시 재평가 in-window 신호 스냅샷 — 2026-10-20

> 수집 목적: 2026-10-20 시나리오 포지션 맵·확률 정기 재평가의 근거 데이터. 직전 10-13 재평가가 "다음 DF1 확인점"으로 지목한 **빅테크 4사 Q3 2026 실적(10월 말)**은 여전히 미실현(이번 창 이후, 10월 하순 발표 예정). 이 파일은 불변 원장(append-only)이며, wiki/driving-forces/key-drivers.md·dashboard EWI가 이 스냅샷을 인용한다. git log 경로(10-13 이후 커밋)는 전부 발표·덱·모션·제품믹스 층 + ingest 1건(AI 추론 스토리지 EB 조사 = DF3/NAND)으로 신규 실현 외부 거시 사실 0건 → 포지션 맵·확률 무이동, 갱신은 EWI 웹 리서치 in-window 신호 기반.

---

## 0. git log 분석 (2026-10-13 재평가 이후)

10-13 재평가(v2.49.15) 이후 HEAD(v2.50.5)까지의 모든 커밋은 **발표·덱·모션·제품믹스 층** + ingest 1건(DF3/NAND):

- 발표 영상: 「FDP가 뭐야?」 30초→50초→1분 설명 영상 v1.1~v1.3(v2.49.16~v2.49.19)·「고객 협력 전략」 1~4장 5분 발표 영상 v1.0(대본·화면 효과 엔진·렌더러, v2.49.25)
- 발표자료 덱: 「DRAM 현실 파악」 한 장 시안 3종 + 간결형 3종(v2.49.20~v2.49.22)·「Fab 통합 운영」 덱 v2.2~v2.3(그림을 편집 가능한 도형으로, v2.49.23~v2.49.24)·「고객 협력 전략(SSD Future-Ready)」 덱 v5.4~v5.9(실행안·조직 장 추가/압축·4장 고객 전문가(고전가) Expert Group 제언, v2.50.0~v2.50.5)
- **ingest 1건**: AI 추론 하위 수요별 비트 수요(EB) 조사 원장(위키 §2.5, 2026-10-15) — KV 캐시만 EB 전망(SanDisk 2030 420EB)·Solidigm 1GW당 25EB 계층 분할·Kioxia 추론 CAGR 86% = **DF3/NAND 제품믹스(AI 스토리지) 리서치**로, 현재 AI 수요 강도·미중 정책에 대한 신규 실현 외부 거시 사실 아님. EWI(`enterprise_ssd_tam` 계열)로 반영

**판정**: git log 경로 신규 실현 외부 거시 사실 **0건** → 포지션 맵(DF1 8.5·DF2 0.5)·확률(A26·B39·C8·D21·E6) 무이동. 이번 사이클 갱신은 아래 웹 리서치 in-window 신호를 EWI·트리거에 반영.

---

## 1. [이번 창의 라이브 신호 — 후기순환 신용 tell 심화] AI 부채 디폴트 보험료 사상 최고

이번 창(10-14~10-20)의 가장 물질적인 신규 in-window 신호. 10-13의 Nvidia/Oracle CDS 경보가 **기록적 레벨로 심화**. 단 여전히 **수요 붕괴가 아닌 조달 구조·신용 경보** — 개별(idiosyncratic) 레버리지 네임에 집중, 광의 HY 스프레드는 시스템적 급확대 미관측.

- **Oracle 5년 CDS 사상 최고 ~288~295bps**(CNBC 10-19: 주 초 한때 300bps 터치 후 ~295bps·YoY +287%)·S&P 7월 BBB-로 강등(FY27 FCF 적자 ~$42B 전망)·장기부채 ~$118B 발행
- "AI 디폴트 보험료 사상 최고치"(roic.ai 10-15) — **CoreWeave 5년 CDS 1,000bps 초과·SoftBank ~424bps·SpaceX ~203bps** 모두 기록적
- **Nvidia 5년 CDS ~80~87bps**(7월 말 record ~82bps 이후 레인지) — 레버리지 네임 대비 **상대적으로 안정**(고객 지불능력에 연동)
- 2026 AI 관련 차입 ~$500B 가격결정·순환 부채 머신 ~$1.4T 프레임
- **조달 긴장 신호(쿨링)**: AI 관련 부채 발행이 9월 ~$23B로 6월 피크 $113B 대비 급감

출처:
- [CNBC — Oracle debt faces an AI stress test (2026-10-19)](https://www.cnbc.com/2026/10/19/oracle-debt-faces-an-ai-stress-test-why-some-investors-arent-worried-.html)
- [roic.ai — AI debt fears surge as tech default insurance hits record highs (2026-10-15)](https://www.roic.ai/news/ai-debt-fears-surge-as-tech-default-insurance-hits-record-highs-10-15-2026)
- [Securitas Global — Oracle CDS record 288 bps on AI debt](https://www.securitasglobal.com/risk-perspectives/oracle-cds-record-288-basis-points-ai-debt/)
- [Yahoo Finance — AI credit default insurance costs surge as investors assess data centre debt risks](https://finance.yahoo.com/markets/stocks/articles/ai-credit-default-insurance-costs-140727215.html)

**해석**: CapEx 자체는 상향·핸드투마우스(재고 없음)·메모리 2027까지 타이트라 **수요 붕괴(D 재배분)가 아닌 조달 구조·신용 경보**. 광의 HY 스프레드 6개월 변동 자체(`ai_dc_credit_spread` 값)는 여전히 급확대 미관측(경보 +150bps 여유)이고 스트레스가 레버리지 네임에 집중(Nvidia 상대 안정)이라 **미발동**. 송용호 관전 ②(FCF→대출→지분 매각→금융업체화) 체인의 실측 심화. EWI `ai_dc_credit_spread`·`demand_inflection_divergence`·`enterprise_ai_roi_proven` 감시 강화, 축 무이동.

---

## 2. [확증] Q4 2026 메모리 계약가 — 상승 지속(10-13 대비 무변화)

- 범용 DRAM 계약가 **QoQ +10~15%**, NAND **+15~20%**, HBM 포함 광의 DRAM **+15~20%**(TrendForce 09-30 릴리스, 10-13 스냅샷과 정합 — 이번 창 신규 릴리스 없음)
- 엔터프라이즈 SSD는 CSP 수요로 **유일하게 상승폭 가속** 카테고리
- 메모리 공급·캐파 2027까지 타이트 유지(PC용 캐파 비중은 2027 추가 축소)

출처:
- [TrendForce — AI server demand sustains memory contract price increases in 4Q26 (2026-09-30)](https://www.trendforce.com/presscenter/news/20260930-13258.html)
- [EffectStory — TrendForce 4Q26 DRAM +10–15%, NAND +15–20%](https://effectstory.com/en/articles/trendforce-4q26-dram-nand-contract-price-forecast-ai-server-demand-consumer-pres)

**해석**: 이미 DF1 8.5(후기순환 정점) 좌표의 재확인. 축 무이동.

---

## 3. [확증] 2027 빅테크 CapEx 컨센서스 — $1조+ 방향 유지, Q3 실적이 다음 확인점

- 2026 빅테크 4사 합산 CapEx ~**$720~745B(+77% YoY)**, 삭감 0건 유지(10-13 스냅샷 무변화)
- 2027 전망 $1.0~1.3T 드리프트 유지(Goldman ~$1.2T·S&P $1.3T·UBS 2026 $1.009T→2028 $1.619T)
- **다음 확인점**: 빅테크 4사 **Q3 2026 실적(10월 하순, 10-28~30경)** — CapEx 재가이던스가 다음 DF1 확인 이벤트. **이번 창(10-20)에서는 여전히 미실현**

출처:
- [gomarkets — Microsoft/Meta/Alphabet Q3 2026 earnings preview (AI ROI)](https://www.gomarkets.com/en-au/articles/us-earnings-q3-2026-big-tech-ai-roi)
- [Futurum — AI capex 2026: the $690B infrastructure sprint](https://futurumgroup.com/insights/ai-capex-2026-the-690b-infrastructure-sprint/)

**해석**: 가이던스 드리프트는 이미 정점(DF1 8.5)인 축의 재확인. Q3 실적이 다음 확인점이나 미실현 → 축 무이동.

---

## 4. [확증] GPU 임대가 — firming/flat, 붕괴 없음

- H100 임대가 ~$1.49~6.98/GPU-h(마켓플레이스 최저 ~$1.49·하이퍼스케일러 상단 ~$7)·H200 전문 클라우드 ~$2~4.45/GPU-h(중앙 ~$4.45, 12개월 +26%)·하이퍼스케일러 8-GPU 인스턴스 ~$7.91~10.60/GPU(최신 실측은 8월 데이터, 이번 창 신규 실측 미수집)
- 6개월 -35% 급락 신호 없음, 붕괴 아닌 firming

출처:
- [IntuitionLabs — H100 rental prices $1.49–$6.98/hr across 15+ clouds (2026)](https://intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison)
- [Beam — NVIDIA H200 pricing (median ~$4.45, +26% over 12 months)](https://www.beam.cloud/blog/nvidia-h200-pricing)

**해석**: 수요 변곡 최선행(Tier0) 지표 미발동. 실측 바스켓은 Vast.ai API 자동 갱신 우선.

---

## 5. [DF2 — 현상유지 재확인] 미중 반도체·MATCH·APEC

- **MATCH 법안**: 하원 외교위 통과(04-22, 20여 개 수출통제 법안 패키지의 일부) 후 **위원회·본회의 상정 단계 유지**, **본회의 표결·제정 없음**(하원 300표+ 발동 조건 미충족). 네덜란드·일본 150일 내 정렬 또는 미 일방 집행·ASML DUV 리소 및 설치 장비 서비스 차단 골격 불변
- 중국 상무부·외교부, MATCH를 "국제 경제·무역 질서 심각 교란"으로 비판 격화
- **다음 분기점 = APEC 11월·G20 12월** — 이번 창 신규 실현 정책 사실(타결·통과·통제) 없음

출처:
- [SCMP — China sharpens criticism of US chip-equipment bill (MATCH)](https://thenextweb.com/news/china-match-act-chip-bill-beijing-summit)
- [NBC News — Bill to ban sale of key AI chipmaking equipment to China (MATCH)](https://www.nbcnews.com/tech/tech-news/senate-bill-ban-sale-key-ai-chipmaking-machines-china-rcna265186)

**해석**: 포괄 반도체 타결·라이선스 언어 변경 없음, MATCH 미통과, 신규 통제 없음 → **관리된 공존(DF2 0.5) 재확인**. 양방향 트리거(`us_china_semiconductor_deal`·`match_act_passed`) 미발동.

---

## 6. [확증 — B 시간 리스크 지속] 삼성 HBM4 / NVIDIA 볼륨

- 삼성 NVIDIA향 HBM4 **볼륨(양산) 발주 확인서 여전히 미확보**(유상 평가 단계, 가장 신뢰할 수 있는 최신 보도는 7월 기준)
- Hankyung: 삼성 **12-Hi HBM4E가 9월 말 NVIDIA 인증 테스트 통과** 관측(삼성 자체 확인 거부) = 기술 진전이나 볼륨 전환 미확정
- NVIDIA는 3사(삼성·SK·Micron) Vera Rubin HBM4 인증 완료("판매할 권리"), 볼륨 배분은 애널리스트 추정(SK ~60~70%·삼성 ~25~30%·Micron 나머지) — 공식 미발표

출처:
- [Yahoo Finance — Nvidia certifies Samsung, SK Hynix and Micron for Vera Rubin HBM4](https://finance.yahoo.com/sectors/technology/articles/nvidia-certifies-samsung-sk-hynix-133001560.html)
- [wccftech — Samsung's 12-Hi HBM4E reportedly passes NVIDIA qualification](https://wccftech.com/samsungs-12-hi-hbm4e-reportedly-passes-nvidia-qualification-paving-way-for-next-gen-ai-gpu-supply/amp/)

**해석**: B 시나리오(관리된 공존 하 AI 지속)에서 삼성 HBM4 적기 볼륨 진입 리스크 지속 — 삼성 개별 실행 신호(DF3/NAND)라 거시 축 아님, EWI·트리거(`samsung_hbm4_nvidia_confirmed`)로 추적. 연말이 볼륨 전환의 시간 압박 관문.

---

## 종합 판정 (2026-10-20)

| 축 | 판정 | 근거 |
|---|---|---|
| **DF1 (AI 수요)** | **8.5 유지 — 정점 재확인** | Q4 메모리 +10~20%·2027 CapEx $1.0~1.3T 유지·GPU 임대가 firming. 이미 정점이라 신규 상방 레그 아님. 다음 확인점 빅테크 Q3 실적(10월 하순·이번 창 미실현) |
| **DF2 (디커플링)** | **0.5 유지 — 관리된 공존 재확인** | MATCH 본회의 미통과·신규 통제 없음·중국 비판 격화뿐. 다음 분기점 APEC 11월·G20 12월 |
| **시나리오 확률** | **A26·B39·C8·D21·E6 유지** | git log 경로 신규 실현 외부 거시 사실 0건. 신용 tell 심화(Oracle CDS 사상 최고 ~295bps·AI 디폴트 보험료 기록·CoreWeave 1,000bps+)는 수요 붕괴(D 재배분) 아닌 조달 구조·신용 경보 → EWI 반영, 상대 확률 무이동 |
| **트리거** | **발동 0건** | `us_china_semiconductor_deal`·`match_act_passed`·`apple_cxmt_approved`·`samsung_hbm4_nvidia_confirmed`·`enterprise_ai_roi_proven` 모두 미충족 |
