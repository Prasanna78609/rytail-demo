import dynamic from "next/dynamic";
import ScrollHeroSection from "@/components/ScrollHeroSection";
import PlatformOverview from "@/components/landing/PlatformOverview";
import TrustStrip from "@/components/landing/TrustStrip";
import OutcomesShowcase from "@/components/outcomes/OutcomesShowcase";

const PlatformFlowSection = dynamic(
  () => import("@/components/flow/PlatformFlowSection")
);
const ShowcaseSection = dynamic(
  () => import("@/components/showcase/ShowcaseSection")
);
const IndustryStackSection = dynamic(
  () => import("@/components/industries/IndustryStackSection")
);
const MetricsStrip = dynamic(
  () => import("@/components/landing/MetricsStrip")
);
const CaseStudiesSection = dynamic(
  () => import("@/components/case-studies/CaseStudiesSection")
);
const SecurityStrip = dynamic(
  () => import("@/components/landing/SecurityStrip")
);
const FAQSection = dynamic(() => import("@/components/landing/FAQSection"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white font-primary text-[#090d0b]">
      <ScrollHeroSection />

      <TrustStrip />

      <PlatformOverview />

      <OutcomesShowcase />

      <div id="how-it-works">
        <PlatformFlowSection />
      </div>

      <ShowcaseSection />

      <div id="industries">
        <IndustryStackSection />
      </div>

      <MetricsStrip />

      <div id="stories">
        <CaseStudiesSection />
      </div>

      <SecurityStrip />

      <FAQSection />

      <FinalCTA />

      <Footer />
    </main>
  );
}
