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
        <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-accent/40 to-transparent" />
        <span className="material-symbols-outlined text-accent text-xs">diamond</span>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
    );
  }

  if (variant === "wide") {
    return (
      <div className={`flex justify-center items-center gap-4 ${className}`}>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-accent/40 to-transparent" />
        <span className="material-symbols-outlined text-accent text-lg">diamond</span>
        <span className="material-symbols-outlined text-accent text-xl">auto_stories</span>
        <span className="material-symbols-outlined text-accent text-lg">diamond</span>
        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-accent/40 to-transparent" />
      </div>
    );
  }

  return (
    <div className={`flex justify-center items-center gap-3 ${className}`}>
      <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-accent/40 to-transparent" />
      <span className="material-symbols-outlined text-accent">diamond</span>
      <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-accent/40 to-transparent" />
    </div>
  );
}
