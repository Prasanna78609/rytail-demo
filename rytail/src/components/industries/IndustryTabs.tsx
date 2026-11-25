"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Industry, IndustryId } from "@/data/industries";

interface IndustryTabsProps {
  industries: Industry[];
  activeId: IndustryId;
  onSelect: (id: IndustryId) => void;
}

export function IndustryTabs({
  industries,
  activeId,
  onSelect,
}: IndustryTabsProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <div
      style={
        shouldReduceMotion
          ? undefined
          : { top: "var(--header-h, 72px)" }
      }
      className={`${
        shouldReduceMotion ? "" : "md:sticky"
      } z-30 border-b border-zinc-200/80 bg-white/95 backdrop-blur-md`}
    >
      <nav
        aria-label="Industry solutions"
        role="tablist"
        className="mx-auto flex w-full max-w-[1200px] items-center gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-center md:gap-4"
      >
        {industries.map((industry) => {
          const isActive = industry.id === activeId;
          return (
            <button
              key={industry.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`industry-panel-${industry.id}`}
              id={`industry-tab-${industry.id}`}
              onClick={() => onSelect(industry.id)}
              className={`type-nav relative shrink-0 cursor-pointer rounded-full px-4 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 md:rounded-none md:px-3 md:py-2.5 ${
                isActive
                  ? "bg-emerald-50 text-emerald-800 md:bg-transparent md:text-[#090d0b]"
                  : "bg-zinc-100 text-zinc-600 hover:text-[#090d0b] md:bg-transparent"
              }`}
            >
              {industry.title}
              {isActive && (
                <motion.span
                  layoutId="industry-active-tab"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                  className="hidden md:block absolute inset-x-2 -bottom-[13px] h-[2.5px] rounded-full bg-emerald-600"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
