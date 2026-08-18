import type { Dictionary } from "@/lib/i18n"

export function About({ dict }: { dict: Dictionary["about"] }) {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="reveal cinema-head about-head">
          <span className="ed-eyebrow">{dict.eyebrow}</span>
          <h2 className="title">
            {dict.titleA}
            <br />
            {dict.titleB}
          </h2>
          <hr className="ed-rule" style={{ marginInline: "0" }} />
          <p className="sub" style={{ marginTop: 14, color: "var(--c-mist)" }}>
            {dict.sub}
          </p>
        </div>
        <div className="counters reveal" style={{ ["--d" as string]: ".15s" }}>
          <div className="counter"><b><span className="num" data-n="350">0</span><span className="s">+</span></b><span className="label">{dict.counters[0].label}</span></div>
          <div className="counter"><b><span className="num" data-n="120">0</span><span className="s">+</span></b><span className="label">{dict.counters[1].label}</span></div>
          <div className="counter"><b><span className="num" data-n="98">0</span><span className="s">٪</span></b><span className="label">{dict.counters[2].label}</span></div>
        </div>
      </div>
    </section>
  )
}
