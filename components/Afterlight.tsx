import type { Dictionary } from "@/lib/i18n"

export function Afterlight({ dict }: { dict: Dictionary["afterlight"] }) {
  return (
    <section id="afterlight" style={{ padding: "clamp(80px,16vw,160px) clamp(18px,5vw,60px)", textAlign: "center" }}>
      <div className="wrap" style={{ maxWidth: 760, marginInline: "auto" }}>
        <span className="ed-eyebrow">{dict.eyebrow}</span>
        <h2 className="ed-title" style={{ textAlign: "center", fontSize: "clamp(2rem,7vw,3.6rem)" }}>
          {dict.titleA}
          <br />
          {dict.titleB}
        </h2>
        <hr className="ed-rule" style={{ maxWidth: 240, margin: "18px auto" }} />
        <p className="ed-kicker" style={{ maxWidth: "56ch", marginInline: "auto" }}>
          {dict.kicker}
        </p>
      </div>
    </section>
  )
}
