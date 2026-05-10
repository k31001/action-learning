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
        // 라이트 테마 base 팔레트 — 화이트 + 스카이블루 + 월톤(amber) 액센트
        canvas: '#fafbff',                // 페이지 base — 아주 옅은 sky 틴트
        surface: {
          DEFAULT: '#ffffff',              // 기본 카드
          raised:  '#ffffff',              // 모달/팝오버 (그림자로 구분)
          subtle:  '#f6f8fc',              // 헤더/섹션 미묘한 분리
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
