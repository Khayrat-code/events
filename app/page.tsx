import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { Marquee } from "@/components/Marquee"
import { About } from "@/components/About"
import { Services } from "@/components/Services"
import { Gallery } from "@/components/Gallery"
import { Steps } from "@/components/Steps"
import { Voices } from "@/components/Voices"
import { Book } from "@/components/Book"
import { Footer } from "@/components/Footer"
import { ProgressBar } from "@/components/ProgressBar"
import { Petals } from "@/components/Petals"
import { Effects } from "@/components/Effects"
import { Analytics } from "@/components/Analytics"

export default function Page() {
  return (
    <>
      <ProgressBar />
      <Petals />
      <Effects />
      <Analytics />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Gallery />
        <Steps />
        <Voices />
        <Book />
      </main>
      <Footer />
    </>
  )
}