"use client";

import { useCinematicCapability } from "@/hooks/use-cinematic-capability";
import { CinematicFrameHero } from "./CinematicFrameHero";
import { HeroFlowPoster } from "./HeroFlowPoster";
import { HeroMobileVideo } from "./HeroMobileVideo";

/**
 * Picks the hero experience by device capability:
 * - `prefers-reduced-motion` → `HeroFlowPoster` (static, strongest Flow frame, no scrub).
 * - Desktop, fine pointer, ≥1024px → `CinematicFrameHero` (240-frame Google Flow scrub).
 * - Everyone else (mobile/touch) → `HeroMobileVideo` (same Flow shot, single compressed
 *   autoplay-once video instead of a scroll-scrubbed frame set — lighter and touch-appropriate).
 * Defaults to `HeroFlowPoster` on the server and until capability resolves post-mount — it's
 * the lightest of the three (one image, no video fetch, no canvas), so nobody pays for a
 * video load or frame preload that then gets thrown away once the real branch kicks in.
 */
export function Hero() {
  const { capable, reducedMotion, resolved } = useCinematicCapability();
  if (resolved && capable) return <CinematicFrameHero />;
  if (resolved && !reducedMotion) return <HeroMobileVideo />;
  return <HeroFlowPoster />;
}
