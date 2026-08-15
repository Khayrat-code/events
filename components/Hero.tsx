"use client"

import { useEffect } from "react"

const WORDS = ["نحوّلُ", "مناسبتكَ", "إلى", "حكايةٍ", "تُروى"]

export function Hero() {
  useEffect(() => {
    const t = setTimeout(
      () => document.querySelector(".hero")?.classList.add("in"),
      150,
    )
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="hero ed-reveal" id="top">
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
            تواصل معنا للحجز
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
