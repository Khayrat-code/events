"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.replace("/admin")
  }

  return (
    <section style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--mist)", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--deep)" }}>لوحة التحكم</div>
          <p style={{ color: "#7c5a72", fontSize: 14, marginTop: 6 }}>تسجيل الدخول للمسؤولين</p>
        </div>
        <form onSubmit={onSubmit} noValidate style={{ background: "var(--paper)", border: "1px solid var(--lav2)", borderRadius: "var(--r)", padding: 28, boxShadow: "var(--sh)" }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6, color: "var(--ink)" }}>البريد الإلكتروني</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--lav2)", fontFamily: "inherit", fontSize: 15, outline: "none", background: "var(--mist)" }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6, color: "var(--ink)" }}>كلمة المرور</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" style={{ width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--lav2)", fontFamily: "inherit", fontSize: 15, outline: "none", background: "var(--mist)" }} />
          </div>
          {error && <div style={{ background: "var(--lav)", borderInlineStart: "3px solid var(--brand)", color: "var(--ink)", padding: "10px 12px", borderRadius: 10, fontSize: 14, marginBottom: 16 }}>{error}</div>}
          <button className="btn primary" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center" }}>{loading ? "جاري الدخول…" : "دخول"}</button>
        </form>
      </div>
    </section>
  )
}