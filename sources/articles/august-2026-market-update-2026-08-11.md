# 2026-08-11 정기 시장 점검 — 병목 모델 갱신 + Samsung/SK하이닉스 Q2 실적·HBM4 수율 + CXMT IPO·수출통제 확대 + 소비자 수요파괴

**수집일**: 2026-08-11
**수집 방법**: 4개 병렬 리서치 에이전트(전력/파운드리·패키징/HBM·DRAM시장/일반 종합) — semianalysis.com·counterpointresearch.com·techinsights.com 우선 참조 + PJM·ERCOT·FERC·TSMC·ASML IR·TrendForce·Counterpoint·Gartner·Reuters/Bloomberg/CNBC 등으로 보강
**신뢰도**: Medium-High. semianalysis.com 뉴스레터 서브도메인·pjm.com·ercot.com은 네트워크 egress 프록시가 직접 fetch를 차단해 검색 스니펫 기반(URL은 실재 확인). counterpointresearch.com·techinsights.com은 검색 결과로 일부만 접근. 저신뢰 SEO 사이트(siliconanalysts.com 등)는 배제.
**직전 병목 정기 점검**: 2026-07-04 (전력 72·CAPEX 40·파운드리 50·패키징 67)

---

## §1. 전력 — 물리적 병목 전원 악화 + 텍사스주 신규 초대형 부정적 이벤트

### 악화 신호
- **ERCOT 대형부하 접속 큐 410GW(4월) → 474GW(8월 3일)** — ERCOT 기록 최대 피크수요의 5배 이상, ~90%가 데이터센터. (utilitydive.com, 2026-08-03)
- **텍사스 주지사 Abbott, 전주(全州) 신규 데이터센터 그리드 접속 일시 중단(2026-08-03)** — ERCOT·PUCT에 전력·용수 사용 감사를 지시, ERCOT는 "Batch Zero" 대형부하 프로세스를 무기한 정지(완료 시한 미정). 7월 baseline에는 없던 완전히 새로운 정책 리스크. (houstonpublicmedia.org)
- BNEF: 텍사스 감사가 **49.8GW의 데이터센터 부하를 지연시키고 최대 $150억 비용**을 유발할 수 있다고 경고. (powermag.com, 2026-08)
- **GE Vernova 가스터빈 백로그 100GW(1분기) → 116GW(2분기 실적)** — 2029~2030년 슬롯 잔여 ~10GW뿐, "2030년까지 사실상 매진". (utilitydive.com, 2026-07 말)
- 트랜스포머 서브부품(라인하우젠 탭체인저 부싱, HV 트랜스포머 전체 스택의 게이팅 요소) 리드타임 **3~5년**. (semianalysis.com, 2026-06)
- **PJM 2027/28 용량경매 사상 최고가 $333.44/MW-day 낙찰**, 예비율 18.9%→14.8% 급락. 데이터센터가 용량비용의 ~40% 차지, PJM 권역 요금 2026년 +~15%. (utilitydive.com)
- SemiAnalysis Q3 2026 Energy Model: 미국 DC 전력수요 증가분 **21GW(2026)→84GW(2030)** vs 그리드 신뢰용량(ELCC) 증설은 **연 ~15GW뿐** — 복수 대도시권 접속 리드타임 7~10년. (semianalysis.com/energy-model, 2026-07-14)

### 완화 신호
- **FERC, 6개 RTO/ISO(PJM·MISO·SPP·CAISO·ISO-NE·NYISO)에 대형부하·co-location 요금제 개혁 강제 show-cause 명령(2026-06-18)**, 60일 시한(2026-08-17 마감) — 이번 갱신 시점 기준 아직 미확정.
- FERC, PJM의 **신속 접속 트랙("fast-track") 승인**(연 10건·250MW 이상·3년 내 가동). (2026-06-09)
- PJM 개편 큐(Transition Cycle 2)가 ~46GW로 압축, 2026년 말까지 전건 처리 예정. Cycle 1에 811개 신규 발전 프로젝트(220GW) 신청 — 가격 신호에 대한 공급측 반응.
- 하이퍼스케일러 원자력 PPA 누적 **~9.8GW**(13건, MS/Constellation TMI 재가동 등) — 대부분 2028년 이후 가동.

