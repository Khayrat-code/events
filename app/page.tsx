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
import { Analytics } from "@/components/Analytics"
import { Cinema } from "@/components/Cinema/Cinema"
import { Cursor } from "@/components/Cursor"
import { Rail } from "@/components/Rail"

export default function Page() {
  return (
    <>
      <Cinema />
      <ProgressBar />
      <Petals />
      <Effects />
      <Analytics />
      <Cursor />
      <Rail />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Musicians />
        <Steps />
        <Book />
        <Afterlight />
      </main>
      <Footer />
    </>
  )
}