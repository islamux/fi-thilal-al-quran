import type { Metadata, Viewport } from "next";
import { Tajawal, Amiri_Quran } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
  display: "swap",
});

const amiriQuran = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
  variable: "--font-amiri-quran",
  display: "swap",
});

export const metadata: Metadata = {
  title: "في ظلال القرآن",
  description:
    "في ظلال القرآن — تفسير سيد قطب. رحلة تأملية في آيات الله.",
  openGraph: {
    title: "في ظلال القرآن",
    description: "تفسير سيد قطب — رحلة تأملية في آيات الله.",
    locale: "ar_SA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a365d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${amiriQuran.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--color-accent)] focus:text-white focus:text-sm"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
