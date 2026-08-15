"use client"

import Image from "next/image"

const MUSICIANS = [
  {
    img: "/violin.png",
    name: "كمنجة",
    desc: "نغمات الكمنجة تضيف لمسة راقية تكمل أجواء مناسبتك",
  },
  {
    img: "/piano.png",
    name: "بيانو",
    desc: "ألحان البيانو تعطي لحظاتك طابعًا دافئ وأنيق",
  },
  {
    img: "/oud.png",
    name: "عود",
    desc: "صوت العود ياخذك لأجواء عربية أصيلة تفرح القلب",
  },
]

export function Musicians() {
  return (
    <section id="musicians">
      <div className="wrap">
        <div className="cinema-head reveal">
          <span className="ed-eyebrow">موسيقى حية</span>
          <h2 className="title">عازفين على مهارة وفن</h2>
          <hr className="ed-rule" />
        </div>
        <div className="music-grid reveal" style={{ ["--d" as string]: ".1s" }}>
          {MUSICIANS.map((m) => (
            <article key={m.name} className="music-card ed-panel">
              <div className="music-img">
                <Image
                  src={m.img}
                  alt={m.name}
                  width={300}
                  height={300}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </div>
              <h3>{m.name}</h3>
              <p>{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
