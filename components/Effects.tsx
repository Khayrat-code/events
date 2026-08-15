"use client"

import { useEffect } from "react"
import { useReveal, useCounters } from "@/hooks/useReveal"

export function Effects() {
  useReveal()
  useCounters()
  return null
}