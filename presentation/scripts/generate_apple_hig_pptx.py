"""
Apple HIG (Human Interface Guidelines) version of the scenario-planning deck.

Wraps `generate_pptx.py` and applies Apple HIG tokens via source substitution:
  - Samsung Blue / amber palette  →  Apple system palette
                                     (systemBlue + systemOrange + systemRed +
                                      systemGreen + label/secondaryLabel grays)
  - Soft blue/amber backgrounds   →  Apple layered backgrounds
                                     (systemBackground / secondarySystemBackground
                                      with subtle yellow tint for SO WHAT banners)
  - '맑은 고딕' / Calibri          →  SF Pro Text / SF Pro Display
                                     (Korean falls back via PowerPoint East-Asian
                                      font substitution → Apple SD Gothic Neo on mac)
  - Output path                   →  samsung-memory-scenario-planning-apple-hig.pptx
  - Chart asset folder            →  presentation/assets/apple-hig/

Run:
  python3 presentation/scripts/generate_apple_hig_pptx.py

Apple HIG design source: developer.apple.com/design/human-interface-guidelines
Bundle: claude.ai/design handoff KyJGNUGkVNHRXgliz88ssg

Apple HIG token notes:
  - Primary text uses #1D1D1F (Apple.com web text) — slightly softer than pure
    label (#000000) and works better on layered surfaces in a slide deck.
  - secondaryLabel (rgba(60,60,67,0.6)) computed on white ≈ #6E6E73.
  - opaqueSeparator = #C6C6C8 (used wherever separator is rendered as a fill).
  - Dark variants of system colors (Blue 0A84FF, Red FF453A …) live in dark
    mode; for a slide deck rendered in light environments we stay on the light
    palette throughout. systemOrange replaces amber as the secondary emphasis.
"""

import os
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC  = os.path.join(ROOT, 'presentation', 'scripts', 'generate_pptx.py')
PRES = os.path.join(ROOT, 'presentation')

# ============================================================
# Apple HIG token substitution map
# ============================================================
# Original palette       →  Apple HIG palette (semantic mapping)
# Samsung Blue 1428A0    →  systemBlue       #007AFF  (default accent)
# Amber       D97706     →  systemOrange     #FF9500  (warm secondary accent)
# Amber light FEF3C7     →  yellow-tint bg   #FFFAEC  (very light tinted bg
#                                                      for SO WHAT banners)
# Deep navy   0A1B5C     →  primary label    #1D1D1F  (Apple.com near-black)
# Red alert   C00000     →  systemRed        #FF3B30  (support-error)
# Green pos   059669     →  systemGreen      #34C759  (support-success)
# Dark text   1A1A1A     →  primary label    #1D1D1F
# Gray cap.   6B7280     →  secondaryLabel   #6E6E73  (computed on white)
# Light gray  D1D5DB     →  opaqueSeparator  #C6C6C8
# Soft blue   E8EEFC     →  secondarySystem  #F2F2F7  (Apple's neutral light bg)
# Soft white  F8FAFC     →  systemBackground #FFFFFF
# Red tint    FEE2E2     →  systemRed tint   #FFE5E3
# Gray tint   F3F4F6     →  secondarySystem  #F2F2F7
# Purple text 7C3AED     →  systemPurple     #AF52DE
# Purple bg   EDE9FE     →  systemPurple tint#F2EAFD

HEX_SUBS = [
    # Primary brand swap
    ('#1428A0', '#007AFF'),
    ('#1428a0', '#007aff'),
    ('#D97706', '#FF9500'),
    ('#d97706', '#ff9500'),
    ('#FEF3C7', '#FFFAEC'),
    ('#fef3c7', '#fffaec'),
    ('#0A1B5C', '#1D1D1F'),
    ('#0a1b5c', '#1d1d1f'),
    ('#C00000', '#FF3B30'),
    ('#c00000', '#ff3b30'),
    ('#059669', '#34C759'),
    ('#1A1A1A', '#1D1D1F'),
    ('#1a1a1a', '#1d1d1f'),
    ('#6B7280', '#6E6E73'),
    ('#6b7280', '#6e6e73'),
    ('#D1D5DB', '#C6C6C8'),
    ('#d1d5db', '#c6c6c8'),
    ('#E8EEFC', '#F2F2F7'),
    ('#e8eefc', '#f2f2f7'),
    ('#F8FAFC', '#FFFFFF'),
    ('#f8fafc', '#ffffff'),
    # Chart-only tints
    ('#FEE2E2', '#FFE5E3'),
    ('#fee2e2', '#ffe5e3'),
    ('#F3F4F6', '#F2F2F7'),
    ('#f3f4f6', '#f2f2f7'),
    ('#8B0000', '#D70015'),       # dark red label → Apple "secondary system red dark"
    ('#EDE9FE', '#F2EAFD'),       # purple bg → light systemPurple tint
    ('#ede9fe', '#f2eafd'),
    ('#7C3AED', '#AF52DE'),       # purple text → systemPurple
    ('#7c3aed', '#af52de'),
    ('#FF8B30', '#FF9500'),
    ('#FFB300', '#FF9500'),
    ('#1565C0', '#0A84FF'),       # darker blue variant
    ('#FBBF24', '#FFCC00'),       # → systemYellow
    ('#4F46E5', '#5856D6'),       # → systemIndigo
    ('#EC4899', '#FF2D55'),       # → systemPink
    ('#FFF3E0', '#FFFAEC'),
    ('#FFE0B2', '#FFE5B5'),
    ('#FFB74D', '#FF9F0A'),
]

