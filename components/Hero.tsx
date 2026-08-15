"use client"

import { useEffect } from "react"
import Image from "next/image"
import { useTilt } from "@/hooks/useTilt"

export function Hero() {
  useEffect(() => {
    const t = setTimeout(
      () => document.querySelector(".hero")?.classList.add("in"),
      150
    )
    return () => clearTimeout(t)
  }, [])

  useTilt("#glassCard", 9)

  return (
    <section className="hero" id="top">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="hero-grid">
        <div>
          <span className="badge">
            <i /> مؤسسة تولكان لتنسيق الحفلات
          </span>
          <h1>
            <span className="w"><span className="wi" style={{ ["--d" as string]: ".1s" }}>نحوّلُ</span></span>
            <span className="w"><span className="wi" style={{ ["--d" as string]: ".2s" }}>مناسبتكَ</span></span>
            <span className="w"><span className="wi" style={{ ["--d" as string]: ".3s" }}>إلى</span></span>
            <span className="w"><span className="wi" style={{ ["--d" as string]: ".4s" }}><em>حكايةٍ</em></span></span>
            <span className="w"><span className="wi" style={{ ["--d" as string]: ".5s" }}>تُروى</span></span>
          </h1>
          <p className="lead">
            من أول وردةٍ في الممرّ إلى آخر إضاءةٍ في القاعة: تنسيق ورد، كوش، أعراس،
            تخرّج، أعياد ميلاد وولائم — بتفاصيل فنية تليق بذوقك.
          </p>
          <div className="hero-cta">
            <a className="btn primary" href="#gallery">
              استعرض أعمالنا
            </a>
            <a className="btn ghost" href="#book">
              تواصل معنا للحجز
            </a>
          </div>
          <div className="stats">
            <div><b><span className="num" data-n="350">0</span><span className="s">+</span></b><span>مناسبة منسّقة</span></div>
            <div><b><span className="num" data-n="8">0</span></b><span>تخصصات تنسيق</span></div>
            <div><b><span className="num" data-n="10">0</span></b><span>سنوات من الشغف</span></div>
          </div>
        </div>
        <div className="glass-wrap">
          <div id="glassCard" style={{ overflow: "hidden" }}>
            <Image src="/hero-cup.jpg" alt="كأسان احتفال" fill style={{ objectFit: "cover" }} />
            <span className="spark" style={{ top: "14%", insetInlineStart: "16%" }}>✦</span>
            <span className="spark" style={{ top: "24%", insetInlineEnd: "14%", animationDelay: ".8s" }}>✦</span>
            <span className="spark" style={{ bottom: "26%", insetInlineStart: "20%", animationDelay: "1.5s" }}>✦</span>
          </div>
        </div>
      </div>
      <div className="scroll-hint">⌄</div>
    </section>
  )
}