# -*- coding: utf-8 -*-
"""향후 계획 2장 덱 생성. v4: "무엇을·왜" 중심 (세 열 논증 + 하단 한 줄 일정 / 4전략 × 왜·무엇·산출물 표).

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
       spacing=1.2, space_after=0):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = wrap
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    for i, (t, size, bold, color) in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        if space_after:
            p.space_after = Pt(space_after)
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


def section_label(slide, x, y, w, label):
    lw = 0.62 if len(label) == 1 else 1.0
    tb(slide, x, y, lw, 0.28, [(label, 14.5, True, BLUE)])
    rect(slide, x + lw, y + 0.14, w - lw, 0.012, fill=LINE)


def timeline_strip(slide, y, milestones):
    """하단 한 줄 일정: 가로선 + 마름모 + 라벨."""
    rect(slide, MX, y, CW, 0.014, fill=LINE)
    n = len(milestones)
    seg = CW / n
    for i, (when, what, hot) in enumerate(milestones):
        cx = MX + seg * i + 0.16
        rect(slide, cx - 0.10, y - 0.10, 0.20, 0.20, fill=BLUE if hot else GRAY_L,
             shape=MSO_SHAPE.DIAMOND)
        tb(slide, cx + 0.22, y - 0.20, seg - 0.5, 0.40,
           [(when, 15.5, True, BLUE if hot else INK)], anchor=MSO_ANCHOR.MIDDLE)
        tb(slide, cx + 0.22, y + 0.20, seg - 0.5, 0.36, [(what, 15, False, GRAY)])


# =====================================================================
# 슬라이드 1 · 전략 3 FDP 향후 계획 — 세 질문, 세 열
# =====================================================================
s = prs.slides.add_slide(BLANK)
header(s, "삼성 SSD 전략적 방향성 · 향후 계획 (전략 3 FDP)",
       "남은 4주는 세 질문에 답하는 데 씁니다: 어디에 있나, 통하는가, 어떻게 하나",
       "보고서 v1.1의 남은 약점은 사내 근거의 급, AI 워크로드에서의 효과, 실행안의 구체성입니다. 이 셋을 닫아 v1.2로 갑니다")

cols = [
    dict(
        num="①", name="현실 인식", q="우리는 지금 어디에 있나", method="인터뷰 · 사내 자료 확인",
        why="핵심 주장(고객향 FDP 공급 이력, 전담 조직, 솔루션 비중, 캡티브 규모)이 아직 사내 구술과 "
            "추정치에 기대고 있습니다. 사실과 가설을 구분하지 못하면 전략 전체의 신뢰가 흔들립니다.",
        what=["담당임원 인터뷰(9월 말): 펌웨어·제품 세대, 활성화 용량, 고객별 공급·공동검증 이력, "
              "워크로드 공유 수준, 조직·인력",
              "보고서·덱의 [사내 확인]·추정치 항목을 전수 대장화, 하나씩 확정",
              "②·③의 사내 준비도 질문 동반"],
        out="현황 대장(기술·고객·조직) + 주장 대 실제 갭 표. 추정치 표기 0건",
    ),
    dict(
        num="②", name="AI 워크로드", q="FDP는 AI 워크로드에 통하는가, 얼마나 어려운가",
        method="자료조사 · 기술검토",
        why="FDP의 WAF 개선은 데이터 수명이 RUH 격리와 정렬될 때만 성립합니다. KV Cache 오프로드와의 "
            "정합은 아직 관찰 수준이고, 통해도 스택에 심을 일이 너무 무거우면 전략이 서지 않습니다. "
            "고객의 첫 질문 \"우리 워크로드에선 얼마나?\"에 답해야 합니다.",
        what=["KV Cache·체크포인트·데이터 로더별 수명·재사용 패턴과 RUH 격리의 정합, 공개 실측 대조",
              "스택(vLLM·LMCache·Dynamo·커널 6.16) 코드 검토, QEMU 소규모 실증, 숙제 3분류(우리·생태계·고객)",
              "쉽게 따라오는 층 vs 관계 때문에 못 따라오는 층"],
        out="효과·난이도 판정표 + 숙제 3분류 + 차별화 여지 결론. \"통하지만 어렵다\"면 그대로 보고",
    ),
    dict(
        num="③", name="실행 전략", q="고객에게 어떻게 다가가고, 개발실은 어떻게 준비하나",
        method="전략구상 · 인터뷰 검증",
        why="협업 3층 포트폴리오·워크로드 교환·FDE 운영안은 문서로만 있습니다. 어떻게 협력을 "
            "끌어낼지, 개발실이 무엇을 갖추고 바꿀지는 미검증이고, 공급자 우위가 있는 동안 체결해야 "
            "하는 계약이라 늦으면 시효를 넘깁니다.",
        what=["고객별(LLM 기업·스토리지 벤더·하이퍼스케일러) 제안 패키지: 주는 것·받는 것, "
              "첫 접촉에서 공동 파일럿까지",
              "개발실 준비안: 새로 갖출 것(시스템 SW·오픈소스 인력, FDE, 공동검증 인프라)과 "
              "바꿀 것(펌웨어 브랜치·qual)",
              "부록 D 6과제에 오너·일정·첫 액션 부여"],
        out="고객 접근 플레이북 + 개발실 준비안 → 4장 결정 요청 구체화",
    ),
]

GAP = 0.24
COLW = (CW - GAP * 2) / 3
CY, CH = 2.90, 6.42
PAD = 0.30
for i, c in enumerate(cols):
    x = MX + i * (COLW + GAP)
    rect(s, x, CY, COLW, CH, fill=TINT)
    ix, iw = x + PAD, COLW - 2 * PAD
    tb(s, ix, CY + 0.24, iw - 2.6, 0.40, [(f"{c['num']} {c['name']}", 22, True, BLUE)])
    tb(s, ix + iw - 2.6, CY + 0.24, 2.6, 0.40, [(c["method"], 14.5, False, GRAY_L)],
       align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, ix, CY + 0.70, iw, 0.62, [(c["q"], 17.5, True, INK)])
    section_label(s, ix, CY + 1.40, iw, "왜")
    tb(s, ix, CY + 1.72, iw, 1.45, [(c["why"], 15.5, False, GRAY)])
    section_label(s, ix, CY + 3.24, iw, "무엇을")
    tb(s, ix, CY + 3.56, iw, 1.90, [("· " + t, 14.5, False, INK) for t in c["what"]], space_after=4)
    section_label(s, ix, CY + 5.58, iw, "결과")
    tb(s, ix, CY + 5.88, iw, 0.52, [(c["out"], 15.5, True, INK)])

timeline_strip(s, 9.72, [
    ("9/7 착수", "질문 설계 · 워크로드 분류 · 포트폴리오 점검", False),
    ("9월 말 담당임원 인터뷰", "①의 현황 확인 + ②·③의 사내 준비도 검증", True),
    ("10월 초 보고서 v1.2", "세 결과를 한 묶음으로 반영, 덱 갱신", False),
    ("10/12부터 발표자료 준비", "리허설 · 예상 질문 답변 카드", False),
])
footer(s, "출처: 삼성 SSD 전략적 방향성 보고서 v1.1 · 비판적 검토서 · 부록 D", 1)
notes(s, "남은 4주는 새 프레임을 늘리는 시간이 아니라, 이미 세운 주장을 검증된 근거로 바꾸는 "
         "시간입니다. 첫째, 현실 인식: 보고서의 사내 주장과 추정치를 담당임원 인터뷰로 확정합니다. "
         "둘째, AI 워크로드: FDP가 KV Cache 등 AI 워크로드에서 실제로 효과를 내는지, 그리고 그 "
         "효과를 얻기 위한 기술 숙제가 감당 가능한 수준인지 판정합니다. 해자가 될지 여부는 이 "
         "검토에서 나옵니다. 셋째, 실행 전략: 고객별 제안 패키지와 개발실 준비안을 만들어 4장의 "
         "결정 요청을 구체화합니다. 인터뷰는 9월 말 한 번이며, 결과는 10월 초 보고서 v1.2로 수렴합니다.")

# =====================================================================
# 슬라이드 2 · 4대 전략 종합 — 왜 · 무엇을 · 산출물
# =====================================================================
s = prs.slides.add_slide(BLANK)
header(s, "삼성 SSD 전략적 방향성 · 향후 계획 종합 (4대 전략)",
       "네 전략 모두 \"무엇을 왜 더 검토하는가\"를 정해 10월 초까지 답을 냅니다",
       "공통 일정은 9월 말 담당임원 인터뷰, 10월 초 보고서 갱신, 10/12부터 발표자료 준비입니다. 전략 1·2·4는 담당별 작성 예정")

COLS = [("전략", 3.00), ("왜 더 검토하는가", 6.00), ("무엇을 검토하나", 6.10),
        ("산출물 (10월 초)", CW - 3.00 - 6.00 - 6.10)]
HY = 2.90
x = MX
for name, w in COLS:
    tb(s, x + 0.26, HY, w - 0.3, 0.36, [(name, 16, True, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    x += w
rect(s, MX, HY + 0.42, CW, 0.014, fill=LINE)

RY0, RH, RG = HY + 0.56, 1.40, 0.10
rows = [
    ("전략 1", None), ("전략 2", None),
    ("전략 3", dict(
        name="FDP 플랫폼",
        sub="자체 SSD 수요를 표준으로 흡수",
        why="핵심 주장이 사내 구술과 추정치에 기대고, AI 워크로드에서의 FDP 효과는 조건부이며, "
            "실행 전략은 문서로만 있습니다. 이 셋이 v1.1 비판적 검토 뒤에도 남은 약점입니다.",
        what=["① 현실 인식: 인터뷰로 기술·고객·조직 현황 확정",
              "② AI 워크로드: FDP 효과·난이도·차별화 여지 판정",
              "③ 실행 전략: 고객별 제안 패키지 + 개발실 준비안"],
        out=["현황 대장 + 갭 표", "효과·난이도 판정표 + 기술 숙제", "고객 플레이북 + 개발실 준비안"],
    )),
    ("전략 4", None),
]
for i, (label, d) in enumerate(rows):
    y = RY0 + i * (RH + RG)
    x0 = MX
    x1 = x0 + COLS[0][1]
    x2 = x1 + COLS[1][1]
    x3 = x2 + COLS[2][1]
    if d is None:
        rect(s, MX, y, CW, RH, fill=WHITE, line=LINE, dash=True)
        tb(s, x0 + 0.26, y, COLS[0][1] - 0.4, RH,
           [(label, 19, True, GRAY_L), ("[전략명]", 15, False, GRAY_L)],
           anchor=MSO_ANCHOR.MIDDLE, spacing=1.3)
        tb(s, x1 + 0.26, y, COLS[1][1] - 0.5, RH,
           [("[남은 검토가 필요한 이유 · 담당 작성]", 15.5, False, GRAY_L)], anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x2 + 0.26, y, COLS[2][1] - 0.5, RH,
           [("[검토 항목 · 담당 작성]", 15.5, False, GRAY_L)], anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x3 + 0.26, y, COLS[3][1] - 0.5, RH, [("[산출물]", 15.5, False, GRAY_L)],
           anchor=MSO_ANCHOR.MIDDLE)
        continue
    rect(s, MX, y, CW, RH, fill=TINT)
    tb(s, x0 + 0.26, y, COLS[0][1] - 0.4, RH,
       [(f"{label} · {d['name']}", 18, True, BLUE), (d["sub"], 14.5, True, INK)],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.3)
    tb(s, x1 + 0.26, y, COLS[1][1] - 0.5, RH, [(d["why"], 15, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x2 + 0.26, y, COLS[2][1] - 0.5, RH, [(t, 14, False, INK) for t in d["what"]],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.25, space_after=3)
    tb(s, x3 + 0.26, y, COLS[3][1] - 0.5, RH, [(t, 14, True, INK) for t in d["out"]],
       anchor=MSO_ANCHOR.MIDDLE, spacing=1.25, space_after=3)

timeline_strip(s, 9.72, [
    ("9/7 착수", "각 전략 검토 설계", False),
    ("9월 말 담당임원 인터뷰", "전략 3 현황 확인 · 타 전략 사내 확인 동반", True),
    ("10월 초 보고서 갱신", "네 전략 산출물 반영", False),
    ("10/12부터 발표자료 준비", "리허설 · 예상 질문 답변 카드", False),
])
footer(s, "출처: 삼성 SSD 전략적 방향성 보고서 v1.1 · 비판적 검토서 · 부록 D", 2)
notes(s, "네 전략의 향후 계획을 한 장에 모은 종합 슬라이드입니다. 각 전략은 왜 더 검토하는지, "
         "무엇을 검토하는지, 10월 초 산출물이 무엇인지 세 칸으로 씁니다. 전략 1·2·4는 담당별로 "
         "같은 칸을 채우고, 전략 3 FDP는 현실 인식·AI 워크로드·실행 전략 세 검토입니다. 공통 "
         "일정은 9월 말 담당임원 인터뷰, 10월 초 보고서 갱신, 10/12부터 발표자료 준비입니다.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
