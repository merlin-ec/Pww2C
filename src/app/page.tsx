import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { Notice } from "@/components/notice";
import { TitleGrid, TitleGridSkeleton } from "@/components/title-grid";
import { getTrending } from "@/lib/catalogue/tmdb-catalogue";
import type { TitleSummary } from "@/lib/catalogue/types";

export default function HomePage({ searchParams }: PageProps<"/">) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Suspense fallback={null}>
        {searchParams.then(({ account }) =>
          account === "deleted" ? (
            <div className="pt-6">
              <Notice tone="success" title="Your account has been deleted">
                Everything tied to it is gone. Thanks for giving PWW a try.
              </Notice>
            </div>
          ) : null,
        )}
      </Suspense>

      <section className="py-12 sm:py-20">
        <div className="marquee max-w-3xl">
          <h1 className="marquee-title text-5xl sm:text-7xl">Prestige World Wide</h1>
        </div>
        <p className="mt-8 max-w-xl text-lg text-program">
          Picks chosen for your taste, a watchlist worth keeping, a quick way to choose something
          together, and a straight answer on which streaming services are worth paying for.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/signup" className="button-primary">
            Create your account
          </Link>
          <Link href="/search" className="button-quiet">
            Search films and shows
          </Link>
        </div>
      </section>

      <section aria-labelledby="trending-heading">
        <h2 id="trending-heading" className="mb-5 text-xl font-semibold">
          Trending this week
        </h2>
        <Suspense fallback={<TitleGridSkeleton />}>
          <Trending />
        </Suspense>
      </section>
    </div>
  );
}

async function Trending() {
  // Fetched at request time (then cached for an hour) so building the site
  // never depends on TMDB being up.
  await connection();
  let titles: TitleSummary[] | null = null;
  try {
    titles = await getTrending();
  } catch (error) {
    console.error("Trending titles didn't load", error);
  }

  if (titles === null) {
    return (
      <Notice tone="error" title="Trending titles didn't load">
        The film database didn&apos;t respond. Search still works, or refresh in a minute.
      </Notice>
    );
  }
  if (titles.length === 0) {
    return <p className="text-program">Nothing is trending right now. Try a search instead.</p>;
  }
  return <TitleGrid titles={titles} />;
}
