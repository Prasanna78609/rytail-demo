"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FAQ_ITEMS } from "@/data/landing";

export default function FAQSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full bg-white py-16 md:py-24"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }
        }
        className="mx-auto max-w-[1200px] px-6"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="type-label inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-emerald-800">
            Frequently Asked Questions
          </span>
          <h2 id="faq-heading" className="type-section mt-4 text-[#090D0B]">
            Clear answers before you evaluate.
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-[#E4EAE7] rounded-2xl border border-[#E4EAE7] bg-white px-6">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="py-2">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left font-display text-base font-bold text-[#090D0B] transition-colors hover:text-[#059669] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669] sm:text-lg"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-[#52606A] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#059669]" : ""
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.22, ease: "easeInOut" }
                      }
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-sm leading-relaxed text-[#52606A] sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
