import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "That link didn't work", robots: { index: false } };

export default function AuthLinkErrorPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">That link didn&apos;t work</h1>
      <p className="mt-3 text-program">
        Email links work once. Confirmation links expire after 24 hours and password reset links
        after an hour. If you already confirmed your email, you can log in now.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/login" className="button-primary">
          Log in
        </Link>
        <Link href="/forgot-password" className="button-quiet">
          Send a new reset link
        </Link>
      </div>
    </div>
  );
}
