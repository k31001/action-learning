/**
 * 「호황은 전략을 심는 계절이다」 — 스토리라인 공통 개요편 10장 덱 생성.
 *
 * 원문:   outputs/storyline/common-overview.md
 * 아웃라인: outputs/presentation/storyline-common-overview-outline.md
 * 출력:   outputs/presentation/storyline-common-overview.pptx
 *
 * 실행: node outputs/presentation/scripts/generate_storyline_overview.cjs
 *       (pptxgenjs 필요 — npm i pptxgenjs, NODE_PATH로 주입 가능)
 *
 * 디자인 시스템 하드 룰:
 *  - 캔버스 13.333×7.5in, 여백 0.67, 콘텐츠 폭 12.0
 *  - 제목 40pt — 덱 내 모든 텍스트 20pt 이상 (표 셀·라벨·페이지 번호 포함)
 *  - 내용 슬라이드(S2~S9)는 제목 아래 핵심 메시지 밴드 고정
 *  - 컬러: Samsung Blue #1428A0 모노크롬 축 + 판정용 레드 #C00000, 그림자·그라데이션 금지
 *  - 데이터 그래픽은 도형으로 직접 드로잉 (하이라이트-원 · 직접 라벨 · 범례 없음)
 */
const pptxgen = require('pptxgenjs');
const path = require('path');

const ASSETS = path.join(__dirname, '..', 'assets', 'storyline-overview');
const OUT = path.join(__dirname, '..', 'storyline-common-overview.pptx');

// ── 컬러 토큰 (디자인 스펙 §1 — 이 표 밖의 색 사용 금지) ──────────────
const C = {
  BLUE: '1428A0', NAVY: '0A1854', NAVY_RAISED: '16276E',
  BLUE70: '5A68BC', BLUE40: 'A1A9D9', BLUE12: 'E3E7F5', TINT: 'F4F6FB',
  TXT: '111111', BODY: '333333', MUTED: '767676',
  INV: 'FFFFFF', INV_SUB: 'C9D2F0', INV_MUTED: '8E9AC9',
  WHITE: 'FFFFFF', ROW_ALT: 'FAFAFA', HAIRLINE: 'E5E7EB',
  NEG: 'C00000', NEG_BG: 'FAE7E8', GRAY: 'D1D5DB',
};
const F = '맑은 고딕';
const RAD = 0.08;

const pres = new pptxgen();
pres.defineLayout({ name: 'W169', width: 13.333, height: 7.5 });
pres.layout = 'W169';
pres.theme = { headFontFace: F, bodyFontFace: F };

// ── 헬퍼 ────────────────────────────────────────────────────────────────
function tx(s, text, o) {
  s.addText(text, Object.assign({ fontFace: F, margin: 0, align: 'left', valign: 'top' }, o));
}
function runs(parts, base) {
  // parts: [text, opts?][] → pptxgenjs 텍스트 런 배열 (옵션 객체는 매번 새로 생성)
  return parts.map(([t, o]) => ({ text: t, options: Object.assign({ fontFace: F }, base, o) }));
}
function rect(s, x, y, w, h, fill, line) {
  const o = { x, y, w, h, fill: { color: fill } };
  if (line) o.line = { color: line.color, width: line.width };
  s.addShape('rect', o);
}
function rrect(s, x, y, w, h, o = {}) {
  const opt = { x, y, w, h, rectRadius: o.radius != null ? o.radius : RAD };
  if (o.fill) opt.fill = { color: o.fill };
  else opt.fill = { color: 'FFFFFF', transparency: 100 };
  if (o.line) opt.line = { color: o.line.color, width: o.line.width };
  s.addShape('roundRect', opt);
}
function hline(s, x1, x2, y, color, width) {
  s.addShape('line', { x: x1, y, w: x2 - x1, h: 0, line: { color, width } });
}
function arrow(s, x1, y1, x2, y2, o = {}) {
  s.addShape('line', {
    x: x1, y: y1, w: x2 - x1, h: y2 - y1,
    line: Object.assign(
      { color: o.color || C.BLUE40, width: o.width || 2, endArrowType: 'arrow' },
      o.dash ? { dashType: 'dash' } : {},
      o.noHead ? { endArrowType: 'none' } : {}
    ),
  });
}
function dashCircle(s, cx, cy, d, color) {
  s.addShape('ellipse', {
    x: cx - d / 2, y: cy - d / 2, w: d, h: d,
    fill: { color: 'FFFFFF', transparency: 100 },
    line: { color, width: 1.5, dashType: 'dash' },
  });
}

// S2~S9 공통 크롬: 제목 + 핵심 메시지 밴드 + 풋터(출처·페이지 번호)
function contentSlide(num, title, band, src) {
  const s = pres.addSlide();
  s.background = { color: C.WHITE };
  tx(s, title, { x: 0.67, y: 0.36, w: 12.0, h: 0.75, fontSize: 40, bold: true, color: C.TXT, valign: 'middle', lineSpacingMultiple: 1.05 });
  rect(s, 0.67, 1.26, 12.0, 0.62, C.TINT);
  const bandText = Array.isArray(band) ? runs(band, { fontSize: 24, bold: true, color: C.NAVY }) : band;
  tx(s, bandText, { x: 0.94, y: 1.26, w: 11.6, h: 0.62, fontSize: 24, bold: true, color: C.NAVY, valign: 'middle' });
  if (src) tx(s, src, { x: 0.67, y: 7.04, w: 9.6, h: 0.34, fontSize: 20, color: C.MUTED, valign: 'middle' });
  tx(s, `${String(num).padStart(2, '0')} / 10`, { x: 11.47, y: 7.04, w: 1.2, h: 0.34, fontSize: 20, color: C.MUTED, align: 'right', valign: 'middle' });
  return s;
}

