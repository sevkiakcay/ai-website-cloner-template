"use client";

import { useCallback, useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/** Tracks prefers-reduced-motion so cinematic scenes can fall back to static/fade states. */
export function useReducedMotion() {
  const subscribe = useCallback((callback: () => void) => {
    const mq = window.matchMedia(QUERY);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  }, []);
  const getSnapshot = useCallback(() => window.matchMedia(QUERY).matches, []);
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
