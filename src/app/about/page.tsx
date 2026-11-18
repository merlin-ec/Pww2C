import type { Metadata } from "next";

export const metadata: Metadata = { title: "About and credits" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About and credits</h1>
      <div className="mt-6 space-y-4 text-ivory/90">
        <p>
          Prestige World Wide is for people who watch films and TV on purpose. It learns your taste
          from what you rate, suggests what to watch next, helps you choose something with other
          people, and shows which streaming services carry the things you actually want to see.
        </p>
      </div>

      <h2 className="mt-10 text-xl font-semibold">Credits</h2>
      <div className="mt-4 space-y-4 text-sm text-program">
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB. Film and TV
          information and images come from{" "}
          <a href="https://www.themoviedb.org" className="link" rel="noopener" target="_blank">
            The Movie Database (TMDB)
          </a>
          .
        </p>
        <p>
          Streaming availability is provided by{" "}
          <a href="https://www.justwatch.com" className="link" rel="noopener" target="_blank">
            JustWatch
          </a>
          , through TMDB.
        </p>
        <p>
          Type is set in Big Shoulders Display and Instrument Sans, both under the SIL Open Font
          License.
        </p>
      </div>
    </div>
  );
}
