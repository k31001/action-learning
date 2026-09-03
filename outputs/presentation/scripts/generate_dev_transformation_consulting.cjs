/**
 * 개발실 전환 전략 (제품·기술 축 FDP) 컨설팅 스타일 덱 8장
 * 스킬: .claude/skills/consulting-deck-design-skill (Pyramid Principle · 액션 타이틀 · 고스트 덱 · 하비볼 매트릭스)
 *       + samsung-memory-ppt-design-skill (Samsung Blue 단일 액센트)
 * 원천: wiki/strategies/fdp-host-ssd-platform.md · wiki/strategies/dev-org-transformation.md
 * 산출: outputs/presentation/dev-transformation-consulting.pptx (+ dashboard/public/downloads 미러)
 * 실행: NODE_PATH=<pptxgenjs 위치> node outputs/presentation/scripts/generate_dev_transformation_consulting.cjs
 */
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const PRES_DIR = path.join(__dirname, "..");
const DL_DIR = path.join(__dirname, "..", "..", "..", "dashboard", "public", "downloads");
const FONT = "Malgun Gothic";
const C = {
  NAVY: "0B1F3A", INK: "1A1A1A", G1: "555555", G2: "8A8A8A", LINE: "D9D9D9",
  ACC: "1428A0", ACC_T: "8FA0DC", BAR: "B9C2D0", BAR2: "D6DCE8", SOFT: "F2F4F8", WHITE: "FFFFFF",
};
const TOTAL = 8;
const TRACK = ["요약", "배경", "배경", "배경", "전략 선택", "전략 구조", "실행", "실행"];

/* ------------------------------------------------ 공통 프레임 */
function frame(s, n, title, opts = {}) {
  s.addText(`FDP Host-SSD 통합 플랫폼 전략  ›  ${TRACK[n - 1]}`, {
    x: 0.5, y: 0.22, w: 9, h: 0.24, fontFace: FONT, fontSize: 9, color: C.G2, margin: 0,
  });
  s.addText(`${n} / ${TOTAL}`, {
    x: 11.33, y: 0.22, w: 1.5, h: 0.24, align: "right", fontFace: FONT, fontSize: 9, color: C.G2, margin: 0,
  });
  s.addText(title, {
    x: 0.5, y: 0.48, w: 12.33, h: 0.78, valign: "top",
    fontFace: FONT, fontSize: 20, bold: true, color: C.NAVY, margin: 0, lineSpacingMultiple: 1.08,
  });
  if (opts.lead) s.addText(opts.lead, {
    x: 0.5, y: 1.26, w: 12.33, h: 0.24, fontFace: FONT, fontSize: 10, color: C.G1, margin: 0,
  });
  s.addShape("line", { x: 0.5, y: 1.54, w: 12.33, h: 0, line: { color: C.NAVY, width: 1 } });
  if (opts.sowhat) {
    s.addShape("rect", { x: 0.5, y: 6.22, w: 12.33, h: 0.5, fill: { color: C.SOFT }, line: { color: C.SOFT, width: 0 } });
    s.addShape("rect", { x: 0.5, y: 6.22, w: 0.07, h: 0.5, fill: { color: C.ACC }, line: { color: C.ACC, width: 0 } });
    s.addText([
      { text: "So what  ", options: { bold: true, color: C.ACC } },
      { text: opts.sowhat, options: { color: C.INK } },
    ], { x: 0.72, y: 6.22, w: 12.0, h: 0.5, valign: "middle", fontFace: FONT, fontSize: 11, margin: 0 });
  }
  s.addShape("line", { x: 0.5, y: 6.86, w: 12.33, h: 0, line: { color: C.LINE, width: 0.75 } });
  s.addText(opts.source || "출처: wiki/strategies/fdp-host-ssd-platform.md", {
    x: 0.5, y: 6.9, w: 8.9, h: 0.36, valign: "top", fontFace: FONT, fontSize: 8.5, color: C.G2, margin: 0, lineSpacingMultiple: 1.1,
  });
  s.addText("삼성전자 메모리사업부 · 개발실 전환 전략 · 2026-09", {
    x: 9.6, y: 6.9, w: 3.23, h: 0.24, align: "right", fontFace: FONT, fontSize: 8.5, color: C.G2, margin: 0,
  });
}
function colHead(s, x, y, w, text) {
  s.addText(text, { x, y, w, h: 0.3, fontFace: FONT, fontSize: 11.5, bold: true, color: C.NAVY, margin: 0, valign: "middle" });
  s.addShape("line", { x, y: y + 0.32, w, h: 0, line: { color: C.LINE, width: 0.75 } });
}
function txt(s, text, x, y, w, h, o = {}) {
  s.addText(text, { x, y, w, h, fontFace: FONT, fontSize: o.size || 10.5, color: o.color || C.INK, bold: !!o.bold,
    align: o.align || "left", valign: o.valign || "top", margin: 0, lineSpacingMultiple: o.ls || 1.15, italic: !!o.italic });
}
function hl(s, x, y, w) { s.addShape("line", { x, y, w, h: 0, line: { color: C.LINE, width: 0.75 } }); }

