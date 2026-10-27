# 거시 재평가 in-window 신호 스냅샷 — 2026-10-27

> 수집 목적: 2026-10-27 시나리오 포지션 맵·확률 정기 재평가의 근거 데이터. 직전 10-20 재평가가 "다음 DF1 확인점"으로 지목한 **빅테크 4사 Q3 2026 실적(10월 하순)**이 이번 창에 **부분 실현** — **Meta가 10-21 발표**(4사 중 첫 타자), 나머지(MS·Alphabet 10-28·Amazon 10-29·SK하이닉스·삼성 Q3)는 창 직후(10-28~29)로 대기. 이 파일은 불변 원장(append-only)이며, wiki/driving-forces/key-drivers.md·wiki/scenarios/scenario-matrix.md·dashboard EWI가 이 스냅샷을 인용한다. git log 경로(10-20 이후 커밋)는 **0건**(HEAD이 10-20 재평가 커밋 자체)으로 신규 실현 외부 거시 사실 0건 → 포지션 맵·확률 무이동, 갱신은 Meta Q3 실현 + EWI 웹 리서치 in-window 신호 기반.

---

## 0. git log 분석 (2026-10-20 재평가 이후)

10-20 재평가 커밋(0a5a4bf, v2.50.6)이 **현재 HEAD** — 그 이후 **신규 커밋 0건**. 즉 git log 경로의 내부 산출물(소스 ingest·위키·덱·대시보드) 변경은 이번 창에 없음.

**판정**: git log 경로 신규 실현 외부 거시 사실 **0건** → 포지션 맵(DF1 8.5·DF2 0.5)·확률(A26·B39·C8·D21·E6) 무이동. 이번 사이클의 물질적 신규 in-window 사실은 (1) **Meta Q3 2026 실적 실현(10-21)** (2) **AI 신용 tell의 추가 심화**이며, 아래 §1~§6에서 EWI·트리거에 반영한다.

---

## 1. [이번 창 최대 실현 사실 — DF1 확인점 부분 실현] Meta Q3 2026 실적 (10-21)

10-20 재평가가 "다음 DF1 확인점"으로 지목한 빅테크 4사 Q3 실적 중 **Meta가 첫 타자로 10-21 발표** — 이번 창 내 실현된 외부 거시 사실. 핵심은 **CapEx 삭감 0건·2026 하한 상향·2027 공격적 시사**로 **DF1 정점 재확인**이나, 이미 정점(8.5)이라 신규 상방 레그가 아닌 재확인. **FCF 적자 지속**은 후기순환 FCF 다이버전스 tell 연속.

- **매출 $64.6B(+26% YoY)** — 광고 코어 견조
- **Q3 CapEx $34.9B**(Q2 $31B·전년 동기 $19.4B 대비 ~+80% YoY)
- **2026 CapEx 가이던스 $135~145B로 하한 상향**(직전 $130~145B에서 좁힘)
- **2027 CapEx**: 구체 수치 미제시("not providing a specific outlook for 2027 capex at this time")이나 **2027 내내 강한 매출 성장 지속·공격적 투자 유지** 시사 — 애널리스트 상향(Wedbush 2027 추정 $210B→$249B·Wells Fargo ~$250B)
- **FCF -$2.1B(적자)**·**$9.9B 법률 충당**으로 영업이익 $13.0B로 압박·**자사주 매입 0**

