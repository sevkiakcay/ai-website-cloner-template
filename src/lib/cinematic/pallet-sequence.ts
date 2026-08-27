/**
 * Central config for the Google Flow-generated pallet assembly frame
 * sequence. Change `PALLET_FRAME_COUNT` (and the extension, if the real
 * export isn't .webp) here — nothing else in the codebase should hardcode
 * frame paths or a frame total.
 */
export const PALLET_FRAME_COUNT = 240;
export const PALLET_FRAME_BASE_PATH = "/cinematic/pallet/frames";
export const PALLET_FRAME_EXTENSION = "webp";

/** 1-indexed: palletFrameUrl(1) -> frame-0001.webp, palletFrameUrl(240) -> frame-0240.webp */
export function palletFrameUrl(frameNumber: number): string {
  const padded = String(frameNumber).padStart(4, "0");
  return `${PALLET_FRAME_BASE_PATH}/frame-${padded}.${PALLET_FRAME_EXTENSION}`;
}
