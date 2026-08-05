/**
 * 개발실 체질 전환 전략 — 1장 요약 × 디테일 3단계 (상·중·하)
 * 원천: wiki/strategies/dev-org-transformation.md
 * 스타일: 화이트 배경 · 뉴트럴 그레이 기본 + 블루-그린은 핵심 강조에만
 *         (To-Be 전환 목표 · SCA · DE 스타 플레이어 콜아웃 · 핵심 숫자)
 * 산출:
 *   outputs/presentation/dev-transformation-summary.pptx        (3장 통합)
 *   outputs/presentation/dev-transformation-summary-{high,mid,low}.pptx (1장씩)
 *   dashboard/public/downloads/  ← 위 1장짜리 3종 복사 (대시보드 다운로드용)
 * 실행: NODE_PATH=<pptxgenjs 위치> node outputs/presentation/scripts/generate_dev_transformation_summary.cjs
 *   필요 패키지: pptxgenjs, react, react-dom, react-icons, sharp
 */
const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const {
  FiCpu, FiStar, FiUsers, FiRefreshCw, FiAlertTriangle,
  FiInbox, FiCompass, FiLayers, FiSliders, FiCheckCircle,
  FiLink, FiUnlock, FiTarget,
} = require("react-icons/fi");

const PRES_DIR = path.join(__dirname, "..");
const DL_DIR = path.join(__dirname, "..", "..", "..", "dashboard", "public", "downloads");

const FONT = "Malgun Gothic";
const INK = "17313B";      // 기본 텍스트
const SUB = "5A7184";      // 보조 텍스트·뉴트럴 아이콘
const TEAL = "028090";     // 강조 1: To-Be·SCA·핵심 숫자
const GREEN = "02A878";    // 강조 2: DE 스타 플레이어 콜아웃
const NEUTRAL = "F5F7F8";  // 카드 배경 (뉴트럴)
const TINT_GREEN = "E8F6F0"; // DE 콜아웃 배경
const LINE_GRAY = "DCE4E9";
const RAIL_GRAY = "C4CFD6"; // 타임라인 라인

const TITLE = "개발실 체질 전환 — 수주 이행자에서 기술 파트너로";

async function iconPng(Icon, hex) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color: `#${hex}`, size: 256 })
  );
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function header(slide, chip, opts = {}) {
  const title = opts.title || TITLE;
  const source = opts.source || "wiki/strategies/dev-org-transformation.md";
  const chipW = opts.chipW || 1.35;
  slide.addText(title, {
    x: 0.5, y: 0.26, w: 12.83 - chipW - 0.55, h: 0.62,
    fontFace: FONT, fontSize: 32, bold: true, color: INK, margin: 0,
  });
  slide.addText(chip, {
    shape: "roundRect", rectRadius: 0.1,
    x: 12.83 - chipW, y: 0.34, w: chipW, h: 0.46,
    fill: { color: "EFF3F5" }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 14, bold: true, color: SUB, margin: 0,
  });
  slide.addText("삼성전자 메모리사업부 · 개발실 체질 전환 전략 요약 · 2026-07-24", {
    x: 0.5, y: 7.12, w: 7.6, h: 0.28,
    fontFace: FONT, fontSize: 10, color: SUB, margin: 0,
  });
  slide.addText(`원천: ${source}`, {
    x: 8.3, y: 7.12, w: 4.53, h: 0.28, align: "right",
    fontFace: FONT, fontSize: 10, color: SUB, margin: 0,
  });
}

function card(slide, x, y, w, h, fill = NEUTRAL) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.09, fill: { color: fill } });
}

function numCircle(slide, x, y, n) {
  slide.addText(String(n), {
    shape: "ellipse", x, y, w: 0.36, h: 0.36,
    fill: { color: INK }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 15, bold: true, color: "FFFFFF", margin: 0,
  });
}

function iconCircle(slide, x, y, d, color, iconData) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color } });
  const pad = d * 0.24;
  slide.addImage({ data: iconData, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
}

// DE 스타 플레이어 콜아웃 (블루-그린 강조가 허용된 핵심 요소)
function deCallout(slide, x, y, w, h, ic, main, sub, mainSize, subSize) {
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.08,
    fill: { color: TINT_GREEN }, line: { color: GREEN, width: 1.25 },
  });
  const d = 0.4;
  slide.addImage({ data: ic.starGreen, x: x + 0.2, y: y + h / 2 - d / 2, w: d, h: d });
  slide.addText([
    { text: main, options: { fontSize: mainSize, bold: true, color: INK, breakLine: true } },
    { text: sub, options: { fontSize: subSize, color: SUB } },
  ], {
    x: x + 0.74, y, w: w - 0.94, h, valign: "middle",
    fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12,
  });
}

