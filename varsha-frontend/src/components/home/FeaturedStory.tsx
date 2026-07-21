import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Featured split — full-height image left, editorial text right.
export default function FeaturedStory() {
  return (
    <section className="bg-sec1">
      <div className="mx-auto grid max-w-content items-stretch md:grid-cols-2">
        <div className="relative min-h-80 md:min-h-[32.5rem]">
          <Image
            src="/images/home/featured-robot.png"
            alt="AI assistant illustration"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-16 md:px-16 md:py-24">
          <p className="font-mono text-xs uppercase tracking-kicker text-accent">
            Featured
          </p>
          <h2 className="mt-5 font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-ink md:text-4xl">
            The India regulatory-audit opportunity, mapped.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
            Where RBI, SEBI, IRDAI, CERT-In, the Companies Act, IBC and the
            DPDP Act force IS, risk and forensic audits — and how credentialed
            firms capture that mandated demand with the right tooling.
          </p>
          <Link
            href="/resources"
            className="mt-8 inline-flex min-h-11 items-center gap-3.5 self-start rounded-lg"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-white">
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
            </span>
            <span className="font-mono text-[13px] uppercase tracking-kicker text-ink">
              Read the analysis
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
