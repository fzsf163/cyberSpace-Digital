import { configDefaults, defineConfig } from "vitest/config";

// Unit-test config only — the production build (next build, standalone output)
// does not touch this file. Test files are colocated next to their source
// as `<name>.test.ts(x)`.
export default defineConfig({
  resolve: {
    // Resolves the `@/*` path alias from tsconfig.json in test files.
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    // Keep the defaults (node_modules, dist, ...) and also skip build output.
    exclude: [...configDefaults.exclude, "**/.next/**", "**/out/**"],
  },
});
