# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드 v2.0 — 이관 매트릭스(zero-base 재설계, 2026-09-18) — 공용 빌더.

두 덱이 같은 코드를 쓴다: (1) 단독 1장 덱 generate_solution_ladder_pptx.py, (2) QLC eSSD 전략 덱 1장(generate_qlc_ssd_strategy_pptx.py).
build(ns, page_no, kicker, next_step): ns = 헬퍼 네임스페이스(deck_kit 또는 QLC 스크립트 모듈) — prs·BLANK·header·tb·rect·band·footer·notes·토큰 제공.
  kicker: 킥커 문자열 또는 정수(QLC 덱 스토리 레일의 현재 장 번호) / next_step: 결론 밴드 우측 '다음 장' 포인터

레이아웃(이관 매트릭스): 페이지 구조 자체가 논지("요구 고정 · 단품 악화 · 보상은 상위 계층으로 이관")가 되도록
  열 = 이관 단계: 요구(고객·고정) → 단품 지표(셀·다이·악화) → SSD 계층의 보상(1단계 ECC 완결 · 2단계 단독 최적화 부분 성공)
       → 호스트·시스템 계층의 보상(3단계 공동 설계 · 본 덱)
  행 = 두 축: 내구성(P/E · BER · DWPD · WAF) / 신뢰성(다이 수 · 고장률)
  행 사이 = DWPD 산식 칩(항별 결정 주체가 열과 대응)
  셀 = 미니 차트 1개 또는 빅넘버·타일 1개(assets/ladder_cell_*.png, generate_ladder_cells.py)
