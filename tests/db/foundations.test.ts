import type { Client } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { as, connect, createAccount, rebuildDatabase } from "./harness";

let db: Client;

beforeAll(async () => {
  await rebuildDatabase();
  db = await connect();
});

afterAll(async () => {
  await db?.end();
});

async function profileOf(id: string) {
  const { rows } = await db.query("select * from public.profiles where id = $1", [id]);
  return rows[0];
}

async function rejects(run: Promise<unknown>, message: RegExp) {
  await expect(run).rejects.toThrow(message);
}

describe("profile creation on sign-up", () => {
  it("creates a profile with the requested username", async () => {
    const id = await createAccount(db, { username: "cinephile_42" });
    const profile = await profileOf(id);
    expect(profile.username).toBe("cinephile_42");
    expect(profile.display_name).toBe("cinephile_42");
    expect(profile.region).toBe("US");
  });

  it("normalises case and whitespace", async () => {
    const id = await createAccount(db, { username: "  NightOwl  ", display_name: "Night Owl" });
    const profile = await profileOf(id);
    expect(profile.username).toBe("nightowl");
    expect(profile.display_name).toBe("Night Owl");
  });

  it("still creates the account when the username is taken, just without one", async () => {
    await createAccount(db, { username: "taken_name" });
    const id = await createAccount(db, { username: "taken_name" });
    expect((await profileOf(id)).username).toBeNull();
  });

  it("ignores invalid and reserved usernames", async () => {
    const bad = await createAccount(db, { username: "no spaces!" });
    const reserved = await createAccount(db, { username: "admin" });
    expect((await profileOf(bad)).username).toBeNull();
    expect((await profileOf(reserved)).username).toBeNull();
  });

  it("never gives a guest a username", async () => {
    const id = await createAccount(db, { username: "sneaky_guest" }, true);
    expect((await profileOf(id)).username).toBeNull();
  });

  it("removes the profile when the account is deleted", async () => {
    const id = await createAccount(db, { username: "short_lived" });
    await db.query("delete from auth.users where id = $1", [id]);
    expect(await profileOf(id)).toBeUndefined();
  });
});

describe("profile security rules", () => {
  let alice: string;
  let bob: string;
  let guest: string;

  beforeAll(async () => {
    alice = await createAccount(db, { username: "alice" });
    bob = await createAccount(db, { username: "bob" });
    guest = await createAccount(db, {}, true);
  });

  it("lets signed-out visitors read profiles but not change them", async () => {
    const count = await as(db, { kind: "anon" }, async (q) => {
      const { rowCount } = await q("select 1 from public.profiles where username = 'alice'");
      return rowCount;
    });
    expect(count).toBe(1);
    await rejects(
      as(db, { kind: "anon" }, (q) => q("update public.profiles set bio = 'hi' where id = $1", [alice])),
      /permission denied/,
    );
  });

  it("lets you edit your own profile", async () => {
    const row = await as(db, { kind: "user", id: alice }, async (q) => {
      const { rows } = await q(
        `update public.profiles
            set display_name = 'Alice', bio = 'Melville, Mann, Malick', region = 'GB', username = 'alice_m'
          where id = $1
          returning display_name, bio, region, username, updated_at > created_at as touched`,
        [alice],
      );
      return rows[0];
    });
    expect(row).toEqual({
      display_name: "Alice",
      bio: "Melville, Mann, Malick",
      region: "GB",
      username: "alice_m",
      touched: true,
    });
  });

  it("silently ignores edits to someone else's profile", async () => {
    const changed = await as(db, { kind: "user", id: alice }, async (q) => {
      const { rowCount } = await q("update public.profiles set bio = 'hacked' where id = $1", [bob]);
      return rowCount;
    });
    expect(changed).toBe(0);
  });

  it("blocks edits to protected columns, inserts and deletes", async () => {
    await rejects(
      as(db, { kind: "user", id: alice }, (q) =>
        q("update public.profiles set created_at = now() - interval '1 year' where id = $1", [alice]),
      ),
      /permission denied/,
    );
    await rejects(
      as(db, { kind: "user", id: alice }, (q) =>
        q("insert into public.profiles (id) values (gen_random_uuid())"),
      ),
      /permission denied/,
    );
    await rejects(
      as(db, { kind: "user", id: alice }, (q) => q("delete from public.profiles where id = $1", [alice])),
      /permission denied/,
    );
  });

  it("rejects usernames that break the rules", async () => {
    await rejects(
      as(db, { kind: "user", id: alice }, (q) =>
        q("update public.profiles set username = 'Has Caps' where id = $1", [alice]),
      ),
      /profiles_username_format/,
    );
    await rejects(
      as(db, { kind: "user", id: alice }, (q) =>
        q("update public.profiles set username = 'bob' where id = $1", [alice]),
      ),
      /duplicate key/,
    );
    await rejects(
      as(db, { kind: "user", id: alice }, (q) =>
        q("update public.profiles set region = 'FR' where id = $1", [alice]),
      ),
      /region_code/,
    );
  });

  it("lets a guest set a display name but not claim a username", async () => {
    const name = await as(db, { kind: "user", id: guest, anonymous: true }, async (q) => {
      const { rows } = await q(
        "update public.profiles set display_name = 'Sam' where id = $1 returning display_name",
        [guest],
      );
      return rows[0]?.display_name;
    });
    expect(name).toBe("Sam");
    await rejects(
      as(db, { kind: "user", id: guest, anonymous: true }, (q) =>
        q("update public.profiles set username = 'sam_guest' where id = $1", [guest]),
      ),
      /row-level security/,
    );
  });
});

