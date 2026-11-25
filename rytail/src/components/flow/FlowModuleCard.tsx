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
  [0.62, 0.69, 0.72],
  [0.68, 0.75, 0.78],
  [0.74, 0.81, 0.84],
  [0.8, 0.87, 0.9],
];

export function FlowModuleCard({
  module,
  index,
  scrollYProgress,
  reducedMotion,
}: FlowModuleCardProps) {
  const [start, mid, end] = MODULE_WINDOWS[index] ?? [0.62, 0.69, 0.72];

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
      className="flex h-[220px] w-full flex-col items-center justify-between rounded-[16px] border border-[var(--flow-border)] bg-[var(--flow-card)] p-5 text-center lg:h-[250px] lg:w-[220px] xl:h-[280px]"
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
