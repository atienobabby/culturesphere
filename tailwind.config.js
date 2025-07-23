/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        violet: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce': 'bounce 1s infinite',
        'float-gentle': 'floatGentle 8s ease-in-out infinite',
        'fade-in-out': 'fadeInOut 0.5s ease-in-out',
        'pulse-gentle': 'pulseGentle 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-10px)' },
          '60%': { transform: 'translateY(-5px)' },
        },
        floatGentle: {
          '0%, 100%': { 
            transform: 'translate(20px, 20px) rotate(0deg)',
          },
          '25%': { 
            transform: 'translate(calc(100vw - 120px), 40px) rotate(2deg)',
          },
          '50%': { 
            transform: 'translate(calc(100vw - 100px), calc(100vh - 200px)) rotate(-1deg)',
          },
          '75%': { 
            transform: 'translate(40px, calc(100vh - 180px)) rotate(1deg)',
          },
        },
        fadeInOut: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGentle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};