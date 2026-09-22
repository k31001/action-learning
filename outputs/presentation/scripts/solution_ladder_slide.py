# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드 v3.0 — 이관 매트릭스 (2026-09-22: 셀 차트 확대 + DWPD 요구·WAF 추이 신설) — 공용 빌더.

두 덱이 같은 코드를 쓴다: (1) 단독 1장 덱 generate_solution_ladder_pptx.py, (2) QLC eSSD 전략 덱 3장(generate_qlc_ssd_strategy_pptx.py, v6.0).
build(ns, page_no, kicker, next_step, title, lead, band_main, notes_tail): ns = 헬퍼 네임스페이스(deck_kit 또는 QLC 스크립트 모듈).

v3.0 변경(피드백 "그래프가 작아서 안 보인다 · WAF 추이와 고객 DWPD 요구 추이를 조사해 추가"):
 - 열 폭 재배분(요구 열 2.70in, 나머지 3열 4.46in)으로 셀 차트를 3.95 × 2.75in으로 확대(종전 3.25 × 1.05in 대비 면적 약 3배)
 - 셀 차트 교체: ladder_component_big.png(P/E·RBER) · ladder_dwpd_trend.png(정격 DWPD 57배↓ vs 드라이브당 허용 기입량 67배↑)
   · ladder_waf_pairs.png(호스트 배치 적용 전후 실측 쌍 + LLM KV 캐시 미실측)
 - WAF는 "연도축 추이선"으로 그리지 않는다: 같은 드라이브·같은 트레이스도 사용률(OP)에 따라 기준 WAF가 1.22와 3.22로 달라지므로
   (Meta CacheLib 공식 문서) 연도 시계열은 교란변수를 숨긴다. 기법별 before→after 쌍 + 조건 라벨로 표기한다.
 - 고객 DWPD 요구 추이는 "정격 DWPD 하락"과 "드라이브당 허용 기입량 상승"을 한 그래프에 겹쳐 표기(DWPD는 용량 정규화 지표라 단독으로 읽으면 오독)
 - ScaleFlux 제품 한정 주장(유효 7~10 DWPD, 스트림 200+)은 근거에서 제외
근거: sources/articles/component-to-system-solution-ladder-facts-2026-09.md §7~§10 ·
      sources/articles/qlc-v6-waf-dwpd-criteria-trend-2026-09.md
