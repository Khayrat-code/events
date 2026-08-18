import type { Metadata } from "next"
import { notFound } from "next/navigation"
import "../globals.css"
import { direction, getDictionary, isLocale, locales, type Locale } from "@/lib/i18n"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string }
}): Promise<Metadata> {
  const lang: Locale = isLocale(params.lang) ? params.lang : "ar"
  return getDictionary(lang).meta
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  if (!isLocale(params.lang)) notFound()
  const lang = params.lang

  return (
    <html lang={lang} dir={direction(lang)}>
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
  )
}