// ════════════════════════════════════════════════════════════════════════
// S1 — 표지 (다크 히어로)
// ════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addImage({ path: path.join(ASSETS, 'hero-cover-composited.png'), x: 0, y: 0, w: 13.333, h: 7.5 });
  tx(s, 'SAMSUNG ELECTRONICS · 메모리사업부', { x: 0.90, y: 0.90, w: 11.5, h: 0.40, fontSize: 20, bold: true, color: C.INV, charSpacing: 2 });
  tx(s, '호황은 전략을 심는 계절이다', { x: 0.90, y: 3.95, w: 11.5, h: 1.00, fontSize: 44, bold: true, color: C.INV, lineSpacingMultiple: 1.1 });
  tx(s, '다음 다운턴을 준비하는 세 개의 저지선 · 공통 개요편', { x: 0.90, y: 5.15, w: 11.5, h: 0.50, fontSize: 24, color: C.INV_SUB });
  tx(s, '낸드 · DRAM · SSD · 제조 · 인사 · 기획 · 구매 — 7편 제안의 공통 지도 · 2026. 8.', { x: 0.90, y: 6.65, w: 11.5, h: 0.40, fontSize: 20, color: C.INV_MUTED });
  s.addNotes('이 보고서는 사상 최대 실적의 예찬이 아니라 다운턴 준비 보고서라는 선언으로 연다. 호황이 끝난 뒤를 대비하는 전략은 호황일 때만 심을 수 있다는 것이 제목의 뜻이다[5]. 일곱 편의 제안(낸드·DRAM·SSD·제조·인사·기획·구매)이 공유하는 공통의 전제를 이 개요편이 놓는다.');
}

// ════════════════════════════════════════════════════════════════════════
// S2 — 이 보고서의 지도 (4단 논증 로드맵 + 7편 핸드오프 배지)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(2, '이 보고서의 지도',
    [['과거를 다시 읽지 않으면, ', {}], ['미래의 준비가 과거의 반복이 된다', { color: C.BLUE }]], null);

  const cards = [
    { k: '01 · 진단', q: '이 호황은\n누가 만들었나', b: '수요는 외생 변수', ref: 'S3 – S4' },
    { k: '02 · 역사', q: '게임의 룰은\n어떻게 바뀌었나', b: '3+1 다운턴', ref: 'S5 – S6' },
    { k: '03 · 재감사', q: '무엇이 통했고\n무엇이 부러졌나', b: '판정 ◎ 4 · ✕ 2', ref: 'S7 – S8' },
    { k: '04 · 처방', q: '무엇으로\n막을 것인가', b: '세 개의 저지선', ref: 'S9 – S10' },
  ];
  const xs = [0.67, 3.79, 6.91, 10.03];
  const Y = 2.42, H = 2.60, W = 2.64;
  cards.forEach((c, i) => {
    const dark = i === 3;
    rrect(s, xs[i], Y, W, H, { fill: dark ? C.NAVY : C.TINT });
    tx(s, c.k, { x: xs[i] + 0.25, y: Y + 0.24, w: W - 0.5, h: 0.30, fontSize: 20, bold: true, color: dark ? C.BLUE40 : C.BLUE });
    tx(s, c.q, { x: xs[i] + 0.25, y: Y + 0.62, w: W - 0.5, h: 0.85, fontSize: 22, bold: true, color: dark ? C.INV : C.TXT, lineSpacingMultiple: 1.1 });
    tx(s, c.b, { x: xs[i] + 0.25, y: Y + 1.62, w: W - 0.5, h: 0.60, fontSize: 20, color: dark ? C.INV_SUB : C.BODY, lineSpacingMultiple: 1.15 });
    tx(s, c.ref, { x: xs[i] + 0.25, y: Y + 2.16, w: W - 0.5, h: 0.30, fontSize: 20, color: dark ? C.INV_MUTED : C.MUTED });
  });
  [[3.31, 3.79], [6.43, 6.91], [9.55, 10.03]].forEach(([a, b]) => arrow(s, a, Y + 1.30, b, Y + 1.30));

  arrow(s, 11.35, Y + H, 11.35, 5.58);
  rrect(s, 6.67, 5.58, 6.0, 0.62, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.31 });
  tx(s, '7편의 제안 — 2·3차 저지선의 구체안', { x: 6.67, y: 5.58, w: 6.0, h: 0.62, fontSize: 20, bold: true, color: C.NAVY, align: 'center', valign: 'middle' });

  s.addNotes('순서에는 뜻이 있다 — 과거를 다시 읽지 않으면 미래의 준비가 과거의 반복이 되기 때문이다. 그래서 진단(왜 지금인가) → 역사(룰의 세 번의 변화) → 재감사(무엇이 통했나) → 처방(세 개의 저지선) 순으로 논증한다. 1차 저지선은 이미 계약이 세우고 있고, 나머지 두 저지선은 제품 경쟁력의 몫 — 그 구체안이 이어지는 일곱 편이다.');
}

