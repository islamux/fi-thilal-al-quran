import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] px-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">الصفحة غير موجودة</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">
          لم يتم العثور على الصفحة المطلوبة.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </div>
  );
}
