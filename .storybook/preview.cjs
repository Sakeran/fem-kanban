import { themes } from "@storybook/theming";
import "../src/app.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true,
    dark: { ...themes.dark, appBg: '#222222'},
    light: { ...themes.light, appBg: 'white'},
  }
};