/* ---------------------------------------------------------------- */
/* 디테일 상 — 타임라인 + As-Is→To-Be + 아이콘 그리드 + DE 배지 + KPI   */
/* ---------------------------------------------------------------- */
function slideHigh(pres, ic) {
  const s = pres.addSlide();
  header(s, "디테일 상");

  s.addText([
    { text: "북극성  ", options: { bold: true, color: TEAL } },
    { text: "“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다” — 신문섭 파트너 (2026-06)", options: { italic: true, color: SUB } },
  ], { x: 0.5, y: 0.88, w: 12.33, h: 0.27, fontFace: FONT, fontSize: 13, margin: 0 });
  s.addText([
    { text: "호명사회  ", options: { bold: true, color: GREEN } },
    { text: "“조직의 이름 뒤에 숨지 않고, 자신의 이름으로 불리며 책임과 결과를 마주한다” — 송길영 『시대예보: 호명사회』", options: { italic: true, color: SUB } },
  ], { x: 0.5, y: 1.15, w: 12.33, h: 0.27, fontFace: FONT, fontSize: 13, margin: 0 });

  const colY = 1.52, colH = 4.5, colW = 3.94;
  const xs = [0.5, 4.7, 8.89];
  const hdrs = ["왜 지금인가", "무엇이 되나", "어떻게 하나"];
  xs.forEach((x, i) => {
    card(s, x, colY, colW, colH);
    numCircle(s, x + 0.2, colY + 0.18, i + 1);
    s.addText(hdrs[i], {
      x: x + 0.66, y: colY + 0.15, w: colW - 0.8, h: 0.42,
      fontFace: FONT, fontSize: 21, bold: true, color: INK, margin: 0,
    });
  });

  // ── 열 1: 사건 수직 타임라인 (뉴트럴)
  const tlX = xs[0] + 0.42;
  s.addShape("line", { x: tlX, y: 2.28, w: 0, h: 2.35, line: { color: RAIL_GRAY, width: 1.5 } });
  const events = [
    ["’25.06", "SK하이닉스 커스텀 HBM\n3사 인증"],
    ["’25.10", "Stargate LOI\n월 90만 장 (DRAM ~40%)"],
    ["’26.06", "Micron–Anthropic\n전략적 고객 계약\n16건 · $100B · $22B"],
  ];
  events.forEach(([d, t], i) => {
    const y = 2.28 + i * 0.94;
    s.addShape("ellipse", { x: tlX - 0.08, y: y - 0.02, w: 0.16, h: 0.16, fill: { color: INK } });
    s.addText(d, {
      x: tlX + 0.18, y: y - 0.12, w: 0.85, h: 0.3,
      fontFace: FONT, fontSize: 14, bold: true, color: INK, margin: 0,
    });
    s.addText(t, {
      x: tlX + 1.0, y: y - 0.13, w: 2.35, h: 0.8,
      fontFace: FONT, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });
  });
  s.addShape("roundRect", { x: xs[0] + 0.2, y: 5.02, w: colW - 0.4, h: 0.78, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: LINE_GRAY, width: 1 } });
  s.addImage({ data: ic.alertInk, x: xs[0] + 0.36, y: 5.24, w: 0.34, h: 0.34 });
  s.addText("정확한 납품만으로는\n전략적 고객 계약 수주 불가", {
    x: xs[0] + 0.82, y: 5.06, w: colW - 1.06, h: 0.7,
    fontFace: FONT, fontSize: 14, bold: true, color: INK, margin: 0, valign: "middle", lineSpacingMultiple: 1.05,
  });

  // ── 열 2: As-Is → To-Be (To-Be만 틸 강조)
  s.addText("As-Is", { x: xs[1] + 0.24, y: 2.14, w: 1.5, h: 0.26, fontFace: FONT, fontSize: 12, bold: true, color: SUB, margin: 0 });
  s.addText("To-Be", { x: xs[1] + 2.06, y: 2.14, w: 1.6, h: 0.26, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, margin: 0 });
  const pairs = [
    ["스펙 수령", "요구 공동 정의"],
    ["RFQ 응답", "선제 제안"],
    ["부품 단품", "시스템 모델"],
    ["QCD", "공동설계 KPI"],
  ];
  pairs.forEach(([a, b], i) => {
    const y = 2.44 + i * 0.63;
    s.addText(a, {
      shape: "roundRect", rectRadius: 0.06, x: xs[1] + 0.24, y, w: 1.5, h: 0.52,
      fill: { color: "FFFFFF" }, line: { color: LINE_GRAY, width: 1 },
      align: "center", valign: "middle", fontFace: FONT, fontSize: 13.5, color: SUB, margin: 0,
    });
    s.addText("→", {
      x: xs[1] + 1.74, y, w: 0.32, h: 0.52, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 16, bold: true, color: TEAL, margin: 0,
    });
    s.addText(b, {
      shape: "roundRect", rectRadius: 0.06, x: xs[1] + 2.06, y, w: 1.64, h: 0.52,
      fill: { color: "FFFFFF" }, line: { color: TEAL, width: 1.25 },
      align: "center", valign: "middle", fontFace: FONT, fontSize: 13.5, bold: true, color: TEAL, margin: 0,
    });
  });
  s.addShape("roundRect", { x: xs[1] + 0.24, y: 5.14, w: colW - 0.48, h: 0.58, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: LINE_GRAY, width: 1 } });
  s.addImage({ data: ic.usersSub, x: xs[1] + 0.4, y: 5.28, w: 0.3, h: 0.3 });
  s.addText("롤모델 Palantir FDE — 고객사 상주", {
    x: xs[1] + 0.8, y: 5.14, w: colW - 1.1, h: 0.58,
    fontFace: FONT, fontSize: 13, bold: true, color: INK, margin: 0, valign: "middle",
  });

  // ── 열 3: 4대 축 그리드(뉴트럴) + Phase 타임라인 + DE 스타 배지(강조)
  const axes = [
    ["기술", "워크로드 랩·모델", ic.cpu],
    ["문화", "모난 놈 → 호명", ic.star],
    ["조직", "FDE 스타·Pod 상주", ic.users],
    ["방식", "교차 리뷰·PoA", ic.refresh],
  ];
  axes.forEach(([t, c, icon], i) => {
    const gx = xs[2] + 0.22 + (i % 2) * 1.82;
    const gy = 2.14 + Math.floor(i / 2) * 1.16;
    iconCircle(s, gx + 0.62, gy, 0.44, SUB, icon);
    s.addText(t, {
      x: gx, y: gy + 0.46, w: 1.68, h: 0.3, align: "center",
      fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: gx - 0.06, y: gy + 0.76, w: 1.8, h: 0.24, align: "center",
      fontFace: FONT, fontSize: 10.5, color: SUB, margin: 0,
    });
  });
  deCallout(s, xs[2] + 0.2, 4.9, colW - 0.4, 0.7, ic,
    "FDE를 스타 플레이어로", "고객과 기술 생태계 공동 설계", 13.5, 11);

  // ── 환경 변화 스트립 — 스타를 영입할 수 있는 임금 수준 (과거 → 현재 → 선순환)
  card(s, 0.5, 6.08, 12.33, 0.9);
  s.addText("환경 변화", {
    x: 0.74, y: 6.24, w: 2.1, h: 0.3,
    fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0,
  });
  s.addText("영입 가능한 임금 수준", {
    x: 0.74, y: 6.56, w: 2.2, h: 0.24,
    fontFace: FONT, fontSize: 10.5, color: SUB, margin: 0,
  });
  const envBoxes = [
    ["과거", "실리콘밸리 보상 열위", 3.0, 2.55, "E7ECEF", SUB, SUB],
    ["현재 — 처우 급등", "성과급 ~6억 · 상한 철폐 · 최대 12.9억 전망", 5.79, 3.6, "FFFFFF", INK, SUB],
    ["선순환 기대", "스타 영입 축적 → 조직 수준 상향", 9.63, 2.95, TINT_GREEN, INK, SUB],
  ];
  envBoxes.forEach(([t, c, x, w, fill, tc, cc], i) => {
    s.addText([
      { text: t, options: { fontSize: 12.5, bold: true, color: tc, breakLine: true } },
      { text: c, options: { fontSize: 10, color: cc } },
    ], {
      shape: "roundRect", rectRadius: 0.06, x, y: 6.2, w, h: 0.66,
      fill: { color: fill },
      line: { color: i === 2 ? GREEN : LINE_GRAY, width: i === 2 ? 1.25 : 1 },
      align: "center", valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.05,
    });
    if (i < 2) s.addText("▶", {
      x: x + w, y: 6.2, w: 0.24, h: 0.66, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
    });
  });
}

