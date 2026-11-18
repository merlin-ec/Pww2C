import "server-only";
import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env";
import { supabaseSecretKey } from "@/lib/env.server";
import type { Database } from "./database.types";

/**
 * Supabase client with the secret key. It bypasses row-level security, so use
 * it only for jobs no user should be able to do directly: writing the TMDB
 * catalogue cache and deleting accounts. Never pass its results to the
 * browser without picking out exactly the fields that are needed.
 */
export function createAdminClient() {
  return createClient<Database>(publicEnv().NEXT_PUBLIC_SUPABASE_URL, supabaseSecretKey(), {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
