"use client"

import { useEffect } from "react"

export function Petals() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reduced) return
    const box = document.getElementById("petals")
    if (!box) return
    const n = (navigator.hardwareConcurrency || 8) <= 4 ? 7 : 13
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span")
      p.className = "petal"
      const s = 10 + Math.random() * 14
      p.style.cssText =
        "left:" +
        Math.random() * 100 +
        "%;width:" +
        s +
        "px;height:" +
        s +
        "px;" +
        "--t:" +
        (9 + Math.random() * 9) +
        "s;--dl:-" +
        Math.random() * 14 +
        "s;--sw:" +
        (Math.random() * 160 - 80) +
        "px"
      box.appendChild(p)
    }
  }, [])

  return <div id="petals" aria-hidden="true" />
}