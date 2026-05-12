/* Apple HIG Design System — Showcase tab for the dashboard
   Recreates the 18 preview cards + iOS/macOS UI kits from the design bundle. */

import { useState } from 'react'
import { Palette, Type, Layers, Sparkles, Layout, Smartphone, Monitor, Award } from 'lucide-react'
import './apple-hig.css'
import IOSKit from './IOSKit'
import MacOSKit from './MacOSKit'

const SUB_TABS = [
  { id: 'foundations', label: 'Foundations', icon: Palette },
  { id: 'components',  label: 'Components',  icon: Layout },
  { id: 'brand',       label: 'Brand',       icon: Award },
  { id: 'ios',         label: 'iOS Kit',     icon: Smartphone },
  { id: 'macos',       label: 'macOS Kit',   icon: Monitor },
]

// ─────────────────────────────────────────────────────────────
// Reusable card frame for each preview concept
// ─────────────────────────────────────────────────────────────

function PreviewCard({ title, subtitle, height = 'auto', children, fullBleed = false }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
      <div className="px-4 pt-3 pb-2 border-b border-zinc-100">
        <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
        {subtitle && <p className="text-[11px] text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
      <div
        className={fullBleed ? '' : ''}
        style={{ height, minHeight: height === 'auto' ? 0 : height, overflow: 'hidden' }}
      >
        {children}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// FOUNDATIONS: Color, Type, Spacing, Materials
// ─────────────────────────────────────────────────────────────

function ColorsSystemCard() {
  const swatches = [
    ['systemRed', 'Red'], ['systemOrange', 'Orange'], ['systemYellow', 'Yellow'],
    ['systemGreen', 'Green'], ['systemMint', 'Mint'], ['systemTeal', 'Teal'],
    ['systemCyan', 'Cyan'], ['systemBlue', 'Blue'], ['systemIndigo', 'Indigo'],
    ['systemPurple', 'Purple'], ['systemPink', 'Pink'], ['systemBrown', 'Brown'],
  ]
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, padding: 20,
      background: 'var(--systemBackground)',
    }}>
      {swatches.map(([k, n]) => (
        <div key={k} style={{
          aspectRatio: '1', borderRadius: 12, background: `var(--${k})`,
          display: 'flex', alignItems: 'flex-end', padding: 8,
          color: k === 'systemYellow' ? '#3c3c00' : 'white',
          font: '600 11px/1.2 var(--font-sans)',
          textShadow: k === 'systemYellow' ? 'none' : '0 1px 1px rgba(0,0,0,0.15)',
        }}>
          {n}
        </div>
      ))}
    </div>
  )
}

function ColorsGraysCard() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, padding: 20,
      background: 'var(--systemBackground)',
    }}>
      {['systemGray', 'systemGray2', 'systemGray3', 'systemGray4', 'systemGray5', 'systemGray6'].map((k, i) => (
        <div key={k} style={{
          aspectRatio: '1', borderRadius: 10, background: `var(--${k})`,
          border: '1px solid var(--separator)',
          display: 'flex', alignItems: 'flex-end', padding: 6,
          font: '500 10px/1.2 var(--font-sans)', color: 'var(--label)',
        }}>
          Gray{i === 0 ? '' : ' ' + (i + 1)}
        </div>
      ))}
    </div>
  )
}

