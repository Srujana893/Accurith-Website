'use client';

import { useEffect, useState } from 'react';
import { Briefcase, CheckCircle2, CircleAlert, LoaderCircle, MapPin } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';
import { cn } from './ui/cn';

// Careers integration (J01): openings come from GET /api/careers/openings
// (seeded/managed by Srujana via Prisma); applications POST to
// /api/careers/apply. No file uploads by design — applicants give links.

type Opening = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  descriptionMd: string;
  postedAt: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputClasses =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-dark placeholder:text-slate-500 transition-colors duration-200 hover:border-slate-400';

const emptyApplication = {
  name: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  portfolioUrl: '',
  coverNote: '',
  website: '', // honeypot — stays empty for humans
};

function ApplyForm({ opening }: { opening: Opening }) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState(emptyApplication);

  const update =
    (field: keyof typeof emptyApplication) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ openingId: opening.id, ...form }),
      });
      const data: { success?: boolean } = await res.json();
      setStatus(res.ok && data.success !== false ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="mt-4 rounded-lg border border-teal-300 bg-teal-50 p-6">
        <CheckCircle2 aria-hidden="true" size={24} strokeWidth={1.75} className="text-teal-700" />
        <h4 className="text-navy mt-3 text-lg font-medium">Application received.</h4>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">
          Thank you — we read every application and will get back to you either way.
        </p>
      </div>
    );
  }

  const fieldId = (name: string) => `apply-${opening.slug}-${name}`;

  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t border-slate-200 pt-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className="text-navy mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id={fieldId('name')}
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update('name')}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={fieldId('email')} className="text-navy mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id={fieldId('email')}
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update('email')}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor={fieldId('phone')} className="text-navy mb-1.5 block text-sm font-medium">
            Phone
          </label>
          <input
            id={fieldId('phone')}
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={update('phone')}
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor={fieldId('linkedin')}
            className="text-navy mb-1.5 block text-sm font-medium"
          >
            LinkedIn URL
          </label>
          <input
            id={fieldId('linkedin')}
            type="url"
            required
            placeholder="https://linkedin.com/in/…"
            value={form.linkedinUrl}
            onChange={update('linkedinUrl')}
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor={fieldId('portfolio')}
            className="text-navy mb-1.5 block text-sm font-medium"
          >
            Portfolio / work sample URL{' '}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <input
            id={fieldId('portfolio')}
            type="url"
            placeholder="https://…"
            value={form.portfolioUrl}
            onChange={update('portfolioUrl')}
            className={inputClasses}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={fieldId('note')} className="text-navy mb-1.5 block text-sm font-medium">
            Cover note
          </label>
          <textarea
            id={fieldId('note')}
            required
            rows={4}
            value={form.coverNote}
            onChange={update('coverNote')}
            className={inputClasses}
            placeholder="Why this role, and what should we look at first?"
          />
        </div>
        {/* Honeypot — visually hidden, excluded from tab order and AT. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor={fieldId('website')}>Website</label>
          <input
            id={fieldId('website')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={update('website')}
          />
        </div>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mt-4 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4"
        >
          <CircleAlert
            aria-hidden="true"
            size={24}
            strokeWidth={1.75}
            className="shrink-0 text-red-600"
          />
          <p className="text-sm leading-relaxed text-red-800">
            That didn&apos;t go through — please check the fields (LinkedIn needs a full https://
            URL) and try again, or email{' '}
            <a
              href="mailto:careers@accurith.com"
              className="font-medium underline underline-offset-2"
            >
              careers@accurith.com
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-5" aria-live="polite">
        <Button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? (
            <>
              <LoaderCircle
                aria-hidden="true"
                size={16}
                strokeWidth={1.75}
                className="animate-spin"
              />
              Submitting…
            </>
          ) : (
            'Submit application'
          )}
        </Button>
      </div>
    </form>
  );
}

export default function CareersOpenings() {
  const [openings, setOpenings] = useState<Opening[] | null>(null);
  const [applyingTo, setApplyingTo] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/careers/openings')
      .then((res) => res.json())
      .then((data: { openings?: Opening[] }) => {
        if (!cancelled) setOpenings(data.openings ?? []);
      })
      .catch(() => {
        if (!cancelled) setOpenings([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (openings === null) {
    return (
      <p className="flex items-center gap-2 text-slate-600" role="status">
        <LoaderCircle aria-hidden="true" size={24} strokeWidth={1.75} className="animate-spin" />
        Loading open roles…
      </p>
    );
  }

  if (openings.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
        <p className="leading-relaxed text-slate-700">
          No listed openings right now — but we&apos;re a young firm and that changes often. If you
          work in security testing, IS audit, GRC, or audit automation, introduce yourself at{' '}
          <a
            href="mailto:careers@accurith.com"
            className="rounded-lg font-medium text-teal-700 underline-offset-4 hover:underline"
          >
            careers@accurith.com
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-6">
      {openings.map((o) => (
        <li key={o.id} className="corner-ticks rounded-lg border border-slate-200 bg-white p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-navy text-xl">{o.title}</h3>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Briefcase
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.75}
                    className="text-teal-700"
                  />
                  {o.department} · {o.employmentType}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.75}
                    className="text-teal-700"
                  />
                  {o.location}
                </span>
              </p>
            </div>
            <Badge mono>Open</Badge>
          </div>
          <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-slate-700">
            {o.descriptionMd}
          </p>
          <div className="mt-4">
            <Button
              variant={applyingTo === o.id ? 'outline' : 'primary'}
              size="sm"
              aria-expanded={applyingTo === o.id}
              onClick={() => setApplyingTo((cur) => (cur === o.id ? null : o.id))}
            >
              {applyingTo === o.id ? 'Close application form' : 'Apply for this role'}
            </Button>
          </div>
          <div className={cn(applyingTo !== o.id && 'hidden')}>
            <ApplyForm opening={o} />
          </div>
        </li>
      ))}
    </ul>
  );
}
