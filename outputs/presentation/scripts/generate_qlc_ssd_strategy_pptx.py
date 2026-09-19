# -*- coding: utf-8 -*-
"""QLC eSSD 전략 — 4장 덱 생성 v4.0 (2026-09-19 순서 재편: 교훈·문제 제기 → 해법 사다리 → 역량 → 실행).

스토리라인(v4.0): ① 교훈·문제(왜 지금, 무엇이 필요한가: 다운턴 교훈 + AI 수요로 대용량·높은 DWPD로 이동하는 요구) → ② 해법 사다리(왜 호스트 협력인가:
  단품이 못 푼 문제는 상위 제품이 풀어 왔고, 이번 문제 WAF는 SSD 수준에서 풀리지 않는다) → ③ 역량(어떻게 해소하는가: 3단계) → ④ 실행(누가 어떻게)
시각 장치: 헤더 스토리 레일 story_rail() / 결론 밴드 다음 장 포인터 band(next_step) / 4장 결론 밴드 요약 체인 band_chain()
S1 교훈·문제: 다운턴 타임라인(DT19·DT23 + QLC 이정표) + 교훈 카드 3(수요 센싱·고객 협업·의사결정 시점, 키 숫자 + 도식) + 우측 문제 제기 패널(요구의 이동 3국면 · 키 숫자 3 · 해법 필요 · 송용호 인용)
S2 해법 사다리(solution_ladder_slide 공용, 이관 매트릭스): 열 = 요구 → 단품 → SSD 계층 → 호스트·시스템 계층, 행 = 내구성·신뢰성 축
S3 역량: 격차 타일 4 + Phase 1·2·3 스택 + 진행 바 + 결론 밴드
S4 실행: 두 트랙 그림(FDE 상주·SCA) + 선례 카드 2 + 조직·인사·문화 3축 + 4장 요약 체인
구 3장(고객의 QLC 채택 동인: 3기 스트립 + 수요 그래프)은 v4.0에서 1장 문제 제기 패널로 흡수(그래프는 보고서 그림으로 유지, 코드는 git 이력).

디자인 시스템: outputs/presentation/ssd-strategy.pptx 승계
  20 x 11.25 in 캔버스 / Arial 단일 폰트 / Samsung Blue #1428A0 단일 액센트
  헤더(조직명·문서등급·스토리 레일·30pt 액션 타이틀·20pt 리드·헤어라인) / 푸터(출처·페이지)
  틴트 카드 #F4F6FC(무테) · 아웃라인 카드 흰색+#D9D9D9 0.75pt · 다크 블루 정리 밴드 · 직각 사각형

실행: .venv/bin/python outputs/presentation/scripts/generate_qlc_ssd_strategy_pptx.py
출력: outputs/presentation/qlc-ssd-strategy.pptx
렌더 검증용 오버라이드: FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx
콘텐츠 소스: outputs/report/qlc-ssd-strategy-report.md (PPT 압축 맵) · outputs/presentation/qlc-ssd-strategy-outline.md
헬퍼 변경 시 deck_kit.py 재추출: `import os` ~ `# ==== S1` 마커 직전까지.
"""
import os

from PIL import Image
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.dml import MSO_LINE_DASH_STYLE
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
TOTAL = 6

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


STORY = [("1", "문제", "왜 지금 필요한가"), ("2", "해법 사다리", "왜 호스트인가"), ("3", "신뢰성", "SSD가 풀 문제"),
         ("4", "역량", "어떻게 해소하는가"), ("5", "실행", "누구와 어디서"), ("6", "보증 · SLA", "무엇을 보증하나")]


