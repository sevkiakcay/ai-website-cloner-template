"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers GSAP plugins once, client-side only. Safe to call from every scene. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/** Cinematic easing vocabulary shared across every scroll scene — mechanical, not playful. */
export const EASE = {
  mechanical: "power3.inOut",
  precise: "power2.out",
  cinematic: "power4.out",
  reveal: "power1.out",
  linear: "none",
} as const;

/** ?debugMotion=1 — enables ScrollTrigger markers + a live progress readout. Never on in production use. */
export function isDebugMotion() {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("debugMotion") === "1";
}
