import { cacheGet, cacheSet } from './cache.js'

const YF_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
}

export const SYMBOLS = ['NVDA', 'MU', '000660.KS', '005930.KS', 'SMH', 'HYG']

export const SYMBOL_META = {
  NVDA:        { nameKo: 'NVIDIA',          role: 'AI 인프라 수요 지표', color: '#76b900', group: 'demand' },
  MU:          { nameKo: '마이크론',         role: '메모리 경쟁 지표',   color: '#e85d26', group: 'memory' },
  '000660.KS': { nameKo: 'SK하이닉스',      role: 'HBM 경쟁사',        color: '#e8192c', group: 'memory' },
  '005930.KS': { nameKo: '삼성전자',         role: '삼성전자 주가',      color: '#1428a0', group: 'memory' },
  SMH:         { nameKo: '반도체 ETF (SMH)', role: '섹터 전반 지표',    color: '#8b5cf6', group: 'sector' },
  HYG:         { nameKo: 'HY 회사채 ETF',   role: 'AI-DC 신용 여건',   color: '#f59e0b', group: 'credit' },
}

async function yfFetch(url) {
  const res = await fetch(url, { headers: YF_HEADERS })
  if (!res.ok) throw new Error(`Yahoo Finance: HTTP ${res.status}`)
  return res.json()
}

export async function fetchHistory(symbol, yearsBack = 5) {
  const cacheKey = `hist_${symbol.replace(/\./g, '_')}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const period2 = Math.floor(Date.now() / 1000)
  const period1 = period2 - yearsBack * 365 * 24 * 3600
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1wk&period1=${period1}&period2=${period2}&includeAdjustedClose=true`

  const json = await yfFetch(url)
  const result = json?.chart?.result?.[0]
  if (!result) throw new Error(`No chart data for ${symbol}`)

  const timestamps = result.timestamp
  const closes = result.indicators?.adjclose?.[0]?.adjclose ?? result.indicators?.quote?.[0]?.close ?? []
  const meta = result.meta
  const history = timestamps.map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().slice(0, 10),
    close: closes[i] != null ? +closes[i].toFixed(2) : null,
  })).filter(d => d.close != null)

  const data = { symbol, currency: meta.currency, history, fetchedAt: new Date().toISOString() }
  cacheSet(cacheKey, data)
  return data
}

export async function fetchCurrentQuotes() {
  const cacheKey = 'current_quotes'
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const results = await Promise.allSettled(
    SYMBOLS.map(async sym => {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=5d`
      const json = await yfFetch(url)
      const meta = json?.chart?.result?.[0]?.meta
      if (!meta) throw new Error(`No meta for ${sym}`)
      return {
        symbol: sym,
        ...SYMBOL_META[sym],
        price: meta.regularMarketPrice,
        prevClose: meta.chartPreviousClose,
        change: +(meta.regularMarketPrice - meta.chartPreviousClose).toFixed(2),
        changePct: +((meta.regularMarketPrice - meta.chartPreviousClose) / meta.chartPreviousClose * 100).toFixed(2),
        currency: meta.currency,
        high52w: meta.fiftyTwoWeekHigh,
        low52w: meta.fiftyTwoWeekLow,
      }
    })
  )

  const data = results.map((r, i) =>
    r.status === 'fulfilled' ? r.value : { symbol: SYMBOLS[i], error: r.reason?.message }
  )
  cacheSet(cacheKey, data)
  return data
}
