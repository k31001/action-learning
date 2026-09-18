# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드(네 지표 P/E · BER · DWPD · WAF) — 공용 빌더.

두 덱이 같은 코드를 쓴다: (1) 단독 1장 덱 generate_solution_ladder_pptx.py, (2) QLC eSSD 전략 덱 1장(generate_qlc_ssd_strategy_pptx.py).
build(ns, page_no, kicker, next_step): ns = 헬퍼 네임스페이스(deck_kit 모듈 또는 QLC 스크립트 모듈) — prs·BLANK·header·tb·rect·band·footer·notes·토큰을 제공해야 한다.
  kicker: 킥커 문자열, 또는 정수(QLC 덱 스토리 레일의 현재 장 번호) / next_step: 결론 밴드 우측 '다음 장' 포인터(QLC 덱에서 2)
차트: assets/solution_metrics_chart.png (generate_solution_metrics_chart.py)
v3.10(2026-09-18): 문안을 공식 용어로(보상·이관), 산식 카드·구조 카드의 설명 문장 삭제, 구조 카드를 3행으로 확장.
v1.3/v3.11(2026-09-18): 사용자 정정 — 이관의 3단계 = 1 ECC(완결) / 2 SSD 단독 워크로드 최적화(부분 성공: QoS·성능 ↑, WAF ≈3) / 3 호스트 시스템 공동 설계(WAF 1.0, QLC로 요구 DWPD를 충족하는 유일한 경로). 근거 소스 §8 F36~F40.
"""
import os

from PIL import Image
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches


def build(ns, page_no=1, kicker="메모리 해법 사다리 · P/E · BER · DWPD · WAF", next_step=None):
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
           "ECC가 RBER을 보상했듯 P/E 감소는 WAF로 보상해야 하며, 이는 호스트 공동 설계로만 가능합니다",
           "QLC의 내구성 격차를 어느 계층이 해소하는가: SSD 단독 최적화는 QoS·성능은 개선했으나 WAF는 낮추지 못했습니다.")

    # ---- 좌: 네 지표 차트 ----
    C_Y, C_H = 2.80, 6.40
    C_W = C_H * ASPECT
    s.shapes.add_picture(CHART, Inches(MX), Inches(C_Y), height=Inches(C_H))

    # ---- 우: 산식 카드 (항별 결정 주체) ----
    RX = MX + C_W + 0.34
    RW = RIGHT - RX
    F_H = 1.36
    rect(s, RX, C_Y, RW, F_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, RX + 0.26, C_Y + 0.12, RW - 0.52, 0.28, [("DWPD 산식 — 항별 결정 주체", 15, True, BLUE)])
    terms = [("DWPD", "고객 요구", "req"), ("=", None, "op"), ("P/E", "셀 · 다이", "cell"), ("×", None, "op"),
             ("1 + OP", "디바이스", "dev"), ("÷", None, "op"), ("WAF", "호스트 · 앱", "lever"), ("÷", None, "op"),
             ("365 × 년", "고객 요구", "req")]
    bw, ow, bh = 1.02, 0.26, 0.46
    tot = sum(bw if t[2] != "op" else ow for t in terms) + 0.06 * (len(terms) - 1)
    x = RX + (RW - tot) / 2
    y = C_Y + 0.54
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

    # ---- 우: 이관의 3단계 (1 ECC 완결 / 2 SSD 단독 최적화 부분 성공 / 3 호스트 공동 설계 = 본 덱) ----
    S_Y = C_Y + F_H + 0.18
    S_H = 9.42 - 0.20 - S_Y
    rect(s, RX, S_Y, RW, S_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, RX + 0.26, S_Y + 0.12, RW - 0.52, 0.28, [("이관의 3단계 — 요구 고정 · 단품 지표 악화 · 보상 계층의 상승", 15, True, BLUE)])
    # (행 제목, 상태 텍스트, 상태 성공 여부, [(who, what, sub, 스타일)]) 스타일: "hot"=파랑, "part"=연파랑(부분 성공), "req"=틴트(요구 충족), "fail"=흰색·회색(미충족), "" = 흰색
    rows = [("1단계  NAND → SSD  (1991~)", "UBER 요구 충족", True,
             [("셀", "RBER 백만 배 ↑", "산포가 시간에 따라 변화", ""), ("컨트롤러", "ECC 60배 ↑", "1bit/512B → LDPC 120bit/KB", "hot"),
              ("고객", "UBER 요구 충족", "JESD218 유지", "req")]),
            ("2단계  SSD 단독 워크로드 최적화  (2014~2019)", "DWPD 요구 미충족 · 부분 성공", False,
             [("셀 · SSD", "P/E 100배 ↓", "정격 DWPD 0.4", ""), ("SSD · 드라이버", "QoS · 성능 개선", "핫/콜드 추정 · 스트림 · IO 결정성 → WAF ≈ 3 유지", "part"),
              ("고객", "DWPD 요구 미충족", "격차 10~40배", "fail")]),
            ("3단계  호스트 시스템 공동 설계  (2022~, 본 덱)", "DWPD 요구 충족 · 유일한 경로", True,
             [("호스트 · 앱", "데이터 수명 지정", "배치 표준 · 캐시 관리자 정책", ""), ("삼성 · 고객 공동 설계", "WAF 3.2 → 1.0", "FDE · SCA · 유효 DWPD ×3.1", "hot"),
              ("고객", "DWPD 요구 충족", "QLC로 정격 내 수명 보증", "req")])]
    cw3 = (RW - 0.52 - 2 * 0.34) / 3
    ch3 = 0.86
    ry = S_Y + 0.54
    for title, status, ok, chips in rows:
        deck = title.startswith("3단계")
        tb(s, RX + 0.26, ry, RW - 0.52 - 2.6, 0.24, [(title, 11.25, True, BLUE if deck else INK)])
        tb(s, RX + RW - 0.26 - 2.6, ry, 2.6, 0.24, [(status, 10.5, True, BLUE if ok else GRAY_2)], align=PP_ALIGN.RIGHT)
        cy = ry + 0.30
        cx = RX + 0.26
        for i, (who, what, sub, st) in enumerate(chips):
            if st == "hot":
                rect(s, cx, cy, cw3, ch3, fill=BLUE)
                c_who, c_what, c_sub = WHITE, WHITE, WHITE
            elif st == "part":
                rect(s, cx, cy, cw3, ch3, fill=BLUE_T2)
                c_who, c_what, c_sub = INK, INK, GRAY
            elif st == "req":
                rect(s, cx, cy, cw3, ch3, fill=TINT, line=BLUE_T2, line_w=1.0)
                c_who, c_what, c_sub = GRAY_2, INK, GRAY
            elif st == "fail":
                rect(s, cx, cy, cw3, ch3, fill=WHITE, line=GRAY_2, line_w=1.0)
                c_who, c_what, c_sub = GRAY_2, GRAY, GRAY_2
            else:
                rect(s, cx, cy, cw3, ch3, fill=WHITE, line=LINE, line_w=0.75)
                c_who, c_what, c_sub = GRAY_2, INK, GRAY
            tb(s, cx + 0.1, cy + 0.06, cw3 - 0.2, 0.22, [(who, 9.75, False, c_who)])
            tb(s, cx + 0.1, cy + 0.27, cw3 - 0.2, 0.26, [(what, 12.0, True, c_what)])
            tb(s, cx + 0.1, cy + 0.53, cw3 - 0.2, 0.30, [(sub, 8.75, False, c_sub)], spacing=1.0)
            if i < 2:
                rect(s, cx + cw3 + 0.05, cy + ch3 / 2 - 0.10, 0.24, 0.2, fill=BLUE if st in ("hot", "") and i == 0 or st == "hot" else BLUE_T2,
                     shape=MSO_SHAPE.RIGHT_ARROW)
            cx += cw3 + 0.34
        ry = cy + ch3 + 0.20

    band(s, 9.42, 0.80, "결론",
         "요구(UBER·DWPD)는 고정, 단품 지표(RBER·P/E)는 악화, 격차는 상위 계층의 변수(ECC·WAF)가 보상해 왔습니다.\n"
         "QLC로 요구 DWPD를 충족하는 경로는 호스트 시스템 공동 설계뿐이며, 이는 산식의 귀결입니다",
         main_size=17, next_step=next_step)
    footer(s, "출처: JESD218(UBER·보존), ATP·Kioxia(DWPD 산식·WAF 3), Intel X25-E·S3700·P4510 및 Solidigm P5316 사양(정격 DWPD), Mielke·Cai(RBER), WD ECC/DSP 백서(LDPC 120bit/KB), CacheLib FDP(WAF), HotStorage'14·SYSTOR'17·NVMe 1.4(SSD 단독 최적화) · 등급은 보고서 부록 A F28~F40", page_no)
    notes(s, "1장은 QLC의 내구성 격차를 어느 계층이 해소하는가를 네 지표로 답합니다. 왼쪽 차트는 인과 순서입니다. ① 셀의 한계: 비트/셀을 늘릴수록 셀이 견디는 P/E 사이클이 SLC 30K~100K에서 QLC 100~1K로 100배 감소했습니다. "
          "② 컨트롤러의 보상: 같은 기간 RBER은 SLC 10의 -9~-7승에서 QLC 10의 -3~-2승으로 약 백만 배 상승했지만, 고객의 UBER 요구(JESD218: 클라이언트 10의 -15승, 엔터프라이즈 10의 -16승)는 고정이었습니다. 그 격차를 컨트롤러가 ECC로 보상했습니다. 1비트/512B에서 BCH 60비트/KB, LDPC 120비트/KB로 약 60배입니다. 셀은 보존·사이클링·리드 디스터브로 시간에 따라 변하는 산포를 단독으로 보정하지 못하므로, 이것이 NAND에서 SSD로의 1단계 이관이며 완결된 이관입니다. "
          "③ 결과: ECC는 BER을 보상하지만 P/E를 늘리지는 못합니다. 정격 DWPD는 X25-E SLC 17(2008), S3700 eMLC 10(2012), P4510 TLC 0.7(2018), P5316 QLC 0.41(2021), 최신 QLC 0.075~0.6으로 하락했는데, 추론 캐시 계층의 요구는 TLC 수준 1~3, ScaleFlux가 제시한 유효 요구는 7~10입니다. 10~40배 격차입니다. "
          "④ WAF: 2단계는 SSD 진영이 디바이스와 드라이버 안에서 워크로드에 적응하려 한 시도입니다. Multi-stream(2014)·AutoStream(2017)·FTL 핫/콜드 추정·NVMe IO 결정성(NVM Sets·Predictable Latency Mode, 2019)이 여기에 속합니다. 테일 지연 등 QoS와 성능은 개선했으나, 데이터의 수명은 호스트와 애플리케이션만 아는 정보라 디바이스가 완전히 감지할 수 없고, 실 워크로드의 WAF는 3 수준에 머물렀습니다(랜덤 쓰기 3.00, CacheLib 배치 표준 미적용 3.22). 3단계는 호스트 시스템 공동 설계입니다. 호스트가 데이터 수명을 지정(배치 표준)하고 캐시 관리자·애플리케이션 정책까지 함께 설계하면 WAF는 1.03이 됩니다. 68% 감소, 유효 DWPD 3.1배입니다. "
          "오른쪽 위는 산식과 항별 결정 주체입니다. DWPD = P/E × (1+OP) ÷ (WAF × 365 × 년)에서 P/E는 셀, OP는 디바이스, 년과 요구 DWPD는 고객이 결정합니다. P/E가 100배 감소했으므로 남은 보상 변수는 WAF뿐입니다. 오른쪽 아래는 이관의 3단계입니다. 1단계 ECC는 UBER 요구를 충족해 완결됐고, 2단계 SSD 단독 최적화는 QoS·성능을 개선했으나 WAF를 낮추지 못해 DWPD 요구를 충족하지 못했으며, 3단계 호스트 시스템 공동 설계가 WAF를 1로 낮춰 DWPD 요구를 충족합니다. 본 덱 2~5장이 3단계입니다. 결론: QLC로 요구 DWPD를 충족하는 경로는 호스트 시스템 공동 설계뿐이며, 이는 산식의 귀결입니다. 그 규격이 언제 정의되는지가 2장입니다. 근거 등급은 보고서 부록 A F28~F40에 있습니다.")

    return s
