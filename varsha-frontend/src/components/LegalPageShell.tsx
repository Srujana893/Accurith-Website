import { FileWarning } from "lucide-react";
import Container from "./ui/Container";
import Section from "./ui/Section";

// Legal pages are shells only — drafting real policy language is counsel's
// job (hard rule 8). The draft banner must stay until legal sign-off.
export default function LegalPageShell({
  title,
  paragraphs,
}: {
  title: string;
  paragraphs: string[];
}) {
  return (
    <Section tone="white" hairline={false} className="md:py-24">
      <Container className="max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-teal-700">
          Legal
        </p>
        <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>

        <div
          role="note"
          className="mt-8 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4"
        >
          <FileWarning
            aria-hidden="true"
            size={24}
            strokeWidth={1.75}
            className="shrink-0 text-amber-600"
          />
          <p className="text-sm leading-relaxed text-amber-900">
            <strong className="font-medium">Draft — pending legal review.</strong>{" "}
            This page is a structural placeholder. Final wording will be
            prepared and approved by counsel before launch.
          </p>
        </div>

        <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-700">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
