import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

export const TABLES = {
  gallery: "gallery_images",
  contact: "contact_submissions",
  complaints: "complaints",
  analyticsSessions: "analytics_sessions",
  analyticsEvents: "analytics_events",
  settings: "site_settings",
  testimonials: "testimonials",
  invoices: "invoices",
} as const

export const BUCKETS = {
  gallery: "gallery",
  complaints: "complaints",
  contact: "contact",
} as const