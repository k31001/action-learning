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

// ── Auto-update handlers for EWI indicators ───────────────────────────────────
const AUTO_UPDATE_HANDLERS = {
  // CapEx YoY: latest quarter vs 4 quarters ago from seeded data
  async bigtech_capex_growth() {
    const capex = JSON.parse(readFileSync(path.join(__dirname, 'data/capex.json'), 'utf8'))
    const q = capex.quarterly
    if (q.length < 5) throw new Error('quarterly 데이터 부족')
    const latest   = q[q.length - 1]
    const yearAgo  = q[q.length - 5]
    const growth   = +((latest.total - yearAgo.total) / yearAgo.total * 100).toFixed(1)
    return {
      value: growth,
      note: `${latest.period}($${latest.total}B) vs ${yearAgo.period}($${yearAgo.total}B) YoY`,
      source: '분기 실적 시드 데이터 자동 계산',
      isProxy: false,
    }
  },

  // Samsung HBM share: latest entry from seeded data
  async samsung_hbm_share() {
    const hbm = JSON.parse(readFileSync(path.join(__dirname, 'data/hbm-share.json'), 'utf8'))
    const latest = hbm.data[hbm.data.length - 1]
    return {
      value: latest.samsung,
      note: `최신 분기: ${latest.period} | SK하이닉스 ${latest.skhynix}% | 마이크론 ${latest.micron}%`,
      source: 'TrendForce 집계 시드 데이터',
      isProxy: false,
    }
  },

  // HBM 현물 가격 proxy: NVDA 6-month stock change
  async hbm_spot_price_change() {
    const hist = cacheGet('hist_NVDA')
    if (!hist?.history?.length) throw new Error('NVDA 캐시 없음 — 먼저 시장 데이터를 로드하세요')
    const h = hist.history
    const cur    = h[h.length - 1]
    const sixMo  = h[Math.max(0, h.length - 26)]   // ~26주 = 6개월
    const change = +((cur.close - sixMo.close) / sixMo.close * 100).toFixed(1)
    return {
      value: change,
      note: `NVDA ${sixMo.date}→${cur.date}: $${sixMo.close}→$${cur.close}`,
      source: 'Yahoo Finance (NVDA 6개월 프록시)',
      isProxy: true,
    }
  },

  // NVIDIA HBM order change proxy: NVDA 3-month momentum
  async nvidia_hbm_order_change() {
    const hist = cacheGet('hist_NVDA')
    if (!hist?.history?.length) throw new Error('NVDA 캐시 없음')
    const h = hist.history
    const cur    = h[h.length - 1]
    const thrMo  = h[Math.max(0, h.length - 13)]   // ~13주 = 3개월
    const change = +((cur.close - thrMo.close) / thrMo.close * 100).toFixed(1)
    return {
      value: change,
      note: `NVDA ${thrMo.date}→${cur.date}: $${thrMo.close}→$${cur.close}`,
      source: 'Yahoo Finance (NVDA 3개월 모멘텀 프록시)',
      isProxy: true,
    }
  },
}

// Run all auto-update handlers and store results
async function runAutoUpdates() {
  const results = {}
  for (const [id, handler] of Object.entries(AUTO_UPDATE_HANDLERS)) {
    try {
      const result = await handler()
      results[id] = { ...result, updatedAt: new Date().toISOString(), ok: true }
      console.log(`[EWI] auto-update ✓ ${id}: ${result.value}`)
    } catch (e) {
      results[id] = { ok: false, error: e.message, updatedAt: new Date().toISOString() }
      console.warn(`[EWI] auto-update ✗ ${id}: ${e.message}`)
    }
  }
  writeFileSync(path.join(CACHE_DIR, 'auto_updates.json'), JSON.stringify(results, null, 2))
  return results
}

// ── Routes: auto-update ───────────────────────────────────────────────────────
// GET all latest auto-update results (for frontend on load)
app.get('/api/auto-update/all', (_req, res) => {
  const file = path.join(CACHE_DIR, 'auto_updates.json')
  if (!existsSync(file)) return res.json({})
  try { res.json(JSON.parse(readFileSync(file, 'utf8'))) }
  catch { res.json({}) }
})

// POST trigger single auto-update (manual "업데이트" button)
app.post('/api/auto-update/:indicatorId', async (req, res) => {
  const { indicatorId } = req.params
  const handler = AUTO_UPDATE_HANDLERS[indicatorId]
  if (!handler) return res.status(404).json({ error: `No auto-update handler for ${indicatorId}` })
  try {
    const result = await handler()
    const all = existsSync(path.join(CACHE_DIR, 'auto_updates.json'))
      ? JSON.parse(readFileSync(path.join(CACHE_DIR, 'auto_updates.json'), 'utf8'))
      : {}
    all[indicatorId] = { ...result, updatedAt: new Date().toISOString(), ok: true }
    writeFileSync(path.join(CACHE_DIR, 'auto_updates.json'), JSON.stringify(all, null, 2))
    res.json({ ...result, ok: true, updatedAt: all[indicatorId].updatedAt })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
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

// 주가 캐시: 4시간마다
cron.schedule('0 */4 * * *', warmCache)

// EWI 지표 자동 업데이트: 매일 오전 9시 (KST = UTC+9, so 00:00 UTC)
cron.schedule('0 0 * * *', async () => {
  console.log('[EWI] Daily auto-update started')
  await runAutoUpdates()
  console.log('[EWI] Daily auto-update done')
})

const PORT = 3001
app.listen(PORT, async () => {
  console.log(`[EWI] API server on :${PORT}`)
  // Warm stock cache first, then run auto-updates (some depend on stock cache)
  await warmCache().catch(console.warn)
  await runAutoUpdates().catch(console.warn)
})
