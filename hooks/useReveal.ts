"use client"

import { useEffect } from "react"

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.18 }
    )
    const els = document.querySelectorAll(".reveal, #gallery, #stepsLine")
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useCounters() {
  useEffect(() => {
    const cio = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const end = +(el.dataset.n || 0)
          const t0 = performance.now()
          ;(function tick(t: number) {
            const k = Math.min((t - t0) / 1400, 1)
            el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 3))))
            if (k < 1) requestAnimationFrame(tick)
          })(t0)
          cio.unobserve(el)
        }),
      { threshold: 0.6 }
    )
    const els = document.querySelectorAll<HTMLElement>(".num[data-n]")
    els.forEach((el) => cio.observe(el))
    return () => cio.disconnect()
  }, [])
}