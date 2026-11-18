import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "pg";

/**
 * Test harness for database security rules.
 *
 * Each run builds a fresh database from the Supabase stub plus every migration
 * in supabase/migrations, in order, exactly as production receives them.
 * Tests then act as a signed-out visitor, a signed-in user, a guest, or the
 * server, and check what each one can and can't do.
 */

const ADMIN_URL =
  process.env.TEST_DATABASE_ADMIN_URL ?? "postgres://postgres@127.0.0.1:54329/postgres";
export const TEST_DB = process.env.TEST_DATABASE_NAME ?? "pww_test";

const root = fileURLToPath(new URL("../..", import.meta.url));

function testDbUrl(): string {
  const url = new URL(ADMIN_URL);
  url.pathname = `/${TEST_DB}`;
  return url.toString();
}

export async function rebuildDatabase(): Promise<void> {
  const admin = new Client({ connectionString: ADMIN_URL });
  await admin.connect();
  await admin.query(`drop database if exists ${TEST_DB} with (force)`);
  await admin.query(`create database ${TEST_DB}`);
  await admin.end();

  const db = new Client({ connectionString: testDbUrl() });
  await db.connect();
  try {
    await db.query(readFileSync(path.join(root, "tests/db/supabase-stub.sql"), "utf8"));
    const dir = path.join(root, "supabase/migrations");
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".sql")).sort()) {
      await db.query(readFileSync(path.join(dir, file), "utf8"));
    }
  } finally {
    await db.end();
  }
}

export async function connect(): Promise<Client> {
  const client = new Client({ connectionString: testDbUrl() });
  await client.connect();
  return client;
}

export type Actor =
  | { kind: "anon" }
  | { kind: "user"; id: string; anonymous?: boolean }
  | { kind: "service" };

/**
 * Runs `fn` inside a transaction as the given actor, then rolls back so tests
 * never leak state into each other. Returns whatever `fn` returns.
 */
export async function as<T>(
  client: Client,
  actor: Actor,
  fn: (q: Client["query"]) => Promise<T>,
): Promise<T> {
  await client.query("begin");
  try {
    if (actor.kind === "anon") {
      await client.query("set local role anon");
      await client.query(`select set_config('request.jwt.claims', '{"role":"anon"}', true)`);
    } else if (actor.kind === "user") {
      const claims = JSON.stringify({
        sub: actor.id,
        role: "authenticated",
        is_anonymous: actor.anonymous ?? false,
      });
      await client.query("set local role authenticated");
      await client.query("select set_config('request.jwt.claims', $1, true)", [claims]);
    } else {
      await client.query("set local role service_role");
    }
    return await fn(client.query.bind(client) as Client["query"]);
  } finally {
    await client.query("rollback");
  }
}

/** Creates an account the way the auth service does, returning its id. */
export async function createAccount(
  client: Client,
  meta: Record<string, unknown> = {},
  anonymous = false,
): Promise<string> {
  await client.query("set role supabase_auth_admin");
  try {
    const { rows } = await client.query<{ id: string }>(
      "insert into auth.users (email, raw_user_meta_data, is_anonymous) values ($1, $2, $3) returning id",
      [anonymous ? null : `${crypto.randomUUID()}@example.com`, meta, anonymous],
    );
    return rows[0]!.id;
  } finally {
    await client.query("reset role");
  }
}
