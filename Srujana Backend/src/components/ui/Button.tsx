import Link from 'next/link';
import { cn } from './cn';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

// One teal (primary) action per section; secondary actions use outline/ghost.
const variantClasses: Record<ButtonVariant, string> = {
  // teal-700 (not brand-base 600): white-on-teal-600 is 3.4:1, below the
  // 4.5:1 AA minimum. 600 remains the accent for icons/borders on white.
  primary: 'bg-teal-700 text-white hover:bg-teal-800 hover:shadow-md disabled:hover:bg-teal-700',
  outline: 'border border-navy/30 text-navy hover:border-navy hover:shadow-sm bg-transparent',
  ghost: 'text-navy hover:bg-slate-100',
};

// md/lg meet the 44px touch-target minimum; sm is for dense desktop-only spots.
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-10',
  md: 'px-5 py-3 text-base min-h-11',
  lg: 'px-7 py-3.5 text-lg min-h-12',
};

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
  'transition-all duration-200 ease-out active:scale-[0.98] ' +
  'disabled:opacity-50 disabled:pointer-events-none';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    // Plain anchor for external/mailto targets; Next Link for internal routes.
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
