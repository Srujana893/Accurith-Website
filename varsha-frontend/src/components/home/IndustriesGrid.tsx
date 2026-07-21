import { industries } from "./homeData";

// 3-col hairline grid — regulator tag + industry. Plain cells, not links
// (no industry pages exist yet; no invented routes).
export default function IndustriesGrid() {
  return (
    <section className="border-t border-line-light bg-white">
      <div className="mx-auto max-w-content px-6 py-24 md:px-12">
        <p className="mb-9 font-mono text-xs uppercase tracking-kicker text-accent">
          Industries
        </p>
        <ul className="grid gap-px border border-line-light bg-line-light sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((n) => (
            <li
              key={n.reg}
              className="flex min-h-36 flex-col justify-between bg-white p-8 transition-colors duration-200 hover:bg-sec1"
            >
              <span className="font-mono text-xs text-accent">{n.reg}</span>
              <span className="font-heading text-2xl font-bold tracking-tight text-ink">
                {n.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
