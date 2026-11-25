export function SubscriptionMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] py-4">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <p className="type-label text-zinc-500">Plan Selector</p>
            <p className="font-display text-sm font-semibold text-[#090d0b]">
              Choose your workspace tier
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Annual
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/80 p-3.5">
            <div>
              <p className="text-xs font-semibold text-zinc-700">Free</p>
              <p className="mt-1 font-display text-xl font-bold text-[#090d0b]">
                $0
                <span className="text-xs font-normal text-zinc-500">/mo</span>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[11px] text-zinc-600">
                <li>• 5k monthly events</li>
                <li>• Core segments</li>
              </ul>
            </div>
            <span className="mt-3 block rounded-lg border border-zinc-200 bg-white py-1.5 text-center text-[11px] font-semibold text-zinc-700">
              Current
            </span>
          </div>

          <div className="flex flex-col justify-between rounded-xl border-2 border-emerald-600 bg-emerald-50/50 p-3.5">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-emerald-800">Premium</p>
                <span className="rounded bg-[#090d0b] px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                  BEST
                </span>
              </div>
              <p className="mt-1 font-display text-xl font-bold text-[#090d0b]">
                $99
                <span className="text-xs font-normal text-zinc-500">/mo</span>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[11px] text-zinc-700">
                <li>• Unlimited events</li>
                <li>• Churn scoring</li>
              </ul>
            </div>
            <span className="mt-3 block rounded-lg bg-emerald-600 py-1.5 text-center text-[11px] font-semibold text-white">
              Upgrade
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 ml-auto w-[86%] rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg sm:absolute sm:-bottom-2 sm:-right-3 sm:mt-0 sm:w-64">
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-800">
            %
          </span>
          <div>
            <p className="text-xs font-semibold text-[#090d0b]">
              Limited offer
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-600">
              Save 20% on Premium when upgrading before cycle renewal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
