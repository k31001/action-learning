import { useState, useEffect, useCallback } from 'react'

const BASE = '/api'

function useFetch(url, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastFetched, setLastFetched] = useState(null)

  const fetch_ = useCallback(async () => {
    if (!url) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setData(await res.json())
      setLastFetched(new Date().toISOString())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps])

  useEffect(() => { fetch_() }, [fetch_])

  return { data, loading, error, lastFetched, refetch: fetch_ }
}

export function useCurrentQuotes() {
  return useFetch(`${BASE}/stocks/current`)
}

export function useStockHistory(symbol) {
  return useFetch(symbol ? `${BASE}/stocks/history/${encodeURIComponent(symbol)}` : null, [symbol])
}

export function useCapex() {
  return useFetch(`${BASE}/capex`)
}

export function useHbmShare() {
  return useFetch(`${BASE}/hbm-share`)
}

export function useApiHealth() {
  return useFetch(`${BASE}/health`)
}

export function useAutoUpdateAll() {
  return useFetch(`${BASE}/auto-update/all`)
}

export async function triggerAutoUpdate(indicatorId) {
  const res = await fetch(`${BASE}/auto-update/${encodeURIComponent(indicatorId)}`, { method: 'POST' })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}
