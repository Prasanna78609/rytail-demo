"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV_DROPDOWNS, NAV_PLAIN_LINKS } from "@/data/navigation";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const drawerRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Body scroll lock & Escape key + basic focus trap
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawerEl = drawerRef.current;
    const focusables = drawerEl?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusables?.[0];
    const lastEl = focusables?.[focusables.length - 1];
    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          {/* Backdrop */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Slide-in Drawer */}
          <motion.div
            ref={drawerRef}
            initial={shouldReduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 360, damping: 36 }
            }
            className="fixed right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-zinc-200 px-6">
              <span className="font-display text-lg font-bold text-[#090d0b]">
                Menu
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-[#090d0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <div className="space-y-1">
                {NAV_DROPDOWNS.map((group) => {
                  const isExpanded = expandedId === group.id;
                  return (
                    <div
                      key={group.id}
                      className="border-b border-zinc-100 py-2"
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          setExpandedId(isExpanded ? null : group.id)
                        }
                        className="type-nav flex w-full cursor-pointer items-center justify-between py-2.5 text-left text-[#090d0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 text-zinc-500 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="space-y-4 pb-3 pl-2 pt-1">
                          {group.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="type-label mb-1.5 text-zinc-400">
                                {col.heading}
                              </p>
                              <ul className="space-y-1">
                                {col.links.map((link) => (
                                  <li key={link.label}>
                                    <a
                                      href={link.href}
                                      onClick={onClose}
                                      className="block rounded-lg px-2 py-1.5 text-sm font-medium text-zinc-700 hover:bg-emerald-50 hover:text-[#090d0b]"
                                    >
                                      {link.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {NAV_PLAIN_LINKS.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={onClose}
                    className="type-nav block border-b border-zinc-100 py-4 text-[#090d0b]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-200 p-6">
              <div className="flex flex-col gap-3">
                <a
                  href="#login"
                  onClick={onClose}
                  className="type-button flex w-full items-center justify-center rounded-full border border-zinc-300 py-3 text-[#090d0b] hover:bg-zinc-50"
                >
                  Log In
                </a>
                <a
                  href="#demo"
                  onClick={onClose}
                  className="type-button flex w-full items-center justify-center rounded-full bg-emerald-600 py-3 text-white hover:bg-emerald-700"
                >
                  Get a Demo
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
