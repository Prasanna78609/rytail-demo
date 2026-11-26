"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { OutcomeTab } from "@/data/outcomes";

interface OutcomesPanelProps {
  tabs: OutcomeTab[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  reducedMotion: boolean;
}

export function OutcomesPanel({
  tabs,
  activeIndex,
  onPrev,
  onNext,
  reducedMotion,
}: OutcomesPanelProps) {
  const activeTab = tabs[activeIndex];
  const panelRef = useRef<HTMLDivElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const [enableDesktopTilt, setEnableDesktopTilt] = useState(false);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const [errorMap, setErrorMap] = useState<Record<string, boolean>>({});

  // Subtle 3D tilt (max 2deg) on desktop (>=1024px) fine-pointer devices only
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 180, damping: 24 });
  const rotateY = useSpring(rawRotateY, { stiffness: 180, damping: 24 });

  useEffect(() => {
    const mqPointer = window.matchMedia("(pointer: fine)");
    const mqDesktop = window.matchMedia("(min-width: 1024px)");
    const update = () =>
      setEnableDesktopTilt(mqPointer.matches && mqDesktop.matches);
    update();
    mqPointer.addEventListener("change", update);
    mqDesktop.addEventListener("change", update);
    return () => {
      mqPointer.removeEventListener("change", update);
      mqDesktop.removeEventListener("change", update);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !enableDesktopTilt) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    rawRotateY.set(normX * 4);
    rawRotateX.set(-normY * 4);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const start = swipeStartRef.current;
    const touch = e.changedTouches[0];
    swipeStartRef.current = null;
    if (!start || !touch) return;

    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;

    if (dx < 0) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <motion.div
      ref={panelRef}
      id={`outcome-panel-${activeTab.id}`}
      role="tabpanel"
      aria-labelledby={`outcome-tab-${activeTab.id}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={
        reducedMotion || !enableDesktopTilt
          ? undefined
          : {
            rotateX,
            rotateY,
            transformPerspective: 1200,
            willChange: "transform",
          }
      }
      className="relative w-full max-w-full overflow-hidden rounded-[22px] border border-white/[0.18] bg-[#064e3b] shadow-[0_24px_64px_rgba(9,13,11,0.16)] lg:rounded-[28px]"
    >
      <div className="relative h-[max(440px,min(70vh,600px))] w-full lg:h-[clamp(520px,72vh,680px)]">
        {tabs.map((tab, index) => {
          const isCurrent = index === activeIndex;
          const isLoaded = Boolean(loadedMap[tab.id]);
          const hasError = Boolean(errorMap[tab.id]);

          return (
            <div
              key={tab.id}
              aria-hidden={!isCurrent}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${isCurrent
                ? "z-10 opacity-100"
                : "pointer-events-none z-0 opacity-0"
                }`}
            >
              {!isLoaded && !hasError && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse bg-emerald-950/60"
                />
              )}

              {hasError ? (
                <div
                  role="img"
                  aria-label={tab.alt}
                  className={`h-full w-full bg-gradient-to-br ${tab.fallbackGradient}`}
                />
              ) : (
                <Image
                  src={tab.image}
                  alt={tab.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 920px"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL={tab.blurDataURL}
                  onLoad={() =>
                    setLoadedMap((prev) => ({ ...prev, [tab.id]: true }))
                  }
                  onError={() =>
                    setErrorMap((prev) => ({ ...prev, [tab.id]: true }))
                  }
                  className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                />
              )}
            </div>
          );
        })}

        {/* Unified Emerald-to-Teal Grading */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-emerald-500 to-teal-700 opacity-35 mix-blend-soft-light"
        />

        {/* Top & Bottom Contrast Scrims */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black/55 via-black/15 to-black/80"
        />

        {/* Inside Image Content: Top-Left Headline + Bottom-Left Description & CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: "easeOut" }
            }
            className="absolute inset-0 z-30 flex flex-col justify-between p-[24px] lg:p-[48px]"
          >
            {/* Top-Left Headline */}
            <h3
              style={{ fontSize: "clamp(32px, 4vw, 56px)" }}
              className="max-w-full font-display font-bold leading-[1.08] tracking-[-0.025em] text-white sm:max-w-[80%]"
            >
              {activeTab.headline}
            </h3>

            {/* Bottom-Left Supporting Description + White Pill CTA */}
            <div className="max-w-[560px]">
              <p className="text-[15px] leading-[1.5] text-white/95 sm:text-base lg:text-[18px]">
                {activeTab.description}
              </p>

              <div className="mt-5">
                <motion.a
                  href={activeTab.ctaHref}
                  whileTap={reducedMotion ? undefined : { scale: 0.97 }}
                  className="type-button inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[#090D0B] shadow-sm transition-all duration-200 hover:bg-emerald-50 hover:shadow-[0_0_24px_rgba(16,185,129,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {activeTab.ctaLabel}
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
