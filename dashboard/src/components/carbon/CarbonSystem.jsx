/* Carbon Design System — Showcase tab for the dashboard.
   Mirrors the design bundle's preview cards + the productive UI Kit.
   Source: github.com/carbon-design-system/carbon (@main)
   Bundle: claude.ai/design — zk6-H6nTI-cHZ7e5ruAPsw */

import { useState } from 'react'
import {
  Palette, Type, Layout, Award, AppWindow, Grid3x3, Activity,
} from 'lucide-react'
import './carbon.css'
import CarbonAppKit from './CarbonAppKit'

const SUB_TABS = [
  { id: 'foundations', label: 'Foundations', icon: Palette },
  { id: 'components',  label: 'Components',  icon: Layout },
  { id: 'brand',       label: 'Brand',       icon: Award },
  { id: 'kit',         label: 'UI Kit',      icon: AppWindow },
]

// ─────────────────────────────────────────────────────────────
// Reusable PreviewCard (same frame style as Apple HIG showcase)
// ─────────────────────────────────────────────────────────────
function PreviewCard({ title, subtitle, children }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="px-4 pt-3 pb-2 border-b border-zinc-100">
        <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
        {subtitle && <p className="text-[11px] text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FOUNDATIONS
// ─────────────────────────────────────────────────────────────

function ColorScaleCard({ name, prefix, steps }) {
  return (
    <PreviewCard title={name} subtitle={`${steps.length} steps · sentence case · square tiles`}>
      <div className="carbon-scope" style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 0, padding: 20 }}>
        {steps.map(s => (
          <div key={s} style={{
            height: 56, background: `var(--cds-${prefix}-${s})`,
            display: 'flex', alignItems: 'flex-end', padding: 6,
            color: s <= 40 ? 'var(--cds-gray-100)' : 'white',
            font: '500 10px/1 var(--cds-font-sans)', letterSpacing: '0.16px',
          }}>{s}</div>
        ))}
      </div>
    </PreviewCard>
  )
}

