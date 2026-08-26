#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SP-2 다운턴 -- 원인·파급·문제 정의 1장 슬라이드 (v4).

단일 소스: wiki/downturn/samsung-impact.md §5
출력:     outputs/presentation/downturn-scenario-impact.pptx
재생성:   .venv/bin/python outputs/presentation/scripts/generate_downturn_impact_slide.py

v4 (2026-08-25): 시나리오 코드 제거·"~는 경우" 표현, 수요는 누적 막대
  (현재=100 지수 개념도), 공급 두 케이스는 기업·기술·수치 팩트로 구체화,
  제품별 문제 정의 구체화, 블루 램프로 색 보강.
  모든 수치는 wiki 기인용 사실만 사용(막대 배분은 개념도임을 각주 명기).
"""
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml.ns import qn

# ── 토큰 ────────────────────────────────────────────────────────────────────
BLUE   = RGBColor(0x14, 0x28, 0xA0)
INK    = RGBColor(0x1A, 0x1A, 0x1A)
GRAY   = RGBColor(0x55, 0x55, 0x55)
G_MID  = RGBColor(0x8A, 0x8A, 0x8E)
G_LINE = RGBColor(0xD9, 0xD9, 0xD9)
G_BG   = RGBColor(0xF6, 0xF6, 0xF7)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
# 그룹 밴드 옅은 틴트
T_DEM  = RGBColor(0xE9, 0xED, 0xF8)   # 수요발
T_SUP  = RGBColor(0xF3, 0xF0, 0xE9)   # 공급발
T_SHF  = RGBColor(0xEF, 0xEC, 0xF4)   # 전환발
# 제품 컬러 램프 (블루 계열) + 옅은 버전(현재 막대)
P_FULL = [RGBColor(0x14, 0x28, 0xA0), RGBColor(0x4E, 0x68, 0xC8),
          RGBColor(0x93, 0xA2, 0xDC), RGBColor(0xC9, 0xD1, 0xEE)]
P_LITE = [RGBColor(0xC4, 0xCA, 0xE7), RGBColor(0xD5, 0xDB, 0xF0),
          RGBColor(0xE3, 0xE7, 0xF6), RGBColor(0xEF, 0xF1, 0xFA)]

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

def box(slide, x, y, w, h, *, fill=None, line=None, line_w=0.75, rnd=False,
        radius=0.055, dash=None):
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
        if dash:
            s.line.dash_style = dash
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

# ── 콘텐츠 (wiki §5 — 수치·기업·기술은 전부 위키 기인용 사실) ──────────────
PRODUCTS = ['HBM', '서버 DRAM', '범용·레거시', 'NAND·SSD']
BASE_MIX = [30, 25, 25, 20]   # 현재=100 개념 배분 (지수 개념도, 각주 명기)

SCEN = [
    dict(cause='투자 자금이 끊기는 경우', group=0,
         head='「AI 인프라 자금줄 경색,\n데이터센터 발주 일제히 보류」',
         mk=('전조', 'Meta FCF -91% · Amazon FCF 적자 전환, 4사 CapEx ~$750B의 조달 의존'),
         mix=[15, 13, 24, 16], newseg=0,
         note=None,
         prob='팔 곳 잃은 HBM4·서버 캐파:\nCIS 전환(공용 80%)인가,\ntake-or-pay 방어인가'),
    dict(cause='필요량이 줄어드는 경우', group=0,
         head='「AI는 호황인데 메모리는\n제자리… 효율화의 역설」',
         mk=('동인', 'KV 캐시 오프로드(H100 동시 사용자 10배) · CXL 풀링 · 모델 경량화'),
         mix=[24, 20, 20, 24], newseg=0,
         note=None,
         prob='GPU당 HBM 탑재량을 읽을\n지표가 없다: 추적 체계와\neSSD(1위 38.2%) 믹스 이동'),
    dict(cause='CAPEX가 몰리는 경우', group=1,
         head='「신규 팹 동시 가동에 공급\n과잉… 치킨게임 재점화 우려」',
         mk=('공급', 'Micron 아이다호 · SK하이닉스 용인 · 국내 신규 팹, 2028~29 동시 가동(착공 확정)'),
         mix=BASE_MIX, newseg=0,
         note='수요 유지 · 공급이 초과',
         prob='범용·NAND 감산 결단의\n30일 규율: 2023년 6개월\n지연의 재발 차단'),
    dict(cause='후발이 파고드는 경우', group=1,
         head='「중국산 메모리 범용 시장\n잠식… 가격 하단이 사라졌다」',
         mk=('공급', 'CXMT 캐파 점유 11%→15%E(2028) · HBM3 월 6만장, YMTC Xtacking 본딩'),
         mix=BASE_MIX, newseg=0,
         note='수요 유지 · 하단 가격 붕괴',
         prob='DDR4·LPDDR4 하단 철수\n시점과 전환처(CIS·차량),\nHBM 인증 장벽 사수'),
    dict(cause='제품 정의가 바뀌는 경우', group=2,
         head='「HBM 시대 저무나…\n주문은 차세대 메모리로」',
         mk=('동인', '3D DRAM(4F² VCT) · zHBM · CXL 채택 개시로 표준 HBM 주문 이동'),
         mix=[12, 20, 25, 26], newseg=15,
         note='수요가 차세대로 이동',
         prob='표준 HBM에서 zHBM·4F²\n3D DRAM으로의 전환기,\n별동대·R&D 하한 사수'),
]

GROUPS = [
    (0, 2, T_DEM, [('수요발', True), (' · 수요가 꺼진다', False)]),
    (2, 2, T_SUP, [('공급발', True), (' · 공급이 넘친다', False)]),
    (4, 1, T_SHF, [('전환발', True), (' · 판이 바뀐다', False)]),
]

# ── 슬라이드 ────────────────────────────────────────────────────────────────
prs = Presentation()
prs.slide_width, prs.slide_height = Inches(13.333), Inches(7.5)
slide = prs.slides.add_slide(prs.slide_layouts[6])

MX, MW = 0.47, 12.393

txt(slide, MX, 0.26, MW, 0.38, [[
    ('다운턴의 다섯 갈래:  ', {'bold': True, 'color': BLUE, 'size': 20}),
    ('꺼지는 수요가 둘, 넘치는 공급이 둘, 바뀌는 판이 하나다', {'bold': True, 'size': 20}),
]])
hline(slide, MX, 0.72, MW, BLUE, 1.4)

RAIL_W = 1.10
col_g = 0.12
col_w = (MW - RAIL_W - 4 * col_g) / 5
col_x = [MX + RAIL_W + i * (col_w + col_g) for i in range(5)]

# 원인 대분류 밴드 (옅은 틴트)
GB_Y, GB_H = 0.86, 0.32
for st, n, tint, label in GROUPS:
    gx = col_x[st]
    gw = n * col_w + (n - 1) * col_g
    box(slide, gx, GB_Y, gw, GB_H, fill=tint, rnd=True, radius=0.13)
    txt(slide, gx, GB_Y + 0.065, gw, 0.2, [[(t, {'bold': b, 'size': 11}) for t, b in label]],
        align=PP_ALIGN.CENTER, leading=1.0)

# 하위 원인 헤더 ("~는 경우")
CH_Y = 1.30
for i, sc in enumerate(SCEN):
    txt(slide, col_x[i], CH_Y, col_w, 0.22, [[(sc['cause'], {'bold': True, 'size': 12.5})]], leading=1.0)

# 컬럼 세로 구분선
for i in range(1, 5):
    vline(slide, col_x[i] - col_g / 2, 1.28, 4.94)

# 가상 헤드라인
HL_Y, HL_H = 1.62, 0.64
txt(slide, MX, HL_Y + 0.04, RAIL_W - 0.14, 0.5,
    [[('그날의', {'bold': True, 'color': G_MID, 'size': 10})],
     [('헤드라인', {'bold': True, 'color': G_MID, 'size': 10})],
     [('(가상)', {'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, HL_Y, col_w, HL_H, fill=WHITE, line=G_LINE, line_w=0.75)
    box(slide, x, HL_Y, col_w, 0.032, fill=INK)
    txt(slide, x + 0.10, HL_Y + 0.09, col_w - 0.20, 0.5,
        [[(ln, {'bold': True, 'size': 10.5})] for ln in sc['head'].split('\n')], leading=1.18)

# 무엇이 움직이나 (기업·기술·수치 팩트)
MK_Y = 2.40
txt(slide, MX, MK_Y + 0.02, RAIL_W - 0.14, 0.4,
    [[('무엇이', {'bold': True, 'color': G_MID, 'size': 10})],
     [('움직이나', {'bold': True, 'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
for i, sc in enumerate(SCEN):
    pre, body = sc['mk']
    txt(slide, col_x[i], MK_Y, col_w, 0.62, [[
        (pre + '  ', {'bold': True, 'color': BLUE, 'size': 10}),
        (body, {'size': 10, 'color': INK})]], leading=1.16)

# ── 제품 수요 누적 막대 (현재=100 지수 개념도) ──────────────────────────────
BAR_LY = 3.14
txt(slide, MX, BAR_LY, RAIL_W - 0.14, 0.34,
    [[('제품 수요', {'bold': True, 'color': G_MID, 'size': 10})],
     [('(지수 개념도)', {'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
# 범례 (제품 4 + 이동분)
lg_items = list(zip(PRODUCTS, P_FULL)) + [('차세대 이동분', None)]
for li, (name, c) in enumerate(lg_items):
    ly = BAR_LY + 0.50 + li * 0.225
    if c is not None:
        box(slide, MX + 0.08, ly + 0.015, 0.115, 0.115, fill=c)
    else:
        box(slide, MX + 0.08, ly + 0.015, 0.115, 0.115, fill=WHITE, line=G_MID, line_w=0.8, dash=2)
    txt(slide, MX + 0.26, ly, RAIL_W - 0.28, 0.16, [[(name, {'color': GRAY, 'size': 10})]],
        leading=1.0, wrap=False)

BASE_Y = 4.72          # 막대 바닥
SCALE = 0.0128         # 지수 1 → in
bw, bgap = 0.40, 0.14
for i, sc in enumerate(SCEN):
    x = col_x[i]
    pair_x = x + (col_w - (2 * bw + bgap)) / 2
    # 현재(옅은 톤) 막대
    yy = BASE_Y
    for v, c in zip(BASE_MIX, P_LITE):
        h = v * SCALE
        box(slide, pair_x, yy - h, bw, h, fill=c)
        yy -= h
    txt(slide, pair_x - 0.1, BASE_Y - 100 * SCALE - 0.22, bw + 0.2, 0.16,
        [[('100', {'bold': True, 'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)
    # 시나리오 막대 (본색)
    sx = pair_x + bw + bgap
    yy = BASE_Y
    tot = sum(sc['mix'])
    for v, c in zip(sc['mix'], P_FULL):
        h = v * SCALE
        if h > 0:
            box(slide, sx, yy - h, bw, h, fill=c)
        yy -= h
    if sc['newseg']:
        h = sc['newseg'] * SCALE
        box(slide, sx, yy - h, bw, h, fill=WHITE, line=G_MID, line_w=0.9, dash=2)
        yy -= h
        tot += sc['newseg']
    txt(slide, sx - 0.1, yy - 0.22, bw + 0.2, 0.16,
        [[(str(tot), {'bold': True, 'color': BLUE, 'size': 10.5})]], align=PP_ALIGN.CENTER, leading=1.0)
    # 바닥선 + 축 캡션
    hline(slide, x + 0.10, BASE_Y, col_w - 0.20, G_LINE, 0.9)
    txt(slide, pair_x - 0.08, BASE_Y + 0.05, bw + 0.16, 0.14,
        [[('현재', {'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)
    txt(slide, sx - 0.08, BASE_Y + 0.05, bw + 0.16, 0.14,
        [[('시나리오', {'color': G_MID, 'size': 10})]], align=PP_ALIGN.CENTER, leading=1.0)
    if sc['note']:
        txt(slide, x, BASE_Y + 0.235, col_w, 0.15, [[(sc['note'], {'bold': True, 'color': GRAY, 'size': 10})]],
            align=PP_ALIGN.CENTER, leading=1.0)

# 풀어야 할 문제
PB_Y = 5.34
txt(slide, MX, PB_Y + 0.05, RAIL_W - 0.14, 0.4,
    [[('풀어야 할', {'bold': True, 'color': G_MID, 'size': 10})],
     [('문제', {'bold': True, 'color': G_MID, 'size': 10})]],
    align=PP_ALIGN.RIGHT, leading=1.12)
for i, sc in enumerate(SCEN):
    x = col_x[i]
    box(slide, x, PB_Y + 0.02, 0.035, 0.52, fill=BLUE)
    txt(slide, x + 0.12, PB_Y + 0.03, col_w - 0.12, 0.55,
        [[(ln, {'bold': True, 'size': 10.5})] for ln in sc['prob'].split('\n')], leading=1.18)

# 종합 밴드
BY = 6.18
box(slide, MX, BY, MW, 0.34, fill=G_BG, rnd=True, radius=0.10)
txt(slide, MX + 0.16, BY + 0.075, MW - 0.32, 0.2, [[
    ('종합  ', {'bold': True, 'color': BLUE, 'size': 10.5}),
    ('수요발은 막대가 줄고, 공급발은 수요가 그대로인 채 공급이 넘친다.  ', {'size': 10.5}),
    ('원인이 다르면 풀어야 할 문제도 다르다.', {'bold': True, 'size': 10.5}),
]], leading=1.0)

# 각주
txt(slide, MX, BY + 0.46, MW - 1.65, 0.34, [[
    ('막대는 wiki/downturn/samsung-impact.md §5.3 방향 표의 지수화 개념도(현재 총수요=100, 배분·폭은 방향 표현용이며 실측 아님) · 헤드라인은 가상 예시 · '
     '인용 수치: Meta FCF -91%·4사 CapEx ~$750B(hyperscaler-q2-2026-actuals) · CXMT 11%→15%E·HBM3 월 6만장(apple-cxmt·TrendForce) · eSSD 38.2%(1Q26) · '
     'CIS 공용률 80%(fab-toolset) · 대응 전략은 별도 장 · 기준일 2026-08', {'color': GRAY, 'size': 9})]], leading=1.25)
txt(slide, MX + MW - 1.5, BY + 0.46, 1.5, 0.18, [[('[문서등급 표기]', {'color': GRAY, 'size': 9})]],
    align=PP_ALIGN.RIGHT, leading=1.0)

OUT = 'outputs/presentation/downturn-scenario-impact.pptx'
prs.save(OUT)
print('saved:', OUT)
