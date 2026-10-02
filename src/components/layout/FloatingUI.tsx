"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaPhoneVolume, FaChevronUp, FaCalculator } from "react-icons/fa6";
import { telLink, waLink, DEFAULT_WA_TEXT } from "@/data/site";

/** Scroll progress bar + floating WhatsApp/Call rail + mobile sticky bottom bar. */
export default function FloatingUI() {
  const [showTop, setShowTop] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 600);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <div ref={bar} className="progress-top" style={{ transform: "scaleX(0)" }} />
      <div className="rail">
        <button className={`tp ${showTop ? "show" : ""}`} aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <FaChevronUp />
        </button>
        <a className="cl" href={telLink} aria-label="Call now">
          <FaPhoneVolume size={20} />
          <span className="tip">Call now</span>
        </a>
        <a className="wa" href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
          <FaWhatsapp size={28} />
          <span className="tip">Chat on WhatsApp</span>
        </a>
      </div>
      <nav className="mbar" aria-label="Quick actions">
        <a href={telLink} className="c">
          <FaPhoneVolume size={18} /> Call
        </a>
        <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" className="w">
          <FaWhatsapp size={20} /> WhatsApp
        </a>
        <Link href="/#estimate" className="b">
          <FaCalculator size={18} /> Book
        </Link>
      </nav>
    </>
  );
}
