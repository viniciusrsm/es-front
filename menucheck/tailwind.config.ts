import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom1: "#d8bfbf",
        custom2: "#ECDBDB",
        custom3: "#A8A8A8",
      },
      animation: {
        wave: "wave 5s infinite linear",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(-50%) translateY(0)" },
          "50%": { transform: "translateX(-45%) translateY(10px)" },
          "100%": { transform: "translateX(-50%) translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
