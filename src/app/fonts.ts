import localFont from "next/font/local";

// Both fonts are self-hosted (SIL Open Font License, see ./fonts), so no
// request goes to a third-party font service.

/** Big Shoulders Display: condensed signage letters for the marquee. */
export const displayFont = localFont({
  src: "./fonts/big-shoulders-display-latin.woff2",
  variable: "--font-big-shoulders",
  weight: "100 900",
  display: "swap",
});

/** Instrument Sans: everything else. */
export const sansFont = localFont({
  src: [
    { path: "./fonts/instrument-sans-latin.woff2", weight: "400 700", style: "normal" },
    { path: "./fonts/instrument-sans-latin-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
});
