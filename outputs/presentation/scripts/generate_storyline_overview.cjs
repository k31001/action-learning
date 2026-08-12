/**
 * 「호황은 전략을 심는 계절이다」 — 스토리라인 공통 개요편 26장 덱 생성.
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
const TOTAL = 26;   // 표지 + 본문 14 + 2차 저지선 5 + 3차 저지선 4 + 결론 1 + 별첨 1

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
  tx(s, `${String(num).padStart(2, '0')} / ${TOTAL}`, { x: 11.47, y: 7.04, w: 1.2, h: 0.34, fontSize: 20, color: C.MUTED, align: 'right', valign: 'middle' });
  return s;
}

// 판정 칩 — ◎(발화) · △(부분) · ✕(불발). 셀 중앙 배치
function verdictChip(s, cx, cy, v) {
  const st = v === '◎' ? { bg: C.BLUE12, fg: C.BLUE }
    : v === '✕' ? { bg: C.NEG_BG, fg: C.NEG }
      : { bg: C.TINT, fg: C.MUTED };
  rrect(s, cx - 0.36, cy - 0.21, 0.72, 0.42, { fill: st.bg, radius: 0.21 });
  tx(s, v, { x: cx - 0.36, y: cy - 0.21, w: 0.72, h: 0.42, fontSize: 20, bold: true, color: st.fg, align: 'center', valign: 'middle' });
}

/**
 * CMO 매트릭스 슬라이드 — 다운턴 1건의 M×C→O 분석.
 * cDefs: [[C 라벨, C 값], ...] 4개 · rows: [[액션, 메커니즘, 발화 맥락, 판정, 관측 결과], ...] 5개
 * 출처: wiki/storyline/storyline-cmo.md §5 「다운턴별 M×C→O 매트릭스」
 */
