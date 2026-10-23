"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  FaWhatsapp, FaPhoneVolume, FaCalculator, FaArrowLeft, FaArrowRight, FaShieldHalved, FaRoute,
  FaSnowflake, FaUserTie, FaMountainSun, FaUsers, FaCity, FaClock, FaIdCard, FaAward, FaHeadset, FaCarSide, FaFaceSmile,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import HeroScene, { type HeroVariant } from "./HeroScene";
import Slogan from "@/components/ui/Slogan";
import { SITE, STATS, telLink, waLink } from "@/data/site";
import { HOME_SEO } from "@/data/seo";

interface Slide {
  tag: string;
  pre: string;
  gold: string;
  desc: string;
  variant: HeroVariant;
  bg: string;
  badges: { icon: IconType; t: string; s: string; pos: React.CSSProperties }[];
  wa: string;
}

const SLIDES: Slide[] = [
  {
    tag: "Outstation Taxi",
    pre: "Travel Beyond",
    gold: "Boundaries",
    desc: "Comfortable and reliable outstation taxi services for one-way and round trips from Bangalore across Karnataka, Tamil Nadu and beyond.",
    variant: "outstation",
    bg: "radial-gradient(ellipse at 80% 30%, #2f6b82 0%, #0e2233 60%)",
    wa: "Hi, I need an outstation taxi.",
    badges: [
      { icon: FaRoute, t: "One-way & Round", s: "Pay only one side", pos: { top: "8%", left: "-4%" } },
      { icon: FaSnowflake, t: "AC Cars", s: "Clean & sanitised", pos: { top: "30%", right: "-3%" } },
    ],
  },
  {
    tag: "Local Taxi",
    pre: "Your City. Your Ride.",
    gold: "Your Way.",
    desc: "Book a comfortable taxi for local travel, meetings, shopping, family trips and everyday journeys.",
    variant: "city",
    bg: "radial-gradient(ellipse at 80% 30%, #1b3a4e 0%, #07131d 65%)",
    wa: "Hi, I need a local taxi.",
    badges: [
      { icon: FaCity, t: "Local Packages", s: "4 hr / 8 hr", pos: { top: "10%", left: "-4%" } },
      { icon: FaClock, t: "On-time Pickup", s: "24/7 availability", pos: { top: "34%", right: "-3%" } },
    ],
  },
  {
    tag: "Tours & Packages",
    pre: "Discover More.",
    gold: "Travel Better.",
    desc: "Explore beautiful destinations, hill stations, temples and tourist attractions with customised tour packages.",
    variant: "tour",
    bg: "radial-gradient(ellipse at 80% 30%, #2f5d52 0%, #0e2233 60%)",
    wa: "Hi, I want to plan a tour package.",
    badges: [
      { icon: FaMountainSun, t: "Ooty • Kodai • Yercaud", s: "Hill station tours", pos: { top: "8%", left: "-5%" } },
      { icon: FaUserTie, t: "Expert Drivers", s: "Know every ghat road", pos: { top: "32%", right: "-3%" } },
    ],
  },
  {
    tag: "Women's Safety",
    pre: "Travel With",
    gold: "Confidence",
    desc: "Your safety matters. Choose a reliable cab service with driver information and optional passenger safety features.",
    variant: "safety",
    bg: "radial-gradient(ellipse at 80% 30%, #4a3a6b 0%, #0e2233 60%)",
    wa: "Hi, I would like to book a safe cab.",
    badges: [
      { icon: FaIdCard, t: "Driver Details", s: "Shared before trip", pos: { top: "10%", left: "-4%" } },
      { icon: FaShieldHalved, t: "Trip Sharing", s: "Share with family", pos: { bottom: "34%", left: "-6%" } },
    ],
  },
  {
    tag: "Family & Group Travel",
    pre: "One Journey.",
    gold: "Everyone Together.",
    desc: "From comfortable sedans to spacious SUVs and buses, choose the right vehicle for your family or group.",
    variant: "family",
    bg: "radial-gradient(ellipse at 80% 30%, #7a4f24 0%, #0e2233 62%)",
    wa: "Hi, I need a vehicle for a family / group trip.",
    badges: [
      { icon: FaUsers, t: "4 to 7 Seats", s: "Sedan to Innova", pos: { top: "8%", left: "-4%" } },
      { icon: FaCarSide, t: "4 Vehicle Types", s: "Pick what fits", pos: { top: "32%", right: "-3%" } },
    ],
  },
];

