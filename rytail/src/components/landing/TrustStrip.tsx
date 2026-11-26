import { TRUST_LOGOS } from "@/data/landing";

// TODO: Replace placeholder monograms with real, authorized customer logos.
function LogoItem({
  monogram,
  name,
  accent,
}: {
  monogram: string;
  name: string;
  accent: string;
}) {
  return (
    <div className="group flex shrink-0 items-center gap-2.5 opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0">
      <span
        style={{ backgroundColor: accent }}
        className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-xs font-bold text-white"
      >
        {monogram}
      </span>
      <span className="font-display text-sm font-semibold tracking-tight text-[#090D0B]">
        {name}
      </span>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-strip-heading"
      className="w-full border-b border-[#E4EAE7] bg-white py-12"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p
          id="trust-strip-heading"
          className="text-center text-sm font-medium text-[#52606A]"
        >
          Trusted by teams building real-time customer experiences.
        </p>

        {/* Desktop & Tablet: Static Row */}
        <div className="mt-7 hidden flex-wrap items-center justify-center gap-x-10 gap-y-5 md:flex">
          {TRUST_LOGOS.map((logo) => (
            <LogoItem
              key={logo.id}
              monogram={logo.monogram}
              name={logo.name}
              accent={logo.accent}
            />
          ))}
        </div>

        {/* Mobile: Infinite Marquee (pauses on hover, static under reduced motion) */}
        <div className="mt-7 overflow-hidden md:hidden">
          <div className="animate-trust-marquee flex w-max items-center gap-8 hover:[animation-play-state:paused]">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, idx) => (
              <LogoItem
                key={`${logo.id}-${idx}`}
                monogram={logo.monogram}
                name={logo.name}
                accent={logo.accent}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
