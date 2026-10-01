import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// eslint-config-next 15.5.x still ships eslintrc-style presets — FlatCompat
// bridges them into flat config (without it: "Plugin '' not found").
const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      ".open-next/**",
      ".wrangler/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "cloudflare-env.d.ts",
    ],
  },
];

export default eslintConfig;
