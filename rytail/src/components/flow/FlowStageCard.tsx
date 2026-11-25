"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { FlowStage } from "@/data/platformFlow";

interface FlowStageCardProps {
  stage: FlowStage;
  index: number;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
  reducedMotion: boolean;
}

const STAGE_WINDOWS: [number, number, number][] = [
  [0.08, 0.14, 0.16],
  [0.21, 0.27, 0.29],
  [0.34, 0.38, 0.4],
];

export function FlowStageCard({
  stage,
  index,
  scrollYProgress,
  isActive,
  reducedMotion,
}: FlowStageCardProps) {
  const [start, mid, end] = STAGE_WINDOWS[index] ?? [0.08, 0.14, 0.16];

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [start, mid, end], [35, -3, 0]);
  const y = useTransform(scrollYProgress, [start, end], [24, 0]);

  return (
    <motion.li
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
      className={`relative z-10 flex h-[78px] w-full items-center justify-center rounded-[16px] border bg-[var(--flow-card)] px-4 transition-all duration-200 lg:h-[90px] lg:w-[240px] ${
        isActive
          ? "border-[var(--flow-green)] shadow-[0_0_40px_rgba(34,197,94,0.25)]"
          : "border-[var(--flow-border)]"
      }`}
    >
      <span className="font-display text-base font-bold tracking-tight text-[var(--flow-green-bright)] lg:text-lg">
        {stage.title}
      </span>
    </motion.li>
  );
}
