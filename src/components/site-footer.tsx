import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-seam/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-program sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Film and TV data from{" "}
          <a href="https://www.themoviedb.org" className="link" rel="noopener" target="_blank">
            TMDB
          </a>
          . Streaming availability from{" "}
          <a href="https://www.justwatch.com" className="link" rel="noopener" target="_blank">
            JustWatch
          </a>
          .
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/about" className="hover:text-ivory">
            About and credits
          </Link>
          <Link href="/privacy" className="hover:text-ivory">
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
