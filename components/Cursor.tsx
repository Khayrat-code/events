"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion, isCoarsePointer } from "@/hooks/useReducedMotion"

export function Cursor() {
  const reduced = useReducedMotion()
  const [fine, setFine] = useState(false)
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced) return
    if (!isCoarsePointer()) setFine(true)
  }, [reduced])

  useEffect(() => {
    if (!fine) return
    let rx = 0
    let ry = 0
    let dx = 0
    let dy = 0
    let raf = 0
    const move = (e: PointerEvent) => {
      dx = e.clientX
      dy = e.clientY
      if (dot.current)
        dot.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const tick = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      if (Math.abs(dx - rx) > 0.4 || Math.abs(dy - ry) > 0.4)
        raf = requestAnimationFrame(tick)
      else raf = 0
    }
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const hover = !!t.closest("a,button,.chip,.polaroid,.vcard,.tour-btn")
      ring.current?.classList.toggle("hover", hover)
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("mouseover", over)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [fine])

  if (!fine) return null
  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}
