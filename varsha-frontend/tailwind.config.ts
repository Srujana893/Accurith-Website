import type { Config } from "tailwindcss";

// V01 — Design tokens. Every color, font, and radius the site uses lives here.
// Rule: no hardcoded hex values or arbitrary spacing (p-[13px]) anywhere else.
//
// Direction B (locked 2026-07-21, client sign-off): blue accent, Archivo +
// IBM Plex, "Charcoal" base theme, editorial full-bleed layout. The teal /
// navy tokens below are the legacy Direction A system — still referenced by
// not-yet-reskinned inner pages; delete them when the last teal page is
// migrated.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ---- Direction B accent (client-selected blue). Ramp derived from
        // the base via shade(): light +0.18, dark -0.28, hover +0.22.
        // Contrast: accent on white 4.7:1 ✓; white on accent 4.7:1 ✓ (always
        // white text on accent fills, never dark); accent on the dark base
        // fails AA — use accent-light there (5.9:1 ✓).
        accent: {
          DEFAULT: "#2E6FE0",
          light: "#5A90EC",
          dark: "#2150A1",
          hover: "#5A90EC",
        },
        // ---- Base theme "Charcoal" — 7-tuple from the design handoff.
        base: "#121417", // dark page/hero background
        hero: "#071A2E", // hero navy — sampled from the 2026-07-22 brand artwork
        footer: "#0C0D0F", // darkest — footer only
        sec1: "#F5F5F6", // light section
        sec2: "#ECEDEE", // alt light section
        ink: {
          DEFAULT: "#1B1D20", // heading on light
          2: "#55585C", // body on light
          3: "#6A6E73", // muted on light (4.7:1 on white ✓)
        },
        // ---- Hairlines
        line: {
          light: "#E2E8EC",
          dark: "#1C2733",
          footer: "#18222E",
        },
        // ---- Legacy Direction A tokens (teal audit-grid) — inner pages only.
        teal: {
          50: "#EDFAF6",
          100: "#D5F3EA",
          200: "#ACE6D6",
          300: "#7BD4BD",
          400: "#45BC9F",
          500: "#16A886",
          600: "#0E9E82",
          700: "#0B7E68",
          800: "#0A6454",
          900: "#095245",
          950: "#042E27",
        },
        brand: {
          navy: "#0B1E3D",
          mist: "#C7CDD6",
          blue: "#3E8EFF",
        },
        navy: {
          DEFAULT: "#1B2A4A",
          light: "#2A3D66",
          dark: "#131E36",
        },
        dark: "#222222",
      },
      fontFamily: {
        // Direction B type stack — Archivo display, IBM Plex Sans body,
        // IBM Plex Mono kickers/labels.
        heading: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        kicker: "0.16em",
        brand: "0.3em", // ACCURITH wordmark under the monogram
      },
      borderRadius: {
        card: "4px", // deliberately sharp — "audit" feel
      },
      maxWidth: {
        content: "87.5rem", // 1400px content max-width
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};

export default config;
