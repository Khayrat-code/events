"use client"

import { useState } from "react"
import { createClient, TABLES } from "@/lib/supabase/client"
import { services } from "@/lib/data"

const MUSICIANS = ["كمنجة", "بيانو", "عود", "ما يحتاجه الموقع"]

const BUDGETS = [
  "أقل من 5,000 ريال",
  "5,000 – 10,000 ريال",
  "10,000 – 25,000 ريال",
  "25,000 – 50,000 ريال",
  "أكثر من 50,000 ريال",
]

export function Book() {
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
      message: String(fd.get("message") || "أرغب بحجز موعد"),
    }
    const { error: insErr } = await createClient()
      .from(TABLES.contact)
      .insert(payload)
    setLoading(false)
    if (insErr) {
      setError("صار خطأ بالإرسال، جرب مرة ثانية")
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
            <span className="overline">خلّينا نبدأ الحكاية</span>
            <h2 className="title">تاريخك محجوز للفرح</h2>
            <p className="sub" style={{ marginBottom: 20 }}>
              املأ بياناتك وراح يوصلنا مباشرة، ونتواصل معك بأسرع وقت
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
              <input type="text" name="name" placeholder="الاسم" required />
              <input type="email" name="email" placeholder="الإيميل" required />
              <input type="tel" name="phone" placeholder="رقم الجوال" required />
              <select name="service" required defaultValue="">
                <option value="" disabled>نوع المناسبة</option>
                {services.map((s) => (
                  <option key={s.num} value={s.title}>{s.title}</option>
                ))}
              </select>
              <select name="musician" defaultValue="">
                <option value="" disabled>تحب عازف معين؟</option>
                {MUSICIANS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <div className="fld">
                <span className="fld-label">تاريخ المناسبة</span>
                <input type="date" name="event_date" required />
              </div>
              <select name="budget" defaultValue="">
                <option value="" disabled>الميزانية التقريبية</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <textarea
                name="message"
                placeholder="أي تفاصيل إضافية تبي نعرفها؟"
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
                {loading ? "جارٍ الإرسال…" : "أرسل طلبك"}
              </button>
            </form>
            <div className="expect">
              <b>ما الذي يمكن توقعه:</b>
              <ul>
                <li>سيتم الرد شخصيا من قبل فريقنا في غضون 48 ساعة.</li>
                <li>محادثة، وليست مكالمة مبيعات.</li>
                <li>سرية تامة وتكتم كامل.</li>
                <li>لا يوجد التزام بالمتابعة.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div id="toast" className={show ? "show" : ""}>
        وصلتنا طلبك — راح نتواصل معك قريب
      </div>
    </>
  )
}
