"""
IBM Carbon Design System version of the scenario-planning deck.

Wraps `generate_pptx.py` and applies Carbon tokens via source substitution:
  - Samsung Blue / amber palette  →  Carbon Blue-60 + Yellow-30 + Red-60 + Gray scale
  - Soft blue/amber backgrounds   →  Carbon layered surfaces (white / gray-10)
  - '맑은 고딕' / Calibri          →  IBM Plex Sans (Korean falls back via PowerPoint
                                     East-Asian font substitution)
  - Output path                   →  presentation/samsung-memory-scenario-planning-carbon.pptx
  - Chart asset folder            →  presentation/assets/carbon/

Run:
  python3 presentation/scripts/generate_carbon_pptx.py

Carbon design source: github.com/carbon-design-system/carbon @main
Bundled into the dashboard at dashboard/src/components/carbon/.
"""

import os
import re
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
SRC  = os.path.join(ROOT, 'presentation', 'scripts', 'generate_pptx.py')
PRES = os.path.join(ROOT, 'presentation')

# ============================================================
# Carbon token substitution map (applied to the source code)
# ============================================================
# Original palette       →  Carbon palette (semantic mapping)
# Samsung Blue 1428A0    →  Blue-60   #0f62fe  (the ONE accent)
# Amber       D97706     →  Yellow-30 #f1c21b  (secondary emphasis / "current")
# Amber light FEF3C7     →  Yellow-10 #fcf4d6  (notif--warning bg, SO WHAT banner)
# Deep navy   0A1B5C     →  Gray-100  #161616
# Red alert   C00000     →  Red-60    #da1e28  (support-error)
# Green pos   059669     →  Green-50  #24a148  (support-success)
# Dark text   1A1A1A     →  Gray-100  #161616
# Gray cap.   6B7280     →  Gray-70   #525252  (text-secondary)
# Light gray  D1D5DB     →  Gray-20   #e0e0e0  (border-subtle)
# Soft blue   E8EEFC     →  Blue-10   #edf5ff  (notif--info bg)
# Soft white  F8FAFC     →  Gray-10   #f4f4f4  (layer-01)
# Misc red bgs FEE2E2    →  Red-10    #fff1f1
# Misc gray bgs F3F4F6   →  Gray-10   #f4f4f4
# Purple ED E9 FE        →  Purple-10 #f6f2ff
# Purple text 7C3AED     →  Purple-60 #8a3ffc

HEX_SUBS = [
    # quoted hex literals (with various casings & quote styles)
    ('#1428A0', '#0f62fe'),
    ('#1428a0', '#0f62fe'),
    ('#D97706', '#f1c21b'),
    ('#d97706', '#f1c21b'),
    ('#FEF3C7', '#fcf4d6'),
    ('#fef3c7', '#fcf4d6'),
    ('#0A1B5C', '#161616'),
    ('#0a1b5c', '#161616'),
    ('#C00000', '#da1e28'),
    ('#c00000', '#da1e28'),
    ('#059669', '#24a148'),
    ('#1A1A1A', '#161616'),
    ('#1a1a1a', '#161616'),
    ('#6B7280', '#525252'),
    ('#6b7280', '#525252'),
    ('#D1D5DB', '#e0e0e0'),
    ('#d1d5db', '#e0e0e0'),
    ('#E8EEFC', '#edf5ff'),
    ('#e8eefc', '#edf5ff'),
    ('#F8FAFC', '#f4f4f4'),
    ('#f8fafc', '#f4f4f4'),
    # chart-only color variants
    ('#FEE2E2', '#fff1f1'),
    ('#fee2e2', '#fff1f1'),
    ('#F3F4F6', '#f4f4f4'),
    ('#f3f4f6', '#f4f4f4'),
    ('#FF8B30', '#ff832b'),
    ('#8B0000', '#a2191f'),       # dark red label → Carbon red-70
    ('#EDE9FE', '#f6f2ff'),       # purple bg → Carbon purple-10
    ('#ede9fe', '#f6f2ff'),
    ('#7C3AED', '#8a3ffc'),       # purple text → Carbon purple-60
    ('#7c3aed', '#8a3ffc'),
    ('#8B6914', '#684e00'),
    ('#FFB300', '#f1c21b'),
    ('#1565C0', '#0043ce'),
    ('#FBBF24', '#f1c21b'),
    ('#4F46E5', '#0f62fe'),
    ('#EC4899', '#d02670'),
    # Various amber tints used elsewhere
    ('#FFF3E0', '#fcf4d6'),
    ('#FFE0B2', '#fddc69'),
    ('#FFB74D', '#f1c21b'),
]

