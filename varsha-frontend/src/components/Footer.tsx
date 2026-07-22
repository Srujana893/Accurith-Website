import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";
import { legalPages } from "./siteData";

// Footer, A&M-style: light gray band with three zones — bold stacked links,
// company name + address, circled social icons — over a lighter small-print
// strip with the honest-framing statement, copyright, and legal links.

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Trust & Security", href: "/trust" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "Accurith on LinkedIn",
    href: "https://www.linkedin.com/company/accurith",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Contact Accurith",
    href: "/contact",
    icon: Mail,
    external: false,
  },
];

export default function Footer() {
  return (
    <footer className="text-ink">
      {/* Main band */}
      <div className="bg-sec2">
        <div className="mx-auto grid max-w-content gap-8 px-6 py-10 md:grid-cols-3 md:px-12 md:py-12">
          <nav aria-label="Footer">
            <ul>
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex min-h-9 items-center rounded-lg font-heading text-[15px] font-semibold text-ink transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="text-sm not-italic leading-relaxed text-ink-2">
            <Link href="/" aria-label="Accurith — home" className="mb-4 inline-flex">
              <Logo />
            </Link>
            <p>#24, 1st Floor, Beside Sai Castle</p>
            <p>Balaji Layout, Kodigehalli</p>
            <p>Bangalore &ndash; 560092, India</p>
          </address>

          <div className="flex items-start gap-4 md:justify-end">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Small-print strip */}
      <div className="bg-sec1">
        <div className="mx-auto max-w-content px-6 py-6 md:px-12">
          <p className="max-w-4xl text-[13px] leading-relaxed text-ink-3">
            Accurith Technologies Private Limited provides IS/IT audit, cyber
            security, risk, GRC, and digital forensics advisory. We align our
            work to frameworks such as ISO 27001, SOC 2, NIST CSF, and COBIT;
            alignment statements describe our delivery approach and are not
            certification claims. To report a security vulnerability in this
            website, see our{" "}
            <Link
              href="/trust/report-vulnerability"
              className="text-accent-dark underline underline-offset-2 transition-colors duration-200 hover:text-accent"
            >
              responsible disclosure page
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="text-xs text-ink-3">
              &copy; {new Date().getFullYear()} Accurith Technologies Private
              Limited &middot; Karnataka, India
            </p>
            <div className="flex flex-wrap items-center gap-x-5">
              {legalPages.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex min-h-9 items-center rounded-lg text-xs text-ink-3 transition-colors duration-200 hover:text-accent"
                >
                  {l.label
                    .replace(" Policy", "")
                    .replace(" of Service", "")
                    .replace("Data Processing Agreement", "DPA")}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
