"""시안 6(Fab 도면 컬러) 기둥 그림 3개를 PowerPoint 기본 도형으로 그린다 (2026-10-15).

PNG(generate_fab_common_platform_figs.py c3_*)와 같은 그림을 사각형 · 원 · 선 · 화살표 · 텍스트 상자로 다시 그려,
슬라이드에서 바로 고칠 수 있게 한다. 그림마다 그룹 1개(그룹 해제하면 도형 하나씩 편집).
좌표는 PNG와 같은 그림 좌표(폭 5.30 x 높이 1.80in, 왼쪽 아래 원점, y 위로)로 쓰고 슬라이드 좌표로 바꾼다.
"""
from pptx.dml.color import RGBColor
from pptx.enum.dml import MSO_LINE_DASH_STYLE, MSO_PATTERN
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, MSO_AUTO_SIZE, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

from generate_fab_common_platform_figs import COLOR, HUES, INK, G, G2, MID, LINE, WHITE, H


def rgb(hexc):
    return RGBColor.from_string(hexc.lstrip("#"))


class Canvas:
    """그림 좌표(인치, y 위로) → 슬라이드 좌표. 도형은 그룹 하나에 담는다."""

    def __init__(self, d, slide, ox, oy, name):
        self.d, self.ox, self.oy = d, ox, oy
        self.g = slide.shapes.add_group_shape()
        self.g.name = name
        self.sh = self.g.shapes

    def X(self, x):
        return Inches(self.ox + x)

    def Y(self, y):
        return Inches(self.oy + H - y)

    # ---------------------------------------------------------- 도형
    def _style(self, sp, fc, ec, lw, dash):
        sp.shadow.inherit = False
        if fc is None:
            sp.fill.background()
        else:
            sp.fill.solid()
            sp.fill.fore_color.rgb = rgb(fc)
        if ec is None:
            sp.line.fill.background()
        else:
            sp.line.color.rgb = rgb(ec)
            sp.line.width = Pt(lw)
            if dash:
                sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        return sp

    def shape(self, kind, x, y, w, h, fc=None, ec=None, lw=0.8, dash=False, r=None):
        """(x, y) = 왼쪽 아래."""
        sp = self.sh.add_shape(kind, self.X(x), self.Y(y + h), Inches(w), Inches(h))
        if r is not None and kind == MSO_SHAPE.ROUNDED_RECTANGLE:
            sp.adjustments[0] = min(0.5, r / max(0.01, min(w, h)))
        return self._style(sp, fc, ec, lw, dash)

    def rect(self, x, y, w, h, fc=None, ec=None, lw=0.8, dash=False):
        return self.shape(MSO_SHAPE.RECTANGLE, x, y, w, h, fc, ec, lw, dash)

    def rrect(self, x, y, w, h, r, fc=None, ec=None, lw=0.8, dash=False):
        return self.shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, fc, ec, lw, dash, r=r)

    def hatch(self, x, y, w, h):
        sp = self.rect(x, y, w, h, fc=None, ec=MID, lw=0.8, dash=True)
        sp.fill.patterned()
        sp.fill.pattern = MSO_PATTERN.WIDE_UPWARD_DIAGONAL
        sp.fill.fore_color.rgb = rgb(MID)
        sp.fill.back_color.rgb = rgb(WHITE)
        return sp

    def circle(self, cx, cy, r, fc, ec=WHITE, lw=1.0):
        return self.shape(MSO_SHAPE.OVAL, cx - r, cy - r, 2 * r, 2 * r, fc, ec, lw)

    def ellipse(self, cx, cy, w, h, fc, ec=WHITE, lw=1.0):
        return self.shape(MSO_SHAPE.OVAL, cx - w / 2, cy - h / 2, w, h, fc, ec, lw)

    def line(self, x1, y1, x2, y2, color, lw=1.0, head=False, tail=False, dash=False):
        c = self.sh.add_connector(MSO_CONNECTOR.STRAIGHT, self.X(x1), self.Y(y1), self.X(x2), self.Y(y2))
        c.line.color.rgb = rgb(color)
        c.line.width = Pt(lw)
        if dash:
            c.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        ln = c.line._get_or_add_ln()
        if tail:
            ln.append(ln.makeelement(qn("a:headEnd"), {"type": "triangle", "w": "med", "len": "med"}))
        if head:
            ln.append(ln.makeelement(qn("a:tailEnd"), {"type": "triangle", "w": "med", "len": "med"}))
        return c

    def block_arrow(self, x, y, w, h, color):
        """(x, y) = 화살표 왼쪽 끝 · 세로 가운데."""
        return self.shape(MSO_SHAPE.RIGHT_ARROW, x, y - h / 2, w, h, fc=color)

    def swap(self, x, y, w=0.26, h=0.12):
        """설비 전환 표시: 위로 휜 화살표. (x, y) = 왼쪽 아래."""
        return self.shape(MSO_SHAPE.CURVED_DOWN_ARROW, x, y, w, h, fc=INK)

    def text(self, x, y, s, size=16, color=G, bold=False, ha="left", w=None, rot=0):
        """(x, y) = 기준점(세로 가운데). ha: left · center · right."""
        w = w or max(0.4, 0.13 * size / 16 * len(s) + 0.3)
        h = 0.30 * size / 16
        bx = x if ha == "left" else (x - w / 2 if ha == "center" else x - w)
        tb = self.sh.add_textbox(self.X(bx), self.Y(y + h / 2), Inches(w), Inches(h))
        tf = tb.text_frame
        tf.word_wrap = False
        tf.auto_size = MSO_AUTO_SIZE.NONE
        tf.vertical_anchor = MSO_ANCHOR.MIDDLE
        tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.alignment = {"left": PP_ALIGN.LEFT, "center": PP_ALIGN.CENTER, "right": PP_ALIGN.RIGHT}[ha]
        r = p.add_run()
        r.text = s
        self.d._font(r, size, bold, rgb(color))
        if rot:
            tb.rotation = rot
        return tb


