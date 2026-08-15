"use client"

import { useState } from "react"

export function Book() {
  const [show, setShow] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShow(true)
    e.currentTarget.reset()
    setTimeout(() => setShow(false), 3500)
  }

  return (
    <>
      <section id="book">
        <div className="wrap">
          <div className="card reveal">
            <span
              className="overline"
              style={{ background: "rgba(255,255,255,.12)", color: "var(--mid)" }}
            >
              لنبدأ الحكاية
            </span>
            <h2 className="title" style={{ color: "#fff" }}>
              تاريخك محجوزٌ للفرح
            </h2>
            <form onSubmit={onSubmit}>
              <input type="text" placeholder="الاسم الكريم" required />
              <input type="tel" placeholder="رقم الجوال" required />
              <select required defaultValue="">
                <option value="" disabled>
                  نوع المناسبة…
                </option>
                <option>تنسيق ورد</option>
                <option>حفل تخرج</option>
                <option>خطوبة</option>
                <option>عيد ميلاد</option>
                <option>كوش أفراح</option>
                <option>ولائم</option>
                <option>تنسيق داخلي كامل</option>
                <option>تنسيق خارجي كامل</option>
              </select>
              <input type="date" required />
              <button
                className="btn primary"
                type="submit"
                style={{ justifyContent: "center" }}
              >
                أرسل طلب الحجز
              </button>
            </form>
          </div>
        </div>
      </section>
      <div id="toast" className={show ? "show" : ""}>
        تم استلام طلبك بنجاح — سنتواصل معك قريبًا
      </div>
    </>
  )
}