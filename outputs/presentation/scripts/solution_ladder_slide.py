# -*- coding: utf-8 -*-
"""해법 사다리 슬라이드 v4.0 — 핵심 체인만 (2026-09-23: 이관 매트릭스·격차 축소 변수 제거, 차트 3종을 5.9in으로 확대) — 공용 빌더.

두 덱이 같은 코드를 쓴다: (1) 단독 1장 덱 generate_solution_ladder_pptx.py, (2) QLC eSSD 전략 덱 3장(generate_qlc_ssd_strategy_pptx.py, v7.0).
build(ns, page_no, kicker, next_step, title, lead, band_main, notes_tail): ns = 헬퍼 네임스페이스(deck_kit 또는 QLC 스크립트 모듈).

v4.0 변경(피드백 "핵심은 QLC에서 DWPD 1~3을 만족하려면 WAF를 줄여야 하고, 그러려면 호스트가 수명이 같은 데이터를 묶어 힌트와 함께 내려보내야 한다는 것.
그 표현에 필요한 부분만 남기고 나머지 제거. 격차 축소 변수 스트립은 없어도 된다. 남는 공간은 그래프 확대에"):
 - 4열 이관 매트릭스(요구·단품·SSD·호스트 셀)와 격차 축소 변수 스트립을 삭제
 - 남는 것: ① DWPD 산식 칩(항별 결정 주체 — WAF만 호스트) ② 논증 3단계 체인 ③ 확대 차트 3종 ④ 결론 한 줄
 - 차트는 3.95 → 5.90in 폭(높이 4.10)으로 확대. 같은 PNG를 키워 배치하므로 글자도 1.36배로 커진다
근거: sources/articles/component-to-system-solution-ladder-facts-2026-09.md §7~§10 · qlc-v6-waf-measurement-trend-2026-09.md
"""
import os

from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches


