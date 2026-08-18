"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient, TABLES } from "@/lib/supabase/client"

type Tab = "messages" | "gallery" | "analytics"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("messages")
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { router.replace("/admin/login"); return }
      setAuthLoading(false)
    })
  }, [router])

  if (authLoading) return <div style={{ padding: 80, textAlign: "center", color: "var(--ink) "}}>جارٍ التحقق…</div>

  const tabs: Array<{ key: Tab; label: string }> = [
    { key: "messages", label: "الرسائل" },
    { key: "gallery", label: "المعرض" },
    { key: "analytics", label: "التحليلات" },
  ]

  return (
    <div style={{ background: "var(--mist)", minHeight: "100vh" }}>
      <div style={{ background: "var(--deep)", color: "var(--txt-on-d)", padding: "18px clamp(16px,4vw,32px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14, boxShadow: "0 2px 20px rgba(0,0,0,.25)", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 22, fontWeight: 800 }}>لوحة التحكم</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href="/" className="btn" style={{ background: "transparent", color: "var(--lav)", border: "1px solid rgba(255,255,255,.25)", padding: "10px 18px", fontSize: 14, textDecoration: "none", borderRadius: 10 }}>الموقع</a>
          <button className="btn" style={{ background: "rgba(176,80,80,.16)", color: "#E4A5A5", border: "1px solid rgba(176,80,80,.5)", padding: "10px 18px", fontSize: 14, borderRadius: 10 }} onClick={async () => { await createClient().auth.signOut(); router.replace("/admin/login") }}>تسجيل خروج</button>
        </div>
      </div>

      <div style={{ padding: "24px clamp(16px,4vw,32px) 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{ padding: "10px 18px", borderRadius: 12, border: tab === t.key ? "1px solid var(--brand)" : "1px solid var(--lav2)", background: tab === t.key ? "var(--brand)" : "var(--paper)", color: tab === t.key ? "#fff" : "var(--ink)", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            {t.label}
          </button>
        ))}
      </div>

      <section style={{ padding: "28px clamp(16px,4vw,32px) 96px" }}>
        {tab === "messages" && <MessagesPanel />}
        {tab === "gallery" && <GalleryPanel />}
        {tab === "analytics" && <AnalyticsPanel />}
      </section>
    </div>
  )
}

/* ------ Messages Panel ------ */

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  service?: string
  musician?: string
  event_date?: string
  message: string
  type?: string
  subject?: string
  read: boolean
  created_at: string
  source: "contact" | "complaint"
}

