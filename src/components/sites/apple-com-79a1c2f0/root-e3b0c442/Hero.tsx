"use client";

import { useCinematicCapability } from "@/hooks/use-cinematic-capability";
import { CinematicFrameHero } from "./CinematicFrameHero";
import { HeroFlowPoster } from "./HeroFlowPoster";
import { HeroStatic } from "./HeroStatic";

/**
 * Picks the hero experience by device capability:
 * - `prefers-reduced-motion` → `HeroFlowPoster` (static, strongest Flow frame, no scrub).
 * - Desktop, fine pointer, ≥1024px → `CinematicFrameHero` (240-frame Google Flow scrub).
 * - Everyone else (mobile/touch) → `HeroStatic` (CSS-only), pending a mobile-specific
 *   Flow strategy (video vs. reduced frame subset) once the two Flow videos are inspected.
 * Defaults to `HeroStatic` on the server and on first client paint (identical markup,
 * no hydration mismatch), then swaps post-mount once capability is known.
 */
export function Hero() {
  const { capable, reducedMotion, resolved } = useCinematicCapability();
  if (resolved && reducedMotion) return <HeroFlowPoster />;
  if (resolved && capable) return <CinematicFrameHero />;
  return <HeroStatic />;
}
