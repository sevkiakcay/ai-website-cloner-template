"use client";

import { forwardRef, useImperativeHandle, useMemo, useRef, type CSSProperties } from "react";
import {
  FOOTPRINT,
  buildBoards,
  band,
  lerp,
  lerpBoardFrame,
  type BoardKind,
  type BoardSpec,
  type PalletDimension,
} from "@/lib/pallet/geometry";

export type PalletFrame = {
  /** 0 = scattered components, 1 = fully assembled */
  progress: number;
  /** 0 = assembled, 1 = fully exploded engineering view */
  explode: number;
  /** apparent camera orbit, in degrees */
  camX: number;
  camY: number;
  /** overall depth scale — reduced on mobile so parallax stays subtle */
  depthScale?: number;
  /** camera push-in, 1 = resting scale */
  scale?: number;
  /** vertical camera drift in px, settles to 0 */
  lift?: number;
};

export type WoodenPalletHandle = {
  applyFrame: (frame: PalletFrame) => void;
  getBoards: () => BoardSpec[];
};

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'>" +
      "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/>" +
      "<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 0.96  0 0 0 0 0.86  0 0 0 0.05 0'/></filter>" +
      "<rect width='100%' height='100%' filter='url(#n)'/></svg>"
  );

const TONES: Record<BoardKind, { top: string; front: string; side: string }> = {
  "bottom-board": {
    top: "linear-gradient(97deg,#493420,#5a4128 22%,#402c19 48%,#553a22 74%,#432e1a)",
    front: "linear-gradient(180deg,#392712,#26190d)",
    side: "linear-gradient(180deg,#281b0e,#180f08)",
  },
  block: {
    top: "linear-gradient(112deg,#6a4a2a,#7d5833 30%,#5d3f22 55%,#754f2d 80%,#603f21)",
    front: "linear-gradient(180deg,#583c21,#3c2610)",
    side: "linear-gradient(180deg,#432b12,#2b1a0b)",
  },
  "top-board": {
    top: "linear-gradient(93deg,#a97b45,#c39758 24%,#a1743d 50%,#bd8f52 76%,#a67c46)",
    front: "linear-gradient(180deg,#8f6537,#6a4924)",
    side: "linear-gradient(180deg,#78542d,#54391d)",
  },
};

const GRAIN = {
  "bottom-board": "repeating-linear-gradient(91deg, rgba(0,0,0,0.16) 0px, transparent 1px, transparent 5px, rgba(255,220,180,0.05) 6px, transparent 8px)",
  block: "repeating-linear-gradient(88deg, rgba(0,0,0,0.14) 0px, transparent 1px, transparent 6px, rgba(255,220,180,0.05) 7px, transparent 9px)",
  "top-board": "repeating-linear-gradient(94deg, rgba(0,0,0,0.12) 0px, transparent 1px, transparent 7px, rgba(255,235,200,0.07) 8px, transparent 11px)",
} satisfies Record<BoardKind, string>;

function localProgress(spec: BoardSpec, globalP: number) {
  if (spec.kind === "bottom-board") return band(globalP, 0.05, 0.22);
  if (spec.kind === "block") return band(globalP, 0.18, 0.44);
  const start = 0.44 + spec.group * 0.09;
  return band(globalP, start, start + 0.2);
}

function Prism({ spec, innerRef }: { spec: BoardSpec; innerRef: (el: HTMLDivElement | null) => void }) {
  const { w, h, d, seed, kind } = spec;
  const tone = TONES[kind];
  const jitter = {
    brightness: 0.93 + seed * 0.14,
    hue: (seed - 0.5) * 5,
  };
  const base: CSSProperties = { position: "absolute", inset: 0 };
  const noiseLayer: CSSProperties = {
    ...base,
    backgroundImage: `url("${NOISE_SVG}")`,
    backgroundSize: "90px 90px",
    mixBlendMode: "overlay",
    opacity: 0.5,
  };
  const grainLayer: CSSProperties = { ...base, backgroundImage: GRAIN[kind] };

  return (
    <div
      ref={innerRef}
      data-board={spec.id}
      data-kind={kind}
      className="absolute [transform-style:preserve-3d] will-change-transform"
      style={{
        width: w,
        height: h,
        left: 0,
        top: 0,
        filter: `brightness(${jitter.brightness}) hue-rotate(${jitter.hue}deg)`,
      }}
    >
      <div style={{ ...base, background: tone.front, transform: `translateZ(${d / 2}px)`, boxShadow: "inset 0 0 24px rgba(0,0,0,.4)" }} />
      <div style={{ ...base, background: tone.front, filter: "brightness(.5)", transform: `rotateY(180deg) translateZ(${d / 2}px)` }} />
      <div style={{ position: "absolute", width: d, height: h, left: (w - d) / 2, top: 0, background: tone.side, transform: `rotateY(90deg) translateZ(${w / 2}px)` }} />
      <div style={{ position: "absolute", width: d, height: h, left: (w - d) / 2, top: 0, background: tone.side, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }} />
      <div style={{ position: "absolute", width: w, height: d, left: 0, top: (h - d) / 2, background: tone.top, transform: `rotateX(90deg) translateZ(${h / 2}px)`, boxShadow: "inset 0 0 34px rgba(0,0,0,.3)" }}>
        <div style={grainLayer} />
        <div style={noiseLayer} />
      </div>
      <div style={{ position: "absolute", width: w, height: d, left: 0, top: (h - d) / 2, background: tone.front, filter: "brightness(.28)", transform: `rotateX(-90deg) translateZ(${h / 2}px)` }} />
    </div>
  );
}

