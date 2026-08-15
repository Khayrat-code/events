export function About() {
  return (
    <section id="about">
      <div className="wrap about-grid">
        <div className="reveal cinema-head" style={{ alignItems: "flex-start", textAlign: "right" }}>
          <span className="ed-eyebrow">لماذا تولكان؟</span>
          <h2 className="title">
            نحن لا نزيّن المكان…
            <br />
            نحن نبني تولكان
          </h2>
          <hr className="ed-rule" style={{ marginInline: "0" }} />
          <p className="sub" style={{ marginTop: 14, color: "var(--c-mist)" }}>
            فريقنا يرافقك من فكرة المناسبة حتى لحظة وداع آخر ضيف: تصميمٌ يخصّك وحدك،
            خاماتٌ فاخرة، وتنفيذٌ دقيق في الموعد.
          </p>
        </div>
        <div className="counters reveal" style={{ ["--d" as string]: ".15s" }}>
          <div className="counter"><b><span className="num" data-n="350">0</span><span className="s">+</span></b><span className="label">حفل ناجح</span></div>
          <div className="counter"><b><span className="num" data-n="120">0</span><span className="s">+</span></b><span className="label">كوشة مصمّمة</span></div>
          <div className="counter"><b><span className="num" data-n="98">0</span><span className="s">٪</span></b><span className="label">رضا العملاء</span></div>
        </div>
      </div>
    </section>
  )
}