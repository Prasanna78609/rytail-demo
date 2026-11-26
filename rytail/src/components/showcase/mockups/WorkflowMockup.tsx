"use client";

import { useEffect, useState } from "react";
import { Activity, Check, Filter, Send } from "lucide-react";
import { motion } from "motion/react";
import type { WorkflowMockupData } from "@/data/showcase";

interface WorkflowMockupProps {
  data: WorkflowMockupData;
  isExpanded: boolean;
  reducedMotion: boolean;
}

function StepIcon({ index }: { index: number }) {
  if (index === 0) return <Activity className="h-3.5 w-3.5" />;
  if (index === 1) return <Filter className="h-3.5 w-3.5" />;
  return <Send className="h-3.5 w-3.5" />;
}

// Illustrative UI, not functional.
export function WorkflowMockup({
  data,
  isExpanded,
  reducedMotion,
}: WorkflowMockupProps) {
  const [litStep, setLitStep] = useState(
    reducedMotion ? data.steps.length : 0
  );

  useEffect(() => {
    if (reducedMotion) return;
    if (!isExpanded) {
      const resetId = window.setTimeout(() => setLitStep(0), 0);
      return () => window.clearTimeout(resetId);
    }

    const t1 = window.setTimeout(() => setLitStep(1), 180);
    const t2 = window.setTimeout(() => setLitStep(2), 680);
    const t3 = window.setTimeout(() => setLitStep(3), 1180);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [isExpanded, reducedMotion]);

  const currentLit = reducedMotion ? data.steps.length : litStep;

  if (!isExpanded) {
    return (
        <div className="flex items-center gap-2 rounded-full px-2.5 py-1 text-xs text-white">
          <StepIcon index={0} />
          <span className="truncate font-medium">{data.steps[0]}</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ADE80]" />
        </div>
        );
  }

        return (
        <div className="flex flex-col text-[14px]">
          {data.steps.map((stepTitle, idx) => {
            const isLit = currentLit >= idx + 1;
            const isLineLit = currentLit >= idx + 2;

            return (
              <div key={stepTitle}>
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { duration: 0.25, delay: idx * 0.12 }
                  }
                  className={`flex items-center justify-between gap-2.5 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${isLit
                      ? "border-[#4ADE80]/50 bg-[#4ADE80]/10 text-white"
                      : "border-white/15 bg-white/[0.03] text-white/70"
                    }`}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${isLit
                          ? "bg-[#4ADE80]/20 text-[#4ADE80]"
                          : "bg-white/10 text-white/60"
                        }`}
                    >
                      <StepIcon index={idx} />
                    </span>
                    <span className="truncate text-[13px] font-medium">
                      {stepTitle}
                    </span>
                  </div>

                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {isLit ? (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#4ADE80] text-[#090d0b]">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                    )}
                  </span>
                </motion.div>

                {/* Dotted Connector Line Filling Green */}
                {idx < data.steps.length - 1 && (
                  <div className="relative ml-6 h-3.5 w-[2px]">
                    <div className="absolute inset-0 border-l-2 border-dotted border-white/25" />
                    <motion.div
                      animate={{ scaleY: isLineLit ? 1 : 0 }}
                      transition={
                        reducedMotion
                          ? { duration: 0 }
                          : { duration: 0.3, ease: "easeOut" }
                      }
                      style={{ transformOrigin: "top" }}
                      className="absolute inset-0 bg-[#4ADE80]"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Toast Under List */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={
              currentLit >= 3
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.3, delay: 0.2, ease: "easeOut" }
            }
            className="mt-3 flex items-center gap-2 rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/15 px-3.5 py-1.5 text-xs font-semibold text-[#4ADE80]"
          >
            <Check className="h-3.5 w-3.5 shrink-0" />
            <span>{data.toast}</span>
          </motion.div>
        </div>
        );
}
