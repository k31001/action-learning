#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SP-2 다운턴 시나리오별 삼성 메모리 영향 진단 -- 1장 슬라이드 생성.

단일 소스: wiki/downturn/samsung-impact.md (모든 문구·판정은 그 페이지의 압축)
출력:     outputs/presentation/downturn-scenario-impact.pptx
재생성:   .venv/bin/python outputs/presentation/scripts/generate_downturn_impact_slide.py

디자인 규율: samsung-memory-ppt-design-skill
  - 화이트 배경 + Samsung Blue(#1428A0) 단일 액센트, 적/녹은 노출 등급 의미 전달에만
  - 슬라이드 문구에 em-dash 금지, 각주 외 10pt 미만 금지, 액션 타이틀
  - 확률·전략 코드(DP/DR) 미표기 (진단 층의 역할 경계)

v2 (2026-08-25): 텍스트 축약 리디자인 -- 제품 노출을 공유 히트맵으로 통합,
  시나리오별 프로즈를 승부처 인용구 + W/S 키워드 힌트 한 줄로 압축.
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

# ── 디자인 토큰 ──────────────────────────────────────────────────────────────
BLUE   = RGBColor(0x14, 0x28, 0xA0)
BAND   = RGBColor(0xEE, 0xF1, 0xFA)
INK    = RGBColor(0x1A, 0x1A, 0x1A)
GRAY   = RGBColor(0x55, 0x55, 0x55)
G_LINE = RGBColor(0xD9, 0xD9, 0xD9)
G_BG   = RGBColor(0xF7, 0xF8, 0xFA)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
RED    = RGBColor(0xD9, 0x30, 0x25)
RED_T  = RGBColor(0xF3, 0xC2, 0xBD)
RED_TX = RGBColor(0xB4, 0x4A, 0x40)
GRAY_C = RGBColor(0xE9, 0xEA, 0xEC)
GREEN  = RGBColor(0x00, 0xA6, 0x51)

FONT = 'SamsungOneKorean'

def _font(run, size, bold=False, color=INK, name=FONT):
    f = run.font
    f.name, f.size, f.bold = name, Pt(size), bold
    f.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    for tag in ('a:ea', 'a:cs'):
        e = rPr.find(qn(tag))
        if e is None:
            e = rPr.makeelement(qn(tag), {})
            rPr.append(e)
        e.set('typeface', name)

def txt(slide, x, y, w, h, parts, *, size=10, align=PP_ALIGN.LEFT,
        leading=1.12, anchor=MSO_ANCHOR.TOP, wrap=True):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = Emu(0)
    if isinstance(parts, str):
        parts = [[(parts, {})]]
    elif parts and isinstance(parts[0], tuple):
        parts = [parts]
    for i, line in enumerate(parts):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = leading
        if isinstance(line, str):
            line = [(line, {})]
        for text, kw in line:
            r = p.add_run()
            r.text = text
            _font(r, kw.get('size', size), kw.get('bold', False), kw.get('color', INK))
    return tb

def box(slide, x, y, w, h, *, fill=None, line=None, line_w=0.75, rnd=False, radius=0.055):
    shp = MSO_SHAPE.ROUNDED_RECTANGLE if rnd else MSO_SHAPE.RECTANGLE
    s = slide.shapes.add_shape(shp, Inches(x), Inches(y), Inches(w), Inches(h))
    if rnd:
        s.adjustments[0] = radius
    s.fill.solid() if fill else s.fill.background()
    if fill:
        s.fill.fore_color.rgb = fill
    if line:
        s.line.color.rgb = line
        s.line.width = Pt(line_w)
    else:
        s.line.fill.background()
    s.shadow.inherit = False
    return s

def vline(slide, x, y, h, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x), Inches(y + h))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

def hline(slide, x, y, w, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x + w), Inches(y))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

# ── 콘텐츠 (wiki/downturn/samsung-impact.md 압축) ───────────────────────────
SW_CHIPS = [
    ('S1', '재무 요새', True), ('S2', '풀라인업', True),
    ('S3', 'IDM 전환력', True), ('S4', '세대 선행', True),
    ('W1', '인증 열위', False), ('W2', '원가 열위', False),
    ('W3', '판단 지연', False), ('W4', '커밋 관성', False),
]

# 노출 등급: (셀 색, 글자 색)
LV = {
    '직격': (RED,    WHITE),
    '압박': (RED_T,  RED_TX),
    '제한': (GRAY_C, GRAY),
    '방어': (GREEN,  WHITE),
    '수혜': (GREEN,  WHITE),
}
PRODUCTS = ['HBM', '서버 DRAM', '범용·레거시', 'NAND·SSD']

