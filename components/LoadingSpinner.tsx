export default function LoadingSpinner({ message = "جاري التحميل..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-text-muted">{message}</p>
      </div>
    </div>
  );
}
