"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

interface ResourceCardData {
  id: string;
  tag: string;
  title: string;
  gradient: string;
  accentColor: string;
  /** Desktop fanned state at scrollYProgress = 0 */
  initialRotate: number;
  initialY: number;
  initialX: number;
  /** Mobile reduced fan rotation */
  mobileRotate: number;
  zIndex: number;
}

const RESOURCE_CARDS: ResourceCardData[] = [
  {
    id: "card-1",
    tag: "Ebooks",
    title: "The Lifecycle Playbook for High-Retention SaaS",
    gradient: "from-[#022c22] via-[#065f46] to-[#10b981]",
    accentColor: "bg-emerald-300/30",
    initialRotate: -12,
    initialY: 108,
    initialX: 96,
    mobileRotate: -3,
    zIndex: 1,
  },
  {
    id: "card-2",
    tag: "Webinar Series",
    title: "Real-Time Event Streams at Enterprise Scale",
    gradient: "from-[#031912] via-[#047857] to-[#34d399]",
    accentColor: "bg-teal-300/30",
    initialRotate: -6,
    initialY: 60,
    initialX: 44,
    mobileRotate: -1.5,
    zIndex: 2,
  },
  {
    id: "card-3",
    tag: "Interactive Tool",
    title: "Customer Journey & Revenue Impact Calculator",
    gradient: "from-[#064e3b] via-[#10b981] to-[#6ee7b7]",
    accentColor: "bg-emerald-200/30",
    initialRotate: 0,
    initialY: 28,
    initialX: 0,
    mobileRotate: 0,
    zIndex: 5,
  },
  {
    id: "card-4",
    tag: "Playbook",
    title: "Predictive Churn Scoring Without Data Silos",
    gradient: "from-[#070a09] via-[#065f46] to-[#2dd4bf]",
    accentColor: "bg-emerald-400/25",
    initialRotate: 6,
    initialY: 60,
    initialX: -44,
    mobileRotate: 1.5,
    zIndex: 2,
  },
  {
    id: "card-5",
    tag: "Research",
    title: "2026 State of Autonomous Customer Engagement",
    gradient: "from-[#052e16] via-[#15803d] to-[#4ade80]",
    accentColor: "bg-green-300/30",
    initialRotate: 12,
    initialY: 108,
    initialX: -96,
    mobileRotate: 3,
    zIndex: 1,
  },
];

function CardThumbnail({
  gradient,
  accentColor,
}: {
  gradient: string;
  accentColor: string;
}) {
  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-[12px] bg-gradient-to-br ${gradient}`}
    >
      {/* Abstract placeholder visual elements */}
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-xl ${accentColor}`}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-8 rounded-full bg-white/25" />
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="space-y-1.5">
            <div className="h-2 w-16 rounded-full bg-white/40" />
            <div className="h-2 w-24 rounded-full bg-white/25" />
          </div>
          <div className="flex items-end gap-1">
            <span className="h-4 w-2 rounded-sm bg-white/35" />
            <span className="h-7 w-2 rounded-sm bg-white/50" />
            <span className="h-5 w-2 rounded-sm bg-white/40" />
            <span className="h-9 w-2 rounded-sm bg-white/65" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBody({ card }: { card: ResourceCardData }) {
  return (
    <div className="group flex h-full flex-col rounded-[24px] border border-zinc-200/80 bg-white p-5 shadow-[0_20px_40px_rgba(9,13,11,0.14)] transition-transform duration-300 ease-out hover:-translate-y-2 hover:border-emerald-400/60">
      <CardThumbnail gradient={card.gradient} accentColor={card.accentColor} />
      <div className="mt-4 flex flex-col items-start gap-2.5">
        <span className="type-label inline-flex items-center rounded-full bg-[#090d0b] px-3 py-1 text-emerald-400">
          {card.tag}
        </span>
        <h3 className="font-display text-[1.0625rem] font-bold leading-[1.3] tracking-[-0.015em] text-[#090d0b]">
          {card.title}
        </h3>
      </div>
    </div>
  );
}

function ScrubbedDesktopCard({
  card,
  scrollYProgress,
  reducedMotion,
  className = "",
}: {
  card: ResourceCardData;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
  className?: string;
}) {
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.6],
    [card.initialRotate, 0]
  );
  const y = useTransform(scrollYProgress, [0, 0.6], [card.initialY, 0]);
  const x = useTransform(scrollYProgress, [0, 0.6], [card.initialX, 0]);

  return (
    <motion.article
      style={
        reducedMotion
          ? { zIndex: card.zIndex }
          : {
            rotate,
            y,
            x,
            zIndex: card.zIndex,
            willChange: "transform",
          }
      }
      className={`min-w-0 flex-1 ${className}`}
    >
      <CardBody card={card} />
    </motion.article>
  );
}

export default function ScrollHeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={wrapperRef}
      aria-label="Hero and featured resources"
      className="relative w-full md:h-[200vh]"
      style={{
        background:
          "linear-gradient(180deg, #064e3b 0%, #10b981 46%, #d1fae5 82%, #ffffff 100%)",
      }}
    >
      {/* Sticky viewport container: pins hero & cards during scroll, then releases */}
        <div className="flex flex-col justify-start overflow-x-clip md:sticky md:top-[var(--header-h,116px)] md:min-h-[calc(100vh-var(--header-h,116px))]">
          {/* Hero Copy */}
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-10 text-center sm:pt-14 md:pt-8 lg:pt-10">
            <h1 className="type-hero max-w-3xl text-white">
              Intelligence in every interaction
            </h1>
            <p className="type-body mt-4 max-w-2xl text-emerald-50/95">
              Unify live behavioral signals, predictive modeling, and automated
              orchestration to deliver relevant experiences across every channel.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
              <a
                href="#demo"
                className="type-button inline-flex items-center justify-center rounded-full bg-[#090d0b] px-7 py-3.5 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-zinc-800"
              >
                Get a Demo
              </a>
              <a
                href="#platform"
                className="type-button inline-flex items-center gap-1.5 px-2 py-2 text-white/95 transition-colors hover:text-white"
              >
                Explore Rytail AI <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Desktop & Tablet Scroll-Scrubbed Card Row */}
          <div className="mx-auto mt-8 hidden w-full max-w-[1380px] px-6 pb-8 md:block lg:mt-10 lg:px-10 lg:pb-10">
            <div className="flex items-stretch justify-center gap-[30px]">
              {RESOURCE_CARDS.map((card, index) => {
                // Tablet (md): 3 cards visible (indices 1, 2, 3); Desktop (lg): all 5 cards
                const tabletVisibility =
                  index === 0 || index === 4 ? "hidden lg:block" : "block";

                return (
                  <ScrubbedDesktopCard
                    key={card.id}
                    card={card}
                    scrollYProgress={scrollYProgress}
                    reducedMotion={shouldReduceMotion}
                    className={tabletVisibility}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile Horizontal Scroll-Snap Carousel with Reduced Fan Effect */}
          <div className="mt-12 w-full pb-12 md:hidden">
            <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {RESOURCE_CARDS.map((card) => (
                <div
                  key={card.id}
                  style={{
                    transform: shouldReduceMotion
                      ? "none"
                      : `rotate(${card.mobileRotate}deg)`,
                  }}
                  className="w-[78vw] max-w-[300px] shrink-0 snap-center"
                >
                  <CardBody card={card} />
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