### 판정
물리적 병목(트랜스포머·터빈·큐 규모)은 전원 악화. 게다가 **텍사스 전주 접속 일시중단**은 7월 baseline에 없던 완전히 새로운 정책발 악화 벡터 — 최대 DC 성장주에서 규제 리스크가 물리적 희소성만큼 큰 변수로 부상. FERC 개혁은 구조적 완화 레버이나 효과는 8월 17일 이후 컴플라이언스 제출부터 가시화.

---

## §2. 파운드리 — 완화 추세 반전 신호 (기록적 실적·초장기 리드타임)

- **TSMC 7월 매출 NT$467.58B, YoY +44.7%·MoM +5.6%, 사상 최고** (2026-08-10, TSMC IR/Digitimes)
- TSMC 2분기 실적: 매출 $40.2B(+36% YoY)·매출총이익률 67.7%·**2026 CAPEX $60~64B로 상향**·연간 성장 가이던스 40%+ 상향·3분기 가이드 $44.6~45.8B (2026-07-16, TSMC 실적발표)
- **N2/A16 리드타임 78~156주로 보도**, 두 노드 모두 2027~2028년까지 예약 완료. N3 신규 프로젝트 수주가 N2 고객 유도를 위해 일부 중단됐다는 보도(Tom's Hardware).
- ASML 2분기: 순매출 €9.3B·매출총이익률 54%, "2027년 필요 주문을 거의 다 확보", 2027년 EUV 캐파 2026 대비 ~30% 증설 + 2028년 추가 ~30% 검토 중, High-NA EUV가 Intel에서 실사용 진입. (2026-07-15/16, ASML IR)

**판정**: 지난 3개 분기 연속 완화(56→54→52→50) 추세가 **반전** — 기록적 매출·CAPEX 상향·초장기 리드타임(78~156주)이 동시에 확인됨. ASML 캐파 증설은 2027~28년 효과라 단기 완화 요인 아님. 지정학(대만 집중) 관련 신규 악화 이벤트는 확인되지 않음(중립 유지).

## §3. 패키징 — 혼조 (삼성 HBM4 수율 도약 vs CoWoS·기판 타이트 지속)

- **삼성 HBM4 수율 ~80%("golden yield") 도달** — 2월 양산 개시 시 <60%에서 4개월 조기 목표 달성, HBM4E 수율도 70%+ 돌파. UBS는 2027년 삼성이 SK하이닉스를 제치고 HBM 1위(41% vs 39%) 가능성 제시. (TrendForce·BigGo Finance, 2026-08-08~10)
- 반대 신호: **NVIDIA·AMD가 Rubin Ultra의 HBM 구성을 12-Hi/288GB에서 8-Hi/192GB로 하향 검토** — HBM4/HBM4E 공급 타이트·검증 불확실성이 원인 (TechTimes·BigGo Finance, 2026-08-05).
- TSMC CoWoS **"완전 가동" 확인, 리드타임 52~78주** — 연말 목표 캐파는 12.5만~13만 장/월(2025년 말 ~7.5만 장/월 대비 확대)로 확대 중이나 여전히 fully booked. (2026-07-16 실적발표 동반 보도)
- **ABF 기판 공급 1H2026 재차 타이트, Ajinomoto(ABF 필름 점유율 95%+)가 3분기부터 가격 ~30% 인상**, Ibiden·Unimicron·Kinsus 2026 CAPEX 상향으로 대응 (신뢰도 중간, biggo.com).
- SK하이닉스 미국 첫 첨단 패키징 공장(인디애나, $39억) **8월 말 공식 착공**, 2028년 하반기 가동 목표 — 장기 완화 요인이나 근시일 효과 없음. (Digitimes, 2026-08-05)
- 하이브리드본딩 vs 마이크로범프 결정 및 CoPoS 일정은 상충 보도로 신뢰도 부족 — 이번 갱신에서 반영 보류.

**판정**: 완화 추세(72→70→68→67)가 **정체·소폭 반전**. CoWoS 리드타임·ABF 재타이트가 악화 요인, 삼성 HBM4 수율 도약이 상쇄 요인(다만 이는 "공급능력"이 아니라 "수율" — 공급사 간 재분배 성격이 강함). Rubin Ultra HBM 구성 하향 검토는 수요측이 공급 제약에 순응하기 시작했다는 신호로 병목이 실질적으로 여전히 taut함을 시사.

---

## §4. Samsung·SK하이닉스 2분기 실적 + HBM 시장구도

- **Samsung 2Q26**: 연결매출 171.5조 원(사상 최고, +28% QoQ), **DS부문 영업이익 89.2~89.5조 원**(YoY +1,814%). HBM4 매출이 3분기 QoQ 3배 성장 전망, 2H26 HBM 매출 중 HBM4 비중 60%+ 목표. HBM4E 샘플 업계 최초 고객 전달. (Samsung Newsroom, 2026-07-30~31)
- Samsung 2026 CAPEX **~$734억**, 이 중 ~$300억을 천안·평택 HBM 라인에 배정, 메가팹 공정 6개월 단축, 평택 파운드리 캐파 50%+를 인하우스 HBM4 베이스다이에 배정. (KED Global, 2026 상반기)
- Digitimes(2026-08-06): 4nm 파운드리 라인이 2027년까지 완전 예약되며 **삼성이 5nm 기반 HBM4 베이스다이를 고객에 제안**하기 시작 — 캐파 압박의 구체적 운영 신호.
- 갤럭시(MX) 사업부는 메모리 원가 상승 압박으로 **사상 첫 영업손실(-0.7조 원)** — 메모리 호황이 삼성 내부에서도 상류(DS)-하류(MX) 긴장을 만듦.
- **SK하이닉스 2Q26**: 매출 79.3조 원(+51% QoQ·+257% YoY), 영업이익 60.5조 원(영업이익률 76%). DRAM ASP +~30% QoQ·NAND ASP +중반 50%대 QoQ. HBM4 양산 출하 개시, 2H26 램프업 계획, 약 10건의 고객 LTA 체결. (SK hynix news, 2026-08-06)
- **SK하이닉스 나스닥 이중상장 완료**: ADR(티커 SKHY) 2026-07-10 거래 개시, ~$290억 조달(1,779만 신주), 상장 첫날 +13%·종가 $168.01, 07-13부터 정규거래. (CNBC)
- **Counterpoint 2Q26 DRAM 매출 점유율**: **삼성 39%(1위 탈환)·SK하이닉스 26%·Micron 25%** — SK하이닉스는 YoY 매출 +214%에도 점유율은 1년 전(39%)보다 하락. HBM 평균판가는 legacy HBM3E 가격 인하 + HBM4 출시 지연으로 YoY 하락. (Counterpoint, 2026-08-04)
- Vera Rubin HBM4 배정 추정(기존 트렌드 재확인, 신규 아님): SK하이닉스 ~60~70%·삼성 ~25~30%·Micron 잔여.

## §5. DRAM/NAND 가격 + 소비자 수요파괴(demand destruction)

- TrendForce 3분기 2026 전망: **서버 DRAM 계약가 +13~18% QoQ·NAND +10~15% QoQ** — 2분기(+58~63%) 대비 감속(소비자 지불한계·고기저효과). (2026-07-03/09)
- 대만 모듈업체 ADATA 실측 채널가는 TrendForce 전망보다 훨씬 높음: **DRAM +20~30%·NAND +35~40% QoQ**. (2026-07-08)
- Samsung, 3분기 DRAM ASP 추가 최대 20% 인상 시도(LPDDR은 20%+ 가능) 협상 중이라는 보도(TrendForce, 2026-07-03) — SK하이닉스는 장기계약 가격 상한(cap) 폐지, Micron은 가격 밴드(상하한) 유지로 3사 가격전략 분화.
- **SemiAnalysis "Memory Mania"**: 2026년 DRAM 가격이 2배 이상 상승 전망, HBM 수요 YoY +70%, HBM이 DRAM 웨이퍼의 ~23% 소비 — 2026년 내내 HBM 공급 부족 지속, 의미있는 신규 캐파는 2026년 말~2027-28년 전. (semianalysis.com, 2026 여름)
- **Gartner/IDC: 메모리값 급등이 2026년 PC 출하 -10.4%·스마트폰 -8.4%를 유발** 전망 — DRAM+SSD 합산가 연말까지 ~130% 급등, PC 가격 +17%·스마트폰 가격 +13% YoY. Dell·Lenovo·HP·Asus·Acer가 15~20% 가격 인상 또는 스펙 다운그레이드를 확인 — 10년 지속된 "스펙 민주화" 추세의 역전. (Gartner, 2026-02-26; TechRadar 등 후속)
- TechInsights 2Q26 메모리 기술 리뷰: 메모리 계층 분화(HBM=학습, GDDR/LPDDR=추론·엣지, DDR=시스템) + 300층+ NAND·하이브리드본딩 트렌드 확인.

**해석**: 서버·AI 축(HBM·서버 DRAM)은 가격 상승·타이트 지속이나, **소비자 축(PC·스마트폰)에서 최초로 명확한 수요파괴 신호**가 등장 — [demand-inflection-ewi.md](../../wiki/concepts/demand-inflection-ewi.md)의 조기경보 후보로 추가할 가치. 단, 서버/HBM 축이 전체 매출·이익의 압도적 비중을 차지해 구조 반전은 아님.

## §6. CXMT — 상하이 IPO + 美 "중국 군사기업" 지정

- **CXMT 상하이 STAR Market IPO(2026-07-16)**: RMB 295억(~$41~43억) 조달, 2026년 중국 A주 최대 IPO. 2030년까지 글로벌 DRAM 점유율 30% 목표, 6번째 메가팹 추진, 상하이 팹 2H26 완공 시 합산 캐파 ~35만 장/월 목표. (BusinessWorld·Tom's Hardware, 2026-07-16~27)
- **美 국방부, CXMT를 "중국 군사기업(Chinese Military Company)"으로 지정** — Reuters 보도에 따르면 Entity List 추가에 대한 부처간 승인도 진행 중(시행 대기). ASML 장비 접근은 이미 제한된 상태(18nm급 DRAM 상한). (EE Times Asia)
- 美 상무부/BIS, 중국 기업의 **해외 우회 GPU 임대를 통한 수출통제 회피 여부 재검토** 착수(2026-08-07, Bloomberg) — 2026년 1월 규정은 조건부 H200 대중 판매를 허용했던 터라 정책 방향이 재차 유동적.
- CHIPS Act: 2026-07-29 **$8.74억 R&D LOI 7개사와 체결**. 단 **FY2026이 CHIPS Act 인센티브 자금의 마지막 회계연도**이며, 35% 투자세액공제(ITC) 요건상 **2026년 12월 31일 전 팹 착공**이 필요 — 정책 절벽(policy cliff)으로 명확히 플래그. (NIST·CRS R49031)

**해석**: 중국 축(DF2 미중관계)에서 이번 창의 가장 중요한 신규 사실은 (a) CXMT의 자본시장 접근 확대(IPO로 자체 자금조달력 강화)와 (b) 美의 대응 강화(군사기업 지정·Entity List 검토)가 **동시에** 진행된다는 점 — 디커플링 압력과 중국의 독자 추격 역량이 함께 강화되는 구도. CHIPS Act 절벽은 미국 내 팹 투자 타이밍(삼성 테일러 등)에 대한 새 EWI 후보.

## §7. 기타 — 산업구조·수요 신호

- **Western Digital, Kioxia와 낸드 합병 재협상**(2026-07-22~26 보도) — 지분교환/스핀오프 구조 검토, WDC 주가 +8.9~12.5% 반응 후 되돌림. 성사 시 삼성·SK·Micron 규모에 맞먹는 4번째 NAND 대형 플레이어 등장 가능성. (SahmCapital·TradingKey)
- **OpenAI "Stargate" 메모리 LOI (삼성·SK하이닉스, 2026년 8월 초 보도)**: 월 최대 90만 장 DRAM 웨이퍼 스타트(완전 램프 시 글로벌 DRAM 생산의 ~40%) — **비구속적 LOI**이며 2026년 실제 인도 물량은 미미하다는 단서 병기. 한국 내 데이터센터 2곳("한국형 Stargate") 언급. 기존 [lta-to-sca-transition.md](../../wiki/concepts/lta-to-sca-transition.md)의 LTA→SCA 흐름과 동일 궤적이나 규모가 훨씬 큼 — 확률 가중 시 비구속성 유의. (Tom's Hardware·The Buildout)
- Micron FQ3 2026: 매출 가이드 $335억±7.5억·EPS $18.90±0.40·매출총이익률 ~81%, 16건 SCA가 향후 매출의 최대 절반 커버(take-or-pay+가격밴드), $220억+ 현금 커밋 — 2027년 이후까지 타이트 지속 전망.

---

## 원본 링크 (선별)

- https://www.utilitydive.com/news/texas-hits-pause-data-center-interconnections/827046/
- https://www.houstonpublicmedia.org/articles/news/energy-environment/2026/08/03/558529/gov-greg-abbott-pauses-new-data-centers-until-ercot-puct-audit-energy-water-usage/
- https://www.powermag.com/texas-audit-could-delay-49-8-gw-of-data-center-load-cost-projects-up-to-15-billion-bnef-warns/
- https://www.utilitydive.com/news/ge-vernova-gas-turbine-backlog-climbs-to-116-gw/826039/
- https://newsletter.semianalysis.com/p/stop-saying-half-of-2026-us-datacenter
- https://semianalysis.com/energy-model/
- https://www.utilitydive.com/news/pjm-interconnection-capacity-auction-data-center/808264/
- https://www.ferc.gov/news-events/news/ferc-launches-aggressive-targeted-action-speed-large-load-integration
- https://www.utilitydive.com/news/ferc-pjm-fast-track-expedited-interconnection-eit/822479/
- https://carnegieendowment.org/research/2026/06/beyond-the-hype-assessing-hyperscaler-nuclear-commitments-against-us-energy-realities
- https://pr.tsmc.com/english/news/3329
- https://www.investing.com/news/transcripts/earnings-call-transcript-tsmc-lifts-2026-outlook-as-ai-demand-stays-hot-in-q2-2026-93CH-4794777
- https://www.tomshardware.com/tech-industry/semiconductors/analyzing-tsmcs-fab-expansion-roadmap-multi-fab-n2-ramp-cowos-soic-and-uncorking-bottlenecks
- https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results
- https://www.trendforce.com/news/2026/08/10/news-samsungs-hbm4-yield-reportedly-hits-80-as-race-to-supply-vera-rubin-heats-up-sk-hynix-labor-talks-add-a-twist/
- https://www.techtimes.com/articles/323106/20260805/nvidia-rubin-ultra-ai-chip-may-deliver-less-hbm-rubin-forcing-procurement-replanning.htm
- https://www.digitimes.com/news/a20260805VL222/sk-hynix-packaging-plant-hbm-production.html
- https://counterpointresearch.com/en/insights/ai-demand-reshapes-dram-rankings-in-q2-2026
- https://news.samsung.com/global/samsung-electronics-announces-second-quarter-2026-results
- https://www.digitimes.com/news/a20260730VL220/samsung-hbm-hbm4-sales-dram.html
- https://www.digitimes.com/news/a20260806VL213/samsung-5nm-4nm-nvidia-hbm4.html
- https://news.skhynix.com/en/q2-2026-business-results/
- https://www.cnbc.com/2026/07/10/sk-hynix-skhy-stock-nasdaq.html
- https://www.trendforce.com/presscenter/news/20260703-13134.html
- https://www.trendforce.com/news/2026/07/03/news-samsung-reportedly-seeks-up-to-20-3q26-dram-price-increase-lpddr-hikes-may-exceed-20/
- https://www.trendforce.com/news/2026/07/08/news-memory-rally-extends-as-taiwan-module-maker-adata-reportedly-sees-q3-dram-prices-up-20-30-nand-up-35-40/
- https://newsletter.semianalysis.com/p/memory-mania-how-a-once-in-four-decades
- https://www.gartner.com/en/newsroom/press-releases/2026-02-26-gartner-says-surging-memory-costs-will-reduce-global-pc-and-smartphone-shipments-in-2026
- https://www.techinsights.com/blog/q2-2026-memory-technology-review-strategic-memory-intelligence-ai-era
- https://bworldonline.com/technology/2026/07/27/766111/what-is-cxmt-and-how-did-it-become-chinas-dram-champion/
- https://www.tomshardware.com/pc-components/dram/chinas-cxmt-targets-30-percent-dram-memory-market-share-by-2030-with-sixth-mega-fab-future-plans-bottlenecked-by-access-to-advanced-chipmaking-tools
- https://www.eetasia.com/cxmts-rise-chinas-memory-champion-challenging-global-leaders/
- https://www.bloomberg.com/news/articles/2026-08-07/us-reviews-china-s-offshore-access-to-nvidia-chips-after-ai-breakthroughs
- https://www.nist.gov/news-events/news/2026/07/department-commerce-announces-letters-intent-7-companies-874-million
- https://www.sahmcapital.com/news/content/why-western-digital-wdc-is-up-89-after-reviving-kioxia-flash-merger-talks-and-whats-next-2026-07-26-02
- https://www.tomshardware.com/pc-components/dram/openais-stargate-project-to-consume-up-to-40-percent-of-global-dram-output-inks-deal-with-samsung-and-sk-hynix-to-the-tune-of-up-to-900-000-wafers-per-month
- https://investors.micron.com/static-files/631b1a32-5537-46ae-8f40-82e42fc79dfe
