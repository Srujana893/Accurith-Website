"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Link2,
  Menu,
} from "lucide-react";
import { cn } from "../ui/cn";
import { heroSlides } from "./homeData";

// Full-viewport hero carousel + "Latest insights" index strip. One client
// component because the index cards jump the carousel (shared slide state).
// Auto-advances every 7s; paused on hover and fully off under
// prefers-reduced-motion. Crossfade is a pure opacity transition.

const SLIDE_COUNT = heroSlides.length;
// Static classes per slide index so the progress bar needs no inline style
// (house rule: no style= in shipped React — CSP posture).
const progressWidths = ["w-1/3", "w-2/3", "w-full"];

// prefers-reduced-motion as an external store (SSR snapshot: false).
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;

function AssistantDeviceMock({ slide }: { slide: (typeof heroSlides)[number] }) {
  // Static product mockup, not a live assistant — decorative, hidden from AT.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 top-1/2 z-10 hidden w-full max-w-[46rem] -translate-y-1/2 xl:block"
    >
      <div className="flex overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl [transform-origin:left_center] [transform:perspective(1300px)_rotateY(-22deg)_rotateX(4deg)]">
        {/* dark rail */}
        <div className="flex w-16 shrink-0 flex-col items-center gap-6 bg-base py-5">
          <Menu size={18} className="text-slate-400" />
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-heading text-base font-extrabold text-white">
            a
          </span>
        </div>
        {/* light chat panel */}
        <div className="flex-1 bg-sec1 p-10 pb-12">
          <p className="font-heading text-3xl font-bold tracking-tight text-ink">
            {slide.deviceHeading}
          </p>
          <div className="mt-5 rounded-xl border-2 border-accent bg-white p-4 pb-3 shadow-lg">
            <p className="text-[15px] text-ink-3">{slide.devicePlaceholder}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-ink-3">
                <Link2 size={15} />
                Tools ▾
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-light text-ink">
                <ArrowUp size={16} />
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {slide.deviceChips.map((chip) => (
              <span
                key={chip}
                className="whitespace-nowrap rounded-full border border-line-light bg-white px-4 py-2 text-[13px] text-ink-2"
              >
                {chip}
              </span>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-2">{slide.deviceNote}</p>
        </div>
      </div>
    </div>
  );
}

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
        className="relative min-h-[45rem] overflow-hidden bg-base text-white lg:h-screen"
      >
        {/* slide backgrounds — stacked, crossfaded by opacity */}
        {heroSlides.map((slide, i) => (
          <div
            key={slide.title}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            {/* left→right scrim for text legibility + top/bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-base/95 via-base/70 to-base/25" />
            <div className="absolute inset-0 bg-gradient-to-b from-base/50 via-transparent to-base/60" />
          </div>
        ))}

        {/* active slide content — keyed so the rise animation restarts */}
        <div className="relative z-20 mx-auto flex h-full min-h-[45rem] max-w-content items-center px-6 md:px-12 lg:h-screen">
          <div key={current.title} className="anim-rise max-w-xl py-24">
            <p className="font-mono text-xs uppercase tracking-kicker text-accent-light">
              {current.kicker}
            </p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold leading-[1.03] tracking-tighter text-white sm:text-5xl xl:text-6xl">
              {current.title}
            </h1>
            <div className="my-6 h-px max-w-lg bg-white/25" />
            <p className="max-w-lg text-lg leading-relaxed text-white/80">
              {current.summary}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex min-h-11 items-center gap-3.5 rounded-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-white">
                <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
              </span>
              <span className="font-mono text-[13px] uppercase tracking-kicker text-white">
                Read more
              </span>
            </Link>
          </div>
        </div>

        <AssistantDeviceMock slide={current} />

        {/* prev / next */}
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
          <div className="grid gap-6 md:grid-cols-3">
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
                    sizes="(min-width: 768px) 33vw, 100vw"
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