"""
import os

from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches


def build(ns, page_no=1, kicker="메모리 해법 사다리 · 이관 매트릭스", next_step=None, title=None, lead=None, band_main=None, notes_tail=None):
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
           title or "요구는 고정, 단품은 악화, 보상은 상위 계층으로: 잔여 변수 WAF는 호스트에 있습니다",
           lead or "고용량 QLC의 DWPD 격차를 지금까지 어느 계층이 풀어 왔는지 보면, SSD 단독 최적화는 QoS·성능은 개선했으나 WAF는 낮추지 못했습니다.")

    # ---- 그리드 (v3.0: 요구 열을 줄이고 나머지 3열을 넓혀 차트를 키운다) ----
    LBL_W, GAP, AR_W = 1.30, 0.14, 0.30
    C1_W = 2.70
    COL_W = (CW - LBL_W - GAP - 3 * AR_W - C1_W) / 3
    col_x = [MX + LBL_W + GAP]
    for i in range(3):
        col_x.append(col_x[-1] + (C1_W if i == 0 else COL_W) + AR_W)
    col_w = [C1_W, COL_W, COL_W, COL_W]
    H_Y, H_H = 2.80, 0.56          # 열 헤더
    F_Y, F_H = 3.44, 0.54          # 산식 칩
    R1_Y, R1_H = 4.06, 3.62        # 내구성 행(차트)
    L_Y, L_H = 7.76, 1.46          # 격차 축소 변수 스트립
    PAD = 0.14
    CH_W = 3.95                    # 셀 차트 폭(높이 2.75)

    # ---- 열 헤더: 이관 단계 ----
    heads = [("요구", "고객이 정한다 · 고정", "req"),
             ("단품 지표", "셀 · 다이 · 세대마다 악화", "cell"),
             ("SSD 계층의 보상", "1단계 ECC(완결) · 2단계 단독 최적화(부분 성공)", "ssd"),
             ("호스트 · 시스템 계층의 보상", "3단계 공동 설계 (2022~, 본 덱 4~5장)", "host")]
    for i, (h1, h2, kind) in enumerate(heads):
        x, w = col_x[i], col_w[i]
        hot = kind == "host"
        rect(s, x, H_Y, w, H_H, fill=BLUE if hot else (TINT if kind == "req" else WHITE), line=None if hot else LINE, line_w=0.75)
        tb(s, x + PAD, H_Y + 0.06, w - 2 * PAD, 0.26, [(h1, 13.5, True, WHITE if hot else BLUE)])
        tb(s, x + PAD, H_Y + 0.31, w - 2 * PAD, 0.22, [(h2, 9.75, False, WHITE if hot else GRAY)])
        if 1 <= i < 3:
            rect(s, x + w + 0.03, H_Y + H_H / 2 - 0.11, AR_W - 0.06, 0.22, fill=BLUE if i == 2 else BLUE_T2, shape=MSO_SHAPE.RIGHT_ARROW)
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
    rect(s, MX, R1_Y, LBL_W, R1_H, fill=TINT)
    rect(s, MX, R1_Y, 0.06, R1_H, fill=BLUE)
    tb(s, MX + 0.18, R1_Y + 0.16, LBL_W - 0.26, 0.3, [("내구성 축", 12.75, True, BLUE)])
    tb(s, MX + 0.18, R1_Y + 0.50, LBL_W - 0.26, 0.6, [(ln, 9.75, False, GRAY) for ln in "P/E · BER\nDWPD · WAF".split("\n")], spacing=1.0)

    def cell(x, w, style="plain"):
        if style == "req":
            rect(s, x, R1_Y, w, R1_H, fill=TINT, line=BLUE_T2, line_w=1.0)
        elif style == "host":
            rect(s, x, R1_Y, w, R1_H, fill=WHITE, line=BLUE, line_w=1.5)
        else:
            rect(s, x, R1_Y, w, R1_H, fill=WHITE, line=LINE, line_w=0.75)

    def chip(x, y, w, h, label, value, style):
        """상태 칩: done(파란 테두리) / part(연파랑) / host(파랑)"""
        if style == "done":
            rect(s, x, y, w, h, fill=WHITE, line=BLUE, line_w=1.0)
            lc, vc = GRAY_2, INK
        elif style == "part":
            rect(s, x, y, w, h, fill=BLUE_T2)
            lc, vc = INK, INK
        else:
            rect(s, x, y, w, h, fill=BLUE)
            lc, vc = BLUE_T2, WHITE
        tb(s, x + 0.14, y, 2.5, h, [(label, 9.5, False, lc)], anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x + 0.14, y, w - 0.28, h, [(value, 10.5, True, vc)], align=PP_ALIGN.RIGHT, anchor=MSO_ANCHOR.MIDDLE)

    # ================= col1 요구 =================
    x, w = col_x[0], col_w[0]
    cell(x, w, "req")
    tb(s, x + PAD, R1_Y + 0.16, w - 2 * PAD, 0.2, [("추론 캐시 계층 요구", 9.75, False, GRAY_2)])
    tb(s, x + PAD, R1_Y + 0.38, w - 2 * PAD, 0.52, [("DWPD 1~3", 26, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + PAD, R1_Y + 0.92, w - 2 * PAD, 0.44,
       [("KV 캐시 계층 TLC 제품 정격 수준", 9.0, False, GRAY),
        ("현 QLC 정격 0.6 대비 2~5배", 9.75, True, BLUE)], spacing=1.04)
    rect(s, x + PAD, R1_Y + 1.44, w - 2 * PAD, 0.012, fill=BLUE_T2)
    tb(s, x + PAD, R1_Y + 1.56, w - 2 * PAD, 0.2, [("신뢰성 요구 · JESD218", 9.75, False, GRAY_2)])
    sup_text(x + PAD, R1_Y + 1.78, w - 2 * PAD, 0.5,
             [("UBER 10", 21, True, BLUE, False), ("-15", 12.5, True, BLUE, True), (" · 10", 21, True, BLUE, False), ("-16", 12.5, True, BLUE, True)],
             anchor=MSO_ANCHOR.MIDDLE)
    tb(s, x + PAD, R1_Y + 2.30, w - 2 * PAD, 0.48,
       [("클라이언트 · 엔터프라이즈 등급", 9.0, False, GRAY),
        ("드라이브 고장률 5년 2.2%(OCP 사양)", 9.0, False, GRAY)], spacing=1.04)
    tb(s, x + PAD, R1_Y + R1_H - 0.56, w - 2 * PAD, 0.48,
       [("요구는 고객이 정하고 바뀌지 않습니다", 9.75, True, BLUE)], anchor=MSO_ANCHOR.MIDDLE, spacing=1.0)

    # ================= col2 단품 =================
    x, w = col_x[1], col_w[1]
    cell(x, w)
    chip(x + 0.12, R1_Y + 0.12, w - 0.24, 0.36, "단품 지표", "세대마다 악화", "part")
    img("ladder_component_big.png", x + (w - CH_W) / 2, R1_Y + 0.56, CH_W)
    tb(s, x + PAD, R1_Y + 3.32, w - 2 * PAD, 0.28,
       [("시간에 따라 변하는 산포는 셀 단독으로 보정하지 못합니다", 9.0, False, GRAY)], spacing=1.0)

    # ================= col3 SSD 계층 =================
    x, w = col_x[2], col_w[2]
    cell(x, w)
    chip(x + 0.12, R1_Y + 0.12, w - 0.24, 0.30, "1단계 · 컨트롤러 ECC (1991~)", "UBER 요구 충족", "done")
    chip(x + 0.12, R1_Y + 0.46, w - 0.24, 0.30, "2단계 · SSD 단독 최적화 (~2019)", "WAF ≈ 3에서 멈춤", "part")
    img("ladder_dwpd_trend.png", x + (w - 3.60) / 2, R1_Y + 0.80, 3.60)
    tb(s, x + PAD, R1_Y + 3.34, w - 2 * PAD, 0.26,
       [("DWPD는 용량으로 나눈 지표 · 절대 기입량은 오히려 늘었습니다", 9.0, False, GRAY)], spacing=1.0)

    # ================= col4 호스트·시스템 계층 =================
    x, w = col_x[3], col_w[3]
    cell(x, w, "host")
    chip(x + 0.12, R1_Y + 0.12, w - 0.24, 0.36, "3단계 · 호스트 공동 설계 (2022~)", "조건부 도달", "host")
    img("ladder_waf_pairs.png", x + (w - CH_W) / 2, R1_Y + 0.56, CH_W)
    tb(s, x + PAD, R1_Y + 3.32, w - 2 * PAD, 0.28,
       [("LLM KV 캐시의 WAF 공개 실측은 없습니다 · Phase 2 검증 대상", 9.0, True, BLUE)], spacing=1.0)

    # ================= 격차 축소 변수 스트립 =================
    rect(s, MX, L_Y, LBL_W, L_H, fill=TINT)
    rect(s, MX, L_Y, 0.06, L_H, fill=BLUE_T1)
    tb(s, MX + 0.18, L_Y + 0.10, LBL_W - 0.26, 0.3, [("격차 축소\n변수", 12.0, True, BLUE)], spacing=1.0)
    tb(s, MX + 0.18, L_Y + 0.70, LBL_W - 0.26, 0.7, [("모두 병행 중 · 본 보고는\n호스트 축을 다룸", 9.0, False, GRAY)], spacing=1.0)
    levers = [("다이 세대", "P/E ↑ · 2Tb QLC", "셀 · 다이", False), ("OP", "(1 + OP) · 예비 용량", "SSD", False),
              ("SLC 캐시 · 쓰기 정형", "GC 효율 · 순차화", "SSD", False), ("보증연수 · TBW 기준", "365 × 년 · 정격 산정", "고객 · 계약", False),
              ("워크로드 재정의", "어드미션 · TLC 혼합 계층", "고객 · 앱", False), ("호스트 배치 (WAF)", "≈3 → ≈1 · 유효 DWPD ×3", "호스트 · 앱 · 본 보고", True)]
    lx0 = col_x[0]
    lw_total = RIGHT - lx0
    n = len(levers)
    gap = 0.12
    lw = (lw_total - (n - 1) * gap) / n
    ly = L_Y + 0.10
    lh = 0.86
    for i, (nm, what, who, hot) in enumerate(levers):
        x = lx0 + i * (lw + gap)
        rect(s, x, ly, lw, lh, fill=BLUE if hot else WHITE, line=None if hot else LINE, line_w=0.75)
        tb(s, x + 0.12, ly + 0.05, lw - 0.24, 0.2, [(who, 8.75, False, WHITE if hot else GRAY_2)])
        tb(s, x + 0.12, ly + 0.26, lw - 0.24, 0.26, [(nm, 11.25, True, WHITE if hot else INK)])
        tb(s, x + 0.12, ly + 0.53, lw - 0.24, 0.32, [(what, 8.75, False, WHITE if hot else GRAY)], spacing=1.0)
    tb(s, lx0, ly + lh + 0.06, lw_total, 0.40,
       [("호스트 배치 하나로는 요구 대비 2~5배 격차가 해소되지 않습니다. WAF 약 3배는 다이 세대·OP·보증연수·워크로드 재정의와 결합해 요구에 도달하며, 이 중 호스트·고객 측 변수가 다수라는 점이 공동 설계의 근거입니다", 9.0, False, GRAY)], spacing=1.02)

    band(s, 9.42, 0.80, "결론",
         band_main or ("요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층이 보상해 왔습니다.\n"
                       "호스트 공동 설계는 QLC DWPD의 잔여 변수 WAF를 결정하며, 다이 세대·OP·보증연수 등 병행 중인 축과 결합해 격차를 줄입니다"),
         main_size=16.5, next_step=next_step)
    footer(s, "출처: JESD218(UBER)·OCP 사양(고장률), ATP·Kioxia(DWPD 산식), Intel·Solidigm·Kioxia 사양(정격 DWPD·허용 기입량), Mielke·Cai(RBER), WD(LDPC), Meta CacheLib 문서·Kioxia XD8 브리프(WAF 실측), FAST'26 WARP(조건부성) · 등급은 부록 A", page_no)
    notes(s, f"{page_no}장은 이관 매트릭스입니다. 고용량 QLC의 DWPD 격차를 받아, 지금까지 단품이 못 푼 문제를 어느 계층이 풀어 왔는지의 경향을 보이고 호스트 시스템 수준 해법이 왜 필요한지를 세웁니다. 열은 이관 단계, 행은 내구성 축입니다. 산식 DWPD = P/E × (1+OP) ÷ WAF ÷ 365 × 년의 각 항은 결정 주체가 열과 대응합니다. "
          "요구 열입니다. 추론 캐시 계층 제품의 정격은 1에서 3 DWPD이고 현 QLC 정격 0.6과는 2배에서 5배 격차입니다. UBER는 JESD218 기준으로 고정이며 드라이브 고장률 요구는 2장에서 SSD 내부 구조로 충족됩니다. "
          "단품 열입니다. P/E 사이클은 SLC 3만에서 10만 회에서 QLC 100에서 1천 회로 약 100배 줄었고 RBER은 약 백만 배 올랐습니다. 셀은 시간에 따라 변하는 산포를 단독으로 보정하지 못합니다. "
          "SSD 계층 열입니다. 1단계 컨트롤러 ECC는 512바이트당 1비트에서 킬로바이트당 120비트 LDPC로 60배 강화되어 UBER 요구를 충족했고 완결된 이관입니다. 2단계 SSD 단독 워크로드 최적화는 2014년에서 2019년의 멀티스트림, 오토스트림, FTL 핫콜드 추정, NVMe IO 결정성인데 QoS와 성능은 개선했지만 데이터 수명을 SSD가 감지할 수 없어 실 워크로드 WAF는 3 수준에 머물렀습니다. 차트가 그 결과입니다. 정격 DWPD는 2008년 17에서 2025년 0.3으로 57배 내려갔습니다. 다만 이 숫자만 읽으면 오독입니다. DWPD는 용량으로 나눈 지표이므로 드라이브당 하루 허용 기입량으로 환산하면 1.1TB에서 73.7TB로 67배 올라갔습니다. 요구가 줄어든 것이 아니라 분모가 커진 것입니다. "
          "호스트 계층 열입니다. 호스트가 데이터 수명을 지정하면 WAF가 1 근처로 내려갑니다. 여기서 연도별 추이선을 그리지 않은 이유가 중요합니다. Meta의 CacheLib 공식 문서를 보면 같은 드라이브, 같은 트레이스인데도 디바이스 사용률이 100%일 때 기준 WAF가 3.22, 50%일 때 1.22로 2.6배 차이가 납니다. 연도축에 서로 다른 실험을 늘어놓으면 이 교란변수가 숨습니다. 그래서 기법별로 적용 전과 후를 짝지어 조건과 함께 표기했습니다. CacheLib 사용률 100%에서 3.22에서 1.03, 사용률 50%에서 1.22에서 1.03, Kioxia XD8 CacheBench에서 2.8에서 약 1.0입니다. 주의할 점은 CacheLib의 KV 캐시가 LLM KV 캐시가 아니라 Meta 소셜그래프용 키값 캐시라는 것입니다. LLM KV 캐시 오프로드의 WAF 공개 실측은 2026년 9월 현재 없으며, FAST 2026의 WARP 연구는 수명 오분류나 핸들 간 간섭이 있으면 배치 분리가 WAF를 낮추지 못한다고 보고합니다. 그래서 이 장의 주장은 조건부이고 4장 Phase 2 실측이 그 검증입니다. "
          "하단 격차 축소 변수 스트립이 이 장의 핵심 정정입니다. 호스트 배치 하나로는 요구 대비 2배에서 5배 격차가 해소되지 않습니다. WAF 변수는 유효 DWPD 약 3배이고, 다이 세대, OP, SLC 캐시와 쓰기 정형, 보증연수와 TBW 기준, 워크로드 재정의와 결합해야 요구에 도달합니다. 이 축들은 모두 병행 중이며 본 보고는 호스트 축만 다룹니다. 호스트와 고객 쪽 변수가 다수라는 점이 공동 설계의 근거입니다. " + (notes_tail or "신뢰성 축(다이 수·고장률)은 호스트가 아니라 SSD가 풀 문제라 별도로 다룹니다.") + " 근거 등급은 보고서 부록 A에 있습니다.")

    return s
