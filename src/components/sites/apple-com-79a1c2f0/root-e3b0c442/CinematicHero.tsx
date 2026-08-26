"use client";

import { useLayoutEffect, useRef } from "react";
import { ensureGsapRegistered, gsap } from "@/lib/animation/gsap";

const BLOCKS: Array<[number, number]> = [
  [96, 300],
  [340, 300],
  [584, 300],
  [96, 250],
  [340, 250],
  [584, 250],
];
const STRINGER_XS = [80, 340, 600];
const CAP_XS = [66, 315, 564];
const DECK_COUNT = 6;

/**
 * Desktop cinematic hero — a GSAP ScrollTrigger scrub timeline that plays
 * out over a tall wrapper while the hero itself stays visually pinned via
 * native CSS `position: sticky` (simpler and more predictable across
 * layouts than GSAP's own pin-spacer, which needs a fixed, non-flex
 * ancestor chain to size correctly). It scrubs the euro-pallet from a
 * separated, exploded-view state into its finished, engineered form as the
 * user scrolls: support blocks → bottom stringers → connecting cap
 * battens → top deck. Only this one section pins (per GSAP's own guidance:
 * pinning more than 1-2 sections per page fights native scroll feel).
 * Gated behind `useCinematicCapability` in Hero.tsx — mobile, touch, and
 * `prefers-reduced-motion` users get `HeroStatic` instead.
 */
