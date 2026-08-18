import { notFound } from "next/navigation"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Steps } from "@/components/Steps"
import { Musicians } from "@/components/Musicians"
import { Book } from "@/components/Book"
import { Afterlight } from "@/components/Afterlight"
import { Footer } from "@/components/Footer"
import { ProgressBar } from "@/components/ProgressBar"
import { Petals } from "@/components/Petals"
import { Effects } from "@/components/Effects"
import { Cinema } from "@/components/Cinema/Cinema"
import { Cursor } from "@/components/Cursor"
import { Rail } from "@/components/Rail"
import { getDictionary, isLocale } from "@/lib/i18n"

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound()
  const lang = params.lang
  const t = getDictionary(lang)

  return (
    <>
      <Cinema />
      <ProgressBar />
      <Petals />
      <Effects />
      <Cursor />
      <Rail label={t.railLabel} lang={lang} />
      <Header dict={t.nav} lang={lang} />
      <main>
        <Hero dict={t.hero} />
        <Marquee items={t.marquee} />
        <About dict={t.about} />
        <Services dict={t.services} lang={lang} />
        <Musicians dict={t.musicians} />
        <Steps dict={t.steps} />
        <Book dict={t.book} lang={lang} />
        <Afterlight dict={t.afterlight} />
      </main>
      <Footer dict={t.footer} lang={lang} />
    </>
  )
}
