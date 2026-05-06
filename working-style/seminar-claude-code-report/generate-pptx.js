// Claude Code for Reports — Seminar slides
// Design: tutorial-template.pptx (AI Harness Engineering style)
// Layout: 13.33" x 7.5" (LAYOUT_WIDE)

const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";  // 13.33 x 7.5
pres.title = "Claude Code for Reports";
pres.author = "Samsung Electronics Memory Division";

// ─── DESIGN TOKENS (v3 — bright developer theme: light canvas + indigo/pink) ─
// Variable names retained for code compatibility; values flipped to light theme.
//   - bg/panel*: white → light slate canvas + cards
//   - cyan: primary accent (indigo-600)
//   - amber: secondary accent (pink-500)
//   - white: high-contrast text (slate-900)
//   - light/mid/muted: descending text contrast on light bg
const C = {
  bg:        "FFFFFF",   // pure white canvas
  panel:     "F8FAFC",   // slate-50 — card BG, code body
  panel2:    "F1F5F9",   // slate-100 — header bars, filename area
  border:    "E2E8F0",   // slate-200 — dividers
  cyan:      "4F46E5",   // indigo-600 — PRIMARY accent
  amber:     "EC4899",   // pink-500 — SECONDARY accent
  white:     "0F172A",   // slate-900 — high-contrast text (titles)
  light:     "1E293B",   // slate-800 — body text
  mid:       "475569",   // slate-600 — secondary text
  muted:     "64748B",   // slate-500 — footer, captions, faint text
  green:     "059669",   // emerald-600
  red:       "DC2626",   // red-600
};

const W = 13.333, H = 7.5;
const FOOTER = "Claude Code for Reports · Technical Seminar";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function newSlide() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  // Right edge cyan accent line (template signature)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 13.18, y: 0, w: 0.04, h: H,
    fill: { color: C.cyan }, line: { color: C.cyan },
  });
  return s;
}

function addChrome(s, sectionLabel, pageNum) {
  // Section label (top-left)
  s.addText(sectionLabel, {
    x: 0.6, y: 0.35, w: 9.0, h: 0.35,
    fontSize: 10, bold: true, fontFace: "Calibri",
    color: C.cyan, charSpacing: 4, margin: 0,
  });
  // Page counter (top-right)
  s.addText(`${String(pageNum).padStart(2, "0")} / 25`, {
    x: 11.73, y: 0.35, w: 1.0, h: 0.35,
    fontSize: 10, fontFace: "Consolas",
    color: C.muted, align: "right", margin: 0,
  });
  // Footer (bottom-left)
  s.addText(FOOTER, {
    x: 0.6, y: 7.05, w: 10, h: 0.3,
    fontSize: 9, fontFace: "Calibri",
    color: C.muted, margin: 0,
  });
}

function addTitle(s, title, subtitle) {
  s.addText(title, {
    x: 0.6, y: 0.85, w: 12.0, h: 0.85,
    fontSize: 36, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.6, y: 1.70, w: 12.0, h: 0.4,
      fontSize: 14, fontFace: "Calibri",
      color: C.mid, margin: 0,
    });
  }
}

function addCodePanel(s, x, y, w, h, filename, code, opts = {}) {
  // Filename header
  if (filename) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.36,
      fill: { color: C.panel2 }, line: { color: C.border },
    });
    s.addText(filename, {
      x: x + 0.18, y, w: w - 0.36, h: 0.36,
      fontSize: 11, fontFace: "Consolas",
      color: C.cyan, valign: "middle", margin: 0,
    });
  }
  const codeY = filename ? y + 0.36 : y;
  const codeH = filename ? h - 0.36 : h;
  s.addShape(pres.shapes.RECTANGLE, {
    x, y: codeY, w, h: codeH,
    fill: { color: C.panel }, line: { color: C.border, width: 1 },
  });
  s.addText(code, {
    x: x + 0.22, y: codeY + 0.15, w: w - 0.44, h: codeH - 0.3,
    fontSize: opts.size ?? 12, fontFace: "Consolas",
    color: opts.color ?? C.light, valign: "top", margin: 0, wrap: true,
  });
}

