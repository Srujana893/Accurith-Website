"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { cn } from "./ui/cn";
import {
  additionalServices,
  featuredServices,
  primaryNav,
} from "./siteData";

function Wordmark() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 rounded-lg font-heading text-xl font-semibold tracking-tight text-navy"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy font-heading text-base text-white"
      >
        A
        <span className="ml-px inline-block h-3.5 w-0.5 bg-teal-400" />
      </span>
      Accurith
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const megaMenuId = useId();

  // Close both menus whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Desktop mega-menu: close on Escape or click outside.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  // Mobile slide-over: lock body scroll, close on Escape, keep Tab inside.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        mobileToggleRef.current?.focus();
      }
      if (e.key === "Tab" && mobilePanelRef.current) {
        const focusables = mobilePanelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClasses = (href: string) =>
    cn(
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
      isActive(href)
        ? "text-teal-700"
        : "text-slate-700 hover:text-navy",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
      <Container className="flex h-16 items-center justify-between">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.hasMenu ? (
              <div key={item.label} ref={menuRef} className="relative">
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls={megaMenuId}
                  onClick={() => setServicesOpen((o) => !o)}
                  className={cn(
                    navLinkClasses(item.href),
                    "flex items-center gap-1",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.75}
                    className={cn(
                      "transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Mega-menu: featured vs. other services */}
                {servicesOpen && (
                  <div
                    id={megaMenuId}
                    className="absolute left-1/2 top-full z-50 mt-2 w-[36rem] -translate-x-1/2 rounded-lg border border-slate-200 bg-white p-6 shadow-xl"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                          Featured
                        </p>
                        <ul className="space-y-1">
                          {featuredServices.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                className="group flex gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-slate-50"
                              >
                                <s.icon
                                  aria-hidden="true"
                                  size={24}
                                  strokeWidth={1.75}
                                  className="mt-0.5 shrink-0 text-teal-700"
                                />
                                <span>
                                  <span className="block text-sm font-medium text-navy group-hover:text-teal-700">
                                    {s.name}
                                  </span>
                                  <span className="block text-xs leading-relaxed text-slate-600">
                                    {s.shortDescription}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col border-l border-slate-200 pl-6">
                        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-slate-500">
                          Also from Accurith
                        </p>
                        <ul className="space-y-1">
                          {additionalServices.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                className="group flex gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-slate-50"
                              >
                                <s.icon
                                  aria-hidden="true"
                                  size={24}
                                  strokeWidth={1.75}
                                  className="mt-0.5 shrink-0 text-teal-700"
                                />
                                <span>
                                  <span className="block text-sm font-medium text-navy group-hover:text-teal-700">
                                    {s.name}
                                  </span>
                                  <span className="block text-xs leading-relaxed text-slate-600">
                                    {s.shortDescription}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/services"
                          className="mt-auto flex items-center gap-1 rounded-lg p-2 text-sm font-medium text-teal-700 hover:text-teal-800"
                        >
                          All services
                          <ArrowRight
                            aria-hidden="true"
                            size={16}
                            strokeWidth={1.75}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={navLinkClasses(item.href)}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm">
            Book a Consultation
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          ref={mobileToggleRef}
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-navy lg:hidden"
        >
          {mobileOpen ? (
            <X aria-hidden="true" size={24} strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" size={24} strokeWidth={1.75} />
          )}
        </button>
      </Container>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div
          ref={mobilePanelRef}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="px-4 py-6 sm:px-6">
            <p className="mb-2 px-3 font-mono text-xs uppercase tracking-widest text-slate-500">
              Services
            </p>
            <ul className="mb-6 space-y-1">
              {[...featuredServices, ...additionalServices].map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-base text-slate-700 hover:bg-slate-50"
                  >
                    <s.icon
                      aria-hidden="true"
                      size={24}
                      strokeWidth={1.75}
                      className="text-teal-700"
                    />
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="flex min-h-11 items-center px-3 py-2 text-sm font-medium text-teal-700"
                >
                  All services →
                </Link>
              </li>
            </ul>
            <ul className="space-y-1 border-t border-slate-200 pt-4">
              {primaryNav
                .filter((i) => !i.hasMenu)
                .map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex min-h-11 items-center rounded-lg px-3 py-2 text-base",
                        isActive(item.href)
                          ? "font-medium text-teal-700"
                          : "text-slate-700 hover:bg-slate-50",
                      )}
                      aria-current={isActive(item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
            <div className="mt-6 border-t border-slate-200 pt-6">
              <Button href="/contact" className="w-full">
                Book a Consultation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
