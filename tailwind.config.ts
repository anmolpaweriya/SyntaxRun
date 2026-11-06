import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        game: {
          bg: "#0B0F19",
          panel: "#131B2E",
          card: "#1A243D",
          border: "#2A385C",
          accent: "#38BDF8",
          gold: "#FBBF24",
          success: "#22C55E",
          danger: "#EF4444",
          warning: "#F59E0B",
          forest: "#10B981",
          dungeon: "#F97316",
          mountain: "#06B6D4",
          castle: "#8B5CF6",
          factory: "#F59E0B",
          cyber: "#EC4899",
          algorithm: "#6366F1",
        },
      },
      fontFamily: {
        game: ["system-ui", "sans-serif"],
        code: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(56, 189, 248, 0.4)",
        "glow-gold": "0 0 20px -5px rgba(251, 191, 36, 0.5)",
        "glow-forest": "0 0 20px -5px rgba(16, 185, 129, 0.5)",
        "glow-cyber": "0 0 25px -5px rgba(236, 72, 153, 0.6)",
      },
      animation: {
        pulseFast: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