export function CinematicHero() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    ensureGsapRegistered();
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray<SVGElement>('[data-role="block"]');
      const stringers = gsap.utils.toArray<SVGElement>('[data-role="stringer"]');
      const caps = gsap.utils.toArray<SVGElement>('[data-role="cap"]');
      const deck = gsap.utils.toArray<SVGElement>('[data-role="deck"]');
      const flashBlocks = section.querySelector('[data-flash="blocks"]');
      const flashStringers = section.querySelector('[data-flash="stringers"]');
      const flashCaps = section.querySelector('[data-flash="caps"]');
      const flashDeck = section.querySelector('[data-flash="deck"]');
      const sheen = section.querySelector('[data-role="sheen"]');
      const mark = section.querySelector('[data-role="brand-mark"]');
      const annotations = gsap.utils.toArray<HTMLElement>('[data-role="annotation"]');
      const introText = section.querySelector('[data-role="intro-text"]');
      const stageGroup = section.querySelector('[data-role="stage-group"]');

      // Scene 1 — components already visible, but physically separated (not faded in).
      gsap.set(blocks, { y: (i: number) => -230 - (i % 2) * 18, rotation: (i: number) => (i % 2 === 0 ? -5 : 5) });
      gsap.set(stringers, { y: -190, rotation: (i: number) => (i - 1) * 3 });
      gsap.set(caps, { y: -150 });
      gsap.set(deck, {
        x: (i: number) => (i % 2 === 0 ? -240 : 240),
        y: -110,
        rotation: (i: number) => (i % 2 === 0 ? -9 : 9),
      });
      gsap.set([flashBlocks, flashStringers, flashCaps, flashDeck, mark], { opacity: 0 });
      gsap.set(sheen, { opacity: 0, xPercent: -140 });
      gsap.set(annotations, { opacity: 0, y: 8 });
      // Intro copy is visible immediately on load (no scroll required to read it).
      gsap.set(introText, { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          // The wrapper's own CSS height (see JSX below) IS the scroll distance —
          // no pixel math needed, and it's naturally responsive to viewport size.
          end: "bottom bottom",
          scrub: 1,
        },
      });

      tl.to(introText, { opacity: 0, y: -22, duration: 0.06 }, 0.14)
        // Stage 1 — destek blokları
        .to(blocks, { y: 0, rotation: 0, duration: 0.16, stagger: 0.02 }, 0.16)
        .to(flashBlocks, { opacity: 0.45, duration: 0.02 }, 0.3)
        .to(flashBlocks, { opacity: 0, duration: 0.05 }, 0.32)
        // Stage 2 — alt elemanlar
        .to(stringers, { y: 0, rotation: 0, duration: 0.14, stagger: 0.03 }, 0.34)
        .to(flashStringers, { opacity: 0.4, duration: 0.02 }, 0.46)
        .to(flashStringers, { opacity: 0, duration: 0.05 }, 0.48)
        // Stage 3 — ara elemanlar
        .to(caps, { y: 0, duration: 0.12, stagger: 0.02 }, 0.5)
        .to(flashCaps, { opacity: 0.35, duration: 0.02 }, 0.6)
        .to(flashCaps, { opacity: 0, duration: 0.05 }, 0.62)
        // Stage 4 — üst deck tahtaları
        .to(deck, { x: 0, y: 0, rotation: 0, duration: 0.16, stagger: 0.025 }, 0.64)
        .to(flashDeck, { opacity: 0.5, duration: 0.02 }, 0.78)
        .to(flashDeck, { opacity: 0, duration: 0.06 }, 0.8)
        // Scene 3 — completed pallet: light sweep, brand mark, camera settle
        .to(sheen, { opacity: 0.4, duration: 0.02 }, 0.8)
        .to(sheen, { xPercent: 140, duration: 0.12, ease: "power1.inOut" }, 0.8)
        .to(sheen, { opacity: 0, duration: 0.04 }, 0.9)
        .to(mark, { opacity: 0.7, duration: 0.06 }, 0.84)
        .to(stageGroup, { scale: 1.025, duration: 0.05 }, 0.86)
        .to(stageGroup, { scale: 1, duration: 0.06 }, 0.92)
        // Scene 4 — technical annotations
        .to(annotations, { opacity: 1, y: 0, duration: 0.1, stagger: 0.03 }, 0.88);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[420vh]">
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
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 62%, color-mix(in oklch, var(--surface-dark) 55%, transparent) 88%, var(--surface-dark) 100%), radial-gradient(120% 65% at 50% 100%, black 0%, transparent 55%)",
          }}
        />

        <div
          data-role="intro-text"
          className="absolute inset-x-0 top-[16%] z-20 mx-auto max-w-[820px] px-6 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-surface-dark-foreground/50 uppercase">
            Akçay Palet
          </p>
          <h1 className="mt-5 text-[42px] leading-[1.05] font-semibold tracking-tight md:text-[64px]">
            Yükünüzü Taşıyan Güç.
          </h1>
          <p className="mt-4 text-[16px] text-surface-dark-foreground/65 md:text-[19px]">
            Endüstriyel ölçekte, güvenilir ve sürdürülebilir palet çözümleri.
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

        <div data-role="stage-group" className="relative z-10 w-full max-w-[760px] px-6">
          <svg viewBox="0 0 720 460" fill="none" className="h-auto w-full overflow-visible">
            <defs>
              <linearGradient id="c-plank-grain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D9A05E" />
                <stop offset="12%" stopColor="#C48C4E" />
                <stop offset="48%" stopColor="#B9814A" />
                <stop offset="76%" stopColor="#A9723F" />
                <stop offset="100%" stopColor="#8F5E33" />
              </linearGradient>
              <linearGradient id="c-plank-grain-alt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#CE9457" />
                <stop offset="20%" stopColor="#BD8749" />
                <stop offset="55%" stopColor="#AF7A41" />
                <stop offset="100%" stopColor="#8A5A32" />
              </linearGradient>
              <linearGradient id="c-block-face" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#332C26" />
                <stop offset="100%" stopColor="#211C18" />
              </linearGradient>
              <linearGradient id="c-stringer-face" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#463A2E" />
                <stop offset="100%" stopColor="#2C241D" />
              </linearGradient>
              <linearGradient id="c-sheen" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="50%" stopColor="white" stopOpacity="0.9" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            <ellipse cx="360" cy="400" rx="260" ry="28" fill="black" opacity="0.35" />
            <ellipse cx="360" cy="400" rx="330" ry="42" fill="black" opacity="0.12" />

            {/* Stage 1 — destek blokları */}
            {BLOCKS.map(([x, y], i) => (
              <g key={i} data-role="block" className="cinematic-part">
                <rect x={x} y={y} width="40" height="56" fill="url(#c-block-face)" stroke="#4A4038" strokeWidth="1" />
                <rect x={x} y={y} width="40" height="6" fill="#6B5D4E" />
              </g>
            ))}
            <ellipse cx="360" cy="358" rx="270" ry="14" fill="currentColor" data-flash="blocks" />

            {/* Stage 2 — alt elemanlar */}
            {STRINGER_XS.map((x, i) => (
              <rect
                key={i}
                data-role="stringer"
                className="cinematic-part"
                x={x - 20}
                y="256"
                width="40"
                height="150"
                fill="url(#c-stringer-face)"
                stroke="#5A4C3C"
                strokeWidth="1"
                opacity="0.94"
              />
            ))}
            <rect data-role="stringer" className="cinematic-part" x="60" y="330" width="600" height="20" fill="#4A3D2F" opacity="0.88" />
            <ellipse cx="360" cy="340" rx="290" ry="12" fill="currentColor" data-flash="stringers" />

            {/* Stage 3 — ara elemanlar */}
            {CAP_XS.map((x, i) => (
              <rect
                key={i}
                data-role="cap"
                className="cinematic-part"
                x={x}
                y="196"
                width="92"
                height="16"
                rx="2"
                fill="#5C4A36"
                stroke="#3C3022"
                strokeWidth="1"
              />
            ))}
            <ellipse cx="360" cy="205" rx="300" ry="10" fill="currentColor" data-flash="caps" />

            {/* Stage 4 — üst deck tahtaları */}
            {Array.from({ length: DECK_COUNT }, (_, i) => (
              <g key={i} data-role="deck" className="cinematic-part">
                <rect
                  x={60 + i * 102}
                  y="180"
                  width="88"
                  height="220"
                  fill={i % 2 === 0 ? "url(#c-plank-grain)" : "url(#c-plank-grain-alt)"}
                  stroke="#7A5230"
                  strokeWidth="1.5"
                />
                <rect x={60 + i * 102} y="180" width="88" height="5" fill="#EFC98D" opacity="0.55" />
                <line x1={60 + i * 102 + 10} y1="190" x2={60 + i * 102 + 10} y2="390" stroke="#7A5230" strokeWidth="0.5" opacity="0.45" />
                <line x1={60 + i * 102 + 60} y1="190" x2={60 + i * 102 + 60} y2="388" stroke="#6B4626" strokeWidth="0.4" opacity="0.3" />
                {i === 2 && (
                  <text
                    data-role="brand-mark"
                    x={60 + i * 102 + 44}
                    y="292"
                    textAnchor="middle"
                    fontSize="15"
                    fontWeight="700"
                    letterSpacing="1"
                    fill="#2C1D10"
                    opacity="0"
                  >
                    AKÇAY
                  </text>
                )}
              </g>
            ))}
            <ellipse cx="360" cy="185" rx="330" ry="12" fill="#FFEFD9" data-flash="deck" />

            <g stroke="currentColor" strokeWidth="1" opacity="0.35">
              <line x1="60" y1="424" x2="660" y2="424" />
              <line x1="60" y1="418" x2="60" y2="430" />
              <line x1="660" y1="418" x2="660" y2="430" />
            </g>
            <text x="360" y="448" textAnchor="middle" fontSize="13" letterSpacing="1.5" fill="currentColor" opacity="0.45">
              1200 mm
            </text>

            <g style={{ mixBlendMode: "overlay" }}>
              <rect data-role="sheen" x="0" y="150" width="220" height="270" fill="url(#c-sheen)" />
            </g>
          </svg>

          {/* Scene 4 — technical annotations, blueprint-style, not marketing cards */}
          <div
            data-role="annotation"
            className="absolute top-[6%] left-[2%] max-w-[150px] border-l border-surface-dark-foreground/25 pl-3 text-left text-[11px] tracking-wide text-surface-dark-foreground/60"
          >
            80 × 120 cm
          </div>
          <div
            data-role="annotation"
            className="absolute top-[6%] right-[2%] max-w-[170px] border-r border-surface-dark-foreground/25 pr-3 text-right text-[11px] tracking-wide text-surface-dark-foreground/60"
          >
            EUR / EPAL standart ölçü referansı
          </div>
          <div
            data-role="annotation"
            className="absolute bottom-[10%] left-[0%] max-w-[160px] border-l border-surface-dark-foreground/25 pl-3 text-left text-[11px] tracking-wide text-surface-dark-foreground/60"
          >
            ISPM-15 uyumlu ısıl işlem süreci
          </div>
          <div
            data-role="annotation"
            className="absolute right-[0%] bottom-[10%] max-w-[130px] border-r border-surface-dark-foreground/25 pr-3 text-right text-[11px] tracking-wide text-surface-dark-foreground/60"
          >
            İhracata hazır
          </div>
        </div>
      </section>
    </div>
  );
}
