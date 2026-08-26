#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SP-2 다운턴 시나리오 -- 원인·파급·문제 정의 1장 슬라이드.

단일 소스: wiki/downturn/samsung-impact.md §5 (원인 계통과 제품 파급)
출력:     outputs/presentation/downturn-scenario-impact.pptx
재생성:   .venv/bin/python outputs/presentation/scripts/generate_downturn_impact_slide.py

v3 (2026-08-25): 원인 중심 재구성 -- S/W 진단·속도 축·노출 히트맵 제거.
  원인 계통(수요발 2·공급발 2·전환발 1) + 가상 헤드라인 + 제품별 수요/공급
  화살표 그리드 + 풀어야 할 문제. 색감은 그레이스케일 + 블루 최소 포인트.
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

# ── 토큰 (모노톤 + 블루 최소) ────────────────────────────────────────────────
BLUE   = RGBColor(0x14, 0x28, 0xA0)
INK    = RGBColor(0x1A, 0x1A, 0x1A)
GRAY   = RGBColor(0x55, 0x55, 0x55)
G_MID  = RGBColor(0x8A, 0x8A, 0x8E)
G_LINE = RGBColor(0xD9, 0xD9, 0xD9)
G_BG   = RGBColor(0xF6, 0xF6, 0xF7)
G_SH   = RGBColor(0xEC, 0xEC, 0xEE)   # 움직이는 열 음영
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)

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

def hline(slide, x, y, w, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x + w), Inches(y))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

def vline(slide, x, y, h, color=G_LINE, weight=0.5):
    ln = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x), Inches(y + h))
    ln.line.color.rgb = color
    ln.line.width = Pt(weight)
    ln.shadow.inherit = False

# ── 콘텐츠 (wiki/downturn/samsung-impact.md §5) ─────────────────────────────
PRODUCTS = ['HBM', '서버 DRAM', '범용·레거시', 'NAND·SSD']

# 화살표 스타일: (기호, 굵기, 색)
AR = {
    '↓↓': ('▼▼', True,  INK),
    '↓':  ('▼',  False, GRAY),
    '─':  ('─',  False, G_LINE),
    '↑':  ('▲',  False, GRAY),
    '↑↑': ('▲▲', True,  INK),
}

SCEN = [
    dict(code='DT-A 급제동', cause='투자 자금이 끊긴다', tag='조달 경색',
         side='d',
         head='「AI 인프라 자금줄 경색,\n데이터센터 발주 일제히 보류」',
         dem=['↓↓', '↓↓', '─', '↓'], sup=['─', '─', '─', '─'],
         prob='팔 곳이 사라진 고부가 캐파,\n어디로 돌릴 것인가'),
    dict(code='DT-B 긴 하산', cause='필요량이 줄어든다', tag='원단위 감소',
         side='d',
         head='「AI는 호황인데 메모리는\n제자리… 효율화의 역설」',
         dem=['↓', '↓', '↓', '↑'], sup=['─', '─', '─', '─'],
         prob='경보 없는 하강,\n무엇으로 감지할 것인가'),
    dict(code='DT-C 동시 방류', cause='기존 3사가 쏟아낸다', tag='증설 동시 도래',
         side='s',
         head='「신규 팹 동시 가동에 공급\n과잉… 치킨게임 재점화 우려」',
         dem=['─', '─', '─', '─'], sup=['↑', '↑', '↑↑', '↑↑'],
         prob='공급 조절 결단,\n얼마나 빨리 내릴 것인가'),
    dict(code='DT-D 저가 잠식', cause='신흥이 파고든다', tag='보조금 공급',
         side='s',
         head='「중국산 메모리 범용 시장\n잠식… 가격 하단이 사라졌다」',
         dem=['─', '─', '─', '─'], sup=['─', '↑', '↑↑', '↑↑'],
         prob='돌아오지 않는 하단,\n무엇으로 대체할 것인가'),
    dict(code='DT-E 판 갈이', cause='제품 정의가 바뀐다', tag='기술 대체',
         side='d',
         head='「HBM 시대 저무나…\n주문은 차세대 메모리로」',
         dem=['↓↓', '↓', '─', '↑'], sup=['─', '─', '─', '─'],
         prob='다음 판의 자리,\n지금 어떻게 확보할 것인가'),
]

