import "server-only";
import { z } from "zod";

/**
 * Secrets. `server-only` makes the build fail if any browser code imports
 * this file, so these values can never end up in the client bundle.
 * Each one is checked when first used, so a missing key only breaks the
 * feature that needs it, with an error that names the setting.
 */
function readSecret(name: "SUPABASE_SECRET_KEY" | "TMDB_READ_TOKEN"): string {
  const parsed = z.string().min(20).safeParse(process.env[name]);
  if (!parsed.success) {
    throw new Error(`Missing or invalid server setting: ${name}. See .env.example.`);
  }
  return parsed.data;
}

/** Supabase secret key: full database access, bypasses row-level security. */
export function supabaseSecretKey(): string {
  return readSecret("SUPABASE_SECRET_KEY");
}

/** TMDB "API Read Access Token" (read-only, but rate-limited per key). */
export function tmdbReadToken(): string {
  return readSecret("TMDB_READ_TOKEN");
}