SCEN = [
    dict(code='DT-A', name='급제동', typ='수요발 × 급락',
         exp=['직격', '직격', '제한', '압박'],
         pivot='대응할 시간이 없다.\n도착 전에 이미 결정된다',
         w=('W3·W1', '판단을 신호에 사전 위임'),
         s=('S1·S2', '체력을 바닥 매수 선택권으로'),
         areas=['계약 만기 구조', '조달·FCF 신호', '재무 여력 운용']),
    dict(code='DT-B', name='긴 하산', typ='수요발 × 침식',
         exp=['압박', '압박', '압박', '수혜'],
         pivot='위기감이 없는 것이\n가장 큰 위기다',
         w=('W3', '판단 기준을 원가 곡선으로'),
         s=('S2', '스토리지 축이 유일한 상방'),
         areas=['메모리 원단위', '원가 곡선 백분위', '스토리지·SSD 축']),
    dict(code='DT-C', name='동시 방류', typ='공급발 × 급락',
         exp=['제한', '압박', '직격', '직격'],
         pivot='감산이 통하는 유일한 판.\n승부는 속도다',
         w=('W3·W4', '결정 기준·기한 사전 못박기'),
         s=('S4·S1', '원가 선행으로 규율 선도'),
         areas=['재고·투입 갭', '원가 리더십', '규율 집행 속도']),
    dict(code='DT-D', name='저가 잠식', typ='공급발 × 침식',
         exp=['방어', '제한', '직격', '직격'],
         pivot='하단은 돌아오지 않는다.\n버티기가 아니라 옮기기다',
         w=('W2·W4', '소모전 무효, 좌표 재설정'),
         s=('S3', '라인을 옮겨 태우는 전환력'),
         areas=['철수·전환 판단', '4자 원가 곡선', '인증 장벽 동향']),
    dict(code='DT-E', name='판 갈이', typ='전환발 · 와일드카드',
         exp=['직격', '압박', '제한', '수혜'],
         pivot='미리 그 자리에 있던\n것만 유효하다',
         w=('W4·W1', '별동대 분리 보존'),
         s=('S3·S4', 'IDM 결합으로 표준 선점'),
         areas=['차세대 마일스톤', '커스텀 대응 체계', '조직 경계']),
]

# ── 슬라이드 ────────────────────────────────────────────────────────────────
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
slide = prs.slides.add_slide(prs.slide_layouts[6])

MX, MW = 0.47, 12.393

# 타이틀 (액션 타이틀)
txt(slide, MX, 0.28, MW, 0.38, [[
    ('시나리오별 영향 진단:  ', {'bold': True, 'color': BLUE, 'size': 20}),
    ('강점의 발화는 갈리고, 약점은 판단 지연으로 수렴한다', {'bold': True, 'size': 20}),
]])
hline(slide, MX, 0.74, MW, BLUE, 1.6)

# S/W 코드 칩 (1줄 8칩)
chip_w, chip_g = 1.474, 0.086
for i, (code, name, is_s) in enumerate(SW_CHIPS):
    cx = MX + i * (chip_w + chip_g)
    accent = BLUE if is_s else RED
    box(slide, cx, 0.88, chip_w, 0.34, fill=(BAND if is_s else G_BG),
        line=G_LINE, line_w=0.5, rnd=True, radius=0.16)
    txt(slide, cx, 0.955, chip_w, 0.2, [[
        (code + '  ', {'bold': True, 'color': accent, 'size': 10.5}),
        (name, {'size': 10.5}),
    ]], align=PP_ALIGN.CENTER, leading=1.0)

# ── 그리드 좌표 ──
RAIL_W = 1.06
col_g = 0.10
col_w = (MW - RAIL_W - 4 * col_g) / 5      # 2.185
col_x = [MX + RAIL_W + i * (col_w + col_g) for i in range(5)]

# 컬럼 헤더
HY = 1.44
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, HY, col_w, 0.045, fill=BLUE)
    txt(slide, x, HY + 0.10, col_w, 0.22, [[
        (sc['code'] + '  ', {'bold': True, 'color': BLUE, 'size': 13}),
        (sc['name'], {'bold': True, 'size': 13})]], leading=1.0)
    txt(slide, x, HY + 0.35, col_w, 0.16, [[(sc['typ'], {'color': GRAY, 'size': 10})]], leading=1.0)

# 노출 히트맵 (공유 좌측 레일 + 5열 셀)
LGY = 2.06
txt(slide, MX, LGY, RAIL_W - 0.06, 0.16, [[('제품 노출', {'bold': True, 'color': GRAY, 'size': 10})]], leading=1.0)
legend = [('■ 직격  ', RED), ('■ 압박  ', RED_TX), ('■ 제한  ', GRAY), ('■ 방어·수혜', GREEN)]
txt(slide, MX + MW - 3.4, LGY, 3.4, 0.16,
    [[(t, {'color': c, 'size': 10}) for t, c in legend]], align=PP_ALIGN.RIGHT, leading=1.0)

