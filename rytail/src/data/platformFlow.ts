export interface FlowStage {
  id: string;
  step: number;
  title: string;
  description: string;
}

export type FlowModuleIllustrationKey =
  | "analytics"
  | "experimentation"
  | "personalization"
  | "orchestration";

export interface FlowModule {
  id: string;
  title: string;
  illustration: FlowModuleIllustrationKey;
}

export interface FlowAvatar {
  initials: string;
  gradient: string;
}

export const FLOW_STAGES: FlowStage[] = [
  {
    id: "understand",
    step: 1,
    title: "Understand",
    description: "Turn raw data into clear insight",
  },
  {
    id: "optimize",
    step: 2,
    title: "Optimize",
    description: "Test and refine every workflow",
  },
  {
    id: "act",
    step: 3,
    title: "Act",
    description: "Automate intelligent operations",
  },
];

export const FLOW_MODULES: FlowModule[] = [
  {
    id: "data-analytics",
    title: "Data & Analytics",
    illustration: "analytics",
  },
  {
    id: "experimentation",
    title: "Experimentation",
    illustration: "experimentation",
  },
  {
    id: "personalization",
    title: "Personalization",
    illustration: "personalization",
  },
  {
    id: "workflow-orchestration",
    title: "Workflow Orchestration",
    illustration: "orchestration",
  },
];

export const FLOW_BOTTOM_AVATARS: FlowAvatar[] = [
  { initials: "AK", gradient: "from-emerald-400 to-emerald-700" },
  { initials: "MR", gradient: "from-teal-400 to-emerald-800" },
  { initials: "SL", gradient: "from-green-400 to-teal-700" },
  { initials: "JD", gradient: "from-lime-400 to-emerald-700" },
];

export const FLOW_PERSONALIZATION_AVATARS: FlowAvatar[] = [
  { initials: "EL", gradient: "from-emerald-700 to-emerald-950" },
  { initials: "KT", gradient: "from-teal-600 to-emerald-900" },
  { initials: "NR", gradient: "from-emerald-400 to-emerald-700" },
  { initials: "VS", gradient: "from-green-400 to-teal-700" },
  { initials: "AM", gradient: "from-teal-500 to-emerald-800" },
  { initials: "ZP", gradient: "from-emerald-800 to-zinc-900" },
];
