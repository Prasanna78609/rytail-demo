export interface CaseStudyImage {
  alt: string;
  gradient: string;
  icon: "store" | "repeat" | "chart";
}

export interface CaseStudy {
  id: string;
  title: string;
  image: CaseStudyImage;
  accentBg: string;
  accentBorder: string;
  href: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "multi-store-retailer",
    title:
      "How a Multi-Store Retailer Improved Inventory Allocation with Demand Forecasting",
    image: {
      alt: "Abstract retail demand forecasting gradient illustration with storefront icon",
      gradient: "from-[#064e3b] via-[#059669] to-[#34d399]",
      icon: "store",
    },
    accentBg: "#E3F2EC",
    accentBorder: "#8CC4B0",
    href: "#case-study-retail",
  },
  {
    id: "subscription-brand-renewal",
    title:
      "How a Subscription Brand Increased Renewal Rates by 28% with Smart Segmentation",
    image: {
      alt: "Abstract subscription renewal analytics gradient illustration with cycle icon",
      gradient: "from-[#090d0b] via-[#065f46] to-[#10b981]",
      icon: "repeat",
    },
    accentBg: "#ECFDF5",
    accentBorder: "#6EE7B7",
    href: "#case-study-subscriptions",
  },
  {
    id: "fintech-automated-insights",
    title:
      "How a Fintech Team Cut Reporting Time by 60% with Automated Insights",
    image: {
      alt: "Abstract financial reporting gradient illustration with analytics chart icon",
      gradient: "from-[#042f2e] via-[#0d9488] to-[#5eead4]",
      icon: "chart",
    },
    accentBg: "#F3F4F6",
    accentBorder: "#9CA3AF",
    href: "#case-study-fintech",
  },
];
