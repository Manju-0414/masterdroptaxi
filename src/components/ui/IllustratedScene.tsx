import VehicleArt from "@/components/ui/VehicleArt";
import type { VehicleShape } from "@/data/vehicles";
import type { HeroVariant } from "@/components/home/HeroScene";

/** Drawn highway scene with a car icon — used in the inner-page banners. */
const SKY: Record<HeroVariant, [string, string, string]> = {
  outstation: ["#12324a", "#2f6b82", "#e7b574"],
  city: ["#0b1826", "#1b3a4e", "#3d6a86"],
  tour: ["#1f4a3f", "#4f8a7b", "#f1d39b"],
  safety: ["#2a1f45", "#5a3f7a", "#e39f9f"],
  family: ["#3b2a17", "#a06a33", "#f4d59a"],
};

const CAR: Record<HeroVariant, { shape: VehicleShape; color: string }> = {
  outstation: { shape: "sedan", color: "#f2f4f6" },
  city: { shape: "compact", color: "#e8a93a" },
  tour: { shape: "muv", color: "#f2f4f6" },
  safety: { shape: "sedan", color: "#2f6b82" },
  family: { shape: "suv", color: "#0e2233" },
};

function hills(y: number, amp: number, period = 300) {
  // one period of rolling hills, tiled 4× so it can loop by translating -period
  let d = `M0,${y}`;
  for (let i = 0; i < 4; i++) {
    const x = i * period;
    d += ` Q${x + period * 0.25},${y - amp} ${x + period * 0.5},${y} T${x + period},${y}`;
  }
  return d + ` L${period * 4},480 L0,480 Z`;
}

export default function IllustratedScene({ variant }: { variant: HeroVariant }) {
  const [a, b, c] = SKY[variant];
  const car = CAR[variant];
  const gid = `hs-${variant}`;
  return (
    <div className="frame">
      <svg className="hero-scene-svg" viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`${gid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={a} />
            <stop offset="0.6" stopColor={b} />
            <stop offset="1" stopColor={c} />
          </linearGradient>
          <radialGradient id={`${gid}-sun`}>
            <stop offset="0" stopColor="#fff4d6" />
            <stop offset="1" stopColor="#fff4d6" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="600" height="480" fill={`url(#${gid}-sky)`} />
        <circle cx="440" cy={variant === "city" ? 110 : 250} r="120" fill={`url(#${gid}-sun)`} opacity="0.55" />
        <circle cx="440" cy={variant === "city" ? 110 : 250} r={variant === "city" ? 26 : 44} fill="#fff4d6" opacity="0.9" />

        {variant === "city" &&
          Array.from({ length: 40 }).map((_, i) => (
            <circle key={i} cx={(i * 137) % 600} cy={(i * 71) % 200} r={i % 3 ? 1 : 1.6} fill="#fff" opacity="0.6" className="headlight" style={{ animationDelay: `${(i % 7) * 0.3}s` }} />
          ))}

        {/* far layer */}
        <g className="para-far">
          {variant === "city" ? (
            <g fill="#0a1520" opacity="0.8">
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 80 + ((i * 53) % 120);
                return <rect key={i} x={i * 50} y={380 - h} width="42" height={h} />;
              })}
            </g>
          ) : (
            <path d={hills(330, 90)} fill="#0e2233" opacity="0.28" />
          )}
        </g>
        {/* mid layer */}
        <g className="para-mid">
          {variant === "city" ? (
            <g>
              {Array.from({ length: 24 }).map((_, i) => {
                const h = 50 + ((i * 37) % 90);
                return (
                  <g key={i}>
                    <rect x={i * 50 + 10} y={380 - h} width="34" height={h} fill="#132636" />
                    <rect x={i * 50 + 16} y={390 - h} width="5" height="5" fill="#ffd27a" opacity="0.8" />
                    <rect x={i * 50 + 30} y={402 - h} width="5" height="5" fill="#ffd27a" opacity="0.6" />
                  </g>
                );
              })}
            </g>
          ) : (
            <path d={hills(360, 50)} fill="#0e2233" opacity="0.45" />
          )}
          {variant === "tour" &&
            Array.from({ length: 8 }).map((_, i) => (
              <path key={i} d={`M${i * 150 + 40},352 l-14,0 l14,-44 l14,44 Z`} fill="#0e2233" opacity="0.7" />
            ))}
          {variant === "family" &&
            Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`translate(${i * 150 + 60} 330)`} opacity="0.55" fill="#2a1408">
                <path d="M0,40 L6,18 L30,18 L36,40 Z M8,18 L12,4 L24,4 L28,18 Z M13,4 Q18,-6 23,4 Z" />
              </g>
            ))}
        </g>

        {/* safety shield */}
        {variant === "safety" && (
          <g transform="translate(430 150)" style={{ animation: "float 5s ease-in-out infinite" }}>
            <circle r="80" fill="#fff" opacity="0.08" />
            <path d="M0,-58 L46,-40 L46,4 Q46,42 0,62 Q-46,42 -46,4 L-46,-40 Z" fill="#fff" opacity="0.92" />
            <path d="M-20,2 L-5,18 L24,-14" stroke="#2f6b82" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="70" strokeDashoffset="70" style={{ animation: "drawLine 1s 0.6s ease forwards" }} />
          </g>
        )}

        {/* road */}
        <rect x="0" y="380" width="600" height="100" fill="#15212c" />
        <rect x="0" y="380" width="600" height="6" fill="#c9a266" opacity="0.8" />
        <line x1="0" y1="432" x2="600" y2="432" stroke="#f2f4f6" strokeWidth="5" className="road-dash" style={{ animationDuration: ".35s" }} />
        <g className="para-near" opacity="0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <rect key={i} x={i * 150} y="468" width="60" height="4" fill="#c9a266" />
          ))}
        </g>
        {/* speed lines */}
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={520 - i * 30} y={300 + i * 18} width={60 + i * 10} height="2" rx="1" fill="#fff" opacity="0.6" className="speed" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
      </svg>
      {variant === "family" && <VehicleArt shape="muv" color="#c9a266" taxi={false} className="hero-car second" />}
      <VehicleArt shape={car.shape} color={car.color} beam className="hero-car" />
    </div>
  );
}
