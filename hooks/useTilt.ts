"use client"

import { useEffect } from "react"

export function useTilt(selector: string, amp: number) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (reduced) return
    const el = document.querySelector<HTMLElement>(selector)
    if (!el) return

    let tx = 0, ty = 0, cx = 0, cy = 0
    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.setProperty("--rx", cy * amp + "deg")
      el.style.setProperty("--ry", cx * amp + "deg")
      requestAnimationFrame(loop)
    }

    if (window.matchMedia("(pointer:fine)").matches) {
      window.addEventListener("mousemove", (e) => {
        tx = (e.clientX / innerWidth - 0.5) * 2
        ty = (e.clientY / innerHeight - 0.5) * -2
      })
      loop()
    } else if (typeof DeviceOrientationEvent !== "undefined") {
      const attach = () =>
        window.addEventListener("deviceorientation", (e) => {
          if (e.gamma == null) return
          tx = Math.max(-1, Math.min(1, e.gamma / 30))
          ty = Math.max(-1, Math.min(1, (e.beta! - 45) / 30))
        })
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        // iOS 13+ requires a user gesture — skip silently; card stays flat.
        // Could add a tap-to-enable button later if desired.
      } else {
        attach()
        loop()
      }
    }
  }, [selector, amp])
}