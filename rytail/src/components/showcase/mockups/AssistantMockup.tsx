"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { animate, motion } from "motion/react";
import type { AssistantMockupData } from "@/data/showcase";

interface AssistantMockupProps {
  data: AssistantMockupData;
  isExpanded: boolean;
  reducedMotion: boolean;
}

// Illustrative UI, not functional.
export function AssistantMockup({
  data,
  isExpanded,
  reducedMotion,
}: AssistantMockupProps) {
  const [count, setCount] = useState(
    reducedMotion ? data.targetCount : 0
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    if (!isExpanded) {
      const resetId = window.setTimeout(() => setCount(0), 0);
      return () => window.clearTimeout(resetId);
    }

    let controls: ReturnType<typeof animate> | undefined;
    const timeoutId = window.setTimeout(() => {
      controls = animate(0, data.targetCount, {
        duration: 0.55,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
    }, 700);

    return () => {
      window.clearTimeout(timeoutId);
      controls?.stop();
    };
  }, [isExpanded, data.targetCount, reducedMotion]);

  const shownCount = reducedMotion ? data.targetCount : count;

  if (!isExpanded) {
    return (
        <div className="truncate rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900">
          {data.resultTitle}
        </div>
        );
  }

        return (
        <div className="flex flex-col gap-3 text-[14px]">
          {/* 0ms: White User Bubble */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
            }
            className="rounded-[16px] bg-white px-3.5 py-2.5 text-[13px] font-medium leading-snug text-zinc-900"
          >
            {data.prompt}
          </motion.div>

          {/* 400ms: Bordered Result Card */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.25, delay: 0.4, ease: "easeOut" }
            }
            className="flex h-[100px] flex-col justify-between rounded-[16px] border border-white/20 p-3.5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-white">{data.resultTitle}</span>
              <span className="shrink-0 rounded-full border border-[#4ADE80]/60 bg-[#4ADE80]/10 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[#4ADE80]">
                {shownCount} {data.countSuffix}
              </span>
            </div>

            {/* 1000ms: 3 Skeleton Lines */}
            <div className="space-y-1.5">
              {[0, 1, 2].map((idx) => (
                <motion.div
                  key={idx}
                  initial={reducedMotion ? false : { opacity: 0.15, scaleX: 0.4 }}
                  animate={{ opacity: 0.55, scaleX: 1 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : {
                        duration: 0.3,
                        delay: 1.0 + idx * 0.12,
                        ease: "easeOut",
                      }
                  }
                  style={{ transformOrigin: "left" }}
                  className={`h-1.5 rounded-full bg-white/40 ${idx === 2 ? "w-2/3" : "w-full"
                    }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Pill Input with Typing Caret & 1600ms Send Pulse */}
          <div className="flex items-center justify-between gap-2 rounded-full border border-white/20 bg-white/[0.04] py-1.5 pl-3.5 pr-1.5">
            <div className="flex min-w-0 items-center text-xs text-white/70">
              <span className="truncate">{data.placeholder}</span>
              {!reducedMotion && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="ml-0.5 inline-block h-3.5 w-[1.5px] shrink-0 bg-[#4ADE80]"
                />
              )}
            </div>
            <motion.span
              animate={reducedMotion ? undefined : { scale: [1, 1.16, 1] }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.35, delay: 1.6, ease: "easeOut" }
              }
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4ADE80] text-[#090d0b]"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </motion.span>
          </div>
        </div>
        );
}