/* ------------------------------------------------ 1. Executive Summary */
function s1(pres) {
  const s = pres.addSlide();
  frame(s, 1, "요약: 고객의 스토리지 통제권 상승은 불가역이다. 개발실은 FDP 표준 SSD와 시스템 소프트웨어를 묶은 플랫폼으로 부가가치를 재정의하고, 다음 니즈(KV cache)를 선행해야 한다", {
    source: "출처: wiki/strategies/fdp-host-ssd-platform.md §1~§4.6 · dev-org-transformation.md §4.6~4.7. 각 논거의 근거 데이터는 2~7장",
  });
  const blocks = [
    ["상황: 세 흐름이 한 점에서 만난다 (2장)", [
      "메모리 계약이 Spot→LTA→전략적 고객 계약으로 진화, take-or-pay Binding 등장 (이창수 인터뷰)",
      "하이퍼스케일러가 enterprise SSD 수요의 약 55%를 지배, 규격(FDP)도 고객이 설계",
      "통제권은 완제품→펌웨어→자체 컨트롤러(AWS Nitro)→표준·웨이퍼 직구매로 일방향 상승",
    ]],
    ["교훈: 다운턴의 깊이는 고객 구조가, 극복은 니즈 적중이 결정했다 (3~4장)", [
      "2023 낙폭은 서버 노출 순위 그대로: 삼성 -54%, SK그룹 -63%, WDC -45%, Kioxia -35%",
      "회복은 61TB QLC를 12개월 선행한 Solidigm이 가져갔고, 삼성은 용량 리더십 후발",
      "다음 니즈는 KV cache: 2028년 150~200EB 신규 수요, 현행 대비 RUH 25배·내구성 2~10배 갭",
    ]],
    ["답: FDP 표준 + 시스템 SW 플랫폼, 3층 협업으로 확산 (5~8장)", [
      "4개 선택지 중 유일하게 부가가치 방어·펌웨어 공통화·통제권 정합·차별화를 동시 충족",
      "LLM 기업에서 스펙을 잡고, 스토리지 벤더에서 실증하고, 하이퍼스케일러에서 물량을 수확",
      "FDE(Forward Deployed Engineer)가 플랫폼을 들고 고객 아키텍처 안으로 들어간다",
    ]],
  ];
  blocks.forEach(([lead, dashes], i) => {
    const y = 1.72 + i * 1.5;
    s.addShape("ellipse", { x: 0.5, y: y + 0.06, w: 0.14, h: 0.14, fill: { color: C.ACC }, line: { color: C.ACC, width: 0 } });
    txt(s, lead, 0.74, y, 7.9, 0.3, { size: 12, bold: true, color: C.NAVY });
    dashes.forEach((d, j) => txt(s, "–  " + d, 0.9, y + 0.36 + j * 0.34, 7.8, 0.32, { size: 10.5, color: C.INK }));
  });
  // 우측 키넘버 + 결정 박스
  s.addShape("line", { x: 9.05, y: 1.72, w: 0, h: 4.3, line: { color: C.LINE, width: 0.75 } });
  const nums = [["55%", "하이퍼스케일러의 enterprise SSD 수요 점유 (2026)"], ["-54%", "삼성 NAND 매출 낙폭, 2Q22→1Q23"], ["25배", "KV cache 오프로드가 요구하는 RUH 수 대 현행 (200+ vs 2~8)"]];
  nums.forEach(([n, d], i) => {
    const y = 1.72 + i * 0.98;
    txt(s, n, 9.3, y, 3.5, 0.5, { size: 26, bold: true, color: C.ACC });
    txt(s, d, 9.3, y + 0.5, 3.5, 0.44, { size: 9.5, color: C.G1 });
  });
  s.addShape("rect", { x: 9.3, y: 4.72, w: 3.53, h: 1.3, fill: { color: C.SOFT }, line: { color: C.SOFT, width: 0 } });
  s.addText([
    { text: "요청 결정", options: { bold: true, color: C.NAVY, breakLine: true, fontSize: 11 } },
    { text: "① FDP Enablement Platform을 제품 로드맵 항목으로 승인  ② 실리콘밸리 FDE 채용·파견 트랙 신설  ③ Anthropic 공동 설계 제안, VAST·DDN 레퍼런스 착수", options: { color: C.INK, fontSize: 9.5 } },
  ], { x: 9.42, y: 4.78, w: 3.3, h: 1.2, valign: "top", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.15 });
}

/* ------------------------------------------------ 2. 환경 변화 */
function s2(pres) {
  const s = pres.addSlide();
  frame(s, 2, "세 흐름이 한 점에서 만난다: 물량은 Binding으로 잠기고, 규격은 고객이 정하며, 완제품 가치는 고객이 가져가려 한다", {
    lead: "좌: 세 갈래 환경 변화와 교차점 · 우: 고객 스토리지 통제권의 4단계 상승 (2016~2026)",
    sowhat: "대응 전략 없이 교차점에 서면 개발실은 웨이퍼 공급자로 후퇴한다. 단, 삼성은 FDP 표준의 공동 주도자다: 흐름의 피해자가 아니라 설계 참여자 위치에서 출발할 수 있다",
    source: "출처: lee-changsoo-memory-sales-interview-2026-08-03 · captive-ssd-fdp-context-2026-08 (55%, AWS Nitro 2021-12, FDP TP4146 2023 비준, 웨이퍼 계약가 Q1'25 대비 +246%)",
  });
  const flows = [
    ["① 수주산업화", "Spot→LTA→전략적 고객 계약. 5년 계약에 선수금 수십억 달러, 구매 의무 위반 시 캐시 차감: 메모리가 처음으로 take-or-pay를 바인딩 (이창수)", "물량은 잠기지만 완제품 부가가치는 보장되지 않는다"],
    ["② 수요 지배", "하이퍼스케일 클라우드가 글로벌 enterprise SSD 물량의 약 55% 소비. 2026 공급 부족 국면에서 가격 불문 물량 흡수", "소수 고객이 시장 규칙을 정한다"],
    ["③ 통제권 상승", "TCO 통제를 위해 스토리지 스택을 계층별로 내재화. FDP 표준 자체가 고객(Meta·Google)이 설계한 것", "완제품 가치는 고객이 가져가려 한다"],
  ];
  flows.forEach(([h, body, so], i) => {
    const y = 1.72 + i * 1.42;
    txt(s, h, 0.5, y, 1.6, 0.3, { size: 11.5, bold: true, color: C.NAVY });
    txt(s, body, 2.1, y, 3.6, 0.9, { size: 10, color: C.INK });
    txt(s, so, 2.1, y + 0.92, 3.6, 0.3, { size: 10, bold: true, color: C.ACC });
    if (i < 2) hl(s, 0.5, y + 1.3, 5.2);
  });
  // 교차점 박스
  s.addShape("rect", { x: 5.95, y: 2.9, w: 0.5, h: 0, line: { color: C.G2, width: 1 } });
  s.addShape("rect", { x: 6.0, y: 2.3, w: 1.3, h: 1.4, fill: { color: C.SOFT }, line: { color: C.ACC, width: 1 } });
  txt(s, "교차점\n\n물량 잠김\n규격 고객 결정\n가치 이전", 6.05, 2.36, 1.2, 1.3, { size: 9.5, bold: true, color: C.NAVY, align: "center", valign: "middle" });
  // 우측: 통제권 계단
  colHead(s, 7.6, 1.72, 5.23, "고객이 통제하는 계층: 4단계 상승");
  const steps = [
    ["1. 완제품 구매", "~2016", "통제 없음 (벤더 표준품)"],
    ["2. 커스텀 스펙·펌웨어", "2017~20", "OCP 스토리지 스펙, 고객별 펌웨어 브랜치"],
    ["3. 자체 컨트롤러 (Captive)", "2021~", "AWS Nitro SSD (2021-12): crown jewels는 만들고 staples는 산다"],
    ["4. 표준 주도 + 웨이퍼 직구매", "2022~26", "FDP(TP4146) Meta·Google 주도, 삼성과 6개월 만에 비준. NAND 웨이퍼 다년 계약"],
  ];
  steps.forEach(([h, t, d], i) => {
    const y = 2.2 + i * 0.92, x = 7.6 + i * 0.32, w = 5.23 - i * 0.32;
    s.addShape("rect", { x, y, w, h: 0.8, fill: { color: i === 3 ? C.ACC : C.BAR2 }, line: { color: C.WHITE, width: 0.5 } });
    const fc = i === 3 ? C.WHITE : C.NAVY, sc = i === 3 ? "DCE2F5" : C.G1;
    s.addText([
      { text: `${h}   `, options: { bold: true, fontSize: 10.5, color: fc } },
      { text: t, options: { fontSize: 9, color: sc, breakLine: true } },
      { text: d, options: { fontSize: 9, color: i === 3 ? C.WHITE : C.INK } },
    ], { x: x + 0.12, y, w: w - 0.2, h: 0.8, valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12 });
  });
}

