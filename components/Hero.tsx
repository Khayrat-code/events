"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const WORDS = ["نحوّلُ", "مناسبتكَ", "إلى", "حكايةٍ", "تُروى"]

const SLIDES = [
  { src: "/hero/24.jpg", pos: "center 20%" },
  { src: "/hero/22.jpg", pos: "center 35%" },
  { src: "/hero/23.jpg", pos: "center 30%" },
  { src: "/hero/21.jpg", pos: "center 40%" },
]

export function Hero() {
  const reduced = useReducedMotion()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setTimeout(
      () => document.querySelector(".hero")?.classList.add("in"),
      150,
    )
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (reduced) return
    const iv = setInterval(() => {
      if (!document.hidden) setIdx((i) => (i + 1) % SLIDES.length)
    }, 5500)
    return () => clearInterval(iv)
  }, [reduced])

  return (
    <section className="hero ed-reveal" id="top">
      <div className="hero-slides" aria-hidden="true">
        {SLIDES.map((s, i) => (
          <Image
            key={s.src}
            src={s.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={i === idx ? "on" : ""}
            style={{ objectFit: "cover", objectPosition: s.pos }}
          />
        ))}
        <div className="hero-scrim" />
      </div>
      <div className="hero-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            className={i === idx ? "on" : ""}
            onClick={() => setIdx(i)}
            aria-label={`الصورة ${i + 1}`}
          />
        ))}
      </div>
      <div className="wrap" style={{ maxWidth: 920 }}>
        <span className="ed-eyebrow">٠٠ — المدخل</span>
        <h1 className="ed-title">
          {WORDS.map((w, i) => (
            <span className="ed-word" key={i}>
              <span style={{ ["--d" as string]: `${0.1 + i * 0.12}s` }}>
                {w}
              </span>
            </span>
          ))}
        </h1>
        <hr className="ed-rule" />
        <p className="ed-lead ed-kicker" style={{ maxWidth: "52ch" }}>
          من أول وردةٍ في الممرّ إلى آخر إضاءةٍ في القاعة: تنسيق ورد، كوش، أعراس،
          تخرّج، أعياد ميلاد وولائم — بتفاصيل فنية تليق بذوقك.
        </p>
        <div className="ed-cta hero-cta">
          <a className="btn primary" href="#book">
            ابدأ حكايتك
          </a>
        </div>
        <div className="ed-stats">
          <div>
            <b>
              <span className="num" data-n="350">
                0
              </span>
              <span className="s">+</span>
            </b>
            <span className="ed-kicker">مناسبة منسّقة</span>
          </div>
          <div>
            <b>
              <span className="num" data-n="8">
                0
              </span>
            </b>
            <span className="ed-kicker">تخصصات تنسيق</span>
          </div>
          <div>
            <b>
              <span className="num" data-n="10">
                0
              </span>
            </b>
            <span className="ed-kicker">سنوات من الشغف</span>
          </div>
        </div>
      </div>
      <div className="scroll-hint">⌄</div>
    </section>
  )
}
