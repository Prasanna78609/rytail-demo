interface FooterBadgeProps {
  label: string;
  badges: string[];
}

// TODO: Replace with real partner/marketplace badges only after authorization.
export function FooterBadge({ label, badges }: FooterBadgeProps) {
  return (
    <div className="flex flex-col gap-2 rounded-[10px] border border-[var(--ft-border)] bg-white/5 px-4 py-2.5">
      <span className="text-[11px] font-medium text-[var(--ft-muted)]">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {badges.map((badge) => (
          <span
            key={badge}
            className="inline-flex items-center rounded-full border border-[var(--ft-border)] bg-[var(--ft-navy-deep)] px-3 py-1 text-[11px] font-semibold text-[var(--ft-text)]"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
