/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'baby-pink': '#FCE4EC',
        'blush-pink': '#F8BBD0',
        'rose-pink': '#EFA5BD',
        'soft-lavender': '#E8DDFB',
        'ivory': '#FFF9F5',
        'champagne-gold': '#E8C98D',
        'deep-rose': '#A64D70',
        'rose-dark': '#3D1B28',
        'soft-white': '#FFFFFF',
      },
      fontFamily: {
        'serif': ['"Cormorant Garamond"', 'serif'],
        'title': ['"Playfair Display"', 'serif'],
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'handwritten': ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'princess': '0 10px 35px -5px rgba(239, 165, 189, 0.35), 0 0 15px rgba(232, 201, 141, 0.2)',
        'princess-lg': '0 20px 50px -10px rgba(166, 77, 112, 0.25), 0 0 25px rgba(248, 187, 208, 0.5)',
        'gold-glow': '0 0 30px rgba(232, 201, 141, 0.6)',
        'pink-glow': '0 0 30px rgba(248, 187, 208, 0.7)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
        'sparkle': 'sparkle 1.8s ease-in-out infinite',
        'petal-fall': 'petalFall 10s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
        },
        petalFall: {
          '0%': { transform: 'translate(0, -10px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.9' },
          '100%': { transform: 'translate(100px, 100vh) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
