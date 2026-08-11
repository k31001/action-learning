/**
 * 스토리라인 공통 개요편 10장 덱 생성기 — 「호황은 전략을 심는 계절이다」
 *
 * 소스:  outputs/storyline/common-overview.md (서사·수치)
 * 스펙:  outputs/presentation/assets/storyline-overview/visuals-spec.json (슬라이드 도형 스펙)
 * 출력:  outputs/presentation/storyline-common-overview.pptx
 *
 * 실행:  npm i pptxgenjs 후  node outputs/presentation/scripts/generate_storyline_overview.cjs
 *        (pptxgenjs가 다른 위치에 있으면 NODE_PATH=<node_modules 경로> 지정)
 *
 * 디자인 시스템: Samsung Blue #1428A0 모노크롬 축 + 판정용 레드. 전 텍스트 20pt 이상,
 * 내용 슬라이드는 제목 아래 핵심 메시지 밴드 고정. 16:9 (13.333 x 7.5in), 맑은 고딕.
 */
const fs = require('fs');
const path = require('path');
const PptxGenJS = require('pptxgenjs');

const ROOT = path.join(__dirname, '..', '..', '..');
const ASSETS = path.join(ROOT, 'outputs', 'presentation', 'assets', 'storyline-overview');
const OUT = path.join(ROOT, 'outputs', 'presentation', 'storyline-common-overview.pptx');
const SPEC = process.argv[2] || path.join(ASSETS, 'visuals-spec.json');

// ── 컬러 토큰 (디자인 스펙 §1 · hex는 # 없이) ──────────────────────────────
const C = {
  BLUE: '1428A0', NAVY: '0A1854', NAVY_RAISED: '16276E',
  BLUE_70: '5A68BC', BLUE_40: 'A1A9D9', BLUE_12: 'E3E7F5', TINT: 'F4F6FB',
  TXT: '111111', TXT_BODY: '333333', TXT_MUTED: '767676',
  INV: 'FFFFFF', INV_SUB: 'C9D2F0', INV_MUTED: '8E9AC9',
  WHITE: 'FFFFFF', ROW_ALT: 'FAFAFA', HAIRLINE: 'E5E7EB',
  NEG: 'C00000', NEG_BG: 'FAE7E8', GREY_BAR: 'D1D5DB',
};
const FONT = '맑은 고딕';
const col = (tok) => {
  if (!(tok in C)) throw new Error(`unknown color token: ${tok}`);
  return C[tok];
};

// 공통 지오메트리 (디자인 스펙 §3.0)
const G = {
  TITLE: { x: 0.67, y: 0.36, w: 12.0, h: 0.75 },
  BAND: { x: 0.67, y: 1.26, w: 12.0, h: 0.62 },
  SRC: { x: 0.67, y: 7.04, w: 9.0, h: 0.34 },
  PAGENO: { x: 11.47, y: 7.04, w: 1.2, h: 0.34 },
};

