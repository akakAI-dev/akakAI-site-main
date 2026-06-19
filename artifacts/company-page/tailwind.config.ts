import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Helvetica Neue", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(4rem, 12vw, 14rem)", { lineHeight: "0.85", letterSpacing: "-0.04em", fontWeight: "800" }],
        "headline": ["clamp(2.5rem, 6vw, 5.5rem)", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "subhead": ["clamp(1.25rem, 2.5vw, 2rem)", { lineHeight: "1.3", letterSpacing: "-0.02em", fontWeight: "600" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.7", letterSpacing: "-0.005em" }],
        "caption": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.12em", fontWeight: "500" }],
        "micro": ["0.5625rem", { lineHeight: "1.5", letterSpacing: "0.15em", fontWeight: "500" }],
      },
      colors: {
        surface: "#000",
        panel: "#0a0a0a",
        line: "rgba(255,255,255,0.12)",
        muted: "#888",
        dim: "#555",
        "text-secondary": "#aaa",
      },
      spacing: {
        "grid": "clamp(1rem, 3vw, 3rem)",
        "section": "clamp(4rem, 10vh, 8rem)",
      },
    },
  },
  plugins: [],
};

export default config;
