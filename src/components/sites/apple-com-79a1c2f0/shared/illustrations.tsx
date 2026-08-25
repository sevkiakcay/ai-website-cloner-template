import type { CSSProperties, SVGProps } from "react";

/** Helper for setting the `--delay`/`--fx`/`--fy` custom properties consumed by `.assembly-part`. */
function assemblyVars(vars: { delay?: string; fx?: string; fy?: string }): CSSProperties {
  return {
    ...(vars.delay !== undefined ? { "--delay": vars.delay } : {}),
    ...(vars.fx !== undefined ? { "--fx": vars.fx } : {}),
    ...(vars.fy !== undefined ? { "--fy": vars.fy } : {}),
  } as CSSProperties;
}

/**
 * Editorial engineering-style euro pallet, exploded into three assembly
 * groups (support blocks, bottom stringers, top deck boards). Each group
 * carries the `assembly-part` utility (see globals.css) so it drops into
 * place on load with a staggered, mechanical easing curve. Motion is
 * automatically disabled under `prefers-reduced-motion`.
 */
export function PalletAssemblyIllustration(props: SVGProps<SVGSVGElement>) {
  const deckBoards = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 720 460" fill="none" {...props}>
      <ellipse cx="360" cy="400" rx="260" ry="28" fill="black" opacity="0.35" />

      {/* Support blocks — drop in first */}
      <g style={assemblyVars({ delay: "0ms", fy: "-40px" })} className="assembly-part">
        {[
          [96, 300],
          [340, 300],
          [584, 300],
          [96, 250],
          [340, 250],
          [584, 250],
        ].map(([x, y], i) => (
          <g key={i}>
            <rect x={x} y={y} width="40" height="56" fill="#2A2521" stroke="#484038" strokeWidth="1" />
            <rect x={x} y={y} width="40" height="6" fill="#5C5148" />
          </g>
        ))}
      </g>

      {/* Bottom stringers — drop in second */}
      <g style={assemblyVars({ delay: "220ms", fy: "-90px" })} className="assembly-part">
        {[80, 340, 600].map((x, i) => (
          <rect key={i} x={x - 20} y="256" width="40" height="150" fill="#3A322B" stroke="#544A40" strokeWidth="1" opacity="0.92" />
        ))}
        <rect x="60" y="330" width="600" height="20" fill="#463C33" opacity="0.85" />
      </g>

      {/* Top deck boards — drop in last, from alternating directions */}
      <g>
        {deckBoards.map((i) => (
          <g
            key={i}
            style={assemblyVars({
              delay: `${420 + i * 90}ms`,
              fx: i % 2 === 0 ? "-90px" : "90px",
              fy: "-30px",
            })}
            className="assembly-part"
          >
            <rect
              x={60 + i * 102}
              y="180"
              width="88"
              height="220"
              fill="#B9814A"
              stroke="#8A5F35"
              strokeWidth="1.5"
            />
            <line x1={60 + i * 102 + 10} y1="190" x2={60 + i * 102 + 10} y2="390" stroke="#8A5F35" strokeWidth="0.5" opacity="0.4" />
          </g>
        ))}
      </g>

      {/* Technical dimension markers */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.35">
        <line x1="60" y1="424" x2="660" y2="424" />
        <line x1="60" y1="418" x2="60" y2="430" />
        <line x1="660" y1="418" x2="660" y2="430" />
      </g>
      <text x="360" y="448" textAnchor="middle" fontSize="13" letterSpacing="1.5" fill="currentColor" opacity="0.45">
        1200 mm
      </text>
    </svg>
  );
}

/** Isometric wooden euro-pallet, stacked boards over three runners. */
export function WoodPalletIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 320" fill="none" {...props}>
      <ellipse cx="240" cy="270" rx="170" ry="24" fill="currentColor" opacity="0.06" />
      {[0, 1, 2].map((row) => (
        <g key={row} transform={`translate(0 ${row * 70})`}>
          <polygon
            points="60,150 240,90 420,150 240,210"
            fill="#C88A4A"
            stroke="#9C6A34"
            strokeWidth="2"
          />
          <polygon points="60,150 60,158 240,218 240,210" fill="#9C6A34" />
          <polygon points="420,150 420,158 240,218 240,210" fill="#B47B40" />
        </g>
      ))}
      <g opacity="0.9">
        <rect x="150" y="60" width="20" height="150" fill="#7A5230" transform="skewY(-18)" />
        <rect x="310" y="60" width="20" height="150" fill="#7A5230" transform="skewY(-18)" />
      </g>
    </svg>
  );
}

/** Stacked HDPE plastic pallets, rounded deck with drain slots. */
export function PlasticPalletIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 320" fill="none" {...props}>
      <ellipse cx="240" cy="260" rx="170" ry="22" fill="currentColor" opacity="0.06" />
      {[0, 1].map((row) => (
        <g key={row} transform={`translate(0 ${row * 60})`}>
          <polygon
            points="70,150 240,95 410,150 240,205"
            fill="#3B4A5A"
            stroke="#28323D"
            strokeWidth="2"
          />
          {[...Array(6)].map((_, i) => (
            <rect
              key={i}
              x={130 + i * 40}
              y={140 + (i % 2) * 6}
              width="18"
              height="8"
              rx="3"
              fill="#1E262F"
              opacity="0.6"
              transform={`skewX(-20)`}
            />
          ))}
          <polygon points="70,150 70,160 240,215 240,205" fill="#28323D" />
          <polygon points="410,150 410,160 240,215 240,205" fill="#334252" />
        </g>
      ))}
    </svg>
  );
}

