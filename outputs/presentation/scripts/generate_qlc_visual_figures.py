# -*- coding: utf-8 -*-
"""QLC eSSD 전략 덱 시각화 강화판(v1.0, 2026-09-20)의 히어로 그림 7종을 SVG로 작성하고 Chromium으로 PNG(3x) 렌더한다.

산출: outputs/presentation/assets/visual/qlc_vis_{s0..s6}.svg + .png
캔버스: 1842 × 625 단위(1 단위 = 슬라이드 1/100 in → 20in 캔버스에서 폭 18.42in × 6.25in 그림). PNG는 3배(5526 × 1875 px).
디자인 토큰: samsung-memory-ppt-design-skill (Samsung Blue #1428A0 단일 액센트, 잉크 #1A1A1A, 그레이 #555555, 괘선 #D9D9D9,
  틴트 #F4F6FC). 폰트: Noto Sans CJK KR (사외 폴백 규율). 그림 안 텍스트 최소 13px(축 눈금·타임라인) · 캡션 14px(≈10pt) · 본문 15~20px.
  적색(#D93025)은 리스크·고장 의미에만 쓴다.
그림 = 논리의 흐름: 좌→우 읽기 순서가 곧 논증 순서이며, 장 번호 원(●)과 화살표는 실제 흐름·방향이 있을 때만 쓴다.
수치는 덱 v5.2·보고서 v2.0과 동일(소스 §7~§10 F28~F54, qlc_model.csv). 새 수치 없음.
렌더: /opt/pw-browsers/chromium-*/chrome-linux/chrome --headless=new --screenshot (device-scale-factor 3, 뷰포트 여유 후 크롭).
"""
import glob
import html
import os
import subprocess

from PIL import Image, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "assets", "visual")
os.makedirs(OUT, exist_ok=True)

# ---- 토큰 ----
BLUE, BLUE_T1, BLUE_T2, BLUE_T3 = "#1428A0", "#3C5AC8", "#AAB8E8", "#DCE2F5"
INK, GRAY, GRAY_2, LINE, TINT, WHITE = "#1A1A1A", "#555555", "#8A8A8A", "#D9D9D9", "#F4F6FC", "#FFFFFF"
RED = "#D93025"
FONT = "Noto Sans CJK KR"
W, H = 1842, 625
MIN_SIZE = 13

_FT_R = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc", 100, index=1)
_FT_B = ImageFont.truetype("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc", 100, index=1)


def tw(s, size, bold=False):
    """텍스트 폭(단위) — 렌더 폰트 실측."""
    return (_FT_B if bold else _FT_R).getlength(s) * size / 100.0


def wrap(s, size, width, bold=False):
    """공백 기준 자동 줄바꿈 → 줄 리스트."""
    words, lines, cur = s.split(" "), [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if tw(t, size, bold) > width and cur:
            lines.append(cur)
            cur = wd
        else:
            cur = t
    lines.append(cur)
    return lines


def fmt(v):
    t = ("%.2f" % v).rstrip("0")
    return t + "0" if t.endswith(".") else t


class SVG:
    def __init__(self, w=W, h=H):
        self.w, self.h, self.parts = w, h, []
        self.chars = 0  # 텍스트 분량 집계(공백 제외)

    # -- 기본 도형 --
    def rect(self, x, y, w, h, fill="none", stroke=None, sw=1.0, r=0, dash=None, op=None):
        a = f'x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{fill}"'
        if r: a += f' rx="{r}"'
        if stroke: a += f' stroke="{stroke}" stroke-width="{sw}"'
        if dash: a += f' stroke-dasharray="{dash}"'
        if op is not None: a += f' opacity="{op}"'
        self.parts.append(f"<rect {a}/>")

    def circle(self, cx, cy, r, fill="none", stroke=None, sw=1.0, dash=None):
        a = f'cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="{fill}"'
        if stroke: a += f' stroke="{stroke}" stroke-width="{sw}"'
        if dash: a += f' stroke-dasharray="{dash}"'
        self.parts.append(f"<circle {a}/>")

    def line(self, x1, y1, x2, y2, stroke=GRAY_2, sw=1.5, dash=None, arrow=None, cap="round"):
        a = f'x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="{cap}"'
        if dash: a += f' stroke-dasharray="{dash}"'
        if arrow: a += f' marker-end="url(#arr-{arrow})"'
        self.parts.append(f"<line {a}/>")

    def path(self, d, stroke=GRAY_2, sw=1.5, fill="none", dash=None, arrow=None):
        a = f'd="{d}" stroke="{stroke}" stroke-width="{sw}" fill="{fill}" stroke-linecap="round" stroke-linejoin="round"'
        if dash: a += f' stroke-dasharray="{dash}"'
        if arrow: a += f' marker-end="url(#arr-{arrow})"'
        self.parts.append(f"<path {a}/>")

    def poly(self, pts, fill=BLUE, stroke=None, sw=1.0, op=None):
        p = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
        a = f'points="{p}" fill="{fill}"'
        if stroke: a += f' stroke="{stroke}" stroke-width="{sw}"'
        if op is not None: a += f' opacity="{op}"'
        self.parts.append(f"<polygon {a}/>")

    # -- 텍스트 --
    def text(self, x, y, s, size=18, bold=False, fill=INK, anchor="start", vmid=False, lh=1.25, family=FONT):
        """s: 문자열 또는 줄 리스트. vmid=True면 y가 첫 줄 세로 중앙."""
        size = max(size, MIN_SIZE)
        lines = s if isinstance(s, (list, tuple)) else [s]
        weight = 700 if bold else 400
        base = 'dominant-baseline="central"' if vmid else ''
        out = [f'<text x="{x:.1f}" y="{y:.1f}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{fill}" text-anchor="{anchor}" {base}>']
        for i, ln in enumerate(lines):
            dy = 0 if i == 0 else size * lh
            out.append(f'<tspan x="{x:.1f}" dy="{dy:.1f}">{html.escape(str(ln))}</tspan>')
            self.chars += len(str(ln).replace(" ", ""))
        out.append("</text>")
        self.parts.append("".join(out))

    def vtext(self, x, y, s, size=14, fill=GRAY):
        """세로(−90°) 텍스트, (x,y) 중심."""
        self.parts.append(f'<text transform="translate({x:.0f},{y:.0f}) rotate(-90)" font-family="{FONT}" font-size="{size}" fill="{fill}" text-anchor="middle" dominant-baseline="central">{html.escape(s)}</text>')
        self.chars += len(s.replace(" ", ""))

    def rich(self, x, y, runs, anchor="start", vmid=False):
        """한 줄 안에 굵기·색이 다른 런: runs=[(text,size,bold,fill)]."""
        base = 'dominant-baseline="central"' if vmid else ''
        total = sum(tw(t, sz, b) for t, sz, b, _ in runs)
        x0 = x - (total / 2 if anchor == "middle" else total if anchor == "end" else 0)
        out = [f'<text x="{x0:.1f}" y="{y:.1f}" font-family="{FONT}" {base}>']
        for t, sz, b, c in runs:
            out.append(f'<tspan font-size="{max(sz, MIN_SIZE)}" font-weight="{700 if b else 400}" fill="{c}">{html.escape(t)}</tspan>')
            self.chars += len(t.replace(" ", ""))
        out.append("</text>")
        self.parts.append("".join(out))

    # -- 복합 요소 --
    def chip(self, x, y, s, size=16, bold=True, fill=WHITE, stroke=LINE, color=INK, padx=12, h=None, r=3, dash=None):
        size = max(size, MIN_SIZE)
        w = tw(s, size, bold) + 2 * padx
        h = h or size * 1.7
        self.rect(x, y, w, h, fill=fill, stroke=stroke, sw=1.0, r=r, dash=dash)
        self.text(x + w / 2, y + h / 2, s, size=size, bold=bold, fill=color, anchor="middle", vmid=True)
        return w

    def num(self, cx, cy, n, r=15, fill=BLUE, color=WHITE, size=17, stroke=None):
        self.circle(cx, cy, r, fill=fill, stroke=stroke, sw=1.2)
        self.text(cx, cy + 0.5, str(n), size=size, bold=True, fill=color, anchor="middle", vmid=True)

    def panel(self, x, y, w, h, title=None, sub=None, hot=False, fill=WHITE):
        self.rect(x, y, w, h, fill=fill, stroke=BLUE if hot else LINE, sw=1.5 if hot else 1.0, r=4)
        if hot:
            self.rect(x, y, w, 6, fill=BLUE, r=0)
        if title:
            self.text(x + 18, y + 30, title, size=20, bold=True, fill=BLUE if hot else INK, vmid=True)
        if sub:
            self.text(x + 18 + tw(title or "", 20, True) + 12, y + 31, sub, size=14, fill=GRAY_2, vmid=True)

    def save(self, name):
        defs = ('<defs>'
                '<marker id="arr-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{BLUE}"/></marker>'
                '<marker id="arr-gray" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{GRAY_2}"/></marker>'
                '<marker id="arr-red" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{RED}"/></marker>'
                '<marker id="arr-t1" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{BLUE_T1}"/></marker>'
                '<marker id="arr-t2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
                f'<path d="M0,0 L10,5 L0,10 z" fill="{BLUE_T2}"/></marker>'
                '</defs>')
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">'
               f'{defs}<rect width="{self.w}" height="{self.h}" fill="{WHITE}"/>' + "".join(self.parts) + "</svg>")
        p = os.path.join(OUT, name + ".svg")
        with open(p, "w", encoding="utf-8") as f:
            f.write(svg)
        html_p = os.path.join(OUT, name + ".html")
        with open(html_p, "w", encoding="utf-8") as f:
            f.write(f'<!doctype html><html><head><meta charset="utf-8"><style>html,body{{margin:0;padding:0;background:#fff;overflow:hidden}}</style></head><body>{svg}</body></html>')
        return p, html_p


