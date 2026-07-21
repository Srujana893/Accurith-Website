import Link from "next/link";
import { expertise } from "./homeData";

// "What we do" — large hover rows, one per service line. Hover nudges the
// row right 12px (disabled under reduced motion via motion-safe).
export default function ExpertiseList() {
  return (
    <section className="bg-sec1">
      <div className="mx-auto max-w-content px-6 py-24 md:px-12">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-kicker text-accent">
            What we do
          </p>
          <p className="max-w-sm text-[15px] text-ink-3 sm:text-right">
            Audit, risk and forensic expertise paired with AI automation.
          </p>
        </div>
        <ul>
          {expertise.map((e) => (
            <li key={e.no} className="border-t border-line-light">
              <Link
                href={e.href}
                className="flex flex-col gap-2 py-7 transition-[padding] duration-200 motion-safe:hover:pl-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-[13px] text-ink-3">
                    {e.no}
                  </span>
                  <span className="font-heading text-2xl font-bold tracking-tighter text-ink md:text-4xl">
                    {e.title}
                  </span>
                </span>
                <span className="max-w-sm text-[15px] text-ink-3">
                  {e.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-line-light" />
      </div>
    </section>
  );
}
