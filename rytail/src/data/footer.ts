export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface OfficeCard {
  id: string;
  title: string;
  address: string;
}

export interface SocialLink {
  id: "linkedin" | "youtube" | "x" | "instagram";
  label: string;
  href: string;
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    id: "business-management",
    title: "Business Management",
    links: [
      { label: "Operations Dashboard", href: "#operations-dashboard" },
      { label: "Role and Access Control", href: "#role-access-control" },
      { label: "Reporting Center", href: "#reporting-center" },
      { label: "Multi-Unit Management", href: "#multi-unit-management" },
    ],
  },
  {
    id: "intelligent-automation",
    title: "Intelligent Automation",
    links: [
      { label: "Workflow Builder", href: "#workflow-builder" },
      { label: "Rules Engine", href: "#rules-engine" },
      { label: "Task Automation", href: "#task-automation" },
      { label: "Approval Flows", href: "#approval-flows" },
    ],
  },
  {
    id: "data-analytics",
    title: "Data and Analytics",
    links: [
      { label: "Demand Insights", href: "#demand-insights" },
      { label: "Performance Analytics", href: "#performance-analytics" },
      { label: "Custom Reports", href: "#custom-reports" },
      { label: "Data Pipelines", href: "#data-pipelines" },
    ],
  },
  {
    id: "ai-assistance",
    title: "AI-Powered Assistance",
    links: [
      { label: "Natural Language Queries", href: "#natural-language-queries" },
      { label: "Smart Recommendations", href: "#smart-recommendations" },
      { label: "Automated Summaries", href: "#automated-summaries" },
    ],
  },
  {
    id: "workflow-management",
    title: "Workflow Management",
    links: [
      { label: "Process Designer", href: "#process-designer" },
      { label: "Scheduling and Alerts", href: "#scheduling-alerts" },
      { label: "Audit Trail", href: "#audit-trail" },
    ],
  },
  {
    id: "integration-hub",
    title: "Integration Hub",
    links: [
      { label: "ERP Connectors", href: "#erp-connectors" },
      { label: "CRM Connectors", href: "#crm-connectors" },
      { label: "Payment and Messaging", href: "#payment-messaging" },
      { label: "API and Webhooks", href: "#api-webhooks" },
    ],
  },
];

export const QUICK_LINKS: FooterLink[] = [
  { label: "About Us", href: "#about-us" },
  { label: "Partners", href: "#partners" },
  { label: "Careers", href: "#careers" },
  { label: "FAQs", href: "#faqs" },
  { label: "Digital Security", href: "#digital-security" },
  { label: "Contact Us", href: "#contact-us" },
];

export const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy Policy", href: "#privacy-policy" },
  { label: "Cookie Policy", href: "#cookie-policy" },
  { label: "Terms and Conditions", href: "#terms-conditions" },
  { label: "Cancellation / Refund Policy", href: "#cancellation-refund" },
];

// TODO: Replace placeholder addresses with verified company locations.
export const OFFICE_CARDS: OfficeCard[] = [
  {
    id: "headquarters",
    title: "Headquarters",
    address: "Headquarters: Your Street Address, City, State, Postal Code",
  },
  {
    id: "branches",
    title: "Branches",
    address: "Branches: City One | City Two",
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "#linkedin" },
  { id: "youtube", label: "YouTube", href: "#youtube" },
  { id: "x", label: "X", href: "#x" },
  { id: "instagram", label: "Instagram", href: "#instagram" },
];
