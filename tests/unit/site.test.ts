import { describe, expect, it } from "vitest";
import { safeNextPath } from "@/lib/site";
import { closestWidth, tmdbSrcSet } from "@/lib/tmdb/images";

describe("safeNextPath", () => {
  it("allows paths on this site", () => {
    expect(safeNextPath("/account")).toBe("/account");
    expect(safeNextPath("/search?q=heat#top")).toBe("/search?q=heat#top");
  });

  it("refuses anything that could leave the site", () => {
    expect(safeNextPath("https://evil.example")).toBe("/");
    expect(safeNextPath("//evil.example")).toBe("/");
    expect(safeNextPath("/\\evil.example")).toBe("/");
    expect(safeNextPath("javascript:alert(1)")).toBe("/");
    expect(safeNextPath(undefined, "/home")).toBe("/home");
    expect(safeNextPath("")).toBe("/");
  });
});

describe("TMDB image helpers", () => {
  it("offers every poster width TMDB serves", () => {
    expect(tmdbSrcSet("/p.jpg", "poster")).toBe(
      [92, 154, 185, 342, 500, 780].map((w) => `https://image.tmdb.org/t/p/w${w}/p.jpg ${w}w`).join(", "),
    );
  });

  it("rounds up to the nearest available width", () => {
    expect(closestWidth("poster", 200)).toBe(342);
    expect(closestWidth("backdrop", 5000)).toBe(1280);
  });
});