// ── 헬퍼 ────────────────────────────────────────────────────────────────────
const MIN_PT = 20;
function runsToPptx(runs) {
  return runs.map((r) => {
    const size = r.size ?? MIN_PT;
    if (size < MIN_PT) throw new Error(`font below floor (${size}pt): ${r.t}`);
    const o = { fontSize: size, bold: !!r.bold, color: col(r.color || 'TXT_BODY'), fontFace: FONT };
    if (r.spc) o.charSpacing = r.spc;
    if (r.br) o.breakLine = true;
    return { text: r.t, options: o };
  });
}
function text(slide, runs, box, opts = {}) {
  slide.addText(runsToPptx(runs), {
    x: box.x, y: box.y, w: box.w, h: box.h,
    align: opts.align || 'left', valign: opts.valign || 'top',
    margin: 0, lineSpacingMultiple: opts.lineSpacing || 1.15,
    ...(opts.paraSpaceAfter ? { paraSpaceAfter: opts.paraSpaceAfter } : {}),
  });
}
function shape(slide, kind, box, o = {}) {
  const opt = { x: box.x, y: box.y, w: box.w, h: box.h };
  if (o.fill) opt.fill = { color: col(o.fill) };
  else opt.fill = { type: 'none' };
  opt.line = o.border
    ? { color: col(o.border.color), width: o.border.pt || 1.0, ...(o.border.dash === 'dash' ? { dashType: 'dash' } : {}) }
    : { type: 'none' };
  let st = 'rect';
  if (kind === 'roundRect' || kind === 'pill') {
    st = 'roundRect';
    opt.rectRadius = kind === 'pill' ? Math.min(box.h, box.w) / 2 : (o.radius ?? 0.08);
  }
  slide.addShape(st, opt);
}
function lineShape(slide, e) {
  const x = Math.min(e.x, e.x2), y = Math.min(e.y, e.y2);
  const w = Math.abs(e.x2 - e.x), h = Math.abs(e.y2 - e.y);
  slide.addShape('line', {
    x, y, w, h,
    flipH: e.x2 < e.x, flipV: e.y2 < e.y,
    line: {
      color: col(e.color || 'BLUE_40'), width: e.pt || 2.0,
      ...(e.dash === 'dash' ? { dashType: 'dash' } : {}),
      ...(e.arrow === 'end' ? { endArrowType: 'triangle' } : {}),
    },
  });
}

// 시각 스펙 JSON 컴파일러 — kind: rect | roundRect | pill | line | text | table
function compileElements(slide, elements) {
  for (const e of elements) {
    if (e.kind === 'line') { lineShape(slide, e); continue; }
    if (e.kind === 'table') { compileTable(slide, e); continue; }
    if (e.kind === 'text') {
      text(slide, e.runs, e, { align: e.align, valign: e.valign, lineSpacing: e.lineSpacing });
      continue;
    }
    // 도형 (+ 내부 텍스트는 pad만큼 안쪽의 별도 텍스트박스로 — 인셋 단위 모호성 제거)
    shape(slide, e.kind, e, e);
    if (e.runs && e.runs.length) {
      const pad = e.pad ?? 0;
      text(slide, e.runs, { x: e.x + pad, y: e.y + pad, w: e.w - 2 * pad, h: e.h - 2 * pad },
        { align: e.align || 'left', valign: e.valign || 'middle', lineSpacing: e.lineSpacing });
    }
  }
}

// S7 판정 표: 수평 헤어라인만, 헤더 NAVY, 교차 행 fill, 판정 칩 오버레이
function compileTable(slide, e) {
  const headerH = e.headerH ?? 0.62;
  const rowH = e.rowH ?? 0.68;
  const noB = { type: 'none' };
  const hair = { pt: 0.75, color: C.HAIRLINE };
  const header = e.cols.map((c) => ({
    text: c.header,
    options: { fontSize: 20, bold: true, color: C.INV, fill: { color: C.NAVY }, valign: 'middle', fontFace: FONT },
  }));
  const rows = e.rows.map((r, i) => r.map((cell) => ({
    text: cell,
    options: {
      fontSize: 20, color: C.TXT_BODY, fontFace: FONT, valign: 'middle',
      fill: { color: i % 2 === 0 ? C.WHITE : C.ROW_ALT },
      border: [hair, noB, hair, noB],
    },
  })));
  slide.addTable([header, ...rows], {
    x: e.x, y: e.y, w: e.cols.reduce((s, c) => s + c.w, 0),
    colW: e.cols.map((c) => c.w),
    rowH: [headerH, ...e.rows.map(() => rowH)],
    margin: [0.04, 0.08, 0.04, 0.18],
    valign: 'middle',
  });
  // 판정 칩 (◎/✕) — 판정 열 중앙 오버레이
  const chipColX = e.x + e.cols.slice(0, e.chipCol).reduce((s, c) => s + c.w, 0) + e.cols[e.chipCol].w / 2;
  for (const chip of e.chips || []) {
    const cy = e.y + headerH + chip.row * rowH + rowH / 2;
    const pos = { x: chipColX - 0.36, y: cy - 0.21, w: 0.72, h: 0.42 };
    shape(slide, 'pill', pos, { fill: chip.glyph === '◎' ? 'BLUE_12' : 'NEG_BG' });
    text(slide, [{ t: chip.glyph, size: 20, bold: true, color: chip.glyph === '◎' ? 'BLUE' : 'NEG' }],
      pos, { align: 'center', valign: 'middle' });
  }
}

