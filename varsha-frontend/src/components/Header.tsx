"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { cn } from "./ui/cn";
import { primaryNav } from "./siteData";

// Direction B header — white bar, real logo, click-to-open dropdowns with
// label + one-line desc (Services, Company), solid accent "Request a demo".
// A11y: Escape + click-outside close, focus-trapped mobile slide-over.

function Brand() {
  return (
    <Link href="/" className="rounded-lg">
      <Logo />
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const menuIdBase = useId();

  // Close menus whenever the route changes — state adjusted during render
  // (React's recommended pattern) rather than in an effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  // Desktop dropdowns: close on Escape or click outside the nav.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

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

  const navLinkClasses = (active: boolean) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
      active ? "text-accent" : "text-ink-2 hover:bg-sec1 hover:text-ink",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-line-light bg-white">
      <div className="mx-auto flex h-20 max-w-content items-center justify-between px-6 md:h-24 md:px-12">
        <div className="flex items-center gap-8 xl:gap-11">
          <Brand />

          {/* Desktop nav */}
          <nav
            ref={navRef}
            aria-label="Main"
            className="hidden items-center gap-1 lg:flex"
          >
            {primaryNav.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-controls={`${menuIdBase}-${item.label}`}
                    onClick={() =>
                      setOpenMenu((o) => (o === item.label ? null : item.label))
                    }
                    className={cn(
                      navLinkClasses(isActive(item.href)),
                      "flex items-center gap-1.5",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.75}
                      className={cn(
                        "transition-transform duration-200",
                        openMenu === item.label && "rotate-180",
                      )}
                    />
                  </button>

                  {openMenu === item.label && (
                    <div
                      id={`${menuIdBase}-${item.label}`}
                      className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-line-light bg-white p-2 shadow-xl"
                    >
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="group flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-sec1"
                            >
                              <span className="text-sm font-medium text-ink group-hover:text-accent">
                                {c.label}
                              </span>
                              <span className="text-xs text-ink-3">
                                {c.desc}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navLinkClasses(isActive(item.href))}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex min-h-10 items-center rounded-lg bg-accent px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            Request a demo
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          ref={mobileToggleRef}
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-ink lg:hidden"
        >
          {mobileOpen ? (
            <X aria-hidden="true" size={24} strokeWidth={1.75} />
          ) : (
            <Menu aria-hidden="true" size={24} strokeWidth={1.75} />
          )}
        </button>
      </div>

      {/* Mobile slide-over */}
      {mobileOpen && (
        <div
          ref={mobilePanelRef}
          className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-white md:top-24 lg:hidden"
        >
          <nav aria-label="Mobile" className="px-4 py-6 sm:px-6">
            {primaryNav.map((item) =>
              item.children ? (
                <div key={item.label} className="mb-6">
                  <p className="mb-2 px-3 font-mono text-xs uppercase tracking-kicker text-ink-3">
                    {item.label}
                  </p>
                  <ul className="space-y-1">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="flex min-h-11 items-center rounded-lg px-3 py-2 text-base text-ink-2 hover:bg-sec1"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex min-h-11 items-center rounded-lg px-3 py-2 text-base",
                    isActive(item.href)
                      ? "font-medium text-accent"
                      : "text-ink-2 hover:bg-sec1",
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="mt-6 border-t border-line-light pt-6">
              <Link
                href="/contact"
                className="flex min-h-12 items-center justify-center rounded-lg bg-accent px-5 text-base font-semibold text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                Request a demo
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
