"use client";

import { useEffect } from "react";

// Catches anything that breaks while rendering a page, so visitors get a way
// forward instead of a blank screen.
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">This page hit a problem</h1>
      <p className="mt-3 text-program">
        Something went wrong while loading it. Trying again usually fixes it.
      </p>
      <button type="button" onClick={() => retry()} className="button-primary mt-8">
        Try again
      </button>
    </div>
  );
}