def build(ns, page_no=1, kicker="메모리 해법 사다리 · 핵심 체인", next_step=None, title=None, lead=None, band_main=None, notes_tail=None):
    prs, BLANK = ns.prs, ns.BLANK
    header, tb, rect, band, footer, notes = ns.header, ns.tb, ns.rect, ns.band, ns.footer, ns.notes
    BLUE, BLUE_T1, BLUE_T2, INK, GRAY, GRAY_2, LINE, TINT, WHITE = (ns.BLUE, ns.BLUE_T1, ns.BLUE_T2, ns.INK, ns.GRAY,
                                                                   ns.GRAY_2, ns.LINE, ns.TINT, ns.WHITE)
    MX, CW, RIGHT, ASSETS = ns.MX, ns.CW, ns.RIGHT, ns.ASSETS

    def img(name, x, y, w):
        return s.shapes.add_picture(os.path.join(ASSETS, name), Inches(x), Inches(y), width=Inches(w))

    s = prs.slides.add_slide(BLANK)
    header(s, kicker,
           title or "QLC로 요구 DWPD에 닿는 잔여 변수는 WAF이고, WAF는 호스트가 결정합니다",
           lead or "정격 DWPD는 셀·디바이스·계약이 정한 항의 곱입니다. 그 항을 빼고 남는 것이 WAF이며, 이 항만 호스트가 쥐고 있습니다.")

    # ---- ① DWPD 산식: 항별 결정 주체 ----
    F_Y, F_H = 2.80, 0.78
    rect(s, MX, F_Y, CW, F_H, fill=WHITE, line=LINE, line_w=0.75)
    tb(s, MX + 0.26, F_Y + 0.10, 2.2, 0.26, [("DWPD 산식", 12.0, True, BLUE)])
    tb(s, MX + 0.26, F_Y + 0.36, 2.2, 0.24, [("항별 결정 주체", 9.75, False, GRAY_2)])
    terms = [("DWPD", "요구 · 고객", "req"), ("=", None, "op"), ("P/E", "셀 · 다이", "cell"), ("×", None, "op"),
             ("1 + OP", "SSD", "ssd"), ("÷", None, "op"), ("WAF", "호스트 · 앱", "host"), ("÷", None, "op"),
             ("365 × 년", "계약", "req")]
    bw, ow, bh = 1.40, 0.34, 0.38
    tot = sum(bw if k != "op" else ow for _, _, k in terms) + 0.10 * (len(terms) - 1)
    x = MX + 2.9 + (CW - 2.9 - tot) / 2
    y = F_Y + 0.10
    for text, owner, kind in terms:
        if kind == "op":
            tb(s, x, y, ow, bh, [(text, 15, False, GRAY)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
            x += ow + 0.10
            continue
        hot = kind == "host"
        fill, line, col = (BLUE, None, WHITE) if hot else ((TINT, BLUE_T2, INK) if kind == "req" else (WHITE, LINE, INK))
        rect(s, x, y, bw, bh, fill=fill, line=line, line_w=0.75)
        tb(s, x, y, bw, bh, [(text, 13.5, True, col)], align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)
        tb(s, x - 0.12, y + bh + 0.02, bw + 0.24, 0.20, [(owner, 9.0, hot, BLUE if hot else GRAY_2)], align=PP_ALIGN.CENTER)
        x += bw + 0.10

    # ---- ② 논증 3단계 ----
    S_Y, S_H = 3.70, 0.76
    steps = [("요구", "추론 캐시 계층 1~3 DWPD", "현 QLC 정격 0.6 · 2~5배 부족"),
             ("잔여 변수", "P/E · OP · 보증연수를 빼면 남는 항은 WAF", "SSD 단독 최적화는 WAF 3에서 멈췄다"),
             ("결정 주체", "WAF는 호스트가 데이터를 어떻게 놓느냐로 정해진다", "수명이 같은 데이터를 묶어 힌트와 함께 → 4장")]
    sw = (CW - 2 * 0.44) / 3
    for i, (lab, main, sub) in enumerate(steps):
        sx = MX + i * (sw + 0.44)
        hot = i == 2
        rect(s, sx, S_Y, sw, S_H, fill=BLUE if hot else TINT, line=None if hot else BLUE_T2, line_w=1.0)
        tb(s, sx + 0.22, S_Y + 0.06, sw - 0.44, 0.22, [(lab, 9.75, False, BLUE_T2 if hot else GRAY_2)])
        tb(s, sx + 0.22, S_Y + 0.26, sw - 0.44, 0.26, [(main, 12.75, True, WHITE if hot else INK)])
        tb(s, sx + 0.22, S_Y + 0.52, sw - 0.44, 0.22, [(sub, 9.75, False, BLUE_T2 if hot else GRAY)])
        if i < 2:
            rect(s, sx + sw + 0.08, S_Y + S_H / 2 - 0.12, 0.28, 0.24, fill=BLUE, shape=MSO_SHAPE.RIGHT_ARROW)

    # ---- ③ 확대 차트 3종 ----
    CH_W = 5.90
    CH_Y = 4.62
    gap = (CW - 3 * CH_W) / 2
    for i, name in enumerate(["ladder_component_big.png", "ladder_dwpd_trend.png", "ladder_waf_pairs.png"]):
        img(name, MX + i * (CH_W + gap), CH_Y, CH_W)

    # ---- ④ 결론 한 줄 ----
    K_Y = 9.22 - 0.46
    rect(s, MX, K_Y, CW, 0.46, fill=TINT)
    rect(s, MX, K_Y, 0.06, 0.46, fill=BLUE)
    tb(s, MX + 0.26, K_Y, CW - 0.52, 0.46,
       [[("LLM KV 캐시의 WAF 공개 실측은 아직 없습니다  ", 11.25, True, BLUE),
         ("FAST'26 WARP는 수명 오분류·핸들 간 간섭이 있으면 분리가 WAF를 낮추지 못한다고 보고합니다 · 4장 ④ 혼재 케이스 · 검증은 Phase 2", 10.5, False, GRAY)]],
       anchor=MSO_ANCHOR.MIDDLE)

    band(s, 9.42, 0.80, "결론",
         band_main or ("QLC 정격 DWPD를 결정하는 항 가운데 셀·디바이스·계약이 정한 것을 빼면 남는 변수는 WAF뿐입니다.\n"
                       "그리고 WAF는 호스트가 데이터를 어떻게 놓느냐로 정해집니다"),
         main_size=16.5, next_step=next_step)
    footer(s, "출처: ATP·Kioxia(DWPD 산식), Intel·Solidigm·Kioxia 사양(정격 DWPD·허용 기입량), Mielke·Cai(RBER), WD(LDPC), Meta CacheLib 문서·Kioxia XD8 브리프(WAF 실측), FAST'26 WARP(조건부성) · 등급은 부록 A", page_no)
    notes(s, f"{page_no}장은 둘째 축 내구성입니다. 핵심 사슬은 셋입니다. QLC로 추론 캐시 계층의 요구 1에서 3 DWPD에 닿아야 하고, 그러려면 WAF를 낮춰야 하며, WAF는 호스트가 결정한다는 것입니다. "
          "맨 위 산식이 그 논증의 뼈대입니다. DWPD는 P/E 곱하기 1 더하기 OP를 WAF와 365 곱하기 보증연수로 나눈 값입니다. P/E는 셀이, OP는 디바이스가, 보증연수는 계약이 정합니다. 이 항들을 빼고 남는 것이 WAF이고, 이 항만 호스트와 애플리케이션이 쥐고 있습니다. "
          "가운데 세 단계가 논증입니다. 요구는 1에서 3 DWPD인데 현 QLC 정격은 0.6으로 2배에서 5배 부족합니다. 남는 변수는 WAF인데 SSD 단독 최적화는 2014년에서 2019년 사이의 멀티스트림과 FTL 추정으로도 WAF 3에서 멈췄습니다. 데이터 수명을 SSD가 알 수 없기 때문입니다. 그래서 결정 주체는 호스트이고, 수명이 같은 데이터를 묶어 힌트와 함께 내려보내야 합니다. 그 메커니즘이 4장입니다. "
          "아래 세 그래프가 근거입니다. 왼쪽은 셀이 세대마다 나빠진다는 것으로, P/E 사이클은 100배 줄고 RBER은 약 백만 배 올랐습니다. 가운데는 정격 DWPD가 17에서 0.3으로 57배 내려간 반면 드라이브당 하루 허용 기입량은 1.1에서 73.7테라바이트로 67배 올랐다는 것입니다. DWPD는 용량으로 나눈 지표이므로 단독으로 읽으면 오독입니다. 오른쪽은 호스트가 수명을 알려 줄 때 WAF가 1 근처로 내려간 공개 실측입니다. 같은 드라이브, 같은 트레이스라도 디바이스 사용률이 100%면 기준 WAF가 3.22, 50%면 1.22이므로 조건을 함께 적었습니다. 그래서 연도축 추이선 대신 기법별 전후 쌍으로 그렸습니다. "
          "맨 아래 한 줄이 이 장의 정직한 한계입니다. LLM KV 캐시 워크로드의 WAF 공개 실측은 아직 없고, FAST 2026의 WARP 연구는 수명 오분류나 핸들 간 간섭이 있으면 분리가 WAF를 낮추지 못한다고 보고합니다. 4장 넷째 케이스가 그 상황이며 검증은 Phase 2입니다. " + (notes_tail or ""))

    return s
