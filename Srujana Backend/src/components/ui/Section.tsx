import { cn } from './cn';

type SectionTone = 'white' | 'grey' | 'navy';

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-white',
  grey: 'bg-slate-50',
  navy: 'bg-navy text-slate-200',
};

// Sections separate with hairline top borders (audit-grid aesthetic), not
// heavy color blocks. Navy is reserved for the AI band + footer.
export default function Section({
  children,
  tone = 'white',
  hairline = true,
  dotGrid = false,
  className,
  ...rest
}: {
  children: React.ReactNode;
  tone?: SectionTone;
  /** Hairline top border between sections. */
  hairline?: boolean;
  /** Sparse teal dot-grid background (hero + a few key sections only). */
  dotGrid?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        'py-16 md:py-24',
        toneClasses[tone],
        hairline && tone !== 'navy' && 'border-t border-slate-200',
        dotGrid && (tone === 'navy' ? 'bg-audit-grid-navy' : 'bg-audit-grid'),
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
