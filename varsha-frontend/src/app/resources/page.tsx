import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Resources & Blog",
  description:
    "Plain-spoken writing on audit, security, and automation from the Accurith team.",
};

// Preview of the real blog — production posts are MDX files in /content/blog
// rendered through Srujana's pipeline (S-track). This list is a styled shell
// with one sample post so the route and layout are real.
export default function ResourcesPage() {
  return (
    <>
      <Section tone="white" hairline={false} dotGrid className="md:py-28">
        <Container>
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-teal-700">
            Resources
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight tracking-tight md:text-5xl">
            Notes from the practice
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-700">
            Plain-spoken writing on audit, security, and automation — the
            things we explain to clients most often, written down once.
          </p>
        </Container>
      </Section>

      <Section tone="grey">
        <Container>
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-slate-500">
            Preview — the launch blog runs on the MDX pipeline
          </p>
          <div className="grid gap-6 md:max-w-2xl">
            <Link
              href="/resources/what-a-first-is-audit-covers"
              className="group corner-ticks rounded-lg border border-slate-200 bg-white p-6 transition-all duration-200 ease-out hover:border-teal-300 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge mono>IS Audit</Badge>
                <span className="font-mono text-xs text-slate-500">
                  Sample post · 6 min read
                </span>
              </div>
              <h2 className="mt-4 text-2xl leading-tight group-hover:text-teal-700">
                What a first IS audit actually covers
              </h2>
              <p className="mt-2 leading-relaxed text-slate-700">
                If you&apos;ve never been through an information systems audit,
                the scope can look opaque. Here&apos;s what auditors look at,
                in the order they look at it.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-700">
                Read the post
                <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </span>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