// ════════════════════════════════════════════════════════════════════════
// S3 — 이 호황은 우리가 만든 것이 아니다 (지수 막대 2 + 지표 카드 4)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(3, '이 호황은 우리가 만든 것이 아니다',
    [['수요는 외생 변수 — ', {}], ['실력의 시험은 가격 붕괴 후에 온다', { color: C.BLUE }]],
    '출처: 빅테크 실적 발표 · 마이크론 FQ3 FY26 · 기업용 SSD 리서치 1Q26');

  // 좌측: 지수 막대 패널 2개 (전년=100 대비 — 절대 전년값은 원문에 없어 지수 표기)
  const panels = [
    {
      y: 2.12, kicker: '빅테크 4사 AI CapEx — 지수 (전년 = 100)',
      idx: [100, 177], barLbl: ['전년', '2026E'],
      big: '약 7,000억 달러', sub: '+77% YoY · 최대 7,250억 달러 전망',
    },
    {
      y: 4.55, kicker: '마이크론 분기 매출 — 지수 (전년 동기 = 100)',
      idx: [100, 446], barLbl: ['전년 동기', 'FQ3 FY26'],
      big: '414.6억 달러', sub: '+346% YoY · 매출총이익률 84.9% 사상 최고',
    },
  ];
  panels.forEach((p) => {
    const H = 2.27;
    tx(s, p.kicker, { x: 0.67, y: p.y, w: 6.2, h: 0.32, fontSize: 20, bold: true, color: C.BLUE });
    const base = p.y + H - 0.36;             // 막대 베이스라인
    const maxH = base - (p.y + 0.78);        // 최대 막대 높이 (킥커·값 라벨 자리 확보)
    const bx = [1.30, 2.72], bw = 0.85;
    p.idx.forEach((v, i) => {
      const h = maxH * (v / Math.max(...p.idx));
      rect(s, bx[i], base - h, bw, h, i === 1 ? C.BLUE : C.GRAY);
      tx(s, String(v), { x: bx[i] - 0.2, y: base - h - 0.32, w: bw + 0.4, h: 0.30, fontSize: 20, bold: true, color: i === 1 ? C.NAVY : C.BODY, align: 'center' });
      tx(s, p.barLbl[i], { x: bx[i] - 0.35, y: base + 0.04, w: bw + 0.7, h: 0.30, fontSize: 20, color: C.MUTED, align: 'center' });
    });
    tx(s, p.big, { x: 4.35, y: p.y + 0.72, w: 4.2, h: 0.50, fontSize: 32, bold: true, color: C.BLUE });
    tx(s, p.sub, { x: 4.35, y: p.y + 1.28, w: 4.2, h: 0.68, fontSize: 20, bold: true, color: C.NAVY, lineSpacingMultiple: 1.15 });
  });

  // 우측: 지표 카드 4 (컴팩트)
  const cards = [
    { lbl: '기업용 SSD 계약가 · 분기', val: '+80%' },
    { lbl: '주요 공급사 재고', val: '사상 최저' },
    { lbl: '알파벳 클라우드 매출 YoY', val: '+82%' },
    { lbl: '알파벳 수주 잔고', val: '5,140억 달러' },
  ];
  cards.forEach((c, i) => {
    const y = [2.12, 3.33, 4.54, 5.75][i];
    rrect(s, 8.97, y, 3.70, 1.06, { fill: C.TINT });
    tx(s, c.lbl, { x: 9.19, y: y + 0.13, w: 3.30, h: 0.30, fontSize: 20, color: C.MUTED });
    tx(s, c.val, { x: 9.19, y: y + 0.46, w: 3.30, h: 0.48, fontSize: 32, bold: true, color: C.BLUE });
  });

  s.addNotes('올해 빅테크 네 곳의 AI 인프라 투자는 약 7,000억 달러(+77%)이고 최대 7,250억 달러까지 열려 있으며, OpenAI 컴퓨트 총괄도 업계 투자를 약 7,000억 달러로 셈해 수요자 쪽에서 교차 확인된다[1]. 기업용 SSD 계약가는 한 분기 +80%·재고 사상 최저, 마이크론 분기 매출은 414.6억 달러(+346%)·매출총이익률 84.9% 사상 최고 — 만들면 팔리는 시장이다[2][3]. 그러나 수요는 AI 인프라 건설이라는 외생 변수가 만들었고 3사 공급 규율도 우리 제품력도 부차 요인이다[2]. "이거는 AI가 우리에게 준 선물이지 여러분들이 실력으로 만든 게 아니에요. 그건 팩트야." — 사업부 최고경영진[4].');
}

// ════════════════════════════════════════════════════════════════════════
// S4 — 준비의 창은 호황에만 열린다 (3국면 패널 + 인용 블록)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(4, '준비의 창은 호황에만 열린다',
    [['환경이 준 것은 ', {}], ['환경이 거둬간다', { color: C.BLUE }]], null);

  const P = [
    { h: '① 호황 — 창 열림', hf: C.BLUE12, hc: C.NAVY, lines: ['고객이 문을 연다', '선수금 예치 · 다년 계약', '공동 로드맵'] },
    { h: '② 인플렉션 포인트', hf: C.BLUE40, hc: C.NAVY, lines: ['그때 가서 하면 늦는다', '심는 값이 오르기 시작'] },
    { h: '③ 다운턴 — 창 닫힘', hf: C.NAVY, hc: C.INV, lines: ['준비가 아니라 대응', '가장 나쁜 조건의 협상'] },
  ];
  const xs = [0.67, 4.76, 8.85], W = 3.81;
  P.forEach((p, i) => {
    rect(s, xs[i], 2.24, W, 0.52, p.hf);
    tx(s, p.h, { x: xs[i], y: 2.24, w: W, h: 0.52, fontSize: 22, bold: true, color: p.hc, align: 'center', valign: 'middle' });
    rect(s, xs[i], 2.76, W, 1.72, C.TINT);
    tx(s, p.lines.join('\n'), { x: xs[i] + 0.22, y: 2.96, w: W - 0.44, h: 1.40, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.3 });
  });
  arrow(s, 4.48, 3.50, 4.76, 3.50);
  arrow(s, 8.57, 3.50, 8.85, 3.50);
  tx(s, '다음 다운턴 창: 2028~29 (예측)', { x: 0.67, y: 4.58, w: 12.0, h: 0.30, fontSize: 20, color: C.MUTED, align: 'right' });

  rrect(s, 0.67, 5.00, 12.0, 1.70, { fill: C.TINT });
  tx(s, '“', { x: 0.92, y: 4.96, w: 0.90, h: 0.90, fontSize: 60, bold: true, color: C.BLUE40 });
  tx(s, '인플렉션 포인트가 오면 뭘 해야 되는데 그때 가서 하면 늦으니까 지금 할 수 있는 걸 지금 하는 거야', { x: 1.90, y: 5.12, w: 10.3, h: 0.98, fontSize: 24, color: C.NAVY, lineSpacingMultiple: 1.25 });
  tx(s, '— 메모리 영업 리더, 사내 인터뷰 (2026. 8)', { x: 1.90, y: 6.28, w: 10.3, h: 0.34, fontSize: 20, color: C.MUTED });

  s.addNotes('고객이 스스로 선수금을 예치하고 다년 계약에 서명하는 국면은 다운턴이 시작되는 순간 끝난다[5]. 계약만이 아니라 기술이든 관계든 조직이든, 심는 값이 가장 싸고 상대가 문을 열어 주는 계절은 호황뿐이다. 다운턴이 도착한 뒤에 시작하는 준비는 준비가 아니라 대응이고, 대응은 언제나 조건이 가장 나쁠 때의 협상이 된다. "인플렉션 포인트가 오면 뭘 해야 되는데 그때 가서 하면 늦으니까 지금 할 수 있는 걸 지금 하는 거야." — 메모리 영업 리더[4].');
}