/** Folding mesh crate / basket pallet, side walls up. */
export function CratePalletIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 480 320" fill="none" {...props}>
      <polygon points="90,220 240,170 390,220 240,270" fill="#4A4A4E" stroke="#28282B" strokeWidth="2" />
      <polygon points="90,220 90,150 240,100 240,170" fill="#5C5C61" stroke="#28282B" strokeWidth="1.5" />
      <polygon points="390,220 390,150 240,100 240,170" fill="#3E3E42" stroke="#28282B" strokeWidth="1.5" />
      {[...Array(5)].map((_, i) => (
        <line
          key={`v-${i}`}
          x1={100 + i * 36}
          y1={150 - i * 3}
          x2={100 + i * 36}
          y2={210 - i * 3}
          stroke="#8A8A90"
          strokeWidth="1.2"
          opacity="0.7"
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <line
          key={`v2-${i}`}
          x1={250 + i * 30}
          y1={130 + i * 5}
          x2={250 + i * 30}
          y2={190 + i * 5}
          stroke="#6a6a70"
          strokeWidth="1.2"
          opacity="0.7"
        />
      ))}
    </svg>
  );
}

/** Warehouse pallet racking, three levels, forklift silhouette. */
export function WarehouseRackIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 640 360" fill="none" {...props}>
      <rect x="40" y="40" width="16" height="280" fill="#B8541F" />
      <rect x="560" y="40" width="16" height="280" fill="#B8541F" />
      {[100, 190, 280].map((y) => (
        <rect key={y} x="40" y={y} width="536" height="14" fill="#8A3E14" />
      ))}
      {[130, 220, 310].map((y, i) => (
        <g key={y}>
          <polygon
            points={`${90 + i * 8},${y} ${230 + i * 8},${y - 30} ${370 + i * 8},${y} ${230 + i * 8},${y + 30}`}
            fill="#C88A4A"
            opacity="0.9"
          />
          <polygon
            points={`${400 + i * 4},${y} ${480 + i * 4},${y - 22} ${560 + i * 4},${y} ${480 + i * 4},${y + 22}`}
            fill="#3B4A5A"
            opacity="0.9"
          />
        </g>
      ))}
      <g transform="translate(20 250)">
        <rect x="0" y="30" width="70" height="34" rx="4" fill="#1D1D1F" />
        <rect x="12" y="4" width="30" height="30" rx="3" fill="#1D1D1F" />
        <circle cx="14" cy="66" r="9" fill="#28282B" />
        <circle cx="56" cy="66" r="9" fill="#28282B" />
        <rect x="60" y="-20" width="6" height="80" fill="#4A4A4E" />
      </g>
    </svg>
  );
}

/** Recycling loop for wood/plastic pallet take-back program. */
export function RecycleLoopIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 240 240" fill="none" {...props}>
      <circle cx="120" cy="120" r="96" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2" />
      <path
        d="M120 34a86 86 0 0 1 74 43M194 120a86 86 0 0 1-43 74M46 120a86 86 0 0 1 43-74"
        stroke="currentColor"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M186 66l10 15-18 3" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M158 200l-18-6 8-17" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 158l-17-8 17-9" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Single-layer top-down pallet deck, for compact/secondary product mentions. */
export function WoodPalletTopViewIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 260 160" fill="none" {...props}>
      <rect x="10" y="20" width="240" height="120" rx="6" fill="#C88A4A" opacity="0.15" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={24 + i * 46} y="30" width="34" height="100" rx="3" fill="#C88A4A" />
      ))}
    </svg>
  );
}

/** Stacked warehouse shelf bars, for domestic stock/storage messaging. */
export function StackIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 110" fill="none" {...props}>
      <rect x="10" y="10" width="180" height="20" rx="4" fill="currentColor" opacity="0.9" />
      <rect x="26" y="45" width="148" height="20" rx="4" fill="currentColor" opacity="0.6" />
      <rect x="46" y="80" width="108" height="20" rx="4" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

/** Two connected nodes — direct producer-to-buyer relationship for B2B messaging. */
export function DirectLinkIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 100" fill="none" {...props}>
      <line x1="40" y1="50" x2="160" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="1 10" strokeLinecap="round" />
      <circle cx="40" cy="50" r="14" fill="currentColor" opacity="0.12" />
      <circle cx="40" cy="50" r="6" fill="currentColor" />
      <circle cx="160" cy="50" r="14" fill="currentColor" opacity="0.12" />
      <circle cx="160" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}

/** Delivery truck silhouette for logistics / fast-shipment messaging. */
export function TruckIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 120" fill="none" {...props}>
      <rect x="10" y="40" width="100" height="46" rx="4" fill="currentColor" opacity="0.9" />
      <path d="M110 55h34l26 22v9h-60V55Z" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="92" r="12" fill="currentColor" />
      <circle cx="150" cy="92" r="12" fill="currentColor" />
      <circle cx="50" cy="92" r="4" fill="var(--color-surface-alt)" />
      <circle cx="150" cy="92" r="4" fill="var(--color-surface-alt)" />
    </svg>
  );
}

/** Measuring/ruler mark for custom-size manufacturing. */
export function RulerIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 80" fill="none" {...props}>
      <rect x="10" y="30" width="180" height="20" rx="3" fill="currentColor" opacity="0.85" />
      {[...Array(9)].map((_, i) => (
        <rect key={i} x={20 + i * 20} y="30" width="2" height={i % 2 === 0 ? 12 : 7} fill="var(--color-surface-alt)" />
      ))}
    </svg>
  );
}

/** Certification / quality-control seal used in the process showcase. */
export function QualitySealIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 200" fill="none" {...props}>
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6" opacity="0.5" />
      <circle cx="100" cy="100" r="66" fill="currentColor" opacity="0.08" />
      <path
        d="M70 100l20 20 40-44"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
