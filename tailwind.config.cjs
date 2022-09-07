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

    fontFamily: {
      sans: ["Plus Jakarta Sans", "sans-serif"],
    },

    fontSize: {
      "12p": "0.75rem", // HeadingS, BodyM
      "13p": "0.8125rem", // BodyL
      "15p": "0.9375rem", // HeadingM
      "18p": "1.125rem", // HeadingL
      "24p": "1.5rem", // HeadingXL
    },

    lineHeight: {
      "15/12": "1.25", // HeadingXL, HeadingS, BodyM
      "19/15": "1.266", // HeadingM
      "23/18": "1.278", // HeadingL
      "23/13": "1.769", // BodyL
    },

    tracking: {
      "24p": "0.15rem",
    },

    extend: {
      spacing: {},
      maxWidth: {},
      maxHeight: {},
    },
  },
  plugins: [],
};
