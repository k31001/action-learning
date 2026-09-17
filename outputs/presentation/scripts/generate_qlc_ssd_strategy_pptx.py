# -*- coding: utf-8 -*-
"""QLC eSSD 전략 — 3장 덱 생성 v2 (시각 중심: 글 최소, 그림·도형으로 논증).

S1 배경: 3기 스트립 + 이정표 타임라인 + 통합 그래프 + 키넘버 스티커
S2 역량: 갭 타일 4 + Phase 1·2·3 스택 그림(고객 시스템 5계층 중 우리가 닿는 층을 색으로) + 진행 바(삼성 현 위치) + 협업 기업 로고
S3 실행: 교환 그림(삼성 개발실 ↔ 고객 시스템: 위 화살표 "우리가 들어간다", 아래 화살표 "워크로드가 온다", 가운데 계약 자물쇠)
        + 대상 로고 스트립 + 5축 타일 + 90일·1년·3년 핀 + 결정 요청

디자인 시스템: outputs/presentation/ssd-strategy.pptx 승계
  20 x 11.25 in 캔버스 / Arial 단일 폰트 / Samsung Blue #1428A0 단일 액센트
  헤더(조직명·문서등급·킥커·30pt 액션 타이틀·20pt 리드·헤어라인) / 푸터(출처·페이지)
  틴트 카드 #F4F6FC(무테) · 아웃라인 카드 흰색+#D9D9D9 0.75pt · 다크 블루 정리 밴드 · 직각 사각형

실행: .venv/bin/python outputs/presentation/scripts/generate_qlc_ssd_strategy_pptx.py
출력: outputs/presentation/qlc-ssd-strategy.pptx
렌더 검증용 오버라이드: FONT_LATIN=NanumGothic FONT_EA=NanumGothic OUT_PATH=<scratch>.pptx
콘텐츠 소스: outputs/report/qlc-ssd-strategy-report.md (PPT 압축 맵) · outputs/presentation/qlc-ssd-strategy-outline.md
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
TOTAL = 3

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
    tb(slide, MX, 2.04, CW, 0.44, [(lead, 20, False, GRAY)])
    rect(slide, MX, 2.62, CW, 0.014, fill=LINE)


def footer(slide, source, no):
    tb(slide, MX, 10.49, 15.6, 0.34, [(source, 16, False, GRAY)])
    tb(slide, 17.55, 10.49, 1.66, 0.34, [(f"{no:02d} / {TOTAL:02d}", 18, False, GRAY)], align=PP_ALIGN.RIGHT)


def band(slide, y, h, label, main, main_size=22):
    rect(slide, MX, y, CW, h, fill=BLUE)
    tb(slide, MX + 0.45, y, 1.6, h, [(label, 18, False, WHITE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(slide, MX + 2.0, y, CW - 2.4, h, [(main, main_size, True, WHITE)], anchor=MSO_ANCHOR.MIDDLE)


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


# ================================================================ S1. 배경
s = prs.slides.add_slide(BLANK)
header(s, "QLC eSSD 전략 · 배경: 트렌드 변화와 시장 흐름",
       "요구는 2022년에 정의되고 물량은 2024년에 터졌으며, 다음 무대는 추론 캐시 티어입니다",
       "세 국면의 구매 기준이 어떻게 바뀌는지, 그리고 2030년까지의 수요·비중·매출입니다.")

# 3기 스트립
E_Y, E_H, E_W = 2.80, 2.02, 5.92
eras = [
    ("초기 · 2018~2023", "TB당 원가 · 랙 밀도", False,
     [("배경  ", "데이터 레이크 · HDD 대역폭 붕괴 · 배치 표준 비준"), ("삼성  ", "61TB 1년 후발")]),
    ("현재 · 2024~2026", "TB당 와트 · 공급 확보", False,
     [("배경  ", "추론 서버 전력 효율 · 245TB 경쟁 · HDD 완판"), ("삼성  ", "물량 1위(35.1%), 용량 후발")]),
    ("향후 · 2027~2030", "유효 DWPD · 토큰 경제성", True,
     [("배경  ", "KV cache 오프로드 · 2027년 75~100EB"), ("삼성  ", "디바이스 확보, 시스템 연결 공백")]),
]
for i, (label, crit, hot, lines) in enumerate(eras):
    x = MX + i * (E_W + 0.33)
    if hot:
        rect(s, x, E_Y, E_W, E_H, fill=TINT)
        rect(s, x, E_Y, 0.08, E_H, fill=BLUE)
    else:
        rect(s, x, E_Y, E_W, E_H, fill=WHITE, line=LINE, line_w=0.75)
    ix, iw = x + 0.38, E_W - 0.76
    tb(s, ix, E_Y + 0.20, iw, 0.30, [(label, 18, True, BLUE)])
    tb(s, ix, E_Y + 0.56, iw, 0.24, [("구매 기준", 12.75, False, GRAY_2)])
    tb(s, ix, E_Y + 0.80, iw, 0.44, [(crit, 21, True, INK)])
    ly = E_Y + 1.32
    for (k, v) in lines:
        tb(s, ix, ly, iw, 0.30, [[(k, 14.25, True, INK), (v, 14.25, False, GRAY)]])
        ly += 0.31
    if i < 2:
        rect(s, x + E_W + 0.09, E_Y + E_H / 2 - 0.09, 0.16, 0.18, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)

# 이정표 타임라인
TL_Y = 5.12
rect(s, MX + 0.3, TL_Y, CW - 0.6, 0.02, fill=LINE)
milestones = [
    (0.05, "2022-12", "배치 표준 비준(Meta·Google)"),
    (0.25, "2023-07", "61TB QLC 세계 최초(Solidigm)"),
    (0.47, "2024", "QLC eSSD 30EB, 전년 4배"),
    (0.69, "2026-05", "245TB 첫 출하(Micron)"),
    (0.91, "2027", "KV cache NAND 75~100EB"),
]
for frac, d, t in milestones:
    cx = MX + 0.3 + (CW - 0.6) * frac
    rect(s, cx - 0.08, TL_Y - 0.07, 0.16, 0.16, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, cx - 1.7, TL_Y + 0.16, 3.4, 0.24, [(d, 13.5, True, INK)], align=PP_ALIGN.CENTER)
    tb(s, cx - 1.7, TL_Y + 0.38, 3.4, 0.24, [(t, 12.75, False, GRAY)], align=PP_ALIGN.CENTER)

# 그래프 + 스티커
C_Y, C_H = 5.80, 3.48
C_W = C_H * CHART_ASPECT
s.shapes.add_picture(CHART, Inches(MX), Inches(C_Y), height=Inches(C_H))
SX = MX + C_W + 0.30
SW = RIGHT - SX
rect(s, SX, C_Y, SW, C_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, SX + 0.34, C_Y + 0.22, SW - 0.68, 0.30, [("그래프가 말하는 것", 18, True, BLUE)])
stats = [("10배", "QLC 비트, 2025년 → 2030년"), ("정체", "QLC 매출, 2026년 $32B → 2030년 $37B(e)"),
         ("350EB", "2030년 추론 캐시 티어 수요(전 미디어)")]
sy = C_Y + 0.66
for num, lab in stats:
    tb(s, SX + 0.34, sy, 1.75, 0.62, [(num, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, SX + 2.12, sy, SW - 2.46, 0.62, [(lab, 14.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)
    sy += 0.66
rect(s, SX + 0.34, sy + 0.02, SW - 0.68, 0.012, fill=LINE)
tb(s, SX + 0.34, sy + 0.10, SW - 0.68, C_H - (sy - C_Y) - 0.16,
   [("이익은 비트가 아니라 시스템 위의 TCO에서 나옵니다", 15.75, True, INK)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)

band(s, 9.42, 0.80, "결론", "니어라인 HDD 대체 대신, 오늘 TLC가 서비스하는 추론 캐시 티어를 QLC로 가져갑니다")
footer(s, "출처: TrendForce 분기 실측(2022~2Q26)·QLC 30EB(2024)·SanDisk FMS 2026·Meta·Solidigm 발표 종합, 2026~2030은 추정(e) · 상세: QLC eSSD 전략 보고서 1~3장", 1)
notes(s, "배경 한 장입니다. 2022년은 QLC 주문의 해가 아니라 조건이 갖춰진 해였습니다: 전문 벤더(Solidigm) 출범, 하이퍼스케일러 주도 폼팩터(E1.S/E1.L), Meta·Google의 배치 표준 비준(2022-12), NAND 가격 급락, 학습 데이터셋 6배. 하이퍼스케일러가 원한 것은 HDD 대역폭 붕괴를 메우는 용량 계층(Meta: 10 MB/s/TB), 공급자가 판 것은 1U에 1PB의 TCO였습니다. 물량은 AI 추론 서버의 전력 효율이 우선순위가 된 2024년에 터졌습니다(TrendForce 30EB, 4배). 구매 기준은 TB당 원가·랙 밀도 → TB당 와트·공급 확보 → 유효 DWPD·토큰 경제성으로 이동합니다. 향후 3~5년 공급 부족 국면에서 HDD 대체는 커머디티 경쟁이라 들어가지 않고, KV cache 오프로드가 만드는 추론 캐시 티어를 QLC로 가져갑니다. 이 티어는 오늘 TLC(1~3 DWPD)가 서비스합니다. 그래프: 비트는 10배, 가격 정상화 기준선에서 매출은 정체, 진한 파랑은 호스트 협력 배치가 성립할 때의 조건부 상방. 모델 가정은 위키 qlc-ssd-market.md §4.3.")

# ================================================================ S2. 요구사항·역량·기술 전략
s = prs.slides.add_slide(BLANK)
header(s, "QLC eSSD 전략 · 요구사항과 역량, 기술 전략",
       "QLC가 캐시 티어에 들어가려면 디바이스에서 고객 시스템 안까지 세 단계로 올라가야 합니다",
       "갭은 내구성·스트림·접점 세 가지이고 수단은 이미 있습니다. 세 단계의 그림과 삼성의 현 위치, 협업할 기업입니다.")

# 갭 타일 4
T_Y, T_H, T_W, T_GAP = 2.80, 1.06, 4.41, 0.26
tiles = [
    ("10~40배", 1.95, "내구성 갭", "QLC 0.075~0.6 vs TLC 1~3 DWPD"),
    ("25배", 1.45, "스트림 갭", "RUH 2~8개 vs 200개 이상"),
    ("0건", 1.25, "접점 공백", "캐시 관리자 4종의 배치 언급"),
    ("3.22 → 1.03", 2.55, "수단은 있음", "배치 표준 WAF 실측"),
]
for i, (num, nw, lab, desc) in enumerate(tiles):
    x = MX + i * (T_W + T_GAP)
    hot = i == 3
    rect(s, x, T_Y, T_W, T_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.28, T_Y, nw, T_H, [(num, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 0.28 + nw + 0.12, T_Y, T_W - nw - 0.6, T_H,
       [(lab, 15.75, True, INK), (desc, 13.5, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)

# Phase 스택 그림
P_Y, P_H, P_W = 4.08, 3.80, 5.92
LAYERS = ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O 라이브러리", "커널 · 플랫폼", "SSD 디바이스"]
phases = [
    ("Phase 1", "디바이스를 잘 만든다", ["none", "none", "none", "none", "own"],
     "KV-ready QLC: RUH 200+, 수명 보증 조건표"),
    ("Phase 2", "워크로드 분석으로 최적화한다", ["none", "none", "touch", "touch", "own"],
     "트레이스 → RUH 정책 → WAF·DWPD 실측 공개"),
    ("Phase 3", "고객 시스템 안에서 함께 설계한다", ["touch", "own", "own", "own", "own"],
     "메인라인 머지 · 공용 TCO 모델 · 공동 계약"),
]
STK_W, LH, LG = 3.30, 0.40, 0.06
for i, (ph, ttl, states, outcome) in enumerate(phases):
    x = MX + i * (P_W + 0.33)
    hot = i == 2
    rect(s, x, P_Y, P_W, P_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.38, P_Y + 0.16, P_W - 0.76, 0.34, [[(ph + "  ", 18, True, BLUE), (ttl, 18, True, INK)]])
    sx, sy0 = x + 0.42, P_Y + 0.62
    ys = stack(s, sx, sy0, STK_W, LAYERS, states, layer_h=LH, gap=LG)
    ax = sx + STK_W + 0.22            # 주석 영역 시작
    aw = x + P_W - ax - 0.20
    if i == 0:
        tb(s, ax, ys[4] - 0.02, aw, 0.46, [("우리가 만드는 것", 13.5, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
        tb(s, ax, ys[0], aw, 1.6, [("고객 시스템은 밖에 있습니다", 13.5, False, GRAY_2)], spacing=1.05)
    elif i == 1:
        top, bot = ys[0] + 0.05, ys[4] + LH - 0.05
        v_arrow(s, ax, top, 0.30, bot - top, fill=BLUE_T2)
        v_arrow(s, ax + 0.42, top, 0.30, bot - top, up=True, fill=BLUE)
        tb(s, ax + 0.85, ys[1] - 0.02, aw - 0.85, 0.46, [("트레이스", 13.5, True, INK), ("워크로드가 내려옴", 12.75, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
        tb(s, ax + 0.85, ys[3] - 0.02, aw - 0.85, 0.46, [("정책", 13.5, True, BLUE), ("최적화가 올라감", 12.75, False, GRAY)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    else:
        pw = person(s, ax, ys[1] - 0.06, 0.54, color=BLUE)
        tb(s, ax + pw + 0.12, ys[1] - 0.02, aw - pw - 0.12, 0.46, [("상주 · 공동 설계", 13.5, True, BLUE)],
           anchor=MSO_ANCHOR.MIDDLE)
        tb(s, ax, ys[3] - 0.02, aw, 0.46, [("메인라인 머지", 13.5, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
        tb(s, ax, ys[0] - 0.02, aw, 0.46, [("공용 TCO 모델", 13.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + 0.38, P_Y + 3.02, P_W - 0.76, 0.62, [(outcome, 14.25, True, INK)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)

# 범례 (스택 색)
LEG_Y = P_Y + P_H + 0.08
lx = MX
for fill, line, t in [(BLUE, None, "우리 코드·제품"), (BLUE_T2, None, "관측·이해"), (WHITE, LINE, "고객 영역")]:
    rect(s, lx, LEG_Y + 0.04, 0.26, 0.18, fill=fill, line=line, line_w=0.75)
    tb(s, lx + 0.34, LEG_Y, 1.6, 0.26, [(t, 12.75, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    lx += 2.0

# 진행 바 + 삼성 현 위치
BAR_Y, BAR_H = LEG_Y + 0.34, 0.18
for i in range(3):
    x = MX + i * (P_W + 0.33)
    rect(s, x, BAR_Y, P_W, BAR_H, fill=WHITE, line=LINE, line_w=0.75)
rect(s, MX, BAR_Y, P_W, BAR_H, fill=BLUE)
rect(s, MX + P_W + 0.33, BAR_Y, P_W * 0.28, BAR_H, fill=BLUE_T2)
mk_x = MX + P_W + 0.33 + P_W * 0.28
rect(s, mk_x - 0.13, BAR_Y + BAR_H + 0.04, 0.26, 0.20, fill=BLUE, shape=MSO_SHAPE.ISOSCELES_TRIANGLE)
tb(s, mk_x + 0.22, BAR_Y + BAR_H, 7.0, 0.30,
   [[("삼성 현 위치  ", 13.5, True, BLUE), ("디바이스는 확보, 워크로드 실측은 미공개, 캐시 관리자 기여 0", 12.75, False, GRAY)]],
   anchor=MSO_ANCHOR.MIDDLE)

# 협업 기업
G_Y = BAR_Y + BAR_H + 0.38
tb(s, MX, G_Y, CW, 0.28, [("협업할 기업 · 목적을 달리해 다섯 층에 동시 진입", 16.5, True, BLUE)])
groups = [
    ("플랫폼 게이트", [("logo", "nvidia")]),
    ("스펙 상류", [("logo", "anthropic"), ("logo", "openai")]),
    ("물량 · 활성화", [("logo", "meta"), ("logo", "google"), ("logo", "microsoft"), ("logo", "aws")]),
    ("실증 · 채널", [("chip", "VAST Data"), ("chip", "DDN"), ("chip", "WEKA")]),
    ("오픈소스", [("chip", "LMCache"), ("chip", "Mooncake"), ("chip", "FlexKV"), ("logo", "vllm")]),
]
GW = (CW - 0.25 * 4) / 5
GB_Y, GB_H = G_Y + 0.34, 10.28 - (G_Y + 0.34)
for i, (gl, items) in enumerate(groups):
    x = MX + i * (GW + 0.25)
    rect(s, x, GB_Y, GW, GB_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, x + 0.22, GB_Y + 0.10, GW - 0.44, 0.26, [(gl, 14.25, True, INK)])
    lh = 0.30 if len(items) <= 2 else 0.24
    logo_row(s, items, x + 0.22, GB_Y + 0.48, lh, gap=0.16 if len(items) > 2 else 0.28, max_w=GW - 0.44, chip_size=12.5)

footer(s, "출처: StorageReview·Solidigm·Kioxia 스펙(DWPD), ScaleFlux 2026-07(RUH 200+), GitHub README 확인(LMCache·Mooncake·FlexKV·3FS), CacheLib FDP 문서(WAF) · 로고는 식별 표시", 2)
notes(s, "요구사항과 역량 한 장입니다. 갭 세 가지: 내구성(QLC 정격 0.075~0.6 vs TLC 1~3 DWPD, 10~40배), 스트림(RUH 2~8 vs 200+), 접점(KV 캐시 관리자 4종 코드에 배치·내구성 언급 0). 수단은 있습니다(CacheLib 실측 WAF 3.22→1.03, XFS write streams RocksDB -35%, ScaleFlux 유효 7~10 DWPD). 그림은 고객 시스템 5계층(응용·추론 엔진 / KV 캐시 관리자 / I/O 라이브러리 / 커널·플랫폼 / SSD)에서 우리가 닿는 층을 색으로 표시합니다. Phase 1은 SSD 층만 우리 것입니다(KV-ready QLC: RUH 200+, 수명 보증 조건표). Phase 2는 고객 워크로드 트레이스가 내려오고 최적화 정책이 올라갑니다. I/O·커널 층을 관측·부착합니다(업계 최초 KV cache WAF 실측 공개가 목표). Phase 3는 캐시 관리자·I/O·커널에 우리 코드가 메인라인으로 들어가고, 우리 엔지니어가 고객 옆에 상주하며, 공용 TCO 모델로 응용 층까지 이해합니다(FlexKV의 vLLM·SGLang·Dynamo 메인라인 머지가 co-design의 증거). 삼성 현 위치는 Phase 1 확보, Phase 2 진입: KV cache 백서 2종으로 측정 역량은 있으나 트레이스 기반 RUH 정책·WAF 실측이 미공개이고, 캐시 관리자 4종에 기여가 없습니다. 협업은 층별로 목적이 다릅니다: NVIDIA(CMX 플랫폼 게이트), Anthropic·OpenAI(스펙 상류), 하이퍼스케일러(물량·활성화), VAST·DDN·WEKA(실증 채널), 오픈소스 커뮤니티(업스트림). 오케스트레이션 자체는 만들지 않습니다.")

# ================================================================ S3. 실행 전략·고객 협업
s = prs.slides.add_slide(BLANK)
header(s, "QLC eSSD 전략 · 실행 전략과 고객 협업",
       "고객의 워크로드를 받고 고객 시스템 안으로 들어갑니다. 조직·보상·계약이 그 길을 엽니다",
       "실행의 목표는 두 가지입니다. 다섯 축이 그 길을 열고, 90일·1년·3년으로 갑니다.")

M_Y, M_H = 2.80, 4.10
# 좌: 삼성 개발실
LB_W = 3.95
rect(s, MX, M_Y, LB_W, M_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, MX + 0.34, M_Y + 0.22, LB_W - 0.68, 0.32, [("삼성 개발실", 18, True, BLUE)])
tb(s, MX + 0.34, M_Y + 0.56, LB_W - 0.68, 0.26, [("들고 들어가는 것", 12.75, False, GRAY_2)])
gives = ["KV-ready QLC + 수명 보증", "상주 엔지니어(Co-Design Pod)", "업스트림 코드 · 공용 TCO 모델", "다년 공급 · 선급 · 자본"]
gy = M_Y + 0.98
for g in gives:
    rect(s, MX + 0.34, gy + 0.11, 0.16, 0.16, fill=BLUE)
    tb(s, MX + 0.62, gy, LB_W - 0.96, 0.38, [(g, 14.25, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    gy += 0.62
rect(s, MX + 0.34, M_Y + M_H - 0.78, LB_W - 0.68, 0.012, fill=LINE)
tb(s, MX + 0.34, M_Y + M_H - 0.68, LB_W - 0.68, 0.5,
   [("자회사 · Pod · 별도 보상이 뒤를 받칩니다", 12.75, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)

# 우: 고객 시스템
RB_W = 4.36
RBX = RIGHT - RB_W
rect(s, RBX, M_Y, RB_W, M_H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RBX + 0.34, M_Y + 0.22, RB_W - 0.68, 0.32, [("고객 시스템", 18, True, BLUE)])
tb(s, RBX + 0.34, M_Y + 0.56, RB_W - 0.68, 0.26, [("우리 사람과 코드가 들어가는 자리", 12.75, False, GRAY_2)])
cys = stack(s, RBX + 0.34, M_Y + 0.98, 2.62, ["응용 · 추론 엔진", "KV 캐시 관리자", "I/O · 커널", "SSD: 삼성 QLC"],
            ["none", "touch", "own", "own"], layer_h=0.5, gap=0.09)
_px = RBX + 0.34 + 2.62 + 0.16
pw = person(s, _px, cys[1] + 0.03, 0.44, color=BLUE)
tb(s, _px + pw + 0.10, cys[1], 0.75, 0.5, [("상주", 12.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
tb(s, _px, cys[2], 1.05, 0.5, [("머지", 12.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)

# 중앙: 교환 화살표 + 계약
CX0 = MX + LB_W + 0.30
CX1 = RBX - 0.30
CWID = CX1 - CX0
A_H = 1.02
ar1 = rect(s, CX0, M_Y + 0.30, CWID, A_H, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)
ar1.adjustments[0] = 0.78
ar1.adjustments[1] = 0.30
tb(s, CX0 + 0.45, M_Y + 0.30, CWID - 1.6, A_H,
   [("① 고객 시스템 안으로 들어간다", 18, True, WHITE), ("상주 엔지니어 · 업스트림 코드 · 수명 보증 · 자본", 14.25, False, WHITE)],
   anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)
LK_Y = M_Y + 0.30 + A_H + 0.20
LK_H = M_H - 2 * (0.30 + A_H) - 0.40 + 0.30
rect(s, CX0 + 0.6, LK_Y, CWID - 1.2, LK_H, fill=WHITE, line=BLUE, line_w=1.5)
tb(s, CX0 + 0.9, LK_Y, CWID - 1.8, LK_H,
   [("계약으로 고정 · 창은 2027년 상반기까지", 15.75, True, BLUE),
    ("공급 + 공동 최적화 + 워크로드 접근권 + 수명 보증", 14.25, False, INK)],
   anchor=MSO_ANCHOR.MIDDLE, align=PP_ALIGN.CENTER, spacing=1.08)
B_Y = LK_Y + LK_H + 0.20
ar2 = rect(s, CX0, B_Y, CWID, A_H, fill=BLUE_T2, shape=MSO_SHAPE.LEFT_ARROW)
ar2.adjustments[0] = 0.78
ar2.adjustments[1] = 0.30
tb(s, CX0 + 1.2, B_Y, CWID - 1.6, A_H,
   [("② 워크로드가 온다", 18, True, INK), ("트레이스 · KV 수명 정책 · 레퍼런스 스펙 자리 · 활성화 약정", 14.25, False, INK)],
   anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)

# 대상 로고 스트립
LS_Y = M_Y + M_H + 0.14
tb(s, MX, LS_Y, 0.9, 0.34, [("대상", 14.25, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
logo_row(s, [("logo", "anthropic"), ("logo", "openai"), ("logo", "nvidia"), ("logo", "meta"), ("logo", "google"),
             ("logo", "microsoft"), ("logo", "aws"), ("chip", "VAST Data"), ("chip", "DDN"), ("chip", "WEKA")],
         MX + 0.9, LS_Y + 0.02, 0.30, gap=0.34, max_w=CW - 1.0, chip_size=12.5)

# 5축 타일
F_Y, F_H = LS_Y + 0.56, 1.00
axes = [("전략", "베팅: 추론 캐시 티어\nHDD 대체는 안 함"),
        ("조직", "SV 소프트웨어 자회사\n+ 고객 상주 Pod"),
        ("인사", "별도 보상 · 앵커 5명\n본사 엔지니어 상주"),
        ("문화", "업스트림 우선\nKV 실측 최초 공개"),
        ("재무", "공동 플랫폼 계약 · 보증\n지분으로 접근권")]
FW = (CW - 0.23 * 4) / 5
for i, (lab, txt) in enumerate(axes):
    x = MX + i * (FW + 0.23)
    rect(s, x, F_Y, FW, F_H, fill=WHITE, line=LINE, line_w=0.75)
    rect(s, x, F_Y, 0.85, F_H, fill=BLUE)
    tb(s, x, F_Y, 0.85, F_H, [(lab, 15.75, True, WHITE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    l1, l2 = txt.split("\n")
    tb(s, x + 1.00, F_Y, FW - 1.12, F_H, [(l1, 13.5, True, INK), (l2, 13.5, False, GRAY)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)

# 90일·1년·3년 핀
TL_Y = F_Y + F_H + 0.34
rect(s, MX + 0.2, TL_Y + 0.28, CW - 0.4, 0.02, fill=LINE)
tiers = [("90일", "제품 정의 · 업스트림 PR · Anthropic 조항 · Pod 1호"),
         ("1년", "자회사 · Pod 2사 상주 · CMX 인증 · 계약 1건"),
         ("3년", "캐시 티어 QLC 25%+ · 계약 3건 · 기본 백엔드")]
TW = CW / 3
for i, (tl, body) in enumerate(tiers):
    x = MX + i * TW + 0.2
    rect(s, x - 0.08, TL_Y + 0.21, 0.16, 0.16, fill=BLUE, shape=MSO_SHAPE.OVAL)
    tb(s, x + 0.2, TL_Y - 0.06, TW - 0.5, 0.3, [[(tl + "  ", 14.25, True, BLUE), (body, 13.5, False, GRAY)]],
       anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.52, 0.76, "결정 요청",
     "① 자회사 설립과 별도 보상 승인   ② Anthropic 공동 최적화 조항 · NVIDIA 기술 협의 착수   ③ Co-Design Pod 1호 발족",
     main_size=20)
footer(s, "출처: SK hynix 뉴스룸·CNBC(2026-01), levels.fyi 2026, Micron IR·10-Q, Pure PR, Blackstone·Bloomberg(DDN) · 규모·시점은 추정, 사내 수치는 [사내 확인]", 3)
notes(s, "실행 전략 한 장입니다. 목표는 두 가지입니다. ① 고객 시스템 안으로 들어간다: 상주 엔지니어(Co-Design Pod, Palantir FDE·NVIDIA DevTech 모델), 캐시 관리자·I/O·커널에 메인라인으로 머지되는 업스트림 코드, 수명 보증(DWPD·WAF·W/TB SLA), 다년 공급·선급·자본. ② 워크로드가 온다: KV 블록 트레이스, 캐시 관리자의 수명 정책, 레퍼런스 스펙에 삼성 구현이 기본값으로 앉는 자리, 활성화 약정. 둘은 서로를 강화하므로 첫 계약에 들어갈 권리와 받을 권리를 함께 담고, 공급자 우위가 남은 2027년 상반기까지 계약으로 고정합니다. 다섯 축은 이 두 목표를 여는 수단입니다: 전략(하나의 베팅, HDD 대체 제외, 오케스트레이션은 만들지 않음), 조직(실리콘밸리 소프트웨어 자회사 + Co-Design Pod + 시스템 TCO 모델 조직, 본사 SSD와 동일 P&L 지표), 인사(자회사 지분·RSU형 별도 보상으로 시장가 채용, 고객·생태계 출신 앵커 5명, 본사 펌웨어 엔지니어 6~12개월 상주 로테이션. 스타트업 팀 인수는 제외), 문화(업스트림 우선, 결과 평가, KV cache 배치 표준 WAF 실측 업계 최초 공개), 재무(공동 플랫폼 계약, 수명 보증 상품, TCO 연동 가격, DDN·Tensormesh 지분). 90일: KV-ready QLC 정의, LMCache·FlexKV 업스트림 PR, Anthropic 공급계약 공동 최적화 조항 제안, NVIDIA DOCA Memos 힌트 매핑 협의, Pod 1호 발족, 자회사 설계안. 1년: 자회사 출범·앵커 영입, Pod 2사 상주, CMX/STX 인증, 공동 플랫폼 계약 1건, 수명 보증 상품. 3년: 캐시 티어 QLC 침투 25%+ 중 삼성 40%, 계약 3건, 캐시 관리자 4종 기본 백엔드. 선례와 수치는 보고서 6장·위키 qlc-execution-strategy.md.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
