"use client"

import { useEffect, useState } from "react"
import { Logo } from "./Logo"
import { NAV_LINKS } from "@/lib/data"

export function Header() {
  const [open, setOpen] = useState(false)

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
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a className="cta-sm" href="#book">
            احجز موعدك
          </a>
          <button
            id="menuBtn"
            aria-label="القائمة"
            onClick={() => setOpen((o) => !o)}
          >
            ☰
          </button>
        </div>
      </header>
      <nav id="mobileNav" className={open ? "open" : ""}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#book" onClick={() => setOpen(false)}>
          احجز موعدك
        </a>
      </nav>
    </>
  )
}