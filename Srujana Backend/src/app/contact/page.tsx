import type { Metadata } from 'next';
import { Clock, Mail, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Talk to Accurith about cybersecurity, IS/IT audit, GRC, digital forensics, or audit automation. We respond within one business day.',
};

// V23 — two-column: form left, response promise + contact info right.
export default function ContactPage() {
  return (
    <Section tone="white" hairline={false} dotGrid className="md:py-24">
      <Container>
        <p className="mb-3 font-mono text-xs tracking-widest text-teal-700 uppercase">Contact</p>
        <h1 className="max-w-3xl text-4xl leading-tight tracking-tight md:text-5xl">
          Book a consultation
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-700">
          Tell us what you&apos;re working toward. No obligation, no hard sell — just a scoped,
          honest read on how we can help.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <aside className="space-y-8">
            <div className="rounded-lg border border-teal-200 bg-teal-50 p-6">
              <Clock aria-hidden="true" size={24} strokeWidth={1.75} className="text-teal-700" />
              <h2 className="text-navy mt-3 text-lg font-medium">
                We respond within one business day
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                A practitioner reads every message — not a sales queue.
              </p>
            </div>

            <div className="space-y-4">
              <p className="flex items-center gap-3 text-slate-700">
                <Mail
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.75}
                  className="shrink-0 text-teal-700"
                />
                <a
                  href="mailto:hello@accurith.com"
                  className="inline-flex min-h-11 items-center rounded-lg underline-offset-4 hover:underline"
                >
                  hello@accurith.com
                </a>
              </p>
              <p className="flex items-center gap-3 text-slate-700">
                <MapPin
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.75}
                  className="shrink-0 text-teal-700"
                />
                Bengaluru, India
              </p>
            </div>

            <p className="text-sm leading-relaxed text-slate-600">
              Form details go to our CRM so we can respond, and nowhere else — encrypted in transit.
              See how we handle data on our{' '}
              <a
                href="/trust"
                className="rounded-lg font-medium text-teal-700 underline-offset-4 hover:underline"
              >
                Trust &amp; Security
              </a>{' '}
              page.
            </p>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
