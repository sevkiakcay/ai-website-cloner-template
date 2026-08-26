"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/use-in-view";
import { PalletAssemblyIllustration } from "../shared/illustrations";

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const playState = { "--play-state": inView ? "running" : "paused" } as CSSProperties;

  return (
    <section
      id="ahsap-palet"
      className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1400ms]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 18%, color-mix(in oklch, var(--primary) 22%, transparent) 0%, transparent 70%)",
          opacity: inView ? 1 : 0.4,
        }}
      />
      <div
        ref={ref}
        style={playState}
        className="relative mx-auto flex min-h-[86vh] max-w-[1024px] flex-col items-center px-6 pt-24 pb-16 text-center md:min-h-[92vh] md:pt-32"
      >
        <p className="reveal text-[12px] font-semibold tracking-[0.2em] text-surface-dark-foreground/50 uppercase">
          Akçay Palet
        </p>
        <h1
          className="reveal mt-4 max-w-[820px] text-[34px] leading-[1.08] font-semibold tracking-tight md:text-[58px]"
          style={{ animationDelay: "80ms" }}
        >
          Ahşap palet üretiminde mühendislik yaklaşımı.
        </h1>
        <p
          className="reveal mt-4 max-w-[540px] text-[15px] text-surface-dark-foreground/65 md:text-[18px]"
          style={{ animationDelay: "160ms" }}
        >
          Standart ölçülerden özel üretime, ihracattan endüstriyel sevkiyata.
        </p>
        <div
          className="reveal mt-7 flex items-center justify-center gap-4 text-[15px] font-medium"
          style={{ animationDelay: "240ms" }}
        >
          <a
            href="#iletisim"
            className="rounded-full bg-primary px-5 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Teklif Al
          </a>
          <a
            href="#uretim-sureci"
            className="rounded-full border border-surface-dark-foreground/25 px-5 py-2 text-surface-dark-foreground transition-colors hover:bg-surface-dark-foreground/10"
          >
            Üretimi Keşfet
          </a>
        </div>
        <div className="mt-auto w-full max-w-[640px] pt-14 md:pt-20">
          <PalletAssemblyIllustration className="h-auto w-full text-surface-dark-foreground" />
        </div>
      </div>
    </section>
  );
}
