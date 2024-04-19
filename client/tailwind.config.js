/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "background-color-filler: ": "#9e9e9e",
        "box-shadow-get": "#0000001a",
        "primary-orange": "#FF5722",
        "primary-white": "#ffffffff",
        "primary-night": "#111111ff",
        "primary-red": "#c8102eff",
        "secondary-gold": "#f1be48ff",
      },
    },
  },
  plugins: [],
}