RGB_SUBS = [
    # RGBColor() arg lists in the THEME dict + ad-hoc calls
    ('RGBColor(0x14, 0x28, 0xA0)', 'RGBColor(0x0F, 0x62, 0xFE)'),  # samsung_blue → blue-60
    ('RGBColor(0x0A, 0x1B, 0x5C)', 'RGBColor(0x16, 0x16, 0x16)'),  # deep_navy   → gray-100
    ('RGBColor(0xD9, 0x77, 0x06)', 'RGBColor(0xF1, 0xC2, 0x1B)'),  # amber       → yellow-30
    ('RGBColor(0xFE, 0xF3, 0xC7)', 'RGBColor(0xFC, 0xF4, 0xD6)'),  # amber_light → yellow-10
    ('RGBColor(0x1A, 0x1A, 0x1A)', 'RGBColor(0x16, 0x16, 0x16)'),  # dark_text   → gray-100
    ('RGBColor(0x6B, 0x72, 0x80)', 'RGBColor(0x52, 0x52, 0x52)'),  # gray_caption→ gray-70
    ('RGBColor(0xD1, 0xD5, 0xDB)', 'RGBColor(0xE0, 0xE0, 0xE0)'),  # light_gray  → gray-20
    ('RGBColor(0xE8, 0xEE, 0xFC)', 'RGBColor(0xED, 0xF5, 0xFF)'),  # soft_blue   → blue-10
    ('RGBColor(0xF8, 0xFA, 0xFC)', 'RGBColor(0xF4, 0xF4, 0xF4)'),  # soft_white  → gray-10
    ('RGBColor(0xC0, 0x00, 0x00)', 'RGBColor(0xDA, 0x1E, 0x28)'),  # red_alert   → red-60
    ('RGBColor(0x05, 0x96, 0x69)', 'RGBColor(0x24, 0xA1, 0x48)'),  # green_pos   → green-50
    # Inline red tints for backgrounds (RGBColor(0xFE, 0xF2, 0xF2) etc.)
    ('RGBColor(0xFE, 0xF2, 0xF2)', 'RGBColor(0xFF, 0xF1, 0xF1)'),  # red-50 alpha → red-10
    ('RGBColor(0xEC, 0xFD, 0xF5)', 'RGBColor(0xDE, 0xFB, 0xE6)'),  # green tint   → green-10
    ('RGBColor(0xFE, 0xEC, 0xEC)', 'RGBColor(0xFF, 0xD7, 0xD9)'),  # red lighter  → red-20
]

# Font substitutions
FONT_SUBS = [
    ("FONT_KO = '맑은 고딕'", "FONT_KO = 'IBM Plex Sans'"),
    ("FONT_EN = 'Calibri'",  "FONT_EN = 'IBM Plex Sans'"),
    # matplotlib font-family — keep Korean fallback first, then IBM Plex Sans
    ("matplotlib.rcParams['font.family'] = ['Apple SD Gothic Neo', 'Malgun Gothic', 'NanumGothic', 'sans-serif']",
     "matplotlib.rcParams['font.family'] = ['IBM Plex Sans', 'Apple SD Gothic Neo', 'Malgun Gothic', 'NanumGothic', 'sans-serif']"),
]

# Output path + asset folder substitutions
PATH_SUBS = [
    # New output file
    ("'samsung-memory-scenario-planning.pptx'", "'samsung-memory-scenario-planning-carbon.pptx'"),
    # Move chart PNGs to a Carbon subfolder so the original deck's assets remain untouched
    ("os.path.join(ROOT, 'presentation', 'assets')",
     "os.path.join(ROOT, 'presentation', 'assets', 'carbon')"),
]

# Title-line additions — make the cover say "Carbon" so the file purpose is obvious
COVER_SUBS = [
    ("'Scenario Planning Strategic Report  ·  Memory Business'",
     "'Scenario Planning Strategic Report  ·  Memory Business  ·  IBM Carbon'"),
]


def apply_substitutions(source: str) -> str:
    """Apply Carbon token substitutions to the source code string."""
    out = source
    for old, new in HEX_SUBS + RGB_SUBS + FONT_SUBS + PATH_SUBS + COVER_SUBS:
        out = out.replace(old, new)
    return out


def main():
    print(f'Reading source: {SRC}')
    with open(SRC, encoding='utf-8') as f:
        source = f.read()

    print('Applying Carbon Design System substitutions...')
    transformed = apply_substitutions(source)

    # Report substitution counts (a crude verification)
    swap_counts = {}
    for old, _ in HEX_SUBS + RGB_SUBS + FONT_SUBS + PATH_SUBS + COVER_SUBS:
        c = source.count(old)
        if c:
            swap_counts[old[:30]] = c
    total = sum(swap_counts.values())
    print(f'  Total token swaps planned: {total}')
    top = sorted(swap_counts.items(), key=lambda x: -x[1])[:8]
    for k, v in top:
        print(f'    {v:4d}× {k!r}')

    # Make sure the Carbon asset dir exists before exec
    carbon_assets = os.path.join(PRES, 'assets', 'carbon')
    os.makedirs(carbon_assets, exist_ok=True)
    print(f'Carbon chart assets → {carbon_assets}')

    # Exec the transformed source in a clean globals dict.
    # Set __file__ so its os.path.dirname(__file__) logic still resolves.
    exec_globals = {
        '__file__': SRC,
        '__name__': '__main__',
    }
    print('Executing transformed script (this runs main() at the bottom)...')
    exec(compile(transformed, SRC, 'exec'), exec_globals)

    output = os.path.join(PRES, 'samsung-memory-scenario-planning-carbon.pptx')
    if os.path.exists(output):
        kb = os.path.getsize(output) / 1024
        print(f'\nDone. Output: {output}  ({kb:.1f} KB)')
    else:
        print(f'\nWarning: expected output not found at {output}', file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
