import type { NextFetchEvent, NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  return updateSession(request, event);
}

export const config = {
  matcher: [
    // Every request except static files and images, which never need a session.
    "/((?!_next/static|_next/image|favicon.ico|fonts/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|woff2)$).*)",
  ],
};