RGB_SUBS = [
    # THEME dict literal swaps
    ('RGBColor(0x14, 0x28, 0xA0)', 'RGBColor(0x00, 0x7A, 0xFF)'),  # samsung_blue → systemBlue
    ('RGBColor(0x0A, 0x1B, 0x5C)', 'RGBColor(0x1D, 0x1D, 0x1F)'),  # deep_navy   → primary label
    ('RGBColor(0xD9, 0x77, 0x06)', 'RGBColor(0xFF, 0x95, 0x00)'),  # amber       → systemOrange
    ('RGBColor(0xFE, 0xF3, 0xC7)', 'RGBColor(0xFF, 0xFA, 0xEC)'),  # amber_light → yellow tint
    ('RGBColor(0x1A, 0x1A, 0x1A)', 'RGBColor(0x1D, 0x1D, 0x1F)'),  # dark_text   → near-black
    ('RGBColor(0x6B, 0x72, 0x80)', 'RGBColor(0x6E, 0x6E, 0x73)'),  # gray_caption→ secondaryLabel
    ('RGBColor(0xD1, 0xD5, 0xDB)', 'RGBColor(0xC6, 0xC6, 0xC8)'),  # light_gray  → opaqueSeparator
    ('RGBColor(0xE8, 0xEE, 0xFC)', 'RGBColor(0xF2, 0xF2, 0xF7)'),  # soft_blue   → secondarySystem bg
    ('RGBColor(0xF8, 0xFA, 0xFC)', 'RGBColor(0xFF, 0xFF, 0xFF)'),  # soft_white  → systemBackground
    ('RGBColor(0xC0, 0x00, 0x00)', 'RGBColor(0xFF, 0x3B, 0x30)'),  # red_alert   → systemRed
    ('RGBColor(0x05, 0x96, 0x69)', 'RGBColor(0x34, 0xC7, 0x59)'),  # green_pos   → systemGreen
    # Inline tints in slide builders
    ('RGBColor(0xFE, 0xF2, 0xF2)', 'RGBColor(0xFF, 0xE5, 0xE3)'),  # red bg lightest  → systemRed lightest tint
    ('RGBColor(0xEC, 0xFD, 0xF5)', 'RGBColor(0xE3, 0xF9, 0xE9)'),  # green bg lightest→ systemGreen lightest tint
    ('RGBColor(0xFE, 0xEC, 0xEC)', 'RGBColor(0xFF, 0xD9, 0xD7)'),  # red lighter
]

# Font substitutions — SF Pro family (PowerPoint uses East-Asian fallback for Korean)
FONT_SUBS = [
    ("FONT_KO = '맑은 고딕'", "FONT_KO = 'SF Pro Text'"),
    ("FONT_EN = 'Calibri'",  "FONT_EN = 'SF Pro Display'"),
    # matplotlib font-family — prefer SF Pro Display, keep Korean fallback chain
    ("matplotlib.rcParams['font.family'] = ['Apple SD Gothic Neo', 'Malgun Gothic', 'NanumGothic', 'sans-serif']",
     "matplotlib.rcParams['font.family'] = ['SF Pro Display', 'SF Pro Text', '-apple-system', 'Helvetica Neue', 'Apple SD Gothic Neo', 'Malgun Gothic', 'sans-serif']"),
]

# Output path + asset folder substitutions
PATH_SUBS = [
    ("'samsung-memory-scenario-planning.pptx'", "'samsung-memory-scenario-planning-apple-hig.pptx'"),
    ("os.path.join(ROOT, 'presentation', 'assets')",
     "os.path.join(ROOT, 'presentation', 'assets', 'apple-hig')"),
]

# Cover subtitle gets the design system name appended
COVER_SUBS = [
    ("'Scenario Planning Strategic Report  ·  Memory Business'",
     "'Scenario Planning Strategic Report  ·  Memory Business  ·  Apple HIG'"),
]


def apply_substitutions(source: str) -> str:
    """Apply Apple HIG token substitutions to the source code string."""
    out = source
    for old, new in HEX_SUBS + RGB_SUBS + FONT_SUBS + PATH_SUBS + COVER_SUBS:
        out = out.replace(old, new)
    return out


def main():
    print(f'Reading source: {SRC}')
    with open(SRC, encoding='utf-8') as f:
        source = f.read()

    print('Applying Apple HIG Design System substitutions...')
    transformed = apply_substitutions(source)

    swap_counts = {}
    for old, _ in HEX_SUBS + RGB_SUBS + FONT_SUBS + PATH_SUBS + COVER_SUBS:
        c = source.count(old)
        if c:
            swap_counts[old[:30]] = c
    total = sum(swap_counts.values())
    print(f'  Total token swaps planned: {total}')
    top = sorted(swap_counts.items(), key=lambda x: -x[1])[:10]
    for k, v in top:
        print(f'    {v:4d}× {k!r}')

    hig_assets = os.path.join(PRES, 'assets', 'apple-hig')
    os.makedirs(hig_assets, exist_ok=True)
    print(f'Apple HIG chart assets → {hig_assets}')

    exec_globals = {
        '__file__': SRC,
        '__name__': '__main__',
    }
    print('Executing transformed script (this runs main() at the bottom)...')
    exec(compile(transformed, SRC, 'exec'), exec_globals)

    output = os.path.join(PRES, 'samsung-memory-scenario-planning-apple-hig.pptx')
    if os.path.exists(output):
        kb = os.path.getsize(output) / 1024
        print(f'\nDone. Output: {output}  ({kb:.1f} KB)')
    else:
        print(f'\nWarning: expected output not found at {output}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
