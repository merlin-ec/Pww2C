import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy</h1>
      <div className="mt-6 space-y-4 text-ivory/90">
        <p>Plainly, here is what PWW keeps about you and why.</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Your email address and password, to let you log in. Passwords are stored hashed by our
            database provider, Supabase; nobody can read them.
          </li>
          <li>
            Your profile: username, display name, bio and country. Profiles are public, because
            following friends and sharing lists depends on them.
          </li>
          <li>
            The days you use PWW, so we can tell whether it&apos;s useful enough that people come
            back. We don&apos;t use third-party analytics or advertising trackers.
          </li>
        </ul>
        <p>
          We don&apos;t sell your data or show ads. The site runs on Vercel and Supabase, and film
          data comes from TMDB, which never receives anything about you.
        </p>
        <p>
          You can delete your account at any time from your account page. That removes your
          profile and everything tied to it straight away.
        </p>
      </div>
    </div>
  );
}
