import { z } from "zod";

/**
 * The parts of TMDB's responses PWW uses. Unknown fields are dropped and most
 * fields are optional, because TMDB is community-edited and often incomplete.
 */

const imagePath = z.string().min(1).nullish();
const isoDate = z.string().nullish(); // TMDB sends "" for unknown dates

const genre = z.object({ id: z.number().int(), name: z.string() });
const keyword = z.object({ id: z.number().int(), name: z.string() });

export const castMember = z.object({
  id: z.number().int(),
  name: z.string(),
  character: z.string().nullish(),
  order: z.number().int().nullish(),
  profile_path: imagePath,
  known_for_department: z.string().nullish(),
});

export const crewMember = z.object({
  id: z.number().int(),
  name: z.string(),
  job: z.string().nullish(),
  department: z.string().nullish(),
  profile_path: imagePath,
});

const credits = z.object({
  cast: z.array(castMember).default([]),
  crew: z.array(crewMember).default([]),
});

export const watchProvider = z.object({
  provider_id: z.number().int(),
  provider_name: z.string(),
  logo_path: imagePath,
  display_priority: z.number().int().nullish(),
});

export const regionProviders = z.object({
  link: z.string().nullish(),
  flatrate: z.array(watchProvider).optional(),
  free: z.array(watchProvider).optional(),
  ads: z.array(watchProvider).optional(),
  rent: z.array(watchProvider).optional(),
  buy: z.array(watchProvider).optional(),
});

const watchProviders = z.object({
  results: z.record(z.string(), regionProviders).default({}),
});

const sharedDetails = {
  id: z.number().int().positive(),
  original_language: z.string().nullish(),
  overview: z.string().nullish(),
  tagline: z.string().nullish(),
  genres: z.array(genre).default([]),
  origin_country: z.array(z.string()).default([]),
  poster_path: imagePath,
  backdrop_path: imagePath,
  vote_average: z.number().nullish(),
  vote_count: z.number().int().nullish(),
  popularity: z.number().nullish(),
  status: z.string().nullish(),
  credits: credits.default({ cast: [], crew: [] }),
  "watch/providers": watchProviders.default({ results: {} }),
};

export const movieDetails = z.object({
  ...sharedDetails,
  title: z.string(),
  original_title: z.string().nullish(),
  release_date: isoDate,
  runtime: z.number().int().nullish(),
  imdb_id: z.string().nullish(),
  production_countries: z.array(z.object({ iso_3166_1: z.string() })).default([]),
  keywords: z.object({ keywords: z.array(keyword).default([]) }).default({ keywords: [] }),
});

export const tvDetails = z.object({
  ...sharedDetails,
  name: z.string(),
  original_name: z.string().nullish(),
  first_air_date: isoDate,
  episode_run_time: z.array(z.number().int()).default([]),
  number_of_seasons: z.number().int().nullish(),
  created_by: z
    .array(z.object({ id: z.number().int(), name: z.string(), profile_path: imagePath }))
    .default([]),
  external_ids: z.object({ imdb_id: z.string().nullish() }).default({}),
  keywords: z.object({ results: z.array(keyword).default([]) }).default({ results: [] }),
});

export type MovieDetailsResponse = z.infer<typeof movieDetails>;
export type TvDetailsResponse = z.infer<typeof tvDetails>;

const listedMovie = z.object({
  media_type: z.literal("movie"),
  id: z.number().int().positive(),
  title: z.string(),
  release_date: isoDate,
  poster_path: imagePath,
  overview: z.string().nullish(),
  popularity: z.number().nullish(),
  vote_count: z.number().int().nullish(),
  adult: z.boolean().nullish(),
});

const listedTv = z.object({
  media_type: z.literal("tv"),
  id: z.number().int().positive(),
  name: z.string(),
  first_air_date: isoDate,
  poster_path: imagePath,
  overview: z.string().nullish(),
  popularity: z.number().nullish(),
  vote_count: z.number().int().nullish(),
  adult: z.boolean().nullish(),
});

// People also come back from multi-search; we keep them only to skip them.
const listedOther = z.object({ media_type: z.enum(["person", "collection"]), id: z.number() });

export const listedItem = z.union([listedMovie, listedTv, listedOther]);

export const pagedList = z.object({
  page: z.number().int(),
  total_pages: z.number().int(),
  total_results: z.number().int(),
  results: z.array(z.unknown()),
});