/* ------------------------------------------------ 3. 2023 다운턴 */
function s3(pres) {
  const s = pres.addSlide();
  frame(s, 3, "2023 다운턴에서 삼성은 -54%로 서버 노출 순위 그대로 맞았고, 회복은 니즈를 적중한 Solidigm이 가져갔다", {
    lead: "① 낙폭과 원인  ② CapEx 총량 vs AI 인프라 재배분  ③ 대용량 QLC eSSD 출시 경쟁",
    sowhat: "다변화(방어)가 아니라 니즈 적중(공격)이 다운턴을 이긴다. 61TB에서 1년, 245TB에서 첫 출하를 놓친 삼성은 다음 니즈를 선행해야 한다",
    source: "출처: nand-downturn-2023-vendor-data (TrendForce 분기 합성, Micron은 회계분기 차이로 제외) · qlc-essd-timeline-fdp-ruh-2026-09 (Blocks & Files·AnandTech·TechPowerUp·TechRadar, TrendForce '24.07) · 각사 10-K",
  });
  const cx = [0.5, 4.7, 8.89], cw = 3.94;
  // ① 낙폭 + 점유
  colHead(s, cx[0], 1.72, cw, "삼성 -54%: 낙폭 순위 = eSSD 노출 순위");
  const drops = [["삼성", 54, C.ACC], ["SK그룹", 63, C.BAR], ["WDC", 45, C.BAR], ["Kioxia", 35, C.BAR]];
  const b1 = 2.55;
  s.addShape("line", { x: 0.5, y: b1, w: 3.6, h: 0, line: { color: C.G2, width: 0.75 } });
  drops.forEach(([n, p, c], i) => {
    const x = 0.62 + i * 0.9, h = (p / 63) * 1.25;
    txt(s, n, x - 0.15, 2.26, 0.9, 0.24, { size: 9.5, bold: true, align: "center", color: C.INK });
    s.addShape("rect", { x, y: b1, w: 0.6, h, fill: { color: c }, line: { color: c, width: 0 } });
    txt(s, `-${p}%`, x - 0.15, b1 + h + 0.02, 0.9, 0.24, { size: 11, bold: true, align: "center", color: c === C.ACC ? C.ACC : C.G1 });
  });
  txt(s, "NAND 매출 피크(2Q22)→저점(1Q23)", 0.5, 4.1, 3.9, 0.22, { size: 8.5, color: C.G2 });
  txt(s, "원인: enterprise SSD 점유 4Q22", 0.5, 4.4, 3.9, 0.24, { size: 9.5, bold: true, color: C.NAVY });
  [["삼성", 46.9, C.ACC], ["SK그룹", 19.0, C.BAR], ["Kioxia", 13.0, C.BAR]].forEach(([n, p, c], i) => {
    const y = 4.7 + i * 0.32;
    txt(s, n, 0.5, y - 0.02, 0.9, 0.24, { size: 9.5, valign: "middle" });
    s.addShape("rect", { x: 1.4, y, w: (p / 46.9) * 2.0, h: 0.2, fill: { color: c }, line: { color: c, width: 0 } });
    txt(s, `${p}%`, 1.4 + (p / 46.9) * 2.0 + 0.06, y - 0.02, 0.7, 0.24, { size: 9.5, bold: true, valign: "middle", color: c === C.ACC ? C.ACC : C.G1 });
  });
  txt(s, "산업 매출 중 SSD 기여 50%+→20~25% 붕괴(4Q22→1Q23). SK -63%엔 서버 100% Solidigm 포함", 0.5, 5.7, cw, 0.44, { size: 9, color: C.G1 });
  // ② CapEx + AI
  colHead(s, cx[1], 1.72, cw, "총량이 아니라 재배분: AI 서버 가치 23%→65%");
  const capex = [["Amazon", [61.1, 63.6, 52.7]], ["Meta", [19.2, 31.4, 28.1]], ["Alphabet", [24.6, 31.5, 32.3]]];
  const b2 = 3.75, yc = [C.BAR2, C.ACC_T, C.ACC];
  s.addShape("line", { x: cx[1], y: b2, w: 3.6, h: 0, line: { color: C.G2, width: 0.75 } });
  capex.forEach(([n, v], i) => {
    const gx = cx[1] + 0.2 + i * 1.18;
    v.forEach((val, j) => { const h = (val / 64) * 1.35; s.addShape("rect", { x: gx + j * 0.32, y: b2 - h, w: 0.28, h, fill: { color: yc[j] }, line: { color: yc[j], width: 0 } }); });
    txt(s, n, gx - 0.15, b2 + 0.03, 1.26, 0.22, { size: 9, align: "center" });
  });
  txt(s, "하이퍼스케일러 CapEx $B, ’21 ’22 ’23 (각사 10-K). Amazon 창사 최초 -17%, Meta -11%", cx[1], 4.05, cw, 0.4, { size: 8.5, color: C.G2 });
  txt(s, "그중 AI 인프라: AI 서버 시장 가치 $B", cx[1], 4.5, cw, 0.24, { size: 9.5, bold: true, color: C.NAVY });
  [["’23", 50, "~50 · 서버 가치의 23%", false], ["’24", 187, "187 · 65% (TrendForce)", true]].forEach(([yr, v, l, hi], i) => {
    const y = 4.82 + i * 0.36, w = (v / 187) * 2.3;
    txt(s, yr, cx[1], y - 0.02, 0.4, 0.24, { size: 9.5, bold: true, valign: "middle" });
    s.addShape("rect", { x: cx[1] + 0.45, y, w, h: 0.22, fill: { color: hi ? C.ACC : C.ACC_T }, line: { color: hi ? C.ACC : C.ACC_T, width: 0 } });
    txt(s, l, hi ? cx[1] + 0.53 : cx[1] + 0.45 + w + 0.06, y - 0.02, 2.6, 0.24, { size: 9, bold: true, valign: "middle", color: hi ? C.WHITE : C.G1 });
  });
  txt(s, "CapEx가 깎인 ’23에도 AI 서버 가치는 폭증 궤도. 일반 서버·스토리지향 수요만 꺼졌다", cx[1], 5.7, cw, 0.44, { size: 9, color: C.G1 });
  // ③ QLC 타임라인
  colHead(s, cx[2], 1.72, cw, "Solidigm 선행, 245TB 첫 출하는 Micron");
  const tx0 = 9.9, tx1 = 12.6, tx = (t) => tx0 + ((t - 2023) / 4) * (tx1 - tx0);
  const rows = [["Solidigm", 2.45], ["삼성", 3.0], ["Micron", 3.55], ["Kioxia", 4.1]];
  rows.forEach(([n, y]) => {
    txt(s, n, cx[2], y - 0.12, 0.95, 0.24, { size: 9, bold: n === "삼성", color: n === "삼성" ? C.ACC : C.INK, valign: "middle" });
    hl(s, tx0, y, tx1 - tx0);
  });
  [2023, 2024, 2025, 2026].forEach((yr) => txt(s, `’${yr - 2000}`, tx(yr) - 0.2, 4.26, 0.4, 0.2, { size: 8.5, color: C.G2, align: "center" }));
  const pts = [[0, 2023.54, "61T", true, false, "a", "’23.07"], [0, 2024.87, "122T", true, false, "a", null], [0, 2026.7, "245T", false, false, "a", null],
    [1, 2024.5, "61T", true, true, "a", null], [1, 2024.85, "122T", false, true, "b", null],
    [2, 2025.7, "122T", false, false, "a", null], [2, 2026.35, "245T", true, false, "b", "’26.05"], [3, 2025.5, "245T", false, false, "a", null]];
  pts.forEach(([r, t, cap, solid, sam, pos, date]) => {
    const x = tx(t), y = rows[r][1], c = sam ? C.ACC : C.G1;
    s.addShape("ellipse", { x: x - 0.065, y: y - 0.065, w: 0.13, h: 0.13, fill: { color: solid ? c : C.WHITE }, line: { color: c, width: 1.25 } });
    txt(s, cap, x - 0.35, pos === "a" ? y - 0.32 : y + 0.08, 0.7, 0.2, { size: 8, bold: true, color: c, align: "center" });
    if (date) txt(s, date, x - 0.35, pos === "a" ? y + 0.08 : y + 0.26, 0.7, 0.18, { size: 7.5, color: C.G2, align: "center" });
  });
  txt(s, "● 출하   ○ 샘플·전시·예정", cx[2], 4.5, cw, 0.22, { size: 8.5, color: C.G1, align: "center" });
  txt(s, "Solidigm은 최심부(SK그룹)에서 61TB QLC를 ’23.07 출시해 ’24 흑자 전환. 삼성 61TB는 ’24.07, 122TB는 FMS’24 전시 후 미출하. 245TB 첫 상용 출하는 Micron 6600 ION(’26.05)", cx[2], 4.82, cw, 1.3, { size: 9, color: C.G1 });
}

