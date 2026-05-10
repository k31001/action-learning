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
        // 라이트 테마 base 팔레트 — 옅은 슬레이트 + 스카이블루 + 월톤(amber) 액센트
        // 눈에 부담 적도록 pure white 회피, 전체적 한 단계 어둡게
        canvas: '#eef1f6',                // 페이지 base — 옅은 슬레이트 (slate-100 area)
        surface: {
          DEFAULT: '#fbfcfe',              // 기본 카드 — 거의 흰색이지만 미세 sky 틴트
          raised:  '#ffffff',              // 모달/팝오버 (대비를 위해 순수 흰색)
          subtle:  '#f3f5f9',              // 헤더/섹션 미묘한 분리
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
