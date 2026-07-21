import Link from "next/link";
import { Linkedin } from "lucide-react";
import Logo from "./Logo";
import { companyLinks, legalPages, services } from "./siteData";

// Direction B footer — darkest surface, logo on a white chip, blurb + real
// Bengaluru address, three link columns, legal row.

const contactLinks = [
  { label: "Request a demo", href: "/contact" },
  { label: "Book a consultation", href: "/contact" },
  { label: "Report a vulnerability", href: "/trust/report-vulnerability" },
];

const columnHeading =
  "mb-4 font-mono text-xs uppercase tracking-widest text-slate-400";
// min-h-11 keeps every footer link a 44px touch target.
const footerLink =
  "flex min-h-11 items-center rounded-lg text-sm text-slate-300 transition-colors duration-200 hover:text-accent-light";

export default function Footer() {
  return (
    <footer className="bg-footer text-slate-300">
      <div className="mx-auto max-w-content px-6 pb-11 pt-16 md:px-12">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="rounded-lg">
              <Logo theme="dark" />
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed text-slate-400">
              Audit-grade AI for India&rsquo;s regulatory reality — IS/IT
              audit, risk, GRC and digital forensics.
            </p>
            <p className="max-w-xs text-[13px] leading-relaxed text-slate-400">
              #24, 1st Floor, Beside Sai Castle, Balaji Layout, Kodigehalli,
              Bangalore – 560092
            </p>
          </div>
          <div>
            <h2 className={columnHeading}>Services</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={footerLink}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={columnHeading}>Company</h2>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/resources" className={footerLink}>
                  Insights
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={columnHeading}>Contact</h2>
            <ul>
              {contactLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-col items-start justify-between gap-4 border-t border-line-footer pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Accurith Technologies Private Limited
            · Karnataka, India
          </p>
          <div className="flex items-center gap-5">
            {legalPages.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex min-h-11 items-center rounded-lg text-xs text-slate-400 transition-colors duration-200 hover:text-accent-light"
              >
                {l.label
                  .replace(" Policy", "")
                  .replace(" of Service", "")
                  .replace("Data Processing Agreement", "DPA")}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/company/accurith"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Accurith on LinkedIn"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:text-accent-light"
            >
              <Linkedin aria-hidden="true" size={20} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