/* ---------------------------------------------------------------- */
/* 디테일 중 — 계약 체브런 + 역할 전환 + 4대 축 + DE 콜아웃 + 3-Phase   */
/* ---------------------------------------------------------------- */
function slideMid(pres, ic) {
  const s = pres.addSlide();
  header(s, "디테일 중");

  s.addText("“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다” — 신문섭 (2026-06)", {
    shape: "roundRect", rectRadius: 0.09,
    x: 0.5, y: 0.94, w: 12.33, h: 0.56,
    fill: { color: NEUTRAL }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0,
  });

  const rowY = 1.66, rowH = 2.04, cardW = 5.99;

  // ── 좌: 계약 진화 체브런 (SCA만 틸 강조)
  card(s, 0.5, rowY, cardW, rowH);
  numCircle(s, 0.7, rowY + 0.14, 1);
  s.addText("왜 지금인가 — 계약의 진화", {
    x: 1.16, y: rowY + 0.11, w: 4.6, h: 0.4,
    fontFace: FONT, fontSize: 19, bold: true, color: INK, margin: 0,
  });
  const stages = [
    ["Spot", "현물 거래", "E7ECEF", SUB, 0.74, 1.15],
    ["LTA", "물량·가격 락인", "CBD6DD", INK, 2.15, 1.35],
    ["전략적 고객 계약", "공동설계·자본 연계", TEAL, "FFFFFF", 3.76, 2.5],
  ];
  stages.forEach(([name, cap, fill, txt, x, w], i) => {
    s.addText([
      { text: name, options: { fontSize: 15, bold: true, breakLine: true } },
      { text: cap, options: { fontSize: 10.5 } },
    ], {
      shape: "roundRect", rectRadius: 0.07, x, y: rowY + 0.58, w, h: 0.82,
      fill: { color: fill }, align: "center", valign: "middle",
      fontFace: FONT, color: txt, margin: 0,
    });
    if (i < 2) s.addText("▶", {
      x: x + w, y: rowY + 0.58, w: 0.26, h: 0.82, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 14, color: SUB, margin: 0,
    });
  });
  s.addText("고객이 사는 것: 납품 → 공동 기술 드라이브 (16건 · $100B)", {
    x: 0.78, y: rowY + 1.56, w: cardW - 0.56, h: 0.34,
    fontFace: FONT, fontSize: 12, color: SUB, margin: 0, align: "center", valign: "middle",
  });

  // ── 우: 역할 전환 As-Is → To-Be
  card(s, 6.84, rowY, cardW, rowH);
  numCircle(s, 7.04, rowY + 0.14, 2);
  s.addText("무엇이 되나 — As-Is → To-Be", {
    x: 7.5, y: rowY + 0.11, w: 5.2, h: 0.4,
    fontFace: FONT, fontSize: 19, bold: true, color: INK, margin: 0,
  });
  const pairs = [
    ["스펙 수령", "요구사항 공동 정의"],
    ["RFQ 응답", "선제 제안·기술 드라이브"],
    ["부품 스펙", "시스템 모델 (서버→랙→DC)"],
  ];
  pairs.forEach(([a, b], i) => {
    const y = rowY + 0.56 + i * 0.48;
    s.addText(a, {
      shape: "roundRect", rectRadius: 0.05, x: 7.08, y, w: 1.7, h: 0.38,
      fill: { color: "FFFFFF" }, line: { color: LINE_GRAY, width: 1 },
      align: "center", valign: "middle", fontFace: FONT, fontSize: 12.5, color: SUB, margin: 0,
    });
    s.addText("→", {
      x: 8.82, y, w: 0.3, h: 0.38, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0,
    });
    s.addText(b, {
      shape: "roundRect", rectRadius: 0.05, x: 9.14, y, w: 3.4, h: 0.38,
      fill: { color: "FFFFFF" }, line: { color: TEAL, width: 1.25 },
      align: "center", valign: "middle", fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, margin: 0,
    });
  });

  // ── 4대 축 (뉴트럴 아이콘 행)
  card(s, 0.5, 3.86, 12.33, 1.1);
  numCircle(s, 0.7, 4.0, 3);
  s.addText("어떻게 하나 — 4대 축", {
    x: 1.16, y: 3.97, w: 3.3, h: 0.4,
    fontFace: FONT, fontSize: 19, bold: true, color: INK, margin: 0,
  });
  const axes = [
    ["기술", "워크로드 랩 · 시스템 모델", ic.cpu],
    ["문화", "모난 놈 → 호명 문화", ic.star],
    ["조직", "FDE 스타 · Co-Design Pod", ic.users],
    ["방식", "교차 리뷰 · PoA · AI", ic.refresh],
  ];
  axes.forEach(([t, c, icon], i) => {
    const x = 4.5 + i * 2.1;
    iconCircle(s, x, 4.0, 0.42, SUB, icon);
    s.addText(t, {
      x: x + 0.5, y: 3.96, w: 1.56, h: 0.3,
      fontFace: FONT, fontSize: 14, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: x + 0.5, y: 4.26, w: 1.6, h: 0.56,
      fontFace: FONT, fontSize: 10, color: SUB, margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });
  });

  // ── DE 스타 플레이어 콜아웃 (핵심 강조)
  deCallout(s, 0.5, 5.08, 12.33, 0.74, ic,
    "핵심 — FDE(Forward Deployed Engineer)를 스타 플레이어로, 고객사와 기술 생태계를 함께 만든다",
    "“조직 이름 뒤에 숨지 않고 자기 이름으로 불린다” — 송길영 『호명사회』 · ‘모난 놈이 정 맞는’ 문화 → 호명 문화로 · 관리 분리 + SV 영입",
    14, 11);

  // ── 환경 변화 — 스타를 영입할 수 있는 임금 수준
  card(s, 0.5, 5.96, 12.33, 1.0);
  numCircle(s, 0.7, 6.28, 4);
  s.addText("환경 변화 — 영입 가능한 임금", {
    x: 1.16, y: 6.25, w: 3.3, h: 0.4,
    fontFace: FONT, fontSize: 17, bold: true, color: INK, margin: 0,
  });
  const envBoxes = [
    ["과거", "실리콘밸리 보상 열위", 4.5, 2.3, "E7ECEF", SUB],
    ["현재", "성과급 ~6억 · 상한 철폐", 7.04, 2.9, "FFFFFF", INK],
    ["선순환", "영입 축적 → 조직 수준 상향", 10.18, 2.5, TINT_GREEN, INK],
  ];
  envBoxes.forEach(([t, c, x, w, fill, tc], i) => {
    s.addText([
      { text: t, options: { fontSize: 12.5, bold: true, color: tc, breakLine: true } },
      { text: c, options: { fontSize: 10, color: SUB } },
    ], {
      shape: "roundRect", rectRadius: 0.06, x, y: 6.13, w, h: 0.66,
      fill: { color: fill },
      line: { color: i === 2 ? GREEN : LINE_GRAY, width: i === 2 ? 1.25 : 1 },
      align: "center", valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.05,
    });
    if (i < 2) s.addText("▶", {
      x: x + w, y: 6.13, w: 0.24, h: 0.66, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
    });
  });
}

