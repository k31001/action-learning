import { fetchCurrentQuotes } from '../_lib/yahoo.js'

export default async function handler(_req, res) {
  try {
    const data = await fetchCurrentQuotes()
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600')
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
