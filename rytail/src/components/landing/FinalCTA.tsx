"use client";

import { motion, useReducedMotion } from "motion/react";

export default function FinalCTA() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="demo"
      aria-labelledby="final-cta-heading"
      className="w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
          }
          style={{
            background:
              "linear-gradient(135deg, #064e3b 0%, #059669 52%, #10b981 100%)",
          }}
          className="rounded-[32px] px-6 py-14 text-center text-white shadow-[0_24px_60px_rgba(6,78,59,0.22)] sm:px-12 md:py-20"
        >
          <h2
            id="final-cta-heading"
            className="type-section mx-auto max-w-2xl text-white"
          >
            Ready to Transform the Way Your Business Works?
          </h2>
          <p className="type-body mx-auto mt-4 max-w-xl text-emerald-50/95">
            Discover how intelligent technology can simplify operations, improve
            productivity and accelerate growth.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@rytail.com?subject=Schedule%20a%20Demo"
              className="type-button inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-[#090D0B] shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Schedule a Demo
            </a>
            <a
              href="mailto:hello@rytail.com?subject=Contact%20Sales"
              className="type-button inline-flex items-center justify-center rounded-full border border-white/40 bg-transparent px-7 py-3.5 text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Sales
            </a>
          </div>

          {/* TODO: Review SLA commitment copy before launch */}
          <p className="mt-5 text-xs font-medium text-emerald-100/90">
            No commitment. Response within one business day.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
