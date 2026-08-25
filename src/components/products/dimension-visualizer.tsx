"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { EASE, gsap, registerGsap } from "@/lib/animation/gsap";
import { WoodenPallet, type WoodenPalletHandle } from "@/components/cinematic/wooden-pallet";
import { StudioLighting, type StudioLightingHandle } from "@/components/cinematic/studio-lighting";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { PalletDimension } from "@/lib/pallet/geometry";
import { lerp } from "@/lib/pallet/geometry";

const CAM = { x: 30, y: -22 };

const PRESETS: { key: Exclude<PalletDimension, "custom">; label: string; width: number; length: number }[] = [
  { key: "80x120", label: "80 × 120", width: 800, length: 1200 },
  { key: "80x100", label: "80 × 100", width: 800, length: 1000 },
  { key: "100x120", label: "100 × 120", width: 1000, length: 1200 },
];

export function DimensionVisualizer() {
  const palletRef = useRef<WoodenPalletHandle>(null);
  const lightRef = useRef<StudioLightingHandle>(null);
  const [active, setActive] = useState<Exclude<PalletDimension, "custom">>("80x120");
  const [target, setTarget] = useState<Exclude<PalletDimension, "custom"> | null>(null);
  const [t, setT] = useState(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reducedMotion = useReducedMotion();

  const activePreset = PRESETS.find((p) => p.key === active)!;
  const targetPreset = target ? PRESETS.find((p) => p.key === target)! : null;
  const width = targetPreset ? lerp(activePreset.width, targetPreset.width, t) : activePreset.width;
  const length = targetPreset ? lerp(activePreset.length, targetPreset.length, t) : activePreset.length;

  useLayoutEffect(() => {
    registerGsap();
    palletRef.current?.applyFrame({ progress: 1, explode: 0, camX: CAM.x, camY: CAM.y });
  }, [t, active, target]);

  useLayoutEffect(() => {
    const light = lightRef.current;
    if (!light) return;
    gsap.set(light.vignette, { opacity: 1 });
    gsap.set(light.key, { opacity: 0.3 });
    gsap.set(light.floor, { opacity: 0.35 });
  }, []);

  function selectDimension(key: Exclude<PalletDimension, "custom">) {
    if (key === active || key === target) return;
    tweenRef.current?.kill();
    setTarget(key);
    const proxy = { t: 0 };
    tweenRef.current = gsap.to(proxy, {
      t: 1,
      duration: reducedMotion ? 0.15 : 0.9,
      ease: EASE.mechanical,
      onUpdate: () => setT(proxy.t),
      onComplete: () => {
        setActive(key);
        setTarget(null);
        setT(0);
      },
    });
  }

  return (
    <section id="urunler" className="relative overflow-hidden bg-background px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">Ürün Ölçüleri</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-medium tracking-tight text-paper">
            HER YÜK İÇİN
            <br />
            DOĞRU ÖLÇÜ.
          </h2>
        </div>

        <div className="relative mt-16 h-[52vh] min-h-[380px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <WoodenPallet ref={palletRef} dimension={active} targetDimension={target ?? undefined} footprintT={t} className="w-full" />
          </div>

          <StudioLighting ref={lightRef} />

          <div
            className="pointer-events-none absolute left-[8%] top-1/2 z-20 flex -translate-y-1/2 flex-col items-start gap-0.5"
            aria-hidden="true"
          >
            <span className="font-mono text-lg text-paper tabular-nums">{Math.round(width)}</span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">mm genişlik</span>
          </div>
          <div
            className="pointer-events-none absolute bottom-[10%] right-[8%] z-20 flex flex-col items-end gap-0.5"
            aria-hidden="true"
          >
            <span className="font-mono text-lg text-paper tabular-nums">{Math.round(length)}</span>
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">mm uzunluk</span>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => selectDimension(p.key)}
              aria-pressed={active === p.key}
              className={`rounded-[3px] border px-5 py-2.5 font-mono text-xs tracking-[0.1em] uppercase transition-colors ${
                active === p.key || target === p.key
                  ? "border-paper bg-paper text-ink"
                  : "border-border text-muted-foreground hover:border-paper/40 hover:text-paper"
              }`}
            >
              {p.label}
            </button>
          ))}
          <a
            href="#iletisim"
            className="rounded-[3px] border border-border px-5 py-2.5 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:border-paper/40 hover:text-paper"
          >
            Özel Ölçü Teklifi Al
          </a>
        </div>
      </div>
    </section>
  );
}
