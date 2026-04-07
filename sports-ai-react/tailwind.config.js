/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0032ff',
        secondary: '#00a6ff',
        accent: '#ff4590',
        dark: '#222222',
        light: '#ffffff',
        graybg: '#f5f5f5',
        text: '#333333',
        'text-light': '#666666',
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

