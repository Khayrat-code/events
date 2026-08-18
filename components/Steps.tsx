import type { Dictionary } from "@/lib/i18n"

export function Steps({ dict }: { dict: Dictionary["steps"] }) {
  return (
    <section id="steps">
      <div className="wrap">
        <div className="cinema-head reveal">
          <span className="ed-eyebrow">{dict.eyebrow}</span>
          <h2 className="title">{dict.title}</h2>
          <hr className="ed-rule" />
        </div>
        <div className="steps" id="stepsLine">
          {dict.items.map((s, i) => (
            <div
              key={s.n}
              className="step reveal"
              style={i ? { ["--d" as string]: `.${i}s` } : undefined}
            >
              <span className="n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
