"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface AnnouncementBarProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export function AnnouncementBar({
  isVisible,
  onDismiss,
}: AnnouncementBarProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          key="announcement-bar"
          initial={shouldReduceMotion ? false : { height: 44, opacity: 1 }}
          animate={{ height: 44, opacity: 1 }}
          exit={
            shouldReduceMotion
              ? { height: 0, opacity: 0 }
              : { height: 0, opacity: 0 }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.22, ease: "easeInOut" }
          }
          className="relative overflow-hidden bg-[#0B1220] text-white"
        >
          <div className="mx-auto flex h-[44px] max-w-[1320px] items-center justify-center px-10 text-center">
            <div className="flex items-center gap-2.5 truncate text-xs sm:text-[13px]">
              <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#03120c]">
                New
              </span>
              <span className="truncate text-slate-200">
                Introducing intelligent workflow automation
              </span>
              <a
                href="#demo"
                className="shrink-0 font-semibold text-white underline decoration-emerald-400/70 underline-offset-4 transition-colors hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                Talk to an Expert
              </a>
            </div>

            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss announcement"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:right-5"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
