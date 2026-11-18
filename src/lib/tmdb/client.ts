import "server-only";
import type { z } from "zod";
import { tmdbReadToken } from "@/lib/env.server";

/**
 * The only place PWW talks to TMDB. Server-only, so the token never reaches
 * the browser. Every response is checked against a schema, so if TMDB changes
 * shape we get a clear error instead of a page full of "undefined".
 */

// Overridable only so end-to-end tests can point at a fake TMDB.
const BASE_URL = process.env.TMDB_API_BASE_URL ?? "https://api.themoviedb.org/3";
const TIMEOUT_MS = 8_000;

export class TmdbError extends Error {
  constructor(
    message: string,
    readonly status: number | null,
  ) {
    super(message);
    this.name = "TmdbError";
  }
}

type Params = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, params: Params): string {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("language", "en-US");
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}

async function request(url: string, token: string): Promise<Response> {
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

/**
 * GET a TMDB endpoint and validate the result. Retries once on rate limiting
 * or a server error. Returns null for 404 so callers can show "not found".
 */
export async function tmdbGet<S extends z.ZodType>(
  path: string,
  schema: S,
  params: Params = {},
): Promise<z.infer<S> | null> {
  // Read outside the try below, so a missing token is reported as a missing
  // setting rather than as TMDB being down.
  const token = tmdbReadToken();
  const url = buildUrl(path, params);

  let response: Response;
  try {
    response = await request(url, token);
    if (response.status === 429 || response.status >= 500) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      response = await request(url, token);
    }
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new TmdbError(`TMDB didn't respond (${path}): ${reason}`, null);
  }

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new TmdbError(`TMDB returned ${response.status} for ${path}`, response.status);
  }

  const parsed = schema.safeParse(await response.json());
  if (!parsed.success) {
    throw new TmdbError(`TMDB sent an unexpected shape for ${path}: ${parsed.error.message}`, 200);
  }
  return parsed.data;
}
