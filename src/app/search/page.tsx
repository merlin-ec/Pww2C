import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Notice } from "@/components/notice";
import { TitleGrid, TitleGridSkeleton } from "@/components/title-grid";
import { searchTitles } from "@/lib/catalogue/tmdb-catalogue";

export const metadata: Metadata = { title: "Search" };

const MAX_QUERY_LENGTH = 100;

function readQuery(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return (raw ?? "").trim().replace(/\s+/g, " ").slice(0, MAX_QUERY_LENGTH);
}

function readPage(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 && page <= 20 ? page : 1;
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function SearchResults({ searchParams }: Pick<PageProps<"/search">, "searchParams">) {
  const params = await searchParams;
  const query = readQuery(params.q);
  const page = readPage(params.page);

  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">
        {query ? <>Results for &ldquo;{query}&rdquo;</> : "Search"}
      </h1>
      <form action="/search" role="search" className="mt-6 flex max-w-xl gap-2">
        <label htmlFor="search-page-input" className="sr-only">
          Search films and shows
        </label>
        <input
          id="search-page-input"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Try a title, like Paris, Texas"
          maxLength={MAX_QUERY_LENGTH}
          className="text-input"
        />
        <button type="submit" className="button-primary">
          Search
        </button>
      </form>
      <div className="mt-8">
        {query ? <ResultsGrid query={query} page={page} /> : <p className="text-program">Search by title to find any film or series.</p>}
      </div>
    </>
  );
}

async function ResultsGrid({ query, page }: { query: string; page: number }) {
  let results;
  try {
    results = await searchTitles(query, page);
  } catch (error) {
    console.error("Search failed", error);
    return (
      <Notice tone="error" title="Search didn't work">
        The film database didn&apos;t respond. Try again in a minute.
      </Notice>
    );
  }

  if (results.results.length === 0) {
    return (
      <p className="text-program">
        No films or series match &ldquo;{query}&rdquo;. Check the spelling, or try fewer words.
      </p>
    );
  }

  const pageHref = (target: number) => `/search?q=${encodeURIComponent(query)}&page=${target}`;
  return (
    <>
      <TitleGrid titles={results.results} />
      {results.totalPages > 1 ? (
        <nav aria-label="Search pages" className="mt-10 flex items-center gap-4">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="button-quiet">
              Previous page
            </Link>
          ) : null}
          <span className="text-sm text-program">
            Page {page} of {results.totalPages}
          </span>
          {page < results.totalPages ? (
            <Link href={pageHref(page + 1)} className="button-quiet">
              Next page
            </Link>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}

function SearchSkeleton() {
  return (
    <div aria-hidden>
      <div className="skeleton h-9 w-64" />
      <div className="skeleton mt-6 h-11 max-w-xl" />
      <div className="mt-8">
        <TitleGridSkeleton />
      </div>
    </div>
  );
}
