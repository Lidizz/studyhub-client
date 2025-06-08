/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(#280a48, #20043d)',
      },
      colors: {
        // Light: Clean, high contrast
        'light-bg': '#f9fafb', // Gray-50
        'light-text': '#374151', // Gray-700, dark text
        'light-accent': '#6366f1', // Indigo-500, darker buttons
        // Dark: Deep and crisp
        'dark-bg': '#1f2937', // Gray-800, darker
        'dark-text': '#e5e7eb', // Gray-200, bright text
        'dark-accent': '#9333ea', // Purple-600, softer purple
      },
    },
  },
  plugins: [],
};
