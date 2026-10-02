import { cdn } from "@/lib/cdn";

export type HeroVariant = "outstation" | "city" | "tour" | "safety" | "family";

// backdrop glow colour per slide
const GLOW: Record<HeroVariant, string> = {
  outstation: "#2f6b82",
  city: "#3d6a86",
  tour: "#4f8a7b",
  safety: "#5a3f7a",
  family: "#a06a33",
};

const CAR: Record<HeroVariant, { file: string; alt: string }> = {
  outstation: { file: "etios-runing.jpeg", alt: "Etios sedan for outstation trips" },
  city: { file: "Swift-runing.jpeg", alt: "Swift for local city rides" },
  tour: { file: "Innova-runing.png", alt: "Innova for tours and packages" },
  safety: { file: "Aura-runing.jpeg", alt: "Aura sedan for safe travel" },
  family: { file: "KIA-running.jpeg", alt: "KIA for family and group travel" },
};

export default function HeroScene({ variant }: { variant: HeroVariant }) {
  const car = CAR[variant];
  return (
    <div className="frame hero-photo" style={{ ["--glow" as string]: GLOW[variant] }}>
      <svg className="hero-scene-svg" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {/* road */}
        <rect x="0" y="392" width="600" height="88" fill="#0b141c" />
        <rect x="0" y="392" width="600" height="4" fill="#c9a266" opacity="0.7" />
        <line x1="0" y1="440" x2="600" y2="440" stroke="#f2f4f6" strokeWidth="5" opacity="0.8" className="road-dash" style={{ animationDuration: ".35s" }} />
        <g className="para-near" opacity="0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={i * 150} y="470" width="60" height="4" fill="#c9a266" />
          ))}
        </g>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cdn(car.file)} alt={car.alt} className="hero-car-img" />
    </div>
  );
}
