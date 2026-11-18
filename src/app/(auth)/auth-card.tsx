import type { ReactNode } from "react";

/** Shared frame for the sign-up, log-in and password pages. */
export function AuthCard({
  title,
  intro,
  children,
  footer,
}: {
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-12 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {intro ? <p className="mt-2 text-program">{intro}</p> : null}
      <div className="mt-8 rounded-lg border border-seam bg-curtain p-5 sm:p-6">{children}</div>
      {footer ? <div className="mt-6 text-sm text-program">{footer}</div> : null}
    </div>
  );
}