def theme(effect):
    K = dict(COLOR)
    h, lt, bg = HUES[effect]
    K.update(hue=h, hue_lt=lt, hue_bg=bg, arrow=h, arrow_lt=lt)
    return K


def mix(hexc, f):
    c = [int(hexc[i:i + 2], 16) for i in (1, 3, 5)]
    t = 255 if f > 0 else 0
    return "#%02X%02X%02X" % tuple(int(round(v + (t - v) * abs(f))) for v in c)


# ------------------------------------------------------------------ ① 공간: 위에서 본 Fab
def native_space(d, s, ox, oy):
    K = theme("space")
    c = Canvas(d, s, ox, oy, "그림 1 공간 효율성 (도형)")
    fy, fh, fw = 0.06, 1.42, 2.46
    lx = 0.04
    c.rect(lx, fy, fw, fh, fc=WHITE, ec=G2, lw=1.0)
    c.line(lx + fw / 2, fy, lx + fw / 2, fy + fh, G, 2.4)
    for k in range(2):
        zx = lx + k * fw / 2
        c.rrect(zx + 0.10, fy + 0.60, fw / 2 - 0.20, 0.22, 0.10, fc=None, ec=G2, lw=1.6)
        for (fx, fy_) in ((zx + 0.35, fy + 0.60), (zx + 0.85, fy + 0.82)):
            c.rect(fx - 0.045, fy_ - 0.045, 0.09, 0.09, fc=G2, ec=WHITE, lw=0.6)
    specs = [
        (0.10, 0.12, 0.30, 0.38, "t"), (0.46, 0.12, 0.22, 0.38, "d"), (0.74, 0.12, 0.40, 0.30, "t"),
        (0.10, 0.92, 0.22, 0.44, "t"), (0.38, 0.92, 0.36, 0.44, "d"), (0.80, 0.92, 0.32, 0.36, "t"),
        (1.33, 0.12, 0.36, 0.34, "t"), (1.75, 0.12, 0.30, 0.38, "d"), (2.10, 0.12, 0.32, 0.38, "t"),
        (1.33, 0.92, 0.26, 0.40, "d"), (1.65, 0.92, 0.38, 0.44, "t"), (2.10, 0.92, 0.32, 0.30, "t")]
    for (x, y, w, h, k) in specs:
        if k == "t":
            c.rect(x, y, w, h, fc=K["zoneD"] if x < lx + fw / 2 else K["zoneN"], ec=K["zone_ec"], lw=0.8)
        else:
            c.hatch(x, y, w, h)
    c.text(lx, 1.66, "Fab 분리: OHT 2개", 16, G, bold=True)

    rx = 2.80
    c.rect(rx, fy, fw, fh, fc=WHITE, ec=K["hue"], lw=1.4)
    for row, (yy, col) in enumerate(((fy + 0.08, K["modA"]), (fy + 0.90, K["modB"]))):
        for i in range(5):
            c.rect(rx + 0.10 + i * 0.38, yy, 0.32, 0.40, fc=col, ec=WHITE, lw=0.8)
    c.rrect(rx + 0.10, fy + 0.60, 1.86, 0.22, 0.10, fc=None, ec=K["line_ok"], lw=2.2)
    for (fx, fy_) in ((rx + 0.40, fy + 0.60), (rx + 1.00, fy + 0.82), (rx + 1.55, fy + 0.60)):
        c.rect(fx - 0.045, fy_ - 0.045, 0.09, 0.09, fc=K["line_ok"], ec=WHITE, lw=0.6)
    c.rect(rx + 2.04, fy + 0.08, 0.36, fh - 0.16, fc=K["gain_bg"], ec=K["gain"], lw=1.0, dash=True)
    c.text(rx + 2.22, fy + fh / 2, "확보", 16, K["gain_txt"], bold=True, ha="center", w=0.70, rot=270)
    c.text(rx, 1.66, "Common: OHT 1개", 16, K["hue"], bold=True)
    return c.g


