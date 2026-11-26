"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { IMPACT_METRICS, type MetricItem } from "@/data/landing";

function CountUpMetric({
  metric,
  reducedMotion,
}: {
  metric: MetricItem;
  reducedMotion: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const [displayValue, setDisplayValue] = useState(
    reducedMotion ? metric.value : 0
  );

  useEffect(() => {
    if (reducedMotion || !isInView) return;
    const controls = animate(0, metric.value, {
      duration: 1.0,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, metric.value, reducedMotion]);

  const shownValue = reducedMotion ? metric.value : displayValue;

  return (
    <div
      ref={ref}
      className="flex flex-col justify-between rounded-2xl border border-[#E4EAE7] bg-[#F4F7F6] p-6"
    >
      <div>
        <p className="font-display text-4xl font-bold tracking-tight text-[#090D0B] sm:text-5xl">
          {metric.prefix}
          {shownValue}
          <span className="text-[#059669]">{metric.suffix}</span>
        </p>
        <p className="mt-2 text-sm font-medium text-[#52606A]">
          {metric.label}
        </p>
      </div>
      <p className="mt-4 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
        Illustrative data
      </p>
    </div>
  );
}

export default function MetricsStrip() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      aria-labelledby="metrics-strip-heading"
      className="w-full bg-white py-16 md:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
        }
        className="mx-auto max-w-[1200px] px-6"
      >
        <h2
          id="metrics-strip-heading"
          className="type-section mx-auto max-w-2xl text-center text-[#090D0B]"
        >
          Measurable Impact. Meaningful Progress.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT_METRICS.map((metric) => (
            <CountUpMetric
              key={metric.id}
              metric={metric}
              reducedMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
