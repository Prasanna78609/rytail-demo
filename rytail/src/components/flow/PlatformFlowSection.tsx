"use client";

import { useRef, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  FLOW_BOTTOM_AVATARS,
  FLOW_MODULES,
  FLOW_STAGES,
} from "@/data/platformFlow";
import { FlowModuleIllustration } from "./FlowIllustrations";
import { FlowLoopPath } from "./FlowLoopPath";
import { FlowModuleCard } from "./FlowModuleCard";
import { FlowStageCard } from "./FlowStageCard";

function IntelligencePill({
  className = "",
  opacity,
  reducedMotion,
}: {
  className?: string;
  opacity: MotionValue<number>;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={reducedMotion ? undefined : { opacity }}
      className={`pointer-events-none absolute z-20 inline-flex items-center gap-1.5 rounded-full border border-[var(--flow-border)] bg-[var(--flow-card)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--flow-text)] shadow-sm ${className}`}
    >
      <Sparkles className="h-3 w-3 text-[var(--flow-green-bright)]" />
      <span>Intelligence</span>
    </motion.div>
  );
}

function SolidRightTriangle({
  opacity,
  reducedMotion,
}: {
  opacity: MotionValue<number>;
  reducedMotion: boolean;
}) {
  return (
    <motion.svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      style={reducedMotion ? undefined : { opacity }}
      className="shrink-0"
    >
      <polygon points="0,0 14,7 0,14" fill="#4ADE80" />
    </motion.svg>
  );
}

