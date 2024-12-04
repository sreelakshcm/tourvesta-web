import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  NEUTRAL_DARK,
  BACKGROUND_DARK,
  NEUTRAL_DEFAULT,
} from './src/constants/styles';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html'], // Include your project's files
  darkMode: 'class', // Enable dark mode with the "class" strategy
  theme: {
    extend: {
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
      },
      animation: {
        fadeInDown: 'fadeInDown 0.5s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      colors: {
        // Primary color with opacity variations
        primary: {
          DEFAULT: PRIMARY_COLOR,
          hover: 'rgba(74, 189, 172, 0.8)',
          active: 'rgba(74, 189, 172, 0.75)',
          focus: 'rgba(74, 189, 172, 0.95)',
        },
        // Secondary color with opacity variations
        secondary: {
          DEFAULT: SECONDARY_COLOR,
          hover: 'rgba(252, 117, 79, 0.8)',
          active: 'rgba(252, 117, 79, 0.75)',
          focus: 'rgba(252, 117, 79, 0.95)',
          light: 'rgba(252, 117, 79, 0.6)',
        },
        // Accent and neutral colors
        accent: '#F7B733',
        neutral: {
          neutral: NEUTRAL_DEFAULT,
          dark: NEUTRAL_DARK,
          layout: 'rgb(38, 38, 38)',
        },

        // Background colors for light and dark modes
        backgroundLight: '#FFFFFF',
        backgroundDark: BACKGROUND_DARK, // Darker tone for dark mode

        // Font colors for light and dark modes
        fontLight: '#1c1c1c',
        fontDark: 'rgba(255, 255, 255, 0.95)',
        mutedDark: 'rgba(255, 255, 255, 0.7)', // Muted dark for secondary text
      },
      boxShadow: {
        dark: '0 4px 6px rgba(0, 0, 0, 0.8)', // Stronger shadow in dark mode
      },
    },
  },
  plugins: [],
};
