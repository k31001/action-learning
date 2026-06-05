import { cacheGet, cacheSet } from './cache.js'

// Vast.ai 공개 오퍼 API — GPU 현물 임대가 ($/GPU·h). 무인증이지만 WAF가
// 브라우저 헤더(Origin/Referer/UA)를 요구한다.
const VAST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  'Origin': 'https://cloud.vast.ai',
  'Referer': 'https://cloud.vast.ai/',
}

// 특정 GPU의 on-demand per-GPU 시간당 가격 통계(min·중앙값)
export async function fetchVastMedian(gpu) {
  const cacheKey = `vast_${gpu.replace(/\s+/g, '_')}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  const q = { verified: { eq: true }, rentable: { eq: true }, gpu_name: { eq: gpu }, type: 'on-demand', order: [['dph_total', 'asc']], limit: 256 }
  const url = 'https://console.vast.ai/api/v0/bundles/?q=' + encodeURIComponent(JSON.stringify(q))
  const res = await fetch(url, { headers: VAST_HEADERS })
  if (!res.ok) throw new Error(`Vast.ai: HTTP ${res.status}`)
  const json = await res.json()
  const perGpu = (json.offers || [])
    .map(o => o.dph_total / (o.num_gpus || 1))
    .filter(x => x > 0)
    .sort((a, b) => a - b)
  const n = perGpu.length
  const stat = n
    ? { gpu, n, min: +perGpu[0].toFixed(3), median: +perGpu[Math.floor(n / 2)].toFixed(3) }
    : { gpu, n: 0, min: null, median: null }
  cacheSet(cacheKey, stat)
  return stat
}

// AI 데이터센터 GPU 바스켓 — 유동성 보강: H100 SXM·H200·H100 NVL 풀링.
// 가격 바스켓은 고정 가중(H100 SXM 0.5 / H200 0.5)으로 H100 단독 박한 유동성을 안정화.
// count 는 가용 on-demand 오퍼 총수(현물 공급 barometer).
export async function fetchVastBasket() {
  const gpus = ['H100 SXM', 'H200', 'H100 NVL']
  const stats = []
  for (const g of gpus) {
    try { const s = await fetchVastMedian(g); if (s.n) stats.push(s) } catch { /* skip */ }
  }
  if (!stats.length) throw new Error('Vast.ai 바스켓 오퍼 없음')
  const byGpu = Object.fromEntries(stats.map(s => [s.gpu, s]))
  const W = { 'H100 SXM': 0.5, 'H200': 0.5 }
  let num = 0, den = 0
  for (const s of stats) { const wt = W[s.gpu] || 0; if (wt) { num += wt * s.median; den += wt } }
  const basket = den ? +(num / den).toFixed(3) : +(stats.reduce((a, s) => a + s.median, 0) / stats.length).toFixed(3)
  const count = stats.reduce((a, s) => a + s.n, 0)
  return { basket, count, byGpu }
}
