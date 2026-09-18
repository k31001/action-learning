# -*- coding: utf-8 -*-
"""deck_kit — QLC 덱(generate_qlc_ssd_strategy_pptx.py)의 디자인 토큰·도형 헬퍼를 다른 1장 덱에서 재사용하기 위한 사본.
원본 스크립트는 실행 시 덱을 생성하므로 import할 수 없어, 헬퍼 구간(토큰 ~ v_arrow, 슬라이드 생성 전)을 그대로 복사했다.
원본 헬퍼가 바뀌면 이 파일을 다시 추출한다: 원본의 `import os` ~ `# ==== S0` 마커 직전까지.
사용: import deck_kit as K ; K.TOTAL = 1 ; s = K.prs.slides.add_slide(K.BLANK) ; K.header(...) ; K.prs.save(path)
"""
import os

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

# ---- 디자인 토큰 ----
BLUE = RGBColor(0x14, 0x28, 0xA0)
BLUE_T1 = RGBColor(0x3C, 0x5A, 0xC8)
BLUE_T2 = RGBColor(0xAA, 0xB8, 0xE8)
INK = RGBColor(0x1A, 0x1A, 0x1A)
GRAY = RGBColor(0x55, 0x55, 0x55)
GRAY_2 = RGBColor(0x8A, 0x8A, 0x8A)
LINE = RGBColor(0xD9, 0xD9, 0xD9)
TINT = RGBColor(0xF4, 0xF6, 0xFC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
FONT = os.environ.get("FONT_LATIN", "Arial")
FONT_EA = os.environ.get("FONT_EA", FONT)

MX = 0.79
CW = 18.42
RIGHT = MX + CW
GRADE = "[문서등급 표기]"
TOTAL = 4

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
LOGOS = os.path.join(ASSETS, "logos")
CHART = os.path.join(ASSETS, "qlc_demand_share_revenue_slide.png")
CHART_ASPECT = 3960 / 1232
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "qlc-ssd-strategy.pptx")

prs = Presentation()
prs.slide_width = Emu(18288000)   # 20.00 in
prs.slide_height = Emu(10287000)  # 11.25 in
BLANK = prs.slide_layouts[6]


# ---------------------------------------------------------------- helpers
def _font(run, size, bold, color):
    f = run.font
    f.name = FONT
    f.size = Pt(size)
    f.bold = bold
    f.color.rgb = color
    rPr = run._r.get_or_add_rPr()
    ea = rPr.find(qn("a:ea"))
    if ea is None:
        ea = rPr.makeelement(qn("a:ea"), {})
        rPr.append(ea)
    ea.set("typeface", FONT_EA)


def tb(slide, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, wrap=True, spacing=1.12):
    """paras: [(text, size, bold, color)] 또는 [[(text,size,bold,color), ...]] — 항목당 문단 1개."""
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        runs = para if isinstance(para[0], (list, tuple)) else [para]
        for (t, size, bold, color) in runs:
            r = p.add_run()
            r.text = t
            _font(r, size, bold, color)
    return box


def rect(slide, x, y, w, h, fill=None, line=None, line_w=0.75, shape=MSO_SHAPE.RECTANGLE):
    sp = slide.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    sp.shadow.inherit = False
    if fill is None:
        sp.fill.background()
    else:
        sp.fill.solid()
        sp.fill.fore_color.rgb = fill
    if line is None:
        sp.line.fill.background()
    else:
        sp.line.color.rgb = line
        sp.line.width = Pt(line_w)
    return sp


def header(slide, kicker, title, lead):
    tb(slide, MX, 0.46, 6.0, 0.34, [("삼성전자 메모리사업부", 18, True, BLUE)])
    tb(slide, 13.21, 0.46, 6.0, 0.34, [(GRADE, 18, False, GRAY)], align=PP_ALIGN.RIGHT)
    tb(slide, MX, 0.93, CW, 0.34, [(kicker, 18, True, BLUE)])
    tb(slide, MX, 1.33, CW, 0.62, [(title, 30, True, INK)])
    tb(slide, MX, 2.04, CW, 0.44, [lead] if isinstance(lead, list) else [(lead, 20, False, GRAY)])
    rect(slide, MX, 2.62, CW, 0.014, fill=LINE)


def footer(slide, source, no):
    tb(slide, MX, 10.49, 15.6, 0.34, [(source, 16, False, GRAY)])
    tb(slide, 17.55, 10.49, 1.66, 0.34, [(f"{no:02d} / {TOTAL:02d}", 18, False, GRAY)], align=PP_ALIGN.RIGHT)


