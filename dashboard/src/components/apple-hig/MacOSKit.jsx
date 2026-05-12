/* macOS UI Kit — adapted from project/ui_kits/macos/{macos-window, components, screens}.jsx
   Mail-style 3-pane layout in a window chrome with traffic lights. */

import { useState } from 'react'

// ─────────────────────────────────────────────────────────────
// Atoms
// ─────────────────────────────────────────────────────────────

function SidebarItem({ icon, label, active, badge, onClick, indent = 0 }) {
  return (
    <button
      className={'mac-side-item' + (active ? ' active' : '')}
      style={{ paddingLeft: 10 + indent * 16 }}
      onClick={onClick}
    >
      <span className="mac-side-ico">{icon}</span>
      <span className="mac-side-label">{label}</span>
      {badge != null && <span className="mac-side-badge">{badge}</span>}
    </button>
  )
}

function SidebarSection({ title, children }) {
  return (
    <div className="mac-side-section">
      {title && <div className="mac-side-section-title">{title}</div>}
      {children}
    </div>
  )
}

function Toolbar({ children }) {
  return <div className="mac-toolbar">{children}</div>
}

function ToolbarButton({ icon, label, onClick, danger }) {
  return (
    <button
      className={'mac-tb-btn' + (danger ? ' danger' : '')}
      onClick={onClick}
      title={label}
    >
      <span className="mac-tb-ico">{icon}</span>
      {label && <span>{label}</span>}
    </button>
  )
}

function ToolbarSpacer() {
  return <div style={{ flex: 1 }} />
}

