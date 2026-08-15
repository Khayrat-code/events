"use client"

import { useEffect } from "react"

export function ProgressBar() {
  useEffect(() => {
    const prog = document.getElementById("progress")
    if (!prog) return
    const onScroll = () => {
      const h = document.documentElement
      prog.style.transform =
        "scaleX(" +
        (h.scrollTop / (h.scrollHeight - h.clientHeight) || 0) +
        ")"
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return <div id="progress" />
}