function ColorsLabelsCard() {
  const rows = [
    { name: 'label', color: 'var(--label)', desc: '#000 · primary text' },
    { name: 'secondaryLabel', color: 'var(--secondaryLabel)', desc: '60% opacity' },
    { name: 'tertiaryLabel', color: 'var(--tertiaryLabel)', desc: '30% opacity' },
    { name: 'quaternaryLabel', color: 'var(--quaternaryLabel)', desc: '18% opacity' },
  ]
  return (
    <div style={{ background: 'var(--secondarySystemBackground)', padding: 20 }}>
      <div style={{
        background: 'var(--systemBackground)', borderRadius: 14, padding: 16,
        display: 'grid', gap: 6,
      }}>
        {rows.map((r, i) => (
          <div
            key={r.name}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              padding: '6px 0',
              borderBottom: i < rows.length - 1 ? '1px solid var(--separator)' : 'none',
            }}
          >
            <span style={{ color: r.color, font: '500 14px var(--font-sans)' }}>{r.name}</span>
            <span style={{ font: '400 12px var(--font-mono)', color: 'var(--secondaryLabel)' }}>{r.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ColorsBackgroundsCard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', height: 220 }}>
      <div style={{ background: 'var(--systemBackground)', padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ font: '600 12px var(--font-mono)' }}>systemBackground</div>
        <div style={{ font: '400 11px var(--font-sans)', color: 'var(--secondaryLabel)' }}>Base layer · #FFFFFF</div>
      </div>
      <div style={{ background: 'var(--secondarySystemBackground)', padding: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ font: '600 12px var(--font-mono)' }}>secondarySystem<br />Background</div>
        <div style={{ font: '400 11px var(--font-sans)', color: 'var(--secondaryLabel)' }}>Card · #F2F2F7</div>
      </div>
      <div style={{
        background: 'var(--tertiarySystemBackground)', padding: 14,
        display: 'flex', flexDirection: 'column', gap: 4,
        borderLeft: '1px solid var(--separator)',
      }}>
        <div style={{ font: '600 12px var(--font-mono)' }}>tertiarySystem<br />Background</div>
        <div style={{ font: '400 11px var(--font-sans)', color: 'var(--secondaryLabel)' }}>Stacked · #FFFFFF</div>
      </div>
    </div>
  )
}

function TypeDisplayCard() {
  return (
    <div style={{ padding: 24, background: 'var(--systemBackground)' }}>
      <div style={{ display: 'grid', gap: 12 }}>
        <div className="t-largeTitle">Large Title · 34/41</div>
        <div className="t-title1">Title 1 · 28/34</div>
        <div className="t-title2">Title 2 · 22/28</div>
        <div className="t-title3">Title 3 · 20/25</div>
      </div>
    </div>
  )
}

function TypeBodyCard() {
  return (
    <div style={{ padding: 24, background: 'var(--systemBackground)' }}>
      <div style={{ display: 'grid', gap: 8 }}>
        <div className="t-headline">Headline · 17/22 · Semibold</div>
        <div className="t-body">Body · 17/22 · Regular</div>
        <div className="t-callout">Callout · 16/21</div>
        <div className="t-subheadline">Subheadline · 15/20</div>
        <div className="t-footnote">Footnote · 13/18</div>
        <div className="t-caption1">Caption 1 · 12/16</div>
        <div className="t-caption2">Caption 2 · 11/13</div>
      </div>
    </div>
  )
}

function TypeFamiliesCard() {
  return (
    <div style={{ padding: 24, background: 'var(--systemBackground)' }}>
      <div style={{ display: 'grid', gap: 14 }}>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 600 }}>SF Pro — Aa Bb Cc 123</div>
        <div style={{ fontFamily: 'var(--font-rounded)', fontSize: 28, fontWeight: 600 }}>SF Rounded — Aa Bb Cc 123</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24 }}>SF Mono — Aa Bb Cc 123</div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 28 }}>New York — Aa Bb Cc 123</div>
      </div>
    </div>
  )
}

