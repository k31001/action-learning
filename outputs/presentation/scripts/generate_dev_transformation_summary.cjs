/**
 * 개발실 체질 전환 전략 — 1장 요약 × 디테일 3단계 (상·중·하)
 * 원천: wiki/strategies/dev-org-transformation.md
 * 스타일: 화이트 배경 · 블루-그린 강조 · 제목 32pt · 도식(타임라인·화살표·아이콘) 중심
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
  FiInbox, FiCompass, FiTrendingUp, FiTarget,
} = require("react-icons/fi");

const PRES_DIR = path.join(__dirname, "..");
const DL_DIR = path.join(__dirname, "..", "..", "..", "dashboard", "public", "downloads");

const FONT = "Malgun Gothic";
const INK = "17313B";
const SUB = "5A7184";
const BLUE = "0E6BA8";
const TEAL = "028090";
const GREEN = "02A878";
const SLATE = "4C7C94";
const TINT_BLUE = "EAF3FA";
const TINT_TEAL = "E6F4F4";
const TINT_GREEN = "E8F6F0";
const LINE_GRAY = "D9E6EC";

const TITLE = "개발실 체질 전환 — 수주 이행자에서 기술 파트너로";

async function iconPng(Icon, hex) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Icon, { color: `#${hex}`, size: 256 })
  );
  const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

function header(slide, level, levelColor, levelTint) {
  slide.addText(TITLE, {
    x: 0.5, y: 0.26, w: 10.6, h: 0.62,
    fontFace: FONT, fontSize: 32, bold: true, color: INK, margin: 0,
  });
  slide.addText(`디테일 ${level}`, {
    shape: "roundRect", rectRadius: 0.1,
    x: 11.48, y: 0.34, w: 1.35, h: 0.46,
    fill: { color: levelTint }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 14, bold: true, color: levelColor, margin: 0,
  });
  slide.addText("삼성전자 메모리사업부 · 개발실 체질 전환 전략 요약 · 2026-07-24", {
    x: 0.5, y: 7.12, w: 7.6, h: 0.28,
    fontFace: FONT, fontSize: 10, color: SUB, margin: 0,
  });
  slide.addText("원천: wiki/strategies/dev-org-transformation.md", {
    x: 8.3, y: 7.12, w: 4.53, h: 0.28, align: "right",
    fontFace: FONT, fontSize: 10, color: SUB, margin: 0,
  });
}

function card(slide, x, y, w, h, tint) {
  slide.addShape("roundRect", { x, y, w, h, rectRadius: 0.09, fill: { color: tint } });
}

function numCircle(slide, x, y, n, color) {
  slide.addText(String(n), {
    shape: "ellipse", x, y, w: 0.36, h: 0.36,
    fill: { color }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 15, bold: true, color: "FFFFFF", margin: 0,
  });
}

function iconCircle(slide, x, y, d, color, iconData) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color } });
  const pad = d * 0.24;
  slide.addImage({ data: iconData, x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
}

/* ---------------------------------------------------------------- */
/* 디테일 상 — 타임라인 + As-Is→To-Be 화살표 + 아이콘 그리드 + KPI      */
/* ---------------------------------------------------------------- */
function slideHigh(pres, ic) {
  const s = pres.addSlide();
  header(s, "상", BLUE, TINT_BLUE);

  s.addText([
    { text: "북극성  ", options: { bold: true, color: TEAL } },
    { text: "“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다” — 신문섭 파트너 (2026-06)", options: { italic: true, color: SUB } },
  ], { x: 0.5, y: 0.92, w: 12.33, h: 0.32, fontFace: FONT, fontSize: 13, margin: 0 });

  const colY = 1.32, colH = 4.7, colW = 3.94;
  const xs = [0.5, 4.7, 8.89];
  const tints = [TINT_BLUE, TINT_TEAL, TINT_GREEN];
  const hdrColors = [BLUE, TEAL, GREEN];
  const hdrs = ["왜 지금인가", "무엇이 되나", "어떻게 하나"];
  xs.forEach((x, i) => {
    card(s, x, colY, colW, colH, tints[i]);
    numCircle(s, x + 0.2, colY + 0.18, i + 1, hdrColors[i]);
    s.addText(hdrs[i], {
      x: x + 0.66, y: colY + 0.15, w: colW - 0.8, h: 0.42,
      fontFace: FONT, fontSize: 21, bold: true, color: hdrColors[i], margin: 0,
    });
  });

  // ── 열 1: 사건 수직 타임라인
  const tlX = xs[0] + 0.42;
  s.addShape("line", { x: tlX, y: 2.28, w: 0, h: 2.35, line: { color: BLUE, width: 1.5 } });
  const events = [
    ["’25.06", "SK하이닉스 커스텀 HBM\n3사 인증"],
    ["’25.10", "Stargate LOI\n월 90만 장 (DRAM ~40%)"],
    ["’26.06", "Micron–Anthropic SCA\n16건 · $100B · $22B"],
  ];
  events.forEach(([d, t], i) => {
    const y = 2.28 + i * 0.94;
    s.addShape("ellipse", { x: tlX - 0.08, y: y - 0.02, w: 0.16, h: 0.16, fill: { color: BLUE } });
    s.addText(d, {
      x: tlX + 0.18, y: y - 0.12, w: 0.85, h: 0.3,
      fontFace: FONT, fontSize: 14, bold: true, color: BLUE, margin: 0,
    });
    s.addText(t, {
      x: tlX + 1.0, y: y - 0.13, w: 2.35, h: 0.8,
      fontFace: FONT, fontSize: 12.5, color: INK, margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });
  });
  // 경고 배지
  s.addShape("roundRect", { x: xs[0] + 0.2, y: 5.02, w: colW - 0.4, h: 0.78, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: BLUE, width: 1 } });
  s.addImage({ data: ic.alert, x: xs[0] + 0.36, y: 5.24, w: 0.34, h: 0.34 });
  s.addText("납품 정확성만으론\nSCA 테이블에 못 앉는다", {
    x: xs[0] + 0.82, y: 5.06, w: colW - 1.06, h: 0.7,
    fontFace: FONT, fontSize: 14, bold: true, color: INK, margin: 0, valign: "middle", lineSpacingMultiple: 1.05,
  });

  // ── 열 2: As-Is → To-Be 화살표 페어
  s.addText("As-Is", { x: xs[1] + 0.24, y: 2.06, w: 1.5, h: 0.26, fontFace: FONT, fontSize: 12, bold: true, color: SUB, margin: 0 });
  s.addText("To-Be", { x: xs[1] + 2.06, y: 2.06, w: 1.6, h: 0.26, fontFace: FONT, fontSize: 12, bold: true, color: TEAL, margin: 0 });
  const pairs = [
    ["스펙 수령", "요구 공동 정의"],
    ["RFQ 응답", "선제 제안"],
    ["부품 단품", "시스템 모델"],
    ["QCD", "공동설계 KPI"],
  ];
  pairs.forEach(([a, b], i) => {
    const y = 2.36 + i * 0.66;
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
  // FDE 배지
  s.addShape("roundRect", { x: xs[1] + 0.24, y: 5.14, w: colW - 0.48, h: 0.58, rectRadius: 0.08, fill: { color: "FFFFFF" }, line: { color: TEAL, width: 1 } });
  s.addImage({ data: ic.usersTeal, x: xs[1] + 0.4, y: 5.28, w: 0.3, h: 0.3 });
  s.addText("롤모델 Palantir FDE — 고객사 상주", {
    x: xs[1] + 0.8, y: 5.14, w: colW - 1.1, h: 0.58,
    fontFace: FONT, fontSize: 13, bold: true, color: INK, margin: 0, valign: "middle",
  });

  // ── 열 3: 4대 축 2×2 아이콘 그리드 + Phase 타임라인
  const axes = [
    ["기술", "워크로드 랩·모델", BLUE, ic.cpu],
    ["문화", "가설 제안·호명", TEAL, ic.star],
    ["조직", "Pod·DE 트랙", GREEN, ic.users],
    ["방식", "교차 리뷰·PoA", SLATE, ic.refresh],
  ];
  axes.forEach(([t, c, color, icon], i) => {
    const gx = xs[2] + 0.22 + (i % 2) * 1.82;
    const gy = 2.14 + Math.floor(i / 2) * 1.36;
    iconCircle(s, gx + 0.56, gy, 0.52, color, icon);
    s.addText(t, {
      x: gx, y: gy + 0.56, w: 1.64, h: 0.32, align: "center",
      fontFace: FONT, fontSize: 16, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: gx - 0.06, y: gy + 0.88, w: 1.76, h: 0.26, align: "center",
      fontFace: FONT, fontSize: 11, color: SUB, margin: 0,
    });
  });
  // Phase 미니 타임라인
  const pxs = [xs[2] + 0.62, xs[2] + 1.97, xs[2] + 3.32];
  s.addShape("line", { x: pxs[0], y: 5.28, w: pxs[2] - pxs[0], h: 0, line: { color: GREEN, width: 1.5 } });
  ["90일\n증명", "1년\n제도화", "3년\n표준화"].forEach((t, i) => {
    s.addShape("ellipse", { x: pxs[i] - 0.07, y: 5.21, w: 0.14, h: 0.14, fill: { color: GREEN } });
    s.addText(t, {
      x: pxs[i] - 0.6, y: 5.42, w: 1.2, h: 0.52, align: "center",
      fontFace: FONT, fontSize: 12, bold: true, color: INK, margin: 0, lineSpacingMultiple: 1.0,
    });
  });

  // ── KPI 스탯 밴드 (3년 목표)
  const stats = [
    ["40건/년", "선제 제안 (현재 ~0)"],
    ["35%", "로드맵 채택률"],
    ["30%+", "커스텀 매출 비중"],
    ["25%", "고객 직접 교류 시간"],
    ["5명+", "실리콘밸리 스타 영입"],
  ];
  stats.forEach(([v, l], i) => {
    const x = 0.5 + i * 2.47;
    s.addText(v, {
      x, y: 6.22, w: 2.37, h: 0.42, align: "center",
      fontFace: FONT, fontSize: 24, bold: true, color: TEAL, margin: 0,
    });
    s.addText(l, {
      x, y: 6.66, w: 2.37, h: 0.26, align: "center",
      fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
    });
  });
}

/* ---------------------------------------------------------------- */
/* 디테일 중 — 계약 진화 체브런 + 역할 전환 + 4대 축 + 3-Phase          */
/* ---------------------------------------------------------------- */
function slideMid(pres, ic) {
  const s = pres.addSlide();
  header(s, "중", TEAL, TINT_TEAL);

  s.addText("“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다” — 신문섭 (2026-06)", {
    shape: "roundRect", rectRadius: 0.09,
    x: 0.5, y: 0.94, w: 12.33, h: 0.58,
    fill: { color: TINT_GREEN }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 18, italic: true, color: INK, margin: 0,
  });

  const rowY = 1.7, rowH = 2.2, cardW = 5.99;

  // ── 좌: 계약 진화 3단 체브런
  card(s, 0.5, rowY, cardW, rowH, TINT_BLUE);
  numCircle(s, 0.7, rowY + 0.16, 1, BLUE);
  s.addText("왜 지금인가 — 계약의 진화", {
    x: 1.16, y: rowY + 0.13, w: 4.6, h: 0.4,
    fontFace: FONT, fontSize: 19, bold: true, color: BLUE, margin: 0,
  });
  const stages = [
    ["Spot", "현물 거래", "C7D5DE", SUB],
    ["LTA", "물량·가격 락인", "7FB3D3", "FFFFFF"],
    ["SCA", "공동설계·자본 연계", TEAL, "FFFFFF"],
  ];
  stages.forEach(([name, cap, fill, txt], i) => {
    const x = 0.78 + i * 1.86;
    s.addText([
      { text: name, options: { fontSize: 17, bold: true, breakLine: true } },
      { text: cap, options: { fontSize: 10.5 } },
    ], {
      shape: "roundRect", rectRadius: 0.07, x, y: rowY + 0.66, w: 1.6, h: 0.86,
      fill: { color: fill }, align: "center", valign: "middle",
      fontFace: FONT, color: txt, margin: 0,
    });
    if (i < 2) s.addText("▶", {
      x: x + 1.58, y: rowY + 0.66, w: 0.3, h: 0.86, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 14, color: BLUE, margin: 0,
    });
  });
  s.addText("고객이 사는 것: 정확한 납품 → 공동 기술 드라이브", {
    x: 0.78, y: rowY + 1.7, w: cardW - 0.56, h: 0.34,
    fontFace: FONT, fontSize: 13, color: INK, margin: 0, align: "center", valign: "middle",
  });

  // ── 우: 역할 전환 As-Is → To-Be
  card(s, 6.84, rowY, cardW, rowH, TINT_TEAL);
  numCircle(s, 7.04, rowY + 0.16, 2, TEAL);
  s.addText("무엇이 되나 — As-Is → To-Be", {
    x: 7.5, y: rowY + 0.13, w: 5.2, h: 0.4,
    fontFace: FONT, fontSize: 19, bold: true, color: TEAL, margin: 0,
  });
  const pairs = [
    ["스펙 수령", "요구사항 공동 정의"],
    ["RFQ 응답", "선제 제안·기술 드라이브"],
    ["부품 스펙", "시스템 모델 (서버→랙→DC)"],
  ];
  pairs.forEach(([a, b], i) => {
    const y = rowY + 0.64 + i * 0.5;
    s.addText(a, {
      shape: "roundRect", rectRadius: 0.05, x: 7.08, y, w: 1.7, h: 0.4,
      fill: { color: "FFFFFF" }, line: { color: LINE_GRAY, width: 1 },
      align: "center", valign: "middle", fontFace: FONT, fontSize: 12.5, color: SUB, margin: 0,
    });
    s.addText("→", {
      x: 8.82, y, w: 0.3, h: 0.4, align: "center", valign: "middle",
      fontFace: FONT, fontSize: 15, bold: true, color: TEAL, margin: 0,
    });
    s.addText(b, {
      shape: "roundRect", rectRadius: 0.05, x: 9.14, y, w: 3.4, h: 0.4,
      fill: { color: "FFFFFF" }, line: { color: TEAL, width: 1.25 },
      align: "center", valign: "middle", fontFace: FONT, fontSize: 12.5, bold: true, color: TEAL, margin: 0,
    });
  });

  // ── 4대 축 아이콘 행
  card(s, 0.5, 4.08, 12.33, 1.24, TINT_GREEN);
  numCircle(s, 0.7, 4.24, 3, GREEN);
  s.addText("어떻게 하나 — 4대 축", {
    x: 1.16, y: 4.21, w: 3.4, h: 0.4,
    fontFace: FONT, fontSize: 19, bold: true, color: GREEN, margin: 0,
  });
  const axes = [
    ["기술", "워크로드 랩 · 시스템 모델", BLUE, ic.cpu],
    ["문화", "가설 제안 KPI · 스타 호명", TEAL, ic.star],
    ["조직", "Co-Design Pod · DE 트랙", GREEN, ic.users],
    ["방식", "교차 리뷰 · PoA · AI 내재화", SLATE, ic.refresh],
  ];
  axes.forEach(([t, c, color, icon], i) => {
    const x = 4.62 + i * 2.06;
    iconCircle(s, x, 4.28, 0.46, color, icon);
    s.addText(t, {
      x: x + 0.54, y: 4.26, w: 1.5, h: 0.3,
      fontFace: FONT, fontSize: 14.5, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: x + 0.54, y: 4.56, w: 1.56, h: 0.6,
      fontFace: FONT, fontSize: 10, color: SUB, margin: 0, valign: "top", lineSpacingMultiple: 1.05,
    });
  });

  // ── 3-Phase 타임라인
  const pxs = [1.6, 6.67, 11.73];
  s.addShape("line", { x: pxs[0], y: 5.94, w: pxs[2] - pxs[0], h: 0, line: { color: TEAL, width: 2 } });
  const phases = [
    ["90일 · 증명", "Co-Design Pod 1호 · 시스템 모델 v0.1"],
    ["1년 · 제도화", "Pod 3~5개 · SCA형 계약 1건"],
    ["3년 · 표준화", "설계 플랫폼 · 커스텀 매출 30%+"],
  ];
  phases.forEach(([t, c], i) => {
    s.addShape("ellipse", { x: pxs[i] - 0.09, y: 5.85, w: 0.18, h: 0.18, fill: { color: TEAL } });
    s.addText(t, {
      x: pxs[i] - 1.55, y: 5.52, w: 3.1, h: 0.3, align: "center",
      fontFace: FONT, fontSize: 15, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: pxs[i] - 1.75, y: 6.12, w: 3.5, h: 0.28, align: "center",
      fontFace: FONT, fontSize: 11.5, color: SUB, margin: 0,
    });
  });

  s.addText("SCA 16건 · 최소 계약매출 $100B · 예치금 $22B — Micron IR (2026-06)", {
    x: 0.5, y: 6.62, w: 12.33, h: 0.3, align: "center",
    fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
  });
}

/* ---------------------------------------------------------------- */
/* 디테일 하 — 인용 + 전환 한 컷(박스→화살표→박스) + 로드맵 + $100B      */
/* ---------------------------------------------------------------- */
function slideLow(pres, ic) {
  const s = pres.addSlide();
  header(s, "하", GREEN, TINT_GREEN);

  s.addShape("roundRect", { x: 1.0, y: 1.08, w: 11.33, h: 1.02, rectRadius: 0.1, fill: { color: TINT_GREEN } });
  s.addText("“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다”", {
    x: 1.2, y: 1.18, w: 10.93, h: 0.52, align: "center",
    fontFace: FONT, fontSize: 24, italic: true, bold: true, color: INK, margin: 0,
  });
  s.addText("— 신문섭 파트너, AI 인프라 슈퍼사이클 인터뷰 (2026-06)", {
    x: 1.2, y: 1.7, w: 10.93, h: 0.28, align: "center",
    fontFace: FONT, fontSize: 13, color: SUB, margin: 0,
  });

  // ── 전환 한 컷: As-Is 박스 → 화살표(LTA→SCA) → To-Be 박스
  const boxY = 2.5, boxH = 1.94;
  s.addShape("roundRect", { x: 2.2, y: boxY, w: 3.5, h: boxH, rectRadius: 0.1, fill: { color: "F3F6F8" }, line: { color: LINE_GRAY, width: 1.25 } });
  iconCircle(s, 3.68, boxY + 0.22, 0.54, SUB, ic.inbox);
  s.addText("수주 이행자", {
    x: 2.3, y: boxY + 0.84, w: 3.3, h: 0.4, align: "center",
    fontFace: FONT, fontSize: 22, bold: true, color: SUB, margin: 0,
  });
  s.addText("스펙 수령 · RFQ 응답 · QCD", {
    x: 2.3, y: boxY + 1.3, w: 3.3, h: 0.3, align: "center",
    fontFace: FONT, fontSize: 13, color: SUB, margin: 0,
  });

  s.addText("LTA → SCA", {
    shape: "rightArrow", x: 5.85, y: boxY + 0.52, w: 1.6, h: 0.9,
    fill: { color: TEAL }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 13, bold: true, color: "FFFFFF", margin: 0,
  });

  s.addShape("roundRect", { x: 7.6, y: boxY, w: 3.5, h: boxH, rectRadius: 0.1, fill: { color: TINT_GREEN }, line: { color: GREEN, width: 1.5 } });
  iconCircle(s, 9.08, boxY + 0.22, 0.54, GREEN, ic.compass);
  s.addText("기술 파트너", {
    x: 7.7, y: boxY + 0.84, w: 3.3, h: 0.4, align: "center",
    fontFace: FONT, fontSize: 22, bold: true, color: GREEN, margin: 0,
  });
  s.addText("요구 공동 정의 · 선제 제안 · 시스템 모델", {
    x: 7.6, y: boxY + 1.3, w: 3.5, h: 0.3, align: "center",
    fontFace: FONT, fontSize: 13, color: INK, margin: 0,
  });

  // ── 로드맵 타임라인
  const pxs = [2.7, 6.67, 10.63];
  s.addShape("line", { x: pxs[0], y: 5.36, w: pxs[2] - pxs[0], h: 0, line: { color: GREEN, width: 2 } });
  const phases = [
    ["90일 증명", "Pod 1호 · 모델 v0.1"],
    ["1년 제도화", "Pod 3~5 · SCA 1건"],
    ["3년 표준화", "플랫폼 · 커스텀 30%+"],
  ];
  phases.forEach(([t, c], i) => {
    s.addShape("ellipse", { x: pxs[i] - 0.1, y: 5.26, w: 0.2, h: 0.2, fill: { color: GREEN } });
    s.addText(t, {
      x: pxs[i] - 1.4, y: 4.9, w: 2.8, h: 0.32, align: "center",
      fontFace: FONT, fontSize: 16, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: pxs[i] - 1.5, y: 5.56, w: 3.0, h: 0.28, align: "center",
      fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
    });
  });

  s.addText([
    { text: "$100B", options: { fontSize: 32, bold: true, color: TEAL } },
    { text: "   SCA 최소 계약매출 — 공동설계 없이는 참여할 수 없는 시장 (Micron IR, 2026-06)", options: { fontSize: 14, color: SUB } },
  ], {
    x: 0.5, y: 6.18, w: 12.33, h: 0.6, align: "center", valign: "middle",
    fontFace: FONT, margin: 0,
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
    alert: await iconPng(FiAlertTriangle, BLUE),
    usersTeal: await iconPng(FiUsers, TEAL),
    trend: await iconPng(FiTrendingUp, "FFFFFF"),
    target: await iconPng(FiTarget, "FFFFFF"),
  };

  // 3장 통합본
  const combined = new pptxgen();
  combined.layout = "LAYOUT_WIDE";
  slideHigh(combined, ic);
  slideMid(combined, ic);
  slideLow(combined, ic);
  const outCombined = path.join(PRES_DIR, "dev-transformation-summary.pptx");
  await combined.writeFile({ fileName: outCombined });
  console.log("written:", outCombined);

  // 1장짜리 3종 (+ 대시보드 다운로드 복사)
  fs.mkdirSync(DL_DIR, { recursive: true });
  const singles = [["high", slideHigh], ["mid", slideMid], ["low", slideLow]];
  for (const [name, build] of singles) {
    const p = new pptxgen();
    p.layout = "LAYOUT_WIDE";
    build(p, ic);
    const out = path.join(PRES_DIR, `dev-transformation-summary-${name}.pptx`);
    await p.writeFile({ fileName: out });
    fs.copyFileSync(out, path.join(DL_DIR, `dev-transformation-summary-${name}.pptx`));
    console.log("written:", out, "(+ dashboard/public/downloads)");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
