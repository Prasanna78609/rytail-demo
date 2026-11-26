"use client";

import { Bell, Mail, MessageCircle, Smartphone } from "lucide-react";
import { motion, useTransform, type MotionValue } from "motion/react";
import {
  FLOW_PERSONALIZATION_AVATARS,
  type FlowModuleIllustrationKey,
} from "@/data/platformFlow";

interface IllustrationProps {
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

export function AnalyticsIllustration({
  progress,
  reducedMotion,
}: IllustrationProps) {
  const layerY = useTransform(progress, [0.68, 0.88], [10, 0]);
  const opacity = useTransform(progress, [0.68, 0.84], [0.25, 1]);

  const tileInitials = ["A", "B", "C", "D", "E", "F"];

  return (
    <motion.div
      aria-hidden="true"
      style={reducedMotion ? undefined : { y: layerY, opacity }}
      className="flex flex-col items-center gap-1.5"
    >
      <div className="grid grid-cols-3 gap-1.5 rounded-xl border border-[var(--flow-border)] bg-[#0A100D] p-2.5">
        {tileInitials.map((ch, idx) => (
          <span
            key={ch}
            className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${idx % 2 === 0
              ? "bg-emerald-500/20 text-[var(--flow-green-bright)]"
              : "bg-emerald-950/80 text-emerald-300"
              }`}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="h-2 w-24 rounded-md border border-emerald-500/30 bg-emerald-500/20" />
      <div className="h-1.5 w-16 rounded-md border border-emerald-500/20 bg-emerald-500/10" />
    </motion.div>
  );
}

export function ExperimentationIllustration({
  progress,
  reducedMotion,
}: IllustrationProps) {
  const bubbleY1 = useTransform(progress, [0.72, 0.92], [8, -6]);
  const bubbleY2 = useTransform(progress, [0.74, 0.92], [10, -8]);

  return (
    <div
      aria-hidden="true"
      className="relative flex items-center justify-center gap-2.5"
    >
      <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-[var(--flow-green-bright)]">
        A
      </span>
      <div className="relative flex h-16 w-12 items-end justify-center">
        <svg viewBox="0 0 48 56" className="h-16 w-12" fill="none">
          <path
            d="M18 8h12M20 8v12L10 42a5 5 0 0 0 4.5 7h19a5 5 0 0 0 4.5-7L28 20V8"
            stroke="#4ADE80"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 37h20l3 6a3 3 0 0 1-2.7 4H13.7A3 3 0 0 1 11 43l3-6Z"
            fill="rgba(34, 197, 94, 0.35)"
          />
        </svg>
        <motion.span
          style={reducedMotion ? undefined : { y: bubbleY1 }}
          className="absolute left-4 top-6 h-1.5 w-1.5 rounded-full bg-[var(--flow-green-bright)]"
        />
        <motion.span
          style={reducedMotion ? undefined : { y: bubbleY2 }}
          className="absolute right-4 top-4 h-2 w-2 rounded-full bg-emerald-300"
        />
      </div>
      <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-[var(--flow-green-bright)]">
        B
      </span>
    </div>
  );
}

export function PersonalizationIllustration({
  progress,
  reducedMotion,
}: IllustrationProps) {
  const scale = useTransform(progress, [0.76, 0.92], [0.85, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={reducedMotion ? undefined : { scale }}
      className="flex items-center justify-center -space-x-1.5"
    >
      {FLOW_PERSONALIZATION_AVATARS.map((avatar, idx) => {
        const isMiddle = idx === 2;
        return (
          <span
            key={avatar.initials}
            className={`flex items-center justify-center rounded-full border-2 border-[var(--flow-card)] bg-gradient-to-br ${
              avatar.gradient
            } font-bold text-white shadow-sm ${
              isMiddle ? "z-10 h-11 w-11 text-xs" : "h-8 w-8 text-[0px]"
            }`}
          >
            {isMiddle ? avatar.initials : ""}
          </span>
        );
      })}
    </motion.div>
  );
}

export function OrchestrationIllustration({
  progress,
  reducedMotion,
}: IllustrationProps) {
  const opacity = useTransform(progress, [0.8, 0.92], [0.25, 1]);

  const channels = [
    { key: "bell", Icon: Bell },
    { key: "msg", Icon: MessageCircle },
    { key: "mail", Icon: Mail },
    { key: "phone", Icon: Smartphone },
  ];

  return (
    <motion.div
      aria-hidden="true"
      style={reducedMotion ? undefined : { opacity }}
      className="flex flex-col items-center"
    >
      <div className="h-3.5 w-3.5 rounded-full border-2 border-[var(--flow-green-bright)] bg-emerald-500/30" />
      <div className="h-3 w-px border-l border-dashed border-emerald-500/60" />
      <div className="h-px w-32 border-t border-dashed border-emerald-500/60" />

      <div className="mt-1.5 grid grid-cols-4 gap-1.5">
        {channels.map(({ key, Icon }) => (
          <span
            key={key}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--flow-border)] bg-[#0A100D] text-[var(--flow-green-bright)]"
          >
            <Icon className="h-3.5 w-3.5" />
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function FlowModuleIllustration({
  kind,
  progress,
  reducedMotion,
}: {
  kind: FlowModuleIllustrationKey;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  switch (kind) {
    case "analytics":
      return (
        <AnalyticsIllustration
          progress={progress}
          reducedMotion={reducedMotion}
        />
      );
    case "experimentation":
      return (
        <ExperimentationIllustration
          progress={progress}
          reducedMotion={reducedMotion}
        />
      );
    case "personalization":
      return (
        <PersonalizationIllustration
          progress={progress}
          reducedMotion={reducedMotion}
        />
      );
    case "orchestration":
      return (
        <OrchestrationIllustration
          progress={progress}
          reducedMotion={reducedMotion}
        />
      );
  }
}
