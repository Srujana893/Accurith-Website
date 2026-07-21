import Image from "next/image";
import { cn } from "./ui/cn";

// Real client logo from the 2026-07 design handoff — ribbon "A" mark +
// wordmark + "Securing today. Empowering tomorrow." tagline, transparent PNG
// (1909×824). Replaces the "Check Cut" SVG prototype. Ask the client for an
// SVG master; until then the PNG ships via next/image.
//
// theme="dark": the artwork itself is dark-on-transparent, so on dark
// surfaces (footer) it sits on a small white chip — per the prototype.

type Theme = "light" | "dark";

export default function Logo({
  theme = "light",
  className,
}: {
  theme?: Theme;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        theme === "dark" && "rounded-lg bg-white px-3 py-2",
        className,
      )}
    >
      <Image
        src="/images/brand/accurith-logo.png"
        alt="Accurith — Securing today. Empowering tomorrow."
        width={1909}
        height={824}
        priority
        className={cn("w-auto", theme === "dark" ? "h-9" : "h-14 md:h-16")}
      />
    </span>
  );
}