/* ---------------------------------------------------------------- */
/* 디테일 하 — 인용 + 전환 한 컷 + DE 콜아웃 + 로드맵 + $100B           */
/* ---------------------------------------------------------------- */
function slideLow(pres, ic) {
  const s = pres.addSlide();
  header(s, "디테일 하");

  const quotes = [
    ["“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다”",
     "— 신문섭 파트너, AI 인프라 슈퍼사이클 인터뷰 (2026-06)", 0.5],
    ["“조직의 이름 뒤에 숨지 않고, 자신의 이름으로 불리며 책임과 결과를 마주한다”",
     "— 송길영, 『시대예보: 호명사회』 (2024)", 6.77],
  ];
  quotes.forEach(([q, a, x]) => {
    s.addShape("roundRect", { x, y: 1.02, w: 6.06, h: 0.94, rectRadius: 0.09, fill: { color: NEUTRAL } });
    s.addText(q, {
      x: x + 0.2, y: 1.1, w: 5.66, h: 0.5, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 14.5, italic: true, bold: true, color: INK, margin: 0, lineSpacingMultiple: 1.05,
    });
    s.addText(a, {
      x: x + 0.2, y: 1.63, w: 5.66, h: 0.24, align: "center",
      fontFace: FONT, fontSize: 10.5, color: SUB, margin: 0,
    });
  });

  // ── 전환 한 컷 (To-Be 쪽만 그린 강조)
  const boxY = 2.1, boxH = 1.7;
  s.addShape("roundRect", { x: 2.2, y: boxY, w: 3.5, h: boxH, rectRadius: 0.1, fill: { color: NEUTRAL }, line: { color: LINE_GRAY, width: 1.25 } });
  iconCircle(s, 3.7, boxY + 0.16, 0.5, SUB, ic.inbox);
  s.addText("수주 이행자", {
    x: 2.3, y: boxY + 0.7, w: 3.3, h: 0.38, align: "center",
    fontFace: FONT, fontSize: 21, bold: true, color: SUB, margin: 0,
  });
  s.addText("스펙 수령 · RFQ 응답 · QCD", {
    x: 2.3, y: boxY + 1.14, w: 3.3, h: 0.28, align: "center",
    fontFace: FONT, fontSize: 12.5, color: SUB, margin: 0,
  });

  s.addText("LTA →\n전략적 고객 계약", {
    shape: "rightArrow", x: 5.78, y: boxY + 0.4, w: 1.74, h: 0.9,
    fill: { color: TEAL }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 11, bold: true, color: "FFFFFF", margin: 0, lineSpacingMultiple: 1.05,
  });

  s.addShape("roundRect", { x: 7.6, y: boxY, w: 3.5, h: boxH, rectRadius: 0.1, fill: { color: TINT_GREEN }, line: { color: GREEN, width: 1.5 } });
  iconCircle(s, 9.1, boxY + 0.16, 0.5, GREEN, ic.compass);
  s.addText("기술 파트너", {
    x: 7.7, y: boxY + 0.7, w: 3.3, h: 0.38, align: "center",
    fontFace: FONT, fontSize: 21, bold: true, color: GREEN, margin: 0,
  });
  s.addText("요구 공동 정의 · 선제 제안 · 시스템 모델", {
    x: 7.6, y: boxY + 1.14, w: 3.5, h: 0.28, align: "center",
    fontFace: FONT, fontSize: 12.5, color: INK, margin: 0,
  });

  // ── DE 스타 플레이어 콜아웃 (핵심 강조)
  deCallout(s, 1.6, 4.02, 10.13, 0.8, ic,
    "핵심 전략 — FDE(Forward Deployed Engineer)를 스타 플레이어로, 고객사와 기술 생태계를 함께 만든다",
    "‘모난 놈이 정 맞는’ 기존 문화에서 → 스타를 호명하고 드러내는 문화로",
    14.5, 11.5);

  // ── 환경 변화 — 스타를 영입할 수 있는 임금 수준 (과거 → 현재 → 선순환)
  s.addText("환경도 바뀌었다 — 스타를 영입할 수 있는 임금 수준", {
    x: 0.5, y: 5.22, w: 12.33, h: 0.32, align: "center",
    fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0,
  });
  const envBoxes = [
    ["과거", "실리콘밸리 수준에 못 미친 보상", 0.82, 3.4, "E7ECEF", SUB],
    ["현재", "성과급 ~6억 · 상한 철폐 · 영입 가능 수준", 4.52, 3.7, "FFFFFF", INK],
    ["선순환 기대", "스타 영입 축적 → 조직 전반 수준 상향", 8.52, 4.0, TINT_GREEN, INK],
  ];
  envBoxes.forEach(([t, c, x, w, fill, tc], i) => {
    s.addText([
      { text: t, options: { fontSize: 13.5, bold: true, color: tc, breakLine: true } },
      { text: c, options: { fontSize: 11.5, color: SUB } },
    ], {
      shape: "roundRect", rectRadius: 0.08, x, y: 5.64, w, h: 0.88,
      fill: { color: fill },
      line: { color: i === 2 ? GREEN : LINE_GRAY, width: i === 2 ? 1.5 : 1.25 },
      align: "center", valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.08,
    });
    if (i < 2) s.addText("▶", {
      x: x + w, y: 5.64, w: 0.3, h: 0.88, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 14, color: SUB, margin: 0,
    });
  });
}

