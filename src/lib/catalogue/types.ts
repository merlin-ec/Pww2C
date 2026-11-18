import type { RegionCode } from "@/lib/regions";

export type MediaType = "movie" | "tv";

export type OfferType = "flatrate" | "free" | "ads" | "rent" | "buy";

/** Enough to show a title in a list or grid. */
export type TitleSummary = {
  /** Readable key used across PWW, e.g. "movie:949". */
  id: string;
  mediaType: MediaType;
  tmdbId: number;
  title: string;
  year: number | null;
  posterPath: string | null;
};

export type PersonCredit = {
  personId: number;
  name: string;
  profilePath: string | null;
};

export type CastCredit = PersonCredit & { character: string | null };

export type Offer = {
  providerId: number;
  providerName: string;
  logoPath: string | null;
  offerType: OfferType;
  displayPriority: number;
};

export type RegionAvailability = {
  /** TMDB's where-to-watch page for this title and country (JustWatch data). */
  link: string | null;
  offers: Offer[];
};

export type TitleDetails = TitleSummary & {
  originalTitle: string | null;
  originalLanguage: string | null;
  overview: string | null;
  tagline: string | null;
  releaseDate: string | null;
  runtimeMinutes: number | null;
  numberOfSeasons: number | null;
  status: string | null;
  genres: { id: number; name: string }[];
  keywords: { id: number; name: string }[];
  originCountries: string[];
  backdropPath: string | null;
  voteAverage: number | null;
  voteCount: number | null;
  popularity: number | null;
  imdbId: string | null;
  directors: PersonCredit[];
  creators: PersonCredit[];
  writers: PersonCredit[];
  cinematographers: PersonCredit[];
  composers: PersonCredit[];
  cast: CastCredit[];
  availability: Partial<Record<RegionCode, RegionAvailability>>;
};

export type SearchPage = {
  query: string;
  page: number;
  totalPages: number;
  results: TitleSummary[];
};
