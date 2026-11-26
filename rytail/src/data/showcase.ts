export type ShowcaseMockupType =
  | "assistant"
  | "connector"
  | "report"
  | "workflow";

export interface AssistantMockupData {
  prompt: string;
  resultTitle: string;
  targetCount: number;
  countSuffix: string;
  placeholder: string;
}

export interface ConnectorMockupData {
  pills: [string, string, string];
}

export interface ReportMockupData {
  title: string;
  badge: string;
  bars: number[];
  stats: [
    { label: string; prefix: string; value: number; suffix: string },
    { label: string; prefix: string; value: number; suffix: string }
  ];
}

export interface WorkflowMockupData {
  steps: [string, string, string];
  toast: string;
}

export interface ShowcaseCard {
  id: string;
  image: string | null;
  gradient: string;
  alt: string;
  caption: string;
  mockupType: ShowcaseMockupType;
  assistantData?: AssistantMockupData;
  connectorData?: ConnectorMockupData;
  reportData?: ReportMockupData;
  workflowData?: WorkflowMockupData;
}

export const SHOWCASE_CARDS: ShowcaseCard[] = [
  {
    id: "ai-assistant",
    image: "/images/showcase/showcase-1.jpg",
    gradient: "from-[#064e3b] via-[#047857] to-[#0f172a]",
    alt: "Team collaborating around a laptop in a modern workspace",
    caption: "Ask a question. Turn intent into action.",
    mockupType: "assistant",
    assistantData: {
      prompt: "Build a campaign to win back customers",
      resultTitle: "Customers gone quiet",
      targetCount: 312,
      countSuffix: "accounts",
      placeholder: "Ask the assistant anything ...",
    },
  },
  {
    id: "connected-tools",
    image: "/images/showcase/showcase-2.jpg",
    gradient: "from-[#0f172a] via-[#115e59] to-[#10b981]",
    alt: "Professionals reviewing real-time analytics on a laptop",
    caption: "Connect your tools once. Everything stays in sync.",
    mockupType: "connector",
    connectorData: {
      pills: ["Workflows", "Reports", "Assistant"],
    },
  },
  {
    id: "live-report",
    image: "/images/showcase/showcase-3.jpg",
    gradient: "from-[#052e16] via-[#065f46] to-[#1e293b]",
    alt: "Software engineer reviewing performance telemetry on a laptop",
    caption: "Spot shifts early before they impact revenue.",
    mockupType: "report",
    reportData: {
      title: "Weekly performance",
      badge: "Live",
      bars: [42, 58, 48, 72, 66, 92],
      stats: [
        { label: "Retention", prefix: "+", value: 12, suffix: "%" },
        { label: "Response time", prefix: "-", value: 38, suffix: "%" },
      ],
    },
  },
  {
    id: "workflow-automation",
    image: "/images/showcase/showcase-4.jpg",
    gradient: "from-[#1e293b] via-[#0f766e] to-[#064e3b]",
    alt: "Cross-functional team planning automated customer workflows",
    caption: "Automate routine handoffs with human oversight.",
    mockupType: "workflow",
    workflowData: {
      steps: [
        "Event received",
        "Check customer segment",
        "Send personalized message",
      ],
      toast: "Workflow completed",
    },
  },
];
