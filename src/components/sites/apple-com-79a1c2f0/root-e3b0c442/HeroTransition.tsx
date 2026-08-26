"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";

/**
 * Scene 5 — the un-pinned bridge from the cinematic hero into the rest of
 * the site. Same dark surface as the hero so the handoff reads as one
 * continuous scene, not a new page; a plain scroll-reveal fade (per
 * ui-ux-pro-max's "Subtle" tier), no pin, no scrub.
 */
export function HeroTransition() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const playState = { "--play-state": inView ? "running" : "paused" } as CSSProperties;

  return (
    <section className="bg-surface-dark text-surface-dark-foreground">
      <div ref={ref} style={playState} className="mx-auto max-w-[720px] px-6 py-20 text-center md:py-28">
        <h2 className="reveal text-[28px] leading-[1.15] font-semibold tracking-tight md:text-[38px]">
          Paletten Fazlasını Üretiyoruz.
        </h2>
        <p
          className="reveal mt-4 text-[15px] text-surface-dark-foreground/65 md:text-[17px]"
          style={{ animationDelay: "100ms" }}
        >
          EPAL/EUR ölçülerinden ihracata özel ısıl işlemli üretime, özel ölçülerden iç piyasa paletlerine —
          tek üreticiden uçtan uca çözüm.
        </p>
      </div>
    </section>
  );
}
