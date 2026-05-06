const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "클로드 코드와 함께 보고서 만들기";

const C = {
  bg: "0D1B2A", orange: "E07B39", mint: "4ECDC4",
  codeBg: "1E2D3D", text: "E8EAF0", green: "56CF77",
  amber: "F4B942", red: "E05757", white: "FFFFFF",
  muted: "8892A0", card: "152535", border: "2A3F55",
  redBg: "2A1820", greenBg: "162A1C",
};

const W = 10, H = 5.625;

// ── helpers ──────────────────────────────────────────────────────────────────
function slide() {
  const s = pres.addSlide();
  s.background = { color: C.bg };
  return s;
}

function title(s, txt, opts = {}) {
  s.addText(txt, {
    x: opts.x ?? 0.4, y: opts.y ?? 0.22, w: opts.w ?? 9.2, h: 0.55,
    fontSize: opts.size ?? 26, bold: true, fontFace: "Arial Black",
    color: opts.color ?? C.text, margin: 0,
  });
}

function body(s, txt, x, y, w, h, opts = {}) {
  s.addText(txt, {
    x, y, w, h,
    fontSize: opts.size ?? 15, fontFace: "Calibri",
    color: opts.color ?? C.text, bold: opts.bold ?? false,
    align: opts.align ?? "left", valign: opts.valign ?? "top",
    wrap: true, margin: 0,
  });
}

function codeBox(s, lines, x, y, w, h, opts = {}) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
  });
  s.addText(lines, {
    x: x + 0.18, y: y + 0.12, w: w - 0.36, h: h - 0.24,
    fontSize: opts.size ?? 11, fontFace: "Courier New",
    color: opts.color ?? C.text, valign: "top", wrap: true, margin: 0,
  });
}

function card(s, x, y, w, h, accent) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.card }, line: { color: accent, width: 2 },
  });
}

function pill(s, txt, x, y, w, color, textColor = C.white) {
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.38, fill: { color }, line: { color },
  });
  s.addText(txt, {
    x, y, w, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri",
    color: textColor, align: "center", valign: "middle", margin: 0,
  });
}

function accentBar(s) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.07, h: H, fill: { color: C.orange }, line: { color: C.orange },
  });
}

function divider(s, y) {
  s.addShape(pres.shapes.LINE, {
    x: 0.4, y, w: 9.2, h: 0,
    line: { color: C.border, width: 1 },
  });
}

function sectionLabel(s, txt, x, y) {
  s.addText(txt, {
    x, y, w: 3, h: 0.3,
    fontSize: 10, fontFace: "Calibri", color: C.orange,
    bold: true, margin: 0, charSpacing: 2,
  });
}

// ── SLIDE 1: 표지 ────────────────────────────────────────────────────────────
{
  const s = slide();
  // subtle grid decoration
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: H, fill: { color: C.bg }, line: { color: C.bg },
  });
  // decorative terminal text bg
  const termLines = [
    "$ claude",
    "> 시나리오 플래닝 보고서를 시작하려고 해.",
    "  CLAUDE.md와 기본 구조를 만들어줘.",
    "",
    "● CLAUDE.md 생성 중...",
    "✓ 디렉토리 구조 생성 완료",
    "✓ git init 완료",
    "",
    "> 시장 데이터를 수집해줘. data/market/에 저장.",
    "",
    "◎ Agent 1 [시장] ████░░  실행 중",
    "◎ Agent 2 [경쟁사] ███░░░  실행 중",
    "◎ Agent 3 [기술] █████░  실행 중",
  ].join("\n");
  codeBox(s, termLines, 4.5, 0.5, 5.2, 4.6, { size: 9, color: "3A5A6A" });

  // left dark overlay
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 5.2, h: H,
    fill: { color: C.bg }, line: { color: C.bg },
  });

  // orange accent left bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.6, w: 0.07, h: 2.4,
    fill: { color: C.orange }, line: { color: C.orange },
  });

  // main title
  s.addText("클로드 코드와 함께", {
    x: 0.65, y: 1.55, w: 4.5, h: 0.75,
    fontSize: 34, bold: true, fontFace: "Arial Black", color: C.text, margin: 0,
  });
  s.addText("보고서 만들기", {
    x: 0.65, y: 2.25, w: 4.5, h: 0.75,
    fontSize: 38, bold: true, fontFace: "Arial Black", color: C.orange, margin: 0,
  });

  s.addText("AI 에이전트로 전략 보고서를 처음부터 끝까지", {
    x: 0.65, y: 3.1, w: 4.4, h: 0.4,
    fontSize: 14, fontFace: "Calibri", color: C.muted, margin: 0,
  });

  divider(s, 3.65);
  s.addText("2026년 5월  |  일하는 방식 세미나", {
    x: 0.65, y: 3.8, w: 4.2, h: 0.35,
    fontSize: 12, fontFace: "Calibri", color: C.muted, margin: 0,
  });
}

