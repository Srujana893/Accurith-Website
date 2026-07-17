import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Careers at Accurith — join a new cybersecurity, IS-audit, and GRC advisory firm in Bengaluru.",
};

// V25 (P2) — deliberately simple: culture statement + contact. No ATS.
export default function CareersPage() {
  return (
    <Section tone="white" hairline={false} dotGrid className="md:py-28">
      <Container className="max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-teal-700">
          About / Careers
        </p>
        <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">
          We&apos;re growing
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-700">
          <p>
            Accurith is a young firm doing careful work: security testing that
            gets verified, audits that hold up, automation with a human in the
            loop. If you like evidence more than theatre, you&apos;ll fit in.
          </p>
          <p>
            We don&apos;t have open roles listed yet. If you work in security
            testing, IS audit, GRC, or audit automation and want to build a
            firm rather than join a finished one, introduce yourself.
          </p>
        </div>
        <div className="mt-10">
          <Button href="mailto:careers@accurith.com">
            Write to careers@accurith.com
          </Button>
        </div>
      </Container>
    </Section>
  );
}
