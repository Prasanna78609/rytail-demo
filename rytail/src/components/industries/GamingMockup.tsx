export function GamingMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[380px] py-4">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <p className="type-label text-zinc-500">Player Engagement</p>
            <p className="font-display text-sm font-semibold text-[#090d0b]">
              Season 4 Milestone Track
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            Lvl 24
          </span>
        </div>

        <div className="mt-4 rounded-xl bg-zinc-50 p-3.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-800">
              XP to Next Tier
            </span>
            <span className="font-semibold text-emerald-700">2,450 / 3,000</span>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-zinc-200">
            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-emerald-700 to-emerald-400" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-white p-2 shadow-2xs">
              <p className="text-[10px] text-zinc-500">Streak</p>
              <p className="text-xs font-bold text-[#090d0b]">9 Days</p>
            </div>
            <div className="rounded-lg bg-white p-2 shadow-2xs">
              <p className="text-[10px] text-zinc-500">Quests</p>
              <p className="text-xs font-bold text-[#090d0b]">14 / 16</p>
            </div>
            <div className="rounded-lg bg-white p-2 shadow-2xs">
              <p className="text-[10px] text-zinc-500">Rank</p>
              <p className="text-xs font-bold text-[#090d0b]">Top 8%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 ml-auto w-[86%] rounded-xl border border-emerald-200 bg-[#090d0b] px-4 py-3 text-white shadow-lg sm:absolute sm:-bottom-2 sm:-right-3 sm:mt-0 sm:w-64">
        <div className="flex items-start gap-2.5">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
          <div>
            <p className="text-xs font-semibold text-white">
              Milestone Reward Unlocked
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-300">
              Claim 2x boost tokens before tonight&apos;s arena reset.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