// ── SLIDE 2: 오늘 이 시간에 보게 될 것 ─────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "오늘 이 시간에 보게 될 것", { x: 0.55 });
  divider(s, 0.85);

  s.addText("\"이 보고서를 어떻게 만들었는지 보여드립니다\"", {
    x: 0.55, y: 0.9, w: 9.0, h: 0.45,
    fontSize: 16, fontFace: "Calibri", color: C.mint, italic: true, margin: 0,
  });

  // Left: 사용자가 한 것
  s.addText("사용자가 한 것", {
    x: 0.55, y: 1.5, w: 3.2, h: 0.35,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.orange, margin: 0,
  });
  const userActions = [
    { text: "■  한국어로 지시", options: { breakLine: true } },
    { text: "■  전략 판단", options: { breakLine: true } },
    { text: "■  검토·승인", options: {} },
  ];
  s.addText(userActions, {
    x: 0.55, y: 1.9, w: 3.2, h: 1.2,
    fontSize: 15, fontFace: "Calibri", color: C.text,
    lineSpacingMultiple: 1.6, margin: 0,
  });

  // Right: 4 output boxes
  const outputs = [
    ["전략 보고서", "612줄"],
    ["슬라이드 기획서", "25매"],
    ["데이터 파일", "16개"],
    ["Mermaid 다이어그램", "3종"],
  ];
  const cols = [4.5, 7.1];
  const rows = [1.5, 3.1];
  outputs.forEach((o, i) => {
    const x = cols[i % 2], y = rows[Math.floor(i / 2)];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.3, h: 1.3,
      fill: { color: C.card }, line: { color: C.mint, width: 1.5 },
    });
    s.addText(o[0], {
      x: x + 0.15, y: y + 0.2, w: 2.0, h: 0.45,
      fontSize: 13, bold: true, fontFace: "Calibri", color: C.text, margin: 0,
    });
    s.addText(o[1], {
      x: x + 0.15, y: y + 0.68, w: 2.0, h: 0.38,
      fontSize: 22, bold: true, fontFace: "Arial Black", color: C.mint, margin: 0,
    });
  });

  // Bottom banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 4.95, w: 9.2, h: 0.45,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("코딩 없음  ·  복사-붙여넣기 없음  ·  전부 자동 저장", {
    x: 0.4, y: 4.95, w: 9.2, h: 0.45,
    fontSize: 14, bold: true, fontFace: "Calibri",
    color: C.white, align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 3: 보고서에 쓰는 시간 ─────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "지금 우리가 보고서에 쓰는 시간", { x: 0.55 });
  divider(s, 0.85);

  s.addText("전략 보고서 1편 = 평균", {
    x: 0.55, y: 0.95, w: 4.5, h: 0.55,
    fontSize: 18, fontFace: "Calibri", color: C.muted, margin: 0,
  });
  s.addText("6~10일", {
    x: 0.55, y: 1.4, w: 4.5, h: 0.9,
    fontSize: 64, bold: true, fontFace: "Arial Black", color: C.orange, margin: 0,
  });

  // Horizontal bar chart (native)
  const chartData = [{
    name: "작업 시간",
    labels: ["검토·수정\n(1일)", "시각화·슬라이드\n(1~2일)", "초안 작성\n(1~2일)", "자료 수집·정리\n(2~3일)"],
    values: [10, 20, 30, 40],
  }];
  s.addChart(pres.charts.BAR, chartData, {
    x: 0.55, y: 2.4, w: 6.2, h: 2.8,
    barDir: "bar",
    chartColors: ["3A7BD5", "E07B39", "E07B39", "E07B39"],
    chartArea: { fill: { color: C.codeBg } },
    catAxisLabelColor: C.text,
    valAxisLabelColor: C.text,
    valGridLine: { color: C.border, size: 0.5 },
    catGridLine: { style: "none" },
    showValue: true,
    dataLabelColor: C.white,
    dataLabelFontSize: 11,
    showLegend: false,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.0, y: 2.6, w: 2.6, h: 2.4,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("↓ AI가 처리할 수 있는 영역", {
    x: 7.1, y: 2.75, w: 2.4, h: 0.45,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.amber, margin: 0,
  });
  s.addText("반복·기계적 작업", {
    x: 7.1, y: 3.25, w: 2.4, h: 0.35,
    fontSize: 13, fontFace: "Calibri", color: C.text, margin: 0,
  });
  s.addShape(pres.shapes.LINE, { x: 7.1, y: 3.65, w: 2.2, h: 0, line: { color: C.border } });
  s.addText("→ 사람은 전략 판단에 집중", {
    x: 7.1, y: 3.75, w: 2.4, h: 0.45,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.green, margin: 0,
  });
}

// ── SLIDE 4: 챗봇 vs 클로드 코드 비교 ───────────────────────────────────────
{
  const s = slide();
  title(s, "클로드 코드 = 터미널에서 실행되는 AI 에이전트", { x: 0.3 });
  divider(s, 0.85);

  // Left panel (red tint) — chatbot
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.9, w: 4.4, h: 4.4,
    fill: { color: C.redBg }, line: { color: "4A2020", width: 1 },
  });
  s.addText("일반 AI 챗봇", {
    x: 0.5, y: 1.05, w: 4.0, h: 0.4,
    fontSize: 15, bold: true, fontFace: "Calibri", color: "E88080", margin: 0,
  });
  const chatbotFlow = [
    { text: "사용자 → 프롬프트 → 텍스트 생성 → 화면 출력", options: { breakLine: true } },
    { text: "↓ (사용자가 직접 복사·정리)", options: { color: C.muted, breakLine: true, italic: true } },
  ];
  s.addText(chatbotFlow, {
    x: 0.5, y: 1.52, w: 4.0, h: 0.65,
    fontSize: 11, fontFace: "Courier New", color: C.text, margin: 0,
  });
  divider(s, 2.25);
  const limits = [
    "✗  파일에 직접 저장 불가",
    "✗  세션 끊기면 잊어버림",
    "✗  혼자 다 해야 함",
    "✗  수정하면 전체 재생성",
  ];
  limits.forEach((l, i) => {
    s.addText(l, {
      x: 0.5, y: 2.35 + i * 0.42, w: 4.0, h: 0.38,
      fontSize: 13, fontFace: "Calibri", color: "E88080", margin: 0,
    });
  });

  // Right panel (green tint) — Claude Code
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 0.9, w: 4.7, h: 4.4,
    fill: { color: C.greenBg }, line: { color: "1E4A28", width: 1 },
  });
  s.addText("클로드 코드", {
    x: 5.2, y: 1.05, w: 4.2, h: 0.4,
    fontSize: 15, bold: true, fontFace: "Calibri", color: C.green, margin: 0,
  });
  const ccFlow = [
    { text: "사용자 → 지시 → 파일 읽기  → 파일에 저장", options: { breakLine: true } },
    { text: "              → 웹 검색   → git 커밋", options: { breakLine: true } },
    { text: "              → 서브에이전트 → 병렬 처리", options: {} },
  ];
  s.addText(ccFlow, {
    x: 5.2, y: 1.52, w: 4.3, h: 0.65,
    fontSize: 11, fontFace: "Courier New", color: C.text, margin: 0,
  });
  divider(s, 2.25);
  const strengths = [
    "✅  파일 직접 생성·수정",
    "✅  CLAUDE.md로 프로젝트 기억",
    "✅  여러 AI 동시 작업",
    "✅  특정 섹션만 정밀 수정",
  ];
  strengths.forEach((l, i) => {
    s.addText(l, {
      x: 5.2, y: 2.35 + i * 0.42, w: 4.2, h: 0.38,
      fontSize: 13, fontFace: "Calibri", color: C.green, margin: 0,
    });
  });
}

// ── SLIDE 5: 핵심 기능 4가지 ─────────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "보고서 작업에 필요한 핵심 기능 4가지", { x: 0.55 });
  divider(s, 0.85);

  const features = [
    { icon: "📄", label: "파일 직접 접근", sub: "파일 읽기·쓰기", desc: "data/ → 분석 → report/ 자동 생성\n\"보고서가 파일로 저장된다\"", color: C.orange },
    { icon: "🔍", label: "실시간 정보 수집", sub: "웹 검색", desc: "HBM 시장 데이터를 검색해서\ndata/market/hbm-market.md에 저장", color: C.mint },
    { icon: "🤖", label: "병렬 처리", sub: "서브에이전트 ×4", desc: "시장·경쟁사·기술·정책\n4개 리서치 동시 진행", color: C.amber },
    { icon: "🧠", label: "프로젝트 기억", sub: "CLAUDE.md", desc: "한 번 정의하면 모든 세션에서\n형식·규칙 자동 유지", color: C.green },
  ];
  const xs = [0.45, 5.05];
  const ys = [1.0, 3.3];
  features.forEach((f, i) => {
    const x = xs[i % 2], y = ys[Math.floor(i / 2)];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.35, h: 2.05,
      fill: { color: C.card }, line: { color: f.color, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.07, h: 2.05,
      fill: { color: f.color }, line: { color: f.color },
    });
    s.addText(f.icon + "  " + f.sub, {
      x: x + 0.2, y: y + 0.12, w: 4.0, h: 0.38,
      fontSize: 15, bold: true, fontFace: "Calibri", color: f.color, margin: 0,
    });
    s.addText(f.label, {
      x: x + 0.2, y: y + 0.5, w: 4.0, h: 0.32,
      fontSize: 12, fontFace: "Calibri", color: C.muted, margin: 0,
    });
    s.addText(f.desc, {
      x: x + 0.2, y: y + 0.88, w: 4.05, h: 1.0,
      fontSize: 12.5, fontFace: "Calibri", color: C.text, margin: 0, wrap: true,
    });
  });
}

// ── SLIDE 6: CLAUDE.md ───────────────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "CLAUDE.md — AI에게 주는 규칙서", { x: 0.55 });
  divider(s, 0.85);

  // Code block showing CLAUDE.md content
  const claudeContent = `# 프로젝트 가이드라인

## 필수 규칙

### 파일 관리
- 모든 문서는 Markdown 형식
- 수치는 억 → B 형식으로 표기
  ($5,516억 → $551.6B)
- 데이터 추가 시 metadata.md 업데이트
- 모든 변경사항은 git commit

### 언어
- 모든 문서는 한국어 작성
  (기술 용어는 영어 병기 허용)`;
  codeBox(s, claudeContent, 0.45, 0.95, 4.8, 4.4, { size: 11 });

  // Annotation callouts
  const annotations = [
    { y: 1.05, text: "① 매번 말 안 해도 자동 적용", sub: "\"모든 문서는 한국어 작성\"", color: C.orange },
    { y: 2.05, text: "② 수치 형식 자동 통일", sub: "$5,516억 → $551.6B", color: C.mint },
    { y: 3.0, text: "③ 후속 작업까지 자동화", sub: "metadata.md 자동 업데이트", color: C.amber },
    { y: 4.0, text: "④ 버전 관리 자동 실행", sub: "git commit 자동 처리", color: C.green },
  ];
  annotations.forEach(a => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.55, y: a.y, w: 4.1, h: 0.78,
      fill: { color: C.card }, line: { color: a.color, width: 1.5 },
    });
    s.addShape(pres.shapes.LINE, {
      x: 5.27, y: a.y + 0.39, w: 0.28, h: 0,
      line: { color: a.color, width: 1.5 },
    });
    s.addText(a.text, {
      x: 5.7, y: a.y + 0.06, w: 3.8, h: 0.3,
      fontSize: 12.5, bold: true, fontFace: "Calibri", color: a.color, margin: 0,
    });
    s.addText(a.sub, {
      x: 5.7, y: a.y + 0.38, w: 3.8, h: 0.28,
      fontSize: 11, fontFace: "Courier New", color: C.muted, margin: 0,
    });
  });
}