// 내용 슬라이드 공통 크롬: 제목 40pt + 핵심 메시지 밴드 + 풋터
function chrome(slide, no, title, band, source) {
  text(slide, [{ t: title, size: 40, bold: true, color: 'TXT' }], G.TITLE, { lineSpacing: 1.05 });
  shape(slide, 'rect', G.BAND, { fill: 'TINT' });
  text(slide, [{ t: band, size: 24, bold: true, color: 'NAVY' }],
    { x: 0.94, y: G.BAND.y, w: 11.46, h: G.BAND.h }, { valign: 'middle', lineSpacing: 1.1 });
  if (source) text(slide, [{ t: source, size: 20, color: 'TXT_MUTED' }], G.SRC, { valign: 'middle' });
  text(slide, [{ t: `${String(no).padStart(2, '0')} / 10`, size: 20, color: 'TXT_MUTED' }],
    G.PAGENO, { align: 'right', valign: 'middle' });
}

// ── 슬라이드 정의 (제목·밴드·출처·발표자 노트 = storyline-outline.md) ───────
const SLIDES = {
  2: {
    title: '이 보고서의 지도',
    band: '과거를 다시 읽지 않으면, 미래의 준비가 과거의 반복이 된다',
    source: '',
    notes: '순서에는 뜻이 있다 — 과거를 다시 읽지 않으면 미래의 준비가 과거의 반복이 되기 때문이다. 진단(왜 지금인가) → 역사(룰의 세 번의 변화) → 재감사(무엇이 통했나) → 처방(세 개의 저지선) 순으로 논증한다. 1차 저지선은 이미 계약이 세우고 있고, 나머지 두 저지선은 제품 경쟁력의 몫 — 그 구체안이 이어지는 일곱 편이다.\n[전환] 표지의 명제를 4단 논증으로 분해해 전체 여정을 청중과 계약한다. 첫 질문 "이 호황은 누가 만들었나"를 들고 다음 장으로 넘어간다.',
  },
  3: {
    title: '이 호황은 우리가 만든 것이 아니다',
    band: '수요는 외생 변수, 실력의 시험은 가격 붕괴 후에 온다',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [1][2][3][4]',
    notes: '올해 빅테크 네 곳의 AI 인프라 투자는 약 7,000억 달러(+77%)이고 최대 7,250억 달러까지 열려 있으며, OpenAI 컴퓨트 총괄도 업계 투자를 약 7,000억 달러로 셈해 수요자 쪽에서 교차 확인된다[1]. 기업용 SSD 계약가는 한 분기 +80%·재고 사상 최저, 마이크론 분기 매출은 414.6억 달러(+346%)·매출총이익률 84.9% 사상 최고 — 만들면 팔리는 시장이다[2][3]. 그러나 수요는 AI 인프라 건설이라는 외생 변수가 만들었고 3사 공급 규율도 우리 제품력도 부차 요인이다[2]. "이거는 AI가 우리에게 준 선물이지 여러분들이 실력으로 만든 게 아니에요. 그건 팩트야." — 사업부 최고경영진[4].\n[전환] 지도의 첫 질문에 답한다 — 호황은 환경이 만들었다. 환경이 준 것이 거둬질 때를 대비할 시간의 문제가 다음 장으로 넘어간다.',
  },
  4: {
    title: '준비의 창은 호황에만 열린다',
    band: '환경이 준 것은 환경이 거둬간다',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [4][5]',
    notes: '고객이 스스로 선수금을 예치하고 다년 계약에 서명하는 국면은 다운턴이 시작되는 순간 끝난다[5]. 계약만이 아니라 기술이든 관계든 조직이든, 심는 값이 가장 싸고 상대가 문을 열어 주는 계절은 호황뿐이다. 다운턴이 도착한 뒤에 시작하는 준비는 준비가 아니라 대응이고, 대응은 언제나 조건이 가장 나쁠 때의 협상이 된다. "인플렉션 포인트가 오면 뭘 해야 되는데 그때 가서 하면 늦으니까 지금 할 수 있는 걸 지금 하는 거야." — 메모리 영업 리더[4].\n[전환] 앞 장의 진단(환경이 준 선물)에서 시한(닫히는 창)을 도출한다 — 준비는 지금뿐이다. 무엇을 준비할지 고르려면 과거의 세 판을 먼저 읽어야 한다.',
  },
  5: {
    title: '게임의 룰은 세 번 바뀌었다',
    band: '공식은 작동했다, 게임이 바뀌어 있었다',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [1][5][6][7]',
    notes: '1차: DRAM 가격이 2007년 -85%, 이듬해 -58% 무너지는 동안 전원이 버텼고, 누적 손실 30억 달러의 키몬다가 파산(독일 정부 5억 달러 지원 무효)하자 현물가가 급등해 과점 구조가 실증됐다[6]. 2차: PC→모바일 전환에 실기한 엘피다가 부채 4,480억 엔으로 무너져 마이크론의 체급이 됐다 — 퇴출자는 사라지는 게 아니라 인수자의 체급이 된다[6]. 3차: 무감산 선언은 전사 영업이익 0.6조 원(-96%)·DS부문 사상 최대 적자 4.58조 원 뒤인 2023년 4월 철회됐지만, 같은 해 투자 53.1조 원·R&D 28.34조 원은 사상 최대로 유지됐다 — 역사이클 투자 메커니즘은 살아 있다[7]. 범용 게임의 배당(2025~26 사상 최대 실적)과 HBM 실기(40%→17%, 33년 만의 DRAM 1위 상실)가 동시에 일어났다[1][5].\n[전환] 공식은 작동했지만 게임이 바뀌어 있었다. 타임라인 끝의 물음표, 네 번째 게임의 룰을 다음 장이 채운다.',
  },
  6: {
    title: '네 번째 게임의 룰',
    band: '필요한 것은 재복제가 아니라 새 공식',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [8][9]',
    notes: '현물 중심 시장이 3~5년 고정가 장기계약으로 이동했고, 한 글로벌 투자은행은 장기계약이 이 산업의 사이클 변동성을 근본적으로 제거하고 있다고 평가했다[8]. 웨이퍼를 팔 자격은 캐파가 주지만 고부가 제품을 팔 자격은 고객의 인증이 준다 — 마이크론–앤스로픽 계약은 공동 최적화·다년 공급·전사 도입·자본 연계가 한 몸으로 묶인 실례다[9]. 다음 다운턴은 과거와도 지금과도 다른 세상에 도착한다 — 그리고 새 공식의 재료는 과거를 감사한 뒤에야 고를 수 있다.\n[전환] 앞 장 타임라인의 물음표를 채운다 — 네 번째 룰은 예측이 아니라 이미 쓰이고 있는 현재다. 새 공식의 재료를 고르기 위한 과거 재감사로 넘어간다.',
  },
  7: {
    title: '재감사 — 무엇이 통했고 무엇이 부러졌는가',
    band: '◎의 공통분모: 다운턴을 버티는 시간이 아니라 사용하는 시간으로 썼다',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [5][6][7]',
    notes: '재감사가 특히 필요한 까닭은 우리가 과거 다운턴의 승자이기 때문이다 — 승자는 성공 공식을 복제하려는 유인이 가장 강하고, 그 함정은 3차에서 이미 한 번 실현된 관측이다[5]. A1은 이듬해 연결 매출 136.3조·영업이익 10.9조로 이어졌고, A5는 국가가 손실을 흡수하는 경기자를 가격으로 퇴출할 수 없다는 조건 소멸을, A6는 주력의 합리적 자원배분이 새 게임의 실기가 되는 메커니즘을 기록한다[5][6][7]. 역사이클 투자는 여전히 유효하되, 인증이 배분을 정하는 게임에서 인증 없는 캐파는 점유율로 전환되지 않으므로 바닥에서 사야 할 것은 웨이퍼 캐파가 아니라 기술 자산과 인재다[5].\n[전환] 통한 것과 부러진 것을 판정했다. 이 판정이 우리 사례만의 착시가 아닌지, 같은 시기를 다르게 통과한 경쟁사라는 대조군으로 검증한다.',
  },
  8: {
    title: '자연 실험 — 경쟁사는 다르게 통과했다',
    band: '갈린 것은 지출의 양이 아니라 배분의 방향',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [2][3][5][7][10]',
    notes: 'SK하이닉스는 2023년 영업적자 7.7조 원 속에 투자를 10조 원 수준으로 줄이면서도 HBM·엔비디아 공동설계에 집중해 DRAM 1위(36% 대 34%)·HBM 57%, 2025 회계연도 영업이익 47.2조 원(삼성 전사 43.6조 원 초과)을 가져갔다 — A6의 정확한 반례다[5]. 마이크론은 매출 -49%의 수축 속에서 수요를 먼저 잠갔고(SCA 16건·최소 계약 매출 약 1,000억 달러·예치금과 금융 약정 220억 달러), 2026년 초 크루셜 철수로 전 캐파를 고마진 기업용·AI로 돌렸다[2][3]. 낸드는 5강 분산에 YMTC까지 — 2023년 낸드 감산률 50% 유지가 방증하듯 감산 공조도 퇴출 유도도 어려워, 다음 다운턴은 낸드에서 더 깊고 규율 없이 온다[2][5][7]. "거기를 선점 못하면 다음 턴이 오면 점점 (저가) 장사밖에 안 되는 거거든요." — 상품기획 리더[10].\n[전환] 내부 감사를 외부 자연 실험으로 교차 검증해 같은 결론 — 배분의 방향 — 을 얻는다. 그 첫 답으로 이미 올라가고 있는 1차 저지선으로 향한다.',
  },
  9: {
    title: '1차 저지선과 세 개의 구멍',
    band: '계약이 지키는 것은 물량뿐이다',
    source: '출처: 공통 개요편(common-overview.md) 참고자료 [3][4][5][8][11]',
    notes: '"지금은 5년짜리에 선수금을 수십억 달러 단위로 받아서 통장에 넣어. 걔네가 구매 의무를 저버리면 그 개수 × 판가만큼 받은 캐시에서 깐다는 것 — 테이크 오어 페이(take-or-pay)야. 사우디 오일 계약처럼. 메모리가 처음으로 그 개념을 바인딩해." — 메모리 영업 리더[4]. 세 다운턴 어디에도 없던 매출 바닥 메커니즘이고 거래는 스팟→LTA→SCA로 진화 중이다[5][8]. 그러나 구멍도 셋이다 — 낸드 웨이퍼 계약가 급등(2025년 11월 한 달 +60% 초과·1분기 대비 +246%)은 완제품 부가가치의 고객 내재화 신호이고[11], "필요 없으면 CFO가 오더를 다 캔슬해 — 2023년 하반기에 경험한 거예요"[4], 기술 전환이 방아쇠인 다운턴에는 커버리지 자체가 공동화된다(예측)[5].\n[전환] 1차 저지선의 실체를 확인하되 그것이 못 지키는 세 구멍을 발견한다. 구멍이 곧 2·3차 저지선의 존재 이유 — 마지막 장의 직렬 3중 구조로 넘어간다.',
  },
};

