"use client";

import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { OutcomeTab } from "@/data/outcomes";

interface OutcomesTabListProps {
  tabs: OutcomeTab[];
  activeIndex: number;
  onSelect: (index: number) => void;
  reducedMotion: boolean;
}

export function OutcomesTabList({
  tabs,
  activeIndex,
  onSelect,
  reducedMotion,
}: OutcomesTabListProps) {
  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      onSelect((index + 1) % tabs.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      onSelect((index - 1 + tabs.length) % tabs.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      onSelect(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onSelect(tabs.length - 1);
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Business outcomes"
      className="flex w-full snap-x snap-mandatory flex-row gap-6 overflow-x-auto border-b border-zinc-200 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:pb-0 lg:snap-none"
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={tab.id}
            className="relative shrink-0 snap-start lg:shrink lg:border-b lg:border-zinc-200"
          >
            <button
              id={`outcome-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`outcome-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="flex w-full cursor-pointer items-start gap-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#090D0B] lg:gap-4 lg:py-5"
            >
              <span
                className={`mt-0.5 shrink-0 font-display text-xs font-semibold tabular-nums tracking-wider ${isActive ? "text-[#090D0B]" : "text-zinc-400"
                  }`}
              >
                {tab.step}
              </span>

              <div className="min-w-0 flex-1">
                <span
                  className={`block whitespace-nowrap font-display text-sm uppercase tracking-[0.08em] lg:whitespace-normal lg:text-[15px] ${isActive
                      ? "font-semibold text-[#090D0B]"
                      : "font-medium text-zinc-500 hover:text-zinc-800"
                    }`}
                >
                  {tab.title}
                </span>

                {/* Desktop vertical tab description */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={
                        reducedMotion ? false : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 0.25, ease: "easeInOut" }
                      }
                      className="hidden overflow-hidden lg:block"
                    >
                      <p className="mt-2.5 text-sm leading-relaxed text-[#52606A]">
                        {tab.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>

            {/* Short dark underline segment on active tab */}
            {isActive && (
              <motion.span
                layoutId="outcomes-active-underline"
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 360, damping: 32 }
                }
                aria-hidden="true"
                className="absolute bottom-[-1px] left-0 h-[2px] w-14 bg-[#090D0B]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
