import {
  ShieldCheck,
  ClipboardCheck,
  BrainCircuit,
  SearchCheck,
  Scale,
  Cog,
  type LucideIcon,
} from 'lucide-react';

// Single source of truth for the six services — Header mega-menu, Footer,
// Services overview, Home grid, and the Contact dropdown all read from here.
export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: LucideIcon;
  featured: boolean;
};

export const services: Service[] = [
  {
    slug: 'cyber-security',
    name: 'Cyber Security',
    shortDescription: 'VAPT, security audits, cloud security review, and incident response.',
    icon: ShieldCheck,
    featured: true,
  },
  {
    slug: 'is-it-audit',
    name: 'IS / IT Audit',
    shortDescription: 'IS audits, ITGC reviews, SOC 2 readiness, and control testing.',
    icon: ClipboardCheck,
    featured: true,
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    shortDescription: 'Workpaper generation, continuous controls monitoring, anomaly detection.',
    icon: BrainCircuit,
    featured: true,
  },
  {
    slug: 'digital-forensics',
    name: 'Digital Forensics',
    shortDescription: 'Computer, mobile, and cloud forensics with defensible chain of custody.',
    icon: SearchCheck,
    featured: true,
  },
  {
    slug: 'risk-grc-advisory',
    name: 'Risk & GRC Advisory',
    shortDescription: 'Risk assessments, governance frameworks, and compliance programmes.',
    icon: Scale,
    featured: false,
  },
  {
    slug: 'managed-services',
    name: 'Managed Services',
    shortDescription: 'Ongoing security and compliance operations, delivered as a service.',
    icon: Cog,
    featured: false,
  },
];

export const featuredServices = services.filter((s) => s.featured);
export const additionalServices = services.filter((s) => !s.featured);

// Leadership credentials — the #1 trust asset. Shown where a competitor would
// put a customer-logo wall (Home + About).
export const credentials = ['CISA', 'CISSP', 'CISM', 'CEH', 'CA'];

// Frameworks Accurith aligns delivery to. Always rendered as text Badge chips.
export const frameworks = ['ISO 27001', 'SOC 2', 'NIST CSF', 'COBIT', 'DPDP', 'GDPR', 'PCI-DSS'];

export const primaryNav = [
  { label: 'Services', href: '/services', hasMenu: true },
  { label: 'Products', href: '/products' },
  { label: 'Trust', href: '/trust' },
  { label: 'About', href: '/about' },
  { label: 'Resources', href: '/resources/blog' },
];

export const legalPages = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Cookie Policy', href: '/legal/cookies' },
  { label: 'Data Processing Agreement', href: '/legal/dpa' },
];
