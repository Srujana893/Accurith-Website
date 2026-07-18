import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from './ui/cn';
import type { Service } from './siteData';

// Precision-hover: border tint + shadow lift, 200ms ease-out. Featured cards
// get the corner-tick treatment (signature element 1).
export default function ServiceCard({
  service,
  className,
}: {
  service: Service;
  className?: string;
}) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        'group flex flex-col rounded-lg border border-slate-200 bg-white p-6 transition-all duration-200 ease-out hover:border-teal-300 hover:shadow-md',
        service.featured && 'corner-ticks',
        className,
      )}
    >
      <Icon aria-hidden="true" size={24} strokeWidth={1.75} className="text-teal-700" />
      <h3 className="font-heading text-navy mt-4 text-lg font-medium">{service.name}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-700">
        {service.shortDescription}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700 group-hover:text-teal-800">
        Learn more
        <ArrowRight
          aria-hidden="true"
          size={16}
          strokeWidth={1.75}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