출처:
- [Fortune — Meta Q3: revenue surges 26% to $64.6B, AI spending turns screws on profit, FCF (2026-10-21)](https://fortune.com/2026/10/21/meta-q3-earnings-mark-zuckerberg-capex-muse/)
- [Meta Platforms Q3 2026 Earnings Call Transcript (2026-10-21)](https://www.fool.com/earnings/call-transcripts/2026/10/21/meta-meta-q3-2026-earnings-call-transcript/)
- [SEC — Meta Platforms Form 8-K exhibit 99.1 (FY2026 Q3)](https://www.sec.gov/Archives/edgar/data/0001326801/000162828026066700/meta-09302026xexhibit991.htm)

**해석**: 4사 중 첫 보고가 **삭감 0건·CapEx 하한 상향·2027 공격적**으로 DF1 정점을 재확인 — 이미 정점(8.5)이라 축 무이동. FCF 적자(-$2.1B) 지속은 수요 붕괴가 아닌 **후기순환 조달·FCF 다이버전스 tell**(`demand_inflection_divergence`·`bigtech_capex_growth` FCF 렌즈 연동). **다음 DF1 확인점 = 나머지 3사(MS·Alphabet 10-28·Amazon 10-29) + SK하이닉스·삼성 Q3(10-28경)** — 모두 창 직후.

---

## 2. [이번 창의 라이브 신호 — 후기순환 신용 tell 추가 심화] AI 부채 디폴트 보험료 기록 레벨 지속·확대

10-20의 "AI 디폴트 보험료 사상 최고"가 이번 창에 **추가 심화** — CoreWeave가 디스트레스 레벨(1,000bps+) 돌파·Oracle도 레코드 갱신. 단 여전히 **수요 붕괴가 아닌 조달 구조·신용 경보** — 스트레스가 개별(idiosyncratic) 레버리지 네임에 집중, 광의 HY 스프레드 시스템적 급확대 미관측.

- **CoreWeave 5년 CDS 1,000bps 초과·기록 레벨** — 10-21 ~1,065bps(CNBC/FactSet)·10-22 한때 ~1,167bps 피크(Benzinga/S&P Global, 12개월 데이터 중 최고)·순부채 ~$50B·일부 'Lehman' 언급(디스트레스 임계는 1,000bps 이상)
- **Oracle 5년 CDS ~304~308bps**(10-21 ~308bps·10-26 ~304bps, 10-20 창의 ~288~295bps에서 추가 확대·RPO ~$664B·S&P 7월 BBB-)
- **SpaceX ~203bps** 등 레버리지 네임 전반 기록적
- CNBC(10-22): "AI 부채·프랑스 국채 스트레스 테스트 — 아직 안 끝났을 수 있다" 프레임

출처:
- [CNBC — CoreWeave credit default swaps hit distress levels as investors sour on AI debt (2026-10-15)](https://www.cnbc.com/2026/10/15/coreweave-credit-default-swaps-hit-distress-levels-as-investors-sour-on-ai-debt.html)
- [CNBC — AI debt and French bonds face a stress test, why it may not be over (2026-10-22)](https://www.cnbc.com/2026/10/22/ai-debt-and-french-bonds-stress-test.html)
- [Benzinga — CoreWeave CDS record, some whispering 'Lehman' (2026-10)](https://www.benzinga.com/markets/bonds/26/10/62603452/coreweave-cds-record-lehman-default-risk)
- [TokenPost — CoreWeave and Oracle CDS spreads hit records as AI debt costs rise](https://www.tokenpost.com/news/investing/33690)

**해석**: CapEx 자체는 상향(Meta 하한 상향)·핸드투마우스(재고 없음)·메모리 2027까지 타이트라 **수요 붕괴(D 재배분)가 아닌 조달 구조·신용 경보**. 광의 HY 스프레드 6개월 변동 자체(`ai_dc_credit_spread` 값)는 여전히 시스템적 급확대 미관측(경보 +150bps 여유)·스트레스가 레버리지 네임에 집중(Nvidia 상대 안정) → **미발동**. 송용호 관전 ②(FCF→대출→지분 매각→금융업체화) 체인 실측 심화. EWI `ai_dc_credit_spread`·`demand_inflection_divergence`·`enterprise_ai_roi_proven` 감시 강화, 축 무이동.

---

## 3. [확증] Q4 2026 메모리 계약가 — 상승 지속(10-20 대비 무변화)

- 범용 DRAM 계약가 **Q4 QoQ ~+20%**(TrendForce), NAND·엔터프라이즈 SSD 강세 지속 — 10-20 스냅샷(DRAM +10~15%·NAND +15~20%)과 정합·방향 상향. 이번 창 신규 공식 릴리스는 없고 late-Oct 시장 보도(DRAM 랠리·2D NAND 가격 2~3배 스파이크)는 쇼티지 재확인
- 삼성·SK 2026 캐파 "사실상 완판"·메모리 공급 2027까지 타이트
- **SK하이닉스 Q3 실적 10-28·삼성 Q3 10-28경** — 창 직후 확인점

출처:
- [Astute Group — DRAM and NAND prices jump as Samsung, SK Hynix and Micron tighten supply](https://www.astutegroup.com/news/memory-shortages/dram-and-nand-prices-jump-as-samsung-sk-hynix-and-micron-tighten-supply/)
- [BuySellRam — 2D NAND prices spike 2–3x as Samsung, Micron, SK Hynix walk away](https://www.buysellram.com/blog/the-other-memory-crisis-2d-nand-prices-spike-2-3x-as-samsung-micron-and-sk-hynix-walk-away/)

**해석**: 이미 DF1 8.5(후기순환 정점) 좌표의 재확인. 축 무이동.

---

## 4. [확증] GPU 임대가 — firming/flat, 붕괴 없음

- H100 임대가 ~$1.49~6.98/GPU-h(마켓플레이스 최저 ~$1.49·하이퍼스케일러 상단 ~$6.98)·H200 ~$4.45~10.60/GPU-h(전문·하이퍼스케일러 범위) — 최신 실측은 8월 데이터(이번 창 신규 실측 미수집), firming/flat 레인지 유지
- 6개월 -35% 급락 신호 없음, 붕괴 아닌 firming

출처:
- [IntuitionLabs — H100 rental prices $1.49–$6.98/hr across 15+ clouds (2026)](https://intuitionlabs.ai/articles/h100-rental-prices-cloud-comparison)
- [Akash — NVIDIA H200 GPU guide 2026 (on-demand $4.45–$10.60/GPU-h, Aug 2026 API snapshot)](https://akash.network/the-bid/nvidia-h200-gpu-guide-2026-specs-benchmarks-pricing/)

**해석**: 수요 변곡 최선행(Tier0) 지표 미발동. 실측 바스켓은 Vast.ai API 자동 갱신 우선.

---

## 5. [DF2 — 현상유지 재확인] 미중 반도체·MATCH·APEC

- **MATCH 법안**: 하원 외교위 통과(04-22, 20여 개 수출통제 패키지의 일부) 후 **위원회·본회의 상정 단계 유지**, **본회의 표결·제정 없음**(하원 300표+ 발동 조건 미충족). 네덜란드·일본 150일 내 정렬 또는 미 일방 집행(FDPR 확대)·covered facilities(SMIC·Huawei·Hua Hong·CXMT·YMTC) 골격 불변. 이번 창 신규 실현 정책 사실(타결·통과·통제) 없음
- **APEC 분기점 정정**: 2025 APEC은 경주(10-31~11-1, Trump-Xi 회담 개최지)였고, **2026 APEC 정상회의는 중국이 선전(深圳)에서 11월 개최**(시진핑 발표). Trump는 2027년 4월 방중·Xi 후속 방미 의향 언급 — **다음 DF2 분기점 = APEC 11월(중국 선전)·G20 12월**
- 행정부(완화 쪽: H200 대중 라이선스 등) ↔ 의회(MATCH 강화)의 양갈래 지속

출처:
- [Korea Times — Why US chip controls took a back seat at Xi-Trump summit](https://www.koreatimes.co.kr/amp/world/20260927/why-us-chip-controls-took-a-back-seat-at-xi-trump-summit)
- [SCMP — Tech war: US Congress rolls out 'largest' export control upgrade against China (MATCH)](https://www.scmp.com/tech/article/3351199/tech-war-us-congress-rolls-out-largest-export-control-upgrade-against-china)
- [ETV Bharat — China to host next year's APEC summit in Shenzhen, says Xi Jinping](https://www.etvbharat.com/amp/en/international/china-to-host-next-year-apec-summit-in-shenzhen-says-xi-jinping-enn25110102973)

**해석**: 포괄 반도체 타결·라이선스 언어 변경 없음, MATCH 미통과, 신규 통제 없음 → **관리된 공존(DF2 0.5) 재확인**. 양방향 트리거(`us_china_semiconductor_deal`·`match_act_passed`) 미발동.

---

## 6. [확증 — B 시간 리스크 지속·타임라인 명시화] 삼성 HBM4 / NVIDIA 볼륨

- 삼성 NVIDIA향 HBM4 **볼륨(양산) 발주 확인서 여전히 미확보**
- **최신(10-27) 보도**: 삼성·SK하이닉스 **둘 다 8층 HBM4의 NVIDIA향 볼륨 출하를 2027년 2분기 목표로** 조정(Digitimes 10-27) — NVIDIA가 Rubin Ultra 메모리 구성(8-hi HBM4 vs HBM4E)을 재검토 중. 삼성 HBM4 미발주 상태에서 **AMD MI455X의 주 공급사**로 레버리지(계약 미발표)
- 삼성·SK **HBM 수출이 처음으로 50조 원 돌파**(Sammy Fans 10-27) = AI 수요 강세 재확인(삼성 실행 신호)

출처:
- [Digitimes — Samsung, SK Hynix eye 2Q27 shipments of 8-layer HBM4 to Nvidia (2026-10-27)](https://www.digitimes.com/news/a20261027VL215/samsung-sk-hynix-hbm4-shipments-nvidia.html)
- [Sammy Fans — AI demand boosts Samsung and SK Hynix as HBM exports cross 50 trillion won (2026-10-27)](https://www.sammyfans.com/2026/10/27/ai-demand-boosts-samsung-and-sk-hynix-as-hbm-exports-cross-50-trillion-won/)
- [Sammy Fans — Samsung using HBM4 supply as leverage to win AMD chip manufacturing business (2026-10-09)](https://www.sammyfans.com/2026/10/09/samsung-using-hbm4-supply-as-leverage-to-win-amd-chip-manufacturing-business/)

**해석**: B 시나리오(관리된 공존 하 AI 지속)에서 삼성 HBM4 적기 볼륨 진입 리스크 지속 — 삼성 개별 실행 신호(DF3/NAND)라 거시 축 아님, EWI·트리거(`samsung_hbm4_nvidia_confirmed`)로 추적. **볼륨 타임라인이 2027 Q2로 명시화**된 것은 B 시간 압박의 구체화. 연말이 볼륨 전환의 시간 관문.

---

## 종합 판정 (2026-10-27)

| 축 | 판정 | 근거 |
|---|---|---|
| **DF1 (AI 수요)** | **8.5 유지 — 정점 재확인(Meta Q3 실현)** | 4사 Q3 중 Meta 실현(10-21) = 삭감 0건·2026 CapEx 하한 상향·2027 공격적 시사. 이미 정점이라 신규 상방 레그 아님. Q4 메모리 +20%·GPU 임대가 firming·HBM 수출 50조 돌파. 다음 확인점 = 나머지 3사(10-28·10-29)·SK하이닉스·삼성 Q3(창 직후) |
| **DF2 (디커플링)** | **0.5 유지 — 관리된 공존 재확인** | 신규 실현 정책 사실 0건·MATCH 본회의 미통과·신규 통제 없음. 다음 분기점 APEC 11월(중국 선전)·G20 12월 |
| **시나리오 확률** | **A26·B39·C8·D21·E6 유지** | Meta Q3 실현은 이미 정점(8.5)인 축의 재확인이라 A↔B·→D 재배분 강제 안 함. 신용 tell 추가 심화(CoreWeave CDS 1,000bps+·Oracle ~304~308bps)는 수요 붕괴(D 재배분) 아닌 조달 구조·신용 경보 → EWI 반영, 상대 확률 무이동 |
| **트리거** | **발동 0건** | `us_china_semiconductor_deal`·`match_act_passed`·`apple_cxmt_approved`·`samsung_hbm4_nvidia_confirmed`(2027 Q2 타임라인·볼륨 미발주)·`enterprise_ai_roi_proven`·`bigtech_capex_cut25`(Meta 삭감 0건) 모두 미충족 |
