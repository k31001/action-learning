/* iOS UI Kit — adapted from project/ui_kits/ios/{ios-frame, components, screens}.jsx
   Reimplemented in React for the dashboard's Design System tab. */

import { useState } from 'react'

// ─────────────────────────────────────────────────────────────
// Reusable atoms
// ─────────────────────────────────────────────────────────────

function NavBar({ title, leading, trailing, large = false }) {
  return (
    <div className={'hig-nav ' + (large ? 'lg' : '')}>
      <div className="hig-nav-row">
        <div className="hig-nav-leading">{leading}</div>
        {!large && <div className="hig-nav-title">{title}</div>}
        <div className="hig-nav-trailing">{trailing}</div>
      </div>
      {large && <div className="hig-nav-large-title">{title}</div>}
    </div>
  )
}

function BackButton({ label = 'Back', onClick }) {
  return (
    <button className="hig-back" onClick={onClick}>
      <span style={{ fontSize: 20, lineHeight: 1, marginRight: 2 }}>‹</span>
      {label}
    </button>
  )
}

function NavAction({ children, onClick, primary }) {
  return (
    <button className={'hig-nav-action' + (primary ? ' primary' : '')} onClick={onClick}>
      {children}
    </button>
  )
}

function ListSection({ header, footer, children }) {
  return (
    <div className="hig-list-section">
      {header && <div className="hig-list-header">{header}</div>}
      <div className="hig-list-card">{children}</div>
      {footer && <div className="hig-list-footer">{footer}</div>}
    </div>
  )
}

function ListRow({ icon, iconBg, title, value, chevron = true, onClick, accessory, destructive }) {
  return (
    <button className={'hig-row' + (destructive ? ' destructive' : '')} onClick={onClick}>
      {icon && (
        <div className="hig-row-icon" style={{ background: iconBg }}>
          {icon}
        </div>
      )}
      <div className="hig-row-title">{title}</div>
      {accessory ? (
        <div className="hig-row-accessory">{accessory}</div>
      ) : (
        <>
          {value !== undefined && <div className="hig-row-value">{value}</div>}
          {chevron && <div className="hig-chev">›</div>}
        </>
      )}
    </button>
  )
}

function Toggle({ on, onChange }) {
  return (
    <div className={'hig-toggle' + (on ? ' on' : '')} onClick={() => onChange(!on)}>
      <div className="hig-knob" />
    </div>
  )
}

function Button({ children, kind = 'filled', onClick, full, destructive }) {
  const k = destructive ? 'destructive' : kind
  return (
    <button className={'hig-btn ' + k + (full ? ' full' : '')} onClick={onClick}>
      {children}
    </button>
  )
}

