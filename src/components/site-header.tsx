import Link from "next/link";
import { Suspense } from "react";
import { AccountMenu } from "./account-menu";

export function SiteHeader() {
  return (
    <header className="border-b border-seam/70 bg-velvet/95">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold uppercase tracking-wide text-brass"
          aria-label="Prestige World Wide, home"
        >
          PWW
        </Link>

        <form action="/search" role="search" className="order-last w-full sm:order-none sm:w-auto sm:flex-1">
          <label htmlFor="site-search" className="sr-only">
            Search films and shows
          </label>
          <input
            id="site-search"
            name="q"
            type="search"
            placeholder="Search films and shows"
            autoComplete="off"
            maxLength={100}
            className="text-input sm:max-w-md"
          />
        </form>

        <div className="ml-auto flex items-center gap-2">
          {/* Reads the session, so it streams in while the rest of the page shows. */}
          <Suspense fallback={<div className="skeleton h-10 w-36" aria-hidden />}>
            <AccountMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
