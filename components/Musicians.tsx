"use client"

import Image from "next/image"
import type { Dictionary } from "@/lib/i18n"

export function Musicians({ dict }: { dict: Dictionary["musicians"] }) {
  return (
    <section id="musicians">
      <div className="wrap">
        <div className="cinema-head reveal">
          <span className="ed-eyebrow">{dict.eyebrow}</span>
          <h2 className="title">{dict.title}</h2>
          <hr className="ed-rule" />
        </div>
        <div className="music-grid reveal" style={{ ["--d" as string]: ".1s" }}>
          {dict.items.map((m) => (
            <article key={m.name} className="music-card ed-panel">
              <div className="music-img">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="240px"
                  style={{ objectFit: "contain" }}
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
