import type { SVGProps } from "react";

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
