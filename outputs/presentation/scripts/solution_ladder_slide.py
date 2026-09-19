# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드 v2.2 — 이관 매트릭스(zero-base 재설계, 2026-09-18) — 공용 빌더.

두 덱이 같은 코드를 쓴다: (1) 단독 1장 덱 generate_solution_ladder_pptx.py, (2) QLC eSSD 전략 덱 3장(generate_qlc_ssd_strategy_pptx.py, v5.1).
build(ns, page_no, kicker, next_step, lead, band_main, notes_tail): ns = 헬퍼 네임스페이스(deck_kit 또는 QLC 스크립트 모듈) — prs·BLANK·header·tb·rect·band·footer·notes·토큰 제공.
  kicker: 킥커 문자열 또는 정수(QLC 덱 스토리 레일의 현재 장 번호) / next_step: 결론 밴드 우측 '다음 장' 포인터
  lead·band_main·notes_tail: 덱 문맥에 맞는 리드·결론 밴드·노트 꼬리 덮어쓰기(None이면 단독 덱 기본 문안, v2.2)

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


def build(ns, page_no=1, kicker="메모리 해법 사다리 · 이관 매트릭스", next_step=None, lead=None, band_main=None, notes_tail=None):
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
           "요구는 고정, 단품은 악화, 보상은 상위 계층으로: 남은 지렛대 WAF는 호스트에 있습니다",
           lead or "고용량 QLC의 DWPD 격차를 지금까지 어느 계층이 풀어 왔는지 보면, SSD 단독 최적화는 QoS·성능은 개선했으나 WAF는 낮추지 못했습니다.")

    # ---- 그리드 ----
    LBL_W, GAP, AR_W = 1.30, 0.14, 0.30
    COL_W = (CW - LBL_W - GAP - 3 * AR_W) / 4
    col_x = [MX + LBL_W + GAP + i * (COL_W + AR_W) for i in range(4)]
    H_Y, H_H = 2.80, 0.56          # 열 헤더
    F_Y, F_H = 3.44, 0.54          # 산식 칩
    R1_Y, R1_H = 4.08, 3.24        # 내구성 행
    L_Y, L_H = 7.46, 1.76          # 지렛대 스트립(v2.1)
    PAD = 0.14

    # ---- 열 헤더: 이관 단계 ----
    heads = [("요구", "고객이 정한다 · 고정", "req"),
             ("단품 지표", "셀 · 다이 · 세대마다 악화", "cell"),
             ("SSD 계층의 보상", "1단계 ECC(완결) · 2단계 단독 최적화(부분 성공)", "ssd"),
             ("호스트 · 시스템 계층의 보상", "3단계 공동 설계 (2022~, 본 덱 4~5장)", "host")]
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
    for ry, rh, t1, t2 in [(R1_Y, R1_H, "내구성 축", "P/E · BER\nDWPD · WAF")]:
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
    status(x + COL_W - 0.10 - 1.5, t2y + 0.06, 1.4, "요구 미달", False)
    tb(s, x + 0.26, t2y + 0.27, COL_W - 0.46, 0.26, [("QoS · 성능 개선, WAF ≈ 3 · 부분 성공", 11.25, True, INK)])
    tb(s, x + 0.26, t2y + 0.52, COL_W - 0.46, 0.22, [("'14~'19 추정 배치·스트림·IOD · SSD는 데이터 수명 감지 불가", 8.5, False, GRAY)])
    img("ladder_cell_dwpd.png", x + (COL_W - 3.25) / 2, t2y + 0.74, 3.25)

    # col4 호스트·시스템 계층: 3단계 타일 + WAF 미니 차트
    x = col_x[3]; cell(x, R1_Y, COL_W, R1_H, "host")
    tb(s, x + PAD, R1_Y + 0.12, 2.3, 0.2, [("3단계 · 호스트 공동 설계 (2022~)", 9.75, False, GRAY_2)])
    status(x + COL_W - PAD - 1.5, R1_Y + 0.12, 1.5, "요구 도달 · 조건부", True)
    tb(s, x + PAD, R1_Y + 0.34, COL_W - 2 * PAD, 0.26, [("호스트가 데이터 수명을 지정 → WAF ≈3 → ≈1", 11.25, True, BLUE)])
    tb(s, x + PAD, R1_Y + 0.60, COL_W - 2 * PAD, 0.22, [("배치 표준 · 캐시 관리자 정책 · 공동 설계 = 본 덱 4~5장", 8.5, False, GRAY)])
    img("ladder_cell_waf.png", x + 0.22, R1_Y + 0.88, COL_W - 0.44)
    tb(s, x + PAD, R1_Y + R1_H - 0.40, COL_W - 2 * PAD, 0.34,
       [("호스트가 쥔 남은 지렛대(×2.9) · KV 캐시 실측은 Phase 2 검증 대상", 9.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)

    # ================= 지렛대 스트립: 격차를 닫는 축은 여러 개, 본 보고는 호스트 축 (v2.1, 소스 §10 F48·F52) =================
    rect(s, MX, L_Y, LBL_W, L_H, fill=TINT)
    rect(s, MX, L_Y, 0.06, L_H, fill=BLUE_T1)
    tb(s, MX + 0.18, L_Y + 0.16, LBL_W - 0.26, 0.3, [("격차를 닫는\n지렛대", 12.0, True, BLUE)], spacing=1.0)
    tb(s, MX + 0.18, L_Y + 0.82, LBL_W - 0.26, 0.8, [("모두 병행 중 · 본 보고는\n호스트 축을 다룸", 9.0, False, GRAY)], spacing=1.0)
    levers = [("다이 세대", "P/E ↑ · 2Tb QLC", "셀 · 다이", False), ("OP", "(1 + OP) · 예비 용량", "SSD", False),
              ("SLC 캐시 · 쓰기 정형", "GC 효율 · 순차화", "SSD", False), ("보증연수 · TBW 기준", "365 × 년 · 정격 산정", "고객 · 계약", False),
              ("워크로드 재정의", "어드미션 · TLC 혼합 계층", "고객 · 앱", False), ("호스트 배치 (WAF)", "≈3 → ≈1 · 유효 DWPD ×2.9", "호스트 · 앱 · 본 보고", True)]
    lx0 = col_x[0]
    lw_total = RIGHT - lx0
    n = len(levers)
    gap = 0.12
    lw = (lw_total - (n - 1) * gap) / n
    ly = L_Y + 0.16
    lh = 0.98
    for i, (nm, what, who, hot) in enumerate(levers):
        x = lx0 + i * (lw + gap)
        rect(s, x, ly, lw, lh, fill=BLUE if hot else WHITE, line=None if hot else LINE, line_w=0.75)
        tb(s, x + 0.12, ly + 0.08, lw - 0.24, 0.2, [(who, 8.75, False, WHITE if hot else GRAY_2)])
        tb(s, x + 0.12, ly + 0.30, lw - 0.24, 0.26, [(nm, 11.25, True, WHITE if hot else INK)])
        tb(s, x + 0.12, ly + 0.58, lw - 0.24, 0.34, [(what, 8.75, False, WHITE if hot else GRAY)], spacing=1.0)
    tb(s, lx0, ly + lh + 0.10, lw_total, 0.44,
       [("호스트 배치 하나로는 격차(동급 비교 2~10배)가 닫히지 않습니다. WAF ×2.9는 다이 세대·OP·보증연수·워크로드 재정의와 결합해 요구에 도달하며, 이 중 호스트·고객 쪽 지렛대가 다수라는 점이 공동 설계의 근거입니다", 9.0, False, GRAY)], spacing=1.02)

    band(s, 9.42, 0.80, "결론",
         band_main or ("요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층이 보상해 왔습니다.\n"
                       "호스트 공동 설계는 QLC DWPD의 남은 지렛대이며, 다이 세대·OP·보증연수 등 병행 중인 축과 결합해 격차를 닫습니다"),
         main_size=16.5, next_step=next_step)
    footer(s, "출처: JESD218(UBER), ATP·Kioxia(DWPD 산식), Intel·Solidigm 사양(정격 DWPD), Mielke·Cai(RBER), WD(LDPC), CacheLib·삼성·NVMe FDP·VLDB'26(WAF), P5336·6550 ION·CM9·LC9(동급 DWPD) · 등급은 부록 A F28~F54", page_no)
    notes(s, f"{page_no}장은 이관 매트릭스입니다. 고용량 QLC의 DWPD 격차를 받아, 지금까지 단품이 못 푼 문제를 어느 계층이 풀어 왔는지의 경향을 보이고 호스트 시스템 수준 해법이 왜 필요한지를 세웁니다. 열은 이관 단계(요구 → 단품 지표 → SSD 계층의 보상 → 호스트·시스템 계층의 보상), 행은 내구성 축입니다. 산식 DWPD = P/E × (1+OP) ÷ WAF ÷ 365 × 년의 각 항은 결정 주체가 열과 대응합니다. "
          "요구: 추론 캐시 계층 제품은 DWPD 1~3(TLC), UBER는 JESD218 기준으로 고정입니다. 단품: P/E 사이클은 SLC 30K~100K에서 QLC 100~1K로 100배 감소, RBER은 약 백만 배 상승했고 셀은 시간에 따라 변하는 산포를 단독으로 보정하지 못합니다. SSD 계층: 1단계 컨트롤러 ECC(1비트/512B → LDPC 120비트/KB, 60배)는 UBER 요구를 충족해 완결됐습니다. 2단계 SSD 단독 워크로드 최적화(2014~2019: Multi-stream·AutoStream·FTL 핫/콜드 추정·NVMe IO 결정성)는 QoS·성능은 개선했으나 데이터 수명을 SSD가 감지할 수 없어 실 워크로드 WAF는 3 수준에 머물렀고, 정격 DWPD는 17에서 0.4로 내려왔습니다. 호스트·시스템 계층: 3단계 호스트 공동 설계는 호스트가 데이터 수명을 지정해 WAF를 약 3에서 약 1로 낮춥니다. 범용 랜덤 워크로드 실측(삼성·NVM Express, 50% 사용률)과 CacheLib 실측(3.22 → 1.03)이 근거이고, 데이터베이스 영역에서는 호스트 쓰기 패턴만으로 SSD WAF 1을 보장한 VLDB 2026 연구가 있습니다. 다만 KV 캐시 워크로드의 FDP WAF 실측은 공개 문헌에 없으므로 이 장의 주장은 검증할 가설이며, 4장 Phase 2 실측이 그 검증입니다. "
          "하단 지렛대 스트립이 이 장의 핵심 정정입니다. 호스트 배치 하나로는 격차가 닫히지 않습니다. WAF 지렛대는 유효 DWPD 약 2.9배이고, 동급 비교 격차는 2~10배이므로 다이 세대(P/E), OP, SLC 캐시·쓰기 정형, 보증연수·TBW 기준, 워크로드 재정의(어드미션·TLC 혼합 계층)와 결합해야 요구에 도달합니다. 이 축들은 모두 병행 중이며 본 보고는 호스트 축만 다룹니다. 호스트·고객 쪽 지렛대가 다수라는 점이 공동 설계의 근거입니다. 결론: 호스트 공동 설계는 QLC DWPD의 남은 지렛대이며, 다른 축과 결합해 격차를 닫습니다. " + (notes_tail or "신뢰성 축(다이 수·고장률)은 호스트가 아니라 SSD가 풀 문제라 별도로 다룹니다.") + " 근거 등급은 보고서 부록 A F28~F54에 있습니다.")

    return s