// ════════════════════════════════════════════════════════════════════════
// S5 — 게임의 룰은 세 번 바뀌었다 (3+1 페이즈 타임라인)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(5, '게임의 룰은 세 번 바뀌었다',
    [['공식은 작동했다 — ', {}], ['게임이 바뀌어 있었다', { color: C.BLUE }]],
    '출처: DRAM 치킨게임 사료 · 삼성 다운턴 액션 2007~2023');

  arrow(s, 0.67, 2.16, 12.67, 2.16, { width: 2 });

  const cols = [
    {
      h: '1차 · 2007~09', hf: C.BLUE12, hc: C.NAVY, game: '체력의 게임',
      rule: ['가격 -85% · -58%', '전원 버티기 소모전'],
      out: ['키몬다 퇴출 09.01', '투자 5.5조 → 9조', '회복기 점유 흡수'],
    },
    {
      h: '2차 · 2010~13', hf: C.BLUE40, hc: C.NAVY, game: '기술의 심판대',
      rule: ['PC → 모바일 전환', '소모전 + 기술 전환'],
      out: ['엘피다 → 마이크론', '6강 → 3강'],
    },
    {
      h: '3차 · 2022~23', hf: C.BLUE70, hc: C.INV, game: '공식 재복제',
      rule: ['무감산 선언 22.10', '감산 철회 23.04'],
      out: ['범용 승리, 그리고', 'HBM 실기 40%→17%'],
    },
    {
      h: '다음 · 2028~29?', hf: C.NAVY, hc: C.INV, game: '새 게임 (예측)',
      rule: ['계약 바닥', '인증 게임', '비동기 사이클'],
      out: ['새 게임은', '무엇인가?'], pred: true,
    },
  ];
  const xs = [0.67, 3.74, 6.81, 9.88], W = 2.79;
  cols.forEach((c, i) => {
    rect(s, xs[i], 2.32, W, 0.55, c.hf);
    tx(s, c.h, { x: xs[i], y: 2.32, w: W, h: 0.55, fontSize: 22, bold: true, color: c.hc, align: 'center', valign: 'middle' });
    if (c.pred) rrect(s, xs[i], 2.87, W, 3.75, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.02 });
    else rect(s, xs[i], 2.87, W, 3.75, C.TINT);
    const ix = xs[i] + 0.20, iw = W - 0.40;
    tx(s, c.game, { x: ix, y: 3.07, w: iw, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, c.rule.join('\n'), { x: ix, y: 3.45, w: iw, h: 1.10, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.25 });
    hline(s, ix, ix + iw, 4.72, C.HAIRLINE, 1);
    tx(s, c.out.join('\n'), c.pred
      ? { x: ix, y: 4.88, w: iw, h: 1.10, fontSize: 20, bold: true, color: C.NAVY, lineSpacingMultiple: 1.25 }
      : { x: ix, y: 4.88, w: iw, h: 1.40, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.25 });
  });

  s.addNotes('1차: DRAM 가격이 2007년 -85%, 이듬해 -58% 무너지는 동안 전원이 버텼고, 누적 손실 30억 달러의 키몬다가 파산(독일 정부 5억 달러 지원 무효)하자 현물가가 급등해 과점 구조가 실증됐다[6]. 2차: PC→모바일 전환에 실기한 엘피다가 부채 4,480억 엔(전후 일본 제조업 최대 파산)으로 무너져 마이크론의 체급이 됐다[6]. 3차: 무감산 선언은 전사 영업이익 0.6조 원(-96%)·DS부문 사상 최대 적자 4.58조 원 뒤인 2023년 4월 철회됐지만, 같은 해 투자 53.1조 원·R&D 28.34조 원은 사상 최대로 유지됐다 — 역사이클 투자 메커니즘은 살아 있다[7]. 범용 게임의 배당(2025~26 사상 최대 실적, SK하이닉스 2026년 2분기 영업이익 컨센서스 64.1조 원·영업이익률 75~77%)과 HBM 실기(40%→17%, 33년 만의 DRAM 1위 상실)가 동시에 일어났다[1][5].');
}