/* ---------------------------------------------------------------- */
/* 제품·기술 축 ① — 환경 변화: Captive SSD 위상 변화 (데이터 차트)      */
/* ---------------------------------------------------------------- */
const FDP_TITLE = "제품·기술 축 — FDP Host–SSD 통합 플랫폼";
const FDP_OPTS = { title: FDP_TITLE, source: "wiki/strategies/fdp-host-ssd-platform.md", chipW: 1.6 };

function slideFdpWhy(pres, ic) {
  const s = pres.addSlide();
  header(s, "제품 축 ①", FDP_OPTS);

  // ── 환경 변화 세 갈래
  const flows = [
    ["수주산업화 — Binding", "5년 take-or-pay·선수금 수백억$ — “메모리가 처음으로 바인딩” (이창수 인터뷰)"],
    ["수요 지배", "하이퍼스케일러가 글로벌 enterprise SSD의 ~55% 소비 — 소수 고객이 규칙을 정한다"],
    ["통제권 상승", "고객이 완제품 → 펌웨어 → 컨트롤러 → 표준·웨이퍼로 스토리지를 내재화"],
  ];
  flows.forEach(([t, c], i) => {
    const x = 0.5 + i * 4.2;
    s.addText([
      { text: t, options: { fontSize: 13.5, bold: true, color: INK, breakLine: true } },
      { text: c, options: { fontSize: 10.5, color: SUB } },
    ], {
      shape: "roundRect", rectRadius: 0.08, x, y: 0.96, w: 3.94, h: 1.0,
      fill: { color: NEUTRAL }, align: "center", valign: "middle",
      fontFace: FONT, margin: 0, lineSpacingMultiple: 1.1,
    });
  });

  // ── Captive SSD 위상 변화 — 계단형 차트
  s.addText("Captive SSD 위상 변화 — 고객 통제권의 단계 상승 (불가역)", {
    x: 0.5, y: 2.14, w: 9, h: 0.3,
    fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0,
  });
  const baseY = 5.5, unit = 0.68;
  const steps = [
    ["~2016", "완제품 구매", "C7D3DB", INK],
    ["2017~20", "커스텀 펌웨어", "9DBACB", INK],
    ["2021~", "자체 컨트롤러", "4C7C94", "FFFFFF"],
    ["2022~26", "표준·웨이퍼", TEAL, "FFFFFF"],
  ];
  steps.forEach(([period, stage, fill, tc], i) => {
    const x = 0.7 + i * 1.62;
    const h = unit * (i + 1);
    s.addShape("roundRect", { x, y: baseY - h, w: 1.34, h, rectRadius: 0.05, fill: { color: fill } });
    s.addText(String(i + 1), {
      x, y: baseY - h + 0.04, w: 1.34, h: 0.3, align: "center",
      fontFace: FONT, fontSize: 13, bold: true, color: tc, margin: 0,
    });
    s.addText(stage, {
      x: x - 0.14, y: baseY - h - 0.32, w: 1.62, h: 0.28, align: "center",
      fontFace: FONT, fontSize: 11, bold: true, color: INK, margin: 0,
    });
    s.addText(period, {
      x, y: baseY + 0.06, w: 1.34, h: 0.26, align: "center",
      fontFace: FONT, fontSize: 10.5, color: SUB, margin: 0,
    });
  });
  s.addShape("line", { x: 0.6, y: baseY, w: 6.7, h: 0, line: { color: RAIL_GRAY, width: 1.5 } });

  // ── 단계별 근거 (우측)
  const evid = [
    ["1", "벤더 표준품 조달 — 통제권 없음"],
    ["2", "OCP 스토리지 스펙 · 고객별 펌웨어 브랜치 관행"],
    ["3", "AWS Nitro SSD(’21) — 자체 컨트롤러 자작 SSD"],
    ["4", "FDP 표준 비준(’23) — Meta·Google 주도·삼성 공동 · NAND 웨이퍼 다년 계약"],
  ];
  evid.forEach(([n, t], i) => {
    const y = 2.62 + i * 0.74;
    s.addText(n, {
      shape: "ellipse", x: 7.7, y: y + 0.05, w: 0.3, h: 0.3,
      fill: { color: i === 3 ? TEAL : SUB }, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 11, bold: true, color: "FFFFFF", margin: 0,
    });
    s.addText(t, {
      x: 8.12, y, w: 4.6, h: 0.66,
      fontFace: FONT, fontSize: 11, color: INK, margin: 0, valign: "middle", lineSpacingMultiple: 1.05,
    });
  });

  // ── 정량 포인트 스탯
  const stats = [
    ["~55%", "하이퍼스케일러의 enterprise SSD 수요 비중"],
    ["+246%", "NAND 웨이퍼 가격 (vs Q1’25) — 웨이퍼 직구매 경쟁"],
    ["6개월", "FDP 표준 비준 소요 — 고객(Meta·Google) 주도 속도"],
  ];
  stats.forEach(([v, l], i) => {
    const x = 0.5 + i * 4.2;
    s.addText(v, {
      x, y: 6.06, w: 3.94, h: 0.4, align: "center",
      fontFace: FONT, fontSize: 22, bold: true, color: i === 2 ? TEAL : INK, margin: 0,
    });
    s.addText(l, {
      x, y: 6.48, w: 3.94, h: 0.28, align: "center",
      fontFace: FONT, fontSize: 10.5, color: SUB, margin: 0,
    });
  });
}

