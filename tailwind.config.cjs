/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*.{svelte,ts,js}"],
  theme: {
    colors: {
      black: "hsl(237 100% 4%)",
      white: "hsl(0 0% 100%)",
      "main-purple": {
        normal: "hsl(242 48% 58%)",
        hover: "hsl(243 100% 82%)",
      },
      gray: {
        light: "hsl(220 69% 97%)",
        "lines-light": "hsl(221 69% 94%)",
        medium: "hsl(216 15% 57%)",
        "lines-dark": "hsl(236 11% 27%)",
        dark: "hsl(235 12% 19%)",
        "very-dark": "hsl(235 16% 15%)",
      },
      red: {
        normal: "hsl(0 78% 63%)",
        hover: "hsl(0 100% 80%)",
      },
    },

    fontSize: {},

    lineHeight: {},

    extend: {
      spacing: {},
      maxWidth: {},
      maxHeight: {},
    },
  },
  plugins: [],
};
