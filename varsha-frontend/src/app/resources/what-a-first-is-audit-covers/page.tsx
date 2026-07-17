import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "What a first IS audit actually covers",
  description:
    "Sample post — a plain-English walkthrough of what an information systems audit examines.",
};

// Sample post with placeholder content — a preview of the article layout the
// real MDX-driven blog (S-track) will render into.
export default function SamplePostPage() {
  return (
    <Section tone="white" hairline={false} className="md:py-24">
      <Container className="max-w-2xl">
        <p className="mb-6">
          <Link
            href="/resources"
            className="inline-flex min-h-11 items-center rounded-lg font-mono text-xs uppercase tracking-widest text-teal-700 hover:underline"
          >
            ← Resources
          </Link>
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge mono>IS Audit</Badge>
          <span className="font-mono text-xs text-slate-500">
            Sample post · placeholder content · 6 min read
          </span>
        </div>
        <h1 className="mt-4 text-4xl leading-tight tracking-tight md:text-5xl">
          What a first IS audit actually covers
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-700">
          <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-600">
            Preview article — this placeholder demonstrates the post layout.
            Launch posts are written separately and rendered through the MDX
            blog pipeline.
          </p>
          <p>
            An information systems audit sounds broader than it is. In
            practice, a first audit walks a defined path: understand the
            environment, identify the systems that matter to the business,
            and test the controls those systems depend on.
          </p>
          <h2 className="pt-4 text-2xl text-navy">Where auditors start</h2>
          <p>
            Placeholder body copy — the real post will walk through scoping,
            IT general controls (access, change, operations), and how
            findings get rated and reported.
          </p>
          <h2 className="pt-4 text-2xl text-navy">What to prepare</h2>
          <p>
            Placeholder body copy — the real post will include a practical
            preparation checklist drawn from actual engagements.
          </p>
        </div>
      </Container>
    </Section>
  );
}
