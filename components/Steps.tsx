const STEPS = [
  { n: "١", title: "نسمع حكايتك", text: "جلسة تعارف مجانية نفهم فيها ذوقك، عدد ضيوفك، وميزانيتك — بلا وعودٍ فضفاضة." },
  { n: "٢", title: "نرسم المشهد", text: "مخطط ألوان وخامات وإضاءة واضح، مع تصور مبدئي ترى به حفلتك قبل أن تُقام." },
  { n: "٣", title: "نجهّز وننسّق", text: "فريقنا يدخل القاعة قبلك بساعات: يُركّب، يرتّب، ويفحص كل تفصيلة على checklist." },
  { n: "٤", title: "تستمتع أنت", text: "تحضر كضيف شرفٍ في مناسبتك، ونحن نتولى الكواليس حتى آخر ضيف." },
]

export function Steps() {
  return (
    <section id="steps">
      <div className="wrap">
        <div className="cinema-head reveal">
          <span className="ed-eyebrow">خطوات العمل معنا</span>
          <h2 className="title">أربع خطوات… وتقام الحفلة</h2>
          <hr className="ed-rule" />
        </div>
        <div className="steps" id="stepsLine">
          {STEPS.map((s, i) => (
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