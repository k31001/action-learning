/**
 * 개발실 체질 전환 전략 — 1장 요약 × 디테일 3단계 (상·중·하)
 * 원천: wiki/strategies/dev-org-transformation.md
 * 스타일: 화이트 배경 · 블루-그린 강조 · 제목 32pt · 본문 21pt
 * 실행: node outputs/presentation/scripts/generate_dev_transformation_summary.cjs
 */
const pptxgen = require("pptxgenjs");
const path = require("path");

const OUT = path.join(__dirname, "..", "dev-transformation-summary.pptx");

const FONT = "Malgun Gothic";
const INK = "17313B"; // 본문 텍스트 (블루-슬레이트)
const SUB = "5A7184"; // 보조 텍스트
const BLUE = "0E6BA8";
const TEAL = "028090";
const GREEN = "02A878";
const TINT_BLUE = "EAF3FA";
const TINT_TEAL = "E6F4F4";
const TINT_GREEN = "E8F6F0";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 in

const TITLE = "개발실 체질 전환 — 수주 이행자에서 기술 파트너로";

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
  slide.addShape("roundRect", {
    x, y, w, h, rectRadius: 0.09, fill: { color: tint },
  });
}

function numCircle(slide, x, y, n, color) {
  slide.addText(String(n), {
    shape: "ellipse", x, y, w: 0.36, h: 0.36,
    fill: { color }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 15, bold: true, color: "FFFFFF", margin: 0,
  });
}

/* ---------------------------------------------------------------- */
/* 슬라이드 1 — 디테일 상                                              */
/* ---------------------------------------------------------------- */
{
  const s = pres.addSlide();
  header(s, "상", BLUE, TINT_BLUE);

  s.addText([
    { text: "북극성  ", options: { bold: true, color: TEAL } },
    { text: "“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다” — 신문섭 파트너 인터뷰 (2026-06)", options: { italic: true, color: SUB } },
  ], { x: 0.5, y: 0.92, w: 12.33, h: 0.32, fontFace: FONT, fontSize: 13, margin: 0 });

  const colY = 1.36, colH = 4.78, colW = 3.94;
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

  s.addText([
    { text: "’25.06 SK하이닉스 커스텀 HBM 3사 인증", options: { bullet: { color: BLUE }, breakLine: true } },
    { text: "’25.10 Stargate LOI — 월 90만 장", options: { bullet: { color: BLUE }, breakLine: true } },
    { text: "’26.06 SCA 16건·$100B·$22B", options: { bullet: { color: BLUE }, breakLine: true } },
    { text: "납품 정확성만으론 SCA 못 앉는다", options: { bullet: { color: BLUE }, bold: true } },
  ], {
    x: xs[0] + 0.22, y: colY + 0.72, w: colW - 0.42, h: colH - 0.9,
    fontFace: FONT, fontSize: 21, color: INK, margin: 0,
    paraSpaceAfter: 8, valign: "top",
  });

  s.addText([
    { text: "스펙 수령 → 요구 공동 정의", options: { bullet: { color: TEAL }, breakLine: true } },
    { text: "RFQ 응답 → 선제 제안", options: { bullet: { color: TEAL }, breakLine: true } },
    { text: "부품 → 시스템 모델 (서버→랙→DC)", options: { bullet: { color: TEAL }, breakLine: true } },
    { text: "QCD → 공동설계·채택률 KPI", options: { bullet: { color: TEAL }, breakLine: true } },
    { text: "롤모델: Palantir FDE (고객사 상주)", options: { bullet: { color: TEAL } } },
  ], {
    x: xs[1] + 0.22, y: colY + 0.72, w: colW - 0.42, h: colH - 0.9,
    fontFace: FONT, fontSize: 21, color: INK, margin: 0,
    paraSpaceAfter: 8, valign: "top",
  });

  s.addText([
    { text: "기술 ", options: { bold: true, color: GREEN } },
    { text: "워크로드 랩·시스템 모델", options: { breakLine: true } },
    { text: "문화 ", options: { bold: true, color: GREEN } },
    { text: "가설 제안 KPI·스타 호명", options: { breakLine: true } },
    { text: "조직 ", options: { bold: true, color: GREEN } },
    { text: "Co-Design Pod·DE 재정의", options: { breakLine: true } },
    { text: "방식 ", options: { bold: true, color: GREEN } },
    { text: "교차 리뷰·PoA·AI 내재화", options: { breakLine: true } },
    { text: "90일 증명 → 1년 제도화 → 3년 표준화", options: { bold: true, color: INK } },
  ], {
    x: xs[2] + 0.22, y: colY + 0.72, w: colW - 0.42, h: colH - 0.9,
    fontFace: FONT, fontSize: 21, color: INK, margin: 0,
    paraSpaceAfter: 7, valign: "top",
  });

  // KPI 스탯 콜아웃 (3년 목표)
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
      x, y: 6.26, w: 2.37, h: 0.42, align: "center",
      fontFace: FONT, fontSize: 24, bold: true, color: TEAL, margin: 0,
    });
    s.addText(l, {
      x, y: 6.7, w: 2.37, h: 0.26, align: "center",
      fontFace: FONT, fontSize: 12, color: SUB, margin: 0,
    });
  });
}