def render_png(html_p, png_p, w=W, h=H, scale=3):
    """headless=new 는 window-size 에서 브라우저 UI 높이를 뺀 뷰포트를 쓰므로, 여유를 두고 찍은 뒤 정확히 w×h(×scale)로 자른다."""
    chrome = sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"))[-1]
    cmd = [chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
           f"--force-device-scale-factor={scale}", f"--window-size={w + 40},{h + 160}", f"--screenshot={png_p}", "file://" + html_p]
    subprocess.run(cmd, check=True, capture_output=True)
    im = Image.open(png_p)
    im.crop((0, 0, w * scale, h * scale)).save(png_p, optimize=True)


# ====================================================================== S0. 스토리 맵 (요약)
def fig_s0():
    s = SVG()
    NW, NH = 300, 150
    x1, y1, w1 = 40, 235, 290          # 1 문제
    fx = 380                            # 분기점
    x2, y2 = 440, 48                    # 2 신뢰성 (위 트랙)
    x3, y3 = 440, 410                   # 3 내구성 (아래 트랙)
    x4, x5, x6 = 800, 1160, 1520
    w6 = W - x6 - 40

    def node(x, y, no, name, q, big, small, badge=None, badge_hot=True, w=NW, h=NH):
        s.rect(x, y, w, h, fill=TINT, stroke=BLUE, sw=1.5, r=6)
        s.rect(x, y, 8, h, fill=BLUE)
        s.num(x + 34, y + 30, no, r=15)
        s.text(x + 58, y + 30, name, size=20, bold=True, fill=INK, vmid=True)
        s.text(x + 58 + tw(name, 20, True) + 10, y + 31, q, size=14, fill=GRAY_2, vmid=True)
        s.text(x + 24, y + 76, big, size=32, bold=True, fill=BLUE, vmid=True)
        s.text(x + 24, y + 112, wrap(small, 14, w - 44), size=14, fill=GRAY, vmid=True, lh=1.25)
        if badge:
            bw = tw(badge, 13, True) + 20
            s.chip(x + w - bw - 14, y + 12, badge, size=13, bold=True, fill=BLUE if badge_hot else WHITE, stroke=BLUE, color=WHITE if badge_hot else BLUE, padx=10)

    node(x1, y1, 1, "문제", "", "2~10배", "요구 1~3 DWPD 대 동급 정격 격차 · 고용량화 → 두 축", w=w1)
    node(x2, y2, 2, "신뢰성", "", "다이 8배 ↑", "FFR 고정 · 패리티·여분 다이·감량 운영으로 충족", badge="충족")
    node(x3, y3, 3, "내구성", "", "WAF ≈3 → ≈1", "잔여 변수 WAF는 호스트가 결정 → 고객 협업", badge="미충족", badge_hot=False)
    node(x4, y3, 4, "역량", "", "3단계", "디바이스 → 워크로드 → 고객 시스템 · 삼성은 현재 1단계")
    node(x5, y3, 5, "실행", "", "FDE 1~2사", "워크로드 개방 고객 집중 · 나머지는 업스트림·규격")
    node(x6, y3, 6, "보증 · SLA", "", "조건부 유효 DWPD", "TBW 관행 유지 · WAF 밴드 조건부 등급", w=w6)

    # 흐름선 1 → 분기 → 2 / 3
    ym = y1 + NH / 2
    s.line(x1 + w1, ym, fx, ym, stroke=BLUE, sw=3)
    s.circle(fx, ym, 7, fill=BLUE)
    s.path(f"M{fx},{ym} L{fx},{y2 + NH / 2} L{x2 - 4},{y2 + NH / 2}", stroke=BLUE, sw=3, arrow="blue")
    s.path(f"M{fx},{ym} L{fx},{y3 + NH / 2} L{x3 - 4},{y3 + NH / 2}", stroke=BLUE, sw=3, arrow="blue")
    s.text(fx + 14, ym - 66, ["첫째 축", "SSD 안에서 해결"], size=14, fill=GRAY_2, lh=1.2)
    s.text(fx + 14, ym + 40, ["둘째 축", "SSD 밖에서 해결"], size=14, fill=GRAY_2, lh=1.2)
    s.text(x2, y2 - 22, "신뢰성 축 · SSD 계층", size=15, bold=True, fill=BLUE, vmid=True)
    s.text(x4, y3 - 22, "내구성 축 · 호스트 공동 설계 경로", size=15, bold=True, fill=BLUE, vmid=True)
    # 아래 트랙 3 → 4 → 5 → 6
    for xa, xb in [(x3 + NW, x4), (x4 + NW, x5), (x5 + NW, x6)]:
        s.line(xa, y3 + NH / 2, xb - 4, y3 + NH / 2, stroke=BLUE, sw=3, arrow="blue")
    # 2 → 6 점선(감량 운영 정책 → 보증 조항): 2의 하단에서 내려와 트랙 사이(y=300)를 지나 6 위로
    yl = 300
    s.path(f"M{x2 + NW - 40},{y2 + NH} L{x2 + NW - 40},{yl} L{x6 + w6 - 60},{yl} L{x6 + w6 - 60},{y3 - 6}", stroke=BLUE_T2, sw=2, dash="6 6", arrow="t2")
    s.text(x2 + NW - 20, yl - 12, "감량 운영 정책 → 6장 보증 조항", size=14, fill=GRAY, vmid=True)
    # 우상단: 판돈·비용 패널 (경로의 결과)
    px, py, pw, ph = x4, y2, W - 40 - x4, NH
    s.rect(px, py, pw, ph, fill=WHITE, stroke=LINE, r=6)
    s.text(px + 24, py + 30, "판돈과 비용", size=16, bold=True, fill=INK, vmid=True)
    s.text(px + 24 + tw("판돈과 비용", 16, True) + 12, py + 31, "5장", size=14, fill=GRAY_2, vmid=True)
    half = pw / 2
    s.text(px + 24, py + 62, "판돈 · 락인으로 얻는 캐시 계층 QLC 점유", size=14, fill=GRAY_2, vmid=True)
    s.text(px + 24, py + 100, "0 → 50%", size=32, bold=True, fill=BLUE, vmid=True)
    s.text(px + 24, py + 132, "2030년 350EB 중 175EB(조건부 상방)", size=14, fill=GRAY, vmid=True)
    s.line(px + half, py + 20, px + half, py + ph - 20, stroke=LINE, sw=1)
    s.text(px + half + 24, py + 62, "비용 · 개발실 개발 자원 투입", size=14, fill=GRAY_2, vmid=True)
    s.text(px + half + 24, py + 100, "별도 투자 없음", size=32, bold=True, fill=BLUE, vmid=True)
    s.text(px + half + 24, py + 132, "개발 자원 재배치 · 채용은 정원 내", size=14, fill=GRAY, vmid=True)
    return s


