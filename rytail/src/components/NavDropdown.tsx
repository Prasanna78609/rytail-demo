"use client";

import { motion, useReducedMotion } from "motion/react";
import type { NavDropdownItem } from "@/data/navigation";

interface NavDropdownProps {
  item: NavDropdownItem;
  onClose: () => void;
}

export function NavDropdown({ item, onClose }: NavDropdownProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const colGrid =
    item.columns.length >= 3 ? "grid-cols-3" : "grid-cols-2";

  return (
    <motion.div
      id={`nav-menu-${item.id}`}
      role="region"
      aria-label={`${item.label} menu`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
      transition={
        shouldReduceMotion ? { duration: 0 } : { duration: 0.15, ease: "easeOut" }
      }
      className="absolute left-1/2 top-full z-50 w-[min(640px,90vw)] -translate-x-1/2 pt-2"
    >
      <div className="rounded-[16px] border border-zinc-200 bg-white p-6 shadow-[0_20px_50px_rgba(9,13,11,0.12)]">
        <div className={`grid gap-6 ${colGrid}`}>
          {item.columns.map((col) => (
            <div key={col.heading}>
              <p className="type-label mb-3 uppercase tracking-wider text-zinc-400">
                {col.heading}
              </p>
              <ul className="space-y-1.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={onClose}
                      className="block rounded-xl p-2.5 transition-colors hover:bg-emerald-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                    >
                      <span className="block font-display text-sm font-semibold text-[#090d0b]">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500">
                        {link.description}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
