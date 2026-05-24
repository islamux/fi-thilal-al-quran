export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-[var(--color-text-muted)]">جاري التحميل...</p>
      </div>
    </div>
  );
}
