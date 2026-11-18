import Link from "next/link";
import { signOut } from "@/app/(auth)/actions";
import { getMyProfile, getSessionUser } from "@/lib/auth/dal";
import { hasPublicEnv } from "@/lib/env";

export async function AccountMenu() {
  const user = hasPublicEnv() ? await getSessionUser() : null;

  if (!user || user.isGuest) {
    return (
      <>
        <Link href="/login" className="button-quiet">
          Log in
        </Link>
        <Link href="/signup" className="button-primary">
          Sign up
        </Link>
      </>
    );
  }

  const profile = await getMyProfile();
  const name = profile?.display_name ?? profile?.username ?? "Your account";

  return (
    <>
      <Link href="/account" className="button-quiet max-w-[12rem] truncate">
        {name}
      </Link>
      <form action={signOut}>
        <button type="submit" className="button-quiet">
          Log out
        </button>
      </form>
    </>
  );
}
