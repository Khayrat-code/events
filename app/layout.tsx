import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToolCan | تنسيق الحفلات والمناسبات",
  description: "مؤسسة متخصصة لتنسيق الحفلات والمناسبات — نحول التفاصيل إلى ذكريات.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Changa:wght@500;600;700;800&family=Playfair+Display:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="cinema-mode">
        <div className="vmark" aria-hidden="true">TOLKAN</div>
        {children}
      </body>
    </html>
  );
}