근거: sources/articles/component-to-system-solution-ladder-facts-2026-09.md §7 F28~F35(내구성) · §8 F36~F40(SSD 단독 최적화) · §9 F41~F47(다이 축)
"""
import os

from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches


def build(ns, page_no=1, kicker="메모리 해법 사다리 · 이관 매트릭스", next_step=None):
    prs, BLANK = ns.prs, ns.BLANK
    header, tb, rect, band, footer, notes = ns.header, ns.tb, ns.rect, ns.band, ns.footer, ns.notes
    BLUE, BLUE_T1, BLUE_T2, INK, GRAY, GRAY_2, LINE, TINT, WHITE = (ns.BLUE, ns.BLUE_T1, ns.BLUE_T2, ns.INK, ns.GRAY,
                                                                   ns.GRAY_2, ns.LINE, ns.TINT, ns.WHITE)
    MX, CW, RIGHT, ASSETS = ns.MX, ns.CW, ns.RIGHT, ns.ASSETS

    def img(name, x, y, w):
        return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))

    def sup_text(x, y, w, h, parts, align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
        """parts: [(text, size, bold, color, sup)] 한 문단, sup=True면 윗첨자(baseline 30%)."""
        box = tb(s, x, y, w, h, [[(t, sz, b, c) for (t, sz, b, c, _) in parts]], align=align, anchor=anchor)
        runs = box.text_frame.paragraphs[0].runs
        for r, (_, _, _, _, sup) in zip(runs, parts):
            if sup:
                r.font._element.set("baseline", "30000")
        return box

    s = prs.slides.add_slide(BLANK)
    header(s, kicker,
           "요구는 고정, 단품은 악화, 보상은 상위 계층으로: QLC의 DWPD는 호스트 공동 설계로만 충족됩니다",
           "내구성 축과 신뢰성 축 모두 같은 구조입니다. SSD 단독 최적화는 QoS·성능은 개선했으나 WAF는 낮추지 못했습니다.")

    # ---- 그리드 ----
    LBL_W, GAP, AR_W = 1.30, 0.14, 0.30
    COL_W = (CW - LBL_W - GAP - 3 * AR_W) / 4
    col_x = [MX + LBL_W + GAP + i * (COL_W + AR_W) for i in range(4)]
    H_Y, H_H = 2.80, 0.56          # 열 헤더
    F_Y, F_H = 3.44, 0.54          # 산식 칩
    R1_Y, R1_H = 4.08, 2.74        # 내구성 행
    R2_Y, R2_H = 6.94, 2.34        # 신뢰성 행
    PAD = 0.14

    # ---- 열 헤더: 이관 단계 ----
    heads = [("요구", "고객이 정한다 · 고정", "req"),
             ("단품 지표", "셀 · 다이 · 세대마다 악화", "cell"),
             ("SSD 계층의 보상", "1단계 ECC(완결) · 2단계 단독 최적화(부분 성공)", "ssd"),
             ("호스트 · 시스템 계층의 보상", "3단계 공동 설계 (2022~, 본 덱 3~4장)", "host")]
    for i, (h1, h2, kind) in enumerate(heads):
        x = col_x[i]
        hot = kind == "host"
        rect(s, x, H_Y, COL_W, H_H, fill=BLUE if hot else (TINT if kind == "req" else WHITE), line=None if hot else LINE, line_w=0.75)
        tb(s, x + PAD, H_Y + 0.06, COL_W - 2 * PAD, 0.26, [(h1, 13.5, True, WHITE if hot else BLUE)])
        tb(s, x + PAD, H_Y + 0.31, COL_W - 2 * PAD, 0.22, [(h2, 9.75, False, WHITE if hot else GRAY)])
        if i >= 1 and i < 3:
            rect(s, x + COL_W + 0.03, H_Y + H_H / 2 - 0.11, AR_W - 0.06, 0.22, fill=BLUE if i == 2 else BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
    tb(s, MX, H_Y, LBL_W, H_H, [("이관 단계 →", 10.5, True, GRAY_2)], anchor=MSO_ANCHOR.MIDDLE)

    # ---- 산식 칩: 항별 결정 주체 = 열 ----
    rect(s, col_x[0], F_Y, RIGHT - col_x[0], F_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, MX, F_Y, LBL_W, F_H, [("DWPD 산식", 10.5, True, BLUE), ("항별 결정 주체", 9.0, False, GRAY_2)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)
    terms = [("DWPD", "요구", "req"), ("=", None, "op"), ("P/E", "단품(셀)", "cell"), ("×", None, "op"), ("1 + OP", "SSD", "ssd"),
             ("÷", None, "op"), ("WAF", "호스트 · 앱", "host"), ("÷", None, "op"), ("365 × 년", "요구", "req")]
    bw, ow, bh = 1.10, 0.28, 0.30
    tot = sum(bw if k != "op" else ow for _, _, k in terms) + 0.08 * (len(terms) - 1)
    x = col_x[0] + (RIGHT - col_x[0] - tot) / 2
    y = F_Y + 0.07
    for text, owner, kind in terms:
        if kind == "op":
            tb(s, x, y, ow, bh, [(text, 13, False, GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
            x += ow + 0.08
            continue
        fill, line, col = {"req": (TINT, BLUE_T2, INK), "cell": (WHITE, LINE, INK), "ssd": (WHITE, LINE, INK), "host": (BLUE, None, WHITE)}[kind]
        rect(s, x, y, bw, bh, fill=fill, line=line, line_w=0.75)
        tb(s, x, y, bw, bh, [(text, 11.25, True, col)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x - 0.1, y + bh + 0.01, bw + 0.2, 0.18, [(owner, 8.5, kind == "host", BLUE if kind == "host" else GRAY_2)], align=PP_ALIGN.CENTER)
        x += bw + 0.08

    # ---- 행 라벨 ----
    for ry, rh, t1, t2 in [(R1_Y, R1_H, "내구성 축", "P/E · BER\nDWPD · WAF"), (R2_Y, R2_H, "신뢰성 축", "다이 수\n다이 고장률")]:
        rect(s, MX, ry, LBL_W, rh, fill=TINT)
        rect(s, MX, ry, 0.06, rh, fill=BLUE)
        tb(s, MX + 0.18, ry + 0.16, LBL_W - 0.26, 0.3, [(t1, 12.75, True, BLUE)])
        tb(s, MX + 0.18, ry + 0.50, LBL_W - 0.26, 0.6, [(ln, 9.75, False, GRAY) for ln in t2.split("\n")], spacing=1.0)

    def cell(x, y, w, h, style="plain"):
        if style == "req":
            rect(s, x, y, w, h, fill=TINT, line=BLUE_T2, line_w=1.0)
        elif style == "part":
            rect(s, x, y, w, h, fill=BLUE_T2)
        elif style == "done":
            rect(s, x, y, w, h, fill=WHITE, line=BLUE, line_w=1.0)
        elif style == "host":
            rect(s, x, y, w, h, fill=WHITE, line=BLUE, line_w=1.5)
        elif style == "next":
            sp = rect(s, x, y, w, h, fill=TINT, line=BLUE, line_w=1.0)
            sp.line.dash_style = MSO_LINE_DASH_STYLE.DASH
        else:
            rect(s, x, y, w, h, fill=WHITE, line=LINE, line_w=0.75)

    def status(x, y, w, text, ok):
        tb(s, x, y, w, 0.22, [(text, 9.75, True, BLUE if ok else GRAY_2)], align=PP_ALIGN.RIGHT)

    # ================= 내구성 행 =================
    # col1 요구: 빅넘버 2
    x = col_x[0]; cell(x, R1_Y, COL_W, R1_H, "req")
    tb(s, x + PAD, R1_Y + 0.14, COL_W - 2 * PAD, 0.2, [("추론 캐시 계층 요구", 9.75, False, GRAY_2)])
    tb(s, x + PAD, R1_Y + 0.36, COL_W - 2 * PAD, 0.5, [("DWPD 1~3", 26, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + PAD, R1_Y + 0.88, COL_W - 2 * PAD, 0.4, [("현재 TLC 수준 · ScaleFlux 제시 유효 요구 7~10", 9.0, False, GRAY)], spacing=1.0)
    rect(s, x + PAD, R1_Y + 1.36, COL_W - 2 * PAD, 0.012, fill=BLUE_T2)
    tb(s, x + PAD, R1_Y + 1.46, COL_W - 2 * PAD, 0.2, [("신뢰성 요구 · JESD218", 9.75, False, GRAY_2)])
    sup_text(x + PAD, R1_Y + 1.68, COL_W - 2 * PAD, 0.5,
             [("UBER 10", 22, True, BLUE, False), ("-15", 13, True, BLUE, True), (" · 10", 22, True, BLUE, False), ("-16", 13, True, BLUE, True)],
             anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + PAD, R1_Y + 2.20, COL_W - 2 * PAD, 0.4, [("클라이언트 · 엔터프라이즈 · 보존 1년@30°C / 3개월@40°C", 9.0, False, GRAY)], spacing=1.0)

    # col2 단품: P/E + RBER 미니 차트
    x = col_x[1]; cell(x, R1_Y, COL_W, R1_H)
    img("ladder_cell_component.png", x + 0.10, R1_Y + 0.10, COL_W - 0.20)
    tb(s, x + PAD, R1_Y + R1_H - 0.42, COL_W - 2 * PAD, 0.36,
       [("비트/셀 ↑ → 산포 마진 ↓ · 보존·사이클링·리드 디스터브로 시간에 따라 변하는 산포는 셀 단독으로 보정 불가", 8.5, False, GRAY)], spacing=1.0)

    # col3 SSD 계층: 1단계(완결) 타일 + 2단계(부분 성공) 타일
    x = col_x[2]; cell(x, R1_Y, COL_W, R1_H)
    t1y, t1h = R1_Y + 0.10, 0.72
    rect(s, x + 0.10, t1y, COL_W - 0.20, t1h, fill=WHITE, line=BLUE, line_w=1.0)
    rect(s, x + 0.10, t1y, 0.06, t1h, fill=BLUE)
    tb(s, x + 0.26, t1y + 0.06, 2.2, 0.2, [("1단계 · 컨트롤러 ECC (1991~)", 9.75, False, GRAY_2)])
    status(x + COL_W - 0.10 - 1.5, t1y + 0.06, 1.4, "UBER 요구 충족", True)
    tb(s, x + 0.26, t1y + 0.27, COL_W - 0.46, 0.26, [("ECC 1 bit/512B → LDPC 120 bit/KB · 60배 ↑", 11.25, True, INK)])
    tb(s, x + 0.26, t1y + 0.52, COL_W - 0.46, 0.22, [("RBER 백만 배 상승분을 컨트롤러가 흡수 · 완결된 이관", 8.5, False, GRAY)])
    t2y = t1y + t1h + 0.10
    t2h = R1_Y + R1_H - 0.10 - t2y
    rect(s, x + 0.10, t2y, COL_W - 0.20, t2h, fill=BLUE_T2)
    tb(s, x + 0.26, t2y + 0.06, 2.4, 0.2, [("2단계 · SSD 단독 최적화", 9.75, False, INK)])
    status(x + COL_W - 0.10 - 1.5, t2y + 0.06, 1.4, "DWPD 요구 미충족", False)
    tb(s, x + 0.26, t2y + 0.27, COL_W - 0.46, 0.26, [("QoS · 성능 개선, WAF ≈ 3 · 부분 성공", 11.25, True, INK)])
    tb(s, x + 0.26, t2y + 0.52, COL_W - 0.46, 0.22, [("'14~'19 추정 배치·스트림·IOD · SSD는 데이터 수명 감지 불가", 8.5, False, GRAY)])
    img("ladder_cell_dwpd.png", x + (COL_W - 3.25) / 2, t2y + 0.74, 3.25)

    # col4 호스트·시스템 계층: 3단계 타일 + WAF 미니 차트
    x = col_x[3]; cell(x, R1_Y, COL_W, R1_H, "host")
    tb(s, x + PAD, R1_Y + 0.12, 2.6, 0.2, [("3단계 · 호스트 시스템 공동 설계 (2022~)", 9.75, False, GRAY_2)])
    status(x + COL_W - PAD - 1.4, R1_Y + 0.12, 1.4, "DWPD 요구 충족", True)
    tb(s, x + PAD, R1_Y + 0.34, COL_W - 2 * PAD, 0.26, [("호스트가 데이터 수명을 지정 → WAF 3.2 → 1.0", 11.25, True, BLUE)])
    tb(s, x + PAD, R1_Y + 0.60, COL_W - 2 * PAD, 0.22, [("배치 표준 · 캐시 관리자 정책 · FDE·SCA 공동 설계 = 본 덱 3~4장", 8.5, False, GRAY)])
    img("ladder_cell_waf.png", x + 0.22, R1_Y + 0.88, COL_W - 0.44)
    tb(s, x + PAD, R1_Y + R1_H - 0.40, COL_W - 2 * PAD, 0.34,
       [("QLC로 요구 DWPD를 충족하는 유일한 경로 · 산식의 귀결", 9.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)

    # ================= 신뢰성 행 =================
    x = col_x[0]; cell(x, R2_Y, COL_W, R2_H, "req")
    tb(s, x + PAD, R2_Y + 0.14, COL_W - 2 * PAD, 0.2, [("기능 고장률 요구 · JESD218", 9.75, False, GRAY_2)])
    tb(s, x + PAD, R2_Y + 0.40, COL_W - 2 * PAD, 0.6, [("FFR ≤ 3%", 30, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + PAD, R2_Y + 1.08, COL_W - 2 * PAD, 0.9,
       [("클라이언트 · 엔터프라이즈 공통 · 고정", 9.75, False, GRAY),
        ("보호 없는 SSD 고장률 ≈ N × 다이 고장률", 9.75, True, INK),
        ("칩 면적이 클수록 수율이 떨어지는 것과 같은 구조", 9.0, False, GRAY)], spacing=1.06)

    x = col_x[1]; cell(x, R2_Y, COL_W, R2_H)
    img("ladder_cell_dies.png", x + 0.10, R2_Y + 0.10, COL_W - 0.20)
    tb(s, x + PAD, R2_Y + R2_H - 0.52, COL_W - 2 * PAD, 0.46,
       [("다이 수 8배 ↑ → 같은 FFR을 지키려면 다이 고장률 8배 ↓ 또는 다이 고장 허용 필요 · 다이 고장률 개선은 기술적 한계", 8.5, False, GRAY)], spacing=1.0)

    x = col_x[2]; cell(x, R2_Y, COL_W, R2_H, "part")
    tb(s, x + PAD, R2_Y + 0.12, 2.6, 0.2, [("현재 해법 · SSD 내부", 9.75, False, INK)])
    status(x + COL_W - PAD - 1.4, R2_Y + 0.12, 1.4, "오버헤드 ↑", False)
    tb(s, x + PAD, R2_Y + 0.36, COL_W - 2 * PAD, 0.26, [("다이 RAID · 여분 다이 · 다이 은퇴", 12.75, True, INK)])
    items = [("다이 패리티", "슈퍼페이지 XOR 패리티 다이 (Micron RAIN)"),
             ("여분 다이 · 은퇴", "삼성 Fail-in-Place(PM1733): 고장 다이 제외, 4~8GB 감량 운영"),
             ("비용", "패리티 · 예비 용량 오버헤드가 다이 수와 함께 증가")]
    iy = R2_Y + 0.72
    for k, v in items:
        rect(s, x + PAD, iy + 0.08, 0.12, 0.12, fill=BLUE)
        tb(s, x + PAD + 0.22, iy, COL_W - 2 * PAD - 0.22, 0.42, [[(k + "  ", 9.75, True, INK), (v, 9.0, False, GRAY)]], spacing=1.0)
        iy += 0.50

    x = col_x[3]; cell(x, R2_Y, COL_W, R2_H, "next")
    tb(s, x + PAD, R2_Y + 0.12, 2.6, 0.2, [("SSD 단독 한계 시 · 상위 계층", 9.75, False, BLUE)])
    status(x + COL_W - PAD - 1.4, R2_Y + 0.12, 1.4, "준비 중", True)
    tb(s, x + PAD, R2_Y + 0.36, COL_W - 2 * PAD, 0.26, [("감량 운영 수용 · 호스트 소거 부호", 12.75, True, INK)])
    items = [("호스트 관측", "OCP SMART XOR 복구 카운트로 다이 복구 이벤트를 하이퍼스케일러가 감시"),
             ("플랫폼 수용", "고장 부품의 감량 운영을 스케줄러가 흡수 (Microsoft Hyrax, 수리 -50~60%)"),
             ("드라이브 간", "소거 부호 · 복제가 SSD 단위 고장을 이미 흡수")]
    iy = R2_Y + 0.72
    for k, v in items:
        rect(s, x + PAD, iy + 0.08, 0.12, 0.12, fill=BLUE, shape=MSO_SHAPE.OVAL)
        tb(s, x + PAD + 0.22, iy, COL_W - 2 * PAD - 0.22, 0.42, [[(k + "  ", 9.75, True, INK), (v, 9.0, False, GRAY)]], spacing=1.0)
        iy += 0.50

    band(s, 9.42, 0.80, "결론",
         "요구(UBER·DWPD·FFR)는 고정, 단품 지표(RBER·P/E·다이 수)는 악화, 격차는 상위 계층이 보상해 왔습니다.\n"
         "QLC로 요구 DWPD를 충족하는 경로는 호스트 시스템 공동 설계뿐이며, 이는 산식의 귀결입니다",
         main_size=16.5, next_step=next_step)
    footer(s, "출처: JESD218(UBER·FFR), ATP·Kioxia(DWPD 산식), Intel·Solidigm 사양(정격 DWPD·다이 수), Mielke·Cai(RBER·다이 패리티), WD(LDPC), CacheLib FDP(WAF), HotStorage'14·SYSTOR'17·NVMe 1.4, Kioxia LC9·삼성 FIP·OCP SMART·MS Hyrax · 등급은 보고서 부록 A F28~F47", page_no)
    notes(s, "2장은 이관 매트릭스입니다. 1장의 문제 제기(대용량·1~3 DWPD 요구)를 받아, 지금까지 단품이 못 푼 문제를 어느 계층이 풀어 왔는지의 경향을 보이고 호스트 시스템 수준 해법의 당위성을 세웁니다. 열은 이관 단계이고 행은 두 축입니다. 요구는 고객이 정하고 고정입니다. 단품 지표는 셀과 다이의 지표이며 세대마다 악화됩니다. 보상은 먼저 SSD 계층에서, 다음은 호스트·시스템 계층에서 이뤄집니다. 두 행 사이의 산식 DWPD = P/E × (1+OP) ÷ WAF ÷ 365 × 년은 각 항의 결정 주체가 열과 대응함을 보입니다. P/E는 셀, OP는 SSD, WAF는 호스트·앱, 년과 요구 DWPD는 고객입니다. "
          "내구성 행. 요구: 추론 캐시 계층은 DWPD 1~3(현재 TLC 수준, ScaleFlux 제시 유효 요구 7~10), UBER는 JESD218 기준 10의 -15승·-16승으로 고정입니다. 단품: 비트/셀을 늘릴수록 P/E 사이클은 SLC 30K~100K에서 QLC 100~1K로 100배 감소했고, RBER은 약 백만 배 상승했습니다. 보존·사이클링·리드 디스터브로 시간에 따라 변하는 산포는 셀 단독으로 보정할 수 없습니다. SSD 계층: 1단계 컨트롤러 ECC는 1비트/512B에서 LDPC 120비트/KB로 60배 강화돼 UBER 요구를 충족했습니다. 완결된 이관입니다. 2단계 SSD 단독 워크로드 최적화(2014~2019: Multi-stream·AutoStream·FTL 핫/콜드 추정·NVMe IO 결정성)는 QoS와 성능은 개선했으나 데이터 수명을 SSD가 감지할 수 없어 실 워크로드 WAF는 3 수준에 머물렀고, 정격 DWPD는 17에서 0.4로 내려와 요구 1~3과 10~40배 격차가 생겼습니다. 부분 성공입니다. 호스트·시스템 계층: 3단계 호스트 시스템 공동 설계는 호스트가 데이터 수명을 지정(배치 표준)하고 캐시 관리자·애플리케이션 정책까지 함께 설계해 WAF를 3.22에서 1.03으로 낮췄습니다. 68% 감소, 유효 DWPD 3.1배이며 DWPD 요구를 충족합니다. QLC로 요구 DWPD를 충족하는 유일한 경로이고 본 덱 3~4장이 이 단계입니다. "
          "신뢰성 행. 요구: JESD218 기능 고장률 FFR 3% 이하로 고정입니다. 보호가 없으면 SSD 고장률은 다이 수 N에 비례하므로 칩 면적이 커질수록 수율이 떨어지는 것과 같은 구조입니다. 단품: SSD당 NAND 다이 수는 S3700 800GB 128개(2012)에서 Kioxia LC9 245TB 1,024개(2025, 2Tb 다이 32단 스택 32패키지)로 8배 늘었고, 같은 FFR을 지키려면 다이 고장률을 8배 낮추거나 다이 고장을 허용해야 합니다. 다이 고장률 개선은 기술적 한계에 닿았습니다. SSD 계층(현재 해법): 다이 RAID(Micron RAIN, 슈퍼페이지 XOR 패리티 다이), 여분 다이, 다이 은퇴와 감량 운영(삼성 Fail-in-Place PM1733: 고장 다이를 제외하고 4~8GB 감량 운영)입니다. 패리티와 예비 용량 오버헤드가 다이 수와 함께 증가합니다. 상위 계층(SSD 단독 한계 시): OCP SMART의 XOR 복구 카운트로 호스트가 다이 복구를 관측하고, Microsoft Hyrax처럼 플랫폼이 감량 운영을 수용하며, 드라이브 간 소거 부호가 SSD 고장을 흡수합니다. "
          "결론: 두 축 모두 요구는 고정이고 단품은 악화되며 보상은 상위 계층으로 이관됩니다. QLC로 요구 DWPD를 충족하는 경로는 호스트 시스템 공동 설계뿐이며 이는 산식의 귀결입니다. 1장이 제기한 대용량·높은 DWPD 요구에 대한 당위성이며, 해소 경로가 3장입니다. 근거 등급은 보고서 부록 A F28~F47에 있습니다.")

    return s
