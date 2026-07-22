import Link from "next/link";

// Careers segment, two stacked parts (layout ref: A&M careers banner):
// 1. Dark credential band — text chips only, never badge/seal images.
// 2. Light "work with us" CTA — four practice tracks → careers@accurith.com.
// Counts on real credentials only (DISA · FAFD · ISC2 CC · DPCAC).

const credentials = ["DISA", "FAFD", "ISC2 CC", "DPCAC"];

const tracks = [
  { label: "Security Testing", subject: "Careers - Security Testing" },
  { label: "IS Audit", subject: "Careers - IS Audit" },
  { label: "Risk & GRC", subject: "Careers - Risk and GRC" },
  { label: "Audit Automation", subject: "Careers - Audit Automation" },
];

export default function CareersBand() {
  return (
    <section aria-labelledby="careers-heading">
      {/* Credential band */}
      <div className="bg-base bg-gradient-to-tr from-footer via-base to-accent-dark/50">
        <div className="mx-auto flex max-w-content flex-col items-start gap-8 px-6 py-16 md:flex-row md:items-center md:gap-14 md:px-12">
          <ul className="flex flex-wrap gap-3">
            {credentials.map((c) => (
              <li
                key={c}
                className="rounded-card border border-white/30 px-4 py-2.5 font-mono text-sm uppercase tracking-kicker text-white"
              >
                {c}
              </li>
            ))}
          </ul>
          <p className="max-w-2xl font-heading text-2xl font-extrabold leading-[1.15] tracking-tighter text-white md:text-3xl">
            Our practice leads hold DISA, FAFD, ISC2 CC and DPCAC —
            credentials you can verify, on every engagement.
          </p>
        </div>
      </div>

      {/* Careers CTA */}
      <div className="bg-white">
        <div className="mx-auto max-w-content px-6 py-20 text-center md:px-12 md:py-24">
          <h2
            id="careers-heading"
            className="mx-auto max-w-3xl font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-ink md:text-4xl"
          >
            Interested in working with us?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-ink-2">
            We&apos;re growing. Take the first step — tell us which practice
            fits you best.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3.5">
            {tracks.map((t) => (
              <a
                key={t.label}
                href={`mailto:careers@accurith.com?subject=${encodeURIComponent(t.subject)}`}
                className="inline-flex min-h-12 items-center rounded-card bg-accent px-7 font-mono text-[13px] uppercase tracking-kicker text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                {t.label}
              </a>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-sm leading-relaxed text-ink-3">
            Accurith is a young firm doing careful work: security testing that
            gets verified, audits that hold up, automation with a human in the
            loop. If you like evidence more than theatre, you&apos;ll fit in.
            No open roles are listed yet —{" "}
            <Link
              href="/about/careers"
              className="text-accent underline-offset-4 hover:underline"
            >
              read about careers at Accurith
            </Link>{" "}
            or write to careers@accurith.com.
          </p>
        </div>
      </div>
    </section>
  );
}
