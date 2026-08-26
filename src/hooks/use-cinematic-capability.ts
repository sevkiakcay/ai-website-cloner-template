"use client";

import { useEffect, useState } from "react";

/**
 * Gates the heavy, pinned GSAP ScrollTrigger hero sequence to devices that can
 * actually afford it: a fine pointer (desktop/trackpad, not touch), a wide
 * enough viewport, and no reduced-motion preference. Starts `false` on both
 * server and client to avoid a hydration mismatch, then resolves post-mount —
 * mobile and reduced-motion users get the lighter CSS-driven hero instead.
 */
export function useCinematicCapability() {
  const [capable, setCapable] = useState(false);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    const pointerFine = window.matchMedia("(pointer: fine)");
    const wideEnough = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => {
      setCapable(pointerFine.matches && wideEnough.matches && !reducedMotion.matches);
      setResolved(true);
    };

    evaluate();
    pointerFine.addEventListener("change", evaluate);
    wideEnough.addEventListener("change", evaluate);
    reducedMotion.addEventListener("change", evaluate);
    return () => {
      pointerFine.removeEventListener("change", evaluate);
      wideEnough.removeEventListener("change", evaluate);
      reducedMotion.removeEventListener("change", evaluate);
    };
  }, []);

  return { capable, resolved };
}
