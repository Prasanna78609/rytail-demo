"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { ShowcaseCard } from "@/data/showcase";
import { CardMockup } from "./CardMockup";

interface ExpandingCardProps {
  card: ShowcaseCard;
  isExpanded: boolean;
  onActivate: () => void;
  onToggle: () => void;
  reducedMotion: boolean;
  isMobileLayout?: boolean;
}

export function ExpandingCard({
  card,
  isExpanded,
  onActivate,
  onToggle,
  reducedMotion,
  isMobileLayout = false,
}: ExpandingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spotX = useMotionValue(160);
  const spotY = useMotionValue(160);

  const imgX = useSpring(rawX, { stiffness: 180, damping: 24 });
  const imgY = useSpring(rawY, { stiffness: 180, damping: 24 });
  const spotlightBg = useMotionTemplate`radial-gradient(240px circle at ${spotX}px ${spotY}px, rgba(255,255,255,0.12), transparent 80%)`;

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || isMobileLayout) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      const normX = (relX / rect.width - 0.5) * 2; // -1 to 1
      const normY = (relY / rect.height - 0.5) * 2;
      rawX.set(-normX * 12);
      rawY.set(-normY * 12);
      spotX.set(relX);
      spotY.set(relY);
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  };

  const showExpanded = isMobileLayout ? true : isExpanded;

  return (
    <motion.div
      ref={cardRef}
      role="group"
      tabIndex={0}
      aria-label={card.caption}
      onMouseEnter={() => {
        if (!isMobileLayout) {
          setIsHovered(true);
          onActivate();
        }
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={() => {
        if (!isMobileLayout) onActivate();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      animate={
        isMobileLayout
          ? undefined
          : { flexGrow: isExpanded ? 3 : 1 }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 220, damping: 28 }
      }
      className={`relative overflow-hidden rounded-[24px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 ${
        isMobileLayout
          ? "aspect-[4/5] w-[80vw] max-w-[360px] shrink-0 snap-center"
          : "h-[520px] min-w-[140px] flex-1 cursor-pointer"
      }`}
    >
      {/* Full-bleed Image or Gradient Placeholder with Parallax */}
      <motion.div
        style={
          reducedMotion || isMobileLayout
            ? undefined
            : { x: imgX, y: imgY, willChange: "transform" }
        }
        animate={
          reducedMotion || isMobileLayout
            ? undefined
            : { scale: isHovered ? 1.08 : 1 }
        }
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0"
      >
        {card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt={card.alt}
            width={960}
            height={1200}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={card.alt}
            className={`h-full w-full bg-gradient-to-br ${card.gradient}`}
          />
        )}
      </motion.div>

      {/* Cursor-follow Spotlight */}
      {!reducedMotion && !isMobileLayout && isHovered && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlightBg }}
          className="pointer-events-none absolute inset-0 z-10"
        />
      )}

      {/* Bottom Gradient Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
      />

      {/* Overlaid UI Mockup Panel (Top-Left) */}
      <div className="relative z-20 p-5">
        <CardMockup
          pills={card.pills}
          activePill={card.activePill}
          statusText={card.statusText}
          isExpanded={showExpanded}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Bottom Serif Caption */}
      <motion.div
        initial={false}
        animate={
          reducedMotion || isMobileLayout
            ? { opacity: 1, y: 0 }
            : showExpanded
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 12 }
        }
        transition={
          reducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }
        }
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-6"
      >
        <p className="font-serif text-[22px] leading-[1.2] text-white sm:text-[26px] lg:text-[28px]">
          {card.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}
