"use client";

import { useEffect, useState } from "react";

/**
 * Gates the heavy, pinned GSAP ScrollTrigger frame-sequence hero to devices
 * that can actually afford it: a fine pointer (desktop/trackpad, not touch),
 * a wide enough viewport, and no reduced-motion preference. `reducedMotion`
 * is reported separately so callers can route to a third, fully-static
 * branch rather than folding it into "not capable". Starts at the same
 * (non-capable, non-reduced) defaults on both server and client to avoid a
 * hydration mismatch, then resolves post-mount.
 */
export function useCinematicCapability() {
  const [capable, setCapable] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)");
    const wideEnough = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setCapable(pointerFine.matches && wideEnough.matches && !reducedMotionQuery.matches);
      setReducedMotion(reducedMotionQuery.matches);
      setResolved(true);
    };

    evaluate();
    pointerFine.addEventListener("change", evaluate);
    wideEnough.addEventListener("change", evaluate);
    reducedMotionQuery.addEventListener("change", evaluate);
    return () => {
      pointerFine.removeEventListener("change", evaluate);
      wideEnough.removeEventListener("change", evaluate);
      reducedMotionQuery.removeEventListener("change", evaluate);
    };
  }, []);

  return { capable, reducedMotion, resolved };
}
