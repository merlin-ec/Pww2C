import { isRegionCode, type RegionCode } from "@/lib/regions";
import {
  listedItem,
  type MovieDetailsResponse,
  type TvDetailsResponse,
  type regionProviders,
} from "@/lib/tmdb/schemas";
import type { z } from "zod";
import type {
  CastCredit,
  MediaType,
  Offer,
  OfferType,
  PersonCredit,
  RegionAvailability,
  TitleDetails,
  TitleSummary,
} from "./types";

/**
 * Pure functions that turn TMDB's responses into PWW's own shapes. Keeping
 * this separate from the fetching means it can be tested without a network.
 */

const CAST_LIMIT = 12;
const OFFER_TYPES: OfferType[] = ["flatrate", "free", "ads", "rent", "buy"];

export function titleKey(mediaType: MediaType, tmdbId: number): string {
  return `${mediaType}:${tmdbId}`;
}

/** Parses a TMDB id from a URL segment; null unless it's a plain positive integer. */
export function parseTmdbId(value: string): number | null {
  if (!/^[1-9][0-9]{0,9}$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) && id <= 2_147_483_647 ? id : null;
}

export function yearOf(date: string | null | undefined): number | null {
  const match = date ? /^(\d{4})-\d{2}-\d{2}$/.exec(date) : null;
  return match ? Number(match[1]) : null;
}

function dateOrNull(date: string | null | undefined): string | null {
  return yearOf(date) === null ? null : (date ?? null);
}

function textOrNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function uniquePeople(people: PersonCredit[]): PersonCredit[] {
  const seen = new Set<number>();
  return people.filter((person) => !seen.has(person.personId) && seen.add(person.personId));
}

function crewWithJobs(
  crew: MovieDetailsResponse["credits"]["crew"],
  jobs: readonly string[],
): PersonCredit[] {
  return uniquePeople(
    crew
      .filter((member) => member.job != null && jobs.includes(member.job))
      .map((member) => ({
        personId: member.id,
        name: member.name,
        profilePath: member.profile_path ?? null,
      })),
  );
}

function topCast(cast: MovieDetailsResponse["credits"]["cast"]): CastCredit[] {
  const seen = new Set<number>();
  return [...cast]
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .filter((member) => !seen.has(member.id) && seen.add(member.id))
    .slice(0, CAST_LIMIT)
    .map((member) => ({
      personId: member.id,
      name: member.name,
      profilePath: member.profile_path ?? null,
      character: textOrNull(member.character),
    }));
}

export function normalizeAvailability(
  results: Record<string, z.infer<typeof regionProviders>>,
): Partial<Record<RegionCode, RegionAvailability>> {
  const availability: Partial<Record<RegionCode, RegionAvailability>> = {};
  for (const [region, providers] of Object.entries(results)) {
    if (!isRegionCode(region)) continue;
    const offers: Offer[] = [];
    const seen = new Set<string>();
    for (const offerType of OFFER_TYPES) {
      for (const provider of providers[offerType] ?? []) {
        const key = `${provider.provider_id}:${offerType}`;
        if (seen.has(key)) continue;
        seen.add(key);
        offers.push({
          providerId: provider.provider_id,
          providerName: provider.provider_name,
          logoPath: provider.logo_path ?? null,
          offerType,
          displayPriority: provider.display_priority ?? 999,
        });
      }
    }
    offers.sort((a, b) => a.displayPriority - b.displayPriority);
    availability[region] = { link: providers.link ?? null, offers };
  }
  return availability;
}

