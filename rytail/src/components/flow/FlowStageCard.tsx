"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { FlowStage } from "@/data/platformFlow";
import type { Rect } from "./loopGeometry";

interface FlowStageCardProps {
  stage: FlowStage;
  rect: Rect;
  index: number;
  scrollYProgress: MotionValue<number>;
  isActive: boolean;
  reducedMotion: boolean;
}

// 0.06 - 0.34: Understand -> Optimize -> Act
const STAGE_WINDOWS: [number, number][] = [
  [0.06, 0.13],
  [0.18, 0.25],
  [0.28, 0.34],
];

export function FlowStageCard({
  stage,
  rect,
  index,
  scrollYProgress,
  isActive,
  reducedMotion,
}: FlowStageCardProps) {
  const [start, end] = STAGE_WINDOWS[index] ?? [0.06, 0.13];

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [start, end], [18, 0]);
  const y = useTransform(scrollYProgress, [start, end], [20, 0]);

  return (
    <motion.li
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
      className={`z-20 flex items-center justify-center rounded-[16px] border bg - [var(--flow - card)]px - 4 transition - colors duration - 200 ${
    isActive
      ? "border-[var(--flow-green)] shadow-[0_0_40px_rgba(34,197,94,0.25)]"
      : "border-[var(--flow-border)]"
  } `}
    >
      <span className="font-display text-lg font-bold tracking-tight text-[var(--flow-green-bright)]">
        {stage.title}
      </span>
    </motion.li>
  );
}