# ------------------------------------------------------------------ ② 대응력: Lot 흐름 → 공용 설비 Pool → Bonding
def wafer(c, cx, cy, r, color):
    c.circle(cx, cy, r, color)
    lc = mix(color, 0.35)
    for k in (-1, 0, 1):
        c.line(cx - r * 0.75, cy + k * r * 0.38, cx + r * 0.75, cy + k * r * 0.38, lc, 0.7)
        c.line(cx + k * r * 0.38, cy - r * 0.75, cx + k * r * 0.38, cy + r * 0.75, lc, 0.7)
    c.rect(cx - r * 0.18, cy - r - 0.01, r * 0.36, 0.035, fc=WHITE)


def native_agility(d, s, ox, oy):
    K = theme("agility")
    c = Canvas(d, s, ox, oy, "그림 2 시황 변화 대응력 (도형)")
    D, N = K["dram"], K["nand"]
    px, py, pw, ph = 1.38, 0.10, 2.20, 1.42
    c.rrect(px, py, pw, ph, 0.08, fc=K["hue_bg"], ec=K["hue"], lw=1.2, dash=True)
    # 흐름선(Pool 뒤에 깔리도록 먼저)
    for i, (sy, col) in enumerate(((1.22, D), (0.46, N))):
        for ty in (1.02, 0.40):
            c.line(0.52, sy, px - 0.02, ty + (0.08 if i == 0 else -0.06), col, 1.6, head=True)
    for (fx, fy_, col) in ((0.82, 1.17, D), (1.06, 1.07, D), (0.84, 0.50, N), (1.10, 0.47, N)):
        c.rect(fx - 0.05, fy_ - 0.05, 0.10, 0.10, fc=col, ec=WHITE, lw=0.6)
    wafer(c, 0.30, 1.22, 0.20, D)
    wafer(c, 0.30, 0.46, 0.20, N)
    c.text(0.58, 1.44, "DRAM", 16, D, bold=True)
    c.text(0.58, 0.24, "NAND", 16, K["nand_txt"], bold=True)
    c.text(px + pw / 2, 1.66, "공용 BEOL 설비 Pool", 16, K["hue"], bold=True, ha="center", w=2.4)
    for r_, row in enumerate(("DDSN", "DSNN")):
        for k, ch in enumerate(row):
            x, y = px + 0.16 + k * 0.50, py + 0.80 - r_ * 0.62
            c.rrect(x, y, 0.40, 0.44, 0.04, fc=D if ch == "D" else N, ec=WHITE, lw=0.8)
            if ch == "S":
                c.rect(x, y + 0.22, 0.40, 0.22, fc=D)
                c.swap(x + 0.06, y + 0.46)
    c.line(px + pw + 0.04, 0.82, 4.10, 0.82, K["hue"], 2.4, head=True)
    for k, col in enumerate(K["bond"]):
        c.ellipse(4.62, 0.62 + k * 0.16, 0.96, 0.30, col)
    c.text(4.62, 1.40, "Bonding", 16, K["hue"], bold=True, ha="center")
    return c.g