export function normalizeMovie(data: MovieDetailsResponse): TitleDetails {
  const crew = data.credits.crew;
  return {
    id: titleKey("movie", data.id),
    mediaType: "movie",
    tmdbId: data.id,
    title: data.title,
    year: yearOf(data.release_date),
    posterPath: data.poster_path ?? null,
    originalTitle: textOrNull(data.original_title),
    originalLanguage: textOrNull(data.original_language),
    overview: textOrNull(data.overview),
    tagline: textOrNull(data.tagline),
    releaseDate: dateOrNull(data.release_date),
    runtimeMinutes: data.runtime && data.runtime > 0 ? data.runtime : null,
    numberOfSeasons: null,
    status: textOrNull(data.status),
    genres: data.genres,
    keywords: data.keywords.keywords,
    originCountries:
      data.origin_country.length > 0
        ? data.origin_country
        : data.production_countries.map((country) => country.iso_3166_1),
    backdropPath: data.backdrop_path ?? null,
    voteAverage: data.vote_average ?? null,
    voteCount: data.vote_count ?? null,
    popularity: data.popularity ?? null,
    imdbId: textOrNull(data.imdb_id),
    directors: crewWithJobs(crew, ["Director"]),
    creators: [],
    writers: crewWithJobs(crew, ["Screenplay", "Writer", "Story"]),
    cinematographers: crewWithJobs(crew, ["Director of Photography"]),
    composers: crewWithJobs(crew, ["Original Music Composer", "Music"]),
    cast: topCast(data.credits.cast),
    availability: normalizeAvailability(data["watch/providers"].results),
  };
}

export function normalizeTv(data: TvDetailsResponse): TitleDetails {
  const crew = data.credits.crew;
  const runtimes = data.episode_run_time.filter((minutes) => minutes > 0);
  return {
    id: titleKey("tv", data.id),
    mediaType: "tv",
    tmdbId: data.id,
    title: data.name,
    year: yearOf(data.first_air_date),
    posterPath: data.poster_path ?? null,
    originalTitle: textOrNull(data.original_name),
    originalLanguage: textOrNull(data.original_language),
    overview: textOrNull(data.overview),
    tagline: textOrNull(data.tagline),
    releaseDate: dateOrNull(data.first_air_date),
    runtimeMinutes: runtimes.length > 0 ? Math.min(...runtimes) : null,
    numberOfSeasons: data.number_of_seasons ?? null,
    status: textOrNull(data.status),
    genres: data.genres,
    keywords: data.keywords.results,
    originCountries: data.origin_country,
    backdropPath: data.backdrop_path ?? null,
    voteAverage: data.vote_average ?? null,
    voteCount: data.vote_count ?? null,
    popularity: data.popularity ?? null,
    imdbId: textOrNull(data.external_ids.imdb_id),
    directors: crewWithJobs(crew, ["Director"]),
    creators: uniquePeople(
      data.created_by.map((person) => ({
        personId: person.id,
        name: person.name,
        profilePath: person.profile_path ?? null,
      })),
    ),
    writers: crewWithJobs(crew, ["Screenplay", "Writer", "Story"]),
    cinematographers: crewWithJobs(crew, ["Director of Photography"]),
    composers: crewWithJobs(crew, ["Original Music Composer", "Music"]),
    cast: topCast(data.credits.cast),
    availability: normalizeAvailability(data["watch/providers"].results),
  };
}

/**
 * Turns one entry from a TMDB list (search, trending) into a summary.
 * Returns null for people, collections, adult titles and anything malformed,
 * so one odd entry never breaks a whole page of results.
 */
export function normalizeListed(raw: unknown): TitleSummary | null {
  const parsed = listedItem.safeParse(raw);
  if (!parsed.success) return null;
  const item = parsed.data;
  if (item.media_type === "movie") {
    if (item.adult) return null;
    return {
      id: titleKey("movie", item.id),
      mediaType: "movie",
      tmdbId: item.id,
      title: item.title,
      year: yearOf(item.release_date),
      posterPath: item.poster_path ?? null,
    };
  }
  if (item.media_type === "tv") {
    if (item.adult) return null;
    return {
      id: titleKey("tv", item.id),
      mediaType: "tv",
      tmdbId: item.id,
      title: item.name,
      year: yearOf(item.first_air_date),
      posterPath: item.poster_path ?? null,
    };
  }
  return null;
}
