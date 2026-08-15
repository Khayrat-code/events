"use client"

import { useEffect, useState } from "react"
import { services } from "@/lib/data"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
const toAr = (s: string) => s.replace(/[0-9]/g, (d) => AR[+d])

export function Rail() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".chap"))
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.i))
        }),
      { threshold: 0.5, rootMargin: "-45% 0px -45% 0px" },
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  const go = (i: number) => {
    document
      .querySelector<HTMLElement>(`.chap[data-i="${i}"]`)
      ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
  }

  return (
    <nav id="rail" aria-label="الفصول">
      {services.map((s, i) => (
        <a
          key={s.num}
          href="#services"
          className={active === i ? "on" : ""}
          onClick={(e) => {
            e.preventDefault()
            go(i)
          }}
        >
          {toAr(s.num)}
        </a>
      ))}
    </nav>
  )
}
