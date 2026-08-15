"use client"

import { useEffect, useState } from "react"

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])
  return reduced
}

export function isCoarsePointer(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(pointer: coarse)").matches
}

export function isWeakDevice(): boolean {
  if (typeof navigator === "undefined") return false
  const cores = navigator.hardwareConcurrency || 8
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory
  const lowCores = cores <= 4
  const lowMem = typeof mem === "number" && mem <= 4
  return lowCores || lowMem
}
