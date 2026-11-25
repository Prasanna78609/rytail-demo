import CaseStudiesSection from "@/components/case-studies/CaseStudiesSection";
import Footer from "@/components/Footer";
import PlatformFlowSection from "@/components/flow/PlatformFlowSection";
import IndustryStackSection from "@/components/industries/IndustryStackSection";
import ScrollHeroSection from "@/components/ScrollHeroSection";
import ShowcaseSection from "@/components/showcase/ShowcaseSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white font-primary text-[#090d0b]">
      <ScrollHeroSection />

      {/* Product Ecosystem / Platform Overview */}
      <section
        id="platform"
        className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-24 text-center"
      >
        <span className="type-label rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-emerald-800">
          Autonomous Customer Platform
        </span>
        <h2 className="type-section mt-4 max-w-2xl text-[#090d0b]">
          Built for teams that act on live customer context
        </h2>
        <p className="type-body mt-4 max-w-xl text-zinc-600">
          Connect streaming product events, warehouse audiences, and cross-channel
          messaging in a single low-latency engine.
        </p>
      </section>

      <PlatformFlowSection />

      <IndustryStackSection />

      <CaseStudiesSection />

      <ShowcaseSection />

      <Footer />
    </main>
  );
}
