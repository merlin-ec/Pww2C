/**
 * The public address of this deployment, used to build links in auth emails.
 * Order: an explicit NEXT_PUBLIC_SITE_URL, then Vercel's own URLs, then local dev.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Only allows redirects to paths on this site. Anything else (another domain,
 * a protocol-relative "//evil.com", a backslash trick) falls back to `fallback`.
 * This stops "?next=" parameters being used to send people to phishing pages.
 */
export function safeNextPath(value: unknown, fallback = "/"): string {
  if (typeof value !== "string" || value.length === 0 || value.length > 512) return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return fallback;
  try {
    const url = new URL(value, "http://pww.invalid");
    if (url.origin !== "http://pww.invalid") return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}
