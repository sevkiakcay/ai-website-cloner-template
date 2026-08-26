"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the observed element first enters the viewport, then
 * disconnects. Starts `false` on both server and client (avoiding a
 * hydration mismatch) and falls back to `true` post-mount if
 * IntersectionObserver isn't available (very old browsers) so nothing is
 * stuck hidden.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(id);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3, ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, inView };
}
