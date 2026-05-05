import express from 'express'
import cors from 'cors'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import cron from 'node-cron'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_DIR = path.join(__dirname, '.cache')
if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true })

const app = express()
app.use(cors())
app.use(express.json())

// ── Cache ─────────────────────────────────────────────────────────────────────
const CACHE_TTL_HOURS = 4

function cacheGet(key) {
  const file = path.join(CACHE_DIR, `${key}.json`)
  if (!existsSync(file)) return null
  try {
    const { data, ts } = JSON.parse(readFileSync(file, 'utf8'))
    if ((Date.now() - ts) / 3_600_000 > CACHE_TTL_HOURS) return null
    return data
  } catch { return null }
}

function cacheSet(key, data) {
  writeFileSync(path.join(CACHE_DIR, `${key}.json`), JSON.stringify({ data, ts: Date.now() }))
}

// ── Yahoo Finance v8 REST API (unofficial, no key needed) ─────────────────────
const YF_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'application/json',
  'Accept-Language': 'en-US,en;q=0.9',
}

async function yfFetch(url) {
  const res = await fetch(url, { headers: YF_HEADERS })
  if (!res.ok) throw new Error(`Yahoo Finance: HTTP ${res.status} for ${url}`)
  return res.json()
}

async function fetchHistory(symbol, yearsBack = 5) {
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

  const data = {
    symbol,
    currency: meta.currency,
    history,
    fetchedAt: new Date().toISOString(),
  }
  cacheSet(cacheKey, data)
  return data
}

async function fetchCurrentQuotes() {
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

// ── Symbol metadata ───────────────────────────────────────────────────────────
const SYMBOLS = ['NVDA', 'MU', '000660.KS', '005930.KS', 'SMH']
const SYMBOL_META = {
  NVDA: { nameKo: 'NVIDIA', role: 'AI 인프라 수요 지표', color: '#76b900', group: 'demand' },
  MU: { nameKo: '마이크론', role: '메모리 경쟁 지표', color: '#e85d26', group: 'memory' },
  '000660.KS': { nameKo: 'SK하이닉스', role: 'HBM 경쟁사', color: '#e8192c', group: 'memory' },
  '005930.KS': { nameKo: '삼성전자', role: '삼성전자 주가', color: '#1428a0', group: 'memory' },
  SMH: { nameKo: '반도체 ETF (SMH)', role: '섹터 전반 지표', color: '#8b5cf6', group: 'sector' },
}

// ── Routes ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true, time: new Date().toISOString() }))

app.get('/api/stocks/current', async (_req, res) => {
  try { res.json(await fetchCurrentQuotes()) }
  catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/stocks/history/:symbol', async (req, res) => {
  const sym = decodeURIComponent(req.params.symbol)
  if (!SYMBOL_META[sym]) return res.status(404).json({ error: 'Unknown symbol' })
  try { res.json(await fetchHistory(sym)) }
  catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/capex', (_req, res) => {
  res.json(JSON.parse(readFileSync(path.join(__dirname, 'data/capex.json'), 'utf8')))
})

app.get('/api/hbm-share', (_req, res) => {
  res.json(JSON.parse(readFileSync(path.join(__dirname, 'data/hbm-share.json'), 'utf8')))
})

// ── Cache warm-up ─────────────────────────────────────────────────────────────
async function warmCache() {
  console.log('[EWI] Warming cache…')
  for (const sym of SYMBOLS) {
    try { await fetchHistory(sym); console.log(`[EWI] ✓ ${sym}`) }
    catch (e) { console.warn(`[EWI] ✗ ${sym}: ${e.message}`) }
  }
  try { await fetchCurrentQuotes(); console.log('[EWI] ✓ quotes') }
  catch (e) { console.warn('[EWI] ✗ quotes:', e.message) }
}

cron.schedule('0 */4 * * *', warmCache)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`[EWI] API server on :${PORT}`)
  warmCache().catch(console.warn)
})