const DUR = 5000;
const TRUST_ICONS = [FaAward, FaFaceSmile, FaHeadset, FaSnowflake];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const go = useCallback((n: number) => setI((n + SLIDES.length) % SLIDES.length), []);

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Hold autoplay until the visitor first interacts: every slide change paints a new
  // headline and car photo, and before any input each one counts as a fresh LCP.
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const evts = ["pointermove", "pointerdown", "touchstart", "keydown", "scroll", "wheel"] as const;
    const arm = () => {
      setArmed(true);
      evts.forEach((e) => window.removeEventListener(e, arm));
    };
    evts.forEach((e) => window.addEventListener(e, arm, { passive: true }));
    return () => evts.forEach((e) => window.removeEventListener(e, arm));
  }, []);
  // Slides advance when the active progress bar finishes, so hover-pause stays in sync.
  const onBarEnd = () => {
    if (!reduced) go(i + 1);
  };

  const s = SLIDES[i];
  const trust = [
    { b: `${STATS[0].value}${STATS[0].suffix}`, s: "Years Experience" },
    { b: `${(STATS[1].value / 1000).toFixed(0)}K${STATS[1].suffix}`, s: "Customers Served" },
    { b: "24/7", s: "Support" },
    { b: "Clean", s: "& Comfortable Cars" },
  ];

  return (
    <section className={`hero ${armed ? "" : "hero-idle"}`} id="top">
      <div className="hero-bg" style={{ background: s.bg }}>
        {SITE.heroVideo && <video src={SITE.heroVideo} autoPlay muted loop playsInline />}
      </div>
      <div className="hero-grid-lines" />
      <div className="hero-blob" style={{ background: "#c9a266", left: "-10%", top: "20%" }} />
      <div className="hero-blob" style={{ background: "#2f6b82", right: "-8%", top: "-10%", animationDelay: "-5s" }} />

      <div className="wrap hero-body">
        <div className="hero-main">
        {/* the one page H1 stays fixed for SEO; slide headlines rotate below it */}
        <h1 className="hero-h1">{HOME_SEO.h1}</h1>
        <div className="hero-copy" key={`c${i}`}>
          <span className="hero-tag">
            <b>0{i + 1}</b> {s.tag}
          </span>
          <p className="hero-title">
            {s.pre}
            <span className="gl">{s.gold}</span>
          </p>
          <p className="hero-desc">{s.desc}</p>
          <div className="hero-cta">
            <a href={telLink} className="btn btn-teal">
              <FaPhoneVolume /> Call Now
            </a>
            <a href={waLink(s.wa)} target="_blank" rel="noopener" className="btn btn-wa">
              <FaWhatsapp size={18} /> WhatsApp Us
            </a>
            <Link href="#estimate" className="btn btn-gold">
              <FaCalculator /> Get Estimate
            </Link>
          </div>
          <Slogan />
        </div>
        </div>

        <div className="hero-art" key={`a${i}`}>
          <div className="scene">
            <HeroScene variant={s.variant} priority={i === 0} />
          </div>
          {s.badges.map((b, k) => (
            <div key={k} className="fbadge" style={{ ...b.pos, ["--d" as string]: `${0.5 + k * 0.25}s` }}>
              <i>
                <b.icon size={16} />
              </i>
              <span>
                {b.t}
                <small>{b.s}</small>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-foot">
        <div className="wrap hero-ctrl">
          <div className="hero-count">
            <b>0{i + 1}</b> / 0{SLIDES.length}
          </div>
          <div className="dots" role="tablist" aria-label="Slides">
            {SLIDES.map((sl, k) => (
              <button
                key={k}
                role="tab"
                aria-selected={k === i}
                aria-label={sl.tag}
                className={`dot ${k === i ? "on" : ""} ${k < i ? "done" : ""}`}
                style={{ ["--dur" as string]: `${DUR}ms` }}
                onClick={() => go(k)}
              >
                <span
                  key={`${k}-${i}`}
                  onAnimationEnd={k === i ? onBarEnd : undefined}
                />
              </button>
            ))}
          </div>
          <div className="arrows">
            <button aria-label="Previous slide" onClick={() => go(i - 1)}>
              <FaArrowLeft />
            </button>
            <button aria-label="Next slide" onClick={() => go(i + 1)}>
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="trust">
          {trust.map((t, k) => {
            const I = TRUST_ICONS[k];
            return (
              <div key={k}>
                <i>
                  <I size={22} />
                </i>
                <div>
                  <b>{t.b}</b>
                  <span>{t.s}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