/* ------------------------------------------------ 4. KV cache 갭 */
function s4(pres) {
  const s = pres.addSlide();
  frame(s, 4, "다음 니즈는 KV cache다: 2028년 150~200EB 신규 NAND 수요가 열리지만, 현행 제품은 RUH 25배·내구성 2~10배 갭을 안고 있다", {
    lead: "① 신규 수요 규모  ② FDP 쓰기 스트림(RUH) 갭  ③ 내구성(DWPD) 갭과 실증",
    sowhat: "갭의 해법이 곧 전략이다. ScaleFlux가 200+ FDP 스트림으로 유효 7~10+ DWPD를 달성했듯, 수명별 RUH 분리 + Host SW가 KV cache 시대의 표준 해법이며 삼성은 FDP 공동 주도자로서 이를 플랫폼화할 위치에 있다",
    source: "출처: kv-cache-ssd-demand-2026 (SanDisk FMS 2026 전망, Solidigm·삼성 공개 스펙) · qlc-essd-timeline-fdp-ruh-2026-09 §2 (StorageReview ’26.07.30 · TechTimes ’26.08.01). RUH 요구 200+는 NVIDIA CMX 타깃 ScaleFlux 플랫폼 스펙 기준, NVIDIA 공식 스펙 수치는 미확인",
  });
  const cx = [0.5, 4.7, 8.89], cw = 3.94;
  colHead(s, cx[0], 1.72, cw, "KV cache 단독 NAND 수요 (전망)");
  const b1 = 4.55;
  s.addShape("line", { x: 0.8, y: b1, w: 3.2, h: 0, line: { color: C.G2, width: 0.75 } });
  [["2027", 75, 100], ["2028", 150, 200]].forEach(([yr, lo, hi], i) => {
    const x = 1.25 + i * 1.5, hLo = (lo / 200) * 1.9, hHi = (hi / 200) * 1.9;
    s.addShape("rect", { x, y: b1 - hHi, w: 0.8, h: hHi - hLo, fill: { color: C.ACC_T }, line: { color: C.ACC_T, width: 0 } });
    s.addShape("rect", { x, y: b1 - hLo, w: 0.8, h: hLo, fill: { color: C.ACC }, line: { color: C.ACC, width: 0 } });
    txt(s, `${lo}~${hi}EB`, x - 0.35, b1 - hHi - 0.28, 1.5, 0.26, { size: 10.5, bold: true, color: C.ACC, align: "center" });
    txt(s, yr, x - 0.1, b1 + 0.04, 1.0, 0.24, { size: 10, align: "center" });
  });
  s.addText([
    { text: "35%  ", options: { fontSize: 20, bold: true, color: C.ACC } },
    { text: "2030년 AI DC NAND 워크로드 중 KV cache 비중 (SanDisk). SSD가 GPU HBM→DRAM 아래의 추론 캐시 계층으로 승격 (Dynamo·CMX·LMCache·Mooncake 공식 지원)", options: { fontSize: 9, color: C.G1 } },
  ], { x: cx[0], y: 4.95, w: cw, h: 1.15, valign: "top", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12 });
  // ② RUH
  colHead(s, cx[1], 1.72, cw, "RUH 갭: 현행 2~8 vs 요구 200+");
  const b2 = 4.55, H2 = 1.95;
  s.addShape("line", { x: cx[1], y: b2, w: 3.6, h: 0, line: { color: C.G2, width: 0.75 } });
  s.addShape("rect", { x: 5.3, y: b2 - (8 / 200) * H2, w: 0.85, h: (8 / 200) * H2, fill: { color: C.BAR }, line: { color: C.BAR, width: 0 } });
  txt(s, "2~8", 5.05, b2 - (8 / 200) * H2 - 0.32, 1.35, 0.28, { size: 12.5, bold: true, color: C.G1, align: "center" });
  txt(s, "현행 FDP SSD", 4.95, b2 + 0.05, 1.55, 0.24, { size: 9.5, align: "center" });
  s.addShape("rect", { x: 7.0, y: b2 - H2, w: 0.85, h: H2, fill: { color: C.ACC }, line: { color: C.ACC, width: 0 } });
  txt(s, "200+", 6.75, b2 - H2 - 0.32, 1.35, 0.28, { size: 12.5, bold: true, color: C.ACC, align: "center" });
  txt(s, "CMX 오프로드 요구", 6.65, b2 + 0.05, 1.55, 0.24, { size: 9.5, align: "center" });
  txt(s, "세션·테넌트·공유 프리픽스·수명 등급별로 스트림을 분리해야 hot/cold 혼재로 인한 GC 증폭이 끊긴다. 소수 RUH로는 WAF 문제가 지속된다. RUH(Reclaim Unit Handle): 수명이 같은 데이터를 같은 소거 단위에 모으는 FDP 스트림 핸들", cx[1], 4.95, cw, 1.15, { size: 9, color: C.G1 });
  // ③ DWPD
  colHead(s, cx[2], 1.72, cw, "내구성 갭: 요구 7~10+ vs 현행 0.6~3 DWPD");
  const b3 = 4.55;
  s.addShape("line", { x: cx[2], y: b3, w: 3.6, h: 0, line: { color: C.G2, width: 0.75 } });
  [["고용량 QLC", "0.6", 0.6, 0.6, C.BAR], ["TLC RI", "1", 1, 1, C.BAR], ["TLC MU", "3", 3, 3, C.BAR], ["KV cache 요구", "7~10+", 7, 10, C.ACC]].forEach(([n, l, lo, hi, c], i) => {
    const x = cx[2] + 0.2 + i * 0.9, hLo = (lo / 10) * 2.0, hHi = (hi / 10) * 2.0;
    if (hi > lo) s.addShape("rect", { x, y: b3 - hHi, w: 0.62, h: hHi - hLo, fill: { color: C.ACC_T }, line: { color: C.ACC_T, width: 0 } });
    s.addShape("rect", { x, y: b3 - hLo, w: 0.62, h: hLo, fill: { color: c }, line: { color: c, width: 0 } });
    txt(s, l, x - 0.2, b3 - hHi - 0.28, 1.0, 0.26, { size: 10.5, bold: true, color: c === C.ACC ? C.ACC : C.G1, align: "center" });
    txt(s, n, x - 0.22, b3 + 0.05, 1.06, 0.4, { size: 8.5, align: "center", ls: 1.0 });
  });
  txt(s, "실증: ScaleFlux(NVIDIA CMX 타깃)는 200+ FDP 스트림으로 KV 블록을 수명별 분리, WAF를 낮춰 유효 7~10+ DWPD(5년) 달성 발표. 미디어만으로는 못 메우고 RUH 분리 + 고내구 설계가 답이다", cx[2], 4.95, cw, 1.15, { size: 9, color: C.G1 });
}

