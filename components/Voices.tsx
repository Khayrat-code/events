"use client"

import { useRef } from "react"
import { VOICES } from "@/lib/data"

export function Voices() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = dir === "right" ? -358 : 358
    el.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section id="voices">
      <div className="wrap">
        <div className="cinema-head reveal">
          <span className="ed-eyebrow">قالوا عنا</span>
          <h2 className="title">اسحب لتقرأ حكاياتهم</h2>
          <hr className="ed-rule" />
        </div>
        <div style={{ position: "relative" }}>
          <button
            className="v-arr v-arr-l"
            onClick={() => scroll("left")}
            aria-label="السابق"
          >
            ‹
          </button>
          <div className="v-scroll" ref={scrollRef}>
            {VOICES.map((v) => (
              <div className="vcard" key={v.author}>
                <div className="stars">★★★★★</div>
                <p>{v.text}</p>
                <b>{v.author}</b>
              </div>
            ))}
          </div>
          <button
            className="v-arr v-arr-r"
            onClick={() => scroll("right")}
            aria-label="التالي"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}