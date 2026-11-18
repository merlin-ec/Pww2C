import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="marquee inline-block">
        <p className="marquee-title text-4xl sm:text-5xl">Not showing</p>
      </div>
      <h1 className="mt-8 text-2xl font-semibold">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-program">
        The link may be broken, or the title may have been removed from TMDB.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="button-primary">
          Go to the home page
        </Link>
        <Link href="/search" className="button-quiet">
          Search
        </Link>
      </div>
    </div>
  );
}
