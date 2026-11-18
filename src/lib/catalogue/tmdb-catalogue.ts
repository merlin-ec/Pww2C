import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { tmdbGet } from "@/lib/tmdb/client";
import { movieDetails, pagedList, tvDetails } from "@/lib/tmdb/schemas";
import { normalizeListed, normalizeMovie, normalizeTv } from "./normalize";
import type { MediaType, SearchPage, TitleDetails, TitleSummary } from "./types";

/**
 * Cached reads from TMDB. Each function keeps its result for a while so a
 * popular title page costs TMDB one request per day, not one per visitor.
 * TMDB's terms allow caching for up to six months; these lifetimes are far
 * shorter so where-to-watch stays current.
 */

const DETAILS_EXTRAS = "credits,keywords,watch/providers";

export async function getTitleDetails(
  mediaType: MediaType,
  tmdbId: number,
): Promise<TitleDetails | null> {
  "use cache";
  cacheLife("days");
  cacheTag(`title:${mediaType}:${tmdbId}`);

  if (mediaType === "movie") {
    const data = await tmdbGet(`/movie/${tmdbId}`, movieDetails, {
      append_to_response: DETAILS_EXTRAS,
    });
    return data ? normalizeMovie(data) : null;
  }
  const data = await tmdbGet(`/tv/${tmdbId}`, tvDetails, {
    append_to_response: `${DETAILS_EXTRAS},external_ids`,
  });
  return data ? normalizeTv(data) : null;
}

export async function searchTitles(query: string, page = 1): Promise<SearchPage> {
  "use cache";
  cacheLife("hours");

  const data = await tmdbGet("/search/multi", pagedList, {
    query,
    page,
    include_adult: false,
  });
  return {
    query,
    page,
    totalPages: Math.min(data?.total_pages ?? 0, 20),
    results: (data?.results ?? []).map(normalizeListed).filter((item) => item !== null),
  };
}

export async function getTrending(): Promise<TitleSummary[]> {
  "use cache";
  cacheLife("hours");

  const data = await tmdbGet("/trending/all/week", pagedList);
  return (data?.results ?? [])
    .map(normalizeListed)
    .filter((item) => item !== null)
    .slice(0, 18);
}
