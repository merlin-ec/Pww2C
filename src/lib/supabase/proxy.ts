import { createServerClient } from "@supabase/ssr";
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { hasPublicEnv, publicEnv } from "@/lib/env";
import type { Database } from "./database.types";

const USAGE_COOKIE = "pww_seen";

/**
 * Runs before every page request (see src/proxy.ts). It keeps the user's
 * session fresh by refreshing the auth cookies when they're about to expire,
 * and records the first visit of each day for retention stats.
 *
 * It does NOT decide who may see what: pages and Server Actions check the
 * user themselves, close to the data. This is only housekeeping.
 */
export async function updateSession(request: NextRequest, event: NextFetchEvent) {
  if (!hasPublicEnv()) {
    console.error("Supabase settings are missing; sessions can't be refreshed.");
    return NextResponse.next({ request });
  }
  const env = publicEnv();
  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // Make the refreshed cookies visible to this request and the browser,
          // plus the no-cache headers Supabase asks for so a CDN never serves
          // one person's session to someone else.
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
        },
      },
    },
  );

  // Supabase's guidance: nothing may run between creating the client and this
  // call, or users can get signed out at random. getClaims() validates the
  // session and refreshes it if needed.
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims.sub;

  if (userId) {
    const today = new Date().toISOString().slice(0, 10);
    if (request.cookies.get(USAGE_COOKIE)?.value !== `${userId}:${today}`) {
      // Recorded in the background so the page isn't kept waiting.
      // Duplicates are ignored, and the database only accepts today's date.
      event.waitUntil(
        (async () => {
          const { error } = await supabase
            .from("usage_days")
            .upsert({ user_id: userId }, { onConflict: "user_id,day", ignoreDuplicates: true });
          if (error) console.error("Couldn't record usage day", error.message);
        })(),
      );
      response.cookies.set(USAGE_COOKIE, `${userId}:${today}`, {
        httpOnly: true,
        sameSite: "lax",
        secure: request.nextUrl.protocol === "https:",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }
  }

  return response;
}
