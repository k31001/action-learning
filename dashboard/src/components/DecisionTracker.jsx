import { useState } from 'react'
import { AlertCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react'

const DECISIONS = [
  {
    id: 'D1',
    title: 'HBM4 NVIDIA 점유율 회복',
    deadline: '2026-09-30',
    owner: '제조·연구',
    rationale: 'NVIDIA Rubin HBM4 점유율 28% → 40%+ 상향. 수율 90%+ 달성.',
    fallback: '2026.7까지 수율 85% 미달 시 TSMC 4nm 로직 다이 외주화',
    benchmark: 'Samsung 2022 역사이클 투자 모델',
    keyKpi: 'samsung_hbm4_yield',
  },
  {
    id: 'D2',
    title: '소재 공급망 비중국 다각화',
    deadline: '2026-09-30',
    owner: '제조',
    rationale: '희토류·게르마늄·갈륨 비중국 공급선 장기 계약, 6개월 비축',
    fallback: '캐나다·호주·카자흐스탄 광산 기업 LTA',
    benchmark: 'Maersk 통합 물류 전환 모델 (지역 분산)',
    keyKpi: null,
  },
  {
    id: 'D3',
    title: '3D DRAM R&D 조직 + IMEC 협약',
    deadline: '2026-12-31',
    owner: '연구',
    rationale: '전담 조직 200~300인 신설, IMEC 3년 공동 연구 ($200M)',
    fallback: '없음 (IMEC 외 대안 부재)',
    benchmark: 'Disney-Marvel 모델 — 기술 IP 사전 확보',
    keyKpi: '3d_dram_progress',
  },
  {
    id: 'D4',
    title: '텍사스 1단계 가동 + 2단계 발표',
    deadline: '2026-12-31',
    owner: '제조·전략기획',
    rationale: '1단계(2nm Foundry) Risk Production 가동 + HBM 전용 2단계 공식 발표',
    fallback: '2단계 미발표 시 마이크론·인텔 미국 HBM 거점 고착화',
    benchmark: 'Marriott 지역 분산 모델',
    keyKpi: 'taylor_phase2_announced',
  },
  {
    id: 'D5',
    title: 'AI 개발 효율화 도구 전사 도입',
    deadline: '2026-12-31',
    owner: '인사·연구',
    rationale: 'AI 코딩·EDA·공정 시뮬레이션·수율 예측 도구 전사 파일럿',
    fallback: '없음 (RS-2·RS-3 선행 조건)',
    benchmark: 'Nucor 변동비 구조 모델 (인력 효율화)',
    keyKpi: 'ai_dev_efficiency_adoption',
  },
  {
    id: 'D6',
    title: 'Robust RS-1·RS-4·RS-5 이사회 정책화',
    deadline: '2026-09-30',
    owner: '전략기획',
    rationale: '옵션형 캐파·LTA·재무 규율 + 다운사이클 capex 4조원/년 명문화',
    fallback: '없음 (이사회 정책 외 강제 메커니즘 없음)',
    benchmark: 'Nucor·ExxonMobil — 활동가 투자자 압박 방어',
    keyKpi: 'downcycle_capex_floor',
  },
  {
    id: 'D7',
    title: 'AI 잉여 인력 RS-2·RS-3 전환 배치',
    deadline: '2027-03-31',
    owner: '인사·사업기획',
    rationale: 'AI 도구 도입 직후 분기별 "전환 배치 엔지니어 수" 의무 보고',
    fallback: '없음 (RS-2·RS-3 실행의 기반)',
    benchmark: 'Nucor 분권화 경영 모델',
    keyKpi: null,
  },
  {
    id: 'D8',
    title: '텍사스 2단계 CHIPS Act 추가 보조금',
    deadline: '2026-12-31',
    owner: '전략기획·마케팅',
    rationale: '1단계 $4.745B 외 별도 협상 + Tesla 외 미국계 빅테크 LTA 사전 체결',
    fallback: '추가 보조금 미확보 시 합작투자(JV) 모델 (샌디스크+키옥시아)',
    benchmark: 'ExxonMobil 활동가 압박 견딘 거버넌스',
    keyKpi: null,
  },
  {
    id: 'D9',
    title: '다운사이클 M&A 펀드 사전 적립',
    deadline: '2026-12-31',
    owner: '전략기획·M&A 팀',
    rationale: '5,000억 원 사전 적립 + 자동 트리거(EV/EBITDA <5배 6개월) + PMI 팀',
    fallback: '없음 (호황기에 적립해야 다운사이클 활용 가능)',
    benchmark: 'Disney-Marvel ($4B 인수, 10년 후 +$18B)',
    keyKpi: 'mna_target_undervalued',
  },
  {
    id: 'D10',
    title: 'NAND 공정 전환 주기 연장 R&D 4트랙 착수 (RS-6 신규)',
    deadline: '2026-12-31',
    owner: '메모리연구소·DS부문 패키징·Memory Solutions Lab',
    rationale: '양산 ramp 6개월 지연 = 누적 이익의 2/3 소실 (Weber/PSU 학습곡선). 업계 4사가 capa 확장→process upgrade로 일제히 선회 (TrendForce 2025-11). YMTC가 hybrid bonding 핵심 IP 지배 → 디커플링 시 라이선스 차단 리스크. 4트랙 병행: ① Hybrid Bonding 자체 IP (1.5조 원/3년 + 한국 IP 컨소시엄), ② Multi-deck 정교화 (V9→V10 fab 재구성 30% 절감), ③ bit-per-cell 확장 (QLC 30%+/2026, PLC 시제품/2028), ④ FDP·SCADA 호스트 협력 firmware (RS-3 SW 매출과 R&D 자원 공유)',
    fallback: '트랙 1 IP 개발 지연 시 한국 IP 컨소시엄(SK하이닉스 공동) 또는 정부 R&D 분리 트랙. 자체 IP 확보 실패 시 YMTC 라이선스 의존도 최대 50% 한도로 통제',
    benchmark: 'TSMC "Nx · Nx+ · Nx++" enhancement 패턴 — 노드 한 번에 3세대 활용. 메모리에 적용 시 V10 → V10+ → V10++ 점진 개선',
    keyKpi: 'nand_layer_cycle_months',
  },
  {
    id: 'D11',
    title: 'AI 인프라 수직 진출 — Stargate Korea 본 계약 + Neocloud Equity-for-Supply (SE-3 신규)',
    deadline: '2026-12-31',
    owner: 'DS·Samsung C&T·Samsung SDS·Samsung Heavy 컨소시엄',
    rationale: 'AI 가치사슬 마진 분포에서 NVIDIA DC 영업이익률 60.4%·하이퍼스케일러 33%로 메모리(슈퍼사이클 ~25%)는 "재료 공급자" 고착. 3-Tier 동시 착수: ① 지분 헷지 — Catalyst Fund/계열 VC로 CoreWeave-급 neocloud 1~3% + HBM equity-for-supply swap (5년 누계 $5~10B). ② AI Factory 파트너 — Stargate Korea LOI(2025-10) → DA 본계약, Electronics+C&T+SDS+Heavy 4사 컨소시엄 운영 협약, BTO/BOO 모델 (5년 누계 $15~25B). ③ 자체 캠퍼스 — 2029~2030 Hwaseong/Pyeongtaek 인접 50~100MW (Tier 3, 옵션). Big4 capex $630B(2026, +62%) 중 75%가 AI 인프라 — 메모리 매출 환원분 외 70%가 가치사슬 상류에 누적',
    fallback: 'Stargate Korea 본 계약 결렬 시 Tier 1만 유지, Tier 2는 한국 정부 Sovereign AI 인프라 수요 대상 재포지셔닝. 하이퍼스케일러 카니발리제이션 신호 발생 시 Tier 2 비-하이퍼스케일러(OpenAI·Anthropic·xAI·neocloud) 우선 타겟',
    benchmark: 'Marriott Asset-Light 모델 확장 (BTO/BOO 운영 수수료 P&L 추적) + Disney-Marvel 다운사이클 M&A (Tier 1 neocloud 지분 인수는 2027~2028 거품 조정 시 우선 집행)',
    keyKpi: null,
  },
  {
    id: 'D12',
    title: 'RS-8 구조화 매출 헷지 시범 도입 (Participating Forward + Slot/Price 분리, 신규)',
    deadline: '2026-12-31',
    owner: '전략기획·메모리영업·CFO 트레이딩 데스크 신설TF',
    rationale: '2025년 9~12월 16Gb DDR5 +297% 가격 점프(SoftwareSeni·Tom\'s Hardware) — 단순 고정가 LTA(RS-4)는 사이클당 50~100% 매출 기회 포기. 농수산업 100년 헷지(Cargill DDC + Black River $10B 정보 자산화) + 외환 50년 옵션(Participating Forward) + Cargill HTA 가격 분해 모델을 메모리에 압축 이식. 4트랙: ① Participating Forward 시범 — NVIDIA 또는 하이퍼스케일러 1~2사와 HBM4E 일부 물량(연 10~20%)에 Floor + 상방 50% 참여 구조. ② Wafer Slot Reservation HTA 모델 — 슬롯/가격 결정 분리 + Take-or-Pay + 선급금 산업 표준 템플릿화. ③ Tiered Pricing — 자동차·산업용·신흥 AI(SD-2 연계) 시장 구간별 차등 share. ④ Memory Trading Desk 신설 — 골드만/JP모건 commodity 트레이더 20~30인 + DRAMeXchange 기반 OTC 스왑. 단일 Floor 원칙(셰일 Three-way Collar 함정 회피) 이사회 정책 명문화',
    fallback: '트랙 1 시범 협상 결렬 시 트랙 2(Slot Reservation)·트랙 4(Trading Desk)만 우선 추진. 정보 자산화 단독으로도 RS-1·RS-5 Capex·Floor 정확도 향상 가치 충분',
    benchmark: 'Cargill DDC 포트폴리오 + Black River $10B (agri-hedging-to-memory-semi.md) / HTA·Basis Contract (Iowa State Extension) / Participating Forward (Statrys 2026, ResearchGate) / Tiered Pricing (Cargill 식품기업) / Southwest 1998~2008 누적 $3.5B 절감 → 2025 종료 (정기 재검토 교훈) / 셰일 Pioneer·Whiting 2014·2020 Three-way Collar 실패 (절대 모방 금지)',
    keyKpi: 'multi_year_fixed_price_share',
  },
]

function daysUntil(deadline) {
  const ms = new Date(deadline).getTime() - Date.now()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

function statusColor(days) {
  if (days < 0) return 'text-red-600 bg-red-100/30 border-red-800'
  if (days < 60) return 'text-orange-600 bg-orange-100/30 border-orange-800'
  if (days < 180) return 'text-amber-700 bg-amber-100/30 border-amber-800'
  return 'text-emerald-600 bg-emerald-100/30 border-green-800'
}

export default function DecisionTracker({ indicators }) {
  const [expanded, setExpanded] = useState(null)

  const indicatorMap = Object.fromEntries(indicators.map(i => [i.id, i]))

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-800">11개 즉시 결정 — 묶음 의결</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            모든 결정은 2026년 Q4 마감. 단일 결정으로 분리 불가.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-orange-600">
            <Clock size={12} /> D-{Math.min(...DECISIONS.map(d => daysUntil(d.deadline)))}
            <span className="text-zinc-500">최단 마감</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {DECISIONS.map(d => {
          const days = daysUntil(d.deadline)
          const colorClasses = statusColor(days)
          const isExpanded = expanded === d.id
          const linkedIndicator = d.keyKpi ? indicatorMap[d.keyKpi] : null

          return (
            <div
              key={d.id}
              className={`border rounded-lg p-3 transition-all ${colorClasses} ${isExpanded ? 'ring-2 ring-blue-500/40' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-bold tracking-wider opacity-70">
                  {d.id} · {d.owner}
                </span>
                <button
                  onClick={() => setExpanded(isExpanded ? null : d.id)}
                  className="text-zinc-500 hover:text-zinc-900"
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <h3 className="text-sm font-semibold text-zinc-900 mb-1.5 leading-snug">
                {d.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-zinc-500">마감</span>
                <span className="text-xs font-mono text-zinc-900">{d.deadline}</span>
                <span className={`text-xs font-bold ${days < 60 ? 'text-orange-600' : 'text-zinc-700'}`}>
                  D-{days}
                </span>
              </div>

              {linkedIndicator && (
                <div className="flex items-center gap-2 mb-2 px-2 py-1 rounded bg-black/30 text-[10px]">
                  <span className="text-zinc-500">연계 KPI:</span>
                  <span className="text-zinc-900">{linkedIndicator.name}</span>
                  {linkedIndicator.currentValue != null && (
                    <span className="font-mono text-amber-700 ml-auto">
                      {linkedIndicator.currentValue}{linkedIndicator.unit === '%' ? '%' : ` ${linkedIndicator.unit ?? ''}`}
                    </span>
                  )}
                </div>
              )}

              {isExpanded && (
                <div className="mt-2 pt-2 border-t border-zinc-300/50 space-y-2 text-xs">
                  <div>
                    <span className="text-zinc-500">근거: </span>
                    <span className="text-zinc-800">{d.rationale}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">비상 계획: </span>
                    <span className="text-zinc-700">{d.fallback}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">벤치마크: </span>
                    <span className="text-amber-700 italic">{d.benchmark}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg border border-amber-800/40 bg-amber-100/10">
        <div className="flex items-start gap-2">
          <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-amber-700">묶음 패키지로 의결 필요 — </span>
            <span className="text-zinc-700">
              D1(HBM4 점유율) ↔ D5(AI 도구) ↔ D7(잉여 인력 전환)은 직렬 의존. D4(텍사스 1·2단계) ↔ D8(추가 보조금)은 동시 처리 필수. D6(이사회 정책화)이 D9(M&A 펀드 적립)의 거버넌스 기반. D11(AI 인프라 수직 진출)은 D6(재무 규율)의 다운사이클 capex 하한과 충돌 점검 필요.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