function cmoSlide(num, title, band, cDefs, rows) {
  const s = contentSlide(num, title, band,
    '판정 ◎ 분명 · △ 부분 · ✕ 불발 — 출처: CMO 렌즈 M×C→O 매트릭스');

  // C 열 정의 스트립 — 그 다운턴의 맥락 4변수
  const cw = 2.91;
  cDefs.forEach((d, i) => {
    const x = 0.67 + i * (cw + 0.115);
    rect(s, x, 2.12, cw, 0.70, C.BLUE12);
    tx(s, d[0], { x: x + 0.16, y: 2.18, w: cw - 0.32, h: 0.28, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, d[1], { x: x + 0.16, y: 2.48, w: cw - 0.32, h: 0.28, fontSize: 20, color: C.BODY });
  });

  // M×C→O 표 — 행 = 액션(M), 발화 맥락(C), 판정, 관측 결과(O)
  const cx = [0.67, 4.17, 6.77, 7.87], cwd = [3.50, 2.60, 1.10, 4.80];
  const HY = 3.06, HH = 0.46, RH = 0.66;
  rect(s, 0.67, HY, 12.0, HH, C.NAVY);
  ['액션 (M · 메커니즘)', '발화 맥락 (C)', '판정', '관측 결과 (O)'].forEach((h, i) => {
    tx(s, h, i === 2
      ? { x: cx[i], y: HY, w: cwd[i], h: HH, fontSize: 20, bold: true, color: C.INV, align: 'center', valign: 'middle' }
      : { x: cx[i] + 0.16, y: HY, w: cwd[i] - 0.24, h: HH, fontSize: 20, bold: true, color: C.INV, valign: 'middle' });
  });
  rows.forEach((r, i) => {
    const y = HY + HH + i * RH;
    rect(s, 0.67, y, 12.0, RH, i % 2 ? C.ROW_ALT : C.WHITE);
    hline(s, 0.67, 12.67, y, C.HAIRLINE, 0.75);
    tx(s, r[0], { x: cx[0] + 0.16, y: y + 0.05, w: cwd[0] - 0.24, h: 0.28, fontSize: 20, bold: true, color: C.TXT });
    tx(s, r[1], { x: cx[0] + 0.16, y: y + 0.33, w: cwd[0] - 0.24, h: 0.28, fontSize: 20, color: C.MUTED });
    tx(s, r[2], { x: cx[1] + 0.16, y, w: cwd[1] - 0.24, h: RH, fontSize: 20, color: C.BODY, valign: 'middle' });
    verdictChip(s, cx[2] + cwd[2] / 2, y + RH / 2, r[3]);
    tx(s, r[4], { x: cx[3] + 0.16, y, w: cwd[3] - 0.24, h: RH, fontSize: 20, color: C.BODY, valign: 'middle' });
  });
  hline(s, 0.67, 12.67, HY + HH + rows.length * RH, C.HAIRLINE, 0.75);
  return s;
}

// 내용 미입력 슬라이드 — 제목·메시지 밴드 골격만 두고 본문은 비운다
function blankSlide(num, title) {
  const s = pres.addSlide();
  s.background = { color: C.WHITE };
  tx(s, title, { x: 0.67, y: 0.36, w: 12.0, h: 0.75, fontSize: 40, bold: true, color: C.TXT, valign: 'middle' });
  rect(s, 0.67, 1.26, 12.0, 0.62, C.TINT);
  tx(s, '핵심 메시지 — 이 슬라이드를 관통하는 한 문장', { x: 0.94, y: 1.26, w: 11.6, h: 0.62, fontSize: 24, bold: true, color: C.BLUE40, valign: 'middle' });
  s.addShape('rect', {
    x: 0.67, y: 2.12, w: 12.0, h: 4.70,
    fill: { color: 'FFFFFF', transparency: 100 },
    line: { color: C.HAIRLINE, width: 1.25, dashType: 'dash' },
  });
  tx(s, '내용 입력 영역', { x: 0.67, y: 4.18, w: 12.0, h: 0.40, fontSize: 20, color: C.MUTED, align: 'center', valign: 'middle' });
  tx(s, `${String(num).padStart(2, '0')} / ${TOTAL}`, { x: 11.47, y: 7.04, w: 1.2, h: 0.34, fontSize: 20, color: C.MUTED, align: 'right', valign: 'middle' });
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
    { k: '02 · 역사', q: '게임의 룰은\n어떻게 바뀌었나', b: '두 겹 · 3+1 다운턴', ref: 'S5 – S10' },
    { k: '03 · 재감사', q: '무엇이 통했고\n무엇이 부러졌나', b: '판정 ◎ 4 · ✕ 2', ref: 'S11 – S12' },
    { k: '04 · 처방', q: '무엇으로\n막을 것인가', b: '세 개의 저지선', ref: 'S13 – S15' },
  ];
  const xs = [0.67, 3.79, 6.91, 10.03];
  const Y = 2.36, H = 2.70, W = 2.64;
  cards.forEach((c, i) => {
    const dark = i === 3;
    rrect(s, xs[i], Y, W, H, { fill: dark ? C.NAVY : C.TINT });
    tx(s, c.k, { x: xs[i] + 0.25, y: Y + 0.24, w: W - 0.5, h: 0.30, fontSize: 20, bold: true, color: dark ? C.BLUE40 : C.BLUE });
    tx(s, c.q, { x: xs[i] + 0.25, y: Y + 0.62, w: W - 0.5, h: 0.85, fontSize: 22, bold: true, color: dark ? C.INV : C.TXT, lineSpacingMultiple: 1.1 });
    tx(s, c.b, { x: xs[i] + 0.25, y: Y + 1.58, w: W - 0.5, h: 0.62, fontSize: 20, color: dark ? C.INV_SUB : C.BODY, lineSpacingMultiple: 1.15 });
    tx(s, c.ref, { x: xs[i] + 0.25, y: Y + 2.24, w: W - 0.5, h: 0.30, fontSize: 20, color: dark ? C.INV_MUTED : C.MUTED });
  });
  [[3.31, 3.79], [6.43, 6.91], [9.55, 10.03]].forEach(([a, b]) => arrow(s, a, Y + 1.30, b, Y + 1.30));

  arrow(s, 11.35, Y + H, 11.35, 5.58);
  rrect(s, 6.17, 5.58, 6.5, 0.62, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.31 });
  tx(s, '2·3차 저지선 — S16 ~ S25', { x: 6.17, y: 5.58, w: 6.5, h: 0.62, fontSize: 20, bold: true, color: C.NAVY, align: 'center', valign: 'middle' });

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
// S6 — 패배는 두 겹으로 온다 (20년 관통 프레임 · 원문 §2 도식 2)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(6, '패배는 두 겹으로 온다',
    [['1겹의 열위가 죽음을 정하지 않는다 — ', {}], ['2겹의 유무가 정한다', { color: C.BLUE }]],
    '출처: 과제팀 스토리라인 R3 (2026-08-12) · DRAM 치킨게임 사료');

  const cx = [0.67, 3.27, 6.87, 10.27], cwd = [2.60, 3.60, 3.40, 2.40];
  const HY = 2.12, HH = 0.50, RH = 0.72;
  rect(s, 0.67, HY, 12.0, HH, C.NAVY);
  ['회사', '1겹 — 원가 · 기술', '2겹 — 시간 · 자리', '결과'].forEach((h, i) => {
    tx(s, h, { x: cx[i] + 0.16, y: HY, w: cwd[i] - 0.24, h: HH, fontSize: 20, bold: true, color: C.INV, valign: 'middle' });
  });
  [
    ['키몬다 2009', '✕', '트렌치 고수 · 원가 열위', '✕', '지원 패키지 불발', '퇴출', C.NEG],
    ['하이닉스', '✕✕', '부채비율 221%', '◎', '채권단 출자전환 3년', '생존 — 플래시 회복', C.BLUE],
    ['엘피다 2012', '✕', '모바일 전환 실패', '◎', '일본 공적자금 3년', '퇴출 — 회복 못 함', C.NEG],
    ['삼성 22~25', '✕', 'HBM3 양산 1년 반 지연', '✕', '인증·공동설계 실패', '생존 — 커서', C.NAVY],
  ].forEach((r, i) => {
    const y = HY + HH + i * RH;
    rect(s, 0.67, y, 12.0, RH, i % 2 ? C.ROW_ALT : C.WHITE);
    hline(s, 0.67, 12.67, y, C.HAIRLINE, 0.75);
    tx(s, r[0], { x: cx[0] + 0.16, y, w: cwd[0] - 0.24, h: RH, fontSize: 20, bold: true, color: C.TXT, valign: 'middle' });
    tx(s, runs([[`${r[1]} `, { color: C.NEG, bold: true }], [r[2], { color: C.BODY }]], { fontSize: 20 }),
      { x: cx[1] + 0.16, y, w: cwd[1] - 0.24, h: RH, fontSize: 20, color: C.BODY, valign: 'middle' });
    tx(s, runs([[`${r[3]} `, { color: r[3] === '◎' ? C.BLUE : C.NEG, bold: true }], [r[4], { color: C.BODY }]], { fontSize: 20 }),
      { x: cx[2] + 0.16, y, w: cwd[2] - 0.24, h: RH, fontSize: 20, color: C.BODY, valign: 'middle' });
    tx(s, r[5], { x: cx[3] + 0.16, y, w: cwd[3] - 0.24, h: RH, fontSize: 20, bold: true, color: r[6], valign: 'middle', lineSpacingMultiple: 1.05 });
  });
  hline(s, 0.67, 12.67, HY + HH + 4 * RH, C.HAIRLINE, 0.75);

  rect(s, 0.67, 5.62, 12.0, 0.46, C.TINT);
  tx(s, runs([
    ['밀린 칸은 그 칸에서 갚아야 한다', { color: C.BLUE }],
    [' — 원가를 캐파로, 기술을 자금으로 메우려 했다', {}],
  ], { fontSize: 20, bold: true, color: C.NAVY }), { x: 0.89, y: 5.62, w: 11.56, h: 0.46, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  [
    '① 2겹의 유무가 정한다',
    '② 시간은 기회일 뿐이다',
    '③ 우리는 커서 살았다',
  ].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    rect(s, x, 6.24, 3.86, 0.50, C.BLUE12);
    tx(s, t, { x: x + 0.22, y: 6.24, w: 3.42, h: 0.50, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('이 산업에서 회사는 한 겹으로 죽지 않는다. 패배는 늘 두 겹으로 왔다 — 1겹은 원가와 기술에서 밀리는 것이고, 2겹은 그것을 회복할 시간과 자리를 잃는 것이다. 1겹만으로는 죽지 않는다. 밀린 채로도 시간이 있으면 되돌아온다. 하이닉스가 그 증거다 — 1겹으로 보면 키몬다보다 나을 것이 없었고 2000년 말 부채비율이 221%였지만, 2002년 4월 마이크론 매각안(약 40억 달러)이 이사회에서 부결된 뒤 채권단이 출자전환으로 주주가 되면서 3년의 시간이 생겼고 그 시간에 플래시로 1겹을 회복했다(2005년 2분기 플래시 매출 비중 30.8%·이익 비중 61.4%). 키몬다에게는 그 3년을 대 줄 주체가 없었다. 반대편이 엘피다다 — 일본 공적자금이 3년을 대 줬는데도 죽었다. 그 시간에 1겹을 회복하지 못했기 때문이고, 블룸버그의 진단은 스마트폰의 돈을 좇는 데 실패한 결과라고 적었다. 시간은 회복의 기회일 뿐 회복 그 자체가 아니다. 그리고 아무도 죽지 않은 5년이 있었다(2016~21) — 클라우드 확대로 2017년 DRAM 매출이 76% 늘었지만 서버 DRAM도 결국 범용 구간이어서 기존 원가 공식이 그대로 작동했고 순위는 고정됐다. 이 기간의 재편은 파산이 아니라 자발적 이탈이었다(인텔 낸드 매각, 도시바 메모리 분리). 1겹만으로 순위가 유지된 마지막 시기이며, 이 5년의 성공이 다음 시기의 판단 기준을 굳혔다. 우리 차례는 2022~25년이다 — 정직하게 적으면 이것은 기술은 좋았는데 판단이 틀렸다는 이야기가 아니다. 2022년 시점에 이미 기술에서 밀려 있었다. SK는 2022년 6월 HBM3 양산에 들어갔고 우리는 2023년 말이었으며 HBM3E도 6~12개월 뒤졌다. 인증에 들어가지 못한 것은 관계의 문제이기 이전에 물건의 문제였다. 20년 만에 처음으로 두 겹 모두에서 밀린 국면이었고, 그런데도 살아남은 것은 잘해서가 아니라 커서였다. 다음 다운턴의 규모는 지금보다 작다.');
}

// ════════════════════════════════════════════════════════════════════════
// S7~S9 — CMO 매트릭스 3종 (다운턴별 M×C→O)
// ════════════════════════════════════════════════════════════════════════
{
  const s = cmoSlide(7, 'CMO-1 · 1차 치킨게임 2007~09',
    [['소모전이 통한 이유는 실력이 아니라 ', {}], ['6강 대칭이라는 맥락', { color: C.BLUE }], ['이었다', {}]],
    [
      ['C-a 경기자 구조', '6강 대칭 구조'],
      ['C-b 배분 규칙', '캐파·원가 = 점유율'],
      ['C-c 수요·거래', '현물가 · 가격 붕괴'],
      ['C-d 출발 위치', '재무·원가 리더'],
    ],
    [
      ['무감산 버티기', '소모전 — 체력 열위 퇴출', 'C-a 6강 대칭', '◎', '키몬다 파산 09.01 → 퇴출 직후 현물가 급등'],
      ['40nm 공정 선행', '원가 격차 확대', 'C-b 캐파·원가', '◎', '50nm급 대비 생산성 +60% · 전력 −30%'],
      ['A1 · 조직 통합', '위기를 재편의 창으로', 'C-c 수요 충격', '◎', '이듬해 매출 136.3조 · 영업이익 10.9조'],
      ['SanDisk 인수 시도', '다운턴 저가 매수', 'C-c 자산가 붕괴', '△', '철회 — 인수 불발, 가격 규율만 관측'],
      ['A2 · 역사이클 증설', '회복기 점유 흡수', 'C-b 캐파=점유율', '◎', '2010 시설투자 21.6조 → 회복기 점유 흡수'],
    ]);
  s.addNotes('행=삼성의 액션(M), 열=그 다운턴의 맥락(C), 셀=결과(O). 무감산 버티기는 6강 대칭·전원 이윤극대화라는 C에서만 완전 발화했다 — 키몬다 누적손실 30억 달러·2009년 1월 파산, 퇴출 직후 현물가 급등으로 과점 구조가 실증됐다. 다만 같은 액션은 C-c(현물가·수요 절벽)에서는 부분 발화(△)에 그쳐 2008년 4분기 전사 사상 첫 분기 적자 -0.94조를 냈다 — 체력 격차가 손실률 격차(-14% vs -40% 이하)로 전환되는 것이 소모전의 작동 형태다. 채움률 8/20 = 40%, "—"는 M×C 상호작용이 무의미한 칸. 반사실 한계: 대조군은 존재하지 않으며 판정은 동시대 경쟁사 대조로 보완한 정합성 판단이다.');
}

{
  const s = cmoSlide(8, 'CMO-2 · 2차 치킨게임 2010~13',
    [['심판대는 캐파가 아니라 ', {}], ['기술 전환', { color: C.BLUE }], ['이었다', {}]],
    [
      ['C-a 경기자 구조', '엘피다 체력 열위'],
      ['C-b 배분 규칙', '전환 성패 = 퇴출'],
      ['C-c 수요·거래', 'PC → 모바일 전환'],
      ['C-d 출발 위치', '1차전 승자 · 현금'],
    ],
    [
      ['Line-16 역사이클', '역사이클 캐파 선점', 'C-b 캐파·원가', '◎', '12조 투입 · 20nm급 DDR3 동시 양산'],
      ['공정·모바일 선행', '전환 심판대 선점', 'C-b 전환 성패', '◎', '30→20nm 세계 최초 — 엘피다는 탈락'],
      ['포트폴리오 재배분', '수요 전환 추종', 'C-c PC→모바일', '△', 'Austin $4B 전환 — 점유 효과는 미확인'],
      ['HDD 사업 매각', '비핵심 경량화', 'C-c 모바일 전환', '△', '$1.375B 회수 — 메모리 점유엔 간접'],
      ['엘피다 입찰 불참', '저가 매수 불행사', 'C-a 체력 열위', '△', '마이크론이 인수 — 스케일 점프 허용'],
    ]);
  s.addNotes('2차는 소모전 위에 기술 전환이 겹친 게임이었다. 같은 심판대에서 삼성은 30nm급(2010-07)·20nm급(2011-09) 세계 최초 연속과 LPDDR3 선행으로 통과했고, 엘피다는 PC→모바일 전환 대응 실패가 파산 요인으로 명시되며 탈락했다(부채 4,480억 엔, 전후 일본 제조업 최대). Line-16은 2010년 5월 착공·2011년 9월 가동, 총 12조로 당시 세계 최대 메모리 팹이다. 주목할 △는 엘피다 입찰 불참 — 저가 매수 창이 열렸으나 배분을 불행사했고, 인수한 마이크론이 모바일 DRAM 스케일과 다사이트 중앙 운영 체계를 얻었다. 퇴출자는 사라지는 것이 아니라 인수자의 체급이 된다.');
}

{
  const s = cmoSlide(9, 'CMO-3 · 다운사이클 2022~23',
    [['메커니즘은 복제됐지만, ', {}], ['맥락이 이동한 곳에서 결과는 재생되지 않았다', { color: C.BLUE }]],
    [
      ['C-a 경기자 구조', '3강 · 퇴출 후보 0'],
      ['C-b 배분 규칙', '캐파 vs 인증 이원화'],
      ['C-c 수요·거래', '수요 절벽 · AI 전야'],
      ['C-d 출발 위치', '$63B · HBM 후순위'],
    ],
    [
      ['A5 · 무감산 선언', '소모전 — 퇴출 유도', 'C-a 3강 과점', '✕', '퇴출자 0 · DS −4.58조 → 23.04 자진 철회'],
      ['투자·R&D 분리 집행', '재무 요새 역사이클', 'C-d 현금 요새', '◎', 'CapEx 53.1조 · R&D 28.34조 사상 최대'],
      ['A4 · Taylor 착공', '리드타임 소화', 'C-c 다운사이클', '△', '가동 2026~27 순연 · $17B → $37B+'],
      ['A6 · HBM 후순위', '주력 우선 자원배분', 'C-b 인증 게임', '✕', 'HBM 40%→17% · 33년 만의 DRAM 역전'],
      ['조직 구조 무대응', '1차전형 재편 불행사', 'C-c 사상 최대 적자', '△', '조직 재편 불발 — 2009 A1과 대칭 실패'],
    ]);
  s.addNotes('3차는 1차의 승리 공식을 복제했으나 C가 이동해 있었다. 무감산 선언(2022-10-27)→재확인(2023-01-31)→감산 공식화(2023-04-07)의 궤적에서 퇴출자는 0이었고, Q1 2023 전사 영업이익 0.6조(-96%)·DS부문 -4.58조 사상 최대 부문 적자 끝에 삼성 스스로 철회했다. 반면 재무 요새 위의 역사이클 투자는 발화했다 — 사상 최대 적자 연도에 CapEx 53.1조·R&D 28.34조 동시 사상 최대는 3강 중 삼성 단독이다(SK하이닉스는 적자 7.7조 속 CapEx 약 10조로 절감). A6의 반면교사: 2019년 HBM팀 축소라는 과거의 M이 2022년에는 C(출발 위치)로 전환돼 있었다 — 한 다운턴의 M이 다음 다운턴의 C가 된다.');
}

// ════════════════════════════════════════════════════════════════════════
// S9 — 네 번째 게임의 룰 (2×2 룰 카드)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(10, '네 번째 게임의 룰',
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
// S10 — 재감사 (A1~A6 판정 표)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(11, '재감사 — 무엇이 통했고 부러졌는가',
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

  s.addNotes('재감사가 특히 필요한 까닭은 우리가 과거 다운턴의 승자이기 때문이다 — 승자는 성공 공식을 복제하려는 유인이 가장 강하고, 그 함정은 3차에서 이미 한 번 실현된 관측이다[5]. 전략은 목록이 아니라 조건이다. A1은 이듬해 연결 매출 136.3조·영업이익 10.9조로 이어졌고, A5는 국가가 손실을 흡수하는 경기자를 가격으로 퇴출할 수 없다는 조건 소멸을, A6는 주력의 합리적 자원배분이 새 게임의 실기가 되는 메커니즘을 기록한다[5][6][7]. 역사이클 투자는 여전히 유효하되, 인증이 배분을 정하는 게임에서 인증 없는 캐파는 점유율로 전환되지 않으므로 바닥에서 사야 할 것은 웨이퍼 캐파가 아니라 기술 자산과 인재다[5]. 소모전이 부러진 자리는 특히 정확히 봐야 한다 — 그것이 작동하려면 네 전제가 동시에 서 있어야 했는데 2019년 이후 넷이 모두 무너졌다: 모든 경기자가 이윤에 반응한다(국가 자본 경기자 등장), 적자가 이어지면 자금줄이 끊긴다(자급률 목표는 회수를 요구하지 않는다), 제품이 비차별 범용재다(HBM과 규격 배분이 생겼다), 퇴출된 캐파는 시장에서 사라진다(인수·재가동으로 소유자만 바뀐다). 조건 하나가 바뀐 것이면 되돌릴 여지가 있지만 넷이면 그 전략은 되돌아오지 않는다. 원인에도 층이 있다 — 표면은 코로나와 공급망 충격이지만 중국 빅펀드는 2014년이고 CXMT·푸젠진화 설립은 2016년이니 코로나는 촉매였고, 중간층은 제재의 역설(수출 통제가 자급 동기를 키웠고 제재 대상 기업을 시장 논리에서 해방시켰다), 근본은 메모리가 부품에서 전략 물자로 격상된 것이다. 자연 실험도 있다 — 푸젠진화는 자본과 기술을 확보하고도 2018년 엔티티 리스트 지정으로 장비 접근이 봉쇄돼 사실상 소멸했고, CXMT는 키몬다 특허 약 7,000건의 라이선스라는 합법 경로로 접근권을 유지해 살아남았다. 같은 국가 자본, 다른 접근권 — 앞으로 승부가 갈리는 변수는 자본이 아니라 접근권일 수 있다.');
}

// ════════════════════════════════════════════════════════════════════════
// S11 — 자연 실험 (HBM 슬로프·비교 막대 + 낸드 점유 스트립 + 벤치마크 3)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(12, '자연 실험 — 경쟁사는 다르게 통과했다',
    [['갈린 것은 지출의 양이 아니라 ', {}], ['배분의 방향', { color: C.BLUE }], ['이었다', {}]],
    '출처: HBM/DRAM 점유율 리서치 · 기업용 SSD 1Q26 · 마이크론 FQ3 FY26');

  // ── 상단 좌: 삼성 HBM 점유율 슬로프 (하락 = 리스크 레드) ──
  const base8 = 4.06, maxH8 = 1.30, maxV = 60;
  tx(s, '삼성 HBM 점유율', { x: 0.67, y: 2.12, w: 3.5, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  const yOf = (v) => base8 - maxH8 * (v / maxV);
  const p1 = { x: 1.35, v: 40 }, p2 = { x: 3.40, v: 17 };
  s.addShape('line', { x: p1.x, y: yOf(p1.v), w: p2.x - p1.x, h: yOf(p2.v) - yOf(p1.v), line: { color: C.NEG, width: 3 } });
  [p1, p2].forEach((p) => s.addShape('ellipse', { x: p.x - 0.08, y: yOf(p.v) - 0.08, w: 0.16, h: 0.16, fill: { color: C.NEG }, line: { color: C.WHITE, width: 2 } }));
  tx(s, '40%', { x: p1.x - 0.5, y: yOf(p1.v) - 0.40, w: 1.0, h: 0.30, fontSize: 20, bold: true, color: C.BODY, align: 'center' });
  tx(s, '17%', { x: p2.x - 0.5, y: yOf(p2.v) - 0.42, w: 1.0, h: 0.30, fontSize: 20, bold: true, color: C.NEG, align: 'center' });
  tx(s, '2023', { x: p1.x - 0.6, y: base8 + 0.06, w: 1.2, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });
  tx(s, '25 상반기', { x: p2.x - 0.75, y: base8 + 0.06, w: 1.5, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });

  // ── 상단 중: HBM 점유 현재 비교 막대 ──
  tx(s, 'HBM 점유 — 현재', { x: 4.60, y: 2.12, w: 3.5, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  const bars8 = [{ x: 5.30, v: 57, f: C.BLUE, lc: C.NAVY, n: 'SK하이닉스' }, { x: 6.85, v: 22, f: C.GRAY, lc: C.BODY, n: '삼성' }];
  bars8.forEach((b) => {
    const h = maxH8 * (b.v / maxV);
    rect(s, b.x, base8 - h, 0.85, h, b.f);
    tx(s, `${b.v}%`, { x: b.x - 0.3, y: base8 - h - 0.32, w: 1.45, h: 0.30, fontSize: 20, bold: true, color: b.lc, align: 'center' });
    tx(s, b.n, { x: b.x - 0.45, y: base8 + 0.06, w: 1.75, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });
  });

  // ── 상단 우: DRAM 역전 스탯 카드 ──
  rrect(s, 8.40, 2.12, 4.27, 2.06, { fill: C.TINT });
  tx(s, '순환 점유율은 되찾힌다', { x: 8.66, y: 2.38, w: 3.75, h: 0.30, fontSize: 20, bold: true, color: C.NAVY });
  tx(s, '32.6% → 38.5%', { x: 8.66, y: 2.70, w: 3.75, h: 0.46, fontSize: 28, bold: true, color: C.BLUE });
  tx(s, '삼성 DRAM 25.3Q → 26.1Q', { x: 8.66, y: 3.20, w: 3.75, h: 0.30, fontSize: 20, color: C.MUTED });
  tx(s, '유출 점유율은 안 돌아온다', { x: 8.66, y: 3.58, w: 3.75, h: 0.30, fontSize: 20, bold: true, color: C.NEG });

  // ── 중단: 벤치마크 3카드 (가로 1행) ──
  const bm = [
    { t: 'SK · 3년 안에 되돌렸다', b: 'M15X 낸드 → DRAM 전환' },
    { t: '마이크론 · 수요 선행', b: 'SCA 16건 · $1,000억' },
    { t: '키옥시아 · 세대 선행', b: '캐파 대신 아키텍처' },
  ];
  bm.forEach((c, i) => {
    const x = 0.67 + i * 4.07;
    rrect(s, x, 4.56, 3.86, 0.98, { fill: C.TINT });
    tx(s, c.t, { x: x + 0.22, y: 4.65, w: 3.42, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, c.b, { x: x + 0.22, y: 4.99, w: 3.42, h: 0.30, fontSize: 20, color: C.BODY });
  });

  // ── 하단: 기업용 SSD 매출 점유 스트립 (1Q26, %) — 낸드는 5강 분산 ──
  tx(s, '기업용 SSD 매출 점유 1Q26 (%) — 5강 분산 · YMTC 5%→13%', { x: 0.67, y: 5.68, w: 12.0, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  const segs = [
    { v: 38.2, f: C.BLUE, tc: C.INV, n: '삼성' },
    { v: 25.1, f: C.BLUE70, tc: C.INV, n: 'SK그룹' },
    { v: 16.7, f: C.BLUE40, tc: C.NAVY, n: '마이크론' },
    { v: 12.0, f: C.GRAY, tc: C.BODY, n: '키옥시아' },
    { v: 8.0, f: C.HAIRLINE, tc: C.BODY, n: '샌디스크' },
  ];
  const gap = 0.02, usable = 12.0 - gap * (segs.length - 1);
  let sx = 0.67;
  segs.forEach((g) => {
    const w = usable * (g.v / 100);
    const cx0 = sx + w / 2;
    tx(s, g.n, { x: Math.min(cx0 - 0.55, 11.57), y: 6.06, w: 1.10, h: 0.28, fontSize: 20, color: C.MUTED, align: 'center' });
    rect(s, sx, 6.42, w, 0.40, g.f);
    tx(s, g.v.toFixed(1), { x: sx, y: 6.42, w, h: 0.40, fontSize: 20, bold: true, color: g.tc, align: 'center', valign: 'middle' });
    sx += w + gap;
  });

  s.addNotes('SK하이닉스는 2023년 영업적자 7.7조 원 속에 투자를 10조 원 수준으로 줄이면서도 HBM·엔비디아 공동설계에 집중해 DRAM 1위(36% 대 34%)·HBM 57%, 2025 회계연도 영업이익 47.2조 원(삼성 전사 43.6조 원 초과)을 가져갔다 — A6의 정확한 반례다[5]. 마이크론은 매출 -49%의 수축 속에서 수요를 먼저 잠갔고(SCA 16건·최소 계약 매출 약 1,000억 달러·예치금과 금융 약정 220억 달러), 2026년 초 크루셜 철수로 전 캐파를 고마진 기업용·AI로 돌렸다[2][3]. 낸드는 5강 분산에 YMTC까지 — 2023년 낸드 감산률 50% 유지가 방증하듯 감산 공조도 퇴출 유도도 어려워, 다음 다운턴은 낸드에서 더 깊고 규율 없이 온다[2][5][7]. "거기를 선점 못하면 다음 턴이 오면 점점 (저가) 장사밖에 안 되는 거거든요." — 상품기획 리더[10].');
}

// ════════════════════════════════════════════════════════════════════════
// S12 — 1차 저지선과 세 개의 구멍 (방벽 4층 + 구멍 콜아웃 3)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(13, '1차 저지선과 세 개의 구멍',
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

  // 구멍 콜아웃 3 — 마커는 방벽 우변, 카드 중심과 같은 높이로 수평 연결
  const holes = [
    { t: '구멍 1 — 완제품 부가가치', b: '웨이퍼 후퇴 시 마진 층 소멸\n계약가 1분기比 +246%' },
    { t: '구멍 2 — 계약 만기', b: '갱신의 힘은 계약서 밖에 있다\n“필요 없으면 PO 캔슬” (23년)' },
    { t: '구멍 3 — 기술 전환', b: '수요 이동 시 커버리지 공동화\n계약은 전환을 못 막는다 (예측)' },
  ];
  holes.forEach((hc, i) => {
    const y = [2.38, 3.78, 5.18][i];
    const cy = y + 0.57;
    dashCircle(s, 7.32, cy, 0.44, C.NEG);
    arrow(s, 7.54, cy, 7.85, cy, { color: C.NEG, width: 1.5, dash: true, noHead: true });
    rrect(s, 7.85, y, 4.82, 1.14, { fill: C.WHITE, line: { color: C.HAIRLINE, width: 1.0 } });
    tx(s, hc.t, { x: 8.07, y: y + 0.10, w: 4.4, h: 0.30, fontSize: 20, bold: true, color: C.NEG });
    tx(s, hc.b, { x: 8.07, y: y + 0.44, w: 4.4, h: 0.62, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.12 });
  });

  s.addNotes('"지금은 5년짜리에 선수금을 수십억 달러 단위로 받아서 통장에 넣어. 걔네가 구매 의무를 저버리면 그 개수 × 판가만큼 받은 캐시에서 깐다는 것 — 테이크 오어 페이(take-or-pay)야. 사우디 오일 계약처럼. 메모리가 처음으로 그 개념을 바인딩해." — 메모리 영업 리더[4]. 세 다운턴 어디에도 없던 매출 바닥 메커니즘이고 거래는 스팟→LTA→SCA로, 참여형 구조까지 금융의 언어로 진화 중이다[5][8]. 그러나 구멍도 셋 — 낸드 웨이퍼 계약가 급등(2025년 11월 한 달 +60% 초과·1분기 대비 +246%)은 완제품 부가가치의 고객 내재화 신호이고[11], "얘네는 계약을 했다지만 필요 없으면 CFO가 오더를 다 캔슬해 — 2023년 하반기에 경험한 거예요"[4], 기술 전환이 방아쇠인 다운턴에는 커버리지 자체가 공동화된다(예측)[5].');
}

// ════════════════════════════════════════════════════════════════════════
// S13 — 세 개의 저지선 (다크 — 처방 장 매듭 + 2차 저지선 상세로의 다리)
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
  tx(s, `14 / ${TOTAL}`, { x: 11.47, y: 7.04, w: 1.2, h: 0.34, fontSize: 20, color: C.INV_MUTED, align: 'right', valign: 'middle' });

  s.addNotes('"1차 방어가 그렇게 되더라도 2차 방어가 이제부터 필요한 거죠. 여러분들이 그 과제를 하는 게 나는 2차 방어라고 생각해. 미래 리스크의 80%는 뭔가 마련을 해야 된다." — 메모리 영업 리더[4]. 세 저지선은 대체재가 아니라 직렬이다. 2차 방어의 골격 — 제품(램프업 속도와 수율), 투자("투자 셰어 < 빗 셰어 < 프로핏 셰어"의 규율), 오퍼레이션[4]. 일곱 편의 제안이 각자의 자리에서 구체안을 내며, 공통 질문은 하나다: 다운턴이 왔을 때, 그리고 그 한복판에서 새 게임이 태어났을 때, 우리는 대체되지 않는 공급자인가.');
}

// ════════════════════════════════════════════════════════════════════════
// S15 — 되돌릴 수 있는 것부터 버린다 (실행 순서 원칙 · 원문 §4 말미)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(15, '되돌릴 수 있는 것부터 버린다',
    [['방향을 바꾸기로 했다면, ', {}], ['무엇부터 손대는가가 실행의 전부', { color: C.BLUE }], ['다', {}]],
    '출처: 과제팀 스토리라인 R3 — L1/L2/L3 가역성 층위 · SK 실증');

  // ── 좌: 가역성 3층 ────────────────────────────────────────────────
  [
    { k: 'L1 · 완전 가역 — 먼저', b: '미집행 CapEx · 팹 용도 결정', c: '시황 신호만으로 조정', f: C.BLUE12, tc: C.NAVY },
    { k: 'L2 · 부분 가역 — 두 번째', b: '가동률 · 제품 믹스 · 노드 전환', c: '재고·가격 지표를 보고', f: C.BLUE40, tc: C.NAVY },
    { k: 'L3 · 비가역 — 마지막', b: '사업 매각 · 라인 폐쇄', c: '수요 소멸이 확인될 때만', f: C.NAVY, tc: C.INV },
  ].forEach((l, i) => {
    const y = 2.12 + i * 1.30;
    rect(s, 0.67, y, 5.66, 1.18, l.f);
    tx(s, l.k, { x: 0.89, y: y + 0.10, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: l.tc });
    tx(s, l.b, { x: 0.89, y: y + 0.44, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: l.tc });
    tx(s, l.c, { x: 0.89, y: y + 0.76, w: 5.22, h: 0.30, fontSize: 20, color: l.tc === C.INV ? C.INV_SUB : C.BODY });
    if (i < 2) arrow(s, 3.50, y + 1.20, 3.50, y + 1.28, { color: C.BLUE70, width: 2 });
  });

  // ── 우: SK 실증 · 우리 반례 · 질문 ────────────────────────────────
  rrect(s, 6.81, 2.12, 5.86, 1.84, { fill: C.TINT });
  tx(s, 'SK의 실증', { x: 7.03, y: 2.22, w: 5.42, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  tx(s, '가역 구간은 과감 — M15X를 낸드에서 DRAM으로 전환(5.3조)', { x: 7.03, y: 2.54, w: 5.42, h: 0.64, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });
  tx(s, '비가역 구간은 유지 — 솔리다임 안 팔았고 24년 2분기 흑자', { x: 7.03, y: 3.20, w: 5.42, h: 0.64, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });

  rrect(s, 6.81, 4.06, 5.86, 1.16, { fill: C.NEG_BG });
  tx(s, '우리의 2022~23', { x: 7.03, y: 4.16, w: 5.42, h: 0.30, fontSize: 20, bold: true, color: C.NEG });
  tx(s, '반대였다 — 가장 쉽게 되돌릴 수 있는 층에서 가장 늦게 움직였다', { x: 7.03, y: 4.48, w: 5.42, h: 0.64, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });

  rrect(s, 6.81, 5.32, 5.86, 0.58, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.02 });
  tx(s, '먼저 물을 것 — 사업이 틀렸나, 시점이 이른가', { x: 7.03, y: 5.32, w: 5.42, h: 0.58, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  // ── 하단: 결론 밴드 ───────────────────────────────────────────────
  rect(s, 0.67, 6.10, 12.0, 0.72, C.BLUE12);
  tx(s, runs([
    ['SK가 이긴 것은 처음부터 옳아서가 아니라, ', {}],
    ['틀린 베팅을 3년 안에 물리적 자산의 재배분으로 되돌렸기 때문이다', { color: C.BLUE }],
  ], { fontSize: 20, bold: true, color: C.NAVY }), { x: 0.89, y: 6.10, w: 11.56, h: 0.72, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  s.addNotes('방향을 바꾸기로 했다면 무엇부터 손대는가가 실행의 전부이고, 원칙은 되돌릴 수 있는 것부터 버린다는 것이다. 미집행 CapEx와 팹 용도 결정은 완전히 가역이므로 시황 신호만으로 가장 먼저 조정하고, 가동률과 제품 믹스와 노드 전환은 부분 가역이므로 재고와 가격 지표를 보고 두 번째로 움직이며, 사업 매각과 라인 폐쇄는 비가역이므로 수요 자체의 소멸이 확인될 때에만 마지막으로 건드린다. SK가 정확히 그렇게 했다 — 가역 구간에서는 M15X의 용도를 갈아엎을 만큼 과감했고(2024년 4월 이사회가 낸드 확장 라인을 DRAM 생산기지로 전환, 5.3조 원·장기로는 20조 원 이상 투입, 이어 P&T7 패키징 팹 19조 원 신설로 전공정에서 패키징까지를 하나로 이었다), 비가역 구간에서는 적자가 이어지던 솔리다임을 팔지 않았다. 판단 근거는 두 가지였다 — 같은 비트를 만드는 데 HBM이 범용 대비 최소 두 배 이상의 캐파를 요구한다는 것, 그리고 TSV 캐파를 늘리던 M15와 붙어 있다는 것. 그 판단에서 좋은 질문 하나가 남는다: 철수를 논할 때 먼저 물어야 할 것은 사업이 틀렸는가, 시점이 이른가다. 솔리다임은 후자였고(기업용 SSD 수요는 실재했으나 2021~23년에는 일렀다) 그래서 유지하되 증분을 끊었으며 2024년 2분기에 흑자로 돌아섰다. 우리의 2022~23년은 반대였다 — 가장 쉽게 되돌릴 수 있는 층에서 가장 늦게 움직였다. SK가 이긴 것은 처음부터 옳아서가 아니다. 2021년 90억 달러를 들여 솔리다임을 인수하며 낸드와 기업용 SSD에 크게 걸었고 이후 적자가 이어졌다. 결정적 차이는 그다음에 있었다 — 틀린 베팅을 3년 안에 물리적 자산의 재배분으로 되돌렸다.');
}

// ════════════════════════════════════════════════════════════════════════
// S16 — 제2 저지선 한 장 요약
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(16, '제2 저지선 — 부가가치를 지킨다',
    [['다운턴에도 마진이 완전히 걷히지 않게 하는 ', {}], ['두 개의 전략', { color: C.BLUE }]],
    '출처: mfg-fungibility-proposal.md · dram-architecture-proposal.md');

  // 저지선 위치 스트립
  ['1차 · 계약 — 물량 바닥', '2차 · 제품 — 부가가치', '3차 · 플랫폼 — 대체 불가'].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    const on = i === 1;
    rect(s, x, 2.12, 3.86, 0.44, on ? C.NAVY : C.TINT);
    tx(s, t, { x: x + 0.20, y: 2.12, w: 3.46, h: 0.44, fontSize: 20, bold: true, color: on ? C.INV : C.MUTED, align: 'center', valign: 'middle' });
  });

  // 전략 2카드
  [
    {
      k: '전략 1 · 전환할 수 있는 몸', s: '양산 체제 — 만드는 몸',
      p: '문제 · 감가 45.9조 — 붕괴선 104조로',
      a: '세대 연장성 · 제품 간 동일성 · N-1 설계',
      v: '전환 6→3개월 = 회당 약 1조\nN-1 원가 우위 25~35%',
    },
    {
      k: '전략 2 · 판을 옮긴다', s: '제품·아키텍처 — 만들 제품',
      p: '문제 · 따라잡히는 축 위에 서 있다',
      a: '웨이퍼 본딩 · zHBM 커스텀 플랫폼\n분할 경계는 설계 승인 요건으로',
      v: '커스텀 2~3년 → 절반 이하\n해자 = zHBM 견적서 네 줄',
    },
  ].forEach((c, i) => {
    const x = 0.67 + i * 6.14;
    rrect(s, x, 2.76, 5.86, 3.30, { fill: C.TINT });
    tx(s, c.k, { x: x + 0.24, y: 2.90, w: 5.38, h: 0.34, fontSize: 24, bold: true, color: C.BLUE });
    tx(s, c.s, { x: x + 0.24, y: 3.28, w: 5.38, h: 0.30, fontSize: 20, color: C.MUTED });
    hline(s, x + 0.24, x + 5.62, 3.68, C.HAIRLINE, 0.75);
    tx(s, c.p, { x: x + 0.24, y: 3.78, w: 5.38, h: 0.62, fontSize: 20, color: C.NEG, lineSpacingMultiple: 1.15 });
    tx(s, c.a, { x: x + 0.24, y: 4.46, w: 5.38, h: 0.62, fontSize: 20, bold: true, color: C.NAVY, lineSpacingMultiple: 1.15 });
    tx(s, c.v, { x: x + 0.24, y: 5.16, w: 5.38, h: 0.68, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });
  });

  rect(s, 0.67, 6.20, 12.0, 0.56, C.BLUE12);
  tx(s, '설비를 돌릴 수 있는 몸과, 돌릴 곳이 있는 로드맵은 한쪽만으로 성립하지 않는다', { x: 0.89, y: 6.20, w: 11.56, h: 0.56, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  s.addNotes('제2 저지선은 다운턴에도 마진이 완전히 걷히지 않게 하는 부가가치의 차별화다. 두 전략은 경쟁하지 않고 같은 몸의 다른 근육이다 — 전략 1은 겨울이 오면 이 설비를 다른 제품으로 돌릴 수 있느냐를 묻고, 전략 2는 그때 돌릴 만한 제품이 애초에 로드맵에 있느냐를 묻는다. 분업도 명확하다: 로우엔드 원가 방어는 전략 1의 N-1 설계가, 선단 성능은 전략 2의 아키텍처가 맡으며, 1c nm·HBM4E·EUV 목표는 어느 쪽도 조정하지 않는다. 시계도 다르다 — 전략 1의 시계는 제품 믹스 전환 리드타임이고 전략 2의 시계는 신제품 개발 TAT다. 같은 "6개월"이라는 말이 서로 다른 구간을 가리키므로 혼동에 주의한다. 두 전략의 정식 명제를 나란히 놓으면 문장이 완성된다 — 전략 1은 "제품은 다극으로, 공정은 단극에 가깝게", 전략 2는 "제품은 다품종으로, 설계는 단일 플랫폼으로".');
}

// ════════════════════════════════════════════════════════════════════════
// S15 — 비동기 사이클 (전략 1번의 당위성) · 100% 누적 막대
// 데이터: wiki/concepts/product-mix-asynchrony.md
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(17, '비동기 사이클 — 어느 믹스가 올지 모른다',
    [['과거 3년에 믹스는 이미 뒤집혔고, ', {}], ['세 시나리오는 서로 반대로 갈라진다', { color: C.BLUE }]],
    '출처: TrendForce·Yole (매출 기준) — product-mix-asynchrony.md');

  // 세그먼트 정의 — 아래에서 위로 쌓는다
  const SEG = [
    { key: 'nand', n: 'NAND', f: C.GRAY, tc: C.BODY },
    { key: 'gen', n: '범용 DRAM', f: C.BLUE40, tc: C.NAVY },
    { key: 'hbm', n: 'HBM', f: C.BLUE, tc: C.INV },
    { key: 'next', n: '차세대', f: C.NAVY, tc: C.INV },
  ];
  const BARS = [
    { x: 0.80, lbl: '2023', d: { nand: 42.4, gen: 53.0, hbm: 4.6 } },
    { x: 2.42, lbl: '2024', d: { nand: 42.6, gen: 45.9, hbm: 11.5 } },
    { x: 4.04, lbl: '2025', d: { nand: 29.6, gen: 56.0, hbm: 14.4 } },
    { x: 5.66, lbl: '2026E', d: { nand: 26.7, gen: 43.2, hbm: 30.1 } },
    { x: 7.75, lbl: '① 수요발', d: { nand: 35, gen: 50, hbm: 15 } },
    { x: 9.37, lbl: '② 공급발', d: { nand: 28, gen: 34, hbm: 38 } },
    { x: 10.99, lbl: '③ 전환발', d: { nand: 27, gen: 33, hbm: 20, next: 20 } },
  ];
  const BW = 1.30, BASE = 5.90, BH = 3.28;

  // 범례 (좌) + 시나리오 그룹 헤더 (우)
  let lx = 0.67;
  SEG.forEach((g) => {
    rect(s, lx, 2.20, 0.22, 0.22, g.f);
    tx(s, g.n, { x: lx + 0.30, y: 2.12, w: 1.85, h: 0.34, fontSize: 20, color: C.BODY, valign: 'middle' });
    lx += 0.30 + (g.n.length > 4 ? 1.85 : 1.05);
  });
  tx(s, '2029 시나리오 — 예시 가정', { x: 7.20, y: 2.12, w: 5.47, h: 0.34, fontSize: 20, bold: true, color: C.BLUE, align: 'right', valign: 'middle' });

  // 실적 / 시나리오 구분선
  s.addShape('line', { x: 7.20, y: 2.56, w: 0, h: 3.70, line: { color: C.HAIRLINE, width: 1.25 } });

  // 100% 누적 막대
  BARS.forEach((b) => {
    let acc = 0;
    SEG.forEach((g) => {
      const v = b.d[g.key];
      if (!v) return;
      const h = BH * (v / 100);
      const y = BASE - h - acc;
      rect(s, b.x, y, BW, h, g.f);
      if (h >= 0.36) {
        tx(s, `${Math.round(v)}%`, { x: b.x, y, w: BW, h, fontSize: 20, bold: true, color: g.tc, align: 'center', valign: 'middle' });
      }
      acc += h;
    });
    tx(s, b.lbl, { x: b.x - 0.25, y: 5.96, w: BW + 0.50, h: 0.30, fontSize: 20, color: C.MUTED, align: 'center' });
  });
  hline(s, 0.67, 12.67, BASE, C.HAIRLINE, 1.0);

  // 결론 2타일
  [
    ['3년 만에 HBM 5% → 30%', 0.67],
    ['2025년 DRAM +73% · NAND +3%', 6.81],
  ].forEach(([t, x]) => {
    rect(s, x, 6.36, 5.86, 0.46, C.BLUE12);
    tx(s, t, { x: x + 0.22, y: 6.36, w: 5.42, h: 0.46, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('단일 사이클 시대라면 모든 제품군이 같은 방향으로 움직여야 한다. 실측은 반대다 — 2025년 한 해에 DRAM은 +73%($907억→$1,657억), NAND는 +3.4%($674억→$697억)였다. 더 선명한 것은 2024년 4분기다: DRAM 매출 +9.9% QoQ 상승 국면에 NAND는 −6.2% QoQ로 내렸고, 이듬해 1분기에는 추가 −20%가 전망됐다. 같은 분기, 반대 방향 — 사이클이 하나였다면 불가능한 관측이다. 믹스도 3년 만에 뒤집혔다. HBM은 매출 비중 4.6%에서 30.1%로 6.5배, NAND는 42.4%에서 26.7%로 거의 반토막이 됐고, 범용 DRAM조차 53→46→56→43%로 오르내린다. 어떤 제품군도 안정된 지분을 갖지 못한다. 오른쪽 세 막대는 다음 다운턴(2028~29 창)의 세 원인 경로가 만드는 믹스로, 방향성 대비를 위한 예시 가정이며 예측이 아니다. 확정된 것은 하나 — 세 경로가 만드는 믹스는 서로 반대다. ①수요발(AI 투자수익률 재평가, 시나리오 C·D 합산 약 29%)이 오면 HBM 캐파가 남고, ②공급발(2028~29 신규 캐파 동시 도래 + CXMT)이 오면 범용 캐파가 남으며, ③전환발(3D DRAM·CXL·zHBM, 시나리오 E 5~10%)이 오면 둘 다 남으면서 차세대 캐파가 모자란다. 셋 중 하나를 골라 배분하면 나머지 둘에서 틀린다. 그런데 전환에는 실행만 6개월, 신호 감지와 의사결정을 붙이면 9~12개월이 들고 그사이 판가는 분기마다 15%씩 빠진다. 그래서 답은 방향의 선택이 아니라 전환 속도의 확보다 — 다음 장의 「전환할 수 있는 몸」이 그 방법이다. 수치 주의: 2023년 절대액은 이듬해 매출과 YoY에서 역산했고 2026E는 TrendForce 2026-01 전망치다. 비중은 매출 기준이며 비트 기준과 다르다 — 2024년 HBM은 매출의 20%였으나 비트로는 5%였다.');
}

// ════════════════════════════════════════════════════════════════════════
// S16 — 전략 1번 · 전환할 수 있는 몸 (outputs/storyline/mfg-fungibility-proposal.md 요약)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(18, '전략 1번 · 전환할 수 있는 몸',
    [['무너뜨리는 것은 판가가 아니라 감가 — 가르는 것은 ', {}], ['전환 가능성', { color: C.BLUE }], ['이다', {}]],
    '출처: mfg-fungibility-proposal.md — 종합반도체의 양산 체제로');

  // ── 좌: 같은 CAPEX 곡선의 두 얼굴 ─────────────────────────────────
  rrect(s, 0.67, 2.12, 4.10, 2.10, { fill: C.TINT });
  tx(s, '앞면 · 감가의 파고', { x: 0.89, y: 2.26, w: 3.66, h: 0.30, fontSize: 20, bold: true, color: C.NEG });
  tx(s, '45.9조', { x: 0.89, y: 2.60, w: 3.66, h: 0.50, fontSize: 32, bold: true, color: C.NEG });
  tx(s, '2029E 감가 · +56%', { x: 0.89, y: 3.14, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });
  tx(s, '붕괴선 67조 → 104조', { x: 0.89, y: 3.46, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });
  tx(s, '같은 붕괴 시 약 −31조', { x: 0.89, y: 3.78, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });

  rrect(s, 0.67, 4.34, 4.10, 1.80, { fill: C.BLUE12 });
  tx(s, '뒷면 · 감가 완료 설비', { x: 0.89, y: 4.48, w: 3.66, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  tx(s, '196조', { x: 0.89, y: 4.82, w: 3.66, h: 0.50, fontSize: 32, bold: true, color: C.BLUE });
  tx(s, '2028년 말 취득원가 기준', { x: 0.89, y: 5.36, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });
  tx(s, '메모리 귀속 108~137조', { x: 0.89, y: 5.68, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });

  // ── 우: 세 개의 축 + 경계 ─────────────────────────────────────────
  const axes = [
    { k: '축 ① 세대 연장성 · 시간축', b: '공통 기술 축 위에 로드맵 정렬 — 4F² COP로 전 갈래 수렴' },
    { k: '축 ② 제품 간 동일성 · 제품축', b: '제품은 다극으로, 공정은 단극에 가깝게' },
    { k: '축 ③ N-1 설계 · 설비 세대축', b: '볼륨·로우엔드는 1~2세대 이전 노드로도' },
    { k: '실행 ⑤ 조직과 보상 — 증액 없음', b: '횡전개 인센티브 재원 · 파견 처우 · 본딩 전담조직' },
  ];
  axes.forEach((a, i) => {
    const y = 2.12 + i * 1.12;
    rrect(s, 4.97, y, 7.70, 1.02, { fill: i === 3 ? C.BLUE12 : C.TINT });
    tx(s, a.k, { x: 5.19, y: y + 0.14, w: 7.26, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, a.b, { x: 5.19, y: y + 0.48, w: 7.26, h: 0.34, fontSize: 20, color: C.BODY });
  });

  // ── 하단: 값 3타일 ────────────────────────────────────────────────
  [
    '선단 불변 · N-1은 아래쪽만',
    '전환 6→3개월 · 회당 1조',
    'N-1 원가 우위 25~35%',
  ].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    rect(s, x, 6.40, 3.86, 0.42, C.BLUE12);
    tx(s, t, { x: x + 0.22, y: 6.40, w: 3.42, h: 0.42, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('명제 — 종합반도체는 제품 포트폴리오만이 아니라 양산 체제가 종합반도체여야 한다. 문제는 판가가 아니라 감가다: 2023년 DS 감가 29.4조가 2028E 44.5조·2029E 45.9조로 오면서 손익 붕괴선이 매출 66.6조에서 104조로 1.5배 올라간다. 같은 폭의 가격 붕괴가 오면 적자는 -14.88조에서 약 -31조로 깊어진다(반사실 추정, 밴드 -28~-35조). 지금 CAPEX를 급제동해도 최소 +13조는 이미 확정 — 파고는 이미 출발했다. 그러나 같은 곡선의 뒷면에서 2028년 말까지 취득원가 196조(메모리 귀속 108~137조)의 설비가 감가를 마친다. 위기와 기회를 가르는 것은 하나 — 그 설비로 무엇을 만들 수 있는가. 세 축은 서로 직교한다(시간축·제품축·설비 세대축). 경계: 선단 리더십은 불변이며 1c nm·HBM4E·EUV 목표는 조정하지 않는다. 값: 전환 본체를 6→3개월로 줄이면 전환 1회당 약 1조·다운턴 1회당 2~3조, N-1 라인의 비트당 원가 우위는 다운턴 25~35%(호황 11~21%). 네 실행 영역(설계 규범·설비 구매 사양·교차 퀄 상시화·투자 거버넌스) 어디에도 증액 요구가 없다 — 예산이 아니라 규범과 문서 양식의 변경이다. 첫 실행 항목은 목표치가 아니라 측정: 지금 우리 팹의 전환 가능 캐파 비율을 아무도 답할 수 없다. 덧붙여 — 감가를 흡수하지 않고 회피하는 길도 이론상 있다. 공장을 갖지 않는 것이다. 일본 키엔스가 그 길을 끝까지 가 자체 공장 없이 위탁생산으로 고정비를 지지 않았고, 그 대가로 10년 내내 영업이익률 50~56% 밴드를 벗어난 적이 없다. 감가가 없으면 사이클이 손익을 흔들 지렛대도 없다. 우리에게 이 길은 닫혀 있다 — 메모리는 팹이 곧 제품이고, 그 팹을 남에게 맡기는 순간 공정이 곧 경쟁력이라는 사업의 전제가 사라진다. 그러니 남은 선택지는 하나다. 고정비를 없앨 수 없다면, 그 고정비가 흔들릴 때 받아 낼 몸을 만드는 것. 선택과 집중의 원본도 같은 구분을 준다 — 키엔스 창업자는 영업이익률 20%대 사업조차 1983년에 매각하고 센서에만 집중했지만, 우리는 메모리사업 자체를 접을 수 없으므로 선택과 집중을 사업이 아니라 제품 믹스에서 해야 하고, 제품 믹스를 옮기려면 설비가 그 이동을 받아 줘야 한다. 접을 수 없는 회사가 옮기지도 못하면 남는 길은 키몬다와 엘피다가 간 길뿐이다.');
}

// ════════════════════════════════════════════════════════════════════════
// S17 — 따라잡히는 축 (전략 2번의 당위성)
// 데이터: outputs/storyline/dram-architecture-proposal.md §1~§2
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(19, '따라잡히는 축 위에 서 있다',
    [['셀·캐파·원가는 ', {}], ['돈과 국가 의지로 살 수 있는 축', { color: C.BLUE }], ['이다', {}]],
    '출처: dram-architecture-proposal.md §1~§2 — DRAM 점유·로직 사료');

  // ── 좌: 위아래 협공 ───────────────────────────────────────────────
  rect(s, 0.67, 2.12, 5.66, 0.94, C.NEG_BG);
  tx(s, '위에서 — 삼성 HBM', { x: 0.89, y: 2.24, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: C.NEG });
  tx(s, '40% → 17%', { x: 0.89, y: 2.58, w: 5.22, h: 0.36, fontSize: 24, bold: true, color: C.NEG });
  arrow(s, 3.50, 3.10, 3.50, 3.34, { color: C.NEG, width: 2 });

  rect(s, 0.67, 3.38, 5.66, 1.16, C.NAVY);
  tx(s, '가운데 — 삼성 DRAM 점유', { x: 0.89, y: 3.48, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: C.INV_SUB });
  tx(s, '41% → 32.6%', { x: 0.89, y: 3.74, w: 3.4, h: 0.46, fontSize: 28, bold: true, color: C.INV });
  tx(s, '’24 → ’25 3Q', { x: 4.30, y: 3.80, w: 1.81, h: 0.30, fontSize: 20, color: C.INV_MUTED, align: 'right' });
  tx(s, '’26 1Q 38.5%로 회복 — 순환은 돌아온다', { x: 0.89, y: 4.16, w: 5.22, h: 0.30, fontSize: 20, color: C.INV_SUB });
  arrow(s, 3.50, 4.58, 3.50, 4.76, { color: C.BLUE70, width: 2 });

  rect(s, 0.67, 4.80, 5.66, 1.06, C.TINT);
  tx(s, '아래에서 — 중국 추격', { x: 0.89, y: 4.88, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  tx(s, 'CXMT 4.9% → 8%', { x: 0.89, y: 5.20, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: C.NAVY });
  tx(s, 'YMTC 5% → 13% (낸드)', { x: 0.89, y: 5.52, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: C.NAVY });

  // ── 우: 축의 대비 (로직 4판 vs 메모리 1축) ────────────────────────
  tx(s, '로직 — 20년에 네 번 판을 옮겼다', { x: 6.81, y: 2.12, w: 5.86, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  [['① 멀티코어 ’04', 6.81, 2.50], ['② FinFET ’11', 9.84, 2.50],
   ['③ 칩렛 ’19', 6.81, 3.18], ['④ DSA ’15~', 9.84, 3.18]].forEach(([t, x, y]) => {
    rrect(s, x, y, 2.83, 0.60, { fill: C.BLUE12 });
    tx(s, t, { x: x + 0.18, y, w: 2.47, h: 0.60, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });
  tx(s, '메모리 — 한 축에 서 있었다', { x: 6.81, y: 3.94, w: 5.86, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  rrect(s, 6.81, 4.32, 5.86, 1.48, { fill: C.TINT });
  tx(s, '6F² 셀 2007~ 그대로', { x: 7.03, y: 4.46, w: 5.42, h: 0.30, fontSize: 20, color: C.BODY });
  tx(s, '10년 밀도 2배 (전성기 18개월마다 2배)', { x: 7.03, y: 4.78, w: 5.42, h: 0.30, fontSize: 20, color: C.MUTED });
  hline(s, 7.03, 12.45, 5.14, C.HAIRLINE, 0.75);
  tx(s, '4F² COP 2026 — 두 번째 축의 첫 발', { x: 7.03, y: 5.26, w: 5.42, h: 0.36, fontSize: 20, bold: true, color: C.NAVY });

  // ── 하단: 키엔스 대비 밴드 + 결론 3타일 ───────────────────────────
  rect(s, 0.67, 5.94, 12.0, 0.32, C.TINT);
  tx(s, runs([
    ['키엔스 OPM 10년 내내 50~56% — 삼성 DS 51.6%는 ', {}],
    ['2018년 최고 호황에서만', { color: C.NEG }],
  ], { fontSize: 20, bold: true, color: C.NAVY }), { x: 0.89, y: 5.94, w: 11.56, h: 0.32, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  [
    '20년 격차 6만 vs 100배',
    '랙 전력 8kW → 210kW',
    '3사 94% → 실질 6사',
  ].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    rect(s, x, 6.32, 3.86, 0.50, C.BLUE12);
    tx(s, t, { x: x + 0.22, y: 6.32, w: 3.42, h: 0.50, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('문제는 전술이 아니라 우리가 서 있는 축이다. 위아래에서 동시에 밀린다 — 삼성 DRAM 점유는 2024년 41%에서 2025년 3분기 32.6%로 내려앉았고, 위쪽에서 HBM 점유가 2023년 40%에서 2025년 상반기 17%로 무너지는 사이 아래쪽에서는 CXMT가 4.9%(2024)에서 8%(2025 3Q)로, 낸드에서는 YMTC가 5%(2023)에서 13%(2025 3Q)로 올라왔다. 가운데가 비어 있는 것이 아니라 가운데만 남았다. 추격의 성격이 중요하다 — CXMT 캐파는 월 3만 장(2020)에서 월 30만 장에 도달해 글로벌 DRAM 캐파의 10~12%이고, 2026년 7월 상장으로 86억 달러를 조달해 2030년 점유 30%를 내걸었으며 DDR5·LPDDR5X는 JEDEC 인증을 받았다. 셀 미세화와 캐파와 원가는 돈과 국가 의지로 살 수 있는 축이다. 반면 로직은 같은 벽(Dennard scaling 종료, 2005년경)을 20년 먼저 만나 네 번 판을 옮겼다 — 멀티코어(2004), FinFET·GAA(2011/2022), 칩렛·2.5D/3D(2019, AMD는 같은 코어 수에서 모놀리식 원가가 2배 이상), 도메인 특화 아키텍처(TPU v1은 동시대 GPU·CPU 대비 와트당 성능 30~80배). 메모리는 같은 20년을 셀 미세화 한 축으로 보냈다 — DRAM은 2007년 이래 6F² 레이아웃을 유지했고 최근 10년 밀도 증가는 2배에 그쳤다(전성기엔 18개월마다 2배). 그 격차가 memory wall이다: 2년당 피크 연산 3.0배 vs DRAM 대역폭 1.6배 → 20년 누적 6만 배 대 100배. 이제 그 벽은 대역폭이 아니라 전력·열로 도착한다 — 랙 전력이 종전 6~8kW에서 최신 솔루션 약 210kW로. 우리가 발을 디딘 두 번째 축이 4F² COP DRAM(ISSCC 2026)이며, 그 위에서 무엇을 할 것인가가 다음 장이다. 다른 축이 있다는 증거는 다른 산업에 있다. 일본 키엔스는 10년 내내 영업이익률이 50~56% 밴드를 벗어난 적이 없고 코로나에도 미중 무역분쟁에도 50% 아래로 내려가지 않았다. 우리 DS부문은 역대 최고 호황이던 2018년에 51.6%였다 — 숫자만 보면 비슷한데 성질이 정반대다. 우리는 사이클이 가장 좋을 때 그 수준에 닿고, 키엔스는 사이클과 무관하게 늘 그 수준에 있다. 원가로 이기는 회사는 사이클을 타고, 제품으로 이기는 회사는 타지 않는다. 그들의 개발 철학이 그 차이를 만든다 — 고객이 원하는 상품을 만들지 않고 고객이 아직 모르는 니즈를 제품화해 업계 최초·세계 최초를 만들며, 그래서 제조원가와 무관한 가격을 매긴다. 원가가 가격을 정하지 않는 구조다.');
}

// ════════════════════════════════════════════════════════════════════════
// S18 — 전략 2번 · 판을 옮긴다 (dram-architecture-proposal.md 요약)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(20, '전략 2번 · 판을 옮긴다',
    [['따라올 수 있는 축에서, ', {}], ['따라오기 어려운 축', { color: C.BLUE }], ['으로', {}]],
    '출처: dram-architecture-proposal.md — DRAM 제품·아키텍처 경쟁력');

  // ── 좌: 해자 = 견적서의 네 줄 ─────────────────────────────────────
  rrect(s, 0.67, 2.12, 4.10, 4.20, { fill: C.TINT });
  tx(s, '해자 — zHBM 견적서 네 줄', { x: 0.89, y: 2.26, w: 3.66, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  ['① 하이브리드 본딩', '② 선단 로직 노드', '③ DRAM 셀 · 스택', '④ 선단 패키징'].forEach((t, i) => {
    tx(s, t, { x: 0.89, y: 2.64 + i * 0.34, w: 3.66, h: 0.32, fontSize: 20, color: C.BODY });
  });
  hline(s, 0.89, 4.55, 4.10, C.HAIRLINE, 0.75);
  tx(s, '넷 다 되는 회사 = 1곳', { x: 0.89, y: 4.22, w: 3.66, h: 0.44, fontSize: 24, bold: true, color: C.NAVY });
  tx(s, '10nm 이하 로직 3사 중', { x: 0.89, y: 4.74, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });
  tx(s, 'DRAM·NAND까지 = 삼성', { x: 0.89, y: 5.06, w: 3.66, h: 0.30, fontSize: 20, color: C.BODY });
  tx(s, '본딩만으론 한 줄', { x: 0.89, y: 5.38, w: 3.66, h: 0.30, fontSize: 20, color: C.MUTED });
  hline(s, 0.89, 4.55, 5.76, C.HAIRLINE, 0.75);
  tx(s, '20년 분업 끝 — 통합이 자격', { x: 0.89, y: 5.86, w: 3.66, h: 0.32, fontSize: 20, bold: true, color: C.BLUE });

  // ── 우: 세 개의 제안 ──────────────────────────────────────────────
  [
    { k: '제안 ① 웨이퍼 본딩은 필연이다', b: '원가가 아니라 시간을 산다 — 셀 · 라인 · 개발. 횡전개는 이미 진행 중: DRAM에 FinFET·HKMG, 낸드에 TSV' },
    { k: '제안 ② zHBM은 주문 생산으로 온다', b: '제품은 다품종으로, 설계는 단일 플랫폼으로 — 받아 적는 주문이 아니라 먼저 제안하는 주문(IP가 곧 전환 비용)' },
    { k: '제안 ③ 어디서 자를 것인가', b: '분할 경계 선택안과 근거를 설계 승인 요건으로 신설' },
  ].forEach((a, i) => {
    const y = 2.12 + i * 1.26;
    rrect(s, 4.97, y, 7.70, 1.16, { fill: C.TINT });
    tx(s, a.k, { x: 5.19, y: y + 0.12, w: 7.26, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, a.b, { x: 5.19, y: y + 0.46, w: 7.26, h: 0.66, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });
  });
  rrect(s, 4.97, 5.86, 7.70, 0.46, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.02 });
  tx(s, '경계 — 원가 목표 불변 · 로우엔드 방어는 전략 1의 N-1', { x: 5.19, y: 5.86, w: 7.26, h: 0.46, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  // ── 하단: 값 3타일 ────────────────────────────────────────────────
  [
    '커스텀 2~3년 → 절반 이하',
    '개발 TAT 90일 · 60일',
    '증원 없음 · 승인 요건 변경',
  ].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    rect(s, x, 6.40, 3.86, 0.42, C.BLUE12);
    tx(s, t, { x: x + 0.22, y: 6.40, w: 3.42, h: 0.42, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('명제 — 중국이 따라올 수 있는 축에서 따라오기 어려운 축으로 판을 옮긴다. 오해를 먼저 막는다: 아키텍처를 바꾸는 일 자체는 그들도 한다. 따라오기 어려운 것은 바꾼 구조를 선단 로직과 메모리와 패키징을 한 견적서 안에서 감당하는 일이다. 해자는 본딩이 아니다 — 하이브리드 본딩 특허는 YMTC 119건 vs 삼성 83건 vs SK하이닉스 11건이고 Knowmade는 회피 불가로 판정했으며, CXMT는 허페이에서 본디드 DRAM 파일럿을 돌린다(DUV 두 장으로 EUV를 우회하는 논리). zHBM 하나를 만들려면 견적서에 네 줄이 필요하고 — 본딩, 선단 로직 노드의 베이스다이·커스텀 인터레이어, DRAM 셀과 스택, 선단 패키징 — 10nm 이하 로직 양산사는 TSMC·삼성·인텔 셋인데 그중 DRAM과 NAND를 함께 만드는 곳은 하나다. CXMT가 막히는 정확한 지점은 로직 파운드리 부재로 HBM 베이스다이를 SMIC에 의존한다는 것이며, HBM4 이후 세대는 베이스다이를 선단 노드에서 만들 것을 요구한다. 정직하게 남길 것: 4F² 페리 웨이퍼를 로직 노드로 만드는지는 공개 확인되지 않았고, 삼성 SF4 베이스다이는 경쟁사 N12 대비 단기 원가가 불리하며, CXMT 경로가 닫혔다는 직접 서술 자료는 없다(저자 추론). 세 제안: ①본딩은 원가가 아니라 시간을 산다(셀 4F²로 다이 +20%, 라인은 열예산에서 페리 해방, 개발은 두 흐름의 캘린더가 합이 아니라 최댓값). ②zHBM은 표준품이 되지 않는다 — 고객마다 인터레이어가 다르므로 코어는 공통으로 얼리고 인터레이어만 IP 블록으로 등록해 열 종의 주문을 하나의 플랫폼과 열 개의 층으로 만든다. 사내 반론("커스텀은 2~3년 걸려 나올 때쯤 커머디티가 앞선다")은 옳고, 그 전제인 개발 기간을 줄이는 것이 제안 ①이다. ③분할 경계 선택안과 근거를 설계 승인 요건에 신설한다. 값: 커스텀 착수→샘플 기간을 2~3년의 절반 이하로, 개발 TAT는 D1d 90일·D0a 60일(사내 확인 수치), 그리고 인력 증원 없이 승인 요건과 문서 양식만 바꾼다. 방향 하나를 뒤집는다 — 주문 생산은 고객이 부르는 대로 받아 적는 일이 아니다. 키엔스의 원칙이 정확히 그 반대로, 고객이 원하는 상품을 만들지 않고 현장에서 캐낸 잠재 니즈를 고객이 요구하기 전에 제품화한다. 우리 조건은 다르다 — 그들은 다수 고객에게서 신호를 모으지만 우리 고객은 소수이므로, 넓게 센싱하는 대신 소수에게 깊이 박히는 쪽이 맞다. 인터레이어에 우리가 먼저 제안한 IP가 들어가면 그것이 곧 전환 비용이 되고, SK하이닉스가 초기 엔비디아와의 밀착 설계로 HBM에서 앞서간 것이 그 자리의 실증이다. 산업 구조로도 이 자리는 희소하다 — 반도체는 20년간 분업으로 갈라져 TSMC는 제조만, 브로드컴·퀄컴은 설계만 하고 키엔스는 공장을 아예 갖지 않는 쪽까지 갔다. 그러나 지금 열리는 판은 설계와 제조가 한 몸이어야 성립한다. 어느 경계에서 자를지 정하는 일은 설계의 문제인 동시에 그 층을 어느 노드에서 찍을지의 문제이고, 두 결정이 다른 회사에 있으면 왕복 한 번에 분기가 간다. 분업이 만든 지형에서 통합을 유지한 것이 부담이었다면, 이 판에서는 그것이 자격이 된다.');
}

// ════════════════════════════════════════════════════════════════════════
// S19 — 제3 저지선 한 장 요약
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(21, '제3 저지선 — 대체 불가성을 만든다',
    [['계약 만기 이후의 갱신을 지키는 ', {}], ['두 개의 전략', { color: C.BLUE }]],
    '출처: ssd-fdp-proposal.md · open-innovation-proposal.md');

  // 저지선 위치 스트립 — 3차 활성
  ['1차 · 계약 — 물량 바닥', '2차 · 제품 — 부가가치', '3차 · 플랫폼 — 대체 불가'].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    const on = i === 2;
    rect(s, x, 2.12, 3.86, 0.44, on ? C.NAVY : C.TINT);
    tx(s, t, { x: x + 0.20, y: 2.12, w: 3.46, h: 0.44, fontSize: 20, bold: true, color: on ? C.INV : C.MUTED, align: 'center', valign: 'middle' });
  });

  // 전략 2카드
  [
    {
      k: '전략 3 · SSD의 CUDA', s: '플랫폼과 사람 — 아키텍처에 박힌다',
      p: '문제 · 통제권은 10년째 한 방향이다',
      a: '문(SCA) · 열쇠(FDP) · 사람(FDE)\n표준 위 계층에서만 차별화된다',
      v: '5년 누적 59억 달러 · 12~179억 범위\n갱신은 재협상되지 않는다',
    },
    {
      k: '전략 4 · 지금만 살 수 있는 것', s: '자리 — 밖에 있는 기술과 미래 고객',
      p: '문제 · 다운턴에 초기 회사는 사라진다',
      a: '저전력 반도체 지분투자 (2~4년)\n퀀텀 · 극저온 분산 옵션 (7~10년)',
      v: '재원 5~10% 상한\n심사 기준을 시계별로 분리',
    },
  ].forEach((c, i) => {
    const x = 0.67 + i * 6.14;
    rrect(s, x, 2.76, 5.86, 3.30, { fill: C.TINT });
    tx(s, c.k, { x: x + 0.24, y: 2.90, w: 5.38, h: 0.34, fontSize: 24, bold: true, color: C.BLUE });
    tx(s, c.s, { x: x + 0.24, y: 3.28, w: 5.38, h: 0.30, fontSize: 20, color: C.MUTED });
    hline(s, x + 0.24, x + 5.62, 3.68, C.HAIRLINE, 0.75);
    tx(s, c.p, { x: x + 0.24, y: 3.78, w: 5.38, h: 0.62, fontSize: 20, color: C.NEG, lineSpacingMultiple: 1.15 });
    tx(s, c.a, { x: x + 0.24, y: 4.46, w: 5.38, h: 0.62, fontSize: 20, bold: true, color: C.NAVY, lineSpacingMultiple: 1.15 });
    tx(s, c.v, { x: x + 0.24, y: 5.16, w: 5.38, h: 0.68, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });
  });

  rect(s, 0.67, 6.20, 12.0, 0.56, C.BLUE12);
  tx(s, '계약은 물량을 지키고 통합은 갱신을 지킨다 — 그리고 자리는 한 번 차면 비지 않는다', { x: 0.89, y: 6.20, w: 11.56, h: 0.56, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  s.addNotes('제3 저지선은 계약이 만기된 뒤의 갱신을 지키는 층이다. 두 전략이 겨냥하는 것이 다르다 — 전략 3은 이미 고객인 곳에서 대체 불가성을 만들고, 전략 4는 아직 고객이 아닌 곳에서 자리를 산다. 전략 3(SSD의 CUDA)의 논리는 하나다: 다운턴에 계약 조건은 재협상되지만 아키텍처에 박힌 통합은 재협상되지 않는다. 우리의 SDK가 깔리고 우리의 프로파일로 워크로드가 튜닝되고 우리의 FDE가 곁에 있는 상태에서 공급자를 바꾸는 일은 가격표의 비교가 아니라 아키텍처의 재공사가 된다. 게다가 소프트웨어의 가치는 역주기적이다 — 불황은 고객이 비용절감 모드로 가는 시간이고 WAF·TCO를 줄여 주는 소프트웨어의 수요는 그때 가장 커진다. 전략 4(지금만 살 수 있는 것)는 시점이 논거다: 다운턴에 열리는 것은 가격의 창이고 지금 열려 있는 것은 자리의 창이다. 초기 단계 회사는 다운턴에 싸지지 않고 사라지며, 엔비디아·구글·MS가 이미 스타트업 투자로 미래 고객을 육성하고 있어 그들이 락인한 회사는 현금을 들고 가도 살 수 없다. 두 전략의 재원 관계도 짚어 둔다 — 전략 1의 내부 효율화가 아낀 개발비와 투자비가 전략 4의 재원이 되고, 전략 4가 확보한 기술과 인재는 전략 1의 횡전개 체계를 타고 제품으로 들어온다.');
}

// ════════════════════════════════════════════════════════════════════════
// S20 — 통제권은 되돌아오지 않는다 (전략 3번의 당위성)
// 데이터: outputs/storyline/ssd-fdp-proposal.md §5.1
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(22, '통제권은 되돌아오지 않는다',
    [['막을 수 없다면, ', {}], ['흐름 위에서 부가가치를 다시 정의한다', { color: C.BLUE }]],
    '출처: ssd-fdp-proposal.md §5.1 — 통제권 이정표 · 구글 이중 트랙');

  // ── 좌: 통제 계층의 10년 상승 (4단계) ────────────────────────────
  [
    { k: '1단계 · ~2016 — 완제품 구매', b: '통제 계층: 없음 (벤더 표준품)', f: C.TINT, tc: C.BODY, kc: C.NAVY },
    { k: '2단계 · 2017~20 — 커스텀 펌웨어', b: 'OCP 스토리지 스펙 — 펌웨어', f: C.BLUE12, tc: C.BODY, kc: C.NAVY },
    { k: '3단계 · 2021~ — 자체 컨트롤러', b: 'AWS Nitro · Google Titanium', f: C.BLUE40, tc: C.NAVY, kc: C.NAVY },
    { k: '4단계 · 2022~26 — 표준 + 웨이퍼', b: 'FDP 비준 ’23 · 웨이퍼 +246%', f: C.NAVY, tc: C.INV_SUB, kc: C.INV },
  ].forEach((l, i) => {
    const y = 2.12 + i * 1.00;
    rect(s, 0.67, y, 5.66, 0.90, l.f);
    tx(s, l.k, { x: 0.89, y: y + 0.12, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: l.kc });
    tx(s, l.b, { x: 0.89, y: y + 0.46, w: 5.22, h: 0.32, fontSize: 20, color: l.tc });
    if (i < 3) arrow(s, 3.50, y + 0.90, 3.50, y + 1.00, { color: C.BLUE70, width: 2 });
  });

  // ── 우 상: 구글 이중 트랙 ─────────────────────────────────────────
  rrect(s, 6.81, 2.12, 5.86, 1.24, { fill: C.TINT });
  tx(s, '구글 — 표준과 캡티브가 한 몸에', { x: 7.03, y: 2.22, w: 5.42, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
  tx(s, '표준 — FDP 공동 설계 (삼성 공동 주도)', { x: 7.03, y: 2.56, w: 5.42, h: 0.32, fontSize: 20, color: C.BODY });
  tx(s, '캡티브 — Titanium SSD · 240만 IOPS', { x: 7.03, y: 2.90, w: 5.42, h: 0.32, fontSize: 20, color: C.BODY });

  // ── 우 하: 네 동인 분해 — 표적은 하나 ─────────────────────────────
  tx(s, '통제권 상승의 네 동인 — 열려 있는 것은 하나', { x: 6.81, y: 3.52, w: 5.86, h: 0.32, fontSize: 20, bold: true, color: C.BLUE });
  [
    { t: '① TCO(WAF·전력·수명) — 표준과 SW', on: false },
    { t: '② 공급 안보 — 계약으로 이미 다룬다', on: false },
    { t: '③ 보안·수직 통합 — 뺏어 올 수 없다', on: false },
    { t: '④ 워크로드 최적화 — 본 전략의 표적', on: true },
  ].forEach((d, i) => {
    const y = 3.92 + i * 0.60;
    rrect(s, 6.81, y, 5.86, 0.52, { fill: d.on ? C.NAVY : C.TINT });
    tx(s, d.t, { x: 7.03, y, w: 5.42, h: 0.52, fontSize: 20, bold: d.on, color: d.on ? C.INV : C.BODY, valign: 'middle' });
  });

  rect(s, 0.67, 6.36, 12.0, 0.46, C.BLUE12);
  tx(s, 'KV Cache — 다운턴 중 태어나는 새 게임 · 실행의 창은 2027년 이전', { x: 0.89, y: 6.36, w: 11.56, h: 0.46, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  s.addNotes('하이퍼스케일러의 스토리지 통제권 상승은 사이클이 아니라 구조이고, 방향은 10년째 한쪽이다. 기업용 SSD는 낸드 사업의 주전장인데 그 수요의 55~65%를 하이퍼스케일러가 소비한다 — 규칙은 그들이 정한다. 이정표로 보면 선명하다: 2017년 이후 OCP 스펙과 고객별 펌웨어로 펌웨어 계층이 넘어갔고, 2021년 말 AWS가 자체 컨트롤러 Nitro SSD로 하드웨어 계층까지 내려갔으며("크라운 주얼은 만들고 스테이플은 산다"), 2023년에는 표준 그 자체를 고객이 설계했다 — NVMe FDP는 메타와 구글이 각자 WAF 문제를 풀다 합류하고 삼성이 함께 완성해 6개월 만에 비준한 표준이다. 삼성은 피해자가 아니라 공동 주도자다. 그리고 지금은 구매 단위가 완제품 아래로 내려간다 — 낸드 웨이퍼 다년 계약가가 2025년 1분기 대비 246% 뛰었는데도 직구매가 계속되는 것은 컨트롤러·펌웨어의 부가가치를 자기 손으로 가져가겠다는 의지의 가격표다. 구글이 이 사슬의 끝을 가장 잘 보여 준다 — FDP의 공동 설계자이면서 동시에 자체 설계 Titanium SSD(랜덤 읽기 240만 IOPS, 이전 세대 대비 접근 지연 −35%)를 C4A부터 배포한다. 이중 트랙이다. 다만 읽어야 할 것은 위협의 크기가 아니라 표준 게임의 크기다 — 타이타늄은 로컬 SSD 라인의 1세대이고, 같은 기간 하이퍼스케일러들은 분기에 80% 뛴 계약가를 감수하며 표준 드라이브를 계속 대량 구매했다. 승부처는 캡티브의 저지가 아니라 표준 플릿 안에서 대체되지 않는 자리다. 동인을 넷으로 쪼개면 대응이 갈린다: TCO는 표준과 소프트웨어로 풀 수 있고, 공급 안보는 계약이 이미 다루며, 보안·수직 통합은 자체 실리콘의 영역이라 뺏어 올 수 없다. 남는 하나 — 워크로드 최적화가 본 전략의 표적이다. 그 표적에서 지금 KV Cache라는 새 게임이 열린다: NVMe 오프로드만으로 H100 한 장의 동시 사용자를 10배로 늘렸다는 실증이 나왔고, 엔비디아는 SSD 상주 KV 캐시를 컨텍스트 메모리 주소 공간에 넣는 CMX를 발표했다(BlueField-4는 2026년 하반기 출하 예고). KV 캐시 블록은 수명·재사용·퇴거 패턴이 명확해 데이터 수명을 태깅하는 FDP와 자연스럽게 맞물린다. 다만 창은 좁다 — 마이크론이 엔비디아 AI SSD 트랙의 첫 레퍼런스를 가져갔고 SK하이닉스 AI-N P는 2026~27년, 키옥시아도 2027년 목표로 1억 IOPS급을 개발 중이다. 삼성이 밖에 있는 것은 아니다: PM1753은 CMX의 첫 공식 공급 SSD로 확정됐고 PM1763은 베라 루빈의 메인 스토리지로 시연됐다. 필요한 것은 진입이 아니라 속도다.');
}

// ════════════════════════════════════════════════════════════════════════
// S21 — 전략 3번 · SSD의 CUDA (ssd-fdp-proposal.md §5.2~§6 요약)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(23, '전략 3번 · SSD의 CUDA',
    [['소프트웨어를 파는 것이 아니라, ', {}], ['소프트웨어로 하드웨어를 지킨다', { color: C.BLUE }]],
    '출처: ssd-fdp-proposal.md §5.3 · §6 — 문 · 열쇠 · 사람');

  // ── 좌: 문 · 열쇠 · 사람 → 환류 ───────────────────────────────────
  [
    { k: '문 · SCA 계약', b: '워크로드 접근이 계약된 권리가 된다' },
    { k: '열쇠 · FDP 플랫폼', b: 'SDK · Profiler · Digital Twin' },
    { k: '사람 · FDE', b: '현장 상주 — 현장이 로드맵을 쓴다' },
    { k: '환류 · 텔레메트리', b: '차기 제품·표준 → SCA 갱신 강화', ring: true },
  ].forEach((a, i) => {
    const y = 2.12 + i * 1.08;
    if (a.ring) rrect(s, 0.67, y, 5.66, 1.00, { fill: C.WHITE, line: { color: C.NAVY, width: 1.25 }, radius: 0.02 });
    else rrect(s, 0.67, y, 5.66, 1.00, { fill: C.TINT });
    tx(s, a.k, { x: 0.89, y: y + 0.10, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, a.b, { x: 0.89, y: y + 0.44, w: 5.22, h: 0.34, fontSize: 20, color: C.BODY });
    if (i < 3) arrow(s, 3.50, y + 1.00, 3.50, y + 1.08, { color: C.BLUE70, width: 2 });
  });

  // ── 우: 수익화 사다리 3단 + 지표 전환 ─────────────────────────────
  tx(s, '수익화 사다리 — 1단이 본질이다', { x: 6.81, y: 2.12, w: 5.86, h: 0.32, fontSize: 20, bold: true, color: C.BLUE });
  [
    { k: '1차 · CUDA 모델', b: 'FDP Enable 무료 — 하드웨어로 회수', on: true },
    { k: '2차 · 계약 프리미엄', b: 'SCA에 묶어 가격 · 물량 우선권으로', on: false },
    { k: '3차 · 성과 연동 과금', b: 'WAF·TCO 입증 후에만 여는 업사이드', on: false },
  ].forEach((m, i) => {
    const y = 2.52 + i * 1.10;
    rrect(s, 6.81, y, 5.86, 1.02, { fill: m.on ? C.NAVY : C.TINT });
    tx(s, m.k, { x: 7.03, y: y + 0.12, w: 5.42, h: 0.30, fontSize: 20, bold: true, color: m.on ? C.INV : C.BLUE });
    tx(s, m.b, { x: 7.03, y: y + 0.46, w: 5.42, h: 0.34, fontSize: 20, color: m.on ? C.INV_SUB : C.BODY });
  });
  rrect(s, 6.81, 5.86, 5.86, 0.50, { fill: C.BLUE12 });
  tx(s, '출하량이 아니라 활성화 용량을 센다', { x: 7.03, y: 5.86, w: 5.42, h: 0.50, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  // ── 하단: 값 2타일 ────────────────────────────────────────────────
  [
    '5년 누적 59억 달러 (12~179억)',
    '하이퍼스케일러 내 28.1% → 31.9%',
  ].forEach((t, i) => {
    const x = 0.67 + i * 6.14;
    rect(s, x, 6.44, 5.86, 0.40, C.BLUE12);
    tx(s, t, { x: x + 0.22, y: 6.44, w: 5.42, h: 0.40, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('길은 셋이었고 둘은 막다른 길이다. 1안(하던 대로, 기성품 집중)은 지금 시황이 지지하는 것처럼 보이지만 — 쇼티지는 사이클이고 통제권 상승은 구조다. 쇼티지가 걷히면 기성품은 다시 스펙 시트와 가격으로 비교당하고 완제품 마진부터 걷혀 나가며, 그때는 심을 시간이 없다. 2안(전면 수용, 풀커스텀)은 고객 수만큼 제품·펌웨어가 갈라져 R&D가 발산하고, 무엇보다 커스텀 소싱·계약의 체질이 우리에게 아직 없다("보상은 컨트랙 베이스로 돼 있어야 하는데 그거 없이 의지로만 갔고 배우면서 했던 상황" — 상품기획 리더). 3안이 답이다 — 표준화된 유연성. 단서가 붙는다: FDP SSD를 파는 것만으로는 차별화가 아니다. 마이크론도 키옥시아도 머천트 컨트롤러 벤더까지 FDP를 지원한다. 보급된 표준은 누구의 것도 아니므로 차별화는 표준 위 계층 — 워크로드를 아는 시스템 소프트웨어와 현장의 엔지니어링 — 에서만 성립한다. 실행은 세 단어다. 문은 SCA — 물량·가격만 있던 계약에 익명화 워크로드 trace, qualification 일정, 공동 로드맵 참여를 약정하고 우리는 SDK와 WAF·수명 개선 목표를 약정한다. 조항 하나로 FDE의 워크로드 접근이 부탁이 아니라 계약된 권리가 된다(NDA·클린룸·trace 익명화 거버넌스도 계약 안에 함께 설계한다). 열쇠는 FDP 플랫폼 — 표준단체 백서는 오버프로비저닝 28% 제거와 용량·수명·쓰기 속도 2배를 제시하지만 그 효과는 저절로 나오지 않는다. 무엇이 뜨겁고 무엇이 함께 지워지는지는 DB·캐시·파일시스템에만 있는 정보이므로 그 사이를 잇는 계층을 우리가 만든다. 오케스트레이션 계층(Dynamo·LMCache·CacheLib)과 경쟁하지 않고 그들이 호출하는 최적의 FDP 백엔드가 된다. 사내 선례도 있다 — SmartSSD는 스캔 중심 DB 쿼리 시간을 절반 이하로, 에너지를 최대 70%, CPU 부담을 최대 97%까지 줄였다. 문제는 그 자산이 무상 번들로 흩어져 사업 구조에 연결되지 않았다는 것이고, 플랫폼은 그것을 한 몸으로 묶는 그릇이다. 사람은 FDE — 팔란티어가 창안하고 앤스로픽·OpenAI가 채택한 전진 배치 엔지니어의 제조업 번역이다. 수익화 사다리는 3단이고 1단이 본질이다: 엔비디아는 CUDA를 팔지 않지만 CUDA 때문에 GPU가 팔린다. 그래서 FDP Enable은 전 제품 기본 탑재·무료다(고객이 설계한 표준을 인질로 잡는 순간 공동 주도자의 신뢰가 무너진다). 2차는 SCA에 묶는 계약 프리미엄 — 하이퍼스케일러는 벤더 소프트웨어를 사지 않지만 계약 조건은 받아들인다. 3차 성과 연동 과금은 실측 입증 후에만 여는 업사이드이며 계획의 전제로 삼지 않는다. 지표도 바꾼다 — FDP 지원 SSD의 출하량이 아니라 고객 시스템에서 실제 활성화된 용량을 센다. 성공의 정의가 "팔았다"에서 "고객 시스템에 박혔다"로 이동한다. 값: 기본 시나리오 5년 누적 59억 달러(방어 39 · 전환 16 · 프리미엄 4), 보수 12억에서 공격 179억 달러의 범위이고 영업이익 환산은 마진 25~35% 가정에서 15~21억 달러다. 실질 침식을 보여 주는 지표는 하이퍼스케일러 조달 물량 내 삼성 완제품 비중으로, 무대응 시 36%→28.1%로 밀리는 것을 전략은 31.9% 선에서 방어한다(일부 캡티브 전환은 비가역이라 완전 복원은 가정하지 않는다). 산정을 가장 크게 흔드는 가정은 방어 격차(기본 30%p → ±15%p면 40~79억)와 캡티브 침투율(2031년 15~35%면 42~77억)이며, 공식 통계가 없으므로 웨이퍼 직구매 계약과 자체 컨트롤러 발표 빈도를 조기경보로 반기마다 재추정한다.');
}

// ════════════════════════════════════════════════════════════════════════
// S22 — 전략 4번 · 지금만 살 수 있는 것 (open-innovation-proposal.md 요약)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(24, '전략 4번 · 지금만 살 수 있는 것',
    [['다운턴에 열리는 것은 가격의 창, ', {}], ['지금 열려 있는 것은 자리의 창', { color: C.BLUE }]],
    '출처: open-innovation-proposal.md — 자원배분 Axis 2');

  // ── 좌: 세 투자 전략은 겨냥하는 것이 다르다 ───────────────────────
  tx(s, '세 투자 전략 — 경쟁하지 않는다', { x: 0.67, y: 2.12, w: 5.66, h: 0.32, fontSize: 20, bold: true, color: C.BLUE });
  [
    { k: '가격을 산다 · D9 다운사이클 M&A', b: '성숙 자산 · 캐파 — EV/EBITDA 5배', c: '→ 다운턴을 기다린다', on: false },
    { k: '기술을 산다 · SE-1 3D DRAM', b: '특정 차세대 기술 — IMEC 공동연구', c: '→ 트리거를 걸지 않는다', on: false },
    { k: '자리를 산다 · 이 전략', b: '초기 지분 · 아직 고객이 아닌 회사', c: '→ 행사 시점은 지금뿐이다', on: true },
  ].forEach((r, i) => {
    const y = 2.54 + i * 1.30;
    rect(s, 0.67, y, 5.66, 1.20, r.on ? C.NAVY : C.TINT);
    tx(s, r.k, { x: 0.89, y: y + 0.10, w: 5.22, h: 0.30, fontSize: 20, bold: true, color: r.on ? C.INV : C.BLUE });
    tx(s, r.b, { x: 0.89, y: y + 0.44, w: 5.22, h: 0.32, fontSize: 20, color: r.on ? C.INV_SUB : C.BODY });
    tx(s, r.c, { x: 0.89, y: y + 0.78, w: 5.22, h: 0.32, fontSize: 20, bold: true, color: r.on ? C.INV : C.NAVY });
  });

  // ── 우: 두 개의 시계 ──────────────────────────────────────────────
  tx(s, '두 개의 시계 — 같은 기준으로 심사하면 뒤가 진다', { x: 6.81, y: 2.12, w: 5.86, h: 0.32, fontSize: 20, bold: true, color: C.BLUE });
  [
    {
      k: '★★★ 저전력 반도체 (엣지 AI)', t: '회수 2~4년 · 즉시 실행',
      b: '지금 팔리는 시장 — LPDDR과 직결',
      c: '지분투자 → 번들링 → 전략적 M&A',
      d: 'Axelera · EnCharge · EdgeCortix',
    },
    {
      k: '★★☆ 퀀텀 생태계 · 극저온 메모리', t: '회수 7~10년 이상 · 장기 옵션',
      b: '아직 시장이 없다 — 자리의 입장료',
      c: '모달리티 분산 소액 + 공동 R&D',
      d: 'Diraq(팹 시너지) · IQM · QuEra',
    },
  ].forEach((g, i) => {
    const y = 2.54 + i * 1.96;
    rrect(s, 6.81, y, 5.86, 1.86, { fill: C.TINT });
    tx(s, g.k, { x: 7.03, y: y + 0.10, w: 5.42, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, g.t, { x: 7.03, y: y + 0.42, w: 5.42, h: 0.30, fontSize: 20, bold: true, color: C.NAVY });
    tx(s, g.b, { x: 7.03, y: y + 0.74, w: 5.42, h: 0.32, fontSize: 20, color: C.BODY });
    tx(s, g.c, { x: 7.03, y: y + 1.08, w: 5.42, h: 0.32, fontSize: 20, color: C.BODY });
    tx(s, g.d, { x: 7.03, y: y + 1.42, w: 5.42, h: 0.32, fontSize: 20, color: C.MUTED });
  });

  // ── 하단: 실행 3원칙 ──────────────────────────────────────────────
  [
    '락인 안 된 곳을 먼저',
    '장기 베팅은 재원 5~10%',
    '심사 기준을 시계별로 분리',
  ].forEach((t, i) => {
    const x = 0.67 + i * 4.07;
    rect(s, x, 6.40, 3.86, 0.42, C.BLUE12);
    tx(s, t, { x: x + 0.16, y: 6.40, w: 3.54, h: 0.42, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });
  });

  s.addNotes('호황은 두 종류의 유휴자원을 만든다 — 회수 기간이 긴 투자에 나설 수 있는 현금, 그리고 조직 개편에 대한 저항이 가장 낮은 국면이다. 같은 개편안이 적자 국면에서는 구조조정으로 읽힌다. 여기서 우리 전략 체계와 부딪히는 것처럼 보이는 지점을 먼저 정리한다: 우리는 이미 다운사이클 M&A 펀드(D9)를 갖고 있고 그 원칙은 EV/EBITDA 5배 이하가 6개월 지속되면 5,000억 원을 행사하는, "싸질 때까지 기다린다"이다. 그런데 이 전략은 가장 비쌀 때 사자고 한다. 모순이 아니라 대상이 다르다. D9가 겨냥하는 것은 가격 기회이고 그 대상(성숙 자산·캐파·기술)은 다운턴에 실제로 싸진다. SE-1(3D DRAM 스타트업 M&A·IMEC 공동연구)이 겨냥하는 것은 특정 기술이고, 기술 획득에는 때가 있어 애초에 다운턴 트리거를 걸지 않았다. 이 전략이 겨냥하는 것은 접근권과 관계다 — 그리고 초기 단계 회사는 다운턴에 싸지지 않는다. 사라진다. 자금 조달이 끊기면 밸류에이션이 내려가는 것이 아니라 회사가 문을 닫는다. 더 결정적인 것은 그 전에 일어나는 일이다: 엔비디아·구글·마이크로소프트가 이미 스타트업 투자로 미래 고객을 직접 육성하고 있고, 그들이 락인한 회사는 우리가 현금을 들고 가도 살 수 없다. 투자 대상은 회수 시계로 갈린다. 저전력 반도체(엣지 AI)는 ★★★ 즉시 실행 — AI가 클라우드에서 엣지로 확산되며 전력 효율 자체가 제품 차별화가 되고, 이 시장은 우리 LPDDR·온디바이스 낸드에 직접 결합된다. 아키텍처가 디지털 NPU와 아날로그 인메모리 컴퓨팅으로 갈라져 있어 한 곳에 몰지 않고 나눠 거는 것이 유효하다(Axelera AI 누적 4.5억 달러 조달·유럽 최대, EnCharge AI 아날로그 인메모리 1억 달러 시리즈 B, Efficient Computer 6,000만 달러 시리즈 A, Blumind 상시 구동 올아날로그, EdgeCortix는 아시아 생태계 접근성이라는 별도의 값). 권장 경로는 지분투자 → 실제 메모리 번들링 파트너십 → 유망한 곳은 전략적 M&A이며, 지분만으로는 관계가 만들어지지 않는다 — 우리 LPDDR과 저들의 가속기가 한 보드 위에서 검증되는 단계까지 가야 투자가 제품이 된다. 퀀텀·극저온은 ★★☆ 장기 베팅으로, 회수를 기대하고 넣는 돈이 아니라 표준이 정해지는 자리에 앉기 위한 입장료다. 관련 벤처 투자액은 2025년 39억 달러로 역대 최고였다. 다만 양자 하드웨어는 초전도·이온트랩·광자·중성원자·실리콘스핀으로 모달리티가 갈리지 않았으므로 분산이 전제다 — 한 곳에 집중하면 옵션이 아니라 베팅이 된다. 우리 자산과 가장 크게 만나는 곳은 실리콘스핀(호주 Diraq — 300mm CMOS 호환으로 우리 팹 시너지 최대)이고, IQM(초전도·13개 고객사 15기)·QuEra(중성원자·96개 검증 논리 큐비트)·PsiQuantum(광자·헤지)·Quantinuum(이온트랩·2026년 나스닥 상장·저위험 앵커)이 모달리티 분산 포지션이다. 극저온 메모리·제어는 성격이 달라 고객 육성이 아니라 기술 커플링이 목적이다(SEEQC 3,000만 달러 이상·가장 성숙, sureCore 극저온용 임베디드 메모리 IP, FrostByte·Rhonexum은 프리시드 소액 옵션). 실행 3원칙: ①락인되지 않은 곳을 먼저 본다 — 대형 플레이어에게 이미 묶인 회사는 지분을 얻어도 의미 있는 관계가 되지 않는다. ②퀀텀·극저온은 전체 오픈이노베이션 재원의 5~10%로 묶는다 — 회수 시계 7~10년짜리를 그 이상으로 키우면 옵션이 아니라 베팅이다. ③심사 기준을 시계별로 분리한다 — 2~4년 회수를 전제로 만든 기준을 7~10년짜리에 적용하면 뒤의 것은 매년 부결된다. 이것이 조직의 문제이며, 인사 기능에 필요한 것은 투자와 파트너십을 다룰 줄 아는 인력을 기르는 일이다. 지분을 사는 일과 그 지분을 제품으로 바꾸는 일은 다른 능력이고 우리에게 부족한 것은 뒤쪽이다. 남겨 두는 것도 적어 둔다 — 후보 기업의 조달액·성숙도는 사내 조사이지 실사가 아니고, 투자 규모의 절대값은 정하지 않았으며(전체 재원이 정해져야 5~10%가 숫자가 된다), 무엇보다 우리가 이 회사들에게 매력적인 투자자인가는 검증되지 않았다. 엔비디아가 주는 것은 돈만이 아니라 생태계이므로, 우리가 대응할 수 있는 것 — 메모리 우선 공급, 파운드리 접근, 공동 검증 환경 — 을 패키지로 정의하는 일이 첫 실행 항목이다.');
}

// ════════════════════════════════════════════════════════════════════════
// S23 — 최종 결론 (다크 — 배경 · 문제 · 답을 한 장으로)
// ════════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.NAVY };
  s.addImage({ path: path.join(ASSETS, 'closing-bg.png'), x: 0, y: 0, w: 13.333, h: 7.5 });

  tx(s, '겨울이 오기 전에', { x: 0.67, y: 0.46, w: 12.0, h: 0.72, fontSize: 40, bold: true, color: C.INV, align: 'center', valign: 'middle' });
  tx(s, '배경에서 문제, 그리고 답까지 — 한 장으로', { x: 0.67, y: 1.22, w: 12.0, h: 0.40, fontSize: 24, color: C.INV_SUB, align: 'center' });

  // 행 프레임 3개 — 배경 · 문제 · 답
  const ROWS = [
    { lbl: '배경', y: 1.86, h: 1.10 },
    { lbl: '문제', y: 3.08, h: 1.42 },
    { lbl: '답', y: 4.62, h: 1.52 },
  ];
  ROWS.forEach((r) => {
    rrect(s, 0.67, r.y, 12.0, r.h, { fill: C.NAVY_RAISED, line: { color: C.BLUE70, width: 1.0 } });
    tx(s, r.lbl, { x: 0.92, y: r.y, w: 1.30, h: r.h, fontSize: 24, bold: true, color: C.BLUE40, align: 'center', valign: 'middle' });
  });

  // 배경
  tx(s, '호황은 환경이 줬다 — 수요는 외생 변수다', { x: 2.30, y: 2.00, w: 10.15, h: 0.36, fontSize: 22, bold: true, color: C.INV });
  tx(s, '다음 다운턴의 창은 2028~29 · 빅테크 FCF가 꺾이는 순간이 변곡', { x: 2.30, y: 2.42, w: 10.15, h: 0.36, fontSize: 20, color: C.INV_SUB });

  // 문제
  tx(s, '1차 저지선(계약)이 지키는 것은 물량뿐이다', { x: 2.30, y: 3.20, w: 10.15, h: 0.36, fontSize: 22, bold: true, color: C.INV });
  ['완제품 부가가치', '만기 이후의 갱신', '기술 전환'].forEach((t, i) => {
    const x = 2.30 + i * 3.42;
    rrect(s, x, 3.66, 3.26, 0.68, { fill: C.NAVY, line: { color: C.BLUE70, width: 1.0 } });
    tx(s, t, { x: x + 0.14, y: 3.66, w: 2.98, h: 0.68, fontSize: 20, bold: true, color: C.INV_SUB, align: 'center', valign: 'middle' });
  });

  // 답
  [
    { g: '2차 · 부가가치', c: ['전략 1 · 전환할 수 있는 몸', '전략 2 · 판을 옮긴다'] },
    { g: '3차 · 대체 불가', c: ['전략 3 · SSD의 CUDA', '전략 4 · 지금만 살 수 있다'] },
  ].forEach((row, i) => {
    const y = 4.74 + i * 0.70;
    tx(s, row.g, { x: 2.30, y, w: 2.30, h: 0.62, fontSize: 20, bold: true, color: C.BLUE40, valign: 'middle' });
    row.c.forEach((t, j) => {
      const x = 4.60 + j * 3.95;
      rrect(s, x, y, 3.80, 0.62, { fill: C.NAVY, line: { color: C.BLUE70, width: 1.0 } });
      tx(s, t, { x: x + 0.16, y, w: 3.48, h: 0.62, fontSize: 20, bold: true, color: C.INV, align: 'center', valign: 'middle' });
    });
  });

  tx(s, runs([
    ['겨울이 왔을 때 ', {}],
    ['대체되지 않는 공급자', { color: C.BLUE40 }],
    ['만이 봄의 규칙을 쓴다', {}],
  ], { fontSize: 28, bold: true, color: C.INV }), { x: 0.67, y: 6.32, w: 12.0, h: 0.56, fontSize: 28, bold: true, color: C.INV, align: 'center', valign: 'middle' });

  tx(s, `25 / ${TOTAL}`, { x: 11.47, y: 7.04, w: 1.2, h: 0.34, fontSize: 20, color: C.INV_MUTED, align: 'right', valign: 'middle' });

  s.addNotes('한 장으로 되짚는다. 배경 — 이 호황은 우리가 만든 것이 아니다. 빅테크의 AI CapEx가 만든 외생 수요이고, 실력의 시험은 가격이 붕괴한 뒤에 온다. 그리고 다운턴을 준비하는 전략은 호황일 때만 심을 수 있다. 다음 다운턴의 유력한 창은 2028~29년이고 경로는 셋이다 — AI 투자수익률의 재평가, 신규 캐파의 동시 도래, 기술 전환. 어느 얼굴이든 정점의 신호는 잉여현금흐름이다: 알파벳의 2026년 FCF는 90% 급감이, 아마존은 마이너스 170억 달러가 전망된다. 문제 — 1차 저지선은 이미 서 있다. take-or-pay와 선수금과 NTE/NTB 가격 난간으로 세운 계약의 벽은 세 다운턴 어디에도 없던 매출 바닥 메커니즘이다. 그러나 계약이 지키는 것은 물량뿐이고, 세 개의 구멍이 남는다: 완제품의 부가가치(웨이퍼 직구매가 계약가 +246%에도 계속된다), 계약 만기 이후의 갱신("필요 없으면 CFO가 오더를 다 캔슬한다 — 2023년 하반기에 경험했다"), 그리고 기술 전환(전환이 방아쇠인 다운턴에는 커버리지 자체가 공동화된다). 답 — 그래서 저지선을 두 겹 더 세운다. 제2 저지선은 부가가치를 지킨다: 전략 1 「전환할 수 있는 몸」이 겨울에 이 설비를 다른 제품으로 돌릴 수 있게 만들고, 전략 2 「판을 옮긴다」가 그때 돌릴 만한 제품을 로드맵에 올려 둔다. 제3 저지선은 대체 불가성을 만든다: 전략 3 「SSD의 CUDA」가 이미 고객인 곳의 아키텍처에 우리를 박아 넣고(계약 조건은 재협상되지만 통합은 재협상되지 않는다), 전략 4 「지금만 살 수 있는 것」이 아직 고객이 아닌 곳에서 자리를 산다. 네 전략은 서로 재원과 결과를 주고받는다 — 전략 1의 내부 효율화가 아낀 개발비가 전략 4의 재원이 되고, 전략 4가 확보한 기술과 인재는 전략 1의 횡전개 체계를 타고 제품으로 들어오며, 전략 2가 만든 커스텀 플랫폼과 전략 3이 만든 현장 접점은 같은 고객의 같은 견적서에서 만난다. 공통 질문은 하나로 모인다. 다운턴이 왔을 때, 그리고 그 한복판에서 새 게임이 태어났을 때, 우리는 대체되지 않는 공급자인가. 겨울이 왔을 때 대체되지 않는 공급자만이 봄의 규칙을 쓴다.');
}

// ════════════════════════════════════════════════════════════════════════
// S24 — 별첨 · DS 전사로 넓히면 (파운드리 접점 포함)
// ════════════════════════════════════════════════════════════════════════
{
  const s = contentSlide(26, '별첨 · DS 전사로 넓히면',
    [['셋 다 사업부 단독 결정 범위를 넘는다 — ', {}], ['옵션으로만 제시한다', { color: C.BLUE }]],
    '출처: mfg-fungibility-proposal.md §4.1 · §3.1 — 전략 1번 별첨');

  const opts = [
    {
      k: '① 파운드리 접점',
      b: 'HBM4 베이스다이가 이미 로직 팹 산출물 · P4 파운드리 구역 → 1c DRAM 전환 실증\n설비 사양 표준 통합까지 — 제품 아키텍처 수준의 통합은 전략 2번의 본론',
    },
    {
      k: '② 이미지센서 (CIS)',
      b: 'DRAM ↔ CIS 공정 약 80% 동일 — 화성 11·13라인에서 실증(장비 그대로 사용)\n단 캐파 약 50% 감소 · 비용 최소 1조 — 공용성은 산출량이 아니라 자본지출을 지킨다',
    },
    {
      k: '③ 감가 완료 설비의 두 번째 수명',
      b: '2차 시장의 본질은 검사·등급화·잔존수명 예측·보증 (장비 확장은 제안 단계)\n전환 불가능한 팹의 처분 경로는 매각뿐이었고, 그것도 원가 아래였다',
    },
  ];
  opts.forEach((o, i) => {
    const y = 2.12 + i * 1.40;
    rrect(s, 0.67, y, 12.0, 1.28, { fill: C.TINT });
    tx(s, o.k, { x: 0.89, y: y + 0.12, w: 11.56, h: 0.30, fontSize: 20, bold: true, color: C.BLUE });
    tx(s, o.b, { x: 0.89, y: y + 0.46, w: 11.56, h: 0.66, fontSize: 20, color: C.BODY, lineSpacingMultiple: 1.15 });
  });
  rect(s, 0.67, 6.36, 12.0, 0.44, C.BLUE12);
  tx(s, '10nm 이하 로직과 메모리를 함께 양산하는 유일한 회사 — 구조적 자산이자 고비용 논쟁의 대상', { x: 0.89, y: 6.36, w: 11.56, h: 0.44, fontSize: 20, bold: true, color: C.NAVY, valign: 'middle' });

  s.addNotes('세 갈래 모두 메모리 사업부 단독 결정 범위를 넘으므로 옵션으로만 제시한다. ① 파운드리 접점 — HBM4 베이스다이가 이미 로직 팹의 산출물이고 평택 P4의 파운드리 예정 구역이 1c DRAM으로 돌려진 이상, 두 사업부의 설비 사양 표준을 한 문서에서 관리하면 전환 가능한 면이 넓어진다. ② 이미지센서 — 화성 11·13라인 DRAM→CIS 전환에서 공정의 약 80%가 동일했고 리소·CVD·식각·테스트 장비를 그대로 썼지만, 스텝 수가 늘어 전환 후 캐파가 절반(월 10만 → 약 5만 장)으로 줄었고 비용은 최소 1조였다. 그래도 신규 라인 신설보다는 훨씬 적었다 — 공용성은 산출량이 아니라 자본지출을 지킨다. ③ 감가 완료 설비의 두 번째 수명 — 2차 시장의 본질이 검사·등급화·잔존수명 예측·보증이라는 위키 판정은 칩과 모듈 대상이고, 장비로의 확장은 아직 제안 단계다. 구조적 자산에 대한 단서: 10nm 이하 로직을 양산할 수 있는 세 회사 중 메모리도 만드는 곳은 삼성뿐이나, 자사 4nm 베이스다이 노선이 경쟁사의 TSMC 12nm 대비 고비용이라는 외부 평가가 있다 — 단기 원가와 장기 구조의 의식적 교환이다.');
}

pres.writeFile({ fileName: OUT }).then(() => console.log('WROTE', OUT));