function SpacingScaleCard() {
  const sizes = [4, 8, 12, 16, 20, 24, 32, 44, 64]
  return (
    <div style={{
      padding: 20, background: 'var(--systemBackground)',
      display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center',
    }}>
      {sizes.map(s => (
        <div
          key={s}
          style={{
            width: s, height: s, background: 'var(--systemBlue)', borderRadius: 8,
            color: 'white', font: '600 10px/1 var(--font-mono)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          {s >= 44 ? s : ''}
        </div>
      ))}
      <div style={{ display: 'grid', gap: 2 }}>
        <div style={{ font: '400 10px var(--font-mono)', color: 'var(--secondaryLabel)' }}>4 · 8 · 12 · 16 · 20 · 24 · 32 · 44 · 64</div>
        <div style={{ font: '400 10px var(--font-mono)', color: 'var(--secondaryLabel)' }}>8pt grid · 44pt min hit target</div>
      </div>
    </div>
  )
}

function SpacingRadiiCard() {
  const radii = [
    [4, '4'], [6, '6'], [10, '10'], [14, '14'], [20, '20'], [28, '28'],
    [9999, 'pill'], ['22.37%', 'icon\nmask'],
  ]
  return (
    <div style={{
      padding: 20, background: 'var(--secondarySystemBackground)',
      display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap',
    }}>
      {radii.map(([r, label]) => (
        <div
          key={String(r)}
          style={{
            width: 60, height: 60, borderRadius: r,
            background: 'var(--systemBackground)', border: '1px solid var(--separator)',
            display: 'flex', alignItems: 'flex-end', padding: 8,
            font: '500 10px/1 var(--font-mono)', color: 'var(--secondaryLabel)',
            whiteSpace: 'pre',
          }}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

function SpacingShadowsCard() {
  return (
    <div style={{
      padding: 24, background: 'var(--secondarySystemBackground)',
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20,
    }}>
      {[1, 2, 3, 4].map(n => (
        <div
          key={n}
          style={{
            background: 'var(--systemBackground)', height: 100, borderRadius: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            font: '500 11px var(--font-mono)', color: 'var(--secondaryLabel)',
            boxShadow: `var(--shadow-${n})`,
          }}
        >
          shadow-{n}
        </div>
      ))}
    </div>
  )
}

function SpacingMaterialsCard() {
  return (
    <div style={{
      height: 220, position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 25%, #a18cd1 50%, #fbc2eb 75%, #84fab0 100%)',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8,
        padding: '30px 16px', height: '100%', alignItems: 'center',
      }}>
        {['ultraThin', 'thin', 'regular', 'thick', 'chrome'].map((name, i) => {
          const opacities = ['0.40', '0.60', '0.72', '0.82', '0.85']
          return (
            <div
              key={name}
              className={`material-${name}`}
              style={{
                height: 140, borderRadius: 14,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                font: '600 11px var(--font-sans)', color: 'var(--label)', textAlign: 'center', padding: 8,
                border: '0.5px solid rgba(255,255,255,0.5)',
              }}
            >
              {name === 'ultraThin' ? 'Ultra Thin' : name.charAt(0).toUpperCase() + name.slice(1)}
              <div style={{ font: '400 9px var(--font-mono)', opacity: 0.6, marginTop: 4 }}>{opacities[i]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────

function CompButtonsCard() {
  const base = {
    font: '600 17px/1 var(--font-sans)', padding: '14px 22px',
    borderRadius: 12, border: 'none', cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent', transition: 'opacity .15s',
  }
  return (
    <div style={{
      padding: 24, background: 'var(--systemBackground)',
      display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center',
    }}>
      <button style={{ ...base, background: 'var(--systemBlue)', color: 'white' }}>Continue</button>
      <button style={{ ...base, background: 'rgba(0,122,255,0.15)', color: 'var(--systemBlue)' }}>Continue</button>
      <button style={{ ...base, background: 'var(--systemFill)', color: 'var(--label)' }}>Cancel</button>
      <button style={{ ...base, background: 'transparent', color: 'var(--systemBlue)' }}>Skip</button>
      <button style={{ ...base, background: 'var(--systemRed)', color: 'white' }}>Delete</button>
    </div>
  )
}

function CompCardsCard() {
  const card = {
    background: 'var(--secondarySystemGroupedBackground)',
    borderRadius: 14, padding: '14px 16px',
    display: 'flex', alignItems: 'center', gap: 12,
    boxShadow: 'var(--shadow-2)',
  }
  return (
    <div style={{ padding: 18, background: 'var(--secondarySystemBackground)', display: 'grid', gap: 10 }}>
      <div style={card}>
        <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)' }} />
        <div style={{ flex: 1, display: 'grid', gap: 2 }}>
          <div style={{ font: '600 15px var(--font-sans)', color: 'var(--label)' }}>Morning Walk</div>
          <div style={{ font: '400 13px var(--font-sans)', color: 'var(--secondaryLabel)' }}>4.2 km · 38 min</div>
        </div>
        <div style={{ font: '500 13px var(--font-sans)', color: 'var(--tertiaryLabel)' }}>Today</div>
      </div>
      <div style={card}>
        <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,#a18cd1,#fbc2eb)' }} />
        <div style={{ flex: 1, display: 'grid', gap: 2 }}>
          <div style={{ font: '600 15px var(--font-sans)', color: 'var(--label)' }}>Evening Yoga</div>
          <div style={{ font: '400 13px var(--font-sans)', color: 'var(--secondaryLabel)' }}>25 min · Beginner</div>
        </div>
        <div style={{ font: '500 13px var(--font-sans)', color: 'var(--tertiaryLabel)' }}>Yesterday</div>
      </div>
    </div>
  )
}

function CompListCard() {
  const rows = [
    { ico: 'W', bg: 'var(--systemBlue)', label: 'Wi-Fi', val: 'Home' },
    { ico: 'B', bg: 'var(--systemBlue)', label: 'Bluetooth', val: 'On' },
    { ico: 'C', bg: 'var(--systemGreen)', label: 'Cellular', val: '' },
    { ico: 'N', bg: 'var(--systemOrange)', label: 'Notifications', val: '' },
  ]
  return (
    <div style={{ padding: 24, background: 'var(--systemGroupedBackground)' }}>
      <div style={{ background: 'var(--secondarySystemGroupedBackground)', borderRadius: 10, overflow: 'hidden' }}>
        {rows.map((r, i) => (
          <div
            key={r.label}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', minHeight: 44,
              borderTop: i > 0 ? '0.5px solid var(--separator)' : 'none',
              marginLeft: i > 0 ? 16 : 0,
              paddingLeft: i > 0 ? 0 : 16,
            }}
          >
            <div style={{
              width: 29, height: 29, borderRadius: 6, background: r.bg, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              font: '600 13px var(--font-sans)', flexShrink: 0,
            }}>{r.ico}</div>
            <span style={{ flex: 1, font: '400 17px var(--font-sans)', color: 'var(--label)' }}>{r.label}</span>
            {r.val && <span style={{ font: '400 17px var(--font-sans)', color: 'var(--secondaryLabel)' }}>{r.val}</span>}
            <span style={{ color: 'var(--tertiaryLabel)', font: '600 14px var(--font-sans)' }}>›</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CompNavBarCard() {
  return (
    <div style={{ padding: 18, background: 'var(--systemGroupedBackground)' }}>
      <div className="material-chrome" style={{
        padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '0.5px solid var(--separator)', borderRadius: '10px 10px 0 0',
      }}>
        <span style={{ font: '400 17px var(--font-sans)', color: 'var(--systemBlue)' }}>‹ Inbox</span>
        <span style={{ flex: 1, textAlign: 'center', font: '600 17px var(--font-sans)', color: 'var(--label)' }}>Sarah Chen</span>
        <span style={{ color: 'var(--systemBlue)', font: '400 17px var(--font-sans)' }}>Edit</span>
      </div>
      <div style={{
        background: 'var(--secondarySystemGroupedBackground)', height: 80,
        borderRadius: '0 0 10px 10px', padding: 16,
        font: '400 15px var(--font-sans)', color: 'var(--secondaryLabel)',
      }}>
        Standard nav bar — translucent material, back affordance left, title center, action right.
      </div>
    </div>
  )
}

function CompTabBarCard() {
  return (
    <div style={{
      height: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      paddingBottom: 14, background: 'linear-gradient(180deg, #4a90e2 0%, #357abd 100%)',
    }}>
      <div className="material-chrome" style={{
        display: 'flex', gap: 4, borderRadius: 28, padding: 6,
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
        border: '0.5px solid rgba(255,255,255,0.3)',
      }}>
        {[
          { ico: '⌂', label: 'Home', active: true },
          { ico: '⌕', label: 'Search', active: false },
          { ico: '♡', label: 'Saved', active: false },
          { ico: '○', label: 'Profile', active: false },
        ].map(it => (
          <div
            key={it.label}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '8px 16px', borderRadius: 22, minWidth: 60,
              background: it.active ? 'rgba(0,122,255,0.15)' : 'transparent',
              color: it.active ? 'var(--systemBlue)' : 'var(--secondaryLabel)',
              font: '600 10px var(--font-sans)',
            }}
          >
            <div style={{ font: '400 22px var(--font-sans)', lineHeight: 1 }}>{it.ico}</div>
            {it.label}
          </div>
        ))}
      </div>
    </div>
  )
}

function CompAlertCard() {
  return (
    <div style={{
      padding: 16, background: 'var(--secondarySystemBackground)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }}>
      <div className="material-chrome" style={{
        width: 270, borderRadius: 14, overflow: 'hidden',
        boxShadow: 'var(--shadow-modal)',
      }}>
        <div style={{ padding: '19px 16px 16px', textAlign: 'center' }}>
          <div style={{ font: '600 17px/1.3 var(--font-sans)', color: 'var(--label)', marginBottom: 4 }}>Delete Photo?</div>
          <div style={{ font: '400 13px/1.3 var(--font-sans)', color: 'var(--label)' }}>
            This photo will be deleted from iCloud Photos on all your devices.
          </div>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          borderTop: '0.5px solid var(--separator)',
        }}>
          <button style={{
            all: 'unset', padding: '11px 0', textAlign: 'center',
            font: '400 17px var(--font-sans)', color: 'var(--systemBlue)', cursor: 'pointer',
          }}>Cancel</button>
          <button style={{
            all: 'unset', padding: '11px 0', textAlign: 'center',
            font: '600 17px var(--font-sans)', color: 'var(--systemBlue)', cursor: 'pointer',
            borderLeft: '0.5px solid var(--separator)',
          }}>Delete</button>
        </div>
      </div>
    </div>
  )
}

function CompBadgesCard() {
  const badge = (bg, color) => ({
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '3px 8px', borderRadius: 9999,
    font: '600 13px var(--font-sans)',
    background: bg, color,
  })
  const num = {
    background: 'var(--systemRed)', color: 'white',
    minWidth: 20, height: 20, padding: '0 6px', borderRadius: 9999,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    font: '600 13px var(--font-sans)',
  }
  return (
    <div style={{
      padding: 18, background: 'var(--systemBackground)',
      display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
    }}>
      <span style={badge('rgba(0,122,255,0.15)', 'var(--systemBlue)')}>New</span>
      <span style={badge('rgba(52,199,89,0.18)', 'var(--systemGreen)')}>Active</span>
      <span style={badge('rgba(255,59,48,0.18)', 'var(--systemRed)')}>Failed</span>
      <span style={badge('rgba(255,149,0,0.18)', 'var(--systemOrange)')}>Pending</span>
      <span style={badge('var(--systemFill)', 'var(--label)')}>Draft</span>
      <span style={num}>3</span>
      <span style={num}>12</span>
      <span style={num}>99+</span>
    </div>
  )
}

function CompInputsCard() {
  return (
    <div style={{
      padding: 24, background: 'var(--secondarySystemBackground)',
      display: 'grid', gap: 14,
    }}>
      <input
        type="text"
        placeholder="Email or phone number"
        style={{
          background: 'var(--systemBackground)', borderRadius: 10,
          padding: '12px 14px', font: '400 17px var(--font-sans)',
          border: '1px solid var(--separator)', color: 'var(--label)',
          outline: 'none',
        }}
      />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--systemFill)', borderRadius: 10, padding: '8px 12px',
      }}>
        <span style={{ color: 'var(--secondaryLabel)' }}>⌕</span>
        <input
          type="text"
          placeholder="Search"
          style={{
            all: 'unset', flex: 1, font: '400 17px var(--font-sans)',
            color: 'var(--label)',
          }}
        />
      </div>
    </div>
  )
}

function CompControlsCard() {
  const [airplane, setAirplane] = useState(true)
  const [seg, setSeg] = useState('Day')
  return (
    <div style={{
      padding: 24, background: 'var(--systemGroupedBackground)',
      display: 'grid', gap: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ flex: 1, font: '400 15px var(--font-sans)', color: 'var(--label)' }}>Airplane Mode</span>
        <div
          className={'hig-toggle' + (airplane ? ' on' : '')}
          onClick={() => setAirplane(!airplane)}
        >
          <div className="hig-knob" />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ flex: 1, font: '400 15px var(--font-sans)', color: 'var(--label)' }}>Quantity</span>
        <div style={{
          display: 'flex', alignItems: 'center', background: 'var(--systemFill)',
          borderRadius: 8, overflow: 'hidden',
        }}>
          <button style={{ all: 'unset', width: 38, height: 30, textAlign: 'center', cursor: 'pointer', font: '400 20px var(--font-sans)', color: 'var(--label)' }}>−</button>
          <button style={{ all: 'unset', width: 38, height: 30, textAlign: 'center', cursor: 'pointer', font: '400 20px var(--font-sans)', color: 'var(--label)', borderLeft: '0.5px solid var(--separator)' }}>+</button>
        </div>
      </div>
      <div style={{ display: 'flex', background: 'var(--systemFill)', borderRadius: 8, padding: 2, gap: 2 }}>
        {['Day', 'Week', 'Month', 'Year'].map(s => (
          <button
            key={s}
            onClick={() => setSeg(s)}
            style={{
              all: 'unset', flex: 1, padding: '6px 14px', textAlign: 'center',
              font: '500 13px var(--font-sans)', color: 'var(--label)',
              borderRadius: 6, cursor: 'pointer',
              background: seg === s ? 'var(--systemBackground)' : 'transparent',
              boxShadow: seg === s ? 'var(--shadow-1)' : 'none',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// BRAND
// ─────────────────────────────────────────────────────────────

function BrandLogoCard() {
  return (
    <div style={{ height: 220, background: 'var(--systemBackground)', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
      <div style={{ background: '#fff', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ font: '400 88px/1 var(--font-sans)', color: '#000' }}></div>
        <div style={{ font: '500 11px var(--font-mono)', color: 'var(--secondaryLabel)' }}>Apple logo · light surface</div>
      </div>
      <div style={{ background: '#000', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <div style={{ font: '400 88px/1 var(--font-sans)', color: '#fff' }}></div>
        <div style={{ font: '500 11px var(--font-mono)', color: 'rgba(235,235,245,0.6)' }}>Apple logo · dark surface</div>
      </div>
    </div>
  )
}

function BrandAppIconsCard() {
  const icons = [
    { cls: 'linear-gradient(180deg, #4ba0ff 0%, #007AFF 100%)', glyph: 'A' },
    { cls: 'linear-gradient(180deg, #6fdc8c 0%, #34C759 100%)', glyph: '✓' },
    { cls: 'linear-gradient(180deg, #FFB04D 0%, #FF9500 100%)', glyph: '☼' },
    { cls: 'linear-gradient(180deg, #C570E8 0%, #AF52DE 100%)', glyph: '♪' },
  ]
  return (
    <div style={{
      padding: 24, background: 'var(--secondarySystemBackground)',
      display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap',
    }}>
      {icons.map((ic, i) => (
        <div
          key={i}
          style={{
            width: 100, height: 100, borderRadius: '22.37%', background: ic.cls,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
          }}
        >
          <div style={{ font: '700 56px/1 var(--font-sans)', color: 'white' }}>{ic.glyph}</div>
        </div>
      ))}
      <div style={{ font: '400 12px var(--font-sans)', color: 'var(--secondaryLabel)', maxWidth: 180 }}>
        iOS app icon mask · <code style={{ font: '500 11px var(--font-mono)' }}>border-radius: 22.37%</code> — the official squircle proportion, 1024×1024 master.
      </div>
    </div>
  )
}

function BrandSymbolsCard() {
  const symbols = ['home', 'search', 'bell', 'heart', 'user', 'settings', 'plus', 'share']
  // SVG path/glyph alternatives for each (Lucide-style geometric)
  return (
    <div style={{ padding: 20, background: 'var(--systemBackground)' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)',
        gap: '18px 12px', alignItems: 'center', justifyItems: 'center',
      }}>
        {symbols.map(name => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontSize: 22, color: 'var(--label)', lineHeight: 1 }}>{glyphFor(name)}</div>
            <div style={{ font: '500 9px var(--font-mono)', color: 'var(--secondaryLabel)' }}>{name}</div>
          </div>
        ))}
        <div style={{
          gridColumn: '1 / -1', font: '400 11px var(--font-sans)',
          color: 'var(--tertiaryLabel)', textAlign: 'center', marginTop: 4,
        }}>
          Substituting <strong>Lucide</strong> for SF Symbols (web-incompatible). For production specs, name SF Symbols directly (e.g. <code style={{ font: '500 11px var(--font-mono)' }}>house.fill</code>).
        </div>
      </div>
    </div>
  )
}

function glyphFor(name) {
  const map = {
    home: '⌂', search: '⌕', bell: '🔔', heart: '♡',
    user: '☻', settings: '⚙', plus: '+', share: '↗',
  }
  return map[name] || '◯'
}

// ─────────────────────────────────────────────────────────────
// Panels
// ─────────────────────────────────────────────────────────────

function FoundationsPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <PreviewCard title="System Palette" subtitle="12 named colors · light mode vivid variants">
        <ColorsSystemCard />
      </PreviewCard>
      <PreviewCard title="System Grays" subtitle="6-step gray scale">
        <ColorsGraysCard />
      </PreviewCard>
      <PreviewCard title="Label Hierarchy" subtitle="label / secondary / tertiary / quaternary">
        <ColorsLabelsCard />
      </PreviewCard>
      <PreviewCard title="Background Layers" subtitle="systemBackground / secondary / tertiary">
        <ColorsBackgroundsCard />
      </PreviewCard>
      <PreviewCard title="Display Type Scale" subtitle="Large Title → Title 3 (34–20 pt)">
        <TypeDisplayCard />
      </PreviewCard>
      <PreviewCard title="Body & Captions" subtitle="Headline → Caption 2 (17–11 pt)">
        <TypeBodyCard />
      </PreviewCard>
      <PreviewCard title="Type Families" subtitle="SF Pro · SF Rounded · SF Mono · New York">
        <TypeFamiliesCard />
      </PreviewCard>
      <PreviewCard title="8pt Grid" subtitle="Spacing scale · 44pt min hit target">
        <SpacingScaleCard />
      </PreviewCard>
      <PreviewCard title="Radii Scale" subtitle="4 / 6 / 10 / 14 / 20 / 28 / pill / app-icon mask">
        <SpacingRadiiCard />
      </PreviewCard>
      <PreviewCard title="Shadows" subtitle="Soft, low-spread · shadow-1 → shadow-4">
        <SpacingShadowsCard />
      </PreviewCard>
      <PreviewCard title="Materials" subtitle="Ultra Thin / Thin / Regular / Thick / Chrome — vibrancy + blur" fullBleed>
        <SpacingMaterialsCard />
      </PreviewCard>
    </div>
  )
}

function ComponentsPanel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <PreviewCard title="Buttons" subtitle="Filled · Tinted · Gray · Plain · Destructive">
        <CompButtonsCard />
      </PreviewCard>
      <PreviewCard title="Cards" subtitle="Workout-style card with thumb + trailing">
        <CompCardsCard />
      </PreviewCard>
      <PreviewCard title="Inset Grouped List" subtitle="Settings-style with icons + chevrons" fullBleed>
        <CompListCard />
      </PreviewCard>
      <PreviewCard title="Navigation Bar" subtitle="Material chrome · back · title · action">
        <CompNavBarCard />
      </PreviewCard>
      <PreviewCard title="Floating Tab Bar (iOS 26)" subtitle="Liquid Glass material · pill segments" fullBleed>
        <CompTabBarCard />
      </PreviewCard>
      <PreviewCard title="Alert" subtitle="Modal · centered · 270 pt wide">
        <CompAlertCard />
      </PreviewCard>
      <PreviewCard title="Badges" subtitle="Tinted pills + red number dots">
        <CompBadgesCard />
      </PreviewCard>
      <PreviewCard title="Inputs" subtitle="Bordered field + search field with system fill">
        <CompInputsCard />
      </PreviewCard>
      <PreviewCard title="Controls" subtitle="Toggle · stepper · segmented">
        <CompControlsCard />
      </PreviewCard>
    </div>
  )
}

function BrandPanel() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <PreviewCard title="Apple Logo" subtitle="Single mark · light vs dark surface — used sparingly" fullBleed>
        <BrandLogoCard />
      </PreviewCard>
      <PreviewCard title="App Icons" subtitle="22.37% squircle mask · 1024×1024 master · gradient + glyph">
        <BrandAppIconsCard />
      </PreviewCard>
      <PreviewCard title="SF Symbols (Lucide substitute)" subtitle="6000+ icons paired with SF Pro · not web-usable">
        <BrandSymbolsCard />
      </PreviewCard>
    </div>
  )
}

function IOSPanel() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-800">iOS UI Kit</h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Clickable flow — Settings ↔ Profile · Messages ↔ Conversation. Tab bar switches apps inside the frame.
        </p>
      </div>
      <div className="flex justify-center bg-zinc-100 rounded-xl p-6">
        <IOSKit />
      </div>
    </div>
  )
}

function MacOSPanel() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-zinc-800">macOS UI Kit</h3>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Mail-style three-pane window — sidebar · message list · reader. Traffic lights + material toolbar.
        </p>
      </div>
      <div
        className="flex justify-center items-center rounded-xl p-6"
        style={{ background: 'linear-gradient(135deg, #d4d4e0 0%, #b8c4d4 50%, #c4b8d4 100%)' }}
      >
        <MacOSKit />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

export default function DesignSystem() {
  const [tab, setTab] = useState('foundations')

  return (
    <div className="apple-hig">
      {/* Header */}
      <div className="bg-white border border-zinc-200 rounded-xl p-4 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #4ba0ff 0%, #007AFF 100%)' }}>
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-semibold text-zinc-900">Apple HIG Design System</h2>
            <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">
              Public reference build from Apple's <a href="https://developer.apple.com/design/human-interface-guidelines" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Human Interface Guidelines</a>.
              Foundations (color, type, spacing, materials) + Components + Brand + iOS / macOS UI kits.
              SF Pro falls back to <code className="font-mono text-[10px]">-apple-system</code>; SF Symbols substituted by glyph approximations.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-zinc-200">
        {SUB_TABS.map(t => {
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? 'border-sky-500 text-zinc-900 bg-white/80'
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50/60'
              }`}
            >
              <Icon size={14} />
              {t.label}
            </button>
          )
        })}
      </div>

      {tab === 'foundations' && <FoundationsPanel />}
      {tab === 'components'  && <ComponentsPanel />}
      {tab === 'brand'       && <BrandPanel />}
      {tab === 'ios'         && <IOSPanel />}
      {tab === 'macos'       && <MacOSPanel />}
    </div>
  )
}
