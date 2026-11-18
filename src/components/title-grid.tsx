import Link from "next/link";
import type { TitleSummary } from "@/lib/catalogue/types";
import { Poster } from "./poster";

export function titleHref(title: Pick<TitleSummary, "mediaType" | "tmdbId">): string {
  return `/${title.mediaType}/${title.tmdbId}`;
}

/** A responsive grid of posters with title and year underneath. */
export function TitleGrid({ titles }: { titles: TitleSummary[] }) {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {titles.map((title) => (
        <li key={title.id}>
          <Link href={titleHref(title)} className="group block">
            <Poster
              path={title.posterPath}
              title={title.title}
              sizes="(min-width: 1024px) 160px, (min-width: 768px) 18vw, (min-width: 640px) 23vw, 31vw"
              className="transition-[border-color] group-hover:border-brass"
            />
            <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug group-hover:text-brass-bright">
              {title.title}
            </p>
            <p className="text-xs text-program">
              {title.year ?? "Year unknown"}
              {title.mediaType === "tv" ? ", series" : ""}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function TitleGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <ul
      className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <div className="skeleton aspect-[2/3]" />
          <div className="skeleton mt-2 h-4 w-4/5" />
        </li>
      ))}
    </ul>
  );
}
