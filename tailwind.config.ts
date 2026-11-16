import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F0",
        "cream-deep": "#FFF1DE",
        ink: "#2B1B17",
        "ink-soft": "#5C4038",
        pink: "#F4B8C6",
        "pink-deep": "#E38AA0",
        blush: "#FFE4EC",
        sky: "#C9DFF6",
        "sky-deep": "#A7C7EE",
        sage: "#C5D5B8",
        "sage-deep": "#9BB892",
        butter: "#FFE6B5",
        lilac: "#E6D4F5",
        peach: "#FFD5C2",
        mint: "#D4EFE4",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "Fredoka", "sans-serif"],
        sans: ["var(--font-nunito)", "Nunito", "sans-serif"],
      },
    },
  },
};

export default config;