const S10 = {
  title: '세 개의 저지선',
  notes: '"1차 방어가 그렇게 되더라도 2차 방어가 이제부터 필요한 거죠. 여러분들이 그 과제를 하는 게 나는 2차 방어라고 생각해. 미래 리스크의 80%는 뭔가 마련을 해야 된다." — 메모리 영업 리더[4]. 세 저지선은 대체재가 아니라 직렬이다 — 앞선 저지선이 못 막은 위협이 다음 저지선의 존재 이유다. 2차 방어의 골격은 제품(램프업 속도와 수율)·투자("투자 셰어 < 빗 셰어 < 프로핏 셰어")·오퍼레이션의 세 축[4]. 일곱 편의 제안 — 낸드·DRAM·SSD·제조·인사·기획·구매 — 이 각자의 자리에서 구체안을 내며, 공통 질문은 하나다: 다운턴이 왔을 때, 그리고 그 한복판에서 새 게임이 태어났을 때, 우리는 대체되지 않는 공급자인가.',
};

const S1_NOTES = '이 보고서는 사상 최대 실적의 예찬이 아니라 다운턴 준비 보고서라는 선언으로 연다. 호황이 끝난 뒤를 대비하는 전략은 호황일 때만 심을 수 있다는 것이 제목의 뜻이다[5]. 일곱 편의 제안(낸드·DRAM·SSD·제조·인사·기획·구매)이 공유하는 공통의 전제를 이 개요편이 놓는다.\n[전환] 표지의 제목이 곧 이 보고서의 명제다 — 왜 호황이 심는 계절인지, 그 증명의 경로를 다음 장의 지도가 계약한다.';

