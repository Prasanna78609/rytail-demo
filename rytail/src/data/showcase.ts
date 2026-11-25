export interface ShowcaseCard {
  id: string;
  image: string | null;
  gradient: string;
  alt: string;
  caption: string;
  pills: [string, string, string];
  activePill: string;
  statusText: string;
}

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: "sync-tools",
    image: "/images/showcase/showcase-1.jpg",
    gradient: "from-[#064e3b] via-[#047857] to-[#0f172a]",
    alt: "Team collaborating around a laptop in a modern workspace",
    caption: "Connect your tools once. Everything stays in sync.",
    pills: ["Workflows", "Reports", "Assistant"],
    activePill: "Workflows",
    statusText: "Workflow synced in Rytail",
  },
  {
    id: "live-insights",
    image: "/images/showcase/showcase-2.jpg",
    gradient: "from-[#0f172a] via-[#115e59] to-[#10b981]",
    alt: "Professionals reviewing real-time analytics on a laptop",
    caption: "Spot shifts early before they impact revenue.",
    pills: ["Forecasts", "Cohorts", "Alerts"],
    activePill: "Forecasts",
    statusText: "Forecast updated in Rytail",
  },
  {
    id: "guided-automation",
    image: "/images/showcase/showcase-3.jpg",
    gradient: "from-[#052e16] via-[#065f46] to-[#1e293b]",
    alt: "Software engineer working on automated routing rules on a laptop",
    caption: "Automate routine handoffs with human oversight.",
    pills: ["Triggers", "Approvals", "Routing"],
    activePill: "Approvals",
    statusText: "Approval routed in Rytail",
  },
  {
    id: "unified-delivery",
    image: "/images/showcase/showcase-4.jpg",
    gradient: "from-[#1e293b] via-[#0f766e] to-[#064e3b]",
    alt: "Cross-functional team planning customer campaigns with laptops",
    caption: "Deliver the right message on every surface.",
    pills: ["Channels", "Templates", "Schedule"],
    activePill: "Channels",
    statusText: "Campaign launched in Rytail",
  },
];