# ====================================================================== S1. 문제
def fig_s1():
    s = SVG()
    # --- 상단 타임라인 (좌 1000px 폭) ---
    TX0, TX1, TY = 60, 1020, 56
    def tx(year): return TX0 + (year - 2018) / 12.0 * (TX1 - TX0)
    s.rect(tx(2019), TY - 12, tx(2020) - tx(2019), 24, fill=BLUE_T3)
    s.rect(tx(2022.5), TY - 12, tx(2023.75) - tx(2022.5), 24, fill=BLUE_T3)
    s.line(TX0, TY, TX1, TY, stroke=GRAY_2, sw=1.5)
    for yr in range(2018, 2031, 2):
        s.line(tx(yr), TY - 4, tx(yr), TY + 4, stroke=GRAY_2, sw=1)
        s.text(tx(yr), TY + 20, str(yr), size=13, fill=GRAY_2, anchor="middle", vmid=True)
    s.text(tx(2019.5), TY - 24, "DT19 -37.6%", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    s.text(tx(2023.1), TY - 24, "DT23 -45%", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    marks = [(2022.95, "'22-12 표준 비준", False, 1), (2023.55, "'23-07 61TB 12개월 선행", False, 0), (2024.3, "'24 30EB", False, 1),
             (2026.4, "'26 KV 캐시 규격 미정의", True, 0), (2027.6, "'27H2 차기 전환점", True, 1)]
    for yr, lab, hot, row in marks:
        s.circle(tx(yr), TY, 6, fill=WHITE if hot else BLUE, stroke=BLUE, sw=2)
        s.text(tx(yr), TY + 40 + row * 18, lab, size=13, fill=BLUE if hot else GRAY, anchor="middle", vmid=True, bold=hot)

    # --- 교훈 3 (좌 패널) ---
    PX, PY, PW, PH = 40, 140, 470, 445
    s.panel(PX, PY, PW, PH, "교훈 · 두 다운턴", "2018~2023")
    rows = [("2년", "규격 · 코드가 발주에 선행", "", 3),
            ("12개월", "규격 정의 참여자가 선점", "", 5),
            ("2027H2", "직전 결정이 다음 초기 조건", "", 4)]
    ry = PY + 62
    for i, (big, l1, l2, nxt) in enumerate(rows):
        s.text(PX + 24, ry + 28, big, size=30, bold=True, fill=BLUE, vmid=True)
        s.text(PX + 190, ry + 30, l1, size=16, bold=True, fill=INK, vmid=True)
        s.num(PX + PW - 34, ry + 30, nxt, r=13, fill=BLUE_T2, color=INK, size=14)
        if i < 2: s.line(PX + 18, ry + 78, PX + PW - 18, ry + 78, stroke=LINE, sw=1)
        ry += 100

    # --- 요구의 이동 (중앙 패널) ---
    QX, QY, QW, QH = 550, 140, 560, 445
    s.panel(QX, QY, QW, QH, "지금 · 요구의 이동", "2024~2026")
    shifts = [("구매 기준", "TB당 TCO", "GPU당 컨텍스트 · 토큰당 비용"),
              ("드라이브 용량", "61TB", "245TB · 다이 8배 ↑"),
              ("요구 DWPD", "0.3~0.6", "1~3 · KV 캐시 계층 TLC 정격")]
    sy = QY + 58
    for lab, a, b in shifts:
        s.text(QX + 20, sy + 10, lab, size=14, fill=GRAY_2, vmid=True)
        bw_a, bh = 170, 56
        s.rect(QX + 20, sy + 24, bw_a, bh, fill=WHITE, stroke=LINE, r=3)
        s.text(QX + 20 + bw_a / 2, sy + 24 + bh / 2, a, size=20, bold=True, fill=GRAY, anchor="middle", vmid=True)
        s.line(QX + 20 + bw_a + 10, sy + 24 + bh / 2, QX + 20 + bw_a + 46, sy + 24 + bh / 2, stroke=BLUE, sw=3, arrow="blue")
        bx = QX + 20 + bw_a + 56
        s.rect(bx, sy + 24, QX + QW - 20 - bx, bh, fill=TINT, stroke=BLUE, sw=1.2, r=3)
        s.text(bx + 14, sy + 24 + bh / 2, b, size=18, bold=True, fill=BLUE, vmid=True)
        sy += 114

    # --- 격차 + 두 축 (우 패널) ---
    GX, GY, GW, GH = 1150, 140, 652, 445
    s.panel(GX, GY, GW, GH, "문제 · 격차와 두 축", "2027~2030", hot=True)
    cx0, cy0, cw, chh = GX + 30, GY + 66, 360, 160
    vmax = 3.2
    def vx(v): return cx0 + 130 + (cw - 130) * v / vmax
    s.rect(vx(1), cy0 - 6, vx(3) - vx(1), chh + 6, fill=BLUE_T3, op=0.7)
    s.text((vx(1) + vx(3)) / 2, cy0 - 20, "요구 1~3 DWPD", size=13, bold=True, fill=BLUE, anchor="middle", vmid=True)
    bars = [("LC9 245TB", 0.3, BLUE_T2), ("P5336 61TB", 0.58, BLUE_T1), ("6550 ION 61TB", 1.0, BLUE)]
    by = cy0 + 6
    for lab, v, col in bars:
        s.text(cx0, by + 13, lab, size=14, fill=INK, vmid=True)
        s.rect(vx(0), by + 1, vx(v) - vx(0), 24, fill=col, r=2)
        s.text(vx(v) + 8, by + 13, fmt(v), size=15, bold=True, fill=INK, vmid=True)
        by += 48
    for v in [0, 1, 2, 3]:
        s.text(vx(v), cy0 + chh + 12, str(v), size=13, fill=GRAY_2, anchor="middle", vmid=True)
    s.line(vx(0), cy0 - 6, vx(0), cy0 + chh, stroke=LINE, sw=1)
    s.text(cx0, cy0 + chh + 34, "정격 DWPD (동급 비교)", size=13, fill=GRAY_2, vmid=True)
    s.text(GX + 430, GY + 90, "2~10배", size=44, bold=True, fill=BLUE, vmid=True)
    s.text(GX + 430, GY + 132, ["동급 정격 대비", "(극단 조합 40배)"], size=14, fill=GRAY, vmid=True, lh=1.2)
    s.text(GX + 430, GY + 194, "350EB", size=30, bold=True, fill=BLUE, vmid=True)
    s.text(GX + 430, GY + 226, "2030 추론 캐시 수요(e)", size=13, fill=GRAY, vmid=True)
    # 두 축 분기
    fy = GY + 342
    s.rect(GX + 30, fy - 24, 150, 48, fill=BLUE, r=4)
    s.text(GX + 105, fy, "고용량화", size=18, bold=True, fill=WHITE, anchor="middle", vmid=True)
    bx0 = GX + 180
    for lab, tag, no, dy in [("다이 수 8배 ↑ → 신뢰성 축", "SSD 내부 해법", 2, -46), ("DWPD 격차 → 내구성 축", "어느 계층인가", 3, 46)]:
        yy = fy + dy
        s.path(f"M{bx0},{fy} L{bx0 + 30},{fy} L{bx0 + 30},{yy} L{bx0 + 56},{yy}", stroke=BLUE, sw=2.5, arrow="blue")
        s.rect(bx0 + 62, yy - 24, GW - 262, 48, fill=WHITE, stroke=BLUE, sw=1.2, r=4)
        s.num(bx0 + 88, yy, no, r=14, size=15)
        s.text(bx0 + 112, yy - 9, lab, size=16, bold=True, fill=INK, vmid=True)
        s.text(bx0 + 112, yy + 12, tag, size=13, fill=GRAY, vmid=True)
    return s


# ====================================================================== S2. 신뢰성
def fig_s2():
    s = SVG()
    PX, PY, PW, PH = 40, 24, 560, 580
    s.panel(PX, PY, PW, PH, "SSD당 NAND 다이 수", "요구 FFR ≤ 3%는 고정")
    def die_grid(x, y, cols, rows, cell, gap, fill):
        for r in range(rows):
            for c in range(cols):
                s.rect(x + c * (cell + gap), y + r * (cell + gap), cell, cell, fill=fill)
    gx1, gy1 = PX + 30, PY + 96
    g1w, g1h = 16 * 11.5 - 2.5, 8 * 11.5 - 2.5
    die_grid(gx1, gy1, 16, 8, 9, 2.5, BLUE_T2)
    s.rect(gx1 - 8, gy1 - 8, g1w + 16, g1h + 16, fill="none", stroke=GRAY_2, sw=1, r=3)
    s.text(gx1, gy1 - 26, "2012 · S3700 800GB", size=13, fill=GRAY_2, vmid=True)
    s.text(gx1, gy1 + g1h + 30, "128", size=26, bold=True, fill=INK, vmid=True)
    gx2, gy2 = PX + 260, PY + 96
    g2 = 32 * 9.0 - 1.8
    die_grid(gx2, gy2, 32, 32, 7.2, 1.8, BLUE)
    s.rect(gx2 - 8, gy2 - 8, g2 + 16, g2 + 16, fill="none", stroke=BLUE, sw=1.2, r=3)
    s.text(gx2, gy2 - 26, "2025 · LC9 245TB · 2Tb 다이", size=13, fill=GRAY_2, vmid=True)
    s.text(gx2 + g2, gy2 + g2 + 32, "1,024", size=26, bold=True, fill=BLUE, anchor="end", vmid=True)
    s.line(gx1 + g1w + 22, gy1 + 46, gx2 - 22, gy1 + 46, stroke=BLUE, sw=3, arrow="blue")
    s.text((gx1 + g1w + 22 + gx2 - 22) / 2, gy1 + 26, "8배", size=18, bold=True, fill=BLUE, anchor="middle", vmid=True)
    yy = PY + 456
    s.text(PX + 30, yy, "다이 고장률 상한 (같은 FFR, 독립 고장 모델)", size=14, fill=GRAY_2, vmid=True)
    s.rich(PX + 30, yy + 44, [("2.4e-4", 30, True, GRAY), ("  →  ", 22, False, GRAY_2), ("3.0e-5", 30, True, BLUE), ("   8배 엄격", 18, True, BLUE)], vmid=True)
    s.text(PX + 30, yy + 90, "다이 고장률 개선은 한계 → 해법은 SSD 계층", size=14, fill=GRAY, vmid=True)

    MX_, MY, MW, MH = 640, 24, 1162, 580
    s.panel(MX_, MY, MW, MH, "SSD 내부 해법 3", "다이 고장을 SSD 안에서 흡수 · 호스트에는 관측 지표만", hot=True)
    hx, hy, hw, hh = MX_ + 60, MY + 60, MW - 120, 54
    s.rect(hx, hy, hw, hh, fill=WHITE, stroke=BLUE, sw=1.2, r=4, dash="7 5")
    s.text(hx + 20, hy + hh / 2, "호스트 · 플랫폼", size=18, bold=True, fill=GRAY, vmid=True)
    s.text(hx + 200, hy + hh / 2, "관측 · 수용만 · OCP SMART C0 · Hyrax형 감량 수용", size=14, fill=GRAY, vmid=True)
    sx, sy_, sw_, sh_ = MX_ + 60, MY + 160, MW - 120, 340
    s.rect(sx, sy_, sw_, sh_, fill=TINT, stroke=BLUE, sw=1.5, r=6)
    s.text(sx + 20, sy_ + 26, "SSD (컨트롤러 · 펌웨어)", size=18, bold=True, fill=BLUE, vmid=True)
    ax_ = sx + sw_ - 120
    s.line(ax_, sy_ - 4, ax_, hy + hh + 6, stroke=BLUE_T1, sw=2.5, arrow="t1")
    s.text(ax_ - 12, (sy_ + hy + hh) / 2, "텔레메트리 · 감량 예고", size=13, fill=BLUE_T1, anchor="end", vmid=True)
    dy0 = sy_ + 104
    cell, gap = 54, 14
    dx0 = sx + 30
    for i in range(8):
        x = dx0 + i * (cell + gap)
        failed = i == 4
        s.rect(x, dy0, cell, cell, fill=WHITE if not failed else "#FBE9E7", stroke=GRAY_2 if not failed else RED, sw=1.2, r=3)
        s.text(x + cell / 2, dy0 + cell / 2, f"D{i + 1}", size=14, fill=GRAY if not failed else RED, anchor="middle", vmid=True, bold=failed)
        if failed:
            s.line(x + 12, dy0 + 12, x + cell - 12, dy0 + cell - 12, stroke=RED, sw=2)
            s.line(x + cell - 12, dy0 + 12, x + 12, dy0 + cell - 12, stroke=RED, sw=2)
    px_ = dx0 + 8 * (cell + gap) + 30
    s.rect(px_, dy0, cell, cell, fill=BLUE, r=3)
    s.text(px_ + cell / 2, dy0 + cell / 2, "P", size=18, bold=True, fill=WHITE, anchor="middle", vmid=True)
    for k in range(2):
        x = px_ + (cell + gap) * (k + 1) + 30
        s.rect(x, dy0, cell, cell, fill=WHITE, stroke=BLUE, sw=1.2, r=3, dash="5 4")
        s.text(x + cell / 2, dy0 + cell / 2, "S", size=16, bold=True, fill=BLUE, anchor="middle", vmid=True)
    bx1, bx2 = dx0, px_ + cell
    s.path(f"M{bx1},{dy0 - 12} L{bx1},{dy0 - 20} L{bx2},{dy0 - 20} L{bx2},{dy0 - 12}", stroke=BLUE, sw=1.5)
    s.text((bx1 + bx2) / 2, dy0 - 32, "① 다이 패리티 · XOR 스트라이프 (Micron RAIN형)", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    fx_ = dx0 + 4 * (cell + gap) + cell / 2
    sx1 = px_ + (cell + gap) + 30 + cell / 2
    s.path(f"M{fx_},{dy0 + cell + 6} L{fx_},{dy0 + cell + 34} L{sx1},{dy0 + cell + 34} L{sx1},{dy0 + cell + 10}", stroke=BLUE, sw=2, arrow="blue")
    s.text((fx_ + sx1) / 2, dy0 + cell + 52, "② 여분 다이 · 은퇴 · 감량 운영 (삼성 PM1733 FIP)", size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
    ty = dy0 + cell + 90
    s.text(dx0, ty, "③ 텔레메트리 · 사전 예측", size=14, bold=True, fill=BLUE, vmid=True)
    s.text(dx0 + 230, ty, "RBER 추이 · XOR 복구 횟수 → 징후 다이 사전 은퇴", size=14, fill=GRAY, vmid=True)
    spx, spy, spw, sph = dx0, ty + 24, 380, 46
    s.line(spx, spy + sph, spx + spw, spy + sph, stroke=LINE, sw=1)
    pts = [(spx + i * spw / 10, spy + sph - 6 - (i ** 1.9) * 0.44) for i in range(11)]
    s.path("M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts), stroke=BLUE_T1, sw=2)
    s.line(spx, spy + 8, spx + spw, spy + 8, stroke=RED, sw=1, dash="4 4")
    s.text(spx + spw + 10, spy + 8, "은퇴 임계", size=13, fill=RED, vmid=True)
    s.circle(pts[8][0], pts[8][1], 5, fill=BLUE)
    s.text(pts[8][0] - 10, spy - 3, "사전 은퇴 →", size=13, fill=BLUE, anchor="end", vmid=True)
    s.text(spx + spw + 10, spy + sph - 4, "RBER 추이", size=13, fill=GRAY_2, vmid=True)
    s.chip(sx + sw_ - 300, sy_ + sh_ - 48, "SSD 고장률 p → p² 차수 · FFR 여유", size=14, bold=True, fill=BLUE, stroke=BLUE, color=WHITE, padx=14)
    return s


# ====================================================================== S3. 내구성 · 해법 사다리
def fig_s3():
    s = SVG()
    s.text(40, 26, "요구 (고정)", size=14, fill=GRAY_2, vmid=True)
    s.rich(150, 26, [("DWPD 1~3", 18, True, BLUE), ("  ·  UBER 10⁻¹⁵ / 10⁻¹⁶", 16, False, GRAY)], vmid=True)
    s.line(40, 46, 1230, 46, stroke=BLUE, sw=2, dash="8 6")
    steps = [
        (1, "컨트롤러 ECC", "1991~", "완결", "1 bit/512B → LDPC 120 bit/KB", "RBER 10⁶배 ↑ → 60배 ECC로 흡수 → UBER 충족", BLUE_T2, "컨트롤러"),
        (2, "SSD 단독 최적화", "2014~2019", "부분 성공", "WAF ≈ 3 유지", "스트림 · 자동 배정 · FTL 추정 · IO 결정성 → QoS·성능 개선, 수명 감지 불가", BLUE_T1, "SSD 안"),
        (3, "호스트 공동 설계", "2022~", "조건부", "WAF ≈3 → ≈1 · 유효 DWPD ×2.9", "호스트가 수명 지정 · KV 캐시 실측은 Phase 2", BLUE, "호스트"),
    ]
    sx0, base_y = 40, 470
    step_w, step_gap = 385, 18
    heights = [150, 260, 390]
    for i, (no, name, era, res, metric, desc, col, who) in enumerate(steps):
        x = sx0 + i * (step_w + step_gap)
        h = heights[i]
        y = base_y - h
        hot = i == 2
        s.rect(x, y, step_w, h, fill=TINT if hot else WHITE, stroke=BLUE if hot else LINE, sw=1.5 if hot else 1, r=4)
        s.rect(x, y, step_w, 8, fill=col)
        s.num(x + 30, y + 40, no, r=15, fill=col, color=WHITE if col != BLUE_T2 else INK)
        s.text(x + 54, y + 40, f"{no}단계 · {name}", size=17, bold=True, fill=INK, vmid=True)
        s.text(x + 54, y + 64, f"{era} · {who}", size=13, fill=GRAY_2, vmid=True)
        badge_fill = {"완결": BLUE_T2, "부분 성공": WHITE, "조건부": BLUE}[res]
        badge_col = {"완결": INK, "부분 성공": BLUE_T1, "조건부": WHITE}[res]
        bw = tw(res, 13, True) + 22
        s.rect(x + step_w - bw - 16, y + 27, bw, 26, fill=badge_fill, stroke=BLUE_T1 if res == "부분 성공" else badge_fill, r=13)
        s.text(x + step_w - bw / 2 - 16, y + 40, res, size=13, bold=True, fill=badge_col, anchor="middle", vmid=True)
        s.text(x + 30, y + 104, metric, size=20, bold=True, fill=BLUE if hot else INK, vmid=True)
        s.text(x + 30, y + 134, wrap(desc, 14, step_w - 60), size=14, fill=GRAY, vmid=True, lh=1.3)
        if i < 2:
            nx = x + step_w + step_gap
            ny = base_y - heights[i + 1]
            s.path(f"M{x + step_w - 40},{y - 10} L{x + step_w - 40},{ny - 22} L{nx + 20},{ny - 22} L{nx + 20},{ny - 8}", stroke=BLUE, sw=2, arrow="blue")
    s.line(sx0, base_y, sx0 + 3 * step_w + 2 * step_gap, base_y, stroke=GRAY_2, sw=1.5)
    # 산식 스트립
    fy = 528
    terms = [("DWPD", "요구 · 고객", WHITE, INK, LINE), ("=", None, None, None, None), ("P/E", "셀", WHITE, INK, LINE), ("×", None, None, None, None),
             ("1 + OP", "SSD", WHITE, INK, LINE), ("÷", None, None, None, None), ("WAF", "호스트 · 앱", BLUE, WHITE, BLUE), ("÷", None, None, None, None),
             ("365 × 년", "고객 · 보증연수", WHITE, INK, LINE)]
    x = 40
    for t, who, fill, col, stroke in terms:
        if who is None:
            s.text(x + 16, fy + 22, t, size=22, fill=GRAY_2, anchor="middle", vmid=True); x += 34; continue
        w_ = max(tw(t, 20, True) + 30, 118)
        s.rect(x, fy, w_, 44, fill=fill, stroke=stroke, sw=1.2, r=4)
        s.text(x + w_ / 2, fy + 22, t, size=20, bold=True, fill=col, anchor="middle", vmid=True)
        s.text(x + w_ / 2, fy + 62, who, size=13, fill=BLUE if fill == BLUE else GRAY_2, anchor="middle", vmid=True, bold=fill == BLUE)
        x += w_ + 6
    s.chip(x + 24, fy + 6, "잔여 변수 = WAF", size=15, bold=True, fill=BLUE, stroke=BLUE, color=WHITE, padx=14)

    RX, RY, RW, RH = 1270, 20, 532, 585
    s.panel(RX, RY, RW, RH, "WAF 실증 · 호스트 배치", "≈3 → ≈1", hot=True)
    groups = [("범용 랜덤", 3.0, 1.0, False), ("CacheLib", 3.22, 1.03, False), ("KV 캐시", None, None, True)]
    gx, gy, gw, gh = RX + 40, RY + 70, RW - 80, 200
    vmax = 3.6
    def vy(v): return gy + gh - gh * v / vmax
    s.line(gx, gy + gh, gx + gw, gy + gh, stroke=LINE, sw=1)
    bw_, colw = 44, gw / 3
    for k, (lab, a, b, hyp) in enumerate(groups):
        cx = gx + colw * k + colw / 2
        if not hyp:
            s.rect(cx - bw_ - 4, vy(a), bw_, gy + gh - vy(a), fill=BLUE_T2, r=2)
            s.text(cx - bw_ / 2 - 4, vy(a) - 12, fmt(a), size=14, bold=True, fill=INK, anchor="middle", vmid=True)
            s.rect(cx + 4, vy(b), bw_, gy + gh - vy(b), fill=BLUE, r=2)
            s.text(cx + 4 + bw_ / 2, vy(b) - 12, fmt(b), size=14, bold=True, fill=BLUE, anchor="middle", vmid=True)
        else:
            s.rect(cx - bw_ - 4, vy(3.0), bw_, gy + gh - vy(3.0), fill="none", stroke=GRAY_2, sw=1.2, dash="5 4", r=2)
            s.rect(cx + 4, vy(1.0), bw_, gy + gh - vy(1.0), fill="none", stroke=BLUE, sw=1.2, dash="5 4", r=2)
            s.text(cx, vy(3.0) - 14, "미실측 · 가설", size=13, bold=True, fill=BLUE, anchor="middle", vmid=True)
        s.text(cx, gy + gh + 18, lab, size=14, fill=INK, anchor="middle", vmid=True)
    s.text(gx, gy - 12, "WAF", size=13, fill=GRAY_2, vmid=True)
    s.rich(gx, gy + gh + 46, [("■", 14, False, BLUE_T2), (" SSD 단독   ", 13, False, GRAY), ("■", 14, False, BLUE), (" 호스트 배치", 13, False, GRAY)], vmid=True)
    ly = RY + 336
    s.text(RX + 40, ly, "격차 축소 변수 · 모두 병행 중", size=14, bold=True, fill=INK, vmid=True)
    levers = [("다이 세대 · P/E", False), ("OP", False), ("SLC 캐시 · 쓰기 정형", False), ("보증연수 · TBW", False), ("워크로드 재정의", False), ("호스트 배치 · WAF", True)]
    cx_, cy_ = RX + 40, ly + 22
    for lab, hot in levers:
        w_ = tw(lab, 14, True) + 24
        if cx_ + w_ > RX + RW - 30:
            cx_ = RX + 40; cy_ += 40
        s.chip(cx_, cy_, lab, size=14, bold=True, fill=BLUE if hot else WHITE, stroke=BLUE if hot else LINE, color=WHITE if hot else INK, padx=12)
        cx_ += w_ + 8
    s.text(RX + 40, cy_ + 66, ["호스트 배치 하나로는 2~10배 미해소 → 다른 변수와 결합"], size=14, fill=GRAY, vmid=True, lh=1.3)
    return s


# ====================================================================== S4. 역량
def fig_s4():
    s = SVG()
    gaps = [("2~10배", "내구성 격차"), ("25배", "스트림 격차 · RUH 2~8 vs 200+"), ("0건", "접점 부재 · 캐시 관리자 코드"), ("≈3 → ≈1", "해소 수단 · KV 캐시 미실측")]
    bw = (W - 80 - 3 * 18) / 4
    for i, (big, lab) in enumerate(gaps):
        x = 40 + i * (bw + 18)
        hot = i == 3
        s.rect(x, 16, bw, 64, fill=TINT if hot else WHITE, stroke=BLUE if hot else LINE, sw=1.2 if hot else 1, r=4)
        s.text(x + 18, 48, big, size=26, bold=True, fill=BLUE, vmid=True)
        s.text(x + 18 + tw(big, 26, True) + 16, 49, lab, size=14, fill=GRAY, vmid=True)

    LX, LY, LW = 1030, 108, 700
    layers = [("응용 · 추론 엔진", "vLLM · SGLang · TRT-LLM"),
              ("KV 캐시 관리자", "KVBM · LMCache · Mooncake"),
              ("전송 · I/O 라이브러리", "NIXL · GDS · xNVMe"),
              ("커널 · 플랫폼", "write streams · XFS · CMX"),
              ("SSD", "RUH · 2Tb QLC · 텔레메트리")]
    lh = 78
    s.text(LX, LY - 14, "고객 시스템 5계층", size=14, fill=GRAY_2, vmid=True)
    for i, (nm, ex) in enumerate(layers):
        y = LY + i * (lh + 10)
        reach = {0: 3, 1: 3, 2: 2, 3: 2, 4: 1}[i]
        fill = {1: BLUE, 2: BLUE_T1, 3: BLUE_T2}[reach]
        s.rect(LX, y, LW, lh, fill=WHITE, stroke=LINE, r=4)
        s.rect(LX, y, 10, lh, fill=fill)
        s.text(LX + 26, y + 28, nm, size=17, bold=True, fill=INK, vmid=True)
        s.text(LX + 26, y + 54, ex, size=13, fill=GRAY, vmid=True)
        s.chip(LX + LW - 120, y + 24, f"Phase {reach}", size=13, bold=True, fill=fill, stroke=fill, color=WHITE if reach != 3 else INK, padx=10)
    ax = LX + LW + 34
    ytop, ybot = LY + 8, LY + 5 * lh + 40 - 8
    s.line(ax, ytop, ax, (ytop + ybot) / 2 - 8, stroke=BLUE_T1, sw=2.5, arrow="t1")
    s.text(ax + 10, ytop + 40, ["트레이스", "수집 ↓"], size=13, fill=BLUE_T1, lh=1.2, vmid=True)
    s.line(ax, ybot, ax, (ytop + ybot) / 2 + 8, stroke=BLUE, sw=2.5, arrow="blue")
    s.text(ax + 10, ybot - 56, ["배치 정책", "규격 ↑"], size=13, fill=BLUE, lh=1.2, vmid=True)

    PX, PY, PW = 40, 108, 950
    phases = [(1, "디바이스", "배치 표준 SSD를 잘 만든다", "RUH 200+ · 2Tb QLC · CMX/STX", "정격 내 원가 · 전력", 0.60, "진행 중", "QLC 라인 RUH 2~8 · DWPD 미공개 · CMX 첫 공급은 TLC"),
              (2, "워크로드 최적화", "고객 워크로드 실측으로 그 SSD를 최적화", "트레이스 재현 · RUH 정책 · 실측", "워크로드 기준 수명", 0.15, "준비", "KV 백서 2종 · 트레이스 기반 실측 미공개"),
              (3, "고객 시스템 공동 설계", "추론 스택 안에서 함께 설계", "관리자 플러그인 · 커널 I/O · TCO", "시스템 TCO", 0.0, "미착수", "캐시 관리자 4종 기여 0건")]
    ph = 140
    for i, (no, nm, defi, cap, guar, prog, st, why) in enumerate(phases):
        y = PY + i * (ph + 14)
        hot = i == 0
        s.rect(PX, y, PW, ph, fill=WHITE, stroke=BLUE if hot else LINE, sw=1.5 if hot else 1, r=4)
        s.num(PX + 32, y + 32, no, r=16, fill={1: BLUE, 2: BLUE_T1, 3: BLUE_T2}[no], color=WHITE if no != 3 else INK, size=17)
        s.text(PX + 58, y + 32, f"Phase {no} · {nm}", size=19, bold=True, fill=INK, vmid=True)
        s.text(PX + 58, y + 62, cap, size=14, fill=GRAY, vmid=True)
        s.chip(PX + PW - 250, y + 16, "보증 · " + guar, size=13, bold=True, fill=TINT, stroke=BLUE_T2, color=BLUE, padx=10)
        bx, by, bw_, bh_ = PX + 58, y + 88, PW - 330, 18
        s.rect(bx, by, bw_, bh_, fill=BLUE_T3, r=3)
        if prog > 0:
            s.rect(bx, by, bw_ * prog, bh_, fill=BLUE, r=3)
        s.text(bx + bw_ + 14, by + bh_ / 2, st, size=15, bold=True, fill=BLUE if prog > 0 else GRAY_2, vmid=True)
        s.text(PX + 58, y + 120, why, size=13, fill=GRAY_2, vmid=True)
    mx = PX + 58 + (PW - 330) * 0.60
    s.poly([(mx - 9, PY + 88 + 18 + 4), (mx + 9, PY + 88 + 18 + 4), (mx, PY + 88 + 18 - 6)], fill=BLUE)
    s.text(mx + 14, PY + 88 + 18 + 12, "삼성 현 위치", size=13, bold=True, fill=BLUE, vmid=True)
    return s


# ====================================================================== S5. 실행
def fig_s5():
    s = SVG()
    PX, PY, PW, PH = 40, 20, 900, 585
    s.panel(PX, PY, PW, PH, "고객 선별 · 어디에 FDE를 두나", "FDE 상주 조건: 트레이스·정책 접근 · 관리자 자체 운영 · 파급력")
    ax0, ay0, aw, ah = PX + 90, PY + 70, PW - 130, PH - 150
    s.rect(ax0 + aw * 0.55, ay0, aw * 0.45, ah, fill=TINT)
    s.text(ax0 + aw - 16, ay0 + ah - 18, "FDE 집중 영역", size=15, bold=True, fill=BLUE, anchor="end", vmid=True)
    s.line(ax0, ay0 + ah, ax0 + aw, ay0 + ah, stroke=GRAY_2, sw=1.5, arrow="gray")
    s.line(ax0, ay0 + ah, ax0, ay0, stroke=GRAY_2, sw=1.5, arrow="gray")
    s.text(ax0 + aw / 2, ay0 + ah + 24, "워크로드 개방 →", size=14, fill=GRAY, anchor="middle", vmid=True)
    s.vtext(ax0 - 22, ay0 + ah / 2, "물량 · 규격 파급력 →", size=14, fill=GRAY)
    def bubble(fx, fy, r, name, sub, way, hot):
        cx, cy = ax0 + aw * fx, ay0 + ah * (1 - fy)
        s.circle(cx, cy, r, fill=BLUE if hot else WHITE, stroke=BLUE if hot else BLUE_T1, sw=2)
        s.text(cx, cy - 8, name, size=17, bold=True, fill=WHITE if hot else INK, anchor="middle", vmid=True)
        s.text(cx, cy + 14, sub, size=13, fill=WHITE if hot else GRAY, anchor="middle", vmid=True)
        s.chip(cx - tw(way, 13, True) / 2 - 10, cy + r + 8, way, size=13, bold=True, fill=BLUE if hot else WHITE, stroke=BLUE, color=WHITE if hot else BLUE, padx=10)
    bubble(0.80, 0.80, 64, "AI 랩", "Anthropic · OpenAI", "FDE 상주 Pod 3~5명", True)
    bubble(0.66, 0.46, 60, "NVIDIA 생태계", "CMX · KVBM · NIXL", "FDE 플랫폼 팀 파견", True)
    bubble(0.22, 0.80, 76, "하이퍼스케일러", "Meta · Google · MS · AWS", "업스트림 · OCP 규격", False)
    bubble(0.22, 0.34, 72, "OEM · 네오클라우드", "자체 캐시 스택 없음", "레퍼런스 스택", False)

    RX, RY, RW = 980, 20, 822
    s.panel(RX, RY, RW, 208, "개발실 내부 실행", "별도 투자 없이 개발 자원 재배치")
    axes = [("조직", "시스템 SW 조직 · 개발실 소속 Pod 3~5명"),
            ("인사", "고객 코드를 다루는 전문가 채용·양성 · 상주 로테이션"),
            ("문화", "메인테이너 배출 · KV 캐시 실측 최초 공개")]
    for i, (k, v) in enumerate(axes):
        y = RY + 56 + i * 46
        s.rect(RX + 20, y, 64, 34, fill=BLUE, r=3)
        s.text(RX + 52, y + 17, k, size=15, bold=True, fill=WHITE, anchor="middle", vmid=True)
        s.text(RX + 98, y + 17, v, size=14, fill=INK, vmid=True)
    GY = RY + 232
    s.panel(RX, GY, RW, 200, "단계별 통과 조건", "각 단계의 증명이 다음 단계의 승인 근거")
    gates = [("90일", ["트레이스 확보 · 실측 공개 · 플러그인 PR"]),
             ("12개월", ["메인라인 머지 · 유효 DWPD ≥ 1 실증"]),
             ("2027H1", ["디자인인 1사 · 공동 설계 조항 · 레퍼런스 공개"])]
    gx, gy_ = RX + 40, GY + 70
    gw_ = (RW - 80) / 3
    s.line(gx, gy_ + 14, gx + (RW - 80), gy_ + 14, stroke=BLUE_T2, sw=3)
    for i, (t, lines) in enumerate(gates):
        x = gx + i * gw_
        hot = i == 2
        s.poly([(x + 14, gy_), (x + 28, gy_ + 14), (x + 14, gy_ + 28), (x, gy_ + 14)], fill=BLUE if hot else WHITE, stroke=BLUE, sw=2)
        s.text(x + 40, gy_ + 14, t, size=18, bold=True, fill=BLUE, vmid=True)
        s.text(x, gy_ + 52, lines, size=13, fill=GRAY, vmid=True, lh=1.3)
    SY = GY + 224
    s.rect(RX, SY, RW, 605 - SY, fill=TINT, stroke=BLUE_T2, r=4)
    s.rect(RX, SY, 8, 605 - SY, fill=BLUE)
    half = RW / 2
    s.text(RX + 30, SY + 26, "판돈 · 락인으로 얻는 점유율", size=13, fill=GRAY_2, vmid=True)
    s.text(RX + 30, SY + 66, "캐시 계층 QLC 0 → 50%", size=26, bold=True, fill=BLUE, vmid=True)
    s.text(RX + 30, SY + 104, "2030 350EB 중 175EB(조건부)", size=13, fill=GRAY, vmid=True)
    s.line(RX + half + 10, SY + 16, RX + half + 10, 605 - 16, stroke=LINE, sw=1)
    s.text(RX + half + 30, SY + 26, "비용 · 개발실 자원 투입", size=13, fill=GRAY_2, vmid=True)
    s.text(RX + half + 30, SY + 66, "별도 투자 없음", size=26, bold=True, fill=BLUE, vmid=True)
    s.text(RX + half + 30, SY + 104, "Pod 3~5명 × 1~2사 재배치", size=13, fill=GRAY, vmid=True)
    return s


# ====================================================================== S6. 보증 · SLA
def fig_s6():
    s = SVG()
    PX, PY, PW, PH = 40, 20, 1000, 585
    s.panel(PX, PY, PW, PH, "유효 DWPD = 정격 × (3 ÷ WAF)", "정격은 WAF ≈3(랜덤 4KB) 기준")
    ax0, ay0, aw, ah = PX + 70, PY + 104, PW - 330, PH - 216
    wmin, wmax, dmax = 1.0, 3.2, 3.2
    def X(w): return ax0 + aw * (w - wmin) / (wmax - wmin)
    def Y(d): return ay0 + ah * (1 - d / dmax)
    bands = [(1.0, 1.2, "WAF ≤ 1.2 · 설계 가정"), (1.2, 2.0, "≤ 2.0 · 조건부 등급"), (2.0, 3.2, "> 2.0 · 정격 기준 복귀")]
    for i, (a, b, lab) in enumerate(bands):
        s.rect(X(a), ay0, X(b) - X(a), ah, fill=[TINT, WHITE, "#F7F7F7"][i])
        s.text(X(a) if i == 0 else X(a) + (X(b) - X(a)) * (0.67 if i == 1 else 0.5), ay0 - 16, lab, size=13, bold=True, fill=BLUE if i == 0 else GRAY_2, anchor="start" if i == 0 else "middle", vmid=True)
        if i: s.line(X(a), ay0, X(a), ay0 + ah, stroke=LINE, sw=1, dash="4 4")
    s.line(ax0, ay0 + ah, ax0 + aw, ay0 + ah, stroke=GRAY_2, sw=1.2)
    s.line(ax0, ay0, ax0, ay0 + ah, stroke=GRAY_2, sw=1.2)
    for w_ in [1.0, 1.5, 2.0, 2.5, 3.0]:
        s.text(X(w_), ay0 + ah + 18, f"{w_:g}", size=13, fill=GRAY_2, anchor="middle", vmid=True)
    for d in [0, 1, 2, 3]:
        s.text(ax0 - 12, Y(d), str(d), size=13, fill=GRAY_2, anchor="end", vmid=True)
        s.line(ax0, Y(d), ax0 + aw, Y(d), stroke=LINE, sw=0.6)
    s.text(ax0 + aw / 2, ay0 + ah + 44, "실 워크로드 WAF", size=14, fill=GRAY, anchor="middle", vmid=True)
    s.vtext(ax0 - 44, ay0 + ah / 2, "유효 DWPD", size=14, fill=GRAY)
    curves = [(1.0, BLUE, "정격 1.0 · 6550 ION 61TB"), (0.58, BLUE_T1, "정격 0.58 · P5336 61TB"), (0.3, BLUE_T2, "정격 0.3 · LC9 245TB")]
    for rated, col, lab in curves:
        pts = []
        for i in range(61):
            w_ = wmin + (wmax - wmin) * i / 60
            pts.append((X(w_), Y(min(rated * 3.0 / w_, dmax))))
        s.path("M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts), stroke=col, sw=3)
        s.text(X(wmax) + 10, pts[-1][1] + (16 if rated == 1.0 else 0), lab, size=13, fill=col, vmid=True, bold=True)
    s.line(ax0, Y(1.0), ax0 + aw, Y(1.0), stroke=INK, sw=1.5, dash="8 6")
    s.text(X(2.35), Y(1.0) + 15, "보증 목표 1.0 DWPD · KV 캐시 계층 하한", size=13, bold=True, fill=INK, vmid=True)
    s.circle(X(1.74), Y(1.0), 7, fill=BLUE_T1)
    s.text(ax0 + aw, ay0 + ah + 44, "● 정격 0.58은 WAF 1.74에서 보증선 아래로", size=13, fill=BLUE_T1, anchor="end", vmid=True)
    s.line(X(1.28), ay0 + 44, X(2.9), ay0 + 44, stroke=RED, sw=2, dash="6 4", arrow="red")
    s.text(X(2.1), ay0 + 26, "WAF ↑ → 보증 부담은 삼성", size=13, fill=RED, anchor="middle", vmid=True)
    ry = ay0 + ah + 76
    s.text(PX + 30, ry, "WAF가 오르는 경우", size=13, bold=True, fill=INK, vmid=True)
    rx_ = PX + 190
    for r_ in ["① 워크로드 변화", "② 오분류 · RUH 간섭 (WARP)", "③ 스택 업데이트 → 힌트 손실"]:
        w_ = s.chip(rx_, ry - 14, r_, size=13, bold=False, fill=WHITE, stroke=LINE, color=GRAY, padx=10)
        rx_ += w_ + 8

    RX, RY, RW, RH = 1080, 20, 722, 585
    s.panel(RX, RY, RW, RH, "조건부 보증 설계 · 5원칙", "관행은 유지, 유효 DWPD는 조건부로만", hot=True)
    steps = [("③", "양측 동일 텔레메트리", "OCP SMART C0 · 물리 매체 ÷ 호스트 기록량"),
             ("④", "배치 규격 준수 조건", "RUH 매핑 · 정책 준수 시에만 적용"),
             ("②", "WAF 밴드 판정", "≤1.2 / ≤2.0 / >2.0 밴드 → 등급"),
             ("⑤", "초과 지속 시 재협상 · 감량 운영", "2장 FIP 유사 · 조건 재설정")]
    bx, by, bw_, bh_ = RX + 40, RY + 66, RW - 80, 78
    for i, (no, head, body) in enumerate(steps):
        y = by + i * (bh_ + 20)
        s.rect(bx, y, bw_, bh_, fill=WHITE, stroke=BLUE_T2, sw=1.2, r=4)
        s.circle(bx + 30, y + bh_ / 2, 16, fill=BLUE)
        s.text(bx + 30, y + bh_ / 2 + 1, no, size=15, bold=True, fill=WHITE, anchor="middle", vmid=True)
        s.text(bx + 60, y + 26, head, size=17, bold=True, fill=INK, vmid=True)
        s.text(bx + 60, y + 52, body, size=13, fill=GRAY, vmid=True)
        if i < 3:
            s.line(bx + bw_ / 2, y + bh_ + 2, bx + bw_ / 2, y + bh_ + 16, stroke=BLUE, sw=2.5, arrow="blue")
    fy = by + 4 * (bh_ + 20) - 6
    s.rect(bx, fy, bw_, 54, fill=BLUE, r=4)
    s.text(bx + 30, fy + 27, "①", size=15, bold=True, fill=WHITE, anchor="middle", vmid=True)
    s.text(bx + 60, fy + 27, "보증 기준은 TBW · 물리 매체 기록량 선도달 관행 유지 · 유효 DWPD는 부가 표기", size=14, bold=True, fill=WHITE, vmid=True)
    return s


FIGS = {"qlc_vis_s0": fig_s0, "qlc_vis_s1": fig_s1, "qlc_vis_s2": fig_s2, "qlc_vis_s3": fig_s3,
        "qlc_vis_s4": fig_s4, "qlc_vis_s5": fig_s5, "qlc_vis_s6": fig_s6}


def build(names=None):
    stats = {}
    for name, fn in FIGS.items():
        if names and name not in names:
            continue
        s = fn()
        svg_p, html_p = s.save(name)
        render_png(html_p, os.path.join(OUT, name + ".png"), s.w, s.h)
        os.remove(html_p)
        stats[name] = s.chars
        print(f"{name}: svg+png, text chars={s.chars}")
    return stats


if __name__ == "__main__":
    import sys
    build(sys.argv[1:] or None)
