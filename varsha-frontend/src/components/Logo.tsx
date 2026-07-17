import { useId } from "react";
import { cn } from "./ui/cn";

// Brand identity board V2·2026 — lettermark A "Check Cut", Trust Navy palette.
// The letter is a solid peak with the auditor's check cut straight through it
// as negative space; the check exits the letter and resolves into the verified
// node. The same node returns as the tittle of the i in the wordmark.
// Colors live in tailwind.config.ts under `brand` (navy/mist/blue).
// Static SVG copies of the mark are in /public/icons/ for non-React use.

type Theme = "light" | "dark";

export function LogoMark({
  className,
  mono = false,
}: {
  className?: string;
  /** Single-colour (formal) version — node inherits currentColor. */
  mono?: boolean;
}) {
  // useId can contain ":" which breaks url(#…) references in some browsers.
  const maskId = `logo-cut-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-8 w-8 shrink-0", className)}
    >
      <mask
        id={maskId}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="64"
      >
        <path d="M32 5 59 55H5Z" fill="#fff" />
        {/* The audit check, cut clean through the letter. */}
        <path
          d="M12 33 27.5 48.5 58 18"
          fill="none"
          stroke="#000"
          strokeWidth="8"
        />
      </mask>
      <path d="M32 5 59 55H5Z" fill="currentColor" mask={`url(#${maskId})`} />
      {/* The check resolves to the verified node — the only accent ink. */}
      <circle
        cx="54.5"
        cy="21.5"
        r="5"
        className={mono ? "fill-current" : "fill-brand-blue"}
      />
    </svg>
  );
}

export function Wordmark({
  theme = "light",
  className,
}: {
  theme?: Theme;
  className?: string;
}) {
  return (
    // aria-hidden: uses the dotless "ı" glyph so the node can be the tittle;
    // parent Logo supplies the accessible name.
    <span
      aria-hidden="true"
      className={cn(
        "font-heading text-xl font-semibold leading-none tracking-tight",
        theme === "light" ? "text-brand-navy" : "text-white",
        className,
      )}
    >
      Accur
      <span className="whitespace-nowrap">
        ı
        {/* The verified node as the tittle. Em-based values are glyph-metric
            offsets specific to Sora — not layout spacing tokens. */}
        <span className="-ml-[0.2em] mr-[0.05em] inline-block h-[0.15em] w-[0.15em] rounded-full bg-brand-blue align-[0.66em]" />
        th
      </span>
    </span>
  );
}

export default function Logo({
  theme = "light",
  tagline = true,
  className,
  markClassName,
}: {
  theme?: Theme;
  /** Show the letterspaced TECHNOLOGIES line under the wordmark. */
  tagline?: boolean;
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        className={cn(
          theme === "light" ? "text-brand-navy" : "text-white",
          markClassName,
        )}
      />
      <span className="flex flex-col justify-center">
        <Wordmark theme={theme} />
        {tagline && (
          <span
            aria-hidden="true"
            className={cn(
              "mt-1 text-[0.5rem] font-medium uppercase leading-none tracking-[0.28em]",
              theme === "light" ? "text-slate-500" : "text-slate-400",
            )}
          >
            Technologies
          </span>
        )}
      </span>
      <span className="sr-only">Accurith Technologies</span>
    </span>
  );
}
