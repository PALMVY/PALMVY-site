import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      // Scripts das ferramentas de IA, fora do código do site.
      ".agents/**",
      ".claude/**",
      ".codex/**",
      ".cursor/**",
      ".impeccable/**",
    ],
  },
];

export default eslintConfig;
