import Link from "next/link";

const links = [
  { icon: "book_2", label: "السور", href: "/", filled: true },
  { icon: "segment", label: "الأجزاء", href: "/juz/1", filled: false },
  { icon: "search", label: "البحث", href: "/search", filled: false },
  { icon: "bookmark", label: "العلامات", href: "/bookmarks", filled: false },
];

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-parchment-cream/95 dark:bg-dark-bg/95 backdrop-blur-md border-t border-warm-border flex justify-around items-center h-16 z-50">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <span className={`material-symbols-outlined ${link.filled ? "filled text-secondary" : ""}`}>
            {link.icon}
          </span>
          <span className="text-[10px] font-medium">{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
