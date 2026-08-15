"use client"

import { useEffect } from "react"
import { createClient, TABLES } from "@/lib/supabase/client"

const SESSION_KEY = "toolcan-session-id"
const STARTED_KEY = "toolcan-session-started"
const TTL = 30 * 60 * 1000

function getOrCreateSessionId(): string {
  try {
    const existing = localStorage.getItem(SESSION_KEY)
    const started = Number(localStorage.getItem(STARTED_KEY) || 0)
    if (existing && started && Date.now() - started < TTL) return existing
  } catch {}
  const id = crypto.randomUUID()
  try {
    localStorage.setItem(SESSION_KEY, id)
    localStorage.setItem(STARTED_KEY, String(Date.now()))
  } catch {}
  return id
}

export function Analytics() {
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return
    const sessionId = getOrCreateSessionId()
    let supabase
    try {
      supabase = createClient()
    } catch {
      return
    }

    const record = async () => {
      const payload = {
        session_id: sessionId,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        language: navigator.language,
      }
      await supabase.from(TABLES.analyticsSessions).upsert(payload, { onConflict: "session_id", ignoreDuplicates: true })
      await supabase.from(TABLES.analyticsEvents).insert({ session_id: sessionId, path: location.pathname, referrer: document.referrer || null, duration_ms: 0 })
    }
    record().catch(() => {})
  }, [])

  return null
}