HM_Y, cell_h, cell_g = 2.30, 0.295, 0.055
for r, prod in enumerate(PRODUCTS):
    ry = HM_Y + r * (cell_h + cell_g)
    txt(slide, MX, ry + 0.065, RAIL_W - 0.10, 0.16,
        [[(prod, {'color': GRAY, 'size': 10})]], align=PP_ALIGN.RIGHT, leading=1.0, wrap=False)
    for i, sc in enumerate(SCEN):
        lv = sc['exp'][r]
        fill, tcol = LV[lv]
        box(slide, col_x[i], ry, col_w, cell_h, fill=fill, rnd=True, radius=0.14)
        txt(slide, col_x[i], ry + 0.062, col_w, 0.17,
            [[(lv, {'bold': True, 'color': tcol, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)
HM_END = HM_Y + 4 * cell_h + 3 * cell_g    # 3.645

# 컬럼 사이 얇은 세로 구분선 (진단 영역)
DIAG_Y = HM_END + 0.18
DIAG_END = 6.55
for i in range(1, 5):
    vline(slide, col_x[i] - col_g / 2, DIAG_Y, DIAG_END - DIAG_Y)

for i, sc in enumerate(SCEN):
    x = col_x[i]
    # 승부처: 인용구 스타일 (블루 좌측 바 + 볼드 2줄)
    box(slide, x, DIAG_Y + 0.02, 0.035, 0.52, fill=BLUE)
    txt(slide, x + 0.13, DIAG_Y + 0.03, col_w - 0.13, 0.52,
        [[(ln, {'bold': True, 'size': 11.5})] for ln in sc['pivot'].split('\n')], leading=1.12)
    # 찔리는 곳 (W)
    wy = DIAG_Y + 0.72
    txt(slide, x, wy, col_w, 0.17, [[
        ('찔리는 곳  ', {'bold': True, 'color': RED, 'size': 10}),
        (sc['w'][0], {'bold': True, 'color': RED, 'size': 10.5})]], leading=1.0)
    txt(slide, x, wy + 0.20, col_w, 0.18, [[(sc['w'][1], {'size': 10.5})]], leading=1.0)
    # 살리는 곳 (S)
    sy = wy + 0.52
    txt(slide, x, sy, col_w, 0.17, [[
        ('살리는 곳  ', {'bold': True, 'color': BLUE, 'size': 10}),
        (sc['s'][0], {'bold': True, 'color': BLUE, 'size': 10.5})]], leading=1.0)
    txt(slide, x, sy + 0.20, col_w, 0.18, [[(sc['s'][1], {'size': 10.5})]], leading=1.0)
    # 전략적 중요 분야
    ay0 = sy + 0.56
    txt(slide, x, ay0, col_w, 0.16, [[('전략적 중요 분야', {'bold': True, 'color': GRAY, 'size': 10})]], leading=1.0)
    for ai, area in enumerate(sc['areas']):
        ay = ay0 + 0.21 + ai * 0.255
        box(slide, x, ay, col_w, 0.21, fill=G_BG, line=G_LINE, line_w=0.4, rnd=True, radius=0.16)
        txt(slide, x, ay + 0.035, col_w, 0.15, [[(area, {'size': 10})]],
            align=PP_ALIGN.CENTER, leading=1.0)

# 종합 밴드 (1줄)
BY = 6.72
box(slide, MX, BY, MW, 0.34, fill=BAND, rnd=True, radius=0.10)
txt(slide, MX + 0.16, BY + 0.075, MW - 0.32, 0.2, [[
    ('종합  ', {'bold': True, 'color': BLUE, 'size': 10.5}),
    ('약점은 W3(판단 지연)로 수렴하고, 강점의 발화는 유형마다 갈린다.  ', {'size': 10.5}),
    ('어떤 강점을 살릴지는 감별이 정한다.', {'bold': True, 'size': 10.5}),
]], leading=1.0)

# 각주
txt(slide, MX, BY + 0.44, MW - 1.6, 0.18, [[
    ('출처: wiki/downturn/samsung-impact.md (근거·상세 진단) · 대응 전략은 별도 장 · 확률 미표기 원칙 · 기준일 2026-08',
     {'color': GRAY, 'size': 9})]], leading=1.0)
txt(slide, MX + MW - 1.5, BY + 0.44, 1.5, 0.18, [[('[문서등급 표기]', {'color': GRAY, 'size': 9})]],
    align=PP_ALIGN.RIGHT, leading=1.0)

OUT = 'outputs/presentation/downturn-scenario-impact.pptx'
prs.save(OUT)
print('saved:', OUT)