function SearchInput({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="mac-search">
      <span className="mac-search-ico">⌕</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

function MacButton({ children, primary, onClick }) {
  return (
    <button className={'mac-btn' + (primary ? ' primary' : '')} onClick={onClick}>
      {children}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────
// Sample data
// ─────────────────────────────────────────────────────────────

const FOLDERS = [
  { id: 'inbox',  label: 'Inbox',  icon: '✉', count: 12 },
  { id: 'drafts', label: 'Drafts', icon: '✎', count: 2 },
  { id: 'sent',   label: 'Sent',   icon: '↗' },
  { id: 'junk',   label: 'Junk',   icon: '⊘' },
  { id: 'trash',  label: 'Trash',  icon: '🗑' },
]
const SMART = [
  { id: 'flag',   label: 'Flagged', icon: '⚑' },
  { id: 'unread', label: 'Unread',  icon: '●', count: 7 },
  { id: 'today',  label: 'Today',   icon: '◐' },
]
const MAIL = [
  {
    id: 1, from: 'Sarah Chen', initials: 'SC', color: '#FF9500',
    subject: 'Re: design review notes',
    preview: 'Thanks for the walkthrough yesterday — a few thoughts on the spacing in the side panel…',
    time: '10:42 AM',
    body: [
      'Thanks for the walkthrough yesterday — a few thoughts on the spacing in the side panel.',
      'I think we can tighten the row heights by 2pt and increase the inset margin to match the rest of the app. The current 8pt feels slightly off.',
      'Also: did we settle on systemFill vs secondarySystemFill for the hover state? I noticed both in the spec.',
      'Happy to jump on a call if easier.',
      '— Sarah',
    ],
  },
  {
    id: 2, from: 'GitHub', initials: 'GH', color: '#1C1C1E',
    subject: '[design-system] Pull request opened',
    preview: '@alexpark opened PR #482: Adopt continuous corners across alert components',
    time: '9:18 AM',
    body: [
      'alexpark opened pull request #482: Adopt continuous corners across alert components.',
      'Replaces uniform border-radius with the squircle approximation in 14 components. Snapshot tests updated.',
    ],
  },
  {
    id: 3, from: 'Apple Developer', initials: '', color: '#000',
    subject: 'Your SF Symbols 6 update is available',
    preview: 'Over 800 new symbols, plus refreshed weights for…',
    time: 'Yesterday',
    body: [
      'SF Symbols 6 is now available, including over 800 new symbols, refined weights, and expanded multicolor coverage.',
      'Download the latest app from developer.apple.com/sf-symbols.',
    ],
  },
  {
    id: 4, from: 'Dr. Williams', initials: 'DW', color: '#34C759',
    subject: 'Appointment confirmed',
    preview: 'Your appointment is confirmed for Thursday at 2:30 PM.',
    time: 'Mon',
    body: [
      'Your appointment is confirmed for Thursday at 2:30 PM.',
      'Please arrive 10 minutes early to complete intake forms.',
    ],
  },
  {
    id: 5, from: 'Alex Park', initials: 'AP', color: '#007AFF',
    subject: 'lunch?',
    preview: 'tomorrow 12:30 — the new ramen place?',
    time: 'Sun',
    body: ['tomorrow 12:30 — the new ramen place?'],
  },
  {
    id: 6, from: 'Mom', initials: 'M', color: '#FF2D55',
    subject: 'photos from the trip',
    preview: 'Sending the rest now — the harbor ones are my favorite.',
    time: 'Sat',
    body: ['Sending the rest now — the harbor ones are my favorite. ♥'],
  },
]

// ─────────────────────────────────────────────────────────────
// MailApp — the inner content of the macOS window
// ─────────────────────────────────────────────────────────────

function MailApp() {
  const [folder, setFolder] = useState('inbox')
  const [selected, setSelected] = useState(MAIL[0])
  const [search, setSearch] = useState('')
  const filtered = MAIL.filter(
    m => !search || (m.subject + ' ' + m.from + ' ' + m.preview).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="mac-stage">
      <div className="mac-sidebar">
        <SidebarSection title="Mailboxes">
          {FOLDERS.map(f => (
            <SidebarItem
              key={f.id}
              icon={f.icon}
              label={f.label}
              badge={f.count}
              active={folder === f.id}
              onClick={() => setFolder(f.id)}
            />
          ))}
        </SidebarSection>
        <SidebarSection title="Smart Mailboxes">
          {SMART.map(s => (
            <SidebarItem
              key={s.id}
              icon={s.icon}
              label={s.label}
              badge={s.count}
              active={folder === s.id}
              onClick={() => setFolder(s.id)}
            />
          ))}
        </SidebarSection>
      </div>

      <div className="mac-main">
        <Toolbar>
          <ToolbarButton icon="✎" label="New" />
          <ToolbarButton icon="↩" label="Reply" />
          <ToolbarButton icon="↪" label="Forward" />
          <ToolbarButton icon="⚑" label="Flag" />
          <ToolbarButton icon="🗑" label="" danger />
          <ToolbarSpacer />
          <SearchInput value={search} onChange={setSearch} placeholder="Search Mailbox" />
        </Toolbar>

        <div className="mac-mail">
          <div className="mac-mail-list">
            {filtered.map(m => (
              <div
                key={m.id}
                className={'mac-mail-item' + (selected?.id === m.id ? ' active' : '')}
                onClick={() => setSelected(m)}
              >
                <div className="mac-mail-from">
                  {m.from}
                  <span className="mac-mail-time">{m.time}</span>
                </div>
                <div className="mac-mail-subject">{m.subject}</div>
                <div className="mac-mail-preview">{m.preview}</div>
              </div>
            ))}
          </div>
          <div className="mac-mail-read">
            {selected ? (
              <>
                <h1 className="h">{selected.subject}</h1>
                <div className="meta">
                  <div className="mac-avatar" style={{ background: selected.color }}>
                    {selected.initials || ''}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: 'var(--label)', fontWeight: 600 }}>{selected.from}</div>
                    <div>to me · {selected.time}</div>
                  </div>
                  <div style={{ flex: 1 }} />
                  <MacButton>Reply</MacButton>
                </div>
                <div className="body">
                  {selected.body.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </>
            ) : (
              <div style={{ color: 'var(--secondaryLabel)', textAlign: 'center', paddingTop: 60 }}>
                No message selected
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Window chrome wrapper
// ─────────────────────────────────────────────────────────────

export default function MacOSKit() {
  return (
    <div style={{
      width: '100%', aspectRatio: '16/10', maxWidth: 1180,
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.23), 0 16px 48px rgba(0,0,0,0.35)',
      background: '#fff', position: 'relative', display: 'flex', flexDirection: 'column',
    }}>
      {/* Traffic lights */}
      <div style={{ position: 'absolute', top: 12, left: 14, display: 'flex', gap: 8, zIndex: 100 }}>
        <div style={{ width: 12, height: 12, borderRadius: 9999, background: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: 9999, background: '#FEBC2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: 9999, background: '#28C840' }} />
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <MailApp />
      </div>
    </div>
  )
}
