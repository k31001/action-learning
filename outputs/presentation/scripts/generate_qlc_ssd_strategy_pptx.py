# -*- coding: utf-8 -*-
"""QLC eSSD 전략 — 3장 덱 생성 (배경 / 요구사항·역량·기술 전략 / 실행 전략·고객 협업).

디자인 시스템: outputs/presentation/ssd-strategy.pptx 승계
  20 x 11.25 in 캔버스 / Arial 단일 폰트 / Samsung Blue #1428A0 단일 액센트
  헤더(조직명·문서등급·킥커·30pt 액션 타이틀·21pt 리드·헤어라인) / 푸터(출처·페이지)
  틴트 카드 #F4F6FC(무테) · 아웃라인 카드 흰색+#D9D9D9 0.75pt · 다크 블루 정리 밴드 · 직각 사각형
컨설팅 문법: 액션 타이틀 · 리드인 · 스티커(so-what) · 출처 줄 · 슬라이드 번호

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
GRADE = "[문서등급 표기]"
TOTAL = 3

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "..", "assets")
LOGOS = os.path.join(ASSETS, "logos")
CHART = os.path.join(ASSETS, "qlc_demand_share_revenue_slide.png")
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


def tb(slide, x, y, w, h, paras, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, wrap=True, spacing=1.15):
    """paras: [(text, size, bold, color)] 또는 [(runs:[(text,size,bold,color)...])] — 항목당 문단 1개."""
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


def logo(slide, name, x, y, h):
    """assets/logos/<name>.png 를 높이 h(in)로 배치, 폭 반환."""
    path = os.path.join(LOGOS, f"{name}.png")
    if name not in _LOGO_ASPECT:
        with Image.open(path) as im:
            _LOGO_ASPECT[name] = im.size[0] / im.size[1]
    w = h * _LOGO_ASPECT[name]
    slide.shapes.add_picture(path, Inches(x), Inches(y), height=Inches(h))
    return w


def chip(slide, text, x, y, h, size=13.5):
    """공식 로고를 못 구한 기업의 워드마크 칩. 폭 반환."""
    w = _chip_w(text, size)
    rect(slide, x, y, w, h, fill=WHITE, line=GRAY_2, line_w=0.75)
    tb(slide, x, y, w, h, [(text, size, True, INK)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    return w


def _logo_w(name, h):
    path = os.path.join(LOGOS, f"{name}.png")
    if name not in _LOGO_ASPECT:
        with Image.open(path) as im:
            _LOGO_ASPECT[name] = im.size[0] / im.size[1]
    return h * _LOGO_ASPECT[name]


def _chip_w(text, size):
    return 0.20 + 0.105 * size / 13.5 * len(text) * 0.62 + 0.20


def logo_row(slide, items, x, y, h, gap=0.22, max_w=None, chip_size=13.5):
    """items: [('logo','nvidia') | ('chip','VAST Data')] 를 가로로 나열. max_w를 넘으면 균일 축소. 끝 x 반환."""
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


# ================================================================ S1. 배경
s = prs.slides.add_slide(BLANK)
header(s, "QLC eSSD 전략 · 배경: 트렌드 변화와 시장 흐름",
       "요구는 2022년에 정의되고 물량은 2024년에 터졌으며, 다음 무대는 추론 캐시 티어입니다",
       "초기·현재·향후 세 국면의 배경과 구매 기준, 2022년부터 2030년까지의 수요·비중·매출 모델을 한 장에 담았습니다.")

R1Y, R1H, R1W = 2.80, 2.80, 5.92
eras = [
    ("초기 · 2018~2023 (전환점 2022)", "요구는 정의됐지만 물량은 아직이었습니다", False, [
        [("배경 ", 14.25, True, INK), ("데이터 레이크 6배 · HDD 대역폭 붕괴 · 배치 표준 비준(2022-12) · 가격 급락", 14.25, False, GRAY)],
        [("구매 기준 ", 14.25, True, INK), ("TB당 원가 · 랙 밀도(1U에 1PB) · 0.3~0.6 DWPD 허용", 14.25, False, GRAY)],
        [("삼성 ", 14.25, True, INK), ("61TB급 1년 후발(2024-07), 인증 QLC 벤더 2사", 14.25, False, GRAY)],
    ]),
    ("현재 · 2024~2026", "AI 추론 서버가 물량을 만들었습니다: 2024년 30EB, 전년 4배", False, [
        [("배경 ", 14.25, True, INK), ("추론 서버 전력 효율 · 61→122→245TB 용량 경쟁 · 니어라인 HDD 2026년 완판", 14.25, False, GRAY)],
        [("구매 기준 ", 14.25, True, INK), ("TB당 와트 · 공급 확보(리드타임 약 1년)", 14.25, False, GRAY)],
        [("삼성 ", 14.25, True, INK), ("물량 1위(2Q26 eSSD 35.1%), 용량은 후발(245TB 전시 단계)", 14.25, False, GRAY)],
    ]),
    ("향후 · 2027~2030", "다음 무대는 HDD 대체가 아니라 추론 캐시 티어입니다", True, [
        [("배경 ", 14.25, True, INK), ("KV cache가 HBM·DRAM을 넘쳐 SSD로 · 2027년 75~100EB · 2030년 워크로드의 35%", 14.25, False, GRAY)],
        [("구매 기준 ", 14.25, True, INK), ("유효 내구성 · 토큰 경제성 · 수명 보증. 현재 주인은 TLC(1~3 DWPD)", 14.25, False, GRAY)],
        [("삼성 ", 14.25, True, INK), ("디바이스(CMX 첫 공급)는 있고 시스템 연결은 공백", 14.25, False, BLUE)],
    ]),
]
for i, (label, key, hot, body) in enumerate(eras):
    x = MX + i * (R1W + 0.33)
    if hot:
        rect(s, x, R1Y, R1W, R1H, fill=TINT)
        rect(s, x, R1Y, 0.08, R1H, fill=BLUE)
    else:
        rect(s, x, R1Y, R1W, R1H, fill=WHITE, line=LINE, line_w=0.75)
    ix, iw = x + 0.36, R1W - 0.72
    tb(s, ix, R1Y + 0.24, iw, 0.32, [(label, 18, True, BLUE)])
    tb(s, ix, R1Y + 0.60, iw, 0.72, [(key, 18.75, True, INK)], spacing=1.05)
    tb(s, ix, R1Y + 1.36, iw, 1.40, body, spacing=1.08)
    if i < 2:
        rect(s, x + R1W + 0.09, R1Y + R1H / 2 - 0.09, 0.16, 0.18, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)

# 하단: 그래프 + 스티커
R2Y, R2H = 5.76, 3.50
CH_W = R2H * (3960 / 1232)
s.shapes.add_picture(CHART, Inches(MX), Inches(R2Y), height=Inches(R2H))
SX = MX + CH_W + 0.30
SW = MX + CW - SX
rect(s, SX, R2Y, SW, R2H, fill=WHITE, line=LINE, line_w=0.75)
tb(s, SX + 0.34, R2Y + 0.22, SW - 0.68, 0.32, [("그래프가 말하는 것", 18, True, BLUE)])
stats = [
    ("10배", "QLC eSSD 비트 2025년 53EB → 2030년 550EB(e), eSSD 비트의 55%"),
    ("정체", "QLC 매출 2026년 $32B → 2030년 $37B(e). 가격 정상화 후 비트 성장이 매출로 안 이어집니다"),
    ("350EB", "2030년 추론 캐시 티어 NAND 수요(전 미디어). QLC 침투는 호스트 협력 배치 성립 시 조건부"),
]
sy = R2Y + 0.62
for num, lab in stats:
    tb(s, SX + 0.34, sy, 1.55, 0.70, [(num, 24, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, SX + 1.95, sy, SW - 2.29, 0.70, [(lab, 14.25, False, GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.06)
    sy += 0.74
rect(s, SX + 0.34, sy, SW - 0.68, 0.012, fill=LINE)
tb(s, SX + 0.34, sy + 0.08, SW - 0.68, R2H - (sy - R2Y) - 0.14,
   [("비트가 아니라 시스템 위에서 보증하는 TCO가 이익을 결정합니다", 15.75, True, INK)], spacing=1.06, anchor=MSO_ANCHOR.MIDDLE)

band(s, 9.42, 0.86, "결론",
     "향후 3~5년 공급 부족 국면에서 니어라인 HDD 대체 대신, 오늘 TLC가 서비스하는 추론 캐시 티어를 QLC로 가져갑니다")
footer(s, "출처: TrendForce 분기 실측(2022~2Q26)·QLC 30EB(2024)·SanDisk FMS 2026·Meta·Solidigm 발표 종합, 2026~2030은 추정(e), 분모는 enterprise SSD 비트 · 상세: QLC eSSD 전략 보고서 1~3장", 1)
notes(s, "배경 한 장입니다. 2022년은 QLC 주문의 해가 아니라 조건이 갖춰진 해였습니다: 전문 벤더(Solidigm) 출범, 하이퍼스케일러 주도 폼팩터(E1.S/E1.L), Meta·Google의 배치 표준 비준(2022-12), NAND 가격 급락, 학습 데이터셋 6배. 하이퍼스케일러가 원한 것은 HDD의 대역폭 붕괴를 메우는 용량 계층(Meta: 10 MB/s/TB), 공급자가 판 것은 1U에 1PB의 TCO였습니다. 물량은 AI 추론 서버의 전력 효율이 우선순위가 된 2024년에 터졌습니다(TrendForce 30EB, 4배). 현재는 용량 경쟁과 니어라인 HDD 완판이 QLC를 끌어올리지만, 향후 3~5년 공급 부족 국면에서 HDD 대체는 커머디티 경쟁이라 들어가지 않습니다. 다음 무대는 KV cache 오프로드가 만드는 추론 캐시 티어이고, 그 티어는 오늘 TLC(1~3 DWPD)가 서비스합니다. 그래프: 비트는 10배, 가격 정상화 기준선에서 매출은 정체, 진한 파랑은 조건부 상방. 모델 수치는 TrendForce 실측 앵커를 삼각측량한 추정이며 가정표는 위키 qlc-ssd-market.md §4.3에 있습니다.")

# ================================================================ S2. 요구사항·역량·기술 전략
s = prs.slides.add_slide(BLANK)
header(s, "QLC eSSD 전략 · 요구사항과 역량, 기술 전략",
       "캐시 티어는 오늘 TLC의 것입니다. QLC가 들어가려면 세 단계 역량이 함께 필요합니다",
       "요구 갭 네 가지, 디바이스·워크로드 최적화·고객 시스템 co-design 세 단계와 삼성의 현 위치, 참여할 스택과 협업할 기업입니다.")

# 갭 타일 4
T_Y, T_H, T_W, T_GAP = 2.80, 1.52, 4.41, 0.26
tiles = [
    ("10~40배", "내구성 갭", "최신 QLC 정격 0.075~0.6 DWPD vs 캐시 티어 TLC 1~3 DWPD"),
    ("25배", "스트림 갭", "현행 RUH 2~8개 vs 세션·테넌트·수명 분리에 필요한 200개 이상"),
    ("0건", "접점 공백", "KV 캐시 관리자 4종의 코드에 배치·내구성 언급 없음(GitHub 확인)"),
    ("3.22 → 1.03", "수단은 있음", "배치 표준으로 CacheLib 실측 WAF 3.22에서 1.03으로(100% 사용률)"),
]
for i, (num, lab, desc) in enumerate(tiles):
    x = MX + i * (T_W + T_GAP)
    hot = i == 3
    rect(s, x, T_Y, T_W, T_H, fill=TINT if hot else WHITE, line=None if hot else LINE, line_w=0.75)
    tb(s, x + 0.30, T_Y + 0.16, T_W - 0.6, 0.50, [(num, 25.5, True, BLUE)])
    tb(s, x + 0.30, T_Y + 0.66, T_W - 0.6, 0.30, [(lab, 16.5, True, INK)])
    tb(s, x + 0.30, T_Y + 0.96, T_W - 0.6, 0.54, [(desc, 13.5, False, GRAY)], spacing=1.05)

# Phase 그리드
G_Y, G_H = 4.50, 3.60
LBL_W = 1.70
COL_W = (CW - LBL_W - 0.10 * 3) / 3
HEAD_H = 0.52
ROW_H = (G_H - HEAD_H) / 3
phases = [
    ("Phase 1", "배치 표준 디바이스를 잘 만든다"),
    ("Phase 2", "고객 워크로드 분석으로 최적화한다"),
    ("Phase 3", "고객 시스템을 이해하고 함께 설계한다"),
]
cells = [
    ["RUH 200+ 펌웨어, 2Tb QLC 미디어 관리(WAF ≈ 1), NVMe KV 확장·NVMe-oF, TB당 와트·액체냉각, CMX/STX·OCP 인증, 에뮬레이터",
     "트레이스 수집·재현, WAF·p999·전력 정량, 수명·테넌트·prefix를 RUH 정책으로, 관리자 정책(빈도 필터)과의 결합, 디지털 트윈",
     "추론 엔진·캐시 관리자·커널 I/O 경로 이해, 디바이스→랙→DC 시스템 TCO 모델, 스펙 상류·표준 참여, 공동 계약"],
    ["PM1753 CMX 첫 공급(TLC), PM1763 Gen6, 245TB QLC 전시. RUH 수·DWPD·배치 지원 미공개, 캐시 티어용 QLC 없음",
     "KV cache 백서 2종(측정 역량 있음), CacheLib·RocksDB·XFS 배치 지원. KV 트레이스 기반 실측은 미공개(업계 공백)",
     "Meta CacheLib 업스트림·EuroSys'25(5사 중 최강 선례). 캐시 관리자 4종 기여 0, 공급계약에 공동 최적화 조항 없음"],
    ["KV-ready QLC: 워크로드 조건부 수명 보증 조건표를 스펙에 · 스택: NVMe TP·OCP·CMX STX 인증",
     "프로파일러·에뮬레이터 제품화, 업계 최초 KV cache WAF 실측 공개 · 스택: LMCache·FlexKV io_uring 백엔드, xNVMe, XFS write streams",
     "시스템 아키텍트·TCO 모델 조직, 메인라인 머지를 성과 단위로 · 스택: Dynamo KVBM·NIXL, DOCA Memos 힌트 매핑, SNIA·OCP"],
]
row_labels = ["필요 역량", "삼성 현황", "발전시킬 역량 · 참여 스택"]
rect(s, MX, G_Y, CW, G_H, fill=WHITE, line=LINE, line_w=0.75)
for c, (ph, ttl) in enumerate(phases):
    x = MX + LBL_W + 0.10 + c * (COL_W + 0.10)
    rect(s, x, G_Y, COL_W, HEAD_H, fill=BLUE if c == 2 else TINT)
    tb(s, x + 0.2, G_Y, COL_W - 0.4, HEAD_H,
       [[(ph + "  ", 17.25, True, WHITE if c == 2 else BLUE), (ttl, 17.25, True, WHITE if c == 2 else INK)]],
       anchor=MSO_ANCHOR.MIDDLE)
for r, lab in enumerate(row_labels):
    y = G_Y + HEAD_H + r * ROW_H
    tb(s, MX + 0.2, y, LBL_W - 0.3, ROW_H, [(lab, 15.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)
    if r > 0:
        rect(s, MX + 0.1, y, CW - 0.2, 0.012, fill=LINE)
    for c in range(3):
        x = MX + LBL_W + 0.10 + c * (COL_W + 0.10)
        tb(s, x + 0.2, y + 0.1, COL_W - 0.4, ROW_H - 0.2,
           [(cells[r][c], 14.25, r == 2, INK if r == 2 else GRAY)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.08)

# 협업 기업
P_Y, P_H = 8.30, 1.95
tb(s, MX, P_Y, CW, 0.30, [("협업할 기업 · 목적을 달리해 다섯 층에 동시 진입합니다", 18, True, BLUE)])
groups = [
    ("플랫폼 게이트", [("logo", "nvidia")], "STX 인증 · DOCA Memos 힌트 매핑 · 기본 백엔드"),
    ("스펙 상류", [("logo", "anthropic"), ("logo", "openai")], "공급계약에 공동 최적화 조항 · KV 수명 정책 접근"),
    ("물량 · 활성화", [("logo", "meta"), ("logo", "google"), ("logo", "microsoft"), ("logo", "aws")], "활성화 약정 · 다년 물량 · 선급"),
    ("실증 · 채널", [("chip", "VAST Data"), ("chip", "DDN"), ("chip", "WEKA")], "6~12개월 실증 · 레퍼런스 · DDN 지분"),
    ("오픈소스 · 인수", [("chip", "LMCache"), ("chip", "Mooncake"), ("chip", "FlexKV"), ("chip", "ScaleFlux")], "업스트림 PR · 공동 투자 · acqui-hire"),
]
GW = (CW - 0.25 * 4) / 5
for i, (gl, items, purpose) in enumerate(groups):
    x = MX + i * (GW + 0.25)
    rect(s, x, P_Y + 0.42, GW, P_H - 0.42, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, x + 0.22, P_Y + 0.52, GW - 0.44, 0.28, [(gl, 15.75, True, INK)])
    lh = 0.30 if len(items) <= 2 else 0.24
    logo_row(s, items, x + 0.22, P_Y + 0.90, lh, gap=0.16 if len(items) > 2 else 0.28, max_w=GW - 0.44, chip_size=12.5)
    tb(s, x + 0.22, P_Y + 1.30, GW - 0.44, 0.60, [(purpose, 14.25, False, GRAY)], spacing=1.06)

footer(s, "출처: StorageReview·Solidigm·Kioxia 스펙(DWPD), ScaleFlux 2026-07(RUH 200+), GitHub README 확인(LMCache·Mooncake·FlexKV·3FS), CacheLib FDP 문서(WAF), EuroSys'25 · 로고는 식별 표시, 대외 배포 시 각사 가이드 준수", 2)
notes(s, "요구사항과 역량 한 장입니다. 갭 네 가지: 내구성(QLC 정격 0.075~0.6 vs TLC 1~3 DWPD, 10~40배), 스트림(RUH 2~8 vs 200+), 접점(KV 캐시 관리자 4종 코드에 배치·내구성 언급 0), 그리고 수단은 있다(CacheLib 실측 WAF 3.22→1.03, XFS write streams RocksDB -35%, ScaleFlux 유효 7~10 DWPD). 세 단계는 사용자 정의: Phase 1 배치 표준 디바이스, Phase 2 워크로드 분석 기반 최적화, Phase 3 고객 시스템 이해 기반 co-design. 삼성은 디바이스(CMX 첫 공급)와 오픈소스 도구(xNVMe·CacheLib·XFS)가 5사 중 가장 두텁지만 KV cache 스택(엔진·관리자·I/O 라이브러리)에 연결한 공개물이 없습니다. 벤더가 코드로 들어갈 수 있는 자리는 I/O 라이브러리와 커널·플랫폼 계층이며 2026년 커널·XFS가 열리면서 비어 있습니다. 오케스트레이션(Dynamo·LMCache·Mooncake) 자체는 만들지 않습니다. 협업은 층별로 목적이 다릅니다: NVIDIA는 플랫폼 게이트, Anthropic·OpenAI는 스펙 상류, 하이퍼스케일러는 물량·활성화(Meta는 구매 SSD 전량 배치 표준 탑재·기본 비활성이라 활성화 싸움), VAST·DDN·WEKA는 실증 채널(DDN은 2026년 전략 라운드), 오픈소스 커뮤니티는 업스트림, ScaleFlux는 Phase 2 역량의 acqui-hire 후보입니다.")

# ================================================================ S3. 실행 전략·고객 협업
s = prs.slides.add_slide(BLANK)
header(s, "QLC eSSD 전략 · 실행 전략과 고객 협업",
       "하던 대로는 안 됩니다. 조직·보상·계약을 한 묶음으로 바꾸고 접근권을 계약으로 고정합니다",
       "다섯 축의 실행 전략, 90일·1년·3년 티어, 층별 고객 협업 제안(주는 것과 받는 것)과 결정 요청입니다.")

LW3 = 11.10
axes = [
    ("전략", "하나의 베팅: QLC로 추론 캐시 티어를. 니어라인 HDD 대체는 들어가지 않습니다",
     "순서: KV-ready QLC → 등대 고객 실측 공개 → 공동 플랫폼 계약 · 창: 공급 완화(2H27) 전"),
    ("조직", "실리콘밸리 추론 스토리지 자회사 + 고객 상주 Co-Design Pod + 시스템 TCO 모델 조직",
     "선례: SK hynix AI Company $10B(2026-01) · 자회사는 본사 SSD와 동일 P&L 지표(활성화 EB)"),
    ("인사", "별도 보상(지분·RSU형)으로 시장가 채용, 스타 앵커 5명, ScaleFlux 팀 인수",
     "격차: 삼성 SV L6 $392K vs NVIDIA IC6 $626K · 기준가: Astera↔Pliops 약 $70M/60명 · 펌웨어→호스트 SW 트랙"),
    ("문화", "업스트림 우선: 메인라인 머지가 완성, 결과로 평가, 실측을 업계 최초로 공개",
     "명시 요구 vs 실제 요구 문서화 · 실패 예산 · 품질·원가를 프레임에(수명 보증은 필드 품질과 결합)"),
    ("재무", "물량 계약을 공동 플랫폼 계약으로, 수명 보증 + TCO 연동 가격, 지분으로 접근권을 삽니다",
     "선례: Micron SCA 예치금 $22B, Pure Watts/TiB SLA · 지분: Anthropic·Mistral(기존), DDN(2026), Tensormesh"),
]
AY, AH, AGAP = 2.80, 0.98, 0.10
for i, (lab, key, det) in enumerate(axes):
    y = AY + i * (AH + AGAP)
    rect(s, MX, y, LW3, AH, fill=WHITE, line=LINE, line_w=0.75)
    rect(s, MX, y, 1.25, AH, fill=TINT)
    tb(s, MX, y, 1.25, AH, [(lab, 18, True, BLUE)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
    tb(s, MX + 1.50, y + 0.10, LW3 - 1.75, 0.36, [(key, 16.5, True, INK)], spacing=1.05)
    tb(s, MX + 1.50, y + 0.50, LW3 - 1.75, 0.46, [(det, 13.5, False, GRAY)], spacing=1.05)

# 3티어
TY, TH = AY + 5 * (AH + AGAP) + 0.02, 1.12
tiers = [
    ("90일", "KV-ready QLC 정의 · 업스트림 PR·실측 착수 · Anthropic 조항 제안 · NVIDIA 협의 · 자회사 설계안"),
    ("1년", "자회사 출범·스타 영입 · ScaleFlux 인수 · Pod 2사 상주 · CMX 인증 · 계약 1건 · 수명 보증 상품"),
    ("3년", "캐시 티어 QLC 침투 25%+ 중 삼성 40% · 계약 3건 · 캐시 관리자 4종 기본 백엔드 · 프리IPO 옵션"),
]
TW = (LW3 - 0.2) / 3
for i, (tl, body) in enumerate(tiers):
    x = MX + i * (TW + 0.1)
    rect(s, x, TY, TW, TH, fill=TINT if i == 0 else WHITE, line=None if i == 0 else LINE, line_w=0.75)
    tb(s, x + 0.22, TY + 0.10, TW - 0.44, 0.30, [(tl, 17.25, True, BLUE)])
    tb(s, x + 0.22, TY + 0.40, TW - 0.44, TH - 0.46, [(body, 13.5, False, GRAY)], spacing=1.05)
    if i < 2:
        rect(s, x + TW - 0.02, TY + TH / 2 - 0.08, 0.14, 0.16, fill=BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)

# 우측: 고객 협업 제안
RX3 = MX + LW3 + 0.30
RW3 = MX + CW - RX3
rect(s, RX3, 2.85, RW3, TY + TH - 2.85, fill=WHITE, line=LINE, line_w=0.75)
tb(s, RX3 + 0.30, 3.05, RW3 - 0.6, 0.32, [("고객 협업 제안 · 주는 것 → 받는 것", 18, True, BLUE)])
offers = [
    ("스펙 상류", [("logo", "anthropic"), ("logo", "openai")],
     "주는 것: 우선 공급·상주 엔지니어·수명 보증·자본", "받는 것: KV 수명 정책 접근, 레퍼런스 스펙 기본값"),
    ("플랫폼 게이트", [("logo", "nvidia")],
     "주는 것: STX 인증 디바이스·힌트 매핑·기본 백엔드 코드", "받는 것: G3.5 티어 레퍼런스 지위, 힌트 조기 접근"),
    ("실증 · 채널", [("chip", "VAST Data"), ("chip", "DDN"), ("chip", "WEKA")],
     "주는 것: 지분·SSD 공급·공동 레퍼런스 아키텍처", "받는 것: 6~12개월 실증, 네오클라우드 채널"),
    ("물량 · 활성화", [("logo", "meta"), ("logo", "google"), ("logo", "microsoft"), ("logo", "aws")],
     "주는 것: 활성화 엔지니어링(NRE 흡수)·다년 공급", "받는 것: 다년 물량·선급·활성화 약정"),
]
oy = 3.50
OH = 1.22
for i, (ol, items, give, get) in enumerate(offers):
    if i > 0:
        rect(s, RX3 + 0.30, oy - 0.08, RW3 - 0.6, 0.012, fill=LINE)
    tb(s, RX3 + 0.30, oy, 2.2, 0.28, [(ol, 15.75, True, INK)])
    lh = 0.26 if len(items) <= 2 else 0.20
    logo_row(s, items, RX3 + 2.55, oy + 0.02, lh, gap=0.14 if len(items) > 2 else 0.24, max_w=RW3 - 2.85, chip_size=12.5)
    tb(s, RX3 + 0.30, oy + 0.38, RW3 - 0.6, 0.36, [(give, 14.25, False, GRAY)], spacing=1.05)
    tb(s, RX3 + 0.30, oy + 0.74, RW3 - 0.6, 0.36, [(get, 14.25, True, BLUE)], spacing=1.05)
    oy += OH
rect(s, RX3 + 0.30, oy - 0.08, RW3 - 0.6, 0.012, fill=LINE)
tb(s, RX3 + 0.30, oy + 0.02, RW3 - 0.6, TY + TH - oy - 0.12,
   [[("유인 ", 14.25, True, INK), ("공급 부족기의 교환은 거절하기 어렵고, 수명 보증과 NRE로 리스크는 우리가 지며, 표준 위라 락인 두려움 없이 깊이 들어옵니다. 지분은 정보와 우선 협의권을 삽니다", 14.25, False, GRAY)]],
   spacing=1.06)

band(s, 9.52, 0.76, "결정 요청",
     "① 자회사 설립과 별도 보상 체계 승인  ② ScaleFlux·DDN 투자 심의 착수  ③ Anthropic 공동 최적화 조항·NVIDIA 기술 협의 착수",
     main_size=20)
footer(s, "출처: SK hynix 뉴스룸·CNBC(2026-01), Calcalist·Globes(Pliops), levels.fyi 2026, Micron IR·10-Q, Pure PR, Blackstone·Bloomberg(DDN), SiliconANGLE(Tensormesh) · 규모·시점은 추정, 사내 수치는 [사내 확인]", 3)
notes(s, "실행 전략 한 장입니다. 하던 대로가 안 되는 이유: 캐시 티어의 스펙은 고객 캐시 관리자 코드 안에 있어 RFQ에 안 적히고, 4개 커뮤니티의 메인테이너 문법은 겸업으로 못 얻으며, 국내 보상으로는 실리콘밸리 시니어(TC $600~700K대)를 못 뽑고, 사업과 분리된 오픈소스 조직은 소멸(Intel OTC)하며, 물량 계약만으로는 Micron↔Anthropic 같은 공동 설계 조항을 못 얻습니다. 다섯 축: 전략(하나의 베팅·세 순서·2H27 전 창), 조직(자회사·Pod·TCO 모델 조직, 동일 P&L 지표로 본사와 결합), 인사(별도 보상·스타·acqui-hire·전환 트랙·호명), 문화(업스트림 우선·결과 평가·최초 공개·품질 프레임), 재무(공동 플랫폼 계약·수명 보증·TCO 연동·지분·캐피털콜 펀드·NRE). 3티어: 90일(제품 정의·PR·실측·조항·협의·자회사 설계안), 1년(자회사·인수·Pod·인증·계약 1건·상품), 3년(침투 25%+ 중 40%·계약 3건·기본 백엔드·프리IPO). 협업 제안은 층별로 주는 것과 받는 것을 명시했고, 유인은 공급 부족기의 교환·리스크 부담·락인 없는 락인·호명·자본·고객의 고객입니다. 결정 요청 세 가지는 이번 보고에서 승인 또는 착수 지시가 필요한 항목입니다. 가성비 판정과 리스크는 보고서 6장·위키 qlc-execution-strategy.md 참조.")

prs.save(os.path.abspath(OUT))
print(f"생성 완료: {os.path.abspath(OUT)} ({len(prs.slides._sldIdLst)}장)")