// ── SLIDE 7: 서브에이전트 플로우 ──────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "서브에이전트 — 여러 AI가 동시에 일한다", { x: 0.55 });
  divider(s, 0.85);

  // User instruction box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.3, y: 0.95, w: 3.4, h: 0.55,
    fill: { color: C.codeBg }, line: { color: C.orange, width: 1.5 },
  });
  s.addText("\"시장·경쟁사·기술·정책 환경을 조사해줘\"", {
    x: 3.3, y: 0.95, w: 3.4, h: 0.55,
    fontSize: 11, fontFace: "Courier New", color: C.text,
    align: "center", valign: "middle", margin: 0,
  });

  // Arrow down
  s.addShape(pres.shapes.LINE, { x: 5.0, y: 1.5, w: 0, h: 0.3, line: { color: C.muted, width: 1.5 } });

  // Main agent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 1.8, w: 3.0, h: 0.5,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("클로드 코드 메인 에이전트", {
    x: 3.5, y: 1.8, w: 3.0, h: 0.5,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });

  // 4 agents
  const agents = [
    { label: "에이전트 1\n시장 데이터", x: 0.4, color: C.mint },
    { label: "에이전트 2\n경쟁사 분석", x: 2.75, color: C.amber },
    { label: "에이전트 3\n기술 트렌드", x: 5.1, color: C.green },
    { label: "에이전트 4\n정책 환경", x: 7.45, color: "9B59B6" },
  ];
  agents.forEach(a => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: a.x, y: 2.9, w: 2.2, h: 0.75,
      fill: { color: C.card }, line: { color: a.color, width: 2 },
    });
    s.addText(a.label, {
      x: a.x + 0.1, y: 2.9, w: 2.0, h: 0.75,
      fontSize: 11.5, bold: true, fontFace: "Calibri", color: a.color,
      align: "center", valign: "middle", margin: 0,
    });
    // line from main to agent
    s.addShape(pres.shapes.LINE, {
      x: a.x + 1.1, y: 2.3, w: 0, h: 0.6,
      line: { color: C.border, width: 1 },
    });
  });
  s.addText("(동시 실행)", {
    x: 0.4, y: 3.7, w: 9.2, h: 0.3,
    fontSize: 11, fontFace: "Calibri", color: C.muted,
    align: "center", italic: true, margin: 0,
  });

  // Result merge
  s.addShape(pres.shapes.LINE, { x: 5.0, y: 4.05, w: 0, h: 0.3, line: { color: C.muted, width: 1.5 } });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.2, y: 4.35, w: 3.6, h: 0.5,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("결과 통합 → 보고서", {
    x: 3.2, y: 4.35, w: 3.6, h: 0.5,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.darkText ?? "0D1B2A",
    align: "center", valign: "middle", margin: 0,
  });

  // Time comparison
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.5, y: 2.85, w: 2.15, h: 1.8,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("순차 처리\n4시간", {
    x: 7.55, y: 2.9, w: 2.0, h: 0.8,
    fontSize: 12, fontFace: "Calibri", color: C.red,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("→ 병렬 처리\n1시간", {
    x: 7.55, y: 3.7, w: 2.0, h: 0.8,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.green,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 8: 데모 1 — 프로젝트 초기화 ───────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  // Demo label
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("🎬 데모 1", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "프로젝트 초기화", { x: 2.1, y: 0.18 });

  const termContent = `$ cd my-report
$ claude

╔════════════════════════════════════════╗
║  Claude Code                           ║
║  claude-sonnet-4-5                     ║
╚════════════════════════════════════════╝

> 안녕하세요! 어떤 작업을 도와드릴까요?



> 시나리오 플래닝 보고서 프로젝트를 시작하려고 해.
  CLAUDE.md와 기본 디렉토리 구조를 만들어줘.`;
  codeBox(s, termContent, 0.45, 0.72, 9.1, 4.6, { size: 13 });

  // Highlight the user input
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.05, w: 9.1, h: 1.05,
    fill: { color: "1A3020", transparency: 0 }, line: { color: C.orange, width: 1.5 },
  });
  s.addText("> 시나리오 플래닝 보고서 프로젝트를 시작하려고 해.\n  CLAUDE.md와 기본 디렉토리 구조를 만들어줘.", {
    x: 0.65, y: 4.1, w: 8.7, h: 0.9,
    fontSize: 13, fontFace: "Courier New", color: C.green, margin: 0, wrap: true,
  });

  s.addText("이게 전부입니다. 한국어로 지시하면 됩니다.", {
    x: 0.45, y: 5.25, w: 9.1, h: 0.3,
    fontSize: 11, fontFace: "Calibri", color: C.amber,
    align: "center", margin: 0,
  });
}

// ── SLIDE 9: 데모 1 — CLAUDE.md 생성 결과 ────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("🎬 데모 1", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "CLAUDE.md 생성 결과", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  // Terminal output (left)
  const termOutput = `● CLAUDE.md 생성 중...
✓ CLAUDE.md 작성 완료
✓ data/ 디렉토리 생성
✓ analysis/ 디렉토리 생성
✓ report/ 디렉토리 생성
✓ presentation/ 디렉토리 생성
✓ git init 완료
✓ Initial commit`;
  codeBox(s, termOutput, 0.45, 0.82, 4.7, 3.2, { size: 12, color: C.green });

  // File tree (right)
  const fileTree = `my-report/
├── CLAUDE.md   ← 새로 생성
├── PROMPT.md   ← 새로 생성
├── data/
├── analysis/
├── report/
└── presentation/`;
  codeBox(s, fileTree, 5.35, 0.82, 4.2, 3.2, { size: 12 });

  // Labels
  s.addText("터미널 출력", { x: 0.45, y: 4.1, w: 4.7, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });
  s.addText("디렉토리 구조", { x: 5.35, y: 4.1, w: 4.2, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.5, w: 9.1, h: 0.5,
    fill: { color: C.card }, line: { color: C.orange, width: 1.5 },
  });
  s.addText("한 번의 지시로 프로젝트 뼈대 완성 + git 버전관리 시작", {
    x: 0.45, y: 4.5, w: 9.1, h: 0.5,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.orange,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 10: 데모 1 — 데이터 수집 지시 ─────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("🎬 데모 1", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "데이터 수집 지시", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  // Prompt input box
  const promptTxt = `> HBM 시장 데이터를 수집해줘.
  2024~2028년 시장 규모($B 단위), 업체별 점유율,
  가격 트렌드를 포함해서
  data/market/hbm-market.md에 저장하고
  data/metadata.md에 항목 추가해줘.
  출처는 TrendForce, Yole, BofA 등 공신력 있는 곳으로.`;
  codeBox(s, promptTxt, 0.45, 0.82, 9.1, 2.1, { size: 13, color: C.green });

  // 4 annotation cards
  const anns = [
    { num: "①", label: "파일 위치 지정", desc: "data/market/hbm-market.md에 저장", color: C.orange },
    { num: "②", label: "형식 지정", desc: "$B 단위로 통일", color: C.mint },
    { num: "③", label: "후속 작업 연결", desc: "metadata.md 자동 업데이트", color: C.amber },
    { num: "④", label: "출처 기준 제시", desc: "TrendForce, Yole, BofA", color: C.green },
  ];
  anns.forEach((a, i) => {
    const x = 0.45 + i * 2.3;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 3.15, w: 2.15, h: 1.85,
      fill: { color: C.card }, line: { color: a.color, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.1, y: 3.25, w: 0.38, h: 0.38,
      fill: { color: a.color }, line: { color: a.color },
    });
    s.addText(a.num, {
      x: x + 0.1, y: 3.25, w: 0.38, h: 0.38,
      fontSize: 13, bold: true, fontFace: "Calibri", color: C.white,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(a.label, {
      x: x + 0.12, y: 3.7, w: 1.9, h: 0.35,
      fontSize: 12, bold: true, fontFace: "Calibri", color: a.color, margin: 0,
    });
    s.addText(a.desc, {
      x: x + 0.12, y: 4.1, w: 1.9, h: 0.75,
      fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0, wrap: true,
    });
  });
}

// ── SLIDE 11: 데모 1 — 데이터 수집 결과 ─────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("🎬 데모 1", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "데이터 수집 결과", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const hbmContent = `# HBM 시장 현황 및 전망

## 시장 규모
| 연도 | 시장 규모 | YoY  |
|------|----------|------|
| 2024 | $18.6B   | +82% |
| 2025 | ~$34B    | +83% |
| 2026 | ~$54.6B  | +61% |
| 2027 | ~$79.2B  | +45% |
| 2028 | ~$110B   | +39% |
(출처: TrendForce, BofA, 2026)`;
  codeBox(s, hbmContent, 0.45, 0.82, 5.0, 3.6, { size: 11 });

  const metaContent = `### hbm-market.md
- **수집일**: 2026-05-05
- **신뢰도**: High
- **태그**: #HBM #AI #market
- **출처**: Yole, BofA, Counterpoint
- **요약**: 2025년 ~$34B, AI 수요로
  2028년 ~$110B까지 성장 전망.
  삼성·SK하이닉스·마이크론 3강.`;
  codeBox(s, metaContent, 5.65, 0.82, 3.9, 3.6, { size: 11 });

  s.addText("생성된 hbm-market.md", { x: 0.45, y: 4.5, w: 5.0, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });
  s.addText("metadata.md 자동 업데이트", { x: 5.65, y: 4.5, w: 3.9, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", margin: 0 });

  // highlight points
  const pts = ["출처 자동 기입", "$B 형식 통일", "날짜 자동 기입"];
  pts.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.45 + i * 3.05, y: 4.88, w: 2.9, h: 0.45,
      fill: { color: C.codeBg }, line: { color: C.mint, width: 1 },
    });
    s.addText("✓ " + p, {
      x: 0.45 + i * 3.05, y: 4.88, w: 2.9, h: 0.45,
      fontSize: 12, fontFace: "Calibri", color: C.mint,
      align: "center", valign: "middle", margin: 0,
    });
  });
}

// ── SLIDE 12: 데모 2 — 서브에이전트 병렬 실행 ───────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.mint }, line: { color: C.mint },
  });
  s.addText("🎬 데모 2", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "서브에이전트 병렬 실행", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const cmdTxt = `> 시장·경쟁사·기술·정책 4개 영역을 동시에 조사해줘.
  각각 별도 에이전트로 병렬 처리해줘.`;
  codeBox(s, cmdTxt, 0.45, 0.82, 9.1, 0.85, { size: 13, color: C.green });

  // Progress bars
  const agents = [
    { label: "Agent 1  [시장 데이터]", pct: 70, color: C.mint },
    { label: "Agent 2  [경쟁사 분석]", pct: 55, color: C.amber },
    { label: "Agent 3  [기술 트렌드]", pct: 80, color: C.green },
    { label: "Agent 4  [정책 환경]  ", pct: 40, color: "9B59B6" },
  ];
  codeBox(s, "", 0.45, 1.82, 9.1, 2.7);
  agents.forEach((a, i) => {
    const barY = 1.98 + i * 0.57;
    s.addText("◎ " + a.label, {
      x: 0.65, y: barY, w: 3.5, h: 0.32,
      fontSize: 12, fontFace: "Courier New", color: a.color, margin: 0,
    });
    // bar bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.3, y: barY + 0.04, w: 4.0, h: 0.24,
      fill: { color: "0A1520" }, line: { color: C.border, width: 1 },
    });
    // bar fill
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.3, y: barY + 0.04, w: 4.0 * a.pct / 100, h: 0.24,
      fill: { color: a.color }, line: { color: a.color },
    });
    s.addText("실행 중...", {
      x: 8.45, y: barY, w: 1.0, h: 0.3,
      fontSize: 11, fontFace: "Courier New", color: C.muted, margin: 0,
    });
  });

  // Timer comparison
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.65, w: 4.35, h: 0.65,
    fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
  });
  s.addText("경과 시간: 0:02:34", {
    x: 0.55, y: 4.68, w: 4.15, h: 0.28,
    fontSize: 12, fontFace: "Courier New", color: C.amber, margin: 0,
  });
  s.addText("순차 처리였다면: ~0:12:00 예상", {
    x: 0.55, y: 4.97, w: 4.15, h: 0.28,
    fontSize: 12, fontFace: "Courier New", color: C.muted, margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.0, y: 4.65, w: 4.55, h: 0.65,
    fill: { color: C.card }, line: { color: C.green, width: 1.5 },
  });
  s.addText("⚡ 75% 시간 단축", {
    x: 5.1, y: 4.68, w: 4.3, h: 0.55,
    fontSize: 18, bold: true, fontFace: "Arial Black", color: C.green,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 13: 데모 2 — 보고서 생성 지시 ─────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.mint }, line: { color: C.mint },
  });
  s.addText("🎬 데모 2", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "보고서 생성 지시", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const inputTxt = `> @data/ 디렉토리의 수집된 데이터를 기반으로
  시나리오 플래닝 보고서를 작성해줘.
  Shell 방법론으로, STEEP 분석부터
  5개 시나리오까지 포함해서
  report/scenario-planning-report.md에 저장해줘.`;
  codeBox(s, inputTxt, 0.45, 0.82, 9.1, 1.65, { size: 13, color: C.green });

  const processTxt = `● 16개 데이터 파일 읽는 중...
● STEEP 요인 50개 도출 중...
● 드라이빙 포스 분석 중...
● 시나리오 매트릭스 구성 중...
● 5개 시나리오 내러티브 작성 중...
● 전략 권고안 (RS1~RS6) 작성 중...
✓ 완료: 612줄 / 약 18,000자`;
  codeBox(s, processTxt, 0.45, 2.62, 9.1, 2.1, { size: 12, color: C.text });

  // final stat
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.85, w: 9.1, h: 0.52,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("$ wc -l report/scenario-planning-report.md    →    612  lines", {
    x: 0.45, y: 4.85, w: 9.1, h: 0.52,
    fontSize: 14, fontFace: "Courier New", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 14: 데모 2 — 생성된 보고서 확인 ────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.mint }, line: { color: C.mint },
  });
  s.addText("🎬 데모 2", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "생성된 보고서 확인", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const sections = [
    { label: "Executive Summary", content: "Main Bet: B 시나리오 (AI 르네상스)\n30~35% 확률, Robust 전략 RS1~RS6\n'어떤 시나리오에서도 생존'" },
    { label: "STEEP 분석", content: "Social / Technology / Environment\nEconomy / Political\n50개 요인 → 핵심 2개 도출" },
    { label: "시나리오 매트릭스", content: "DF1(AI 수요) × DF2(미중관계)\nA 황금 요새 / B AI 르네상스\nC 기술 냉전 / D 조용한 재편" },
    { label: "전략 권고안", content: "RS1 옵션형 캐파 체계\nRS2 바벨 포트폴리오\nRS3~RS6 고객·공급망·재무" },
  ];
  const xs2 = [0.45, 5.15];
  const ys2 = [0.88, 3.2];
  sections.forEach((sec, i) => {
    const x = xs2[i % 2], y = ys2[Math.floor(i / 2)];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.45, h: 2.1,
      fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.45, h: 0.42,
      fill: { color: C.card }, line: { color: C.border, width: 1 },
    });
    s.addText(sec.label, {
      x: x + 0.15, y: y + 0.05, w: 4.1, h: 0.32,
      fontSize: 12, bold: true, fontFace: "Calibri", color: C.orange, margin: 0,
    });
    s.addText(sec.content, {
      x: x + 0.15, y: y + 0.5, w: 4.1, h: 1.5,
      fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0, wrap: true,
    });
  });

  s.addText("총 612줄  ·  16개 데이터 출처  ·  Mermaid 다이어그램 포함", {
    x: 0.45, y: 5.3, w: 9.1, h: 0.28,
    fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", margin: 0,
  });
}

// ── SLIDE 15: 데모 2 — 수정 지시 (정밀 편집) ─────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.mint }, line: { color: C.mint },
  });
  s.addText("🎬 데모 2", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "수정 지시 — 특정 섹션만 정밀 편집", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const editCmd = `> @report/scenario-planning-report.md의 Section 8.2
  Call to Action을 부문별로 재작성해줘.
  전략기획/마케팅/인사/제조/연구/개발 6개 부문 각각
  즉시 행동 과제 3~4개씩.`;
  codeBox(s, editCmd, 0.45, 0.82, 9.1, 1.25, { size: 12, color: C.green });

  // Before
  s.addText("BEFORE", { x: 0.45, y: 2.2, w: 4.4, h: 0.3, fontSize: 11, bold: true, fontFace: "Calibri", color: C.red, margin: 0 });
  const beforeTxt = `[즉시 결정 #1] HBM4 수율 전쟁...
[즉시 결정 #2] HBM 사업부 독립 P&L...
[즉시 결정 #3] 대안적 미래 거버넌스...
(3개 일반 지시)`;
  codeBox(s, beforeTxt, 0.45, 2.52, 4.4, 1.65, { size: 11, color: C.muted });

  // Arrow
  s.addText("→", { x: 4.95, y: 3.1, w: 0.5, h: 0.5, fontSize: 22, bold: true, fontFace: "Arial Black", color: C.orange, align: "center", margin: 0 });

  // After
  s.addText("AFTER", { x: 5.55, y: 2.2, w: 4.0, h: 0.3, fontSize: 11, bold: true, fontFace: "Calibri", color: C.green, margin: 0 });
  const afterTxt = `#### 🏢 전략기획 부문
1. RS1·RS4·RS6 이사회 정책화
2. 시나리오 전환 트리거 거버넌스
3. 텍사스 2기 보조금 신청 착수
...× 6개 부문`;
  codeBox(s, afterTxt, 5.55, 2.52, 4.0, 1.65, { size: 11, color: C.green });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.32, w: 9.1, h: 0.45,
    fill: { color: C.card }, line: { color: C.mint, width: 1.5 },
  });
  s.addText("전체 재생성 없이 특정 섹션만 교체 — 나머지는 그대로 보존", {
    x: 0.45, y: 4.32, w: 9.1, h: 0.45,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.mint,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 16: 데모 3 — Mermaid quadrantChart ──────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("🎬 데모 3", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "Mermaid 다이어그램 생성", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  // Left: user instruction
  s.addText("사용자 지시", { x: 0.45, y: 0.85, w: 4.0, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.muted, margin: 0 });
  const instrTxt = `> 시나리오 매트릭스를
  Mermaid quadrantChart로
  만들어줘.
  X축은 AI 수요,
  Y축은 미중관계.`;
  codeBox(s, instrTxt, 0.45, 1.18, 4.0, 2.1, { size: 13, color: C.green });

  // Arrow
  s.addText("→", { x: 4.55, y: 2.05, w: 0.5, h: 0.5, fontSize: 22, bold: true, fontFace: "Arial Black", color: C.orange, align: "center", margin: 0 });

  // Right: generated diagram mockup
  s.addText("렌더링 결과", { x: 5.15, y: 0.85, w: 4.4, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.muted, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.15, y: 1.18, w: 4.4, h: 3.8,
    fill: { color: "FFFFFF" }, line: { color: C.border, width: 1 },
  });
  // Axes
  s.addShape(pres.shapes.LINE, { x: 5.55, y: 4.5, w: 3.6, h: 0, line: { color: "888888", width: 1.5 } });
  s.addShape(pres.shapes.LINE, { x: 5.55, y: 1.45, w: 0, h: 3.05, line: { color: "888888", width: 1.5 } });
  // Quadrant labels
  s.addText("A 황금 요새", { x: 7.25, y: 1.5, w: 2.1, h: 0.35, fontSize: 10, fontFace: "Calibri", color: "3355AA", bold: true, margin: 0 });
  s.addText("B AI 르네상스 ⭐", { x: 7.25, y: 3.5, w: 2.1, h: 0.35, fontSize: 10, fontFace: "Calibri", color: "E07B39", bold: true, margin: 0 });
  s.addText("C 기술 냉전", { x: 5.6, y: 1.5, w: 2.0, h: 0.35, fontSize: 10, fontFace: "Calibri", color: "AA3333", bold: true, margin: 0 });
  s.addText("D 조용한 재편", { x: 5.6, y: 3.5, w: 2.0, h: 0.35, fontSize: 10, fontFace: "Calibri", color: "336633", bold: true, margin: 0 });
  // Axis labels
  s.addText("← AI 거품 붕괴        AI 수요 지속 →", { x: 5.6, y: 4.6, w: 3.5, h: 0.25, fontSize: 8, fontFace: "Calibri", color: "666666", margin: 0 });
  s.addText("미중 디커플링 ↑\n\n관리된 공존 ↓", { x: 5.15, y: 1.5, w: 0.38, h: 2.8, fontSize: 8, fontFace: "Calibri", color: "666666", margin: 0, wrap: true });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.08, w: 9.1, h: 0.38,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("이미지 편집 도구 불필요 — 코드 10줄로 전문가급 다이어그램", {
    x: 0.45, y: 5.08, w: 9.1, h: 0.38,
    fontSize: 12, fontFace: "Calibri", color: C.mint, align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 17: 데모 3 — flowchart 상호의존 관계도 ─────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("🎬 데모 3", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "flowchart — RS 전략 상호의존 관계도", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  // Left: code
  const flowCode = `flowchart TD
  AI["🤖 AI 개발 효율화
  (선행 조건)"]
  -->|잉여 인력 전환| RS2
  AI -->|잉여 인력 전환| RS3
  RS6 -->|집행 기준 제공| RS1
  RS1 -->|유연한 공급| RS2
  RS4 -->|고객 다변화| RS3
  RS5 -->|지역 거점| RS4
  RS6 -->|초과이익→R&D| RS2
  RS6 -->|초과이익→패키징| RS3`;
  codeBox(s, flowCode, 0.45, 0.82, 4.5, 4.5, { size: 11 });

  // Right: flowchart mockup
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 0.82, w: 4.5, h: 4.5,
    fill: { color: "F8F8F8" }, line: { color: C.border, width: 1 },
  });
  // AI box (top center)
  s.addShape(pres.shapes.RECTANGLE, { x: 6.35, y: 1.1, w: 2.0, h: 0.7, fill: { color: "FFF3E0" }, line: { color: C.orange, width: 2 } });
  s.addText("🤖 AI 효율화\n(선행 조건)", { x: 6.35, y: 1.1, w: 2.0, h: 0.7, fontSize: 9.5, fontFace: "Calibri", color: "333333", align: "center", valign: "middle", margin: 0 });

  const rsNodes = [
    { label: "RS1\n캐파", x: 5.25, y: 2.5, color: "E3F2FD" },
    { label: "RS2\n바벨", x: 6.35, y: 3.6, color: "E8F5E9" },
    { label: "RS3\n고객화", x: 7.45, y: 2.5, color: "F3E5F5" },
    { label: "RS4\n분산", x: 8.55, y: 3.6, color: "FFF8E1" },
    { label: "RS5\n공급망", x: 8.55, y: 2.5, color: "FCE4EC" },
    { label: "RS6\n재무", x: 5.25, y: 3.6, color: "E0F2F1" },
  ];
  rsNodes.forEach(n => {
    s.addShape(pres.shapes.RECTANGLE, { x: n.x, y: n.y, w: 0.9, h: 0.65, fill: { color: n.color }, line: { color: "AAAAAA", width: 1 } });
    s.addText(n.label, { x: n.x, y: n.y, w: 0.9, h: 0.65, fontSize: 9, fontFace: "Calibri", color: "333333", align: "center", valign: "middle", margin: 0 });
  });

  s.addText("관계 구조를 이해하고 시각화까지 — 한 번의 지시로 완성", {
    x: 0.45, y: 5.38, w: 9.1, h: 0.22,
    fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", margin: 0,
  });
}

// ── SLIDE 18: 데모 3 — git 버전 관리 ─────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("🎬 데모 3", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "git 버전 관리 자동화", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const gitLog = `$ git log --oneline

1e44831 Add seminar content (seminar-claude-code-report)
c74e59c 시나리오 매트릭스: quadrantChart 교체
5844ab8 대규모 멀티파일 수정: Mermaid·숫자형식
405e187 경쟁사 투자 전략 섹션 추가
5dce379 PROMPT.md 누락 로깅
b41c46b NVIDIA CMX·SCADA 전략 반영
de3737f CMX/SCADA 기술 데이터 추가`;
  codeBox(s, gitLog, 0.45, 0.88, 4.6, 4.05, { size: 11 });

  // GitHub-style commit list (right)
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 0.88, w: 4.4, h: 4.05,
    fill: { color: "F6F8FA" }, line: { color: "D1D5DA", width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 0.88, w: 4.4, h: 0.42,
    fill: { color: "EAECEF" }, line: { color: "D1D5DA", width: 1 },
  });
  s.addText("k31001 / action-learning", {
    x: 5.3, y: 0.93, w: 4.2, h: 0.3,
    fontSize: 11, bold: true, fontFace: "Calibri", color: "24292E", margin: 0,
  });

  const commits = [
    "1e44831  Add seminar content",
    "c74e59c  시나리오 매트릭스 교체",
    "5844ab8  대규모 멀티파일 수정",
    "405e187  경쟁사 투자 전략 추가",
    "b41c46b  NVIDIA CMX·SCADA 반영",
  ];
  commits.forEach((c, i) => {
    s.addShape(pres.shapes.LINE, { x: 5.2, y: 1.3 + i * 0.52, w: 4.4, h: 0, line: { color: "D1D5DA", width: 0.5 } });
    s.addText(c, {
      x: 5.3, y: 1.35 + i * 0.52, w: 4.1, h: 0.35,
      fontSize: 10.5, fontFace: "Courier New", color: "24292E", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.07, w: 9.1, h: 0.45,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("모든 수정사항이 자동으로 commit — 언제든 이전 버전으로 복원 가능", {
    x: 0.45, y: 5.07, w: 9.1, h: 0.45,
    fontSize: 13, fontFace: "Calibri", color: C.mint, align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 19: 데모 3 — PROMPT.md 이력 ────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("🎬 데모 3", {
    x: 0.45, y: 0.18, w: 1.5, h: 0.38,
    fontSize: 12, bold: true, fontFace: "Calibri", color: C.bg,
    align: "center", valign: "middle", margin: 0,
  });
  title(s, "PROMPT.md — 모든 지시가 기록된다", { x: 2.1, y: 0.18 });
  divider(s, 0.72);

  const promptContent = `## 2026-05-05: Bet 전략 심화 지시

전략 보고서의 Bet 전략 부분을
다음 7개 방향으로 수정 요청:
1. 옵션형 캐파 체계...
2. HBM 초과이익 재투자...

---

## 2026-05-05: NVIDIA CMX·SCADA 추가

@data/technology 기술 부문에
최근 NVIDIA CMX, SCADA 관련 내용 추가...
→ nvidia-cmx-scada.md 신규 생성
→ strategy.md: MB-4 CMX 에코시스템 참여 추가`;
  codeBox(s, promptContent, 0.45, 0.88, 6.5, 4.1, { size: 11 });

  // Right info panel
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.15, y: 0.88, w: 2.5, h: 1.95,
    fill: { color: C.card }, line: { color: C.orange, width: 1.5 },
  });
  s.addText("PROMPT.md 역할", { x: 7.25, y: 0.98, w: 2.3, h: 0.35, fontSize: 12, bold: true, fontFace: "Calibri", color: C.orange, margin: 0 });
  const roles = ["날짜별 지시 기록", "다음 세션 참조", "히스토리 추적", "의사결정 로그"];
  roles.forEach((r, i) => {
    s.addText("• " + r, { x: 7.25, y: 1.38 + i * 0.35, w: 2.3, h: 0.3, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.15, y: 2.98, w: 2.5, h: 2.0,
    fill: { color: C.card }, line: { color: C.mint, width: 1.5 },
  });
  s.addText("자동 로깅 규칙", { x: 7.25, y: 3.08, w: 2.3, h: 0.35, fontSize: 12, bold: true, fontFace: "Calibri", color: C.mint, margin: 0 });
  s.addText("CLAUDE.md에 정의:\n\"모든 사용자 지시는\nPROMPT.md에 누적 기록\"", { x: 7.25, y: 3.48, w: 2.3, h: 1.3, fontSize: 11, fontFace: "Calibri", color: C.text, margin: 0, wrap: true });
}

// ── SLIDE 20: 실제 산출물 — 보고서 ───────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "실제 산출물: 삼성전자 메모리사업부 시나리오 플래닝 보고서", { x: 0.55, size: 20 });
  divider(s, 0.72);

  // TOC-style report preview
  const reportStructure = [
    { sec: "1. Executive Summary", detail: "Main Bet B 시나리오, RS1~RS6 요약" },
    { sec: "2. Focal Issue 정의", detail: "지속 성장 가능한 경쟁 우위 확보" },
    { sec: "3. STEEP 분석", detail: "50개 요인, Impact×Uncertainty 매트릭스" },
    { sec: "4. 드라이빙 포스", detail: "DF1(AI 수요), DF2(미중 디커플링)" },
    { sec: "5. 시나리오 매트릭스", detail: "2×2, 5개 시나리오 내러티브" },
    { sec: "6. Main Bet + Side Bet", detail: "B 시나리오 30~35%, RS1~RS6" },
    { sec: "7. EWI & 모니터링", detail: "Early Warning Indicators 12개" },
    { sec: "8. 전략 실행 로드맵", detail: "부문별 Call to Action, 6개 부문" },
  ];
  reportStructure.forEach((r, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = 0.55 + col * 4.55, y = 0.92 + row * 1.12;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.3, h: 1.0,
      fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.07, h: 1.0,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(r.sec, { x: x + 0.18, y: y + 0.1, w: 4.0, h: 0.38, fontSize: 12, bold: true, fontFace: "Calibri", color: C.orange, margin: 0 });
    s.addText(r.detail, { x: x + 0.18, y: y + 0.52, w: 4.0, h: 0.35, fontSize: 11, fontFace: "Calibri", color: C.muted, margin: 0 });
  });

  // Stats bar
  const stats = ["612줄", "8개 섹션", "16개 출처", "3개 Mermaid"];
  stats.forEach((st, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55 + i * 2.28, y: 5.2, w: 2.13, h: 0.3,
      fill: { color: C.card }, line: { color: C.border, width: 1 },
    });
    s.addText("✓ " + st, {
      x: 0.55 + i * 2.28, y: 5.2, w: 2.13, h: 0.3,
      fontSize: 11, fontFace: "Calibri", color: C.green,
      align: "center", valign: "middle", margin: 0,
    });
  });
}

// ── SLIDE 21: 실제 산출물 — 슬라이드 기획서 ─────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "실제 산출물: 25매 슬라이드 기획서", { x: 0.55 });
  divider(s, 0.72);

  const outlineContent = `## 슬라이드 3: Executive Summary

레이아웃: 3개 핵심 메시지 카드
목적: 결론 선행 구조, "Why Now" 명확화

콘텐츠:
[카드 1 — 블루] ① 위기의 역설
  AI 붐이 가장 위험한 순간
[카드 2 — 오렌지 ★] ② Main Bet
  B 시나리오 30~35% 확률
[카드 3 — 그린] ③ Robust 전략
  RS1~RS6 어떤 미래에도 생존

스피커 노트:
"결론부터 말씀드립니다..."

디자인 지침:
- 카드 2 오렌지 배경 (강조)`;
  codeBox(s, outlineContent, 0.45, 0.88, 5.5, 4.45, { size: 11 });

  // Right: annotation
  const anns = [
    { label: "← 레이아웃 명세", color: C.orange },
    { label: "← 목적 정의", color: C.mint },
    { label: "← 콘텐츠 상세", color: C.amber },
    { label: "← 발표자 노트", color: C.green },
    { label: "← 디자인 가이드", color: "9B59B6" },
  ];
  anns.forEach((a, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.15, y: 1.08 + i * 0.8, w: 3.4, h: 0.55,
      fill: { color: C.card }, line: { color: a.color, width: 1.5 },
    });
    s.addText(a.label, {
      x: 6.25, y: 1.08 + i * 0.8, w: 3.2, h: 0.55,
      fontSize: 13, bold: true, fontFace: "Calibri", color: a.color,
      valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.18, w: 9.1, h: 0.32,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("25매 슬라이드 × 6개 항목(레이아웃/목적/콘텐츠/시각자료/디자인/노트)", {
    x: 0.45, y: 5.18, w: 9.1, h: 0.32,
    fontSize: 11, fontFace: "Calibri", color: C.muted, align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 22: Before / After 시간 비교 ──────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "Before / After — 보고서 작업 시간", { x: 0.55 });
  divider(s, 0.72);

  // Before chart
  s.addText("BEFORE  인력 단독", {
    x: 0.55, y: 0.88, w: 4.1, h: 0.35,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.red, margin: 0,
  });
  s.addChart(pres.charts.BAR, [{
    name: "일(Days)",
    labels: ["검토·수정 1일", "시각화 1~2일", "초안 작성 1~2일", "자료 수집 2~3일"],
    values: [1, 1.5, 1.5, 2.5],
  }], {
    x: 0.45, y: 1.28, w: 4.3, h: 3.0,
    barDir: "bar",
    chartColors: ["E05757"],
    chartArea: { fill: { color: C.codeBg } },
    catAxisLabelColor: C.text, valAxisLabelColor: C.text,
    valGridLine: { color: C.border, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelColor: C.white, dataLabelFontSize: 11,
    showLegend: false,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.38, w: 4.3, h: 0.42,
    fill: { color: "3A1515" }, line: { color: C.red, width: 1.5 },
  });
  s.addText("합계: 6~10일", {
    x: 0.45, y: 4.38, w: 4.3, h: 0.42,
    fontSize: 14, bold: true, fontFace: "Arial Black", color: C.red,
    align: "center", valign: "middle", margin: 0,
  });

  // Arrow
  s.addText("→", { x: 4.9, y: 2.7, w: 0.5, h: 0.5, fontSize: 28, bold: true, fontFace: "Arial Black", color: C.orange, align: "center", margin: 0 });

  // After chart
  s.addText("AFTER  클로드 코드 활용", {
    x: 5.5, y: 0.88, w: 4.1, h: 0.35,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.green, margin: 0,
  });
  s.addChart(pres.charts.BAR, [{
    name: "시간(Hours)",
    labels: ["검토·수정 1~3h", "보고서 초안 1~2h", "데이터 수집 1~2h", "프로젝트 설정 0.5h"],
    values: [2, 1.5, 1.5, 0.5],
  }], {
    x: 5.45, y: 1.28, w: 4.1, h: 3.0,
    barDir: "bar",
    chartColors: ["56CF77"],
    chartArea: { fill: { color: C.codeBg } },
    catAxisLabelColor: C.text, valAxisLabelColor: C.text,
    valGridLine: { color: C.border, size: 0.5 }, catGridLine: { style: "none" },
    showValue: true, dataLabelColor: C.white, dataLabelFontSize: 11,
    showLegend: false,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.45, y: 4.38, w: 4.1, h: 0.42,
    fill: { color: "142A18" }, line: { color: C.green, width: 1.5 },
  });
  s.addText("합계: 4~8시간", {
    x: 5.45, y: 4.38, w: 4.1, h: 0.42,
    fontSize: 14, bold: true, fontFace: "Arial Black", color: C.green,
    align: "center", valign: "middle", margin: 0,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 4.92, w: 9.1, h: 0.42,
    fill: { color: C.orange }, line: { color: C.orange },
  });
  s.addText("반복·기계 작업은 AI에게 → 사람은 전략적 판단에 집중", {
    x: 0.45, y: 4.92, w: 9.1, h: 0.42,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.white,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 23: Mermaid 다이어그램 갤러리 ──────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "Mermaid 다이어그램 갤러리", { x: 0.55 });
  divider(s, 0.72);

  const diagrams = [
    { type: "quadrantChart", desc: "2×2 매트릭스\n포지셔닝 맵", color: C.orange },
    { type: "flowchart TD", desc: "프로세스·의존 관계\n조직도", color: C.mint },
    { type: "gitGraph", desc: "버전 관리\n브랜치 구조", color: C.green },
  ];
  diagrams.forEach((d, i) => {
    const x = 0.45 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 2.95, h: 4.15,
      fill: { color: C.card }, line: { color: d.color, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 2.95, h: 0.42,
      fill: { color: d.color }, line: { color: d.color },
    });
    s.addText(d.type, {
      x: x + 0.1, y: 0.88, w: 2.75, h: 0.42,
      fontSize: 12, bold: true, fontFace: "Courier New", color: C.bg,
      align: "center", valign: "middle", margin: 0,
    });

    // mock diagram area
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.12, y: 1.38, w: 2.71, h: 2.45,
      fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
    });
    if (i === 0) {
      // quadrant mockup
      s.addShape(pres.shapes.LINE, { x: x + 0.76, y: 1.45, w: 0, h: 2.3, line: { color: "555555", width: 1 } });
      s.addShape(pres.shapes.LINE, { x: x + 0.2, y: 2.6, w: 2.52, h: 0, line: { color: "555555", width: 1 } });
      s.addText("A", { x: x + 0.8, y: 1.5, w: 0.7, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.mint, bold: true, margin: 0 });
      s.addText("B⭐", { x: x + 0.8, y: 2.65, w: 0.7, h: 0.4, fontSize: 11, fontFace: "Calibri", color: C.orange, bold: true, margin: 0 });
      s.addText("C", { x: x + 0.22, y: 1.5, w: 0.5, h: 0.4, fontSize: 11, fontFace: "Calibri", color: "AA3333", bold: true, margin: 0 });
      s.addText("D", { x: x + 0.22, y: 2.65, w: 0.5, h: 0.4, fontSize: 11, fontFace: "Calibri", color: "336633", bold: true, margin: 0 });
    } else if (i === 1) {
      // flowchart mockup
      const nodes = [["AI", 1.5], ["RS1", 1.95], ["RS2", 2.45], ["RS6", 2.95], ["RS3", 3.45]];
      nodes.forEach(([n, y]) => {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.85, y, w: 1.2, h: 0.32, fill: { color: "1A3040" }, line: { color: d.color, width: 1 } });
        s.addText(n, { x: x + 0.85, y, w: 1.2, h: 0.32, fontSize: 10, fontFace: "Calibri", color: d.color, align: "center", valign: "middle", margin: 0 });
      });
    } else {
      // git graph mockup
      const commits = ["main ●─────●─────●", "      branch ●───●"];
      commits.forEach((c, ci) => {
        s.addText(c, { x: x + 0.2, y: 1.65 + ci * 0.5, w: 2.5, h: 0.38, fontSize: 10, fontFace: "Courier New", color: d.color, margin: 0 });
      });
    }

    s.addText(d.desc, {
      x: x + 0.12, y: 3.9, w: 2.71, h: 0.7,
      fontSize: 11, fontFace: "Calibri", color: C.text,
      align: "center", valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.17, w: 9.1, h: 0.38,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("코드 10줄 → 전문가급 다이어그램  ·  이미지 편집 도구 불필요", {
    x: 0.45, y: 5.17, w: 9.1, h: 0.38,
    fontSize: 12, fontFace: "Calibri", color: C.mint, align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 24: 효과적인 프롬프트 레시피 ──────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "효과적인 프롬프트 레시피", { x: 0.55 });
  divider(s, 0.72);

  const recipes = [
    {
      title: "📥 데이터 수집",
      text: `"@data/{카테고리}/ 에 {주제} 데이터를
수집해줘. {항목}을 포함하고
{형식} 단위로 작성해줘.
출처는 {기준}으로. metadata.md 추가."`,
      color: C.orange,
    },
    {
      title: "✏️ 섹션 수정",
      text: `"@{파일경로}의 {섹션명}을 수정해줘.
{변경 내용}을 {방향}으로 바꿔줘.
{참고 파일}을 참고해줘."`,
      color: C.mint,
    },
    {
      title: "🔄 형식 통일",
      text: `"@{파일경로} 전체에서
{형식A}를 {형식B}로 변환해줘.
기준: {변환 규칙}"`,
      color: C.amber,
    },
    {
      title: "🔗 섹션 통합",
      text: `"@{파일경로}의 {A섹션}과 {B섹션}을
{이유}로 {방법}으로 통합해줘."`,
      color: C.green,
    },
  ];
  const xs3 = [0.45, 5.1];
  const ys3 = [0.88, 3.1];
  recipes.forEach((r, i) => {
    const x = xs3[i % 2], y = ys3[Math.floor(i / 2)];
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.4, h: 2.0,
      fill: { color: C.card }, line: { color: r.color, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.4, h: 0.4,
      fill: { color: r.color }, line: { color: r.color },
    });
    s.addText(r.title, {
      x: x + 0.15, y, w: 4.1, h: 0.4,
      fontSize: 13, bold: true, fontFace: "Calibri", color: C.bg,
      valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.12, y: y + 0.48, w: 4.16, h: 1.38,
      fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
    });
    s.addText(r.text, {
      x: x + 0.22, y: y + 0.55, w: 3.96, h: 1.25,
      fontSize: 10.5, fontFace: "Courier New", color: C.text, wrap: true, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.2, w: 9.1, h: 0.35,
    fill: { color: C.card }, line: { color: C.border, width: 1 },
  });
  s.addText("패턴을 익히면 → 어떤 보고서 작업에도 응용 가능", {
    x: 0.45, y: 5.2, w: 9.1, h: 0.35,
    fontSize: 11.5, fontFace: "Calibri", color: C.muted, align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 25: 주의사항 ────────────────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "주의사항 — 이것만 지키면 됩니다", { x: 0.55 });
  divider(s, 0.72);

  const warnings = [
    {
      icon: "⚠️",
      title: "수치는 반드시 검증",
      body: "AI가 생성한 수치·통계는 원본 출처를 직접 확인하세요.\n구조는 믿어도, 숫자는 확인.",
    },
    {
      icon: "⚠️",
      title: "전략 판단은 사람이",
      body: "AI는 구조를 잡고 초안을 씁니다.\n\"이 전략이 맞는가?\"는 사람이 결정해야 합니다.",
    },
    {
      icon: "⚠️",
      title: "기밀 정보 주의",
      body: "클로드 코드는 Anthropic 서버를 거칩니다.\n공개 불가 기밀 데이터는 입력하지 마세요.",
    },
  ];
  warnings.forEach((w, i) => {
    const x = 0.45 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 2.95, h: 4.0,
      fill: { color: "1E1500" }, line: { color: C.amber, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 2.95, h: 0.6,
      fill: { color: C.amber }, line: { color: C.amber },
    });
    s.addText(w.icon + " " + w.title, {
      x: x + 0.1, y: 0.88, w: 2.75, h: 0.6,
      fontSize: 13, bold: true, fontFace: "Calibri", color: C.bg,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(w.body, {
      x: x + 0.15, y: 1.62, w: 2.65, h: 2.8,
      fontSize: 13, fontFace: "Calibri", color: C.text, wrap: true, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.0, w: 9.1, h: 0.48,
    fill: { color: "142A18" }, line: { color: C.green, width: 1.5 },
  });
  s.addText("✅ 반복 작업, 형식 통일, 초안 생성 — 이 영역에서 AI는 탁월합니다", {
    x: 0.45, y: 5.0, w: 9.1, h: 0.48,
    fontSize: 13, bold: true, fontFace: "Calibri", color: C.green,
    align: "center", valign: "middle", margin: 0,
  });
}

// ── SLIDE 26: 지금 시작하는 방법 ─────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "지금 시작하는 방법", { x: 0.55 });
  divider(s, 0.72);

  const steps = [
    {
      num: "01", label: "설치 (5분)",
      code: "$ npm install -g @anthropic-ai/claude-code\n$ claude",
      note: "Node.js 설치 필요 (nodejs.org)",
      color: C.orange,
    },
    {
      num: "02", label: "프로젝트 시작 (10분)",
      code: "$ mkdir my-report && cd my-report\n$ claude\n\n> CLAUDE.md와 기본 디렉토리 구조를\n  만들어줘. 문서는 한국어로.",
      note: "첫 CLAUDE.md 자동 생성",
      color: C.mint,
    },
    {
      num: "03", label: "첫 보고서 (30분)",
      code: "> [관심 주제]의 현황과 주요 이슈를\n  data/에 수집하고\n  report/summary.md에 요약해줘.",
      note: "첫 자동 생성 보고서 완성",
      color: C.green,
    },
  ];
  steps.forEach((st, i) => {
    const x = 0.45 + i * 3.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 2.95, h: 4.45,
      fill: { color: C.card }, line: { color: st.color, width: 2 },
    });
    // Step number badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.9, y: 0.75, w: 1.15, h: 0.38,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText("STEP " + st.num, {
      x: x + 0.9, y: 0.75, w: 1.15, h: 0.38,
      fontSize: 11, bold: true, fontFace: "Calibri", color: C.bg,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.label, {
      x: x + 0.12, y: 1.02, w: 2.71, h: 0.38,
      fontSize: 13, bold: true, fontFace: "Calibri", color: st.color, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.12, y: 1.48, w: 2.71, h: 2.6,
      fill: { color: C.codeBg }, line: { color: C.border, width: 1 },
    });
    s.addText(st.code, {
      x: x + 0.22, y: 1.55, w: 2.51, h: 2.45,
      fontSize: 10, fontFace: "Courier New", color: C.green, wrap: true, margin: 0,
    });
    s.addText("→ " + st.note, {
      x: x + 0.12, y: 4.15, w: 2.71, h: 0.55,
      fontSize: 11, fontFace: "Calibri", color: C.muted, wrap: true, margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.45, y: 5.38, w: 9.1, h: 0.2,
    fill: { color: C.orange }, line: { color: C.orange },
  });
}

// ── SLIDE 27: 핵심 요약 ───────────────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  s.addText("오늘 기억할 3가지", {
    x: 0.55, y: 0.3, w: 9.0, h: 0.55,
    fontSize: 26, bold: true, fontFace: "Arial Black", color: C.text,
    align: "center", margin: 0,
  });
  divider(s, 0.95);

  const messages = [
    {
      num: "①",
      title: "클로드 코드는 파일을 직접 쓴다",
      body: "채팅창 복사-붙여넣기가 아니라\n파일 생성·수정·git 커밋까지 자동",
      color: C.orange,
    },
    {
      num: "②",
      title: "CLAUDE.md 하나로 프로젝트를 기억한다",
      body: "형식·규칙을 한 번만 정의하면\n모든 세션에서 일관되게 적용",
      color: C.mint,
    },
    {
      num: "③",
      title: "사람은 판단에 집중한다",
      body: "반복·기계 작업은 AI에게\n전략적 결정은 나에게",
      color: C.green,
    },
  ];
  messages.forEach((m, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.12 + i * 1.42, w: 9.1, h: 1.28,
      fill: { color: C.card }, line: { color: m.color, width: 2 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 1.12 + i * 1.42, w: 0.07, h: 1.28,
      fill: { color: m.color }, line: { color: m.color },
    });
    // Number badge
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.7, y: 1.27 + i * 1.42, w: 0.55, h: 0.55,
      fill: { color: m.color }, line: { color: m.color },
    });
    s.addText(m.num, {
      x: 0.7, y: 1.27 + i * 1.42, w: 0.55, h: 0.55,
      fontSize: 16, bold: true, fontFace: "Calibri", color: C.bg,
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(m.title, {
      x: 1.4, y: 1.22 + i * 1.42, w: 7.9, h: 0.4,
      fontSize: 16, bold: true, fontFace: "Calibri", color: m.color, margin: 0,
    });
    s.addText(m.body, {
      x: 1.4, y: 1.65 + i * 1.42, w: 7.9, h: 0.55,
      fontSize: 14, fontFace: "Calibri", color: C.text, margin: 0,
    });
  });
}

// ── SLIDE 28: Q&A ─────────────────────────────────────────────────────────────
{
  const s = slide();
  accentBar(s);
  title(s, "Q & A", { x: 0.55, size: 32 });
  divider(s, 0.88);

  const qas = [
    { q: "코딩 몰라도 되나요?", a: "네. 한국어 지시만 하면 됩니다." },
    { q: "기밀 자료 입력해도 되나요?", a: "외부 공개 불가 정보는 피하세요." },
    { q: "얼마나 정확한가요?", a: "구조·형식: 매우 정확\n수치·사실: 반드시 검증 필요" },
    { q: "비용은?", a: "대규모 프로젝트도 수십 달러 수준" },
  ];
  qas.forEach((qa, i) => {
    const col = i < 2 ? 0 : 1;
    const row = i % 2;
    const x = 0.55 + col * 4.5, y = 1.05 + row * 2.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.25, h: 2.0,
      fill: { color: C.card }, line: { color: C.border, width: 1 },
    });
    s.addText("Q. " + qa.q, {
      x: x + 0.15, y: y + 0.12, w: 3.95, h: 0.45,
      fontSize: 13, bold: true, fontFace: "Calibri", color: C.orange, margin: 0, wrap: true,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: y + 0.62, w: 3.95, h: 0,
      line: { color: C.border, width: 1 },
    });
    s.addText("→ " + qa.a, {
      x: x + 0.15, y: y + 0.72, w: 3.95, h: 1.1,
      fontSize: 13, fontFace: "Calibri", color: C.text, wrap: true, margin: 0,
    });
  });

  // Big "질문해 주세요" on the right
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.4, y: 1.05, w: 4.1, h: 4.3,
    fill: { color: C.codeBg }, line: { color: C.orange, width: 2 },
  });
  s.addText("질문해\n주세요", {
    x: 5.4, y: 2.1, w: 4.1, h: 2.2,
    fontSize: 42, bold: true, fontFace: "Arial Black", color: C.orange,
    align: "center", valign: "middle", margin: 0,
  });
  s.addText("github.com/k31001/action-learning", {
    x: 5.4, y: 4.75, w: 4.1, h: 0.35,
    fontSize: 11, fontFace: "Courier New", color: C.muted,
    align: "center", margin: 0,
  });
}

// ── WRITE FILE ───────────────────────────────────────────────────────────────
const outPath = "working-style/seminar-claude-code-report/seminar-claude-code.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("✓ Created:", outPath))
  .catch(err => console.error("Error:", err));
