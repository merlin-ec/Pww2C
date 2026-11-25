import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { displayFont, sansFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Prestige World Wide",
    template: "%s · Prestige World Wide",
  },
  description:
    "Recommendations that know your taste, a watchlist worth keeping, and an easy way to pick something together.",
  applicationName: "Prestige World Wide",
};

export const viewport: Viewport = {
  themeColor: "#0b1a14", // matches --color-velvet in globals.css
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brass focus:px-3 focus:py-2 focus:text-velvet"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
