import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/SectionHeading';
import CareersOpenings from '@/components/CareersOpenings';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Careers',
  description:
    'Open roles at Accurith — a cybersecurity, IS-audit, and GRC advisory firm in Bengaluru. Security testing, IS audit, GRC, and audit automation.',
  path: '/careers',
});

export default function CareersPage() {
  return (
    <>
      <Section tone="white" hairline={false} dotGrid className="md:py-28">
        <Container className="max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-widest text-teal-700 uppercase">Careers</p>
          <h1 className="text-4xl leading-tight tracking-tight md:text-5xl">We&apos;re growing</h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Accurith is a young firm doing careful work: security testing that gets verified, audits
            that hold up, automation with a human in the loop. If you like evidence more than
            theatre, you&apos;ll fit in.
          </p>
        </Container>
      </Section>

      <Section tone="grey">
        <Container className="max-w-3xl">
          <SectionHeading index="01" label="Open roles" title="Current openings" />
          <div className="mt-10">
            <CareersOpenings />
          </div>
          <p className="mt-8 text-sm leading-relaxed text-slate-600">
            We don&apos;t accept file uploads at this stage — applications go by link (LinkedIn,
            portfolio, Drive). It&apos;s a deliberate security decision, not an oversight.
          </p>
        </Container>
      </Section>
    </>
  );
}
