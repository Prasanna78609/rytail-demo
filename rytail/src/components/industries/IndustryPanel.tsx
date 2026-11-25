"use client";

import { motion } from "motion/react";
import type { Industry, IndustryId } from "@/data/industries";
import { FinanceMockup } from "./FinanceMockup";
import { GamingMockup } from "./GamingMockup";
import { RetailMockup } from "./RetailMockup";
import { SubscriptionMockup } from "./SubscriptionMockup";

interface IndustryPanelProps {
  industry: Industry;
  index: number;
  reducedMotion: boolean;
  isDesktop: boolean;
  onHeaderClick?: (id: IndustryId) => void;
}

const MOCKUP_MAP: Record<IndustryId, React.ComponentType> = {
  retail: RetailMockup,
  subscriptions: SubscriptionMockup,
  finance: FinanceMockup,
  gaming: GamingMockup,
};

const HEADER_HEIGHT = 64;

export function IndustryPanel({
  industry,
  index,
  reducedMotion,
  isDesktop,
  onHeaderClick,
}: IndustryPanelProps) {
  const MockupComponent = MOCKUP_MAP[industry.id];

  const shouldStack = isDesktop && !reducedMotion;
  const stickyTop = `calc(var(--header-h, 72px) + ${60 + index * HEADER_HEIGHT}px)`;

  return (
    <motion.article
      id={`industry-panel-${industry.id}`}
      role="tabpanel"
      aria-labelledby={`industry-tab-${industry.id}`}
      style={
        shouldStack
          ? {
            position: "sticky",
            top: stickyTop,
            zIndex: index + 1,
            willChange: "transform",
          }
          : undefined
      }
      className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-[24px] border border-zinc-200/90 bg-white shadow-[0_-4px_24px_rgba(9,13,11,0.06),0_20px_50px_rgba(9,13,11,0.08)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.35fr_0.8fr]">
        {/* Left Column: Top-aligned Stacked Label Header + Description, Bullets, CTA */}
        <div className="flex flex-col justify-between">
          <button
            type="button"
            onClick={() => onHeaderClick?.(industry.id)}
            className="flex h-16 w-full cursor-pointer items-center px-7 text-left transition-colors hover:bg-emerald-50/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-emerald-600 sm:px-9 lg:px-10"
          >
            <h3 className="font-display text-lg font-bold tracking-[-0.015em] text-[#090d0b] sm:text-xl">
              {industry.title}
            </h3>
          </button>

          <div className="flex flex-1 flex-col justify-between px-7 pb-7 pt-2 sm:px-9 sm:pb-9 lg:px-10 lg:pb-10">
            <div>
              <p className="type-body line-clamp-3 text-zinc-600">
                {industry.description}
              </p>

              <ul className="mt-6 space-y-3">
                {industry.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-zinc-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
                    />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <a
                href={`#${industry.id}-solutions`}
                className="type-button inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[#090d0b] transition-colors hover:border-[#090d0b] hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Know more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Center Column: HTML/CSS Product UI Mockup */}
        <div className="flex items-center justify-center border-y border-zinc-100 bg-[#f6faf8] px-5 py-8 sm:px-8 lg:min-h-[460px] lg:border-x lg:border-y-0">
          <MockupComponent />
        </div>

        {/* Right Sidebar: Customer Placeholder & Illustrative Stat */}
        <aside className="flex flex-col justify-between bg-[#f4f7f5] p-7 sm:p-9 lg:p-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#090d0b] font-display text-sm font-bold text-emerald-400">
              {industry.customerPlaceholder.monogram}
            </div>
            <span className="font-display text-sm font-semibold text-[#090d0b]">
              {industry.customerPlaceholder.companyName}
            </span>
          </div>

          <div className="my-8">
            <p className="font-display text-5xl font-bold tracking-tight text-emerald-700 lg:text-[3.5rem]">
              {industry.stat}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {industry.statLabel}
            </p>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
              Illustrative data
            </p>
          </div>

          <div>
            <a
              href={`#${industry.id}-story`}
              aria-label={`Read ${industry.customerPlaceholder.companyName} outcome`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 bg-white text-[#090d0b] transition-colors hover:border-[#090d0b] hover:bg-[#090d0b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </aside>
      </div>
    </motion.article>
  );
}
