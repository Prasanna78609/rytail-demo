"use client";

import { Check, Cpu, MessageSquare, PlusCircle, Terminal, Zap } from "lucide-react";
import { motion } from "motion/react";

interface CardMockupProps {
  pills: [string, string, string];
  activePill: string;
  statusText: string;
  isExpanded: boolean;
  reducedMotion: boolean;
}

function PillIcon({ index }: { index: number }) {
  if (index === 0) {
    return <MessageSquare className="h-3.5 w-3.5 shrink-0 text-zinc-700" />;
  }
  if (index === 1) {
    return <Terminal className="h-3.5 w-3.5 shrink-0 text-zinc-700" />;
  }
  return <PlusCircle className="h-3.5 w-3.5 shrink-0 text-zinc-700" />;
}

export function CardMockup({
  pills,
  activePill,
  statusText,
  isExpanded,
  reducedMotion,
}: CardMockupProps) {
  const yPositions = [17, 50, 83];

  if (!isExpanded) {
    return (
      <div
        aria-hidden="true"
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1A1816]/90 px-3.5 py-2 shadow-lg backdrop-blur-md"
      >
        <Zap className="h-3.5 w-3.5 text-emerald-400" />
        <span className="text-xs font-semibold text-white">{activePill}</span>
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
      className="w-full max-w-[350px] rounded-[20px] border border-white/15 bg-[#1A1816]/95 p-3 shadow-2xl backdrop-blur-md sm:w-[78%] sm:p-4"
    >
      <div className="flex items-stretch justify-between">
        {/* 3 White Stacked Pill Options */}
        <div className="flex flex-1 flex-col justify-between gap-2">
          {pills.map((pill, idx) => (
            <motion.div
              key={pill}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.22, delay: idx * 0.07, ease: "easeOut" }
              }
              className="flex h-8 items-center gap-2 rounded-full bg-white px-3.5 text-xs font-semibold text-zinc-900 shadow-xs"
            >
              <PillIcon index={idx} />
              <span className="truncate">{pill}</span>
            </motion.div>
          ))}
        </div>

        {/* All 3 Curved Connector Lines -> Hub */}
        <svg
          viewBox="0 0 44 100"
          className="h-[112px] w-9 shrink-0"
          fill="none"
        >
          {yPositions.map((y, idx) => {
            const d = `M 0 ${y} C 22 ${y}, 22 50, 44 50`;
            return (
              <g key={y}>
                <path
                  d={d}
                  stroke="rgba(74, 222, 128, 0.2)"
                  strokeWidth="1.5"
                />
                <motion.path
                  d={d}
                  stroke="#4ADE80"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                        duration: 0.45,
                        delay: 0.14 + idx * 0.1,
                        ease: "easeOut",
                      }
                  }
                />
              </g>
            );
          })}
        </svg>

        {/* Tall Hub Node */}
        <motion.div
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.08, 1] }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : { duration: 0.35, delay: 0.58, ease: "easeOut" }
          }
          className="flex w-14 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-emerald-400 bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]"
        >
          <Cpu className="h-6 w-6" />
        </motion.div>
      </div>

      {/* Mint-Green Confirmation Banner Pill */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : { duration: 0.28, delay: 0.64, ease: "easeOut" }
        }
        className="mt-3 flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3.5 py-2 text-xs font-semibold text-[#064E3B]"
      >
        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-700" />
        <span className="truncate">{statusText}</span>
      </motion.div>
    </motion.div>
  );
}
