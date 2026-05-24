import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
