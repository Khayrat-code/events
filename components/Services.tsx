import Image from "next/image"
import { services } from "@/lib/data"

export function Services() {
  return (
    <section id="services" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="reveal" style={{ textAlign: "center" }}>
          <span className="overline">تخصصاتنا الثمانية</span>
          <h2 className="title">مرّر لتشاهد الفصول تتراكب</h2>
        </div>
        <div className="stack">
          {services.map((s, i) => (
            <article
              key={s.num}
              className={`scard ${s.colorClass}${s.isLight ? " light" : ""}`}
              style={{ ["--i" as string]: i }}
            >
              <div>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <div className="tags">
                  {s.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
              <div className="art">
                {s.image ? (
                  <div className="cover">
                    <Image src={s.image} alt={s.title} fill style={{ objectFit: "cover" }} />
                  </div>
                ) : (
                  <b>{s.emoji}</b>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}