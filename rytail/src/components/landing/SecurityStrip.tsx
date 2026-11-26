"use client";

import { FileText, Key, Lock, ShieldCheck, Sliders, Users } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SECURITY_ITEMS, type SecurityItem } from "@/data/landing";

function SecurityIcon({ icon }: { icon: SecurityItem["icon"] }) {
  switch (icon) {
    case "key":
      return <Key className="h-4 w-4 text-[#059669]" aria-hidden="true" />;
    case "users":
      return <Users className="h-4 w-4 text-[#059669]" aria-hidden="true" />;
    case "lock":
      return <Lock className="h-4 w-4 text-[#059669]" aria-hidden="true" />;
    case "fileText":
      return <FileText className="h-4 w-4 text-[#059669]" aria-hidden="true" />;
    case "sliders":
      return <Sliders className="h-4 w-4 text-[#059669]" aria-hidden="true" />;
    case "shieldCheck":
      return <ShieldCheck className="h-4 w-4 text-[#059669]" aria-hidden="true" />;
  }
}

export default function SecurityStrip() {
  const shouldReduceMotion = Boolean(useReducedMotion());

  return (
    <section
      id="security"
      aria-labelledby="security-strip-heading"
      className="w-full bg-[#F4F7F6] py-16 md:py-24"
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
        <div className="mx-auto max-w-2xl text-center">
          <span className="type-label inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-emerald-800">
            Enterprise Governance
          </span>
          <h2
            id="security-strip-heading"
            className="type-section mt-4 text-[#090D0B]"
          >
            Security, Transparency and Control.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECURITY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 rounded-2xl border border-[#E4EAE7] bg-white p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                <SecurityIcon icon={item.icon} />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-[#090D0B]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[#52606A]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-[#52606A]">
          Security details are provided during evaluation.
        </p>
      </motion.div>
    </section>
  );
}