/* ---------------------------------------------------------------- */
/* 제품·기술 축 ② — 전략 선택지 4개와 선택 논리                        */
/* ---------------------------------------------------------------- */
function slideFdpOptions(pres, ic) {
  const s = pres.addSlide();
  header(s, "제품 축 ②", FDP_OPTS);

  s.addText("교차점에서 검토한 선택지 4개 — 평가 기준: 부가가치 방어 · 펌웨어 공통화 · 통제권 흐름 정합 · 차별화 지속성", {
    x: 0.5, y: 0.92, w: 12.33, h: 0.3,
    fontFace: FONT, fontSize: 13, color: SUB, margin: 0,
  });

  const options = [
    ["A", "컴포넌트 후퇴", "NAND·웨이퍼 공급에 집중, 완제품은 고객에 위임",
      "물량은 지키나 완제품 부가가치 영구 상실 — 커머디티 공급자 고착", false],
    ["B", "풀커스텀 대응", "고객별 커스텀 SSD·펌웨어 전면 개발",
      "제품·펌웨어 파편화 — “커스텀 소싱·컨트랙은 파운드리 모델, 우리가 안 해본 것” (최장석)", false],
    ["C", "FDP 표준 SSD만 공급", "표준 지원 하드웨어만 제공, 통합은 고객 몫",
      "“FDP 지원 여러 공급사 중 하나” — 차별화 없이 가격 경쟁 회귀", false],
    ["D", "FDP 표준 + 시스템 SW 플랫폼", "공통 펌웨어 + Host SDK·Profiler·E2E 검증 제공",
      "유일하게 4개 기준 동시 충족 — 통제권 흐름 위에서 부가가치 재정의", true],
  ];
  options.forEach(([id, name, desc, reason, chosen], i) => {
    const x = 0.5 + (i % 2) * 6.27;
    const y = 1.36 + Math.floor(i / 2) * 2.28;
    s.addShape("roundRect", {
      x, y, w: 6.06, h: 2.12, rectRadius: 0.09,
      fill: { color: chosen ? TINT_GREEN : NEUTRAL },
      line: chosen ? { color: GREEN, width: 1.5 } : { color: LINE_GRAY, width: 1 },
    });
    s.addText(chosen ? "✓" : "✕", {
      shape: "ellipse", x: x + 0.24, y: y + 0.22, w: 0.4, h: 0.4,
      fill: { color: chosen ? GREEN : "B9C7D1" }, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 16, bold: true, color: "FFFFFF", margin: 0,
    });
    s.addText(`${id}. ${name}`, {
      x: x + 0.78, y: y + 0.22, w: 5.1, h: 0.4, valign: "middle",
      fontFace: FONT, fontSize: 16.5, bold: true, color: chosen ? GREEN : INK, margin: 0,
    });
    s.addText(desc, {
      x: x + 0.28, y: y + 0.76, w: 5.5, h: 0.34,
      fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
    });
    s.addText([
      { text: chosen ? "채택  " : "탈락  ", options: { bold: true, color: chosen ? GREEN : "8A9BA8" } },
      { text: reason, options: { color: INK } },
    ], {
      x: x + 0.28, y: y + 1.14, w: 5.5, h: 0.88,
      fontFace: FONT, fontSize: 12, margin: 0, valign: "top", lineSpacingMultiple: 1.12,
    });
  });

  // ── 선택 논리
  s.addShape("roundRect", {
    x: 0.5, y: 5.92, w: 12.33, h: 0.78, rectRadius: 0.08,
    fill: { color: TINT_GREEN }, line: { color: GREEN, width: 1.25 },
  });
  s.addImage({ data: ic.targetGreen, x: 0.72, y: 6.11, w: 0.4, h: 0.4 });
  s.addText([
    { text: "선택 논리 — 부가가치는 고객이 가져간 계층 아래(웨이퍼)가 아니라, 아직 풀지 못한 계층 위에서 만든다", options: { fontSize: 14, bold: true, color: INK, breakLine: true } },
    { text: "워크로드 ↔ FDP 정책 변환이 그 계층 — 삼성은 FDP 표준의 공동 주도자로서 이 계층을 선점할 위치에 있다", options: { fontSize: 11, color: SUB } },
  ], {
    x: 1.26, y: 5.92, w: 11.4, h: 0.78, valign: "middle",
    fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12,
  });
}

