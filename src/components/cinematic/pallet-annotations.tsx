"use client";

import { forwardRef } from "react";

type Annotation = {
  label: string;
  sub: string;
  /** position of the label, percentage from top-left of the scene */
  x: number;
  y: number;
  /** leader line drawn from the label toward this point (also percentage) */
  toX: number;
  toY: number;
  align: "left" | "right";
};

const ANNOTATIONS: Annotation[] = [
  { label: "ÜST TAHTA", sub: "Yük yüzeyi", x: 78, y: 15, toX: 65, toY: 19, align: "left" },
  { label: "TAKOZ", sub: "Taşıyıcı destek", x: 80, y: 45, toX: 76, toY: 44, align: "left" },
  { label: "ALT TAHTA", sub: "Taban çıtası", x: 78, y: 74, toX: 62, toY: 70, align: "left" },
  { label: "BAĞLANTI", sub: "Çivi sistemi", x: 20, y: 33, toX: 27, toY: 42, align: "right" },
  { label: "ISIL İŞLEM", sub: "ISPM-15", x: 20, y: 61, toX: 29, toY: 65, align: "right" },
];

/** CAD-style annotation overlay for the exploded view — thin lines, tiny labels, lots of negative space. */
export const PalletAnnotations = forwardRef<HTMLDivElement>(function PalletAnnotations(_props, ref) {
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 z-20 opacity-0">
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        {ANNOTATIONS.map((a) => (
          <line
            key={a.label}
            x1={`${a.align === "left" ? a.x : a.x + 8}%`}
            y1={`${a.y}%`}
            x2={`${a.toX}%`}
            y2={`${a.toY}%`}
            stroke="var(--steel)"
            strokeWidth={1}
            strokeDasharray="1 3"
          />
        ))}
      </svg>
      {ANNOTATIONS.map((a) => (
        <div
          key={a.label}
          className="absolute flex flex-col gap-0.5"
          style={{
            left: `${a.x}%`,
            top: `${a.y}%`,
            textAlign: a.align,
            alignItems: a.align === "left" ? "flex-start" : "flex-end",
            transform: "translateY(-50%)",
          }}
        >
          <span className="font-mono text-[11px] tracking-[0.18em] text-paper/90 uppercase">{a.label}</span>
          <span className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground uppercase">{a.sub}</span>
        </div>
      ))}
    </div>
  );
});
