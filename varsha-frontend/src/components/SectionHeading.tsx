import { cn } from "./ui/cn";

// Signature element 1c — small mono-font index label ("01 / Services") above
// section headings.
export default function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  onNavy = false,
  className,
}: {
  /** Two-digit index, e.g. "01". */
  index?: string;
  /** Label shown after the index, e.g. "Services". */
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onNavy?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {index && (
        <p
          className={cn(
            "mb-3 font-mono text-xs uppercase tracking-widest",
            onNavy ? "text-teal-300" : "text-teal-700",
          )}
        >
          {index}
          {label ? ` / ${label}` : ""}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl leading-tight tracking-tight md:text-4xl",
          onNavy && "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            onNavy ? "text-slate-300" : "text-slate-700",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
