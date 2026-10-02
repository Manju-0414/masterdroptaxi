import type { Scene } from "@/data/packages";

/** Illustrated "postcard" scenes for packages — animated sun, clouds and water. */
export default function SceneArt({ id, scene, hue }: { id: string; scene: Scene; hue: [string, string] }) {
  const g = `sc-${id}`;
  return (
    <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${g}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hue[0]} />
          <stop offset="1" stopColor={hue[1]} />
        </linearGradient>
        <linearGradient id={`${g}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.5" stopColor="#0e2233" stopOpacity="0" />
          <stop offset="1" stopColor="#0e2233" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill={`url(#${g}-sky)`} />
      <g style={{ animation: "sunRise 3s ease-out both" }}>
        <circle cx="300" cy="80" r="30" fill="#fff4d6" opacity="0.9" />
        <circle cx="300" cy="80" r="46" fill="#fff4d6" opacity="0.18" />
      </g>
      <g className="cloud" style={{ animationDuration: "26s" }}>
        <ellipse cx="40" cy="50" rx="34" ry="10" fill="#fff" opacity="0.55" />
        <ellipse cx="60" cy="44" rx="20" ry="9" fill="#fff" opacity="0.55" />
      </g>
      <g className="cloud" style={{ animationDuration: "38s", animationDelay: "-14s" }}>
        <ellipse cx="0" cy="90" rx="26" ry="8" fill="#fff" opacity="0.4" />
      </g>

      {(scene === "hills" || scene === "lake" || scene === "falls") && (
        <>
          <path d="M0,170 L70,95 L120,140 L190,70 L260,150 L320,105 L400,160 L400,250 L0,250 Z" fill="#0e2233" opacity="0.28" />
          <path d="M0,190 L60,140 L130,180 L210,120 L290,185 L360,145 L400,170 L400,250 L0,250 Z" fill="#0e2233" opacity="0.45" />
          <path d="M183,76 L190,70 L198,80 Z" fill="#fff" opacity="0.8" />
        </>
      )}
      {scene === "hills" && (
        <g fill="#0e2233" opacity="0.7">
          {[40, 70, 330, 360].map((x, i) => (
            <path key={i} className="sway" d={`M${x},230 L${x - 12},230 L${x},190 L${x + 12},230 Z`} style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </g>
      )}
      {scene === "lake" && (
        <g>
          <ellipse cx="200" cy="222" rx="190" ry="30" fill="#bfe0ea" opacity="0.6" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${80 + i * 70},${215 + i * 6} h40`} stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.7" className="road-dash" style={{ animationDuration: `${2 + i}s` }} />
          ))}
          <path d="M150,212 l24,0 l-4,6 l-16,0 Z M162,212 l0,-16 l10,14 Z" fill="#fff" opacity="0.85" />
        </g>
      )}
      {scene === "tea" && (
        <g>
          <path d="M0,160 Q100,120 200,150 T400,140 L400,250 L0,250 Z" fill="#355c2b" opacity="0.55" />
          <path d="M0,195 Q120,160 230,190 T400,180 L400,250 L0,250 Z" fill="#274a20" opacity="0.7" />
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={i} d={`M0,${200 + i * 10} Q120,${168 + i * 10} 230,${198 + i * 10} T400,${188 + i * 10}`} stroke="#9cc56b" strokeWidth="2" fill="none" opacity="0.5" />
          ))}
        </g>
      )}
      {scene === "falls" && (
        <g>
          <path d="M150,110 L250,110 L262,250 L138,250 Z" fill="#0e2233" opacity="0.35" />
          {[172, 188, 204, 220].map((x, i) => (
            <path key={i} d={`M${x},112 L${x},240`} stroke="#e8f6fa" strokeWidth="5" strokeDasharray="18 10" className="road-dash" style={{ animationDuration: `${0.8 + i * 0.15}s`, animationDirection: "reverse" }} opacity="0.85" />
          ))}
          <ellipse cx="200" cy="240" rx="80" ry="12" fill="#e8f6fa" opacity="0.6" />
        </g>
      )}
      {scene === "sea" && (
        <g>
          <rect x="0" y="170" width="400" height="80" fill="#1b4d6b" opacity="0.55" />
          <g style={{ animation: "wave 6s linear infinite" }}>
            <path d="M0,180 q25,-8 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" stroke="#fff" strokeWidth="2" fill="none" opacity="0.55" />
            <path d="M0,200 q25,-8 50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0 t50,0" stroke="#fff" strokeWidth="2" fill="none" opacity="0.35" />
          </g>
          <path d="M0,160 L400,160" stroke="#0e2233" strokeWidth="6" opacity="0.6" />
          {[20, 70, 120, 170, 220, 270, 320, 370].map((x) => (
            <rect key={x} x={x} y="160" width="5" height="26" fill="#0e2233" opacity="0.55" />
          ))}
          <path d="M40,160 Q90,125 140,160 M140,160 Q190,125 240,160 M240,160 Q290,125 340,160" stroke="#0e2233" strokeWidth="3" fill="none" opacity="0.55" />
        </g>
      )}
      {scene === "temple" && (
        <g fill="#2a1408" opacity="0.72">
          <path d="M150,240 L160,200 L240,200 L250,240 Z" />
          <path d="M162,200 L170,168 L230,168 L238,200 Z" />
          <path d="M172,168 L178,140 L222,140 L228,168 Z" />
          <path d="M180,140 L185,116 L215,116 L220,140 Z" />
          <path d="M187,116 L190,98 L210,98 L213,116 Z" />
          <path d="M190,98 Q200,80 210,98 Z" />
          <circle cx="200" cy="80" r="3" fill="#f2c46d" />
          <path d="M60,240 L66,214 L110,214 L116,240 Z M70,214 L76,196 L100,196 L106,214 Z M78,196 Q88,182 98,196 Z" opacity="0.7" />
          <path d="M290,240 L296,214 L340,214 L346,240 Z M300,214 L306,196 L330,196 L336,214 Z M308,196 Q318,182 328,196 Z" opacity="0.7" />
          <rect x="0" y="238" width="400" height="12" />
        </g>
      )}
      {scene === "city" && (
        <g fill="#0e2233" opacity="0.6">
          {[
            [10, 150, 40], [55, 120, 30], [90, 160, 44], [140, 100, 34], [180, 140, 50],
            [236, 110, 30], [272, 150, 40], [318, 90, 36], [360, 140, 40],
          ].map(([x, y, w], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={250 - y} />
              {Array.from({ length: 4 }).map((_, j) => (
                <rect key={j} x={x + 6} y={y + 10 + j * 18} width="6" height="6" fill="#ffd27a" className="headlight" style={{ animationDelay: `${(i + j) * 0.3}s` }} />
              ))}
            </g>
          ))}
        </g>
      )}
      {scene === "road" && (
        <g>
          <path d="M0,190 Q200,150 400,190 L400,250 L0,250 Z" fill="#0e2233" opacity="0.35" />
          <path d="M170,250 L195,160 L205,160 L230,250 Z" fill="#1b2a36" opacity="0.85" />
          <path d="M200,245 L200,165" stroke="#f2c46d" strokeWidth="3" strokeDasharray="12 10" className="road-dash" style={{ animationDirection: "reverse" }} />
        </g>
      )}
      <rect width="400" height="250" fill={`url(#${g}-fade)`} />
    </svg>
  );
}
