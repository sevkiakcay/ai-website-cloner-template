"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Used to scale back 3D depth / frame counts / parallax distance on small viewports. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 767px)");
}