GROUPS = [  # (시작 컬럼, 컬럼 수, 라벨)
    (0, 2, [('수요발', True), (' · 수요가 꺼진다', False)]),
    (2, 2, [('공급발', True), (' · 공급이 넘친다', False)]),
    (4, 1, [('전환발', True), (' · 판이 바뀐다', False)]),
]

# ── 슬라이드 ────────────────────────────────────────────────────────────────
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
slide = prs.slides.add_slide(prs.slide_layouts[6])

MX, MW = 0.47, 12.393

# 타이틀
txt(slide, MX, 0.28, MW, 0.38, [[
    ('다운턴의 다섯 갈래:  ', {'bold': True, 'color': BLUE, 'size': 20}),
    ('꺼지는 수요가 둘, 넘치는 공급이 둘, 바뀌는 판이 하나다', {'bold': True, 'size': 20}),
]])
hline(slide, MX, 0.76, MW, BLUE, 1.4)

# 그리드 좌표
RAIL_W = 1.10
col_g = 0.12
col_w = (MW - RAIL_W - 4 * col_g) / 5
col_x = [MX + RAIL_W + i * (col_w + col_g) for i in range(5)]

# 원인 대분류 밴드
GB_Y, GB_H = 0.94, 0.34
for st, n, label in GROUPS:
    gx = col_x[st]
    gw = n * col_w + (n - 1) * col_g
    box(slide, gx, GB_Y, gw, GB_H, fill=G_BG, line=G_LINE, line_w=0.5, rnd=True, radius=0.12)
    txt(slide, gx, GB_Y + 0.075, gw, 0.2, [[
        (t, {'bold': b, 'size': 11}) for t, b in label
    ]], align=PP_ALIGN.CENTER, leading=1.0)

# 컬럼: 하위 원인(주인공) + 시나리오 태그
CH_Y = 1.44
for i, sc in enumerate(SCEN):
    x = col_x[i]
    txt(slide, x, CH_Y, col_w, 0.22, [[(sc['cause'], {'bold': True, 'size': 12.5})]], leading=1.0)
    txt(slide, x, CH_Y + 0.27, col_w, 0.16, [[
        (sc['tag'] + ' · ', {'color': G_MID, 'size': 10}),
        (sc['code'], {'color': GRAY, 'size': 10})]], leading=1.0)

# 컬럼 세로 구분선
SEP_TOP, SEP_BOT = 1.42, 6.28
for i in range(1, 5):
    vline(slide, col_x[i] - col_g / 2, SEP_TOP, SEP_BOT - SEP_TOP)

