"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/animation/gsap";
import { PALLET_FRAME_COUNT, palletFrameUrl } from "@/lib/cinematic/pallet-sequence";

const FIRST_BLOCK_SIZE = 24;
const SPACED_STRIDE = 8;

/** Draws `img` into the canvas with object-fit: cover semantics (crop, never stretch). */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) {
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = cw / ch;
  let sx = 0;
  let sy = 0;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (imageRatio > canvasRatio) {
    sw = img.naturalHeight * canvasRatio;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasRatio;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
}

/**
 * Desktop cinematic hero — the film itself. Google Flow rendered the
 * assembly (raw timber → engineered pallet) as 240 frames; this component's
 * only job is mapping scroll progress to a frame index and painting it to a
 * <canvas> (not 240 <img> elements). No per-part GSAP tweening — the Flow
 * sequence already contains the cinematic movement. A single GSAP
 * ScrollTrigger scrub drives both the frame index and the surrounding
 * typography/annotations. Pinned via native CSS `sticky` (see CinematicHero
 * history — GSAP's own pin-spacer didn't size correctly in this layout).
 * Gated behind `useCinematicCapability` in Hero.tsx.
 */
export function CinematicFrameHero() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(PALLET_FRAME_COUNT).fill(null));
  const currentFrameRef = useRef(0);
  const [posterReady, setPosterReady] = useState(false);

  function draw(frameNumber: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let img = imagesRef.current[frameNumber - 1];
    if (!img) {
      // Graceful fallback while still loading: nearest already-loaded frame, so
      // scrubbing ahead of the loader never flashes blank — no visible frame jumping.
      for (let d = 1; d < PALLET_FRAME_COUNT && !img; d++) {
        img = imagesRef.current[frameNumber - 1 - d] ?? imagesRef.current[frameNumber - 1 + d] ?? null;
      }
    }
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    drawCover(ctx, img, cw, ch);
  }

  // Progressive frame loading: poster -> first block -> spaced coverage -> the rest, idle-scheduled.
  useLayoutEffect(() => {
    let cancelled = false;

    function loadFrame(frameNumber: number): Promise<void> {
      return new Promise((resolve) => {
        if (imagesRef.current[frameNumber - 1]) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          imagesRef.current[frameNumber - 1] = img;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = palletFrameUrl(frameNumber);
      });
    }

    // Waits for a genuine engagement signal (scroll/wheel/touch) before fetching the
    // remaining ~90% of frames — a visitor who bounces before scrolling never pays
    // for them. Resolves immediately if the user is already mid-scroll by the time
    // the first block finishes loading.
    function waitForScrollIntent(): Promise<void> {
      return new Promise((resolve) => {
        if (window.scrollY > 4) {
          resolve();
          return;
        }
        const events: Array<keyof WindowEventMap> = ["scroll", "wheel", "touchmove"];
        const onIntent = () => {
          events.forEach((e) => window.removeEventListener(e, onIntent));
          resolve();
        };
        events.forEach((e) => window.addEventListener(e, onIntent, { passive: true, once: true }));
      });
    }

    async function run() {
      await loadFrame(1);
      if (cancelled) return;
      setPosterReady(true);
      draw(1);

      for (let n = 2; n <= FIRST_BLOCK_SIZE; n++) {
        if (cancelled) return;
        await loadFrame(n);
      }

      await waitForScrollIntent();
      if (cancelled) return;

      for (let n = FIRST_BLOCK_SIZE + 1; n <= PALLET_FRAME_COUNT; n += SPACED_STRIDE) {
        if (cancelled) return;
        await loadFrame(n);
      }

      for (let n = 1; n <= PALLET_FRAME_COUNT; n++) {
        if (cancelled) return;
        if (imagesRef.current[n - 1]) continue;
        await loadFrame(n);
        await new Promise<void>((resolve) => {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(() => resolve(), { timeout: 200 });
          } else {
            window.setTimeout(resolve, 16);
          }
        });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas sizing (device-pixel-ratio aware) + redraw on resize.
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const stage = canvas.parentElement;
    if (!stage) return;

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      if (currentFrameRef.current > 0) draw(currentFrameRef.current);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Scroll-driven timeline: frame index + intro/annotation typography, one ScrollTrigger.
  useLayoutEffect(() => {
    ensureGsapRegistered();
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      const introText = section.querySelector('[data-role="intro-text"]');
      const annotations = gsap.utils.toArray<HTMLElement>('[data-role="annotation"]');

      gsap.set(introText, { opacity: 1, y: 0 });
      gsap.set(annotations, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const frame = Math.min(
              PALLET_FRAME_COUNT,
              Math.max(1, Math.round(1 + self.progress * (PALLET_FRAME_COUNT - 1))),
            );
            if (frame !== currentFrameRef.current) {
              currentFrameRef.current = frame;
              draw(frame);
            }
          },
        },
      });

      // Text recedes early so the pallet owns the screen through the assembly.
      tl.to(introText, { opacity: 0, y: -20, duration: 0.1, ease: "power1.out" }, 0.05)
        // Business-proof annotations in the final ~18% of the sequence.
        .to(annotations, { opacity: 1, y: 0, duration: 0.08, stagger: 0.03, ease: "power1.out" }, 0.82);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[400vh]">
      <section
        ref={sectionRef}
        id="ahsap-palet"
        className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden bg-surface-dark text-surface-dark-foreground"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 18%, color-mix(in oklch, var(--primary) 22%, transparent) 0%, transparent 70%)",
          }}
        />

        <div
          data-role="intro-text"
          className="absolute inset-x-0 top-[14%] z-20 mx-auto max-w-[820px] px-6 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-surface-dark-foreground/50 uppercase">
            Akçay Palet
          </p>
          <h1 className="font-heading mt-5 text-[40px] leading-[1.04] font-bold tracking-[-0.02em] md:text-[62px]">
            Yükünüzü Taşıyan Güç.
          </h1>
          <p className="mt-4 text-[15px] text-surface-dark-foreground/65 md:text-[18px]">
            Endüstriyel ölçekte, güvenilir ve ihtiyaca özel palet çözümleri.
          </p>
          <div className="mt-7 flex items-center justify-center gap-4 text-[15px] font-medium">
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
        </div>

        <div className="relative z-10 mx-6 aspect-video w-full max-w-[1000px] overflow-hidden rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
          <canvas
            ref={canvasRef}
            className="h-full w-full transition-opacity duration-700"
            style={{ opacity: posterReady ? 1 : 0 }}
            role="img"
            aria-label="Akçay Palet ahşap palet montajı — Google Flow sinematik dizisi"
          />

          {/* Business-proof annotations, final ~18% of the sequence — blueprint-style, not marketing cards. */}
          <div
            data-role="annotation"
            className="absolute top-[8%] left-[4%] max-w-[140px] border-l border-white/25 pl-3 text-left text-[11px] tracking-wide text-white/70"
          >
            80 × 120 cm
          </div>
          <div
            data-role="annotation"
            className="absolute top-[8%] right-[4%] max-w-[150px] border-r border-white/25 pr-3 text-right text-[11px] tracking-wide text-white/70"
          >
            İhracata uygun
          </div>
          <div
            data-role="annotation"
            className="absolute bottom-[8%] left-[4%] max-w-[150px] border-l border-white/25 pl-3 text-left text-[11px] tracking-wide text-white/70"
          >
            Isıl işlem seçeneği
          </div>
          <div
            data-role="annotation"
            className="absolute right-[4%] bottom-[8%] max-w-[150px] border-r border-white/25 pr-3 text-right text-[11px] tracking-wide text-white/70"
          >
            Özel ölçü üretim
          </div>
        </div>
      </section>
    </div>
  );
}
