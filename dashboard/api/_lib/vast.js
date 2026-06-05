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
