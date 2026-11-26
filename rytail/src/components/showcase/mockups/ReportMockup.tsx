"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import type { ReportMockupData } from "@/data/showcase";

interface ReportMockupProps {
  data: ReportMockupData;
  isExpanded: boolean;
  reducedMotion: boolean;
}

// Illustrative UI, not functional.
export function ReportMockup({
  data,
  isExpanded,
  reducedMotion,
}: ReportMockupProps) {
  const [stat0, setStat0] = useState(reducedMotion ? data.stats[0].value : 0);
  const [stat1, setStat1] = useState(reducedMotion ? data.stats[1].value : 0);

  useEffect(() => {
    if (reducedMotion) return;
    if (!isExpanded) {
      const resetId = window.setTimeout(() => {
        setStat0(0);
        setStat1(0);
      }, 0);
      return () => window.clearTimeout(resetId);
    }

    let c0: ReturnType<typeof animate> | undefined;
    let c1: ReturnType<typeof animate> | undefined;
    const timeoutId = window.setTimeout(() => {
      c0 = animate(0, data.stats[0].value, {
        duration: 0.65,
        ease: "easeOut",
        onUpdate: (v) => setStat0(Math.round(v)),
      });
      c1 = animate(0, data.stats[1].value, {
        duration: 0.65,
        ease: "easeOut",
        onUpdate: (v) => setStat1(Math.round(v)),
      });
    }, 650);

    return () => {
      window.clearTimeout(timeoutId);
      c0?.stop();
      c1?.stop();
    };
  }, [isExpanded, data.stats, reducedMotion]);

  const shownStats = reducedMotion
    ? [data.stats[0].value, data.stats[1].value]
    : [stat0, stat1];

  const headerRow = (
    <div className="flex items-center justify-between gap-3 text-[14px]">
      <span className="font-semibold text-white">{data.title}</span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ADE80]/40 bg-[#4ADE80]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#4ADE80]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
        {data.badge}
      </span>
    </div>
  );

  if (!isExpanded) {
    return headerRow;
  }

  return (
    <div className="flex flex-col gap-3 text-[14px]">
      {headerRow}

      {/* Mini Bar Chart (6 bars, 80ms stagger) + Line Chart Overlay */}
      <div className="relative flex h-24 items-end gap-2 rounded-[14px] border border-white/10 bg-white/[0.03] px-3 pb-2.5 pt-4">
        {data.bars.map((heightPct, idx) => (
          <div key={idx} className="flex h-full flex-1 items-end">
            <motion.div
              initial={reducedMotion ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                    duration: 0.35,
                    delay: idx * 0.08,
                    ease: "easeOut",
                  }
              }
              style={{
                height: `${heightPct}%`,
                transformOrigin: "bottom",
              }}
              className="w-full rounded-t-md bg-white/20"
            />
          </div>
        ))}

        {/* Thin Line Chart Over Bars */}
        <svg
          viewBox="0 0 220 70"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-3 bottom-2.5 top-4 h-[calc(100%-26px)] w-[calc(100%-24px)]"
          fill="none"
        >
          <motion.path
            d="M 8 52 L 46 38 L 88 44 L 130 24 L 172 28 L 212 8"
            stroke="#4ADE80"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { duration: 0.65, delay: 0.5, ease: "easeOut" }
            }
          />
        </svg>
      </div>

      {/* 2 Stat Rows */}
      <div className="grid grid-cols-2 gap-2">
        {data.stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
          >
              <span className="truncate text-[11px] text-white/70">
                {stat.label}
              </span>
              <span className="shrink-0 whitespace-nowrap text-xs font-semibold tabular-nums text-[#4ADE80]">
                {stat.prefix}
                {shownStats[idx]}
                {stat.suffix}
              </span>
          </div>
        ))}
      </div>

      <p className="text-[10px] uppercase tracking-wider text-white/45">
        Illustrative data
      </p>
    </div>
  );
}
