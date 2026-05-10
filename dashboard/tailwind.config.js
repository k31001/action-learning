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
        // 정제된 dark UI 팔레트 (Linear/Vercel/Stripe 영감)
        // 기존 gray-* 호환을 위해 추가만 — 기존 클래스에 영향 없음
        canvas: '#0a0b0f',
        surface: {
          DEFAULT: '#101218',
          raised:  '#161922',
          subtle:  '#0d0f15',
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
        soft:    '0 1px 2px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.04)',
        elevate: '0 4px 16px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06)',
      },
    },
  },
  plugins: [],
}
