export type IndustryId = "retail" | "subscriptions" | "finance" | "gaming";

export interface IndustryCustomerPlaceholder {
  monogram: string;
  companyName: string;
}

export interface Industry {
  id: IndustryId;
  title: string;
  description: string;
  capabilities: [string, string, string];
  stat: string;
  statLabel: string;
  customerPlaceholder: IndustryCustomerPlaceholder;
}

export const INDUSTRIES: Industry[] = [
  {
    id: "retail",
    title: "Retail & E-Commerce",
    description:
      "Turn browsing signals into timely product recommendations and higher cart conversion across web and mobile storefronts.",
    capabilities: [
      "Real-time cart abandonment recovery across channels",
      "Dynamic SKU affinity & bundle recommendations",
      "Unified online and in-store purchase profiles",
    ],
    stat: "5x",
    statLabel: "higher repeat purchase velocity across seasonal campaigns",
    customerPlaceholder: {
      monogram: "NV",
      companyName: "Northvale Goods",
    },
  },
  {
    id: "subscriptions",
    title: "Subscriptions",
    description:
      "Predict renewal risk early and guide subscribers toward higher-value tiers with usage-triggered lifecycle flows.",
    capabilities: [
      "Automated trial-to-paid onboarding nudges",
      "Churn-propensity scoring before billing cycles",
      "Targeted upgrade prompts based on feature adoption",
    ],
    stat: "34%",
    statLabel: "lift in annual plan upgrades within 90 days",
    customerPlaceholder: {
      monogram: "CR",
      companyName: "Cadence Media",
    },
  },
  {
    id: "finance",
    title: "Financial Services",
    description:
      "Deliver compliant, high-trust account alerts and contextual product guidance from live transaction telemetry.",
    capabilities: [
      "Instant spend anomaly and balance notifications",
      "Automated KYC drop-off completion journeys",
      "Audit-ready consent and preference enforcement",
    ],
    stat: "2.8x",
    statLabel: "faster digital onboarding completion rate",
    customerPlaceholder: {
      monogram: "AL",
      companyName: "Alpen Financial",
    },
  },
  {
    id: "gaming",
    title: "Gaming",
    description:
      "Keep players engaged through milestone celebrations, balanced reward pacing, and personalized live-ops events.",
    capabilities: [
      "Session-aware difficulty & progression prompts",
      "Timed in-game reward drops for returning players",
      "Cohort-level live-ops experimentation at scale",
    ],
    stat: "41%",
    statLabel: "increase in 30-day active player retention",
    customerPlaceholder: {
      monogram: "KR",
      companyName: "Kestrel Interactive",
    },
  },
];