/* ---------------------------------------------------------------- */
/* 제품·기술 축 ③ — 선택된 전략: 구조·실행·KPI                         */
/* ---------------------------------------------------------------- */
function slideFdpHow(pres, ic) {
  const s = pres.addSlide();
  header(s, "제품 축 ③", FDP_OPTS);

  s.addText([
    { text: "FDP SSD 공급자 → FDP 기반 Host–SSD 통합 솔루션 제공자   ", options: { fontSize: 15, bold: true, color: INK } },
    { text: "“Binding으로 수요 확보 · FDP로 표준화 · 시스템 SW로 연결”", options: { fontSize: 12.5, italic: true, color: SUB } },
  ], {
    shape: "roundRect", rectRadius: 0.09,
    x: 0.5, y: 0.94, w: 12.33, h: 0.6,
    fill: { color: NEUTRAL }, align: "center", valign: "middle",
    fontFace: FONT, margin: 0,
  });

  // ── 6요소 체인
  const chain = [
    ["Binding 계약", "장기 물량 확보"],
    ["FDP 표준 SSD", "공통 인터페이스"],
    ["시스템 SW", "워크로드→정책 변환"],
    ["E2E 검증", "TCO 개선 보장"],
    ["고객 공동개발", "장기 관계 구축"],
    ["텔레메트리", "지속 개선 루프"],
  ];
  chain.forEach(([t, c], i) => {
    const x = 0.5 + i * 2.06;
    s.addText([
      { text: t, options: { fontSize: 12, bold: true, color: i === 2 ? GREEN : INK, breakLine: true } },
      { text: c, options: { fontSize: 9.5, color: SUB } },
    ], {
      shape: "roundRect", rectRadius: 0.07, x, y: 1.7, w: 1.84, h: 0.78,
      fill: { color: i === 2 ? TINT_GREEN : "FFFFFF" },
      line: { color: i === 2 ? GREEN : LINE_GRAY, width: i === 2 ? 1.25 : 1 },
      align: "center", valign: "middle", fontFace: FONT, margin: 0, lineSpacingMultiple: 1.05,
    });
    if (i < 5) s.addText("▶", {
      x: x + 1.84, y: 1.7, w: 0.22, h: 0.78, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 10.5, color: SUB, margin: 0,
    });
  });

  // ── 실행전략 6종 (압축 그리드)
  const strategies = [
    ["Enablement Platform", "SDK·라이브러리(Linux·SPDK) · Workload Profiler · Emulator/Digital Twin", "0E6BA8", "layers"],
    ["표준 프로파일 7종", "Cache·KV·DB·Multi-tenant·Vector·Checkpoint·QLC — 펌웨어 공통화+고객 최적화", TEAL, "sliders"],
    ["E2E 공동검증", "App→Host→SSD→NAND · WAF·p999·격리·전력 · trace의 pre/post-silicon 재사용", GREEN, "check"],
    ["고객 공동개발 조직", "Host SW·Workload Integration·Solution Eng·Validation — 제품 기획 참여", "4C7C94", "users"],
    ["Binding 기술협력", "물량·trace·공동 로드맵 ↔ 공급능력·SDK·개선 목표 — 공동 플랫폼 계약", "0E6BA8", "link"],
    ["오픈소스·차별화 경계", "공개: 라이브러리·연동·적합성 / 차별화: FTL 모델·정책 추천·예측", TEAL, "unlock"],
  ];
  strategies.forEach(([t, c, color, iconKey], i) => {
    const x = 0.5 + (i % 3) * 4.2;
    const y = 2.66 + Math.floor(i / 3) * 1.66;
    card(s, x, y, 3.94, 1.52);
    iconCircle(s, x + 0.18, y + 0.16, 0.4, color, ic[iconKey]);
    s.addText(`${i + 1}. ${t}`, {
      x: x + 0.68, y: y + 0.16, w: 3.1, h: 0.36, valign: "middle",
      fontFace: FONT, fontSize: 13, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: x + 0.2, y: y + 0.62, w: 3.56, h: 0.84,
      fontFace: FONT, fontSize: 10, color: SUB, margin: 0, valign: "top", lineSpacingMultiple: 1.1,
    });
  });

  // ── 핵심 KPI + 실행 주체
  s.addShape("roundRect", {
    x: 0.5, y: 6.04, w: 12.33, h: 0.72, rectRadius: 0.08,
    fill: { color: TINT_GREEN }, line: { color: GREEN, width: 1.25 },
  });
  s.addImage({ data: ic.starGreen, x: 0.72, y: 6.2, w: 0.4, h: 0.4 });
  s.addText([
    { text: "핵심 KPI — 고객 시스템에서 FDP가 실제 활성화된 SSD 용량 · Captive→삼성 완제품 전환 물량", options: { fontSize: 13.5, bold: true, color: INK, breakLine: true } },
    { text: "실행 주체: 인재 축(FDE 스타)이 이 플랫폼을 들고 고객 아키텍처 안으로 들어간다 — 단계: 기본 도구 → 전략 고객 공동검증 → 상용 플랫폼화 → Host Control 확장", options: { fontSize: 10.5, color: SUB } },
  ], {
    x: 1.26, y: 6.04, w: 11.4, h: 0.72, valign: "middle",
    fontFace: FONT, margin: 0, lineSpacingMultiple: 1.12,
  });
}

