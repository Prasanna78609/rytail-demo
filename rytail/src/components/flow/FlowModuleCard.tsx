"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { FlowModule } from "@/data/platformFlow";
import { FlowModuleIllustration } from "./FlowIllustrations";
import type { Rect } from "./loopGeometry";

interface FlowModuleCardProps {
  module: FlowModule;
  rect: Rect;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

// 0.62 - 0.92: 4 module cards tip in left-to-right (each starts at ~60% of previous)
const MODULE_WINDOWS: [number, number][] = [
  [0.62, 0.72],
  [0.68, 0.78],
  [0.74, 0.84],
  [0.8, 0.9],
];

export function FlowModuleCard({
  module,
  rect,
  index,
  scrollYProgress,
  reducedMotion,
}: FlowModuleCardProps) {
  const [start, end] = MODULE_WINDOWS[index] ?? [0.62, 0.72];

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [start, end], [18, 0]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);

  return (
    <motion.article
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
        ...(reducedMotion
          ? {}
          : {
      opacity,
      rotateX,
      y,
      transformOrigin: "bottom",
        willChange: "transform, opacity",
            }),
      }}
className = "z-20 flex flex-col items-center justify-between rounded-[16px] border border-[var(--flow-border)] bg-[var(--flow-card)] p-6 pb-8 text-center"
  >
    <h3 className="line-clamp-2 font-display text-[17px] font-bold leading-snug text-[var(--flow-text)]">
      {module.title}
    </h3>
      <div className="mt-auto flex w-full items-center justify-center">
        <FlowModuleIllustration
          kind={module.illustration}
          progress={scrollYProgress}
          reducedMotion={reducedMotion}
        />
      </div>
    </motion.article>
    );
}
