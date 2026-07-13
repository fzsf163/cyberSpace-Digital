import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

// Unit-test config only — the production build (next build, static export)
// does not touch this file. Test files are colocated next to their source
// as `<name>.test.ts(x)`.
export default defineConfig({
  // Resolves the `@/*` path alias from tsconfig.json in test files.
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    // Keep the defaults (node_modules, dist, ...) and also skip build output.
    exclude: [...configDefaults.exclude, "**/.next/**", "**/out/**"],
  },
});
