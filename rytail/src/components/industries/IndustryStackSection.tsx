"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { INDUSTRIES, type IndustryId } from "@/data/industries";
import { IndustryPanel } from "./IndustryPanel";
import { IndustryTabs } from "./IndustryTabs";

export default function IndustryStackSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<IndustryId>(INDUSTRIES[0].id);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      INDUSTRIES.length - 1,
      Math.max(0, Math.floor(latest * INDUSTRIES.length))
    );
    const nextId = INDUSTRIES[idx]?.id;
    if (nextId && nextId !== activeId) {
      setActiveId(nextId);
    }
  });

  const handleTabSelect = (id: IndustryId) => {
    setActiveId(id);
    const target = document.getElementById(`industry-panel-${id}`);
    if (target) {
      target.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      aria-labelledby="industries-heading"
      className="w-full bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 id="industries-heading" className="type-section text-[#090d0b]">
          Built for the Way Your Industry Works.
        </h2>
        <p className="type-body mt-4 text-zinc-600">
          See how one platform adapts to different business models.
        </p>
      </div>

      <div className="mt-10">
        <IndustryTabs
          industries={INDUSTRIES}
          activeId={activeId}
          onSelect={handleTabSelect}
        />

        {/* Stacking Panels Wrapper (~100vh scroll distance per panel on desktop) */}
        <div
          ref={wrapperRef}
          className={`mx-auto mt-10 flex w-full max-w-[1248px] flex-col gap-8 px-6 ${shouldReduceMotion ? "" : "md:gap-[24vh] md:pb-16"
            }`}
        >
          {INDUSTRIES.map((industry, index) => (
            <IndustryPanel
              key={industry.id}
              industry={industry}
              index={index}
              reducedMotion={shouldReduceMotion}
              isDesktop={isDesktop}
              onHeaderClick={handleTabSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
