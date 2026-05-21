import type { Config } from "tailwindcss";

const config: Config = {
  // Темная/светлая тема управляется классом на <html>
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // ─── Максимальная ширина контейнера: 1440px ───
    screens: {
      sm: "390px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      // ─── Шрифты ───────────────────────────────────
      // Handjet используется для акцентных заголовков / hero-текста
      // Manrope — основной UI-шрифт
      fontFamily: {
        handjet: ["var(--font-handjet)", "monospace"],
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      // ─── Цвета — меняй здесь или через CSS-переменные в globals.css ───
      colors: {
        background: "var(--background)",
        card:       "var(--card)",
        primary:    "var(--primary)",
        secondary:  "var(--secondary)",
        contrast:   "var(--contrast)",
        red:        "var(--red)",
      },
      // ─── Максимальная ширина контейнеров ──────────
      maxWidth: {
        container: "1440px",
        content: "1200px",
      },
      // ─── Отступы по сетке ─────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
