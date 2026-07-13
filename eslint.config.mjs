import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "public/**"],
  },
  {
    rules: {
      // This repo's canvas/IntersectionObserver-driven animations (and the
      // shadcn/ui primitives under components/ui) intentionally set state
      // synchronously in effects and seed randomness outside render. These
      // React Compiler-era rules would require rewriting that motion/UI
      // logic, which is out of scope for content changes.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
];

export default eslintConfig;
