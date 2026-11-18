// Trimmed-down TMDB responses in the shape the real API returns.

export const heatMovie = {
  id: 949,
  title: "Heat",
  original_title: "Heat",
  original_language: "en",
  overview: "Obsessive master thief Neil McCauley leads a top-notch crew...",
  tagline: "A Los Angeles crime saga.",
  release_date: "1995-12-15",
  runtime: 170,
  status: "Released",
  imdb_id: "tt0113277",
  genres: [
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
  ],
  origin_country: ["US"],
  production_countries: [{ iso_3166_1: "US", name: "United States of America" }],
  poster_path: "/umSVjVdbVwtx5ryCA2QXL44Durm.jpg",
  backdrop_path: "/xwXV64ALUbwVtl8J6yQXnrdbaaj.jpg",
  vote_average: 7.9,
  vote_count: 7500,
  popularity: 45.2,
  credits: {
    cast: [
      { id: 380, name: "Robert De Niro", character: "Neil McCauley", order: 1, profile_path: "/rdn.jpg" },
      { id: 1158, name: "Al Pacino", character: "Vincent Hanna", order: 0, profile_path: "/ap.jpg" },
      { id: 380, name: "Robert De Niro", character: "Neil (archive)", order: 40, profile_path: null },
    ],
    crew: [
      { id: 638, name: "Michael Mann", job: "Director", department: "Directing", profile_path: "/mm.jpg" },
      { id: 638, name: "Michael Mann", job: "Screenplay", department: "Writing", profile_path: "/mm.jpg" },
      { id: 638, name: "Michael Mann", job: "Writer", department: "Writing", profile_path: "/mm.jpg" },
      { id: 22035, name: "Dante Spinotti", job: "Director of Photography", department: "Camera", profile_path: null },
      { id: 7034, name: "Elliot Goldenthal", job: "Original Music Composer", department: "Sound", profile_path: null },
      { id: 9999, name: "Someone Else", job: "Producer", department: "Production", profile_path: null },
    ],
  },
  keywords: {
    keywords: [
      { id: 642, name: "robbery" },
      { id: 207928, name: "neo-noir" },
    ],
  },
  "watch/providers": {
    results: {
      US: {
        link: "https://www.themoviedb.org/movie/949-heat/watch?locale=US",
        rent: [{ provider_id: 2, provider_name: "Apple TV", logo_path: "/apple.jpg", display_priority: 4 }],
        flatrate: [
          { provider_id: 1899, provider_name: "Max", logo_path: "/max.jpg", display_priority: 3 },
          { provider_id: 8, provider_name: "Netflix", logo_path: "/nf.jpg", display_priority: 0 },
        ],
      },
      FR: {
        link: "https://www.themoviedb.org/movie/949-heat/watch?locale=FR",
        flatrate: [{ provider_id: 8, provider_name: "Netflix", logo_path: "/nf.jpg", display_priority: 0 }],
      },
    },
  },
};

export const sopranosTv = {
  id: 1398,
  name: "The Sopranos",
  original_name: "The Sopranos",
  original_language: "en",
  overview: "The story of New Jersey-based Italian-American mobster Tony Soprano...",
  tagline: "",
  first_air_date: "1999-01-10",
  episode_run_time: [55, 50, 0],
  number_of_seasons: 6,
  status: "Ended",
  genres: [{ id: 18, name: "Drama" }],
  origin_country: ["US"],
  poster_path: "/sopranos.jpg",
  backdrop_path: null,
  vote_average: 8.6,
  vote_count: 2800,
  popularity: 80.1,
  created_by: [{ id: 1214, name: "David Chase", profile_path: "/dc.jpg" }],
  credits: { cast: [{ id: 1, name: "James Gandolfini", character: "Tony Soprano", order: 0 }], crew: [] },
  keywords: { results: [{ id: 10291, name: "organized crime" }] },
  external_ids: { imdb_id: "tt0141842" },
  "watch/providers": { results: {} },
};
