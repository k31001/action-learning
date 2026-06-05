import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { fetchHistory } from './yahoo.js'
import { fetchVastMedian, fetchVastBasket } from './vast.js'

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../data')

function readData(file) {
  return JSON.parse(readFileSync(join(DATA_DIR, file), 'utf8'))
}

export const AUTO_UPDATE_HANDLERS = {
  async bigtech_capex_growth() {
    const capex = readData('capex.json')
    const q = capex.quarterly
    if (q.length < 5) throw new Error('quarterly 데이터 부족')
    const latest  = q[q.length - 1]
    const yearAgo = q[q.length - 5]
    const growth  = +((latest.total - yearAgo.total) / yearAgo.total * 100).toFixed(1)
    return {
      value: growth,
      note: `${latest.period}($${latest.total}B) vs ${yearAgo.period}($${yearAgo.total}B) YoY`,
      source: '분기 실적 시드 데이터 자동 계산',
      isProxy: false,
    }
  },

  async samsung_hbm_share() {
    const hbm    = readData('hbm-share.json')
    const latest = hbm.data[hbm.data.length - 1]
    return {
      value: latest.samsung,
      note: `최신 분기: ${latest.period} | SK하이닉스 ${latest.skhynix}% | 마이크론 ${latest.micron}%`,
      source: 'TrendForce 집계 시드 데이터',
      isProxy: false,
    }
  },

  async hbm_spot_price_change() {
    const hist  = await fetchHistory('NVDA')
    const h     = hist.history
    const cur   = h[h.length - 1]
    const sixMo = h[Math.max(0, h.length - 26)]
    const change = +((cur.close - sixMo.close) / sixMo.close * 100).toFixed(1)
    return {
      value: change,
      note: `NVDA ${sixMo.date}→${cur.date}: $${sixMo.close}→$${cur.close}`,
      source: 'Yahoo Finance (NVDA 6개월 프록시)',
      isProxy: true,
    }
  },

  async nvidia_hbm_order_change() {
    const hist  = await fetchHistory('NVDA')
    const h     = hist.history
    const cur   = h[h.length - 1]
    const thrMo = h[Math.max(0, h.length - 13)]
    const change = +((cur.close - thrMo.close) / thrMo.close * 100).toFixed(1)
    return {
      value: change,
      note: `NVDA ${thrMo.date}→${cur.date}: $${thrMo.close}→$${cur.close}`,
      source: 'Yahoo Finance (NVDA 3개월 모멘텀 프록시)',
      isProxy: true,
    }
  },

  // AI-DC 신용 스프레드 proxy: HYG(HY 회사채 ETF) 6개월 역행·듀레이션 환산(bps)
  // 가격↓ = 스프레드↑. HY 듀레이션 ~3.4 → 1% 가격변동 ≈ 29bps (계수 2900).
  async ai_dc_credit_spread() {
    const { history: h } = await fetchHistory('HYG')
    if (!h?.length) throw new Error('HYG 데이터 없음')
    const cur   = h[h.length - 1]
    const sixMo = h[Math.max(0, h.length - 26)]
    const ret   = (cur.close - sixMo.close) / sixMo.close
    const bps   = Math.round(-ret * 2900)
    return {
      value: bps,
      note: `HYG ${sixMo.date}→${cur.date}: $${sixMo.close}→$${cur.close} → ${bps > 0 ? '+' : ''}${bps}bps (광의 HY·금리 영향 포함)`,
      source: 'Yahoo Finance (HYG 6개월 역행·듀레이션 환산 프록시)',
      isProxy: true,
    }
  },

  // GPU 현물 임대가 — Vast.ai AI GPU 바스켓(H100 SXM 0.5 / H200 0.5) 중앙값 $/GPU·h
  // (실측, 프록시 아님). 바스켓으로 H100 단독 박한 유동성 안정화. 매일 누적되어 추세 형성.
  async gpu_rental_h100_usd() {
    const b = await fetchVastBasket()
    const h100 = b.byGpu['H100 SXM'], h200 = b.byGpu['H200']
    return {
      value: b.basket,
      note: `AI GPU 바스켓 $${b.basket}/GPU·h (H100 SXM $${h100?.median ?? '-'}·n${h100?.n ?? 0} / H200 $${h200?.median ?? '-'}·n${h200?.n ?? 0})`,
      source: 'Vast.ai 공개 오퍼 API (H100 SXM·H200 바스켓 on-demand 중앙값)',
      isProxy: false,
    }
  },

  // GPU 현물 공급 — Vast.ai 가용 on-demand 오퍼 수(H100/H200). 증가 = 컴퓨트 현물 공급 완화
  async gpu_supply_offers() {
    const b = await fetchVastBasket()
    return {
      value: b.count,
      note: `Vast.ai 가용 on-demand 오퍼 ${b.count}건 (H100 SXM/H200/H100 NVL). 증가 = 현물 공급 완화`,
      source: 'Vast.ai 공개 오퍼 API (가용 오퍼 수)',
      isProxy: false,
    }
  },
}