// ════════════════════════════════════════════════════════════════════════
// S6 — 네 번째 게임의 룰 (2×2 룰 카드)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(6, '네 번째 게임의 룰',
    [['필요한 것은 재복제가 아니라 ', {}], ['새 공식', { color: C.BLUE }], ['이다', {}]],
    '출처: LTA→SCA 업계 동향 · 마이크론–앤스로픽 SCA · 스타게이트 의향서');

  const cards = [
    { k: 'R1 · 거래 → 수주', t: '현물 → 3~5년 고정가 장기계약', b: '선급금 5% 미만 → 10~30% 관행\n2027년 DDR 비트 20~30% 고정 전망' },
    { k: 'R2 · 캐파 → 인증', t: '고부가 제품은 인증이 판다', b: '웨이퍼는 캐파가, 배분은 공동설계가\n마이크론–앤스로픽: 4요소 일체 계약' },
    { k: 'R3 · 단일 → 비동기 사이클', t: '단일 사이클의 시대가 끝나 간다', b: 'HBM · 범용 DRAM · 낸드가\n각자의 사이클로 돈다' },
    { k: 'R4 · 소수 고객 지배', t: '스타게이트 1건 = 월 최대 90만 장', b: 'DRAM 웨이퍼 글로벌 생산량의\n약 40%에 이르는 단일 의향서' },
  ];
  const pos = [[0.67, 2.12], [6.81, 2.12], [0.67, 4.58], [6.81, 4.58]];
  cards.forEach((c, i) => {
    const [x, y] = pos[i];
    rrect(s, x, y, 5.86, 2.24, { fill: C.TINT });
    tx(s, c.k, { x: x + 0.25, y: y + 0.20, w: 5.36, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, c.t, { x: x + 0.25, y: y + 0.58, w: 5.36, h: 0.40, fontSize: 22, bold: true, color: C.TXT });
    tx(s, c.b, { x: x + 0.25, y: y + 1.10, w: 5.36, h: 0.90, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.25 });
  });

  s.addNotes('현물 중심 시장이 3~5년 고정가 장기계약으로 이동했고, 한 글로벌 투자은행은 장기계약이 이 산업의 사이클 변동성을 근본적으로 제거하고 있다고 평가했다[8]. 웨이퍼를 팔 자격은 캐파가 주지만 고부가 제품을 팔 자격은 고객의 인증이 준다 — 마이크론–앤스로픽 계약은 공동 최적화·다년 공급·전사 도입·자본 연계가 한 몸으로 묶인 실례다[9]. 다음 다운턴은 과거와도 지금과도 다른 세상에 도착한다 — 그리고 새 공식의 재료는 과거를 감사한 뒤에야 고를 수 있다.');
}

