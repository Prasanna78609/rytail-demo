"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CaseStudy, CaseStudyImage } from "@/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

function CaseStudyIcon({ icon }: { icon: CaseStudyImage["icon"] }) {
  if (icon === "store") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="h-9 w-9 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 9.75 4.5 4.5h15L21 9.75M3 9.75a2.25 2.25 0 0 0 4.5 0M3 9.75v9.75A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5V9.75m-13.5 0a2.25 2.25 0 0 0 4.5 0m0 0a2.25 2.25 0 0 0 4.5 0m0 0a2.25 2.25 0 0 0 4.5 0"
        />
      </svg>
    );
  }

  if (icon === "repeat") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className="h-9 w-9 text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-4.142-3.358-7.5-7.5-7.5-2.61 0-4.91 1.334-6.256 3.356M4.5 12c0 4.142 3.358 7.5 7.5 7.5 2.61 0 4.91-1.334 6.256-3.356M4.5 4.5v3.75h3.75m11.25 11.25V15.75h-3.75"
        />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      className="h-9 w-9 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v18h18M7.5 15.75l3.75-4.5 3.75 2.25 4.5-6"
      />
    </svg>
  );
}

export function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <motion.a
      href={study.href}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.45, delay: index * 0.1, ease: "easeOut" }
      }
      style={{
        backgroundColor: study.accentBg,
        borderColor: study.accentBorder,
      }}
      className="group flex h-full flex-col rounded-[20px] border p-6 transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
    >
      {/* 16:10 Placeholder Gradient Image with Icon Overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px]">
        <div
          role="img"
          aria-label={study.image.alt}
          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${study.image.gradient} transition-transform duration-300 ease-out group-hover:scale-[1.04]`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
            <CaseStudyIcon icon={study.image.icon} />
          </div>
        </div>
      </div>

      {/* Bold 22px Title */}
      <h3 className="mt-5 line-clamp-5 font-display text-[1.375rem] font-bold leading-[1.32] tracking-[-0.015em] text-[#090d0b]">
        {study.title}
      </h3>

      {/* Divider + Pinned Emerald Link */}
      <div className="mt-auto pt-6">
        <div className="border-t border-zinc-900/10 pt-4">
          <span className="type-button inline-flex items-center gap-1.5 text-emerald-700">
            Read case study
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}
