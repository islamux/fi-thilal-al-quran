import type { Metadata, Viewport } from "next";
import { Tajawal, Amiri_Quran } from "next/font/google";
import "./globals.css";
import { APP_NAME, APP_DESCRIPTION, OG_DESCRIPTION, THEME_COLOR } from "@/lib/constants";

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
  title: APP_NAME,
  description: APP_DESCRIPTION,
  alternates: {
    languages: {
      "ar-SA": "/",
    },
  },
  openGraph: {
    title: APP_NAME,
    description: OG_DESCRIPTION,
    locale: "ar_SA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${amiriQuran.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg text-text font-tajawal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:right-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white focus:text-sm"
        >
          تخطي إلى المحتوى الرئيسي
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
