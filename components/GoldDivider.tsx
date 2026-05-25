export default function GoldDivider({
  variant = "default",
  className = "",
}: {
  variant?: "default" | "narrow" | "wide";
  className?: string;
}) {
  if (variant === "narrow") {
    return (
      <div className={`flex items-center justify-center gap-3 ${className}`}>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-[var(--color-accent)]/40 to-transparent" />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <rect x="5" y="5" width="2" height="2" rx="0.5" fill="var(--color-accent)" opacity="0.6"/>
          <rect x="3" y="3" width="6" height="6" rx="1" fill="var(--color-accent)" opacity="0.15"/>
        </svg>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-[var(--color-accent)]/40 to-transparent" />
      </div>
    );
  }

  if (variant === "wide") {
    return (
      <div className={`flex justify-center ${className}`}>
        <svg width="160" height="24" viewBox="0 0 160 24" fill="none">
          <line x1="0" y1="12" x2="48" y2="12" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
          <circle cx="64" cy="12" r="6" fill="var(--color-accent)" opacity="0.12"/>
          <circle cx="64" cy="12" r="3" fill="var(--color-accent)" opacity="0.3"/>
          <circle cx="64" cy="12" r="1" fill="var(--color-accent)"/>
          <rect x="76" y="8" width="8" height="8" rx="1.5" fill="var(--color-accent)" opacity="0.15"/>
          <rect x="78" y="10" width="4" height="4" rx="0.5" fill="var(--color-accent)" opacity="0.3"/>
          <circle cx="96" cy="12" r="6" fill="var(--color-accent)" opacity="0.12"/>
          <circle cx="96" cy="12" r="3" fill="var(--color-accent)" opacity="0.3"/>
          <circle cx="96" cy="12" r="1" fill="var(--color-accent)"/>
          <line x1="112" y1="12" x2="160" y2="12" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
        </svg>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <svg width="100" height="16" viewBox="0 0 100 16" fill="none">
        <line x1="0" y1="8" x2="30" y2="8" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
        <circle cx="50" cy="8" r="4" fill="var(--color-accent)" opacity="0.2"/>
        <circle cx="50" cy="8" r="1.5" fill="var(--color-accent)"/>
        <line x1="70" y1="8" x2="100" y2="8" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5"/>
      </svg>
    </div>
  );
}
