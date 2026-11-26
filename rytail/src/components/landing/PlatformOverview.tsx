"use client";

import { Database, Send, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { OVERVIEW_FEATURES, type OverviewFeature } from "@/data/landing";

function FeatureIcon({ icon }: { icon: OverviewFeature["icon"] }) {
  switch (icon) {
    case "database":
      return <Database className="h-5 w-5 text-[#059669]" aria-hidden="true" />;
    case "zap":
      return <Zap className="h-5 w-5 text-[#059669]" aria-hidden="true" />;
    case "send":
      return <Send className="h-5 w-5 text-[#059669]" aria-hidden="true" />;
  }
}

export default function PlatformOverview() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="platform"
      aria-labelledby="platform-overview-heading"
      className="w-full bg-white py-16 md:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
        }
        className="mx-auto max-w-[1200px] px-6"
      >
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="type-label inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-emerald-800">
            Autonomous Customer Platform
          </span>
          <h2
            id="platform-overview-heading"
            className="type-section mt-4 text-[#090D0B]"
          >
            Built for teams that act on live customer context
          </h2>
          <p className="type-body mt-4 text-[#52606A]">
            Connect streaming product events, warehouse audiences and
            cross-channel messaging in a single low-latency engine.
          </p>
        </div>

        {/* 3-Column Feature Row */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {OVERVIEW_FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="rounded-2xl border border-[#E4EAE7] bg-[#F4F7F6]/60 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <FeatureIcon icon={feature.icon} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-[#090D0B]">
                {feature.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#52606A]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* HTML/CSS Product Dashboard Mockup */}
        <div
          aria-hidden="true"
          className="mt-12 overflow-hidden rounded-[24px] border border-[#E4EAE7] bg-[#F4F7F6] p-5 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
            {/* Left: Metric Cards + Line Chart */}
              <div className="rounded-2xl border border-[#E4EAE7] bg-white p-4 shadow-2xs sm:p-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <span className="font-display text-sm font-bold text-[#090D0B]">
                    Live Event &amp; Decision Engine
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                    Healthy
                  </span>
                </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-[#F4F7F6] p-3">
                      <p className="text-[11px] text-[#52606A]">Events / sec</p>
                      <p className="mt-1 font-display text-lg font-bold text-[#090D0B]">
                        48.2k
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#F4F7F6] p-3">
                      <p className="text-[11px] text-[#52606A]">Active Flows</p>
                      <p className="mt-1 font-display text-lg font-bold text-[#090D0B]">
                        124
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#F4F7F6] p-3">
                      <p className="text-[11px] text-[#52606A]">Median Latency</p>
                      <p className="mt-1 font-display text-lg font-bold text-[#059669]">
                        42ms
                      </p>
                    </div>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="mt-5 rounded-xl bg-[#F4F7F6] p-4">
                    <svg viewBox="0 0 400 90" className="h-20 w-full" fill="none">
                      <path
                        d="M 0 72 C 45 68, 70 42, 120 46 C 170 50, 200 22, 255 28 C 310 34, 345 12, 400 16"
                        stroke="#10B981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 0 72 C 45 68, 70 42, 120 46 C 170 50, 200 22, 255 28 C 310 34, 345 12, 400 16 L 400 90 L 0 90 Z"
                        fill="rgba(16, 185, 129, 0.12)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Right: Activity List */}
                <div className="rounded-2xl border border-[#E4EAE7] bg-white p-5 shadow-2xs">
                  <p className="font-display text-sm font-bold text-[#090D0B]">
                    Recent Orchestrations
                  </p>
                  <ul className="mt-4 space-y-3">
                    {[
                      { name: "Trial Onboarding Sequence", time: "2m ago", status: "Synced" },
                      { name: "Cart Recovery Trigger", time: "8m ago", status: "Active" },
                      { name: "Warehouse Audience Refresh", time: "14m ago", status: "Done" },
                      { name: "Renewal Risk Alert", time: "21m ago", status: "Active" },
                    ].map((row) => (
                      <li
                        key={row.name}
                        className="flex items-center justify-between rounded-xl border border-zinc-100 bg-[#F4F7F6]/60 px-3.5 py-2.5"
                      >
                        <div>
                          <p className="text-xs font-semibold text-[#090D0B]">
                            {row.name}
                          </p>
                          <p className="text-[11px] text-[#52606A]">{row.time}</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-[#059669]">
                          {row.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <a
                href="#demo"
                className="type-button inline-flex items-center justify-center rounded-full bg-[#059669] px-7 py-3.5 text-white shadow-xs transition-colors hover:bg-[#047857] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669]"
              >
                Request a Demo
              </a>
              <a
                href="#how-it-works"
                className="type-button inline-flex items-center gap-1.5 px-2 py-2 text-[#090D0B] transition-colors hover:text-[#059669] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669]"
              >
                See how it works <span aria-hidden="true">→</span>
              </a>
            </div>
          </motion.div>
        </section>
        );
}
