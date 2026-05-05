import { fetchHistory, SYMBOL_META } from '../../_lib/yahoo.js'

export default async function handler(req, res) {
  const { symbol } = req.query
  if (!SYMBOL_META[symbol]) return res.status(404).json({ error: 'Unknown symbol' })
  try {
    const data = await fetchHistory(symbol)
    res.setHeader('Cache-Control', 's-maxage=14400, stale-while-revalidate=86400')
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
