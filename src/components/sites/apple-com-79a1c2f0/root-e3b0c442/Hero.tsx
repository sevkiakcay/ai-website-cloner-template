"use client";

import { useCinematicCapability } from "@/hooks/use-cinematic-capability";
import { CinematicHero } from "./CinematicHero";
import { HeroStatic } from "./HeroStatic";

/**
 * Picks the hero experience by device capability. Desktop with a fine
 * pointer and no `prefers-reduced-motion` gets the pinned GSAP
 * ScrollTrigger sequence (`CinematicHero`); everyone else — mobile, touch,
 * reduced-motion — gets the lighter CSS-driven `HeroStatic`. Defaults to
 * `HeroStatic` on the server and on first client paint (identical markup,
 * no hydration mismatch), then swaps post-mount once capability is known.
 */
export function Hero() {
  const { capable, resolved } = useCinematicCapability();
  if (resolved && capable) return <CinematicHero />;
  return <HeroStatic />;
}