/* ---------------------------------------------------------------- */
/* 슬라이드 2 — 디테일 중                                              */
/* ---------------------------------------------------------------- */
{
  const s = pres.addSlide();
  header(s, "중", TEAL, TINT_TEAL);

  s.addText("“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다” — 신문섭 (2026-06)", {
    shape: "roundRect", rectRadius: 0.09,
    x: 0.5, y: 0.98, w: 12.33, h: 0.66,
    fill: { color: TINT_GREEN }, align: "center", valign: "middle",
    fontFace: FONT, fontSize: 21, italic: true, color: INK, margin: 0,
  });

  const cardY = 1.84, cardH = 2.78, cardW = 5.99;
  card(s, 0.5, cardY, cardW, cardH, TINT_BLUE);
  numCircle(s, 0.7, cardY + 0.18, 1, BLUE);
  s.addText("왜 지금인가", {
    x: 1.16, y: cardY + 0.15, w: 4.5, h: 0.42,
    fontFace: FONT, fontSize: 21, bold: true, color: BLUE, margin: 0,
  });
  s.addText([
    { text: "고객이 사는 것: 납품 → 공동 기술 드라이브 (LTA→SCA)", options: { bullet: { color: BLUE }, breakLine: true } },
    { text: "Micron–Anthropic 등 SCA 16건 · $100B", options: { bullet: { color: BLUE }, breakLine: true } },
    { text: "공동설계 역량 없으면 SCA에서 배제", options: { bullet: { color: BLUE } } },
  ], {
    x: 0.72, y: cardY + 0.68, w: cardW - 0.44, h: cardH - 0.86,
    fontFace: FONT, fontSize: 21, color: INK, margin: 0,
    paraSpaceAfter: 10, valign: "top",
  });

  card(s, 6.84, cardY, cardW, cardH, TINT_TEAL);
  numCircle(s, 7.04, cardY + 0.18, 2, TEAL);
  s.addText("무엇이 되나 (As-Is → To-Be)", {
    x: 7.5, y: cardY + 0.15, w: 5.2, h: 0.42,
    fontFace: FONT, fontSize: 21, bold: true, color: TEAL, margin: 0,
  });
  s.addText([
    { text: "스펙 수령 → 요구사항 공동 정의", options: { bullet: { color: TEAL }, breakLine: true } },
    { text: "RFQ 응답 → 선제 제안·기술 드라이브", options: { bullet: { color: TEAL }, breakLine: true } },
    { text: "부품 스펙 → 시스템 모델 (서버→랙→데이터센터)", options: { bullet: { color: TEAL } } },
  ], {
    x: 7.06, y: cardY + 0.68, w: cardW - 0.44, h: cardH - 0.86,
    fontFace: FONT, fontSize: 21, color: INK, margin: 0,
    paraSpaceAfter: 10, valign: "top",
  });

  numCircle(s, 0.7, 4.79, 3, GREEN);
  s.addText("어떻게 하나 — 4대 축 · 3-Phase", {
    x: 1.16, y: 4.76, w: 8, h: 0.42,
    fontFace: FONT, fontSize: 21, bold: true, color: GREEN, margin: 0,
  });

  const axes = [
    ["기술", "워크로드 랩 · 시스템 모델"],
    ["문화", "가설 제안 KPI · 스타 호명"],
    ["조직", "Co-Design Pod · DE 트랙"],
    ["일하는 방식", "교차 리뷰 · PoA · AI 내재화"],
  ];
  axes.forEach(([t, c], i) => {
    const x = 0.5 + i * 3.13;
    card(s, x, 5.28, 2.98, 0.86, TINT_GREEN);
    s.addText(t, {
      x: x + 0.16, y: 5.35, w: 2.66, h: 0.36,
      fontFace: FONT, fontSize: 21, bold: true, color: INK, margin: 0,
    });
    s.addText(c, {
      x: x + 0.16, y: 5.73, w: 2.66, h: 0.3,
      fontFace: FONT, fontSize: 12.5, color: SUB, margin: 0,
    });
  });

  const phases = [
    ["90일 · 증명", "Pod 1호 · 시스템 모델 v0.1"],
    ["1년 · 제도화", "Pod 3~5개 · SCA형 계약 1건"],
    ["3년 · 표준화", "설계 플랫폼 · 커스텀 매출 30%+"],
  ];
  phases.forEach(([t, c], i) => {
    const x = 0.5 + i * 4.25;
    card(s, x, 6.28, 3.84, 0.72, TINT_BLUE);
    s.addText([
      { text: t + "  ", options: { bold: true, color: BLUE } },
      { text: c, options: { color: INK } },
    ], {
      x: x + 0.16, y: 6.28, w: 3.56, h: 0.72, valign: "middle",
      fontFace: FONT, fontSize: 15.5, margin: 0,
    });
    if (i < 2) {
      s.addText("▶", {
        x: x + 3.84, y: 6.28, w: 0.41, h: 0.72, align: "center", valign: "middle",
        fontFace: FONT, fontSize: 16, color: TEAL, margin: 0,
      });
    }
  });
}