# ------------------------------------------------------------------ ③ 통일성: 공정 단계 x 설비 모델 매트릭스
def native_unif(d, s, ox, oy):
    K = theme("unif")
    c = Canvas(d, s, ox, oy, "그림 3 설비 통일성 (도형)")
    steps = ["Depo", "Etch", "CMP", "Bond"]
    dram = [["A1", "B4"], ["C2", "D3"], ["E1", "F5"], ["G2", "H1"]]
    nand = [["K3", "A2"], ["L1", "C6"], ["M4", "E2"], ["N2", "G7"]]
    plat = ["P1", "P2", "P3", "P4"]
    top, rh = 1.42, 0.335
    cw, ch, pitch = 0.40, 0.25, 0.45
    xd, xn, xa, xp, xl = 0.66, 1.62, 2.58, 3.04, 3.78
    c.text(xd + (pitch + cw) / 2, 1.66, "DRAM", 16, K["chipD"][2], bold=True, ha="center")
    c.text(xn + (pitch + cw) / 2, 1.66, "NAND", 16, K["chipN"][2], bold=True, ha="center")
    c.text(xp + 0.26, 1.66, "공용", 16, K["com"], bold=True, ha="center")

    def chip(x, y, code, fc, ec, tc, bold=False):
        c.rrect(x, y - ch / 2, cw, ch, 0.04, fc=fc, ec=ec, lw=0.9)
        c.text(x + cw / 2, y, code, 16, tc, bold=bold, ha="center", w=cw)

    labels = [("레시피 공유", K["com"]), ("부품 공용", K["com"]), ("물량 집중", K["com"]), ("협상력 ↑", K["gain_txt"])]
    for i, st in enumerate(steps):
        y = top - i * rh - rh / 2
        if i:
            c.line(0.02, y + rh / 2, 5.28, y + rh / 2, LINE, 0.7)
        c.text(0.02, y, st, 16, INK, bold=True)
        for k, code in enumerate(dram[i]):
            chip(xd + k * pitch, y, code, *K["chipD"])
        for k, code in enumerate(nand[i]):
            chip(xn + k * pitch, y, code, *K["chipN"])
        c.block_arrow(xa, y, 0.36, 0.20, K["arrow_lt"])
        for k in (2, 1):                                      # 물량이 쌓인 느낌
            c.rrect(xp + k * 0.06, y - ch / 2 + k * 0.035, cw, ch, 0.04, fc=[K["com"], K["com_lt"], K["com_lt2"]][k], ec=WHITE, lw=0.8)
        chip(xp, y, plat[i], K["com"], WHITE, WHITE, bold=True)
        c.text(xl, y, labels[i][0], 16, labels[i][1], bold=True)
    return c.g


NATIVE = {"space": native_space, "agility": native_agility, "unif": native_unif}
