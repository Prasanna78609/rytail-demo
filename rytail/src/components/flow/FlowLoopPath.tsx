"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface FlowLoopPathProps {
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

export function FlowLoopPath({
  scrollYProgress,
  reducedMotion,
}: FlowLoopPathProps) {
  // Top connectors draw 0.16->0.34, remaining clockwise loop draws 0.40->0.62
  const loopPathLength = useTransform(
    scrollYProgress,
    [0.16, 0.34, 0.4, 0.62],
    [0.12, 0.36, 0.4, 1]
  );

  const rightArrowOpacity = useTransform(scrollYProgress, [0.42, 0.47], [0, 1]);
  const bottomArrowOpacity = useTransform(scrollYProgress, [0.49, 0.55], [0, 1]);
  const leftArrowOpacity = useTransform(scrollYProgress, [0.56, 0.61], [0, 1]);

  // Single rounded-rectangle path (radius 28) clockwise from top-left
  const loopD =
    "M 36 8 H 964 A 28 28 0 0 1 992 36 V 464 A 28 28 0 0 1 964 492 H 36 A 28 28 0 0 1 8 464 V 36 A 28 28 0 0 1 36 8 Z";

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <mask id="flow-loop-mask">
          <motion.path
            d={loopD}
            fill="none"
            stroke="white"
            strokeWidth="8"
            initial={reducedMotion ? { pathLength: 1 } : undefined}
            style={reducedMotion ? undefined : { pathLength: loopPathLength }}
          />
        </mask>
      </defs>

      {/* Subtle base dashed guide */}
      <path
        d={loopD}
        fill="none"
        stroke="rgba(34, 197, 94, 0.15)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />

      {/* Active green dashed loop (#22C55E at 60% opacity) */}
      <path
        d={loopD}
        fill="none"
        stroke="rgba(34, 197, 94, 0.6)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        mask="url(#flow-loop-mask)"
      />

      {/* Right side solid 14px triangle pointing down */}
      <motion.polygon
        points="985,243 999,243 992,257"
        fill="#4ADE80"
        style={reducedMotion ? { opacity: 1 } : { opacity: rightArrowOpacity }}
      />

      {/* Bottom side solid 14px triangles pointing left */}
      <motion.polygon
        points="707,485 707,499 693,492"
        fill="#4ADE80"
        style={reducedMotion ? { opacity: 1 } : { opacity: bottomArrowOpacity }}
      />
      <motion.polygon
        points="307,485 307,499 293,492"
        fill="#4ADE80"
        style={reducedMotion ? { opacity: 1 } : { opacity: bottomArrowOpacity }}
      />

      {/* Left side solid 14px triangle pointing up */}
      <motion.polygon
        points="1,257 15,257 8,243"
        fill="#4ADE80"
        style={reducedMotion ? { opacity: 1 } : { opacity: leftArrowOpacity }}
      />
    </svg>
  );
}
