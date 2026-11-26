export interface TrustLogo {
  id: string;
  monogram: string;
  name: string;
  accent: string;
}

export interface OverviewFeature {
  id: string;
  icon: "database" | "zap" | "send";
  title: string;
  description: string;
}

export interface MetricItem {
  id: string;
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
}

export interface SecurityItem {
  id: string;
  icon: "key" | "users" | "lock" | "fileText" | "sliders" | "shieldCheck";
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// TODO: Replace with real, authorized customer logos.
export const TRUST_LOGOS: TrustLogo[] = [
  { id: "northvale", monogram: "TS", name: "KRR", accent: "#059669" },
  { id: "cadence", monogram: "FDC", name: "FDC", accent: "#0D9488" },
  { id: "alpen", monogram: "WB", name: "WBB", accent: "#047857" },
  { id: "kestrel", monogram: "RH", name: "Red Hill", accent: "#10B981" },
  { id: "veridian", monogram: "A", name: "Apexus", accent: "#065F46" },
  { id: "harbor", monogram: "O", name: "Optimus", accent: "#15803D" },
];

export const OVERVIEW_FEATURES: OverviewFeature[] = [
  {
    id: "unify-data",
    icon: "database",
    title: "Unify live data",
    description:
      "Stream product events, warehouse traits, and transaction signals into a single real-time profile.",
  },
  {
    id: "decide-realtime",
    icon: "zap",
    title: "Decide in real time",
    description:
      "Evaluate behavioral triggers and predictive scores in milliseconds before a customer drops off.",
  },
  {
    id: "engage-everywhere",
    icon: "send",
    title: "Engage on every channel",
    description:
      "Orchestrate consistent messages across web, mobile, email, and webhooks from one canvas.",
  },
];

export const IMPACT_METRICS: MetricItem[] = [
  {
    id: "campaign-launch",
    value: 3,
    suffix: "x",
    label: "faster campaign launch",
  },
  {
    id: "retention-lift",
    value: 42,
    suffix: "%",
    label: "lift in retention",
  },
  {
    id: "manual-reporting",
    value: 60,
    suffix: "%",
    label: "less manual reporting",
  },
  {
    id: "event-latency",
    prefix: "<",
    value: 100,
    suffix: "ms",
    label: "event-to-action latency",
  },
];

export const SECURITY_ITEMS: SecurityItem[] = [
  {
    id: "authentication",
    icon: "key",
    title: "Authentication",
    description: "SSO and session controls to protect workspace sign-ins.",
  },
  {
    id: "rbac",
    icon: "users",
    title: "Role-based access",
    description: "Scoped permissions aligned to team responsibilities.",
  },
  {
    id: "encryption",
    icon: "lock",
    title: "Encryption in transit and at rest",
    description: "Transport and storage encryption across data pipelines.",
  },
  {
    id: "audit-logging",
    icon: "fileText",
    title: "Audit logging",
    description: "Traceable records of configuration and workflow changes.",
  },
  {
    id: "permission-management",
    icon: "sliders",
    title: "Permission management",
    description: "Approval gates before publishing live customer journeys.",
  },
  {
    id: "integration-governance",
    icon: "shieldCheck",
    title: "Integration governance",
    description: "Controlled credentials and scoped tokens for connected tools.",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-is-platform",
    question: "What is the platform?",
    answer:
      "Rytail is an autonomous customer engagement platform that unifies live behavioral events, predictive decisioning, and cross-channel workflow orchestration in one workspace.",
  },
  {
    id: "how-does-it-work",
    question: "How does it work?",
    answer:
      "It ingests streaming events from your apps and data warehouse, evaluates rules and propensity signals in real time, and triggers personalized actions across your messaging channels.",
  },
  {
    id: "integrate-tools",
    question: "Can we integrate existing tools?",
    answer:
      "Yes. You can connect cloud data warehouses, CRM systems, analytics pipelines, and messaging providers through native connectors, REST APIs, and webhooks.",
  },
  {
    id: "is-customizable",
    question: "Is it customizable?",
    answer:
      "Every data schema, audience segment, approval workflow, and channel template can be tailored to match your industry and internal operating model.",
  },
  {
    id: "how-secure",
    question: "How secure is our data?",
    answer:
      "Workspaces use encryption in transit and at rest, role-based access controls, and detailed audit logs. Full security documentation is shared during evaluation.",
  },
  {
    id: "can-scale",
    question: "Can it scale with us?",
    answer:
      "Yes. The event engine is designed for high-volume enterprise workloads so teams can start with core journeys and expand across regions and brands.",
  },
  {
    id: "get-started",
    question: "How do we get started?",
    answer:
      "Start with a guided architecture review where our team maps your key events, priority workflows, and integration endpoints for a fast pilot.",
  },
  {
    id: "request-demo",
    question: "How do I request a demo?",
    answer:
      "Click Request a Demo or Schedule a Demo anywhere on this page to book a tailored walkthrough with a solutions specialist.",
  },
];
