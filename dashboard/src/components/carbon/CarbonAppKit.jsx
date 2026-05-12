/* Carbon UI Kit — productive app reference recreation.
   Matches the design bundle's `ui_kits/carbon-app/index.html` in React.
   Header (48px gray-80) + Side nav (256px) + KPI tiles + data table + form. */

import { useState } from 'react'

const HEADER_TABS = ['Overview', 'Workloads', 'Observability', 'Settings']

const SIDENAV = [
  { section: 'Cluster',       items: ['Deployments', 'Pods', 'Services', 'Ingress', 'ConfigMaps'] },
  { section: 'Observability', items: ['Metrics', 'Logs', 'Traces'] },
  { section: 'Access',        items: ['Users', 'Roles', 'Audit log'] },
]

const KPIS = [
  { label: 'Healthy',           value: '18',  delta: '▲ 2 since yesterday', tone: 'up' },
  { label: 'Degraded',          value: '3',   delta: 'No change',           tone: 'flat' },
  { label: 'Failed',            value: '1',   delta: '▲ 1 in last hour',    tone: 'down' },
  { label: 'Avg p95 latency',   value: '142', unit: 'ms', delta: '▼ 8 ms',  tone: 'up' },
]

const ROWS = [
  { name: 'api-gateway',     cluster: 'prod-svl-01',   status: 'ok',   stext: 'Running',  rep: '4 / 4', cpu: '23%', mem: '612 MiB', upd: '2 min ago' },
  { name: 'auth-service',    cluster: 'prod-svl-01',   status: 'ok',   stext: 'Running',  rep: '3 / 3', cpu: '18%', mem: '484 MiB', upd: '14 min ago' },
  { name: 'billing-worker',  cluster: 'prod-rtp-02',   status: 'warn', stext: 'Degraded', rep: '2 / 3', cpu: '71%', mem: '1.2 GiB', upd: '3 min ago' },
  { name: 'media-encoder',   cluster: 'prod-rtp-02',   status: 'err',  stext: 'Failed',   rep: '0 / 2', cpu: '—',   mem: '—',       upd: 'now' },
  { name: 'nightly-batch',   cluster: 'batch-fra-01',  status: 'idle', stext: 'Idle',     rep: '0 / 0', cpu: '—',   mem: '—',       upd: '6 hr ago' },
  { name: 'search-indexer',  cluster: 'prod-svl-01',   status: 'ok',   stext: 'Running',  rep: '6 / 6', cpu: '34%', mem: '2.1 GiB', upd: '1 hr ago' },
]

const DOT = {
  ok:   'var(--cds-support-success)',
  warn: 'var(--cds-support-warning)',
  err:  'var(--cds-support-error)',
  idle: 'var(--cds-gray-50)',
}

