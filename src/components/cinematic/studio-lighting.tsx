"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export type StudioLightingHandle = {
  vignette: HTMLDivElement | null;
  key: HTMLDivElement | null;
  rim: HTMLDivElement | null;
  bloom: HTMLDivElement | null;
  floor: HTMLDivElement | null;
};

/**
 * Screen-space lighting rig, deliberately kept OUTSIDE the 3D perspective hierarchy —
 * a dark-studio key/rim/bloom/floor-glow system animated purely via opacity + background-position,
 * so it composites cheaply over the pallet regardless of its 3D transform.
 */
export const StudioLighting = forwardRef<StudioLightingHandle>(function StudioLighting(_props, ref) {
  const vignette = useRef<HTMLDivElement>(null);
  const key = useRef<HTMLDivElement>(null);
  const rim = useRef<HTMLDivElement>(null);
  const bloom = useRef<HTMLDivElement>(null);
  const floor = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    get vignette() {
      return vignette.current;
    },
    get key() {
      return key.current;
    },
    get rim() {
      return rim.current;
    },
    get bloom() {
      return bloom.current;
    },
    get floor() {
      return floor.current;
    },
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <div
        ref={floor}
        className="absolute left-1/2 bottom-[8%] h-[18%] w-[55%] -translate-x-1/2 rounded-full opacity-0"
        style={{
          background: "radial-gradient(closest-side, rgba(217,164,92,0.22), rgba(217,164,92,0) 72%)",
          filter: "blur(18px)",
        }}
      />
      <div
        ref={bloom}
        className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
        style={{
          background: "radial-gradient(closest-side, rgba(255,225,180,0.16), rgba(255,225,180,0) 70%)",
          filter: "blur(46px)",
        }}
      />
      <div
        ref={key}
        className="absolute h-[85%] w-[60%] rounded-full opacity-0"
        style={{
          left: "18%",
          top: "4%",
          background: "radial-gradient(closest-side, rgba(255,238,210,0.5), rgba(255,238,210,0) 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={rim}
        className="absolute right-0 top-0 h-full w-[35%] opacity-0"
        style={{
          background: "linear-gradient(255deg, rgba(180,210,230,0.28), rgba(180,210,230,0) 60%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        ref={vignette}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, transparent 40%, rgba(3,3,3,0.55) 78%, rgba(2,2,2,0.92) 100%)",
        }}
      />
    </div>
  );
});
