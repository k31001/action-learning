# -*- coding: utf-8 -*-
"""향후 계획 2장 덱 생성 (전략 3 FDP 4주 계획 + 4대 전략 종합 타임라인). v2: 키워드형.

디자인 시스템: generate_ssd_strategy_pptx.py 승계
  20 x 11.25 in 캔버스 / Arial 단일 폰트 / Samsung Blue #1428A0 단일 액센트
  헤더(조직명·문서등급·킥커·33pt 액션 타이틀·21pt 리드·헤어라인) / 푸터(출처·페이지)
  틴트 카드 #F4F6FC(무테) · 아웃라인 카드 흰색+#D9D9D9 0.75pt · 직각 사각형

실행: .venv/bin/python outputs/presentation/scripts/generate_future_plan_pptx.py
출력: outputs/presentation/future-plan.pptx
콘텐츠 소스: outputs/presentation/future-plan-outline.md
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.oxml.ns import qn

# ---- 디자인 토큰 ----
BLUE = RGBColor(0x14, 0x28, 0xA0)
BLUE_T2 = RGBColor(0xAA, 0xB8, 0xE8)
INK = RGBColor(0x1A, 0x1A, 0x1A)
GRAY = RGBColor(0x55, 0x55, 0x55)
GRAY_L = RGBColor(0x8A, 0x8A, 0x8A)
LINE = RGBColor(0xD9, 0xD9, 0xD9)
TINT = RGBColor(0xF4, 0xF6, 0xFC)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
FONT = "Arial"

MX = 0.79
CW = 18.42
RIGHT = MX + CW
GRADE = "[문서등급 표기]"
TOTAL = 2

OUT = os.path.join(os.path.dirname(__file__), "..", "future-plan.pptx")

prs = Presentation()
prs.slide_width = Emu(18288000)   # 20.00 in
prs.slide_height = Emu(10287000)  # 11.25 in
BLANK = prs.slide_layouts[6]


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
    ea.set("typeface", FONT)


def tb(slide, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, wrap=True,
       spacing=1.15):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, (t, size, bold, color) in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        r = p.add_run()
        r.text = t
        _font(r, size, bold, color)
    return box


def rect(slide, x, y, w, h, fill=None, line=None, line_w=0.75, shape=MSO_SHAPE.RECTANGLE,
         dash=False):
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
        if dash:
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
    return sp


def header(slide, kicker, title, lead):
    tb(slide, MX, 0.46, 6.0, 0.34, [("삼성전자 메모리사업부", 18, True, BLUE)])
    tb(slide, 13.21, 0.46, 6.0, 0.34, [(GRADE, 18, False, GRAY)], align=PP_ALIGN.RIGHT)
    tb(slide, MX, 0.93, CW, 0.34, [(kicker, 18, True, BLUE)])
    tb(slide, MX, 1.33, CW, 0.62, [(title, 33, True, INK)])
    tb(slide, MX, 2.04, CW, 0.44, [(lead, 21, False, GRAY)])
    rect(slide, MX, 2.62, CW, 0.014, fill=LINE)


def footer(slide, source, no):
    tb(slide, MX, 10.49, 15.6, 0.34, [(source, 18, False, GRAY)])
    tb(slide, 17.55, 10.49, 1.66, 0.34, [(f"{no:02d} / {TOTAL:02d}", 18, False, GRAY)],
       align=PP_ALIGN.RIGHT)


def notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


# ---- 공통 타임라인 그리드 (4주, 인터뷰는 3주와 4주 사이 = 9월 말) ----
LW = 3.90                      # 좌측 라벨 열
TX = MX + LW + 0.16
WKW = 2.40                     # 주 열 폭
WEEKS = [("1주", "9/7"), ("2주", "9/14"), ("3주", "9/21"), ("4주", "9/29")]
OX = TX + WKW * 4 + 0.16
OUT_W = RIGHT - OX
HDR_Y = 2.86
IV_X = TX + WKW * 3            # 인터뷰 분기선 x


def timeline_header(slide, out_label):
    for i, (wk, d) in enumerate(WEEKS):
        x = TX + i * WKW
        tb(slide, x + 0.06, HDR_Y, WKW - 0.12, 0.40, [(f"{wk} · {d}", 18, True, INK)],
           anchor=MSO_ANCHOR.MIDDLE)
    tb(slide, OX, HDR_Y, OUT_W, 0.40, [(out_label, 18, True, INK)], anchor=MSO_ANCHOR.MIDDLE)
    rect(slide, MX, HDR_Y + 0.46, CW, 0.014, fill=LINE)


def interview_marker(slide, y_top, y_bot):
    """3주·4주 경계의 세로 분기선 + 하단 마일스톤 라벨."""
    rect(slide, IV_X - 0.012, y_top, 0.024, y_bot - y_top, fill=BLUE)
    rect(slide, IV_X - 0.13, y_bot + 0.02, 0.26, 0.26, fill=BLUE, shape=MSO_SHAPE.DIAMOND)
    tb(slide, IV_X - 3.0, y_bot + 0.34, 6.0, 0.34,
       [("담당임원 인터뷰 · 9월 말", 17, True, BLUE)], align=PP_ALIGN.CENTER)


def cell(slide, x, y, w, h, paras, fill=TINT, pad=0.16):
    rect(slide, x + 0.06, y, w - 0.12, h, fill=fill)
    tb(slide, x + 0.06 + pad, y + 0.10, w - 0.12 - 2 * pad, h - 0.20, paras,
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.2)


# =====================================================================
# 슬라이드 1 · 전략 3 FDP 향후 계획 (세 검토 축 × 4주)
# =====================================================================
s = prs.slides.add_slide(BLANK)
header(s, "삼성 SSD 전략적 방향성 · 향후 계획 (전략 3 FDP)",
       "남은 4주, 세 가지 검토로 FDP 전략을 실행안으로 끌어올립니다",
       "9월 말 담당임원 인터뷰를 분기점으로, 앞은 조사와 설계, 뒤는 확정과 결론입니다")
timeline_header(s, "산출물")

RY0, RH, RG = 3.42, 1.62, 0.16
axes = [
    ("① 현실 인식", "인터뷰",
     "사내 FDP 기술·고객 관계는 지금 어디에 있나",
     ["질문 설계", "사내 자료 확인", "확인 대장 완성", "현황 대장 · 갭 표"],
     "현황 대장 + 갭 표"),
    ("② AI 워크로드", "조사 · 기술검토",
     "FDP가 KV Cache 등 AI 워크로드에 통하는가, 얼마나 어려운가",
     ["워크로드 분류", "스택 · 코드 조사", "효과 · 난이도 판정", "차별화 여지 결론"],
     "효과·난이도 판정표 + 기술 숙제"),
    ("③ 실행 전략", "전략구상",
     "고객에게 어떻게 다가가고, 개발실은 어떻게 준비하나",
     ["협업 포트폴리오 점검", "고객별 제안 · 협력 구조", "조직 · 개발 체계 준비안", "준비안 확정"],
     "고객 플레이북 + 개발실 준비안"),
]
for i, (ttl, method, problem, tasks, out) in enumerate(axes):
    y = RY0 + i * (RH + RG)
    rect(s, MX, y, LW, RH, fill=TINT)
    tb(s, MX + 0.26, y + 0.20, LW - 0.52, 0.36, [(ttl, 20, True, BLUE)])
    tb(s, MX + 0.26, y + 0.60, LW - 0.52, 0.66, [(problem, 17, True, INK)])
    tb(s, MX + 0.26, y + RH - 0.46, LW - 0.52, 0.30, [(method, 15.5, False, GRAY)])
    for wi, t in enumerate(tasks):
        cell(s, TX + wi * WKW, y + 0.14, WKW, RH - 0.28, [(t, 17.5, wi == 3, INK)])
    rect(s, OX, y, OUT_W, RH, fill=WHITE, line=LINE)
    tb(s, OX + 0.26, y, OUT_W - 0.52, RH, [(out, 17.5, True, INK)], anchor=MSO_ANCHOR.MIDDLE)

ROWS_END = RY0 + RH * 3 + RG * 2
interview_marker(s, HDR_Y + 0.46, ROWS_END)

BY = ROWS_END + 0.86
rect(s, MX, BY, CW, 0.72, fill=BLUE)
tb(s, MX + 0.5, BY, CW - 1.0, 0.72,
   [("10월 초 보고서 v1.2 · 덱 갱신 → 10/12부터 발표자료 준비", 21, True, WHITE)],
   anchor=MSO_ANCHOR.MIDDLE)
footer(s, "출처: 삼성 SSD 전략적 방향성 보고서 v1.1 부록 D", 1)
notes(s, "남은 기간 중 발표자료 준비를 빼면 검토에 쓸 수 있는 시간은 4주입니다. 세 검토 축은 "
         "현실 인식(인터뷰), AI 워크로드(조사·기술검토), 실행 전략(전략구상)이며, 9월 말 담당임원 "
         "인터뷰 한 번을 분기점으로 앞 3주는 조사·설계, 마지막 주는 확정·결론에 씁니다. 산출물은 "
         "10월 초 보고서 v1.2로 수렴하고 10/12부터 발표자료 준비에 들어갑니다.")

# =====================================================================
# 슬라이드 2 · 4대 전략 향후 계획 종합 (전략 1·2·4 작성 예정)
# =====================================================================
s = prs.slides.add_slide(BLANK)
header(s, "삼성 SSD 전략적 방향성 · 향후 계획 종합 (4대 전략)",
       "네 전략 모두 10월 초 검토를 마치고 발표자료로 수렴합니다",
       "전략 1·2·4는 담당별 작성 예정. 전략 3 FDP는 세 검토 축을 4주에 배치했습니다")
timeline_header(s, "산출물")

RY0, RH, RG = 3.42, 1.42, 0.16
rows = ["전략 1", "전략 2", "전략 3", "전략 4"]
fdp_weeks = [
    ["① 질문 설계", "② 워크로드 분류", "③ 포트폴리오 점검"],
    ["① 사내 자료 확인", "② 스택·코드 조사", "③ 제안·협력 구조"],
    ["① 확인 대장 완성", "② 효과·난이도 판정", "③ 조직·체계 준비안"],
    ["① 현황 대장·갭 표", "② 차별화 결론", "③ 준비안 확정"],
]
for i, name in enumerate(rows):
    y = RY0 + i * (RH + RG)
    if name != "전략 3":
        rect(s, MX, y, LW, RH, fill=WHITE, line=LINE, dash=True)
        tb(s, MX + 0.26, y, LW - 0.52, RH,
           [(name, 20, True, GRAY_L), ("[전략명 · 문제 작성 예정]", 15.5, False, GRAY_L)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.3)
        rect(s, TX + 0.06, y + 0.14, WKW * 4 - 0.12, RH - 0.28, fill=WHITE, line=LINE, dash=True)
        tb(s, TX, y, WKW * 4, RH, [("[담당별 4주 계획 작성 예정]", 16, False, GRAY_L)],
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        rect(s, OX, y, OUT_W, RH, fill=WHITE, line=LINE, dash=True)
        tb(s, OX, y, OUT_W, RH, [("[산출물]", 16, False, GRAY_L)],
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        continue
    rect(s, MX, y, LW, RH, fill=TINT)
    tb(s, MX + 0.26, y, LW - 0.52, RH,
       [("전략 3 · FDP 플랫폼", 20, True, BLUE),
        ("자체 SSD 수요를 표준으로 흡수", 16, True, INK),
        ("현실 인식·AI 워크로드·실행 전략", 14.5, False, GRAY)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.3)
    for wi, lines in enumerate(fdp_weeks):
        cell(s, TX + wi * WKW, y + 0.14, WKW, RH - 0.28,
             [(t, 14.5, wi == 3, INK) for t in lines], pad=0.10)
    rect(s, OX, y, OUT_W, RH, fill=WHITE, line=LINE)
    tb(s, OX + 0.26, y, OUT_W - 0.52, RH,
       [("현황 갭 표 · 효과/난이도 판정표", 16, True, INK),
        ("고객 플레이북 · 개발실 준비안", 16, True, INK)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.3)

ROWS_END = RY0 + RH * 4 + RG * 3
interview_marker(s, HDR_Y + 0.46, ROWS_END)
tb(s, MX, ROWS_END + 0.34, 8.0, 0.34,
   [("10월 초 산출물 확정 → 10/12부터 발표자료 준비", 17, True, INK)])
footer(s, "출처: 삼성 SSD 전략적 방향성 보고서 v1.1 부록 D", 2)
notes(s, "네 전략의 향후 계획을 한 장에 모은 종합 슬라이드입니다. 전략 1·2·4는 담당별로 같은 격자에 "
         "채워 넣고, 전략 3 FDP는 세 검토 축의 주차별 키워드를 한 셀에 세 줄로 보였습니다. 9월 말 "
         "담당임원 인터뷰가 분기점이며, 네 전략 모두 10월 초 산출물을 내고 발표자료 준비로 합류합니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
