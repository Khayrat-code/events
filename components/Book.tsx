"use client"

import { useState } from "react"
import { createClient, TABLES } from "@/lib/supabase/client"
import { services } from "@/lib/data"
import type { Dictionary, Locale } from "@/lib/i18n"

/* Canonical Arabic values stored in the DB regardless of page language,
   so the admin dashboard stays consistent. */
const MUSICIAN_VALUES = ["كمنجة", "بيانو", "عود", "ما يحتاجه الموقع"]
const BUDGET_VALUES = [
  "أقل من 5,000 ريال",
  "5,000 – 10,000 ريال",
  "10,000 – 25,000 ريال",
  "25,000 – 50,000 ريال",
  "أكثر من 50,000 ريال",
]

interface BookProps {
  dict: Dictionary["book"]
  lang: Locale
}

export function Book({ dict, lang }: BookProps) {
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      service: String(fd.get("service") || ""),
      musician: String(fd.get("musician") || ""),
      event_date: String(fd.get("event_date") || "") || null,
      budget: String(fd.get("budget") || "") || null,
      message: String(fd.get("message") || dict.defaultMessage),
    }
    const { error: insErr } = await createClient()
      .from(TABLES.contact)
      .insert(payload)
    setLoading(false)
    if (insErr) {
      setError(dict.error)
      return
    }
    form.reset()
    setShow(true)
    setTimeout(() => setShow(false), 3500)
  }

  return (
    <>
      <section id="book">
        <div className="wrap">
          <div className="card reveal ed-panel">
            <span className="overline">{dict.overline}</span>
            <h2 className="title">{dict.title}</h2>
            <p className="sub" style={{ marginBottom: 20 }}>
              {dict.sub}
            </p>
            {error && (
              <div style={{
                background: "rgba(200,70,47,.15)",
                border: "1px solid rgba(200,70,47,.4)",
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 16,
                color: "#e88",
                fontSize: 14,
              }}>
                {error}
              </div>
            )}
            <form onSubmit={onSubmit}>
              <input type="text" name="name" placeholder={dict.namePh} required />
              <input type="email" name="email" placeholder={dict.emailPh} required />
              <input type="tel" name="phone" placeholder={dict.phonePh} required />
              <select name="service" required defaultValue="">
                <option value="" disabled>{dict.typePh}</option>
                {services.map((s) => (
                  <option key={s.num} value={s.title}>{lang === "en" ? s.titleEn : s.title}</option>
                ))}
                <option value="ولائم - شركات">{lang === "en" ? "Banquets - Corporate" : "ولائم - شركات"}</option>
              </select>
              <select name="musician" defaultValue="">
                <option value="" disabled>{dict.musicianPh}</option>
                {dict.musiciansList.map((m, i) => (
                  <option key={m} value={MUSICIAN_VALUES[i]}>{m}</option>
                ))}
              </select>
              <div className="fld">
                <span className="fld-label">{dict.dateLabel}</span>
                <input type="date" name="event_date" required />
              </div>
              <select name="budget" defaultValue="">
                <option value="" disabled>{dict.budgetPh}</option>
                {dict.budgets.map((b, i) => (
                  <option key={b} value={BUDGET_VALUES[i]}>{b}</option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder={dict.messagePh}
                style={{
                  gridColumn: "1 / -1",
                  minHeight: 80,
                  resize: "vertical",
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.2)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  color: "#fff",
                  fontFamily: "inherit",
                  fontSize: ".92rem",
                  outline: "none",
                }}
              />
              <button
                className="btn primary"
                type="submit"
                disabled={loading}
                style={{ justifyContent: "center", gridColumn: "1 / -1" }}
              >
                {loading ? dict.sending : dict.submit}
              </button>
            </form>
            <div className="expect">
              <b>{dict.expect.title}</b>
              <ul>
                {dict.expect.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div id="toast" className={show ? "show" : ""}>
        {dict.toast}
      </div>
    </>
  )
}
