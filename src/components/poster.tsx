import { tmdbImageUrl, tmdbSrcSet } from "@/lib/tmdb/images";

type PosterProps = {
  path: string | null;
  title: string;
  /** How wide the poster renders, for the browser to pick a file, e.g. "(min-width: 640px) 180px, 33vw". */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * A film or show poster at the right resolution for the screen, straight from
 * TMDB's image CDN. Posters are always 2:3, so the space is reserved before
 * the image loads and nothing jumps around.
 */
export function Poster({ path, title, sizes, priority = false, className = "" }: PosterProps) {
  if (!path) {
    return (
      <div
        className={`flex aspect-[2/3] items-center justify-center rounded-md border border-seam bg-curtain p-3 text-center font-display text-lg font-bold uppercase leading-tight text-program ${className}`}
        role="img"
        aria-label={`${title} (no poster)`}
      >
        {title}
      </div>
    );
  }

  return (
    // TMDB already serves every size we need, so we skip Next's image optimiser.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tmdbImageUrl(path, 342)}
      srcSet={tmdbSrcSet(path, "poster")}
      sizes={sizes}
      alt={`Poster for ${title}`}
      width={342}
      height={513}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`aspect-[2/3] h-auto w-full rounded-md border border-seam/60 bg-curtain object-cover ${className}`}
    />
  );
}
