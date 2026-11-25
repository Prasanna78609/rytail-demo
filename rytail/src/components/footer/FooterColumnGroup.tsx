"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { FooterColumn } from "@/data/footer";

interface FooterColumnGroupProps {
  columns: FooterColumn[];
}

export function FooterColumnGroup({ columns }: FooterColumnGroupProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [openId, setOpenId] = useState<string | null>(columns[0]?.id ?? null);

  return (
    <>
      {/* Tablet & Desktop Columns (6 on desktop, 3 on tablet) */}
      <div className="hidden gap-8 sm:grid sm:grid-cols-3 lg:grid-cols-6">
        {columns.map((col, idx) => (
          <motion.nav
            key={col.id}
            aria-label={col.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.35, delay: idx * 0.06, ease: "easeOut" }
            }
          >
            <h3 className="font-display text-[15px] font-bold text-[var(--ft-heading)]">
              {col.title}
            </h3>
            <ul className="mt-3.5 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-block text-xs leading-relaxed text-[var(--ft-text)] transition-colors duration-150 hover:text-[var(--ft-heading)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        ))}
      </div>

      {/* Mobile Accordions (< 640px) */}
      <div className="divide-y divide-[var(--ft-border)] sm:hidden">
        {columns.map((col) => {
          const isOpen = openId === col.id;
          return (
            <div key={col.id} className="py-2">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`footer-acc-${col.id}`}
                onClick={() => setOpenId(isOpen ? null : col.id)}
                className="flex w-full cursor-pointer items-center justify-between py-2.5 text-left font-display text-[15px] font-bold text-[var(--ft-heading)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
              >
                <span>{col.title}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 transition-transform duration-150 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <nav id={`footer-acc-${col.id}`} aria-label={col.title}>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 pb-3 pt-1">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="inline-block text-xs text-[var(--ft-text)] transition-colors duration-150 hover:text-[var(--ft-heading)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ft-heading)]"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
