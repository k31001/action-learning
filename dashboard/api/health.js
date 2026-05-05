export default function handler(_req, res) {
  res.json({ ok: true, time: new Date().toISOString() })
}