/* ---------------------------------------------------------------- */
/* 슬라이드 3 — 디테일 하                                              */
/* ---------------------------------------------------------------- */
{
  const s = pres.addSlide();
  header(s, "하", GREEN, TINT_GREEN);

  s.addShape("roundRect", {
    x: 1.0, y: 1.14, w: 11.33, h: 1.06, rectRadius: 0.1, fill: { color: TINT_GREEN },
  });
  s.addText("“고객의 아키텍처 안으로 들어가 수요를 함께 설계하는 기업이 이긴다”", {
    x: 1.2, y: 1.26, w: 10.93, h: 0.52, align: "center",
    fontFace: FONT, fontSize: 24, italic: true, bold: true, color: INK, margin: 0,
  });
  s.addText("— 신문섭 파트너, AI 인프라 슈퍼사이클 인터뷰 (2026-06)", {
    x: 1.2, y: 1.78, w: 10.93, h: 0.3, align: "center",
    fontFace: FONT, fontSize: 13, color: SUB, margin: 0,
  });

  const cardY = 2.56, cardH = 3.0, cardW = 3.94;
  const cards = [
    ["왜 지금인가", "계약이 LTA→SCA로 진화 — 물량·가격이 아니라 공동설계 역량이 수주를 결정한다", BLUE, TINT_BLUE],
    ["무엇이 되나", "수주 이행자 → 기술 파트너 — 요구사항을 공동 정의하고, 먼저 제안한다", TEAL, TINT_TEAL],
    ["어떻게 하나", "기술·문화·조직·일하는 방식 4대 축 — 90일 증명 → 1년 제도화 → 3년 표준화", GREEN, TINT_GREEN],
  ];
  cards.forEach(([t, body, color, tint], i) => {
    const x = 0.5 + i * 4.2;
    card(s, x, cardY, cardW, cardH, tint);
    numCircle(s, x + 0.22, cardY + 0.22, i + 1, color);
    s.addText(t, {
      x: x + 0.7, y: cardY + 0.19, w: cardW - 0.9, h: 0.42,
      fontFace: FONT, fontSize: 21, bold: true, color, margin: 0,
    });
    s.addText(body, {
      x: x + 0.26, y: cardY + 0.8, w: cardW - 0.52, h: cardH - 1.0,
      fontFace: FONT, fontSize: 21, color: INK, margin: 0, valign: "top",
    });
  });

  s.addText([
    { text: "$100B", options: { fontSize: 32, bold: true, color: TEAL } },
    { text: "   SCA 최소 계약매출 — 공동설계 없이는 참여할 수 없는 시장 (Micron IR, 2026-06)", options: { fontSize: 14, color: SUB } },
  ], {
    x: 0.5, y: 6.06, w: 12.33, h: 0.6, align: "center", valign: "middle",
    fontFace: FONT, margin: 0,
  });
}

pres.writeFile({ fileName: OUT }).then(() => console.log("written:", OUT));