// ════════════════════════════════════════════════════════════════════════
// S7 — 재감사 (A1~A6 판정 표)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(7, '재감사 — 무엇이 통했고 부러졌는가',
    [['◎의 공통분모 — 버티는 시간이 아니라 ', {}], ['사용하는 시간', { color: C.BLUE }]],
    '출처: 다운턴 액션 재감사 — 3개 다운턴 사료 종합');

  const colX = [0.67, 6.67, 7.87], colW = [6.0, 1.2, 4.8];
  // 헤더
  rect(s, 0.67, 2.12, 12.0, 0.52, C.NAVY);
  tx(s, '다운턴 액션', { x: colX[0] + 0.18, y: 2.12, w: colW[0] - 0.18, h: 0.52, fontSize: 20, bold: true, color: C.INV, valign: 'middle' });
  tx(s, '판정', { x: colX[1], y: 2.12, w: colW[1], h: 0.52, fontSize: 20, bold: true, color: C.INV, align: 'center', valign: 'middle' });
  tx(s, '지금도 성립하는가', { x: colX[2] + 0.18, y: 2.12, w: colW[2] - 0.18, h: 0.52, fontSize: 20, bold: true, color: C.INV, valign: 'middle' });

  const rows = [
    ['A1 · 위기 국면 사업부 통합 08~09', true, '성립 — 맥락에 거의 무관'],
    ['A2 · 퇴출 직후 역사이클 증설 5.5조→9조', true, '절반 — 살 것은 기술 자산·인재'],
    ['A3 · 재무 요새 — 현금 약 630억 달러', true, '성립 — 모든 액션의 밑돌'],
    ['A4 · 다운사이클 한복판 팹 착공 (Taylor)', true, '성립 — 장비 반입은 수요 확인 후'],
    ['A5 · 무감산 선언 → 감산 공식화 철회', false, '불성립 — 3강 균형에선 자해'],
    ['A6 · 범용 캐파 우선 · HBM 후순위', false, '재발 위험 — 니치는 다운턴 속 성장'],
  ];
  rows.forEach((r, i) => {
    const y = 2.64 + i * 0.62;
    rect(s, 0.67, y, 12.0, 0.62, i % 2 ? C.ROW_ALT : C.WHITE);
    hline(s, 0.67, 12.67, y, C.HAIRLINE, 0.75);
    tx(s, r[0], { x: colX[0] + 0.18, y, w: colW[0] - 0.28, h: 0.62, fontSize: 20, color: C.BODY, valign: 'middle' });
    // 판정 칩
    rrect(s, colX[1] + (colW[1] - 0.72) / 2, y + 0.10, 0.72, 0.42, { fill: r[1] ? C.BLUE12 : C.NEG_BG, radius: 0.21 });
    tx(s, r[1] ? '◎' : '✕', { x: colX[1] + (colW[1] - 0.72) / 2, y: y + 0.10, w: 0.72, h: 0.42, fontSize: 20, bold: true, color: r[1] ? C.BLUE : C.NEG, align: 'center', valign: 'middle' });
    tx(s, r[2], { x: colX[2] + 0.18, y, w: colW[2] - 0.28, h: 0.62, fontSize: 20, color: C.BODY, valign: 'middle' });
  });
  hline(s, 0.67, 12.67, 2.64 + 6 * 0.62, C.HAIRLINE, 0.75);

  rect(s, 0.67, 6.44, 12.0, 0.38, C.TINT);
  tx(s, '◎ 공통분모 — 조직 재편 · 싼 자산 매입 · 리드타임 소화 · 체력 유지', { x: 0.94, y: 6.44, w: 11.6, h: 0.38, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  s.addNotes('재감사가 특히 필요한 까닭은 우리가 과거 다운턴의 승자이기 때문이다 — 승자는 성공 공식을 복제하려는 유인이 가장 강하고, 그 함정은 3차에서 이미 한 번 실현된 관측이다[5]. 전략은 목록이 아니라 조건이다. A1은 이듬해 연결 매출 136.3조·영업이익 10.9조로 이어졌고, A5는 국가가 손실을 흡수하는 경기자를 가격으로 퇴출할 수 없다는 조건 소멸을, A6는 주력의 합리적 자원배분이 새 게임의 실기가 되는 메커니즘을 기록한다[5][6][7]. 역사이클 투자는 여전히 유효하되, 인증이 배분을 정하는 게임에서 인증 없는 캐파는 점유율로 전환되지 않으므로 바닥에서 사야 할 것은 웨이퍼 캐파가 아니라 기술 자산과 인재다[5].');
}

// ════════════════════════════════════════════════════════════════════════
// S8 — 자연 실험 (HBM 슬로프·비교 막대 + 낸드 점유 스트립 + 벤치마크 3)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(8, '자연 실험 — 경쟁사는 다르게 통과했다',
    [['갈린 것은 지출의 양이 아니라 ', {}], ['배분의 방향', { color: C.BLUE }], ['이었다', {}]],
    '출처: HBM/DRAM 점유율 리서치 · 기업용 SSD 1Q26 · 마이크론 FQ3 FY26');

  // ── 좌상 A: 삼성 HBM 점유율 슬로프 (하락 = 리스크 레드) ──
  tx(s, '삼성 HBM 점유율', { x: 0.67, y: 2.12, w: 3.5, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  const base8 = 4.42, maxH8 = 1.55, maxV = 60;
  const yOf = (v) => base8 - maxH8 * (v / maxV);
  const p1 = { x: 1.30, v: 40 }, p2 = { x: 3.30, v: 17 };
  s.addShape('line', { x: p1.x, y: yOf(p1.v), w: p2.x - p1.x, h: yOf(p2.v) - yOf(p1.v), line: { color: C.NEG, width: 3 } });
  [p1, p2].forEach((p) => s.addShape('ellipse', { x: p.x - 0.08, y: yOf(p.v) - 0.08, w: 0.16, h: 0.16, fill: { color: C.NEG }, line: { color: C.WHITE, width: 2 } }));
  tx(s, '40%', { x: p1.x - 0.5, y: yOf(p1.v) - 0.40, w: 1.0, h: 0.30, fontSize: 20, bold: true, color: C.BODY, align: 'center' });
  tx(s, '17%', { x: p2.x - 0.5, y: yOf(p2.v) - 0.42, w: 1.0, h: 0.30, fontSize: 20, bold: true, color: C.NEG, align: 'center' });
  tx(s, '2023', { x: p1.x - 0.6, y: base8 + 0.06, w: 1.2, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });
  tx(s, '25 상반기', { x: p2.x - 0.75, y: base8 + 0.06, w: 1.5, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });

  // ── 좌상 B: HBM 점유 현재 비교 막대 ──
  tx(s, 'HBM 점유 — 현재', { x: 4.46, y: 2.12, w: 3.5, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  const bars8 = [{ x: 4.95, v: 57, f: C.BLUE, lc: C.NAVY, n: 'SK하이닉스' }, { x: 6.35, v: 22, f: C.GRAY, lc: C.BODY, n: '삼성' }];
  bars8.forEach((b) => {
    const h = maxH8 * (b.v / maxV);
    rect(s, b.x, base8 - h, 0.85, h, b.f);
    tx(s, `${b.v}%`, { x: b.x - 0.3, y: base8 - h - 0.32, w: 1.45, h: 0.30, fontSize: 20, bold: true, color: b.lc, align: 'center' });
    tx(s, b.n, { x: b.x - 0.45, y: base8 + 0.06, w: 1.75, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });
  });

  tx(s, '33년 만의 DRAM 1위 상실 — 1Q25 36% 대 34%', { x: 0.67, y: 4.88, w: 7.30, h: 0.30, fontSize: 20, color: C.MUTED });

  // ── 좌하: 기업용 SSD 매출 점유 스트립 (1Q26, %) ──
  tx(s, '기업용 SSD 매출 점유 1Q26 (%)', { x: 0.67, y: 5.30, w: 4.4, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  tx(s, 'YMTC 낸드 5→13%', { x: 4.87, y: 5.30, w: 3.10, h: 0.30, fontSize: 20, color: C.MUTED, align: 'right' });
  const segs = [
    { v: 38.2, f: C.BLUE, tc: C.INV, n: '삼성', row: 0 },
    { v: 25.1, f: C.BLUE70, tc: C.INV, n: 'SK그룹', row: 1 },
    { v: 16.7, f: C.BLUE40, tc: C.NAVY, n: '마이크론', row: 0 },
    { v: 12.0, f: C.GRAY, tc: C.BODY, n: '키옥시아', row: 1 },
    { v: 8.0, f: C.HAIRLINE, tc: C.BODY, n: '샌디스크', row: 0 },
  ];
  const stripY = 5.68, stripH = 0.50, gap = 0.02;
  const usable = 7.30 - gap * (segs.length - 1);
  let sx = 0.67;
  segs.forEach((g) => {
    const w = usable * (g.v / 100);
    rect(s, sx, stripY, w, stripH, g.f);
    if (w > 0.5) tx(s, g.v.toFixed(1), { x: sx, y: stripY, w, h: stripH, fontSize: 20, bold: true, color: g.tc, align: 'center', valign: 'middle' });
    const cx = sx + w / 2;
    const ny = g.row === 0 ? 6.22 : 6.52;
    tx(s, g.n, { x: Math.min(Math.max(cx - 0.65, 0.67), 6.62), y: ny, w: 1.3, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });
    sx += w + gap;
  });

  // ── 우측: 벤치마크 3카드 ──
  const bm = [
    { t: 'SK하이닉스 — 방향 유지', b: '적자에도 HBM · 공동설계 집중\n영업이익 47.2조 — 전사 초과' },
    { t: '마이크론 — 수요 선행', b: 'SCA 16건 · $1,000억 선확약\n수요 확약 뒤 팹 — 순서 역전' },
    { t: '키옥시아 — 세대 선행', b: '캐파 경쟁 대신 아키텍처 선행\n체력 열위의 생존 공식 전환' },
  ];
  bm.forEach((c, i) => {
    const y = [2.12, 3.76, 5.40][i];
    rrect(s, 8.25, y, 4.42, 1.42, { fill: C.TINT });
    tx(s, c.t, { x: 8.47, y: y + 0.16, w: 3.98, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, c.b, { x: 8.47, y: y + 0.52, w: 3.98, h: 0.76, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.2 });
  });

  s.addNotes('SK하이닉스는 2023년 영업적자 7.7조 원 속에 투자를 10조 원 수준으로 줄이면서도 HBM·엔비디아 공동설계에 집중해 DRAM 1위(36% 대 34%)·HBM 57%, 2025 회계연도 영업이익 47.2조 원(삼성 전사 43.6조 원 초과)을 가져갔다 — A6의 정확한 반례다[5]. 마이크론은 매출 -49%의 수축 속에서 수요를 먼저 잠갔고(SCA 16건·최소 계약 매출 약 1,000억 달러·예치금과 금융 약정 220억 달러), 2026년 초 크루셜 철수로 전 캐파를 고마진 기업용·AI로 돌렸다[2][3]. 낸드는 5강 분산에 YMTC까지 — 2023년 낸드 감산률 50% 유지가 방증하듯 감산 공조도 퇴출 유도도 어려워, 다음 다운턴은 낸드에서 더 깊고 규율 없이 온다[2][5][7]. "거기를 선점 못하면 다음 턴이 오면 점점 (저가) 장사밖에 안 되는 거거든요." — 상품기획 리더[10].');
}

// ════════════════════════════════════════════════════════════════════════
// S9 — 1차 저지선과 세 개의 구멍 (방벽 4층 + 구멍 콜아웃 3)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(9, '1차 저지선과 세 개의 구멍',
    [['계약이 지키는 것은 ', {}], ['물량뿐', { color: C.BLUE }], ['이다', {}]],
    '출처: 사내 인터뷰 (메모리 영업 리더) · 낸드 웨이퍼 가격 리서치');

  // 방벽 (위 = 목표, 아래로 갈수록 기반)
  const layers = [
    { t: '목표 — 캐파 과반 훨씬 초과 커버', f: null, tc: C.NAVY, outline: true },
    { t: 'NTE 상한 · NTB 하한 — 이익률 방어', f: C.BLUE40, tc: C.NAVY },
    { t: 'take-or-pay — 불이행분 캐시 차감', f: C.BLUE70, tc: C.INV },
    { t: '선수금 — 최대 고객 백억 달러대', f: C.NAVY, tc: C.INV },
  ];
  layers.forEach((l, i) => {
    const y = 2.32 + i * 0.90;
    if (l.outline) rrect(s, 0.92, y, 6.40, 0.80, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.02 });
    else rect(s, 0.92, y, 6.40, 0.80, l.f);
    tx(s, l.t, { x: 1.14, y, w: 5.96, h: 0.80, fontSize: 22, bold: true, color: l.tc, valign: 'middle' });
  });
  tx(s, '업계: 마이크론 SCA 16건 · 약 $1,000억\nLTA 선급금 10~30% 관행', { x: 0.92, y: 6.02, w: 6.0, h: 0.62, fontSize: 20, color: C.MUTED, lineSpacingMultiple: 1.15 });

  // 구멍 콜아웃 3 (원 마커는 방벽 우변 위, 리더선으로 카드와 연결)
  const holes = [
    { t: '구멍 1 — 완제품 부가가치', b: '웨이퍼 후퇴 시 마진 층 소멸\n계약가 1분기比 +246%', my: 2.93 },
    { t: '구멍 2 — 계약 만기', b: '갱신의 힘은 계약서 밖에 있다\n“필요 없으면 PO 캔슬” (23년)', my: 4.53 },
    { t: '구멍 3 — 기술 전환', b: '수요 이동 시 커버리지 공동화\n계약은 전환을 못 막는다 (예측)', my: 5.60 },
  ];
  holes.forEach((hc, i) => {
    const y = [2.32, 3.92, 5.52][i];
    const cy = y + 0.61;
    dashCircle(s, 7.32, hc.my, 0.44, C.NEG);
    arrow(s, 7.54, hc.my, 7.85, cy, { color: C.NEG, width: 1.5, dash: true, noHead: true });
    rrect(s, 7.85, y, 4.82, 1.22, { fill: C.WHITE, line: { color: C.HAIRLINE, width: 1.0 } });
    tx(s, hc.t, { x: 8.07, y: y + 0.14, w: 4.4, h: 0.30, fontSize: 20, bold: true, color: C.NEG });
    tx(s, hc.b, { x: 8.07, y: y + 0.48, w: 4.4, h: 0.66, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });
  });

  s.addNotes('"지금은 5년짜리에 선수금을 수십억 달러 단위로 받아서 통장에 넣어. 걔네가 구매 의무를 저버리면 그 개수 × 판가만큼 받은 캐시에서 깐다는 것 — 테이크 오어 페이(take-or-pay)야. 사우디 오일 계약처럼. 메모리가 처음으로 그 개념을 바인딩해." — 메모리 영업 리더[4]. 세 다운턴 어디에도 없던 매출 바닥 메커니즘이고 거래는 스팟→LTA→SCA로, 참여형 구조까지 금융의 언어로 진화 중이다[5][8]. 그러나 구멍도 셋 — 낸드 웨이퍼 계약가 급등(2025년 11월 한 달 +60% 초과·1분기 대비 +246%)은 완제품 부가가치의 고객 내재화 신호이고[11], "얘네는 계약을 했다지만 필요 없으면 CFO가 오더를 다 캔슬해 — 2023년 하반기에 경험한 거예요"[4], 기술 전환이 방아쇠인 다운턴에는 커버리지 자체가 공동화된다(예측)[5].');
}

// ════════════════════════════════════════════════════════════════════════
// S10 — 세 개의 저지선 (다크 클로징)
// ════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addImage({ path: path.join(ASSETS, 'closing-bg.png'), x: 0, y: 0, w: 13.333, h: 7.5 });

  tx(s, '세 개의 저지선', { x: 0.67, y: 0.95, w: 12.0, h: 0.75, fontSize: 40, bold: true, color: C.INV, align: 'center' });
  tx(s, '앞선 저지선이 못 막은 위협이, 다음 저지선의 존재 이유다', { x: 0.67, y: 1.78, w: 12.0, h: 0.45, fontSize: 24, color: C.INV_SUB, align: 'center' });

  const boxes = [
    { k: '제1선 · 계약', n: '물량 바닥', b: 'take-or-pay · 선수금\nNTE/NTB 가격 난간' },
    { k: '제2선 · 제품', n: '부가가치 방어', b: '다운턴에도 걷히지\n않는 마진의 층' },
    { k: '제3선 · 플랫폼·관계', n: '대체 불가성', b: 'SW 플랫폼 · 통합\n공동 로드맵' },
  ];
  const bx = [1.17, 5.07, 8.97];
  boxes.forEach((b, i) => {
    rrect(s, bx[i], 2.55, 3.20, 1.70, { fill: C.NAVY_RAISED, line: { color: C.BLUE70, width: 1.25 } });
    tx(s, b.k, { x: bx[i] + 0.20, y: 2.72, w: 2.80, h: 0.28, fontSize: 20, bold: true, color: C.INV_MUTED });
    tx(s, b.n, { x: bx[i] + 0.20, y: 3.04, w: 2.80, h: 0.38, fontSize: 24, bold: true, color: C.INV });
    tx(s, b.b, { x: bx[i] + 0.20, y: 3.48, w: 2.80, h: 0.64, fontSize: 20, color: C.INV_SUB, lineSpacingMultiple: 1.15 });
  });
  arrow(s, 4.37, 3.40, 5.07, 3.40, { color: C.BLUE70, width: 2.5 });
  arrow(s, 8.27, 3.40, 8.97, 3.40, { color: C.BLUE70, width: 2.5 });
  tx(s, '1선이 못 막는 것\n부가가치 · 만기 · 전환', { x: 3.02, y: 4.42, w: 3.4, h: 0.62, fontSize: 20, color: C.INV_MUTED, align: 'center', lineSpacingMultiple: 1.15 });
  tx(s, '2선이 못 막는 것\n갱신 협상력 · 대체 가능성', { x: 6.92, y: 4.42, w: 3.4, h: 0.62, fontSize: 20, color: C.INV_MUTED, align: 'center', lineSpacingMultiple: 1.15 });

  tx(s, runs([
    ['다운턴이 왔을 때, 우리는 ', {}],
    ['대체되지 않는 공급자', { color: C.BLUE40 }],
    ['인가', {}],
  ], { fontSize: 28, bold: true, color: C.INV }), { x: 0.67, y: 5.42, w: 12.0, h: 0.60, fontSize: 28, bold: true, color: C.INV, align: 'center', valign: 'middle' });

  // 7편 핸드오프 칩
  tx(s, '7편의 제안', { x: 1.59, y: 6.50, w: 1.75, h: 0.44, fontSize: 20, bold: true, color: C.INV_SUB, valign: 'middle' });
  ['낸드', 'DRAM', 'SSD', '제조', '인사', '기획', '구매'].forEach((c, i) => {
    const x = 3.49 + i * 1.18;
    rrect(s, x, 6.50, 1.06, 0.44, { fill: C.NAVY_RAISED, line: { color: C.BLUE70, width: 1.0 }, radius: 0.22 });
    tx(s, c, { x, y: 6.50, w: 1.06, h: 0.44, fontSize: 20, color: C.INV_SUB, align: 'center', valign: 'middle' });
  });
  tx(s, '10 / 10', { x: 11.47, y: 7.04, w: 1.2, h: 0.34, fontSize: 20, color: C.INV_MUTED, align: 'right', valign: 'middle' });

  s.addNotes('"1차 방어가 그렇게 되더라도 2차 방어가 이제부터 필요한 거죠. 여러분들이 그 과제를 하는 게 나는 2차 방어라고 생각해. 미래 리스크의 80%는 뭔가 마련을 해야 된다." — 메모리 영업 리더[4]. 세 저지선은 대체재가 아니라 직렬이다. 2차 방어의 골격 — 제품(램프업 속도와 수율), 투자("투자 셰어 < 빗 셰어 < 프로핏 셰어"의 규율), 오퍼레이션[4]. 일곱 편의 제안이 각자의 자리에서 구체안을 내며, 공통 질문은 하나다: 다운턴이 왔을 때, 그리고 그 한복판에서 새 게임이 태어났을 때, 우리는 대체되지 않는 공급자인가.');
}

pres.writeFile({ fileName: OUT }).then(() => console.log('WROTE', OUT));
