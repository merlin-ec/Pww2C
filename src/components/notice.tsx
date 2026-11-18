import type { ReactNode } from "react";

/** A message box for errors, confirmations and empty states. */
export function Notice({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "error" | "success";
  title?: string;
  children?: ReactNode;
}) {
  const border =
    tone === "error" ? "border-exit/70" : tone === "success" ? "border-go/60" : "border-seam";
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-md border ${border} bg-curtain px-4 py-3 text-sm`}
    >
      {title ? <p className="font-semibold text-ivory">{title}</p> : null}
      {children ? <div className={title ? "mt-1 text-program" : "text-program"}>{children}</div> : null}
    </div>
  );
}
