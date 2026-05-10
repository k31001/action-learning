/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        samsung: {
          blue: '#1428A0',
          dark: '#0A1854',
        },
        // 라이트 테마 base 팔레트 — cream paper + 따뜻한 amber 액센트
        // 눈에 부담 적은 warm stone 톤 (cool slate 회피)
        canvas: '#f4ede0',                // 페이지 base — warm cream paper
        surface: {
          DEFAULT: '#fdf9f1',              // 기본 카드 — 매우 옅은 cream
          raised:  '#ffffff',              // 모달/팝오버 (대비를 위해 흰색)
          subtle:  '#efe8da',              // 헤더/섹션 미묘한 분리
        },
      },
      fontFamily: {
        sans: [
          'Inter var', 'Inter',
          'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
          '"Segoe UI"', '"Apple SD Gothic Neo"', '"Noto Sans KR"', 'Roboto', 'sans-serif',
        ],
        mono: [
          'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco',
          'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace',
        ],
      },
      boxShadow: {
        // 라이트 모드 — 미세한 elevation
        soft:    '0 1px 2px rgba(15, 23, 42, .04), 0 0 0 1px rgba(15, 23, 42, .05)',
        elevate: '0 4px 16px rgba(15, 23, 42, .08), 0 0 0 1px rgba(15, 23, 42, .06)',
      },
    },
  },
  plugins: [],
}
