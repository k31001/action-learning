# -*- coding: utf-8 -*-
"""QLC eSSD 전략 덱 — 시각화 강화판 v2.0 (2026-09-22, 7장: 요약 스토리 맵 + 1~6장) — 네이티브 도형 판.

v1.0(장 전체가 PNG 1장)은 PowerPoint 에서 수정이 불가능했다(사용자 지적 2026-09-22). v2.0 은 박스·칩·화살표·표·막대·타임라인을
모두 python-pptx 네이티브 도형·텍스트로 그려 편집 가능하게 하고, "그림이어야만 하는 부분"만 PNG 로 넣는다:
  · 2장 다이 픽토그램 2장(128 · 1,024 격자) · 2장 RBER 스파크라인 · 6장 유효 DWPD 곡선 차트 (generate_qlc_visual_figures.py --parts)
좌표계: 그림 영역(18.42 × 6.25 in, 원점 MX=0.79 / y=2.80)을 1842 × 625 단위로 두고 1 단위 = 0.01 in, 글자 크기 1 단위 = 0.72 pt.
5장 실행은 v4.0 의 두 트랙 화살표 그림(① FDE 상주 → / ② 워크로드·규격 접근권 ←)으로 되돌리고 v5 내용(고객 선별·통과 조건·판돈)을 담는다.
디자인 토큰·문안은 v1.0 과 같다(Samsung Blue 단일 액센트, 적색은 고장·리스크만, 제목 = 덱 v5.2 제목 문단).
출력: outputs/presentation/qlc-ssd-strategy-visual.pptx (렌더 검증: FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx)
"""
import os
import sys

from lxml import etree
from pptx.dml.color import RGBColor
from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Inches, Pt

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import deck_kit as K  # noqa: E402
from generate_qlc_visual_figures import fmt, tw, wrap  # noqa: E402

K.TOTAL = 7
K.STORY = [("1", "문제", ""), ("2", "신뢰성", ""), ("3", "해법 사다리", ""), ("4", "역량", ""), ("5", "실행", ""), ("6", "보증 · SLA", "")]
VIS = os.path.join(K.ASSETS, "visual")
OUT = os.environ.get("OUT_PATH") or os.path.join(HERE, "..", "qlc-ssd-strategy-visual.pptx")
prs, BLANK = K.prs, K.BLANK
HERO_Y = 2.80

# ---- 토큰(hex) → RGBColor ----
BLUE, BLUE_T1, BLUE_T2, BLUE_T3 = "#1428A0", "#3C5AC8", "#AAB8E8", "#DCE2F5"
INK, GRAY, GRAY_2, LINE, TINT, WHITE = "#1A1A1A", "#555555", "#8A8A8A", "#D9D9D9", "#F4F6FC", "#FFFFFF"
RED, RED_BG, GRAY_BG = "#D93025", "#FBE9E7", "#F7F7F7"


def col(v):
    if v is None or v == "none":
        return None
    if isinstance(v, RGBColor):
        return v
    return RGBColor.from_string(v.lstrip("#"))


def pt(px):
    return px * 0.72


class Canvas:
    """그림 영역 좌표계(1842 × 625 단위)로 네이티브 도형을 그리는 어댑터. 시그니처는 SVG 헬퍼와 같게 둔다."""

    def __init__(self, slide, x0=K.MX, y0=HERO_Y):
        self.s, self.x0, self.y0, self.chars = slide, x0, y0, 0

    def X(self, x): return self.x0 + x / 100.0
    def Y(self, y): return self.y0 + y / 100.0

    def rect(self, x, y, w, h, fill="none", stroke=None, sw=1.0, r=0, dash=None, op=None, shape=None):
        shp = K.rect(self.s, self.X(x), self.Y(y), w / 100.0, h / 100.0, fill=col(fill), line=col(stroke), line_w=sw,
                     shape=shape or (MSO_SHAPE.ROUNDED_RECTANGLE if r else MSO_SHAPE.RECTANGLE))
        if r and shape is None:
            shp.adjustments[0] = min(0.5, r / max(1.0, min(w, h)))
        if dash:
            shp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        return shp

    def circle(self, cx, cy, r, fill="none", stroke=None, sw=1.0, dash=None):
        return self.rect(cx - r, cy - r, 2 * r, 2 * r, fill=fill, stroke=stroke, sw=sw, dash=dash, shape=MSO_SHAPE.OVAL)

    def _seg(self, x1, y1, x2, y2, stroke, sw, dash, arrow):
        conn = self.s.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, Inches(self.X(x1)), Inches(self.Y(y1)), Inches(self.X(x2)), Inches(self.Y(y2)))
        conn.line.color.rgb = col(stroke)
        conn.line.width = Pt(sw)
        if dash:
            conn.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        if arrow:
            ln = conn.line._get_or_add_ln()
            tail = etree.SubElement(ln, qn("a:tailEnd"))
            tail.set("type", "triangle"); tail.set("w", "med"); tail.set("len", "med")
        return conn

    def line(self, x1, y1, x2, y2, stroke=GRAY_2, sw=1.5, dash=None, arrow=None, cap=None):
        return self._seg(x1, y1, x2, y2, stroke, sw, dash, arrow)

    def path(self, d, stroke=GRAY_2, sw=1.5, fill="none", dash=None, arrow=None):
        pts = []
        for tok in d.replace("M", " ").replace("L", " ").split():
            x, y = tok.split(","); pts.append((float(x), float(y)))
        for i in range(len(pts) - 1):
            self._seg(*pts[i], *pts[i + 1], stroke, sw, dash, arrow if i == len(pts) - 2 else None)

    def poly(self, pts, fill=BLUE, stroke=None, sw=1.0, op=None):
        xs, ys = [p[0] for p in pts], [p[1] for p in pts]
        x, y, w, h = min(xs), min(ys), max(xs) - min(xs), max(ys) - min(ys)
        shape = MSO_SHAPE.DIAMOND if len(pts) == 4 else MSO_SHAPE.ISOSCELES_TRIANGLE
        return self.rect(x, y, w, h, fill=fill, stroke=stroke, sw=sw, shape=shape)

    def text(self, x, y, s, size=18, bold=False, fill=INK, anchor="start", vmid=False, lh=1.25, w=None, wrap_=False):
        size = max(size, 13)
        lines = list(s) if isinstance(s, (list, tuple)) else [s]
        width = w if w else max(tw(ln, size, bold) for ln in lines) * 1.12 + 10
        height = size * lh * len(lines) + 4
        xx = x - width / 2 if anchor == "middle" else x - width if anchor == "end" else x
        yy = y - size * lh / 2 - 2 if vmid else y - size
        box = K.tb(self.s, self.X(xx), self.Y(yy), width / 100.0, height / 100.0, [(ln, pt(size), bold, col(fill)) for ln in lines],
                   align={"middle": PP_ALIGN.CENTER, "end": PP_ALIGN.RIGHT}.get(anchor, PP_ALIGN.LEFT), anchor=MSO_ANCHOR.TOP, wrap=wrap_, spacing=lh)
        self.chars += sum(len(ln.replace(" ", "")) for ln in lines)
        return box

    def vtext(self, x, y, s, size=14, fill=GRAY):
        width = tw(s, size) * 1.12 + 10
        box = K.tb(self.s, self.X(x - width / 2), self.Y(y - size * 0.75), width / 100.0, size * 1.5 / 100.0, [(s, pt(size), False, col(fill))],
                   align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, wrap=False)
        box.rotation = -90.0
        self.chars += len(s.replace(" ", ""))
        return box

    def rich(self, x, y, runs, anchor="start", vmid=False):
        width = sum(tw(t, sz, b) for t, sz, b, _ in runs) * 1.12 + 10
        size = max(sz for _, sz, _, _ in runs)
        xx = x - width / 2 if anchor == "middle" else x - width if anchor == "end" else x
        yy = y - size * 0.7 if vmid else y - size
        box = K.tb(self.s, self.X(xx), self.Y(yy), width / 100.0, size * 1.4 / 100.0, [[(t, pt(sz), b, col(c)) for t, sz, b, c in runs]],
                   align={"middle": PP_ALIGN.CENTER, "end": PP_ALIGN.RIGHT}.get(anchor, PP_ALIGN.LEFT), anchor=MSO_ANCHOR.MIDDLE, wrap=False)
        self.chars += sum(len(t.replace(" ", "")) for t, _, _, _ in runs)
        return box

    def chip(self, x, y, s, size=16, bold=True, fill=WHITE, stroke=LINE, color=INK, padx=12, h=None, r=3, dash=None):
        size = max(size, 13)
        w = tw(s, size, bold) * 1.08 + 2 * padx
        h = h or size * 1.7
        self.rect(x, y, w, h, fill=fill, stroke=stroke, sw=1.0, r=r, dash=dash)
        self.text(x + w / 2, y + h / 2, s, size=size, bold=bold, fill=color, anchor="middle", vmid=True)
        return w

    def num(self, cx, cy, n, r=15, fill=BLUE, color=WHITE, size=17, stroke=None):
        self.circle(cx, cy, r, fill=fill, stroke=stroke, sw=1.2)
        self.text(cx, cy, str(n), size=size, bold=True, fill=color, anchor="middle", vmid=True)

    def panel(self, x, y, w, h, title=None, sub=None, hot=False, fill=WHITE):
        self.rect(x, y, w, h, fill=fill, stroke=BLUE if hot else LINE, sw=1.5 if hot else 1.0, r=4)
        if hot:
            self.rect(x, y, w, 6, fill=BLUE)
        if title:
            self.text(x + 18, y + 30, title, size=20, bold=True, fill=BLUE if hot else INK, vmid=True)
        if sub:
            self.text(x + 18 + tw(title or "", 20, True) * 1.08 + 14, y + 31, sub, size=14, fill=GRAY_2, vmid=True)

    def image(self, name, x, y, w):
        return self.s.shapes.add_picture(os.path.join(VIS, name + ".png"), Inches(self.X(x)), Inches(self.Y(y)), width=Inches(w / 100.0))


