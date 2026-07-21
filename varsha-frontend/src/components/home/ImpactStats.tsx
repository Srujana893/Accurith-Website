import { impact } from "./homeData";

// Four big accent numbers. Counts are real (regulators / credentials /
// practices) — house rule: no invented metrics.
export default function ImpactStats() {
  return (
    <section className="border-t border-line-light bg-sec2">
      <dl className="mx-auto grid max-w-content gap-8 px-6 py-20 md:grid-cols-4 md:px-12">
        {impact.map((s) => (
          <div key={s.label}>
            <dt className="sr-only">{s.label}</dt>
            <dd className="font-heading text-5xl font-extrabold leading-none tracking-tighter text-accent">
              {s.num}
            </dd>
            <dd className="mt-3 text-sm leading-relaxed text-ink-2">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
