# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드(네 지표 P/E · BER · DWPD · WAF) — 공용 빌더.

두 덱이 같은 코드를 쓴다: (1) 단독 1장 덱 generate_solution_ladder_pptx.py, (2) QLC eSSD 전략 덱 1장(generate_qlc_ssd_strategy_pptx.py).
build(ns, page_no, kicker): ns = 헬퍼 네임스페이스(deck_kit 모듈 또는 QLC 스크립트 모듈) — prs·BLANK·header·tb·rect·band·footer·notes·토큰을 제공해야 한다.
차트: assets/solution_metrics_chart.png (generate_solution_metrics_chart.py)
"""
import os

from PIL import Image
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches


def build(ns, page_no=1, kicker="메모리 해법 사다리 · P/E · BER · DWPD · WAF"):
    prs, BLANK = ns.prs, ns.BLANK
    header, tb, rect, band, footer, notes = ns.header, ns.tb, ns.rect, ns.band, ns.footer, ns.notes
    BLUE, BLUE_T1, BLUE_T2, INK, GRAY, GRAY_2, LINE, TINT, WHITE = (ns.BLUE, ns.BLUE_T1, ns.BLUE_T2, ns.INK, ns.GRAY,
                                                                   ns.GRAY_2, ns.LINE, ns.TINT, ns.WHITE)
    MX, CW, RIGHT, ASSETS = ns.MX, ns.CW, ns.RIGHT, ns.ASSETS
    CHART = os.path.join(ASSETS, "solution_metrics_chart.png")
    cw, ch = Image.open(CHART).size
    ASPECT = cw / ch

    s = prs.slides.add_slide(BLANK)
    header(s, kicker,
           "단품이 잃은 P/E 100배를 컨트롤러가 ECC로 버텼고, 남은 지렛대 WAF는 호스트 협력에 있습니다",
           "셀이 못 지킨 BER을 SSD가 ECC로 지켰고, SSD가 못 지키는 DWPD를 이제 호스트 배치가 WAF로 지킬 차례입니다.")

    # ---- 좌: 네 지표 차트 ----
    C_Y, C_H = 2.80, 6.40
    C_W = C_H * ASPECT
    s.shapes.add_picture(CHART, Inches(MX), Inches(C_Y), height=Inches(C_H))

    # ---- 우: 산식 카드 ----
    RX = MX + C_W + 0.34
    RW = RIGHT - RX
    F_H = 1.72
    rect(s, RX, C_Y, RW, F_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, RX + 0.26, C_Y + 0.12, RW - 0.52, 0.28, [("산식 — 누가 어느 항을 정하나", 15, True, BLUE)])
    terms = [("DWPD", "고객 요구", "req"), ("=", None, "op"), ("P/E", "셀 · 다이", "cell"), ("×", None, "op"),
             ("1 + OP", "디바이스", "dev"), ("÷", None, "op"), ("WAF", "호스트 · 앱", "lever"), ("÷", None, "op"),
             ("365 × 년", "고객 요구", "req")]
    bw, ow, bh = 1.02, 0.26, 0.46
    tot = sum(bw if t[2] != "op" else ow for t in terms) + 0.06 * (len(terms) - 1)
    x = RX + (RW - tot) / 2
    y = C_Y + 0.52
    for text, owner, kind in terms:
        if kind == "op":
            tb(s, x, y, ow, bh, [(text, 15, False, GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
            x += ow + 0.06
            continue
        if kind == "lever":
            rect(s, x, y, bw, bh, fill=BLUE)
            col = WHITE
        elif kind == "req":
            rect(s, x, y, bw, bh, fill=TINT, line=BLUE_T2, line_w=1.0)
            col = INK
        else:
            rect(s, x, y, bw, bh, fill=WHITE, line=LINE, line_w=0.75)
            col = INK
        tb(s, x, y, bw, bh, [(text, 13.5, True, col)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x - 0.1, y + bh + 0.04, bw + 0.2, 0.22, [(owner, 9.75, kind == "lever", BLUE if kind == "lever" else GRAY_2)],
           align=PP_ALIGN.CENTER)
        x += bw + 0.06
    tb(s, RX + 0.26, C_Y + F_H - 0.42, RW - 0.52, 0.3,
       [[("P/E가 100배 줄었으니 요구 DWPD를 지킬 변수는 ", 10.5, False, GRAY), ("WAF", 10.5, True, BLUE),
         ("뿐이고, WAF는 호스트가 데이터 수명을 알려 줄 때만 1에 수렴합니다", 10.5, False, GRAY)]], spacing=1.0)

    # ---- 우: 두 단계의 대칭 ----
    S_Y = C_Y + F_H + 0.18
    S_H = 9.42 - 0.20 - S_Y
    rect(s, RX, S_Y, RW, S_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, RX + 0.26, S_Y + 0.12, RW - 0.52, 0.28, [("두 단계의 대칭 — 요구는 고정, 단품은 악화, 상위 계층이 메운다", 15, True, BLUE)])
    rows = [("1단계  NAND → SSD  (1991~)", [("셀", "RBER 백만 배 ↑", False), ("컨트롤러", "ECC 60배 ↑", True), ("고객", "UBER 요구 유지", False)]),
            ("2단계  SSD → 호스트  (2022~)", [("셀 · SSD", "P/E 100배 ↓, DWPD 0.4", False), ("호스트 · 앱", "WAF 3.2 → 1.0", True), ("고객", "DWPD 요구 유지", False)])]
    cw3 = (RW - 0.52 - 2 * 0.34) / 3
    ry = S_Y + 0.56
    for title, chips in rows:
        tb(s, RX + 0.26, ry, RW - 0.52, 0.24, [(title, 11.25, True, INK)])
        cy = ry + 0.32
        cx = RX + 0.26
        for i, (who, what, hot) in enumerate(chips):
            rect(s, cx, cy, cw3, 0.78, fill=BLUE if hot else (TINT if i == 2 else WHITE),
                 line=None if hot else (BLUE_T2 if i == 2 else LINE), line_w=1.0 if i == 2 else 0.75)
            tb(s, cx + 0.1, cy + 0.08, cw3 - 0.2, 0.26, [(who, 10.5, False, WHITE if hot else GRAY_2)])
            tb(s, cx + 0.1, cy + 0.34, cw3 - 0.2, 0.36, [(what, 12.0, True, WHITE if hot else INK)], anchor=MSO_ANCHOR.MIDDLE)
            if i < 2:
                rect(s, cx + cw3 + 0.05, cy + 0.29, 0.24, 0.2, fill=BLUE if hot or i == 0 else BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
            cx += cw3 + 0.34
        ry = cy + 0.78 + 0.26
    tb(s, RX + 0.26, S_Y + S_H - 0.62, RW - 0.52, 0.52,
       [("같은 구조가 두 번 반복됐습니다. QLC의 호스트 협력은 선택이 아니라 산식의 결과이며, 2단계의 WAF 지렛대는 호스트·애플리케이션 계층에 있습니다", 10.5, False, GRAY)],
       spacing=1.02)

    band(s, 9.42, 0.80, "결론",
         "요구(UBER·DWPD)는 고정되고 단품 지표(RBER·P/E)는 악화되며, 그 폭은 상위 계층의 변수(ECC·WAF)가 메워 왔습니다.\n"
         "QLC의 호스트 협력은 선택이 아니라 산식의 결과입니다",
         main_size=18)
    footer(s, "출처: JESD218(UBER·보존), ATP·Kioxia(DWPD 산식·WAF 3), Intel X25-E·S3700·P4510 및 Solidigm P5316 사양(정격 DWPD), Mielke·Cai(RBER), WD ECC/DSP 백서(LDPC 120bit/KB), CacheLib FDP(WAF) · RBER 대표값·환산 DWPD 등급은 보고서 부록 A F28~F35", page_no)
    notes(s, "메모리 해법 사다리를 네 숫자로 설명하는 한 장입니다. 왼쪽 차트는 인과 순서입니다. ① 셀의 한계: 비트/셀을 늘릴수록 셀이 견디는 P/E 사이클이 SLC 30K~100K에서 QLC 100~1K로 100배 줄었습니다. "
          "② 컨트롤러의 응답: 같은 기간 RBER은 SLC 10의 -9~-7승에서 QLC 10의 -3~-2승으로 약 백만 배 올랐지만, 고객의 UBER 요구(JESD218: 클라이언트 10의 -15승, 엔터프라이즈 10의 -16승)는 고정이었습니다. 그 폭을 컨트롤러가 ECC로 메웠습니다. 1비트/512B에서 BCH 60비트/KB, LDPC 120비트/KB로 약 60배입니다. 셀은 보존·사이클링·리드 디스터브로 시간에 따라 산포가 움직이는 것을 스스로 고치지 못하므로, 이것이 NAND에서 SSD로의 1단계 이관의 실체입니다. "
          "③ 결과: ECC는 BER을 막지만 P/E를 늘리지는 못합니다. 정격 DWPD는 X25-E SLC 17(2008, 2PB 보증 환산), S3700 eMLC 10(2012), P4510 TLC 0.7(2018), P5316 QLC 0.41(2021, 22,930TBW 환산), 최신 QLC 0.075~0.6으로 내려왔는데, 추론 캐시 계층의 요구는 TLC 수준 1~3, ScaleFlux가 제시한 유효 요구는 7~10입니다. 10~40배 갭입니다. "
          "④ 남은 지렛대: DWPD = P/E × (1+OP) ÷ (WAF × 365 × 년)에서 P/E는 셀, OP는 디바이스, 년과 요구 DWPD는 고객이 정합니다. P/E가 100배 줄었으니 남은 변수는 WAF뿐이고, WAF는 랜덤 쓰기 대표값 3, CacheLib FDP 없음 3.22에서 FDP 배치로 1.03이 됐습니다. 68% 감소, 유효 DWPD 3.1배입니다. WAF를 1로 내리는 것은 컨트롤러가 아니라 호스트가 데이터 수명을 알려 줄 때만 가능합니다. "
          "오른쪽 위는 산식과 항별 소유자, 아래는 두 단계의 대칭입니다. 1단계는 요구 UBER 고정, RBER 악화, ECC로 메움. 2단계는 요구 DWPD 고정, P/E 악화, WAF로 메움. 같은 구조입니다. 결론: QLC의 호스트 협력은 선택이 아니라 산식의 결과입니다. RBER 대표값과 환산 DWPD의 등급은 보고서 부록 A F28~F35에 있습니다.")


    return s