function MessagesPanel() {
  const [msgs, setMsgs] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "unread">("all")

  const load = async () => {
    setLoading(true)
    const s = createClient()
    const [c1, c2] = await Promise.all([
      s.from(TABLES.contact).select("*").order("created_at", { ascending: false }).limit(100),
      s.from(TABLES.complaints).select("*").order("created_at", { ascending: false }).limit(100),
    ])
    const all: Message[] = [
      ...((c1.data ?? []) as any[]).map((m: any) => ({ ...m, source: "contact" as const, type: "contact" })),
      ...((c2.data ?? []) as any[]).map((m: any) => ({ ...m, source: "complaint" as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    setMsgs(all)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const displayed = filter === "unread" ? msgs.filter((m) => !m.read) : msgs

  const markRead = async (m: Message) => {
    const s = createClient()
    const table = m.source === "contact" ? TABLES.contact : TABLES.complaints
    await s.from(table).update({ read: true }).eq("id", m.id)
    setMsgs((p) => p.map((x) => (x.id === m.id ? { ...x, read: true } : x)))
  }

  if (loading) return <div style={{ color: "var(--ink)", padding: 32 }}>…</div>

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--deep)" }}>
          الرسائل ({displayed.length})
          {msgs.filter((m) => !m.read).length > 0 && (
            <span style={{ fontSize: 13, background: "var(--brand)", color: "#fff", borderRadius: 999, padding: "2px 10px", marginRight: 8 }}>{msgs.filter((m) => !m.read).length} غير مقروءة</span>
          )}
        </h2>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setFilter("all")} style={{ padding: "8px 16px", borderRadius: 999, border: filter === "all" ? "1px solid var(--brand)" : "1px solid var(--lav2)", background: filter === "all" ? "var(--brand)" : "var(--paper)", color: filter === "all" ? "#fff" : "var(--ink)", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>الكل</button>
          <button onClick={() => setFilter("unread")} style={{ padding: "8px 16px", borderRadius: 999, border: filter === "unread" ? "1px solid var(--brand)" : "1px solid var(--lav2)", background: filter === "unread" ? "var(--brand)" : "var(--paper)", color: filter === "unread" ? "#fff" : "var(--ink)", fontFamily: "inherit", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>غير مقروءة</button>
        </div>
      </div>

      {displayed.length === 0 ? (
        <div style={{ background: "var(--paper)", border: "1px dashed var(--lav2)", borderRadius: "var(--r)", padding: 48, textAlign: "center", color: "#7c5a72" }}>لا توجد رسائل</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {displayed.map((m) => (
            <div key={m.id} style={{ background: m.read ? "var(--paper)" : "var(--lav)", border: `1px solid ${m.read ? "var(--lav2)" : "var(--mid)"}`, borderRadius: "var(--r)", padding: 18, cursor: "pointer" }} onClick={() => !m.read && markRead(m)}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 800, color: "var(--ink)" }}>{m.name}</span>
                  <span style={{ color: "#7c5a72", fontSize: 13, marginInline: 8 }}>{m.email}</span>
                  {m.phone && <span style={{ color: "var(--brand)", fontSize: 12 }}>{m.phone}</span>}
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "#7c5a72", background: "var(--lav2)", borderRadius: 999, padding: "2px 10px" }}>{m.source === "contact" ? "حجز" : m.type === "complaint" ? "شكوى" : m.type === "suggestion" ? "اقتراح" : m.type || "—"}</span>
                  <span style={{ fontSize: 11, color: "#a98c9f" }}>{new Date(m.created_at).toLocaleDateString("ar-SA")}</span>
                </div>
              </div>
              {(m.service || m.musician || m.event_date) && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  {m.service && <span style={{ fontSize: 12, background: "rgba(142,58,98,.12)", color: "var(--brand)", borderRadius: 8, padding: "3px 10px", fontWeight: 700 }}>الخدمة: {m.service}</span>}
                  {m.musician && <span style={{ fontSize: 12, background: "rgba(142,58,98,.12)", color: "var(--brand)", borderRadius: 8, padding: "3px 10px", fontWeight: 700 }}>عازف: {m.musician}</span>}
                  {m.event_date && <span style={{ fontSize: 12, background: "rgba(142,58,98,.12)", color: "var(--brand)", borderRadius: 8, padding: "3px 10px", fontWeight: 700 }}>التاريخ: {new Date(m.event_date).toLocaleDateString("ar-SA")}</span>}
                </div>
              )}
              <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{m.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------ Gallery Panel ------ */

interface GalleryItem {
  id: string
  title: string
  description?: string
  image_url: string
  storage_path: string
  category: string
  sort_order: number
}

function GalleryPanel() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data } = await createClient().from(TABLES.gallery).select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false })
    setItems((data as GalleryItem[]) ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const onDelete = async (item: GalleryItem) => {
    if (!confirm("حذف الصورة؟")) return
    const s = createClient()
    await s.storage.from("gallery").remove([item.storage_path])
    await s.from(TABLES.gallery).delete().eq("id", item.id)
    setItems((a) => a.filter((i) => i.id !== item.id))
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const s = createClient()
    const ext = file.name.split(".").pop() || "jpg"
    const id = crypto.randomUUID()
    const path = `images/${id}.${ext}`
    await s.storage.from("gallery").upload(path, file, { contentType: file.type })
    const { data: pub } = s.storage.from("gallery").getPublicUrl(path)
    await s.from(TABLES.gallery).insert({ id, title: file.name.split(".")[0], image_url: pub.publicUrl, storage_path: path, category: "General", sort_order: items.length })
    await load()
  }

  if (loading) return <div style={{ color: "var(--ink)", padding: 32 }}>…</div>

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--deep)" }}>المعرض</h2>
        <label style={{ cursor: "pointer", background: "var(--brand)", color: "#fff", padding: "10px 20px", borderRadius: 999, fontSize: 14, fontWeight: 800 }}>رفع صورة
          <input type="file" accept="image/*" onChange={onUpload} style={{ display: "none" }} />
        </label>
      </div>
      {items.length === 0 ? (
        <div style={{ background: "var(--paper)", border: "1px dashed var(--lav2)", borderRadius: "var(--r)", padding: 48, textAlign: "center", color: "#7c5a72" }}>لا توجد صور</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
          {items.map((it) => (
            <div key={it.id} style={{ background: "var(--paper)", border: "1px solid var(--lav2)", borderRadius: "var(--r)", overflow: "hidden" }}>
              <div style={{ aspectRatio: "1/1", background: "var(--lav)" }}><img src={it.image_url} alt={it.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)" }}>{it.title}</div>
                <div style={{ fontSize: 11, color: "var(--brand)", marginTop: 4 }}>{it.category}</div>
                <button onClick={() => onDelete(it)} style={{ marginTop: 8, background: "var(--lav)", color: "var(--brand)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------ Analytics Panel ------ */

function AnalyticsPanel() {
  const [sessions, setSessions] = useState<any[]>([])
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const s = createClient()
    const [r1, r2] = await Promise.all([
      s.from(TABLES.analyticsSessions).select("*").order("started_at", { ascending: false }).limit(500),
      s.from(TABLES.analyticsEvents).select("*").order("created_at", { ascending: false }).limit(2000),
    ])
    setSessions((r1.data ?? []) as any[])
    setEvents((r2.data ?? []) as any[])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  if (loading) return <div style={{ color: "var(--ink)", padding: 32 }}>…</div>

  const totalVisitors = new Set(sessions.map((s) => s.session_id)).size
  const totalPageViews = events.length
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const todayVisitors = sessions.filter((s) => new Date(s.started_at) >= today).length

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--deep)", marginBottom: 20 }}>التحليلات</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
        <Kpi label="الزوار" value={totalVisitors} />
        <Kpi label="المشاهدات" value={totalPageViews} />
        <Kpi label="زيارات اليوم" value={todayVisitors} />
        <Kpi label="الجلسات" value={sessions.length} />
      </div>

      {events.length === 0 ? (
        <div style={{ background: "var(--paper)", border: "1px dashed var(--lav2)", borderRadius: "var(--r)", padding: 48, textAlign: "center", color: "#7c5a72" }}>لا توجد بيانات بعد</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Recent sessions */}
          <div style={{ background: "var(--paper)", border: "1px solid var(--lav2)", borderRadius: "var(--r)", padding: 18 }}>
            <div style={{ fontWeight: 800, color: "var(--ink)", marginBottom: 12 }}>آخر الجلسات</div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead><tr style={{ borderBottom: "1px solid var(--lav2)" }}><th style={{ textAlign: "start", padding: "8px 10px", color: "#7c5a72", fontWeight: 600 }}>الوقت</th><th style={{ textAlign: "start", padding: "8px 10px", color: "#7c5a72", fontWeight: 600 }}>المصدر</th><th style={{ textAlign: "start", padding: "8px 10px", color: "#7c5a72", fontWeight: 600 }}>اللغة</th><th style={{ textAlign: "end", padding: "8px 10px", color: "#7c5a72", fontWeight: 600 }}>الصفحات</th></tr></thead>
                <tbody>
                  {sessions.slice(0, 10).map((s) => {
                    const ref = (s.referrer || "").replace(/^https?:\/\//, "").split("/")[0] || "—"
                    return <tr key={s.id} style={{ borderBottom: "1px solid var(--lav)" }}><td style={{ padding: "8px 10px" }}>{new Date(s.started_at).toLocaleString("ar-SA")}</td><td style={{ padding: "8px 10px" }}>{ref}</td><td style={{ padding: "8px 10px" }}>{s.language || "—"}</td><td style={{ textAlign: "end", padding: "8px 10px" }}>{s.page_count}</td></tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--lav2)", borderRadius: "var(--r)", padding: 20, boxShadow: "var(--sh)" }}>
      <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--brand)", lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "#7c5a72", fontWeight: 700 }}>{label}</div>
    </div>
  )
}