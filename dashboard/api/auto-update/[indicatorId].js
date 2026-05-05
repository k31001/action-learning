import { AUTO_UPDATE_HANDLERS } from '../_lib/handlers.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { indicatorId } = req.query
  const fn = AUTO_UPDATE_HANDLERS[indicatorId]
  if (!fn) return res.status(404).json({ error: `No handler for ${indicatorId}` })
  try {
    const result = await fn()
    res.json({ ...result, ok: true, updatedAt: new Date().toISOString() })
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message })
  }
}
