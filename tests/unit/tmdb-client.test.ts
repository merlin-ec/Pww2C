import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { TmdbError, tmdbGet } from "@/lib/tmdb/client";

const schema = z.object({ id: z.number() });

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

describe("tmdbGet", () => {
  beforeEach(() => {
    vi.stubEnv("TMDB_READ_TOKEN", "test-token-that-is-long-enough");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends the token as a bearer header and validates the reply", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse(200, { id: 949, extra: "ignored" }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(tmdbGet("/movie/949", schema)).resolves.toEqual({ id: 949 });
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(String(url)).toBe("https://api.themoviedb.org/3/movie/949?language=en-US");
    expect(init.headers.Authorization).toBe("Bearer test-token-that-is-long-enough");
  });

  it("returns null when TMDB has no such title", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(404, { status_code: 34 })));
    await expect(tmdbGet("/movie/1", schema)).resolves.toBeNull();
  });

  it("retries once after a server error", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(503, {}))
      .mockResolvedValueOnce(jsonResponse(200, { id: 1 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(tmdbGet("/movie/1", schema)).resolves.toEqual({ id: 1 });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("reports a reply in an unexpected shape", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse(200, { id: "nope" })));
    await expect(tmdbGet("/movie/1", schema)).rejects.toThrow(/unexpected shape/);
  });

  it("reports TMDB being unreachable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    await expect(tmdbGet("/movie/1", schema)).rejects.toBeInstanceOf(TmdbError);
  });

  it("names the missing setting when the token isn't configured", async () => {
    vi.stubEnv("TMDB_READ_TOKEN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await expect(tmdbGet("/movie/1", schema)).rejects.toThrow(/TMDB_READ_TOKEN/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
