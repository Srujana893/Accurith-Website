import Image from "next/image";
import Link from "next/link";

// Full-bleed CTA band — image + dark→accent gradient wash, two actions.
// Both routes go to /contact where the consultation form lives.
export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-base">
      <div className="absolute inset-0">
        <Image
          src="/images/home/cta-band.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-footer via-base/90 to-accent/40" />
      </div>
      <div className="relative z-10 mx-auto max-w-content px-6 py-28 text-center md:px-12">
        <h2 className="mx-auto max-w-3xl font-heading text-3xl font-extrabold leading-[1.05] tracking-tighter text-white md:text-5xl">
          See it run against the regulator you answer to.
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center rounded-lg bg-white px-7 text-[15px] font-bold text-footer transition-colors duration-200 hover:bg-sec2"
          >
            Request a Demo
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center rounded-lg border border-white/70 px-7 text-[15px] font-bold text-white transition-colors duration-200 hover:border-white"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
