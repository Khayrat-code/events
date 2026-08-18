"use client"

import { useRef, useState, type FormEvent } from "react"
import { createClient, TABLES, BUCKETS } from "@/lib/supabase/client"
import { getDictionary, isLocale } from "@/lib/i18n"

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

export default function ContactPage({ params }: { params: { lang: string } }) {
  const t = getDictionary(isLocale(params.lang) ? params.lang : "ar").contactPage
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
    if (f && f.size > MAX_FILE_BYTES) { setError(t.errFile); return }
    setFile(f)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { setError(t.errRequired); return }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) { setError(t.errEmail); return }
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

    const message = [`[${form.projectType || "—"}]`, form.spaceSize ? `${form.spaceSize} ${t.sizeUnit}` : "", "", form.message.trim()].filter(Boolean).join("\n")

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
          <span className="overline">{t.overline}</span>
          <h2 className="title">{t.title}</h2>
          <p className="sub" style={{ maxWidth: 600, margin: "12px auto 0" }}>
            {t.sub}
          </p>
        </div>

        <div className="contact-card" style={{ maxWidth: 800, margin: "0 auto" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 12px" }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#FBF3F9", marginBottom: 10 }}>{t.doneTitle}</div>
              <p style={{ color: "#D9B8D2", fontSize: 16, lineHeight: 1.9 }}>{t.doneBody}</p>
              <button className="btn ghost" onClick={() => setDone(false)} style={{ marginTop: 24 }}>{t.sendAnother}</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="field"><label>{t.nameLabel}</label><input type="text" value={form.name} onChange={onChange("name")} required /></div>
              <div className="form-row">
                <div className="field"><label>{t.emailLabel}</label><input type="email" value={form.email} onChange={onChange("email")} required /></div>
                <div className="field"><label>{t.phoneLabel} <span className="hint">{t.optional}</span></label><input type="tel" value={form.phone} onChange={onChange("phone")} dir="ltr" /></div>
              </div>
              <div className="form-row">
                <div className="field"><label>{t.typeLabel}</label><input type="text" value={form.projectType} onChange={onChange("projectType")} placeholder={t.typePh} /></div>
                <div className="field"><label>{t.sizeLabel}</label><input type="text" value={form.spaceSize} onChange={onChange("spaceSize")} placeholder={t.sizePh} inputMode="numeric" /></div>
              </div>
              <div className="field"><label>{t.messageLabel}</label><textarea value={form.message} onChange={onChange("message")} required style={{ minHeight: 120 }} /></div>
              <div className="field">
                <label>{t.attachmentsLabel} <span className="hint">{t.attachmentsHint}</span></label>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <label htmlFor="c-file" className="btn ghost" style={{ cursor: "pointer", padding: "10px 18px", fontSize: 13, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.3)", color: "#FBF3F9" }}>{t.chooseFile}</label>
                  <input ref={fileRef} id="c-file" type="file" accept="image/*,.pdf" onChange={onFileChange} style={{ display: "none" }} />
                  {file && <span className="file-chip">{file.name} <button type="button" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = "" }} style={{ background: "none", border: "none", color: "#D9B8D2", cursor: "pointer", marginRight: 6 }}>✕</button></span>}
                </div>
              </div>
              {error && <div className="form-error" role="alert">{error}</div>}
              <button className="btn primary" type="submit" disabled={submitting} style={{ justifyContent: "center", width: "100%" }}>{submitting ? t.sending : t.submit}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
