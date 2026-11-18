import type { Metadata } from "next";
import { Suspense } from "react";
import { Notice } from "@/components/notice";
import { getMyProfile, requireUser } from "@/lib/auth/dal";
import { DEFAULT_REGION, isRegionCode } from "@/lib/regions";
import { DeleteAccountForm, ProfileForm } from "./account-forms";

export const metadata: Metadata = { title: "Your account", robots: { index: false } };

export default function AccountPage({ searchParams }: PageProps<"/account">) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Your account</h1>
      <Suspense fallback={<AccountSkeleton />}>
        <AccountContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function AccountContent({ searchParams }: Pick<PageProps<"/account">, "searchParams">) {
  const user = await requireUser("/account");
  const [profile, params] = await Promise.all([getMyProfile(), searchParams]);
  if (!profile) {
    return (
      <div className="mt-8">
        <Notice tone="error" title="We couldn't find your profile">
          Log out and back in. If it keeps happening, your account may still be being set up.
        </Notice>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-10">
      {params.updated === "password" ? (
        <Notice tone="success" title="Password changed">
          Use your new password next time you log in.
        </Notice>
      ) : null}
      {!profile.username && !user.isGuest ? (
        <Notice title="Choose a username">
          Friends find you by your username. The one you asked for at sign-up was taken, so pick
          another below.
        </Notice>
      ) : null}

      <section aria-labelledby="profile-heading" className="rounded-lg border border-seam bg-curtain p-5 sm:p-6">
        <h2 id="profile-heading" className="text-xl font-semibold">
          Profile
        </h2>
        {user.email ? <p className="mt-1 text-sm text-program">Signed in as {user.email}</p> : null}
        <div className="mt-6">
          <ProfileForm
            username={profile.username}
            displayName={profile.display_name}
            bio={profile.bio}
            region={isRegionCode(profile.region) ? profile.region : DEFAULT_REGION}
            isGuest={user.isGuest}
          />
        </div>
      </section>

      <section aria-labelledby="delete-heading" className="rounded-lg border border-exit/40 p-5 sm:p-6">
        <h2 id="delete-heading" className="text-xl font-semibold">
          Delete account
        </h2>
        <div className="mt-4">
          <DeleteAccountForm />
        </div>
      </section>
    </div>
  );
}

function AccountSkeleton() {
  return (
    <div className="mt-8 space-y-6" aria-hidden>
      <div className="skeleton h-96" />
      <div className="skeleton h-48" />
    </div>
  );
}
