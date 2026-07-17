import type { Config } from "tailwindcss";

// V01 — Design tokens. Every color, font, and radius the site uses lives here.
// Rule: no hardcoded hex values or arbitrary spacing (p-[13px]) anywhere else.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand accent — buttons, links, small accents only; never a large fill.
        teal: {
          50: "#EDFAF6",
          100: "#D5F3EA",
          200: "#ACE6D6",
          300: "#7BD4BD",
          400: "#45BC9F",
          500: "#16A886",
          600: "#0E9E82", // brand base
          700: "#0B7E68",
          800: "#0A6454",
          900: "#095245",
          950: "#042E27",
        },
        // Logo palette — brand identity board V2·2026, "Trust Navy" lockup.
        // Logo/mark use only; site UI keeps the teal + navy tokens below
        // until the full brand system is finalised.
        brand: {
          navy: "#0B1E3D",
          mist: "#C7CDD6",
          blue: "#3E8EFF",
        },
        // Headings + the dark contrast bands (AI section, footer).
        navy: {
          DEFAULT: "#1B2A4A",
          light: "#2A3D66",
          dark: "#131E36",
        },
        dark: "#222222",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
