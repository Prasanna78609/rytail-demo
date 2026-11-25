export function FinanceMockup() {
  const bars = [38, 52, 46, 74, 62, 88, 70];

  return (
    <div className="relative mx-auto w-full max-w-[380px] py-4">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <p className="type-label text-zinc-500">Transaction Insights</p>
            <p className="font-display text-sm font-semibold text-[#090d0b]">
              Weekly Spend Velocity
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Live
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <p className="font-display text-2xl font-bold text-[#090d0b]">
            $14,820
          </p>
          <span className="text-xs font-semibold text-emerald-700">
            +12.4% vs last wk
          </span>
        </div>

        <div
          aria-hidden="true"
          className="mt-4 flex h-24 items-end justify-between gap-2 rounded-xl bg-zinc-50 px-3.5 py-3"
        >
          {bars.map((height, idx) => (
            <div key={idx} className="flex flex-1 flex-col items-center gap-1">
              <div
                style={{ height: `${height}%` }}
                className={`w-full rounded-t-md ${
                  idx === 5 ? "bg-emerald-600" : "bg-emerald-200"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 ml-auto w-[86%] rounded-xl border border-zinc-200 bg-[#090d0b] px-4 py-3 text-white shadow-lg sm:absolute sm:-bottom-2 sm:-right-3 sm:mt-0 sm:w-64">
        <div className="flex items-start gap-2.5">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
          <div>
            <p className="text-xs font-semibold text-white">
              Smart Spend Alert
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-300">
              Recurring cloud billing is 14% higher than your monthly baseline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
