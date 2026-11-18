/**
 * TMDB serves every image at a fixed set of widths from its own CDN, so PWW
 * picks the right one per screen size with srcset instead of paying for
 * image processing. Sizes come from TMDB's /configuration endpoint.
 */

const IMAGE_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_WIDTHS = {
  poster: [92, 154, 185, 342, 500, 780],
  backdrop: [300, 780, 1280],
  profile: [45, 185],
  logo: [45, 92, 154, 185, 300, 500],
} as const;

export type ImageKind = keyof typeof IMAGE_WIDTHS;

export function tmdbImageUrl(path: string, width: number | "original"): string {
  const size = width === "original" ? "original" : `w${width}`;
  return `${IMAGE_BASE}/${size}${path}`;
}

/** A srcset covering every width TMDB offers for this kind of image. */
export function tmdbSrcSet(path: string, kind: ImageKind): string {
  return IMAGE_WIDTHS[kind].map((width) => `${tmdbImageUrl(path, width)} ${width}w`).join(", ");
}

/** The smallest TMDB width that is at least `target` pixels wide. */
export function closestWidth(kind: ImageKind, target: number): number {
  const widths = IMAGE_WIDTHS[kind];
  return widths.find((width) => width >= target) ?? widths[widths.length - 1]!;
}