function addCard(s, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill ?? C.panel },
    line: { color: opts.border ?? C.border, width: opts.borderWidth ?? 1 },
  });
  if (opts.accent) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.08, h,
      fill: { color: opts.accent }, line: { color: opts.accent },
    });
  }
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 1 — COVER
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  s.addText("▍ TECHNICAL  SEMINAR  ·  v3", {
    x: 0.6, y: 0.55, w: 8.0, h: 0.35,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.cyan, charSpacing: 4, margin: 0,
  });
  s.addText("AI Harness", {
    x: 0.6, y: 2.20, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("Engineering.", {
    x: 0.6, y: 3.40, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText("보고서 워크플로우 — 이론에서 실전까지", {
    x: 0.6, y: 4.85, w: 12.0, h: 0.4,
    fontSize: 18, fontFace: "Calibri",
    color: C.light, margin: 0,
  });
  s.addText("두 트랙으로 진행합니다 — 00 · 하네스 (10매)  +  04 · 케이스 스터디 (10매)", {
    x: 0.6, y: 5.30, w: 12.0, h: 0.4,
    fontSize: 14, italic: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  s.addText("$ harness --tracks=00,04 --slides=25", {
    x: 0.6, y: 6.20, w: 12.0, h: 0.35,
    fontSize: 13, fontFace: "Consolas",
    color: C.cyan, margin: 0,
  });
  s.addText("발표자: 권의혁    ·    소속: 메모리사업부    ·    2026.05.06", {
    x: 0.6, y: 6.90, w: 12.0, h: 0.35,
    fontSize: 12, fontFace: "Calibri",
    color: C.muted, margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 2 — AGENDA
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  AGENDA", 2);
  addTitle(s, "오늘 다룰 내용",
              "이론 트랙 → 실전 트랙 → Q&A — 그대로 이어 읽으면 하나의 주장이 됩니다");

  const items = [
    {
      num: "00",
      title: "AI Harness Engineering",
      sub: "LLM을 자율 에이전트로 동작시키기 위한 외부 시스템 설계",
      meta: "10매 · 약 25분 · 슬라이드 3~12",
      color: C.cyan,
    },
    {
      num: "04",
      title: "Case — 시나리오 플래닝 보고서 + 자동화",
      sub: "실제 PROMPT · CLAUDE.md · 6 서브에이전트 · 디렉토리 + 변경 정합성 체인",
      meta: "12매 · 약 28분 · 슬라이드 13~24",
      color: C.amber,
    },
    {
      num: "Q",
      title: "Questions & Discussion",
      sub: "이론과 실전의 연결 — 자유롭게 질문하세요",
      meta: "1매 · 약 7분 · 슬라이드 25",
      color: C.muted,
    },
  ];
  const baseX = 0.6, baseY = 2.55, w = 12.05, rowH = 1.25, gap = 0.18;
  items.forEach((it, i) => {
    const y = baseY + i * (rowH + gap);
    addCard(s, baseX, y, w, rowH, { accent: it.color });
    s.addText(it.num, {
      x: baseX + 0.35, y: y + 0.18, w: 1.5, h: 0.95,
      fontSize: 48, bold: true, fontFace: "Arial Black",
      color: it.color, margin: 0,
    });
    s.addText(it.title, {
      x: baseX + 2.05, y: y + 0.22, w: w - 4.5, h: 0.45,
      fontSize: 20, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(it.sub, {
      x: baseX + 2.05, y: y + 0.72, w: w - 4.5, h: 0.45,
      fontSize: 12, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    });
    s.addText(it.meta, {
      x: baseX + w - 2.4, y: y + 0.40, w: 2.2, h: 0.45,
      fontSize: 10.5, fontFace: "Consolas",
      color: it.color, align: "right", margin: 0,
    });
  });
  s.addText("총 25슬라이드 · 약 60분 (이론 25 + 실전 28 + Q&A 7)", {
    x: 0.6, y: 6.65, w: 12.0, h: 0.3,
    fontSize: 11, italic: true, fontFace: "Calibri",
    color: C.muted, align: "center", margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   TRACK 00 · AI HARNESS ENGINEERING (slides 3–12)
// ═════════════════════════════════════════════════════════════════════════════

// ─── helper for harness slides ──────────────────────────────────────────────
function harnessTitle(s, num, big, sub) {
  s.addText(num, {
    x: 0.6, y: 0.85, w: 1.6, h: 1.4,
    fontSize: 64, bold: true, fontFace: "Arial Black",
    color: C.amber, margin: 0,
  });
  s.addText(big, {
    x: 2.2, y: 1.0, w: 9.5, h: 0.7,
    fontSize: 32, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText(sub, {
    x: 2.2, y: 1.75, w: 10.5, h: 0.4,
    fontSize: 14, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });
}

function captionFoot(s, txt, color) {
  s.addText(txt, {
    x: 0.6, y: 6.55, w: 12.05, h: 0.4,
    fontSize: 12, italic: true, fontFace: "Calibri",
    color: color || C.amber, margin: 0, wrap: true,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 3 — HARNESS · DEFINITION
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · DEFINITION", 3);
  addTitle(s, "AI 하네스 엔지니어링이란",
              "LLM을 자율 에이전트로 동작시키기 위한 외부 시스템 설계");

  // Quote panel (left)
  s.addText("“", {
    x: 0.6, y: 2.3, w: 1.0, h: 1.2,
    fontSize: 96, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });
  s.addText(
    "LLM은 텍스트 생성기다. 하네스(harness)는 그 텍스트가\n파일을 읽고, 도구를 부르고, 실행하고, 다음 행동을\n결정하게 만드는 시스템이다.",
    {
      x: 1.0, y: 3.30, w: 5.6, h: 2.0,
      fontSize: 17, fontFace: "Calibri",
      color: C.cyan, margin: 0, wrap: true,
    }
  );
  s.addText(
    "모델 자체가 아니라 모델을 둘러싼 엔지니어링이 자율 에이전트의 능력을 결정한다.",
    {
      x: 1.0, y: 5.45, w: 5.6, h: 0.8,
      fontSize: 12, italic: true, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    }
  );

  // 3 boxes diagram (right)
  const bx = 6.95, by = 2.55, bw = 1.85, bh = 1.4;
  const arrowW = 0.30;
  const labels = [
    { hd: "LLM",      sub: "두뇌 (텍스트 생성)",       color: C.cyan },
    { hd: "+ HARNESS", sub: "몸·환경 (도구·파일·루프)", color: C.amber },
    { hd: "= AGENT",  sub: "보고서를 끝까지 만든다",   color: C.cyan },
  ];
  let curX = bx;
  labels.forEach((l, i) => {
    addCard(s, curX, by, bw, bh, { accent: l.color });
    s.addText(l.hd, {
      x: curX, y: by + 0.18, w: bw, h: 0.55,
      fontSize: 16, bold: true, fontFace: "Arial Black",
      color: l.color, align: "center", margin: 0,
    });
    s.addText(l.sub, {
      x: curX + 0.15, y: by + 0.78, w: bw - 0.3, h: 0.55,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, align: "center", valign: "top", margin: 0, wrap: true,
    });
    curX += bw;
    if (i < labels.length - 1) {
      s.addText("→", {
        x: curX, y: by, w: arrowW, h: bh,
        fontSize: 22, bold: true, fontFace: "Arial Black",
        color: C.amber, align: "center", valign: "middle", margin: 0,
      });
      curX += arrowW;
    }
  });

  // Right lower checklist
  const cl = [
    "Tool Use — 파일 R/W, 셸, 웹, MCP",
    "Persistent State — 파일 시스템·Git",
    "Context Engineering — CLAUDE.md, 격리",
    "Subagent Orchestration — 역할 분리",
    "Loop Control — 승인·종료·감사",
  ];
  cl.forEach((c, i) => {
    s.addText("▸  " + c, {
      x: 6.95, y: 4.20 + i * 0.40, w: 5.85, h: 0.36,
      fontSize: 12, fontFace: "Calibri",
      color: C.light, margin: 0,
    });
  });

  captionFoot(s, "✱ 좋은 모델 + 나쁜 하네스 = 챗봇.   평범한 모델 + 좋은 하네스 = 작업하는 동료.", C.amber);
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 4 — HARNESS · LLM vs LLM + Harness
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · CONTRAST", 4);
  addTitle(s, "LLM vs LLM + Harness", "같은 지시, 전혀 다른 결과물");

  // 2-column comparison table
  const headerY = 2.45, rowH = 0.40;
  const col1X = 0.6, col1W = 3.6;
  const col2X = 4.30, col2W = 4.40;
  const col3X = 8.80, col3W = 3.95;

  // Header bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: col1X, y: headerY, w: col1W + col2W + col3W + 0.2, h: rowH + 0.05,
    fill: { color: C.panel2 }, line: { color: C.border },
  });
  s.addText("구분", {
    x: col1X + 0.2, y: headerY, w: col1W, h: rowH,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.cyan, valign: "middle", margin: 0,
  });
  s.addText("일반 LLM 챗봇", {
    x: col2X + 0.2, y: headerY, w: col2W, h: rowH,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.mid, valign: "middle", margin: 0,
  });
  s.addText("LLM + 하네스", {
    x: col3X + 0.2, y: headerY, w: col3W, h: rowH,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.amber, valign: "middle", margin: 0,
  });

  const rows = [
    ["응답 형식",   "채팅창 내 텍스트 1~3쪽",       "디렉토리·파일·다이어그램·커밋"],
    ["출처",       "학습 시점 지식, 환각 위험",    "웹 검색 + 인용 footnote 자동"],
    ["재현성",     "같은 질문도 매번 다른 답변",   "파일·git이 남아 누구나 재실행"],
    ["검증성",     "답변 자체로 끝",               "데이터 → 분석 → 결론 추적"],
    ["분량 한계",  "컨텍스트 윈도우 1회분",        "파일 저장 → 다음 세션 이어쓰기"],
    ["공동작업",  "대화 사본 공유",               "Git PR·코드 리뷰 워크플로우"],
    ["현실 작업",  "사람이 받아 적어 정리",        "산출물 자체가 최종 형태"],
  ];
  rows.forEach((r, i) => {
    const y = headerY + rowH + 0.05 + i * (rowH + 0.05);
    if (i % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: col1X, y, w: col1W + col2W + col3W + 0.2, h: rowH,
        fill: { color: C.panel }, line: { color: C.panel },
      });
    }
    s.addText(r[0], {
      x: col1X + 0.2, y, w: col1W, h: rowH,
      fontSize: 12, bold: true, fontFace: "Calibri",
      color: C.white, valign: "middle", margin: 0,
    });
    s.addText(r[1], {
      x: col2X + 0.2, y, w: col2W, h: rowH,
      fontSize: 11, fontFace: "Calibri",
      color: C.mid, valign: "middle", margin: 0, wrap: true,
    });
    s.addText(r[2], {
      x: col3X + 0.2, y, w: col3W, h: rowH,
      fontSize: 11, fontFace: "Calibri",
      color: C.cyan, valign: "middle", margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ 입력은 \"메모리 시장 시나리오 보고서 써줘\" 한 줄로 동일. 차이는 모두 하네스에서 나온다.", C.amber);
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 5 — HARNESS · 5 Building Blocks
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · BUILDING BLOCKS", 5);
  addTitle(s, "하네스의 5대 빌딩 블록",
              "모든 코딩·문서 에이전트가 이 다섯 요소의 조합으로 환원된다");

  const blocks = [
    { num: "01", title: "Tool Use",                desc: "외부 함수 — 파일 R/W,\n셸, 웹, MCP", eg: "Read · Write · Bash · WebSearch", color: C.cyan },
    { num: "02", title: "Persistent State",        desc: "컨텍스트 밖에 살아남는\n파일·Git·DB·메모리", eg: "data/ · analysis/ · git history", color: C.cyan },
    { num: "03", title: "Context Engineering",    desc: "무엇을 보여주고 무엇을\n감출지 결정", eg: "CLAUDE.md (63줄) 자동 주입", color: C.amber },
    { num: "04", title: "Subagent Orchestration", desc: "메인이 자식을 분배·\n격리·취합", eg: "Research·STEEP·Scenario·Strategy", color: C.amber },
    { num: "05", title: "Loop Control",           desc: "자율 루프의 승인·\n종료·감사", eg: "PROMPT.md 누적 + 사용자 승인", color: C.amber },
  ];

  // Top row: 3 cards, Bottom row: 2 cards centered
  const colW = 4.0, rowH = 1.95, gap = 0.15;
  const baseX = 0.6;
  blocks.forEach((b, i) => {
    let x, y;
    if (i < 3) {
      y = 2.40;
      x = baseX + i * (colW + gap);
    } else {
      y = 4.55;
      const offset = (3 * (colW + gap) - 2 * (colW + gap)) / 2;
      x = baseX + offset + (i - 3) * (colW + gap);
    }
    addCard(s, x, y, colW, rowH, { accent: b.color });
    s.addText(b.num, {
      x: x + 0.30, y: y + 0.18, w: 1.2, h: 0.55,
      fontSize: 24, bold: true, fontFace: "Arial Black",
      color: b.color, margin: 0,
    });
    s.addText(b.title, {
      x: x + 1.55, y: y + 0.20, w: colW - 1.7, h: 0.45,
      fontSize: 15, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(b.desc, {
      x: x + 0.30, y: y + 0.85, w: colW - 0.5, h: 0.65,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
    s.addText(b.eg, {
      x: x + 0.30, y: y + 1.55, w: colW - 0.5, h: 0.35,
      fontSize: 9.5, fontFace: "Consolas",
      color: C.muted, margin: 0,
    });
  });

  captionFoot(s, "✱ 모델을 바꿔도 이 5가지가 잘 설계되면 작업 결과가 안정적으로 유지됩니다.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 6 — HARNESS · Agentic Loop
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · AGENTIC LOOP", 6);
  addTitle(s, "에이전틱 루프", "결과를 보고 다음을 결정하는 자율성 — 챗봇과 에이전트의 분기점");

  // Left: 4-stage loop (vertical)
  const stages = [
    { tag: "PLAN",    desc: "사용자 의도 파싱·계획 수립",  ex: "STEEP 50요인 도출 후 점수화" },
    { tag: "ACT",     desc: "도구 호출 (Read·Write·Bash)", ex: "analysis/steep/economy.md 생성" },
    { tag: "OBSERVE", desc: "tool result 관찰",           ex: "10개 요인 도출, 점수 비어있음" },
    { tag: "DECIDE",  desc: "다음 행동 결정",              ex: "각 요인에 1~5점 부여 → 다음 카테고리" },
  ];
  const sX = 0.6, sY = 2.5, sW = 5.85, sH = 0.85;
  stages.forEach((st, i) => {
    const y = sY + i * (sH + 0.20);
    addCard(s, sX, y, sW, sH, { accent: i === 3 ? C.amber : C.cyan });
    s.addText(`0${i+1}`, {
      x: sX + 0.20, y: y + 0.10, w: 0.7, h: sH - 0.20,
      fontSize: 22, bold: true, fontFace: "Arial Black",
      color: i === 3 ? C.amber : C.cyan, valign: "middle", margin: 0,
    });
    s.addText(st.tag, {
      x: sX + 1.0, y: y + 0.10, w: 1.4, h: 0.40,
      fontSize: 13, bold: true, fontFace: "Consolas",
      color: C.white, charSpacing: 2, margin: 0,
    });
    s.addText(st.desc, {
      x: sX + 1.0, y: y + 0.45, w: sW - 1.2, h: 0.35,
      fontSize: 11, fontFace: "Calibri",
      color: C.mid, margin: 0,
    });
    s.addText("→ " + st.ex, {
      x: sX + 2.50, y: y + 0.10, w: sW - 2.7, h: 0.35,
      fontSize: 10, italic: true, fontFace: "Consolas",
      color: C.amber, margin: 0,
    });
  });
  s.addText("repeat until done", {
    x: sX, y: sY + 4 * (sH + 0.20) + 0.05, w: sW, h: 0.3,
    fontSize: 10, italic: true, fontFace: "Consolas",
    color: C.muted, align: "center", margin: 0,
  });

  // Right: comparison
  const cx = 6.95, cy = 2.55, cw = 5.85;
  s.addText("단순 호출  vs  에이전틱 루프", {
    x: cx, y: cy, w: cw, h: 0.4,
    fontSize: 14, bold: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  const cmp = [
    ["턴 수",       "1턴",            "N턴 (성공·종료까지)"],
    ["자가 수정",   "없음",           "관찰 → 재계획"],
    ["다중 단계",   "사용자가 매번",  "한 번 지시로 자율"],
    ["실패 회복",   "사람이 재시도",  "다른 도구로 재시도"],
  ];
  const rh = 0.5;
  cmp.forEach((row, i) => {
    const y = cy + 0.6 + i * rh;
    if (i % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y, w: cw, h: rh,
        fill: { color: C.panel }, line: { color: C.panel },
      });
    }
    s.addText(row[0], { x: cx + 0.15, y, w: 1.4, h: rh, fontSize: 11, bold: true, fontFace: "Calibri", color: C.white, valign: "middle", margin: 0 });
    s.addText(row[1], { x: cx + 1.65, y, w: 1.95, h: rh, fontSize: 11, fontFace: "Calibri", color: C.mid, valign: "middle", margin: 0 });
    s.addText(row[2], { x: cx + 3.65, y, w: cw - 3.75, h: rh, fontSize: 11, fontFace: "Calibri", color: C.cyan, valign: "middle", margin: 0 });
  });

  captionFoot(s, "✱ 본 프로젝트는 30+ 작업이 자동 분기 — 사용자가 매번 지시하지 않았습니다.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 7 — HARNESS · Context Engineering
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · CONTEXT", 7);
  addTitle(s, "컨텍스트 엔지니어링", "컨텍스트 윈도우는 한정 자원 — 무엇을 채울지가 곧 능력이 된다");

  // Left: 4 layers (top = persistent, bottom = volatile)
  const layers = [
    { tag: "①", name: "System Prompt",     persist: "영구 · 자동 주입", body: "하네스 정체성, 안전 규칙",        color: C.cyan },
    { tag: "②", name: "CLAUDE.md",         persist: "영구 · 자동 주입", body: "프로젝트 헌법 (63줄)",             color: C.cyan },
    { tag: "③", name: "File References",   persist: "온디맨드",          body: "@data/ @report/ 명시 시 주입",      color: C.amber },
    { tag: "④", name: "Conversation Turns", persist: "휘발 · 누적",       body: "사용자·에이전트 대화 + 도구 결과", color: C.amber },
  ];
  const lX = 0.6, lY = 2.5, lW = 6.0, lH = 0.95;
  layers.forEach((l, i) => {
    const y = lY + i * (lH + 0.12);
    addCard(s, lX, y, lW, lH, { accent: l.color });
    s.addText(l.tag + " " + l.name, {
      x: lX + 0.2, y: y + 0.10, w: lW - 2.5, h: 0.4,
      fontSize: 14, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(l.persist, {
      x: lX + lW - 2.4, y: y + 0.10, w: 2.2, h: 0.4,
      fontSize: 10, fontFace: "Consolas",
      color: l.color, align: "right", margin: 0,
    });
    s.addText(l.body, {
      x: lX + 0.2, y: y + 0.50, w: lW - 0.4, h: 0.35,
      fontSize: 11, fontFace: "Calibri",
      color: C.mid, margin: 0,
    });
  });

  // Right: 절약 기법 4개
  const tips = [
    { hd: "CLAUDE.md = 영속 규칙",       body: "\"한국어, 수치 B 단위\" 매 세션 자동 적용" },
    { hd: "Subagent isolation",          body: "리서치는 격리 컨텍스트 → 핵심만 메인에 반환" },
    { hd: "File references",             body: "필요할 때만 @path 명시" },
    { hd: "Periodic compaction",         body: "오래된 턴은 자동 요약·압축" },
  ];
  const tX = 7.0, tY = 2.55;
  tips.forEach((t, i) => {
    const y = tY + i * 0.95;
    s.addText("✱", {
      x: tX, y, w: 0.4, h: 0.4,
      fontSize: 16, bold: true, fontFace: "Calibri",
      color: C.cyan, margin: 0,
    });
    s.addText(t.hd, {
      x: tX + 0.4, y, w: 5.4, h: 0.4,
      fontSize: 14, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(t.body, {
      x: tX + 0.4, y: y + 0.42, w: 5.4, h: 0.45,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ 1M 토큰 윈도우도 잘못 쓰면 200K로 끝납니다. 무엇을 안 보여줄지가 더 중요합니다.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 8 — HARNESS · Subagent Patterns
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · SUBAGENTS", 8);
  addTitle(s, "서브에이전트 패턴 3종", "격리된 컨텍스트로 노이즈를 차단한다");

  const patterns = [
    {
      num: "01", name: "Researcher", color: C.cyan,
      defn: "격리 컨텍스트에서 자료를\n광범위 수집 → 정제된\n요약만 반환. 메인 보존.",
      eg:   "Research Agent가 18개\n데이터 파일 수집,\nmetadata.md만 메인에 노출",
    },
    {
      num: "02", name: "Specialist", color: C.amber,
      defn: "특정 도메인·방법론에\n특화. 동일 입력에서\n일관된 산출.",
      eg:   "STEEP Agent (1~5점),\nScenario Agent (중립적 이름),\nStrategy Agent (벤치마크)",
    },
    {
      num: "03", name: "Critic", color: C.cyan,
      defn: "다른 에이전트 결과를\n별도 시각으로 검증.\n편향·누락 검출.",
      eg:   "RS3 팩트체크 — SCADA·\nFDP 시장성 재검토 후\n권고안 보강",
    },
  ];
  const colW = 4.10, rowH = 4.30, gap = 0.15;
  const baseX = 0.6, baseY = 2.45;
  patterns.forEach((p, i) => {
    const x = baseX + i * (colW + gap);
    addCard(s, x, baseY, colW, rowH, { accent: p.color });
    s.addText(p.num, {
      x: x + 0.30, y: baseY + 0.20, w: colW - 0.5, h: 0.6,
      fontSize: 32, bold: true, fontFace: "Arial Black",
      color: p.color, margin: 0,
    });
    s.addText(p.name, {
      x: x + 0.30, y: baseY + 0.85, w: colW - 0.5, h: 0.5,
      fontSize: 20, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(p.defn, {
      x: x + 0.30, y: baseY + 1.50, w: colW - 0.5, h: 1.20,
      fontSize: 12, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.30, y: baseY + 2.85, w: colW - 0.6, h: 0,
      line: { color: C.border, width: 1 },
    });
    s.addText("본 프로젝트 적용", {
      x: x + 0.30, y: baseY + 2.95, w: colW - 0.5, h: 0.30,
      fontSize: 9.5, fontFace: "Consolas",
      color: p.color, charSpacing: 2, margin: 0,
    });
    s.addText(p.eg, {
      x: x + 0.30, y: baseY + 3.30, w: colW - 0.5, h: 0.95,
      fontSize: 10.5, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ 한 에이전트에 모든 걸 시키지 마세요. 역할 분리만으로 환각·누락이 절반으로 줍니다.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 9 — HARNESS · Tool Hierarchy + Permissions
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · TOOLS", 9);
  addTitle(s, "도구 사용 위계 + 권한 모델", "자율성과 안전성의 균형");

  // Left: pyramid (4 stacked bars, narrowing toward top)
  const px = 0.6, py = 2.55, pw = 5.85, ph = 0.85;
  const tiers = [
    { tag: "④", name: "Subagent · MCP write",   note: "외부 시스템 조작 — 강력·위험",       w: pw - 2.0, color: C.red },
    { tag: "③", name: "Bash · Edit",             note: "파일 수정·셸 — 사용자 승인 권장",   w: pw - 1.3, color: C.amber },
    { tag: "②", name: "Web · Search",            note: "외부 정보 fetch — 검증 필수",        w: pw - 0.7, color: C.cyan },
    { tag: "①", name: "Read · Glob",             note: "파일 읽기 — 거의 항상 안전",         w: pw,        color: C.green },
  ];
  tiers.forEach((t, i) => {
    const y = py + i * (ph + 0.1);
    const cx = px + (pw - t.w) / 2;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y, w: t.w, h: ph,
      fill: { color: C.panel }, line: { color: t.color, width: 2 },
    });
    s.addText(t.tag, {
      x: cx + 0.15, y, w: 0.6, h: ph,
      fontSize: 22, bold: true, fontFace: "Arial Black",
      color: t.color, valign: "middle", margin: 0,
    });
    s.addText(t.name, {
      x: cx + 0.85, y: y + 0.10, w: t.w - 1.0, h: 0.35,
      fontSize: 13, bold: true, fontFace: "Consolas",
      color: C.white, valign: "middle", margin: 0,
    });
    s.addText(t.note, {
      x: cx + 0.85, y: y + 0.45, w: t.w - 1.0, h: 0.35,
      fontSize: 10, fontFace: "Calibri",
      color: C.mid, valign: "middle", margin: 0,
    });
  });

  // Right: permission modes
  const rx = 7.0, ry = 2.55;
  s.addText("권한 모드 3종", {
    x: rx, y: ry, w: 5.85, h: 0.4,
    fontSize: 14, bold: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  const modes = [
    { tag: "read-only",   action: "파일 읽기만, 수정·실행 차단", use: "탐색·디버깅 초반" },
    { tag: "confirm",     action: "도구 호출 전 사용자 승인",     use: "첫 자동화·규모 큰 변경" },
    { tag: "autonomous",  action: "사전 정의 도구 자유 사용",     use: "신뢰된 반복 워크플로우" },
  ];
  modes.forEach((m, i) => {
    const y = ry + 0.6 + i * 1.18;
    addCard(s, rx, y, 5.85, 1.0, { accent: i === 0 ? C.green : i === 1 ? C.cyan : C.amber });
    s.addText(m.tag, {
      x: rx + 0.20, y: y + 0.12, w: 1.8, h: 0.35,
      fontSize: 13, bold: true, fontFace: "Consolas",
      color: i === 0 ? C.green : i === 1 ? C.cyan : C.amber, margin: 0,
    });
    s.addText(m.action, {
      x: rx + 2.0, y: y + 0.12, w: 3.7, h: 0.35,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, margin: 0,
    });
    s.addText("적합 단계: " + m.use, {
      x: rx + 0.20, y: y + 0.55, w: 5.6, h: 0.35,
      fontSize: 10, italic: true, fontFace: "Calibri",
      color: C.mid, margin: 0,
    });
  });

  captionFoot(s, "✱ 본 프로젝트: 데이터 수집·분석은 autonomous, 보고서 최종화·git push는 confirm.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 10 — HARNESS · Persistence Layers
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · PERSISTENCE", 10);
  addTitle(s, "영속성 레이어", "파일 시스템은 LLM의 외부 두뇌");

  // 4-row table
  const headerY = 2.45, rowH = 0.65;
  const cols = [
    { x: 0.6,   w: 2.6, align: "left" },
    { x: 3.25,  w: 1.8, align: "center" },
    { x: 5.10,  w: 1.5, align: "center" },
    { x: 6.65,  w: 1.4, align: "center" },
    { x: 8.10,  w: 4.6, align: "left" },
  ];
  const headers = ["레이어", "영속성", "용량", "검색", "본 프로젝트 사례"];
  // header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: headerY, w: 12.1, h: rowH * 0.7,
    fill: { color: C.panel2 }, line: { color: C.panel2 },
  });
  cols.forEach((c, i) => {
    s.addText(headers[i], {
      x: c.x, y: headerY, w: c.w, h: rowH * 0.7,
      fontSize: 11, bold: true, fontFace: "Calibri",
      color: C.cyan, align: c.align, valign: "middle", margin: 0,
    });
  });
  const rows = [
    ["In-context memory",      "세션 종료 시 소멸", "1M 토큰",      "직접 읽음",  "대화 중 도구 결과"],
    ["Memory files (MCP)",     "세션 간 영속",       "디스크 한계",  "인덱스+읽기", "~/.claude/.../memory/MEMORY.md"],
    ["Project workspace",      "영속 + 공유",        "디스크 한계",  "grep · find", "data/ · analysis/ · report/"],
    ["External (Git · MCP)",   "영속 + 분산",        "무제한",       "원격 검색",   "GitHub action-learning + PR"],
  ];
  rows.forEach((r, i) => {
    const y = headerY + rowH * 0.7 + 0.08 + i * (rowH + 0.05);
    addCard(s, 0.6, y, 12.1, rowH, { accent: i >= 2 ? C.cyan : C.muted });
    cols.forEach((c, j) => {
      s.addText(r[j], {
        x: c.x, y, w: c.w, h: rowH,
        fontSize: j === 0 ? 12 : 11, bold: j === 0,
        fontFace: j === 4 ? "Consolas" : "Calibri",
        color: j === 0 ? C.white : (j === 4 ? C.amber : C.light),
        align: c.align, valign: "middle", margin: 0,
      });
    });
  });

  // Bottom: 4 pillars
  const pX = 0.6, pY = 5.85, pW = 12.1;
  const pillars = [
    "재현 가능성 — git log = 단계별 스냅샷",
    "협업 가능성 — PR·코드 리뷰 그대로",
    "감사 가능성 — git + PROMPT.md 추적",
    "이어쓰기 — 다음 세션이 그 위에 작업",
  ];
  pillars.forEach((p, i) => {
    s.addText("▸ " + p, {
      x: pX + (i % 2) * 6.05, y: pY + Math.floor(i / 2) * 0.30, w: 6.0, h: 0.30,
      fontSize: 11, fontFace: "Calibri",
      color: C.cyan, margin: 0,
    });
  });

  captionFoot(s, "✱ \"산출물을 채팅창에 출력하지 말고 파일에 써라\" — 가장 단순한 단 하나의 규칙.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 11 — HARNESS · Claude Code Landscape
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · LANDSCAPE", 11);
  addTitle(s, "Claude Code의 위치", "코딩 에이전트는 많다 — 보고서 워크플로우에 적합한 reference 하네스는?");

  // Left: 4-quadrant landscape
  const qX = 0.6, qY = 2.55, qW = 5.85, qH = 4.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: qX, y: qY, w: qW, h: qH,
    fill: { color: C.panel }, line: { color: C.border, width: 1 },
  });
  // axes
  s.addShape(pres.shapes.LINE, {
    x: qX + qW / 2, y: qY + 0.2, w: 0, h: qH - 0.4,
    line: { color: C.muted, width: 1 },
  });
  s.addShape(pres.shapes.LINE, {
    x: qX + 0.2, y: qY + qH / 2, w: qW - 0.4, h: 0,
    line: { color: C.muted, width: 1 },
  });
  // axis labels
  s.addText("▲ Terminal·CLI", { x: qX + qW / 2 - 1.0, y: qY + 0.05, w: 2.0, h: 0.3, fontSize: 9, fontFace: "Consolas", color: C.cyan, align: "center", margin: 0 });
  s.addText("▼ GUI·Web",      { x: qX + qW / 2 - 1.0, y: qY + qH - 0.3, w: 2.0, h: 0.3, fontSize: 9, fontFace: "Consolas", color: C.cyan, align: "center", margin: 0 });
  s.addText("◀ Code 중심",     { x: qX + 0.05, y: qY + qH / 2 + 0.05, w: 1.4, h: 0.3, fontSize: 9, fontFace: "Consolas", color: C.cyan, margin: 0 });
  s.addText("문서·보고서 ▶",   { x: qX + qW - 1.5, y: qY + qH / 2 + 0.05, w: 1.4, h: 0.3, fontSize: 9, fontFace: "Consolas", color: C.cyan, align: "right", margin: 0 });
  // tools placement
  const tools = [
    { name: "Aider",       x: qX + 0.50, y: qY + 1.30, color: C.mid },
    { name: "Claude Code", x: qX + qW / 2 + 0.30, y: qY + 1.30, color: C.amber, star: true },
    { name: "Cursor",      x: qX + 0.50, y: qY + qH - 1.50, color: C.mid },
    { name: "Devin",       x: qX + qW / 2 + 0.30, y: qY + qH - 1.50, color: C.mid },
  ];
  tools.forEach(t => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: t.x, y: t.y, w: 2.0, h: 0.55,
      fill: { color: C.panel2 },
      line: { color: t.color, width: t.star ? 2 : 1 },
      rectRadius: 0.08,
    });
    s.addText((t.star ? "★ " : "") + t.name, {
      x: t.x, y: t.y, w: 2.0, h: 0.55,
      fontSize: 13, bold: true, fontFace: "Calibri",
      color: t.color, align: "center", valign: "middle", margin: 0,
    });
  });

  // Right: 4 reasons
  const rx = 7.0, ry = 2.55;
  s.addText("이 세미나가 Claude Code를 선택한 이유", {
    x: rx, y: ry, w: 5.85, h: 0.4,
    fontSize: 14, bold: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  const reasons = [
    { hd: "터미널 + 파일 시스템 = 워크플로우",     body: "디렉토리·파일·git이 1차 인터페이스 — 보고서 작업과 정확히 일치" },
    { hd: "Markdown · Mermaid 1급 시민",           body: "별도 디자인 도구 없이 GitHub 자동 렌더링" },
    { hd: "MCP 확장",                                body: "Notion · Slack · Drive · Calendar — 같은 모델·동일 워크플로우" },
    { hd: "Agent SDK + 슬래시 커맨드",              body: "조직 표준 워크플로우를 명령으로 패키징" },
  ];
  reasons.forEach((r, i) => {
    const y = ry + 0.55 + i * 1.0;
    s.addText("✱", {
      x: rx, y, w: 0.4, h: 0.4,
      fontSize: 16, bold: true, fontFace: "Calibri",
      color: C.cyan, margin: 0,
    });
    s.addText(r.hd, {
      x: rx + 0.4, y, w: 5.4, h: 0.4,
      fontSize: 13, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(r.body, {
      x: rx + 0.4, y: y + 0.42, w: 5.4, h: 0.45,
      fontSize: 10.5, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ \"AI 하네스 엔지니어링\" 자체는 도구 중립. 다음부터는 Claude Code를 reference로 자세히 봅니다.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 12 — HARNESS · Design Principles
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  addChrome(s, "▍ AI HARNESS  00 · PRINCIPLES", 12);
  addTitle(s, "하네스 설계 원칙 5가지", "보고서·문서 작업에 맞춰 검증된 5가지");

  const principles = [
    { num: "01", title: "Plain text first",     body: "모든 산출물 Markdown·MMD·CSV.\n바이너리는 최소.",                       eg: "보고서·시나리오·전략 모두 .md, 차트는 Mermaid", color: C.cyan },
    { num: "02", title: "Idempotent steps",     body: "같은 입력 → 같은 출력.\n재실행 가능한 단계로 분해.",                       eg: "generate-pptx.js 다시 돌리면 동일 PPTX",         color: C.cyan },
    { num: "03", title: "Audit trail",          body: "모든 결정에 입력·도구·결과\n추적 가능.",                                    eg: "Git log + PROMPT.md 누적 로깅",                 color: C.amber },
    { num: "04", title: "Human-in-the-loop",    body: "전략 판단·민감 정보·승인은\n사람이.",                                      eg: "RS3 팩트체크 사용자 피드백 5건이 권고안 형태 결정", color: C.amber },
    { num: "05", title: "Composable",           body: "하네스 + MCP + 외부 도구가\n같은 메탈에서 합쳐짐.",                          eg: "Claude Code + python-pptx + matplotlib",          color: C.cyan },
  ];

  const colW = 4.0, rowH = 1.95, gap = 0.15;
  const baseX = 0.6;
  principles.forEach((p, i) => {
    let x, y;
    if (i < 3) {
      y = 2.40;
      x = baseX + i * (colW + gap);
    } else {
      y = 4.55;
      const offset = (3 * (colW + gap) - 2 * (colW + gap)) / 2;
      x = baseX + offset + (i - 3) * (colW + gap);
    }
    addCard(s, x, y, colW, rowH, { accent: p.color });
    s.addText(p.num, {
      x: x + 0.30, y: y + 0.18, w: 0.9, h: 0.5,
      fontSize: 22, bold: true, fontFace: "Arial Black",
      color: p.color, margin: 0,
    });
    s.addText(p.title, {
      x: x + 1.20, y: y + 0.20, w: colW - 1.4, h: 0.45,
      fontSize: 14, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(p.body, {
      x: x + 0.30, y: y + 0.85, w: colW - 0.5, h: 0.7,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
    s.addText("▸ " + p.eg, {
      x: x + 0.30, y: y + 1.55, w: colW - 0.5, h: 0.35,
      fontSize: 9.5, fontFace: "Consolas",
      color: p.color, margin: 0,
    });
  });

  captionFoot(s, "✱ 여기까지가 이론입니다. 다음 10슬라이드에서는 이 5가지 원칙이 실제 보고서 프로젝트에서 어떻게 작동했는지를 git 파일 발췌로 봅니다.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   TRACK 04 · CASE STUDY (slides 13–22)
// ═════════════════════════════════════════════════════════════════════════════

// ─── SLIDE 13 — CASE · OVERVIEW ─────────────────────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · OVERVIEW", 13);
  addTitle(s, "한 프로젝트, 모든 컴포넌트가 흐른다",
              "삼성전자 메모리사업부 시나리오 플래닝 — 첫 프롬프트 한 번에서 시작된 30+ 커밋");

  // Left: project card (5 rows)
  const lx = 0.6, ly = 2.50, lw = 5.85;
  addCard(s, lx, ly, lw, 4.05, { accent: C.amber });
  s.addText("PROJECT", {
    x: lx + 0.25, y: ly + 0.15, w: lw - 0.5, h: 0.30,
    fontSize: 10, bold: true, fontFace: "Consolas",
    color: C.amber, charSpacing: 3, margin: 0,
  });
  const meta = [
    ["Focal Issue", "2030~2035 메모리 시장 불확실성 대응"],
    ["방법론",      "Shell 시나리오 플래닝 (8단계)"],
    ["사용자",      "메모리사업부 전략 담당자 (개발 경험 없음)"],
    ["세션 수",    "약 20회, 30+ commits"],
    ["산출물",      "데이터 인덱스 / 분석 / 보고서 / 발표자료"],
    ["저장소",      "github.com/k31001/action-learning"],
  ];
  meta.forEach((m, i) => {
    const y = ly + 0.55 + i * 0.55;
    s.addText(m[0], {
      x: lx + 0.25, y, w: 1.6, h: 0.4,
      fontSize: 11, bold: true, fontFace: "Calibri",
      color: C.cyan, valign: "middle", margin: 0,
    });
    s.addText(m[1], {
      x: lx + 1.95, y, w: lw - 2.2, h: 0.4,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, valign: "middle", margin: 0, wrap: true,
    });
  });

  // Right: tree
  addCodePanel(s, 6.95, 2.50, 5.85, 4.05, "action-learning/",
`├── CLAUDE.md          ← 프로젝트 헌법 (63줄)
├── PROMPT.md          ← 사용자 지시 누적 (201줄)
├── data/              ← 18개 데이터 + metadata.md
├── analysis/          ← STEEP·DF·Scenario·Strategy
├── report/
│   └── scenario-planning-report.md  (649줄)
├── presentation/
│   ├── slide-outline.md             (1,137줄)
│   ├── scripts/generate_pptx.py
│   └── assets/  ← matplotlib 차트 8종
└── working-style/
    └── seminar-claude-code-report/  ← 본 발표`,
    { size: 11 });

  captionFoot(s, "✱ 앞에서 본 5대 빌딩 블록 · 5가지 설계 원칙이 실제로 어떻게 작동했는지를 11슬라이드(9 케이스 + 2 자동화 워크플로우) 동안 git 발췌로 봅니다.");
}

// ─── SLIDE 14 — CASE · FIRST PROMPT + 6-STEP PLAN ────────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · FIRST PROMPT", 14);
  s.addText("01 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("첫 프롬프트와 하네스가 세운 6단계 계획", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 28, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("한 번의 한국어 지시 → 자동 분기된 작업 계획", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left: PROMPT.md excerpt
  addCodePanel(s, 0.6, 2.55, 6.0, 4.0, "PROMPT.md (line 1~30)",
`# 목표
나는 삼성전자 메모리사업부의 일원으로
불확실성에 대응하기 위한 회사의 전략을
제안하기 위한 발표자료를 만들거야

# 방법론
쉘에서 사용한 '시나리오 플래닝' 기법 활용.
Focal Issue → STEEP 브레인스토밍
→ Driving Forces → 시나리오 매트릭스
→ Main Bet + Side Bet → 생존 전략

# 산출물
1. 모든 데이터 수집 + 메타데이터 관리
2. 마크다운 전략 보고서 (시각자료 포함)
3. 슬라이드 기획서 (중간 산출물)
4. 파워포인트 자동 생성

# 주요 지침
- 역할별 서브에이전트 생성
- 모든 프롬프트는 PROMPT.md에 누적
- 모든 데이터는 git으로 관리
- 마크다운 우선 (PPTX 제외)`,
    { size: 10.5 });

  // Right: 6-step plan
  const rx = 6.85, ry = 2.55, rw = 5.95;
  s.addShape(pres.shapes.RECTANGLE, {
    x: rx, y: ry, w: rw, h: 4.0,
    fill: { color: C.panel }, line: { color: C.amber, width: 1 },
  });
  s.addText("하네스 자동 도출 — 6단계", {
    x: rx + 0.20, y: ry + 0.10, w: rw - 0.4, h: 0.35,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.amber, charSpacing: 2, margin: 0,
  });
  const steps = [
    "1   디렉토리 스캐폴딩 — data·analysis·report·presentation",
    "2   CLAUDE.md (63줄) — 규칙·디렉토리·메타데이터·에이전트 가이드",
    "3   서브에이전트 정의 — Research·STEEP·Scenario·Strategy 외 6종",
    "4   8단계 시나리오 플래닝 워크플로우 매핑",
    "5   PROMPT.md 누적 로깅 시작",
    "6   Git 자동 커밋 — 의미 단위로 30+ commits",
  ];
  steps.forEach((st, i) => {
    s.addText(st, {
      x: rx + 0.20, y: ry + 0.55 + i * 0.55, w: rw - 0.4, h: 0.50,
      fontSize: 12, fontFace: "Consolas",
      color: i < 2 ? C.cyan : C.light, valign: "middle", margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ \"프로젝트 시작해줘\" 한 줄에서 위 계획이 자동 도출 — 사용자는 수정·승인만.");
}

// ─── SLIDE 15 — CASE · DIRECTORY ────────────────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · DIRECTORY", 15);
  s.addText("02 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("디렉토리 구조 — 워크플로우의 척추", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 28, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("원시 데이터 → 가공 → 산출물의 단방향 흐름", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  addCodePanel(s, 0.6, 2.55, 12.10, 4.05, "directory tree",
`data/                              원시 자료 (Read-only)
├── market/        (5)              HBM·DRAM·NAND·AI 서버·가격
├── competitors/   (4)              SK하이닉스·Micron·CXMT·YMTC
├── technology/    (4)              HBM4·3D DRAM·CXL·PIM
├── policy/        (4)              CHIPS·MATCH·VEU·중국 빅펀드 III
├── macro/         (4)              AI CapEx·에너지·관세
└── metadata.md    (1)              18개 데이터 인덱스

           ▼ Research Agent · 정제 추출

analysis/                           가공 결과 (Append-only)
├── steep/                          5축 (econ·tech·env·social·political)
├── driving-forces/                 I×U 매트릭스 + 핵심 3개 선별
├── scenarios/                      5개 시나리오 + 매트릭스 (Mermaid)
├── benchmark/                      7개 사이클 산업 벤치마크 패턴
└── scenarios/strategy.md           658줄 — Bet 전략 통합

           ▼ Strategy Agent · 통합 정리

report/scenario-planning-report.md  649줄 최종 전략 보고서

           ▼ Presentation Agent · 형식 변환

presentation/
├── slide-outline.md                1,137줄 — 슬라이드별 명세
├── scripts/generate_pptx.py        matplotlib + python-pptx
└── assets/                         차트 8종 (PNG)`,
    { size: 10, color: C.light });

  captionFoot(s, "✱ 디렉토리 = 단계. 각 단계 산출물이 다음 디렉토리에 쌓이며 — 절대 거꾸로 흐르지 않습니다.");
}

// ─── SLIDE 16 — CASE · CLAUDE.md (PROJECT CONSTITUTION) ────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · CLAUDE.md", 16);
  s.addText("03 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("CLAUDE.md — 프로젝트 헌법", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 28, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("한 번 작성하면 모든 세션이 같은 톤으로 작동한다", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left: actual file excerpt
  addCodePanel(s, 0.6, 2.55, 7.0, 4.0, "CLAUDE.md (line 1~40)",
`# 프로젝트 가이드라인

## 프로젝트 정보
- 주제: 삼성전자 메모리사업부 시나리오 플래닝
- 방법론: Shell 시나리오 플래닝
- 산출물: 보고서(MD) + 슬라이드 기획(MD) + PPTX

## 필수 규칙

### 파일 관리
- 모든 사용자 지시는 PROMPT.md에 누적 기록
- 모든 문서는 Markdown 형식 (PowerPoint 제외)
- 데이터 수집/수정 시 data/metadata.md 업데이트
- 모든 변경사항은 git commit

### 디렉토리 규칙
- 원시 데이터: data/{category}/
- 분석 결과: analysis/{type}/
- 보고서 시각자료: report/assets/

### 시나리오 플래닝 방법론 순서
1. Focal Issue 정의
2. STEEP 30~50개 브레인스토밍
3. Impact × Uncertainty 매트릭스
4. 핵심 Driving Forces 2~3개 선별
... (총 8단계)`,
    { size: 10 });

  // Right: 4 effects
  const rx = 7.75, ry = 2.55;
  s.addText("이 한 파일이 만들어내는 효과", {
    x: rx, y: ry, w: 5.0, h: 0.4,
    fontSize: 13, bold: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  const effs = [
    { hd: "언어·형식 영속화",        body: "\"한국어, 수치 B 단위, 출처\" — 매번 말하지 않아도 적용" },
    { hd: "방법론을 코드로 박제",     body: "8단계 시나리오 플래닝이 파일에 — 어떤 세션도 같은 순서" },
    { hd: "에이전트 역할 사전 분리",   body: "Research/STEEP/Scenario/Strategy 권한·금지 명시" },
    { hd: "자동 주입 (system prompt)", body: "세션마다 자동 로드 — 사용자가 의식할 필요 없음" },
  ];
  effs.forEach((e, i) => {
    const y = ry + 0.55 + i * 0.95;
    s.addText("✱", {
      x: rx, y, w: 0.35, h: 0.35,
      fontSize: 14, bold: true, fontFace: "Calibri",
      color: C.cyan, margin: 0,
    });
    s.addText(e.hd, {
      x: rx + 0.35, y, w: 4.7, h: 0.35,
      fontSize: 12, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(e.body, {
      x: rx + 0.35, y: y + 0.37, w: 4.7, h: 0.50,
      fontSize: 10.5, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ 30분 들여 만든 CLAUDE.md가 이후 20세션 × 평균 2시간을 일관되게 만듭니다.");
}

// ─── SLIDE 17 — CASE · SUBAGENTS ────────────────────────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · SUBAGENTS", 17);
  s.addText("04 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("6개 서브에이전트 — 역할 기반 전문화", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 28, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("한 에이전트에 모든 걸 시키지 않는다", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // 6-row table
  const headerY = 2.55, rowH = 0.62;
  const cols = [
    { x: 0.6,  w: 1.85 },    // Agent
    { x: 2.50, w: 1.95 },    // 책임
    { x: 4.50, w: 2.40 },    // 산출물
    { x: 6.95, w: 4.30 },    // 핵심 규칙
    { x: 11.30, w: 1.45 },   // 컨텍스트
  ];
  const headers = ["Agent", "책임", "산출물", "핵심 규칙 (CLAUDE.md)", "컨텍스트"];
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: headerY, w: 12.15, h: 0.45,
    fill: { color: C.panel2 }, line: { color: C.panel2 },
  });
  cols.forEach((c, i) => {
    s.addText(headers[i], {
      x: c.x, y: headerY, w: c.w, h: 0.45,
      fontSize: 11, bold: true, fontFace: "Calibri",
      color: C.cyan, valign: "middle", margin: 0,
    });
  });

  const agents = [
    ["Research",            "자료 수집 (웹·파일)",   "data/*/*.md, metadata.md",          "판단 금지, 출처·신뢰도 의무 표기",            "격리"],
    ["STEEP",               "환경 요인 도출",         "analysis/steep/*.md (5축)",          "1~5점 점수, 30~50개 브레인스토밍",           "격리"],
    ["DrivingForce",        "핵심 요인 선별",         "impact-uncertainty-matrix.md, key-drivers.md", "독립성 검증 (한 축이 다른 축 원인이면 탈락)", "메인"],
    ["Scenario",            "5개 시나리오 작성",      "scenarios/scenario-{A..E}.md + matrix", "중립적 이름 (좋고 나쁨 평가 금지)",            "격리"],
    ["Strategy",            "Bet 전략 도출",          "strategy.md (658줄)",                "전략은 시나리오와 연결고리 명시, 벤치마크 매핑", "격리"],
    ["Report/Presentation", "최종 산출물",            "report/*.md, slide-outline.md",      "수치 출처 표기, Mermaid 우선",                 "메인"],
  ];
  agents.forEach((a, i) => {
    const y = headerY + 0.45 + i * rowH;
    if (i % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y, w: 12.15, h: rowH,
        fill: { color: C.panel }, line: { color: C.panel },
      });
    }
    s.addText(a[0], { x: cols[0].x, y, w: cols[0].w, h: rowH, fontSize: 11.5, bold: true, fontFace: "Arial Black",
      color: C.amber, valign: "middle", margin: 0 });
    s.addText(a[1], { x: cols[1].x, y, w: cols[1].w, h: rowH, fontSize: 10.5, fontFace: "Calibri",
      color: C.white, valign: "middle", margin: 0, wrap: true });
    s.addText(a[2], { x: cols[2].x, y, w: cols[2].w, h: rowH, fontSize: 10, fontFace: "Consolas",
      color: C.cyan, valign: "middle", margin: 0, wrap: true });
    s.addText(a[3], { x: cols[3].x, y, w: cols[3].w, h: rowH, fontSize: 10, fontFace: "Calibri",
      color: C.light, valign: "middle", margin: 0, wrap: true });
    s.addText(a[4], { x: cols[4].x, y, w: cols[4].w, h: rowH, fontSize: 10, bold: true, fontFace: "Calibri",
      color: a[4] === "격리" ? C.amber : C.mid, align: "center", valign: "middle", margin: 0 });
  });

  captionFoot(s, "✱ 한 에이전트 피드백이 한 번에 한 에이전트만 고치면 끝나는 구조 — 책임 분리.");
}

// ─── SLIDE 18 — CASE · DATA ─────────────────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · DATA", 18);
  s.addText("05 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("데이터 수집 + metadata.md", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 28, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("18개 파일 · 6개 카테고리 — 한 번 지시로 메타데이터까지", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left: distribution table
  const tx = 0.6, ty = 2.55, tw = 6.0, hH = 0.42;
  s.addShape(pres.shapes.RECTANGLE, {
    x: tx, y: ty, w: tw, h: hH,
    fill: { color: C.panel2 }, line: { color: C.panel2 },
  });
  ["카테고리", "파일", "대표"].forEach((h, i) => {
    const xs = [tx + 0.2, tx + 2.5, tx + 3.4];
    const ws = [2.3, 0.8, 2.6];
    s.addText(h, {
      x: xs[i], y: ty, w: ws[i], h: hH,
      fontSize: 11, bold: true, fontFace: "Calibri",
      color: C.cyan, valign: "middle", margin: 0,
    });
  });
  const cats = [
    ["시장 (data/market/)",              "5", "hbm-market.md, price-trends.md"],
    ["경쟁사 (data/competitors/)",       "4", "sk-hynix.md, micron.md, cxmt.md"],
    ["기술 (data/technology/)",          "4", "hbm4-roadmap.md, 3d-dram.md"],
    ["정책 (data/policy/)",              "4", "chips-act.md, match-act.md"],
    ["거시 (data/macro/)",                "4", "ai-capex.md, energy.md"],
    ["벤치마크 (analysis/benchmark/)",   "1", "cyclical-strategy-benchmark.md"],
  ];
  const rh = 0.50;
  cats.forEach((r, i) => {
    const y = ty + hH + i * rh;
    if (i % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: tx, y, w: tw, h: rh, fill: { color: C.panel }, line: { color: C.panel },
      });
    }
    s.addText(r[0], { x: tx + 0.2, y, w: 2.3, h: rh, fontSize: 10.5, fontFace: "Consolas", color: C.white, valign: "middle", margin: 0 });
    s.addText(r[1], { x: tx + 2.5, y, w: 0.8, h: rh, fontSize: 12, bold: true, fontFace: "Arial Black", color: C.amber, align: "center", valign: "middle", margin: 0 });
    s.addText(r[2], { x: tx + 3.4, y, w: 2.6, h: rh, fontSize: 9.5, fontFace: "Consolas", color: C.mid, valign: "middle", margin: 0, wrap: true });
  });

  // Right: actual metadata.md excerpt
  addCodePanel(s, 6.85, 2.55, 5.95, 4.0, "data/metadata.md (line 21~40)",
`## 시장 데이터 (data/market/)

### hbm-market.md
- 수집일: 2026-05-05 | 신뢰도: High
- 태그: #HBM #AI
- 요약: 2025년 HBM 매출 ~$340억(전년 2배).
  SK 57~62%, Micron 21%, 삼성 17~22%
  (점유율 역전). 2030년 CAGR 33%.
- 출처: Yole Group, BofA, Counterpoint

### price-trends.md
- 수집일: 2026-05-05 | 신뢰도: High
- 태그: #price #cycle
- 요약: Q1 2026 DRAM 계약가 +55~60% QoQ
  (역대 최대). HBM4 단가 ~$500/개
  (HBM3E +67%). NAND +33~38% QoQ.
- 출처: TrendForce, NAND Research`,
    { size: 10 });

  captionFoot(s, "✱ Research Agent가 자동 작성 — 사용자는 카테고리만 지시. 신뢰도·태그·출처가 표준 포맷으로 누적.");
}

// ─── SLIDE 19 — CASE · STEEP ───────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · STEEP", 19);
  s.addText("06 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("STEEP 50요인 → I×U → 3개 Driving Force", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 26, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("점수 기반 정렬로 최종 2축을 자동 도출", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left: funnel (3 stages)
  const fX = 0.6, fY = 2.55;
  const stages = [
    { y: fY,        w: 6.0, h: 1.10, hd: "STEEP 5축 × 약 10개씩",        body: "≈ 50개 환경 요인 브레인스토밍\n→ analysis/steep/*.md", color: C.cyan },
    { y: fY + 1.20, w: 5.0, h: 1.10, hd: "Impact × Uncertainty 점수",   body: "각 1~5점, 합산 정렬 → 상위 20개\n→ impact-uncertainty-matrix.md",      color: C.cyan },
    { y: fY + 2.40, w: 4.0, h: 1.10, hd: "독립성 검증 → 3개 선별",       body: "한 축이 다른 축 원인이면 탈락\n→ DF1·DF2 주축, DF3 와일드카드",       color: C.amber },
  ];
  stages.forEach((s2) => {
    const x = fX + (6.0 - s2.w) / 2;
    addCard(s, x, s2.y, s2.w, s2.h, { accent: s2.color });
    s.addText(s2.hd, {
      x: x + 0.20, y: s2.y + 0.10, w: s2.w - 0.4, h: 0.40,
      fontSize: 13, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(s2.body, {
      x: x + 0.20, y: s2.y + 0.50, w: s2.w - 0.4, h: 0.60,
      fontSize: 10.5, fontFace: "Calibri",
      color: C.mid, margin: 0, wrap: true,
    });
  });
  // arrows between
  for (let i = 0; i < 2; i++) {
    s.addText("▼", {
      x: fX, y: fY + 1.05 + i * 1.20, w: 6.0, h: 0.18,
      fontSize: 12, bold: true, fontFace: "Arial Black",
      color: C.amber, align: "center", margin: 0,
    });
  }

  // Right: actual key-drivers result
  const rx = 6.85, ry = 2.55, rw = 5.95;
  addCard(s, rx, ry, rw, 4.0, { accent: C.amber });
  s.addText("실제 결과 — key-drivers.md", {
    x: rx + 0.20, y: ry + 0.12, w: rw - 0.4, h: 0.35,
    fontSize: 11, bold: true, fontFace: "Consolas",
    color: C.amber, charSpacing: 2, margin: 0,
  });
  const dfs = [
    { df: "DF1", title: "AI 수요의 구조적 지속성",          a: "AI 슈퍼사이클 ($1조+)",   b: "거품 붕괴·수요 재조정" },
    { df: "DF2", title: "미중 지정학 강도",                 a: "전면 기술 디커플링",       b: "관리된 공존" },
    { df: "DF3", title: "AI 메모리 패러다임 (와일드카드)",  a: "HBM 지속",                 b: "3D DRAM·PIM·CXL 부상" },
  ];
  dfs.forEach((d, i) => {
    const y = ry + 0.55 + i * 1.12;
    s.addText(d.df, {
      x: rx + 0.20, y, w: 0.8, h: 0.4,
      fontSize: 16, bold: true, fontFace: "Arial Black",
      color: C.cyan, margin: 0,
    });
    s.addText(d.title, {
      x: rx + 1.05, y, w: rw - 1.2, h: 0.4,
      fontSize: 12, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0, wrap: true,
    });
    s.addText("Pole A:  " + d.a, {
      x: rx + 0.30, y: y + 0.45, w: rw - 0.5, h: 0.30,
      fontSize: 10, fontFace: "Consolas",
      color: C.cyan, margin: 0,
    });
    s.addText("Pole B:  " + d.b, {
      x: rx + 0.30, y: y + 0.75, w: rw - 0.5, h: 0.30,
      fontSize: 10, fontFace: "Consolas",
      color: C.amber, margin: 0,
    });
  });

  captionFoot(s, "✱ STEEP Agent + DrivingForce Agent의 협업 산출. 점수가 명시적이라 사용자 판단 가능.");
}

// ─── SLIDE 20 — CASE · SCENARIOS ─────────────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · SCENARIOS", 20);
  s.addText("07 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("시나리오 매트릭스 — Mermaid quadrantChart", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 26, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("텍스트 한 블록이 GitHub에서 곧바로 4분면 시각화", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left: actual mermaid code
  addCodePanel(s, 0.6, 2.55, 6.0, 4.0, "scenarios/scenario-matrix.md",
`\`\`\`mermaid
quadrantChart
  title Memory Scenario Matrix
  x-axis AI Bubble Burst --> AI Demand Sustained
  y-axis Managed Coexistence --> Decoupling

  quadrant-1 A · Golden Fortress
  quadrant-2 C · Tech Cold War
  quadrant-3 D · Quiet Reset
  quadrant-4 B · AI Renaissance

  Scenario A: [0.78, 0.78]
  Scenario B: [0.78, 0.22]
  Scenario C: [0.22, 0.78]
  Scenario D: [0.22, 0.22]
\`\`\`

# E · Paradigm Shift  (와일드카드)
DF3 Pole B 실현 시 사분면 미해당`,
    { size: 11, color: C.cyan });

  s.addText("→", {
    x: 6.65, y: 4.30, w: 0.4, h: 0.7,
    fontSize: 32, bold: true, fontFace: "Arial Black",
    color: C.amber, align: "center", valign: "middle", margin: 0,
  });

  // Right: rendered preview (white box with quadrants + probabilities)
  const qx = 7.10, qy = 2.55, qW = 5.65, qH = 4.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: qx, y: qy, w: qW, h: qH,
    fill: { color: "FFFFFF" }, line: { color: C.cyan, width: 1 },
  });
  s.addText("scenario-matrix · GitHub rendering", {
    x: qx, y: qy, w: qW, h: 0.32,
    fontSize: 9, fontFace: "Consolas",
    color: "888888", align: "center", valign: "middle", margin: 0,
  });
  const aX = qx, aY = qy + 0.40, aW = qW, aH = qH - 0.7;
  s.addShape(pres.shapes.LINE, { x: aX + aW / 2, y: aY + 0.15, w: 0, h: aH - 0.3, line: { color: "999999", width: 1 } });
  s.addShape(pres.shapes.LINE, { x: aX + 0.4, y: aY + aH / 2, w: aW - 0.8, h: 0, line: { color: "999999", width: 1 } });
  s.addText("C · Tech Cold War\n10~15%", { x: aX + 0.4, y: aY + 0.4, w: aW / 2 - 0.4, h: 0.65, fontSize: 11, bold: true, fontFace: "Calibri", color: "B91C1C", align: "center", margin: 0 });
  s.addText("A · Golden Fortress\n25~30%", { x: aX + aW / 2, y: aY + 0.4, w: aW / 2 - 0.4, h: 0.65, fontSize: 11, bold: true, fontFace: "Calibri", color: "1D4ED8", align: "center", margin: 0 });
  s.addText("D · Quiet Reset\n20~25%", { x: aX + 0.4, y: aY + aH - 0.95, w: aW / 2 - 0.4, h: 0.65, fontSize: 11, bold: true, fontFace: "Calibri", color: "166534", align: "center", margin: 0 });
  s.addText("B · AI Renaissance ⭐\n30~35%  Main Bet", { x: aX + aW / 2, y: aY + aH - 0.95, w: aW / 2 - 0.4, h: 0.65, fontSize: 12, bold: true, fontFace: "Calibri", color: "C2410C", align: "center", margin: 0 });
  s.addText("← AI Burst        AI Sustained →", { x: aX, y: aY + aH - 0.05, w: aW, h: 0.25, fontSize: 8, fontFace: "Calibri", color: "777777", align: "center", margin: 0 });

  captionFoot(s, "✱ 디자인 도구 없이 Mermaid 한 블록 = GitHub·Notion·VS Code 자동 렌더링.");
}

// ─── SLIDE 21 — CASE · STRATEGY CROSS-CHECK ──────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · STRATEGY", 21);
  s.addText("08 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("Strategy Agent — 7개 사이클 벤치마크 cross-check", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 24, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("산업별 사이클 패턴을 본 권고안에 매핑 — 누락 자동 검출", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Mapping table (7 rows)
  const headerY = 2.55, rowH = 0.50;
  const cols = [
    { x: 0.6,  w: 0.6 },
    { x: 1.25, w: 2.3 },
    { x: 3.60, w: 3.0 },
    { x: 6.65, w: 4.85 },
    { x: 11.55, w: 1.20 },
  ];
  const headers = ["#", "벤치마크 패턴", "대표 사례", "본 권고안 매핑", "상태"];
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: headerY, w: 12.15, h: 0.45,
    fill: { color: C.panel2 }, line: { color: C.panel2 },
  });
  cols.forEach((c, i) => {
    s.addText(headers[i], {
      x: c.x, y: headerY, w: c.w, h: 0.45,
      fontSize: 11, bold: true, fontFace: "Calibri",
      color: C.cyan, valign: "middle", margin: 0,
    });
  });
  const map = [
    ["1", "역(逆)사이클 투자",  "Samsung 2022~23, ExxonMobil-Pioneer", "RS6 (재무 규율), MB-3 (1c nm 다운턴 전환)",  "✅"],
    ["2", "변동비 구조",          "Nucor 전기로 미니밀",                     "RS1 (옵션형 캐파), 롤링 캐파 리뷰",            "✅"],
    ["3", "자산 경량화",          "Marriott · Maersk",                          "RS3 (소프트웨어 구독: FDP·SCADA SW)",          "⚠"],
    ["4", "수직·수평 통합",       "Maersk (해운+물류)",                        "RS2 (바벨 포트폴리오)",                         "✅"],
    ["5", "헤징·장기계약",        "Southwest 연료, Samsung-Tesla",             "RS4 (LTA·Take-or-Pay)",                         "✅"],
    ["6", "요새형 재무",          "Nucor 순부채/EBITDA <1배",                   "RS6, SC-2 (순현금 30조 원 버퍼)",               "✅"],
    ["7", "불황기 M&A",            "Disney-Marvel, ExxonMobil",                 "Option L-4 + SE-1 (3D DRAM M&A 펀드)",          "✅"],
  ];
  map.forEach((r, i) => {
    const y = headerY + 0.45 + i * rowH;
    if (i % 2 === 0) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y, w: 12.15, h: rowH, fill: { color: C.panel }, line: { color: C.panel },
      });
    }
    s.addText(r[0], { x: cols[0].x, y, w: cols[0].w, h: rowH, fontSize: 11, bold: true, fontFace: "Arial Black", color: C.amber, align: "center", valign: "middle", margin: 0 });
    s.addText(r[1], { x: cols[1].x, y, w: cols[1].w, h: rowH, fontSize: 10.5, bold: true, fontFace: "Calibri", color: C.white, valign: "middle", margin: 0, wrap: true });
    s.addText(r[2], { x: cols[2].x, y, w: cols[2].w, h: rowH, fontSize: 10, fontFace: "Calibri", color: C.mid, valign: "middle", margin: 0, wrap: true });
    s.addText(r[3], { x: cols[3].x, y, w: cols[3].w, h: rowH, fontSize: 10, fontFace: "Consolas", color: C.cyan, valign: "middle", margin: 0, wrap: true });
    const statusColor = r[4] === "✅" ? C.green : C.amber;
    s.addText(r[4], { x: cols[4].x, y, w: cols[4].w, h: rowH, fontSize: 14, bold: true, fontFace: "Arial Black", color: statusColor, align: "center", valign: "middle", margin: 0 });
  });

  // Footer note
  s.addText("✱ ⚠ 1건은 Strategy Agent가 자동 검출 → RS3에 \"테슬라 FSD식 SW 구독 모델\" 명문화로 보강", {
    x: 0.6, y: 6.30, w: 12.10, h: 0.30,
    fontSize: 11, italic: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  s.addText("결과: Robust Strategy 6개 + Side Bet 4개 + 9개 즉시 결정", {
    x: 0.6, y: 6.65, w: 12.10, h: 0.35,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.cyan, margin: 0,
  });
}

// ─── SLIDE 22 — CASE · BUILD PIPELINE ────────────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · BUILD", 22);
  s.addText("09 / 10", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("report → slide-outline → PPTX 자동 빌드", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 26, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("outline.md를 단일 진실로 — 차트도 코드, 슬라이드도 코드", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // 3-stage vertical pipeline
  const pX = 1.4, pW = 10.5;
  const stages = [
    { y: 2.55, h: 1.15, num: "1", file: "report/scenario-planning-report.md",  size: "649줄",  detail: "벤치마크 정합성 점검 + Main Bet + Side Bet + Robust 6 + 9 결정",     subtitle: "사람이 읽는 최종 보고서",   color: C.cyan },
    { y: 3.85, h: 1.15, num: "2", file: "presentation/slide-outline.md",        size: "1,137줄",detail: "슬라이드별 텍스트 + 차트 명세 + 레이아웃 + 색상 + 타이포",            subtitle: "25개 슬라이드 명세",        color: C.cyan },
    { y: 5.15, h: 1.30, num: "3", file: "presentation/scripts/generate_pptx.py", size: "2,318줄 Python", detail: "matplotlib 차트 8종 → PNG  +  python-pptx 25슬라이드 빌드  +  template.pptx 색상·폰트 차용", subtitle: "samsung_quarterly · scenario_matrix · iu_matrix ...", color: C.amber },
  ];
  stages.forEach((st, i) => {
    addCard(s, pX, st.y, pW, st.h, { accent: st.color });
    s.addText(st.num, {
      x: pX + 0.25, y: st.y + 0.20, w: 0.7, h: st.h - 0.40,
      fontSize: 28, bold: true, fontFace: "Arial Black",
      color: st.color, valign: "middle", margin: 0,
    });
    s.addText(st.file, {
      x: pX + 1.05, y: st.y + 0.15, w: pW - 3.0, h: 0.40,
      fontSize: 13, bold: true, fontFace: "Consolas",
      color: C.white, margin: 0,
    });
    s.addText(st.size, {
      x: pX + pW - 1.95, y: st.y + 0.15, w: 1.85, h: 0.40,
      fontSize: 11, fontFace: "Consolas",
      color: st.color, align: "right", margin: 0,
    });
    s.addText(st.detail, {
      x: pX + 1.05, y: st.y + 0.55, w: pW - 1.2, h: 0.45,
      fontSize: 11, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
    s.addText(st.subtitle, {
      x: pX + 1.05, y: st.y + st.h - 0.40, w: pW - 1.2, h: 0.30,
      fontSize: 10, italic: true, fontFace: "Calibri",
      color: C.mid, margin: 0,
    });
    if (i < stages.length - 1) {
      s.addText("▼", {
        x: pX, y: st.y + st.h, w: pW, h: 0.20,
        fontSize: 12, bold: true, fontFace: "Arial Black",
        color: C.amber, align: "center", margin: 0,
      });
    }
  });

  s.addText("→  scenario-planning.pptx (다운로드)", {
    x: pX, y: 6.55, w: pW, h: 0.4,
    fontSize: 14, bold: true, italic: true, fontFace: "Calibri",
    color: C.amber, align: "center", margin: 0,
  });
}

// ─── SLIDE 23 — CASE · CONSISTENCY CHAIN (자동화 워크플로우) ────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · CONSISTENCY", 23);
  s.addText("10 / 11", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("변경 정합성 체인 — 한 번 지시 = 두 갈래 동시 갱신", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 24, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("데이터 → 분석 → 전략·보고서 → ① 발표자료(PPTX) + ② 대시보드(Vercel)", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  addCodePanel(s, 0.6, 2.55, 12.10, 4.0, "consistency-chain.txt",
`data/{category}/                          (원시 데이터)
        ↓ Research Agent
analysis/{steep, driving-forces,           (분석)
         scenarios, benchmark}/
        ↓ Strategy Agent
analysis/scenarios/strategy.md             (전략 통합)
        ↓
report/scenario-planning-report.md         (전략 보고서)
        ↓
        ├── ① 발표자료 갈래 ──────────────────────┐
        │       presentation/slide-outline.md       │
        │       → python3 generate_pptx.py          │
        │       → samsung-memory-...pptx            │
        │                                           │
        └── ② 대시보드 갈래 ────────────────────────┤
                dashboard/src/data/indicators.js    │
                dashboard/src/components/           │
                          DecisionTracker.jsx       │
                → cd dashboard && npm run build     │
                                                    │
                          ↓                         │
                git commit + git push origin main ──┘
                          ↓
            ✓ GitHub 동기화   ✓ Vercel 자동 배포 (대시보드)`,
    { size: 11, color: C.light });

  captionFoot(s, "✱ 한 번의 데이터 변경이 양쪽 갈래로 자동 흐름. 발표자가 PPTX와 대시보드를 따로 갱신할 필요 없음.");
}

// ─── SLIDE 24 — CASE · DURABLE RULE (CLAUDE.md로 박제) ─────────────────────
{
  const s = newSlide();
  addChrome(s, "▍ CASE STUDY  04 · RULE", 24);
  s.addText("11 / 11", {
    x: 0.6, y: 0.85, w: 1.6, h: 0.5,
    fontSize: 14, bold: true, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });
  s.addText("자동화 보존 — CLAUDE.md 규칙으로 박제", {
    x: 0.6, y: 1.30, w: 12.0, h: 0.65,
    fontSize: 26, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("자연어 규칙으로 워크플로우를 박제 → 다음 세션도 같은 흐름을 따른다", {
    x: 0.6, y: 1.95, w: 12.0, h: 0.4,
    fontSize: 13, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });

  // Left: CLAUDE.md excerpt
  addCodePanel(s, 0.6, 2.55, 7.0, 4.0, "CLAUDE.md (변경 정합성 체인 발췌)",
`### 변경 정합성 체인 (Continuous Consistency)

데이터·분석·전략·보고서 중 어느 단계든 변경되면
아래 사슬을 따라 두 갈래(① 발표자료 / ② 대시보드)의
하류를 모두 갱신한 뒤 git push 한 번으로 마무리한다.
(push가 Vercel 자동 배포 트리거)

#### 마무리 단계 (모든 변경의 종착점)

1. PPTX 재생성: python3 generate_pptx.py
2. 대시보드 빌드 검증: cd dashboard && npm run build
3. git commit (의미 단위)
4. git push origin main  ← 이 규칙으로 사전 승인됨
5. Vercel 자동 배포 결과 확인

#### 사전 승인 범위
- 본 체인 흐름의 commit + push + Vercel 배포
- 제외: force push, branch 삭제, history rewrite,
       Vercel 환경변수 변경 (매번 별도 확인)`,
    { size: 9.5 });

  // Right: 4 effects
  const rx = 7.75, ry = 2.55;
  s.addText("이 한 섹션이 만들어내는 효과", {
    x: rx, y: ry, w: 5.0, h: 0.4,
    fontSize: 13, bold: true, fontFace: "Calibri",
    color: C.amber, margin: 0,
  });
  const effs = [
    { hd: "다음 세션도 같은 흐름",         body: "auto-loaded CLAUDE.md → 어떤 Claude 세션도 이 워크플로우를 자동 추적" },
    { hd: "사전 승인된 commit + push",     body: "워크플로우 안에서 일어나는 push는 매번 확인 불필요" },
    { hd: "양쪽 갈래 빌드 검증 의무화",     body: "PPTX 스크립트 + dashboard npm build 모두 통과해야 push" },
    { hd: "destructive 작업은 매번 확인",  body: "force push · branch 삭제 · 환경변수 변경은 사전 승인 범위 밖" },
  ];
  effs.forEach((e, i) => {
    const y = ry + 0.55 + i * 0.95;
    s.addText("✱", {
      x: rx, y, w: 0.35, h: 0.35,
      fontSize: 14, bold: true, fontFace: "Calibri",
      color: C.cyan, margin: 0,
    });
    s.addText(e.hd, {
      x: rx + 0.35, y, w: 4.7, h: 0.35,
      fontSize: 12, bold: true, fontFace: "Calibri",
      color: C.white, margin: 0,
    });
    s.addText(e.body, {
      x: rx + 0.35, y: y + 0.37, w: 4.7, h: 0.50,
      fontSize: 10.5, fontFace: "Calibri",
      color: C.light, margin: 0, wrap: true,
    });
  });

  captionFoot(s, "✱ 워크플로우는 코드가 아니라 자연어 규칙으로 박제됨 — Claude 세션·모델·도구가 바뀌어도 행동은 일관됨.");
}

// ═════════════════════════════════════════════════════════════════════════════
//   SLIDE 25 — Q&A / CLOSING
// ═════════════════════════════════════════════════════════════════════════════
{
  const s = newSlide();
  s.addText("▍ THANK YOU  ·  25 / 25", {
    x: 0.6, y: 0.55, w: 8.0, h: 0.35,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: C.cyan, charSpacing: 4, margin: 0,
  });
  s.addText("Questions", {
    x: 0.6, y: 2.10, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.white, margin: 0,
  });
  s.addText("&  Discussion.", {
    x: 0.6, y: 3.30, w: 12.0, h: 1.4,
    fontSize: 84, bold: true, fontFace: "Arial Black",
    color: C.cyan, margin: 0,
  });

  // 3-line takeaway
  s.addText("AI 하네스 = 모델  +  환경.", {
    x: 0.6, y: 4.85, w: 12.0, h: 0.4,
    fontSize: 18, fontFace: "Calibri",
    color: C.light, margin: 0,
  });
  s.addText("산출물은 파일에 남고, 다음 세션이 그 위에 작업합니다.", {
    x: 0.6, y: 5.25, w: 12.0, h: 0.4,
    fontSize: 14, italic: true, fontFace: "Calibri",
    color: C.mid, margin: 0,
  });
  s.addText("$ harness --next-step=your-report", {
    x: 0.6, y: 5.85, w: 12.0, h: 0.35,
    fontSize: 14, fontFace: "Consolas",
    color: C.amber, margin: 0,
  });

  // repo / contact
  s.addText("발표자료 · 코드 · CLAUDE.md · PROMPT.md  ▸  github.com/k31001/action-learning", {
    x: 0.6, y: 6.50, w: 12.0, h: 0.35,
    fontSize: 12, fontFace: "Consolas",
    color: C.cyan, margin: 0,
  });
  s.addText("연락: euihyeok.kwon@gmail.com    ·    소속: 메모리사업부", {
    x: 0.6, y: 6.85, w: 12.0, h: 0.35,
    fontSize: 11, fontFace: "Calibri",
    color: C.muted, margin: 0,
  });
}

// ═════════════════════════════════════════════════════════════════════════════
//   WRITE
// ═════════════════════════════════════════════════════════════════════════════
const outPath = "working-style/seminar-claude-code-report/seminar-claude-code.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✓ Created:", outPath))
  .catch(err => console.error("Error:", err));
