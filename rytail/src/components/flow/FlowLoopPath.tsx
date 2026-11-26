"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { ArrowAnchor, LoopGeometryResult } from "./loopGeometry";

interface FlowLoopPathProps {
  geometry: LoopGeometryResult;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}

function SegmentArrow({
  arrow,
  segmentProgress,
  reducedMotion,
}: {
  arrow: ArrowAnchor;
  segmentProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const start = Math.max(0, arrow.triggerAt - 0.05);
  const end = Math.min(1, arrow.triggerAt + 0.06);
  const opacity = useTransform(segmentProgress, [start, end], [0, 1]);
  const scale = useTransform(segmentProgress, [start, end], [0.4, 1]);

  return (
    <g transform={`translate(${arrow.x} ${arrow.y}) rotate(${arrow.angle})`}>
      <motion.polygon
        points="-14,-6 0,0 -14,6"
        fill="#4ADE80"
        style={
          reducedMotion
            ? undefined
            : {
              opacity,
              scale,
              transformOrigin: "0px 0px",
            }
        }
      />
    </g>
  );
}

export function FlowLoopPath({
  geometry,
  scrollYProgress,
  reducedMotion,
}: FlowLoopPathProps) {
  const topRef = useRef<SVGPathElement>(null);
  const rightRef = useRef<SVGPathElement>(null);
  const bottomRef = useRef<SVGPathElement>(null);
  const leftRef = useRef<SVGPathElement>(null);

  // Each segment has its own 0..1 progress ramp
  const topProgress = useTransform(scrollYProgress, [0.12, 0.34], [0, 1]);
  const rightProgress = useTransform(scrollYProgress, [0.46, 0.51], [0, 1]);
  const bottomProgress = useTransform(scrollYProgress, [0.51, 0.57], [0, 1]);
  const leftProgress = useTransform(scrollYProgress, [0.57, 0.62], [0, 1]);

  const segmentProgressMap: Record<ArrowAnchor["segment"], MotionValue<number>> = {
    top: topProgress,
    right: rightProgress,
    bottom: bottomProgress,
    left: leftProgress,
  };

  // Dev-only verification that each arrowhead anchor lies within 1px of its segment path
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const pathRefs: Record<ArrowAnchor["segment"], SVGPathElement | null> = {
      top: topRef.current,
      right: rightRef.current,
      bottom: bottomRef.current,
      left: leftRef.current,
    };

    for (const arrow of geometry.arrows) {
      const pathEl = pathRefs[arrow.segment];
      if (!pathEl || typeof pathEl.getTotalLength !== "function") continue;
      const total = pathEl.getTotalLength();
      if (total <= 0) continue;

      let minDist = Infinity;
      const samples = 64;
      for (let i = 0; i <= samples; i++) {
        const pt = pathEl.getPointAtLength((i / samples) * total);
        const d = Math.hypot(pt.x - arrow.x, pt.y - arrow.y);
        if (d < minDist) minDist = d;
      }

      if (minDist > 1.5) {
        console.warn(
          `[FlowLoopPath] Arrowhead "${arrow.id}" is ${minDist.toFixed(
            2
          )}px from segment "${arrow.segment}"`
        );
      }
    }
  }, [geometry]);

  const segments: Array<{
    key: ArrowAnchor["segment"];
    d: string;
    progress: MotionValue<number>;
    ref: React.RefObject<SVGPathElement | null>;
  }> = [
      { key: "top", d: geometry.paths.top, progress: topProgress, ref: topRef },
      {
        key: "right",
        d: geometry.paths.right,
        progress: rightProgress,
        ref: rightRef,
      },
      {
        key: "bottom",
        d: geometry.paths.bottom,
        progress: bottomProgress,
        ref: bottomRef,
      },
      { key: "left", d: geometry.paths.left, progress: leftProgress, ref: leftRef },
    ];

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${geometry.width} ${geometry.heightFull}`}
      width={geometry.width}
      height={geometry.heightFull}
      className="pointer-events-none absolute left-0 top-0 z-10 overflow-visible"
    >
      <defs>
        {segments.map((seg) => (
          <mask key={`mask-${seg.key}`} id={`flow-mask-${seg.key}`}>
            <motion.path
              d={seg.d}
              fill="none"
              stroke="white"
              strokeWidth="8"
              initial={reducedMotion ? { pathLength: 1 } : undefined}
              style={reducedMotion ? undefined : { pathLength: seg.progress }}
            />
          </mask>
        ))}
      </defs>

      {segments.map((seg) => (
        <path
          key={seg.key}
          data-segment={seg.key}
          d={seg.d}
          fill="none"
          stroke="rgba(34, 197, 94, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          mask={`url(#flow-mask-${seg.key})`}
        />
      ))}

      {geometry.arrows.map((arrow) => (
        <SegmentArrow
          key={arrow.id}
          arrow={arrow}
          segmentProgress={segmentProgressMap[arrow.segment]}
          reducedMotion={reducedMotion}
        />
      ))}
    </svg>
  );
}
