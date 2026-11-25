"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { SHOWCASE_CARDS } from "@/data/showcase";
import { ExpandingCard } from "./ExpandingCard";

export default function ShowcaseSection() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState<string>(SHOWCASE_CARDS[0].id);

  return (
    <section
      aria-labelledby="showcase-heading"
      className="w-full bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <h2
          id="showcase-heading"
          className="type-section mx-auto max-w-3xl text-center text-[#090d0b]"
        >
          Work Where You Want. The Platform Takes It From There.
        </h2>

        {/* Desktop (>=1024px): Expanding Flex Row */}
        <div className="mt-12 hidden h-[520px] gap-4 lg:flex">
          {SHOWCASE_CARDS.map((card) => (
            <ExpandingCard
              key={card.id}
              card={card}
              isExpanded={activeId === card.id}
              onActivate={() => setActiveId(card.id)}
              onToggle={() =>
                setActiveId((prev) =>
                  prev === card.id ? SHOWCASE_CARDS[0].id : card.id
                )
              }
              reducedMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>

      {/* Mobile & Tablet (<1024px): Horizontal Scroll-Snap Carousel */}
      <div className="mt-10 w-full lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SHOWCASE_CARDS.map((card) => (
            <ExpandingCard
              key={card.id}
              card={card}
              isExpanded={true}
              onActivate={() => setActiveId(card.id)}
              onToggle={() => setActiveId(card.id)}
              reducedMotion={shouldReduceMotion}
              isMobileLayout={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
