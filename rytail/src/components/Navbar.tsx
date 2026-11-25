"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Menu } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { NAV_DROPDOWNS, NAV_PLAIN_LINKS } from "@/data/navigation";
import { AnnouncementBar } from "./AnnouncementBar";
import { MobileDrawer } from "./MobileDrawer";
import { NavDropdown } from "./NavDropdown";

export default function Navbar() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync --header-h CSS variable so sticky sections offset cleanly
  useEffect(() => {
    const height = showAnnouncement ? 116 : 72;
    document.documentElement.style.setProperty("--header-h", `${height}px`);
  }, [showAnnouncement]);

  // Track scroll > 8px for bottom shadow
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdownId(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const clearHoverTimer = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (id: string) => {
    clearHoverTimer();
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdownId(id);
    }, 70);
  };

  const handleMouseLeave = () => {
    clearHoverTimer();
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenDropdownId(null);
    }, 110);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <AnnouncementBar
        isVisible={showAnnouncement}
        onDismiss={() => setShowAnnouncement(false)}
      />

      <div
        className={`w-full bg-white transition-shadow duration-200 ${isScrolled
          ? "shadow-[0_4px_20px_rgba(9,13,11,0.08)]"
          : "border-b border-zinc-200/70"
          }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-5 lg:px-8">
          {/* Left: Original SVG Mark + Wordmark */}
          <a
            href="#"
            className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="h-8 w-8"
              fill="none"
            >
              <rect width="32" height="32" rx="9" fill="#090d0b" />
              <path
                d="M9 21.5L14.5 10.5L19 17.5L23 11.5"
                stroke="#34d399"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="23" cy="11.5" r="2.2" fill="#34d399" />
            </svg>
            <span className="font-display text-xl font-bold tracking-tight text-[#090d0b]">
              Rytail
            </span>
          </a>

          {/* Center: Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_DROPDOWNS.map((item) => {
              const isOpen = openDropdownId === item.id;
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onFocus={() => {
                    clearHoverTimer();
                    setOpenDropdownId(item.id);
                  }}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setOpenDropdownId(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={`nav-menu-${item.id}`}
                    onClick={() =>
                      setOpenDropdownId(isOpen ? null : item.id)
                    }
                    className={`type-nav inline-flex cursor-pointer items-center gap-1 rounded-lg px-2.5 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${isOpen
                      ? "bg-emerald-50 text-emerald-800"
                      : "text-zinc-700 hover:text-[#090d0b]"
                      }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-3.5 w-3.5 transition-transform duration-150 ${isOpen ? "rotate-180 text-emerald-700" : "text-zinc-400"
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <NavDropdown
                        item={item}
                        onClose={() => setOpenDropdownId(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {NAV_PLAIN_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="type-nav rounded-lg px-2.5 py-2 text-zinc-700 transition-colors hover:text-[#090d0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Language, Log In, Get a Demo */}
          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <button
              type="button"
              aria-label="Language: English"
              className="type-nav inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-[#090d0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <Globe className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              <span>EN</span>
            </button>

            <a
              href="#login"
              className="type-nav px-2 py-1.5 text-zinc-700 transition-colors hover:text-[#090d0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Log In
            </a>

            <a
              href="#demo"
              className="type-button inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-white shadow-xs transition-colors hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Get a Demo
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#090d0b] transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
