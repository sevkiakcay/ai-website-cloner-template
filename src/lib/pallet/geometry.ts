/**
 * Pure geometry for the AKÇAY PALET signature scene — no React, no DOM.
 * Shared by the WoodenPallet renderer and the exploded-view annotation overlay
 * so both agree on the same board layout without prop-drilling DOM refs.
 */

export type PalletDimension = "80x120" | "80x100" | "100x120" | "custom";

export type BoardKind = "bottom-board" | "block" | "top-board";

export type Vec3 = { x: number; y: number; z: number };

export type BoardSpec = {
  id: string;
  kind: BoardKind;
  /** stable index within its kind group, used for staggering + annotation anchors */
  group: number;
  w: number;
  h: number;
  d: number;
  /** final assembled position, local units (~px) */
  pos: Vec3;
  /** unit vector this piece flies apart along in the exploded view */
  explodeDir: Vec3;
  /** offset (relative to assembled pos) it drifts in from pre-assembly */
  scatter: Vec3;
  scatterRot: Vec3;
  /** per-board material seed for subtle grain/tone jitter */
  seed: number;
};

export const FOOTPRINT: Record<Exclude<PalletDimension, "custom">, { x: number; z: number }> = {
  "80x120": { x: 600, z: 400 },
  "80x100": { x: 500, z: 400 },
  "100x120": { x: 600, z: 500 },
};

export const BOTTOM_H = 16;
export const BOTTOM_W = 84;
export const BLOCK_H = 108;
export const BLOCK_W = 84;
export const TOP_H = 16;
export const TOP_W = 78;

/** deterministic pseudo-random in [0,1) — stable across renders, no hydration risk */
export function seeded(i: number, salt: number) {
  const v = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** ease-mapped sub-range: 0 before `from`, 1 after `to`, smooth between */
export function band(t: number, from: number, to: number) {
  return clamp01((t - from) / (to - from));
}

export function buildBoards(footX: number, footZ: number): BoardSpec[] {
  const boards: BoardSpec[] = [];
  const rowsZ = [footZ * -0.5 + BOTTOM_W / 2, 0, footZ * 0.5 - BOTTOM_W / 2];
  const colsX = [
    footX * -0.5 + TOP_W / 2,
    footX * -0.25,
    0,
    footX * 0.25,
    footX * 0.5 - TOP_W / 2,
  ];
  const blockColsX = [footX * -0.5 + BLOCK_W / 2, 0, footX * 0.5 - BLOCK_W / 2];

  const blockY = -(BOTTOM_H / 2 + BLOCK_H / 2);
  const topY = blockY - (BLOCK_H / 2 + TOP_H / 2);

  rowsZ.forEach((z, i) => {
    boards.push({
      id: `bottom-${i}`,
      kind: "bottom-board",
      group: i,
      w: footX,
      h: BOTTOM_H,
      d: BOTTOM_W,
      pos: { x: 0, y: 0, z },
      explodeDir: { x: 0, y: 1, z: 0 },
      scatter: {
        x: (seeded(i, 1) - 0.5) * 480,
        y: -260 - seeded(i, 2) * 160,
        z: (seeded(i, 3) - 0.5) * 200,
      },
      scatterRot: { x: (seeded(i, 4) - 0.5) * 50, y: (seeded(i, 5) - 0.5) * 70, z: (seeded(i, 6) - 0.5) * 30 },
      seed: seeded(i, 41),
    });
  });

  blockColsX.forEach((x, xi) => {
    rowsZ.forEach((z, zi) => {
      const i = xi * 3 + zi;
      const outward = { x: x === 0 ? 0 : Math.sign(x), z: z === 0 ? 0 : Math.sign(z) };
      boards.push({
        id: `block-${xi}-${zi}`,
        kind: "block",
        group: i,
        w: BLOCK_W,
        h: BLOCK_H,
        d: BLOCK_W,
        pos: { x, y: blockY, z },
        explodeDir: { x: outward.x * 0.6, y: 0.75, z: outward.z * 0.6 },
        scatter: {
          x: x + (seeded(i, 11) - 0.5) * 360,
          y: -180 - seeded(i, 12) * 220,
          z: z + (seeded(i, 13) - 0.5) * 300,
        },
        scatterRot: { x: (seeded(i, 14) - 0.5) * 90, y: (seeded(i, 15) - 0.5) * 120, z: (seeded(i, 16) - 0.5) * 90 },
        seed: seeded(i, 42),
      });
    });
  });

  colsX.forEach((x, i) => {
    boards.push({
      id: `top-${i}`,
      kind: "top-board",
      group: i,
      w: TOP_W,
      h: TOP_H,
      d: footZ,
      pos: { x, y: topY, z: 0 },
      explodeDir: { x: 0, y: -1, z: 0 },
      scatter: {
        x: x + (seeded(i, 21) - 0.5) * 200,
        y: 220 + seeded(i, 22) * 220,
        z: (seeded(i, 23) - 0.5) * 260,
      },
      scatterRot: { x: (seeded(i, 24) - 0.5) * 60, y: (seeded(i, 25) - 0.5) * 80, z: (seeded(i, 26) - 0.5) * 40 },
      seed: seeded(i, 43),
    });
  });

  return boards;
}
