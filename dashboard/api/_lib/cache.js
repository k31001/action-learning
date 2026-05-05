// In-memory TTL cache — persists within a warm Lambda instance lifecycle
const store = new Map()

export function cacheGet(key, ttlHours = 4) {
  const entry = store.get(key)
  if (!entry) return null
  if ((Date.now() - entry.ts) / 3_600_000 > ttlHours) return null
  return entry.data
}

export function cacheSet(key, data) {
  store.set(key, { data, ts: Date.now() })
}
