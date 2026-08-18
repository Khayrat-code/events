"use client"

import { useEffect, useState } from "react"
import { Logo } from "./Logo"
import type { Dictionary } from "@/lib/i18n"

interface HeaderProps {
  dict: Dictionary["nav"]
  lang: "ar" | "en"
}

export function Header({ dict, lang }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const otherLang = lang === "ar" ? "/en" : "/ar"

  useEffect(() => {
    const hdr = document.getElementById("hdr")
    if (!hdr) return
    const onScroll = () => {
      hdr.classList.toggle("scrolled", window.scrollY > 30)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header id="hdr">
        <a className="logo" href="#top">
          <Logo />
        </a>
        <nav className="desk">
          {dict.links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a className="lang-switch" href={otherLang}>
            {dict.switchTo}
          </a>
          <a className="cta-sm" href="#book">
            {dict.cta}
          </a>
          <button
            id="menuBtn"
            aria-label={dict.menu}
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </header>
      <nav id="mobileNav" className={open ? "open" : ""}>
        {dict.links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#book" onClick={() => setOpen(false)}>
          {dict.cta}
        </a>
        <a href={otherLang}>{dict.switchTo}</a>
      </nav>
    </>
  )
}