# 가상 헤드라인
HL_Y, HL_H = 2.02, 0.82
txt(slide, MX, HL_Y + 0.10, RAIL_W - 0.14, 0.5,
    [[('그날의', {'bold': True, 'color': G_MID, 'size': 10})],
     [('헤드라인', {'bold': True, 'color': G_MID, 'size': 10})],
     [('(가상)', {'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.15)
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, HL_Y, col_w, HL_H, fill=WHITE, line=G_LINE, line_w=0.75, rnd=False)
    box(slide, x, HL_Y, col_w, 0.035, fill=INK)   # 신문 컷 느낌의 상단 굵은 잉크 라인
    txt(slide, x + 0.10, HL_Y + 0.14, col_w - 0.20, 0.6,
        [[(ln, {'bold': True, 'size': 10.5})] for ln in sc['head'].split('\n')],
        leading=1.22)

# 제품 파급 그리드 (수요/공급 화살표)
GR_LY = 3.06
txt(slide, MX, GR_LY, RAIL_W - 0.14, 0.16, [[('제품 파급', {'bold': True, 'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.0)
txt(slide, MX + MW - 4.2, GR_LY, 4.2, 0.16,
    [[('▼▼ 급감 · ▼ 감소 · ─ 유지 · ▲ 증가 · ▲▲ 급증', {'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.0)

ROW_Y, row_h, row_g = 3.55, 0.335, 0.05
GRID_END = ROW_Y + 4 * row_h + 3 * row_g
sub_w = col_w / 2
# 움직이는 쪽 열 음영 + 수요/공급 서브헤더
for i, sc in enumerate(SCEN):
    x = col_x[i]
    mx_ = x if sc['side'] == 'd' else x + sub_w
    box(slide, mx_, ROW_Y - 0.06, sub_w, GRID_END - ROW_Y + 0.12, fill=G_SH, rnd=True, radius=0.06)
    txt(slide, x, GR_LY + 0.26, sub_w, 0.16,
        [[('수요', {'bold': sc['side'] == 'd', 'color': INK if sc['side'] == 'd' else G_MID, 'size': 10})]],
        align=PP_ALIGN.CENTER, leading=1.0)
    txt(slide, x + sub_w, GR_LY + 0.26, sub_w, 0.16,
        [[('공급', {'bold': sc['side'] == 's', 'color': INK if sc['side'] == 's' else G_MID, 'size': 10})]],
        align=PP_ALIGN.CENTER, leading=1.0)

for r, prod in enumerate(PRODUCTS):
    ry = ROW_Y + r * (row_h + row_g)
    txt(slide, MX, ry + 0.075, RAIL_W - 0.14, 0.16,
        [[(prod, {'color': GRAY, 'size': 10})]], align=PP_ALIGN.RIGHT, leading=1.0, wrap=False)
    if r > 0:
        hline(slide, col_x[0], ry - row_g / 2, MW - RAIL_W, G_LINE, 0.4)
    for i, sc in enumerate(SCEN):
        x = col_x[i]
        for j, key in enumerate((sc['dem'][r], sc['sup'][r])):
            sym, bold, color = AR[key]
            txt(slide, x + j * sub_w, ry + 0.055, sub_w, 0.2,
                [[(sym, {'bold': bold, 'color': color, 'size': 11})]],
                align=PP_ALIGN.CENTER, leading=1.0)

# 풀어야 할 문제 (전략의 문제 정의)
PB_Y = GRID_END + 0.30
txt(slide, MX, PB_Y + 0.06, RAIL_W - 0.14, 0.4,
    [[('풀어야 할', {'bold': True, 'color': G_MID, 'size': 10})],
     [('문제', {'bold': True, 'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.15)
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, PB_Y + 0.02, 0.035, 0.50, fill=BLUE)
    txt(slide, x + 0.13, PB_Y + 0.03, col_w - 0.13, 0.5,
        [[(ln, {'bold': True, 'size': 11.5})] for ln in sc['prob'].split('\n')], leading=1.14)

# 하단 종합 밴드
BY = 6.48
box(slide, MX, BY, MW, 0.34, fill=G_BG, rnd=True, radius=0.10)
txt(slide, MX + 0.16, BY + 0.075, MW - 0.32, 0.2, [[
    ('종합  ', {'bold': True, 'color': BLUE, 'size': 10.5}),
    ('수요발에서는 수요 열만, 공급발에서는 공급 열만 움직인다.  ', {'size': 10.5}),
    ('어느 열이 움직였는지 읽는 것이 대응의 첫 단추다.', {'bold': True, 'size': 10.5}),
]], leading=1.0)

# 각주
txt(slide, MX, BY + 0.44, MW - 1.6, 0.18, [[
    ('출처: wiki/downturn/samsung-impact.md §5 · 헤드라인은 가상 예시(실제 보도 아님) · 대응 전략은 별도 장 · 기준일 2026-08',
     {'color': GRAY, 'size': 9})]], leading=1.0)
txt(slide, MX + MW - 1.5, BY + 0.44, 1.5, 0.18, [[('[문서등급 표기]', {'color': GRAY, 'size': 9})]],
    align=PP_ALIGN.RIGHT, leading=1.0)

OUT = 'outputs/presentation/downturn-scenario-impact.pptx'
prs.save(OUT)
print('saved:', OUT)
