import { describe, expect, it } from "vitest";
import {
  normalizeListed,
  normalizeMovie,
  normalizeTv,
  parseTmdbId,
  yearOf,
} from "@/lib/catalogue/normalize";
import { movieDetails, tvDetails } from "@/lib/tmdb/schemas";
import { heatMovie, sopranosTv } from "./fixtures";

describe("parseTmdbId", () => {
  it("accepts plain positive integers only", () => {
    expect(parseTmdbId("949")).toBe(949);
    expect(parseTmdbId("0")).toBeNull();
    expect(parseTmdbId("0949")).toBeNull();
    expect(parseTmdbId("949abc")).toBeNull();
    expect(parseTmdbId("1e3")).toBeNull();
    expect(parseTmdbId("-5")).toBeNull();
    expect(parseTmdbId("99999999999")).toBeNull();
  });
});

describe("yearOf", () => {
  it("reads the year from a TMDB date and ignores blanks", () => {
    expect(yearOf("1995-12-15")).toBe(1995);
    expect(yearOf("")).toBeNull();
    expect(yearOf(null)).toBeNull();
    expect(yearOf("1995")).toBeNull();
  });
});

describe("normalizeMovie", () => {
  const heat = normalizeMovie(movieDetails.parse(heatMovie));

  it("builds the readable id and basic facts", () => {
    expect(heat).toMatchObject({
      id: "movie:949",
      mediaType: "movie",
      title: "Heat",
      year: 1995,
      runtimeMinutes: 170,
      imdbId: "tt0113277",
      originCountries: ["US"],
    });
  });

  it("picks key crew once each", () => {
    expect(heat.directors.map((p) => p.name)).toEqual(["Michael Mann"]);
    expect(heat.writers.map((p) => p.name)).toEqual(["Michael Mann"]);
    expect(heat.cinematographers.map((p) => p.name)).toEqual(["Dante Spinotti"]);
    expect(heat.composers.map((p) => p.name)).toEqual(["Elliot Goldenthal"]);
  });

  it("orders cast by billing and drops duplicate people", () => {
    expect(heat.cast.map((c) => c.name)).toEqual(["Al Pacino", "Robert De Niro"]);
    expect(heat.cast[1]?.character).toBe("Neil McCauley");
  });

  it("keeps availability for supported countries only, best-known services first", () => {
    expect(Object.keys(heat.availability)).toEqual(["US"]);
    expect(heat.availability.US?.offers.map((o) => `${o.providerName}/${o.offerType}`)).toEqual([
      "Netflix/flatrate",
      "Max/flatrate",
      "Apple TV/rent",
    ]);
  });
});

describe("normalizeTv", () => {
  const sopranos = normalizeTv(tvDetails.parse(sopranosTv));

  it("uses creators, the shortest real episode length and the IMDb id", () => {
    expect(sopranos).toMatchObject({
      id: "tv:1398",
      title: "The Sopranos",
      year: 1999,
      runtimeMinutes: 50,
      numberOfSeasons: 6,
      tagline: null,
      imdbId: "tt0141842",
    });
    expect(sopranos.creators.map((p) => p.name)).toEqual(["David Chase"]);
    expect(sopranos.availability).toEqual({});
  });
});

describe("normalizeListed", () => {
  it("keeps films and shows and skips everything else", () => {
    expect(
      normalizeListed({ media_type: "movie", id: 949, title: "Heat", release_date: "1995-12-15", poster_path: "/p.jpg" }),
    ).toEqual({ id: "movie:949", mediaType: "movie", tmdbId: 949, title: "Heat", year: 1995, posterPath: "/p.jpg" });
    expect(normalizeListed({ media_type: "tv", id: 1398, name: "The Sopranos", first_air_date: "" })).toMatchObject({
      id: "tv:1398",
      year: null,
      posterPath: null,
    });
    expect(normalizeListed({ media_type: "person", id: 638, name: "Michael Mann" })).toBeNull();
    expect(normalizeListed({ media_type: "movie", id: 1, title: "X", adult: true })).toBeNull();
    expect(normalizeListed({ media_type: "movie", title: "No id" })).toBeNull();
    expect(normalizeListed("garbage")).toBeNull();
  });
});