type WoodenPalletProps = {
  dimension?: PalletDimension;
  className?: string;
  /** morph target — when set alongside footprintT, the pallet blends live from `dimension` toward this footprint */
  targetDimension?: PalletDimension;
  /** 0 = fully `dimension`, 1 = fully `targetDimension`. Drives a brief re-render (board w/h/d change), unlike
   *  the continuous scroll scene which never re-renders — dimension morphs are short, user-triggered, and rare. */
  footprintT?: number;
};

export const WoodenPallet = forwardRef<WoodenPalletHandle, WoodenPalletProps>(
  function WoodenPallet({ dimension = "80x120", className, targetDimension, footprintT = 0 }, ref) {
    const boardsRef = useRef<Map<string, HTMLDivElement>>(new Map());
    const groupRef = useRef<HTMLDivElement>(null);

    const boardsA = useMemo(() => {
      const foot = FOOTPRINT[dimension === "custom" ? "80x120" : dimension];
      return buildBoards(foot.x, foot.z);
    }, [dimension]);

    const boardsB = useMemo(() => {
      if (!targetDimension) return null;
      const foot = FOOTPRINT[targetDimension === "custom" ? "80x120" : targetDimension];
      return buildBoards(foot.x, foot.z);
    }, [targetDimension]);

    const boards = useMemo(() => {
      if (!boardsB) return boardsA;
      return boardsA.map((a, i) => ({ ...a, ...lerpBoardFrame(a, boardsB[i], footprintT) }));
    }, [boardsA, boardsB, footprintT]);

    useImperativeHandle(ref, () => ({
      getBoards: () => boards,
      applyFrame({ progress, explode, camX, camY, depthScale = 1, scale = 1, lift = 0 }) {
        for (const spec of boards) {
          const el = boardsRef.current.get(spec.id);
          if (!el) continue;
          const lp = localProgress(spec, progress);
          const explodeDist = (150 + explode * 40) * depthScale;
          const x =
            lerp(spec.pos.x + spec.scatter.x * depthScale, spec.pos.x, lp) +
            explode * spec.explodeDir.x * explodeDist;
          const y =
            lerp(spec.pos.y + spec.scatter.y * depthScale, spec.pos.y, lp) +
            explode * spec.explodeDir.y * (150 + explode * 55) * depthScale;
          const z =
            lerp(spec.pos.z + spec.scatter.z * depthScale, spec.pos.z, lp) +
            explode * spec.explodeDir.z * explodeDist;
          const rx = lerp(spec.scatterRot.x, 0, lp);
          const ry = lerp(spec.scatterRot.y, 0, lp);
          const rz = lerp(spec.scatterRot.z, 0, lp);
          const opacity = Math.min(1, lp * 3.2);
          el.style.transform = `translate3d(${x - spec.w / 2}px, ${y - spec.h / 2}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
          el.style.opacity = String(opacity);
        }
        if (groupRef.current) {
          groupRef.current.style.transform = `translateY(${lift}px) scale(${scale}) rotateX(${camX}deg) rotateY(${camY}deg)`;
        }
      },
    }));

    return (
      <div className={className} style={{ perspective: "2400px" }}>
        <div ref={groupRef} className="relative mx-auto [transform-style:preserve-3d]" style={{ width: 1, height: 1, transform: "rotateX(58deg) rotateY(-28deg)" }}>
          {boards.map((spec) => (
            <Prism
              key={spec.id}
              spec={spec}
              innerRef={(el) => {
                if (el) boardsRef.current.set(spec.id, el);
                else boardsRef.current.delete(spec.id);
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);
