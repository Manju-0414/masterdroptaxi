import type { VehicleShape } from "@/data/vehicles";

/** Original side-view vehicle illustrations (generic shapes, no brand likeness). */
const BODIES: Record<VehicleShape, { body: string; windows: string[]; wheels: [number, number]; roof: number }> = {
  sedan: {
    body: "M20,70 L20,58 Q22,50 34,48 L70,44 L98,26 Q104,22 114,22 L160,22 Q170,22 178,30 L196,46 L218,50 Q228,52 228,62 L228,70 Z",
    windows: ["M103,31 L136,29 L136,44 L80,44 Z", "M142,29 L170,30 L186,44 L142,44 Z"],
    wheels: [62, 186],
    roof: 22,
  },
  compact: {
    body: "M22,72 L22,52 Q24,44 36,42 L64,40 L88,20 Q92,16 100,16 L170,16 Q178,16 184,24 L200,42 L220,46 Q228,48 228,58 L228,72 Z",
    windows: ["M95,24 L132,22 L132,40 L72,40 Z", "M138,22 L172,23 L190,40 L138,40 Z"],
    wheels: [64, 188],
    roof: 16,
  },
  suv: {
    body: "M18,72 L18,50 Q18,40 30,38 L60,36 L78,16 Q82,12 90,12 L178,12 Q188,12 194,20 L208,38 L222,42 Q230,44 230,56 L230,72 Z",
    windows: ["M86,20 L112,18 L112,36 L68,36 Z", "M118,18 L150,18 L150,36 L118,36 Z", "M156,18 L184,19 L198,36 L156,36 Z"],
    wheels: [62, 190],
    roof: 12,
  },
  muv: {
    body: "M16,72 L16,48 Q16,38 28,36 L50,34 L64,14 Q68,10 76,10 L168,10 Q180,10 190,20 L212,38 L224,42 Q230,44 230,56 L230,72 Z",
    windows: ["M72,18 L104,16 L104,34 L58,34 Z", "M110,16 L146,16 L146,34 L110,34 Z", "M152,16 L178,17 L198,34 L152,34 Z"],
    wheels: [58, 192],
    roof: 10,
  },
  tempo: {
    body: "M14,74 L14,20 Q14,10 26,10 L196,10 Q206,10 210,18 L222,44 Q230,46 230,56 L230,74 Z",
    windows: [
      "M26,20 L54,20 L54,40 L26,40 Z",
      "M60,20 L88,20 L88,40 L60,40 Z",
      "M94,20 L122,20 L122,40 L94,40 Z",
      "M128,20 L156,20 L156,40 L128,40 Z",
      "M162,20 L196,20 L212,42 L162,42 Z",
    ],
    wheels: [54, 190],
    roof: 10,
  },
};

function Wheel({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} 72)`}>
      <circle r="16" fill="#101820" />
      <g className="wheel">
        <circle r="9" fill="#cfd6db" />
        <path d="M0,-9 L0,9 M-9,0 L9,0 M-6.4,-6.4 L6.4,6.4 M-6.4,6.4 L6.4,-6.4" stroke="#7b8790" strokeWidth="1.6" />
        <circle r="3" fill="#56626b" />
      </g>
    </g>
  );
}

export default function VehicleArt({
  shape,
  color = "#2F6B82",
  taxi = true,
  beam = false,
  className,
}: {
  shape: VehicleShape;
  color?: string;
  taxi?: boolean;
  beam?: boolean;
  className?: string;
}) {
  const b = BODIES[shape];
  const gid = `vg-${shape}-${color.replace("#", "")}`;
  return (
    <svg viewBox="0 0 250 96" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.85" />
          <stop offset="0.55" stopColor={color} />
          <stop offset="1" stopColor="#0b1a26" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${gid}-beam`} x1="0" x2="1">
          <stop offset="0" stopColor="#ffe6a8" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ffe6a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="124" cy="88" rx="112" ry="6" fill="#000" opacity="0.18" />
      {beam && <path className="headlight" d="M226,54 L250,40 L250,76 Z" fill={`url(#${gid}-beam)`} />}
      <g className="car-body">
        <path d={b.body} fill={`url(#${gid})`} />
        {b.windows.map((w, i) => (
          <path key={i} d={w} fill="#bfe0ea" opacity="0.92" />
        ))}
        <path d={b.body} fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="1" />
        <rect x="222" y="52" width="8" height="6" rx="2" fill="#ffd27a" className="headlight" />
        <rect x={shape === "tempo" ? 14 : 18} y="54" width="6" height="7" rx="2" fill="#e5484d" />
        <rect x="118" y="50" width="14" height="3" rx="1.5" fill="rgba(255,255,255,.55)" />
        {taxi && shape !== "tempo" && (
          <g transform={`translate(${(b.wheels[0] + b.wheels[1]) / 2 - 14} ${b.roof - 9})`}>
            <rect width="28" height="9" rx="2" fill="#0e2233" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={2 + i * 6.2} y={i % 2 ? 4.5 : 1} width="5" height="3.5" fill="#e8a93a" />
            ))}
          </g>
        )}
      </g>
      <Wheel cx={b.wheels[0]} />
      <Wheel cx={b.wheels[1]} />
    </svg>
  );
}
