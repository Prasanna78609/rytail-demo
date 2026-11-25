export interface NavSubLink {
  label: string;
  description: string;
  href: string;
}

export interface NavColumn {
  heading: string;
  links: NavSubLink[];
}

export interface NavDropdownItem {
  id: string;
  label: string;
  columns: NavColumn[];
}

export interface NavPlainLink {
  id: string;
  label: string;
  href: string;
}

export const NAV_DROPDOWNS: NavDropdownItem[] = [
  {
    id: "platform",
    label: "Platform",
    columns: [
      {
        heading: "Core Engine",
        links: [
          {
            label: "Unified Event Stream",
            description: "Capture and normalize live product signals in milliseconds.",
            href: "#platform-flow",
          },
          {
            label: "Audience Graph",
            description: "Resolve identities across web, mobile, and warehouse tables.",
            href: "#platform",
          },
          {
            label: "Predictive Modeling",
            description: "Score conversion and renewal likelihood without SQL.",
            href: "#platform-flow",
          },
        ],
      },
      {
        heading: "Governance",
        links: [
          {
            label: "Privacy & Consent",
            description: "Enforce regional data controls at every ingestion point.",
            href: "#platform",
          },
          {
            label: "Role Permissions",
            description: "Granular workspace access and approval workflows.",
            href: "#platform",
          },
        ],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    columns: [
      {
        heading: "By Industry",
        links: [
          {
            label: "Retail & E-Commerce",
            description: "Recover carts and lift repeat purchase velocity.",
            href: "#industry-panel-retail",
          },
          {
            label: "Subscriptions",
            description: "Convert trials and reduce involuntary churn.",
            href: "#industry-panel-subscriptions",
          },
          {
            label: "Financial Services",
            description: "Deliver compliant, real-time account alerts.",
            href: "#industry-panel-finance",
          },
          {
            label: "Gaming",
            description: "Orchestrate live-ops milestones and player rewards.",
            href: "#industry-panel-gaming",
          },
        ],
      },
      {
        heading: "By Team",
        links: [
          {
            label: "Growth & Lifecycle",
            description: "Ship multi-step journeys without engineering queues.",
            href: "#platform-flow",
          },
          {
            label: "Product & Data",
            description: "Turn warehouse models into live customer actions.",
            href: "#platform-flow",
          },
        ],
      },
    ],
  },
  {
    id: "products",
    label: "Products",
    columns: [
      {
        heading: "Capabilities",
        links: [
          {
            label: "Data & Analytics",
            description: "Explore funnels, cohorts, and live retention telemetry.",
            href: "#platform-flow",
          },
          {
            label: "Experimentation",
            description: "Run controlled A/B and multivariate tests everywhere.",
            href: "#platform-flow",
          },
          {
            label: "Personalization",
            description: "Tailor messages and surfaces to each user context.",
            href: "#platform-flow",
          },
          {
            label: "Workflow Orchestration",
            description: "Coordinate push, email, and in-app triggers seamlessly.",
            href: "#platform-flow",
          },
        ],
      },
      {
        heading: "Intelligence",
        links: [
          {
            label: "Rytail AI Studio",
            description: "Generate segments, copy variants, and send-time rules.",
            href: "#platform",
          },
          {
            label: "Anomaly Watch",
            description: "Automated alerts when conversion metrics shift.",
            href: "#platform",
          },
        ],
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    columns: [
      {
        heading: "Data Warehouses",
        links: [
          {
            label: "Snowflake & BigQuery",
            description: "Zero-copy audience syncs with bidirectional updates.",
            href: "#platform",
          },
          {
            label: "Databricks & Redshift",
            description: "Activate ML features directly in live campaigns.",
            href: "#platform",
          },
        ],
      },
      {
        heading: "Messaging & SDKs",
        links: [
          {
            label: "Web, iOS & Android",
            description: "Lightweight SDKs with offline event queuing.",
            href: "#platform",
          },
          {
            label: "Webhooks & REST API",
            description: "Connect internal microservices and CRM tools.",
            href: "#platform",
          },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    columns: [
      {
        heading: "Learn",
        links: [
          {
            label: "Documentation",
            description: "Quickstart guides, SDK references, and API specs.",
            href: "#platform",
          },
          {
            label: "Customer Stories",
            description: "See how teams scale retention and revenue.",
            href: "#case-studies-heading",
          },
          {
            label: "Playbooks & Ebooks",
            description: "Practical frameworks for modern lifecycle teams.",
            href: "#platform",
          },
        ],
      },
      {
        heading: "Events",
        links: [
          {
            label: "On-Demand Webinars",
            description: "Deep dives with data and growth leaders.",
            href: "#platform",
          },
          {
            label: "ROI Calculator",
            description: "Estimate lift from unified orchestration.",
            href: "#platform",
          },
        ],
      },
    ],
  },
  {
    id: "company",
    label: "Company",
    columns: [
      {
        heading: "About Rytail",
        links: [
          {
            label: "Our Mission",
            description: "Making real-time customer intelligence accessible.",
            href: "#platform",
          },
          {
            label: "Security & Trust",
            description: "SOC 2 Type II, ISO 27001, and GDPR compliance.",
            href: "#platform",
          },
          {
            label: "Careers",
            description: "Join our distributed engineering and product teams.",
            href: "#platform",
          },
        ],
      },
      {
        heading: "Connect",
        links: [
          {
            label: "Partner Ecosystem",
            description: "Technology and implementation partners worldwide.",
            href: "#platform",
          },
          {
            label: "Contact Us",
            description: "Speak with a solutions architect about your stack.",
            href: "#demo",
          },
        ],
      },
    ],
  },
];

export const NAV_PLAIN_LINKS: NavPlainLink[] = [
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "customers", label: "Customers", href: "#case-studies-heading" },
];
