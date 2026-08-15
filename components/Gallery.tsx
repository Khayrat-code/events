"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gallery } from "@/lib/data"
import { useTilt } from "@/hooks/useTilt"

const CHIPS = [
  { f: "all", label: "الكل" },
  { f: "ورد", label: "ورد" },
  { f: "تخرج", label: "تخرج" },
  { f: "خطوبة", label: "خطوبة" },
  { f: "ميلاد", label: "ميلاد" },
  { f: "كوش", label: "كوش" },
  { f: "ولائم", label: "ولائم" },
  { f: "داخلي", label: "داخلي" },
  { f: "خارجي", label: "خارجي" },
]

export function Gallery() {
  const [filter, setFilter] = useState("all")
  const [groupIdx, setGroupIdx] = useState(0)
  const [imgIdx, setImgIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const [tour, setTour] = useState(false)
  const touchX = useRef<number | null>(null)

  useTilt("#stage", 5)

  const visible = gallery.filter((g) => filter === "all" || g.cat === filter)
  const currentGroup = gallery[groupIdx]
  const currentImage = currentGroup?.images[imgIdx]
  const totalInGroup = currentGroup?.images.length ?? 0

  function showGroup(i: number) {
    const idx = (i + gallery.length) % gallery.length
    setGroupIdx(idx)
    setImgIdx(0)
  }

  function prevImage() {
    setImgIdx((prev) => (prev - 1 + totalInGroup) % totalInGroup)
  }

  function nextImage() {
    setImgIdx((prev) => (prev + 1) % totalInGroup)
  }

  useEffect(() => {
    if (!tour || !open) return
    const id = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % totalInGroup)
    }, 3000)
    return () => clearInterval(id)
  }, [tour, open, totalInGroup])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function startTour() {
    if (visible.length === 0) return
    setGroupIdx(
      gallery.findIndex((g) => g.cat === visible[0].cat)
    )
    setImgIdx(0)
    setOpen(true)
    setTour(true)
  }

  function stopTour() {
    setTour(false)
    setOpen(false)
  }

  return (
    <>
      <section id="gallery">
        <div className="wrap">
          <div className="g-head reveal">
            <div>
              <span className="overline">مسرح الذكريات</span>
              <h2 className="title" style={{ color: "#fff" }}>
                صورٌ نثرناها… فجمعتها الأضواء
              </h2>
            </div>
            <button
              className="tour-btn"
              onClick={() => {
                if (tour) stopTour()
                else startTour()
              }}
            >
              {tour ? "⏸ إيقاف الجولة" : "▶ جولة تلقائية في الأعمال"}
            </button>
          </div>

          <div className="chips reveal" style={{ ["--d" as string]: ".1s" }}>
            {CHIPS.map((c) => (
              <button
                key={c.f}
                className={`chip${filter === c.f ? " on" : ""}`}
                onClick={() => setFilter(c.f)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div id="stageWrap">
            <div id="stage">
              {gallery.map((g) => {
                const hidden = filter !== "all" && g.cat !== filter
                return (
                  <figure
                    key={g.cat}
                    className={`polaroid${hidden ? " hide" : ""}`}
                    style={{ ["--g1" as string]: g.g1, ["--g2" as string]: g.g2 }}
                    onClick={() => {
                      setGroupIdx(
                        gallery.findIndex(
                          (x) => x.cat === g.cat
                        )
                      )
                      setImgIdx(0)
                      setOpen(true)
                    }}
                  >
                    <div className="ph">
                      {g.images[0] ? (
                        <Image
                          src={g.images[0]}
                          alt={g.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <b>{g.emoji}</b>
                      )}
                    </div>
                    <figcaption>
                      {g.caption} <i>{g.category}</i>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {open && currentGroup && (
        <div
          className="lightbox open"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false)
              setTour(false)
            }
          }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current == null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (dx < -40) nextImage()
            else if (dx > 40) prevImage()
            touchX.current = null
          }}
        >
          <button
            id="lbClose"
            aria-label="إغلاق"
            onClick={() => {
              setOpen(false)
              setTour(false)
            }}
          >
            ✕
          </button>
          <div className="lb-card">
            <div
              className="lb-photo"
              style={{
                ["--g1" as string]: currentGroup.g1,
                ["--g2" as string]: currentGroup.g2,
              }}
            >
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt={`${currentGroup.title} — ${imgIdx + 1}/${totalInGroup}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <span className="kb">{currentGroup.emoji}</span>
              )}
            </div>
            <div className="lb-cap">
              <span>
                {currentGroup.title} ({imgIdx + 1}/{totalInGroup})
              </span>
              <i>{currentGroup.category}</i>
            </div>
            <div className="lb-ctl">
              <button onClick={prevImage}>السابق</button>
              <button onClick={nextImage}>التالي</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}