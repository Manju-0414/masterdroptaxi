"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaXmark, FaWhatsapp, FaPhoneVolume, FaCalculator } from "react-icons/fa6";
import { NAV, SITE, telLink, waLink, DEFAULT_WA_TEXT } from "@/data/site";

export default function Header() {
  const path = usePathname();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setStuck(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isAct = (href: string) => (href === "/" ? path === "/" : path?.startsWith(href));

  return (
    <>
      <header className={`hdr ${stuck ? "stuck" : ""}`}>
        <div className="hdr-in">
          <Link href="/" className="brand" aria-label={`${SITE.name} home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.logo} alt={SITE.name} width={126} height={42} />
          </Link>
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className={isAct(n.href) ? "act" : ""}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hdr-act">
            <a href={telLink} className="icon-btn cl" aria-label="Call now" title={`Call ${SITE.phoneDisplay}`}>
              <FaPhoneVolume size={17} />
            </a>
            <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" className="icon-btn wa" aria-label="WhatsApp">
              <FaWhatsapp size={21} />
            </a>
            <Link href="/#estimate" className="btn btn-gold btn-sm">
              <FaCalculator /> Get Estimate
            </Link>
            <button className="icon-btn burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-top">
          <span className="brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.logo} alt={SITE.name} width={126} height={42} />
          </span>
          <button className="icon-btn x-btn" aria-label="Close menu" onClick={() => setOpen(false)}>
            <FaXmark size={20} />
          </button>
        </div>
        <nav>
          {[...NAV, { href: "/faq", label: "FAQ" }].map((n, i) => (
            <Link key={n.href} href={n.href} style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="drawer-cta">
          <a href={telLink} className="btn btn-teal btn-block">
            <FaPhoneVolume /> Call {SITE.phoneDisplay}
          </a>
          <a href={waLink(DEFAULT_WA_TEXT)} target="_blank" rel="noopener" className="btn btn-wa btn-block">
            <FaWhatsapp /> WhatsApp Us
          </a>
          <Link href="/#estimate" className="btn btn-gold btn-block" onClick={() => setOpen(false)}>
            <FaCalculator /> Get Estimate / Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
