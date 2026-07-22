// Homepage content — Direction B design handoff (2026-07-21). Copy is
// client-approved and obeys the house rules: no invented metrics, only real
// credentials (DISA · FAFD · ISC2 CC · DPCAC), frameworks as plain text.

export type HeroSlide = {
  kicker: string;
  title: string;
  summary: string;
  image: string; // insight-strip card art (hero bg itself is fixed)
  href: string;
  cta: string;
};

export const heroSlides: HeroSlide[] = [
  {
    kicker: "Insights · Agentic AI",
    title:
      "From Automation to Autonomy: Redefining the Operating Model With Agentic AI",
    summary:
      "Explore how agentic AI is reshaping operating models to unlock faster decision-making, improved resilience, and scalable business impact.",
    image: "/images/home/hero-monument.jpg",
    href: "/services/ai-automation",
    cta: "Explore more",
  },
  {
    kicker: "What we do · IS/IT Audit",
    title: "IS & IT Audit",
    summary:
      "IS audits mapped to RBI ITGRCA, SEBI CSCRF and IRDAI — with findings and evidence a regulator will accept.",
    image: "/images/home/hero-audit.jpg",
    href: "/services/is-it-audit",
    cta: "Explore more",
  },
  {
    kicker: "What we do · Cyber Security",
    title: "Cyber Security",
    summary:
      "CERT-In-aligned security audits, VAPT and resilience testing — documented to a standard that stands up to scrutiny.",
    image: "/images/home/hero-cyber.jpg",
    href: "/services/cyber-security",
    cta: "Explore more",
  },
  {
    kicker: "What we do · Risk, GRC & Forensics",
    title: "Risk, GRC & Forensics",
    summary:
      "ISO 27001, SOC 2, internal controls, DPDP readiness and FAFD-led digital forensics with defensible chain-of-custody.",
    image: "/images/home/hero-forensics.jpg",
    href: "/services/risk-grc-advisory",
    cta: "Explore more",
  },
];

// Large hover rows — all six service lines, linking to their real pages.
export const expertise = [
  {
    no: "01",
    title: "IS & IT Audit",
    desc: "RBI ITGRCA, SEBI CSCRF and IRDAI assurance, evidence attached.",
    href: "/services/is-it-audit",
  },
  {
    no: "02",
    title: "Cyber Security",
    desc: "CERT-In-aligned security audits, VAPT and resilience testing.",
    href: "/services/cyber-security",
  },
  {
    no: "03",
    title: "Risk & GRC",
    desc: "ISO 27001, SOC 2, NIST, COBIT and internal controls.",
    href: "/services/risk-grc-advisory",
  },
  {
    no: "04",
    title: "AI Automation",
    desc: "Evidence collection, monitoring and workpaper drafting.",
    href: "/services/ai-automation",
  },
  {
    no: "05",
    title: "Digital Forensics",
    desc: "Fraud examination and defensible chain-of-custody.",
    href: "/services/digital-forensics",
  },
  {
    no: "06",
    title: "Managed Services",
    desc: "Ongoing security and compliance operations, as a service.",
    href: "/services/managed-services",
  },
];

// Real counts only — regulators, credentials, practices. No invented metrics.
export const impact = [
  { num: "5", label: "regulators covered — RBI, SEBI, IRDAI, CERT-In, DPDP" },
  { num: "4", label: "credentials: DISA, FAFD, ISC2 CC, DPCAC" },
  { num: "6", label: "connected practices, one evidence trail" },
  { num: "AI", label: "automation across audit and risk" },
];

export const industries = [
  { reg: "RBI", name: "Banking & NBFC" },
  { reg: "SEBI", name: "Capital Markets" },
  { reg: "IRDAI", name: "Insurance" },
  { reg: "ICAI", name: "CA & Attestation Firms" },
  { reg: "MCA", name: "Enterprises" },
  { reg: "IBC", name: "Lenders & IPs" },
];
