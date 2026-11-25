export function RetailMockup() {
  const products = [
    { name: "Canvas Weekender", price: "$128", badge: "94% match", tone: "bg-emerald-100 text-emerald-800" },
    { name: "Merino Travel Scarf", price: "$54", badge: "+Add", tone: "bg-zinc-100 text-zinc-700" },
    { name: "Leather Cardholder", price: "$42", badge: "+Add", tone: "bg-zinc-100 text-zinc-700" },
    { name: "Packing Cube Set", price: "$36", badge: "Popular", tone: "bg-emerald-100 text-emerald-800" },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[380px] py-4">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div>
            <p className="type-label text-zinc-500">Storefront Bundle</p>
            <p className="font-display text-sm font-semibold text-[#090d0b]">
              Frequently bought together
            </p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            +18% AOV
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {products.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-zinc-100 bg-zinc-50/80 p-3"
            >
              <div className="h-12 w-full rounded-lg bg-gradient-to-br from-emerald-100 to-zinc-200" />
              <p className="mt-2 truncate text-xs font-semibold text-[#090d0b]">
                {item.name}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-600">
                  {item.price}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${item.tone}`}
                >
                  {item.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 ml-auto w-[86%] rounded-xl border border-emerald-900/10 bg-[#090d0b] px-4 py-3 text-white shadow-lg sm:absolute sm:-bottom-2 sm:-right-3 sm:mt-0 sm:w-64">
        <div className="flex items-start gap-2.5">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
          <div>
            <p className="text-xs font-semibold text-white">
              Welcome to our store
            </p>
            <p className="mt-0.5 text-[11px] leading-snug text-zinc-300">
              Unlock 15% off your first bundle at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
