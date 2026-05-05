import { AUTO_UPDATE_HANDLERS } from '../_lib/handlers.js'

// Called by: frontend on mount (GET) + Vercel cron (GET, daily 09:00 KST)
export default async function handler(_req, res) {
  const results = {}
  for (const [id, fn] of Object.entries(AUTO_UPDATE_HANDLERS)) {
    try {
      const result = await fn()
      results[id] = { ...result, updatedAt: new Date().toISOString(), ok: true }
    } catch (e) {
      results[id] = { ok: false, error: e.message, updatedAt: new Date().toISOString() }
    }
  }
  res.setHeader('Cache-Control', 's-maxage=14400, stale-while-revalidate=86400')
  res.json(results)
}
