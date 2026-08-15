"use client"

import { useRef, useState, type FormEvent } from "react"
import { createClient, TABLES, BUCKETS } from "@/lib/supabase/client"

const MAX_FILE_BYTES = 10 * 1024 * 1024

interface FormState {
  name: string
  email: string
  phone: string
  projectType: string
  spaceSize: string
  message: string
}

const empty: FormState = { name: "", email: "", phone: "", projectType: "", spaceSize: "", message: "" }

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(empty)
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const f = e.target.files?.[0] ?? null
    if (f && f.size > MAX_FILE_BYTES) { setError("الملف كبير جداً — الحد الأقصى 10 ميجابايت"); return }
    setFile(f)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setError("الرجاء تعبئة الحقول المطلوبة"); return }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { setError("بريد إلكتروني غير صالح"); return }
    setSubmitting(true)

    let attachmentUrl: string | null = null
    if (file) {
      const supabase = createClient()
      const ext = file.name.split(".").pop() || "bin"
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const { error: upErr } = await supabase.storage.from(BUCKETS.contact).upload(path, file, { cacheControl: "3600", upsert: false })
      if (!upErr) {
        const { data } = supabase.storage.from(BUCKETS.contact).getPublicUrl(path)
        attachmentUrl = data.publicUrl
      }
    }

    const message = [`[${form.projectType || "—"}]`, form.spaceSize ? `${form.spaceSize} م²` : "", "", form.message.trim()].filter(Boolean).join("\n")

    const supabase = createClient()
    const { error: dbErr } = await supabase.from(TABLES.contact).insert({
      name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || null,
      message, attachment_url: attachmentUrl,
    })
    setSubmitting(false)
    if (dbErr) { setError(dbErr.message); return }
    setDone(true)
    setForm(empty)
    setFile(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  return (
    <section id="contact" style={{ padding: "calc(var(--headH) + 30px) clamp(18px,5vw,60px) 70px" }}>
      <div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span className="overline">لنبدأ الحكاية</span>
          <h2 className="title">تواصل معنا</h2>
          <p className="sub" style={{ maxWidth: 600, margin: "12px auto 0" }}>
            أخبرنا عن مناسبتك — سنعود إليك بتصور فني يناسب ذوقك.
          </p>
        </div>

        <div className="contact-card" style={{ maxWidth: 800, margin: "0 auto" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 12px" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#FBF3F9", marginBottom: 10 }}>تم الإرسال!</div>
              <p style={{ color: "#D9B8D2", fontSize: 16, lineHeight: 1.9 }}>شكراً لتواصلك — سنرد عليك خلال 24 ساعة.</p>
              <button className="btn ghost" onClick={() => setDone(false)} style={{ marginTop: 24 }}>إرسال رسالة أخرى</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="field"><label>الاسم</label><input type="text" value={form.name} onChange={onChange("name")} required /></div>
              <div className="form-row">
                <div className="field"><label>البريد الإلكتروني</label><input type="email" value={form.email} onChange={onChange("email")} required /></div>
                <div className="field"><label>رقم الجوال <span className="hint">(اختياري)</span></label><input type="tel" value={form.phone} onChange={onChange("phone")} dir="ltr" /></div>
              </div>
              <div className="form-row">
                <div className="field"><label>نوع المناسبة</label><input type="text" value={form.projectType} onChange={onChange("projectType")} placeholder="مثال: عرس، تخرج، عيد ميلاد" /></div>
                <div className="field"><label>مساحة القاعة</label><input type="text" value={form.spaceSize} onChange={onChange("spaceSize")} placeholder="مثال: 200 م²" inputMode="numeric" /></div>
              </div>
              <div className="field"><label>الرسالة</label><textarea value={form.message} onChange={onChange("message")} required style={{ minHeight: 120 }} /></div>
              <div className="field">
                <label>مرفقات <span className="hint">(اختياري — صور، PDF)</span></label>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <label htmlFor="c-file" className="btn ghost" style={{ cursor: "pointer", padding: "10px 18px", fontSize: 13, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.3)", color: "#FBF3F9" }}>📎 اختر ملفاً</label>
                  <input ref={fileRef} id="c-file" type="file" accept="image/*,.pdf" onChange={onFileChange} style={{ display: "none" }} />
                  {file && <span className="file-chip">{file.name} <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = "" }} style={{ background: "none", border: "none", color: "#D9B8D2", cursor: "pointer", marginRight: 6 }}>✕</button></span>}
                </div>
              </div>
              {error && <div className="form-error" role="alert">{error}</div>}
              <button className="btn primary" type="submit" disabled={submitting} style={{ justifyContent: "center", width: "100%" }}>{submitting ? "جاري الإرسال…" : "أرسل الرسالة"}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}