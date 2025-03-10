import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable class-based dark mode
    content: [
      './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
      './storage/framework/views/*.php',
      './resources/views/**/*.blade.php',
      './resources/js/**/*.jsx',
    ],

    theme: {
      extend: {
        fontFamily: {
          sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        },
        keyframes: {
          wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          },
        },
        animation: {
          wiggle: 'wiggle 0.5s ease-in-out infinite',
        },
        colors: {
          accent: '#d6016d',
          'primary-pink': '#fc61b6',
          'primary-dark': '#670067',
          'dark-accent': '',
        },
        gradientColorStopPositions: {
          33: '33%',
        },
      },
    },

    plugins: [forms],
};
