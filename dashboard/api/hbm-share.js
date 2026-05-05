import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '../data')

export default function handler(_req, res) {
  try {
    const data = JSON.parse(readFileSync(join(DATA_DIR, 'hbm-share.json'), 'utf8'))
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
    res.json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
