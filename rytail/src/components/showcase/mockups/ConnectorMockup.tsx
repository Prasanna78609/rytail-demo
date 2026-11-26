"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Network } from "lucide-react";
import { motion } from "motion/react";
import type { ConnectorMockupData } from "@/data/showcase";

interface ConnectorMockupProps {
  data: ConnectorMockupData;
  isExpanded: boolean;
  reducedMotion: boolean;
}

// Illustrative UI, not functional.
export function ConnectorMockup({
  data,
  isExpanded,
  reducedMotion,
}: ConnectorMockupProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const yPositions = [17, 50, 83];

  useEffect(() => {
    if (!isExpanded || reducedMotion) {
      const resetId = window.setTimeout(() => setActiveIndex(0), 0);
      return () => window.clearTimeout(resetId);
    }

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.pills.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [isExpanded, reducedMotion, data.pills.length]);

  if (!isExpanded) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[14px] font-semibold text-zinc-900">
        <MessageSquare className="h-3.5 w-3.5 text-zinc-700" />
        <span>{data.pills[0]}</span>
      </div>
    );
  }

  return (
    <div className="flex items-stretch justify-between text-[14px]">
      {/* 3 Stacked Pills */}
      <div className="flex flex-1 flex-col justify-between gap-2.5">
        {data.pills.map((pill, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={pill}
              className={`flex h-9 items-center gap-2 rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-300 ${
                isActive
                  ? "bg-white text-zinc-900"
                  : "border border-white/20 bg-white/[0.04] text-white/70"
              }`}
            >
              <MessageSquare
                className={`h-3.5 w-3.5 shrink-0 ${
                  isActive ? "text-zinc-800" : "text-white/50"
                }`}
              />
              <span className="truncate">{pill}</span>
            </div>
          );
        })}
      </div>

      {/* Connector Lines */}
      <svg viewBox="0 0 44 100" className="h-[124px] w-10 shrink-0" fill="none">
        {yPositions.map((y, idx) => {
          const isActive = idx === activeIndex;
          const d = `M 0 ${y} C 22 ${y}, 22 50, 44 50`;

          if (!isActive) {
            return (
              <path
                key={y}
                d={d}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            );
          }

          return (
            <motion.path
              key={`${y}-${activeIndex}`}
              d={d}
              stroke="#4ADE80"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: "easeOut" }
              }
            />
          );
        })}
      </svg>

      {/* Tall Hub Node */}
      <motion.div
        key={`hub-${activeIndex}`}
        animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.45 }
        }
        className="flex w-14 shrink-0 items-center justify-center rounded-2xl border border-[#4ADE80] bg-[#4ADE80]/10 text-[#4ADE80]"
      >
        <Network className="h-5 w-5" />
      </motion.div>
    </div>
  );
}