/* ------------------------------------------------ 5. 옵션 매트릭스 */
function s5(pres) {
  const s = pres.addSlide();
  frame(s, 5, "네 가지 선택지 중 FDP 표준 + 시스템 SW 통합 플랫폼만이 부가가치 방어·펌웨어 공통화·통제권 정합·차별화 지속을 동시에 충족한다", {
    lead: "평가 기준 4개 × 선택지 4개. ● 충족  ◑ 부분 충족  ○ 미충족",
    sowhat: "통제권 상승이 불가역이라면 부가가치는 고객이 가져간 계층 아래(웨이퍼)가 아니라, 고객이 아직 풀지 못한 계층 위(워크로드↔FDP 정책 변환)에서 만들어야 한다",
    source: "출처: fdp-host-ssd-platform.md §3 · choi-jangseok 인터뷰 2026-07-29 (커스텀 소싱·컨트랙 체질 부재) · fdp-host-ssd-platform-strategy-2026-07-24",
  });
  const cols = [["선택지", 0.5, 2.6], ["(a) 완제품\n부가가치 방어", 3.1, 1.3], ["(b) 펌웨어 공통화\n개발 효율", 4.4, 1.3], ["(c) 고객 통제권\n흐름 정합", 5.7, 1.3], ["(d) 차별화\n지속성", 7.0, 1.3], ["판정 사유", 8.3, 4.53]];
  cols.forEach(([h, x, w]) => txt(s, h, x, 1.72, w, 0.5, { size: 9.5, bold: true, color: C.NAVY, align: x === 0.5 || x === 8.3 ? "left" : "center", valign: "middle", ls: 1.05 }));
  hl(s, 0.5, 2.26, 12.33);
  const opts = [
    ["A. 컴포넌트 후퇴", "NAND·웨이퍼 공급 집중, 완제품은 고객 위임", "○", "●", "●", "○", "물량은 지키나 완제품 부가가치 영구 상실. 커모디티 공급자 고착, Binding이 있어도 마진 열위", false],
    ["B. 풀커스텀 대응", "고객별 커스텀 SSD·펌웨어 전면 개발", "◑", "○", "◑", "◑", "제품·펌웨어 파편화. 커스텀 소싱·컨트랙 체질 부재는 사내 1차 확인 (최장석: 보상 계약 없이 코스트를 다 먹었다)", false],
    ["C. FDP 표준 SSD만 공급", "표준 지원 SSD, 통합은 고객 몫", "○", "●", "●", "○", "통제권 흐름과 정합하나 FDP 지원 여러 공급사 중 하나. 시스템 SW 없이는 도입 장벽도 못 낮추고 차별화도 없어 가격 경쟁 회귀", false],
    ["D. FDP 표준 + 시스템 SW 플랫폼", "표준 SSD(공통 펌웨어) + Host SDK·Profiler·E2E 검증", "●", "●", "●", "●", "유일하게 4개 기준 동시 충족. 공통 펌웨어로 파편화 방지, 고객 통제권을 표준으로 수용, SW·검증 계층에서 차별화, 표준 공동 주도자 지위 활용", true],
  ];
  opts.forEach(([name, desc, a, b, c, d, why, pick], i) => {
    const y = 2.34 + i * 0.94;
    if (pick) s.addShape("rect", { x: 0.5, y: y - 0.04, w: 12.33, h: 0.9, fill: { color: C.SOFT }, line: { color: C.ACC, width: 1 } });
    s.addText([
      { text: name, options: { bold: true, fontSize: 10.5, color: pick ? C.ACC : C.NAVY, breakLine: true } },
      { text: desc, options: { fontSize: 9, color: C.G1 } },
    ], { x: 0.6, y, w: 2.45, h: 0.82, valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12 });
    [a, b, c, d].forEach((g, j) => txt(s, g, 3.1 + j * 1.3, y, 1.3, 0.82, { size: 18, color: g === "●" ? (pick ? C.ACC : C.NAVY) : C.G2, align: "center", valign: "middle" }));
    txt(s, why, 8.3, y, 4.45, 0.82, { size: 9, color: C.INK, valign: "middle" });
    if (i < 3) hl(s, 0.5, y + 0.88, 12.33);
  });
}

