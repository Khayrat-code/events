"use client"

import { useEffect } from "react"
import type { Dictionary } from "@/lib/i18n"

interface HeroProps {
  dict: Dictionary["hero"]
}

export function Hero({ dict }: HeroProps) {
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
        <span className="ed-eyebrow">{dict.eyebrow}</span>
        <h1 className="ed-title">
          {dict.words.map((w, i) => (
            <span className="ed-word" key={i}>
              <span style={{ ["--d" as string]: `${0.1 + i * 0.12}s` }}>
                {w}
              </span>
            </span>
          ))}
        </h1>
        <hr className="ed-rule" />
        <p className="ed-lead ed-kicker" style={{ maxWidth: "52ch" }}>
          {dict.lead}
        </p>
        <div className="ed-cta hero-cta">
          <a className="btn primary" href="#book">
            {dict.cta}
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
            <span className="ed-kicker">{dict.stats[0].label}</span>
          </div>
          <div>
            <b>
              <span className="num" data-n="8">
                0
              </span>
            </b>
            <span className="ed-kicker">{dict.stats[1].label}</span>
          </div>
          <div>
            <b>
              <span className="num" data-n="10">
                0
              </span>
            </b>
            <span className="ed-kicker">{dict.stats[2].label}</span>
          </div>
        </div>
      </div>
      <div className="scroll-hint">⌄</div>
    </section>
  )
}