// ── 빌드 ────────────────────────────────────────────────────────────────────
async function main() {
  const spec = JSON.parse(fs.readFileSync(SPEC, 'utf8'));
  const pres = new PptxGenJS();
  pres.defineLayout({ name: 'W', width: 13.333, height: 7.5 });
  pres.layout = 'W';
  pres.author = '삼성전자 메모리사업부 시나리오 플래닝';
  pres.title = '호황은 전략을 심는 계절이다 — 공통 개요편';

  // S1 표지 — 다크 히어로 (오버레이 사전 합성본)
  {
    const s = pres.addSlide();
    s.background = { path: path.join(ASSETS, 'hero-cover-composited.png') };
    text(s, [{ t: 'SAMSUNG ELECTRONICS', size: 20, bold: true, color: 'INV', spc: 2 },
             { t: '  ·  메모리사업부 시나리오 플래닝', size: 20, bold: true, color: 'INV_SUB' }],
      { x: 0.90, y: 0.90, w: 11.5, h: 0.40 });
    text(s, [{ t: '호황은 전략을 심는 계절이다', size: 44, bold: true, color: 'INV' }],
      { x: 0.90, y: 3.95, w: 11.5, h: 0.90 }, { lineSpacing: 1.1 });
    text(s, [{ t: '다음 다운턴을 준비하는 세 개의 저지선 — 공통 개요편', size: 24, color: 'INV_SUB' }],
      { x: 0.90, y: 5.05, w: 11.5, h: 0.50 });
    text(s, [{ t: '7편 제안(낸드 · DRAM · SSD · 제조 · 인사 · 기획 · 구매)의 공통 지도  ·  2026. 8.', size: 20, color: 'INV_MUTED' }],
      { x: 0.90, y: 6.55, w: 11.5, h: 0.40 });
    s.addNotes(S1_NOTES);
  }

  // S2~S9 내용 슬라이드 — 크롬 + 시각 스펙
  for (let no = 2; no <= 9; no++) {
    const s = pres.addSlide();
    const d = SLIDES[no];
    chrome(s, no, d.title, d.band, d.source);
    compileElements(s, (spec.slides[String(no)] || { elements: [] }).elements);
    s.addNotes(d.notes);
  }

  // S10 클로징 — 다크
  {
    const s = pres.addSlide();
    s.background = { color: C.NAVY };
    text(s, [{ t: S10.title, size: 40, bold: true, color: 'INV' }],
      { x: 0.67, y: 0.95, w: 12.0, h: 0.75 }, { align: 'center' });
    compileElements(s, (spec.slides['10'] || { elements: [] }).elements);
    text(s, [{ t: '10 / 10', size: 20, color: 'INV_MUTED' }], G.PAGENO, { align: 'right', valign: 'middle' });
    s.addNotes(S10.notes);
  }

  await pres.writeFile({ fileName: OUT });
  console.log('written:', OUT);
}

main().catch((e) => { console.error(e); process.exit(1); });