/* ------------------------------------------------ 6. 전략 구조 */
function s6(pres) {
  const s = pres.addSlide();
  frame(s, 6, "전략의 핵심은 시스템 소프트웨어다: 워크로드를 FDP 정책으로 변환하는 계층이 펌웨어 공통화와 고객별 최적화를 양립시키고 전환비용을 만든다", {
    lead: "상: 6요소 구조 · 하: 실행전략 6종과 단계",
    sowhat: "Binding으로 수요를 확보하고, FDP로 제품을 표준화하며, 시스템 소프트웨어로 고객 워크로드를 연결한다. 물량 계약을 공동 플랫폼 계약으로 격상하는 것이 이창수 take-or-pay 체제의 다음 단계다",
    source: "출처: fdp-host-ssd-platform.md §4 · fdp-host-ssd-platform-strategy-2026-07-24 (실행전략 원문) · rs3-customer-switching-cost · embedded-software-monetization",
  });
  const el = ["Binding 계약\n장기 물량", "FDP 표준 SSD\n공통 인터페이스", "시스템 SW\n워크로드→정책 변환", "E2E 검증\nTCO 보장", "고객 공동개발\n장기 관계", "현장 텔레메트리\n개선 루프"];
  el.forEach((t, i) => {
    const x = 0.5 + i * 2.08, core = i === 2;
    s.addShape("rect", { x, y: 1.78, w: 1.86, h: 0.78, fill: { color: core ? C.ACC : C.WHITE }, line: { color: core ? C.ACC : C.LINE, width: 1 } });
    txt(s, t, x, 1.78, 1.86, 0.78, { size: 10, bold: true, color: core ? C.WHITE : C.NAVY, align: "center", valign: "middle", ls: 1.1 });
    if (i < 5) txt(s, "›", x + 1.86, 1.78, 0.22, 0.78, { size: 16, color: C.G2, align: "center", valign: "middle" });
  });
  txt(s, "차별화 계층: FDP SSD가 제공하는 RU/RUH를 워크로드에 매핑하는 시스템 SW. 고객이 아직 풀지 못한 계층이며, 전환비용(RS-3)과 SW 수익화의 NAND/SSD 구체화", 0.5, 2.64, 12.33, 0.26, { size: 9.5, color: C.G1 });
  const ex = [
    ["1. Samsung FDP Enablement Platform", "SDK·공통 라이브러리(Linux·io_uring·SPDK), 워크로드 플러그인(RocksDB·CacheLib·Ceph·Vector DB·K8s), Workload Profiler(trace→추천 RUH·예상 WAF), Emulator/Digital Twin"],
    ["2. 표준 워크로드 프로파일 7종", "Cache·KV·Database·Multi-tenant·Vector·Checkpoint·QLC. 새 펌웨어가 아니라 Host 설정 + 검증된 사용법: 펌웨어 공통화와 고객별 최적화 양립"],
    ["3. End-to-End 공동검증", "App→Host→SSD→NAND→텔레메트리. 시스템 성과 지표(WAF·p999/p9999·격리·전력·qualification 기간), 고객 trace의 pre/post-silicon 재사용"],
    ["4. 고객 공동개발 조직", "Host SW·Workload Integration·Solution Engineering·E2E Validation 4기능. 제품 기획·개발 참여 (Co-Design Pod·FDE의 NAND/SSD 구체화)"],
    ["5. Binding 계약에 기술협력 포함", "물량·trace 제공·공동 로드맵 ↔ 공급능력·SDK·개선 목표. 물량 계약을 공동 플랫폼 계약으로 격상"],
    ["6. 오픈소스·차별화 경계", "공개(기본 라이브러리·연동·적합성) / 차별화(NAND·FTL 모델·정책 추천·예측 모델). lock-in 우려 없이 삼성 SSD 선택 시 더 높은 TCO 효과"],
  ];
  ex.forEach(([h, d], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = 0.5 + col * 6.25, y = 3.06 + row * 0.98;
    txt(s, h, x, y, 6.0, 0.24, { size: 10.5, bold: true, color: C.NAVY });
    txt(s, d, x, y + 0.26, 6.0, 0.6, { size: 9, color: C.INK });
    if (row < 2) hl(s, x, y + 0.9, 6.0);
  });
  s.addText([
    { text: "단계  ", options: { bold: true, color: C.ACC } },
    { text: "① 제품·기본 도구  ›  ② 전략 고객 2~3사 공동검증  ›  ③ 상용 플랫폼화(Binding에 SW 지원 포함)  ›  ④ Host Control 확장(QoS·전력·telemetry·multi-tenant)", options: { color: C.INK } },
  ], { x: 0.5, y: 5.96, w: 12.33, h: 0.24, fontFace: FONT, fontSize: 9.5, margin: 0 });
}

