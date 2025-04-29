import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            "h1, h2, h3, h4, h5, h6": {
              marginTop: "0.4em",
              marginBottom: "0.4em",
            },
            p: {
              marginTop: "0.2em",
              marginBottom: "0.2em",
            },
            blockquote: {
              marginTop: "0.4em",
              marginBottom: "0.4em",
              paddingLeft: "0.75rem",
              borderLeftWidth: "3px",
              borderLeftColor: theme("colors.gray.300"),
              color: theme("colors.gray.600"),
            },
            ul: {
              marginTop: "0.3em",
              marginBottom: "0.3em",
              paddingLeft: "1.25em",
            },
            ol: {
              marginTop: "0.3em",
              marginBottom: "0.3em",
              paddingLeft: "1.25em",
            },
          },
        },
      }),
    },
  },
  darkMode: "class",
  plugins: [heroui(), typography()],
};
export default config;
