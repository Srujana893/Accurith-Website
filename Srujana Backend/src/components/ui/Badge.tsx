import { cn } from './cn';

// Framework names (ISO 27001, SOC 2, COBIT…) always render through this —
// plain text chips, never badge/seal images (hard rule).
export default function Badge({
  children,
  mono = false,
  tone = 'teal',
  className,
}: {
  children: React.ReactNode;
  /** Mono font — used for framework chips and index-style labels. */
  mono?: boolean;
  /** `navy` inverts for use on dark bands. */
  tone?: 'teal' | 'navy';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg border px-3 py-1 text-sm',
        tone === 'teal' && 'border-teal-300 bg-teal-50/50 text-teal-800',
        tone === 'navy' && 'border-white/25 bg-white/5 text-slate-200',
        mono && 'font-mono text-xs tracking-wide',
        className,
      )}
    >
      {children}
    </span>
  );
}