function GrayScalesCard() {
  return (
    <PreviewCard
      title="Gray scales — neutral, cool, warm"
      subtitle="Pick one family per surface. Cool for data viz, warm rarely. Neutral is default."
    >
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['Gray (neutral)', 'gray'],
          ['Cool Gray', 'cool-gray'],
        ].map(([label, prefix]) => (
          <div key={prefix}>
            <div className="cds-mono" style={{ marginBottom: 4 }}>{label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 0 }}>
              {[10,20,30,40,50,60,70,80,90,100].map(s => {
                const fallback = prefix === 'cool-gray' && ![10,30,50,70,90].includes(s)
                return (
                  <div key={s} style={{
                    height: 36,
                    background: fallback ? `var(--cds-gray-${s})` : `var(--cds-${prefix}-${s})`,
                    color: s <= 40 ? 'var(--cds-gray-100)' : 'white',
                    font: '500 10px/1 var(--cds-font-sans)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{s}</div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </PreviewCard>
  )
}

function StatusColorsCard() {
  const rows = [
    { name: 'support-error',   token: '--cds-red-60',    hex: '#da1e28' },
    { name: 'support-success', token: '--cds-green-50',  hex: '#24a148' },
    { name: 'support-warning', token: '--cds-yellow-30', hex: '#f1c21b' },
    { name: 'support-info',    token: '--cds-blue-70',   hex: '#0043ce' },
  ]
  return (
    <PreviewCard title="Status colors" subtitle="Carbon reserves color for state. No decoration.">
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map(r => (
          <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 32, background: `var(${r.token})`, border: '1px solid var(--cds-border-subtle-01)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 13px/1.2 var(--cds-font-sans)', color: 'var(--cds-text-primary)' }}>{r.name}</div>
              <div className="cds-mono">{r.token} · {r.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </PreviewCard>
  )
}

function BlueScaleCard() {
  return (
    <PreviewCard
      title="Blue — the one accent"
      subtitle="Blue 60 (#0f62fe) is the only non-status accent in productive UI."
    >
      <div className="carbon-scope" style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 0 }}>
          {[10,20,30,40,50,60,70,80].map(s => (
            <div key={s} style={{
              height: 64, background: `var(--cds-blue-${s})`,
              color: s <= 30 ? 'var(--cds-gray-100)' : 'white',
              font: '600 11px/1 var(--cds-font-sans)',
              display: 'flex', alignItems: 'flex-end', padding: 8,
              outline: s === 60 ? '2px solid var(--cds-focus)' : 'none',
              outlineOffset: s === 60 ? -4 : 0,
              position: 'relative',
            }}>
              {s}{s === 60 && <span style={{ marginLeft: 6, fontSize: 9, opacity: 0.85 }}>IBM Blue</span>}
            </div>
          ))}
        </div>
      </div>
    </PreviewCard>
  )
}

function LayeredSurfacesCard() {
  return (
    <PreviewCard
      title="Layered surfaces"
      subtitle="Carbon achieves depth without shadow. Each step is a tiny gray shift."
    >
      <div className="carbon-scope" style={{ padding: 20, background: 'var(--cds-background)' }}>
        <div style={{ background: 'var(--cds-layer-01)', padding: 16 }}>
          <div className="cds-mono" style={{ marginBottom: 8 }}>layer-01 · #f4f4f4</div>
          <div style={{ background: 'var(--cds-layer-02)', padding: 16, border: '1px solid var(--cds-border-subtle-01)' }}>
            <div className="cds-mono" style={{ marginBottom: 8 }}>layer-02 · #ffffff (with 1px border)</div>
            <div style={{ background: 'var(--cds-layer-03)', padding: 16 }}>
              <div className="cds-mono">layer-03 · #f4f4f4</div>
            </div>
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

function TypographyCard() {
  return (
    <PreviewCard
      title="IBM Plex — productive scale"
      subtitle="One family · 3 weights (Light 300 / Regular 400 / Semibold 600)."
    >
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="cds-display-04">Display 04</div>
        <div className="cds-display-03">Display 03</div>
        <div className="cds-heading-06">Heading 06 — 42 / 300</div>
        <div className="cds-heading-05">Heading 05 — 32 / 400</div>
        <div className="cds-heading-04">Heading 04 — 28 / 400</div>
        <div className="cds-heading-03">Heading 03 — 20 / 400</div>
        <div className="cds-heading-02">Heading 02 — 16 / 600</div>
        <div className="cds-body-02">Body 02 — 16 / 400. The quick brown fox jumps over the lazy dog.</div>
        <div className="cds-body-01">Body 01 — 14 / 400. Productive default. Dense app chrome.</div>
        <div className="cds-label-01">Label 01 — 12 / 400 · 0.32px tracking</div>
        <div className="cds-code-01">Code 01 — IBM Plex Mono · 12px</div>
        <div className="cds-quotation-01">Quotation 01 — IBM Plex Serif, reserved for editorial pull-quotes.</div>
      </div>
    </PreviewCard>
  )
}

function SpacingCard() {
  const steps = [
    ['01','2px'],['02','4px'],['03','8px'],['04','12px'],['05','16px'],['06','24px'],
    ['07','32px'],['08','40px'],['09','48px'],['10','64px'],['11','80px'],['12','96px'],
  ]
  return (
    <PreviewCard
      title="Spacing scale — 13 steps"
      subtitle="spacing-05 (16px) is the default gutter. spacing-03 (8px) for dense fields. spacing-07 (32px) for sections."
    >
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map(([n, px]) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="cds-mono" style={{ width: 64 }}>{n}</div>
            <div className="cds-mono" style={{ width: 56 }}>{px}</div>
            <div style={{ height: 12, width: px, background: 'var(--cds-blue-60)' }} />
          </div>
        ))}
      </div>
    </PreviewCard>
  )
}

function MotionCard() {
  return (
    <PreviewCard
      title="Motion — productive easings"
      subtitle="Short, assertive. Never bounce, spring, or overshoot."
    >
      <div className="carbon-scope" style={{ padding: 20 }}>
        <table style={{ width: '100%', fontSize: 13 }}>
          <tbody>
            {[
              ['fast-01',     '70ms',  'Hover state'],
              ['fast-02',     '110ms', 'Snap, simple ack'],
              ['moderate-01', '150ms', 'Small panel'],
              ['moderate-02', '240ms', 'Medium panel'],
              ['slow-01',     '400ms', 'Large entrance'],
              ['slow-02',     '700ms', 'Expressive / marketing'],
            ].map(([k, ms, use]) => (
              <tr key={k}>
                <td className="cds-mono" style={{ padding: '6px 12px 6px 0' }}>{k}</td>
                <td className="cds-mono" style={{ padding: '6px 12px', color: 'var(--cds-blue-60)' }}>{ms}</td>
                <td style={{ padding: '6px 0', color: 'var(--cds-text-secondary)' }}>{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="cds-helper" style={{ marginTop: 12 }}>
          standard-productive: <code>cubic-bezier(0.2, 0, 0.38, 0.9)</code>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────

function ButtonsCard() {
  return (
    <PreviewCard
      title="Buttons"
      subtitle="Square corners, 40px default. Sentence case copy. Never Title Case."
    >
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div className="cds-mono" style={{ marginBottom: 8 }}>PRIMARY · SECONDARY · TERTIARY · GHOST · DANGER</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button className="cds-btn cds-btn--primary">Primary</button>
            <button className="cds-btn cds-btn--secondary">Secondary</button>
            <button className="cds-btn cds-btn--tertiary">Tertiary</button>
            <button className="cds-btn cds-btn--ghost">Ghost</button>
            <button className="cds-btn cds-btn--danger">Danger</button>
            <button className="cds-btn cds-btn--primary" disabled>Disabled</button>
          </div>
        </div>
        <div>
          <div className="cds-mono" style={{ marginBottom: 8 }}>SIZES — sm 32 · md 40 · lg 48 · xl 64</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="cds-btn cds-btn--primary cds-btn--sm">Small</button>
            <button className="cds-btn cds-btn--primary">Medium</button>
            <button className="cds-btn cds-btn--primary cds-btn--lg">Large</button>
            <button className="cds-btn cds-btn--primary cds-btn--xl">Extra large</button>
          </div>
        </div>
      </div>
    </PreviewCard>
  )
}

function FormFieldsCard() {
  return (
    <PreviewCard
      title="Form fields — the Carbon tray"
      subtitle="Bottom border only (1px gray-50). Signature input look."
    >
      <div className="carbon-scope" style={{ padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="cds-field">
          <label className="cds-label">Username</label>
          <input className="cds-input" defaultValue="euihyeok.kwon" />
        </div>
        <div className="cds-field">
          <label className="cds-label">Cluster</label>
          <select className="cds-select">
            <option>prod-svl-01</option>
            <option>prod-rtp-02</option>
            <option>batch-fra-01</option>
          </select>
        </div>
        <div className="cds-field" style={{ gridColumn: '1 / -1' }}>
          <label className="cds-label">Description</label>
          <textarea className="cds-textarea" placeholder="Add a brief description." />
          <span className="cds-helper">Helper text appears below the field, gray-60.</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <label className="cds-checkbox">
            <input type="checkbox" defaultChecked />
            <span className="cds-checkbox-box" />
            Enable autoscaling
          </label>
          <label className="cds-toggle">
            <input type="checkbox" defaultChecked />
            <span className="cds-toggle-bar" />
            Production
          </label>
        </div>
      </div>
    </PreviewCard>
  )
}

function TagsCard() {
  return (
    <PreviewCard
      title="Tags — the only pill in Carbon"
      subtitle="9 color variants. Sentence case labels."
    >
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['gray','blue','cyan','teal','green','magenta','purple','red'].map(c => (
          <span key={c} className={`cds-tag cds-tag--${c}`}>{c}</span>
        ))}
      </div>
    </PreviewCard>
  )
}

function NotificationsCard() {
  return (
    <PreviewCard title="Inline notifications" subtitle="State what happened, then what to do. No exclamation points.">
      <div className="carbon-scope" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div className="cds-notif cds-notif--error">
          <div><div className="cds-notif-title">media-encoder failed to start</div><div className="cds-notif-body">ImagePullBackOff — verify pull-secret rotation.</div></div>
        </div>
        <div className="cds-notif cds-notif--warning">
          <div><div className="cds-notif-title">High memory usage</div><div className="cds-notif-body">billing-worker is at 87% of its memory limit.</div></div>
        </div>
        <div className="cds-notif cds-notif--success">
          <div><div className="cds-notif-title">Deployment complete</div><div className="cds-notif-body">api-gateway v2.14 is live on prod-svl-01.</div></div>
        </div>
        <div className="cds-notif cds-notif--info">
          <div><div className="cds-notif-title">Maintenance window scheduled</div><div className="cds-notif-body">May 18, 02:00–04:00 UTC. Rolling restarts only.</div></div>
        </div>
      </div>
    </PreviewCard>
  )
}

function DataTableCard() {
  const rows = [
    { name: 'api-gateway',     cluster: 'prod-svl-01',   status: 'ok',   stext: 'Running',  rep: '4 / 4', cpu: '23%', mem: '612 MiB', upd: '2 min ago' },
    { name: 'auth-service',    cluster: 'prod-svl-01',   status: 'ok',   stext: 'Running',  rep: '3 / 3', cpu: '18%', mem: '484 MiB', upd: '14 min ago' },
    { name: 'billing-worker',  cluster: 'prod-rtp-02',   status: 'warn', stext: 'Degraded', rep: '2 / 3', cpu: '71%', mem: '1.2 GiB', upd: '3 min ago' },
    { name: 'media-encoder',   cluster: 'prod-rtp-02',   status: 'err',  stext: 'Failed',   rep: '0 / 2', cpu: '—',   mem: '—',       upd: 'now' },
    { name: 'nightly-batch',   cluster: 'batch-fra-01',  status: 'idle', stext: 'Idle',     rep: '0 / 0', cpu: '—',   mem: '—',       upd: '6 hr ago' },
  ]
  const dotColor = { ok: 'var(--cds-support-success)', warn: 'var(--cds-support-warning)', err: 'var(--cds-support-error)', idle: 'var(--cds-gray-50)' }
  return (
    <PreviewCard title="Data table" subtitle="Full-bleed. 1px borders. Hover row.">
      <div className="carbon-scope" style={{ padding: 20, background: 'var(--cds-background)' }}>
        <table className="cds-table">
          <thead>
            <tr><th>Name</th><th>Cluster</th><th>Status</th><th>Replicas</th><th>CPU</th><th>Memory</th><th>Updated</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.name}>
                <td><a href="#" style={{ color: 'var(--cds-link-primary)', textDecoration: 'none' }}>{r.name}</a></td>
                <td className="cds-mono">{r.cluster}</td>
                <td><span className={`cds-status cds-status--${r.status}`}><span className="dot" style={{ background: dotColor[r.status] }} />{r.stext}</span></td>
                <td>{r.rep}</td><td>{r.cpu}</td><td>{r.mem}</td><td>{r.upd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewCard>
  )
}

function TileCard() {
  return (
    <PreviewCard title="Tile — Carbon's “card”" subtitle="Square. No shadow. Sometimes a 1px border. Hover lifts one layer.">
      <div className="carbon-scope" style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, background: 'var(--cds-background)' }}>
        <div className="cds-tile" style={{ border: '1px solid var(--cds-border-subtle-01)' }}>
          <h3 className="cds-heading-02" style={{ margin: 0 }}>Read-only tile</h3>
          <p className="cds-body-01" style={{ color: 'var(--cds-text-secondary)', marginTop: 8 }}>Plain content surface. No interaction.</p>
        </div>
        <div className="cds-tile cds-tile--clickable" style={{ border: '1px solid var(--cds-border-subtle-01)' }}>
          <h3 className="cds-heading-02" style={{ margin: 0 }}>Clickable tile</h3>
          <p className="cds-body-01" style={{ color: 'var(--cds-text-secondary)', marginTop: 8 }}>Hovers to layer-02. No shadow lift.</p>
        </div>
        <div className="cds-tile" style={{ background: 'var(--cds-blue-60)', color: 'var(--cds-text-on-color)' }}>
          <h3 className="cds-heading-02" style={{ margin: 0, color: 'inherit' }}>Selected</h3>
          <p className="cds-body-01" style={{ marginTop: 8, opacity: 0.9 }}>One accent — IBM Blue 60 only.</p>
        </div>
      </div>
    </PreviewCard>
  )
}

// ─────────────────────────────────────────────────────────────
// BRAND — content rules + 8-bar IBM mark
// ─────────────────────────────────────────────────────────────

function ContentRulesCard() {
  const rules = [
    ['Voice', 'Plain, declarative. Carbon is calm and authoritative. Never cheerful or apologetic.'],
    ['Casing', 'Sentence case everywhere — buttons, menu items, page titles. Never Title Case in UI.'],
    ['Numbers', 'Spell zero through nine. Numerals for 10+ and always for measurements.'],
    ['Errors', 'State what happened, then what to do. Never blame. Never apologize.'],
    ['Emoji', 'None. Status is communicated through icons + color.'],
    ['Brevity', 'If a label can be one word, it is one word ("Save", "Cancel", "Filter").'],
  ]
  return (
    <PreviewCard title="Content fundamentals" subtitle="Clear, direct, engineer-grade. Words are tools, not ornaments.">
      <div className="carbon-scope" style={{ padding: 20 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <tbody>
            {rules.map(([k, v]) => (
              <tr key={k} style={{ borderBottom: '1px solid var(--cds-border-subtle-01)' }}>
                <td style={{ padding: '12px 16px 12px 0', width: 110, color: 'var(--cds-text-primary)', fontWeight: 600 }}>{k}</td>
                <td style={{ padding: '12px 0', color: 'var(--cds-text-secondary)' }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PreviewCard>
  )
}

function IBMLogoCard() {
  // Clean-room SVG approximation of the Paul Rand 8-bar mark.
  return (
    <PreviewCard title="IBM 8-bar mark" subtitle="Paul Rand · 1972 · approximation only — source official artwork for published work.">
      <div className="carbon-scope" style={{ padding: 32, background: 'var(--cds-layer-01)', display: 'flex', justifyContent: 'center' }}>
        <svg viewBox="0 0 220 96" style={{ height: 96, color: 'var(--cds-gray-100)' }}>
          {['I','B','M'].map((ch, ci) => (
            <g key={ch} transform={`translate(${ci * 76},0)`}>
              {[0,1,2,3,4,5,6,7].map(row => {
                let segments
                if (ch === 'I') segments = [[12,52]]
                else if (ch === 'B') segments = row % 2 === 0 ? [[0,16],[28,52]] : [[0,16],[28,52]]
                else segments = row % 2 === 0 ? [[0,8],[14,18],[24,28],[34,52]] : [[0,8],[24,28],[34,42],[44,52]]
                return segments.map((seg, i) => (
                  <rect
                    key={`${row}-${i}`}
                    x={seg[0]}
                    y={row * 12}
                    width={seg[1] - seg[0]}
                    height={6}
                    fill="currentColor"
                  />
                ))
              })}
            </g>
          ))}
        </svg>
      </div>
    </PreviewCard>
  )
}

function FocusRingCard() {
  return (
    <PreviewCard title="Focus ring — Carbon's signature" subtitle="2px solid blue-60, drawn outside via outline. On dark, ring is white. 1px inverse inset.">
      <div className="carbon-scope" style={{ padding: 32, background: 'var(--cds-background)', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="cds-btn cds-btn--primary" style={{ outline: '2px solid var(--cds-focus)', outlineOffset: -4, boxShadow: 'inset 0 0 0 1px var(--cds-focus-inset)' }}>Focused primary</button>
        <button className="cds-btn cds-btn--tertiary" style={{ outline: '2px solid var(--cds-focus)', outlineOffset: -4 }}>Focused tertiary</button>
        <input className="cds-input" defaultValue="Focused input" style={{ width: 240, outline: '2px solid var(--cds-focus)', outlineOffset: -2 }} />
      </div>
    </PreviewCard>
  )
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export default function CarbonSystem() {
  const [sub, setSub] = useState('foundations')

  return (
    <div className="space-y-5">
      {/* Header — describe the system */}
      <header className="bg-white border border-zinc-200 rounded-xl p-5">
        <div className="flex items-baseline gap-3 mb-2">
          <Activity className="text-zinc-400" size={20} />
          <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">Carbon Design System</h1>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-200">
            IBM · open source
          </span>
        </div>
        <p className="text-sm text-zinc-600 max-w-3xl leading-relaxed">
          IBM's open-source design system for productive software. Built on the principles of
          <em className="not-italic font-medium"> clarity, efficiency, consistency, and beauty</em>.
          Square corners, layered surfaces, IBM Blue, IBM Plex type, and a curated icon set —
          the reference vocabulary for industrial-feeling control surfaces.
        </p>
        <div className="mt-3 flex gap-2 flex-wrap text-[11px]">
          <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Square corners · radius 0</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">1px borders, no shadows</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">IBM Plex Sans (300/400/600)</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Layered surfaces, not cards</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">One accent — IBM Blue 60</span>
          <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">Sentence case, no emoji</span>
        </div>
      </header>

      {/* Sub-tabs */}
      <nav className="flex gap-1 border-b border-zinc-200">
        {SUB_TABS.map(t => {
          const Icon = t.icon
          const active = sub === t.id
          return (
            <button
              key={t.id}
              onClick={() => setSub(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                active
                  ? 'border-zinc-900 text-zinc-900'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
              }`}
            >
              <Icon size={14} />{t.label}
            </button>
          )
        })}
      </nav>

      {/* Sub-tab content */}
      {sub === 'foundations' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BlueScaleCard />
          <StatusColorsCard />
          <GrayScalesCard />
          <ColorScaleCard name="Red scale (danger)"  prefix="red"    steps={[10,20,60,70,80]} />
          <LayeredSurfacesCard />
          <TypographyCard />
          <SpacingCard />
          <MotionCard />
        </div>
      )}

      {sub === 'components' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ButtonsCard />
          <FormFieldsCard />
          <TagsCard />
          <NotificationsCard />
          <TileCard />
          <div className="lg:col-span-2"><DataTableCard /></div>
        </div>
      )}

      {sub === 'brand' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ContentRulesCard />
          <IBMLogoCard />
          <div className="lg:col-span-2"><FocusRingCard /></div>
        </div>
      )}

      {sub === 'kit' && <CarbonAppKit />}
    </div>
  )
}
