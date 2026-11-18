import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/supabase/database.types";

/**
 * Data access layer for "who is this?". Every page and Server Action that needs
 * the current user goes through here, so the check is written once and done on
 * the server, never trusted from the browser.
 */

export type SessionUser = {
  id: string;
  email: string | null;
  /** Anonymous accounts created for invited guests. */
  isGuest: boolean;
};

/** The signed-in user, or null. Cached for the duration of one request. */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const supabase = await createClient();
  // getClaims() verifies the session token instead of trusting the cookie.
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data) return null;
  const { claims } = data;
  return {
    id: claims.sub,
    email: typeof claims.email === "string" && claims.email ? claims.email : null,
    isGuest: claims.is_anonymous === true,
  };
});

/** Like getSessionUser, but sends signed-out visitors to the login page. */
export async function requireUser(returnTo: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  return user;
}

export type Profile = Tables<"profiles">;

/** The signed-in user's own profile row, or null when signed out. */
export const getMyProfile = cache(async (): Promise<Profile | null> => {
  const user = await getSessionUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
  if (error) throw new Error(`Couldn't load your profile: ${error.message}`);
  return data;
});
