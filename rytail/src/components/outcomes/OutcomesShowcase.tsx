"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { OUTCOME_TABS } from "@/data/outcomes";
import { OutcomesPanel } from "./OutcomesPanel";
import { OutcomesTabList } from "./OutcomesTabList";

const AUTO_ADVANCE_MS = 6000;

export default function OutcomesShowcase() {
  const wrapperRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (shouldReduceMotion) return;
    const clamped = Math.min(1, Math.max(0, latest));
    const nextIdx = Math.min(
      OUTCOME_TABS.length - 1,
      Math.floor(clamped * OUTCOME_TABS.length)
    );
    if (nextIdx !== activeIndex) {
      setActiveIndex(nextIdx);
    }
  });

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % OUTCOME_TABS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [shouldReduceMotion, isPaused]);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + OUTCOME_TABS.length) % OUTCOME_TABS.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % OUTCOME_TABS.length);
  }, []);

  return (
    <section
      id="outcomes"
      ref={wrapperRef}
      aria-label="Business outcomes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsPaused(false);
        }
      }}
      className={`relative box-border w-full overflow-x-clip bg-white [&_*]:box-border ${shouldReduceMotion ? "py-10 lg:py-14" : "py-10 lg:h-[240vh] lg:py-0"
        }`}
    >
      <div
        className={`mx-auto box-border w-full max-w-[1280px] px-[24px] md:px-[32px] lg:px-[48px] ${shouldReduceMotion
            ? ""
            : "lg:sticky lg:top-[var(--header-h,116px)] lg:pt-8"
        }`}
      >
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(240px,0.28fr)_minmax(0,1fr)] lg:gap-x-[clamp(24px,3.5vw,48px)]">
          <div className="min-w-0 w-full">
            <OutcomesTabList
              tabs={OUTCOME_TABS}
              activeIndex={activeIndex}
              onSelect={handleSelect}
              reducedMotion={shouldReduceMotion}
            />
          </div>

          <div className="min-w-0 w-full">
            <OutcomesPanel
              tabs={OUTCOME_TABS}
              activeIndex={activeIndex}
              onPrev={handlePrev}
              onNext={handleNext}
              reducedMotion={shouldReduceMotion}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