describe("catalogue security rules", () => {
  const insertTitle = `
    insert into public.titles (id, media_type, tmdb_id, title)
    values ('movie:949', 'movie', 949, 'Heat')`;

  it("lets the server write and everyone read", async () => {
    const seen = await as(db, { kind: "service" }, async (q) => {
      await q(insertTitle);
      await q("insert into public.people (id, name) values (638, 'Michael Mann')");
      await q(
        "insert into public.title_credits (title_id, person_id, role) values ('movie:949', 638, 'director')",
      );
      await q("insert into public.providers (id, name) values (8, 'Netflix')");
      await q(
        "insert into public.title_availability (title_id, region, provider_id, offer_type) values ('movie:949', 'US', 8, 'flatrate')",
      );
      await q("set local role anon");
      const { rowCount } = await q(
        `select 1
           from public.titles t
           join public.title_credits c on c.title_id = t.id
           join public.title_availability a on a.title_id = t.id
          where t.id = 'movie:949'`,
      );
      return rowCount;
    });
    expect(seen).toBe(1);
  });

  it("stops browsers from writing to the catalogue", async () => {
    const someone = await createAccount(db, { username: "catalogue_vandal" });
    await rejects(as(db, { kind: "anon" }, (q) => q(insertTitle)), /permission denied/);
    await rejects(as(db, { kind: "user", id: someone }, (q) => q(insertTitle)), /permission denied/);
    await rejects(
      as(db, { kind: "user", id: someone }, (q) => q("delete from public.titles")),
      /permission denied/,
    );
  });

  it("keeps title ids consistent with their type and TMDB number", async () => {
    await rejects(
      as(db, { kind: "service" }, (q) =>
        q("insert into public.titles (id, media_type, tmdb_id, title) values ('tv:949', 'movie', 949, 'Heat')"),
      ),
      /titles_id_matches/,
    );
  });
});

describe("usage tracking rules", () => {
  let carol: string;
  let dave: string;

  beforeAll(async () => {
    carol = await createAccount(db, { username: "carol" });
    dave = await createAccount(db, { username: "dave" });
  });

  it("records today for yourself, idempotently, exactly as the API sends it", async () => {
    // Mirrors what supabase-js `upsert(..., { ignoreDuplicates: true })` becomes.
    const upsert = `
      with pgrst_source as (
        insert into public.usage_days (user_id) values ($1)
        on conflict (user_id, day) do nothing
        returning 1
      ) select count(*)::int as inserted from pgrst_source`;
    const counts = await as(db, { kind: "user", id: carol }, async (q) => {
      const first = await q(upsert, [carol]);
      const second = await q(upsert, [carol]);
      return [first.rows[0].inserted, second.rows[0].inserted];
    });
    expect(counts).toEqual([1, 0]);
  });

  it("won't record usage for someone else or for another day", async () => {
    await rejects(
      as(db, { kind: "user", id: carol }, (q) =>
        q("insert into public.usage_days (user_id) values ($1)", [dave]),
      ),
      /row-level security/,
    );
    await rejects(
      as(db, { kind: "user", id: carol }, (q) =>
        q("insert into public.usage_days (user_id, day) values ($1, '2020-01-01')", [carol]),
      ),
      /row-level security/,
    );
  });

  it("shows you only your own usage, and nothing to signed-out visitors", async () => {
    await db.query("insert into public.usage_days (user_id) values ($1), ($2) on conflict do nothing", [
      carol,
      dave,
    ]);
    const visible = await as(db, { kind: "user", id: carol }, async (q) => {
      const { rows } = await q("select user_id from public.usage_days");
      return rows.map((row) => row.user_id);
    });
    expect(visible).toEqual([carol]);
    await rejects(as(db, { kind: "anon" }, (q) => q("select * from public.usage_days")), /permission denied/);
    await rejects(
      as(db, { kind: "anon" }, (q) => q("insert into public.usage_days (user_id) values ($1)", [carol])),
      /permission denied/,
    );
  });
});
