"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { FlowModule } from "@/data/platformFlow";
import { FlowModuleIllustration } from "./FlowIllustrations";

interface FlowModuleCardProps {
  module: FlowModule;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

const MODULE_WINDOWS: [number, number, number][] = [
  [0.54, 0.6, 0.63],
  [0.59, 0.65, 0.68],
  [0.64, 0.7, 0.73],
  [0.69, 0.75, 0.78],
];

export function FlowModuleCard({
  module,
  index,
  scrollYProgress,
  reducedMotion,
}: FlowModuleCardProps) {
  const [start, mid, end] = MODULE_WINDOWS[index] ?? [0.54, 0.6, 0.63];

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [start, mid, end], [35, -3, 0]);
  const y = useTransform(scrollYProgress, [start, end], [24, 0]);

  return (
    <motion.article
      style={
        reducedMotion
          ? undefined
          : {
            opacity,
            rotateX,
            y,
            transformOrigin: "bottom",
            transformPerspective: 800,
            willChange: "transform, opacity",
          }
      }
      className="flex h-[200px] w-full flex-col items-center justify-between rounded-[16px] border border-[var(--flow-border)] bg-[var(--flow-card)] p-4 text-center lg:h-[215px] lg:w-[215px] xl:h-[245px] xl:w-[220px] xl:p-5"
    >
      <h3 className="font-display text-[15px] font-bold leading-snug text-[var(--flow-text)]">
        {module.title}
      </h3>
      <div className="mt-auto flex h-28 w-full items-center justify-center">
        <FlowModuleIllustration
          kind={module.illustration}
          progress={scrollYProgress}
          reducedMotion={reducedMotion}
        />
      </div>
    </motion.article>
  );
}