export default function PlatformFlowSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const { scrollYProgress: rawProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgress = useSpring(rawProgress, {
    stiffness: 120,
    damping: 25,
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: mobileTimelineRef,
    offset: ["start 80%", "end 60%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.21) {
      setActiveStageIndex(0);
    } else if (latest < 0.34) {
      setActiveStageIndex(1);
    } else {
      setActiveStageIndex(2);
    }
  });

  // 0.00-0.08: heading & outer band fade in
  const bandOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const bandY = useTransform(scrollYProgress, [0, 0.08], [20, 0]);

  // Arrowheads between top stage cards
  const arrow1Opacity = useTransform(scrollYProgress, [0.16, 0.21], [0, 1]);
  const arrow2Opacity = useTransform(scrollYProgress, [0.29, 0.34], [0, 1]);

  // Pills pop in as loop passes
  const rightPillOpacity = useTransform(scrollYProgress, [0.43, 0.48], [0, 1]);
  const bottomPillsOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.56],
    [0, 1]
  );
  const leftPillOpacity = useTransform(scrollYProgress, [0.57, 0.62], [0, 1]);

  // Bottom avatars domino tipping left-to-right (0.46-0.56)
  const avatar0Opacity = useTransform(scrollYProgress, [0.46, 0.5], [0, 1]);
  const avatar0RotateX = useTransform(
    scrollYProgress,
    [0.46, 0.485, 0.5],
    [35, -3, 0]
  );
  const avatar1Opacity = useTransform(scrollYProgress, [0.48, 0.52], [0, 1]);
  const avatar1RotateX = useTransform(
    scrollYProgress,
    [0.48, 0.505, 0.52],
    [35, -3, 0]
  );
  const avatar2Opacity = useTransform(scrollYProgress, [0.5, 0.54], [0, 1]);
  const avatar2RotateX = useTransform(
    scrollYProgress,
    [0.5, 0.525, 0.54],
    [35, -3, 0]
  );
  const avatar3Opacity = useTransform(scrollYProgress, [0.52, 0.56], [0, 1]);
  const avatar3RotateX = useTransform(
    scrollYProgress,
    [0.52, 0.545, 0.56],
    [35, -3, 0]
  );

  const avatarMotions = [
    { opacity: avatar0Opacity, rotateX: avatar0RotateX },
    { opacity: avatar1Opacity, rotateX: avatar1RotateX },
    { opacity: avatar2Opacity, rotateX: avatar2RotateX },
    { opacity: avatar3Opacity, rotateX: avatar3RotateX },
  ];

  // 0.92-1.00: "Know more ->" fades in
  const footerOpacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);

  // Mobile vertical dashed line
  const mobileLineScaleY = useTransform(mobileProgress, [0, 1], [0, 1]);

  return (
    <section
      id="platform-flow"
      ref={wrapperRef}
      aria-labelledby="platform-flow-heading"
      className={`flow-theme relative w-full bg-[var(--flow-bg)] text-[var(--flow-text)] ${
        shouldReduceMotion ? "py-24" : "py-20 md:h-[380vh] md:pt-20 md:pb-24"
      }`}
    >
      {/* Top 80px smooth gradient blend from neighboring light section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-[var(--flow-bg)]"
      />

      {/* Bottom 80px smooth gradient blend into neighboring light section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-[var(--flow-bg)] to-white"
      />

      {/* Desktop & Tablet Sticky Stage */}
      <div
        className={`relative z-20 hidden md:flex flex-col justify-center px-6 lg:px-10 ${
          shouldReduceMotion
            ? ""
            : "md:sticky md:top-[var(--header-h,116px)] md:min-h-[calc(100vh-var(--header-h,116px))] md:py-6"
        }`}
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <motion.h2
            id="platform-flow-heading"
            style={
              shouldReduceMotion
                ? undefined
                : { opacity: bandOpacity, willChange: "opacity" }
            }
            className="font-display mx-auto max-w-3xl text-center text-2xl font-bold tracking-tight text-[var(--flow-text)] lg:text-[2.25rem] lg:leading-[1.15]"
          >
            One Platform for the Complete Operations Loop.
          </motion.h2>

          {/* Outer Band (radius 48px, padding 40px) */}
          <motion.div
            role="region"
            aria-label="Platform operations loop diagram"
            style={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: bandOpacity,
                    y: bandY,
                    willChange: "transform, opacity",
                  }
            }
            className="relative mt-10 rounded-[48px] border border-[var(--flow-border)] bg-[var(--flow-surface)] p-6 lg:p-8 xl:p-10"
          >
            {/* Loop Container (inset inside outer band) */}
            <div className="relative px-8 py-10 lg:px-12 lg:py-12">
              {/* Dashed SVG Loop Line */}
              <FlowLoopPath
                scrollYProgress={scrollYProgress}
                reducedMotion={shouldReduceMotion}
              />

              {/* Top Stage Cards straddling the top dashed line */}
              <ol className="absolute -top-[39px] left-1/2 z-20 flex w-[calc(100%-64px)] -translate-x-1/2 items-center justify-center gap-3 lg:-top-[45px] lg:w-auto lg:gap-4">
                {FLOW_STAGES.map((stage, index) => (
                  <div
                    key={stage.id}
                    className="flex flex-1 items-center justify-center gap-3 lg:flex-none lg:gap-[11px]"
                  >
                    <FlowStageCard
                      stage={stage}
                      index={index}
                      scrollYProgress={scrollYProgress}
                      isActive={activeStageIndex === index}
                      reducedMotion={shouldReduceMotion}
                    />
                    {index === 0 && (
                      <div className="hidden items-center justify-center lg:flex">
                        <SolidRightTriangle
                          opacity={arrow1Opacity}
                          reducedMotion={shouldReduceMotion}
                        />
                      </div>
                    )}
                    {index === 1 && (
                      <div className="hidden items-center justify-center lg:flex">
                        <SolidRightTriangle
                          opacity={arrow2Opacity}
                          reducedMotion={shouldReduceMotion}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </ol>

              {/* Intelligence Pills sitting ON the loop line */}
              <IntelligencePill
                opacity={leftPillOpacity}
                reducedMotion={shouldReduceMotion}
                className="-left-[46px] top-1/2 hidden -translate-y-1/2 -rotate-90 lg:inline-flex"
              />
              <IntelligencePill
                opacity={rightPillOpacity}
                reducedMotion={shouldReduceMotion}
                className="-right-[46px] top-1/2 hidden -translate-y-1/2 rotate-90 lg:inline-flex"
              />
              <IntelligencePill
                opacity={bottomPillsOpacity}
                reducedMotion={shouldReduceMotion}
                className="-bottom-3 left-[15%] hidden -translate-x-1/2 lg:inline-flex"
              />
              <IntelligencePill
                opacity={bottomPillsOpacity}
                reducedMotion={shouldReduceMotion}
                className="-bottom-3 left-[85%] hidden -translate-x-1/2 lg:inline-flex"
              />

              {/* 4 Module Cards INSIDE the loop (min 48px clearance from loop line) */}
              <div className="relative z-10 mt-6 grid grid-cols-2 justify-items-center gap-4 lg:mt-4 lg:flex lg:items-center lg:justify-center lg:gap-4">
                {FLOW_MODULES.map((mod, index) => (
                  <FlowModuleCard
                    key={mod.id}
                    module={mod}
                    index={index}
                    scrollYProgress={scrollYProgress}
                    reducedMotion={shouldReduceMotion}
                  />
                ))}
              </div>

              {/* 4 Overlapping 64px Avatars centered ON the bottom dashed line */}
              <div
                aria-hidden="true"
                className="absolute -bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center -space-x-2"
              >
                {FLOW_BOTTOM_AVATARS.map((avatar, idx) => (
                  <motion.span
                    key={avatar.initials}
                    style={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: avatarMotions[idx].opacity,
                            rotateX: avatarMotions[idx].rotateX,
                            transformOrigin: "bottom",
                            transformPerspective: 800,
                            willChange: "transform, opacity",
                          }
                    }
                    className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--flow-surface)] bg-gradient-to-br ${avatar.gradient} font-display text-sm font-bold text-white shadow-md`}
                  >
                    {avatar.initials}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Active Stage Description Caption + Footer Link */}
          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className="type-body min-h-[28px] text-[var(--flow-muted)]">
              <span className="font-semibold text-[var(--flow-green-bright)]">
                {FLOW_STAGES[activeStageIndex]?.title}:
              </span>{" "}
              {FLOW_STAGES[activeStageIndex]?.description}
            </p>
            <motion.a
              href="#industries-heading"
              style={shouldReduceMotion ? undefined : { opacity: footerOpacity }}
              className="type-button inline-flex items-center gap-1.5 font-bold text-[var(--flow-green-bright)] transition-colors hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--flow-green-bright)]"
            >
              Know more <span aria-hidden="true">→</span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Mobile (<768px): Vertical Timeline with Domino Entrance */}
      <div className="relative z-20 px-6 py-10 md:hidden">
        <h2 className="type-section text-center text-[var(--flow-text)]">
          One Platform for the Complete Operations Loop.
        </h2>

        <div
          ref={mobileTimelineRef}
          className="relative mt-10 rounded-[28px] border border-[var(--flow-border)] bg-[var(--flow-surface)] p-5"
        >
          <div className="relative pl-8">
            {/* Dashed background guide */}
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-3 top-4 w-px border-l border-dashed border-emerald-500/25"
            />
            {/* Scroll-drawn dashed green line */}
            <motion.div
              aria-hidden="true"
              style={
                shouldReduceMotion
                  ? { scaleY: 1 }
                  : {
                      scaleY: mobileLineScaleY,
                      transformOrigin: "top",
                      willChange: "transform",
                    }
              }
              className="absolute bottom-4 left-3 top-4 w-0.5 bg-[var(--flow-green)]"
            />

            <ol className="space-y-4">
              {FLOW_STAGES.map((stage, idx) => (
                <motion.li
                  key={stage.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, rotateX: 35, y: 24 }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, rotateX: 0, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.25 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.4, delay: idx * 0.08, ease: "easeOut" }
                  }
                  style={{
                    transformOrigin: "bottom",
                    transformPerspective: 800,
                  }}
                  className="relative"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--flow-green)] bg-[var(--flow-card)] text-[var(--flow-green-bright)]"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </span>
                  <div className="rounded-[16px] border border-[var(--flow-border)] bg-[var(--flow-card)] p-4">
                    <p className="font-display text-sm font-bold text-[var(--flow-green-bright)]">
                      {stage.title}
                    </p>
                    <p className="mt-1 text-xs text-[var(--flow-muted)]">
                      {stage.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            <div className="mt-5 space-y-4">
              {FLOW_MODULES.map((mod, idx) => (
                <motion.article
                  key={mod.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, rotateX: 35, y: 24 }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : { opacity: 1, rotateX: 0, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.2 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.4,
                          delay: (FLOW_STAGES.length + idx) * 0.08,
                          ease: "easeOut",
                        }
                  }
                  style={{
                    transformOrigin: "bottom",
                    transformPerspective: 800,
                  }}
                  className="relative rounded-[16px] border border-[var(--flow-border)] bg-[var(--flow-card)] p-4"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--flow-border)] bg-[var(--flow-card)] text-[var(--flow-green-bright)]"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="font-display text-sm font-bold text-[var(--flow-text)]">
                    {mod.title}
                  </h3>
                  <div className="mt-3 flex justify-center">
                    <FlowModuleIllustration
                      kind={mod.illustration}
                      progress={mobileProgress}
                      reducedMotion={true}
                    />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#industries-heading"
            className="type-button inline-flex items-center gap-1.5 font-bold text-[var(--flow-green-bright)]"
          >
            Know more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
