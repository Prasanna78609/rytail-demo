import { MapPin } from "lucide-react";
import type { OfficeCard } from "@/data/footer";

interface OfficeCardsProps {
  offices: OfficeCard[];
}

export function OfficeCards({ offices }: OfficeCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {offices.map((office) => (
        <div
          key={office.id}
          className="rounded-[8px] bg-[var(--ft-card)] p-4 text-[var(--ft-text)]"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[var(--ft-navy-deep)] text-[var(--ft-heading)]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <h3 className="font-display text-sm font-bold text-white">
              {office.title}
            </h3>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-white/95">
            {office.address}
          </p>
        </div>
      ))}
    </div>
  );
}
