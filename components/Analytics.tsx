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

function detectDevice(ua: string): "mobile" | "tablet" | "desktop" {
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return "tablet"
  if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(ua)) return "mobile"
  return "desktop"
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

    const payload = {
      session_id: sessionId,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device: detectDevice(navigator.userAgent),
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      language: navigator.language,
      last_seen_at: new Date().toISOString(),
    }

    const record = async () => {
      await supabase
        .from(TABLES.analyticsSessions)
        .upsert(payload, { onConflict: "session_id" })
      await supabase
        .from(TABLES.analyticsEvents)
        .insert({
          session_id: sessionId,
          path: location.pathname,
          referrer: document.referrer || null,
          duration_ms: 0,
        })
      await supabase.rpc("increment_page_count", { sid: sessionId })
    }
    record().catch(() => {})

    const touchLastSeen = () => {
      try {
        supabase
          .from(TABLES.analyticsSessions)
          .update({ last_seen_at: new Date().toISOString() })
          .eq("session_id", sessionId)
      } catch {}
    }

    const heartbeat = setInterval(touchLastSeen, 30000)

    const onVisibility = () => {
      if (document.hidden) touchLastSeen()
    }

    window.addEventListener("beforeunload", touchLastSeen)
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      clearInterval(heartbeat)
      window.removeEventListener("beforeunload", touchLastSeen)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return null
}