def band(slide, y, h, label, main, main_size=22):
    rect(slide, MX, y, CW, h, fill=BLUE)
    tb(slide, MX + 0.45, y, 1.6, h, [(label, 18, False, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(slide, MX + 2.0, y, CW - 2.4, h, [(m, main_size, True, WHITE) for m in main.split("\n")],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)  # "\n"으로 의미 단위 줄바꿈 지정 가능


def quote(slide, x, y, w, h, text, who, size=12.75):
    """인용 카드: 좌측 파란 바 + 「인용문」 + 출처. 전략의 신빙성용(사내·외부 전문가 발언)."""
    rect(slide, x, y, 0.06, h, fill=BLUE)
    tb(slide, x + 0.22, y, w - 0.22, h,
       [("「" + text + "」", size, True, INK), (who, size - 1.5, False, GRAY_2)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)


def notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


_LOGO_ASPECT = {}


def _logo_w(name, h):
    path = os.path.join(LOGOS, f"{name}.png")
    if name not in _LOGO_ASPECT:
        with Image.open(path) as im:
            _LOGO_ASPECT[name] = im.size[0] / im.size[1]
    return h * _LOGO_ASPECT[name]


def logo(slide, name, x, y, h):
    w = _logo_w(name, h)
    slide.shapes.add_picture(os.path.join(LOGOS, f"{name}.png"), Inches(x), Inches(y), height=Inches(h))
    return w


def _chip_w(text, size):
    return 0.20 + 0.105 * size / 13.5 * len(text) * 0.62 + 0.20


def chip(slide, text, x, y, h, size=13.5):
    """공식 로고를 못 구한 기업의 워드마크 칩. 폭 반환."""
    w = _chip_w(text, size)
    rect(slide, x, y, w, h, fill=WHITE, line=GRAY_2, line_w=0.75)
    tb(slide, x, y, w, h, [(text, size, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    return w


def logo_row(slide, items, x, y, h, gap=0.22, max_w=None, chip_size=13.5):
    """items: [('logo','nvidia') | ('chip','VAST Data')] 가로 나열. max_w 초과 시 균일 축소. 끝 x 반환."""
    total = sum((_logo_w(n, h) if k == "logo" else _chip_w(n, chip_size)) for k, n in items) + gap * (len(items) - 1)
    k_scale = 1.0
    if max_w is not None and total > max_w:
        k_scale = max_w / total
    h2, gap2, cs2 = h * k_scale, gap * k_scale, max(11.0, chip_size * k_scale)
    cx = x
    for kind, name in items:
        if kind == "logo":
            cx += logo(slide, name, cx, y + (h - h2) / 2, h2) + gap2
        else:
            cx += chip(slide, name, cx, y - 0.02, h + 0.04, size=cs2) + gap2
    return cx


STATE_STYLE = {
    "own": dict(fill=BLUE, line=None, color=WHITE, bold=True),
    "touch": dict(fill=BLUE_T2, line=None, color=INK, bold=True),
    "none": dict(fill=WHITE, line=LINE, color=GRAY, bold=False),
}


def stack(slide, x, y, w, labels, states, layer_h=0.42, gap=0.07, size=13.5):
    """고객 시스템 계층 스택. states: 'own' | 'touch' | 'none'. 각 층의 y 반환."""
    ys = []
    for i, (lab, st) in enumerate(zip(labels, states)):
        ly = y + i * (layer_h + gap)
        stl = STATE_STYLE[st]
        rect(slide, x, ly, w, layer_h, fill=stl["fill"], line=stl["line"], line_w=0.75)
        tb(slide, x + 0.15, ly, w - 0.3, layer_h, [(lab, size, stl["bold"], stl["color"])],
           anchor=MSO_ANCHOR.MIDDLE)
        ys.append(ly)
    return ys


def person(slide, x, y, h, color=BLUE):
    """단색 사람 아이콘 (머리 원 + 몸통). x,y = 좌상단, h = 전체 높이."""
    d = h * 0.38
    rect(slide, x + (h * 0.7 - d) / 2, y, d, d, fill=color, shape=MSO_SHAPE.OVAL)
    body = rect(slide, x, y + d + h * 0.06, h * 0.7, h * 0.56, fill=color, shape=MSO_SHAPE.ROUND_2_SAME_RECTANGLE)
    try:
        body.adjustments[0] = 0.5
    except Exception:
        pass
    return h * 0.7


def v_arrow(slide, x, y, w, h, up=False, fill=BLUE):
    return rect(slide, x, y, w, h, fill=fill, shape=MSO_SHAPE.UP_ARROW if up else MSO_SHAPE.DOWN_ARROW)
