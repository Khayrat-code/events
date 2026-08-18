"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { services } from "@/lib/data"

const AR = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
const toAr = (s: string) => s.replace(/[0-9]/g, (d) => AR[+d])

export function Services() {
  const [active, setActive] = useState(0)
  const [fgEmoji, setFgEmoji] = useState(services[0].emoji)
  const [fgSwap, setFgSwap] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".chap"))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.i)
            setActive(idx)
          }
        })
      },
      { threshold: 0.5, rootMargin: "-45% 0px -45% 0px" },
    )
    cards.forEach((c) => io.observe(c))

    const revo = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          e.target.classList.toggle("in", e.isIntersecting)
        }),
      { threshold: 0.2 },
    )
    cards.forEach((c) => revo.observe(c))
    return () => {
      io.disconnect()
      revo.disconnect()
    }
  }, [])

  useEffect(() => {
    setFgSwap(true)
    const t = setTimeout(() => {
      setFgEmoji(services[active].emoji)
      setFgSwap(false)
    }, 260)
    return () => clearTimeout(t)
  }, [active])

  return (
    <section id="services" ref={sectionRef} style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="cinema-head reveal">
          <span className="ed-eyebrow">تخصصاتنا الثمانية</span>
          <h2 className="title" style={{ textAlign: "center", fontSize: "clamp(1.6rem,5vw,2.6rem)" }}>
            مرّر لتشاهد الفصول تتراكب
          </h2>
          <hr className="ed-rule" />
        </div>
        <div className="chaps">
          {services.map((s, i) => (
            <article
              key={s.num}
              className="chap ed-panel"
              data-i={i}
              style={{ ["--i" as string]: i, ["--d" as string]: `${i * 0.05}s` }}
            >
              <div className="chap-body">
                <div className="chap-head">
                  <span className="ed-num">{toAr(s.num)}</span>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.description}</p>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="plate">
                {s.image ? (
                  <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: "8rem" }}>{s.emoji}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className={`chap-fg${fgSwap ? " swap" : ""}`} aria-hidden="true">
        {fgEmoji}
      </div>
    </section>
  )
}