def band(slide, label, main, next_step=None, size=17):
    """결론 밴드: 본문 1줄 + 우측 '다음 장' 포인터(장 이름만)."""
    y, h = 9.26, 0.90
    K.rect(slide, K.MX, y, K.CW, h, fill=K.BLUE)
    K.tb(slide, K.MX + 0.45, y, 1.6, h, [(label, 18, False, K.WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    ptr_w = 3.0 if next_step else 0.0
    K.tb(slide, K.MX + 2.0, y, K.CW - 2.4 - ptr_w, h, [(m, size, True, K.WHITE) for m in main.split("\n")], anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)
    if next_step:
        no, name, _ = K.STORY[next_step - 1]
        px, ph = K.RIGHT - 0.30 - (ptr_w - 0.30), h - 0.24
        K.rect(slide, px, y + 0.12, ptr_w - 0.30, ph, fill=None, line=K.WHITE, line_w=1.0)
        K.rect(slide, px, y + 0.12, 0.06, ph, fill=K.WHITE)
        K.tb(slide, px + 0.22, y + 0.12, ptr_w - 0.30 - 0.32, ph,
             [("다음 장 →", 10.5, False, K.BLUE_T2), (f"{no}장 {name}", 13.5, True, K.WHITE)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)


SRC = "출처: 보고서 v2.0 부록 A · 덱 v5.2와 동일 수치"
STATS = {}


# ====================================================================== 0. 요약 · 스토리 맵
def draw_s0(c):
    W = 1842
    NW, NH = 300, 150
    x1, y1, w1 = 40, 235, 290
    fx = 380
    x2, y2 = 440, 48
    x3, y3 = 440, 410
    x4, x5, x6 = 800, 1160, 1520
    w6 = W - x6 - 40

    def node(x, y, no, name, big, small, badge=None, badge_hot=True, w=NW, h=NH):
        c.rect(x, y, w, h, fill=TINT, stroke=BLUE, sw=1.5, r=6)
        c.rect(x, y, 8, h, fill=BLUE)
        c.num(x + 34, y + 30, no, r=15)
        c.text(x + 58, y + 30, name, size=20, bold=True, fill=INK, vmid=True)
        c.text(x + 24, y + 76, big, size=32, bold=True, fill=BLUE, vmid=True)
        c.text(x + 24, y + 112, wrap(small, 14, w - 44), size=14, fill=GRAY, vmid=True, lh=1.25, w=w - 40)
        if badge:
            bw = tw(badge, 13, True) * 1.08 + 20
            c.chip(x + w - bw - 14, y + 12, badge, size=13, bold=True, fill=BLUE if badge_hot else WHITE, stroke=BLUE, color=WHITE if badge_hot else BLUE, padx=10)

    node(x1, y1, 1, "문제", "2~10배", "요구 1~3 DWPD 대 동급 정격 격차 · 고용량화 → 두 축", w=w1)
    node(x2, y2, 2, "신뢰성", "다이 8배 ↑", "FFR 고정 · 패리티·여분 다이·감량 운영으로 충족", badge="충족")
    node(x3, y3, 3, "내구성", "WAF ≈3 → ≈1", "잔여 변수 WAF는 호스트가 결정 → 고객 협업", badge="미충족", badge_hot=False)
    node(x4, y3, 4, "역량", "3단계", "디바이스 → 워크로드 → 고객 시스템 · 삼성은 현재 1단계")
    node(x5, y3, 5, "실행", "FDE 1~2사", "워크로드 개방 고객 집중 · 나머지는 업스트림·규격")
    node(x6, y3, 6, "보증 · SLA", "조건부 유효 DWPD", "TBW 관행 유지 · WAF 밴드 조건부 등급", w=w6)
    ym = y1 + NH / 2
    c.line(x1 + w1, ym, fx, ym, stroke=BLUE, sw=3)
    c.circle(fx, ym, 7, fill=BLUE)
    c.path(f"M{fx},{ym} L{fx},{y2 + NH / 2} L{x2 - 4},{y2 + NH / 2}", stroke=BLUE, sw=3, arrow="blue")
    c.path(f"M{fx},{ym} L{fx},{y3 + NH / 2} L{x3 - 4},{y3 + NH / 2}", stroke=BLUE, sw=3, arrow="blue")
    c.text(fx + 14, ym - 66, ["첫째 축", "SSD 안에서 해결"], size=14, fill=GRAY_2, lh=1.2, vmid=True)
    c.text(fx + 14, ym + 40, ["둘째 축", "SSD 밖에서 해결"], size=14, fill=GRAY_2, lh=1.2, vmid=True)
    c.text(x2, y2 - 22, "신뢰성 축 · SSD 계층", size=15, bold=True, fill=BLUE, vmid=True)
    c.text(x4, y3 - 22, "내구성 축 · 호스트 공동 설계 경로", size=15, bold=True, fill=BLUE, vmid=True)
    for xa, xb in [(x3 + NW, x4), (x4 + NW, x5), (x5 + NW, x6)]:
        c.line(xa, y3 + NH / 2, xb - 4, y3 + NH / 2, stroke=BLUE, sw=3, arrow="blue")
    yl = 300
    c.path(f"M{x2 + NW - 40},{y2 + NH} L{x2 + NW - 40},{yl} L{x6 + w6 - 60},{yl} L{x6 + w6 - 60},{y3 - 6}", stroke=BLUE_T2, sw=2, dash="6 6", arrow="t2")
    c.text(x2 + NW - 20, yl - 12, "감량 운영 정책 → 6장 보증 조항", size=14, fill=GRAY, vmid=True)
    px, py, pw, ph = x4, y2, W - 40 - x4, NH
    c.rect(px, py, pw, ph, fill=WHITE, stroke=LINE, r=6)
    c.text(px + 24, py + 30, "판돈과 비용", size=16, bold=True, fill=INK, vmid=True)
    c.text(px + 24 + tw("판돈과 비용", 16, True) * 1.08 + 14, py + 31, "5장", size=14, fill=GRAY_2, vmid=True)
    half = pw / 2
    c.text(px + 24, py + 62, "판돈 · 락인으로 얻는 캐시 계층 QLC 점유", size=14, fill=GRAY_2, vmid=True)
    c.text(px + 24, py + 100, "0 → 50%", size=32, bold=True, fill=BLUE, vmid=True)
    c.text(px + 24, py + 132, "2030년 350EB 중 175EB(조건부 상방)", size=14, fill=GRAY, vmid=True)
    c.line(px + half, py + 20, px + half, py + ph - 20, stroke=LINE, sw=1)
    c.text(px + half + 24, py + 62, "비용 · 개발실 개발 자원 투입", size=14, fill=GRAY_2, vmid=True)
    c.text(px + half + 24, py + 100, "별도 투자 없음", size=32, bold=True, fill=BLUE, vmid=True)
    c.text(px + half + 24, py + 132, "개발 자원 재배치 · 채용은 정원 내", size=14, fill=GRAY, vmid=True)


# ====================================================================== 1. 문제
def draw_s1(c):
    TX0, TX1, TY = 60, 1020, 56
    def tx(year): return TX0 + (year - 2018) / 12.0 * (TX1 - TX0)
    c.rect(tx(2019), TY - 12, tx(2020) - tx(2019), 24, fill=BLUE_T3)
    c.rect(tx(2022.5), TY - 12, tx(2023.75) - tx(2022.5), 24, fill=BLUE_T3)
    c.line(TX0, TY, TX1, TY, stroke=GRAY_2, sw=1.5)
    for yr in range(2018, 2031, 2):
        c.line(tx(yr), TY - 4, tx(yr), TY + 4, stroke=GRAY_2, sw=1)
        c.text(tx(yr), TY + 20, str(yr), size=13, fill=GRAY_2, anchor="middle", vmid=True)
    c.text(tx(2019.5), TY - 24, "DT19 -37.6%", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    c.text(tx(2023.1), TY - 24, "DT23 -45%", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    marks = [(2022.95, "'22-12 표준 비준", False, 1), (2023.55, "'23-07 61TB 12개월 선행", False, 0), (2024.3, "'24 30EB", False, 1),
             (2026.4, "'26 KV 캐시 규격 미정의", True, 0), (2027.6, "'27H2 차기 전환점", True, 1)]
    for yr, lab, hot, row in marks:
        c.circle(tx(yr), TY, 6, fill=WHITE if hot else BLUE, stroke=BLUE, sw=2)
        c.text(tx(yr), TY + 40 + row * 18, lab, size=13, fill=BLUE if hot else GRAY, anchor="middle", vmid=True, bold=hot)

    PX, PY, PW, PH = 40, 140, 470, 445
    c.panel(PX, PY, PW, PH, "교훈 · 두 다운턴", "2018~2023")
    rows = [("2년", "규격 · 코드가 발주에 선행", 3), ("12개월", "규격 정의 참여자가 선점", 5), ("2027H2", "직전 결정이 다음 초기 조건", 4)]
    ry = PY + 62
    for i, (big, l1, nxt) in enumerate(rows):
        c.text(PX + 24, ry + 28, big, size=30, bold=True, fill=BLUE, vmid=True)
        c.text(PX + 190, ry + 30, l1, size=16, bold=True, fill=INK, vmid=True)
        c.num(PX + PW - 34, ry + 30, nxt, r=13, fill=BLUE_T2, color=INK, size=14)
        if i < 2: c.line(PX + 18, ry + 78, PX + PW - 18, ry + 78, stroke=LINE, sw=1)
        ry += 100
    c.text(PX + PW - 18, PY + 31, "번호 = 받는 장", size=13, fill=GRAY_2, anchor="end", vmid=True)

    QX, QY, QW, QH = 550, 140, 560, 445
    c.panel(QX, QY, QW, QH, "지금 · 요구의 이동", "2024~2026")
    shifts = [("구매 기준", "TB당 TCO", "GPU당 컨텍스트 · 토큰당 비용"), ("드라이브 용량", "61TB", "245TB · 다이 8배 ↑"), ("요구 DWPD", "0.3~0.6", "1~3 · KV 캐시 계층 TLC 정격")]
    sy = QY + 58
    for lab, a, b in shifts:
        c.text(QX + 20, sy + 10, lab, size=14, fill=GRAY_2, vmid=True)
        bw_a, bh = 170, 56
        c.rect(QX + 20, sy + 24, bw_a, bh, fill=WHITE, stroke=LINE, r=3)
        c.text(QX + 20 + bw_a / 2, sy + 24 + bh / 2, a, size=20, bold=True, fill=GRAY, anchor="middle", vmid=True)
        c.line(QX + 20 + bw_a + 10, sy + 24 + bh / 2, QX + 20 + bw_a + 46, sy + 24 + bh / 2, stroke=BLUE, sw=3, arrow="blue")
        bx = QX + 20 + bw_a + 56
        c.rect(bx, sy + 24, QX + QW - 20 - bx, bh, fill=TINT, stroke=BLUE, sw=1.2, r=3)
        c.text(bx + 14, sy + 24 + bh / 2, b, size=18, bold=True, fill=BLUE, vmid=True)
        sy += 114

    GX, GY, GW, GH = 1150, 140, 652, 445
    c.panel(GX, GY, GW, GH, "문제 · 격차와 두 축", "2027~2030", hot=True)
    cx0, cy0, cw, chh = GX + 30, GY + 66, 360, 160
    vmax = 3.2
    def vx(v): return cx0 + 130 + (cw - 130) * v / vmax
    c.rect(vx(1), cy0 - 6, vx(3) - vx(1), chh + 6, fill=BLUE_T3)
    c.text((vx(1) + vx(3)) / 2, cy0 - 20, "요구 1~3 DWPD", size=13, bold=True, fill=BLUE, anchor="middle", vmid=True)
    bars = [("LC9 245TB", 0.3, BLUE_T2), ("P5336 61TB", 0.58, BLUE_T1), ("6550 ION 61TB", 1.0, BLUE)]
    by = cy0 + 6
    for lab, v, colr in bars:
        c.text(cx0, by + 13, lab, size=14, fill=INK, vmid=True)
        c.rect(vx(0), by + 1, vx(v) - vx(0), 24, fill=colr, r=2)
        c.text(vx(v) + 8, by + 13, fmt(v), size=15, bold=True, fill=INK, vmid=True)
        by += 48
    for v in [0, 1, 2, 3]:
        c.text(vx(v), cy0 + chh + 12, str(v), size=13, fill=GRAY_2, anchor="middle", vmid=True)
    c.line(vx(0), cy0 - 6, vx(0), cy0 + chh, stroke=LINE, sw=1)
    c.text(cx0, cy0 + chh + 34, "정격 DWPD (동급 비교)", size=13, fill=GRAY_2, vmid=True)
    c.text(GX + 430, GY + 90, "2~10배", size=44, bold=True, fill=BLUE, vmid=True)
    c.text(GX + 430, GY + 132, ["동급 정격 대비", "(극단 조합 40배)"], size=14, fill=GRAY, vmid=True, lh=1.2)
    c.text(GX + 430, GY + 194, "350EB", size=30, bold=True, fill=BLUE, vmid=True)
    c.text(GX + 430, GY + 226, "2030 추론 캐시 수요(e)", size=13, fill=GRAY, vmid=True)
    fy = GY + 342
    c.rect(GX + 30, fy - 24, 150, 48, fill=BLUE, r=4)
    c.text(GX + 105, fy, "고용량화", size=18, bold=True, fill=WHITE, anchor="middle", vmid=True)
    bx0 = GX + 180
    for lab, tag, no, dy in [("다이 수 8배 ↑ → 신뢰성 축", "SSD 내부 해법", 2, -46), ("DWPD 격차 → 내구성 축", "어느 계층인가", 3, 46)]:
        yy = fy + dy
        c.path(f"M{bx0},{fy} L{bx0 + 30},{fy} L{bx0 + 30},{yy} L{bx0 + 56},{yy}", stroke=BLUE, sw=2.5, arrow="blue")
        c.rect(bx0 + 62, yy - 24, GW - 262, 48, fill=WHITE, stroke=BLUE, sw=1.2, r=4)
        c.num(bx0 + 88, yy, no, r=14, size=15)
        c.text(bx0 + 112, yy - 9, lab, size=16, bold=True, fill=INK, vmid=True)
        c.text(bx0 + 112, yy + 12, tag, size=13, fill=GRAY, vmid=True)


# ====================================================================== 2. 신뢰성
def draw_s2(c):
    PX, PY, PW, PH = 40, 24, 560, 580
    c.panel(PX, PY, PW, PH, "SSD당 NAND 다이 수", "요구 FFR ≤ 3%는 고정")
    gx1, gy1 = PX + 30, PY + 96
    g1w, g1h = 190, 98
    c.image("qlc_vis_dies128", gx1 - 4, gy1 - 4, g1w)                              # 16 × 8 격자(그림)
    c.rect(gx1 - 8, gy1 - 8, g1w + 8, g1h + 8, fill="none", stroke=GRAY_2, sw=1, r=3)
    c.text(gx1, gy1 - 26, "2012 · S3700 800GB", size=13, fill=GRAY_2, vmid=True)
    c.text(gx1, gy1 + g1h + 26, "128", size=26, bold=True, fill=INK, vmid=True)
    gx2, gy2 = PX + 266, PY + 96
    g2 = 294
    c.image("qlc_vis_dies1024", gx2 - 4, gy2 - 4, g2)                              # 32 × 32 격자(그림)
    c.rect(gx2 - 8, gy2 - 8, g2 + 8, g2 + 8, fill="none", stroke=BLUE, sw=1.2, r=3)
    c.text(gx2, gy2 - 26, "2025 · LC9 245TB · 2Tb 다이", size=13, fill=GRAY_2, vmid=True)
    c.text(gx2 + g2 - 8, gy2 + g2 + 26, "1,024", size=26, bold=True, fill=BLUE, anchor="end", vmid=True)
    c.line(gx1 + g1w + 14, gy1 + 46, gx2 - 22, gy1 + 46, stroke=BLUE, sw=3, arrow="blue")
    c.text((gx1 + g1w + 14 + gx2 - 22) / 2, gy1 + 22, "8배", size=16, bold=True, fill=BLUE, anchor="middle", vmid=True)
    yy = PY + 456
    c.text(PX + 30, yy, "다이 고장률 상한 (같은 FFR, 독립 고장 모델)", size=14, fill=GRAY_2, vmid=True)
    c.rich(PX + 30, yy + 44, [("2.4e-4", 30, True, GRAY), ("  →  ", 22, False, GRAY_2), ("3.0e-5", 30, True, BLUE), ("   8배 엄격", 18, True, BLUE)], vmid=True)
    c.text(PX + 30, yy + 90, "다이 고장률 개선은 한계 → 해법은 SSD 계층", size=14, fill=GRAY, vmid=True)

    MX_, MY, MW, MH = 640, 24, 1162, 580
    c.panel(MX_, MY, MW, MH, "SSD 내부 해법 3", "다이 고장을 SSD 안에서 흡수 · 호스트에는 관측 지표만", hot=True)
    hx, hy, hw, hh = MX_ + 60, MY + 60, MW - 120, 54
    c.rect(hx, hy, hw, hh, fill=WHITE, stroke=BLUE, sw=1.2, r=4, dash="7 5")
    c.text(hx + 20, hy + hh / 2, "호스트 · 플랫폼", size=18, bold=True, fill=GRAY, vmid=True)
    c.text(hx + 200, hy + hh / 2, "관측 · 수용만 · OCP SMART C0 · Hyrax형 감량 수용", size=14, fill=GRAY, vmid=True)
    sx, sy_, sw_, sh_ = MX_ + 60, MY + 160, MW - 120, 340
    c.rect(sx, sy_, sw_, sh_, fill=TINT, stroke=BLUE, sw=1.5, r=6)
    c.text(sx + 20, sy_ + 26, "SSD (컨트롤러 · 펌웨어)", size=18, bold=True, fill=BLUE, vmid=True)
    ax_ = sx + sw_ - 120
    c.line(ax_, sy_ - 4, ax_, hy + hh + 6, stroke=BLUE_T1, sw=2.5, arrow="t1")
    c.text(ax_ - 12, (sy_ + hy + hh) / 2, "텔레메트리 · 감량 예고", size=13, fill=BLUE_T1, anchor="end", vmid=True)
    dy0 = sy_ + 104
    cell, gap = 54, 14
    dx0 = sx + 30
    for i in range(8):
        x = dx0 + i * (cell + gap)
        failed = i == 4
        c.rect(x, dy0, cell, cell, fill=WHITE if not failed else RED_BG, stroke=GRAY_2 if not failed else RED, sw=1.2, r=3)
        c.text(x + cell / 2, dy0 + cell / 2, f"D{i + 1}", size=14, fill=GRAY if not failed else RED, anchor="middle", vmid=True, bold=failed)
        if failed:
            c.line(x + 12, dy0 + 12, x + cell - 12, dy0 + cell - 12, stroke=RED, sw=2)
            c.line(x + cell - 12, dy0 + 12, x + 12, dy0 + cell - 12, stroke=RED, sw=2)
    px_ = dx0 + 8 * (cell + gap) + 30
    c.rect(px_, dy0, cell, cell, fill=BLUE, r=3)
    c.text(px_ + cell / 2, dy0 + cell / 2, "P", size=18, bold=True, fill=WHITE, anchor="middle", vmid=True)
    for k in range(2):
        x = px_ + (cell + gap) * (k + 1) + 30
        c.rect(x, dy0, cell, cell, fill=WHITE, stroke=BLUE, sw=1.2, r=3, dash="5 4")
        c.text(x + cell / 2, dy0 + cell / 2, "S", size=16, bold=True, fill=BLUE, anchor="middle", vmid=True)
    bx1, bx2 = dx0, px_ + cell
    c.path(f"M{bx1},{dy0 - 12} L{bx1},{dy0 - 20} L{bx2},{dy0 - 20} L{bx2},{dy0 - 12}", stroke=BLUE, sw=1.5)
    c.text((bx1 + bx2) / 2, dy0 - 32, "① 다이 패리티 · XOR 스트라이프 (Micron RAIN형)", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    fx_ = dx0 + 4 * (cell + gap) + cell / 2
    sx1 = px_ + (cell + gap) + 30 + cell / 2
    c.path(f"M{fx_},{dy0 + cell + 6} L{fx_},{dy0 + cell + 34} L{sx1},{dy0 + cell + 34} L{sx1},{dy0 + cell + 10}", stroke=BLUE, sw=2, arrow="blue")
    c.text((fx_ + sx1) / 2, dy0 + cell + 52, "② 여분 다이 · 은퇴 · 감량 운영 (삼성 PM1733 FIP)", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    ty = dy0 + cell + 90
    c.text(dx0, ty, "③ 텔레메트리 · 사전 예측", size=14, bold=True, fill=BLUE, vmid=True)
    c.text(dx0 + 230, ty, "RBER 추이 · XOR 복구 횟수 → 징후 다이 사전 은퇴", size=14, fill=GRAY, vmid=True)
    spx, spy, spw, sph = dx0, ty + 22, 400, 70
    c.image("qlc_vis_rber", spx, spy, spw)                                           # 스파크라인(그림)
    c.text(spx + spw + 10, spy + 12, "은퇴 임계", size=13, fill=RED, vmid=True)
    c.text(spx + spw + 10, spy + sph - 8, "RBER 추이", size=13, fill=GRAY_2, vmid=True)
    c.text(spx + spw * 0.8 - 8, spy - 4, "사전 은퇴 →", size=13, fill=BLUE, anchor="end", vmid=True)
    c.chip(sx + sw_ - 300, sy_ + sh_ - 48, "SSD 고장률 p → p² 차수 · FFR 여유", size=14, bold=True, fill=BLUE, stroke=BLUE, color=WHITE, padx=14)


# ====================================================================== 3. 내구성 · 해법 사다리
def draw_s3(c):
    c.text(40, 26, "요구 (고정)", size=14, fill=GRAY_2, vmid=True)
    c.rich(150, 26, [("DWPD 1~3", 18, True, BLUE), ("  ·  UBER 1e-15 / 1e-16", 16, False, GRAY)], vmid=True)
    c.line(40, 46, 1230, 46, stroke=BLUE, sw=2, dash="8 6")
    steps = [
        (1, "컨트롤러 ECC", "1991~", "완결", "1 bit/512B → LDPC 120 bit/KB", "RBER 10⁶배 ↑ → 60배 ECC로 흡수 → UBER 충족", BLUE_T2, "컨트롤러"),
        (2, "SSD 단독 최적화", "2014~2019", "부분 성공", "WAF ≈ 3 유지", "스트림 · 자동 배정 · FTL 추정 · IO 결정성 → QoS·성능 개선, 수명 감지 불가", BLUE_T1, "SSD 안"),
        (3, "호스트 공동 설계", "2022~", "조건부", "WAF ≈3 → ≈1 · 유효 DWPD ×2.9", "호스트가 수명 지정 · KV 캐시 실측은 Phase 2", BLUE, "호스트"),
    ]
    sx0, base_y = 40, 470
    step_w, step_gap = 385, 18
    heights = [150, 260, 390]
    for i, (no, name, era, res, metric, desc, colr, who) in enumerate(steps):
        x = sx0 + i * (step_w + step_gap)
        h = heights[i]
        y = base_y - h
        hot = i == 2
        c.rect(x, y, step_w, h, fill=TINT if hot else WHITE, stroke=BLUE if hot else LINE, sw=1.5 if hot else 1, r=4)
        c.rect(x, y, step_w, 8, fill=colr)
        c.num(x + 30, y + 40, no, r=15, fill=colr, color=WHITE if colr != BLUE_T2 else INK)
        c.text(x + 54, y + 40, f"{no}단계 · {name}", size=17, bold=True, fill=INK, vmid=True)
        c.text(x + 54, y + 64, f"{era} · {who}", size=13, fill=GRAY_2, vmid=True)
        badge_fill = {"완결": BLUE_T2, "부분 성공": WHITE, "조건부": BLUE}[res]
        badge_col = {"완결": INK, "부분 성공": BLUE_T1, "조건부": WHITE}[res]
        bw = tw(res, 13, True) * 1.08 + 22
        c.rect(x + step_w - bw - 16, y + 27, bw, 26, fill=badge_fill, stroke=BLUE_T1 if res == "부분 성공" else badge_fill, r=13)
        c.text(x + step_w - bw / 2 - 16, y + 40, res, size=13, bold=True, fill=badge_col, anchor="middle", vmid=True)
        c.text(x + 30, y + 104, metric, size=20, bold=True, fill=BLUE if hot else INK, vmid=True)
        c.text(x + 30, y + 134, wrap(desc, 14, step_w - 70), size=14, fill=GRAY, vmid=True, lh=1.3, w=step_w - 60)
        if i < 2:
            nx = x + step_w + step_gap
            ny = base_y - heights[i + 1]
            c.path(f"M{x + step_w - 40},{y - 10} L{x + step_w - 40},{ny - 22} L{nx + 20},{ny - 22} L{nx + 20},{ny - 8}", stroke=BLUE, sw=2, arrow="blue")
    c.line(sx0, base_y, sx0 + 3 * step_w + 2 * step_gap, base_y, stroke=GRAY_2, sw=1.5)
    fy = 528
    terms = [("DWPD", "요구 · 고객", WHITE, INK, LINE), ("=", None, None, None, None), ("P/E", "셀", WHITE, INK, LINE), ("×", None, None, None, None),
             ("1 + OP", "SSD", WHITE, INK, LINE), ("÷", None, None, None, None), ("WAF", "호스트 · 앱", BLUE, WHITE, BLUE), ("÷", None, None, None, None),
             ("365 × 년", "고객 · 보증연수", WHITE, INK, LINE)]
    x = 40
    for t, who, fill, colr, stroke in terms:
        if who is None:
            c.text(x + 16, fy + 22, t, size=22, fill=GRAY_2, anchor="middle", vmid=True); x += 34; continue
        w_ = max(tw(t, 20, True) * 1.08 + 30, 118)
        c.rect(x, fy, w_, 44, fill=fill, stroke=stroke, sw=1.2, r=4)
        c.text(x + w_ / 2, fy + 22, t, size=20, bold=True, fill=colr, anchor="middle", vmid=True)
        c.text(x + w_ / 2, fy + 62, who, size=13, fill=BLUE if fill == BLUE else GRAY_2, anchor="middle", vmid=True, bold=fill == BLUE)
        x += w_ + 6
    c.chip(x + 24, fy + 6, "잔여 변수 = WAF", size=15, bold=True, fill=BLUE, stroke=BLUE, color=WHITE, padx=14)

    RX, RY, RW, RH = 1270, 20, 532, 585
    c.panel(RX, RY, RW, RH, "WAF 실증 · 호스트 배치", "≈3 → ≈1", hot=True)
    groups = [("범용 랜덤", 3.0, 1.0, False), ("CacheLib", 3.22, 1.03, False), ("KV 캐시", None, None, True)]
    gx, gy, gw, gh = RX + 40, RY + 70, RW - 80, 200
    vmax = 3.6
    def vy(v): return gy + gh - gh * v / vmax
    c.line(gx, gy + gh, gx + gw, gy + gh, stroke=LINE, sw=1)
    bw_, colw = 44, gw / 3
    for k, (lab, a, b, hyp) in enumerate(groups):
        cx = gx + colw * k + colw / 2
        if not hyp:
            c.rect(cx - bw_ - 4, vy(a), bw_, gy + gh - vy(a), fill=BLUE_T2, r=2)
            c.text(cx - bw_ / 2 - 4, vy(a) - 12, fmt(a), size=14, bold=True, fill=INK, anchor="middle", vmid=True)
            c.rect(cx + 4, vy(b), bw_, gy + gh - vy(b), fill=BLUE, r=2)
            c.text(cx + 4 + bw_ / 2, vy(b) - 12, fmt(b), size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
        else:
            c.rect(cx - bw_ - 4, vy(3.0), bw_, gy + gh - vy(3.0), fill="none", stroke=GRAY_2, sw=1.2, dash="5 4", r=2)
            c.rect(cx + 4, vy(1.0), bw_, gy + gh - vy(1.0), fill="none", stroke=BLUE, sw=1.2, dash="5 4", r=2)
            c.text(cx, vy(3.0) - 14, "미실측 · 가설", size=13, bold=True, fill=BLUE, anchor="middle", vmid=True)
        c.text(cx, gy + gh + 18, lab, size=14, fill=INK, anchor="middle", vmid=True)
    c.text(gx, gy - 12, "WAF", size=13, fill=GRAY_2, vmid=True)
    c.rect(gx, gy + gh + 40, 12, 12, fill=BLUE_T2); c.text(gx + 18, gy + gh + 46, "SSD 단독", size=13, fill=GRAY, vmid=True)
    c.rect(gx + 100, gy + gh + 40, 12, 12, fill=BLUE); c.text(gx + 118, gy + gh + 46, "호스트 배치", size=13, fill=GRAY, vmid=True)
    ly = RY + 336
    c.text(RX + 40, ly, "격차 축소 변수 · 모두 병행 중", size=14, bold=True, fill=INK, vmid=True)
    levers = [("다이 세대 · P/E", False), ("OP", False), ("SLC 캐시 · 쓰기 정형", False), ("보증연수 · TBW", False), ("워크로드 재정의", False), ("호스트 배치 · WAF", True)]
    cx_, cy_ = RX + 40, ly + 22
    for lab, hot in levers:
        w_ = tw(lab, 14, True) * 1.08 + 24
        if cx_ + w_ > RX + RW - 30:
            cx_ = RX + 40; cy_ += 40
        c.chip(cx_, cy_, lab, size=14, bold=True, fill=BLUE if hot else WHITE, stroke=BLUE if hot else LINE, color=WHITE if hot else INK, padx=12)
        cx_ += w_ + 8
    c.text(RX + 40, cy_ + 66, "호스트 배치 하나로는 2~10배 미해소 → 다른 변수와 결합", size=14, fill=GRAY, vmid=True)


# ====================================================================== 4. 역량
def draw_s4(c):
    W = 1842
    gaps = [("2~10배", "내구성 격차"), ("25배", "스트림 격차 · RUH 2~8 vs 200+"), ("0건", "접점 부재 · 캐시 관리자 코드"), ("≈3 → ≈1", "해소 수단 · KV 캐시 미실측")]
    bw = (W - 80 - 3 * 18) / 4
    for i, (big, lab) in enumerate(gaps):
        x = 40 + i * (bw + 18)
        hot = i == 3
        c.rect(x, 16, bw, 64, fill=TINT if hot else WHITE, stroke=BLUE if hot else LINE, sw=1.2 if hot else 1, r=4)
        c.text(x + 18, 48, big, size=26, bold=True, fill=BLUE, vmid=True)
        c.text(x + 18 + tw(big, 26, True) * 1.08 + 18, 49, lab, size=14, fill=GRAY, vmid=True)
    LX, LY, LW = 1030, 108, 700
    layers = [("응용 · 추론 엔진", "vLLM · SGLang · TRT-LLM"), ("KV 캐시 관리자", "KVBM · LMCache · Mooncake"), ("전송 · I/O 라이브러리", "NIXL · GDS · xNVMe"),
              ("커널 · 플랫폼", "write streams · XFS · CMX"), ("SSD", "RUH · 2Tb QLC · 텔레메트리")]
    lh = 78
    c.text(LX, LY - 14, "고객 시스템 5계층", size=14, fill=GRAY_2, vmid=True)
    for i, (nm, ex) in enumerate(layers):
        y = LY + i * (lh + 10)
        reach = {0: 3, 1: 3, 2: 2, 3: 2, 4: 1}[i]
        fill = {1: BLUE, 2: BLUE_T1, 3: BLUE_T2}[reach]
        c.rect(LX, y, LW, lh, fill=WHITE, stroke=LINE, r=4)
        c.rect(LX, y, 10, lh, fill=fill)
        c.text(LX + 26, y + 28, nm, size=17, bold=True, fill=INK, vmid=True)
        c.text(LX + 26, y + 54, ex, size=13, fill=GRAY, vmid=True)
        c.chip(LX + LW - 120, y + 24, f"Phase {reach}", size=13, bold=True, fill=fill, stroke=fill, color=WHITE if reach != 3 else INK, padx=10)
    ax = LX + LW + 34
    ytop, ybot = LY + 8, LY + 5 * lh + 40 - 8
    c.line(ax, ytop, ax, (ytop + ybot) / 2 - 8, stroke=BLUE_T1, sw=2.5, arrow="t1")
    c.text(ax + 10, ytop + 40, ["트레이스", "수집 ↓"], size=13, fill=BLUE_T1, lh=1.2, vmid=True)
    c.line(ax, ybot, ax, (ytop + ybot) / 2 + 8, stroke=BLUE, sw=2.5, arrow="blue")
    c.text(ax + 10, ybot - 56, ["배치 정책", "규격 ↑"], size=13, fill=BLUE, lh=1.2, vmid=True)
    PX, PY, PW = 40, 108, 950
    phases = [(1, "디바이스", "RUH 200+ · 2Tb QLC · CMX/STX", "정격 내 원가 · 전력", 0.60, "진행 중", "QLC 라인 RUH 2~8 · DWPD 미공개 · CMX 첫 공급은 TLC"),
              (2, "워크로드 최적화", "트레이스 재현 · RUH 정책 · 실측", "워크로드 기준 수명", 0.15, "준비", "KV 백서 2종 · 트레이스 기반 실측 미공개"),
              (3, "고객 시스템 공동 설계", "관리자 플러그인 · 커널 I/O · TCO", "시스템 TCO", 0.0, "미착수", "캐시 관리자 4종 기여 0건")]
    ph = 140
    for i, (no, nm, cap, guar, prog, st, why) in enumerate(phases):
        y = PY + i * (ph + 14)
        hot = i == 0
        c.rect(PX, y, PW, ph, fill=WHITE, stroke=BLUE if hot else LINE, sw=1.5 if hot else 1, r=4)
        c.num(PX + 32, y + 32, no, r=16, fill={1: BLUE, 2: BLUE_T1, 3: BLUE_T2}[no], color=WHITE if no != 3 else INK, size=17)
        c.text(PX + 58, y + 32, f"Phase {no} · {nm}", size=19, bold=True, fill=INK, vmid=True)
        c.text(PX + 58, y + 62, cap, size=14, fill=GRAY, vmid=True)
        c.chip(PX + PW - 250, y + 16, "보증 · " + guar, size=13, bold=True, fill=TINT, stroke=BLUE_T2, color=BLUE, padx=10)
        bx, by, bw_, bh_ = PX + 58, y + 88, PW - 330, 18
        c.rect(bx, by, bw_, bh_, fill=BLUE_T3, r=3)
        if prog > 0:
            c.rect(bx, by, bw_ * prog, bh_, fill=BLUE, r=3)
        c.text(bx + bw_ + 14, by + bh_ / 2, st, size=15, bold=True, fill=BLUE if prog > 0 else GRAY_2, vmid=True)
        c.text(PX + 58, y + 120, why, size=13, fill=GRAY_2, vmid=True)
    mx = PX + 58 + (PW - 330) * 0.60
    c.poly([(mx - 9, PY + 88 + 18 + 4), (mx + 9, PY + 88 + 18 + 4), (mx, PY + 88 + 18 - 6)], fill=BLUE)
    c.text(mx + 14, PY + 88 + 18 + 12, "삼성 현 위치", size=13, bold=True, fill=BLUE, vmid=True)


# ====================================================================== 5. 실행 — 두 트랙 화살표(v4.0 계승) + 고객 선별 · 선례 · 내부 실행 · 통과 조건 · 판돈
def draw_s5(s):
    MX, CW, RIGHT = K.MX, K.CW, K.RIGHT
    rect, tb, WHITE_, INK_, GRAY_, GRAY2_, BLUE_, T1, T2, LINE_, TINT_ = K.rect, K.tb, K.WHITE, K.INK, K.GRAY, K.GRAY_2, K.BLUE, K.BLUE_T1, K.BLUE_T2, K.LINE, K.TINT
    M_Y, M_H = 2.80, 3.90
    # 좌: 삼성 개발실
    LB_W = 3.70
    rect(s, MX, M_Y, LB_W, M_H, fill=WHITE_, line=LINE_, line_w=0.75)
    tb(s, MX + 0.30, M_Y + 0.20, LB_W - 0.6, 0.32, [("삼성 개발실", 18, True, BLUE_)])
    tb(s, MX + 0.30, M_Y + 0.54, LB_W - 0.6, 0.26, [("삼성이 제공하는 것", 12.75, False, GRAY2_)])
    gy = M_Y + 1.02
    for g in ["KV-ready QLC + 조건부 보증", "FDE 상주 엔지니어 · Pod 3~5명", "업스트림 코드 · 레퍼런스 스택", "공용 TCO 모델 · 실측 공개"]:
        rect(s, MX + 0.30, gy + 0.10, 0.16, 0.16, fill=BLUE_)
        tb(s, MX + 0.56, gy, LB_W - 0.86, 0.36, [(g, 13.5, True, INK_)], anchor=MSO_ANCHOR.MIDDLE)
        gy += 0.66
    # 우: 고객 시스템
    RB_W = 4.10
    RBX = RIGHT - RB_W
    rect(s, RBX, M_Y, RB_W, M_H, fill=WHITE_, line=LINE_, line_w=0.75)
    tb(s, RBX + 0.30, M_Y + 0.20, RB_W - 0.6, 0.32, [("고객 시스템", 18, True, BLUE_)])
    tb(s, RBX + 0.30, M_Y + 0.54, RB_W - 0.6, 0.26, [("삼성 인력 · 코드의 진입 계층", 12.75, False, GRAY2_)])
    cys = K.stack(s, RBX + 0.30, M_Y + 0.92, 2.45, ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O · 커널", "SSD: 삼성 QLC"], ["none", "touch", "own", "own"], layer_h=0.46, gap=0.08)
    _px = RBX + 0.30 + 2.45 + 0.16
    pw = K.person(s, _px, cys[1] + 0.03, 0.40, color=BLUE_)
    tb(s, _px + pw + 0.06, cys[1], 0.8, 0.46, [("FDE", 12.75, True, BLUE_)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, _px, cys[2], 1.05, 0.46, [("코드 머지", 12.75, True, BLUE_)], anchor=MSO_ANCHOR.MIDDLE)
    K.logo_row(s, [("logo", "anthropic"), ("logo", "openai"), ("logo", "nvidia"), ("logo", "meta")], RBX + 0.30, M_Y + M_H - 0.56, 0.22, gap=0.16, max_w=RB_W - 0.6)
    # 중앙: 두 트랙 화살표 + 카드 2
    CX0, CX1 = MX + LB_W + 0.24, RBX - 0.24
    CWID = CX1 - CX0
    A_H = 0.82
    ar1 = rect(s, CX0, M_Y + 0.10, CWID, A_H, fill=BLUE_, shape=MSO_SHAPE.RIGHT_ARROW)
    ar1.adjustments[0] = 0.80; ar1.adjustments[1] = 0.26
    tb(s, CX0 + 0.36, M_Y + 0.10, CWID - 1.3, A_H,
       [("① FDE 상주: 워크로드를 개방하는 고객 1~2사에 집중", 16, True, WHITE_), ("상주 조건: 트레이스·정책 접근 · 캐시 관리자 자체 운영 · 물량·규격 파급력", 12.5, False, WHITE_)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)
    CARD_Y = M_Y + 0.10 + A_H + 0.14
    CARD_H = M_H - 2 * (0.10 + A_H) - 0.28
    CARD_W = (CWID - 0.20) / 2
    # 카드 A: 고객 선별 · 채널
    cx = CX0
    rect(s, cx, CARD_Y, CARD_W, CARD_H, fill=TINT_)
    tb(s, cx + 0.22, CARD_Y + 0.10, CARD_W - 0.44, 0.26, [("고객 선별 · 채널", 13.5, True, BLUE_)])
    rows = [("AI 랩 · Anthropic·OpenAI", "FDE 상주 Pod 3~5명", True), ("NVIDIA 생태계 · CMX·KVBM", "FDE 플랫폼 팀 파견", True),
            ("하이퍼스케일러 · 코드 상주 불가", "업스트림 · OCP 규격", False), ("OEM · 네오클라우드", "레퍼런스 스택", False)]
    ry = CARD_Y + 0.46
    rh = (CARD_H - 0.56) / 4
    for who, how, hot in rows:
        rect(s, cx + 0.22, ry + 0.05, 0.08, rh - 0.10, fill=BLUE_ if hot else T2)
        tb(s, cx + 0.40, ry, CARD_W * 0.55, rh, [(who, 11.5, hot, INK_)], anchor=MSO_ANCHOR.MIDDLE)
        rect(s, cx + 0.40 + CARD_W * 0.55, ry + rh / 2 - 0.07, 0.18, 0.14, fill=BLUE_ if hot else T2, shape=MSO_SHAPE.RIGHT_ARROW)
        tb(s, cx + 0.40 + CARD_W * 0.55 + 0.24, ry, CARD_W * 0.45 - 0.5, rh, [(how, 11.5, True, BLUE_ if hot else INK_)], anchor=MSO_ANCHOR.MIDDLE)
        ry += rh
    # 카드 B: 선례
    cx = CX0 + CARD_W + 0.20
    rect(s, cx, CARD_Y, CARD_W, CARD_H, fill=TINT_)
    tb(s, cx + 0.22, CARD_Y + 0.10, CARD_W - 0.44, 0.26, [[("선례", 13.5, True, BLUE_), ("   두 수단 모두 업계 선례가 있다", 11.5, False, GRAY_)]])
    pic_y = CARD_Y + 0.50
    px = cx + 0.22
    for k in range(3):
        K.person(s, px + k * 0.27, pic_y + 0.04, 0.32, color=BLUE_)
    rect(s, px + 0.86, pic_y + 0.12, 0.30, 0.14, fill=T2, shape=MSO_SHAPE.RIGHT_ARROW)
    rect(s, px + 1.22, pic_y, 0.95, 0.40, fill=WHITE_, line=BLUE_, line_w=1.0)
    tb(s, px + 1.22, pic_y, 0.95, 0.40, [("고객 현장", 11.5, True, INK_)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, px + 2.30, pic_y - 0.02, CARD_W - 2.74, 0.48, [("Palantir FDE", 12.0, True, BLUE_), ("상주 · 성과 평가 · Anthropic·OpenAI GTM 채택", 10.5, False, GRAY_)], spacing=1.02)
    blk_y = pic_y + 0.62
    for k, (lab, hot) in enumerate([("공동 설계", True), ("다년 공급", False), ("운영 통합", False)]):
        bx = px + k * 0.70
        rect(s, bx, blk_y, 0.64, 0.26, fill=BLUE_ if hot else T2)
        tb(s, bx, blk_y, 0.64, 0.26, [(lab, 10.5, True, WHITE_ if hot else INK_)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, px + 2.16, blk_y - 0.06, CARD_W - 2.60, 0.5, [("Micron↔Anthropic 협약 2026-06", 12.0, True, BLUE_), ("삼성·SK 계약엔 조항 부재 → 선제 제안", 10.5, False, GRAY_)], spacing=1.02)
    B_Y = CARD_Y + CARD_H + 0.14
    ar2 = rect(s, CX0, B_Y, CWID, A_H, fill=T2, shape=MSO_SHAPE.LEFT_ARROW)
    ar2.adjustments[0] = 0.80; ar2.adjustments[1] = 0.26
    tb(s, CX0 + 0.95, B_Y, CWID - 1.3, A_H,
       [("② 워크로드 · 규격 접근권 확보", 16, True, INK_), ("협약의 공동 설계 조항 · 트레이스 · KV 수명 정책 · 시한 2027H1(공급 완화 전)", 12.5, False, INK_)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)
    # 하단 1: 개발실 내부 실행 3축
    F_Y, F_H = M_Y + M_H + 0.16, 0.92
    axes = [("조직", ["시스템 SW 조직 강화 · 개발실 소속 Pod 3~5명", "미주 법인 협업 · 자회사·별도 보상 없음"]),
            ("인사", ["고객 코드를 읽고 고치는 전문가 채용·양성", "본사 엔지니어 상주 로테이션 3~6개월"]),
            ("문화", ["메인테이너·커미터 배출 · 업스트림 우선", "KV 캐시 실측 업계 최초 공개"])]
    FW = (CW - 0.24 * 2) / 3
    for i, (lab, lines) in enumerate(axes):
        x = MX + i * (FW + 0.24)
        rect(s, x, F_Y, FW, F_H, fill=WHITE_, line=LINE_, line_w=0.75)
        rect(s, x, F_Y, 0.85, F_H, fill=BLUE_)
        tb(s, x, F_Y, 0.85, F_H, [(lab, 16, True, WHITE_)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x + 1.02, F_Y, FW - 1.16, F_H, [(lines[0], 13, True, INK_), (lines[1], 12, False, GRAY_)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)
    # 하단 2: 통과 조건 + 판돈·비용
    G_Y, G_H = F_Y + F_H + 0.14, 9.05 - (F_Y + F_H + 0.14)
    GW_ = CW - 5.9 - 0.24
    rect(s, MX, G_Y, GW_, G_H, fill=WHITE_, line=LINE_, line_w=0.75)
    tb(s, MX + 0.22, G_Y + 0.08, GW_ - 0.4, 0.26, [[("단계별 통과 조건", 13.5, True, BLUE_), ("   각 단계의 증명이 다음 승인 근거", 11.5, False, GRAY2_)]])
    gates = [("90일", "트레이스 확보 · KV 캐시 실측 공개 · 플러그인 PR", False), ("12개월", "메인라인 머지 · 유효 DWPD ≥ 1 실증 · 보증 초안", False), ("2027H1", "디자인인 1사 · 공동 설계 조항 · 레퍼런스 공개", True)]
    gx0, gy0 = MX + 0.30, G_Y + 0.50
    gw = (GW_ - 0.6) / 3
    rect(s, gx0 + 0.12, gy0 + 0.12, GW_ - 0.84, 0.03, fill=T2)
    for i, (t, d, hot) in enumerate(gates):
        x = gx0 + i * gw
        rect(s, x, gy0, 0.26, 0.26, fill=BLUE_ if hot else WHITE_, line=BLUE_, line_w=1.5, shape=MSO_SHAPE.DIAMOND)
        tb(s, x + 0.36, gy0 - 0.02, 1.2, 0.3, [(t, 14, True, BLUE_)], anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x, gy0 + 0.34, gw - 0.2, 0.3, [(d, 11, False, GRAY_)], anchor=MSO_ANCHOR.MIDDLE)
    SX = MX + GW_ + 0.24
    rect(s, SX, G_Y, RIGHT - SX, G_H, fill=TINT_, line=T2, line_w=0.75)
    rect(s, SX, G_Y, 0.06, G_H, fill=BLUE_)
    half = (RIGHT - SX) / 2
    tb(s, SX + 0.22, G_Y + 0.08, half - 0.3, 0.22, [("판돈 · 락인으로 얻는 점유율", 10.5, False, GRAY2_)])
    tb(s, SX + 0.22, G_Y + 0.32, half - 0.3, 0.36, [("캐시 계층 QLC 0 → 50%", 17, True, BLUE_)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, SX + 0.22, G_Y + 0.70, half - 0.3, 0.22, [("2030 350EB 중 175EB(조건부)", 10.5, False, GRAY_)])
    tb(s, SX + half + 0.10, G_Y + 0.08, half - 0.3, 0.22, [("비용 · 개발실 자원 투입", 10.5, False, GRAY2_)])
    tb(s, SX + half + 0.10, G_Y + 0.32, half - 0.3, 0.36, [("별도 투자 없음", 17, True, BLUE_)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, SX + half + 0.10, G_Y + 0.70, half - 0.3, 0.22, [("Pod 3~5명 × 1~2사 재배치", 10.5, False, GRAY_)])


# ====================================================================== 6. 보증 · SLA
def draw_s6(c):
    PX, PY, PW, PH = 40, 20, 1000, 585
    c.panel(PX, PY, PW, PH, "유효 DWPD = 정격 × (3 ÷ WAF)", "정격은 WAF ≈3(랜덤 4KB) 기준")
    c.image("qlc_vis_dwpd_curves", PX + 20, PY + 52, PW - 40)                       # 곡선 차트(그림, 1000×520 → 960×499)
    ry = PY + 52 + 499 + 18
    c.text(PX + 30, ry, "WAF가 오르는 경우", size=13, bold=True, fill=INK, vmid=True)
    rx_ = PX + 190
    for r_ in ["① 워크로드 변화", "② 오분류 · RUH 간섭 (WARP)", "③ 스택 업데이트 → 힌트 손실"]:
        w_ = c.chip(rx_, ry - 12, r_, size=13, bold=False, fill=WHITE, stroke=LINE, color=GRAY, padx=10)
        rx_ += w_ + 8
    RX, RY, RW, RH = 1080, 20, 722, 585
    c.panel(RX, RY, RW, RH, "조건부 보증 설계 · 5원칙", "관행은 유지, 유효 DWPD는 조건부로만", hot=True)
    steps = [("③", "양측 동일 텔레메트리", "OCP SMART C0 · 물리 매체 ÷ 호스트 기록량"), ("④", "배치 규격 준수 조건", "RUH 매핑 · 정책 준수 시에만 적용"),
             ("②", "WAF 밴드 판정", "≤1.2 / ≤2.0 / >2.0 밴드 → 등급"), ("⑤", "초과 지속 시 재협상 · 감량 운영", "2장 FIP 유사 · 조건 재설정")]
    bx, by, bw_, bh_ = RX + 40, RY + 66, RW - 80, 78
    for i, (no, head, body) in enumerate(steps):
        y = by + i * (bh_ + 20)
        c.rect(bx, y, bw_, bh_, fill=WHITE, stroke=BLUE_T2, sw=1.2, r=4)
        c.circle(bx + 30, y + bh_ / 2, 16, fill=BLUE)
        c.text(bx + 30, y + bh_ / 2, no, size=15, bold=True, fill=WHITE, anchor="middle", vmid=True)
        c.text(bx + 60, y + 26, head, size=17, bold=True, fill=INK, vmid=True)
        c.text(bx + 60, y + 52, body, size=13, fill=GRAY, vmid=True)
        if i < 3:
            c.line(bx + bw_ / 2, y + bh_ + 2, bx + bw_ / 2, y + bh_ + 16, stroke=BLUE, sw=2.5, arrow="blue")
    fy = by + 4 * (bh_ + 20) - 6
    c.rect(bx, fy, bw_, 54, fill=BLUE, r=4)
    c.text(bx + 30, fy + 27, "①", size=15, bold=True, fill=WHITE, anchor="middle", vmid=True)
    c.text(bx + 60, fy + 27, "보증 기준은 TBW · 물리 매체 기록량 선도달 관행 유지 · 유효 DWPD는 부가 표기", size=14, bold=True, fill=WHITE, vmid=True)


# ================================================================ 슬라이드 조립
SLIDES = [
    ("요약 · 6장을 한 장에", "고용량 QLC의 두 축: 신뢰성은 SSD 안에서, 내구성은 고객 시스템과 함께 해결합니다",
     "문제가 두 축으로 갈라지고, 신뢰성은 SSD 계층에서, 내구성은 역량 · 실행 · 보증으로 이어집니다.", draw_s0,
     ("요약", "잔여 변수 WAF는 호스트가 결정하므로 공동 설계 역량을 3단계로 확장하고, FDE 선별·조건부 보증으로 실행합니다", 1, 17),
     "요약 장입니다. 덱 6장의 제목을 이어 읽으면 한 문단이 되며, 이 그림은 그 문단의 구조입니다. 1장 문제가 고용량화의 두 축으로 갈라집니다. 첫째 축 신뢰성은 SSD 계층에서 닫히는 문제이고(위 트랙), 둘째 축 내구성은 SSD 밖 호스트가 잔여 변수 WAF를 결정하므로 역량·실행·보증으로 이어집니다(아래 트랙). 신뢰성 축의 감량 운영 정책은 6장 보증 조항으로 연결됩니다. 판돈은 락인으로 얻는 캐시 계층 QLC 점유율(2030년 350EB 중 175EB 조건부), 비용은 개발실 개발 자원이며 별도 투자는 없습니다."),
    (1, "AI 추론 수요는 QLC에 고용량·1~3 DWPD를 요구하며, 신뢰성·내구성 두 축의 해법이 필요합니다",
     "두 다운턴의 교훈은 요구를 고객 시스템 안에서 먼저 관측하라는 것이며, 그 요구가 대용량·높은 DWPD로 이동했습니다.", draw_s1,
     ("문제", "차기 요구는 고용량(다이 8배)과 1~3 DWPD이며, 동급 정격과 2~10배 격차가 있습니다", 2, 17),
     "1장은 문제 제기입니다. 상단 타임라인의 두 다운턴(DT19 −37.6%, DT23 −45%)에서 세 교훈을 얻습니다. 요구는 발주보다 약 2년 먼저 고객 규격·코드에 나타나고(2022-12 배치 표준 비준 → 2024년 30EB), 규격 정의에 참여한 공급자가 선점했으며(Solidigm 61TB 12개월 선행), 직전 다운턴의 결정이 다음 다운턴의 초기 조건이 됩니다(차기 전환점 2027H2). 가운데는 요구의 이동입니다. 구매 기준은 TB당 TCO에서 GPU당 컨텍스트·토큰당 비용으로, 용량은 61TB에서 245TB(다이 8배)로, 요구 DWPD는 0.3~0.6에서 1~3으로 옮겨갔습니다. 오른쪽은 격차의 정직한 크기입니다. 동급 61TB QLC 0.58~1.0, 245TB QLC 0.3과 TLC 1~3 사이는 2~10배이며 극단 조합만 40배입니다. 고용량화는 두 축의 문제를 만들고, 2장과 3장이 각각을 다룹니다."),
    (2, "첫째 축 신뢰성은 다이 수 8배 증가로 요구가 8배 엄격해지나, SSD 내부 설계로 충족됩니다",
     "요구 FFR ≤ 3%는 고정, SSD당 다이 수는 128 → 1,024. 호스트에는 관측 지표만 제공합니다.", draw_s2,
     ("결론", "늘어난 다이 수는 패리티·여분 다이·감량 운영으로 SSD 안에서 흡수합니다. DWPD는 SSD 안에서 미충족입니다", 3, 16),
     "2장은 신뢰성 축입니다. 왼쪽 픽토그램은 SSD당 다이 수가 128(2012 S3700 800GB)에서 1,024(2025 LC9 245TB)로 8배 늘었음을 보입니다. 요구 FFR ≤ 3%는 고정이므로 같은 FFR을 지키는 다이 고장률 상한은 2.4e-4에서 3.0e-5로 8배 엄격해집니다(독립 고장 모델). 오른쪽은 SSD 내부 해법입니다. 다이 패리티(XOR 스트라이프, Micron RAIN형)로 단일 다이 고장을 복구하고, 여분 다이·다이 은퇴·감량 운영(삼성 PM1733 Fail-in-Place)으로 고장 다이를 제외한 채 운영하며, 텔레메트리로 징후 다이를 사전 은퇴시킵니다. 호스트·플랫폼은 OCP SMART C0로 관측하고 감량을 수용할 뿐이며, 이 축은 호스트 협력 대상이 아닙니다. 둘째 축 DWPD는 SSD 안에서 충족되지 않았고, 어느 계층이 충족할 수 있는지가 3장입니다."),
    (3, "둘째 축 내구성은 SSD 단독 최적화로 WAF ≈3에 머물렀고, 잔여 변수 WAF는 호스트가 결정합니다",
     "요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층이 보상해 왔습니다.", draw_s3,
     ("결론", "잔여 변수 WAF는 SSD 밖 호스트가 결정하며, 병행 축과 결합하되 고객 협업과 새로운 역량을 요구합니다", 4, 16),
     "3장은 이관 사다리입니다. 1단계 컨트롤러 ECC(1비트/512B → LDPC 120비트/KB)는 RBER 100만 배 상승을 흡수해 UBER 요구를 충족했고 완결됐습니다. 2단계 SSD 단독 워크로드 최적화(2014~2019: 스트림·자동 배정·FTL 핫/콜드 추정·IO 결정성)는 QoS·성능은 개선했으나 데이터 수명을 SSD가 감지할 수 없어 WAF는 약 3에 머물렀습니다. 3단계 호스트 공동 설계는 호스트가 데이터 수명을 지정해 WAF를 약 3에서 약 1로 낮춥니다(범용 실측 3.0 → 1.0, CacheLib 3.22 → 1.03). KV 캐시 워크로드의 배치 표준 WAF는 공개 실측이 없어 검증할 가설이며 Phase 2가 그 검증입니다. 하단 산식에서 셀(P/E)·SSD(OP)·고객(보증연수)이 정하는 항을 빼면 남는 변수는 WAF뿐이고, 이는 호스트·앱이 결정합니다. 호스트 배치 하나로는 2~10배가 해소되지 않으므로 다이 세대·OP·SLC 캐시·보증연수·워크로드 재정의와 결합해야 하며, 호스트·고객 측 변수가 다수라는 점이 공동 설계의 근거입니다."),
    (4, "따라서 WAF 저감은 고객 시스템까지 3단계 공동 설계 역량을 요구하며, 삼성은 현재 1단계입니다",
     [("「승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져간다」", 18, False, K.INK), ("   신문섭 · Bain 파트너, 2026-06", 13.5, False, K.GRAY_2)], draw_s4,
     ("결론", "보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장되며, 삼성은 1단계 진행 중입니다", 5, 16),
     "4장은 역량입니다. 상단 네 격차(내구성 2~10배, 스트림 25배, 접점 0건, 해소 수단 실증)는 삼성이 KV 캐시 스택과 연결되지 않았음을 보입니다. 왼쪽 세 Phase는 디바이스 → 워크로드 실측 → 고객 시스템 공동 설계로 역량을 확장하며, 고객 보증 범위가 정격 내 원가·전력 → 워크로드 기준 수명 → 시스템 TCO로 넓어집니다. 삼성의 현 위치는 Phase 1 진행 중(QLC 라인 RUH 2~8, DWPD 미공개, CMX 첫 공급은 TLC), Phase 2 준비(트레이스 기반 실측 미공개), Phase 3 미착수(캐시 관리자 4종 기여 0건)입니다. 오른쪽 5계층은 삼성이 닿는 층을 색으로 표시했습니다. 트레이스는 위에서 아래로 내려오고 배치 정책·규격은 관리자·앱에서 SSD로 내려옵니다. 오케스트레이션 자체는 만들지 않습니다."),
    (5, "3단계 진입은 워크로드를 개방하는 고객에 FDE를 집중하고, 그 외는 업스트림·규격으로 협업합니다",
     [("「단 한 번도 고객 지향적인 적이 없었다. 진짜 고객 지향이 뭔지 이해하고, 그것을 위한 전략이 필요한 시점이 이미 됐다」", 18, False, K.INK), ("   송용호 · AX/PI센터장, 2026-09", 13.5, False, K.GRAY_2)], draw_s5,
     ("결론", "FDE는 워크로드를 개방하는 1~2사에 집중하고, 나머지는 업스트림·규격·레퍼런스 채널로 넓힙니다", 6, 17),
     "5장은 실행입니다. 가운데 두 화살표가 진입 수단입니다. ① FDE 상주는 삼성 엔지니어가 고객 시스템(캐시 관리자·I/O·커널)에 들어가는 트랙이며, 트레이스·정책 접근을 허용하고 캐시 관리자를 자체 운영하며 파급력이 있는 고객, 즉 AI 랩과 NVIDIA 생태계 1~2사에 집중합니다. 하이퍼스케일러는 내부 코드 상주가 어려워 업스트림·OCP 규격 채널로, 자체 캐시 스택이 없는 OEM·네오클라우드는 레퍼런스 스택으로 협업합니다. ② 워크로드·규격 접근권은 협약의 공동 설계 조항으로 확보하며 계약 시한은 공급 완화 전인 2027년 상반기입니다. 선례는 Palantir FDE(Anthropic·OpenAI가 GTM으로 채택)와 Micron↔Anthropic 협약(공동 설계·다년 공급·운영 통합)이며, 삼성·SK의 Anthropic 계약에는 공동 설계 조항이 없어 선제 제안합니다. 아래는 개발실 내부 실행(조직·인사·문화, 자회사·별도 보상 없음), 통과 조건(90일·12개월·2027H1), 판돈(캐시 계층 QLC 0 → 50%)과 비용(별도 투자 없음)입니다."),
    (6, "유효 DWPD 보증은 WAF 변동 리스크를 수반하므로 텔레메트리 기반 조건부 보증으로 설계합니다",
     "관행은 5년 또는 TBW·DWPD 선도달 보증입니다. 유효 DWPD는 WAF가 오르면 그대로 삼성의 보증 부담이 됩니다.", draw_s6,
     ("결론", "보증 기준은 TBW 선도달 관행을 유지하고, 유효 DWPD는 WAF 밴드별 조건부 등급으로만 표기합니다", None, 16),
     "6장은 수명 보증·SLA 리스크입니다. 왼쪽 차트는 유효 DWPD = 정격 × (3 ÷ WAF)입니다. 정격 0.58(61TB QLC)은 WAF 1.74에서 보증선 1.0 아래로 내려가고, 정격 0.3(245TB)은 WAF 1.0에서도 0.9에 그칩니다. WAF가 오르는 경우는 워크로드 변화, 오분류·RUH 간섭(FAST'26 WARP), 고객 스택 업데이트로 인한 힌트 손실입니다. 오른쪽 5원칙: 보증 기준은 관행대로 TBW·물리 매체 기록량 선도달로 두고 유효 DWPD는 부가 표기로만 쓰며, WAF 밴드(≤1.2 / ≤2.0 / >2.0)별 조건부 등급으로 표기하고, OCP SMART C0로 양측이 같은 WAF를 관측하며, 배치 규격 준수를 조건으로 하고, 초과가 지속되면 재협상·감량 운영(2장 FIP 유사)으로 대응합니다. 12개월 통과 조건의 조건부 보증 초안이 이 장의 산출물입니다."),
]

for page, (kicker, title, lead, draw, (blabel, bmain, bnext, bsize), note) in enumerate(SLIDES, 1):
    s = prs.slides.add_slide(BLANK)
    K.header(s, kicker, title, lead)
    if draw is draw_s5:
        draw(s)
    else:
        c = Canvas(s)
        draw(c)
        STATS[page] = c.chars
    band(s, blabel, bmain, next_step=bnext, size=bsize)
    K.footer(s, SRC, page)
    K.notes(s, note)

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides)}장) · 그림 영역 텍스트(장별): {STATS}")
