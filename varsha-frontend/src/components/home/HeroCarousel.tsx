"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../ui/cn";
import { heroSlides } from "./homeData";

// Full-viewport hero carousel + "Latest insights" index strip. One client
// component because the index cards jump the carousel (shared slide state).
// Auto-advances every 7s; paused on hover and fully off under
// prefers-reduced-motion. One fixed background (brand artwork); only the
// slide text swaps, re-keyed so the rise animation restarts. Copy sits on
// the LEFT (Varsha, 2026-07-22 — "keep workings to left only") with an
// accent rule and a solid "Explore more" CTA; the monument owns the right.

const SLIDE_COUNT = heroSlides.length;
// Static classes per slide index so the progress bar needs no inline style
// (house rule: no style= in shipped React — CSP posture).
const progressWidths = ["w-1/4", "w-2/4", "w-3/4", "w-full"];

// prefers-reduced-motion as an external store (SSR snapshot: false).
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDE_COUNT), 7000);
    return () => clearInterval(t);
  }, [paused, reducedMotion]);

  const go = (n: number) =>
    setIndex(((n % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);

  const jumpTo = (n: number) => {
    go(n);
    heroRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const current = heroSlides[index];

  return (
    <>
      <section
        ref={heroRef}
        aria-roledescription="carousel"
        aria-label="What Accurith does"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative min-h-[45rem] overflow-hidden bg-hero text-white lg:h-screen"
      >
        {/* fixed background — one 16:9 brand artwork, slides change on top.
            The "A" monument sits center-frame, so center the crop; narrow
            viewports trim the skyline and shield edges evenly. */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/hero-bg.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* left→right scrim behind the left-aligned copy + vignette;
              flat darkening on small screens where copy sits over the art */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-hero/90 via-hero/45 to-transparent lg:block" />
          <div className="absolute inset-0 bg-hero/55 lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-hero/50 via-transparent to-hero/60" />
        </div>

        {/* active slide content — keyed so the rise animation restarts */}
        <div className="relative z-20 mx-auto flex h-full min-h-[45rem] max-w-content items-center px-6 md:px-12 lg:h-screen">
          <div key={current.title} className="anim-rise w-full max-w-2xl py-24">
            <p className="font-mono text-xs uppercase tracking-kicker text-accent-light">
              {current.kicker}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl">
              {current.title}
            </h1>
            <div className="mt-7 h-1 w-16 bg-accent" />
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/85">
              {current.summary}
            </p>
            <Link
              href={current.href}
              className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-card bg-accent px-7 text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              {current.cta}
              <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />
            </Link>
          </div>
        </div>

        {/* prev / next — bottom-right over the artwork, clear of the CTA */}
        <div className="absolute bottom-11 right-6 z-20 flex items-center gap-2 md:right-12">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => go(index - 1)}
            className="flex h-14 w-14 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => go(index + 1)}
            className="flex h-14 w-14 items-center justify-center border border-white/40 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight aria-hidden="true" size={20} strokeWidth={1.75} />
          </button>
        </div>

        {/* progress bar */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-20 h-0.5 bg-white/15"
        >
          <div
            className={cn(
              "h-full bg-white transition-all duration-500",
              progressWidths[index] ?? "w-full",
            )}
          />
        </div>

        {/* scroll hint */}
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-mono text-[11px] uppercase tracking-kicker text-white/70">
            Scroll
          </span>
          <span className="text-sm text-white/70">↓</span>
        </div>
      </section>

      {/* insight index strip — cards mirror the slides and jump the carousel */}
      <section className="border-t border-line-light bg-white">
        <div className="mx-auto max-w-content px-6 py-16 md:px-12">
          <p className="mb-8 font-mono text-xs uppercase tracking-kicker text-accent">
            Latest insights
          </p>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Show slide: ${slide.title}`}
                aria-current={i === index || undefined}
                className={cn(
                  "overflow-hidden rounded-card border bg-base text-left transition-colors duration-200",
                  i === index
                    ? "border-accent"
                    : "border-line-dark hover:border-accent",
                )}
              >
                <span className="relative block h-48">
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </span>
                <span className="block p-6">
                  <span className="block font-mono text-[11px] uppercase tracking-widest text-slate-400">
                    {slide.kicker}
                  </span>
                  <span className="mt-3 block font-heading text-xl font-bold leading-tight tracking-tight text-white">
                    {slide.title}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