/* ---------------------------------------------------------------- */
async function main() {
  const ic = {
    cpu: await iconPng(FiCpu, "FFFFFF"),
    star: await iconPng(FiStar, "FFFFFF"),
    users: await iconPng(FiUsers, "FFFFFF"),
    refresh: await iconPng(FiRefreshCw, "FFFFFF"),
    inbox: await iconPng(FiInbox, "FFFFFF"),
    compass: await iconPng(FiCompass, "FFFFFF"),
    alertInk: await iconPng(FiAlertTriangle, INK),
    usersSub: await iconPng(FiUsers, SUB),
    starGreen: await iconPng(FiStar, GREEN),
    targetGreen: await iconPng(FiTarget, GREEN),
    layers: await iconPng(FiLayers, "FFFFFF"),
    sliders: await iconPng(FiSliders, "FFFFFF"),
    check: await iconPng(FiCheckCircle, "FFFFFF"),
    link: await iconPng(FiLink, "FFFFFF"),
    unlock: await iconPng(FiUnlock, "FFFFFF"),
  };

  const combined = new pptxgen();
  combined.layout = "LAYOUT_WIDE";
  slideHigh(combined, ic);
  slideMid(combined, ic);
  slideLow(combined, ic);
  slideFdpWhy(combined, ic);
  slideFdpOptions(combined, ic);
  slideFdpHow(combined, ic);
  const outCombined = path.join(PRES_DIR, "dev-transformation-summary.pptx");
  await combined.writeFile({ fileName: outCombined });
  console.log("written:", outCombined);

  fs.mkdirSync(DL_DIR, { recursive: true });
  const singles = [
    ["high", [slideHigh]],
    ["mid", [slideMid]],
    ["low", [slideLow]],
    ["fdp", [slideFdpWhy, slideFdpOptions, slideFdpHow]],
  ];
  for (const [name, builds] of singles) {
    const p = new pptxgen();
    p.layout = "LAYOUT_WIDE";
    builds.forEach((b) => b(p, ic));
    const out = path.join(PRES_DIR, `dev-transformation-summary-${name}.pptx`);
    await p.writeFile({ fileName: out });
    fs.copyFileSync(out, path.join(DL_DIR, `dev-transformation-summary-${name}.pptx`));
    console.log("written:", out, "(+ dashboard/public/downloads)");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