export default function CarbonAppKit() {
  const [activeHeaderTab, setActiveHeaderTab] = useState('Overview')
  const [activeSideItem,  setActiveSideItem]  = useState('Deployments')

  return (
    <div className="carbon-scope bg-white border border-zinc-200 rounded-xl overflow-hidden">
      {/* Card frame header — matches other PreviewCards */}
      <div className="px-4 pt-3 pb-2 border-b border-zinc-100">
        <h3 className="text-sm font-semibold text-zinc-800">Productive app — full reference</h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Header (48px gray-80) · Side nav (256px) · KPI tiles (1px gap = gridline) · Full-bleed data table · Form panel
        </p>
      </div>

      {/* The Carbon shell — confined to this card */}
      <div style={{
        display: 'grid', gridTemplateRows: '48px 1fr',
        height: 720, fontFamily: 'var(--cds-font-sans)',
        color: 'var(--cds-text-primary)', background: 'var(--cds-background)',
      }}>
        {/* HEADER ------------------------------------------------------- */}
        <header className="cds-header">
          <button className="cds-header__hamburger" aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M4 6H28V8H4zM4 24H28V26H4zM4 12H28V14H4zM4 18H28V20H4z"/></svg>
          </button>
          <a className="cds-header__name" href="#" onClick={e => e.preventDefault()}>
            <b>IBM</b>&nbsp;Cloud Pak for Operations
          </a>
          <nav className="cds-header__nav">
            {HEADER_TABS.map(t => (
              <a key={t} href="#"
                 className={t === activeHeaderTab ? 'is-active' : ''}
                 onClick={e => { e.preventDefault(); setActiveHeaderTab(t) }}>
                {t}
              </a>
            ))}
          </nav>
          <div className="cds-header__actions">
            <button className="cds-header__action" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M29,27.5859l-7.5521-7.5521a11.0177,11.0177,0,1,0-1.4141,1.4141L27.5859,29ZM4,13a9,9,0,1,1,9,9A9.01,9.01,0,0,1,4,13Z"/></svg>
            </button>
            <button className="cds-header__action" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M28.7 19.3l-2.8-2.8V13a10 10 0 1 0-20 0v3.5L3.3 19.3 4 20H28zM12 24a4 4 0 0 0 8 0z"/></svg>
            </button>
            <button className="cds-header__action" aria-label="Account">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M16 4a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7 7 7 0 0 0-7-7zM26 30H24V25a5 5 0 0 0-5-5H13a5 5 0 0 0-5 5v5H6V25a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z"/></svg>
            </button>
          </div>
        </header>

        {/* BODY --------------------------------------------------------- */}
        <div style={{ display: 'grid', gridTemplateColumns: '256px 1fr', minHeight: 0 }}>
          {/* SIDE NAV -------------------------------------------------- */}
          <aside className="cds-sidenav">
            {SIDENAV.map(s => (
              <div key={s.section}>
                <div className="cds-sidenav__section">{s.section}</div>
                {s.items.map(item => (
                  <a key={item} href="#"
                     className={`cds-sidenav__item ${item === activeSideItem ? 'is-active' : ''}`}
                     onClick={e => { e.preventDefault(); setActiveSideItem(item) }}>
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </aside>

          {/* MAIN ------------------------------------------------------ */}
          <main style={{ padding: '32px 32px 64px', overflow: 'auto', background: 'var(--cds-background)' }}>
            <div style={{ fontSize: 12, color: 'var(--cds-text-secondary)', marginBottom: 8, display: 'flex', gap: 8 }}>
              <a href="#" style={{ color: 'var(--cds-link-primary)', textDecoration: 'none' }}>Workloads</a>
              <span style={{ color: 'var(--cds-text-helper)' }}>/</span>
              <a href="#" style={{ color: 'var(--cds-link-primary)', textDecoration: 'none' }}>prod-svl-01</a>
              <span style={{ color: 'var(--cds-text-helper)' }}>/</span>
              {activeSideItem}
            </div>
            <h1 style={{ fontWeight: 400, fontSize: 28, lineHeight: '36px', margin: '0 0 4px' }}>{activeSideItem}</h1>
            <p style={{ color: 'var(--cds-text-secondary)', fontSize: 14, margin: '8px 0 32px' }}>
              22 active across 3 clusters · Updated 12 seconds ago · {' '}
              <a href="#" style={{ color: 'var(--cds-link-primary)', textDecoration: 'none' }}>Refresh</a>
            </p>

            {/* KPI tiles — the 1px-gap gridline pattern */}
            <div className="cds-kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 32 }}>
              {KPIS.map(k => (
                <div key={k.label} className="cds-kpi">
                  <div className="cds-kpi__label">{k.label}</div>
                  <div className="cds-kpi__value">
                    {k.value}
                    {k.unit && <span style={{ fontSize: 16, color: 'var(--cds-text-secondary)' }}> {k.unit}</span>}
                  </div>
                  <div className={`cds-kpi__delta ${k.tone === 'up' ? 'up' : k.tone === 'down' ? 'down' : ''}`}>
                    {k.delta}
                  </div>
                </div>
              ))}
            </div>

            {/* Toolbar + Table */}
            <div style={{ border: '1px solid var(--cds-border-subtle-01)', marginBottom: 32 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 16, background: 'var(--cds-layer-02)', borderBottom: '1px solid var(--cds-border-subtle-01)',
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>All deployments</h2>
                <div style={{ display: 'flex', gap: 1 }}>
                  <button className="cds-btn cds-btn--ghost cds-btn--sm">Filter</button>
                  <button className="cds-btn cds-btn--ghost cds-btn--sm">Export</button>
                  <button className="cds-btn cds-btn--primary cds-btn--sm" style={{ paddingRight: 16 }}>Deploy new</button>
                </div>
              </div>
              <table className="cds-table">
                <thead>
                  <tr><th>Name</th><th>Cluster</th><th>Status</th><th>Replicas</th><th>CPU</th><th>Memory</th><th>Updated</th></tr>
                </thead>
                <tbody>
                  {ROWS.map(r => (
                    <tr key={r.name}>
                      <td><a href="#" style={{ color: 'var(--cds-link-primary)', textDecoration: 'none' }}>{r.name}</a></td>
                      <td className="cds-mono">{r.cluster}</td>
                      <td><span className={`cds-status cds-status--${r.status}`}><span className="dot" style={{ background: DOT[r.status] }} />{r.stext}</span></td>
                      <td>{r.rep}</td>
                      <td>{r.cpu}</td>
                      <td>{r.mem}</td>
                      <td>{r.upd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Form panel */}
            <div className="cds-panel" style={{ marginBottom: 32 }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, letterSpacing: '0.16px', textTransform: 'uppercase', color: 'var(--cds-text-secondary)' }}>
                Create deployment
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 720 }}>
                <div className="cds-field">
                  <label className="cds-label">Name</label>
                  <input className="cds-input" placeholder="my-service" />
                </div>
                <div className="cds-field">
                  <label className="cds-label">Image</label>
                  <input className="cds-input" defaultValue="registry.svl.ibm.com/team/api:v2.14" />
                </div>
                <div className="cds-field">
                  <label className="cds-label">Cluster</label>
                  <select className="cds-select">
                    <option>prod-svl-01</option><option>prod-rtp-02</option><option>batch-fra-01</option>
                  </select>
                </div>
                <div className="cds-field">
                  <label className="cds-label">Replicas</label>
                  <input className="cds-input" type="number" defaultValue={3} />
                </div>
                <div className="cds-field" style={{ gridColumn: '1 / -1' }}>
                  <label className="cds-label">Environment variables</label>
                  <textarea className="cds-textarea" placeholder="KEY=value, one per line" />
                  <span className="cds-helper">Injected at boot. Secrets should use ConfigMaps.</span>
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
                  <label className="cds-checkbox"><input type="checkbox" defaultChecked /><span className="cds-checkbox-box" />Enable autoscaling</label>
                  <label className="cds-checkbox"><input type="checkbox" /><span className="cds-checkbox-box" />Pin to dedicated nodes</label>
                  <label className="cds-toggle"><input type="checkbox" defaultChecked /><span className="cds-toggle-bar" />Production mode</label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 1, marginTop: 32 }}>
                <button className="cds-btn cds-btn--secondary" style={{ flex: 1, justifyContent: 'flex-start', paddingRight: 16 }}>Cancel</button>
                <button className="cds-btn cds-btn--primary"   style={{ flex: 1, justifyContent: 'flex-start', paddingRight: 16 }}>Create deployment</button>
              </div>
            </div>

            {/* Notifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="cds-notif cds-notif--error">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" style={{ color: 'var(--cds-support-error)', flexShrink: 0 }}>
                  <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm5.4,19.4L16,16l-5.4,5.4L9.2,20l5.4-5.4L9.2,9.2,10.6,8,16,13.4,21.4,8l1.4,1.4L17.4,14.8,22.8,20.2Z"/>
                </svg>
                <div>
                  <div className="cds-notif-title">media-encoder failed to start</div>
                  <div className="cds-notif-body">ImagePullBackOff — registry.svl.ibm.com returned 403. Verify pull-secret rotation.</div>
                </div>
              </div>
              <div className="cds-notif cds-notif--info">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" style={{ color: 'var(--cds-support-info)', flexShrink: 0 }}>
                  <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,6a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,16,8Zm4,17H13V23h2V15H14V13h3v10h3Z"/>
                </svg>
                <div>
                  <div className="cds-notif-title">Maintenance window scheduled</div>
                  <div className="cds-notif-body">May 18, 02:00–04:00 UTC. Rolling restarts only — no downtime expected.</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
