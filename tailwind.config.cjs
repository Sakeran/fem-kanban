const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "src/**/*.{svelte,ts,js}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentcolor",
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
      "20p": "1.25rem", // Tablet header, current board
      "24p": "1.5rem", // HeadingXL
    },

    lineHeight: {
      "15/12": "1.25", // HeadingXL, HeadingS, BodyM
      "19/15": "1.266", // HeadingM
      "23/18": "1.278", // HeadingL
      "23/13": "1.769", // BodyL
    },

    letterSpacing: {
      "24p": "0.15rem",
    },

    borderRadius: {
      full: "100vh",
      round: "50%",
      xxs: "0.125rem",
      xs: "0.25rem",
      sm: "0.375rem",
      lg: "0.5rem",
    },

    extend: {
      spacing: {
        2.25: "0.5625rem", // 9px
        3: "0.75rem", // 12px
        3.25: "0.8125rem", // 13px
        3.5: "0.875rem", // 14px
        3.75: "0.9375rem", // 15px
        4.5: "1.125rem", // 18px
        4.75: "1.1875rem", // 19px
        5.5: "1.375rem", // 22px
        5.75: "1.4375rem", // 23px
        7: "1.75rem", // 28px
        8.5: "2.125rem", // 34px
        15.5: "3.875rem", // 62px
      },
      maxWidth: {},
      minHeight: {
        "button-l": "3rem",
        "button-s": "2.5rem",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
};
