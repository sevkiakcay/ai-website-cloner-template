"use client";

import { useEffect, useRef } from "react";
import { EASE, gsap, ScrollTrigger, isDebugMotion, registerGsap } from "@/lib/animation/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useIsMobile } from "@/hooks/use-media-query";
import { WoodenPallet, type WoodenPalletHandle } from "./wooden-pallet";
import { StudioLighting, type StudioLightingHandle } from "./studio-lighting";
import { PalletAnnotations } from "./pallet-annotations";

const FINAL_CAM = { x: 32, y: -20 };

export function PalletFilm() {
  const sceneRef = useRef<HTMLElement>(null);
  const palletRef = useRef<WoodenPalletHandle>(null);
  const lightRef = useRef<StudioLightingHandle>(null);
  const annotationsRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const explodedLabelRef = useRef<HTMLDivElement>(null);
  const bgTextureRef = useRef<HTMLDivElement>(null);
  const debugRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sceneRef.current || !palletRef.current || !lightRef.current) return;

    registerGsap();
    const pallet = palletRef.current;
    const light = lightRef.current;
    const debug = isDebugMotion();
    if (debug && debugRef.current) debugRef.current.style.display = "block";

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        pallet.applyFrame({ progress: 1, explode: 0, camX: FINAL_CAM.x, camY: FINAL_CAM.y, depthScale: 1 });
        gsap.set([wordmarkRef.current], { opacity: 0 });
        gsap.set(light.vignette, { opacity: 1 });
        gsap.set([light.key, light.bloom, light.floor], { opacity: 0.3 });
        gsap.to([headlineRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: EASE.reveal,
        });
        return;
      }

      const depthScale = isMobile ? 0.6 : 1;
      const camRange = isMobile ? 0.6 : 1;
      const pinPct = isMobile ? 260 : 420;

      const state = {
        progress: 0,
        explode: 0,
        camX: FINAL_CAM.x + 10 * camRange,
        camY: FINAL_CAM.y - 14 * camRange,
        scale: 0.86,
        lift: 26,
      };

      function syncFrame() {
        pallet.applyFrame({
          progress: state.progress,
          explode: state.explode,
          camX: state.camX,
          camY: state.camY,
          depthScale,
          scale: state.scale,
          lift: state.lift,
        });
        if (debug && debugRef.current) {
          debugRef.current.textContent = `progress ${state.progress.toFixed(2)}  explode ${state.explode.toFixed(2)}  cam ${state.camX.toFixed(1)}/${state.camY.toFixed(1)}`;
        }
      }

      // initial resting values so first paint (pre-scroll) is already correct
      gsap.set(headlineRef.current, { opacity: 0, y: 26 });
      gsap.set(ctaRef.current, { opacity: 0, y: 18 });
      gsap.set(explodedLabelRef.current, { opacity: 0, y: 14 });
      syncFrame();

      const tl = gsap.timeline({
        defaults: { ease: EASE.mechanical },
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: `+=${pinPct}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          markers: debug,
        },
        onUpdate: syncFrame,
      });

      // ---- 0 - 8 : dark emergence — wordmark holds, camera settles slightly, texture breathes in ----
      tl.to(wordmarkRef.current, { opacity: 0, duration: 6, ease: EASE.precise }, 2)
        .to(bgTextureRef.current, { opacity: 0.16, duration: 8, ease: EASE.precise }, 0)
        .to(state, { camX: FINAL_CAM.x + 5 * camRange, camY: FINAL_CAM.y - 8 * camRange, duration: 8 }, 0)
        .to(light.floor, { opacity: 0.5, duration: 10 }, 2);

      // ---- 8 - 85 : mechanical assembly — bottom boards, blocks, top boards (staggering lives inside WoodenPallet) ----
      tl.to(state, { progress: 1, duration: 77, ease: EASE.mechanical }, 8)
        .to(state, { camX: FINAL_CAM.x, camY: FINAL_CAM.y, duration: 77, ease: EASE.precise }, 8)
        .to(light.key, { opacity: 0.32, duration: 50, ease: EASE.precise }, 20)
        .to(bgTextureRef.current, { opacity: 0.04, duration: 30, ease: EASE.precise }, 55);

      // ---- 85 - 96 : lock + studio reveal ----
      tl.to(state, { scale: 1, lift: 0, duration: 11, ease: EASE.cinematic }, 85)
        .to(light.bloom, { opacity: 0.55, duration: 6, ease: EASE.precise }, 85)
        .to(light.bloom, { opacity: 0.16, duration: 9, ease: EASE.precise }, 91)
        .to(light.rim, { opacity: 0.5, duration: 8 }, 86)
        .to(light.vignette, { opacity: 1, duration: 6 }, 85)
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 9, ease: EASE.reveal }, 89)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 7, ease: EASE.reveal }, 94);

      // ---- 96 - 108 : hold — headline is readable; camera keeps a faint, continuous drift so scroll never feels inert ----
      tl.to(state, { camY: FINAL_CAM.y - 3 * camRange, duration: 12, ease: EASE.linear }, 96)
        .to(light.key, { opacity: 0.38, duration: 6, ease: EASE.linear }, 96)
        .to(light.key, { opacity: 0.32, duration: 6, ease: EASE.linear }, 102);

      // ---- 108 - 130 : exploded transition — same mounted pallet, camera pulls back, headline exits ----
      tl.to([headlineRef.current, ctaRef.current], { opacity: 0, y: -22, duration: 7, ease: EASE.precise }, 108)
        .to(state, { camX: FINAL_CAM.x - 8 * camRange, camY: FINAL_CAM.y + 16 * camRange, duration: 22, ease: EASE.mechanical }, 108)
        .to(state, { explode: 1, duration: 22, ease: EASE.mechanical }, 108)
        .to(light.rim, { opacity: 0.22, duration: 18 }, 108)
        .to(light.key, { opacity: 0.2, duration: 18 }, 108)
        .to(light.floor, { opacity: 0.22, duration: 18 }, 108);

      // ---- 130 - 140 : annotations settle in ----
      tl.to(annotationsRef.current, { opacity: 1, duration: 8, ease: EASE.reveal }, 131)
        .to(explodedLabelRef.current, { opacity: 1, y: 0, duration: 8, ease: EASE.reveal }, 131);

      requestAnimationFrame(() => ScrollTrigger.refresh());
      if (typeof document !== "undefined" && "fonts" in document) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    }, sceneRef);

    return () => ctx.revert();
  }, [reducedMotion, isMobile]);

  return (
    <section
      ref={sceneRef}
      aria-label="Akçay Palet — üretim ve mühendislik tanıtımı"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      <div
        ref={bgTextureRef}
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "repeating-linear-gradient(100deg, rgba(181,121,58,0.5) 0px, transparent 2px, transparent 14px, rgba(90,60,30,0.4) 16px, transparent 30px)",
          mixBlendMode: "overlay",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <WoodenPallet ref={palletRef} className="w-full" />
      </div>

      <StudioLighting ref={lightRef} />
      <PalletAnnotations ref={annotationsRef} />

      <div
        ref={wordmarkRef}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 text-center"
      >
        <span className="font-mono text-xs tracking-[0.5em] text-paper/70 uppercase">Akçay Palet</span>
        <span className="text-3xl font-medium tracking-tight text-paper sm:text-4xl">
          WOOD.
          <br />
          ENGINEERED.
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-[12%] z-30 flex flex-col items-center gap-8 px-6 text-center sm:bottom-[10%]">
        <div ref={headlineRef}>
          <h1 className="text-balance text-[clamp(2.4rem,7.5vw,6.5rem)] font-medium leading-[0.98] tracking-tight text-paper">
            YÜKÜN ALTINDA
            <br />
            MÜHENDİSLİK VAR.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-balance text-sm text-muted-foreground sm:text-base">
            Üretimden sevkiyata güvenilir ahşap palet çözümleri.
          </p>
        </div>
        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#urunler"
            className="rounded-[3px] bg-primary px-7 py-3 text-xs font-medium tracking-[0.14em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
          >
            Ürünleri Keşfet
          </a>
          <a
            href="#iletisim"
            className="rounded-[3px] border border-border px-7 py-3 text-xs font-medium tracking-[0.14em] text-paper uppercase transition-colors hover:bg-white/5"
          >
            Teklif Al
          </a>
        </div>
      </div>

      <div
        ref={explodedLabelRef}
        className="pointer-events-none absolute left-1/2 top-[8%] z-20 -translate-x-1/2 text-center"
      >
        <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground uppercase">
          Yapısal İnceleme
        </span>
      </div>

      <div
        ref={debugRef}
        className="pointer-events-none absolute left-3 top-3 z-50 hidden rounded bg-black/80 px-2 py-1 font-mono text-[10px] text-lime-300"
      />
    </section>
  );
}
