export type OutcomeImageSource = "unsplash" | "pexels" | "pixabay";

export interface OutcomeMetric {
  value: string;
  label: string;
}

export interface OutcomeTab {
  id: string;
  step: string;
  title: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  alt: string;
  blurDataURL: string;
  fallbackGradient: string;
  metric: OutcomeMetric;
  source: OutcomeImageSource;
  photographer: string;
  sourceUrl: string;
  license: string;
}

const EMERALD_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMDY0ZTNiIi8+PC9zdmc+";

export const OUTCOME_TABS: OutcomeTab[] = [
  {
    id: "operations-delivery",
    step: "01",
    title: "Operations Delivery",
    headline: "Ship every campaign without bottlenecks",
    description:
      "Manual handoffs slow launches down. Automate audience routing and approvals so operations teams deliver multi-channel workflows in minutes.",
    ctaLabel: "Request a Demo",
    ctaHref: "#demo",
    image: "/images/outcomes/outcome-1.webp",
    alt: "Modern city skyline rising above soft daylight clouds representing scalable operations delivery",
    blurDataURL: EMERALD_BLUR_DATA_URL,
    fallbackGradient: "from-[#064e3b] via-[#047857] to-[#0f172a]",
    metric: {
      value: "42%",
      label: "Faster workflow delivery",
    },
    source: "unsplash",
    photographer: "Pending verification — pre-existing local asset",
    sourceUrl: "Pending verification — verify original source URL before launch",
    license: "Pending verification — verify commercial license before launch",
  },
  {
    id: "teams-performance",
    step: "02",
    title: "Teams and Performance",
    headline: "Keep product and growth aligned",
    description:
      "Disconnected tools hide what works. Share live cohort metrics, experiment results, and workflow health in one workspace built for fast decisions.",
    ctaLabel: "Request a Demo",
    ctaHref: "#demo",
    image: "/images/outcomes/outcome-2.webp",
    alt: "Overhead view of colleagues collaborating around laptops, tablets, and notebooks on a wooden table",
    blurDataURL: EMERALD_BLUR_DATA_URL,
    fallbackGradient: "from-[#0f172a] via-[#065f46] to-[#10b981]",
    metric: {
      value: "28%",
      label: "Higher team productivity",
    },
    source: "unsplash",
    photographer: "Pending verification — pre-existing local asset",
    sourceUrl: "Pending verification — verify original source URL before launch",
    license: "Pending verification — verify commercial license before launch",
  },
  {
    id: "customer-experience",
    step: "03",
    title: "Customer Experience",
    headline: "Respond to live customer intent",
    description:
      "Delayed batch campaigns miss the moment. Trigger relevant, timely messages from real-time behavioral signals to deepen retention.",
    ctaLabel: "Request a Demo",
    ctaHref: "#demo",
    image: "/images/outcomes/outcome-3.webp",
    alt: "Bright modern workspace with desktop monitors, greenery, and soft natural daylight",
    blurDataURL: EMERALD_BLUR_DATA_URL,
    fallbackGradient: "from-[#052e16] via-[#0d9488] to-[#090d0b]",
    metric: {
      value: "35%",
      label: "Improved customer engagement",
    },
    source: "unsplash",
    photographer: "Pending verification — pre-existing local asset",
    sourceUrl: "Pending verification — verify original source URL before launch",
    license: "Pending verification — verify commercial license before launch",
  },
];