/* ------------------------------------------------ 7. 협업 대상 3층 */
function s7(pres) {
  const s = pres.addSlide();
  frame(s, 7, "협업 대상은 양자택일이 아니다: LLM 기업에서 스펙을 잡고, 스토리지 벤더에서 실증하고, 하이퍼스케일러에서 물량을 수확한다", {
    lead: "수요 사슬의 3개 층에 목적을 달리해 동시 진입. 좌: 유형별 비교 · 우: 시퀀싱과 실행전략 3종",
    sowhat: "LLM 기업에서 잡은 스펙이 하이퍼스케일러 협상에서 고객의 고객이 요구하는 스펙이라는 지렛대가 된다. 협상력 비대칭을 우회하고 표준 이식이 커모디티화로 역전되지 않게 하는 차별화 장치다",
    source: "출처: fdp-host-ssd-platform.md §4.5~4.6 · lee-changsoo 인터뷰(고객 3분의 2가 AI 프론티어, 중복 수요) · mad-podcast-sachin-katti(오프테이커 구조) · storage-vendor-deal-structures-2026 · fdp-partner-landscape-2026-09 (Meta 전 SSD FDP 탑재, qualification 12~18개월) · micron-anthropic-sca-2026-06-22",
  });
  const hx = [0.5, 2.0, 4.1, 6.2], hw = [1.45, 2.05, 2.05, 2.05];
  ["평가 축", "하이퍼스케일러", "스토리지 벤더 (VAST·DDN)", "LLM 기업 (Anthropic·OpenAI)"].forEach((h, i) => txt(s, h, hx[i], 1.72, hw[i], 0.3, { size: 10, bold: true, color: C.NAVY, valign: "middle" }));
  hl(s, 0.5, 2.06, 7.75);
  const rows = [
    ["물량·헤지", "본체. eSSD 수요 55%, SCA 성립 유일 규모", "소규모 보조. 네오클라우드 제2 경로(CoreWeave $1.17B)", "직접 구매 작음(오프테이커). 직접 건설 형태 등장 중"],
    ["워크로드 접점", "정보를 잘 안 내줌, 공급부족 지렛대 필요", "중간. KV Cache SW 상용화(DDN ’26.06)", "원천 소유자. KV 수명·재사용·무효화 정책은 추론 스택 설계자만 안다"],
    ["협상력", "삼성이 을. 표준 이식 = 커모디티화 위험", "삼성이 갑. 작고 빠른 저비용 파일럿", "대등. Series F/H strategic infrastructure partner"],
    ["락인 리스크", "통제권 잠식(펌웨어·컨트롤러 내재화, Nitro 전례)", "채널 충돌 관리", "중복 수요 이중 계상(CSP 경유)"],
    ["속도", "느림. qualification 12~18개월, 지금 시작해야 ’27~28 물량", "빠름. 6~12개월 실증", "중간. Micron↔Anthropic 선례 수개월 단위"],
  ];
  rows.forEach((r, i) => {
    const y = 2.12 + i * 0.8;
    r.forEach((c, j) => txt(s, c, hx[j], y, hw[j] - 0.1, 0.72, { size: j === 0 ? 9.5 : 8.5, bold: j === 0, color: j === 0 ? C.NAVY : C.INK, valign: "middle" }));
    if (i < 4) hl(s, 0.5, y + 0.76, 7.75);
  });
  // 우측 시퀀싱
  s.addShape("line", { x: 8.5, y: 1.72, w: 0, h: 4.4, line: { color: C.LINE, width: 0.75 } });
  colHead(s, 8.7, 1.72, 4.13, "3층 역할 분담 (시퀀싱)");
  [["1  LLM 기업 = 스펙 상류 장악", "FDP placement 정책(RUH 매핑·KV 수명 분리)을 워크로드 소유자와 공동 설계. Anthropic 우선: 자본 관계 기존재, Micron 선례가 SSD 공동 설계 명시, FDE 문법이 통함"],
   ["2  스토리지 벤더 = 실증·레퍼런스 공장", "VAST(Dynamo 연동)·DDN(KV Cache SW)과 공동 레퍼런스 아키텍처, DWPD 갭 논지의 상용 무대. FDE 파견 훈련장"],
   ["3  하이퍼스케일러 = 물량·SCA 종착지", "Google 우선(기존 FDP 협업), Meta는 전 구매 SSD에 FDP 탑재·기본 비활성이라 활성화 싸움. 펌웨어·텔레메트리 통제권은 내주지 않는 조건부 심화"]].forEach(([h, d], i) => {
    const y = 2.16 + i * 1.02;
    s.addShape("rect", { x: 8.7, y, w: 0.06, h: 0.9, fill: { color: i === 0 ? C.ACC : C.BAR }, line: { color: i === 0 ? C.ACC : C.BAR, width: 0 } });
    txt(s, h, 8.86, y, 3.97, 0.24, { size: 10, bold: true, color: C.NAVY });
    txt(s, d, 8.86, y + 0.26, 3.97, 0.66, { size: 8.5, color: C.INK });
  });
  s.addText([
    { text: "실행전략 3종  ", options: { bold: true, color: C.ACC } },
    { text: "SCA(전략적 고객 계약)로 다가가고, FDP로 솔루션을 제공하고, FDE로 협업한다. 공급부족 국면의 협상력이 유지되는 지금이 워크로드 교환 협업의 적기", options: { color: C.INK } },
  ], { x: 8.7, y: 5.28, w: 4.13, h: 0.84, valign: "top", fontFace: FONT, fontSize: 9, margin: 0, lineSpacingMultiple: 1.15 });
}

