import { Logo } from "./Logo"

/* ============ Inline SVG brand/trust icons ============ */

function MawthoogIcon({ size = 36 }: { size?: number }) {
  return (
    <span className="trust-badge" style={{ width: size, height: size, borderRadius: 999, background: "#0E5A36" }}>
      <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill="none">
        <path d="M12 2.5 L19.5 5.5 V11.5 C19.5 16 15.5 19.5 12 20.5 C8.5 19.5 4.5 16 4.5 11.5 V5.5 Z" fill="#F5F1EA" />
        <path d="M8.3 12 L11 14.7 L15.7 9.5" stroke="#0E5A36" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </span>
  )
}

function CRIcon({ size = 36 }: { size?: number }) {
  return (
    <span className="trust-badge" style={{ width: size, height: size, borderRadius: 8, background: "rgba(245, 241, 234, 0.08)", border: "1px solid rgba(245, 241, 234, 0.18)" }}>
      <svg viewBox="0 0 24 24" width={size * 0.56} height={size * 0.56} fill="none">
        <rect x="4" y="2.5" width="16" height="19" rx="1.5" fill="#F5F1EA" />
        <rect x="6.5" y="6" width="11" height="1.6" fill="#B8835A" />
        <rect x="6.5" y="9.4" width="11" height="1" fill="#421D36" />
        <rect x="6.5" y="12.4" width="7.5" height="1" fill="#8E8E8E" />
        <rect x="6.5" y="15.4" width="9" height="1" fill="#8E8E8E" />
        <circle cx="15.5" cy="18.8" r="1.6" fill="#B8835A" />
      </svg>
    </span>
  )
}

function BankIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 L21 8.5 H3 Z" /><path d="M5 8.5V18M9 8.5V18M12 8.5V18M15 8.5V18M19 8.5V18" /><path d="M3 18h18" /><path d="M3 21h18" />
    </svg>
  )
}

function CodIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="6.5" width="19" height="12" rx="2" /><circle cx="12" cy="12.5" r="2.6" /><path d="M5.5 6.5v-1a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function SnapchatIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
    </svg>
  )
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
    </svg>
  )
}

/* ============ Payment badge helpers ============ */

function PaymentBadge({ src, label }: { src: string; label: string }) {
  return (
    <span className="pay-badge" title={label} aria-label={label}>
      <img src={src} alt={label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
    </span>
  )
}

function TextBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="pay-badge pay-badge-text">
      <span className="pay-badge-icon">{icon}</span>
      {label}
    </span>
  )
}

/* ============ Footer ============ */

const SOCIALS = [
  { key: "tiktok", href: "https://www.tiktok.com/@toolcan.sa", label: "TikTok", Icon: TikTokIcon },
  { key: "snap", href: "https://www.snapchat.com/add/toolcan.sa", label: "Snapchat", Icon: SnapchatIcon },
  { key: "instagram", href: "https://www.instagram.com/toolcan.sa", label: "Instagram", Icon: InstagramIcon },
  { key: "x", href: "https://x.com/toolcan_", label: "X", Icon: XIcon },
]

const PAYMENTS: Array<{ key: string; label: string; src?: string; generic?: "bank" | "cod" }> = [
  { key: "mada", label: "مدى", src: "/payments/mada.svg" },
  { key: "visa", label: "Visa", src: "/payments/visa.svg" },
  { key: "mastercard", label: "Mastercard", src: "/payments/mastercard.svg" },
  { key: "amex", label: "أمريكان إكسبريس", src: "/payments/amex.svg" },
  { key: "tabby", label: "تابي", src: "/payments/tabby.svg" },
  { key: "tamara", label: "تمارا", src: "/payments/tamara.svg" },
  { key: "bank", label: "تحويل بنكي", generic: "bank" },
  { key: "cod", label: "الدفع عند الاستلام", generic: "cod" },
]

export function Footer() {
  return (
    <footer>
      <div className="f-grid">
        {/* Col 1 — Brand */}
        <div>
          <a className="logo" href="#top">
            <Logo size="lg" tone="light" />
          </a>
          <p style={{ opacity: 0.85, fontSize: ".9rem", marginTop: 12, maxWidth: "36ch", color: "inherit" }}>
            مؤسسة متخصصة لتنسيق الحفلات والمناسبات — نحول التفاصيل إلى ذكريات.
          </p>
          <a className="wa" href="https://wa.me/966583131400" style={{ marginTop: 16 }}>
            💬 واتساب مباشر
          </a>
        </div>

        {/* Col 2 — Quick links */}
        <div>
          <h4>روابط سريعة</h4>
          <a href="#services">تنسيق ورد</a>
          <a href="#services">كوش أفراح</a>
          <a href="#services">حفلات تخرج</a>
          <a href="#services">أعياد ميلاد</a>
          <a href="#services">ولائم</a>
          <a href="/complaints" className="f-complaints">الشكاوي والاقتراحات</a>
        </div>

        {/* Col 3 — Contact + Trust */}
        <div>
          <h4>تواصل</h4>
          <a href="tel:+966583131400"><span dir="ltr">0583 131 400</span></a>
          <a href="mailto:toolcan.events@gmail.com"><span dir="ltr">toolcan.events@gmail.com</span></a>
          <a href="#">الرياض — المملكة العربية السعودية</a>

          {/* Trust section */}
          <div className="f-trust-card">
            <MawthoogIcon size={40} />
            <div className="f-trust-text">
              <span className="f-trust-main">موثوق</span>
              <span className="f-trust-sub">موثوق منصة الأعمال</span>
            </div>
          </div>

          <div className="f-cr">
            <CRIcon size={36} />
            <span>السجل التجاري: <span dir="ltr" className="f-cr-num">7054962811</span></span>
          </div>
        </div>
      </div>

      {/* Payments row */}
      <div className="f-pay">
        <span className="f-pay-label">طرق الدفع</span>
        <div className="f-pay-chips">
          {PAYMENTS.map((p) =>
            p.generic ? (
              <TextBadge key={p.key} icon={p.generic === "bank" ? <BankIcon size={15} /> : <CodIcon size={15} />} label={p.label} />
            ) : (
              <PaymentBadge key={p.key} src={p.src!} label={p.label} />
            )
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="f-bottom">
        <span>© 2026 TOOLCAN</span>
        <div className="f-socs">
          {SOCIALS.map((s) => (
            <a key={s.key} href={s.href} target="_blank" rel="noreferrer" className="f-soc" aria-label={s.label} title={s.label}>
              <s.Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}