def story_rail(slide, current, y=0.88, h=0.30):
    """스토리 레일(킥커 자리): 5장을 번호 원 + 장 이름 + 질문으로 나열하고 밑줄 진행 바로 현재 위치를 표시."""
    lab_w = 2.35
    tb(slide, MX, y, lab_w, h, [("QLC eSSD 전략", 18, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    x0 = MX + lab_w
    step_w = (RIGHT - x0) / len(STORY)
    d = 0.27
    for i, (no, name, q) in enumerate(STORY):
        n = i + 1
        x = x0 + i * step_w
        cur, done = n == current, n < current
        rect(slide, x, y + h + 0.05, step_w - 0.10, 0.045, fill=BLUE if (cur or done) else LINE)
        cy = y + (h - d) / 2
        if cur:
            rect(slide, x, cy, d, d, fill=BLUE, shape=MSO_SHAPE.OVAL)
            nc, col = WHITE, BLUE
        elif done:
            rect(slide, x, cy, d, d, fill=BLUE_T2, shape=MSO_SHAPE.OVAL)
            nc, col = INK, GRAY
        else:
            rect(slide, x, cy, d, d, fill=WHITE, line=LINE, line_w=1.0, shape=MSO_SHAPE.OVAL)
            nc, col = GRAY_2, GRAY_2
        tb(slide, x, cy, d, d, [(no, 11, True, nc)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        tb(slide, x + d + 0.10, y, step_w - d - 0.22, h, [[(name + "  ", 13, True, col), (q, 12, False, col)]],
           anchor=MSO_ANCHOR.MIDDLE)


def header(slide, kicker, title, lead):
    """kicker: 문자열(킥커 텍스트) 또는 정수(스토리 레일의 현재 장 번호)."""
    tb(slide, MX, 0.46, 6.0, 0.34, [("삼성전자 메모리사업부", 18, True, BLUE)])
    tb(slide, 13.21, 0.46, 6.0, 0.34, [(GRADE, 18, False, GRAY)], align=PP_ALIGN.RIGHT)
    if isinstance(kicker, int):
        story_rail(slide, kicker)
    else:
        tb(slide, MX, 0.93, CW, 0.34, [(kicker, 18, True, BLUE)])
    tb(slide, MX, 1.33, CW, 0.62, [(title, 30, True, INK)])
    tb(slide, MX, 2.04, CW, 0.44, [lead] if isinstance(lead, list) else [(lead, 20, False, GRAY)])
    rect(slide, MX, 2.62, CW, 0.014, fill=LINE)


def footer(slide, source, no):
    tb(slide, MX, 10.49, 15.6, 0.34, [(source, 16, False, GRAY)])
    tb(slide, 17.55, 10.49, 1.66, 0.34, [(f"{no:02d} / {TOTAL:02d}", 18, False, GRAY)], align=PP_ALIGN.RIGHT)


def band(slide, y, h, label, main, main_size=22, next_step=None):
    """결론 밴드. next_step=n이면 우측에 '다음 장 → n장 이름 · 질문' 포인터를 그려 스토리라인 연결을 표시."""
    rect(slide, MX, y, CW, h, fill=BLUE)
    tb(slide, MX + 0.45, y, 1.6, h, [(label, 18, False, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    ptr_w = 3.70 if next_step else 0.0
    tb(slide, MX + 2.0, y, CW - 2.4 - ptr_w, h, [(m, main_size, True, WHITE) for m in main.split("\n")],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)  # "\n"으로 의미 단위 줄바꿈 지정 가능
    if next_step:
        no, name, q = STORY[next_step - 1]
        px, ph = RIGHT - 0.30 - (ptr_w - 0.30), h - 0.24
        rect(slide, px, y + 0.12, ptr_w - 0.30, ph, fill=None, line=WHITE, line_w=1.0)
        rect(slide, px, y + 0.12, 0.06, ph, fill=WHITE)
        tb(slide, px + 0.22, y + 0.12, ptr_w - 0.30 - 0.32, ph,
           [("다음 장 →", 10.5, False, BLUE_T2), (f"{no}장 {name} · {q}", 12.5, True, WHITE)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)


def band_chain(slide, y, h, label, chips, head_size=12.75, body_size=11.25):
    """5장 요약 체인 밴드: chips=[(머리글, 본문)] 를 화살표로 연결. 마지막 장의 결론 밴드용(스토리라인 전체를 한눈에)."""
    rect(slide, MX, y, CW, h, fill=BLUE)
    tb(slide, MX + 0.45, y, 1.6, h, [(label, 18, False, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    x0, arrow_w, gap = MX + 2.0, 0.24, 0.10
    n = len(chips)
    cw_ = (CW - 2.4 - (n - 1) * (arrow_w + 2 * gap)) / n
    ch, cy = h - 0.28, y + 0.14
    x = x0
    for i, (head, body) in enumerate(chips):
        last = i == n - 1
        rect(slide, x, cy, cw_, ch, fill=WHITE if last else None, line=WHITE, line_w=1.0)
        tb(slide, x + 0.16, cy + 0.06, cw_ - 0.32, ch - 0.1,
           [(head, head_size, True, BLUE if last else WHITE)] + [(b, body_size, last, INK if last else WHITE) for b in body.split("\n")],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.02)
        if not last:
            rect(slide, x + cw_ + gap, cy + ch / 2 - 0.10, arrow_w, 0.20, fill=WHITE, shape=MSO_SHAPE.RIGHT_ARROW)
        x += cw_ + arrow_w + 2 * gap


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


# ================================================================ S1. 문제 제기 — 시간축 = 논리축 (v4.1 zero-base: 타임라인 세 구간 아래 교훈 / 지금 / 문제 세 패널 정렬)
s = prs.slides.add_slide(BLANK)
header(s, 1,
       "AI 추론 수요는 고용량 QLC에 높은 DWPD를 요구하며, 이를 충족할 해법이 필요한 상황입니다",
       "두 다운턴의 교훈은 요구를 고객 시스템 안에서 먼저 관측하라는 것이었고, 지금 그 요구는 대용량과 높은 DWPD로 이동하고 있습니다.")

# ---- 타임라인(2018 → 2030.5): 다운턴 음영 + 이정표. 아래 세 패널은 이 축의 세 구간에 정렬 ----
TX0, TX1 = MX + 0.30, RIGHT - 0.30
def tx(year):
    return TX0 + (TX1 - TX0) * (year - 2018.0) / 12.5
AX_Y = 3.46
rect(s, TX0, AX_Y - 0.01, TX1 - TX0, 0.02, fill=LINE)
for y0, y1, lab in [(2018.75, 2019.95, "DT19 재고 조정 · -37.6%"), (2022.25, 2023.75, "DT23 최대 낙폭 -45% · 진앙 eSSD")]:
    rect(s, tx(y0), AX_Y - 0.13, tx(y1) - tx(y0), 0.26, fill=BLUE_T2)
    tb(s, tx(y0) - 0.2, AX_Y + 0.16, tx(y1) - tx(y0) + 1.6, 0.22, [(lab, 11.25, True, BLUE)])
rect(s, tx(2027.5), AX_Y - 0.13, tx(2028.25) - tx(2027.5), 0.26, fill=WHITE, line=BLUE, line_w=1.0)
tb(s, tx(2027.5) - 0.3, AX_Y + 0.16, 2.6, 0.22, [("차기 전환점(e) · 가격 정상화", 11.25, True, BLUE)])
for yr in range(2018, 2031, 2):
    tb(s, tx(yr) - 0.4, AX_Y + 0.38, 0.8, 0.2, [(str(yr), 10.5, False, GRAY_2)], align=PP_ALIGN.CENTER)
marks = [(2019.3, "up", "2019", "HBM 조직 축소"), (2022.95, "down", "2022-12", "데이터 배치 표준 비준"),
         (2023.55, "up", "2023-07", "Solidigm 61TB, 12개월 선행"), (2024.75, "down", "2024", "비트 출하 30EB(4배)"),
         (2026.6, "up", "2026", "KV 캐시 배치 규격 미정의"), (2030.2, "down", "2030", "비트 10배 · 매출 정체(e)")]
for yr, side, d, t in marks:
    cx = tx(yr)
    rect(s, cx - 0.08, AX_Y - 0.08, 0.16, 0.16, fill=BLUE, shape=MSO_SHAPE.OVAL)
    runs = [[(d + "  ", 11.25, True, INK), (t, 11.25, False, GRAY)]]
    if side == "up":
        rect(s, cx - 0.006, AX_Y - 0.42, 0.012, 0.30, fill=LINE)
        tb(s, cx - 1.4, AX_Y - 0.66, 2.8, 0.24, runs, align=PP_ALIGN.CENTER)
    else:
        rect(s, cx - 0.006, AX_Y + 0.12, 0.012, 0.44, fill=LINE)
        if cx + 1.4 > RIGHT:
            tb(s, cx - 2.6, AX_Y + 0.58, 2.84, 0.24, runs, align=PP_ALIGN.RIGHT)
        else:
            tb(s, cx - 1.4, AX_Y + 0.58, 2.8, 0.24, runs, align=PP_ALIGN.CENTER)

# ---- 세 패널: 타임라인 구간(2018~23 / 2024~26 / 2027~30)에 정렬 ----
P_Y = AX_Y + 0.98
P_H = 9.42 - 0.20 - P_Y
G = 0.14
C1X, C1W = MX, tx(2024.0) - G / 2 - MX
C2X, C2W = tx(2024.0) + G / 2, tx(2027.0) - tx(2024.0) - G
C3X, C3W = tx(2027.0) + G / 2, RIGHT - tx(2027.0) - G / 2


def panel(x, w, title, years, hot=False):
    rect(s, x, P_Y, w, P_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    rect(s, x, P_Y, w, 0.05, fill=BLUE if hot else BLUE_T2)
    tb(s, x + 0.26, P_Y + 0.16, w - 0.52, 0.28, [[(title, 13.5, True, BLUE), ("   " + years, 10.5, False, GRAY_2)]])
    rect(s, x + 0.26, P_Y + 0.50, w - 0.52, 0.012, fill=LINE)


# ===== 패널 1: 교훈 =====
panel(C1X, C1W, "교훈 · 두 다운턴이 가르친 것", "2018~2023")
ix, iw = C1X + 0.26, C1W - 0.52
NUM_W, TXT_W, LINK_W = 1.32, 2.42, 0.30
VIS_W = iw - NUM_W - TXT_W - LINK_W - 0.30
ROW_H = (P_H - 0.66) / 3
ry = P_Y + 0.60


def vis_sense(x, y, w, h):
    """규격·코드 레인이 발주·출하 레인보다 ≈2년 선행. 2026은 빈 원(규격 미정의)."""
    lx, lw = x + 0.78, w - 0.78
    px = lambda t: lx + lw * (t - 2022.3) / 4.9
    top, bot = y + 0.26, y + h - 0.30
    tb(s, x, top - 0.12, 0.76, 0.24, [("규격·코드", 9.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x, bot - 0.12, 0.76, 0.24, [("발주·출하", 9.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    rect(s, lx, top, lw, 0.016, fill=LINE)
    rect(s, lx, bot, lw, 0.016, fill=LINE)
    d, o, e = px(2022.95), px(2024.5), px(2026.6)
    mid = (top + bot) / 2
    rect(s, d, mid - 0.11, o - d, 0.22, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
    tb(s, d, mid - 0.11, o - d - 0.08, 0.22, [("≈2년", 9.0, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    rect(s, d - 0.09, top - 0.09, 0.18, 0.18, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, d - 0.2, top - 0.32, 1.6, 0.2, [("'22-12 배치 표준 비준", 8.75, False, GRAY)])
    rect(s, o - 0.09, bot - 0.09, 0.18, 0.18, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, o - 0.2, bot + 0.10, 1.6, 0.2, [("'24 비트 출하 30EB", 8.75, False, GRAY)])
    rect(s, e - 0.09, top - 0.09, 0.18, 0.18, fill=WHITE, line=BLUE, line_w=1.5, shape=MSO_SHAPE.OVAL)
    tb(s, e - 1.5, top + 0.10, 1.65, 0.36, [("'26 KV 캐시 규격 미정의", 8.75, True, BLUE), ("= 선점 구간", 8.75, True, BLUE)], align=PP_ALIGN.RIGHT, spacing=1.0)


def vis_collab(x, y, w, h):
    """61TB 출시 시점 막대(OCP 2022-10 예고 기준) + HBM4 한 줄."""
    lab_w = 0.7
    bx, bw = x + lab_w, w - lab_w
    tb(s, x, y, w, 0.2, [("61TB QLC 출시 · OCP '22-10 예고 기준", 8.75, False, GRAY_2)])
    yy = y + 0.26
    for who, months, hit, end in [("Solidigm", 9, True, "'23-07 · 규격 정의 참여"), ("삼성", 21, False, "'24-07 · 12개월 후발")]:
        tb(s, x, yy, lab_w - 0.05, 0.26, [(who, 9.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
        bl = bw * months / 21.0
        rect(s, bx, yy, bl, 0.26, fill=BLUE if hit else WHITE, line=None if hit else LINE, line_w=0.75)
        if hit:
            tb(s, bx + bl + 0.08, yy, bw - bl - 0.08, 0.26, [(end, 8.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
        else:
            tb(s, bx + 0.08, yy, bl - 0.16, 0.26, [(end, 8.75, True, GRAY)], anchor=MSO_ANCHOR.MIDDLE, align=PP_ALIGN.RIGHT)
        yy += 0.34
    tb(s, x, yy + 0.02, w, 0.36, [[("HBM4  ", 8.75, True, INK), ("SK hynix ↔ NVIDIA 규격 공동 정의 → 주도권 · 삼성 후발", 8.75, False, GRAY)]], spacing=1.0)


def vis_timing(x, y, w, h):
    """직전 다운턴의 결정 → 다음 다운턴의 초기 조건(3행, 마지막 행 강조)."""
    cw_ = (w - 0.34) / 2
    rh = 0.27
    yy = y + 0.02
    for a, b, hot in [("DT19 무감산 성공", "DT23 국면 오판", False), ("DT19 HBM 조직 축소", "DT23 주도권 상실", False),
                      ("2026 고객 시스템 진입", "2027H2 TCO 보증 수익", True)]:
        rect(s, x, yy, cw_, rh, fill=BLUE if hot else WHITE, line=None if hot else LINE, line_w=0.75)
        tb(s, x + 0.03, yy, cw_ - 0.06, rh, [(a, 8.75, hot, WHITE if hot else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        rect(s, x + cw_ + 0.06, yy + 0.06, 0.22, 0.15, fill=BLUE if hot else BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
        rect(s, x + cw_ + 0.34, yy, cw_, rh, fill=BLUE if hot else TINT)
        tb(s, x + cw_ + 0.37, yy, cw_ - 0.06, rh, [(b, 8.75, True, WHITE if hot else INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        yy += rh + 0.09


lessons = [("2년", "수요 센싱", "고객 규격·코드 신호가 발주·출하에 약 2년 선행", "총량 지표는 다운턴을, 고객 규격은 차기 요구를 보였다", vis_sense, 2),
           ("12개월", "고객 협업", "규격 정의에 참여한 공급자가 선점", "다운턴 극복의 결정 변수는 방어가 아니라 요구 적중", vis_collab, 5),
           ("2027H2", "의사결정 시점", "직전 다운턴의 결정이 다음 다운턴의 초기 조건", "차기 전환점은 2027년 하반기 가격 정상화 국면", vis_timing, 4)]
for i, (num, nm, l1, l2, vis, nxt) in enumerate(lessons):
    if i:
        rect(s, ix, ry - 0.05, iw, 0.012, fill=LINE)
    tb(s, ix, ry, NUM_W, ROW_H - 0.1, [(num, 22, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, ix + NUM_W, ry + 0.06, TXT_W, ROW_H - 0.16,
       [[("교훈 " + str(i + 1) + " · ", 10.5, False, GRAY_2), (nm, 11.25, True, INK)], (l1, 9.75, True, INK), (l2, 9.0, False, GRAY)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)
    vis(ix + NUM_W + TXT_W + 0.15, ry + 0.10, VIS_W, ROW_H - 0.24)
    lx_ = ix + iw - LINK_W
    rect(s, lx_, ry + ROW_H / 2 - 0.18, 0.26, 0.26, fill=BLUE_T2, shape=MSO_SHAPE.OVAL)
    tb(s, lx_, ry + ROW_H / 2 - 0.18, 0.26, 0.26, [(str(nxt), 10, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    ry += ROW_H

# ===== 패널 2: 지금 · 요구의 이동 =====
panel(C2X, C2W, "지금 · 요구의 이동", "2024~2026")
ix2, iw2 = C2X + 0.26, C2W - 0.52
FROM_W, TO_W = 1.30, iw2 - 1.30 - 0.34
shifts = [("구매 기준", "TB당 TCO", "원가 · 전력 · 밀도", "GPU당 컨텍스트 용량 · 토큰당 비용", "추론 캐시 계층"),
          ("드라이브 용량", "61TB", "2023 · 1Tb 다이", "245TB", "2025 · 다이 8배 ↑"),
          ("요구 DWPD", "0.3~0.6", "읽기 중심 워크로드", "1~3", "KV 캐시 계층 제품(TLC) 정격 · 쓰기 강도는 실측 필요")]
sy = P_Y + 0.62
SH = (P_H - 0.62 - 0.62) / 3
for lab, f1, f2, t1, t2 in shifts:
    tb(s, ix2, sy, iw2, 0.2, [(lab, 9.5, False, GRAY_2)])
    cy = sy + 0.24
    ch = SH - 0.40
    rect(s, ix2, cy, FROM_W, ch, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, ix2 + 0.08, cy + 0.05, FROM_W - 0.16, ch - 0.1, [(f1, 11.25, True, GRAY), (f2, 8.5, False, GRAY_2)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    rect(s, ix2 + FROM_W + 0.06, cy + ch / 2 - 0.09, 0.22, 0.18, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)
    rect(s, ix2 + FROM_W + 0.34, cy, TO_W, ch, fill=TINT, line=BLUE, line_w=1.0)
    tb(s, ix2 + FROM_W + 0.42, cy + 0.05, TO_W - 0.16, ch - 0.1, [(t1, 11.25, True, BLUE), (t2, 8.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    sy += SH
tb(s, ix2, P_Y + P_H - 0.56, iw2, 0.46,
   [("세 국면의 구매 기준은 일관되게 TB당 TCO였고, 바뀐 것은 워크로드의 쓰기 비중과 드라이브당 용량입니다", 9.0, False, GRAY)], spacing=1.02)

# ===== 패널 3: 문제 · 해법이 필요한 상황 =====
panel(C3X, C3W, "문제 · 해법이 필요한 상황", "2027~2030", hot=True)
ix3, iw3 = C3X + 0.26, C3W - 0.52
tb(s, ix3, P_Y + 0.60, iw3, 0.2, [("동급 비교: 61TB QLC 0.58~1.0 · 245TB QLC 0.3 vs KV 계층 TLC 1~3 DWPD", 9.0, False, GRAY_2)])
tb(s, ix3, P_Y + 0.80, iw3, 0.62, [("2~10배 격차", 30, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
half = (iw3 - 0.2) / 2
for k, (num, lab) in enumerate([("10배", "QLC 비트 '25 → '30 (e)"), ("350EB", "2030 추론 캐시 계층 수요 (e)")]):
    hx = ix3 + k * (half + 0.2)
    tb(s, hx, P_Y + 1.50, half, 0.42, [(num, 20, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, hx, P_Y + 1.92, half, 0.22, [(lab, 8.75, False, GRAY)])
rect(s, ix3, P_Y + 2.30, iw3, 0.94, fill=WHITE, line=BLUE, line_w=1.25)
tb(s, ix3 + 0.16, P_Y + 2.36, iw3 - 0.32, 0.82,
   [("고용량 QLC에서 DWPD를 높일 해법이 필요합니다", 12.75, True, BLUE),
    ("극단 조합(0.075 vs 3)은 40배 · 어느 계층이 닫을 수 있는가 → 2장", 9.75, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)
quote(s, ix3, P_Y + P_H - 0.92, iw3, 0.78,
      "부품이 어떻게 쓰일지는 시스템을 설계하는 사람 마음에 있다. 그걸 알았으면 HBM을 진작 준비했을 것이다",
      "송용호 AX/PI센터장 · 사내 인터뷰 2026-09-03", size=9.5)

band(s, 9.42, 0.80, "문제",
     "요구는 다운턴 국면에서 고객 규격·코드로 정의됐고, 정의에 참여한 공급자가 선점했습니다.\n차기 요구는 고용량 QLC의 1~3 DWPD이며, 동급 비교 시 정격과 2~10배 격차가 있습니다",
     main_size=16.5, next_step=2)
footer(s, "출처: 위키 다운턴 역사 20년(DT19·DT23 낙폭), fdp-host-ssd-platform §2.5(Solidigm 61TB), QLC 연혁 소스(배치 표준 비준·30EB), GitHub README(캐시 관리자 4종), TrendForce·SanDisk FMS 2026·Meta(수요 모델, 2026~2030 추정), P5336·6550 ION·CM9·LC9 사양(동급 DWPD)", 1)
notes(s, "1장은 문제 제기입니다. 결론은 내리지 않고, 고용량 QLC에서 DWPD를 높일 해법이 필요한 상황임을 세웁니다. 상단 타임라인의 세 구간이 아래 세 패널과 정렬돼 있습니다. 과거의 교훈, 지금 요구의 이동, 그리고 해법이 필요한 문제입니다. "
      "왼쪽 패널, 교훈. DT19(재고 조정, -37.6%)와 DT23(최대 낙폭 -45%, 진앙 eSSD)에서 세 가지를 배웠습니다. 교훈 1 수요 센싱: 수요 신호는 발주보다 약 2년 먼저 고객의 규격·표준·소스 코드에 나타납니다. 2022년 12월 데이터 배치 표준 비준이 2024년 비트 출하 30EB로 이어졌고, 지금의 등가 신호는 KV 캐시 관리자 코드에 배치·내구성 규격이 미정의라는 사실입니다. 교훈 2 고객 협업: 규격 정의에 참여한 공급자가 선점했습니다. Solidigm은 61TB QLC를 12개월 먼저 출시했고, HBM4는 NVIDIA와 규격을 공동 정의한 SK hynix가 주도권을 확보했습니다. 교훈 3 의사결정 시점: 직전 다운턴의 결정이 다음 다운턴의 초기 조건입니다. DT19의 무감산 성공이 DT23 국면 오판으로, HBM 조직 축소가 주도권 상실로 이어졌고, 차기 전환점은 2027년 하반기 가격 정상화 국면입니다. 각 교훈 끝의 번호는 이 덱에서 그 교훈을 받는 장입니다. "
      "가운데 패널, 지금 요구의 이동. 구매 기준은 TB당 TCO(원가·전력·밀도)에서 GPU당 컨텍스트 용량·토큰당 비용으로, 드라이브 용량은 61TB(2023)에서 245TB(2025, 다이 8배)로, 요구 DWPD는 읽기 중심 0.3~0.6에서 KV 캐시 쓰기 집약 1~3으로 이동했습니다. 세 국면의 구매 기준은 일관되게 TB당 TCO였고, 바뀐 것은 쓰기 비중과 용량입니다. "
      "오른쪽 패널, 문제. 동급 용량으로 비교하면 61TB QLC 정격 0.58~1.0(P5336·6550 ION), 245TB QLC 0.3(LC9)과 KV 캐시 계층 TLC 1~3(CM9) 사이에는 2~10배 격차가 있습니다. 최저 정격 0.075와 3을 짝지은 극단 조합만 40배입니다. KV 캐시의 쓰기 강도 자체도 프레임워크에 따라 크게 달라(CHEOPS 2025: 읽기 2.0GiB/s vs 쓰기 11MiB/s) 실측이 필요합니다. 수요 모델은 QLC 비트 2025년 대비 2030년 10배, 2030년 추론 캐시 계층 수요 350EB입니다. 그래서 고용량 QLC에서 DWPD를 높일 해법이 필요합니다. 어느 계층이 해결할 수 있는가가 2장의 질문입니다. 송용호 AX/PI센터장의 인용은 그 답이 고객 시스템의 이해에서 나와야 함을 시사합니다. 근거는 위키 qlc-ssd-market.md §3.4·§3.5, 수요 모델은 §4.3.")

# ================================================================ S2. 해법 사다리 — 이관 매트릭스 (solution_ladder_slide.build 공용; v4.0 2장)
import sys as _sys
_sys.path.insert(0, HERE)
import solution_ladder_slide as _ladder
_ladder.build(_sys.modules[__name__], page_no=2, kicker=2, next_step=3)

# ================================================================ S3. 신뢰성 축 — SSD 내부 해법 (v5.0 신설: 다이 수·고장률은 호스트가 아니라 SSD가 풀 문제)
s = prs.slides.add_slide(BLANK)
header(s, 3,
       "다이 수 8배 증가로 다이 고장률 요구가 8배 엄격해졌고, 이 축은 SSD 내부 해법으로 대응합니다",
       "내구성 축과 달리 신뢰성 축은 호스트 협력이 아니라 SSD 설계에서 풀 문제입니다. 다이 패리티, 여분 다이와 감량 운영, 텔레메트리 예측이 그 해법입니다.")

def _img(name, x, y, w):
    return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))

# ---- 상단: 문제 (다이 수 ↑ · FFR 고정 · 허용 고장률 ↓) ----
T_Y = 2.80
CH_W = 5.95
_img("rel_dies_wide.png", MX, T_Y, CH_W)                      # 5.6×2.35 → 5.95×2.50
_img("rel_ffr_limit.png", MX + CH_W + 0.22, T_Y, CH_W)         # 5.6×2.35 → 5.95×2.50
PX3 = MX + 2 * CH_W + 0.44
PW3 = RIGHT - PX3
rect(s, PX3, T_Y, PW3, 2.50, fill=TINT, line=BLUE_T2, line_w=1.0)
tb(s, PX3 + 0.24, T_Y + 0.14, PW3 - 0.48, 0.2, [("요구 · JESD218 기능 고장률", 9.75, False, GRAY_2)])
tb(s, PX3 + 0.24, T_Y + 0.36, PW3 - 0.48, 0.56, [("FFR ≤ 3%  고정", 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, PX3 + 0.24, T_Y + 0.98, PW3 - 0.48, 1.44,
   [("보호 없는 SSD 고장률 ≈ N × 다이 고장률", 10.5, True, INK),
    ("N 128 → 1,024이면 같은 FFR을 지키기 위한 다이 고장률 상한은 2.4e-4 → 3.0e-5 (8배 ↓)", 9.5, False, GRAY),
    ("칩 면적이 커질수록 수율이 떨어지는 포아송 모델과 같은 구조 · 다이 고장률 개선은 기술적 한계에 접근", 9.5, False, GRAY),
    ("→ 해법은 다이가 아니라 SSD 계층: 단일 다이 고장을 허용하면 상한이 p에서 p² 차수로 완화", 9.75, True, BLUE)], spacing=1.06)

# ---- 하단: SSD 내부 해법 3 + 호스트 관측(점선) ----
S_Y = T_Y + 2.50 + 0.22
S_H = 9.42 - 0.20 - S_Y
tb(s, MX, S_Y, CW, 0.26, [[("SSD 내부 해법", 13.5, True, BLUE), ("   다이 고장을 SSD 안에서 흡수하고, 호스트에는 관측 지표만 제공", 10.5, False, GRAY_2)]])
tiles = [
    ("① 다이 패리티 (RAID-like XOR)", "hot",
     [("원리", "슈퍼페이지를 여러 다이에 걸쳐 구성하고 패리티 다이에 XOR 저장 · 단일 다이 고장 시 복구"),
      ("선례", "Micron RAIN · Cai 외 superpage-level parity(학술)"),
      ("비용", "패리티 다이 용량(1/스트라이프) · 다이 수와 함께 스트라이프 설계 재최적화"),
      ("효과", "SSD 고장률 p → p² 차수 · FFR 여유 확보")]),
    ("② 여분 다이 · 다이 은퇴 · 감량 운영", "hot",
     [("원리", "고장 다이 감지 → 데이터 재배치 → 고장 다이 제외 운영(Fail-in-Place), 필요 시 여분 다이 투입"),
      ("선례", "삼성 PM1733/1735 FIP: 플레인 4GB · 다이 8GB 감량 운영 · Kioxia die failure recovery"),
      ("비용", "예비 용량(여분 다이) · 감량 시 고객 용량 계약 조건 필요"),
      ("효과", "다이 고장이 SSD 교체로 이어지지 않음 · 수리 비용 ↓")]),
    ("③ 텔레메트리 · 사전 예측", "part",
     [("원리", "다이별 RBER 추이 · XOR 복구 횟수 · 리드 리트라이로 고장 징후를 감지해 사전 은퇴"),
      ("선례", "OCP SMART Cloud Health(C0) XOR 복구 카운트 · 삼성 텔레메트리(KV 백서)"),
      ("비용", "펌웨어 통계 · 로그 대역 · 예측 모델 검증"),
      ("효과", "돌발 고장 → 계획 감량 · 1,024다이급의 관리 가능성 확보")]),
    ("호스트 · 플랫폼 (관측 · 수용만)", "next",
     [("역할", "SSD가 노출한 지표(XOR 카운트 · 감량 예고)를 관측하고 감량 운영을 수용"),
      ("선례", "OCP Datacenter NVMe SSD 사양 SMART C0 · Microsoft Hyrax(플랫폼 fail-in-place) · 드라이브 간 소거 부호"),
      ("경계", "다이 고장의 해결 주체는 SSD · 호스트 협력은 규격(텔레메트리 필드 · 감량 정책)에 한정"),
      ("삼성 과제", "FIP 감량 정책의 OCP 규격화 · 텔레메트리 필드 표준 제안")])]
TW = (CW - 3 * 0.22) / 4
ty = S_Y + 0.36
th = S_H - 0.36 - 0.52
for i, (title, st, rows) in enumerate(tiles):
    x = MX + i * (TW + 0.22)
    if st == "hot":
        rect(s, x, ty, TW, th, fill=WHITE, line=BLUE, line_w=1.25)
        rect(s, x, ty, TW, 0.05, fill=BLUE)
    elif st == "part":
        rect(s, x, ty, TW, th, fill=WHITE, line=BLUE_T2, line_w=1.0)
        rect(s, x, ty, TW, 0.05, fill=BLUE_T2)
    else:
        sp = rect(s, x, ty, TW, th, fill=TINT, line=BLUE, line_w=1.0)
        sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    tb(s, x + 0.2, ty + 0.14, TW - 0.4, 0.28, [(title, 12.0, True, BLUE if st != "next" else GRAY)])
    yy = ty + 0.50
    for k, v in rows:
        tb(s, x + 0.2, yy, TW - 0.4, 0.62, [[(k + "  ", 9.5, True, INK), (v, 9.0, False, GRAY)]], spacing=1.02)
        yy += 0.60
tb(s, MX, ty + th + 0.10, CW, 0.36,
   [[("삼성 과제  ", 10.5, True, BLUE), ("1,024다이급에서 패리티·예비 비율을 FFR과 용량 오버헤드 사이에서 재최적화 · FIP 감량 정책과 텔레메트리 필드를 OCP에 규격 제안 · 다이 고장 예측 모델을 KV 캐시 계층 수명 보증(6장)과 연결", 10.0, False, GRAY)]], spacing=1.02)

band(s, 9.42, 0.80, "결론",
     "SSD 고장률 ≈ N × 다이 고장률에서 늘어난 N만큼을 다이 패리티·여분 다이·감량 운영으로 SSD 안에서 흡수합니다.\n호스트에는 관측 지표와 감량 정책만 제공하며, 이 축은 호스트 협력 대상이 아닙니다",
     main_size=16.5, next_step=4)
footer(s, "출처: JESD218(FFR), S3700 분해·Kioxia LC9·제품 사양(다이 수), 수율 모델(Leachman), Cai 외(다이 패리티), Micron RAIN, 삼성 PM1733(FIP), OCP SMART C0, MS Hyrax · 고장률 상한은 독립 고장 모델(추정)", 3)
notes(s, "3장은 신뢰성 축입니다. 2장의 내구성 축과 구조는 같지만 해결 주체가 다릅니다. 요구는 JESD218 기능 고장률 FFR 3% 이하로 고정인데, SSD당 NAND 다이 수는 S3700 800GB 128개(2012)에서 Kioxia LC9 245TB 1,024개(2025, 2Tb 다이 32단 스택 32패키지)로 8배 늘었습니다. 보호가 없으면 SSD 고장률은 다이 수 N에 비례하므로, 같은 FFR을 지키기 위한 다이 고장률 상한은 1−0.97^(1/N)로 128다이에서 2.4×10⁻⁴, 1,024다이에서 3.0×10⁻⁵입니다. 8배 엄격해진 것입니다. 칩 면적이 커질수록 수율이 떨어지는 포아송 모델과 같은 구조이며, 다이 고장률 개선은 기술적 한계에 접근하고 있습니다. "
      "해법은 다이가 아니라 SSD 계층에 있습니다. 단일 다이 고장을 허용하면 상한이 p에서 p² 차수로 완화되기 때문입니다(독립 고장 모델, 오른쪽 차트의 점선). 첫째, 다이 패리티: 슈퍼페이지를 여러 다이에 걸쳐 구성하고 패리티 다이에 XOR를 저장해 단일 다이 고장을 복구합니다(Micron RAIN, Cai 외 논문). 비용은 패리티 다이 용량이며 다이 수가 늘수록 스트라이프 설계를 재최적화해야 합니다. 둘째, 여분 다이·다이 은퇴·감량 운영: 고장 다이를 감지해 데이터를 재배치하고 고장 다이를 제외한 채 운영합니다. 삼성 PM1733의 Fail-in-Place가 플레인 4GB·다이 8GB 감량 운영으로 이를 상용화했습니다. 비용은 예비 용량과 감량 시 고객 용량 계약 조건입니다. 셋째, 텔레메트리·사전 예측: 다이별 RBER 추이·XOR 복구 횟수·리드 리트라이로 징후를 감지해 사전 은퇴시킵니다. OCP SMART Cloud Health 로그의 XOR 복구 카운트가 표준 필드입니다. "
      "호스트·플랫폼은 관측과 수용만 합니다. SSD가 노출한 지표를 관측하고(OCP SMART C0), 감량 운영을 플랫폼이 수용하며(Microsoft Hyrax), 드라이브 간 소거 부호가 SSD 단위 고장을 흡수합니다. 다이 고장의 해결 주체는 SSD이고 호스트 협력은 규격에 한정됩니다. 삼성 과제는 1,024다이급에서 패리티·예비 비율을 FFR과 용량 오버헤드 사이에서 재최적화하고, FIP 감량 정책과 텔레메트리 필드를 OCP에 규격으로 제안하며, 다이 고장 예측 모델을 6장의 수명 보증과 연결하는 것입니다. 결론: 이 축은 SSD 안에서 흡수하고 호스트에는 지표만 제공합니다. 내구성 격차를 해소하는 역량이 4장입니다. 근거는 소스 §9 F41~F47, 고장률 상한은 독립 고장 모델입니다.")

# ================================================================ S4. 역량 — 3단계 (v3.10 공식 문안·범례를 Phase 1 옆으로·결론 밴드 신설)
s = prs.slides.add_slide(BLANK)
header(s, 4,
       "남은 지렛대 WAF는 호스트 배치에 있으므로, 고객 시스템까지 3단계로 역량을 확장합니다",
       [("「승부는 칩을 많이 파는 기업이 아니라, 고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 가져간다」", 18, False, INK),
        ("   신문섭 · Bain 파트너, 2026-06", 13.5, False, GRAY_2)])

T_Y, T_H, T_W, T_GAP = 2.80, 0.96, 4.41, 0.26
tiles = [
    ("2~10배", 1.55, "내구성 격차", "동급 61TB QLC 0.58~1.0 · 245TB 0.3 vs TLC 1~3 DWPD"),
    ("25배", 1.45, "스트림 격차", "RUH 2~8개 vs 200개 이상"),
    ("0건", 1.25, "접점 부재", "캐시 관리자 4종 코드의 배치 규격 언급"),
    ("≈3 → ≈1", 1.85, "해소 수단 실증", "범용·캐시 WAF 실측 · KV 캐시 미실측"),
]
for i, (num, nw, lab, desc) in enumerate(tiles):
    x = MX + i * (T_W + T_GAP)
    hot = i == 3
    rect(s, x, T_Y, T_W, T_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.28, T_Y, nw, T_H, [(num, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 0.28 + nw + 0.12, T_Y, T_W - nw - 0.6, T_H,
       [(lab, 15.75, True, INK), (desc, 13.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)


def stack2(slide, x, y, w, names, techs, states, layer_h=0.74, gap=0.06):
    """계층 스택 v2: 층 이름 + 그 층의 구체 기술(작은 글씨). 각 층의 y 반환."""
    ys = []
    for i, (nm, tc, st) in enumerate(zip(names, techs, states)):
        ly = y + i * (layer_h + gap)
        stl = STATE_STYLE[st]
        rect(slide, x, ly, w, layer_h, fill=stl["fill"], line=stl["line"], line_w=0.75)
        c1 = stl["color"]
        c2 = WHITE if st == "own" else (INK if st == "touch" else GRAY_2)
        tb(slide, x + 0.16, ly + 0.06, w - 0.32, layer_h - 0.1,
           [(nm, 13.5, True, c1), (tc, 11.25, False, c2)], spacing=1.04)
        ys.append(ly)
    return ys


P_Y, P_H, P_W = 3.92, 4.98, 5.92
LAYER_NAMES = ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O 라이브러리", "커널 · 플랫폼", "SSD 디바이스"]
phase_defs = [
    ("Phase 1", "배치 표준 디바이스 확보", ["none", "none", "none", "none", "own"],
     ["vLLM · SGLang · TensorRT-LLM",
      "Dynamo KVBM · LMCache · Mooncake · FlexKV",
      "NIXL · GPUDirect Storage · io_uring · SPDK",
      "Linux write streams · XFS · CMX(DOCA Memos)",
      "RUH 200+ 펌웨어 · 2Tb QLC · NVMe KV 확장 · 텔레메트리"],
     "고객 보증 범위: 정격 내 QLC 원가·전력"),
    ("Phase 2", "워크로드 실측 기반 최적화", ["none", "none", "touch", "touch", "own"],
     ["vLLM · SGLang · TensorRT-LLM",
      "KVBM 빈도 필터 · LMCache 퇴거 정책(트레이스 원천)",
      "io_uring·GDS 백엔드 write stream 부착 · xNVMe · blktrace·eBPF",
      "Linux 6.16 write streams · XFS·f2fs 스트림 · CMX 힌트 매핑 검증",
      "RUH 정책(수명·테넌트·prefix) · WAF·유효 DWPD 실측"],
     "고객 보증 범위: 고객 워크로드 기준 수명"),
    ("Phase 3", "고객 시스템 내 공동 설계", ["touch", "own", "own", "own", "own"],
     ["커넥터·스케줄러 분석 · 공용 TCO 모델(GPU당 사용자·TTFT·전력)",
      "KVBM·LMCache·Mooncake·FlexKV 플러그인 메인라인 머지",
      "NIXL 스토리지 플러그인 · xNVMe 배치 API가 기본 백엔드",
      "XFS·f2fs 스트림 · DOCA Memos↔배치 표준 공동 정의 · OCP",
      "레퍼런스 스택의 기본 디바이스 · 수명 보증 SLA"],
     "고객 보증 범위: 시스템 수준 TCO"),
]
STK_W, LH, LG = 3.76, 0.74, 0.06
for i, (ph, ttl, states, techs, outcome) in enumerate(phase_defs):
    x = MX + i * (P_W + 0.33)
    hot = i == 2
    rect(s, x, P_Y, P_W, P_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.38, P_Y + 0.16, P_W - 0.76, 0.34, [[(ph + "  ", 18, True, BLUE), (ttl, 18, True, INK)]])
    sx, sy0 = x + 0.38, P_Y + 0.60
    ys = stack2(s, sx, sy0, STK_W, LAYER_NAMES, techs, states, layer_h=LH, gap=LG)
    ax = sx + STK_W + 0.18
    aw = x + P_W - ax - 0.16
    if i == 0:
        # 범례(색 = 삼성이 닿는 층)를 Phase 1 옆에 배치
        ly0 = ys[1] + 0.10
        for k, (fill, line, t) in enumerate([(BLUE, None, "삼성 코드·제품"), (BLUE_T2, None, "관측·분석"), (WHITE, LINE, "고객 영역")]):
            yy = ly0 + k * 0.40
            rect(s, ax, yy + 0.04, 0.26, 0.18, fill=fill, line=line, line_w=0.75)
            tb(s, ax + 0.34, yy, aw - 0.34, 0.26, [(t, 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    elif i == 1:
        top, bot = ys[0] + 0.08, ys[4] + LH - 0.08
        v_arrow(s, ax, top, 0.22, bot - top, fill=BLUE_T2)
        v_arrow(s, ax + 0.28, top, 0.22, bot - top, up=True, fill=BLUE)
        tb(s, ax + 0.58, ys[1], aw - 0.58, LH, [("트레이스", 12.0, True, INK), ("수집 ↓", 11.0, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax + 0.58, ys[3], aw - 0.58, LH, [("배치 정책", 12.0, True, BLUE), ("반영 ↑", 11.0, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    else:
        pw = person(s, ax + 0.02, ys[1] + 0.12, 0.50, color=BLUE)
        tb(s, ax + pw + 0.10, ys[1], aw - pw - 0.10, LH, [("FDE 상주", 12.75, True, BLUE), ("공동 설계", 11.25, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax, ys[2], aw, LH, [("메인라인", 12.75, True, BLUE), ("머지", 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax, ys[0], aw, LH, [("공용 TCO", 12.75, True, INK), ("모델", 11.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    tb(s, x + 0.38, P_Y + P_H - 0.44, P_W - 0.76, 0.34, [(outcome, 14.25, True, INK)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)

BAR_Y, BAR_H = P_Y + P_H + 0.10, 0.16
for i in range(3):
    x = MX + i * (P_W + 0.33)
    rect(s, x, BAR_Y, P_W, BAR_H, fill=WHITE, line=LINE, line_w=0.75)
rect(s, MX, BAR_Y, P_W * 0.60, BAR_H, fill=BLUE)
rect(s, MX + P_W * 0.60, BAR_Y, P_W * 0.40, BAR_H, fill=BLUE_T2)
rect(s, MX + P_W + 0.33, BAR_Y, P_W * 0.15, BAR_H, fill=BLUE_T2)
mk_x = MX + P_W * 0.60
rect(s, mk_x - 0.13, BAR_Y + BAR_H + 0.03, 0.26, 0.18, fill=BLUE, shape=MSO_SHAPE.ISOSCELES_TRIANGLE)
tb(s, mk_x + 0.22, BAR_Y + BAR_H - 0.02, 13.0, 0.30,
   [[("삼성 현 위치  ", 13.5, True, BLUE), ("Phase 1 진행 중(QLC 라인 RUH 2~8 → 200+ 미완 · DWPD 미공개 · CMX 첫 공급은 TLC) · Phase 2 준비 · Phase 3 미착수", 12.0, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.46, 0.76, "결론",
     "단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장됩니다.\n삼성은 1단계 진행 중·2단계 준비 단계이며, 3단계 진입 수단이 다음 장입니다",
     main_size=17, next_step=5)
footer(s, "출처: StorageReview·Solidigm·Kioxia 스펙(DWPD), ScaleFlux 2026-07(RUH 200+), GitHub README 확인(LMCache·Mooncake·FlexKV·3FS·xNVMe), CacheLib FDP 문서(WAF), Linux 6.16·XFS 패치, NVIDIA CMX 문서", 4)
notes(s, "4장은 해법의 제안입니다. 1장이 제기한 내구성 격차를 해소하는 경로이며, 2장의 산식에서 남은 보상 변수는 WAF이고, WAF는 호스트가 데이터 수명에 따라 배치를 결정할 때 1에 수렴하므로 내구성 격차는 디바이스가 아니라 고객 시스템의 배치 방식에서 해소됩니다. 그래서 역량을 디바이스에서 고객 시스템 계층까지 3단계로 확장합니다. 리드의 인용은 베인 신문섭 파트너의 진단으로 같은 결론입니다. "
      "상단 타일은 격차와 수단입니다. 내구성 격차(QLC 정격 0.075~0.6 vs TLC 1~3 DWPD, 10~40배), 스트림 격차(RUH 2~8 vs 200 이상), 접점 부재(KV 캐시 관리자 4종 코드에 배치 규격 언급 0건), 해소 수단 실증(CacheLib 배치 표준 적용 WAF 3.22→1.03, XFS write streams RocksDB -35%, ScaleFlux 유효 7~10 DWPD). "
      "그림은 고객 시스템 5계층을 세 번 그리고 삼성이 닿는 층을 색으로 표시하며(파랑 = 삼성 코드·제품, 연파랑 = 관측·분석, 흰색 = 고객 영역), 각 층에 그 층을 구성하는 기술을 적었습니다. 응용·추론 엔진(vLLM·SGLang·TensorRT-LLM), KV 캐시 관리자(NVIDIA Dynamo KVBM·LMCache·Mooncake·Tencent FlexKV), I/O 라이브러리(NIXL·GPUDirect Storage·io_uring·SPDK/xNVMe), 커널·플랫폼(Linux 6.16 write streams·XFS/f2fs 스트림·NVIDIA CMX와 DOCA Memos), SSD 디바이스(컨트롤러·펌웨어 RUH·2Tb QLC·NVMe KV 확장·텔레메트리). "
      "Phase 1 배치 표준 디바이스 확보: SSD 층만 삼성의 범위이며 고객 보증 범위는 정격 내 QLC 원가·전력입니다. Phase 2 워크로드 실측 기반 최적화: 캐시 관리자의 빈도 필터·퇴거 정책이 트레이스의 원천이고, I/O 라이브러리의 io_uring·GDS 백엔드에 write stream을 부착하며 커널 스트림과 CMX 힌트 매핑을 검증해 RUH 정책·WAF·유효 DWPD 실측을 공개합니다. 고객 보증 범위는 고객 워크로드 기준 수명입니다. Phase 3 고객 시스템 내 공동 설계: 캐시 관리자 4종에 플러그인을 메인라인으로 머지하고, NIXL·xNVMe가 기본 백엔드가 되며, DOCA Memos와 배치 표준의 매핑을 NVIDIA와 공동 정의하고, 응용 층은 커넥터·스케줄러를 분석해 공용 TCO 모델(GPU당 동시 사용자·TTFT·전력)로 협의합니다. FDE(Forward Deployed Engineer)가 고객 시스템에 상주합니다. 고객 보증 범위는 시스템 수준 TCO입니다. "
      "삼성 현 위치는 정직하게 Phase 1 진행 중입니다. CMX 첫 공급은 TLC이고 QLC 라인의 RUH는 2~8개로 200개 이상에 미달하며 DWPD가 미공개입니다. Phase 2는 준비 단계로 KV cache 백서 2종으로 측정 역량은 있으나 트레이스 기반 실측이 미공개이고, Phase 3는 캐시 관리자 4종 기여 0건으로 미착수입니다. 오케스트레이션 자체는 만들지 않습니다. 결론: 단계마다 고객 보증 범위가 원가·전력 → 워크로드 수명 → 시스템 TCO로 확장되며, 3단계에 진입하는 수단(선별된 고객에의 FDE·업스트림·규격 채널)과 개발실 내부 실행이 5장입니다.")

# ================================================================ S5. 실행 — 고객 선별(FDE 집중) + 개발실 내부 실행 (v5.0: 자회사·별도 보상·결정 요청 제외)
s = prs.slides.add_slide(BLANK)
header(s, 5,
       "FDE 상주는 워크로드를 여는 고객에 집중하고, 그 외 고객은 업스트림·규격 채널로 협업합니다",
       [("「단 한 번도 고객 지향적인 적이 없었다. 진짜 고객 지향이 뭔지 이해하고, 그것을 위한 전략이 필요한 시점이 이미 됐다」", 18, False, INK),
        ("   송용호 · AX/PI센터장, 2026-09", 13.5, False, GRAY_2)])

# ---- 좌: 고객 선별 · 협업 채널 표 ----
LX, LW_ = MX, 11.9
Y0 = 2.80
tb(s, LX, Y0, LW_, 0.26, [[("고객 선별 · 협업 채널", 13.5, True, BLUE), ("   FDE 상주 조건: ① 트레이스·KV 정책 접근 허용  ② 캐시 관리자 코드를 자체 운영  ③ 물량·규격 파급력", 10.0, False, GRAY_2)]])
cols = [("고객 유형", 2.35), ("워크로드 접근", 2.2), ("협업 채널", 2.35), ("삼성 방식", 2.05), ("효과 극대화 포인트", LW_ - 2.35 - 2.2 - 2.35 - 2.05)]
hy = Y0 + 0.36
cx = LX
for name, w in cols:
    tb(s, cx + 0.08, hy, w - 0.16, 0.24, [(name, 9.75, True, GRAY_2)])
    cx += w
rect(s, LX, hy + 0.28, LW_, 0.012, fill=GRAY_2)
rows = [
    (True, "AI 랩", "Anthropic · OpenAI", "협약 시 트레이스 · KV 수명 정책 공유", "전략적 협약(SCA)의\n공동 설계 조항", "FDE 상주\nPod 3~5명", "Micron↔Anthropic 선례 · 캐시 관리자 정책을 함께 정의해 수명 보증 레퍼런스 확보 · 로고 효과"),
    (True, "NVIDIA 생태계", "CMX · Dynamo KVBM · NIXL", "파트너 프로그램 · 레퍼런스 스택 코드", "플러그인 · CMX 힌트 매핑\n공동 정의", "FDE 상주\n플랫폼 팀 파견", "CMX 첫 공급 관계 활용 · KVBM 플러그인 메인라인 머지 → 생태계 기본 디바이스"),
    (False, "하이퍼스케일러", "Meta · Google · MS · AWS", "내부 코드 상주 불가\n(보안 · 중립성)", "OCP 규격 · 업스트림\n(CacheLib · XFS · 커널)", "업스트림 기여\nOCP 규격 제안", "배치 표준 공동 주도 이력 · OCP 텔레메트리·FIP 규격 · 실측 공개로 신뢰 확보"),
    (False, "OEM · 네오클라우드", "자체 캐시 스택 없음", "삼성 레퍼런스 스택 채택", "레퍼런스 아키텍처\n(vLLM + LMCache + QLC)", "레퍼런스 스택\n공용 TCO 모델", "검증된 스택 제공으로 디자인인 · FDE 없이 확산 · 실측 데이터 재사용"),
]
ry = hy + 0.40
RH = 1.00
for hot, c1, c1b, c2, c3, c4, c5 in rows:
    if hot:
        rect(s, LX, ry, LW_, RH - 0.10, fill=TINT)
        rect(s, LX, ry, 0.06, RH - 0.10, fill=BLUE)
    cx = LX
    cells = [[(c1, 11.25, True, BLUE if hot else INK), (c1b, 9.0, False, GRAY)],
             [(ln, 9.5, False, GRAY) for ln in c2.split("\n")],
             [(ln, 9.5, False, GRAY) for ln in c3.split("\n")],
             [(ln, 10.0, True, BLUE if hot else INK) for ln in c4.split("\n")],
             [(c5, 9.0, False, GRAY)]]
    for (name, w), paras in zip(cols, cells):
        tb(s, cx + 0.12, ry + 0.06, w - 0.24, RH - 0.2, paras, anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)
        cx += w
    rect(s, LX, ry + RH - 0.05, LW_, 0.008, fill=LINE)
    ry += RH
tb(s, LX, ry + 0.02, LW_, 0.24, [[("선례  ", 9.5, True, INK), ("Palantir FDE(상주 · 성과 평가 · Anthropic·OpenAI GTM 채택) · Micron↔Anthropic SCA 2026-06(공동 설계 + 다년 공급 + 운영 통합 + 자본) · 삼성·SK의 Anthropic 계약엔 공동 설계 조항 부재", 8.75, False, GRAY)]], spacing=1.0)
# 단계별 통과 조건(개발실 범위 · 다음 단계로 가는 증명)
gy0 = ry + 0.34
gh = 9.42 - 0.20 - gy0
tb(s, LX, gy0, LW_, 0.24, [[("단계별 통과 조건", 11.25, True, BLUE), ("   각 단계의 증명이 다음 단계의 승인 근거", 9.5, False, GRAY_2)]])
gates = [("90일", "등대 고객 1사 트레이스 확보 · KV 캐시 실측(WAF·유효 DWPD) 공개 · 캐시 관리자 플러그인 PR 1건", False),
         ("12개월", "플러그인 메인라인 머지 · 고객 워크로드에서 QLC 유효 DWPD ≥ 1 실증 · 조건부 보증 초안(6장)", False),
         ("2027H1", "디자인인 1사 · 협약에 공동 설계 조항 제안 · 레퍼런스 스택 공개 → 공급 완화 전 락인", True)]
gw = (LW_ - 2 * 0.22) / 3
for i, (t, d, hot) in enumerate(gates):
    gx = LX + i * (gw + 0.22)
    gy = gy0 + 0.30
    rect(s, gx, gy, gw, gh - 0.34, fill=TINT if hot else WHITE, line=BLUE if hot else LINE, line_w=1.0 if hot else 0.75)
    tb(s, gx + 0.14, gy + 0.06, 0.95, 0.3, [(t, 12.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, gx + 1.06, gy + 0.05, gw - 1.2, gh - 0.44, [(d, 9.0, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.04)
    if i < 2:
        rect(s, gx + gw + 0.02, gy + (gh - 0.34) / 2 - 0.09, 0.18, 0.18, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)

# ---- 우: 개발실 내부 실행 3축 + 판돈·비용 ----
RX5 = LX + LW_ + 0.30
RW5 = RIGHT - RX5
tb(s, RX5, Y0, RW5, 0.26, [[("개발실 내부 실행", 13.5, True, BLUE), ("   별도 투자 없이 개발 자원 재배치로", 10.0, False, GRAY_2)]])
axes = [("조직", ["시스템 소프트웨어 조직 강화 (캐시 관리자 · I/O · 커널)", "Co-Design Pod 3~5명 · 개발실 소속 · 선별 고객 1~2사", "미주 법인 협업 · 고객 시간대 대응"]),
        ("인사", ["시스템 SW 전문가 채용·양성 · 기준 = 고객 코드를 읽고 고치는가", "본사 엔지니어 상주 로테이션 (3~6개월)", "성과 평가 = 머지 · 실측 공개 · 디자인인"]),
        ("문화", ["오픈소스 메인테이너·커미터 배출 · 업스트림 우선", "KV 캐시 실측(WAF · 유효 DWPD) 업계 최초 공개", "레퍼런스 프로젝트 운영으로 외부 기여 유입"])]
ay = Y0 + 0.36
AH = 1.16
for lab, lines in axes:
    rect(s, RX5, ay, RW5, AH, fill=WHITE, line=LINE, line_w=0.75)
    rect(s, RX5, ay, 0.8, AH, fill=BLUE)
    tb(s, RX5, ay, 0.8, AH, [(lab, 15, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, RX5 + 0.95, ay, RW5 - 1.1, AH, [(lines[0], 10.5, True, INK)] + [(l, 9.75, False, GRAY) for l in lines[1:]], anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)
    ay += AH + 0.12
# 판돈·비용
py_ = ay + 0.02
ph_ = 9.42 - 0.20 - py_
rect(s, RX5, py_, RW5, ph_, fill=TINT)
rect(s, RX5, py_, 0.06, ph_, fill=BLUE)
half = (RW5 - 0.5) / 2
tb(s, RX5 + 0.22, py_ + 0.10, half, 0.2, [("판돈 · 락인으로 얻는 점유율", 9.5, False, GRAY_2)])
tb(s, RX5 + 0.22, py_ + 0.30, half, 0.44, [("캐시 계층 QLC 0 → 50%", 15, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, RX5 + 0.22, py_ + 0.74, half, ph_ - 0.8, [("2030 추론 캐시 350EB 중 QLC 175EB(조건부 상방) · 락인 없으면 TLC 유지 · 디자인인 1사당 점유율 [사내 확인]", 8.75, False, GRAY)], spacing=1.0)
tb(s, RX5 + 0.22 + half + 0.16, py_ + 0.10, half, 0.2, [("비용 · 개발실 자원 투입", 9.5, False, GRAY_2)])
tb(s, RX5 + 0.22 + half + 0.16, py_ + 0.30, half, 0.44, [("별도 투자 없음", 15, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, RX5 + 0.22 + half + 0.16, py_ + 0.74, half, ph_ - 0.8, [("Pod 인력 3~5명 × 1~2사 재배치 · 시스템 SW 채용은 정원 내 · 실측 공개는 보안 검토만", 8.75, False, GRAY)], spacing=1.0)

band(s, 9.42, 0.80, "결론",
     "FDE는 워크로드를 여는 1~2사에 집중해 효과를 극대화하고, 나머지 고객은 업스트림·규격·레퍼런스 채널로 넓힙니다.\n판돈은 락인으로 얻는 캐시 계층 점유율, 비용은 개발실 개발 자원 투입입니다",
     main_size=16.5, next_step=6)
footer(s, "출처: Pragmatic Engineer·FDE Academy(Palantir FDE), Micron IR 2026-06-22·10-Q(SCA), NVIDIA CMX·Dynamo 문서, OCP 사양, 위키 qlc-execution-strategy(개발실 범위) · 점유율 수치는 위키 수요 모델 §4.3 조건부 상방, 사내 수치는 [사내 확인]", 5)
notes(s, "5장은 실행입니다. 4장의 3단계에 진입하는 수단을 고객 유형별로 나누고, 개발실 내부에서 실행 가능한 범위만 담았습니다. 리드의 인용은 송용호 AX/PI센터장의 발언입니다. "
      "FDE 상주는 모든 고객에 적용하지 않습니다. 조건은 세 가지입니다. 트레이스와 KV 수명 정책 접근을 허용하는가, 캐시 관리자 코드를 자체 운영하는가, 물량과 규격 파급력이 있는가. 이 조건을 만족하는 AI 랩(Anthropic·OpenAI)과 NVIDIA 생태계(CMX·Dynamo KVBM·NIXL)에 Pod 3~5명을 집중합니다. AI 랩은 전략적 협약의 공동 설계 조항으로 접근하며 Micron↔Anthropic이 선례이고, 캐시 관리자 정책을 함께 정의해 수명 보증 레퍼런스를 확보합니다. NVIDIA 생태계는 CMX 첫 공급 관계를 활용해 KVBM 플러그인을 메인라인에 머지하고 생태계 기본 디바이스가 됩니다. 하이퍼스케일러는 보안·중립성 때문에 내부 코드 상주가 불가하므로 OCP 규격과 업스트림(CacheLib·XFS·커널) 채널로 협업합니다. OEM·네오클라우드는 자체 캐시 스택이 없으므로 레퍼런스 스택(vLLM + LMCache + 삼성 QLC)과 공용 TCO 모델로 확산합니다. "
      "개발실 내부 실행은 별도 투자 없이 개발 자원 재배치로 합니다. 조직: 시스템 소프트웨어 조직 강화, 개발실 소속 Co-Design Pod, 미주 법인 협업. 인사: 고객 코드를 읽고 고칠 수 있는 시스템 SW 전문가 채용·양성(정원 내), 본사 엔지니어 상주 로테이션, 성과 평가는 머지·실측 공개·디자인인. 문화: 오픈소스 메인테이너 배출, 업스트림 우선, KV 캐시 실측 업계 최초 공개. 자회사 설립, 별도 보상 체계, 지분 참여, 결정 요청은 위키에만 두고 덱에서는 제외했습니다. "
      "단계별 통과 조건은 90일(등대 고객 트레이스 확보·KV 캐시 실측 공개·플러그인 PR), 12개월(메인라인 머지·유효 DWPD 1 이상 실증·조건부 보증 초안), 2027년 상반기(디자인인 1사·협약 공동 설계 조항 제안·레퍼런스 스택 공개)이며 각 단계의 증명이 다음 단계의 승인 근거입니다. 판돈은 락인으로 얻는 점유율입니다. 수요 모델에서 2030년 추론 캐시 계층 350EB 중 QLC는 호스트 협력이 성립할 때 조건부 상방 175EB(50%)이고, 성립하지 않으면 TLC가 유지됩니다. 디자인인 1사당 점유율 변화는 사내 수치로 확인합니다. 비용은 Pod 인력 3~5명 × 1~2사 재배치와 정원 내 채용이며 별도 투자가 없습니다. 실행의 마지막 리스크인 수명 보증·SLA가 6장입니다.")

# ================================================================ S6. 수명 보증 · SLA 리스크 (v5.0 신설) + 6장 요약 체인
s = prs.slides.add_slide(BLANK)
header(s, 6,
       "유효 DWPD 보증은 워크로드 리스크를 안으므로 텔레메트리 기반 조건부 보증으로 설계합니다",
       "관행은 5년 또는 TBW·DWPD 선도달 보증입니다. 호스트 배치를 전제로 한 유효 DWPD는 WAF가 오르면 그대로 삼성의 보증 부담이 됩니다.")

def _img6(name, x, y, w):
    return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))

# ---- 좌: 메커니즘 차트 + 리스크 시나리오 3 ----
LW6 = 6.4
_img6("sla_effective_dwpd.png", MX, 2.80, LW6)                   # 5.4×2.6 → 6.4×3.08
ry = 2.80 + 3.08 + 0.18
tb(s, MX, ry, LW6, 0.26, [("리스크 시나리오 · WAF가 오르는 경우", 12.0, True, BLUE)])
scen = [("① 워크로드 변화", "퇴거 정책 · 프리픽스 재사용률 · 세션 길이가 바뀌면 데이터 수명 분포가 바뀜 → WAF ↑ (KV 캐시 쓰기 강도 자체가 프레임워크별로 상이)"),
        ("② 오분류 · RUH 간섭", "수명 오분류와 RUH 간 간섭(noisy RUH)이 격리를 깨면 다른 핸들의 WAF까지 상승 (FAST'26 WARP)"),
        ("③ 고객 스택 업데이트", "캐시 관리자 · I/O 라이브러리 버전 변경으로 배치 힌트가 사라지면 정격 WAF ≈3으로 회귀")]
sy = ry + 0.32
for k, v in scen:
    rect(s, MX, sy + 0.06, 0.10, 0.10, fill=BLUE)
    tb(s, MX + 0.2, sy, LW6 - 0.2, 0.62, [[(k + "  ", 9.75, True, INK), (v, 9.0, False, GRAY)]], spacing=1.02)
    sy += 0.66
tb(s, MX, sy + 0.02, LW6, 0.26, [[("결과  ", 9.75, True, BLUE), ("보증 기간 내 TBW 조기 소진 → RMA · 교체 비용을 삼성이 부담", 9.5, False, GRAY)]])

# ---- 우: 보증 설계 원칙 5 ----
RX6 = MX + LW6 + 0.34
RW6 = RIGHT - RX6
rect(s, RX6, 2.80, RW6, 9.22 - 2.80 - 1.22, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RX6 + 0.3, 2.94, RW6 - 0.6, 0.28, [[("보증 설계 원칙", 13.5, True, BLUE), ("   관행을 유지하고, 유효 DWPD는 조건부로만 표기", 10.0, False, GRAY_2)]])
rect(s, RX6 + 0.3, 3.30, RW6 - 0.6, 0.012, fill=LINE)
principles = [
    ("1", "보증 기준은 관행대로 TBW · 물리 매체 기록량 선도달", "5년 또는 TBW·DWPD 선도달(삼성 PM9A3 · Micron 관행) · 유효 DWPD는 부가 표기이지 보증 기준이 아님"),
    ("2", "유효 DWPD는 WAF 밴드별 조건부 등급", "WAF ≤ 1.2 / ≤ 2.0 / > 2.0 각각에 보증 DWPD를 매핑 · 정격 0.58은 WAF 1.74에서 1.0 아래로 내려가므로 밴드 경계를 명시"),
    ("3", "양측이 같은 텔레메트리로 WAF를 관측", "OCP SMART C0 물리 매체 기록량 ÷ 호스트 기록량 = WAF · 분기 실측 리포트를 계약 부속으로"),
    ("4", "배치 규격 준수 조건", "RUH 매핑 가이드 · 캐시 관리자 정책 준수 시에만 유효 DWPD 적용, 미준수 · 힌트 손실 시 정격 기준으로 자동 복귀"),
    ("5", "재협상 · 감량 운영 조항", "WAF 초과가 지속되면 등급 재조정 또는 감량 운영(3장 FIP 유사) · 무상 교체가 아니라 조건 재설정"),
]
py6 = 3.44
for no, head, body in principles:
    rect(s, RX6 + 0.3, py6 + 0.03, 0.30, 0.30, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, RX6 + 0.3, py6 + 0.03, 0.30, 0.30, [(no, 10.5, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, RX6 + 0.74, py6, RW6 - 1.04, 0.26, [(head, 11.25, True, INK)])
    tb(s, RX6 + 0.74, py6 + 0.27, RW6 - 1.04, 0.5, [(body, 9.25, False, GRAY)], spacing=1.02)
    py6 += 0.84
tb(s, RX6 + 0.3, py6 + 0.02, RW6 - 0.6, 0.4,
   [[("근거  ", 9.5, True, INK), ("삼성 PM9A3 보증(5년 또는 DWPD 선도달) · Micron 엔터프라이즈 SSD 보증 · OCP Cloud SSD SMART C0(WAF 산출 목적 명시) · FAST'26 WARP(조건부 WAF) · CHEOPS'25(KV 오프로드 I/O 특성)", 9.0, False, GRAY)]], spacing=1.0)

band_chain(s, 9.10, 1.06, "요약", [
    ("1 문제", "요구 이동: 고용량\n1~3 DWPD · 동급 2~10배"),
    ("2 해법 사다리", "보상은 상위 계층으로\nWAF는 호스트의 지렛대"),
    ("3 신뢰성", "다이 8배 ↑\nSSD 내부 해법"),
    ("4 역량", "디바이스 → 워크로드\n→ 고객 시스템"),
    ("5 실행", "FDE 선별 집중\n개발실 자원 투입"),
    ("6 보증 · SLA", "TBW 기준 유지\nWAF 조건부 유효 DWPD"),
], head_size=11.25, body_size=9.75)
footer(s, "출처: 삼성 PM9A3·Micron 엔터프라이즈 SSD 보증 정책, OCP NVMe Cloud/Datacenter SSD 사양(SMART C0), USENIX FAST'26 WARP, ACM CHEOPS'25, P5336·6550 ION·LC9 사양(정격 DWPD) · 유효 DWPD 곡선은 정격 WAF ≈3 가정의 산식(⚠️)", 6)
notes(s, "6장은 수명 보증과 SLA 리스크입니다. 4장·5장의 전략은 고객 시스템 위에서 유효 DWPD를 보증하는 수익 모델을 전제하는데, 그 보증은 워크로드 변화 리스크를 삼성이 떠안는 구조입니다. 관행은 5년 또는 TBW·DWPD 선도달 보증이고, 정격 DWPD는 WAF 약 3(랜덤 4KB) 기준으로 산정됩니다. 호스트 배치로 WAF가 1에 가까우면 유효 DWPD는 정격의 약 3배가 되지만, WAF가 오르면 그대로 내려갑니다. 왼쪽 차트에서 정격 0.58(61TB QLC)은 WAF 1.74에서 보증선 1.0 아래로 내려가고, 정격 0.3(245TB)은 WAF 1.0에서도 0.9에 그칩니다. "
      "리스크 시나리오는 세 가지입니다. 첫째, 워크로드 변화: 퇴거 정책·프리픽스 재사용률·세션 길이가 바뀌면 데이터 수명 분포가 바뀌어 WAF가 오릅니다. KV 캐시 오프로드의 쓰기 강도 자체가 프레임워크에 따라 크게 다릅니다(CHEOPS 2025). 둘째, 오분류·RUH 간섭: FAST'26 WARP는 수명 오분류와 RUH 간 간섭이 격리를 깨면 다른 핸들의 WAF까지 오른다고 보고합니다. 셋째, 고객 스택 업데이트: 캐시 관리자나 I/O 라이브러리 버전이 바뀌어 배치 힌트가 사라지면 정격 WAF 3으로 회귀합니다. 결과는 보증 기간 내 TBW 조기 소진과 RMA·교체 비용입니다. "
      "설계 원칙은 다섯 가지입니다. 첫째, 보증 기준은 관행대로 TBW·물리 매체 기록량 선도달로 두고 유효 DWPD는 부가 표기로만 씁니다. 둘째, 유효 DWPD는 WAF 밴드별 조건부 등급으로 표기합니다. 셋째, OCP SMART C0의 물리 매체 기록량과 호스트 기록량으로 양측이 같은 WAF를 관측하고 분기 실측 리포트를 계약 부속으로 둡니다. 넷째, RUH 매핑 가이드와 캐시 관리자 정책을 준수할 때만 유효 DWPD를 적용하고 미준수·힌트 손실 시 정격 기준으로 자동 복귀합니다. 다섯째, WAF 초과가 지속되면 등급 재조정 또는 감량 운영으로 대응하며 무상 교체가 아니라 조건 재설정입니다. 이 설계는 5장의 텔레메트리·실측 공개 실행 항목과 3장의 감량 운영 정책을 계약 언어로 옮긴 것입니다. 하단 요약 체인은 6장의 논리입니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