/* ------------------------------------------------ 8. 인재 축 · KPI · Next Steps */
function s8(pres) {
  const s = pres.addSlide();
  frame(s, 8, "실행 요청: FDE 트랙을 신설해 플랫폼을 고객 아키텍처 안으로 들고 들어가고, 성과는 FDP 실제 활성화 용량으로 잰다", {
    lead: "좌: 인재 축(FDE) · 중: KPI · 우: 즉시 착수 항목",
    source: "출처: dev-org-transformation.md §4.6~4.7 · palantir-fde-model-2026-07 (Palantir Delta, Anthropic·OpenAI 채택) · fdp-host-ssd-platform.md §4.5 실행전략 3·§5 KPI · 임금 환경: dev-org-transformation.md §4.6 (성과급·상한 관련 팩트체크 반영)",
  });
  const cx = [0.5, 4.7, 8.89], cw = 3.94;
  colHead(s, cx[0], 1.72, cw, "인재 축: FDE (Forward Deployed Engineer)");
  [["선례", "Palantir가 창안(사내 코드명 Delta), Anthropic·OpenAI가 엔터프라이즈 GTM으로 채택. 고객 인프라에 직접 코드를 쓰고 로드맵에 기여"],
   ["채용", "실리콘밸리 현지 채용 중심(고객 인접·영어). 오픈소스 스토리지 기여자·고객사/스토리지 스타트업 출신 우대. 메모리 업계 보상 상향으로 스타 영입이 가능해진 환경"],
   ["양성", "본사 FW·시스템 SW 엔지니어의 미국 로테이션(6~12개월) + 현지 FDE 멘토 페어링, 명시 요구 vs 실제 요구 검증 훈련"],
   ["운영", "파일럿 고객 1~2사 상주(Co-Design Pod, 홈조직 유지, dual-ladder). 평가는 청구 시간이 아닌 outcome. 커널·SPDK·CacheLib 업스트림 기여 병행"]].forEach(([h, d], i) => {
    const y = 2.16 + i * 0.98;
    txt(s, h, cx[0], y, 0.6, 0.24, { size: 10, bold: true, color: C.ACC });
    txt(s, d, cx[0] + 0.65, y, cw - 0.65, 0.9, { size: 9, color: C.INK });
  });
  colHead(s, cx[1], 1.72, cw, "KPI: 지원 출하가 아니라 실제 활성화");
  s.addShape("rect", { x: cx[1], y: 2.18, w: cw, h: 1.0, fill: { color: C.SOFT }, line: { color: C.ACC, width: 1 } });
  s.addText([
    { text: "핵심 KPI", options: { bold: true, fontSize: 10, color: C.ACC, breakLine: true } },
    { text: "고객 시스템에서 FDP가 실제 활성화된 SSD 용량", options: { bold: true, fontSize: 11.5, color: C.NAVY, breakLine: true } },
    { text: "Meta는 구매 SSD 전량에 FDP가 탑재되어 있으나 기본 비활성: 지원 출하량만 세면 미사용 기능이 된다", options: { fontSize: 8.5, color: C.G1 } },
  ], { x: cx[1] + 0.15, y: 2.22, w: cw - 0.3, h: 0.92, valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12 });
  ["FDP 적용 Binding 물량", "펌웨어 브랜치 감소율 · qualification 기간", "WAF/NAND write 감소율 · usable capacity 증가율", "p999/p9999 개선율", "Captive 계획에서 삼성 완제품으로 전환된 물량", "FDE outcome: FDP 활성화 용량·정책 채택률"].forEach((k, i) => {
    const y = 3.34 + i * 0.44;
    s.addShape("rect", { x: cx[1], y: y + 0.15, w: 0.1, h: 0.1, fill: { color: C.BAR }, line: { color: C.BAR, width: 0 } });
    txt(s, k, cx[1] + 0.22, y, cw - 0.22, 0.4, { size: 9.5, color: C.INK, valign: "middle" });
    if (i < 5) hl(s, cx[1], y + 0.42, cw);
  });
  colHead(s, cx[2], 1.72, cw, "즉시 착수 (Ask)");
  [["1", "FDP Enablement Platform 승인", "SDK·Profiler·Emulator를 제품 로드맵 항목으로 승인, 전략 고객 2~3사 공동검증 후보 확정 (실행전략 1~3)"],
   ["2", "FDE 트랙 신설·파일럿 2사 상주", "실리콘밸리 채용 + 본사 로테이션 착수. 파일럿은 VAST·DDN(빠른 실증)에서 시작해 하이퍼스케일러로 확장"],
   ["3", "Anthropic 공동 설계 제안", "Micron↔Anthropic 4요소(공동 최적화·다년 공급·운영 통합·자본 연계)를 벤치마크한 KV cache SSD 공동 설계 제안. 스펙 상류 확보"],
   ["4", "Google FDP 접점 격상", "기존 FDP 협업을 Binding + 기술협력 패키지로 격상. qualification 12~18개월을 감안해 ’27~28 물량 연결"]].forEach(([n, h, d], i) => {
    const y = 2.16 + i * 0.98;
    s.addShape("ellipse", { x: cx[2], y: y + 0.02, w: 0.3, h: 0.3, fill: { color: C.ACC }, line: { color: C.ACC, width: 0 } });
    txt(s, n, cx[2], y + 0.02, 0.3, 0.3, { size: 11, bold: true, color: C.WHITE, align: "center", valign: "middle" });
    txt(s, h, cx[2] + 0.4, y, cw - 0.4, 0.28, { size: 10, bold: true, color: C.NAVY, valign: "middle" });
    txt(s, d, cx[2] + 0.4, y + 0.3, cw - 0.4, 0.62, { size: 8.5, color: C.INK });
  });
}

/* ------------------------------------------------ main */
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "삼성전자 메모리사업부";
  pres.title = "FDP Host-SSD 통합 플랫폼 전략 (컨설팅 스타일)";
  [s1, s2, s3, s4, s5, s6, s7, s8].forEach((fn) => fn(pres));
  const out = path.join(PRES_DIR, "dev-transformation-consulting.pptx");
  await pres.writeFile({ fileName: out });
  fs.mkdirSync(DL_DIR, { recursive: true });
  fs.copyFileSync(out, path.join(DL_DIR, "dev-transformation-consulting.pptx"));
  console.log("written:", out, "(+ dashboard/public/downloads)");
}
main().catch((e) => { console.error(e); process.exit(1); });