function TabBar({ items, active, onTab }) {
  return (
    <div className="hig-tabbar-wrap">
      <div className="hig-tabbar">
        {items.map(it => (
          <button
            key={it.id}
            className={'hig-tab' + (active === it.id ? ' active' : '')}
            onClick={() => onTab(it.id)}
          >
            <div className="hig-tab-glyph">{it.glyph}</div>
            <div className="hig-tab-label">{it.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function SearchField({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="hig-search">
      <span className="hig-search-ico">⌕</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  )
}

function Sheet({ open, onClose, children }) {
  if (!open) return null
  return (
    <div className="hig-sheet-scrim" onClick={onClose}>
      <div className="hig-sheet" onClick={e => e.stopPropagation()}>
        <div className="hig-sheet-handle" />
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Device frame — iOS 26 with dynamic island + home indicator
// ─────────────────────────────────────────────────────────────

function IOSStatusBar({ time = '9:41' }) {
  const c = '#000'
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px 6px', position: 'relative', zIndex: 20, width: '100%', boxSizing: 'border-box',
    }}>
      <span style={{ fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590, fontSize: 15, lineHeight: '22px', color: c }}>{time}</span>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width="15" height="11" viewBox="0 0 17 12">
          <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill={c} />
          <circle cx="8.5" cy="10.5" r="1.5" fill={c} />
        </svg>
        <svg width="24" height="12" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
        </svg>
      </div>
    </div>
  )
}

export function IOSDevice({ width = 360, height = 760, children }) {
  return (
    <div style={{
      width, height, borderRadius: 44, overflow: 'hidden',
      position: 'relative', background: '#F2F2F7',
      boxShadow: '0 30px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      fontFamily: '-apple-system, system-ui, sans-serif',
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 32, borderRadius: 22, background: '#000', zIndex: 50,
      }} />
      {/* Status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <IOSStatusBar />
      </div>
      {/* Content */}
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 60,
        height: 28, display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
        paddingBottom: 7, pointerEvents: 'none',
      }}>
        <div style={{ width: 124, height: 5, borderRadius: 100, background: 'rgba(0,0,0,0.28)' }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Screens — Settings → Profile, Messages → Conversation
// ─────────────────────────────────────────────────────────────

function SettingsScreen({ setScreen, state, setState }) {
  return (
    <div className="ios-stage">
      <div className="ios-scroll">
        <NavBar title="Settings" large />
        <div style={{ padding: '0 16px 8px' }}>
          <SearchField
            value={state.search}
            onChange={v => setState(s => ({ ...s, search: v }))}
          />
        </div>

        <ListSection>
          <ListRow
            icon="A"
            iconBg="#8E8E93"
            title="Apple Account"
            value="Sarah Chen"
            onClick={() => setScreen('profile')}
          />
        </ListSection>

        <ListSection>
          <ListRow
            icon="✈"
            iconBg="#FF9500"
            title="Airplane Mode"
            chevron={false}
            accessory={
              <Toggle
                on={state.airplane}
                onChange={v => setState(s => ({ ...s, airplane: v }))}
              />
            }
          />
          <ListRow icon="W" iconBg="#007AFF" title="Wi-Fi" value="Home" />
          <ListRow icon="B" iconBg="#007AFF" title="Bluetooth" value="On" />
          <ListRow icon="C" iconBg="#34C759" title="Cellular" />
          <ListRow icon="P" iconBg="#007AFF" title="Personal Hotspot" value="Off" />
        </ListSection>

        <ListSection>
          <ListRow icon="N" iconBg="#FF3B30" title="Notifications" />
          <ListRow icon="S" iconBg="#FF2D55" title="Sounds & Haptics" />
          <ListRow icon="F" iconBg="#5856D6" title="Focus" />
          <ListRow icon="T" iconBg="#5856D6" title="Screen Time" />
        </ListSection>

        <ListSection>
          <ListRow icon="G" iconBg="#8E8E93" title="General" />
          <ListRow icon="ⓘ" iconBg="#007AFF" title="Accessibility" />
          <ListRow icon="P" iconBg="#34C759" title="Privacy & Security" />
        </ListSection>
      </div>
    </div>
  )
}

const CHATS = [
  { id: 'sarah', name: 'Sarah Chen',   preview: 'see you at 6?',                       time: '10:42 AM', unread: 2, color: '#FF9500' },
  { id: 'team',  name: 'Design Team',  preview: 'Alex: pushed the v3 specs',           time: '9:18 AM',  unread: 0, color: '#5856D6' },
  { id: 'mom',   name: 'Mom',          preview: 'thanks honey ♥',                      time: 'Yesterday', unread: 0, color: '#FF2D55' },
  { id: 'dr',    name: 'Dr. Williams', preview: 'Your appointment is confirmed for…',  time: 'Mon',       unread: 0, color: '#34C759' },
  { id: 'alex',  name: 'Alex Park',    preview: 'lol',                                 time: 'Sun',       unread: 0, color: '#007AFF' },
]

function MessagesScreen({ setScreen, setActive }) {
  return (
    <div className="ios-stage">
      <div className="ios-scroll">
        <NavBar
          title="Messages"
          large
          leading={<NavAction>Edit</NavAction>}
          trailing={<NavAction primary>＋</NavAction>}
        />
        <div style={{ padding: '0 16px 8px' }}>
          <SearchField value="" onChange={() => {}} />
        </div>
        <div style={{
          background: 'var(--secondarySystemGroupedBackground)',
          margin: '8px 16px 0',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
          {CHATS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => {
                setActive(c)
                setScreen('conversation')
              }}
              style={{
                all: 'unset',
                display: 'flex',
                gap: 12,
                padding: '10px 14px',
                cursor: 'pointer',
                alignItems: 'center',
                borderTop: i === 0 ? 'none' : '0.5px solid var(--separator)',
              }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: 9999, background: c.color,
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                font: '600 22px var(--font-sans)', flexShrink: 0,
              }}>
                {c.name[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ font: '600 17px var(--font-sans)', color: 'var(--label)', letterSpacing: '-0.43px' }}>{c.name}</div>
                  <div style={{ font: '400 15px var(--font-sans)', color: 'var(--secondaryLabel)' }}>{c.time}</div>
                </div>
                <div style={{
                  font: '400 15px var(--font-sans)', color: 'var(--secondaryLabel)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2,
                }}>
                  {c.preview}
                </div>
              </div>
              {c.unread > 0 && (
                <div style={{
                  background: 'var(--systemBlue)', color: 'white', minWidth: 20, height: 20,
                  padding: '0 6px', borderRadius: 9999, font: '600 13px var(--font-sans)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {c.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function ConversationScreen({ setScreen, contact }) {
  const [msgs, setMsgs] = useState([
    { from: 'them', t: 'hey! still on for dinner?' },
    { from: 'me',   t: 'yes!! 7pm at Sora?' },
    { from: 'them', t: 'sounds great' },
    { from: 'them', t: 'see you at 6?' },
  ])
  const [text, setText] = useState('')
  const send = () => {
    if (!text.trim()) return
    setMsgs(m => [...m, { from: 'me', t: text }])
    setText('')
  }
  return (
    <div className="ios-stage">
      <NavBar
        leading={<BackButton label="Messages" onClick={() => setScreen('messages')} />}
        title={contact?.name || 'Sarah Chen'}
        trailing={<NavAction>•••</NavAction>}
      />
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0', background: 'var(--systemBackground)' }}>
        {msgs.map((m, i) => (
          <div key={i} className={'hig-msg-row ' + (m.from === 'me' ? 'me' : '')}>
            <div className={'hig-bubble ' + (m.from === 'me' ? 'me' : 'them')}>{m.t}</div>
          </div>
        ))}
      </div>
      <div className="hig-composer">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="iMessage"
        />
        <div className="send" onClick={send}>↑</div>
      </div>
    </div>
  )
}

function ProfileScreen({ setScreen }) {
  const [sheetOpen, setSheetOpen] = useState(false)
  return (
    <div className="ios-stage">
      <div className="ios-scroll">
        <NavBar
          leading={<BackButton label="Settings" onClick={() => setScreen('settings')} />}
          title="Apple Account"
        />
        <div style={{ padding: '20px 16px', textAlign: 'center' }}>
          <div style={{
            width: 90, height: 90, borderRadius: 9999,
            background: 'linear-gradient(135deg,#FF9500,#FF2D55)',
            margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', font: '600 36px var(--font-sans)',
          }}>SC</div>
          <div style={{ font: '700 22px var(--font-sans)', color: 'var(--label)' }}>Sarah Chen</div>
          <div style={{ font: '400 15px var(--font-sans)', color: 'var(--secondaryLabel)', marginTop: 2 }}>
            sarah.chen@icloud.com
          </div>
        </div>

        <ListSection>
          <ListRow title="Name, Phone, Email" />
          <ListRow title="Password & Security" />
          <ListRow title="Payment & Shipping" value="Apple Pay" />
        </ListSection>

        <ListSection>
          <ListRow title="iCloud" value="50 GB" />
          <ListRow title="Subscriptions" />
        </ListSection>

        <ListSection>
          <ListRow title="Sign Out" destructive chevron={false} onClick={() => setSheetOpen(true)} />
        </ListSection>
      </div>

      <Sheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <div style={{ padding: '0 16px' }}>
          <div style={{
            font: '600 15px var(--font-sans)', textAlign: 'center',
            color: 'var(--secondaryLabel)', padding: '8px 0 16px',
          }}>
            Sign out of this Apple Account?
          </div>
          <Button kind="destructive" full onClick={() => setSheetOpen(false)}>Sign Out</Button>
          <div style={{ height: 10 }} />
          <Button kind="gray" full onClick={() => setSheetOpen(false)}>Cancel</Button>
        </div>
      </Sheet>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Main IOSKit component — composes the device + tab navigation
// ─────────────────────────────────────────────────────────────

export default function IOSKit() {
  const [tab, setTab] = useState('settings')
  const [screen, setScreen] = useState('settings')
  const [active, setActive] = useState(null)
  const [state, setState] = useState({ airplane: false, search: '' })

  const tabItems = [
    { id: 'messages', glyph: '✉', label: 'Messages' },
    { id: 'settings', glyph: '⚙', label: 'Settings' },
    { id: 'phone',    glyph: '📞', label: 'Phone' },
  ]

  const onTab = id => {
    setTab(id)
    if (id === 'messages') setScreen('messages')
    else if (id === 'settings') setScreen('settings')
    else setScreen('phone')
  }

  let content
  if (screen === 'settings') content = <SettingsScreen setScreen={setScreen} state={state} setState={setState} />
  else if (screen === 'profile') content = <ProfileScreen setScreen={setScreen} />
  else if (screen === 'messages') content = <MessagesScreen setScreen={setScreen} setActive={setActive} />
  else if (screen === 'conversation') content = <ConversationScreen setScreen={setScreen} contact={active} />
  else {
    content = (
      <div className="ios-stage" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
        <div style={{ textAlign: 'center', color: 'var(--secondaryLabel)', padding: 40 }}>
          <div style={{ font: '600 22px var(--font-sans)', color: 'var(--label)', marginBottom: 6 }}>Phone</div>
          <div style={{ font: '400 15px var(--font-sans)' }}>Placeholder · not modeled in this kit</div>
        </div>
      </div>
    )
  }

  // Hide the floating tab bar on the conversation screen so the composer is unobstructed
  const showTab = screen !== 'conversation'

  return (
    <IOSDevice width={360} height={760}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {content}
        {showTab && <TabBar items={tabItems} active={tab} onTab={onTab} />}
      </div>
    </IOSDevice>
  )
}
