import { defineConfig } from "vitest/config";

// Database security tests: need a Postgres server (see tests/db/harness.ts).
export default defineConfig({
  test: {
    include: ["tests/db/**/*.test.ts"],
    environment: "node",
    // One shared database: run files one at a time.
    fileParallelism: false,
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
