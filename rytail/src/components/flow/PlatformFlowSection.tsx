"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
import { loopGeometry, type LoopVariant, type PillAnchor } from "./loopGeometry";

function IntelligencePill({
  pill,
  opacity,
  reducedMotion,
}: {
  pill: PillAnchor;
  opacity: MotionValue<number>;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: pill.x,
        top: pill.y,
        transform: `translate(-50%, -50%) rotate(${pill.rotate}deg)`,
        ...(reducedMotion ? {} : { opacity }),
      }}
      className="pointer-events-none z-20 inline-flex items-center gap-1.5 rounded-full border border-[var(--flow-border)] bg-[var(--flow-card)] px-3 py-1 text-[11px] font-semibold tracking-wide text-[var(--flow-text)] shadow-sm"
    >
      <Sparkles className="h-3 w-3 text-[var(--flow-green-bright)]" />
      <span>Intelligence</span>
    </motion.div>
  );
}

export default function PlatformFlowSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1120);
  const [variant, setVariant] = useState<LoopVariant>("desktop");
  const [scale, setScale] = useState(1);

  // Measure header height (updates when announcement bar is dismissed) and stage dimensions
  useEffect(() => {
    const updateMeasurements = () => {
      const headerEl = document.querySelector("header");
      if (headerEl) {
        const h = Math.round(headerEl.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--header-h", `${h}px`);
      }

      const stageEl = stageRef.current;
      if (!stageEl) return;

      const stageRect = stageEl.getBoundingClientRect();
      const vw = window.innerWidth;
      const nextVariant: LoopVariant = vw < 1024 ? "tablet" : "desktop";
      setVariant(nextVariant);

      const padX = vw < 1024 ? 48 : 80;
      const measuredW = Math.min(1152, Math.max(700, stageRect.width - padX));
      setContainerWidth(measuredW);

      const geom = loopGeometry(measuredW, nextVariant);
      const totalHeight = 96 + geom.heightFull + 88;
      const availHeight = stageRect.height;
      const minScale = nextVariant === "tablet" ? 0.55 : 0.7;
      const nextScale = Math.max(
        minScale,
        Math.min(1, availHeight / totalHeight)
      );
      setScale(Number(nextScale.toFixed(3)));
    };

    updateMeasurements();

    const ro = new ResizeObserver(updateMeasurements);
    const headerEl = document.querySelector("header");
    if (headerEl) ro.observe(headerEl);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", updateMeasurements);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMeasurements);
    };
  }, []);

  const geometry = useMemo(
    () => loopGeometry(containerWidth, variant),
    [containerWidth, variant]
  );

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
      if (latest < 0.18) {
        setActiveStageIndex(0);
      } else if (latest < 0.28) {
        setActiveStageIndex(1);
      } else {
        setActiveStageIndex(2);
      }
    });

  // 0.00 - 0.06: Heading + band fade in at H_COLLAPSED
  const introOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  // 0.34 - 0.46: Band expands smoothly from H_COLLAPSED to H_FULL
  const bandHeight = useTransform(
    scrollYProgress,
    [0.34, 0.46],
    [geometry.heightCollapsed, geometry.heightFull]
  );

  // 0.46 - 0.62: Pills pop in as each side draws
  const rightPillOpacity = useTransform(scrollYProgress, [0.47, 0.51], [0, 1]);
  const bottomPillsOpacity = useTransform(
    scrollYProgress,
    [0.52, 0.57],
    [0, 1]
  );
  const leftPillOpacity = useTransform(scrollYProgress, [0.58, 0.62], [0, 1]);

  const pillOpacityMap: Record<PillAnchor["segment"], MotionValue<number>> = {
    right: rightPillOpacity,
    bottom: bottomPillsOpacity,
    left: leftPillOpacity,
  };

  // Bottom avatars tip in left-to-right as bottom line passes (0.51 - 0.57)
  const av0Opacity = useTransform(scrollYProgress, [0.51, 0.54], [0, 1]);
  const av0Rot = useTransform(scrollYProgress, [0.51, 0.54], [18, 0]);
  const av1Opacity = useTransform(scrollYProgress, [0.525, 0.555], [0, 1]);
  const av1Rot = useTransform(scrollYProgress, [0.525, 0.555], [18, 0]);
  const av2Opacity = useTransform(scrollYProgress, [0.54, 0.57], [0, 1]);
  const av2Rot = useTransform(scrollYProgress, [0.54, 0.57], [18, 0]);
  const av3Opacity = useTransform(scrollYProgress, [0.55, 0.58], [0, 1]);
  const av3Rot = useTransform(scrollYProgress, [0.55, 0.58], [18, 0]);

  const avatarMotions = [
    { opacity: av0Opacity, rotateX: av0Rot },
    { opacity: av1Opacity, rotateX: av1Rot },
    { opacity: av2Opacity, rotateX: av2Rot },
    { opacity: av3Opacity, rotateX: av3Rot },
  ];

  // 0.92 - 1.00: Caption & "Know more ->" fade in
  const footerOpacity = useTransform(scrollYProgress, [0.9, 0.96], [0, 1]);

  // Mobile vertical dashed line
  const mobileLineScaleY = useTransform(mobileProgress, [0, 1], [0, 1]);

  const totalUnscaledHeight = 96 + geometry.heightFull + 88;
  const scaledHeight = totalUnscaledHeight * scale;

  return (
    <section
      id="platform-flow"
      ref={wrapperRef}
      aria-labelledby="platform-flow-heading"
      className={`flow-theme relative w-full overflow-x-clip bg-[var(--flow-bg)] text-[var(--flow-text)] ${shouldReduceMotion ? "py-24" : "py-20 md:h-[380vh] md:pt-20 md:pb-24"
        }`}
    >
      {/* Top 80px gradient blend */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-[var(--flow-bg)]"
      />

      {/* Bottom 80px gradient blend */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-[var(--flow-bg)] to-white"
      />

      {/* Desktop & Tablet Sticky Stage */}
      <div
        ref={stageRef}
        style={
          shouldReduceMotion
            ? undefined
            : {
              top: "calc(var(--header-h, 116px) + 16px)",
              height: "calc(100vh - var(--header-h, 116px) - 16px)",
            }
        }
        className={`relative z-20 hidden w-full md:flex md:flex-col md:items-center md:overflow-hidden ${shouldReduceMotion ? "" : "md:sticky"
          }`}
      >
        <div
            style={{
              height: scaledHeight,
              width: geometry.width,
            }}
            className="relative flex flex-col items-center"
          >
          <div
            style={{
              width: geometry.width,
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
            className="flex flex-col items-center"
          >
            {/* Heading */}
            <motion.h2
              id="platform-flow-heading"
              style={{
                fontSize: "clamp(26px, 3.2vw, 40px)",
                ...(shouldReduceMotion
                  ? {}
                  : { opacity: introOpacity, willChange: "opacity" }),
              }}
              className="mb-6 max-w-3xl text-center font-display font-bold leading-[1.15] tracking-tight text-[var(--flow-text)]"
            >
              One Platform for the Complete Operations Loop.
            </motion.h2>

                {/* Expanding Outer Band */}
                <motion.div
                  role="region"
                  aria-label="Platform operations loop diagram"
                  style={{
                    width: geometry.width,
                    height: shouldReduceMotion ? geometry.heightFull : bandHeight,
                    ...(shouldReduceMotion
                      ? {}
                      : { opacity: introOpacity, willChange: "height, opacity" }),
                  }}
                  className="relative overflow-hidden rounded-[48px] border border-[var(--flow-border)] bg-[var(--flow-surface)]"
                >
                  {/* SVG Loop & Arrowheads from Single Geometry Source */}
                  <FlowLoopPath
                    geometry={geometry}
                    scrollYProgress={scrollYProgress}
                    reducedMotion={shouldReduceMotion}
                  />

                    {/* 3 Stage Cards centered on y = T (parent has perspective: 900px) */}
                    <ol style={{ perspective: 900 }} className="m-0 list-none p-0">
                      {FLOW_STAGES.map((stage, index) => (
                          <FlowStageCard
                    key={stage.id}
                    stage = { stage }
                    rect = { geometry.stages[index] }
                    index = { index }
                    scrollYProgress = { scrollYProgress }
                    isActive = { activeStageIndex === index}
                      reducedMotion={shouldReduceMotion}
                  />
                ))}
                    </ol>

                      {/* 4 Module Cards inside the loop (parent has perspective: 900px) */}
                      <div style={{ perspective: 900 }}>
                        {FLOW_MODULES.map((mod, index) => (
                          <FlowModuleCard
                            key={mod.id}
                            module={mod}
                            rect={geometry.modules[index]}
                            index={index}
                            scrollYProgress={scrollYProgress}
                            reducedMotion={shouldReduceMotion}
                          />
                        ))}
                      </div>

                      {/* Intelligence Pills positioned from loopGeometry */}
                      {geometry.pills.map((pill) => (
                        <IntelligencePill
                          key={pill.id}
                          pill={pill}
                          opacity={pillOpacityMap[pill.segment]}
                          reducedMotion={shouldReduceMotion}
                        />
                      ))}

                      {/* 4 Overlapping 56px Avatars centered on y = B */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: geometry.avatarsCenter.x,
                          top: geometry.avatarsCenter.y,
                          transform: "translate(-50%, -50%)",
                          perspective: 900,
                        }}
                        className="z-20 flex items-center -space-x-2"
                      >
                        {FLOW_BOTTOM_AVATARS.map((avatar, idx) => (
                          <motion.span
                            key={avatar.initials}
                            style={
                              shouldReduceMotion
                                ? undefined
                                : {
                            opacity:avatarMotions[idx].opacity,
                          rotateX: avatarMotions[idx].rotateX,
                        transformOrigin: "bottom",
                        willChange: "transform, opacity",
                          }
                    }
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--flow-surface)] bg-gradient-to-br ${avatar.gradient} font-display text-[13px] font-bold text-white shadow-md`}
                  >
                        {avatar.initials}
                      </motion.span>
                ))}
                    </div>
            </motion.div>

              {/* Caption & "Know more ->" */}
              <motion.div
                style={shouldReduceMotion ? undefined : { opacity: footerOpacity }}
                className="mt-6 flex flex-col items-center gap-2 text-center"
              >
                <p className="type-body min-h-[28px] text-[var(--flow-muted)]">
                  <span className="font-semibold text-[var(--flow-green-bright)]">
                    {FLOW_STAGES[activeStageIndex]?.title}:
                  </span>{" "}
                  {FLOW_STAGES[activeStageIndex]?.description}
                </p>
                <a
                  href="#industries-heading"
                  className="type-button inline-flex items-center gap-1.5 font-bold text-[var(--flow-green-bright)] transition-colors hover:text-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--flow-green-bright)]"
                >
                  Know more <span aria-hidden="true">→</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile (<768px): Vertical Timeline */}
        <div className="relative z-20 px-6 py-10 md:hidden">
          <h2 className="type-section text-center text-[var(--flow-text)]">
            One Platform for the Complete Operations Loop.
          </h2>

              <div
                      ref = { mobileTimelineRef }
          className="relative mt-10 rounded-[28px] border border-[var(--flow-border)] bg-[var(--flow-surface)] p-5"
                  >
                    <div className="relative pl-8">
                      <div
                        aria-hidden="true"
                        className="absolute bottom-4 left-3 top-4 w-px border-l border-dashed border-emerald-500/25"
                      />
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

            < ol style={{ perspective: 900 }} className="space-y-4">
                          {FLOW_STAGES.map((stage, idx) => (
                            <motion.li
                              key={stage.id}
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : { opacity: 0, rotateX: 18, y: 20 }
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
                          : { duration: 0.35, delay: idx * 0.08, ease: "easeOut" }
                      }
                      style={{ transformOrigin: "bottom" }}
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

              <div style={{ perspective: 900 }} className="mt-5 space-y-4">
                {FLOW_MODULES.map((mod, idx) => (
                  <motion.article
                    key={mod.id}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, rotateX: 18, y: 20 }
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
                          duration: 0.35,
                          delay: (FLOW_STAGES.length + idx) * 0.08,
                          ease: "easeOut",
                        }
                    }
                    style={{ transformOrigin: "bottom" }}
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
    </section >
  );
}
