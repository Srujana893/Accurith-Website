import {
  FileSearch,
  Activity,
  Radar,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import {
  credentials,
  featuredServices,
  frameworks,
} from "@/components/siteData";

// V10 — placeholder methodology; final step copy pending the client's real
// methodology. Layout is real, wording is illustrative.
const methodologySteps = [
  {
    number: "01",
    title: "Assess",
    description:
      "Understand your environment, obligations, and current control posture.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Define the controls, policies, and remediation plan that fit your risk.",
  },
  {
    number: "03",
    title: "Implement",
    description:
      "Execute alongside your teams — hands-on, evidence-driven, on schedule.",
  },
  {
    number: "04",
    title: "Monitor",
    description:
      "Keep controls operating with continuous monitoring and periodic review.",
  },
];

const roles = [
  {
    role: "CISO",
    painPoint:
      "You need assurance your controls actually work — before an auditor, regulator, or attacker checks for you.",
  },
  {
    role: "Head of Internal Audit",
    painPoint:
      "Audit scope grows every year while your team doesn't. Evidence collection still eats most of the plan.",
  },
  {
    role: "CRO",
    painPoint:
      "Technology risk is now board-agenda risk, and you need it quantified and reported in business terms.",
  },
  {
    role: "CFO / Finance",
    painPoint:
      "ICFR, SOX-style controls, and IT dependencies — you sign off on them, so they need to hold up.",
  },
];

const aiFeatures = [
  {
    icon: FileSearch,
    title: "Automated evidence collection",
    description:
      "Pull audit evidence from your systems on a schedule instead of chasing screenshots.",
  },
  {
    icon: Activity,
    title: "Continuous controls monitoring",
    description:
      "Know when a control drifts out of tolerance — not at the next annual review.",
  },
  {
    icon: Radar,
    title: "Anomaly detection",
    description:
      "Surface unusual transactions and access patterns for auditor review, early.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* V07 — Hero */}
      <Section tone="white" hairline={false} dotGrid className="md:py-32">
        <Container>
          <h1 className="max-w-4xl text-4xl leading-tight tracking-tight md:text-6xl">
            Audit, secure, and automate — with confidence
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Accurith is a cybersecurity, IS-audit, and GRC advisory firm — with
            audit-automation platforms on the way. We help you prove your
            controls work.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              Book a Consultation
            </Button>
            <Button href="/services" size="lg" variant="outline">
              Explore services
            </Button>
          </div>
        </Container>
      </Section>

      {/* V08 — Trust strip: frameworks as text chips, never seal images */}
      <Section
        tone="grey"
        className="py-6 md:py-8"
        aria-label="Frameworks we align our delivery to"
      >
        <Container className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <p className="shrink-0 font-mono text-xs uppercase tracking-widest text-slate-500">
            Frameworks we align our delivery to
          </p>
          <ul className="flex gap-2 overflow-x-auto md:flex-wrap">
            {frameworks.map((f) => (
              <li key={f} className="shrink-0">
                <Badge mono>{f}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* V09 — Featured services */}
      <Section tone="white">
        <Container>
          <SectionHeading
            index="01"
            label="Services"
            title="What we do"
            description="Advisory that holds up to scrutiny — from assessment through evidence."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Signature element 3 — credential chips where a logo wall would be */}
      <Section tone="white" className="py-10 md:py-12">
        <Container className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            Led by certified practitioners
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {credentials.map((c) => (
              <li key={c}>
                <Badge mono className="px-4 py-1.5 text-sm">
                  {c}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-600">
            Certifications held by our leadership team, not the letterhead.
          </p>
        </Container>
      </Section>

      {/* V10 — Methodology timeline */}
      <Section tone="grey" dotGrid>
        <Container>
          <SectionHeading
            index="02"
            label="Approach"
            title="How an engagement runs"
            description="A consistent, evidence-first method across every service line."
          />
          <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
            {/* Thin connecting line, desktop only */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-4 hidden h-px bg-slate-300 md:block"
            />
            {methodologySteps.map((step) => (
              <li key={step.number} className="relative">
                <p className="inline-flex rounded-lg border border-teal-300 bg-white px-2 py-1 font-mono text-xs text-teal-800">
                  {step.number}
                </p>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* V11 — Solutions by role (visually distinct from service cards) */}
      <Section tone="white">
        <Container>
          <SectionHeading
            index="03"
            label="Who we help"
            title="Built around the person accountable"
            description="Different seats carry different risk. We scope engagements to yours."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r) => (
              <div
                key={r.role}
                className="flex flex-col rounded-lg border-l-2 border-teal-600 bg-slate-50 p-6"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-navy">
                  {r.role}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700">
                  {r.painPoint}
                </p>
                <a
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1 rounded-lg text-sm font-medium text-teal-700 hover:text-teal-800"
                >
                  See solutions
                  <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
                </a>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* V12 — AI automation band (the one dark section) */}
      <Section tone="navy" dotGrid>
        <Container>
          <SectionHeading
            index="04"
            label="AI Automation"
            title="AI-powered automation for audit & risk"
            description="The manual parts of audit — evidence, tie-outs, sampling — are exactly what software does best. We build that into how we deliver."
            onNavy
          />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {aiFeatures.map((f) => (
              <div key={f.title}>
                <f.icon
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.75}
                  className="text-teal-300"
                />
                <h3 className="mt-4 text-lg text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Button href="/services/ai-automation">
              Explore AI Automation
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
            </Button>
          </div>
        </Container>
      </Section>

      {/* V13 — Products teaser: no screenshots, no pricing */}
      <Section tone="grey">
        <Container className="max-w-3xl text-center">
          <Badge mono className="mb-4">
            Launching soon
          </Badge>
          <h2 className="text-2xl leading-tight tracking-tight md:text-4xl">
            Audit automation, productised
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            The automation platforms we use in our own engagements — evidence
            collection, controls monitoring, and audit workpapers — are in
            testing now, ahead of general availability.
          </p>
          <div className="mt-8">
            <Button href="/products">Request Early Access</Button>
          </div>
        </Container>
      </Section>

      {/* V14 — Final CTA (the transparency band itself is global, above the footer) */}
      <Section tone="white">
        <Container className="max-w-3xl text-center">
          <h2 className="text-2xl leading-tight tracking-tight md:text-4xl">
            Ready to talk?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            Tell us what you need to prove, protect, or automate. We respond
            within one business day.
          </p>
          <div className="mt-8">
            <Button href="/contact" size="lg">
              Book a Consultation
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
