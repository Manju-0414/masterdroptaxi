"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import PackageCard from "./PackageCard";
import type { TourPackage } from "@/data/packages";

const AUTOPLAY_MS = 5000;
/** after the user touches / clicks, wait this long before auto-scrolling again */
const RESUME_AFTER_MS = 8000;

/**
 * Horizontal package carousel: centre card highlighted, left / right arrows,
 * auto-advances every 5s (pauses on hover, touch, focus, hidden tab or reduced motion).
 */
export default function PackageRail({ items, label }: { items: TourPackage[]; label: string }) {
  const rail = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(0);
  const hovering = useRef(false);
  const pausedUntil = useRef(0);
  const visible = useRef(false);

  const slides = () => Array.from(rail.current?.children ?? []) as HTMLElement[];

  const goTo = useCallback((i: number, smooth = true) => {
    const el = rail.current;
    const list = slides();
    if (!el || !list.length) return;
    const k = ((i % list.length) + list.length) % list.length;
    const s = list[k];
    el.scrollTo({ left: s.offsetLeft - (el.clientWidth - s.offsetWidth) / 2, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Track which card is closest to the centre.
  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    slides().forEach((s, i) => {
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setCenter(best);
  }, []);

  // Start with the second card centred so the rail doesn't open on an empty left gap.
  useEffect(() => {
    goTo(items.length > 2 ? 1 : 0, false);
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [goTo, measure, items.length]);

  // Only auto-play while the section is on screen.
  useEffect(() => {
    const el = rail.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (hovering.current || document.hidden || !visible.current || Date.now() < pausedUntil.current) return;
      const n = slides().length;
      goTo(center + 1 >= n ? 0 : center + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [center, goTo]);

  const pause = () => (pausedUntil.current = Date.now() + RESUME_AFTER_MS);

  const raf = useRef(0);
  const onScroll = () => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(measure);
  };

  return (
    <div
      className="pkg-carousel"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      onTouchStart={pause}
      onFocusCapture={pause}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <button type="button" className="rail-arrow prev" aria-label="Previous package" onClick={() => { pause(); goTo(center - 1); }}>
        <FaChevronLeft />
      </button>
      <div className="pkg-rail" ref={rail} onScroll={onScroll}>
        {items.map((p, i) => (
          <div key={p.id} className={`pkg-slide ${i === center ? "is-center" : ""}`} onClick={() => i !== center && (pause(), goTo(i))}>
            <PackageCard p={p} />
          </div>
        ))}
      </div>
      <button type="button" className="rail-arrow next" aria-label="Next package" onClick={() => { pause(); goTo(center + 1); }}>
        <FaChevronRight />
      </button>
      <div className="rail-dots" aria-hidden="true">
        {items.map((p, i) => (
          <button key={p.id} type="button" tabIndex={-1} className={i === center ? "on" : ""} onClick={() => { pause(); goTo(i); }} />
        ))}
      </div>
    </div>
  );
}
