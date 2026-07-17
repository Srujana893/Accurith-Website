import Link from "next/link";
import { Linkedin } from "lucide-react";
import Container from "./ui/Container";
import { legalPages, services } from "./siteData";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/about/careers" },
  { label: "Trust & Security", href: "/trust" },
  { label: "Contact", href: "/contact" },
];

const resourceLinks = [
  { label: "Blog", href: "/resources" },
  { label: "Products", href: "/products" },
  { label: "Report a Vulnerability", href: "/trust/report-vulnerability" },
];

const columnHeading =
  "mb-4 font-mono text-xs uppercase tracking-widest text-slate-400";
// min-h-11 keeps every footer link a 44px touch target.
const footerLink =
  "flex min-h-11 items-center rounded-lg text-sm text-slate-300 transition-colors duration-200 hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
            </ul>
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
            <h2 className={columnHeading}>Resources</h2>
            <ul>
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={columnHeading}>Legal</h2>
            <ul>
              {legalPages.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={footerLink}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Accurith Technologies Private Limited
            · Bengaluru, India
          </p>
          <a
            href="https://www.linkedin.com/company/accurith"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Accurith on LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors duration-200 hover:text-white"
          >
            <Linkedin aria-hidden="true" size={24} strokeWidth={1.75} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
