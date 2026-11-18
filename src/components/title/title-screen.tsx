import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Notice } from "@/components/notice";
import { Poster } from "@/components/poster";
import { parseTmdbId } from "@/lib/catalogue/normalize";
import { getTitleDetails } from "@/lib/catalogue/tmdb-catalogue";
import type { MediaType, PersonCredit, TitleDetails } from "@/lib/catalogue/types";
import { tmdbImageUrl } from "@/lib/tmdb/images";
import { WhereToWatch, WhereToWatchSkeleton } from "./where-to-watch";

/**
 * The page for one film or show. Shared by /movie/[id] and /tv/[id].
 * The title's details are cached (see tmdb-catalogue.ts); only the
 * where-to-watch box depends on who's looking, so only it waits on that.
 */

export async function titleMetadata(mediaType: MediaType, rawId: string): Promise<Metadata> {
  const tmdbId = parseTmdbId(rawId);
  if (!tmdbId) return { title: "Not found" };
  try {
    const title = await getTitleDetails(mediaType, tmdbId);
    if (!title) return { title: "Not found" };
    const name = title.year ? `${title.title} (${title.year})` : title.title;
    return {
      title: name,
      description: title.overview?.slice(0, 200),
      openGraph: {
        title: name,
        description: title.overview?.slice(0, 200),
        images: title.backdropPath ? [tmdbImageUrl(title.backdropPath, 1280)] : undefined,
      },
    };
  } catch {
    return { title: mediaType === "movie" ? "Film" : "Series" };
  }
}

export function TitleScreen({ mediaType, idPromise }: { mediaType: MediaType; idPromise: Promise<string> }) {
  return (
    <Suspense fallback={<TitleSkeleton />}>
      <TitleContent mediaType={mediaType} idPromise={idPromise} />
    </Suspense>
  );
}

async function TitleContent({ mediaType, idPromise }: { mediaType: MediaType; idPromise: Promise<string> }) {
  const tmdbId = parseTmdbId(await idPromise);
  if (!tmdbId) notFound();

  let title: TitleDetails | null;
  try {
    title = await getTitleDetails(mediaType, tmdbId);
  } catch (error) {
    console.error("Title page couldn't load from TMDB", error);
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Notice tone="error" title="This page didn't load">
          We couldn&apos;t reach the film database just now. Refresh the page in a minute.
        </Notice>
      </div>
    );
  }
  if (!title) notFound();

  return <TitleView title={title} />;
}

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

function names(people: PersonCredit[]): string {
  return people.map((person) => person.name).join(", ");
}

function TitleView({ title }: { title: TitleDetails }) {
  const facts: [string, string][] = [];
  if (title.year) facts.push(["Released", String(title.year)]);
  if (title.mediaType === "tv" && title.numberOfSeasons) {
    facts.push(["Seasons", String(title.numberOfSeasons)]);
  }
  if (title.runtimeMinutes) {
    facts.push([
      title.mediaType === "tv" ? "Episodes" : "Runtime",
      formatRuntime(title.runtimeMinutes),
    ]);
  }
  if (title.genres.length) facts.push(["Genre", title.genres.map((genre) => genre.name).join(", ")]);
  if (title.creators.length) facts.push(["Created by", names(title.creators)]);
  if (title.directors.length && title.mediaType === "movie") {
    facts.push(["Directed by", names(title.directors)]);
  }
  if (title.writers.length && title.mediaType === "movie") facts.push(["Written by", names(title.writers)]);
  if (title.cinematographers.length) facts.push(["Cinematography", names(title.cinematographers)]);
  if (title.composers.length) facts.push(["Music", names(title.composers)]);

  return (
    <article>
      <div className="relative">
        {title.backdropPath ? (
          <div className="absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden sm:h-96" aria-hidden>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tmdbImageUrl(title.backdropPath, 1280)}
              alt=""
              className="h-full w-full object-cover opacity-30"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-velvet/30 via-velvet/70 to-velvet" />
          </div>
        ) : null}

        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 sm:grid-cols-[minmax(0,220px)_1fr] sm:px-6 sm:pt-16 lg:grid-cols-[260px_1fr]">
          <div className="mx-auto w-44 sm:w-full">
            <Poster
              path={title.posterPath}
              title={title.title}
              sizes="(min-width: 1024px) 260px, (min-width: 640px) 220px, 176px"
              priority
            />
          </div>

          <div className="min-w-0">
            <div className="marquee">
              <h1 className="marquee-title text-4xl sm:text-5xl lg:text-6xl">{title.title}</h1>
            </div>
            {title.originalTitle && title.originalTitle !== title.title ? (
              <p className="mt-3 text-program">
                Original title: <span lang={title.originalLanguage ?? undefined}>{title.originalTitle}</span>
              </p>
            ) : null}
            {title.tagline ? <p className="mt-4 text-lg italic text-program">{title.tagline}</p> : null}
            {title.overview ? <p className="mt-4 max-w-prose text-ivory/90">{title.overview}</p> : null}

            {facts.length ? (
              <dl className="mt-6 grid max-w-2xl grid-cols-[max-content_1fr] gap-x-6 gap-y-2 text-sm">
                {facts.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="text-program">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="cast-heading" className="order-2 lg:order-1">
          <h2 id="cast-heading" className="text-xl font-semibold">
            Cast
          </h2>
          {title.cast.length ? (
            <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {title.cast.map((member) => (
                <li key={member.personId} className="text-sm">
                  <span className="font-medium">{member.name}</span>
                  {member.character ? <span className="text-program"> as {member.character}</span> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-program">TMDB doesn&apos;t list a cast for this title yet.</p>
          )}
        </section>

        <section aria-labelledby="watch-heading" className="order-1 lg:order-2">
          <h2 id="watch-heading" className="text-xl font-semibold">
            Where to watch
          </h2>
          <Suspense fallback={<WhereToWatchSkeleton />}>
            <WhereToWatch title={title} />
          </Suspense>
        </section>
      </div>
    </article>
  );
}

function TitleSkeleton() {
  return (
    <div
      className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 sm:grid-cols-[minmax(0,220px)_1fr] sm:px-6 sm:pt-16 lg:grid-cols-[260px_1fr]"
      aria-hidden
    >
      <div className="skeleton mx-auto aspect-[2/3] w-44 sm:w-full" />
      <div className="space-y-4">
        <div className="skeleton h-24" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-4 w-1/2" />
        <div className="skeleton h-32" />
      </div>
    </div>
  );
}
